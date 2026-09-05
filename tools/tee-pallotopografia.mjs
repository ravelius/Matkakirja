/*
 * Reliefikartta LAUDAN MILLERISTÄ PALLON TASAVÄLISEKSI
 *   assets/linssit/topografia.webp -> assets/linssit/topografia-pallo.webp
 *
 *   node tools/tee-pallotopografia.mjs [--leveys 4096] [--laatu 76] [--kuiva]
 *
 * MIKSI UUSI KUVA. Topografialinssin oma kuva (tools/tee-reliefikartta.mjs)
 * on projisoitu TARKALLEEN pelin laudan Milleriin: 3600 × 1620 pikseliä,
 * jotka peittävät laudan suorakulmion (0, 0)–(12000, 5399) eli
 * leveysasteet -58…76 ja pituusasteet lon0 = -175:stä ympäri. Se on
 * oikein tasokartalla ja väärin pallolla: Globe.gl (kuten jokainen
 * three.js-pallo) lukee pinnan tekstuurin TASAVÄLISENÄ (equirectangular,
 * 2:1) — x on suoraan pituusaste ja y suoraan leveysaste. Millerin kuva
 * pallolle venytettynä työntäisi mantereet pohjoiseen: Suomi osuisi
 * Grönlannin kohdalle eikä mikään kertoisi miksi.
 *
 * MITÄ TÄMÄ TEKEE. Uudelleenprojisoi kuvan pikseli kerrallaan: jokaiselle
 * TASAVÄLISEN kuvan pisteelle lasketaan (lat, lon), siitä laudan (x, y)
 * pelin omalla kaavalla (js/fokusmitat.js projisoiLaudalle — sama kaava
 * kuin js/pallolauta/lauta.js pallonAsteet käyttää toiseen suuntaan) ja
 * lopuksi lähtökuvan pikseli kaksisuuntaisella interpoloinnilla. Uutta
 * aineistoa ei haeta eikä korkeuksia lasketa uudelleen: tämä on
 * kuvamuunnos, jonka lähde on repossa.
 *
 * NAVAT JÄÄVÄT LÄPINÄKYVIKSI. Lauta ulottuu -58°:sta 76°:seen, joten
 * Etelämannerta ja pohjoisinta arktista aluetta EI ole lähtökuvassa
 * lainkaan. Ne jäävät alfaltaan nolliksi, jolloin pallon oma pinta
 * (laatat) näkyy niiden kohdalla läpi — rehellisempi lopputulos kuin
 * venytetty reunapikseli, joka teeskentelisi tietoa jota ei ole.
 *
 * KIERTO SAUMATTA. Kuva kiertää ympäri (lon0 = -175 molemmilla reunoilla),
 * joten vaakasuunnan interpolointi kääntyy reunan yli itseensä. Ilman
 * sitä saumaan jäisi yhden pikselin viiva keskelle Tyyntämerta.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { projisoiLaudalle } from '../js/fokusmitat.js';

const JUURI = new URL('../', import.meta.url);
const LAHDE = fileURLToPath(new URL('assets/linssit/topografia.webp', JUURI));
const KOHDE = fileURLToPath(new URL('assets/linssit/topografia-pallo.webp', JUURI));

/*
 * Laudan rajasuorakulmio: sama luku kuin js/packs/linssi-topografia-kuva.js
 * raja-kentässä. Kuva peittää laudan kokonaan, joten (x, y) → lähtökuvan
 * pikseli on pelkkä skaalaus.
 */
const LAUTA = { leveys: 12000, korkeus: 5399 };
const LAUTATUNNUS = 'maailmankartta';

/*
 * OLETUSLEVEYS 4096. Lähtökuva on 3600 pikseliä leveä kokonaiselle
 * kierrokselle, joten 4096 ei lisää tietoa — se lisää tilaa sille
 * vähälle, mitä uudelleenprojisointi pehmentää, ja osuu GPU:n
 * kahden potenssiin. Korkeus on aina puolet leveydestä (2:1).
 */
const OLETUSLEVEYS = 4096;
/*
 * WebP-laatu. Reliefikartta on pehmeäreunainen väripinta ilman tekstiä,
 * ja pallolla se katsotaan 0,72 peittävyydellä laattojen päältä: 76
 * riittää eikä kuva saa maksaa megatavua (sw.js esilataa sen).
 */
const OLETUSLAATU = 76;

function argumentti(nimi, oletus) {
  const i = process.argv.indexOf(`--${nimi}`);
  if (i < 0) return oletus;
  const arvo = Number(process.argv[i + 1]);
  return Number.isFinite(arvo) ? arvo : oletus;
}

const LEVEYS = Math.round(argumentti('leveys', OLETUSLEVEYS));
const KORKEUS = Math.round(LEVEYS / 2);
const LAATU = Math.round(argumentti('laatu', OLETUSLAATU));
const KUIVA = process.argv.includes('--kuiva');

/** Lähtökuva raakana RGB(A):na — sharp kertoo kanavien määrän. */
const lahde = sharp(readFileSync(LAHDE));
const meta = await lahde.metadata();
const { data: pikselit, info } = await lahde.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const sw = info.width;
const sh = info.height;
console.log(`lähde ${sw} × ${sh} (${meta.format}), ${info.channels} kanavaa`);

/*
 * SARAKE- JA RIVITAULUT ERIKSEEN. Millerissä x riippuu vain
 * pituusasteesta ja y vain leveysasteesta, joten koko muunnos on kaksi
 * yksiulotteista taulua — 4096 + 2048 kutsua projisoiLaudalle():en
 * kahdeksan miljoonan sijaan.
 */
const sarakkeet = new Float64Array(LEVEYS);
for (let i = 0; i < LEVEYS; i += 1) {
  const lon = -180 + ((i + 0.5) / LEVEYS) * 360;
  const p = projisoiLaudalle(LAUTATUNNUS, lon, 0);
  sarakkeet[i] = (p.x / LAUTA.leveys) * sw;
}
const rivit = new Float64Array(KORKEUS);
for (let j = 0; j < KORKEUS; j += 1) {
  const lat = 90 - ((j + 0.5) / KORKEUS) * 180;
  const p = projisoiLaudalle(LAUTATUNNUS, 0, lat);
  // Laudan ulkopuolella (navat) merkintä NaN: rivi jää läpinäkyväksi.
  rivit[j] = p && p.y >= 0 && p.y <= LAUTA.korkeus ? (p.y / LAUTA.korkeus) * sh : NaN;
}

/** Lähtökuvan pikseli (sx, sy) kaksisuuntaisesti, vaaka kiertäen. */
function nayte(sx, sy, ulos, kohta) {
  const x0 = Math.floor(sx - 0.5);
  const y0 = Math.min(sh - 2, Math.max(0, Math.floor(sy - 0.5)));
  const fx = sx - 0.5 - x0;
  const fy = Math.min(1, Math.max(0, sy - 0.5 - y0));
  const xa = ((x0 % sw) + sw) % sw;
  const xb = (xa + 1) % sw;
  const ya = y0;
  const yb = y0 + 1;
  for (let k = 0; k < 3; k += 1) {
    const p00 = pikselit[(ya * sw + xa) * 4 + k];
    const p10 = pikselit[(ya * sw + xb) * 4 + k];
    const p01 = pikselit[(yb * sw + xa) * 4 + k];
    const p11 = pikselit[(yb * sw + xb) * 4 + k];
    const ylin = p00 + (p10 - p00) * fx;
    const alin = p01 + (p11 - p01) * fx;
    ulos[kohta + k] = Math.round(ylin + (alin - ylin) * fy);
  }
  ulos[kohta + 3] = 255;
}

const ulos = Buffer.alloc(LEVEYS * KORKEUS * 4); // alfa 0 = navat läpi
for (let j = 0; j < KORKEUS; j += 1) {
  const sy = rivit[j];
  if (Number.isNaN(sy)) continue;
  for (let i = 0; i < LEVEYS; i += 1) {
    nayte(sarakkeet[i], sy, ulos, (j * LEVEYS + i) * 4);
  }
}

const webp = await sharp(ulos, { raw: { width: LEVEYS, height: KORKEUS, channels: 4 } })
  .webp({ quality: LAATU, effort: 6, alphaQuality: 100 })
  .toBuffer();
console.log(`tulos ${LEVEYS} × ${KORKEUS}, ${(webp.length / 1024).toFixed(0)} kt (laatu ${LAATU})`);
if (KUIVA) {
  console.log('--kuiva: tiedostoa ei kirjoitettu');
} else {
  writeFileSync(KOHDE, webp);
  console.log(`kirjoitettu ${KOHDE}`);
}
