// NATIIVIN KULTAISTEN JÄLKIEN VARTIJA (Pelikoodari 23.9.2026).
//
// Natiivin pelilogiikka (proto-gitin Assets/Matkakirja/Peli/, puhdas C#) on
// verkkopelin js/rules.js-, js/game.js- ja js/tokens.js-logiikan portti. C#-testit
// vaativat, että natiivi toistaa verkkopelin "kultaiset jäljet" täsmälleen:
// proto-gitin Peli-testit/Kultaiset/tee-*.mjs ajaa verkkopelin oikeat moduulit
// ja kirjoittaa jäljet JSON-tiedostoihin.
//
// Tämä vartija ajaa samat skriptit (kopiot tässä kansiossa) nykyistä js/-kansiota
// vasten ja vertaa tulosten sha256-tiivisteitä tiedostoon tiivisteet.json.
// Jos jälki muuttuu, verkkopelin sääntö tai laudan sisältö on muuttunut, ja
// natiivin porttia pitää ehkä päivittää. Sisältöpaketin syötteet (kaupungit,
// reitit, kaksintaistelut) tehdään tuoreesta viennistä (tools/vienti), joten
// vartija seuraa samaa sisältöä, jonka natiivi saa ämpäristä.
//
// Kun testi tests/natiivi-kultaiset.test.mjs punastuu:
//   1. Jos muutos on tarkoituksellinen, aja
//        node tools/natiivi-kultaiset/vartija.mjs --paivita
//      ja committaa tiivisteet.json samaan PR:ään. Muutos näkyy PR:ssä
//      tiedostossa tiivisteet.json, ja Pelikoodari päivittää natiivin
//      (tee-*.mjs proto-gitissä, C#-portti, Peli-testit/kaanna.sh).
//   2. Muuten korjaa verkkopelin muutos.
//
// Skriptit ovat proto-gitin Peli-testit/Kultaiset/ -kansion kopioita; kun niihin
// tulee uusi jälki, Pelikoodari kopioi ne tänne ja päivittää tiivisteet.
//
// Käyttö: node tools/natiivi-kultaiset/vartija.mjs [--paivita]
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { kokoaVienti } from '../vienti/vie-sisalto.mjs';

const TAMA = dirname(fileURLToPath(import.meta.url));
export const JUURI = resolve(TAMA, '../..');
export const TIIVISTEET = join(TAMA, 'tiivisteet.json');
const SYOTTEET = ['kaupungit', 'reitit', 'kaksintaistelut'];

/** Skriptit, jotka tuottavat jäljet (aakkosjärjestyksessä). */
export const skriptit = () => readdirSync(TAMA).filter((f) => /^tee-.*\.mjs$/.test(f)).sort();

/**
 * Ajaa kaikki tee-*.mjs-skriptit väliaikaiskansiossa verkkopelin js/-kansiota
 * vasten ja palauttaa { 'polku.json': sha256 } kaikista syntyneistä
 * JSON-tiedostoista (syötteitä lukuun ottamatta).
 */
export async function laskeTiivisteet({ juuri = JUURI } = {}) {
  const kansio = mkdtempSync(join(tmpdir(), 'natiivi-kultaiset-'));
  try {
    const { tiedostot } = await kokoaVienti({ juuri });
    mkdirSync(join(kansio, 'paketti'));
    for (const n of SYOTTEET) {
      const teksti = tiedostot.get(`kokoelmat/${n}.json`);
      if (!teksti) throw new Error(`viennissä ei ole kokoelmaa ${n}`);
      writeFileSync(join(kansio, 'paketti', `${n}.json`), teksti);
    }
    const js = join(juuri, 'js');
    for (const s of skriptit()) {
      copyFileSync(join(TAMA, s), join(kansio, s));
      try {
        execFileSync(process.execPath, [join(kansio, s), js], { cwd: kansio, stdio: 'pipe' });
      } catch (e) {
        throw new Error(`${s} kaatui:\n${e.stderr?.toString() || e.message}`);
      }
    }
    const tulos = {};
    const kay = (ali) => {
      for (const f of readdirSync(join(kansio, ali), { withFileTypes: true })) {
        const polku = ali ? `${ali}/${f.name}` : f.name;
        if (f.isDirectory()) kay(polku);
        else if (f.name.endsWith('.json') && !SYOTTEET.some((n) => polku === `paketti/${n}.json`)) {
          // siirrot.json kirjaa js-kansion polun: se ei ole osa jälkeä.
          const teksti = readFileSync(join(kansio, polku), 'utf8').split(js).join('<js>');
          tulos[polku] = createHash('sha256').update(teksti).digest('hex');
        }
      }
    };
    kay('');
    return Object.fromEntries(Object.entries(tulos).sort(([a], [b]) => (a < b ? -1 : 1)));
  } finally {
    rmSync(kansio, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const tiivisteet = await laskeTiivisteet();
  if (process.argv.includes('--paivita')) {
    writeFileSync(TIIVISTEET, JSON.stringify(tiivisteet, null, 1) + '\n');
    console.log(`tiivisteet.json päivitetty (${Object.keys(tiivisteet).length} jälkeä)`);
  } else {
    const vanhat = JSON.parse(readFileSync(TIIVISTEET, 'utf8'));
    const erot = Object.keys({ ...vanhat, ...tiivisteet }).filter((k) => vanhat[k] !== tiivisteet[k]);
    console.log(erot.length ? `muuttuneet jäljet: ${erot.join(', ')}` : 'jäljet ennallaan');
    process.exitCode = erot.length ? 1 : 0;
  }
}
