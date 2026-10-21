#!/usr/bin/env node
/*
 * TUOTANTOPUTKEN TARKISTUS (omistaja 20.10.2026 klo 19.12 "Tämä pitää korjata tuotantoputkeen"; PT:n tilaus Pelikoodarille).
 * Codex/Tripo-mallien ketju tilattu → toimitettu → hyväksytty → pelissä. Hälyttää, jos
 *   1. hyväksytty malli (Tripo-vientipaketti _valmiit/*-vienti-*, jonka LAHTEET.md kertoo Tripo-generoinnista, tai rekisterin
 *      docs/tuotantoputki/hyvaksytyt.json rivi) puuttuu ämpäristä, tai sitä ei viitata natiivipelin koodissa (proton master ja
 *      uusin natiiviseppa/juna-*-runko), tai viittaava luokka on kehityslipun takana pois (`static bool Paalla = false`);
 *      pakettiperheestä tarkistetaan vain uusin versio (hahmot-v1 → v2 → v3: vanhat on korvattu);
 *   2. postilaatikon 3D-tilaus (posti/<rooli>-codex-*.md, jossa Tripo/GLB/3D-malli) on ollut yli 48 h ilman toimitusta
 *      (codex-*-tiedosto tai kansio, joka mainitsee tilauksen nimen tai commitin) tai perumista.
 * Ensimmäinen löydös 20.10.: Louvren mies (k2) ja vartija hyväksytty 18.10. 11.41, ämpärissä taidemuseo/louvre-ihmiset-v1/, mutta
 * MuseoHenkilot.Paalla = false → eivät näy pelissä.
 *
 *   node tools/tuotantoputki.mjs [--valmiit <kansio>] [--proto <git-kansio>] [--viitteet ref1,ref2] [--posti-ref origin/claude/postilaatikko]
 *                                [--ulos <kansio>] [--ei-verkkoa] [--tiukka]
 * Tulos <ulos>/{tulos.json, tulos.md, VIKA.txt, historia.log} (VIKA.txt tyhjä = kunnossa; Postivahti lukee sen). Oletuskansio
 * /Users/Shared/Claude/proto-3d/lokit/tuotantoputki (Mac Studio; .github/workflows/tuotantoputki.yml). --tiukka: paluukoodi 1
 * hälytyksistä. Vain luku: HEAD-pyyntöjä media.matkakirja.app:iin, ei kirjoituksia ämpäriin, protoon eikä postilaatikkoon.
 * Puhtaat osat (testit tests/tuotantoputki.test.mjs) ovat vientejä; pääohjelma ajetaan vain suoraan kutsuttuna.
 */
import { execFile } from 'node:child_process';
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

export const MEDIA = 'https://media.matkakirja.app/';
export const TILAUS_RAJA_H = 48;

/** LAHTEET.md kertoo Tripo-generoinnista (ei pelkkää mainintaa "uusia Tripo-jobeja 0"). */
export function onTripoMalli(lahteet) {
  return /tripo-tilill|studio\.tripo3d|tripo \(kuva|tripo-malli|tripon? (?:api|rajapinn)/i.test(lahteet || '');
}

/** SHA256SUMS-rivien .glb-polut (ämpärin suhteelliset). */
export function glbPolut(sums) {
  return (sums || '').split('\n').map(r => r.trim().split(/\s+/).pop()).filter(p => p && p.endsWith('.glb')).map(p => p.replace(/^\*/, ''));
}

/** Perhe ja versio: "juoksupeli/hahmot-v3/puyi.glb" → { perhe: "juoksupeli/hahmot/puyi.glb", versio: [3, ""], kansio: "hahmot-v3/" }. */
export function perhe(polku) {
  const osat = polku.split('/');
  const nimi = osat.pop();
  let versio = [0, ''];
  const kansiot = osat.map(k => {
    const m = k.match(/^(.*?)-v(\d+)([a-z]?)$/);
    if (!m) return k;
    versio = [Number(m[2]), m[3]];
    return m[1];
  });
  return { perhe: [...kansiot, nimi].join('/'), versio, kansio: (osat[osat.length - 1] || '') + '/' };
}

export function uudempi(a, b) { return a[0] !== b[0] ? a[0] > b[0] : a[1] > b[1]; }

/** Vain uusin versio kustakin perheestä. */
export function uusimmat(polut) {
  const m = new Map();
  for (const p of polut) {
    const f = perhe(p);
    const ed = m.get(f.perhe);
    if (!ed || uudempi(f.versio, ed.versio)) m.set(f.perhe, { ...f, polku: p });
  }
  return [...m.values()];
}

/** Koodiviitteet mallille: tiedostot, joissa on mallin kansio ("louvre-ihmiset-v1/") ja tiedoston nimi ("k2" tai "k2.glb");
 *  kytkinPois = viittaava tiedosto, jonka kehityslippu on pois (static bool Paalla = false).
 *  Koottu nimi (juoksupelin aarteet: kansio + id + "-ehja.glb"): tiedostossa kansio ja pääte "-ehja.glb"/"-rikki.glb", ja id ("<id>")
 *  on lainausmerkeissä jossain pelin koodissa (idKoodissa, kutsuja hakee git grepillä). */
export function viitteet(koodi, polku, idKoodissa = false) {
  const { kansio } = perhe(polku);
  const nimi = polku.split('/').pop(), runko = nimi.replace(/\.glb$/, '');
  const paate = runko.match(/-(ehja|rikki)$/);
  const tiedostot = [], kytkinPois = [];
  for (const [tiedosto, teksti] of koodi) {
    if (!teksti.includes(kansio)) continue;
    const koottu = paate && idKoodissa && teksti.includes(`-${paate[1]}.glb"`);
    if (!teksti.includes(`"${runko}"`) && !teksti.includes(nimi) && !koottu) continue;
    tiedostot.push(tiedosto);
    if (/static\s+bool\s+Paalla\s*=\s*false\s*;/.test(teksti)) kytkinPois.push(tiedosto);
  }
  return { tiedostot, kytkinPois };
}

/** 3D-tilaus postilaatikossa: <rooli>-codex-*.md (ei kuittaus, peruutus eikä vastaus), jossa Tripo, GLB tai 3D-malli. */
export function onMallitilaus(nimi, teksti) {
  if (!/^[a-z0-9]+-codex-.*\.md$/.test(nimi) || /^codex-/.test(nimi)) return false;
  if (/kuittaus|peruttu|perutaan|vastaus|vastaanotettu/.test(nimi)) return false;
  return /\btripo\b|\btripo-|\.glb\b/i.test(teksti || '');   // ei "Tripoli"; pelkkä "3D-malli" esiintyy kuvatilausten kehotteissa
}

/** Aiheen sanat tiedoston tai kansion nimestä: lähettäjä ja vastaanottaja (kaksi ensimmäistä), päivämäärä, versiot ja yleissanat pois. */
export function aihe(nimi) {
  const osat = nimi.split('/')[0].replace(/\.md$/, '').split('-');
  const alku = /-codex-|^codex-/.test(nimi.split('/')[0]) ? 2 : 0;
  return new Set(osat.slice(alku).filter(s => s.length > 2 && !/^\d+$|^v\d+[a-z]?$|^(kuittaus|vastaus|korjaus|toimitus|tilaus|uusinta|lisa|koe|pilotti)$/.test(s)));
}

/** Toimitus vastaa tilausta aiheeltaan: vähintään kaksi yhteistä aihesanaa (tai yksi, jos jommallakummalla on vain yksi). */
export function samaAihe(tilaus, toimitus) {
  const a = aihe(tilaus), b = aihe(toimitus);
  let n = 0; for (const s of a) if (b.has(s)) n++;
  return n >= 2 || (n === 1 && Math.min(a.size, b.size) === 1);
}

/** Tilaukset ilman toimitusta: tilaukset [{nimi, sha, aika (ms)}], postit [{nimi, aika, teksti}] (kaikki posti-tiedostot).
 *  Toimitettu, jos myöhempi codex-*-tiedosto tai toimituskansio mainitsee tilauksen nimen (ilman .md) tai commitin (9 merkkiä) tai
 *  on samasta aiheesta (samaAihe: Codex ei aina viittaa tilaukseen, esim. tripo-hahmot ← juoksupeli-hahmot-tripo); suljettu, jos jokin
 *  myöhempi viesti mainitsee sen ja sanoo peruttu/perutaan. */
export function avoimetTilaukset(tilaukset, postit, nyt, rajaH = TILAUS_RAJA_H) {
  const tulos = [];
  for (const t of tilaukset) {
    if (nyt - t.aika < rajaH * 3600e3) continue;
    const avain = t.nimi.replace(/\.md$/, ''), sha = (t.sha || '').slice(0, 9);
    const mainitsee = p => p.aika >= t.aika && p.nimi !== t.nimi && (p.teksti.includes(avain) || (sha.length === 9 && p.teksti.includes(sha)));
    const codexilta = p => /^codex-/.test(p.nimi.split('/').pop()) || (p.nimi.includes('/') && !/-codex-/.test(p.nimi.split('/')[0]));
    const toimitettu = postit.some(p => codexilta(p) && p.aika >= t.aika && (mainitsee(p) || samaAihe(t.nimi, p.nimi)));
    const peruttu = postit.some(p => mainitsee(p) && /peruttu|perutaan|perun /i.test(p.teksti));
    if (!toimitettu && !peruttu) tulos.push({ ...t, ikaH: Math.round((nyt - t.aika) / 3600e3) });
  }
  return tulos;
}

// ---------------------------------------------------------------- pääohjelma (Mac Studio) ----------------------------------------------------------------
const aja = promisify(execFile);
async function git(kansio, ...args) { return (await aja('git', ['-C', kansio, ...args], { maxBuffer: 1 << 28 })).stdout; }
async function head(url) {
  try { return (await aja('curl', ['-sI', '-o', '/dev/null', '-w', '%{http_code}', '--retry', '2', '--max-time', '30', url])).stdout.trim(); }
  catch { return '000'; }
}
function arg(nimi, oletus) { const i = process.argv.indexOf(nimi); return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : oletus; }

async function main() {
  const repo = resolve(fileURLToPath(new URL('..', import.meta.url)));
  const valmiit = arg('--valmiit', '/Users/Shared/Claude/proto-3d/_valmiit');
  const proto = arg('--proto', '/Users/Shared/Claude/proto-3d/Matkakirja-proto');
  const ulos = arg('--ulos', '/Users/Shared/Claude/proto-3d/lokit/tuotantoputki');
  const postiRef = arg('--posti-ref', 'origin/claude/postilaatikko');
  const verkko = !process.argv.includes('--ei-verkkoa');
  const halytykset = [], huomiot = [];

  // 1. Hyväksytyt mallit: Tripo-vientipaketit + rekisteri.
  const mallit = new Map();   // polku → lähde
  const rekisteri = join(repo, 'docs/tuotantoputki/hyvaksytyt.json');
  const rek = existsSync(rekisteri) ? JSON.parse(readFileSync(rekisteri, 'utf8')) : {};
  // Korvatut viennit (uudempi vienti toiseen kansioon, esim. aarteet799-v1 → aarteet799-v2): ei valvota.
  const korvatut = new Set(rek.korvatut_viennit || []);
  for (const k of existsSync(valmiit) ? readdirSync(valmiit) : []) {
    const l = join(valmiit, k, 'LAHTEET.md'), s = join(valmiit, k, 'SHA256SUMS');
    if (korvatut.has(k) || !/-vienti-/.test(k) || !existsSync(l) || !existsSync(s) || !onTripoMalli(readFileSync(l, 'utf8'))) continue;
    for (const p of glbPolut(readFileSync(s, 'utf8'))) mallit.set(p, `_valmiit/${k}`);
  }
  const hyv = rek.mallit || [];
  for (const h of hyv) for (const p of h.ampari || []) mallit.set(p, `rekisteri: ${h.id} (${h.hyvaksytty})`);

  // Koodi: proton master ja uusin juna-runko (natiiviseppa/juna-*), .cs-tiedostot Assets/-kansiossa.
  let refit = arg('--viitteet', '');
  if (!refit) {
    const juna = (await git(proto, 'for-each-ref', '--sort=-committerdate', '--format=%(refname:short)', 'refs/heads/natiiviseppa/juna-*')).split('\n')[0];
    refit = ['master', juna].filter(Boolean).join(',');
  }
  const koodit = {};
  for (const ref of refit.split(',')) {
    const koodi = new Map();
    const tiedostot = (await git(proto, 'grep', '-l', '-E', 'media\\.matkakirja\\.app|\\.glb', ref, '--', 'Assets/*.cs').catch(() => '')).split('\n').filter(Boolean);
    for (const t of tiedostot) { const [r, ...polku] = t.split(':'); koodi.set(polku.join(':'), await git(proto, 'show', `${r}:${polku.join(':')}`)); }
    koodit[ref] = koodi;
  }

  const rivit = [];
  for (const m of uusimmat([...mallit.keys()])) {
    const lahde = mallit.get(m.polku);
    const tila = verkko ? await head(MEDIA + m.polku) : 'ohitettu';
    const runko = m.polku.split('/').pop().replace(/\.glb$/, ''), id = runko.replace(/-(ehja|rikki)$/, '');
    const v = {};
    for (const [ref, k] of Object.entries(koodit)) {
      const idKoodissa = id !== runko && (await git(proto, 'grep', '-l', '-F', `"${id}"`, ref, '--', 'Assets/*.cs').catch(() => '')).trim().length > 0;
      v[ref] = viitteet(k, m.polku, idKoodissa);
    }
    const missaan = Object.values(v).some(x => x.tiedostot.length > 0);
    const paalla = Object.values(v).some(x => x.tiedostot.some(t => !x.kytkinPois.includes(t)));
    const rivi = { polku: m.polku, lahde, ampari: tila, viitteet: v };
    rivit.push(rivi);
    if (verkko && tila !== '200') halytykset.push(`${m.polku}: hyväksytty mutta ei ämpärissä (HTTP ${tila}; ${lahde})`);
    else if (!missaan) halytykset.push(`${m.polku}: ämpärissä mutta ei viitettä pelin koodissa (${refit}; ${lahde})`);
    else if (!paalla) halytykset.push(`${m.polku}: viitattu, mutta kehityslippu pois (${[...new Set(Object.values(v).flatMap(x => x.kytkinPois))].join(', ')}: Paalla = false)`);
  }

  // 2. Postilaatikon 3D-tilaukset ilman toimitusta > 48 h.
  try {
    await git(repo, 'fetch', '-q', 'origin', `+refs/heads/${postiRef.replace(/^origin\//, '')}:refs/remotes/${postiRef}`).catch(() => '');
    const loki = await git(repo, 'log', '--diff-filter=A', '--format=@%H %ct', '--name-only', postiRef, '--', 'posti/');
    const lisatty = new Map();
    let sha = '', aika = 0;
    for (const r of loki.split('\n')) {
      if (r.startsWith('@')) { [sha, aika] = r.slice(1).split(' '); aika = Number(aika) * 1000; }
      else if (r.startsWith('posti/') && r.endsWith('.md') && !lisatty.has(r)) lisatty.set(r, { sha, aika });
    }
    const postit = [], tilaukset = [];
    for (const [polku, { sha: s, aika: a }] of lisatty) {
      const teksti = await git(repo, 'show', `${postiRef}:${polku}`).catch(() => '');
      const nimi = polku.slice('posti/'.length);
      postit.push({ nimi, aika: a, teksti });
      if (onMallitilaus(nimi, teksti)) tilaukset.push({ nimi, sha: s, aika: a });
    }
    // Rivi on tiedostonimi tai { tiedosto, syy } (PT 21.10.: sopimus, peruminen, tauko, kokeilun lopetus tai kuittaus ilman mallia).
    const suljetut = new Set((rek.suljetut_tilaukset || []).map(x => typeof x === 'string' ? x : x.tiedosto));
    for (const t of avoimetTilaukset(tilaukset.filter(x => !suljetut.has(x.nimi)), postit, Date.now()))
      halytykset.push(`posti/${t.nimi}: 3D-tilaus ${t.ikaH} h ilman toimitusta tai perumista`);
    huomiot.push(`postilaatikko: ${tilaukset.length} 3D-tilausta, ${postit.length} viestiä`);
  } catch (e) { huomiot.push('postilaatikkoa ei luettu: ' + e.message); }

  // Tulos.
  mkdirSync(ulos, { recursive: true });
  const nyt = new Date().toISOString();
  writeFileSync(join(ulos, 'tulos.json'), JSON.stringify({ aika: nyt, refit, halytykset, huomiot, mallit: rivit }, null, 1));
  const md = [`# Tuotantoputki ${nyt}`, '', `Koodi: ${refit}. Malleja (uusin per perhe): ${rivit.length}.`, '',
    halytykset.length ? '## HÄLYTYKSET' : '## Kunnossa', ...halytykset.map(h => '- ' + h), '', ...huomiot.map(h => '- ' + h), '',
    '| Malli | Ämpäri | Viitteet |', '|---|---|---|',
    ...rivit.map(r => `| ${r.polku} | ${r.ampari} | ${Object.entries(r.viitteet).map(([ref, x]) => `${ref}: ${x.tiedostot.map(t => t.split('/').pop() + (x.kytkinPois.includes(t) ? ' (pois)' : '')).join(', ') || '–'}`).join('; ')} |`)];
  writeFileSync(join(ulos, 'tulos.md'), md.join('\n') + '\n');
  writeFileSync(join(ulos, 'VIKA.txt'), halytykset.length ? `TUOTANTOPUTKI: ${halytykset.length} hälytystä: ${halytykset[0]}${halytykset.length > 1 ? ' …' : ''}\n` : '');
  appendFileSync(join(ulos, 'historia.log'), `${nyt} malleja ${rivit.length} hälytyksiä ${halytykset.length}\n`);
  console.log(md.slice(0, 6 + halytykset.length + huomiot.length).join('\n'));
  if (process.argv.includes('--tiukka') && halytykset.length) process.exit(1);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(e => { console.error(e); process.exit(2); });
