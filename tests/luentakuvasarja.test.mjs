/*
 * ISOT KUVAT KESKELLÄ RUUTUA, SARJANA — ja matkakirjan tilapäinen
 * lyhennys (js/fokusvirta.js naytaLuentakuvasarja, js/lausejako.js).
 *
 * Omistaja 11.9.2026 klo 12.40 (Raamattu, SAAPUMISEN UUSI JARJESTYS:
 * KAUPUNGIN MINITRAILERI, ISOT KUVAT KESKELLA, LYHENNETTY MERKINTA),
 * sanatarkasti: *"Tee vaiaikainen muutos ja lyhenna tilapaisesti
 * matkakirjojen tekstista ja luennasta kaksi viimeista lausetta pois.
 * Lisaksi isoisan kuva saisi aueta keskelle sivua niin isolla kuin
 * mahdollista … Pulucamin kuvat tulisivat samalla tavalla. Jos niita on
 * useampi, pida neljan sekunnin tauko jokaisen valissa. Viimeinen kuva
 * feidautuisi naytolta 6 sekunnin kuluttua jolloin kartalle jaisi
 * nakyviin kuva pakka pienessa koossa"*.
 *
 * KOLME ASIAA, JOTKA EIVÄT NÄY DIFFISTÄ:
 *
 *   1. LYHENNYS ON LAUSERAJALLA EIKÄ MERKKIMÄÄRÄSSÄ. Desimaaliluku ja
 *      kellonaika eivät ole lauseen loppuja, koska sääntö vaatii välin
 *      pisteen jälkeen — ja juuri se ero katkaisisi merkinnän kesken
 *      lukua, jos sääntö joskus vaihdettaisiin.
 *   2. SARJAN KELLO ON 4 s JA 6 s. Väärässä järjestyksessä pakka
 *      nousisi ennen kuin kuvat on nähty; testi mittaa järjestyksen
 *      valeajastimilla eikä silmällä.
 *   3. KAUPUNGIN VAIHTO SIIVOAA AJASTIMET. Muuten edellisen kaupungin
 *      sarja nostaisi pakan uuden kaupungin kartalle.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { lyhennaLauseita, jaaLauseiksi, MATKAKIRJAN_LYHENNYS_LAUSEITA } from '../js/lausejako.js';

/* ---------------------------------------------------------------- */
/* 1. Lyhennys (puhdas funktio, ei DOMia)                            */
/* ---------------------------------------------------------------- */

test('kaksi viimeistä lausetta jää pois', () => {
  const teksti = 'Yksi lause. Toinen lause. Kolmas lause. Neljäs lause.';
  assert.equal(lyhennaLauseita(teksti, 2), 'Yksi lause. Toinen lause.');
  assert.equal(lyhennaLauseita(teksti, 1), 'Yksi lause. Toinen lause. Kolmas lause.');
});

test('huuto, kysymys ja kolme pistettä päättävät lauseen', () => {
  const teksti = 'Mitä ihmettä? Kas vain! Ja sitten… Loppu tässä.';
  assert.equal(jaaLauseiksi(teksti).length, 4);
  assert.equal(lyhennaLauseita(teksti, 2), 'Mitä ihmettä? Kas vain!');
});

test('desimaaliluku ja kellonaika eivät katkaise lausetta', () => {
  const teksti = 'Mittari näytti 3.5 astetta ja kello oli klo 10.30. Sitten tuli sade. '
    + 'Illalla satoi lisää. Yö oli hiljainen.';
  const lyhyt = lyhennaLauseita(teksti, 2);
  assert.equal(lyhyt, 'Mittari näytti 3.5 astetta ja kello oli klo 10.30. Sitten tuli sade.');
  assert.ok(lyhyt.includes('3.5'), 'desimaaliluku ei saa katketa');
  assert.ok(lyhyt.includes('klo 10.30'), 'kellonaika ei saa katketa');
});

test('yksi lause jää aina: kolmesta lauseesta ei lyhennetä kahta pois', () => {
  const kolme = 'Eka. Toka. Kolmas.';
  assert.equal(lyhennaLauseita(kolme, 2), kolme);
  assert.equal(lyhennaLauseita('Vain yksi lause.', 2), 'Vain yksi lause.');
  // Kytkin nollassa = paluu entiseen (omistaja: tilapäinen muutos).
  assert.equal(lyhennaLauseita('Eka. Toka. Kolmas. Neljäs.', 0), 'Eka. Toka. Kolmas. Neljäs.');
});

test('kytkin on kaksi ja se on yksi paikka', () => {
  assert.equal(MATKAKIRJAN_LYHENNYS_LAUSEITA, 2);
});

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli sarjaa varten                                     */
/* ---------------------------------------------------------------- */

class Teksti {
  constructor(data) {
    this.nodeType = 3;
    this.nodeValue = String(data);
    this.parentNode = null;
  }

  get textContent() { return this.nodeValue; }
}

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
    this.style = {
      setProperty(nimi2, arvo) { this[nimi2] = String(arvo); },
      getPropertyValue(nimi2) { return this[nimi2] ?? ''; },
    };
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) { this.luokat = String(arvo).split(/\s+/).filter(Boolean); }

  get classList() {
    return {
      add: (...ls) => ls.forEach((l) => { if (!this.luokat.includes(l)) this.luokat.push(l); }),
      remove: (...ls) => { this.luokat = this.luokat.filter((l) => !ls.includes(l)); },
      contains: (l) => this.luokat.includes(l),
      toggle: (l, tila) => {
        if (tila) this.classList.add(l);
        else this.classList.remove(l);
      },
    };
  }

  get textContent() { return this.childNodes.map((n) => n.textContent ?? '').join(''); }

  set textContent(arvo) {
    this.childNodes = [];
    if (arvo !== '' && arvo != null) this.appendChild(new Teksti(arvo));
  }

  get src() { return this.attrs.src ?? ''; }

  /*
   * Lataus ilmoitetaan onnistuneeksi seuraavalla kierroksella — muuten
   * sitkeän latauksen jonovahti (js/media.js) jää roikkumaan ja pitää
   * testiprosessin hengissä (sama malli kuin tests/luentakuva.test.mjs).
   */
  set src(arvo) {
    this.attrs.src = String(arvo);
    setTimeout(() => this.dispatch('load'), 0);
  }

  appendChild(solmu) {
    solmu.parentNode?.removeChild?.(solmu);
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

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, []);
    this.kuuntelijat.get(laji).push(fn);
  }

  removeEventListener(laji, fn) {
    const lista = this.kuuntelijat.get(laji) ?? [];
    this.kuuntelijat.set(laji, lista.filter((k) => k !== fn));
  }

  dispatch(laji, lisa = {}) {
    [...(this.kuuntelijat.get(laji) ?? [])].forEach((k) => k({ type: laji, target: this, ...lisa }));
  }

  get isConnected() {
    let solmu = this;
    while (solmu.parentNode) solmu = solmu.parentNode;
    return solmu === asiakirja.body;
  }

  * jalkelaiset() {
    for (const lapsi of this.childNodes) {
      if (lapsi.nodeType !== 1) continue;
      yield lapsi;
      yield* lapsi.jalkelaiset();
    }
  }

  querySelector(valitsin) { return this.querySelectorAll(valitsin)[0] ?? null; }

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

const dokumentinKuuntelijat = new Map();

const asiakirja = {
  body: new Elementti('body'),
  head: new Elementti('head'),
  createElement: (nimi) => new Elementti(nimi),
  createTextNode: (teksti) => new Teksti(teksti),
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: (valitsin) => asiakirja.body.querySelectorAll(valitsin),
  addEventListener: (laji, fn) => {
    if (!dokumentinKuuntelijat.has(laji)) dokumentinKuuntelijat.set(laji, []);
    dokumentinKuuntelijat.get(laji).push(fn);
  },
  removeEventListener: (laji, fn) => {
    const lista = dokumentinKuuntelijat.get(laji) ?? [];
    dokumentinKuuntelijat.set(laji, lista.filter((k) => k !== fn));
  },
};

globalThis.document = asiakirja;
// Suurennos esilataa kuvansa Image-oliolla (sama tynkä kuin pulucam-testissä).
globalThis.Image = function Image() { return new Elementti('img'); };

/** Kartan veto: pointerdown, jonka kohde ei ole sarja eikä paneeli. */
function kartanVeto() {
  const kohde = new Elementti('canvas');
  [...(dokumentinKuuntelijat.get('pointerdown') ?? [])]
    .forEach((k) => k({ type: 'pointerdown', target: kohde }));
}

const {
  naytaLuentakuvasarja, paataLuentakuvasarja, piilotaLuentakuva,
  naytaPulunKuvapakka,
  ISON_KUVAN_VAIHTO_MS, ISON_KUVAN_LOPPU_MS, LUENTAKUVAN_VAIHTO_MS,
} = await import('../js/fokusvirta.js');
const { fokusvirtaKaupungille } = await import('../js/packs/fokusvirrat.js');
const { sfx } = await import('../js/sound.js');

/*
 * DUBROVNIK ON KOEKAUPUNKI: sillä on isoisän luentakuva JA kolme pulun
 * kuvaa, eli sarja on pisin mahdollinen (neljä isoa kuvaa).
 */
const KOEKAUPUNKI = { id: 'dubrovnik', name: 'Dubrovnik' };
const PAKKI = fokusvirtaKaupungille(KOEKAUPUNKI.id);

/*
 * LUENTA ON NYT OSA SARJAN KELLOA (omistaja 11.9.2026 klo 14.35):
 * isoisän kuva pysyy suurena luennan ajan, ja ilman PuluCam-kuvia se
 * pienenee 6 s luennan päättymisestä. Teko-ui:lla on siksi sama
 * `luentaKesken`-kahva kuin oikealla (js/ui.js), ja testi kääntää sen.
 */
function tekoUi(kaupunki = KOEKAUPUNKI, { luenta = true } = {}) {
  const ui = {
    game: { pack: { id: 'maailmankartta' }, player: {}, cityOf: () => kaupunki },
    luentaaKesken: luenta,
    luentaKesken: () => ui.luentaaKesken,
  };
  return ui;
}

/*
 * KELLON KELAUS NELJÄNNESSEKUNNIN ASKELIN. Luennan loppua vartioidaan
 * ketjutetulla setTimeoutilla (js/fokusvirta.js vahtiLuennanLoppua), ja
 * Noden valeajastin ajaa ticking aikana syntyneet ajastimet vasta
 * seuraavalla tickillä — yksi iso tick näkisi siis vain yhden kyselyn.
 * Askelittainen kelaus vastaa oikeaa kelloa.
 */
function kelaa(t, ms, askel = 250) {
  for (let jaljella = ms; jaljella > 0; jaljella -= askel) {
    t.mock.timers.tick(Math.min(askel, jaljella));
  }
}

/** Pulun kommentin hetki: sama kutsu kuin fokusvirtaSaapumiskuplassa. */
function pulunKommentti(ui, kaupunki = KOEKAUPUNKI) {
  return naytaPulunKuvapakka(ui, kaupunki);
}

/*
 * SIIVOUS TESTIEN VÄLISSÄ. Valeajastimien nollaus peruu myös sarjan
 * oman poistoajastimen (700 ms), joten häipyvä päällys voi jäädä
 * puuhun seuraavan testin ajaksi. Siivous on siis testin oma, ei
 * moduulin vika.
 */
function siivoa(ui) {
  piilotaLuentakuva(ui, { heti: true });
  for (const el of asiakirja.body.querySelectorAll('.fokusvirta-isokuva')) el.remove();
}

const isot = () => asiakirja.body.querySelectorAll('.fokusvirta-isokuva-ruutu');
const paallys = () => asiakirja.body.querySelectorAll('.fokusvirta-isokuva');
const paneelit = () => asiakirja.body.querySelectorAll('.fokusvirta-luentakuva');

/* ---------------------------------------------------------------- */
/* 2. Sarjan ajastus                                                 */
/* ---------------------------------------------------------------- */

test('isoisän kuva pysyy suurena koko luennan ajan', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  assert.equal(naytaLuentakuvasarja(ui, KOEKAUPUNKI), true);
  t.mock.timers.tick(60);

  // Isoisän kuva yksin keskellä ruutua — ei kartan paneelia vielä.
  assert.equal(isot().length, 1, 'ensin vain isoisän kuva');
  assert.equal(paneelit().length, 0, 'kartalle ei nouse mitään sarjan aikana');
  assert.equal(isot()[0].querySelectorAll('.pulucam-merkki').length, 0,
    'isoisän kuvassa ei ole PULU-CAM-sinettiä');
  assert.ok(isot()[0].querySelector('.fokusvirta-isokuva-teksti'),
    'lyhyt kuvateksti kiinni kuvan alalaidassa');

  /*
   * NELJÄ SEKUNTIA EI ENÄÄ VAIHDA MITÄÄN (omistaja 11.9.2026 klo 14.35:
   * *"pulcam kuvat tulevat vasta kun pulun oma repliikki alkaa"*).
   */
  kelaa(t, ISON_KUVAN_VAIHTO_MS);
  assert.equal(isot().length, 1, 'PuluCam ei ala luennan aikana');
  kelaa(t, 30000);
  assert.equal(isot().length, 1, 'isoisä pysyy suurena niin kauan kuin luenta');
  assert.equal(paneelit().length, 0, 'pakka ei nouse kesken luennan');

  siivoa(ui);
  t.mock.timers.reset();
});

test('pulun kommentti aloittaa PuluCam-sarjan: 4 s välein ja 6 s lopuksi', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  assert.equal(naytaLuentakuvasarja(ui, KOEKAUPUNKI), true);
  t.mock.timers.tick(60);

  // Luenta loppuu, ja kommentti tulee pian sen perään.
  ui.luentaaKesken = false;
  t.mock.timers.tick(1000);
  assert.equal(paneelit().length, 0, 'kuusi sekuntia ei ole vielä kulunut');

  // Ensimmäinen PuluCam-kuva tulee heti kommentin alkaessa.
  assert.equal(pulunKommentti(ui), true, 'kommentti aloittaa sarjan');
  t.mock.timers.tick(60);
  assert.equal(isot().length, 2, 'vanha ruutu jää hetkeksi ristihäivytykseen');
  assert.equal(isot().at(-1).querySelectorAll('.pulucam-merkki').length, 1,
    'pulun kuvassa on PULU-CAM-sinetti');

  // Loput pulun kuvat, kukin neljän sekunnin välein.
  const pulunKuvia = PAKKI.pollo.kuvat.length;
  for (let i = 1; i < pulunKuvia; i += 1) t.mock.timers.tick(ISON_KUVAN_VAIHTO_MS);
  assert.equal(paneelit().length, 0, 'pakka ei nouse ennen viimeistä kuvaa');

  // Kuusi sekuntia viimeisen jälkeen: iso häipyy, pieni pakka kartalle.
  t.mock.timers.tick(ISON_KUVAN_LOPPU_MS);
  assert.equal(paneelit().length, 1, 'kartalle jää kuvapakka');
  assert.ok(paneelit()[0].classList.contains('pieni'), 'pakka jää PIENEEN kokoon');
  assert.equal(paneelit()[0].querySelectorAll('.pulucam-kortti').length, pulunKuvia,
    'kaikki kortit heti mukana, ei pulpahdusviiveitä');
  assert.ok(ui.luentakuva, 'paneeli jää muistiin kartan omaksi kuvaksi');

  siivoa(ui);
  t.mock.timers.reset();
});

test('kommentti kesken luennan aloittaa sarjan silti', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  naytaLuentakuvasarja(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  // Luenta on yhä kesken — kommentin hetki on silti sarjan hetki.
  assert.equal(pulunKommentti(ui), true);
  t.mock.timers.tick(60);
  assert.equal(isot().at(-1).querySelectorAll('.pulucam-merkki').length, 1);
  siivoa(ui);
  t.mock.timers.reset();
});

test('ilman pulun kuvia isoisän kuva pienenee 6 s LUENNAN lopusta', (t) => {
  const kuvat = PAKKI.pollo.kuvat;
  delete PAKKI.pollo.kuvat;
  t.mock.timers.enable({ apis: ['setTimeout'] });
  try {
    const ui = tekoUi();
    assert.equal(naytaLuentakuvasarja(ui, KOEKAUPUNKI), true);
    t.mock.timers.tick(60);
    assert.equal(isot().length, 1);

    // Pitkäkin luenta pitää kuvan suurena.
    kelaa(t, 20000);
    assert.equal(paneelit().length, 0, 'kello lähtee vasta luennan lopusta');

    ui.luentaaKesken = false;
    // Vahti huomaa lopun neljännessekunnissa, sitten kuusi sekuntia.
    kelaa(t, 250 + ISON_KUVAN_LOPPU_MS - 400);
    assert.equal(paneelit().length, 0, 'kuusi sekuntia on kuusi sekuntia');
    kelaa(t, 800);
    assert.equal(paneelit().length, 1);
    assert.ok(paneelit()[0].classList.contains('pieni'));
    assert.equal(paneelit()[0].querySelectorAll('.pulucam-kortti').length, 0);
    siivoa(ui);
  } finally {
    PAKKI.pollo.kuvat = kuvat;
    t.mock.timers.reset();
  }
});

test('ilman luentaa kello lähtee alkukatosta eikä kuva jää roikkumaan', (t) => {
  const kuvat = PAKKI.pollo.kuvat;
  delete PAKKI.pollo.kuvat;
  t.mock.timers.enable({ apis: ['setTimeout'] });
  try {
    // Mykistys, kertojatila 'ei' tai puuttuva äänite: luentaa ei tule.
    const ui = tekoUi(KOEKAUPUNKI, { luenta: false });
    naytaLuentakuvasarja(ui, KOEKAUPUNKI);
    t.mock.timers.tick(60);
    /*
     * KAKSI ALKUKATTOA (12.9.2026). Kuva odottaa ensin luennan ALKUA
     * (odotaLuennanAlku, 4 s) ja sitten sen LOPPUA (vahtiLuennanLoppua,
     * 4 s) — ilman luentaa kumpikaan ei koskaan tapahdu, ja molemmat
     * katot on kuljettava ennen kuin kuva pienenee. Ilman ensimmäistä
     * kattoa mykistetty peli ei saisi kuvaa lainkaan.
     */
    // Alkuvahti kysyy 200 ms:n välein, joten kelaus samalla askeleella.
    kelaa(t, 4200, 200);
    assert.equal(paallys().length, 1, 'kuva tulee ilman luentaakin, alkukaton jälkeen');
    kelaa(t, 4000 + ISON_KUVAN_LOPPU_MS + 500);
    assert.equal(paneelit().length, 1, 'kuva pienenee myös ilman luentaa');
    siivoa(ui);
  } finally {
    PAKKI.pollo.kuvat = kuvat;
    t.mock.timers.reset();
  }
});

/* ---------------------------------------------------------------- */
/* 2b. Toinen luentakuva luennan puolivälissä                        */
/* ---------------------------------------------------------------- */

/*
 * Omistaja 11.9.2026 klo 14.35, sanatarkasti: *"isoisan kertomuksiin
 * voisi generoida toisen kuvan lisaa kaikkiin euroopan kaupunkeihin …
 * kuva saisi vaihtua uuden lyhennetyn puheen puolivalissa. voi kayttaa
 * keskimaaraista aikaa"*.
 */
const KUVA2 = {
  osoite: 'https://media.matkakirja.app/matkakirja/koe-luentakuva-2.jpg',
  lyhyt: 'Toinen kuva: satama aamulla.',
  selite: 'Koekuva toista luentakuvaa varten.',
  lahde: 'Koe',
};

/** Ajaa tehtävän pakin `luentakuva2`-kentän kanssa ja siivoaa perässä. */
function kakkoskuvanKanssa(tyo) {
  PAKKI.matkakirja.luentakuva2 = KUVA2;
  try { tyo(); } finally { delete PAKKI.matkakirja.luentakuva2; }
}

/*
 * Päällimmäisen ison ruudun kuva tunnistetaan ALT-tekstistä: `src`
 * asetetaan sitkeän latauksen kautta (js/media.js) eli epäsynkronisesti,
 * mutta alt ja kuvateksti kirjoitetaan heti ruutua rakennettaessa.
 */
const ylinKuva = () => isot().at(-1).querySelector('.fokusvirta-isokuva-kuva').alt;

test('vakio on 9 s: keskimääräinen puoliväli, yksi luku kaikille', () => {
  assert.equal(LUENTAKUVAN_VAIHTO_MS, 9000);
});

test('toinen kuva vaihtuu 9 s kohdalla, kuvateksti mukana', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  kakkoskuvanKanssa(() => {
    const ui = tekoUi();
    naytaLuentakuvasarja(ui, KOEKAUPUNKI);
    t.mock.timers.tick(60);
    assert.notEqual(ylinKuva(), KUVA2.lyhyt, 'ensin kuva 1');

    t.mock.timers.tick(LUENTAKUVAN_VAIHTO_MS - 500);
    assert.notEqual(ylinKuva(), KUVA2.lyhyt, 'ei vaihdu etuajassa');

    t.mock.timers.tick(600);
    assert.equal(ylinKuva(), KUVA2.lyhyt, 'puolivälissä kuva 2');
    assert.equal(isot().at(-1).querySelector('.fokusvirta-isokuva-teksti').textContent,
      KUVA2.lyhyt, 'kuvateksti vaihtui kuvan mukana');
    assert.equal(isot().at(-1).querySelectorAll('.pulucam-merkki').length, 0,
      'isoisän kakkoskuva ei ole PuluCam-kuva');

    // Kartalle jää viimeksi näytetty kuva eli kuva 2.
    ui.luentaaKesken = false;
    kelaa(t, 250 + ISON_KUVAN_LOPPU_MS + 200);
    const kartalla = paneelit()[0]?.querySelector('img');
    assert.equal(kartalla?.alt, KUVA2.lyhyt, 'pieneen pakkaan jää kuva 2');
    siivoa(ui);
  });
  t.mock.timers.reset();
});

test('ilman luentakuva2-kenttää mikään ei vaihdu', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  naytaLuentakuvasarja(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  const eka = ylinKuva();
  t.mock.timers.tick(LUENTAKUVAN_VAIHTO_MS + 1000);
  assert.equal(isot().length, 1, 'yksi kuva, ei vaihtoa');
  assert.equal(ylinKuva(), eka);
  siivoa(ui);
  t.mock.timers.reset();
});

test('karusellissa ovat molemmat isoisän kuvat ja sitten PuluCam', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  kakkoskuvanKanssa(() => {
    const ui = tekoUi();
    naytaLuentakuvasarja(ui, KOEKAUPUNKI);
    t.mock.timers.tick(60 + LUENTAKUVAN_VAIHTO_MS);
    ui.luentaaKesken = false;
    pulunKommentti(ui);
    const pulunKuvia = PAKKI.pollo.kuvat.length;
    t.mock.timers.tick((pulunKuvia - 1) * ISON_KUVAN_VAIHTO_MS + ISON_KUVAN_LOPPU_MS + 60);

    const kortit = asiakirja.body.querySelectorAll('.pulucam-kortti');
    assert.equal(kortit.length, pulunKuvia, 'pakka nousi kartalle');
    /*
     * KOLME VAIHETTA (omistaja 11.9.2026): pieni pakka aukeaa
     * ensimmäisestä napautuksesta VIUHKAKSI, ja vasta viuhkassa kortin
     * napautus vie koko ruudulle. Peukalonkynnen kokoisesta pinosta ei
     * voi valita kuvaa, joten ensimmäinen napautus ei voi tarkoittaa
     * "tämä kuva".
     */
    const paneeli = asiakirja.body.querySelectorAll('.fokusvirta-luentakuva')[0];
    assert.ok(paneeli.classList.contains('pieni'), 'pakka on pienenä kartalla');
    kortit.at(-1).dispatch('click');
    assert.ok(paneeli.classList.contains('levitetty'), 'ensimmäinen napautus levittää viuhkan');
    assert.equal(asiakirja.body.querySelectorAll('.fokuszoom').length, 0,
      'viuhkan avaus ei saa viedä suoraan koko ruudulle');
    kortit.at(-1).dispatch('click');
    const kerros = asiakirja.body.querySelectorAll('.fokuszoom')[0];
    assert.ok(kerros, 'karuselli ei auennut');
    // Kaksi isoisän kuvaa + pulun kuvat, ja auki on päällimmäinen.
    const laskuri = kerros.querySelector('.fokuszoom-laskuri').textContent;
    assert.equal(laskuri, `${2 + pulunKuvia} / ${2 + pulunKuvia}`);
    siivoa(ui);
    for (const el of asiakirja.body.querySelectorAll('.fokuszoom')) el.remove();
  });
  t.mock.timers.reset();
});

/* ---------------------------------------------------------------- */
/* 3. Kartan liike ja kaupungin vaihto                               */
/* ---------------------------------------------------------------- */

test('kartan liike vie sarjan loppuun heti pieneen pakkaan', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  naytaLuentakuvasarja(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  assert.equal(paallys().length, 1);

  // Kartan veto = pelaaja haluaa kartan: sarja hyppää pakkaan.
  kartanVeto();
  assert.equal(paallys().length, 0, 'iso päällys lähtee heti');
  assert.equal(paneelit().length, 1, 'pakka nousee kartalle');
  assert.ok(paneelit()[0].classList.contains('pieni'));

  siivoa(ui);
  t.mock.timers.reset();
});

test('kaupungin vaihto siivoaa sarjan ajastimet eikä nosta pakkaa', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let kaupunki = KOEKAUPUNKI;
  // Luenta soi: kuva tulee ruudulle heti (odotaLuennanAlku).
  const ui = {
    game: { pack: { id: 'maailmankartta' }, player: {}, cityOf: () => kaupunki },
    luentaKesken: () => true,
  };
  naytaLuentakuvasarja(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  assert.equal(paallys().length, 1);

  kaupunki = { id: 'riika', name: 'Riika' };
  siivoa(ui);
  assert.equal(paallys().length, 0, 'sarja lähtee kaupungin mukana');
  assert.ok(!ui.luentakuvasarja);

  // Vanhat ajastimet eivät saa herätä uudessa kaupungissa.
  t.mock.timers.tick(ISON_KUVAN_VAIHTO_MS * 5 + ISON_KUVAN_LOPPU_MS);
  assert.equal(paallys().length, 0);
  assert.equal(paneelit().length, 0);
  t.mock.timers.reset();
});

test('päättynyt sarja ei pääty toiseen kertaan', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  naytaLuentakuvasarja(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  assert.equal(paataLuentakuvasarja(ui, { heti: true }), true);
  assert.equal(paataLuentakuvasarja(ui, { heti: true }), false);
  siivoa(ui);
  t.mock.timers.reset();
});

/* ---------------------------------------------------------------- */
/* 4. Kameran klik jokaiselle sarjan kuvalle                         */
/* ---------------------------------------------------------------- */

/*
 * Omistaja 11.9.2026 klo 12.55 (Raamattu, MINITRAILERIN LISAYKSET),
 * sanatarkasti: *"Kuville tarvitaan kameran KLIK aani tehoste"*.
 * Sarjassa kuvat vaihtuvat neljän sekunnin välein, ja klik kuuluu
 * VAIHDON hetkeen — myös isoisän ensimmäiseen kuvaan, joka aukeaa
 * keskelle ilman ajastinta. Soittoportti on sama kuin minitrailerilla
 * (js/saapumistraileri.js soitaKameranKlik → js/sound.js sfx).
 */
test('kameran klik soi jokaiselle sarjan kuvalle', (t) => {
  const tehosteet = [];
  t.mock.method(sfx, 'play', (nimi) => { tehosteet.push(nimi); });
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  const kuvia = 1 + (PAKKI.pollo?.kuvat?.length ?? 0);
  assert.ok(kuvia > 1, 'koekaupungilla on isoisän kuva ja pulun kuvia');

  naytaLuentakuvasarja(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  assert.equal(tehosteet.filter((n) => n === 'pulu.kamera-klik').length, 1,
    'isoisän kuva avautuu keskelle: yksi laukaisin');

  // Sarja alkaa pulun kommentista: ensimmäinen PuluCam-kuva heti, loput 4 s välein.
  ui.luentaaKesken = false;
  pulunKommentti(ui);
  assert.equal(tehosteet.filter((n) => n === 'pulu.kamera-klik').length, 2,
    'kommentin ensimmäinen PuluCam-kuva: klik');
  for (let i = 2; i < kuvia; i += 1) {
    t.mock.timers.tick(ISON_KUVAN_VAIHTO_MS);
    assert.equal(tehosteet.filter((n) => n === 'pulu.kamera-klik').length, i + 1,
      `PuluCam-kuva ${i} vaihtuu tilalle: klik`);
  }

  // Sarjan loppu (pieni pakka) ei enää laukaise kameraa.
  t.mock.timers.tick(ISON_KUVAN_LOPPU_MS);
  assert.equal(tehosteet.filter((n) => n === 'pulu.kamera-klik').length, kuvia);
  siivoa(ui);
  t.mock.timers.reset();
});

/* ---------------------------------------------------------------- */
/* 4. Omistajan vikailmoitukset 12.9.2026                            */
/* ---------------------------------------------------------------- */

/*
 * VIKA 1: *"pulun kuvat eivät tule jostain syystä isoisän kuvien
 * jälkeen näkyville"*.
 *
 * JUURISYY (mitattu Chromiumilla 12.9.2026, Venetsia työpöydällä):
 * isoisän kuvalla on kello, joka päättää sarjan 6 s LUENNAN
 * PÄÄTTYMISESTÄ, mutta pulun kommentti odottaa luennan loppua, 0,9 s
 * taukoa ja mahdollista paljastussarjaa — kommentti nousi ruudulle
 * 44,4 s kohdalla, kun sarja oli purkautunut jo 35,2 s kohdalla.
 * Silloin `ui.luentakuvasarja` oli null ja aloitaPuluCamSarja palasi
 * heti: PuluCam-kuvat eivät tulleet koskaan isoina. Yksikään vanha
 * vartio ei nähnyt tätä, koska kaikki aloittivat kommentin SARJAN
 * AIKANA — juuri siksi vika pääsi peliin.
 */
test('pulun kuvat tulevat isoina VAIKKA isoisän sarja on jo ehtinyt päättyä', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  naytaLuentakuvasarja(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);

  // Luenta loppuu ja isoisän kello vie sarjan loppuun ennen kommenttia.
  ui.luentaaKesken = false;
  kelaa(t, ISON_KUVAN_LOPPU_MS + 1000);
  assert.equal(ui.luentakuvasarja, null, 'sarja on purkautunut ennen kommenttia');
  assert.equal(paallys().length, 0, 'iso päällys on poissa');
  assert.equal(paneelit().length, 1, 'kartalla on isoisän kuva');

  // Kommentti tulee vasta nyt — ja pulun kuvat on silti nähtävä isoina.
  assert.equal(pulunKommentti(ui), true, 'myöhästynyt kommentti aloittaa sarjan');
  t.mock.timers.tick(60);
  assert.equal(paallys().length, 1, 'pulun kuville avautuu oma päällys');
  assert.equal(isot().length, 1, 'ensimmäinen pulun kuva keskellä ruutua');
  assert.equal(isot().at(-1).querySelectorAll('.pulucam-merkki').length, 1,
    'ja se on PULU-CAM-kuva');

  // Sarja päättyy normaalisti pieneen pakkaan.
  const pulunKuvia = PAKKI.pollo.kuvat.length;
  for (let i = 1; i < pulunKuvia; i += 1) t.mock.timers.tick(ISON_KUVAN_VAIHTO_MS);
  t.mock.timers.tick(ISON_KUVAN_LOPPU_MS);
  assert.equal(paneelit().length, 1, 'kartalle jää yksi paneeli');
  assert.equal(paneelit()[0].querySelectorAll('.pulucam-kortti').length, pulunKuvia,
    'pakassa ovat kaikki pulun kuvat');

  siivoa(ui);
  t.mock.timers.reset();
});

test('pulun kuvien iso sarja ajetaan vain kerran kaupunkia kohti', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  naytaLuentakuvasarja(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  ui.luentaaKesken = false;
  assert.equal(pulunKommentti(ui), true);
  // Sarja loppuun asti.
  const pulunKuvia = PAKKI.pollo.kuvat.length;
  for (let i = 1; i < pulunKuvia; i += 1) t.mock.timers.tick(ISON_KUVAN_VAIHTO_MS);
  t.mock.timers.tick(ISON_KUVAN_LOPPU_MS);
  // Päällyksen poisto on oma ajastimensa (700 ms), ja Noden valeajastin
  // ajaa tickin aikana syntyneet vasta seuraavalla tickillä.
  t.mock.timers.tick(1000);
  assert.equal(paallys().length, 0);

  // Toinen kutsu (paluukäynti kortille) ei saa aloittaa sarjaa uudestaan.
  assert.equal(pulunKommentti(ui), false, 'sarja ei lähde toiselle kierrokselle');
  t.mock.timers.tick(60);
  assert.equal(paallys().length, 0, 'ruudulle ei tule uutta päällystä');

  siivoa(ui);
  t.mock.timers.reset();
});

test('pakka ei nouse kartalle ennen pulun kommenttia', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi();
  naytaLuentakuvasarja(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  ui.luentaaKesken = false;
  kelaa(t, ISON_KUVAN_LOPPU_MS + 1000);
  assert.equal(paneelit().length, 1, 'isoisän kuva jää kartalle');
  /*
   * PAKKA KUULUU PULUN HETKEEN (Raamattu): jos se nousisi jo tässä,
   * pelaaja näkisi pulun kuvat pikkukuvina ennen niiden omaa sarjaa.
   */
  assert.equal(paneelit()[0].querySelectorAll('.pulucam-kortti').length, 0,
    'pulun kortteja ei ole vielä');
  siivoa(ui);
  t.mock.timers.reset();
});

/*
 * VIKA 2: *"kun tullaan ateenaan niin isoisän kuvat saisi tulla vasta
 * kun isoisän luenta alkaa. nyt ne tulivat heti kun ateenaan oli
 * saavuttu ja pulun aloituskommentit vasta alkoivat"*.
 *
 * Ensisaapumisella luenta on LYKKÄYKSESSÄ (`ui.luennanLykkays`) siihen
 * asti, että pulun kaksi aloituskuplaa on sanottu (js/livia.js
 * odotaLuenta → ui.aloitaLykattyLuenta). Kutsuhetki on siis eri asia
 * kuin luennan alku, ja kuva kuuluu jälkimmäiseen.
 */
test('isoisän kuva odottaa lykätyn luennan alkua eikä tule kutsusta', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi(KOEKAUPUNKI, { luenta: false });
  ui.luennanLykkays = true;
  assert.equal(naytaLuentakuvasarja(ui, KOEKAUPUNKI), true);
  t.mock.timers.tick(60);
  assert.equal(paallys().length, 0, 'kuvaa ei ole ennen luentaa');

  // Pulun aloituskuplat kestävät: kuva ei saa tulla alkukatossakaan.
  kelaa(t, 20000, 200);
  assert.equal(paallys().length, 0, 'lykkäys pitää kuvan poissa');

  // Kuplat sanottu, luenta lähtee — nyt kuva.
  ui.luennanLykkays = false;
  ui.luentaaKesken = true;
  kelaa(t, 400, 200);
  assert.equal(paallys().length, 1, 'kuva tulee luennan alkaessa');

  siivoa(ui);
  t.mock.timers.reset();
});

test('kaupungista lähtö peruu myös odottavan kuvan', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const ui = tekoUi(KOEKAUPUNKI, { luenta: false });
  ui.luennanLykkays = true;
  naytaLuentakuvasarja(ui, KOEKAUPUNKI);
  t.mock.timers.tick(60);
  siivoa(ui);
  // Luenta "alkaisi" vasta lähdön jälkeen: kuva ei saa ilmestyä.
  ui.luennanLykkays = false;
  ui.luentaaKesken = true;
  kelaa(t, 2000, 200);
  assert.equal(paallys().length, 0, 'odotus peruuntui kaupungin mukana');
  t.mock.timers.reset();
});

/* ---------------------------------------------------------------- */
/* 5. Kerrosjärjestys: kuva jää matkakirjakortin alle                */
/* ---------------------------------------------------------------- */

/*
 * Omistaja 12.9.2026, sanatarkasti: *"kuva saisi jäädä matkakirjan
 * alle"*. Kuvaa EI pienennetä eikä piiloteta — isot luentakuvat ovat
 * omistajan tilaus ja se pysyy; ratkeaa PINOSTA.
 *
 * Matkakirjakortti asuu `.railissa` (z-index 4) `.app`-kerroksen
 * sisällä, ja `.app` on `position: fixed` eli oma pinonsa. Rungon
 * lapsena päällys olisi kortin päällä millä tahansa z-indexillä, joten
 * sen on ladottava itsensä samaan pinoon: `.stage`-solmun lapseksi.
 * Mitattu Chromiumilla 12.9.2026 (1280 × 800, Venetsia): ennen kuva
 * peitti kortista 53 % ja kortin tekstialasta näkyi 46 %; jälkeen
 * kortti maalautuu päälle ja tekstialasta näkyy 100 %.
 */
test('iso päällys ladotaan .stageen, ei rungon lapseksi', (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const stage = new Elementti('main');
  stage.className = 'stage';
  asiakirja.body.appendChild(stage);
  const vanha = asiakirja.querySelector;
  asiakirja.querySelector = (valitsin) => (valitsin === '.stage' ? stage : null);
  try {
    const ui = tekoUi();
    naytaLuentakuvasarja(ui, KOEKAUPUNKI);
    t.mock.timers.tick(60);
    const kehys = asiakirja.body.querySelector('.fokusvirta-isokuva');
    assert.ok(kehys, 'päällys syntyi');
    assert.equal(kehys.parentNode, stage,
      'päällys on .stagen lapsi — samassa pinossa kortin kanssa');
    siivoa(ui);
  } finally {
    asiakirja.querySelector = vanha;
    stage.remove();
    t.mock.timers.reset();
  }
});
