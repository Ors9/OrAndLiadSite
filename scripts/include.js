function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html;

        // ✅ Run updateCartCount after header is included
        if (file.includes("header")) {
          setTimeout(updateCartCount, 0); // short delay ensures DOM is ready
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
