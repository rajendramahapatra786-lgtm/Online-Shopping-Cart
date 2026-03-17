// storage.js - localStorage helper functions
const StorageService = {
    // Save data to localStorage
    set: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to storage:', error);
            return false;
        }
    },

    // Get data from localStorage
    get: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error getting from storage:', error);
            return null;
        }
    },

    // Remove data from localStorage
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from storage:', error);
            return false;
        }
    },

    // Clear all localStorage
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    },

    // Check if user is logged in
    isLoggedIn: () => {
        const user = StorageService.get('currentUser');
        return user !== null;
    },

    // Get current user
    getCurrentUser: () => {
        return StorageService.get('currentUser');
    },

    // Save redirect URL for after login
    setRedirectUrl: (url) => {
        StorageService.set('redirectAfterLogin', url);
    },

    // Get and clear redirect URL
    getRedirectUrl: () => {
        const url = StorageService.get('redirectAfterLogin');
        StorageService.remove('redirectAfterLogin');
        return url;
    }
};

// Make globally available
window.StorageService = StorageService;