/*
 * PAIKKAUS — pohjapyramidin rajatun alueen korjaus
 * (tools/paikkaa-pyramidi.mjs).
 *
 * Mitä tämä vartioi:
 *
 *   1. TURVA. Paikkaus ei saa koskaan kirjoittaa lähdeversion polkuun
 *      (laatat ovat ikuisessa välimuistissa), eikä se saa periä
 *      asetuksia väärän version luettelosta.
 *   2. ASETUKSET LÄHTEESTÄ. Laatu, muoto, laattakoko, patinataso ja
 *      nostoversio luetaan lähdeversion luettelosta eikä työnkulun
 *      syötteistä — juuri niistä syntyisi näkyvä raja paikatun ja
 *      kopioidun laatan väliin.
 *   3. VERTAILU KAATUU KUN PITÄÄ. `vertaa` on koko paikkauksen
 *      todistusaineisto: jos se hyväksyisi ajon, jossa alueen
 *      ulkopuolinen laatta muuttui tai jäi kopioimatta, koko malli
 *      olisi tarkistamaton.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const TYOKALU = join(JUURI, 'tools', 'paikkaa-pyramidi.mjs');

/** Ajaa työkalun; palauttaa { koodi, tuloste }. Ei heitä. */
function aja(...args) {
  try {
    const tuloste = execFileSync('node', [TYOKALU, ...args], { encoding: 'utf8' });
    return { koodi: 0, tuloste };
  } catch (e) {
    return { koodi: e.status ?? 1, tuloste: `${e.stdout ?? ''}${e.stderr ?? ''}` };
  }
}

const pesa = () => mkdtempSync(join(tmpdir(), 'paikkaus-'));

const LUETTELO = {
  versio: '2026-08-31c',
  laatta: 512,
  muoto: 'webp',
  laatu: 0.85,
  patina: 'keskitaso',
  nostotaso: { versio: '2026-08-31c-nostot', tasot: [5, 6, 7] },
  tasot: [{ z: 0 }, { z: 1 }, { z: 2 }, { z: 3 }, { z: 4 }, { z: 5 }, { z: 6 }, { z: 7 }],
};

function kirjoitaLuettelo(kansio, muutos = {}) {
  const polku = join(kansio, 'pyramidi.json');
  writeFileSync(polku, JSON.stringify({ ...LUETTELO, ...muutos }));
  return polku;
}

/* ------------------------------------------------------- suunnittele */

test('suunnittele perii asetukset lähdeversion luettelosta', () => {
  const k = pesa();
  const luettelo = kirjoitaLuettelo(k);
  const ulos = join(k, 'ulos.env');
  const { koodi, tuloste } = aja('suunnittele', '--luettelo', luettelo,
    '--lahdeversio', '2026-08-31c', '--versio', '2026-08-31c-p1',
    '--alue', '80,27,95,36', '--ulos', ulos);
  assert.equal(koodi, 0, tuloste);
  const arvot = Object.fromEntries(readFileSync(ulos, 'utf8').trim().split('\n')
    .map((r) => r.split('=')));
  assert.equal(arvot.LAHDEVERSIO, '2026-08-31c');
  assert.equal(arvot.VERSIO, '2026-08-31c-p1');
  assert.equal(arvot.TASOT, '0-7');
  assert.equal(arvot.LAATU, '0.85');
  assert.equal(arvot.MUOTO, 'webp');
  assert.equal(arvot.LAATTA, '512');
  assert.equal(arvot.PATINA, 'keskitaso');
  // Nostotaso jää lähteen omaan versioon: nostolaattoja ei kopioida
  // eikä piirretä, ne ovat jo oman versionsa polussa.
  assert.equal(arvot.NOSTOVERSIO, '2026-08-31c-nostot');
  rmSync(k, { recursive: true, force: true });
});

test('suunnittele kieltäytyy kirjoittamasta lähdeversion polkuun', () => {
  const k = pesa();
  const luettelo = kirjoitaLuettelo(k);
  const { koodi, tuloste } = aja('suunnittele', '--luettelo', luettelo,
    '--lahdeversio', '2026-08-31c', '--versio', '2026-08-31c',
    '--alue', '80,27,95,36', '--ulos', join(k, 'ulos.env'));
  assert.equal(koodi, 1);
  assert.match(tuloste, /sama/);
  rmSync(k, { recursive: true, force: true });
});

test('suunnittele kieltäytyy, jos luettelo kuvaa toista versiota', () => {
  const k = pesa();
  const luettelo = kirjoitaLuettelo(k, { versio: '2026-09-01' });
  const yhteiset = ['--luettelo', luettelo, '--lahdeversio', '2026-08-31c',
    '--versio', '2026-08-31c-p1', '--alue', '80,27,95,36', '--ulos', join(k, 'ulos.env')];
  assert.equal(aja('suunnittele', ...yhteiset).koodi, 1);
  // Tietoinen ohitus on mahdollinen, muttei vahingossa.
  assert.equal(aja('suunnittele', ...yhteiset, '--salli-eri-luettelo').koodi, 0);
  rmSync(k, { recursive: true, force: true });
});

test('suunnittele hylkää kelvottoman alueen', () => {
  const k = pesa();
  const luettelo = kirjoitaLuettelo(k);
  const kutsu = (alue) => aja('suunnittele', '--luettelo', luettelo,
    '--lahdeversio', '2026-08-31c', '--versio', '2026-08-31c-p1',
    '--alue', alue, '--ulos', join(k, 'ulos.env')).koodi;
  assert.equal(kutsu('80,27,95'), 1);
  assert.equal(kutsu('80,127,95,136'), 1);
  assert.equal(kutsu('80,27,80,36'), 1);
  rmSync(k, { recursive: true, force: true });
});

/* ------------------------------------------------------------ vertaa */

/** Pieni laattapuu: z-taso, sarake, rivi -> sisältö. */
function teeLaatat(juuri, laatat) {
  for (const [avain, sisalto] of Object.entries(laatat)) {
    const [z, sarake, rivi] = avain.split(':');
    const kansio = join(juuri, `z${z}`, sarake);
    mkdirSync(kansio, { recursive: true });
    writeFileSync(join(kansio, `${rivi}.webp`), sisalto);
  }
}

const SETTI = {
  '5:0:0': 'a', '5:1:0': 'b', '5:2:0': 'c', '5:0:1': 'd', '5:1:1': 'e', '5:2:1': 'f',
};
const LISTA = { muoto: 'webp', laatat: [[5, 1, 0], [5, 1, 1]] };

function pesat(paikatut) {
  const k = pesa();
  const lahde = join(k, 'lahde');
  const paikattu = join(k, 'paikattu');
  teeLaatat(lahde, SETTI);
  teeLaatat(paikattu, { ...SETTI, ...paikatut });
  const lista = join(k, 'laatat.json');
  writeFileSync(lista, JSON.stringify(LISTA));
  return {
    k, lahde, paikattu, lista,
  };
}

test('vertaa hyväksyy ajon, jossa vain alueen laatat muuttuivat', () => {
  const {
    k, lahde, paikattu, lista,
  } = pesat({ '5:1:0': 'B', '5:1:1': 'E' });
  const { koodi, tuloste } = aja('vertaa', '--lahde', lahde, '--paikattu', paikattu, '--lista', lista);
  assert.equal(koodi, 0, tuloste);
  assert.match(tuloste, /muuttui\s+2/);
  // Reunarengas: 1:0:n ja 1:1:n naapurit, jotka eivät ole listassa.
  assert.match(tuloste, /reunalaatat\s+4/);
  rmSync(k, { recursive: true, force: true });
});

test('vertaa kaatuu, jos alueen ULKOPUOLINEN laatta muuttui', () => {
  const {
    k, lahde, paikattu, lista,
  } = pesat({ '5:1:0': 'B', '5:2:0': 'C' });
  const { koodi, tuloste } = aja('vertaa', '--lahde', lahde, '--paikattu', paikattu, '--lista', lista);
  assert.equal(koodi, 1);
  assert.match(tuloste, /ULKOPUOLISTA laattaa muuttui/);
  rmSync(k, { recursive: true, force: true });
});

test('vertaa kaatuu, jos kopio jäi kesken', () => {
  const {
    k, lahde, paikattu, lista,
  } = pesat({});
  rmSync(join(paikattu, 'z5', '2', '0.webp'));
  const { koodi, tuloste } = aja('vertaa', '--lahde', lahde, '--paikattu', paikattu, '--lista', lista);
  assert.equal(koodi, 1);
  assert.match(tuloste, /puuttuu paikatusta setistä/);
  rmSync(k, { recursive: true, force: true });
});

test('vertaa kaatuu, jos alueen laatta jäi piirtämättä', () => {
  const {
    k, lahde, paikattu, lista,
  } = pesat({});
  rmSync(join(paikattu, 'z5', '1', '0.webp'));
  const { koodi, tuloste } = aja('vertaa', '--lahde', lahde, '--paikattu', paikattu, '--lista', lista);
  assert.equal(koodi, 1);
  assert.match(tuloste, /puuttuu/);
  rmSync(k, { recursive: true, force: true });
});
