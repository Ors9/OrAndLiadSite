fetch("data/products.json")
  .then(res => res.json())
  .then(products => {
    const container = document.querySelector(".cards-section");
    const categoriesMap = {};

    // סיווג מוצרים לפי קטגוריה
    products.forEach(product => {
      if (!categoriesMap[product.category]) {
        categoriesMap[product.category] = [];
      }
      categoriesMap[product.category].push(product);
    });

    // יצירת HTML לכל קטגוריה
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

      // עכשיו צור את המוצרים עצמם
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

        item.addEventListener("click", (e) => {
          if (e.target.closest("button")) return;
          window.location.href = `product.html?id=${product.id}`;
        });

        const button = document.createElement("button");
        button.className = "add-to-cart-button";
        button.textContent = "Add to Cart 🛒";
        button.addEventListener("click", (e) => {
          e.stopPropagation();
          updateCart(product.name, product.price, 1, product.image, button);
        });

        item.querySelector(".item-info").appendChild(button);
        productDiv.appendChild(item);
      });
    });

    updateCartCount();

    // ✅ גלילה חלקה לפי מיקום האלמנט ומרחק מההדר
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        // חכה קצת לוודא שהכל נטען לגמרי
        setTimeout(() => {
          const headerOffset = 300; // שנה לפי גובה ההדר שלך
          const elementPosition = target.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100); // 100ms בד"כ מספיק
      }
    }

  });

function categoryToTitle(categoryId) {
  const map = {
    DogsToys: "Dog Toys",
    DogsTreats: "Treats & Snacks",
    DogsCare: "Grooming & Hygiene",
    DogFood: "Dry & Wet Food",
    DogsWalk: "Walking & Outdoor Gear",
    DogsBeds: "Beds & Blankets",
    DogsGadget: "Dog Gadgets",
    DogsFashion: "Clothing & Accessories",
    DogsTravel: "Travel & Transport Products" 
  };
  return map[categoryId] || categoryId;
}
