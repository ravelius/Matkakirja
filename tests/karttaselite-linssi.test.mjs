/*
 * PEUKALOLEVYN LINSSI JA REAALIAIKAINEN RAAHAUS (omistaja 22.9.2026,
 * sanatarkasti: *"Suurennoslasin alta paistaa myös se pienempi numero.
 * Vipu pitäisi toimia myös niin, että kun siitä ottaa kiinni, niin sen
 * voi raahata oikeaan kohtaan. Eli vipu liikkuisi sormen mukana, jos
 * siitä ottaa kiinni reaaliajassa, ja kartalla vaihtuisi myös tiedot
 * reaaliajassa."*).
 *
 * Kaksi asiaa, joita ei näe diffistä:
 *
 *   1. LINSSIN ALLA OLEVAN RIVIN OMA LUKU ON PIILOSSA. Luku on
 *      linssissä suurennettuna, joten rivin oma luku näkyi sen takaa
 *      kahtena. Merkintä seuraa levyä myös kesken raahauksen ja
 *      poistuu, kun levy puretaan.
 *   2. VALINTA VAIHTUU JO RAAHATESSA, EIKÄ LEVY NYKÄISE. Kutsu lähtee
 *      vain rivin vaihtuessa (valojen koneisto käy kartan merkit läpi),
 *      ja `paivita` kesken vedon EI saa siirtää levyä sormen alta.
 *
 * DOM-osuus ajetaan pienellä omalla puumallilla samaan tapaan kuin
 * tests/lukijanappi.test.mjs: Nodessa ei ole selainta, eikä repoon
 * oteta jsdomia yhtä testiä varten. Malli toteuttaa täsmälleen ne
 * kentät, joita js/karttaselite-levy.js DOMilta kysyy.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

/* ---------------------------------------------------------------- */
/* Pieni DOM-malli                                                   */
/* ---------------------------------------------------------------- */

class Solmu {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.children = [];
    this.attributes = new Map();
    this.style = {};
    this.dataset = {};
    this.textContent = '';
    this.hidden = false;
    this.offsetTop = 0;
    this.offsetHeight = 0;
    this.kuulijat = new Map();
    this.luokat = new Set();
    this.classList = {
      add: (...n) => n.forEach((x) => this.luokat.add(x)),
      remove: (...n) => n.forEach((x) => this.luokat.delete(x)),
      contains: (n) => this.luokat.has(n),
      toggle: (n, tila) => {
        const paalle = tila === undefined ? !this.luokat.has(n) : Boolean(tila);
        if (paalle) this.luokat.add(n); else this.luokat.delete(n);
        return paalle;
      },
    };
  }

  set className(arvo) { this.luokat = new Set(String(arvo).split(/\s+/).filter(Boolean)); }

  get className() { return [...this.luokat].join(' '); }

  appendChild(lapsi) { this.children.push(lapsi); lapsi.vanhempi = this; return lapsi; }

  remove() {
    const v = this.vanhempi;
    if (!v) return;
    v.children = v.children.filter((l) => l !== this);
    this.vanhempi = null;
  }

  setAttribute(nimi, arvo) { this.attributes.set(nimi, String(arvo)); }

  getAttribute(nimi) { return this.attributes.get(nimi) ?? null; }

  addEventListener(laji, fn) { this.kuulijat.set(laji, [...(this.kuulijat.get(laji) ?? []), fn]); }

  setPointerCapture() {}

  getBoundingClientRect() { return { top: 0, left: 0, width: 200, height: 400 }; }

  /** Tukee vain luokkavalitsimia, myös pilkkulistaa — muuta ei tarvita. */
  querySelector(valitsin) {
    const luokat = valitsin.split(',').map((v) => v.trim().replace(/^\./, ''));
    for (const lapsi of this.children) {
      if (luokat.some((l) => lapsi.luokat.has(l))) return lapsi;
      const syva = lapsi.querySelector(valitsin);
      if (syva) return syva;
    }
    return null;
  }

  laheta(laji, tapahtuma) { for (const fn of this.kuulijat.get(laji) ?? []) fn(tapahtuma); }
}

globalThis.document = { createElement: (tag) => new Solmu(tag) };

const { luoPeukalolevy } = await import('../js/karttaselite-levy.js');

const KORKEUS = 40;

/** Kolme riviä allekkain, kullakin nimi ja luku. */
function valeRivit(luvut = ['7', '3', '0']) {
  const lista = new Solmu('div');
  lista.scrollHeight = KORKEUS * luvut.length;
  const rivit = new Map();
  luvut.forEach((luku, i) => {
    const rivi = new Solmu('button');
    rivi.className = 'karttaselite-rivi';
    rivi.offsetTop = i * KORKEUS;
    rivi.offsetHeight = KORKEUS;
    const nimi = new Solmu('span');
    nimi.className = 'karttaselite-nimi';
    nimi.textContent = `rivi${i}`;
    const lukusolu = new Solmu('span');
    lukusolu.className = 'karttaselite-luku';
    lukusolu.textContent = luku;
    rivi.appendChild(nimi);
    rivi.appendChild(lukusolu);
    lista.appendChild(rivi);
    rivit.set(`r${i}`, rivi);
  });
  return { lista, rivit };
}

/** Levy listan lapsena: se on viimeisenä lisätty. */
const levyElementti = (lista) => lista.children.at(-1);
const linssiElementti = (lista) => levyElementti(lista).children[0];
const linssinAlla = (rivit) => [...rivit].filter(([, r]) => r.luokat.has('luku-linssin-alla')).map(([t]) => t);

test('linssi näyttää rivin luvun ja rivin oma luku on piilotettu', () => {
  const { lista, rivit } = valeRivit();
  luoPeukalolevy({ lista, rivit, valittu: 'r0', valitse: () => {} });
  assert.equal(linssiElementti(lista).textContent, '7', 'linssissä valitun rivin luku');
  assert.deepEqual(linssinAlla(rivit), ['r0'], 'vain levyn alla oleva rivi merkitty');
});

test('valinnan vaihtuessa merkintä ja linssin luku seuraavat levyä', () => {
  const { lista, rivit } = valeRivit();
  const levy = luoPeukalolevy({ lista, rivit, valittu: 'r0', valitse: () => {} });
  levy.paivita('r2');
  assert.deepEqual(linssinAlla(rivit), ['r2']);
  assert.equal(linssiElementti(lista).textContent, '0', 'tyhjä rivi näyttää nollan');
  levy.pura();
  assert.deepEqual(linssinAlla(rivit), [], 'purku palauttaa rivien luvut');
});

test('raahaus vaihtaa valinnan reaaliajassa — kerran riviä kohti', () => {
  const { lista, rivit } = valeRivit();
  const kutsut = [];
  /*
   * Kutsuja ilmoittaa uuden valinnan takaisin levylle — juuri niin kuin
   * js/karttaselite.js tekee (vaihda → paivita → peukalo.paivita).
   */
  let ohjain = null;
  ohjain = luoPeukalolevy({
    lista,
    rivit,
    valittu: 'r0',
    valitse: (v) => { kutsut.push(v); ohjain.paivita(v); },
  });
  const el = levyElementti(lista);
  el.offsetHeight = KORKEUS;
  assert.ok(ohjain, 'levy rakennettu');
  el.laheta('pointerdown', { pointerId: 1 });
  // Sormi rivin 1 kohdalle (keskikohta 60) ja kaksi näytettä samalla rivillä.
  el.laheta('pointermove', { clientY: 55 });
  el.laheta('pointermove', { clientY: 62 });
  assert.deepEqual(kutsut, ['r1'], 'kutsu vain rivin vaihtuessa');
  // Levy seuraa sormea eikä napsahda rivin kohdalle kesken vedon.
  assert.equal(el.style.transform, `translateY(${62 - KORKEUS / 2}px)`);
  assert.deepEqual(linssinAlla(rivit), ['r1'], 'merkintä seuraa raahauksessa');
  assert.equal(linssiElementti(lista).textContent, '3');
  // Irrotus napsauttaa lähimpään riviin ja asettaa levyn sen kohdalle.
  el.laheta('pointerup', { clientY: 95 });
  assert.deepEqual(kutsut, ['r1', 'r2']);
  assert.equal(el.style.transform, `translateY(${2 * KORKEUS}px)`, 'irrotuksessa levy napsahtaa');
});
