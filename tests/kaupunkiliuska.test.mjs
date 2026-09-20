// Kaupunkiliuskan malli (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34):
// kaupungin sisäiset nostot liuskaan, ulkopuoliset kartalle.
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  KAUPUNGIN_SADE_KM, NAHTAVYYDET_NIMIO, TURISTIOPPAAN_NIMIO, etaisyysKm,
  kategoriat, kaupunginNostot, kelattuLiuska, kelauksenAskel, liuskanRivit, nostonOmaPaikka,
  onKaupunginSisainen, ylaryhmanMaara,
} from '../js/pallolauta/kaupunkiliuska.js';
import {
  KOVAN_ESTEEN_PAINO, VIUHKAN_ALAS_ALKU_PX, VIUHKAN_RIVI_PX, VIUHKAN_TIHEIN_VALI_PX,
  alasMahtuvatRivit, kohdanLaatikko, viuhkanAsemat,
} from '../js/pallolauta/aihemerkit.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';
import { PALLO_LAUTA } from '../js/pallo.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { kaupungillaKohdekartta, turistiOppaanArtikkeli } from '../js/kaupunkinosto.js';
import { readFileSync } from 'node:fs';

const PARIISI = { lat: 48.8566, lng: 2.3522, nimi: 'Pariisi' };

/** Nostorivi samassa muodossa kuin js/pallolauta/nostot.js latoo. */
const nosto = (nimi, lat, lng, aihe, extra = {}) => ({
  avain: `nosto:${nimi}`,
  perhe: 'nosto',
  nimi,
  lat,
  lng,
  aihe,
  avaa: () => true,
  ...extra,
});

test('etäisyys tunnetuille pareille on oikeaa suuruusluokkaa', () => {
  assert.ok(Math.abs(etaisyysKm(PARIISI, { lat: 48.8049, lng: 2.1204 }) - 17) < 3);
  assert.ok(Math.abs(etaisyysKm(PARIISI, { lat: 48.4469, lng: 1.4874 }) - 80) < 8);
  assert.equal(etaisyysKm(PARIISI, { lat: NaN, lng: 0 }), Infinity);
});

test('Versailles, Chartres ja Chambord jäävät kaupungin ulkopuolelle', () => {
  assert.equal(onKaupunginSisainen(nosto('Louvre', 48.8606, 2.3376, 'kulttuuri'), PARIISI), true);
  assert.equal(onKaupunginSisainen(nosto('Versailles', 48.8049, 2.1204, 'historia'), PARIISI), false);
  assert.equal(onKaupunginSisainen(nosto('Chartres', 48.4469, 1.4874, 'historia'), PARIISI), false);
  assert.equal(onKaupunginSisainen(nosto('Chambord', 47.6161, 1.5169, 'historia'), PARIISI), false);
  assert.ok(KAUPUNGIN_SADE_KM > 10 && KAUPUNGIN_SADE_KM < 17);
});

test('jäsenyys luetaan noston OMASTA datapaikasta, ei levitetystä ankkurista', () => {
  /*
   * PAATOKSET 34 kohta 4. Erä 4 mittasi jäsenyyden `lat`/`lng`:stä,
   * jotka ankkurilevitys (PAATOKSET 32) oli jo kirjoittanut 33–74 km
   * päähän — silloin liuskassa oli kaksi kategoriaa ja kaupungin omat
   * nostot jäivät kartalle. Oma paikka voittaa levitetyn.
   */
  const levitetty = nosto('Tuileriain rauniot', 49.2, 2.9, 'historia', {
    omaLat: 48.8622, omaLng: 2.3325,
  });
  assert.deepEqual(nostonOmaPaikka(levitetty), { lat: 48.8622, lng: 2.3325 });
  assert.equal(onKaupunginSisainen(levitetty, PARIISI), true);
  // Ja toisin päin: kaupungin päälle LADOTTU Chambord ei ole sisäinen.
  const ladottuKaupunkiin = nosto('Chambord', 48.857, 2.35, 'historia', {
    omaLat: 47.6161, omaLng: 1.5169,
  });
  assert.equal(onKaupunginSisainen(ladottuKaupunkiin, PARIISI), false);
});

test('paikkanimi kaupungin nimenä riittää sisäisyyteen ilman koordinaattia', () => {
  const arvio = nosto('Kyyhkyposti', 60, 25, 'kauppa', { paikkaNimi: 'Pariisi' });
  assert.equal(onKaupunginSisainen(arvio, PARIISI), true);
  const muu = nosto('Kaulanauhajuttu', 48.8049, 2.1204, 'skandaalit', {
    paikkaNimi: "Versailles'n palatsi",
  });
  assert.equal(onKaupunginSisainen(muu, PARIISI), false);
});

test('laudan Pariisin oma piste kelpaa jäsenyyden keskukseksi', () => {
  /*
   * Erä 4:n oletus oli, että laudan kaupungin asteet ovat ruudukosta
   * kymmeniä kilometrejä sivussa. Mitattu: ero oikeaan Pariisiin on
   * alle 3 km, eli 12 km:n säde riittää — mediaania ei tarvita.
   */
  const c = (MAAILMANKARTTA.cities ?? []).find((k) => k.id === 'pariisi');
  const a = laudaltaAsteiksi(PALLO_LAUTA, c.x, c.y);
  const laudanPariisi = { lat: a.lat, lng: a.lon, nimi: 'Pariisi' };
  assert.ok(etaisyysKm(laudanPariisi, PARIISI) < 3);
  for (const [nimi, lat, lng] of [
    ['Tuileriain rauniot', 48.86222, 2.3325],
    ['Kyyhkyposti', 48.8566, 2.3522],
    ['Impressionistit', 48.8705, 2.328],
    ['Paras patonki', 48.8703, 2.3167],
  ]) {
    assert.equal(onKaupunginSisainen(nosto(nimi, lat, lng, 'historia'), laudanPariisi), true, nimi);
  }
  // Kaulanauhajuttu on datassa Versailles'ssa (17,9 km) — kartalle.
  assert.equal(
    onKaupunginSisainen(nosto('Kaulanauhajuttu', 48.8049, 2.1204, 'skandaalit'), laudanPariisi),
    false,
  );
});

test('kaupunkimerkki ja poltettu muste eivät ole kaupungin sisäisiä nostoja', () => {
  assert.equal(onKaupunginSisainen(nosto('Pariisi', 48.8566, 2.3522, null, { kaupunki: true }), PARIISI), false);
  assert.equal(onKaupunginSisainen(nosto('Seine', 48.85, 2.35, 'luonto', { poltettu: true }), PARIISI), false);
});

test('kaupungin nostot suodattuvat ja kategoriat lasketaan', () => {
  const rivit = [
    nosto('Louvre', 48.8606, 2.3376, 'kulttuuri', { ladontaNro: 2 }),
    nosto('Mona Lisan varkaus', 48.8608, 2.3378, 'kulttuuri', { ladontaNro: 1 }),
    nosto('Bastilji', 48.8532, 2.3692, 'historia', { ladontaNro: 3 }),
    nosto('Versailles', 48.8049, 2.1204, 'historia', { ladontaNro: 4 }),
    nosto('Nimikyltti', 48.86, 2.34, 'historia', { vainNimi: true }),
  ];
  const sisaiset = kaupunginNostot(rivit, PARIISI);
  assert.deepEqual(sisaiset.map((r) => r.nimi), ['Mona Lisan varkaus', 'Louvre', 'Bastilji']);
  const kasat = kategoriat(sisaiset);
  assert.equal(kasat.length, 2);
  assert.equal(kasat[0].maara, 2);
  assert.equal(kasat.reduce((a, k) => a + k.maara, 0), sisaiset.length);
});

test('liuskassa on kolme yläryhmän riviä ja kategoriat lukumäärineen', () => {
  const nostot = kaupunginNostot([
    nosto('Louvre', 48.8606, 2.3376, 'kulttuuri'),
    nosto('Bastilji', 48.8532, 2.3692, 'historia'),
    nosto('Ranskan vallankumous', 48.8534, 2.3688, 'historia'),
  ], PARIISI);
  const rivit = liuskanRivit({ kaupunki: PARIISI, nostot });
  assert.equal(ylaryhmanMaara(rivit), 3);
  assert.equal(rivit[0].nimi, 'Pariisi');
  assert.equal(rivit[1].nimi, NAHTAVYYDET_NIMIO);
  assert.equal(rivit[2].nimi, TURISTIOPPAAN_NIMIO);
  const kategoriarivit = rivit.filter((r) => r.laji === 'kategoria');
  assert.equal(kategoriarivit.length, 2);
  assert.ok(kategoriarivit.every((r) => /\(\d+\)$/.test(r.nimi)));
  // Haitari kiinni: yhtään kohderiviä ei ole.
  assert.equal(rivit.filter((r) => r.laji === 'kohde').length, 0);
});

test('haitari avaa vain yhden kategorian kerrallaan', () => {
  const nostot = kaupunginNostot([
    nosto('Louvre', 48.8606, 2.3376, 'kulttuuri'),
    nosto('Bastilji', 48.8532, 2.3692, 'historia'),
    nosto('Ranskan vallankumous', 48.8534, 2.3688, 'historia'),
  ], PARIISI);
  const rivit = liuskanRivit({ kaupunki: PARIISI, nostot, avattuKategoria: 'historia' });
  const kohteet = rivit.filter((r) => r.laji === 'kohde');
  assert.equal(kohteet.length, 2);
  assert.ok(kohteet.every((r) => r.aihe === 'historia' && r.sisennys === 1));
  // Avattu kategoria on merkitty ja se on ainoa avoin.
  assert.equal(rivit.filter((r) => r.laji === 'kategoria' && r.auki).length, 1);
});

test('nostoton kaupunki näyttää vain yläryhmän (kohta 9)', () => {
  const rivit = liuskanRivit({ kaupunki: { nimi: 'Lyon', lat: 45.76, lng: 4.84 }, nostot: [] });
  assert.equal(rivit.length, 3);
  assert.equal(ylaryhmanMaara(rivit), 3);
});

test('puuttuva opas tai kohdekartta jättää rivinsä pois', () => {
  const rivit = liuskanRivit({ kaupunki: PARIISI, nostot: [], nahtavyyksia: false, opas: false });
  assert.deepEqual(rivit.map((r) => r.laji), ['lehti']);
});

/*
 * ══ AVATTU LISTA ESTEIDEN ULKOPUOLELLA (Fablen tarkistus 18.9.2026) ══
 *
 * Kaappaus pariisi-liuska-kategoria-390.png: avattu kategoria kasvoi
 * ylöspäin PARIISI-nimen päälle. Asento lasketaan nyt avatun listan
 * korkeudella ja lista kasvaa merkistä ALASPÄIN; kaupungin nimi ja
 * nappula ovat kovia esteitä myös avattuna (PAATOKSET 32 kohta 5).
 */
const PUHELIN = { leveys: 390, korkeus: 844 };
/** Kaupungin nimen laatikko merkin yläpuolella (kuten laudalla). */
const nimenLaatikko = (p) => ({
  x0: p.x - 40, x1: p.x + 40, y0: p.y - 34, y1: p.y - 8, paino: KOVAN_ESTEEN_PAINO,
});
/** Listan rivilaatikot ruudulla. */
const laatikot = (p, tulos) => tulos.asemat.map((a) => {
  const l = kohdanLaatikko(a.dx, a.dy, tulos.leveys, tulos.puoli);
  return {
    x0: p.x + l.x0, x1: p.x + l.x1, y0: p.y + l.y0, y1: p.y + l.y1,
  };
});
const limittyy = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

test('avattu liuska kasvaa alaspäin eikä kaupungin nimen päälle', () => {
  const p = { x: 195, y: 400 };
  const leveydet = new Array(14).fill(120);
  const este = nimenLaatikko(p);
  const alas = viuhkanAsemat({
    p, ruutu: PUHELIN, leveydet, esteet: [este], kasvu: 'alas',
  });
  assert.equal(alas.kovaSakko, 0, 'alaspäin kasvava lista löytää vapaan asennon');
  const ruudulla = laatikot(p, alas);
  assert.ok(ruudulla.every((l) => !limittyy(l, este)), 'yksikään rivi ei ole nimen päällä');
  assert.ok(ruudulla.every((l) => l.y0 >= p.y), 'lista on merkin alapuolella');
  assert.ok(ruudulla.every((l) => l.y1 <= PUHELIN.korkeus), 'lista pysyy ruudussa');
  // Keskitetty kasvu (viuhkan oletus) olisi noussut nimen päälle.
  const keskitetty = viuhkanAsemat({ p, ruutu: PUHELIN, leveydet, esteet: [este] });
  assert.ok(laatikot(p, keskitetty).some((l) => l.y0 < p.y - 40),
    'vertailukohta: keskitetty lista nousee merkin yläpuolelle');
});

test('ahtaassa ruudussa riviväli kutistuu ennen kuin lista nousee esteen päälle', () => {
  // Mitattu 390 px:llä: kotelo 780 px korkea, Pariisin merkki y 387,5,
  // pisin kategoria 13 riviä — 30 px:n välillä lista jäi 3 px:ä vajaaksi.
  const p = { x: 195, y: 387.5 };
  const ruutu = { leveys: 390, korkeus: 780 };
  const este = nimenLaatikko(p);
  const tulos = viuhkanAsemat({
    p, ruutu, leveydet: new Array(13).fill(120), esteet: [este], kasvu: 'alas',
  });
  assert.equal(tulos.kovaSakko, 0);
  const ruudulla = laatikot(p, tulos);
  assert.ok(ruudulla.every((l) => l.y0 >= p.y), 'koko lista on merkin alapuolella');
  assert.ok(ruudulla.every((l) => l.y1 <= ruutu.korkeus), 'lista pysyy ruudussa');
  // Rivit eivät mene päällekkäin, vaikka väli kutistui.
  const jarjestetty = [...ruudulla].sort((a, b) => a.y0 - b.y0);
  for (let i = 1; i < jarjestetty.length; i += 1) {
    assert.ok(jarjestetty[i].y0 >= jarjestetty[i - 1].y1 - 0.001,
      `rivit ${i - 1} ja ${i} limittyvät`);
  }
  // Kaikki 13 riviä mahtuvat, joten kelaukseen ei tarvitse mennä.
  assert.ok(alasMahtuvatRivit({ p, ruutu }) >= 13);
});

test('alasMahtuvatRivit kertoo ikkunan koon merkin alapuolella', () => {
  const ylhaalla = alasMahtuvatRivit({ p: { x: 195, y: 100 }, ruutu: PUHELIN });
  const alhaalla = alasMahtuvatRivit({ p: { x: 195, y: 700 }, ruutu: PUHELIN });
  assert.ok(ylhaalla > alhaalla);
  assert.ok(alhaalla >= 1 && alhaalla <= 6, `alhaalla ${alhaalla}`);
  // Ruudun alalaidassa ei ole tilaa yhdellekään riville.
  assert.equal(alasMahtuvatRivit({ p: { x: 195, y: 840 }, ruutu: PUHELIN }), 0);
  // Ikkuna päättyy ruudun alalaitaan: viimeinen rivi mahtuu vielä
  // tiheimmällä rivivälillä (lista kutistaa välin ennen kelausta).
  const y = 400;
  const viimeinen = y + VIUHKAN_ALAS_ALKU_PX
    + (alasMahtuvatRivit({ p: { x: 195, y }, ruutu: PUHELIN }) - 1) * VIUHKAN_TIHEIN_VALI_PX;
  assert.ok(viimeinen + VIUHKAN_RIVI_PX <= PUHELIN.korkeus);
});

test('liuska kelaa sisäisesti, kun ruutu ei riitä', () => {
  const rivit = Array.from({ length: 20 }, (_, i) => ({
    laji: 'kohde', nimi: `kohde ${i}`, avain: `kohde:${i}`, sisennys: 1,
  }));
  const ikkuna = kelattuLiuska(rivit, { enintaan: 8, kelaus: 0 });
  assert.equal(ikkuna.kelattu, true);
  assert.equal(ikkuna.rivit.length, 8, 'ikkuna ei ylitä ruudun rajaa');
  assert.equal(ikkuna.rivit.at(-1).laji, 'kelaus', 'alas kelaus tarjolla');
  assert.ok(ikkuna.rivit.every((r) => r.laji !== 'kelaus' || r.suunta === 1));
  // Kelattu ikkuna keskellä listaa: kelausrivit molemmin puolin.
  const keskella = kelattuLiuska(rivit, { enintaan: 8, kelaus: 6 });
  assert.equal(keskella.rivit.length, 8);
  assert.equal(keskella.rivit[0].laji, 'kelaus');
  assert.equal(keskella.rivit.at(-1).laji, 'kelaus');
  assert.equal(keskella.rivit.filter((r) => r.laji === 'kohde').length, 6);
  // Lyhyt lista ei kelaa lainkaan.
  const lyhyt = kelattuLiuska(rivit.slice(0, 5), { enintaan: 8 });
  assert.equal(lyhyt.kelattu, false);
  assert.equal(lyhyt.rivit.length, 5);
});

test('kelauksen askel pysyy listan sisällä', () => {
  const alas = kelauksenAskel({
    kelaus: 0, suunta: 1, enintaan: 8, maara: 20,
  });
  assert.equal(alas, 6);
  assert.equal(kelauksenAskel({
    kelaus: 6, suunta: -1, enintaan: 8, maara: 20,
  }), 0);
  assert.equal(kelauksenAskel({
    kelaus: 18, suunta: 1, enintaan: 8, maara: 20,
  }), 19);
  assert.equal(kelauksenAskel({
    kelaus: 0, suunta: -1, enintaan: 8, maara: 20,
  }), 0);
});

/* ── PAATOKSET 34 kohta 11: aiheeton nosto ei katoa ──────────────── */

test('aiheeton ja tuntematon aihe menevät yhteen "Muut"-kategoriaan listan loppuun', () => {
  const rivit = [
    nosto('Metro', 48.8566, 2.3522, 'kauppa'),
    nosto('Ilman aihetta', 48.8570, 2.3500, undefined),
    nosto('Louvre', 48.8606, 2.3376, 'kulttuuri'),
    nosto('Tuntematon aihe', 48.8580, 2.3400, 'ei-tallaista-aihetta'),
    nosto('Tyhja aihe', 48.8590, 2.3450, ''),
  ];
  const kat = kategoriat(rivit);
  // "Muut" on YKSI kasa ja se on listan viimeisenä.
  assert.equal(kat[kat.length - 1].nimi, 'Muut');
  assert.equal(kat.filter((k) => k.nimi === 'Muut').length, 1);
  assert.equal(kat[kat.length - 1].maara, 3);
  // Summa = nostojen määrä, ja jokainen nosto on TASAN YHDESSÄ kasassa.
  assert.equal(kat.reduce((s, k) => s + k.maara, 0), rivit.length);
  const avaimet = kat.flatMap((k) => k.jasenet.map((n) => n.avain));
  assert.equal(new Set(avaimet).size, rivit.length);
  // Tunnetut aiheet pysyvät ensiesiintymän järjestyksessä.
  assert.deepEqual(kat.slice(0, -1).map((k) => k.aihe), ['kauppa', 'kulttuuri']);
});

test('liuskan rivit avaavat Muut-kategorian haitarin kuten muutkin', () => {
  const nostot = [
    nosto('Metro', 48.8566, 2.3522, 'kauppa'),
    nosto('Ilman aihetta', 48.8570, 2.3500, null),
  ];
  const rivit = liuskanRivit({ kaupunki: { nimi: 'Pariisi' }, nostot, avattuKategoria: '' });
  assert.deepEqual(rivit.filter((r) => r.laji === 'kohde').map((r) => r.nimi), ['Ilman aihetta']);
  const otsikot = rivit.filter((r) => r.laji === 'kategoria').map((r) => r.nimi);
  assert.equal(otsikot[otsikot.length - 1], 'Muut (1)');
});

/*
 * LIUSKAN YLÄRYHMÄ KERTOO, MIKÄ AVAUTUU (Fablen tarkistus 20.9.2026).
 * Brysselin liuskassa Nähtävyydet-rivi avasi tyhjän otsikkopalkin, koska
 * kaupungilla ei ole kohdekarttaa, ja Turistiopas ei reagoinut, kun
 * matkailijalle-osiota ei vielä ollut. Rivit ovat liuskassa vain, jos
 * niiden takana on sisältöä; lauta antaa tiedon kaupunkinosto.js:n
 * datasta (lauta.js liuskanSisalto → nostot.js liuskanRivit).
 */
<<<<<<< HEAD
test('Alpit: opas on, kohdekarttaa ei → liuskassa vain kaupunki ja Turistiopas', () => {
  // Alpeilla on lehti ja opas mutta ei kohdekarttaa (Bryssel ja Ljubljana
  // saivat sen 20.9.2026, jolloin niiden liuskassa on kaikki kolme
  // yläryhmän riviä).
  assert.equal(kaupungillaKohdekartta('alpit'), false);
  assert.ok(turistiOppaanArtikkeli('alpit'), 'Alppien oppaan artikkeli puuttuu');
=======
test('Ljubljana: opas on, kohdekarttaa ei → liuskassa vain kaupunki ja Turistiopas', () => {
  // Ljubljanalla on lehti ja opas mutta ei vielä kohdekarttaa (Bryssel sai
  // sen 20.9.2026, jolloin sen liuskassa on kaikki kolme yläryhmän riviä).
  assert.equal(kaupungillaKohdekartta('ljubljana'), false);
  assert.ok(turistiOppaanArtikkeli('ljubljana'), 'Ljubljanan oppaan artikkeli puuttuu');
  const rivit = liuskanRivit({
    kaupunki: { nimi: 'Ljubljana', lat: 46.06, lng: 14.51 },
    nostot: [],
    nahtavyyksia: kaupungillaKohdekartta('ljubljana'),
    opas: Boolean(turistiOppaanArtikkeli('ljubljana')),
  });
  assert.deepEqual(rivit.map((r) => r.laji), ['lehti', 'opas']);
});

test('Bryssel: kohdekartta ja opas → kaikki kolme yläryhmän riviä', () => {
  assert.equal(kaupungillaKohdekartta('bryssel'), true);
  assert.ok(turistiOppaanArtikkeli('bryssel'));
>>>>>>> origin/main
  const rivit = liuskanRivit({
    kaupunki: { nimi: 'Alpit', lat: 46.6, lng: 8.0 },
    nostot: [],
    nahtavyyksia: kaupungillaKohdekartta('alpit'),
    opas: Boolean(turistiOppaanArtikkeli('alpit')),
  });
  assert.deepEqual(rivit.map((r) => r.laji), ['lehti', 'nahtavyydet', 'opas']);
});

test('Bryssel ja Ljubljana: kohdekartta ja opas → kaikki kolme yläryhmän riviä', () => {
  for (const [id, nimi, lat, lng] of [['bryssel', 'Bryssel', 50.85, 4.35], ['ljubljana', 'Ljubljana', 46.06, 14.51]]) {
    assert.equal(kaupungillaKohdekartta(id), true, id);
    assert.ok(turistiOppaanArtikkeli(id), id);
    const rivit = liuskanRivit({
      kaupunki: { nimi, lat, lng },
      nostot: [],
      nahtavyyksia: kaupungillaKohdekartta(id),
      opas: Boolean(turistiOppaanArtikkeli(id)),
    });
    assert.deepEqual(rivit.map((r) => r.laji), ['lehti', 'nahtavyydet', 'opas'], id);
  }
});

test('Pariisi: kohdekartta ja opas → kaikki kolme yläryhmän riviä', () => {
  assert.equal(kaupungillaKohdekartta('pariisi'), true);
  assert.ok(turistiOppaanArtikkeli('pariisi'));
});

test('lauta antaa liuskalle sisältötiedon, ja nostokerros välittää sen', () => {
  const lauta = readFileSync(new URL('../js/pallolauta/lauta.js', import.meta.url), 'utf8');
  const nostot = readFileSync(new URL('../js/pallolauta/nostot.js', import.meta.url), 'utf8');
  assert.match(lauta, /liuskanSisalto:\s*\(id\)\s*=>/);
  assert.match(lauta, /kaupungillaKohdekartta\(id\)/);
  // Kaksi kutsupaikkaa: rivit ja kamera-ajon tilantarve.
  assert.equal((nostot.match(/liuskanSisalto\?\.\(/g) ?? []).length, 2);
});
