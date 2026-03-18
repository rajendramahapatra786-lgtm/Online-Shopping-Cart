// fashion.js - Fashion page functionality
document.addEventListener('DOMContentLoaded', function () {

    // Get fashion products only
    const fashionProducts = window.products.filter(p => p.category === 'fashion');

    // State
    let currentType = 'all'; // 'all', 'tshirt', 'hoodie'
    let currentSort = 'default';

    // DOM elements
    const productsGrid = document.getElementById('fashionProductsGrid');
    const productsCount = document.getElementById('productsCount');
    const sortSelect = document.getElementById('sortBy');
    const typeButtons = document.querySelectorAll('.category-btn');
    const resetBtn = document.getElementById('resetFilters');

    // Render products
    function renderProducts() {
        // Filter by type
        let filtered = [...fashionProducts];
        if (currentType !== 'all') {
            filtered = filtered.filter(p => p.subCategory === currentType);
        }

        // Sort
        if (currentSort !== 'default') {
            filtered = FilterUtils.sortProducts(filtered, currentSort);
        }

        // Update count
        if (productsCount) {
            productsCount.textContent = `Showing ${filtered.length} products`;
        }

        // Render grid
        if (productsGrid) {
            if (filtered.length === 0) {
                productsGrid.innerHTML = '<div class="no-products">No products found</div>';
                return;
            }

            productsGrid.innerHTML = filtered.map(product => {
                const isInWishlist = WishlistService.isInWishlist(product.id);

                return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                        onclick="toggleWishlist(${product.id})"
                        data-product-id="${product.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.type || 'Fashion'}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${Helpers.getStarRating(product.rating)}</span>
                    <span class="reviews">(${product.reviews})</span>
                </div>
                <div class="product-price">${Helpers.formatPrice(product.price)}</div>
                <div class="size-selector">
                    <span class="size-label">Size:</span>
                    <div class="size-options">
                        ${product.sizes.map(size =>
                    `<button class="size-btn" data-size="${size}">${size}</button>`
                ).join('')}
                    </div>
                </div>
                <button class="add-to-cart" onclick="CartService.addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')}, 1, document.querySelector('.size-btn.active')?.dataset.size || 'M')">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
            }).join('');

            // Add size button active state
            document.querySelectorAll('.size-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const parent = this.closest('.size-options');
                    parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
    }

    // Event Listeners
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }

    if (typeButtons) {
        typeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active class
                typeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update current type
                currentType = btn.dataset.type;
                renderProducts();
            });
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset type
            currentType = 'all';
            typeButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-type="all"]')?.classList.add('active');

            // Reset sort
            currentSort = 'default';
            if (sortSelect) sortSelect.value = 'default';

            renderProducts();
        });
    }

    // Initial render
    renderProducts();
});

// Add this function to your fashion.js or wherever you render products
function createProductCard(product) {
    const isInWishlist = WishlistService.isInWishlist(product.id);

    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                        onclick="toggleWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price.toLocaleString()}</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    `;
}

// Global toggle function
window.toggleWishlist = function (productId) {
    const product = window.products.find(p => p.id === productId);
    if (!product) return;

    if (WishlistService.isInWishlist(productId)) {
        WishlistService.removeFromWishlist(productId);
    } else {
        WishlistService.addToWishlist(product);
    }

    // Update button state
    const btn = event.currentTarget;
    btn.classList.toggle('active');
};