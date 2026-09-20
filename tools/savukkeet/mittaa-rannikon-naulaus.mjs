/*
 * MITTARI: RANNIKON NAULAUS — onko oman maan korostus samaa geometriaa
 * kuin rantaviiva? (Fablen päätös 20.9.2026, vaihtoehto 2; taustamittaus
 * docs/raportit/viesti-fable-maalehti-viivat-20260920.md luku A.)
 *
 * Omistaja näki Ranskan rannikolla KAKSOISVIIVAN: rantaviiva tulee
 * `ne_10m_ocean`ista ja oman maan korostuskehä `ne_10m_admin_0`:sta,
 * ja aineistot ovat eri mieltä rannan kulusta. Naulaus
 * (js/pallovektorit.js `naulaaKorostus`) pudottaa korostuksen rannalla
 * kulkevat janat ja piirtää tilalle rannikkoaineiston omat janat.
 *
 * Tämä mittari ajaa saman puhtaan funktion OIKEALLA aineistolla ilman
 * selainta: maan renkaat assets/data/maapolygonit.json:sta ja
 * rannikkosolut ämpäristä (CLAUDE.md: NODE_USE_ENV_PROXY=1). Selaimessa
 * naulaus käyttää vain ladattuja soluja, joten tämä on ylärajamittaus —
 * se kertoo, mitä naulaus tekee, kun koko maan rannikko on muistissa.
 *
 * VARTIOT (poistumiskoodi 1, jos yksikin kaatuu):
 *   1. Naulauksen jälkeen YKSIKÄÄN korostusjana ei kulje rannikkoviivan
 *      tuntumassa omalla geometriallaan (= kaksoisviivaa ei ole).
 *   2. Viivaa ei katoa: piirretty kokonaispituus ei lyhene.
 *   3. Sisämaan rajat säilyvät (janoja jää yli).
 *
 * Aja: NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-rannikon-naulaus.mjs [--iso=FRA]
 */
import { readFileSync } from 'node:fs';

import {
  NAULAUKSEN_TOLERANSSI_ASTETTA, PALLOVEKTORIT_JUURI,
  naulaaKorostus, puraDelta, rannikkoHakemisto,
} from '../../js/pallovektorit.js';
import { maanRenkaatAsteina } from '../../js/maanaariviivat.js';
import { PALLO_LAUTA } from '../../js/pallo.js';
import { laudaltaAsteiksi } from '../../js/fokusmitat.js';

const JUURI = new URL('../..', import.meta.url).pathname;
const arg = (n, d) => (process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=')[1] ?? d);
const ISO = arg('iso', 'FRA');
const ASTE_M = 111320;
/** Sama tuntuma kuin naulauksessa, metreinä (≈ 1,7 km). */
const TUNTUMA_M = NAULAUKSEN_TOLERANSSI_ASTETTA * ASTE_M;

let virheita = 0;
const tieto = (rivi) => console.log(`  tieto  ${rivi}`);
const vaadi = (ehto, rivi) => {
  console.log(`  ${ehto ? 'vaadi ' : 'VIRHE '} ${rivi}`);
  if (!ehto) virheita += 1;
};

/* ── aineisto ──────────────────────────────────────────────────────── */
const asteet = ({ x, y }) => laudaltaAsteiksi(PALLO_LAUTA, x, y);
const polygonit = JSON.parse(readFileSync(`${JUURI}assets/data/maapolygonit.json`, 'utf8'));
const renkaat = maanRenkaatAsteina(polygonit, ISO, asteet);
if (!renkaat.length) { console.error(`${ISO} ei ole aineistossa`); process.exit(2); }
const laatikko = renkaat.flat().reduce((a, p) => [
  Math.min(a[0], p[0]), Math.min(a[1], p[1]), Math.max(a[2], p[0]), Math.max(a[3], p[1]),
], [180, 90, -180, -90]);

const luettelo = await (await fetch(`${PALLOVEKTORIT_JUURI}luettelo.json`)).json();
const taso = luettelo.lajit.rannikko.tasot.at(-1);
const solu = taso.solu;
// Solun avain on `x_y`: x kasvaa itään −180°:sta, y ETELÄÄN 90°:sta.
const avaimet = Object.keys(taso.tiedostot).filter((a) => {
  const [x, y] = a.split('_').map(Number);
  const lon0 = -180 + x * solu;
  const lat0 = 90 - (y + 1) * solu;
  return lon0 <= laatikko[2] && lon0 + solu >= laatikko[0]
    && lat0 <= laatikko[3] && lat0 + solu >= laatikko[1];
});
const rannikot = [];
for (const a of avaimet) {
  const v = await fetch(`${PALLOVEKTORIT_JUURI}rannikko/l${taso.k}/${a}.bin`);
  if (!v.ok) continue;
  for (const viiva of puraDelta(await v.arrayBuffer())) rannikot.push(viiva);
}

/* ── mitat ─────────────────────────────────────────────────────────── */
const hila = rannikkoHakemisto(rannikot);
const lahinM = (p) => {
  const ruutu = 0.05;
  const gx = Math.round(p[0] / ruutu); const gy = Math.round(p[1] / ruutu);
  const kerroin = Math.cos(p[1] * Math.PI / 180);
  let paras = Infinity;
  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dy = -1; dy <= 1; dy += 1) {
      for (const q of hila.get(`${gx + dx}|${gy + dy}`) ?? []) {
        const d = Math.hypot((p[0] - q[0]) * kerroin, p[1] - q[1]);
        if (d < paras) paras = d;
      }
    }
  }
  return paras * ASTE_M;
};
const janat = (viivat) => {
  const ulos = [];
  for (const v of viivat) for (let k = 1; k < v.length; k += 1) ulos.push([v[k - 1], v[k]]);
  return ulos;
};
const avain = ([a, b]) => `${a[0]},${a[1]}|${b[0]},${b[1]}`;
const rannikkoJanat = new Set();
for (const [a, b] of janat(rannikot)) { rannikkoJanat.add(avain([a, b])); rannikkoJanat.add(avain([b, a])); }
/** Janat, jotka kulkevat rannan päällä MUTTA eivät ole rannikkoaineistoa. */
const kaksois = (viivat) => janat(viivat).filter(([a, b]) => lahinM(a) <= TUNTUMA_M
  && lahinM(b) <= TUNTUMA_M && !rannikkoJanat.has(avain([a, b])));
const pituusKm = (viivat) => janat(viivat).reduce((a, [x, y]) => a
  + Math.hypot((x[0] - y[0]) * Math.cos((x[1] + y[1]) / 2 * Math.PI / 180), x[1] - y[1]) * 111.32, 0);

const naulaus = naulaaKorostus(renkaat, rannikot);
const ennen = kaksois(renkaat);
const jalkeen = kaksois(naulaus.viivat);
const erot = renkaat.flat().map(lahinM).filter((d) => d <= 5000).sort((a, b) => a - b);
const pros = (q) => Math.round(erot[Math.floor((erot.length - 1) * q)] ?? 0);

console.log(`RANNIKON NAULAUS — ${ISO}`);
tieto(`renkaita ${renkaat.length}, rannikkosoluja ${avaimet.length} (taso l${taso.k}), rannikkoviivoja ${rannikot.length}`);
tieto(`korostuskärkien ero rannikosta: mediaani ${pros(0.5)} m, p95 ${pros(0.95)} m, suurin ${Math.round(erot.at(-1) ?? 0)} m (n=${erot.length})`);
tieto(`naulaus: pudotettuja ${naulaus.pudotettuja}, sisämaajanoja ${naulaus.sisamaajanoja}, rannikkojanoja ${naulaus.rannikkojanoja}`);
vaadi(jalkeen.length === 0, `kaksoisviivan janat: ennen ${ennen.length} → jälkeen ${jalkeen.length}`);
vaadi(pituusKm(naulaus.viivat) >= pituusKm(renkaat) * 0.99,
  `piirretty pituus ${Math.round(pituusKm(renkaat))} km → ${Math.round(pituusKm(naulaus.viivat))} km`);
vaadi(naulaus.sisamaajanoja > 0, `sisämaan rajat säilyivät (${naulaus.sisamaajanoja} janaa)`);
console.log(virheita ? `X ${virheita} vartiota kaatui` : 'Y kaikki vartiot kunnossa');
process.exit(virheita ? 1 : 0);
