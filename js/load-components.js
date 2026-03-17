// load-components.js - Loads navbar and footer on all pages
document.addEventListener('DOMContentLoaded', function() {
    
    // Load navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            
            // Update cart and wishlist counts after navbar loads
            if (typeof CartService !== 'undefined') {
                CartService.updateCartCount();
            }
            if (typeof WishlistService !== 'undefined') {
                WishlistService.updateWishlistCount();
            }
            
            // Highlight current page
            highlightCurrentPage();
            
            // Setup search functionality
            setupGlobalSearch();
        })
        .catch(error => console.error('Error loading navbar:', error));
    
    // Load footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
    
    // Function to highlight current page in navbar
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    // Function to setup global search
    function setupGlobalSearch() {
        const searchInput = document.getElementById('globalSearchInput');
        const searchBtn = document.getElementById('globalSearchBtn');
        
        if (searchInput && searchBtn) {
            const performSearch = () => {
                const query = searchInput.value.trim();
                if (query) {
                    // Store search query in sessionStorage
                    sessionStorage.setItem('searchQuery', query);
                    // Redirect to index.html (all products page)
                    window.location.href = 'index.html';
                }
            };
            
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }
});