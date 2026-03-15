// Add item to cart
function addToCart(productId, size = 'M', qty = 1) {
    let cart = getCart();
    let product = products.find(p => p.id === productId);
    
    if(!product) return;
    
    // Check if already in cart
    let existing = cart.find(item => item.id === productId && item.size === size);
    
    if(existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            qty: qty,
            img: product.img
        });
    }
    
    saveCart(cart);
    alert('Added to cart!');
}

// Remove from cart
function removeFromCart(productId, size) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart(cart);
    if(window.location.pathname.includes('cart.html')) {
        showCart();
    }
}

// Update quantity
function updateQty(productId, size, newQty) {
    if(newQty < 1) return;
    
    let cart = getCart();
    let item = cart.find(i => i.id === productId && i.size === size);
    
    if(item) {
        item.qty = newQty;
        saveCart(cart);
        if(window.location.pathname.includes('cart.html')) {
            showCart();
        }
    }
}

// Get cart total
function getCartTotal() {
    let cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

// Clear cart
function clearCart() {
    if(confirm('Clear your cart?')) {
        saveCart([]);
        if(window.location.pathname.includes('cart.html')) {
            showCart();
        }
    }
}