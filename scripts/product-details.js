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
    countSpan.style.color = count > 0 ? "#f00000" : "white";

    if (cartIcon) {
      cartIcon.style.filter = count > 0
        ? "invert(17%) sepia(96%) saturate(7493%) hue-rotate(358deg) brightness(94%) contrast(114%)"
        : "brightness(0) invert(1)";
    }
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

  if (buttonElement) {
    buttonElement.textContent = "✓ נוסף לסל";
    buttonElement.disabled = true;

    setTimeout(() => {
      buttonElement.textContent = "הוסף לסל 🛒";
      buttonElement.disabled = false;
    }, 2000);
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
        container.innerHTML = "<p>המוצר לא נמצא.</p>";
        return;
      }

      container.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" class="main-img" alt="${product.name}">
        <p><strong>מחיר:</strong> ${product.price} ₪</p>
        <p>${product.description || "אין תיאור זמין."}</p>

        <button class="back-button" onclick="history.back()">⬅ חזרה</button>
        <button class="add-to-cart-button" id="addToCartBtn">הוסף לסל 🛒</button>

        <div class="extra-images">
          ${product.extraImages ? product.extraImages.map(img =>
            `<img src="${img}" alt="תמונה נוספת">`).join("") : ""}
        </div>
      `;

      document.getElementById("addToCartBtn").addEventListener("click", () => {
        updateCart(product.name, product.price, 1, product.image, document.getElementById("addToCartBtn"));
      });

      updateCartCount();
    });
});
