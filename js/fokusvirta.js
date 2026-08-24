/*
 * FOKUSMOODIN ANNOSTELUVIRTA — kaupungin esittely kortteina kartan päällä.
 *
 * Raamatun osio "Fokusmoodi", kohta ANNOSTELU (omistaja 24.8.2026):
 * uuteen kaupunkiin saavuttaessa esittely alkaa AUTOMAATTISESTI, ja
 * kulku on kuusivaiheinen:
 *
 *   1 matkakirja   muutama lause isoisän äänellä + VANHA kuva
 *   2 pöllö        nykypäivän huomio + UUSI kuva (herokuva)
 *   3 valinta      pöllö kysyy 2–3 painikkeella, mikä kiinnostaa
 *   4 täky         syvennys + kuva → MINIVISA → palkkio → takaisin 3:een
 *   5 oppitunti    nosto, joka pohjustaa varsinaista kysymystä
 *   6 kohtaaminen  paikallinen esittäytyy → nykyinen laattakysymys
 *
 * KOHDENOSTO (omistajan tilaus 24.8.2026) on valinnan sivupolku, ei
 * seitsemäs vaihe: pöllö kertoo kuplasta MUUSTA paikasta kuin
 * pelikaupungista, kartalle kasvaa vinjetti kohteen omaan sijaintiin,
 * eikä visaa tai palkkiota ole. Sisältö on koko maan yhteinen
 * (js/packs/fokuskohteet-grc.js), ja kaupunki poimii siitä tunnuksilla.
 *
 * ETENEMINEN (sama osio): vähintään YKSI täky on tehtävä ennen pääsyä
 * aarrekysymyksen luo; loput ovat vapaaehtoisia ja tuovat lisää rahaa.
 * Aarteen jälkeen alkaa vapaa tutkinta, ja vasta silloin kaupungin lehti
 * aukeaa — sitä ennen lehtinapit ohjaavat takaisin virtaan (LEHTILUKKO
 * alla).
 *
 * EI KOKO RUUDUN MODAALIA. Kortti kelluu karttapinnan alareunassa ja
 * kartta näkyy sen takaa — juuri se on fokusmoodin idea: kartta on
 * näkymä, teksti on annos sen päällä. Sama sääntö koskee kuvia: ne
 * KASVAVAT paikaltaan suureksi kartan päälle (avaaSuurennos), eivätkä
 * avaa lehtien koko ruudun katselinta, joka peittäisi kartan.
 *
 * ================= KOLME PINTAA, EI YHTÄ (omistaja 24.8.2026) =======
 *
 * Omistajan pelitestipalaute v1092/v1093 kolmessa osassa: *"pöllön
 * puhekuplat saisi tulla pöllöstä ja fontti saisi olla luettavampi.
 * myös teksti pitäisi olla lyhyempi"* — ja kaksi tarkennusta samana
 * päivänä. Annostelu jakautuu siksi kolmelle pinnalle, joilla kullakin
 * on oma tehtävänsä:
 *
 *   1. YLÄVASEN MATKAKIRJAKORTTI (.fact-card, js/ui.js renderFact).
 *      Vaihe 1 EI ole oma korttinsa. Isoisän merkintä on kirjaa, ja
 *      kirja on pelissä jo olemassa: sama kortti, jossa saapumistekstit
 *      ovat aina näkyneet. Virta syöttää siihen paikkarivin, tekstin ja
 *      vanhan valokuvan (fokusvirtaMatkakirja), ja kun kirjoituskone on
 *      lyönyt merkinnän loppuun, pöllö saa vuoron
 *      (fokusvirtaMerkintaLuettu). Saapumisluentaa EI käynnistetä —
 *      näille teksteille ei ole äänitteitä, ja luennat tehdään erikseen.
 *
 *   2. PÖLLÖN PUHEKUPLA OIKEALLA ALHAALLA (.fokusvirta-kupla). Vaiheet,
 *      joissa PÖLLÖ puhuu — huomio ja valintakysymys painikkeineen —
 *      esitetään kuplana, jonka kärki osoittaa kelluvaan pöllönappiin.
 *      Sama kuplaperhe kuin pöllön omalla vihjeellä (css/styles.css
 *      .pollo-vihje): sama pergamentti, sama kärki, sama ele
 *      napautuksella pois. Vain painikkeet ovat uutta.
 *
 *   3. SYVENNYS- JA OPPITUNTIKORTIT (.fokusvirta-kortti). Pidempi
 *      teksti ja minivisa tarvitsevat kortin, ja ne pysyvät korttina.
 *      Kortti on karttapinnan alalaidassa eikä yllä ylävasempaan
 *      matkakirjakorttiin asti (css: max-height).
 *
 * KUVAT OVAT KARTALLA (omistajan tarkennus 24.8.2026). Fokusvirran
 * kuvat piirtyvät pieninä kehystettyinä vinjetteinä Ateenan kohdalle
 * kartalle, laatan yläpuolelle, ja napautus avaa ne pelin omaan
 * katselimeen. Kortissa kuvasta on vain pieni viite. Ks. KUVAT KARTALLA
 * alempana — siellä myös perustelu kiinteälle ruutukoolle ja
 * suodattimettomuudelle.
 *
 * MITÄ TÄMÄ MODUULI EI TEE. Se ei kosketa laattamekaniikkaa: vaiheen 6
 * nappi kutsuu tismalleen samaa game.actionQuizia kuin saapumiskortin
 * "Tapaa …" -nappi (js/ui.js), joten varsinainen kysymys, aarre,
 * uusinnat ja palkkiot ovat ennallaan. Se ei myöskään koske
 * kaupunkeihin, joilla ei ole fokusvirtadataa (js/packs/fokusvirrat.js),
 * eikä mihinkään kaupunkiin fokusmoodin ollessa pois päältä.
 *
 * OMA TYYLITIEDOSTO (css/fokusvirta.css, ladataan täältä): css/styles.css
 * on toisen työvaiheen hallussa, eikä yhteen tiedostoon kirjoita kaksi
 * tekijää yhtä aikaa — sama ratkaisu kuin radiosoittimella
 * (js/linssit/radiosoitin.js lataaTyyli).
 */

import { fokusmoodiPaalla, html, jaaKappaleiksi, TOAST_MS } from './ui-apurit.js';
import { asetaKuva, julisteUrl } from './media.js';
import { el } from './mapart.js';
import { valokuvaUrl, valokuvaVara, valokuvaSuurennos } from './packs/africa-valokuvat.js';
import { kaupunginJuliste } from './packs/julisteet.js';
import { fokusvirtaKaupungille } from './packs/fokusvirrat.js';
import { natiiviVastaus } from './natiivi.js';
import { sfx } from './sound.js';

/*
 * MINIVISAN PALKKIO. Raamatun osio "Aarteet ja eteneminen" antaa pienen
 * paikallisaarteen tasoksi ~100–250 puntaa; minivisa on sitä pienempi
 * lämmittely, ja lähin olemassa oleva vertailukohta on tutkimisvastauksen
 * löytöpalkkio (js/game.js EXPLORE_REWARD = 50). Luku on tässä yhtenä
 * vakiona, jotta annostelun tasoa voi säätää yhdestä paikasta.
 */
export const TAKY_PALKKIO = 50;

/**
 * Virran vaiheet. Viimeinen on "virta pelattu läpi".
 *
 * KOHDE on kuudennen vaiheen sivupolku eikä seitsemäs vaihe: siihen
 * mennään valinnasta ja siitä palataan valintaan (ks. KOHDENOSTO
 * alempana). Se on listalla vain siksi, että tallennuksesta luettu
 * vaihe tunnistetaan kelvolliseksi.
 */
export const FOKUSVIRRAN_VAIHEET = Object.freeze([
  'matkakirja', 'pollo', 'valinta', 'taky', 'kohde', 'oppitunti', 'kohtaaminen', 'valmis',
]);

/* ==================== TILAKONE (puhdas, DOM:iton) ==================== */

/** Uuden kaupungin lähtötila: ensimmäinen kortti, ei yhtään täkyä. */
export function fokusvirtaAlkutila() {
  return { vaihe: 'matkakirja', taky: null, tehdyt: [], kohde: null, kohteet: [] };
}

/**
 * Siivoaa tallennuksesta luetun tilan sisältöä vasten.
 *
 * Tallennus voi olla vanhempi kuin sisältö: täky on voitu nimetä
 * uudelleen tai poistaa, ja silloin virta jäisi roikkumaan vaiheeseen,
 * jonka sisältöä ei ole. Tuntematon vaihe ja tuntemattomat täky- ja
 * kohdetunnukset pudotetaan, ja avoin täky tai kohde ilman sisältöä
 * palauttaa valintaan.
 */
export function fokusvirtaSiivoa(tila, data) {
  const tunnukset = new Set((data?.takyt ?? []).map((t) => t.id));
  const kohdeTunnukset = new Set((data?.kohteet ?? []).map((k) => k.id));
  const vaihe = FOKUSVIRRAN_VAIHEET.includes(tila?.vaihe) ? tila.vaihe : 'matkakirja';
  const tehdyt = (Array.isArray(tila?.tehdyt) ? tila.tehdyt : []).filter((id) => tunnukset.has(id));
  const kohteet = (Array.isArray(tila?.kohteet) ? tila.kohteet : [])
    .filter((id) => kohdeTunnukset.has(id));
  const taky = tunnukset.has(tila?.taky) ? tila.taky : null;
  const kohde = kohdeTunnukset.has(tila?.kohde) ? tila.kohde : null;
  const pohja = { vaihe, taky, tehdyt, kohde, kohteet };
  if (vaihe === 'taky' && !taky) return { ...pohja, vaihe: 'valinta' };
  if (vaihe === 'kohde' && !kohde) return { ...pohja, vaihe: 'valinta' };
  return pohja;
}

/** Onko portti aarrekysymykselle auki (ETENEMINEN: vähintään yksi täky)? */
export function fokusvirtaPorttiAuki(tila, data) {
  const vaadittuja = data?.valinta?.vaadittuja ?? 1;
  return (tila?.tehdyt?.length ?? 0) >= vaadittuja;
}

/** Vielä valittavissa olevat täyt (tehtyjä ei tarjota uudelleen). */
export function fokusvirtaJaljella(tila, data) {
  const tehdyt = new Set(tila?.tehdyt ?? []);
  return (data?.takyt ?? []).filter((t) => !tehdyt.has(t.id));
}

/** Vielä tarjottavat kohdenostot. Sama sääntö kuin täyillä. */
export function fokusvirtaKohteetJaljella(tila, data) {
  const nahdyt = new Set(tila?.kohteet ?? []);
  return (data?.kohteet ?? []).filter((k) => !nahdyt.has(k.id));
}

/** Kaikki kohteet, joiden vinjetti kuuluu jo kartalle. */
export function fokusvirtaNahdytKohteet(tila, data) {
  const nahdyt = new Set([...(tila?.kohteet ?? []), tila?.kohde].filter(Boolean));
  return (data?.kohteet ?? []).filter((k) => nahdyt.has(k.id));
}

/**
 * Tilakoneen ainoa siirtymä. Palauttaa UUDEN tilan; kelvoton teko
 * palauttaa tilan muuttumattomana, eikä mikään siirtymä muokkaa
 * annettua oliota.
 *
 * Teot: 'jatka' | { tyyppi: 'taky', id } | { tyyppi: 'kohde', id } |
 *       'visa' | 'aarteelle' | 'kysymys'
 *
 * KOHDENOSTO EI AVAA AARREPORTTIA (omistajan tilaus 24.8.2026:
 * kohdenosto on *"VAPAAEHTOINEN lisätäky"*, josta *"EI minivisaa"*).
 * Portti mittaa sitä, onko pelaaja kuunnellut yhden tarinan KAUPUNGISTA
 * — ja kohdenosto kertoo tarkoituksella jostakin muusta paikasta.
 * Siksi nähdyt kohteet kulkevat omassa listassaan eivätkä `tehdyissä`.
 *
 * MIKSI 'visa' MERKITSEE TÄYN TEHDYKSI RIIPPUMATTA VASTAUKSESTA:
 * portti mittaa sitä, onko pelaaja kuunnellut yhden tarinan, ei sitä
 * osasiko hän. Väärä vastaus jättäisi muuten pelaajan lukkoon
 * kaupunkiin, jonka kaikki täyt on jo käytetty (minitehtävään vastataan
 * vain kerran, js/game.js actionMinitehtava).
 */
export function fokusvirtaSiirto(tila, teko, data) {
  const nyt = fokusvirtaSiivoa(tila, data);
  const t = typeof teko === 'string' ? { tyyppi: teko } : (teko ?? {});
  switch (nyt.vaihe) {
    case 'matkakirja':
      return t.tyyppi === 'jatka' ? { ...nyt, vaihe: 'pollo' } : nyt;
    case 'pollo':
      return t.tyyppi === 'jatka' ? { ...nyt, vaihe: 'valinta' } : nyt;
    case 'valinta':
      if (t.tyyppi === 'taky') {
        const kelpaa = fokusvirtaJaljella(nyt, data).some((x) => x.id === t.id);
        return kelpaa ? { ...nyt, vaihe: 'taky', taky: t.id } : nyt;
      }
      if (t.tyyppi === 'kohde') {
        const kelpaa = fokusvirtaKohteetJaljella(nyt, data).some((x) => x.id === t.id);
        // Kohde merkitään nähdyksi heti avattaessa: kuplaan ei tule
        // visaa, joten muuta kuittausta ei ole — ja vinjetin pitää
        // jäädä kartalle vaikka pelaaja sulkisi kuplan lukematta.
        return kelpaa
          ? { ...nyt, vaihe: 'kohde', kohde: t.id, kohteet: [...nyt.kohteet, t.id] }
          : nyt;
      }
      if (t.tyyppi === 'aarteelle' && fokusvirtaPorttiAuki(nyt, data)) {
        return { ...nyt, vaihe: 'oppitunti', taky: null };
      }
      return nyt;
    case 'kohde':
      return t.tyyppi === 'jatka' ? { ...nyt, vaihe: 'valinta', kohde: null } : nyt;
    case 'taky':
      if (t.tyyppi === 'visa') {
        return nyt.tehdyt.includes(nyt.taky)
          ? nyt : { ...nyt, tehdyt: [...nyt.tehdyt, nyt.taky] };
      }
      if (t.tyyppi === 'jatka') return { ...nyt, vaihe: 'valinta', taky: null };
      return nyt;
    case 'oppitunti':
      return t.tyyppi === 'jatka' ? { ...nyt, vaihe: 'kohtaaminen' } : nyt;
    case 'kohtaaminen':
      return t.tyyppi === 'kysymys' ? { ...nyt, vaihe: 'valmis' } : nyt;
    default:
      return nyt;
  }
}

/* ==================== TILAN SÄILYTYS PELITALLENTEESSA ==================== */

/** Tallennusavain: sama kaupunki eri laudalla on eri matka. */
function tilaAvain(game, city) {
  return `${game.pack.id}:${city.id}`;
}

/** Kaupungin virran tila pelitallenteesta (aina siivottuna). */
export function fokusvirtaTila(game, city, data) {
  const tallessa = game?.fokusvirrat?.[tilaAvain(game, city)];
  return fokusvirtaSiivoa(tallessa ?? fokusvirtaAlkutila(), data);
}

/** Kirjaa tilan pelitallenteeseen. Tallennuksen laukaisee kutsuja. */
export function asetaFokusvirtaTila(game, city, tila) {
  if (!game) return;
  (game.fokusvirrat ??= {})[tilaAvain(game, city)] = tila;
}

/* ==================== KYTKENTÄ PELIIN ==================== */

/**
 * Onko tällä kaupungilla fokusvirta juuri nyt käytössä?
 *
 * Kolme ehtoa, kaikki pakolliset: fokusmoodi päällä (laitekohtainen
 * kytkin, js/ui-apurit.js), kaupungilla on sisältö, ja pelaaja on
 * ihminen. Muuten palautetaan null ja kaikki toimii kuten ennenkin.
 */
export function fokusvirtaSisalto(ui, city) {
  if (!city || !ui?.game || ui.game.player?.isBot) return null;
  if (!fokusmoodiPaalla()) return null;
  return fokusvirtaKaupungille(city.id);
}

/**
 * LEHTILUKKO. Fokusmoodissa kaupungin lehti aukeaa vasta, kun laatan
 * aarre on löydetty (Raamattu, ETENEMINEN: *"Aarteen jälkeen vapaa
 * tutkinta: kaupunki- ja maalehdet aukeavat"*).
 *
 * Lukon mitta on laatta: niin kauan kuin laatta on kääntämättä,
 * lehtinapit ohjaavat virtaan. Kun laatta on käännetty — löytyi sen
 * alta mitä tahansa — lukko aukeaa lopullisesti. Väärä vastaus ei siis
 * jätä pelaajaa umpikujaan: laatta jää paikalleen ja kysymyksen voi
 * yrittää uudelleen, ja lehti odottaa yhä toisella puolella.
 */
export function fokusvirtaLukitseeLehden(ui, city) {
  const data = fokusvirtaSisalto(ui, city);
  if (!data) return false;
  return Boolean(ui.game.tokens?.has(city.id));
}

/**
 * KYTKENTÄKOHTA js/ui.js:n openArrivalissa.
 *
 * Palauttaa true, kun fokusvirta ottaa lehden paikan: silloin
 * openArrival palaa heti eikä saapumiskorttia avata lainkaan. Sama
 * kutsu palvelee sekä alanapin Tutki-nappia että kaikkia muita lehden
 * avauskohtia — yksi portti, ei kuutta.
 *
 * MERKINTÄVAIHEESSA TUTKI ON KUITTAUS. Vaiheessa 1 ruudulla ei ole
 * virran omaa pintaa lainkaan: isoisän merkintä on ylävasemmassa
 * matkakirjakortissa, ja pöllö odottaa vuoroaan. Tutki-nappi on silloin
 * pelaajan tapa sanoa "luettu" — se päästää pöllön ääneen heti sen
 * sijaan että odottaisi kirjoituskoneen omaa ajastusta
 * (fokusvirtaMerkintaLuettu).
 */
export function fokusvirtaOhittaaLehden(ui, city) {
  if (!fokusvirtaLukitseeLehden(ui, city)) return false;
  const data = fokusvirtaSisalto(ui, city);
  const tila = fokusvirtaTila(ui.game, city, data);
  if (tila.vaihe === 'matkakirja') siirry(ui, city, data, 'jatka');
  else avaaFokusvirta(ui, city);
  return true;
}

/* ==================== VAIHE 1: YLÄVASEN MATKAKIRJAKORTTI ============ */

/**
 * KYTKENTÄKOHTA js/ui.js:n renderFactissa.
 *
 * Palauttaa merkinnän sisällön, kun virta omistaa tämän saapumisen —
 * muuten null, ja renderFact jatkaa tavalliseen tapaan. Sisältö
 * annetaan valmiiksi pureskeltuna, jotta ui.js ei joudu tuntemaan
 * fokusvirran datamuotoa: paikkarivi kortin alaotsikoksi, teksti
 * kirjoituskoneelle ja kuva postikorttilokeroon.
 *
 * MIKSI OMA FUNKTIO EIKÄ SUORA DATAHAKU: kortti on osa virtaa, ja
 * virran ehdot (fokusmoodi päällä, sisältöä on, laatta kääntämättä)
 * asuvat tässä tiedostossa yhtenä kappaleena. Kaksi paikkaa, joissa
 * samat kolme ehtoa lasketaan, ajautuisi ennen pitkää eri linjoille.
 */
export function fokusvirtaMatkakirja(ui, city) {
  if (!fokusvirtaLukitseeLehden(ui, city)) return null;
  const data = fokusvirtaSisalto(ui, city);
  const merkinta = data?.matkakirja;
  if (!merkinta?.teksti) return null;
  return {
    avain: `fokus:${ui.game.pack.id}:${city.id}`,
    paikkarivi: merkinta.paikkarivi ?? city.name,
    teksti: merkinta.teksti,
    kuva: merkinta.kuva ?? null,
  };
}

/**
 * Kuinka kauan pöllö odottaa merkinnän jälkeen ennen kuin puhuu.
 *
 * Omistajan tarkennus 24.8.2026: *"eikä molempien ääniä/animaatioita
 * ajeta päällekkäin"*. Kupla ilmestyy siis vasta kun kirjoituskone on
 * lyönyt merkinnän viimeisen sanan — ja senkin jälkeen hengähdyksen
 * verran myöhemmin, jottei pöllö puhu vielä kirjoittajan päälle.
 */
export const MERKINNAN_TAUKO_MS = 1400;

/**
 * Merkintä on kirjoitettu loppuun: pöllö saa vuoron.
 *
 * Kutsutaan js/ui.js renderFactista typeTextin valmistuttua. Siirto
 * tehdään vasta tauon jälkeen ja vain jos mikään ei ole sillä välin
 * muuttunut — pelaaja on voinut painaa Tutkia (joka tekee saman
 * siirron), lähteä kaupungista tai aloittaa uuden pelin.
 */
export function fokusvirtaMerkintaLuettu(ui, city) {
  const data = fokusvirtaSisalto(ui, city);
  if (!data) return;
  if (fokusvirtaTila(ui.game, city, data).vaihe !== 'matkakirja') return;
  clearTimeout(ui.fokusvirtaMerkintaAjastin);
  ui.fokusvirtaMerkintaAjastin = setTimeout(() => {
    if (ui.dead) return;
    if (ui.game?.cityOf?.()?.id !== city.id) return;
    if (!fokusvirtaLukitseeLehden(ui, city)) return;
    if (fokusvirtaTila(ui.game, city, data).vaihe !== 'matkakirja') return;
    siirry(ui, city, data, 'jatka');
  }, MERKINNAN_TAUKO_MS);
}

/**
 * KYTKENTÄKOHTA js/ui.js:n renderissä (paivitaTutkiSykkeen jälkeen).
 *
 * Fokusmoodissa esittely alkaa itsestään, kun pelaaja saapuu
 * kaupunkiin — tämä on Raamatussa nimetty poikkeus "mikään ei ponnahda
 * ruudulle" -sääntöön. Saapuminen luetaan samasta merkistä kuin
 * Tutki-napin syke (ui.lehtitila.tutkiSyke), ja avaus tehdään kerran
 * istuntoa ja kaupunkia kohti: pelaaja saa sulkea kortin ilman että se
 * ilmestyy takaisin joka piirrossa.
 */
export function fokusvirtaSaapuminen(ui) {
  const city = ui?.game?.cityOf?.();
  if (!city || !fokusvirtaLukitseeLehden(ui, city)) return;
  const avain = `${ui.game.pack.id}:${city.id}`;
  if (ui.lehtitila?.tutkiSyke !== avain) return;
  ui.fokusvirtaAvattu ??= new Set();
  if (ui.fokusvirtaAvattu.has(avain)) return;
  ui.fokusvirtaAvattu.add(avain);
  avaaFokusvirta(ui, city);
}

/* ==================== KORTTI ==================== */

const TYYLIN_TUNNUS = 'fokusvirta-tyyli';

/**
 * Oma tyylitiedosto sivulle, jos sitä ei vielä ole.
 *
 * @returns {HTMLLinkElement|null} linkki, jos se on juuri lisätty ja
 *   lataus on siis vielä kesken. Kupla tarvitsee tiedon: sen paikka
 *   lasketaan MITATUSTA leveydestä, ja ilman tyylitiedostoa mitta on
 *   tyylittömän laatikon leveys eikä kuplan.
 */
function lataaTyyli() {
  if (typeof document === 'undefined') return null;
  if (document.getElementById(TYYLIN_TUNNUS)) return null;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  // Yhden tiedoston versiossa erillistä linkkiä ei ole: tyylit ovat
  // silloin jo sivun <style>-lohkossa (tools/build-standalone.mjs).
  if (!peruslinkki) return null;
  const linkki = document.createElement('link');
  linkki.id = TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusvirta.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
  return linkki;
}

/**
 * Sulkee kortin tai kuplan. Ei kosketa virran tilaan — se on jo
 * tallessa, ja Tutki-nappi tuo saman vaiheen takaisin.
 *
 * Kuplan asemointi kuuntelee ikkunan kokoa; kuuntelija purkautuu tässä,
 * jottei suljettu kupla jää mittaamaan itseään jokaisesta kierrosta.
 */
export function suljeFokusvirta(ui) {
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  if (ui.fokusvirtaAsemointi) {
    globalThis.removeEventListener?.('resize', ui.fokusvirtaAsemointi);
    globalThis.removeEventListener?.('orientationchange', ui.fokusvirtaAsemointi);
    ui.fokusvirtaAsemointi = null;
  }
}

/**
 * Sulku pelaajan omasta eleestä (rasti tai napautus kuplaan).
 *
 * Vanha tallennus voi herätä tarjousvaiheeseen, jossa kortin sulku
 * päättää vuoron — sama sopimus kuin saapumiskortin sulkunapilla
 * (js/ui.js arrival-no). Sääntö on kortilla ja kuplalla sama, joten se
 * on tässä kerran.
 */
function suljeKasin(ui) {
  sfx.play('paper');
  suljeFokusvirta(ui);
  if (ui.game.phase === 'offer') ui.doAction(() => ui.game.actionSkipQuiz());
}

/**
 * Avaa (tai päivittää) kortin kaupungin virran nykyiseen vaiheeseen.
 * Kutsuttavissa milloin tahansa: kortti rakennetaan aina uudestaan
 * tilasta, joten sama kutsu sekä avaa että piirtää uudelleen.
 */
export function avaaFokusvirta(ui, city) {
  const data = fokusvirtaSisalto(ui, city);
  if (!data) return false;
  lataaTyyli();
  const tila = fokusvirtaTila(ui.game, city, data);
  piirraKortti(ui, city, data, tila);
  return true;
}

/** Kirjaa uuden tilan, tallentaa pelin ja piirtää vaiheen uudelleen. */
function siirry(ui, city, data, teko) {
  const tila = fokusvirtaSiirto(fokusvirtaTila(ui.game, city, data), teko, data);
  asetaFokusvirtaTila(ui.game, city, tila);
  ui.onChange?.(ui.game);
  piirraKortti(ui, city, data, tila);
  // Kartan vinjetit seuraavat vaihetta: uusi täky tuo uuden kuvan
  // Ateenan ylle, eikä sitä tarvitse odottaa seuraavaan piirtoon.
  paivitaFokuskuvat(ui);
  return tila;
}

/**
 * Vaiheet, joissa PÖLLÖ PUHUU — nämä esitetään kuplana, ei korttina.
 *
 * Rajanveto on omistajan: *"Matkakirjakortti (isoisän merkintä + vanha
 * kuva) PYSYY korttina — se on kirja, ei pöllön puhetta"*, ja
 * syvennykset minivisoineen ovat kortteja jo pituutensa vuoksi.
 * Jäljelle jäävät juuri ne vaiheet, joissa pöllö sanoo lyhyesti jotain
 * ja odottaa vastausta — kohdenosto mukaan lukien, sillä omistajan
 * tilaus 24.8.2026 sanoo siitä suoraan: *"PÖLLÖN PUHEKUPLAAN tulee
 * teksti aiheesta"*.
 */
const KUPLAVAIHEET = new Set(['pollo', 'valinta', 'kohde']);

/** Kelluva pöllönappi, jos se on juuri nyt ruudulla. */
function polloNappi() {
  const nappi = document.querySelector('.pollo-nappi');
  if (!nappi || nappi.hidden || !nappi.isConnected) return null;
  const laatikko = nappi.getBoundingClientRect();
  return laatikko.width > 0 && laatikko.height > 0 ? nappi : null;
}

/** Vaiheen pinta: kupla pöllöstä tai kortti kartan alalaidassa. */
function piirraKortti(ui, city, data, tila) {
  if (typeof document === 'undefined') return;
  suljeFokusvirta(ui);
  /*
   * TYYLI ENNEN PIIRTOA, EI VAIN AVAAFOKUSVIRRASSA. Kupla mitataan
   * asemointia varten heti kun se on puussa, ja tyylitön laatikko on
   * yhtä pitkää riviä eli leveämpi kuin ruutu — silloin reunapakko
   * liimasi kuplan vasempaan laitaan pöllön sijasta (havaittu
   * kolmella ruutukoolla 24.8.2026). Vaiheesta toiseen siirrytään
   * siirry():n kautta, joka ei käy avaaFokusvirran läpi, joten lataus
   * kuuluu tähän.
   */
  const tyyliKesken = lataaTyyli();
  /*
   * VAIHE 1 EI PIIRRÄ MITÄÄN. Isoisän merkintä on ylävasemmassa
   * matkakirjakortissa (js/ui.js renderFact, ks. fokusvirtaMatkakirja),
   * ja virran oma pinta odottaa pöllön vuoroa. Ilman tätä paluuta
   * ruudulla olisi kaksi matkakirjaa — juuri se, minkä v1093 korjasi.
   */
  if (tila.vaihe === 'matkakirja') return;
  const nappi = KUPLAVAIHEET.has(tila.vaihe) ? polloNappi() : null;
  if (nappi) piirraKupla(ui, city, data, tila, nappi, tyyliKesken);
  else piirraKehys(ui, city, data, tila);
}

/** Korttikehys: sama joka vaiheessa, sisältö vaihtuu. */
function piirraKehys(ui, city, data, tila) {
  const koti = document.querySelector('.map-pane') ?? document.body;
  const kortti = html('div', 'fokusvirta-kortti');
  kortti.setAttribute('role', 'group');
  kortti.setAttribute('aria-label', `${city.name}: esittely`);

  const sulje = html('button', 'fokusvirta-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje esittely');
  sulje.addEventListener('click', () => suljeKasin(ui));
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusvirta-sisalto');
  kortti.appendChild(sisalto);
  koti.appendChild(kortti);
  ui.fokusvirtaKortti = kortti;
  piirraSisalto(ui, city, data, tila, sisalto);
}

/**
 * PÖLLÖN PUHEKUPLA (omistajan pelitestipalaute 24.8.2026: *"pöllön
 * puhekuplat saisi tulla pöllöstä"*).
 *
 * Kupla asuu SAMASSA VANHEMMASSA KUIN PÖLLÖNAPPI eikä bodyssa:
 * lehtinäkymässä nappi siirtyy modaalin sisään (js/pollo.js
 * kiinnitysKohde), ja bodyssa oleva kupla jäisi silloin modaalin
 * taakse — näkyviin mutta painamattomiin. Sijainti on `fixed` ja
 * mitoitus tehdään napin todellisesta paikasta, joten vanhempi ei
 * vaikuta asemointiin.
 *
 * NAPAUTUS SULKEE, PAINIKE EI. Pöllön omalla kuplalla on sama sopimus
 * (omistaja 18.8.2026: *"Pöllön puhekuplia pitää häipyä jos sitä
 * koskettaa"*), mutta tässä kuplassa on painikkeita — napautus niiden
 * päällä on valinta eikä sulku, ja se päästetään läpi.
 */
function piirraKupla(ui, city, data, tila, nappi, tyyliKesken = null) {
  const koti = nappi.parentNode ?? document.body;
  const kupla = html('div', 'fokusvirta-kupla');
  kupla.setAttribute('role', 'group');
  kupla.setAttribute('aria-label', `${city.name}: Viisas Pöllö`);
  kupla.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('button')) return;
    suljeKasin(ui);
  });

  const sisalto = html('div', 'fokusvirta-sisalto');
  kupla.appendChild(sisalto);
  koti.appendChild(kupla);
  ui.fokusvirtaKortti = kupla;
  piirraSisalto(ui, city, data, tila, sisalto);

  const asemoi = () => {
    if (kupla.isConnected) asetaKuplanPaikka(kupla, nappi);
  };
  asemoi();
  /*
   * MITTA OTETAAN UUDESTAAN, KUN ASETTELU ON VALMIS. Ensimmäinen mitta
   * on pakko ottaa heti — muuten kupla välähtäisi väärässä paikassa —
   * mutta se voi osua hetkeen, jolloin tyylitiedosto on vasta matkalla
   * (ks. piirraKortti) tai kuvake ei ole vielä latautunut. Seuraava
   * kehys ja lyhyt varmistus sen perään korjaavat molemmat.
   */
  globalThis.requestAnimationFrame?.(asemoi);
  setTimeout(asemoi, 200);
  tyyliKesken?.addEventListener('load', asemoi, { once: true });
  ui.fokusvirtaAsemointi = asemoi;
  globalThis.addEventListener?.('resize', asemoi);
  globalThis.addEventListener?.('orientationchange', asemoi);
}

/**
 * Kupla pöllönapin yläpuolelle, ruudun reunojen sisään.
 *
 * KOLME MITTAA, KOLME SYYTÄ. Vaakasuunnassa kupla keskitetään nappiin
 * mutta pakotetaan marginaalien sisään, jottei se valu ruudun
 * ulkopuolelle kapealla puhelimella. Pystysuunnassa se ankkuroidaan
 * napin YLÄPUOLELLE (`bottom`), jolloin se ei koskaan peitä
 * alanappirivin Liiku- ja Tutki-nappeja eikä kasva alaspäin
 * sisällön mukana. Katto (`max-height`) lasketaan napin yläreunasta:
 * korkeakin kupla jättää ruudun ylälaidan — ja ylävasemman
 * matkakirjakortin — näkyviin, ja loput vieritetään kuplan sisällä.
 *
 * Kärjen paikka annetaan muuttujana (--kupla-karki), koska kupla
 * siirtyy reunapakon takia sivuun napin keskilinjasta: kärki jää silti
 * osoittamaan pöllöön eikä kuplan keskelle.
 */
function asetaKuplanPaikka(kupla, nappi) {
  const ikkuna = document.defaultView ?? globalThis;
  const laatikko = nappi.getBoundingClientRect();
  const marginaali = 8;
  const rako = 12;
  const leveys = kupla.getBoundingClientRect().width;
  const keskitetty = laatikko.left + laatikko.width / 2 - leveys / 2;
  const vasen = Math.max(marginaali,
    Math.min(keskitetty, (ikkuna.innerWidth || 0) - leveys - marginaali));
  kupla.style.left = `${Math.round(vasen)}px`;
  kupla.style.bottom = `${Math.round((ikkuna.innerHeight || 0) - laatikko.top + rako)}px`;
  kupla.style.maxHeight = `${Math.max(140, Math.round(laatikko.top - rako - marginaali))}px`;
  const karki = Math.min(
    Math.max(laatikko.left + laatikko.width / 2 - vasen, 16),
    Math.max(leveys - 16, 16),
  );
  kupla.style.setProperty('--kupla-karki', `${Math.round(karki)}px`);
}

/** Vaiheen sisältö annettuun säiliöön (kortin tai kuplan sisus). */
function piirraSisalto(ui, city, data, tila, sisalto) {
  switch (tila.vaihe) {
    case 'pollo': piirraPollo(ui, city, data, sisalto); break;
    case 'taky': piirraTaky(ui, city, data, tila, sisalto); break;
    case 'kohde': piirraKohde(ui, city, data, tila, sisalto); break;
    case 'oppitunti': piirraOppitunti(ui, city, data, sisalto); break;
    case 'kohtaaminen':
    case 'valmis': piirraKohtaaminen(ui, city, data, sisalto); break;
    default: piirraValinta(ui, city, data, tila, sisalto); break;
  }
}

/** Otsikkorivi: kuka puhuu. */
function otsikko(kohde, ylarivi, teksti) {
  if (ylarivi) kohde.appendChild(html('p', 'fokusvirta-ylarivi', ylarivi));
  if (teksti) kohde.appendChild(html('h3', 'fokusvirta-otsikko', teksti));
}

/** Kuvan pikkukuvan osoite; ämpärin painotuote vai Commonsin valokuva. */
function kuvanOsoite(kuva, koko) {
  return kuva.ampari ? julisteUrl(kuva.ampari) : valokuvaUrl(kuva.tiedosto, koko);
}

/** Sama kuva suurennoksena, pelin omaan katselimeen. */
function kuvanSuurennos(kuva) {
  return kuva.ampari ? julisteUrl(kuva.ampari) : valokuvaSuurennos(kuva.tiedosto, 1600);
}

/**
 * KUVAVIITE KORTILLE (omistajan tarkennus 24.8.2026: *"syvennys- ja
 * oppituntikorteissa kuvaa ei tarvitse näyttää isona kortin sisällä —
 * kortti voi näyttää tekstin ja pienen viitteen, ja itse kuva ilmestyy
 * karttaan pienenä sen vaiheen aikana"*).
 *
 * Viite on pieni kelluva pikkukuva selitteineen, ja napautus avaa
 * saman suurennoksen kuin kartan vinjetti (avaaSuurennos) — kuva kasvaa
 * paikaltaan kartan päälle, ja selite ja lähde tulevat sen alle (CC BY
 * vaatii tekijän maininnan myös suurennoksessa). Iso kuva ei enää syö
 * kortin korkeutta, joten leipäteksti mahtuu suuremmalla kirjasimella.
 */
function piirraKuva(ui, kohde, kuva) {
  if (!kuva) return;
  // Viite on yksi rivi: pikkukuva vasemmalla, selite ja lähde oikealla.
  // Ennen kuva oli koko kortin levyinen ja 34vh korkea.
  const viite = html('div', 'fokusvirta-viite');
  const nappi = html('button', 'fokusvirta-kuva');
  nappi.type = 'button';
  nappi.title = 'Katso kuva suurempana';
  const kuvateksti = html('p', 'fokusvirta-kuvateksti');
  const img = document.createElement('img');
  img.alt = kuva.selite ?? '';
  img.loading = 'lazy';
  img.draggable = false;
  /*
   * PUUTTUVA KUVA PIILOTTAA KUVAPAIKAN kokonaan, kuten julisteilla
   * (js/ui.js): rikkinäinen kuva jättäisi kortille tyhjän kehyksen ja
   * kuvatekstin, joka selittää kuvaa jota ei ole. Teksti on kortin
   * ydin, ja se toimii ilman kuvaakin.
   */
  const piilota = () => { viite.hidden = true; };
  if (kuva.ampari) {
    asetaKuva(img, kuvanOsoite(kuva, 320), null, piilota);
  } else {
    asetaKuva(img, kuvanOsoite(kuva, 320), valokuvaVara(kuva.tiedosto, 320), piilota);
  }
  nappi.appendChild(img);
  nappi.addEventListener('click', () => avaaSuurennos(ui, [kuva], 0, () => nappi));
  kuvateksti.append(
    html('span', 'fokusvirta-kuvaselite', kuva.selite ?? ''),
    html('span', 'fokusvirta-kuvalahde', kuva.lahde ?? ''),
  );
  viite.append(nappi, kuvateksti);
  kohde.appendChild(viite);
}

/* ==================== KUVAN SUURENNOS KARTAN PÄÄLLE ==================
 *
 * Omistajan tilaus 24.8.2026: *"kuvan pitäisi KASVAA ANIMOIDUSTI
 * suureksi niin, että KARTTA NÄKYY YHÄ TAUSTALLA"*.
 *
 * Pelin oma katselin (ui.openLightbox) tekee juuri päinvastoin: se on
 * koko ruudun modaali, joka tummentaa ja sumentaa kaiken alleen. Se on
 * oikein LEHDESSÄ, jossa kuvan takana on tekstipalsta — mutta väärin
 * fokusmoodissa, jonka koko idea on kartta näkymänä ja annos sen
 * päällä. Siksi fokusvirran kuvilla on oma kevyt suurennos, ja
 * openLightbox jää lehtien käyttöön koskemattomana.
 *
 * ── MITEN LIIKE PIIRRETÄÄN: FLIP, EI KEHYS KERRALLAAN ──────────────
 *
 * Kuva ladotaan HETI lopulliseen kokoonsa, ja sen päälle asetetaan
 * muunnos, joka kutistaa sen takaisin vinjetin ruutupaikkaan; seuraavana
 * kehyksenä muunnos poistetaan siirtymän kanssa. Sama oppi kuin kartan
 * kamera-ajossa (js/kartta.js ajaKamera): asettelu tehdään kerran ja
 * liike jätetään kompositorille, jolloin animaatio ei kilpaile kartan
 * rasteroinnin kanssa. Vain `transform` ja `opacity` liikkuvat.
 *
 * ── EI SUODATTIMIA, EI TÄYTTÄ PIMENNYSTÄ ───────────────────────────
 *
 * Tausta himmenee kevyesti (ks. css/fokusvirta.css .fokuszoom), ei
 * sumennu: kartan pitää erottua kuvan takaa. Sumennus olisi sitä paitsi
 * suodatin, ja suodatin kartan päällä on iOS:llä sama vaara kuin
 * kartalla itsellään (js/fokuskartta.js sääntö 3).
 */

/** Suurennoksen kasvun ja kutistuksen kesto. */
const SUURENNOS_MS = 320;
/**
 * Suuren kuvan osuus ruudun PIENEMMÄSTÄ sivusta (omistajan tilaus
 * 24.8.2026: *"~80 % ruudun pienemmästä sivusta"*). Pienempi sivu on
 * mitta juuri siksi, että kartta jää joka reunalta näkyviin.
 */
const SUURENNOS_OSUUS = 0.82;
/** Katot leveydelle ja korkeudelle, ettei kuva puske reunaan asti. */
const SUURENNOS_LEVEIN = 0.92;
const SUURENNOS_KORKEIN = 0.74;
/** Kuvasuhde, jota käytetään ennen kuin kuvan omat mitat tiedetään. */
const SUURENNOS_OLETUSSUHDE = 4 / 3;
/** Kiihtyy alussa, jarruttaa lopussa — kartan kamera-ajon sukulainen. */
const SUURENNOS_PEHMENNYS = 'cubic-bezier(0.22, 0.9, 0.24, 1)';
/** Pyyhkäisyn vähimmäismatka, jotta se erottuu napautuksesta. */
const PYYHKAISY_PX = 44;

/** Onko käyttäjä pyytänyt vähemmän liikettä? */
function liikeVahennetty() {
  return Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
}

/** Sulkee auki olevan suurennoksen ilman animaatiota (laudan vaihto). */
export function suljeSuurennos(ui) {
  ui?.fokusSuurennos?.heti?.();
  if (ui) ui.fokusSuurennos = null;
}

/**
 * Kuva suureksi kartan päälle, vinjetin paikalta kasvattaen.
 *
 * @param {object} ui
 * @param {Array} lista selattavat kuvat (yksi tai koko viuhka)
 * @param {number} alku minkä listan kuvan napautus avasi
 * @param {(i:number)=>Element|null} ankkuri mistä ruudun kohdasta kuva
 *   kasvaa ja mihin se kutistuu — indeksin mukaan, koska selaus voi
 *   vaihtaa kuvaa ja silloin myös paluupaikka vaihtuu.
 */
function avaaSuurennos(ui, lista, alku, ankkuri) {
  if (typeof document === 'undefined' || !lista?.length) return;
  suljeSuurennos(ui);
  lataaTyyli();
  let i = Math.min(Math.max(alku | 0, 0), lista.length - 1);
  let suljettu = false;

  const kerros = html('div', 'fokuszoom');
  kerros.setAttribute('role', 'dialog');
  kerros.setAttribute('aria-modal', 'true');
  kerros.setAttribute('aria-label', 'Kuva suurennettuna');
  const kehys = html('figure', 'fokuszoom-kehys');
  const img = document.createElement('img');
  img.className = 'fokuszoom-kuva';
  img.draggable = false;
  const teksti = html('figcaption', 'fokuszoom-teksti');
  const selite = html('span', 'fokuszoom-selite');
  const lahde = html('span', 'fokuszoom-lahde');
  const laskuri = html('span', 'fokuszoom-laskuri');
  teksti.append(selite, lahde, laskuri);
  kehys.append(img, teksti);
  kerros.appendChild(kehys);

  /** Kuvan sisältö paikalleen; iso versio vaihtuu tilalle kun se on. */
  const nayta = () => {
    const kuva = lista[i];
    img.alt = kuva.selite ?? '';
    asetaKuva(img, kuvanOsoite(kuva, 320),
      kuva.ampari ? null : valokuvaVara(kuva.tiedosto, 320), null);
    /*
     * PIKKUKUVA ENSIN, ISO PERÄSSÄ. Vinjetin pikkukuva on jo selaimen
     * välimuistissa, joten se on ruudulla samassa kehyksessä — ja mikä
     * tärkeämpää, sillä on oikeat mittasuhteet heti, jolloin kasvun
     * lähtö- ja maalilaatikko voidaan mitata odottamatta verkkoa.
     */
    const iso = new Image();
    iso.decoding = 'async';
    iso.addEventListener('load', () => {
      if (kerros.isConnected && lista[i] === kuva) img.src = iso.src;
    }, { once: true });
    iso.src = kuvanSuurennos(kuva);
    selite.textContent = kuva.selite ?? '';
    lahde.textContent = kuva.lahde ?? '';
    laskuri.textContent = lista.length > 1 ? `${i + 1} / ${lista.length}` : '';
  };
  nayta();

  /**
   * Kuvan laatikko pikseleinä: ruudun pienempi sivu ja kuvan oma
   * kuvasuhde. Sama luku kummallakin versiolla, joten pikkukuvan
   * vaihtuminen isoksi ei liikuta mitään.
   */
  const mitoita = () => {
    const leveys = globalThis.innerWidth || 0;
    const korkeus = globalThis.innerHeight || 0;
    if (!leveys || !korkeus) return;
    const pienempi = Math.min(leveys, korkeus);
    const enintaanW = Math.min(leveys * SUURENNOS_LEVEIN, pienempi * SUURENNOS_OSUUS);
    const enintaanH = Math.min(korkeus * SUURENNOS_KORKEIN, pienempi * SUURENNOS_OSUUS);
    const suhde = (img.naturalWidth && img.naturalHeight)
      ? img.naturalWidth / img.naturalHeight : SUURENNOS_OLETUSSUHDE;
    let w = enintaanW;
    let h = w / suhde;
    if (h > enintaanH) { h = enintaanH; w = h * suhde; }
    img.style.width = `${Math.round(w)}px`;
    img.style.height = `${Math.round(h)}px`;
  };

  /** Muunnos, joka vie ladotun kuvan ankkurin ruutupaikkaan. */
  const ankkuriMuunnos = () => {
    const alkuun = ankkuri?.(i)?.getBoundingClientRect?.();
    const nyt = img.getBoundingClientRect();
    if (!alkuun?.width || !nyt.width || liikeVahennetty()) return null;
    return `translate(${(alkuun.left - nyt.left).toFixed(1)}px, `
      + `${(alkuun.top - nyt.top).toFixed(1)}px) `
      + `scale(${(alkuun.width / nyt.width).toFixed(4)}, `
      + `${(alkuun.height / nyt.height).toFixed(4)})`;
  };

  const poista = () => {
    kerros.dispatchEvent(new CustomEvent('fokuszoom-poistuu'));
    kerros.remove();
  };

  const sulje = () => {
    if (suljettu) return;
    suljettu = true;
    if (ui.fokusSuurennos?.kerros === kerros) ui.fokusSuurennos = null;
    document.removeEventListener('keydown', nappain, true);
    kerros.classList.remove('fokuszoom-auki');
    const takaisin = ankkuriMuunnos();
    if (!takaisin) { poista(); return; }
    void kerros.offsetWidth;
    img.style.transition = `transform ${SUURENNOS_MS}ms ${SUURENNOS_PEHMENNYS}`;
    img.style.transform = takaisin;
    teksti.style.opacity = '0';
    setTimeout(poista, SUURENNOS_MS + 60);
  };

  /** Seuraava tai edellinen kuva viuhkasta; pyörii ympäri. */
  const selaa = (suunta) => {
    if (lista.length < 2) return;
    i = (i + suunta + lista.length) % lista.length;
    img.classList.remove('fokuszoom-vaihtuu');
    // Uusi kehys ennen luokan paluuta, tai selain ei huomaa vaihtoa.
    globalThis.requestAnimationFrame?.(() => img.classList.add('fokuszoom-vaihtuu'));
    nayta();
  };

  function nappain(tapahtuma) {
    if (tapahtuma.key === 'Escape') { tapahtuma.stopPropagation(); sulje(); return; }
    if (tapahtuma.key === 'ArrowRight') selaa(1);
    if (tapahtuma.key === 'ArrowLeft') selaa(-1);
  }
  document.addEventListener('keydown', nappain, true);

  if (lista.length > 1) {
    for (const [merkki, suunta, nimi] of [['‹', -1, 'Edellinen kuva'], ['›', 1, 'Seuraava kuva']]) {
      const nuoli = html('button', `fokuszoom-nuoli ${suunta < 0 ? 'vasen' : 'oikea'}`, merkki);
      nuoli.type = 'button';
      nuoli.setAttribute('aria-label', nimi);
      nuoli.addEventListener('click', (tapahtuma) => {
        tapahtuma.stopPropagation();
        selaa(suunta);
      });
      kerros.appendChild(nuoli);
    }
  }

  /*
   * NAPAUTUS SULKEE, PYYHKÄISY SELAA. Ero mitataan sormen matkasta:
   * alle 44 pikselin liike on napautus (sama sopimus kuin kuplalla,
   * *"Pöllön puhekuplia pitää häipyä jos sitä koskettaa"*), sitä pidempi
   * vaakaveto vaihtaa kuvaa eikä saa sulkea suurennosta.
   */
  let ele = null;
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    ele = { x: tapahtuma.clientX, y: tapahtuma.clientY, pyyhkaisy: false };
  });
  kerros.addEventListener('pointerup', (tapahtuma) => {
    if (!ele) return;
    const dx = tapahtuma.clientX - ele.x;
    const dy = tapahtuma.clientY - ele.y;
    if (Math.abs(dx) >= PYYHKAISY_PX && Math.abs(dx) > Math.abs(dy)) {
      ele.pyyhkaisy = true;
      selaa(dx < 0 ? 1 : -1);
    }
  });
  kerros.addEventListener('click', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.fokuszoom-nuoli')) return;
    if (ele?.pyyhkaisy) { ele = null; return; }
    sulje();
  });

  document.body.appendChild(kerros);
  ui.fokusSuurennos = { kerros, sulje, heti: poista };

  /*
   * KASVU ALKAA VASTA KUN KUVALLA ON MITAT. Ladottu <img> ilman
   * ladattua tiedostoa on nollan levyinen, ja nollasta laskettu
   * mittakaava olisi ääretön. Pikkukuva on yleensä välimuistissa eli
   * valmis heti; varmistus ajastimella pitää huolen siitä, ettei
   * suurennos jää muunnokseen jumiin, jos lataus epäonnistuu.
   */
  let aloitettu = false;
  const aloita = () => {
    if (aloitettu || suljettu || !kerros.isConnected) return;
    aloitettu = true;
    mitoita();
    const alusta = ankkuriMuunnos();
    if (alusta) {
      img.style.transition = 'none';
      img.style.transform = alusta;
      teksti.style.opacity = '0';
    }
    /*
     * PAKOTETTU TYYLIN LASKENTA ENNEN KÄÄNNÖSTÄ. Ilman tätä selain
     * niputtaa lähtö- ja maalitilan samaan kehykseen eikä näe niiden
     * välillä eroa: kuva ilmestyisi suoraan lopulliseen kokoonsa ilman
     * animaatiota (mitattu Chromiumilla 24.8.2026). Sama koskee taustan
     * himmennystä, joka on CSS-siirtymä luokan takana.
     */
    void kerros.offsetWidth;
    if (alusta) {
      img.style.transition = `transform ${SUURENNOS_MS}ms ${SUURENNOS_PEHMENNYS}`;
      img.style.transform = 'none';
      teksti.style.opacity = '';
    }
    kerros.classList.add('fokuszoom-auki');
  };
  /*
   * Mitat lasketaan uudelleen jokaisen latauksen jälkeen: pikkukuva,
   * sen tilalle tuleva iso versio ja viuhkasta selattu seuraava kuva
   * kulkevat kaikki tästä. Ikkunan koon muutos (kääntö kädessä)
   * asettaa laatikon uusiksi samalla kaavalla.
   */
  img.addEventListener('load', () => { mitoita(); aloita(); });
  globalThis.addEventListener?.('resize', mitoita);
  kerros.addEventListener('fokuszoom-poistuu', () => {
    globalThis.removeEventListener?.('resize', mitoita);
  }, { once: true });
  if (img.complete && img.naturalWidth) aloita();
  setTimeout(aloita, 400);
}

/**
 * Annosteltu teksti kappaleiksi.
 *
 * EI lehden piirraLeipaa: se lihavoi kappaleen neljä ensimmäistä sanaa
 * (lehtitaiton aloitus), ja pöllön repliikki alkaa lainausmerkillä —
 * lihavoitu `"Isoisäsi ei koskaan` näyttäisi virheeltä. Kappalejako on
 * silti sama (jaaKappaleiksi), joten kirjoittajan omat rivinvaihdot
 * pitävät myös täällä.
 */
function piirraTeksti(kohde, teksti) {
  const leipa = html('div', 'fokusvirta-teksti');
  for (const kappale of jaaKappaleiksi(teksti)) {
    leipa.appendChild(html('p', '', kappale));
  }
  kohde.appendChild(leipa);
  return leipa;
}

/** Napit kortin alalaitaan. */
function piirraNapit(kohde, napit) {
  const rivi = html('div', 'fokusvirta-napit');
  for (const n of napit) rivi.appendChild(n);
  kohde.appendChild(rivi);
}

/** Yksi nappi: teksti, luokka ja toiminto. */
function nappi(teksti, luokka, toiminto, este = null) {
  const el = html('button', luokka, teksti);
  el.type = 'button';
  if (este) {
    el.disabled = true;
    el.title = este;
  } else {
    el.addEventListener('click', toiminto);
  }
  return el;
}

/*
 * ---------- vaihe 1 ----------
 * Ei piirtäjää: isoisän merkintä on ylävasemmassa matkakirjakortissa
 * (js/ui.js renderFact, ks. fokusvirtaMatkakirja). Vaiheen ainoa
 * siirtymä on merkinnän kuittaus — kirjoituskoneen loppu tai Tutki.
 */

/* ---------- vaihe 2 ---------- */
function piirraPollo(ui, city, data, kohde) {
  otsikko(kohde, 'Viisas Pöllö', null);
  // Herokuva on kartalla Ateenan yllä (paivitaFokuskuvat), ei kuplassa:
  // puhekuplaan kuuluu puhe, ja kuva kuuluu sinne mistä puhutaan.
  piirraTeksti(kohde, data.pollo.teksti);
  piirraNapit(kohde, [nappi('Jatka', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'jatka');
  })]);
}

/* ---------- vaihe 3 ---------- */
function piirraValinta(ui, city, data, tila, kohde) {
  otsikko(kohde, 'Viisas Pöllö', data.valinta?.kysymys ?? 'Mistä haluaisit kuulla?');
  const jaljella = fokusvirtaJaljella(tila, data);
  const napit = jaljella.map((taky) => nappi(taky.nappi, '', () => {
    sfx.play('paper');
    siirry(ui, city, data, { tyyppi: 'taky', id: taky.id });
  }));
  /*
   * KOHDENOSTOT täkyjen jälkeen, aarrenapin edelle. Ne ovat kaupungin
   * omien tarinoiden jatkoa mutta eivät niiden veroisia: ei visaa, ei
   * palkkiota, ei porttia — siksi ne eivät myöskään aloita listaa.
   */
  for (const kohde of fokusvirtaKohteetJaljella(tila, data)) {
    napit.push(nappi(kohde.nappi ?? kohde.nimi, 'fokusvirta-kohdenappi', () => {
      sfx.play('paper');
      siirry(ui, city, data, { tyyppi: 'kohde', id: kohde.id });
    }));
  }
  const auki = fokusvirtaPorttiAuki(tila, data);
  napit.push(nappi(
    data.valinta?.aarreNappi ?? 'Jatka aarteelle',
    auki ? 'primary' : '',
    () => {
      sfx.play('paper');
      siirry(ui, city, data, 'aarteelle');
    },
    auki ? null : (data.valinta?.aarreEste ?? 'Kuuntele ensin yksi tarina'),
  ));
  piirraNapit(kohde, napit);
}

/* ---------- vaihe 4 ---------- */
function piirraTaky(ui, city, data, tila, kohde) {
  const taky = data.takyt.find((t) => t.id === tila.taky);
  if (!taky) { piirraValinta(ui, city, data, tila, kohde); return; }
  otsikko(kohde, 'Viisas Pöllö', taky.otsikko ?? taky.nappi);
  piirraKuva(ui, kohde, taky.kuva);
  piirraTeksti(kohde, taky.teksti);
  piirraMinivisa(ui, city, data, taky, kohde);
}

/* ---------- vaihe 3b: kohdenosto ---------- */

/**
 * KOHDENOSTO — pöllö puhuu paikasta, joka EI ole pelikaupunki.
 *
 * Omistajan tilaus 24.8.2026: *"uusi nostotyyppi, jossa huomio
 * kohdistuu MUUHUN paikkaan kuin pelikaupunkiin: kartalle ilmestyy
 * vinjettikuva kohteen omaan sijaintiin ja PÖLLÖN PUHEKUPLAAN tulee
 * teksti aiheesta"*.
 *
 * Kuplassa on siis pelkkä puhe ja paluunappi. Kuvaviitettä EI ole:
 * kuva on kartalla kohteen päällä, ja juuri sinne pelaajan katse
 * halutaan viedä — viite kuplassa kilpailisi sen kanssa. Kartan
 * puolen hoitaa paivitaFokuskuvat, jonka siirry() kutsuu heti.
 */
function piirraKohde(ui, city, data, tila, kohde) {
  const nosto = (data.kohteet ?? []).find((k) => k.id === tila.kohde);
  if (!nosto) { piirraValinta(ui, city, data, tila, kohde); return; }
  otsikko(kohde, 'Viisas Pöllö', nosto.nimi ?? null);
  piirraTeksti(kohde, nosto.teksti ?? '');
  piirraNapit(kohde, [nappi(nosto.paluu ?? 'Takaisin', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'jatka');
  })]);
  ajaKohteeseen(ui, city, nosto);
}

/**
 * MINIVISA JA PALKKIO.
 *
 * Kirjanpito on lehden minitehtävän oma (js/game.js actionMinitehtava):
 * sama avain vastataan kerran, raha maksetaan vain oikeasta, ja kaikki
 * kulkee pelitallenteessa ilman uutta mekaniikkaa. Avaimeen tulee etuliite
 * `fokus:`, jottei se voi osua lehden aihesivun avaimeen.
 *
 * JULISTE (Raamattu: *"palkkio: rahaa + generoitu juliste"*) myönnetään
 * ensimmäisestä oikeasta vastauksesta, jos kaupungilla on juliste
 * (js/packs/julisteet.js). Myöntö on game.myonnaJuliste — sama kutsu kuin
 * lehden minitehtävässä — ja katselun avaa erillinen nappi, jottei
 * suurennos peitä faktariviä kesken lukemisen (omistajan tilaus
 * 22.8.2026, js/ui.js piirraMinitehtava).
 */
function piirraMinivisa(ui, city, data, taky, kohde) {
  const visa = taky.visa;
  const laatikko = html('div', 'fokusvirta-visa');
  const jatka = () => nappi('Takaisin', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'jatka');
  });
  if (!visa) {
    kohde.appendChild(laatikko);
    piirraNapit(kohde, [jatka()]);
    return;
  }
  const avain = `${ui.game.pack.id}:${city.id}:fokus:${taky.id}`;
  laatikko.appendChild(html('p', 'fokusvirta-visa-kysymys', visa.kysymys));
  const tulos = html('p', 'fokusvirta-visa-tulos');
  // Jo vastattu (palattu korttiin tallennuksesta): näytetään vain fakta.
  if (ui.game.minitehtavatVastatut?.has(avain)) {
    tulos.textContent = visa.fakta ?? 'Tähän on jo vastattu.';
    laatikko.appendChild(tulos);
    kohde.appendChild(laatikko);
    piirraNapit(kohde, [jatka()]);
    return;
  }
  const vaihtoehdot = html('div', 'fokusvirta-vaihtoehdot');
  visa.vaihtoehdot.forEach((teksti, i) => {
    const nap = html('button', '', teksti);
    nap.type = 'button';
    nap.addEventListener('click', () => {
      const oikein = i === visa.oikea;
      const vastaus = ui.game.actionMinitehtava(city.id, `fokus:${taky.id}`, oikein, TAKY_PALKKIO);
      if (!vastaus.ok) return;
      vaihtoehdot.replaceChildren();
      tulos.className = `fokusvirta-visa-tulos ${oikein ? 'oikein-tulos' : 'vaarin-tulos'}`;
      tulos.textContent = (oikein
        ? `Oikein! +${TAKY_PALKKIO} puntaa. `
        : `Oikea vastaus: ${visa.vaihtoehdot[visa.oikea]}. `) + (visa.fakta ?? '');
      sfx.play(oikein ? 'correct' : 'wrong');
      natiiviVastaus(oikein);
      if (oikein) {
        const laatikkoToast = ui.buildToast?.({
          kind: 'stamp', icon: 'kukkaro',
          text: `+${TAKY_PALKKIO} puntaa`, sub: 'Pöllön täky ratkesi',
        });
        if (laatikkoToast) {
          setTimeout(() => ui.removeToast(laatikkoToast), TOAST_MS.default);
        }
        const juliste = kaupunginJuliste(city.id);
        if (juliste && !ui.game.julisteet?.has(city.id)) {
          ui.game.myonnaJuliste(city.id);
          ui.elavoitaLaukku?.();
          const lunasta = nappi('Lunasta juliste', '', () => ui.naytaJuliste(city.id));
          laatikko.appendChild(lunasta);
        }
      }
      // Täky on tehty vastauksesta riippumatta (ks. fokusvirtaSiirto).
      const uusi = fokusvirtaSiirto(fokusvirtaTila(ui.game, city, data), 'visa', data);
      asetaFokusvirtaTila(ui.game, city, uusi);
      ui.onChange?.(ui.game);
      ui.renderTurnPill?.();
    });
    vaihtoehdot.appendChild(nap);
  });
  laatikko.append(vaihtoehdot, tulos);
  kohde.appendChild(laatikko);
  piirraNapit(kohde, [jatka()]);
}

/* ---------- vaihe 5 ---------- */
function piirraOppitunti(ui, city, data, kohde) {
  otsikko(kohde, 'Viisas Pöllö', data.oppitunti.otsikko);
  piirraKuva(ui, kohde, data.oppitunti.kuva);
  piirraTeksti(kohde, data.oppitunti.teksti);
  piirraNapit(kohde, [nappi(data.kohtaaminen?.nappi ?? 'Jatka', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'jatka');
  })]);
}

/* ---------- vaihe 6 ---------- */
function piirraKohtaaminen(ui, city, data, kohde) {
  const kohtaaminen = data.kohtaaminen ?? {};
  otsikko(kohde, 'Kohtaaminen', kohtaaminen.hahmo ?? null);
  piirraTeksti(kohde, kohtaaminen.teksti ?? '');
  piirraNapit(kohde, [nappi(kohtaaminen.nappi ?? 'Tapaa paikallinen', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'kysymys');
    suljeFokusvirta(ui);
    /*
     * Tästä eteenpäin peli on ennallaan: sama kutsu kuin saapumiskortin
     * tehtävänapilla (js/ui.js). Kohtaamisen oma muotoarvonta jää pois
     * vain silloin, kun isoisän pulma ei odota — kuten siellä.
     */
    const pulmaOdottaa = ui.game.pendingPuzzle?.();
    ui.doAction(() => ui.game.actionQuiz(pulmaOdottaa ? {} : { form: 'quiz' }));
  })]);
}

/* ==================== KUVAT KARTALLA ==================== */

/*
 * FOKUSVIRRAN KUVAT PIIRTYVÄT KARTALLE (omistajan tarkennus 24.8.2026:
 * *"fokusvirran KUVAT PIIRTYVÄT PIENENÄ SUORAAN KARTALLE kohteen päälle
 * … ja pelaaja KLIKKAA ne auki isoksi"*).
 *
 * Vinjetti on pieni valokuvapinni: pergamenttikehys, kuva sen sisällä ja
 * hento nuora kaupungin pisteeseen. Kuvat kertyvät virran edetessä —
 * herokuva, jokainen avattu täky, oppitunnin kuva — ja asettuvat
 * viuhkaksi laatan YLÄPUOLELLE, jottei laatta jää niiden alle. Napautus
 * avaa saman katselimen kuin kortin kuvaviite, ja katselimessa voi
 * selata koko viuhkan läpi.
 *
 * ── KIINTEÄ RUUTUKOKO, EI LAUDAN YKSIKÖITÄ ─────────────────────────
 *
 * Omistaja pyysi päättämään ja perustelemaan. Valinta on KIINTEÄ
 * RUUTUKOKO: ryhmä käännetään kaupungin kohdalle ja skaalataan
 * käänteisellä zoomikertoimella (1 / nakyvaAlue().skaala), jolloin
 * pinni on aina saman kokoinen pikseleissä.
 *
 * MIKSI. Fokusmoodin zoomiväli on valtava: yleiskuvassa koko Eurooppa
 * mahtuu ruudulle, fokusajon jälkeen ruudulla on yksi maa. Laudan
 * yksiköissä mitoitettu vinjetti olisi yleiskuvassa muutaman pikselin
 * täplä — ei luettava eikä osuttava — ja fokusnäkymässä puoli ruutua.
 * Kiinteä ruutukoko pitää sen aina luettavana ja aina sormenkokoisena
 * (58 × 52 px eli yli 44 pikselin kosketusvähimmäisen). Sama sääntö on
 * jo pelissä: fokuskartan lisänimet syttyvät sen mukaan, kuinka isona
 * KIRJAIN piirtyy RUUDULLE, ei laudan zoomitason mukaan
 * (js/fokuskartta.js FOKUS_NIMI_LUETTAVA_PX).
 *
 * ── EI SUODATTIMIA ─────────────────────────────────────────────────
 *
 * Sama iOS-sääntö kuin muillakin kartan kerroksilla (js/fokuskartta.js
 * sääntö 3, tests/rules.test.mjs): suodatettu kerros palaa taustalta
 * tyhjänä. Kehys on <rect>, kuva on <image>, varjo on toinen <rect>.
 * Ei filter-määrettä, ei feDropShadow'ta, ei mitään suodatinta.
 *
 * ── OMA KERROS SVG:N JUURESSA ──────────────────────────────────────
 *
 * Kerros on this.svg:n suora lapsi eikä juuriryhmän sisällä — sama
 * ratkaisu ja sama syy kuin maastonimillä (js/ui.js maastonimiKerros):
 * kiertävän kartan <use>-kopio monistaisi vinjetit, ja sama valokuva
 * roikkuisi kahdessa paikassa. Kerros on viimeisenä eli kaupunkien ja
 * laattojen päällä, koska pinni on napautettava.
 *
 * ── KAKSI ANKKURIA, EI YHTÄ (kohdenostot 24.8.2026) ────────────────
 *
 * Kaupungin viuhka roikkuu laatan yllä, mutta KOHDENOSTON vinjetti
 * kuuluu kohteen omaan paikkaan — Korintin kanava on Korintin
 * kannaksella eikä Ateenassa. Kerroksen sisällä on siksi yksi
 * `.fokuskuva-ryhma` ankkuria kohti, ja käänteinen zoomiskaalaus
 * annetaan jokaiselle erikseen. Ilman tätä koko kerros olisi yhden
 * `translate`-muunnoksen varassa, ja toinen ankkuri vaatisi joko toisen
 * kerroksen tai käsin laskettua siirtoa laudan yksiköissä ryhmän
 * sisällä — kumpikin hajottaisi kiinteän ruutukoon.
 */

/** Vinjetin mitat ruudun pikseleinä (ks. perustelu yllä). */
const PINNI_LEVEYS = 58;
const PINNI_KORKEUS = 44;
const PINNI_REUNA = 3;
/** Polaroidin leveämpi alareuna: kuva ei istu kehyksen pohjalla. */
const PINNI_JALKA = 7;
/** Kuinka korkealle kaupungin pisteestä pinnin alareuna nousee. */
const PINNI_YLOS = 42;
/** Viuhkan askel ja kallistus; pinnit menevät hieman limittäin. */
const PINNI_ASKEL = 30;
const PINNI_KULMA = 7;
/** Kuinka monta vinjettiä kartalla korkeintaan on yhtä aikaa. */
const PINNI_ENINTAAN = 5;

/**
 * Mitkä virran kuvat kuuluvat juuri nyt kartalle?
 *
 * Kertymä seuraa virtaa: pöllön herokuva ilmestyy kun pöllö on saanut
 * vuoron, täyn kuva kun se on avattu (ja jää sen jälkeen), oppitunnin
 * kuva viimeisenä. Matkakirjan vanha valokuva EI ole listalla — se
 * asuu ylävasemmassa matkakirjakortissa, kuten omistaja linjasi.
 */
export function fokusvirtaKuvatKartalle(ui, city) {
  const data = fokusvirtaSisalto(ui, city);
  if (!data || !fokusvirtaLukitseeLehden(ui, city)) return [];
  const tila = fokusvirtaTila(ui.game, city, data);
  if (tila.vaihe === 'matkakirja') return [];
  const kuvat = [];
  if (data.pollo?.kuva) kuvat.push(data.pollo.kuva);
  const avatut = new Set([...(tila.tehdyt ?? []), tila.taky].filter(Boolean));
  for (const taky of data.takyt ?? []) {
    if (avatut.has(taky.id) && taky.kuva) kuvat.push(taky.kuva);
  }
  const oppitunnilla = ['oppitunti', 'kohtaaminen', 'valmis'].includes(tila.vaihe);
  if (oppitunnilla && data.oppitunti?.kuva) kuvat.push(data.oppitunti.kuva);
  // Uusin jää aina näkyviin: viuhkasta putoaa vanhin, ei tuorein.
  return kuvat.slice(-PINNI_ENINTAAN);
}

/**
 * Mitkä kohdenostot ovat juuri nyt kartalla — ja missä?
 *
 * Vinjetti jää paikalleen sen jälkeen kun pöllö on kertonut kohteesta:
 * se on matkamuisto, ei kortin koriste. Paikka luetaan kohteen
 * lautakohtaisesta taulusta (js/packs/fokuskohteet-grc.js); jos tälle
 * laudalle ei ole koordinaatteja, kohde jää pois kartalta mutta kupla
 * toimii yhä.
 */
export function fokusvirtaKohteetKartalle(ui, city) {
  const data = fokusvirtaSisalto(ui, city);
  if (!data || !fokusvirtaLukitseeLehden(ui, city)) return [];
  const lauta = ui.game?.pack?.id;
  const tila = fokusvirtaTila(ui.game, city, data);
  return fokusvirtaNahdytKohteet(tila, data)
    .map((kohde) => ({ kohde, paikka: kohde.laudat?.[lauta] }))
    .filter(({ kohde, paikka }) => kohde.kuva
      && Number.isFinite(paikka?.x) && Number.isFinite(paikka?.y));
}

/**
 * KAMERA KOHTEESEEN, JOS SE ON RAJAUKSEN ULKOPUOLELLA.
 *
 * Omistajan tilaus 24.8.2026: *"kamera saa siirtyä näyttämään kohteen
 * jos se on rajauksen ulkopuolella"*. Ehto on tärkeä: Korintin kanava
 * on Ateenan naapurissa ja mahtuu Kreikan fokusnäkymään ilman
 * liikettäkään, eikä kamera saa nykäistä turhaan. Ajo tehdään kartan
 * omalla julkisella kutsulla (js/kartta.js ajaKamera), joten tämä ei
 * kosketa kartan sisuksia.
 *
 * Vähimmäisala pitää huolen siitä, ettei kahden lähekkäisen pisteen
 * laatikko zoomaa portaikon perimmäiseen päähän: kohde ja kaupunki
 * halutaan näkyviin YHDESSÄ, ei kumpikaan yksin suurennettuna.
 */
const KOHTEEN_VAHIN_ALA = { w: 160, h: 120 };

function ajaKohteeseen(ui, city, kohde) {
  const paikka = kohde?.laudat?.[ui.game?.pack?.id];
  if (!Number.isFinite(paikka?.x) || !Number.isFinite(paikka?.y)) return;
  if (!ui.kartta?.ajaKamera) return;
  const alue = ui.nakyvaAlue?.();
  if (!alue?.skaala || !(alue.w > 0) || !(alue.h > 0)) return;
  // Reunavyöhyke luetaan "ulkopuolelle": ruudun laidassa oleva vinjetti
  // on yhtä huono kuin näkymän takana oleva.
  const vara = 0.1;
  const sisalla = paikka.x > alue.x + alue.w * vara
    && paikka.x < alue.x + alue.w * (1 - vara)
    && paikka.y > alue.y + alue.h * vara
    && paikka.y < alue.y + alue.h * (1 - vara);
  if (sisalla) return;
  const x0 = Math.min(paikka.x, city.x); const x1 = Math.max(paikka.x, city.x);
  const y0 = Math.min(paikka.y, city.y); const y1 = Math.max(paikka.y, city.y);
  const w = Math.max(x1 - x0, KOHTEEN_VAHIN_ALA.w);
  const h = Math.max(y1 - y0, KOHTEEN_VAHIN_ALA.h);
  ui.kartta.ajaKamera({
    bbox: { x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2, w, h },
  });
}

/** Kuvakerros SVG:n juureen kerran; palauttaa null ilman karttaa. */
function varmistaKuvakerros(ui) {
  if (!ui.svg) return null;
  if (!ui.fokuskuvatKerros?.isConnected || ui.fokuskuvatKerros.ownerSVGElement !== ui.svg) {
    ui.fokuskuvatKerros = el('g', { class: 'fokuskuvat' }, ui.svg);
    ui.fokuskuvatAvain = null;
  }
  // Kerros on napautettava, joten sen on pysyttävä päällimmäisenä myös
  // silloin kun jokin muu kerros on lisätty sen jälkeen.
  if (ui.fokuskuvatKerros.nextSibling) ui.svg.appendChild(ui.fokuskuvatKerros);
  return ui.fokuskuvatKerros;
}

/**
 * Yksi ankkuriryhmä kerrokseen: laudan piste, jonka ylle vinjetit
 * roikkuvat. Muunnos annetaan vasta skaalausvaiheessa.
 */
function ryhmaAnkkuriin(ui, kerros, x, y) {
  const g = el('g', { class: 'fokuskuva-ryhma' }, kerros);
  ui.fokuskuvatRyhmat.push({ g, x, y });
  return g;
}

/**
 * Yksi vinjetti viuhkaan.
 *
 * `indeksi` on paikka SUURENNOKSEN selauslistassa (kaikki kartalla
 * olevat kuvat järjestyksessä), ja sama luku on pinnin paikka
 * ui.fokuskuvatPinnit-taulukossa. Niin suurennos löytää sekä sen
 * kuvan, jota selataan, että ruutupaikan, johon se kutistuu.
 */
function piirraPinni(ui, kerros, kuva, kaikki, indeksi, siirto, kulma, uusi = false) {
  /*
   * KASVUANIMAATIO OMAAN KÄÄREESEEN. CSS:n `transform` syrjäyttää
   * SVG:n `transform`-määreen kokonaan, joten samaan solmuun ei voi
   * laittaa sekä viuhkan siirtoa että animaatiota — pinni hyppäisi
   * animaation ajaksi ankkuripisteeseen. Kääre kantaa animaation, pinni
   * oman paikkansa.
   */
  const koti = uusi ? el('g', { class: 'fokuskuva-kasvaa' }, kerros) : kerros;
  const g = el('g', {
    class: 'fokuskuva-pinni',
    transform: `translate(${siirto} ${-PINNI_YLOS}) rotate(${kulma})`,
  }, koti);
  ui.fokuskuvatPinnit[indeksi] = g;
  const kehysLeveys = PINNI_LEVEYS + PINNI_REUNA * 2;
  const kehysKorkeus = PINNI_KORKEUS + PINNI_REUNA + PINNI_JALKA;
  // Varjo on oma suorakulmionsa eikä suodatin (ks. EI SUODATTIMIA).
  el('rect', {
    class: 'fokuskuva-varjo',
    x: -PINNI_LEVEYS / 2 - PINNI_REUNA + 1.5,
    y: -kehysKorkeus + 1.5,
    width: kehysLeveys,
    height: kehysKorkeus,
    rx: 2,
  }, g);
  el('rect', {
    class: 'fokuskuva-kehys',
    x: -PINNI_LEVEYS / 2 - PINNI_REUNA,
    y: -kehysKorkeus,
    width: kehysLeveys,
    height: kehysKorkeus,
    rx: 2,
  }, g);
  const img = el('image', {
    class: 'fokuskuva-kuva',
    x: -PINNI_LEVEYS / 2,
    y: -PINNI_KORKEUS - PINNI_JALKA,
    width: PINNI_LEVEYS,
    height: PINNI_KORKEUS,
    // "slice" rajaa kuvan kehyksen sisään ilman erillistä leikkuria.
    preserveAspectRatio: 'xMidYMid slice',
    href: kuvanOsoite(kuva, 320),
  }, g);
  img.setAttribute('aria-hidden', 'true');
  /*
   * Rikkinäinen kuva ei saa jättää tyhjää kehystä roikkumaan kartalle:
   * yksi yritys varaosoitteeseen (sama porras kuin kortin viitteellä) ja
   * sen jälkeen koko pinni pois — kasvukääreineen, jos sellainen on.
   */
  let yritetty = false;
  img.addEventListener('error', () => {
    const vara = kuva.ampari ? null : valokuvaVara(kuva.tiedosto, 320);
    if (!yritetty && vara) {
      yritetty = true;
      img.setAttribute('href', vara);
      return;
    }
    (koti === kerros ? g : koti).remove();
  });
  const nimi = kuva.selite ? `Katso kuva: ${kuva.selite.slice(0, 60)}` : 'Katso kuva';
  g.setAttribute('role', 'button');
  g.setAttribute('tabindex', '0');
  g.setAttribute('aria-label', nimi);
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
    sfx.play('paper');
    avaaSuurennos(ui, kaikki, indeksi, (n) => ui.fokuskuvatPinnit?.[n] ?? null);
  };
  g.addEventListener('click', avaa);
  g.addEventListener('keydown', (tapahtuma) => {
    if (tapahtuma.key === 'Enter' || tapahtuma.key === ' ') avaa(tapahtuma);
  });
  return g;
}

/**
 * Vinjetit kartalle ja niiden koko zoomin mukaan.
 *
 * KUTSUTAAN SAMASTA KOHDASTA KUIN FOKUSKARTAN LISÄNIMET (js/ui.js
 * paivitaMaastonimet), eli aina kun näkymä on asettunut — ja lisäksi
 * jokaisesta virran siirrosta, jottei uusi kuva odota seuraavaa
 * kartan liikettä.
 *
 * TYÖ TEHDÄÄN VAIN KUN SISÄLTÖ MUUTTUI. Zoomi muuttaa vain ryhmän
 * muunnosta, ei yhtäkään solmua: kuvia ei ladata uudelleen
 * panoroidessa.
 */
export function paivitaFokuskuvat(ui) {
  if (typeof document === 'undefined') return;
  const kerros = varmistaKuvakerros(ui);
  if (!kerros) return;
  const city = ui.game?.cityOf?.();
  const kuvat = city ? fokusvirtaKuvatKartalle(ui, city) : [];
  const kohteet = city ? fokusvirtaKohteetKartalle(ui, city) : [];
  const tunniste = (k) => k.tiedosto ?? k.ampari;
  const avain = (kuvat.length || kohteet.length)
    ? `${ui.game.pack.id}:${city.id}:${kuvat.map(tunniste).join('|')}`
      + `:${kohteet.map(({ kohde }) => kohde.id).join('|')}`
    : 'tyhja';
  if (ui.fokuskuvatAvain !== avain) {
    /*
     * UUSI KOHDEVINJETTI TUNNISTETAAN EDELLISESTÄ AVAIMESTA. Kasvava
     * kuva on tervetulotoivotus, ei pysyvä tila: se saa animoitua kerran
     * ilmestyessään, muttei uudelleen joka kerta kun kerros rakennetaan
     * (esimerkiksi täyn kuvan liittyessä viuhkaan).
     */
    const ennen = new Set(ui.fokuskuvatKohteet ?? []);
    ui.fokuskuvatKohteet = kohteet.map(({ kohde }) => kohde.id);
    ui.fokuskuvatAvain = avain;
    kerros.textContent = '';
    ui.fokuskuvatPinnit = [];
    ui.fokuskuvatRyhmat = [];
    // Selauslista on kaikki kartalla oleva: kaupungin viuhka ensin,
    // kohdenostot perässä samassa järjestyksessä kuin ne piirretään.
    const kaikki = [...kuvat, ...kohteet.map(({ kohde }) => kohde.kuva)];
    if (kuvat.length && Number.isFinite(city.x) && Number.isFinite(city.y)) {
      const ryhma = ryhmaAnkkuriin(ui, kerros, city.x, city.y);
      const keski = (kuvat.length - 1) / 2;
      kuvat.forEach((kuva, i) => {
        const siirto = Math.round((i - keski) * PINNI_ASKEL);
        const kulma = ((i - keski) * PINNI_KULMA).toFixed(1);
        // Nuora kaupungin pisteestä pinnin alareunaan: pelaaja näkee
        // mihin kuva kuuluu, vaikka viuhka levittäytyy sivuun.
        el('line', {
          class: 'fokuskuva-nuora', x1: 0, y1: 0, x2: siirto, y2: -PINNI_YLOS,
        }, ryhma);
        piirraPinni(ui, ryhma, kuva, kaikki, i, siirto, kulma);
      });
    }
    kohteet.forEach(({ kohde, paikka }, j) => {
      const ryhma = ryhmaAnkkuriin(ui, kerros, paikka.x, paikka.y);
      el('line', {
        class: 'fokuskuva-nuora', x1: 0, y1: 0, x2: 0, y2: -PINNI_YLOS,
      }, ryhma);
      piirraPinni(ui, ryhma, kohde.kuva, kaikki, kuvat.length + j, 0, 0,
        !ennen.has(kohde.id));
    });
  }
  /*
   * Ankkuri laudan koordinaateissa, pinnit ruudun pikseleinä: jokainen
   * ryhmä käännetään oman pisteensä päälle ja skaalataan zoomin
   * käänteisluvulla. Ilman näkyvää aluetta (kartta ei ole vielä
   * mitattavissa) muunnokset jätetään entiselleen — väärä mittakaava
   * olisi pahempi kuin yhden kehyksen viive.
   */
  const skaala = ui.nakyvaAlue?.()?.skaala;
  if (!skaala || !Number.isFinite(skaala) || skaala <= 0) return;
  const zoom = (1 / skaala).toFixed(4);
  for (const ryhma of ui.fokuskuvatRyhmat ?? []) {
    ryhma.g.setAttribute('transform', `translate(${ryhma.x} ${ryhma.y}) scale(${zoom})`);
  }
}

/** Laudan vaihto tai uusi peli: vinjetit pois ja muisti nollille. */
export function nollaaFokuskuvat(ui) {
  ui.fokuskuvatAvain = null;
  ui.fokuskuvatPinnit = [];
  ui.fokuskuvatRyhmat = [];
  ui.fokuskuvatKohteet = [];
  suljeSuurennos(ui);
  if (ui.fokuskuvatKerros?.isConnected) ui.fokuskuvatKerros.textContent = '';
}
