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

import {
  fokusmoodiPaalla, html, jaaKappaleiksi, lehtivinkkiPiilotettu, nielaiseSulkevaNapautus,
  piilotaLehtivinkki, polloNimilappu, TOAST_MS,
} from './ui-apurit.js';
import { asetaTehtavakuittaus, fokusAarreAvattu, fokusAarreVastattu } from './fokustehtavat.js';
import { asetaKuva, julisteUrl } from './media.js';
import { el } from './mapart.js';
import { valokuvaUrl, valokuvaVara, valokuvaSuurennos } from './packs/africa-valokuvat.js';
import { kaupunginJuliste } from './packs/julisteet.js';
// Vihjelinkin osiotunniste ja sen näyttönimi (ks. piirraVihjelinkki).
import { KULTTUURI_KATEGORIAT } from './packs/kulttuuri-kategoriat.js';
// Sähketehtävän sisältöhakemisto lukee maan lehden otsikot (ks.
// sisaltohakemisto) — sama taulu, josta maalehti itse piirretään.
import { MAA_KATEGORIAT } from './packs/maa-kategoriat.js';
// Rekisteri myös kokonaisena: sähketehtävän sisältöhakemisto kerää
// maan kaupunkien virroista täkyjen ja nostojen otsikot.
import { FOKUSVIRRAT, fokusvirtaKaupungille } from './packs/fokusvirrat.js';
import { livianPaljastusOdottaa } from './livia.js';
import { luennanLoppuun } from './luenta.js';
import { natiiviVastaus } from './natiivi.js';
import { polloSaapumiskupla } from './pollo.js';
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
 * ============ KEVYT KULKU -KOKEILU (omistaja 24.8.2026, ilta) ========
 *
 * Raamatun osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU: *"raskaampi
 * korttiannostelu lipun taakse, ei poisteta"*. Omistaja kokeilee,
 * riittääkö kaupunkilehti pelin annostelijaksi:
 *
 *   kaupunkilehti aukeaa suoraan → lehden nimetyt minitehtävät →
 *   vihreä piste kartalle → kohtaaminen → aarre
 *
 * TÄMÄ LIPPU KYTKEE KORTTIANNOSTELUN. Kun se on `false`:
 *
 *   - pöllön kupla- ja korttivaiheet (huomio, täkyvalinta, syvennykset
 *     minivisoineen, kohdenostot, oppitunti ja Tapaa-portti) EIVÄT
 *     käynnisty missään: ei saapumisesta, ei Tutki-napista, ei laatan
 *     napautuksesta;
 *   - LEHTILUKKO on auki: openArrival avaa kaupunkilehden suoraan myös
 *     fokusmoodissa (fokusvirtaOhittaaLehden palauttaa aina false);
 *   - kartan kuvavinjetit jäävät piirtämättä (ks. alla).
 *
 * MIKÄ SÄILYY: isoisän merkintä ylävasemmassa matkakirjakortissa
 * (fokusvirtaMatkakirja + Sophian kuva) on kirjaa eikä korttiannostelua
 * — se jää kokeiluun sellaisenaan. Samoin säilyy kaikki tämän tiedoston
 * koodi: lipun kääntäminen takaisin `true`ksi palauttaa vanhan virran
 * kokonaan.
 *
 * KUVAVINJETIT JÄÄVÄT POIS (valinta perusteltuna, koska Raamattu
 * salli kumman tahansa). Viuhka kartalla on virran KERTYMÄ: herokuva
 * tulee pöllön vaiheesta, täkyjen kuvat avatuista täyistä, oppitunnin
 * kuva oppitunnista. Ilman kortteja yksikään näistä vaiheista ei tule
 * koskaan, joten viuhkaan ei kertyisi mitään — ja mikä tärkeämpää,
 * kokeilun ainoa asia kartalla pitää olla VIHREÄ PISTE. Kaksi
 * kilpailevaa napautuskohdetta saman laatan yllä olisi juuri sitä
 * raskautta, jota kokeilu purkaa.
 *
 * KAKSI LIPPUA, YKSI KOKEILU. Kevyen kulun oma puoli — lehden nimetyt
 * minitehtävät — on js/fokustehtavat.js:n FOKUS_LEHTITEHTAVAT. Liput
 * ovat toistensa vastakohdat: vanha virta palautetaan kääntämällä tämä
 * `true`ksi ja se `false`ksi.
 *
 * ── KORTIT PÄÄLLE (omistajan päätös 29.8.2026: *"Päälle — koko kulku
 *    testiin"*) ────────────────────────────────────────────────────
 *
 * Syvennyskortit, minivisat ja oppitunnit rakennettiin kahdessatoista
 * fokuskaupungissa (Ateena, Sofia, Istanbul, Rooma, Bukarest, Sarajevo
 * + aallot 1–3), mutta lipun ollessa pois kukaan ei nähnyt niistä
 * yhtäkään riviä. Lippu on nyt `true`, ja kulku on jälleen Raamatun
 * ANNOSTELU-osion kuusivaiheinen:
 *
 *   matkakirja → Livian kupla → valinta → täky + minivisa → oppitunti
 *   → kohtaaminen (tai sähketehtävä) → laattakysymys
 *
 * KEVYEN KULUN LIPPU JÄÄ PÄÄLLE. FOKUS_LEHTITEHTAVAT ei kääntynyt
 * `false`ksi, vaikka lippujen kommentit lupasivat liput toistensa
 * vastakohdiksi: lehden nimetyt tehtävät (AARTEEN AVAUS, JULISTE) ja
 * täkynostot ovat pelaajalle sisältöä, joka odottaa aarteen jälkeisessä
 * vapaassa tutkinnassa. Lehtilukko pitää huolen siitä, ettei kahta
 * annostelijaa ole yhtä aikaa auki: lehti — ja sen tehtävät — aukeaa
 * vasta laatan käännyttyä.
 */
export const FOKUSVIRTA_KORTIT = true;

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
 * ONKO KAUPUNGIN LAATTA JO ANSAINNUT PAIKKANSA LEHDEN PÄÄLLÄ?
 *
 * Omistajan pelitestipalaute v1097 (iPad): *"Ota pallot pois"* —
 * fokusnäkymässä laudan pyöreät pelimerkit (laatat, nappula,
 * kohderenkaat) rikkovat atlaksen lehden tunnelman. Ne piilotetaan
 * lehden alueelta (js/ui.js paivitaFokusPallot), ja laatta tuodaan
 * takaisin vasta kun se on pelin kannalta oleellinen:
 *
 *   1. AARREVAIHE. Virta on edennyt kohtaamiseen ("Tapaa Nikos" →
 *      varsinainen laattakysymys). Silloin laatta ilmestyy kartalle ja
 *      pöllö osoittaa sitä.
 *   2. KÄÄNNETTY LAATTA. Aarteen jälkeen alkaa vapaa tutkinta ja peli
 *      jatkuu ennallaan — laatta ja nappula näkyvät kuten aina.
 *   3. EI VIRTAA. Kaupunki ilman fokusvirtasisältöä (tai botti, tai
 *      fokusmoodi pois) ei annostele mitään, joten sen laatta ei saa
 *      jäädä piiloon odottamaan vaihetta, jota ei koskaan tule.
 *
 * Väärä vastaus jättää laatan paikalleen ja vaiheen 'valmis'-tilaan,
 * jolloin laatta pysyy näkyvissä uusintayritystä varten.
 */
export function fokusvirtaLaattaNakyy(ui, city) {
  if (!city) return false;
  // Laatta on käännetty (tai virtaa ei ole): peli näyttää sen itse.
  if (!fokusvirtaLukitseeLehden(ui, city)) return true;
  const data = fokusvirtaSisalto(ui, city);
  if (!data) return true;
  /*
   * KEVYT KULKU: aarrevaihe alkaa vihreästä pisteestä. Kortteja ei ole,
   * joten virran vaihe jää ikuisesti ensimmäiseen — ja ilman tätä
   * haaraa pelinappula ei palaisi lehden päälle koskaan. Piste syttyy
   * lehden aarteen avaavasta kysymyksestä — nimetystä tehtävästä tai
   * kulttuurivisasta, kumpi ensin (js/fokustehtavat.js fokusAarreAvattu)
   * — ja juuri se on tämän kokeilun "aarrevaihe": paikallinen odottaa
   * jo kartalla.
   */
  if (!FOKUSVIRTA_KORTIT) return fokusAarreAvattu(ui, city);
  const vaihe = fokusvirtaTila(ui.game, city, data).vaihe;
  return vaihe === 'kohtaaminen' || vaihe === 'valmis';
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
  /*
   * LEHTILUKKO POIS KEVYESSÄ KULUSSA. Kokeilun koko idea on, että
   * kaupunkilehti AUKEAA SUORAAN myös fokusmoodissa: lehti on nyt se
   * pinta, joka annostelee (nimetyt minitehtävät sivuilla 2 ja 3), eikä
   * sitä vastaan ole enää mitään lukittavaa.
   */
  if (!FOKUSVIRTA_KORTIT) return false;
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
 * virran ehdot (fokusmoodi päällä, sisältöä on, pelaaja ihminen)
 * asuvat tässä tiedostossa yhtenä kappaleena. Kaksi paikkaa, joissa
 * samat ehdot lasketaan, ajautuisi ennen pitkää eri linjoille.
 *
 * ── MERKINTÄ EI VAIHDU LAATAN RATKETTUA (korjaus 27.8.2026) ─────────
 *
 * Omistajan pelitestihavainto Kreikassa: laatan pulman ratkettua
 * matkakirjakorttiin ilmestyi VANHA saapumisteksti ("oliiveja kolmesta
 * ruukusta") uuden merkinnän tilalle. Syy oli tässä: ehtona oli
 * LEHTILUKKO (fokusvirtaLukitseeLehden), joka on tosi vain niin kauan
 * kuin laatta on kääntämättä. Laatan ratkettua game.js poistaa laatan
 * (tokens.delete), tämä funktio alkoi palauttaa pysyvästi nullin, ja
 * ui.js:n varapolku luki ehdoitta vanhan SAAPUMISTEKSTIT-merkinnän —
 * joka siis voitti aina.
 *
 * Lukko oli väärä mitta. Se kertoo, saako kaupunkilehden avata, ei
 * sitä, mitä isoisän kirjassa lukee: merkintä on kirjoitettu ennen
 * laatan kääntämistä eikä katoa kirjasta sen jälkeen. Kortin oma
 * sääntö on ui.js:n renderFactissa asti sama kuin ennen — *"sama teksti
 * pysyy koko käynnin ajan"* — ja nyt se pätee myös aarteen jälkeen.
 *
 * Ehdot ovat siis fokusvirtaSisällön kolme (fokusmoodi päällä, sisältöä
 * on, pelaaja ihminen); vanha SAAPUMISTEKSTIT/TARINAKAARI-polku jää
 * varapoluksi niille kaupungeille, joilla fokusvirtasisältöä ei ole.
 */
export function fokusvirtaMatkakirja(ui, city) {
  /*
   * AARREMERKINTÄ VOITTAA SAAPUMISMERKINNÄN. Se on sama kortti ja sama
   * kirja, mutta myöhempi sivu: saapumismerkintä on kirjoitettu ennen
   * kuin aarre löytyi, aarremerkintä sen jälkeen.
   */
  const aarre = fokusvirtaAarremerkinta(ui, city);
  if (aarre) return aarre;
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
  /*
   * AARREMERKINTÄ ON KEVYEN KULUN OMA POIKKEUS: sen jälkeen pöllö saa
   * vuoron myös silloin kun korttiannostelu on lipun takana. Sama
   * sopimus kuin saapumismerkinnällä — isoisä ensin, pöllö perästä,
   * eikä molempien ääntä yhtä aikaa.
   */
  if (aarremerkintaLuettu(ui, city)) return;
  /*
   * Kevyessä kulussa merkinnän loppu ei avaa korttia — mutta se
   * päästää Livian ääneen yhdellä kuplalla (fokusvirtaSaapumiskupla:
   * maadoitus tai kaupungin saapumisrepliikki). Kaikki muu odottaa yhä
   * lehteä (fokusvirtaLehtivinkki).
   */
  if (!FOKUSVIRTA_KORTIT) {
    fokusvirtaSaapumiskupla(ui, city);
    return;
  }
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

/*
 * ==================================================================
 * LIVIAN SAAPUMISKUPLA — YKSI PUHEENVUORO JOKA KAUPUNGISSA
 * (omistajan päätös 27.8.2026, laajennus 28.8.2026)
 * ==================================================================
 *
 * v1225 kirjoitti kuuteen fokuskaupunkiin Livian maadoituskommentin
 * (packs/fokusvirta-*.js, kenttä pollo.maadoitus): vastauksen isoisän
 * merkinnän SÄVYYN, ei sen faktoihin. Kommentit piirtyivät kuitenkin
 * vain fokusvirran kuplissa, ja koska korttiannostelu oli silloin
 * lipun takana, kukaan ei nähnyt niistä yhtäkään. v1232 toi ne kevyen
 * kulun omaan saapumiskuplaan: kun pelaaja on kuullut
 * matkakirjamerkinnän loppuun, Livia kommentoi ensimmäisenä. Kortit
 * päälle -päätöksen (29.8.2026) jälkeen maadoitus tulee taas pöllön
 * kortilta, ja kupla jää kaupunkien omille saapumisrepliikeille.
 *
 * LAAJENNUS 28.8.2026 (omistaja): *"AINA kun isoisän
 * matkakirjamerkinnän luenta loppuu, Livia saa kommentoida jotain
 * lisäksi."* Puheenvuoro ei siis ole enää kuuden fokuskaupungin oma
 * vaan sama paikka joka kaupungissa — vain SISÄLTÖ vaihtuu:
 *
 *   - Kaupunki, jolla on maadoitusteksti  → maadoitus, kuten ennenkin.
 *   - Muu kaupunki, jolle repliikki on kirjoitettu → LIVIAN_SAAPUMISET.
 *   - Kaupunki ilman kumpaakaan → ei kuplaa. Geneeristä täytettä ei
 *     kirjoiteta: hiljaisuus on parempi kuin sama vitsi joka kerta.
 *
 * YKSI KUPLA PER SAAPUMINEN, EI KAHTA PÄÄLLEKKÄIN. Maadoitus ja
 * saapumisrepliikki ovat sama puheenvuoro eri sisällöllä, ja muisti
 * (ui.saapumiskuplaNaytetty) on niille yhteinen.
 *
 * ATEENA VAIKENEE YHÄ. Aloituskaupungin saapumissekvenssillä on jo
 * kaksi ohjekuplaa ("Tervetuloa Kreikkaan…" ja "Klikkaa kaupungin
 * kultaista merkkiä", js/ui.js saapumisenKuplat), ja ne opettavat
 * pelin — kolmas kupla veisi tilaa juuri siltä ohjeelta, jota pelaaja
 * siinä hetkessä eniten tarvitsee. Sama kuplaperhe kun on kyseessä,
 * kolmas kupla myös KORVAISI ohjeen ruudulla. Ateenan maadoitusteksti
 * jää odottamaan fokusvirran kytkintä eikä sitä poisteta.
 */

/** Kaupungit, joissa saapumiskupla vaikenee (ks. yllä). */
const SAAPUMISKUPLA_VAITI = new Set(['ateena']);

/*
 * ------------------------------------------------------------------
 * LIVIAN SAAPUMISREPLIIKIT (omistajan tilaus 28.8.2026)
 * ------------------------------------------------------------------
 *
 * *"pulu voisi aina jutella jotain hassua kun tullaan uuteen
 * kaupunkiin … esitellä kansallisherkun tai Italiassa kertoa miten
 * kuljetti Romeon ja Julian kirjeitä … mutta pulun persous voisi
 * tasaisin väliajoin toistua eri muodoissa."*
 *
 * REPLIIKIT KIRJOITETAAN KÄSIN, kaupunki kerrallaan, täsmälleen kuten
 * maadoitukset — mallia ei päästetä keksimään kansallisherkkuja eikä
 * kansanpukuja. Kaupunki, jolle ei ole keksitty hyvää repliikkiä, jää
 * ilman kuplaa.
 *
 * SISÄLTÖ KIERTÄÄ, ei toista samaa muotoa peräkkäisissä kaupungeissa:
 *   (a) kansallisherkku pullapersoudella,
 *   (b) Columba Livia -pröystäily,
 *   (c) sukutarina (kyyhkypostin historia),
 *   (d) paikallinen pukeutuminen ja arjen tapa,
 *   (e) mitä vuoden 1873 ja nykyhetken välissä tapahtui.
 *
 * KOLME KURIA, JOTKA PITÄVÄT:
 *  1. LYHYT. Kupla on saapumisen sivuhuomio, ei luento: 2–3 virkettä.
 *  2. FAKTAT KESTÄVÄT. Leivonnaiset, vaatteet ja vuosiluvut ovat
 *     tarkistettavia; kaikki, mitä kukaan ei voi tarkistaa, sanotaan
 *     suvun perimätietona ("sukuni mukaan") — sama sääntö kuin
 *     kehotteen ISOISÄN MAADOITUS -osiossa.
 *  3. EI HUUTOMERKKEJÄ eikä juonipaljastuksia. Livia ei tiedä
 *     aarteista mitään eikä vihjaa niihin.
 *  4. PUHEKIELI, PAINO REUNOILLA (Raamattu v1270 "LIVIAN PUHEKIELI",
 *     sääntö 1): loppuheitot ja lyhentymät (mut, siit, sillon, yks,
 *     ekana) kuuluvat repliikin ALKUUN ja LOPPUUN. Keskellä rytmi ja
 *     arkisanasto säilyvät, mutta sanat kirjoitetaan auki (yksi,
 *     kuin, kaksisataa) — enintään yksi lyhentymä keskellä
 *     tehokeinona. PRONOMINIT KOKONAISINA — minä ja sinä, ei mä eikä
 *     sä. Kevyet täytesanat (no, niin, kato) säästellen, ja Kääk vain
 *     aidossa säikähdyksessä. Kirjakielinen abstraktio on tässä virhe.
 */
const LIVIAN_SAAPUMISET = {
  /* (b) pröystäily — Venetsian torilla suku on kotonaan. */
  venetsia: 'Venetsia. Täs kaupungissa minun sukuni istuu torilla '
    + 'kuin virkamiehet: Columba Livia, jos joku kysyy — ja täällä '
    + 'kysytään. Karnevaaliin leivotaan fritolea, pientä ja pyöreää. Ne on '
    + 'menneet ennen kun minä ehdin edes laskeutua.',

  /* (c) sukutarina — Verona ei ole laudalla, mutta se on tuolla. */
  firenze: 'Firenze. Täältä pohjoiseen on Verona, ja sukuni mukaan siellä '
    + 'kannettiin kahden nuoren kirjeitä puutarhan yli. Se on tarina eikä '
    + 'arkisto, mut hyvä tarina. Toscanassa palkka maksettiin bomboloneina. '
    + 'Se taas on ihan totta.',

  /* (d) pukeutuminen + (a) herkku. */
  dubrovnik: 'Dubrovnik. Muurilta näkee heti, kuka on pukenut juhlavaatteet: '
    + 'valkoinen liina, punainen liivi, hopeanapit. Ja sit fritulet — pieniä '
    + 'paistettuja palleroita, joita kukaan ei laske. Minä lasken.',

  /* (e) 1873 on Budapestin oma vuosi. */
  budapest: 'Budapest. Just tänä vuonna kolmesta tuli yks: Buda, Pest '
    + 'ja Óbuda samaan nimeen. Sitä ennen kirjeeseen piti valita niistä '
    + 'yksi. Kürtőskalács kiertää yhä vartaan ympäri, niinku sekin ois '
    + 'suostunut yhdistymiseen.',

  /* (a) herkku — Buchteln on kehotteen pullalistalla. */
  wien: 'Wien. Täällä leivotaan Buchtelnia: pehmeitä hiivapullia, jotka '
    + 'nostetaan vuoasta yksi kerrallaan. Minä olen laskenut niitä '
    + 'ikkunalaudalta enemmän kuin kehtaan sanoa. Kirjeitäkin kannoin. Siin '
    + 'järjestyksessä.',

  /* (a) herkku + (c) sukutarina. */
  kreeta: 'Kreeta. Kalitsounia: ohut taikina, tuoretta juustoa, hunajaa '
    + 'päälle. Sukuni mukaan tieto vietiin täällä satamasta sisämaahan '
    + 'siivin, koska vuoret ei päästä ratsua läpi yhtä nopeesti.',

  /* (a) herkku + (d) pukeutuminen. */
  sisilia: 'Sisilia. Aamiaiseks brioche col tuppo — pulla, jolla on oma '
    + 'nuttura — ja sen sisään lusikoidaan jäätelöä. Kuulostaa ihan '
    + 'väärältä ja on silti oikein. Vanhemmat herrat istuu baarissa paita '
    + 'napitettuna kaulaan asti, vaikka on kolkyt astetta.',

  /* (e) satamakaupunki ennen ja nyt + (a) herkku. */
  odessa: 'Odessa. Isoisäsi aikaan täältä lähti vilja puolelle Eurooppaa '
    + 'ja laiturilla puhuttiin kuutta kieltä yhtä aikaa. Pampuški — pehmeä '
    + 'sämpylä, valkosipulia päälle — on yhä se, mitä minulle heitetään '
    + 'ekana. Ei jälkiruoka. Mut pulla silti.',

  /* (a) herkku + (c) sukutarina. */
  marseille: 'Marseille. Navette: kapea, kova, appelsiininkukalta '
    + 'tuoksuva veneenmuotoinen leivos, jota paistetaan samassa uunissa '
    + 'kuin kaksisataa vuotta sitten. Meikäläisten muistiinpanojen mukaan '
    + 'tästä satamasta lähti moni kirje nopeemmin kun postivaunuista.',

  /* (c) sukutarina — isoäidin oma sota, kehotteen kaanonia. */
  pariisi: 'Pariisi. Täällä isoäitini teki työnsä. Talvella 1870 '
    + 'saarrettuun kaupunkiin ei päässyt kukaan, ja kirjeet meni sisään '
    + 'kyyhkyn mukana mikrofilmille kutistettuina. Palkinnoks hän sai '
    + 'briossia. Sen hän kertoi joka ikinen kerta.',
};

/**
 * Hengähdys luennan lopun ja kuplan välissä — sama sopimus kuin
 * saapumissekvenssissä (js/ui.js SAAPUMISEN_KUPLA_LUENNAN_JALKEEN_MS):
 * kertoja saa lopettaa lauseensa ennen kuin Livia aloittaa omansa.
 */
const SAAPUMISKUPLAN_TAUKO_MS = 900;

/**
 * Livian saapumispuheenvuoro kuplana, kerran per saapuminen.
 *
 * SISÄLTÖ VALITAAN TÄSSÄ, EI KUTSUPAIKASSA: fokuskaupungin maadoitus
 * voittaa, muuten käytetään kaupungin omaa saapumisrepliikkiä
 * (LIVIAN_SAAPUMISET). Kutsupaikkoja on kaksi — fokusvirran oma
 * merkintä (fokusvirtaMerkintaLuettu) ja tavallinen saapumismerkintä
 * (js/ui.js renderFact) — ja kumpikin kysyy samaa: onko Livialla tähän
 * kaupunkiin sanottavaa. Yhteinen muisti pitää huolen siitä, ettei
 * kahta kuplaa tule päällekkäin.
 *
 * KERRAN PER SAAPUMINEN, SAMA MUISTI KUIN KORTTIVIRRALLA. Kupla
 * merkitään näytetyksi ui:n omaan joukkoon avaimella lauta:kaupunki —
 * täsmälleen kuten fokusvirtaSaapuminen muistaa avaamansa kortit
 * (ui.fokusvirtaAvattu). Merkintä syntyy vain kerran kaupunkia kohti
 * (renderFact kirjoittaa merkinnän vain uudella korttiavaimella),
 * mutta muisti suojaa myös paluukäynniltä: samassa istunnossa
 * kaupunkiin palaava pelaaja ei kuule samaa puheenvuoroa uudestaan.
 *
 * LUENTA ENSIN. Kupla odottaa matkakirjaluennan loppua (js/luenta.js
 * luennanLoppuun) — kirjoituskone ehtii maaliin kauan ennen kertojaa,
 * ja ilman odotusta Livia puhuisi isoisän päälle. Ilman luentaa
 * (mykistys, kertojatila 'ei', puuttuva äänite) kupla tulee heti
 * tauon jälkeen.
 *
 * @returns {boolean} varattiinko kuplavuoro tälle kaupungille.
 */
export function fokusvirtaSaapumiskupla(ui, city) {
  if (!city || SAAPUMISKUPLA_VAITI.has(city.id)) return false;
  if (!ui?.game?.pack) return false;
  /*
   * ENSISAAPUMISEN TUURAUSPALJASTUS VOITTAA (omistaja 29.8.2026).
   * Livian kahden kuplan paljastus ON sen saapumisen puheenvuoro, ja
   * yksi puheenvuoro per saapuminen on kuplien sääntö — maadoitus
   * väistyy sen tieltä ja palaa seuraavissa kaupungeissa
   * (js/livia.js livianPaljastusOdottaa).
   */
  if (livianPaljastusOdottaa(ui)) return false;
  const maadoitus = fokusvirtaSisalto(ui, city)?.pollo?.maadoitus ?? null;
  /*
   * Korttivirrassa maadoitus on jo pöllökortin ensimmäinen kappale
   * (piirraPollo) — kupla toistaisi sen sanasta sanaan. Saapumisrepliikki
   * ei ole millään kortilla, joten se tulee kuplaan kummallakin virralla.
   */
  if (FOKUSVIRTA_KORTIT && maadoitus) return false;
  const teksti = maadoitus ?? LIVIAN_SAAPUMISET[city.id] ?? '';
  if (!teksti) return false;
  const avain = `${ui.game.pack.id}:${city.id}`;
  ui.saapumiskuplaNaytetty ??= new Set();
  if (ui.saapumiskuplaNaytetty.has(avain)) return false;
  ui.saapumiskuplaNaytetty.add(avain);
  const nayta = () => {
    clearTimeout(ui.saapumiskuplaAjastin);
    ui.saapumiskuplaAjastin = setTimeout(() => {
      if (ui.dead) return;
      // Pelaaja on voinut lähteä kaupungista tai aloittaa uuden pelin
      // luennan aikana: puheenvuoro kuuluu vain tähän kaupunkiin.
      if (ui.game?.cityOf?.()?.id !== city.id) return;
      polloSaapumiskupla(teksti);
    }, SAAPUMISKUPLAN_TAUKO_MS);
  };
  const luenta = luennanLoppuun(ui);
  if (luenta) {
    void luenta.then(() => { if (!ui.dead) nayta(); });
    return true;
  }
  nayta();
  return true;
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
  // Kevyessä kulussa saapuminen ei ponnahduta mitään: isoisän merkintä
  // kirjoittuu matkakirjakorttiin, ja loput odottaa lehdessä. Sama
  // renderin kytkentäkohta kuitenkin kelpaa aarteen löytymisen
  // huomaamiseen — se on kevyen kulun oma hetki.
  aarreLoytyi(ui);
  // Sama kytkentäkohta palvelee täkynostoa: se seuraa samaa hetkeä
  // (aarre löytyi) ja tarvitsee saman piirtotahdin (ks. asetaNostopinta).
  nostoPinta?.(ui);
  if (!FOKUSVIRTA_KORTIT) return;
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
  const oli = Boolean(ui.fokusvirtaKortti);
  ui.fokusvirtaKortti?.remove();
  ui.fokusvirtaKortti = null;
  if (ui.fokusvirtaAsemointi) {
    globalThis.removeEventListener?.('resize', ui.fokusvirtaAsemointi);
    globalThis.removeEventListener?.('orientationchange', ui.fokusvirtaAsemointi);
    ui.fokusvirtaAsemointi = null;
  }
  /*
   * TÄKYNOSTO ODOTTAA KUPLAN JÄLKEEN (ks. js/fokusnosto.js
   * nostoRuutuVapaa). Kupla ja nosto nousevat samaan alalaitaan, joten
   * nosto väistää kuplan — ja juuri tämä kutsu tekee järjestyksestä
   * välittömän: pelaajan napautus sulkee kuplan, ja otsikko nousee
   * heti sen tilalle sen sijaan että odottaisi seuraavaa piirtoa.
   */
  /*
   * KUTSU ON VIIVÄSTETTY YHDELLÄ TIKILLÄ. Kuplan vaihtuessa toiseksi
   * tämä sulku tapahtuu ENNEN uuden kuplan luontia (naytaPolloKupla),
   * joten heti ajettu tarkistus näkisi ruudun vapaana ja nostaisi
   * otsikon juuri sen kuplan alle, joka on tulossa.
   */
  if (oli) setTimeout(() => nostoPinta?.(ui), 0);
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
  // Kevyessä kulussa korttipintaa ei avata mistään: kohtaaminen tulee
  // vihreästä pisteestä omalla kutsullaan (avaaFokusKohtaaminen).
  if (!FOKUSVIRTA_KORTIT) return false;
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
  // Kohtaamiskortti aukeaa keskelle ruutua (omistajan pelitesti
  // 25.8.2026: "Tämä taulu saisi aueta keskelle ruutua") — muut
  // kortit pysyvät alalaidan liuskana.
  if (tila.vaihe === 'kohtaaminen') kortti.classList.add('keskella');
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
 *
 * SULKEVA NAPAUTUS EI VUODA KUPLAN ALLE. Kupla katoaa pointerdownissa,
 * ja ilman nielua selain etsisi saman napautuksen click-kohteen vasta
 * sormen noustessa — kartalta kuplan takaa (omistajan iPad-havainto
 * 27.8.2026, ks. ui-apurit nielaiseSulkevaNapautus).
 */
function piirraKupla(ui, city, data, tila, nappi, tyyliKesken = null) {
  const koti = nappi.parentNode ?? document.body;
  const kupla = html('div', 'fokusvirta-kupla');
  kupla.setAttribute('role', 'group');
  kupla.setAttribute('aria-label', `${city.name}: Livia`);
  kupla.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('button')) return;
    nielaiseSulkevaNapautus(tapahtuma);
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
  // Selvästi irti reunoista (omistaja 26.8.2026) — kupla kiinni
  // laidassa näytti ahtaalta.
  const marginaali = 16;
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
    /*
     * SÄHKETEHTÄVÄ ON KOHTAAMISEN SIJAINEN (Raamattu, PÖLLÖN
     * SÄHKETEHTÄVÄ). Sama vaihe, sama kortti, sama vihreä piste — vain
     * sisältö vaihtuu, ja valinnan tekee data eikä koodi.
     *
     * SÄHKE VOITTAA KOHTAAMISEN, JA JUURI SIKSI KUMPIKIN SAA OLLA
     * DATASSA YHTÄ AIKAA (omistajan pilottiehto 29.8.2026: *"Sofian
     * NYKYINEN kohtaaminen EI poisteta — jätä data paikoilleen mutta
     * pois käytöstä, jotta palautus on yksi rivi"*). Kaupunki, joka
     * pilotoi sähkettä, pitää kohtaamisensa kirjoitettuna, ja pilotin
     * peruminen on yhden rivin kommentointi paketissa — ei tekstien
     * kaivamista takaisin versiohistoriasta.
     */
    case 'kohtaaminen':
    case 'valmis':
      if (data.sahketehtava) piirraSahketehtava(ui, city, data, sisalto);
      else piirraKohtaaminen(ui, city, data, sisalto);
      break;
    default: piirraValinta(ui, city, data, tila, sisalto); break;
  }
}

/*
 * PUHUJAN NIMILAPPU (omistajan tilaus 27.8.2026). Kuplan ylärivi on
 * nimilappu, ei puhetta, joten siinä lukee yliviivausvitsi: pöllö-sana
 * vedettynä yli punaisella ja perässä "Pulu". Vakio on tässä, jotta
 * kaikki kuusi kutsupaikkaa saavat saman lapun samalla sanalla.
 */
const PULU_YLARIVI = Symbol('pulu-ylarivi');

/** Otsikkorivi: kuka puhuu. */
function otsikko(kohde, ylarivi, teksti) {
  if (ylarivi === PULU_YLARIVI) {
    kohde.appendChild(polloNimilappu(html('p', 'fokusvirta-ylarivi'), {}));
  } else if (ylarivi) {
    kohde.appendChild(html('p', 'fokusvirta-ylarivi', ylarivi));
  }
  if (teksti) kohde.appendChild(html('h3', 'fokusvirta-otsikko', teksti));
}

/**
 * Kuvan pikkukuvan osoite. Kolme lähdettä, sama porrastus kuin
 * täkynostoilla (js/fokusnosto.js asetaNostonKuva):
 *
 *   `osoite`   repon oma generoitu havainnekuva (assets/kartat/nostot/).
 *              Ei Commons-nimeä eikä varareittiä — se joko on tai ei ole.
 *   `ampari`   ämpärissä oleva painotuote (julisteet, herokuvat).
 *   `tiedosto` Commons-nimi, joka kulkee median asettajan läpi.
 */
function kuvanOsoite(kuva, koko) {
  if (kuva.osoite) return kuva.osoite;
  return kuva.ampari ? julisteUrl(kuva.ampari) : valokuvaUrl(kuva.tiedosto, koko);
}

/**
 * Kuvan varaosoite, tai null jos sellaista ei ole. Vain Commonsin
 * `tiedosto` tuntee varareitin; ämpärin ja repon omat kuvat eivät —
 * niiden kohdalla uusinta jättäisi vain tyhjän kehyksen roikkumaan.
 */
function kuvanVara(kuva, koko) {
  if (kuva.osoite || kuva.ampari) return null;
  return valokuvaVara(kuva.tiedosto, koko);
}

/**
 * Kortin ison kuvan leveys pikseleinä. Kortti on kartan levyinen ja
 * kuva sen levyinen, joten 320 px (entinen pikkuviite) näkyisi
 * tabletilla sumeana; 800 riittää retinallekin ilman että se on
 * suurennoksen kokoinen lataus.
 */
const KORTIN_KUVA_PX = 800;

/**
 * Sama kuva suurennoksena, pelin omaan katselimeen. Repon omasta
 * kuvasta on vain yksi koko (1024 px), joten suurennos on sama tiedosto
 * — se on jo välimuistissa, ja katselin skaalaa sen ruudun mittaan.
 */
function kuvanSuurennos(kuva) {
  if (kuva.osoite) return kuva.osoite;
  return kuva.ampari ? julisteUrl(kuva.ampari) : valokuvaSuurennos(kuva.tiedosto, 1600);
}

/**
 * KORTIN KUVA — HETI ISONA (omistajan pelitestipalaute 24.8.2026,
 * iPad-kuvakaappaus syvennyskortista: *"Liian raskaan oloinen
 * visuaalisesti. Kuva saisi tässä näkyä heti isolla."*).
 *
 * === MIKSI TÄMÄ ON MUUTTUNUT KAHDESTI ===
 *
 * Kuva oli ensin koko kortin levyinen ja 34vh korkea. Sitten se
 * kutistettiin 5,6 rem:n pikkuviitteeksi, koska kartalle ilmestyivät
 * omat vinjetit eikä kortin haluttu syövän ruudun korkeutta. Omistajan
 * pelitesti osoitti kutistuksen menneen liian pitkälle: kortti oli
 * pelkkää tekstiä, ja pikkuviite jäi merkitsemättömäksi tarraksi
 * tekstimassan reunaan. Nyt kuva on taas kortin ensimmäinen asia ja
 * koko kortin levyinen — kortin oma ulkoasu on samalla kevennetty
 * paperiksi (css/fokusvirta.css), joten iso kuva ei enää istu tumman
 * massan päällä.
 *
 * Selite ja lähde ovat ohuena rivinä kuvan alla (CC BY vaatii tekijän
 * maininnan), ja napautus avaa saman suurennoksen kuin ennenkin
 * (avaaSuurennos) — kuva kasvaa paikaltaan kartan päälle.
 */
function piirraKuva(ui, kohde, kuva, luokka = 'fokusvirta-viite') {
  if (!kuva) return;
  const viite = html('div', luokka);
  const nappi = html('button', 'fokusvirta-kuva');
  nappi.type = 'button';
  nappi.title = 'Katso kuva suurempana';
  const kuvateksti = html('p', 'fokusvirta-kuvateksti');
  const img = document.createElement('img');
  img.alt = kuva.selite ?? '';
  // EI `lazy`: kuva on kortin ensimmäinen asia ja näkyvissä heti, joten
  // laiska lataus vain viivyttäisi sitä.
  img.decoding = 'async';
  img.draggable = false;
  /*
   * PUUTTUVA KUVA PIILOTTAA KUVAPAIKAN kokonaan, kuten julisteilla
   * (js/ui.js): rikkinäinen kuva jättäisi kortille tyhjän kehyksen ja
   * kuvatekstin, joka selittää kuvaa jota ei ole. Teksti on kortin
   * ydin, ja se toimii ilman kuvaakin.
   */
  const piilota = () => { viite.hidden = true; };
  asetaKuva(img, kuvanOsoite(kuva, KORTIN_KUVA_PX),
    kuvanVara(kuva, KORTIN_KUVA_PX), piilota);
  nappi.appendChild(img);
  nappi.addEventListener('click', () => avaaSuurennos(ui, [kuva], 0, () => nappi));
  kuvateksti.append(
    html('span', 'fokusvirta-kuvaselite', kuva.selite ?? ''),
    html('span', 'fokusvirta-kuvalahde', kuva.lahde ?? ''),
  );
  viite.append(nappi, kuvateksti);
  kohde.appendChild(viite);
}

/**
 * KAKKOSKUVA TEKSTIN ALLE — sama malli kuin täkynostoilla
 * (js/fokusnosto.js piirraNostonValokuva, omistajan päätös 28.8.2026).
 *
 * Kun syvennyksen pääkuvaksi nousee loistoaikahavainnekuva, joka kertoo
 * mitä paikassa TAPAHTUI, aikalais- tai nykytilan valokuva on todiste
 * siitä, mitä siitä on jäljellä — ja se kuuluu vasta jutun jälkeen ja
 * pienempänä. Kehys, kuvateksti ja suurennos ovat pääkuvan omat, joten
 * CC-attribuutio kulkee mukana sellaisenaan: lisenssiehto ei jousta
 * koon mukaan.
 */
function piirraJalkikuva(ui, kohde, kuva) {
  piirraKuva(ui, kohde, kuva, 'fokusvirta-viite fokusvirta-jalkikuva');
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
 * Suuren kuvan osuus ruudun PIENEMMÄSTÄ sivusta.
 *
 * ALKUPERÄINEN MITTA OLI 0,82 (*"~80 % ruudun pienemmästä sivusta"*),
 * mutta omistajan pelitesti iPadilla 24.8.2026 osoitti sen liian
 * vaatimattomaksi: *"KUVA ISOMMAKSI … kasvata niin että kuva täyttää
 * ruudun selvästi"*. Kartta jää yhä joka reunalta näkyviin — juuri se
 * on pienemmän sivun mittaamisen syy — mutta marginaalit ovat nyt
 * kapeat.
 */
const SUURENNOS_OSUUS = 0.94;
/** Katot leveydelle ja korkeudelle, ettei kuva puske reunaan asti. */
const SUURENNOS_LEVEIN = 0.94;
const SUURENNOS_KORKEIN = 0.88;
/**
 * Kuvatekstipalkille varattava pystytila pikseleinä.
 *
 * Selite ja lähderivi asuvat KEHYKSEN SISÄLLÄ kuvan alla omalla
 * paperitaustallaan (omistajan pelitestipalaute 24.8.2026: teksti
 * valui irtotekstinä kartan ja pöllön kuplan päälle eikä sitä voinut
 * lukea). Palkki on osa kehystä, joten sen tila on vähennettävä kuvan
 * korkeudesta — muuten kortti kasvaisi ruutua korkeammaksi ja teksti
 * jäisi alareunan ulkopuolelle.
 */
const SUURENNOS_TEKSTIPALKKI = 120;
/**
 * Paperikehyksen oma tila pikseleinä (reunus + sisennys molemmilta
 * puolilta). Kuva mitoitetaan sen verran kapeammaksi, jottei kortti
 * kasva ruudun laitaa leveämmäksi ja jää flexin kutistettavaksi —
 * kutistettu kortti antaisi FLIP-animaatiolle väärän maalilaatikon.
 */
const SUURENNOS_KEHYS_PX = 26;
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
    asetaKuva(img, kuvanOsoite(kuva, 320), kuvanVara(kuva, 320), null);
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
    const enintaanW = Math.min(leveys * SUURENNOS_LEVEIN, pienempi * SUURENNOS_OSUUS)
      - SUURENNOS_KEHYS_PX;
    /*
     * KORKEUS MITATAAN RUUDUN KORKEUDESTA, EI PIENEMMÄSTÄ SIVUSTA.
     * Ennen molemmat sivut rajattiin pienempään sivuun, jolloin PYSTY
     * kuva jäi puhelimella ja tabletilla puolityhjäksi: leveyttä olisi
     * ollut, mutta korkeuskatto tuli lyhyemmästä sivusta. Omistajan
     * pelitesti 24.8.2026 osoitti juuri tämän (*"KUVA ISOMMAKSI"*).
     * Leveys pysyy pienemmän sivun mitassa, joten kartta erottuu yhä
     * kuvan sivuilta.
     *
     * Kuvatekstipalkki on kehyksen sisällä: sen tila varataan ennen kuin
     * kuvalle jaetaan korkeutta. Alaraja pitää huolen siitä, ettei
     * hyvin matalalla ruudulla jää pelkkää palkkia.
     */
    const enintaanH = Math.max(
      korkeus * SUURENNOS_KORKEIN - SUURENNOS_TEKSTIPALKKI,
      korkeus * 0.3,
    );
    const suhde = (img.naturalWidth && img.naturalHeight)
      ? img.naturalWidth / img.naturalHeight : SUURENNOS_OLETUSSUHDE;
    let w = enintaanW;
    let h = w / suhde;
    if (h > enintaanH) { h = enintaanH; w = h * suhde; }
    img.style.width = `${Math.round(w)}px`;
    img.style.height = `${Math.round(h)}px`;
    // Palkki on täsmälleen kuvan levyinen: kehys kutistuu kuvan
    // mittoihin, ja teksti taittuu sen sisään eikä kartan päälle.
    kehys.style.width = `${Math.round(w)}px`;
  };

  /**
   * Muunnos, joka vie ladotun KEHYKSEN ankkurin ruutupaikkaan.
   *
   * MUUNNOS ON KEHYKSELLÄ EIKÄ KUVALLA (24.8.2026). Kun suurennos sai
   * postikortin paperikehyksen ja kuvatekstipalkin, pelkän kuvan
   * kutistaminen olisi näyttänyt siltä, että valmis kortti on jo
   * ruudulla ja kuva vasta hakee paikkaansa sen sisällä. Nyt koko
   * kortti kasvaa vinjetin paikalta — yksi liike, yksi kappale.
   */
  const ankkuriMuunnos = () => {
    const alkuun = ankkuri?.(i)?.getBoundingClientRect?.();
    const nyt = kehys.getBoundingClientRect();
    if (!alkuun?.width || !nyt.width || liikeVahennetty()) return null;
    return `translate(${(alkuun.left - nyt.left).toFixed(1)}px, `
      + `${(alkuun.top - nyt.top).toFixed(1)}px) `
      + `scale(${(alkuun.width / nyt.width).toFixed(4)}, `
      + `${(alkuun.height / nyt.height).toFixed(4)})`;
  };

  const poista = () => {
    kerros.dispatchEvent(new CustomEvent('fokuszoom-poistuu'));
    /*
     * Kupla ja kortti palaavat ennalleen (ks. body-luokka avauksessa).
     * Poisto on tässä eikä sulkemisessa, jotta ne pysyvät poissa myös
     * kutistumisanimaation ajan — ja palaavat varmasti silloinkin, kun
     * suurennos revitään pois ilman animaatiota (laudan vaihto).
     */
    document.body.classList.remove('fokuszoom-paalla');
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
    kehys.style.transition = `transform ${SUURENNOS_MS}ms ${SUURENNOS_PEHMENNYS}`;
    kehys.style.transform = takaisin;
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

  /*
   * PÖLLÖN KUPLA JA KORTIT POIS SUURENNOKSEN AJAKSI (omistajan
   * pelitestipalaute 24.8.2026, iPad-kuvakaappaus): kupla jäi
   * suurennoksen viereen näkyviin ja kuvateksti valui sen päälle.
   * Suurennos on kartan ele, ja sen ajaksi ruudulla saa olla vain
   * kartta ja kuva.
   *
   * HÄIVYTYS EIKÄ `display: none` (css/fokusvirta.css): kortin
   * kuvaviite on suurennoksen ANKKURI, ja piilotettuna sillä ei olisi
   * enää ruutupaikkaa — kutistuminen takaisin paikalleen jäisi
   * tekemättä. Häivytetty kortti pysyy mitattavana.
   */
  document.body.classList.add('fokuszoom-paalla');
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
      kehys.style.transition = 'none';
      kehys.style.transform = alusta;
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
      kehys.style.transition = `transform ${SUURENNOS_MS}ms ${SUURENNOS_PEHMENNYS}`;
      kehys.style.transform = 'none';
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

/** Napit kortin alalaitaan. Lisäluokalla rivi voi poiketa perusasusta. */
function piirraNapit(kohde, napit, luokka = '') {
  const rivi = html('div', luokka ? `fokusvirta-napit ${luokka}` : 'fokusvirta-napit');
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
  otsikko(kohde, PULU_YLARIVI, null);
  // Herokuva on kartalla Ateenan yllä (paivitaFokuskuvat), ei kuplassa:
  // puhekuplaan kuuluu puhe, ja kuva kuuluu sinne mistä puhutaan.
  /*
   * ISOISÄN MAADOITUS ENSIN (Fablen kaanon, omistajan hyväksyntä
   * 27.8.2026, TUURAAJA-KEHYS).
   *
   * Pelaaja on juuri lukenut merkinnän ylävasemmasta
   * matkakirjakortista, ja Livia vastaa siihen ensimmäisenä: hän
   * palauttaa isoisän ylevän SÄVYN maan tasalle — mutta ei koskaan
   * aarrejahdin faktoja, eikä joka kaupungissa samalla tavalla. Vasta
   * sen jälkeen tulee vaiheen oma nykypäivän huomio, joka on entisellään
   * sanasta sanaan.
   *
   * Kenttä on VAPAAEHTOINEN: kaupunki ilman maadoitusta piirtyy
   * täsmälleen kuten ennenkin. Kappalejako syntyy tyhjästä rivistä
   * (ui-apurit.js jaaKappaleiksi).
   */
  const puhe = [data.pollo.maadoitus, data.pollo.teksti]
    .filter(Boolean).join('\n\n');
  piirraTeksti(kohde, puhe);
  piirraNapit(kohde, [nappi('Jatka', 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'jatka');
  })]);
}

/* ---------- vaihe 3 ---------- */
function piirraValinta(ui, city, data, tila, kohde) {
  otsikko(kohde, PULU_YLARIVI, data.valinta?.kysymys ?? 'Mistä haluaisit kuulla?');
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
  otsikko(kohde, PULU_YLARIVI, taky.otsikko ?? taky.nappi);
  piirraKuva(ui, kohde, taky.kuva);
  piirraTeksti(kohde, taky.teksti);
  piirraJalkikuva(ui, kohde, taky.valokuva);
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
  otsikko(kohde, PULU_YLARIVI, nosto.nimi ?? null);
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
          text: `+${TAKY_PALKKIO} puntaa`, sub: 'Livian täky ratkesi',
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

/**
 * OPPITUNNIN JATKONAPPI LUPAA SEN, MIKÄ SEURAAVAKSI TULEE.
 *
 * Nappi luki ennen aina `kohtaaminen.nappi` ("Tapaa Nadia"), mutta
 * sähkekaupungissa sen takana ei ole ketään tavattavaa vaan pöllön
 * sähke — ja sähke voittaa kohtaamisen myös silloin, kun molemmat ovat
 * datassa (Sofian pilottiehto, ks. piirraSisalto). Kortit päälle
 * -pelitestissä 29.8.2026 juuri se näkyi: Sofian oppitunti tarjosi
 * "Tapaa Nadia" ja seuraava kortti olikin sähke.
 *
 * Järjestys on siis sama kuin piirtäjän valinnassa: sähke ensin,
 * kohtaaminen sen jälkeen, ja viimeisenä väritön "Jatka". Sanamuoto on
 * sama kuin vihreän pisteen ruudunlukijalapussa
 * (fokusvirtaKohtaamispiste), jotta pelaaja lukee saman lupauksen
 * kummalta pinnalta tahansa.
 */
function aarrevaiheenNappi(data) {
  if (data.sahketehtava) return data.sahketehtava.nappi ?? 'Lue pöllön sähke';
  return data.kohtaaminen?.nappi ?? 'Jatka';
}

function piirraOppitunti(ui, city, data, kohde) {
  otsikko(kohde, PULU_YLARIVI, data.oppitunti.otsikko);
  piirraKuva(ui, kohde, data.oppitunti.kuva);
  piirraTeksti(kohde, data.oppitunti.teksti);
  piirraJalkikuva(ui, kohde, data.oppitunti.valokuva);
  piirraNapit(kohde, [nappi(aarrevaiheenNappi(data), 'primary', () => {
    sfx.play('paper');
    siirry(ui, city, data, 'jatka');
  })]);
}

/* ---------- vaihe 6 ---------- */

/*
 * KOHTAAMISEN VARMISTUS (omistajan pelitestipalaute v1119: *"nykyisen
 * suoran 'Tapaa Nikos' -toiminnon tilalle kysymys 'Haluatko varmasti
 * tavata Nikoksen juuri nyt?' ja KYLLÄ / EI -napit. EI sulkee kortin
 * (kohtaamiseen voi palata myöhemmin)."*).
 *
 * Kohtaaminen kuluttaa yhden kahdesta yrityksestä (js/game.js
 * actionQuiz kirjaa yrityksen jo avattaessa), joten napin painallus on
 * peruuttamaton teko — eikä se saa tapahtua vahingossa. Varmistuksen
 * alla lukee pienellä, mitä panoksena on.
 */
const KOHTAAMISEN_VAROITUS = 'Sinulla on vain kaksi yritystä, jonka '
  + 'jälkeen aarre sulkeutuu ikuisesti.';

/**
 * Varmistuskysymyksen sanamuoto.
 *
 * Kohde voi antaa oman lauseensa (`kohtaaminen.varmistus`), koska
 * suomen genetiivi ei taivu koneellisesti jokaisesta nimestä
 * ("Nikos" → "Nikoksen", "Inês" → ?). Ilman omaa lausetta käytetään
 * pronominia: väärin taivutettu nimi olisi pahempi kuin sen puute.
 */
function varmistusLause(kohtaaminen) {
  if (kohtaaminen.varmistus) return kohtaaminen.varmistus;
  return 'Haluatko varmasti tavata hänet juuri nyt?';
}

/**
 * VIHJELINKKI LEHDEN OSIOON (omistajan pelitestipalaute v1119, kohta
 * 13: *"vihjerivi pienellä: kaupunkikohtainen valinnainen kenttä
 * kohtaamisdataan, joka kertoo MISTÄ PÄIN LEHTEÄ pulman ratkaisu
 * löytyy, vastausta paljastamatta"* — ja tarkennus: *"vihjeriviä
 * painamalla kaupunkilehti avautuu suoraan siihen osioon"*).
 *
 * Kenttä on OSIOTUNNISTE eikä vapaa teksti (`kohtaaminen.vihjeOsio`,
 * esim. 'kaupunki'), jolloin näyttöteksti voidaan johtaa osion omasta
 * otsikosta eikä kahta totuutta pääse syntymään. Tunnistetta ei
 * tarvitse antaa: ilman sitä riviä ei ole.
 *
 * Linkki sulkee varmistuksen samaa tietä kuin EI-nappi (kohtaamiseen
 * voi palata) ja avaa lehden siltä sivulta, jolla osio on.
 */
function piirraVihjelinkki(ui, city, kohtaaminen, kohde) {
  const tunnus = kohtaaminen.vihjeOsio;
  if (!tunnus) return;
  const osiot = KULTTUURI_KATEGORIAT[city.id] ?? [];
  const kohta = osiot.findIndex((o) => o.id === tunnus);
  if (kohta < 0) return;
  const nimi = osiot[kohta].nimi;
  const linkki = html('button', 'fokusvirta-vihjelinkki', `Vihje: pulman ratkaisu löytyy lehden osiosta ${nimi} →`);
  linkki.type = 'button';
  linkki.addEventListener('click', () => {
    sfx.play('paper');
    suljeFokusvirta(ui);
    ui.openArrival?.(city);
    // Sivu 0 on kansi, joten osion sivu on sen indeksi + 1
    // (js/lehti.js rakennaSivut ja naytaTutkiSivu).
    ui.naytaTutkiSivu?.(kohta + 1, { heti: true });
  });
  kohde.appendChild(linkki);
}

function piirraKohtaaminen(ui, city, data, kohde) {
  const kohtaaminen = data.kohtaaminen ?? {};
  otsikko(kohde, 'Kohtaaminen', kohtaaminen.hahmo ?? null);
  piirraTeksti(kohde, kohtaaminen.teksti ?? '');
  kohde.appendChild(html('p', 'fokusvirta-varmistus', varmistusLause(kohtaaminen)));
  const aloita = () => {
    sfx.play('paper');
    // Kevyessä kulussa virran vaihetta ei ole eikä siihen kirjoiteta:
    // kortti on tässä vain esittely, ja laattamekaniikka jatkaa siitä.
    if (FOKUSVIRTA_KORTIT) siirry(ui, city, data, 'kysymys');
    suljeFokusvirta(ui);
    /*
     * Tästä eteenpäin peli on ennallaan: sama kutsu kuin saapumiskortin
     * tehtävänapilla (js/ui.js). Kohtaamisen oma muotoarvonta jää pois
     * vain silloin, kun isoisän pulma ei odota — kuten siellä.
     */
    const pulmaOdottaa = ui.game.pendingPuzzle?.();
    ui.doAction(() => ui.game.actionQuiz(pulmaOdottaa ? {} : { form: 'quiz' }));
  };
  /*
   * KYLLÄ JA EI OVAT OIKEITA NAPPEJA (omistaja 26.8.2026 ilta: "Kyllä
   * ja ei saisi olla nappeina"). Kortin muut siirtymät jäävät 24.8.
   * kevennettyyn musteviivariviin, mutta varmistus on kortin ainoa
   * peruuttamaton valinta — se saa painaa nappien verran. Asu tulee
   * lisäluokasta (css/fokusvirta.css fokusvirta-varmistusnapit).
   */
  piirraNapit(kohde, [
    nappi('Kyllä', 'primary', aloita),
    // EI ei kuluta yritystä: kortti vain sulkeutuu, ja vihreä piste jää
    // kartalle palamaan (js/fokuspiste.js).
    nappi('Ei', '', () => suljeKasin(ui)),
  ], 'fokusvirta-varmistusnapit');
  kohde.appendChild(html('p', 'fokusvirta-varoitus', KOHTAAMISEN_VAROITUS));
  piirraVihjelinkki(ui, city, kohtaaminen, kohde);
}

/* ============ PÖLLÖN SÄHKETEHTÄVÄ (pilotti: Tukholma) ===============
 *
 * Raamattu, PÖLLÖN SÄHKETEHTÄVÄ (omistaja 29.8.2026): kaupungissa voi
 * kohtaamisen SIJASTA olla sähketehtävä. Pöllö on jo selvittänyt
 * aarteen paikan ja sähköttää sen Livialle — mutta ei kerro sitä ennen
 * kuin vieras vastaa tunnussanalla, joka KAIVETAAN maan omista
 * peliaineistoista. Kyse on käänteisestä oppimisesta: peli ei kerro
 * vastausta ja kysy sitä perään, vaan antaa lehdet ja kysyy niistä.
 *
 * ── VASTAUSMUOTO ON SÄHKELOMAKE (omistajan päätös 29.8.2026) ────────
 *
 * Pelaaja täyttää VASTAUSSÄHKEEN, jossa on KAKSI AUKKOA. Kumpikin
 * aukko täytetään yhdellä kahdesta tavasta:
 *
 *   1. HAKEMISTOPOIMINTA (`tyyppi: 'hakemisto'`). Valintalista on KOKO
 *      MAAN SISÄLTÖHAKEMISTO — aakkostettu lista kaikista maan
 *      pelisisällön juttujen otsikoista — eikä kuratoitu neljän
 *      vaihtoehdon lista. Lista rakennetaan AJONAIKAISESTI pelidatasta
 *      (sisaltohakemisto alla), joten käsin ylläpidettävää kopiota ei
 *      ole eikä pääse syntymään.
 *   2. TARKKA LUKU (`tyyppi: 'luku'`). Numerosyöttö, esimerkiksi
 *      vuosiluku.
 *
 * Ruotsin hakemistossa on 31 otsikkoa, joten kahden aukon yhdistelmiä
 * on satoja: arvaaminen ei kannata, mutta lehdestä löytäneelle täyttö
 * on sekunttien työ.
 *
 * ── VÄÄRÄ YRITYS EI RIKO MITÄÄN, MUTTA MAKSAA ──────────────────────
 *
 * Yrityksiä EI rajata eikä aarre lukitu koskaan (toisin kuin
 * kohtaamisessa, jossa kaksi väärää sulkee kätkön). Sen sijaan pöllö
 * sähköttää takaisin sähketyylillä ja kertoo KUMPI aukko on pielessä
 * ("EI TÄSMÄÄ STOP TARKISTA VUOSILUKU STOP"), ja RAHAPALKKIO pienenee
 * neljänneksellä joka ohilyönnistä (lattia 0). Kahden ohilyönnin
 * jälkeen Livia vinkkaa tarkan lähteen.
 *
 * ── LENTO EI LUKITSE PELIÄ ─────────────────────────────────────────
 *
 * Oikean vastauksen jälkeen Livia lentää viemään sähkeen. Peli EI jää
 * odottamaan: kortti sulkeutuu, pelaaja jatkaa vapaasti, ja Livia
 * palaa viiveen päästä kuplalla — sen jälkeen laatta kääntyy
 * (js/game.js avaaAarreSahkeella) ja isoisän aarremerkintä aukeaa
 * täsmälleen kuten visapolussa (aarreLoytyi).
 *
 * ── MIKSI TÄMÄ ON KOHTAAMISEN RINNALLA EIKÄ SEN TILALLA KOODISSA ───
 *
 * Vihreä piste, kortti, kuplat ja aarremerkintä ovat samat molemmilla
 * poluilla; vain kortin sisältö ja loppu vaihtuvat. Siksi tässä on
 * yksi uusi piirtäjä ja kolme ehtoa, ei toista mekaniikkaa: kaupunki,
 * jolla on `sahketehtava`, saa sähkepolun, ja kaupunki, jolla on
 * `kohtaaminen`, saa entisen. Molempia ei kirjoiteta samaan
 * kaupunkiin (tests/fokusvirta.test.mjs vahtii).
 */

/** Sähkepalkkion pohja, kun vastaus osuu ensimmäisellä yrityksellä. */
export const SAHKE_PALKKIO = 200;

/** Paljonko yksi ohilyönti syö palkkiosta (omistaja: −25 % / ohilyönti). */
const SAHKE_VAHENNYS = 0.25;

/** Monenko ohilyönnin jälkeen Livia vinkkaa tarkan lähteen. */
const SAHKE_VINKKI_OHI = 2;

/**
 * Livian lennon kesto. Lento ei lukitse peliä — tämä on vain se aika,
 * jonka kupla odottaa ennen paluutaan, ja pelaaja saa sillä välin
 * tehdä mitä haluaa.
 */
const SAHKE_LENTO_MS = 6500;

/** Paluukuplan ja aarteen paljastuksen väli: kupla ehditään lukea. */
const SAHKE_PALUU_MS = 3200;

/** Palkkio ohilyöntien jälkeen — neljännes kerrallaan, lattia 0. */
export function sahkePalkkio(ohi, pohja = SAHKE_PALKKIO) {
  return Math.max(0, Math.round(pohja * (1 - SAHKE_VAHENNYS * (ohi ?? 0))));
}

/**
 * MAAN KARTTAKOHTEIDEN HAKU — js/fokuskohteet.js asettaa tämän.
 *
 * Miksi takaisinkutsu eikä import: kohdetaulu (KOHDE_MAAT) asuu
 * js/fokuskohteet.js:ssä, joka on niputusjärjestyksessä VASTA tämän
 * moduulin jälkeen (tools/build-standalone.mjs MODULES). Sama ratkaisu
 * ja sama syy kuin täkynoston piirtopinnalla (asetaNostopinta) ja
 * lehtitehtävien kuittauksella (asetaTehtavakuittaus).
 */
let kohdehakemisto = null;

export function asetaKohdehakemisto(fn) {
  kohdehakemisto = typeof fn === 'function' ? fn : null;
}

/**
 * MAAN SISÄLTÖHAKEMISTO — aakkostettu lista kaikesta, mitä maasta on
 * pelissä luettavissa.
 *
 * Lähteitä on neljä ja kaikki ovat jo hyväksyttyä pelidataa:
 *
 *   1. maan oman lehden nostot (js/packs/maa-kategoriat.js),
 *   2. maan JOKAISEN kaupungin kaupunkilehden nostot
 *      (js/packs/kulttuuri-kategoriat.js),
 *   3. maan kaupunkien fokusvirtojen omat otsikot — täkyjen otsikot,
 *      kohdenostojen nimet ja täkynostojen nimiöt (js/packs/
 *      fokusvirta-*.js),
 *   4. maan karttakohteet (js/packs/fokuskohteet-*.js), jotka pelaaja
 *      avaa kartalta — ne ovat monessa maassa sen paksuin aineisto.
 *
 * Lista ei siis ole kopio vaan NÄKYMÄ: kun lehteen kirjoitetaan uusi
 * juttu tai kartalle uusi kohde, se ilmestyy hakemistoon itsestään
 * eikä käsin ylläpidettävää kaksoiskappaletta pääse syntymään.
 *
 * KAUPUNGIT LUETAAN LAUDALTA (`pack.map.cityCountry`), joten sama
 * funktio palvelee mitä tahansa maata millä tahansa laudalla.
 */
export function sisaltohakemisto(ui, iso) {
  if (!iso) return [];
  const otsikot = new Set();
  const lisaa = (teksti) => { if (teksti) otsikot.add(teksti); };
  for (const kategoria of MAA_KATEGORIAT[iso] ?? []) {
    for (const nosto of kategoria.nostot ?? []) lisaa(nosto.otsikko);
  }
  const maat = ui?.game?.pack?.map?.cityCountry ?? {};
  for (const [cityId, maa] of Object.entries(maat)) {
    if (maa !== iso) continue;
    for (const kategoria of KULTTUURI_KATEGORIAT[cityId] ?? []) {
      for (const nosto of kategoria.nostot ?? []) lisaa(nosto.otsikko);
    }
    const virta = FOKUSVIRRAT[cityId];
    for (const taky of virta?.takyt ?? []) lisaa(taky.otsikko);
    for (const kohde of virta?.kohteet ?? []) lisaa(kohde.nimi);
    for (const nosto of virta?.takynostot ?? []) lisaa(nosto.nimio);
  }
  // Karttakohteet nimellä, koska juuri se lukee kohdekortin otsikkona
  // (js/fokuskohteet.js avaaFokuskohde) — sillä nimellä pelaaja sen
  // muistaa, ei painikkeen klikkiotsikolla.
  for (const kohde of kohdehakemisto?.(iso) ?? []) lisaa(kohde.nimi);
  return [...otsikot].sort((a, b) => a.localeCompare(b, 'fi'));
}

/** Onko aukkoon annettu vastaus oikein? */
function aukkoOsuu(aukko, arvo) {
  if (aukko.tyyppi === 'luku') return Number(arvo) === Number(aukko.oikea);
  const oikeat = aukko.oikeat ?? [aukko.oikea];
  return oikeat.some((o) => o === arvo);
}

/**
 * Pöllön paluusähke ohilyönnistä. Sanamuoto on sähkettä: mitä
 * vähemmän sanoja, sitä enemmän se kuulostaa sähkeeltä.
 */
function ohilyonninSahke(tehtava, vaarat) {
  if (tehtava.vaarinSahke && vaarat.length === tehtava.aukot.length) return tehtava.vaarinSahke;
  const sanat = vaarat.map((a) => a.sahkeSana ?? a.otsake).join(' JA ');
  return `EI TÄSMÄÄ STOP TARKISTA ${sanat} STOP`;
}

/** Istunnon ohilyöntikirjanpito: lauta:kaupunki → ohilyöntien määrä. */
function sahkeAvain(ui, city) {
  return `${ui.game.pack.id}:${city.id}`;
}

/** Sähkeen oma tekstipinta: versaalit rivit STOP-välein. */
function piirraSahke(kohde, teksti, luokka = '') {
  const laatikko = html('div', luokka ? `fokusvirta-sahke ${luokka}` : 'fokusvirta-sahke');
  for (const rivi of String(teksti).split(/\s*\n\s*/).filter(Boolean)) {
    laatikko.appendChild(html('p', 'fokusvirta-sahkerivi', rivi));
  }
  kohde.appendChild(laatikko);
  return laatikko;
}

/**
 * SÄHKEKORTTI — pöllön sähke, Livian saate ja vastauslomake.
 *
 * Kortti rakennetaan aina tilasta, joten sama kutsu palvelee kolmea
 * hetkeä: ensimmäistä avausta, ohilyönnin jälkeistä paluuta ja
 * tilannetta, jossa Livia on jo matkalla.
 */
function piirraSahketehtava(ui, city, data, kohde) {
  const tehtava = data.sahketehtava ?? {};
  const avain = sahkeAvain(ui, city);
  ui.sahkeOhi ??= new Map();
  ui.sahkeVastattu ??= new Set();
  otsikko(kohde, 'Sähke', tehtava.hahmo ?? 'Pöllöltä');

  /*
   * LIVIA ON JO MATKALLA. Vihreä piste jää palamaan lennon ajaksi (se
   * sammuu vasta laatan kääntyessä), joten pelaaja voi napauttaa sitä
   * uudelleen — silloin kortti kertoo tilanteen eikä tarjoa lomaketta
   * toista kertaa. Sama pinta palvelee myös tilannetta, jossa pelaaja
   * poistui kaupungista kesken lennon: paluunappi jatkaa siitä.
   */
  if (ui.sahkeVastattu.has(avain)) {
    piirraSahke(kohde, tehtava.lahetetty ?? 'SÄHKE LÄHETETTY STOP ODOTA VASTAUSTA STOP');
    piirraTeksti(kohde, tehtava.odotus ?? 'Livia on matkalla. Se palaa kun se palaa.');
    piirraNapit(kohde, [nappi('Selvä', 'primary', () => suljeKasin(ui))]);
    return;
  }

  piirraSahke(kohde, tehtava.sahke ?? '');
  piirraTeksti(kohde, tehtava.johdanto ?? '');

  const ohi = ui.sahkeOhi.get(avain) ?? 0;
  const lomake = html('div', 'fokusvirta-sahkelomake');
  const valinnat = new Map();
  const hakemisto = sisaltohakemisto(ui, tehtava.hakemistoMaa);

  for (const aukko of tehtava.aukot ?? []) {
    const rivi = html('div', 'fokusvirta-sahkeaukko');
    const nimio = html('label', 'fokusvirta-sahkeotsake', `${aukko.otsake} `);
    if (aukko.tyyppi === 'luku') {
      const kentta = document.createElement('input');
      kentta.type = 'number';
      kentta.className = 'fokusvirta-sahkeluku';
      kentta.inputMode = 'numeric';
      kentta.placeholder = aukko.vihje ?? '____';
      if (Number.isFinite(aukko.pienin)) kentta.min = String(aukko.pienin);
      if (Number.isFinite(aukko.suurin)) kentta.max = String(aukko.suurin);
      nimio.appendChild(kentta);
      valinnat.set(aukko, () => kentta.value.trim());
    } else {
      const kentta = document.createElement('select');
      kentta.className = 'fokusvirta-sahkevalinta';
      const tyhja = document.createElement('option');
      tyhja.value = '';
      tyhja.textContent = aukko.vihje ?? '— valitse luettelosta —';
      kentta.appendChild(tyhja);
      for (const nimi of hakemisto) {
        const vaihtoehto = document.createElement('option');
        vaihtoehto.value = nimi;
        vaihtoehto.textContent = nimi;
        kentta.appendChild(vaihtoehto);
      }
      nimio.appendChild(kentta);
      valinnat.set(aukko, () => kentta.value);
    }
    rivi.appendChild(nimio);
    lomake.appendChild(rivi);
  }
  kohde.appendChild(lomake);

  const tulos = html('p', 'fokusvirta-visa-tulos');
  kohde.appendChild(tulos);
  // Ohilyönnin jälkeen kortti muistaa, mitä pöllö vastasi viimeksi.
  if (ohi > 0 && ui.sahkeViimeSahke?.avain === avain) {
    tulos.className = 'fokusvirta-visa-tulos vaarin-tulos';
    tulos.textContent = ui.sahkeViimeSahke.teksti;
  }
  if (ohi >= SAHKE_VINKKI_OHI && tehtava.vinkki) {
    kohde.appendChild(html('p', 'fokusvirta-varmistus', tehtava.vinkki));
  }
  kohde.appendChild(html('p', 'fokusvirta-varoitus',
    `Sähkeen palkkio nyt ${sahkePalkkio(ohi, tehtava.palkkio ?? SAHKE_PALKKIO)} puntaa. `
    + 'Jokainen ohilyönti pienentää sitä — mutta aarre ei lukitu koskaan.'));

  piirraNapit(kohde, [
    nappi(tehtava.laheta ?? 'Lähetä sähke', 'primary', () => {
      const vaarat = [...valinnat.entries()]
        .filter(([aukko, lue]) => !aukkoOsuu(aukko, lue()))
        .map(([aukko]) => aukko);
      if (vaarat.length === 0) { sahkeOsui(ui, city, data); return; }
      sfx.play('wrong');
      natiiviVastaus(false);
      const uusi = ohi + 1;
      ui.sahkeOhi.set(avain, uusi);
      ui.sahkeViimeSahke = { avain, teksti: ohilyonninSahke(tehtava, vaarat) };
      piirraKortti(ui, city, data, { vaihe: 'kohtaaminen', taky: null, tehdyt: [] });
    }),
    nappi('Myöhemmin', '', () => suljeKasin(ui)),
  ], 'fokusvirta-varmistusnapit');
}

/**
 * OIKEA VASTAUS: Livia lähtee lennolle.
 *
 * Kortti vaihtuu kuittaukseksi ja sulkeutuu napista; peli EI jää
 * odottamaan. Ajastin herättää paluukuplan, ja vasta se kääntää
 * laatan.
 */
function sahkeOsui(ui, city, data) {
  const tehtava = data.sahketehtava ?? {};
  const avain = sahkeAvain(ui, city);
  ui.sahkeVastattu ??= new Set();
  ui.sahkeVastattu.add(avain);
  sfx.play('correct');
  natiiviVastaus(true);
  suljeFokusvirta(ui);
  lataaTyyli();
  piirraKehys(ui, city, data, { vaihe: 'kohtaaminen', taky: null, tehdyt: [] });
  const sisalto = ui.fokusvirtaKortti?.querySelector('.fokusvirta-sisalto');
  if (sisalto) {
    sisalto.replaceChildren();
    otsikko(sisalto, 'Sähke', tehtava.hahmo ?? 'Pöllöltä');
    piirraSahke(sisalto, tehtava.vastaussahke ?? 'VASTAUS LÄHETETTY STOP');
    piirraTeksti(sisalto, [tehtava.oikein, tehtava.fakta].filter(Boolean).join('\n\n'));
    piirraNapit(sisalto, [nappi(tehtava.lento ?? 'Anna Livian mennä', 'primary', () => {
      sfx.play('paper');
      suljeFokusvirta(ui);
    })]);
  }
  aloitaSahkelento(ui, city, data);
}

/** Ajastin, joka tuo Livian takaisin — ja aarteen mukanaan. */
function aloitaSahkelento(ui, city, data) {
  clearTimeout(ui.sahkeLentoAjastin);
  ui.sahkeLentoAjastin = setTimeout(() => {
    if (ui.dead) return;
    // Pelaaja on voinut lähteä kaupungista tai laatta on jo käännetty
    // muuta tietä: paluu odottaa silloin seuraavaa pisteen napautusta.
    if (ui.game?.cityOf?.()?.id !== city.id) return;
    if (!ui.game.tokens?.has(city.id)) return;
    const tehtava = data.sahketehtava ?? {};
    naytaPolloKupla(ui, tehtava.paluu ?? 'Perillä oltiin. Pöllö kertoi paikan.');
    clearTimeout(ui.sahkeAarreAjastin);
    ui.sahkeAarreAjastin = setTimeout(() => paljastaSahkeAarre(ui, city, data), SAHKE_PALUU_MS);
  }, SAHKE_LENTO_MS);
}

/**
 * Laatan käännös sähkeen voimalla.
 *
 * Sama kaksivaiheinen kulku kuin visan voitossa (js/visa.js
 * answerQuiz): pelin oma metodi tekee kirjanpidon, käyttöliittymä
 * näyttää paljastuksen — ja piirron lopussa aarreLoytyi avaa isoisän
 * aarremerkinnän ja Livian jälkisanan kuten aina.
 */
function paljastaSahkeAarre(ui, city, data) {
  if (ui.dead || !ui.game?.tokens?.has(city.id)) return;
  const tehtava = data.sahketehtava ?? {};
  const ohi = ui.sahkeOhi?.get(sahkeAvain(ui, city)) ?? 0;
  const palkkio = sahkePalkkio(ohi, tehtava.palkkio ?? SAHKE_PALKKIO);
  suljeFokusvirta(ui);
  ui.run(() => ui.game.avaaAarreSahkeella(city.id, palkkio), {
    after: async (tulos) => {
      if (tulos?.found) await ui.playTokenReveal(tulos.found, city.id);
    },
  });
}

/* ============ KEVYEN KULUN OMAT PINNAT (kokeilu 24.8.2026) ==========
 *
 * Kaksi kutsua, joita raskaassa virrassa ei ole:
 *
 *   1. fokusvirtaKohtaamispiste — MISSÄ paikallinen odottaa kartalla ja
 *      saako piste juuri nyt palaa. Piirron hoitaa js/fokuspiste.js.
 *   2. avaaFokusKohtaaminen — pisteen napautus avaa kohtaamiskortin,
 *      josta jatketaan tismalleen samaan laattakysymykseen kuin ennen.
 *
 * Lisäksi lehden avautuessa näytettävä pöllön vinkki (alempana).
 */

/**
 * KOHTAAMISPAIKKA KARTALLA — ja saako piste palaa juuri nyt.
 *
 * Raamattu (KEVYT KULKU -KOKEILU): *"Aarteen avaus -tehtävän suoritus
 * sytyttää kartalle PIENEN VIHREÄNÄ HEHKUVAN PISTEEN, jota klikkaamalla
 * tapaa henkilön ja yrittää aarteen avausta … Kohtaamisen paikan voi
 * sitoa muuhunkin kuin kaupunkipisteeseen (kehyskertomus)."*
 *
 * Paikka on siis oma datakenttänsä (`kohtaamispiste`, js/packs/
 * fokusvirta-ateena.js) eikä kaupungin laattakoordinaatti: Ateenassa
 * Nikos on Akropoliilla, ei torilla. Kenttä on laudoittain sama malli
 * kuin kohdenostoilla — lauta, jolta koordinaatteja ei ole, ei saa
 * pistettä (mieluummin piirtämättä kuin väärään paikkaan).
 *
 * NELJÄ EHTOA, KAIKKI PAKOLLISET:
 *   1. kevyt kulku päällä (raskaassa virrassa kohtaaminen on kortissa),
 *   2. kaupungilla on virtasisältö ja kohtaamispiste tälle laudalle,
 *   3. laatta on yhä kääntämättä (piste sammuu kun aarre on avattu),
 *   4. jokin lehden aarteen avaavista kysymyksistä on ratkaistu oikein
 *      (nimetty tehtävä TAI kulttuurivisa — omistaja 25.8.2026).
 *
 * @returns {{x:number,y:number,nimi:string}|null}
 */
export function fokusvirtaKohtaamispiste(ui, city) {
  if (!fokusvirtaKohtaaminenPisteessa(ui, city)) return null;
  if (!fokusAarreAvattu(ui, city)) return null;
  const data = fokusvirtaSisalto(ui, city);
  const paikka = data.kohtaamispiste?.laudat?.[ui.game?.pack?.id];
  /*
   * TEKO KERTOO, MITÄ PISTEEN TAKANA ON. Ruudunlukija sanoo pisteestä
   * "tapaa paikallinen" — sähkekaupungissa (Tukholma) sen takana ei
   * ole ketään tavattavaa vaan pöllön sähke, ja lappu kertoo sen.
   */
  return {
    x: paikka.x,
    y: paikka.y,
    nimi: data.kohtaamispiste?.nimi ?? city.name,
    teko: data.sahketehtava ? 'lue pöllön sähke' : 'tapaa paikallinen',
  };
}

/**
 * OMISTAAKO VIHREÄ PISTE TÄMÄN KAUPUNGIN KOHTAAMISEN?
 *
 * Raamattu (KEVYT KULKU -KOKEILU): *"kaupunkilehden ALIN KOHTA (josta
 * pääsi tapaamaan henkilön) POIS"*. Kun kohtaaminen tavataan kartalta,
 * lehden alanappi olisi toinen ovi samaan huoneeseen — ja se ohittaisi
 * koko kokeilun: AARTEEN AVAUS -tehtävää ei tarvitsisi tehdä lainkaan.
 * Lehden alanappi luetaan siksi tästä (js/ui.js tehtavaNapinTila).
 *
 * UMPIKUJAN ESTO. Lehden kysymykseen vastataan kerran, joten VÄÄRIN
 * vastannut ei voi enää sytyttää pistettä siitä kysymyksestä. Vasta kun
 * KAIKKI kaupungin aarteen avaavat kysymykset on käytetty eikä yksikään
 * osunut (js/fokustehtavat.js fokusAarreVastattu), lehden alanappi
 * palaa — jottei yksi väärä vastaus jättäisi aarretta ikuisesti
 * tavoittamattomiin. Sama oppi kuin raskaan virran täkyportilla (ks.
 * fokusvirtaSiirto, "MIKSI 'visa' MERKITSEE TÄYN TEHDYKSI RIIPPUMATTA
 * VASTAUKSESTA").
 */
export function fokusvirtaKohtaaminenPisteessa(ui, city) {
  if (FOKUSVIRTA_KORTIT) return false;
  const data = fokusvirtaSisalto(ui, city);
  // Sähketehtävä kelpaa kohtaamisen sijaan (ks. PÖLLÖN SÄHKETEHTÄVÄ).
  if (!data?.kohtaaminen && !data?.sahketehtava) return false;
  // Laatta käännetty → kohtaaminen on ohi, piste sammuu.
  if (!fokusvirtaLukitseeLehden(ui, city)) return false;
  const paikka = data.kohtaamispiste?.laudat?.[ui.game?.pack?.id];
  if (!Number.isFinite(paikka?.x) || !Number.isFinite(paikka?.y)) return false;
  return fokusAarreAvattu(ui, city) || !fokusAarreVastattu(ui, city);
}

/**
 * Vihreän pisteen napautus: kohtaamiskortti kartan päälle.
 *
 * Sama kortti ja sama sisältö kuin raskaan virran kuudennessa vaiheessa
 * (piirraKohtaaminen) — vain reitti sinne on toinen. Kortti piirretään
 * suoraan vaiheella, koska kevyessä kulussa virran tilakonetta ei
 * ajeta lainkaan.
 */
export function avaaFokusKohtaaminen(ui, city) {
  if (typeof document === 'undefined') return false;
  const data = fokusvirtaSisalto(ui, city);
  // Sähketehtävä kelpaa kohtaamisen sijaan (ks. PÖLLÖN SÄHKETEHTÄVÄ).
  if (!data?.kohtaaminen && !data?.sahketehtava) return false;
  lataaTyyli();
  piirraKortti(ui, city, data, { vaihe: 'kohtaaminen', taky: null, tehdyt: [] });
  return true;
}

/* ---------- pöllön vinkki lehden avautuessa ---------- */

/**
 * MAHDOLLISIMMAN LYHYT VINKKI (Raamattu, KEVYT KULKU -KOKEILU: *"kun
 * kaupunkilehti AUKEAA, pöllö vinkkaa MAHDOLLISIMMAN LYHYESTI
 * minitehtävästä (vinkissä ruksi 'älä näytä jatkossa')"*).
 *
 * Yksi lause, ei otsikkoa, ei jatkonappia: kupla katoaa napautuksesta
 * kuten pöllön kuplat aina. Ruksi kirjoittaa laitteen oman muistiavaimen
 * (js/ui-apurit.js lehtivinkkiPiilotettu) — sama try/catch-kaava kuin
 * kehittäjätilalla ja fokusmoodilla, eikä riviäkään pelitallennukseen:
 * tämä on lukijan asetus, ei pelitilanne.
 *
 * SANAMUOTO ON OMISTAJAN (26.8.2026) — ohjaava kehotus voittaa tässä
 * pöllön kuivan toteavuuden, koska kyse on opastuksesta eikä
 * repliikistä. Silminnäkijäheittoa EI ole tässä: sen kiintiö (kerran
 * per maa) menee aarrekuittauksiin, jotka ovat isompia hetkiä.
 */
const LEHTIVINKKI_TEKSTI = 'Etsi minitehtävä lehdestä ja ratkaise se, '
  + 'niin saat vinkin aarteen paikasta kartalla.';
/* Kupla tulee vasta hengähdyksen jälkeen (omistaja 26.8.2026). */
const LEHTIVINKKI_VIIVE_MS = 1400;

/** Vinkki näkyy kerran per saapuminen; avain on sama kuin virralla. */
function vinkkiAvain(ui, city) {
  return `${ui.game.pack.id}:${city.id}`;
}

/**
 * YHDEN LAUSEEN KUPLA PÖLLÖNAPISTA — kevyen kulun oma pikkupinta.
 *
 * Sama kupla palvelee kahta hetkeä: lehden avautuessa näytettävää
 * vinkkiä (`ruksi: true`, "Älä näytä jatkossa") ja tehtävän ratkettua
 * tulevaa kuittausta (`ruksi: false`). Kuittaus on kertaluontoinen
 * palaute pelaajan omasta teosta, joten sitä ei saa vaientaa asetuksella
 * — muuten palkinto jäisi kertomatta juuri niiltä, jotka ruksin joskus
 * painoivat.
 *
 * @returns {boolean} näkyikö kupla
 */
function naytaPolloKupla(ui, teksti, { ruksi: ruksillinen = false } = {}) {
  const nappi = polloNappi();
  // Ilman kelluvaa pöllöä kuplalla ei ole kärkeä eikä paikkaa; teksti
  // jää silloin väliin — se on vihje, ei pelin portti.
  if (!nappi) return false;
  const tyyliKesken = lataaTyyli();
  suljeFokusvirta(ui);

  const koti = nappi.parentNode ?? document.body;
  const kupla = html('div', 'fokusvirta-kupla fokusvirta-vinkki');
  kupla.setAttribute('role', 'note');
  kupla.setAttribute('aria-label', 'Livia vinkkaa');
  kupla.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('label, input')) return;
    // Sama nielu kuin ison kuplan sulussa: napautus loppuu vinkkiin
    // eikä valu kartalle sen alta.
    nielaiseSulkevaNapautus(tapahtuma);
    sfx.play('paper');
    suljeFokusvirta(ui);
  });

  const sisalto = html('div', 'fokusvirta-sisalto');
  sisalto.appendChild(html('p', 'fokusvirta-vinkkiteksti', teksti));
  if (ruksillinen) {
    const rivi = html('label', 'fokusvirta-vinkkiruksi');
    const ruksi = document.createElement('input');
    ruksi.type = 'checkbox';
    ruksi.addEventListener('change', () => {
      piilotaLehtivinkki(ruksi.checked);
      if (ruksi.checked) suljeFokusvirta(ui);
    });
    rivi.append(ruksi, html('span', '', 'Älä näytä jatkossa'));
    sisalto.appendChild(rivi);
  }
  kupla.appendChild(sisalto);
  koti.appendChild(kupla);
  ui.fokusvirtaKortti = kupla;

  const asemoi = () => {
    if (kupla.isConnected) asetaKuplanPaikka(kupla, nappi);
  };
  asemoi();
  globalThis.requestAnimationFrame?.(asemoi);
  setTimeout(asemoi, 200);
  tyyliKesken?.addEventListener('load', asemoi, { once: true });
  ui.fokusvirtaAsemointi = asemoi;
  globalThis.addEventListener?.('resize', asemoi);
  globalThis.addEventListener?.('orientationchange', asemoi);
  /*
   * TÄKYNOSTO VÄISTYY KUPLAN TIELTÄ. Nosto nousee samaan alalaitaan
   * (js/fokusnosto.js), ja se voi olla ruudulla jo ennen kuplaa —
   * aarteen löytyessä molemmat heräävät samasta hetkestä, mutta
   * kirjoituskone pidättelee kuplaa merkinnän ajan. Kupla on tärkeämpi:
   * se on vastaus pelaajan omaan tekoon. Nosto palaa, kun kupla suljetaan
   * (suljeFokusvirta).
   */
  nostoPinta?.(ui);
  return true;
}

export function fokusvirtaLehtivinkki(ui, city) {
  if (FOKUSVIRTA_KORTIT || typeof document === 'undefined') return false;
  if (!city || !fokusvirtaSisalto(ui, city)) return false;
  // Aarre jo löytynyt: lehti on vapaata tutkintaa eikä vinkattavaa ole.
  if (!fokusvirtaLukitseeLehden(ui, city)) return false;
  if (lehtivinkkiPiilotettu()) return false;
  ui.fokusvinkkiNaytetty ??= new Set();
  const avain = vinkkiAvain(ui, city);
  if (ui.fokusvinkkiNaytetty.has(avain)) return false;
  if (!polloNappi()) return false;
  ui.fokusvinkkiNaytetty.add(avain);
  clearTimeout(ui.fokusvinkkiAjastin);
  ui.fokusvinkkiAjastin = setTimeout(() => {
    // Pöllö on voinut kadota (lehti kiinni, näkymä vaihtui) —
    // myöhästynyt kupla ilman kärkeä jää silloin näyttämättä.
    if (!ui.dead && polloNappi()) {
      naytaPolloKupla(ui, LEHTIVINKKI_TEKSTI, { ruksi: true });
    }
  }, LEHTIVINKKI_VIIVE_MS);
  return true;
}

/**
 * PÖLLÖN KUITTAUS LEHDEN KYSYMYKSESTÄ (omistajan pelitesti 25.8.2026):
 * oikea vastaus palkitaan lehden ULKOPUOLELLA — aarteen jälki syttyy
 * kartalle ja juliste menee matkalaukkuun — joten pöllö kertoo sen
 * lyhyesti.
 *
 * SAMA KUPLA KAIKISTA LEHDEN KYSYMYKSISTÄ (omistaja 25.8.2026): sivujen
 * nimetyistä tehtävistä ja kulttuurivisasta, ja riippumatta siitä
 * avasiko vastaus aarteen vai toiko se pelkkää rahaa. Sanat tulevat
 * js/fokustehtavat.js:stä, joka tuntee kaupungin kaikki kysymykset ja
 * niiden kirjanpidon; tämä on vain pinta. Kytkentä on takaisinkutsu
 * (asetaTehtavakuittaus alempana) eikä import, koska niputusjärjestys
 * kulkee fokustehtävistä tänne päin.
 */
export function fokusvirtaKuittaus(ui, teksti) {
  if (FOKUSVIRTA_KORTIT || typeof document === 'undefined') return false;
  if (!teksti) return false;
  /*
   * Kuittaus tulee vasta muutaman sekunnin päästä (omistaja
   * 26.8.2026): pelaaja katsoo vielä vastaustaan, ja heti lävähtävä
   * kupla söi sen hetken.
   */
  clearTimeout(ui.fokusKuittausAjastin);
  ui.fokusKuittausAjastin = setTimeout(() => {
    if (!ui.dead && polloNappi()) naytaPolloKupla(ui, teksti);
  }, 2500);
  return true;
}

/*
 * Kytkentä heti moduulin latautuessa: js/ui.js tuo tämän moduulin
 * staattisesti, joten pinta on paikallaan ennen kuin lehteä ehtii avata.
 */
asetaTehtavakuittaus(fokusvirtaKuittaus);

/* ---------- täkynoston piirtopinta ---------- */

/**
 * TÄKYNOSTON PIIRTOPINTA — js/fokusnosto.js asettaa tämän.
 *
 * Miksi takaisinkutsu eikä import: täkynosto avaa kartan kohteiden
 * tietoruudun (js/fokuskohteet.js), joka on niputusjärjestyksessä VASTA
 * tämän moduulin jälkeen (tools/build-standalone.mjs MODULES). Suora
 * tuonti tästä sinne kääntäisi järjestyksen väärin päin; sama ratkaisu
 * ja sama syy kuin lehtitehtävien kuittauksella (asetaTehtavakuittaus
 * yllä), vain vastakkaiseen suuntaan.
 *
 * MIKSI TÄMÄ KYTKENTÄKOHTA. Täkynosto nousee kartalta silloin kun maan
 * aarre on löytynyt (Raamattu, KEVYT KULKU -KOKEILU), eli tismalleen
 * samasta hetkestä kuin pöllön aarrekuittaus — ja se on tässä
 * tiedostossa (aarreLoytyi). Yksi renderin kytkentäkohta riittää siis
 * molemmille, eikä js/ui.js:ään tarvita uutta riviä.
 */
let nostoPinta = null;

export function asetaNostopinta(fn) {
  nostoPinta = typeof fn === 'function' ? fn : null;
}

/* ---------- pöllön kuittaus aarteen löydyttyä ---------- */

/**
 * MAAN AARRE ON LÖYTYNYT (omistajan tarkennus 25.8.2026).
 *
 * Tämä on ERI HETKI kuin lehden AARTEEN AVAUS -tehtävän ratkeaminen:
 * silloin kartalle syttyi vihreä piste, nyt kohtaaminen on käyty,
 * laattakysymykseen on vastattu ja aarre on auki. Samalla aukeaa
 * matkustaminen (Liiku-nappi ilmestyy vasta aarteen löydyttyä), eikä
 * napin ilmestyminen yksin kerro pelaajalle mitään — pöllö kertoo.
 *
 * Pöllö puhuu nykypäivästä eikä 1873:sta, ja repliikki on lyhyt.
 *
 * KARAKTÄÄRI (Raamattu, PÖLLÖN KARAKTÄÄRI; repliikki Fablen kirjoittama
 * ja omistajan hyväksymä 25.8.2026). Vanha versio ("Aarre on sinun!")
 * oli huudahdus ja onnittelu — kaksi asiaa, joita reportteri ei tee.
 * Tässä on sen sijaan maan AINOA silminnäkijäheitto: pöllö tiesi
 * paikan koko ajan eikä sanonut mitään.
 */
const AARREKUITTAUS_TEKSTI = 'Tiesin paikan koko ajan, mutta vaikenin kohteliaisuudesta. '
  + 'Seuraava kaupunki odottaa — tai jää tutkimaan, kartalla riittää katsottavaa.';

/** Uusi yritys tämän välein, kun ruutu on vielä varattu. */
const AARREKUITTAUS_YRITYS_MS = 700;

/**
 * Yritysten katto. Kupla on iloinen jälkisana, ei pelin portti: jos
 * pöllönappia ei näy puoleen minuuttiin (voittolappu, uusi peli,
 * pelaaja lähti valikkoon), asia saa jäädä eikä ajastin jää pyörimään.
 */
const AARREKUITTAUS_YRITYKSIA = 40;

/**
 * Kupla vasta kun ruutu on vapaa.
 *
 * Löytöhetkellä päällimmäisenä on aarteen oma lappu (`<dialog>`, selaimen
 * top layer), jonka päälle tavallinen kupla ei piirry. Yritystä siis
 * toistetaan, kunnes lappu on suljettu — silloin pelaaja on lukenut
 * löytönsä ja on juuri oikea hetki kertoa, mitä seuraavaksi voi tehdä.
 */
function kerroAarteesta(ui, avain, yritys) {
  clearTimeout(ui.fokusaarreAjastin);
  if (ui.dead || typeof document === 'undefined') return;
  const vapaa = !document.querySelector('dialog[open]');
  if (vapaa && naytaPolloKupla(ui, AARREKUITTAUS_TEKSTI)) {
    ui.fokusaarreKerrottu.add(avain);
    return;
  }
  if (yritys >= AARREKUITTAUS_YRITYKSIA) return;
  ui.fokusaarreAjastin = setTimeout(
    () => kerroAarteesta(ui, avain, yritys + 1), AARREKUITTAUS_YRITYS_MS,
  );
}

/**
 * KYTKENTÄ RENDERIIN (fokusvirtaSaapuminen). Löytö luetaan laatasta:
 * niin kauan kuin laatta on kartalla, aarre on avaamatta.
 *
 * Kaksi joukkoa, jotta kuittaus tulee VAIN oikeasta hetkestä:
 * `fokusaarreOdottaa` merkitsee kaupungit, joiden laatan tämä istunto on
 * nähnyt kääntämättömänä, ja `fokusaarreKerrottu` ne, joista on jo
 * kerrottu. Vanhaan tallennukseen palaava pelaaja ei siis saa kuittausta
 * aarteista, jotka hän löysi eilen — laatta oli jo poissa, kun istunto
 * alkoi.
 *
 * ── EI KYTKIMEN TAKANA (korjaus 29.8.2026, kortit päälle) ──────────
 *
 * Tässä luki ennen `if (FOKUSVIRTA_KORTIT) return`, koska aarremerkintä
 * ja aarrekuittaus kirjoitettiin kevyttä kulkua varten. Kortit päälle
 * -pelitestissä se olisi vienyt KAIKISTA kahdeksastatoista
 * fokuskaupungista isoisän aarremerkinnän ja Livian jälkisanan — ja
 * samalla katkaissut sähketehtävän dokumentoidun lopun, joka nojaa
 * juuri tähän kutsuun (ks. PÖLLÖN SÄHKETEHTÄVÄ, "LENTO EI LUKITSE
 * PELIÄ").
 *
 * Mitta on laatta eikä virran vaihe, joten kutsu käyttäytyy
 * kummallakin virralla samoin: löytöhetki on se, jona laatta katoaa
 * kartalta. Aarremerkintä on lisäksi samaa kirjaa kuin saapumismerkintä
 * — ja se on nimenomaisesti se osa, jonka lipun oli määrä säilyttää.
 */
function aarreLoytyi(ui) {
  if (typeof document === 'undefined') return;
  const city = ui?.game?.cityOf?.();
  // Aarremerkintä kuuluu sille kaupungille, jossa aarre löytyi: kun
  // pelaaja matkustaa eteenpäin, matkakirjakortti palaa omilleen.
  if (ui?.fokusaarreMerkinta
    && (!city || ui.fokusaarreMerkinta.avain !== `${ui.game.pack.id}:${city.id}`)) {
    ui.fokusaarreMerkinta = null;
  }
  if (!city || !fokusvirtaSisalto(ui, city)) return;
  ui.fokusaarreOdottaa ??= new Set();
  ui.fokusaarreKerrottu ??= new Set();
  const avain = `${ui.game.pack.id}:${city.id}`;
  if (ui.game.tokens?.has(city.id)) {
    ui.fokusaarreOdottaa.add(avain);
    return;
  }
  if (!ui.fokusaarreOdottaa.has(avain) || ui.fokusaarreKerrottu.has(avain)) return;
  // Merkintä pois heti: yritys on jo käynnissä eikä joka piirto saa
  // aloittaa omaa ajastintaan.
  ui.fokusaarreOdottaa.delete(avain);
  // Isoisä ensin, pöllö perästä — jos laudalla on aarremerkintä.
  if (avaaAarremerkinta(ui, city, avain)) return;
  kerroAarteesta(ui, avain, 0);
}

/* ---------- isoisän aarremerkintä matkakirjakorttiin ---------- */

/*
 * AARREMERKINTÄ (omistaja 25.8.2026).
 *
 * Kun MAAN AARRE LÖYTYY, matkakirjakorttiin aukeaa isoisän merkintä
 * ENNEN pöllön kuittausta. Kulku on tismalleen sama kuin kaupunkiin
 * saavuttaessa — vain sivu on eri:
 *
 *   1. aarreLoytyi huomaa laatan kääntyneen ja nostaa lipun
 *      (ui.fokusaarreMerkinta) sekä pyytää kortin piirron heti;
 *   2. js/ui.js renderFact kysyy sisällön fokusvirtaMatkakirjalta, joka
 *      antaa aarremerkinnän saapumismerkinnän sijaan;
 *   3. kirjoituskone lyö merkinnän loppuun ja kutsuu
 *      fokusvirtaMerkintaLuettua, joka päästää pöllön ääneen tauon
 *      jälkeen (aarremerkintaLuettu → kerroAarteesta).
 *
 * MIKSI SAMA POLKU EIKÄ UUSI KORTTI. Raamatun ASETTELU-kohta on
 * yksiselitteinen: isoisän teksti näytetään PERINTEISESSÄ
 * matkakirjakortissa ylävasemmalla. Uusi kortti olisi toinen matkakirja
 * ruudulla — juuri se vika, jonka v1093 korjasi. Näin ui.js:ään ei
 * myöskään tarvita riviäkään uutta: renderFact kysyy jo nyt tältä
 * moduulilta, mitä korttiin kirjoitetaan.
 *
 * YLEINEN MEKANISMI, EI ATEENAN ERIKOISTAPAUS. Kenttä on
 * `aarremerkinta` kaupungin fokusvirtadatassa (js/packs/
 * fokusvirta-ateena.js), ja se saa olla joko pelkkä merkkijono tai olio
 * (`teksti`, `paikkarivi`, `kuva`). Lauta, jolla kenttää ei ole, ei saa
 * merkintää eikä huomaa mitään: pöllö kuittaa suoraan kuten ennenkin.
 */

/**
 * Nostaa aarremerkinnän lipun ja pyytää kortin piirron.
 *
 * @returns {boolean} tuliko merkintä — false tarkoittaa, että pöllö saa
 *   puhua heti, koska laudalla ei ole aarremerkintää.
 */
function avaaAarremerkinta(ui, city, avain) {
  if (!aarremerkinnanTeksti(ui, city)) return false;
  ui.fokusaarreMerkinta = { avain, kuitattu: false };
  /*
   * KORTTI KIRJOITETAAN HETI. renderFact on jo ajettu tässä piirrossa
   * (aarreLoytyi kutsutaan renderin lopussa), joten ilman tätä kutsua
   * merkintä odottaisi seuraavaa piirtoa — ja aarteen löytöhetkellä
   * pelaaja katsoo ruutua juuri nyt.
   */
  ui.renderFact?.();
  /*
   * VARMISTUS, JOTTEI PÖLLÖ JÄÄ ODOTTAMAAN IKUISESTI. Kirjoituskoneen
   * loppukutsu on normaali polku, mutta se jää tulematta, jos kortti oli
   * jo samassa merkinnässä (factKey osuu) tai jos renderFact ei jostain
   * syystä päädy tähän haaraan. Kuittaus on aarteen jälkisana eikä pelin
   * portti, mutta se ei saa kadota kokonaan.
   */
  clearTimeout(ui.fokusaarreVarmistus);
  ui.fokusaarreVarmistus = setTimeout(() => {
    if (ui.dead) return;
    const lippu = ui.fokusaarreMerkinta;
    if (lippu?.avain !== avain || lippu.kuitattu) return;
    lippu.kuitattu = true;
    kerroAarteesta(ui, avain, 0);
  }, AARREMERKINNAN_VARMISTUS_MS);
  return true;
}

/**
 * Kuinka kauan varmistus odottaa kirjoituskonetta.
 *
 * Merkintä on muutama virke, ja kirjoituskone lyö sen läpi
 * sanaväleineen ja välimerkkitaukoineen selvästi tätä nopeammin
 * (js/ui.js typeText). Luku on siis viimeinen verkko eikä ajastus.
 */
const AARREMERKINNAN_VARMISTUS_MS = 20000;

/** Laudan aarremerkintä normalisoituna olioksi, tai null. */
function aarremerkinnanTeksti(ui, city) {
  const kentta = fokusvirtaSisalto(ui, city)?.aarremerkinta;
  const merkinta = typeof kentta === 'string' ? { teksti: kentta } : kentta;
  return merkinta?.teksti ? merkinta : null;
}

/**
 * KYTKENTÄ fokusvirtaMatkakirjaan: aarremerkinnän sisältö korttiin.
 *
 * Paikkarivi on oletuksena "Isoisän merkintä · Ateena" — merkintä ei ole
 * saapumispäivän havainto vaan myöhempi sivu, joten sillä ei ole
 * ilmanpuntaria eikä päivämäärää. Lauta saa silti antaa oman
 * paikkarivinsä, jos merkintä ansaitsee sen.
 */
export function fokusvirtaAarremerkinta(ui, city) {
  const lippu = ui?.fokusaarreMerkinta;
  if (!lippu || !city || !ui.game?.pack) return null;
  if (lippu.avain !== `${ui.game.pack.id}:${city.id}`) return null;
  const merkinta = aarremerkinnanTeksti(ui, city);
  if (!merkinta) return null;
  return {
    avain: `fokusaarre:${lippu.avain}`,
    paikkarivi: merkinta.paikkarivi ?? `Isoisän merkintä · ${city.name}`,
    teksti: merkinta.teksti,
    kuva: merkinta.kuva ?? null,
  };
}

/**
 * Kirjoituskone sai aarremerkinnän loppuun: pöllö saa vuoron.
 *
 * @returns {boolean} oliko kortissa aarremerkintä — true pysäyttää
 *   fokusvirtaMerkintaLuetun, jottei sama kutsu yritä myös raskaan
 *   virran vaihesiirtoa.
 */
function aarremerkintaLuettu(ui, city) {
  const lippu = ui?.fokusaarreMerkinta;
  if (!lippu || !city || !ui.game?.pack) return false;
  if (lippu.avain !== `${ui.game.pack.id}:${city.id}`) return false;
  if (!aarremerkinnanTeksti(ui, city)) return false;
  // Kortti voi piirtyä uudelleen; kuittaus tulee silti kerran.
  if (lippu.kuitattu) return true;
  lippu.kuitattu = true;
  clearTimeout(ui.fokusaarreVarmistus);
  clearTimeout(ui.fokusaarreAjastin);
  ui.fokusaarreAjastin = setTimeout(() => {
    if (ui.dead) return;
    kerroAarteesta(ui, lippu.avain, 0);
  }, MERKINNAN_TAUKO_MS);
  return true;
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
  // Kevyt kulku: viuhkaa ei kerry, koska sen ruokkivia vaiheita ei ole
  // (ks. lipun perustelu tiedoston alussa).
  if (!FOKUSVIRTA_KORTIT) return [];
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
  // Sama kuin kuvaviuhkalla: kohdenosto avataan valintakuplasta, jota
  // kevyessä kulussa ei ole.
  if (!FOKUSVIRTA_KORTIT) return [];
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
    const vara = kuvanVara(kuva, 320);
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
