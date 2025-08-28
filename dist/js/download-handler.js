// Download Handler for purchased tracks
class DownloadHandler {
  constructor() {
    this.init();
  }

  init() {
    // Listen for successful track purchases
    window.addEventListener('track:purchased', (e) => {
      const { trackId } = e.detail;
      this.enableDownload(trackId);
    });

    // Listen for payment success events
    window.addEventListener('payment:success', (e) => {
      const { type, trackId } = e.detail;
      if (type === 'track' && trackId) {
        // Grant access and enable download
        if (window.PremiumGate) {
          window.PremiumGate.grantTrackAccess(trackId);
        }
        this.showDownloadOption(trackId);
      }
    });
  }

  enableDownload(trackId) {
    // Find the track data
    const track = this.getTrackData(trackId);
    if (!track) return;

    // Show download notification
    this.showDownloadNotification(track);
  }

  getTrackData(trackId) {
    const tracks = [
      {
        id: "freestab",
        title: "Freestab",
        artist: "G'z Radio",
        src: "/audio/freestab.mp3",
        downloadUrl: "/audio/freestab.mp3"
      },
      {
        id: "mazingich",
        title: "Mazingich", 
        artist: "G'z Radio",
        src: "/audio/mazingich.wav",
        downloadUrl: "/audio/mazingich.wav"
      },
      {
        id: "DISSTAB",
        title: "DISSTAB",
        artist: "G'z Radio", 
        src: "/audio/DISSTAB.wav",
        downloadUrl: "/audio/DISSTAB.wav"
      }
    ];

    return tracks.find(track => track.id === trackId);
  }

  showDownloadOption(trackId) {
    const track = this.getTrackData(trackId);
    if (!track) return;

    // Create download button
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.innerHTML = `
      <span>⬇️ Download "${track.title}"</span>
    `;
    downloadBtn.style.cssText = `
      background: linear-gradient(45deg, #00d4aa, #00a085);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      margin: 1rem 0;
      transition: all 0.3s ease;
      display: block;
      width: 100%;
    `;

    downloadBtn.addEventListener('click', () => {
      this.downloadTrack(track);
    });

    downloadBtn.addEventListener('mouseenter', () => {
      downloadBtn.style.transform = 'translateY(-2px)';
      downloadBtn.style.boxShadow = '0 8px 20px rgba(0, 212, 170, 0.3)';
    });

    downloadBtn.addEventListener('mouseleave', () => {
      downloadBtn.style.transform = 'translateY(0)';
      downloadBtn.style.boxShadow = 'none';
    });

    // Add to premium gate actions
    const premiumActions = document.querySelector('.premium-actions');
    if (premiumActions) {
      // Remove existing download button if any
      const existingBtn = premiumActions.querySelector('.download-btn');
      if (existingBtn) existingBtn.remove();
      
      premiumActions.insertBefore(downloadBtn, premiumActions.firstChild);
    }
  }

  showDownloadNotification(track) {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <h4>🎉 Purchase Complete!</h4>
        <p>You can now stream and download "${track.title}"</p>
        <button class="download-now-btn" onclick="window.downloadHandler.downloadTrack(${JSON.stringify(track).replace(/"/g, '&quot;')})">
          Download Now
        </button>
      </div>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(40, 40, 40, 0.95));
      border: 1px solid #00d4aa;
      border-radius: 12px;
      padding: 1.5rem;
      color: white;
      z-index: 3000;
      min-width: 300px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      animation: slideIn 0.3s ease;
    `;

    // Add styles for notification content
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .download-notification h4 {
        margin: 0 0 0.5rem 0;
        color: #00d4aa;
        font-size: 1.1rem;
      }
      .download-notification p {
        margin: 0 0 1rem 0;
        font-size: 0.9rem;
        opacity: 0.9;
      }
      .download-now-btn {
        background: #00d4aa;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        transition: background 0.3s ease;
      }
      .download-now-btn:hover {
        background: #00a085;
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  async downloadTrack(track) {
    try {
      // Show loading state
      const downloadBtns = document.querySelectorAll('.download-btn, .download-now-btn');
      downloadBtns.forEach(btn => {
        btn.disabled = true;
        btn.textContent = 'Downloading...';
      });

      // Fetch the audio file
      const response = await fetch(track.downloadUrl);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${track.artist} - ${track.title}.${track.downloadUrl.split('.').pop()}`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Show success message
      this.showDownloadSuccess(track);

    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      // Reset button states
      const downloadBtns = document.querySelectorAll('.download-btn, .download-now-btn');
      downloadBtns.forEach(btn => {
        btn.disabled = false;
        btn.innerHTML = btn.classList.contains('download-btn') 
          ? `<span>⬇️ Download "${track.title}"</span>`
          : 'Download Now';
      });
    }
  }

  showDownloadSuccess(track) {
    // Simple success notification
    const success = document.createElement('div');
    success.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #00d4aa;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      z-index: 3000;
      font-weight: 600;
    `;
    success.textContent = `✅ "${track.title}" downloaded successfully!`;
    
    document.body.appendChild(success);
    
    setTimeout(() => {
      if (success.parentNode) {
        success.parentNode.removeChild(success);
      }
    }, 3000);
  }
}

// Initialize download handler
window.downloadHandler = new DownloadHandler();
