// auth.js - Login/Signup functionality
const AuthService = {
    USERS_KEY: 'registered_users',
    CURRENT_USER_KEY: 'currentUser',

    // Initialize users array
    init: () => {
        if (!StorageService.get(AuthService.USERS_KEY)) {
            // Add some demo users
            const demoUsers = [
                {
                    id: 1,
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'password123',
                    createdAt: new Date().toISOString()
                }
            ];
            StorageService.set(AuthService.USERS_KEY, demoUsers);
        }
    },

    // Register new user
    register: (name, email, password) => {
        const users = StorageService.get(AuthService.USERS_KEY) || [];

        // Check if email already exists
        if (users.find(u => u.email === email)) {
            return {
                success: false,
                message: 'Email already registered. Please login.'
            };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                success: false,
                message: 'Please enter a valid email address'
            };
        }

        // Validate password length
        if (password.length < 6) {
            return {
                success: false,
                message: 'Password must be at least 6 characters'
            };
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password, // In real app, hash this!
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        StorageService.set(AuthService.USERS_KEY, users);

        // Auto login after registration
        const { password: pwd, ...userWithoutPassword } = newUser;
        StorageService.set(AuthService.CURRENT_USER_KEY, userWithoutPassword);

        return {
            success: true,
            message: 'Registration successful!',
            user: userWithoutPassword
        };
    },

    // Login user
    login: (email, password) => {
        const users = StorageService.get(AuthService.USERS_KEY) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Remove password before storing
            const { password: pwd, ...userWithoutPassword } = user;
            StorageService.set(AuthService.CURRENT_USER_KEY, userWithoutPassword);

            // Handle redirect
            const redirectUrl = StorageService.getRedirectUrl() || 'index.html';

            return {
                success: true,
                message: 'Login successful!',
                user: userWithoutPassword,
                redirect: redirectUrl
            };
        }

        return {
            success: false,
            message: 'Invalid email or password'
        };
    },

    // Logout user
    logout: () => {
        StorageService.remove(AuthService.CURRENT_USER_KEY);
        return { success: true, message: 'Logged out successfully' };
    },

    // Get current user
    getCurrentUser: () => {
        return StorageService.get(AuthService.CURRENT_USER_KEY);
    },

    // Add this function
    getUserByEmail: function (email) {
        const users = StorageService.get(this.USERS_KEY) || [];
        return users.find(user => user.email === email);
    },

    // Check if logged in
    isLoggedIn: () => {
        return StorageService.get(AuthService.CURRENT_USER_KEY) !== null;
    },

    // Update user profile
    updateProfile: (userData) => {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) return { success: false, message: 'Not logged in' };

        const users = StorageService.get(AuthService.USERS_KEY) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);

        if (userIndex !== -1) {
            // Update user in users array
            users[userIndex] = { ...users[userIndex], ...userData };
            StorageService.set(AuthService.USERS_KEY, users);

            // Update current user
            const { password, ...updatedUser } = users[userIndex];
            StorageService.set(AuthService.CURRENT_USER_KEY, updatedUser);

            return { success: true, message: 'Profile updated' };
        }

        return { success: false, message: 'User not found' };
    }
};

// Initialize auth service
AuthService.init();

// Make globally available
window.AuthService = AuthService;