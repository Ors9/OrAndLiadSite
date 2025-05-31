// ✅ Update cart icon count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countSpan = document.querySelector(".cart-count");
  const cartIcon = document.querySelector(".cart-button .icon"); // more specific!

  if (countSpan) {
    countSpan.textContent = count;
    countSpan.style.display = count > 0 ? "inline-block" : "none";

    if (count > 0) {
      // 🔴 Make cart icon red (using CSS filter)
      if (cartIcon) {
        cartIcon.style.filter =
          "invert(17%) sepia(96%) saturate(7493%) hue-rotate(358deg) brightness(94%) contrast(114%)";
        cartIcon.style.transition = "0.3s ease";
      }

      // 🔴 Make cart number text red countSpan.style.color = "#f00000";
      countSpan.style.color = "#f00000";
    } else {
      // ⚪ Reset to original (white)
      if (cartIcon) {
        cartIcon.style.filter = "brightness(0) invert(1)";
      }

      countSpan.style.color = "white";
    }
  }
}





// חכה עד שה־header נטען (כי נטען דינאמית דרך data-include)
document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver(() => {
    if (document.querySelector(".cart-count")) {
      updateCartCount();
      observer.disconnect(); // לא צריך להמשיך לעקוב
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

// ✅ Add or update item in cart
function updateCart(name, price, quantity, image, buttonElement) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (!Array.isArray(cart)) {
    cart = [];
  }

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity, image });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // ✅ Button feedback
  if (buttonElement) {
    buttonElement.textContent = "✓ Added – Click to add more";
    buttonElement.disabled = true;

    setTimeout(() => {
      buttonElement.textContent = "Add to Cart 🛒";
      buttonElement.disabled = false;
    }, 2000);
  }
}

// ✅ Load products from JSON and display them
fetch('/siteWithLiad/data/products.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const container = document.getElementById(product.category);
      if (!container) return;

  

const item = document.createElement("div");
item.className = "menu-item";

const oldPriceHtml = product.oldPrice && product.oldPrice > product.price
  ? `<span class="old-price">${product.oldPrice} $</span>`
  : "";

item.innerHTML = `
  <div class="item-row">
    <img src="${product.image}" alt="${product.name}">
    <div class="item-info">
      <h4 class="product-name">${product.name}</h4>
      <div class="price-wrapper">
        ${oldPriceHtml}
        <span class="price">${product.price} $</span>
      </div>
    </div>
  </div>
`;


            // ✅ לחץ על כל המוצר (חוץ מהכפתור) כדי לעבור לעמוד פרטים
      item.addEventListener("click", (e) => {
        if (e.target.closest("button")) return; // אל תעבור אם לחצו על כפתור
        window.location.href = `product.html?id=${product.id}`;
      });

      const button = document.createElement("button");
      button.className = "add-to-cart-button";
      button.textContent = "Add to Cart 🛒";

    button.addEventListener("click", (e) => {
      e.stopPropagation(); // ❗ חשוב מאוד: מונע מעבר לדף המוצר
      updateCart(product.name, product.price, 1, product.image, button);
    });

      item.querySelector(".item-info").appendChild(button);
      container.appendChild(item);
    });

    // ✅ After rendering products, update count
    updateCartCount();



  });


// ✅ Always update count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
