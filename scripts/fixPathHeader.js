document.addEventListener("DOMContentLoaded", () => {
  const fixPaths = (container) => {
    if (!container) return;

    // Fix image paths
    container.querySelectorAll("img").forEach(img => {
      const src = img.getAttribute("src");
      if (src && src.startsWith("./images/")) {
        img.setAttribute("src", "../images/" + src.replace("./images/", ""));
      }
    });

    // Fix internal link paths
    container.querySelectorAll("a").forEach(link => {
      const href = link.getAttribute("href");
      if (
        href &&
        href.startsWith("./") &&
        href.endsWith(".html") &&
        !href.startsWith("./blog") && // leave external blog links alone
        !href.startsWith("./contact") // optional: exclude specific links
      ) {
        link.setAttribute("href", "../" + href.replace("./", ""));
      }
    });
  };

  const waitForElements = () => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    if (header && footer) {
      fixPaths(header);
      fixPaths(footer);
      observer.disconnect();
    }
  };

  const observer = new MutationObserver(waitForElements);
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(waitForElements, 500);
});
