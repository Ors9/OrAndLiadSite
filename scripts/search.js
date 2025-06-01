document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const suggestionsBox = document.getElementById("search-suggestions");
  const searchButton = document.getElementById("search-button");
  const closeButton = document.getElementById("close-button");

  closeButton.addEventListener("click", () => {
    input.value = "";
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "none";
  });

  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {
      const categories = [...new Set(products.map(p => p.category))];

      function showSuggestions(filter = "") {
        const words = filter.toLowerCase().trim().split(" ");
        suggestionsBox.innerHTML = "";

        const matchedCategories = categories
          .filter(cat =>
            words.every(word => cat.toLowerCase().includes(word))
          )
          .map(cat => ({ type: "category", id: cat, title: categoryToTitle(cat.trim()) }));

        const matchedProducts = products
          .filter(p =>
            words.every(word =>
              p.name.toLowerCase().includes(word) ||
              (p.description && p.description.toLowerCase().includes(word)) ||
              (p.tags && p.tags.some(tag => tag.toLowerCase().includes(word)))
            )
          )
          .map(p => ({ type: "product", value: p.name, id: p.id }));


        const results = [...matchedCategories, ...matchedProducts];

        if (results.length === 0) {
          suggestionsBox.style.display = "none";
          return;
        }

        results.forEach(result => {
          const div = document.createElement("div");

          if (result.type === "category") {
            div.textContent = `🔎 Category: ${result.title}`;
            div.classList.add("suggestion-category");
            div.addEventListener("click", () => {
              input.value = result.title;
              suggestionsBox.style.display = "none";
              const target = document.getElementById(result.id);
              if (target) {
                setTimeout(() => {
                  scrollToElementWithOffset(target, 300);
                }, 100);
              }
            });
          } else {
            const product = products.find(p => p.id === result.id);
            div.classList.add("suggestion-product");
            div.innerHTML = `
              <img src="${product.image}" alt="${product.name}" class="suggestion-thumb">
              <span>${product.name}</span>
            `;
            div.addEventListener("click", () => {
              input.value = product.name;
              suggestionsBox.style.display = "none";
              window.location.href = `product.html?id=${product.id}`;
            });
          }

          suggestionsBox.appendChild(div);
        });

        suggestionsBox.style.display = "block";
      }

      input.addEventListener("input", () => {
        showSuggestions(input.value);
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          executeSearch();
        }
      });

      searchButton.addEventListener("click", () => {
        executeSearch();
      });

      function executeSearch() {
        const words = input.value.toLowerCase().trim().split(" ");

      const matchedCategories = categories
        .filter(cat =>
          words.every(word => cat.toLowerCase().includes(word))
        )
        .map(cat => ({ type: "category", id: cat, title: categoryToTitle(cat.trim()) }));

      const matchedProducts = products
        .filter(p =>
          words.every(word =>
            p.name.toLowerCase().includes(word) ||
            (p.description && p.description.toLowerCase().includes(word)) ||
            (p.tags && p.tags.some(tag => tag.toLowerCase().includes(word)))
          )
        )
        .map(p => ({ type: "product", value: p.name, id: p.id }));

        const results = [...matchedCategories, ...matchedProducts];

        if (results.length === 0) return;

        const first = results[0];

        if (first.type === "category") {
          const target = document.getElementById(first.id);
          if (target) {
            input.value = first.title;
            scrollToElementWithOffset(target);
            suggestionsBox.style.display = "none";
          }
        } else if (first.type === "product") {
          window.location.href = `product.html?id=${first.id}`;
        }
      }

      input.addEventListener("focus", () => {
        showSuggestions("");
      });

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-section")) {
          suggestionsBox.style.display = "none";
        }
      });
    });
});
