// Yksinkertainen tietokonevastustaja.
//
// Strategia:
//   1. Jos hallussa on tähti tai (tähti löytynyt ja hallussa hevosenkenkä) -> kotiin.
//   2. Muuten: käännä laatta jos seisot sellaisen päällä.
//   3. Muuten: liiku kohti lähintä kääntämätöntä laattaa.

import { cityDistances, distanceOf } from './rules.js';
import { DUEL_BYPASS_SHOES, FIFTY_FIFTY_PRICE, FLIGHT_PRICE, HINT_PRICE } from './game.js';

// Kuinka usein botti osaa vastata tietovisaan oikein.
export const BOT_SKILL = 0.55;

function racingHome(game, p) {
  // Vaelluksessa ei kiirehditä kotiin, koska peli ei pääty.
  if (game.roaming) return false;
  return p.stars > 0 || (game.starFound && p.horseshoes > 0);
}

/** Etäisyydet kohteisiin: yhdistetty kartta, jossa jokainen kohde on nollaetäisyydellä. */
function distancesToAny(game, targets, money) {
  const merged = new Map();
  for (const target of targets) {
    const dist = cityDistances(game.board, target, money);
    for (const [city, d] of dist) {
      if (d < (merged.get(city) ?? Infinity)) merged.set(city, d);
    }
  }
  return merged;
}

function goalDistances(game, p, money = p.money) {
  if (racingHome(game, p)) {
    const starts = game.players.map((pl) => pl.start);
    return distancesToAny(game, [...new Set(starts)], money);
  }
  const targets = [...game.tokens.keys()];
  if (targets.length === 0) {
    return distancesToAny(game, [...new Set(game.players.map((pl) => pl.start))], money);
  }
  return distancesToAny(game, targets, money);
}

/**
 * Lyhin tavoite-etäisyys niiden naapurikaupunkien joukossa, joihin nykyisestä
 * kaupungista pääsee annetulla matkustustavalla.
 */
function nearestByMode(game, dist, type) {
  const city = game.cityOf();
  if (!city) return Infinity;
  let best = Infinity;
  for (const edgeId of game.board.adj.get(city.id)) {
    const edge = game.board.edgeById.get(edgeId);
    if (edge.type !== type) continue;
    const other = edge.a === city.id ? edge.b : edge.a;
    best = Math.min(best, dist.get(other) ?? Infinity);
  }
  return best;
}

/**
 * Valitsee matkustustavan vuoron alussa: jää paikalleen kokeilemaan kysymystä,
 * lennä, mene laivalla tai kulje maitse.
 */
export function chooseTravel(game) {
  const p = game.player;
  const modes = game.travelModes();
  if (modes.length === 0) return { type: 'land' };

  // Aarrekaupungissa kannattaa usein yrittää kysymystä uudelleen.
  if (modes.includes('stay') && !racingHome(game, p) && game.rng() < 0.55) {
    return { type: 'stay' };
  }

  const dist = goalDistances(game, p);
  const here = distanceOf(game.board, p.pos, dist);

  if (modes.includes('fly')) {
    const destinations = game.airportDestinations();
    const best = destinations.reduce(
      (acc, city) => Math.min(acc, dist.get(city) ?? Infinity),
      Infinity,
    );
    if (best + 4 < here) return { type: 'fly', destination: bestFlight(destinations, dist) };
  }

  if (modes.includes('sea')) {
    // Meritie kannattaa vain jos se vie lähemmäs kuin paras maatie. Vertailu
    // tehdään naapurikaupunkien kesken: jos katsottaisiin vain sitä pääseekö
    // tavoitteeseen kuivin jaloin, botti nousisi laivaan myös väärään suuntaan
    // aina kun viimeinen laatta on saarella. Lippuun on varaa jo siksi, että
    // 'sea' on tarjolla.
    const bySea = nearestByMode(game, dist, 'sea');
    const byLand = modes.includes('land') ? nearestByMode(game, dist, 'land') : Infinity;
    if (bySea < byLand) return { type: 'sea' };
  }

  if (modes.includes('land')) return { type: 'land' };
  return { type: modes[0] };
}

function bestFlight(destinations, dist) {
  return destinations.reduce((best, city) =>
    (dist.get(city) ?? Infinity) < (dist.get(best) ?? Infinity) ? city : best,
  );
}

/** Valitsee päätepisteen heiton jälkeen. */
export function chooseMove(game) {
  const p = game.player;
  const options = game.moveOptions();
  if (options.length === 0) return null;
  const dist = goalDistances(game, p);
  const home = racingHome(game, p);

  let best = options[0];
  let bestScore = -Infinity;
  for (const opt of options) {
    // Saavuttamaton kohde saa suuren mutta äärellisen etäisyyden, jotta
    // pisteytys pysyy vertailukelpoisena myös rahattomana.
    let score = -Math.min(distanceOf(game.board, opt.pos, dist), 999) * 10;
    if (!home && opt.hasToken) score += 60; // aarteen päälle pysähtyminen on arvokasta
    if (home && opt.city?.start) score += 1000;
    score += game.rng() * 3; // pikkuisen vaihtelua
    if (score > bestScore) {
      bestScore = score;
      best = opt;
    }
  }
  return best.key;
}

/** Ostaako botti 50:50:n? Vain jos rahaa riittää myös matkoihin. */
export function wantsFiftyFifty(game) {
  const quiz = game.quiz;
  const p = game.player;
  if (!quiz || quiz.hidden.length || quiz.chosen !== null) return false;
  if (p.money < FIFTY_FIFTY_PRICE + 100) return false;
  return game.rng() < 0.5;
}

/** Ostaako botti sanallisen vihjeen? Halvempana se kelpaa useammin. */
export function wantsHint(game) {
  const quiz = game.quiz;
  const p = game.player;
  if (!quiz || !quiz.hint || quiz.hintShown || quiz.chosen !== null) return false;
  if (p.money < HINT_PRICE + 100) return false;
  return game.rng() < 0.45;
}

/**
 * Botin vastaus tietovisaan: oikein BOT_SKILL:n todennäköisyydellä.
 * Vihjeet nostavat osumatarkkuutta — 50:50 eniten, koska vaihtoehtoja jää kaksi.
 */
export function chooseQuizAnswer(game, skill = BOT_SKILL) {
  const quiz = game.quiz;
  if (!quiz) return 0;
  const open = quiz.options.map((_, i) => i).filter((i) => !quiz.hidden.includes(i));
  let chance = skill;
  if (quiz.hintShown) chance = Math.max(chance, 0.7);
  if (quiz.hidden.length) chance = Math.max(chance, 0.85);
  if (game.rng() < chance) return quiz.correct;
  const wrong = open.filter((i) => i !== quiz.correct);
  return wrong.length ? wrong[Math.floor(game.rng() * wrong.length)] : quiz.correct;
}

/** Tarttuuko botti siirron jälkeen tarjottuun kysymykseen? Kyllä — se on ilmainen. */
export function wantsQuiz() {
  return true;
}

// --- rosvon kaksintaistelu -------------------------------------------------

/** Ohittaako botti rosvon hevosenkengillä? Aina, jos kenkiä riittää. */
export function wantsDuelBypass(game) {
  return game.player.horseshoes >= DUEL_BYPASS_SHOES;
}

/** Pyytääkö botti rosvolta helpotusta? Kerran, jos pelissä on paljon rahaa. */
export function wantsDuelRelief(game) {
  const duel = game.duel;
  if (!duel || duel.chosen !== null || duel.reliefs >= 1) return false;
  if (game.player.money < 400) return false;
  return game.rng() < 0.5;
}

/** Botin vastaus rosvolle: kahdeksasta vaihtoehdosta osuminen on vaikeampaa. */
export function chooseDuelAnswer(game) {
  const duel = game.duel;
  if (!duel) return 0;
  const open = duel.options.map((_, i) => i).filter((i) => !duel.hidden.includes(i));
  const chance = 0.3 + duel.reliefs * 0.25;
  if (game.rng() < chance) return duel.correct;
  const wrong = open.filter((i) => i !== duel.correct);
  return wrong.length ? wrong[Math.floor(game.rng() * wrong.length)] : duel.correct;
}
