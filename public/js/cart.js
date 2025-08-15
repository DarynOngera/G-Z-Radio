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

  // Create cart button in header
  createCartButton() {
    const nav = document.querySelector('.nav-links');
    if (!nav) return;

    const cartButton = document.createElement('button');
    cartButton.id = 'cart-button';
    cartButton.className = 'cart-button';
    cartButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
      </svg>
      <span class="cart-count">0</span>
    `;
    
    cartButton.addEventListener('click', () => this.toggleCart());
    nav.appendChild(cartButton);
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
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShoppingCart;
}
