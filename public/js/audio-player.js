/* Basic audio player with visualizer */
let tracks = JSON.parse(document.getElementById('tracks-data').textContent.trim());
if (tracks && tracks.default) tracks = tracks.default;
let current = 0;

const audio = new Audio();
audio.preload = 'auto';
audio.crossOrigin = 'anonymous';
audio.volume = 1;

// Create audio pool for seamless switching
const audioPool = new Map();
function createAudioElement(src) {
  const audioEl = new Audio();
  audioEl.preload = 'auto';
  audioEl.crossOrigin = 'anonymous';
  audioEl.src = src;
  return audioEl;
}

// Initialize with current track
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
  const prevIdx = (current - 1 + tracks.length) % tracks.length;
  
  // Preload next and previous tracks
  [nextIdx, prevIdx].forEach(idx => {
    const src = tracks[idx].src;
    if (!audioPool.has(src)) {
      const audioEl = createAudioElement(src);
      audioPool.set(src, audioEl);
      
      // Start loading in background
      audioEl.load();
    }
  });
}

function changeTrack(idx) {
  pauseTrack();
  current = idx;
  
  const newSrc = tracks[current].src;
  
  // Use preloaded audio if available
  if (audioPool.has(newSrc)) {
    const preloadedAudio = audioPool.get(newSrc);
    if (preloadedAudio.readyState >= 3) {
      // Swap to preloaded audio for instant playback
      const currentTime = audio.currentTime;
      audio.src = newSrc;
      audio.currentTime = 0;
    } else {
      audio.src = newSrc;
      audio.load();
    }
  } else {
    audio.src = newSrc;
    audio.load();
  }
  
  updateUI();
  
  // Reset buffer state
  hideBuffering();
  clearTimeout(bufferTimeout);
  
  setActive();
  playTrack();
}

function playTrack() {
  // Adaptive timeout based on connection quality
  const timeoutDelay = connectionQuality === 'low' ? 8000 : 
                      connectionQuality === 'medium' ? 6000 : 4000;
                      
  if (audio.readyState < 2) {
    showBuffering();
    bufferTimeout = setTimeout(() => {
      if (isBuffering) {
        console.info(`Loading audio (${connectionQuality} connection)... Please wait`);
      }
    }, timeoutDelay);
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

// Advanced network optimization
audio.addEventListener('progress', () => {
  if (audio.buffered.length > 0) {
    const buffered = audio.buffered.end(audio.buffered.length - 1);
    const duration = audio.duration;
    
    // Preload when 30% buffered (earlier for better UX)
    if (buffered / duration > 0.3) {
      preloadNext();
    }
  }
});

// Adaptive quality based on connection
let connectionQuality = 'high';
function detectConnection() {
  if ('connection' in navigator) {
    const conn = navigator.connection;
    if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') {
      connectionQuality = 'low';
    } else if (conn.effectiveType === '3g') {
      connectionQuality = 'medium';
    } else {
      connectionQuality = 'high';
    }
  }
}

// Monitor connection changes
if ('connection' in navigator) {
  navigator.connection.addEventListener('change', detectConnection);
  detectConnection();
}

// Cleanup unused audio elements
function cleanupAudioPool() {
  const currentSrc = tracks[current].src;
  const nextSrc = tracks[(current + 1) % tracks.length].src;
  const prevSrc = tracks[(current - 1 + tracks.length) % tracks.length].src;
  
  const keepSources = new Set([currentSrc, nextSrc, prevSrc]);
  
  for (const [src, audioEl] of audioPool.entries()) {
    if (!keepSources.has(src)) {
      audioEl.src = '';
      audioPool.delete(src);
    }
  }
}

// Cleanup every 30 seconds
setInterval(cleanupAudioPool, 30000);

progress.addEventListener('input', () => {
  if (isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

updateUI();

// Initialize preloading and connection detection
preloadNext();
detectConnection();
