// ===================================
// FarmDirect - Main JavaScript
// Core functionality and utilities
// ===================================

// Initialize app on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateCartCount();
});

// App initialization
function initializeApp() {
    setupHeaderScroll();
    checkAuthentication();
    loadUserData();
}

// ===================================
// Navigation and UI Functions
// ===================================

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
        document.body.classList.toggle('mobile-menu-open');
    }
}

// Toggle user menu
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('hidden');
    }
}

// Toggle search bar
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.classList.toggle('hidden');
        if (!searchBar.classList.contains('hidden')) {
            searchBar.querySelector('input').focus();
        }
    }
}

// Header scroll effect
function setupHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('userMenu');
    const userButton = event.target.closest('button[onclick="toggleUserMenu()"]');

    if (userMenu && !userMenu.contains(event.target) && !userButton) {
        userMenu.classList.add('hidden');
    }
});

// ===================================
// Local Storage Management
// ===================================

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('farmDirectCart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('farmDirectCart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            farmer: product.farmer,
            quantity: product.quantity || 1
        });
    }

    saveCart(cart);
    showToast('Product added to cart!', 'success');
    return cart;
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showToast('Product removed from cart', 'info');
    return cart;
}

// Update cart item quantity
function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart(cart);
        }
    }

    return cart;
}

// Clear cart
function clearCart() {
    localStorage.removeItem('farmDirectCart');
    updateCartCount();
    showToast('Cart cleared', 'info');
}

// Update cart count in header
function updateCartCount() {
    const cart = getCart();
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        if (totalItems > 0) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}

// Get cart total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// ===================================
// User Authentication & Profile
// ===================================

// Get current user from localStorage
function getCurrentUser() {
    const user = localStorage.getItem('farmDirectUser');
    return user ? JSON.parse(user) : null;
}

// Save user to localStorage
function saveUser(user) {
    localStorage.setItem('farmDirectUser', JSON.stringify(user));
}

// Login user
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('farmDirectUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role || 'customer',
            avatar: user.avatar || null,
            addresses: user.addresses || []
        };
        saveUser(userData);
        showToast('Login successful!', 'success');
        return userData;
    }

    showToast('Invalid email or password', 'error');
    return null;
}

// Register user
function registerUser(userData) {
    const users = JSON.parse(localStorage.getItem('farmDirectUsers') || '[]');

    if (users.find(u => u.email === userData.email)) {
        showToast('Email already registered', 'error');
        return false;
    }

    const newUser = {
        id: Date.now().toString(),
        ...userData,
        role: userData.role || 'customer',
        createdAt: new Date().toISOString(),
        addresses: []
    };

    users.push(newUser);
    localStorage.setItem('farmDirectUsers', JSON.stringify(users));

    const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        avatar: null,
        addresses: []
    };
    saveUser(userSession);

    showToast('Registration successful!', 'success');
    return newUser;
}

// Logout user
function logoutUser() {
    localStorage.removeItem('farmDirectUser');
    showToast('Logged out successfully', 'info');
    window.location.href = 'index.html';
}

// Check if user is authenticated
function checkAuthentication() {
    const user = getCurrentUser();
    const authLinks = document.querySelectorAll('[data-auth-required]');

    if (user) {
        authLinks.forEach(link => {
            link.style.display = 'block';
        });
    }
}

// Load user data into page
function loadUserData() {
    const user = getCurrentUser();
    const userNameElements = document.querySelectorAll('[data-user-name]');
    const userEmailElements = document.querySelectorAll('[data-user-email]');

    if (user) {
        userNameElements.forEach(el => el.textContent = user.name);
        userEmailElements.forEach(el => el.textContent = user.email);
    }
}

// ===================================
// Orders Management
// ===================================

// Get user orders
function getUserOrders() {
    const user = getCurrentUser();
    if (!user) return [];

    const allOrders = JSON.parse(localStorage.getItem('farmDirectOrders') || '[]');
    return allOrders.filter(order => order.userId === user.id);
}

// Create new order
function createOrder(orderData) {
    const user = getCurrentUser();
    if (!user) {
        showToast('Please login to place an order', 'error');
        return null;
    }

    const orders = JSON.parse(localStorage.getItem('farmDirectOrders') || '[]');
    const newOrder = {
        id: 'ORD' + Date.now(),
        userId: user.id,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    orders.push(newOrder);
    localStorage.setItem('farmDirectOrders', JSON.stringify(orders));
    clearCart();

    showToast('Order placed successfully!', 'success');
    return newOrder;
}

// ===================================
// Wishlist Management
// ===================================

// Get wishlist
function getWishlist() {
    const user = getCurrentUser();
    if (!user) return [];

    const wishlist = localStorage.getItem(`farmDirectWishlist_${user.id}`);
    return wishlist ? JSON.parse(wishlist) : [];
}

// Add to wishlist
function addToWishlist(productId) {
    const user = getCurrentUser();
    if (!user) {
        showToast('Please login to add to wishlist', 'error');
        return false;
    }

    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem(`farmDirectWishlist_${user.id}`, JSON.stringify(wishlist));
        showToast('Added to wishlist', 'success');
        return true;
    }

    showToast('Already in wishlist', 'info');
    return false;
}

// Remove from wishlist
function removeFromWishlist(productId) {
    const user = getCurrentUser();
    if (!user) return false;

    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem(`farmDirectWishlist_${user.id}`, JSON.stringify(wishlist));
    showToast('Removed from wishlist', 'info');
    return true;
}

// Check if product is in wishlist
function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
}

// ===================================
// UI Components
// ===================================

// Show toast notification
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>' : ''}
                ${type === 'error' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>' : ''}
                ${type === 'info' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>' : ''}
            </svg>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Show loading spinner
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loadingOverlay';
    loading.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
}

// Hide loading spinner
function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.remove();
    }
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// ===================================
// Utility Functions
// ===================================

// Format currency
function formatCurrency(amount) {
    return 'Rs. ' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format date and time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', dateOptions) + ' at ' + date.toLocaleTimeString('en-US', timeOptions);
}

// Get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// ===================================
// Smooth scroll to element
// ===================================
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===================================
// Export functions for use in other scripts
// ===================================
window.FarmDirect = {
    // Navigation
    toggleMobileMenu,
    toggleUserMenu,
    toggleSearch,

    // Cart
    getCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    updateCartCount,

    // User
    getCurrentUser,
    loginUser,
    registerUser,
    logoutUser,

    // Orders
    getUserOrders,
    createOrder,

    // Wishlist
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,

    // UI
    showToast,
    showLoading,
    hideLoading,
    openModal,
    closeModal,

    // Utilities
    formatCurrency,
    formatDate,
    formatDateTime,
    validateEmail,
    validatePhone,
    getUrlParameter,
    scrollToElement
};