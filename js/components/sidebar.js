// Cart Sidebar Functionality
let sidebarOpen = false;

function toggleSidebar() {
    let sidebar = document.getElementById('cartSidebar');
    let overlay = document.getElementById('overlay');
    
    if(!sidebar) return;
    
    sidebarOpen = !sidebarOpen;
    
    if(sidebarOpen) {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        updateSidebar();
    } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    }
}

function updateSidebar() {
    let sidebarItems = document.getElementById('sidebarItems');
    let sidebarTotal = document.getElementById('sidebarTotal');
    
    if(!sidebarItems) return;
    
    let cart = getCart();
    
    if(cart.length === 0) {
        sidebarItems.innerHTML = '<p class="empty">Your cart is empty</p>';
        if(sidebarTotal) sidebarTotal.textContent = '₹0';
        return;
    }
    
    sidebarItems.innerHTML = cart.map(item => `
        <div class="sidebar-item">
            <img src="assets/images/products/${item.img}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>Size: ${item.size} | Qty: ${item.qty}</p>
                <p class="price">${formatPrice(item.price * item.qty)}</p>
            </div>
        </div>
    `).join('');
    
    if(sidebarTotal) {
        let total = getCartTotal();
        sidebarTotal.textContent = formatPrice(total);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    let cartIcon = document.querySelector('.nav-icons a[href="cart.html"]');
    if(cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }
    
    let closeBtn = document.getElementById('closeSidebar');
    if(closeBtn) {
        closeBtn.addEventListener('click', toggleSidebar);
    }
    
    let overlay = document.getElementById('overlay');
    if(overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
});