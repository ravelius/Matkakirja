/*
 * PULU-CAM: PULUN KUVAT PAKKANA ISOISÄN KUVAN PÄÄLLE (js/pulucam.js,
 * js/fokusvirta.js naytaPulunKuvapakka).
 *
 * Omistaja 9.9.2026 klo 15.20–15.30 (Raamattu, "PULU-CAM: PULUN
 * NYKYAJAN KUVAT PAKKANA ISOISAN KUVAN PAALLE, YHTEINEN KARUSELLI").
 *
 * SEITSEMÄN ASIAA, JOTKA EIVÄT NÄY DIFFISTÄ EIVÄTKÄ KAAPPAUKSESTA:
 *
 *   1. PAKKA EI NOUSE ENNEN KOMMENTTIA. Kuvat kuuluvat siihen hetkeen,
 *      jossa pulu alkaa puhua — ei luennan alkuun. Sama koukku kuin
 *      Etsi aarre -napilla, ja juuri sellainen ajoitus lipsahtaa
 *      hiljaa väärään paikkaan, kun paneelia joskus muokataan.
 *   2. YKSI, KAKSI TAI KOLME KUVAA, JOKAINEN OMASSA KULMASSAAN JA
 *      OMASSA PAIKASSAAN. Ilman erillisiä asentoja pakka näyttäisi
 *      yhdeltä kuvalta — omistajan sana oli, että "siinä hahmottaa,
 *      että pakassa on useampi kuva".
 *   3. MERKKI ON HTML:ÄÄ, EI KUVAAN POLTETTU. Teksti PULU-CAM on oma
 *      elementtinsä jokaisessa pulun kuvassa, myös suurennoksessa.
 *   4. KARUSELLIN JÄRJESTYS ON ISOISÄ ENSIN. Se on omistajan sanoma
 *      järjestys eikä napautuskohdan mukainen — ja se on juuri se,
 *      mikä kääntyisi vahingossa "avaa se kuva, jota painoit"
 *      -logiikaksi.
 *   5. RAAHAUS SIIRTÄÄ KOKO PAKKAA, koska pakka asuu luentakuvan
 *      paneelissa. Erillinen pakan oma ankkuri olisi toinen
 *      totuus samasta paikasta.
 *   6. KAUPUNGISTA LÄHTÖ POISTAA PAKAN — myös sen pulpahdusajastimet,
 *      jotka muuten herättäisivät pakan seuraavassa kaupungissa.
 *   7. ILMAN KENTTÄÄ MIKÄÄN EI MUUTU. Kuvaton kaupunki on täsmälleen
 *      ennallaan, eikä suurennos saa kasvattaa rakennettaan.
 *
 * DOM-osuus ajetaan samalla pienellä puumallilla kuin
 * tests/luentakuva.test.mjs: Nodessa ei ole selainta, eikä repoon oteta
 * jsdomia. Selainpuoli (pulpahdus, limitys, merkin koko) on katsottu
 * erikseen Chromiumilla ruutukaappauksesta.
 *
 * KUVAT LISÄTÄÄN VAIN TESTIN AJAKSI muistissa olevaan pakkiin:
 * tuotantodataan ei kuulu tässä kokeiluerässä yhtään pulun kuvaa
 * (kuvatoimitus tuo viiden kuvan erän myöhemmin).
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  PULUCAM_ASENNOT, PULUCAM_KATTO, PULUCAM_VALIT_MS, PULU_CAM_SELFIE_OSOITE,
  PULU_CAM_TEKSTI, pulucamAsento, pulucamViive, pulunKuvat,
} from '../js/pulucam.js';

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli (sama kaava kuin tests/luentakuva.test.mjs)       */
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
  if (v.startsWith('.')) {
    return v.slice(1).split('.').every((l) => el.luokat.includes(l));
  }
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
    /* Merkin varakuvake ladotaan innerHTML:llä (POLLO_IKONI). */
    this.innerHTML = '';
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

  get src() { return this.attrs.src ?? ''; }

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

  replaceChildren(...solmut) {
    this.childNodes = [];
    solmut.forEach((s) => this.appendChild(s));
  }

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

  dispatch(laji, lisa = {}) {
    [...(this.kuuntelijat.get(laji) ?? [])].forEach((k) => k({
      type: laji,
      target: this,
      stopPropagation() {},
      preventDefault() {},
      ...lisa,
    }));
  }

  /** Suurennoksen poisto lähettää oman tapahtumansa (fokuszoom-poistuu). */
  dispatchEvent(tapahtuma) {
    this.dispatch(tapahtuma?.type ?? '', {});
    return true;
  }

  getBoundingClientRect() {
    return {
      left: 0, top: 0, width: 200, height: 140, right: 200, bottom: 140,
    };
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

const dokumentinKuuntelijat = new Map();

const asiakirja = {
  body: new Elementti('body'),
  createElement: (nimi) => new Elementti(nimi),
  createTextNode: (teksti) => new Teksti(teksti),
  getElementById: () => null,
  querySelector: (valitsin) => (valitsin.includes('map-pane') || valitsin.includes('fact-card')
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

globalThis.document = asiakirja;
// Suurennos mitoittaa itsensä ruudusta; ilman mittoja se jättää
// mitoituksen väliin eikä testi näkisi kuvatilan mittaa.
globalThis.innerWidth = 1200;
globalThis.innerHeight = 900;
/*
 * Suurennos hakee ison version omalla Image-oliollaan (avaaSuurennos
 * nayta): mallissa se on tavallinen kuvasolmu, jonka `src` ilmoittaa
 * latauksen onnistuneeksi seuraavalla kierroksella.
 */
globalThis.Image = function Image() { return new Elementti('img'); };

/** Näppäimistön tapahtuma dokumentille (karusellin selaus). */
function nappain(key) {
  [...(dokumentinKuuntelijat.get('keydown') ?? [])].forEach((k) => k({
    type: 'keydown', key, stopPropagation() {}, preventDefault() {},
  }));
}

/** Kartan veto: pointerdown, jonka kohde ei ole paneeli eikä suurennos. */
function kartanVeto(kohde = new Elementti('canvas')) {
  [...(dokumentinKuuntelijat.get('pointerdown') ?? [])]
    .forEach((k) => k({ type: 'pointerdown', target: kohde }));
}

const odota = (ms) => new Promise((r) => { setTimeout(r, ms); });

/* ---------------------------------------------------------------- */
/* Moduulit vasta DOM-mallin jälkeen                                 */
/* ---------------------------------------------------------------- */

const {
  fokusvirtaPulunKuvat, naytaLuentakuva, naytaPulunKuvapakka,
  piilotaLuentakuva, pienennaLuentakuva, suljeSuurennos,
} = await import('../js/fokusvirta.js');
const { fokusvirtaKaupungille } = await import('../js/packs/fokusvirrat.js');
const { julisteUrl } = await import('../js/media.js');

/* ---------------------------------------------------------------- */
/* Koekaupunki ja koekuvat                                           */
/* ---------------------------------------------------------------- */

const KOEKAUPUNKI = { id: 'sofia', name: 'Sofia' };
const PAKKI = fokusvirtaKaupungille(KOEKAUPUNKI.id);

/** Isoisän luentakuva: pakan pohja. */
const POHJAKUVA = {
  ampari: 'luentakuvat/koe-sofia.jpg',
  lyhyt: 'Torin laita aamulla.',
  selite: 'Koekuva: torin laita aamun ensimmäisessä valossa.',
  lahde: 'Matkakirjan havainnekuva',
};

/** Kolme pulun kuvaa toimituksen järjestyksessä. */
const PULUN_KUVAT = [
  {
    ampari: 'pulucam/koe-sofia-1.jpg',
    lyhyt: 'Pulu katolla.',
    selite: 'PULU-CAM: pulu katolla, kaupunki auringossa.',
    lahde: 'Pulun kamera',
  },
  {
    ampari: 'pulucam/koe-sofia-2.jpg',
    lyhyt: 'Pulu torilla.',
    selite: 'PULU-CAM: pulu torilla, ihastus kahvilan tuolilla.',
    lahde: 'Pulun kamera',
  },
  {
    osoite: 'https://media.matkakirja.app/pulucam/koe-sofia-3.jpg',
    lyhyt: 'Pulu sillalla.',
    selite: 'PULU-CAM: pulu sillalla, ihastus jo toisella rannalla.',
    lahde: 'Pulun kamera',
  },
];

function tekoUi() {
  return {
    game: {
      pack: { id: 'maailmankartta' },
      player: {},
      cityOf: () => KOEKAUPUNKI,
    },
  };
}

/** Kentät pakkiin vain yhden testin ajaksi. */
function pakinKanssa({ luentakuva, kuvat }, tyo) {
  if (luentakuva) PAKKI.matkakirja.luentakuva = luentakuva;
  if (kuvat) PAKKI.pollo.kuvat = kuvat;
  try {
    return tyo();
  } finally {
    delete PAKKI.matkakirja.luentakuva;
    delete PAKKI.pollo.kuvat;
  }
}

/** Paneeli, pakka ja kortit ruudulta. */
function pakanKortit() {
  return asiakirja.querySelectorAll('.pulucam-kuva');
}

/* ---------------------------------------------------------------- */
/* 1. Kentän luku: 1–3 kuvaa, osoitteeton karsiutuu                  */
/* ---------------------------------------------------------------- */

test('pollo.kuvat luetaan toimituksen järjestyksessä, enintään kolme', () => {
  assert.equal(pulunKuvat(null).length, 0);
  assert.equal(pulunKuvat({ pollo: {} }).length, 0);
  assert.equal(pulunKuvat({ pollo: { kuvat: 'ei lista' } }).length, 0);

  const yksi = pulunKuvat({ pollo: { kuvat: [PULUN_KUVAT[0]] } });
  assert.equal(yksi.length, 1);
  assert.equal(yksi[0], PULUN_KUVAT[0]);

  const kolme = pulunKuvat({ pollo: { kuvat: PULUN_KUVAT } });
  assert.deepEqual(kolme, PULUN_KUVAT, 'järjestys on toimituksen järjestys');

  // Neljäs jää pois: katto on kolme (omistaja: "kaksi tai kolme").
  assert.equal(PULUCAM_KATTO, 3);
  const nelja = pulunKuvat({ pollo: { kuvat: [...PULUN_KUVAT, { ...PULUN_KUVAT[0] }] } });
  assert.equal(nelja.length, 3);

  // Osoitteeton kuva karsiutuu — sama ehto kuin luentakuvalla.
  const vajaa = pulunKuvat({ pollo: { kuvat: [{ selite: 'ei kuvaa' }, PULUN_KUVAT[1]] } });
  assert.deepEqual(vajaa, [PULUN_KUVAT[1]]);
});

test('asennot ja pulpahdusvälit ovat deterministisiä ja haarukassa', () => {
  assert.equal(PULUCAM_ASENNOT.length, 3);
  // Eri suuntiin: kulmat eivät saa olla samat eivätkä nollia.
  const kulmat = PULUCAM_ASENNOT.map((a) => a.kulma);
  assert.deepEqual(kulmat, [4, -3, 2]);
  assert.equal(new Set(kulmat).size, 3);
  for (const asento of PULUCAM_ASENNOT) {
    // Siirtymä 6–10 % kuvan koosta kummassakin suunnassa.
    assert.ok(Math.abs(asento.x) >= 6 && Math.abs(asento.x) <= 10, `x ${asento.x}`);
    assert.ok(Math.abs(asento.y) >= 6 && Math.abs(asento.y) <= 10, `y ${asento.y}`);
  }
  // Sama sija, sama asento joka ajolla.
  assert.deepEqual(pulucamAsento(1), pulucamAsento(1));
  assert.deepEqual(pulucamAsento(0), PULUCAM_ASENNOT[0]);

  // Ensimmäinen heti, seuraavat 0,9–1,2 s välein.
  assert.equal(pulucamViive(0), 0);
  for (let i = 1; i < PULUCAM_VALIT_MS.length; i += 1) {
    const vali = PULUCAM_VALIT_MS[i];
    assert.ok(vali >= 900 && vali <= 1200, `väli ${vali} ei ole haarukassa 900–1200 ms`);
    assert.equal(pulucamViive(i), pulucamViive(i - 1) + vali);
  }
});

/* ---------------------------------------------------------------- */
/* 2. Pakka ei nouse ennen kommenttia                                */
/* ---------------------------------------------------------------- */

test('luentakuva yksin ei nosta pakkaa — kuvat kuuluvat kommenttiin', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, () => {
    const ui = tekoUi();
    assert.equal(naytaLuentakuva(ui, KOEKAUPUNKI), true);
    assert.equal(pakanKortit().length, 0, 'pakka nousi jo luennan alussa');
    assert.equal(asiakirja.querySelectorAll('.pulucam-pakka').length, 0);
    assert.ok(!ui.pulucamPakka);

    // Vasta kommentin hetki nostaa pakan (fokusvirtaSaapumiskupla → nayta).
    assert.equal(naytaPulunKuvapakka(ui, KOEKAUPUNKI), true);
    assert.equal(asiakirja.querySelectorAll('.pulucam-pakka').length, 1);
    assert.ok(ui.pulucamPakka);

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('ilman pollo.kuvat-kenttää pakkaa ei synny lainkaan', () => {
  pakinKanssa({ luentakuva: POHJAKUVA }, () => {
    const ui = tekoUi();
    assert.deepEqual(fokusvirtaPulunKuvat(ui, KOEKAUPUNKI), []);
    naytaLuentakuva(ui, KOEKAUPUNKI);
    assert.equal(naytaPulunKuvapakka(ui, KOEKAUPUNKI), false);
    assert.equal(asiakirja.querySelectorAll('.pulucam-pakka').length, 0);
    piilotaLuentakuva(ui, { heti: true });
  });
});

/* ---------------------------------------------------------------- */
/* 3. Pakka: kulmat, paikat ja PULU-CAM-merkki                       */
/* ---------------------------------------------------------------- */

test('kolme kuvaa pulpahtaa yksitellen, kukin omaan kulmaansa ja paikkaansa', async () => {
  await pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, async () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);

    // Ensimmäinen nousee heti, seuraavat vasta viiveellä.
    assert.equal(pakanKortit().length, 1, 'ensimmäisen kuvan pitää nousta heti');
    assert.equal(ui.pulucamPakka.kortit.length, 3);

    await odota(pulucamViive(2) + 120);
    const kortit = pakanKortit();
    assert.equal(kortit.length, 3, 'kaikkien kolmen kuvan pitää pulpahtaa');

    kortit.forEach((kortti, i) => {
      const asento = pulucamAsento(i);
      assert.equal(kortti.style['--pulucam-kulma'], `${asento.kulma}deg`, `kulma ${i}`);
      assert.equal(kortti.style['--pulucam-x'], `${asento.x}%`, `x ${i}`);
      assert.equal(kortti.style['--pulucam-y'], `${asento.y}%`, `y ${i}`);
      // Päällimmäisenä viimeisenä pulpahtanut.
      assert.equal(kortti.style['--pulucam-kerros'], String(i + 1));
      assert.ok(kortti.classList.contains('nakyy'), `kortti ${i} ei noussut näkyviin`);
    });

    // Kulmat ja paikat ovat oikeasti eri: pakan pitää näyttää pakalta.
    const kulmat = new Set(kortit.map((k) => k.style['--pulucam-kulma']));
    assert.equal(kulmat.size, 3, 'kaikilla kuvilla on sama kulma');

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('jokaisessa pulun kuvassa on PULU-CAM-merkki: selfie ja erillinen teksti', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: [PULUN_KUVAT[0]] }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);

    const kortti = pakanKortit()[0];
    const merkki = kortti.querySelector('.pulucam-merkki');
    assert.ok(merkki, 'PULU-CAM-merkki puuttuu');
    // Teksti on OMA elementtinsä, ei kuvaan poltettu pikseli.
    const teksti = merkki.querySelector('.pulucam-teksti');
    assert.equal(teksti.textContent, PULU_CAM_TEKSTI);
    assert.equal(PULU_CAM_TEKSTI, 'PULU-CAM');

    // Selfie: kuvatoimituksen PNG puuttuu vielä, joten varakuvake on
    // pelin nykyinen pulun kuvake (js/pollo.js POLLO_IKONI).
    const selfie = merkki.querySelector('.pulucam-selfie');
    assert.ok(selfie, 'selfie-merkki puuttuu');
    assert.equal(PULU_CAM_SELFIE_OSOITE, null,
      'kun kuvatoimitus toimittaa selfien, päivitä myös tämä testi');
    assert.match(selfie.innerHTML, /<svg/, 'varakuvake ei ole pelin oma pulun kuvake');

    // Kuvassa itsessään on lyhyt kuvateksti alt-tekstinä (kartalla lyhyt).
    assert.equal(kortti.querySelector('img').alt, PULUN_KUVAT[0].lyhyt);
    assert.equal(kortti.querySelector('img').getAttribute('src'),
      julisteUrl(PULUN_KUVAT[0].ampari));

    piilotaLuentakuva(ui, { heti: true });
  });
});

/* ---------------------------------------------------------------- */
/* 4. Yhteinen karuselli: isoisä ensin                               */
/* ---------------------------------------------------------------- */

test('päällimmäisen kuvan napautus avaa karusellin isoisän kuvasta', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);

    pakanKortit()[0].dispatch('click');
    const kerros = asiakirja.querySelectorAll('.fokuszoom')[0];
    assert.ok(kerros, 'karuselli ei auennut');

    // 1 isoisän kuva + 3 pulun kuvaa, ja ISOISÄ ENSIN.
    assert.equal(kerros.querySelector('.fokuszoom-laskuri').textContent, '1 / 4');
    assert.equal(kerros.querySelector('.fokuszoom-selite').textContent, POHJAKUVA.selite);
    // Lähderivi kulkee jokaisella kuvalla (CC BY).
    assert.equal(kerros.querySelector('.fokuszoom-lahde').textContent, POHJAKUVA.lahde);
    // Nuolinapit kumpaankin suuntaan.
    assert.equal(kerros.querySelectorAll('.fokuszoom-nuoli').length, 2);

    // Merkki on olemassa mutta piilossa isoisän kuvassa.
    const merkki = kerros.querySelector('.pulucam-suuri');
    assert.ok(merkki, 'suurennoksesta puuttuu PULU-CAM-merkki');
    assert.equal(merkki.hidden, true, 'isoisän kuvassa ei saa olla PULU-CAM-merkkiä');

    // Seuraava kuva on ensimmäinen PULUN kuva, merkkeineen.
    nappain('ArrowRight');
    assert.equal(kerros.querySelector('.fokuszoom-laskuri').textContent, '2 / 4');
    assert.equal(kerros.querySelector('.fokuszoom-selite').textContent, PULUN_KUVAT[0].selite);
    assert.equal(merkki.hidden, false, 'pulun kuvasta puuttuu PULU-CAM-merkki');
    assert.equal(merkki.querySelector('.pulucam-teksti').textContent, PULU_CAM_TEKSTI);

    // Loput järjestyksessä.
    nappain('ArrowRight');
    assert.equal(kerros.querySelector('.fokuszoom-selite').textContent, PULUN_KUVAT[1].selite);
    nappain('ArrowRight');
    assert.equal(kerros.querySelector('.fokuszoom-selite').textContent, PULUN_KUVAT[2].selite);
    // Pyörii ympäri takaisin isoisään.
    nappain('ArrowRight');
    assert.equal(kerros.querySelector('.fokuszoom-selite').textContent, POHJAKUVA.selite);

    suljeSuurennos(ui);
    assert.equal(asiakirja.querySelectorAll('.fokuszoom').length, 0);
    // Sulkeminen palauttaa kartan pakkoineen.
    assert.equal(asiakirja.querySelectorAll('.pulucam-pakka').length, 1);

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('isoisän kuvan napautus avaa saman karusellin, kun pakka on päällä', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);

    ui.luentakuva.querySelector('.fokusvirta-kuva').dispatch('click');
    const kerros = asiakirja.querySelectorAll('.fokuszoom')[0];
    assert.equal(kerros.querySelector('.fokuszoom-laskuri').textContent, '1 / 4');
    assert.equal(kerros.querySelector('.fokuszoom-selite').textContent, POHJAKUVA.selite);

    suljeSuurennos(ui);
    piilotaLuentakuva(ui, { heti: true });
  });
});

test('ilman pulun kuvia suurennos on täsmälleen ennallaan', () => {
  pakinKanssa({ luentakuva: POHJAKUVA }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    ui.luentakuva.querySelector('.fokusvirta-kuva').dispatch('click');

    const kerros = asiakirja.querySelectorAll('.fokuszoom')[0];
    assert.ok(kerros, 'yhden kuvan suurennos ei auennut');
    // Yksi kuva: ei laskuria, ei nuolia, ei merkkiä eikä kuvatilan kuorta.
    assert.equal(kerros.querySelector('.fokuszoom-laskuri').textContent, '');
    assert.equal(kerros.querySelectorAll('.fokuszoom-nuoli').length, 0);
    assert.equal(kerros.querySelectorAll('.pulucam-merkki').length, 0);
    assert.equal(kerros.querySelectorAll('.fokuszoom-kuvatila').length, 0,
      'kuvatilan kuori syntyy vain karusellissa');
    assert.equal(kerros.querySelector('.fokuszoom-selite').textContent, POHJAKUVA.selite);

    suljeSuurennos(ui);
    piilotaLuentakuva(ui, { heti: true });
  });
});

/* ---------------------------------------------------------------- */
/* 5. Pakka on luentakuvan paneelissa: raahaus ja pienennys          */
/* ---------------------------------------------------------------- */

test('pakka asuu luentakuvan paneelissa — raahaus siirtää koko pakkaa', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);

    const paneeli = ui.luentakuva;
    const pakka = paneeli.querySelector('.pulucam-pakka');
    assert.ok(pakka, 'pakka ei ole paneelin sisällä');
    // Kuori on pakko: nappiin ei ladota nappeja eikä sen leikkauksen alle.
    assert.equal(pakka.parentNode.className, 'fokusvirta-kuvatila');
    assert.equal(pakka.closest('.fokusvirta-luentakuva'), paneeli,
      'pakka ei kulje paneelin mukana — raahaus jättäisi sen paikalleen');
    assert.equal(pakanKortit()[0].closest('.fokusvirta-luentakuva'), paneeli);

    piilotaLuentakuva(ui, { heti: true });
  });
});

/*
 * OIKEA RAAHAUS TARVITSEE ANKKURIN, ja ankkurointi tarvitsee
 * karttapinnan ja näkyvän alueen (js/fokusvirta.js ankkuroiLuentakuva).
 * Sama teline kuin tests/luentakuva.test.mjs:ssä.
 */
const PINNAN_LEVEYS = 430;
const PINNAN_KORKEUS = 930;
const KOEKAUPUNKI_KARTALLA = { ...KOEKAUPUNKI, x: 5000, y: 3100 };

function kartallinenUi() {
  const skaala = PINNAN_LEVEYS / 240;
  const alue = {
    x: KOEKAUPUNKI_KARTALLA.x - PINNAN_LEVEYS / (2 * skaala),
    y: KOEKAUPUNKI_KARTALLA.y - PINNAN_KORKEUS / (2 * skaala),
    w: PINNAN_LEVEYS / skaala,
    h: PINNAN_KORKEUS / skaala,
    skaala,
  };
  return {
    game: {
      pack: { id: 'maailmankartta' },
      player: {},
      cityOf: () => KOEKAUPUNKI_KARTALLA,
    },
    mapPane: {
      clientWidth: PINNAN_LEVEYS,
      clientHeight: PINNAN_KORKEUS,
      getBoundingClientRect: () => ({
        left: 0, top: 0, width: PINNAN_LEVEYS, height: PINNAN_KORKEUS,
      }),
    },
    contentBox: { w: 12000, h: 6000 },
    nakyvaAlue: () => alue,
  };
}

test('raahaus siirtää koko pakkaa eikä sen päätteeksi avaudu karuselli', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, () => {
    const ui = kartallinenUi();
    naytaLuentakuva(ui, KOEKAUPUNKI_KARTALLA);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI_KARTALLA);

    const naytto = ui.luentakuvaAnkkuri;
    assert.ok(naytto, 'paneelia ei ankkuroitu');
    const kortti = pakanKortit()[0];
    const ennen = { ...naytto.ankkuri };
    const skaala = ui.nakyvaAlue().skaala;

    // Yksi ele paneelin päällä siirtää ankkurin — ja pakka on paneelin
    // sisällä, joten se siirtyy samalla eleellä eikä jää paikalleen.
    naytto.paneeli.dispatch('pointerdown', { clientX: 200, clientY: 400, pointerId: 1, button: 0 });
    naytto.paneeli.dispatch('pointermove', { clientX: 260, clientY: 372, pointerId: 1 });
    naytto.paneeli.dispatch('pointerup', { clientX: 260, clientY: 372, pointerId: 1 });

    assert.ok(naytto.raahattu, 'raahausta ei tunnistettu');
    assert.ok(Math.abs((naytto.ankkuri.x - ennen.x) - 60 / skaala) < 1e-6,
      'pakan ankkuri ei siirtynyt sormen mukana');
    assert.equal(kortti.closest('.fokusvirta-luentakuva'), naytto.paneeli,
      'pakka irtosi paneelista raahauksessa');

    // Selain lähettää klikin raahauksen päätteeksi: sen on vaiettava.
    kortti.dispatch('click');
    assert.equal(asiakirja.querySelectorAll('.fokuszoom').length, 0,
      'raahaus avasi karusellin');
    // Seuraava napautus avaa normaalisti.
    kortti.dispatch('click');
    assert.equal(asiakirja.querySelectorAll('.fokuszoom').length, 1);

    suljeSuurennos(ui);
    piilotaLuentakuva(ui, { heti: true });
  });
});

test('kartan liike pienentää luentakuvan ja pakan yhdessä', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    // Luennan loppu on ehtinyt kutistaa kuvan ennen kommenttia…
    pienennaLuentakuva(ui);
    assert.ok(ui.luentakuva.classList.contains('pieni'));

    // …ja pakka nostaa sen takaisin isoksi: pakka ei nouse
    // peukalonkynnen kokoisen kuvan päälle.
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);
    assert.ok(!ui.luentakuva.classList.contains('pieni'),
      'pakka nousi kutistetun kuvan päälle');

    // Kartan liike pienentää molemmat yhdessä: pakka on paneelin sisällä.
    kartanVeto();
    assert.ok(ui.luentakuva.classList.contains('pieni'));
    assert.equal(asiakirja.querySelectorAll('.pulucam-pakka').length, 1,
      'pienennys ei saa poistaa pakkaa');

    piilotaLuentakuva(ui, { heti: true });
  });
});

/* ---------------------------------------------------------------- */
/* 6. Kaupungista lähtö poistaa pakan                                */
/* ---------------------------------------------------------------- */

test('kaupungista lähtö poistaa pakan ja sen pulpahdusajastimet', async () => {
  await pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, async () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);
    assert.equal(pakanKortit().length, 1);

    // vaiennaLivianKaupunkipuhe tekee juuri tämän.
    piilotaLuentakuva(ui, { heti: true });
    assert.equal(asiakirja.querySelectorAll('.pulucam-pakka').length, 0);
    assert.equal(pakanKortit().length, 0);
    assert.equal(ui.pulucamPakka, null);

    // Ajastimet eivät saa herättää pakkaa jälkikäteen.
    await odota(pulucamViive(2) + 120);
    assert.equal(asiakirja.querySelectorAll('.pulucam-kuva').length, 0,
      'pulpahdusajastin nosti kuvan lähdön jälkeen');
  });
});

test('uusi pakka korvaa vanhan — kahta pakkaa ei jää päällekkäin', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);
    assert.equal(asiakirja.querySelectorAll('.pulucam-pakka').length, 1);
    piilotaLuentakuva(ui, { heti: true });
  });
});

/* ---------------------------------------------------------------- */
/* 7. Pohjaton pakka: pulun kuvat ilman isoisän luentakuvaa          */
/* ---------------------------------------------------------------- */

test('ilman luentakuvaa pakka nousee samaan paikkaan ilman pohjakuvaa', () => {
  pakinKanssa({ kuvat: PULUN_KUVAT }, () => {
    const ui = tekoUi();
    // Luentakuvaa ei ole: luennan aikana kartalle ei nouse mitään.
    assert.equal(naytaLuentakuva(ui, KOEKAUPUNKI), false);
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 0);

    // Kommentti nostaa pakan omaan pohjattomaan paneeliinsa.
    assert.equal(naytaPulunKuvapakka(ui, KOEKAUPUNKI), true);
    const paneeli = ui.luentakuva;
    assert.ok(paneeli, 'pohjaton pakka tarvitsee saman paneelin kuin luentakuva');
    assert.ok(paneeli.classList.contains('pulucam-pohjaton'));
    assert.ok(paneeli.querySelector('.pulucam-pohja'), 'pohjalaatikko puuttuu');
    // Isoisän kuvaa ei ole: ei kuvaa, ei kuvatekstilaatikkoa.
    assert.equal(paneeli.querySelectorAll('img').length, 1,
      'pohjattomassa paneelissa saa olla vain pakan oma kuva');
    assert.equal(paneeli.querySelectorAll('.fokusvirta-luentateksti').length, 0);
    assert.equal(pakanKortit().length, 1);

    // Karuselli alkaa suoraan pulun kuvista.
    pakanKortit()[0].dispatch('click');
    const kerros = asiakirja.querySelectorAll('.fokuszoom')[0];
    assert.equal(kerros.querySelector('.fokuszoom-laskuri').textContent, '1 / 3');
    assert.equal(kerros.querySelector('.fokuszoom-selite').textContent, PULUN_KUVAT[0].selite);
    assert.equal(kerros.querySelector('.pulucam-suuri').hidden, false);

    suljeSuurennos(ui);
    piilotaLuentakuva(ui, { heti: true });
    assert.equal(asiakirja.querySelectorAll('.fokusvirta-luentakuva').length, 0);
  });
});

/* ---------------------------------------------------------------- */
/* 8. Tuotantodata: kenttä on vapaaehtoinen ja oikean muotoinen      */
/* ---------------------------------------------------------------- */

test('jokaisella pakin pulun kuvalla on osoite, selite ja lähde', async () => {
  const { FOKUSVIRRAT } = await import('../js/packs/fokusvirrat.js');
  for (const [id, virta] of Object.entries(FOKUSVIRRAT)) {
    const kuvat = virta?.pollo?.kuvat;
    if (!kuvat) continue; // kenttä on vapaaehtoinen
    assert.ok(Array.isArray(kuvat), `${id}: pollo.kuvat ei ole lista`);
    assert.ok(kuvat.length >= 1 && kuvat.length <= PULUCAM_KATTO,
      `${id}: pulun kuvia saa olla 1–${PULUCAM_KATTO}, on ${kuvat.length}`);
    for (const kuva of kuvat) {
      assert.ok(kuva.osoite || kuva.ampari || kuva.tiedosto, `${id}: pulun kuvalta puuttuu osoite`);
      assert.ok(String(kuva.selite ?? '').trim(), `${id}: pulun kuvalta puuttuu selite`);
      // CC BY vaatii tekijän maininnan; lähde on siksi pakollinen.
      assert.ok(String(kuva.lahde ?? '').trim(), `${id}: pulun kuvalta puuttuu lähde`);
    }
  }
});
