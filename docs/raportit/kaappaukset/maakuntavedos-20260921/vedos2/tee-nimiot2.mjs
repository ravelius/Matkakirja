import { readFileSync, writeFileSync } from 'node:fs';
const S = process.argv[2];
const tuotanto = JSON.parse(readFileSync('docs/raportit/kaappaukset/poltto-koe-20260920/nimiot-poltto-2.json')).filter((n) => !n.aika || n.aika === 'pysyva' || ['kuva', 'kompassi', 'laiva'].includes(n.luokka));
const ny = JSON.parse(readFileSync(`${S}/ne/nykyalueet-fra-deu.json`));
const norm = (t) => t.toUpperCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const olemassa = new Set(tuotanto.filter((n) => n.luokka === 'maakunta').map((n) => norm(n.teksti)));
const pienet = new Set(['Berliini', 'Hampuri', 'Bremen', 'Saarland']);
// Käsin säädetyt sijainnit törmääville nimille (kaupungit, nostot, joet).
const kasin = {
  'Hauts-de-France': [2.95, 50.25], 'Grand Est': [4.9, 48.95], 'Centre-Val de Loire': [1.9, 47.15],
  'Nouvelle-Aquitaine': [0.6, 44.6], 'Occitanie': [1.6, 43.4], 'Bourgogne-Franche-Comté': [5.35, 47.4],
  'Auvergne-Rhône-Alpes': [4.2, 44.9], "Provence-Alpes-Côte d'Azur": [6.25, 44.35], 'Pays de la Loire': [-0.9, 47.75],
  'Saksi-Anhalt': [12.05, 52.15], 'Saksi': [12.85, 51.25], 'Thüringen': [10.75, 50.75],
  'Mecklenburg-Etu-Pommeri': [12.4, 53.85], 'Ala-Saksi': [9.4, 52.95], 'Nordrhein-Westfalen': [7.7, 51.65],
  'Rheinland-Pfalz': [7.3, 50.05], 'Baden-Württemberg': [9.1, 48.35], 'Berliini': [13.55, 52.62], 'Saarland': [6.95, 49.3],
};
const kaikkiNimet = []; const ohitetut = [];
for (const a of ny.alueet) {
  if (olemassa.has(norm(a.nimiFi))) { ohitetut.push(a.nimiFi); continue; }
  const [lon, lat] = kasin[a.nimiFi] ?? [a.lon, a.lat];
  kaikkiNimet.push({ teksti: a.nimiFi, luokka: 'nykyalue', lon, lat, iso: a.iso, koko: pienet.has(a.nimiFi) ? 'pieni' : 'suuri', aika: 'pysyva' });
}
for (const muste of ['ruoste', 'sepia']) {
  const nimet = kaikkiNimet.map((n) => ({ ...n, muste }));
  const rajat = [{ luokka: 'raja', iso: 'FRA+DEU', muste, viivat: ny.rajat }];
  writeFileSync(`${S}/ne/nimiot-${muste}.json`, JSON.stringify([...tuotanto, ...nimet, ...rajat]));
}
console.log('nykyalueita', kaikkiNimet.length, 'ohitettu (sama nimi kulttuurinimenä):', ohitetut.join(', '));
