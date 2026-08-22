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
 * tummempi. Rajapikselit saavat liukuvan alfan, ettei reuna ole
 * veitsellä leikattu.
 *
 * AKVARELLIT (22.8.2026): sama tulvatäyttö kelpaa myös
 * akvarelliminiatyyreille (tools/generoi-miniatyyrit.mjs --akvarelli).
 * V1025-pilotin kuvista mitattuna paperi on tasainen (kynnys 26…40
 * antaa saman tulva-alueen ±0,4 % pikseleistä) ja rakennuksen alla
 * oleva varjolaveeraus on 50–85 päässä paperista eli säilyy. Kaksi
 * asiaa täsmennettiin akvarellia varten: taustan sävy mitataan nyt
 * KULMIEN mediaanina (laveeraus voi yltää lähelle reunaa ja vetäisi
 * koko reunakehän keskiarvoa maalin suuntaan) ja sauma pehmennetään
 * liukuvasti kahdella kynnyksellä kiinteän puolialfan sijaan, jotta
 * haipuva laveeraus häviää paperiin eikä jätä terävää reunaa.
 *
 * Käyttö:  node tools/leikkaa-miniatyyrit.mjs [tiedosto.jpg …]
 *          Ilman argumentteja leikkaa kaikki assets/kartat/
 *          miniatyyrit/-kansion .jpg-kuvat.
 * Ulos:    samanniminen .webp (läpinäkyvä RGBA, pienempi kuin PNG).
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

    /*
     * Taustan sävy: NELJÄN KULMAN mediaani. Kulmiin ei tyylikäskyn
     * mukaan piirretä mitään, ja mediaani sietää yhdenkin sotkuisen
     * kulman; koko reunakehän keskiarvo taas vinoutuisi, jos akvarellin
     * laveeraus yltää reunaan asti. Seepiakuvilla mediaani ja vanha
     * keskiarvo osuvat yhteen (mitattu ero ≤ 1 sävyaskel).
     */
    const P = Math.max(8, Math.round(Math.min(L, K) * 0.06));
    const kulmat = [[0, 0], [L - P, 0], [0, K - P], [L - P, K - P]];
    const mediaani = (k) => {
      const arvot = [];
      for (const [x0, y0] of kulmat) {
        for (let y = y0; y < y0 + P; y++) {
          for (let x = x0; x < x0 + P; x++) arvot.push(d[(y * L + x) * 4 + k]);
        }
      }
      arvot.sort((a, b) => a - b);
      return arvot[arvot.length >> 1];
    };
    const tr = mediaani(0); const tg = mediaani(1); const tb = mediaani(2);
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

    /*
     * Alfa: tulva-alue pois, sauma liukuvasti pehmeäksi. Rajapikseli
     * (tulvan naapuri) saa alfan sen mukaan, kuinka kaukana se on
     * paperista: TOL (34) → läpinäkyvä, TAYSIN (55) → peittävä, väliltä
     * lineaarisesti. Näin akvarellivarjon haipuva reuna sulaa paperiin,
     * kun taas musteviivan reuna pysyy terävänä. (Ennen 22.8.2026
     * rajapikseli sai kiinteän alfan 140, mikä puolestaan haalensi
     * musteviivaa ja jätti haipuvan laveerauksen tasaisen näkyväksi.)
     * Pehmennys koskee VAIN rajapikseleitä — rakennuksen sisällä oleva
     * paperinvärinen ala pysyy peittävänä, kuten seepiakuvissa.
     */
    const TAYSIN = 55;
    for (let p = 0; p < L * K; p++) {
      if (tausta[p]) { d[p * 4 + 3] = 0; continue; }
      const x = p % L;
      const y = (p / L) | 0;
      const rajalla = (x > 0 && tausta[p - 1]) || (x < L - 1 && tausta[p + 1])
        || (y > 0 && tausta[p - L]) || (y < K - 1 && tausta[p + L]);
      if (!rajalla) continue;
      const osuus = (etaisyys(p * 4) - TOL) / (TAYSIN - TOL);
      d[p * 4 + 3] = Math.max(0, Math.min(255, Math.round(osuus * 255)));
    }

    /*
     * SÄVYTYS KARTAN POHJAAN (omistaja 18.8.2026: "piirustusten
     * värisävy aivan samaksi kuin karttasivun pohja"). Generoitu
     * paperi on kylmempi ja vaaleampi (~#fbf4dc) kuin värikartan
     * maapohja #f3e8ce, ja ero näkyy varsinkin suurennoksessa.
     * Valkotasapaino kanavittain: mitattu paperinsävy (tr/tg/tb)
     * kuvautuu täsmälleen pohjaväriin, ja tummat musteviivat
     * lämpenevät samassa suhteessa huomaamattomasti. Sama kuvaus on
     * tools/savyta-miniatyyrit.mjs:ssä jo leikatuille kuville.
     */
    const KOHDE = [243, 232, 206];
    const kerroin = [KOHDE[0] / (tr || 1), KOHDE[1] / (tg || 1), KOHDE[2] / (tb || 1)];
    for (let p = 0; p < L * K; p++) {
      if (!d[p * 4 + 3]) continue;
      for (let k = 0; k < 3; k++) {
        d[p * 4 + k] = Math.min(255, Math.round(d[p * 4 + k] * kerroin[k]));
      }
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
