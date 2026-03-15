// Show featured products on homepage
document.addEventListener('DOMContentLoaded', function() {
    let featured = document.getElementById('featuredProducts');
    
    if(featured) {
        // Get first 4 products as featured
        let featuredItems = products.slice(0, 4);
        
        featured.innerHTML = featuredItems.map(p => `
            <div class="product-card">
                <img src="assets/images/products/${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <div>
                    <span class="price">${formatPrice(p.price)}</span>
                    ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ''}
                </div>
                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `).join('');
    }
    
    // Handle search param from navbar
    let urlParams = new URLSearchParams(window.location.search);
    let searchTerm = urlParams.get('search');
    if(searchTerm) {
        sessionStorage.setItem('searchTerm', searchTerm);
        window.location.href = 'shop.html';
    }
});