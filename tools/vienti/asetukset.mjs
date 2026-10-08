#!/usr/bin/env node
/*
 * ASETUKSET (Pelikoodari 5.10.2026): natiivin Peli/Asetus.cs lukee sisältöpaketista
 * valinnaisen tiedoston kokoelmat/asetukset.json. Lähde on repon data/asetukset.json.
 *
 * Muoto on TAVALLINEN OBJEKTI (ei kokoelmamuotoa { alkiot }):
 *   { "skeema": 1, "versio": "<vapaa teksti>", "aanet": {…}, "pelit": {…},
 *     "tekstit": {…}, "kamera": {…}, "osoitteet": {…} }
 * Ryhmät ovat sisäkkäisiä objekteja; lehti on luku, teksti tai totuusarvo.
 * Avain on pisteellä eroteltu polku: "aanet.MaisemanVoima" → { "aanet": { "MaisemanVoima": 0.14 } }.
 * Puuttuva avain = natiivin koodin oletus. Tyhjä { "skeema": 1, "versio": "1" } = pelkät oletukset.
 *
 * Tunnetut avaimet ja tyypit: tools/vienti/asetusavaimet.json (luku | kokonais | totuus | teksti;
 * '*' = yksi mikä tahansa polun osa, esim. pelin tai laudan id). Tuntematon avain on VAROITUS
 * (natiivi voi olla edellä), väärä tyyppi ja rikkinäinen rakenne VIRHE.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAMA = dirname(fileURLToPath(import.meta.url));
export const ASETUKSET_POLKU = 'data/asetukset.json';
export const ASETUKSET_PAKETISSA = 'kokoelmat/asetukset.json';
export const AVAINTIEDOSTO = join(TAMA, 'asetusavaimet.json');
export const JUURIRYHMAT = ['aanet', 'pelit', 'tekstit', 'kamera', 'osoitteet'];

const onOlio = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);

/** Avainlista tiedostosta tools/vienti/asetusavaimet.json: { "aanet.MaisemanVoima": "luku", … }. */
export function lueAvaimet(tiedosto = AVAINTIEDOSTO) {
  return JSON.parse(readFileSync(tiedosto, 'utf8')).avaimet;
}

/** Etsii polun tyypin avainlistasta; '*'-osa osuu mihin tahansa yhteen polun osaan. Palauttaa tyypin tai undefined. */
function tyyppiPolulle(polku, avaimet) {
  if (Object.hasOwn(avaimet, polku)) return avaimet[polku];
  const osat = polku.split('.');
  for (const [kuvio, tyyppi] of Object.entries(avaimet)) {
    if (!kuvio.includes('*')) continue;
    const k = kuvio.split('.');
    if (k.length === osat.length && k.every((o, i) => o === '*' || o === osat[i])) return tyyppi;
  }
  return undefined;
}

const TYYPIT = {
  luku: (v) => typeof v === 'number' && Number.isFinite(v),
  kokonais: (v) => typeof v === 'number' && Number.isInteger(v),
  totuus: (v) => typeof v === 'boolean',
  teksti: (v) => typeof v === 'string',
};

/**
 * Tarkistaa asetusobjektin. Palauttaa { virheet: [], varoitukset: [] }.
 * avaimet = { "polku": "luku" | "kokonais" | "totuus" | "teksti" } (lueAvaimet()).
 */
export function validoiAsetukset(obj, avaimet = lueAvaimet()) {
  const virheet = [];
  const varoitukset = [];
  if (!onOlio(obj)) {
    virheet.push('asetukset: odotettiin objektia');
    return { virheet, varoitukset };
  }
  if (obj.skeema !== 1 || !Number.isInteger(obj.skeema)) virheet.push('asetukset: skeema puuttuu tai ei ole kokonaisluku 1');
  if ('versio' in obj && typeof obj.versio !== 'string') virheet.push('asetukset: versio ei ole teksti');

  const kay = (arvo, polku) => {
    if (onOlio(arvo)) {
      for (const [k, v] of Object.entries(arvo)) kay(v, `${polku}.${k}`);
      return;
    }
    if (!['number', 'string', 'boolean'].includes(typeof arvo)) {
      virheet.push(`asetukset: ${polku}: lehden pitää olla luku, teksti tai totuusarvo (${arvo === null ? 'null' : Array.isArray(arvo) ? 'taulukko' : typeof arvo})`);
      return;
    }
    const tyyppi = tyyppiPolulle(polku, avaimet);
    if (tyyppi === undefined) varoitukset.push(`asetukset: tuntematon avain ${polku}`);
    else if (!TYYPIT[tyyppi]) virheet.push(`asetukset: ${polku}: avainlistan tyyppi ${tyyppi} on tuntematon`);
    else if (!TYYPIT[tyyppi](arvo)) virheet.push(`asetukset: ${polku}: odotettiin tyyppiä ${tyyppi}, saatiin ${JSON.stringify(arvo)}`);
  };

  for (const [ryhma, sisalto] of Object.entries(obj)) {
    if (ryhma === 'skeema' || ryhma === 'versio') continue;
    if (!onOlio(sisalto)) {
      virheet.push(`asetukset: ryhmän ${ryhma} pitää olla objekti`);
      continue;
    }
    if (!JUURIRYHMAT.includes(ryhma)) varoitukset.push(`asetukset: tuntematon juuriryhmä ${ryhma}`);
    kay(sisalto, ryhma);
  }
  return { virheet, varoitukset };
}

/** Lukee data/asetukset.json tekstinä (juuresta), tai null jos tiedostoa ei ole. */
export function lueAsetukset(juuri = resolve(TAMA, '../..')) {
  const polku = join(juuri, ASETUKSET_POLKU);
  return existsSync(polku) ? readFileSync(polku, 'utf8') : null;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const teksti = lueAsetukset();
  if (teksti === null) { console.error(`${ASETUKSET_POLKU} puuttuu`); process.exit(1); }
  const { virheet, varoitukset } = validoiAsetukset(JSON.parse(teksti));
  for (const v of varoitukset) console.warn(v);
  for (const v of virheet) console.error(v);
  process.exit(virheet.length ? 1 : 0);
}
