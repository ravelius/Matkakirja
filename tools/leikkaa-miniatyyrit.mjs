/*
 * Miniatyyripiirrosten taustanpoisto (omistajan tilaus 15.8.2026:
 * "tee piirroksista leikattuja. Poista siis ylimääräinen tausta
 * niistä").
 *
 * Generoidut kuvat ovat JPEG:itä tasaisella paperitaustalla. Tämä
 * työkalu leikkaa taustan REUNATÄYTÖLLÄ: taustan sävy mitataan kuvan
 * reunoilta, ja tulva-alue etenee reunoilta sisäänpäin niin kauan kuin
 * väri pysyy taustan toleranssissa. Rakennuksen SISÄLLÄ olevat
 * paperinväriset alueet säilyvät, koska tulva ei pääse musteviivan
 * yli — ja maalattu varjo säilyy, koska se on taustaa selvästi
 * tummempi. Rajapikselit saavat puolittaisen alfan, ettei reuna ole
 * veitsellä leikattu.
 *
 * Käyttö:  node tools/leikkaa-miniatyyrit.mjs [tiedosto.jpg …]
 *          Ilman argumentteja leikkaa kaikki assets/kartat/
 *          miniatyyrit/-kansion .jpg-kuvat.
 * Ulos:    samanniminen .webp (läpinäkyvyys, pienempi kuin PNG).
 *          KATSO KUVAT SILMIN — vaalea rakennus ilman ääriviivaa
 *          voisi haljeta tulvalle.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const KANSIO = resolve(JUURI, 'assets/kartat/miniatyyrit');

const pyydetyt = process.argv.slice(2);
const tiedostot = (pyydetyt.length ? pyydetyt : readdirSync(KANSIO).filter((n) => n.endsWith('.jpg')))
  .map((n) => basename(n));
if (!tiedostot.length) {
  console.error('Ei leikattavia .jpg-kuvia.');
  process.exit(1);
}

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const sivu = await selain.newPage();

for (const nimi of tiedostot) {
  const data = readFileSync(resolve(KANSIO, nimi)).toString('base64');
  const webp = await sivu.evaluate(async ({ b64 }) => {
    const kuva = new Image();
    kuva.src = `data:image/jpeg;base64,${b64}`;
    await kuva.decode();
    const L = kuva.width;
    const K = kuva.height;
    const kanvaasi = document.createElement('canvas');
    kanvaasi.width = L;
    kanvaasi.height = K;
    const piirto = kanvaasi.getContext('2d', { willReadFrequently: true });
    piirto.drawImage(kuva, 0, 0);
    const kuvadata = piirto.getImageData(0, 0, L, K);
    const d = kuvadata.data;

    // Taustan sävy: reunakehän keskiarvo.
    let sr = 0; let sg = 0; let sb = 0; let n = 0;
    const lisaa = (x, y) => {
      const i = (y * L + x) * 4;
      sr += d[i]; sg += d[i + 1]; sb += d[i + 2]; n += 1;
    };
    for (let x = 0; x < L; x++) { lisaa(x, 0); lisaa(x, K - 1); }
    for (let y = 0; y < K; y++) { lisaa(0, y); lisaa(L - 1, y); }
    const tr = sr / n; const tg = sg / n; const tb = sb / n;
    const etaisyys = (i) => Math.hypot(d[i] - tr, d[i + 1] - tg, d[i + 2] - tb);

    /*
     * Tulva reunoilta: TOLERANSSI 34 kattaa paperin kohinan ja kevyen
     * vinjettitummuman, mutta pysähtyy musteviivaan ja maalattuun
     * varjoon (mitattu: viiva ja varjo ovat > 45 päässä taustasta).
     */
    const TOL = 34;
    const tausta = new Uint8Array(L * K);
    const jono = [];
    const tyonna = (x, y) => {
      const p = y * L + x;
      if (tausta[p]) return;
      if (etaisyys(p * 4) > TOL) return;
      tausta[p] = 1;
      jono.push(p);
    };
    for (let x = 0; x < L; x++) { tyonna(x, 0); tyonna(x, K - 1); }
    for (let y = 0; y < K; y++) { tyonna(0, y); tyonna(L - 1, y); }
    while (jono.length) {
      const p = jono.pop();
      const x = p % L;
      const y = (p / L) | 0;
      if (x > 0) tyonna(x - 1, y);
      if (x < L - 1) tyonna(x + 1, y);
      if (y > 0) tyonna(x, y - 1);
      if (y < K - 1) tyonna(x, y + 1);
    }

    // Alfa: tausta pois, rajapikselit (taustan naapurit) pehmeiksi.
    for (let p = 0; p < L * K; p++) {
      if (tausta[p]) { d[p * 4 + 3] = 0; continue; }
      const x = p % L;
      const y = (p / L) | 0;
      const rajalla = (x > 0 && tausta[p - 1]) || (x < L - 1 && tausta[p + 1])
        || (y > 0 && tausta[p - L]) || (y < K - 1 && tausta[p + L]);
      if (rajalla) d[p * 4 + 3] = 140;
    }
    piirto.putImageData(kuvadata, 0, 0);
    return kanvaasi.toDataURL('image/webp', 0.9).split(',')[1];
  }, { b64: data });
  const ulos = resolve(KANSIO, nimi.replace(/\.jpg$/, '.webp'));
  writeFileSync(ulos, Buffer.from(webp, 'base64'));
  console.log(`${nimi} → ${basename(ulos)} (${(Buffer.from(webp, 'base64').length / 1024).toFixed(0)} kt)`);
}
await selain.close();
console.log(`Valmis: ${tiedostot.length} kuvaa.`);
