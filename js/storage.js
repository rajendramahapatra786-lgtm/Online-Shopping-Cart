// LocalStorage Management
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    return cart;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Update cart count badge
function updateCartCount() {
    const badges = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems === 0 ? 'none' : 'inline';
    });
}

// Calculate totals
function calculateSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function calculateTax() {
    return calculateSubtotal() * 0.10;
}

function calculateShipping() {
    return calculateSubtotal() > 0 ? 5.99 : 0;
}

function calculateTotal() {
    const subtotal = calculateSubtotal();
    return subtotal + calculateTax() + calculateShipping();
}

// Show notification
function showNotification(message) {
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    container.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', loadCart);