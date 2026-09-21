import { createRequire } from 'node:module'; const sharp = createRequire(import.meta.url)('sharp');
import { kansio } from './kansio.mjs'; const K = kansio();
const { data, info } = await sharp(K + 'stieler33.jpg', { limitInputPixels: false }).grayscale().raw().toBuffer({ resolveWithObject: true });
import { writeFileSync } from 'node:fs';
writeFileSync(K + 'harmaa.raw', data); writeFileSync(K + 'harmaa.json', JSON.stringify(info));
console.log(info.width, info.height, info.channels);
