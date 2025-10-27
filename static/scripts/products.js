let allProducts = [];
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
});

function loadProducts() {
    const stored = localStorage.getItem('farmDirectProducts');
    allProducts = stored ? JSON.parse(stored) : generateMockProducts();
    filteredProducts = [...allProducts];
    displayProducts();
}

function generateMockProducts() {
    return [
        {id: 1, name: 'Organic Tomatoes', price: 350, image: 'https://images.unsplash.com/photo-1546470427-227cec9c34c7?w=400', category: 'vegetables', farmer: 'Kamal Silva', rating: 4.8, reviews: 124, unit: 'kg', inStock: true},
        {id: 2, name: 'Fresh King Coconuts', price: 150, image: 'https://images.unsplash.com/photo-1623690266473-87009c96d33f?w=400', category: 'fruits', farmer: 'Nimal Perera', rating: 4.9, reviews: 89, unit: 'piece', inStock: true},
        {id: 3, name: 'Organic Carrots', price: 280, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400', category: 'vegetables', farmer: 'Saman Bandara', rating: 4.7, reviews: 67, unit: 'kg', inStock: true},
        {id: 4, name: 'Fresh Green Beans', price: 320, image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400', category: 'vegetables', farmer: 'Ruwan Fernando', rating: 4.6, reviews: 53, unit: 'kg', inStock: true},
        {id: 5, name: 'Organic Spinach', price: 180, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', category: 'vegetables', farmer: 'Priyantha Kumar', rating: 4.8, reviews: 91, unit: 'bunch', inStock: true},
        {id: 6, name: 'Fresh Pumpkin', price: 200, image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400', category: 'vegetables', farmer: 'Chaminda Dias', rating: 4.5, reviews: 42, unit: 'kg', inStock: true},
        {id: 7, name: 'Organic Bananas', price: 250, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400', category: 'fruits', farmer: 'Ajith Rajapaksa', rating: 4.9, reviews: 156, unit: 'kg', inStock: true},
        {id: 8, name: 'Red Onions', price: 300, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400', category: 'vegetables', farmer: 'Lakshman Gunasekara', rating: 4.7, reviews: 78, unit: 'kg', inStock: true},
        {id: 9, name: 'Fresh Cabbage', price: 180, image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400', category: 'vegetables', farmer: 'Anura Silva', rating: 4.6, reviews: 45, unit: 'piece', inStock: true},
        {id: 10, name: 'Organic Potatoes', price: 220, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400', category: 'vegetables', farmer: 'Sunil Wijesinghe', rating: 4.7, reviews: 92, unit: 'kg', inStock: true},
        {id: 11, name: 'Fresh Papaya', price: 280, image: 'https://images.unsplash.com/photo-1603833797131-3c0a798b0e32?w=400', category: 'fruits', farmer: 'Mahinda Perera', rating: 4.8, reviews: 67, unit: 'kg', inStock: true},
        {id: 12, name: 'Green Chili', price: 400, image: 'https://images.unsplash.com/photo-1583454156929-670a85a28dbe?w=400', category: 'vegetables', farmer: 'Ravi Kumar', rating: 4.5, reviews: 38, unit: 'kg', inStock: true}
    ];
}

function setupEventListeners() {
    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });

    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.getElementById('maxPrice').textContent = 'Rs. ' + this.value;
            applyFilters();
        });
    }

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

function applyFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
    const maxPrice = parseInt(document.getElementById('priceRange').value);
    const selectedRating = document.querySelector('input[name="rating"]:checked').value;

    filteredProducts = allProducts.filter(product => {
        const categoryMatch = selectedCategories.includes('all') || selectedCategories.includes(product.category);
        const priceMatch = product.price <= maxPrice;
        const ratingMatch = selectedRating === 'all' || product.rating >= parseFloat(selectedRating);

        return categoryMatch && priceMatch && ratingMatch;
    });

    displayProducts();
}

function sortProducts(sortBy) {
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts = [...allProducts];
    }
    displayProducts();
}

function displayProducts() {
    const grid = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');
    const productCount = document.getElementById('productCount');

    if (filteredProducts.length === 0) {
        grid.classList.add('hidden');
        noProducts.classList.remove('hidden');
        productCount.textContent = '0';
        return;
    }

    grid.classList.remove('hidden');
    noProducts.classList.add('hidden');
    productCount.textContent = filteredProducts.length;

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card bg-white rounded-xl overflow-hidden border border-gray-100">
            <div class="product-image relative aspect-square overflow-hidden bg-gray-100 cursor-pointer" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
                <h3 class="font-semibold mb-2 hover:text-primary cursor-pointer" onclick="window.location.href='product-detail.html?id=${product.id}'">${product.name}</h3>
                <div class="flex items-center mb-2">
                    ${createStars(product.rating)}
                    <span class="text-xs text-gray-500 ml-2">(${product.reviews})</span>
                </div>
                <div class="text-xl font-bold text-primary mb-2">${formatCurrency(product.price)}</div>
                <div class="text-sm text-gray-600 mb-3">${product.farmer}</div>
                <button onclick="addToCartFromList(${product.id})" class="w-full py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function createStars(rating) {
    const full = Math.floor(rating);
    let stars = '';
    for(let i = 0; i < full; i++) {
        stars += '<svg class="w-4 h-4 text-yellow-400 fill-current inline" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>';
    }
    return stars;
}

function addToCartFromList(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
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
}

function resetFilters() {
    document.querySelectorAll('.category-filter').forEach(cb => {
        cb.checked = cb.value === 'all';
    });
    document.getElementById('priceRange').value = 1000;
    document.getElementById('maxPrice').textContent = 'Rs. 1000';
    document.querySelector('input[name="rating"][value="all"]').checked = true;
    filteredProducts = [...allProducts];
    displayProducts();
}