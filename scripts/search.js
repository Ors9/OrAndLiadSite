document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const suggestionsBox = document.getElementById("search-suggestions");

  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {
      const categories = [...new Set(products.map(p => p.category))];
      const productNames = products.map(p => ({ name: p.name, id: p.id }));

      function showSuggestions(filter = "") {
        const value = filter.toLowerCase().trim();
        suggestionsBox.innerHTML = "";

        const matchedCategories = categories
          .filter(cat => cat.toLowerCase().includes(value))
          .map(cat => ({ type: "category", value: cat }));

        const matchedProducts = productNames
          .filter(p => p.name.toLowerCase().includes(value))
          .map(p => ({ type: "product", value: p.name, id: p.id }));

        const results = [...matchedCategories, ...matchedProducts];

        if (results.length === 0) {
          suggestionsBox.style.display = "none";
          return;
        }

        results.forEach(result => {
          const div = document.createElement("div");

          if (result.type === "category") {
            div.textContent = `🔎 Category: ${result.value}`;
            div.addEventListener("click", () => {
              input.value = result.value;
              suggestionsBox.style.display = "none";
              const target = document.getElementById(result.value);
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            });
          } else {
            div.textContent = `🛍️ Product: ${result.value}`;
            div.addEventListener("click", () => {
              input.value = result.value;
              suggestionsBox.style.display = "none";
              window.location.href = `product.html?id=${result.id}`;
            });
          }

          suggestionsBox.appendChild(div);
        });

        suggestionsBox.style.display = "block";
      }

      // בעת הקלדה
      input.addEventListener("input", () => {
        showSuggestions(input.value);
      });

      // בעת לחיצה – הצג את כל האפשרויות
      input.addEventListener("focus", () => {
        showSuggestions("");
      });

      // סגור את ההצעות אם לוחצים מחוץ
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-section")) {
          suggestionsBox.style.display = "none";
        }
      });
    });
});
