/*
 * MONILÄHTEINEN ÄÄNIHAKU — lisenssirajaus, pisteytys ja se, ettei
 * repoon päädy ääntä.
 *
 * Omistajan päätös 11.9.2026, sanatarkasti: *"Lisää ilmaisia lähteitä
 * rinnalle."* Freesoundin rinnalle tulivat Wikimedia Commons ja
 * Kenneyn CC0-paketit. Kolme asiaa muuttui riskiksi samalla hetkellä,
 * ja nämä testit vartioivat tasan niitä:
 *
 *  1. LISENSSIRAJAUS. Freesoundilla rajaus tehdään palvelimen puolella
 *     filter-parametrilla, eikä kelvotonta osumaa tule edes vastaan.
 *     Commons ja Kenney eivät osaa rajata palvelimella — Commonsissa
 *     on paljon CC BY-SA -aineistoa. Jos rajaus ei pidä täällä, peliin
 *     päätyy ääni, jota siinä ei saa käyttää, eikä sitä huomaa
 *     kuuntelemalla.
 *  2. MONILÄHTEINEN PISTEYTYS. Freesoundin latausmäärät ovat
 *     kymmeniätuhansia, Commonsin käyttöluvut yksittäisiä. Ilman
 *     lähdekohtaista asteikkoa Freesound voittaisi jokaisen vertailun
 *     pelkällä mittakaavallaan ja koko monilähteisyys olisi teatteria.
 *  3. ÄÄNITIEDOSTOT EIVÄT TULE REPOON. Media kuuluu ämpäriin
 *     (Raamattu: "kaikki aina ämpäriin"). Uusi lähde tarkoittaa uusia
 *     tiedostopäätteitä (.ogg, .wav) ja uuden latausreitin — molemmat
 *     ovat tapoja vahingossa ohittaa vanha vartija.
 *
 * Testi ei tuo tools/hae-freesound.mjs:ää (se lukee ympäristöä ja ajaa
 * pääohjelmansa), vaan puhtaan moduulin tools/aanilahteet.mjs sekä
 * hakutyökalun ja työnkulun lähdetekstin.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  AANILAHTEET, AVAIMETTOMAT_LAHTEET, commonsinKysely, ehdokkaanPaate, jarjestaEhdokkaat,
  KAIKKI_LAHTEET, kelpaakoLisenssi, KENNEY_PAKETIT, lueZipHakemisto, normalisoiCommons,
  normalisoiFreesound, normalisoiKenney, oggKesto, onkoAantamisnayte, osuvuus, pisteytaEhdokas,
  puraZipMerkinta,
  OSUVUUS_LATTIA, suodataEhdokkaat, tehosteenLahteet, tunnistaLisenssi, valitseParasEhdokas,
  wavKesto,
  WIKI_TUNNISTE,
} from '../tools/aanilahteet.mjs';
import { manifestirivi } from '../tools/tehostelista.mjs';

const lue = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const HAKU = lue('../tools/hae-freesound.mjs');
const TYONKULKU = lue('../.github/workflows/aanihaku.yml');
const JUURI = fileURLToPath(new URL('..', import.meta.url));

/** Tehoste, jolla testit mittaavat: lyhyt isku ja kolme hakulausetta. */
const TEHOSTE = {
  tunnus: 'koe',
  kuvaus: 'Sarjakuvamainen vieteri-doing',
  hakusanat: ['cartoon boing spring', 'comedy boing bounce'],
  kestoMin: 0.5,
  kestoMax: 2.5,
};

/** Yhteismuotoinen ehdokas testiä varten. */
const ehdokas = (yli = {}) => ({
  lahde: 'freesound',
  id: '1',
  nimi: 'Cartoon boing',
  tekija: 'joku',
  lisenssi: 'CC0',
  lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  attribuutio: false,
  sivu: 'https://freesound.org/s/1/',
  kesto: 1.5,
  latausUrl: 'https://freesound.org/data/previews/1/1-hq.mp3',
  sanat: 'Cartoon boing',
  arvio: 4,
  arvioita: 10,
  suosio: 500,
  ...yli,
});

/* ── 1. LISENSSIRAJAUS ──────────────────────────────────────────── */

test('kaupalliseen käyttöön kelpaavat vain CC0, public domain ja CC BY', () => {
  for (const kelpaa of [
    'https://creativecommons.org/publicdomain/zero/1.0/',
    'http://creativecommons.org/publicdomain/zero/1.0/',
    'CC0',
    'cc0 1.0',
    'Creative Commons 0',
    'https://creativecommons.org/publicdomain/mark/1.0/',
    'Public domain',
    'https://creativecommons.org/licenses/by/4.0',
    'http://creativecommons.org/licenses/by/3.0/',
    'CC BY 4.0',
    'Attribution',
  ]) {
    assert.ok(kelpaakoLisenssi(kelpaa), `${kelpaa} pitäisi kelvata`);
  }
});

test('kelvoton lisenssi ei pääse läpi missään muodossa', () => {
  /*
   * Nämä kaikki ovat oikeita Freesoundin ja Commonsin lisenssejä.
   * CC BY-SA on mukana tarkoituksella: se sallisi kaupallisen käytön
   * mutta tarttuu johdannaiseen, ja tämä putki leikkaa ja normalisoi
   * äänen eli tekee siitä johdannaisen.
   */
  for (const ei of [
    'https://creativecommons.org/licenses/by-sa/4.0/',
    'CC BY-SA 3.0',
    'https://creativecommons.org/licenses/by-nc/4.0/',
    'Attribution Noncommercial',
    'https://creativecommons.org/licenses/by-nc-sa/3.0/',
    'https://creativecommons.org/licenses/by-nd/4.0/',
    'http://creativecommons.org/licenses/sampling+/1.0/',
    'Sampling+',
    'jokin tuntematon lisenssi',
    '',
    null,
    undefined,
  ]) {
    assert.ok(!kelpaakoLisenssi(ei), `${ei} EI saa kelvata`);
  }
  // Tuntematon on oletuksena kelvoton eikä kelvollinen: lähde voi
  // lisätä uuden lisenssin milloin tahansa.
  assert.deepEqual(tunnistaLisenssi('CC BY-SA 4.0'),
    { nimi: 'CC BY-SA 4.0', kaupallinen: false, attribuutio: true });
  assert.equal(tunnistaLisenssi('CC0').attribuutio, false);
  assert.equal(tunnistaLisenssi('CC BY 4.0').attribuutio, true);
});

test('suodatus pudottaa kelvottoman lisenssin ennen pisteytystä', () => {
  const sa = ehdokas({
    id: 'sa', lahde: 'commons', lisenssi: 'CC BY-SA 4.0', suosio: 9999,
    lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  });
  const nc = ehdokas({
    id: 'nc', lisenssi: 'Attribution Noncommercial', lisenssiUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
  });
  const cc0 = ehdokas({ id: 'ok' });
  assert.deepEqual(suodataEhdokkaat([sa, nc, cc0], TEHOSTE).map((e) => e.id), ['ok']);
  // Paraskaan pisteytys ei pelasta kelvotonta: se ei ole listalla.
  assert.equal(valitseParasEhdokas([sa, nc], TEHOSTE), null);
  assert.equal(valitseParasEhdokas([sa, nc, cc0], TEHOSTE).ehdokas.id, 'ok');
});

test('suodatus karsii latausosoitteettoman, kestorajojen ulkopuolisen ja poistagin', () => {
  assert.equal(suodataEhdokkaat([ehdokas({ latausUrl: null })], TEHOSTE).length, 0);
  assert.equal(suodataEhdokkaat([ehdokas({ kesto: 40 })], TEHOSTE).length, 0);
  assert.equal(suodataEhdokkaat([ehdokas({ kesto: 0.1 })], TEHOSTE).length, 0);
  // Tuntematon kesto päästetään läpi: Kenneyn paketissa se luetaan
  // tiedostosta, ja karsinta tekisi koko lähteestä tyhjän.
  assert.equal(suodataEhdokkaat([ehdokas({ kesto: null })], TEHOSTE).length, 1);
  // poisTagit on äänimaisemien vartija: musiikki ja puhe pois.
  const maisema = { ...TEHOSTE, poisTagit: ['music', 'speech'] };
  assert.equal(suodataEhdokkaat([ehdokas({ sanat: 'Boing with music bed' })], maisema).length, 0);
  assert.equal(suodataEhdokkaat([ehdokas()], maisema).length, 1);
});

/* ── 2. MONILÄHTEINEN PISTEYTYS ─────────────────────────────────── */

test('suosio mitataan lähteen omalla asteikolla eikä yhteisellä', () => {
  /*
   * Commonsissa 20 käyttöä on paljon, Freesoundissa 20 latausta ei
   * mitään. Sama luku ei siis saa tuottaa samoja pisteitä.
   */
  const fs20 = pisteytaEhdokas(ehdokas({ suosio: 20 }), TEHOSTE).osat.suosio;
  const cm20 = pisteytaEhdokas(ehdokas({ lahde: 'commons', suosio: 20 }), TEHOSTE).osat.suosio;
  assert.ok(cm20 > fs20, `Commonsin 20 käyttöä (${cm20}) pitää painaa enemmän kuin Freesoundin 20 latausta (${fs20})`);
  assert.equal(cm20, 2, 'lähteen asteikon täyttyessä suosio on täydet kaksi pistettä');
  // Kenneyllä ei ole suosiolukua lainkaan → neutraali piste, ei nolla.
  assert.equal(pisteytaEhdokas(ehdokas({ lahde: 'kenney', suosio: null }), TEHOSTE).osat.suosio, 1);
  assert.equal(AANILAHTEET.kenney.suosioAsteikko, null);
});

test('osuvuus mittaa nimen ja hakusanan suhteen, ei suosiota', () => {
  const osuva = ehdokas({ sanat: 'Cartoon boing spring' });
  const ohi = ehdokas({ sanat: 'Cute Computer Squeak' });
  assert.equal(osuvuus(osuva, TEHOSTE), 1);
  assert.equal(osuvuus(ohi, TEHOSTE), 0);
  // camelCase aukeaa sanoiksi, ja lyhyempi hakusana osuu taivutettuun.
  assert.ok(osuvuus(ehdokas({ sanat: 'doorOpen_2.ogg' }), {
    hakusanat: ['door opening wooden'],
  }) > 0);
  // Paketin aiheet EIVÄT laske mukaan: muuten rpg-audion JOKAINEN
  // tiedosto olisi yhtä osuva oveen kuin doorOpen_2.
  const paketti = KENNEY_PAKETIT.find((p) => p.tunnus === 'rpg-audio');
  const ovi = normalisoiKenney({ nimi: 'Audio/doorOpen_2.ogg', kesto: 1.4 }, paketti);
  const pata = normalisoiKenney({ nimi: 'Audio/metalPot1.ogg', kesto: 1.4 }, paketti);
  const oviTehoste = { ...TEHOSTE, hakusanat: ['wooden door opening', 'door open creak'] };
  assert.ok(osuvuus(ovi, oviTehoste) > osuvuus(pata, oviTehoste));
  assert.equal(osuvuus(pata, oviTehoste), 0, 'paketin aihe ei saa tehdä padasta ovea');
});

test('osuvuuden lattia karsii kohinan, mutta ei tyhjennä listaa', () => {
  /*
   * "doorClose_1" osui hakuun "dove wings flapping close" sanalla
   * "close" — yksi sana neljästä, eli sattuma. Lattia on mukautuva:
   * kohina karsitaan vain, jos jäljelle jää kunnollinen osuma.
   */
  const siivet = { ...TEHOSTE, hakusanat: ['dove wings flapping close'] };
  const kohina = ehdokas({ id: 'kohina', sanat: 'doorClose_1.ogg', suosio: 50000 });
  const oikea = ehdokas({ id: 'oikea', sanat: 'dove wings flapping', suosio: 5 });
  assert.deepEqual(jarjestaEhdokkaat([kohina, oikea], siivet).map((x) => x.ehdokas.id), ['oikea']);
  // Yksin jäädessään kohina kelpaa kuunneltavaksi: tyhjä tulos on
  // huonompi kuin heikko ehdokas, jonka ihminen voi hylätä.
  assert.deepEqual(jarjestaEhdokkaat([kohina], siivet).map((x) => x.ehdokas.id), ['kohina']);
  assert.equal(OSUVUUS_LATTIA, 1 / 3);
});

test('paras voittaa yli lähderajan: osuva Commons-ääni ohittaa ohilaukauksen Freesoundista', () => {
  /*
   * Tämä on koko muutoksen syy. 11.9.2026 riemuääneksi valikoitui
   * "Upset Bird Chirp": paljon latauksia, hyvä arvosana, oikea kesto —
   * ja ei mitään tekemistä haetun asian kanssa.
   */
  const ohilaukaus = ehdokas({
    id: 'ohi', nimi: 'Upset Bird Chirp', sanat: 'Upset Bird Chirp', suosio: 50000, arvio: 5, arvioita: 40,
  });
  const osuva = ehdokas({
    id: 'osuva',
    lahde: 'commons',
    nimi: 'Cartoon boing spring.ogg',
    sanat: 'Cartoon boing spring.ogg',
    lisenssi: 'CC0',
    suosio: 4,
    arvio: 0,
    arvioita: 0,
    latausUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Boing.ogg',
  });
  const jarjestys = jarjestaEhdokkaat([ohilaukaus, osuva], TEHOSTE);
  assert.equal(jarjestys[0].ehdokas.id, 'osuva',
    `osuva ääni hävisi: ${JSON.stringify(jarjestys.map((x) => [x.ehdokas.id, x.pisteet, x.osat]))}`);
  // Ohilaukaus putoaa kokonaan: sen nimessä ei ole yhtäkään
  // hakusanan sanaa, ja osuvuuden lattia karsii sen, koska osuva
  // vaihtoehto on olemassa.
  assert.equal(jarjestys.length, 1);
});

test('Freesoundin sisäinen järjestys säilyy ennallaan', () => {
  // Arvosana ja lataukset ratkaisevat yhä, kun osuvuus on sama.
  const heikko = ehdokas({ id: 'heikko', arvio: 2, arvioita: 20, suosio: 10 });
  const vahva = ehdokas({ id: 'vahva', arvio: 4.8, arvioita: 40, suosio: 9000 });
  assert.equal(valitseParasEhdokas([heikko, vahva], TEHOSTE).ehdokas.id, 'vahva');
  // Alle kolme arviota on kohinaa → neutraali 3/5 eikä nolla.
  const arvioimaton = ehdokas({ id: 'uusi', arvio: 0, arvioita: 1 });
  assert.ok(pisteytaEhdokas(arvioimaton, TEHOSTE).osat.arvio
    > pisteytaEhdokas(heikko, TEHOSTE).osat.arvio);
});

test('lähdevalinta: lista voi rajata, avaimettomuus pudottaa Freesoundin', () => {
  assert.deepEqual(tehosteenLahteet({}), KAIKKI_LAHTEET);
  assert.deepEqual(tehosteenLahteet({ lahteet: ['commons'] }), ['commons']);
  assert.deepEqual(tehosteenLahteet({}, { lista: { lahteet: ['freesound', 'commons'] } }),
    ['freesound', 'commons']);
  assert.deepEqual(tehosteenLahteet({}, { sallitut: AVAIMETTOMAT_LAHTEET }), ['commons', 'kenney']);
  // Tehosteen oma rajaus voittaa listan.
  assert.deepEqual(tehosteenLahteet({ lahteet: ['kenney'] }, { lista: { lahteet: ['commons'] } }),
    ['kenney']);
});

/* ── 3. NORMALISOINTI JA MANIFESTI ──────────────────────────────── */

test('Commonsin vastaus kääntyy yhteiseen muotoon lisenssi osoitteesta', () => {
  const e = normalisoiCommons({
    pageid: 42,
    title: 'File:Nl-boing.ogg',
    globalusage: [{}, {}, {}],
    videoinfo: [{
      duration: 1.45,
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Nl-boing.ogg?utm_source=commons',
      descriptionurl: 'https://commons.wikimedia.org/wiki/File:Nl-boing.ogg',
      user: 'Marcel',
      extmetadata: {
        LicenseUrl: { value: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en' },
        LicenseShortName: { value: 'CC0' },
        Artist: { value: '<a href="x">Marcel coenders</a>' },
      },
    }],
  });
  assert.equal(e.lahde, 'commons');
  assert.equal(e.lisenssi, 'CC0');
  assert.equal(e.tekija, 'Marcel coenders', 'html pois tekijän nimestä');
  assert.equal(e.suosio, 3);
  assert.equal(e.nimi, 'Nl-boing.ogg');
  // Seurantahäntä pois latausosoitteesta.
  assert.ok(!e.latausUrl.includes('utm_source'));
  assert.equal(ehdokkaanPaate(e), 'ogg');
});

test('Commonsin kysely on OR-muotoinen ja rajattu ääniin', () => {
  /*
   * CirrusSearch vaatii oletuksena kaikkien sanojen esiintyvän, ja
   * Commonsin tiedostonimet ovat lyhyitä: AND-muodossa "ocean waves
   * shore surf ambience" löytää nolla tiedostoa. Väljyys on
   * turvallista, koska karsinta tehdään meillä (lisenssi, kesto,
   * poissuljetut sanat, osuvuus).
   */
  assert.equal(commonsinKysely('ocean waves ambience'),
    'filetype:audio ocean OR waves OR ambience');
  assert.equal(commonsinKysely('boing'), 'filetype:audio boing');
  assert.equal(commonsinKysely('  '), '');
});

test('Commonsin ääntämisnäytteet jäävät pois', () => {
  /*
   * Commonsin suurin ansa: Wikisanakirjan ja Lingua Libren
   * ääntämisnäytteet osuvat hakusanaan TÄYDELLISESTI, koska nimessä
   * lukee tasan haettu sana. Kuivassa ajossa 11.9.2026 hollantilainen
   * ääntämässä sanan "boing" voitti sarjakuvavieterin.
   */
  for (const nayte of [
    'File:Nl-boing.ogg',
    'File:En-uk-air.ogg',
    'File:En-us-boing.ogg',
    'LL-Q1860 (eng)-Flame, not lame-flutter in the dovecote.wav',
    'File:Dutch pronunciation of boing.ogg',
  ]) {
    assert.ok(onkoAantamisnayte(nayte), `${nayte} on ääntämisnäyte`);
  }
  for (const oikea of [
    'File:Ocean Waves on a Tropical Beach.ogg',
    'File:Wood pigeon call 128.ogg',
    'File:Sea waves.wav',
    'File:Oceanwavescrushing.ogg',
  ]) {
    assert.ok(!onkoAantamisnayte(oikea), `${oikea} on oikea äänitys`);
  }
});

test('manifestirivi kirjaa lähteen, lisenssin ja CC BY:n attribuution', () => {
  const tehoste = { tunnus: 'kujerrus', kuvaus: 'Livian kujerrus' };
  const by = manifestirivi(tehoste, {
    pisteet: 4.2,
    ehdokas: {
      lahde: 'commons',
      id: '99',
      nimi: 'Pigeon.ogg',
      tekija: 'Kuvaaja',
      lisenssi: 'CC BY 4.0',
      sivu: 'https://commons.wikimedia.org/wiki/File:Pigeon.ogg',
    },
  }, { kesto: 1.234 });
  assert.equal(by.lahde, 'commons');
  assert.equal(by.lahdeId, '99');
  assert.equal(by.attribuutio, '"Pigeon.ogg" — Kuvaaja, Wikimedia Commons (CC BY 4.0)');
  assert.equal(by.kesto, 1.23);
  assert.equal(by.freesoundId, undefined, 'muu lähde ei saa teeskennellä Freesoundia');

  // Freesoundin rivi on kirjaimelleen entinen — vanhat manifestit
  // ämpärissä kantavat freesoundId-kenttää.
  const fs = manifestirivi(tehoste, {
    pisteet: 4.2,
    osuma: {
      id: 43,
      name: 'Wings',
      username: 'joku',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      url: 'https://freesound.org/s/43/',
      previews: { 'preview-hq-mp3': 'x' },
    },
  }, { kesto: 1 });
  assert.equal(fs.freesoundId, 43);
  assert.equal(fs.attribuutio, '"Wings" — joku, Freesound (CC BY 4.0)');
  assert.equal(normalisoiFreesound({ license: 'https://creativecommons.org/publicdomain/zero/1.0/' }).lisenssi, 'CC0');
});

/* ── 4. KENNEYN PAKETIT: ZIP JA KESTO ILMAN RIIPPUVUUKSIA ───────── */

test('zip-hakemisto ja purku toimivat ilman ulkoisia paketteja', () => {
  // Pieni zip tehdään paikan päällä: testi ei saa ladata verkosta.
  const kansio = execFileSync('mktemp', ['-d']).toString().trim();
  execFileSync('bash', ['-c', `printf 'hei maailma hei maailma hei maailma' > ${kansio}/a.txt && cd ${kansio} && zip -q koe.zip a.txt`]);
  const zip = readFileSync(`${kansio}/koe.zip`);
  const merkinnat = lueZipHakemisto(zip);
  assert.equal(merkinnat.length, 1);
  assert.equal(merkinnat[0].nimi, 'a.txt');
  assert.equal(puraZipMerkinta(zip, merkinnat[0]).toString(), 'hei maailma hei maailma hei maailma');
});

test('wav-kesto luetaan otsakkeesta ilman ffprobea', () => {
  // 44,1 kHz, mono, 16 bit → 88 200 tavua sekunnissa; 44 100 tavua = 0,5 s.
  const data = Buffer.alloc(44100);
  const otsake = Buffer.alloc(44);
  otsake.write('RIFF', 0);
  otsake.writeUInt32LE(36 + data.length, 4);
  otsake.write('WAVE', 8);
  otsake.write('fmt ', 12);
  otsake.writeUInt32LE(16, 16);
  otsake.writeUInt16LE(1, 20);
  otsake.writeUInt16LE(1, 22);
  otsake.writeUInt32LE(44100, 24);
  otsake.writeUInt32LE(88200, 28);
  otsake.writeUInt16LE(2, 32);
  otsake.writeUInt16LE(16, 34);
  otsake.write('data', 36);
  otsake.writeUInt32LE(data.length, 40);
  assert.equal(wavKesto(Buffer.concat([otsake, data])), 0.5);
  assert.equal(wavKesto(Buffer.from('ei wav lainkaan')), null);
  assert.equal(oggKesto(Buffer.from('ei ogg lainkaan')), null);
});

test('Kenneyn paketit ovat kenney.nl:ssä ja kantavat CC0:aa', () => {
  assert.ok(KENNEY_PAKETIT.length >= 6);
  for (const paketti of KENNEY_PAKETIT) {
    assert.match(paketti.sivu, /^https:\/\/kenney\.nl\/assets\/[a-z0-9-]+$/);
    assert.ok(paketti.aiheet.length >= 4, `${paketti.tunnus}: aiheet kertovat paketin sisällön`);
  }
  const e = normalisoiKenney({ nimi: 'Audio/doorOpen_2.ogg', kesto: 1.4 }, KENNEY_PAKETIT[0]);
  assert.equal(e.lisenssi, 'CC0');
  assert.equal(e.attribuutio, false, 'CC0 ei vaadi nimeämistä');
  assert.ok(kelpaakoLisenssi(e.lisenssiUrl));
  assert.equal(ehdokkaanPaate(e), 'ogg');
});

/* ── 5. MITÄÄN EI JÄÄ REPOON, EIKÄ KIELLETTYJÄ LÄHTEITÄ LISÄTÄ ──── */

test('repoon ei ole päätynyt yhtään äänitiedostoa', () => {
  const seuratut = execFileSync('git', ['-C', JUURI, 'ls-files'], { encoding: 'utf8' })
    .split('\n')
    .filter((p) => /\.(mp3|ogg|oga|wav|flac|m4a|opus)$/i.test(p));
  assert.deepEqual(seuratut, [], 'media kuuluu ämpäriin, ei repoon');
  // media/ on .gitignoressa: sinne kirjoitetaan ja sieltä viedään.
  const ajo = execFileSync('git', ['-C', JUURI, 'check-ignore', 'media/tehosteet-pulu/x.ogg'],
    { encoding: 'utf8' });
  assert.match(ajo, /media\/tehosteet-pulu/);
  // Ja työkalu tarkistaa sen itse ennen kuin kirjoittaa mitään.
  assert.match(HAKU, /vaadiGitignore\(kohdekansio\)/);
  assert.match(HAKU, /vaadiGitignore\(raakakansio\)/);
  assert.match(TYONKULKU, /Varmista ettei repoon jäänyt mitään/);
});

test('vain ehdot läpäisseet lähteet ovat rekisterissä', () => {
  /*
   * Pixabay ja Mixkit selvitettiin 11.9.2026 ja molemmat jäivät pois:
   * Pixabaylla ei ole äänirajapintaa ja sen ehdot kieltävät
   * ohjelmallisen keruun, ja Mixkitin ehdot kieltävät sekä
   * koneellisen latauksen että sen jakelun, mitä tämä putki tekee.
   * Tämä testi on muistilappu seuraavalle sessiolle: jos nimi
   * ilmestyy rekisteriin, ehdot on tarkistettava uudestaan.
   */
  assert.deepEqual(KAIKKI_LAHTEET, ['freesound', 'commons', 'kenney']);
  for (const kielletty of ['pixabay', 'mixkit', 'zapsplat', 'soundbible']) {
    assert.equal(AANILAHTEET[kielletty], undefined,
      `${kielletty} ei läpäissyt ehtoja — ks. tools/aanilahteet.mjs otsikkokommentti`);
  }
  // Perustelut asuvat koodissa, eivät vain raportissa.
  const moduuli = lue('../tools/aanilahteet.mjs');
  assert.match(moduuli, /PIXABAY/);
  assert.match(moduuli, /MIXKIT/);
  assert.match(moduuli, /pixabay\.com\/service\/terms/);
  assert.match(moduuli, /mixkit\.co\/terms/);
});

test('työnkulku ajaa kaikki lähteet eikä vaadi uusia salaisuuksia', () => {
  assert.match(TYONKULKU, /lahteet:/);
  assert.match(TYONKULKU, /--lahteet \$\{\{ inputs\.lahteet \}\}/);
  assert.match(TYONKULKU, /UUSIA SALAISUUKSIA EI TARVITA/);
  // Uudet lähteet eivät saa tuoda uusia secrets-viittauksia: avaimeton
  // lähde, joka lukisi salaisuutta, olisi merkki väärästä oletuksesta.
  const salaisuudet = [...TYONKULKU.matchAll(/secrets\.([A-Z0-9_]+)/g)].map((m) => m[1]);
  for (const nimi of new Set(salaisuudet)) {
    assert.match(nimi, /^(FREESOUND|R2_)/, `tuntematon salaisuus ${nimi} työnkulussa`);
  }
  // Commons vaatii tunnistautuvan User-Agentin (Wikimedian käytäntö).
  assert.match(WIKI_TUNNISTE, /^Matkakirja-aanihaku\/[\d.]+ \(https:\/\/github\.com\/[^)]+\)$/);
});

test('ehdokastila hakee kaikista sallituista lähteistä', () => {
  /*
   * Tämä on tilan tärkein ominaisuus: ehdokkaat ovat kuunneltavaksi,
   * ja ihminen valitsee. Yhden palvelun osuus valikoimasta ei riitä.
   */
  assert.match(HAKU, /const ehdokasTehoste = \{/);
  assert.match(HAKU, /haeEhdokkaat\(ehdokasTehoste, \{\s*\n?\s*lahteet: SALLITUT/);
  assert.match(HAKU, /lahde: ehdokas\.lahde/);
  // Avaimen puuttuminen ei saa enää kaataa ajoa.
  assert.ok(!/Freesoundin avainta ei löytynyt ympäristöstä\.\n[\s\S]{0,400}process\.exit\(1\)/.test(HAKU),
    'avaimeton ajo ei saa poistua virheellä — Commons ja Kenney toimivat ilman avainta');
  assert.match(HAKU, /Freesound jää pois/);
});
