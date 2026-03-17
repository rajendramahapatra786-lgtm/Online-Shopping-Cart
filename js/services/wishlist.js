// wishlist.js - Wishlist functionality
const WishlistService = {
    WISHLIST_KEY: 'user_wishlist',

    // Get wishlist items
    getWishlist: () => {
        return StorageService.get(WishlistService.WISHLIST_KEY) || [];
    },

    // Add to wishlist
    addToWishlist: (product) => {
        const wishlist = WishlistService.getWishlist();
        
        if (!wishlist.find(item => item.id === product.id)) {
            wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category
            });
            
            StorageService.set(WishlistService.WISHLIST_KEY, wishlist);
            WishlistService.updateWishlistCount();
            CartService.showNotification('Added to wishlist!');
            
            return { success: true, message: 'Added to wishlist' };
        }
        
        CartService.showNotification('Already in wishlist');
        return { success: false, message: 'Already in wishlist' };
    },

    // Remove from wishlist
    removeFromWishlist: (productId) => {
        let wishlist = WishlistService.getWishlist();
        wishlist = wishlist.filter(item => item.id !== productId);
        StorageService.set(WishlistService.WISHLIST_KEY, wishlist);
        WishlistService.updateWishlistCount();
        CartService.showNotification('Removed from wishlist');
        return { success: true, message: 'Removed from wishlist' };
    },

    // Check if in wishlist
    isInWishlist: (productId) => {
        const wishlist = WishlistService.getWishlist();
        return wishlist.some(item => item.id === productId);
    },

    // Get wishlist count
    getWishlistCount: () => {
        const wishlist = WishlistService.getWishlist();
        return wishlist.length;
    },

    // Update wishlist count display
    updateWishlistCount: () => {
        const count = WishlistService.getWishlistCount();
        const wishlistBadges = document.querySelectorAll('#wishlistCount');
        wishlistBadges.forEach(badge => {
            if (badge) {
                badge.textContent = count;
                badge.style.display = count > 0 ? 'inline' : 'none';
            }
        });
    },

    // Move to cart
    moveToCart: (productId, size = 'M') => {
        const wishlist = WishlistService.getWishlist();
        const product = wishlist.find(item => item.id === productId);
        
        if (product) {
            // Find full product details from products array
            const fullProduct = window.products.find(p => p.id === productId);
            if (fullProduct) {
                CartService.addToCart(fullProduct, 1, size);
                WishlistService.removeFromWishlist(productId);
                return { success: true, message: 'Moved to cart' };
            }
        }
        
        return { success: false, message: 'Product not found' };
    }
};

// Make globally available
window.WishlistService = WishlistService;