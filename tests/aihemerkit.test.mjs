/*
 * AIHEMERKIT JA VIUHKA (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 27).
 *
 * Omistaja 15.9.2026 klo 20.00 UTC Pariisin rykelmästä, sanatarkasti:
 * *"Tee saman aiheen nostot yhdeksi ilman selitettyä. Klikattaessa
 * vaihtoehdot tulevat viuhkana näkyviin nimien kanssa"*.
 *
 * TARKENNUS 2 (omistaja 16.9.2026 klo 19.00 UTC, Pariisin lähizoomin
 * ennen/jälkeen-kuvasta), sanatarkasti: *"Nuo saman kategorian jutut
 * piti yhdistaa yhdeksi nostoksi ja sitten sita klikkaamalla sen
 * kategorian nostot aukeaisi omaksi viuhkakseen esille. Sen
 * yhdistetyn noston voi nimeta tarkeimman noston nimella ja laittaa
 * loppuun vain kolme pistetta."*
 *
 * Nämä testit pitävät kiinni päätöksen reunaehdoista, jotka ovat
 * pelkkää geometriaa ja merkkijonoja eivätkä vaadi selainta:
 *
 *   1. VAIN SAMA AIHE yhdistyy (kohta 1).
 *   2. YKSINÄINEN NOSTO EI KATOA merkin sisään (kohta 4: maan laajat
 *      yksittäiset nostot näkyvät nimiöin heti).
 *   3. VIUHKA MAHTUU RUUDULLE — myös 390 px:n puhelimella ja ruudun
 *      laidassa (kohta 2:n mittaus, kohta 6).
 *   4. Kohdat eivät kasaudu päällekkäin: pystyväli on vähintään
 *      nimiörivin verran.
 *   5. SAMA KAUPUNKI YHDISTÄÄ AINA, zoomista riippumatta (kohta 7) —
 *      ja vastakoe: ilman kaupunkiavainta samat nostot jäävät erilleen.
 *   6. NIMIÖ ON *"tärkeimmän noston nimi + kolme pistettä"* (kohta 8),
 *      ja aihenoston laatikko kattaa sen (sovittelu ja osumapinta).
 *   7. NIMIÖ NÄKYY VAIN LÄHIZOOMISSA (TARKENNUS 4 kohta 10, omistaja
 *      17.9.2026 klo 04.15 UTC): kynnys on SAMA kuin nostojen
 *      nimiöiden esiintulolla kaupunkia lähestyttäessä
 *      (js/pallolauta/nostot.js lahizoomiAuki), ja kun nimiö ei näy,
 *      laatikko on pelkkä lautanen — sovittelu ei varaa tilaa
 *      tekstille, jota ei piirretä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  AIHENOSTON_ELLIPSI, RYHMITYKSEN_ETAISYYS_PX, VIUHKAN_RIVI_PX, aihemerkinLaatikko,
  aihenostonNimio, kohdanLaatikko, ryhmitaNostot, viuhkanAsemat,
} from '../js/pallolauta/aihemerkit.js';
/*
 * KYNNYS ASUU NOSTOKERROKSESSA, koska se on SAMA kynnys kuin
 * nostojen nimiöiden esiintulolla (lahizoomiAuki) — aihemerkit.js ei
 * saa tuoda nostot.js:ää (nostot.js tuo aihemerkit.js:n, ja kehä
 * kaatuisi). Testi tuo molemmat ja mittaa, että ne ovat sama portti.
 */
import {
  LAHIZOOMIN_OSUUS_ULOIMMASTA, aihenostonNimioNakyy, lahizoomiAuki,
} from '../js/pallolauta/nostot.js';

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

test('maastokohde ei sulaudu lähellä olevaan saman aiheen nostoon (16.9.2026)', () => {
  // Fablen jättämä ratkaistava (docs/raportit/viesti-fable-aihemerkit-
  // 20260915.md luku 3): Mont-Saint-Michel sulautui 44 px:n kynnyksellä
  // Chandeleur-nostoon, koska molemmat ovat kulttuuria ja 40 px:n
  // päässä toisistaan. `maasto: true` -lipulla varustettu merkki EI
  // liity mihinkään ryhmään eikä vedä toista mukaansa, vaikka nimiöt
  // limittyisivät (40 px < 44 px:n kynnys).
  const montSaintMichel = { ...merkki('mont-saint-michel', 'kulttuuri', 100, 100), maasto: true };
  const chandeleur = merkki('chandeleur', 'kulttuuri', 140, 100); // 40 px päässä
  const { ryhmat, yksin } = ryhmitaNostot([montSaintMichel, chandeleur], laatikko);
  assert.equal(ryhmat.length, 0, 'maastokohde ei saa muodostaa ryhmää');
  assert.deepEqual(yksin.map((m) => m.avain).sort(), ['chandeleur', 'mont-saint-michel']);
});

test('vastaväite: ilman maasto-lippua samat kaksi nostoa sulautuisivat', () => {
  const a = merkki('mont-saint-michel', 'kulttuuri', 100, 100);
  const b = merkki('chandeleur', 'kulttuuri', 140, 100); // 40 px päässä
  const { ryhmat } = ryhmitaNostot([a, b], laatikko);
  assert.equal(ryhmat.length, 1, 'ilman maasto-lippua nämä kaksi sulautuvat (koeasetelman kontrolli)');
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

/* ══ TARKENNUS 2 kohta 7: SAMA KAUPUNKI YHDISTÄÄ AINA ═══════════════ */

test('saman kaupungin saman aiheen nostot yhdistyvät zoomista riippumatta', () => {
  // Kaukana toisistaan ruudulla (10 × kynnys) eivätkä nimiöt kosketa:
  // vain kaupunkijäsenyys voi sitoa nämä yhteen.
  const merkit = [
    { ...merkki('mona-lisa', 'skandaalit', 100, 100), kaupunkiAvain: 'pariisi' },
    {
      ...merkki('vrain-lucas', 'skandaalit', 100 + 10 * RYHMITYKSEN_ETAISYYS_PX, 400),
      kaupunkiAvain: 'pariisi',
    },
  ];
  const { ryhmat, yksin } = ryhmitaNostot(merkit, laatikko);
  assert.equal(ryhmat.length, 1, 'saman kaupungin saman aiheen nostot ovat yksi aihenosto');
  assert.equal(yksin.length, 0);
});

test('VASTAKOE: ilman kaupunkiavainta samat kaksi nostoa jäävät erilleen', () => {
  const merkit = [
    merkki('mona-lisa', 'skandaalit', 100, 100),
    merkki('vrain-lucas', 'skandaalit', 100 + 10 * RYHMITYKSEN_ETAISYYS_PX, 400),
  ];
  const { ryhmat, yksin } = ryhmitaNostot(merkit, laatikko);
  assert.equal(ryhmat.length, 0, 'kaupungin ulkopuolella mitta jää voimaan');
  assert.equal(yksin.length, 2);
});

test('eri kaupungin sama aihe ei yhdisty pelkän kaupunkiavaimen nojalla', () => {
  const merkit = [
    { ...merkki('a', 'historia', 100, 100), kaupunkiAvain: 'pariisi' },
    {
      ...merkki('b', 'historia', 100 + 10 * RYHMITYKSEN_ETAISYYS_PX, 400),
      kaupunkiAvain: 'lyon',
    },
  ];
  assert.equal(ryhmitaNostot(merkit, laatikko).ryhmat.length, 0);
});

test('saman kaupungin ERI aiheet eivät yhdisty', () => {
  const merkit = [
    { ...merkki('a', 'historia', 100, 100), kaupunkiAvain: 'pariisi' },
    { ...merkki('b', 'ruoka', 104, 102), kaupunkiAvain: 'pariisi' },
  ];
  assert.equal(ryhmitaNostot(merkit, laatikko).ryhmat.length, 0,
    'aihe on yhä ensimmäinen ehto (kohta 1)');
});

test('maastokohde ei yhdisty edes samassa kaupungissa (kohta 6 voittaa kohdan 7)', () => {
  const merkit = [
    {
      ...merkki('mont-saint-michel', 'kulttuuri', 100, 100),
      kaupunkiAvain: 'pariisi',
      maasto: true,
    },
    { ...merkki('chandeleur', 'kulttuuri', 108, 104), kaupunkiAvain: 'pariisi' },
  ];
  const { ryhmat, yksin } = ryhmitaNostot(merkit, laatikko);
  assert.equal(ryhmat.length, 0);
  assert.deepEqual(yksin.map((m) => m.avain).sort(), ['chandeleur', 'mont-saint-michel']);
});

test('yksinäinen saman aiheen nosto pysyy omana nostonaan kaupungissakin', () => {
  const merkit = [
    { ...merkki('a', 'historia', 100, 100), kaupunkiAvain: 'pariisi' },
    {
      ...merkki('b', 'ruoka', 100 + 10 * RYHMITYKSEN_ETAISYYS_PX, 400),
      kaupunkiAvain: 'pariisi',
    },
  ];
  const { ryhmat, yksin } = ryhmitaNostot(merkit, laatikko);
  assert.equal(ryhmat.length, 0, 'kohta 9: yksinäinen saman aiheen nosto pysyy omanaan');
  assert.equal(yksin.length, 2);
});

/* ══ TARKENNUS 2 kohta 8: NIMIÖ ON NIMI + KOLME PISTETTÄ ════════════ */

test('aihenoston nimiö on tärkeimmän noston nimi ja kolme pistettä', () => {
  assert.equal(aihenostonNimio('Bastilji'), `Bastilji${AIHENOSTON_ELLIPSI}`);
  assert.equal(AIHENOSTON_ELLIPSI, '…', 'kolme pistettä on YKSI merkki, kuten muualla pelissä');
});

test('pitkä nimi lyhennetään kartan omalla tavalla, mutta loppuun jää vain ellipsi', () => {
  const nimio = aihenostonNimio('Mona Lisan varkaus 1911');
  assert.ok(nimio.endsWith(AIHENOSTON_ELLIPSI), `nimiö oli ${nimio}`);
  assert.ok(!nimio.includes('.'), `lyhennyspiste ei saa jäädä ellipsin eteen: ${nimio}`);
  // Kartan lyhennys katkaisee 18 merkkiin; ellipsi tulee sen perään.
  assert.ok([...nimio].length <= 19, `nimiö oli ${[...nimio].length} merkkiä: ${nimio}`);
});

test('tyhjästä nimestä ei synny pelkkää ellipsiä', () => {
  assert.equal(aihenostonNimio(''), '');
  assert.equal(aihenostonNimio(null), '');
});

test('aihenoston laatikko kattaa nimiön, ja ilman nimiötä vain lautasen', () => {
  const d = {
    mitta: 1,
    nimi: `Mona Lisan varkaus${AIHENOSTON_ELLIPSI}`,
    symLaji: null,
    nimioNakyy: true,
    puoli: 'oikea',
  };
  const p = { x: 200, y: 200 };
  const kanssa = aihemerkinLaatikko(p, d);
  const ilman = aihemerkinLaatikko(p, d, { nimio: false });
  assert.ok(kanssa.x1 > ilman.x1, 'nimiö leventää laatikkoa oikealle');
  assert.equal(ilman.x1 - ilman.x0, ilman.y1 - ilman.y0, 'ilman nimiötä laatikko on neliö');
  const vasen = aihemerkinLaatikko(p, d, { kylki: 'vasen' });
  assert.ok(vasen.x0 < ilman.x0, 'vasen kylki leventää laatikkoa vasemmalle');
});

test('aihenoston laatikko seuraa sovittelun siirtoa', () => {
  const d = {
    mitta: 1,
    nimi: `Bastilji${AIHENOSTON_ELLIPSI}`,
    symLaji: null,
    nimioNakyy: true,
    puoli: 'oikea',
  };
  const a = aihemerkinLaatikko({ x: 200, y: 200 }, d);
  const b = aihemerkinLaatikko({ x: 200, y: 200 }, d, { dx: 6, dy: -6 });
  assert.ok(Math.abs((b.x0 - a.x0) - 6) < 1e-9);
  assert.ok(Math.abs((b.y0 - a.y0) + 6) < 1e-9);
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

/*
 * ══ NIMIÖ VAIN LÄHIZOOMISSA (TARKENNUS 4 kohta 10) ════════════════
 *
 * Omistaja 17.9.2026 klo 04.15 UTC, kortti *"Nimiö vain
 * lähizoomissa"*: aihenoston nimiö näkyy VAIN lähizoomissa *"sama
 * kynnys kuin nostojen nimiöiden esiintulolla kaupunkia
 * lähestyttäessä"*, ja koko maan näkymässä aihenosto on pelkkä
 * symboli.
 */
test('aihenoston nimiö näkyy vain, kun osuus alittaa lähizoomin kynnyksen', () => {
  // Koko maan saapumisnäkymä on osuus 1,0 (Ranska 390 px, mitattu).
  assert.equal(aihenostonNimioNakyy(1), false, 'saapumisnäkymässä ei nimiötä');
  assert.equal(aihenostonNimioNakyy(0.9), false);
  assert.equal(aihenostonNimioNakyy(LAHIZOOMIN_OSUUS_ULOIMMASTA + 1e-9), false,
    'kynnyksen yläpuolella ei nimiötä');
  // Kynnys itse kuuluu lähizoomiin, kuten lahizoomiAuki (<=).
  assert.equal(aihenostonNimioNakyy(LAHIZOOMIN_OSUUS_ULOIMMASTA), true);
  // Pariisin sisin zoomi puhelimella on 0,341 uloimmasta (mitattu).
  assert.equal(aihenostonNimioNakyy(0.341), true, 'lähizoomissa nimiö näkyy');
});

test('tuntematon osuus (0) ei näytä nimiötä — sama varovaisuus kuin portilla', () => {
  assert.equal(aihenostonNimioNakyy(0), false);
  assert.equal(aihenostonNimioNakyy(-1), false);
});

test('kynnys on SAMA kuin nostojen nimiöiden esiintulolla (lahizoomiAuki)', () => {
  for (const osuus of [0, 0.2, 0.341, 0.5, 0.699, 0.7, 0.701, 0.9, 1, 1.4]) {
    assert.equal(aihenostonNimioNakyy(osuus), lahizoomiAuki(osuus),
      `osuus ${osuus}: aihenoston nimiö ja lähizoomiportti eri mieltä`);
  }
});

test('ilman nimiötä laatikko on pelkkä lautanen — sovittelu ei varaa turhaa tilaa', () => {
  const nimi = `Mona Lisan varkaus${AIHENOSTON_ELLIPSI}`;
  const p = { x: 200, y: 200 };
  // Sama merkki, sama nimi: eroa on vain kynnyksen antama lippu.
  const lahella = aihemerkinLaatikko(p, {
    mitta: 1, nimi, symLaji: null, nimioNakyy: true, puoli: 'oikea',
  });
  const kaukana = aihemerkinLaatikko(p, {
    mitta: 1, nimi, symLaji: null, nimioNakyy: false, puoli: 'oikea',
  });
  assert.ok(kaukana.x1 < lahella.x1, 'saapumisnäkymässä laatikko on kapeampi');
  assert.equal(kaukana.x1 - kaukana.x0, kaukana.y1 - kaukana.y0,
    'ilman nimiötä laatikko on lautasen neliö');
});
