/*
 * Vuorikohteiden kuvakarusellit.
 *
 * Kuvat valitaan käsin ja katsotaan silmällä, joten testi ei voi sanoa
 * mitään siitä, onko kuva hyvä tai edes oikealta vuorelta. Se voi sanoa
 * kaiken muun: että avain osuu oikeaan kohteeseen, että lisenssirivi on
 * paikallaan ja pelin vakiomuodossa, ettei sama kuva ole kahdesti ja
 * ettei kymmenen kuvan katto ylity.
 *
 * Juuri nämä ovat ne virheet, jotka eivät näy diffiä lukemalla eivätkä
 * peliä katsomalla — puuttuva tekijämerkintä on lisenssirikkomus, joka
 * näyttää ruudulla täsmälleen samalta kuin oikein tehty.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { VUORISTONIMET } from '../js/packs/maasto-nimet-vuoret.js';
import { VUORIKUVAT, vuorikuvat } from '../js/packs/vuori-valokuvat.js';

const AVAIMET = new Set(VUORISTONIMET.map((v) => v.avain));

/*
 * Lisenssirivin muoto: "Tekijä, Wikimedia Commons (CC BY-SA 4.0)" tai
 * pelkkä arkisto ilman tekijää, kun teos on nimetön ("Wikimedia
 * Commons (PD)"). Sulkeissa on aina lisenssi, ja vain PD ja CC
 * kelpaavat — ND ja NC eivät.
 */
const LAHDE = /^(.+, )?Wikimedia Commons \((PD|CC0|CC BY(-SA)? \d\.\d)\)$/;

test('jokainen vuorikuvien avain on olemassa oleva maastonimi', () => {
  for (const avain of Object.keys(VUORIKUVAT)) {
    assert.ok(AVAIMET.has(avain),
      `${avain}: ei vastaa mitään maasto-nimet-vuoret.js:n kohdetta`);
  }
});

test('kuvia on enintään kymmenen kohteessa eikä yhtään kahdesti', () => {
  for (const [avain, kuvat] of Object.entries(VUORIKUVAT)) {
    assert.ok(kuvat.length >= 1, `${avain}: tyhjä lista — jätä kohde pois`);
    assert.ok(kuvat.length <= 10,
      `${avain}: ${kuvat.length} kuvaa, omistajan katto on kymmenen`);
    const nimet = kuvat.map((k) => k.tiedosto);
    assert.equal(new Set(nimet).size, nimet.length,
      `${avain}: sama tiedosto on listalla kahdesti`);
  }
});

test('jokaisella kuvalla on tiedosto, selite ja lisenssirivi tekijöineen', () => {
  for (const [avain, kuvat] of Object.entries(VUORIKUVAT)) {
    for (const kuva of kuvat) {
      const missa = `${avain}/${kuva.tiedosto}`;
      assert.ok(kuva.tiedosto?.length > 0, `${missa}: tiedostonimi puuttuu`);
      assert.doesNotMatch(kuva.tiedosto, /^File:/,
        `${missa}: tiedostonimessä ei ole File:-etuliitettä`);
      assert.ok(kuva.selite?.length > 20, `${missa}: selite puuttuu tai on liian lyhyt`);
      assert.match(kuva.lahde ?? '', LAHDE,
        `${missa}: lisenssirivi ei ole pelin vakiomuodossa`);
    }
  }
});

test('sama kuva ei ole kahden eri vuoren galleriassa', () => {
  const nahty = new Map();
  for (const [avain, kuvat] of Object.entries(VUORIKUVAT)) {
    for (const kuva of kuvat) {
      const aiempi = nahty.get(kuva.tiedosto);
      assert.equal(aiempi, undefined,
        `${kuva.tiedosto}: sama kuva sekä kohteessa ${aiempi} että ${avain}`);
      nahty.set(kuva.tiedosto, avain);
    }
  }
});

test('vuorikuvat() erottaa kuratoimattoman kohteen tyhjästä listasta', () => {
  assert.equal(vuorikuvat('ei-tallaista-vuorta'), null);
  const kuratoitu = Object.keys(VUORIKUVAT)[0];
  if (kuratoitu) assert.ok(vuorikuvat(kuratoitu).length > 0);
});
