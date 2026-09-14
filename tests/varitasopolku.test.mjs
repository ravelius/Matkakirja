/*
 * VÄRITASON LAATTAPOLKU — MAA ON OSOITTEESSA (14.9.2026).
 *
 * === MITÄ TÄMÄ VARTIOI, JA MIKSI SE ON OMA TIEDOSTONSA ==============
 *
 * Kaistat-raportin luku 5 (13.9.2026) mittasi vian, jota yksikään
 * testi ei tuolloin nähnyt: kaikkien 27 maan tasoituslaatat
 * kirjoitettiin ämpärissä SAMAAN avaimeen
 * `julisteet/pyramidi/2026-09-13-tasoitus/vari/z<z>/<x>/<y>.webp`.
 * Polussa ei ollut maata, ja `varitasot[ISO].versio` oli kaikilla sama
 * merkkijono. Maiden laatikot menevät päällekkäin, joten peräkkäiset
 * maa-ajot ylikirjoittivat toisensa — todisteena kolme eri
 * Last-Modified-aikaa saman laataston laatoissa ja Ranskan laatastoon
 * jäänyt Espanjan reikä (docs/raportit/kuvat/kaistat-laatan-alfa.png).
 *
 * Vika oli HILJAINEN kahdella tavalla, ja juuri siksi nämä väitteet
 * ovat olemassa:
 *
 *   1. LAATTA LÖYTYI AINA. 404:ää ei tullut, koska osoitteessa oli
 *      laatta — vain väärän maan. Kartta näytti ehjältä.
 *   2. LUETTELO NÄYTTI OIKEALTA. `varitasot[FRA]` ja `varitasot[ESP]`
 *      olivat kumpikin täysin kelvollisia kirjauksia; mikään kenttä ei
 *      kertonut, että ne osoittavat samaan tiedostoon.
 *
 * Väitteet 1–3 vartioivat itse kaavaa, 4 sitä että GENERAATTORI JA
 * PELI tuottavat saman polun (ei kahta kopiota kaavasta), 5 siirtymää
 * (ämpärissä nyt olevat kirjaukset lukevat vanhan polun ennallaan) ja
 * 6 sitä, että versioportti ja työnkulku lukevat saman kaavan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { varitasonKansio, varitasonLaattapolku } from '../js/laattapyramidi.js';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const GENERAATTORI = join(JUURI, 'tools/generoi-laattapyramidi.mjs');
const PORTTI = join(JUURI, 'tools/tarkista-varitason-portti.mjs');

const kirjaus = (maa, lisa = {}) => ({
  versio: '2026-09-14-tasoitus', maa, maaPolussa: true, ...lisa,
});

/* ------------------------------------------------- 1. kaava itsessään */

test('maa on väritason laattapolussa', () => {
  assert.equal(varitasonKansio(kirjaus('FRA')), '2026-09-14-tasoitus/vari/FRA');
  assert.equal(
    varitasonLaattapolku(kirjaus('FRA'), 4, 9, 3),
    '2026-09-14-tasoitus/vari/FRA/z4/9/3.webp',
  );
});

test('kaksi maata samalla versiolla eivät voi kirjoittaa samaan avaimeen', () => {
  const fra = varitasonLaattapolku(kirjaus('FRA'), 4, 9, 3);
  const esp = varitasonLaattapolku(kirjaus('ESP'), 4, 9, 3);
  assert.notEqual(fra, esp,
    'sama osoite kahdelle maalle — juuri tämä ylikirjoitti Ranskan laataston '
    + '(kaistat-raportti, luku 5)');
  /* Ja sama myös laataston jokaisella tasolla ja ruudulla. */
  for (const z of [4, 5, 6, 7, 8]) {
    assert.notEqual(
      varitasonLaattapolku(kirjaus('FRA'), z, 1, 1),
      varitasonLaattapolku(kirjaus('ESP'), z, 1, 1),
    );
  }
});

test('kansio ilman versiota on ajokansion polku', () => {
  assert.equal(varitasonKansio(kirjaus('FRA'), { versio: false }), 'vari/FRA');
});

/* ------------------------- 2. peli rakentaa osoitteen samasta kaavasta */

test('pelin laattaosoite rakennetaan samasta funktiosta', () => {
  /*
   * Lähdevartio eikä kutsu: `laattaUrl` lukee moduulin sisäistä
   * luetteloa, jota ei voi asettaa ilman verkkoa. Se, mitä tässä on
   * pakko todeta, on ettei väritason haarassa ole TOISTA kopiota
   * polkukaavasta — juuri kahden kopion eriytyminen on se virhe, joka
   * tuottaisi 404:n tai väärän maan laatan.
   */
  const lahde = readFileSync(join(JUURI, 'js/laattapyramidi.js'), 'utf8');
  const haara = lahde.slice(lahde.indexOf('function laattaUrl('));
  const vari = haara.slice(haara.indexOf('if (taso.vari)'), haara.indexOf('return pyramidiUrl(`${luettelo.versio}'));
  assert.match(vari, /varitasonLaattapolku\(/,
    'väritason haara rakentaa polun itse — kaava on vain yhdessä paikassa');
  assert.ok(!/\/vari\/z\$\{/.test(vari),
    'väritason haarassa on yhä vanha maaton kaava');
});

/* ------------------- 3. generaattori ja peli tuottavat saman polun */

/** Väriajon luettelo ja tuloste tuoreena (`--vain-luettelo`). */
function ajo(maa, lisa = []) {
  const kansio = mkdtempSync(join(tmpdir(), 'varipolku-'));
  const tuloste = execFileSync(process.execPath, [
    GENERAATTORI, kansio,
    '--tasot', '4-5',
    '--versio', 'pohja-koe',
    '--vari', maa,
    '--variversio', '2026-09-14-tasoitus',
    '--paletti', 'tasoitus',
    '--vain-luettelo',
    ...lisa,
  ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return {
    tuloste,
    luettelo: JSON.parse(readFileSync(join(kansio, 'pyramidi.json'), 'utf8')),
  };
}

test('generaattorin kirjaama polku on sama kuin pelin lukema polku', () => {
  const { tuloste, luettelo } = ajo('FRA');
  const k = luettelo.varitasot?.FRA;
  assert.ok(k, 'varitasot.FRA puuttuu');
  assert.equal(k.maaPolussa, true,
    'uuden ajon kirjauksessa on oltava maaPolussa — ilman sitä peli lukisi vanhaa polkua');

  /* Peli: luettelosta rakennettu polku. */
  const pelinPolku = varitasonLaattapolku(k, 4, 9, 3, luettelo.muoto ?? 'webp');
  assert.ok(pelinPolku.includes('/vari/FRA/'),
    `maa puuttuu pelin polusta: ${pelinPolku}`);

  /* Generaattori: se polku, jonka ajo ITSE ilmoittaa kirjoittavansa. */
  const osuma = tuloste.match(/polku (\S+)\/z<taso>/);
  assert.ok(osuma, `generaattori ei kertonut polkuaan:\n${tuloste}`);
  assert.equal(`${osuma[1]}/z4/9/3.webp`, pelinPolku,
    'generaattori kirjoittaa eri osoitteeseen kuin peli lukee — 404 tai väärän maan laatta');
});

test('toisen maan ajo kirjoittaa toiseen polkuun', () => {
  const fra = ajo('FRA').luettelo.varitasot.FRA;
  const esp = ajo('ESP').luettelo.varitasot.ESP;
  assert.equal(fra.versio, esp.versio, 'testin lähtökohta: sama versiomerkkijono');
  assert.notEqual(
    varitasonLaattapolku(fra, 4, 9, 3),
    varitasonLaattapolku(esp, 4, 9, 3),
    'sama versio ja sama avain — ajot ylikirjoittaisivat toisensa kuten 13.9.2026',
  );
});

/* --------------------------------------------------- 4. siirtymä */

test('ämpärissä jo oleva kirjaus lukee vanhan maattoman polun ennallaan', () => {
  /* Tarkka kopio siitä, mitä pyramidi.json tänään kertoo (ei maaPolussa-kenttää). */
  const vanha = { versio: '2026-09-13-tasoitus', maa: 'FRA', paletti: 'tasoitus' };
  assert.equal(varitasonLaattapolku(vanha, 4, 9, 3),
    '2026-09-13-tasoitus/vari/z4/9/3.webp',
    'vanha kirjaus sai uuden polun — julkaistu peli pyytäisi laattoja, joita ei ole');
});

test('--vanha-varipolku palauttaa entisen kaavan (vastakoe)', () => {
  const k = ajo('FRA', ['--vanha-varipolku']).luettelo.varitasot.FRA;
  assert.equal(k.maaPolussa, undefined);
  assert.equal(varitasonLaattapolku(k, 4, 9, 3), '2026-09-14-tasoitus/vari/z4/9/3.webp');
});

/* ------------------------------------- 5. versioportti ja työnkulku */

test('versioportti aukeaa maakohtaisella polulla ja kertoo polun', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'polkuportti-'));
  const pallo = join(kansio, 'laatat.json');
  const pyramidi = join(kansio, 'pyramidi.json');
  writeFileSync(pallo, JSON.stringify({
    versio: '2026-09-07a',
    viivat: '2026-09-08a-viivat',
    nostot: '2026-09-08a-nostot',
    ranta: '2026-09-07a-ranta',
  }));
  writeFileSync(pyramidi, JSON.stringify({
    versio: '2026-09-07a',
    laatta: 512,
    muoto: 'webp',
    nostotaso: { versio: '2026-09-08a-nostot', tasot: [4], laatastot: {} },
    viivataso: { versio: '2026-09-08a-viivat', tasot: [4], laatastot: {} },
    rantataso: { versio: '2026-09-07a-ranta', tasot: [4], laatastot: {} },
    varitasot: {
      FRA: {
        versio: '2026-09-14-tasoitus', maa: 'FRA', maaPolussa: true,
        paletti: 'tasoitus', tasot: [4], laatastot: {},
      },
      /* Vanhan muotoinen kirjaus rinnalla: molempien on toimittava. */
      DEU: {
        versio: '2026-09-13-tasoitus', maa: 'DEU',
        paletti: 'tasoitus', tasot: [4], laatastot: {},
      },
    },
    tasot: [{ z: 4, leveys: 400, korkeus: 200, sarakkeita: 1, riveja: 1 }],
  }));
  const aja = (maa) => execFileSync(process.execPath, [
    PORTTI, '--pallo', pallo, '--pyramidi', pyramidi, '--maa', maa,
  ], { encoding: 'utf8' });

  const fra = aja('FRA');
  assert.match(fra, /2026-09-14-tasoitus\/vari\/FRA/,
    `portti ei kertonut maakohtaista polkua:\n${fra}`);
  assert.match(fra, /väritaso näkyy/);

  const deu = aja('DEU');
  assert.match(deu, /2026-09-13-tasoitus\/vari\/z<taso>/,
    `vanha kirjaus ei saanut vanhaa polkua:\n${deu}`);
});

test('generaattori kirjoittaa laatat ja laatastobittikartan SAMAAN polkuun', () => {
  /*
   * MITATTU VIRHE TÄSSÄ ERÄSSÄ (14.9.2026). Laatat siirtyivät polkuun
   * `vari/<ISO>/z…`, mutta `laatastoBase64` luki yhä `vari/z…` —
   * bittikartasta tuli pelkkiä nollia, ja peli päätteli ettei yhtään
   * laattaa ole olemassa. Se ei ole 404 eikä virhe: peli ei pyydä
   * mitään, kerros jää tyhjäksi ja luettelo näyttää täysin oikealta.
   * Savuke-tasoitus-pallo näki sen (`tasoitettuja 0`); tämä vartio
   * näkee sen ilman selainta.
   */
  const lahde = readFileSync(join(JUURI, 'tools/generoi-laattapyramidi.mjs'), 'utf8');
  assert.match(lahde, /laatastoBase64\(m, VARI_KANSIO\)/,
    'bittikartta luetaan eri polusta kuin laatat kirjoitetaan');
  assert.match(lahde, /join\(kohdekansio, \.\.\.VARI_KANSIO\.split\('\/'\)/,
    'laatat kirjoitetaan muualle kuin VARI_KANSIO kertoo');
  assert.ok(!/laatastoBase64\(m, 'vari'\)/.test(lahde),
    'vanha maaton bittikarttapolku on yhä käytössä');
});

test('työnkulku lukee vientipolun pelin omasta funktiosta', () => {
  const yml = readFileSync(join(JUURI, '.github/workflows/generoi-varitaso.yml'), 'utf8');
  assert.match(yml, /varitasonKansio/,
    'vientiaskel kirjoittaa polun uudestaan YAML:iin — kaksi kopiota kaavasta eriytyy');
  assert.ok(!/vari\/\$z"/.test(yml),
    'vientiaskel käyttää yhä maatonta polkua vari/$z');
});
