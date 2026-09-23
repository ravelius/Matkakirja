// KULTAINEN KYSYMYSJÄLKI: verkkopelin js/game.js pelaa deterministisen
// käsikirjoituksen, jossa kaupunkeja tutkitaan (Tutki paikka = 'stay'),
// kysymyksiä avataan ja niihin vastataan, ja jokaisen teon jälkeinen tila
// kirjataan tiedostoon Kultaiset/kysymysjalki.json. C#-portti
// (Peli/Kysely.cs, Peli/Kokemus.cs) toistaa saman käsikirjoituksen testissä
// Testit/KyselyTestit.cs ja vaatii identtisen jäljen, myös tallennuksen yli.
//
// Käyttö: node Kultaiset/tee-kysymysjalki.mjs [verkkopelin js-kansio]
//
// RAJAUKSET (erä 2 ei tee laattoja, pulmia eikä kaksintaisteluja):
// - Laatat: revealToken ja lukitseAarre korvataan ENNEN pelin luontia
//   minimiversioilla, jotka vain poistavat laatan (ei rahaa, ei arvontaa,
//   ei rosvoa). Jako on oikea (C#: Matka.Luo(…, Laattamaarat)); samat kohdat
//   ovat C#:ssa koukut Kysely.LaattaKaantyy ja Kysely.AarreLukittuu, jotka
//   testi korvaa rajatuilla (RajatutLaatat). Oikeat käännöt: pelijalki.
// - Pulmat (isoisän luonnoskirja) vaativat generate-funktiot, joita
//   sisältöpaketissa ei ole (pulmat.json: "siirretään käsin"):
//   pendingPuzzle kytketään pois. C#: koukku Kysely.PulmaOdottaa.
// - Tapahtumakortit: maailmankartalla ei ole events-pakkaa, joten muodon
//   paino on jo webissä nolla. C#: koukku Kysely.AvaaTapahtuma.
// - Lippukysymyksen maat (pack.map.countryShapes: nimi ja lippu) eivät ole
//   sisältöpaketissa. Skripti kirjoittaa ne testiaineistoksi
//   Kultaiset/liput.json; ajoissa, joissa liput = false, lippumuoto
//   kytketään pois (flagTargets → []), kuten C#:ssa ilman Kysely.Liput-listaa.
// - Valokuvakysymyksen kuvat syöttää käyttöliittymä (setPhotoPool);
//   skripti antaa ajoille, joissa kuvat = true, joka neljännen kaupungin.
//
// KÄSIKIRJOITUS (sama kuin KyselyTestit.Kasikirjoitus):
//   vaihe action: tavat = travelModes(); muut = tavat ilman 'stay'.
//     Jos 'stay' on tarjolla ja (valinnat % 2 === 0 tai muut on tyhjä):
//       vaikea = tokenHere() && hardAvailable(kaupunki) && avatut % 4 === 3
//       → actionTravel('stay', { hard: vaikea }).
//     Muuten tapa = muut[valinnat % muut.length] kuten matkajäljessä
//     (bus → pienin kohde, fly → pienin kohde, muut actionTravel).
//     valinnat++ joka action-päätöksellä.
//   vaihe roll / move: kuten matkajäljessä.
//   vaihe quiz (n = avattujen kysymysten määrä ennen tätä, 0:sta):
//     vastaamatta ja apu vielä kokeilematta: n % 6 === 1 → actionFiftyFifty,
//       n % 6 === 2 → actionHint, n % 6 === 3 → actionKaveriapu (vain kun
//       ehdot täyttyvät; muuten suoraan vastaukseen).
//     vastaamatta: n % 6 === 4 → timeoutQuiz; n % 6 === 5 → closeQuiz
//       (luopuminen); muuten answerQuiz(oikea, jos n % 3 !== 2, muuten
//       ensimmäinen piilottamaton väärä).
//     vastattu → closeQuiz.
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const { Game } = await import(pathToFileURL(join(JS, 'game.js')).href);
const { packById } = await import(pathToFileURL(join(JS, 'pack.js')).href);
const { tietajataso } = await import(pathToFileURL(join(JS, 'tietajatasot.js')).href);

// --- rajaukset ennen pelin luontia -------------------------------------
Game.prototype.revealToken = function revealTokenRajattu(cityId) {
  const type = this.tokens.get(cityId);
  if (!type) return null;
  this.tokens.delete(cityId);
  return type;
};
Game.prototype.lukitseAarre = function lukitseAarreRajattu(cityId) {
  this.aarreLukot ??= new Set();
  const avain = `${this.pack.id}:${cityId}`;
  if (this.aarreLukot.has(avain)) return false;
  this.aarreLukot.add(avain);
  this.tokens.delete(cityId);
  return true;
};
Game.prototype.pendingPuzzle = () => null;

const VUOROT = 40;
const MAX_TEOT = 600;
const ordinaali = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const pack = packById('maailmankartta');
if (pack.id !== 'maailmankartta') throw new Error('maailmankartta puuttuu');
if ((pack.events ?? []).length) throw new Error('maailmankartalla on tapahtumia: rajaus ei enää päde');

// Lippujen testiaineisto (ei sisältöpaketissa): countryShapes-järjestyksessä.
const liput = Object.entries(pack.map?.countryShapes ?? {})
  .map(([iso, m]) => ({ iso, nimi: m.nimi ?? null, lippu: m.lippu ?? null }));
writeFileSync(join(tama, 'liput.json'), JSON.stringify({
  $kuvaus: 'Lippukysymyksen maat (web pack.map.countryShapes: iso, nimi, lippu) testiaineistoksi. Ei sisältöpaketissa. Tee: Kultaiset/tee-kysymysjalki.mjs.',
  maat: liput,
}, null, 1) + '\n');

const KUVAT = pack.cities.filter((_, i) => i % 4 === 0).map((c) => c.id);

const AJOT = [
  { seed: 1, start: 'pariisi', liput: true, kuvat: true },
  { seed: 7, start: 'rooma', liput: true, kuvat: false },
  { seed: 42, start: 'praha', liput: false, kuvat: true },
  { seed: 2026, start: 'istanbul', liput: true, kuvat: true },
  { seed: 5, start: 'lontoo', liput: false, kuvat: false },
  { seed: 99, start: 'kairo', liput: true, kuvat: true, taso: 'easy' },
  { seed: 13, start: 'manila', liput: true, kuvat: true },
  { seed: 11, start: 'dublin', liput: true, kuvat: false, raha: 40 },
  { seed: 21, start: 'tokio', liput: true, kuvat: true },
  { seed: 33, start: 'newyork', liput: true, kuvat: true },
  { seed: 58, start: 'rio', liput: false, kuvat: true, taso: 'easy' },
  { seed: 77, start: 'sydney', liput: true, kuvat: true },
  { seed: 404, start: 'mumbai', liput: true, kuvat: false },
  { seed: 8, start: 'kapkaupunki', liput: true, kuvat: true },
];

const pos = (p) => (p.pos.type === 'city' ? `c:${p.pos.city}` : `e:${p.pos.edge}:${p.pos.idx}`);

function kysymys(q) {
  if (!q) return null;
  return {
    kind: q.kind ?? 'quiz',
    cityId: q.cityId,
    hard: !!q.hard,
    kaari: !!q.kaari,
    explore: !!q.explore,
    frame: q.frame ?? null,
    question: q.question,
    fact: q.fact ?? null,
    source: q.source ?? [],
    place: q.place ?? null,
    photoCity: q.photoCity ?? null,
    flagFile: q.flagFile ?? null,
    options: q.options,
    correct: q.correct,
    hint: q.hint ?? null,
    hintShown: !!q.hintShown,
    hidden: q.hidden,
    kaveriapu: !!q.kaveriapu,
    chosen: q.chosen,
    right: q.right,
    timedOut: !!q.timedOut,
    seconds: q.seconds,
    aarreLukittui: q.aarreLukittui ?? null,
    found: q.found ?? null,
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
    taso: tietajataso(p.xp).taso,
    nousut: g.takeTietajaNousut().map((t) => t.taso),
    quizAsked: p.quizAsked,
    quizCorrect: p.quizCorrect,
    tietoprosentti: g.knowledgePercent(),
    kaytetyt: g.usedQuestions.size,
    lastForm: g.lastForm,
    laatat: g.tokens.size,
    tutkitut: [...g.explored].map((k) => k.split(':')[1]).sort(ordinaali),
    kaari: [...g.kaariYritykset.entries()]
      .map(([k, v]) => `${k.split(':')[1]}=${v.yritykset}${v.onnistui ? '+' : ''}`).sort(ordinaali),
    lukot: [...g.aarreLukot].map((k) => k.split(':')[1]).sort(ordinaali),
    havainto: g.arrivalFact?.cityId ?? null,
    quiz: kysymys(g.quiz),
  };
}

const jaljet = [];
const lajit = {};
for (const ajo of AJOT) {
  const { seed, start, liput: lippuja, kuvat, taso = 'normal', raha = null } = ajo;
  const g = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start, quizLevel: taso }], pack, seed,
  });
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
    if (teko.startsWith('stay') && askel.quiz) {
      const m = `muoto:${askel.quiz.kind}${askel.quiz.kaari ? '+kaari' : ''}${askel.quiz.explore ? '+tutki' : ''}${askel.quiz.hard ? '+vaikea' : ''}`;
      lajit[m] = (lajit[m] ?? 0) + 1;
    }
  }
  jaljet.push({ seed, start, liput: lippuja, kuvat, taso, raha, rngAlussa, laatat, askeleet });
}

const tekoja = jaljet.reduce((s, j) => s + j.askeleet.length - 1, 0);
// Yksi askel per rivi: diffit pysyvät luettavina.
const rivit = jaljet.map((j) => {
  const { askeleet, ...paa } = j;
  const alku = JSON.stringify(paa).slice(0, -1);
  return `${alku},"askeleet":[\n${askeleet.map((a) => JSON.stringify(a)).join(',\n')}\n]}`;
});
writeFileSync(join(tama, 'kysymysjalki.json'), `{"$kuvaus":"Verkkopelin js/game.js kysymysjälki (Kultaiset/tee-kysymysjalki.mjs). Älä muokkaa käsin.",\n"lauta":"maailmankartta","vuorot":${VUOROT},"maxTeot":${MAX_TEOT},"kuvat":${JSON.stringify(KUVAT)},\n"jaljet":[\n${rivit.join(',\n')}\n]}\n`);
console.log(`kysymysjalki.json: ${jaljet.length} ajoa, ${tekoja} tekoa`, lajit);
