#!/usr/bin/env node
/*
 * NIMIÖKETJU-TARKISTIN (KK 12.11.2026): historian hetken `nimio` on avain monessa paikassa.
 * Tarkistaa jokaiselle kohdekartan kohteelle / nähtävyysjutulle, jonka `nosto` on 'hetki-<id>':
 *   1. maakartat.js KAUPUNKIKARTAT: kohteen `nimi` = hetken `nimio` (tai otsikon alku);
 *   2. nahtavyysjutut.js: jutun avain = hetken `nimio`;
 *   3. miniatyyrit.js: jokainen avain on jonkin kaupungin kohteen nimi samassa kaupungissa;
 *   4. data/kohdekartat-sijainnit.json: jokaisen hetki-kohteen id = '<kaupunki>:<nimio>', ja jokainen avain löytyy kohteista;
 *   5. data/kohdetunnisteet.json ja data/nostopaikat.json: avaimet, jotka viittaavat hetken kohteeseen, ovat nimiön mukaisia;
 *   6. hetkien nimiöt ovat yksilölliset, ≤ 18 merkkiä ja otsikko alkaa nimiöllä.
 * Käyttö: node tools/nimio-ketju.mjs            (tulostaa taulukon; poistumiskoodi 1, jos virheitä)
 *         node tools/nimio-ketju.mjs --vanhat <tiedosto.json>  (lisäksi: jokainen vanha nimiö, jota ei enää saa esiintyä lainattuna)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { HISTORIAN_HETKET } = await import(path.join(ROOT, 'js/packs/historian-hetket.js'));
const { KAUPUNKIKARTAT } = await import(path.join(ROOT, 'js/packs/maakartat.js'));
const { NAHTAVYYSJUTUT } = await import(path.join(ROOT, 'js/packs/nahtavyysjutut.js'));
const { MINIATYYRIT } = await import(path.join(ROOT, 'js/packs/miniatyyrit.js'));
const lue = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));

const NIMIO_MAX = 18; // kyltti lyhenee tätä pitempänä (tests/historian-hetket.test.mjs)
const virheet = [];
const virhe = (s) => virheet.push(s);
const huomautukset = [];
const huom = (s) => huomautukset.push(s);
// Kohteen/jutun nimi on joko nimiö tai otsikon alku (kohdekartalla kyltti saa olla nimiötä pitempi, esim. Konstantinopoli 1453).
const sopii = (nimi, h) => nimi === h.nimio || nimi === h.otsikko.split(' — ')[0];
const hetki = new Map(HISTORIAN_HETKET.map((h) => [`hetki-${h.id}`, h]));

// 6. nimiöt
const nim = new Map();
for (const h of HISTORIAN_HETKET) {
  if (!h.nimio) { virhe(`${h.id}: nimiö puuttuu`); continue; }
  if ([...h.nimio].length > NIMIO_MAX) virhe(`${h.id}: nimiö yli ${NIMIO_MAX} merkkiä: ${h.nimio}`);
  if (!h.otsikko.startsWith(h.nimio)) virhe(`${h.id}: otsikko ei ala nimiöllä (${h.nimio} / ${h.otsikko})`);
  if (nim.has(h.nimio)) virhe(`nimiö kahdesti: ${h.nimio} (${nim.get(h.nimio)}, ${h.id})`);
  nim.set(h.nimio, h.id);
}

// 1. kohdekartat
const kohteet = []; // {kaupunki, nimi, nosto}
const kaupunkiNimet = new Map(); // kaupunki -> Set(nimi)
const kohdeListat = (k) => [...(k.kohteet ?? []), ...(k.tarinakohteet ?? []), ...(k.tarinapaikat ?? [])];
for (const [kaupunki, k] of Object.entries(KAUPUNKIKARTAT)) {
  const set = new Set();
  const kerää = (o, syv = 0) => {
    if (!o || typeof o !== 'object' || syv > 4) return;
    if (Array.isArray(o)) { o.forEach((x) => kerää(x, syv + 1)); return; }
    if (typeof o.nimi === 'string' && typeof o.lat === 'number') { set.add(o.nimi); kohteet.push({ kaupunki, nimi: o.nimi, nosto: o.nosto }); }
    for (const v of Object.values(o)) if (v && typeof v === 'object') kerää(v, syv + 1);
  };
  kerää(k);
  kaupunkiNimet.set(kaupunki, set);
}
let n1 = 0;
for (const k of kohteet) {
  const h = k.nosto && hetki.get(k.nosto);
  if (!h) continue;
  n1++;
  if (!sopii(k.nimi, h)) virhe(`maakartat ${k.kaupunki}: kohde "${k.nimi}" (nosto ${k.nosto}) ≠ nimiö "${h.nimio}"`);
}

// 2. nähtävyysjutut
let n2 = 0;
const jutut = new Map(); // kaupunki -> avaimet
for (const [kaupunki, o] of Object.entries(NAHTAVYYSJUTUT)) {
  jutut.set(kaupunki, new Set(Object.keys(o ?? {})));
  for (const [avain, j] of Object.entries(o ?? {})) {
    const h = j?.nosto && hetki.get(j.nosto);
    if (!h) continue;
    n2++;
    if (!sopii(avain, h)) virhe(`nahtavyysjutut ${kaupunki}: avain "${avain}" (nosto ${j.nosto}) ≠ nimiö "${h.nimio}"`);
  }
}

// 3. miniatyyrit
let n3 = 0;
for (const [kaupunki, o] of Object.entries(MINIATYYRIT)) {
  if (!o || typeof o !== 'object' || typeof Object.values(o)[0] !== 'string') continue;
  for (const avain of Object.keys(o)) {
    n3++;
    if (!(kaupunkiNimet.get(kaupunki)?.has(avain))) virhe(`miniatyyrit ${kaupunki}: avain "${avain}" ei ole kaupungin kohteen nimi`);
  }
}

// 4. kohdekartat-sijainnit.json
const sij = lue('data/kohdekartat-sijainnit.json');
const sijLista = Array.isArray(sij) ? sij : Object.values(sij).flat();
let n4 = 0;
for (const s of sijLista) {
  n4++;
  const [kaupunki, ...r] = String(s.id).split(':');
  if (!kaupunkiNimet.get(kaupunki)?.has(r.join(':'))) huom(`kohdekartat-sijainnit: ${s.id} ei ole kaupungin kohde (vanhentunut rivi, ei hetki)`);
  if (s.nimi !== r.join(':')) virhe(`kohdekartat-sijainnit: id ${s.id} ≠ nimi ${s.nimi}`);
}
const sijIdt = new Set(sijLista.map((s) => s.id));
let n4b = 0;
for (const k of kohteet) {
  const h = k.nosto && hetki.get(k.nosto);
  if (!h) continue;
  n4b++;
  if (!sijIdt.has(`${k.kaupunki}:${k.nimi}`)) virhe(`kohdekartat-sijainnit: puuttuu ${k.kaupunki}:${k.nimi}`);
}

// 5. kohdetunnisteet, nostopaikat
const tunn = lue('data/kohdetunnisteet.json');
let n5 = 0;
for (const avain of Object.keys(tunn)) {
  const [kaupunki, ...r] = avain.split(':');
  if (!kaupunkiNimet.get(kaupunki)?.has(r.join(':'))) huom(`kohdetunnisteet: avain ${avain} ei ole kaupungin kohde (vanhentunut rivi)`);
  else n5++;
}

// vanhat nimiöt
const vi = process.argv.indexOf('--vanhat');
let vanhatYht = 0;
if (vi > 0) {
  const vanhat = JSON.parse(fs.readFileSync(process.argv[vi + 1], 'utf8')).filter((r) => r.vanha !== r.uusi).map((r) => r.vanha);
  const lahdetiedostot = ['js/packs/maakartat.js', 'js/packs/nahtavyysjutut.js', 'js/packs/miniatyyrit.js', 'js/packs/fokusvirta-pariisi.js', 'data/kohdekartat-sijainnit.json', 'data/kohdetunnisteet.json', 'data/nostopaikat.json', 'data/aanitysjono.tsv', 'tests/fixtures/nosto-kysymykset-poikkeukset.tsv', 'js/packs/historian-hetket.js'];
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const f of lahdetiedostot) {
    const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const v of vanhat) {
      const m = t.match(new RegExp('(^|["\'`\\t:])' + esc(v) + '(?=["\'`\\t]|$)', 'gm'));
      if (m && !nim.has(v)) { vanhatYht += m.length; virhe(`vanha nimiö "${v}" ×${m.length} tiedostossa ${f}`); }
    }
  }
}

console.log(`hetkiä ${HISTORIAN_HETKET.length}, nimiöitä ${nim.size}; maakartat-hetkikohteita ${n1}, nahtavyysjuttuja ${n2}, miniatyyriavaimia ${n3}, sijaintirivejä ${n4} (hetkikohteita ${n4b}), tunnisteavaimia ${n5}${vi > 0 ? `; vanhoja viittauksia ${vanhatYht}` : ''}`);
if (huomautukset.length) { console.log(`HUOM (ei virhe) ${huomautukset.length}:`); huomautukset.forEach((v) => console.log(' - ' + v)); }
if (virheet.length) { console.log(`VIRHEITÄ ${virheet.length}:`); virheet.forEach((v) => console.log(' - ' + v)); process.exit(1); }
console.log('OK: nimiöketju ehjä');
