// Kultaiset testit natiiville värivirtojen laskennalle
// (Assets/Matkakirja/Linssit/Ydin/Virrat/).
//
// Ajaa verkkopelin oikean laskentamoduulin (js/aikajana-virrat-laskenta.js)
// Ihmisen matka -linssin aineistolla (js/linssit/ihmisen-matka.js
// LINSSI.aikajana.virrat) ja kirjoittaa kaksi tiedostoa:
//
//   virrat-aineisto.json   virtalohko sellaisenaan (virrat, retki, vanha,
//                          peitto, maamaski, vanat, pysakit) — sama muoto
//                          kuin sisältöpaketin LINSSI.aikajana.virrat
//   virrat-kultaiset.json  tulokset: kokonaiset kentät FNV-1a-tiivisteinä
//                          (tavutarkka vertailu) ja otosruudut arvoina
//
// C#-testit (Linssit-testit/Testit/Virrat*.cs) lukevat molemmat ja vaativat
// samat tulokset: kokonaisluvut ja maskit tarkalleen, liukuluvut
// tiivisteen verran tarkalleen (Float32-kentät) tai suhteellisella
// toleranssilla 1e-9 (trigonometria, jossa V8 ja .NET voivat erota ulpin).
//
// Käyttö: node Linssit-testit/kultaiset/tee-kultaiset.mjs [verkkopelin juuri]
// Oletusjuuri: /Users/Shared/Claude/Matkakirja-linssiseppa
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TAMA = path.dirname(fileURLToPath(import.meta.url));
const JUURI = path.resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-linssiseppa');
const tuo = (nimi) => import(pathToFileURL(path.join(JUURI, nimi)).href);

const L = await tuo('js/aikajana-virrat-laskenta.js');
const { LINSSI } = await tuo('js/linssit/ihmisen-matka.js');
const aineisto = LINSSI.aikajana.virrat;
if (!aineisto?.virrat?.length || !aineisto.maamaski) throw new Error('LINSSI.aikajana.virrat puuttuu');

const W = aineisto.maamaski.leveys;
const H = aineisto.maamaski.korkeus;
const KOKO = W * H;

/* ------------------------------------------------------------ apurit */

/** FNV-1a 32 typed arrayn tavuista (little-endian, sama kuin C#). */
function fnv(taulu) {
  const b = new Uint8Array(taulu.buffer, taulu.byteOffset, taulu.byteLength);
  let h = 0x811c9dc5;
  for (let i = 0; i < b.length; i += 1) {
    h ^= b[i];
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

/** Deterministinen LCG otoksille (ei tarvitse toistaa C#:ssa: otos tallennetaan). */
let lcg = 20260923;
const satu = () => {
  lcg = (Math.imul(lcg, 1664525) + 1013904223) >>> 0;
  return lcg / 4294967296;
};
const valille = (a, b) => a + (b - a) * satu();

const otoksi = (taulu, indeksit) => indeksit.map((i) => taulu[i]);
const nollaton = (taulu) => { let n = 0; for (let i = 0; i < taulu.length; i += 1) if (taulu[i]) n += 1; return n; };

/* ------------------------------------------------------------- maski */

const maa = L.puraMaamaski(aineisto.maamaski.juoksut, KOKO);
const peitto = L.puraPeitto(aineisto.maamaski.peitot, KOKO);
const rannikko = L.rannikkoMaski(maa, W, H);
const komp = L.maaKomponentit(maa, W, H);

const maski = {
  maaruutuja: nollaton(maa),
  maa: fnv(maa),
  rannikkoruutuja: nollaton(rannikko),
  rannikko: fnv(rannikko),
  peitto: fnv(peitto),
  komponentteja: komp.koot.length,
  koot: komp.koot,
  tunnus: fnv(komp.tunnus),
  pakkausPalautuu: L.pakkaaMaamaski(maa) === aineisto.maamaski.juoksut,
  peittoPalautuu: L.pakkaaPeitto(peitto) === aineisto.maamaski.peitot,
  // Pieni pakkaus käsin: tarkistaa varintin ja base64-täytteen reunat.
  pieni: (() => {
    const m = new Uint8Array(300);
    for (let i = 0; i < m.length; i += 1) m[i] = (i % 7 === 0 || (i > 40 && i < 200)) ? 1 : 0;
    return { maski: Array.from(m), pakattu: L.pakkaaMaamaski(m) };
  })(),
};

/* ------------------------------------------------------------- otos */

const otos = [];
for (let k = 0; k < 1000; k += 1) otos.push(Math.floor(satu() * KOKO));
const maaIndeksit = [];
for (let i = 0; i < KOKO; i += 1) if (maa[i]) maaIndeksit.push(i);
for (let k = 0; k < 1000; k += 1) otos.push(maaIndeksit[Math.floor(satu() * maaIndeksit.length)]);

/* ------------------------------------------------------- perusfunktiot */

const perus = {};
perus.ruutu = [];
for (const [lat, lon] of [[90, -180], [-90, 180], [0, 0], [89.99, 179.99], [-89.99, -179.99], [45.25, 540.5], [12, -721]]) {
  perus.ruutu.push([lat, lon, L.ruutu(lat, lon, W, H)]);
}
for (let k = 0; k < 300; k += 1) {
  const lat = valille(-95, 95);
  const lon = valille(-500, 500);
  perus.ruutu.push([lat, lon, L.ruutu(lat, lon, W, H)]);
}
perus.keskus = otos.slice(0, 200).map((i) => { const p = L.ruudunKeskus(i, W); return [i, p.lat, p.lon]; });
perus.kierraLon = [-900, -540, -180, -179.5, 0, 179.999, 180, 360, 725.25].map((l) => [l, L.kierraLon(l)]);

perus.kohina = [];
for (let k = 0; k < 2000; k += 1) {
  const lat = valille(-90, 90);
  const lon = valille(-180, 180);
  const siemen = [1, 2, 12, 13, 24, 25, 42, 17][k % 8];
  const hila = [4, 3, 2][k % 3];
  perus.kohina.push([lat, lon, siemen, hila, L.kohina(lat, lon, siemen, hila)]);
}

// Laatikot: aineiston omat (alue, pois, portit, vanha) + antimeridiaanin ylitys ja ilman lon-rajaa.
const laatikot = [];
for (const v of [...aineisto.virrat, aineisto.retki]) {
  for (const l of v.alue ?? []) laatikot.push(l);
  for (const l of v.pois ?? []) laatikot.push(l);
  for (const p of v.portit ?? []) for (const l of p.alue) laatikot.push(l);
}
for (const l of aineisto.vanha.alue) laatikot.push(l);
laatikot.push({ lat: [10, 20] }, { lon: [170, -170] }, { lat: [-5, 5], lon: [-180, 180] });
perus.laatikot = laatikot;
perus.laatikossa = [];
perus.syvyys = [];
for (let k = 0; k < 3000; k += 1) {
  const n = k % laatikot.length;
  const l = laatikot[n];
  // Pisteet laatikon lähelle, jotta raja osuu otokseen.
  const [e, p] = l.lat ?? [-90, 90];
  const lat = Math.max(-90, Math.min(90, valille(e - 4, p + 4)));
  const [w0, i0] = l.lon ?? [-180, 180];
  let lev = i0 - w0; while (lev < 0) lev += 360;
  const lon = L.kierraLon(w0 + valille(-5, lev + 5));
  const reuna = [0, 1.5, 3][k % 3];
  const siemen = 1 + (k % 5) * 11;
  perus.laatikossa.push([lat, lon, n, reuna, siemen, L.laatikossa(lat, lon, l, reuna, siemen)]);
  perus.syvyys.push([lat, lon, n, reuna, siemen, L.laatikonSyvyys(lat, lon, l, reuna, siemen)]);
}
perus.laatikoidenSyvyys = [];
for (let k = 0; k < 500; k += 1) {
  const lat = valille(-90, 90);
  const lon = valille(-180, 180);
  perus.laatikoidenSyvyys.push([lat, lon, L.laatikoidenSyvyys(lat, lon, aineisto.virrat[0].pois, 1.5, 3)]);
}
perus.portinLuisu = [];
aineisto.virrat.forEach((v, nv) => (v.portit ?? []).forEach((p, np) => {
  const l = L.portinLuisu(p);
  perus.portinLuisu.push([nv, np, l ? l.leveys : null, l ? l.vuodet : null]);
}));
perus.portinLuisu.push([-1, -1, L.portinLuisu({ avautuu: 1000, luisu: null }), null]);

perus.laatikkoMaski = [];
aineisto.virrat.forEach((v, nv) => {
  for (const [nimi, lista] of [['alue', v.alue], ['pois', v.pois]]) {
    if (!lista?.length) continue;
    for (const [reuna, kayta] of [[1.5, true], [0, false], [3, true]]) {
      const m = L.laatikkoMaski(lista, { reuna, siemen: 1 + nv, leveys: W, korkeus: H, maa: kayta ? maa : null });
      perus.laatikkoMaski.push({ virta: nv, lista: nimi, reuna, siemen: 1 + nv, maa: kayta, ruutuja: nollaton(m), tiiviste: fnv(m) });
    }
  }
});
{
  const m = L.laatikkoPehmea(aineisto.vanha.alue, { reuna: 3, siemen: 42, pehmeys: 2, leveys: W, korkeus: H, maa });
  perus.laatikkoPehmea = { tiiviste: fnv(m), otos: otoksi(m, otos) };
  const m2 = L.laatikkoPehmea(aineisto.virrat[0].pois, { reuna: 1.5, siemen: 5, pehmeys: 1, leveys: W, korkeus: H });
  perus.laatikkoPehmeaIlmanMaata = { tiiviste: fnv(m2), otos: otoksi(m2, otos) };
}

perus.nopeus = [];
for (const v of [300001, 300000, 200000, 90000, 89999.5, 50000, 10, 0, -5]) {
  perus.nopeus.push([v, L.nopeusHetkella(aineisto.virrat[0].nopeus, v), L.nopeusHetkella(1.2, v)]);
}

perus.lahinMaa = [];
for (let k = 0; k < 600; k += 1) {
  const lat = valille(-60, 80);
  const lon = valille(-180, 180);
  const sade = [3, 4, 1, 0][k % 4];
  perus.lahinMaa.push([lat, lon, sade, L.lahinMaa(maa, lat, lon, sade, W, H)]);
}

perus.hypot = [];
for (let k = 0; k < 1000; k += 1) {
  const a = valille(-500, 500) * (k % 3 ? 1 : 1e-3);
  const b = k % 7 === 0 ? 0 : valille(-80, 80);
  const c = valille(-1, 1);
  perus.hypot.push([a, b, c, Math.hypot(a, b), Math.hypot(a, b, c)]);
}
perus.trig = [];
for (let r = 0; r < H; r += 1) {
  const lat = (90 - (r + 0.5) * L.RUUDUN_ASTE) * Math.PI / 180;
  perus.trig.push([lat, Math.cos(lat), Math.sin(lat)]);
}
for (let c = 0; c < W; c += 1) {
  const lon = (-180 + (c + 0.5) * L.RUUDUN_ASTE) * Math.PI / 180;
  perus.trig.push([lon, Math.cos(lon), Math.sin(lon)]);
}
perus.ylitys = [];
for (const [a, ikkuna, kesto] of [[20000, [17000, 11000], 300], [16000, [17000, 11000], 300], [9000, [17000, 11000], 300], [0, [17000, 11000], 300], [12000, [17000, 11000], undefined]]) {
  perus.ylitys.push([a, ikkuna, kesto ?? null, L.ylityksenSaapuminen(a, ikkuna, kesto)]);
}

/* ------------------------------------------------------------ virrat */

const alku = performance.now();
const cpuAlku = process.cpuUsage();
const kestot = {};
let kentat = null;
let edellinen = alku;
for (const vaihe of L.laskeKentatVaiheittain(
  { virrat: aineisto.virrat, retki: aineisto.retki, vanha: aineisto.vanha },
  { maa, leveys: W, korkeus: H },
)) {
  const nyt = performance.now();
  kestot[vaihe.vaihe] = Math.round(nyt - edellinen);
  edellinen = nyt;
  if (vaihe.kentat) kentat = vaihe.kentat;
}
kestot.yhteensa = Math.round(performance.now() - alku);
// CPU-aika (käyttäjä + järjestelmä) on vertailukelpoinen kuormitetullakin koneella.
const cpu = process.cpuUsage(cpuAlku);
kestot.cpuYhteensa = Math.round((cpu.user + cpu.system) / 1000);

// laskeKentat ei palauta virtojen meri-kenttiä erikseen: lasketaan ne
// samalla laskeVirta-kutsulla kuin laskeKentatVaiheittain (sama syöte).
const virrat = [];
const kenttaMap = new Map();
for (const virta of aineisto.virrat) {
  const lahteet = [...(virta.lahteet ?? [])];
  for (const l of virta.lahteetToisesta ?? []) {
    const toinen = kenttaMap.get(l.virta);
    const i = toinen ? L.lahinMaa(maa, l.lue.lat, l.lue.lon, 4, W, H) : -1;
    const aika = i >= 0 ? L.ylityksenSaapuminen(toinen.aika[i], l.ikkuna, l.kesto) : 0;
    if (aika > 0) lahteet.push({ nimi: l.nimi, lat: l.lat, lon: l.lon, aika });
  }
  const t = L.laskeVirta({ ...virta, lahteet }, { maa, rannikko, leveys: W, korkeus: H, siemen: 1 });
  kenttaMap.set(virta.tunnus, t);
  virrat.push({ tunnus: virta.tunnus, ...t });
}
const retki = L.laskeVirta(aineisto.retki, { maa, rannikko, leveys: W, korkeus: H, siemen: 1 });
virrat.push({ tunnus: 'retki', ...retki });
// Varmistus: erillinen ajo = laskeKentat-ajo.
kentat.edeltajat.forEach((e, n) => {
  if (fnv(e.aika) !== fnv(virrat[n].aika) || fnv(e.edeltaja) !== fnv(virrat[n].edeltaja)) throw new Error('erillinen ajo poikkeaa: ' + e.tunnus);
});

const kentta = (t) => ({
  tunnus: t.tunnus,
  saavutettu: nollaton(t.aika),
  tiiviste: { aika: fnv(t.aika), meri: fnv(t.meri), edeltaja: fnv(t.edeltaja), nauhaPiste: fnv(t.nauhaPiste), nauhaNro: fnv(t.nauhaNro) },
  otos: {
    aika: otoksi(t.aika, otos),
    meri: otoksi(t.meri, otos),
    edeltaja: otoksi(t.edeltaja, otos),
    nauhaPiste: otoksi(t.nauhaPiste, otos),
    nauhaNro: otoksi(t.nauhaNro, otos),
  },
});

// Pieni synteettinen virta: lähde, nauha, ylitys ja portti ilman luisua
// (reunatapaukset, joita aineisto ei kata: luisu: null, hajonta, meriSade).
const koeVirta = {
  tunnus: 'koe',
  nopeus: [[60000, 1.5], [20000, 0.5]],
  sisamaa: 0.4,
  reuna: 0,
  alue: [{ lat: [-40, 40], lon: [-20, 60] }],
  lahteet: [{ lat: 0, lon: 20, aika: 60000 }, { lat: 5, lon: 30 }],
  portit: [
    { alue: [{ lat: [20, 40], lon: [0, 40] }], avautuu: 30000, luisu: null, hajonta: 0.1 },
    { alue: [{ lat: [-40, -20] }], avautuu: 25000, reuna: 2 },
  ],
  ylitykset: [{ a: { lat: 12, lon: 43 }, b: { lat: 13, lon: 44 }, ikkuna: [50000, 1000], kesto: 100 }],
  nauhat: [{ sade: 150, meriSade: 40, pisteet: [[-5, 10, 58000], [-10, 5, 57000], [-20, 12, 56000]] }],
};
const koe = { tunnus: 'koe', ...L.laskeVirta(koeVirta, { maa, rannikko, leveys: W, korkeus: H, siemen: 7 }) };

const yhd = kentat;
const tulokset = {
  virrat: virrat.map(kentta),
  koeVirta,
  koe: kentta(koe),
  siirtymat: kentat.siirtymat,
  yhdiste: {
    tiiviste: { aika: fnv(yhd.aika), virta: fnv(yhd.virta), meri: fnv(yhd.meri), meriVirta: fnv(yhd.meriVirta) },
    otos: { aika: otoksi(yhd.aika, otos), virta: otoksi(yhd.virta, otos), meri: otoksi(yhd.meri, otos), meriVirta: otoksi(yhd.meriVirta, otos) },
  },
  retki: fnv(kentat.retki),
  vanha: { tiiviste: fnv(kentat.vanha), otos: otoksi(kentat.vanha, otos) },
  rannikko: fnv(kentat.rannikko),
};

/* -------------------------------------------------------- tila ja väri */

const tila = [];
for (const aika of [0, -1, 500, 5000, 15000, 45000, 70000, 150000, 300000]) {
  for (const nyt of [0, 100, 1000, 4999, 5000, 5400, 14000, 45000, 69000, 80000, 200000]) {
    for (const askelittain of [false, true]) {
      const t = L.ruudunTila(aika, nyt, { askelittain });
      tila.push([aika, nyt, askelittain, t.w, t.peitto]);
    }
  }
}
const rintama = [0, 1000, 6000, 6001, 50000, 300000].map((n) => [n, L.rintamanLeveys(n)]);
const heksa = ['#3AAFA5', '#000000', '#ffffff', 'D9731E'].map((h) => [h, L.heksaRGB(h)]);
const varit = [];
for (const [n, v] of [...aineisto.virrat, aineisto.retki].entries()) {
  for (const aika of [0, -5, 20000, 17000, 16000, 14000, 12500, 11000, 5000]) {
    const t = L.virranVari(v.vari, aika);
    varit.push([n, aika, t.vanha, t.rintama]);
  }
}

const painopisteet = [];
for (const nyt of [250000, 150000, 80000, 65000, 50000, 45000, 30000, 16000, 14000, 12000, 5000, 3000, 1000, 500]) {
  for (const ohita of [null, [0], [1, 3]]) {
    painopisteet.push({
      nyt,
      ohita,
      tulos: L.rintamienPainopisteet(kentat, nyt, { leveys: W, korkeus: H, ohita: ohita ? new Set(ohita) : null }),
    });
  }
}
const kamera = [0, 1, 6.2, 20, 33.8, 40, 90, 180].map((h) => [h, L.kameranLeveysAsteina(h)]);

/* --------------------------------------------------------- tarkennus */

const tarkka = L.tarkennaKentat(kentat, { maa, peitto, leveys: W, korkeus: H, kerroin: 2 });
const tarkkaOtos = [];
for (let k = 0; k < 1500; k += 1) tarkkaOtos.push(Math.floor(satu() * tarkka.indeksi.length));
const tarkkaKentat = ['indeksi', 'aika', 'paino', 'virta', 'virta2', 'sekoitus', 'meri', 'meriPaino', 'meriVirta', 'retki', 'retkiPaino', 'vanha'];
const tarkennus = {
  leveys: tarkka.leveys,
  korkeus: tarkka.korkeus,
  koko: tarkka.koko,
  n: tarkka.indeksi.length,
  tiiviste: Object.fromEntries(tarkkaKentat.map((k) => [k, fnv(tarkka[k])])),
  otosKohdat: tarkkaOtos,
  otos: Object.fromEntries(tarkkaKentat.map((k) => [k, otoksi(tarkka[k], tarkkaOtos)])),
};
// Ilman peittoa ja kertoimella 1 (reunatapaus: osuus maamaskista).
const tarkka1 = L.tarkennaKentat({ ...kentat, retki: null, vanha: null }, { maa, leveys: W, korkeus: H, kerroin: 1 });
tarkennus.kerroin1 = {
  n: tarkka1.indeksi.length,
  tiiviste: Object.fromEntries(['indeksi', 'aika', 'paino', 'virta', 'virta2', 'sekoitus', 'meri', 'meriPaino', 'meriVirta'].map((k) => [k, fnv(tarkka1[k])])),
};

/* ------------------------------------------------------------- vanat */

const vanat = L.johdaVanat(kentat, aineisto.vanat, { maa, leveys: W, korkeus: H, pysakit: aineisto.pysakit });
const vanaKm = [];
for (let k = 0; k < 300; k += 1) {
  const a = { lat: valille(-80, 80), lon: valille(-180, 180) };
  const b = { lat: valille(-80, 80), lon: valille(-180, 180) };
  vanaKm.push([a.lat, a.lon, b.lat, b.lon, L.vanaKm(a, b)]);
}
const pituudet = vanat.vanat.map((v) => L.vananPituusKm(v.pisteet.map(([lat, lon]) => ({ lat, lon }))));

/* ------------------------------------------------------------ kirjoitus */

const git = (...a) => { try { return execFileSync('git', ['-C', JUURI, ...a], { encoding: 'utf8' }).trim(); } catch { return null; } };
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(path.join(JUURI, f))).digest('hex');
const lahde = {
  juuri: JUURI,
  commit: git('rev-parse', 'HEAD'),
  laskenta: sha('js/aikajana-virrat-laskenta.js'),
  aineisto: sha('js/linssit/ihmisen-matka-virrat.js'),
  maamaski: sha('js/linssit/ihmisen-matka-maamaski.js'),
  node: process.version,
  kestotMs: kestot,
};

const ulos = { lahde, otos, maski, perus, ...tulokset, tila, rintama, heksa, varit, painopisteet, kamera, tarkennus, vanat, vanaKm, pituudet };
fs.writeFileSync(path.join(TAMA, 'virrat-aineisto.json'), JSON.stringify(aineisto) + '\n');
fs.writeFileSync(path.join(TAMA, 'virrat-kultaiset.json'), JSON.stringify(ulos) + '\n');
const koko = (f) => (fs.statSync(path.join(TAMA, f)).size / 1024).toFixed(0);
console.log(`virrat-aineisto.json ${koko('virrat-aineisto.json')} kt, virrat-kultaiset.json ${koko('virrat-kultaiset.json')} kt`);
console.log('JS-laskennan kestot (ms):', JSON.stringify(kestot));
console.log(`vanoja ${vanat.vanat.length}, tarkennettuja pikseleitä ${tarkka.indeksi.length}`);
