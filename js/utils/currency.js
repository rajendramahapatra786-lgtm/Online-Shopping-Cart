// Format price in Indian Rupees
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// Calculate discount percentage
function getDiscount(price, oldPrice) {
    if(!oldPrice) return 0;
    let discount = Math.round(((oldPrice - price) / oldPrice) * 100);
    return discount;
}