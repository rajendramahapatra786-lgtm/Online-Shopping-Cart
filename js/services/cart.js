// cart.js - Shopping cart functionality
const CartService = {
    CART_KEY: 'shopping_cart',

    // Get cart items
    getCart: () => {
        return StorageService.get(CartService.CART_KEY) || [];
    },

    // Add item to cart
    addToCart: (product, quantity = 1, size = 'M') => {
        const cart = CartService.getCart();
        const existingItemIndex = cart.findIndex(
            item => item.id === product.id && item.size === size
        );

        if (existingItemIndex !== -1) {
            // Update existing item
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: size,
                quantity: quantity,
                category: product.category
            });
        }

        StorageService.set(CartService.CART_KEY, cart);
        CartService.updateCartCount();
        
        // Show success message
        CartService.showNotification('Added to cart!');
        
        return { success: true, message: 'Added to cart' };
    },

    // Remove item from cart
    removeFromCart: (productId, size = 'M') => {
        let cart = CartService.getCart();
        cart = cart.filter(item => !(item.id === productId && item.size === size));
        StorageService.set(CartService.CART_KEY, cart);
        CartService.updateCartCount();
        CartService.showNotification('Removed from cart');
        return { success: true, message: 'Removed from cart' };
    },

    // Update quantity
    updateQuantity: (productId, quantity, size = 'M') => {
        const cart = CartService.getCart();
        const item = cart.find(item => item.id === productId && item.size === size);
        
        if (item) {
            if (quantity <= 0) {
                return CartService.removeFromCart(productId, size);
            }
            item.quantity = quantity;
            StorageService.set(CartService.CART_KEY, cart);
            CartService.updateCartCount();
        }
        
        return { success: true, message: 'Cart updated' };
    },

    // Get cart total
    getCartTotal: () => {
        const cart = CartService.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Get total items in cart
    getCartCount: () => {
        const cart = CartService.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    },

    // Update cart count display
    updateCartCount: () => {
        const count = CartService.getCartCount();
        const cartBadges = document.querySelectorAll('#cartCount');
        cartBadges.forEach(badge => {
            if (badge) {
                badge.textContent = count;
                badge.style.display = count > 0 ? 'inline' : 'none';
            }
        });
    },

    // Clear cart
    clearCart: () => {
        StorageService.remove(CartService.CART_KEY);
        CartService.updateCartCount();
        return { success: true, message: 'Cart cleared' };
    },

    // Check auth before checkout
    checkAuthBeforeCheckout: () => {
        if (!StorageService.isLoggedIn()) {
            // Save current page to redirect back
            StorageService.setRedirectUrl('cart.html');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Proceed to checkout
    proceedToCheckout: () => {
        if (CartService.checkAuthBeforeCheckout()) {
            window.location.href = 'checkout.html';
        }
    },

    // Show notification
    showNotification: (message) => {
        // Check if notification container exists
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
};

// Make globally available
window.CartService = CartService;