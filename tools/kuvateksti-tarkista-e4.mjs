/*
 * Erän 4 koneellinen tarkistus: lukee poimitut kohteet ja toimittajien
 * tuottamat .ulos.json-tiedostot ja tarkistaa mekaanisesti sen, minkä
 * kone voi tarkistaa:
 *
 *   1. kattavuus  — jokaiselle kohteelle on täsmälleen yksi vastine
 *   2. pituus     — uusi selite ≤ RAJA merkkiä
 *   3. virkkeet   — uusi selite ≤ 3 virkettä
 *   4. leipäteksti— uusi_teksti alkaa vanhalla teksti-arvolla (vain lisäys)
 *   5. siirto     — siirretty-virke löytyy uuden leipätekstin lopusta
 *   6. UUDET SANAT— uudessa selitteessä esiintyvät numerot ja isolla
 *                   alkavat sanat, joita EI ole vanhassa selitteessä
 *                   eikä leipätekstissä. Nämä ovat keksittyjen faktojen
 *                   pääasiallinen jälki — jokainen on katsottava silmin.
 *
 * Käyttö: node tools/kuvateksti-tarkista-e4.mjs <kaikki.json> <ulos1.json> [ulos2.json …]
 */
import { readFileSync } from 'node:fs';

const RAJA = 260;
const VIRKERAJA = 3;

const [kaikkiPolku, ...ulosPolut] = process.argv.slice(2);
const kaikki = JSON.parse(readFileSync(kaikkiPolku, 'utf8'));
const kartta = new Map(kaikki.map((k) => [k.id, k]));

const vastineet = new Map();
for (const p of ulosPolut) {
  let lista;
  try {
    lista = JSON.parse(readFileSync(p, 'utf8'));
  } catch (e) {
    console.log(`LUKUVIRHE ${p}: ${e.message}`);
    process.exitCode = 1;
    continue;
  }
  for (const v of lista) {
    if (vastineet.has(v.id)) console.log(`TUPLA: ${v.id} (${p})`);
    vastineet.set(v.id, { ...v, _tiedosto: p });
  }
}

const virkkeita = (s) => (s.replace(/\d+[.,]\d+/g, 'X').match(/[.!?](\s|$)/g) ?? []).length || 1;

// Sanat, jotka saavat esiintyä uutena ilman lippua: yleiset suomen
// isolla kirjoitetut virkkeenaloitukset tunnistetaan erikseen alla.
const normalisoi = (s) => s
  .toLowerCase()
  .replace(/[’'’]/g, '')
  .replace(/ /g, ' ');

/** Poimii numerot ja isolla alkavat sanat, jotka EIVÄT aloita virkettä. */
function tarkistettavat(teksti) {
  const ulos = new Set();
  for (const m of teksti.matchAll(/\d[\d  .,:/-]*\d|\d/g)) {
    ulos.add(m[0].trim().replace(/[.,:]$/, ''));
  }
  // Isolla alkavat sanat, joita ei edellä virkkeen loppumerkki.
  const re = /(^|[^.!?]\s|[—–-]\s)([A-ZÅÄÖ][\wåäöÅÄÖ-]{2,})/gu;
  for (const m of teksti.matchAll(re)) ulos.add(m[2]);
  return ulos;
}

const virheet = [];
const liput = [];
let muuttuneita = 0;
let siirtoja = 0;

for (const k of kaikki) {
  const v = vastineet.get(k.id);
  if (!v) { virheet.push(`PUUTTUU: ${k.id}`); continue; }
  const uusi = v.uusi_selite;
  if (typeof uusi !== 'string' || !uusi.trim()) {
    virheet.push(`TYHJÄ SELITE: ${k.id}`); continue;
  }
  if (uusi.length > RAJA) virheet.push(`PITUUS ${uusi.length}: ${k.id}`);
  if (virkkeita(uusi) > VIRKERAJA) {
    virheet.push(`VIRKKEITÄ ${virkkeita(uusi)}: ${k.id}`);
  }
  if (uusi === k.selite) virheet.push(`EI MUUTTUNUT: ${k.id}`);
  else muuttuneita += 1;

  // Leipäteksti: vain lisäys sallittu.
  if (v.uusi_teksti != null && v.uusi_teksti !== '') {
    siirtoja += 1;
    if (!v.uusi_teksti.startsWith(k.teksti)) {
      virheet.push(`LEIPÄTEKSTI MUUTTUNUT (ei pelkkä lisäys): ${k.id}`);
    }
    if (v.siirretty && !v.uusi_teksti.trimEnd().endsWith(v.siirretty.trim())) {
      virheet.push(`SIIRRETTY EI OLE LOPUSSA: ${k.id}`);
    }
  }

  // Keksittyjen faktojen jälki: uudet numerot ja erisnimet.
  const vanhaKaikki = normalisoi(`${k.selite}\n${k.teksti}\n${k.otsikko}`);
  for (const sana of tarkistettavat(uusi)) {
    if (!vanhaKaikki.includes(normalisoi(sana))) {
      liput.push(`${k.id} · UUSI "${sana}"`);
    }
  }
}

for (const id of vastineet.keys()) {
  if (!kartta.has(id)) virheet.push(`TUNTEMATON ID: ${id}`);
}

const pisin = Math.max(...[...vastineet.values()]
  .map((v) => (v.uusi_selite ?? '').length));

console.log(`Kohteita: ${kaikki.length}, vastineita: ${vastineet.size}`);
console.log(`Muuttuneita: ${muuttuneita}, leipätekstisiirtoja: ${siirtoja}`);
console.log(`Pisin uusi selite: ${pisin} merkkiä (raja ${RAJA})`);

console.log(`\nVIRHEITÄ: ${virheet.length}`);
for (const v of virheet) console.log('  ' + v);

console.log(`\nTARKISTETTAVIA UUSIA SANOJA: ${liput.length}`);
for (const l of liput) console.log('  ' + l);

if (virheet.length) process.exitCode = 1;
