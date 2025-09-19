// generate_site.js
import fs from 'fs';
import { JSDOM } from 'jsdom';

import { populateBiography, populatePortfolio } from './load_content.js';

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

await populateBiography(document);
await populatePortfolio(document);

fs.writeFileSync('index.html', dom.serialize());
