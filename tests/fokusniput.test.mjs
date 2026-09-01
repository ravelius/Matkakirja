/*
 * ESITYSSIIRTO — KAUPUNGIN YMPÄRILLE, SIIRTOVIIVA MUKANA.
 *
 * === MISTÄ TÄMÄ TESTI SYNTYI ===
 *
 * Omistajan kysymyskortti 31.8.2026, sanatarkasti: *"pystyisitkö osan
 * nostoista vain viemään hieman kaupungin viereen puhtaasti omaksi
 * nostokseen ilman siirtoviivoja … tähän pitäis keksiä joku
 * tyylikkäämpi ratkaisu."* Samalla purettiin kategoria per kaupunki
 * -yhdistely (ent. js/fokusryhmat.js ja tests/fokusryhmat.test.mjs,
 * jonka tilalle tämä tuli): kartalla ei ole enää pilkkulistanimiöitä.
 *
 * SIIRTOVIIVAT PALASIVAT VUOROKAUTTA MYÖHEMMIN. Omistajan tilaus
 * 1.9.2026 ilta, sanatarkasti: *"otetaan siirtoviivat takaisin
 * karttanostoille (esim. ateena)"*. Kahden sarakkeen ladonta jäi
 * ennalleen — palasi vain viiva, ja se on nyt käännetty toisin päin
 * kuin ennen: merkin reunasta ankkuripisteeseen (js/fokusniput.js
 * sääntö 6).
 *
 * === MITÄ TÄMÄ VARTIOI ===
 *
 * Kasauspassi (js/fokusniput.js niputaFokusmerkit) on POLTON EHDON
 * alainen: laattageneraattori ajaa sen selaimen ulkopuolella
 * (tools/fokuskartta/nostot.mjs), joten sen on oltava puhdas funktio
 * laudan datasta — sama lauta, sama tulos, joka laitteella ja Nodessa.
 * Testi ajaa passin samalla tyngällä kuin generaattori ja tarkistaa
 * viisi asiaa: ladotaanko molemmin puolin, pysyykö data koskemattomana,
 * onko tulos deterministinen, jääkö merkkien väliin tilaa — ja saako
 * jokainen SIIRRETTY merkki viivan ja vain se.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { nippuViivanJana, niputaFokusmerkit, nippuLaattaEsteet } from '../js/fokusniput.js';
import { keraaNostot } from '../tools/fokuskartta/nostot.mjs';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';

/** Lehden perustason vakiomitta (js/nostoladonta.js NOSTOLADONTA_S). */
const S = 0.6;

/** Kaupunki keskellä ja n merkkiä täsmälleen sen päällä. */
function tynka(n, kaupunki = { id: 'kaupunki', x: 1000, y: 1000 }) {
  const ryhmat = [];
  for (let i = 0; i < n; i += 1) {
    // Kaikki laatan kiekon sisällä mutta eri pisteissä, jotta jonon
    // järjestys on määrätty merkkien omista koordinaateista.
    ryhmat.push({
      id: `merkki-${i}`,
      x: kaupunki.x + (i % 2 ? 0.4 : -0.4),
      y: kaupunki.y + i * 0.1,
    });
  }
  return {
    fokusmoodi: true,
    katselu: false,
    kiertoKohdat: (x) => [x],
    fokuskohdeKaupungit: [kaupunki],
    fokuskohdeRyhmat: ryhmat,
  };
}

test('rypäs latoutuu kaupungin molemmin puolin, ei yhdelle kyljelle', () => {
  const ui = tynka(6);
  niputaFokusmerkit(ui, S);
  const oikealla = ui.fokuskohdeRyhmat.filter((r) => r.nippu.x > 1000);
  const vasemmalla = ui.fokuskohdeRyhmat.filter((r) => r.nippu.x < 1000);
  assert.equal(oikealla.length, 3);
  assert.equal(vasemmalla.length, 3);
  // Sarakkeita on täsmälleen kaksi: jokainen x on toinen niistä.
  assert.equal(new Set(ui.fokuskohdeRyhmat.map((r) => r.nippu.x)).size, 2);
});

test('pariton rypäs jakautuu tasan yhden merkin tarkkuudella', () => {
  for (const n of [1, 3, 5, 7, 9]) {
    const ui = tynka(n);
    niputaFokusmerkit(ui, S);
    const oikealla = ui.fokuskohdeRyhmat.filter((r) => r.nippu.x > 1000).length;
    assert.equal(oikealla, Math.ceil(n / 2), `n=${n}`);
  }
});

test('yksinäinen merkki istuu kaupungin oikealle puolelle samalle korkeudelle', () => {
  const ui = tynka(1);
  niputaFokusmerkit(ui, S);
  const [r] = ui.fokuskohdeRyhmat;
  assert.ok(r.nippu.x > 1000, 'oikealle');
  assert.equal(r.nippu.y, 1000, 'kaupungin korkeudelle');
  assert.equal(r.nippuPuoli, false, 'nimiö oikealle');
});

test('vasemman sarakkeen merkki toivoo nimiötään vasemmalle', () => {
  const ui = tynka(4);
  niputaFokusmerkit(ui, S);
  for (const r of ui.fokuskohdeRyhmat) {
    assert.equal(r.nippuPuoli, r.nippu.x < 1000, r.id);
  }
});

test('merkkien aluslaatat eivät mene päällekkäin edes kymmenen ryppäässä', () => {
  const ui = tynka(10);
  niputaFokusmerkit(ui, S);
  const paikat = ui.fokuskohdeRyhmat.map((r) => r.nippu);
  // Aluslaatan säde on 5,6 perustason pikseliä (NIPPU_KOHDE_R), joten
  // kahden merkin keskipisteiden on oltava vähintään sen kaksinkertaa
  // etäisyydellä toisistaan laudan yksiköissä.
  const vahin = 2 * 5.6 * S;
  for (let i = 0; i < paikat.length; i += 1) {
    for (let j = i + 1; j < paikat.length; j += 1) {
      const e = Math.hypot(paikat[i].x - paikat[j].x, paikat[i].y - paikat[j].y);
      assert.ok(e >= vahin - 1e-9, `${i}/${j} = ${e.toFixed(2)}`);
    }
  }
});

test('yksikään merkki ei jää kaupungin näkyvän kiekon päälle', () => {
  const ui = tynka(10);
  niputaFokusmerkit(ui, S);
  // Kiekon säde on 7,5 perustason pikseliä (NIPPU_KIEKKO_R).
  const raja = (7.5 + 5.6) * S;
  for (const r of ui.fokuskohdeRyhmat) {
    const e = Math.hypot(r.nippu.x - 1000, r.nippu.y - 1000);
    assert.ok(e >= raja - 1e-9, `${r.id} = ${e.toFixed(2)}`);
  }
});

test('kaukana oleva merkki jää omalle paikalleen', () => {
  const ui = tynka(1);
  ui.fokuskohdeRyhmat.push({ id: 'kaukainen', x: 1100, y: 1100 });
  niputaFokusmerkit(ui, S);
  assert.equal(ui.fokuskohdeRyhmat[1].nippu, null);
});

test('passi ei koske merkkien omiin koordinaatteihin (esitys, ei data)', () => {
  const ui = tynka(6);
  const ennen = ui.fokuskohdeRyhmat.map((r) => `${r.x}|${r.y}`);
  niputaFokusmerkit(ui, S);
  assert.deepEqual(ui.fokuskohdeRyhmat.map((r) => `${r.x}|${r.y}`), ennen);
});

test('sama lauta antaa saman ladonnan joka ajolla', () => {
  const asu = () => {
    const ui = tynka(9);
    niputaFokusmerkit(ui, S);
    return JSON.stringify(ui.fokuskohdeRyhmat.map((r) => [r.id, r.nippu, r.nippuPuoli]));
  };
  assert.equal(asu(), asu());
});

test('kaupungin laatta on nimiöväistön este', () => {
  const ui = tynka(2);
  const esteet = nippuLaattaEsteet(ui, S);
  assert.equal(esteet.length, 1);
  const [e] = esteet;
  assert.ok(e.x1 < 1000 && e.x2 > 1000 && e.y1 < 1000 && e.y2 > 1000);
});

test('ilman kaupunkeja mikään ei siirry', () => {
  const ui = tynka(4);
  ui.fokuskohdeKaupungit = [];
  ui.game = null;
  niputaFokusmerkit(ui, S);
  assert.ok(ui.fokuskohdeRyhmat.every((r) => r.nippu === null));
});

/* ============ SIIRTOVIIVA (js/fokusniput.js sääntö 6) ==============
 *
 * OMISTAJAN TILAUS 1.9.2026 ILTA, sanatarkasti: *"otetaan siirtoviivat
 * takaisin karttanostoille (esim. ateena)"*.
 *
 * Viivan koko sopimus on kolme lausetta, ja ne ovat tässä väitteinä:
 * viiva syntyy vain siirretystä merkistä, se alkaa merkin reunasta ja
 * päättyy ankkuripisteeseen, eikä paikallaan pysyvä merkki saa viivaa
 * — ei kartalle eikä poltettavaan riviin.
 */

/** Aluslaatan säde + hiusrako perustason pikseleinä (NIPPU_VIIVA_RAKO). */
const MERKIN_REUNA = 5.6 + 2.5;

test('jokainen siirretty merkki saa viivan, siirtämätön ei', () => {
  const ui = tynka(4);
  ui.fokuskohdeRyhmat.push({ id: 'kaukainen', x: 1100, y: 1100 });
  const viivat = niputaFokusmerkit(ui, S);
  const siirretyt = ui.fokuskohdeRyhmat.filter((r) => r.nippu).map((r) => r.id);
  assert.equal(siirretyt.length, 4);
  assert.deepEqual(viivat.map((v) => v.id).sort(), siirretyt.sort());
  assert.ok(!viivat.some((v) => v.id === 'kaukainen'),
    'paikallaan pysyvä merkki ei saa viivaa — viiva on siirron jälki');
  for (const v of viivat) assert.ok(nippuViivanJana(v, S), `${v.id} ilman janaa`);
});

test('jana alkaa merkin reunasta ja päättyy ankkuripisteeseen', () => {
  const ui = tynka(6);
  const viivat = niputaFokusmerkit(ui, S);
  assert.ok(viivat.length === 6);
  for (const v of viivat) {
    const j = nippuViivanJana(v, S);
    // Loppupää ON ankkuri, ei sen lähellä: viiva osoittaa pisteeseen,
    // johon merkki kuuluu, ja kaupungin oma merkintä peittää sisimmän
    // pätkän (kerros on laattojen alla).
    assert.equal(j.x2, v.cx, `${v.id} x2`);
    assert.equal(j.y2, v.cy, `${v.id} y2`);
    // Alkupää on merkin aluslaatan reunassa hiusraon päässä — ei
    // merkin keskellä, tai viiva näyttäisi kasvavan merkistä ulos.
    const merkista = Math.hypot(j.x1 - v.x, j.y1 - v.y);
    assert.ok(Math.abs(merkista - MERKIN_REUNA * S) < 1e-9,
      `${v.id}: alkupää ${merkista.toFixed(3)} eikä ${(MERKIN_REUNA * S).toFixed(3)}`);
    // Ja se on ankkurin ja merkin VÄLISSÄ, ei niiden takana.
    const pituus = Math.hypot(v.x - v.cx, v.y - v.cy);
    assert.ok(Math.hypot(j.x1 - v.cx, j.y1 - v.cy) < pituus, `${v.id} suunta`);
  }
});

test('liian lyhyt pätkä ei ole viiva vaan roska — jana jää tekemättä', () => {
  // Merkki aivan ankkurinsa päällä: reunan ja hiusraon jälkeen ei jää
  // NIPPU_VIIVA_MIN:n verran mitään piirrettävää.
  const lahella = {
    cx: 1000, cy: 1000, x: 1000 + MERKIN_REUNA * S, y: 1000, sade: 5.6,
  };
  assert.equal(nippuViivanJana(lahella, S), null);
  // Sama piste kahdesti ei ole jana lainkaan.
  assert.equal(nippuViivanJana({
    cx: 1000, cy: 1000, x: 1000, y: 1000, sade: 5.6,
  }, S), null);
});

test('viivan mitat elävät merkkiskaalan mukana, eivät ruudun', () => {
  /*
   * Sama jana kahdella mittakaavalla. Merkki on tässä KAUKANA
   * ankkuristaan, jotta kumpikin skaala mahtuu piirtämään sen —
   * ryppään oma 15,6 pikselin etäisyys on ladottu S:llä eikä kestä
   * kaksinkertaista merkkiä.
   */
  const v = { cx: 1000, cy: 1000, x: 1040, y: 1000, sade: 5.6 };
  const a = nippuViivanJana(v, S);
  const b = nippuViivanJana(v, S * 2);
  assert.ok(Math.abs(b.leveys - a.leveys * 2) < 1e-9, 'paksuus');
  assert.ok(Math.abs(b.katko - a.katko * 2) < 1e-9, 'katko');
  // Isompi merkki peittää enemmän, joten sen reuna — ja viivan alkupää
  // — on LÄHEMPÄNÄ ankkuria; loppupää ei liiku, koska ankkuripisteellä
  // ei ole kokoa.
  assert.ok(b.x1 < a.x1, 'alkupää seuraa merkin kokoa');
  assert.equal(b.x2, a.x2);
});

test('poltettavassa rivissä on viiva vain siirretyllä merkillä', () => {
  /*
   * SAMA LADONTA KUIN LAATTAPYRAMIDIN AJOSSA, koko maailma. Kenttä
   * `viiva` on se, jonka tools/fokuskartta/maailmapiirto.js
   * piirraNostotKankaalle polttaa laattaan ja jonka päät
   * tools/generoi-laattapyramidi.mjs lukee mustelaatikkoonsa: jos se
   * jäisi tyhjäksi, poltetusta kartasta puuttuisi viiva, jonka peli
   * piirtää eläville — tai toisin päin.
   */
  const { merkit } = keraaNostot(MAAILMANKARTTA);
  const viivallisia = merkit.filter((m) => m.viiva);
  assert.ok(viivallisia.length > 50,
    `vain ${viivallisia.length} siirtoviivaa koko maailmassa — ladonta on muuttunut`);
  for (const m of viivallisia) {
    assert.ok(Number.isFinite(m.viiva.x1) && Number.isFinite(m.viiva.y2),
      `${m.tunnus}: janan päät eivät ole lukuja`);
    assert.ok(m.viiva.leveys > 0 && m.viiva.katko > 0, `${m.tunnus}: mitat`);
    // Viivan alkupää on merkissä kiinni: sen etäisyys merkin
    // keskipisteestä on aluslaatan reuna, ei mitä sattuu.
    const merkista = Math.hypot(m.viiva.x1 - m.x, m.viiva.y1 - m.y);
    assert.ok(merkista > 0, `${m.tunnus}: alkupää merkin keskellä`);
  }
  // Ja loput ovat viivattomia: kenttä on olemassa ja null, jotta
  // luettelon muoto on sama jokaisella merkillä.
  for (const m of merkit) {
    assert.ok('viiva' in m, `${m.tunnus}: viiva-kenttä puuttuu kokonaan`);
    if (!m.viiva) assert.equal(m.viiva, null, `${m.tunnus}`);
  }
});
