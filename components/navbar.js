// Navbar Component - Using fetch to load HTML
class NavbarComponent {
    constructor() {
        this.loadNavbar();
    }

    loadNavbar() {
        fetch('components/navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Navbar file not found');
                }
                return response.text();
            })
            .then(html => {
                // Insert navbar at the beginning of body
                document.body.insertAdjacentHTML('afterbegin', html);
                this.setActivePage();
                if (typeof updateCartCount === 'function') {
                    updateCartCount();
                }
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
                // Fallback if file not found
                this.createFallbackNavbar();
            });
    }

    setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const activeId = {
            'index.html': 'nav-home',
            'products.html': 'nav-products',
            'cart.html': 'nav-cart'
        }[currentPage];

        if (activeId) {
            const activeLink = document.getElementById(activeId);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    createFallbackNavbar() {
        const navbar = document.createElement('nav');
        navbar.className = 'navbar';
        navbar.innerHTML = `
            <div class="nav-container">
                <a href="index.html" class="logo">🛍️ ShopCart</a>
                <ul class="nav-links">
                    <li><a href="index.html" class="nav-link" id="nav-home">Home</a></li>
                    <li><a href="products.html" class="nav-link" id="nav-products">Products</a></li>
                    <li><a href="cart.html" class="nav-link" id="nav-cart">Cart <span id="cart-count" class="cart-badge">0</span></a></li>
                </ul>
            </div>
        `;
        document.body.insertAdjacentElement('afterbegin', navbar);
        this.setActivePage();
    }
}

// Initialize navbar when page loads
document.addEventListener('DOMContentLoaded', () => {
    new NavbarComponent();
});