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
  KOVAN_ESTEEN_PAINO, VIUHKAN_RIVI_PX, alasMahtuvatRivit, kohdanLaatikko, viuhkanAsemat,
} from '../js/pallolauta/aihemerkit.js';
import { laudaltaAsteiksi } from '../js/fokusmitat.js';
import { PALLO_LAUTA } from '../js/pallo.js';
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';

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
  assert.equal(onKaupunginSisainen(nosto('Louvre', 48.8606, 2.3376, 'taide'), PARIISI), true);
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
    nosto('Louvre', 48.8606, 2.3376, 'taide', { ladontaNro: 2 }),
    nosto('Mona Lisan varkaus', 48.8608, 2.3378, 'taide', { ladontaNro: 1 }),
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
    nosto('Louvre', 48.8606, 2.3376, 'taide'),
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
    nosto('Louvre', 48.8606, 2.3376, 'taide'),
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

test('alasMahtuvatRivit kertoo ikkunan koon merkin alapuolella', () => {
  const ylhaalla = alasMahtuvatRivit({ p: { x: 195, y: 100 }, ruutu: PUHELIN });
  const alhaalla = alasMahtuvatRivit({ p: { x: 195, y: 700 }, ruutu: PUHELIN });
  assert.ok(ylhaalla > alhaalla);
  assert.ok(alhaalla >= 1 && alhaalla <= 5, `alhaalla ${alhaalla}`);
  // Ruudun alalaidassa ei ole tilaa yhdellekään riville.
  assert.equal(alasMahtuvatRivit({ p: { x: 195, y: 840 }, ruutu: PUHELIN }), 0);
  // Ikkuna päättyy ruudun alalaitaan: viimeinen rivi mahtuu vielä.
  const y = 400;
  const viimeinen = y + VIUHKAN_RIVI_PX + 6
    + (alasMahtuvatRivit({ p: { x: 195, y }, ruutu: PUHELIN }) - 1) * 30;
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
