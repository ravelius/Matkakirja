// VERTAA TULOS — lukee savukkeen ajolokin, laskee OK/FAIL-rivit ja
// vertaa FAIL-rivejä tunnettuun listaan. Käytetään
// .github/workflows/savukkeet.yml:n savuke-jobissa.
//
//   node tools/savukkeet/vertaa-tulos.mjs <loki> <tiedosto> <tunnetutPunaisetJSON> <tunnetutPunaisetMaara>
//
// <tunnetutPunaisetJSON> on JSON-taulukko regex-lähdemerkkijonoja
// (testataan jokaista FAIL-riviä vasten, ei ankkuroida automaattisesti
// — käytä ^ tarvittaessa, ks. sarjat.json). <tunnetutPunaisetMaara> on
// "null" tai luku (lukumääräpohjainen vertailu, kun tarkkaa listaa ei
// ole — ks. savuke-kaupunkipopup sarjat.jsonissa).
//
// Tulostaa ihmisluettavan FAIL-listan [tunnettu]/[UUSI]-merkinnöin,
// ::warning::-rivin jokaisesta UUDESTA punaisesta (tai
// lukumäärän kasvusta), ja VIIMEISENÄ RIVINÄ tiiviin JSON-yhteenvedon
// { lapi, yhteensa, uusiaPunaisia } — työnkulku poimii tämän rivin.

import { readFileSync } from 'node:fs';

const [, , lokiPolku, tiedosto, tunnetutJson, maaraStr] = process.argv;
if (!lokiPolku || !tiedosto) {
  console.error('Käyttö: node tools/savukkeet/vertaa-tulos.mjs <loki> <tiedosto> <tunnetutPunaisetJSON> <tunnetutPunaisetMaara>');
  process.exit(1);
}

const loki = readFileSync(lokiPolku, 'utf8');
const rivit = loki.split('\n');

const okMaara = rivit.filter((r) => /^OK\b/.test(r)).length;
const failRivit = rivit
  .filter((r) => /^FAIL\b/.test(r))
  .map((r) => r.replace(/^FAIL\s*/, '').trim());

const lapi = okMaara;
const yhteensa = okMaara + failRivit.length;

let tunnetut = [];
try {
  tunnetut = tunnetutJson ? JSON.parse(tunnetutJson) : [];
} catch {
  tunnetut = [];
}
const maara = maaraStr && maaraStr !== 'null' && maaraStr !== '' ? Number(maaraStr) : null;

let uudet = [];
if (tunnetut.length) {
  uudet = failRivit.filter((rivi) => !tunnetut.some((p) => {
    try {
      return new RegExp(p).test(rivi);
    } catch {
      return rivi.includes(p);
    }
  }));
  for (const rivi of failRivit) {
    const tunnettu = tunnetut.some((p) => {
      try {
        return new RegExp(p).test(rivi);
      } catch {
        return rivi.includes(p);
      }
    });
    console.log(`  ${tunnettu ? '[tunnettu]' : '[UUSI]    '} ${rivi}`);
  }
  for (const rivi of uudet) {
    console.log(`::warning::savuke ${tiedosto}: uusi punainen — ${rivi}`);
  }
} else if (maara !== null) {
  for (const rivi of failRivit) console.log(`  [?] ${rivi}`);
  if (failRivit.length > maara) {
    const kasvu = failRivit.length - maara;
    uudet = failRivit.slice(maara);
    console.log(`::warning::savuke ${tiedosto}: FAIL-määrä kasvoi tunnetusta ${maara}:sta ${failRivit.length}:aan (+${kasvu}) — tarkista lista, sarjat.json:n lukumäärä ei enää täsmää`);
  } else if (failRivit.length < maara) {
    console.log(`INFO  savuke ${tiedosto}: FAIL-määrä laski tunnetusta ${maara}:sta ${failRivit.length}:aan — sarjat.json voi olla päivityksen tarpeessa`);
  }
} else {
  for (const rivi of failRivit) console.log(`  [ei tunnettuja punaisia] ${rivi}`);
  uudet = failRivit;
}

console.log(`\n${lapi}/${yhteensa} läpi (savuke ${tiedosto})`);
console.log(JSON.stringify({ lapi, yhteensa, uusiaPunaisia: uudet.length }));
