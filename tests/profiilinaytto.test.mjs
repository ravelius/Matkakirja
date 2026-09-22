/*
 * KEHYSPROFIILI RUUDULLE (`?koe=profiili`, js/pallolauta/profiilinaytto.js;
 * omistajan tilaus Fablen kautta 22.9.2026).
 *
 * Mittauskoneisto on ennallaan (kehysprofiili.js); tässä testataan ne
 * kaksi asiaa, jotka voivat mennä hiljaa rikki eivätkä näy missään
 * ennen kuin omistaja katsoo puhelinta:
 *
 *   1. RIVIT. Pisin kehys, sen jakauma (js / render / muu), syyt ja
 *      voimassa olevat asetukset — jotta kuvakaappaus kertoo tilan.
 *   2. JAKSO. Rollaava ikkuna sulkee ja avaa profiilin, kirjoittaa
 *      kerroksen ja lähettää tiivisteen; purku lopettaa kaiken.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  PROFIILIN_POLKU, profiiliTahti, profiilirivit, profiilitiiviste, luoProfiilinaytto,
} from '../js/pallolauta/profiilinaytto.js';

const TIIVISTE = {
  kehyksia: 180,
  mediaani: 16.7,
  p95: 33.4,
  max: 84,
  yli25: 7,
  yli50: 2,
  varattuMed: 9,
  varattuP95: 21,
  pitkatVarattuOsuus: 0.72,
  kutsut: [{ n: 'pallonSyoteUpdate', ms: 41 }, { n: 'ladoUudelleen', ms: 22 }, { n: 'tick', ms: 8 }, { n: 'muu', ms: 3 }],
  pisimmat: [{
    t: 1200, dt: 84, varattu: 61, js: 48, render: 22, drawcalls: 92, kolmiot: 40000,
    scenessa: 31, hapyvia: 4, nakyvia: 27, taso: 7, paivityksia: 3, pyyntoja: 2, rasterit: 118, jakoja: 1,
  }],
};

test('rivit: pisin kehys, jakauma, syy ja asetukset', () => {
  const rivit = profiilirivit({
    tiiviste: TIIVISTE,
    asetukset: { veto: 'jousi', tarkkuus: 'tasainen' },
    lepo: { paalla: true, unessa: false, ohitettuja: 120, piirtoja: 40 },
  });
  const teksti = rivit.join('\n');
  assert.match(teksti, /pisin 84 ms/);
  // muu = varattu − js, eli tyyli, asettelu ja maalaus.
  assert.match(teksti, /js 48 · render 22 · muu 13/);
  assert.match(teksti, /syy: pallonSyoteUpdate 41 · ladoUudelleen 22 · tick 8/, 'kolme suurinta');
  assert.match(teksti, /veto jousi · tarkkuus tasainen/, 'kuvakaappaus kertoo tilan');
  assert.match(teksti, /lepo päällä · ohitettuja 120/);
  assert.match(teksti, />25 ms: 7\/180/);
});

test('rivit: tyhjä mittaus ei kaadu eikä valehtele', () => {
  assert.deepEqual(profiilirivit({ tiiviste: null }), ['profiili: ei kehyksiä']);
  assert.deepEqual(profiilirivit({ tiiviste: { kehyksia: 0 } }), ['profiili: ei kehyksiä']);
});

test('tiiviste lähetykseen on litteä eikä sisällä kehyslistaa', () => {
  const r = profiilitiiviste({ tiiviste: TIIVISTE, asetukset: { veto: 'interp' }, ua: 'iPhone' });
  assert.equal(r.p95, 33.4);
  assert.equal(r.pisin.dt, 84);
  assert.equal(r.asetukset.veto, 'interp');
  assert.equal(r.ua, 'iPhone');
  assert.ok(!('kehykset' in r), 'ei koko kehyslistaa');
  assert.ok(JSON.stringify(r).length < 2000, 'jsonl-rivi pysyy pienenä');
});

/* --- jakso: DOM-malli ja tekokello ------------------------------------- */

class Solmu {
  constructor(tag) { this.tagName = tag; this.children = []; this.attributes = new Map(); }

  set className(v) { this.luokka = v; }

  get className() { return this.luokka ?? ''; }

  setAttribute(n, v) { this.attributes.set(n, String(v)); }

  appendChild(l) { this.children.push(l); l.vanhempi = this; return l; }

  remove() { if (this.vanhempi) this.vanhempi.children = this.vanhempi.children.filter((x) => x !== this); }

  set textContent(v) { this.teksti = v; if (v === '') this.children = []; }

  get textContent() { return this.teksti ?? ''; }

  get rivit() { return this.children.map((l) => l.textContent); }
}

test('jakso: sulkee ja avaa profiilin, kirjoittaa kerroksen, lähettää ja purkautuu', () => {
  const kotelo = new Solmu('div');
  kotelo.ownerDocument = { createElement: (tag) => new Solmu(tag) };
  const tapahtumat = [];
  const profiili = {
    aloita: () => tapahtumat.push('aloita'),
    lopeta: () => { tapahtumat.push('lopeta'); return { kehykset: [] }; },
    tiivista: () => TIIVISTE,
  };
  let ajastettu = null;
  const ikkuna = {
    setTimeout: (fn) => { ajastettu = fn; return 1; },
    clearTimeout: () => { ajastettu = null; },
    navigator: { userAgent: 'iPhone' },
  };
  const lahetykset = [];
  const pura = luoProfiilinaytto({
    profiili,
    kotelo,
    asetukset: () => ({ veto: 'vanha', tarkkuus: 'terava' }),
    lepo: () => ({ paalla: false, unessa: false, ohitettuja: 0, piirtoja: 9 }),
    laheta: (d) => lahetykset.push(d),
    ikkuna,
  });
  assert.deepEqual(tapahtumat, ['aloita'], 'mittaus alkaa heti');
  const kerros = kotelo.children[0];
  assert.equal(kerros.className, 'profiilinaytto');

  ajastettu();
  assert.deepEqual(tapahtumat, ['aloita', 'lopeta', 'aloita'], 'ikkuna rullaa');
  assert.match(kerros.rivit.join('\n'), /pisin 84 ms/);
  assert.match(kerros.rivit.join('\n'), /veto vanha · tarkkuus terava/);
  assert.equal(lahetykset.length, 1);
  assert.equal(lahetykset[0].ua, 'iPhone');

  // Toinen jakso ei kasvata kerrosta: rivit korvataan, eivät kerry.
  const riveja = kerros.children.length;
  ajastettu();
  assert.equal(kerros.children.length, riveja, 'rivit korvataan');
  assert.equal(lahetykset.length, 2);

  pura();
  assert.equal(kotelo.children.length, 0, 'kerros pois');
  assert.equal(ajastettu, null, 'ajastin pysäytetty');
});

test('lähetyspolku on se, jota mittauspalvelin kuuntelee', () => {
  assert.equal(PROFIILIN_POLKU, '/__profiili');
  /*
   * Puhelin ei voi kertoa, jos polku ei vastaa: fetch epäonnistuu
   * hiljaa (niin sen pitääkin tuotannossa). Siksi pari tarkistetaan
   * lähteestä — palvelinta ei voi käynnistää yksikkötestissä.
   */
  const palvelin = readFileSync(
    new URL('../tools/mittaus/seuraamisvirhe-palvelin.mjs', import.meta.url), 'utf8',
  );
  assert.match(palvelin, /polku === '\/__profiili' && req\.method === 'POST'/);
  assert.match(palvelin, /appendFileSync\(PROFIILIPOLKU/);
});

/* --- tahti: 120 Hz rAF ja joka toinen kehys piirtämättä ---------------- */

/*
 * FABLEN HYPOTEESI (omistajan iPhone 22.9.2026): rAF käy 120 Hz:ssä ja
 * peli piirtää ~60, jolloin joka toinen kehys putoaa. Overlayn on
 * näytettävä juuri tämä — mitattu tahti ja piirtojen osuus — tai
 * omistajan kuvakaappaus ei ratkaise mitään.
 */
test('tahti: rAF-Hz mediaanista ja piirto-osuus lepopiirron laskureista', () => {
  const kehykset = Array.from({ length: 60 }, (_, i) => ({
    dt: i % 2 ? 8.3 : 8.4, js: 4, render: i % 2 ? 0 : 5,
  }));
  const t = profiiliTahti({ kehykset }, { piirtoja: 30, ohitettuja: 30 });
  assert.equal(t.hz, 120, 'dt p50 8,3 ms → 120 Hz');
  assert.equal(t.kehyksia, 60);
  assert.equal(t.piirtoOsuus, 0.5, 'joka toinen kehys piirretään');
  assert.equal(t.yli20, 0);
  assert.ok(Math.abs(t.jsKa - 4) < 1e-9);

  const rivit = profiilirivit({ tiiviste: TIIVISTE, tahti: t }).join('\n');
  assert.match(rivit, /rAF 120 Hz \(dt p50 8\.3\) · piirto 30\/60 \(50 %\)/);
  assert.match(rivit, />20 ms: 0\/60/);
});

test('tahti: 60 Hz ja täysi piirto, pitkät kehykset lasketaan', () => {
  const kehykset = Array.from({ length: 30 }, (_, i) => ({ dt: i < 3 ? 40 : 16.7, js: 6, render: 5 }));
  const t = profiiliTahti({ kehykset }, { piirtoja: 30, ohitettuja: 0 });
  assert.equal(t.hz, 60);
  assert.equal(t.yli20, 3, 'kolme kehystä yli 20 ms');
  assert.equal(t.piirtoOsuus, 1);
  assert.equal(t.dtMax, 40);
});

test('tahti: ilman lepopiirron lukemia piirto-osuus on tuntematon, ei nolla', () => {
  const t = profiiliTahti({ kehykset: [{ dt: 16.7 }] }, null);
  assert.equal(t.piirtoOsuus, null);
  assert.match(profiilirivit({ tiiviste: TIIVISTE, tahti: t }).join('\n'), /piirto —/);
});

test('tahti kulkee myös lähetykseen', () => {
  const t = profiiliTahti({ kehykset: [{ dt: 8.3 }, { dt: 8.3 }] }, { piirtoja: 1, ohitettuja: 1 });
  const r = profiilitiiviste({ tiiviste: TIIVISTE, tahti: t });
  assert.equal(r.tahti.hz, 120);
  assert.equal(r.tahti.piirtoOsuus, 0.5);
});

test('laattavientien rivi: initTexture-kutsut jaksossa ja jonon pituus', () => {
  const kehykset = [
    { dt: 16.7, laattaVienteja: 10, vientejaOdottaa: 0 },
    { dt: 16.7, laattaVienteja: 12, vientejaOdottaa: 0 },
    { dt: 16.7, laattaVienteja: 12, vientejaOdottaa: 7 },
  ];
  const t = profiiliTahti({ kehykset }, null);
  assert.equal(t.vienteja, 2, 'jakson vientien määrä on laskurin erotus');
  assert.equal(t.odottaa, 7, 'eivienti: jonossa odottavat näkyvät');
  assert.match(profiilirivit({ tiiviste: TIIVISTE, tahti: t }).join('\n'), /laattavientejä 2 \(jonossa 7\)/);
});
