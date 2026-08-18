/*
 * Miniatyyrien sävytys värikartan pohjaan (omistajan tilaus 18.8.2026:
 * "piirustusten värisävy aivan samaksi kuin karttasivun pohja. Nyt ne
 * näyttäisivät olevan vähän eri väriä").
 *
 * Generoitujen piirrosten paperi on kylmempi ja vaaleampi (~#fbf4dc)
 * kuin värikarttojen maapohja #f3e8ce (mitattu: sama pohjaväri
 * kaikissa kaupungeissa). Tämä työkalu valkotasapainottaa JO LEIKATUT
 * .webp-kuvat: kunkin kuvan oma paperinsävy mitataan sen vaaleista
 * peittävistä pikseleistä ja kuvataan kanavittain täsmälleen
 * pohjaväriin — musteviivat lämpenevät samassa suhteessa, mitä silmä
 * ei erota, ja läpinäkyvyys säilyy.
 *
 * UUDET kuvat saavat saman sävytyksen suoraan leikkurista
 * (tools/leikkaa-miniatyyrit.mjs), joten tätä tarvitaan vain kerran
 * vanhalle kannalle — ja uusintana, jos pohjaväri joskus vaihtuu.
 *
 * Käyttö:  node tools/savyta-miniatyyrit.mjs [tiedosto.webp …]
 *          Ilman argumentteja sävyttää kaikki assets/kartat/
 *          miniatyyrit/-kansion .webp-kuvat paikalleen.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const KANSIO = resolve(JUURI, 'assets/kartat/miniatyyrit');

/** Värikartan maapohja (sama kaikissa kaupungeissa, mitattu 18.8.2026). */
const KOHDE = [243, 232, 206];

const pyydetyt = process.argv.slice(2);
const tiedostot = (pyydetyt.length ? pyydetyt : readdirSync(KANSIO).filter((n) => n.endsWith('.webp')))
  .map((n) => basename(n));
if (!tiedostot.length) {
  console.error('Ei sävytettäviä .webp-kuvia.');
  process.exit(1);
}

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const sivu = await selain.newPage();

for (const nimi of tiedostot) {
  const data = readFileSync(resolve(KANSIO, nimi)).toString('base64');
  const tulos = await sivu.evaluate(async ({ b64, kohde }) => {
    const kuva = new Image();
    kuva.src = `data:image/webp;base64,${b64}`;
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

    /*
     * Paperinsävy: vaaleiden, peittävien ja lähes harmaiden pikselien
     * keskiarvo. Raja min(r,g,b) > 185 ja sävyero < 60 kattaa paperin
     * kohinan mutta ei maalattuja pintoja; jos kuvassa ei ole paperia
     * lainkaan (harvinaista), kuva jätetään ennalleen.
     */
    let sr = 0; let sg = 0; let sb = 0; let n = 0;
    for (let p = 0; p < L * K; p++) {
      const i = p * 4;
      if (d[i + 3] < 250) continue;
      const lo = Math.min(d[i], d[i + 1], d[i + 2]);
      const hi = Math.max(d[i], d[i + 1], d[i + 2]);
      if (lo > 185 && hi - lo < 60) { sr += d[i]; sg += d[i + 1]; sb += d[i + 2]; n += 1; }
    }
    if (n < 100) return { ohitettu: true };
    const kerroin = [kohde[0] / (sr / n), kohde[1] / (sg / n), kohde[2] / (sb / n)];
    for (let p = 0; p < L * K; p++) {
      if (!d[p * 4 + 3]) continue;
      for (let k = 0; k < 3; k++) {
        d[p * 4 + k] = Math.min(255, Math.round(d[p * 4 + k] * kerroin[k]));
      }
    }
    piirto.putImageData(kuvadata, 0, 0);
    return {
      b64: kanvaasi.toDataURL('image/webp', 0.9).split(',')[1],
      paperi: [Math.round(sr / n), Math.round(sg / n), Math.round(sb / n)],
    };
  }, { b64: data, kohde: KOHDE });
  if (tulos.ohitettu) {
    console.log(`${nimi}: ei mitattavaa paperia — ohitettu`);
    continue;
  }
  writeFileSync(resolve(KANSIO, nimi), Buffer.from(tulos.b64, 'base64'));
  console.log(`${nimi}: paperi rgb(${tulos.paperi.join(',')}) → rgb(${KOHDE.join(',')})`);
}
await selain.close();
console.log(`Valmis: ${tiedostot.length} kuvaa.`);
