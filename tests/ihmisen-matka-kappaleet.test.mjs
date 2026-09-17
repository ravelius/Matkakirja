/*
 * IHMISEN MATKA — TEKSTITYS LYHYEMPINÄ KAPPALEINA.
 *
 *   NODE_USE_ENV_PROXY=1 node --test tests/ihmisen-matka-kappaleet.test.mjs
 *
 * Raamattu "IHMISEN MATKA -LINSSI: RINTAMAN VALKKYMINEN, MUSTA ALKU,
 * LIIKU POIS", JATKO 2 (omistaja 16.9.2026 klo 15.40 UTC, kaksi
 * iPhone-kuvaa avaruusvaiheen jälkeen, sanatarkasti): *"Tee
 * tekstityksestä lyhyempiä kappaleita, että ei mene niin paljon kartan
 * päälle."*
 *
 * Tässä vartioidaan JAON PUHTAAT FUNKTIOT — se osa, joka ratkaisee
 * kuinka korkeaksi laatikko kasvaa. Laatikon todellinen korkeus
 * pikseleinä mitataan selaimessa
 * (tools/savukkeet/savuke-ihmisen-kappaleet.mjs, 390 ja 1400).
 *
 * VÄITTEET:
 *   1. Osa on aina KOKONAISIA virkkeitä: virkettä ei katkaista, eikä
 *      osien yhdistäminen muuta tekstistä merkkiäkään.
 *   2. Osa on enintään OSAN_VIRKKEET virkettä ja OSAN_MERKIT merkkiä.
 *   3. Yksin liian pitkä virke jää omaksi osakseen sellaisenaan.
 *   4. Osat ovat suunnilleen samanmittaisia — ahne täyttö jätti
 *      hännäksi yhden lyhyen virkkeen omaan laatikkoonsa.
 *   5. Hetket seuraavat luentaa: aikaleimoilla osan hetki on sen
 *      ENSIMMÄISEN virkkeen leima, ilman leimoja merkkiosuus.
 *   6. Kaanonin JOKAINEN kappale mahtuu rajoihin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  OSAN_MERKIT, OSAN_VIRKKEET, jaaLauseiksi, jaaOsiin, osienHetket, lauseidenHetket,
} from '../js/linssit/ihmisen-matka-esitys.js';
import { IHMISEN_MATKA_KERTOMUS } from '../js/linssit/ihmisen-matka-kertomus.js';

/** Sama normalisointi kuin jaaLauseiksi tekee. */
const siisti = (t) => String(t ?? '').replace(/\s+/g, ' ').trim();

test('osa on kokonaisia virkkeitä eikä tekstistä katoa merkkiäkään', () => {
  for (const jakso of IHMISEN_MATKA_KERTOMUS) {
    const osat = jaaOsiin(jakso.teksti);
    assert.ok(osat.length >= 1, `${jakso.id}: ei osia`);
    // Osat yhteen = koko kappale, sanasta sanaan.
    assert.equal(osat.map((o) => o.teksti).join(' '), siisti(jakso.teksti),
      `${jakso.id}: jako muuttaa tekstiä`);
    // Jokainen osa alkaa ja päättyy virkerajalle.
    const lauseet = jaaLauseiksi(jakso.teksti).map((l) => l.teksti);
    let i = 0;
    for (const osa of osat) {
      const omat = lauseet.slice(i, i + osa.virkkeita);
      assert.equal(osa.teksti, omat.join(' '), `${jakso.id}: osa katkeaa kesken virkkeen`);
      assert.equal(osa.lause, i, `${jakso.id}: osan lauseindeksi on väärä`);
      i += osa.virkkeita;
    }
    assert.equal(i, lauseet.length, `${jakso.id}: virkkeitä jäi jakamatta`);
    // `alku` on osan ensimmäisen virkkeen merkkikohta normalisoidussa tekstissä.
    const koko = siisti(jakso.teksti);
    for (const osa of osat) {
      assert.equal(koko.slice(osa.alku, osa.alku + osa.teksti.length), osa.teksti,
        `${jakso.id}: osan alkukohta ei osu tekstiin`);
    }
  }
});

test('kaanonin jokainen osa mahtuu kolmeen virkkeeseen ja 240 merkkiin', () => {
  assert.equal(OSAN_MERKIT, 240);
  assert.equal(OSAN_VIRKKEET, 3);
  let pisin = 0;
  for (const jakso of IHMISEN_MATKA_KERTOMUS) {
    for (const osa of jaaOsiin(jakso.teksti)) {
      assert.ok(osa.virkkeita <= OSAN_VIRKKEET,
        `${jakso.id}: osassa ${osa.virkkeita} virkettä`);
      assert.ok(osa.teksti.length <= OSAN_MERKIT,
        `${jakso.id}: osassa ${osa.teksti.length} merkkiä — ${osa.teksti}`);
      pisin = Math.max(pisin, osa.teksti.length);
    }
  }
  // Vartio toiseen suuntaan: jako ei saa pilkkoa kaikkea jauheeksi.
  assert.ok(pisin > 150, `pisin osa vain ${pisin} merkkiä`);
});

test('yksin liian pitkä virke jää omaksi osakseen, ei katkea', () => {
  const pitka = `${'sana '.repeat(70).trim()}.`;
  assert.ok(pitka.length > OSAN_MERKIT);
  const osat = jaaOsiin(pitka);
  assert.equal(osat.length, 1);
  assert.equal(osat[0].teksti, pitka);
  // Ja pitkän virkkeen perässä oleva lyhyt saa oman osansa.
  const pari = jaaOsiin(`${pitka} Lyhyt.`);
  assert.equal(pari.length, 2);
  assert.equal(pari[1].teksti, 'Lyhyt.');
});

test('osat ovat suunnilleen samanmittaisia — ei yhden virkkeen häntää', () => {
  /*
   * MITATTU AHNEELLA TÄYTÖLLÄ (ennen tasajakoa): 'denisova' katkesi
   * 234 + 35 merkkiin, eli viimeinen laatikko välähti ruudulla parin
   * sekunnin ajan yhtenä lyhyenä virkkeenä. Tasajaon jälkeen osat ovat
   * 135 + 134.
   */
  const denisova = IHMISEN_MATKA_KERTOMUS.find((j) => j.id === 'denisova');
  const osat = jaaOsiin(denisova.teksti);
  assert.equal(osat.length, 2);
  const pituudet = osat.map((o) => o.teksti.length);
  assert.ok(Math.max(...pituudet) - Math.min(...pituudet) < 30, JSON.stringify(pituudet));
  // Sama vaatimus koko kaanonille: kun kappale jaetaan, viimeinen osa
  // ei saa olla murto-osa muista — paitsi jos se on kaanonin oma
  // lyhyt huipennus (yksi virke, alle 40 merkkiä).
  for (const jakso of IHMISEN_MATKA_KERTOMUS) {
    const o = jaaOsiin(jakso.teksti);
    if (o.length < 2) continue;
    const viim = o[o.length - 1];
    const muut = o.slice(0, -1).reduce((s, x) => s + x.teksti.length, 0) / (o.length - 1);
    assert.ok(viim.teksti.length >= muut * 0.35
      || (viim.virkkeita === 1 && viim.teksti.length < 40),
      `${jakso.id}: häntäosa ${viim.teksti.length} vs ${Math.round(muut)}`);
  }
});

test('yhden virkkeen tilassa jako on sama kuin jaaLauseiksi (avaus)', () => {
  for (const jakso of IHMISEN_MATKA_KERTOMUS.slice(0, 2)) {
    const lauseet = jaaLauseiksi(jakso.teksti);
    const osat = jaaOsiin(jakso.teksti, { virkkeita: 1, merkkeja: 1 });
    assert.deepEqual(osat.map((o) => o.teksti), lauseet.map((l) => l.teksti));
    assert.deepEqual(osat.map((o) => o.alku), lauseet.map((l) => l.alku));
    assert.deepEqual(osat.map((o) => o.lause), lauseet.map((_, i) => i));
  }
});

test('osien hetket seuraavat luentaa — aikaleimat voittavat arvion', () => {
  const teksti = 'Yksi. Kaksi. Kolme. Neljä. Viisi. Kuusi.';
  const osat = jaaOsiin(teksti, { virkkeita: 2, merkkeja: 240 });
  assert.equal(osat.length, 3);
  assert.deepEqual(osat.map((o) => o.lause), [0, 2, 4]);

  // 1. AIKALEIMAT: osan hetki on sen ensimmäisen virkkeen leima.
  const leimat = { lauseet: [0, 900, 1800, 2700, 3600, 4500] };
  assert.deepEqual(osienHetket(osat, 6000, leimat), [0, 1800, 3600]);

  // 2. VÄÄRÄ MÄÄRÄ LEIMOJA ei kelpaa (teksti on muuttunut äänitteen
  //    jälkeen, ks. ihmisen-matka-kertomus.js aanitePaivitettava).
  const vaarat = { lauseet: [0, 900, 1800, 2700, 3600, 4500, 5400] };
  const arvio = osienHetket(osat, 6000, vaarat);
  assert.equal(arvio[0], 0);
  assert.ok(arvio[1] > 0 && arvio[2] > arvio[1], JSON.stringify(arvio));

  // 3. ILMAN LEIMOJA hetki on merkkiosuus — sama mitta kuin lauseilla.
  const lauseHetket = lauseidenHetket(jaaLauseiksi(teksti), 6000);
  const osaHetket = osienHetket(osat, 6000);
  assert.ok(Math.abs(osaHetket[1] - lauseHetket[2]) < 1e-9, `${osaHetket[1]} vs ${lauseHetket[2]}`);
  assert.ok(Math.abs(osaHetket[2] - lauseHetket[4]) < 1e-9);
  // Hetket ovat kasvavia ja mahtuvat jakson kestoon.
  for (let i = 1; i < osaHetket.length; i += 1) assert.ok(osaHetket[i] > osaHetket[i - 1]);
  assert.ok(osaHetket[osaHetket.length - 1] < 6000);
});

test('tyhjä teksti ei tuota osia eikä hetkiä', () => {
  assert.deepEqual(jaaOsiin(''), []);
  assert.deepEqual(jaaOsiin(null), []);
  assert.deepEqual(osienHetket([], 5000), []);
  assert.deepEqual(osienHetket(null, 5000), []);
});
