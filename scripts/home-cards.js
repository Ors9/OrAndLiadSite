fetch("data/home-cards.json")
  .then(res => res.json())
  .then(cards => {
    const container = document.getElementById("home-cards");

    cards.forEach(card => {
      const div = document.createElement("div");
      div.className = "card";

    const imgHtml = card.image
      ? `<img src="${card.image}" alt="${card.title}" class="card-image">`
      : "";

      // קביעת קישור לפי סוג הכרטיס
      const isShoppingSection = [
        "DogsCare",
        "DogFood",
        "DogsToys",
        "DogsTreats",
        "DogsGadget",
        "DogsBeds",
        "DogsFashion",
        "DogsWalk",
        "DogsTravel"
      ];

      const link = isShoppingSection.includes(card.id)
        ? `shopping.html#${card.id}`
        : `${card.id}.html`; // לדפים אחרים כמו about.html וכו'

      div.innerHTML = `
        <a href="${link}" style="text-decoration: none; color: inherit;">
          ${imgHtml}
          <h3>${card.title}</h3>
          <p>${card.text || ""}</p>
        </a>
      `;

      container.appendChild(div);
    });
  });
