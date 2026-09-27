/*
 * KUVIEN TEKIJÄMERKINNÄT — VARTIJA (Fablen erä 27.9.2026: "jokaisen
 * kuvan tekijä/lähde/lisenssi näkyy, havainnekuvat merkittynä; uusi kuva
 * ilman tekijätietoa kaataa testin").
 *
 * tools/kuvatekijat.mjs luokittelee viennin jokaisen kuvaviitteen samalla
 * säännöllä kuin peli (js/kuvatekija.js). Sallitut luokat:
 *   taysi          tekijä, lisenssi ja lähde
 *   havainnekuva   tekoälyllä tuotettu, merkitty
 *   oma            pelin oma paino (julisteet)
 *   pd-ei-tekijaa  public domain, tekijä tuntematon (rivillä "tekijä tuntematon")
 * Kielletyt: tuntematon, tekija-puuttuu (CC BY ilman tekijää), lisenssi-puuttuu.
 *
 * KORJAUS, KUN TÄMÄ KAATUU: lisää kuvalle lahde-kenttä ("Tekijä, Wikimedia
 * Commons (CC BY-SA 4.0)" tai "Matkakirjan havainnekuva"), tai Commons-kuvalle
 * aja `node tools/hae-commons-tekijat.mjs --kirjoita`.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { kokoaVienti } from '../tools/vienti/vie-sisalto.mjs';
import { kuvienTekijat } from '../tools/kuvatekijat.mjs';
import { COMMONS_TEKIJAT } from '../js/packs/commons-tekijat.js';
import { onTekija, taydennaLahde } from '../js/kuvatekija.js';
import { lisenssiKelpaa, aaniLisenssiTunnus } from '../js/lisenssi.js';
import { LAHTEET } from '../js/lahteet.js';
import { LIPPU_TEKIJAT } from '../js/packs/lippu-tekijat.js';

const SALLITUT = new Set(['taysi', 'havainnekuva', 'oma', 'pd-ei-tekijaa']);
const { tiedostot } = await kokoaVienti();
const kuvat = kuvienTekijat(tiedostot);
const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('jokaisella pelin kuvalla on tekijä, lisenssi ja lähde tai havainnekuva-merkintä', () => {
  assert.ok(kuvat.length > 15000, `kuvia ${kuvat.length}`);
  const vialliset = kuvat.filter((k) => !SALLITUT.has(k.luokka));
  assert.deepEqual(vialliset.map((k) => `${k.luokka} · ${k.moduuli} · ${k.arvo}`).slice(0, 25), [],
    `${vialliset.length} kuvaa ilman tekijätietoa (ks. testin alun korjausohje)`);
});

test('havainnekuvia ja täysiä merkintöjä on (luokittelu ei ole tyhjentynyt)', () => {
  const luku = (l) => kuvat.filter((k) => k.luokka === l).length;
  assert.ok(luku('taysi') > 15000, `taysi ${luku('taysi')}`);
  assert.ok(luku('havainnekuva') > 1500, `havainnekuva ${luku('havainnekuva')}`);
});

test('Commons-täydennys: jokaisella rivillä sallittu lisenssi, tekijä tai "tuntematon"', () => {
  const rivit = Object.entries(COMMONS_TEKIJAT);
  assert.ok(rivit.length > 300);
  for (const [nimi, [tekija, lisenssi]] of rivit) {
    assert.ok(lisenssi, `${nimi}: lisenssi puuttuu`);
    const t = aaniLisenssiTunnus(lisenssi);
    assert.ok(t == null || lisenssiKelpaa(t), `${nimi}: ${lisenssi}`);
    assert.ok(!/see (the )?file history|unknown author/i.test(tekija), `${nimi}: roskatekijä "${tekija}"`);
  }
});

test('taydennaLahde: puuttuva tekijä ja lisenssi Commonsista, tuntematon sanotaan', () => {
  const [nimi] = Object.entries(COMMONS_TEKIJAT).find(([, [t, l]]) => !t && /public domain/i.test(l));
  assert.match(taydennaLahde(`Wikimedia Commons, "${nimi}"`, { tiedosto: nimi }), /^tekijä tuntematon, Wikimedia Commons \(Public domain\)$/i);
  const [tekijalla, [tekija]] = Object.entries(COMMONS_TEKIJAT).find(([, [t]]) => t);
  assert.ok(taydennaLahde('', { tiedosto: tekijalla }).startsWith(`${tekija}, Wikimedia Commons (`));
  // Täysi merkintä ja tuntematon kuva pysyvät ennallaan.
  assert.equal(taydennaLahde('Diego Delso, Wikimedia Commons (CC BY-SA 4.0)', { tiedosto: tekijalla }),
    'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)');
  assert.equal(taydennaLahde('Matkakirjan havainnekuva', { tiedosto: 'ei-taulussa.jpg' }), 'Matkakirjan havainnekuva');
  assert.equal(onTekija('Wikimedia Commons (CC BY-SA 4.0)'), false);
  assert.equal(onTekija('Diego Delso, Wikimedia Commons (CC BY-SA 4.0)'), true);
});

test('peli käyttää täydennystä kaikissa lähderiveissä (taytaLahderivi)', () => {
  assert.match(lue('../js/tekijakortti.js'), /const teksti = taydennaLahde\(lahde, kohde\);/);
});

test('aarrekuvan paljastuskortissa EI ole havainnekuva-merkkiä (omistaja 18.3x)', () => {
  assert.doesNotMatch(lue('../js/ui.js'), /reveal-havainne/);
  assert.doesNotMatch(lue('../css/styles.css'), /reveal-havainne/);
});

test('Tekijät ja lähteet: havainnekuvat, NASA, OSM ja kaikki nimeämistä vaativat liput', () => {
  const rivit = LAHTEET.find((r) => r.otsikko === 'Valokuvat ja kuvitus').rivit;
  assert.ok(rivit.some((r) => /Havainnekuvat/.test(r.nimi) && /havainnekuva/.test(r.tekija)));
  assert.ok(rivit.some((r) => /NASA/.test(r.nimi)));
  assert.ok(rivit.some((r) => /OpenStreetMap/.test(r.tekija)));
  const liput = rivit.find((r) => r.nimi === 'Lippukuvat');
  assert.equal(liput.tekija.split('vaativat:')[1].split(';').length, LIPPU_TEKIJAT.length, liput.tekija);
});
