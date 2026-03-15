// Dashboard Functionality
let dashboardOpen = false;

function toggleDashboard() {
    let dashboard = document.getElementById('userDashboard');
    
    if(!dashboard) return;
    
    dashboardOpen = !dashboardOpen;
    
    if(dashboardOpen) {
        dashboard.classList.add('open');
        updateDashboardStats();
    } else {
        dashboard.classList.remove('open');
    }
}

function updateDashboardStats() {
    let cart = getCart();
    let wishlist = getWishlist();
    
    let cartCount = document.getElementById('dashboardCartCount');
    let wishCount = document.getElementById('dashboardWishCount');
    
    if(cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.qty, 0);
    }
    
    if(wishCount) {
        wishCount.textContent = wishlist.length;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    let userIcon = document.getElementById('userIcon');
    if(userIcon) {
        userIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleDashboard();
        });
    }
    
    let closeBtn = document.getElementById('closeDashboard');
    if(closeBtn) {
        closeBtn.addEventListener('click', toggleDashboard);
    }
});