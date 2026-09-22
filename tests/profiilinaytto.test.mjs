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
  PROFIILIN_VERSIO, koetilanNimi, koetilarivi, koetilanOtsikko, pitkienJakauma,
} from '../js/pallolauta/profiilinaytto.js';
import { PIIRTOKOKEIDEN_VAIHTOEHDOT } from '../js/piirtokoe-asetus.js';
import { luoKehysprofiili } from '../js/pallolauta/kehysprofiili.js';

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
  assert.match(teksti, /lepo päällä · ohitettuja istunnossa 120/, 'ilman tahtia vain istunnon luku, nimettynä');
  assert.match(teksti, />25 ms: 7\/180/);
});

test('rivit: tyhjä mittaus ei kaadu eikä valehtele', () => {
  assert.deepEqual(profiilirivit({ tiiviste: null }).slice(1), ['profiili: ei kehyksiä']);
  assert.deepEqual(profiilirivit({ tiiviste: { kehyksia: 0 } }).slice(1), ['profiili: ei kehyksiä']);
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

/*
 * Vanha rajapinta (ilman `otos`/`kaynnissa`) käyttäytyy kuten ennen:
 * ruutunäyttö sulkee ja avaa mittauksen. Näin savukkeet ja vanhat
 * tallenteet toimivat, vaikka profiili olisi eri versiosta.
 */
test('jakso vanhalla rajapinnalla: sulkee ja avaa profiilin, lähettää ja purkautuu', () => {
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
    tila: () => ({ koe: 'eivienti', seuraava: 'eivienti', versio: 'v2127' }),
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
  assert.match(kerros.rivit[0], /^koe 3\/4 Ei tekstuurivientejä · profiili p\d+ · v2127$/, 'tila ylimpänä');
  assert.equal(lahetykset[0].koe, 'eivienti');

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

/* --- ruutunäyttö ei katkaise mittauspalvelimen otosta ------------------- */

/*
 * LAITETESTAAJAN LÖYDÖS 22.9.2026: `?koe=profiili` käynnisti
 * ruutunäytön, joka otti saman __kehysprofiili-SINGLETONIN kolmen
 * sekunnin välein ja katkaisi mittauspalvelimen otoksen — neljä eri
 * koetta sai kukin saman ~47 kehyksen pätkän, vaikka harness pyysi
 * kymmenen sekunnin ikkunaa.
 *
 * Nyt ruutunäyttö ottaa vain VIIPALEEN (`otos`) koskematta mittaukseen.
 */
test('10 s otos säilyy kokonaisena, vaikka ruutunäyttö pyörii 3 s välein', async () => {
  const { luoKehysprofiili } = await import('../js/pallolauta/kehysprofiili.js');
  let aika = 0;
  let rafJono = [];
  const ajastimet = new Map();
  let seuraavaAjastin = 1;
  const ikkuna = {
    performance: { now: () => aika },
    requestAnimationFrame: (fn) => { rafJono.push(fn); return rafJono.length; },
    cancelAnimationFrame: () => {},
    setTimeout: (fn, ms) => { const id = seuraavaAjastin++; ajastimet.set(id, { fn, milloin: aika + ms }); return id; },
    clearTimeout: (id) => { ajastimet.delete(id); },
    navigator: { userAgent: 'testi' },
  };
  const kotelo = new Solmu('div');
  kotelo.ownerDocument = { createElement: (tag) => new Solmu(tag) };

  const profiili = luoKehysprofiili(() => ({}), ikkuna);
  const lahetykset = [];
  const pura = luoProfiilinaytto({
    profiili, kotelo, jaksoMs: 3000, laheta: (d) => lahetykset.push(d), ikkuna,
  });
  assert.equal(profiili.kaynnissa(), true, 'ruutunäyttö käynnisti mittauksen');

  /** Yksi kehys: rAF-jono ja erääntyneet ajastimet. */
  const kehys = () => {
    aika += 16.7;
    const jono = rafJono;
    rafJono = [];
    for (const fn of jono) fn(aika);
    for (const [id, a] of [...ajastimet]) {
      if (a.milloin <= aika) { ajastimet.delete(id); a.fn(); }
    }
  };
  kehys();

  // Harness (tools/mittaus) avaa oman ikkunansa kesken ruutunäytön jaksojen.
  profiili.aloita();
  const kehyksia = Math.round(10000 / 16.7);
  for (let i = 0; i < kehyksia; i += 1) kehys();
  const tulos = profiili.lopeta();

  assert.ok(lahetykset.length >= 3, `ruutunäyttö ehti päivittyä (${lahetykset.length} jaksoa)`);
  assert.ok(
    tulos.kehykset.length > kehyksia * 0.9,
    `harnessin otos on kokonainen: ${tulos.kehykset.length} kehystä (odotus ~${kehyksia})`,
  );
  // Ruutunäytön oma jakso on lyhyt viipale samasta mittauksesta.
  assert.ok(lahetykset.at(-1).kehyksia < kehyksia / 2, `jakso on viipale (${lahetykset.at(-1).kehyksia})`);
  pura();
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

test('ylin rivi kertoo koetilan ja mittarin version (omistajan kaappaukset 22.9.2026)', () => {
  const rivit = profiilirivit({ tiiviste: TIIVISTE, tila: { koe: 'eivienti', versio: 'v2127' } });
  assert.equal(rivit[0], `koe 3/4 Ei tekstuurivientejä · profiili p${PROFIILIN_VERSIO} · v2127`);
  // Valikosta poistettu koe (omistaja 22.9.2026 klo 23.08) näkyy osoitteesta raakana.
  assert.equal(profiilirivit({ tiiviste: TIIVISTE, tila: { koe: 'dpr15' } })[0], `koe: dpr15 · profiili p${PROFIILIN_VERSIO}`);
  assert.match(profiilirivit({ tiiviste: TIIVISTE })[0], /^koe 1\/4 Normaali · profiili p\d+$/, 'oletus on normaali');
  assert.match(profiilirivit({ tiiviste: null })[0], /^koe 1\/4 Normaali/, 'myös ilman kehyksiä');
});

test('koetila: profiili ei ole koe, useampi lippu aakkosjärjestyksessä', () => {
  assert.equal(koetilanNimi(new Set(['profiili'])), 'normaali');
  assert.equal(koetilanNimi(new Set(['profiili', 'vahemmandc', 'alpha0'])), 'alpha0,vahemmandc');
  assert.equal(koetilanNimi(null), 'normaali');
});

test('koetila: valikon uusi valinta näkyy seuraavana, ei voimassa olevana', () => {
  assert.equal(koetilarivi({ koe: 'normaali', seuraava: 'eivienti' }),
    `koe 1/4 Normaali (seuraavassa latauksessa: koe 3/4 Ei tekstuurivientejä) · profiili p${PROFIILIN_VERSIO}`);
  assert.equal(koetilarivi({ koe: 'eivienti', seuraava: 'eivienti' }), `koe 3/4 Ei tekstuurivientejä · profiili p${PROFIILIN_VERSIO}`);
});

test('koetila: numero seuraa valikon järjestystä, valikon ulkopuolinen lippu raakana', () => {
  PIIRTOKOKEIDEN_VAIHTOEHDOT.forEach((k, i) => {
    assert.equal(koetilanOtsikko(k.lippu ?? 'normaali'), `koe ${i + 1}/${PIIRTOKOKEIDEN_VAIHTOEHDOT.length} ${k.nimi}`);
  });
  assert.equal(koetilanOtsikko('alpha0,vahemmandc'), 'koe: alpha0,vahemmandc');
  assert.equal(koetilanOtsikko('kermakangas'), 'koe: kermakangas');
});

test('tiiviste lähetykseen kantaa koetilan ja version', () => {
  const r = profiilitiiviste({ tiiviste: TIIVISTE, tila: { koe: 'eipuskuri', seuraava: 'normaali', versio: 'v2127' } });
  assert.equal(r.koe, 'eipuskuri');
  assert.equal(r.koeSeuraava, 'normaali');
  assert.equal(r.profiiliVersio, PROFIILIN_VERSIO);
  assert.equal(r.versio, 'v2127');
  assert.equal(profiilitiiviste({ tiiviste: TIIVISTE }).koe, 'normaali');
});

test('p4: ohitukset jaksolta, ei istunnon laskurista (v2126 "ohitettuja 943" piirto 100 %)', () => {
  const kehykset = Array.from({ length: 20 }, () => ({ dt: 16.7 }));
  const tahti = profiiliTahti({ kehykset }, { piirtoja: 20, ohitettuja: 0 });
  const rivit = profiilirivit({
    tiiviste: TIIVISTE, tahti, lepo: { paalla: true, unessa: false, ohitettuja: 943, piirtoja: 5000 },
  }).join('\n');
  assert.match(rivit, /ohitettuja jaksossa 0/);
  assert.doesNotMatch(rivit, /943/, 'istunnon laskuri ei näy ohituksina');
});

test('p4: pitkien kehysten varattu/vapaa korvaa valmistumisviiveen', () => {
  // 60 Hz, kehyksistä neljännes 50 ms, joista pääsäie varattuna 3 ms.
  const kehykset = Array.from({ length: 40 }, (_, i) => (i % 4 === 0
    ? { dt: 50, varattu: 3, js: 2, render: 0.5 } : { dt: 16.7, varattu: 4, js: 3, render: 0.8 }));
  const t = profiiliTahti({ kehykset });
  assert.equal(t.varattuPitkissa, 3);
  assert.equal(t.vapaaPitkissa, 47, 'aika kului pääsäikeen ulkopuolella');
  assert.ok(!('viiveKa' in t), 'kaavan artefakti pois');
  const rivit = profiilirivit({ tiiviste: TIIVISTE, tahti: t }).join('\n');
  assert.match(rivit, /pitkissä varattu 3\.0 · vapaa 47\.0 ms/);
  assert.doesNotMatch(rivit, /valmistumisviive/);
  assert.match(rivit, /dt>20: 50×10/);
});

test('p4: dt-jakauma näytön tahdin kerrannaisina erottaa 120 ja 60 Hz:n pudotukset', () => {
  assert.deepEqual(pitkienJakauma([16.7, 25.1, 24.9, 33.4, 41.6, 50.2, 8.3]), [[25, 2], [33, 1], [42, 1], [50, 1]]);
  assert.deepEqual(pitkienJakauma([16.7, 18]), []);
});

test('p4: kirjaston nimettömät silmukat nimetään, render ei tuplaannu js:ään', () => {
  let aika = 0;
  let jono = [];
  const ikkuna = {
    performance: { now: () => aika },
    requestAnimationFrame: (fn) => { jono.push(fn); return jono.length; },
    cancelAnimationFrame: () => {},
  };
  // Globe.gl:n kapsule-kääre ja frame-tickerin nuoli täsmälleen kirjaston muodossa.
  const kapsule = () => (0, eval)('(function(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return globalThis.__kapsuleKoukku?.(this)})');
  const tick = kapsule();
  const tweenit = kapsule();
  const ticker = (0, eval)('(function(e){return function(){return e.onFrame()}})')({ onFrame: () => { aika += 0.5; } });
  const renderer = { render: () => { aika += 1; } };
  const pallo = { _animationCycle: tick, renderer: () => renderer };
  globalThis.__kapsuleKoukku = (kutsuja) => {
    if (String(kutsuja) === 'tick') { aika += 2; renderer.render(); } else aika += 0.25;
  };
  try {
    const profiili = luoKehysprofiili(() => ({ pallonInstanssi: pallo }), ikkuna);
    profiili.aloita();
    const kehys = () => { aika += 16.7; const nyt = jono; jono = []; for (const fn of nyt) fn(aika); };
    kehys();
    for (let i = 0; i < 3; i += 1) {
      ikkuna.requestAnimationFrame(() => tick.call('tick'));
      ikkuna.requestAnimationFrame(tick.bind('tick'));
      ikkuna.requestAnimationFrame(tweenit);
      ikkuna.requestAnimationFrame(ticker);
      kehys();
    }
    const tulos = profiili.lopeta();
    const k = tulos.kehykset.at(-1);
    assert.ok(k.kutsut['globe.ticker'] > 0, `ticker nimetty: ${Object.keys(k.kutsut)}`);
    assert.ok(k.kutsut['globe.tweenit'] > 0, 'kapsule-kääre nimetty');
    assert.ok(!Object.keys(k.kutsut).some((n) => n.startsWith('function(){for')), 'ei raakaa lähdettä');
    // Render ajettiin rAF-kutsun sisällä: js = kutsujen aika kerran.
    const kutsujenSumma = Object.entries(k.kutsut).filter(([n]) => n !== 'three.render').reduce((a, [, ms]) => a + ms, 0);
    assert.ok(Math.abs(k.js - kutsujenSumma) < 1e-9, `js ${k.js} = kutsut ${kutsujenSumma}`);
    assert.ok(k.render > 0, 'render kirjataan erikseen');
  } finally { delete globalThis.__kapsuleKoukku; }
});

test('p4: globe.tick tunnistetaan pallon omasta syklistä', () => {
  let aika = 0;
  let jono = [];
  const ikkuna = {
    performance: { now: () => aika },
    requestAnimationFrame: (fn) => { jono.push(fn); return jono.length; },
    cancelAnimationFrame: () => {},
  };
  const tick = (0, eval)('(function(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return 0})');
  const profiili = luoKehysprofiili(() => ({ pallonInstanssi: { _animationCycle: tick } }), ikkuna);
  profiili.aloita();
  const kehys = () => { aika += 16.7; const nyt = jono; jono = []; for (const fn of nyt) fn(aika); };
  kehys();
  ikkuna.requestAnimationFrame(tick);
  kehys();
  const k = profiili.lopeta().kehykset.at(-1);
  assert.deepEqual(Object.keys(k.kutsut ?? {}), ['globe.tick']);
});
