// Utility: Get product ID from the URL (e.g., ?id=p03)
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Utility: Update cart icon count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countSpan = document.querySelector(".cart-count");
  const cartIcon = document.querySelector(".cart-button .icon");

  if (countSpan) {
    countSpan.textContent = count;
    countSpan.style.display = count > 0 ? "inline-block" : "none";



  }
}

// Add or update item in cart
function updateCart(name, price, quantity, image, buttonElement) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity, image });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // Removed button text feedback and disable
}

// Main
document.addEventListener("DOMContentLoaded", () => {
  const id = getProductIdFromURL();
  if (!id) return;

  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id === id);
      const container = document.getElementById("product-details");

      console.log("extraImages:", product.extraImages);

      if (!product) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
      }

      injectDynamicSEO({
  title: `${product.name} | PUPPERDISE`,
  description: product.description || "High-quality product for your dog.",
  image: location.origin + "/" + product.image,
  url: location.href
});

container.innerHTML = `
  <div class="image-gallery">
    <img src="${product.image}" class="main-img" id="mainProductImage" alt="${product.name}">
    <div class="extra-images">
      ${(product.extraImages || []).map(img =>
        `<img src="${img}" alt="תמונה נוספת" onclick="document.getElementById('mainProductImage').src='${img}'">`
      ).join("")}
    </div>
  </div>

  <div class="product-info">
    <h2>${product.name}</h2>

    ${product.oldPrice && product.oldPrice > product.price
      ? `<div class="price-wrapper">
          <span class="price old-price">${product.oldPrice} $</span>
          <span class="price">${product.price} $</span>
         </div>`
      : `<span class="price">${product.price} $</span>`}

    ${product.tags ? `<div class="tags">
        ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
    </div>` : ""}

    <h3 class="description-title">Product Description</h3>
    <p class="description">${product.description || "No description available."}</p>

    <div class="fixed-buttons">

      <button class="add-to-cart-button" id="addToCartBtn">Add to Cart 🛒</button>
<button class="add-to-cart-button" onclick="location.href='shopping.html'">← Back to Shop</button>
    </div>
  </div>
`;


document.getElementById("addToCartBtn").addEventListener("click", () => {
  updateCart(product.name, product.price, 1, product.image, document.getElementById("addToCartBtn"));
});
      updateCartCount();
    });
});



function injectDynamicSEO({ title, description, image, url }) {
  const head = document.head;

  // Remove old dynamic SEO tags
  document.querySelectorAll('meta[data-dynamic-seo]').forEach(el => el.remove());

  const metaTags = [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:url", content: url }
  ];

  metaTags.forEach(tag => {
    const meta = document.createElement("meta");
    if (tag.name) meta.setAttribute("name", tag.name);
    if (tag.property) meta.setAttribute("property", tag.property);
    meta.setAttribute("content", tag.content);
    meta.setAttribute("data-dynamic-seo", "true"); // Mark for cleanup
    head.appendChild(meta);
  });

  // Optionally update document title
  document.title = title;
}
