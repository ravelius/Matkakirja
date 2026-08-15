/*
 * Sisältöpistokokeen työkalu: näyttää kahden git-version välillä
 * muuttuneet selite- ja teksti-kentät VANHA/UUSI-pareina.
 *
 *   node tools/vertaa-sisaltodiff.mjs <vanha-rev> <uusi-rev> \
 *     <polku/tiedosto.js> <EXPORT_NIMI> [otoskoko]
 *
 * Esim: node tools/vertaa-sisaltodiff.mjs origin/main~3 origin/main \
 *         js/packs/maa-kategoriat.js MAA_KATEGORIAT 5
 *
 * MIKSI TÄMÄ ON OLEMASSA (omistajan tilaus 15.8.2026): delegoitu
 * sessio alkaa herkästi muunnella saamaansa ohjetta, eikä rivipohjainen
 * git-diff kerro sisällöstä mitään, kun merkkijonot on rivitetty
 * uudelleen. Tämä työkalu evaluoi molemmat versiot ja poimii
 * MUUTTUNEET kentät kokonaisina — päätoimittajan pistokoe on sitten
 * pelkkää lukemista: otos + pisin muutos, ja jokaisesta parista
 * tarkistetaan kolme asiaa:
 *   1. uudessa ei ole faktoja, joita vanhassa ei ollut (keksintä),
 *   2. pudotettu aines on sommittelukuvailua, ei asiatietoa,
 *   3. jos asiatietoa siirtyi leipätekstiin, se siirtyi sanatarkasti.
 *
 * Otos on deterministinen (tasavälein + pisin), jotta sama komento
 * antaa saman otoksen uusintatarkistuksessa. Työkalu ei käytä mallia
 * eikä verkkoa — kevyt ajaa jokaiselle sisältö-PR:lle.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const [vanhaRev, uusiRev, tiedosto, exportNimi, otosArg] = process.argv.slice(2);
if (!vanhaRev || !uusiRev || !tiedosto || !exportNimi) {
  console.error('Käyttö: node tools/vertaa-sisaltodiff.mjs <vanha-rev> <uusi-rev> <tiedosto> <EXPORT> [otoskoko]');
  process.exit(2);
}
const OTOS = Number(otosArg) || 5;

const hae = (rev, kohde) => {
  const sisalto = execFileSync('git', ['show', `${rev}:${tiedosto}`], { maxBuffer: 64 * 1024 * 1024 });
  writeFileSync(kohde, sisalto);
};

const tmp = mkdtempSync(join(tmpdir(), 'sisaltodiff-'));
try {
  const vanhaP = join(tmp, 'vanha.mjs');
  const uusiP = join(tmp, 'uusi.mjs');
  hae(vanhaRev, vanhaP);
  hae(uusiRev, uusiP);
  const vanha = (await import(pathToFileURL(vanhaP)))[exportNimi];
  const uusi = (await import(pathToFileURL(uusiP)))[exportNimi];
  if (!vanha || !uusi) {
    console.error(`Exportia ${exportNimi} ei löydy molemmista versioista.`);
    process.exit(2);
  }

  const KENTAT = ['selite', 'teksti', 'esittely', 'tervehdys'];
  const parit = [];
  const kavele = (v, u, polku) => {
    if (!v || !u || typeof v !== 'object' || typeof u !== 'object') return;
    if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i += 1) kavele(v[i], u[i], `${polku}[${i}]`);
      return;
    }
    for (const kentta of KENTAT) {
      if (typeof v[kentta] === 'string' && typeof u[kentta] === 'string'
        && v[kentta] !== u[kentta]) {
        parit.push({
          polku: `${polku}.${kentta}`,
          nimi: v.otsikko ?? v.nimi ?? '',
          vanha: v[kentta],
          uusi: u[kentta],
        });
      }
    }
    for (const k of Object.keys(v)) {
      if (typeof v[k] === 'object') kavele(v[k], u[k], `${polku}.${k}`);
    }
  };
  kavele(vanha, uusi, exportNimi);

  console.log(`Muuttuneita kenttiä: ${parit.length} (${tiedosto}, ${vanhaRev} → ${uusiRev})`);
  if (!parit.length) process.exit(0);

  // Otos tasavälein + suurin muutos mukaan aina.
  const askel = Math.max(1, Math.floor(parit.length / OTOS));
  const valitut = new Set();
  for (let i = 0; i < parit.length && valitut.size < OTOS; i += askel) valitut.add(i);
  let pisin = 0;
  for (let i = 1; i < parit.length; i += 1) {
    if (Math.abs(parit[i].uusi.length - parit[i].vanha.length)
      > Math.abs(parit[pisin].uusi.length - parit[pisin].vanha.length)) pisin = i;
  }
  valitut.add(pisin);

  for (const i of [...valitut].sort((a, b) => a - b)) {
    const p = parit[i];
    console.log(`\n──────── ${p.polku}${p.nimi ? ` — ${p.nimi}` : ''}${i === pisin ? '  (SUURIN MUUTOS)' : ''}`);
    console.log(`VANHA (${p.vanha.length} mrk): ${p.vanha}`);
    console.log(`UUSI  (${p.uusi.length} mrk): ${p.uusi}`);
  }
  console.log('\nTarkista jokaisesta parista: 1) ei keksittyjä faktoja, '
    + '2) pudotettu on sommittelua, 3) siirrot leipätekstiin sanatarkasti.');
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
