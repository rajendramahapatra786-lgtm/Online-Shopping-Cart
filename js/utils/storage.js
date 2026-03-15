// Get cart from storage
function getCart() {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Get wishlist from storage
function getWishlist() {
    let wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

// Save wishlist to storage
function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishCount();
}

// Clear all storage
function clearStorage() {
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
    updateCartCount();
    updateWishCount();
}

// Update cart count in navbar
function updateCartCount() {
    let cart = getCart();
    let count = cart.reduce((total, item) => total + item.qty, 0);
    let badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        if(badge) badge.textContent = count;
    });
}

// Update wishlist count in navbar
function updateWishCount() {
    let wishlist = getWishlist();
    let badges = document.querySelectorAll('.wish-count');
    badges.forEach(badge => {
        if(badge) badge.textContent = wishlist.length;
    });
}