// KULTAINEN LINSSIJÄLKI: verkkopelin js/passport.js (passin leimat) ja
// js/linssit/omistus.js (linssien omistus ja hankinta) sekä niitä kutsuvat
// js/game.js-kohdat (awardXp → tarkistaLinssikynnys, linssiAarteenKylkiaisena)
// ajetaan oikeina moduuleina Node-ympäristössä, ja jokaisen teon tulos ja
// sen jälkeinen tila kirjataan tiedostoon Kultaiset/linssijalki.json.
// C#-portti (Peli/Passi.cs, Peli/Linssiomistus.cs) toistaa saman
// käsikirjoituksen testissä Testit/LinssiomistusTestit.cs ja vaatii
// identtisen jäljen.
//
// Käyttö: node Kultaiset/tee-linssijalki.mjs [verkkopelin js-kansio]
//
// YMPÄRISTÖ: localStorage-korvike (Map) ja kiinteä päivä (Date ilman
// argumentteja = KIINTEA_PAIVA), jotta leimojen päiväys on toistettava.
// Linssimoduulit tuodaan kerran etukäteen: omistus.js leimaa valmiin linssin
// passiin vasta moduulin tuonnin jälkeen (async leimaaPassiin, nimi
// moduulin LINSSI.nimi), ja välimuistista tuonti ratkeaa ennen seuraavaa
// makrotehtävää. Jokaisen teon jälkeen odotetaan kaksi makrotehtävää.
//
// KOEREKISTERI: tuotannon rekisterissä (js/linssit/rekisteri.js) ei ole yhtään
// hiomassa-riviä, joten skripti lisää LINSSIT-taulukkoon kaksi (mannerlinssi
// yokartta ja kynnyslinssi tahdet). Molemmat rekisterit kirjataan jälkeen:
// C#-testi tarkistaa, että natiivin oletusrekisteri on tuotannon rekisteri,
// ja ajaa jäljen koerekisterillä. Aarretaulu (js/linssit/aarteet.js) on
// tuotannossa tyhjä; testi antaa oman taulunsa (game.linssiAarteet) kuten
// webin omat testit.
//
// VERTAILUMUOTO: passi ja omistetut lajiteltuina. Web leimaa valmiin linssin
// asynkronisesti (tuonnin jälkeen) ja hiomassa-linssin heti, joten yhden
// teon sisällä avainten lisäysjärjestys voi poiketa natiivista (natiivi leimaa
// heti). Passin tarkka JSON-teksti ja stampList-järjestys verrataan
// passiosassa, jossa leimat tehdään suoraan.
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');

// --- ympäristö ennen tuonteja ---------------------------------------------------
const varasto = new Map();
globalThis.localStorage = {
  getItem: (k) => (varasto.has(k) ? varasto.get(k) : null),
  setItem: (k, v) => { varasto.set(k, String(v)); },
  removeItem: (k) => { varasto.delete(k); },
  clear: () => varasto.clear(),
};
const KIINTEA_PAIVA = [2026, 8, 23, 12, 0, 0]; // 23.9.2026 klo 12 paikallista aikaa
const OikeaDate = Date;
globalThis.Date = class extends OikeaDate {
  constructor(...a) { super(...(a.length ? a : KIINTEA_PAIVA)); }
  static now() { return new OikeaDate(...KIINTEA_PAIVA).getTime(); }
};

const tuo = (polku) => import(pathToFileURL(join(JS, polku)).href);
const passi = await tuo('passport.js');
const omistus = await tuo('linssit/omistus.js');
const { LINSSIT } = await tuo('linssit/rekisteri.js');
const { Game } = await tuo('game.js');
const { packById } = await tuo('pack.js');

const ordinaali = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const odota = async () => {
  await new Promise((r) => setTimeout(r, 0));
  await new Promise((r) => setTimeout(r, 0));
};

// --- rekisterit -------------------------------------------------------------------
const riviJalkeen = (r) => ({ tunnus: r.tunnus, manner: r.manner ?? null, hiomassa: r.tila === 'hiomassa', nimi: r.nimi ?? null });
const rekisteri = LINSSIT.map(riviJalkeen);
const nimet = {};
for (const r of LINSSIT) {
  const m = await r.tuo();
  nimet[r.tunnus] = m.LINSSI?.nimi ?? null;
}
const KOERIVIT = [
  { tunnus: 'yokartta', manner: 'northamerica', tila: 'hiomassa', nimi: 'Yökartta' },
  { tunnus: 'tahdet', manner: null, tila: 'hiomassa', nimi: 'Tähtitaivas' },
];
LINSSIT.push(...KOERIVIT.map((r) => ({ ...r })));
const koerekisteri = LINSSIT.map(riviJalkeen);
/** Palauttaa koerekisterin alkutilaan (valmistu-teko muuttaa riviä). */
function nollaaRekisteri() {
  LINSSIT.length = 0;
  for (const r of koerekisteri) {
    const rivi = { tunnus: r.tunnus, manner: r.manner };
    if (r.hiomassa) Object.assign(rivi, { tila: 'hiomassa', nimi: r.nimi });
    else rivi.tuo = () => tuo(`linssit/${r.tunnus}.js`);
    LINSSIT.push(rivi);
  }
}

// --- osa 1: passi (js/passport.js) --------------------------------------------------
const paiva = ([v, k, p]) => new OikeaDate(v, k - 1, p, 12, 0, 0);
function passiTila(teko, args, tulos) {
  return {
    teko, args, tulos,
    raaka: localStorage.getItem(passi.STAMP_KEY),
    lista: passi.stampList().map((s) => `${s.packId}=${s.label}@${s.date}`),
  };
}
function passiTeko(teko, args) {
  switch (teko) {
    case 'leimaa': return passi.stampBoard(args[0], args[1], paiva(args[2]));
    case 'lue': return Object.keys(passi.readStamps());
    case 'kirjoita': return passi.writeStamps(args[0]);
    case 'raaka': localStorage.setItem(passi.STAMP_KEY, args[0]); return null;
    case 'tyhjenna': localStorage.removeItem(passi.STAMP_KEY); return null;
    case 'isoDate': return passi.isoDate(paiva(args[0]));
    case 'stampDate': return passi.stampDate(args[0]);
    default: throw new Error(`tuntematon passiteko ${teko}`);
  }
}
localStorage.clear();
const passiAskeleet = [passiTila('alku', [], null)];
const p = (teko, ...args) => passiAskeleet.push(passiTila(teko, args, passiTeko(teko, args) ?? null));
p('leimaa', 'maailmankartta', 'Maailmankartta', [2026, 7, 27]);
p('leimaa', 'maailmankartta', 'Toinen nimi', [2026, 7, 28]);       // jo leimattu
p('leimaa', 'linssi:pallo', 'Karttapallo', [2026, 1, 5]);           // aiempi päivä → listan alkuun
p('leimaa', 'kunnia:afrikka', 'Kunnia "Afrikka" \\ ä\n', [2026, 12, 31]);
p('leimaa', 'b', 'B', [2026, 7, 27]);                                // sama päivä → lisäysjärjestys
p('lue');
p('kirjoita', { x: { label: 'X', date: '2025-05-05' }, 'linssi:radio': { label: 'Maailmanradio', date: '2026-09-01' } });
p('leimaa', 'x', 'X2', [2027, 1, 1]);
p('raaka', 'rikki{');
p('lue');
p('leimaa', 'uusi', 'Uusi', [2026, 3, 3]);                           // rikkinäisen päälle
p('raaka', '42');
p('lue');
p('raaka', 'null');
p('leimaa', 'n', 'N', [2026, 3, 4]);
p('tyhjenna');
p('lue');
p('kirjoita', null);
p('isoDate', [2026, 1, 5]);
p('isoDate', [1999, 12, 31]);
p('isoDate', [2026, 10, 9]);
p('stampDate', '2026-07-27');
p('stampDate', '2026-01-05');

// --- osa 2: omistus (js/linssit/omistus.js + js/game.js) ----------------------------
const pack = packById('maailmankartta');
if (pack.id !== 'maailmankartta') throw new Error('maailmankartta puuttuu');
const kaupungitMantereella = (m) => pack.cities.filter((c) => pack.map.cityManner[c.id] === m).map((c) => c.id).sort(ordinaali);
const AARTEET = { pariisi: 'topografia', lontoo: 'yokartta', rooma: 'olematon', ateena: 'tahdet' };

let kaappaa = false;
const puheet = [];
const alkuSay = Game.prototype.say;
Game.prototype.say = function say(id, teksti) {
  if (kaappaa) puheet.push(teksti);
  return alkuSay.call(this, id, teksti);
};
for (const nimi of ['tarkistaLinssikynnys', 'linssiAarteenKylkiaisena']) {
  const alku = Game.prototype[nimi];
  Game.prototype[nimi] = function kaapattu(...a) {
    kaappaa = true;
    try { return alku.apply(this, a); } finally { kaappaa = false; }
  };
}

function uusiPeli(seed, start) {
  const g = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start }], pack, seed });
  g.linssiAarteet = AARTEET;
  g.takeEvents();
  puheet.length = 0;
  return g;
}

function omistusTila(g, teko, args, tulos) {
  const pl = g.player;
  const leimat = passi.readStamps();
  return {
    teko, args, tulos,
    raha: pl.money,
    xp: pl.xp,
    linssit: [...(pl.linssit ?? [])],
    omistetut: [...omistus.omistetut(g, pl)].sort(ordinaali),
    hiomassa: omistus.hiomassaOlevat(g, pl).sort(ordinaali),
    valmistuneet: omistus.valmistuneet(g, pl).sort(ordinaali),
    passi: Object.keys(leimat).sort(ordinaali).map((k) => `${k}=${leimat[k].label}@${leimat[k].date}`),
    tapahtumat: g.takeEvents().filter((e) => e.linssi !== undefined).map((e) => ({
      otsikko: e.text, linssi: e.linssi, sub: e.sub, tilanne: e.tilanne, hiomassa: e.hiomassa ?? false, hyvitys: e.hyvitys ?? 0,
    })),
    puheet: puheet.splice(0),
  };
}

async function omistusTeko(tila, teko, args) {
  const g = tila.g;
  const pl = g.player;
  switch (teko) {
    case 'xp': g.awardXp(pl, args[0]); return null;
    case 'kylkiainen': return g.linssiAarteenKylkiaisena(pl, args[0], args[1]);
    case 'myonna': return omistus.myonna(g, pl, args[0]);
    case 'hyvita': return omistus.hyvitaHiomassa(g, pl, args[0]);
    case 'nahty': return omistus.merkitseLinssiNahdyksi(args[0]);
    case 'kaupungista': return omistus.linssiKaupungista(g, args[0], pl);
    case 'kynnys': return omistus.tarkistaKynnys(g, pl, args[0], args[1]);
    case 'omistaa': return omistus.omistaa(g, pl, args[0]);
    case 'hiomassa': return omistus.hiomassa(args[0]);
    case 'hiomassaNimi': return omistus.hiomassaNimi(args[0]);
    case 'kehittaja': localStorage.setItem('matkakirja-kehittaja', args[0] ? '1' : '0'); return null;
    case 'valmistu': {
      const r = LINSSIT.find((x) => x.tunnus === args[0]);
      delete r.tila;
      r.tuo = () => Promise.resolve({ LINSSI: { nimi: r.nimi } });
      return null;
    }
    case 'tallenna':
      tila.g = Game.fromJSON(JSON.parse(JSON.stringify(g.toJSON())));
      tila.g.linssiAarteet = AARTEET;
      return null;
    case 'uusiPeli':
      tila.g = uusiPeli(args[0], args[1]);
      return null;
    default: throw new Error(`tuntematon teko ${teko}`);
  }
}

async function aja({ nimi, seed, start, uusiPassi }, kasikirjoitus) {
  nollaaRekisteri();
  if (uusiPassi) localStorage.clear();
  const tila = { g: uusiPeli(seed, start) };
  const askeleet = [omistusTila(tila.g, 'alku', [], null)];
  const k = async (teko, ...args) => {
    const tulos = await omistusTeko(tila, teko, args);
    await odota();
    askeleet.push(omistusTila(tila.g, teko, args, tulos ?? null));
  };
  await kasikirjoitus(k);
  return { nimi, seed, start, uusiPassi, askeleet };
}

const etela = kaupungitMantereella('southamerica')[0];
const pohjoinen = kaupungitMantereella('northamerica')[0];
const ajot = [];

// A: ensimmäinen matka tyhjällä passilla — kylkiäiset, kynnykset, hyvitys, valmistuminen.
ajot.push(await aja({ nimi: 'ensimmäinen matka', seed: 7, start: 'pariisi', uusiPassi: true }, async (k) => {
  await k('kaupungista', 'pariisi');           // Euroopalla ei omaa linssiä → ensimmäinen mannerlinssi
  await k('kaupungista', etela);               // oma mannerlinssi (topografia)
  await k('kaupungista', 'olematon');          // tuntematon kaupunki → laudan tunnus mantereena
  await k('hiomassa', 'yokartta');
  await k('hiomassa', 'radio');
  await k('hiomassa', 'olematon');
  await k('hiomassaNimi', 'yokartta');
  await k('hiomassaNimi', 'radio');
  await k('kylkiainen', 'pariisi', 'pieniAarre'); // pieni aarre ei anna linssiä
  await k('kylkiainen', 'pariisi', 'mannerAarre');
  await k('kylkiainen', 'pariisi', 'isoAarre');   // valmis linssi
  await k('kylkiainen', 'pariisi', 'isoAarre');   // jo omistettu → null
  await k('kylkiainen', 'berliini', 'isoAarre');  // ei taulussa
  await k('kylkiainen', '', 'isoAarre');          // kaupunki puuttuu
  await k('kylkiainen', 'rooma', 'isoAarre');     // tunnus ei rekisterissä
  await k('kylkiainen', 'lontoo', 'isoAarre');    // hiomassa → optikon hyvitys
  await k('hyvita', 'yokartta');                 // jo maksettu
  await k('hyvita', 'topografia');               // ei hiomassa
  await k('hyvita', 'olematon');
  await k('kaupungista', pohjoinen);             // mannerlinssit omistettu → kynnyslinssi
  await k('omistaa', 'topografia');
  await k('omistaa', 'pallo');                   // peruslinssi
  await k('omistaa', 'radio');
  await k('xp', 150);
  await k('xp', 250);                            // 400: ensimmäinen kynnys
  await k('xp', 900);                            // 1300: 800 ylittyy
  await k('xp', 1000);                           // 2300: 1400 ja 2200 kerralla
  await k('kynnys', 100, 50);                    // lasku: ei mitään
  await k('kynnys', 0, 399);
  await k('kynnys', 400, 400);
  await k('kynnys', 0, 5000);                    // suora kutsu: neljä seuraavaa, myös hiomassa (tahdet)
  await k('kynnys', 5000, 9000);
  await k('myonna', 'pallo');                    // peruslinssi ei ole passissa → uusi
  await k('myonna', 'pallo');
  await k('myonna', 'olematon');
  await k('nahty', 'topografia');
  await k('valmistu', 'yokartta');               // optikko valmis: hyvitetty, ei nähty → valmistunut
  await k('nahty', 'yokartta');
  await k('nahty', 'yokartta');
  await k('tallenna');
  await k('kehittaja', true);
  await k('kehittaja', false);
  await k('xp', 10);
}));

// B: toinen matka samalla passilla — mikään ei ole uutta, hyvitys vain kerran.
ajot.push(await aja({ nimi: 'toinen matka', seed: 9, start: 'lontoo', uusiPassi: false }, async (k) => {
  await k('kylkiainen', 'pariisi', 'isoAarre');   // passissa → ei uusi, mutta pelikerran listaan
  await k('kylkiainen', 'lontoo', 'isoAarre');    // hiomassa, passissa → ei hyvitystä
  await k('kylkiainen', 'ateena', 'isoAarre');    // tahdet: passissa (suora kynnys) → ei uusi
  await k('hyvita', 'tahdet');                    // hyvitystä ei maksettu → 500
  await k('hyvita', 'tahdet');
  await k('xp', 500);                             // kaikki kynnyslinssit passissa
  await k('xp', 2000);
  await k('kaupungista', etela);
  await k('tallenna');
  await k('uusiPeli', 11, 'newyork');
  await k('myonna', 'radio');
}));

// C: kehittäjätila tyhjällä passilla — toimivat auki, kynnys antaa hiomassa-linssin.
ajot.push(await aja({ nimi: 'kehittäjätila', seed: 3, start: 'ateena', uusiPassi: true }, async (k) => {
  await k('kehittaja', true);
  await k('kaupungista', etela);                 // topografia omistettu kehittäjätilassa → yokartta
  await k('xp', 400);                            // ainoa omistamaton kynnyslinssi: tahdet (hiomassa)
  await k('xp', 400);                            // 800: ei enää annettavaa
  await k('kylkiainen', 'lontoo', 'isoAarre');   // yokartta hiomassa → hyvitys
  await k('kehittaja', false);
  await k('xp', 1500);                           // 2300: 1400 ja 2200 → ihmisen-matka, keksinnot
  await k('kylkiainen', 'pariisi', 'isoAarre');
  await k('kaupungista', etela);
}));

// Kattavuus: jokainen teko onnistuvana ja epäonnistuvana.
const kaikki = ajot.flatMap((a) => a.askeleet);
const onnistui = (s) => (s.tulos === null || s.tulos === false || s.tulos === 0
  || (Array.isArray(s.tulos) && s.tulos.length === 0) || (s.tulos?.uusi === false) ? false : true);
for (const t of ['kylkiainen', 'myonna', 'hyvita', 'nahty', 'kaupungista', 'kynnys', 'omistaa', 'hiomassa']) {
  const s = kaikki.filter((x) => x.teko === t);
  if (!s.some(onnistui) || !s.some((x) => !onnistui(x))) throw new Error(`kattavuus: ${t}`);
}
if (!kaikki.some((s) => s.tapahtumat.some((e) => e.hiomassa && e.hyvitys === 500))) throw new Error('kattavuus: hyvitys');
if (!kaikki.some((s) => s.valmistuneet.length > 0)) throw new Error('kattavuus: valmistunut');
if (!kaikki.some((s) => s.teko === 'xp' && s.tapahtumat.length > 1)) throw new Error('kattavuus: kaksi kynnystä kerralla');

const rivit = (l) => l.map((s) => JSON.stringify(s)).join(',\n');
const ajoRivit = ajot.map((a) => {
  const { askeleet, ...paa } = a;
  return `${JSON.stringify(paa).slice(0, -1)},"askeleet":[\n${rivit(askeleet)}\n]}`;
});
writeFileSync(join(tama, 'linssijalki.json'), `{"$kuvaus":"Verkkopelin js/passport.js ja js/linssit/omistus.js linssijälki (Kultaiset/tee-linssijalki.mjs). Älä muokkaa käsin.",
"paiva":"${passi.isoDate(new Date())}",
"vakiot":${JSON.stringify({
    leimaAvain: passi.STAMP_KEY, leimaEtuliite: omistus.LEIMA_ETULIITE, hyvitysEtuliite: omistus.HYVITYS_ETULIITE,
    nahtyEtuliite: omistus.NAHTY_ETULIITE, optikonHyvitys: omistus.OPTIKON_HYVITYS, kynnykset: omistus.LINSSIKYNNYKSET,
    peruslinssit: omistus.PERUSLINSSIT,
  })},
"rekisteri":${JSON.stringify(rekisteri)},
"koerekisteri":${JSON.stringify(koerekisteri)},
"nimet":${JSON.stringify(nimet)},
"aarteet":${JSON.stringify(AARTEET)},
"laattamantereet":${JSON.stringify((nollaaRekisteri(), omistus.laattamantereet()))},
"passi":[\n${rivit(passiAskeleet)}\n],
"ajot":[\n${ajoRivit.join(',\n')}\n]}\n`);
const tekoja = ajot.reduce((s, a) => s + a.askeleet.length - 1, 0);
console.log(`linssijalki.json: passi ${passiAskeleet.length - 1} tekoa, ${ajot.length} ajoa, ${tekoja} tekoa`);
