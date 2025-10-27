// ===================================
// Home Page JavaScript
// Featured products and homepage interactions
// ===================================

// Mock product data
const featuredProducts = [
    {
        id: 1,
        name: 'Organic Tomatoes',
        price: 350,
        originalPrice: 450,
        image: 'https://images.unsplash.com/photo-1546470427-227cec9c34c7?w=400',
        category: 'vegetables',
        farmer: 'Kamal Silva',
        rating: 4.8,
        reviews: 124,
        unit: 'kg',
        badge: 'Bestseller',
        inStock: true
    },
    {
        id: 2,
        name: 'Fresh King Coconuts',
        price: 150,
        image: 'https://images.unsplash.com/photo-1623690266473-87009c96d33f?w=400',
        category: 'fruits',
        farmer: 'Nimal Perera',
        rating: 4.9,
        reviews: 89,
        unit: 'piece',
        badge: 'New',
        inStock: true
    },
    {
        id: 3,
        name: 'Organic Carrots',
        price: 280,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
        category: 'vegetables',
        farmer: 'Saman Bandara',
        rating: 4.7,
        reviews: 67,
        unit: 'kg',
        inStock: true
    },
    {
        id: 4,
        name: 'Fresh Green Beans',
        price: 320,
        originalPrice: 380,
        image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400',
        category: 'vegetables',
        farmer: 'Ruwan Fernando',
        rating: 4.6,
        reviews: 53,
        unit: 'kg',
        badge: 'Sale',
        inStock: true
    },
    {
        id: 5,
        name: 'Organic Spinach',
        price: 180,
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
        category: 'vegetables',
        farmer: 'Priyantha Kumar',
        rating: 4.8,
        reviews: 91,
        unit: 'bunch',
        inStock: true
    },
    {
        id: 6,
        name: 'Fresh Pumpkin',
        price: 200,
        image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400',
        category: 'vegetables',
        farmer: 'Chaminda Dias',
        rating: 4.5,
        reviews: 42,
        unit: 'kg',
        inStock: true
    },
    {
        id: 7,
        name: 'Organic Bananas',
        price: 250,
        image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400',
        category: 'fruits',
        farmer: 'Ajith Rajapaksa',
        rating: 4.9,
        reviews: 156,
        unit: 'kg',
        badge: 'Organic',
        inStock: true
    },
    {
        id: 8,
        name: 'Red Onions',
        price: 300,
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400',
        category: 'vegetables',
        farmer: 'Lakshman Gunasekara',
        rating: 4.7,
        reviews: 78,
        unit: 'kg',
        inStock: true
    }
];

// Save products to localStorage for use across pages
localStorage.setItem('farmDirectProducts', JSON.stringify(featuredProducts));

// Load featured products on page load
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
});

// Load and display featured products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    container.innerHTML = '';

    featuredProducts.slice(0, 8).forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-2xl overflow-hidden border border-gray-100';

    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    card.innerHTML = `
        <div class="product-image relative aspect-square overflow-hidden bg-gray-100">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">

            ${product.badge ? `
                <span class="product-badge px-3 py-1 rounded-full text-xs font-semibold
                    ${product.badge === 'Bestseller' ? 'bg-amber-500 text-white' : ''}
                    ${product.badge === 'New' ? 'bg-blue-500 text-white' : ''}
                    ${product.badge === 'Sale' ? 'bg-red-500 text-white' : ''}
                    ${product.badge === 'Organic' ? 'bg-green-500 text-white' : ''}
                ">
                    ${product.badge}
                </span>
            ` : ''}

            ${discount > 0 ? `
                <span class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                    -${discount}%
                </span>
            ` : ''}

            <button onclick="toggleWishlist(${product.id})" class="absolute top-3 left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors ${discount > 0 ? 'top-14' : ''}">
                <svg class="w-5 h-5 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
            </button>

            <div class="product-overlay">
                <button onclick="quickAddToCart(${product.id})" class="w-full py-3 bg-white text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>

        <div class="p-4">
            <div class="text-xs text-gray-500 mb-1 uppercase">${product.category}</div>
            <h3 class="font-semibold text-gray-900 mb-2 hover:text-primary transition-colors cursor-pointer" onclick="window.location.href='pages/product-detail.html?id=${product.id}'">
                ${product.name}
            </h3>

            <div class="flex items-center space-x-1 mb-3">
                ${createStarRating(product.rating)}
                <span class="text-xs text-gray-500 ml-2">(${product.reviews})</span>
            </div>

            <div class="flex items-center justify-between mb-3">
                <div>
                    <div class="text-xl font-bold text-primary">${formatCurrency(product.price)}</div>
                    ${product.originalPrice ? `
                        <div class="text-sm text-gray-400 line-through">${formatCurrency(product.originalPrice)}</div>
                    ` : ''}
                </div>
                <div class="text-sm text-gray-500">per ${product.unit}</div>
            </div>

            <div class="flex items-center text-sm text-gray-600 mb-3">
                <svg class="w-4 h-4 mr-1 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                ${product.farmer}
            </div>

            <button onclick="addProductToCart(${product.id})" class="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Add to Cart
            </button>
        </div>
    `;

    return card;
}

// Create star rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    if (hasHalfStar) {
        starsHTML += '<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><defs><linearGradient id="half"><stop offset="50%" stop-color="#fbbf24"/><stop offset="50%" stop-color="#e5e7eb"/></linearGradient></defs><path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<svg class="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }

    return starsHTML;
}

// Add product to cart
function addProductToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (!product) return;

    addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        farmer: product.farmer,
        unit: product.unit,
        quantity: 1
    });
}

// Quick add to cart
function quickAddToCart(productId) {
    addProductToCart(productId);
}

// Toggle wishlist
function toggleWishlist(productId) {
    if (isInWishlist(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(productId);
    }

    loadFeaturedProducts();
}