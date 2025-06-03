// ✅ Update cart icon count
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countSpan = document.querySelector(".cart-count");
  const cartIcon = document.querySelector(".cart-button .icon"); // more specific!

  if (countSpan) {
    countSpan.textContent = count;
    countSpan.style.display = count > 0 ? "inline-block" : "none";

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
function updateCart(name, price, quantity, image, buttonElement, color, size, oldPrice) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const variation = [color, size].filter(Boolean).join(", ");
  const existingItem = cart.find(item =>
    item.name === name &&
    item.color === color &&
    item.size === size
  );

  const product = window.currentProductData;
  const currentQuantity = existingItem ? existingItem.quantity : 0;

  if (product && currentQuantity + quantity > product.stock) {
    alert(`You can order up to ${product.stock} items of this product.`);
    return;
  }

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      name,
      price,
      quantity,
      image,
      color,
      size,
      oldPrice
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

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
        window.location.href = `product.html?id=${product.id}`;
      });


      container.appendChild(item);
    });

    // ✅ After rendering products, update count
    updateCartCount();



  });


// ✅ Always update count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
