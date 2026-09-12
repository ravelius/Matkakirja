/*
 * NOSTO AUKEAA KUVA EDELLÄ, KUVA EI LIIKU (js/nostokuva.js).
 *
 * Omistaja 11.9.2026 illalla, sanatarkasti: *"kun pelaaja painaa
 * nostoa niin ensin aukeaa vain pelkkä kuva lähes koko ruudun
 * kokoisena, alla pelkkä lyhyt kuvateksti jonka alla olisi lisää nappi
 * mitä painamalla varsinainen nosto avautuisi teksteineen … on todella
 * tärkeää että kuva pysyy täysin paikallaan ja että tekstit ja muut
 * elementit ilmaantuvat sen ympärille ilman että kuva välähtää tai
 * liikkuu yhtään."*
 *
 * Tämä testi vartioi viittä asiaa, joita ei näe diffistä:
 *
 *   1. VAIHE 1 ON VAIN KUVA. Kortissa on kuvakehys (kuva +
 *      kuvateksti) ja "Lisää" — ei otsikkoa, ei leipätekstiä, ei muita
 *      hallintapainikkeita.
 *   2. VAIHEENVAIHTO EI KOSKE KUVAAN. Sama img-elementti, sama src,
 *      sama vanhempi — uusi kuva tai vaihtunut src tarkoittaisi
 *      uudelleenlatausta ja välähdystä.
 *   3. KUVA EI LIIKU. Testi latoo kortin pienellä omalla
 *      asettelumallilla ja mittaa kuvan laatikon ennen ja jälkeen.
 *      Mallissa vaiheen 2 sisältö työntää kuvaa alaspäin juuri kuten
 *      selaimessa, ja korjauksen on kumottava se pikselilleen.
 *   4. KARTAN PAINALLUS SULKEE EIKÄ AVAA UUTTA. Nielu ja pallolaudan
 *      korttivahti kattavat molemmat karttakortit.
 *   5. KUVATON NOSTO AUKEAA SUORAAN TEKSTINÄ.
 *
 * DOM-osuus ajetaan pienellä omalla puumallilla samaan tapaan kuin
 * tests/lukijanappi.test.mjs: Nodessa ei ole selainta, eikä repoon
 * oteta jsdomia. Malli toteuttaa ne kentät, joita js/nostokuva.js ja
 * sen apurit DOMilta kysyvät — ja sen lisäksi juuri sen verran
 * asettelua, että kuvan paikan voi mitata. Selaimessa sama on mitattu
 * Chromiumilla (iPad 834x1194 ja 1194x834 sekä puhelin 390x844):
 * kuvan getBoundingClientRect oli ennen ja jälkeen pikselilleen sama.
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
    this.kuuntelijat = new Map();
    this.scrollTop = 0;
    this.offsetWidth = 0;
    this.clientWidth = 0;
    /** Mallin asettelukorkeus; testi asettaa sen ladottaville riveille. */
    this.testikorkeus = 0;
    const itse = this;
    this.classList = {
      add: (...n) => { for (const x of n) if (!itse.luokat.includes(x)) itse.luokat.push(x); },
      remove: (...n) => { itse.luokat = itse.luokat.filter((x) => !n.includes(x)); },
      contains: (n) => itse.luokat.includes(n),
    };
  }

  get className() { return this.luokat.join(' '); }

  set className(arvo) { this.luokat = String(arvo).split(/\s+/).filter(Boolean); }

  get children() { return this.childNodes.filter((n) => n.nodeType === 1); }

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

  getAttribute(nimi) { return this.attrs[nimi] ?? null; }

  addEventListener(laji, fn) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, []);
    this.kuuntelijat.get(laji).push(fn);
  }

  removeEventListener() {}

  /** Testin oma laukaisin: napautus tähän elementtiin. */
  napauta() {
    for (const fn of this.kuuntelijat.get('click') ?? []) fn({ stopPropagation() {} });
  }

  querySelector(valitsin) {
    for (const lapsi of this.children) {
      if (valitsin.startsWith('.') && lapsi.luokat.includes(valitsin.slice(1))) return lapsi;
      const syva = lapsi.querySelector(valitsin);
      if (syva) return syva;
    }
    return null;
  }

  getBoundingClientRect() { return globalThis.__laatikko(this); }
}

/** Yksinkertainen pystyasettelu: rivien korkeudet lasketaan yhteen. */
function korkeus(el) {
  if (el.luokat.includes('nostokuva-kehys')) {
    // Kuva + kuvateksti: kuvan korkeus tulee inline-tyylistä.
    const img = el.querySelector('.nostokuva-img');
    return (Number.parseFloat(img?.style?.height) || 0) + 40;
  }
  return el.testikorkeus || 0;
}

function asennaMalli({ ruutuLeveys, ruutuKorkeus }) {
  const doc = {
    createElement: (nimi) => new Elementti(nimi),
    createTextNode: (teksti) => new Teksti(teksti),
    getElementById: () => null,
    querySelector: () => null,
    addEventListener: () => {},
    removeEventListener: () => {},
    body: new Elementti('body'),
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
  return doc;
}

/**
 * Asettelu: kortti on ruudun koordinaateissa `style.top`-kohdassa, ja
 * sisällön rivit pinotaan sen sisään vieritys huomioiden.
 */
function asennaAsettelu(kortti, sisalto) {
  globalThis.__laatikko = (el) => {
    const ylin = Number.parseFloat(kortti.style.top) || 0;
    const vasen = Number.parseFloat(kortti.style.left) || 0;
    const katto = Number.parseFloat(kortti.style.maxHeight) || Infinity;
    const sisus = sisalto.children.reduce((s, l) => s + korkeus(l), 0);
    if (el === kortti) {
      return {
        x: vasen,
        left: vasen,
        y: ylin,
        top: ylin,
        width: Number.parseFloat(kortti.style.width) || 0,
        height: Math.min(sisus + 2 * REUNA, katto),
      };
    }
    // Kuvan paikka: kortin yläreuna + reunus + edeltävien rivien
    // korkeudet − vieritys. Juuri tämän on pysyttävä muuttumattomana.
    const kehys = el.parentNode?.parentNode ?? null;
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
      width: Number.parseFloat(el.style?.width) || 0,
      height: Number.parseFloat(el.style?.height) || 0,
    };
  };
  Object.defineProperty(sisalto, 'scrollHeight', {
    get: () => sisalto.children.reduce((s, l) => s + korkeus(l), 0),
    configurable: true,
  });
  Object.defineProperty(sisalto, 'clientHeight', {
    get: () => {
      const katto = Number.parseFloat(kortti.style.maxHeight) || Infinity;
      return Math.min(sisalto.scrollHeight, Math.max(0, katto - 2 * REUNA));
    },
    configurable: true,
  });
}

/**
 * Yksi avaus mallissa. Palauttaa mittauksen ennen ja jälkeen
 * "Lisää"-napin painalluksen.
 */
async function avaaMallissa({ ruutuLeveys, ruutuKorkeus, kuvaLeveys, kuvaKorkeus }) {
  asennaMalli({ ruutuLeveys, ruutuKorkeus });
  const { nostokuvaAloita } = await import('../js/nostokuva.js');
  const kortti = new Elementti('div');
  const sisalto = new Elementti('div');
  kortti.appendChild(sisalto);
  asennaAsettelu(kortti, sisalto);

  const kuva = { osoite: 'testi.png', selite: 'Isoisän havainnekuva', lahde: 'Commons (PD)' };
  let img = null;
  const ladotut = [];
  const tila = nostokuvaAloita({
    kortti,
    sisalto,
    kuva,
    aseta: (el) => {
      img = el;
      el.src = 'testi.png';
      // Mallissa luonnollinen koko on tiedossa heti.
      el.naturalWidth = kuvaLeveys;
      el.naturalHeight = kuvaKorkeus;
    },
    latoNosto: (kotelo, kuvakehys) => {
      const ylarivi = new Elementti('p');
      ylarivi.className = 'testi-ylarivi';
      ylarivi.testikorkeus = 18;
      const otsikko = new Elementti('h3');
      otsikko.className = 'testi-otsikko';
      otsikko.testikorkeus = 46;
      kotelo.append(ylarivi, otsikko);
      if (kuvakehys) kotelo.appendChild(kuvakehys);
      const teksti = new Elementti('div');
      teksti.className = 'testi-teksti';
      teksti.testikorkeus = 900;
      kotelo.appendChild(teksti);
      ladotut.push(kuvakehys);
    },
    avaaSuurennos: () => {},
  });
  return { kortti, sisalto, img, tila, ladotut };
}

/* ================================================================= */
/* 1–3: vaiheet, kuvan identiteetti ja paikka                        */
/* ================================================================= */

const RUUDUT = [
  ['iPad pysty', 834, 1194],
  ['iPad vaaka', 1194, 834],
  ['puhelin', 390, 844],
];
const KUVAT = [
  ['vaakakuva 3:2', 1536, 1024],
  ['pystykuva 4:5', 1103, 1426],
];

test('vaiheessa 1 kortissa on vain kuvakehys ja Lisää-nappi', async () => {
  const { sisalto, tila } = await avaaMallissa({
    ruutuLeveys: 834, ruutuKorkeus: 1194, kuvaLeveys: 1536, kuvaKorkeus: 1024,
  });
  assert.equal(tila.vaihe(), 'kuva');
  const luokat = sisalto.children.map((l) => l.className);
  assert.deepEqual(luokat, ['nostokuva-kehys', 'nostokuva-lisaa'],
    'vaiheessa 1 saa olla vain kuvakehys ja Lisää — ei otsikkoa eikä leipätekstiä');
  const kehys = sisalto.children[0];
  assert.ok(kehys.querySelector('.nostokuva-img'), 'kuva puuttuu');
  assert.ok(kehys.querySelector('.nostokuva-selite'), 'lyhyt kuvateksti puuttuu');
  assert.equal(sisalto.children[1].textContent, 'Lisää');
});

test('Lisää-nappi avaa varsinaisen noston saman kuvan ympärille', async () => {
  const { sisalto, img, tila, ladotut } = await avaaMallissa({
    ruutuLeveys: 834, ruutuKorkeus: 1194, kuvaLeveys: 1536, kuvaKorkeus: 1024,
  });
  const kehys = sisalto.children[0];
  const src = img.src;
  sisalto.children[1].napauta();
  assert.equal(tila.vaihe(), 'nosto');
  // SAMA elementti, SAMA src, SAMA vanhempi — ei uudelleenlatausta.
  assert.equal(ladotut[0], kehys, 'ladonta sai jonkin muun kuin vaiheen 1 kuvakehyksen');
  assert.equal(sisalto.querySelector('.nostokuva-img'), img, 'kuva vaihtui toiseen elementtiin');
  assert.equal(img.src, src, 'kuvan src vaihtui — selain lataisi kuvan uudestaan');
  assert.equal(kehys.parentNode, sisalto, 'kuvakehys siirtyi toiseen vanhempaan');
  assert.ok(sisalto.querySelector('.testi-otsikko'), 'otsikko puuttuu vaiheesta 2');
  assert.equal(sisalto.querySelector('.nostokuva-lisaa'), null, 'Lisää jäi kortille');
});

for (const [nimi, ruutuLeveys, ruutuKorkeus] of RUUDUT) {
  for (const [kuvanimi, kuvaLeveys, kuvaKorkeus] of KUVAT) {
    test(`kuva ei liiku vaiheenvaihdossa — ${nimi} ${ruutuLeveys}x${ruutuKorkeus}, ${kuvanimi}`,
      async () => {
        const { sisalto, img } = await avaaMallissa({
          ruutuLeveys, ruutuKorkeus, kuvaLeveys, kuvaKorkeus,
        });
        const ennen = img.getBoundingClientRect();
        // "Lähes koko ruudun kokoinen": kuva täyttää sen suunnan, joka
        // sille kuuluu (js/ui-apurit.js suurennoksenMitat) — vaakakuva
        // leveyden, pystykuva korkeuden.
        assert.ok(ennen.width > ruutuLeveys * 0.7 || ennen.height > ruutuKorkeus * 0.6,
          `kuva jäi pieneksi: ${ennen.width}x${ennen.height} ruudulla ${ruutuLeveys}x${ruutuKorkeus}`);
        sisalto.querySelector('.nostokuva-lisaa').napauta();
        const jalkeen = img.getBoundingClientRect();
        for (const kentta of ['x', 'y', 'width', 'height']) {
          assert.equal(jalkeen[kentta], ennen[kentta],
            `kuva liikkui: ${kentta} ${ennen[kentta]} → ${jalkeen[kentta]}`);
        }
      });
  }
}

test('kortti mahtuu ruudulle molemmissa vaiheissa', async () => {
  const { kortti, sisalto } = await avaaMallissa({
    ruutuLeveys: 834, ruutuKorkeus: 1194, kuvaLeveys: 1536, kuvaKorkeus: 1024,
  });
  const v1 = kortti.getBoundingClientRect();
  assert.ok(v1.top >= 0 && v1.top + v1.height <= 1194, 'vaihe 1 valui ruudun ulkopuolelle');
  sisalto.querySelector('.nostokuva-lisaa').napauta();
  const v2 = kortti.getBoundingClientRect();
  assert.ok(v2.top >= 0 && v2.top + v2.height <= 1194, 'vaihe 2 valui ruudun ulkopuolelle');
  assert.equal(v2.width, v1.width, 'kortin leveys muuttui vaiheiden välillä');
});

/* ================================================================= */
/* Puhdas korjauslaskenta                                            */
/* ================================================================= */

test('korjaus siirtää korttia, kun tilaa on ylhäällä', async () => {
  const { nostokuvanKorjaus } = await import('../js/nostokuva.js');
  const t = nostokuvanKorjaus({
    ylin: 300, delta: 64, korkeus: 700, ruutuKorkeus: 1194, vierityskatto: 900,
  });
  assert.equal(t.ylin, 236);
  assert.equal(t.vieritys, 0);
  assert.equal(t.siirtyma, 0, 'kuvan ei saa jäädä liikkumaan');
});

test('korjaus vierittää, kun kortti on jo ruudun ylälaidassa', async () => {
  const { nostokuvanKorjaus, NOSTOKUVA_MARGINAALI } = await import('../js/nostokuva.js');
  const t = nostokuvanKorjaus({
    ylin: 20, delta: 64, korkeus: 800, ruutuKorkeus: 834, vierityskatto: 900,
  });
  assert.equal(t.ylin, NOSTOKUVA_MARGINAALI);
  assert.equal(t.vieritys, 56, 'loppu on kompensoitava vierityksellä');
  assert.equal(t.siirtyma, 0, 'kuvan ei saa jäädä liikkumaan');
});

test('korjaus kertoo rehellisesti, jos vieritystilaa ei ole', async () => {
  const { nostokuvanKorjaus } = await import('../js/nostokuva.js');
  const t = nostokuvanKorjaus({
    ylin: 20, delta: 64, korkeus: 800, ruutuKorkeus: 834, vierityskatto: 0,
  });
  assert.ok(t.siirtyma > 0, 'kompensoimaton jäännös on raportoitava');
});

test('iso kuva mitoitetaan yhteisellä suurennoslinjauksella', async () => {
  const { nostokuvanMitat, NOSTOKUVA_VAAKAVARA } = await import('../js/nostokuva.js');
  const { suurennoksenMitat } = await import('../js/ui-apurit.js');
  const oma = nostokuvanMitat({
    kuvaLeveys: 1536, kuvaKorkeus: 1024, ruutuLeveys: 834, ruutuKorkeus: 1194,
  });
  const yhteinen = suurennoksenMitat({
    kuvaLeveys: 1536, kuvaKorkeus: 1024, ruutuLeveys: 834, ruutuKorkeus: 1194,
    vaakaVara: NOSTOKUVA_VAAKAVARA, pystyVara: 150,
  });
  assert.equal(oma.leveys, yhteinen.leveys);
  assert.ok(oma.leveys > 834 * 0.8, 'kuvan pitää olla lähes koko ruudun levyinen');
});

/* ================================================================= */
/* Lähdekoodin vartijat                                              */
/* ================================================================= */

test('molemmat karttakortit avaavat kuvan edellä ja kuvaton aukeaa tekstinä', () => {
  for (const polku of ['js/fokusnosto.js', 'js/fokuskohteet.js']) {
    const src = lue(polku);
    assert.ok(src.includes('nostokuvaAloita'), `${polku} ei käytä kuva edellä -avausta`);
    assert.ok(/if \(!kaksivaihe\) lato(Nosto|Kohde)\(/.test(src),
      `${polku}: kuvaton nosto pitää latoa suoraan tekstikorttina`);
    assert.ok(src.includes('latoNosto'), `${polku} ei anna ladontaa kuvaesittelylle`);
  }
});

test('kuvaa ei rakenneta uudelleen vaiheenvaihdossa', () => {
  const src = lue('js/nostokuva.js');
  const alku = src.indexOf('const avaaLisaa');
  assert.ok(alku > 0, 'vaiheenvaihtoa ei löydy');
  const lohko = src.slice(alku, src.indexOf('\n  };', alku));
  assert.ok(!/createElement/.test(lohko), 'vaiheenvaihto ei saa luoda uusia kuvaelementtejä');
  assert.ok(!/\.src\s*=/.test(lohko), 'vaiheenvaihto ei saa vaihtaa kuvan src:ää');
  // Kuva luodaan täsmälleen kerran koko moduulissa.
  assert.equal((src.match(/createElement\('img'\)/g) ?? []).length, 1);
});

test('kartan painallus sulkee kortin eikä avaa uutta nostoa', () => {
  const kohteet = lue('js/fokuskohteet.js');
  // Tasokartta: nielu syö saman napautuksen clickin ennen kartan omia
  // kuuntelijoita (js/ui-apurit.js nielaiseSulkevaNapautus).
  assert.ok(/nielaiseSulkevaNapautus\(tapahtuma\)/.test(kohteet));
  assert.ok(kohteet.includes("closest?.('#board')"));
  const lauta = lue('js/pallolauta/lauta.js');
  // Pallo: korttivahti lukee kortin auki-tilan pointerdownin
  // kaappausvaiheessa ja nielaisee sitä seuraavan napautuksen.
  assert.ok(lauta.includes('korttiOliAuki'));
  assert.ok(/if \(korttiOliAuki\) \{ korttiOliAuki = false; return; \}/.test(lauta));
  const valitsin = lauta.slice(lauta.indexOf('const KORTTIVALITSIN'),
    lauta.indexOf('const KORTTIVALITSIN') + 220);
  assert.ok(valitsin.includes('.fokuskohde-popup'), 'kartan tietoruutu puuttuu korttivahdista');
  assert.ok(valitsin.includes('.fokusnosto-kerros'), 'noston kortti puuttuu korttivahdista');
});

test('kuva edellä -kortti ei seuraa merkkiään eikä ole raahattava', () => {
  const src = lue('js/fokuskohteet.js');
  assert.ok(/if \(nostokuvaKortissa\(auki\.popup\)\) return;/.test(src),
    'automaattinen asemointi siirtäisi kuvaa');
  assert.ok(/if \(nostokuvaKortissa\(popup\)\) \{/.test(src),
    'raahaus kirjoittaisi kuvaesittelyn paikan päälle');
});

test('uudet tiedostot ovat palvelutyöntekijän SHELLissä ja niputuslistalla', () => {
  const sw = lue('sw.js');
  assert.ok(sw.includes("'./js/nostokuva.js'"));
  assert.ok(sw.includes("'./css/nostokuva.css'"));
  const modules = lue('tools/build-standalone.mjs');
  const i = modules.indexOf("'js/nostokuva.js'");
  assert.ok(i > 0, 'js/nostokuva.js puuttuu MODULES-listalta');
  assert.ok(i < modules.indexOf("'js/fokuskohteet.js'"),
    'riippuvuuden on oltava listalla ennen tuojaansa');
});

test('kortti ei vierity sivusuunnassa', () => {
  /*
   * Omistaja 12.9.2026 (iPhone): pystyveto heilutti korttia myös
   * sivusuunnassa. Juurisyy on css:n oma sääntö — kun toinen akseli on
   * `auto`, toisen `visible` laskeutuu `auto`:ksi — eli pelkkä
   * `overflow-y: auto` jättää vaakavierityksen päälle. Kuva mitoitetaan
   * pikselilleen ja vierityspalkin kaista varataan erikseen, joten
   * sisältö on ajoittain murto-osapikselin kotelon leveyttä leveämpi, ja
   * se riittää iOS:n kumitukseen.
   */
  const css = lue('css/nostokuva.css');
  const alku = css.indexOf('.nostokuva-kortti .fokusnosto-sisalto');
  assert.ok(alku > 0, 'vierittävän kotelon sääntöä ei löytynyt');
  const lohko = css.slice(alku, css.indexOf('}', alku));
  assert.ok(lohko.includes('overflow-x: hidden'),
    'vaaka-akselia ei ole suljettu — pystyveto heiluttaa korttia sivusuunnassa');
  assert.ok(lohko.includes('touch-action: pan-y'),
    'ele voi alkaa vaakaliikkeenä ennen kuin selain tietää akselin');
  assert.ok(lohko.includes('.nostokuva-kortti .fokuskohde-sisalto')
    || css.slice(alku - 120, alku + 200).includes('.nostokuva-kortti .fokuskohde-sisalto'),
    'sääntö ei kata molempia vierittäviä koteloita');
});

test('vaiheessa 1 ei ole sulkuristiä eikä lähderiviä', () => {
  /*
   * Omistaja 12.9.2026: "Ota yläkulman ruksi ja lähde merkintä pois
   * kaikista nostoista. Riittää kun lähde näkyy jutussa."
   *
   * Lähderivin ELEMENTTI jää DOMiin tarkoituksella: galleriakortit
   * kirjoittavat siihen otosta vaihtaessaan, ja sen poistaminen kaatoi
   * kaksitoista testiä. Piilotus on siksi tyylitiedostossa, ja tämä
   * vartija lukee sen sieltä.
   */
  const css = lue('css/nostokuva.css');
  const alku = css.indexOf('.nostokuva-vaihe1 .fokusnosto-kortti-sulje');
  assert.ok(alku > 0, 'vaiheen 1 piilotussääntöä ei löytynyt');
  const lohko = css.slice(alku, css.indexOf('}', alku));
  for (const luokka of ['fokusnosto-kortti-sulje', 'fokuskohde-sulje', 'nostokuva-lahde']) {
    assert.ok(lohko.includes(luokka), `vaiheessa 1 näkyy yhä ${luokka}`);
  }
  assert.ok(lohko.includes('display: none'), 'piilotus ei ole display: none');
});

