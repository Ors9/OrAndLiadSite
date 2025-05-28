fetch('data/products.json')
  .then(response => response.json())
  .then(products => {
    products.forEach(product => {
      const container = document.getElementById(`${product.category}-container`);
      if (!container) return;

      const noteHtml = product.note
        ? `<span style="color: #006400; font-weight: bold; background-color: #eaffea; padding: 2px 6px; border-radius: 5px; display: inline-block; margin-top: 4px;">${product.note}</span>`
        : "";

      const item = document.createElement("div");
      item.className = "menu-item";
      item.innerHTML = `
        <strong>${product.name}</strong>
        <div class="item-row">
          <img src="${product.image}" alt="${product.name}">
          <div class="item-info">
            <span class="price">${product.price} $</span>
            ${noteHtml}
            <button class="button" onclick="updateCart('${product.name}', ${product.price}, 1, '${product.image}')">
              הוסף לסל 🛒
            </button>
          </div>
        </div>
      `;
      container.appendChild(item);
    });
  });
