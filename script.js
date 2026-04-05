// ============================================================
// SAMPLE PRODUCT DATA
// Each product has an id, name, price, and image URL.
// Images use placeholder services so no local files are needed.
// ============================================================

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Backpack",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Coffee Mug",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Desk Lamp",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    name: "Plant Pot",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop"
  }
];

// ============================================================
// CART HELPERS — Read / Write cart data from localStorage
// ============================================================

/**
 * Get the current cart array from localStorage.
 * Each cart item has: { id, name, price, image, quantity }
 */
function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

/**
 * Save the cart array to localStorage.
 */
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Get the total number of items in the cart (sum of quantities).
 */
function getCartCount() {
  const cart = getCart();
  return cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);
}

/**
 * Update the cart count badge shown in the navbar.
 */
function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = getCartCount();
  }
}

// ============================================================
// HOME PAGE — Render products & handle "Add to Cart"
// ============================================================

/**
 * Render the product cards into the products container.
 * Optionally accepts a filtered list of products.
 */
function renderProducts(productList) {
  const container = document.getElementById("products-container");
  // If we're not on the home page, exit early
  if (!container) return;

  // Clear existing products
  container.innerHTML = "";

  // Show a message if no products match the search
  if (productList.length === 0) {
    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#888;">No products found.</p>';
    return;
  }

  // Create a card for each product
  productList.forEach(function (product) {
    var card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML =
      '<img src="' + product.image + '" alt="' + product.name + '">' +
      '<div class="product-info">' +
        '<h3>' + product.name + '</h3>' +
        '<p class="price">$' + product.price.toFixed(2) + '</p>' +
        '<button class="btn add-to-cart-btn" data-id="' + product.id + '">' +
          'Add to Cart' +
        '</button>' +
      '</div>';
    container.appendChild(card);
  });

  // Attach click handlers to all "Add to Cart" buttons
  var buttons = container.querySelectorAll(".add-to-cart-btn");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var productId = parseInt(btn.getAttribute("data-id"), 10);
      addToCart(productId);

      // Brief visual feedback: change button text
      btn.textContent = "Added!";
      btn.classList.add("added");
      setTimeout(function () {
        btn.textContent = "Add to Cart";
        btn.classList.remove("added");
      }, 1000);
    });
  });
}

/**
 * Add a product to the cart by its id.
 * If the product is already in the cart, increase its quantity.
 */
function addToCart(productId) {
  var product = products.find(function (p) {
    return p.id === productId;
  });
  if (!product) return;

  var cart = getCart();
  var existingItem = cart.find(function (item) {
    return item.id === productId;
  });

  if (existingItem) {
    // Product already in cart — increase quantity
    existingItem.quantity += 1;
  } else {
    // New product — add with quantity 1
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();
}

// ============================================================
// SEARCH / FILTER — Filter products by name
// ============================================================

function setupSearch() {
  var searchBar = document.getElementById("search-bar");
  if (!searchBar) return;

  searchBar.addEventListener("input", function () {
    var query = searchBar.value.toLowerCase().trim();
    var filtered = products.filter(function (product) {
      return product.name.toLowerCase().includes(query);
    });
    renderProducts(filtered);
  });
}

// ============================================================
// CART PAGE — Render cart items & handle remove / quantity
// ============================================================

/**
 * Render the cart page with all items, quantities, and total.
 */
function renderCart() {
  var cartItemsContainer = document.getElementById("cart-items");
  var cartSummary = document.getElementById("cart-summary");
  var emptyMessage = document.getElementById("empty-cart-message");

  // If we're not on the cart page, exit early
  if (!cartItemsContainer) return;

  var cart = getCart();

  // Show/hide empty message
  if (cart.length === 0) {
    emptyMessage.style.display = "block";
    cartSummary.style.display = "none";
    cartItemsContainer.innerHTML = "";
    return;
  }

  emptyMessage.style.display = "none";
  cartSummary.style.display = "block";

  // Build cart item rows
  cartItemsContainer.innerHTML = "";
  var total = 0;

  cart.forEach(function (item) {
    var itemTotal = item.price * item.quantity;
    total += itemTotal;

    var row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML =
      '<img src="' + item.image + '" alt="' + item.name + '">' +
      '<div class="cart-item-details">' +
        '<h3>' + item.name + '</h3>' +
        '<p class="price">$' + item.price.toFixed(2) + ' each</p>' +
      '</div>' +
      '<div class="quantity-controls">' +
        '<button class="qty-decrease" data-id="' + item.id + '">−</button>' +
        '<span>' + item.quantity + '</span>' +
        '<button class="qty-increase" data-id="' + item.id + '">+</button>' +
      '</div>' +
      '<button class="remove-btn" data-id="' + item.id + '">Remove</button>';
    cartItemsContainer.appendChild(row);
  });

  // Show total price
  cartSummary.innerHTML =
    '<p class="total">Total: $' + total.toFixed(2) + '</p>';

  // Attach event handlers for quantity and remove buttons
  attachCartHandlers();
}

/**
 * Attach click handlers to cart quantity and remove buttons.
 */
function attachCartHandlers() {
  // Increase quantity
  document.querySelectorAll(".qty-increase").forEach(function (btn) {
    btn.addEventListener("click", function () {
      changeQuantity(parseInt(btn.getAttribute("data-id"), 10), 1);
    });
  });

  // Decrease quantity
  document.querySelectorAll(".qty-decrease").forEach(function (btn) {
    btn.addEventListener("click", function () {
      changeQuantity(parseInt(btn.getAttribute("data-id"), 10), -1);
    });
  });

  // Remove item entirely
  document.querySelectorAll(".remove-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      removeFromCart(parseInt(btn.getAttribute("data-id"), 10));
    });
  });
}

/**
 * Change the quantity of a cart item by a given delta (+1 or -1).
 * If quantity drops to 0, remove the item from the cart.
 */
function changeQuantity(productId, delta) {
  var cart = getCart();
  var item = cart.find(function (i) {
    return i.id === productId;
  });
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    // Remove item if quantity reaches zero
    cart = cart.filter(function (i) {
      return i.id !== productId;
    });
  }

  saveCart(cart);
  updateCartCount();
  renderCart();
}

/**
 * Remove a product from the cart entirely.
 */
function removeFromCart(productId) {
  var cart = getCart().filter(function (item) {
    return item.id !== productId;
  });
  saveCart(cart);
  updateCartCount();
  renderCart();
}

// ============================================================
// INITIALIZATION — Run when the page loads
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // Always update the cart count badge
  updateCartCount();

  // If on the home page, render products and set up search
  renderProducts(products);
  setupSearch();

  // If on the cart page, render cart items
  renderCart();
});
