/*
 * MAAT PALLOLLE (aalto 1C, docs/moduulit/karttapallo.md luku 10).
 *
 * Vertailu- ja maaselaintila piirtävät maat pallolaudalla Globe.gl:n
 * monikulmiokerrokseen, ja kerros syntyy laudan yksiköistä asteiksi
 * käännetystä aineistosta (js/vertailu.js maapolygonitPallolle).
 * Käännös on puhdas funktio juuri siksi, että se voidaan ajaa tässä:
 * selainta ei tarvita, ja sauman kaltainen virhe näkyy lukuna eikä
 * vasta pallon pinnalla vyönä maailman ympäri.
 *
 * Piirron kytkennät luetaan lähdetekstinä (js/vertailu.js), koska
 * kutsut menevät pallolaudan linssiapuriin, jota ei ole Nodessa.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { maapolygonitPallolle } from '../js/vertailu.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { PALLO_LAUTA } from '../js/pallo.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';

const lahde = readFileSync(new URL('../js/vertailu.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');

/** Sama käännös kuin laudalla (js/pallolauta/lauta.js pallonAsteet). */
const asteet = ({ x, y }) => laudaltaAsteiksi(PALLO_LAUTA, x, y);

const map = MAAILMANKARTTA.map;
const maat = maapolygonitPallolle(map, asteet);

/** Geometrian kaikki renkaat yhtenä listana. */
function renkaat(geometry) {
  if (geometry.type === 'Polygon') return geometry.coordinates;
  return geometry.coordinates.flat();
}

test('jokainen laudan maa saa geometrian', () => {
  const laudalla = Object.entries(map.countryShapes)
    .filter(([, maa]) => maa?.renkaat?.length)
    .map(([iso]) => iso);
  assert.ok(laudalla.length > 100, 'laudalta puuttuvat maat — testi mittaisi tyhjää');
  for (const iso of laudalla) {
    const maa = maat.get(iso);
    assert.ok(maa, `${iso}: geometria puuttuu`);
    assert.ok(['Polygon', 'MultiPolygon'].includes(maa.geometry.type), `${iso}: väärä tyyppi`);
    assert.equal(renkaat(maa.geometry).length, map.countryShapes[iso].renkaat.length,
      `${iso}: renkaita katosi käännöksessä`);
  }
});

test('koordinaatit ovat asteita ja renkaat suljettuja', () => {
  for (const [iso, maa] of maat) {
    for (const rengas of renkaat(maa.geometry)) {
      assert.ok(rengas.length >= 4, `${iso}: rengas on liian lyhyt`);
      const eka = rengas[0];
      const vika = rengas[rengas.length - 1];
      assert.deepEqual(eka, vika, `${iso}: rengas ei ole suljettu`);
      for (const [lon, lat] of rengas) {
        assert.ok(Number.isFinite(lat) && Math.abs(lat) <= 90, `${iso}: leveysaste ${lat}`);
        /*
         * Sauman ylittävä rengas saa jäädä hieman ±180 asteen yli
         * (se on pallolla sama piste); maailman toiselle puolelle se
         * ei saa karata.
         */
        assert.ok(Number.isFinite(lon) && Math.abs(lon) <= 200, `${iso}: pituusaste ${lon}`);
      }
    }
  }
});

test('yksikään renkaan sivu ei kierrä maailman ympäri', () => {
  /*
   * Kiertävällä laudalla pituusaste kietoutuu välille [−180, 180].
   * Jos kierto jäisi purkamatta, Venäjän, Fidžin tai Aleuttien rengas
   * saisi keskelleen ~360 asteen sivun ja monikulmio piirtyisi vyönä
   * pallon ympäri. Sivun pituus on siis se, mitä vartioidaan — ei
   * yksittäinen maa.
   */
  for (const [iso, maa] of maat) {
    for (const rengas of renkaat(maa.geometry)) {
      for (let i = 1; i < rengas.length; i++) {
        const ero = Math.abs(rengas[i][0] - rengas[i - 1][0]);
        assert.ok(ero <= 180, `${iso}: sivu ${ero.toFixed(1)}° kiertää maailman ympäri`);
      }
    }
  }
  for (const iso of ['RUS', 'FJI', 'USA']) {
    assert.ok(maat.get(iso), `saumamaa ${iso} puuttuu laudalta`);
  }
});

test('sauman ylittävä rengas pysyy yhtenä kappaleena', () => {
  /*
   * Laudan aineisto on jo katkaistu päivämäärärajalla, joten sauman
   * yli kulkeva rengas rakennetaan tähän käsin: neliö, joka alkaa
   * 178° itäistä ja päättyy 178° läntistä pituutta. Ilman kierron
   * purkua siitä tulisi 356 asteen levyinen vyö.
   */
  const kulmat = [[178, 10], [-178, 10], [-178, -10], [178, -10]];
  const testimap = {
    countryShapes: {
      XXX: {
        nimi: 'Saumamaa',
        keskus: [0, 0],
        leveys: 100,
        renkaat: [kulmat.map(([lon, lat], i) => [i, lat])],
      },
    },
  };
  // Käännös antaa pisteet suoraan kulmalistasta (indeksi → aste).
  const sauma = maapolygonitPallolle(testimap, ({ x }) => {
    const [lon, lat] = kulmat[x] ?? kulmat[0];
    return { lon, lat };
  });
  const rengas = renkaat(sauma.get('XXX').geometry)[0];
  let levein = 0;
  for (let i = 1; i < rengas.length; i++) {
    levein = Math.max(levein, Math.abs(rengas[i][0] - rengas[i - 1][0]));
  }
  assert.ok(levein <= 180, `sauma repesi: levein sivu ${levein}°`);
  const lonit = rengas.map(([lon]) => lon);
  assert.ok(Math.max(...lonit) - Math.min(...lonit) < 10,
    'sauman yli kulkeva neliö levisi vyöksi');
});

test('maan keskus osuu maahan', () => {
  const suomi = maat.get('FIN');
  assert.ok(suomi?.keskus, 'Suomen keskus puuttuu');
  assert.ok(Math.abs(suomi.keskus.lat - 64) <= 3, `Suomen leveysaste ${suomi.keskus.lat}`);
  assert.ok(Math.abs(suomi.keskus.lng - 26) <= 3, `Suomen pituusaste ${suomi.keskus.lng}`);
  // Toinen pallonpuolisko mukaan: etumerkkivirhe ei jäisi Suomesta kiinni.
  const brasilia = maat.get('BRA');
  assert.ok(Math.abs(brasilia.keskus.lat + 10) <= 5, `Brasilian leveysaste ${brasilia.keskus.lat}`);
  assert.ok(Math.abs(brasilia.keskus.lng + 53) <= 5, `Brasilian pituusaste ${brasilia.keskus.lng}`);
  // Nimen piirtoehto on laudan yksiköissä molemmilla laudoilla.
  assert.equal(suomi.leveys, map.countryShapes.FIN.leveys);
});

test('vertailu ja maaselain piirtävät maat pallolaudan linssiapurilla', () => {
  assert.match(lahde, /ui\.pallolauta\?\.linssit/, 'linssiapuria ei haeta laudalta');
  assert.match(lahde, /linssit\.polygonit\(osa, polygonit\)/, 'monikulmioita ei aseteta');
  assert.match(lahde, /linssit\.merkit\(nimienOsa, nimet\)/, 'maiden nimiä ei aseteta merkkeinä');
  assert.match(lahde, /linssit\.pura\(osa\)/, 'kerrosta ei pureta');
  assert.match(lahde, /osa: 'vertailu'/, 'vertailun osa puuttuu');
  assert.match(lahde, /nimienOsa: 'vertailu-nimet'/, 'vertailun nimiosa puuttuu');
  assert.match(lahde, /osa: 'maatiedot'/, 'maaselaimen osa puuttuu');
  assert.match(lahde, /puraMaatPallolta\(ui, \['vertailu', 'vertailu-nimet'\]\)/,
    'vertailutila ei pura maakerrostaan pallolta');
  assert.match(lahde, /puraMaatPallolta\(ui, \['maatiedot'\]\)/,
    'maaselain ei pura maakerrostaan pallolta');
  // Nimiehto on sama luku kuin tasokartalla.
  assert.match(lahde, /maa\.leveys >= 60/, 'nimen leveysehto muuttui pallolla');
  assert.match(css, /\.pallolauta-maanimi \{/, 'maan nimeltä puuttuu tyyli');
});

test('pallon maasävyt ovat samat kuin kartan', () => {
  /*
   * Pallolla ei ole css:ää maan täytölle, joten sävyt ovat
   * js/vertailu.js:ssä merkkijonoina. Sama tila ei saa näyttää
   * kahdelta: jokaisen sävyn on löydyttävä myös vastaavasta
   * css-säännöstä.
   */
  const saannot = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const parit = [
    ['.vertailu-maa', 'rgba(120, 96, 62, 0.06)', 'rgba(70, 51, 31, 0.55)'],
    ['.vertailu-maa.valittu', 'rgba(176, 58, 43, 0.3)', '#b03a2b'],
    ['.maatiedot-maa', 'rgba(140, 110, 70, 0.05)', 'rgba(70, 51, 31, 0.55)'],
    ['.maatiedot-maa.valittu', 'rgba(176, 34, 34, 0.16)', 'rgba(140, 30, 30, 0.9)'],
  ];
  for (const [luokka, tayte, reuna] of parit) {
    const saanto = saannot.match(new RegExp(`\\${luokka} \\{[^}]*\\}`))?.[0] ?? '';
    assert.ok(saanto.includes(`fill: ${tayte}`), `${luokka}: täyttö eriytyi (${tayte})`);
    assert.ok(saanto.includes(`stroke: ${reuna}`), `${luokka}: reuna eriytyi (${reuna})`);
    assert.ok(lahde.includes(`'${tayte}'`), `${luokka}: täyttö puuttuu pallon sävyistä`);
    assert.ok(lahde.includes(`'${reuna}'`), `${luokka}: reuna puuttuu pallon sävyistä`);
  }
});
