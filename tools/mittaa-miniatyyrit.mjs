/*
 * Miniatyyrien leikkausmitta (löydös 95, 25.9.2026): läpinäkymättömien
 * pikselien osuus kuvasta (täyttö) ja sen kehästä (reuna), 256×256:ksi
 * skaalatusta alfasta (alfa > 200). Tulos tools/miniatyyri-mitat.json,
 * jonka tests/miniatyyrit-leikkaus.test.mjs lukee — CI:ssä ei ole
 * sharpia, joten mittaus tehdään täällä ja testi tarkistaa vain, että
 * manifesti vastaa tiedostojen sha256:tä.
 *
 * Käyttö:  node tools/mittaa-miniatyyrit.mjs
 * Aja aina, kun assets/kartat/miniatyyrit/-kansioon lisätään tai
 * vaihdetaan kuva.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const KANSIO = new URL('../assets/kartat/miniatyyrit/', import.meta.url);
const ULOS = new URL('./miniatyyri-mitat.json', import.meta.url);

const tulos = {};
for (const nimi of readdirSync(KANSIO).filter((n) => n.endsWith('.webp')).sort()) {
  const polku = fileURLToPath(new URL(nimi, KANSIO));
  const sha = createHash('sha256').update(readFileSync(polku)).digest('hex').slice(0, 16);
  const { data, info } = await sharp(polku).ensureAlpha().resize(256, 256, { fit: 'fill' })
    .raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const alfa = (x, y) => data[(y * w + x) * c + (c - 1)];
  let taytto = 0;
  for (let y = 0; y < h; y += 1) for (let x = 0; x < w; x += 1) if (alfa(x, y) > 200) taytto += 1;
  let ylla = 0; let yht = 0;
  const lue = (x, y) => { yht += 1; if (alfa(x, y) > 200) ylla += 1; };
  for (let x = 0; x < w; x += 1) { lue(x, 0); lue(x, h - 1); }
  for (let y = 0; y < h; y += 1) { lue(0, y); lue(w - 1, y); }
  tulos[nimi] = { sha, taytto: +(taytto / (w * h)).toFixed(3), reuna: +(ylla / yht).toFixed(3) };
}
writeFileSync(ULOS, `${JSON.stringify(tulos, null, 1)}\n`);
console.log(`${Object.keys(tulos).length} kuvaa → tools/miniatyyri-mitat.json`);
