// Show all products with filtering
document.addEventListener('DOMContentLoaded', function() {
    let grid = document.getElementById('allProducts');
    let animeGrid = document.getElementById('animeTees');
    let hoodieGrid = document.getElementById('animeHoodies');
    
    let sortSelect = document.getElementById('sortBy');
    let filterSelect = document.getElementById('filterCat');
    
    let currentProducts = [...products];
    
    // Check for search term
    let searchTerm = sessionStorage.getItem('searchTerm');
    if(searchTerm) {
        currentProducts = searchProducts(currentProducts, searchTerm);
        sessionStorage.removeItem('searchTerm');
    }
    
    // Function to render products
    function renderProducts(productList, targetGrid) {
        if(!targetGrid) return;
        
        if(productList.length === 0) {
            targetGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No products found</p>';
            return;
        }
        
        targetGrid.innerHTML = productList.map(p => `
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
    
    // Render for different grids
    if(grid) {
        renderProducts(currentProducts, grid);
        
        if(sortSelect) {
            sortSelect.addEventListener('change', function() {
                let sorted = sortProducts(currentProducts, this.value);
                renderProducts(sorted, grid);
            });
        }
        
        if(filterSelect) {
            filterSelect.addEventListener('change', function() {
                let filtered = filterByCategory(currentProducts, this.value);
                renderProducts(filtered, grid);
            });
        }
    }
    
    if(animeGrid) {
        renderProducts(getTees(), animeGrid);
    }
    
    if(hoodieGrid) {
        renderProducts(getHoodies(), hoodieGrid);
    }
});