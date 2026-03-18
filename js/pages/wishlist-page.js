// wishlist-page.js
document.addEventListener('DOMContentLoaded', function() {
    loadWishlistItems();
    
    // Update if wishlist changes in another tab
    window.addEventListener('storage', (e) => {
        if (e.key === WishlistService.WISHLIST_KEY) {
            loadWishlistItems();
        }
    });
});

function loadWishlistItems() {
    const wishlistItems = WishlistService.getWishlist();
    const container = document.getElementById('wishlistItems');
    const emptyState = document.getElementById('emptyWishlist');
    const countElement = document.getElementById('wishlistCount');

    // Update count
    if (countElement) {
        countElement.textContent = wishlistItems.length;
    }

    if (!wishlistItems || wishlistItems.length === 0) {
        if (container) container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    
    // Render wishlist items
    if (container) {
        container.innerHTML = wishlistItems.map(item => {
            const fullProduct = window.products.find(p => p.id === item.id) || item;
            
            return `
                <div class="wishlist-item" data-product-id="${item.id}">
                    <div class="wishlist-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    
                    <div class="wishlist-item-details">
                        <!-- Left side: Product Info -->
                        <div class="wishlist-item-info">
                            <div class="wishlist-item-category">${fullProduct?.type?.toUpperCase() || 'HOODIE'}</div>
                            <h3 class="wishlist-item-title">
                                <a href="product.html?id=${item.id}">${item.name}</a>
                            </h3>
                            
                            ${fullProduct?.rating ? `
                                <div class="wishlist-item-rating">
                                    <span class="stars">${'⭐'.repeat(Math.floor(fullProduct.rating))}</span>
                                    <span class="reviews">(${fullProduct.reviews || 0})</span>
                                </div>
                            ` : ''}
                            
                            <div class="wishlist-item-price">₹${(item.price || 0).toLocaleString()}</div>
                            
                            ${fullProduct?.sizes ? `
                                <div class="wishlist-item-sizes">
                                    <span class="size-label">Size:</span>
                                    <div class="size-options">
                                        ${fullProduct.sizes.map(size => 
                                            `<button class="size-btn" data-size="${size}">${size}</button>`
                                        ).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        
                        <!-- Right side: Action Buttons -->
                        <div class="wishlist-item-actions">
                            <button class="btn-move-cart" onclick="moveToCart(${item.id})">
                                <i class="fas fa-shopping-cart"></i>
                                Move to Cart
                            </button>
                            <button class="btn-remove" onclick="removeFromWishlist(${item.id})">
                                <i class="fas fa-trash"></i>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Set first size as active for each product
        document.querySelectorAll('.size-options').forEach(container => {
            const firstSize = container.querySelector('.size-btn');
            if (firstSize) {
                firstSize.classList.add('active');
            }
        });

        // Add size button click handlers
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const parent = this.closest('.size-options');
                if (parent) {
                    parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }
}

// Global functions
window.removeFromWishlist = function(productId) {
    WishlistService.removeFromWishlist(productId);
    
    const item = document.querySelector(`.wishlist-item[data-product-id="${productId}"]`);
    if (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            item.remove();
            
            const remaining = document.querySelectorAll('.wishlist-item').length;
            if (remaining === 0) {
                document.getElementById('emptyWishlist').style.display = 'block';
            }
            
            const count = WishlistService.getWishlistCount();
            document.getElementById('wishlistCount').textContent = count;
        }, 300);
    }
};

window.moveToCart = function(productId) {
    const item = document.querySelector(`.wishlist-item[data-product-id="${productId}"]`);
    const sizeBtn = item ? item.querySelector('.size-btn.active') : null;
    const size = sizeBtn ? sizeBtn.dataset.size : 'M';
    
    WishlistService.moveToCart(productId, size);
    
    if (item) {
        const moveBtn = item.querySelector('.btn-move-cart');
        moveBtn.innerHTML = '<i class="fas fa-check"></i> Moved!';
        moveBtn.style.background = '#4CAF50';
        
        setTimeout(() => {
            window.removeFromWishlist(productId);
        }, 500);
    }
};