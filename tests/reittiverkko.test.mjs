/*
 * HIMMEÄ REITTIVERKKO LIFTATESSA (omistaja 20.9.2026 klo 13.50: *"entä
 * jos piirretaan myos muutkin reitit mutta himmeammalla"*).
 *
 * Kolme osaa, yksi sääntö: js/ui.js matkareittienValinta antaa lipun
 * `verkko` (testattu tests/pallolauta.test.mjs reittien näkyvyydessä),
 * js/pallolauta/reitit.js verkonViivat antaa KAIKKI laudan kaaret
 * asteina kerran per lauta, ja js/pallovektorit.js piirtää ne
 * staattisena lajina `verkko` (asetaVerkko/naytaVerkko).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';
import { laudaltaAsteiksi, projisoiLaudalle } from '../js/fokusmitat.js';
import { luoReitit } from '../js/pallolauta/reitit.js';
import { pallonKorjattuPoly } from '../js/pallo.js';
import {
  RANTA_PEITTO, VEKTORIT_LEVEYDET, VEKTORIT_VERKKO_LEVEYS_CSS, VERKKO_PEITTO, VERKON_HARVENNUS_AST,
  harvennaViivat,
} from '../js/pallovektorit.js';

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/** Globe.gl:n kaksoisolento: jokainen asetin palauttaa itsensä. */
const tekoPallo = () => {
  const pallo = new Proxy({}, { get: (_, k) => (k === 'then' ? undefined : () => pallo) });
  return pallo;
};

test('verkonViivat: kaikki laudan kaaret [lon, lat] -viivoina, kerran per lauta', () => {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'varsova' }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  const asteet = (p) => laudaltaAsteiksi('maailmankartta', p.x, p.y);
  const reitit = luoReitit({ pallo: tekoPallo(), ui: { game: peli }, siirtyma: 0, asteet });
  const viivat = reitit.verkonViivat();
  // Yksi viiva per kaari — ei yhtään pois, ei yhtään kahdesti.
  assert.equal(viivat.length, peli.board.edgeById.size);
  assert.ok(viivat.length >= 400, `laudalla pitäisi olla satoja kaaria: ${viivat.length}`);
  for (const v of viivat) {
    assert.ok(v.length >= 2, 'viivassa alle kaksi pistettä');
    for (const [lon, lat] of v) {
      assert.ok(lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90,
        `piste ei ole [lon, lat]: ${lon}, ${lat}`);
    }
  }
  // Järjestys on [lon, lat] (vektorikerroksen muoto), ei [lat, lng]:
  // Lontoon kaaren ensimmäinen piste on Lontoon kohdalla (lat ≈ 51,5).
  const lontoo = peli.board.cityById.get('lontoo');
  const lontoonKaari = [...peli.board.edgeById.values()].find((e) => e.a === 'lontoo' || e.b === 'lontoo');
  assert.ok(lontoonKaari, 'Lontoolla ei kaaria');
  const i = [...peli.board.edgeById.values()].indexOf(lontoonKaari);
  const piste = lontoonKaari.a === 'lontoo' ? viivat[i][0] : viivat[i].at(-1);
  const odotettu = laudaltaAsteiksi('maailmankartta', lontoo.x, lontoo.y);
  assert.ok(Math.abs(piste[1] - odotettu.lat) < 0.5 && Math.abs(piste[0] - odotettu.lon) < 0.5,
    `Lontoon pää ${JSON.stringify(piste)} ≠ ${JSON.stringify(odotettu)}`);
  // Sama lauta: sama lista (ei laskentaa, ei uutta oliota).
  assert.equal(reitit.verkonViivat(), viivat);
  // Kiinteä harvennus pudottaa pisteet murto-osaan (24 538 → n. 4 600), kaaret pysyvät.
  const harvat = harvennaViivat(viivat, VERKON_HARVENNUS_AST);
  const pisteita = (l) => l.reduce((s, v) => s + v.length, 0);
  assert.equal(harvat.length, viivat.length);
  assert.ok(pisteita(harvat) < pisteita(viivat) / 3, `harvennus ei purrut: ${pisteita(harvat)} / ${pisteita(viivat)}`);
  // Viivat ovat samasta muistista kuin kirkkaat kaaret: päät korjatuissa pisteissä.
  const korjattu = pallonKorjattuPoly(lontoonKaari.poly, null, null);
  assert.equal(viivat[i].length, korjattu.length);
  assert.ok(projisoiLaudalle('maailmankartta', piste[0], piste[1]), 'piste ei projisoidu laudalle');
});

test('vektorikerros: verkko on neljäs laji samassa materiaalitaulussa, himmeämpi kuin ranta', () => {
  assert.equal(VEKTORIT_LEVEYDET.verkko, VEKTORIT_VERKKO_LEVEYS_CSS);
  assert.ok(VERKKO_PEITTO < RANTA_PEITTO, 'verkon pitää olla rantaviivaa himmeämpi');
  assert.ok(VEKTORIT_VERKKO_LEVEYS_CSS[1] <= 1.2, 'verkko ei saa olla kantaman kaarta leveämpi');
  const lahde = lue('../js/pallovektorit.js');
  assert.match(lahde, /asetaVerkko\(avain, viivat\) \{/);
  assert.match(lahde, /naytaVerkko\(nakyy\) \{/);
  // Kerran per lauta: sama avain ja samat viivat eivät rakenna uudestaan.
  assert.match(lahde, /if \(uusiAvain === verkko\.avain && uudet === verkko\.viivat\) return false;/);
  // Näkyvyys on lippu, ei häive eikä rakennus.
  assert.match(lahde, /if \(verkko\.olio\) verkko\.olio\.visible = uusi;/);
  // Kiinteä harvennus ja sama palajako kuin muilla vektoreilla.
  assert.match(lahde, /const viivat = harvennaViivat\(verkko\.viivat, VERKON_HARVENNUS_AST\);\n    const \{ paikat, janoja \} = vektorijanat\(viivat, sade\(\)\);\n    verkko\.janoja = janoja;/);
  assert.ok(VERKON_HARVENNUS_AST > 0 && VERKON_HARVENNUS_AST <= 0.02, 'harvennus 0 < x ≤ 0,02 astetta');
  // Purku siivoaa verkon kuten korostuksen.
  assert.match(lahde, /vapautaVerkko\(\);\n      verkko\.avain = null;/);
});

test('lauta ja sääntö: verkko syttyy valinnan lipusta ja saa geometrian laudan avaimella', () => {
  const lauta = lue('../js/pallolauta/lauta.js');
  assert.match(lauta, /if \(valinta\.verkko\) vektorit\.asetaVerkko\(pack\.id, reitit\.verkonViivat\(\)\);/);
  assert.match(lauta, /vektorit\.naytaVerkko\(Boolean\(valinta\.verkko\)\);/);
  const ui = lue('../js/ui.js');
  assert.match(ui, /const verkko = Boolean\(kaupunki && matkalla && naytetaan\);/);
  assert.match(ui, /reittiTunnukset, lennot, lentoLahto, avain, verkko,/);
});
