#!/usr/bin/env node
/*
 * POHJAVAHTI (web) — omistaja 1.10.2026, UI-pohjat kohta 8 (Natiivi-UI). Pohjien ohi menevät tyyliarvot eivät saa
 * lisääntyä: css/*.css:n kovakoodatut värit (#hex, rgb/rgba) ja yli 250 ms UI-siirtymät (transition / transition-
 * duration; tarkennus 11.37: vain UI-siirtymät, ei jatkuvat sisältöanimaatiot) lasketaan tiedostoittain ja verrataan
 * lähtötasoon tyylikirja/pohjavahti-web.json (= omistajan hyväksymä poikkeuslista nykyisille pinnoille).
 * Pohjatiedostot (css/pohjat*.css) eivät saa sisältää yhtään kovakoodattua väriä.
 *   node tools/pohjavahti.mjs [--kirjaa]
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
export const POHJA = join(JUURI, 'tyylikirja', 'pohjavahti-web.json');
const VARI = /#[0-9a-fA-F]{3,8}\b|rgba?\(/g;

function ylitykset(css) {
  let n = 0;
  for (const m of css.matchAll(/transition(?:-duration)?\s*:\s*([^;]+);/g))
    for (const osa of m[1].split(',')) {
      const k = /([\d.]+)(ms|s)\b/.exec(osa);
      if (k && parseFloat(k[1]) * (k[2] === 'ms' ? 1 : 1000) > 250) n++;
    }
  return n;
}

export function laske() {
  const t = {};
  for (const f of readdirSync(join(JUURI, 'css')).filter((x) => x.endsWith('.css')).sort()) {
    let css = readFileSync(join(JUURI, 'css', f), 'utf8');
    // Generoitu tyylikirjalohko on lähde itse, ei poikkeama (merkit ovat kommentteja: poisto ensin).
    const a = css.indexOf('/* TYYLIKIRJA ALKU'), b = css.indexOf('/* TYYLIKIRJA LOPPU */');
    if (a >= 0 && b > a) css = css.slice(0, a) + css.slice(b);
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    t[`css/${f}`] = { vari: (css.match(VARI) || []).length, siirtyma: ylitykset(css) };
  }
  return t;
}

export function tarkista(nyt = laske(), pohja = JSON.parse(readFileSync(POHJA, 'utf8')).tiedostot) {
  const virheet = [];
  for (const [f, a] of Object.entries(nyt)) {
    if (/^css\/pohjat/.test(f) && a.vari > 0) virheet.push(`${f}: pohjatiedostossa ${a.vari} kovakoodattua väriä (vain --tk-*)`);
    const s = pohja[f] || { vari: 0, siirtyma: 0 };
    for (const k of ['vari', 'siirtyma']) if (a[k] > (s[k] ?? 0)) virheet.push(`${f}: ${k} ${a[k]} > lähtötaso ${s[k] ?? 0}`);
  }
  return virheet;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  if (process.argv.includes('--kirjaa')) {
    writeFileSync(POHJA, JSON.stringify({ _ohje: 'Web-pohjavahdin lähtötaso (tools/pohjavahti.mjs). Määrät saavat vain pienentyä; '
      + 'kasvu = pinta pohjien ohi → Päätoimittajalle (omistaja). --kirjaa vain omistajan päätöksellä tai siirron jälkeen.',
    tiedostot: laske() }, null, 1) + '\n');
    console.log('kirjattu');
  } else {
    const v = tarkista();
    v.forEach((x) => console.error('POHJAVAHTI: ' + x));
    process.exit(v.length ? 1 : 0);
  }
}
