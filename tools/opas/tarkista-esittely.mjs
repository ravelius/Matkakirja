#!/usr/bin/env node
/*
 * ESIGENEROIDUN ESITTELYN KONEELLINEN TARKISTUS (Päätoimittaja 7.10.2026): ajetaan kirjoittaja- ja tarkistaja-agentin
 * jälkeen ennen vientiä ja ääntä. Virhe → exit 1. Kieltä ja faktoja tämä ei arvioi (se on tarkistaja-agentin työ),
 * vain muodon: pituudet, nimi alussa, perspektiivi, numeromuodot, isoisän määrä, lähteet ja puheteksti ilman numeroita.
 *
 * Käyttö: node tools/opas/tarkista-esittely.mjs <pohja.json> <esittely.json> [...]  (pareittain)
 */
import { readFileSync } from 'node:fs';
import { vuosiluvutSanoiksi } from '../pollo/puhesanat.js';

const sanat = (t) => String(t ?? '').split(/\s+/).filter(Boolean).length;
const SEISOO = /(?<![\p{L}])(seisot|seisotte|kävelet|kävelette|olet nyt|katso (suoraan )?ylös|tässä edessäsi|edessäsi näet)(?![\p{L}])/iu;
const LYHENNE = /(?<![\p{L}\d])(esim|mm|ns|n|ks|jne|eKr|jKr|kpl|km|m|St|Pt)\.(?=\s|$)/u;
const LUOKAT = ['katu', 'kanava', 'aukio', 'rakennus', 'torni', 'kirkko', 'linnoitus', 'puisto', 'vesi', 'silta', 'muu'];

/** Yhden kaupungin virheet ja huomiot: { virheet: [], huomiot: [] }. */
export function tarkistaEsittely(pohja, e) {
  const virheet = [], huomiot = [];
  const v = (id, viesti) => virheet.push(`${id}: ${viesti}`);
  const ids = new Set(e.kohteet.map((k) => k.id));
  for (const k of pohja.kohteet) if (!ids.has(k.id)) v(k.id, `puuttuu (${k.nimi})`);
  const kierros = new Set(pohja.kierros);
  let isoisia = 0;
  for (const k of e.kohteet) {
    const p = pohja.kohteet.find((x) => x.id === k.id);
    if (!p) { v(k.id, 'ei pohjassa'); continue; }
    if (k.nimi !== p.nimi) v(k.id, `nimi "${k.nimi}" ≠ pohjan "${p.nimi}"`);
    const n = sanat(k.teksti);
    if (n < 60 || n > 95) v(k.id, `teksti ${n} sanaa (65–90)`);
    else if (n < 65 || n > 90) huomiot.push(`${k.id}: teksti ${n} sanaa (65–90)`);
    if (kierros.has(k.id)) {
      const m = sanat(k.lyhyt);
      if (!k.lyhyt) v(k.id, 'kierroskohteelta puuttuu lyhyt');
      else if (m > 45) v(k.id, `lyhyt ${m} sanaa (≤ 42)`);
    } else if (k.lyhyt) huomiot.push(`${k.id}: lyhyt kierroksen ulkopuolella (ei käytetä)`);
    for (const [kentta, t] of [['teksti', k.teksti], ['lyhyt', k.lyhyt], ['puhe_teksti', k.puhe_teksti], ['puhe_lyhyt', k.puhe_lyhyt]]) {
      if (!t) continue;
      const alku = p.nimi.split(/\s+/)[0].replace(/[^\p{L}-]/gu, '').slice(0, 5).toLowerCase();
      if (!t.toLowerCase().startsWith(alku)) huomiot.push(`${k.id}: ${kentta} ei ala paikan nimellä`);
      if (SEISOO.test(t)) v(k.id, `${kentta}: perspektiivi ("${t.match(SEISOO)[0]}")`);
      // Ääntäminen (omistaja 7.10.): vieraskielinen nimi tekstin alussa ääntyy koko alun vieraalla kielellä.
      if (!kentta.startsWith('puhe') && /^[^\s,.]*[éèêëàâçœôûùíóúñřšžčěůý]/i.test((kentta === 'teksti' ? k.puhe_teksti : k.puhe_lyhyt) || t)) huomiot.push(`${k.id}: ${kentta} alkaa vieraskielisellä nimellä (ääntö)`);
      if (LYHENNE.test(t)) v(k.id, `${kentta}: lyhenne ("${t.match(LYHENNE)[0]}")`);
      if (/\b[IVX]{2,}\b/.test(vuosiluvutSanoiksi((kentta === 'teksti' ? k.puhe_teksti : kentta === 'lyhyt' ? k.puhe_lyhyt : t) || t))) v(k.id, `${kentta}: roomalainen numero ääneen (lisää puhe_${kentta.replace('puhe_', '')})`);
      if (/[()[\]•]/.test(t)) v(k.id, `${kentta}: sulkeet tai luettelomerkki`);
      if (/tuhat\p{L}*sata/iu.test(t)) v(k.id, `${kentta}: vuosiluku sanoina (pitää olla numeroin)`);
      if (/\d+:\p{L}/u.test(t)) v(k.id, `${kentta}: kaksoispistetaivutus`);
      const puhe = vuosiluvutSanoiksi(kentta.startsWith('puhe') ? t : (kentta === 'teksti' ? k.puhe_teksti : k.puhe_lyhyt) || t);
      if (/\d/.test(puhe)) v(k.id, `${kentta}: puhetekstiin jää numero ("${puhe.match(/\S*\d\S*/)[0]}"); muut luvut sanoina`);
    }
    if (k.isoisa || /isoisä/i.test(k.teksti ?? '') || /isoisä/i.test(k.lyhyt ?? '')) isoisia += 1;
    if (Boolean(k.isoisa) !== /isoisä/i.test(`${k.teksti ?? ''} ${k.lyhyt ?? ''}`)) v(k.id, 'isoisa-lippu ei vastaa tekstiä');
    if (!LUOKAT.includes(k.luokka)) v(k.id, `luokka "${k.luokka}"`);
    if (!Number.isInteger(k.koko_m) || k.koko_m < 20 || k.koko_m > 3000) v(k.id, `koko_m ${k.koko_m}`);
    if (sanat(k.kuvaus) > 5 || !k.kuvaus) v(k.id, `kuvaus "${k.kuvaus}"`);
    if (!k.syventava || sanat(k.syventava) > 7) v(k.id, `syventava "${k.syventava}"`);
    // Kysy-napin valmiit kysymykset (Päätoimittaja 7.10.): 5 kpl, ≤ 60 merkkiä, kysymysmerkki; vastaukset livenä.
    if (k.kysymykset === undefined) huomiot.push(`${k.id}: kysymykset puuttuvat`);
    else if (!Array.isArray(k.kysymykset) || k.kysymykset.length !== 5) v(k.id, `kysymykset: ${k.kysymykset?.length ?? 0} (pitää olla 5)`);
    else for (const q of k.kysymykset) if (typeof q !== 'string' || q.length > 60 || !q.trim().endsWith('?') || /\d/.test(q)) v(k.id, `kysymys "${q}" (≤ 60 mrk, ?, luvut sanoina)`);
    if (!Array.isArray(k.lahteet) || !k.lahteet.length) v(k.id, 'lähteet puuttuvat');
    else for (const l of k.lahteet) if (!/^(https:\/\/|kaanon:)/.test(l.url ?? '')) v(k.id, `lähteen url "${l.url}" (https:// tai kaanon:)`);
  }
  if (isoisia > 1) virheet.push(`${e.id}: isoisä ${isoisia} kohteessa (enintään 1)`);
  // Kaupungin avaus (Päätoimittaja 7.10.): { teksti, aani? }, noin 20 s eli 30–50 sanaa.
  if (e.avaus !== undefined) {
    const n = sanat(e.avaus?.teksti);
    if (n < 25 || n > 55) virheet.push(`${e.id}: avaus ${n} sanaa (30–50)`);
    if (/[()[\]•]/.test(e.avaus?.teksti ?? '') || /\d/.test(vuosiluvutSanoiksi(e.avaus?.teksti ?? ''))) virheet.push(`${e.id}: avauksen muoto (sulkeet tai numero)`);
  } else huomiot.push(`${e.id}: avaus puuttuu`);
  // Päätoimittaja 7.10.: sama vinkin alku enintään kerran per kaupunki.
  const vinkit = e.kohteet.filter((k) => /kun tulet paikalle/i.test(`${k.teksti} ${k.lyhyt ?? ''}`)).length;
  if (vinkit > 1) virheet.push(`${e.id}: "Kun tulet paikalle" ${vinkit} kohteessa (enintään 1)`);
  return { virheet, huomiot };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = process.argv.slice(2);
  let virheita = 0;
  for (let i = 0; i < a.length; i += 2) {
    const pohja = JSON.parse(readFileSync(a[i], 'utf8')), e = JSON.parse(readFileSync(a[i + 1], 'utf8'));
    const { virheet, huomiot } = tarkistaEsittely(pohja, e);
    const merkit = e.kohteet.reduce((s, k) => s + vuosiluvutSanoiksi(k.puhe_teksti || k.teksti).length + (k.lyhyt ? vuosiluvutSanoiksi(k.puhe_lyhyt || k.lyhyt).length : 0), 0);
    console.log(`${e.kaupunki}: ${e.kohteet.length} kohdetta, ${virheet.length} virhettä, ${huomiot.length} huomiota, puhetta ${merkit} merkkiä`);
    for (const x of virheet) console.log(`  VIRHE ${x}`);
    for (const x of huomiot) console.log(`  huomio ${x}`);
    virheita += virheet.length;
  }
  process.exit(virheita ? 1 : 0);
}
