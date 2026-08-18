// Vertaa paketeissa olevat tekijämerkinnät Commonsin omiin tietoihin.
//
// tools/lisaa-tekijat.mjs täydentää PUUTTUVAN tekijän. Se ei kuitenkaan
// katso niitä merkintöjä, joissa nimi jo on — ja juuri siellä oli vika:
// kirjoitin kuuden Kuwait-kuvan tekijän nimen muistista ja sain kaikki
// kuusi väärin. Nimet olivat uskottavia (arabialaisia sukunimiä oikean
// näköisessä muodossa), joten mikään ei näyttänyt oudolta. Väärä
// tekijämerkintä on lisenssirikkomus siinä missä puuttuvakin, eikä
// kumpaakaan huomaa lukemalla.
//
//   node tools/tarkista-tekijat.mjs              # kaikki paketit
//   node tools/tarkista-tekijat.mjs maa-kategoriat.js
//
// Vertailu on tarkoituksella löyhä: Commonsin Artist-kenttä on vapaata
// HTML:ää, ja lisaa-tekijat.mjs siistii siitä nimen monella säännöllä.
// Tässä riittää, että merkinnän nimiosa ja Commonsin kenttä osuvat
// toisiinsa jommassakummassa suunnassa — tarkoitus on löytää keksityt
// nimet, ei nipottaa välimerkeistä.
//
// TULOS ON LUETTAVA, EI LUETTELO VIRHEISTÄ. Loppuun jää tahallisia
// eroja, jotka työkalu ei voi tietää oikeiksi: suomennetut laitosnimet
// ("Presidency of the Republic of Turkey" → "Turkin tasavallan
// presidentin kanslia"), translitteroinnit ja API:n rikkomat tarkkeet
// ("K?vanç"). maa-kategoriat.js:ssä rivejä jää parikymmentä kolmesta
// tuhannesta kuvasta — sen listan silmäilee minuutissa, ja keksitty
// nimi erottuu siitä heti.

import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VALOKUVAT_FLICKR } from '../js/packs/valokuvat-flickr.js';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const AGENTTI = 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)';
const hae = (url) => JSON.parse(execFileSync('curl',
  ['-sS', '--max-time', '45', '--retry', '2', '--retry-delay', '3', '-A', AGENTTI, url],
  { maxBuffer: 5e7 }).toString());

const ARKISTOT = /^(Wikimedia Commons|Commons|Library of Congress|BnF|BnF Gallica|Bundesarchiv|Rijksmuseum|Nationaal Archief|archive\.org|Freesound|radio aporee)$/i;

/** Lähdemerkinnän nimiosa, tai tyhjä jos merkinnässä on vain arkisto. */
function nimiosa(lahde) {
  const alku = lahde.split('(')[0].trim().replace(/,$/, '');
  if (!alku || ARKISTOT.test(alku)) return '';
  return alku.replace(/,?\s*(Wikimedia Commons|Commons)\s*$/i, '').trim();
}

const siisti = (s) => (s ?? '')
  .replace(/<[^>]*>/g, ' ').replace(/&amp;/gi, '&').replace(/&[a-z]+;/gi, ' ')
  .replace(/\s+/g, ' ').trim();

/*
 * Ohitettavat erot: nämä EIVÄT ole virheitä vaan tarkoituksellisia.
 *
 * 1. "Unknown author" on peliin suomennettu ("tuntematon tekijä").
 * 2. Kyrillinen tai muu ei-latinalainen nimi on translitteroitu
 *    ("Иван Фёдоров" → "Ivan Fjodorov"). Merkkijonovertailu ei osaa
 *    sanoa niistä mitään, ja väärä hälytys joka rivillä opettaa
 *    ohittamaan koko tarkistimen.
 *
 * Jäljelle jää se, mitä etsitään: latinalainen nimi, joka on eri nimi.
 */
const TUNTEMATON = /^(unknown|anonymous|not (given|stated)|tuntematon|невідом|неизвест)/i;
const onLatinaa = (s) => /[a-zA-ZåäöÅÄÖ]/.test(s.replace(/[^\p{L}]/gu, ''));

/** Riittävän samat? Pieni kirjainkoko- ja osajonovertailu molempiin suuntiin. */
function tasmaa(merkinta, commons) {
  const a = merkinta.toLowerCase().replace(/\s*ym\.$/, '').replace(/[.,]/g, '').trim();
  const b = commons.toLowerCase().replace(/[.,]/g, '').trim();
  if (!a || !b) return true;
  if (TUNTEMATON.test(a) || TUNTEMATON.test(b)) return true;
  if (!onLatinaa(commons)) return true;
  if (a === b || b.includes(a) || a.includes(b)) return true;
  // Sukunimi riittää: "Julien Willem" vs "Willem, Julien"
  const sanat = a.split(/\s+/).filter((w) => w.length >= 4);
  if (sanat.length > 0 && sanat.every((w) => b.includes(w))) return true;
  // Translitterointi: sama nimi eri kirjoitusasussa ("Aivazovski" /
  // "Aivazovsky"). Verrataan sanojen alkuja, ei koko sanaa.
  const tyvet = (s) => s.split(/\s+/).filter((w) => w.length >= 5).map((w) => w.slice(0, 5));
  const at = tyvet(a);
  return at.length > 0 && at.every((w) => b.includes(w));
}

/** Sama pariutus kuin lisaa-tekijat.mjs:ssä: tiedostoa lähin lahde. */
function parit(sisalto) {
  const merkit = [];
  const kuvio = /(tiedosto|lahde): (?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g;
  for (const m of sisalto.matchAll(kuvio)) {
    merkit.push({ laji: m[1], arvo: (m[2] ?? m[3]).replace(/\\(['"\\])/g, '$1'), kohta: m.index });
  }
  const ulos = [];
  for (let i = 0; i < merkit.length; i += 1) {
    if (merkit[i].laji !== 'tiedosto') continue;
    const lahde = merkit.slice(i + 1).find((x) => x.laji === 'lahde');
    const seuraava = merkit.slice(i + 1).find((x) => x.laji === 'tiedosto');
    if (!lahde || (seuraava && seuraava.kohta < lahde.kohta)) continue;
    ulos.push({ tiedosto: merkit[i].arvo, lahde: lahde.arvo });
  }
  return ulos;
}

const valinta = process.argv.slice(2);
const tiedostot = readdirSync(join(JUURI, 'js/packs'))
  .filter((f) => f.endsWith('.js'))
  .filter((f) => valinta.length === 0 || valinta.includes(f));

const rivit = [];
for (const f of tiedostot) {
  const s = readFileSync(join(JUURI, 'js/packs', f), 'utf8');
  for (const p of parit(s)) {
    // Flickr-kuvia ei ole Commonsissa, joten vertailukohtaa ei ole:
    // niiden tekijä tulee flickr.photos.getInfo-kutsusta ja on kirjattu
    // js/packs/valokuvat-flickr.js:ään. Ilman tätä ohitusta jokainen ajo
    // päättyisi samaan riviin "ei Commonsissa", ja pysyvä valheellinen
    // rivi opettaa ohittamaan koko listan.
    if (VALOKUVAT_FLICKR.has(p.tiedosto)) continue;
    const nimi = nimiosa(p.lahde);
    if (nimi) rivit.push({ paketti: f, ...p, nimi });
  }
}
console.log(`Tarkistetaan ${rivit.length} tekijämerkintää ${tiedostot.length} paketista.\n`);

const nimet = [...new Set(rivit.map((r) => r.tiedosto))];
const commons = new Map();
for (let i = 0; i < nimet.length; i += 25) {
  const era = nimet.slice(i, i + 25);
  let d;
  try {
    d = hae('https://commons.wikimedia.org/w/api.php?format=json&action=query'
      + '&prop=imageinfo&iiprop=extmetadata&iiextmetadatafilter=Artist|Attribution'
      + '&titles=' + encodeURIComponent(era.map((t) => `File:${t}`).join('|')));
  } catch (e) {
    console.log(`  haku epäonnistui erässä ${i}: ${e.message.slice(0, 60)}`);
    continue;
  }
  const alkuun = new Map((d.query?.normalized ?? []).map((n) => [n.to, n.from]));
  for (const sivu of Object.values(d.query?.pages ?? {})) {
    const avain = (alkuun.get(sivu.title) ?? sivu.title).replace(/^File:/, '');
    if (sivu.missing !== undefined) { commons.set(avain, null); continue; }
    const m = sivu.imageinfo?.[0]?.extmetadata ?? {};
    commons.set(avain, siisti(m.Artist?.value ?? m.Attribution?.value));
  }
}

let viat = 0;
for (const r of rivit) {
  if (!commons.has(r.tiedosto)) continue;      // ei Commonsista (esim. LoC)
  const c = commons.get(r.tiedosto);
  if (c === null) { console.log(`  PUUTTUU  ${r.paketti}: ${r.tiedosto}`); viat += 1; continue; }
  if (!c) continue;                            // Commonsilla ei tekijätietoa
  if (tasmaa(r.nimi, c)) continue;
  viat += 1;
  console.log(`  ERI TEKIJÄ  ${r.paketti}: ${r.tiedosto}`);
  console.log(`     paketissa: ${r.nimi}`);
  console.log(`     Commons:   ${c.slice(0, 70)}`);
}
console.log(viat ? `\n=== ${viat} poikkeamaa ===` : '\n=== kaikki tekijämerkinnät täsmäävät ===');
