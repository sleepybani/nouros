// GitHub Pages serves 404.html for unknown paths. Making it a copy of index.html
// lets Angular boot and route deep links like /nouros/projects/kc-media.
import { copyFileSync } from 'node:fs';

const outputDir = 'dist/nouros/browser';
copyFileSync(`${outputDir}/index.html`, `${outputDir}/404.html`);
console.log(`SPA fallback: ${outputDir}/404.html created`);
