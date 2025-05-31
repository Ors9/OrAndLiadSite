fetch("data/home-cards.json")
  .then(res => res.json())
  .then(cards => {
    const container = document.getElementById("home-cards");

    cards.forEach(card => {
      const div = document.createElement("div");
      div.className = "card";

      const imgHtml = card.image
        ? `<img src="${card.image}" alt="${card.title}" style="width:100%; border-radius: 8px;">`
        : "";

      div.innerHTML = `
        ${imgHtml}
        <h3>${card.title}</h3>
        <p>${card.text}</p>
      `;

      container.appendChild(div);
    });
  });
