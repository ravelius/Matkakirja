/*
 * PAKETIN SKEEMATARKISTUS ILMAN RIIPPUVUUKSIA (Siirtoseppä 23.9.2026).
 *
 * Projektissa ei ole build-vaihetta eikä npm-riippuvuuksia, joten tämä
 * on JSON Schema 2020-12:n se osajoukko, jota tools/vienti/skeema/
 * käyttää: $ref (saman kansion tiedosto, "#" tai "#/$defs/…"), $defs, type, const, enum,
 * required, properties, additionalProperties, items, prefixItems,
 * minItems, maxItems, oneOf, anyOf, propertyNames, pattern, minimum,
 * maximum. `format` ja `contentEncoding` ovat pelkkiä merkintöjä, kuten
 * standardissakin oletuksena. Tuntematon avainsana kaataa tarkistuksen, jotta skeemaan
 * ei hiivi sääntöä, jota kukaan ei oikeasti valvo.
 *
 * Käyttäjät: tools/vienti/julkaise-sisalto.mjs (CI ei vie ämpäriin
 * pakettia, joka ei läpäise) ja tests/sisaltopaketti.test.mjs.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKEEMAT = join(dirname(fileURLToPath(import.meta.url)), 'skeema');
const TUETUT = new Set(['$schema', '$id', '$defs', 'title', 'description', 'format', 'contentEncoding', '$ref', 'type', 'const',
  'enum', 'required', 'properties', 'additionalProperties', 'items', 'prefixItems', 'minItems',
  'maxItems', 'oneOf', 'anyOf', 'propertyNames', 'pattern', 'minimum', 'maximum']);

const valimuisti = new Map();
export function lueSkeema(nimi) {
  if (!valimuisti.has(nimi)) valimuisti.set(nimi, JSON.parse(readFileSync(join(SKEEMAT, nimi), 'utf8')));
  return valimuisti.get(nimi);
}

function tyyppi(arvo) {
  if (arvo === null) return 'null';
  if (Array.isArray(arvo)) return 'array';
  if (Number.isInteger(arvo)) return 'integer';
  return typeof arvo;
}

function sopiiTyyppiin(arvo, t) {
  const oma = tyyppi(arvo);
  return oma === t || (t === 'number' && oma === 'integer');
}

/**
 * Tarkistaa arvon skeemaa vasten. Palauttaa virhelistan (tyhjä = kelpaa),
 * enintään `raja` virhettä, jotta rikkinäinen paketti ei tulvi lokia.
 */
export function validoi(arvo, skeema, { juuri = skeema, polku = '$', virheet = [], raja = 20 } = {}) {
  const lisaa = (viesti) => { if (virheet.length < raja) virheet.push(`${polku}: ${viesti}`); };
  if (skeema === true) return virheet;
  if (skeema === false) { lisaa('ei sallittu'); return virheet; }
  for (const avain of Object.keys(skeema)) {
    if (!TUETUT.has(avain)) throw new Error(`validoi.mjs ei tue avainsanaa "${avain}" (${polku})`);
  }
  const ali = (a, s, p, j = juuri) => validoi(a, s, { juuri: j, polku: p, virheet, raja });

  if (skeema.$ref) {
    const [tiedosto, osoitin = ''] = skeema.$ref.split('#');
    const kohdeJuuri = tiedosto ? lueSkeema(tiedosto) : juuri;
    // JSON pointer saman skeeman sisällä (#/$defs/merkinta).
    const kohde = osoitin.split('/').filter(Boolean).reduce((o, k) => o[k], kohdeJuuri);
    ali(arvo, kohde, polku, kohdeJuuri);
  }
  if (skeema.type) {
    const tyypit = [].concat(skeema.type);
    if (!tyypit.some((t) => sopiiTyyppiin(arvo, t))) {
      lisaa(`tyyppi ${tyyppi(arvo)}, odotettiin ${tyypit.join('|')}`);
      return virheet;
    }
  }
  if ('const' in skeema && JSON.stringify(arvo) !== JSON.stringify(skeema.const)) lisaa(`ei ole ${JSON.stringify(skeema.const)}`);
  if (skeema.enum && !skeema.enum.some((e) => JSON.stringify(e) === JSON.stringify(arvo))) lisaa(`ei sallittu arvo ${JSON.stringify(arvo)}`);
  if (typeof arvo === 'string' && skeema.pattern && !new RegExp(skeema.pattern, 'u').test(arvo)) lisaa(`ei vastaa kuviota ${skeema.pattern}`);
  if (typeof arvo === 'number') {
    if (skeema.minimum !== undefined && arvo < skeema.minimum) lisaa(`alle ${skeema.minimum}`);
    if (skeema.maximum !== undefined && arvo > skeema.maximum) lisaa(`yli ${skeema.maximum}`);
  }
  if (skeema.oneOf || skeema.anyOf) {
    const vaihtoehdot = skeema.oneOf ?? skeema.anyOf;
    const osuvat = vaihtoehdot.filter((s) => validoi(arvo, s, { juuri, polku, raja: 1 }).length === 0).length;
    if (skeema.oneOf ? osuvat !== 1 : osuvat === 0) lisaa(`${skeema.oneOf ? 'oneOf' : 'anyOf'}: osui ${osuvat}`);
  }
  if (Array.isArray(arvo)) {
    if (skeema.minItems !== undefined && arvo.length < skeema.minItems) lisaa(`alle ${skeema.minItems} alkiota`);
    if (skeema.maxItems !== undefined && arvo.length > skeema.maxItems) lisaa(`yli ${skeema.maxItems} alkiota`);
    const alku = skeema.prefixItems ?? [];
    arvo.forEach((a, i) => {
      const s = i < alku.length ? alku[i] : skeema.items;
      if (s !== undefined) ali(a, s, `${polku}[${i}]`);
    });
  } else if (arvo && typeof arvo === 'object') {
    for (const k of skeema.required ?? []) if (!(k in arvo)) lisaa(`puuttuu kenttä ${k}`);
    const ominaisuudet = skeema.properties ?? {};
    for (const [k, v] of Object.entries(arvo)) {
      if (skeema.propertyNames) ali(k, skeema.propertyNames, `${polku}{${k}}`);
      if (k in ominaisuudet) ali(v, ominaisuudet[k], `${polku}.${k}`);
      else if (skeema.additionalProperties !== undefined) ali(v, skeema.additionalProperties, `${polku}.${k}`);
    }
  }
  return virheet;
}

/** Validoi skeematiedoston nimellä. */
export const validoiNimella = (arvo, nimi, asetukset) => validoi(arvo, lueSkeema(nimi), asetukset);
