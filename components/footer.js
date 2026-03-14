// Footer Component - Using fetch to load HTML
class FooterComponent {
    constructor() {
        this.loadFooter();
    }

    loadFooter() {
        fetch('components/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Footer file not found');
                }
                return response.text();
            })
            .then(html => {
                // Insert footer at the end of body
                document.body.insertAdjacentHTML('beforeend', html);
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Fallback if file not found
                this.createFallbackFooter();
            });
    }

    createFallbackFooter() {
        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>🛍️ ShopCart</h3>
                        <p>Your favorite online shopping destination</p>
                    </div>
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="products.html">Products</a></li>
                            <li><a href="cart.html">Cart</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <p>📧 support@shopcart.com</p>
                        <p>📞 (555) 123-4567</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 ShopCart. All rights reserved.</p>
                </div>
            </div>
        `;
        document.body.appendChild(footer);
    }
}

// Initialize footer when page loads
document.addEventListener('DOMContentLoaded', () => {
    new FooterComponent();
});