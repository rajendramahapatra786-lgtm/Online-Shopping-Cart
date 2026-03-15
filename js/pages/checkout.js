// Show order summary on checkout page
document.addEventListener('DOMContentLoaded', function() {
    let orderItemsDiv = document.getElementById('orderItems');
    let orderTotalSpan = document.getElementById('orderTotal');
    
    if(!orderItemsDiv) return;
    
    let cart = getCart();
    let subtotal = getCartTotal();
    let shipping = subtotal > 999 ? 0 : 49;
    let total = subtotal + shipping;
    
    if(cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    orderItemsDiv.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name} (${item.size}) x ${item.qty}</span>
            <span>${formatPrice(item.price * item.qty)}</span>
        </div>
    `).join('');
    
    if(orderTotalSpan) orderTotalSpan.textContent = formatPrice(total);
    
    // Place order button
    let placeBtn = document.getElementById('placeOrder');
    if(placeBtn) {
        placeBtn.addEventListener('click', function() {
            alert('Order placed! (Demo Project)');
            saveCart([]); // Clear cart
            window.location.href = 'index.html';
        });
    }
});