// Update counts on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateWishCount();
    
    // Search functionality
    let searchBtn = document.querySelector('.search-box button');
    let searchInput = document.getElementById('search');
    
    if(searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            let term = searchInput.value;
            if(term && window.location.pathname.includes('shop.html')) {
                // Filter will be handled by shop.js
                sessionStorage.setItem('searchTerm', term);
                window.location.reload();
            } else if(term) {
                window.location.href = 'shop.html?search=' + term;
            }
        });
    }
});