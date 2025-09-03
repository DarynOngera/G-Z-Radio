/* Unified Symphony Visualization Complex */
let tracks = JSON.parse(document.getElementById('tracks-data').textContent.trim());
if (tracks && tracks.default) tracks = tracks.default;
let current = 0;

const audio = new Audio();
audio.preload = 'metadata';
audio.crossOrigin = 'anonymous';
audio.volume = 1;

// Unified Canvas Element with Responsive Sizing
const unifiedCanvas = document.getElementById('unified-visualizer');
const ctx = unifiedCanvas?.getContext('2d');

// Responsive canvas setup
function setupResponsiveCanvas() {
  if (!unifiedCanvas) return;
  
  const container = unifiedCanvas.parentElement;
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  
  // Set canvas size based on container and device
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
  
  if (isMobile) {
    unifiedCanvas.width = Math.min(containerWidth, 600);
    unifiedCanvas.height = Math.min(containerHeight, 250);
  } else if (isTablet) {
    unifiedCanvas.width = Math.min(containerWidth, 700);
    unifiedCanvas.height = Math.min(containerHeight, 300);
  } else {
    unifiedCanvas.width = Math.min(containerWidth, 800);
    unifiedCanvas.height = Math.min(containerHeight, 400);
  }
  
  // Set CSS size to match
  unifiedCanvas.style.width = unifiedCanvas.width + 'px';
  unifiedCanvas.style.height = unifiedCanvas.height + 'px';
}

// Device performance detection
const devicePerformance = {
  level: 'high',
  particleLimit: 30,
  spectrumBars: 32,
  animationQuality: 1.0
};

function detectDevicePerformance() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency <= 2 || window.innerWidth <= 480;
  
  if (isMobile || isLowEnd) {
    devicePerformance.level = 'low';
    devicePerformance.particleLimit = 15;
    devicePerformance.spectrumBars = 16;
    devicePerformance.animationQuality = 0.7;
  } else if (window.innerWidth <= 1024) {
    devicePerformance.level = 'medium';
    devicePerformance.particleLimit = 20;
    devicePerformance.spectrumBars = 24;
    devicePerformance.animationQuality = 0.85;
  }
}

// Control Elements
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const cover = document.getElementById('cover');
const titleEl = document.getElementById('track-title');
const artistEl = document.getElementById('track-artist');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const playlistToggle = document.getElementById('playlist-toggle');
const playlistSection = document.getElementById('playlist-section');
const playlistClose = document.getElementById('playlist-close');
const playlistItems = Array.from(document.querySelectorAll('.playlist-item'));

// Icons
const iconPlay = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>';
const iconPause = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>';

// Web Audio API Setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 1024;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
const timeDataArray = new Uint8Array(bufferLength);

// Symphony Visualization State
let visualizationState = {
  rotation: 0,
  pulseIntensity: 0,
  particleSystem: [],
  waveformHistory: [],
  bassIntensity: 0,
  midIntensity: 0,
  trebleIntensity: 0,
  vocalIntensity: 0,
  rhythmPulse: 0,
  beatHistory: [],
  lastBeatTime: 0,
  beatThreshold: 1.2, // More sensitive
  vocalThreshold: 0.8
};

// Particle Class for Symphony Effects
class SymphonyParticle {
  constructor(x, y, type = 'default') {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.type = type;
    this.life = 1.0;
    this.maxLife = 1.0;
    this.size = Math.random() * 3 + 1;
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    };
    this.frequency = Math.random() * 0.02 + 0.01;
    this.amplitude = Math.random() * 20 + 10;
    this.phase = Math.random() * Math.PI * 2;
  }

  update(audioData) {
    // Update based on audio frequency ranges
    const bassResponse = audioData.bass / 255;
    const midResponse = audioData.mid / 255;
    const trebleResponse = audioData.treble / 255;

    switch (this.type) {
      case 'bass':
        this.size = 1 + bassResponse * 4;
        this.velocity.y += bassResponse * 0.5;
        break;
      case 'mid':
        this.amplitude = 10 + midResponse * 30;
        break;
      case 'treble':
        this.velocity.x += (Math.random() - 0.5) * trebleResponse * 2;
        this.velocity.y += (Math.random() - 0.5) * trebleResponse * 2;
        break;
    }

    // Orbital motion with audio influence
    this.phase += this.frequency + (bassResponse * 0.01);
    this.x = this.originalX + Math.cos(this.phase) * this.amplitude * (1 + midResponse);
    this.y = this.originalY + Math.sin(this.phase) * this.amplitude * (1 + midResponse);

    // Apply velocity
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Damping
    this.velocity.x *= 0.98;
    this.velocity.y *= 0.98;

    // Life decay
    this.life -= 0.005;
  }

  draw(ctx, audioData) {
    if (this.life <= 0) return;

    const alpha = this.life;
    const bassResponse = audioData.bass / 255;
    const midResponse = audioData.mid / 255;
    const trebleResponse = audioData.treble / 255;

    ctx.save();
    ctx.globalAlpha = alpha * 0.8;

    // Color based on particle type and audio
    let color;
    switch (this.type) {
      case 'bass':
        color = `hsl(${45 + bassResponse * 30}, 80%, ${50 + bassResponse * 30}%)`;
        break;
      case 'mid':
        color = `hsl(${180 + midResponse * 60}, 70%, ${60 + midResponse * 20}%)`;
        break;
      case 'treble':
        color = `hsl(${300 + trebleResponse * 60}, 85%, ${70 + trebleResponse * 20}%)`;
        break;
      default:
        color = `hsl(${visualizationState.colorShift}, 70%, 60%)`;
    }

    // Draw particle with glow effect
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fill();

    // Core particle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  isDead() {
    return this.life <= 0;
  }
}

// Audio Analysis Function
function analyzeAudio() {
  analyser.getByteFrequencyData(dataArray);
  analyser.getByteTimeDomainData(timeDataArray);

  // Analyze frequency ranges with vocal focus
  const bassRange = dataArray.slice(0, 20);
  const midRange = dataArray.slice(20, 100);
  const vocalRange = dataArray.slice(40, 80); // Human vocal frequencies (200Hz-2kHz)
  const trebleRange = dataArray.slice(100, 200);

  visualizationState.bassIntensity = bassRange.reduce((a, b) => a + b, 0) / bassRange.length;
  visualizationState.midIntensity = midRange.reduce((a, b) => a + b, 0) / midRange.length;
  visualizationState.vocalIntensity = vocalRange.reduce((a, b) => a + b, 0) / vocalRange.length;
  visualizationState.trebleIntensity = trebleRange.reduce((a, b) => a + b, 0) / trebleRange.length;

  // Enhanced beat detection with vocal sensitivity
  const currentEnergy = visualizationState.bassIntensity * 1.2 + visualizationState.vocalIntensity * 0.8 + visualizationState.midIntensity * 0.6;
  const now = Date.now();
  
  // Store energy history for beat detection
  visualizationState.beatHistory.push(currentEnergy);
  if (visualizationState.beatHistory.length > 20) {
    visualizationState.beatHistory.shift();
  }

  // Calculate average energy
  const avgEnergy = visualizationState.beatHistory.reduce((a, b) => a + b, 0) / visualizationState.beatHistory.length;
  
  // More sensitive beat detection with shorter intervals
  if (currentEnergy > avgEnergy * visualizationState.beatThreshold && 
      now - visualizationState.lastBeatTime > 150) { // Reduced from 200ms
    visualizationState.rhythmPulse = 1.0;
    visualizationState.lastBeatTime = now;
  } else {
    visualizationState.rhythmPulse *= 0.88; // Slightly slower decay to maintain sensitivity
  }

  // Store waveform history
  visualizationState.waveformHistory.push(currentEnergy);
  if (visualizationState.waveformHistory.length > 30) {
    visualizationState.waveformHistory.shift();
  }

  // Update visualization state with slower, smoother rotation
  visualizationState.rotation += 0.005 + (visualizationState.bassIntensity / 255) * 0.01;
  visualizationState.pulseIntensity = currentEnergy;
}

// Unified Symphony Visualization
function drawSymphonyVisualization() {
  if (!ctx || !unifiedCanvas) return;

  const width = unifiedCanvas.width;
  const height = unifiedCanvas.height;
  const centerX = width / 2;
  const centerY = height / 2;

  // Clear with subtle gold-toned background
  const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) / 2);
  bgGradient.addColorStop(0, 'rgba(20, 15, 5, 0.1)');
  bgGradient.addColorStop(0.5, 'rgba(30, 20, 8, 0.05)');
  bgGradient.addColorStop(1, 'rgba(10, 8, 3, 0.02)');
  
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  const audioData = {
    bass: visualizationState.bassIntensity,
    mid: visualizationState.midIntensity,
    vocal: visualizationState.vocalIntensity,
    treble: visualizationState.trebleIntensity,
    rhythm: visualizationState.rhythmPulse
  };

  // 1. Central Beat Pulse (Primary Focus)
  drawBeatPulse(ctx, centerX, centerY, audioData);

  // 2. Simplified Spectrum Ring
  drawSimpleSpectrum(ctx, centerX, centerY, audioData);

  // 3. Minimal Particles (Beat-Responsive Only)
  updateMinimalParticles(audioData);
  drawMinimalParticles(ctx, audioData);
}

// Responsive Beat Pulse - Adapts to screen size and performance
function drawBeatPulse(ctx, centerX, centerY, audioData) {
  const beatIntensity = audioData.rhythm;
  const vocalResponse = audioData.vocal / 255;
  const canvasSize = Math.min(unifiedCanvas.width, unifiedCanvas.height);
  
  // Responsive sizing based on canvas dimensions
  const baseSize = canvasSize * 0.08;
  const maxPulseSize = canvasSize * 0.25;
  
  // More sensitive threshold for vocal elements
  if (beatIntensity > 0.05 || vocalResponse > 0.3) {
    // Enhanced pulse radius with vocal influence - responsive
    const basePulse = baseSize + beatIntensity * maxPulseSize * 0.6;
    const vocalPulse = baseSize * 0.5 + vocalResponse * maxPulseSize * 0.4;
    const pulseRadius = Math.max(basePulse, vocalPulse);
    
    ctx.save();
    ctx.globalAlpha = Math.max(beatIntensity * 0.8, vocalResponse * 0.6) * devicePerformance.animationQuality;
    
    // Vocal-responsive outer glow - scaled for performance
    const outerRadius = pulseRadius * (devicePerformance.level === 'low' ? 1.4 : 1.8);
    const outerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, outerRadius);
    outerGradient.addColorStop(0, `rgba(255, 215, 0, ${(0.6 + vocalResponse * 0.3) * devicePerformance.animationQuality})`);
    outerGradient.addColorStop(0.5, `rgba(255, 165, 0, ${(0.3 + vocalResponse * 0.2) * devicePerformance.animationQuality})`);
    outerGradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = outerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner pulse with vocal shimmer - performance optimized
    if (devicePerformance.level !== 'low') {
      const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius);
      innerGradient.addColorStop(0, `rgba(255, 215, 0, ${0.9 + vocalResponse * 0.1})`);
      innerGradient.addColorStop(0.8, `rgba(255, 140, 0, ${0.4 + vocalResponse * 0.3})`);
      innerGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = innerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Multiple beat rings for vocal sensitivity
    const ringAlpha = Math.max(beatIntensity, vocalResponse * 0.8);
    ctx.strokeStyle = `rgba(255, 215, 0, ${ringAlpha})`;
    ctx.lineWidth = devicePerformance.level === 'low' ? 1 + vocalResponse : 2 + vocalResponse * 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseRadius * 0.7, 0, Math.PI * 2);
    ctx.stroke();
    
    // Additional vocal ring - only on higher performance devices
    if (vocalResponse > 0.4 && devicePerformance.level !== 'low') {
      ctx.strokeStyle = `rgba(255, 180, 0, ${vocalResponse * 0.6})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius * 0.5, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    ctx.restore();
  }
  
  // Enhanced base circle with vocal sensitivity - responsive
  ctx.save();
  const baseAlpha = (0.3 + vocalResponse * 0.2) * devicePerformance.animationQuality;
  ctx.strokeStyle = `rgba(255, 215, 0, ${baseAlpha})`;
  ctx.lineWidth = devicePerformance.level === 'low' ? 1.5 : 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, baseSize * 0.75, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

// Responsive Spectrum Ring - Adapts to device performance
function drawSimpleSpectrum(ctx, centerX, centerY, audioData) {
  const canvasSize = Math.min(unifiedCanvas.width, unifiedCanvas.height);
  const baseRadius = canvasSize * 0.15; // Responsive radius
  const barCount = devicePerformance.spectrumBars;
  const angleStep = (Math.PI * 2) / barCount;
  const maxBarHeight = canvasSize * 0.08; // Responsive bar height

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(visualizationState.rotation * devicePerformance.animationQuality);

  for (let i = 0; i < barCount; i++) {
    const dataIndex = Math.floor(i * (dataArray.length / barCount));
    const value = dataArray[dataIndex] || 0;
    const barHeight = (value / 255) * maxBarHeight;
    const angle = i * angleStep;
    
    const x1 = Math.cos(angle) * baseRadius;
    const y1 = Math.sin(angle) * baseRadius;
    const x2 = Math.cos(angle) * (baseRadius + barHeight);
    const y2 = Math.sin(angle) * (baseRadius + barHeight);

    // Gold gradient with performance scaling
    const intensity = value / 255;
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, `rgba(255, 215, 0, ${(0.4 + intensity * 0.4) * devicePerformance.animationQuality})`);
    gradient.addColorStop(1, `rgba(255, 140, 0, ${(0.2 + intensity * 0.6) * devicePerformance.animationQuality})`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = devicePerformance.level === 'low' ? 1.5 : 2;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  ctx.restore();
}

// Responsive Particles - Adapts to device performance
function updateMinimalParticles(audioData) {
  const vocalResponse = audioData.vocal / 255;
  const canvasSize = Math.min(unifiedCanvas.width, unifiedCanvas.height);
  
  // Adjust generation rate based on device performance
  const generationRate = devicePerformance.level === 'low' ? 0.2 : 
                        devicePerformance.level === 'medium' ? 0.3 : 0.4;
  
  // Generate particles on beats OR strong vocals - performance scaled
  if ((audioData.rhythm > 0.5 && Math.random() < generationRate) || 
      (vocalResponse > 0.6 && Math.random() < generationRate * 0.75)) {
    const angle = Math.random() * Math.PI * 2;
    const radius = canvasSize * 0.2 + Math.random() * canvasSize * 0.15; // Responsive radius
    const x = unifiedCanvas.width / 2 + Math.cos(angle) * radius;
    const y = unifiedCanvas.height / 2 + Math.sin(angle) * radius;
    
    const particle = new SymphonyParticle(x, y, vocalResponse > 0.6 ? 'vocal' : 'beat');
    particle.life = devicePerformance.level === 'low' ? 0.7 : 0.9;
    particle.size = (1 + Math.max(audioData.rhythm * 2, vocalResponse * 3)) * devicePerformance.animationQuality;
    visualizationState.particleSystem.push(particle);
  }

  // Update existing particles with enhanced vocal response
  visualizationState.particleSystem.forEach(particle => {
    particle.update(audioData);
    // Vocal particles get extra shimmer - performance scaled
    if (particle.type === 'vocal' && vocalResponse > 0.5 && devicePerformance.level !== 'low') {
      particle.size = Math.max(particle.size, (1 + vocalResponse * 2) * devicePerformance.animationQuality);
    }
  });

  // Remove dead particles
  visualizationState.particleSystem = visualizationState.particleSystem.filter(particle => !particle.isDead());

  // Performance-based particle limit
  if (visualizationState.particleSystem.length > devicePerformance.particleLimit) {
    visualizationState.particleSystem = visualizationState.particleSystem.slice(-devicePerformance.particleLimit);
  }
}

function drawMinimalParticles(ctx, audioData) {
  visualizationState.particleSystem.forEach(particle => {
    if (particle.life <= 0) return;

    const alpha = particle.life * 0.8;
    
    ctx.save();
    ctx.globalAlpha = alpha;

    // Gold particles only
    const goldIntensity = 0.6 + audioData.rhythm * 0.4;
    const color = `rgba(255, 215, 0, ${goldIntensity})`;

    // Subtle glow
    const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
    ctx.fill();

    // Core particle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  });
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  
  if (!audio.paused) {
    analyzeAudio();
    drawSymphonyVisualization();
  }
}

// Utility Functions
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateTimeDisplay() {
  if (currentTimeEl && totalTimeEl) {
    currentTimeEl.textContent = formatTime(audio.currentTime || 0);
    totalTimeEl.textContent = formatTime(audio.duration || 0);
  }
}

function updateProgress() {
  if (isFinite(audio.duration) && audio.duration > 0) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  } else {
    progress.value = 0;
  }
  updateTimeDisplay();
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
  updateTimeDisplay();
}

function changeTrack(idx) {
  audio.pause();
  current = idx;
  audio.src = tracks[current].src;
  audio.load();
  updateUI();
  setActive();
  playTrack();
}

function playTrack() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  audio.play().then(() => {
    playBtn.innerHTML = iconPause;
  }).catch(err => {
    console.error('Playback failed:', err);
  });
}

function pauseTrack() {
  audio.pause();
  playBtn.innerHTML = iconPlay;
}

// Event Listeners
playBtn?.addEventListener('click', () => {
  if (audio.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

nextBtn?.addEventListener('click', () => {
  changeTrack((current + 1) % tracks.length);
});

prevBtn?.addEventListener('click', () => {
  changeTrack((current - 1 + tracks.length) % tracks.length);
});

progress?.addEventListener('input', () => {
  if (isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

volume?.addEventListener('input', () => {
  audio.volume = volume.value;
});

playlistToggle?.addEventListener('click', () => {
  playlistSection?.classList.toggle('active');
});

playlistClose?.addEventListener('click', () => {
  playlistSection?.classList.remove('active');
});

playlistItems.forEach((el) => {
  el.addEventListener('click', () => {
    const idx = Number(el.dataset.index);
    if (!Number.isNaN(idx)) {
      changeTrack(idx);
    }
  });
});

// Audio Event Listeners
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateProgress);
audio.addEventListener('ended', () => {
  changeTrack((current + 1) % tracks.length);
});

// Initialize with responsive setup
function initialize() {
  detectDevicePerformance();
  setupResponsiveCanvas();
  
  if (tracks.length > 0) {
    audio.src = tracks[current].src;
    updateUI();
    setActive();
  }
  
  // Start animation
  animate();
}

// Handle window resize
window.addEventListener('resize', () => {
  setupResponsiveCanvas();
});

// Handle orientation change on mobile
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    setupResponsiveCanvas();
  }, 100);
});

// Initialize everything
initialize();

// Global API
window.audioPlayer = {
  playTrack: (index, preview = false) => {
    if (preview) {
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
