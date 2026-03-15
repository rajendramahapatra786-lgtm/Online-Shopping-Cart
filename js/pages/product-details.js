// Show single product details
document.addEventListener('DOMContentLoaded', function() {
    let detailDiv = document.getElementById('productDetail');
    let relatedDiv = document.getElementById('relatedProducts');
    
    // Get product id from URL
    let urlParams = new URLSearchParams(window.location.search);
    let productId = parseInt(urlParams.get('id')) || 1;
    
    let product = products.find(p => p.id === productId);
    
    if(detailDiv && product) {
        detailDiv.innerHTML = `
            <div class="detail-image">
                <img src="assets/images/products/${product.img}" alt="${product.name}">
            </div>
            <div class="detail-info">
                <h1>${product.name}</h1>
                <p class="detail-price">
                    <span class="price">${formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                    ${product.oldPrice ? `<span class="discount">${getDiscount(product.price, product.oldPrice)}% off</span>` : ''}
                </p>
                <div class="size-select">
                    <p>Size:</p>
                    ${product.sizes.map(s => `<button class="size-btn" onclick="selectSize('${s}')">${s}</button>`).join('')}
                </div>
                <button class="btn add-btn" onclick="addToCart(${product.id}, selectedSize || 'M')">Add to Cart</button>
                <button class="btn wish-btn" onclick="addToWishlist(${product.id})">❤️ Add to Wishlist</button>
                <div class="product-desc">
                    <h3>Description</h3>
                    <p>Premium quality anime t-shirt. 100% cotton. Made in India.</p>
                </div>
            </div>
        `;
    }
    
    // Show related products
    if(relatedDiv && product) {
        let related = getRelated(product.id, product.category);
        relatedDiv.innerHTML = related.map(p => `
            <div class="product-card">
                <img src="assets/images/products/${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <span class="price">${formatPrice(p.price)}</span>
                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `).join('');
    }
});

// Global variables for size selection
let selectedSize = 'M';

function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.style.background = btn.textContent === size ? '#ff6b4a' : '#f0f0f0';
        btn.style.color = btn.textContent === size ? 'white' : '#333';
    });
}