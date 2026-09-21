/*
 * GL-NIMIÖIDEN SOVITIN (js/pallolauta/glnimiot-sovitin.js): ladonnan
 * datumit → rungon instanssilista, CSS2D perääntymistienä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { glInstanssinTunnus, glNimenInstanssi, luoGlNimiosovitin } from '../js/pallolauta/glnimiot-sovitin.js';

const DATUMIT = [
  { avain: 'nimi:pariisi', laji: 'nimi', id: 'pariisi', teksti: 'Pariisi', lat: 48.9, lng: 2.3, dx: 25.1, dy: 5.6, ank: 'start', koko: 13.8 },
  { avain: 'nimi:marseille', laji: 'nimi', id: 'marseille', teksti: 'Marseille', lat: 43.3, lng: 5.4, dx: -8, dy: 0, ank: 'end', koko: 16 },
];

/** Rasterilähteen jäljitelmä: valmiit avaimet heti, muut kesken kunnes `valmistu`. */
function teeLahde(valmiit = new Set()) {
  const tilaajat = new Set();
  const sprite = (d) => ({
    osa: 'nimi', avain: `nimi|${d.teksti}`, valmis: valmiit.has(d.id),
    kuva: { w: 40, h: 12 }, w: 80, h: 24, ankkuriX: 4, ankkuriY: 12, skaala: 0.5, katto: null,
  });
  return {
    haeNimi: (d) => [sprite(d)],
    tilaaRasterit: (f) => { tilaajat.add(f); return () => tilaajat.delete(f); },
    kuorenKerroin: () => 1.25,
    tila: () => ({ valmiita: valmiit.size, kesken: 0, fontitValmiit: true }),
    pura: () => {},
    valmistu(id, avain) { valmiit.add(id); for (const f of tilaajat) f(avain); },
  };
}

/** Rungon jäljitelmä sovitun rajapinnan mukaan (asetaKaikki + atlas). */
function teeKerros({ tilaa = Infinity } = {}) {
  const atlas = new Map();
  const k = {
    lista: [], kerroin: null,
    asetaKaikki(l) { k.lista = l; return l.length; },
    atlas: {
      hae: (avain) => atlas.get(avain) ?? null,
      varaa(avain, kuva, w, h, ankkuriX, ankkuriY) {
        if (atlas.size >= tilaa) return null;
        const t = { u0: 0, v0: 0, u1: 1, v1: 1, w, h, ankkuriX, ankkuriY };
        atlas.set(avain, t);
        return t;
      },
    },
    kerroin: (arvo) => { k.kerroinArvo = arvo; },
  };
  return k;
}

test('valmis rasteri → instanssi rungolle, CSS2D:hen ei jää mitään', () => {
  const lahde = teeLahde(new Set(['pariisi', 'marseille']));
  const kerros = teeKerros();
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  const css2d = s.nimet(DATUMIT);
  assert.deepEqual(css2d, []);
  assert.equal(kerros.lista.length, 2);
  const p = kerros.lista[0];
  assert.equal(p.tunnus, 'nimi:pariisi');
  assert.equal(p.avain, 'nimi|Pariisi');
  assert.equal(p.dx, 25.1);
  assert.equal(p.dy, 5.6);
  assert.equal(p.skaala, 0.5);
  assert.equal(p.katto, null);
  assert.equal(p.opacity, 1);
  assert.ok(kerros.atlas.hae('nimi|Pariisi'), 'rasteri varattiin atlaksesta');
  assert.deepEqual([...s.rungolla()], ['nimi:pariisi', 'nimi:marseille']);
  assert.equal(s.tila().gl, 2);
});

test('kesken oleva rasteri jää CSS2D:hen ja siirtyy rungolle valmistuttuaan', () => {
  const lahde = teeLahde(new Set(['pariisi']));
  const kerros = teeKerros();
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  let kutsuja = 0;
  const jaaUudestaan = () => { kutsuja += 1; s.nimet(DATUMIT, jaaUudestaan); };
  const css2d = s.nimet(DATUMIT, jaaUudestaan);
  assert.deepEqual(css2d.map((d) => d.id), ['marseille']);
  assert.equal(kerros.lista.length, 1);
  lahde.valmistu('marseille', 'nimi|Marseille');
  assert.equal(kutsuja, 1, 'valmistuminen pyysi jaon uudestaan');
  assert.equal(kerros.lista.length, 2);
  assert.equal(s.tila().css2d, 0);
});

test('atlas täynnä → nimi jää CSS2D:hen', () => {
  const lahde = teeLahde(new Set(['pariisi', 'marseille']));
  const kerros = teeKerros({ tilaa: 1 });
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  const css2d = s.nimet(DATUMIT);
  assert.deepEqual(css2d.map((d) => d.id), ['marseille']);
  assert.equal(s.tila().tayntyi, 1);
});

test('ilman runkoa kaikki jää CSS2D:hen; kehys vie kuoren kertoimen rungolle', () => {
  const lahde = teeLahde(new Set(['pariisi', 'marseille']));
  let kerros = null;
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  assert.equal(s.nimet(DATUMIT).length, 2);
  kerros = teeKerros();
  s.kehys();
  assert.equal(kerros.kerroinArvo, 1.25);
  assert.equal(s.nimet(DATUMIT).length, 0);
});

test('vaiheen 1 runko (aseta/poista) kelpaa myös', () => {
  const lahde = teeLahde(new Set(['pariisi', 'marseille']));
  const asetetut = new Map();
  const kerros = {
    aseta: (id, rivi) => { asetetut.set(id, rivi); return true; },
    poista: (id) => asetetut.delete(id),
  };
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  s.nimet(DATUMIT);
  assert.deepEqual([...asetetut.keys()], ['nimi:pariisi', 'nimi:marseille']);
  assert.equal(asetetut.get('nimi:pariisi').rasteri.avain, 'nimi|Pariisi');
  s.nimet([DATUMIT[0]]);
  assert.deepEqual([...asetetut.keys()], ['nimi:pariisi']);
});

test('puhtaat apurit', () => {
  assert.equal(glInstanssinTunnus({ avain: 'nimi:x' }), 'nimi:x');
  assert.equal(glInstanssinTunnus({ laji: 'nosto', id: 'y' }), 'nosto:y');
  const i = glNimenInstanssi({ id: 'z', lat: 1, lng: 2, dx: '3', dy: null }, { avain: 'a', skaala: 0.5, katto: { a: 1, b: 2 } });
  assert.equal(i.dx, 3);
  assert.equal(i.dy, 0);
  assert.deepEqual(i.katto, { a: 1, b: 2 });
});

test('kytkentä: nimet.js jakaa sovittimen kautta ja lauta antaa sen; sw.js listaa moduulin', () => {
  const nimet = readFileSync(new URL('../js/pallolauta/nimet.js', import.meta.url), 'utf8');
  assert.match(nimet, /glSovitin \? glSovitin\.nimet\(nakyvatNimet, naytaNimet\) : nakyvatNimet/);
  assert.match(nimet, /jaaUudestaan: \(\) => naytaNimet\?\.\(\)/);
  const lauta = readFileSync(new URL('../js/pallolauta/lauta.js', import.meta.url), 'utf8');
  assert.match(lauta, /luoGlNimiosovitin\(\{\n\s*kotelo, kerros: \(\) => ui\.pallolautaGL\(\), ui, ruutupiste: /);
  assert.match(lauta, /ui\.glKerros = \(\) => \(glVirhe \? null : glKerros\);/);
  const uiLahde = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
  assert.match(uiLahde, /pallolautaGL\(\) \{\s*return typeof this\.glKerros === 'function'/);
  assert.match(lauta, /glSovitin\?\.kehys\(\);/);
  assert.match(lauta, /if \(!glTesti\) \{ nimet\.jaaUudestaan\?\.\(\); nostot\.jaaUudestaan\?\.\(\); peliUudestaan\(\); \}/);
  // Oletus päällä (omistaja 21.9.2026): vain ?glnimiot=0 pudottaa CSS2D:hen; runko kaatuessaan puretaan.
  assert.match(lauta, /catch \(virhe\) \{\s*glVirhe = virhe;/);
  const nostot = readFileSync(new URL('../js/pallolauta/nostot.js', import.meta.url), 'utf8');
  assert.match(nostot, /const naytaNostot = \(\) => merkit\.aseta\('nostot', glSovitin \? glSovitin\.nostot\(datumit, naytaNostot\) : datumit\);/);
  assert.equal((nostot.match(/naytaNostot\(\);/g) ?? []).length, 2, 'molemmat aseta-kohdat kulkevat sovittimen kautta');
  const sw = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
  assert.ok(sw.includes("'./js/pallolauta/glnimiot-sovitin.js'"));
  assert.ok(sw.includes("'./js/pallonimiot-gl.js'"));
});

test('GL on oletus; ?glnimiot=0 pudottaa CSS2D:hen, testi-tila kelpaa', async () => {
  const { glNimiotKaytossa } = await import('../js/pallonimiot-gl.js');
  const win = (search) => ({ location: { search } });
  assert.equal(glNimiotKaytossa(win('')), true);
  assert.equal(glNimiotKaytossa(win('?lauta=pallo')), true);
  assert.equal(glNimiotKaytossa(win('?glnimiot=1')), true);
  assert.equal(glNimiotKaytossa(win('?glnimiot=testi')), true);
  assert.equal(glNimiotKaytossa(win('?glnimiot=0')), false);
  assert.equal(glNimiotKaytossa(win('?lauta=pallo&glnimiot=off')), false);
});

/* ---- Nostot (vaihe 3) ---------------------------------------------- */
import { NOSTON_HAIVYTYS_MS, glNostoKelpaa, glNostonPeitto } from '../js/pallolauta/glnimiot-sovitin.js';

const NOSTO = (lisa = {}) => ({
  avain: 'nosto:lascaux', laji: 'nosto', id: 'lascaux', perhe: 'nosto', lat: 45.05, lng: 1.17,
  nimi: 'Lascaux', kategoria: 'historia', symLaji: 'luola', puoli: 'oikea', dx: 0, dy: 0,
  nimioNakyy: true, mitta: 0.6, mittaRaaka: 0.6, taso: 2, kuvamerkki: null, luonnos: false,
  ankkuri: false, viuhka: null, avattu: false, piiloListanAlla: false, piiloLiuskanAlla: false, lunastettu: false,
  ...lisa,
});

/** Nostolähde: ikoni + nimiö per datum, nimiön avain kyljen mukaan. */
function teeNostolahde() {
  const tilaajat = new Set();
  return {
    haeNimi: () => [],
    haeNosto: (d) => [
      { osa: 'ikoni', avain: `nosto|${d.kategoria}|ikoni`, valmis: true, kuva: {}, w: 40, h: 40, ankkuriX: 20, ankkuriY: 20, skaala: 0.02, katto: { a: 1, b: 1.5 } },
      { osa: 'nimio', avain: `nosto|${d.nimi}|${d.puoli}`, valmis: true, kuva: {}, w: 120, h: 30, ankkuriX: -4, ankkuriY: 15, skaala: 0.02, katto: { a: 1, b: 1.5 } },
    ],
    tilaaRasterit: (f) => { tilaajat.add(f); return () => tilaajat.delete(f); },
    kuorenKerroin: () => 1,
    tila: () => ({}),
    pura: () => {},
  };
}

test('nosto → ikoni ja nimiö rungolle sovittelun siirrolla ja katolla; muut lajit CSS2D:hen', () => {
  const kerros = teeKerros();
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: teeNostolahde(), ajasta: (f) => f() });
  const datumit = [
    NOSTO({ dx: 12, dy: -3 }),
    NOSTO({ avain: 'nosto:ankkuri', id: 'ankkuri', ankkuri: true }),
    NOSTO({ avain: 'nosto:luonnos', id: 'luonnos', luonnos: true }),
    NOSTO({ avain: 'piste:x', id: 'x', laji: 'piste', perhe: 'piste' }),
    NOSTO({ avain: 'aihe:y', id: 'y', laji: 'nosto', perhe: 'aihemerkki', viuhka: [{ nimi: 'a' }] }),
  ];
  const css2d = s.nostot(datumit);
  assert.deepEqual(css2d.map((d) => d.avain), ['nosto:ankkuri', 'nosto:luonnos', 'piste:x', 'aihe:y']);
  assert.deepEqual(kerros.lista.map((i) => i.tunnus), ['nosto:lascaux#ikoni', 'nosto:lascaux#nimio']);
  const [ikoni, nimio] = kerros.lista;
  assert.equal(ikoni.dx, 12); assert.equal(ikoni.dy, -3); assert.equal(nimio.dx, 12);
  assert.deepEqual(ikoni.katto, { a: 1, b: 1.5 });
  assert.equal(ikoni.skaala, 0.02);
  assert.equal(nimio.opacity, 1);
  assert.equal(s.tila().nostotGl, 1);
});

test('nimiön piilotus ja merkin piilotus ovat peittoja; lunastettu on haalea', () => {
  const kerros = teeKerros();
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: teeNostolahde(), ajasta: (f) => f() });
  s.nostot([NOSTO({ nimioNakyy: false })]);
  assert.equal(kerros.lista[0].opacity, 1);
  assert.equal(kerros.lista[1].opacity, 0);
  s.nostot([NOSTO({ piiloListanAlla: true })]);
  assert.deepEqual(kerros.lista.map((i) => i.opacity), [0, 0]);
  s.nostot([NOSTO({ lunastettu: true })]);
  assert.deepEqual(kerros.lista.map((i) => i.opacity), [0.55, 0.55]);
  assert.equal(glNostonPeitto(NOSTO({ piiloLiuskanAlla: true })), 0);
  assert.equal(glNostoKelpaa(NOSTO({ avattu: true })), false);
});

test('kylkivaihto on crossfade: vanha nimiö häipyy paikallaan, uusi tulee häivytyksellä, ikoni ei liiku', () => {
  const kerros = teeKerros();
  let hetki = 1000;
  const alkuperainen = globalThis.performance.now;
  globalThis.performance.now = () => hetki;
  try {
    const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: teeNostolahde(), ajasta: (f) => f() });
    s.nostot([NOSTO({ puoli: 'oikea', dx: 5 })]);
    s.nostot([NOSTO({ puoli: 'vasen', dx: -5 })]);
    const tunnukset = kerros.lista.map((i) => i.tunnus);
    assert.deepEqual(tunnukset, ['nosto:lascaux#ikoni', 'nosto:lascaux#nimio', 'nosto:lascaux#nimio-vanha']);
    const uusi = kerros.lista[1];
    const vanha = kerros.lista[2];
    assert.equal(uusi.avain, 'nosto|Lascaux|vasen');
    assert.equal(uusi.opacity, 0, 'uusi alkaa näkymättömänä');
    assert.equal(vanha.avain, 'nosto|Lascaux|oikea');
    assert.equal(vanha.dx, 5, 'vanha jää vanhaan siirtoon');
    assert.equal(vanha.opacity, 1);
    assert.equal(kerros.lista[0].dx, -5, 'ikoni seuraa sovittelun uutta siirtoa');
    // Puolivälissä: peitot ajan mukaan.
    const peitot = {};
    kerros.peitto = (t, v) => { peitot[t] = v; };
    hetki += NOSTON_HAIVYTYS_MS / 2;
    s.kehys();
    assert.ok(Math.abs(peitot['nosto:lascaux#nimio'] - 0.5) < 1e-9);
    assert.ok(Math.abs(peitot['nosto:lascaux#nimio-vanha'] - 0.5) < 1e-9);
    assert.equal(s.haivytykset().size, 2);
    // Lopussa vanha poistuu listalta, uusi on täysin näkyvissä.
    hetki += NOSTON_HAIVYTYS_MS;
    s.kehys();
    assert.equal(s.haivytykset().size, 0);
    assert.deepEqual(kerros.lista.map((i) => i.tunnus), ['nosto:lascaux#ikoni', 'nosto:lascaux#nimio']);
    assert.equal(peitot['nosto:lascaux#nimio'], 1);
  } finally {
    globalThis.performance.now = alkuperainen;
  }
});

test('nimet ja nostot ovat yksi lista rungolle: kumpikin jako säilyttää toisen', () => {
  const kerros = teeKerros();
  const nostolahde = teeNostolahde();
  const nimilahde = teeLahde(new Set(['pariisi', 'marseille']));
  const lahde = { ...nostolahde, haeNimi: nimilahde.haeNimi };
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  s.nimet(DATUMIT);
  s.nostot([NOSTO()]);
  assert.equal(kerros.lista.length, 4);
  s.nimet([DATUMIT[0]]);
  assert.deepEqual(kerros.lista.map((i) => i.tunnus), ['nimi:pariisi', 'nosto:lascaux#ikoni', 'nosto:lascaux#nimio']);
});

/* ---- Pelin merkit (vaihe 4) ---------------------------------------- */
import { glNappulanLaatikko } from '../js/pallolauta/glnimiot-sovitin.js';

test('nappula rungolle kiinteällä koolla, kohteet CSS2D:hen; laatikko jalasta ylös', () => {
  const kerros = teeKerros();
  const lahde = {
    ...teeNostolahde(),
    haeNappula: () => [{ osa: 'nappula', avain: 'nappula|#c9a227|1|2', valmis: true, kuva: {}, w: 64, h: 72, ankkuriX: 32, ankkuriY: 72, skaala: 0.5, katto: { a: 1e6, b: 1 } }],
  };
  const s = luoGlNimiosovitin({
    kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f(),
    ruutupiste: (lat, lng) => ({ x: 100 + lat, y: 200 + lng }),
  });
  const datumit = [
    { avain: 'kohde:x', laji: 'kohde', key: 'x', lat: 1, lng: 2 },
    { avain: 'nappula', laji: 'nappula', lat: 10, lng: 20 },
  ];
  const css2d = s.peli(datumit);
  assert.deepEqual(css2d.map((d) => d.avain), ['kohde:x']);
  assert.deepEqual(kerros.lista.map((i) => i.tunnus), ['nappula']);
  assert.deepEqual(kerros.lista[0].katto, { a: 1e6, b: 1 });
  assert.equal(kerros.lista[0].dx, 0);
  assert.deepEqual(s.pelinLaatikot(), [{ x0: 94, y0: 184, x1: 126, y1: 220 }]);
  // Ilman nappulaa ei laatikkoa; pelkkä ruutupiste null → ei laatikkoa.
  s.peli([datumit[0]]);
  assert.deepEqual(s.pelinLaatikot(), []);
  assert.equal(glNappulanLaatikko(null), null);
});

test('kytkentä: merkit.js jakaa osan sovittimelle ja lauta sitoo pelin jaon ja esteet', () => {
  const merkit = readFileSync(new URL('../js/pallolauta/merkit.js', import.meta.url), 'utf8');
  assert.match(merkit, /const uudet = typeof jakaja === 'function' \? \(jakaja\(osa, annetut\) \?\? annetut\) : annetut;/);
  const lauta = readFileSync(new URL('../js/pallolauta/lauta.js', import.meta.url), 'utf8');
  assert.match(lauta, /jakaja: \(osa, lista\) => \(osa === 'peli' && pelinJako \? pelinJako\(lista\) : lista\)/);
  assert.match(lauta, /pelinJako = \(lista\) => glSovitin\.peli\(lista, peliUudestaan\)/);
  assert.match(lauta, /const pelinLaatikot = \[\.\.\.merkit\.laatikot\('peli'\), \.\.\.\(glSovitin\?\.pelinLaatikot\(\) \?\? \[\]\)\];/);
});

/*
 * PORTAAN VAIHTO ILMAN VÄLITILAA (Karttaseppä 21.9.2026 ilta, omistajan
 * "MARSEILLE välkkyy zoomatessa"): nimi, joka on jo rungolla, pysyy
 * rungolla vanhalla rasterilla uuden koon rasterin valmistumiseen asti.
 */
function teePorraslahde() {
  const tilaajat = new Set();
  const valmiit = new Set();
  const avain = (d) => `nimi|${d.teksti}|${d.koko}`;
  return {
    haeNimi: (d) => [{
      osa: 'nimi', avain: avain(d), valmis: valmiit.has(avain(d)),
      kuva: {}, w: 80, h: 24, ankkuriX: 4, ankkuriY: 12, skaala: 0.5, katto: null,
    }],
    tilaaRasterit: (f) => { tilaajat.add(f); return () => tilaajat.delete(f); },
    kuorenKerroin: () => 1,
    tila: () => ({ valmiita: valmiit.size, kesken: 0, fontitValmiit: true }),
    pura: () => {},
    valmistu(a) { valmiit.add(a); for (const f of tilaajat) f(a); },
  };
}

test('portaan vaihto: nimi pysyy rungolla vanhalla rasterilla uuden kokoon skaalattuna, kunnes uusi on valmis', () => {
  const lahde = teePorraslahde();
  const kerros = teeKerros();
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  const pieni = [{ avain: 'nimi:marseille', laji: 'nimi', id: 'marseille', teksti: 'Marseille', lat: 43.3, lng: 5.4, dx: -8, dy: 0, ank: 'end', koko: 14 }];
  lahde.valmistu('nimi|Marseille|14');
  assert.deepEqual(s.nimet(pieni), [], 'porras 14 valmis → GL');
  assert.equal(kerros.lista[0].avain, 'nimi|Marseille|14');
  // Zoomi vaihtaa portaan: koko 16, rasteri kesken.
  const iso = [{ ...pieni[0], koko: 16 }];
  let uudestaan = 0;
  const css2d = s.nimet(iso, () => { uudestaan += 1; s.nimet(iso); });
  assert.deepEqual(css2d, [], 'EI CSS2D-välitilaa: nimi pysyy rungolla');
  assert.equal(kerros.lista.length, 1);
  assert.equal(kerros.lista[0].avain, 'nimi|Marseille|14', 'vanha rasteri');
  assert.equal(Number(kerros.lista[0].skaala.toFixed(4)), Number((0.5 * 16 / 14).toFixed(4)), 'skaalattu uuteen kokoon');
  assert.equal(s.tila().css2d, 0);
  // Uusi rasteri valmistuu → vaihto uuteen avaimeen, skaala rasterin oma.
  lahde.valmistu('nimi|Marseille|16');
  assert.equal(uudestaan, 1);
  assert.equal(kerros.lista[0].avain, 'nimi|Marseille|16');
  assert.equal(kerros.lista[0].skaala, 0.5);
  // Nimi, jota ei ole koskaan ollut rungolla, jää yhä CSS2D:hen kunnes rasteri valmis.
  const uusi = [{ avain: 'nimi:lyon', laji: 'nimi', id: 'lyon', teksti: 'Lyon', lat: 45.7, lng: 4.8, dx: 0, dy: 0, ank: 'start', koko: 16 }];
  assert.deepEqual(s.nimet([...iso, ...uusi]).map((d) => d.id), ['lyon']);
  // Nimi poistuu näkyvistä → muisti unohtaa sen (ei kasva).
  s.nimet(uusi);
  assert.deepEqual(s.nimet(iso.map((d) => ({ ...d, koko: 18 }))).map((d) => d.id), ['marseille'], 'unohdettu → CSS2D kuten uusi');
});

test('portaan vaihto nostolla: ikoni ja nimiö pysyvät rungolla vanhalla rasterilla, kunnes uusi porras on valmis', () => {
  const tilaajat = new Set();
  let porras = 24;
  const valmiit = new Set(['ikoni|24', 'nimio|24']);
  const lahde = {
    haeNimi: () => [],
    haeNosto: (d) => [
      { osa: 'ikoni', avain: `ikoni|${porras}`, valmis: valmiit.has(`ikoni|${porras}`), kuva: {}, w: 40, h: 40, ankkuriX: 20, ankkuriY: 20, skaala: d.mitta / porras, katto: { a: 1, b: 1.5 }, porras },
      { osa: 'nimio', avain: `nimio|${porras}`, valmis: valmiit.has(`nimio|${porras}`), kuva: {}, w: 120, h: 30, ankkuriX: -4, ankkuriY: 15, skaala: d.mitta / porras, katto: { a: 1, b: 1.5 }, porras },
    ],
    tilaaRasterit: (f) => { tilaajat.add(f); return () => tilaajat.delete(f); },
    kuorenKerroin: () => 1, tila: () => ({}), pura: () => {},
  };
  const kerros = teeKerros();
  const s = luoGlNimiosovitin({ kerros: () => kerros, rasterilahde: lahde, ajasta: (f) => f() });
  assert.deepEqual(s.nostot([NOSTO()]), []);
  assert.deepEqual(kerros.lista.map((i) => i.avain), ['ikoni|24', 'nimio|24']);
  porras = 32; // uusi porras, rasterit kesken
  assert.deepEqual(s.nostot([NOSTO({ mitta: 0.8 })]), [], 'ei CSS2D-välitilaa');
  assert.deepEqual(kerros.lista.map((i) => i.avain), ['ikoni|24', 'nimio|24'], 'vanhat rasterit');
  // Skaala on CSS-px per rasterin pikseli: uuden datumin mitta / VANHAN rasterin porras (24),
  // koska kuva on yhä porras-24-rasteri — muuten koko hyppäisi 24/32-suhteessa.
  assert.equal(Number(kerros.lista[0].skaala.toFixed(4)), Number((0.8 / 24).toFixed(4)), 'skaala uuden datumin mitasta ja vanhan rasterin portaasta');
  assert.equal(kerros.lista[0].porras, 24, 'porras on vanhan rasterin');
  valmiit.add('ikoni|32'); valmiit.add('nimio|32');
  s.nostot([NOSTO({ mitta: 0.8 })]);
  assert.deepEqual(kerros.lista.filter((i) => !i.tunnus.endsWith('-vanha')).map((i) => i.avain), ['ikoni|32', 'nimio|32']);
});
