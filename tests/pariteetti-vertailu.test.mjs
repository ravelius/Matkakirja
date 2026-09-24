// Pariteettiajon vertailija (tools/pariteetti-vertailu.mjs).
//
// Automaattinen pariteettiajo vertaa selainpelin ja natiivin iOS-version
// samaa näkymää laatikkolistoina ja kuvina. Nämä testit vartioivat, että
// tuomio kääntyy oikeasta kohdasta: rajan sisäpuolella SAMA, heti sen
// ulkopuolella ERI, ja PUUTTUU vain kun natiivista puuttuu näkymä tai
// suurin osa sen teksteistä.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  OLETUSRAJAT, normalisoi, skaalaa, parita, kuvaEro, tuomio, vertaa,
  markdownTaulu, kontaktiarkki,
} from '../tools/pariteetti-vertailu.mjs';

const laatikko = (teksti, x, y, w = 80, h = 20, lisa = {}) => ({ teksti, x, y, w, h, opasiteetti: 1, ...lisa });
const nakyma = (elementit, w = 393, h = 852) => ({ paneeli: { w, h }, elementit });

// Kymmenen tekstin perusnäkymä: puuttuvien raja on tällöin tasan 1.
const PERUS = Array.from({ length: 10 }, (_, i) => laatikko(`Rivi numero ${i + 1}`, 20, 40 + i * 60, 160, 22));

// ---------------------------------------------------------------- normalisoi

test('normalisoi: välimerkit, viivat ja versaalit eivät erota', () => {
  assert.equal(normalisoi('Ateena · Kreikka'), 'ateena kreikka');
  assert.equal(normalisoi('ATEENA — KREIKKA'), 'ateena kreikka');
  assert.equal(normalisoi('Ateena · Kreikka'), normalisoi('ATEENA — KREIKKA'));
});

test('normalisoi: tavuviivat, erikoisvälit, emojit ja NFKC', () => {
  assert.equal(normalisoi('Lon\u00ADtoo'), 'lontoo');
  assert.equal(normalisoi('Palaa\u00A0kartalle\u202F!'), 'palaa kartalle');
  assert.equal(normalisoi('🎲 Heitä noppaa 🎲'), 'heitä noppaa');
  assert.equal(normalisoi('ﬁlmi'), 'filmi'); // NFKC-ligatuuri
  assert.equal(normalisoi('A\u0308ÄNI'), 'ääni'); // hajotettu ä kootaan
  assert.equal(normalisoi("liu'un"), normalisoi('liu’un'));
  assert.equal(normalisoi('  paljon    välejä\n\trivillä '), 'paljon välejä rivillä');
  assert.equal(normalisoi(null), '');
});

// ---------------------------------------------------------------- skaalaa

test('skaalaa: natiivi web-tilaan leveyden kertoimella, alkuperä ennallaan', () => {
  const natiivi = nakyma([laatikko('Liiku', 201, 100, 100, 40, { fontti: 17 })], 402, 874);
  const web = nakyma([], 393, 852);
  const s = skaalaa(natiivi, web);
  const k = 393 / 402;
  assert.equal(s.kerroin, k);
  assert.equal(s.paneeli.w, 393);
  assert.ok(Math.abs(s.paneeli.h - 874 * k) < 1e-9);
  const e = s.elementit[0];
  assert.ok(Math.abs(e.x - 201 * k) < 1e-9 && Math.abs(e.w - 100 * k) < 1e-9);
  assert.ok(Math.abs(e.fontti - 17 * k) < 1e-9);
  assert.equal(natiivi.elementit[0].x, 201, 'alkuperäinen lista ei saa muuttua');
  assert.notEqual(s.elementit, natiivi.elementit);
  // Jo skaalattu lista ei skaalaudu toiseen kertaan.
  assert.equal(skaalaa(s, web).kerroin, 1);
});

// ---------------------------------------------------------------- parita

test('parita: sama teksti kahdesti paritetaan lähimpien keskipisteiden mukaan', () => {
  const web = nakyma([laatikko('Liiku', 20, 100), laatikko('Liiku', 20, 600)]);
  // Natiivissa järjestys on päinvastainen: ensin alempi.
  const natiivi = nakyma([laatikko('LIIKU', 22, 603), laatikko('liiku', 21, 104)]);
  const { parit, vainWeb, vainNatiivi } = parita(web, natiivi);
  assert.equal(parit.length, 2);
  assert.deepEqual(vainWeb, []);
  assert.deepEqual(vainNatiivi, []);
  for (const p of parit) {
    assert.equal(p.laatu, 'tarkka');
    assert.ok(Math.abs(p.dy) <= 4, `väärä pari: dy ${p.dy}`);
  }
  assert.deepEqual(parit.map((p) => Math.round(p.dy)), [4, 3]);
});

test('parita: kolme webissä, kaksi natiivissa → yksi jää vain webiin', () => {
  const web = nakyma([laatikko('Ok', 0, 0), laatikko('Ok', 0, 300), laatikko('Ok', 0, 600)]);
  const natiivi = nakyma([laatikko('Ok', 0, 598), laatikko('Ok', 0, 2)]);
  const { parit, vainWeb } = parita(web, natiivi);
  assert.equal(parit.length, 2);
  assert.equal(vainWeb.length, 1);
  assert.equal(vainWeb[0].y, 300);
});

test('parita: osittainen pari alkuosasta, lyhyt yhteinen alku ei riitä', () => {
  const web = nakyma([
    laatikko('Palaa kartalle ja jatka matkaa', 20, 700),
    laatikko('Kartta', 20, 50),
  ]);
  const natiivi = nakyma([
    laatikko('Palaa kartalle', 20, 702), // web-tekstin alkuosa, 14 merkkiä
    laatikko('Kartan selite', 20, 52), // yhteistä alkua vain "kartta" → ei paria
  ]);
  const { parit, vainWeb, vainNatiivi } = parita(web, natiivi);
  assert.equal(parit.length, 1);
  assert.equal(parit[0].laatu, 'osittainen');
  assert.equal(parit[0].web.teksti, 'Palaa kartalle ja jatka matkaa');
  assert.deepEqual(vainWeb.map((e) => e.teksti), ['Kartta']);
  assert.deepEqual(vainNatiivi.map((e) => e.teksti), ['Kartan selite']);
});

test('parita: himmeät (< 0.3) ja tyhjät ohitetaan, natiivi skaalataan', () => {
  const web = nakyma([laatikko('Näkyvä', 100, 100), laatikko('Häivytetty', 0, 0, 80, 20, { opasiteetti: 0.1 })]);
  const natiivi = nakyma([
    laatikko('Näkyvä', 200, 200, 160, 40),
    laatikko('   ', 0, 0),
    laatikko('Toinen häivytetty', 0, 0, 80, 20, { opasiteetti: 0.29 }),
    { kuva: true, x: 0, y: 0, w: 10, h: 10, opasiteetti: 1 },
  ], 786, 1704);
  const { parit, vainWeb, vainNatiivi } = parita(web, natiivi);
  assert.equal(parit.length, 1);
  assert.deepEqual([vainWeb.length, vainNatiivi.length], [0, 0]);
  const p = parit[0];
  assert.ok(Math.abs(p.dx) < 1e-9 && Math.abs(p.dy) < 1e-9 && Math.abs(p.dw) < 1e-9);
});

test('parita: pitkä leipäteksti paritetaan osittain ja dy on yläreunojen ero', () => {
  const alku = 'Isoisä kirjoitti päiväkirjaansa vuonna 1873, että Ateenan satamassa odotti laiva. ';
  const webTeksti = `${alku}Aamulla sumu nousi ja kapteeni huusi lähtökäskyn, eikä kukaan tiennyt minne matka jatkuisi.`;
  const natTeksti = `${alku}Aamulla sumu nousi, ja kapteeni antoi lähtökäskyn ennen kuin aurinko ehti nousta.`;
  assert.ok(webTeksti.length > 120 && natTeksti.length > 120);
  const web = nakyma([laatikko(webTeksti, 20, 300, 350, 120)]);
  const natiivi = nakyma([laatikko(natTeksti, 20, 305, 350, 200)]);
  const { parit } = parita(web, natiivi);
  assert.equal(parit.length, 1);
  assert.equal(parit[0].laatu, 'osittainen');
  assert.equal(parit[0].pitka, true);
  assert.equal(parit[0].dy, 5); // yläreuna, ei keskipiste (joka olisi +45)
});

// ---------------------------------------------------------------- kuvaEro

function kuvio(w, h, siirto = 0) {
  const g = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const xs = x - siirto;
      const laatikko = xs >= 10 && xs < 30 && y >= 12 && y < 40;
      const raita = (xs >> 2) % 2 === 0 && y > 44;
      g[y * w + x] = laatikko ? 230 : raita ? 170 : 40;
    }
  }
  return g;
}

test('kuvaEro: identtinen kuva → ssim ja reunat ≈ 1', () => {
  const a = kuvio(64, 64);
  const { ssim, reunat } = kuvaEro(a, Uint8Array.from(a), 64, 64);
  assert.ok(ssim > 0.999, `ssim ${ssim}`);
  assert.ok(reunat > 0.999, `reunat ${reunat}`);
  const f = kuvaEro(Float32Array.from(a), Float32Array.from(a), 64, 64);
  assert.ok(f.ssim > 0.999);
});

test('kuvaEro: kohina ja siirto laskevat arvoja, kohina enemmän', () => {
  const a = kuvio(64, 64);
  let siemen = 7;
  const satunnainen = () => { siemen = (siemen * 1103515245 + 12345) & 0x7fffffff; return siemen / 0x7fffffff; };
  const kohina = Uint8Array.from(a, (v) => Math.max(0, Math.min(255, v + (satunnainen() - 0.5) * 160)));
  const siirretty = kuvio(64, 64, 6);
  const k = kuvaEro(a, kohina, 64, 64);
  const s = kuvaEro(a, siirretty, 64, 64);
  assert.ok(k.ssim < 0.9, `kohinan ssim ${k.ssim}`);
  assert.ok(s.ssim < 0.95, `siirron ssim ${s.ssim}`);
  assert.ok(s.reunat < 0.9, `siirron reunat ${s.reunat}`);
  for (const v of [k.ssim, k.reunat, s.ssim, s.reunat]) assert.ok(v >= 0 && v <= 1);
  // Täysin eri kuva: tasainen vs kuvio.
  const tasainen = new Uint8Array(64 * 64).fill(128);
  assert.ok(kuvaEro(a, tasainen, 64, 64).reunat < 0.05);
});

test('kuvaEro: väärän kokoinen taulukko on virhe', () => {
  assert.throws(() => kuvaEro(new Uint8Array(10), new Uint8Array(12), 3, 4), /kuvaEro/);
});

// ---------------------------------------------------------------- tuomio

const siirra = (lista, muutos) => lista.map((e, i) => ({ ...e, ...muutos(e, i) }));

test('tuomio: oletusrajat ovat tehtävänannon mukaiset', () => {
  assert.equal(OLETUSRAJAT.sijaintiPx, 8);
  assert.equal(OLETUSRAJAT.kokoOsuus, 0.15);
  assert.equal(OLETUSRAJAT.puuttuvatOsuus, 0.10);
  assert.equal(OLETUSRAJAT.puuttuuOsuus, 0.60);
  assert.equal(OLETUSRAJAT.ssim, 0.55);
  assert.equal(OLETUSRAJAT.reunat, 0.5);
  assert.equal(OLETUSRAJAT.opasiteetti, 0.3);
  assert.equal(OLETUSRAJAT.pitkaTeksti, 120);
});

test('tuomio SAMA ↔ ERI: sijainti ±8 px', () => {
  const web = nakyma(PERUS);
  const sisalla = tuomio(parita(web, nakyma(siirra(PERUS, (e) => ({ y: e.y + 8 })))));
  assert.equal(sisalla.tila, 'SAMA', sisalla.syyt.join('; '));
  assert.equal(sisalla.eroPx, 8);
  const yli = tuomio(parita(web, nakyma(siirra(PERUS, (e, i) => ({ y: e.y + (i === 3 ? 14 : 0) })))));
  assert.equal(yli.tila, 'ERI');
  assert.equal(yli.eroPx, 14);
  assert.deepEqual(yli.syyt, ['"Rivi numero 4": dy +14 px']);
  const vasen = tuomio(parita(web, nakyma(siirra(PERUS, (e, i) => ({ x: e.x - (i === 0 ? 9 : 0) })))));
  assert.equal(vasen.tila, 'ERI');
  assert.match(vasen.syyt[0], /dx -9 px/);
});

test('tuomio SAMA ↔ ERI: koko ±15 %', () => {
  const web = nakyma(PERUS);
  const sisalla = tuomio(parita(web, nakyma(siirra(PERUS, (e) => ({ x: e.x - 12, w: e.w * 1.15 })))));
  assert.equal(sisalla.tila, 'SAMA', sisalla.syyt.join('; '));
  // Keskipiste pysyy paikallaan, leveys +20 %.
  const yli = tuomio(parita(web, nakyma(siirra(PERUS, (e, i) => (i === 2 ? { x: e.x - 16, w: e.w * 1.2 } : {})))));
  assert.equal(yli.tila, 'ERI');
  assert.deepEqual(yli.syyt, ['"Rivi numero 3": leveys +20 %']);
});

test('tuomio SAMA ↔ ERI: puuttuvat tekstit 10 %, vähintään 1', () => {
  const web = nakyma(PERUS);
  const yksiPois = tuomio(parita(web, nakyma(PERUS.slice(1))));
  assert.equal(yksiPois.tila, 'SAMA');
  assert.deepEqual(yksiPois.syyt, ['vain webissä (sallittu): "Rivi numero 1"']);
  const kaksiPois = tuomio(parita(web, nakyma(PERUS.slice(2))));
  assert.equal(kaksiPois.tila, 'ERI');
  assert.ok(kaksiPois.syyt.includes('vain webissä: "Rivi numero 1"'));
  // Alle 10 tekstiä: yksi puuttuva sallitaan silti.
  const pieni = tuomio(parita(nakyma(PERUS.slice(0, 3)), nakyma(PERUS.slice(0, 2))));
  assert.equal(pieni.tila, 'SAMA');
  // Ylimääräiset natiivissa samalla säännöllä.
  const ylim = [laatikko('Ylimääräinen A', 0, 800), laatikko('Ylimääräinen B', 200, 800)];
  const lisaa = tuomio(parita(web, nakyma([...PERUS, ...ylim])));
  assert.equal(lisaa.tila, 'ERI');
  assert.ok(lisaa.syyt.includes('vain natiivissa: "Ylimääräinen A"'));
});

test('tuomio SAMA ↔ ERI: rakenne ssim 0.55 ja reunat 0.5', () => {
  const p = parita(nakyma(PERUS), nakyma(PERUS));
  assert.equal(tuomio(p, { ssim: 0.55, reunat: 0.5 }).tila, 'SAMA');
  assert.equal(tuomio(p, { ssim: 0.54, reunat: 0.9 }).tila, 'ERI');
  const r = tuomio(p, { ssim: 0.9, reunat: 0.49 });
  assert.equal(r.tila, 'ERI');
  assert.match(r.syyt[0], /^rakenne eri: ssim 0\.90/);
  assert.equal(tuomio(p, null).tila, 'SAMA');
});

test('tuomio PUUTTUU: natiivi tyhjä, puuttuu tai yli 60 % puuttuu', () => {
  const web = nakyma(PERUS);
  assert.equal(vertaa(web, null).tila, 'PUUTTUU');
  assert.equal(vertaa(web, nakyma([])).tila, 'PUUTTUU');
  assert.equal(tuomio({ parit: [], vainWeb: [], vainNatiivi: [], natiiviPuuttuu: true }).tila, 'PUUTTUU');
  // Natiivissa pelkkä kuva: yhtään tekstiä ei löydy.
  assert.equal(vertaa(web, nakyma([{ kuva: true, x: 0, y: 0, w: 9, h: 9, opasiteetti: 1 }])).tila, 'PUUTTUU');
  // 6/10 puuttuu = 60 % → vielä ERI; 7/10 → PUUTTUU.
  const kuusi = tuomio(parita(web, nakyma(PERUS.slice(6))));
  assert.equal(kuusi.tila, 'ERI');
  const seitseman = tuomio(parita(web, nakyma(PERUS.slice(7))));
  assert.equal(seitseman.tila, 'PUUTTUU');
  assert.match(seitseman.syyt[0], /7\/10/);
});

test('tuomio: himmeät elementit eivät vaikuta, leipätekstin dh ei ole raja', () => {
  const himmea = laatikko('Piilotettu nappi', 0, 0, 80, 20, { opasiteetti: 0.2 });
  const t = tuomio(parita(nakyma([...PERUS, himmea]), nakyma(PERUS)));
  assert.equal(t.tila, 'SAMA');
  assert.deepEqual(t.syyt, []);
  const pitka = 'Leipäteksti '.repeat(15);
  const web = nakyma([...PERUS, laatikko(pitka, 20, 700, 350, 100)]);
  const rivittyy = nakyma([...PERUS, laatikko(pitka, 20, 704, 300, 180)]);
  assert.equal(tuomio(parita(web, rivittyy)).tila, 'SAMA');
  const alas = nakyma([...PERUS, laatikko(pitka, 20, 712, 350, 100)]);
  const r = tuomio(parita(web, alas));
  assert.equal(r.tila, 'ERI');
  assert.match(r.syyt[0], /dy \+12 px$/);
});

// ---------------------------------------------------------------- raportit

const RIVIT = [
  { rivi: 1, nimi: 'Aloitus', koko: '393×852', tila: 'SAMA', eroPx: 2.34, syyt: [], webKuva: 'web/01.png', natiiviKuva: 'natiivi/01.png' },
  { rivi: 2, nimi: 'Kartta | Eurooppa', koko: '834×1194', tila: 'ERI', eroPx: 14, syyt: ['"Liiku": dy +14 px', 'a', 'b', 'c', 'd'], webKuva: 'web/02.png', natiiviKuva: 'natiivi/02.png' },
  { rivi: 3, nimi: 'Lehti <b>', koko: '393×852', tila: 'PUUTTUU', eroPx: null, syyt: ['natiivin laatikkolista puuttuu tai on tyhjä'], webKuva: 'web/03.png', natiiviKuva: null },
];

test('markdownTaulu: otsikko, syitä enintään 3, putkimerkki suojattu', () => {
  const md = markdownTaulu(RIVIT);
  const rivit = md.trim().split('\n');
  assert.equal(rivit[0], '| # | Näkymä | Koko | Tulos | Ero | Syyt |');
  assert.equal(rivit.length, 2 + RIVIT.length);
  assert.equal(rivit[2], '| 1 | Aloitus | 393×852 | SAMA | 2.3 px | – |');
  assert.match(rivit[3], /Kartta \\\| Eurooppa/);
  assert.match(rivit[3], /"Liiku": dy \+14 px; a; b \(\+2\) \|$/);
  assert.match(rivit[4], /\| PUUTTUU \| – \|/);
});

test('kontaktiarkki: itsenäinen HTML, suodattimet, ei ulkoisia viittauksia', () => {
  const h = kontaktiarkki(RIVIT, 'Pariteettiajo 24.9.2026');
  assert.match(h, /^<!doctype html>/);
  assert.match(h, /<title>Pariteettiajo 24\.9\.2026<\/title>/);
  for (const t of ['SAMA', 'ERI', 'PUUTTUU']) {
    assert.ok(h.includes(`data-suodatin="${t}"`), `suodatin ${t} puuttuu`);
    assert.ok(h.includes(`data-tila="${t}"`), `rivi ${t} puuttuu`);
  }
  assert.match(h, /PUUTTUU \(1\)/);
  assert.match(h, /<script>/);
  assert.match(h, /prefers-color-scheme: dark/);
  assert.ok(h.includes('src="web/02.png"') && h.includes('src="natiivi/02.png"'));
  assert.ok(h.includes('ei kuvaa'), 'puuttuva natiivikuva näytetään paikkamerkkinä');
  assert.ok(h.includes('Lehti &lt;b&gt;'), 'nimet on suojattu');
  assert.ok(h.includes('<li>&quot;Liiku&quot;: dy +14 px</li>'));
  assert.doesNotMatch(h, /https?:/);
  assert.doesNotMatch(h, /<link|@import|src="\/\//);
});
