// main.js - Global functions for all pages
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize cart and wishlist counts
    if (typeof CartService !== 'undefined') {
        CartService.updateCartCount();
    }
    
    if (typeof WishlistService !== 'undefined') {
        WishlistService.updateWishlistCount();
    }
    
    // Handle search from sessionStorage (for index.html)
    const searchQuery = sessionStorage.getItem('searchQuery');
    if (searchQuery && window.location.pathname.includes('index.html')) {
        const searchInput = document.getElementById('globalSearchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
        }
        
        // Filter products if on index page
        if (typeof filterProductsBySearch === 'function') {
            filterProductsBySearch(searchQuery);
        }
        
        // Clear after use
        sessionStorage.removeItem('searchQuery');
    }
    
    // Add notification styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--success);
                color: white;
                padding: 12px 24px;
                border-radius: var(--radius-sm);
                box-shadow: var(--shadow-lg);
                transform: translateX(400px);
                transition: transform 0.3s ease;
                z-index: 9999;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .no-products {
                text-align: center;
                padding: 50px;
                color: var(--gray);
                font-size: 1.2rem;
                grid-column: 1 / -1;
            }
            
            .loading-spinner {
                grid-column: 1 / -1;
                text-align: center;
                padding: 50px;
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 4px solid var(--gray);
                border-top-color: var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
});

// Global search filter function for index.html
function filterProductsBySearch(query) {
    const productsGrid = document.getElementById('allProductsGrid');
    if (!productsGrid) return;
    
    const allProducts = window.products || [];
    const filtered = FilterUtils.searchProducts(allProducts, query);
    
    if (filtered.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products found for "' + query + '"</div>';
        return;
    }
    
    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
                <div class="product-actions">
                    <button class="action-btn" onclick="CartService.addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="action-btn ${WishlistService.isInWishlist(product.id) ? 'active' : ''}" 
                            onclick="WishlistService.addToWishlist(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${Helpers.getStarRating(product.rating)}</span>
                    <span class="reviews">(${product.reviews})</span>
                </div>
                <div class="product-price">${Helpers.formatPrice(product.price)}</div>
                <a href="${product.category}.html" class="view-category">View more in ${product.category}</a>
            </div>
        </div>
    `).join('');
}