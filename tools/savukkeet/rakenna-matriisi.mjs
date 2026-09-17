// RAKENNA MATRIISI — lukee tools/savukkeet/sarjat.json ja tulostaa
// GitHub Actionsin `strategy.matrix.include`-taulukon JSON:na stdouttiin.
//
//   node tools/savukkeet/rakenna-matriisi.mjs <sarja>
//
// <sarja> on joko:
//   - "julkaisu" — sarjat.json:n "julkaisu"-lista (julkaisuraporttien
//     savukkeet, ks. sarjat.json:n _kommentti)
//   - "kaikki"   — kaikki tools/savukkeet/savuke-*.mjs aakkosjärjestyksessä
//   - pilkuilla eroteltu tiedostonimilista (esim.
//     "savuke-nimikyltti.mjs,savuke-pallo-nostolaput"), .mjs-pääte
//     lisätään tarvittaessa
//
// Jokainen matriisin alkio: { tiedosto, nimiTunniste, env,
// kuvakansio, tunnetutPunaiset, tunnetutPunaisetMaara, salliEpaonnistua }.
// salliEpaonnistua on tosi, jos tiedostolle on annettu tunnetutPunaiset
// tai tunnetutPunaisetMaara (silloin job saa continue-on-error: true
// työnkulussa — ks. .github/workflows/savukkeet.yml).
//
// YKSI PAIKKA: sekä "julkaisu" että "kaikki" ja mukautettu lista
// lukevat SAMAN sarjat.json:n "asetukset"-osion, joten NAKYMAT/KOOT/
// VAIN_AVAUS ja tunnetut punaiset eivät ole kahdessa paikassa.

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TASSA = dirname(fileURLToPath(import.meta.url));
const sarjat = JSON.parse(readFileSync(join(TASSA, 'sarjat.json'), 'utf8'));

const sarja = process.argv[2];
if (!sarja) {
  console.error('Käyttö: node tools/savukkeet/rakenna-matriisi.mjs <julkaisu|kaikki|tiedosto1,tiedosto2,...>');
  process.exit(1);
}

function kaikkiSavukeTiedostot() {
  return readdirSync(TASSA)
    .filter((t) => /^savuke-.*\.mjs$/.test(t))
    .sort();
}

let tiedostot;
if (sarja === 'julkaisu') {
  tiedostot = sarjat.julkaisu;
} else if (sarja === 'kaikki') {
  tiedostot = kaikkiSavukeTiedostot();
} else {
  const olemassaolevat = new Set(kaikkiSavukeTiedostot());
  tiedostot = sarja.split(',').map((s) => s.trim()).filter(Boolean).map((nimi) => (
    nimi.endsWith('.mjs') ? nimi : `${nimi}.mjs`
  ));
  const puuttuvat = tiedostot.filter((t) => !olemassaolevat.has(t));
  if (puuttuvat.length) {
    console.error(`rakenna-matriisi: tiedostoa ei löydy tools/savukkeet/:sta: ${puuttuvat.join(', ')}`);
    process.exit(1);
  }
}

if (!tiedostot || !tiedostot.length) {
  console.error(`rakenna-matriisi: sarja "${sarja}" ei tuottanut yhtään savuketta`);
  process.exit(1);
}

const matriisi = tiedostot.map((tiedosto) => {
  const asetus = sarjat.asetukset?.[tiedosto] ?? {};
  const tunnetutPunaiset = asetus.tunnetutPunaiset ?? [];
  const tunnetutPunaisetMaara = asetus.tunnetutPunaisetMaara ?? null;
  return {
    tiedosto,
    nimiTunniste: tiedosto.replace(/\.mjs$/, ''),
    env: asetus.env ?? {},
    kuvakansio: Boolean(asetus.kuvakansio),
    tunnetutPunaiset,
    tunnetutPunaisetMaara,
    salliEpaonnistua: tunnetutPunaiset.length > 0 || tunnetutPunaisetMaara !== null,
  };
});

process.stdout.write(JSON.stringify(matriisi));
