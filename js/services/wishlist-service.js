// Add to wishlist
function addToWishlist(productId) {
    let wishlist = getWishlist();
    let product = products.find(p => p.id === productId);
    
    if(!product) return;
    
    // Check if already in wishlist
    let exists = wishlist.some(item => item.id === productId);
    
    if(!exists) {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img
        });
        saveWishlist(wishlist);
        alert('Added to wishlist!');
    } else {
        alert('Already in wishlist!');
    }
}

// Remove from wishlist
function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist(wishlist);
    
    if(window.location.pathname.includes('wishlist.html')) {
        showWishlist();
    }
}

// Check if in wishlist
function inWishlist(productId) {
    let wishlist = getWishlist();
    return wishlist.some(item => item.id === productId);
}