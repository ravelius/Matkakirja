/*
 * LUKIJA KAIKKIIN TEKSTIKORTTEIHIN (js/lukija.js lisaaLukijanappi).
 *
 * Omistajan linjaus 6.9.2026 illalla (iPad, skandaalikortti "Valokuva
 * paljasti aarrevarkauden"): *"Kaikissa missä on tekstiä, saisi olla
 * striimi lukijan symboli"*. Tämä testi vartioi kolmea asiaa, joita ei
 * näe diffistä eikä ruutukaappauksesta:
 *
 *   1. APURI LISÄÄ NAPIN KERRAN. Kortti voidaan varustaa uudestaan
 *      (sisältö vaihtuu, sivu kääntyy), eikä siitä saa syntyä kahta
 *      kaiutinta samaan otsikkoriviin.
 *   2. TEKSTI KOOTAAN OIKEIN. Kortilla on lehden maston kaltaisia
 *      taittorivejä (ylärivi, "Lisälehti", päiväys, lähderivi) ja
 *      minivisa. Ne ovat kappale-elementtejä, joten ne EIVÄT jää pois
 *      lajinsa perusteella — jos ohituslista pettää, lukija lausuu
 *      visan oikean vastauksen ääneen.
 *   3. KORTIN SULKEMINEN PYSÄYTTÄÄ. Kelluva kortti ei ole <dialog>
 *      vaan kerros, joka poistetaan DOM:sta; ilman irtoamisvahtia
 *      luenta jatkuisi tyhjän ruudun päällä.
 *
 * Lisäksi tekstitesti varmistaa, että jokainen tekstikorttiperhe
 * KUTSUU apuria — uusi kortti ei saa unohtaa kaiutinta.
 *
 * DOM-osuus ajetaan pienellä omalla puumallilla samaan tapaan kuin
 * tests/lukija.test.mjs: Nodessa ei ole selainta, eikä repoon oteta
 * jsdomia yhtä testiä varten. Malli toteuttaa täsmälleen ne kentät,
 * joita liitaLukija ja kokoaLuettavaTeksti DOMilta kysyvät. Globaalit
 * asetetaan ENNEN moduulin tuontia (dynaaminen import), koska
 * js/lukija.js kytkee tarkkailijansa moduulitasolla.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli                                                   */
/* ---------------------------------------------------------------- */

class Teksti {
  constructor(data) {
    this.nodeType = 3;
    this.data = data;
  }
}

/** Yhden valitsimen osuma: #id, .luokka, [attr="arvo"] tai tagi. */
function osuuYhteen(el, valitsin) {
  const v = valitsin.trim();
  if (!v) return false;
  if (v.startsWith('#')) return el.id === v.slice(1);
  if (v.startsWith('.')) return el.luokat.includes(v.slice(1));
  const attr = /^\[([\w-]+)="([^"]*)"\]$/.exec(v);
  if (attr) return el.attrs[attr[1]] === attr[2];
  return el.nodeName === v.toUpperCase();
}

class Elementti {
  constructor(nimi, doc) {
    this.nodeType = 1;
    this.nodeName = String(nimi).toUpperCase();
    this.tagName = this.nodeName;
    this.ownerDocument = doc;
    this.childNodes = [];
    this.parentNode = null;
    this.luokat = [];
    this.attrs = {};
    this.dataset = {};
    this.hidden = false;
    this.id = '';
    this.title = '';
    this.type = '';
    this.innerHTML = '';
    this.kuuntelijat = new Map();
    const luokat = this.luokat;
    this.classList = {
      add: (...n) => n.forEach((x) => { if (!luokat.includes(x)) luokat.push(x); }),
      remove: (...n) => n.forEach((x) => {
        const i = luokat.indexOf(x);
        if (i >= 0) luokat.splice(i, 1);
      }),
      contains: (n) => luokat.includes(n),
      toggle: (n, tila) => {
        const halutaan = tila === undefined ? !luokat.includes(n) : Boolean(tila);
        if (halutaan) this.classList.add(n);
        else this.classList.remove(n);
        return halutaan;
      },
    };
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) {
    this.luokat.length = 0;
    for (const osa of String(arvo).split(/\s+/)) if (osa) this.luokat.push(osa);
  }

  appendChild(lapsi) {
    if (lapsi.parentNode) lapsi.parentNode.removeChild(lapsi);
    lapsi.parentNode = this;
    this.childNodes.push(lapsi);
    return lapsi;
  }

  removeChild(lapsi) {
    const i = this.childNodes.indexOf(lapsi);
    if (i >= 0) this.childNodes.splice(i, 1);
    lapsi.parentNode = null;
    return lapsi;
  }

  remove() {
    this.parentNode?.removeChild(this);
  }

  get isConnected() {
    let solmu = this;
    while (solmu) {
      if (solmu === this.ownerDocument.body) return true;
      solmu = solmu.parentNode;
    }
    return false;
  }

  matches(valitsin) {
    return String(valitsin).split(',').some((osa) => osuuYhteen(this, osa));
  }

  * jalkelaiset() {
    for (const lapsi of this.childNodes) {
      if (lapsi.nodeType !== 1) continue;
      yield lapsi;
      yield* lapsi.jalkelaiset();
    }
  }

  querySelector(valitsin) {
    for (const el of this.jalkelaiset()) if (el.matches(valitsin)) return el;
    return null;
  }

  querySelectorAll(valitsin) {
    return [...this.jalkelaiset()].filter((el) => el.matches(valitsin));
  }

  setAttribute(nimi, arvo) { this.attrs[nimi] = String(arvo); }

  getAttribute(nimi) {
    return Object.prototype.hasOwnProperty.call(this.attrs, nimi) ? this.attrs[nimi] : null;
  }

  addEventListener(nimi, fn) {
    if (!this.kuuntelijat.has(nimi)) this.kuuntelijat.set(nimi, []);
    this.kuuntelijat.get(nimi).push(fn);
  }

  /** Napautus ilman selainta: sama kuin oikea click kuuntelijoineen. */
  click() {
    const tapahtuma = { type: 'click', target: this, stopPropagation() {} };
    for (const fn of this.kuuntelijat.get('click') ?? []) fn(tapahtuma);
  }
}

/* ---------------------------------------------------------------- */
/* Selainympäristö: dokumentti, puhesyntetisaattori, tarkkailija      */
/* ---------------------------------------------------------------- */

const asiakirja = {
  kuuntelijat: new Map(),
  createElement(nimi) { return new Elementti(nimi, asiakirja); },
  addEventListener(nimi, fn) {
    if (!asiakirja.kuuntelijat.has(nimi)) asiakirja.kuuntelijat.set(nimi, []);
    asiakirja.kuuntelijat.get(nimi).push(fn);
  },
  querySelectorAll(valitsin) { return asiakirja.body.querySelectorAll(valitsin); },
};
asiakirja.body = new Elementti('body', asiakirja);

/** Puhutut palat talteen: laitteen oma ääni on testin taustajärjestelmä. */
const puhutut = [];
const synth = {
  paused: false,
  speaking: false,
  pending: false,
  getVoices() { return []; },
  cancel() { puhutut.push('[cancel]'); },
  resume() {},
  speak(lausuma) { puhutut.push(lausuma.text); },
};

class Lausuma {
  constructor(teksti) {
    this.text = teksti;
    this.lang = '';
    this.onend = null;
    this.onerror = null;
  }
}

/** Tarkkailijan koukut talteen, jotta ne voi laukaista käsin. */
const tarkkailijat = [];
class MutaatioTarkkailija {
  constructor(fn) { this.fn = fn; }

  observe() { tarkkailijat.push(this.fn); }

  disconnect() {}
}

globalThis.document = asiakirja;
globalThis.window = {
  innerHeight: 800,
  speechSynthesis: synth,
  SpeechSynthesisUtterance: Lausuma,
};
globalThis.MutationObserver = MutaatioTarkkailija;

const {
  kokoaLuettavaTeksti, lisaaLukijanappi, lukijaLukee, pysaytaLukija,
} = await import('../js/lukija.js');

/* ---------------------------------------------------------------- */
/* Koekortti: skandaalin lisälehti pienoiskoossa                     */
/* ---------------------------------------------------------------- */

const el = (nimi, luokat = [], ...lapset) => {
  const solmu = new Elementti(nimi, asiakirja);
  solmu.className = luokat.join(' ');
  for (const lapsi of lapset) {
    solmu.appendChild(typeof lapsi === 'string' ? new Teksti(lapsi) : lapsi);
  }
  return solmu;
};

/**
 * Sama rakenne kuin js/skandaalit.js piirtää: ylärivi, nimiö, päiväys,
 * lööppiotsikko, ingressi, leipä, lähderivi ja minivisa.
 */
function skandaalikortti() {
  return el('div', ['skandaali-kortti', 'fokusnosto-looppi'],
    el('div', ['fokusnosto-sisalto'],
      el('p', ['fokusnosto-ylarivi'], 'Skandaali'),
      el('p', ['looppi-nimio'], 'Lisälehti'),
      el('p', ['looppi-paivays'], 'Ateena · 1896'),
      el('h3', ['fokusnosto-kortti-otsikko', 'looppi-otsikko'], 'Valokuva paljasti aarrevarkauden'),
      el('p', ['looppi-ingressi'], 'Kaivauksilta katosi kultainen kiekko.'),
      el('div', ['fokusnosto-teksti', 'looppi-leipa'],
        el('p', [], 'Varas jäi kiinni omasta muotokuvastaan.'),
        el('p', [], 'Juttu ratkesi kolmessa päivässä.')),
      el('p', ['fokusnosto-lahde'], 'en-Wikipedia, tarkistettu 6.9.2026'),
      el('div', ['fokusvirta-visa', 'skandaali-visa'],
        el('p', ['fokusvirta-visa-kysymys'], 'Mikä paljasti varkaan?'),
        el('p', ['fokusvirta-visa-palkkio'], 'Palkkio 50 puntaa'))));
}

/* ---------------------------------------------------------------- */
/* Testit                                                            */
/* ---------------------------------------------------------------- */

test('apuri lisää kaiuttimen otsikkoriville — ja vain kerran', () => {
  const kortti = skandaalikortti();
  asiakirja.body.appendChild(kortti);
  try {
    const eka = lisaaLukijanappi(kortti, { otsikko: 'Kuuntele lisälehti' });
    assert.ok(eka, 'nappia ei syntynyt');
    const rivi = kortti.querySelector('.fokusnosto-ylarivi');
    assert.equal(eka.parentNode, rivi, 'kaiutin ei mennyt otsikkoriville');
    assert.ok(rivi.classList.contains('lukija-otsikkorivi'), 'rivi jäi asemoimatta');
    assert.ok(eka.classList.contains('lukija-nappi'));
    assert.ok(eka.classList.contains('lukija-kortti'));

    // Uusi varustus samalle kortille: sama nappi, ei kaksosta.
    const toka = lisaaLukijanappi(kortti, { otsikko: 'Kuuntele lisälehti' });
    assert.equal(toka, eka, 'toinen kutsu loi uuden napin');
    assert.equal(kortti.querySelectorAll('.lukija-nappi').length, 1);
  } finally {
    kortti.remove();
    pysaytaLukija();
  }
});

test('luettava teksti: lööppi ja leipä mukaan, taittorivit ja visa ulos', () => {
  const kortti = skandaalikortti();
  // Kortin kaiutin lukee otsikon mukaan (ohitaEkaOtsikko: false).
  const teksti = kokoaLuettavaTeksti(kortti, { ohitaEkaOtsikko: false });

  assert.match(teksti, /Valokuva paljasti aarrevarkauden/, 'lööppi jäi lukematta');
  assert.match(teksti, /Kaivauksilta katosi kultainen kiekko/, 'ingressi jäi lukematta');
  assert.match(teksti, /Varas jäi kiinni omasta muotokuvastaan/, 'leipä jäi lukematta');
  assert.match(teksti, /Juttu ratkesi kolmessa päivässä/);

  // Taittorivit ovat kappale-elementtejä — ne jäävät pois vain, jos
  // ohituslista tuntee ne.
  assert.doesNotMatch(teksti, /Skandaali/, 'ylärivi luettiin');
  assert.doesNotMatch(teksti, /Lisälehti/, 'nimiö luettiin');
  assert.doesNotMatch(teksti, /1896/, 'päiväysrivi luettiin');
  assert.doesNotMatch(teksti, /tarkistettu/, 'lähderivi luettiin');
  // SPOILERISUOJA: minivisa ei kuulu luentaan.
  assert.doesNotMatch(teksti, /Mikä paljasti varkaan/, 'visan kysymys luettiin');
  assert.doesNotMatch(teksti, /Palkkio/, 'visan palkkiorivi luettiin');
});

test('kaiuttimen painallus lukee kortin, kortin sulkeminen pysäyttää', () => {
  const kortti = skandaalikortti();
  asiakirja.body.appendChild(kortti);
  puhutut.length = 0;
  try {
    const nappi = lisaaLukijanappi(kortti);
    assert.ok(nappi);
    assert.equal(nappi.hidden, false, 'kaiutin piiloutui vaikka tekstiä on');

    nappi.click();
    assert.equal(lukijaLukee(nappi), true, 'luenta ei lähtenyt käyntiin');
    // Luenta alkaa kortin lööpistä, ei keskeltä juttua.
    const lausutut = puhutut.filter((x) => x !== '[cancel]');
    assert.match(lausutut[0] ?? '', /^Valokuva paljasti aarrevarkauden/);

    // Kortin sulkeminen = kerros pois DOM:sta. Tarkkailija huomaa
    // napin irronneen ja vaientaa luennan.
    kortti.remove();
    assert.equal(tarkkailijat.length > 0, true, 'tarkkailijaa ei kytketty');
    for (const koukku of tarkkailijat) koukku([]);
    assert.equal(lukijaLukee(), false, 'luenta jatkui suljetun kortin alla');
  } finally {
    pysaytaLukija();
    kortti.remove();
  }
});

test('tyhjä kortti ei tarjoa kaiutinta', () => {
  const kortti = el('div', ['fokuskohde-popup'],
    el('p', ['fokuskohde-ylarivi'], 'Nähtävyys'),
    el('h3', ['fokuskohde-otsikko'], 'Ólympos'));
  asiakirja.body.appendChild(kortti);
  try {
    const nappi = lisaaLukijanappi(kortti);
    assert.ok(nappi, 'nappi luodaan, mutta piilotettuna');
    assert.equal(nappi.hidden, true, 'tekstitön kortti tarjosi hiljaisuutta');
  } finally {
    kortti.remove();
  }
});

/* ---------------------------------------------------------------- */
/* Tekstitesti: jokainen tekstikorttiperhe kutsuu apuria             */
/* ---------------------------------------------------------------- */

/**
 * Korttiperheet, joissa on leipätekstiä. Lista on tarkoituksella
 * tässä eikä koodissa: kun uusi korttitiedosto lisätään peliin, tämä
 * testi ei kaadu itsestään — mutta yhdenkään näistä ei saa menettää
 * kaiutintaan huomaamatta (omistaja 6.9.2026: "Kaikissa missä on
 * tekstiä, saisi olla striimi lukijan symboli").
 */
const KORTTITIEDOSTOT = [
  'js/skandaalit.js', // lisälehti
  'js/fokuskohteet.js', // kartan kohdekortti
  'js/elaintaky.js', // eläintäky
  'js/fokusvirta.js', // kohtaamiskortti
  'js/fokusnosto.js', // täkynosto
  'js/syvennys.js', // syvennystarina
  'js/historian-hetket.js', // historian hetki
  'js/tiedeliite.js', // tiedeliitteen sivu
];

test('jokainen tekstikortti kutsuu jaettua apuria', () => {
  for (const polku of KORTTITIEDOSTOT) {
    const lahde = readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');
    assert.match(
      lahde,
      /import \{ lisaaLukijanappi \} from '\.\/lukija\.js';/,
      `${polku} ei tuo lisaaLukijanappia`,
    );
    assert.match(lahde, /lisaaLukijanappi\(/, `${polku} ei kutsu lisaaLukijanappia`);
  }
});

test('kortin taittorivit ja visa ovat ohituslistalla', () => {
  const lahde = readFileSync(new URL('../js/lukija.js', import.meta.url), 'utf8');
  const alku = lahde.indexOf('export const LUKIJAN_OHITETTAVAT');
  const loppu = lahde.indexOf('\n];', alku);
  assert.ok(alku > 0 && loppu > alku, 'ohituslistaa ei löytynyt');
  const lista = lahde.slice(alku, loppu);
  for (const valitsin of [
    '.fokusnosto-ylarivi', '.fokuskohde-ylarivi', '.fokusvirta-ylarivi',
    '.looppi-nimio', '.looppi-paivays', '.fokusnosto-lahde', '.fokuskohde-lahde',
    '.fokusvirta-visa',
  ]) {
    assert.ok(lista.includes(`'${valitsin}'`), `${valitsin} puuttuu ohituslistalta`);
  }
});
