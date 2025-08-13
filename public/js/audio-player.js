/* Basic audio player with visualizer */
let tracks = JSON.parse(document.getElementById('tracks-data').textContent.trim());
if (tracks && tracks.default) tracks = tracks.default;
let current = 0;

const audio = new Audio();
audio.preload = 'metadata';
audio.crossOrigin = 'anonymous';
audio.src = tracks[current].src;
const playBtn = document.getElementById('play');
const iconPlay = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>';
const iconPause = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const cover = document.getElementById('cover');
const titleEl = document.getElementById('track-title');
const artistEl = document.getElementById('track-artist');
const playlistItems = Array.from(document.querySelectorAll('.playlist-item'));

// Web Audio API for visualizer
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
  requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const barWidth = canvas.width / bufferLength;
  for (let i = 0; i < bufferLength; i++) {
    const value = dataArray[i];
    const barHeight = value / 255 * canvas.height;
    ctx.fillStyle = getComputedStyle(document.documentElement)
                   .getPropertyValue('--accent-color-static') || '#FFD700';
    ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight);
  }
}

draw();

function setActive() {
  playlistItems.forEach((el, idx) => {
    el.classList.toggle('active', idx === current);
  });
}

function updateUI() {
  cover.src = tracks[current].cover;
  titleEl.textContent = tracks[current].title;
  artistEl.textContent = tracks[current].artist;
}

// Buffer management
let isBuffering = false;
let bufferTimeout;

function showBuffering() {
  isBuffering = true;
  playBtn.style.opacity = '0.6';
  playBtn.innerHTML = '<div class="spinner"></div>';
}

function hideBuffering() {
  isBuffering = false;
  playBtn.style.opacity = '1';
  playBtn.innerHTML = audio.paused ? iconPlay : iconPause;
}

function preloadNext() {
  const nextIdx = (current + 1) % tracks.length;
  const nextAudio = new Audio();
  nextAudio.preload = 'metadata';
  nextAudio.src = tracks[nextIdx].src;
}

function changeTrack(idx) {
  pauseTrack();
  current = idx;
  audio.src = tracks[current].src;
  audio.load();
  updateUI();
  
  // Reset buffer state
  hideBuffering();
  clearTimeout(bufferTimeout);
  
  // Optimize loading
  audio.load();
  setActive();
  playTrack();
}

function playTrack() {
  if (audio.readyState < 3) {
    showBuffering();
    bufferTimeout = setTimeout(() => {
      if (isBuffering) {
        console.warn('Audio taking longer to load, check network or file size');
      }
    }, 3000);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  audio.play().then(() => {
    hideBuffering();
    clearTimeout(bufferTimeout);
    preloadNext();
  }).catch(err => {
    hideBuffering();
    if (err.name !== 'AbortError') console.error(err);
  });
  playBtn.innerHTML = iconPause;
}

function pauseTrack() {
  audio.pause();
  playBtn.innerHTML = iconPlay;
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playTrack();
  setActive();
  } else {
    pauseTrack();
  }
});

playlistItems.forEach((el) => {
  el.addEventListener('click', () => {
    const idx = Number(el.dataset.index);
    if (!Number.isNaN(idx)) {
      changeTrack(idx);
    }
  });
});

nextBtn.addEventListener('click', () => {
  changeTrack((current + 1) % tracks.length);
});

prevBtn.addEventListener('click', () => {
  changeTrack((current - 1 + tracks.length) % tracks.length);
});

function refreshProgress() {
  if (isFinite(audio.duration) && audio.duration > 0) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  } else {
    progress.value = 0;
  }
}

audio.addEventListener('timeupdate', refreshProgress);

audio.addEventListener('loadedmetadata', refreshProgress);

// Buffer state listeners
audio.addEventListener('waiting', showBuffering);
audio.addEventListener('canplay', hideBuffering);
audio.addEventListener('canplaythrough', () => {
  hideBuffering();
  preloadNext();
});

// Network optimization
audio.addEventListener('progress', () => {
  if (audio.buffered.length > 0) {
    const buffered = audio.buffered.end(audio.buffered.length - 1);
    const duration = audio.duration;
    if (buffered / duration > 0.5) {
      preloadNext();
    }
  }
});

progress.addEventListener('input', () => {
  if (isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

updateUI();
