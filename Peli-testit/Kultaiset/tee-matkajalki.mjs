// KULTAINEN MATKAJÄLKI: verkkopelin js/game.js pelaa deterministisen
// käsikirjoituksen, ja jokaisen teon jälkeinen tila kirjataan tiedostoon
// Kultaiset/matkajalki.json. C#-portti (Peli/Matka.cs) toistaa saman
// käsikirjoituksen testissä Testit/MatkaTestit.cs ja vaatii identtisen jäljen.
//
// Käyttö: node Kultaiset/tee-matkajalki.mjs [verkkopelin js-kansio]
//
// RAJAUKSET (portin erä B ei tee laattoja eikä kysymyksiä):
// - 'stay' (Tutki paikka) on sidottu laattoihin, pulmiin ja kohtaamisiin
//   (tehtavaTarjolla). Se kytketään tässä pois ENNEN pelin luontia, jotta
//   myös konstruktorin ensimmäinen beginTurn laskee automaattivalinnan
//   ilman sitä. C#:ssa sama koukku on Matka.TehtavaTarjolla (oletus false).
// - Konstruktori kuluttaa RNG:tä laattojen jakoon (createTokenPile,
//   jaaLaatat). Jälki kirjaa kulutuksen kenttään rngAlussa; C# jakaa laatat
//   samoin (Matka.UusiPeli(…, Laattamaarat), erä 3) ja tarkistaa kulutuksen.
// - needsAid lukee tavoitteiksi laattakaupungit. Laattoja ei käännetä
//   tässä käsikirjoituksessa, joten tavoitteita ovat kaikki kaupungit —
//   sama kuin C#:n oletus (kääntämättömät laatat).
//
// KÄSIKIRJOITUS (sama kuin MatkaTestit.Kasikirjoitus):
//   vaihe action: tavat = travelModes(); tapa = tavat[valinnat % tavat.length]
//     (valinnat = tähänastisten action-päätösten määrä);
//     bus → actionBus(pienin kohde ordinaalisesti),
//     fly → actionFly(pienin kohde), muut → actionTravel(tapa).
//   vaihe roll: jos muitaTapojaTarjolla() ja heitot % 4 === 3 →
//     actionCancelTravel(); muuten actionRoll().
//   vaihe move: actionMove(pienin avain ordinaalisesti).
// Ajo päättyy, kun turnCount > VUOROT tai tekoja on MAX_TEOT.
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const { Game } = await import(pathToFileURL(join(JS, 'game.js')).href);
const { packById } = await import(pathToFileURL(join(JS, 'pack.js')).href);

// Rajaus: ei tehtäviä kaupungeissa → ei 'stay'-tapaa.
Game.prototype.tehtavaTarjolla = () => false;

const VUOROT = 40;
const MAX_TEOT = 400;
const ordinaali = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const pack = packById('maailmankartta');
if (pack.id !== 'maailmankartta') throw new Error('maailmankartta puuttuu');

const AJOT = [
  { seed: 1, start: 'pariisi' },
  { seed: 7, start: 'pariisi' },
  { seed: 42, start: 'pariisi' },
  { seed: 2026, start: 'pariisi' },
  { seed: 5, start: 'lontoo', alkuValinta: 3 },   // lento heti alkuun
  { seed: 99, start: 'istanbul' },
  { seed: 13, start: 'manila', alkuValinta: 1 },  // saarelta lentäen
  { seed: 11, start: 'dublin', raha: 40 },        // pankkiapu (STRANDED_AID)
];

function tila(g, teko) {
  const p = g.player;
  return {
    teko,
    vaihe: g.phase,
    sijainti: p.pos.type === 'city' ? `c:${p.pos.city}` : `e:${p.pos.edge}:${p.pos.idx}`,
    raha: p.money,
    die: g.die,
    turnCount: g.turnCount,
    dayCount: g.dayCount(),
    timeOfDay: g.timeOfDay(),
    tunnit: g.elapsedHours(),
    rngCalls: g.rngCalls,
    travelMode: g.travelMode,
    autoTravel: g.autoTravel,
    jatkaAutomaattisesti: g.jatkaAutomaattisesti,
    pendingFare: g.pendingFare,
    kaydyt: g.world.visited.size,
    tavat: g.travelModes(),
  };
}

const jaljet = [];
for (const { seed, start, alkuValinta = 0, raha = null } of AJOT) {
  const g = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start }], pack, seed });
  // Aloituskaupunki annettu → konstruktori kutsui jo beginTurnin; vaihe on
  // 'action' tai automaattivalinnan jälkeen 'roll'. Kuten savukkeissa,
  // pakotetaan 'action' vain, jos peli jäi muuhun vaiheeseen.
  if (g.phase !== 'action' && g.phase !== 'roll') g.phase = 'action';
  const rngAlussa = g.rngCalls;
  const askeleet = [tila(g, 'alku')];
  if (raha !== null) {
    // Vararikkokoe: rahat asetetaan ja vuoro aloitetaan uudelleen
    // (C#: Pelaaja.Raha = raha; Matka.AloitaVuoro()).
    g.player.money = raha;
    g.phase = 'action';
    g.beginTurn();
    askeleet.push(tila(g, `raha:${raha}`));
  }
  let valinnat = alkuValinta;
  let heitot = 0;
  for (let n = 0; n < MAX_TEOT && g.turnCount <= VUOROT; n++) {
    let teko;
    let tulos;
    if (g.phase === 'action') {
      const tavat = g.travelModes();
      if (!tavat.length) throw new Error(`ei tapoja: siemen ${seed}`);
      const tapa = tavat[valinnat % tavat.length];
      valinnat++;
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
    } else {
      throw new Error(`odottamaton vaihe ${g.phase}`);
    }
    if (!tulos.ok) throw new Error(`${teko} epäonnistui: ${tulos.error}`);
    askeleet.push(tila(g, teko));
  }
  jaljet.push({ seed, start, alkuValinta, raha, rngAlussa, askeleet });
}

const tekoja = jaljet.reduce((s, j) => s + j.askeleet.length - 1, 0);
const lajit = {};
for (const j of jaljet) for (const a of j.askeleet) {
  if (a.teko.startsWith('raha:')) continue;
  const l = a.teko.split(':').slice(0, 2).join(':').replace(/^move:.*/, 'move').replace(/^(bus|fly):.*/, '$1');
  lajit[l] = (lajit[l] ?? 0) + 1;
}
writeFileSync(join(tama, 'matkajalki.json'), JSON.stringify({
  $kuvaus: 'Verkkopelin js/game.js matkajälki (Kultaiset/tee-matkajalki.mjs). Älä muokkaa käsin.',
  lauta: 'maailmankartta',
  vuorot: VUOROT,
  jaljet,
}, null, 1) + '\n');
console.log(`matkajalki.json: ${jaljet.length} ajoa, ${tekoja} tekoa`, lajit);
