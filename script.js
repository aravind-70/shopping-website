/**
 * script.js – ShopEasy MVP Shopping Website
 *
 * Responsibilities:
 *  1. Define product catalogue
 *  2. Render products on the home page
 *  3. Handle "Add to Cart" with localStorage persistence
 *  4. Update cart badge count dynamically
 *  5. Render cart page (items, totals, remove, quantity controls)
 *  6. Search / filter products by name
 */

/* ============================================================
   1. PRODUCT DATA
   ============================================================ */

/** @type {Array<{id:number, name:string, price:number, image:string, category:string}>} */
const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Minimalist Leather Watch',
    price: 129.00,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    category: 'Accessories',
  },
  {
    id: 3,
    name: 'Running Sneakers',
    price: 64.95,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    category: 'Footwear',
  },
  {
    id: 4,
    name: 'Portable Bluetooth Speaker',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
    category: 'Electronics',
  },
  {
    id: 5,
    name: 'Cotton Casual T-Shirt',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    category: 'Clothing',
  },
  {
    id: 6,
    name: 'Ceramic Coffee Mug',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80',
    category: 'Kitchen',
  },
  {
    id: 7,
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
    category: 'Sports',
  },
  {
    id: 8,
    name: 'Hardcover Notebook',
    price: 11.95,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80',
    category: 'Stationery',
  },
];

/* ============================================================
   2. CART HELPERS  (localStorage)
   ============================================================ */

const CART_KEY = 'shopeasy_cart';

/**
 * Load cart array from localStorage.
 * Each item: { id, name, price, image, qty }
 * @returns {Array}
 */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Persist cart array to localStorage.
 * @param {Array} cart
 */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Add a product to the cart (or increment qty if already present).
 * @param {number} productId
 */
function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
  }

  saveCart(cart);
  updateCartBadge();
  showToast(`"${product.name}" added to cart!`);
}

/**
 * Remove an item completely from the cart.
 * @param {number} productId
 */
function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
  renderCart(); // re-render cart page
}

/**
 * Change qty of a cart item.  Removes item if qty reaches 0.
 * @param {number} productId
 * @param {number} delta  +1 or -1
 */
function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
  updateCartBadge();
  renderCart();
}

/* ============================================================
   3. CART BADGE
   ============================================================ */

/**
 * Update all cart badge elements on the page with the current item count.
 */
function updateCartBadge() {
  const total = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cart-count').forEach((el) => {
    el.textContent = total;
    // brief "bump" animation
    el.classList.remove('bump');
    // force reflow so animation restarts
    void el.offsetWidth;
    el.classList.add('bump');
    setTimeout(() => el.classList.remove('bump'), 300);
  });
}

/* ============================================================
   4. TOAST NOTIFICATION
   ============================================================ */

let toastTimer = null;

/**
 * Show a brief toast notification at the bottom-right of the screen.
 * @param {string} message
 */
function showToast(message) {
  // Reuse or create the toast element
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ============================================================
   5. HOME PAGE – Render Products
   ============================================================ */

/**
 * Create the HTML string for a single product card.
 * @param {{ id:number, name:string, price:number, image:string, category:string }} product
 * @returns {string}
 */
function createProductCard(product) {
  return `
    <article class="product-card" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="card-body">
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button
          class="btn btn-primary"
          onclick="addToCart(${product.id})"
          aria-label="Add ${product.name} to cart"
        >
          🛒 Add to Cart
        </button>
      </div>
    </article>`;
}

/**
 * Render the product grid, filtered by `query`.
 * @param {string} [query='']
 */
function renderProducts(query = '') {
  const grid = document.getElementById('product-grid');
  const noResults = document.getElementById('no-results');
  if (!grid) return; // not on home page

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  grid.innerHTML = filtered.map(createProductCard).join('');

  if (noResults) {
    noResults.classList.toggle('hidden', filtered.length > 0);
  }
}

/* ============================================================
   6. CART PAGE – Render Cart
   ============================================================ */

/**
 * Render the full cart page (items + summary).
 */
function renderCart() {
  const cartContent = document.getElementById('cart-content');
  const emptyCart = document.getElementById('empty-cart');
  const itemsList = document.getElementById('cart-items-list');
  if (!cartContent) return; // not on cart page

  const cart = getCart();

  if (cart.length === 0) {
    cartContent.classList.add('hidden');
    emptyCart.classList.remove('hidden');
    return;
  }

  cartContent.classList.remove('hidden');
  emptyCart.classList.add('hidden');

  // Render each cart item row
  itemsList.innerHTML = cart.map((item) => `
    <div class="cart-item" id="cart-item-${item.id}">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p class="price">$${item.price.toFixed(2)} each</p>
        <div class="qty-controls" role="group" aria-label="Quantity for ${item.name}">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
          <span class="qty-value" aria-live="polite">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button
        class="btn btn-danger"
        onclick="removeFromCart(${item.id})"
        aria-label="Remove ${item.name} from cart"
      >
        🗑 Remove
      </button>
    </div>`).join('');

  // Update summary numbers
  const totalQty  = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);

  document.getElementById('item-count').textContent  = totalQty;
  document.getElementById('subtotal').textContent    = subtotal.toFixed(2);
  document.getElementById('total-price').textContent = subtotal.toFixed(2);
}

/* ============================================================
   7. SEARCH BAR
   ============================================================ */

/**
 * Wire up the search input to re-render the product grid on every keystroke.
 */
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', () => {
    renderProducts(input.value.trim());
  });
}

/* ============================================================
   8. CHECKOUT BUTTON (placeholder)
   ============================================================ */

function initCheckout() {
  const btn = document.getElementById('checkout-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    showToast('✅ Order placed! (Demo mode)');
    saveCart([]);
    updateCartBadge();
    setTimeout(() => renderCart(), 600);
  });
}

/* ============================================================
   9. INIT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge(); // always keep badge current
  renderProducts();  // home page grid (no-op on cart page)
  initSearch();      // search bar (no-op on cart page)
  renderCart();      // cart page (no-op on home page)
  initCheckout();    // checkout button (no-op on home page)
});
