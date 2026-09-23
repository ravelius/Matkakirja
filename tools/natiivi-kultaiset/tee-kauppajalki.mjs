// KULTAINEN KAUPPAJÄLKI: verkkopelin js/game.js ajaa rahan ja kauppojen
// teot (kulttuurivisa, lehden minitehtävä, nostolaskuri, pulun karttaohje,
// pullavinkki ja -ostos, eläintäky, juliste, mannerlento, pöllön sähke,
// voittotarkistus, availableActions) onnistuvina ja epäonnistuvina, ja
// jokaisen teon tulos ja sen jälkeinen tila kirjataan tiedostoon
// Kultaiset/kauppajalki.json. C#-portti (Peli/Kaupat.cs, Voitto.cs) toistaa
// saman käsikirjoituksen testissä Testit/KauppaTestit.cs ja vaatii
// identtisen jäljen, myös satunnaislukukutsujen määrän ja tallennuksen yli.
//
// Käyttö: node Kultaiset/tee-kauppajalki.mjs [verkkopelin js-kansio]
//
// KÄSIKIRJOITUS on komentolista (teko + args); C# tulkitsee samat komennot.
// Dynaamiset valinnat (esim. mantereen tähtikaupunki) tehdään tässä ja
// kirjataan argumentteina, joten C# ei valitse mitään itse.
//   raha n, siirry kaupunki   — suora asetus molemmille (ei visitCity)
//   tallenna                  — web toJSON → fromJSON, C# Tallenna → Lataa
//   travel/roll/move/cancel/stay/timeout/close — tavalliset matkan ja visan teot
//
// RAJAUKSET (samat kuin pelijäljessä): pulmat pois (pendingPuzzle), linssi
// aarteen kylkiäisenä pois (linssiAarteet = {}), liput pois (flagTargets),
// linssikynnys
// pois (tarkistaLinssikynnys; C#: Kokemus.KynnysYlitetty-koukku on null).
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const tama = dirname(fileURLToPath(import.meta.url));
const JS = resolve(process.argv[2] ?? '/Users/Shared/Claude/Matkakirja-pelikoodari/js');
const { Game } = await import(pathToFileURL(join(JS, 'game.js')).href);
const { packById } = await import(pathToFileURL(join(JS, 'pack.js')).href);

Game.prototype.pendingPuzzle = () => null;
Game.prototype.tarkistaLinssikynnys = () => {};

const ordinaali = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const pack = packById('maailmankartta');
if (pack.id !== 'maailmankartta') throw new Error('maailmankartta puuttuu');
if (Array.isArray(pack.texts.schedule)) throw new Error('maailmankartalla on aikataulu: updateSchedule pitää portata');
// Rosvolaatat ja kaksintaistelu on poistettu pelistä (Raamattu 25.8.2026): koelaudalla ei ryöstäjiä.
const KOE_MAARAT = { star: 20, mannerAarre: 7, isoAarre: 82, pieniAarre: 157 };
const koepaketti = { ...pack, tokens: { ...pack.tokens, counts: KOE_MAARAT } };

const pos = (p) => (p.pos.type === 'city' ? `c:${p.pos.city}` : `e:${p.pos.edge}:${p.pos.idx}`);
function tiiviste(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}
const kartta = (m) => [...m.entries()].map(([a, b]) => `${a}=${b}`).join(';');
const jarj = (s) => [...s].sort(ordinaali);

function tila(g, teko, args, tulos) {
  const p = g.player;
  const n = p.finds.length;
  const aa = g.availableActions();
  return {
    teko,
    args,
    tulos,
    vaihe: g.phase,
    sijainti: pos(p),
    raha: p.money,
    turnCount: g.turnCount,
    rngCalls: g.rngCalls,
    travelMode: g.travelMode,
    kaydyt: g.world.visited.size,
    xp: p.xp,
    nousut: g.takeTietajaNousut().map((t) => t.taso),
    tahdet: p.stars,
    laatat: g.tokens.size,
    laattaTiiviste: tiiviste(kartta(g.tokens)),
    kaannetyt: g.revealed.size,
    starsFound: [...g.world.starsFound.entries()].map(([m, c]) => `${m}=${c}`),
    viimeLoyto: n ? `${p.finds[n - 1]}@${p.findManner[n - 1]}/${p.findMaa[n - 1]}` : null,
    quiz: g.quiz ? { cityId: g.quiz.cityId, chosen: g.quiz.chosen, right: g.quiz.right } : null,
    // Tapahtumat (web emit): laji aina, teksti vain lajeille, joiden teksti on portissa sama.
    tapahtumat: g.takeEvents().map((e) => (e.kind === 'flight' || e.kind === 'aid' ? `${e.kind}:${e.text}` : e.kind)),
    toiminnot: {
      travel: aa.travel,
      roll: aa.roll,
      quiz: aa.quiz,
      fly: aa.fly,
      mannerFlights: aa.mannerFlights.map((k) => `${k.city}/${k.manner}/${k.label}`),
    },
    kaupat: {
      kulttuuri: jarj(g.kulttuuriVastatut),
      minitehtavat: jarj(g.minitehtavatVastatut),
      minitehtavatOikein: jarj(g.minitehtavatOikein),
      nostotehtavat: g.nostotehtavatRatkaistu,
      aarrepisteOhje: g.aarrepisteOhjeNahty,
      pullat: jarj(g.pullaVinkit),
      elaintayt: jarj(g.elaintakyLunastetut),
      julisteet: jarj(g.julisteet),
    },
    voittaja: g.winner ? g.winner.id : null,
  };
}

function kytke(g) {
  g.linssiAarteet = {};
  g.flagTargets = () => [];
  return g;
}

/** Suorittaa komennon ja palauttaa webin paluuarvon sellaisenaan. */
function suorita(g, teko, args) {
  const p = g.player;
  switch (teko) {
    case 'raha': p.money = args[0]; return null;
    case 'siirry': p.pos = { type: 'city', city: args[0] }; return null;
    case 'kulttuuri': return g.actionKulttuuri(...args);
    case 'minitehtava': return g.actionMinitehtava(...args);
    case 'nosto': return g.kirjaaNostotehtava();
    case 'ohje': return g.merkitseAarrepisteOhje();
    case 'pullavinkki': return g.actionPullaVinkki(...args);
    case 'pullaostos': return g.actionPullaOstos(...args);
    case 'pullavinkkiostettu': return g.pullaVinkkiOstettu(args[0]);
    case 'pullaostettu': return g.pullaOstettu(args[0]);
    case 'elaintaky': return g.actionElaintaky(...args);
    case 'elaintakylunastettu': return g.elaintakyLunastettu(args[0]);
    case 'juliste': return g.myonnaJuliste(args[0]);
    case 'mannerlento': return g.actionMannerLento(args[0]);
    case 'sahke': {
      // Web palauttaa yhä duel-kentän (vanha rosvopolku); rosvot on poistettu pelistä, joten se ei kuulu jälkeen.
      const { duel, ...tulos } = g.avaaAarreSahkeella(...args);
      if (duel) throw new Error('sähke avasi kaksintaistelun, vaikka rosvolaattoja ei ole');
      return tulos;
    }
    case 'voitto': return g.checkWin();
    case 'travel': return { ok: g.actionTravel(args[0]).ok };
    case 'stay': return { ok: g.actionTravel('stay').ok };
    case 'roll': return { ok: g.actionRoll().ok };
    case 'move': return { ok: g.actionMove([...g.moves.keys()].sort(ordinaali)[0]).ok };
    case 'cancel': return { ok: g.actionCancelTravel().ok };
    case 'timeout': return { ok: g.timeoutQuiz().ok };
    case 'close': return { ok: g.closeQuiz().ok };
    default: throw new Error(`tuntematon teko ${teko}`);
  }
}

/** Yksi ajo: kasikirjoitus(k) kutsuu k(teko, ...args) ja voi lukea pelin k.g:stä. */
function aja({ nimi, seed, start, koe = false, pollo = false }, kasikirjoitus) {
  let g = kytke(new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start }],
    pack: koe ? koepaketti : pack,
    seed,
    polloAarteena: pollo,
  }));
  g.takeEvents();
  const rngAlussa = g.rngCalls;
  const laatat = [...g.tokens.entries()];
  const askeleet = [tila(g, 'alku', [], null)];
  const k = (teko, ...args) => {
    let tulos = null;
    if (teko === 'tallenna') {
      g = kytke(Game.fromJSON(JSON.parse(JSON.stringify(g.toJSON()))));
    } else {
      tulos = suorita(g, teko, args);
    }
    askeleet.push(tila(g, teko, args, tulos ?? null));
    return tulos;
  };
  Object.defineProperty(k, 'g', { get: () => g });
  kasikirjoitus(k);
  return {
    nimi, seed, start, koe, pollo,
    maarat: Object.entries(koe ? KOE_MAARAT : pack.tokens.counts),
    rngAlussa, laatat, askeleet,
  };
}

const kaupunki = (g) => (g.player.pos.type === 'city' ? g.player.pos.city : null);
/** Kääntämätön laatta tyyppiä t mantereella m (Map-järjestyksessä ensimmäinen). */
const laattaMantereella = (g, t, m) => [...g.tokens.entries()].find(([c, tt]) => tt === t && g.mannerOf(c) === m)?.[0];
const laatta = (g, t) => [...g.tokens.entries()].find(([, tt]) => tt === t)?.[0];

const ajot = [];

// A: lehtitehtävät, pullat, eläintäyt, julisteet — onnistuvat ja epäonnistuvat.
ajot.push(aja({ nimi: 'lehti ja kassa', seed: 7, start: 'pariisi' }, (k) => {
  k('kulttuuri', 'pariisi', true);
  k('kulttuuri', 'pariisi', true);            // jo vastattu
  k('kulttuuri', 'lontoo', false, 25);        // väärin: ei palkkiota, ei uutta yritystä
  k('kulttuuri', 'lontoo', true, 25);
  k('minitehtava', 'pariisi', 'kaupunki', true);
  k('minitehtava', 'pariisi', 'kaupunki', true);   // jo vastattu
  k('minitehtava', 'pariisi', 'fokus:taky1', false, 50);
  k('minitehtava', 'lontoo', 'kaupunki', true, 10); // eri kaupunki, sama aihe → palkitaan
  k('minitehtava', 'nosto', 'nosto-eiffel', true, 25);
  k('nosto');
  k('nosto');
  k('ohje');
  k('ohje');
  k('pullavinkki', 'pariisi');
  k('pullavinkki', 'pariisi');                 // jo ostettu
  k('pullavinkkiostettu', 'pariisi');
  k('pullavinkkiostettu', 'lontoo');
  k('pullaostos', 'sahke:tukholma-1:vinkki', 50, 'sai vinkin sähkeen vastaukseen');
  k('pullaostettu', 'sahke:tukholma-1:vinkki');
  k('pullaostos', '');                          // avain puuttuu
  k('pullaostettu', '');
  k('raha', 20);
  k('pullaostos', 'sahke:tukholma-1:linkki', 25, 'sai linkin');   // rahat eivät riitä
  k('pullaostettu', 'sahke:tukholma-1:linkki');
  k('pullavinkki', 'lontoo', 20);               // tasan riittää
  k('pullavinkki', 'rooma');                    // 0 < 25
  k('elaintaky', 'FIN', 20);
  k('elaintaky', 'FIN', 20);                    // jo lunastettu: ok, ei uusi
  k('elaintaky', '', 20);                       // maa puuttuu
  k('elaintaky', 'SWE', -5);                    // negatiivinen → 0
  k('elaintaky', 'NOR', null);                  // ei palkkiota → 0
  k('elaintaky', 'ISL');                        // undefined → 0
  k('elaintakylunastettu', 'FIN');
  k('elaintakylunastettu', 'DNK');
  k('juliste', 'pariisi');
  k('juliste', 'pariisi');
  k('juliste', 'ateena-nike');
  k('juliste', '');
  k('tallenna');
  k('kulttuuri', 'pariisi', true);              // jo vastattu myös latauksen jälkeen
  k('pullavinkki', 'pariisi');
  k('elaintaky', 'FIN', 20);
  k('juliste', 'ateena-nike');
  k('minitehtava', 'pariisi', 'fokus:taky1', true, 50);
  k('voitto');
  // Kassa ei ole vuorosidonnainen: sama toimii kesken matkan.
  k('raha', 300);
  k('travel', 'land');
  k('pullavinkki', 'wien');
  k('kulttuuri', 'wien', true);
  k('roll');
  k('elaintaky', 'AUT', 20);
  k('tallenna');
  k('juliste', 'wien');
}));

// B: mannerlento ja sähke — onnistuvat ja epäonnistuvat.
ajot.push(aja({ nimi: 'mannerlento', seed: 21, start: 'pariisi' }, (k) => {
  const g0 = k.g;
  k('mannerlento', 'newyork');                  // tähteä ei löydetty
  k('raha', 1000);
  const oma = g0.mannerOf('pariisi');
  const tahti = laattaMantereella(k.g, 'star', oma);
  k('sahke', 'lontoo-ei-ole', 100);              // tuntematon kaupunki: ei laattaa
  k('sahke', tahti, 200);                        // pääaarre omalta mantereelta, vuoro päättyy
  k('sahke', tahti, 200);                        // jo käännetty
  const lennot = k.g.mannerLennot();
  const toinen = k.g.pack.cities.find((c) => c.start && k.g.mannerOf(c.id) === oma && c.id !== kaupunki(k.g));
  if (toinen) k('mannerlento', toinen.id);        // oma manner ei ole kohde
  k('mannerlento', 'pariisi');                   // oma kaupunki ei ole kohde
  k('raha', 299);
  k('mannerlento', lennot[0].city);              // rahat eivät riitä (lista tyhjä)
  k('raha', 300);
  k('travel', 'land');
  k('mannerlento', lennot[0].city);              // väärä vaihe
  k('sahke', laatta(k.g, 'pieniAarre'), 50);     // väärä vaihe
  k('cancel');
  k('tallenna');
  k('mannerlento', lennot[1].city);              // tasan 300: onnistuu, raha 0
  k('voitto');
  k('raha', 1000);
  // Lennon jälkeen: uusi manner, sen tähti kateissa → ei lentoja.
  k('sahke', laatta(k.g, 'pieniAarre'), 0);       // palkkio 0: ei aid-tapahtumaa
  const uusi = k.g.mannerOf(kaupunki(k.g));
  k('sahke', laattaMantereella(k.g, 'star', uusi), 150);
  k('tallenna');
  const kohteet = k.g.mannerLennot();
  k('mannerlento', kohteet[kohteet.length - 1].city);
  // Kaikki pääaarteet sähkeellä: lopuksi mannerlentoja ei ole.
  for (let t = laatta(k.g, 'star'); t; t = laatta(k.g, 'star')) k('sahke', t, 25);
  k('sahke', laatta(k.g, 'mannerAarre'), 200);
  k('sahke', laatta(k.g, 'isoAarre'), 125);
  k('siirry', laatta(k.g, 'pieniAarre'));
  k('stay');
  k('sahke', laatta(k.g, 'pieniAarre'), 50);     // kysymys auki: väärä vaihe
  k('timeout');
  k('close');
}));

// C: koelauta, pöllö aarteena.
ajot.push(aja({ nimi: 'pöllö', seed: 13, start: 'newyork', koe: true, pollo: true }, (k) => {
  k('sahke', laatta(k.g, 'pieniAarre'), 200);    // pöllö korvaa ensimmäisen laatan
  k('sahke', laatta(k.g, 'isoAarre'), 200);
  k('tallenna');
  k('sahke', laatta(k.g, 'pieniAarre'), 0);
  const oma = k.g.mannerOf(kaupunki(k.g));
  k('sahke', laattaMantereella(k.g, 'star', oma), 200);
  k('sahke', laattaMantereella(k.g, 'star', oma), 200);   // koelaudalla toinen tähti samalla mantereella
  k('raha', 5000);
  const kohteet = k.g.mannerLennot();
  k('mannerlento', kohteet[0].city);
  k('kulttuuri', kaupunki(k.g), true, 25);
  k('pullavinkki', kaupunki(k.g));
  k('voitto');
}));

const tekoja = ajot.reduce((s, a) => s + a.askeleet.length - 1, 0);
// Kattavuus: jokainen kauppateko sekä onnistuu että epäonnistuu.
const kaikki = ajot.flatMap((a) => a.askeleet);
const okTeot = new Set(kaikki.filter((s) => s.tulos?.ok === true).map((s) => s.teko));
const vikaTeot = new Set(kaikki.filter((s) => s.tulos?.ok === false).map((s) => s.teko));
for (const t of ['kulttuuri', 'minitehtava', 'pullavinkki', 'pullaostos', 'elaintaky', 'mannerlento', 'sahke']) {
  if (!okTeot.has(t) || !vikaTeot.has(t)) throw new Error(`kattavuus: ${t} ok ${okTeot.has(t)} vika ${vikaTeot.has(t)}`);
}
if (!kaikki.some((s) => s.teko === 'sahke' && s.tulos?.found === 'pollo')) throw new Error('kattavuus: sähke pöllöön');
if (!kaikki.some((s) => s.toiminnot.mannerFlights.length > 1)) throw new Error('kattavuus: mannerlentoja');

const rivit = ajot.map((a) => {
  const { askeleet, ...paa } = a;
  return `${JSON.stringify(paa).slice(0, -1)},"askeleet":[\n${askeleet.map((s) => JSON.stringify(s)).join(',\n')}\n]}`;
});
writeFileSync(join(tama, 'kauppajalki.json'), `{"$kuvaus":"Verkkopelin js/game.js kauppajälki (Kultaiset/tee-kauppajalki.mjs). Älä muokkaa käsin.",\n"lauta":"maailmankartta",\n"ajot":[\n${rivit.join(',\n')}\n]}\n`);
console.log(`kauppajalki.json: ${ajot.length} ajoa, ${tekoja} tekoa`);
