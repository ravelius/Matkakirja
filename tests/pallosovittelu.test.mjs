/*
 * NOSTOJEN LAPUT VÄISTÄVÄT KAUPUNGIN NIMEÄ (js/pallolauta/sovittelu.js).
 *
 * Omistaja 7.9.2026 (kuvakaappaus Bukarestista, sanatarkasti):
 * *"kaupungin nimi menee nostojen päälle"*. Fablen linjaus (Raamattu,
 * KAUPUNGIN NIMI NOSTOJEN PAALLA): kaupungin nimi on ensisijainen,
 * nostojen laput väistävät — vaihtoehtoinen ankkuri, pieni siirto,
 * viimeisenä lappu piiloon.
 *
 * Selaimessa sama sääntö mitataan savukkeella
 * (tools/savukkeet/savuke-pallo-nostolaput.mjs); tässä mitataan
 * PÄÄTÖSSARJA sellaisenaan, koska sen jokainen porras on
 * todennettavissa ilman DOMia.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  SOVITTELUN_KYLJET, SOVITTELUN_SIIRTO_PX, laatikotLimittyvat, sovitteleLaput,
} from '../js/pallolauta/sovittelu.js';
import { NOSTOSYM_NIMIO_KYLJET } from '../js/fokusnosto-symbolit.js';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

/**
 * Koelappu: ikoni 10 x 10 px pisteessä (x, y) ja nimiö 40 px sen
 * kyljessä — sama muoto kuin nostonLaatikko antaa (ikonin ja nimiön
 * yhdiste), mutta luvut ovat käsin luettavia.
 */
function koelappu(avain, x, y, kylki = 'oikea') {
  const r = 5;
  const lev = 40;
  return {
    avain,
    kylki,
    laatikko: (k, dx, dy, nimio) => {
      const kx = x + dx;
      const ky = y + dy;
      const ikoni = {
        x0: kx - r, y0: ky - r, x1: kx + r, y1: ky + r,
      };
      if (!nimio) return ikoni;
      if (k === 'vasen') return { ...ikoni, x0: kx - r - lev };
      if (k === 'yla') return { x0: kx - lev / 2, x1: kx + lev / 2, y0: ky - r - 12, y1: ky + r };
      if (k === 'ala') return { x0: kx - lev / 2, x1: kx + lev / 2, y0: ky - r, y1: ky + r + 12 };
      return { ...ikoni, x1: kx + r + lev };
    },
  };
}

test('vapaa lappu pitää oman kylkensä eikä liiku', () => {
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [] });
  assert.deepEqual(t.asennot.get('a'), {
    kylki: 'oikea', dx: 0, dy: 0, nimio: true, syy: 'oma',
  });
  assert.equal(t.siirretty, 0);
  assert.equal(t.piilotettu, 0);
});

test('1. porras: este oikealla → lappu vaihtaa kyljen, ei siirry eikä piiloudu', () => {
  // Este peittää nimiökaistan oikealla, ikonin ruutu jää vapaaksi.
  const este = { x0: 110, y0: 92, x1: 150, y1: 108 };
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet: [este] });
  const a = t.asennot.get('a');
  assert.equal(a.syy, 'kylki');
  assert.notEqual(a.kylki, 'oikea');
  assert.equal(a.dx, 0);
  assert.equal(a.dy, 0);
  assert.equal(a.nimio, true);
  assert.equal(t.kylkiVaihtui, 1);
  assert.ok(!laatikotLimittyvat(koelappu('a', 100, 100).laatikko(a.kylki, 0, 0, true), este));
});

test('2. porras: kaikki kyljet tukossa → pieni siirto, lappu jää näkyviin', () => {
  /*
   * Neljä kapeaa nimikaistaa, yksi kutakin kylkeä vasten. Kaistat ovat
   * niin matalia (4 px), että 6 px:n KOHTISUORA nudge irrottaa lapun
   * — juuri se liike, jota vaakanimen ja vaakalapun törmäys vaatii.
   */
  const esteet = [
    { x0: 106, y0: 99, x1: 148, y1: 103 },
    { x0: 52, y0: 99, x1: 94, y1: 103 },
    { x0: 98, y0: 82, x1: 102, y1: 88 },
    { x0: 98, y0: 112, x1: 102, y1: 118 },
  ];
  const t = sovitteleLaput({ laput: [koelappu('a', 100, 100)], esteet });
  const a = t.asennot.get('a');
  assert.equal(a.syy, 'siirto');
  assert.equal(a.nimio, true);
  assert.equal(Math.abs(a.dx) + Math.abs(a.dy), SOVITTELUN_SIIRTO_PX);
  for (const e of esteet) {
    assert.ok(!laatikotLimittyvat(koelappu('a', 100, 100).laatikko(a.kylki, a.dx, a.dy, true), e));
  }
});

test('3. porras: kun mikään asento ei kelpaa, lappu piiloon ja IKONI JÄÄ', () => {
  // Yksi laaja este peittää koko sen alueen, johon nimiö mahtuisi.
  const t = sovitteleLaput({
    laput: [koelappu('a', 100, 100)],
    esteet: [{ x0: 20, y0: 20, x1: 180, y1: 180 }],
  });
  const a = t.asennot.get('a');
  assert.equal(a.nimio, false, 'lappu piiloon');
  assert.equal(a.syy, 'piilo');
  assert.equal(t.piilotettu, 1);
  // Ikonia ei voi piilottaa — nosto katoaisi kartalta; se kirjataan.
  assert.equal(t.jaljella, 1);
});

test('ahtain ensin: lähinnä nimeä oleva lappu saa valita ensimmäisenä', () => {
  const este = { x0: 110, y0: 92, x1: 150, y1: 108 };
  const kauka = koelappu('kauka', 600, 600);
  const lahi = koelappu('lahi', 100, 100);
  const t = sovitteleLaput({ laput: [kauka, lahi], esteet: [este] });
  assert.equal(t.asennot.get('kauka').syy, 'oma');
  assert.equal(t.asennot.get('lahi').syy, 'kylki');
});

test('väistänyt lappu on este seuraavalle, paikallaan pysynyt ei', () => {
  // Kaksi lappua samassa pisteessä: ensimmäinen väistää vasemmalle,
  // toisen on löydettävä eri asento kuin ensimmäinen.
  const este = { x0: 110, y0: 92, x1: 150, y1: 108 };
  const t = sovitteleLaput({
    laput: [koelappu('a', 100, 100), koelappu('b', 100, 100)],
    esteet: [este],
  });
  const a = t.asennot.get('a');
  const b = t.asennot.get('b');
  assert.notDeepEqual([a.kylki, a.dx, a.dy], [b.kylki, b.dx, b.dy]);
});

test('kyljet ovat kirjaston omat neljä, eikä sovittelu keksi omiaan', () => {
  assert.deepEqual([...SOVITTELUN_KYLJET], [...NOSTOSYM_NIMIO_KYLJET]);
});

test('lauta sovittelee nimien JÄLKEEN, ja nimi väistää vain liikkumatonta mustetta', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  const nimiKohta = lauta.indexOf('const nimiTulos = nimet.lado(');
  const sovitteluKohta = lauta.indexOf('nostot.sovittele(');
  assert.ok(nimiKohta > 0 && sovitteluKohta > nimiKohta,
    'sovittelu on ladottava nimien jälkeen — muuten nimi ei ole kiinteä');
  assert.match(lauta, /nostot\.sovittele\(\{ nimet: nimet\.laatikot\(\) \}\)/);
  const nostot = lue('../js/pallolauta/nostot.js');
  // Elävän noston LAPPU ei ole nimen varaus, ikoni on.
  assert.match(nostot, /nostonLaatikko\(r\.p, r, \{\s*dx: datum\.dx, dy: datum\.dy, nimio: false,\s*\}\)/);
  assert.match(nostot, /import \{ sovitteleLaput \} from '\.\/sovittelu\.js';/);
  // Nimikerros antaa laatikkonsa luettavaksi eikä lue sovittelua.
  const nimet = lue('../js/pallolauta/nimet.js');
  assert.match(nimet, /laatikot: \(\) => laatikot,/);
  assert.ok(!/^import .*sovittelu\.js/m.test(nimet), 'nimikerros ei saa tuoda sovittelua');
  // Uusi moduuli on SHELLissä (offline).
  assert.match(lue('../sw.js'), /'\.\/js\/pallolauta\/sovittelu\.js'/);
});

test('siirto animoidaan ja reduced motion poistaa siirtymän', () => {
  const css = lue('../css/styles.css');
  assert.match(css, /\.pallolauta-nosto-siirto \{ transition: transform 200ms ease-in-out; \}/);
  assert.match(css, /\.pallolauta-nimi-siirto,\n\s*\.pallolauta-nosto-siirto \{ transition: none; \}/);
});
