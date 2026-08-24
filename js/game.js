// Pelin tila ja säännöt: vuorot, laattojen kääntäminen ja voittoehdot.

import { FLIGHT_PRICE, buildBoard, findMoves, posKey, reachableCities } from './rules.js';
import { createTokenPile } from './tokens.js';
import { packById, sourceList } from './pack.js';
import { TARINAKAARI, KAARI_LAUDAT } from './packs/tarinakaari.js';
import { laattamantereet, linssiKaupungista, myonna, tarkistaKynnys } from './linssit/omistus.js';
import { tietajatasonNousut } from './tietajatasot.js';

export const START_MONEY = 300;
export const SEA_FARE = 100; // laivamatkan hinta vuorolta
export const FIFTY_FIFTY_PRICE = 80; // kahden väärän vaihtoehdon piilotus
export const HINT_PRICE = 40; // sanallinen vihje kysymykseen
export const QUIZ_SECONDS = 45; // vastausaika tiimalasin verran
export const STRANDED_AID = 100; // kotisääntö: jumiin jäänyt saa pankilta 100
export const HARD_BONUS = 100; // palkkio vaikeasta kysymyksestä oikein vastattaessa
export const STAR_PRIZE = 2000; // pääaarteen arvo vaellustilassa, jossa peli ei pääty
export const DUEL_PRIZE = 200; // rosvon saalis, jos kaksintaistelun voittaa suoraan
export const DUEL_BYPASS_SHOES = 3; // näin monella hevosenkengällä rosvon voi ohittaa

/*
 * MANNERLENNON TEKSTIT (Fable 11.8.2026). Ne ovat tässä yhdessä
 * paikassa eivätkä pakkausten texts-taulussa, koska mannerlento on
 * laudan sisäinen mekaniikka eikä kuulu yhdellekään mantereelle.
 *
 * Ilmoitus on nuoren herran ääni: nykymaailmassa lentokenttä on joka
 * kaupungin naapurissa — siksi lento ei vaadi lentokenttälaattaa, ja
 * ilmoitus sanoo sen ääneen.
 */
export const MANNERLENTO_ILMOITUS = 'Mantereen aarre on laukussa. Isoisä olisi etsinyt satamasta laivaa — minä ostin lentolipun puhelimella: toiselle mantereelle pääsee nyt mistä tahansa kaupungista.';

// Mannerten suomenkieliset nimet nappia ja tekstejä varten. Avaimet
// ovat lähdepakettien tunnuksia (cityManner) — muilla laudoilla manner
// on laudan oma id, ja tuntematon tunnus palaa pelkkään kaupunkiin.
export const MANNER_NIMET = {
  europe: { nimi: 'Eurooppa', illatiivi: 'Eurooppaan' },
  middleeast: { nimi: 'Lähi-itä', illatiivi: 'Lähi-itään' },
  africa: { nimi: 'Afrikka', illatiivi: 'Afrikkaan' },
  asia: { nimi: 'Aasia', illatiivi: 'Aasiaan' },
  northamerica: { nimi: 'Pohjois-Amerikka', illatiivi: 'Pohjois-Amerikkaan' },
  southamerica: { nimi: 'Etelä-Amerikka', illatiivi: 'Etelä-Amerikkaan' },
  oceania: { nimi: 'Oseania', illatiivi: 'Oseaniaan' },
};

export const MANNERLENTO_NAPPI = ({ manner, label }) => {
  const kohde = MANNER_NIMET[manner]?.illatiivi;
  return kohde ? `Lennä ${kohde}: ${label}` : `Toiselle mantereelle: ${label}`;
};

// Aika on pelin vastustaja, ei sen tuomari: ajan loppuminen ei päätä peliä
// koskaan. Vuoro on kuusi tuntia, joten neljä vuoroa on yksi matkapäivä.
export const TURN_HOURS = 6;
export const RECORD_DAYS = 80; // isoisän ennätys
export const XP_RECORD = 200; // bonus, jos aarre löytyy ennätyksen sisällä

// Pysähdyksen muoto arvotaan painotetusti, jottei joka kaupungissa ole sama
// neljän vaihtoehdon tietovisa. Painot ovat vakioina, koska oikeat arvot
// varmistuvat vasta pelitestissä. Jos laudalla ei ole väittämiä tai
// tapahtumia, niiden paino siirtyy monivalinnalle — peli toimii jokaisella
// laudalla ilman uutta sisältöä.
export const FORM_WEIGHTS = {
  quiz: 55, claim: 15, photo: 10, flag: 8, event: 12,
};

// Tietovisan kehys: joku paikallinen esittää kysymyksen. Kysyjä valitaan
// kaupungin äänimaiseman mukaan, joten sama tyyppi ei kysele aavikolla ja
// satamassa. Rivit jatkavat otsikossa kaupungin nimen perässä ja päättyvät
// käyttöliittymässä kaksoispisteeseen.
export const ASKERS = {
  basaari: [
    'maustekauppias punnitsee sahramia ja kysyy',
    'teenkeittäjä ojentaa höyryävän lasin ja kysyy',
    'kankuri levittää kankaansa tiskille ja kysyy',
    'vanha kirjuri nostaa katseen kirjastaan ja kysyy',
  ],
  aavikko: [
    'karavaanin vetäjä kohentaa nuotiota ja kysyy',
    'opas tähyää dyynien yli ja kysyy',
    'kaivon vartija ojentaa vesileilin ja kysyy',
  ],
  meri: [
    'satamakirjuri sulkee lokikirjansa ja kysyy',
    'vanha kalastaja paikkaa verkkoaan ja kysyy',
    'perämies laskee kiikarinsa ja kysyy',
  ],
  sademetsa: [
    'jokiluotsi työntää veneen vesille ja kysyy',
    'kantaja laskee taakkansa maahan ja kysyy',
    'opas raivaa polkua ja kysyy',
  ],
  savanni: [
    'karjapaimen nojaa sauvaansa ja kysyy',
    'jäljittäjä osoittaa jälkiä maassa ja kysyy',
  ],
  ylanko: [
    'vuoristo-opas kiristää köyttä ja kysyy',
    'paimen viittoo istumaan kivelle ja kysyy',
  ],
  yleinen: [
    'majatalon isäntä laskee lampun pöytään ja kysyy',
    'matkatoveri selaa isoisän kirjaa ja kysyy',
    'harmaantunut vanhus istahtaa viereen ja kysyy',
    'nuori tulkki hymyilee ja kysyy',
  ],
};
export const PHOTO_CHOICES = 4; // valokuvakysymyksen nimivaihtoehdot
export const FLAG_CHOICES = 4;  // lippukysymyksen maavaihtoehdot

/** Vuorokaudenajan nimi tunnista. Kierto: aamu, keskipäivä, ilta, yö. */
export function timeOfDayName(hour) {
  if (hour < 6) return 'aamu';
  if (hour < 12) return 'keskipäivä';
  if (hour < 18) return 'ilta';
  return 'yö';
}

// Tietäjäpisteet (koodissa xp) kertyvät matkasta, eivät onnesta: uusista paikoista,
// uusista laudoista ja vaikeista kysymyksistä.
export const XP_NEW_CITY = 10;
export const XP_NEW_BOARD = 50;
export const XP_HARD_ANSWER = 25;
export const XP_STAR = 100;
export const XP_PUZZLE = 25; // isoisän luonnoskirjan pulma ratkaistu
export const XP_EXPLORE = 15; // kaupungin tutkiminen ilman laattaa
export const EXPLORE_REWARD = 50; // löytöpalkkio oikeasta tutkimisvastauksesta
export const KAARI_YRITYKSET = 2; // kohtaamista saa yrittää näin monta kertaa

// Kysymyksen vaikeustaso: 1 = helppo, 2 = perus (oletus), 3 = vaikea.
export function questionLevel(question) {
  return question.level ?? 2;
}
export { FLIGHT_PRICE };

/** Siemenellinen satunnaisgeneraattori, jotta pelin voi toistaa testeissä. */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * TALLENNUKSEN MIGRAATIO 1 -> 2: yksi tähti mannerkohtaiseksi tauluksi.
 *
 * Versiossa 1 maailmalla oli `starFound` (lippu) ja `starCity`. Version 2
 * `starsFound` on taulu manner -> kaupunki. Käännös on suora: jos aarre
 * oli löytynyt, sen kaupunki kertoo mantereen. Jos vanhassa
 * tallennuksessa on `starFound` mutta ei `starCity`ä (teoreettinen
 * reunatapaus), tähti etsitään käännettyjen laattojen joukosta.
 *
 * Vanhan pelin laudalla on yhä vain se yksi tähti — laattajakoa ei
 * lasketa uudelleen. Aarnin luettelo näyttää siis kuusi kateissa olevaa
 * aarretta, joita sillä laudalla ei ole; se on rehellisempi kuin
 * tallennuksen hylkääminen, ja koskee vain ennen 11.8.2026 aloitettuja
 * matkoja.
 */
function mannerkohtaisetTahdet(pack, w) {
  if (!w?.starFound) return [];
  let city = w.starCity ?? null;
  if (!city) {
    city = (w.revealed ?? []).find(([, type]) => type === 'star')?.[0] ?? null;
  }
  const manner = (city && pack.map?.cityManner?.[city]) ?? pack.id;
  return [[manner, city]];
}

/*
 * ONKO PÖLLÖ AARRE? — EI TOISTAISEKSI (omistaja 24.8.2026).
 *
 * Raamatun osio "Viisas Pöllö": *"kehitysvaiheessa pöllö on pelissä
 * heti alusta — fokusmoodin esittely tarvitsee sen. 'Pöllö on aarre'
 * -idea säästetään ja voidaan tuoda takaisin myöhemmin"*.
 *
 * Vakio on koko kytkin: `true` palauttaa 18.8.2026 rakennetun
 * mekaniikan sellaisenaan (peli alkaa ilman pöllöä, ensimmäinen laatta
 * paljastaa sen aarteenaan). Yksikään rivi mekaniikan koodia ei ole
 * poistettu, ja sen omat testit ajavat sen läpi pyytämällä
 * `polloAarteena: true` pelin luonnissa.
 */
const POLLO_ON_AARRE = false;

export class Game {
  /**
   * @param {{players: Array<{name, color, isBot, start}>, pack?: object, roaming?: boolean, rng?: () => number, polloAarteena?: boolean}} opts
   *   pack = aloituslauta; oletuksena Afrikka.
   *   roaming = vaellustila: ei voittoehtoa, ja porttikaupungeista pääsee
   *   toisille laudoille. Yksin pelattaessa vaellus on aina päällä.
   */
  constructor({
    players, pack = packById('africa'), roaming,
    seed = Math.floor(Math.random() * 2 ** 32), rng,
    // Pöllö aarteena — nyt tauolla, ks. this.polloAarteena alempana.
    polloAarteena = POLLO_ON_AARRE,
  }) {
    if (players.length < 1 || players.length > 4) {
      throw new Error('Pelaajia pitää olla 1–4');
    }
    // Arvonnat tulevat siemenestä ja niiden määrä lasketaan, jotta tallennettu
    // peli voidaan palauttaa täsmälleen samaan tilanteeseen.
    this.seed = seed;
    this.rngCalls = 0;
    const source = rng ?? mulberry32(seed);
    this.rng = () => {
      this.rngCalls++;
      return source();
    };
    this.roaming = roaming ?? players.length === 1;
    this.rootPackId = pack.id;
    // Jokainen lauta on oma maailmansa: laatat ja löydöt säilyvät, vaikka
    // pelaaja käy välillä toisella laudalla.
    this.worlds = new Map();
    this.enterWorld(pack);

    // Ilman aloituskaupunkia (start: null) lähtöpiste valitaan kartalta
    // pelin alussa; nappula odottaa sitä ensimmäisessä aloituskaupungissa.
    const firstStart = pack.cities.find((c) => c.start);
    this.players = players.map((p, i) => ({
      id: i,
      name: p.name,
      color: p.color,
      isBot: !!p.isBot,
      start: p.start ?? null,
      packId: pack.id,
      // 'easy' = helpot kysymykset (esim. lapsipelaajalle), 'normal' = tavalliset
      quizLevel: p.quizLevel === 'easy' ? 'easy' : 'normal',
      money: START_MONEY,
      pos: { type: 'city', city: p.start ?? firstStart.id },
      // Montako unohdettua aarretta pelaaja kantaa (yksi per manner).
      stars: 0,
      horseshoes: 0,
      finds: [], // löydetyt laatat tyyppeinä
      // Miltä mantereelta kukin löytö on (maailmankartta) — kulkee
      // finds-listan rinnalla samoin indeksein, muilla laudoilla null.
      findManner: [],
      // Tällä matkalla löydetyt linssit tunnuksina. Omistus itsessään on
      // passissa ja kestää pelin yli; tämä lista kertoo mitkä löytyivät
      // nyt, jotta lokista ja laukusta näkee matkan oman saaliin.
      linssit: [],
      xp: 0,
      // Tietoprosentin laskurit: mukana sekä tietovisat että kaksintaistelut.
      quizAsked: 0,
      quizCorrect: 0,
    }));

    this.current = 0;
    // 'action' = valitse matkustustapa, 'roll' = heitä noppa, 'move' = valitse
    // kohde, 'offer' = kokeile tietovisaa, 'quiz' = kysymys auki
    this.phase = 'action';
    this.travelMode = null;
    this.autoTravel = false;
    this.pendingFare = 0;
    this.die = null;
    this.moves = null;
    this.quiz = null;
    this.duel = null;
    this.duelArmed = false;
    // Saapumishavainto: mistä kaupungista tietoruutu kertoo. Asetetaan
    // jokaisesta saapumisesta ja pysyy, kunnes saavutaan seuraavaan —
    // matkalla ollessa teksti ei vaihdu (omistajan päätös).
    this.arrivalFact = null;
    // Pysähdyksen muoto: sama erikoismuoto ei toistu kahdesti peräkkäin.
    this.lastForm = null;
    this.eventCard = null;
    // Kulttuurikysymykset (tutustu ja vastaa): vastattu kerran per
    // kaupunki, avaimena 'pakka:kaupunki'.
    this.kulttuuriVastatut = new Set();
    // Lehden minitehtävät: vastattu kerran per lehti ja aihe,
    // avaimena 'pakka:kaupunki:aihe'.
    this.minitehtavatVastatut = new Set();
    /*
     * OIKEIN vastatut minitehtävät samalla avaimella. Vastattujen
     * joukko ei riitä julisteen myöntöön: väärin vastannut olisi saanut
     * palkintonsa takaoven kautta avaamalla saman sivun uudelleen
     * (ks. ui.js piirraMinitehtava, takautuva myöntö).
     */
    this.minitehtavatOikein = new Set();
    /*
     * Voitetut aikakausjulisteet: minitehtävän palkinto, avaimena
     * pelkkä KAUPUNGIN tunnus (js/packs/julisteet.js). Pakan tunnusta
     * ei ole avaimessa, koska juliste on matkamuisto kaupungista eikä
     * laudasta — sama kaupunki eri laudalla on sama juliste.
     */
    this.julisteet = new Set();
    // Pulmat avautuvat kerran pelissä: avaimena 'pakka:kaupunki'.
    this.puzzlesSeen = new Set();
    this.explored = new Set(); // tutkitut laatattomat kaupungit (pack:city)
    this.puzzlePrevPhase = null;
    // Isoisän aikataulu: näytetty rivi ja jo nähtyjen avaimet.
    this.scheduleNote = null;
    this.scheduleShown = new Set();
    this.recordNoted = false;
    this.recordMark = null;
    this.usedQuestions = new Set();
    /*
     * Tarinakaaren kohtaamisten yritykset (pack:city →
     * {yritykset, onnistui}). Ei tallenneta: uusi istunto saa
     * kohtaamiset uudelleen, kuten UI:n tervehdykset.
     */
    this.kaariYritykset = new Map();
    this.lastPath = null;
    this.winner = null;
    this.turnCount = 1;
    this.log = [];
    this.events = []; // näytölle animoitavat tapahtumat
    /*
     * Tietäjätason nousut odottamassa pöllön onnittelukuplaa
     * (js/tietajatasot.js). OMA jononsa eikä events-lista, koska
     * events piirtyy kartan päälle kuplina ja tason onnittelun sanoo
     * pöllö — ja nimenomaan VASTA kuplien jälkeen, jottei sama
     * pisteiden lisäys näytä kahta ilmoitusta päällekkäin.
     */
    this.tietajaNousut = [];
    /*
     * VIISAS PÖLLÖ ON AARRE (omistajan tilaus 18.8.2026) — TAUOLLA.
     *
     * Alkuperäinen mekaniikka: pelin alussa pöllöä ei ole, nappi on
     * piilossa eikä pöllö puhu mitään. Se löytyy OMANA AARTEENAAN
     * ensimmäisen käännetyn laatan alta (revealToken) ja KORVAA sen
     * laatan aarteen kokonaan (omistaja 18.8.2026): laatan omaa
     * sisältöä ei näytetä eikä anneta, eikä pöllö tuo pisteitä, rahaa
     * eikä tavaraa.
     *
     * PÖLLÖ ON MUKANA ALUSTA (omistaja 24.8.2026, Raamatun osio "Viisas
     * Pöllö"): fokusmoodin esittely tarvitsee pöllön heti ensimmäisestä
     * kaupungista alkaen, joten aarremekaniikka on toistaiseksi pois
     * päältä. Idea on tallessa ja voidaan tuoda takaisin, kun
     * ensimmäisen maan erikoisjärjestelyt on mietitty.
     *
     * KYTKIN ON PELIKOHTAINEN EIKÄ VAIN MODUULIVAKIO. Vakio
     * POLLO_ON_AARRE antaa oletuksen (nyt false), mutta kutsuja voi
     * pyytää mekaniikan päälle yhdelle pelille (`polloAarteena: true`).
     * Juuri siitä syystä sitä ei poistettu: mekaniikan omat testit
     * ajavat sen edelleen läpi, joten palauttaminen on yhden vakion
     * muutos eikä uudelleenkirjoitus.
     *
     * Lippu tallennetaan (toJSON), koska se on pelaajan etenemistä.
     * `polloPaljastus` sen sijaan on istunnon hetkellinen viesti
     * käyttöliittymälle ("näytä paljastusanimaatio nyt"), joka
     * poimitaan takePolloPaljastuksella eikä koskaan päädy levylle.
     *
     * polloAarteena EI kulje tallennuksessa: se on kehitysvaiheen
     * kytkin eikä pelitilanteen osa, ja fromJSON antaa vanhalle
     * tallennukselle pöllön joka tapauksessa.
     */
    this.polloAarteena = polloAarteena;
    this.polloLoydetty = !polloAarteena;
    this.polloPaljastus = false;
    // Avaus on pelkkää kerrontaa: sääntöasiat ovat Säännöt-dialogissa eivätkä
    // lokirivejä. Laudan intro-teksti jää pakkoihin muuta käyttöä varten.
    // Vaellus alkaa lähtöpisteen valinnalla, jos sitä ei ole annettu valmiiksi.
    // Matkaaja seisoo Lontoossa (laudan ensimmäisessä aloituskaupungissa)
    // lentolippu kädessään; ensimmäinen kohde valitaan kartalta ilmaiseksi.
    if (this.roaming && this.players.some((p) => !p.start)) {
      this.phase = 'pickstart';
    } else {
      this.beginTurn();
    }
  }

  /**
   * Lähtöpisteen valinta pelin alussa. Valinta on ilmainen: pelaaja voi jäädä
   * valittuun kaupunkiin maailmankartalle tai astua sen portin läpi suoraan
   * toiselle laudalle (linkIndex osoittaa kaupungin links-listaan).
   */
  actionPickStart(cityId, linkIndex = null) {
    if (this.phase !== 'pickstart') return { ok: false, error: 'Lähtöpiste on jo valittu' };
    const city = this.board.cityById.get(cityId);
    if (!city) return { ok: false, error: 'Tuntematon kaupunki' };
    const p = this.player;
    const link = linkIndex === null ? null : (city.links ?? [])[linkIndex];
    if (linkIndex !== null && !link) return { ok: false, error: 'Täältä ei ole tuota porttia' };

    if (link) {
      const target = packById(link.pack);
      this.enterWorld(target);
      p.packId = target.id;
      p.pos = { type: 'city', city: link.city };
      p.start = link.city;
      this.say(p.id, `${p.name} aloittaa matkansa: ${link.label}.`);
    } else {
      p.pos = { type: 'city', city: city.id };
      p.start = city.id;
      this.say(p.id, `${p.name} aloittaa matkansa kaupungista ${city.name}.`);
    }
    this.visitCity(p);
    this.phase = 'action';
    this.beginTurn();
    this.offerQuiz();
    return { ok: true };
  }

  /** Luo laudan tilan, kun sille saavutaan ensimmäistä kertaa. */
  enterWorld(pack) {
    if (this.worlds.has(pack.id)) return this.worlds.get(pack.id);
    // Jokainen kaupunki saa laatan, myös aloituskaupungit (omistajan
    // päätös 10.8.2026: aloituskaupungin kohtaamisesta pitää voida
    // löytää aarre siinä missä muistakin).
    const tokenCities = pack.cities.map((c) => c.id);
    const pile = createTokenPile(pack.tokens.counts, this.rng);
    if (pile.length !== tokenCities.length) {
      throw new Error(`Laattoja ${pile.length}, kaupunkeja ${tokenCities.length}`);
    }
    const world = {
      pack,
      board: buildBoard(pack.cities, pack.edges, pack.map),
      tokens: this.jaaLaatat(pack, tokenCities, pile),
      revealed: new Map(), // kaupunki -> laattatyyppi
      visited: new Set(), // kaupungit, joissa on jo käyty (tietäjäpisteitä varten)
      // Löytyneet unohdetut aarteet: manner -> kaupunki, jossa aarre oli.
      // Jokaisella mantereella on oma aarteensa (omistajan päätös
      // 11.8.2026), joten yksi lippu ei enää riitä.
      starsFound: new Map(),
    };
    this.worlds.set(pack.id, world);
    return world;
  }

  /**
   * Laattojen jako kaupungeille.
   *
   * Linssilaatat eivät saa jäädä sekoituksen varaan: sattuma voisi
   * kasata kaksi samaan maanosaan ja jättää toisen ilman, jolloin osa
   * linsseistä olisi käytännössä löytymättömissä. Siksi jokaiselle
   * mantereelle, jolla on rekisterissä oma linssi, arvotaan yksi
   * laattakaupunki erikseen ja loput laatat jaetaan kuten ennen.
   *
   * Jos mantereella ei ole yhtään vapaata laattakaupunkia — tai jos
   * linssejä on laudalla enemmän kuin mantereita — ylimääräiset laatat
   * jäävät sekoitukseen ja arvotaan muiden mukana. Peli ei kaadu siihen.
   *
   * Sama koskee unohdettuja aarteita (tähtilaattoja): omistajan päätös
   * 11.8.2026 on, että jokaisella mantereella on OMA aarteensa. Portteja
   * eikä kynnyksiä ei ole — aarre voi löytyä mantereen ensimmäisestä
   * laatasta, ja jos kaikki muut mantereen laatat on jo käännetty, se on
   * varmasti viimeisessä. Tämä on matemaattisesti sama asia kuin arpoa
   * yksi tähti per manner jo laattajaossa, joten dynaamista
   * uudelleensijoittelua ei tarvita.
   */
  jaaLaatat(pack, tokenCities, pile) {
    // Muilla laudoilla kuin maailmankartalla koko lauta on yksi manner.
    const mannerNimi = (cityId) => pack.map?.cityManner?.[cityId] ?? pack.id;
    const linsseja = pile.filter((type) => type === 'linssi').length;
    const linssikaupungit = new Set();

    // Mantereet eivät mene päällekkäin — kaupunki kuuluu tasan yhdelle —
    // joten valittua kaupunkia ei tarvitse merkitä varatuksi.
    for (const manner of laattamantereet()) {
      if (linssikaupungit.size >= linsseja) break;
      const ehdokkaat = tokenCities.filter((id) => mannerNimi(id) === manner);
      if (!ehdokkaat.length) continue;
      linssikaupungit.add(ehdokkaat[Math.floor(this.rng() * ehdokkaat.length)]);
    }

    /*
     * Yksi unohdettu aarre per manner. Tähti ei kuulu aloituskaupunkiin
     * (pelin päämaali heti lähtöruudussa olisi latistus), joten
     * aloituskaupungit karsitaan jo ehdokaslistasta — mannerkohtainen
     * väistö, ei jälkikäteinen korjaus. Linssikaupungit karsitaan, jotta
     * sama kaupunki ei saisi kahta käsin sijoitettua laattaa.
     *
     * Laudoilla, joilla mantereita on vain yksi (pack.id), tämä tekee
     * saman kuin ennen: yksi tähti, ei aloituskaupunkiin.
     */
    const startit = new Set(pack.cities.filter((c) => c.start).map((c) => c.id));
    const tahtia = pile.filter((type) => type === 'star').length;
    const tahtikaupungit = new Set();
    const mantereet = [];
    for (const id of tokenCities) {
      const manner = mannerNimi(id);
      if (!mantereet.includes(manner)) mantereet.push(manner);
    }
    for (const manner of mantereet) {
      if (tahtikaupungit.size >= tahtia) break;
      const ehdokkaat = tokenCities.filter((id) => mannerNimi(id) === manner
        && !startit.has(id) && !linssikaupungit.has(id));
      if (!ehdokkaat.length) continue;
      tahtikaupungit.add(ehdokkaat[Math.floor(this.rng() * ehdokkaat.length)]);
    }

    // Käsin sijoitetut linssi- ja tähtilaatat poistetaan pinon alusta,
    // jottei muiden laattojen keskinäinen järjestys muutu lainkaan:
    // sekoitus on jo tehty, ja tämä vaihe vain nostaa siitä osan sivuun.
    const jaettava = [];
    let linssejaPois = linssikaupungit.size;
    let tahtiaPois = tahtikaupungit.size;
    for (const type of pile) {
      if (type === 'linssi' && linssejaPois > 0) {
        linssejaPois--;
        continue;
      }
      if (type === 'star' && tahtiaPois > 0) {
        tahtiaPois--;
        continue;
      }
      jaettava.push(type);
    }

    const laatat = new Map();
    let i = 0;
    for (const city of tokenCities) {
      if (linssikaupungit.has(city)) laatat.set(city, 'linssi');
      else if (tahtikaupungit.has(city)) laatat.set(city, 'star');
      else laatat.set(city, jaettava[i++]);
    }

    /*
     * Varmistus ylimääräisille tähdille: jos laudalla on enemmän
     * tähtiä kuin mantereita, loput jäivät sekoitukseen ja voivat osua
     * aloituskaupunkiin. Silloin ne vaihtavat paikkaa arvotun
     * tavallisen kaupungin laatan kanssa, kuten ennen. Nykyisillä
     * laudoilla tämä ei laukea kertaakaan.
     */
    for (const [cityId, type] of laatat) {
      if (type !== 'star' || !startit.has(cityId)) continue;
      const vapaat = tokenCities.filter((id) => !startit.has(id)
        && laatat.get(id) !== 'linssi' && laatat.get(id) !== 'star');
      const vaihto = vapaat[Math.floor(this.rng() * vapaat.length)];
      if (!vaihto) break;
      laatat.set(cityId, laatat.get(vaihto));
      laatat.set(vaihto, 'star');
    }
    return laatat;
  }

  // --- apurit -------------------------------------------------------------

  get player() {
    return this.players[this.current];
  }

  /** Pelaajan lauta ja sen tila. */
  worldOf(player = this.player) {
    return this.worlds.get(player.packId);
  }

  // Vuorossa olevan pelaajan lauta: muu koodi (säännöt, piirto, botit) näkee
  // pelin aina yhden laudan pelinä näiden läpi.
  get world() {
    return this.worldOf();
  }

  get pack() {
    return this.world.pack;
  }

  get board() {
    return this.world.board;
  }

  get tokens() {
    return this.world.tokens;
  }

  get revealed() {
    return this.world.revealed;
  }

  get tokenTypes() {
    return this.pack.tokens.types;
  }

  /**
   * Laattatyypin näyttötiedot mantereen aarteistolla. Maailmankartalla
   * laatta paljastaa sen mantereen aarteen, jolta se löytyi
   * (pack.tokens.mannerTypes); muilla laudoilla — ja ilman manteretta —
   * laudan oma tyyppi kelpaa sellaisenaan. Arvo ja tunniste eivät
   * muutu, vain nimi, väri ja kuva.
   */
  aarreMantereella(type, manner) {
    return (manner && this.pack.tokens.mannerTypes?.[manner]?.[type])
      || this.tokenTypes[type];
  }

  /** Laattatyypin näyttötiedot löytökaupungin mukaan. */
  aarreTyyppi(type, cityId) {
    return this.aarreMantereella(type, cityId && this.pack.map?.cityManner?.[cityId]);
  }

  get airRoutes() {
    return this.pack.airRoutes;
  }

  /**
   * Kaupungin manner. Laudoilla, joilla mantereita ei ole erikseen
   * merkitty, koko lauta on yksi manner ja tunnus on laudan oma —
   * sama sopimus kuin laattajaossa (jaaLaatat).
   */
  mannerOf(cityId, world = this.world) {
    return world.pack.map?.cityManner?.[cityId] ?? world.pack.id;
  }

  /** Onko mantereen unohdettu aarre jo löytynyt tällä matkalla? */
  mantereenTahtiLoytynyt(manner, world = this.world) {
    return world.starsFound.has(manner);
  }

  /** Laudan muut mantereet: annetun mantereen ulkopuoliset tunnukset. */
  muutMantereet(manner) {
    const ulos = [];
    for (const c of this.pack.cities) {
      const m = this.mannerOf(c.id);
      if (m === manner || ulos.includes(m)) continue;
      ulos.push(m);
    }
    return ulos;
  }

  /**
   * Onko laudalta löytynyt yksikään unohdettu aarre. Moninpelissä
   * ensimmäinen aarre käynnistää kotiinjuoksun (checkWin), joten tämä
   * on nimenomaan "yksikään", ei "kaikki".
   */
  get starFound() {
    return this.world.starsFound.size > 0;
  }

  /** Lisää tapahtuman, jonka käyttöliittymä näyttää hetkeksi kartan päällä. */
  emit(kind, text, extra = {}) {
    this.events.push({ kind, text, ...extra });
  }

  /** Poimii kertyneet tapahtumat ja tyhjentää jonon. */
  takeEvents() {
    const events = this.events;
    this.events = [];
    return events;
  }

  /**
   * Odottaako pöllön paljastus näyttämistä? Kutsu nollaa lipun, joten
   * animaatio ajetaan täsmälleen kerran (js/ui.js playTokenReveal).
   */
  takePolloPaljastus() {
    const odottaa = this.polloPaljastus === true;
    this.polloPaljastus = false;
    return odottaa;
  }

  /** Poimii tietäjätason nousut pöllön kuplia varten ja tyhjentää jonon. */
  takeTietajaNousut() {
    const nousut = this.tietajaNousut ?? [];
    this.tietajaNousut = [];
    return nousut;
  }

  say(playerId, text) {
    this.log.unshift({ playerId, text, turn: this.turnCount });
    if (this.log.length > 200) this.log.pop();
  }

  rollDie() {
    return 1 + Math.floor(this.rng() * 6);
  }

  cityOf(player = this.player) {
    const board = this.worldOf(player).board;
    return player.pos.type === 'city' ? board.cityById.get(player.pos.city) : null;
  }

  tokenHere(player = this.player) {
    const city = this.cityOf(player);
    return city && this.worldOf(player).tokens.has(city.id) ? city : null;
  }

  routeName(edgeIdValue, board = this.board) {
    const e = board.edgeById.get(edgeIdValue);
    const a = board.cityById.get(e.a).name;
    const b = board.cityById.get(e.b).name;
    return `${a}–${b}`;
  }

  airportDestinations(player = this.player) {
    const city = this.cityOf(player);
    if (!city || !city.airport || player.money < FLIGHT_PRICE) return [];
    return this.airRoutes
      .filter((r) => r.a === city.id || r.b === city.id)
      .map((r) => (r.a === city.id ? r.b : r.a));
  }

  /**
   * Käytettävissä olevat matkustustavat vuoron alussa.
   *   land = maitse, sea = laivalla (100 p), fly = lentäen (300 p),
   *   stay = jää paikalleen ja kokeile kaupungin kysymystä
   * Kesken reittiä matka jatkuu samalla tavalla kuin se alkoi.
   */
  travelModes(player = this.player) {
    if (this.phase !== 'action') return [];
    if (player.pos.type === 'edge') {
      return [this.board.edgeById.get(player.pos.edge).type];
    }
    const city = this.cityOf(player);
    const edges = this.board.adj.get(city.id).map((id) => this.board.edgeById.get(id));
    const modes = [];
    if (edges.some((e) => e.type === 'land')) modes.push('land');
    if (edges.some((e) => e.type === 'sea') && player.money >= SEA_FARE) modes.push('sea');
    if (this.airportDestinations(player).length) modes.push('fly');
    // Tutki paikka: tehtävä ei koskaan aukea itsestään, vaan napista.
    if (this.tehtavaTarjolla(player)) modes.push('stay');
    return modes;
  }

  /**
   * Onko nykyisessä kaupungissa vielä tehtävä Etsi kätkö -napille:
   * laatta, käyttämätön kohtaaminen, näkemätön pulma tai kertaalleen
   * tutkimaton kaupunki. Sama ehto avaa Tutki paikka -tilan
   * (travelModes: stay) ja näyttää saapumiskortin tehtävänapin
   * (ui.js) — lehteä voi lukea silloinkin, kun tehtävät on tehty.
   * Botille kohtaaminen ei ole peruste jäädä: se ei kuluta kaarta.
   */
  tehtavaTarjolla(player = this.player) {
    const city = this.cityOf(player);
    if (!city) return false;
    return Boolean(this.tokens.has(city.id)
      || this.pendingPuzzle(player)
      || (!player.isBot && this.kaariTarina(city.id))
      || this.canExplore(city));
  }

  /** Mitä nykyinen pelaaja voi tehdä juuri nyt. */
  availableActions() {
    return {
      travel: this.travelModes(),
      roll: this.phase === 'roll',
      quiz: this.phase === 'offer',
      fly: this.phase === 'action' ? this.airportDestinations() : [],
      gateways: this.gatewayOptions(),
      countryGates: this.countryGateOptions(),
      mannerFlights: this.mannerLennot(),
    };
  }

  /**
   * Porttikaupungit: muutamasta kaupungista lähtee pitkä lento toiselle
   * laudalle (esim. Kairo on sekä Afrikan että Lähi-idän laudalla). Lento
   * maksaa saman kuin muutkin lennot ja vie koko vuoron, ja karttanäkymä
   * vaihtuu perille saavuttaessa.
   */
  gatewayOptions() {
    if (this.phase !== 'action') return [];
    const city = this.cityOf();
    if (!city || !city.links) return [];
    if (this.player.money < FLIGHT_PRICE) return [];
    // Maakohtaisille laudoille ei lennetä rahalla, vaan portti avataan
    // tiedolla pääkaupungissa (countryGateOptions).
    return city.links
      .map((link, index) => ({ ...link, index }))
      .filter((link) => packById(link.pack).scope !== 'country');
  }

  /**
   * Tietoportit: mantereen pääkaupungista pääsee maan omalle laudalle
   * vastaamalla vaikeaan kysymykseen oikein. Portti on ilmainen — se
   * avataan tiedolla, ei rahalla. Väärästä vastauksesta vuoro päättyy.
   */
  countryGateOptions() {
    if (this.phase !== 'action') return [];
    const city = this.cityOf();
    if (!city || !city.links) return [];
    return city.links
      .map((link, index) => ({ ...link, index }))
      .filter((link) => packById(link.pack).scope === 'country');
  }

  /** Avaa tietoportin kysymyksen. Kysymys on aina vaikea (taso 3). */
  actionGateQuiz(index) {
    if (this.phase !== 'action') return { ok: false, error: 'Väärä vaihe' };
    const gate = this.countryGateOptions()[index];
    if (!gate) return { ok: false, error: 'Täällä ei ole tietoporttia' };
    const city = this.cityOf();

    const question = this.pickQuestion(city.id, 'hard');
    const order = this.shuffledOrder(question.options.length);
    this.quiz = {
      cityId: city.id,
      hard: false,
      gate: { pack: gate.pack, city: gate.city, label: gate.label },
      question: question.q,
      fact: question.fact,
      source: sourceList(question.source),
      options: order.map((i) => question.options[i]),
      correct: order.indexOf(question.correct),
      hint: question.hint ?? null,
      hintShown: false,
      hidden: [],
      chosen: null,
      right: null,
      timedOut: false,
      seconds: QUIZ_SECONDS,
    };
    this.phase = 'quiz';
    return { ok: true, quiz: this.quiz };
  }

  /** Onko kaupungista lentoja toiselle laudalle? Kartta merkitsee ne. */
  isGateway(city) {
    return !!(city && city.links && city.links.length);
  }

  /**
   * Tietäjäpisteet kertyvät matkasta: uusi kaupunki, uusi lauta, oikea
   * vastaus vaikeaan kysymykseen ja laudan pääaarre. Rahalla niitä ei saa.
   *
   * Kenttä on yhä player.xp ja funktio awardXp: pelaajalle näkyvä nimi
   * vaihtui tietäjäpisteeksi 18.8.2026, koodin sisäiset nimet eivät.
   */
  awardXp(player, amount) {
    const ennen = player.xp ?? 0;
    player.xp = ennen + amount;
    this.tarkistaLinssikynnys(player, ennen, player.xp);
    this.tarkistaTietajataso(player, ennen, player.xp);
    return amount;
  }

  /**
   * Linssien toinen löytöreitti: tietäjäpisteet. Tarkistus on tässä,
   * koska awardXp on ainoa portti, jonka läpi jokainen tietäjäpiste
   * kulkee — kahdeksan kutsupaikkaa, yksi kynnystarkistus.
   *
   * Tapahtumalaji on 'aid' eikä 'treasure': käyttöliittymä suodattaa
   * aarretapahtumat pois, koska ne nähdään laatan paljastusanimaatiossa.
   * Kokemuksella ansaittu linssi ei tule laatan alta, joten 'treasure'
   * katoaisi näkymättömiin.
   */
  tarkistaLinssikynnys(player, ennen, jalkeen) {
    for (const tunnus of tarkistaKynnys(this, player, ennen, jalkeen)) {
      this.say(player.id, `${player.name} on nähnyt maailmaa niin paljon, että sai uuden linssin (${jalkeen} tp).`);
      this.emit('aid', 'Uusi linssi', { icon: 'suurennuslasi', linssi: tunnus, sub: 'Kokemus avasi uuden katselutavan' });
    }
  }

  /**
   * Tietäjätason nousu (js/tietajatasot.js). Sama portti ja sama malli
   * kuin linssikynnyksellä — awardXp on ainoa paikka, jonka läpi
   * pisteet kulkevat.
   *
   * Nousu EI anna mitään muuta kuin uuden nimikkeen (päätoimittajan
   * päätös 18.8.2026): ei rahaa, ei laattaa, ei linssiä. Onnittelun
   * sanoo pöllö, ja se jää jonoon, koska sama pisteiden lisäys on
   * voinut juuri avata linssin — kaksi ilmoitusta yhtä aikaa peittäisi
   * toisensa.
   *
   * Botit jäävät ulos: pöllö puhuu pelaajalle, ei tekoälylle.
   */
  tarkistaTietajataso(player, ennen, jalkeen) {
    for (const taso of tietajatasonNousut(ennen, jalkeen)) {
      this.say(player.id, `${player.name} nousi tietäjätasolle ${taso.taso}: ${taso.nimi} (${jalkeen} tp).`);
      if (!player.isBot) this.tietajaNousut.push(taso);
    }
  }

  /**
   * Merkitsee kaupungin käydyksi ja palkitsee ensikäynnistä. Laudan
   * ensimmäinen kaupunki on myös uusi lauta. Kutsu on turvallista toistaa:
   * jo käyty kaupunki ei tuota pisteitä uudelleen.
   */
  visitCity(player = this.player) {
    if (player.pos.type !== 'city') return 0;
    // Tietoruudun saapumishavainto seuraa jokaista saapumista — myös
    // kaupunkiin, jossa on käyty jo aiemmin.
    this.arrivalFact = { packId: this.pack.id, cityId: player.pos.city };
    const world = this.worldOf(player);
    if (!world || world.visited.has(player.pos.city)) return 0;

    let gained = 0;
    if (world.visited.size === 0) {
      gained += this.awardXp(player, XP_NEW_BOARD);
      this.say(player.id, `${player.name} astui uudelle laudalle: ${world.pack.boardLabel} (+${XP_NEW_BOARD} tp).`);
    }
    world.visited.add(player.pos.city);
    gained += this.awardXp(player, XP_NEW_CITY);
    return gained;
  }

  /**
   * Kirjaa vastatun kysymyksen tietoprosenttia varten. Mukaan lasketaan
   * tietovisat, tietoportit, kaksintaistelut ja umpeen valuneet tiimalasit —
   * kaikki, missä pelaajalta kysyttiin jotain.
   */
  countAnswer(player, right) {
    player.quizAsked = (player.quizAsked ?? 0) + 1;
    if (right) player.quizCorrect = (player.quizCorrect ?? 0) + 1;
  }

  /** Tietoprosentti kokonaislukuna; null, jos mitään ei ole vielä kysytty. */
  knowledgePercent(player = this.player) {
    if (!player.quizAsked) return null;
    return Math.round((player.quizCorrect / player.quizAsked) * 100);
  }

  // --- aika ---------------------------------------------------------------

  /** Kuluneet tunnit matkan alusta. Ensimmäinen vuoro on hetki nolla. */
  elapsedHours() {
    return (this.turnCount - 1) * TURN_HOURS;
  }

  /** Matkapäivä ykkösestä alkaen. */
  dayCount() {
    return Math.floor(this.elapsedHours() / 24) + 1;
  }

  /** Vuorokaudenaika: aamu, keskipäivä, ilta tai yö. */
  timeOfDay() {
    return timeOfDayName(this.elapsedHours() % 24);
  }

  /** Päiväkirjan päivämäärä yläpalkkiin: "Päivä 14, ilta". */
  clockLabel() {
    return `Päivä ${this.dayCount()}, ${this.timeOfDay()}`;
  }

  /**
   * Isoisän aikataulu: kun matkapäivä ohittaa merkinnän päivän, rivi nousee
   * tietoruutuun. Merkintä näytetään kerran, ja näytetyt jäävät talteen, jotta
   * tallennuksesta jatkava ei näe samaa riviä uudelleen.
   */
  updateSchedule() {
    this.scheduleNote = null;
    const rivit = this.pack.texts.schedule;
    if (!Array.isArray(rivit)) return;
    const day = this.dayCount();
    for (const rivi of rivit) {
      const key = `${this.pack.id}:${rivi.day}`;
      if (rivi.day > day || this.scheduleShown.has(key)) continue;
      this.scheduleShown.add(key);
      this.scheduleNote = { packId: this.pack.id, day: rivi.day, text: rivi.text };
      return; // yksi rivi kerrallaan, vaikka useampi päivä olisi ohitettu
    }
  }

  /**
   * Isoisän ennätys aarteen löytyessä. Ennätys on tavoite eikä tuomio: ajan
   * loppuminen ei päätä peliä koskaan eikä hitaampi matka menetä mitään.
   * Palauttaa merkinnän, jonka käyttöliittymä voi leimata passiin.
   */
  noteRecord(player = this.player) {
    if (this.recordNoted) return null;
    this.recordNoted = true;
    const day = this.dayCount();
    if (day <= RECORD_DAYS) {
      this.awardXp(player, XP_RECORD);
      this.say(player.id, `Päivä ${day}. Isoisän ennätys oli ${RECORD_DAYS} päivää — se on nyt rikottu.`);
      this.recordMark = { packId: this.pack.id, day, label: `${RECORD_DAYS} päivää rikottu` };
      return this.recordMark;
    }
    this.say(player.id, `Päivä ${day}. Isoisä olisi ollut jo kotona — mutta hän ei nähnyt tätä kaikkea.`);
    return null;
  }

  /*
   * TÄHTIVIHJEJÄRJESTELMÄ POISTETTU (omistajan päätös 11.8.2026).
   *
   * Tässä oli starCityOf, starHint ja starHintCity: isoisän päiväkirjan
   * taitettu sivu, joka osoitti kohti laudan ainoaa pääaarretta. Kun
   * aarteita on seitsemän — yksi joka mantereella — vihje ei enää ole
   * arvoituksen ydin: manner itse rajaa etsinnän. Poistettiin myös
   * pakkausten starHints- ja starHintAlue-taulut sekä HINT_EVERY_TURNS.
   * Tarinatekstien omiin vihjeisiin (kohtaamiset, kaaritekstit) tämä ei
   * koske.
   */

  /**
   * Kulttuurikysymys Tutki-kortissa (tutustu ja vastaa -kokeilu):
   * vastaus kirjataan kerran per kaupunki ja oikeasta saa pienen
   * palkkion. Väärä ei maksa mitään, mutta uutta yritystä samaan
   * kaupunkiin ei saa — palkkiota ei voi kalastella.
   */
  actionKulttuuri(cityId, oikein, palkkio = 25) {
    const avain = `${this.pack.id}:${cityId}`;
    if (this.kulttuuriVastatut.has(avain)) return { ok: false, error: 'Jo vastattu' };
    this.kulttuuriVastatut.add(avain);
    if (oikein) {
      this.player.money += palkkio;
      this.say(this.player.id, `${this.player.name} tunsi paikallista kulttuuria (+${palkkio} puntaa).`);
    }
    return { ok: true, palkittu: !!oikein };
  }

  /**
   * Lehden minitehtävä (omistajan toive 5.8.2026): pieni kysymys, johon
   * vastaus löytyy saman Tutki-sivun sisällöstä. Palkkio on
   * kulttuurivisaa pienempi, ja sama tehtävä palkitaan vain kerran
   * kaupunkia kohti — maan yhteinen aihesivu voi silti palkita
   * uudelleen maan toisessa kaupungissa, koska lehti on eri.
   */
  actionMinitehtava(cityId, aiheId, oikein, palkkio = 10) {
    const avain = `${this.pack.id}:${cityId}:${aiheId}`;
    if (this.minitehtavatVastatut.has(avain)) return { ok: false, error: 'Jo vastattu' };
    this.minitehtavatVastatut.add(avain);
    if (oikein) {
      this.minitehtavatOikein.add(avain);
      this.player.money += palkkio;
      this.say(this.player.id, `${this.player.name} ratkaisi lehden minitehtävän (+${palkkio} puntaa).`);
    }
    return { ok: true, palkittu: !!oikein };
  }

  /**
   * AIKAKAUSJULISTE MATKALAUKKUUN (omistajan tilaus 21.8.2026).
   *
   * Julisteen saa kaupungin oman lehden minitehtävästä, ja se jää
   * laukun julistekokoelmaan koko matkan ajaksi. Myöntö on erillään
   * actionMinitehtavasta kahdesta syystä: kaikilla kaupungeilla ei ole
   * julistetta, ja juliste myönnetään myös TAKAUTUVASTI sellaiselle
   * pelaajalle, joka ratkaisi tehtävän ennen kuin julisteita oli —
   * silloin rahaa ei tule uudestaan, mutta palkinto ei jää saamatta.
   *
   * Vastaus kertoo, oliko juliste uusi: kutsuja näyttää suurennoksen ja
   * heilauttaa laukkua vain uudesta löydöstä.
   */
  myonnaJuliste(cityId) {
    if (!cityId || this.julisteet.has(cityId)) return { ok: true, uusi: false };
    this.julisteet.add(cityId);
    return { ok: true, uusi: true };
  }

  /** Lentää porttikaupungista toiselle laudalle. Vie koko vuoron. */
  actionGateway(index) {
    const link = this.gatewayOptions()[index];
    if (!link) return { ok: false, error: 'Täältä ei ole lentoa toiselle laudalle' };
    const p = this.player;
    const pack = packById(link.pack);
    p.money -= FLIGHT_PRICE;
    this.enterWorld(pack);
    p.packId = pack.id;
    p.pos = { type: 'city', city: link.city };
    this.visitCity(p);
    this.lastPath = null;
    this.say(p.id, `${p.name} lensi ${FLIGHT_PRICE} punnalla: ${link.label}.`);
    this.emit('flight', link.label, { icon: 'kompassi', sub: `−${FLIGHT_PRICE} puntaa` });
    if (this.offerQuiz()) return { ok: true, offer: true };
    this.endTurn();
    return { ok: true };
  }

  /**
   * MANNERLENTO: kun tämän mantereen unohdettu aarre on löytynyt, matka
   * voi jatkua toiselle mantereelle mistä tahansa kaupungista.
   *
   * Lentokenttäehtoa EI ole (omistajan linjaus 11.8.2026: nykymaailmassa
   * lentokentälle pääsee käytännössä joka kaupungista) — siksi tämä on
   * oma metodinsa actionFly'n rinnalla eikä ehto sen sisällä.
   *
   * Kohteita on yksi per manner: mantereen ENSIMMÄINEN aloituskaupunki
   * kaupunkijärjestyksessä. Valinta on vakio eikä kuluta arvontaa, joten
   * tallennettu peli palautuu samanlaisena. Kaikkien 19 aloituskaupungin
   * tarjoaminen olisi tehnyt matkavalikosta luettelon.
   *
   * Vain vaellustilassa: moninpelissä ensimmäinen aarre aloittaa
   * kotiinjuoksun, jota lento sotisi suoraan vastaan.
   */
  mannerLennot(player = this.player) {
    if (this.phase !== 'action') return [];
    if (!this.roaming) return [];
    if (player.money < FLIGHT_PRICE) return [];
    const city = this.cityOf(player);
    if (!city) return [];
    const oma = this.mannerOf(city.id);
    if (!this.mantereenTahtiLoytynyt(oma)) return [];

    /*
     * Vain mantereet, joiden aarre on vielä kateissa (Fablen rajaus
     * 11.8.2026): lento on jahdin jatkamista varten, ja jo löydetylle
     * mantereelle pääsee tavallisilla reiteillä. Samalla nappirivi
     * lyhenee matkan edetessä eikä valikko kasva yli ruudun.
     */
    const nahdyt = new Set([oma]);
    const kohteet = [];
    for (const c of this.pack.cities) {
      if (!c.start) continue;
      const manner = this.mannerOf(c.id);
      if (nahdyt.has(manner)) continue;
      nahdyt.add(manner);
      if (this.mantereenTahtiLoytynyt(manner)) continue;
      kohteet.push({ city: c.id, manner, label: c.name });
    }
    return kohteet;
  }

  /** Lentää toiselle mantereelle. Vie koko vuoron, hinta FLIGHT_PRICE. */
  actionMannerLento(cityId) {
    const kohde = this.mannerLennot().find((k) => k.city === cityId);
    if (!kohde) return { ok: false, error: 'Sinne ei ole mannerlentoa' };
    const p = this.player;
    this.travelMode = 'fly';
    p.money -= FLIGHT_PRICE;
    p.pos = { type: 'city', city: cityId };
    this.visitCity(p);
    this.lastPath = null;
    const city = this.board.cityById.get(cityId);
    this.say(p.id, `${p.name} lensi ${FLIGHT_PRICE} punnalla kaupunkiin ${city.name}.`);
    this.emit('flight', `Lento kaupunkiin ${city.name}`, { icon: 'kone', sub: `−${FLIGHT_PRICE} puntaa` });
    // checkWin ei tarvita: mannerlento on vaellustilan mekaniikka, ja
    // vaelluksessa checkWin palauttaa aina false.
    if (this.offerQuiz()) return { ok: true, offer: true };
    this.endTurn();
    return { ok: true };
  }

  /** Voittoruudusta voi jatkaa vaellusta: peli ei enää pääty. */
  continueRoaming() {
    if (this.phase !== 'over' || !this.winner) return { ok: false, error: 'Peli on kesken' };
    this.roaming = true;
    this.winner = null;
    this.phase = 'action';
    this.say(null, 'Retki jatkuu! Peli ei enää pääty — kerätkää löytöjä ja tutkikaa maailmaa porttikaupunkien kautta.');
    this.endTurn();
    return { ok: true };
  }

  // --- vuoron kulku -------------------------------------------------------

  beginTurn() {
    if (this.phase === 'over') return;
    const p = this.player;
    this.die = null;
    this.moves = null;
    this.lastPath = null;
    this.travelMode = null;
    this.pendingFare = 0;
    this.autoTravel = false;

    // Hevosenkenkä tai tähti kotikaupungissa ratkaisee pelin heti vuoron alussa.
    if (this.checkWin()) return;

    if (this.needsAid(p)) {
      p.money += STRANDED_AID;
      this.say(p.id, `${p.name} on jumissa ilman rahaa ja saa pankilta ${STRANDED_AID} puntaa.`);
      this.emit('aid', `${p.name} sai pankilta ${STRANDED_AID} puntaa`, { icon: 'kukkaro' });
    }

    // Kun vaihtoehtoja ei ole — esimerkiksi sisämaan kaupungissa tai kesken
    // reittiä — matkustustapa valitaan valmiiksi ja vuoro alkaa suoraan
    // nopanheitosta. Turhaa napinpainallusta ei tarvita.
    const modes = this.travelModes(p);
    this.autoTravel = modes.length === 1 && modes[0] !== 'stay';
    if (this.autoTravel) this.actionTravel(modes[0]);
  }

  /**
   * Kotisääntö: pelaaja saa pankilta rahaa, jos hän ei pysty liikkumaan lainkaan
   * tai jos yhteenkään tavoitteeseen ei pääse niillä rahoilla jotka hänellä on.
   *
   * Ratkaisevaa on riittävätkö rahat, ei se ovatko ne aivan lopussa: 20 punnan
   * kanssa laivalipun takana oleva tavoite on yhtä lailla saavuttamattomissa
   * kuin tyhjin taskuin.
   */
  needsAid(p) {
    // Ilman yhtään matkustustapaa pelaaja ei pääse mihinkään.
    const canTravel = this.travelModes(p).some((m) => m !== 'stay');
    if (!canTravel) return true;

    // Vaelluksessa kotiin ei tarvitse ehtiä, joten tavoitteita ovat aina laatat.
    const racingHome = !this.roaming && (p.stars > 0 || (this.starFound && p.horseshoes > 0));
    const goals = racingHome
      ? new Set(this.players.map((pl) => pl.start))
      : new Set(this.tokens.keys());
    if (goals.size === 0) return false;

    const reachable = reachableCities(this.board, p.pos, p.money);
    for (const goal of goals) {
      if (reachable.has(goal)) return false;
    }
    return true;
  }

  endTurn() {
    if (this.phase === 'over') return;
    this.phase = 'action';
    this.current = (this.current + 1) % this.players.length;
    if (this.current === 0) this.turnCount++;
    this.updateSchedule();
    this.beginTurn();
  }

  /**
   * Kehittäjän oikotie: nappula suoraan valittuun kaupunkiin (omistajan
   * toive). Tarkoitus on päästä katsomaan minkä tahansa kaupungin
   * sisältöä ilman että sinne pitää pelata.
   *
   * Tämä ei ole siirto vaan siirron ohitus, ja siksi se on tahallisen
   * laiska: päivä ei kulu, rahaa ei mene, noppaa ei heitetä eikä vuoro
   * vaihdu. Voittotarkistusta ei tehdä — tähtikaupunkiin hyppääminen ei
   * saa lopettaa peliä vahingossa kesken tarkastelun.
   *
   * `visitCity` kutsutaan silti, koska juuri se tuottaa saapumisen
   * havainnon päiväkirjaan ja merkitsee kaupungin nähdyksi. Ilman sitä
   * kortti näyttäisi edellisen kaupungin tekstiä.
   */
  actionKehittajaSiirto(cityId) {
    const city = this.board.cityById.get(cityId);
    if (!city) return { ok: false, error: 'Tuntematon kaupunki' };
    const p = this.player;
    p.pos = { type: 'city', city: cityId };
    this.lastPath = [p.pos];
    this.visitCity(p);
    this.moves = null;
    this.die = null;
    this.travelMode = null;
    this.pendingFare = 0;
    this.phase = 'action';
    this.say(p.id, `${p.name} siirtyi kehittäjätilassa kaupunkiin ${city.name}.`);
    return { ok: true };
  }

  /** Valitsee matkustustavan. Maksu peritään vasta kun siirto tehdään. */
  actionTravel(mode, opts = {}) {
    if (this.phase !== 'action') return { ok: false, error: 'Väärä vaihe' };
    if (!this.travelModes().includes(mode)) {
      return { ok: false, error: 'Tuo matkustustapa ei ole nyt käytettävissä' };
    }
    if (mode === 'stay') return this.actionQuiz(opts);

    const p = this.player;
    this.travelMode = mode;
    // Laivalippu maksetaan kun matka lähtee satamasta; merellä jatketaan ilmaiseksi.
    this.pendingFare = mode === 'sea' && p.pos.type === 'city' ? SEA_FARE : 0;
    this.phase = 'roll';
    return { ok: true, mode };
  }

  /** Palaa matkustustavan valintaan ennen nopanheittoa. */
  actionCancelTravel() {
    if (this.phase !== 'roll') return { ok: false, error: 'Väärä vaihe' };
    if (this.autoTravel) return { ok: false, error: 'Muita matkustustapoja ei ole' };
    this.travelMode = null;
    this.pendingFare = 0;
    this.phase = 'action';
    return { ok: true };
  }

  /** Heittää nopan ja laskee mahdolliset päätepisteet valitulla tavalla. */
  actionRoll() {
    if (this.phase !== 'roll') return { ok: false, error: 'Valitse ensin matkustustapa' };
    const p = this.player;
    const die = this.rollDie();
    this.die = die;
    this.moves = findMoves(this.board, p.pos, die, { mode: this.travelMode });
    this.say(p.id, `${p.name} heitti ${die}.`);
    if (this.moves.size === 0) {
      this.say(p.id, `${p.name} ei pysty liikkumaan ja jää paikalleen.`);
      this.emit('stuck', `${p.name} ei pysty liikkumaan`, { icon: 'estetty' });
      this.endTurn();
      return { ok: true, moved: false, die };
    }
    this.phase = 'move';
    return { ok: true, moved: false, die };
  }

  /** Siirtää pelaajan valittuun päätepisteeseen. */
  actionMove(key) {
    if (this.phase !== 'move') return { ok: false, error: 'Heitä ensin noppa' };
    const move = this.moves.get(key);
    if (!move) return { ok: false, error: 'Tuo ei ole laillinen siirto' };

    const p = this.player;
    const fare = this.pendingFare;
    p.money -= fare;
    p.pos = move.pos;
    this.lastPath = move.path;
    this.pendingFare = 0;

    const city = this.cityOf();
    if (city) this.visitCity(p);
    const fareText = fare ? ` (laivamatka ${fare} puntaa)` : '';
    const where = city
      ? `kaupunkiin ${city.name}`
      : `reitille ${this.routeName(move.pos.edge)}`;
    this.say(p.id, `${p.name} siirtyi ${where}${fareText}.`);
    if (fare) this.emit('fare', `Laivamatka −${fare} puntaa`, { icon: 'ankkuri' });

    this.moves = null;
    this.die = null;
    if (this.checkWin()) return { ok: true, win: true };
    if (this.offerQuiz()) return { ok: true, offer: true };
    this.endTurn();
    return { ok: true };
  }

  /**
   * Saapumiskortti tarjotaan vain, kun kaupungissa on laatta — se on
   * aarrepysähdys ja pelin ydin. Laatattomissa kaupungeissa (pulmat ja
   * tutkiminen) mikään ei hyppää ruudulle itsestään: Tutki paikka -nappi
   * odottaa alavalikossa (travelModes: stay).
   */
  offerQuiz() {
    // Saapuminen ei enää pysäytä vuoroa erilliseen tarjousvaiheeseen:
    // mikään ikkuna ei aukea itsestään, vaan laattakaupunkiakin tutkitaan
    // alarivin Tutki-napista (omistajan ohje). 'offer'-vaihe jää koodiin
    // vanhojen tallennusten varalle.
    return false;
  }

  /**
   * Voiko kaupunkia tutkia ilman laattaa: kerran pelissä, jos kysyttävää
   * on. Näin myös lähtökaupungit (Tanger, Kairo) ja jo tyhjennetyt
   * kaupungit tarjoavat tutkimista — palkintona on tietoa ja
   * tietäjäpisteitä, ei laattaa.
   */
  canExplore(city) {
    if (!city || this.tokens.has(city.id)) return false;
    /*
     * Kaarikaupungeissa kertatutkiminen POISTUI (omistajan päätös
     * 10.8.2026: kohtaamisen rinnalla vanha kevyt kysymys oli "kaksi
     * juttua päällekkäin"). Kohtaaminen uusintayrityksineen on näiden
     * kaupunkien ainoa laataton tehtävä; kaarettomat laudat (Afrikka,
     * Aasia…) pitävät kertatutkimisen ennallaan.
     */
    if (KAARI_LAUDAT.has(this.pack.id) && TARINAKAARI[city.id]?.kysymys) return false;
    if (this.explored.has(`${this.pack.id}:${city.id}`)) return false;
    const omat = this.pack.questions[city.id] ?? [];
    const yleiset = this.pack.questions.general ?? [];
    return omat.length + yleiset.length > 0;
  }

  /**
   * Avaa tutkimiskysymyksen kaupungissa, jossa ei ole laattaa. Aina
   * monivalinta: väittämät, tapahtumat ja valokuvat kuuluvat
   * aarrepysähdyksiin. Merkitään tutkituksi heti, ettei samaa kaupunkia
   * voi lypsää uudelleen yrittämällä.
   */
  openExplore(city) {
    this.explored.add(`${this.pack.id}:${city.id}`);
    const question = this.pickQuestion(city.id, this.player.quizLevel);
    const order = this.shuffledOrder(question.options.length);
    this.quiz = {
      cityId: city.id,
      hard: false,
      explore: true,
      frame: this.pickAsker(city),
      question: question.q,
      fact: question.fact,
      source: sourceList(question.source),
      options: order.map((i) => question.options[i]),
      correct: order.indexOf(question.correct),
      hint: question.hint ?? null,
      hintShown: false,
      hidden: [],
      chosen: null,
      right: null,
      timedOut: false,
      seconds: QUIZ_SECONDS,
    };
    this.phase = 'quiz';
    return { ok: true, quiz: this.quiz };
  }

  /** Ohittaa tietovisan ja päättää vuoron. */
  actionSkipQuiz() {
    if (this.phase !== 'offer') return { ok: false, error: 'Väärä vaihe' };
    this.endTurn();
    return { ok: true };
  }

  /**
   * Käytettävissä olevat muodot painoineen. Muoto putoaa pois, jos laudalla
   * ei ole sen sisältöä tai jos se oli edellinen erikoismuoto — sama
   * erikoismuoto ei toistu kahdesti peräkkäin.
   */
  formWeights(cityId) {
    const painot = { ...FORM_WEIGHTS };
    if (!(this.pack.questions?.claims ?? []).length) painot.claim = 0;
    if (!(this.pack.events ?? []).length) painot.event = 0;
    // Valokuvakysymys tarvitsee ladattuja kuvia (käyttöliittymä syöttää
    // ne setPhotoPool-kutsulla) ja tarpeeksi kaupunkeja nimivaihtoehdoiksi.
    if (this.photoTargets().length === 0 || this.board.cities.length < PHOTO_CHOICES) {
      painot.photo = 0;
    }
    // Lippukysymys tarvitsee laudan omat maat. Afrikan ja Euroopan
    // erillislaudoilla niitä on, yhdistetyllä 84 — mutta esimerkiksi
    // Suomi-laudalla ei yhtään, ja silloin muoto putoaa pois.
    if (this.flagTargets().length < FLAG_CHOICES) painot.flag = 0;
    if (this.lastForm && this.lastForm !== 'quiz') painot[this.lastForm] = 0;
    // Kaupungin omissa kysymyksissä voi olla vaikeita, joita ei ole vielä
    // kysytty; monivalinta on aina mahdollinen, joten se kerää loput.
    const siirtyy = FORM_WEIGHTS.claim - painot.claim
      + FORM_WEIGHTS.event - painot.event
      + FORM_WEIGHTS.photo - painot.photo
      + FORM_WEIGHTS.flag - painot.flag;
    painot.quiz += siirtyy;
    return painot;
  }

  /** Arpoo pysähdyksen muodon painotetusti pelin omalla satunnaisluvulla. */
  pickForm(cityId) {
    const painot = this.formWeights(cityId);
    const summa = Object.values(painot).reduce((a, b) => a + b, 0);
    let osuma = this.rng() * summa;
    for (const [muoto, paino] of Object.entries(painot)) {
      osuma -= paino;
      if (osuma < 0) return muoto;
    }
    return 'quiz';
  }

  /**
   * Kohtaamisen tila tässä kaupungissa (omistajan sääntö 10.8.2026):
   * epäonnistuneen kohtaamisen saa yrittää uudelleen KERRAN
   * ("viimeinen mahdollisuus tavata"); toisen epäonnistumisen jälkeen
   * henkilö ei ole tavattavissa, ja onnistumisen jälkeen kohtaamista
   * ei pelata uudelleen. Yritys kirjataan avattaessa, ettei kesken
   * jätetty kohtaaminen anna ilmaista uusintaa. Ei tallenneta: uusi
   * istunto saa kohtaamiset uudelleen, kuten UI:n tervehdykset.
   * Palauttaa null, jos kaupungilla ei ole kaarta tällä laudalla.
   */
  kaariTilanne(cityId) {
    if (!KAARI_LAUDAT.has(this.pack.id)) return null;
    const kohde = TARINAKAARI[cityId];
    if (!kohde?.kysymys) return null;
    // ??= turvaa myös polut, jotka ohittavat konstruktorin (fromJSON
    // alustaa kentän itse, mutta kaatunut Tutki-nappi ei saa toistua).
    this.kaariYritykset ??= new Map();
    const tila = this.kaariYritykset.get(`${this.pack.id}:${cityId}`)
      ?? { yritykset: 0, onnistui: false };
    return { kohde, yritykset: tila.yritykset, onnistui: tila.onnistui };
  }

  /** Tarinakaaren kohde, jos kohtaaminen on vielä pelattavissa. */
  kaariTarina(cityId) {
    const tila = this.kaariTilanne(cityId);
    return tila && !tila.onnistui && tila.yritykset < KAARI_YRITYKSET
      ? tila.kohde : null;
  }

  /**
   * Avaa pysähdyksen: monivalinta, isoisän väittämä, karttakysymys tai
   * tapahtumakortti. Oikea vastaus kääntää laatan ilmaiseksi.
   * `hard: true` arpoo vaikean kysymyksen, josta oikein vastattaessa saa
   * laatan lisäksi HARD_BONUS puntaa — vaikea kysymys on aina monivalinta,
   * koska panos on suurempi.
   */
  actionQuiz({ hard = false, form = null } = {}) {
    if (this.phase !== 'offer' && this.phase !== 'action') {
      return { ok: false, error: 'Väärä vaihe' };
    }
    /*
     * Tarinakaari (omistajan tilaus 9.8.2026: paketti suoraan peliin):
     * kohtaaminen, jossa henkilö esittää isoisän jättämän kysymyksen.
     * Kohtaaminen on kaupungin ENSIMMÄINEN tehtävä JOKA kaupungissa —
     * myös laatattomissa ja pulmakaupungeissa (omistajan palaute
     * 10.8.2026 illalla Ateenasta: pulma ja kevyt kertatutkiminen
     * ohittivat kohtaamisen, jolloin henkilö ja kertojan luenta jäivät
     * kokonaan pois: "pitäisi tulla se henkilö ja alkaa kertojan ääni
     * kuulua"). Kohtaaminen on ainoa ääneen luettu tehtävämuoto.
     * Nimetty muu muoto tai vaikea kysymys ohittaa kaaren kuluttamatta
     * sitä, eikä botti kuluta kohtaamista — kaariKaytetty on pelaajien
     * yhteinen, ja tarina kuuluu ihmiselle.
     */
    const nykyinen = this.cityOf();
    const kaari = (hard || (form && form !== 'quiz') || this.player.isBot || !nykyinen)
      ? null : this.kaariTarina(nykyinen.id);

    // Isoisän pulma on kohtaamisen jälkeen pysähdyksen ainoa tehtävä
    // (omistajan linjaus 10.8.2026: "Aina on siis vain yksi tehtävä,
    // joko visa, pulma, tai joku muu"). Laatallisessa kaupungissa
    // pulma kääntää laatan kuten visa; laatattomassa se on entiseen
    // tapaan pelkkä tietäjäpistepysähdys. Nimetty muoto tai vaikea
    // kysymys ohittaa pulman.
    if (!kaari && !hard && form === null && this.pendingPuzzle()) return this.openPuzzle();

    const city = this.tokenHere();
    if (!city && !kaari) {
      // Ilman laattaa kaupunkia voi silti tutkia kerran pelissä.
      if (!hard && nykyinen && this.canExplore(nykyinen)) return this.openExplore(nykyinen);
      return { ok: false, error: 'Täällä ei ole laattaa' };
    }
    if (hard && !this.hardAvailable(city.id)) {
      return { ok: false, error: 'Täällä ei ole vaikeita kysymyksiä' };
    }

    const muoto = (hard || kaari) ? 'quiz' : (form ?? this.pickForm(city.id));
    this.lastForm = muoto;
    if (muoto === 'claim') return this.openClaim(city);
    if (muoto === 'photo') return this.openPhotoQuestion(city);
    if (muoto === 'flag') return this.openFlagQuestion(city);
    if (muoto === 'event') return this.openEvent(city);

    const difficulty = hard ? 'hard' : this.player.quizLevel;
    let question;
    if (kaari) {
      // Yritys kirjataan avattaessa — kesken jätetty kohtaaminen on
      // käytetty yritys, ei ilmainen kurkistus kysymykseen.
      const avain = `${this.pack.id}:${nykyinen.id}`;
      const tila = this.kaariYritykset.get(avain) ?? { yritykset: 0, onnistui: false };
      tila.yritykset += 1;
      this.kaariYritykset.set(avain, tila);
      question = {
        q: kaari.kysymys.q,
        options: kaari.kysymys.vaihtoehdot,
        correct: kaari.kysymys.oikea,
        fact: kaari.kysymys.fakta,
      };
    } else {
      question = this.pickQuestion(city.id, difficulty);
    }
    const order = this.shuffledOrder(question.options.length);
    this.quiz = {
      cityId: (city ?? nykyinen).id,
      hard,
      kaari: Boolean(kaari),
      // Laatattomassa kaupungissa kohtaaminen palkitsee kuten
      // tutkiminen: löytöpalkkio ja tietäjäpisteet, laattaa ei ole.
      // Lippu ohjaa answerQuizin explore-haaraan; kertatutkimista
      // (canExplore) kohtaaminen ei kuluta.
      explore: Boolean(kaari && !city),
      frame: this.pickAsker(city ?? nykyinen),
      question: question.q,
      fact: question.fact,
      source: sourceList(question.source),
      options: order.map((i) => question.options[i]),
      correct: order.indexOf(question.correct),
      hint: question.hint ?? null,
      hintShown: false,
      hidden: [],
      chosen: null,
      right: null,
      timedOut: false,
      seconds: QUIZ_SECONDS,
    };
    this.phase = 'quiz';
    return { ok: true, quiz: this.quiz };
  }

  /**
   * Isoisän väittämä: päiväkirjamerkintä, jonka pelaaja arvioi todeksi tai
   * taruksi. Kaksi nappia neljän sijaan. Väittämä on sama quiz-olio kuin
   * monivalinta, joten vastaaminen, aikakatkaisu ja sulkeminen toimivat
   * ennallaan — vain vaihtoehtoja on kaksi ja `kind` kertoo muodon.
   */
  openClaim(city) {
    const pool = this.pack.questions.claims ?? [];
    const fresh = pool.filter((c) => !this.usedQuestions.has(c.q));
    const deck = fresh.length ? fresh : pool;
    const claim = deck[Math.floor(this.rng() * deck.length)];
    this.usedQuestions.add(claim.q);

    this.quiz = {
      kind: 'claim',
      cityId: city.id,
      hard: false,
      question: claim.q,
      fact: claim.fact,
      // Väite koskee usein muuta paikkaa kuin sitä, jossa pelaaja seisoo —
      // paikka näytetään otsikossa, ettei merkintää lue väärään maisemaan.
      place: claim.place ?? null,
      source: sourceList(claim.source),
      // Kysymys on "pitääkö tämä yhä paikkansa?": merkintä oli totta
      // vuonna 1873, ja pelaaja arvioi onko maailma ehtinyt muuttua.
      // Pelkkä "totta vai tarua" olisi epäreilu menneen ajan merkinnälle.
      options: ['Pitää yhä paikkansa', 'Ei enää pidä'],
      correct: claim.correct ? 0 : 1,
      hint: null,
      hintShown: false,
      hidden: [],
      chosen: null,
      right: null,
      timedOut: false,
      seconds: QUIZ_SECONDS,
    };
    this.phase = 'quiz';
    return { ok: true, quiz: this.quiz };
  }

  /**
   * Käyttöliittymä syöttää tänne kaupungit, joista on kuratoitu
   * valokuva, ja kuvien tiedot (tiedostonimi ja lähde).
   *
   * Ennen v413:a lista rakennettiin Wikipedian artikkelikuvista, ja
   * kuva saattoi esittää mitä tahansa: omistaja näki Kumasin kohdalla
   * Kofi Annanin muotokuvan. Syy oli se, että artikkelin pääkuva on
   * usein montaasi, ja montaasin hylkäävä suodatin poimi tilalle
   * kuvalistan ensimmäisen valokuvan — Nairobissa se oli kuva vuoden
   * 1998 pommi-iskusta. Paikkakysymykseen ei voi arpoa kuvaa lähteestä,
   * joka ei lupaa kuvan esittävän paikkaa.
   *
   * Lista ei ole pelitilaa eikä sitä tallenneta. Kuratoidut kuvat ovat
   * repossa ja peilissä, joten valokuvamuoto toimii nyt myös ilman
   * verkkoa.
   */
  setPhotoPool(cityIds, kuvat = null) {
    this.photoPool = new Set(cityIds);
    this.photoFiles = kuvat instanceof Map ? kuvat : new Map(Object.entries(kuvat ?? {}));
  }

  /** Kuvakohteet, joita ei ole vielä kysytty tässä pelissä. */
  photoTargets() {
    return [...(this.photoPool ?? [])].filter(
      (id) => this.board.cityById.has(id) && !this.usedQuestions.has(`photo:${id}`),
    );
  }

  /**
   * Lippukysymykseen kelpaavat maat: laudan omat, joilla on lippu ja
   * joita ei ole vielä kysytty tässä pelissä.
   *
   * Liput ovat repossa (assets/liput), joten kysymys toimii myös
   * yhteydettömänä — toisin kuin valokuvakysymys, joka hakee kuvan
   * verkosta.
   */
  flagTargets() {
    const maat = this.pack.map?.countryShapes ?? {};
    return Object.entries(maat)
      .filter(([iso, maa]) => maa.lippu && maa.nimi && !this.usedQuestions.has(`flag:${iso}`))
      .map(([iso, maa]) => ({ iso, nimi: maa.nimi, lippu: maa.lippu }));
  }

  /**
   * Lippukysymys: tullimies näyttää lipun ja kysyy, minkä maan se on.
   *
   * Miksi tämä on oma muotonsa eikä tavallinen kysymys: lipun
   * tunnistaminen on kuvan lukemista, ei muistamista, ja se opettaa
   * juuri sen mikä lipussa on — värit, tähdet, puolikuu. Peli tuntee
   * jo 84 maan liput, joten aineistoa ei tarvitse hakea mistään.
   */
  openFlagQuestion(city) {
    const kohteet = this.flagTargets();
    if (kohteet.length < FLAG_CHOICES) return this.actionQuiz({ form: 'quiz' });

    /*
     * Oikea vastaus painottuu siihen maahan, jossa pelaaja on: paikka
     * ja lippu kuuluvat yhteen, ja pelaaja on juuri lukenut maan nimen
     * saapumiskortista. Jos maata ei tunneta, arvotaan mikä tahansa.
     */
    const omaIso = this.pack.map?.cityCountry?.[city.id] ?? null;
    const oma = kohteet.find((m) => m.iso === omaIso);
    const kohde = oma ?? kohteet[Math.floor(this.rng() * kohteet.length)];
    this.usedQuestions.add(`flag:${kohde.iso}`);

    // Väärät vaihtoehdot ovat muita laudan maita.
    const muut = kohteet.filter((m) => m.iso !== kohde.iso);
    const vaarat = this.shuffledOrder(muut.length)
      .slice(0, FLAG_CHOICES - 1)
      .map((i) => muut[i]);
    const jarj = this.shuffledOrder(FLAG_CHOICES);
    const ehdokkaat = jarj.map((i) => [kohde, ...vaarat][i]);

    this.quiz = {
      kind: 'flag',
      cityId: city.id,
      flagFile: kohde.lippu,
      flagCountry: kohde.nimi,
      hard: false,
      frame: 'tullimies kääntää passia kädessään ja kysyy',
      question: 'Minkä maan lippu tämä on?',
      fact: `Lippu on ${kohde.nimi}.`,
      source: [],
      options: ehdokkaat.map((m) => m.nimi),
      correct: ehdokkaat.indexOf(kohde),
      hint: null,
      hintShown: false,
      hidden: [],
      chosen: null,
      right: null,
      timedOut: false,
      seconds: QUIZ_SECONDS,
    };
    this.phase = 'quiz';
    return { ok: true, quiz: this.quiz };
  }

  /**
   * Valokuvakysymys: matkavalokuvaaja näyttää oikean valokuvan paikasta,
   * ja pelaaja päättelee mikä paikka kuvassa on. Vanhat karttakysymykset
   * testasivat pelilaudan keksittyä reittiverkkoa — tämä opettaa miltä
   * paikat oikeasti näyttävät.
   *
   * Kuva tulee kuratoiduista matkakirjavalokuvista (setPhotoPool), ei
   * Wikipedian artikkelikuvasta. Kuratoitu kuva on silmällä tarkistettu
   * ja esittää nimenomaan sitä paikkaa; artikkelikuva ei sitä lupaa.
   */
  openPhotoQuestion(city) {
    /*
     * Kuvan kohde ei saa olla se kaupunki, jossa pelaaja seisoo:
     * kysymyskortin otsikko on "<kaupunki> — matkavalokuvaaja levittää
     * vedoksensa", eli nimi lukisi vastauksena kysymyksen yläpuolella.
     * Ennen v413:a pooli oli vain kourallinen ladattuja kuvia, joten
     * osuma oli harvinainen; nyt poolissa on laudan kaikki kaupungit,
     * joten rajaus on pakko tehdä täällä.
     */
    const kohteet = this.photoTargets().filter((id) => id !== city.id);
    // Ilman kuvia pudotaan tavalliseen monivalintaan.
    if (!kohteet.length) return this.actionQuiz({ form: 'quiz' });

    const kohdeId = kohteet[Math.floor(this.rng() * kohteet.length)];
    const kohde = this.board.cityById.get(kohdeId);
    this.usedQuestions.add(`photo:${kohdeId}`);

    // Väärät vaihtoehdot ovat laudan muiden kaupunkien nimiä.
    const muut = this.board.cities.filter((c) => c.id !== kohdeId);
    const vaarat = this.shuffledOrder(muut.length)
      .slice(0, PHOTO_CHOICES - 1)
      .map((i) => muut[i]);
    const jarj = this.shuffledOrder(PHOTO_CHOICES);
    const ehdokkaat = jarj.map((i) => [kohde, ...vaarat][i]);

    const kuva = this.photoFiles?.get(kohdeId) ?? null;

    this.quiz = {
      kind: 'photo',
      cityId: city.id,
      // Kuvan kohde voi olla eri paikka kuin missä seistään.
      photoCity: kohde.id,
      photoFile: kuva?.tiedosto ?? null,
      photoWiki: kohde.wiki ?? kohde.name,
      hard: false,
      frame: 'matkavalokuvaaja levittää vedoksensa pöytään ja kysyy',
      question: 'Mikä paikka valokuvassa on?',
      fact: `Kuvassa on ${kohde.name}.${kuva?.lahde ? ` Valokuva: ${kuva.lahde}.` : ''}`,
      source: [],
      options: ehdokkaat.map((c) => c.name),
      correct: ehdokkaat.indexOf(kohde),
      hint: null,
      hintShown: false,
      hidden: [],
      chosen: null,
      right: null,
      timedOut: false,
      seconds: QUIZ_SECONDS,
    };
    this.phase = 'quiz';
    return { ok: true, quiz: this.quiz };
  }

  /**
   * Tapahtumakortti: kysymyksen sijaan tapahtuu jotain. Vaikutus on aina
   * pieni ja reilu — tapahtuma ei vie aarretta eikä isoa summaa, ja
   * laatta jää kääntämättä, joten kaupunkiin voi palata.
   */
  openEvent(city) {
    const pool = this.pack.events ?? [];
    const fresh = pool.filter((e) => !this.usedQuestions.has(e.text));
    const deck = fresh.length ? fresh : pool;
    const kortti = deck[Math.floor(this.rng() * deck.length)];
    this.usedQuestions.add(kortti.text);

    this.eventCard = { cityId: city.id, text: kortti.text, effect: kortti.effect, done: null };
    this.phase = 'event';
    return { ok: true, event: this.eventCard };
  }

  /** Toteuttaa tapahtuman vaikutuksen ja päättää vuoron. */
  closeEvent() {
    if (this.phase !== 'event' || !this.eventCard) {
      return { ok: false, error: 'Ei avointa tapahtumaa' };
    }
    const p = this.player;
    const { effect } = this.eventCard;
    this.eventCard = null;
    this.phase = 'action';

    if (effect?.kind === 'raha') {
      // Kukkaro ei mene miinukselle: tapahtuma ei saa jättää matkaajaa
      // velkaan, koska sillä ei ole pelissä mitään merkitystä.
      const muutos = Math.max(effect.amount, -p.money);
      p.money += muutos;
      this.say(p.id, muutos >= 0
        ? `${p.name} sai ${muutos} puntaa.`
        : `${p.name} menetti ${-muutos} puntaa.`);
    } else if (effect?.kind === 'kyyti') {
      const kohde = this.rideTarget(p);
      if (kohde) {
        p.pos = { type: 'city', city: kohde.id };
        this.lastPath = null;
        this.visitCity(p);
        this.say(p.id, `${p.name} sai ilmaisen kyydin kaupunkiin ${kohde.name}.`);
      }
    }

    this.endTurn();
    // Viive vie yhden ylimääräisen vuoron: matkaaja jää paikalleen ja
    // matkapäivä kuluu silti.
    if (effect?.kind === 'viive') {
      this.say(p.id, `${p.name} jäi paikalleen yhdeksi vuoroksi.`);
      this.endTurn();
    }
    return { ok: true };
  }

  /**
   * Lentorepliikki kohteeseen: kohdekaupungin oma rivi, tai yleisrivi jos
   * omaa ei ole. Arvotaan pelin rng:llä, jotta sama peli toistuu samoin.
   * Palauttaa null, jos pakassa ei ole repliikkejä lainkaan.
   */
  flightLine(cityId, pack = this.pack) {
    /*
     * Silloin tällöin lento muistuttaa löytämättömästä pääaarteesta
     * (omistajan toive): pelaaja hahmottaa, että jonnekin kannattaa
     * vielä palata. Rivi ei koskaan paljasta, missä aarre on — vain
     * että se on yhä jossain. Arvonta pelin rng:llä kuten muutkin.
     * Mannerkohtaisten aarteiden kanssa muistutus jatkuu, kunnes
     * Aarnin luettelo on täynnä — yksi löytö ei hiljennä sitä.
     */
    const katumukset = pack.texts?.flightRegret ?? [];
    const mantereita = new Set(this.pack.cities.map((c) => this.mannerOf(c.id))).size;
    if (katumukset.length && this.world && this.world.starsFound.size < mantereita
      && this.rng() < 0.35) {
      return katumukset[Math.floor(this.rng() * katumukset.length)];
    }
    const omat = pack.texts?.flightLines?.[cityId] ?? [];
    const yleiset = pack.texts?.flightDefault ?? [];
    const pakka = omat.length ? omat : yleiset;
    if (!pakka.length) return null;
    return pakka[Math.floor(this.rng() * pakka.length)];
  }

  /**
   * Ensimmäisen lennon repliikki: matka alkaa, joten rivi hehkuttaa aina
   * matkakirjaa. Jos laudalla ei ole flightFirst-rivejä, käytetään
   * tavallista lentorepliikkiä.
   */
  firstFlightLine(cityId) {
    const pakka = this.pack.texts?.flightFirst ?? [];
    if (!pakka.length) return this.flightLine(cityId);
    return pakka[Math.floor(this.rng() * pakka.length)];
  }

  /** Naapurikaupunki ilmaista kyytiä varten; null jos naapureita ei ole. */
  rideTarget(player) {
    if (player.pos.type !== 'city') return null;
    const naapurit = [...(this.board.adj.get(player.pos.city) ?? [])]
      .map((eid) => this.board.edgeById.get(eid))
      .map((e) => (e.a === player.pos.city ? e.b : e.a))
      .map((id) => this.board.cityById.get(id))
      .filter(Boolean);
    if (!naapurit.length) return null;
    return naapurit[Math.floor(this.rng() * naapurit.length)];
  }

  /**
   * Isoisän luonnoskirjan pulma, jos sellainen odottaa nykyisessä
   * kaupungissa. Pulma ei ole sidottu laattaan eikä tutkimiseen, jotta myös
   * aloituskaupungin pulma aukeaa — siksi laukaisin on pelkkä saapuminen.
   * Palauttaa null, jos pulmaa ei ole tai se on jo nähty tässä pelissä.
   */
  pendingPuzzle(player = this.player) {
    if (player.pos.type !== 'city') return null;
    const puzzle = (this.pack.puzzles ?? []).find((p) => p.city === player.pos.city);
    if (!puzzle) return null;
    return this.puzzlesSeen.has(`${this.pack.id}:${puzzle.city}`) ? null : puzzle;
  }

  /**
   * Avaa pulman. Pulma on monivalinta kuten muutkin, joten vastaaminen ja
   * tuloksen näyttö toimivat ennallaan. Laatallisessa kaupungissa pulma
   * on pysähdyksen ainoa tehtävä: oikea ratkaisu kääntää laatan ja
   * sulkeminen päättää vuoron kuten visassa (omistajan linjaus
   * 10.8.2026). Laatattomassa kaupungissa (esim. aloituskaupunki) pulma
   * on entiseen tapaan kevyt välipysähdys: tietäjäpisteet oikeasta,
   * vuoro jatkuu saapumiskortista.
   */
  openPuzzle() {
    const puzzle = this.pendingPuzzle();
    if (!puzzle) return { ok: false, error: 'Ei avointa pulmaa' };

    const laatta = Boolean(this.tokenHere());
    this.puzzlesSeen.add(`${this.pack.id}:${puzzle.city}`);
    this.puzzlePrevPhase = this.phase;
    // Sama pulma on joka pelikerralla vähän erilainen. Generointi tapahtuu
    // VAIN tässä, pelin omalla rng:llä, ja tulos jää quiz-tilaan — näin
    // tallennettu peli jatkuu täsmälleen samasta pulmasta. `fact` on aina
    // pulman oma: se on tarkistettu fakta eikä se saa vaihdella.
    const arvottu = puzzle.generate ? puzzle.generate(this.rng) : null;
    const sketch = arvottu?.sketch ?? puzzle.sketch ?? null;
    const options = arvottu?.options ?? puzzle.options;
    const correct = arvottu?.correct ?? puzzle.correct;
    // Valokuvapulma: vaihtoehdoilla on oikeat valokuvat (rinnakkainen
    // taulukko), jotka sekoitetaan samalla järjestyksellä kuin tekstit.
    const kuvat = arvottu?.kuvat ?? puzzle.kuvat ?? null;

    const order = this.shuffledOrder(options.length);
    this.quiz = {
      kind: 'puzzle',
      laatta,
      cityId: puzzle.city,
      puzzleId: puzzle.id,
      sketchData: sketch,
      title: puzzle.title,
      // Selite kertoo, mitä piirroksessa näkyy — pulmat olivat ilman sitä
      // liian kryptisiä.
      selite: puzzle.selite ?? null,
      hard: false,
      question: arvottu?.q ?? puzzle.q,
      fact: puzzle.fact,
      source: sourceList(puzzle.source),
      options: order.map((i) => options[i]),
      kuvat: kuvat ? order.map((i) => kuvat[i]) : null,
      kuvaLahteet: kuvat ? (puzzle.kuvaLahteet ?? null) : null,
      correct: order.indexOf(correct),
      hint: arvottu?.hint ?? puzzle.hint ?? null,
      hintShown: false,
      hidden: [],
      chosen: null,
      right: null,
      timedOut: false,
      seconds: null,
    };
    this.phase = 'quiz';
    return { ok: true, quiz: this.quiz };
  }

  /** Vastaa kysymykseen. Tulos jää näkyviin kunnes closeQuiz() kutsutaan. */
  answerQuiz(index) {
    if (this.phase !== 'quiz' || !this.quiz || this.quiz.chosen !== null) {
      return { ok: false, error: 'Ei avointa kysymystä' };
    }
    if (this.quiz.hidden.includes(index)) {
      return { ok: false, error: 'Tuo vaihtoehto on poistettu' };
    }
    const p = this.player;
    const city = this.board.cityById.get(this.quiz.cityId);
    this.quiz.chosen = index;
    this.quiz.right = index === this.quiz.correct;
    this.countAnswer(p, this.quiz.right);

    // Onnistunut kohtaaminen merkitään: sitä ei pelata uudelleen
    // (nappi harmaantuu — omistajan sääntö 10.8.2026).
    if (this.quiz.kaari && this.quiz.right) {
      const avain = `${this.pack.id}:${this.quiz.cityId}`;
      const tila = this.kaariYritykset.get(avain) ?? { yritykset: 1, onnistui: false };
      tila.onnistui = true;
      this.kaariYritykset.set(avain, tila);
    }

    // Pulma: oikeasta tietäjäpisteitä, väärästä ei rangaistusta.
    // Laatallisessa kaupungissa pulma on pysähdyksen ainoa tehtävä,
    // joten oikea ratkaisu kääntää laatan kuten visassa (omistajan
    // linjaus 10.8.2026); laatattomassa oikea ratkaisu vain näytetään.
    if (this.quiz.kind === 'puzzle') {
      if (this.quiz.right) {
        this.awardXp(p, XP_PUZZLE);
        if (this.quiz.laatta) {
          this.say(p.id, `${p.name} ratkaisi isoisän pulman (+${XP_PUZZLE} tp) ja saa kääntää laatan.`);
          this.quiz.found = this.revealToken(this.quiz.cityId);
        } else {
          this.say(p.id, `${p.name} ratkaisi isoisän pulman (+${XP_PUZZLE} tp).`);
        }
      } else {
        this.say(p.id, `${p.name} ei ratkaissut isoisän pulmaa — isoisä olisi ollut armollinen.`);
      }
      return { ok: true, right: this.quiz.right };
    }

    // Tutkiminen ilman laattaa: oikeasta löytöpalkkio ja tietäjäpisteitä,
    // väärästä ei rangaistusta. Laattaa ei ole eikä tule.
    if (this.quiz.explore) {
      if (this.quiz.right) {
        this.awardXp(p, XP_EXPLORE);
        p.money += EXPLORE_REWARD;
        this.say(p.id, `◈ ${p.name} tutki paikkaa kaupungissa ${city.name} ja vastasi oikein (+${EXPLORE_REWARD} puntaa, +${XP_EXPLORE} tp).`);
        this.emit('aid', `Löytöpalkkio +${EXPLORE_REWARD} puntaa`, { icon: 'kukkaro' });
      } else {
        const oikea = this.quiz.options[this.quiz.correct];
        this.say(p.id, `${p.name} vastasi väärin — oikea vastaus oli "${oikea}".`);
      }
      return { ok: true, right: this.quiz.right };
    }

    // Tietoportti: oikea vastaus avaa portin, laattoja ei käännetä.
    if (this.quiz.gate) {
      if (this.quiz.right) {
        // Tietoportin kysymys on aina vaikea, joten siitä saa samat
        // tietäjäpisteet kuin muustakin oikein vastatusta vaikeasta.
        this.awardXp(p, XP_HARD_ANSWER);
        this.say(p.id, `◈ ${p.name} vastasi oikein — portti aukeaa: ${this.quiz.gate.label}! (+${XP_HARD_ANSWER} tp)`);
      } else {
        const oikea = this.quiz.options[this.quiz.correct];
        this.say(p.id, `${p.name} vastasi väärin — portti ei auennut. Oikea vastaus oli "${oikea}".`);
      }
      return { ok: true, right: this.quiz.right };
    }

    if (this.quiz.right) {
      this.say(p.id, `${p.name} vastasi oikein kaupungissa ${city.name} ja saa kääntää laatan.`);
      // Vaikean kysymyksen palkkio maksetaan ennen laatan kääntöä,
      // joten ryöstäjä vie senkin.
      if (this.quiz.hard) {
        p.money += HARD_BONUS;
        this.awardXp(p, XP_HARD_ANSWER);
        this.say(p.id, `Vaikeasta kysymyksestä ${p.name} saa ${HARD_BONUS} punnan palkkion ja ${XP_HARD_ANSWER} tietäjäpistettä.`);
      }
      this.quiz.found = this.revealToken(this.quiz.cityId);
    } else {
      const oikea = this.quiz.options[this.quiz.correct];
      this.say(p.id, `${p.name} vastasi väärin — oikea vastaus oli "${oikea}".`);
    }
    return { ok: true, right: this.quiz.right };
  }

  /** Ostaa sanallisen vihjeen 40 punnalla. */
  actionHint() {
    if (this.phase !== 'quiz' || !this.quiz) return { ok: false, error: 'Ei avointa kysymystä' };
    const quiz = this.quiz;
    if (quiz.chosen !== null) return { ok: false, error: 'Kysymykseen on jo vastattu' };
    if (quiz.hintShown) return { ok: false, error: 'Vihje on jo ostettu' };
    if (!quiz.hint) return { ok: false, error: 'Tähän kysymykseen ei ole vihjettä' };

    const p = this.player;
    if (p.money < HINT_PRICE) return { ok: false, error: 'Rahat eivät riitä' };
    p.money -= HINT_PRICE;
    quiz.hintShown = true;
    this.say(p.id, `${p.name} osti vihjeen ${HINT_PRICE} punnalla.`);
    return { ok: true, hint: quiz.hint };
  }

  /** Aika loppui: vastaus katsotaan vääräksi ja vuoro päättyy. */
  timeoutQuiz() {
    if (this.phase !== 'quiz' || !this.quiz) return { ok: false, error: 'Ei avointa kysymystä' };
    const quiz = this.quiz;
    if (quiz.chosen !== null) return { ok: false, error: 'Kysymykseen on jo vastattu' };

    const p = this.player;
    const city = this.board.cityById.get(quiz.cityId);
    quiz.chosen = -1;
    quiz.right = false;
    quiz.timedOut = true;
    quiz.seconds = 0;
    this.countAnswer(p, false);
    const oikea = quiz.options[quiz.correct];
    this.say(p.id, `${p.name} ei ehtinyt vastata kaupungissa ${city.name} — oikea vastaus oli "${oikea}".`);
    return { ok: true, right: false, timedOut: true };
  }

  /** Piilottaa 80 punnalla kaksi väärää vaihtoehtoa. */
  actionFiftyFifty() {
    if (this.phase !== 'quiz' || !this.quiz) return { ok: false, error: 'Ei avointa kysymystä' };
    const quiz = this.quiz;
    if (quiz.chosen !== null) return { ok: false, error: 'Kysymykseen on jo vastattu' };
    if (quiz.hidden.length) return { ok: false, error: '50:50 on jo käytetty' };
    // Väittämässä on kaksi vaihtoehtoa — puolikkaan poistamisessa ei ole
    // järkeä. Pulmissa 50:50 sallitaan: "pulma ratkaistaan itse" oli liian
    // ankara, kun pulma sattuu olemaan vaikea.
    if (quiz.options.length < 4) return { ok: false, error: 'Tähän ei voi käyttää 50:50:tä' };

    const p = this.player;
    if (p.money < FIFTY_FIFTY_PRICE) return { ok: false, error: 'Rahat eivät riitä' };
    p.money -= FIFTY_FIFTY_PRICE;

    const wrong = quiz.options.map((_, i) => i).filter((i) => i !== quiz.correct);
    for (let i = wrong.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1));
      [wrong[i], wrong[j]] = [wrong[j], wrong[i]];
    }
    quiz.hidden = wrong.slice(0, 2).sort((a, b) => a - b);
    this.say(p.id, `${p.name} maksoi ${FIFTY_FIFTY_PRICE} puntaa ja poisti kaksi väärää vaihtoehtoa.`);
    return { ok: true, hidden: quiz.hidden };
  }

  /** Sulkee kysymyksen ja päättää vuoron — tai aloittaa rosvon kaksintaistelun. */
  closeQuiz() {
    if (!this.quiz) return { ok: false, error: 'Ei avointa kysymystä' };
    // Laatattoman kaupungin pulma keskeytti saapumisen, joten vuoro
    // jatkuu siitä mihin jäätiin. Laatallisen kaupungin pulma sen
    // sijaan OLI pysähdyksen tehtävä — se suljetaan kuten visa alla
    // (vuoro päättyy), koska muuten pelaaja saisi heti toisen tehtävän.
    if (this.quiz.kind === 'puzzle' && !this.quiz.laatta) {
      this.quiz = null;
      if (this.phase !== 'over') this.phase = this.puzzlePrevPhase ?? 'action';
      this.puzzlePrevPhase = null;
      return { ok: true, puzzle: true };
    }
    // Vastaamatta suljettu kysymys on siitä luopumista: ei rangaistusta,
    // mutta vuoro päättyy — päivä kului kysyjän kuunteluun.
    if (this.quiz.chosen === null) {
      this.say(this.player.id, `${this.player.name} jätti kysymyksen väliin.`);
    }
    const gate = this.quiz.right ? this.quiz.gate : null;
    this.quiz = null;
    if (this.phase === 'over') return { ok: true };
    // Voitettu tietoportti: siirtyminen maan laudalle on ilmainen.
    if (gate) {
      const p = this.player;
      const pack = packById(gate.pack);
      this.enterWorld(pack);
      p.packId = pack.id;
      p.pos = { type: 'city', city: gate.city };
      this.visitCity(p);
      this.lastPath = null;
      this.say(p.id, `${p.name} astui portista: ${gate.label}.`);
      this.emit('flight', gate.label, { icon: 'tahti', sub: 'Tieto avasi portin' });
      this.phase = 'action';
      if (this.offerQuiz()) return { ok: true, gated: true, offer: true };
      this.endTurn();
      return { ok: true, gated: true };
    }
    if (this.duelArmed) {
      this.duelArmed = false;
      this.beginDuel();
      return { ok: true, duel: true };
    }
    this.phase = 'action';
    this.endTurn();
    return { ok: true };
  }

  // --- rosvon kaksintaistelu ----------------------------------------------

  /**
   * Rosvo esittää kiperän kysymyksen, jossa on kahdeksan vaihtoehtoa.
   * Suora oikea vastaus tuo rosvon saaliin (DUEL_PRIZE). Helpotus poistaa
   * puolet jäljellä olevista vääristä vaihtoehdoista, mutta rosvo vie siitä
   * puolet rahoista. Väärä vastaus tai aikakatkaisu vie kaikki rahat.
   * Kolmella hevosenkengällä rosvon voi ohittaa kokonaan.
   */
  beginDuel() {
    const pool = this.pack.duels ?? [];
    const fresh = pool.filter((q) => !this.usedQuestions.has(q.q));
    const deck = fresh.length ? fresh : pool;
    const question = deck[Math.floor(this.rng() * deck.length)];
    this.usedQuestions.add(question.q);
    const order = this.shuffledOrder(question.options.length);
    this.duel = {
      question: question.q,
      fact: question.fact,
      source: sourceList(question.source),
      options: order.map((i) => question.options[i]),
      correct: order.indexOf(question.correct),
      hidden: [],
      reliefs: 0,
      taken: 0,
      chosen: null,
      right: null,
      timedOut: false,
      seconds: QUIZ_SECONDS,
    };
    this.phase = 'duel';
    return { ok: true, duel: this.duel };
  }

  /** Helpotus: rosvo vie puolet rahoista ja puolet vääristä vaihtoehdoista poistuu. */
  actionDuelRelief() {
    const duel = this.duel;
    if (this.phase !== 'duel' || !duel) return { ok: false, error: 'Ei kaksintaistelua' };
    if (duel.chosen !== null) return { ok: false, error: 'Kysymykseen on jo vastattu' };
    if (duel.reliefs >= 2) return { ok: false, error: 'Helpotukset on käytetty' };

    const p = this.player;
    const toll = Math.floor(p.money / 2);
    p.money -= toll;
    duel.taken += toll;
    duel.reliefs++;

    const wrong = duel.options
      .map((_, i) => i)
      .filter((i) => i !== duel.correct && !duel.hidden.includes(i));
    for (let i = wrong.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1));
      [wrong[i], wrong[j]] = [wrong[j], wrong[i]];
    }
    const removeCount = duel.reliefs === 1 ? 4 : 2;
    duel.hidden = [...duel.hidden, ...wrong.slice(0, removeCount)].sort((a, b) => a - b);
    this.say(p.id, `${p.name} pyysi rosvolta helpotusta — rosvo vei ${toll} puntaa.`);
    return { ok: true, toll, hidden: duel.hidden };
  }

  /** Kolme hevosenkenkää heitetään rosvolle, ja tämä päästää kulkijan ohi. */
  actionDuelBypass() {
    const duel = this.duel;
    if (this.phase !== 'duel' || !duel) return { ok: false, error: 'Ei kaksintaistelua' };
    if (duel.chosen !== null) return { ok: false, error: 'Kysymykseen on jo vastattu' };
    const p = this.player;
    if (p.horseshoes < DUEL_BYPASS_SHOES) {
      return { ok: false, error: `Ohitus vaatii ${DUEL_BYPASS_SHOES} hevosenkenkää` };
    }
    p.horseshoes -= DUEL_BYPASS_SHOES;
    this.say(p.id, `Ω ${p.name} heitti rosvolle ${DUEL_BYPASS_SHOES} hevosenkenkää ja pääsi ohi.`);
    this.emit('aid', 'Rosvo päästi ohi', { icon: 'kenka', sub: `−${DUEL_BYPASS_SHOES} hevosenkenkää` });
    this.duel = null;
    this.phase = 'action';
    this.endTurn();
    return { ok: true, bypassed: true };
  }

  /** Vastaa rosvon kysymykseen. */
  answerDuel(index) {
    const duel = this.duel;
    if (this.phase !== 'duel' || !duel || duel.chosen !== null) {
      return { ok: false, error: 'Ei avointa kaksintaistelua' };
    }
    if (duel.hidden.includes(index)) return { ok: false, error: 'Tuo vaihtoehto on poistettu' };

    const p = this.player;
    duel.chosen = index;
    duel.right = index === duel.correct;
    this.countAnswer(p, duel.right);
    if (duel.right) {
      if (duel.reliefs === 0) {
        p.money += DUEL_PRIZE;
        duel.prize = DUEL_PRIZE;
        this.say(p.id, `${p.name} voitti rosvon suoralla vastauksella ja vei saaliin: ${DUEL_PRIZE} puntaa!`);
      } else {
        this.say(p.id, `${p.name} voitti rosvon — loput rahat säilyvät.`);
      }
    } else {
      const loss = p.money;
      p.money = 0;
      duel.taken += loss;
      const oikea = duel.options[duel.correct];
      this.say(p.id, `☠ ${p.name} hävisi rosvolle ${loss} puntaa — oikea vastaus oli "${oikea}".`);
    }
    return { ok: true, right: duel.right };
  }

  /** Aika loppui: rosvo vie kaikki rahat. */
  timeoutDuel() {
    const duel = this.duel;
    if (this.phase !== 'duel' || !duel || duel.chosen !== null) {
      return { ok: false, error: 'Ei avointa kaksintaistelua' };
    }
    const p = this.player;
    duel.chosen = -1;
    duel.right = false;
    duel.timedOut = true;
    duel.seconds = 0;
    this.countAnswer(p, false);
    const loss = p.money;
    p.money = 0;
    duel.taken += loss;
    this.say(p.id, `☠ ${p.name} ei ehtinyt vastata rosvolle ja menetti ${loss} puntaa.`);
    return { ok: true, right: false, timedOut: true };
  }

  /** Sulkee kaksintaistelun ja päättää vuoron. */
  closeDuel() {
    if (!this.duel) return { ok: false, error: 'Ei kaksintaistelua' };
    this.duel = null;
    if (this.phase === 'over') return { ok: true };
    this.phase = 'action';
    this.endTurn();
    return { ok: true };
  }

  /** Onko kaupungin pakassa vaikeita kysymyksiä? */
  hardAvailable(cityId) {
    const pool = [...(this.pack.questions[cityId] ?? []), ...this.pack.questions.general];
    return pool.some((q) => questionLevel(q) === 3);
  }

  /**
   * Arpoo kysymyksen. Kaupungin omat kysymykset ovat aina etusijalla ja
   * yleispakka on vasta varapakka: kysymyksen kuuluu liittyä siihen
   * paikkaan, jossa pelaaja seisoo, eikä Egyptin pääkaupunkia kysytä
   * Namibin autiomaassa.
   *
   * Vaikeustaso rajaa pakkaa: 'easy' suosii helppoja, 'normal' jättää
   * vaikeat pois ja 'hard' poimii vaikeita. Järjestys on vaikeustaso
   * ensin, sitten tuoreus, sitten paikallisuus — näin tietoportin vaikea
   * kysymys pysyy vaikeana, vaikka paikan omat olisi jo kysytty.
   */
  pickQuestion(cityId, difficulty = 'normal') {
    const own = this.pack.questions[cityId] ?? [];
    const general = this.pack.questions.general;
    const steps = {
      easy: [[1], [1, 2]],
      normal: [[1, 2]],
      hard: [[3], [2, 3]],
    }[difficulty] ?? [[1, 2]];

    for (const levels of steps) {
      for (const onlyFresh of [true, false]) {
        for (const source of [own, general]) {
          let deck = source.filter((q) => levels.includes(questionLevel(q)));
          if (onlyFresh) deck = deck.filter((q) => !this.usedQuestions.has(q.q));
          if (!deck.length) continue;
          const question = deck[Math.floor(this.rng() * deck.length)];
          this.usedQuestions.add(question.q);
          return question;
        }
      }
    }
    // Varmistus: jos mikään porras ei osunut, kelpaa mikä tahansa kysymys.
    const pool = [...own, ...general];
    const question = pool[Math.floor(this.rng() * pool.length)];
    this.usedQuestions.add(question.q);
    return question;
  }

  /** Kysymyksen kehys: paikallinen kysyjä kaupungin maiseman mukaan. */
  pickAsker(city) {
    const pool = [...(ASKERS[city?.ambience] ?? []), ...ASKERS.yleinen];
    return pool[Math.floor(this.rng() * pool.length)];
  }

  /** Sekoitettu indeksijärjestys vastausvaihtoehdoille. */
  shuffledOrder(count) {
    const order = [...Array(count).keys()];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  }

  /** Lentää toiseen lentokenttäkaupunkiin. Vie koko vuoron. */
  actionFly(destination) {
    if (this.phase !== 'action') return { ok: false, error: 'Väärä vaihe' };
    this.travelMode = 'fly';
    const p = this.player;
    if (!this.airportDestinations().includes(destination)) {
      return { ok: false, error: 'Sinne ei ole lentoa' };
    }
    p.money -= FLIGHT_PRICE;
    p.pos = { type: 'city', city: destination };
    this.visitCity(p);
    this.lastPath = null;
    const city = this.board.cityById.get(destination);
    this.say(p.id, `${p.name} lensi ${FLIGHT_PRICE} punnalla kaupunkiin ${city.name}.`);
    this.emit('flight', `Lento kaupunkiin ${city.name}`, { icon: 'kone', sub: `−${FLIGHT_PRICE} puntaa` });
    if (this.checkWin()) return { ok: true, win: true };
    if (this.offerQuiz()) return { ok: true, offer: true };
    this.endTurn();
    return { ok: true };
  }

  // --- laatat ja voitto ---------------------------------------------------

  revealToken(cityId) {
    const type = this.tokens.get(cityId);
    if (!type) return null;
    this.tokens.delete(cityId);

    const p = this.player;
    /*
     * PÖLLÖ KORVAA ENSIMMÄISEN LAATAN AARTEEN KOKONAAN (omistajan
     * tilaus 18.8.2026 — korvasi saman päivän aiemman "pöllö tulee
     * lisänä" -linjan). Ensimmäisen käännetyn laatan alta löytyy VAIN
     * Viisas Pöllö: laatan omaa sisältöä ei näytetä eikä anneta —
     * ei rahaa, ei tavaraa, ei rosvoa, ei pisteitä. Laatta merkitään
     * silti käännetyksi (revealed + finds saavat tyhjän laatan
     * kirjauksen), joten kartta ja matkalaukku pysyvät ehjinä, ja
     * visavoiton omat palkkiot (tietäjäpisteet, vaikean kysymyksen
     * bonus) on jo maksettu ennen tätä metodia kuten muillakin
     * laatoilla.
     *
     * UNOHDETTU AARRE EI SAA KADOTA: jos ensimmäinen laatta sattuu
     * olemaan mantereen tähti, se siirretään toisen saman mantereen
     * kääntämättömän laatan alle — muuten peli voisi muuttua
     * voittamattomaksi. Jos siirtopaikkaa ei ole (teoreettinen
     * tilanne), pöllö odottaa seuraavaa laattaa ja tähti paljastuu
     * normaalisti.
     *
     * Vain ihmispelaajalle: pöllö puhuu pelaajalle, ei botille, joten
     * botin kääntämä laatta ei vie löytöhetkeä pelaajalta. Vanhoissa
     * tallennuksissa polloLoydetty on jo tosi, joten tämä haara ei
     * kosketa niitä.
     *
     * KOKO HAARA ON TAUOLLA (omistaja 24.8.2026): polloAarteena on
     * oletuksena false, jolloin pöllö on mukana alusta eikä yksikään
     * laatta korvaudu. Ehto on ensimmäisenä, jotta mekaniikka on
     * yhdellä silmäyksellä nähtävissä kytketyksi pois — ei
     * kommentoituna eikä puolittain purettuna.
     */
    if (this.polloAarteena && !this.polloLoydetty && !p.isBot) {
      let korvaa = true;
      if (type === 'star') {
        const manner = this.mannerOf(cityId);
        const vapaat = [...this.tokens.entries()]
          .filter(([id, t]) => t !== 'star' && t !== 'linssi'
            && this.mannerOf(id) === manner)
          .map(([id]) => id);
        if (vapaat.length) {
          this.tokens.set(vapaat[Math.floor(this.rng() * vapaat.length)], 'star');
        } else {
          korvaa = false;
        }
      }
      if (korvaa) {
        this.polloLoydetty = true;
        this.polloPaljastus = true;
        this.revealed.set(cityId, 'empty');
        p.finds.push('empty');
        (p.findManner ??= []).push(this.pack.map?.cityManner?.[cityId] ?? null);
        const city = this.board.cityById.get(cityId);
        this.say(p.id, `${p.name} käänsi ensimmäisen laatan kaupungissa ${city.name} — kätköstä löytyi Viisas Pöllö!`);
        this.checkWin();
        return 'pollo';
      }
    }
    this.revealed.set(cityId, type);
    const token = this.aarreTyyppi(type, cityId);
    p.finds.push(type);
    // Mistä mantereelta laatta löytyi — passi näyttää maailmankartan
    // löydöt oikean mantereen aarteina. Muilla laudoilla null: laudan
    // oma tyyppi on jo oikea. Lista kulkee finds-listan rinnalla.
    (p.findManner ??= []).push(this.pack.map?.cityManner?.[cityId] ?? null);
    const city = this.board.cityById.get(cityId);

    switch (type) {
      case 'star': {
        /*
         * Kirjanpito on mannerkohtaista: jokaisella mantereella on oma
         * unohdettu aarteensa, ja pelaajan laskuri kertoo montako hän
         * kantaa. Vaellustilassa jokainen aarre maksaa STAR_PRIZE:n —
         * seitsemällä aarteella se on 14 000 puntaa. Talous kestää sen
         * tänään (raha ei ole niukkuutta keskipelissä), mutta jos
         * palkkiot alkavat latistaa löytöjä, tämä on ensimmäinen
         * säädettävä luku.
         */
        const manner = this.mannerOf(cityId);
        this.world.starsFound.set(manner, cityId);
        p.stars = (p.stars ?? 0) + 1;
        this.awardXp(p, XP_STAR);
        this.noteRecord(p);
        if (this.roaming) {
          p.money += STAR_PRIZE;
          this.say(p.id, `◈ ${p.name} löysi aarteen ${token.name} kaupungista ${city.name} — arvo ${STAR_PRIZE} puntaa!`);
          this.emit('treasure', this.pack.texts.starToast, { token: type, city: cityId, sub: `+${STAR_PRIZE} puntaa` });
          // Ilmoitus mannerlennosta vain, jos jollakin muulla
          // mantereella on vielä aarre kateissa — viimeisen löydön
          // jälkeen lupaus lennosta olisi tyhjä.
          if (this.muutMantereet(manner).some((m) => !this.mantereenTahtiLoytynyt(m))) {
            this.say(p.id, MANNERLENTO_ILMOITUS);
          }
        } else {
          this.say(p.id, this.pack.texts.starFound(p.name, city.name));
          this.say(null, this.pack.texts.starChase);
          this.emit('treasure', this.pack.texts.starToast, {
            token: type,
            city: cityId,
            sub: `${p.name} löysi unohdetun aarteen — nyt kiire kotiin!`,
          });
        }
        break;
      }
      case 'horseshoe':
        p.horseshoes++;
        this.say(p.id, `Ω ${p.name} löysi hevosenkengän kaupungista ${city.name}.`);
        this.emit('treasure', 'Hevosenkenkä', {
          token: type,
          city: cityId,
          sub: 'Voi voittaa pelin, jos unohdettu aarre löytyy',
        });
        break;
      case 'robber':
        this.say(p.id, `☠ Ryöstäjä yllätti pelaajan ${p.name} — edessä on kaksintaistelu!`);
        this.emit('robber', 'Ryöstäjä!', {
          token: type,
          city: cityId,
          sub: `${p.name} joutuu rosvon kaksintaisteluun`,
        });
        this.duelArmed = true;
        break;
      case 'linssi': {
        // Kumpi linssi löytyy, ratkeaa kaupungin mantereesta. Jos
        // annettavaa ei ole — kaikki linssit on jo omistettu — kätkö on
        // tyhjä. Laatta ei saa luvata sitä, mitä se ei voi antaa.
        const tunnus = linssiKaupungista(this, cityId);
        if (!tunnus) {
          this.say(p.id, `${p.name} löysi tyhjän linssikotelon kaupungissa ${city.name}.`);
          this.emit('treasure', 'Tyhjä kotelo', { token: 'empty', city: cityId, sub: 'Lasi oli jo laukussa' });
          break;
        }
        myonna(this, p, tunnus);
        this.say(p.id, `${token.symbol} ${p.name} löysi taikalasin kaupungista ${city.name} — maailma näyttää uuden puolensa.`);
        this.emit('treasure', token.name, { token: type, city: cityId, linssi: tunnus, sub: 'Uusi linssi kartalle' });
        break;
      }
      case 'empty':
        this.say(p.id, `${p.name} käänsi tyhjän laatan kaupungissa ${city.name}.`);
        this.emit('treasure', 'Tyhjä laatta', { token: type, city: cityId, sub: 'Isoisän merkintä oli vanhentunut' });
        break;
      default:
        p.money += token.value;
        this.say(p.id, `${token.symbol} ${p.name} löysi jalokiven ${token.name} (${token.value} puntaa).`);
        this.emit('treasure', token.name, { token: type, city: cityId, sub: `+${token.value} puntaa` });
    }

    this.checkWin();
    return type;
  }

  /**
   * Voitto: tähden tai hevosenkengän kanssa aloituskaupunkiin sen
   * jälkeen kun tähti on löytynyt. ENSIMMÄINEN aarre riittää — vaikka
   * mantereita on seitsemän, moninpelin kotiinjuoksu alkaa yhdestä
   * (omistajan linjaus 11.8.2026: pienin muutos nykyiseen).
   */
  checkWin() {
    if (this.roaming) return false;
    if (this.winner) return true;
    if (!this.starFound) return false;
    const p = this.player;
    const city = this.cityOf();
    if (!city || !city.start) return false;
    if (!p.stars && p.horseshoes === 0) return false;

    this.winner = p;
    this.phase = 'over';
    const reason = p.stars
      ? this.pack.texts.winStar
      : 'ehti hevosenkengän kanssa kotiin ensimmäisenä';
    this.say(p.id, `🏆 ${p.name} ${reason} kaupungissa ${city.name} ja voitti pelin!`);
    return true;
  }

  // --- tallennus ----------------------------------------------------------

  /**
   * Pelin tila tavallisena oliona (localStorage / JSON).
   *
   * VERSIO 2 (11.8.2026): mannerkohtaiset unohdetut aarteet. Maailman
   * `starFound`/`starCity` korvautuivat `starsFound`-taululla (manner ->
   * kaupunki) ja pelaajan `hasStar` laskurilla `stars`. Tämä on koko
   * pelin ensimmäinen tallennusmuodon nosto; version 1 pelit luetaan
   * yhä (fromJSON kääntää ne lennossa), joten kesken jäänyt matka ei
   * katkea.
   */
  toJSON() {
    return {
      version: 2,
      packId: this.rootPackId,
      roaming: this.roaming,
      seed: this.seed,
      rngCalls: this.rngCalls,
      players: this.players.map((p) => ({ ...p })),
      worlds: Object.fromEntries(
        [...this.worlds].map(([id, w]) => [id, {
          tokens: [...w.tokens.entries()],
          revealed: [...w.revealed.entries()],
          visited: [...w.visited],
          starsFound: [...w.starsFound.entries()],
        }]),
      ),
      usedQuestions: [...this.usedQuestions],
      current: this.current,
      phase: this.phase,
      travelMode: this.travelMode,
      autoTravel: this.autoTravel,
      pendingFare: this.pendingFare,
      die: this.die,
      quiz: this.quiz,
      duel: this.duel,
      duelArmed: this.duelArmed,
      arrivalFact: this.arrivalFact,
      lastForm: this.lastForm,
      eventCard: this.eventCard,
      puzzlesSeen: [...this.puzzlesSeen],
      kulttuuriVastatut: [...this.kulttuuriVastatut],
      minitehtavatVastatut: [...this.minitehtavatVastatut],
      minitehtavatOikein: [...this.minitehtavatOikein],
      julisteet: [...this.julisteet],
      explored: [...this.explored],
      scheduleNote: this.scheduleNote,
      scheduleShown: [...this.scheduleShown],
      recordNoted: this.recordNoted,
      recordMark: this.recordMark,
      polloLoydetty: this.polloLoydetty,
      /*
       * Onko tässä pelissä pöllö aarteena? Kytkin on kehitysvaiheen
       * valinta (POLLO_ON_AARRE, nyt false), mutta se kulkee mukana
       * tallennuksessa: kesken oleva peli on pelattava loppuun samoilla
       * säännöillä, joilla se aloitettiin. Puuttuva kenttä = vanha
       * tallennus, joka lukee oletuksen (ks. fromJSON).
       */
      polloAarteena: this.polloAarteena,
      winnerId: this.winner ? this.winner.id : null,
      turnCount: this.turnCount,
      log: this.log,
    };
  }

  /**
   * Palauttaa tallennetun pelin. Palauttaa null, jos tallennus on
   * kelvoton. Versiot 1 ja 2 kelpaavat: version 1 yksi tähti
   * käännetään mannerkohtaiseksi kirjanpidoksi alla.
   */
  static fromJSON(data) {
    if (!data || !Array.isArray(data.players)) return null;
    if (data.version !== 1 && data.version !== 2) return null;

    const game = Object.create(Game.prototype);
    game.seed = data.seed;
    game.rngCalls = 0;
    const source = mulberry32(data.seed);
    // Kelataan arvonnat samaan kohtaan kuin tallennushetkellä.
    for (let i = 0; i < data.rngCalls; i++) source();
    game.rngCalls = data.rngCalls;
    game.rng = () => {
      game.rngCalls++;
      return source();
    };

    // Vanhoissa tallennuksissa ei ole packId:tä eikä maailmoja — ne ovat
    // yhden laudan Afrikka-pelejä.
    const rootPack = packById(data.packId ?? 'africa');
    game.rootPackId = rootPack.id;
    game.roaming = !!data.roaming;
    game.worlds = new Map();
    const worldsData = data.worlds ?? {
      [rootPack.id]: {
        tokens: data.tokens,
        revealed: data.revealed,
        visited: data.visited,
        starFound: !!data.starFound,
        starCity: data.starCity ?? null,
      },
    };
    for (const [id, w] of Object.entries(worldsData)) {
      const pack = packById(id);
      game.worlds.set(pack.id, {
        pack,
        board: buildBoard(pack.cities, pack.edges, pack.map),
        tokens: new Map(w.tokens ?? []),
        revealed: new Map(w.revealed ?? []),
        // Vanhoissa tallennuksissa käyntejä ei kirjattu: jo käännetyt laatat
        // kertovat, missä on käyty, joten tietäjäpisteet eivät kerry uudelleen.
        visited: new Set(w.visited ?? (w.revealed ?? []).map(([city]) => city)),
        starsFound: new Map(w.starsFound ?? mannerkohtaisetTahdet(pack, w)),
      });
    }
    // Uusi kenttä saa oletuksen spreadin edestä (sama kuvio kuin xp-
    // ja quizAsked-kentillä aiemmin) — versionosto tehdään vain, kun
    // vanhaa muotoa ei voi lukea kääntämättä, kuten 1 -> 2 alla.
    // Versio 1 -> 2: hasStar oli lippu, stars on laskuri. Kentät
    // luetaan ennen spreadia ja hasStar jätetään pois, jottei
    // vanhentunut lippu jää roikkumaan olioon.
    game.players = data.players.map(({ hasStar, ...p }) => ({
      packId: rootPack.id,
      xp: 0,
      quizAsked: 0,
      quizCorrect: 0,
      linssit: [],
      findManner: [],
      stars: hasStar ? 1 : 0,
      ...p,
    }));
    // findManner kulkee finds-listan rinnalla samoin indeksein. Vanhan
    // tallennuksen löydöt (ajalta ennen kenttää) ovat listan alussa,
    // joten vaje täydennetään null-mantereiksi ALKUUN — uudet löydöt
    // osuvat silloin oikeille riveilleen.
    for (const p of game.players) {
      while (p.findManner.length < (p.finds?.length ?? 0)) p.findManner.unshift(null);
    }
    game.usedQuestions = new Set(data.usedQuestions ?? []);
    game.current = data.current;
    game.phase = data.phase;
    game.travelMode = data.travelMode ?? null;
    game.autoTravel = !!data.autoTravel;
    game.pendingFare = data.pendingFare ?? 0;
    game.die = data.die ?? null;
    game.quiz = data.quiz ?? null;
    game.duel = data.duel ?? null;
    game.duelArmed = !!data.duelArmed;
    // Vanhassa tallennuksessa oli diaryNote — se ohitetaan hiljaa.
    game.arrivalFact = data.arrivalFact ?? null;
    game.lastForm = data.lastForm ?? null;
    game.eventCard = data.eventCard ?? null;
    game.puzzlesSeen = new Set(data.puzzlesSeen ?? []);
    game.kulttuuriVastatut = new Set(data.kulttuuriVastatut ?? []);
    game.minitehtavatVastatut = new Set(data.minitehtavatVastatut ?? []);
    /*
     * Vanha tallennus ei erottele oikein ja väärin vastattuja: silloin
     * jokainen vastattu tehtävä luetaan ratkaistuksi. Se on tarkoituksella
     * antelias — omistajan linjaus on, ettei vanha pelaaja jää ilman
     * julistetta, ja mennyttä vastausta ei voi enää tarkistaa.
     */
    game.minitehtavatOikein = new Set(data.minitehtavatOikein ?? data.minitehtavatVastatut ?? []);
    // Vanha tallennus ei tunne julisteita: kokoelma alkaa tyhjänä ja
    // täyttyy takautuvasti, kun pelaaja avaa ratkaisemansa lehtisivun
    // uudelleen (js/ui.js piirraMinitehtava).
    game.julisteet = new Set(data.julisteet ?? []);
    game.explored = new Set(data.explored ?? []);
    /*
     * Istuntokohtaiset kentät on silti ALUSTETTAVA: fromJSON ohittaa
     * konstruktorin (Object.create), joten "ei tallenneta" ei saa
     * tarkoittaa "ei ole olemassa". Ilman tätä palautetun pelin
     * jokainen kaarikaupungin tutkiminen kaatui TypeErroriin ja
     * Tutki-nappi mykistyi (omistajan löytö 10.8.2026 Ateenassa).
     */
    game.kaariYritykset = new Map();
    game.puzzlePrevPhase = null;
    // Vanha tallennus ei tunne aikaa: se jatkuu päivästä 1 eikä ole nähnyt
    // yhtään isoisän aikataulurivistä.
    game.scheduleNote = data.scheduleNote ?? null;
    game.scheduleShown = new Set(data.scheduleShown ?? []);
    game.recordNoted = !!data.recordNoted;
    game.recordMark = data.recordMark ?? null;
    /*
     * VANHAT TALLENNUKSET: PÖLLÖ ON JO LÖYDETTY.
     *
     * Kenttä syntyi vasta pöllöaarteen myötä, joten sen puuttuminen
     * tarkoittaa tallennusta ajalta, jolloin pöllö oli mukana pelin
     * alusta asti. Kesken oleva matka ei saa menettää kumppaniaan, ja
     * uudelleen "löytäminen" olisi vielä oudompaa — siksi puuttuva
     * kenttä luetaan aina todeksi. Uusi peli kirjoittaa kenttään
     * epätoden, joten heti alussa tallennettu ja ladattu peli ei
     * vahingossa saa pöllöä (lippu on tallennuksessa mukana).
     *
     * MEKANIIKAN OLLESSA TAUOLLA LIPPU ON AINA TOSI (omistaja
     * 24.8.2026). Ilman tätä 18.–24.8. aloitettu kesken oleva matka
     * jäisi ansaan: tallennuksessa lukee `false`, mutta löytöhaara on
     * kytketty pois (revealToken), joten pöllöä ei enää koskaan
     * löytyisi eikä nappia näkyisi. Tallennuksesta luetaan siis vain
     * silloin, kun mekaniikka on päällä.
     */
    game.polloAarteena = data.polloAarteena ?? POLLO_ON_AARRE;
    game.polloLoydetty = game.polloAarteena ? (data.polloLoydetty ?? true) : true;
    game.polloPaljastus = false;
    game.lastPath = null;
    game.winner = data.winnerId === null ? null : game.players[data.winnerId] ?? null;
    game.turnCount = data.turnCount ?? 1;
    game.log = data.log ?? [];
    game.events = [];
    // Tietäjätason nousut eivät kulje tallennuksessa: kupla kuuluu sille
    // hetkelle, jona taso nousi, eikä sitä esitetä uudestaan latauksessa.
    game.tietajaNousut = [];
    game.moves = null;

    // Kesken jäänyt siirtovalinta lasketaan uudelleen nopan silmäluvusta.
    if (game.phase === 'move' && game.die) {
      const p = game.players[game.current];
      game.moves = findMoves(game.board, p.pos, game.die, { mode: game.travelMode ?? 'land' });
      if (game.moves.size === 0) game.phase = 'action';
    }
    return game;
  }

  /** Siirtolista UI:lle: avain, sijainti, hinta ja kaupungin tiedot. */
  /**
   * Tarjottavat päätepisteet. Kaikki `this.moves`-siirrot ovat yhä laillisia,
   * mutta kartalla ehdotetaan vain kaupunkeja: reitin varren pisteet ovat
   * pelaajalle merkityksettömiä valintoja ja täyttivät kartan renkailla.
   * Jos jollakin lähtösuunnalla ei ole kaupunkia nopan päässä, siltä
   * suunnalta tarjotaan pisin piste, jottei suunta katoa kokonaan.
   */
  moveOptions() {
    if (this.phase !== 'move' || !this.moves) return [];
    const kaikki = [...this.moves.entries()].map(([key, m]) => ({
      key,
      pos: m.pos,
      suunta: m.path && m.path.length ? posKey(m.path[0]) : key,
      city: m.pos.type === 'city' ? this.board.cityById.get(m.pos.city) : null,
      hasToken: m.pos.type === 'city' && this.tokens.has(m.pos.city),
    }));

    const suunnat = new Map();
    for (const opt of kaikki) {
      const lista = suunnat.get(opt.suunta) ?? [];
      lista.push(opt);
      suunnat.set(opt.suunta, lista);
    }

    const tarjottavat = [];
    for (const lista of suunnat.values()) {
      const kaupungit = lista.filter((opt) => opt.city);
      tarjottavat.push(...(kaupungit.length ? kaupungit : lista));
    }
    return tarjottavat;
  }
}

export { posKey };
