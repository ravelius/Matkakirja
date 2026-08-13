/*
 * Viisas Pöllö: kontekstinkeruu, spoilerisuoja ja välityspalvelimen
 * rajalogiikka.
 *
 * Tärkein testi tässä tiedostossa on spoilerisuoja. Pöllö saa nähdä sen
 * mitä pelaaja katsoo, mutta EI aktiivista tehtävää vaihtoehtoineen ja
 * vastauksineen. Vuoto ei näkyisi pelaamalla eikä diffiä lukemalla —
 * se näkyisi vasta siinä, että pöllö kertoo oikean vastauksen. Siksi
 * suoja on kiinnitetty tänne.
 *
 * DOM-osuudet ajetaan pienellä omalla puumallilla: Nodessa ei ole
 * selainta, eikä repoon oteta jsdomia yhtä testiä varten. Malli
 * toteuttaa täsmälleen ne neljä asiaa, joita js/pollo.js DOMilta
 * kysyy (querySelectorAll, matches, closest, cloneNode/remove) — ja
 * sama suoja todistetaan lisäksi oikeassa selaimessa oikeasta
 * pyyntörungosta (tools/savuke-pollo.mjs).
 */
import test from 'node:test';
import assert from 'node:assert/strict';
// Workerin järjestelmäkehote luetaan tiedostona: se on palvelimen koodia
// eikä sitä tuoda peliin, joten merkkijonotarkistus on oikea mitta.
import { readFileSync } from 'node:fs';

import {
  KONTEKSTIN_ENIMMAISPITUUS,
  jasennaKasitteet,
  kokoaKonteksti,
  lueNakyma,
  pelinTila,
  poimiLohkot,
  poistaKasiteMerkinnat,
  tekstiIlmanSpoilereita,
} from '../js/pollo.js';

import {
  KYSYMYKSEN_KATTO,
  lueLista,
  lueLuku,
  luoJatkoSuodatin,
  paivaAvain,
  poimiEhdotukset,
  poimiJatkot,
  sallittuOrigin,
  siivoaHistoria,
  siivoaTeksti,
  tarkistaRajat,
  vertaaSalaisuus,
} from '../tools/pollo/rajat.js';

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli                                                   */
/* ---------------------------------------------------------------- */

class Solmu {
  constructor({ id = '', luokat = [], attrs = {}, hidden = false, teksti = '', lapset = [] } = {}) {
    this.id = id;
    this.luokat = [...luokat];
    this.attrs = { ...attrs };
    this.hidden = hidden;
    this.teksti = teksti;
    this.lapset = [];
    this.vanhempi = null;
    for (const lapsi of lapset) this.lisaa(lapsi);
  }

  lisaa(lapsi) {
    lapsi.vanhempi = this;
    this.lapset.push(lapsi);
    return this;
  }

  matches(valitsin) {
    if (valitsin.startsWith('#')) return this.id === valitsin.slice(1);
    if (valitsin.startsWith('.')) return this.luokat.includes(valitsin.slice(1));
    if (valitsin === '[hidden]') return this.hidden === true;
    const attr = /^\[([\w-]+)="([^"]*)"\]$/.exec(valitsin);
    if (attr) return this.attrs[attr[1]] === attr[2];
    throw new Error(`DOM-malli ei tunne valitsinta ${valitsin}`);
  }

  *jalkelaiset() {
    for (const lapsi of this.lapset) {
      yield lapsi;
      yield* lapsi.jalkelaiset();
    }
  }

  querySelectorAll(valitsin) {
    return [...this.jalkelaiset()].filter((s) => s.matches(valitsin));
  }

  closest(valitsin) {
    let s = this;
    while (s) {
      if (s.matches(valitsin)) return s;
      s = s.vanhempi;
    }
    return null;
  }

  cloneNode() {
    const kopio = new Solmu({
      id: this.id,
      luokat: this.luokat,
      attrs: this.attrs,
      hidden: this.hidden,
      teksti: this.teksti,
    });
    for (const lapsi of this.lapset) kopio.lisaa(lapsi.cloneNode());
    return kopio;
  }

  remove() {
    if (!this.vanhempi) return;
    const i = this.vanhempi.lapset.indexOf(this);
    if (i >= 0) this.vanhempi.lapset.splice(i, 1);
    this.vanhempi = null;
  }

  get textContent() {
    return [this.teksti, ...this.lapset.map((l) => l.textContent)]
      .filter(Boolean)
      .join(' ');
  }
}

/** Aktiivisen tehtävän tekstit — mitään näistä ei saa päätyä pakettiin. */
const VISA_KYSYMYS = 'MITEN KORKEA ON KATARAN KORKEIN KOHTA?';
const VISA_VAIHTOEHDOT = ['VAIHTOEHTO-AAA', 'VAIHTOEHTO-BBB', 'VAIHTOEHTO-CCC', 'VAIHTOEHTO-DDD'];
const VISA_VASTAUS = 'OIKEA-VASTAUS-ON-BBB';
const JUTUN_TEKSTI = 'Dohan satamassa purjehtivat perinteiset dhow-veneet.';

/** Rakentaa lehden, jonka aihesivulla on juttu JA minitehtävä. */
function teeLehti({ auki = true, sivuPiilossa = false } = {}) {
  const minitehtava = new Solmu({
    luokat: ['minitehtava'],
    lapset: [
      new Solmu({ luokat: ['minitehtava-otsikko'], teksti: 'Lehden minitehtävä' }),
      new Solmu({ luokat: ['minitehtava-kysymys'], teksti: VISA_KYSYMYS }),
      new Solmu({
        luokat: ['minitehtava-vaihtoehdot'],
        lapset: VISA_VAIHTOEHDOT.map((t) => new Solmu({ teksti: t })),
      }),
      new Solmu({ teksti: VISA_VASTAUS }),
    ],
  });
  const kategoria = new Solmu({
    id: 'arrival-kategoria',
    hidden: sivuPiilossa,
    lapset: [
      new Solmu({ luokat: ['juttu'], teksti: JUTUN_TEKSTI }),
      minitehtava,
    ],
  });
  const lehti = new Solmu({
    id: 'arrival-dialog',
    lapset: [
      new Solmu({ id: 'arrival-city', teksti: 'Doha' }),
      new Solmu({ id: 'arrival-intro', teksti: 'Kaupunki aavikon ja meren välissä.' }),
      kategoria,
      // Kulttuurivisa on kokonaan valkoisen listan ulkopuolella, mutta
      // varmistetaan silti ettei se vuoda mitään reittiä.
      new Solmu({
        id: 'arrival-kulttuuri-visa',
        lapset: [new Solmu({ id: 'arrival-kulttuuri-kysymys', teksti: VISA_KYSYMYS })],
      }),
    ],
  });
  lehti.open = auki;
  return lehti;
}

/** Peliolio, jonka quiz-kentässä on aktiivinen tehtävä vastauksineen. */
function teeGame() {
  return {
    pack: {
      name: 'Maailmankartta',
      map: {
        cityCountry: { doha: 'QAT' },
        // Maan nimi tulee samasta taulusta kuin kartan maakyltille.
        countryShapes: { QAT: { nimi: 'Qatar' } },
      },
    },
    player: { pos: { city: 'doha' } },
    board: { cityById: new Map([['doha', { id: 'doha', name: 'Doha' }]]) },
    dayCount: () => 23,
    // Nämä kolme ovat kiellettyä aluetta — pelinTila ei saa koskea niihin.
    quiz: {
      cityId: 'doha',
      question: VISA_KYSYMYS,
      options: VISA_VAIHTOEHDOT,
      correct: 1,
      answer: VISA_VASTAUS,
    },
    duel: { question: VISA_KYSYMYS },
    eventCard: { text: VISA_VASTAUS },
  };
}

function teeDoc({ lehti = null, matkakirja = '' } = {}) {
  const fact = new Solmu({ id: 'fact-text', teksti: matkakirja });
  return {
    getElementById(id) {
      if (id === 'arrival-dialog') return lehti;
      if (id === 'fact-text') return fact;
      return null;
    },
  };
}

/* ---------------------------------------------------------------- */
/* Spoilerisuoja                                                     */
/* ---------------------------------------------------------------- */

test('pelinTila ei lue aktiivista visaa, kaksintaistelua eikä tapahtumakorttia', () => {
  const tila = pelinTila(teeGame());
  const paketti = JSON.stringify(tila);
  for (const kielletty of [VISA_KYSYMYS, VISA_VASTAUS, ...VISA_VAIHTOEHDOT]) {
    assert.ok(!paketti.includes(kielletty), `pelinTila vuoti: ${kielletty}`);
  }
  // Sallittu tieto on silti mukana — muuten pöllö ei tietäisi missä ollaan.
  assert.equal(tila.kaupunki, 'Doha');
  assert.equal(tila.lauta, 'Maailmankartta');
  assert.equal(tila.maaIso, 'QAT');
  assert.equal(tila.paiva, 23);
});

test('aihesivun juttu tulee mukaan mutta sivun minitehtävä ei', () => {
  const lehti = teeLehti();
  const lohkot = poimiLohkot(lehti);
  const teksti = lohkot.map((l) => `${l.otsikko}: ${l.teksti}`).join('\n');
  assert.ok(teksti.includes(JUTUN_TEKSTI), 'jutun teksti puuttuu paketista');
  for (const kielletty of [VISA_KYSYMYS, VISA_VASTAUS, ...VISA_VAIHTOEHDOT]) {
    assert.ok(!teksti.includes(kielletty), `lehtipaketti vuoti: ${kielletty}`);
  }
});

test('spoilerisuoja ei muuta alkuperäistä DOMia', () => {
  const lehti = teeLehti();
  poimiLohkot(lehti);
  // Minitehtävä on yhä paikallaan pelaajan näkymässä: suodatus tehdään
  // kopiolle, ei ruudulla näkyvälle puulle.
  assert.equal(lehti.querySelectorAll('.minitehtava').length, 1);
  assert.ok(lehti.textContent.includes(VISA_KYSYMYS));
});

test('tehtävälohko itse antaa tyhjän tekstin', () => {
  const lehti = teeLehti();
  const [minitehtava] = lehti.querySelectorAll('.minitehtava');
  assert.equal(tekstiIlmanSpoilereita(minitehtava), '');
});

test('data-pollo="ei" sulkee minkä tahansa lohkon pois', () => {
  const juuri = new Solmu({
    id: 'arrival-kategoria',
    lapset: [
      new Solmu({ teksti: 'Näkyy pöllölle.' }),
      new Solmu({ attrs: { 'data-pollo': 'ei' }, teksti: 'SALAISUUS-XYZ' }),
    ],
  });
  const teksti = tekstiIlmanSpoilereita(juuri);
  assert.ok(teksti.includes('Näkyy pöllölle.'));
  assert.ok(!teksti.includes('SALAISUUS-XYZ'));
});

test('piilotettua lehden sivua ei lueta', () => {
  const lohkot = poimiLohkot(teeLehti({ sivuPiilossa: true }));
  assert.ok(!lohkot.some((l) => l.teksti.includes(JUTUN_TEKSTI)));
  // Näkyvä nimiö tulee silti mukaan.
  assert.ok(lohkot.some((l) => l.teksti === 'Doha'));
});

test('lueNakyma: koko paketti on spoilerivapaa ja mahtuu kattoon', () => {
  const konteksti = lueNakyma({
    game: teeGame(),
    ui: { arrivalMaaTiedot: { nimi: 'Qatar' }, tutkiMaaLehti: null },
    doc: teeDoc({ lehti: teeLehti(), matkakirja: 'Saavuin Dohaan helmikuussa 1873.' }),
  });
  for (const kielletty of [VISA_KYSYMYS, VISA_VASTAUS, ...VISA_VAIHTOEHDOT]) {
    assert.ok(!konteksti.includes(kielletty), `konteksti vuoti: ${kielletty}`);
  }
  assert.ok(konteksti.length <= KONTEKSTIN_ENIMMAISPITUUS);
  assert.ok(konteksti.includes('Doha'));
  assert.ok(konteksti.includes('Qatar'));
  assert.ok(konteksti.includes('kaupungin lehti auki'));
  assert.ok(konteksti.includes('Saavuin Dohaan'));
  assert.ok(konteksti.includes(JUTUN_TEKSTI));
});

test('lueNakyma kartalla: ei lehtitekstiä, ei kaatumista ilman peliä', () => {
  const kartalla = lueNakyma({ game: teeGame(), doc: teeDoc({ lehti: teeLehti({ auki: false }) }) });
  assert.ok(kartalla.includes('Näkymä: kartta'));
  assert.ok(!kartalla.includes(JUTUN_TEKSTI));
  assert.equal(lueNakyma({ game: null, doc: teeDoc() }), 'Näkymä: kartta');
});

/* ---------------------------------------------------------------- */
/* Sijaintikontekstin eheys                                          */
/* ---------------------------------------------------------------- */

/*
 * OMISTAJAN HAVAINTO 13.8.2026. Pelaaja seisoi Sofiassa ja kartan
 * maakyltissä luki BULGARIA, mutta pöllö ehdotti kysymystä "Mikä on
 * Sofian rooli Kreikassa tänä päivänä?" ja vahvisti sen. Syy oli
 * kontekstissa: maa luettiin ui.arrivalMaaTiedoista, joka osoittaa
 * viimeksi avattuun MAALEHTEEN — Maiden tiedot -varusteella selattu
 * Kreikka jäi siihen roikkumaan. Nämä testit lukitsevat säännön: maa
 * johdetaan aina nykyisestä kaupungista, eikä vanhentunut kenttä voita.
 */

/** Peli Sofiassa. Bulgarialla on maan muoto ja nimi, kuten oikeallakin laudalla. */
function teeSofiaGame({ cityCountry = { sofia: 'BGR' }, countryShapes = { BGR: { nimi: 'Bulgaria' }, GRC: { nimi: 'Kreikka' } } } = {}) {
  return {
    pack: { name: 'Eurooppa', map: { cityCountry, countryShapes } },
    player: { pos: { city: 'sofia' } },
    board: { cityById: new Map([['sofia', { id: 'sofia', name: 'Sofia' }]]) },
    dayCount: () => 12,
  };
}

test('pelinTila johtaa maan kaupungista pelin omalla kaupunki→maa-datalla', () => {
  const tila = pelinTila(teeSofiaGame());
  assert.equal(tila.kaupunki, 'Sofia');
  assert.equal(tila.maaIso, 'BGR');
  assert.equal(tila.maa, 'Bulgaria');
});

test('vanhentunut maalehtikenttä ei voita kaupunkia: Sofia on Bulgariassa', () => {
  // ui.arrivalMaaTiedot osoittaa Kreikkaan, koska pelaaja selasi
  // Kreikan maalehteä. Sen EI saa näkyä sijaintina.
  const konteksti = lueNakyma({
    game: teeSofiaGame(),
    ui: { arrivalMaaTiedot: { nimi: 'Kreikka' }, tutkiMaaLehti: 'GRC' },
    doc: teeDoc(),
  });
  assert.ok(konteksti.includes('Kaupunki, jossa pelaaja on: Sofia'), konteksti);
  assert.ok(konteksti.includes('Maa, jossa pelaaja on: Bulgaria'), konteksti);
  assert.ok(!/Kreikka/.test(konteksti), konteksti);
});

test('avoin vieraan maan lehti kerrotaan nimeltä, ei sijaintina', () => {
  const lehti = teeLehti();
  const konteksti = lueNakyma({
    game: teeSofiaGame(),
    ui: { arrivalMaaTiedot: { nimi: 'Kreikka' }, tutkiMaaLehti: 'GRC' },
    doc: teeDoc({ lehti }),
  });
  assert.ok(konteksti.includes('Maa, jossa pelaaja on: Bulgaria'), konteksti);
  assert.ok(konteksti.includes('maan lehti auki (Kreikka)'), konteksti);
  // Sijaintirivi on yksi ja yksiselitteinen: lehden maaosastolla on
  // oma, eri otsikkonsa.
  assert.equal(konteksti.match(/jossa pelaaja on: /g)?.length, 2);
});

test('tuntemattomalle maalle ei keksitä nimeä — maa jää pois kokonaan', () => {
  // Laudalla ei ole muotoa tälle maalle, jolloin myös kartan maakyltti
  // on piilossa. Väärä tai käsittämätön maa on pahempi kuin puuttuva.
  const konteksti = lueNakyma({
    game: teeSofiaGame({ cityCountry: { sofia: 'ZZZ' }, countryShapes: {} }),
    ui: { arrivalMaaTiedot: { nimi: 'Kreikka' } },
    doc: teeDoc(),
  });
  assert.ok(konteksti.includes('Kaupunki, jossa pelaaja on: Sofia'), konteksti);
  assert.ok(!/Maa, jossa pelaaja on/.test(konteksti), konteksti);
  assert.ok(!/ZZZ|Kreikka/.test(konteksti), konteksti);
});

test('ilman kaupunkia ei ole maata', () => {
  const tila = pelinTila({ pack: teeSofiaGame().pack, player: { pos: {} } });
  assert.equal(tila.maaIso, null);
  assert.equal(tila.maa, null);
});

/*
 * JÄRJESTELMÄKEHOTE ON PALVELIMELLA (tools/pollo/worker.js), eikä sitä
 * voi CI:ssä koeajaa mallia vasten. Tässä tarkistetaan vain, että
 * oikaisuohje on kehotteessa: se on se sääntö, jonka puuttuminen sai
 * mallin vahvistamaan kysymyksen väärän oletuksen.
 */
test('workerin kehotteessa on oikaisuohje ja faktakuri', () => {
  const kehote = readFileSync(new URL('../tools/pollo/worker.js', import.meta.url), 'utf8');
  assert.ok(/oikaise/i.test(kehote), 'oikaisuohje puuttuu kehotteesta');
  assert.ok(/jossa pelaaja on/.test(kehote), 'sijaintirivin nimi puuttuu kehotteesta');
  assert.ok(/vahvista väärää oletusta/.test(kehote), 'kielto vahvistaa väärä oletus puuttuu');
  assert.ok(/et ole varma/i.test(kehote), 'epävarmuuden myöntäminen puuttuu');
  assert.ok(/hallinnollis/i.test(kehote), 'kielto keksiä hallinnollisia väitteitä puuttuu');
});

/* ---------------------------------------------------------------- */
/* Paketin koko                                                      */
/* ---------------------------------------------------------------- */

test('kokoaKonteksti leikkaa pitkän lehtitekstin kattoon', () => {
  const konteksti = kokoaKonteksti({
    lauta: 'Maailmankartta',
    kaupunki: 'Doha',
    lohkot: Array.from({ length: 20 }, (_, i) => ({
      otsikko: `Sivu ${i}`,
      teksti: 'x'.repeat(1000),
    })),
  });
  assert.ok(konteksti.length <= KONTEKSTIN_ENIMMAISPITUUS,
    `paketti oli ${konteksti.length} merkkiä`);
  // Otsikkorivit mahtuvat aina — ne ovat paketin tärkein osa.
  assert.ok(konteksti.startsWith('Lauta: Maailmankartta'));
  assert.ok(konteksti.includes('Kaupunki, jossa pelaaja on: Doha'));
});

test('kokoaKonteksti tyhjästä tilasta on tyhjä eikä kaadu', () => {
  assert.equal(kokoaKonteksti(), '');
  assert.equal(kokoaKonteksti({ lohkot: null }), '');
});

/* ---------------------------------------------------------------- */
/* Välityspalvelimen rajalogiikka                                    */
/* ---------------------------------------------------------------- */

test('päiväraja ja kuukausibudjetti pysäyttävät omilla viesteillään', () => {
  assert.equal(tarkistaRajat({ paiva: 29, kuukausi: 10, paivaraja: 30 }).ok, true);
  const paiva = tarkistaRajat({ paiva: 30, paivaraja: 30 });
  assert.equal(paiva.ok, false);
  assert.equal(paiva.syy, 'paivaraja');
  assert.ok(paiva.viesti.length > 10);

  // Kuukausikatto on kova ja voittaa päivärajan.
  const kuukausi = tarkistaRajat({ paiva: 0, kuukausi: 1500, kuukausiraja: 1500 });
  assert.equal(kuukausi.syy, 'kuukausiraja');

  // Nolla tarkoittaa "ei rajaa" — omistajan hätäventtiili.
  assert.equal(tarkistaRajat({ paiva: 99999, paivaraja: 0, kuukausiraja: 0 }).ok, true);
});

test('päiväavain ei sisällä raakaa IP-osoitetta ja on vakaa vuorokauden ajan', () => {
  const aamu = new Date('2026-08-12T06:00:00Z');
  const ilta = new Date('2026-08-12T23:30:00Z');
  const huomenna = new Date('2026-08-13T06:00:00Z');
  const a = paivaAvain('203.0.113.7', aamu);
  assert.ok(!a.includes('203.0.113.7'), 'avaimessa oli raaka IP');
  assert.equal(a, paivaAvain('203.0.113.7', ilta));
  assert.notEqual(a, paivaAvain('203.0.113.7', huomenna));
  assert.notEqual(a, paivaAvain('203.0.113.8', aamu));
});

test('CORS päästää läpi vain listatut originit', () => {
  const lista = lueLista(' https://peli.example/ , https://toinen.example ');
  assert.deepEqual(lista, ['https://peli.example', 'https://toinen.example']);
  assert.equal(sallittuOrigin('https://peli.example', lista), true);
  assert.equal(sallittuOrigin('https://paha.example', lista), false);
  assert.equal(sallittuOrigin(null, lista), false);
  // Tyhjä lista = puolivalmis asetus = kiinni, ei auki.
  assert.equal(sallittuOrigin('https://peli.example', []), false);
  assert.equal(sallittuOrigin('https://mika.tahansa', ['*']), true);
});

test('ympäristömuuttujan luvut kestävät roskan', () => {
  assert.equal(lueLuku('45', 30), 45);
  assert.equal(lueLuku('', 30), 30);
  assert.equal(lueLuku(undefined, 30), 30);
  assert.equal(lueLuku('-5', 30), 30);
  assert.equal(lueLuku('paljon', 30), 30);
});

test('palvelin leikkaa asiakkaan syötteen omilla katoillaan', () => {
  assert.equal(siivoaTeksti('x'.repeat(6000)).length, 5000);
  assert.equal(siivoaTeksti('x'.repeat(6000), KYSYMYKSEN_KATTO).length, KYSYMYKSEN_KATTO);
  assert.equal(siivoaTeksti(null), '');
  assert.equal(siivoaTeksti('  reunat  '), 'reunat');
});

test('keskusteluhistoriasta kelpaavat vain tunnetut roolit', () => {
  const historia = siivoaHistoria([
    { rooli: 'kayttaja', teksti: 'Eka' },
    { rooli: 'jarjestelma', teksti: 'OHITETTAVA' },
    { rooli: 'pollo', teksti: 'Toka' },
    null,
    { rooli: 'kayttaja', teksti: '' },
  ]);
  assert.deepEqual(historia, [
    { rooli: 'kayttaja', teksti: 'Eka' },
    { rooli: 'pollo', teksti: 'Toka' },
  ]);
  assert.equal(siivoaHistoria('ei taulukko').length, 0);
  assert.equal(siivoaHistoria(Array.from({ length: 20 },
    () => ({ rooli: 'pollo', teksti: 'a' })), 6).length, 6);
});

test('ehdotukset siivotaan numeroinnista ja ei-kysymykset hylätään', () => {
  const teksti = 'Tässä kolme kysymystä:\n'
    + '1. Miksi Doha kasvoi näin nopeasti?\n'
    + '- Mitä dhow-veneillä kuljetettiin?\n'
    + 'Tämä ei ole kysymys lainkaan.\n'
    + '3) Millainen ilmasto Qatarissa on?\n'
    + 'Neljäs kysymys jää yli?';
  const ehdotukset = poimiEhdotukset(teksti, 3);
  assert.deepEqual(ehdotukset, [
    'Miksi Doha kasvoi näin nopeasti?',
    'Mitä dhow-veneillä kuljetettiin?',
    'Millainen ilmasto Qatarissa on?',
  ]);
  assert.deepEqual(poimiEhdotukset(''), []);
  assert.deepEqual(poimiEhdotukset(null), []);
});

/*
 * JATKOKYSYMYKSET. Erotinrivi jäsennetään palvelimella, jotta raaka
 * merkintä ei voi päätyä pelaajan ruudulle. Kolme tapausta: siisti
 * vastaus, merkintä ilman kelvollisia kysymyksiä ja vastaus ilman
 * merkintää lainkaan.
 */
test('vastauksesta erotetaan jatkokysymykset erotinrivin kohdalta', () => {
  const { vastaus, jatkot } = poimiJatkot(
    'Lontoon metro avattiin vuonna 1863.\n\n'
    + 'JATKOT:\n'
    + 'Miksi ensimmäinen linja kulki juuri siinä?\n'
    + '- Millaista matkustaminen oli höyryjunassa?\n',
  );
  assert.equal(vastaus, 'Lontoon metro avattiin vuonna 1863.');
  assert.deepEqual(jatkot, [
    'Miksi ensimmäinen linja kulki juuri siinä?',
    'Millaista matkustaminen oli höyryjunassa?',
  ]);
});

test('merkintä katoaa vastauksesta myös silloin kun kysymyksiä ei tule', () => {
  const { vastaus, jatkot } = poimiJatkot('Tämä on vastaus.\nJATKOT:\nEi kysymysmerkkiä');
  assert.equal(vastaus, 'Tämä on vastaus.');
  assert.deepEqual(jatkot, []);
});

test('ilman merkintää koko teksti on vastaus', () => {
  const { vastaus, jatkot } = poimiJatkot('Pelkkä vastaus ilman mitään merkintää.');
  assert.equal(vastaus, 'Pelkkä vastaus ilman mitään merkintää.');
  assert.deepEqual(jatkot, []);
  assert.deepEqual(poimiJatkot(null), { vastaus: '', jatkot: [] });
});

test('kehittäjäkoodin vertailu kelpuuttaa vain täsmälleen saman', () => {
  assert.equal(vertaaSalaisuus('avaa-seesam', 'avaa-seesam'), true);
  assert.equal(vertaaSalaisuus('avaa-seesan', 'avaa-seesam'), false);
  assert.equal(vertaaSalaisuus('avaa-seesam2', 'avaa-seesam'), false);
  // Puuttuva otsake tai puuttuva salaisuus ei koskaan kelpaa.
  assert.equal(vertaaSalaisuus(null, 'avaa-seesam'), false);
  assert.equal(vertaaSalaisuus('avaa-seesam', ''), false);
  assert.equal(vertaaSalaisuus('', ''), false);
});

/* ---------------------------------------------------------------- */
/* Paikallinen tietohaku pelin omasta aineistosta                    */
/* ---------------------------------------------------------------- */

const { KULTTUURI_KATEGORIAT } = await import('../js/packs/kulttuuri-kategoriat.js');
const { MAA_KATEGORIAT } = await import('../js/packs/maa-kategoriat.js');
const { NAHTAVYYSJUTUT } = await import('../js/packs/nahtavyysjutut.js');
const { EUROPE_QUESTIONS } = await import('../js/packs/europe-questions.js');
const { KAUPUNKIKARTAT } = await import('../js/packs/maakartat.js');
const {
  POLLON_LINKKIKATTO, ankkuriSanat, etsiAnkkuri, haeKatkelmat, hakusanat,
  kohteenNimiSanat, rakennaIndeksi,
} = await import('../js/pollo-haku.js');

/** Koko pelin aineistosta rakennettu indeksi. Jaetaan testien kesken. */
const INDEKSI = rakennaIndeksi({
  kulttuuri: KULTTUURI_KATEGORIAT,
  maat: MAA_KATEGORIAT,
  nahtavyydet: NAHTAVYYSJUTUT,
  kohdekartat: KAUPUNKIKARTAT,
});

test('indeksi rakentuu ja on kokoluokaltaan järkevä', () => {
  assert.ok(INDEKSI.merkinnat.length > 100,
    `indeksissä vain ${INDEKSI.merkinnat.length} merkintää`);
  /*
   * Rakennusaika mitataan, koska indeksi tehdään pöllön ensimmäisellä
   * avauksella. Jos tämä alkaa lähestyä 200 ms, indeksointi on
   * siirrettävä taustalle (omistajan raja 12.8.2026).
   */
  console.log(`  indeksi: ${INDEKSI.merkinnat.length} merkintää, `
    + `${INDEKSI.sanoja} sanaa, ${INDEKSI.kesto.toFixed(1)} ms`);
  assert.ok(INDEKSI.kesto < 2000, `indeksointi kesti ${INDEKSI.kesto} ms`);
});

test('haku löytää tunnetun noston avainsanalla', () => {
  const { katkelmat, kesto } = haeKatkelmat(INDEKSI, 'Mitä Stonehengen kivistä tiedetään?');
  console.log(`  haku: ${kesto.toFixed(2)} ms, ${katkelmat.length} osumaa`);
  assert.ok(katkelmat.length > 0, 'Stonehenge ei löytynyt aineistosta');
  /*
   * Riittää, että oikea juttu on palautetussa joukossa: kaikki
   * katkelmat menevät pöllölle kontekstiksi, joten sijoitus joukon
   * sisällä ei ratkaise. Suomen taivutus tekee kärkisijasta hauraan
   * mittarin — "kivistä" osuu myös sanaan "kivistään".
   */
  const osui = katkelmat.some((k) => k.teksti.toLowerCase().includes('stonehenge'));
  assert.ok(osui, `Stonehenge ei ollut osumissa: ${katkelmat.map((k) => k.leima).join(' | ')}`);
  // Lähdeleima kertoo, mistä lehdestä juttu on.
  assert.ok(katkelmat.every((k) => /(maalehti|kaupunkilehti|kohdekartta) \/ /.test(k.leima)));
});

test('haku on nopea myös koko aineistolla', () => {
  const { kesto } = haeKatkelmat(INDEKSI, 'Millainen ilmasto Egyptissä on ja mitä siellä kasvaa?');
  assert.ok(kesto < 250, `haku kesti ${kesto} ms`);
});

test('visakysymykset eivät ole indeksissä', () => {
  // Poimitaan oikeasta kysymyspankista kysymyksiä ja varmistetaan,
  // ettei yksikään niistä löydy indeksin teksteistä.
  const kysymykset = Object.values(EUROPE_QUESTIONS ?? {})
    .flat()
    .map((k) => k?.q)
    .filter(Boolean)
    .slice(0, 25);
  assert.ok(kysymykset.length > 0, 'kysymyspankki ei latautunut — testi ei todista mitään');
  const kaikkiTeksti = INDEKSI.merkinnat.map((m) => m.teksti).join('\n');
  for (const kysymys of kysymykset) {
    assert.ok(!kaikkiTeksti.includes(kysymys), `visakysymys vuoti indeksiin: ${kysymys}`);
  }
});

test('kaari- ja kohtaamistekstit jäävät indeksin ulkopuolelle', async () => {
  const { TARINAKAARI } = await import('../js/packs/tarinakaari.js');
  const { KOHTAAMISET } = await import('../js/packs/kohtaamiset.js');
  const kaikkiTeksti = INDEKSI.merkinnat.map((m) => m.teksti).join('\n');
  /*
   * Poimitaan juonitekstejä rakenteesta riippumatta: mikä tahansa
   * riittävän pitkä merkkijono kelpaa näytteeksi. Näin testi ei hajoa,
   * jos tarinadatan muoto muuttuu — se vahtii sisältöä, ei kenttiä.
   */
  const naytteet = [];
  const kerää = (arvo, syvyys = 0) => {
    if (naytteet.length >= 12 || syvyys > 6) return;
    if (typeof arvo === 'string') {
      if (arvo.length > 80) naytteet.push(arvo);
      return;
    }
    if (Array.isArray(arvo)) {
      for (const osa of arvo) kerää(osa, syvyys + 1);
      return;
    }
    if (arvo && typeof arvo === 'object') {
      for (const osa of Object.values(arvo)) kerää(osa, syvyys + 1);
    }
  };
  kerää(TARINAKAARI);
  kerää(KOHTAAMISET);
  assert.ok(naytteet.length > 0, 'tarinadataa ei löytynyt — testi ei todista mitään');
  for (const nayte of naytteet) {
    assert.ok(!kaikkiTeksti.includes(nayte),
      `tarinateksti vuoti indeksiin: ${nayte.slice(0, 60)}…`);
  }
});

test('minitehtävän fakta tulee hakuun vasta kun tehtävä on ratkaistu', () => {
  const faktat = INDEKSI.merkinnat.filter((m) => m.tyyppi === 'fakta');
  assert.ok(faktat.length > 0, 'yhtään minitehtävän faktaa ei indeksoitu');
  const fakta = faktat[0];
  const sanat = hakusanat(fakta.teksti).slice(0, 4).join(' ');

  // Oletus: ei vastattu -> faktaa ei tarjota.
  const ilman = haeKatkelmat(INDEKSI, sanat, { maara: 40 }).katkelmat;
  assert.ok(!ilman.some((k) => fakta.teksti.startsWith(k.teksti.replace(/…$/, ''))),
    'vastaamattoman tehtävän fakta päätyi hakuun');

  // Kun tehtävä on ratkaistu, sama fakta kelpaa.
  const kanssa = haeKatkelmat(INDEKSI, sanat, {
    maara: 40,
    onVastattu: (m) => m.tyyppi === 'fakta',
  }).katkelmat;
  assert.ok(kanssa.some((k) => fakta.teksti.startsWith(k.teksti.replace(/…$/, ''))),
    'ratkaistun tehtävän fakta ei tullut hakuun');
});

test('jokaisella katkelmalla on yleismuotoinen avausreitti', () => {
  const { katkelmat } = haeKatkelmat(INDEKSI, 'Kerro Stonehengen kivistä ja historiasta');
  assert.ok(katkelmat.length > 0);
  for (const katkelma of katkelmat) {
    assert.ok(katkelma.reitti, 'katkelmalta puuttuu reitti');
    assert.ok(['maalehti', 'kaupunkilehti', 'nahtavyys'].includes(katkelma.reitti.tyyppi));
    assert.ok(katkelma.reitti.tunniste, 'reitiltä puuttuu tunniste');
    assert.ok(katkelma.reitti.sivu || katkelma.reitti.kohde, 'reitiltä puuttuu kohde');
  }
});

/* ---------------------------------------------------------------- */
/* Osuvuuskynnys                                                     */
/* ---------------------------------------------------------------- */

/*
 * OMISTAJAN HAVAINTO 12.8.2026: Ateenan torikysymys sai linkin Syyrian
 * historiaan. Nämä testit ovat sen korjauksen vartijat. Ne eivät vahdi
 * yksittäistä pistemäärää — luvut elävät aineiston mukana — vaan
 * sääntöä: osuman on liityttävä kysymyksen AIHEESEEN, ja jos mikään ei
 * liity, oikea vastaus on tyhjä lista.
 */
const ATEENASSA = { kaupunki: 'ateena', maa: 'GRC' };
const LONTOOSSA = { kaupunki: 'lontoo', maa: 'GBR' };

test('yleinen sana ei enää riitä osumaksi', () => {
  const { katkelmat } = haeKatkelmat(INDEKSI, 'Mitä Ateenan torilla tapahtui antiikin aikaan?', {
    maara: 4, sijainti: ATEENASSA,
  });
  assert.ok(katkelmat.length > 0, 'Ateenan oma tori ei löytynyt lainkaan');
  // Jokaisen osuman on oltava Ateenasta tai Kreikasta — pelkkä "tori"
  // muualla maailmassa ei enää kelpaa.
  for (const k of katkelmat) {
    assert.ok(/ateena|GRC/i.test(k.leima), `epäolennainen osuma: ${k.leima}`);
  }
});

test('kysymys, johon aineistossa ei ole vastausta, ei tuota yhtään linkkiä', () => {
  for (const kysymys of ['Kuka oli Napoleon?', 'Kuinka vanha ihmiskunta on?', 'Onko Syyriassa sotaa?']) {
    const { katkelmat } = haeKatkelmat(INDEKSI, kysymys, { maara: 4, sijainti: LONTOOSSA });
    assert.deepEqual(katkelmat.map((k) => k.leima), [],
      `heikko osuma pääsi läpi: ${kysymys}`);
  }
});

test('pelaajan oma maa nousee kärkeen', () => {
  const { katkelmat } = haeKatkelmat(INDEKSI, 'Mitä ruokaa Kreikassa syödään?', {
    maara: 4, sijainti: ATEENASSA,
  });
  assert.ok(katkelmat.length > 0, 'ruokakysymys ei löytänyt mitään');
  assert.equal(katkelmat[0].oma, true, `kärjessä oli vieras juttu: ${katkelmat[0].leima}`);
  // Ilman nimet-taulua leimassa on tunniste sellaisenaan (ateena / GRC).
  assert.ok(/ateena|GRC/i.test(katkelmat[0].leima), katkelmat[0].leima);
});

test('sama kysymys eri paikassa antaa eri kärjen', () => {
  const ateenassa = haeKatkelmat(INDEKSI, 'Mitä täällä syödään?', { sijainti: ATEENASSA });
  const lontoossa = haeKatkelmat(INDEKSI, 'Mitä täällä syödään?', { sijainti: LONTOOSSA });
  assert.ok(ateenassa.katkelmat.length && lontoossa.katkelmat.length);
  assert.notEqual(ateenassa.katkelmat[0].leima, lontoossa.katkelmat[0].leima);
});

test('linkkikatto on kaksi', () => {
  assert.equal(POLLON_LINKKIKATTO, 2);
});

/* ---------------------------------------------------------------- */
/* Ankkurointi vastaustekstiin                                       */
/* ---------------------------------------------------------------- */

test('ankkurisanat tulevat merkinnän otsikosta, eivät sidesanoista', () => {
  const sanat = ankkuriSanat({ otsikko: 'Maailman ensimmäinen metro', aiheNimi: 'Historia' });
  assert.ok(sanat.includes('maailman'));
  assert.ok(sanat.includes('ensimmäinen'));
  assert.ok(sanat.includes('historia'));
  // Lyhyet sanat eivät kelpaa ankkuriksi: ne tarttuisivat mihin tahansa.
  assert.ok(sanat.every((s) => s.length >= 5), sanat.join(', '));
});

test('ankkuri löytyy taivutetustakin sanasta', () => {
  const osuma = etsiAnkkuri('Akropoliin temppelit rakennettiin 400-luvulla eaa.', ['akropolis']);
  assert.deepEqual(osuma, { alku: 0, loppu: 10 });
});

test('ankkuria ei keksitä sinne, missä sitä ei ole', () => {
  assert.equal(etsiAnkkuri('Tästä ei ole pelissä juttua.', ['akropolis']), null);
  // Lyhyt yhteinen alku ei riitä: "kivet" ei saa tarttua sanaan "kivistä".
  assert.equal(etsiAnkkuri('Tämä juttu kertoo kivistä.', ['kivet']), null);
  assert.equal(etsiAnkkuri('', ['akropolis']), null);
  assert.equal(etsiAnkkuri('Teksti ilman ankkureita', []), null);
});

test('hakusanoista karsitaan sidesanat', () => {
  assert.deepEqual(hakusanat('Mikä on Stonehenge ja miksi se rakennettiin?'),
    ['stonehenge', 'rakennettiin']);
  assert.deepEqual(hakusanat(''), []);
});

/* ---------------------------------------------------------------- */
/* Nähtävyysnimet ankkureina                                         */
/* ---------------------------------------------------------------- */

/*
 * OMISTAJAN HAVAINTO 13.8.2026 (Wien): pöllön vastaus mainitsi
 * Stephansdomin, Hofburgin ja Schönbrunnin, ja kaikista kolmesta on
 * juttu Wienin lehdessä — mutta yksikään ei linkittynyt. Syy oli
 * indeksissä: tunnistesanat tulivat pelkästä otsikosta, ja
 * Schönbrunnista kertovan noston otsikko on "Keisarin aamiaishuone
 * eläintarhan keskellä". Nyt kohdekartan pisteiden nimet liitetään
 * niihin merkintöihin, jotka puhuvat kyseisestä kohteesta.
 */

test('kohteen nimestä poimitaan tunnistavat sanat, ei yleissanoja', () => {
  assert.deepEqual(kohteenNimiSanat('Stephansdom'), [['stephansdom']]);
  // Yhdysviiva pilkkoo, ja "torni" yksin ei nimeä mitään.
  assert.deepEqual(kohteenNimiSanat('Eiffel-torni'), [['eiffel']]);
  // Sulkumuoto on oma nimensä: kumpi tahansa kelpaa ankkuriksi.
  assert.deepEqual(kohteenNimiSanat('Pyhän Tapanin kirkko (Stephansdom)'),
    [['pyhän', 'tapanin'], ['stephansdom']]);
  // Pelkkä yleissana ei tuota nimeä lainkaan.
  assert.deepEqual(kohteenNimiSanat('Tv-torni'), []);
  assert.deepEqual(kohteenNimiSanat(''), []);
});

test('Schönbrunn ankkuroituu Wienin juttuun, vaikka otsikko ei nimeä sitä', () => {
  const wienissa = { kaupunki: 'wien', maa: 'AUT' };
  const { katkelmat } = haeKatkelmat(INDEKSI, 'Mikä Schönbrunn on?', {
    maara: 4, sijainti: wienissa,
  });
  assert.ok(katkelmat.length > 0, 'Schönbrunn ei löytynyt aineistosta lainkaan');
  const osuma = katkelmat.find((k) => k.ankkurit.includes('schönbrunn'));
  assert.ok(osuma, `nimiankkuri puuttuu: ${katkelmat.map((k) => k.leima).join(' | ')}`);
  assert.ok(/wien/i.test(osuma.leima), osuma.leima);
  // Vartiotesti: pöllön vastauksesta löytyy kohta, joka voi olla linkki.
  const vastaus = 'Wienissä kannattaa nähdä myös Schönbrunnin kesäpalatsi.';
  const kohta = etsiAnkkuri(vastaus, osuma.ankkurit);
  assert.ok(kohta, 'ankkuria ei löytynyt vastaustekstistä');
  assert.equal(vastaus.slice(kohta.alku, kohta.loppu), 'Schönbrunnin');
});

test('nähtävyysjuttu ankkuroituu omaan nimeensä ennen muita', () => {
  const { katkelmat } = haeKatkelmat(INDEKSI, 'Mitä Stephansdomista tiedetään?', {
    maara: 4, sijainti: { kaupunki: 'wien', maa: 'AUT' },
  });
  const juttu = katkelmat.find((k) => k.reitti?.tyyppi === 'nahtavyys');
  assert.ok(juttu, 'Wienin nähtävyysjuttu ei löytynyt');
  // Oma nimi on ensimmäisenä: naapurikohteen nimi ei saa napata linkkiä.
  assert.equal(juttu.ankkurit[0], 'stephansdom', juttu.ankkurit.join(','));
});

test('kaupungin oma nimi ei kelpaa kohteen nimiankkuriksi', () => {
  // "Kuwait-tornit" kaupungissa kuwait osuisi kaupungin joka juttuun.
  for (const m of INDEKSI.merkinnat) {
    if (m.omistaja !== 'kuwait') continue;
    assert.ok(!m.nimiSanat.includes('kuwait'), `kaupungin nimi ankkurina: ${m.otsikko}`);
  }
});

/* ---------------------------------------------------------------- */
/* Pöllölinkit: [[avainkäsitteet]]                                   */
/* ---------------------------------------------------------------- */

test('käsitemerkinnät eivät koskaan näy pelaajalle', () => {
  assert.equal(poistaKasiteMerkinnat('Junia veti [[höyryveturi]] vuonna 1863.'),
    'Junia veti höyryveturi vuonna 1863.');
  // Kesken striimin katkennut merkintä: sulkeet pois, teksti jää.
  assert.equal(poistaKasiteMerkinnat('Junia veti [[höyryvet'), 'Junia veti höyryvet');
  assert.equal(poistaKasiteMerkinnat('Junia veti ['), 'Junia veti ');
  // Rikkinäinen merkintä (rivinvaihto keskellä) purkautuu tekstiksi.
  assert.equal(poistaKasiteMerkinnat('[[rikki\nmenee]]'), 'rikki\nmenee');
  assert.equal(poistaKasiteMerkinnat(null), '');
});

test('vastaus jäsentyy paloiksi, joista käsitteet ovat omiaan', () => {
  const palat = jasennaKasitteet('Metro avattiin 1863, ja [[höyryveturit]] vetivät junia.');
  assert.deepEqual(palat, [
    { teksti: 'Metro avattiin 1863, ja ', kasite: false },
    { teksti: 'höyryveturit', kasite: true },
    { teksti: ' vetivät junia.', kasite: false },
  ]);
  // Yli katon menevät merkinnät purkautuvat tavalliseksi tekstiksi.
  const monta = jasennaKasitteet('[[a-käsite]] [[b-käsite]] [[c-käsite]] [[d-käsite]]');
  assert.equal(monta.filter((p) => p.kasite).length, 3);
  assert.ok(!monta.some((p) => /\[|\]/.test(p.teksti)), JSON.stringify(monta));
  // Merkinnätön vastaus on yksi pala, eikä tyhjästä synny mitään.
  assert.deepEqual(jasennaKasitteet('Pelkkä vastaus.'),
    [{ teksti: 'Pelkkä vastaus.', kasite: false }]);
  assert.deepEqual(jasennaKasitteet(''), []);
});

test('workerin kehotteessa pyydetään käsitemerkinnät ja jätetään ne tekstiin', () => {
  const kehote = readFileSync(new URL('../tools/pollo/worker.js', import.meta.url), 'utf8');
  assert.ok(/\[\[käsite\]\]/.test(kehote), 'käsitemerkinnän muoto puuttuu kehotteesta');
  assert.ok(/KASITEKEHOTE/.test(kehote), 'käsitekehotetta ei liitetä järjestelmäkehotteeseen');
  assert.ok(/stream: true/.test(kehote), 'striimipyyntöä ei ole workerissa');
});

/* ---------------------------------------------------------------- */
/* Striimin jatkosuodatin                                            */
/* ---------------------------------------------------------------- */

/*
 * OMISTAJAN REUNAEHTO 13.8.2026: JATKOT-lohko ei saa vilahtaa ruudulla
 * kertaakaan. Suodatin pidättää rivin verran tekstiä ja päästää sen
 * vasta, kun rivi ei voi enää olla merkintä.
 */

/** Ajaa tekstin suodattimen läpi paloina ja palauttaa näytetyn tekstin. */
function suodata(palat) {
  const suodatin = luoJatkoSuodatin();
  let ulos = '';
  for (const pala of palat) ulos += suodatin.lisaa(pala);
  const { hanta, jatkot } = suodatin.loppu();
  return { nakyva: ulos + hanta, jatkot };
}

test('striimistä ei koskaan välity JATKOT-riviä eikä sen jälkeistä', () => {
  const kokonainen = 'Metro avattiin 1863.\nSe oli ensimmäinen.\n'
    + 'JATKOT:\nMiten tunnelit kaivettiin?\nKuka maksoi?\n';
  // Sama teksti kolmella eri palajaolla: rajat eivät saa muuttaa mitään.
  const jaot = [
    [kokonainen],
    kokonainen.split(''),
    ['Metro avattiin 1863.\nSe oli ', 'ensimmäinen.\nJAT', 'KOT:\nMiten tunnelit ',
      'kaivettiin?\nKuka maksoi?\n'],
  ];
  for (const palat of jaot) {
    const { nakyva, jatkot } = suodata(palat);
    assert.ok(!/JATKOT|jatkot/i.test(nakyva), `merkintä vuoti: ${JSON.stringify(nakyva)}`);
    assert.ok(!/tunnelit/.test(nakyva), `jatkokysymys vuoti: ${JSON.stringify(nakyva)}`);
    assert.equal(nakyva.trim(), 'Metro avattiin 1863.\nSe oli ensimmäinen.');
    assert.deepEqual(poimiEhdotukset(jatkot, 3), ['Miten tunnelit kaivettiin?', 'Kuka maksoi?']);
  }
});

test('tavallinen teksti virtaa läpi myös ilman rivinvaihtoja', () => {
  const { nakyva } = suodata(['Metro ', 'avattiin ', 'vuonna 1863.']);
  assert.equal(nakyva, 'Metro avattiin vuonna 1863.');
  // "J"-alkuinen sana ei jää roikkumaan rivin loppuun asti.
  const yksi = luoJatkoSuodatin();
  assert.equal(yksi.lisaa('Ja'), '');
  assert.equal(yksi.lisaa('rrua veti veturi'), 'Jarrua veti veturi');
});

test('merkintä ilman rivinvaihtoa lopussa ei päädy näkyviin', () => {
  const { nakyva, jatkot } = suodata(['Vastaus tähän.\n', 'JATKOT:']);
  assert.equal(nakyva.trim(), 'Vastaus tähän.');
  assert.equal(jatkot, '');
});

test('konteksti pysyy katossa myös aineiston kanssa', () => {
  const { katkelmat } = haeKatkelmat(INDEKSI, 'Kerro Lontoon historiasta ja metrosta');
  const konteksti = kokoaKonteksti({
    lauta: 'Maailmankartta',
    kaupunki: 'Lontoo',
    aineisto: katkelmat,
    lohkot: Array.from({ length: 10 }, (_, i) => ({ otsikko: `Sivu ${i}`, teksti: 'y'.repeat(900) })),
  });
  assert.ok(konteksti.length <= KONTEKSTIN_ENIMMAISPITUUS,
    `paketti oli ${konteksti.length} merkkiä`);
  assert.ok(konteksti.includes('PELIN TARKISTETTUA AINEISTOA'));
});
