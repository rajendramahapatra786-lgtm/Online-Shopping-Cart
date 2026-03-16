// js/pages/anime-tees.js - SIMPLIFIED VERSION

// Make sure this runs only once
let rendered = false;

document.addEventListener('DOMContentLoaded', function() {
    // Prevent double rendering
    if (rendered) return;
    rendered = true;
    
    console.log('Loading anime tees page...');
    
    const grid = document.getElementById('animeTees');
    if (!grid) {
        console.error('Grid not found');
        return;
    }
    
    // Check if products exists
    if (typeof products === 'undefined') {
        console.error('Products data not loaded');
        grid.innerHTML = '<p style="color:red; padding:20px;">Error: Products data not loaded</p>';
        return;
    }
    
    // Filter anime tees
    const animeTees = products.filter(p => p.category === "anime-tee");
    console.log('Found', animeTees.length, 'anime tees');
    
    // Clear grid first
    grid.innerHTML = '';
    
    // Render products
    animeTees.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="assets/images/products/${product.img}" 
                 alt="${product.name}"
                 style="width:100%; height:200px; object-fit:cover;"
                 onerror="this.src='https://via.placeholder.com/300'">
            <div style="padding:10px;">
                <h3>${product.name}</h3>
                <p>${product.character}</p>
                <p><strong>₹${product.price}</strong> 
                   ${product.oldPrice ? `<del>₹${product.oldPrice}</del>` : ''}</p>
                <button onclick="addToCart(${product.id})" 
                        style="background:#2c3e50; color:white; padding:8px; width:100%; border:none;">
                    Add to Cart
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
    
    // Update counts
    updateCounts();
});

function updateCounts() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    });
    
    document.querySelectorAll('.wish-count').forEach(el => {
        el.textContent = wishlist.length;
    });
}

// Global functions
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    alert(`${product.name} added to cart!`);
};