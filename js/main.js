// Home Page JavaScript
const products = [
    { id: 1, name: "Wireless Headphones", price: 79.99, image: "🎧", category: "electronics" },
    { id: 2, name: "Smart Watch", price: 199.99, image: "⌚", category: "electronics" },
    { id: 3, name: "Laptop Backpack", price: 49.99, image: "🎒", category: "accessories" },
    { id: 4, name: "Bluetooth Speaker", price: 59.99, image: "🔊", category: "electronics" }
];

// Initialize home page
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
    displayFeaturedProducts();
});

// Display featured products
function displayFeaturedProducts() {
    const grid = document.getElementById('featured-products');
    if (!grid) return;
    
    const featured = products.slice(0, 3);
    
    grid.innerHTML = featured.map(product => `
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

// Add to cart function
function addToCart(e) {
    const id = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}