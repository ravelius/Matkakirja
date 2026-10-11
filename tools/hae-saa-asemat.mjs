#!/usr/bin/env node
/*
 * SÄÄASEMIEN NORMAALIT en-Wikipedian ilmastotaulukoista (Päätoimittaja 11.10.2026).
 *
 *   node tools/hae-saa-asemat.mjs <ulos.json>
 *
 * Korvaa tools/hae-saaperusdata.mjs:n otosvuosimenetelmän (Open-Meteon ERA5-ruutu ~25 km ja vain
 * vuodet 1992/2006/2020), joka antoi 24.9.2026 lisätyille 66 riville vääriä "normaaleja". Jokaiselle
 * tools/saa-asemat.json:n kaupungille kokeillaan ehdokasartikkelit järjestyksessä ja otetaan
 * ensimmäinen kelvollinen "Climate data for …" -taulukko: kausi luetaan taulukon otsikosta (ei
 * arvata), keskilämpö Daily mean -riviltä tai (ylin + alin) / 2, sade millimetreinä; taulukko, jonka
 * vuosisade ei täsmää kuukausien summaan, hylätään. Jäsennin on sama kuin Päätoimittajan
 * paakaupungit-pilvi/tyokalu.mjs:n saa-komennossa, paitsi että kauden viiva voi olla myös
 * miinusmerkki (Kanadan ja NOAA:n taulukot: "1991−2020").
 *
 * Sivut haetaan osoitteesta en.wikipedia.org/wiki/<otsikko>, jonka robots.txt sallii (/w/api.php on
 * kielletty). Tulos: { id: { kausi, keskilampo, ylin, alin, sade, artikkeli, revisio, taulukko, … } }
 * tai { id: { syyt } }, kun kelvollista taulukkoa ei löytynyt (rivi poistetaan saatiedot.js:stä).
 * Asemanimi (asema) on lahde-kentän nimi: "sääasema <asema>, en-Wikipedia".
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const UA = { 'User-Agent': 'Matkakirja-saanormaalit/1.0 (https://github.com/ravelius/Matkakirja)' };
const htmlTeksti = (s) => String(s).replace(/<style[\s\S]*?<\/style>/g, '').replace(/<sup[\s\S]*?<\/sup>/g, '')
  .replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/&#160;|&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&#8211;|&ndash;/g, '–').replace(/\s+/g, ' ').trim();
const soluLuku = (td) => {
  const t = htmlTeksti(td.split(/<br\s*\/?>/)[0]).replace(/[−–]/g, '-').replace(/,/g, '');
  const m = t.match(/^-?\d+(?:\.\d+)?/);
  return m ? Number(m[0]) : null;
};

// Kaikki sivun ilmastotaulukot: otsikko ("Climate data for …"), rivit { otsikko: [12 kk + vuosi] }, lähderivit.
function ilmastotaulukot(html) {
  const ulos = [];
  for (let i = html.indexOf('Climate data for'); i >= 0; i = html.indexOf('Climate data for', i + 1)) {
    const alku = html.lastIndexOf('<table', i);
    const loppu = html.indexOf('</table>', i);
    if (alku < 0 || loppu < 0) break;
    const rivit = {};
    const lahteet = [];
    let otsikko = null;
    for (const m of html.slice(alku, loppu).matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
      const th = m[1].match(/<th[^>]*>([\s\S]*?)<\/th>/);
      const tdt = [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((x) => x[1]);
      if (th && /Climate data for/.test(th[1])) otsikko = htmlTeksti(th[1]).replace(/^[\s\S]*?(Climate data for)/, '$1');
      else if (th && tdt.length >= 12) rivit[htmlTeksti(th[1])] = tdt.map(soluLuku);
      else if (!th && tdt.length === 1) lahteet.push(htmlTeksti(tdt[0]));
    }
    if (otsikko) ulos.push({ otsikko, rivit, lahteet: lahteet.join(' | ') });
    i = loppu;
  }
  return ulos;
}

// Yksi taulukko säärivisi: { kausi, keskilampo, ylin, alin, sade, menetelmä } tai { syy }.
function taulukostaSaarivi(t) {
  let kausi = null;
  for (const m of t.otsikko.matchAll(/(\d{4})\s*[–\-−—]\s*(\d{4})/g)) {
    if (/(extreme|record)s?\W*$/i.test(t.otsikko.slice(Math.max(0, m.index - 14), m.index))) continue;
    kausi = `${m[1]}–${m[2]}`;
    break;
  }
  if (!kausi) return { syy: 'otsikossa ei normaalikautta (vuosiväliä ei arvata)' };
  const rivi = (re) => Object.entries(t.rivit).find(([nimi, arvot]) => re.test(nimi)
    && arvot.slice(0, 12).every((x) => Number.isFinite(x)));
  const lampo = (re) => {
    const r = rivi(re);
    if (!r) return null;
    const F = /°F\s*\(°C\)/.test(r[0]);
    return { nimi: r[0], arvot: r[1].slice(0, 12).map((x) => (F ? ((x - 32) * 5) / 9 : x)) };
  };
  const ka = lampo(/^Daily mean °[CF]/i);
  const yl = lampo(/^(Mean daily maximum|Average high) °[CF]/i);
  const al = lampo(/^(Mean daily minimum|Average low) °[CF]/i);
  const kymm = (x) => Math.round(x * 10);
  let keskilampo = null;
  let lampoTapa = null;
  if (ka) { keskilampo = ka.arvot.map((x) => kymm(x) / 10); lampoTapa = ka.nimi; } else if (yl && al) {
    keskilampo = yl.arvot.map((x, k) => Math.round((kymm(x) + kymm(al.arvot[k])) / 2) / 10);
    lampoTapa = '(ylin + alin) / 2: taulukossa ei Daily mean -riviä';
  }
  if (!keskilampo) return { syy: 'ei keskilämpöä (Daily mean tai ylin + alin)' };
  const sr = rivi(/^Average precipitation (mm|cm|inches)/i) ?? rivi(/^Average rainfall (mm|cm|inches)/i);
  if (!sr) return { syy: 'ei sademäärää millimetreinä' };
  const kerroin = /^Average \w+ inches/i.test(sr[0]) ? 25.4 : /^Average \w+ cm/i.test(sr[0]) ? 10 : 1;
  const sade = sr[1].slice(0, 12).map((x) => Math.round(x * kerroin));
  const vuosi = Number.isFinite(sr[1][12]) ? Math.round(sr[1][12] * kerroin) : null;
  const summa = sade.reduce((a, b) => a + b, 0);
  const huomiot = [];
  // Ristiriitainen taulukko (esim. Tiranan lentoasema 11.10.2026: vuosi 1252, kuukaudet yhteensä 1152) hylätään:
  // jompikumpi luku on väärin, eikä kumpaa tahansa saa valita hiljaa.
  if (vuosi != null && Math.abs(vuosi - summa) > Math.max(5, 0.03 * vuosi)) return { syy: `vuosisarake ${vuosi} mm ≠ kuukausien summa ${summa} mm (taulukossa virhe)` };
  if (keskilampo.some((x) => x < -40 || x > 45) || sade.some((x) => x < 0 || x > 1500)) return { syy: 'epäuskottavia lukuja (yksikkö?)' };
  const [a, b] = kausi.split('–').map(Number);
  if (b - a + 1 < 10) huomiot.push(`lyhyt kausi ${kausi}`);
  if (/rainfall/i.test(sr[0])) huomiot.push('sade = vain vesisade (Average rainfall)');
  const ulos = { kausi, keskilampo, sade, lampoTapa, sadeRivi: sr[0], vuosisade: summa, huomiot };
  if (yl && al) {
    ulos.ylin = yl.arvot.map((x) => Math.round(x));
    ulos.alin = al.arvot.map((x) => Math.round(x));
    if (keskilampo.some((x, k) => x > yl.arvot[k] + 0.05 || x < al.arvot[k] - 0.05)) huomiot.push('keskilämpö ei ole ylimmän ja alimman välissä');
  }
  return ulos;
}

const wikidataEnOtsikko = async (q) => {
  const d = await haeJson(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks|claims&sitefilter=enwiki&ids=${q}`);
  const e = d.entities?.[q];
  return { otsikko: e?.sitelinks?.enwiki?.title ?? null, maa: e?.claims?.P17?.[0]?.mainsnak?.datavalue?.value?.id ?? null };
};

async function sivu(otsikko) {
  for (let y = 1; ; y += 1) {
    try {
      const v = await fetch(`https://en.wikipedia.org/wiki/${encodeURIComponent(otsikko.replace(/ /g, '_'))}`,
        { headers: UA, signal: AbortSignal.timeout(60000) });
      if (v.status === 429 || v.status >= 500) throw new Error(`HTTP ${v.status}`);
      if (!v.ok) return null;
      const html = await v.text();
      const rev = Number((html.match(/"wgRevisionId":(\d+)/) || [])[1]) || null;
      const nimi = JSON.parse((html.match(/"wgPageName":("[^"]*")/) || [, '""'])[1]).replace(/_/g, ' ');
      return { html, rev, nimi };
    } catch (e) {
      if (y >= 5) throw e;
      await new Promise((r) => setTimeout(r, 2000 * 2 ** y));
    }
  }
}

const ulos = process.argv[2];
if (!ulos) throw new Error('käyttö: node tools/hae-saa-asemat.mjs <ulos.json>');
const asemat = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'saa-asemat.json'), 'utf8'));
const luettu = new Date().toISOString().slice(0, 10);
const tulos = {};
for (const [id, { ehdokkaat }] of Object.entries(asemat)) {
  const syyt = [];
  let valittu = null;
  for (const o of ehdokkaat) {
    const s = await sivu(o);
    await new Promise((r) => setTimeout(r, 400));
    if (!s) { syyt.push(`${o}: ei sivua`); continue; }
    const taulut = ilmastotaulukot(s.html);
    if (!taulut.length) { syyt.push(`${o}: ei ilmastotaulukkoa`); continue; }
    for (const t of taulut) {
      const r = taulukostaSaarivi(t);
      if (r.syy) { syyt.push(`${o}: "${t.otsikko}": ${r.syy}`); continue; }
      valittu = { ...r, artikkeli: s.nimi, revisio: s.rev, taulukko: t.otsikko, lahteet: t.lahteet, luettu };
      break;
    }
    if (valittu) break;
  }
  tulos[id] = valittu ?? { syyt };
  console.log(valittu ? `${id}: ${valittu.taulukko} [${valittu.artikkeli}] ${valittu.kausi}, ${valittu.vuosisade} mm`
    : `EI ${id}: ${syyt.join(' · ')}`);
}
writeFileSync(ulos, `${JSON.stringify(tulos, null, 1)}\n`);
