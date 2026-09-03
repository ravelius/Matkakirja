/*
 * SÄHKETEHTÄVÄ: KIRJOITTUVAT RIVIT JA PULLAKAUPPA.
 *
 * Raamattu, SÄHKETEHTÄVÄ LEHTIMÄISEKSI JA PULLA VINKIKSI (omistaja
 * 3.9.2026): *"tekstit saisi tulla siihen animoidusti. Rivi kerrallaan
 * … Lisäksi tässäkin tehtävässä voisi olla mahdollisuus ostaa pulla
 * pululle ja saada vinkki … 25 punnalla puolikkaan pullan, mistä
 * vastineeksi pulu suostuisi näyttämään vain suoran linkin."*
 *
 * MITÄ TÄSSÄ MITATAAN JA MIKSI JUURI TÄSSÄ:
 *
 *   1. KIRJOITUKSEN AJOITUS on puhdas funktio (sahkeKirjoitusAikataulu),
 *      joten se voidaan mitata ilman selainta. Kaksi lupausta pelaajalle
 *      ovat lukuja eivätkä makuasioita: yksikään rivi ei kestä yli
 *      katon (pitkä rivi NOPEUTUU, sitä ei pätkitä) ja viiden rivin
 *      sähke on valmis alle kahdeksassa sekunnissa. Selainsavuke
 *      (tools/savuke-sahketehtava.mjs) katsoo, että rivit todella
 *      ilmestyvät; kello on täällä.
 *   2. PULLAN KIRJANPITOAVAIN ja VASTAUSLINKIN MUOTO ovat pelitilan ja
 *      pelidatan sopimus. Väärä avain myisi saman pullan kahdesti tai
 *      sekoittaisi sähkeen pullan kaupungin aarrepullaan; väärä
 *      linkkimuoto avaisi tyhjän kortin. Kumpaakaan ei näe savukkeesta
 *      ennen kuin pelaaja on maksanut.
 *   3. KASSA JA PORTTI: pulla veloitetaan kerran, toinen ostoyritys ei
 *      veloita mitään, eikä tyhjällä kassalla myydä.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SAHKE_LOMAKE_OSOITE, SAHKE_MERKKI_MS, SAHKE_RIVI_KATTO_MS,
  SAHKE_RIVIVALI_MS, sahkeKirjoitusAikataulu,
} from '../js/fokusvirta.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { Game, PULLA_HINTA } from '../js/game.js';
import { EUROPE } from '../js/packs/europe.js';

/** Kaikki sähkepilotit yhtenä listana — kolmas pilotti tulee mukaan itsestään. */
const PILOTIT = Object.entries(FOKUSVIRRAT).filter(([, v]) => v.sahketehtava);

/* ==================== 1. KIRJOITUKSEN AJOITUS ==================== */

test('sähkeen rivit kirjoittuvat kirjoituskoneen tahtiin', () => {
  const aikataulu = sahkeKirjoitusAikataulu(['ABCD', 'EF']);
  assert.equal(aikataulu.rivit.length, 2);
  // Lyhyt rivi saa täyden merkkivälin: 4 × 28 ms.
  assert.equal(aikataulu.rivit[0].merkkivali, SAHKE_MERKKI_MS);
  assert.equal(aikataulu.rivit[0].kesto, 4 * SAHKE_MERKKI_MS);
  assert.equal(aikataulu.rivit[0].alku, 0);
  // Toinen rivi alkaa vasta rivivälin päästä.
  assert.equal(aikataulu.rivit[1].alku, 4 * SAHKE_MERKKI_MS + SAHKE_RIVIVALI_MS);
  assert.equal(aikataulu.kesto, 4 * SAHKE_MERKKI_MS + SAHKE_RIVIVALI_MS + 2 * SAHKE_MERKKI_MS);
});

test('pitkä rivi nopeutuu kattoon eikä yksikään merkki jää pois', () => {
  const pitka = 'X'.repeat(120);
  const { rivit } = sahkeKirjoitusAikataulu([pitka]);
  assert.equal(rivit[0].teksti, pitka, 'tekstiä ei saa pätkiä');
  assert.equal(rivit[0].merkit, 120);
  assert.ok(rivit[0].merkkivali < SAHKE_MERKKI_MS, 'pitkän rivin on nopeuduttava');
  assert.ok(rivit[0].kesto <= SAHKE_RIVI_KATTO_MS,
    `rivi kesti ${rivit[0].kesto} ms, katto on ${SAHKE_RIVI_KATTO_MS} ms`);
});

test('sähke jakautuu riveiksi myös kokonaisesta tekstistä', () => {
  const teksti = 'LIVIALLE STOP\nPÖLLÖ STOP';
  const { rivit } = sahkeKirjoitusAikataulu(teksti);
  assert.deepEqual(rivit.map((r) => r.teksti), ['LIVIALLE STOP', 'PÖLLÖ STOP']);
  // Tyhjä syöte ei kaadu eikä tuota rivejä.
  assert.deepEqual(sahkeKirjoitusAikataulu('').rivit, []);
  assert.equal(sahkeKirjoitusAikataulu(null).kesto, 0);
});

test('jokainen sähkepilotti kirjoittuu alle kahdeksassa sekunnissa', () => {
  assert.ok(PILOTIT.length >= 2, 'sähkepilotteja pitäisi olla vähintään kaksi');
  for (const [cityId, virta] of PILOTIT) {
    const tehtava = virta.sahketehtava;
    const aikataulu = sahkeKirjoitusAikataulu(tehtava.sahke);
    assert.ok(aikataulu.rivit.length >= 5, `${cityId}: sähkeessä on alle viisi riviä`);
    assert.ok(aikataulu.kesto < 8000,
      `${cityId}: sähke kirjoittuu ${aikataulu.kesto} ms — yli kahdeksan sekunnin lupauksen`);
    for (const rivi of aikataulu.rivit) {
      assert.ok(rivi.kesto <= SAHKE_RIVI_KATTO_MS,
        `${cityId}: rivi "${rivi.teksti.slice(0, 24)}…" kestää ${rivi.kesto} ms`);
    }
    // Paluusähke on kuittaus eikä tehtävä: senkin on oltava lyhyt.
    const paluu = sahkeKirjoitusAikataulu(tehtava.vastaussahke ?? '');
    assert.ok(paluu.kesto < 8000, `${cityId}: paluusähke venyy (${paluu.kesto} ms)`);
  }
});

/* ==================== 2. LOMAKEPOHJAN OSOITE ==================== */

test('lomakepohjan osoite on yhdessä vakiossa ja osoittaa ämpäriin', () => {
  // Osoite on JS:n vakio, ja CSS saa sen muuttujana (ks.
  // varmistaSahkeLomakekuva): kaksi kirjoitusasua ajautuisi erilleen
  // ensimmäisellä versionvaihdolla.
  assert.match(SAHKE_LOMAKE_OSOITE, /^https:\/\/pub-[a-z0-9]+\.r2\.dev\//);
  assert.match(SAHKE_LOMAKE_OSOITE, /sahke-lomake-1873-v1\.png$/);
});

/* ==================== 3. PULLA JA VASTAUSLINKKI ==================== */

test('sähkepilottien pullatekstit ja vastauslinkit ovat käyttökelpoisia', () => {
  for (const [cityId, virta] of PILOTIT) {
    const tehtava = virta.sahketehtava;
    // 50 £ ostaa Livian sanat — sama kenttä kuin kahden ohilyönnin vinkki.
    assert.ok(tehtava.vinkki?.length > 40, `${cityId}: pullavinkki puuttuu`);
    // 25 £ ostaa pelkän osoitteen, ja saate on lyhyt: puolikas palvelus.
    assert.ok(tehtava.linkkiSaate?.length > 20, `${cityId}: linkin saate puuttuu`);
    assert.ok(tehtava.linkkiSaate.length < 200, `${cityId}: linkin saate on liian pitkä`);

    const linkki = tehtava.vastauslinkki;
    assert.ok(linkki, `${cityId}: vastauslinkki puuttuu`);
    assert.ok(['kohde', 'lehtisivu'].includes(linkki.tyyppi),
      `${cityId}: tuntematon linkkityyppi "${linkki.tyyppi}"`);
    if (linkki.tyyppi === 'kohde') {
      assert.match(linkki.maa, /^[A-Z]{3}$/, `${cityId}: kohteen maa ei ole ISO3-tunnus`);
      assert.ok(linkki.kohde, `${cityId}: kohteen tunnus puuttuu`);
    } else {
      assert.ok(linkki.kaupunki, `${cityId}: lehtisivun kaupunki puuttuu`);
      assert.equal(typeof linkki.sivu, 'number', `${cityId}: lehtisivun numero puuttuu`);
      // Sivu 0 on etusivu; vastaus on aina jollakin sisäsivulla.
      assert.ok(linkki.sivu >= 1, `${cityId}: lehtisivu ${linkki.sivu} on etusivu`);
    }
  }
});

test('molempien pilottien vastauslinkit osoittavat oikeaan aineistoon', async () => {
  // Kohdelinkki: kartan kohde on oltava olemassa maansa listalla.
  const { FOKUSKOHTEET_BGR } = await import('../js/packs/fokuskohteet-bgr.js');
  const sofia = FOKUSVIRRAT.sofia.sahketehtava;
  assert.equal(sofia.vastauslinkki.tyyppi, 'kohde');
  assert.ok(FOKUSKOHTEET_BGR.some((k) => k.id === sofia.vastauslinkki.kohde),
    `Bulgarian kohdelistalta puuttuu "${sofia.vastauslinkki.kohde}"`);

  /*
   * Lehtisivulinkki: sivu 0 on etusivu ja sivu N on kategorialista
   * N−1 (js/lehti.js rakennaSivut), joten Tukholman sivulla 1 on
   * kansiosion nostot — ja niissä on oltava se juttu, jolta vastaus
   * luetaan.
   */
  const { KULTTUURI_KATEGORIAT } = await import('../js/packs/kulttuuri-kategoriat.js');
  const tukholma = FOKUSVIRRAT.tukholma.sahketehtava;
  assert.equal(tukholma.vastauslinkki.tyyppi, 'lehtisivu');
  const kategoriat = KULTTUURI_KATEGORIAT[tukholma.vastauslinkki.kaupunki] ?? [];
  const sivu = kategoriat[tukholma.vastauslinkki.sivu - 1];
  assert.ok(sivu, `Tukholman lehdessä ei ole sivua ${tukholma.vastauslinkki.sivu}`);
  const otsikot = (sivu.nostot ?? []).map((n) => n.otsikko);
  const kohde = tukholma.aukot.find((a) => a.id === 'kohde');
  assert.ok(kohde.oikeat.some((o) => otsikot.includes(o)),
    `sivulla ${tukholma.vastauslinkki.sivu} ei ole oikeaa otsikkoa: ${otsikot.join(' | ')}`);
});

/* ==================== 4. KASSA JA KIRJANPITO ==================== */

/** Yksinkertainen peli, jossa on rahaa ja lauta. */
function peli(rahaa = 300) {
  const g = new Game({ pack: EUROPE, players: [{ id: 'p1', name: 'Fogg', human: true }] });
  g.player.money = rahaa;
  return g;
}

test('sähkeen pullat kirjataan omalla avaimellaan eikä samaa myydä kahdesti', () => {
  const g = peli(300);
  const vinkki = 'sahke:sofia-varna:vinkki';
  const linkki = 'sahke:sofia-varna:linkki';

  assert.equal(g.pullaOstettu(vinkki), false);
  assert.deepEqual(g.actionPullaOstos(vinkki, 50, 'sai vinkin'), { ok: true, hinta: 50 });
  assert.equal(g.player.money, 250);
  assert.equal(g.pullaOstettu(vinkki), true);

  // Toinen yritys ei veloita mitään.
  assert.equal(g.actionPullaOstos(vinkki, 50).ok, false);
  assert.equal(g.player.money, 250);

  // Puolikas on oma ostoksensa: kokonainen pulla ei sisällä sitä.
  assert.equal(g.pullaOstettu(linkki), false);
  assert.equal(g.actionPullaOstos(linkki, PULLA_HINTA).ok, true);
  assert.equal(g.player.money, 250 - PULLA_HINTA);

  // Sähkeen pulla ei ole kaupungin aarrepulla eikä päinvastoin.
  assert.equal(g.pullaVinkkiOstettu('sofia'), false);
});

test('tyhjällä kassalla pullaa ei myydä', () => {
  const g = peli(10);
  assert.equal(g.actionPullaOstos('sahke:tukholma-vasa:vinkki', 50).ok, false);
  assert.equal(g.player.money, 10);
  assert.equal(g.pullaOstettu('sahke:tukholma-vasa:vinkki'), false);
});

test('ostettu pulla säilyy tallennuksen yli', () => {
  const g = peli(300);
  g.actionPullaOstos('sahke:tukholma-vasa:linkki', PULLA_HINTA);
  const palautettu = Game.fromJSON(JSON.parse(JSON.stringify(g.toJSON())));
  assert.equal(palautettu.pullaOstettu('sahke:tukholma-vasa:linkki'), true,
    'ostettu pulla ei saa kadota tallennuksen yli');
});
