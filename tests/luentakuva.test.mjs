/*
 * LUENTAKUVA KARTAN PÄÄLLE (js/fokusvirta.js naytaLuentakuva).
 *
 * Omistaja 9.9.2026 klo 09.10 (Raamattu, POSTILAATIKOSTA TULEE
 * LUENTAKUVIA KARTAN PAALLE): matkakirjan luennan aikana kartan päällä
 * näkyy kuva, joka tulee kuvatoimituksen postista. Pakin kenttä on
 * `matkakirja.luentakuva` ja se on VAPAAEHTOINEN.
 *
 * Kolme asiaa, jotka eivät näy diffistä eivätkä ruutukaappauksesta:
 *
 *   1. ILMAN KENTTÄÄ EI SYNNY MITÄÄN. Tämä on koko mekanismin ehto:
 *      kuvaton kaupunki on täsmälleen ennallaan, eikä kartalle saa
 *      ilmestyä tyhjää kehystä. Kenttä, jossa on vain selite ilman
 *      osoitetta, on sama asia kuin ei kenttää.
 *   2. OSOITE RATKEAA SAMOIN KUIN KORTIN KUVILLA. Kolme lähdettä
 *      (`osoite`, `ampari`, `tiedosto`) porrastuvat kuten muualla
 *      talossa (js/fokusvirta.js kuvanOsoite) — uusi kenttä ei saa
 *      alkaa ajautua omaan osoitelogiikkaansa.
 *   3. KARTALLA ON KUVA JA LYHYT TEKSTI — EI LAATIKKOA EIKÄ LÄHDETTÄ
 *      (omistaja 9.9.2026 klo 13.50, Raamattu LUENTAKUVA ISOMPANA,
 *      VINOSSA JA ILMAN LAATIKKOA). Lähderivi on suurennoksen asia, ja
 *      juuri sellainen sääntö palaa hiljaa takaisin, kun paneelia
 *      joskus muokataan — siksi sen POISSAOLO mitataan puusta.
 *   4. KARTAN LIIKE PIENENTÄÄ, EI POISTA. Tämä on omistajan korjaus
 *      aamun versioon: kuva jää kartalle niin kauan kuin pelaaja on
 *      samassa kaupungissa, ja vain kaupungista lähtö vie sen. Ero
 *      näkyy vain tilaluokassa, ei ulkoasussa — testi on ainoa vahti.
 *
 * DOM-osuus ajetaan pienellä omalla puumallilla samaan tapaan kuin
 * tests/lukijanappi.test.mjs ja tests/pollo.test.mjs: Nodessa ei ole
 * selainta, eikä repoon oteta jsdomia yhtä testiä varten. Selainpuoli
 * (nousu, häipyminen, kartan liike, suurennos) on katsottu erikseen
 * Chromiumilla ruutukaappauksesta.
 *
 * KUVA LISÄTÄÄN VAIN TESTIN AJAKSI muistissa olevaan pakkiin ja
 * poistetaan lopuksi: tuotantodataan ei kuulu tässä erässä yhtään
 * luentakuvaa (kuvat tulevat postista).
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  fokusvirtaLuentakuva, luentakuvanOsoite, luentakuvanVara,
  luentakuvanKallistus, naytaLuentakuva, pienennaLuentakuva,
  piilotaLuentakuva,
} from '../js/fokusvirta.js';
import { laudaltaRuudulle, ruudultaLaudalle } from '../js/saapumisasento.js';
import { julisteUrl } from '../js/media.js';
import { valokuvaUrl, valokuvaVara } from '../js/packs/africa-valokuvat.js';
import { fokusvirtaKaupungille } from '../js/packs/fokusvirrat.js';

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli                                                   */
/* ---------------------------------------------------------------- */

class Teksti {
  constructor(data) {
    this.nodeType = 3;
    this.nodeValue = String(data);
    this.parentNode = null;
  }

  get textContent() { return this.nodeValue; }
}

/** Yhden valitsimen osuma: .luokka tai tagi (muuta ei tarvita). */
function osuu(el, valitsin) {
  const v = valitsin.trim();
  if (!v) return false;
  if (v.startsWith('.')) return el.luokat.includes(v.slice(1));
  return el.nodeName === v.toUpperCase();
}

class Elementti {
  constructor(nimi) {
    this.nodeType = 1;
    this.nodeName = String(nimi).toUpperCase();
    this.childNodes = [];
    this.parentNode = null;
    this.luokat = [];
    this.attrs = {};
    this.kuuntelijat = new Map();
    this.hidden = false;
    this.alt = '';
    this.title = '';
    this.type = '';
    this.decoding = '';
    this.draggable = true;
    /*
     * `style.setProperty` on osa mallia, koska paneeli kirjoittaa
     * kaupungin kallistuskulman css-muuttujaan (js/fokusvirta.js
     * naytaLuentakuva). Arvot jäävät samaan olioon luettaviksi.
     */
    this.style = { setProperty(nimi, arvo) { this[nimi] = String(arvo); } };
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) {
    this.luokat = String(arvo).split(/\s+/).filter(Boolean);
  }

  get classList() {
    return {
      add: (...ls) => ls.forEach((l) => { if (!this.luokat.includes(l)) this.luokat.push(l); }),
      remove: (...ls) => { this.luokat = this.luokat.filter((l) => !ls.includes(l)); },
      contains: (l) => this.luokat.includes(l),
    };
  }

  get textContent() {
    return this.childNodes.map((n) => n.textContent ?? '').join('');
  }

  set textContent(arvo) {
    this.childNodes = [];
    if (arvo !== '' && arvo != null) this.appendChild(new Teksti(arvo));
  }

  /*
   * `src` on kuvaelementin oma sopimus: se heijastuu attribuuttiin (jota
   * js/media.js lataaKuvaSitkeasti lukee) ja laukaisee latauksen. Malli
   * ilmoittaa latauksen onnistuneeksi seuraavalla kierroksella, jottei
   * sitkeän latauksen jonovahti jää roikkumaan testin ajaksi.
   */
  get src() { return this.attrs.src ?? ''; }

  set src(arvo) {
    this.attrs.src = String(arvo);
    setTimeout(() => this.dispatch('load'), 0);
  }

  appendChild(solmu) {
    solmu.parentNode = this;
    this.childNodes.push(solmu);
    return solmu;
  }

  append(...solmut) { solmut.forEach((s) => this.appendChild(s)); }

  insertBefore(uusi, ennen) {
    const i = this.childNodes.indexOf(ennen);
    uusi.parentNode = this;
    this.childNodes.splice(i < 0 ? this.childNodes.length : i, 0, uusi);
    return uusi;
  }

  removeChild(solmu) {
    this.childNodes = this.childNodes.filter((n) => n !== solmu);
    solmu.parentNode = null;
    return solmu;
  }

  remove() { this.parentNode?.removeChild(this); }

  setAttribute(nimi, arvo) { this.attrs[nimi] = String(arvo); }

  getAttribute(nimi) { return this.attrs[nimi] ?? null; }

  addEventListener(laji, kasittelija) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, []);
    this.kuuntelijat.get(laji).push(kasittelija);
  }

  removeEventListener(laji, kasittelija) {
    const lista = this.kuuntelijat.get(laji) ?? [];
    this.kuuntelijat.set(laji, lista.filter((k) => k !== kasittelija));
  }

  /*
   * `lisa` on osoittimen omat kentät (clientX, clientY, pointerId):
   * luentakuvan raahaus lukee ne, ja ilman niitä siirto olisi aina
   * nollan mittainen eikä testi näkisi kynnystä lainkaan.
   */
  dispatch(laji, lisa = {}) {
    [...(this.kuuntelijat.get(laji) ?? [])]
      .forEach((k) => k({ type: laji, target: this, ...lisa }));
  }

  get isConnected() {
    let solmu = this;
    while (solmu.parentNode) solmu = solmu.parentNode;
    return solmu === asiakirja.body;
  }

  *jalkelaiset() {
    for (const lapsi of this.childNodes) {
      if (lapsi.nodeType !== 1) continue;
      yield lapsi;
      yield* lapsi.jalkelaiset();
    }
  }

  querySelector(valitsin) {
    return this.querySelectorAll(valitsin)[0] ?? null;
  }

  querySelectorAll(valitsin) {
    const osat = String(valitsin).split(',').map((o) => o.trim()).filter(Boolean);
    return [...this.jalkelaiset()].filter((el) => osat.some((o) => osuu(el, o)));
  }

  closest(valitsin) {
    const osat = String(valitsin).split(',').map((o) => o.trim()).filter(Boolean);
    let solmu = this;
    while (solmu && solmu.nodeType === 1) {
      if (osat.some((o) => osuu(solmu, o))) return solmu;
      solmu = solmu.parentNode;
    }
    return null;
  }
}

/*
 * Dokumentin kuuntelijat ovat OIKEASTI olemassa mallissa: kartan liike
 * on `pointerdown` dokumentin tasolla (js/fokusvirta.js
 * kytkeLuentakuvanPienennys), ja juuri se koukku on tämän erän uusi
 * käytös. Ilman rekisteriä testi ei näkisi sitä lainkaan.
 */
const dokumentinKuuntelijat = new Map();

const asiakirja = {
  body: new Elementti('body'),
  createElement: (nimi) => new Elementti(nimi),
  createTextNode: (teksti) => new Teksti(teksti),
  getElementById: () => null,
  // Ei linkkiä styles.css:ään: lataaTyyli palaa saman tien, eikä malli
  // tarvitse tyylitiedostoja.
  querySelector: (valitsin) => (valitsin.includes('map-pane')
    ? null : asiakirja.body.querySelector(valitsin)),
  querySelectorAll: (valitsin) => asiakirja.body.querySelectorAll(valitsin),
  addEventListener: (laji, kasittelija) => {
    if (!dokumentinKuuntelijat.has(laji)) dokumentinKuuntelijat.set(laji, []);
    dokumentinKuuntelijat.get(laji).push(kasittelija);
  },
  removeEventListener: (laji, kasittelija) => {
    const lista = dokumentinKuuntelijat.get(laji) ?? [];
    dokumentinKuuntelijat.set(laji, lista.filter((k) => k !== kasittelija));
  },
};

/** Kartan veto: pointerdown, jonka kohde ei ole paneeli eikä suurennos. */
function kartanVeto(kohde = new Elementti('canvas')) {
  [...(dokumentinKuuntelijat.get('pointerdown') ?? [])]
    .forEach((k) => k({ type: 'pointerdown', target: kohde }));
}

globalThis.document = asiakirja;

/* ---------------------------------------------------------------- */
/* Koekaupunki ja tekopeli                                           */
/* ---------------------------------------------------------------- */

/**
 * Sofia on koekaupunki: sillä on fokusvirta, äänitetty luenta ja nyt myös
 * tuotannon luentakuva. Testit vaihtavat kentän vain testin ajaksi ja
 * palauttavat alkuperäisen kuvan lopuksi.
 */
const KOEKAUPUNKI = { id: 'sofia', name: 'Sofia' };
const PAKKI = fokusvirtaKaupungille(KOEKAUPUNKI.id);

/*
 * Koekuvalla on ERI lyhyt ja pitkä teksti: kartalla näkyy lyhyt,
 * suurennoksessa pitkä (js/kuvatekstit.js). Jos molemmat olisivat sama
 * merkkijono, testi ei näkisi kumpaa paneeli oikeasti käyttää.
 */
const KOEKUVA = {
  ampari: 'luentakuvat/koe-sofia.jpg',
  lyhyt: 'Torin laita aamulla.',
  selite: 'Koekuva: torin laita aamun ensimmäisessä valossa, kojut vielä kiinni.',
  lahde: 'Kuvaaja Koe, Wikimedia Commons (CC BY 4.0)',
};

function tekoUi() {
  return {
    game: {
      pack: { id: 'maailmankartta' },
      player: {},
      cityOf: () => KOEKAUPUNKI,
    },
  };
}

/** Kuva pakkiin vain yhden testin ajaksi. */
function pakinKanssa(kuva, tyo) {
  const alkuperainen = PAKKI.matkakirja.luentakuva;
  PAKKI.matkakirja.luentakuva = kuva;
  try {
    return tyo();
  } finally {
    if (alkuperainen === undefined) delete PAKKI.matkakirja.luentakuva;
    else PAKKI.matkakirja.luentakuva = alkuperainen;
  }
}

/** Poista tuotannon kuva vain yhden kuvatonta pakettia testaavan ajon ajaksi. */
function pakinIlmanKuvaa(tyo) {
  const alkuperainen = PAKKI.matkakirja.luentakuva;
  delete PAKKI.matkakirja.luentakuva;
  try {
    return tyo();
  } finally {
    if (alkuperainen !== undefined) PAKKI.matkakirja.luentakuva = alkuperainen;
  }
}

/* ---------------------------------------------------------------- */
/* 1. Ilman kenttää ei synny mitään                                  */
/* ---------------------------------------------------------------- */

test('pakki ilman luentakuvaa ei tuota elementtiä', () => {
  pakinIlmanKuvaa(() => {
    const ui = tekoUi();
    assert.equal(PAKKI.matkakirja.luentakuva, undefined, 'testipakista poistettu kuva ei saa näkyä');
    assert.equal(fokusvirtaLuentakuva(ui, KOEKAUPUNKI), null);
    assert.equal(naytaLuentakuva(ui, KOEKAUPUNKI), false);
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 0);
    assert.ok(!ui.luentakuva, 'kuvatta ei jää paneelia muistiin');
  });
});

test('pelkkä selite ilman osoitetta ei nosta tyhjää kehystä', () => {
  pakinKanssa({ selite: 'Kuva puuttuu', lahde: 'Ei mitään' }, () => {
    const ui = tekoUi();
    assert.equal(fokusvirtaLuentakuva(ui, KOEKAUPUNKI), null);
    assert.equal(naytaLuentakuva(ui, KOEKAUPUNKI), false);
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 0);
  });
});

/* ---------------------------------------------------------------- */
/* 2. Osoite ratkeaa samoin kuin kortin kuvilla                       */
/* ---------------------------------------------------------------- */

test('ämpärin kuva ratkeaa julisteosoitteeksi ilman varareittiä', () => {
  const kuva = { ampari: 'luentakuvat/koe-sofia.jpg', selite: 'x', lahde: 'y' };
  assert.equal(luentakuvanOsoite(kuva), julisteUrl(kuva.ampari));
  assert.ok(luentakuvanOsoite(kuva).startsWith('https://'));
  // Ämpärillä ei ole Commonsin varareittiä: uusinta jättäisi vain
  // tyhjän kehyksen roikkumaan.
  assert.equal(luentakuvanVara(kuva), null);
});

test('osoitteellinen kuva menee sellaisenaan', () => {
  const kuva = { osoite: 'https://media.matkakirja.app/luentakuvat/koe.jpg', selite: 'x', lahde: 'y' };
  assert.equal(luentakuvanOsoite(kuva), kuva.osoite);
  assert.equal(luentakuvanVara(kuva), null);
  // Ämpäri ei ohita valmista osoitetta (sama porrastus kuin kortilla).
  const molemmat = { ...kuva, ampari: 'luentakuvat/toinen.jpg' };
  assert.equal(luentakuvanOsoite(molemmat), kuva.osoite);
});

test('Commons-tiedosto kulkee median asettajan läpi ja saa varareitin', () => {
  const kuva = { tiedosto: 'Sofia Bulgaria.jpg', selite: 'x', lahde: 'y' };
  assert.equal(luentakuvanOsoite(kuva), valokuvaUrl(kuva.tiedosto, 800));
  assert.equal(luentakuvanVara(kuva), valokuvaVara(kuva.tiedosto, 800));
});

/* ---------------------------------------------------------------- */
/* 3. Paneeli: kuva ja lyhyt kuvateksti, ei laatikkoa eikä lähdettä  */
/* ---------------------------------------------------------------- */

test('luentakuva nousee kartan päälle lyhyen kuvatekstinsä kanssa', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = tekoUi();
    assert.equal(naytaLuentakuva(ui, KOEKAUPUNKI), true);

    const paneelit = asiakirja.querySelectorAll('.fokusvirta-luentakuva');
    assert.equal(paneelit.length, 1, 'paneeleja saa olla täsmälleen yksi');
    const paneeli = paneelit[0];
    assert.equal(paneeli, ui.luentakuva);

    // Kuva on napissa, jotta napautus voi avata suurennoksen.
    const nappi = paneeli.querySelector('.fokusvirta-kuva');
    assert.ok(nappi, 'kuvan pitää olla napautettava');
    const img = nappi.querySelector('img');
    assert.equal(img.getAttribute('src'), julisteUrl(KOEKUVA.ampari));
    assert.equal(img.alt, KOEKUVA.lyhyt);

    // Lyhyt kuvateksti omassa laatikossaan kuvan alla.
    const teksti = paneeli.querySelector('.fokusvirta-luentateksti');
    assert.ok(teksti, 'lyhyelle kuvatekstille kuuluu oma laatikko');
    assert.equal(paneeli.querySelector('.fokusvirta-kuvaselite').textContent, KOEKUVA.lyhyt);
    assert.equal(teksti.textContent, KOEKUVA.lyhyt,
      'laatikossa ei saa olla muuta kuin lyhyt kuvateksti');

    piilotaLuentakuva(ui, { heti: true });
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 0);
    assert.equal(ui.luentakuva, null);
  });
});

test('kartalla ei näytetä lähderiviä — se on suurennoksen asia', () => {
  pakinKanssa({ ...KOEKUVA, lahde: 'Matkakirjan havainnekuva' }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    assert.equal(ui.luentakuva.querySelectorAll('.fokusvirta-kuvalahde').length, 0,
      'lähderivi ei kuulu kartalle (omistaja 9.9.2026)');
    assert.ok(!/havainnekuva/i.test(ui.luentakuva.textContent),
      'havainnekuvamaininta jää pitkään kuvatekstiin suurennokseen');
    piilotaLuentakuva(ui, { heti: true });
  });
});

test('kuva on vinossa: kaupungin oma kulma css-muuttujaan', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    const kulma = ui.luentakuva.style['--luentakuva-kallistus'];
    assert.equal(kulma, luentakuvanKallistus(KOEKAUPUNKI.id));
    const asteet = Number.parseFloat(kulma);
    assert.ok(asteet <= -1.4 && asteet >= -3.2, `kallistus haarukan ulkona: ${kulma}`);
    // Deterministinen: sama kaupunki, sama kulma joka kerta.
    assert.equal(luentakuvanKallistus(KOEKAUPUNKI.id), luentakuvanKallistus(KOEKAUPUNKI.id));
    piilotaLuentakuva(ui, { heti: true });
  });
});

test('uusi luenta ei jätä kahta paneelia päällekkäin', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaLuentakuva(ui, KOEKAUPUNKI);
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 1);
    piilotaLuentakuva(ui, { heti: true });
  });
});

/* ---------------------------------------------------------------- */
/* 4. Kartan liike pienentää, kaupungista lähtö poistaa             */
/* ---------------------------------------------------------------- */

test('kartan veto pienentää kuvan eikä poista sitä', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    const paneeli = ui.luentakuva;
    assert.ok(!paneeli.classList.contains('pieni'), 'kuva nousee isona');

    kartanVeto();

    assert.equal(ui.luentakuva, paneeli, 'kuva jää kartalle kartan liikkeestä');
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 1);
    assert.ok(paneeli.classList.contains('pieni'), 'kuvan pitää pienentyä');
    // Kuva on yhä napissa: pienen kuvan napautus avaa suurennoksen.
    assert.ok(paneeli.querySelector('.fokusvirta-kuva'));

    // Toinen veto ei tee mitään uutta.
    assert.equal(pienennaLuentakuva(ui), false);
    assert.equal(ui.luentakuva, paneeli);

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('napautus kuvaan itseensä ei pienennä (se avaa suurennoksen)', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    kartanVeto(ui.luentakuva.querySelector('.fokusvirta-kuva'));
    assert.ok(!ui.luentakuva.classList.contains('pieni'));
    piilotaLuentakuva(ui, { heti: true });
  });
});

test('kaupungista lähtö poistaa kuvan myös pienennettynä', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    kartanVeto();
    assert.ok(ui.luentakuva.classList.contains('pieni'));

    // vaiennaLivianKaupunkipuhe tekee juuri tämän kaupungista
    // lähdettäessä.
    piilotaLuentakuva(ui, { heti: true });
    assert.equal(ui.luentakuva, null);
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 0);
  });
});

test('paluu samaan kaupunkiin nostaa ison kuvan uudelleen', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    kartanVeto();
    piilotaLuentakuva(ui, { heti: true });

    naytaLuentakuva(ui, KOEKAUPUNKI);
    assert.ok(!ui.luentakuva.classList.contains('pieni'), 'uusi luenta alkaa isolla');
    piilotaLuentakuva(ui, { heti: true });
  });
});

/* ---------------------------------------------------------------- */
/* 5. Tuotantodata: kenttä on vapaaehtoinen ja oikean muotoinen      */
/* ---------------------------------------------------------------- */

test('jokaisella pakin luentakuvalla on osoite, selite ja lähde', async () => {
  const { FOKUSVIRRAT } = await import('../js/packs/fokusvirrat.js');
  let maara = 0;
  for (const [id, virta] of Object.entries(FOKUSVIRRAT)) {
    const kuva = virta?.matkakirja?.luentakuva;
    if (!kuva) continue; // kenttä on vapaaehtoinen
    maara += 1;
    assert.ok(kuva.osoite || kuva.ampari || kuva.tiedosto,
      `${id}: luentakuvalta puuttuu osoite`);
    assert.ok(String(kuva.lyhyt ?? '').length <= 100,
      `${id}: lyhyt kuvateksti ylittää 100 merkkiä`);
    assert.ok(String(kuva.selite ?? '').trim(), `${id}: luentakuvalta puuttuu selite`);
    // CC BY vaatii tekijän maininnan; lähde on siksi pakollinen.
    assert.ok(String(kuva.lahde ?? '').trim(), `${id}: luentakuvalta puuttuu lähde`);
  }
  assert.equal(maara, 45, 'Euroopan kaikilla 45 matkakirjapaikalla pitää olla lopullinen luentakuva');
});

/* ---------------------------------------------------------------- */
/* 6. Ankkuri kartan kohdassa, saapumisasento ja raahaus             */
/* ---------------------------------------------------------------- */

/*
 * Omistaja 9.9.2026 klo 16.10 ja 16.15 (Raamattu, SAAPUMISESSA KAMERA
 * ASETTUU NIIN, ETTA KAUPUNKI ON ALIMMASSA KOLMANNEKSESSA JA LUENTAKUVA
 * SEN YLAPUOLELLA HIEMAN OIKEALLA; LUENTAKUVAA VOI ITSE LIIKUTTAA, JA SE
 * ON ANKKUROITU KARTAN KOHTAAN).
 *
 * Kolme asiaa, jotka eivät näy diffistä:
 *   - kuva nousee KAUPUNGIN YLÄPUOLELLE ja hieman oikealle, ei css:n
 *     alareunan kaistaan;
 *   - paikka on LAUDAN piste, joten kartan siirto vie kuvaa mukanaan
 *     eikä ankkuri muutu;
 *   - raahaus vaihtaa ankkurin, mutta napautus ei — sama ele erotetaan
 *     pelkästä liikekynnyksestä.
 *
 * Ilman karttapintaa (ui.mapPane) ankkurointia ei tehdä lainkaan; yllä
 * olevat testit ajavat siis täsmälleen vanhan kulun, ja tämä osio antaa
 * ui:lle pinnan ja näkyvän alueen.
 */

const PINNAN_LEVEYS = 430;
const PINNAN_KORKEUS = 930;
/** Kaupunki laudalla; sen ruutupaikka valitaan näkyvällä alueella. */
const KOEKAUPUNKI_KARTALLA = { ...KOEKAUPUNKI, x: 5000, y: 3100 };
/** Kaupungin tavoitepaikka saapumisasennossa (alin kolmannes). */
const KAUPUNKI_RUUDULLA = { x: PINNAN_LEVEYS * 0.42, y: PINNAN_KORKEUS * 0.78 };

/** Karttapinta: vain ne mitat, joita ankkurointi lukee. */
function tekoPinta() {
  return {
    clientWidth: PINNAN_LEVEYS,
    clientHeight: PINNAN_KORKEUS,
    getBoundingClientRect: () => ({
      left: 0, top: 0, width: PINNAN_LEVEYS, height: PINNAN_KORKEUS,
    }),
  };
}

/**
 * Näkyvä alue, jolla kaupunki osuu haluttuun kohtaan ruudulla — sama
 * kuva kuin saapumisajon jälkeen.
 */
function tekoAlue(skaala = PINNAN_LEVEYS / 240) {
  const keskusX = KOEKAUPUNKI_KARTALLA.x - (KAUPUNKI_RUUDULLA.x - PINNAN_LEVEYS / 2) / skaala;
  const keskusY = KOEKAUPUNKI_KARTALLA.y - (KAUPUNKI_RUUDULLA.y - PINNAN_KORKEUS / 2) / skaala;
  const w = PINNAN_LEVEYS / skaala;
  const h = PINNAN_KORKEUS / skaala;
  return {
    x: keskusX - w / 2, y: keskusY - h / 2, w, h, skaala,
  };
}

/** Tekopeli, jolla on karttapinta ja näkyvä alue. */
function kartallinenUi() {
  const tila = { alue: tekoAlue() };
  return {
    game: {
      pack: { id: 'maailmankartta' },
      player: {},
      cityOf: () => KOEKAUPUNKI_KARTALLA,
    },
    mapPane: tekoPinta(),
    contentBox: { w: 12000, h: 6000 },
    nakyvaAlue: () => tila.alue,
    // Testin oma kahva: kartan panorointi vaihtaa näkyvää aluetta.
    siirraKarttaa: (dx, dy) => { tila.alue = { ...tila.alue, x: tila.alue.x + dx, y: tila.alue.y + dy }; },
  };
}

/*
 * Luentakuvan ankkurin ruutupaikka juuri nyt.
 *
 * Paikka asuu ANKKURISOLMUSSA paneelin ympärillä, ei paneelissa:
 * paneelin oma transform animoituu (nousu, pienennys), ja
 * kehyskohtainen paikanvaihto jäisi siirtymän alle (js/fokusvirta.js
 * paivitaLuentakuvanPaikka).
 */
function ankkurinPaikka(naytto) {
  return {
    x: Number.parseFloat(naytto.solmu.style['--luentakuva-x']),
    y: Number.parseFloat(naytto.solmu.style['--luentakuva-y']),
  };
}

test('luentakuva ankkuroituu kaupungin yläpuolelle ja hieman oikealle', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = kartallinenUi();
    assert.equal(naytaLuentakuva(ui, KOEKAUPUNKI_KARTALLA), true);
    const paneeli = ui.luentakuva;
    assert.ok(paneeli.classList.contains('ankkuroitu'),
      'kartan kohtaan sidottu kuva tarvitsee oman asemointiluokkansa');

    const paikka = ankkurinPaikka(ui.luentakuvaAnkkuri);
    assert.ok(paikka.y < KAUPUNKI_RUUDULLA.y,
      `kuvan alareuna ${paikka.y} ei ole kaupungin pisteen (${KAUPUNKI_RUUDULLA.y}) yläpuolella`);
    assert.ok(paikka.x > KAUPUNKI_RUUDULLA.x,
      `kuvan keskilinja ${paikka.x} ei ole kaupungista oikealle`);
    // Leveys on laskettu (ei css:n oletusta): se mahtuu pinnalle.
    const leveys = Number.parseFloat(paneeli.style['--luentakuva-leveys']);
    assert.ok(leveys > 0 && leveys <= PINNAN_LEVEYS, `leveys ${leveys} ei ole pinnan mitoissa`);

    piilotaLuentakuva(ui, { heti: true });
    assert.equal(ui.luentakuvaAnkkuri, null, 'ankkuri jäi roikkumaan poiston jälkeen');
  });
});

test('kartan siirto vie kuvaa mukanaan, ankkuri pysyy samana kartan kohtana', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = kartallinenUi();
    naytaLuentakuva(ui, KOEKAUPUNKI_KARTALLA);
    const naytto = ui.luentakuvaAnkkuri;
    const ankkuri = { ...naytto.ankkuri };
    const ennen = ankkurinPaikka(naytto);

    // Kartta panoroi 30 lautayksikköä itään ja 10 etelään.
    ui.siirraKarttaa(30, 10);
    const skaala = ui.nakyvaAlue().skaala;
    const jalkeen = laudaltaRuudulle(
      naytto.ankkuri, ui.nakyvaAlue(), PINNAN_LEVEYS, PINNAN_KORKEUS, ui.contentBox.w,
    );

    assert.deepEqual(naytto.ankkuri, ankkuri, 'kartan liike ei saa muuttaa ankkuria');
    assert.ok(Math.abs(jalkeen.x - (ennen.x - 30 * skaala)) < 0.2,
      'kuva ei seurannut karttaa vaakasuunnassa');
    assert.ok(Math.abs(jalkeen.y - (ennen.y - 10 * skaala)) < 0.2,
      'kuva ei seurannut karttaa pystysuunnassa');

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('raahaus siirtää ankkurin uuteen kartan kohtaan', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = kartallinenUi();
    naytaLuentakuva(ui, KOEKAUPUNKI_KARTALLA);
    const naytto = ui.luentakuvaAnkkuri;
    const paneeli = naytto.paneeli;
    const ennen = { ...naytto.ankkuri };
    const skaala = ui.nakyvaAlue().skaala;

    paneeli.dispatch('pointerdown', { clientX: 200, clientY: 400, pointerId: 1, button: 0 });
    paneeli.dispatch('pointermove', { clientX: 248, clientY: 372, pointerId: 1 });
    paneeli.dispatch('pointerup', { clientX: 248, clientY: 372, pointerId: 1 });

    assert.ok(naytto.raahattu, 'raahausta ei tunnistettu');
    assert.ok(Math.abs((naytto.ankkuri.x - ennen.x) - 48 / skaala) < 1e-6,
      'ankkuri ei siirtynyt sormen mukana oikealle');
    assert.ok(Math.abs((naytto.ankkuri.y - ennen.y) + 28 / skaala) < 1e-6,
      'ankkuri ei siirtynyt sormen mukana ylös');

    // Ankkuri on kartan kohta: sama piste ruudulla ja takaisin laudalle.
    const paikka = ankkurinPaikka(ui.luentakuvaAnkkuri);
    const takaisin = ruudultaLaudalle(paikka, ui.nakyvaAlue(), PINNAN_LEVEYS, PINNAN_KORKEUS);
    assert.ok(Math.abs(takaisin.x - naytto.ankkuri.x) < 0.05
      && Math.abs(takaisin.y - naytto.ankkuri.y) < 0.05,
    'ruutupaikka ja ankkuri eivät vastaa toisiaan');

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('napautus ilman liikettä ei siirrä ankkuria — se jää suurennoksen eleeksi', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = kartallinenUi();
    naytaLuentakuva(ui, KOEKAUPUNKI_KARTALLA);
    const naytto = ui.luentakuvaAnkkuri;
    const paneeli = naytto.paneeli;
    const ennen = { ...naytto.ankkuri };

    // Sormi liikahtaa kolme pikseliä: napautus, ei raahaus.
    paneeli.dispatch('pointerdown', { clientX: 200, clientY: 400, pointerId: 1, button: 0 });
    paneeli.dispatch('pointermove', { clientX: 202, clientY: 402, pointerId: 1 });
    paneeli.dispatch('pointerup', { clientX: 202, clientY: 402, pointerId: 1 });

    assert.equal(naytto.raahattu, false, 'napautus tulkittiin raahaukseksi');
    assert.deepEqual(naytto.ankkuri, ennen, 'napautus siirsi ankkuria');

    piilotaLuentakuva(ui, { heti: true });
  });
});

/*
 * NAPAUTUS EI SAA OTTAA OSOITINTA KIINNI (vika 9.9.2026: *"miksi isoisän
 * kuvat eivät aukea isoksi?"*).
 *
 * Kaapattu osoitin siirtää selaimessa myös `pointerup`- ja
 * `click`-tapahtuman kaappaajalle, jolloin paneelin SISÄLLÄ olevien
 * nappien (`.fokusvirta-kuva`, PULU-CAM-pakan `.pulucam-kuva`) omat
 * kuuntelijat eivät saa napautusta lainkaan — mitattuna Chromiumilla:
 * oikea hiiren tai sormen napautus ei avannut suurennosta, vaikka
 * ohjelmallinen `click()` (savukkeet) toimi. Sama havainto on kirjattu
 * jo js/karttazoom.js:ään. Kiinniotto kuuluu siksi vasta liikekynnyksen
 * ylitykseen, ja juuri se mitataan tässä.
 */
test('napautus ei ota osoitinta kiinni — raahaus ottaa', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = kartallinenUi();
    naytaLuentakuva(ui, KOEKAUPUNKI_KARTALLA);
    const paneeli = ui.luentakuvaAnkkuri.paneeli;
    const kaapatut = [];
    paneeli.setPointerCapture = (id) => kaapatut.push(id);
    paneeli.releasePointerCapture = () => {};

    // Napautus: kolme pikseliä, kynnyksen alle.
    paneeli.dispatch('pointerdown', { clientX: 200, clientY: 400, pointerId: 1, button: 0 });
    assert.deepEqual(kaapatut, [], 'napautus otti osoittimen kiinni');
    paneeli.dispatch('pointermove', { clientX: 202, clientY: 402, pointerId: 1 });
    paneeli.dispatch('pointerup', { clientX: 202, clientY: 402, pointerId: 1 });
    assert.deepEqual(kaapatut, [], 'napautus otti osoittimen kiinni');

    // Raahaus: kynnyksen yli, ja vasta silloin kiinniotto.
    paneeli.dispatch('pointerdown', { clientX: 200, clientY: 400, pointerId: 2, button: 0 });
    paneeli.dispatch('pointermove', { clientX: 260, clientY: 400, pointerId: 2 });
    assert.deepEqual(kaapatut, [2], 'raahaus ei ottanut osoitinta kiinni');
    paneeli.dispatch('pointermove', { clientX: 300, clientY: 400, pointerId: 2 });
    assert.deepEqual(kaapatut, [2], 'osoitin otettiin kiinni useammin kuin kerran');
    paneeli.dispatch('pointerup', { clientX: 300, clientY: 400, pointerId: 2 });

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('raahauksen jälkeinen klikki ei avaa suurennosta, seuraava avaa', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = kartallinenUi();
    naytaLuentakuva(ui, KOEKAUPUNKI_KARTALLA);
    const naytto = ui.luentakuvaAnkkuri;
    const nappi = naytto.paneeli.querySelector('.fokusvirta-kuva');

    naytto.paneeli.dispatch('pointerdown', { clientX: 200, clientY: 400, pointerId: 1, button: 0 });
    naytto.paneeli.dispatch('pointermove', { clientX: 260, clientY: 400, pointerId: 1 });
    naytto.paneeli.dispatch('pointerup', { clientX: 260, clientY: 400, pointerId: 1 });
    assert.ok(naytto.raahattu);

    // Selain lähettää klikin raahauksen päätteeksi: sen on vaiettava.
    nappi.dispatch('click');
    assert.equal(asiakirja.querySelectorAll('.fokuszoom').length, 0,
      'raahaus avasi suurennoksen');
    assert.equal(naytto.raahattu, false, 'lippu ei nollautunut');

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('raahaus ei pienennä kuvaa (ele ei ole kartan liike)', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = kartallinenUi();
    naytaLuentakuva(ui, KOEKAUPUNKI_KARTALLA);
    const paneeli = ui.luentakuva;
    // Sama pointerdown, joka kartalta tulisi, mutta kohteena on paneeli.
    kartanVeto(paneeli);
    assert.ok(!paneeli.classList.contains('pieni'),
      'kuvan oma ele ei ole kartan liike');
    piilotaLuentakuva(ui, { heti: true });
  });
});

test('pienennetty kuva pysyy ankkurissaan kartan kohdan päällä', () => {
  pakinKanssa(KOEKUVA, () => {
    const ui = kartallinenUi();
    naytaLuentakuva(ui, KOEKAUPUNKI_KARTALLA);
    const naytto = ui.luentakuvaAnkkuri;
    const ennen = { ...naytto.ankkuri };
    kartanVeto();
    assert.ok(ui.luentakuva.classList.contains('pieni'), 'kartan veto ei pienentänyt');
    assert.deepEqual(naytto.ankkuri, ennen, 'pienennys siirsi ankkuria');
    // Ankkuri on yhä sama kartan kohta, joten pieni kuva ei hyppää kulmaan.
    assert.equal(ui.luentakuvaAnkkuri, naytto);
    piilotaLuentakuva(ui, { heti: true });
  });
});
