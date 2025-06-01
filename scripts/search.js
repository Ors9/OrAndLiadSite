document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const suggestionsBox = document.getElementById("search-suggestions");

  fetch("data/products.json")
    .then(res => res.json())
    .then(products => {



      const categories = [...new Set(products.map(p => p.category))];

      function showSuggestions(filter = "") {
        const value = filter.toLowerCase().trim();
        suggestionsBox.innerHTML = "";

        const matchedCategories = categories
          .filter(cat => cat.toLowerCase().includes(value))
          .map(cat => ({ type: "category", id: cat, title: categoryToTitle(cat.trim()) }));

        const matchedProducts = products
          .filter(p =>
            p.name.toLowerCase().includes(value) ||
            (p.description && p.description.toLowerCase().includes(value)) ||
            (p.tags && p.tags.some(tag => tag.toLowerCase().includes(value)))
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
            div.addEventListener("click", () => {
              input.value = result.title;
              suggestionsBox.style.display = "none";
              const target = document.getElementById(result.id);
              if (target) {
                scrollToElementWithOffset(target);;
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


      input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const value = input.value.toLowerCase().trim();

    const matchedCategories = categories
      .filter(cat => cat.toLowerCase().includes(value))
      .map(cat => ({ type: "category", id: cat, title: categoryToTitle(cat.trim()) }));

    const matchedProducts = products
      .filter(p =>
        p.name.toLowerCase().includes(value) ||
        (p.description && p.description.toLowerCase().includes(value)) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(value)))
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
});


      // בעת לחיצה – הצג את כל האפשרויות
      input.addEventListener("focus", () => {
        showSuggestions("");
      });

      // סגירה בלחיצה מחוץ לאזור החיפוש
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-section")) {
          suggestionsBox.style.display = "none";
        }
      });
    });
});
