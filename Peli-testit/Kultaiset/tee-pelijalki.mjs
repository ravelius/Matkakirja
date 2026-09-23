// KULTAINEN PELIJÄLKI: verkkopelin js/game.js pelaa koko pelin laattoineen
// — laatat jaetaan konstruktorissa, kysymykset kääntävät laattoja
// (revealToken: rahat, tähdet, tietäjäpisteet, ennätys, löytöpaikat),
// kohtaamiset lukitsevat kätköjä (lukitseAarre) — ja jokaisen teon jälkeinen
// tila kirjataan tiedostoon Kultaiset/pelijalki.json. C#-portti (Peli/Matka.cs,
// Kysely.cs, Laatat.cs, Kokemus.cs) toistaa saman käsikirjoituksen testissä
// Testit/PeliTestit.cs ja vaatii identtisen jäljen, myös tallennuksen yli.
//
// Käyttö: node Kultaiset/tee-pelijalki.mjs [verkkopelin js-kansio]
//
// KÄSIKIRJOITUS: sama kuin kysymysjäljessä (tee-kysymysjalki.mjs,
// C# KyselyKasikirjoitus).
//
// RAJAUKSET (samat kuin C#:ssa koukkuina):
// - Pulmat: generate-funktiot eivät ole sisältöpaketissa → pendingPuzzle pois.
// - Linssi aarteen kylkiäisenä (passi, localStorage) → g.linssiAarteet = {}.
//   C#: koukku Matka.LinssiKylkiaisena.
// - Kaksintaistelu (beginDuel) → korvataan stubilla, joka laskee alkaneet ja
//   päättää vuoron. C#: koukku Matka.Kaksintaistelu tekee saman.
// - Maailmankartan laatoissa ei ole ryöstäjiä; koe-ajot käyttävät koelaudan
//   määriä (ryöstäjiä ja ylimääräisiä pääaarteita, ks. laattajälki).
// - Pöllö aarteena on webissä pois päältä (POLLO_ON_AARRE = false); yksi
//   ajo pyytää sen päälle (polloAarteena: true).
// - Kentät, joita ei tallenneta (viimeAarre), nollataan ennen jokaista tekoa.
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const { Game } = await import(pathToFileURL(join(JS, 'game.js')).href);
const { packById } = await import(pathToFileURL(join(JS, 'pack.js')).href);
const { tietajataso } = await import(pathToFileURL(join(JS, 'tietajatasot.js')).href);

// --- rajaukset ennen pelin luontia -------------------------------------
Game.prototype.pendingPuzzle = () => null;
Game.prototype.beginDuel = function beginDuelStub() {
  this.kaksintaisteluja = (this.kaksintaisteluja ?? 0) + 1;
  this.phase = 'action';
  this.endTurn();
  return { ok: true };
};

const VUOROT = 120;
const MAX_TEOT = 300;
const ordinaali = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const pack = packById('maailmankartta');
if (pack.id !== 'maailmankartta') throw new Error('maailmankartta puuttuu');
if ((pack.events ?? []).length) throw new Error('maailmankartalla on tapahtumia: rajaus ei enää päde');

// Koelauta: 266 laattaa kuten maailmankartalla, mutta 40 ryöstäjää ja 20 pääaarretta.
const KOE_MAARAT = { star: 20, mannerAarre: 7, robber: 40, isoAarre: 82, pieniAarre: 117 };
const koepaketti = { ...pack, tokens: { ...pack.tokens, counts: KOE_MAARAT } };
const KUVAT = pack.cities.filter((_, i) => i % 4 === 0).map((c) => c.id);

const AJOT = [
  { seed: 111, start: 'lontoo', liput: true, kuvat: true },
  { seed: 42, start: 'kairo', liput: false, kuvat: true, taso: 'easy' },
  { seed: 2026, start: 'tokio', liput: true, kuvat: true },
  { seed: 5, start: 'kapkaupunki', liput: true, kuvat: true, pollo: true },
  { seed: 13, start: 'newyork', liput: true, kuvat: true, koe: true },
  { seed: 58, start: 'rio', liput: true, kuvat: true },
  { seed: 404, start: 'praha', liput: true, kuvat: false },
  { seed: 11, start: 'dublin', liput: true, kuvat: true, raha: 40 },
  { seed: 8, start: 'pariisi', liput: false, kuvat: true, koe: true },
];

const pos = (p) => (p.pos.type === 'city' ? `c:${p.pos.city}` : `e:${p.pos.edge}:${p.pos.idx}`);

/** FNV-1a 32 bittiä UTF-16-koodiyksiköistä: laattakartan Map-järjestyksen tiiviste (C#: PeliTestit.Tiiviste). */
function tiiviste(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}
const kartta = (m) => [...m.entries()].map(([a, b]) => `${a}=${b}`).join(';');

function kysymys(q) {
  if (!q) return null;
  return {
    kind: q.kind ?? 'quiz',
    cityId: q.cityId,
    hard: !!q.hard,
    kaari: !!q.kaari,
    explore: !!q.explore,
    question: q.question,
    options: q.options,
    correct: q.correct,
    hidden: q.hidden,
    chosen: q.chosen,
    right: q.right,
    aarreLukittui: q.aarreLukittui ?? null,
    found: q.found ?? null,
  };
}

function tila(g, teko) {
  const p = g.player;
  const n = p.finds.length;
  return {
    teko,
    vaihe: g.phase,
    sijainti: pos(p),
    raha: p.money,
    die: g.die,
    turnCount: g.turnCount,
    rngCalls: g.rngCalls,
    travelMode: g.travelMode,
    autoTravel: g.autoTravel,
    kaydyt: g.world.visited.size,
    tavat: g.travelModes(),
    xp: p.xp,
    taso: tietajataso(p.xp).taso,
    nousut: g.takeTietajaNousut().map((t) => t.taso),
    quizAsked: p.quizAsked,
    quizCorrect: p.quizCorrect,
    kaytetyt: g.usedQuestions.size,
    lastForm: g.lastForm,
    lukot: [...g.aarreLukot].map((k) => k.split(':')[1]).sort(ordinaali),
    quiz: kysymys(g.quiz),
    // --- laatat ---
    laatat: g.tokens.size,
    laattaTiiviste: tiiviste(kartta(g.tokens)),
    kaannetyt: g.revealed.size,
    tahdet: p.stars,
    starsFound: [...g.world.starsFound.entries()].map(([m, c]) => `${m}=${c}`),
    loydot: n,
    viimeLoyto: n ? `${p.finds[n - 1]}@${p.findManner[n - 1]}/${p.findMaa[n - 1]}` : null,
    arvo: g.viimeAarre?.arvo ?? null,
    duelArmed: g.duelArmed,
    kaksintaisteluja: g.kaksintaisteluja ?? 0,
    polloLoydetty: g.polloLoydetty,
    recordNoted: g.recordNoted,
    recordDay: g.recordMark?.day ?? null,
  };
}

const jaljet = [];
const lajit = {};
for (const ajo of AJOT) {
  const { seed, start, liput: lippuja, kuvat, taso = 'normal', raha = null, pollo = false, koe = false } = ajo;
  const g = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start, quizLevel: taso }],
    pack: koe ? koepaketti : pack,
    seed,
    polloAarteena: pollo,
  });
  g.linssiAarteet = {};
  if (!lippuja) g.flagTargets = () => [];
  if (kuvat) g.setPhotoPool(KUVAT);
  const rngAlussa = g.rngCalls;
  const laatat = [...g.tokens.entries()];
  const askeleet = [tila(g, 'alku')];
  if (raha !== null) {
    g.player.money = raha;
    g.phase = 'action';
    g.beginTurn();
    askeleet.push(tila(g, `raha:${raha}`));
  }
  let valinnat = 0;
  let heitot = 0;
  let avatut = 0;
  let apuKokeiltu = false;
  for (let n = 0; n < MAX_TEOT && g.turnCount <= VUOROT; n++) {
    let teko;
    let tulos;
    g.viimeAarre = null;
    if (g.phase === 'action') {
      const tavat = g.travelModes();
      if (!tavat.length) throw new Error(`ei tapoja: siemen ${seed}`);
      const muut = tavat.filter((t) => t !== 'stay');
      if (tavat.includes('stay') && (valinnat % 2 === 0 || !muut.length)) {
        const laattaKaupunki = g.tokenHere();
        const vaikea = Boolean(laattaKaupunki && g.hardAvailable(laattaKaupunki.id) && avatut % 4 === 3);
        teko = vaikea ? 'stay:hard' : 'stay';
        tulos = g.actionTravel('stay', { hard: vaikea });
        if (g.phase === 'quiz') { avatut++; apuKokeiltu = false; }
      } else {
        const tapa = muut[valinnat % muut.length];
        if (tapa === 'bus') {
          const kohde = [...g.busDestinations()].sort(ordinaali)[0];
          teko = `bus:${kohde}`;
          tulos = g.actionBus(kohde);
        } else if (tapa === 'fly') {
          const kohde = [...g.airportDestinations()].sort(ordinaali)[0];
          teko = `fly:${kohde}`;
          tulos = g.actionFly(kohde);
        } else {
          teko = `travel:${tapa}`;
          tulos = g.actionTravel(tapa);
        }
      }
      valinnat++;
    } else if (g.phase === 'roll') {
      if (g.muitaTapojaTarjolla() && heitot % 4 === 3) {
        teko = 'cancel';
        tulos = g.actionCancelTravel();
      } else {
        teko = 'roll';
        tulos = g.actionRoll();
      }
      heitot++;
    } else if (g.phase === 'move') {
      const avain = [...g.moves.keys()].sort(ordinaali)[0];
      teko = `move:${avain}`;
      tulos = g.actionMove(avain);
    } else if (g.phase === 'quiz') {
      const q = g.quiz;
      const k = (avatut - 1) % 6;
      const p = g.player;
      if (q.chosen === null && !apuKokeiltu) {
        apuKokeiltu = true;
        if (k === 1 && q.options.length >= 4 && p.money >= 80) {
          teko = 'fiftyfifty'; tulos = g.actionFiftyFifty();
        } else if (k === 2 && q.hint && p.money >= 40) {
          teko = 'hint'; tulos = g.actionHint();
        } else if (k === 3 && q.options.length >= 2 && p.money >= 25) {
          teko = 'kaveriapu'; tulos = g.actionKaveriapu();
        }
      }
      if (!teko) {
        if (q.chosen !== null) {
          teko = 'close'; tulos = g.closeQuiz();
        } else if (k === 4) {
          teko = 'timeout'; tulos = g.timeoutQuiz();
        } else if (k === 5) {
          teko = 'close'; tulos = g.closeQuiz();
        } else {
          const oikein = (avatut - 1) % 3 !== 2;
          const valinta = oikein ? q.correct
            : q.options.findIndex((_, i) => i !== q.correct && !q.hidden.includes(i));
          teko = `answer:${valinta}`;
          tulos = g.answerQuiz(valinta);
        }
      }
    } else {
      throw new Error(`odottamaton vaihe ${g.phase} (siemen ${seed})`);
    }
    if (!tulos.ok) throw new Error(`${teko} epäonnistui: ${tulos.error} (siemen ${seed})`);
    const askel = tila(g, teko);
    askeleet.push(askel);
    const laji = teko.replace(/^(move|bus|fly|answer):.*/, '$1');
    lajit[laji] = (lajit[laji] ?? 0) + 1;
    if (askel.quiz?.found) lajit[`löytö:${askel.quiz.found}`] = (lajit[`löytö:${askel.quiz.found}`] ?? 0) + (teko.startsWith('answer') ? 1 : 0);
    if (askel.quiz?.aarreLukittui && teko.startsWith('answer')) lajit.lukko = (lajit.lukko ?? 0) + 1;
  }
  const p = g.player;
  jaljet.push({
    seed, start, liput: lippuja, kuvat, taso, raha, pollo, koe,
    maarat: Object.entries(koe ? KOE_MAARAT : pack.tokens.counts),
    rngAlussa, laatat,
    lopuksi: {
      laatat: [...g.tokens.entries()],
      revealed: [...g.revealed.entries()],
      starsFound: [...g.world.starsFound.entries()],
      finds: p.finds,
      findManner: p.findManner,
      findMaa: p.findMaa,
    },
    askeleet,
  });
}

const tekoja = jaljet.reduce((s, j) => s + j.askeleet.length - 1, 0);
const tahtia = jaljet.reduce((s, j) => s + j.askeleet.at(-1).tahdet, 0);
const ennatyksia = jaljet.filter((j) => j.askeleet.at(-1).recordDay !== null).length;
const kaksintaisteluja = jaljet.reduce((s, j) => s + j.askeleet.at(-1).kaksintaisteluja, 0);
const pollot = jaljet.filter((j) => j.lopuksi.finds.includes('empty')).length;
const mannerAarteita = jaljet.reduce((s, j) => s + j.lopuksi.finds.filter((f) => f === 'mannerAarre').length, 0);
// Siemenet on valittu niin, että jälki kattaa jokaisen löytölajin.
if (tahtia < 3 || ennatyksia < 2 || kaksintaisteluja < 1 || pollot < 1 || !lajit.lukko || mannerAarteita < 1) {
  throw new Error(`jälki ei kata kaikkea: tähtiä ${tahtia}, ennätyksiä ${ennatyksia}, kaksintaisteluja ${kaksintaisteluja}, `
    + `pöllöjä ${pollot}, lukkoja ${lajit.lukko ?? 0}, mantereen aarteita ${mannerAarteita}`);
}
const rivit = jaljet.map((j) => {
  const { askeleet, ...paa } = j;
  const alku = JSON.stringify(paa).slice(0, -1);
  return `${alku},"askeleet":[\n${askeleet.map((a) => JSON.stringify(a)).join(',\n')}\n]}`;
});
writeFileSync(join(tama, 'pelijalki.json'), `{"$kuvaus":"Verkkopelin js/game.js pelijälki laattoineen (Kultaiset/tee-pelijalki.mjs). Älä muokkaa käsin.",\n"lauta":"maailmankartta","vuorot":${VUOROT},"maxTeot":${MAX_TEOT},"kuvat":${JSON.stringify(KUVAT)},\n"jaljet":[\n${rivit.join(',\n')}\n]}\n`);
console.log(`pelijalki.json: ${jaljet.length} ajoa, ${tekoja} tekoa, tähtiä ${tahtia}, ennätyksiä ${ennatyksia}, kaksintaisteluja ${kaksintaisteluja}, pöllöjä ${pollot}`, lajit);
