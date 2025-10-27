document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});

function displayCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartContainer = document.getElementById('emptyCart');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartContainer.classList.remove('hidden');
        updateOrderSummary(0);
        return;
    }

    emptyCartContainer.classList.add('hidden');

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="bg-white rounded-xl p-6 flex items-center space-x-4">
            <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
            <div class="flex-1">
                <h3 class="font-semibold text-lg mb-1">${item.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${item.farmer}</p>
                <p class="text-primary font-bold">${formatCurrency(item.price)} / ${item.unit || 'unit'}</p>
            </div>
            <div class="flex items-center space-x-3">
                <button onclick="decreaseQuantity(${item.id})" class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                    </svg>
                </button>
                <span class="w-12 text-center font-semibold">${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})" class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                </button>
            </div>
            <div class="text-right">
                <div class="font-bold text-lg mb-2">${formatCurrency(item.price * item.quantity)}</div>
                <button onclick="removeItem(${item.id})" class="text-red-500 hover:text-red-700 text-sm">Remove</button>
            </div>
        </div>
    `).join('');

    updateOrderSummary(getCartTotal());
}

function increaseQuantity(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        updateCartQuantity(productId, item.quantity + 1);
        displayCart();
    }
}

function decreaseQuantity(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        updateCartQuantity(productId, item.quantity - 1);
        displayCart();
    }
}

function removeItem(productId) {
    if (confirm('Remove this item from cart?')) {
        removeFromCart(productId);
        displayCart();
    }
}

function updateOrderSummary(subtotal) {
    const deliveryFee = subtotal > 0 ? 200 : 0;
    const total = subtotal + deliveryFee;

    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('delivery').textContent = formatCurrency(deliveryFee);
    document.getElementById('total').textContent = formatCurrency(total);
}

function proceedToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }

    const user = getCurrentUser();
    if (!user) {
        showToast('Please login to checkout', 'info');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=checkout';
        }, 1500);
        return;
    }

    window.location.href = 'checkout.html';
}