// Vertailu- ja maatietolinssin kultaiset arvot (js/vertailu.js VERTAILU_MAX,
// VERTAILUN_SAVYT, MAATIETOJEN_SAVYT, js/maakayrat.js VERTAILUVARIT ja niiden
// css-värit, laudan nimiehto leveys >= 60 ja rakennaVertailuTunnusluvut-rivit).
//
// 1. Kopioi sisältöpaketista testien pakettitiedostot paketti/-kansioon:
//    maarajat.json sellaisenaan (osumatesti tarvitsee koko geometrian),
//    maat.json karsittuna (vain kentät, joita MaatAineisto lukee), kaupungit
//    karsittuna (id, maa, lat, lon: osumatestin tarkistuspisteet) sekä
//    vertailu.json ja maatiedot.json (LINSSI).
// 2. Kirjoittaa maat.json: vakiot, sävyt, värit, nimimaat ja tunnusluvut.
//
// Käyttö: node tee-maat.mjs [pelin checkout] [sisältöpaketti]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tama = dirname(fileURLToPath(import.meta.url));
const juuri = process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa';
const paketti = process.argv[3] ?? '/Users/Shared/Claude/sisalto-koe/v10';
const V = await import(join(juuri, 'js/vertailu.js'));
const { VERTAILUVARIT } = await import(join(juuri, 'js/maakayrat.js'));
const { MAAILMANKARTTA } = await import(join(juuri, 'js/packs/maailmankartta.js'));

const lueTeksti = (p) => readFileSync(join(paketti, p), 'utf8');
const lue = (p) => JSON.parse(lueTeksti(p));
const kirjoita = (nimi, olio) => writeFileSync(join(tama, 'paketti', nimi), JSON.stringify(olio));

// ── 1. Pakettitiedostot ─────────────────────────────────────────────────
writeFileSync(join(tama, 'paketti', 'maarajat.json'), lueTeksti('kokoelmat/maarajat.json'));
const maat = lue('kokoelmat/maat.json');
kirjoita('maat.json', {
  ...maat,
  alkiot: maat.alkiot.map((m) => ({
    id: m.id, iso2: m.iso2, nimi: m.nimi, lippu: m.lippu, lippuUrl: m.lippuUrl, maalehti: m.maalehti,
    tiedot: m.tiedot && {
      vakiluku: m.tiedot.vakiluku, pintaAla: m.tiedot.pintaAla,
      keskitulo: m.tiedot.keskitulo && { arvo: m.tiedot.keskitulo.arvo },
      demokratia: m.tiedot.demokratia && { arvo: m.tiedot.demokratia.arvo },
    },
  })),
});
const kaupungit = lue('kokoelmat/kaupungit.json');
kirjoita('kaupungit-maat.json', {
  ...kaupungit,
  alkiot: kaupungit.alkiot.map((k) => ({ id: k.id, maa: k.maa, lat: k.lat, lon: k.lon, saari: k.saari })),
});
for (const n of ['vertailu', 'maatiedot']) kirjoita(`${n}.json`, lue(`moduulit/js/linssit/${n}.json`));

// ── 2. Kultaiset ───────────────────────────────────────────────────────
// Vertailuvärien css (css/styles.css .maakayra-*: stroke). Laatta käyttää samaa väriä.
const css = readFileSync(join(juuri, 'css/styles.css'), 'utf8');
const variCss = (luokka) => {
  const m = css.match(new RegExp(`\\.${luokka}\\s*\\{[^}]*stroke:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error('väri puuttuu: ' + luokka);
  return m[1].toLowerCase();
};

const muodot = MAAILMANKARTTA.map.countryShapes;
const nimimaat = Object.entries(muodot).filter(([, m]) => (m.leveys ?? 0) >= 60).map(([iso]) => iso).sort();

// rakennaVertailuTunnusluvut: rivit järjestyksessä, tyhjät pois.
const tunnusluvut = {};
for (const m of maat.alkiot) {
  const t = m.tiedot;
  if (!t) continue;
  tunnusluvut[m.id] = [
    ['Väkiluku', t.vakiluku], ['Pinta-ala', t.pintaAla],
    ['Tulot', t.keskitulo?.arvo], ['V-Dem', t.demokratia?.arvo],
  ].filter(([, arvo]) => arvo);
}

writeFileSync(join(tama, 'maat.json'), JSON.stringify({
  vertailuMax: V.VERTAILU_MAX,
  vertailunSavyt: V.VERTAILUN_SAVYT,
  maatietojenSavyt: V.MAATIETOJEN_SAVYT,
  vertailuvarit: VERTAILUVARIT.map(variCss),
  nimimaat,
  laudanMaat: Object.keys(muodot).sort(),
  tunnusluvut,
}, null, 1));
console.log(`maat: ${maat.alkiot.length}, nimimaat ${nimimaat.length}, tunnusluvut ${Object.keys(tunnusluvut).length}`);
