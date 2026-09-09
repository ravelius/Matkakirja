/*
 * PULU-CAM: PULUN KUVAT PAKKANA ISOISÄN KUVAN PÄÄLLE (js/pulucam.js,
 * js/fokusvirta.js naytaPulunKuvapakka).
 *
 * Omistaja 9.9.2026 klo 15.20–15.30 (Raamattu, "PULU-CAM: PULUN
 * NYKYAJAN KUVAT PAKKANA ISOISAN KUVAN PAALLE, YHTEINEN KARUSELLI").
 *
 * TARKENNUS 9.9.2026 klo 18.50 (Raamattu, "PULU-CAM: RAKKAUSKOHTAUS
 * 3-5 KUVAA, KAKSI KUVATEKSTIA MOLEMMILLE, HAVAINNEKUVA-LINKKI PITKAN
 * LOPUSSA, TARRA YHTENA PNG:NA OMISTAJAN VALINNASTA").
 *
 * KYMMENEN ASIAA, JOTKA EIVÄT NÄY DIFFISTÄ EIVÄTKÄ KAAPPAUKSESTA:
 *
 *   1. PAKKA EI NOUSE ENNEN KOMMENTTIA. Kuvat kuuluvat siihen hetkeen,
 *      jossa pulu alkaa puhua — ei luennan alkuun. Sama koukku kuin
 *      Etsi aarre -napilla, ja juuri sellainen ajoitus lipsahtaa
 *      hiljaa väärään paikkaan, kun paneelia joskus muokataan.
 *   2. YHDESTÄ VIITEEN KUVAA, JOKAINEN OMASSA KULMASSAAN JA OMASSA
 *      PAIKASSAAN. Ilman erillisiä asentoja pakka näyttäisi yhdeltä
 *      kuvalta — omistajan sana oli, että "siinä hahmottaa, että
 *      pakassa on useampi kuva". Rakkauskohtaus saa viisi, joten
 *      asentoja on oltava viisi eikä kolmea kierrätettynä.
 *   3. TARRA ON YKSI PNG, EI KUVAAN POLTETTU EIKÄ HTML-TEKSTI. Ennen
 *      omistajan valintaa (PULU_CAM_TARRA_OSOITE null) pulun kuvissa
 *      EI ole mitään merkkiä — ei varakuvaketta, ei tekstiä.
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
 *   8. LYHYT KUVATEKSTI KERTOO PÄÄLLIMMÄISESTÄ KUVASTA. Pakan noustessa
 *      isoisän kuva jää alle; kartalla lukeva teksti seuraa sitä kuvaa,
 *      joka on ruudulla.
 *   9. PITKÄ KUVATEKSTI VAIHTUU KARUSELLISSA KUVAN MUKANA, sekä isoisän
 *      että pulun kuvilla.
 *  10. HAVAINNEKUVA-LINKKI ON PITKÄN TEKSTIN PERÄSSÄ JA VAIN SIELLÄ.
 *      Lyhyeen tekstiin ei koskaan tule linkkiä, ja lähderivi säilyy
 *      omanaan.
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
  PULUCAM_ASENNOT, PULUCAM_KATTO, PULUCAM_TARRA_KATTO_PX, PULUCAM_TARRA_OSUUS,
  PULUCAM_VALIT_MS, PULU_CAM_TARRA_OSOITE, puluCamMerkki, pulucamAsento, pulucamViive,
  pulunKuvat,
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
    /* Talon muut piirtäjät latovat kuvakkeita innerHTML:llä. */
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
const { HAVAINNEKUVA_LINKKI_TEKSTI } = await import('../js/havainnekuva.js');

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

/**
 * Kolme pulun kuvaa toimituksen järjestyksessä (tavallinen kohde).
 *
 * KOLMANNEN LÄHDE ON HAVAINNEKUVA tarkoituksella: omistajan sääntö on,
 * että pulun kuva saa Havainnekuva-linkin *jos lähde sen sanoo* —
 * kahdella ensimmäisellä sitä ei siis saa olla.
 */
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
    lahde: 'Matkakirjan havainnekuva',
  },
];

/** Rakkauskohtauksen viisi kuvaa (omistaja 9.9.2026 klo 18.50). */
const VIISI_KUVAA = [
  ...PULUN_KUVAT,
  {
    ampari: 'pulucam/koe-sofia-4.jpg',
    lyhyt: 'Pulu portilla.',
    selite: 'PULU-CAM: pulu portilla, ihastus katoaa kujalle.',
    lahde: 'Pulun kamera',
  },
  {
    ampari: 'pulucam/koe-sofia-5.jpg',
    lyhyt: 'Pulu kirkon räystäällä.',
    selite: 'PULU-CAM: pulu kirkon räystäällä, ihastus kaukana torilla.',
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
/* 1. Kentän luku: 1–5 kuvaa, osoitteeton karsiutuu                  */
/* ---------------------------------------------------------------- */

test('pollo.kuvat luetaan toimituksen järjestyksessä, enintään viisi', () => {
  assert.equal(pulunKuvat(null).length, 0);
  assert.equal(pulunKuvat({ pollo: {} }).length, 0);
  assert.equal(pulunKuvat({ pollo: { kuvat: 'ei lista' } }).length, 0);

  const yksi = pulunKuvat({ pollo: { kuvat: [PULUN_KUVAT[0]] } });
  assert.equal(yksi.length, 1);
  assert.equal(yksi[0], PULUN_KUVAT[0]);

  const kolme = pulunKuvat({ pollo: { kuvat: PULUN_KUVAT } });
  assert.deepEqual(kolme, PULUN_KUVAT, 'järjestys on toimituksen järjestys');

  /*
   * KATTO ON VIISI (omistaja 9.9.2026 klo 18.50: tavallinen kohde 1–3,
   * rakkauskohtaus 3–5) — pakassa on isoisän kanssa enintään kuusi
   * kuvaa. Kuudes pulun kuva jää pois.
   */
  assert.equal(PULUCAM_KATTO, 5);
  assert.deepEqual(pulunKuvat({ pollo: { kuvat: VIISI_KUVAA } }), VIISI_KUVAA);
  const kuusi = pulunKuvat({ pollo: { kuvat: [...VIISI_KUVAA, { ...PULUN_KUVAT[0] }] } });
  assert.equal(kuusi.length, 5);

  // Osoitteeton kuva karsiutuu — sama ehto kuin luentakuvalla.
  const vajaa = pulunKuvat({ pollo: { kuvat: [{ selite: 'ei kuvaa' }, PULUN_KUVAT[1]] } });
  assert.deepEqual(vajaa, [PULUN_KUVAT[1]]);
});

test('asennot ja pulpahdusvälit ovat deterministisiä ja haarukassa', () => {
  // Viisi asentoa viidelle kuvalle: neljäs ja viides eivät ole kolmen
  // ensimmäisen kierrätystä, vaan omia kulmiaan ja neljänneksiään.
  assert.equal(PULUCAM_ASENNOT.length, PULUCAM_KATTO);
  // Eri suuntiin: kulmat eivät saa olla samat eivätkä nollia.
  const kulmat = PULUCAM_ASENNOT.map((a) => a.kulma);
  assert.deepEqual(kulmat, [4, -3, 2, -6, 7]);
  assert.equal(new Set(kulmat).size, PULUCAM_KATTO);
  const paikat = new Set(PULUCAM_ASENNOT.map((a) => `${a.x},${a.y}`));
  assert.equal(paikat.size, PULUCAM_KATTO, 'kaksi kuvaa asettuisi päällekkäin');
  for (const asento of PULUCAM_ASENNOT) {
    assert.notEqual(asento.kulma, 0, 'suora kortti ei erotu pakasta');
    // Siirtymä 6–10 % kuvan koosta kummassakin suunnassa.
    assert.ok(Math.abs(asento.x) >= 6 && Math.abs(asento.x) <= 10, `x ${asento.x}`);
    assert.ok(Math.abs(asento.y) >= 6 && Math.abs(asento.y) <= 10, `y ${asento.y}`);
  }
  // Sama sija, sama asento joka ajolla.
  assert.deepEqual(pulucamAsento(1), pulucamAsento(1));
  assert.deepEqual(pulucamAsento(0), PULUCAM_ASENNOT[0]);
  assert.deepEqual(pulucamAsento(4), PULUCAM_ASENNOT[4]);

  // Ensimmäinen heti, seuraavat 0,9–1,2 s välein — yksi väli kuvaa
  // kohti, myös rakkauskohtauksen neljännelle ja viidennelle.
  assert.equal(PULUCAM_VALIT_MS.length, PULUCAM_KATTO);
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

test('viisi kuvaa pulpahtaa yksitellen, kukin omaan kulmaansa ja paikkaansa', async () => {
  await pakinKanssa({ luentakuva: POHJAKUVA, kuvat: VIISI_KUVAA }, async () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);

    // Ensimmäinen nousee heti, seuraavat vasta viiveellä.
    assert.equal(pakanKortit().length, 1, 'ensimmäisen kuvan pitää nousta heti');
    assert.equal(ui.pulucamPakka.kortit.length, 5);

    await odota(pulucamViive(4) + 120);
    const kortit = pakanKortit();
    assert.equal(kortit.length, 5, 'kaikkien viiden kuvan pitää pulpahtaa');

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
    assert.equal(kulmat.size, 5, 'kahdella kuvalla on sama kulma');
    const paikat = new Set(kortit.map((k) => `${k.style['--pulucam-x']},${k.style['--pulucam-y']}`));
    assert.equal(paikat.size, 5, 'kaksi kuvaa asettui täsmälleen päällekkäin');

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('ilman omistajan valitsemaa tarraa pulun kuvat näkyvät puhtaina', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: [PULUN_KUVAT[0]] }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);

    /*
     * OMISTAJA EI OLE VIELÄ VALINNUT TARRAA (A–F), joten kuvissa ei saa
     * olla mitään merkkiä: ei tarraa, ei varakuvaketta eikä
     * HTML-tekstiä "PULU-CAM". Kun tarra valitaan, tämä testi
     * päivitetään yhdessä vakion kanssa.
     */
    assert.equal(PULU_CAM_TARRA_OSOITE, null,
      'kun omistaja valitsee tarran, päivitä myös tämä testi');
    const kortti = pakanKortit()[0];
    assert.equal(kortti.querySelectorAll('.pulucam-merkki').length, 0);
    assert.equal(kortti.querySelectorAll('.pulucam-tarra').length, 0);
    assert.equal(kortti.querySelectorAll('.pulucam-teksti').length, 0);
    assert.equal(puluCamMerkki(), null, 'ilman osoitetta merkkiä ei synny');
    assert.equal(kortti.textContent, '', 'kuvan päälle jäi tekstiä');

    // Kuvassa itsessään on lyhyt kuvateksti alt-tekstinä (kartalla lyhyt).
    assert.equal(kortti.querySelector('img').alt, PULUN_KUVAT[0].lyhyt);
    assert.equal(kortti.querySelector('img').getAttribute('src'),
      julisteUrl(PULUN_KUVAT[0].ampari));

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('tarran kanssa merkki on yksi kuva ilman HTML-tekstiä', () => {
  const osoite = 'https://media.matkakirja.app/pulucam/tarra-koe.png';
  const merkki = puluCamMerkki({ osoite });
  assert.ok(merkki, 'tarra-osoitteella merkin pitää syntyä');
  assert.ok(merkki.luokat.includes('pulucam-merkki'));

  // Yksi ainoa lapsi: kuva. Teksti on tarrassa, ei HTML:ssä.
  assert.equal(merkki.childNodes.length, 1);
  const tarra = merkki.querySelector('.pulucam-tarra');
  assert.ok(tarra, 'tarrakuva puuttuu');
  assert.equal(tarra.nodeName, 'IMG');
  assert.equal(tarra.getAttribute('src'), osoite);
  assert.equal(merkki.textContent, '', 'merkissä ei saa olla HTML-tekstiä');
  assert.equal(merkki.getAttribute('aria-hidden'), 'true');

  // Suurennoksen lisäluokka kulkee mukana.
  assert.ok(puluCamMerkki({ osoite, luokka: 'pulucam-suuri' }).luokat.includes('pulucam-suuri'));

  // Koko on kuvan leveydestä: 22 %, katto 160 px — ja SAMAT LUVUT
  // css:ssä, koska mitta lasketaan siellä (--pulucam-mitta).
  assert.equal(PULUCAM_TARRA_OSUUS, 0.22);
  assert.equal(PULUCAM_TARRA_KATTO_PX, 160);
});

test('tarran mitta on css:ssä sama sopimus kuin js:ssä', async () => {
  const { readFileSync } = await import('node:fs');
  const css = readFileSync(new URL('../css/fokusvirta.css', import.meta.url), 'utf8');
  const sailio = css.match(/\.pulucam-merkki \{[^}]*\}/);
  assert.ok(sailio, '.pulucam-merkki puuttuu css:stä');
  assert.match(sailio[0],
    new RegExp(`\\* ${PULUCAM_TARRA_OSUUS}\\)`.replace('.', '\\.')),
    'tarran osuus kuvan leveydestä ei vastaa js:n vakiota');
  assert.match(sailio[0], new RegExp(`${PULUCAM_TARRA_KATTO_PX}px`),
    'tarran kattoleveys ei vastaa js:n vakiota');
  // Poistetut elementit eivät saa jäädä css:ään elämään omaa elämäänsä.
  assert.doesNotMatch(css, /\.pulucam-teksti/, 'HTML-tekstin tyyli jäi css:ään');
  assert.doesNotMatch(css, /\.pulucam-selfie/, 'varakuvakkeen tyyli jäi css:ään');
});

/* ---------------------------------------------------------------- */
/* 4. Yhteinen karuselli: isoisä ensin                               */
/* ---------------------------------------------------------------- */

/** Pitkä teksti ilman perään ladottua Havainnekuva-linkkiä. */
function pitkaTeksti(kerros) {
  const selite = kerros.querySelector('.fokuszoom-selite');
  return selite.childNodes
    .filter((n) => n.nodeType === 3)
    .map((n) => n.nodeValue)
    .join('')
    .trim();
}

/** Karusellin pitkän tekstin perässä oleva Havainnekuva-linkki. */
function havainnekuvanLinkki(kerros) {
  return kerros.querySelector('.fokuszoom-selite')?.querySelector('.havainnekuva-linkki') ?? null;
}

test('päällimmäisen kuvan napautus avaa karusellin isoisän kuvasta', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: VIISI_KUVAA }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);

    pakanKortit()[0].dispatch('click');
    const kerros = asiakirja.querySelectorAll('.fokuszoom')[0];
    assert.ok(kerros, 'karuselli ei auennut');

    // 1 isoisän kuva + 5 pulun kuvaa, ja ISOISÄ ENSIN.
    assert.equal(kerros.querySelector('.fokuszoom-laskuri').textContent, '1 / 6');
    assert.equal(pitkaTeksti(kerros), POHJAKUVA.selite);
    // Lähderivi kulkee jokaisella kuvalla (CC BY) ja säilyy omanaan.
    assert.equal(kerros.querySelector('.fokuszoom-lahde').textContent, POHJAKUVA.lahde);
    // Nuolinapit kumpaankin suuntaan.
    assert.equal(kerros.querySelectorAll('.fokuszoom-nuoli').length, 2);

    // Ilman omistajan tarravalintaa merkkiä ei ole lainkaan.
    assert.equal(PULU_CAM_TARRA_OSOITE, null);
    assert.equal(kerros.querySelectorAll('.pulucam-merkki').length, 0);

    // Seuraavat kuvat ovat PULUN kuvia toimituksen järjestyksessä, ja
    // PITKÄ KUVATEKSTI VAIHTUU KUVAN MUKANA.
    for (let i = 0; i < VIISI_KUVAA.length; i += 1) {
      nappain('ArrowRight');
      assert.equal(kerros.querySelector('.fokuszoom-laskuri').textContent, `${i + 2} / 6`);
      assert.equal(pitkaTeksti(kerros), VIISI_KUVAA[i].selite, `pitkä teksti ${i}`);
      assert.equal(kerros.querySelector('.fokuszoom-lahde').textContent, VIISI_KUVAA[i].lahde);
    }
    // Pyörii ympäri takaisin isoisään.
    nappain('ArrowRight');
    assert.equal(pitkaTeksti(kerros), POHJAKUVA.selite);

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
    assert.equal(pitkaTeksti(kerros), POHJAKUVA.selite);

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
    assert.equal(pitkaTeksti(kerros), POHJAKUVA.selite);

    suljeSuurennos(ui);
    piilotaLuentakuva(ui, { heti: true });
  });
});

/* ---------------------------------------------------------------- */
/* 4 b. Kaksi kuvatekstiä ja Havainnekuva-linkki                     */
/* ---------------------------------------------------------------- */

test('lyhyt kuvateksti kertoo päällimmäisestä kuvasta, ei alle jääneestä', async () => {
  await pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, async () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);

    // Ennen pakkaa kartalla lukee isoisän kuvan LYHYT teksti (ei pitkä).
    const selite = () => ui.luentakuva.querySelector('.fokusvirta-kuvaselite').textContent;
    assert.equal(selite(), POHJAKUVA.lyhyt);
    assert.notEqual(selite(), POHJAKUVA.selite);

    // Pakan noustessa isoisän kuva jää alle: teksti seuraa päällimmäistä.
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);
    assert.equal(selite(), PULUN_KUVAT[0].lyhyt);
    await odota(pulucamViive(2) + 120);
    assert.equal(selite(), PULUN_KUVAT[2].lyhyt, 'teksti ei seurannut päällimmäistä kuvaa');

    // KARTALLA EI KOSKAAN OLE HAVAINNEKUVA-LINKKIÄ, vaikka päällimmäisen
    // kuvan lähde on havainnekuva (PULUN_KUVAT[2]).
    assert.equal(ui.luentakuva.querySelectorAll('.havainnekuva-linkki').length, 0);
    assert.equal(ui.luentakuva.querySelectorAll('.havainnekuva-selite').length, 0);

    piilotaLuentakuva(ui, { heti: true });
  });
});

test('Havainnekuva-linkki on pitkän tekstin perässä vain havainnekuvilla', () => {
  pakinKanssa({ luentakuva: POHJAKUVA, kuvat: PULUN_KUVAT }, () => {
    const ui = tekoUi();
    naytaLuentakuva(ui, KOEKAUPUNKI);
    naytaPulunKuvapakka(ui, KOEKAUPUNKI);
    pakanKortit()[0].dispatch('click');
    const kerros = asiakirja.querySelectorAll('.fokuszoom')[0];

    /*
     * ISOISÄN KUVASSA LINKKI ON AINA (lähde "Matkakirjan havainnekuva"),
     * ja se on nimenomaan PITKÄN TEKSTIN PERÄSSÄ — ei lähderivillä, joka
     * säilyy omanaan.
     */
    const linkki = havainnekuvanLinkki(kerros);
    assert.ok(linkki, 'isoisän pitkästä kuvatekstistä puuttuu Havainnekuva-linkki');
    assert.equal(linkki.textContent, HAVAINNEKUVA_LINKKI_TEKSTI);
    assert.equal(linkki.nodeName, 'BUTTON');
    // Perässä: linkki on selitteen viimeinen elementti.
    const selite = kerros.querySelector('.fokuszoom-selite');
    assert.equal(selite.childNodes[selite.childNodes.length - 1], linkki);
    assert.equal(pitkaTeksti(kerros), POHJAKUVA.selite, 'linkki söi pitkän tekstin');
    // Lähderivi säilyy ennallaan omanaan.
    assert.equal(kerros.querySelector('.fokuszoom-lahde').textContent, POHJAKUVA.lahde);

    // PULUN KUVA ILMAN HAVAINNEKUVALÄHDETTÄ EI SAA LINKKIÄ.
    nappain('ArrowRight');
    assert.equal(pitkaTeksti(kerros), PULUN_KUVAT[0].selite);
    assert.equal(havainnekuvanLinkki(kerros), null,
      '"Pulun kamera" ei ole havainnekuva — linkkiä ei saa olla');

    // PULUN KUVA, JONKA LÄHDE SEN SANOO, SAA LINKIN.
    nappain('ArrowRight');
    nappain('ArrowRight');
    assert.equal(pitkaTeksti(kerros), PULUN_KUVAT[2].selite);
    assert.ok(havainnekuvanLinkki(kerros),
      'havainnekuvalähteinen pulun kuva jäi ilman linkkiä');

    // Takaisin: vanha linkki ei saa jäädä roikkumaan väärän kuvan perään.
    nappain('ArrowLeft');
    assert.equal(havainnekuvanLinkki(kerros), null, 'linkki jäi edellisestä kuvasta');

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
    // Isoisän kuvaa ei ole: paneelissa on vain pakan oma kuva.
    assert.equal(paneeli.querySelectorAll('img').length, 1,
      'pohjattomassa paneelissa saa olla vain pakan oma kuva');
    assert.equal(pakanKortit().length, 1);
    /*
     * KUVATEKSTILAATIKKO ON MUKANA MYÖS POHJATTOMASSA PANEELISSA, ja
     * siinä lukee PÄÄLLIMMÄISEN pulun kuvan lyhyt teksti — muuten
     * pohjattoman pakan kuvilla ei olisi kartalla kuvatekstiä lainkaan.
     */
    assert.equal(paneeli.querySelectorAll('.fokusvirta-luentateksti').length, 1);
    assert.equal(paneeli.querySelector('.fokusvirta-kuvaselite').textContent,
      PULUN_KUVAT[0].lyhyt);

    // Karuselli alkaa suoraan pulun kuvista.
    pakanKortit()[0].dispatch('click');
    const kerros = asiakirja.querySelectorAll('.fokuszoom')[0];
    assert.equal(kerros.querySelector('.fokuszoom-laskuri').textContent, '1 / 3');
    assert.equal(pitkaTeksti(kerros), PULUN_KUVAT[0].selite);

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
      // KAKSI KUVATEKSTIÄ (omistaja 9.9.2026 klo 18.50): lyhyt kartalle
      // päällimmäisen kuvan alle, pitkä koko ruudun näkymään.
      assert.ok(String(kuva.selite ?? '').trim(), `${id}: pulun kuvalta puuttuu pitkä kuvateksti`);
      assert.ok(String(kuva.lyhyt ?? '').trim(), `${id}: pulun kuvalta puuttuu lyhyt kuvateksti`);
      // CC BY vaatii tekijän maininnan; lähde on siksi pakollinen.
      assert.ok(String(kuva.lahde ?? '').trim(), `${id}: pulun kuvalta puuttuu lähde`);
    }
  }
});
