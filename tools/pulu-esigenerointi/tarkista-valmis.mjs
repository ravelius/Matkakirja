// Pulun esigeneroinnin valmiin paketin tarkistus (Sisältökirjuri 9.10.2026, Ranskan pistokokeen jälkeen).
//   node tools/pulu-esigenerointi/tarkista-valmis.mjs <kansio>      (esim. pulu-esigenerointi/FRA)
// Lukee vaihe1.json ja vaihe2.json (ei kosketa vastaukset-*.txt-tiedostoihin, toisin kuin tarkista-era.mjs) ja etsii ne neljä
// järjestelmällistä virhettä, jotka Ranskan pistokokeessa löytyivät (docs/raportit/pulu-fra-pistokoe-20261009.md):
//   1. metalauseet ("Pelin aineisto…", "aineistossani", viittaukset ohjeisiin tai kontekstiin)
//   2. ulkomaiset sivupolut: Euroopan ulkopuolelle vievät [[linkit]] ja irrelevantit sivulauseet vieraista maista
//   3. rivinvaihdot: yksi \n on kielletty, \n\n sallitaan vain Livian lisäyksen erottajana (enintään yksi)
//   4. natiivin jäsentimen ehdot: jokaisella V1-linkillä on lisaa-avain, linkki ≤ 60 merkkiä ilman pystyviivaa, ei JATKOT/KYSYMYS-rivejä
// Muistinvaraiset faktat (vuosiluvut, korkeudet, "suurin/ensimmäinen") ovat lisäksi Sisältökirjurin pistokokeen asia: tämä työkalu ei voi
// tarkistaa niitä. Poistumiskoodi 1, jos virheitä.
import fs from 'node:fs';
import path from 'node:path';

const kansio = process.argv[2];
if (!kansio) { console.error('käyttö: node tarkista-valmis.mjs <kansio>'); process.exit(2); }
const lue = (n) => JSON.parse(fs.readFileSync(path.join(kansio, n), 'utf8'));
const v1 = lue('vaihe1.json');
const v2 = fs.existsSync(path.join(kansio, 'vaihe2.json')) ? lue('vaihe2.json') : [];
const LINKKI = /\[\[([^\]]+)\]\]/g;

const META = /pelin aineisto|aineistossa(ni|i)\b|aineiston (loppu|mukaan)|tietoruudu|kontekstissa|kontekstin|ohjeissa|ohjeiden|ohjeisto|avainkäsit|käsitemerkin|tekstin loppu on katk|ei ole pelissä|pelissä ei|(?<!Ranskan |Pariisin )(maalehdessä|kaupunkilehdessä)/i;
// Euroopan ulkopuoliset paikat ja aiheet: osuma on varoitus, jos linkkinä, ja virhe, jos linkissä tai nimetyssä kohteessa
const ULKO = /Afganistan|Kabul|Istalif|Iran\b|Iranin|Irak|Egypti|Egyptin|Kairo|Mali\b|Songhai|Sudan|Libya|Algeria|Marokko|Tunisia|Kiina|Kiinan|Japani|Japanin|Intia|Intian|Australia|Australian|Uusi-Seelanti|Brasilia|Peru\b|Perun|Chile|Chilen|Meksiko|Kanada\b|Kanadan|Yhdysvallo|Mekka|Mekkaan|Kilimanjaro|Nubia|Jekaterinburg/;

const virheet = [];
const varoitukset = [];
const lisaaAvaimet = new Set(v2.map((x) => `${x.kohde}\u0000${x.kasite.toLowerCase()}`));

function perus(x, tunnus, vaihe) {
  const t = x.vastaus;
  if (/\n/.test(t.replace(/\n\n/, ''))) virheet.push(`${tunnus}: rivinvaihto (yksi \\n tai useampi tyhjä rivi)`);
  if ((t.match(/\n\n/g) || []).length > 1) virheet.push(`${tunnus}: useampi kuin yksi kappaleväli`);
  if (/^\s*(jatkot?|kysymys)\s*:/im.test(t)) virheet.push(`${tunnus}: JATKOT/KYSYMYS-rivi vastauksessa`);
  if (META.test(t)) virheet.push(`${tunnus}: metalause (${t.match(META)[0]})`);
  if (!Array.isArray(x.jatkot) || x.jatkot.length !== 2 || x.jatkot.some((j) => j.length > 70 || !j.endsWith('?'))) virheet.push(`${tunnus}: jatkot`);
  const linkit = [...t.matchAll(LINKKI)].map((m) => m[1]);
  if (linkit.some((k) => k.includes('|') || k.length > 60 || k.includes('\n'))) virheet.push(`${tunnus}: linkki ei kelpaa`);
  if (new Set(linkit.map((k) => k.toLowerCase())).size !== linkit.length) virheet.push(`${tunnus}: sama linkki kahdesti`);
  for (const k of linkit) if (ULKO.test(k)) virheet.push(`${tunnus}: Euroopan ulkopuolinen linkki [[${k}]]`);
  const ulko = t.replace(LINKKI, '$1').match(ULKO);
  if (ulko) varoitukset.push(`${tunnus}: ulkomainen maininta "${ulko[0]}" (tarkista, kuuluuko vastaukseen)`);
  if (vaihe === 1) {
    if (linkit.length < 2 || linkit.length > 5) virheet.push(`${tunnus}: käsitteitä ${linkit.length} (V1: 2–5)`);
    for (const k of linkit) if (!lisaaAvaimet.has(`${x.kohde}\u0000${k.toLowerCase()}`)) virheet.push(`${tunnus}: linkillä [[${k}]] ei ole lisaa-avainta`);
  } else if (linkit.length > 5) virheet.push(`${tunnus}: käsitteitä ${linkit.length} (V2: enintään 5)`);
  if (/\p{Extended_Pictographic}|!/u.test(t)) virheet.push(`${tunnus}: huutomerkki tai hymiö`);
  if (/(?<![\d]|\bn|\beaa|\bjaa|\bym|\bjne|\besim|\bmm)\.\s+[a-zäö]/.test(t)) virheet.push(`${tunnus}: lause alkaa pienellä kirjaimella (poistettu lause jätti jäännöksen?)`);
}

v1.forEach((x, i) => perus(x, `V1 ${x.kohde} #${i}: ${x.kysymys.slice(0, 40)}`, 1));
v2.forEach((x) => perus(x, `V2 ${x.kohde} / ${x.kasite}`, 2));
console.log(`vaihe1 ${v1.length} + vaihe2 ${v2.length}: virheitä ${virheet.length}, varoituksia ${varoitukset.length}`);
for (const v of virheet) console.log('  VIRHE ' + v);
for (const v of varoitukset) console.log('  varoitus ' + v);
process.exit(virheet.length ? 1 : 0);
