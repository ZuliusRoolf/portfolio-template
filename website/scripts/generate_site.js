// generate_site.js
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { populateBiography, populatePortfolio } from './load_content.js';

// Helper to copy files or folders recursively
function copyRecursiveSync(src, dest) {
    const stats = fs.statSync(src);
  
    if (stats.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      fs.readdirSync(src).forEach((child) => {
        copyRecursiveSync(path.join(src, child), path.join(dest, child));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

// 1️⃣ Create dist folder
const distDir = path.join(process.cwd(), 'dist');
fs.mkdirSync(distDir, { recursive: true });

// 2️⃣ Load template and populate HTML
const templatePath = path.join(process.cwd(), 'website/index.html');
const html = fs.readFileSync(templatePath, 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

await populateBiography(document);
await populatePortfolio(document);

// 3️⃣ Write generated index.html
fs.writeFileSync(path.join(distDir, 'index.html'), dom.serialize());

// 4️⃣ Copy style.css and script.js
['styles.css', 'script.js'].forEach((file) => {
  const srcPath = path.join(process.cwd(), 'website', file);
  const destPath = path.join(distDir, file);
  fs.copyFileSync(srcPath, destPath);
});

// 5️⃣ Copy entire scripts/ folder
copyRecursiveSync(path.join(process.cwd(), 'website/scripts'), path.join(distDir, 'scripts'));

// 6️⃣ Copy content/ folder
copyRecursiveSync(path.join(process.cwd(), 'website/content'), path.join(distDir, 'content'));

console.log('✅ Site generated in dist/ with CSS, JS, scripts/, and content/');
