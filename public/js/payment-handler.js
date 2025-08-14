/* Payment Success Handler and Premium Access Manager */

class PaymentHandler {
  constructor() {
    this.init();
  }

  init() {
    // Listen for payment success events from the payment modal
    window.addEventListener('payment:success', (event) => {
      this.handlePaymentSuccess(event.detail);
    });

    // Listen for payment callback updates (if using webhooks)
    this.setupPaymentStatusPolling();
  }

  handlePaymentSuccess(paymentData) {
    const { type, amount, duration, items, checkoutRequestId } = paymentData;

    if (type === 'music') {
      this.grantPremiumAccess(duration);
      this.showSuccessMessage('🎵 Premium access activated! Enjoy unlimited streaming.');
      
      // Redirect to listen page after success
      setTimeout(() => {
        window.location.href = '/listen';
      }, 2000);
      
    } else if (type === 'merchandise') {
      this.processMerchandiseOrder(items, checkoutRequestId);
      this.showSuccessMessage('🛍️ Order confirmed! You will receive a confirmation SMS shortly.');
      
      // Clear cart after successful payment
      if (window.cart) {
        window.cart.clearCart();
      }
    }

    // Store payment record for user history
    this.storePaymentRecord(paymentData);
  }

  grantPremiumAccess(duration = '30 days') {
    const expiresAt = new Date();
    
    if (duration === '7 days') {
      expiresAt.setDate(expiresAt.getDate() + 7);
    } else {
      expiresAt.setDate(expiresAt.getDate() + 30);
    }

    const premiumData = {
      grantedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      plan: duration === '7 days' ? 'weekly' : 'monthly',
      active: true
    };

    localStorage.setItem('gz-premium-access', JSON.stringify(premiumData));
    
    // Trigger premium access granted event
    window.dispatchEvent(new CustomEvent('premium:granted', { 
      detail: premiumData 
    }));

    console.log('Premium access granted:', premiumData);
  }

  processMerchandiseOrder(items, checkoutRequestId) {
    // Store order details for tracking
    const orderData = {
      id: checkoutRequestId,
      items: items,
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Store in local storage for order history
    const orders = JSON.parse(localStorage.getItem('gz-orders') || '[]');
    orders.unshift(orderData);
    localStorage.setItem('gz-orders', JSON.stringify(orders.slice(0, 10))); // Keep last 10 orders

    console.log('Order processed:', orderData);
  }

  storePaymentRecord(paymentData) {
    const payments = JSON.parse(localStorage.getItem('gz-payments') || '[]');
    const paymentRecord = {
      ...paymentData,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    
    payments.unshift(paymentRecord);
    localStorage.setItem('gz-payments', JSON.stringify(payments.slice(0, 20))); // Keep last 20 payments
  }

  showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'payment-success-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="success-icon">✅</div>
        <p>${message}</p>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(40, 40, 40, 0.95));
      border: 1px solid var(--accent-color-static);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      color: white;
      z-index: 3000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  setupPaymentStatusPolling() {
    // This would be used to poll payment status if needed
    // For now, we rely on the callback system
  }

  // Static method to check premium status
  static checkPremiumStatus() {
    const premiumData = localStorage.getItem('gz-premium-access');
    if (!premiumData) return { active: false };

    try {
      const data = JSON.parse(premiumData);
      const expiresAt = new Date(data.expiresAt);
      const now = new Date();
      
      if (expiresAt > now) {
        return { active: true, ...data };
      } else {
        // Premium expired, clean up
        localStorage.removeItem('gz-premium-access');
        return { active: false, expired: true };
      }
    } catch (error) {
      console.error('Error checking premium status:', error);
      return { active: false, error: true };
    }
  }

  // Static method to get user orders
  static getUserOrders() {
    return JSON.parse(localStorage.getItem('gz-orders') || '[]');
  }

  // Static method to get payment history
  static getPaymentHistory() {
    return JSON.parse(localStorage.getItem('gz-payments') || '[]');
  }
}

// Initialize payment handler
document.addEventListener('DOMContentLoaded', () => {
  window.paymentHandler = new PaymentHandler();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PaymentHandler;
}
