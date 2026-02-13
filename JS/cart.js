/*
 * Cart Class
 * Handles shopping cart logic
 * Manages adding products, updating cart count, and localStorage persistence
 */

class Cart {
  constructor() {
    // Initialize empty cart array
    this.items = [];

    // Cache DOM elements
    this.cartCountElement = document.querySelector('.cart span:last-child');
    this.addToCartBtn = document.querySelector('.add-to-cart');

    // Load cart from localStorage (if exists from previous session)
    this.loadCart();

    // Bind Add to Cart button event
    this.bindAddToCartEvent();
  }

  
//    Add product to cart with selected size and color
addToCart(product, size, color) {
  // Validate inputs
  if (!product || !size || !color) {
    alert('Please select size and color');
    return false;
  }

  // Check if SAME product + SAME size + SAME color exists
  const existingItem = this.items.find(
    item => 
      item.id === product.id && 
      item.size === size && 
      item.color === color 
  );

  if (existingItem) {
    // Same item → increase quantity
    existingItem.quantity += 1;
  } else {
    // Different → add new item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imgSrc: product.imgSrc,
      size: size,
      color: color, 
      quantity: 1,
      addedAt: new Date().toISOString()
    };
    this.items.push(cartItem);
  }

  this.saveCart();
  this.updateCartCount();
  this.showSuccessMessage();
  return true;
}

  /**
   * Remove product from cart by id and size
   * @param {Number} productId - Product ID
   * @param {String} size - Product size
   */
  removeFromCart(productId, size) {
    this.items = this.items.filter(
      item => !(item.id === productId && item.size === size)
    );

    this.saveCart();
    this.updateCartCount();
  }

  /*
   * Get total number of items in cart
   * Sums up all quantities
   * @returns {Number} Total items count
   */
  getCartCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get all cart items
   * @returns {Array} Array of cart items
   */
  getCartItems() {
    return this.items;
  }

  /**
   * Clear entire cart
   */
  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartCount();
  }

  /**
   * Save cart to localStorage
   * Persists cart data across page refreshes
   */
  saveCart() {
    localStorage.setItem('jewelry-cart', JSON.stringify(this.items));
  }

  /**
   * Load cart from localStorage
   * Restores cart from previous session
   */
  loadCart() {
    const savedCart = localStorage.getItem('jewelry-cart');
    
    if (savedCart) {
      try {
        this.items = JSON.parse(savedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        this.items = [];
      }
    }

    // Update counter on page load
    this.updateCartCount();
  }

  /**
   * Update cart counter in header
   * Displays total number of items
   */
  updateCartCount() {
    const count = this.getCartCount();
    this.cartCountElement.textContent = count;
  }

  /**
   * Bind Add to Cart button click event
   * Gets selected size, color and product, then adds to cart
   */
bindAddToCartEvent() {
  this.addToCartBtn.addEventListener('click', () => {
    // Get selected size
    const selectedSize = document.querySelector('.size.active');
    // Get selected color
    const selectedColor = document.querySelector('.product-colors img.active');

    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    if (!selectedColor) {
      alert('Please select a color');
      return;
    }

    const size = selectedSize.textContent;
    const color = selectedColor.alt; 

    const product = window.currentProduct;

    if (!product) {
      alert('Please select a product first');
      return;
    }

    this.addToCart(product, size, color);
  });
}

  /*
   * Show success message when item added
   * Visual feedback to user
   */
  showSuccessMessage() {
    // Change button text temporarily
    const originalText = this.addToCartBtn.textContent;
    const originalBg = this.addToCartBtn.style.backgroundColor;

    this.addToCartBtn.textContent = '✓ Added to Cart';
    this.addToCartBtn.style.backgroundColor = '#90EE90';
    this.addToCartBtn.style.color = '#000';

    // Revert after 2 seconds
    setTimeout(() => {
      this.addToCartBtn.textContent = originalText;
      this.addToCartBtn.style.backgroundColor = originalBg;
      this.addToCartBtn.style.color = '#000';
    }, 2000);
  }
}

export default Cart;