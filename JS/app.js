/*
 * ProductList and Cart functionality
 * Runs when page loads
 */

import products from './data.js';
import ProductList from './productList.js';
import Cart from './cart.js';

class App {
  constructor() {
    // Initialize ProductList with products data
    this.productList = new ProductList(products);
    
    // Initialize Cart
    this.cart = new Cart();

    // Initialize the app
    this.init();
  }

  /**
   * Initialize app
   * Render products and bind events
   */
  init() {
    // 1. Render all 4 products in Ring Collection
    this.productList.renderProducts();

    // 2. Select first product as default
    if (products.length > 0) {
      this.productList.selectProduct(products[0]);
      window.currentProduct = products[0];
      
      // Mark first card as active
      const firstCard = document.querySelector('.card');
      if (firstCard) {
        firstCard.classList.add('active');
      }
    }

    // 3. Bind all event listeners
    this.bindEvents();
  }

  /**
   * Bind all event listeners
   * Color selection, Size selection
   */
  bindEvents() {
    // ========== COLOR SELECTION ==========
    document.querySelectorAll('.product-colors img').forEach(img => {
      img.addEventListener('click', (e) => {
        // Remove active from all colors
        document.querySelectorAll('.product-colors img').forEach(i => {
          i.classList.remove('active');
        });
        
        // Add active to clicked color
        e.target.classList.add('active');
      });
    });

    // ========== SIZE SELECTION ==========
    document.querySelectorAll('.size').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active from all sizes
        document.querySelectorAll('.size').forEach(b => {
          b.classList.remove('active');
        });
        
        // Add active to clicked size
        e.target.classList.add('active');
      });
    });

    // ========== PRODUCT CARD SELECTION ==========
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Get the clicked card
        const clickedCard = e.currentTarget;
        
        // Get product index from card position
        const productIndex = Array.from(
          document.querySelectorAll('.card')
        ).indexOf(clickedCard);

        // Remove active from all cards first
        document.querySelectorAll('.card').forEach(c => {
          c.classList.remove('active');
        });

        // Add active to clicked card
        clickedCard.classList.add('active');

        // Select the product
        const selectedProduct = products[productIndex];
        this.productList.selectProduct(selectedProduct);
        
        // Store globally for Cart to access
        window.currentProduct = selectedProduct;

        // Reset size and color selections
        this.resetSelections();

        //  Scroll to product section smoothly
        this.scrollToProduct();

        //  Animate main image
        this.animateProductImage();
      });
    });
  }

  /**
   * Reset size and color selections
   * Called when user selects a new product
   */
  resetSelections() {
    // Remove active class from all sizes
    document.querySelectorAll('.size').forEach(btn => {
      btn.classList.remove('active');
    });

    // Remove active class from all colors
    document.querySelectorAll('.product-colors img').forEach(img => {
      img.classList.remove('active');
    });

    // Set first color as default selected
    const firstColor = document.querySelector('.product-colors img');
    if (firstColor) {
      firstColor.classList.add('active');
    }
  }

  /**
   * Scroll to product details section smoothly
   * So user sees the updates
   */
  scrollToProduct() {
    const productSection = document.querySelector('.product');
    productSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }

  /**
   * Animate main product image
   * Fade in + scale effect
   */
  animateProductImage() {
    const mainImage = document.querySelector('.product-images > img');
    
    // Reset animation
    mainImage.style.animation = 'none';
    
    // Trigger animation
    setTimeout(() => {
      mainImage.style.animation = 'fadeInScale 0.6s ease-out';
    }, 10);
  }
}

// Initialize App when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});