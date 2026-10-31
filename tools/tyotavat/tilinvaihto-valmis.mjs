#!/usr/bin/env node
/*
 * "TILINVAIHTO VALMIS" -TARKISTUS (Päätoimittaja 14.10.2026, kylmäkäynnistystesti 2; docs/tilinvaihto.md kohta 8).
 *
 *   node tools/tyotavat/tilinvaihto-valmis.mjs
 *
 * Tarkistaa tiedostotasolla (ei list_sessionsia):
 *  1) jokainen osoitekirjan id on elossa: sovelluksen sessiotiedosto
 *     ~/Library/Application Support/Claude/claude-code-sessions/<tili>/<org>/<id>.json on olemassa, ei arkistoitu,
 *     ja tili = ympäristön CLAUDE_CODE_ACCOUNT_UUID (jos asetettu); lisäksi nimi, malli ja effort vs osoitekirjan Malli-sarake,
 *     lupatila ja Remote Control (tiedoksi);
 *  2) peili ajan tasalla (bash tools/tyotavat/peili.sh --tarkista);
 *  3) aloitusviestit olemassa (docs/tilinvaihto.md:n roolitaulukon Aloitusviesti-sarake);
 *  4) vanhoja id:itä (täysi tai lyhyt muoto) ei ole jäänyt id:itä toistaviin tiedostoihin (paivita-idt.mjs:n KOHTEET),
 *     kotikansioiden juuren .md-tiedostoihin eikä ~/.claude/CLAUDE.md:hen;
 *  5) Asemataulu: työkansion kopiot = main ja tarkistin läpi (python3 -I tools/asemataulu/asemataulu.py --tarkista;
 *     docs/moduulit/asemataulu.md luku 2).
 * Paluuarvo 0 = valmis, 1 = puutteita (tulostetaan).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { kohteet, lueOsoitekirja } from './paivita-idt.mjs';

const REPO = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const OSOITEKIRJA = '/Users/Shared/Claude/osoitekirja.md';
const SESSIOT = join(homedir(), 'Library/Application Support/Claude/claude-code-sessions');
const puutteet = [];
const huom = (t) => { puutteet.push(t); console.log(`PUUTE: ${t}`); };

function sessiotiedostot() {
  const kartta = new Map();
  if (!existsSync(SESSIOT)) return kartta;
  for (const tili of readdirSync(SESSIOT)) {
    const t = join(SESSIOT, tili);
    let orgit = [];
    try { orgit = readdirSync(t); } catch { continue; }
    for (const org of orgit) {
      let nimet = [];
      try { nimet = readdirSync(join(t, org)); } catch { continue; }
      for (const n of nimet) if (n.startsWith('local_') && n.endsWith('.json')) kartta.set(n.slice(0, -5), { tili, polku: join(t, org, n) });
    }
  }
  return kartta;
}

// 1) id:t elossa
const okTeksti = existsSync(OSOITEKIRJA) ? readFileSync(OSOITEKIRJA, 'utf8') : '';
if (!okTeksti) huom(`osoitekirjaa ei ole: ${OSOITEKIRJA}`);
const rivit = lueOsoitekirja(okTeksti);
const malliSarake = new Map();
for (const r of okTeksti.split('\n')) {
  const s = r.split('|').map((x) => x.trim());
  if (s[2] && s[2].startsWith('local_')) malliSarake.set(s[2], s[4] || '');
}
const tiedostot = sessiotiedostot();
const tili = process.env.CLAUDE_CODE_ACCOUNT_UUID || '';
console.log(`Sessiot (${rivit.length} osoitekirjassa; tili ${tili ? tili.slice(0, 8) : 'ei ympäristössä'}):`);
for (const { rooli, id } of rivit) {
  const t = tiedostot.get(id);
  if (!t) { huom(`${rooli}: sessiotiedostoa ei ole (${id})`); continue; }
  let d = {};
  try { d = JSON.parse(readFileSync(t.polku, 'utf8')); } catch { huom(`${rooli}: sessiotiedosto ei ole JSONia`); continue; }
  if (d.isArchived) huom(`${rooli}: sessio arkistoitu (${id})`);
  if (tili && t.tili !== tili) huom(`${rooli}: sessio on toisella tilillä (${t.tili.slice(0, 8)})`);
  const malli = /sonnet/.test(d.model || '') ? 'Sonnet 5.5' : /opus/.test(d.model || '') ? 'Opus' : (d.model || '?');
  const odotus = malliSarake.get(id) || '';
  if (odotus && (!odotus.includes(malli) || (d.effort && !odotus.includes(d.effort)))) {
    huom(`${rooli}: osoitekirja "${odotus}", sessio ${malli}, ${d.effort}`);
  }
  console.log(`  ${rooli}: "${d.title}" ${malli}, ${d.effort}, lupatila ${d.permissionMode}, RC ${d.remoteControlUserEnabled ? 'päällä' : 'pois'}`);
}

// 2) peili
const peili = spawnSync('bash', [join(REPO, 'tools/tyotavat/peili.sh'), '--tarkista'], { encoding: 'utf8' });
if (peili.status !== 0) huom(`peili ei ajan tasalla:\n${(peili.stdout || '').trim()}`);
else console.log('Peili: ajan tasalla.');

// 3) aloitusviestit
const tv = readFileSync(join(REPO, 'docs/tilinvaihto.md'), 'utf8');
const polut = new Set([...tv.matchAll(/(docs\/(?:aloitusviestit|raportit)\/[\w.-]+\.md)/g)].map((m) => m[1]));
let puuttuu = 0;
for (const p of polut) if (!existsSync(join(REPO, p))) { huom(`aloitusviesti puuttuu: ${p}`); puuttuu++; }
console.log(`Aloitusviestit: ${polut.size - puuttuu}/${polut.size} olemassa.`);

// 4) vanhat id:t: täysi ja lyhyt muoto (local_<8 merkkiä>); KOHTEET + kotikansioiden juuren .md:t + CLAUDE.md:t
// (omistaja 31.10.2026 klo 22.06: NOLLAUS.md:n lyhyt local_febfd152 jäi aiemmin huomaamatta)
const nykyiset = new Set(rivit.map((r) => r.id));
const lyhyet = new Set(rivit.map((r) => r.id.slice(0, 14)));
const tarkistettavat = new Set(kohteet());
for (const k of readdirSync('/Users/Shared/Claude')) {
  if (!k.startsWith('Matkakirja-')) continue;
  const kansio = join('/Users/Shared/Claude', k);
  try { for (const t of readdirSync(kansio)) if (t.endsWith('.md')) tarkistettavat.add(join(kansio, t)); } catch {}
}
tarkistettavat.add(join(homedir(), '.claude/CLAUDE.md'));
for (const polku of tarkistettavat) {
  if (!existsSync(polku) || polku === OSOITEKIRJA) continue;
  const teksti = readFileSync(polku, 'utf8');
  const taydet = (teksti.match(/local_[0-9a-f]{8}-[0-9a-f-]{27}/g) || []).filter((i) => !nykyiset.has(i));
  const lyh = (teksti.match(/local_[0-9a-f]{8}(?![0-9a-f-])/g) || []).filter((i) => !lyhyet.has(i));
  const vanhat = [...new Set([...taydet.map((i) => i.slice(0, 14)), ...lyh])];
  if (vanhat.length) huom(`${polku}: id:t, joita osoitekirjassa ei ole: ${vanhat.join(', ')}`);
}

// 5) Asemataulu
const at = spawnSync('python3', ['-I', join(REPO, 'tools/asemataulu/asemataulu.py'), '--tarkista'], { encoding: 'utf8' });
if (at.status !== 0) huom(`Asemataulu ei valmis (python3 -I tools/asemataulu/asemataulu.py):\n${(at.stdout || '').split('\n').filter((r) => /^(PUUTE|VIRHE)/.test(r)).join('\n')}`);
else console.log('Asemataulu: kopiot = main, tarkistin läpi.');

console.log(puutteet.length ? `\nTILINVAIHTO EI VALMIS: ${puutteet.length} puutetta.` : '\nTilinvaihto valmis.');
process.exit(puutteet.length ? 1 : 0);
