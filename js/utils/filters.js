// filters.js - Sort and filter utilities
const FilterUtils = {
    // Sort products
    sortProducts: (products, sortBy) => {
        const sorted = [...products];
        
        switch(sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'popular':
                return sorted.sort((a, b) => b.reviews - a.reviews);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return sorted.sort((a, b) => b.id - a.id);
            default:
                return sorted;
        }
    },

    // Filter by category
    filterByCategory: (products, category) => {
        if (!category || category === 'all') return products;
        return products.filter(p => p.category === category);
    },

    // Filter fashion by type (tshirt/hoodie)
    filterFashionByType: (products, type) => {
        if (!type || type === 'all') return products;
        return products.filter(p => p.subCategory === type);
    },

    // Search products
    searchProducts: (products, query) => {
        if (!query) return products;
        const searchTerm = query.toLowerCase().trim();
        return products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm) ||
            (p.type && p.type.toLowerCase().includes(searchTerm)) ||
            (p.description && p.description.toLowerCase().includes(searchTerm))
        );
    },

    // Filter by price range
    filterByPriceRange: (products, min, max) => {
        return products.filter(p => p.price >= min && p.price <= max);
    },

    // Filter by rating
    filterByRating: (products, minRating) => {
        return products.filter(p => p.rating >= minRating);
    },

    // Get unique categories
    getCategories: (products) => {
        return ['all', ...new Set(products.map(p => p.category))];
    },

    // Get price range
    getPriceRange: (products) => {
        const prices = products.map(p => p.price);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    },

    // Apply multiple filters
    applyFilters: (products, filters) => {
        let filtered = [...products];
        
        // Apply search
        if (filters.search) {
            filtered = FilterUtils.searchProducts(filtered, filters.search);
        }
        
        // Apply category
        if (filters.category && filters.category !== 'all') {
            filtered = FilterUtils.filterByCategory(filtered, filters.category);
        }
        
        // Apply fashion type
        if (filters.fashionType && filters.fashionType !== 'all') {
            filtered = FilterUtils.filterFashionByType(filtered, filters.fashionType);
        }
        
        // Apply price range
        if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
            filtered = FilterUtils.filterByPriceRange(filtered, filters.minPrice, filters.maxPrice);
        }
        
        // Apply rating
        if (filters.minRating) {
            filtered = FilterUtils.filterByRating(filtered, filters.minRating);
        }
        
        // Apply sorting
        if (filters.sortBy) {
            filtered = FilterUtils.sortProducts(filtered, filters.sortBy);
        }
        
        return filtered;
    }
};

// Make globally available
window.FilterUtils = FilterUtils;