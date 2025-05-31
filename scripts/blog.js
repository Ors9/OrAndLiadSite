document.addEventListener("DOMContentLoaded", () => {
  fetch("blogs/blogs.json")
    .then(response => response.json())
    .then(posts => {
      const container = document.getElementById("blog-list");
      posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${post.title}</h3>
         <p>${post.description}</p>
          <a href="${post.link}" class="btn">Read More</a>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Failed to load blog posts:", err);
    });
});
