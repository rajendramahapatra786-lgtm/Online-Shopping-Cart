// Show wishlist items
document.addEventListener('DOMContentLoaded', function() {
    showWishlist();
});

function showWishlist() {
    let grid = document.getElementById('wishlistGrid');
    let emptyDiv = document.getElementById('emptyWishlist');
    
    if(!grid) return;
    
    let wishlist = getWishlist();
    
    if(wishlist.length === 0) {
        grid.style.display = 'none';
        if(emptyDiv) emptyDiv.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    if(emptyDiv) emptyDiv.style.display = 'none';
    
    grid.innerHTML = wishlist.map(item => {
        let product = products.find(p => p.id === item.id);
        return `
            <div class="product-card">
                <img src="assets/images/products/${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <span class="price">${formatPrice(item.price)}</span>
                <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
                <button class="remove-btn" onclick="removeFromWishlist(${item.id})" style="margin-top: 5px;">Remove</button>
            </div>
        `;
    }).join('');
}

// Add to cart from wishlist
function addToCartFromWishlist(productId) {
    addToCart(productId);
    // Optional: remove from wishlist after adding to cart
    // removeFromWishlist(productId);
}