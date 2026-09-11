/*
 * KAIKKI KARTAN NOSTOT AUKEAVAT KUVA EDELLÄ (js/nostokuva.js).
 *
 * Omistaja 11.9.2026 illalla, sanatarkasti: *"Voisiko KAIKKI nostot
 * kartalla muuttaa niin että kun pelaaja painaa nostoa niin ensin
 * aukeaa vain pelkkä kuva lähes koko ruudun kokoisena, alla pelkkä
 * lyhyt kuvateksti jonka alla olisi lisää nappi mitä painamalla
 * varsinainen nosto avautuisi teksteineen … on todella tärkeää että
 * kuva pysyy täysin paikallaan."*
 *
 * v1783 vei kaksivaiheisen avauksen kahteen karttakorttiin (kartan
 * tietoruutu ja täkynoston lunastuskortti, vartija
 * tests/nostokuva.test.mjs). Tämä testi vartioi LOPPUJA kartalta
 * avautuvia kortteja:
 *
 *   js/skandaalit.js        lisälehti, 1 kuva tai selattava galleria
 *   js/historian-hetket.js  aina galleria (lähikuva + kaukokuva)
 *   js/syvennys.js          yksi kuva
 *   js/elaintaky.js         1 kuva tai kahden kuvan karuselli
 *
 * Vartioitavat asiat ovat samat kuin v1783:ssa:
 *
 *   1. VAIHE 1 ON VAIN KUVA. Kuvakehys (kuva + lyhyt kuvateksti) ja
 *      "Lisää" — ei otsikkoa, ei leipätekstiä, ei nuolia, ei visaa.
 *   2. VAIHEENVAIHTO EI KOSKE KUVAAN. Sama img-elementti, sama src,
 *      sama vanhempi.
 *   3. KUVA EI LIIKU. Kuvan laatikko mitataan ennen ja jälkeen.
 *   4. GALLERIAN NUOLET JA PISTEET ILMAANTUVAT VASTA VAIHEESSA 2,
 *      saman kuvan päälle.
 *   5. KUVATON KORTTI AUKEAA SUORAAN TEKSTINÄ.
 *   6. KARTAN PAINALLUS SULKEE EIKÄ AVAA UUTTA.
 *
 * Kortit avataan OIKEILLA moduuleilla pienen DOM- ja asettelumallin
 * päällä samaan tapaan kuin tests/nostokuva.test.mjs ja
 * tests/lukijanappi.test.mjs: Nodessa ei ole selainta eikä repoon oteta
 * jsdomia. Selaimessa sama on mitattu Chromiumilla jokaiselle
 * korttityypille kolmella näyttömitalla ja kahdella kuvasuhteella
 * (tools/mittaa-nostokuva.mjs): kuvan getBoundingClientRect oli ennen ja
 * jälkeen pikselilleen sama.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');

/* ================================================================= */
/* Pieni DOM- ja asettelumalli                                       */
/* ================================================================= */

/** Kortin ja sisällön oma reunus mallissa (px). */
const REUNA = 12;
/** Mallin rivikorkeus tavalliselle ladotulle riville (px). */
const RIVI = 30;

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
    this.kuuntelijat = new Map();
    this.scrollTop = 0;
    this.offsetWidth = 0;
    this.clientWidth = 0;
    this.hidden = false;
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

  get isConnected() {
    let solmu = this;
    while (solmu.parentNode) solmu = solmu.parentNode;
    return solmu === globalThis.document.body;
  }

  set textContent(arvo) {
    this.childNodes = [];
    if (arvo !== '' && arvo != null) this.appendChild(new Teksti(String(arvo)));
  }

  get textContent() {
    return this.childNodes.map((n) => (n.nodeType === 3 ? n.nodeValue : n.textContent)).join('');
  }

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

  // SVG-symbolit kirjoittavat xlink:hrefin nimiavaruuteen (mapart.js).
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

  /** Osuuko tähän tai johonkin esivanhempaan luokkavalitsin? */
  closest(valitsin) {
    const osat = valitsin.split(',').map((o) => o.trim()).filter(Boolean);
    let solmu = this;
    while (solmu) {
      for (const osa of osat) {
        if (osa.startsWith('.') && solmu.luokat?.includes(osa.slice(1))) return solmu;
        if (!osa.startsWith('.') && !osa.startsWith('#')
          && solmu.nodeName === osa.toUpperCase()) return solmu;
      }
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

  get scrollHeight() {
    if (!this.luokat.includes('fokusnosto-sisalto')) return 0;
    return this.children.reduce((summa, lapsi) => summa + korkeus(lapsi), 0);
  }

  get clientHeight() {
    const katto = Number.parseFloat(this.parentNode?.style?.maxHeight) || Infinity;
    return Math.min(this.scrollHeight, Math.max(0, katto - 2 * REUNA));
  }

  /**
   * ASETTELU: kortti on ruudun koordinaateissa `style.top`-kohdassa, ja
   * sisällön rivit pinotaan sen sisään vieritys huomioiden. Kuvan paikka
   * on kortin yläreuna + reunus + edeltävien rivien korkeudet − vieritys
   * — juuri tämän on pysyttävä muuttumattomana vaiheenvaihdossa.
   */
  getBoundingClientRect() {
    const kortti = this.luokat.includes('nostokuva-kortti')
      ? this : this.closest('.nostokuva-kortti');
    const sisalto = kortti?.querySelector('.fokusnosto-sisalto');
    if (!kortti || !sisalto) return { x: 0, left: 0, y: 0, top: 0, width: 0, height: 0 };
    const ylin = Number.parseFloat(kortti.style.top) || 0;
    const vasen = Number.parseFloat(kortti.style.left) || 0;
    if (this === kortti) {
      const katto = Number.parseFloat(kortti.style.maxHeight) || Infinity;
      return {
        x: vasen,
        left: vasen,
        y: ylin,
        top: ylin,
        width: Number.parseFloat(kortti.style.width) || 0,
        height: Math.min(sisalto.scrollHeight + 2 * REUNA, katto),
      };
    }
    let kehys = this;
    while (kehys && !kehys.luokat?.includes('nostokuva-kehys')) kehys = kehys.parentNode;
    let ennenKehysta = 0;
    for (const rivi of sisalto.children) {
      if (rivi === kehys) break;
      ennenKehysta += korkeus(rivi);
    }
    const y = ylin + REUNA + ennenKehysta - sisalto.scrollTop;
    return {
      x: vasen + REUNA,
      left: vasen + REUNA,
      y,
      top: y,
      width: Number.parseFloat(this.style?.width) || 0,
      height: Number.parseFloat(this.style?.height) || 0,
    };
  }
}

/** Yksinkertainen pystyasettelu: rivien korkeudet lasketaan yhteen. */
function korkeus(el) {
  if (el.luokat.includes('nostokuva-kehys')) {
    // Kuva + kuvateksti (+ eläinkortin pisteet): kuvan korkeus tulee
    // inline-tyylistä, muu on kiinteä mallissa.
    const img = el.querySelector('.nostokuva-img');
    const pisteet = el.querySelector('.elaintaky-karuselli-pisteet') ? 20 : 0;
    return (Number.parseFloat(img?.style?.height) || 0) + 40 + pisteet;
  }
  return RIVI;
}

function asennaMalli({ ruutuLeveys, ruutuKorkeus }) {
  const body = new Elementti('body');
  const head = new Elementti('head');
  const doc = {
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
  globalThis.document = doc;
  globalThis.innerWidth = ruutuLeveys;
  globalThis.innerHeight = ruutuKorkeus;
  globalThis.getComputedStyle = () => ({
    paddingLeft: `${REUNA}px`,
    paddingRight: `${REUNA}px`,
    borderLeftWidth: '0px',
    borderRightWidth: '0px',
    marginLeft: '0px',
    marginRight: '0px',
  });
  globalThis.requestAnimationFrame = () => 0;
  // Äänikerros katsoo `window`-oliolta AudioContextia (js/sound.js
  // ensureContext) ja luovuttaa hiljaa, kun sitä ei ole.
  globalThis.window = { addEventListener: () => {}, removeEventListener: () => {} };
  return doc;
}

/* ================================================================= */
/* Korttityypit                                                      */
/* ================================================================= */

const KUVA_LEVEYS = 1536;
const KUVA_KORKEUS = 1024;

/** Mallin kuva: `osoite` ei kulje Commons-portaan läpi. */
const kuva = (n) => ({
  osoite: `testikuvat/kuva${n}.png`,
  selite: `Mittarin havainnekuva ${n}`,
  lahde: 'Matkakirjan havainnekuva',
});

const TEKSTI = 'Ensimmäinen kappale.\n\nToinen kappale.';
const VISA = { kysymys: 'Kysymys?', vaihtoehdot: ['a', 'b'], oikea: 0 };

function tynkaUi() {
  return {
    game: {
      pack: { id: 'testi', map: { countryShapes: { TST: { nimi: 'Testimaa' } } } },
      minitehtavatVastatut: new Set(),
      actionMinitehtava: () => ({ ok: true }),
      actionElaintaky: () => ({ ok: true, uusi: false }),
    },
    buildToast: () => null,
    removeToast: () => {},
    onChange: () => {},
    renderTurnPill: () => {},
  };
}

/**
 * Korttityypit: avaaja, kerroksen ja kortin luokka sekä odotettu
 * selausohjain vaiheessa 2.
 */
const TYYPIT = [
  {
    nimi: 'skandaali (yksi kuva)',
    kerros: '.skandaali-kerros',
    kortti: '.skandaali-kortti',
    ohjain: null,
    async avaa(ui, kuvat) {
      const { avaaSkandaali } = await import('../js/skandaalit.js');
      avaaSkandaali(ui, 'TST', {
        id: 'testi', otsikko: 'Testiskandaali', paikka: 'Testilä', vuosi: 1873,
        kortti: 'Ingressi.', teksti: TEKSTI, visa: VISA,
        ...(kuvat ? { kuvat: [kuva(1)] } : {}),
      });
    },
  },
  {
    nimi: 'skandaali (galleria)',
    kerros: '.skandaali-kerros',
    kortti: '.skandaali-kortti',
    ohjain: '.skandaali-kuvanuoli',
    async avaa(ui, kuvat) {
      const { avaaSkandaali } = await import('../js/skandaalit.js');
      avaaSkandaali(ui, 'TST', {
        id: 'testi', otsikko: 'Testiskandaali', paikka: 'Testilä', vuosi: 1873,
        kortti: 'Ingressi.', teksti: TEKSTI, visa: VISA,
        ...(kuvat ? { kuvat: [kuva(1), kuva(2)] } : {}),
      });
    },
  },
  {
    nimi: 'historian hetki',
    kerros: '.hetki-kerros',
    kortti: '.hetki-kortti',
    ohjain: '.hetki-kuvanuoli',
    async avaa(ui, kuvat) {
      const { avaaHetki } = await import('../js/historian-hetket.js');
      avaaHetki(ui, 'TST', {
        id: 'testi', otsikko: 'Testihetki', paikka: 'Testilä', paivays: '1873',
        teksti: TEKSTI, visa: VISA,
        kuvat: kuvat
          ? [{ tiedosto: 'a.jpg', kuvateksti: 'Lähikuva' },
            { tiedosto: 'b.jpg', kuvateksti: 'Kaukokuva' }]
          : [],
      });
    },
  },
  {
    nimi: 'syvennystarina',
    kerros: '.syvennys-kerros',
    kortti: '.syvennys-kortti',
    ohjain: null,
    async avaa(ui, kuvat) {
      const { avaaSyvennys } = await import('../js/syvennys.js');
      avaaSyvennys(ui, 'testila', {
        id: 'testi', otsikko: 'Testitarina', teksti: TEKSTI, visa: VISA,
        ...(kuvat ? { kuva: kuva(1) } : {}),
      }, { symboli: 'huuto' });
    },
  },
  {
    nimi: 'eläintäky (yksi kuva)',
    kerros: '.elaintaky-kerros',
    kortti: '.elaintaky-kortti',
    ohjain: null,
    async avaa(ui, kuvat) {
      const { avaaElaintaky } = await import('../js/elaintaky.js');
      const { ELAINTAKYT } = await import('../js/packs/elaintakyt.js');
      ELAINTAKYT.__TESTI1 = {
        elain: 'testieläin', otsikko: 'Testieläin', teksti: TEKSTI,
        kuvat: kuvat ? [{ url: 'testikuvat/kuva1.png', kuvateksti: 'Lähikuva' }] : [],
      };
      avaaElaintaky(ui, '__TESTI1');
    },
  },
  {
    nimi: 'eläintäky (karuselli)',
    kerros: '.elaintaky-kerros',
    kortti: '.elaintaky-kortti',
    ohjain: '.elaintaky-karuselli-piste',
    async avaa(ui, kuvat) {
      const { avaaElaintaky } = await import('../js/elaintaky.js');
      const { ELAINTAKYT } = await import('../js/packs/elaintakyt.js');
      ELAINTAKYT.__TESTI2 = {
        elain: 'testieläin', otsikko: 'Testieläin', teksti: TEKSTI,
        kuvat: kuvat
          ? [{ url: 'testikuvat/kuva1.png', kuvateksti: 'Lähikuva' },
            { url: 'testikuvat/kuva2.png', kuvateksti: 'Kaukokuva' }]
          : [],
      };
      avaaElaintaky(ui, '__TESTI2');
    },
  },
];

/**
 * Avaa yhden kortin mallissa ja palauttaa kortin osat.
 *
 * Kuvan luonnollinen koko annetaan heti: mallissa ei ole kuvanlatausta,
 * ja js/nostokuva.js lukee mitat `naturalWidth`/`naturalHeight`-kentistä.
 */
async function avaaMallissa(tyyppi, { ruutuLeveys, ruutuKorkeus, kuvat = true } = {}) {
  asennaMalli({ ruutuLeveys, ruutuKorkeus });
  const alkuperainenLuo = globalThis.document.createElement;
  globalThis.document.createElement = (nimi) => {
    const solmu = alkuperainenLuo(nimi);
    if (solmu.nodeName === 'IMG') {
      solmu.naturalWidth = KUVA_LEVEYS;
      solmu.naturalHeight = KUVA_KORKEUS;
    }
    return solmu;
  };
  const ui = tynkaUi();
  await tyyppi.avaa(ui, kuvat);
  const kerros = globalThis.document.body.querySelector(tyyppi.kerros);
  const kortti = kerros?.querySelector(tyyppi.kortti) ?? null;
  const sisalto = kortti?.querySelector('.fokusnosto-sisalto') ?? null;
  return { ui, kerros, kortti, sisalto };
}

/* ================================================================= */
/* 1–4: vaiheet, kuvan identiteetti, paikka ja selausohjaimet         */
/* ================================================================= */

const RUUDUT = [
  ['iPad pysty', 834, 1194],
  ['iPad vaaka', 1194, 834],
  ['puhelin', 390, 844],
];

for (const tyyppi of TYYPIT) {
  test(`${tyyppi.nimi}: vaiheessa 1 on vain kuvakehys ja Lisää`, async () => {
    const { sisalto } = await avaaMallissa(tyyppi, { ruutuLeveys: 834, ruutuKorkeus: 1194 });
    const luokat = sisalto.children.map((l) => l.className);
    assert.deepEqual(luokat, ['nostokuva-kehys', 'nostokuva-lisaa'],
      'vaiheessa 1 saa olla vain kuvakehys ja Lisää — ei otsikkoa, tekstiä eikä visaa');
    const kehys = sisalto.children[0];
    assert.ok(kehys.querySelector('.nostokuva-img'), 'kuva puuttuu');
    assert.ok(kehys.querySelector('.nostokuva-teksti'), 'lyhyt kuvateksti puuttuu');
    if (tyyppi.ohjain) {
      assert.equal(kehys.querySelector(tyyppi.ohjain), null,
        'selausohjaimet eivät kuulu vaiheeseen 1');
    }
  });

  test(`${tyyppi.nimi}: Lisää latoo noston saman kuvan ympärille`, async () => {
    const { sisalto } = await avaaMallissa(tyyppi, { ruutuLeveys: 834, ruutuKorkeus: 1194 });
    const kehys = sisalto.children[0];
    const img = kehys.querySelector('.nostokuva-img');
    const src = img.src;
    sisalto.querySelector('.nostokuva-lisaa').napauta();
    // SAMA elementti, SAMA src, SAMA vanhempi — ei uudelleenlatausta.
    assert.equal(sisalto.querySelector('.nostokuva-img'), img, 'kuva vaihtui toiseen elementtiin');
    assert.equal(img.src, src, 'kuvan src vaihtui — selain lataisi kuvan uudestaan');
    assert.equal(kehys.parentNode, sisalto, 'kuvakehys siirtyi toiseen vanhempaan');
    assert.ok(sisalto.querySelector('.fokusnosto-kortti-otsikko'), 'otsikko puuttuu vaiheesta 2');
    assert.equal(sisalto.querySelector('.nostokuva-lisaa'), null, 'Lisää jäi kortille');
    if (tyyppi.ohjain) {
      assert.ok(kehys.querySelector(tyyppi.ohjain),
        'gallerian selausohjaimet puuttuvat vaiheesta 2');
    }
  });

  for (const [nimi, ruutuLeveys, ruutuKorkeus] of RUUDUT) {
    test(`${tyyppi.nimi}: kuva ei liiku vaiheenvaihdossa — ${nimi}`, async () => {
      const { sisalto } = await avaaMallissa(tyyppi, { ruutuLeveys, ruutuKorkeus });
      const img = sisalto.querySelector('.nostokuva-img');
      const ennen = img.getBoundingClientRect();
      assert.ok(ennen.width > ruutuLeveys * 0.7 || ennen.height > ruutuKorkeus * 0.6,
        `kuva jäi pieneksi: ${ennen.width}x${ennen.height}`);
      sisalto.querySelector('.nostokuva-lisaa').napauta();
      const jalkeen = img.getBoundingClientRect();
      for (const kentta of ['x', 'y', 'width', 'height']) {
        assert.equal(jalkeen[kentta], ennen[kentta],
          `kuva liikkui: ${kentta} ${ennen[kentta]} → ${jalkeen[kentta]}`);
      }
    });
  }

  test(`${tyyppi.nimi}: kuvaton kortti aukeaa suoraan tekstinä`, async () => {
    const { sisalto } = await avaaMallissa(tyyppi, {
      ruutuLeveys: 834, ruutuKorkeus: 1194, kuvat: false,
    });
    assert.equal(sisalto.querySelector('.nostokuva-lisaa'), null,
      'kuvaton kortti ei saa jäädä kuvaesittelyn taakse');
    assert.equal(sisalto.querySelector('.nostokuva-kehys'), null, 'kuvatonta kehystä ei ladota');
    assert.ok(sisalto.querySelector('.fokusnosto-kortti-otsikko'), 'otsikko puuttuu');
    assert.ok(sisalto.querySelector('.fokusnosto-teksti'), 'leipäteksti puuttuu');
  });
}

/* ================================================================= */
/* Lähdekoodin vartijat                                              */
/* ================================================================= */

test('kaikki kartan korttimoduulit avaavat kuvan edellä', () => {
  for (const polku of ['js/skandaalit.js', 'js/historian-hetket.js', 'js/syvennys.js',
    'js/elaintaky.js', 'js/fokusnosto.js', 'js/fokuskohteet.js']) {
    const src = lue(polku);
    assert.ok(src.includes('nostokuvaAloita'), `${polku} ei käytä kuva edellä -avausta`);
    assert.ok(/if \(!kaksivaihe\) lato[A-Za-zÄÖäö]+\(/.test(src),
      `${polku}: kuvaton nosto pitää latoa suoraan tekstikorttina`);
    assert.ok(src.includes('latoNosto'), `${polku} ei anna ladontaa kuvaesittelylle`);
  }
});

test('kortin sulku purkaa kuvaesittelyn ikkunakuuntelijat', () => {
  for (const polku of ['js/skandaalit.js', 'js/historian-hetket.js', 'js/syvennys.js',
    'js/elaintaky.js', 'js/fokusnosto.js']) {
    assert.ok(lue(polku).includes('nostokuvaPurku'),
      `${polku}: suljettu kortti jäisi kuuntelemaan ikkunaa`);
  }
});

test('galleriat eivät rakenna kuvaa uudelleen vaiheenvaihdossa', () => {
  // Valmis kehys tulee sellaisenaan: gallerian oma `nayta` ei saa
  // kirjoittaa src:ää ensimmäisellä piirrolla (nayta(false)).
  for (const polku of ['js/skandaalit.js', 'js/historian-hetket.js']) {
    const src = lue(polku);
    assert.ok(/nayta\(!valmis(Kehys|Kuva)\)/.test(src),
      `${polku}: valmiin kehyksen src:ää ei saa kirjoittaa uudestaan`);
  }
  assert.ok(lue('js/elaintaky.js').includes('nayta(false)'),
    'js/elaintaky.js: valmiin kehyksen src:ää ei saa kirjoittaa uudestaan');
});

test('kartan painallus sulkee kortin eikä avaa uutta', () => {
  // Nielu syö saman napautuksen clickin ennen kartan omia kuuntelijoita
  // (js/ui-apurit.js nielaiseSulkevaNapautus).
  for (const polku of ['js/skandaalit.js', 'js/historian-hetket.js', 'js/syvennys.js',
    'js/elaintaky.js']) {
    assert.ok(/nielaiseSulkevaNapautus\(tapahtuma\)/.test(lue(polku)),
      `${polku}: sulkeva napautus vuotaisi kartalle ja avaisi uuden noston`);
  }
  // Pallo: korttivahti lukee kortin auki-tilan pointerdownin
  // kaappausvaiheessa ja nielaisee sitä seuraavan napautuksen.
  const lauta = lue('js/pallolauta/lauta.js');
  const alku = lauta.indexOf('const KORTTIVALITSIN');
  const valitsin = lauta.slice(alku, alku + 400);
  for (const luokka of ['.skandaali-kerros', '.hetki-kerros', '.syvennys-kerros',
    '.elaintaky-kerros']) {
    assert.ok(valitsin.includes(luokka), `${luokka} puuttuu pallolaudan korttivahdista`);
  }
});
