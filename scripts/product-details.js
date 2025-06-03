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

  // ✅ אפקט זמני של כפתור "Added"
  if (buttonElement) {
    const originalText = buttonElement.textContent;
    buttonElement.textContent = "✓ Added";
    buttonElement.disabled = true;

    setTimeout(() => {
      buttonElement.textContent = originalText;
      buttonElement.disabled = false;
    }, 750);
  }
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

 ${product.variations ? `
  <div class="variation-buttons">
    <div class="variation-group">
      <p>Color:</p>
      <div id="colorOptions">
        ${product.variations.color.map(color => `
          <button class="variation-btn" data-type="color" data-value="${color}">${color}</button>
        `).join("")}
      </div>
    </div>

    <div class="variation-group">
      <p>Size:</p>
      <div id="sizeOptions">
        ${product.variations.size.map(size => `
          <button class="variation-btn" data-type="size" data-value="${size}">${size}</button>
        `).join("")}
      </div>
    </div>
  </div>
` : ""}


          <h3 class="description-title">Product Description</h3>
          <p class="description">${product.description || "No description available."}</p>

          <div class="fixed-buttons">
          <button class="add-to-cart-button" id="addToCartBtn">Add to Cart 🛒</button>
            <button class="add-to-cart-button" onclick="location.href='shopping.html'">← Back to Shop</button>
          </div>
        </div>
      `;

      // אירועים לאחר בניית ה־DOM
      const addToCartBtn = document.getElementById("addToCartBtn");
let selectedColor = "";
let selectedSize = "";



document.querySelectorAll(".variation-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    const value = btn.dataset.value;

    if (type === "color" && product.imagesByColor && product.imagesByColor[value]) {
      document.getElementById("mainProductImage").src = product.imagesByColor[value];
    }

    // הסרת כפתור נבחר קודם באותו סוג
    document.querySelectorAll(`.variation-btn[data-type="${type}"]`).forEach(b => b.classList.remove("selected"));

    // סימון כפתור זה
    btn.classList.add("selected");

    // עדכון הערך שנבחר
    if (type === "color") selectedColor = value;
    if (type === "size") selectedSize = value;

    updateVariationButtonState();
  });
});

    

addToCartBtn.addEventListener("click", () => {
  const mustChooseColor = Array.isArray(product.variations?.color) && product.variations.color.length > 0;
  const mustChooseSize = Array.isArray(product.variations?.size) && product.variations.size.length > 0;

  const missingColor = mustChooseColor && !selectedColor;
  const missingSize = mustChooseSize && !selectedSize;

if (missingColor || missingSize) {
  alert("Please make sure to select all required options (such as color and size) before adding this product to your cart.");
  return;
}

  const variation = `${selectedColor || ""}${selectedColor && selectedSize ? ", " : ""}${selectedSize || ""}`;

  updateCart(
    product.name + (variation ? ` (${variation})` : ""),
    product.price,
    1,
    product.image,
    addToCartBtn
  );
    });
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

