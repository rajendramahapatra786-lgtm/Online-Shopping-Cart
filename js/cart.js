// Cart Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
    displayCart();
    
    // Clear cart button
    document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
        if (cart.length > 0 && confirm('Clear your cart?')) {
            cart = [];
            saveCart();
            updateCartCount();
            displayCart();
            showNotification('Cart cleared');
        }
    });
    
    // Checkout button
    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Thank you for your order!\nTotal: $${calculateTotal().toFixed(2)}`);
            cart = [];
            saveCart();
            updateCartCount();
            displayCart();
        } else {
            showNotification('Your cart is empty');
        }
    });
});

// Display cart items
function displayCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <span class="empty-cart-icon">🛒</span>
                <h3>Your cart is empty</h3>
                <a href="products.html" class="btn btn-primary">Shop Now</a>
            </div>
        `;
        updateSummary();
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn plus">+</button>
            </div>
            <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="cart-item-remove">🗑️</button>
        </div>
    `).join('');
    
    attachCartEvents();
    updateSummary();
}

// Attach cart events
function attachCartEvents() {
    // Quantity buttons
    document.querySelectorAll('.minus').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.closest('.cart-item').dataset.id);
            const item = cart.find(i => i.id === id);
            if (item.quantity > 1) {
                item.quantity--;
                updateCart();
            }
        });
    });
    
    document.querySelectorAll('.plus').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.closest('.cart-item').dataset.id);
            const item = cart.find(i => i.id === id);
            item.quantity++;
            updateCart();
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.closest('.cart-item').dataset.id);
            cart = cart.filter(i => i.id !== id);
            updateCart();
            showNotification('Item removed');
        });
    });
}

// Update cart after changes
function updateCart() {
    saveCart();
    updateCartCount();
    displayCart();
}

// Update order summary
function updateSummary() {
    const subtotal = calculateSubtotal();
    document.getElementById('cart-subtotal') && (document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2));
    document.getElementById('tax-amount') && (document.getElementById('tax-amount').textContent = calculateTax().toFixed(2));
    document.getElementById('shipping-cost') && (document.getElementById('shipping-cost').textContent = calculateShipping().toFixed(2));
    document.getElementById('cart-total') && (document.getElementById('cart-total').textContent = calculateTotal().toFixed(2));
}