// Show cart items
document.addEventListener('DOMContentLoaded', function() {
    showCart();
});

function showCart() {
    let cartDiv = document.getElementById('cartItems');
    let subtotalSpan = document.getElementById('subtotal');
    let totalSpan = document.getElementById('total');
    
    if(!cartDiv) return;
    
    let cart = getCart();
    
    if(cart.length === 0) {
        cartDiv.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="shop.html">Shop now</a></p>';
        if(subtotalSpan) subtotalSpan.textContent = formatPrice(0);
        if(totalSpan) totalSpan.textContent = formatPrice(49);
        return;
    }
    
    cartDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="assets/images/products/${item.img}" alt="${item.name}" width="80">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
                <p class="price">${formatPrice(item.price)}</p>
            </div>
            <div class="item-qty">
                <button onclick="updateQty(${item.id}, '${item.size}', ${item.qty - 1})">-</button>
                <span>${item.qty}</span>
                <button onclick="updateQty(${item.id}, '${item.size}', ${item.qty + 1})">+</button>
            </div>
            <div class="item-total">
                <p>${formatPrice(item.price * item.qty)}</p>
                <button onclick="removeFromCart(${item.id}, '${item.size}')" class="remove-btn">✕</button>
            </div>
        </div>
    `).join('');
    
    let subtotal = getCartTotal();
    let shipping = subtotal > 999 ? 0 : 49;
    let total = subtotal + shipping;
    
    if(subtotalSpan) subtotalSpan.textContent = formatPrice(subtotal);
    if(totalSpan) totalSpan.textContent = formatPrice(total);
    
    let shippingSpan = document.getElementById('shipping');
    if(shippingSpan) shippingSpan.textContent = shipping === 0 ? 'Free' : formatPrice(shipping);
}

// Clear cart button
document.addEventListener('DOMContentLoaded', function() {
    let clearBtn = document.getElementById('clearCart');
    if(clearBtn) {
        clearBtn.addEventListener('click', clearCart);
    }
});