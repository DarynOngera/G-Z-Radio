/* Clothing Section Integration */
document.addEventListener('DOMContentLoaded', () => {
  initializeClothingSection();
});

function initializeClothingSection() {
  // Wait for cart to be initialized
  const checkCart = setInterval(() => {
    if (window.cart) {
      clearInterval(checkCart);
      setupClothingInteractions();
    }
  }, 100);
}

function setupClothingInteractions() {
  // Color selection
  document.querySelectorAll('.color-option').forEach(button => {
    button.addEventListener('click', (e) => {
      const colorOptions = e.target.parentElement;
      colorOptions.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
      e.target.classList.add('selected');
    });
  });

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.dataset.productId;
      const card = e.target.closest('.clothing-card');
      
      if (!card) return;

      const selectedSize = card.querySelector('.size-select').value;
      const selectedColorElement = card.querySelector('.color-option.selected');
      const selectedColor = selectedColorElement ? selectedColorElement.dataset.color : 'Default';

      // Get product data from the card
      const product = getProductDataFromCard(card);
      
      if (product) {
        window.cart.addItem(product, selectedSize, selectedColor, 1);
      }
    });
  });
}

function getProductDataFromCard(card) {
  const productId = card.dataset.productId;
  const name = card.querySelector('h3').textContent;
  const priceText = card.querySelector('.price').textContent;
  const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  const image = card.querySelector('.card-image img').src;
  const slug = card.querySelector('.view-details-btn').getAttribute('href').split('/').pop();

  return {
    id: productId,
    name: name,
    price: price,
    images: [image],
    slug: slug
  };
}
