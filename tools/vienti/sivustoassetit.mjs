#!/usr/bin/env node
/*
 * SIVUSTON ASSETIT ÄMPÄRIIN (Siirtoseppä 23.9.2026, skeema 1.12).
 *
 *   node tools/vienti/sivustoassetit.mjs --edellinen <tiivisteet.json> --ulos <kansio>
 *
 * CI:n apu (.github/workflows/vie-sisalto.yml). Syöte on vie-sisalto.mjs:n
 * kirjoittama dist/sivusto-assetit.json ({ polku: sha256 }): repon
 * assets/-tiedostot, joihin paketti osoittaa ämpärissä. --edellinen on
 * ämpärin assets/.tiivisteet.json edelliseltä ajolta (puuttuva = {}).
 *
 * Kopioi kansioon <ulos>/assets/… vain uudet ja muuttuneet tiedostot
 * (aws s3 sync vie ne sellaisenaan) ja kirjoittaa <ulos>.tiivisteet.json:n,
 * jossa edelliset rivit ja tämän ajon rivit yhdessä: vanhat paketit
 * (20 säilytetään) voivat yhä viitata tiedostoon, jota nykyinen ei käytä.
 * Tulostaa GitHubin output-rivit: muuttuneita=<n>.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export function muuttuneet(nykyiset, edelliset) {
  return Object.keys(nykyiset).filter((p) => nykyiset[p] && edelliset[p] !== nykyiset[p]);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = (nimi) => { const i = process.argv.indexOf(nimi); return i > 0 ? process.argv[i + 1] : null; };
  const ulos = resolve(arg('--ulos') ?? join(JUURI, 'dist/assetit'));
  const edellinenPolku = arg('--edellinen');
  const edelliset = edellinenPolku && existsSync(edellinenPolku) ? JSON.parse(readFileSync(edellinenPolku, 'utf8')) : {};
  const nykyiset = JSON.parse(readFileSync(join(JUURI, 'dist/sivusto-assetit.json'), 'utf8'));
  const lista = muuttuneet(nykyiset, edelliset);
  rmSync(ulos, { recursive: true, force: true });
  for (const polku of lista) {
    const kohde = join(ulos, polku);
    mkdirSync(dirname(kohde), { recursive: true });
    copyFileSync(join(JUURI, polku), kohde);
  }
  const yhdessa = { ...edelliset, ...nykyiset };
  const jarjestetty = Object.fromEntries(Object.keys(yhdessa).sort().map((p) => [p, yhdessa[p]]));
  writeFileSync(`${ulos}.tiivisteet.json`, `${JSON.stringify(jarjestetty, null, 1)}\n`);
  writeFileSync(`${ulos}.muuttuneet.txt`, lista.map((p) => `${p}\t${nykyiset[p]}`).join('\n') + (lista.length ? '\n' : ''));
  console.log(`sivuston assetit: ${Object.keys(nykyiset).length} paketissa, ${lista.length} uutta tai muuttunutta`);
  if (process.env.GITHUB_OUTPUT) writeFileSync(process.env.GITHUB_OUTPUT, `muuttuneita=${lista.length}\n`, { flag: 'a' });
}
