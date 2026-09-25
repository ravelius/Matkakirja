/**
 * NIMIÖN ASU EI JÄÄ IRROTETULTA KARTALTA VÄLIMUISTIIN (web-mittaus
 * 25.9.2026, Natiivi-UI:n löydös 50 "HUOM WEBIN OMA VIKA").
 *
 * Kartan nostonimiöt piirtyivät Ranskan iPhone- ja iPad-ajoissa
 * pystykirjaimin, vaikka .nostosym-nimio on kursiivi. Mitattu syy:
 * nostoElementti (js/pallolauta/nostot.js) paistaa rasterin ennen kuin
 * kirjasto liittää elementin dokumenttiin, irrotetun svg:n
 * getComputedStyle on tyhjä, ja nostosymNimionAsu tallensi tyhjän
 * fontStylen välimuistiin koko istunnoksi. Kun ensimmäinen luku tuli
 * GL-kerroksen liitetystä kotelosta (iPad vaaka, Kreikka), nimiöt
 * olivat kursiivia — kilpailu, ei laite.
 *
 * Testi ajaa saman järjestyksen ilman selainta: pieni DOM-jäljitelmä,
 * jossa laskettu tyyli on tyhjä irrotetulle solmulle kuten Chromiumissa,
 * ja poltto (piirraNostosymPolttoon), joka kirjoittaa asun canvasin
 * `font`-arvoon.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

class Solmu {
  constructor(nimi) { this.nimi = nimi; this.maareet = {}; this.vanhempi = null; this.lapset = []; this.juuri = false; }
  setAttribute(k, v) { this.maareet[k] = String(v); }
  getAttribute(k) { return this.maareet[k] ?? null; }
  appendChild(lapsi) { lapsi.vanhempi = this; this.lapset.push(lapsi); return lapsi; }
  remove() {
    if (!this.vanhempi) return;
    this.vanhempi.lapset = this.vanhempi.lapset.filter((l) => l !== this);
    this.vanhempi = null;
  }
  get isConnected() { return this.juuri || Boolean(this.vanhempi?.isConnected); }
}

/** Kankaan jäljitelmä: jokainen kutsu käy, `font`-sijoitukset kirjataan. */
function kangas() {
  const fontit = [];
  const ctx = new Proxy({}, {
    get: (_, k) => (k === 'fontit' ? fontit
      : k === 'measureText' ? (t) => ({ width: 6 * [...t].length })
      : () => ({ addColorStop() {} })),
    set: (_, k, v) => { if (k === 'font') fontit.push(v); return true; },
  });
  return ctx;
}

globalThis.Path2D = class {};
globalThis.document = {
  createElementNS: (_, nimi) => new Solmu(nimi),
  createElement: () => ({ getContext: () => kangas() }),
};
// Laskettu tyyli kuten Chromiumissa: irrotettu solmu → tyhjät arvot.
globalThis.getComputedStyle = (solmu) => {
  if (!solmu.isConnected) return { fontStyle: '', fontFamily: '', fill: '', stroke: '', opacity: '' };
  const luokka = solmu.getAttribute('class') ?? '';
  if (luokka.includes('nostosym-nimio')) {
    return {
      fontStyle: 'italic', fontFamily: '"Liberation Serif", serif', stroke: 'none',
      fill: luokka.includes('meri') ? 'rgba(120, 108, 84, 0.72)' : 'rgba(74, 52, 33, 0.92)',
    };
  }
  return { fill: 'rgb(90, 70, 50)', opacity: '0.86', stroke: 'none' };
};

const { piirraNostosymPolttoon } = await import('../js/fokusnosto-symbolit.js');

const MERKKI = {
  symboli: 'kulttuuri', laji: 'kulttuuri', nimio: 'Reims', nimioNakyy: true, nimioPuoli: 'oikea',
};
const liitetty = () => { const kotelo = new Solmu('div'); kotelo.juuri = true; return kotelo.appendChild(new Solmu('svg')); };

test('irrotettu kartta ensin: nimiö silti kursiivina, ja liitetty kartta lukee CSS:n', () => {
  const irti = kangas();
  piirraNostosymPolttoon(irti, MERKKI, 3, new Solmu('svg'));
  assert.match(irti.fontit.at(-1), /^italic /, 'irrotetun kartan kerralla varapino (kursiivi)');

  const kiinni = kangas();
  piirraNostosymPolttoon(kiinni, MERKKI, 3, liitetty());
  assert.match(kiinni.fontit.at(-1), /^italic /, 'irrotetun kartan tyhjä asu ei saa jäädä välimuistiin');
  assert.match(kiinni.fontit.at(-1), /"Liberation Serif", serif$/, 'perhe luetaan liitetyn kartan CSS:stä');
});
