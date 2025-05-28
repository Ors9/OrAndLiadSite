function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html;
      })
      .catch(err => {
        el.innerHTML = "<p style='color: red;'>Include failed</p>";
        console.error(`Failed to include ${file}:`, err);
      });
  });
}
window.addEventListener('DOMContentLoaded', includeHTML);
