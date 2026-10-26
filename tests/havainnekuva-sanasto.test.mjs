/*
 * HAVAINNEKUVA-SANASTO (omistaja 27.9.2026): generoiduista kuvista
 * käytetään pelaajalle näkyvässä tekstissä sanaa "havainnekuva" — ei
 * "kuvitus", "kuvituskuva", "AI-kuva", "generoitu kuva",
 * "tekoälykuva" tms.
 *
 * Kaksi tarkistusta:
 * 1. Tunnetut kielletyt lähderivimuodot eivät esiinny koodin eikä datan
 *    merkkijonoissa (kommentit sallitaan: ne eivät näy pelaajalle).
 * 2. Pakettien kuvaolioissa, joiden lähderivi kertoo havainnekuvasta
 *    (onHavainnekuva), kuvateksti ei kutsu kuvaa kuvitukseksi. Aidot
 *    vanhat kirjankuvitukset (Commons) eivät ole havainnekuvia, joten ne
 *    saavat sanansa pitää.
 *
 * Vanha muoto "Matkakirjan kuvitus" tunnistetaan yhä (HAVAINNEKUVA_RE)
 * vanhan datan varalta, mutta uutta sellaista riviä ei kirjoiteta.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { onHavainnekuva } from '../js/havainnekuva.js';

const juuri = new URL('../', import.meta.url);
const lue = (p) => readFileSync(new URL(p, juuri), 'utf8');
const listaa = (kansio) => readdirSync(new URL(kansio, juuri))
  .filter((f) => f.endsWith('.js'))
  .map((f) => `${kansio}${f}`);

/* Historia- ja työhuonetiedostot kirjaavat vanhoja sanamuotoja sellaisinaan. */
const OHITA = new Set(['js/muutokset.js', 'js/tyohuone-raamattu.js', 'js/tyohuone-tilanne.js']);

/* Iso M: Freshfieldin "matkakirjan kuvitus" on aito 1869 kirjankuvitus. */
const KIELLETTY_LAHDE = /Matkakirjan (?:oma )?kuvitus/u;
const KIELLETTY_SANA = /tekoälykuvitu|tekoälykuva|AI-kuva|generoitu (?:kuva|valokuva)|Kuvaputken generoitu/iu;
const KIELLETTY = { test: (s) => KIELLETTY_LAHDE.test(s) || KIELLETTY_SANA.test(s) };

/** Rivit ilman kommentteja (karkea mutta riittävä: kommenttirivit alkavat *, // tai /*). */
function koodirivit(teksti) {
  return teksti.split('\n')
    .map((rivi, i) => ({ rivi, nro: i + 1 }))
    .filter(({ rivi }) => !/^\s*(?:\*|\/\/|\/\*|<!--)/.test(rivi));
}

test('kielletyt havainnekuvan nimitykset eivät näy koodin ja datan merkkijonoissa', () => {
  const tiedostot = [
    'index.html',
    ...listaa('js/'),
    ...listaa('js/linssit/'),
    ...listaa('js/packs/'),
  ].filter((f) => !OHITA.has(f));
  const osumat = [];
  for (const f of tiedostot) {
    for (const { rivi, nro } of koodirivit(lue(f))) {
      if (KIELLETTY.test(rivi)) osumat.push(`${f}:${nro}: ${rivi.trim().slice(0, 120)}`);
    }
  }
  assert.deepEqual(osumat, [], 'käytä sanaa "havainnekuva"');
});

test('havainnekuvan kuvateksti ei kutsu kuvaa kuvitukseksi', async () => {
  const KENTAT = ['lyhyt', 'selite', 'kuvateksti', 'otsikko', 'lisenssi'];
  // "mielikuvitus" ja "kuvituksellinen" ovat eri sanoja.
  const KUVITUS = /(?<!mieli)kuvitu(?!ksellis)/i;
  const osumat = [];
  let kuvia = 0;
  const kay = (arvo, polku, nahty) => {
    if (!arvo || typeof arvo !== 'object' || nahty.has(arvo)) return;
    nahty.add(arvo);
    if (typeof arvo.lahde === 'string' && onHavainnekuva(arvo)) {
      kuvia++;
      for (const k of KENTAT) {
        if (typeof arvo[k] === 'string' && KUVITUS.test(arvo[k])) {
          osumat.push(`${polku}.${k}: ${arvo[k].slice(0, 100)}`);
        }
      }
    }
    for (const [avain, ala] of Object.entries(arvo)) kay(ala, `${polku}.${avain}`, nahty);
  };
  for (const f of listaa('js/packs/')) {
    let moduuli;
    try {
      moduuli = await import(new URL(f, juuri));
    } catch {
      continue; // selainriippuvainen paketti: merkkijonotesti kattaa sen
    }
    const nahty = new Set();
    for (const [nimi, arvo] of Object.entries(moduuli)) kay(arvo, `${f}#${nimi}`, nahty);
  }
  assert.ok(kuvia > 300, `havainnekuvia löytyi vain ${kuvia}`);
  assert.deepEqual(osumat, []);
});
