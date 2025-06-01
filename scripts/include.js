function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html;

        // ✅ Run updateCartCount after header is included
      if (file.includes("header")) {
        const waitForCartCount = setInterval(() => {
          const span = document.querySelector(".cart-count");
          if (span) {
            clearInterval(waitForCartCount);
            updateCartCount();
            startCarousel();
          }
        }, 50);
      }
      })
      .catch(err => {
        el.innerHTML = "<p style='color: red;'>Include failed</p>";
        console.error(`Failed to include ${file}:`, err);
      });
  });
}
window.addEventListener('DOMContentLoaded', includeHTML);

document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver(() => {
    const links = document.querySelectorAll("header nav a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
        link.classList.add("active");
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});


function startCarousel() {
  const span = document.getElementById("carousel-message");
  if (!span) return;

  // מניעת הרצה כפולה
  if (span.dataset.carouselStarted) return;
  span.dataset.carouselStarted = "true";

  const messages = [
    "🚚 Free Shipping on Orders Over $50",
    "📦 Delivery in 3–7 Business Days",
    "🐶 Pupper-Approved Quality",
    "🔁 Easy Returns & Refunds",
    "💳 Secure Checkout with All Cards"
  ];

  let index = 0;

  setInterval(() => {
    span.style.opacity = 0;
    setTimeout(() => {
      index = (index + 1) % messages.length;
      span.textContent = messages[index];
      span.style.opacity = 1;
    }, 400);
  }, 4000);
}
