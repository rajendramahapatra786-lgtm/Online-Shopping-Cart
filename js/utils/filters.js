// Filter products by category
function filterByCategory(products, category) {
    if(!category || category === '') return products;
    return products.filter(p => p.category === category);
}

// Filter by search term
function searchProducts(products, term) {
    if(!term) return products;
    term = term.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        (p.character && p.character.toLowerCase().includes(term))
    );
}

// Sort products
function sortProducts(products, type) {
    let sorted = [...products];
    
    if(type === 'low') {
        sorted.sort((a, b) => a.price - b.price);
    } else if(type === 'high') {
        sorted.sort((a, b) => b.price - a.price);
    }
    
    return sorted;
}

// Get products by category
function getTees() {
    return products.filter(p => p.category === 'anime-tee');
}

function getHoodies() {
    return products.filter(p => p.category === 'hoodie');
}

// Get related products (same category, different id)
function getRelated(currentId, category, limit = 4) {
    let sameCat = products.filter(p => p.category === category && p.id !== currentId);
    return sameCat.slice(0, limit);
}