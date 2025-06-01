/**
 * Scrolls to a DOM element with vertical offset.
 *
 * @param {Element} element - The DOM element to scroll to.
 * @param {number} offset - Number of pixels to offset from the top.
 */
function scrollToElementWithOffset(element, offset = 120) {
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

/**
 * Scrolls to a hash (e.g. "#DogsToys") with offset from top.
 *
 * @param {string} hash - The hash to scroll to (default: window.location.hash)
 * @param {number} offset - Vertical offset in px
 * @param {number} delay - Delay in ms (e.g. for async content)
 */
function scrollToHashWithOffset(hash = window.location.hash, offset = 120, delay = 100) {
  if (!hash || !hash.startsWith("#")) return;
  const target = document.querySelector(hash);
  if (!target) return;

  setTimeout(() => {
    scrollToElementWithOffset(target, offset);
  }, delay);
}
