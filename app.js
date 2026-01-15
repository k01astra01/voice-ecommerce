const app = document.getElementById("app");
let cart = [];

// SPA PAGE LOADER
function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      app.innerHTML = html;

      if (page === "products") renderProducts();
      if (page === "cart") renderCart();
    });
}

// RENDER PRODUCTS
function renderProducts() {
  const list = document.getElementById("product-list");
  PRODUCTS.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

// CART FUNCTIONS
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  cart.push(product);
  alert(`${product.name} added to cart`);
}

function renderCart() {
  const ul = document.getElementById("cart-items");
  ul.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    ul.appendChild(li);
  });
}

// INITIAL LOAD
loadPage("home");

// VOICE TOOL HANDLER
document.addEventListener("elevenlabs-convai:call", (event) => {
  const { tool_name, arguments: args } = event.detail;

  if (tool_name === "navigate") {
    loadPage(args.page);
  }

  if (tool_name === "add_to_cart") {
    const product = PRODUCTS.find(p =>
      p.name.toLowerCase().includes(args.product.toLowerCase())
    );
    if (product) addToCart(product.id);
  }
});
