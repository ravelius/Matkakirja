// Kultaiset testit natiiville reittiverkolle ja satunnaisuudelle.
//
// Ajaa verkkopelin oikeat moduulit (js/rules.js, js/pack.js, js/game.js
// mulberry32) maailmankartan laudalla ja kirjoittaa tulokset tiedostoon
// Kultaiset/siirrot.json. C#-testit (Testit/ReittiverkkoTestit.cs,
// Testit/SatunnainenTestit.cs) lukevat saman tiedoston ja sisältöpaketin
// (Kultaiset/paketti/) ja vaativat täsmälleen samat tulokset.
//
// Käyttö: node Kultaiset/tee-kultaiset.mjs [verkkopelin js-kansio]
// Oletuskansio: /Users/Shared/Claude/Matkakirja-pelikoodari/js
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TAMA = path.dirname(fileURLToPath(import.meta.url));
const JS = path.resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const tuo = (nimi) => import(pathToFileURL(path.join(JS, nimi)).href);

const { buildBoard, findMoves, reachableCities, posKey } = await tuo('rules.js');
const { packById } = await tuo('pack.js');
const { mulberry32 } = await tuo('game.js');

const pack = packById('maailmankartta');
if (pack.id !== 'maailmankartta') throw new Error('maailmankartta puuttuu pack.js:stä');
const board = buildBoard(pack.cities, pack.edges, pack.map);

// --- 1. Laudan ja sisältöpaketin vertailu ---------------------------------
const lueKokoelma = (nimi) =>
  JSON.parse(fs.readFileSync(path.join(TAMA, 'paketti', nimi), 'utf8')).alkiot;
const pKaupungit = lueKokoelma('kaupungit.json');
const pReitit = lueKokoelma('reitit.json');
const pKaaret = pReitit.filter((r) => r.laji !== 'lento');
const pLennot = pReitit.filter((r) => r.laji === 'lento');

const erot = [];
if (pKaupungit.length !== board.cities.length) erot.push(`kaupunkeja paketissa ${pKaupungit.length}, laudalla ${board.cities.length}`);
pKaupungit.forEach((k, i) => {
  if (board.cities[i]?.id !== k.id) erot.push(`kaupunki #${i}: paketti ${k.id}, lauta ${board.cities[i]?.id}`);
});
if (pKaaret.length !== board.edges.length) erot.push(`kaaria paketissa ${pKaaret.length}, laudalla ${board.edges.length}`);
pKaaret.forEach((r, i) => {
  const e = board.edges[i];
  const d = r.data;
  const pType = d.type ?? 'land';
  const pFee = pType === 'sea' ? (d.fee ?? 100) : 0;
  if (!e || e.a !== d.a || e.b !== d.b || e.steps !== d.steps || e.type !== pType || e.fee !== pFee) {
    erot.push(`kaari #${i}: paketti ${d.a}|${d.b} ${pType} ${d.steps}/${pFee}, lauta ${e && `${e.id} ${e.type} ${e.steps}/${e.fee}`}`);
  }
  const lajiTyyppi = r.laji === 'sea' ? 'sea' : 'land';
  if (lajiTyyppi !== pType) erot.push(`kaari #${i}: laji ${r.laji} mutta data.type ${pType}`);
});
const lennot = pack.airRoutes ?? [];
if (pLennot.length !== lennot.length) erot.push(`lentoja paketissa ${pLennot.length}, laudalla ${lennot.length}`);
pLennot.forEach((l, i) => {
  const w = lennot[i];
  if (!w || w.a !== l.data.a || w.b !== l.data.b) erot.push(`lento #${i}: paketti ${l.data.a}|${l.data.b}, lauta ${w?.a}|${w?.b}`);
});

// --- 2. Siirrot ------------------------------------------------------------
const rng = mulberry32(20260923);
const valitse = (lista) => lista[Math.floor(rng() * lista.length)];

/** Lähtösijainnit: kaikki kaupungit ja jokaisen vähintään 2-askelisen reitin keskipiste. */
const lahdot = [
  ...board.cities.map((c) => ({ type: 'city', city: c.id })),
  ...board.edges.filter((e) => e.steps >= 2).map((e) => ({ type: 'edge', edge: e.id, idx: Math.floor(e.steps / 2) })),
];

const siirrotListana = (moves) => [...moves.entries()]
  .sort(([x], [y]) => (x < y ? -1 : x > y ? 1 : 0))
  .map(([avain, m]) => ({ avain, pituus: m.path.length, polku: m.path.map(posKey) }));

const TAPAUKSIA = 200;
const tapaukset = [];
for (let i = 0; i < TAPAUKSIA; i++) {
  const lahto = valitse(lahdot);
  const silmaluku = 1 + Math.floor(rng() * 6);
  const tapa = rng() < 0.35 ? 'sea' : 'land';
  const moves = findMoves(board, lahto, silmaluku, { mode: tapa });
  tapaukset.push({ lahto: posKey(lahto), silmaluku, tapa, siirrot: siirrotListana(moves) });
}

// Kattava tarkistus: jokainen lähtö × silmäluvut 1..6 × land/sea tiivisteenä.
// Kanoninen rivi per tapaus: "silmäluku|tapa:avain=pituus=polku;…" ja
// lähdön tiiviste = sha256(rivit \n-erotettuina) 16 ensimmäistä heksaa.
const tiivisteet = {};
let kattaviaTapauksia = 0;
for (const lahto of lahdot) {
  const rivit = [];
  for (const tapa of ['land', 'sea']) {
    for (let silmaluku = 1; silmaluku <= 6; silmaluku++) {
      const lista = siirrotListana(findMoves(board, lahto, silmaluku, { mode: tapa }));
      rivit.push(`${silmaluku}|${tapa}:` + lista.map((s) => `${s.avain}=${s.pituus}=${s.polku.join(',')}`).join(';'));
      kattaviaTapauksia++;
    }
  }
  tiivisteet[posKey(lahto)] = crypto.createHash('sha256').update(rivit.join('\n'), 'utf8').digest('hex').slice(0, 16);
}

// --- 3. Saavutettavat kaupungit -------------------------------------------
const RAHAT = [0, 50, 99, 100, 150, 300, 1000];
const saavutettavat = [];
for (let i = 0; i < 12; i++) {
  const lahto = i < 9 ? { type: 'city', city: valitse(board.cities).id } : valitse(lahdot.filter((l) => l.type === 'edge'));
  for (const raha of RAHAT) {
    saavutettavat.push({ lahto: posKey(lahto), raha, kaupungit: [...reachableCities(board, lahto, raha)].sort() });
  }
}

// --- 4. mulberry32 --------------------------------------------------------
const SIEMENET = [0, 1, 42, 123456789, 20260923, 2 ** 31, 2 ** 32 - 1];
const satunnaiset = SIEMENET.map((siemen) => {
  const r = mulberry32(siemen);
  return { siemen, arvot: Array.from({ length: 20 }, () => r()) };
});
// Kelaus: siemen 7, arvot kutsuista 1000..1004 (tallennuksen lataus toistaa rngCalls kutsua).
const kelattava = mulberry32(7);
for (let i = 0; i < 1000; i++) kelattava();
const kelaus = { siemen: 7, ohitus: 1000, arvot: Array.from({ length: 5 }, () => kelattava()) };

// --- kirjoitus ------------------------------------------------------------
const yhteenveto = {
  kaupunkeja: board.cities.length,
  maareitteja: board.edges.filter((e) => e.type === 'land').length,
  merireitteja: board.edges.filter((e) => e.type === 'sea').length,
  lentoja: lennot.length,
  askeleitaYhteensa: board.edges.reduce((s, e) => s + e.steps, 0),
  maksutYhteensa: board.edges.reduce((s, e) => s + e.fee, 0),
};

const ulos = {
  kuvaus: 'Kultaiset testit: verkkopelin js/rules.js ja js/game.js mulberry32 maailmankartan laudalla. Tee uudelleen: node Kultaiset/tee-kultaiset.mjs',
  lahde: JS,
  yhteenveto,
  erot,
  tapaukset,
  kattava: { tapauksia: kattaviaTapauksia, tiivisteet },
  saavutettavat,
  satunnaiset,
  kelaus,
};
fs.writeFileSync(path.join(TAMA, 'siirrot.json'), JSON.stringify(ulos, null, 1) + '\n');

console.log(`Kultaiset: ${tapaukset.length} siirtotapausta, ${kattaviaTapauksia} kattavaa (${lahdot.length} lähtöä), `
  + `${saavutettavat.length} saavutettavuutta, ${satunnaiset.length} siementä.`);
console.log('Yhteenveto:', JSON.stringify(yhteenveto));
console.log(erot.length ? `EROT paketin ja laudan välillä (${erot.length}):\n  ${erot.slice(0, 20).join('\n  ')}` : 'Paketti ja lauta täsmäävät.');
