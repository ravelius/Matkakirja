// Aikajanan kultaiset arvot verkkopelin koodista (js/aikajana.js, js/pallolauta/reitit.js).
// Käyttö: node Linssit-testit/kultaiset/tee-aikajana.mjs [pelin checkout]
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const A = await import(join(juuri, 'js/aikajana.js'));
const R = await import(join(juuri, 'js/pallolauta/reitit.js'));
const IM = await import(join(juuri, 'js/linssit/ihmisen-matka-data.js'));

const arvot = IM.IHMISEN_MATKA.map((t) => t.vuosiaSitten).sort((a, b) => b - a);
const asteikko = [];
for (let p = -5; p <= (arvot.length - 1) * 10 + 5; p += 1.7) {
  const l = A.vuosiaSittenLukema(p, arvot);
  asteikko.push({ p, l, paikka: A.vuosiaSittenPaikka(l, arvot), askel: A.kellonAskel(l, arvot), teksti: A.kellonVuositeksti(l) });
}
const nopeus = [0, 0.01, 0.1, 0.5, 1, 1.5, 3].map((e) => [e, A.aikajananNopeus(e)]);
// Kellon ajo: keksintöjen kaltaiset pysäkit, 16,7 ms kehykset.
const pysakit = [{ vuosi: 1769 }, { vuosi: 1771 }, { vuosi: 1780, paalu: true }, { vuosi: 1781, hiljainen: true }, { vuosi: 1790 }];
let tila = { vuosi: 1765, i: -1, viive: 0 };
const kello = [];
for (let n = 0; n < 4000; n += 1) {
  const r = A.aikajanaAskel(tila, 16.7, pysakit);
  tila = r.tila;
  if (n % 37 === 0 || r.syttyi !== null || r.loppu) kello.push({ n, vuosi: tila.vuosi, i: tila.i, viive: tila.viive, syttyi: r.syttyi, loppu: r.loppu });
  if (r.loppu) break;
}
const eta = A.aikaSeuraavaan({ vuosi: 1765, i: -1, viive: 0 }, pysakit);
const a = { lat: 31.855, lng: -8.8725 }, b = { lat: -33.75, lng: 143.0833 };
const hyppy = [0, 0.1, 0.25, 0.5, 0.8, 1].map((t) => {
  const e = A.aikajananKameranPehmennys(t);
  const p = R.isoympyranPiste(a, b, e);
  const matka = R.kulmaAsteina(a, b) * A.LAUTAYKSIKKOA_ASTEELLA;
  return { t, e, lat: p.lat, lon: p.lng, leveys: A.hypynLeveys(560, A.pysakinLahikuva(560, matka), e) };
});
const ulos = { arvot, asteikko, nopeus, kello, eta, kulma: R.kulmaAsteina(a, b), hyppy };
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), 'aikajana.json'), JSON.stringify(ulos));
console.log('aikajana.json:', asteikko.length, 'asteikkoa,', kello.length, 'kellorivia, eta', eta);
