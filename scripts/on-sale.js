document.addEventListener("DOMContentLoaded", () => {
  const saleCardsContainer = document.getElementById("sale-cards");

  // Fetch the products from the products.json file
  fetch("data/products.json")
    .then(response => response.json())  // Parse the JSON response
    .then(products => {
      // Iterate through all products and filter by presence of oldPrice (i.e., on sale)
      products.forEach(product => {
        // Check if the product has both a "price" and "oldPrice" (indicating it's on sale)
        if (product.oldPrice && product.price) {
          const card = document.createElement("div");
          card.classList.add("card");

          // Wrap the card content in a clickable link
          const link = document.createElement("a");
          link.href = `product.html?id=${product.id}`; // Link to the product's detail page
          link.style.textDecoration = "none"; // Remove underline
          link.style.color = "inherit"; // Inherit the text color from the parent element (card)
          link.style.border = "none"; // Remove border

          // Set the inner HTML of the card inside the link
          link.innerHTML = `
            <div class="product-name-button">
              <button class="product-name-btn">${product.name}</button> <!-- Name inside a button -->
            </div>
            <img src="${product.image}" alt="${product.name}">
          `;

          // Append the link to the card
          card.appendChild(link);

          // Append the card to the "Sale" section
          saleCardsContainer.appendChild(card);
        }
      });
    })
    .catch(error => {
      console.error("Error loading products:", error);
    });
});
