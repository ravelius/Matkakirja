// KIRJOITA YHTEENVETO — lukee savuke-jobien tallentamat
// tulos-*.json-tiedostot (yksi per matriisin alkio, ks.
// .github/workflows/savukkeet.yml:n "Tallenna tulos" -askel) ja
// tulostaa Markdown-taulukon stdouttiin GITHUB_STEP_SUMMARYä varten.
//
//   node tools/savukkeet/kirjoita-yhteenveto.mjs <kansio>

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const kansio = process.argv[2];
if (!kansio) {
  console.error('Käyttö: node tools/savukkeet/kirjoita-yhteenveto.mjs <kansio>');
  process.exit(1);
}

console.log('## Savukkeet\n');

if (!existsSync(kansio)) {
  console.log('Yhtään tulostiedostoa ei löytynyt (`' + kansio + '` puuttuu) — matriisi ei ehkä ajanut yhtään jobia.');
  process.exit(0);
}

const tiedostot = readdirSync(kansio).filter((t) => t.endsWith('.json')).sort();
if (!tiedostot.length) {
  console.log('Yhtään tulostiedostoa ei löytynyt.');
  process.exit(0);
}

console.log('| Savuke | Läpi | Tunnettuja punaisia | Uusia punaisia | Kesto |');
console.log('| --- | --- | --- | --- | --- |');

let yhtLapi = 0;
let yhtYht = 0;
let yhtKesto = 0;
let uusiaYht = 0;

for (const tiedosto of tiedostot) {
  let rivi;
  try {
    rivi = JSON.parse(readFileSync(join(kansio, tiedosto), 'utf8'));
  } catch (e) {
    console.log(`| ${tiedosto} | VIRHE | — | — | — (tuloksen jäsennys epäonnistui: ${e.message}) |`);
    continue;
  }
  const { tiedosto: nimi, kesto, tulosJson } = rivi;
  const lapi = tulosJson?.lapi ?? '?';
  const yhteensa = tulosJson?.yhteensa ?? '?';
  const uusia = tulosJson?.uusiaPunaisia ?? 0;
  const tila = uusia > 0 ? 'UUSI PUNAINEN' : (lapi === yhteensa ? 'OK' : 'tunnettu punainen');
  console.log(`| ${nimi} | ${lapi}/${yhteensa} (${tila}) | ${yhteensa - lapi - uusia >= 0 ? yhteensa - lapi - uusia : '?'} | ${uusia} | ${kesto ?? '?'} s |`);
  if (typeof lapi === 'number') yhtLapi += lapi;
  if (typeof yhteensa === 'number') yhtYht += yhteensa;
  if (typeof kesto === 'number') yhtKesto += kesto;
  uusiaYht += uusia;
}

console.log(`\n**Yhteensä:** ${yhtLapi}/${yhtYht} väitettä läpi, ${uusiaYht} uutta punaista, ${tiedostot.length} savuketta, kesto yhteensä ${yhtKesto} s (rinnakkain, joten seinäkello on lyhyempi).`);
