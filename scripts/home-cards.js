fetch("data/home-cards.json")
  .then(res => res.json())
  .then(cards => {
    const container = document.getElementById("home-cards");

    cards.forEach(card => {
      const div = document.createElement("div");
      div.className = "card";

      // יצירת התמונה אם יש
      const imgElement = document.createElement("img");
      imgElement.src = card.image;
      imgElement.alt = card.title;
      imgElement.classList.add("card-image");

      // יצירת כפתור עם שם המוצר
      const button = document.createElement("button");
      button.classList.add("product-name-btn");
      button.textContent = card.title;

      // יצירת הקישור
      const link = document.createElement("a");
      const isShoppingSection = [
        "DogsCare", "DogFood", "DogsToys", "DogsTreats", "DogsGadget", "DogsBeds", "DogsFashion", "DogsWalk", "DogsTravel"
      ];

      const linkHref = isShoppingSection.includes(card.id)
        ? `shopping.html#${card.id}`
        : `${card.id}.html`; // לדפים אחרים כמו about.html וכו

      link.href = linkHref;
      link.style.textDecoration = "none"; // Remove underline
      link.style.color = "inherit"; // Inherit the text color from the parent element (card)
      link.style.border = "none"; // Remove border

      // יצירת כפתור בתוך תמונה, ממקם את הכפתור מעל התמונה
      const buttonWrapper = document.createElement("div");
      buttonWrapper.classList.add("product-name-button");

      // הוספת הכפתור לתוך ה-wrapper
      buttonWrapper.appendChild(button);

      // הוספת התמונה והכפתור לכישור
      link.appendChild(buttonWrapper);
      link.appendChild(imgElement);

      // הוספת הקישור לכרטיס
      div.appendChild(link);

      // הוספת הכרטיס ל-container
      container.appendChild(div);
    });
  });
