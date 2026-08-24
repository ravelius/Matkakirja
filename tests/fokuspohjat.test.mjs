/*
 * FOKUSPOHJIEN RAJAUKSET — osuvatko esirenderöidyt kuvat lautaan, ja
 * limittyvätkö naapurimaiden kuvat toisiinsa?
 *
 * Kuvat asuvat ämpärissä eivätkä repossa (ks. js/packs/fokus-grc.js),
 * joten testi ei voi katsoa yhtään pikseliä. Se voi kuitenkin katsoa
 * LUKUJA, ja juuri luvut ratkaisevat sen, mitä pelaaja näkee:
 *
 *   1. Kuvan on peitettävä maan oma laudalle piirretty muoto. Jos ei
 *      peitä, maan reuna jää lehden ulkopuolelle ja pelaaja näkee
 *      puolet maasta uudella pohjalla ja puolet laudan vanhalla
 *      grafiikalla.
 *   2. Kameran ikkunan (rajaus) on oltava kuvan sisällä vuotoineen —
 *      muuten ruudun reunaan jää sauma heti kun kamera pysähtyy.
 *   3. NAAPURIMAIDEN KUVIEN ON LIMITYTTÄVÄ. Tämä on koko "jotta rajat
 *      häviää" -työn mitta: kun pelaaja siirtyy Ateenasta Sofiaan,
 *      Kreikan lehti vaihtuu Bulgarian lehteen, ja jos laatikoiden
 *      väliin jäisi rako, laudan vanha pergamentti välähtäisi
 *      vaihdoksen kohdalla.
 *
 * Naapuruus päätellään laudan omista maamuodoista eikä käsin
 * kirjoitetusta listasta: kaksi maata on naapureita, jos niiden
 * piirretyt muodot ovat lähempänä kuin NAAPURIN_RAJA lautayksikköä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { FOKUS_POHJAT, FOKUS_LAUTAPROJEKTIOT, FOKUS_MAANIMET } from '../js/packs/fokus-grc.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';

/** Kuinka lähellä laudan maamuotojen on oltava, jotta maat ovat naapureita. */
const NAAPURIN_RAJA = 30;

/*
 * ISLANTI ON LAUDALLA VÄÄRÄSSÄ PAIKASSA — eikä se ole fokuspohjan vika.
 *
 * Maailmankartan `countryShapes.ISL` on piirretty leveysasteille
 * 68,5–70,7 ja pituusasteille −9,9…−5,5, siis Jan Mayenin kohdalle;
 * todellinen Islanti on 63,4–66,6 / −24,5…−13,5. Laudan oma
 * Reykjavíkin LAATTA sen sijaan on oikeassa paikassa (−21,8 / 64,2),
 * ja niin on fokuspohjakin — mitattu ero maamuodon ja Natural Earthin
 * välillä on 465 lautayksikköä (tee-fokuskartta.mjs `maamuodonEro`).
 *
 * Pohja siis PARANTAA Islannin fokusajon: ilman sitä kamera lentäisi
 * maamuodon mukaan sinne, missä maata ei ole. Tämä poikkeus on
 * kirjattu, jotta laudan piirrosvirhe ei jää muistin varaan — kun
 * maamuoto joskus korjataan, poikkeus poistetaan ja testi alkaa vaatia
 * peittoa myös Islannilta.
 */
const MAAMUOTO_POIKKEUKSET = new Set(['ISL']);

const laatikot = {};
for (const [iso, muoto] of Object.entries(MAAILMANKARTTA.map.countryShapes)) {
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const rengas of muoto.renkaat ?? []) {
    for (const [x, y] of rengas) {
      if (x < x0) x0 = x; if (x > x1) x1 = x;
      if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  if (Number.isFinite(x0)) laatikot[iso] = { x0, y0, x1, y1 };
}

const etaisyys = (a, b) => Math.hypot(
  Math.max(0, a.x0 - b.x1, b.x0 - a.x1),
  Math.max(0, a.y0 - b.y1, b.y0 - a.y1),
);

const kulmat = (b) => ({
  x0: b.x, y0: b.y, x1: b.x + b.w, y1: b.y + b.h,
});
const limittyy = (a, b) => a.x1 > b.x0 && b.x1 > a.x0 && a.y1 > b.y0 && b.y1 > a.y0;
const yhteinenAla = (a, b) => Math.max(0, Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0))
  * Math.max(0, Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0));

test('jokainen fokuspohja tuntee lautansa projektion', () => {
  for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
    assert.ok(FOKUS_LAUTAPROJEKTIOT[pohja.lauta],
      `${iso}: tuntematon lauta ${pohja.lauta}`);
    assert.ok(pohja.tiedosto?.endsWith('.webp') || pohja.tiedosto?.endsWith('.png'),
      `${iso}: tiedostonimi puuttuu tai on outoa muotoa`);
    for (const laatikko of [pohja.bbox, pohja.rajaus]) {
      for (const kentta of ['x', 'y', 'w', 'h']) {
        assert.ok(Number.isFinite(laatikko?.[kentta]), `${iso}: ${kentta} ei ole luku`);
      }
      assert.ok(laatikko.w > 0 && laatikko.h > 0, `${iso}: laatikon on oltava positiivinen`);
    }
  }
});

test('kameran ikkuna on kuvan sisällä ja vuotoa jää joka reunalle', () => {
  for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
    const kuva = kulmat(pohja.bbox);
    const ikkuna = kulmat(pohja.rajaus);
    assert.ok(kuva.x0 < ikkuna.x0 && kuva.x1 > ikkuna.x1
      && kuva.y0 < ikkuna.y0 && kuva.y1 > ikkuna.y1,
    `${iso}: rajaus ei ole kuvan sisällä — vuotoa ei jää, ja ruudun `
      + 'reunaan tulee sauma');
  }
});

test('kuva peittää maan oman laudalle piirretyn muodon', () => {
  for (const [iso, pohja] of Object.entries(FOKUS_POHJAT)) {
    if (pohja.lauta !== 'maailmankartta') continue;
    if (MAAMUOTO_POIKKEUKSET.has(iso)) continue;
    const maa = laatikot[iso];
    assert.ok(maa, `${iso}: laudalla ei ole maamuotoa`);
    const kuva = kulmat(pohja.bbox);
    assert.ok(kuva.x0 <= maa.x0 && kuva.x1 >= maa.x1
      && kuva.y0 <= maa.y0 && kuva.y1 >= maa.y1,
    `${iso}: kuva ei peitä koko maata — osa maasta jäisi laudan vanhan `
      + 'grafiikan varaan');
  }
});

test('naapurimaiden kuvat limittyvät — vaihdoksen kohdalle ei jää rakoa', () => {
  const isot = Object.keys(FOKUS_POHJAT).filter((i) => FOKUS_POHJAT[i].lauta === 'maailmankartta');
  let pareja = 0;
  for (let i = 0; i < isot.length; i++) {
    for (let j = i + 1; j < isot.length; j++) {
      const a = isot[i]; const b = isot[j];
      if (!laatikot[a] || !laatikot[b]) continue;
      if (etaisyys(laatikot[a], laatikot[b]) > NAAPURIN_RAJA) continue;
      pareja += 1;
      const ka = kulmat(FOKUS_POHJAT[a].bbox);
      const kb = kulmat(FOKUS_POHJAT[b].bbox);
      assert.ok(limittyy(ka, kb), `${a} ja ${b} ovat naapureita, mutta kuvat eivät limity`);
      const pienin = Math.min(
        (ka.x1 - ka.x0) * (ka.y1 - ka.y0),
        (kb.x1 - kb.x0) * (kb.y1 - kb.y0),
      );
      assert.ok(yhteinenAla(ka, kb) / pienin > 0.15,
        `${a} ja ${b}: kuvat limittyvät vain `
        + `${(100 * yhteinenAla(ka, kb) / pienin).toFixed(1)} % pienemmän kuvan alasta`);
    }
  }
  assert.ok(pareja > 0, 'yhtään naapuriparia ei löytynyt — testi ei mittaa mitään');
});

test('Kreikan ja Bulgarian pohjat limittyvät yhteisen rajan yli', () => {
  const grc = FOKUS_POHJAT.GRC;
  const bgr = FOKUS_POHJAT.BGR;
  assert.ok(grc && bgr, 'Kreikan ja Bulgarian pohjat ovat molemmat taulussa');
  const a = kulmat(grc.bbox);
  const b = kulmat(bgr.bbox);
  assert.ok(limittyy(a, b), 'Kreikan ja Bulgarian kuvat eivät limity');
  /*
   * Yhteinen raja kulkee laudalla noin y = 1735 (lat 41,3). Molempien
   * kuvien on ulotuttava sen yli, jotta pelaaja näkee rajaseudun
   * kummallakin lehdellä eikä vaihdos paljasta lautaa.
   */
  const raja = 1735;
  assert.ok(a.y0 < raja && a.y1 > raja, 'Kreikan kuva ei ulotu yhteisen rajan yli');
  assert.ok(b.y0 < raja && b.y1 > raja, 'Bulgarian kuva ei ulotu yhteisen rajan yli');
});

test('paikallisnimet on vain maille, joilla on pohja', () => {
  for (const iso of Object.keys(FOKUS_MAANIMET)) {
    assert.ok(FOKUS_POHJAT[iso] || MAAILMANKARTTA.map.countryShapes[iso],
      `${iso}: paikallisnimi maalle, jota laudalla ei ole`);
  }
});
