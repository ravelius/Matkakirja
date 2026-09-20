/*
 * POLTTOVELAT 20.9.2026 — neljä vikaa, jotka löytyivät yön pohja-ajossa
 * (docs/raportit/viesti-fable-pohja-20260920.md, Fablen päätös samana
 * aamuna).
 *
 * Jokainen niistä maksoi ajon tai olisi julkaissut väärää:
 *
 *   1. Luettelojobi rakentaa luettelon tyhjästä eikä tunne väriajojen
 *      `varitasot`-taulua eikä aiempien ajojen `erat`-kirjanpitoa, joten
 *      ne katosivat ja Fable joutui palauttamaan ne käsin.
 *   2. Pelkkä nostotasoajo kirjoitti `pohja.rantaviiva: true`, vaikka
 *      pohja on poltettu ILMAN rantaviivaa — luettelo valehteli.
 *   3. Shardin valmis-merkki ei tuntenut versiota, joten uusi versio
 *      ohitti vanhat shardit "valmiina" ja olisi julistanut vanhat
 *      laatat uudeksi versioksi.
 *   4. Pallosarjan oletus oli nostojen KANSSA, vaikka tuotanto lukee
 *      nostot lepokerroksesta; poltettuna ne piirtyisivät kahdesti.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  mkdtempSync, mkdirSync, writeFileSync, readFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const KOKOAJA = join(JUURI, 'tools', 'kokoa-nostotasot.mjs');
const POLTTO = readFileSync(join(JUURI, 'tools', 'polta-paikallisesti.sh'), 'utf8');

/** Polttokansio, jossa on yksi nostoshardi ja sen luettelo. */
function tekoPoltto() {
  const ulos = mkdtempSync(join(tmpdir(), 'polttovelat-'));
  const shardi = join(ulos, 'nosto-z5-z7-FRA');
  mkdirSync(shardi, { recursive: true });
  writeFileSync(join(shardi, 'pyramidi.json'), JSON.stringify({
    nostotasot: {
      FRA: {
        versio: 'koe-nostot',
        maa: 'FRA',
        saanto: 'v11-limitys',
        tasot: [5, 6, 7],
        nostot: { eiffel: 'abc123' },
        laatastot: { 5: 'AA==' },
      },
    },
  }));
  // Luettelojobin tuore luettelo: ei varitasoja, ei eriä, ja pohjan
  // kenttä väärin päin (juuri se, mitä nostoajo kirjoitti).
  const luettelo = join(ulos, 'pyramidi.json');
  writeFileSync(luettelo, JSON.stringify({
    versio: '2026-09-20-pohja',
    pohja: { rantaviiva: true },
    nostotaso: { versio: 'koe-nostot' },
  }));
  // Ämpärin luettelo: väritasot, erät ja oikea pohjan tieto.
  const ampari = join(ulos, 'ampari-luettelo.json');
  writeFileSync(ampari, JSON.stringify({
    versio: '2026-09-07a',
    pohja: { rantaviiva: false },
    varitasot: { FRA: { versio: 'vari-koe', maa: 'FRA', tasot: [4, 5] } },
    erat: [{ ajo: 'vanha', tasot: '0-8' }],
  }));
  return { ulos, luettelo, ampari };
}

const aja = (args) => execFileSync(process.execPath, [KOKOAJA, ...args], { stdio: 'pipe' });

test('1+2: kokoaja kantaa varitasot ja erat, ja jättää pohjan ämpärin tiedoksi', () => {
  const { ulos, luettelo, ampari } = tekoPoltto();
  aja(['--ulos', ulos, '--luettelo', luettelo, '--ampari', ampari, '--pohja-ennallaan']);
  const tulos = JSON.parse(readFileSync(luettelo, 'utf8'));
  assert.equal(Object.keys(tulos.nostotasot ?? {}).length, 1, 'nostotasot ei koottu');
  assert.ok(tulos.varitasot?.FRA?.tasot?.length,
    'varitasot katosi — väri sammuisi jokaisesta maasta, jolle se on poltettu');
  assert.equal(tulos.erat?.length, 1, 'erat-kirjanpito katosi');
  assert.deepEqual(tulos.pohja, { rantaviiva: false },
    'nostoajo väitti pohjasta jotain, mitä se ei polttanut');
});

test('1+2: ilman --pohja-ennallaan pohjan kenttä on ajon oma (pohja-ajo)', () => {
  const { ulos, luettelo, ampari } = tekoPoltto();
  aja(['--ulos', ulos, '--luettelo', luettelo, '--ampari', ampari]);
  const tulos = JSON.parse(readFileSync(luettelo, 'utf8'));
  assert.deepEqual(tulos.pohja, { rantaviiva: true },
    'pohja-ajon oma tieto ei saa kadota');
  assert.ok(tulos.varitasot?.FRA, 'varitasot kannetaan myös pohja-ajossa');
});

test('1: kokoaja ei ylikirjoita ajon omia varitasoja ämpärin vanhoilla', () => {
  const { ulos, luettelo, ampari } = tekoPoltto();
  const oma = JSON.parse(readFileSync(luettelo, 'utf8'));
  oma.varitasot = { DEU: { versio: 'uusi', maa: 'DEU', tasot: [6] } };
  writeFileSync(luettelo, JSON.stringify(oma));
  aja(['--ulos', ulos, '--luettelo', luettelo, '--ampari', ampari]);
  const tulos = JSON.parse(readFileSync(luettelo, 'utf8'));
  assert.deepEqual(Object.keys(tulos.varitasot), ['DEU'],
    'ajon oma varitasot-taulu korvautui ämpärin vanhalla');
});

test('3: valmis-merkki tuntee ajon tunnuksen, ja ohitus vaatii saman', () => {
  assert.match(POLTTO, /ajon_tunnus \(\) \{/, 'ajon tunnusta ei lasketa');
  assert.match(POLTTO, /valmis_tasmaa \(\) \{/, 'ohitus ei tarkista tunnusta');
  // Tunnuksessa on kaikki versiot ja liput, jotka muuttavat laattaa.
  for (const kentta of ['VERSIO', 'VIIVAVERSIO', 'NOSTOVERSIO', 'RANTAVERSIO',
    'ILMAN_RANTAVIIVAA', 'HAHMOTELMAT', 'PALLOTUNNISTE', 'PALLON_NOSTOT']) {
    assert.ok(new RegExp(`\\$\\{${kentta}:-`).test(POLTTO),
      `ajon tunnus ei tunne muuttujaa ${kentta}`);
  }
  // Merkki kirjoitetaan tunnuksen kanssa eikä pelkkinä lukuina.
  assert.match(POLTTO, /printf '%s %s %s\\n' "\$laattoja" "\$kesto" "\$\(ajon_tunnus\)"/);
  // Ohitus ei saa katsoa pelkkää tiedoston olemassaoloa. (Kesken
  // jääneiden shardien RAPORTTI saa: siinä kysymys on vain siitä,
  // ajettiinko shardi lainkaan.)
  assert.doesNotMatch(POLTTO, /UUDESTAAN" -eq 0 \] && \[ -f "\$ULOS\/lokit/,
    'ohitus katsoo yhä pelkkää tiedoston olemassaoloa');
  assert.equal((POLTTO.match(/UUDESTAAN" -eq 0 \] && valmis_tasmaa/g) ?? []).length, 3,
    'kaikki kolme ohituskohtaa eivät tarkista tunnusta');
});

test('4: pallosarjan ja nostotason oletukset ovat samat kuin tuotannossa', () => {
  assert.match(POLTTO, /^PALLON_NOSTOT=""$/m,
    'pallosarjan oletus polttaa nostot — ne piirtyisivät kahdesti');
  assert.match(POLTTO, /--pallon-nostot\) PALLON_NOSTOT="--nostot"/,
    'nostojen poltolle ei ole omaa lippua');
  assert.match(POLTTO, /\[ "\$HAHMOTELMAT" -eq 0 \] && nostoarg="\$nostoarg --ilman-hahmotelmia"/,
    'hahmotelmat poltetaan yhä oletuksena');
});
