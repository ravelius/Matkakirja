#!/usr/bin/env node
// ELÄVIEN ELEMENTTIEN POLUT (Karttaseppä 26.9.2026, Fablen tilaus; Linssisepän selvitys
// docs/raportit/elavat-elementit-selvitys-20260926.md): gondolit Canal Grandella, siipiratashöyry
// Thamesilla, laiva Tonavalla Budapestissa, köysirata ja savannin kulkue. Sama rakenne kuin
// reitit1873 (tools/tee-reitit1873.mjs):
//
//   node tools/tee-elavat-polut.mjs
//     → tools/vienti/elavat-polut.json.gz  { lahteet: [...], polut: [...] }
//
// POLKU = ajosuuntainen viiva [[lon, lat(, m)], …]. Tukipisteet ovat siltojen, asemien ja
// maamerkkien koordinaatteja (julkisia tosiasioita) väylän keskellä; niiden väli täytetään
// Catmull–Rom-splinellä noin 25 m:n pistevälein, jotta liike on sulavaa ilman omaa
// splinelaskentaa. Köysiradan vaijeri on suora asemalta asemalle, ja pisteissä on korkeus
// metreinä (asemien julkaistut korkeudet). Savannin kulkue on sommittelu (ei eläinten
// todellinen reitti), ja se lukee lahde-kentässä.
import { writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
export const ULOS = join(TAMA, 'vienti', 'elavat-polut.json.gz');
const OMA_LISENSSI = 'CC0 1.0 (Karttasepän digitointi julkisista tosiasioista)';
export const PISTEVALI_M = 25;
const pyorista = (v) => Math.round(v * 1e5) / 1e5;

export const LAHTEET = [
  { id: 'maamerkit', nimi: 'Siltojen, asemien ja maamerkkien koordinaatit (Wikipedia/Wikidata), oma digitointi', url: 'https://www.wikidata.org/', lisenssi: OMA_LISENSSI },
  { id: 'worldcover', nimi: 'ESA WorldCover 10 m 2021 v200 (Canal Grandeen keskitys, tarkistus)', url: 'https://esa-worldcover.org/', lisenssi: 'CC BY 4.0 (© ESA WorldCover project 2021 / Contains modified Copernicus Sentinel data (2021) processed by ESA WorldCover consortium)' },
];

/* Tukipisteet [lat, lon] ajosuunnassa (luettavuuden vuoksi lat ensin; tulosteessa lon, lat). */
export const POLUT = [
  {
    id: 'vesi-canal-grande', laji: 'vesi', nimi: 'Canal Grande', kaupunki: 'ITA-venetsia',
    lisenssi: 'CC BY 4.0 (johdettu ESA WorldCover 2021 -aineistosta: © ESA WorldCover project 2021 / Contains modified Copernicus Sentinel data (2021) processed by ESA WorldCover consortium)',
    lahde: 'https://en.wikipedia.org/wiki/Grand_Canal_(Venice)',
    /*
     * Tukipisteet keskitetty ESA WorldCover 2021 -vesiluokalle (10 m, CC BY 4.0) kanavan
     * leveimpään kohtaan 120 m:n säteellä; tihennetystä viivasta 89 % on vesipikseleillä
     * (loput sillat ja kapeat kohdat, jotka WorldCover luokittaa rakennetuksi).
     */
    tuet: [
      [45.43942, 12.32067], // Ponte della Costituzione (Santa Lucia)
      [45.44125, 12.32317], // Ponte degli Scalzi
      [45.44233, 12.32625], // Cannaregion kanavan suu (San Geremia)
      [45.44233, 12.32842], // Fondaco dei Turchi
      [45.44175, 12.33100], // San Stae
      [45.44033, 12.33392], // Ca' d'Oro
      [45.43917, 12.33583], // Pescheria (Rialton tori)
      [45.43850, 12.33608], // Ponte di Rialto
      [45.43675, 12.33367], // Riva del Vin – Palazzo Grimani
      [45.43592, 12.33067], // Sant'Angelo
      [45.43400, 12.32717], // Ca' Foscari (volta de canal)
      [45.43317, 12.32742], // Palazzo Grassi
      [45.43158, 12.32925], // Ponte dell'Accademia
      [45.43117, 12.33167], // Palazzo Venier dei Leoni
      [45.43133, 12.33450], // Santa Maria della Salute
      [45.43150, 12.33683], // Punta della Dogana
    ],
  },
  {
    id: 'vesi-thames-lontoo', laji: 'vesi', nimi: 'Thames: Westminster – Tower Bridge', kaupunki: 'GBR-lontoo',
    lahde: 'https://en.wikipedia.org/wiki/List_of_crossings_of_the_River_Thames',
    tuet: [
      [51.5008, -0.1218], // Westminster Bridge
      [51.5036, -0.1206],
      [51.5064, -0.1197], // Hungerford / Golden Jubilee
      [51.5087, -0.1168], // Waterloo Bridge
      [51.5101, -0.1112], // Temple
      [51.5098, -0.1043], // Blackfriars Bridge
      [51.5096, -0.0985], // Millennium Bridge
      [51.5085, -0.0945], // Southwark Bridge
      [51.5079, -0.0877], // London Bridge
      [51.5071, -0.0810],
      [51.5055, -0.0754], // Tower Bridge
    ],
  },
  {
    id: 'vesi-tonava-budapest', laji: 'vesi', nimi: 'Tonava: Margitin silta – Petőfin silta', kaupunki: 'HUN-budapest',
    lahde: 'https://en.wikipedia.org/wiki/List_of_crossings_of_the_Danube',
    tuet: [
      [47.5145, 19.0462], // Margitin silta
      [47.5070, 19.0437], // Parlamentti
      [47.4991, 19.0438], // Ketjusilta
      [47.4908, 19.0503], // Elisabetin silta
      [47.4858, 19.0573], // Vapaudensilta
      [47.4783, 19.0662], // Petőfin silta
    ],
  },
  {
    id: 'koysirata-aiguille-du-midi', laji: 'koysirata', nimi: 'Téléphérique de l’Aiguille du Midi', kaupunki: 'FRA-chamonix',
    lahde: 'https://en.wikipedia.org/wiki/Aiguille_du_Midi#Cable_car',
    suora: true,
    tuet: [
      [45.9189, 6.8703, 1035], // Chamonix, ala-asema
      [45.8933, 6.8856, 2317], // Plan de l'Aiguille (vaihtoasema)
      [45.8786, 6.8873, 3777], // Aiguille du Midi
    ],
    pysakit: [0, 1, 2], // tukipisteinä; tulosteessa viivan indekseinä
  },
  {
    id: 'kulkue-amboseli', laji: 'kulkue', nimi: 'Norsujen kulkue Amboselissa (Kilimandžaron juurella)', kaupunki: 'KEN-amboseli',
    lahde: 'Karttasepän sommittelu Amboselin tasangolle (https://en.wikipedia.org/wiki/Amboseli_National_Park), ei eläinten todellinen reitti',
    tuet: [
      [-2.620, 37.180],
      [-2.645, 37.215],
      [-2.662, 37.250], // Enkongo Narokin suo
      [-2.690, 37.280],
      [-2.722, 37.305],
      [-2.750, 37.335],
    ],
  },
];

/* ------------------------------------------------------------ geometria */

const R = 6371008.8;
export function etaisyysM([lon1, lat1], [lon2, lat2]) {
  const r = Math.PI / 180; const dl = (lat2 - lat1) * r; const dn = (lon2 - lon1) * r;
  const h = Math.sin(dl / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(dn / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/* Centripetaalinen Catmull–Rom (alfa 0,5): ei silmukoita eikä ylilyöntejä tiheissä mutkissa. */
function catmullRom(p0, p1, p2, p3, t) {
  const tj = (a, b, ti) => ti + Math.max(Math.hypot(b[0] - a[0], b[1] - a[1]) ** 0.5, 1e-9);
  const t0 = 0; const t1 = tj(p0, p1, t0); const t2 = tj(p1, p2, t1); const t3 = tj(p2, p3, t2);
  const u = t1 + (t2 - t1) * t;
  const lerp = (a, b, ta, tb) => a.map((v, i) => ((tb - u) * v + (u - ta) * b[i]) / (tb - ta));
  const a1 = lerp(p0, p1, t0, t1); const a2 = lerp(p1, p2, t1, t2); const a3 = lerp(p2, p3, t2, t3);
  const b1 = lerp(a1, a2, t0, t2); const b2 = lerp(a2, a3, t1, t3);
  return lerp(b1, b2, t1, t2);
}

/* Päätepisteen haamu: tukipiste peilattuna naapurinsa yli (ei nollapituista väliä). */
const peilaa = (a, b) => a.map((v, j) => 2 * v - b[j]);

export function tihenna(tuet, { suora = false, vali = PISTEVALI_M } = {}) {
  const p = tuet.map(([lat, lon, m]) => (m === undefined ? [lon, lat] : [lon, lat, m]));
  const ulos = [p[0]];
  for (let i = 0; i < p.length - 1; i += 1) {
    const n = Math.max(1, Math.round(etaisyysM(p[i], p[i + 1]) / vali));
    for (let k = 1; k <= n; k += 1) {
      const t = k / n;
      ulos.push(suora
        ? p[i].map((v, j) => v + (p[i + 1][j] - v) * t)
        : catmullRom(p[i - 1] ?? peilaa(p[i], p[i + 1]), p[i], p[i + 1], p[i + 2] ?? peilaa(p[i + 1], p[i]), t));
    }
  }
  return ulos.map((q) => q.map((v, j) => (j < 2 ? pyorista(v) : Math.round(v))));
}

export function teePolut() {
  return POLUT.map(({ tuet, suora, lisenssi, pysakit, ...muut }) => {
    const viiva = tihenna(tuet, { suora });
    /* Pysäkit (asemat) VIIVAN indekseinä: lähin tihennetty piste kutakin tukipistettä. */
    const lahin = ([lat, lon]) => viiva.reduce((b, q, i) => (etaisyysM(q, [lon, lat]) < etaisyysM(viiva[b], [lon, lat]) ? i : b), 0);
    return {
      ...muut, viivat: [viiva], ...(pysakit ? { pysakit: pysakit.map((i) => lahin(tuet[i])) } : {}),
      lisenssi: lisenssi ?? OMA_LISENSSI,
    };
  });
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const polut = teePolut();
  writeFileSync(ULOS, gzipSync(JSON.stringify({ lahteet: LAHTEET, polut }), { level: 9 }));
  for (const p of polut) {
    const v = p.viivat[0]; let m = 0; for (let i = 1; i < v.length; i += 1) m += etaisyysM(v[i - 1], v[i]);
    console.log(`${p.id}: ${v.length} pistettä, ${(m / 1000).toFixed(2)} km`);
  }
  console.log(`→ ${ULOS}`);
}
