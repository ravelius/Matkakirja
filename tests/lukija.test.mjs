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
  kokoaLuettavatKohdat,
  lueAaneen,
  lueVirtana,
  lukijaLukee,
} from '../js/lukija.js';
import { sfx } from '../js/sound.js';

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
 * Rakenne on sama kuin js/maalehti.js naytaMaaTunnusluvut piirtää.
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

test('otsikolla alkava kohta saa otsikollinen-lipun (tauko ennen otsikkoa, 15.8.2026)', () => {
  const sivu = el('div', {},
    el('h3', {}, t('Ensimmäinen otsikko')),
    el('p', {}, t('Alkukappale.')),
    el('p', {}, t('Toinen kappale.')),
    el('h3', {}, t('Väliotsikko')),
    el('p', {}, t('Jatkokappale.')));
  const kohdat = kokoaLuettavatKohdat(sivu);
  // Kohta 0 on paljas alkukappale (eka otsikko ohitettu), kohta 2
  // alkaa väliotsikolla — vain se saa pidemmän tauon edelleen.
  assert.equal(kohdat.length, 3);
  assert.ok(!kohdat[0].otsikollinen, JSON.stringify(kohdat[0]));
  assert.ok(!kohdat[1].otsikollinen, JSON.stringify(kohdat[1]));
  assert.ok(kohdat[2].otsikollinen, JSON.stringify(kohdat[2]));
  // Sivunvaihdon jälkeen yläotsikko luetaan: silloin myös
  // ensimmäinen kohta on otsikollinen ja saa saman hengähdyksen.
  const kaikki = kokoaLuettavatKohdat(sivu, { ohitaEkaOtsikko: false });
  assert.ok(kaikki[0].otsikollinen, JSON.stringify(kaikki[0]));
  assert.match(kaikki[0].teksti, /Ensimmäinen otsikko/);
});

test('maston kaupunkinimi ei kuluta otsikko-ohitusta (omistajan havainto 14.8.2026)', () => {
  // Lehtidialogin kortissa maston kaupunkinimi (#arrival-city) on
  // DOM-järjestyksessä ennen sivun otsikkoa. Ilman ohituslistariviä se
  // söi ensimmäisen otsikon ohituksen, ja sivuotsikko luettiin silti.
  const kortti = el('div', { luokat: ['dialog-card'] },
    el('h2', { id: 'arrival-city' }, t('Kairo')),
    el('h3', { luokat: ['aihe-nimi'] }, t('Egyptin historia')),
    el('p', {}, t('Niili tulvi joka kesä.')),
    el('h3', {}, t('Väliotsikko')),
    el('p', {}, t('Sato korjattiin syksyllä.')));
  const teksti = kokoaLuettavaTeksti(kortti);
  assert.ok(!/Kairo/.test(teksti), teksti);
  assert.ok(!/Egyptin historia/.test(teksti), teksti);
  assert.match(teksti, /Väliotsikko/);
  assert.match(teksti, /Niili tulvi/);
});

test('noston aikamerkki otsikon reunassa jää lukematta (omistajan toive 15.8.2026)', () => {
  // "Jyrkänne, jonka voi raapia kynnellä    1973" — vuosiluku on
  // taittoa, ja otsikon perään luettuna se kuulostaa virheeltä.
  const sivu = el('div', {},
    el('h3', {}, t('Ensimmäinen otsikko')),
    el('p', {}, t('Alkukappale.')),
    el('h4', {},
      t('Jyrkänne, jonka voi raapia kynnellä'),
      el('span', { luokat: ['nosto-aika'] }, t('1973'))),
    el('p', {}, t('Gaujan laaksossa joki on kuluttanut jyrkänteitä.')));
  const teksti = kokoaLuettavaTeksti(sivu);
  assert.ok(!/1973/.test(teksti), teksti);
  assert.match(teksti, /raapia kynnellä/);
  assert.match(teksti, /Gaujan laaksossa/);
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
  // Väliotsikko leipätekstin edellä saa pisteen; alun otsikko ohitetaan.
  const sivu = el('div', {},
    el('h3', {}, t('Sivun otsikko')),
    el('p', {}, t('Kappale?')),
    el('h3', {}, t('Otsikko')),
    el('p', {}, t('Jatko')));
  assert.equal(kokoaLuettavaTeksti(sivu), 'Kappale?\nOtsikko. Jatko.');
});

test('kaikki alun otsikot ohitetaan — luenta alkaa leipätekstistä (omistajan tarkennus 14.8.2026)', () => {
  // Mastossa voi olla useampi otsikkoelementti peräkkäin (kaupunki,
  // sivuotsikko, alaotsikko) — jokainen ohitetaan, kunnes leipäteksti
  // alkaa. Sen jälkeen väliotsikot luetaan.
  const sivu = el('div', {},
    el('h2', {}, t('Kairo')),
    el('h3', {}, t('Egyptin historia')),
    el('h4', {}, t('Alaotsikko')),
    el('p', {}, t('Niili tulvi joka kesä.')),
    el('h3', {}, t('Väliotsikko')),
    el('p', {}, t('Jatkoa.')));
  const teksti = kokoaLuettavaTeksti(sivu);
  assert.ok(!/Kairo|Egyptin historia|Alaotsikko/.test(teksti), teksti);
  // Väliotsikko liittyy seuraavaan leipätekstiin (omistajan tilaus
  // 14.8.2026): otsikko ei ole oma hyppy-yksikkönsä vaan kohdan alku.
  assert.equal(teksti, 'Niili tulvi joka kesä.\nVäliotsikko. Jatkoa.');
});

test('väliotsikko ja sen leipäteksti ovat yksi kohta — myös peräkkäiset otsikot', () => {
  const sivu = el('div', {},
    el('h3', {}, t('Sivun otsikko')),
    el('p', {}, t('Ensimmäinen kappale.')),
    el('h3', {}, t('Osasto')),
    el('h4', {}, t('Alaotsikko')),
    el('p', {}, t('Toinen kappale.')),
    el('p', {}, t('Kolmas kappale.')));
  assert.equal(kokoaLuettavaTeksti(sivu),
    'Ensimmäinen kappale.\nOsasto. Alaotsikko. Toinen kappale.\nKolmas kappale.');
});

test('kokoaLuettavatKohdat: osat kantavat lohkoelementit ja merkkivälit', () => {
  const otsikko = el('h3', {}, t('Väliotsikko'));
  const kappale = el('p', {}, t('Kappaleen teksti.'));
  const sivu = el('div', {},
    el('p', {}, t('Avaus.')),
    otsikko,
    kappale);
  const kohdat = kokoaLuettavatKohdat(sivu);
  assert.equal(kohdat.length, 2);
  assert.equal(kohdat[0].teksti, 'Avaus.');
  assert.equal(kohdat[0].osat.length, 1);
  assert.equal(kohdat[1].teksti, 'Väliotsikko. Kappaleen teksti.');
  // Yhdistetyssä kohdassa osat osoittavat otsikkoon ja kappaleeseen
  // omilla merkkiväleillään — maalaus ja vieritys osuvat oikeisiin
  // elementteihin.
  assert.equal(kohdat[1].osat.length, 2);
  assert.equal(kohdat[1].osat[0].solmu, otsikko);
  assert.equal(kohdat[1].osat[0].alku, 0);
  assert.equal(kohdat[1].osat[0].pituus, 'Väliotsikko'.length);
  assert.equal(kohdat[1].osat[1].solmu, kappale);
  assert.equal(kohdat[1].osat[1].alku, 'Väliotsikko. '.length);
  assert.equal(kohdat[1].osat[1].pituus, 'Kappaleen teksti.'.length);
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

/* ---------------------------------------------------------------- */
/* LEIPÄTEKSTIPOLITIIKKA (omistajan linjaus 18.8.2026)               */
/* ---------------------------------------------------------------- */

/**
 * Matkaoppaan taitto pienoiskoossa (js/opas.js): jakso, jonka sisällä
 * kelluu kainalotaulu, ja "Milloin matkaan?" -laatikko graafeineen ja
 * kausitauluineen. Juuri tästä sivusta omistaja teki havainnon
 * 18.8.2026 — kaikki neljä listalajia luettiin ääneen.
 */
function opassivu() {
  return el('div', { luokat: ['nahtavyys-kortti'] },
    el('h2', {}, t('Matkailijan Firenze')),
    el('p', { luokat: ['opas-ingressi'] }, t('Firenze on kaupunki, jonka läpi kävellään.')),
    el('section', { luokat: ['opas-jakso', 'opas-jakso-kainalo'] },
      el('h3', { luokat: ['opas-valiotsikko'] }, t('Perille ja jalkapatikkaan')),
      el('aside', { luokat: ['opas-kainalo'] },
        el('div', { luokat: ['opas-vyo', 'opas-vyo-lammin'] },
          el('h3', { luokat: ['opas-vyo-otsikko'] }, t('Parasta täällä')),
          el('ul', { luokat: ['opas-vyo-lista'] },
            el('li', { luokat: ['opas-vyo-rivi'] },
              el('span', { luokat: ['opas-vyo-rivisisus'] },
                el('span', { luokat: ['opas-vyo-nimi'] }, t('Renessanssitaide')))))),
        el('div', { luokat: ['opas-vyo', 'opas-vyo-viilea'] },
          el('h3', { luokat: ['opas-vyo-otsikko'] }, t('Hyvä tietää')),
          el('ul', { luokat: ['opas-vyo-lista'] },
            el('li', { luokat: ['opas-vyo-rivi'] },
              el('span', { luokat: ['opas-vyo-rivisisus'] },
                el('span', { luokat: ['opas-vyo-nimi'] }, t('Jonot'))))))),
      el('p', { luokat: ['nahtavyys-kappale'] }, t('Firenzeen tullaan junalla.'))),
    el('aside', { luokat: ['opas-laatikko', 'opas-saa'] },
      el('h3', { luokat: ['opas-laatikko-otsikko'] }, t('Milloin matkaan?')),
      el('figure', { luokat: ['opas-saagraafi'] },
        el('figcaption', { luokat: ['opas-saagraafi-teksti'] },
          t('Sää vuoden mittaan. Napauta suuremmaksi.'))),
      el('p', { luokat: ['opas-parasaika'] }, t('Paras aika on huhti–kesäkuu.')),
      el('dl', { luokat: ['opas-kaudet'] },
        el('dt', { luokat: ['opas-kausi-nimi'] },
          el('span', { luokat: ['opas-kausi-sana'] }, t('Kevät')),
          el('span', { luokat: ['opas-kausi-kk'] }, t('maalis–toukokuu'))),
        el('dd', { luokat: ['opas-kausi-tiedot'] },
          el('span', { luokat: ['opas-kausi-lampo'] }, t('4–22 °C')),
          el('span', { luokat: ['opas-kausi-kuvaus'] }, t('Maaliskuu on viileä.'))))),
    el('section', { luokat: ['opas-jakso'] },
      el('h3', { luokat: ['opas-valiotsikko'] }, t('Kupoli ja jonot')),
      el('figure', { luokat: ['nahtavyys-kuvakehys'] },
        el('img', {}),
        el('figcaption', { luokat: ['nahtavyys-kuvateksti'] }, t('Kupoli alhaalta.'))),
      el('p', { luokat: ['nahtavyys-kappale'] }, t('Tuomiokirkko on ilmainen.'))),
    el('aside', { luokat: ['opas-laatikko', 'opas-suunnittele'] },
      el('h3', { luokat: ['opas-laatikko-otsikko'] }, t('Suunnittele matka')),
      el('ul', { luokat: ['opas-linkkilista'] },
        el('li', { luokat: ['opas-linkkirivi'] },
          el('a', { luokat: ['opas-linkki'] }, t('Visit Florence'))))));
}

test('OPAS: kainalotaulun nosto-osiot jäävät kokonaan lukematta otsikoita myöten', () => {
  const teksti = kokoaLuettavaTeksti(opassivu());
  for (const kielletty of ['Parasta täällä', 'Hyvä tietää', 'Renessanssitaide', 'Jonot.']) {
    assert.ok(!teksti.includes(kielletty), `kainalo vuoti luentaan: ${kielletty}\n${teksti}`);
  }
});

test('OPAS: Milloin matkaan luetaan otsikkoineen — mutta vain aloituskappale', () => {
  const teksti = kokoaLuettavaTeksti(opassivu());
  // Otsikon alla ON leipätekstiä, joten otsikko kuuluu luentaan.
  assert.match(teksti, /Milloin matkaan\? Paras aika on huhti–kesäkuu\./);
  // Kausitaulu ja säägraafin kuvateksti eivät.
  for (const kielletty of ['Kevät', 'maalis–toukokuu', '4–22 °C', 'Napauta suuremmaksi']) {
    assert.ok(!teksti.includes(kielletty), `kainalorivi vuoti luentaan: ${kielletty}\n${teksti}`);
  }
});

test('OPAS: jakson otsikko ja leipäteksti yhdessä, kuvateksti pois', () => {
  const teksti = kokoaLuettavaTeksti(opassivu());
  assert.match(teksti, /Kupoli ja jonot\. Tuomiokirkko on ilmainen\./);
  assert.ok(!teksti.includes('Kupoli alhaalta'), teksti);
  // Kainalon otsikot eivät valu jakson leipätekstin eteen.
  assert.match(teksti, /Perille ja jalkapatikkaan\. Firenzeen tullaan junalla\./);
});

test('OPAS: linkkilaatikko on pelkkiä linkkejä — otsikko ja linkit vaikenevat', () => {
  const teksti = kokoaLuettavaTeksti(opassivu());
  assert.ok(!teksti.includes('Suunnittele matka'), teksti);
  assert.ok(!teksti.includes('Visit Florence'), teksti);
});

test('otsikko ilman leipätekstiä jää lukematta myös sivun hännässä', () => {
  const sivu = el('div', {},
    el('p', {}, t('Avauskappale.')),
    el('h3', {}, t('Kuvia matkalta')),
    el('figure', {}, el('img', {}), el('figcaption', {}, t('Kuvateksti.'))));
  assert.equal(kokoaLuettavaTeksti(sivu), 'Avauskappale.');
});

test('taulukot, listat ja irralliset selitepalkit eivät ole leipätekstiä', () => {
  const sivu = el('div', {},
    el('p', {}, t('Tämä on leipätekstiä.')),
    el('table', {},
      el('tr', {}, el('th', {}, t('Vuosi')), el('td', {}, t('1873')))),
    el('div', { luokat: ['jokin-uusi-selitepalkki'] }, t('Selite ilman luokkaa listalla.')),
    el('dl', {}, el('dt', {}, t('Termi')), el('dd', {}, t('Selitys'))));
  assert.equal(kokoaLuettavaTeksti(sivu), 'Tämä on leipätekstiä.');
});

test('menovinkkirivin nimi luetaan selityksensä otsikkona, lähde ei', () => {
  const sivu = el('div', { luokat: ['vinkkisivu'] },
    el('p', { luokat: ['johdanto'] }, t('Britannian kokoelmat ovat verkossa.')),
    el('h4', { luokat: ['vinkki-ryhma'] }, t('Museot ja taide')),
    el('ul', { luokat: ['vinkkilista'] },
      el('li', { luokat: ['vinkki'] },
        el('div', { luokat: ['vinkki-teksti'] },
          el('a', { luokat: ['vinkki-nimi'] }, t('National Gallery')),
          el('p', { luokat: ['vinkki-selitys'] }, t('Kokoelmassa on 2 400 maalausta.')),
          el('p', { luokat: ['vinkki-lahde'] }, t('Kuva: Commons (PD)')))),
      el('li', { luokat: ['vinkki'] },
        el('div', { luokat: ['vinkki-teksti'] },
          el('a', { luokat: ['vinkki-nimi'] }, t('Nimi ilman kuvausta'))))));
  const teksti = kokoaLuettavaTeksti(sivu);
  assert.match(teksti, /Museot ja taide\. National Gallery\. Kokoelmassa on 2 400 maalausta\./);
  // Kuvaukseton rivi on pelkkä nimi — otsikko ilman leipätekstiä.
  assert.ok(!teksti.includes('Nimi ilman kuvausta'), teksti);
  assert.ok(!teksti.includes('Commons'), teksti);
});

test('kappaleen sisäinen henkilölinkki luetaan — nimi ei saa kadota virkkeestä', () => {
  const sivu = el('div', {},
    el('p', {}, t('Keskustan suunnitteli '),
      el('button', { luokat: ['henkilo-linkki'] }, t('Engel')),
      t(' vuonna 1816.')));
  assert.match(kokoaLuettavaTeksti(sivu), /Engel/);
});

test('data-lukija="leipa" nostaa oman lohkon luentaan valkolistan yli', () => {
  const sivu = el('div', {},
    el('div', { attrs: { 'data-lukija': 'leipa' } }, t('Erikoistaitto luetaan.')),
    el('div', {}, t('Tavallinen div vaikenee.')));
  assert.equal(kokoaLuettavaTeksti(sivu), 'Erikoistaitto luetaan.');
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

/*
 * PELIN MYKISTYS KOSKEE KAIKKEA LUENTAA (omistajan bugiraportti
 * 22.8.2026: "vaikka pelin oma mykistys on päällä niin peli lukee
 * silti matkakirjaa ääneen mutta vain jos ääni on striimi
 * generoitu").
 *
 * Vika ei ollut striimipolussa vaan siinä, että mykistystarkistus
 * asui KUTSUJISSA: äänitepolku kysyi sitä (js/luenta.js
 * playDiaryVoice), lukijaäänen kutsujat (lueMerkinta, lueKertojana)
 * eivät. Portti on nyt lukijan molemmissa sisäänkäynneissä, ja näitä
 * vartioidaan kahdelta puolelta: käytöksestä ja lähdetekstistä.
 * Lähdevartio on tarpeen, koska mykkä peli palauttaa Nodessa false
 * myös ilman porttia (taustajärjestelmiä ei ole) — pelkkä
 * käytöstesti ei siis huomaisi portin katoamista.
 */
test('mykkä peli ei lue mitään kummallakaan sisäänkäynnillä', () => {
  const oli = sfx.enabled;
  try {
    sfx.enabled = false;
    assert.equal(lueAaneen('Tokiossa astuin risteykseen.'), false);
    assert.equal(lueVirtana(), null);
    assert.equal(lukijaLukee(), false);
  } finally {
    sfx.enabled = oli;
  }
});

test('mykistysportti on molempien sisäänkäyntien ensimmäinen ehto', () => {
  const lahde = readFileSync(new URL('../js/lukija.js', import.meta.url), 'utf8');
  for (const nimi of ['lueAaneen', 'lueVirtana']) {
    const kohta = lahde.indexOf(`export function ${nimi}(`);
    assert.ok(kohta > 0, `${nimi} ei löytynyt`);
    // Portin on oltava rungon alussa, ennen kuin mitään
    // taustajärjestelmää kysytään.
    const runko = lahde.slice(kohta, kohta + 900);
    assert.match(runko, /if \(!aanetPaalla\(\)\)/, `${nimi} ei kysy pelin äänivalintaa`);
    const portti = runko.indexOf('aanetPaalla()');
    const tausta = runko.indexOf('puheTuettu()');
    assert.ok(tausta < 0 || portti < tausta, `${nimi} kysyy taustajärjestelmää ennen mykistystä`);
  }
});

test('mykistys lähettää tapahtuman, jota lukija kuuntelee', () => {
  const aani = readFileSync(new URL('../js/sound.js', import.meta.url), 'utf8');
  const lukija = readFileSync(new URL('../js/lukija.js', import.meta.url), 'utf8');
  // Sama vakio molemmissa päissä: tapahtuman nimi ei saa erkaantua.
  assert.match(aani, /export const AANIVALINTA_TAPAHTUMA = 'matkakirja-aanivalinta'/);
  assert.match(aani, /setEnabled\(enabled\)\s*\{[\s\S]*?ilmoitaAaniValinta\(enabled\)/);
  assert.match(lukija, /addEventListener\(AANIVALINTA_TAPAHTUMA/);
  assert.match(lukija, /detail\?\.enabled === false\) pysaytaLukija\(\)/);
});
