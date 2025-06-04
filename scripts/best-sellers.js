document.addEventListener("DOMContentLoaded", () => {
  const bestsellerCardsContainer = document.getElementById("bestseller-cards");

  // Fetch the products from the products.json file
  fetch("data/products.json")
    .then(response => response.json())  // Parse the JSON response
    .then(products => {
      // Iterate through all products and filter by the "Bestseller" tag
      products.forEach(product => {
        // Check if the product has the "Bestseller" tag
        if (product.tags && product.tags.includes("Bestseller")) {
          const card = document.createElement("div");
          card.classList.add("card");

          // Wrap the card content in a clickable link
          const link = document.createElement("a");
          link.href = `product.html?id=${product.id}`; // Link to the product's detail page
          link.classList.add("card-link");

          // Add inline styles to remove default link styles
          link.style.textDecoration = "none"; // Remove underline
          link.style.color = "inherit"; // Inherit the text color from the parent element (card)
          link.style.border = "none"; // Remove border

          // Create the button with the product name inside
          const button = document.createElement("button");
          button.classList.add("product-name-btn");
          button.textContent = product.name;

          // Create the image element
          const imgElement = document.createElement("img");
          imgElement.src = product.image;
          imgElement.alt = product.name;
          imgElement.classList.add("card-image");

          // Create the wrapper for the button and image
          const productNameButtonWrapper = document.createElement("div");
          productNameButtonWrapper.classList.add("product-name-button");

          // Append the button to the wrapper and the image
          productNameButtonWrapper.appendChild(button);
          link.appendChild(productNameButtonWrapper);
          link.appendChild(imgElement);

          // Append the link to the card
          card.appendChild(link);

          // Append the card to the "Best Sellers" section
          bestsellerCardsContainer.appendChild(card);
        }
      });
    })
    .catch(error => {
      console.error("Error loading products:", error);
    });
});
