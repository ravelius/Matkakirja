// KULTAINEN KULKUTAPAJÄLKI: Liiku-liu'un napit ja "Vaihda matkustustapa" webin säännöin.
// Sama käsikirjoitus ja ajot kuin tee-matkajalki.mjs:ssä (C#: MatkaTestit.Kasikirjoitus). Jokaisen
// askeleen jälkeen kirjataan:
//   vaihe 'action': napit = [laji, estetty, syy|null, korostettu] järjestyksessä liftaus, bussi,
//                   laiva, lento (web ui.js renderTravelChoice vaihe A)
//   vaihe 'roll':   vaihto = !game.autoTravel || game.muitaTapojaTarjolla() (web ui.js ~11262)
// Estosyyt (keskenReittia, maaEste, bussiEste, laivaEste, lentoEste) luetaan SUORAAN webin ui.js:stä;
// napin käytössäolon ehdot tarkistetaan lähdetekstistä, joten webin muutos kaataa skriptin.
// C#: Peli/Liikkuminen.cs, testi Testit/LiikkuminenTestit.cs.
//
// Käyttö: node Kultaiset/tee-kulkutapajalki.mjs [verkkopelin js-kansio]
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const { Game, SEA_FARE } = await import(pathToFileURL(join(JS, 'game.js')).href);
const { BUS_FARE, FLIGHT_PRICE } = await import(pathToFileURL(join(JS, 'rules.js')).href);
const { packById } = await import(pathToFileURL(join(JS, 'pack.js')).href);

const ui = readFileSync(join(JS, 'ui.js'), 'utf8');
for (const ehto of [
  "if (!game.autoTravel || game.muitaTapojaTarjolla()) {",
  "const bussia = modes.includes('bus');",
  "const laivaa = modes.includes('sea');",
  "const lentoa = flights.length > 0 || mannerLennot.length > 0;",
  "modes.includes('land') && !modes.includes('stay') ? 'primary' : ''",
  "if (modes.includes('land')) landBtn.addEventListener",
]) if (!ui.includes(ehto)) throw new Error(`web ui.js muuttui, ehto puuttuu: ${ehto}`);

function metodi(nimi) {
  const m = ui.match(new RegExp(`\\n  ${nimi}\\(\\) \\{\\n([\\s\\S]*?)\\n  \\}\\n`));
  if (!m) throw new Error(`ui.js: ${nimi} puuttuu`);
  return new Function('BUS_FARE', 'SEA_FARE', 'FLIGHT_PRICE', `return function () {\n${m[1]}\n};`)(BUS_FARE, SEA_FARE, FLIGHT_PRICE);
}
const este = {};
for (const n of ['keskenReittia', 'maaEste', 'bussiEste', 'laivaEste', 'lentoEste']) este[n] = metodi(n);

Game.prototype.tehtavaTarjolla = () => false;   // kuten matkajäljessä
const VUOROT = 40;
const MAX_TEOT = 400;
const ordinaali = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const pack = packById('maailmankartta');
const AJOT = [
  { seed: 1, start: 'pariisi' }, { seed: 7, start: 'pariisi' }, { seed: 42, start: 'pariisi' },
  { seed: 2026, start: 'pariisi' }, { seed: 5, start: 'lontoo', alkuValinta: 3 },
  { seed: 99, start: 'istanbul' }, { seed: 13, start: 'manila', alkuValinta: 1 },
  { seed: 11, start: 'dublin', raha: 40 },
];

function liiku(g, teko) {
  const kirjaus = { teko, vaihe: g.phase };
  if (g.phase === 'roll') kirjaus.vaihto = !g.autoTravel || g.muitaTapojaTarjolla();
  if (g.phase === 'action') {
    const u = { game: g, ...este };
    const modes = g.travelModes();
    const lentoa = g.airportDestinations().length > 0 || g.mannerLennot().length > 0;
    const nappi = (laji, kaytossa, syy, korostettu = false) => [laji, !kaytossa, kaytossa ? null : syy.call(u), korostettu];
    kirjaus.napit = [
      nappi('land', modes.includes('land'), u.maaEste, modes.includes('land') && !modes.includes('stay')),
      nappi('bus', modes.includes('bus'), u.bussiEste),
      nappi('sea', modes.includes('sea'), u.laivaEste),
      nappi('fly', lentoa, u.lentoEste),
    ];
  }
  return kirjaus;
}

const jaljet = [];
for (const { seed, start, alkuValinta = 0, raha = null } of AJOT) {
  const g = new Game({ players: [{ name: 'Fogg', color: '#c9a227', start }], pack, seed });
  if (g.phase !== 'action' && g.phase !== 'roll') g.phase = 'action';
  const askeleet = [liiku(g, 'alku')];
  if (raha !== null) {
    g.player.money = raha;
    g.phase = 'action';
    g.beginTurn();
    askeleet.push(liiku(g, `raha:${raha}`));
  }
  let valinnat = alkuValinta;
  let heitot = 0;
  for (let n = 0; n < MAX_TEOT && g.turnCount <= VUOROT; n++) {
    let teko;
    let tulos;
    if (g.phase === 'action') {
      const tavat = g.travelModes();
      const tapa = tavat[valinnat % tavat.length];
      valinnat++;
      if (tapa === 'bus') { const k = [...g.busDestinations()].sort(ordinaali)[0]; teko = `bus:${k}`; tulos = g.actionBus(k); }
      else if (tapa === 'fly') { const k = [...g.airportDestinations()].sort(ordinaali)[0]; teko = `fly:${k}`; tulos = g.actionFly(k); }
      else { teko = `travel:${tapa}`; tulos = g.actionTravel(tapa); }
    } else if (g.phase === 'roll') {
      if (g.muitaTapojaTarjolla() && heitot % 4 === 3) { teko = 'cancel'; tulos = g.actionCancelTravel(); }
      else { teko = 'roll'; tulos = g.actionRoll(); }
      heitot++;
    } else if (g.phase === 'move') {
      const avain = [...g.moves.keys()].sort(ordinaali)[0];
      teko = `move:${avain}`;
      tulos = g.actionMove(avain);
    } else throw new Error(`odottamaton vaihe ${g.phase}`);
    if (!tulos.ok) throw new Error(`${teko} epäonnistui: ${tulos.error}`);
    askeleet.push(liiku(g, teko));
  }
  jaljet.push({ seed, start, alkuValinta, raha, askeleet });
}

const syyt = {};
for (const j of jaljet) for (const a of j.askeleet) for (const n of a.napit ?? []) if (n[2]) syyt[n[2]] = (syyt[n[2]] ?? 0) + 1;
writeFileSync(join(tama, 'kulkutapajalki.json'), JSON.stringify({
  $kuvaus: 'Liiku-liu\'un napit ja Vaihda matkustustapa webin js/ui.js-säännöin (Kultaiset/tee-kulkutapajalki.mjs). Älä muokkaa käsin.',
  vuorot: VUOROT,
  jaljet,
}) + '\n');
console.log(`kulkutapajalki.json: ${jaljet.length} ajoa, ${jaljet.reduce((s, j) => s + j.askeleet.length, 0)} askelta`, syyt);
