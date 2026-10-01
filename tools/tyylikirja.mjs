#!/usr/bin/env node
/*
 * TYYLIKIRJA — tyylien ainoa lähde (omistaja 1.10.2026, UI-pohjat kohta 7; Natiivi-UI).
 *
 *   node tools/tyylikirja.mjs                      web: kirjoittaa css/styles.css:n generoidun lohkon
 *   node tools/tyylikirja.mjs --tarkista           web: exit 1, jos lohko ei vastaa tyylikirjaa
 *   node tools/tyylikirja.mjs --natiivi <proto>    natiivi: Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json-kopio
 *   node tools/tyylikirja.mjs --tarkista --natiivi <proto>
 *
 * Lähde: tyylikirja/tyylikirja.json. Generoidut tiedostot kantavat lähteen sha256-tunnisteen (12 merkkiä), josta
 * tests/tyylikirja.test.mjs (web) ja proto-gitin tyokalut/tarkista.sh (natiivi) näkevät, onko käsin muokattu.
 * Nimet: vanhat kehys- ja karttatokenit (--bg, --map-ink, …) säilyvät sellaisinaan; uudet ovat --tk-*.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
export const LAHDE = join(JUURI, 'tyylikirja', 'tyylikirja.json');
export const CSS = join(JUURI, 'css', 'styles.css');
export const ALKU = '/* TYYLIKIRJA ALKU';
export const LOPPU = '/* TYYLIKIRJA LOPPU */';

export function lue(polku = LAHDE) {
  const teksti = readFileSync(polku, 'utf8');
  return { tk: JSON.parse(teksti), tunniste: createHash('sha256').update(teksti).digest('hex').slice(0, 12) };
}

const julkiset = (o) => Object.entries(o).filter(([k]) => !k.startsWith('_'));
const px = (v) => `${v}px`;

/** Muuttujat [nimi, arvo, alustat] järjestyksessä; alustat 'wn' = web + natiivi. */
export function muuttujat(tk) {
  const m = [];
  const vainN = tk.kehys._vainNatiivi || [];
  for (const [k, v] of julkiset(tk.kehys)) m.push([k, v, vainN.includes(k) ? 'n' : 'wn']);
  for (const [k, v] of julkiset(tk.kartta)) m.push([k, v, 'wn']);
  m.push(['radius', px(tk.mitat.kulma.kortti), 'w']);
  for (const [k, v] of julkiset(tk.liike)) {
    if (typeof v === 'string') m.push([`liike-${k}`, v, 'w']);
    else m.push([`tk-kesto-${k}`, `${v}ms`, 'wn']);
  }
  for (const [k, v] of julkiset(tk.fontit.web)) m.push([k, v, 'w']);
  for (const [teema, arvot] of julkiset(tk.teemat))
    for (const [k, v] of julkiset(arvot)) m.push([`tk-${teema}-${k}`, v, 'wn']);
  for (const [k, v] of julkiset(tk.himmennys)) m.push([`tk-himmennys-${k}`, v, 'wn']);
  for (const [k, v] of julkiset(tk.typografia)) {
    if (typeof v === 'number') m.push([`tk-koko-${k}`, px(v), 'wn']);
    else m.push([`tk-koko-${k}`, px(v.koko), 'wn']);
  }
  for (const [ryhma, arvot] of julkiset(tk.mitat))
    for (const [k, v] of julkiset(arvot)) {
      if (typeof v !== 'number') continue;
      m.push([`tk-${ryhma}-${k}`, ryhma === 'peitto' || k.endsWith('leveys') && ryhma === 'kuva' ? `${v}%` : px(v), 'wn']);
    }
  return m;
}

/** Teemaluokat: .tk-teema-<nimi> asettaa roolimuuttujat (--tk-pinta, --tk-muste, …) koko alipuulle. */
function teemaluokat(tk, sisennys) {
  let s = '';
  for (const [teema, arvot] of julkiset(tk.teemat)) {
    s += `.tk-teema-${teema} {\n`;
    for (const [k] of julkiset(arvot)) s += `${sisennys}--tk-${k}: var(--tk-${teema}-${k});\n`;
    s += '}\n';
  }
  return s;
}

export function webLohko(tk, tunniste) {
  let s = `${ALKU} — generoitu tiedostosta tyylikirja/tyylikirja.json (node tools/tyylikirja.mjs); ÄLÄ MUOKKAA KÄSIN. lähde ${tunniste} */\n:root {\n`;
  for (const [n, v, a] of muuttujat(tk)) if (a.includes('w')) s += `  --${n}: ${v};\n`;
  s += '}\n' + teemaluokat(tk, '  ') + LOPPU;
  return s;
}

export function ussTiedosto(tk, tunniste) {
  let s = `/* TYYLIKIRJA — generoitu tiedostosta tyylikirja/tyylikirja.json (webin repo, node tools/tyylikirja.mjs --natiivi);\n`
    + ` * ÄLÄ MUOKKAA KÄSIN. lähde ${tunniste}. Tuodaan ensimmäisenä (Matkakirja.tss). */\n\n:root {\n`;
  for (const [n, v, a] of muuttujat(tk)) if (a.includes('n')) s += `    --${n}: ${v};\n`;
  s += '}\n\n' + teemaluokat(tk, '    ');
  return s;
}

const cs = (n) => n.split(/[-_ ]/).map((o) => o.charAt(0).toUpperCase() + o.slice(1)).join('').replace(/Ä/g, 'A').replace(/Ö/g, 'O');
function vari(v) {
  let m = /^#([0-9a-f]{6})$/i.exec(v);
  if (m) { const n = parseInt(m[1], 16); return [n >> 16, (n >> 8) & 255, n & 255, 255]; }
  m = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/.exec(v);
  if (m) return [+m[1], +m[2], +m[3], Math.round(+m[4] * 255)];
  throw new Error('tuntematon väri ' + v);
}
const c32 = (v) => `new Color32(${vari(v).join(', ')})`;

export function csTiedosto(tk, tunniste) {
  const r = [];
  r.push('// TYYLIKIRJA — generoitu tiedostosta tyylikirja/tyylikirja.json (webin repo, node tools/tyylikirja.mjs --natiivi).');
  r.push(`// ÄLÄ MUOKKAA KÄSIN. lähde ${tunniste}. Pohjat ja säännöt: docs/raportit/ui-pohjat-kartoitus-20261001.md.`);
  r.push('using UnityEngine;', '', 'namespace Matkakirja.Natiivi', '{', '    public static class Tyylikirja', '    {');
  r.push(`        public const string Lahde = "${tunniste}";`, '');
  const ryhma = (nimi, rivit) => { r.push(`        public static class ${nimi}`, '        {', ...rivit.map((x) => '            ' + x), '        }', ''); };
  ryhma('Kehys', [...julkiset(tk.kehys), ...julkiset(tk.kartta)].map(([k, v]) => `public static readonly Color32 ${cs(k)} = ${c32(v)};`));
  r.push('        public sealed class Teema', '        {');
  r.push('            public readonly string Nimi; public readonly Color32 Pinta, Muste, MustePehmea, Korostus, Reunus, Toiminto;');
  r.push('            public Teema(string n, Color32 p, Color32 m, Color32 mp, Color32 k, Color32 r, Color32 t) { Nimi = n; Pinta = p; Muste = m; MustePehmea = mp; Korostus = k; Reunus = r; Toiminto = t; }');
  r.push('        }', '');
  for (const [teema, a] of julkiset(tk.teemat))
    r.push(`        public static readonly Teema ${cs(teema)} = new Teema("${teema}", ${c32(a.pinta)}, ${c32(a.muste)}, ${c32(a['muste-pehmea'])}, ${c32(a.korostus)}, ${c32(a.reunus)}, ${c32(a.toiminto)});`);
  r.push('');
  ryhma('Himmennys', julkiset(tk.himmennys).map(([k, v]) => `public static readonly Color32 ${cs(k)} = ${c32(v)};`));
  ryhma('Koko', julkiset(tk.typografia).map(([k, v]) => `public const float ${cs(k)} = ${typeof v === 'number' ? v : v.koko}f;`));
  ryhma('Kirjain', julkiset(tk.typografia).filter(([, v]) => typeof v === 'object')
    .map(([k, v]) => `public const Kirjasin ${cs(k)} = Kirjasin.${v.kirjasin};`));
  for (const [nimi, arvot] of julkiset(tk.mitat))
    ryhma(cs(nimi), julkiset(arvot).map(([k, v]) => typeof v === 'number' ? `public const float ${cs(k)} = ${v}f;` : `public const string ${cs(k)} = "${v}";`));
  ryhma('Kesto', julkiset(tk.liike).filter(([, v]) => typeof v === 'number').map(([k, v]) => `public const int ${cs(k)} = ${v};`));
  ryhma('Fontit', julkiset(tk.fontit.natiivi).map(([k, l]) =>
    `public static readonly (string Perhe, string Tyyli)[] ${k} = { ${l.map(([p, t]) => `("${p}", "${t}")`).join(', ')} };`));
  r.push('        public static readonly string[] Pohjat = { ' + julkiset(tk.pohjat).map(([k]) => `"${k}"`).join(', ') + ' };');
  r.push('    }', '}', '');
  return r.join('\n');
}

/** Natiivin tiedostot proto-gitissä: [polku, sisältö]. */
export function natiiviTiedostot(proto, tk, tunniste, lahdeTeksti) {
  return [
    [join(proto, 'tyylikirja', 'tyylikirja.json'), lahdeTeksti],
    [join(proto, 'Assets/Matkakirja/UI/Resources/MatkakirjaUI/Tyylikirja.uss'), ussTiedosto(tk, tunniste)],
    [join(proto, 'Assets/Matkakirja/UI/Tyylikirja.cs'), csTiedosto(tk, tunniste)],
  ];
}

export function korvaaLohko(css, lohko) {
  const a = css.indexOf(ALKU), b = css.indexOf(LOPPU);
  if (a < 0 || b < a) throw new Error('css/styles.css: TYYLIKIRJA-merkit puuttuvat');
  return css.slice(0, a) + lohko + css.slice(b + LOPPU.length);
}

function main(argv) {
  const tarkista = argv.includes('--tarkista');
  const ni = argv.indexOf('--natiivi');
  const { tk, tunniste } = lue();
  if (ni >= 0) {
    const proto = argv[ni + 1];
    if (!proto || !existsSync(proto)) { console.error('anna proto-gitin polku: --natiivi <polku>'); return 2; }
    let virheita = 0;
    for (const [polku, sisalto] of natiiviTiedostot(proto, tk, tunniste, readFileSync(LAHDE, 'utf8'))) {
      if (tarkista) {
        const ok = existsSync(polku) && readFileSync(polku, 'utf8') === sisalto;
        if (!ok) { console.error('ERO: ' + polku); virheita++; }
      } else { mkdirSync(dirname(polku), { recursive: true }); writeFileSync(polku, sisalto); console.log('kirjoitettu ' + polku); }
    }
    if (tarkista) console.log(virheita ? `natiivi: ${virheita} tiedostoa poikkeaa (lähde ${tunniste})` : `natiivi ajan tasalla (lähde ${tunniste})`);
    return virheita ? 1 : 0;
  }
  const css = readFileSync(CSS, 'utf8');
  const uusi = korvaaLohko(css, webLohko(tk, tunniste));
  if (tarkista) {
    if (uusi !== css) { console.error('css/styles.css: tyylikirjan lohko ei vastaa lähdettä — aja node tools/tyylikirja.mjs'); return 1; }
    console.log(`web ajan tasalla (lähde ${tunniste})`); return 0;
  }
  if (uusi !== css) writeFileSync(CSS, uusi);
  console.log(`web: css/styles.css (lähde ${tunniste})`);
  return 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(main(process.argv.slice(2)));
