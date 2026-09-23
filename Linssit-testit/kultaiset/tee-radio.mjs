// Maailmanradion kultaiset arvot (js/linssit/radio.js radionKaupungit, VIRITYKSEN_AJAT,
// RISTIHAIVYTYS; radiosoitin.js VIRITYKSEN_AIKAKATKAISU_MS; pistenaytto.js FONTTI ja
// merkinRivit; js/packs/radiot.js).
//
// 1. Kopioi paketti/-kansioon: radiot.json (moduuli RADIOT), viritysaanet.json ja
//    kaupungit-radio.json (id, nimi, maa, aloitus, lentokentta, lat, lon laudan järjestyksessä).
// 2. radionKaupungit ajetaan webin maailmankartalla (board.cities, map.cityCountry) ilman
//    sijaintia ja kolmella sijainnilla; näytön nimi webin säännöllä (naytonAsemannimi on
//    moduulin sisäinen, joten sen kolme riviä ovat tässä sanatarkasti) merkinRivit-funktiolla.
//
// Käyttö: node tee-radio.mjs [pelin checkout] [sisältöpaketti]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tama = dirname(fileURLToPath(import.meta.url));
const juuri = process.argv[2] ?? '/Users/Shared/Claude/wt/linssiseppa-webmain';
const paketti = process.argv[3] ?? '/Users/Shared/Claude/sisalto-koe/v16';
const R = await import(join(juuri, 'js/linssit/radio.js'));
const P = await import(join(juuri, 'js/linssit/pistenaytto.js'));
const S = await import(join(juuri, 'js/linssit/radiosoitin.js'));
const { RADIOT } = await import(join(juuri, 'js/packs/radiot.js'));
const { MAAILMANKARTTA } = await import(join(juuri, 'js/packs/maailmankartta.js'));

const lue = (p) => JSON.parse(readFileSync(join(paketti, p), 'utf8'));
const kirjoita = (nimi, olio) => writeFileSync(join(tama, 'paketti', nimi), JSON.stringify(olio));

kirjoita('radiot.json', lue('moduulit/js/packs/radiot.json'));
// Siirtosepän kokoelma (v16+): luokka, sivu, varaAani.
try { kirjoita('radiot-kokoelma.json', lue('kokoelmat/radiot.json')); } catch { /* vanhempi paketti */ }
kirjoita('viritysaanet.json', lue('moduulit/js/packs/viritysaanet.json'));
const kaupungit = lue('kokoelmat/kaupungit.json');
kirjoita('kaupungit-radio.json', {
  ...kaupungit,
  alkiot: kaupungit.alkiot.map((k) => ({
    id: k.id, nimi: k.nimi, maa: k.maa, aloitus: k.aloitus, lentokentta: k.lentokentta, lat: k.lat, lon: k.lon,
  })),
});

// Webin lauta: kaupungit laudan järjestyksessä (name, start, airport) ja cityCountry.
const map = MAAILMANKARTTA.map;
const lauta = MAAILMANKARTTA.board?.cities ?? MAAILMANKARTTA.cities ?? map.cities;
const sijainnit = [null, 'helsinki', 'marseille', 'novosibirsk'].filter((s) => s === null || lauta.some((k) => k.id === s));
const nakyvat = Object.fromEntries(sijainnit.map((s) => [s ?? '-',
  [...R.radionKaupungit(map, lauta, { sijainti: s })].sort()]));

const TYHJA = P.FONTTI[' '];
const piirtyy = (t) => { const m = [...String(t ?? '')]; return m.some((x) => x.trim()) && m.every((x) => x === ' ' || P.merkinRivit(x) !== TYHJA); };
const naytto = (asema, maa, iso) => {
  const lyhyt = String(asema ?? '').split(/[(,/|]/)[0].trim();
  if (piirtyy(lyhyt)) return lyhyt;
  if (piirtyy(maa)) return String(maa);
  return String(iso ?? '');
};
const maat = lue('kokoelmat/maat.json').alkiot;
const maanNimi = Object.fromEntries(maat.map((m) => [m.id, m.nimi]));

writeFileSync(join(tama, 'radio.json'), JSON.stringify({
  ajat: R.VIRITYKSEN_AJAT,
  ristihaivytys: R.RISTIHAIVYTYS.kesto,
  lukitus: R.RISTIHAIVYTYS.lukitus,
  aikakatkaisu: S.VIRITYKSEN_AIKAKATKAISU_MS,
  fontti: Object.keys(P.FONTTI).join(''),
  kaupunkeja: lauta.length,
  laudanJarjestysSama: lauta.map((k) => k.id).join(',') === kaupungit.alkiot.map((k) => k.id).join(','),
  nakyvat,
  naytto: Object.fromEntries(Object.entries(RADIOT).map(([iso, r]) => [iso, naytto(r.asema, maanNimi[iso], iso)])),
  kayriNaytto: { 'Radio Begum (Kabul)': naytto('Radio Begum (Kabul)', 'Afganistan', 'AFG'),
    'ΕΡΤ Πρώτο Πρόγραμμα': naytto('ΕΡΤ Πρώτο Πρόγραμμα', 'Kreikka', 'GRC') },
}, null, 1));
console.log(`radio: ${Object.keys(RADIOT).length} asemaa, ${lauta.length} kaupunkia, näkyvät ${nakyvat['-'].length}`);
