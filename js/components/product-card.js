// Product Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Quick view on hover
    let cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        let addBtn = card.querySelector('.add-to-cart');
        let wishBtn = card.querySelector('.add-to-wishlist');
        
        if(addBtn) {
            addBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                // Get product id from the card
                let link = card.querySelector('.card-link');
                if(link) {
                    let href = link.getAttribute('href');
                    let id = href.split('=')[1];
                    if(id) {
                        addToCart(parseInt(id));
                    }
                }
            });
        }
        
        if(wishBtn) {
            wishBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                let link = card.querySelector('.card-link');
                if(link) {
                    let href = link.getAttribute('href');
                    let id = href.split('=')[1];
                    if(id) {
                        addToWishlist(parseInt(id));
                    }
                }
            });
        }
    });
});