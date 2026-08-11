// Pelaa botteja vastaan botteja ja raportoi kuinka pitkiä pelit ovat.
//
//   node tools/simulate.mjs              kaikki laudat, 200 peliä kussakin
//   node tools/simulate.mjs europe 500   yksi lauta, 500 peliä
//
// Tarkoitus on kahtalainen: nähdä että jokainen peli päättyy (ei ikuisia
// kierroksia) ja pitää pelin pituus pelattavana laudan tasapainoa säädettäessä.

import { Game, mulberry32 } from '../js/game.js';
import {
  chooseDuelAnswer, chooseMove, chooseQuizAnswer, chooseTravel,
  wantsDuelBypass, wantsDuelRelief, wantsFiftyFifty, wantsHint,
} from '../js/ai.js';
import { PACKS, packById } from '../js/pack.js';

const MAX_STEPS = 20000;

/** Yksi botin toimenpide pelin nykyisessä vaiheessa. */
function step(game) {
  switch (game.phase) {
    case 'move': {
      const key = chooseMove(game);
      if (key) game.actionMove(key);
      else game.endTurn();
      return;
    }
    case 'quiz':
      if (game.quiz.chosen !== null) game.closeQuiz();
      else if (wantsHint(game)) game.actionHint();
      else if (wantsFiftyFifty(game)) game.actionFiftyFifty();
      else game.answerQuiz(chooseQuizAnswer(game));
      return;
    case 'duel':
      if (game.duel.chosen !== null) game.closeDuel();
      else if (wantsDuelBypass(game)) game.actionDuelBypass();
      else if (wantsDuelRelief(game)) game.actionDuelRelief();
      else game.answerDuel(chooseDuelAnswer(game));
      return;
    case 'event':
      game.closeEvent();
      return;
    case 'offer':
      game.actionQuiz();
      return;
    case 'roll':
      game.actionRoll();
      return;
    default: {
      const travel = chooseTravel(game);
      if (travel.type === 'fly') game.actionFly(travel.destination);
      else game.actionTravel(travel.type);
    }
  }
}

function simulate(pack, games) {
  const starts = pack.cities.filter((c) => c.start);
  const rounds = [];
  const unfinished = [];
  let star = 0;

  for (let seed = 1; seed <= games; seed++) {
    const game = new Game({
      pack,
      players: ['A', 'B', 'C'].map((name, i) => ({
        name,
        color: ['#f00', '#00f', '#0f0'][i],
        start: starts[i % starts.length].id,
        isBot: true,
      })),
      rng: mulberry32(seed),
    });

    let steps = 0;
    while (game.phase !== 'over' && steps < MAX_STEPS) {
      step(game);
      steps++;
    }
    if (game.phase !== 'over') {
      unfinished.push(seed);
      continue;
    }
    rounds.push(game.turnCount);
    if (game.winner.stars) star++;
  }

  rounds.sort((a, b) => a - b);
  return {
    id: pack.id,
    played: rounds.length,
    unfinished,
    min: rounds[0],
    median: rounds[rounds.length >> 1],
    max: rounds.at(-1),
    star,
  };
}

const [which, count] = process.argv.slice(2);
const games = Number(count) || 200;
const boards = which ? [packById(which)] : PACKS;

let failed = false;
for (const pack of boards) {
  const r = simulate(pack, games);
  const tail = r.unfinished.length ? ` — EI PÄÄTTYNYT: ${r.unfinished.join(', ')}` : '';
  console.log(
    `${r.id.padEnd(11)} kierroksia ${r.min}/${r.median}/${r.max} (min/med/max)`
    + `  tähtivoittoja ${r.star}/${r.played}${tail}`,
  );
  if (r.unfinished.length) failed = true;
}
if (failed) process.exitCode = 1;
