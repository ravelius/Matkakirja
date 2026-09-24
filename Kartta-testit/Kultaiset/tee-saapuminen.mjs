// SAAPUMISNÄKYMÄN KULTAISET ARVOT WEBIN OMALLA KOODILLA (Natiiviseppä 24.9.2026, WEB ON MALLI, MITATTUNA).
//
// Ajaa webin saapumisketjun sellaisenaan Nodessa: js/maanaariviivat.js maanLautalaatikko (maapolygonit.json)
// → js/pallolauta/maapaneeli.js saapumisenValjennys → js/pallolauta/kamera.js luoPallokamera().kotiin
// ({ kesto: 0, bbox }), ja kirjaa pallon pointOfView-kutsun (lat, lng, altitude). Sama kaupunkinäkymälle
// (bbox null). Natiivin Kartta/Saapumisnakyma.cs:n testit (Kartta-testit/Testit) vertaavat näihin.
//
// Käyttö: node tee-saapuminen.mjs <webin juuri> [ulos.json]
//   webin juuri = kansio, jossa js/ ja assets/data/maapolygonit.json (esim. git archive origin/main js assets/data).
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const juuri = resolve(process.argv[2] ?? '.');
const ulos = process.argv[3] ?? new URL('./saapuminen.json', import.meta.url).pathname;
const tuo = (p) => import(pathToFileURL(resolve(juuri, p)).href);

const { MAAILMANKARTTA } = await tuo('js/packs/maailmankartta.js');
const { maanLautalaatikko } = await tuo('js/maanaariviivat.js');
const { saapumisenValjennys } = await tuo('js/pallolauta/maapaneeli.js');
const { luoPallokamera } = await tuo('js/pallolauta/kamera.js');
const { laudaltaAsteiksi } = await tuo('js/fokusmitat.js');
const data = JSON.parse(readFileSync(resolve(juuri, 'assets/data/maapolygonit.json'), 'utf8'));

// Ruudut pisteinä (web: kotelo css-pikseleinä) ja pistekerroin (dpr).
export const RUUDUT = [
  { nimi: 'ipad-vaaka', w: 1210, h: 834, dpr: 2 },
  { nimi: 'ipad-pysty', w: 834, h: 1210, dpr: 2 },
  { nimi: 'iphone-pysty', w: 390, h: 844, dpr: 3 },
];
export const KAUPUNGIT = ['ateena', 'pariisi', 'madrid', 'lontoo', 'oslo', 'tokio', 'newyork',
  'rooma', 'helsinki', 'berliini', 'valparaiso', 'jakarta', 'bryssel', 'amsterdam', 'kobenhavn', 'lissabon',
  'moskova', 'sydney'];

const kaupungit = new Map(MAAILMANKARTTA.cities.map((c) => [c.id, c]));
const board = { cityById: kaupungit, edgeById: new Map() };
const pyorista = (v, n = 1e9) => Math.round(v * n) / n;

const tapaukset = [];
for (const id of KAUPUNGIT) {
  const c = kaupungit.get(id);
  const iso = MAAILMANKARTTA.map.cityCountry[id];
  const a = laudaltaAsteiksi('maailmankartta', c.x, c.y);
  const raaka = maanLautalaatikko(data, iso, { kohta: { x: c.x, y: c.y } });
  const laatikko = saapumisenValjennys(raaka);
  for (const r of RUUDUT) {
    let pov = { lat: 0, lng: 0, altitude: 1 };
    const pallo = { pointOfView: (p) => { if (p) pov = { ...p }; return pov; } };
    const kotelo = { clientWidth: r.w, clientHeight: r.h, addEventListener() {} };
    const ui = { game: { board, player: { pos: { type: 'city', city: id } } } };
    const kamera = luoPallokamera({ pallo, kotelo, ui, dpr: r.dpr });
    await kamera.kotiin({ kesto: 0, bbox: laatikko });
    const maa = { lat: pov.lat, lng: pov.lng, altitude: pov.altitude };
    await kamera.kotiin({ kesto: 0, bbox: null });
    const kaupunki = { lat: pov.lat, lng: pov.lng, altitude: pov.altitude };
    tapaukset.push({
      maa: iso, kaupunki: id, lat: pyorista(a.lat), lon: pyorista(a.lon),
      ruutu: r.nimi, w: r.w, h: r.h, dpr: r.dpr,
      mahtuu: kamera.laatikkoMahtuu(laatikko),
      laatikko: laatikko && { x: pyorista(laatikko.x), y: pyorista(laatikko.y), w: pyorista(laatikko.w), h: pyorista(laatikko.h) },
      web: { lat: pyorista(maa.lat), lng: pyorista(maa.lng), altitude: pyorista(maa.altitude) },
      kaupunkinakyma: { lat: pyorista(kaupunki.lat), lng: pyorista(kaupunki.lng), altitude: pyorista(kaupunki.altitude) },
    });
  }
}
writeFileSync(ulos, JSON.stringify({ lahde: process.env.WEB_SHA ?? 'web', tapaukset }, null, 1) + '\n');
console.log(`${tapaukset.length} tapausta → ${ulos}`);
