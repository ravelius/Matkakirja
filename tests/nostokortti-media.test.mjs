/*
 * NOSTOKORTIN GALLERIA JA MUSIIKKI — ENSILUOKKAISINA, ILMAN KIERTOTIETÄ.
 *
 * Karttauudistuksen erä 10 (docs/raportit/viesti-fable-karttauudistus-
 * era10-20260913.md, avoin kohta 11.1) jätti kaksi kiertotietä, koska
 * täkynoston kortti ei tuntenut lehden noston `galleria`-kenttää eikä
 * musiikki- ja äänikenttiä:
 *
 *   1. GALLERIA VIETIIN KOHDEKARTAN JUTTUUN. Siirtyneiden nostojen
 *      gallerian kuvat ladottiin NAHTAVYYSJUTUT-merkinnän `kuvat`-
 *      listaan, eivät noston omaan kenttään. Kuvat säilyivät pelissä,
 *      mutta eivät kortilla — ja js/nahtavyydet.js näyttää jutusta
 *      enintään viisi kuvaa, joten kuudes jäi näkymättä kokonaan.
 *   2. MUSIIKKINOSTO JÄI LEHTEEN KAKSOISKAPPALEEKSI. Viisi nostoa
 *      pidettiin lehden sivulla vain siksi, että linkille tai
 *      ääninäytteelle ei ollut paikkaa kortilla.
 *
 * Molemmat kentät ovat nyt kortin omia (js/fokusnosto.js
 * piirraNostonKuvasarja ja piirraNostonMedia). Tämä testi mittaa sen
 * kahdelta puolelta, ja KAATUU JOS KIERTOTIE PALAUTETAAN:
 *
 *   A. DATA: jokaisen kohdekartan juttuun sidotun noston oma kuvajoukko
 *      kattaa jutun kuvalistan, ja mediakentät ovat kortilla — eivät
 *      pelkästään lehden kaksoiskappaleella.
 *   B. LADONTA: oikea kortti avataan pienen DOM-mallin päällä (sama
 *      tapa kuin tests/nostokuva-kortit.test.mjs), ja siitä mitataan
 *      selailunuolet, laskuri ja mediarivi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';
import { NAHTAVYYSJUTUT } from '../js/packs/nahtavyysjutut.js';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';
import { nostonKuvat } from '../js/fokusnosto.js';
import { nostonMusiikkilinkit } from '../js/ui.js';

/** Kaupungit, joiden lehtien sivut on siirretty kohdekartan nostoiksi. */
const KARTTAKAUPUNGIT = ['pariisi', 'lontoo', 'rooma', 'berliini', 'madrid', 'wien', 'amsterdam'];

/** Kortin ja lehden yhteiset mediakentät (js/ui.js lisaaNostonNapit). */
const MEDIAKENTAT = ['aani', 'musiikki', 'musiikkiNayte', 'esikuuntelu'];

/** Kuvan yksikäsitteinen tunniste: Commons-nimi tai valmis osoite. */
const kuvaAvain = (kuva) => kuva?.tiedosto ?? kuva?.osoite ?? null;

/* ================================================================= */
/* A. DATA — kiertotie on purettu                                    */
/* ================================================================= */

test('kohdekartan jutun kuvat ovat myös noston omalla kortilla', () => {
  /*
   * Jos galleria palautetaan pelkäksi jutun kuvalistaksi, tämä kaatuu:
   * jutussa olisi kuvia, joita nostolla ei ole.
   */
  let tarkistettuja = 0;
  for (const kaupunki of KARTTAKAUPUNGIT) {
    const nostot = FOKUSVIRRAT[kaupunki]?.takynostot ?? [];
    for (const [nimi, juttu] of Object.entries(NAHTAVYYSJUTUT[kaupunki] ?? {})) {
      if (!juttu.nosto?.startsWith('nosto-')) continue;
      const nosto = nostot.find((n) => `nosto-${n.id}` === juttu.nosto);
      if (!nosto) continue;
      const kortilla = new Set([
        ...nostonKuvat(nosto).map(kuvaAvain),
        kuvaAvain(nosto.valokuva),
        kuvaAvain(nosto.kartta),
      ].filter(Boolean));
      for (const kuva of juttu.kuvat ?? []) {
        const avain = kuvaAvain(kuva);
        if (!avain) continue;
        /*
         * R2-ÄMPÄRIN KUVAJONO EI KELPAA KORTILLE. Noston `osoite` on
         * repon oma tiedosto, jonka olemassaolon tests/fokusvirta.test.mjs
         * lukee levyltä; ämpärin valmis verkko-osoite ei ole siellä.
         * Rajoite on erän 5 avoin kohta 7.6 eikä tämän kiertotien osa
         * (kuvatyötä, ei kenttätukea).
         */
        if (/^https?:/i.test(avain)) continue;
        assert.ok(kortilla.has(avain),
          `${kaupunki}/${nosto.id}: kohdekartan jutun "${nimi}" kuva ${avain} `
          + 'ei ole noston omassa kuvajoukossa — galleria on taas kiertotiellä');
        tarkistettuja += 1;
      }
    }
  }
  assert.ok(tarkistettuja >= 30,
    `odotettiin vähintään 30 tarkistettua kuvaa, saatiin ${tarkistettuja}`);
});

test('mediakenttäinen nosto ei jää lehteen kortin kaksoiskappaleeksi', () => {
  /*
   * Erän 10 kiertotie näkyi juuri tässä: sama juttu oli sekä kartalla
   * (ilman musiikkia) että lehden sivulla (musiikin kanssa). Jos nosto
   * on molemmilla pinnoilla, mediakenttien on oltava kortilla.
   */
  for (const kaupunki of KARTTAKAUPUNGIT) {
    const nostot = FOKUSVIRRAT[kaupunki]?.takynostot ?? [];
    for (const sivu of KULTTUURI_KATEGORIAT[kaupunki] ?? []) {
      // Historian hetket ovat oma korttinsa (js/historian-hetket.js).
      if (sivu.id?.startsWith('hetki-')) continue;
      for (const lehdessa of sivu.nostot ?? []) {
        const media = MEDIAKENTAT.filter((k) => lehdessa[k]);
        if (!media.length) continue;
        const kortilla = nostot.find((n) => n.otsikko === lehdessa.otsikko);
        if (!kortilla) continue;
        for (const kentta of media) {
          assert.equal(kortilla[kentta], lehdessa[kentta],
            `${kaupunki}/${sivu.id}: "${lehdessa.otsikko}" on myös kartalla `
            + `(${kortilla.id}), joten kentän ${kentta} pitää olla kortilla`);
        }
      }
    }
  }
});

test('erän 10 viisi musiikkinostoa asuvat kortilla eivätkä enää lehdessä', () => {
  /*
   * Nimetty vartio raportin luvun 6 listalle: nämä viisi jäivät sivulle
   * PELKÄSTÄÄN musiikki- tai äänikentän takia. Madridin chotis ei ole
   * listalla — se jää sivulle kulttuurivisan lähdejuttuna (avoin 11.2).
   */
  const SIIRTYNEET = [
    ['lontoo', 'abbey-roadin-suojatie', 'Suojatie, jota jonotetaan'],
    ['rooma', 'rooman-kolikko', 'Kolikko olan yli'],
    ['berliini', 'marlene-dietrich', 'Tyttö Schönebergistä lauloi maailman ympäri'],
    ['wien', 'tonava-kaunoinen', 'Kaupunki sävelsi oman jokensa'],
    ['wien', 'taikahuilu-wiedenissa', 'Taikahuilu tehtiin esikaupungin teatteriin'],
  ];
  for (const [kaupunki, tunnus, otsikko] of SIIRTYNEET) {
    const nosto = (FOKUSVIRRAT[kaupunki]?.takynostot ?? []).find((n) => n.id === tunnus);
    assert.ok(nosto, `${kaupunki}: nostoa ${tunnus} ei löydy kartalta`);
    assert.ok(MEDIAKENTAT.some((k) => nosto[k]),
      `${kaupunki}/${tunnus}: kortilta puuttuvat musiikki- ja äänikentät`);
    const lehdessa = (KULTTUURI_KATEGORIAT[kaupunki] ?? [])
      .flatMap((sivu) => sivu.nostot ?? [])
      .some((n) => n.otsikko === otsikko);
    assert.equal(lehdessa, false,
      `${kaupunki}: "${otsikko}" on yhä lehden sivulla — kaksoiskappale palasi`);
  }
});

/* ================================================================= */
/* Pieni DOM-malli kortin ladontaa varten                            */
/* ================================================================= */

class Teksti {
  constructor(data) {
    this.nodeType = 3;
    this.nodeValue = data;
    this.parentNode = null;
  }
}

class Elementti {
  constructor(nimi) {
    this.nodeType = 1;
    this.nodeName = String(nimi).toUpperCase();
    this.childNodes = [];
    this.parentNode = null;
    this.luokat = [];
    this.attrs = {};
    this.style = {};
    this.dataset = {};
    this.hidden = false;
    this.kuuntelijat = new Map();
    this.naturalWidth = 1536;
    this.naturalHeight = 1024;
    const itse = this;
    this.classList = {
      add: (...n) => { for (const x of n) if (!itse.luokat.includes(x)) itse.luokat.push(x); },
      remove: (...n) => { itse.luokat = itse.luokat.filter((x) => !n.includes(x)); },
      contains: (n) => itse.luokat.includes(n),
      toggle: (n, paalle) => (paalle ? itse.classList.add(n) : itse.classList.remove(n)),
    };
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) { this.luokat = String(arvo).split(/\s+/).filter(Boolean); }

  get children() { return this.childNodes.filter((n) => n.nodeType === 1); }

  get childElementCount() { return this.children.length; }

  get isConnected() { return true; }

  set textContent(arvo) {
    this.childNodes = [];
    if (arvo !== '' && arvo != null) this.appendChild(new Teksti(String(arvo)));
  }

  get textContent() {
    return this.childNodes.map((n) => (n.nodeType === 3 ? n.nodeValue : n.textContent)).join('');
  }

  set innerHTML(arvo) { this.htmlSisus = String(arvo); this.childNodes = []; }

  get innerHTML() { return this.htmlSisus ?? ''; }

  appendChild(solmu) {
    solmu.parentNode?.removeChild?.(solmu);
    solmu.parentNode = this;
    this.childNodes.push(solmu);
    return solmu;
  }

  append(...solmut) { for (const s of solmut) this.appendChild(s); }

  replaceChildren(...solmut) {
    for (const s of this.childNodes) s.parentNode = null;
    this.childNodes = [];
    for (const s of solmut) this.appendChild(s);
  }

  removeChild(solmu) {
    const i = this.childNodes.indexOf(solmu);
    if (i >= 0) this.childNodes.splice(i, 1);
    solmu.parentNode = null;
    return solmu;
  }

  insertBefore(solmu, viite) {
    const i = this.childNodes.indexOf(viite);
    solmu.parentNode = this;
    this.childNodes.splice(i < 0 ? this.childNodes.length : i, 0, solmu);
    return solmu;
  }

  remove() { this.parentNode?.removeChild(this); }

  setAttribute(nimi, arvo) { this.attrs[nimi] = String(arvo); }

  setAttributeNS(_ns, nimi, arvo) { this.setAttribute(nimi, arvo); }

  getAttribute(nimi) { return this.attrs[nimi] ?? null; }

  removeAttribute(nimi) { delete this.attrs[nimi]; }

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, []);
    this.kuuntelijat.get(laji).push(fn);
  }

  removeEventListener() {}

  /** Testin oma laukaisin: napautus tähän elementtiin. */
  napauta() {
    for (const fn of this.kuuntelijat.get('click') ?? []) fn({ stopPropagation() {} });
  }

  closest(valitsin) {
    let solmu = this;
    while (solmu) {
      if (solmu.osuu?.(valitsin)) return solmu;
      solmu = solmu.parentNode;
    }
    return null;
  }

  osuu(valitsin) {
    if (valitsin.startsWith('.')) return this.luokat.includes(valitsin.slice(1));
    return this.nodeName === valitsin.toUpperCase();
  }

  querySelectorAll(valitsin) {
    const osat = valitsin.split(',').map((o) => o.trim()).filter(Boolean);
    const loydot = [];
    for (const lapsi of this.children) {
      if (osat.some((o) => lapsi.osuu(o))) loydot.push(lapsi);
      loydot.push(...lapsi.querySelectorAll(valitsin));
    }
    return loydot;
  }

  querySelector(valitsin) { return this.querySelectorAll(valitsin)[0] ?? null; }

  getBoundingClientRect() {
    return { x: 0, left: 0, y: 0, top: 0, width: 600, height: 400 };
  }
}

/**
 * Malli asennetaan globaaleihin kuten tests/nostokuva-kortit.test.mjs:ssä.
 * Tyylilinkkiä ei ole, joten nostoLataaTyyli palaa hiljaa.
 */
function asennaMalli() {
  const body = new Elementti('body');
  const head = new Elementti('head');
  globalThis.document = {
    createElement: (nimi) => new Elementti(nimi),
    createElementNS: (_ns, nimi) => new Elementti(nimi),
    createTextNode: (teksti) => new Teksti(teksti),
    getElementById: () => null,
    querySelector: (v) => body.querySelector(v),
    querySelectorAll: (v) => body.querySelectorAll(v),
    addEventListener: () => {},
    removeEventListener: () => {},
    head,
    body,
  };
  globalThis.innerWidth = 900;
  globalThis.innerHeight = 1200;
  globalThis.requestAnimationFrame = () => 0;
  globalThis.getComputedStyle = () => ({
    paddingLeft: '12px', paddingRight: '12px', borderLeftWidth: '0px',
    borderRightWidth: '0px', marginLeft: '0px', marginRight: '0px',
  });
  globalThis.window = { addEventListener: () => {}, removeEventListener: () => {} };
  return body;
}

/**
 * Tynkä-ui: kortin avaus tarvitsee vain kaupungin ja pelaajan.
 * `lisaaNostonNapit` on SAMA rajapinta kuin js/ui.js:llä ja piirtää
 * tässä yhden napin per mediakenttä, jotta rivi on mitattavissa ilman
 * koko käyttöliittymän tuontia.
 */
function tynkaUi(cityId) {
  const saadut = [];
  return {
    saadut,
    game: {
      pack: { id: 'testi' },
      player: { isBot: false },
      cityOf: () => ({ id: cityId }),
      minitehtavatVastatut: new Set(),
      actionMinitehtava: () => ({ ok: true }),
    },
    lisaaNostonNapit(rivi, nosto) {
      saadut.push(nosto);
      /*
       * Musiikkilinkit tulevat OIKEASTA apurista (js/ui.js
       * nostonMusiikkilinkit), jotta linkkilista mitataan samalla
       * säännöllä kuin pelissä. Loput kentät ovat yksi nappi kukin.
       */
      for (const musiikki of nostonMusiikkilinkit(nosto)) {
        const linkki = new Elementti('a');
        linkki.className = 'kulttuuri-musiikkilinkki';
        linkki.setAttribute('href', musiikki.url);
        linkki.textContent = musiikki.nakyva;
        rivi.appendChild(linkki);
      }
      for (const kentta of MEDIAKENTAT) {
        if (kentta === 'musiikki' || !nosto[kentta]) continue;
        const nappi = new Elementti('button');
        nappi.className = 'kulttuuri-kuuntele';
        rivi.appendChild(nappi);
      }
    },
    buildToast: () => null,
    removeToast: () => {},
    onChange: () => {},
    renderTurnPill: () => {},
  };
}

/** Avaa yhden kartan noston kortin mallissa. */
async function avaaKortti(cityId, nostoId) {
  const body = asennaMalli();
  const { avaaNostonTunnuksella } = await import('../js/fokusnosto.js');
  const ui = tynkaUi(cityId);
  const aukesi = avaaNostonTunnuksella(ui, nostoId);
  /*
   * KUVA EDELLÄ (js/nostokuva.js): kuvallinen nosto avautuu ensin
   * pelkkänä kuvana, ja "Lisää" latoo varsinaisen kortin saman kuvan
   * ympärille. Sama napautus kuin savukkeessa
   * (tools/savukkeet/savuke-kaupunkien-nostot.mjs).
   */
  body.querySelector('.nostokuva-lisaa')?.napauta();
  const kortti = body.querySelector('.fokusnosto-kortti')
    ?? body.querySelector('.nostokuva-kortti');
  return { aukesi, ui, kortti, sisalto: kortti?.querySelector('.fokusnosto-sisalto') ?? null };
}

/* ================================================================= */
/* B. LADONTA — kortti piirtää kentät itse                           */
/* ================================================================= */

test('gallerian nosto saa kortille selailunuolet ja laskurin', async () => {
  const { aukesi, kortti } = await avaaKortti('berliini', 'gaertnerin-berliini');
  assert.equal(aukesi, true, 'kortti ei auennut');
  assert.ok(kortti.querySelector('.nostosarja-kuva'), 'kuvasarjan kehys puuttuu kortilta');
  assert.equal(kortti.querySelectorAll('.nostosarja-kuvanuoli').length, 2,
    'kortilta puuttuvat gallerian selailunuolet');
  const laskuri = kortti.querySelector('.nostosarja-kuvalaskuri');
  assert.ok(laskuri, 'kortilta puuttuu gallerian laskuri');
  assert.equal(laskuri.textContent, '1 / 6',
    'laskurin pitää tuntea kaikki kuusi kuvaa — myös se, jota juttu ei näytä');
});

test('kuvaton ja galleriaton nosto piirtyy kuten ennenkin', async () => {
  const { aukesi, kortti } = await avaaKortti('berliini', 'hattupainen-ukkeli');
  assert.equal(aukesi, true, 'kortti ei auennut');
  assert.equal(kortti.querySelectorAll('.nostosarja-kuvanuoli').length, 0,
    'yhden kuvan nostolle ei tule selailunuolia');
  assert.equal(kortti.querySelector('.fokusnosto-media'), null,
    'mediatonta riviä ei saa syntyä');
});

test('musiikkinosto saa kortille mediarivin samoilla napeilla kuin lehti', async () => {
  const { aukesi, kortti, ui } = await avaaKortti('wien', 'taikahuilu-wiedenissa');
  assert.equal(aukesi, true, 'kortti ei auennut');
  const rivi = kortti.querySelector('.fokusnosto-media');
  assert.ok(rivi, 'kortilta puuttuu mediarivi');
  assert.ok(rivi.querySelector('.kulttuuri-musiikkilinkki'), 'Apple Music -linkki puuttuu');
  assert.ok(rivi.querySelector('.kulttuuri-kuuntele'), 'ääninäytteen nappi puuttuu');
  // Kortti antaa apurille NOSTON SELLAISENAAN, kuten lehden sivu tekee.
  assert.equal(ui.saadut.length, 1, 'lisaaNostonNapit kutsuttiin väärän monta kertaa');
  assert.ok(ui.saadut[0].musiikkiNayte, 'apurille annettu nosto on ilman mediakenttiä');
});

test('ääninosto saa mediarivin myös ilman musiikkilinkkiä', async () => {
  const { aukesi, kortti } = await avaaKortti('rooma', 'rooman-kolikko');
  assert.equal(aukesi, true, 'kortti ei auennut');
  const rivi = kortti.querySelector('.fokusnosto-media');
  assert.ok(rivi, 'kortilta puuttuu mediarivi');
  assert.ok(rivi.querySelector('.kulttuuri-kuuntele'), 'ääninäytteen nappi puuttuu');
  assert.equal(rivi.querySelector('.kulttuuri-musiikkilinkki'), null,
    'ilman musiikkikenttää ei tule Apple Music -linkkiä');
});

/* ================================================================= */
/* C. MUSIIKKILINKKIEN LISTA (Fablen päätös 14.9.2026)               */
/* ================================================================= */

test('yhden linkin muoto säilyy ennallaan', () => {
  const yksi = nostonMusiikkilinkit({
    musiikki: 'https://music.apple.com/fi/search?term=bizet%20carmen',
    musiikkiNimi: 'Bizet’n Carmen Apple Musicissa',
  });
  assert.equal(yksi.length, 1);
  assert.equal(yksi[0].url, 'https://music.apple.com/fi/search?term=bizet%20carmen');
  // Näkyvä teksti on entinen "Apple Music": sadat nostot eivät saa
  // muuttua siitä, että lista tuli mahdolliseksi.
  assert.equal(yksi[0].nakyva, 'Apple Music');
  assert.equal(yksi[0].otsake, 'Bizet’n Carmen Apple Musicissa');
  assert.deepEqual(nostonMusiikkilinkit({}), []);
  assert.deepEqual(nostonMusiikkilinkit({ musiikki: '' }), []);
});

test('linkkilista antaa jokaiselle linkille oman näkyvän nimen', () => {
  const lista = nostonMusiikkilinkit({
    musiikki: [
      { nimi: 'Édith Piaf', url: 'https://music.apple.com/a' },
      { nimi: 'Django Reinhardt', url: 'https://music.apple.com/b' },
      { nimi: 'Rikkinäinen', url: '' },
      null,
    ],
  });
  assert.equal(lista.length, 2, 'osoitteeton alkio ei saa päätyä kortille');
  assert.deepEqual(lista.map((l) => l.nakyva), ['Édith Piaf', 'Django Reinhardt']);
  assert.equal(new Set(lista.map((l) => l.nakyva)).size, 2,
    'kahta samannimistä linkkiä ei erottaisi toisistaan');
  assert.deepEqual(lista.map((l) => l.url),
    ['https://music.apple.com/a', 'https://music.apple.com/b']);
});

test('Pariisin kolme Apple Music -linkkiä ovat pelissä', () => {
  /*
   * Erä 5 pudotti nämä kolme linkkiä hiljaa, kun lehden nostot
   * siirtyivät kartalle (erän 10 raportti, avoin kohta 11.1).
   * Osoitteet ovat merkki merkiltä samat kuin ennen erää 5
   * (git show 721efc3 -- js/packs/kulttuuri-kategoriat.js).
   */
  const nostot = FOKUSVIRRAT.pariisi?.takynostot ?? [];
  const soi = nostot.find((n) => n.id === 'pariisi-soi');
  const carmen = nostot.find((n) => n.id === 'carmenin-ensi-ilta');
  assert.ok(soi && carmen, 'Pariisin nostot puuttuvat');

  const soiLinkit = nostonMusiikkilinkit(soi);
  assert.equal(soiLinkit.length, 2, 'pariisi-soi kantaa kaksi linkkiä');
  assert.deepEqual(soiLinkit.map((l) => l.url), [
    'https://music.apple.com/fi/search?term=edith%20piaf%20la%20vie%20en%20rose',
    'https://music.apple.com/fi/search?term=django%20reinhardt%20minor%20swing',
  ]);
  assert.deepEqual(soiLinkit.map((l) => l.nakyva), ['Édith Piaf', 'Django Reinhardt']);

  const carmenLinkit = nostonMusiikkilinkit(carmen);
  assert.equal(carmenLinkit.length, 1);
  assert.equal(carmenLinkit[0].url, 'https://music.apple.com/fi/search?term=bizet%20carmen');
});

test('kahden linkin nosto saa kortille kaksi eri nimistä linkkiä', async () => {
  const { aukesi, kortti } = await avaaKortti('pariisi', 'pariisi-soi');
  assert.equal(aukesi, true, 'kortti ei auennut');
  const rivi = kortti.querySelector('.fokusnosto-media');
  assert.ok(rivi, 'kortilta puuttuu mediarivi');
  const linkit = rivi.querySelectorAll('.kulttuuri-musiikkilinkki');
  assert.equal(linkit.length, 2, 'kortilla pitää olla kaksi musiikkilinkkiä');
  assert.deepEqual(linkit.map((l) => l.textContent), ['Édith Piaf', 'Django Reinhardt']);
  // Automaattista esikuuntelunappia ei tule listalle: kaksi
  // samannimistä "Kuuntele näyte" ei kertoisi kumpi soi.
  assert.equal(rivi.querySelector('.kulttuuri-kuuntele'), null,
    'linkkilistalle ei piirretä automaattista esikuuntelunappia');
});
