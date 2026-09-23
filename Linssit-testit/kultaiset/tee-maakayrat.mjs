// Vertailun maakäyrien kultaiset arvot (js/maakayrat.js piirraVertailu, piirraKayra,
// somaYlaraja, VERTAILUVARIT, muotoileVaki) paketin assets/data/maakayrat.json:lla.
//
// Webin funktio rakentaa SVG:n DOMiin; tässä sille annetaan pieni vale-DOM, joka kirjaa
// elementit, attribuutit ja tekstit. Natiivi (Ydin/Maat/Maakayrat.cs) tuottaa saman
// rakenteen datana, ja testi vertaa: lohkot, otsikot, apuviivat, akselitekstit ja
// polyline/circle-pisteet merkkijonoina (toFixed(1)).
//
// Käyttö: node tee-maakayrat.mjs [pelin checkout] [sisältöpaketti]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const tama = dirname(fileURLToPath(import.meta.url));
const juuri = process.argv[2] ?? '/Users/Shared/Claude/wt/linssiseppa-webmain';
const paketti = process.argv[3] ?? '/Users/Shared/Claude/sisalto-koe/v17';

class Solmu {
  constructor(nimi) { this.nimi = nimi; this.attrs = {}; this.lapset = []; this.className = ''; this._teksti = null; }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  appendChild(l) { this.lapset.push(l); return l; }
  replaceChildren() { this.lapset = []; }
  set textContent(t) { this._teksti = String(t); }
  get textContent() { return this._teksti; }
}
class Teksti { constructor(t) { this.nimi = '#text'; this.teksti = t; } }
globalThis.document = {
  createElement: (n) => new Solmu(n),
  createElementNS: (_ns, n) => new Solmu(n),
  createTextNode: (t) => new Teksti(t),
};

const M = await import(join(juuri, 'js/maakayrat.js'));
const data = JSON.parse(readFileSync(join(paketti, 'tiedostot/assets/data/maakayrat.json'), 'utf8'));

// Puu → tiivis JSON: lohkot [{ otsikko, svg: { viewBox, osat: [{ tyyppi, luokka, ... }] } }].
const svgOsat = (svg) => svg.lapset.map((e) => ({ tyyppi: e.nimi, ...e.attrs, ...(e._teksti != null ? { teksti: e._teksti } : {}) }));
const vertailu = (isot) => {
  const kohde = new Solmu('div');
  M.piirraVertailu(kohde, isot, data);
  const ristikko = kohde.lapset.find((l) => l.className === 'maakayrat');
  const lohkot = (ristikko?.lapset ?? []).map((osa) => ({
    otsikko: osa.lapset[0].textContent,
    viewBox: osa.lapset[1].attrs.viewBox,
    seloste: osa.lapset[1].attrs['aria-label'],
    osat: svgOsat(osa.lapset[1]),
  }));
  const tyhja = kohde.lapset.find((l) => l.className === 'johdanto')?.textContent ?? null;
  const lahde = kohde.lapset.find((l) => l.className === 'lahde maakayra-lahde')?.textContent ?? null;
  const kortit = (kohde.lapset.find((l) => l.className === 'vertailu-kortit')?.lapset ?? []).map((k) => k.className);
  return { isot, lohkot, tyhja, lahde, kortit };
};

const tapaukset = [
  ['FIN', 'SWE'],
  ['FIN', 'SWE', 'NOR', 'DNK'],
  ['CHN', 'IND', 'USA'],
  ['ISL', 'LUX'],          // pienet: väkiluku tuhansina
  ['NGA', 'ETH', 'EGY', 'ZAF', 'KEN'],   // viides maa saa viimeisen värin
  ['FRA', 'XXX'],          // tuntematon maa pois
  ['XXX'],                 // ei sarjoja
  ['QAT', 'SAU'],
];
const tulos = {
  varit: M.VERTAILUVARIT,
  vaki: [0, 390000, 949999, 950000, 5_600_000, 9_949_999, 9_950_000, 59_000_000, 994_000_000, 995_000_000, 1_420_000_000].map((n) => [n, M.muotoileVaki(n)]),
  vertailut: tapaukset.map(vertailu),
};
writeFileSync(join(tama, 'maakayrat.json'), JSON.stringify(tulos));
// Testien paketti: vain tapausten maat (koko tiedosto on 0,5 Mt).
const maat = [...new Set(tapaukset.flat())].filter((i) => data.maat[i]);
writeFileSync(join(tama, 'paketti', 'maakayrat-ote.json'),
  JSON.stringify({ meta: data.meta, mittarit: data.mittarit, maat: Object.fromEntries(maat.map((i) => [i, data.maat[i]])) }));
console.log('vertailuja', tulos.vertailut.length, 'lohkoja', tulos.vertailut.reduce((a, v) => a + v.lohkot.length, 0),
  'osia', tulos.vertailut.reduce((a, v) => a + v.lohkot.reduce((b, l) => b + l.osat.length, 0), 0));
