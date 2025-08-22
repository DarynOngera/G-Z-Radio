/* Shopping Cart Management */
class ShoppingCart {
  constructor() {
    this.items = this.loadCart();
    this.listeners = [];
    this.init();
  }

  init() {
    // Create cart UI elements
    this.createCartButton();
    this.createCartModal();
    this.updateCartButton();
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const saved = localStorage.getItem('gz-radio-cart');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  // Save cart to localStorage
  saveCart() {
    try {
      localStorage.setItem('gz-radio-cart', JSON.stringify(this.items));
      this.notifyListeners();
      this.updateCartButton();
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  // Add item to cart
  addItem(product, size, color, quantity = 1) {
    const existingIndex = this.items.findIndex(item => 
      item.id === product.id && 
      item.selectedSize === size && 
      item.selectedColor === color
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        selectedSize: size,
        selectedColor: color,
        quantity: quantity,
        slug: product.slug
      });
    }

    this.saveCart();
    this.showAddedToCartMessage(product.name);
  }

  // Remove item from cart
  removeItem(id, size, color) {
    this.items = this.items.filter(item => 
      !(item.id === id && item.selectedSize === size && item.selectedColor === color)
    );
    this.saveCart();
  }

  // Update item quantity
  updateQuantity(id, size, color, quantity) {
    const item = this.items.find(item => 
      item.id === id && item.selectedSize === size && item.selectedColor === color
    );
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id, size, color);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  // Get cart total
  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Get cart item count
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Clear cart
  clearCart() {
    this.items = [];
    this.saveCart();
  }

  // Show success message when item is added to cart
  showAddedToCartMessage(productName) {
    // Remove any existing message
    const existingMessage = document.querySelector('.cart-success-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create success message
    const message = document.createElement('div');
    message.className = 'cart-success-message';
    message.innerHTML = `
      <div class="success-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <span><strong>${productName}</strong> added to cart!</span>
      </div>
    `;

    // Add to page
    document.body.appendChild(message);

    // Animate in
    setTimeout(() => {
      message.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      message.classList.add('hide');
      setTimeout(() => {
        if (message.parentNode) {
          message.remove();
        }
      }, 300);
    }, 3000);
  }

  // Create cart button in header
  createCartButton() {
    const cartContainer = document.querySelector('#cart-container');
    if (!cartContainer) return;

    const cartButton = document.createElement('button');
    cartButton.id = 'cart-button';
    cartButton.className = 'cart-button';
    cartButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span class="cart-count">0</span>
    `;
    
    cartButton.addEventListener('click', () => this.toggleCart());
    cartContainer.appendChild(cartButton);
  }

  // Update cart button count
  updateCartButton() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const count = this.getItemCount();
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'block' : 'none';
    }
  }

  // Create cart modal
  createCartModal() {
    const modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.className = 'cart-modal';
    modal.innerHTML = `
      <div class="cart-modal-content">
        <div class="cart-header">
          <h3>Shopping Cart</h3>
          <button class="cart-close">&times;</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-footer">
          <div class="cart-total">
            <strong>Total: $<span id="cart-total">0.00</span></strong>
          </div>
          <button class="checkout-btn" id="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector('.cart-close').addEventListener('click', () => this.closeCart());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeCart();
    });
    modal.querySelector('#checkout-btn').addEventListener('click', () => this.goToCheckout());
  }

  // Toggle cart modal
  toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'block') {
      this.closeCart();
    } else {
      this.openCart();
    }
  }

  // Open cart modal
  openCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
    this.renderCartItems();
  }

  // Close cart modal
  closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
  }

  // Render cart items
  renderCartItems() {
    const container = document.querySelector('.cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (this.items.length === 0) {
      container.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      totalElement.textContent = '0.00';
      return;
    }

    container.innerHTML = this.items.map(item => `
      <div class="cart-item" data-id="${item.id}" data-size="${item.selectedSize}" data-color="${item.selectedColor}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Size: ${item.selectedSize} | Color: ${item.selectedColor}</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <button class="quantity-btn minus" data-action="decrease">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn plus" data-action="increase">+</button>
          <button class="remove-btn" data-action="remove">Remove</button>
        </div>
      </div>
    `).join('');

    totalElement.textContent = this.getTotal().toFixed(2);

    // Add event listeners to cart items
    container.querySelectorAll('.quantity-btn, .remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleCartAction(e));
    });
  }

  // Handle cart item actions
  handleCartAction(e) {
    const button = e.target;
    const cartItem = button.closest('.cart-item');
    const id = cartItem.dataset.id;
    const size = cartItem.dataset.size;
    const color = cartItem.dataset.color;
    const action = button.dataset.action;

    const item = this.items.find(item => 
      item.id === id && item.selectedSize === size && item.selectedColor === color
    );

    if (!item) return;

    switch (action) {
      case 'increase':
        this.updateQuantity(id, size, color, item.quantity + 1);
        break;
      case 'decrease':
        this.updateQuantity(id, size, color, item.quantity - 1);
        break;
      case 'remove':
        this.removeItem(id, size, color);
        break;
    }

    this.renderCartItems();
  }

  // Show added to cart message
  showAddedToCartMessage(productName) {
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.textContent = `${productName} added to cart!`;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.classList.add('show');
    }, 100);

    setTimeout(() => {
      message.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(message);
      }, 300);
    }, 2000);
  }

  // Go to checkout
  goToCheckout() {
    if (this.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Prepare items for payment
    const paymentItems = this.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.selectedSize,
      color: item.selectedColor
    }));
    
    const total = this.getTotal();
    
    // Open payment modal for merchandise
    console.log('🛍️ Initiating merchandise payment:', { total, itemCount: paymentItems.length });
    
    if (window.paymentModal) {
      window.paymentModal.open({
        type: 'merchandise',
        amount: total,
        items: paymentItems,
        title: `Complete Your Order (${paymentItems.length} item${paymentItems.length !== 1 ? 's' : ''})`
      });
    } else {
      console.error('Payment modal not available');
      alert('Payment system is loading. Please try again in a moment.');
    }
  }

  // Add listener for cart changes
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Notify listeners of cart changes
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.items));
  }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.cart = new ShoppingCart();
  
  // Inject CSS for cart success message
  const style = document.createElement('style');
  style.textContent = `
    .cart-success-message {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(45deg, #4ade80, #22c55e);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(74, 222, 128, 0.3);
      z-index: 10000;
      transform: translateX(400px);
      opacity: 0;
      transition: all 0.3s ease;
      max-width: 300px;
    }

    .cart-success-message.show {
      transform: translateX(0);
      opacity: 1;
    }

    .cart-success-message.hide {
      transform: translateX(400px);
      opacity: 0;
    }

    .success-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .success-content svg {
      flex-shrink: 0;
    }

    .success-content span {
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .cart-success-message {
        right: 10px;
        left: 10px;
        max-width: none;
        transform: translateY(-100px);
      }

      .cart-success-message.show {
        transform: translateY(0);
      }

      .cart-success-message.hide {
        transform: translateY(-100px);
      }
    }
  `;
  document.head.appendChild(style);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShoppingCart;
}
