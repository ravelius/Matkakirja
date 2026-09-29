/*
 * js/kokoelmanakyma.js: YHTEINEN KOKOELMANÄKYMÄ (LINSSIT JA AARTEET).
 *
 * Omistajan tilaus 29.9.2026 (pillerivalikkouudistus): Linssit- ja
 * Aarteet-näkymillä on sama kaksivaiheinen napautus — "1. napautus:
 * paneelin VASEMMALLE puolelle nousee esikatselukortti ... ja rivi
 * muuttuu samassa kohdassa napiksi. 2. napautus samaan kohtaan ...
 * [tekee toiminnon]." Tämä testi vartioi PIIRRINTÄ itseään (ei
 * linssi- tai aarredataa, joita vartioivat omat testinsä
 * tests/matkalaukun-linssit.test.mjs ja js/ui.js:n Aarteet-metodit):
 *
 *   1. tyhjä kokoelma näyttää tyhjätekstin eikä kaadu,
 *   2. otsikot näkyvät vain kun annettu, ja "N / kaikki" -luku niiden
 *      perässä,
 *   3. rivin ensimmäinen napautus kutsuu esikatsele(id):tä, ei
 *      aktivoi(id):tä, ja piirtää esikatselukortin,
 *   4. jo esikatsellun rivin napautus kutsuu aktivoi(id):tä,
 *   5. rivi muuttuu itse paikallaan toimintonapiksi (nappiteksti)
 *      esikatseltuna,
 *   6. esikatselukortti on piilossa, kun mikään rivi ei ole esikatseltu.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli (sama kaava kuin tests/matkalaukun-linssit.test.mjs) */
/* ---------------------------------------------------------------- */

class Elementti {
  constructor(nimi) {
    this.nodeType = 1;
    this.tagName = nimi.toUpperCase();
    this.luokat = new Set();
    this.attrs = {};
    this.dataset = {};
    this.childNodes = [];
    this.kuuntelijat = new Map();
    this.textContent = '';
    this.innerHTML = '';
    this.hidden = false;
    this.classList = {
      add: (n) => this.luokat.add(n),
      remove: (n) => this.luokat.delete(n),
      contains: (n) => this.luokat.has(n),
      toggle: (n, pakko) => {
        const paalle = pakko ?? !this.luokat.has(n);
        if (paalle) this.luokat.add(n);
        else this.luokat.delete(n);
        return paalle;
      },
    };
  }

  get className() { return [...this.luokat].join(' '); }

  set className(arvo) {
    this.luokat = new Set(String(arvo).split(/\s+/).filter(Boolean));
  }

  appendChild(lapsi) { lapsi.parentElement = this; this.childNodes.push(lapsi); return lapsi; }

  append(...lapset) { for (const l of lapset) this.appendChild(l); }

  replaceChildren(...lapset) {
    this.childNodes = lapset;
    for (const l of lapset) l.parentElement = this;
  }

  remove() {
    if (!this.parentElement) return;
    this.parentElement.childNodes = this.parentElement.childNodes.filter((n) => n !== this);
    this.parentElement = null;
  }

  /*
   * replaceWith/src ovat js/media.js asetaKuva:n takia (kokoelmanakyma.js
   * käyttää sitä kuvien lataukseen 29.9.2026 illan korjauksesta lähtien).
   * `src`-setteri jäljittelee selainta MIKROTASKISSA, ei oikealla
   * kuvanlatauksella — ilman tätä asetaKuva jäisi odottamaan oikeita
   * `load`/`error`-tapahtumia, jotka eivät tässä tyngässä koskaan tule,
   * ja sen sisäinen uusintasilmukka venytti yhden testitiedoston ajon
   * 30 sekuntiin (mitattu ennen korjausta).
   */
  replaceWith(...uudet) {
    if (!this.parentElement) return;
    const i = this.parentElement.childNodes.indexOf(this);
    if (i >= 0) this.parentElement.childNodes.splice(i, 1, ...uudet);
    for (const u of uudet) u.parentElement = this.parentElement;
    this.parentElement = null;
  }

  set src(arvo) {
    this._src = arvo;
    this.attrs.src = arvo;
    queueMicrotask(() => { for (const f of this.kuuntelijat.get('load') ?? []) f({}); });
  }

  get src() { return this._src; }

  setAttribute(nimi, arvo) { this.attrs[nimi] = String(arvo); }

  getAttribute(nimi) {
    return Object.prototype.hasOwnProperty.call(this.attrs, nimi) ? this.attrs[nimi] : null;
  }

  addEventListener(laji, kasittelija) {
    if (!this.kuuntelijat.has(laji)) this.kuuntelijat.set(laji, []);
    this.kuuntelijat.get(laji).push(kasittelija);
  }

  removeEventListener(laji, kasittelija) {
    const lista = this.kuuntelijat.get(laji);
    if (!lista) return;
    const i = lista.indexOf(kasittelija);
    if (i >= 0) lista.splice(i, 1);
  }

  napauta() {
    for (const k of this.kuuntelijat.get('click') ?? []) k({ target: this });
  }

  matches(valitsin) {
    if (valitsin.startsWith('.')) return this.luokat.has(valitsin.slice(1));
    return this.tagName === valitsin.toUpperCase();
  }

  querySelectorAll(valitsin) {
    const osat = valitsin.trim().split(/\s+/);
    let taso = [this];
    for (const osa of osat) {
      const seuraava = [];
      for (const solmu of taso) {
        for (const jalkelainen of jalkelaiset(solmu)) {
          if (jalkelainen.matches(osa)) seuraava.push(jalkelainen);
        }
      }
      taso = seuraava;
    }
    return taso;
  }
}

function* jalkelaiset(solmu) {
  for (const lapsi of solmu.childNodes) {
    if (lapsi.nodeType !== 1) continue;
    yield lapsi;
    yield* jalkelaiset(lapsi);
  }
}

function teksti(solmu) {
  if (!solmu) return '';
  if (solmu.nodeType === 3) return solmu.data;
  return solmu.textContent + solmu.childNodes.map(teksti).join('');
}

globalThis.document = {
  createElement: (nimi) => new Elementti(nimi),
  createElementNS: (_tila, nimi) => new Elementti(nimi),
};

const { piirraKokoelma } = await import('../js/kokoelmanakyma.js');

/* ---------------------------------------------------------------- */

/** Perustila: seuraa esikatselu-/aktivointikutsuja ilman sivuvaikutuksia. */
function tilanSeuranta(alkuEsikatseltu = null) {
  const tila = {
    esikatseltu: alkuEsikatseltu,
    esikatsellut: [],
    aktivoidut: [],
    nappiteksti: (rivi) => (rivi.id === 'paalla' ? 'Ota pois' : 'Aktivoi'),
  };
  tila.esikatsele = (id) => tila.esikatsellut.push(id);
  tila.aktivoi = (id) => tila.aktivoidut.push(id);
  return tila;
}

test('tyhjä kokoelma näyttää tyhjätekstin eikä kaadu', () => {
  const kotelo = new Elementti('div');
  const tila = tilanSeuranta();
  piirraKokoelma(kotelo, [], { ...tila, tyhjaTeksti: 'Ei mitään vielä.' });
  assert.equal(kotelo.childNodes.length, 1);
  assert.match(teksti(kotelo), /Ei mitään vielä\./);
});

test('otsikko ja "N / kaikki" -luku näkyvät vain kun annettu', () => {
  const kotelo = new Elementti('div');
  const tila = tilanSeuranta();
  const ryhmat = [
    { otsikko: 'Aarnin luettelo', luku: '2 / 7', rivit: [{ id: 'a', nimi: 'Aarre A' }] },
    { rivit: [{ id: 'b', nimi: 'Rivi ilman ryhmää' }] },
  ];
  piirraKokoelma(kotelo, ryhmat, tila);
  const otsikot = kotelo.querySelectorAll('.kokoelma-otsikko');
  assert.equal(otsikot.length, 1, 'vain otsikollinen ryhmä saa otsikkorivin');
  assert.match(teksti(otsikot[0]), /Aarnin luettelo/);
  assert.match(teksti(otsikot[0]), /2 \/ 7/);
  const rivit = kotelo.querySelectorAll('.kokoelma-rivi');
  assert.equal(rivit.length, 2);
});

test('ensimmäinen napautus kutsuu esikatselua, ei aktivointia', () => {
  const kotelo = new Elementti('div');
  const tila = tilanSeuranta();
  piirraKokoelma(kotelo, [{ rivit: [{ id: 'x', nimi: 'Rivi X' }] }], tila);
  kotelo.querySelectorAll('.kokoelma-rivi')[0].napauta();
  assert.deepEqual(tila.esikatsellut, ['x']);
  assert.deepEqual(tila.aktivoidut, []);
});

test('toinen napautus samaan (jo esikatseltuun) riviin aktivoi', () => {
  const kotelo = new Elementti('div');
  // esikatseltu on jo 'x' ennen piirtoa — simuloi tilaa napautuksen jälkeen.
  const tila = tilanSeuranta('x');
  piirraKokoelma(kotelo, [{ rivit: [{ id: 'x', nimi: 'Rivi X' }] }], tila);
  kotelo.querySelectorAll('.kokoelma-rivi')[0].napauta();
  assert.deepEqual(tila.aktivoidut, ['x']);
  assert.deepEqual(tila.esikatsellut, [], 'jo esikatseltua riviä ei esikatsella uudestaan');
});

test('rivi muuttuu paikallaan nappiteksti-tekstiksi esikatseltuna', () => {
  const kotelo = new Elementti('div');
  const tila = tilanSeuranta('paalla');
  tila.nappiteksti = (rivi) => (rivi.id === 'paalla' ? 'Ota pois' : 'Aktivoi');
  piirraKokoelma(kotelo, [{ rivit: [
    { id: 'paalla', nimi: 'Päällä oleva' },
    { id: 'muu', nimi: 'Muu rivi' },
  ] }], tila);
  const [paalla, muu] = kotelo.querySelectorAll('.kokoelma-rivi');
  assert.match(teksti(paalla), /Ota pois/, 'esikatseltu rivi näyttää nappitekstin nimen sijaan');
  assert.match(teksti(muu), /Muu rivi/, 'esikatselematon rivi näyttää yhä oman nimensä');
  assert.equal(paalla.luokat.has('esikatselu'), true);
  assert.equal(muu.luokat.has('esikatselu'), false);
});

test('esikatselukortti on piilossa, kun mikään rivi ei ole esikatseltu', () => {
  const kotelo = new Elementti('div');
  const tila = tilanSeuranta(null);
  piirraKokoelma(kotelo, [{ rivit: [{ id: 'x', nimi: 'Rivi X', selite: 'Selite X' }] }], tila);
  const kortti = kotelo.querySelectorAll('.kokoelma-esikatselu')[0];
  assert.equal(kortti.hidden, true);
});

test('esikatselukortti näyttää kuvan/ikonin, nimen, selitteen ja toimintonapin', () => {
  const kotelo = new Elementti('div');
  const tila = tilanSeuranta('x');
  piirraKokoelma(kotelo, [{ rivit: [
    { id: 'x', nimi: 'Rivi X', selite: 'Pitkä selite.', kuva: 'kuva.jpg' },
  ] }], tila);
  const kortti = kotelo.querySelectorAll('.kokoelma-esikatselu')[0];
  assert.equal(kortti.hidden, false);
  assert.match(teksti(kortti), /Rivi X/);
  assert.match(teksti(kortti), /Pitkä selite\./);
  assert.match(teksti(kortti), /Aktivoi/);
  const kuva = kortti.childNodes.find((n) => n.luokat?.has('kokoelma-esikatselu-kuva'));
  assert.ok(kuva, 'kuva puuttuu esikatselukortista');
});

/*
 * LINSSIT 29.9.2026: `kortti` erottaa esikatselukortin napiksi muuttuneesta
 * rivistä, ja `ilmanKorttinappia` poistaa kortin Aktivoi-napin. Aarteet ei
 * anna kumpaakaan, joten sen käytös pysyy ennallaan (testit yllä).
 */
test('kortti + ilmanKorttinappia: kortti näkyy ilman napautusta eikä siinä ole nappia', () => {
  const kotelo = new Elementti('div');
  const tila = tilanSeuranta(undefined);
  piirraKokoelma(kotelo, [{ rivit: [
    { id: 'a', nimi: 'A', selite: 'Selite A' },
    { id: 'b', nimi: 'B', selite: 'Selite B' },
  ] }], { ...tila, kortti: 'a', ilmanKorttinappia: true });
  const kortti = kotelo.querySelectorAll('.kokoelma-esikatselu')[0];
  assert.equal(kortti.hidden, false);
  assert.match(teksti(kortti), /Selite A/);
  assert.equal(kotelo.querySelectorAll('.kokoelma-toiminto').length, 0, 'korttinappia ei saa olla');
  assert.ok(kotelo.querySelectorAll('.kokoelma-runko')[0].luokat.has('kokoelma-esikatselu-auki'));
  // Yksikään rivi ei ole nappi, kun esikatseltu on undefined.
  assert.equal(kotelo.querySelectorAll('.kokoelma-rivi').filter((r) => r.luokat.has('esikatselu')).length, 0);
});

test('kortti vaihtuu napautettuun riviin ja rivi on nappi', () => {
  const kotelo = new Elementti('div');
  const tila = tilanSeuranta('b');
  piirraKokoelma(kotelo, [{ rivit: [
    { id: 'a', nimi: 'A', selite: 'Selite A' },
    { id: 'b', nimi: 'B', selite: 'Selite B' },
  ] }], { ...tila, kortti: 'b', ilmanKorttinappia: true });
  const kortti = kotelo.querySelectorAll('.kokoelma-esikatselu')[0];
  assert.match(teksti(kortti), /Selite B/);
  const [a, b] = kotelo.querySelectorAll('.kokoelma-rivi');
  assert.match(teksti(b), /Aktivoi/);
  assert.match(teksti(a), /A/);
  b.napauta();
  assert.deepEqual(tila.aktivoidut, ['b']);
});
