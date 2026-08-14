/*
 * Lukijan tekstivalinta (js/lukija.js kokoaLuettavaTeksti).
 *
 * Tärkein testi tässä tiedostossa on VISASPOILERI. Lukija kokoaa
 * tekstin sivun DOMista, ja sivun pohjalla asuu kulttuurivisa
 * vaihtoehtoineen. Jos vaihtoehdot pääsisivät mukaan, laite lukisi
 * oikean vastauksen ääneen ennen kuin pelaaja on vastannut — vika ei
 * näkyisi ruudulla eikä diffiä lukemalla, vain kuuntelemalla. Sama
 * suoja on lisäksi selainsavukkeessa (tools/savuke-pollo.mjs), jossa
 * teksti luetaan oikeasta DOMista oikeassa selaimessa.
 *
 * DOM-osuus ajetaan pienellä omalla puumallilla samaan tapaan kuin
 * tests/pollo.test.mjs: Nodessa ei ole selainta, eikä repoon oteta
 * jsdomia yhtä testiä varten. Malli toteuttaa täsmälleen ne kentät,
 * joita kokoaLuettavaTeksti DOMilta kysyy.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  LUETTAVAN_KATTO,
  LUETTAVAN_VAHIMMAIS,
  LUKIJAN_OHITETTAVAT,
  kokoaLuettavaTeksti,
} from '../js/lukija.js';

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli                                                   */
/* ---------------------------------------------------------------- */

class Teksti {
  constructor(data) {
    this.nodeType = 3;
    this.data = data;
  }
}

class Elementti {
  constructor(nimi, { id = '', luokat = [], attrs = {}, hidden = false, lapset = [] } = {}) {
    this.nodeType = 1;
    this.nodeName = nimi.toUpperCase();
    this.id = id;
    this.luokat = [...luokat];
    this.attrs = { ...attrs };
    this.hidden = hidden;
    this.childNodes = [];
    for (const lapsi of lapset) this.childNodes.push(lapsi);
  }

  getAttribute(nimi) {
    return Object.prototype.hasOwnProperty.call(this.attrs, nimi) ? this.attrs[nimi] : null;
  }

  matches(valitsin) {
    if (valitsin.startsWith('#')) return this.id === valitsin.slice(1);
    if (valitsin.startsWith('.')) return this.luokat.includes(valitsin.slice(1));
    const attr = /^\[([\w-]+)="([^"]*)"\]$/.exec(valitsin);
    if (attr) return this.attrs[attr[1]] === attr[2];
    throw new Error(`DOM-malli ei tunne valitsinta ${valitsin}`);
  }
}

const el = (nimi, asetukset, ...lapset) => new Elementti(nimi, { ...asetukset, lapset });
const t = (teksti) => new Teksti(teksti);

/** Lehden aihesivu pienoiskoossa: juttu, kuvateksti, lähde ja visa. */
function aihesivu() {
  return el('div', { id: 'arrival-kategoria' },
    el('h3', { luokat: ['aihe-nimi'] }, t('Lontoon historia')),
    el('p', { luokat: ['johdanto'] }, t('Kaupunki kasvoi joen varrella.')),
    el('div', { luokat: ['wiki-nosto'] },
      el('div', { luokat: ['kuvakehys'] },
        el('img', {}),
        el('p', { luokat: ['selite'] }, t('Westminsterin silta vuonna 1747.')),
        el('p', { luokat: ['lahde'] }, t('Canaletto, Wikimedia Commons (PD)'))),
      el('div', { luokat: ['leipa'] },
        el('p', { luokat: ['teksti'] }, t('Sama venetsialainen maalasi myös Lontoon.')),
        el('button', { luokat: ['wiki-btn'] }, t('Lue lisää aiheesta')))),
    el('figure', { luokat: ['vinkki-hero'] },
      el('img', {}),
      el('figcaption', { luokat: ['vinkki-hero-teksti'] }, t('Kew Gardens ilmasta.'))));
}

/**
 * Maalehden alku: tilastorivit, tervehdykset ja vasta sitten juttu.
 *
 * Rakenne on sama kuin js/ui.js naytaMaaTunnusluvut piirtää.
 */
function maalehdenAlku() {
  return el('div', { id: 'arrival-maa' },
    el('div', { id: 'arrival-maa-tunnusluvut' },
      el('div', { luokat: ['maa-tunnusrivi'] },
        el('span', { luokat: ['maa-tunnus'] }, t('37,9 milj.'), el('span', { luokat: ['maa-sija'] }, t(' (36)'))),
        el('span', { luokat: ['maa-tunnus'] }, t('603 500 km²'))),
      el('div', { luokat: ['maa-tunnusrivi'] },
        el('span', { luokat: ['maa-tunnus'] }, el('button', { luokat: ['maa-demokratia'] }, t('0,34 · V-Dem'))))),
    el('div', { id: 'arrival-maa-tervehdykset' },
      el('span', { luokat: ['tervehdys'] }, t('Dobryi den 67 %')),
      el('span', { luokat: ['tervehdys'] }, t('Zdrastvuite 30 %'))),
    el('p', { luokat: ['arrival-intro'] }, t('Ukraina on suurin kokonaan Euroopassa sijaitseva maa.')));
}

/** Visa asuu samassa dialogissa sivun perässä. */
function visa() {
  return el('div', { id: 'arrival-kulttuuri' },
    el('div', { id: 'arrival-kulttuuri-visa' },
      el('p', { id: 'arrival-kulttuuri-kysymys' }, t('Minä vuonna metro avattiin?')),
      el('div', { id: 'arrival-kulttuuri-vaihtoehdot' },
        el('button', {}, t('1863')),
        el('button', {}, t('1901')))));
}

test('kappaleet luetaan, mutta sivun ensimmäistä otsikkoa ei (omistajan toive 14.8.2026)', () => {
  const teksti = kokoaLuettavaTeksti(aihesivu());
  const rivit = teksti.split('\n');
  // Ensimmäinen otsikko on sama, jonka lukija näki avatessaan sivun —
  // luenta menee suoraan asiaan.
  assert.ok(!rivit.includes('Lontoon historia.'), teksti);
  assert.ok(rivit.includes('Kaupunki kasvoi joen varrella.'), teksti);
  assert.ok(rivit.includes('Sama venetsialainen maalasi myös Lontoon.'), teksti);
});

test('myöhemmät otsikot luetaan — vain ensimmäinen ohitetaan', () => {
  const sivu = el('div', {},
    el('h3', {}, t('Ensimmäinen otsikko')),
    el('p', {}, t('Alkukappale.')),
    el('h3', {}, t('Väliotsikko')),
    el('p', {}, t('Jatkokappale.')));
  const teksti = kokoaLuettavaTeksti(sivu);
  assert.ok(!/Ensimmäinen otsikko/.test(teksti), teksti);
  assert.match(teksti, /Väliotsikko/);
  assert.match(teksti, /Jatkokappale/);
});

test('ohitaEkaOtsikko: false palauttaa vanhan käytöksen', () => {
  const teksti = kokoaLuettavaTeksti(aihesivu(), { ohitaEkaOtsikko: false });
  assert.match(teksti, /Lontoon historia/);
});

test('lähdemerkinnät jäävät lukematta', () => {
  const teksti = kokoaLuettavaTeksti(aihesivu());
  assert.ok(!/Canaletto/.test(teksti), teksti);
  assert.ok(!/Commons/.test(teksti), teksti);
});

test('kuvatekstit ja selitteet jäävät lukematta', () => {
  const teksti = kokoaLuettavaTeksti(aihesivu());
  assert.ok(!/Westminsterin silta/.test(teksti), teksti);
  assert.ok(!/Kew Gardens/.test(teksti), teksti);
});

test('napit eivät ole luettavaa sisältöä', () => {
  const teksti = kokoaLuettavaTeksti(aihesivu());
  assert.ok(!/Lue lisää aiheesta/.test(teksti), teksti);
});

test('SPOILERISUOJA: visan kysymys eikä vastausvaihtoehdot päädy luentaan', () => {
  const sivu = el('div', {}, aihesivu(), visa());
  const teksti = kokoaLuettavaTeksti(sivu);
  assert.ok(!/Minä vuonna metro avattiin/.test(teksti), teksti);
  assert.ok(!/1863/.test(teksti), teksti);
  assert.ok(!/1901/.test(teksti), teksti);
  // Itse juttu on silti mukana — suoja ei saa syödä sivua.
  assert.match(teksti, /Kaupunki kasvoi joen varrella/);
});

test('piilotettu sivu ohitetaan: lehden kaikki sivut ovat samassa dialogissa', () => {
  const kortti = el('div', { luokat: ['dialog-card'] },
    el('div', { luokat: ['arrival-palstat'], hidden: true },
      el('p', { id: 'arrival-intro' }, t('Tämä sivu ei ole auki.'))),
    aihesivu());
  const teksti = kokoaLuettavaTeksti(kortti);
  assert.ok(!/ei ole auki/.test(teksti), teksti);
  assert.match(teksti, /Kaupunki kasvoi joen varrella/);
});

test('aria-hidden ja data-lukija="ei" ohitetaan', () => {
  const sivu = el('div', {},
    el('p', { attrs: { 'aria-hidden': 'true' } }, t('Koriste.')),
    el('p', { attrs: { 'data-lukija': 'ei' } }, t('Ei luettavaksi.')),
    el('p', {}, t('Tämä luetaan.')));
  const teksti = kokoaLuettavaTeksti(sivu);
  assert.equal(teksti, 'Tämä luetaan.');
});

test('jokainen pala saa päätemerkin, jotta lukija pitää tauon', () => {
  // Väliotsikko (toinen otsikko) saa pisteen — ensimmäinen ohitetaan.
  const sivu = el('div', {},
    el('h3', {}, t('Sivun otsikko')),
    el('h3', {}, t('Otsikko')),
    el('p', {}, t('Kappale?')));
  assert.equal(kokoaLuettavaTeksti(sivu), 'Otsikko.\nKappale?');
});

test('pitkä sivu katkaistaan virkkeen rajalta', () => {
  const virke = 'Tämä on yksi tavallisen mittainen virke matkakirjasta. ';
  const sivu = el('div', {}, el('p', {}, t(virke.repeat(60))));
  const teksti = kokoaLuettavaTeksti(sivu, { katto: 400 });
  assert.ok(teksti.length <= 400, String(teksti.length));
  assert.ok(teksti.endsWith('.'), teksti);
});

test('tyhjä tai puuttuva juuri ei kaadu', () => {
  assert.equal(kokoaLuettavaTeksti(null), '');
  assert.equal(kokoaLuettavaTeksti(el('div', {})), '');
});

test('katot ovat järkevät', () => {
  assert.ok(LUETTAVAN_KATTO > LUETTAVAN_VAHIMMAIS);
  assert.ok(LUETTAVAN_VAHIMMAIS > 0);
});

/*
 * Maalehden tilastorivit ovat ruutugrafiikkaa, eivät luettavaa
 * (omistajan havainto 13.8.2026: luenta alkoi minuutin numerolitanialla
 * ennen kuin juttu edes alkoi).
 */
test('maalehden tilastorivit ja tervehdykset jäävät lukematta', () => {
  const teksti = kokoaLuettavaTeksti(maalehdenAlku());
  assert.ok(teksti.startsWith('Ukraina on suurin'), teksti);
  for (const kielletty of ['37,9', '603 500', 'V-Dem', 'Dobryi', 'Zdrastvuite', '67 %']) {
    assert.ok(!teksti.includes(kielletty), `tilastolohko vuoti luentaan: ${kielletty}`);
  }
});

/*
 * Ohituslistan ja pöllön spoilerilistan on pysyttävä yhtä mieltä
 * tehtävälohkoista: jos peliin lisätään uusi tehtävätyyppi ja se
 * muistetaan lisätä vain toiseen, toinen vuotaa.
 */
test('ohituslista kattaa pöllön spoilerilohkot', () => {
  const pollo = readFileSync(new URL('../js/pollo.js', import.meta.url), 'utf8');
  const lohko = pollo.match(/export const SPOILERI_LOHKOT = \[([\s\S]*?)\];/)[1];
  const valitsimet = [...lohko.matchAll(/'([^']+)'/g)].map((m) => m[1])
    // Visan dialogi ei ole sivun sisällä, joten lukija ei voi törmätä siihen.
    .filter((v) => v !== '#quiz-dialog');
  const puuttuu = valitsimet.filter((v) => !LUKIJAN_OHITETTAVAT.includes(v));
  assert.deepEqual(puuttuu, [], 'lukijan ohituslistalta puuttuu pöllön spoilerilohkoja');
});
