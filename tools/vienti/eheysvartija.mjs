#!/usr/bin/env node
/*
 * EHEYSVARTIJA (Siirtoseppä 27.9.2026, Fablen tilaus): Euroopan eheystarkistus pysyvänä
 * (docs/raportit/siirtoseppa-eurooppa-eheys-20260927.md).
 *
 *   node tools/vienti/eheysvartija.mjs [--kaikki] [--ulos <kansio>] [--rinnakkain 32] [--versio N]
 *
 * Lukee tuotannon sisältöpaketin (sisalto/1/uusin.json → vN) ja tarkistaa Euroopan maat (offline.json
 * ryhmat.europe; --kaikki = kaikki maat):
 *   1. 404: HEAD-pyyntö jokaiseen maan offline-tiedostoon — maat.*.media, maat.*.mediaKuvat (url ja pieni) ja
 *      kaupunkitason laatat (rasteri z9, kaupunkiRasteri z10 ja skeeman 1.53 kaupunkiMaasto, tarkat välit). VAIN media.matkakirja.app:n
 *      staattiset tiedostot: EI puhetta workerilta eikä mitään muuta palvelua (Fable 27.9.: puuttuva pala
 *      generoitaisiin ja maksaisi). Maastolaatat (poltto 2026-09-23b, muuttumaton) tarkistettiin kokonaan 27.9.
 *   2. Orvot viittaukset: kokoelmien alkioiden `kaupunki`-kenttä osuu kaupunkeihin, ja kaupungin kaupunkilehti on
 *      olemassa. (Nähtävyyksiä ei lasketa: osa kaupungeista saa ne maakartoista, Sisältökirjuri 27.9.)
 *   3. Maakatto: maat.*.tavuja.mediaKuvat ≤ lahteet.mediaKuvat.katto (skeema 1.52).
 *
 * Tulos <ulos>/tulos.json ja tulos.md; <ulos>/VIKA.txt on tyhjä, kun kaikki on kunnossa, muuten yksi
 * hälytysrivi (Postivahti lukee sen). historia.log saa rivin jokaisesta ajosta. Oletuskansio
 * /Users/Shared/Claude/proto-3d/lokit/eheysvartija (Mac Studio; .github/workflows/eheysvartija.yml).
 */
import { execFile } from 'node:child_process';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const JUURI = 'https://media.matkakirja.app/';
const aja = promisify(execFile);

async function curl(args) {
  try {
    return (await aja('curl', ['-s', '--retry', '3', '--retry-delay', '2', '--max-time', '60', ...args],
      { maxBuffer: 1 << 28 })).stdout;
  } catch { return ''; }
}
async function hae(polku) {
  const teksti = await curl(['--compressed', '-f', JUURI + polku]);
  if (!teksti) throw new Error(`ei saatu: ${JUURI}${polku}`);
  return JSON.parse(teksti);
}
async function koodi(url) {
  return Number((await curl(['-o', '/dev/null', '-I', '-w', '%{http_code}', url])).trim()) || 0;
}
async function pool(lista, n, f) {
  const tulos = new Array(lista.length); let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, lista.length) }, async () => {
    while (i < lista.length) { const k = i++; tulos[k] = await f(lista[k]); }
  }));
  return tulos;
}

/** Laattavälit [x0, y0, x1, y1] tai lista niitä → "z/x/y". */
export function laatat(z, valit) {
  const lista = Array.isArray(valit?.[0]) ? valit : valit ? [valit] : [];
  const ulos = [];
  for (const [x0, y0, x1, y1] of lista) for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) ulos.push(`${z}/${x}/${y}`);
  return ulos;
}

export async function tarkista({ kaikki = false, rinnakkain = 32, versio = null } = {}) {
  const osoitin = await hae('sisalto/1/uusin.json');
  const polku = versio ? `sisalto/1/v${versio}/` : osoitin.polku;
  const offline = await hae(`${polku}offline.json`);
  const manifest = await hae(`${polku}manifest.json`);
  const maat = kaikki ? Object.keys(offline.maat) : offline.ryhmat.europe.maat;
  const rasteriUrl = offline.lahteet.rasteri.url;
  const maastoUrl = offline.lahteet.maasto.url;

  // 1. Tarkistettavat osoitteet (duplikaatit pois), ja mistä maasta kukin tuli.
  const lahde = new Map();
  const lisaa = (url, iso, laji) => { if (url?.startsWith(JUURI) && !lahde.has(url)) lahde.set(url, { iso, laji }); };
  for (const iso of maat) {
    const m = offline.maat[iso];
    if (!m) continue;
    for (const u of m.media ?? []) lisaa(u, iso, 'media');
    for (const k of m.mediaKuvat ?? []) { lisaa(k.url, iso, 'mediaKuvat'); lisaa(k.pieni, iso, 'pieni'); }
    for (const t of laatat(9, m.rasteri?.['9'])) lisaa(rasteriUrl.replace('{z}/{x}/{y}', t), iso, 'z9');
    for (const [z, v] of Object.entries(m.kaupunkiRasteri ?? {})) {
      for (const t of laatat(z, v)) lisaa(rasteriUrl.replace('{z}/{x}/{y}', t), iso, `z${z}`);
    }
    // Skeema 1.53: maaston tarkat tasot kaupunkien ympärillä (maastoUrl, TMS).
    for (const [z, v] of Object.entries(m.kaupunkiMaasto ?? {})) {
      for (const t of laatat(z, v)) lisaa(maastoUrl.replace('{z}/{x}/{y}', t), iso, `maasto${z}`);
    }
  }
  const osoitteet = [...lahde.keys()];
  const koodit = await pool(osoitteet, rinnakkain, koodi);
  // Kertaalleen epäonnistuneet (0/5xx) uudelleen hitaammin: rinnakkaiskuorma antaa satunnaisia 500:ia.
  const uusittavat = osoitteet.map((u, k) => [u, k]).filter(([, k]) => koodit[k] === 0 || koodit[k] >= 500);
  const uusitut = await pool(uusittavat, 4, ([u]) => koodi(u));
  uusittavat.forEach(([, k], j) => { koodit[k] = uusitut[j]; });
  const puuttuvat = osoitteet.map((u, k) => ({ url: u, koodi: koodit[k], ...lahde.get(u) })).filter((r) => r.koodi !== 200);

  // 2. Orvot viittaukset.
  const kaupungit = (await hae(`${polku}kokoelmat/kaupungit.json`)).alkiot;
  const kaupunkiIdt = new Set(kaupungit.map((c) => c.id));
  const tarkasteltavat = kaupungit.filter((c) => kaikki || maat.includes(c.maa));
  const orvot = [];
  for (const k of manifest.kokoelmat) {
    if (!k.tiedosto.endsWith('.json') || k.nimi === 'esilasketut') continue;
    let alkiot;
    try { alkiot = (await hae(`${polku}${k.tiedosto}`)).alkiot ?? []; } catch (e) { orvot.push({ kokoelma: k.nimi, virhe: e.message }); continue; }
    for (const a of alkiot) {
      // Vain tunnisteen muotoiset arvot (radiot.kaupunki on näyttönimi, esim. "Melbourne").
      if (typeof a?.kaupunki === 'string' && /^[a-z0-9-]+$/.test(a.kaupunki) && !kaupunkiIdt.has(a.kaupunki)) orvot.push({ kokoelma: k.nimi, id: a.id, kaupunki: a.kaupunki });
    }
  }
  const lehdetPuuttuu = [];
  const tiedostot = new Set((await hae(`${polku}hakemisto.json`)).tiedostot.map((t) => t.polku));
  for (const c of tarkasteltavat) {
    if (!tiedostot.has(`kokoelmat/kaupunkilehdet/${c.id}.json`)) lehdetPuuttuu.push(c.id);
  }

  // 3. Maakatto.
  const katto = offline.lahteet.mediaKuvat?.katto ?? null;
  const ylitykset = katto ? maat.filter((iso) => (offline.maat[iso]?.tavuja?.mediaKuvat ?? 0) > katto)
    .map((iso) => ({ iso, tavuja: offline.maat[iso].tavuja.mediaKuvat, katto })) : [];

  return {
    aika: new Date().toISOString(), versio: osoitin.versio, tarkistettuVersio: versio ?? osoitin.versio,
    skeemaversio: osoitin.skeemaversio, laajuus: kaikki ? 'kaikki' : 'europe', maita: maat.length,
    kaupunkeja: tarkasteltavat.length, tarkistettu: osoitteet.length,
    puuttuvat, orvot, lehdetPuuttuu, ylitykset,
  };
}

export function yhteenveto(t) {
  const osat = [];
  if (t.puuttuvat.length) {
    const lajeittain = {};
    for (const p of t.puuttuvat) lajeittain[p.laji] = (lajeittain[p.laji] ?? 0) + 1;
    osat.push(`${t.puuttuvat.length} puuttuu (${Object.entries(lajeittain).map(([l, n]) => `${l} ${n}`).join(', ')})`);
  }
  if (t.orvot.length) osat.push(`${t.orvot.length} orpoa viittausta`);
  if (t.lehdetPuuttuu.length) osat.push(`${t.lehdetPuuttuu.length} kaupunkilehteä puuttuu`);
  if (t.ylitykset.length) osat.push(`maakatto ylittyy: ${t.ylitykset.map((y) => y.iso).join(', ')}`);
  return osat;
}

function markdown(t, osat) {
  const r = [`# Eheysvartija ${t.aika.slice(0, 16).replace('T', ' ')} UTC — v${t.tarkistettuVersio} (${t.skeemaversio}), ${t.laajuus}`, '',
    `${t.maita} maata, ${t.kaupunkeja} kaupunkia, ${t.tarkistettu} tiedostoa HEAD-tarkistettu (vain media.matkakirja.app).`, '',
    osat.length ? `**VIKA:** ${osat.join('; ')}` : '**Kunnossa.**', ''];
  if (t.puuttuvat.length) {
    r.push('## Puuttuvat (ei 200)', '', '| Maa | Laji | Koodi | Osoite |', '|---|---|---|---|');
    for (const p of t.puuttuvat.slice(0, 300)) r.push(`| ${p.iso} | ${p.laji} | ${p.koodi} | ${p.url.slice(JUURI.length)} |`);
    if (t.puuttuvat.length > 300) r.push(`| … | | | ${t.puuttuvat.length - 300} lisää (tulos.json) |`);
    r.push('');
  }
  if (t.orvot.length) r.push('## Orvot viittaukset', '', ...t.orvot.slice(0, 100).map((o) => `- ${o.kokoelma}: ${o.id ?? ''} → ${o.kaupunki ?? o.virhe}`), '');
  if (t.lehdetPuuttuu.length) r.push(`## Kaupunkilehti puuttuu\n\n${t.lehdetPuuttuu.join(', ')}\n`);
  if (t.ylitykset.length) r.push('## Maakatto', '', ...t.ylitykset.map((y) => `- ${y.iso}: ${(y.tavuja / 1e6).toFixed(1)} Mt > ${(y.katto / 1e6).toFixed(0)} Mt`), '');
  return `${r.join('\n')}\n`;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const arvo = (nimi, oletus) => { const i = process.argv.indexOf(nimi); return i > 0 ? process.argv[i + 1] : oletus; };
  const ulos = resolve(arvo('--ulos', '/Users/Shared/Claude/proto-3d/lokit/eheysvartija'));
  const t = await tarkista({ kaikki: process.argv.includes('--kaikki'), rinnakkain: Number(arvo('--rinnakkain', 32)),
    versio: arvo('--versio', null) });
  const osat = yhteenveto(t);
  mkdirSync(ulos, { recursive: true });
  writeFileSync(join(ulos, 'tulos.json'), `${JSON.stringify(t, null, 1)}\n`);
  writeFileSync(join(ulos, 'tulos.md'), markdown(t, osat));
  const rivi = osat.length ? `EHEYSVARTIJA v${t.tarkistettuVersio} ${t.aika.slice(0, 16)}Z: ${osat.join('; ')} — ${join(ulos, 'tulos.md')}` : '';
  writeFileSync(join(ulos, 'VIKA.txt'), rivi ? `${rivi}\n` : '');
  appendFileSync(join(ulos, 'historia.log'), `${t.aika} v${t.tarkistettuVersio} ${t.laajuus} ${t.tarkistettu} tiedostoa: ${osat.length ? osat.join('; ') : 'kunnossa'}\n`);
  console.log(osat.length ? `VIKA: ${osat.join('; ')}` : `Kunnossa: v${t.tarkistettuVersio}, ${t.tarkistettu} tiedostoa, ${t.maita} maata.`);
  if (osat.length && process.env.GITHUB_ACTIONS) console.log(`::warning::${rivi}`);
}
