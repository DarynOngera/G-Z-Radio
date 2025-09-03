/* Enhanced Audio Player with Dynamic Visual Representations */
let tracks = JSON.parse(document.getElementById('tracks-data').textContent.trim());
if (tracks && tracks.default) tracks = tracks.default;
let current = 0;

const audio = new Audio();
audio.preload = 'metadata';
audio.crossOrigin = 'anonymous';
audio.volume = 1;

// Enhanced Visual Elements
const dynamicBg = document.getElementById('dynamic-bg');
const coverGlow = document.getElementById('cover-glow');
const pulseRing = document.getElementById('pulse-ring');

// Canvas Elements
const circularCanvas = document.getElementById('circular-visualizer');
const waveformCanvas = document.getElementById('waveform-visualizer');
const particleCanvas = document.getElementById('particle-system');
const frequencyCanvas = document.getElementById('frequency-bars');

// Canvas Contexts
const circularCtx = circularCanvas?.getContext('2d');
const waveformCtx = waveformCanvas?.getContext('2d');
const particleCtx = particleCanvas?.getContext('2d');
const frequencyCtx = frequencyCanvas?.getContext('2d');

// Web Audio API Setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 512;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
const timeDataArray = new Uint8Array(bufferLength);

// Particle System
class Particle {
  constructor(x, y, vx, vy, size, color, life) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.color = color;
    this.life = life;
    this.maxLife = life;
    this.decay = 0.98;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.decay;
    this.vy *= this.decay;
    this.life--;
    this.size *= 0.99;
  }

  draw(ctx) {
    const alpha = this.life / this.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  isDead() {
    return this.life <= 0 || this.size <= 0.1;
  }
}

let particles = [];

// Color Themes Based on Audio
const colorThemes = {
  bass: ['#FFD700', '#FFA500', '#FF8C00'],
  mid: ['#00CED1', '#20B2AA', '#48D1CC'],
  treble: ['#FF69B4', '#FF1493', '#DC143C'],
  default: ['#FFD700', '#FFA500', '#FF6347']
};

let currentTheme = colorThemes.default;

// Audio Analysis
function analyzeAudio() {
  analyser.getByteFrequencyData(dataArray);
  analyser.getByteTimeDomainData(timeDataArray);

  // Determine dominant frequency range for color theme
  const bassRange = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
  const midRange = dataArray.slice(10, 50).reduce((a, b) => a + b, 0) / 40;
  const trebleRange = dataArray.slice(50, 100).reduce((a, b) => a + b, 0) / 50;

  if (bassRange > midRange && bassRange > trebleRange) {
    currentTheme = colorThemes.bass;
  } else if (midRange > bassRange && midRange > trebleRange) {
    currentTheme = colorThemes.mid;
  } else if (trebleRange > bassRange && trebleRange > midRange) {
    currentTheme = colorThemes.treble;
  } else {
    currentTheme = colorThemes.default;
  }

  // Update dynamic background
  updateDynamicBackground(bassRange, midRange, trebleRange);
  
  // Update cover effects
  updateCoverEffects(bassRange + midRange + trebleRange);
}

function updateDynamicBackground(bass, mid, treble) {
  if (!dynamicBg) return;
  
  const intensity = (bass + mid + treble) / 3;
  const hue = Math.floor((bass * 2 + mid * 1.5 + treble) % 360);
  
  dynamicBg.style.background = `
    radial-gradient(circle at 20% 50%, hsla(${hue}, 70%, 20%, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, hsla(${(hue + 120) % 360}, 70%, 20%, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, hsla(${(hue + 240) % 360}, 70%, 20%, 0.3) 0%, transparent 50%),
    linear-gradient(135deg, #1a1a1a 0%, #2d1810 50%, #1a1a1a 100%)
  `;
}

function updateCoverEffects(intensity) {
  if (!coverGlow || !pulseRing) return;
  
  const glowIntensity = Math.min(intensity / 255, 1);
  coverGlow.style.opacity = glowIntensity * 0.8;
  
  if (intensity > 100) {
    pulseRing.style.animationDuration = `${2 - glowIntensity}s`;
  }
}

// Circular Spectrum Analyzer
function drawCircularVisualizer() {
  if (!circularCtx || !circularCanvas) return;
  
  const centerX = circularCanvas.width / 2;
  const centerY = circularCanvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;
  
  circularCtx.clearRect(0, 0, circularCanvas.width, circularCanvas.height);
  
  const barCount = 64;
  const angleStep = (Math.PI * 2) / barCount;
  
  for (let i = 0; i < barCount; i++) {
    const value = dataArray[i] || 0;
    const barHeight = (value / 255) * radius * 0.7;
    const angle = i * angleStep - Math.PI / 2;
    
    const x1 = centerX + Math.cos(angle) * (radius - barHeight);
    const y1 = centerY + Math.sin(angle) * (radius - barHeight);
    const x2 = centerX + Math.cos(angle) * radius;
    const y2 = centerY + Math.sin(angle) * radius;
    
    // Create gradient for each bar
    const gradient = circularCtx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, currentTheme[0]);
    gradient.addColorStop(0.5, currentTheme[1]);
    gradient.addColorStop(1, currentTheme[2]);
    
    circularCtx.strokeStyle = gradient;
    circularCtx.lineWidth = 3;
    circularCtx.lineCap = 'round';
    
    circularCtx.beginPath();
    circularCtx.moveTo(x1, y1);
    circularCtx.lineTo(x2, y2);
    circularCtx.stroke();
  }
  
  // Draw center circle
  circularCtx.beginPath();
  circularCtx.arc(centerX, centerY, 30, 0, Math.PI * 2);
  circularCtx.fillStyle = 'rgba(255, 215, 0, 0.2)';
  circularCtx.fill();
  circularCtx.strokeStyle = currentTheme[0];
  circularCtx.lineWidth = 2;
  circularCtx.stroke();
}

// Waveform Visualizer
function drawWaveform() {
  if (!waveformCtx || !waveformCanvas) return;
  
  waveformCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
  
  const centerY = waveformCanvas.height / 2;
  const sliceWidth = waveformCanvas.width / timeDataArray.length;
  
  // Create gradient
  const gradient = waveformCtx.createLinearGradient(0, 0, waveformCanvas.width, 0);
  gradient.addColorStop(0, currentTheme[0]);
  gradient.addColorStop(0.5, currentTheme[1]);
  gradient.addColorStop(1, currentTheme[2]);
  
  waveformCtx.strokeStyle = gradient;
  waveformCtx.lineWidth = 2;
  waveformCtx.lineCap = 'round';
  
  waveformCtx.beginPath();
  
  let x = 0;
  for (let i = 0; i < timeDataArray.length; i++) {
    const v = timeDataArray[i] / 128.0;
    const y = v * centerY;
    
    if (i === 0) {
      waveformCtx.moveTo(x, y);
    } else {
      waveformCtx.lineTo(x, y);
    }
    
    x += sliceWidth;
  }
  
  waveformCtx.stroke();
  
  // Draw reflection
  waveformCtx.save();
  waveformCtx.scale(1, -1);
  waveformCtx.translate(0, -waveformCanvas.height);
  waveformCtx.globalAlpha = 0.3;
  waveformCtx.stroke();
  waveformCtx.restore();
}

// Particle System
function updateParticles() {
  if (!particleCtx || !particleCanvas) return;
  
  particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  
  // Generate new particles based on audio intensity
  const intensity = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
  
  if (intensity > 50 && Math.random() < 0.3) {
    const x = Math.random() * particleCanvas.width;
    const y = particleCanvas.height;
    const vx = (Math.random() - 0.5) * 4;
    const vy = -Math.random() * 8 - 2;
    const size = Math.random() * 4 + 2;
    const color = currentTheme[Math.floor(Math.random() * currentTheme.length)];
    const life = Math.floor(Math.random() * 60) + 30;
    
    particles.push(new Particle(x, y, vx, vy, size, color, life));
  }
  
  // Update and draw particles
  particles = particles.filter(particle => {
    particle.update();
    particle.draw(particleCtx);
    return !particle.isDead();
  });
}

// Enhanced Frequency Bars
function drawFrequencyBars() {
  if (!frequencyCtx || !frequencyCanvas) return;
  
  frequencyCtx.clearRect(0, 0, frequencyCanvas.width, frequencyCanvas.height);
  
  const barCount = 32;
  const barWidth = frequencyCanvas.width / barCount;
  const dataStep = Math.floor(dataArray.length / barCount);
  
  for (let i = 0; i < barCount; i++) {
    const value = dataArray[i * dataStep] || 0;
    const barHeight = (value / 255) * frequencyCanvas.height * 0.8;
    
    // Create gradient for each bar
    const gradient = frequencyCtx.createLinearGradient(0, frequencyCanvas.height, 0, frequencyCanvas.height - barHeight);
    gradient.addColorStop(0, currentTheme[0]);
    gradient.addColorStop(0.5, currentTheme[1]);
    gradient.addColorStop(1, currentTheme[2]);
    
    frequencyCtx.fillStyle = gradient;
    frequencyCtx.fillRect(i * barWidth, frequencyCanvas.height - barHeight, barWidth - 2, barHeight);
    
    // Add glow effect
    frequencyCtx.shadowColor = currentTheme[0];
    frequencyCtx.shadowBlur = 10;
    frequencyCtx.fillRect(i * barWidth, frequencyCanvas.height - barHeight, barWidth - 2, barHeight);
    frequencyCtx.shadowBlur = 0;
  }
}

// Main animation loop
function animate() {
  requestAnimationFrame(animate);
  
  if (!audio.paused) {
    analyzeAudio();
    drawCircularVisualizer();
    drawWaveform();
    updateParticles();
    drawFrequencyBars();
  }
}

// Control Elements
const playBtn = document.getElementById('play');
const iconPlay = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>';
const iconPause = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const cover = document.getElementById('cover');
const titleEl = document.getElementById('track-title');
const artistEl = document.getElementById('track-artist');
const playlistItems = Array.from(document.querySelectorAll('.playlist-item'));

// Audio pool for preloading
const audioPool = new Map();

// Error handling
audio.addEventListener('error', (e) => {
  console.warn('Audio error:', e);
  hideBuffering();
  
  if (audio.src.includes('.wav')) {
    setTimeout(() => {
      audio.load();
    }, 1000);
  }
});

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

function createAudioElement(src) {
  const audioEl = new Audio();
  audioEl.preload = 'metadata';
  audioEl.crossOrigin = 'anonymous';
  
  if (src.includes('.wav')) {
    audioEl.preload = 'none';
  }
  
  audioEl.src = src;
  return audioEl;
}

function preloadNext() {
  const nextIdx = (current + 1) % tracks.length;
  const prevIdx = (current - 1 + tracks.length) % tracks.length;
  
  [nextIdx, prevIdx].forEach(idx => {
    const src = tracks[idx].src;
    if (!audioPool.has(src)) {
      const audioEl = createAudioElement(src);
      audioPool.set(src, audioEl);
      audioEl.load();
    }
  });
}

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

function changeTrack(idx) {
  pauseTrack();
  current = idx;
  
  const newSrc = tracks[current].src;
  
  if (audioPool.has(newSrc)) {
    const preloadedAudio = audioPool.get(newSrc);
    if (preloadedAudio.readyState >= 3) {
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
  hideBuffering();
  clearTimeout(bufferTimeout);
  setActive();
  playTrack();
}

function playTrack() {
  if (audio.readyState < 2) {
    showBuffering();
    bufferTimeout = setTimeout(() => {
      if (isBuffering) {
        console.info('Loading audio... Please wait');
      }
    }, 4000);
  }
  
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  audio.play().then(() => {
    hideBuffering();
    clearTimeout(bufferTimeout);
    preloadNext();
    
    // Activate visual effects
    if (coverGlow) coverGlow.style.opacity = '0.6';
    if (pulseRing) pulseRing.style.opacity = '1';
  }).catch(err => {
    hideBuffering();
    if (err.name !== 'AbortError') console.error(err);
  });
  
  playBtn.innerHTML = iconPause;
}

function pauseTrack() {
  audio.pause();
  playBtn.innerHTML = iconPlay;
  
  // Deactivate visual effects
  if (coverGlow) coverGlow.style.opacity = '0';
  if (pulseRing) pulseRing.style.opacity = '0';
}

// Event Listeners
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
audio.addEventListener('waiting', showBuffering);
audio.addEventListener('canplay', hideBuffering);
audio.addEventListener('canplaythrough', () => {
  hideBuffering();
  preloadNext();
});

progress.addEventListener('input', () => {
  if (isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Initialize
audio.src = tracks[current].src;
updateUI();
setActive();
preloadNext();

// Start animation loop
animate();

// Connection quality detection
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

if ('connection' in navigator) {
  navigator.connection.addEventListener('change', detectConnection);
  detectConnection();
}

// Cleanup
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

setInterval(cleanupAudioPool, 30000);

// Make player available globally for integration with other components
window.audioPlayer = {
  playTrack: (index, preview = false) => {
    if (preview) {
      // For preview mode, play for 30 seconds then pause
      changeTrack(index);
      setTimeout(() => {
        if (!audio.paused) {
          pauseTrack();
        }
      }, 30000);
    } else {
      changeTrack(index);
    }
  },
  getCurrentTrack: () => current,
  getTracks: () => tracks,
  isPlaying: () => !audio.paused
};
