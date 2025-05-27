function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(html => el.innerHTML = html);
  });
}
window.addEventListener('DOMContentLoaded', includeHTML);