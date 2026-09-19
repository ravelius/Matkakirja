/*
 * Ihmisen matka: pulun valmiit kysymykset siitä kohdasta, missä pelaaja
 * on (Raamattu, "IHMISEN MATKA: PULUN VALMIIT KYSYMYKSET JOKA JAKSOON").
 *
 * Puhtaat valinnat (jakso, siirtymä, nostokortti, lisänosto) ja
 * lähdekoodivartiot: tervehdys väistyy linssin paikalla, ja
 * esikirjoitettu vastaus ei lähde mallille.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  jaksonKysymystunnus, pulunKysymystilanne, kytkePulunKysymykset, PULUKYSYMYSTEN_LINSSI,
} from '../js/linssit/ihmisen-matka-pulukysymykset.js';
import { IHMISEN_MATKAN_KYSYMYKSET } from '../js/linssit/ihmisen-matka-kysymykset.js';
import { IHMISEN_MATKA_KERTOMUS } from '../js/linssit/ihmisen-matka-kertomus.js';
import { IHMISEN_MATKA_LISANOSTOT } from '../js/linssit/ihmisen-matka-data.js';

const KERTOMUS = IHMISEN_MATKA_KERTOMUS;

test('kertomuksen jokainen löytöpaikka antaa omat kolme kysymystään', () => {
  let loytoja = 0;
  KERTOMUS.forEach((jakso, i) => {
    if (!jakso.kohde) return;
    loytoja += 1;
    const tila = pulunKysymystilanne({ kertomus: KERTOMUS, indeksi: i });
    assert.ok(tila, `${jakso.id}: ei kysymyksiä`);
    assert.equal(tila.tunnus, jakso.kohde);
    assert.equal(tila.kysymykset.length, 3, jakso.id);
    for (const k of tila.kysymykset) {
      const v = tila.vastaus(k);
      assert.ok(v?.vastaus && v.lahteet?.length, `${jakso.id}: "${k}" ilman vastausta`);
    }
  });
  // Kertomuksessa on 16 löytöpaikkaa; loput neljä pääjaksoa (esim.
  // Blombos) tavoitetaan nostokortilta, jolla on samat kysymykset.
  assert.ok(loytoja >= 16 && loytoja <= Object.keys(IHMISEN_MATKAN_KYSYMYKSET).length);
  for (const tunnus of Object.keys(IHMISEN_MATKAN_KYSYMYKSET)) {
    assert.equal(pulunKysymystilanne({ avoinNosto: tunnus })?.kysymykset.length, 3, tunnus);
  }
});

test('siirtymäjakso antaa edellisen löytöpaikan kysymykset, avaus ei mitään', () => {
  assert.equal(pulunKysymystilanne({ kertomus: KERTOMUS, indeksi: 0 }), null, 'avaus');
  const ensimmainen = KERTOMUS.findIndex((j) => j.kohde);
  assert.equal(jaksonKysymystunnus(KERTOMUS, ensimmainen - 1), null, 'ennen ensimmäistä löytöä');
  const siirtyma = KERTOMUS.findIndex((j, i) => i > ensimmainen && !j.kohde);
  assert.ok(siirtyma > 0, 'kertomuksessa on siirtymäjakso');
  const edellinen = KERTOMUS.slice(0, siirtyma).reverse().find((j) => j.kohde).kohde;
  assert.equal(jaksonKysymystunnus(KERTOMUS, siirtyma), edellinen);
  // Indeksi yli lopun: viimeinen löytöpaikka (tutkimusvaihe).
  const viimeinen = [...KERTOMUS].reverse().find((j) => j.kohde).kohde;
  assert.equal(jaksonKysymystunnus(KERTOMUS, KERTOMUS.length + 5), viimeinen);
});

test('auki oleva nostokortti voittaa esityksen jakson', () => {
  const tila = pulunKysymystilanne({ kertomus: KERTOMUS, indeksi: 0, avoinNosto: 'denisova' });
  assert.equal(tila.tunnus, 'denisova');
  assert.equal(tila.avain, 'jakso:denisova');
  assert.equal(tila.lisanosto, false);
});

test('lisänoston kortti antaa sen omat kysymykset mallireitille', () => {
  const lisa = IHMISEN_MATKA_LISANOSTOT.find((l) => l.kysymykset?.length);
  const tila = pulunKysymystilanne({ kertomus: KERTOMUS, indeksi: 5, avoinNosto: lisa.tunnus });
  assert.equal(tila.lisanosto, true);
  assert.equal(tila.avain, `lisanosto:${lisa.tunnus}`);
  assert.deepEqual(tila.kysymykset, lisa.kysymykset.slice(0, 3));
  assert.equal(tila.vastaus(tila.kysymykset[0]), null, 'lisänostolla ei esikirjoitettua vastausta');
});

test('kytkentä lukee ajon ja kortin tilan, ja purku poistaa vain oman kyselynsä', () => {
  const ui = { nostokortti: { tila: () => ({ auki: null }) } };
  const ajo = { kaari: { kertomus: KERTOMUS }, esitys: { tila: () => ({ indeksi: KERTOMUS.findIndex((j) => j.kohde === 'chauvet') }) } };
  const pura = kytkePulunKysymykset(ui, ajo);
  assert.equal(ui.pulunLinssikysymykset().tunnus, 'chauvet');
  ui.nostokortti.tila = () => ({ auki: 'yana' });
  assert.equal(ui.pulunLinssikysymykset().tunnus, 'yana');
  const toinen = () => null;
  ui.pulunLinssikysymykset = toinen;
  pura();
  assert.equal(ui.pulunLinssikysymykset, toinen, 'toisen ajon kysely jäi');
  assert.equal(PULUKYSYMYSTEN_LINSSI, 'ihmisen-matka');
});

/* ── lähdekoodivartiot ─────────────────────────────────────────── */

const POLLO = readFileSync(new URL('../js/pollo.js', import.meta.url), 'utf8');
const AIKAJANA = readFileSync(new URL('../js/aikajana.js', import.meta.url), 'utf8');

test('tervehdys väistyy linssin kysymysten tieltä', () => {
  assert.match(POLLO, /\) && !this\.linssikysymykset\(\)\) \{[\s\S]{0,200}this\.naytaTervehdys\(\);/);
  // Linssi ohittaa kaupunkipakan lipun (VALMISKYSYMYKSET_KAYTOSSA).
  const alku = POLLO.indexOf('  naytaValmiit(avain = this.kysymysAvain()) {');
  const lippu = POLLO.indexOf('if (!VALMISKYSYMYKSET_KAYTOSSA) return false;', alku);
  const linssi = POLLO.indexOf('if (linssi) return this.naytaLinssinValmiit(linssi, avain);', alku);
  assert.ok(linssi > alku && linssi < lippu);
});

test('esikirjoitettu vastaus ei kutsu mallia', () => {
  const alku = POLLO.indexOf('  vastaaLinssinValmiilla(teksti) {');
  const loppu = POLLO.indexOf('\n  }\n', alku);
  const runko = POLLO.slice(alku, loppu);
  assert.ok(alku > 0);
  assert.doesNotMatch(runko, /this\.pyyda\(|fetch\(|kysyUlkoisesti/);
  // kysy vain kun vastausta ei ole (lisänosto) tai linssi on jo kiinni.
  assert.equal((runko.match(/this\.kysy\(teksti\)/g) ?? []).length, 2);
  assert.match(runko, /textContent|polloElementti\('a'/);
});

test('aikajana kytkee kyselyn vain Ihmisen matkalle ja purkaa sen', () => {
  assert.match(AIKAJANA, /linssi\.tunnus === PULUKYSYMYSTEN_LINSSI\s*\?\s*kytkePulunKysymykset\(ui, ajo\)/);
  // Purku ajon omassa purussa: js/ui.js:n sulku kutsuu pura():a suoraan.
  assert.match(AIKAJANA, /this\.ui\.nostokortti = null;[\s\S]{0,200}this\.ui\.purePulunKysymykset\?\.\(\);/);
});
