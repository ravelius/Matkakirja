// KULTAINEN PULMAJÄLKI: verkkopelin isoisän pulmat (js/game.js pendingPuzzle,
// openPuzzle, answerQuiz/closeQuiz-pulmahaarat, js/packs/*-puzzles.js
// generate(rng)) kirjataan tiedostoon Kultaiset/pulmajalki.json. C#-portti
// (Peli/Pulmat.cs) toistaa jäljen testissä Testit/PulmaTestit.cs
// identtisesti, myös satunnaislukukutsujen määrän ja tallennuksen yli.
//
// Käyttö: node Kultaiset/tee-pulmajalki.mjs [verkkopelin js-kansio]
//
// OSAT:
// 1. arvonnat — jokainen pulmageneraattori suoraan mulberry32-lähteellä
//    siemenillä 1…25: tulos (sketch, q, options, correct, hint, kuvat) ja
//    kulutettujen arvontojen määrä.
// 2. pulma-ajot — peli alkaa pulmakaupungista (5 siementä per pulma; joka
//    toisessa aloituskaupungin laatta poistetaan heti ensimmäisen vuoron
//    jälkeen, jotta myös laataton pulma tulee katetuksi). Käsikirjoitus:
//      action: jos 'stay' tarjolla → actionTravel('stay'), muuten ajo loppuu.
//      quiz (vastaamatta): muunnelma = MUUNNELMAT[(ajo + avatut − 1) % 6]:
//        oikein → answerQuiz(correct); vaarin → ensimmäinen piilottamaton väärä;
//        vihje → actionHint (jos vihje ja ≥ 40 £) ja sitten oikein;
//        puolita → actionFiftyFifty (jos ≥ 4 vaihtoehtoa ja ≥ 80 £), sitten väärin;
//        sulje → closeQuiz vastaamatta; aika → timeoutQuiz.
//      quiz (vastattu) → closeQuiz. Muu vaihe lopettaa.
//      Enintään 12 tekoa.
// 3. peli-ajot — koko peli pulmineen kysymysjäljen käsikirjoituksella
//    (tee-kysymysjalki.mjs, C# KyselyKasikirjoitus). Tapahtumakortit on poistettu
//    natiivista (Fablen tarkastus C1 23.9.2026; maailmankartalla niitä ei ole).
//
// RAJAUKSET (kuten pelijäljessä): lippukysymykset pois (flagTargets → []),
// valokuvapooli tyhjä (rosvot ja kaksintaistelu poistettu pelistä),
// linssit pois (linssiAarteet = {}), viimeAarre nollataan ennen tekoa.
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const { Game } = await import(pathToFileURL(join(JS, 'game.js')).href);
const { packById } = await import(pathToFileURL(join(JS, 'pack.js')).href);
// v2150 (#2963): pulma nimeää generaattorinsa tunnisteella (generaattori), funktio
// rekisteristä js/pulmageneraattorit.js; vanhemmassa webissä pulma.generate.
const { pulmanGeneraattori } = await import(pathToFileURL(join(JS, 'pulmageneraattorit.js')).href)
  .catch(() => ({ pulmanGeneraattori: () => null }));
const generaattori = (pulma) => pulma.generate ?? pulmanGeneraattori(pulma);


const ordinaali = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const pack = packById('maailmankartta');
if (pack.id !== 'maailmankartta') throw new Error('maailmankartta puuttuu');
if ((pack.events ?? []).length) throw new Error('maailmankartalla on tapahtumia: natiivi ei tue tapahtumakortteja (C1)');
const PULMAT = pack.puzzles;
if (PULMAT.length < 11) throw new Error(`pulmia vain ${PULMAT.length}`);
function lahde(siemen) {
  let a = siemen >>> 0;
  const f = () => {
    f.kutsuja++;
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  f.kutsuja = 0;
  return f;
}

const ei = (x) => (x === undefined ? null : x);

// --- 1. arvonnat ---------------------------------------------------------
const arvonnat = [];
for (const pulma of PULMAT) {
  const generate = generaattori(pulma);
  if (!generate) continue;
  for (let siemen = 1; siemen <= 25; siemen++) {
    const rng = lahde(siemen);
    const t = generate(rng);
    arvonnat.push({
      id: pulma.id,
      siemen,
      kutsuja: rng.kutsuja,
      tulos: {
        sketch: ei(t.sketch), q: ei(t.q), options: t.options, correct: t.correct,
        hint: ei(t.hint), kuvat: ei(t.kuvat),
      },
    });
  }
}

// --- tilan kirjaus ----------------------------------------------------------
const pos = (p) => (p.pos.type === 'city' ? `c:${p.pos.city}` : `e:${p.pos.edge}:${p.pos.idx}`);

// Muun kuin pulman kysymyksestä kirjataan tiivis muoto (kuten pelijäljessä):
// sen kentät on jo verrattu kysymysjäljessä.
function kysymys(q) {
  if (!q) return null;
  if (q.kind !== 'puzzle') {
    return {
      kind: q.kind ?? 'quiz', cityId: q.cityId, hard: !!q.hard, kaari: !!q.kaari, explore: !!q.explore,
      question: q.question, options: q.options, correct: q.correct, hidden: q.hidden, chosen: q.chosen,
      right: q.right, aarreLukittui: ei(q.aarreLukittui), found: ei(q.found),
    };
  }
  return {
    kind: q.kind ?? 'quiz',
    laatta: !!q.laatta,
    cityId: q.cityId,
    puzzleId: ei(q.puzzleId),
    sketchData: ei(q.sketchData),
    title: ei(q.title),
    selite: ei(q.selite),
    hard: !!q.hard,
    kaari: !!q.kaari,
    explore: !!q.explore,
    question: q.question,
    fact: ei(q.fact),
    source: q.source ?? [],
    options: q.options,
    kuvat: ei(q.kuvat),
    kuvaLahteet: ei(q.kuvaLahteet),
    correct: q.correct,
    hint: ei(q.hint),
    hintShown: !!q.hintShown,
    hidden: q.hidden,
    chosen: q.chosen,
    right: q.right,
    timedOut: !!q.timedOut,
    seconds: ei(q.seconds),
    aarreLukittui: ei(q.aarreLukittui),
    found: ei(q.found),
  };
}

function tila(g, teko) {
  const p = g.player;
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
    quizAsked: p.quizAsked,
    quizCorrect: p.quizCorrect,
    kaytetyt: g.usedQuestions.size,
    lastForm: g.lastForm,
    laatat: g.tokens.size,
    kaannetyt: g.revealed.size,
    tutkittuja: g.explored.size,
    // Kohtaamiset ja tutkitut on verrattu kysymysjäljessä; tässä riittää määrä.
    kaaria: [...g.kaariYritykset.values()].reduce((s, v) => s + v.yritykset * 2 + (v.onnistui ? 1 : 0), 0),
    lukot: [...g.aarreLukot].map((k) => k.split(':')[1]).sort(ordinaali),
    havainto: g.arrivalFact?.cityId ?? null,
    pulmaOdottaa: g.pendingPuzzle()?.id ?? null,
    puzzlesSeen: [...g.puzzlesSeen].map((k) => k.split(':')[1]).sort(ordinaali),
    puzzlePrevPhase: g.puzzlePrevPhase,
    quiz: kysymys(g.quiz),
  };
}

function uusiPeli(lauta, seed, start) {
  const g = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start }], pack: lauta, seed });
  g.linssiAarteet = {};
  g.flagTargets = () => [];
  return g;
}

const lajit = {};
const laske = (k) => { lajit[k] = (lajit[k] ?? 0) + 1; };

// --- 2. pulma-ajot ---------------------------------------------------------
const MUUNNELMAT = ['oikein', 'vaarin', 'vihje', 'puolita', 'sulje', 'aika'];
const pulmaAjot = [];
let ajoNro = 0;
for (const pulma of PULMAT) {
  for (let seed = 1; seed <= 5; seed++) {
    const laatatonta = seed % 2 === 0;
    const g = uusiPeli(pack, seed * 1000 + ajoNro, pulma.city);
    const rngAlussa = g.rngCalls;
    if (laatatonta) g.tokens.delete(pulma.city);
    const askeleet = [tila(g, 'alku')];
    let avatut = 0;
    let apu = false;
    for (let n = 0; n < 12; n++) {
      let teko;
      let tulos;
      g.viimeAarre = null;
      if (g.phase === 'action') {
        if (!g.travelModes().includes('stay')) break;
        teko = 'stay';
        tulos = g.actionTravel('stay');
        if (g.phase === 'quiz') {
          avatut++; apu = false;
          laske(`avattu:${g.quiz.kind ?? 'quiz'}${g.quiz.kind === 'puzzle' ? (g.quiz.laatta ? '+laatta' : '-laatta') : ''}`);
        }
      } else if (g.phase === 'quiz') {
        const q = g.quiz;
        const m = MUUNNELMAT[(ajoNro + avatut - 1) % MUUNNELMAT.length];
        const p = g.player;
        if (q.chosen !== null) {
          teko = 'close'; tulos = g.closeQuiz();
        } else if (m === 'vihje' && !apu && q.hint && p.money >= 40) {
          apu = true; teko = 'hint'; tulos = g.actionHint();
        } else if (m === 'puolita' && !apu && q.options.length >= 4 && p.money >= 80) {
          apu = true; teko = 'fiftyfifty'; tulos = g.actionFiftyFifty();
        } else if (m === 'sulje') {
          teko = 'close'; tulos = g.closeQuiz();
        } else if (m === 'aika') {
          teko = 'timeout'; tulos = g.timeoutQuiz();
        } else {
          const oikein = m === 'oikein' || m === 'vihje';
          const valinta = oikein ? q.correct
            : q.options.findIndex((_, i) => i !== q.correct && !q.hidden.includes(i));
          teko = `answer:${valinta}`;
          tulos = g.answerQuiz(valinta);
        }
        if (q.kind === 'puzzle') laske(`pulma:${teko.replace(/:.*/, '')}`);
      } else {
        break;
      }
      if (!tulos.ok) throw new Error(`${teko} epäonnistui: ${tulos.error} (${pulma.id} siemen ${seed})`);
      askeleet.push(tila(g, teko));
    }
    pulmaAjot.push({
      ajo: ajoNro, pulma: pulma.id, seed: seed * 1000 + ajoNro, start: pulma.city, laatatonta, rngAlussa,
      askeleet,
    });
    ajoNro++;
  }
}

// --- 3. peli-ajot ----------------------------------------------------------
const VUOROT = 100;
const MAX_TEOT = 500;
const PELIAJOT = [
  { seed: 3, start: 'pariisi' },
  { seed: 17, start: 'kairo' },
  { seed: 23, start: 'rooma' },
  { seed: 31, start: 'venetsia' },
  { seed: 47, start: 'ateena' },
  { seed: 59, start: 'kapkaupunki' },
  { seed: 71, start: 'dubrovnik' },
  { seed: 83, start: 'lontoo' },
  { seed: 97, start: 'tokio' },
  { seed: 101, start: 'timbuktu' },
];
const peliAjot = [];
for (const ajo of PELIAJOT) {
  const { seed, start } = ajo;
  const g = uusiPeli(pack, seed, start);
  const rngAlussa = g.rngCalls;
  const askeleet = [tila(g, 'alku')];
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
        if (g.phase === 'quiz') {
          avatut++; apuKokeiltu = false;
          if (g.quiz.kind === 'puzzle') laske(`peli:pulma${g.quiz.laatta ? '+laatta' : '-laatta'}`);
        }
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
    askeleet.push(tila(g, teko));
  }
  peliAjot.push({ seed, start, rngAlussa, askeleet });
}

// Kattavuus: jokainen pulma avautuu, laatallinen ja laataton pulma, kaikki
// muunnelmat, ja peliajoissa pulmia.
const avatutPulmat = new Set(pulmaAjot.flatMap((a) => a.askeleet.map((s) => s.quiz?.puzzleId).filter(Boolean)));
const puuttuu = [
  ...PULMAT.filter((p) => !avatutPulmat.has(p.id)).map((p) => `pulma ${p.id}`),
  ...['avattu:puzzle+laatta', 'avattu:puzzle-laatta', 'pulma:answer', 'pulma:hint', 'pulma:fiftyfifty',
    'pulma:close', 'pulma:timeout', 'peli:pulma+laatta'].filter((k) => !lajit[k]),
];
if (puuttuu.length) throw new Error(`jälki ei kata: ${puuttuu.join(', ')}`);

const riveina = (lista) => lista.map((j) => {
  const { askeleet, ...paa } = j;
  const alku = JSON.stringify(paa).slice(0, -1);
  return `${alku},"askeleet":[\n${askeleet.map((a) => JSON.stringify(a)).join(',\n')}\n]}`;
});
writeFileSync(join(tama, 'pulmajalki.json'),
  `{"$kuvaus":"Verkkopelin pulmat (Kultaiset/tee-pulmajalki.mjs). Älä muokkaa käsin.",\n`
  + `"lauta":"maailmankartta","pulmat":${JSON.stringify(PULMAT.map((p) => ({ id: p.id, city: p.city, generate: !!generaattori(p) })))},\n`
  + `"muunnelmat":${JSON.stringify(MUUNNELMAT)},"vuorot":${VUOROT},"maxTeot":${MAX_TEOT},\n`
  + `"arvonnat":[\n${arvonnat.map((a) => JSON.stringify(a)).join(',\n')}\n],\n`
  + `"pulmaAjot":[\n${riveina(pulmaAjot).join(',\n')}\n],\n`
  + `"peliAjot":[\n${riveina(peliAjot).join(',\n')}\n]}\n`);
const tekoja = (l) => l.reduce((s, j) => s + j.askeleet.length - 1, 0);
console.log(`pulmajalki.json: ${arvonnat.length} arvontaa, ${pulmaAjot.length} pulma-ajoa (${tekoja(pulmaAjot)} tekoa), `
  + `${peliAjot.length} peliajoa (${tekoja(peliAjot)} tekoa)`, lajit);
