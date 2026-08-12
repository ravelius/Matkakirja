// Esitarkistin yhden maan aihesivuille. Ajetaan PAKETTIA vasten, ei
// välitiedostoa vasten — jäsennys ei ole todiste siitä, että sivut
// päätyivät perille.
//
//   node tarkista-maa.mjs IRN
//
// Tulostaa aina mitä tarkistettiin (aiheet, nostot, kysymykset), ei vain
// virhelistaa: nolla tarkistettua kohdetta erottuu heti "ei virheitä"
// -rivistä. Riko tarkistin tahallaan ennen kuin uskot sitä.

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const maa = process.argv[2];
if (!maa) { console.error('anna maatunnus'); process.exit(1); }

const { MAA_KATEGORIAT } = await import(join(JUURI, 'js/packs/maa-kategoriat.js'));
const aiheet = MAA_KATEGORIAT[maa];
if (!aiheet) { console.error(`${maa}: ei lohkoa maa-kategoriat.js:ssä`); process.exit(1); }

const virheet = [];
const huomiot = [];
const moiti = (s) => virheet.push(s);

// --- 0. mitä tarkistetaan -------------------------------------------------
const nostoja = aiheet.reduce((s, a) => s + (a.nostot || []).length, 0);
const tehtavia = aiheet.filter((a) => a.tehtava).length;
console.log(`# ${maa}: ${aiheet.length} aihetta, ${nostoja} nostoa, ${tehtavia} minitehtävää`);
for (const a of aiheet) {
  console.log(`  - ${a.id} (${a.nimi}): ${(a.nostot || []).length} nostoa`
    + `${a.tehtava ? '' : '  ← EI MINITEHTÄVÄÄ'}`);
}

// --- 1. rakenne -----------------------------------------------------------
for (const a of aiheet) {
  if (a.id === 'menovinkit') continue;
  const n = (a.nostot || []).length;
  if (n < 3 || n > 6) moiti(`${a.id}: ${n} nostoa (odotus 3–6)`);
  if (!a.tehtava) moiti(`${a.id}: minitehtävä puuttuu`);
  for (const k of ['id', 'nimi', 'johdanto', 'nostot']) {
    if (!a[k]) moiti(`${a.id}: kenttä ${k} puuttuu`);
  }
  for (const no of a.nostot || []) {
    for (const k of ['otsikko', 'tiedosto', 'teksti', 'selite', 'lahde']) {
      if (!no[k]) moiti(`${a.id} / ${no.otsikko || '?'}: kenttä ${k} puuttuu`);
    }
    // aika = tasokorotuksen aikamerkintä (käytössä sadoissa nostoissa).
    // wiki = "Lue lisää aiheesta" -nappi noston lopussa (ui.js tukee sitä
    // myös maalehdessä; käytössä ARE:lla ja JOR:lla). musiikki*, aani* ja
    // esikuuntelu ovat docs/tutki-aiheet.md:n mukaisia nostokenttiä —
    // ne puuttuivat listalta, joten Egyptin musiikkisivu näytti kahdelta
    // virheeltä, vaikka kentät ovat oikein (12.8.2026).
    const tuntematon = Object.keys(no).filter(
      (k) => !['otsikko', 'aika', 'tiedosto', 'teksti', 'selite', 'lahde',
        'kuvat', 'aani', 'aaniLahde', 'linkki', 'galleria', 'wiki',
        'musiikki', 'musiikkiNimi', 'musiikkiNayte', 'musiikkiNayteNimi',
        'esikuuntelu'].includes(k));
    if (tuntematon.length) moiti(`${a.id} / ${no.otsikko}: tuntematon kenttä ${tuntematon}`);
    if (no.teksti && (no.teksti.length < 300 || no.teksti.length > 1200)) {
      huomiot.push(`${a.id} / ${no.otsikko}: teksti ${no.teksti.length} merkkiä`);
    }
    // CC0 kirjoitetaan paketeissa ilman välilyöntiä ("… (CC0)"), joten
    // pelkkä /\(CC / hylkäsi kelvollisen lisenssin — ks. CYP 11.8.2026.
    // "(PD)" on docs/tutki-aiheet.md:n mukainen public domain -merkintä.
    if (no.lahde && !/\((CC |CC0|PD\)|public domain)/i.test(no.lahde)) {
      moiti(`${a.id} / ${no.otsikko}: lahde ilman lisenssiä: ${no.lahde}`);
    }
  }
}

// --- 2. minitehtävän säännöt ---------------------------------------------
const sanat = (s) => (s.toLowerCase().match(/[a-zà-ÿåäö0-9]+/gi) || []);
const puuttuvat = (vastaus, teksti) => {
  const isot = sanat(vastaus).filter((w) => w.length >= 6);
  const alut = sanat(teksti).map((w) => w.slice(0, 7));
  if (!isot.length) {
    return sanat(vastaus).some((w) => sanat(teksti).includes(w)) ? [] : sanat(vastaus);
  }
  return isot.filter((w) => !alut.includes(w.slice(0, 7)));
};
const loytyy = (vastaus, teksti) => puuttuvat(vastaus, teksti).length === 0;

for (const a of aiheet) {
  const t = a.tehtava;
  if (!t) continue;
  const oikea = t.vaihtoehdot[t.oikea];
  const tekstit = (a.nostot || []).map((n) => n.teksti).join(' ');
  const otsikot = (a.nostot || []).map((n) => n.otsikko).join(' ');
  console.log(`  ? ${a.id}: "${t.kysymys}" → "${oikea}"`);
  const pois = puuttuvat(oikea, tekstit);
  if (pois.length) {
    moiti(`${a.id}: vastausta "${oikea}" ei löydy nostotekstistä`
      + ` (sanat puuttuvat: ${pois.join(', ')})`);
  }
  if (loytyy(oikea, otsikot)) moiti(`${a.id}: vastaus vuotaa otsikkoon`);
  if (loytyy(oikea, a.johdanto)) moiti(`${a.id}: vastaus vuotaa johdantoon`);
  const pisin = Math.max(...t.vaihtoehdot.map((v) => v.length));
  const toiseksi = t.vaihtoehdot.map((v) => v.length).sort((x, y) => y - x)[1];
  if (oikea.length === pisin && pisin - toiseksi >= 3) {
    moiti(`${a.id}: oikea vaihtoehto on selvästi pisin (${pisin} vs ${toiseksi})`);
  }
  if (new Set(t.vaihtoehdot).size !== t.vaihtoehdot.length) {
    moiti(`${a.id}: kaksi samaa vaihtoehtoa`);
  }
  if (!t.fakta) moiti(`${a.id}: fakta puuttuu`);
}

// --- 3. kysymysten ainutkertaisuus koko pelissä --------------------------
const pakDir = join(JUURI, 'js/packs');
const kaikki = readdirSync(pakDir).filter((f) => f.endsWith('.js'));
let kysymyksia = 0;
const nahdyt = new Map();
for (const f of kaikki) {
  const src = readFileSync(join(pakDir, f), 'utf8');
  for (const m of src.matchAll(/kysymys:\s*'((?:[^'\\]|\\.)*)'/g)) {
    kysymyksia += 1;
    const avain = m[1].toLowerCase().replace(/\s+/g, ' ').trim();
    nahdyt.set(avain, (nahdyt.get(avain) || 0) + 1);
  }
}
console.log(`# kysymyksiä paketeissa: ${kysymyksia} (${kaikki.length} tiedostoa)`);
for (const a of aiheet) {
  if (!a.tehtava) continue;
  const avain = a.tehtava.kysymys.toLowerCase().replace(/\s+/g, ' ').trim();
  if ((nahdyt.get(avain) || 0) > 1) moiti(`${a.id}: kysymys esiintyy ${nahdyt.get(avain)} kertaa`);
}

// --- 3b. törmääkö minitehtävä kaupungin kulttuurivisaan? -----------------
// Kaupunkien visat käyttävät avainta `q:`, eikä kohta 3 näe niitä lainkaan.
// Juuri siellä törmäykset ovat: Kuwaitin visa kysyi tornien palloista, ja
// saman maan minitehtävä kysyi samaa (12.8.2026). Tämä on HUOMIO eikä
// virhe — sanaosuma voi olla sattumaa, ja ihminen ratkaisee.
let visoja = 0;
const visat = [];
for (const f of kaikki) {
  const src = readFileSync(join(pakDir, f), 'utf8');
  for (const m of src.matchAll(/\bq:\s*'((?:[^'\\]|\\.)*)'/g)) {
    visoja += 1;
    visat.push({ tiedosto: f, teksti: m[1] });
  }
}
console.log(`# kulttuurivisoja paketeissa: ${visoja}`);
const avainsanat = (s) => new Set((s.toLowerCase().match(/[a-zà-ÿåäö]{6,}/gi) || [])
  .map((w) => w.slice(0, 7)));
for (const a of aiheet) {
  if (!a.tehtava) continue;
  const oikea = a.tehtava.vaihtoehdot[a.tehtava.oikea];
  const omat = avainsanat(`${a.tehtava.kysymys} ${oikea}`);
  for (const v of visat) {
    const yhteiset = [...avainsanat(v.teksti)].filter((w) => omat.has(w));
    if (yhteiset.length >= 2) {
      huomiot.push(`${a.id}: minitehtävä muistuttaa visaa (${v.tiedosto}):`
        + ` "${v.teksti}" — yhteiset: ${yhteiset.join(', ')}`);
    }
  }
}

// --- 4. kuvaduplikaatit kaikista paketeista ------------------------------
const kuvat = new Map();
let kuvaviitteita = 0;
for (const f of kaikki) {
  const src = readFileSync(join(pakDir, f), 'utf8');
  for (const m of src.matchAll(/tiedosto:\s*'((?:[^'\\]|\\.)*)'/g)) {
    kuvaviitteita += 1;
    const nimi = m[1];
    kuvat.set(nimi, (kuvat.get(nimi) || 0) + 1);
  }
}
console.log(`# kuvaviittauksia paketeissa: ${kuvaviitteita}, eri tiedostoja: ${kuvat.size}`);
for (const a of aiheet) {
  for (const n of a.nostot || []) {
    if ((kuvat.get(n.tiedosto) || 0) > 1) {
      moiti(`${a.id} / ${n.otsikko}: kuva ${n.tiedosto} on pelissä ${kuvat.get(n.tiedosto)} kertaa`);
    }
  }
}

// --- tulos ---------------------------------------------------------------
if (huomiot.length) {
  console.log(`\n# huomiot (${huomiot.length}):`);
  for (const h of huomiot) console.log('  ·', h);
}
console.log(`\n# virheitä: ${virheet.length}`);
for (const v of virheet) console.log('  ✗', v);
process.exit(virheet.length ? 1 : 0);
