// KULTAINEN KAKSINTAISTELUJÄLKI: verkkopelin js/game.js pelaa koko pelin
// laattoineen koelaudalla, jolla on paljon ryöstäjiä, ja OIKEA rosvon
// kaksintaistelu (beginDuel, actionDuelRelief, answerDuel, timeoutDuel,
// closeDuel) pelataan omalla käsikirjoituksellaan. Jokaisen teon jälkeinen
// tila kirjataan tiedostoon Kultaiset/kaksintaistelujalki.json. C#-portti
// (Peli/Kaksintaistelu.cs) toistaa saman testissä
// Testit/KaksintaisteluTestit.cs ja vaatii identtisen jäljen, myös
// satunnaislukukutsujen määrän ja tallennuksen yli.
//
// Käyttö: node Kultaiset/tee-kaksintaistelujalki.mjs [verkkopelin js-kansio]
//
// KÄSIKIRJOITUS muissa vaiheissa: sama kuin kysymys- ja pelijäljessä
// (tee-kysymysjalki.mjs, C# KyselyKasikirjoitus).
//
// KAKSINTAISTELU (vaihe 'duel'): d = ajon kaksintaistelun järjestysnumero
// 0:sta; teot KULKU[d % KULKU.length] järjestyksessä. Merkinnät:
//   oikein / vaarin   answerDuel(oikea) / answerDuel(ensimmäinen piilottamaton väärä)
//   piilotettu!       answerDuel(ensimmäinen piilotettu) — odotettu virhe
//   uudelleen!        answerDuel(oikea) vastauksen jälkeen — odotettu virhe
//   helpotus          actionDuelRelief (helpotus! = odotettu virhe)
//   aika              timeoutDuel (aika! = odotettu virhe)
//   raha:N            pelaajan rahat asetetaan N:ksi (rahan riittämättömyys)
//   sulje             closeDuel (myös vastaamatta: web sallii sen logiikassa)
// Virheteot kirjataan kenttään "virhe" (webin virheteksti), tila ei muutu.
//
// TALLENNUS: jokainen ajo pelataan myös niin, että peli tallennetaan ja
// ladataan (toJSON → fromJSON) joka kolmannen teon jälkeen; jäljen pitää
// olla identtinen. C#-testi tekee saman omalla tallennuksellaan eri väleillä.
//
// RAJAUKSET (samat kuin pelijäljessä): pulmat pois (pendingPuzzle),
// linssit aarteen kylkiäisenä pois (linssiAarteet = {}).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const { Game } = await import(pathToFileURL(join(JS, 'game.js')).href);
const { packById } = await import(pathToFileURL(join(JS, 'pack.js')).href);

Game.prototype.pendingPuzzle = () => null;

const VUOROT = 400;
const MAX_TEOT = 550;
const TALLENNUSVALI = 3;
const ordinaali = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const pack = packById('maailmankartta');
if (pack.id !== 'maailmankartta') throw new Error('maailmankartta puuttuu');
if ((pack.events ?? []).length) throw new Error('maailmankartalla on tapahtumia: rajaus ei enää päde');

// Sisältöpaketin kokoelma = web pack.duels samassa järjestyksessä (C# lukee kokoelman).
const kokoelma = JSON.parse(readFileSync(join(tama, 'paketti', 'kaksintaistelut.json'), 'utf8'));
const paketista = kokoelma.alkiot.map((a) => a.data);
if (!isDeepStrictEqual(paketista, pack.duels)) {
  throw new Error('paketti/kaksintaistelut.json ei vastaa verkkopelin pack.duels-taulukkoa: hae uusi näyte');
}

// Koelauta: 266 laattaa, joista 220 ryöstäjää (maailmankartalla ryöstäjiä ei ole).
const KOE_MAARAT = { star: 7, mannerAarre: 7, robber: 220, isoAarre: 12, pieniAarre: 20 };
const koepaketti = { ...pack, tokens: { ...pack.tokens, counts: KOE_MAARAT } };
const KUVAT = pack.cities.filter((_, i) => i % 4 === 0).map((c) => c.id);

const KULKU = [
  ['oikein', 'helpotus!', 'uudelleen!', 'sulje'],
  ['vaarin', 'sulje'],
  ['aika', 'aika!', 'sulje'],
  ['helpotus', 'oikein', 'sulje'],
  ['helpotus', 'helpotus', 'helpotus!', 'piilotettu!', 'oikein', 'sulje'],
  ['helpotus', 'helpotus', 'vaarin', 'sulje'],
  ['helpotus', 'aika', 'sulje'],
  ['raha:1', 'helpotus', 'helpotus', 'oikein', 'sulje'],
  ['raha:0', 'helpotus', 'vaarin', 'sulje'],
  ['sulje'],
];

const AJOT = [
  { seed: 3, start: 'pariisi', liput: true, kuvat: true },
  { seed: 17, start: 'kairo', liput: false, kuvat: true, taso: 'easy' },
  { seed: 2026, start: 'tokio', liput: true, kuvat: true },
  { seed: 64, start: 'rio', liput: true, kuvat: false },
  { seed: 9, start: 'newyork', liput: true, kuvat: true, raha: 40 },
  // Kokoelma lähes käytetty: tuoreita on 2, sitten pakka on koko kokoelma.
  { seed: 41, start: 'lontoo', liput: true, kuvat: true, kaytetyt: 40 },
];

const pos = (p) => (p.pos.type === 'city' ? `c:${p.pos.city}` : `e:${p.pos.edge}:${p.pos.idx}`);

function kaksintaistelu(d) {
  if (!d) return null;
  return {
    question: d.question,
    fact: d.fact ?? null,
    source: d.source ?? [],
    options: d.options,
    correct: d.correct,
    hidden: d.hidden,
    reliefs: d.reliefs,
    taken: d.taken,
    chosen: d.chosen,
    right: d.right,
    timedOut: !!d.timedOut,
    seconds: d.seconds,
    prize: d.prize ?? null,
  };
}

function tila(g, teko, virhe = null) {
  const p = g.player;
  const q = g.quiz;
  return {
    teko,
    virhe,
    vaihe: g.phase,
    sijainti: pos(p),
    raha: p.money,
    die: g.die,
    turnCount: g.turnCount,
    rngCalls: g.rngCalls,
    travelMode: g.travelMode,
    tavat: g.travelModes(),
    xp: p.xp,
    quizAsked: p.quizAsked,
    quizCorrect: p.quizCorrect,
    kaytetyt: g.usedQuestions.size,
    laatat: g.tokens.size,
    loydot: p.finds.length,
    quiz: q ? { question: q.question, correct: q.correct, chosen: q.chosen, found: q.found ?? null } : null,
    duelArmed: g.duelArmed,
    duel: kaksintaistelu(g.duel),
  };
}

function luo(ajo) {
  const { seed, start, taso = 'normal' } = ajo;
  const g = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start, quizLevel: taso }],
    pack: koepaketti,
    seed,
  });
  return kytke(g, ajo);
}

function kytke(g, ajo) {
  g.linssiAarteet = {};
  if (!ajo.liput) g.flagTargets = () => [];
  if (ajo.kuvat) g.setPhotoPool(KUVAT);
  return g;
}

function pelaa(ajo, tallennaVali) {
  let g = luo(ajo);
  const rngAlussa = g.rngCalls;
  const laatat = [...g.tokens.entries()];
  const askeleet = [tila(g, 'alku')];
  if (ajo.kaytetyt != null) {
    for (const q of pack.duels.slice(0, ajo.kaytetyt)) g.usedQuestions.add(q.q);
    askeleet.push(tila(g, `kaytetyt:${ajo.kaytetyt}`));
  }
  if (ajo.raha != null) {
    g.player.money = ajo.raha;
    g.phase = 'action';
    g.beginTurn();
    askeleet.push(tila(g, `raha:${ajo.raha}`));
  }
  let valinnat = 0;
  let heitot = 0;
  let avatut = 0;
  let apuKokeiltu = false;
  let d = -1;        // kaksintaistelun numero
  let kohta = 0;     // kohta KULKU-listassa
  const lajit = {};
  for (let n = 0; n < MAX_TEOT && g.turnCount <= VUOROT; n++) {
    let teko;
    let tulos;
    if (g.phase === 'action') {
      const tavat = g.travelModes();
      if (!tavat.length) throw new Error(`ei tapoja: siemen ${ajo.seed}`);
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
          if (g.phase === 'duel') { d++; kohta = 0; }
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
    } else if (g.phase === 'duel') {
      const duel = g.duel;
      const merkki = KULKU[d % KULKU.length][kohta++];
      if (merkki === undefined) throw new Error(`kaksintaistelun käsikirjoitus loppui (siemen ${ajo.seed})`);
      const odotaVirhe = merkki.endsWith('!');
      const m = merkki.replace(/!$/, '');
      if (m.startsWith('raha:')) {
        g.player.money = Number(m.slice(5));
        teko = m;
        tulos = { ok: true };
      } else if (m === 'oikein' || m === 'uudelleen') {
        teko = `duel:${duel.correct}`;
        tulos = g.answerDuel(duel.correct);
      } else if (m === 'vaarin') {
        const i = duel.options.findIndex((_, j) => j !== duel.correct && !duel.hidden.includes(j));
        teko = `duel:${i}`;
        tulos = g.answerDuel(i);
      } else if (m === 'piilotettu') {
        teko = `duel:${duel.hidden[0]}`;
        tulos = g.answerDuel(duel.hidden[0]);
      } else if (m === 'helpotus') {
        teko = 'relief';
        tulos = g.actionDuelRelief();
      } else if (m === 'aika') {
        teko = 'duelTimeout';
        tulos = g.timeoutDuel();
      } else if (m === 'sulje') {
        teko = 'closeDuel';
        tulos = g.closeDuel();
      } else throw new Error(`tuntematon merkki ${merkki}`);
      if (odotaVirhe === tulos.ok) throw new Error(`${merkki}: odotettiin ${odotaVirhe ? 'virhettä' : 'onnistumista'} (siemen ${ajo.seed})`);
      if (odotaVirhe) teko += '!';
      lajit[merkki] = (lajit[merkki] ?? 0) + 1;
    } else {
      throw new Error(`odottamaton vaihe ${g.phase} (siemen ${ajo.seed})`);
    }
    if (!tulos.ok && !teko.endsWith('!')) throw new Error(`${teko} epäonnistui: ${tulos.error} (siemen ${ajo.seed})`);
    askeleet.push(tila(g, teko, tulos.ok ? null : tulos.error));
    if (tallennaVali > 0 && (n + 1) % tallennaVali === 0) {
      const data = JSON.parse(JSON.stringify(g.toJSON()));
      g = Game.fromJSON(data);
      if (!g) throw new Error('fromJSON palautti null');
      kytke(g, ajo);
    }
  }
  return { rngAlussa, laatat, askeleet, kaksintaisteluja: d + 1, lajit };
}

const jaljet = [];
const lajit = {};
for (const ajo of AJOT) {
  const suora = pelaa(ajo, 0);
  const tallentaen = pelaa(ajo, TALLENNUSVALI);
  if (!isDeepStrictEqual(suora.askeleet, tallentaen.askeleet)) {
    const i = suora.askeleet.findIndex((a, j) => !isDeepStrictEqual(a, tallentaen.askeleet[j]));
    throw new Error(`webin tallennus muuttaa jälkeä (siemen ${ajo.seed}, askel ${i}):\n${JSON.stringify(suora.askeleet[i])}\n${JSON.stringify(tallentaen.askeleet[i])}`);
  }
  for (const [k, v] of Object.entries(suora.lajit)) lajit[k] = (lajit[k] ?? 0) + v;
  const { seed, start, liput, kuvat, taso = 'normal', raha = null, kaytetyt = null } = ajo;
  jaljet.push({
    seed, start, liput, kuvat, taso, raha, kaytetyt,
    rngAlussa: suora.rngAlussa, laatat: suora.laatat, kaksintaisteluja: suora.kaksintaisteluja,
    askeleet: suora.askeleet,
  });
}

// Kattavuus: jokainen haara ja kokoelman loppuminen (fresh tyhjä → koko pakka).
const kaksintaisteluja = jaljet.reduce((s, j) => s + j.kaksintaisteluja, 0);
const suurin = Math.max(...jaljet.map((j) => j.kaksintaisteluja));
const puuttuu = KULKU.flat().filter((m) => !lajit[m]);
const loppui = jaljet.some((j) => j.kaytetyt != null && j.kaksintaisteluja > pack.duels.length - j.kaytetyt);
if (puuttuu.length || !loppui) {
  throw new Error(`jälki ei kata kaikkea: puuttuu ${puuttuu.join(', ')}, kokoelma loppui ${loppui}`);
}

const tekoja = jaljet.reduce((s, j) => s + j.askeleet.length - 1, 0);
const rivit = jaljet.map((j) => {
  const { askeleet, ...paa } = j;
  const alku = JSON.stringify(paa).slice(0, -1);
  return `${alku},"askeleet":[\n${askeleet.map((a) => JSON.stringify(a)).join(',\n')}\n]}`;
});
writeFileSync(join(tama, 'kaksintaistelujalki.json'), `{"$kuvaus":"Verkkopelin js/game.js kaksintaistelujälki (Kultaiset/tee-kaksintaistelujalki.mjs). Älä muokkaa käsin.",\n"lauta":"maailmankartta","vuorot":${VUOROT},"maxTeot":${MAX_TEOT},"kuvat":${JSON.stringify(KUVAT)},"maarat":${JSON.stringify(Object.entries(KOE_MAARAT))},"kulku":${JSON.stringify(KULKU)},\n"jaljet":[\n${rivit.join(',\n')}\n]}\n`);
console.log(`kaksintaistelujalki.json: ${jaljet.length} ajoa, ${tekoja} tekoa, kaksintaisteluja ${kaksintaisteluja} (suurin ${suurin})`, lajit);
