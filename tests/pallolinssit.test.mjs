import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';

/*
 * LINSSIT PALLOLLA — AALTO 1A (omistaja 5.9.2026, Raamattu KAIKKI
 * PALLOLLE, VANHA KARTTA SULJETAAN: *"Käännä kaikki pallolle, niin
 * voidaan sulkea vanha kartta kokonaan"*; sopimus
 * docs/moduulit/karttapallo.md luku 10.1).
 *
 * Vartioi kolme asiaa, jotka epäonnistuisivat hiljaa:
 *   1. moottorin rajapinta on TÄSMÄLLEEN sopimuksen taulukko — muut
 *      aallot (vesistöt, vertailu, aikajana, radio) kirjoitetaan
 *      rinnakkain sitä vasten,
 *   2. linssi ei koske Globe.gl-instanssiin vaan kulkee osarekisterien
 *      läpi, jolloin se ei voi pyyhkiä pelin reittejä eikä merkkejä,
 *   3. pallolaudalla `pallolle`-linssi ei avaa linssikarttaa.
 */

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const { luoLinssit, KALVON_SADE, POLYGONIN_KORKEUS } = await import('../js/pallolauta/linssit.js');
const { PALLOLAUDAN_KERROKSET } = await import('../js/pallolauta/lauta.js');

/** Ketjuttuva Globe.gl-tynkä: muistaa kerrosten viimeisimmät listat. */
function tynkaPallo() {
  const kerrokset = {};
  const pallo = new Proxy({}, {
    get: (_, nimi) => (...args) => {
      if (String(nimi).endsWith('Data') && args.length) kerrokset[nimi] = args[0];
      return pallo;
    },
  });
  return { pallo, kerrokset };
}

test('sopimus 10.1: moottorilla on tasan luvun taulukon rajapinta', () => {
  const { pallo } = tynkaPallo();
  const linssit = luoLinssit({
    pallo, ui: {}, lauta: {}, merkit: { aseta() {} }, reitit: { aseta() {} }, siirtyma: 0,
  });
  for (const nimi of ['kalvo', 'polut', 'polygonit', 'merkit', 'kalvoRuudulle', 'pura']) {
    assert.equal(typeof linssit[nimi], 'function', `moottorilta puuttuu ${nimi}`);
  }
  // Kalvo jää pinnan alle mutta reittien (0,002) ja helmien (0,0025) alle,
  // jotta pelin viivat lukeutuvat linssin päältä.
  assert.ok(KALVON_SADE > 1 && KALVON_SADE < 1.002);
  assert.equal(POLYGONIN_KORKEUS, 0.004);
});

test('linssi kulkee osarekisterien kautta: peli ja linssi eivät pyyhi toisiaan', () => {
  const { pallo, kerrokset } = tynkaPallo();
  const polut = new Map();
  const merkit = new Map();
  const linssit = luoLinssit({
    pallo,
    ui: {},
    lauta: {},
    merkit: { aseta: (osa, lista) => merkit.set(osa, lista) },
    reitit: { aseta: (osa, lista) => polut.set(osa, lista) },
    siirtyma: 0,
  });

  linssit.polut('vesistot', [{ avain: 'nile', pisteet: [[0, 30], [30, 31]], vari: '#345', paksuus: 0.03 }]);
  assert.equal(polut.get('vesistot').length, 1, 'polut menevät reittikerroksen osarekisteriin');

  linssit.polygonit('maatiedot', [{ avain: 'FI', geometry: { type: 'Polygon', coordinates: [] }, vari: '#abc' }]);
  assert.equal(kerrokset.polygonsData.length, 1, 'polygonit ovat oma Globe.gl-kerros');

  linssit.merkit('aikajana', [{ avain: 'lontoo', lat: 51, lng: 0, elementti: () => null }]);
  assert.equal(merkit.get('aikajana')[0].laji, 'linssi', 'merkit saavat lajin linssi');

  // Purku vie VAIN oman osansa.
  linssit.pura('vesistot');
  assert.equal(polut.get('vesistot').length, 0);
  assert.equal(kerrokset.polygonsData.length, 1, 'toisen osan polygonit jäävät');
  linssit.pura();
  assert.equal(kerrokset.polygonsData.length, 0);
  assert.equal(merkit.get('aikajana').length, 0);
});

test('polygonsData on sallittu kerros ja moottori asettaa sen sopimuksen mukaan', () => {
  assert.ok(PALLOLAUDAN_KERROKSET.includes('polygonsData'), 'kerros on lueteltu lauta.js:ssä');
  const src = lue('../js/pallolauta/linssit.js');
  assert.match(src, /\.polygonGeoJsonGeometry\('geometry'\)/);
  assert.match(src, /\.polygonCapColor\(\(d\) => d\.vari\)/);
  assert.match(src, /\.onPolygonClick\(\(d\) => d\?\.napautus\?\.\(d\)\)/);
  assert.match(src, /\.polygonsTransitionDuration\(siirtyma\)/, 'kaikki liike animoidaan');
  // Reittikerros lukee paksuuden ja katkon datumista, jotta linssin
  // viiva voi olla eri paksuinen kuin pelin reitti.
  const reitit = lue('../js/pallolauta/reitit.js');
  assert.match(reitit, /\.pathStroke\(\(d\) => d\.paksuus \?\? MATKAREITIN_PAKSUUS_AST\)/);
  assert.match(reitit, /aseta\('peli', polut\);/, 'pelin reitit ovat oma osansa');
});

test('topografia piirtyy pallolle tasavälisenä kalvona, ja kuva on repossa', () => {
  const src = lue('../js/linssit/topografia.js');
  assert.match(src, /pallolle\(lauta\) \{/, 'linssillä on pallolle-kahva');
  assert.match(src, /lauta\?\.linssit\?\.kalvo\('topografia'/, 'piirto kulkee linssimoottorin kautta');
  assert.match(src, /peittavyys: PEITTAVYYS/, 'sama 0,72 peittävyys kuin tasokartalla');
  assert.match(src, /const PALLOKUVA = 'assets\/linssit\/topografia-pallo\.webp';/);
  const kuva = new URL('../assets/linssit/topografia-pallo.webp', import.meta.url);
  assert.ok(existsSync(kuva), 'pallon tasavälinen reliefi puuttuu (tools/tee-pallotopografia.mjs)');
  assert.ok(statSync(kuva).size < 1_500_000, 'kuva on liian iso esiladattavaksi');
  // Sama kuva ja moduuli myös service workerin esilatauslistalla.
  const sw = lue('../sw.js');
  assert.ok(sw.includes("'./js/pallolauta/linssit.js'"));
  assert.ok(sw.includes("'./assets/linssit/topografia-pallo.webp'"));
});

test('ui: pallolaudalla pallolle-linssi piirtyy pallolle eikä avaa linssikarttaa', () => {
  const ui = lue('../js/ui.js');
  // Kelpoisuus yhdestä portista: pallolauta päällä, moottori pystyssä,
  // linssillä pallolle-funktio.
  assert.match(ui, /pallolinssiKelpaa\(tunnus, lista = this\.linssiTuki\?\.kaikki \?\? \[\]\) \{/);
  assert.match(ui, /typeof lista\.find\(\(l\) => l\.tunnus === tunnus\)\?\.pallolle === 'function'/);
  // Sytytys kutsuu pallolle-funktiota laudalla ja tilalla.
  assert.match(ui, /linssi\.pallolle\(this\.pallolauta, tila\)/);
  // Sammutus purkaa kahvan.
  assert.match(ui, /nyt\.kahva\?\.pura\?\.\(\);/);
  assert.match(ui, /this\.sammutaPallolinssi\(\);/);
  // Linssikartta avataan vain kääntämättömälle linssille.
  assert.match(ui, /if \(tunnus && this\.pallolautaPaalla\(\) && !pallolle\) this\.avaaLinssikartta\(\{ linssi: true \}\);/);
  // Nukkuva kartta ei unohda pallolinssin valintaa (paivitaLinssit).
  assert.match(ui, /if \(this\.pallolinssiKelpaa\(haluttu, nakyvat\)\) \{/);
});
