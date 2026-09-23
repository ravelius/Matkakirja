// Pilvikuvan alfan kultaiset arvot (js/linssit/astro-sumu.js pilvikuvanAlfa) pienellä kuvalla.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const S = await import(join(juuri, 'js/linssit/astro-sumu.js'));
const L = 64, K = 32;
const syote = new Uint8ClampedArray(L * K * 4);
for (let i = 0; i < L * K; i += 1) {
  syote[i * 4] = (i * 37) % 256; syote[i * 4 + 1] = (i * 91 + 13) % 256; syote[i * 4 + 2] = (i * 53 + 7) % 256; syote[i * 4 + 3] = 255;
}
const tulos = S.pilvikuvanAlfa(new Uint8ClampedArray(syote), L, K);
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'pilvet.json'), JSON.stringify({ L, K, syote: [...syote], tulos: [...tulos] }));
console.log('pilvet.json');
