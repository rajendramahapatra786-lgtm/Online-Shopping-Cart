// Products Page JavaScript
const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'accessories', name: 'Accessories' }
];

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
    displayCategories();
    displayProducts('all');
});

// Display categories
function displayCategories() {
    const list = document.getElementById('category-list');
    if (!list) return;
    
    list.innerHTML = categories.map(cat => `
        <li><button class="category-btn ${cat.id === 'all' ? 'active' : ''}" data-category="${cat.id}">${cat.name}</button></li>
    `).join('');
    
    // Add category listeners
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayProducts(this.dataset.category);
        });
    });
}

// Display products by category
function displayProducts(category) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <h3>${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `).join('');
    
    // Add to cart listeners
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}