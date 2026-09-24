#!/usr/bin/env node
/*
 * MAAMERKIT (skeema 1.33, Pelikoodari 24.9.2026; Raamattu: LENNON KARTTA JA
 * MAAMERKIT). Natiivin oma ominaisuus: jokaiselle kaupungille 3D-maamerkki
 * (GLB ämpärissä). Rivit tools/vienti/maamerkit.json:ssa (Pelikoodari).
 *
 * Ankkuri: lat/lon/maanKorkeus = mallin origo (jalka maan tasolla). Mallin
 * kehys glTF: +Y ylös, −Z pohjoinen (Blenderin oletusvienti), eli natiivissa
 * +Z pohjoinen ja +X itä; suunta = kierto pohjoisesta myötäpäivään.
 *
 *   node tools/vienti/maamerkit.mjs --tarkista    HEAD jokaiselle mallille (koko = tavuja)
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const MAAMERKIT = new URL('./maamerkit.json', import.meta.url);
const URL_MUOTO = /^https:\/\/media\.matkakirja\.app\/maamerkit\/[a-z0-9-]+-[0-9a-f]{8}\.glb$/;

/** Virhelista riveille; kaupunkiIdt = laudan kaupungit. */
export function tarkistaMaamerkit(rivit, kaupunkiIdt) {
  const virheet = [];
  const nahty = new Set();
  for (const r of rivit) {
    const k = `maamerkki ${r?.id ?? '?'}`;
    if (!r?.id || nahty.has(r.id)) virheet.push(`${k}: id puuttuu tai toistuu`);
    nahty.add(r?.id);
    if (!kaupunkiIdt.has(r?.kaupunki)) virheet.push(`${k}: tuntematon kaupunki ${r?.kaupunki}`);
    for (const n of ['lat', 'lon', 'maanKorkeus', 'suunta', 'mallinKorkeus']) {
      if (typeof r?.[n] !== 'number' || !Number.isFinite(r[n])) virheet.push(`${k}: ${n} ei ole luku`);
    }
    const m = r?.malli;
    if (!m || !URL_MUOTO.test(m.url ?? '')) virheet.push(`${k}: malli.url muotoa https://media.matkakirja.app/maamerkit/<nimi>-<sha8>.glb`);
    else if (!/^[0-9a-f]{64}$/.test(m.sha256 ?? '') || !m.url.endsWith(`-${m.sha256.slice(0, 8)}.glb`)) virheet.push(`${k}: malli.sha256 ei vastaa nimeä`);
    if (!Number.isInteger(m?.tavuja) || m.tavuja <= 0) virheet.push(`${k}: malli.tavuja`);
    for (const n of ['lisenssi', 'tekija', 'lahde']) if (!r?.[n]) virheet.push(`${k}: ${n} puuttuu`);
  }
  return virheet;
}

export function lueMaamerkit() {
  return JSON.parse(readFileSync(MAAMERKIT, 'utf8')).rivit ?? [];
}

/** Kokoelma maamerkit; kaatuu virheelliseen riviin. */
export function maamerkkiKokoelma(taulukko, kaupunkiIdt) {
  const rivit = lueMaamerkit();
  const virheet = tarkistaMaamerkit(rivit, kaupunkiIdt);
  if (virheet.length) throw new Error(`maamerkit.json:\n  ${virheet.join('\n  ')}`);
  return taulukko('tools/vienti/maamerkit.json (Pelikoodari)',
    'Natiivin 3D-maamerkit (Raamattu: LENNON KARTTA JA MAAMERKIT). id, kaupunki, lat, lon, maanKorkeus (m, EGM2008; '
      + 'mallin origo = jalka maan tasolla), suunta (° pohjoisesta myötäpäivään), mallinKorkeus (m), malli { url (GLB: '
      + 'yksi verkko, yksi materiaali, upotettu PNG-atlas), sha256, tavuja }, lisenssi, tekija, lahde. Mallin kehys glTF '
      + '+Y ylös, −Z pohjoinen (natiivissa +Z pohjoinen, +X itä). Rivin puute = ei maamerkkiä. Malli on myös maan '
      + 'offline-medialistassa (offline.json maat[].media).',
    { kaupunki: 'kaupungit' }, rivit.map((r) => ({ ...r })));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url) && process.argv.includes('--tarkista')) {
  const rivit = lueMaamerkit();
  const virheet = [];
  for (const r of rivit) {
    const v = await fetch(r.malli.url, { method: 'HEAD', headers: { 'accept-encoding': 'identity' } }).catch((e) => ({ status: e.message }));
    const koko = Number(v.headers?.get?.('content-length'));
    if (v.status !== 200) virheet.push(`${r.id}: ${v.status}`);
    else if (Number.isFinite(koko) && koko !== r.malli.tavuja) virheet.push(`${r.id}: koko ${koko} ≠ ${r.malli.tavuja}`);
  }
  console.log(virheet.length ? virheet.join('\n') : `maamerkit: ${rivit.length}/${rivit.length} mallia ämpärissä`);
  process.exit(virheet.length ? 1 : 0);
}
