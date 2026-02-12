/*
 * ProductList Class
 * Handles rendering and selection of products in the Ring Collection
 * Updates main product display when a product is clicked
 */

class ProductList {
  constructor(products) {
    // Store all products data
    this.products = products;
    
    // Cache DOM elements for main product display
    this.mainImage = document.querySelector('.product-images > img');
    this.productTitle = document.querySelector('.product-info h1');
    this.productPrice = document.querySelector('#product-price');
    this.productDescription = document.querySelector('.product-info p:nth-of-type(3)');
    this.productsContainer = document.getElementById('products-container');
    
    // Currently selected product
    this.currentProduct = null;
  }

  /*
   * Render all products as cards in the Ring Collection
   * Creates clickable product cards
   */
  renderProducts() {
    // Clear container first
    this.productsContainer.innerHTML = '';

    // Loop through each product and create a card
    this.products.forEach(product => {
      // Create card element
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.imgSrc}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.price}</p>
      `;

      // Add click event to select this product
      card.addEventListener('click', () => this.selectProduct(product));

      // Add card to container
      this.productsContainer.appendChild(card);
    });
  }

  /*
   * Update main product display when user clicks a product card
   * Changes: Image, Title, Price, Description
   */
  selectProduct(product) {
    // Store the selected product
    this.currentProduct = product;

    // Update main image
    this.mainImage.src = product.imgSrc;
    this.mainImage.alt = product.name;

    // Update title
    this.productTitle.textContent = product.name;

    // Update price
    this.productPrice.textContent = product.price;

    // Update description (Piece Specifications)
    this.productDescription.textContent = product.description;

    // Optional: Add visual feedback (highlight selected card)
    this.highlightSelectedCard(product.id);
  }

  /**
   * Highlight the selected product card visually
   * @param {Number} productId - ID of selected product
   */
  highlightSelectedCard(productId) {
    // Remove active class from all cards
    document.querySelectorAll('.card').forEach(card => {
      card.classList.remove('active');
    });

    // Add active class to clicked card
    const selectedCard = document.querySelector(`.card:nth-child(${productId})`);
    if (selectedCard) {
      selectedCard.classList.add('active');
    }
  }

  /**
   * Get currently selected product
   * Used by Cart class to add product to cart
   * @returns {Object} Current product or null
   */
  getSelectedProduct() {
    return this.currentProduct;
  }
}

export default ProductList;