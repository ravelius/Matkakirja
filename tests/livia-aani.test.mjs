/*
 * PULUN ÄÄNI — repliikit, tiedostonimet, kaiku ja manifesti.
 *
 * Omistajan tilaus 6.9.2026: Livian valmiiksi kirjoitetut repliikit
 * generoidaan puheeksi (tools/generoi-pulu.mjs) ja peli soittaa ne
 * kuplan ilmestyessä (js/liviapuhe.js). Saapumisrepliikeille on
 * generoitu kaikuversio, mutta PELI EI SOITA SITÄ: omistaja 6.9.2026
 * ilta *"ota kaiku pois pulun tekstin alusta"*.
 *
 * Nämä testit vartioivat sitä KYTKENTÄÄ, joka ei näy mistään
 * virheilmoituksesta: jos pelin ja työkalun tiedostonimet eriytyvät,
 * ajo maksaa tiedostosta, jota peli ei koskaan hae — eikä mikään
 * kaadu, koska puuttuva äänite on hiljainen.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  LIVIAN_AVAUS, LIVIAN_LEHTIVINKKI, MANNERIVIHJE, livianPaljastus,
} from '../js/livia.js';
import {
  LIVIAN_AANIJUURI, LIVIAN_AANILAHTEET, LIVIAN_AANITETTY_PALJASTUS, LIVIAN_AANITETYT,
  LIVIAN_KAIKU, LIVIAN_KAUPUNKILAHTEET, LIVIAN_PERUSTASO, LIVIAN_SAAPUMISREPLIIKIT,
  LIVIAN_VALIHUOMION_VAIMENNUS, livianAaniAjanTasalla,
  livianAaniNimi,
  livianAaniOsoite, livianAanitykset, livianKaupunkiAanitetty, LIVIAN_KAUPUNKIAANET_KAYTOSSA,
  livianAanenKesto, livianKaupunkiIndeksi, livianKaupunkiKentat, livianKaupunkiKuplia,
  livianKentanKuplat, livianKenttaPinoutuu, livianKorostetutKaupungit, livianKuplanAika,
  livianKuplanAjastin, livianKuplat, livianSaapumisrepliikki, LIVIAN_VARATTU,
  livianSoitettava, livianTiiviste, LIVIAN_KOROSTUS_KAYTOSSA, LIVIAN_PUHEEN_HANTA_MS,
  LIVIAN_LINSSILAHTEET,
} from '../js/liviapuhe.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { FOKUSVIRTA_ATEENA } from '../js/packs/fokusvirta-ateena.js';
import { FOKUSVIRTA_ISTANBUL } from '../js/packs/fokusvirta-istanbul.js';
import { FOKUSVIRTA_PIETARI } from '../js/packs/fokusvirta-pietari.js';
import { FOKUSVIRTA_VENETSIA } from '../js/packs/fokusvirta-venetsia.js';
import { FOKUSVIRTA_SOFIA } from '../js/packs/fokusvirta-sofia.js';
import { FOKUSVIRTA_VILNA } from '../js/packs/fokusvirta-vilna.js';
import {
  TAGIT, aanitteenTila, ampariKansio, ilmanTageja, kaupunginRepliikit, kokoaManifesti,
  pinoutuvatRepliikit, puhemuoto, repliikit, tauluksi, valitseRepliikit,
} from '../tools/generoi-pulu.mjs';

/** Ne lähteet, joiden tekstit tulevat js/livia.js:stä. */
const LIVIA_LAHTEET = ['avaus', 'paljastus', 'mannerivihje', 'lehtivinkki'];
/**
 * Kaupunkirepliikkejä yhteensä KUPLINA: rivi voi olla nimi tai
 * [nimi, kuplien määrä], ja kaupunkeja on Ateenan lisäksi kahdeksantoista
 * (uuden kulun erät 1 ja 2, omistaja 7.9.2026).
 *
 * VARATTU PAIKKA EI OLE KUPLA (8.9.2026): poistetun alustuksen numero
 * pysyy taulussa, jottei numerointi liiku, mutta sillä ei ole tekstiä
 * eikä äänitettä.
 */
const KAUPUNKIREPLIIKKEJA = Object.keys(LIVIAN_KAUPUNKILAHTEET)
  .flatMap((id) => livianKaupunkiKentat(id))
  .filter(({ kentta }) => kentta !== LIVIAN_VARATTU)
  .reduce((summa, { kuplat }) => summa + kuplat, 0);
/**
 * Linssien välihuomiot (Ihmisen matkan kertomus, 7.9.2026): yksi
 * äänite jokaista kaanonin `pulu`-kenttää kohti.
 */
const LINSSIREPLIIKKEJA = Object.values(LIVIAN_LINSSILAHTEET)
  .reduce((summa, jaksot) => summa + jaksot.length, 0);

const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');

/* ---------- repliikit ja tiedostonimet ---------- */

test('jokaisella repliikillä on oma tiedostonimi', () => {
  const rivit = repliikit();
  // Viisi avausta, KOLME paljastusta (uusi rytmi 7.9.2026), yksi
  // mannerivihje, yksi lehtivinkki + kaupungit.
  assert.equal(rivit.length,
    LIVIAN_AVAUS.length + 3 + 1 + 1 + KAUPUNKIREPLIIKKEJA + LINSSIREPLIIKKEJA);
  const lahteet = LIVIAN_AANILAHTEET.join('|');
  for (const rivi of rivit) {
    assert.match(rivi.nimi, new RegExp(`^livia-(${lahteet})-\\d+\\.mp3$`),
      `${rivi.avain}: tiedostonimi ei ole muotoa livia-<lähde>-<indeksi>.mp3`);
    assert.ok(rivi.teksti.length > 0, `${rivi.avain}: teksti puuttuu`);
    assert.equal(rivi.merkit, rivi.teksti.length);
  }
  const nimet = rivit.map((rivi) => rivi.nimi);
  assert.equal(new Set(nimet).size, nimet.length, 'tiedostonimet eivät ole yksikäsitteisiä');
});

test('nimi johdetaan lähteestä ja indeksistä samalla funktiolla', () => {
  assert.equal(livianAaniNimi('avaus', 0), 'livia-avaus-1.mp3');
  assert.equal(livianAaniNimi('paljastus', 1), 'livia-paljastus-2.mp3');
  // Kaikunimi on yhä olemassa työkalua ja ämpärin tiedostoja varten,
  // vaikka peli ei sitä enää valitse (LIVIAN_KAIKU).
  assert.equal(livianAaniNimi('avaus', 0, { kaiku: true }), 'livia-avaus-1-kaiku.mp3');
  // Tuntematon lähde tai kelvoton indeksi ei saa keksiä nimeä.
  assert.equal(livianAaniNimi('kupla', 0), null);
  assert.equal(livianAaniNimi('avaus', -1), null);
  assert.equal(livianAaniNimi('avaus', 1.5), null);
  assert.equal(livianAaniNimi('lehtivinkki', 0), 'livia-lehtivinkki-1.mp3');
  assert.deepEqual(LIVIAN_AANILAHTEET.slice(0, 6),
    ['avaus', 'paljastus', 'mannerivihje', 'lehtivinkki', 'ateena', 'sofia']);
  // KOKO EUROOPPA ON NYT TAULUSSA (Fablen erä 8.9.2026 ilta): aiempien
  // 25 lähteen lisäksi lännen kaksikymmentä kaupunkia, joiden vanha
  // maadoitus korvattiin yhdellä kommenttikuplalla — yhteensä 45
  // kaupunkia. Lisäksi neljä js/livia.js:n lähdettä ja linssien
  // välihuomiot (Ihmisen matkan kertomus, 7.9.2026).
  assert.equal(LIVIAN_AANILAHTEET.length,
    4 + 45 + Object.keys(LIVIAN_LINSSILAHTEET).length);
  assert.equal(LIVIAN_AANILAHTEET.at(-1), 'ihmisen-matka');
  assert.equal(livianAaniNimi('ihmisen-matka', 0), 'livia-ihmisen-matka-1.mp3');
});

/* ---------- kaupunkikohtaiset lähteet (Ateena ja Sofia ensin) ---------- */

test('kaupunkirepliikki nimetään kaupungista, kentästä ja kuplan numerosta', () => {
  /*
   * ATEENA ON SAMASSA KULUSSA KUIN MUUT (omistaja 8.9.2026 klo 19.10):
   * maadoitus korvattiin yhdellä kommenttikuplalla, ja kaksi ensimmäistä
   * numeroa ovat varattuja — vanha ateena-1 oli maadoituksen äänite eikä
   * uusi kupla saa periä sitä. Sofiassa on huudahdus ja kuusi
   * sähkevaihetta, joista neljä on kirjoitettu kahdeksi kuplaksi.
   */
  assert.deepEqual(LIVIAN_KAUPUNKILAHTEET.ateena,
    [LIVIAN_VARATTU, LIVIAN_VARATTU, 'kommentti']);
  assert.deepEqual(livianKaupunkiKentat('sofia').map((k) => [k.kentta, k.kuplat, k.alku]), [
    [LIVIAN_VARATTU, 1, 0], [LIVIAN_VARATTU, 1, 1], ['kommentti', 1, 2], [LIVIAN_VARATTU, 1, 3],
    ['johdanto', 2, 4], ['vinkki', 2, 6], ['linkkiSaate', 1, 8], ['oikein', 2, 9],
    ['odotus', 1, 11], ['paluu', 2, 12],
  ]);
  assert.equal(livianKaupunkiIndeksi('ateena', 'kommentti'), 2);
  assert.equal(livianKaupunkiIndeksi('ateena', 'maadoitus'), null);
  assert.equal(livianKaupunkiIndeksi('sofia', 'paluu'), 12);
  assert.equal(livianKaupunkiIndeksi('sofia', 'paluu', 1), 13);
  // Kuplaa, jota ei ole, ei nimetä: sarjan ylivuoto on hiljaisuus.
  assert.equal(livianKaupunkiIndeksi('sofia', 'paluu', 2), null);
  assert.equal(livianKaupunkiIndeksi('sofia', 'odotus', 1), null);
  assert.equal(livianKaupunkiIndeksi('sofia', 'paluu', -1), null);
  assert.equal(livianAaniNimi('ateena', 2), 'livia-ateena-3.mp3');
  assert.equal(livianAaniNimi('sofia', 13), 'livia-sofia-14.mp3');
  /*
   * UUSI KULKU: huudahdus ja kommentti tässä järjestyksessä (Raamattu,
   * KAUPUNGIN KULKU) — sama kaava jokaisessa uuden kulun kaupungissa,
   * joten numerointi on luettavissa ilman taulua.
   *
   * ENSIMMÄINEN PAIKKA ON VARATTU (8.9.2026): siinä oli alustus, ja
   * numeron on pysyttävä varattuna, jottei huudahdus ala hakea
   * poistetun alustuksen tiedostoa (livia-<kaupunki>-1.mp3).
   */
  /*
   * HUUDAHDUS POISTUI PUOLESTA KAUPUNGEISTA (8.9.2026): myös sen paikka
   * on varattu, jotta kommenttien numerot (3…) eivät siirry.
   */
  assert.deepEqual(livianKaupunkiKentat('istanbul').map((k) => [k.kentta, k.kuplat, k.alku]),
    [[LIVIAN_VARATTU, 1, 0], [LIVIAN_VARATTU, 1, 1], ['kommentti', 1, 2]]);
  // Riian huudahdus poistui 8.9.2026 illalla: paikka jäi varatuksi kuten
  // Prahassa. Välihuuto on yhä esimerkiksi Pietarissa.
  assert.deepEqual(livianKaupunkiKentat('riika').map((k) => [k.kentta, k.kuplat, k.alku]),
    [[LIVIAN_VARATTU, 1, 0], [LIVIAN_VARATTU, 1, 1], ['kommentti', 1, 2]]);
  // Huudahdukset poistettiin kokonaan 9.9.2026 (omistajan tekstipaketti):
  // paikka jää varatuksi, jotta kommenttien numerot eivät siirry.
  assert.deepEqual(livianKaupunkiKentat('pietari').map((k) => [k.kentta, k.kuplat, k.alku]),
    [[LIVIAN_VARATTU, 1, 0], [LIVIAN_VARATTU, 1, 1], ['kommentti', 1, 2]]);
  assert.equal(livianKaupunkiIndeksi('pietari', 'huudahdus'), null);
  assert.equal(livianKaupunkiIndeksi('riika', 'huudahdus'), null);
  assert.equal(livianKaupunkiIndeksi('istanbul', 'huudahdus'), null);
  assert.equal(livianKaupunkiIndeksi('istanbul', 'alustus'), null);
  // Yksi kupla per kaupunki (omistaja 8.9.2026): toista kuplaa ei nimetä.
  assert.equal(livianKaupunkiIndeksi('riika', 'kommentti', 1), null);
  assert.equal(livianKaupunkiIndeksi('riika', 'kommentti'), 2);
  assert.equal(livianKaupunkiKuplia('vilna', 'kommentti'), 1);
  assert.equal(livianKaupunkiKuplia('vilna', 'paluu'), 0);
  // Äänittämätön kaupunki tai kenttä on hiljainen, ei arvattu nimi.
  assert.equal(livianKaupunkiIndeksi('venetsia', 'maadoitus'), null);
  // VENETSIAN KUUSI KUPLAA TIIVISTYI YHTEEN (omistajan tekstipaketti
  // 9.9.2026): sama kaava kuin muissa kaupungeissa.
  assert.deepEqual(livianKaupunkiKentat('venetsia').map((k) => [k.kentta, k.kuplat, k.alku]),
    [[LIVIAN_VARATTU, 1, 0], [LIVIAN_VARATTU, 1, 1], ['kommentti', 1, 2]]);
  assert.equal(livianKaupunkiIndeksi('venetsia', 'kommentti'), 2);
  assert.equal(livianKaupunkiIndeksi('venetsia', 'kommentti', 1), null);
  assert.equal(livianAaniNimi('venetsia', 2), 'livia-venetsia-3.mp3');
  // Kevyt pakki: yksi kupla, kaksi varattua paikkaa sen edessä.
  assert.deepEqual(livianKaupunkiKentat('kreeta').map((k) => [k.kentta, k.kuplat, k.alku]),
    [[LIVIAN_VARATTU, 1, 0], [LIVIAN_VARATTU, 1, 1], ['kommentti', 1, 2]]);
  assert.equal(livianAaniNimi('tromssa', 2), 'livia-tromssa-3.mp3');
  assert.equal(livianKaupunkiIndeksi('ateena', 'paluu'), null);
  assert.equal(livianKaupunkiAanitetty('sofia', 'vinkki'), LIVIAN_KAUPUNKIAANET_KAYTOSSA);
  assert.equal(livianKaupunkiAanitetty('sofia', ''), false);
  // Taulun ulkopuolinen lähde on hiljainen, ei arvattu nimi.
  assert.equal(livianAaniNimi('tuntematon-kaupunki', 0), null);
});

/*
 * KENTTÄ VOI OLLA MERKKIJONO TAI KUPLIEN TAULUKKO (omistaja 7.9.2026).
 * Sama normalisointi on pelissä ja työkalussa, joten yksi funktio
 * vartioidaan tässä — eriytyminen tarkoittaisi väärää tiedostonumeroa.
 */
test('kentän kuplat normalisoidaan samalla funktiolla', () => {
  assert.deepEqual(livianKuplat('Yksi kupla.'), ['Yksi kupla.']);
  assert.deepEqual(livianKuplat(['Eka.', '  Toka.  ', '', null]), ['Eka.', 'Toka.']);
  assert.deepEqual(livianKuplat(null), []);
  // pollo-lohko voittaa: kulun kentät ovat siellä, loput sähkeessä.
  assert.deepEqual(livianKentanKuplat(FOKUSVIRTA_SOFIA, 'kommentti'),
    FOKUSVIRTA_SOFIA.pollo.kommentti);
  assert.deepEqual(livianKentanKuplat(FOKUSVIRTA_SOFIA, 'odotus'),
    [FOKUSVIRTA_SOFIA.sahketehtava.odotus]);
  assert.deepEqual(livianKentanKuplat(FOKUSVIRTA_ATEENA, 'kommentti'),
    FOKUSVIRTA_ATEENA.pollo.kommentti);
  // Huudahduskenttää ei enää ole (9.9.2026): sen kuplia ei ole.
  assert.deepEqual(livianKentanKuplat(FOKUSVIRTA_SOFIA, 'huudahdus'), []);
  // Taulun lupaama kuplamäärä vastaa pakkauksen tekstiä joka kentässä —
  // varattua paikkaa lukuun ottamatta, jolla ei ole kenttää lainkaan.
  for (const id of Object.keys(LIVIAN_KAUPUNKILAHTEET)) {
    const pakkaus = FOKUSVIRRAT[id];
    for (const { kentta, kuplat } of livianKaupunkiKentat(id)) {
      if (kentta === LIVIAN_VARATTU) {
        assert.deepEqual(livianKentanKuplat(pakkaus, kentta), [],
          `${id}: varatulla paikalla ei saa olla tekstiä`);
        continue;
      }
      assert.equal(livianKentanKuplat(pakkaus, kentta).length, kuplat,
        `${id}.${kentta}: kuplien määrä ja LIVIAN_KAUPUNKILAHTEET eri mieltä`);
    }
  }
});

/*
 * KIRJOITETTU KUPLA EI PILKKOUDU (omistaja 7.9.2026): huudahdus ja
 * kommentti ovat kuplia sellaisenaan. Vanha kenttä (sähkeen odotus) on
 * yhä pitkä merkkijono, jonka peli pilkkoo ruudulla — ja juuri se ero
 * ratkaisee kuivan ajon mitan. Ateenan maadoitus oli viimeinen
 * pinoutuva kaupunkirepliikki, ja se korvattiin kuplalla 8.9.2026.
 */
test('kirjoitettu kuplakenttä ei pinoudu, pitkä merkkijono pinoutuu', () => {
  assert.equal(livianKenttaPinoutuu('huudahdus', 1), false);
  assert.equal(livianKenttaPinoutuu('kommentti', 1), false);
  assert.equal(livianKenttaPinoutuu('maadoitus', 1), true);
  assert.equal(livianKenttaPinoutuu('odotus', 1), true);
  assert.equal(livianKenttaPinoutuu('paluu', 2), false);
  // Yksikään kaupunkirepliikki ei enää pinoudu: kaikki ovat
  // kirjoitettuja kuplia tai sähketehtävän yksittäisiä merkkijonoja.
  assert.equal(pinoutuvatRepliikit().has('ateena-1'), false);
  assert.equal(pinoutuvatRepliikit().has('ateena-3'), false);
  // Varattu paikka (sofia-1) ei ole kupla lainkaan.
  assert.equal(pinoutuvatRepliikit().has('sofia-1'), false);
  assert.equal(pinoutuvatRepliikit().has('sofia-2'), false);
});

test('kaupunkirepliikkien tekstit luetaan pakkauksista, ei kopioida', () => {
  const sofia = FOKUSVIRTA_SOFIA.sahketehtava;
  assert.deepEqual(kaupunginRepliikit('ateena'),
    ['', '', ...FOKUSVIRTA_ATEENA.pollo.kommentti]);
  // Varattu paikka on tyhjä rivi: se pitää numeron eikä saa äänitettä.
  assert.deepEqual(kaupunginRepliikit('sofia'), [
    '', '',
    ...FOKUSVIRTA_SOFIA.pollo.kommentti, '', ...sofia.johdanto, ...sofia.vinkki,
    sofia.linkkiSaate, ...sofia.oikein, sofia.odotus, ...sofia.paluu,
  ]);
  // Vilnan huudahdus poistui 8.9.2026: paikka on tyhjä rivi.
  assert.deepEqual(kaupunginRepliikit('vilna'), [
    '', '',
    ...FOKUSVIRTA_VILNA.pollo.kommentti,
  ]);
  // Venetsian yksi kupla (omistajan tekstipaketti 9.9.2026) kahden varatun jälkeen.
  assert.deepEqual(kaupunginRepliikit('venetsia'),
    ['', '', ...FOKUSVIRTA_VENETSIA.pollo.kommentti]);
  const rivit = repliikit();
  const avaimet = rivit.filter((rivi) => LIVIAN_KAUPUNKILAHTEET[rivi.lahde])
    .map((rivi) => rivi.avain);
  assert.equal(avaimet.length, KAUPUNKIREPLIIKKEJA);
  // ateena-1, ateena-2, sofia-1 ja sofia-4 puuttuvat: varattuja paikkoja
  // ilman tekstiä (8.9.2026 Ateenan maadoitus korvattiin kommenttikuplalla,
  // Sofian kommentti tiivistyi yhteen kuplaan).
  assert.deepEqual(avaimet.slice(0, 4), ['ateena-3', 'sofia-3', 'sofia-5', 'sofia-6']);
  // Lännen kaksikymmentä kaupunkia ovat taulun lopussa (Fablen erä
  // 8.9.2026 ilta), yksi kupla kussakin — Venetsiassa kuusi. Kuittaus
  // isoisälle (numero 4) poistui v6:ssa: pululla on yksi kupla.
  assert.deepEqual(avaimet.slice(-4), ['tukholma-3', 'oslo-3', 'bergen-3', 'kobenhavn-3']);
  // Teksti on pakkauksen teksti merkilleen — kaanonia ei muotoilla.
  assert.equal(rivit.find((rivi) => rivi.avain === 'sofia-14').teksti, sofia.paluu[1].trim());
  assert.equal(rivit.find((rivi) => rivi.avain === 'istanbul-1'), undefined);
  // Istanbulin huudahdus poistui 8.9.2026: myös sen paikka on varattu.
  assert.equal(rivit.find((rivi) => rivi.avain === 'istanbul-2'), undefined);
  // Riian huudahdus poistui 8.9.2026 illalla: myös sen paikka on varattu.
  assert.equal(rivit.find((rivi) => rivi.avain === 'riika-2'), undefined);
  // Pietarin huudahdus poistui 9.9.2026: myös sen paikka on varattu.
  assert.equal(rivit.find((rivi) => rivi.avain === 'pietari-2'), undefined);
});

test('kaupunkirepliikki mahtuu kuplaansa', () => {
  /*
   * Kirjoitettu kupla on oma äänitteensä (7.9.2026): sen on mahduttava
   * yhden kuplan lukuaikaan. Kenttä, joka on yhä yksi merkkijono
   * (Ateenan maadoitus), pinoutuu ruudulla, ja sen mitta on osien
   * lukuaikojen summa (tools/generoi-pulu.mjs nakyvaAika).
   */
  const pinoutuvat = pinoutuvatRepliikit();
  for (const rivi of repliikit()) {
    if (!LIVIAN_KAUPUNKILAHTEET[rivi.lahde]) continue;
    assert.equal(rivi.pinoutuu, pinoutuvat.has(rivi.avain));
    assert.ok(rivi.kuplaSekunteina >= rivi.arvioSekunteina,
      `${rivi.avain}: puhe (${rivi.arvioSekunteina} s) ei mahdu kuplan `
      + `näkyvään aikaan (${rivi.kuplaSekunteina} s)`);
    // Omistajan raja 8.9.2026 ilta: enintään 125 merkkiä kuplaa kohti
    // (Raamattu, PULUN KUPLASSA PULUN NAKOKULMA, RAJA 125).
    if (!rivi.pinoutuu) {
      assert.ok(rivi.merkit <= 125, `${rivi.avain}: kupla on ${rivi.merkit} merkkiä`);
    }
  }
});

test('äänen osoite osoittaa ämpärin pulukansioon', () => {
  assert.equal(LIVIAN_AANIJUURI.endsWith('aanet/pulu/'), true);
  assert.equal(ampariKansio(), 'aanet/pulu');
  assert.equal(livianAaniOsoite('mannerivihje', 0),
    `${LIVIAN_AANIJUURI}livia-mannerivihje-1.mp3`);
  assert.equal(livianAaniOsoite('kupla', 0), null);
});

/* ---------- kaiku (poistettu pelistä 6.9.2026 ilta) ---------- */

test('työkalu tuntee saapumisrepliikit, mutta peli soittaa aina kuivan', () => {
  const rivit = repliikit();
  const kaiulliset = rivit.filter((rivi) => rivi.kaikuNimi).map((rivi) => rivi.avain);
  // Livia saapuu kahdesti: avauksessa hän lennähtää mukaan ja
  // paljastuksessa hän tulee sähkeen kanssa.
  // Kaupunkirepliikeistä vain Sofian paluu: se on ainoa, jossa Livia
  // oikeasti palaa lennolta ja aloittaa puheensa jo ilmasta.
  // Työkalu generoi näille kaikuversion; peli ei sitä hae.
  assert.deepEqual(kaiulliset, ['avaus-1', 'paljastus-1', 'sofia-13']);
  /*
   * KAIKU POIS PULUN ALUSTA (omistaja 6.9.2026 ilta: "ota kaiku pois
   * pulun tekstin alusta"). Tämä on se väite, joka pitää päätöksen
   * voimassa: yksikään repliikki ei soi kaikuversiona, ei edes
   * saapumisrepliikki.
   */
  assert.equal(LIVIAN_KAIKU, false);
  for (const rivi of rivit) {
    assert.equal(rivi.saapuu, Boolean(rivi.kaikuNimi),
      `${rivi.avain}: saapuu-lippu ja kaikuversio ovat eri mieltä`);
    assert.equal(livianSoitettava(rivi.lahde, rivi.indeksi), rivi.nimi,
      `${rivi.avain}: peli soittaa muuta kuin kuivan version`);
    assert.doesNotMatch(livianSoitettava(rivi.lahde, rivi.indeksi), /-kaiku\.mp3$/);
  }
  assert.equal(livianSaapumisrepliikki('avaus', 1), false);
  assert.equal(livianSaapumisrepliikki('mannerivihje', 0), false);
  assert.equal(livianSaapumisrepliikki('sofia', 0), false);
  assert.equal(livianSaapumisrepliikki('ateena', 0), false);
  // Paluun ENSIMMÄINEN kupla (sofia-13) on se, jossa Livia tulee ilmasta.
  assert.deepEqual(LIVIAN_SAAPUMISREPLIIKIT, { avaus: [0], paljastus: [0], sofia: [12] });
  // Osoite seuraa samaa valintaa: kuiva tiedosto ämpärissä.
  assert.equal(livianAaniOsoite('avaus', 0), `${LIVIAN_AANIJUURI}livia-avaus-1.mp3`);
  assert.equal(livianAaniOsoite('sofia', 12), `${LIVIAN_AANIJUURI}livia-sofia-13.mp3`);
});

/* ---------- vanhentunut äänite on hiljainen ---------- */

/*
 * MIKSI TÄMÄ TESTI ON: tiedostonimi ei kerro tekstiä, joten muuttunut
 * repliikki soisi ämpärin vanhalla äänitteellä ja sanoisi eri asian
 * kuin kupla. Mikään ei kaadu — siksi portti tarvitsee vartijan.
 */
test('tiiviste erottaa tekstit ja vaientaa vanhentuneen äänitteen', () => {
  assert.equal(livianTiiviste('Etsi lehdestä aarrekysymys.'),
    livianTiiviste('  Etsi lehdestä aarrekysymys.  '), 'reunavälit eivät saa muuttaa tiivistettä');
  assert.notEqual(livianTiiviste('Etsi lehdestä aarrekysymys.'),
    livianTiiviste('Etsi lehdestä aarrekysymys'));
  assert.match(livianTiiviste('mikä tahansa'), /^[0-9a-f]{8}$/);
  /*
   * ILMAN TEKSTIÄ: js/livia.js:n lähteet soivat, kaupungit vaikenevat.
   * Kaupunkirepliikin teksti asuu pakkauksessa ja muuttuu siellä ilman
   * että tiedostonimi muuttuu, joten ilman tekstiä ei voi tietää, sanooko
   * ämpärin äänite saman kuin kupla (js/liviapuhe.js 7.9.2026).
   */
  assert.equal(livianAaniAjanTasalla('sofia', 0), false);
  assert.equal(livianAaniAjanTasalla('avaus', 0), true);
  // Ajan tasalla oleva repliikki soi, muuttunut ei.
  assert.equal(livianAaniAjanTasalla('avaus', 0, LIVIAN_AVAUS[0]), true);
  assert.equal(livianAaniAjanTasalla('avaus', 0, `${LIVIAN_AVAUS[0]} Kaak.`), false);
  // Lehtivinkki generoitiin 7.9.2026: ajan tasalla. Tuntematon avain vaikenee.
  assert.equal(livianAaniAjanTasalla('lehtivinkki', 0, LIVIAN_LEHTIVINKKI), true);
  assert.equal(livianAaniAjanTasalla('lehtivinkki', 7, LIVIAN_LEHTIVINKKI), false);
});

test('kuiva ajo tunnistaa uudet ja muuttuneet repliikit', () => {
  const rivit = repliikit();
  const tila = (avain) => rivit.find((rivi) => rivi.avain === avain).tila;
  // 7.9.2026: paljastus kirjoitettiin uusiksi ja lehtivinkki on uusi;
  // molemmat generoitiin samana päivänä, joten kaikki on ajan tasalla.
  assert.equal(tila('avaus-1'), 'ajan tasalla');
  assert.equal(tila('paljastus-1'), 'ajan tasalla');
  assert.equal(tila('paljastus-3'), 'ajan tasalla');
  assert.equal(tila('lehtivinkki-1'), 'ajan tasalla');
  /*
   * KAIKKI 45 EUROOPAN KAUPUNKIKUPLAT GENEROITIIN 9.9.2026 omistajan
   * teksteistä (generoi-pulu.yml ajo 12, pakota), ja LIVIAN_AANITETYT
   * päivitettiin samasta kuivan ajon taulusta — joten jokainen vartioitu
   * repliikki on ajan tasalla. Taulun ja pakkien eriytyminen näkyisi
   * tässä heti muuttuneena tilana.
   */
  for (const avain of ['ateena-3', 'kreeta-3', 'sofia-3', 'pietari-3', 'riika-3', 'istanbul-3']) {
    assert.equal(tila(avain), 'ajan tasalla', avain);
  }
  assert.ok(rivit.every((rivi) => rivi.tila === 'ajan tasalla'),
    `vanhentuneita: ${rivit.filter((r) => r.tila !== 'ajan tasalla').map((r) => r.avain).join(', ')}`);
  for (const rivi of rivit) assert.equal(rivi.tila, aanitteenTila(rivi));
  // Peli vaikenee juuri niissä, jotka odottavat ajoa.
  for (const rivi of rivit) {
    assert.equal(livianAaniAjanTasalla(rivi.lahde, rivi.indeksi, rivi.teksti),
      rivi.tila === 'ajan tasalla', `${rivi.avain}: portti ja tila eri mieltä`);
  }
  // Työkalu tulostaa valmiin taulun liitettäväksi.
  const taulu = tauluksi(rivit);
  assert.match(taulu, /export const LIVIAN_AANITETYT = \{/);
  assert.match(taulu, /'lehtivinkki-1': '[0-9a-f]{8}',/);
  assert.match(taulu, /'sofia-14': '[0-9a-f]{8}',/);
  // Taulussa on rivi jokaiselle vartioidulle repliikille — myös
  // vanhentuneille, koska ämpärissä on yhä niiden vanha äänite.
  for (const avain of Object.keys(LIVIAN_AANITETYT)) {
    assert.ok(rivit.some((rivi) => rivi.avain === avain),
      `LIVIAN_AANITETYT: ${avain} ei ole yhdenkään repliikin avain`);
  }
});

/* ---------- tagit ---------- */

/*
 * V2-MALLILLA PUHE ON PUHDASTA TEKSTIÄ (omistaja 6.9.2026: "v2 versio
 * on parempi tälle äänelle, eli ei tule ollenkaan ohjausmerkkejä").
 * Tagit ovat yhä taulussa v3-kokeilua varten, mutta mallille lähtevä
 * teksti on täsmälleen kaanoni — hakasulku puheessa luettaisiin ääneen.
 */
test('v2-mallille lähtee kaanonin teksti ilman tageja; tagitaulu säilyy v3:lle', () => {
  for (const rivi of repliikit()) {
    assert.equal(rivi.puhe, rivi.teksti, `${rivi.avain}: puhemuodossa on ohjausmerkkejä`);
    assert.ok(!/\[[^\]]+\]/.test(rivi.puhe), `${rivi.avain}: hakasulkutagi puheessa`);
    /*
     * TAGITAULUA VAADITAAN VAIN js/livia.js:n LÄHTEILTÄ. Kaupunkien
     * repliikit (ateena, sofia) syntyivät v2-mallin aikaan, jolloin
     * mallille ei lähetetä tageja lainkaan — taulua ei siis ole eikä
     * sitä tarvita. Kolmelle vanhalle lähteelle tagitus on yhä
     * kaanonia kunnioittava, jos v3 otetaan takaisin.
     */
    if (LIVIA_LAHTEET.includes(rivi.lahde)) {
      assert.ok(TAGIT[rivi.avain], `${rivi.avain}: elävöitystagit puuttuvat taulusta`);
    }
    // Tagitettu muoto on kaanonia + hakasulkuja: poisto palauttaa
    // alkuperäisen. Ankkurit tarkistetaan myös kaupunkilähteiltä, jotta
    // v3:een palaaminen ei kaadu vasta maksullisessa ajossa.
    if (!TAGIT[rivi.avain]) continue;
    const tagitettu = puhemuoto(rivi.teksti, TAGIT[rivi.avain]);
    assert.notEqual(tagitettu, rivi.teksti);
    assert.equal(ilmanTageja(tagitettu), rivi.teksti,
      `${rivi.avain}: tagien poisto ei palauta kaanonista tekstiä`);
    // Kaiku on pois pulun alusta: alkutagi ei saa olla kaikutagi.
    assert.doesNotMatch(TAGIT[rivi.avain].alku ?? '', /echo|reverb|kaiku/i);
  }
  // Tagitaulu ei saa paisua tuntemattomille avaimille.
  const avaimet = new Set(repliikit().map((rivi) => rivi.avain));
  for (const avain of Object.keys(TAGIT)) {
    assert.ok(avaimet.has(avain), `TAGIT: ${avain} ei ole yhdenkään repliikin avain`);
  }
});

test('puuttuva tagiankkuri kaataa ennen maksullista kutsua', () => {
  assert.throws(
    () => puhemuoto('Hei, odotas kaveri.', { kohdat: [['tätä sanaa ei ole', '[amused]']] }),
    /ankkuri/,
  );
});

/* ---------- manifesti ---------- */

test('manifestin muoto on täysi ja kestot tulevat ajosta', () => {
  const rivit = repliikit();
  const kestot = new Map([['avaus-1', { kesto: 3.4, kaikuKesto: 3.6 }]]);
  const manifesti = kokoaManifesti(rivit, kestot);
  assert.equal(manifesti.versio, 1);
  assert.equal(manifesti.kansio, 'aanet/pulu');
  assert.match(manifesti.paivitetty, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(manifesti.repliikit.length, rivit.length);
  for (const rivi of manifesti.repliikit) {
    for (const kentta of ['avain', 'lahde', 'teksti', 'tiedosto']) {
      assert.ok(rivi[kentta], `manifestin rivistä ${rivi.avain} puuttuu ${kentta}`);
    }
    assert.equal(typeof rivi.merkit, 'number');
    assert.match(rivi.tiiviste, /^[0-9a-f]{8}$/);
    assert.equal(typeof rivi.saapuu, 'boolean');
    assert.equal(rivi.saapuu, Boolean(rivi.kaiku));
  }
  // Kaupunkirepliikit ovat manifestissa mukana omilla tiedostoillaan.
  assert.ok(manifesti.repliikit.some((rivi) => rivi.tiedosto === 'livia-ateena-3.mp3'));
  assert.equal(manifesti.repliikit.find((rivi) => rivi.avain === 'sofia-13').kaiku,
    'livia-sofia-13-kaiku.mp3');
  const eka = manifesti.repliikit[0];
  assert.equal(eka.avain, 'avaus-1');
  assert.equal(eka.kesto, 3.4);
  assert.equal(eka.kaikuKesto, 3.6);
  // Repliikki, jota tässä ajossa ei generoitu, on manifestissa
  // kestoltaan tyhjä eikä puutu kokonaan.
  assert.equal(manifesti.repliikit.at(-1).kesto, null);
});

test('repliikkivalinta tunnistaa tuntemattoman avaimen', () => {
  const kaikki = repliikit();
  const { tyot, tuntemattomat } = valitseRepliikit(kaikki, ['avaus-2', 'pulu-9']);
  assert.deepEqual(tyot.map((rivi) => rivi.avain), ['avaus-2']);
  assert.deepEqual(tuntemattomat, ['pulu-9']);
  assert.equal(valitseRepliikit(kaikki, []).tyot.length, kaikki.length);
});

/* ---------- kytkentä peliin ---------- */

test('paljastus äänitetään sillä variantilla, jonka peli soittaa', () => {
  const teksti = livianPaljastus(LIVIAN_AANITETTY_PALJASTUS);
  const rivit = repliikit().filter((rivi) => rivi.lahde === 'paljastus');
  assert.deepEqual(rivit.map((rivi) => rivi.teksti), teksti);
  assert.equal(rivit.length, 3, 'uusi rytmi on kolme kuplaa');
  // Aloitusreitti on kaanonissa Ateena (LIVIAN_AVAUS: "Ateenasta se
  // alkaa"), joten äänitetty variantti on Ateenaan/Ateenaa.
  assert.equal(LIVIAN_AANITETTY_PALJASTUS.paikkaan, 'Ateenaan');
  assert.equal(LIVIAN_AANITETTY_PALJASTUS.paikkaa, 'Ateenaa');
  const livia = lue('../js/liviapuhe.js');
  assert.match(livia, /lahde === 'paljastus'/,
    'muu maa kuin äänitetty jää hiljaiseksi (soitaLivianAani)');
});

test('js/livia.js soittaa jokaisen kuplan äänen', () => {
  const livia = lue('../js/livia.js');
  assert.match(livia,
    /import \{\n\s*livianKuplanAjastin, pysaytaLivianAani, soitaLivianAani,\n\} from '\.\/liviapuhe\.js';/);
  /*
   * ÄÄNITE KAANONIN NUMEROLLA, EI SARJAN PAIKALLA (7.9.2026). Kun
   * lähtökohteita on useita, "vasta yhden reitin" -kupla jätetään
   * näyttämättä (js/livia.js livianAvausSarja) — ilman kaanonin
   * indeksiä sen äänite soisi seuraavan kuplan kohdalla. Teksti kulkee
   * mukana, jotta vanhentunut äänite jää hiljaiseksi, ja soitin otetaan
   * talteen, jotta kupla odottaa puheen loppuun.
   */
  assert.match(livia, /const aani = soitaLivianAani\(ui, 'avaus', rivi\.indeksi, \{ teksti \}\);/);
  assert.match(livia, /export function livianAvausSarja\(kohteita = ETUSIVUN_KOHTEET\.size\)/);
  assert.match(livia,
    /\.filter\(\(\{ indeksi \}\) => kohteita <= 1 \|\| indeksi !== LIVIAN_YHDEN_REITIN_KUPLA\)/);
  assert.match(livia,
    /const aani = soitaLivianAani\(ui, 'paljastus', i, \{ \.\.\.variantti, teksti \}\);/);
  assert.match(livia, /soitaLivianAani\(ui, 'mannerivihje', 0, \{ teksti: MANNERIVIHJE \}\);/);
  // Kupla ensin, ääni sen jälkeen: äänen soitto on kuplan
  // onnistumisen jälkeisellä polulla.
  assert.ok(livia.indexOf('const nakyi = polloAvauskupla')
    < livia.indexOf("soitaLivianAani(ui, 'avaus', rivi.indeksi"));
  // KUPLA ODOTTAA PUHEEN LOPPUUN: avaussarjan ajastin lukee soittimen
  // keston eikä pelkkää tekstin pituutta.
  assert.match(livia, /avausAjastin = livianKuplanAjastin\(\n\s*lukuaika\(teksti\), aani,/);
  // Viimeinen repliikki saa puhua loppuun: itsestään päättyvä sarja ei
  // vaienna ääntä, keskeytys vaientaa.
  assert.match(livia, /lopetaAvaus\(\{ vaienna: false \}\);/);
  assert.match(livia, /function lopetaAvaus\(\{ vaienna = true \} = \{\}\) \{[\s\S]{0,300}if \(vaienna\) pysaytaLivianAani\(avauksenUi\);/);
});

test('mannerivihje ja avaus käyttävät samoja repliikkejä kuin äänitteet', () => {
  const rivit = repliikit();
  assert.deepEqual(rivit.filter((r) => r.lahde === 'avaus').map((r) => r.teksti),
    LIVIAN_AVAUS.map((t) => t.trim()));
  assert.equal(rivit.find((r) => r.lahde === 'mannerivihje').teksti, MANNERIVIHJE.trim());
});

test('js/fokusvirta.js soittaa Euroopan kaupunkien repliikit kupla kerrallaan', () => {
  const virta = lue('../js/fokusvirta.js');
  assert.match(virta,
    /livianKaupunkiAanitetty, livianKentanKuplat, livianKenttaPinoutuu, livianKuplanAika,\n\s*livianKuplanAjastin, livianKuplat, pysaytaLivianAani,\n\s*soitaLivianAani, soitaLivianKaupunkiAani,\n\} from '\.\/liviapuhe\.js';/);
  /*
   * YKSI KUPLA = YKSI ÄÄNITIEDOSTO (omistaja 7.9.2026). Kutsupaikat
   * eivät enää soita kenttää kerran, vaan antavat puheenvuorolle
   * `aani`-takaisinkutsun (js/pollo.js naytaPuheenvuoro), joka soittaa
   * jokaisen kuplan omalla numerollaan ja tekstillään.
   */
  assert.match(virta, /function livianOsatJaAani\(ui, kaupunkiId, kentta, kuplat\) \{/);
  assert.match(virta,
    /aani: \(i, teksti\) => soitaLivianKaupunkiAani\(ui, kaupunkiId, kentta,\n\s*\{ kupla: i, teksti \}\),/);
  // Jokaiselle Sofian äänitetylle kentälle on kutsu — kupla ja ääni
  // eivät saa eriytyä.
  for (const kentta of ['vinkki', 'linkkiSaate']) {
    assert.ok(virta.includes(`livianOsatJaAani(ui, city.id, '${kentta}'`),
      `js/fokusvirta.js: Sofian ${kentta} jää ilman ääntä`);
  }
  // Kuittaus on kortilla: kuplat soivat peräkkäin omalla sarjallaan.
  assert.match(virta, /soitaLivianKaupunkiSarja\(ui, city\.id, 'oikein', kuittaus\);/);
  // Paluu on kuplasarja samassa paikassa (polloKuplasarja).
  assert.match(virta, /polloKuplasarja\(ui, city, 'paluu',/);
  assert.match(virta,
    /const aani = soitaLivianKaupunkiAani\(ui, city\?\.id, kentta, \{ kupla: i, teksti \}\);/);
  // Johdanto ja odotus kulkevat sähkesaatteen kautta: kenttä välitetään
  // sinne nimenä ja saate soittaa sen.
  assert.match(virta, /sahkeSaateKuplaan\(ui, city, avain, tehtava\.johdanto \?\? '', 'johdanto'\)/);
  assert.match(virta, /'odotus'\);/, 'odotuksen kenttänimi puuttuu sähkesaatteesta');
  assert.match(virta, /const \{ osat, aani \} = livianOsatJaAani\(ui, city\.id, kentta, kuplat\);/,
    'maadoituksen ääni puuttuu saapumiskuplasta');
  assert.match(virta, /const \{ osat, aani \} = livianOsatJaAani\(ui, city\?\.id, kentta, kuplat\);/,
    'sähkesaatteen ääni puuttuu');
  /*
   * KUPLA ODOTTAA PUHEEN LOPPUUN. Äänitetty puheenvuoro etenee kuplan
   * lukuajalla (js/livia.js livianKuplanLukuaika) eikä nopeammalla
   * perusrytmillä — sama sääntö kuin avauksessa.
   */
  assert.match(virta, /function livianPuherytmi\(kaupunkiId, kentta\) \{[\s\S]{0,200}livianKuplanLukuaika/);
  /*
   * KUPLA ODOTTAA PUHEEN LOPPUUN (7.9.2026). Rytmi kysyy myös soivalta
   * äänitteeltä sen keston, ja kuplasarjat kulkevat venyvällä
   * ajastimella (js/liviapuhe.js livianKuplanAjastin).
   */
  assert.match(virta,
    /\{ viive: \(teksti, aani\) => livianKuplanAika\(livianKuplanLukuaika\(teksti\), aani\) \}/);
  assert.match(virta, /ui\.livianKorttiSarja = livianKuplanAjastin\(/);
  assert.match(virta, /ui\.polloKuplasarjaAjastin = livianKuplanAjastin\(/);
  assert.match(virta, /livianKuplanLukuaika,\n  livianLehtivinkkiOdottaa, livianPaljastusKesken, merkitseLehtivinkkiNahdyksi,\n\} from '\.\/livia\.js';/);
  // Sähkelento odottaa kuittauksen puheen loppuun ennen paluukuplaa.
  assert.match(virta, /const lento = livianKaupunkiAanitetty\(city\.id, 'oikein'\)/);
  assert.match(virta, /Math\.max\(SAHKE_LENTO_MS, livianSarjanKesto\(kuittaus\)\)/);
  // Aarre odottaa paluusarjan viimeistä kuplaa.
  assert.match(virta, /SAHKE_PALUU_MS \+ livianSarjanKesto\(kuplat\.slice\(0, -1\)\)/);
  /*
   * UUSI KULKU (Raamattu, KAUPUNGIN KULKU — kavennus 8.9.2026):
   * isoisän luenta alkaa heti, huudahdus tulee luennan aikana ja
   * kommentti sen jälkeen. Väitteet naulaavat kytkennän, jota ei näy
   * mistään virheilmoituksesta.
   */
  assert.match(virta, /export function fokusvirtaHuudahdus\(ui, city\) \{/);
  assert.match(virta, /export function fokusvirtaUusiKulku\(ui, city\) \{/);
  assert.match(virta, /ajastaHuudahdus\(ui, city, kulku\.huudahdus, merkinta\);/);
  // Alustuksen koodipolku on purettu, ei jätetty kuolleeksi haaraksi
  // (kommentti saa yhä kertoa, miksi se poistettiin).
  assert.doesNotMatch(virta, /kulku\.alustus|'alustus'|alustuksenAjastin/);
  // Välihuuto soi kertojan PÄÄLLE hiljempaa eikä kertoja väisty.
  assert.match(virta, /vaimennus: HUUDAHDUKSEN_VAIMENNUS,\n\s*vaista: false,/);
  const ui = lue('../js/ui.js');
  assert.match(ui, /if \(merkinta\.kuva && !fokusvirtaUusiKulku\(this, virtaKaupunki\)\) \{/);
  /*
   * VÄLIHUUTO AJASTETAAN VASTA LUENNAN REKISTERÖINNIN JÄLKEEN: sen
   * ajoitus lasketaan luennan kestosta, joten kutsujärjestys ratkaisee.
   */
  assert.match(ui, /fokusvirtaHuudahdus\(this, virtaKaupunki\);/);
  assert.ok(ui.indexOf('fokusvirtaHuudahdus(this, virtaKaupunki);')
    > ui.indexOf('this.asetaMerkinnanLuenta(virtaAanite ? () => {'),
  'välihuuto on ajastettava vasta luennan rekisteröinnin jälkeen');
  const pollo = lue('../js/pollo.js');
  assert.match(pollo, /naytaPuheenvuoro\(osat, \{[\s\S]{0,200}aani = null,/);
  assert.match(pollo, /tila\.viive[\s\S]{0,120}PUHEENVUORON_VIIVE_ALA/);
  // Kupla ensin, ääni sen jälkeen — myös jatko-osissa.
  assert.match(pollo, /const aaniKahva = nakyi \? \(aani\?\.\(0, palat\[0\]\) \?\? null\) : null;/);
  assert.match(pollo,
    /nyt\.aaniKahva = osaNakyi \? \(nyt\.aani\?\.\(i, nyt\.palat\[i\]\) \?\? null\) : null;/);
  // Soittimen kahva kulkee rytmille, ja odotus venyy uudella kierroksella.
  assert.match(pollo, /tila\.viive\(edellinen, tila\.aaniKahva\)/);
  assert.match(pollo, /if \(viive > kulunut && kierros < 2\)/);
});

/* ---------- kupla odottaa puheen loppuun ---------- */

/*
 * OMISTAJAN LINJAUS (Raamattu, PULU PUHUU 6.9.2026): *"kupla odottaa
 * puheen loppuun"*. Kuplan aika laskettiin tekstin pituudesta
 * (js/livia.js lukuaika), mutta Dr. Vonin ajossa 7.9.2026 kymmenen
 * repliikkiä 85:stä puhui kuplaansa pidempään — esimerkiksi 7,37 s
 * puhetta 5,38 s kuplassa — ja seuraava kupla häivytti äänitteen pois
 * kesken lauseen (js/liviapuhe.js pysaytaLivianAani).
 */
test('kuplan aika venyy äänitteen kestoon, ei koskaan lyhene', () => {
  assert.equal(LIVIAN_PUHEEN_HANTA_MS, 400);
  // Kesto millisekunteina; tuntematon kesto on null eikä nolla.
  assert.equal(livianAanenKesto({ duration: 7.37 }), 7370);
  assert.equal(livianAanenKesto({ duration: NaN }), null, 'metatiedot puuttuvat');
  assert.equal(livianAanenKesto({ duration: 0 }), null, 'purettu soitin');
  assert.equal(livianAanenKesto({ duration: Infinity }), null, 'virta ei ole äänite');
  assert.equal(livianAanenKesto(null), null);
  // Ilman äänitettä (mykistys, puuttuva tiedosto) aika on kuten ennen.
  assert.equal(livianKuplanAika(5380, null), 5380);
  assert.equal(livianKuplanAika(5380, { duration: NaN }), 5380);
  // Lyhyt äänite ei lyhennä kuplaa: lukuaika on vähimmäisaika.
  assert.equal(livianKuplanAika(7100, { duration: 2 }), 7100);
  // Pitkä äänite venyttää: 7,37 s puhetta 5,38 s kuplassa (Dr. Von).
  assert.equal(livianKuplanAika(5380, { duration: 7.37 }), 7770);
  assert.equal(livianKuplanAika(7100, { duration: 7.73 }), 8130);
  // Kahva saa tulla funktiona: se luetaan vasta laukaisuhetkellä.
  assert.equal(livianKuplanAika(3200, () => ({ duration: 7 })), 7400);
  assert.equal(livianKuplanAika(3200, () => null), 3200);
});

test('kuplan ajastin odottaa äänitteen loppuun, vaikka kesto selviää myöhässä', async () => {
  /*
   * Metatiedot tulevat vasta soiton käynnistyttyä, joten aikaa ei voi
   * laskea kerralla valmiiksi: ajastin herää kuplan lukuajan kohdalla
   * ja odottaa vasta silloin tietoon tulleen puheen loput.
   */
  const soitin = { duration: NaN };
  const alku = Date.now();
  let kahva = null;
  const kulunut = await new Promise((valmis) => {
    kahva = livianKuplanAjastin(
      80, soitin, () => valmis(Date.now() - alku), (id) => { kahva = id; },
    );
    setTimeout(() => { soitin.duration = 0.6; }, 20);
  });
  // 600 ms puhetta + 400 ms häntä = 1000 ms, ei 80 ms.
  assert.ok(kulunut >= 900, `ajastin ei venynyt puheen mittaan: ${kulunut} ms`);
  assert.ok(kulunut < 2500, `ajastin venyi liikaa: ${kulunut} ms`);
  assert.ok(kahva !== null, 'kahva jäi antamatta kutsupaikalle');
});

test('ilman äänitettä ajastin laukeaa kuplan lukuajalla', async () => {
  const alku = Date.now();
  const kulunut = await new Promise((valmis) => {
    livianKuplanAjastin(60, null, () => valmis(Date.now() - alku));
  });
  assert.ok(kulunut < 500, `hiljainen kupla odotti turhaan: ${kulunut} ms`);
});

test('peruttu ajastin ei laukea: napautus jatkaa heti', async () => {
  let laukesi = false;
  let kahva = null;
  kahva = livianKuplanAjastin(40, { duration: 9 }, () => { laukesi = true; },
    (id) => { kahva = id; });
  clearTimeout(kahva);
  await new Promise((ok) => { setTimeout(ok, 300); });
  assert.equal(laukesi, false, 'clearTimeout ei perunut kuplasarjaa');
});

test('uusi moduuli on niputus- ja esilatauslistoilla', () => {
  const build = lue('../tools/build-standalone.mjs');
  const sw = lue('../sw.js');
  assert.ok(build.includes("'js/liviapuhe.js'"), 'js/liviapuhe.js puuttuu MODULES-listalta');
  assert.ok(sw.includes("'./js/liviapuhe.js'"), 'js/liviapuhe.js puuttuu sw.js:n SHELL-listalta');
  // Riippuvuus ennen tuojaansa: liviapuhe ennen liviaa.
  assert.ok(build.indexOf("'js/liviapuhe.js'") < build.indexOf("'js/livia.js'"));
});

test('äänitykset kestävät tyhjän ja vajaan syötteen', () => {
  assert.deepEqual(livianAanitykset(), []);
  assert.deepEqual(livianAanitykset({ avaus: ['', '  '] }), []);
  const yksi = livianAanitykset({ mannerivihje: ['Kuule.'] });
  assert.equal(yksi.length, 1);
  assert.equal(yksi[0].saapuu, false);
  assert.equal(yksi[0].kaikuNimi, null);
});

/* ---------- pulun äänitaso ---------- */

/*
 * PULU SOI KERTOJAN ALAPUOLELLA (omistaja 8.9.2026, sanatarkasti:
 * *"Pulun ääni on vähän voimakkaampi kuin kertojan, sitä voisi laskea
 * koko pelissä hieman"*).
 *
 * Kertoja soi pelin puhevoimalla sellaisenaan (js/luenta.js
 * playDiaryVoice), joten yksi kerroin riittää — mutta sen on oltava
 * YKSI: kutsupaikkakohtaiset säädöt ajautuisivat eri linjoille, ja
 * väärä taso kuuluu vasta pelaajalle.
 */
test('pulun perustaso on kertojan alapuolella ja yhdessä paikassa', () => {
  assert.ok(LIVIAN_PERUSTASO > 0 && LIVIAN_PERUSTASO < 1,
    `perustason on oltava kertojan alle: ${LIVIAN_PERUSTASO}`);
  const puhe = lue('../js/liviapuhe.js');
  // Kaikki pulun äänet kulkevat saman kertoimen kautta.
  assert.match(puhe,
    /audio\.volume = Math\.max\(0, Math\.min\(1, puheVoima\(\) \* LIVIAN_PERUSTASO \* vaimennus\)\);/);
  // Vain häivytys koskee voimakkuuteen muualla (se laskee omasta
  // lähtöarvostaan), joten perustaso asetetaan tasan kerran.
  assert.equal((puhe.match(/audio\.volume = puheVoima\(\)/g) ?? []).length, 1,
    'pulun perustaso asetetaan tasan yhdessä paikassa');
  // Kertoja asettaa oman tasonsa ilman kerrointa: vertailukohta on se.
  const luenta = lue('../js/luenta.js');
  assert.match(luenta, /audio\.volume = puheVoima\(\);/);
  assert.doesNotMatch(luenta, /puheVoima\(\) \*/);
  // Vaimennukset kertovat perustasoon eivätkä korvaa sitä.
  assert.ok(LIVIAN_VALIHUOMION_VAIMENNUS < 1);
  const virta = lue('../js/fokusvirta.js');
  assert.match(virta, /const HUUDAHDUKSEN_VAIMENNUS = 0\.7;/);
});
