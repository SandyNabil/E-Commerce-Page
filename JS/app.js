
// Handle color selection
document.querySelectorAll('.product-colors img').forEach(img => {
  img.addEventListener('click', function() {
    document.querySelectorAll('.product-colors img').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// Handle size selection
document.querySelectorAll('.size').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.size').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});
// -------------------------------------------------------------------------------
// // import all classes
// // initialize cart
// // initialize product list
// // bind events
// ```

// ---

// ## **Final Flow:**
// ```
// User opens page
//     ↓
// app.js initializes
//     ↓
// ProductList renders 4 products from data.js
//     ↓
// User can:
//   - Click size → active state
//   - Click color → active state  
//   - Click Add to Cart → Cart.addToCart()
//     ↓
// Cart updates counter + localStorage

