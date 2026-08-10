// Lisää kuvien lähdemerkintöihin tekijän nimen.
//
// CC BY ja CC BY-SA vaativat tekijän nimeämisen. Peli merkitsi kuvat
// muodossa "Wikimedia Commons (CC BY-SA 4.0)", mikä kertoo alustan ja
// lisenssin muttei tekijää — eli 112 kuvaa 186:sta näytettiin ehtojen
// vastaisesti. Tekijä on Commonsin omissa tiedoissa (extmetadata:Artist),
// joten se haetaan sieltä ja kirjoitetaan lähdekenttään:
//
//   'Wikimedia Commons (CC BY-SA 4.0)'
//   → 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)'
//
// Public domain- ja CC0-kuviin tekijää ei lisätä: ne eivät vaadi sitä,
// ja lyhyt merkintä pysyy luettavampana.
//
//   node tools/lisaa-tekijat.mjs           # näyttää mitä tekisi
//   node tools/lisaa-tekijat.mjs --kirjoita
//
// Samalla kerrotaan, jos paketissa merkitty lisenssi ei täsmää
// Commonsin omaan — silloin merkintä on väärä eikä vain vajaa.

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const KIRJOITA = process.argv.includes('--kirjoita');
const AGENTTI = 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)';

const nuku = (s) => execFileSync('sleep', [String(s)]);
const hae = (url) => JSON.parse(execFileSync('curl',
  ['-sS', '--max-time', '45', '--retry', '2', '--retry-delay', '3', '-A', AGENTTI, url],
  { maxBuffer: 5e7 }).toString());

/** Vaatiiko lisenssi tekijän nimeämisen? */
const vaatiiTekijan = (lisenssi) => /CC BY/i.test(lisenssi);

const ARKISTOT = /^(Wikimedia Commons|Commons|Library of Congress|BnF|BnF Gallica|Bundesarchiv|Rijksmuseum|Nationaal Archief|archive\.org|Freesound|radio aporee)$/i;
const LISENSSI = /^(cc[ -]?(by|0)|public domain|pd|no restrictions|ogl|fal|gfdl|free art licen[cs]e|attribution)\b/i;
const OIKEUSLAUSE = /^(ei\s|no known|kein)/i;

/*
 * Onko lähdemerkinnässä jo tekijä?
 *
 * VANHA SÄÄNTÖ KATSOI VAIN ALKUA: "ei ala arkiston nimellä" ⇒ tekijä on.
 * Se meni väärin molempiin suuntiin, koska paketeissa on kolme eri
 * kenttäjärjestystä eikä yhtä:
 *
 *   1. 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)'   tekijä alussa
 *   2. 'CC BY-SA 3.0 (Wolfgang Moroder, Commons)'        tekijä suluissa
 *   3. 'Wikimedia Commons (CC BY 2.0), James St. John'   tekijä lopussa
 *   4. 'CC BY-SA 4.0'                                    ei tekijää
 *
 * Vanha sääntö piti muotoa 4 tekijänä (europe-valokuvat.js, 31 kuvaa),
 * eli juuri ne jäivät joka ajolla korjaamatta. Ja se piti muotoja 2 ja 3
 * tekijättöminä — jos ne olisi "täydennetty", nimi olisi kirjoitettu
 * merkintään toiseen kertaan 155 kuvaan.
 *
 * Siksi järjestystä ei enää katsota lainkaan. Merkintä pilkotaan osiin
 * sulkeiden ja pilkkujen kohdalta, ja osista pudotetaan arkistojen
 * nimet, lisenssitunnukset ja oikeuslauseet. Jos mitään jää jäljelle,
 * se on tekijä — oli se missä kohtaa tahansa.
 */
function onJoTekija(lahde) {
  return lahde
    .split(/[(),]|\s+\/\s+/)
    .map((osa) => osa.trim())
    .some((osa) => osa && !ARKISTOT.test(osa) && !LISENSSI.test(osa) && !OIKEUSLAUSE.test(osa));
}

/** Merkintä, jossa ei ole muuta kuin lisenssitunnus. */
const PELKKA_LISENSSI = (lahde) => LISENSSI.test(lahde.trim()) && !/[(),]/.test(lahde);

/**
 * Commonsin Artist-kentästä pelkkä nimi.
 *
 * Kenttä on vapaata HTML:ää, ja kuvaajat kirjoittavat siihen mitä
 * sattuu: kokonaisia käyttöehtoja ("This Photo was taken by X. Feel
 * free to use it…"), allekirjoituksia aikaleimoineen, tiedostonimiä ja
 * kotipaikkoja. Lähdemerkintään kuuluu vain nimi — muu tekee siitä
 * lukukelvottoman ja katkeaisi kesken.
 */
function siisti(arvo) {
  // Tagit poistetaan ilman välilyöntiä: nimi voi olla pilkottu useaan
  // span-elementtiin kirjainten värittämiseksi ("A"+"ngelus"), ja
  // välilyönti tekisi siitä "A ngelus". Rivinvaihdot ja peräkkäiset
  // linkit erotetaan erikseen, ettei nimiä liimaudu yhteen.
  let s = (arvo ?? '')
    .replace(/<br\s*\/?>|<\/(p|div|li|tr)>/gi, ' ')
    .replace(/<\/a>\s*<a\b[^>]*>/gi, ', ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // "File:jokin.jpg : Nimi ..." — tiedostonimi edellä
  s = s.replace(/^File:[^:]+:\s*/i, '');
  // "This Photo was taken by X", "Photo by X", "Foto: X", "© X"
  s = s.replace(/^(this (photo|image|picture) (was )?(taken|created) by|photo(graph)? by|foto:|bild:|©)\s*/i, '');
  /*
   * Ensimmäinen virke riittää: loppu on käyttöehtoja tai kiitoksia.
   *
   * Piste ei kuitenkaan aina lopeta virkettä. "Dr. Ondřej Havelka"
   * katkesi muotoon "Dr" ja "M. Fatih Morgül" muotoon "M", eli tulos
   * oli suoraan tämän tiedoston oman aikeen vastainen: nimen
   * katkaiseminen kesken on väärin juuri sitä kohtaan, jota lisenssi
   * käskee nimetä.
   *
   * Piste ohitetaan, jos sitä edeltää yksittäinen alkukirjain tai
   * tunnettu titteli. Lista on lyhyt tarkoituksella — tuntematon lyhenne
   * on harvinaisempi kuin kokonainen virke, ja liian salliva sääntö
   * päästäisi käyttöehdot takaisin nimeen.
   */
  /*
   * "Sgt" ja lyhenteet: "U.S. Army photo by Staff Sgt. Luke Wilson"
   * katkesi muotoon "U.S", koska piste "U.S." jälkeen luettiin virkkeen
   * lopuksi. Tulos näytti nimeltä eikä herättänyt epäilystä — sama
   * vika kuin muutkin tämän tiedoston hiljaiset katkaisut.
   */
  const EI_KATKAISE = /(?:^|\s)(?:[A-ZÅÄÖ]|[A-Z]\.[A-Z]|Dr|Mr|Mrs|Ms|Prof|St|Sr|Jr|Fr|Sta|Ing|Rev|Hr|Mme|Mlle|Sgt|Cpl|Lt|Capt|Maj|Col)$/;
  for (const osuma of [...s.matchAll(/\.\s|\s\.\s/g)]) {
    if (EI_KATKAISE.test(s.slice(0, osuma.index))) continue;
    s = s.slice(0, osuma.index);
    break;
  }
  s = s.trim();

  /*
   * Sama nimi kahdesti peräkkäin ilman erotinta.
   *
   * Tagit poistetaan yllä ilman välilyöntiä, jotta pilkottu nimi ei
   * hajoa. Sivuvaikutus: jos sama teksti on kahdessa elementissä
   * ("Unknown author" kahdesti), tuloksena on "Unknown authorUnknown
   * author". Se näkyi pelaajalle asti.
   */
  s = s.replace(/^(.{3,40}?)\1$/, '$1');
  // Allekirjoituksen aikaleima ("Nimi 11:52, 3 July 2012 (UTC)")
  s = s.replace(/\s+\d{1,2}:\d{2},.*$/, '');
  // Kotipaikka ei kuulu nimeen ("Tony Hisgett from Birmingham, UK")
  s = s.replace(/\s+from\s+.*$/i, '');
  // Wikipedia-tunnus suluissa ("J Williams (= Hammy07 at en.wikipedia)")
  s = s.replace(/\s*\((=\s*)?[^)]*\b(at|wikipedia|wikimedia)\b[^)]*\)/i, '');
  // Sama ilman sulkeita ("Shayanshaukat at English Wikipedia")
  s = s.replace(/\s+at\s+\S+\s*wikipedia\s*$/i, '');
  // Elinvuodet eivät kuulu lähdemerkintään ("Lucien Roy (d. 1941)")
  s = s.replace(/\s*\((k\.|d\.|s\.|b\.|\d{4})[^)]*\)\s*$/i, '');
  // Verkko-osoite ei ole nimi
  s = s.replace(/,?\s*(https?:\/\/|www\.)\S*/gi, '');
  s = s.replace(/[,;.]\s*$/, '').replace(/\s+\.$/, '').trim();

  // Attribution voi olla kokonainen lause: "Kuvan nimi by Tekijä"
  // (geograph.org.uk) tai "Photo: Tekijä". Nimi on jälkimmäinen osa.
  const bySijainti = s.match(/^(.+?)\s+by\s+(.{2,40})$/i);
  if (bySijainti) s = bySijainti[2].trim();

  // Useita tekijöitä: nimetään ensimmäinen ja todetaan muut. Nimien
  // katkaiseminen kesken olisi väärin juuri sitä kohtaan, jota
  // lisenssi käskee nimetä.
  const osat = s.split(/,\s*/).filter(Boolean);
  if (osat.length > 2 || s.length > 44) {
    return osat.length > 1 ? `${osat[0]} ym.` : osat[0] ?? '';
  }
  return s;
}

// --- kerätään tiedosto–lähde-parit ------------------------------------------

/**
 * Paketeissa `tiedosto` ja sitä koskeva `lahde` ovat samassa oliossa,
 * mutta niiden välissä voi olla muita kenttiä. Otetaan kutakin
 * tiedostoa lähinnä seuraava lähde ennen seuraavaa tiedostoa.
 */
function parit(sisalto) {
  const merkit = [];
  // Heittomerkillinen nimi ("Château d'If") kirjoitetaan kaksois-
  // lainausmerkkeihin, joten kumpikin muoto on luettava — muuten juuri
  // ne kuvat jäävät ilman tekijämerkintää.
  const kuvio = /(tiedosto|lahde): (?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g;
  for (const m of sisalto.matchAll(kuvio)) {
    merkit.push({
      laji: m[1],
      arvo: (m[2] ?? m[3]).replace(/\\(['"\\])/g, '$1'),
      kohta: m.index,
      koko: m[0],
      lainaus: m[2] !== undefined ? "'" : '"',
    });
  }
  const ulos = [];
  for (let i = 0; i < merkit.length; i += 1) {
    if (merkit[i].laji !== 'tiedosto') continue;
    const seuraava = merkit.slice(i + 1).find((x) => x.laji === 'lahde');
    const seuraavaTiedosto = merkit.slice(i + 1).find((x) => x.laji === 'tiedosto');
    if (!seuraava) continue;
    if (seuraavaTiedosto && seuraavaTiedosto.kohta < seuraava.kohta) continue;
    ulos.push({
      tiedosto: merkit[i].arvo,
      lahde: seuraava.arvo,
      // Kohta ja pituus, ei merkkijono: sama lähdeteksti ("Commons
      // (CC BY-SA 3.0)") toistuu kymmenillä kuvilla, ja merkkijonoon
      // osuva replace kirjoittaisi tekijän aina tiedoston ensimmäiseen
      // esiintymään — eli väärän kuvan kohdalle.
      kohta: seuraava.kohta,
      pituus: seuraava.koko.length,
      lainaus: seuraava.lainaus,
    });
  }
  return ulos;
}

const tiedostot = readdirSync(join(JUURI, 'js/packs')).filter((f) => f.endsWith('.js'));
const kaikki = new Map(); // tiedostonimi -> lähdemerkintöjen joukko
const paketit = new Map();
for (const f of tiedostot) {
  const s = readFileSync(join(JUURI, 'js/packs', f), 'utf8');
  paketit.set(f, s);
  for (const p of parit(s)) {
    if (!kaikki.has(p.tiedosto)) kaikki.set(p.tiedosto, new Set());
    kaikki.get(p.tiedosto).add(p.lahde);
  }
}

const tarvitsevat = [...kaikki.entries()]
  .filter(([, lahteet]) => [...lahteet].some((l) => vaatiiTekijan(l) && !onJoTekija(l)));

console.log(`Kuvia paketeissa: ${kaikki.size}`);
console.log(`Näistä CC BY / CC BY-SA ilman tekijää: ${tarvitsevat.length}\n`);

// --- haetaan tekijät Commonsista --------------------------------------------

const nimet = tarvitsevat.map(([t]) => t);
const tekijat = new Map();
const commonsLisenssi = new Map();
for (let i = 0; i < nimet.length; i += 25) {
  const era = nimet.slice(i, i + 25);
  let d;
  try {
    d = hae('https://commons.wikimedia.org/w/api.php?format=json&action=query'
      + '&prop=imageinfo&iiprop=user|extmetadata'
      + '&iiextmetadatafilter=Artist|Attribution|LicenseShortName'
      + '&titles=' + encodeURIComponent(era.map((t) => `File:${t}`).join('|')));
  } catch (e) {
    console.log(`  haku epäonnistui erässä ${i}: ${e.message.slice(0, 50)}`);
    nuku(5);
    continue;
  }
  const alkuun = new Map((d.query?.normalized ?? []).map((n) => [n.to, n.from]));
  for (const sivu of Object.values(d.query?.pages ?? {})) {
    const nimi = (alkuun.get(sivu.title) ?? sivu.title).replace(/^File:/, '');
    const tiedot = sivu.imageinfo?.[0];
    const m = tiedot?.extmetadata;
    if (!m) continue;
    // Attribution on kuvaajan itse toivoma merkintä ja siksi Artistia
    // parempi silloin kun se on. Artist voi olla pelkkä verkko-osoite.
    // Jos kumpaakaan ei ole, jäljelle jää lataaja: Commonsissa se on
    // näissä tapauksissa myös teoksen tekijä.
    const tekija = siisti(m.Attribution?.value) || siisti(m.Artist?.value) || (tiedot.user ?? '');
    if (tekija) tekijat.set(nimi, tekija);
    commonsLisenssi.set(nimi, siisti(m.LicenseShortName?.value));
  }
  process.stdout.write(`  haettu ${Math.min(i + 25, nimet.length)}/${nimet.length}\r`);
  nuku(2);
}
console.log('');

// --- kirjoitetaan lähdemerkinnät uusiksi -------------------------------------

let muutettu = 0;
const ristiriidat = [];
const ilmanTekijaa = [];

for (const [f, alkuperainen] of paketit) {
  // Kerätään korvaukset ja tehdään ne lopusta alkuun, jotta aiemmat
  // kohdat eivät siirry.
  const korvaukset = [];
  for (const p of parit(alkuperainen)) {
    if (!vaatiiTekijan(p.lahde) || onJoTekija(p.lahde)) continue;
    const tekija = tekijat.get(p.tiedosto);
    const commons = commonsLisenssi.get(p.tiedosto);
    if (commons && !p.lahde.includes(commons)) {
      ristiriidat.push([p.tiedosto, p.lahde, commons]);
    }
    if (!tekija) { ilmanTekijaa.push(p.tiedosto); continue; }
    /*
     * Kun merkinnässä oli VAIN lisenssi, tekijän eteen liittäminen
     * tuottaisi "Diego Delso, CC BY-SA 4.0" — nimi olisi paikallaan
     * mutta alusta puuttuisi ja muoto poikkeaisi muista. Silloin
     * merkintä kirjoitetaan kokonaan vakiomuotoon.
     */
    const uusi = PELKKA_LISENSSI(p.lahde)
      ? `${tekija}, Wikimedia Commons (${p.lahde.trim()})`
      : `${tekija}, ${p.lahde}`;
    // Sama lainausmerkki takaisin kuin alkuperäisessä.
    const q = p.lainaus ?? "'";
    const sisus = uusi.replace(new RegExp(q, 'g'), `\\${q}`);
    korvaukset.push({
      kohta: p.kohta,
      pituus: p.pituus,
      teksti: `lahde: ${q}${sisus}${q}`,
    });
  }
  if (!korvaukset.length) continue;
  let s = alkuperainen;
  for (const k of korvaukset.sort((a, b) => b.kohta - a.kohta)) {
    s = s.slice(0, k.kohta) + k.teksti + s.slice(k.kohta + k.pituus);
    muutettu += 1;
  }
  if (KIRJOITA) writeFileSync(join(JUURI, 'js/packs', f), s);
}

console.log(`Lähdemerkintöjä täydennetty: ${muutettu}`);
if (ilmanTekijaa.length) {
  console.log(`\nEi tekijätietoa Commonsissa (${ilmanTekijaa.length}) — tarkista käsin:`);
  for (const n of ilmanTekijaa.slice(0, 20)) console.log('  ?', n);
}
if (ristiriidat.length) {
  console.log(`\nLISENSSI EI TÄSMÄÄ (${ristiriidat.length}) — paketissa väärä tieto:`);
  for (const [n, oma, commons] of ristiriidat.slice(0, 20)) {
    console.log(`  ✗ ${n}\n      paketissa: ${oma}\n      Commons:   ${commons}`);
  }
}
// --- liput ------------------------------------------------------------------
//
// Lippukuvilla ei ole lähdekenttää: ne näytetään pieninä tervehdysten
// vieressä, eikä jokaisen alle mahdu tekijäriviä. Valtaosa on public
// domainia, mutta muutama on CC BY-SA ja vaatii nimeämisen. Ne kerätään
// omaan tiedostoonsa, jonka peli näyttää periaatelapun lopussa.

const liput = new Set();
for (const s of paketit.values()) {
  for (const m of s.matchAll(/lippu: '((?:[^'\\]|\\.)*)'/g)) {
    liput.add(m[1].replace(/\\(['"\\])/g, '$1'));
  }
}

const lippuTekijat = [];
const lippuLista = [...liput];
for (let i = 0; i < lippuLista.length; i += 25) {
  const era = lippuLista.slice(i, i + 25);
  let d;
  try {
    d = hae('https://commons.wikimedia.org/w/api.php?format=json&action=query'
      + '&prop=imageinfo&iiprop=extmetadata&iiextmetadatafilter=Artist|LicenseShortName'
      + '&titles=' + encodeURIComponent(era.map((t) => `File:${t}`).join('|')));
  } catch { nuku(5); continue; }
  const alkuun = new Map((d.query?.normalized ?? []).map((n) => [n.to, n.from]));
  for (const sivu of Object.values(d.query?.pages ?? {})) {
    const nimi = (alkuun.get(sivu.title) ?? sivu.title).replace(/^File:/, '');
    const m = sivu.imageinfo?.[0]?.extmetadata;
    if (!m) continue;
    const lisenssi = siisti(m.LicenseShortName?.value);
    if (!vaatiiTekijan(lisenssi)) continue;
    lippuTekijat.push({ tiedosto: nimi, tekija: siisti(m.Artist?.value), lisenssi });
  }
  nuku(2);
}

lippuTekijat.sort((a, b) => a.tiedosto.localeCompare(b.tiedosto, 'fi'));
console.log(`\nLippuja: ${liput.size}, näistä nimeämistä vaativia: ${lippuTekijat.length}`);
for (const l of lippuTekijat) console.log(`  ${l.lisenssi} — ${l.tekija} — ${l.tiedosto}`);

if (KIRJOITA) {
  const rivit = lippuTekijat.map((l) => `  { tiedosto: '${l.tiedosto.replace(/'/g, "\\'")}', `
    + `tekija: '${l.tekija.replace(/'/g, "\\'")}', lisenssi: '${l.lisenssi}' },`).join('\n');
  writeFileSync(join(JUURI, 'js/packs/lippu-tekijat.js'),
    `// Lippukuvien tekijät, jotka lisenssi vaatii nimeämään.\n`
    + `//\n`
    + `// Liput näytetään pieninä tervehdysten vieressä, eikä jokaisen alle\n`
    + `// mahdu omaa lähderiviä. Valtaosa lipuista on public domainia, joten\n`
    + `// tässä ovat vain ne muutama, joiden lisenssi (CC BY / CC BY-SA)\n`
    + `// edellyttää tekijän nimeämistä. Peli näyttää listan periaatelapun\n`
    + `// lopussa.\n`
    + `//\n`
    + `// Tuotettu komennolla tools/lisaa-tekijat.mjs --kirjoita.\n`
    + `// Älä muokkaa käsin: uusi lippu ilmestyy tänne ajamalla työkalu.\n`
    + `export const LIPPU_TEKIJAT = [\n${rivit}\n];\n`);
  console.log('  → js/packs/lippu-tekijat.js kirjoitettu');
}

console.log(KIRJOITA ? '\nKirjoitettu.' : '\nKuivaharjoitus — aja --kirjoita tehdäksesi muutokset.');
