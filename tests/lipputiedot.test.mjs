/*
 * Lippuikkunan eheystarkistus (omistajan tilaus 15.8.2026).
 *
 * Versiolippujen polut ovat käsin kirjoitettuja — kuollut polku
 * näkyisi vasta juuri sitä nappia painamalla. Avainten on myös
 * oltava oikeita Commons-tiedostonimiä (samat kuin kategoria.maaLippu
 * ja paikalliskopiotaulu), tai lippu ei muutu napiksi lainkaan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { LIPPUTIEDOT } from '../js/packs/lipputiedot.js';
import { LIPUT_PAIKALLISET } from '../js/packs/liput-paikalliset.js';

const SW = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');

test('jokainen versiolippu ja tunnus osoittaa olemassa olevaan tiedostoon', () => {
  for (const [avain, tiedot] of Object.entries(LIPPUTIEDOT)) {
    for (const kohta of [...(tiedot.versiot ?? []), ...(tiedot.tunnukset ?? [])]) {
      assert.ok(existsSync(new URL(`../${kohta.polku}`, import.meta.url)),
        `${avain}/${kohta.nimi}: tiedostoa ${kohta.polku} ei ole`);
      assert.ok(SW.includes(`'./${kohta.polku}'`),
        `${kohta.polku} puuttuu sw.js:n SHELL-listalta`);
    }
    assert.ok(tiedot.maa && (tiedot.kappaleet ?? []).length >= 1,
      `${avain}: maa ja vähintään yksi historia-kappale vaaditaan`);
  }
});

test('avaimet ovat pelin tuntemia lipputiedostoja', () => {
  for (const avain of Object.keys(LIPPUTIEDOT)) {
    assert.ok(LIPUT_PAIKALLISET.has(avain),
      `${avain} ei ole paikalliskopiotaulussa (liput-paikalliset.js) — `
      + 'kategoria.maaLippu ei koskaan osu siihen');
  }
});

/*
 * ISON LIPUN TERÄVYYS (omistajan iPad-havainto 17.8.2026: Soulin lehden
 * lippuikkunassa lippu näytti sumealta ja porrastuneelta).
 *
 * Syy oli pikselimitoissa: repon lippukopiot on tallennettu SAAPUMIS-
 * KORTIN kokoisiksi (120 tai 250 px leveitä), mutta lippuikkuna näyttää
 * lipun 404 CSS-pikselin levyisenä — iPadin kaksinkertaisella tiheydellä
 * 809 ja iPhonen kolminkertaisella 1213 laitepikseliä. Sama ansa oli
 * aiemmin valokuvien suurennoksessa (13.8.2026).
 *
 * Vartio lukee PNG-otsakkeista, riittääkö paikalliskopio ikkunan
 * tarpeeseen. Jos ei riitä, js/liput.js:n on pyydettävä suurennos
 * Commonsista (lippuVara) ja jätettävä paikalliskopio varareitiksi.
 * Jos repoon joskus haetaan isot liput, tämä vartio sallii paluun
 * paikalliseen lähteeseen ilman muutoksia.
 */
const LIPUT_JS = readFileSync(new URL('../js/liput.js', import.meta.url), 'utf8');
const TARVE_LAITEPIKSELIA = 809;

function pngLeveys(polku) {
  const otsake = readFileSync(polku).subarray(0, 24);
  if (otsake.readUInt32BE(0) !== 0x89504e47) return null;
  return otsake.readUInt32BE(16);
}

test('lippuikkunan iso lippu on tarpeeksi suuri iPadin pikselitiheydelle', () => {
  const pyydetty = Number(LIPUT_JS.match(/ISO_LIPPU_LEVEYS = (\d+)/)?.[1] ?? 0);
  assert.ok(pyydetty >= TARVE_LAITEPIKSELIA,
    `js/liput.js pyytää lippua ${pyydetty} px leveänä — ikkuna näyttää sen `
    + `${TARVE_LAITEPIKSELIA} laitepikselin levyisenä iPadilla`);

  const pienimmat = [];
  for (const avain of Object.keys(LIPPUTIEDOT)) {
    const tiedosto = LIPUT_PAIKALLISET.get(avain);
    if (!tiedosto) continue;
    const leveys = pngLeveys(new URL(`../assets/liput/${tiedosto}`, import.meta.url));
    if (leveys !== null && leveys < TARVE_LAITEPIKSELIA) pienimmat.push(`${tiedosto} (${leveys} px)`);
  }
  if (!pienimmat.length) return;
  assert.match(
    LIPUT_JS,
    /asetaKuva\(iso, lippuVara\(tiedosto, ISO_LIPPU_LEVEYS\), lippuUrl\(tiedosto, ISO_LIPPU_LEVEYS\)\)/,
    'paikalliskopiot ovat ikkunaa pienempiä (esim. '
    + `${pienimmat.slice(0, 3).join(', ')}), joten ison lipun on tultava `
    + 'suurennoksena Commonsista ja paikalliskopion jäätävä varareitiksi',
  );
});
