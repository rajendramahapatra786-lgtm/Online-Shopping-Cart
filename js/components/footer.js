// Footer dynamic content
document.addEventListener('DOMContentLoaded', function() {
    // Update year in footer
    let yearElements = document.querySelectorAll('.current-year');
    let currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // Newsletter signup (demo)
    let newsletterForm = document.querySelector('.newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let email = this.querySelector('input[type="email"]').value;
            if(email) {
                alert(`Thanks for subscribing! (Demo - ${email})`);
                this.reset();
            }
        });
    }
});