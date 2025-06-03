fetch("data/products.json")
  .then(res => res.json())
  .then(products => {
    const container = document.querySelector(".cards-section");
    const categoriesMap = {};

    // Group products by category
    products.forEach(product => {
      if (!categoriesMap[product.category]) {
        categoriesMap[product.category] = [];
      }
      categoriesMap[product.category].push(product);
    });

    // Create HTML for each category
    Object.entries(categoriesMap).forEach(([category, items]) => {
      const section = document.createElement("div");
      section.className = "category";

      const title = document.createElement("h3");
      title.className = "category-title";
      title.textContent = categoryToTitle(category);

      const productDiv = document.createElement("div");
      productDiv.className = "product-container";
      productDiv.id = category;

      section.appendChild(title);
      section.appendChild(productDiv);
      container.appendChild(section);

      // Now render each product
      items.forEach(product => {
        const item = document.createElement("div");
        item.className = "menu-item";
        item.innerHTML = `
          <div class="item-row">
            <img src="${product.image}" alt="${product.name}">
            <div class="item-info">
              <h4 class="product-name">${product.name}</h4>
              <div class="price-wrapper">
                ${product.oldPrice ? `<span class="old-price">${product.oldPrice} $</span>` : ""}
                <span class="price">${product.price} $</span>
              </div>
            </div>
          </div>
        `;

        item.addEventListener("click", () => {
          window.location.href = `product.html?id=${product.id}`;
        });

        productDiv.appendChild(item); // no button
      });
    });

    updateCartCount();

    // Smooth scroll
    scrollToHashWithOffset(window.location.hash, 300);
  });
