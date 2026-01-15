/*************************************************
 * app.js – Voice-enabled E-commerce SPA
 *************************************************/

/* -------------------------------
   SIMPLE SPA NAVIGATION
--------------------------------*/

function loadPage(page) {
  const content = document.getElementById("content");

  if (!content) {
    console.error("Content container not found");
    return;
  }

  fetch(`${page}.html`)
    .then((res) => res.text())
    .then((html) => {
      content.innerHTML = html;
      history.pushState({ page }, "", `#${page}`);
    })
    .catch((err) => {
      console.error("Failed to load page:", err);
    });
}

/* -------------------------------
   CART LOGIC
--------------------------------*/

let cart = [];

function handleAddToCart(product) {
  if (!product) return;

  cart.push(product);
  console.log("Cart updated:", cart);

  alert(`${product} added to cart`);
}

/* -------------------------------
   ELEVENLABS CLIENT TOOL REGISTRATION
--------------------------------*/

const voiceAgent = document.getElementById("voiceAgent");

if (!voiceAgent) {
  console.error("Voice agent element not found");
} else {
  voiceAgent.addEventListener("elevenlabs-convai:ready", () => {
    console.log("ConvAI widget ready");

    voiceAgent.registerClientTools({
      navigate: {
        description: "Navigate to a page",
        parameters: {
          page: { type: "string" }
        },
        handler: ({ page }) => {
          console.log("Client navigating to:", page);
          loadPage(page);
        }
      },

      add_to_cart: {
        description: "Add product to cart",
        parameters: {
          product: { type: "string" }
        },
        handler: ({ product }) => {
          console.log("Client adding to cart:", product);
          handleAddToCart(product);
        }
      }
    });
  });
}

/* -------------------------------
   INITIAL PAGE LOAD
--------------------------------*/

window.addEventListener("DOMContentLoaded", () => {
  loadPage("home");
});
