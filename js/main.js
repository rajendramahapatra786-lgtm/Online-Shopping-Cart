// Main JS file - runs on all pages
document.addEventListener('DOMContentLoaded', function() {
    
    // Update cart and wishlist counts
    updateCartCount();
    updateWishCount();
    
    // User icon click - show simple dashboard
    let userIcon = document.getElementById('userIcon');
    if(userIcon) {
        userIcon.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Welcome Anime Fan! 👋\nThis is a demo project.\nCheck your wishlist and cart.');
        });
    }
    
    // Active link highlighting
    let currentPage = window.location.pathname.split('/').pop();
    let navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        let linkPage = link.getAttribute('href');
        if(linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Search functionality
    let searchBtn = document.querySelector('.search-box button');
    let searchInput = document.getElementById('search');
    
    if(searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            let term = searchInput.value.trim();
            if(term) {
                if(currentPage === 'shop.html') {
                    sessionStorage.setItem('searchTerm', term);
                    window.location.reload();
                } else {
                    window.location.href = 'shop.html?search=' + encodeURIComponent(term);
                }
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
});