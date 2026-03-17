// helpers.js - Utility helper functions
const Helpers = {
    // Format price to Indian Rupees
    formatPrice: (price) => {
        return '₹' + price.toLocaleString('en-IN');
    },

    // Generate star rating HTML
    getStarRating: (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let starsHtml = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        
        // Half star
        if (halfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        return starsHtml;
    },

    // Debounce function for search
    debounce: (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    // Get query parameter from URL
    getQueryParam: (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    // Set query parameter in URL
    setQueryParam: (param, value) => {
        const url = new URL(window.location.href);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    },

    // Remove query parameter from URL
    removeQueryParam: (param) => {
        const url = new URL(window.location.href);
        url.searchParams.delete(param);
        window.history.pushState({}, '', url);
    },

    // Create element with classes
    createElement: (tag, classes = [], text = '') => {
        const element = document.createElement(tag);
        if (classes.length) {
            element.classList.add(...classes);
        }
        if (text) {
            element.textContent = text;
        }
        return element;
    },

    // Show loading spinner
    showLoading: (container) => {
        const spinner = Helpers.createElement('div', ['loading-spinner']);
        spinner.innerHTML = '<div class="spinner"></div>';
        container.innerHTML = '';
        container.appendChild(spinner);
    },

    // Hide loading spinner
    hideLoading: (container) => {
        const spinner = container.querySelector('.loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    },

    // Truncate text
    truncateText: (text, length) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    }
};

// Make globally available
window.Helpers = Helpers;