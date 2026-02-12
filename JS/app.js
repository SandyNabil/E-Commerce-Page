
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