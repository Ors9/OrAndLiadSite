const fs = require('fs');
const path = require('path');

const pages = [
  { html: 'index.html', seo: 'SEO/home-seo.html' },
  { html: 'cart.html', seo: 'SEO/cart-seo.html' },
  { html: 'shopping.html', seo: 'SEO/shopping-seo.html' },
];

const distDir = path.join(__dirname, 'docs');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

pages.forEach(page => {
  const htmlPath = path.join(__dirname, page.html);
  const seoPath = path.join(__dirname, page.seo);
  const distPath = path.join(distDir, page.html);

  if (!fs.existsSync(htmlPath) || !fs.existsSync(seoPath)) {
    console.warn('Missing file:', htmlPath, 'or', seoPath);
    return;
  }

  let html = fs.readFileSync(htmlPath, 'utf-8');
  const seo = fs.readFileSync(seoPath, 'utf-8');

  html = html.replace(/<head>([\s\S]*?)<\/head>/i, match => {
    return match.replace(/<head>/i, '<head>\n' + seo.trim());
  });

  fs.writeFileSync(distPath, html, 'utf-8');
  console.log('✅ Updated:', distPath);
});
