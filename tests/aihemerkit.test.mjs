/*
 * AIHEMERKIT JA VIUHKA (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 27).
 *
 * Omistaja 15.9.2026 klo 20.00 UTC Pariisin rykelmästä, sanatarkasti:
 * *"Tee saman aiheen nostot yhdeksi ilman selitettyä. Klikattaessa
 * vaihtoehdot tulevat viuhkana näkyviin nimien kanssa"*.
 *
 * Nämä testit pitävät kiinni päätöksen neljästä reunaehdosta, jotka
 * ovat pelkkää geometriaa eivätkä vaadi selainta:
 *
 *   1. VAIN SAMA AIHE yhdistyy (kohta 1).
 *   2. YKSINÄINEN NOSTO EI KATOA merkin sisään (kohta 4: maan laajat
 *      yksittäiset nostot näkyvät nimiöin heti).
 *   3. VIUHKA MAHTUU RUUDULLE — myös 390 px:n puhelimella ja ruudun
 *      laidassa (kohta 2:n mittaus, kohta 6).
 *   4. Kohdat eivät kasaudu päällekkäin: pystyväli on vähintään
 *      nimiörivin verran.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  RYHMITYKSEN_ETAISYYS_PX, VIUHKAN_RIVI_PX, kohdanLaatikko, ryhmitaNostot, viuhkanAsemat,
} from '../js/pallolauta/aihemerkit.js';

/** Merkki ruutupisteessä; nimiölaatikko on kaista merkin oikealla. */
const merkki = (avain, aihe, x, y, leveys = 40) => ({
  avain, aihe, p: { x, y }, leveys,
});
const laatikko = (m) => ({
  x0: m.p.x - 6, y0: m.p.y - 6, x1: m.p.x + 8 + m.leveys, y1: m.p.y + 6,
});

test('saman aiheen lähekkäiset nostot yhdistyvät, eri aiheen eivät', () => {
  const merkit = [
    merkki('a', 'historia', 100, 100),
    merkki('b', 'historia', 115, 112),
    merkki('c', 'kulttuuri', 108, 105),
  ];
  const { ryhmat, yksin } = ryhmitaNostot(merkit, laatikko);
  assert.equal(ryhmat.length, 1, 'ryhmiä pitäisi olla tasan yksi');
  assert.deepEqual(ryhmat[0].map((m) => m.avain).sort(), ['a', 'b']);
  // Eri aihe jää omaksi merkikseen, vaikka se on RYKELMÄN KESKELLÄ.
  assert.deepEqual(yksin.map((m) => m.avain), ['c']);
});

test('rykelmä yhdistyy ketjuna, vaikka päät eivät kosketa toisiaan', () => {
  const merkit = [
    merkki('a', 'kulttuuri', 100, 100),
    merkki('b', 'kulttuuri', 130, 100),
    merkki('c', 'kulttuuri', 160, 100),
  ];
  const { ryhmat } = ryhmitaNostot(merkit, laatikko);
  assert.equal(ryhmat.length, 1);
  assert.equal(ryhmat[0].length, 3, 'ketjun keskimmäinen sitoo päät yhteen');
});

test('yksinäinen nosto ei koskaan katoa aihemerkin sisään', () => {
  // PAATOKSET 27 kohta 4: Mont-Saint-Michelin kaltaiset maan laajat
  // yksittäiset nostot näkyvät nimiöin heti. Etäisyys on moninkertainen
  // kynnykseen nähden, eivätkä nimiölaatikot kosketa.
  const merkit = [0, 1, 2].map((i) => merkki(`m${i}`, 'luonto', 100 + i * 5 * RYHMITYKSEN_ETAISYYS_PX, 100));
  const { ryhmat, yksin } = ryhmitaNostot(merkit, laatikko);
  assert.equal(ryhmat.length, 0);
  assert.equal(yksin.length, 3);
});

test('limittyvät nimiöt yhdistyvät, vaikka merkit olisivat kaukana', () => {
  // Pitkä nimi ulottuu naapurin päälle: kynnys ei ole pelkkä etäisyys
  // vaan myös se muste, joka ruudulla on.
  const merkit = [
    merkki('a', 'kauppa', 100, 100, 200),
    merkki('b', 'kauppa', 100 + RYHMITYKSEN_ETAISYYS_PX + 40, 100, 200),
  ];
  const etaisyys = Math.hypot(merkit[0].p.x - merkit[1].p.x, merkit[0].p.y - merkit[1].p.y);
  assert.ok(etaisyys > RYHMITYKSEN_ETAISYYS_PX, 'koeasetelma: merkit ovat kynnystä kauempana');
  const { ryhmat } = ryhmitaNostot(merkit, laatikko);
  assert.equal(ryhmat.length, 1);
});

/** Mahtuuko jokainen kohta ruudulle, kun merkki on kohdassa p? */
const viuhkaMahtuu = (p, ruutu, leveydet) => {
  const { puoli, asemat } = viuhkanAsemat({ p, ruutu, leveydet });
  return asemat.every((a, i) => {
    const l = kohdanLaatikko(p.x + a.dx, p.y + a.dy, leveydet[i], puoli);
    return l.x0 >= 0 && l.y0 >= 0 && l.x1 <= ruutu.leveys && l.y1 <= ruutu.korkeus;
  });
};

test('viuhka mahtuu puhelimen ruudulle myös laidassa ja nurkassa', () => {
  const ruutu = { leveys: 390, korkeus: 844 };
  const leveydet = [60, 80, 55, 70, 90, 50];
  for (const p of [
    { x: 195, y: 422 }, // keskellä
    { x: 40, y: 120 }, // vasen ylänurkka
    { x: 350, y: 120 }, // oikea ylänurkka
    { x: 40, y: 760 }, // vasen alanurkka
    { x: 350, y: 760 }, // oikea alanurkka
  ]) {
    assert.ok(viuhkaMahtuu(p, ruutu, leveydet),
      `viuhka ei mahtunut ruudulle kohdassa ${p.x},${p.y}`);
  }
});

test('viuhka mahtuu myös työpöydän ruudulle', () => {
  const ruutu = { leveys: 1400, korkeus: 900 };
  const leveydet = [70, 120, 60, 95];
  for (const p of [{ x: 700, y: 450 }, { x: 60, y: 60 }, { x: 1340, y: 840 }]) {
    assert.ok(viuhkaMahtuu(p, ruutu, leveydet), `kohdassa ${p.x},${p.y}`);
  }
});

test('viuhkan kohdat eivät kasaudu päällekkäin', () => {
  const ruutu = { leveys: 1400, korkeus: 900 };
  const leveydet = [60, 60, 60, 60, 60, 60, 60];
  const p = { x: 700, y: 450 };
  const { asemat } = viuhkanAsemat({ p, ruutu, leveydet });
  for (let i = 1; i < asemat.length; i += 1) {
    const vali = Math.hypot(asemat[i].dx - asemat[i - 1].dx, asemat[i].dy - asemat[i - 1].dy);
    assert.ok(vali >= VIUHKAN_RIVI_PX,
      `kohdat ${i - 1} ja ${i} ovat ${vali.toFixed(1)} px:n päässä toisistaan`);
  }
});

test('viuhka kääntyy ruudun keskeltä poispäin', () => {
  const ruutu = { leveys: 390, korkeus: 844 };
  const leveydet = [80, 80];
  assert.equal(viuhkanAsemat({ p: { x: 60, y: 400 }, ruutu, leveydet }).puoli, 'oikea');
  assert.equal(viuhkanAsemat({ p: { x: 330, y: 400 }, ruutu, leveydet }).puoli, 'vasen');
});
