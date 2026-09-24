/*
 * TEKSTI-DOM (skeema 1.15): pienin mahdollinen document-korvike, jolla
 * vienti voi ajaa pelin oman DOM-piirtofunktion Nodessa ja poimia siitä
 * näkyvät tekstit. Käytössä js/maakayrat.js piirraMaaNumerot: "Maa
 * numeroina" -sivun lauseet syntyvät vain piirrossa (ingressi, johdanto,
 * lohkojen otsikot ja tulkinnat, silloin-rivi, V-Dem, lähderivi), joten
 * ne luetaan pelin funktiosta eikä kirjoiteta tänne uudestaan.
 *
 * Tukee vain sitä, mitä piirto kutsuu: createElement, createElementNS,
 * createTextNode, appendChild, setAttribute, className, textContent,
 * classList ja style.setProperty. Tuntematon kutsu kaatuu, jolloin
 * piirron muutos näkyy viennissä heti eikä tuota vajaata tekstiä.
 */

class Solmu {
  constructor(tagi) {
    this.tagi = tagi;
    this.lapset = [];
    this.attrs = {};
    this.className = '';
    this.oma = '';
    const luokat = () => new Set(this.className.split(/\s+/).filter(Boolean));
    const aseta = (s) => { this.className = [...s].join(' '); };
    this.classList = {
      add: (...l) => { const s = luokat(); l.forEach((x) => s.add(x)); aseta(s); },
      remove: (...l) => { const s = luokat(); l.forEach((x) => s.delete(x)); aseta(s); },
      toggle: (x, pois) => { const s = luokat(); const on = pois ?? !s.has(x); if (on) s.add(x); else s.delete(x); aseta(s); return on; },
      contains: (x) => luokat().has(x),
    };
    this.style = { setProperty() {} };
  }

  appendChild(lapsi) { this.lapset.push(lapsi); return lapsi; }

  setAttribute(k, v) {
    this.attrs[k] = String(v);
    if (k === 'class') this.className = String(v);
  }

  set textContent(t) { this.oma = String(t ?? ''); this.lapset = []; }

  get textContent() { return this.oma + this.lapset.map((l) => l.textContent).join(''); }
}

/**
 * Ajaa piirron korvike-DOMissa. piirra(juuri) saa tyhjän div-solmun;
 * palauttaa juuren. Globaali document palautetaan ennalleen.
 */
export function ajaTekstiDomissa(piirra) {
  const oli = Object.hasOwn(globalThis, 'document');
  const vanha = globalThis.document;
  globalThis.document = {
    createElement: (t) => new Solmu(t),
    createElementNS: (_ns, t) => new Solmu(t),
    createTextNode: (t) => { const s = new Solmu('#text'); s.oma = String(t); return s; },
  };
  try {
    const juuri = new Solmu('div');
    piirra(juuri);
    return juuri;
  } finally {
    if (oli) globalThis.document = vanha;
    else delete globalThis.document;
  }
}

/** Kaikki solmut syvyys ensin, dokumenttijärjestyksessä. */
export function* solmut(juuri) {
  yield juuri;
  for (const l of juuri.lapset) yield* solmut(l);
}
