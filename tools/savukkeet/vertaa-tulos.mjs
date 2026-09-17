// VERTAA TULOS — lukee savukkeen ajolokin, laskee OK/FAIL-rivit ja
// vertaa FAIL-rivejä tunnettuun listaan. Käytetään
// .github/workflows/savukkeet.yml:n savuke-jobissa.
//
//   node tools/savukkeet/vertaa-tulos.mjs <loki> <tiedosto> <tunnetutPunaisetJSON> <tunnetutPunaisetMaara> [savukeExit]
//
// <tunnetutPunaisetJSON> on JSON-taulukko regex-lähdemerkkijonoja
// (testataan jokaista FAIL-riviä vasten, ei ankkuroida automaattisesti
// — käytä ^ tarvittaessa, ks. sarjat.json). <tunnetutPunaisetMaara> on
// "null" tai luku (lukumääräpohjainen vertailu, kun tarkkaa listaa ei
// ole — ks. savuke-kaupunkipopup sarjat.jsonissa). [savukeExit] on
// savukkeen oma poistumiskoodi (valinnainen) — käytetään VAIN
// KAATUMISVAHDIN laukaisuun (ks. alla), ei muuhun.
//
// Tulostaa ihmisluettavan FAIL-listan [tunnettu]/[UUSI]-merkinnöin,
// ::warning::-rivin jokaisesta UUDESTA punaisesta (tai
// lukumäärän kasvusta), ja VIIMEISENÄ RIVINÄ tiiviin JSON-yhteenvedon
// { lapi, yhteensa, uusiaPunaisia } — työnkulku poimii tämän rivin JA
// käyttää uusiaPunaisia-lukua jobin läpi/ei-läpi-päätökseen (ei
// savukkeen omaa poistumiskoodia — se on 1 sekä tunnetuista että
// uusista punaisista, joten se ei yksin kelpaa portiksi; ks.
// .github/workflows/savukkeet.yml "Tarkista tulos" -askel).
//
// KAATUMISVAHTI: jos savuke kaatuu POIKKEUKSEEN ennen kuin yksikään
// vaadi()-rivi ehtii tulostua (esim. import-virhe, selaimen
// käynnistys epäonnistuu), lokissa ei ole yhtään FAIL-riviä eikä
// tunnettu-vertailu löydä mitään uutta — jolloin uusiaPunaisia jäisi
// virheellisesti nollaan, vaikka savuke ei ajanut yhtään väitettä.
// Siksi: jos savukeExit on annettu ja on != 0 JA lokissa ei ole
// YHTÄÄN OK- eikä FAIL-riviä, se lasketaan aina yhdeksi UUDEKSI
// punaiseksi ("savuke kaatui poikkeukseen") riippumatta tunnetuista
// listoista — tunnettu punainen tunnetaan aina vaadi()-rivin
// tekstistä, ei koskaan kaatumisesta.

import { readFileSync } from 'node:fs';

const [, , lokiPolku, tiedosto, tunnetutJson, maaraStr, savukeExitStr] = process.argv;
if (!lokiPolku || !tiedosto) {
  console.error('Käyttö: node tools/savukkeet/vertaa-tulos.mjs <loki> <tiedosto> <tunnetutPunaisetJSON> <tunnetutPunaisetMaara> [savukeExit]');
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

const savukeExit = savukeExitStr !== undefined && savukeExitStr !== '' ? Number(savukeExitStr) : null;
const kaatui = savukeExit !== null && savukeExit !== 0 && okMaara === 0 && failRivit.length === 0;
if (kaatui) {
  const loppu = loki.trim().split('\n').slice(-15).join('\n');
  console.log(`  [KAATUMINEN] savuke päättyi koodilla ${savukeExit} eikä tulostanut yhtään OK/FAIL-riviä — lokin häntä:\n${loppu}`);
  console.log(`::error::savuke ${tiedosto}: kaatui poikkeukseen (koodi ${savukeExit}) ennen yhtään väitettä — ei tunnettu punainen`);
  console.log(`\n0/0 läpi (savuke ${tiedosto}, KAATUI)`);
  console.log(JSON.stringify({ lapi: 0, yhteensa: 0, uusiaPunaisia: 1 }));
  process.exit(0);
}

let tunnetut = [];
try {
  tunnetut = tunnetutJson ? JSON.parse(tunnetutJson) : [];
} catch {
  tunnetut = [];
}
const maara = maaraStr && maaraStr !== 'null' && maaraStr !== '' ? Number(maaraStr) : null;

const tasmaaTunnettuun = (rivi) => tunnetut.some((p) => {
  try {
    return new RegExp(p).test(rivi);
  } catch {
    return rivi.includes(p);
  }
});

// Kaksivaiheinen: ensin PATTERNIT (aina tunnettuja, riippumatta
// näkymästä tai mitatusta luvusta — esim. savuke-kaupunkipopupin
// häilyvä zoomivartio, joka osuu eri kertoina eri kaupunkiin/ruutuun),
// sitten JÄLJELLE JÄÄVILLE lukumääräkatto, jos annettu (esim.
// savuke-kaupunkipopupin 17 "vanhaa" tuntematonta yksittäin, joita ei
// ole eritelty tekstinä — ks. sarjat.json). Näin patternit ja
// lukumäärä voivat olla käytössä SAMANAIKAISESTI.
const patternTunnetut = [];
const patternUudet = [];
for (const rivi of failRivit) {
  if (tasmaaTunnettuun(rivi)) patternTunnetut.push(rivi);
  else patternUudet.push(rivi);
}

let uudet = [];
if (tunnetut.length) {
  const merkki = (rivi) => {
    if (tasmaaTunnettuun(rivi)) return '[tunnettu]';
    return maara !== null ? '[?]       ' : '[UUSI]    ';
  };
  for (const rivi of failRivit) console.log(`  ${merkki(rivi)} ${rivi}`);
}
if (maara !== null) {
  if (!tunnetut.length) for (const rivi of failRivit) console.log(`  [?] ${rivi}`);
  if (patternUudet.length > maara) {
    const kasvu = patternUudet.length - maara;
    uudet = patternUudet.slice(maara);
    console.log(`::warning::savuke ${tiedosto}: FAIL-määrä (patterneilla selittämättömät) kasvoi tunnetusta ${maara}:sta ${patternUudet.length}:aan (+${kasvu}) — tarkista lista, sarjat.json:n lukumäärä ei enää täsmää`);
  } else if (patternUudet.length < maara) {
    console.log(`INFO  savuke ${tiedosto}: FAIL-määrä (patterneilla selittämättömät) laski tunnetusta ${maara}:sta ${patternUudet.length}:aan — sarjat.json voi olla päivityksen tarpeessa`);
  }
} else if (tunnetut.length) {
  uudet = patternUudet;
  for (const rivi of uudet) {
    console.log(`::warning::savuke ${tiedosto}: uusi punainen — ${rivi}`);
  }
} else {
  for (const rivi of failRivit) console.log(`  [ei tunnettuja punaisia] ${rivi}`);
  uudet = failRivit;
}

console.log(`\n${lapi}/${yhteensa} läpi (savuke ${tiedosto})`);
console.log(JSON.stringify({ lapi, yhteensa, uusiaPunaisia: uudet.length }));
