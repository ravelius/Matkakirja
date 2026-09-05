/*
 * ELÄINTÄKY — maan eläin kartalla, kortti ja pieni punlöytö.
 *
 * Omistajan tilaus 29.8.2026: *"Eläintäky kartalle — eläin ilmestyy
 * maan kartalle täkynä: klikkaus avaa kuvan + lyhyen faktatekstin +
 * pienen puntapalkkion."*
 *
 * ── MIKSI OMA KEVYT KONEISTO ───────────────────────────────────────
 *
 * Pelissä on jo kaksi täkykoneistoa, eikä kumpikaan sovi tähän:
 *
 *   FOKUSVIRRAN TÄKY (js/fokusvirta.js) on yhden kaupungin
 *   annostelukulun vaihe. Se vaatii fokusvirtarivin
 *   (js/packs/fokusvirrat.js), minivisan ja 50 punnan palkkion.
 *   Eläintäkyjä on 53 MAASSA, joista useimmilla ei ole fokuskaupunkia
 *   lainkaan.
 *
 *   TÄKYNOSTO (js/fokusnosto.js) on maan pooli, jonka pisteet
 *   heräävät aarteen löytymisen jälkeen ja tuikkivat yksi kerrallaan.
 *   Se on huomion ohjausta pelin kulun sisällä; eläin on maan
 *   pysyvä merkintä kartalla, ei vuoro kulussa.
 *
 * Tämä moduuli on siksi kolmas ja kevein: yksi merkki maata kohti,
 * yksi kortti, yksi 20 punnan löytö. Ei porttia, ei visaa, ei ketjua.
 *
 * ── MERKKI ON KARTAN OMAA KIELTÄ ───────────────────────────────────
 *
 * Merkki ei ole uusi symboli vaan symbolikirjaston `elain`-kategorian
 * VIIVAMERKKI NIMIÖINEEN (js/fokusnosto-symbolit.js
 * piirraNostosymKartalle) — täsmälleen sama merkki ja sama mittakaava
 * kuin kartan muilla kohdemerkeillä (js/fokuskohteet.js). Omistajan
 * testikierros 30.8.2026 (iPad): *"Pöllöt aivan liian isoja … se ei
 * noudata uutta yksinkertaista merkkilinjaa"* — iso kaiverrettu
 * pöllöglyyfi (piirraNostosymboli) jäi kortin ylärivin tunnukseksi,
 * jonne se kuuluu, ja kartalla on pieni viivapöllö ja eläimen nimi.
 * Kortti taas käyttää täkynoston lunastuskortin luokkia
 * (css/fokusnosto.css .fokusnosto-*), koska se on täsmälleen sama
 * kortti: ylärivi, otsikko, kuva, teksti. Uutta UI-kieltä ei keksitä.
 *
 * ── KOLME SÄÄNTÖÄ, JOTKA ON PERITTY MUILTA KARTAN KERROKSILTA ──────
 *
 * 1. OMA KERROS SVG:N JUURESSA (ui.svg:n suora lapsi). Kiertävän laudan
 *    <use>-kopiosta ei voi napauttaa mitään: tapahtuma osuisi
 *    <use>-elementtiin eikä sen sisältöön. Merkki piirretään siksi
 *    oikeana elementtinä jokaiseen kiertokohtaan (ui.kiertoKohdat) —
 *    sama ratkaisu kuin kohderenkailla, fokuskohteilla ja vihreällä
 *    pisteellä (js/fokuspiste.js).
 * 2. EI SUODATTIMIA (js/fokuskartta.js sääntö 3, tests/rules.test.mjs):
 *    suodatettu kerros palaa iOS:n taustalta tyhjänä. Lunastettu merkki
 *    haalistuu siksi `opacity`illa eikä harmaasuodattimella.
 * 3. KARTAN MITTAKAAVA, EI RUUDUN. Ankkuriryhmä on laudan
 *    koordinaateissa ja skaalataan js/ui.js fokusMerkkiSkaalaKartalle
 *    -vakiolla, kuten kaikki muutkin kartan merkit. Osuma-alueen r = 22
 *    on 44 px läpimitta perustasolla — sama sormisääntö kuin vihreällä
 *    pisteellä.
 *
 * ── MERKKI EI TÄYTÄ YLEISKUVAA ─────────────────────────────────────
 *
 * Maailmankartan yleiskuvassa Eurooppa on peukalonkynnen kokoinen, ja
 * 53 merkkiä siinä olisi merkkien ryteikkö eikä kartta. Merkit näkyvät
 * siksi vasta, kun näkymä on kaventunut ELAINTAKY_NAKYY_ASTETTA
 * pituusasteeseen — käytännössä siihen, että maanosa täyttää ruudun.
 * Raja on ASTEINA eikä lautayksikköinä, koska maailmankartta on 12 000
 * ja Euroopan lauta 1 000 yksikköä leveä: sama luku tarkoittaisi
 * laudoilla eri asiaa.
 *
 * ── LÖYTÖ ON MAAN, EI LAUDAN ───────────────────────────────────────
 *
 * Palkkio maksetaan kerran per maa (js/game.js actionElaintaky) ja se
 * on PELITILANNETTA eikä laitteen muisti: löydetty eläin kulkee
 * tallennuksen mukana, toisin kuin luetut täkynostot, jotka ovat
 * localStoragessa. Syy on rahassa — punnat ovat pelitilaa, joten myös
 * niiden lähde on.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * ELAINTAKY_/elaintaky-etuliitteellä.
 */
import { taytaLahderivi } from './tekijakortti.js';
import { html, jaaKappaleiksi, nielaiseSulkevaNapautus, TOAST_MS } from './ui-apurit.js';
import { el, maare } from './mapart.js';
import {
  avaaKohdeSuurennos, elainmerkinNapautusLuovutettu, maanLadontaEsteet, suljeKohdeSuurennos,
} from './fokuskohteet.js';
import { nostosymKortinYlarivi, piirraNostosymKartalle } from './fokusnosto-symbolit.js';
import { piirraKarttavalo } from './karttavalot.js';
import { projisoiLaudalle } from './fokusmitat.js';
import { nostoOnPoltettu } from './laattapyramidi.js';
import {
  NOSTOLADONTA_S, nostoladontaKattoPorras, nostoladontaTiiviste,
} from './nostoladonta.js';
import { elaintakyKarttarivit, elaintakyNimioKylki } from './elaintaky-rivit.js';
import { ELAINTAKYT, elaintakynKuvat } from './packs/elaintakyt.js';
import { assetOsoite } from './media.js';
import { sfx } from './sound.js';

/*
 * LÖYTÖPALKKIO 20 PUNTAA (omistaja: *"pienen puntapalkkion"*).
 *
 * Fokusvirran täky maksaa 50 (js/fokusvirta.js TAKY_PALKKIO) ja vaatii
 * minivisan; pieni paikallisaarre on 100–250. Eläintäky on yksi kuva ja
 * yksi kappale ilman kysymystä, joten se asettuu näiden alle — löytö,
 * ei suoritus.
 */
export const ELAINTAKY_PALKKIO = 20;

/** Osuma-alueen säde ruudun pikseleinä (44 px läpimitta, sormen mitta). */
const ELAINTAKY_OSUMA_R = 22;

/*
 * MERKKI ON KOHDEMERKIN KOKOINEN (omistaja 30.8.2026: *"Pöllöt aivan
 * liian isoja … ei noudata uutta yksinkertaista merkkilinjaa"*).
 *
 * Sama kutistus kuin kartan kohdemerkeillä (js/fokuskohteet.js
 * KOHDE_SYMBOLI_SKAALA = 11 / 21): kirjaston viivamerkki on
 * NOSTOSYM_MINI_R:n levyinen, ja tämä kerroin vie sen poltetun
 * vuorikolmion mittaan (~7 px lehden perustasolla). Molemmat kerrokset
 * skaalataan samalla fokusMerkkiSkaalaKartalle-vakiolla, joten sama
 * kerroin tarkoittaa täsmälleen samaa ruutumittaa — eläintäky ei ole
 * kartalla isompi eikä pienempi kuin muut kohdemerkit.
 *
 * KERROIN YKSIN EI RIITÄ SYVÄSSÄ ZOOMISSA (2.9.2026): kohdemerkillä on
 * lisäksi RUUTUKATTO, ja ilman sitä sama kerroin antaa eri ruutukoon.
 * Katto on elaintakyAsetaMittakaavassa, ja sen perustelu ja mitat ovat
 * siellä.
 */
const ELAINTAKY_SYMBOLI_SKAALA = 11 / 21;

/*
 * Aihevalon koko merkin mittakaavassa (js/karttavalot.js): sama 0,6
 * kuin kohdemerkeillä (js/fokuskohteet.js KOHDE_VALO_KOKO) ja samasta
 * syystä — kirjaston symboli on kutistettu, joten valon on
 * kutistuttava sen mukana tai täplästä tulisi lautanen.
 */
const ELAINTAKY_VALO_KOKO = 0.6;

/*
 * Kuinka kapea näkymän on oltava, ennen kuin merkit ilmestyvät —
 * pituusasteina (ks. tiedoston alku, "MERKKI EI TÄYTÄ YLEISKUVAA").
 *
 * 90° on mitattu luku eikä arvaus (29.8.2026, 1100 px leveä ruutu):
 *
 *   maailmankartan yleiskuva      349°  → merkit piilossa
 *   maailmankartta neljä porrasta  70°  → merkit näkyvissä
 *   Euroopan laudan yleiskuva      80°  → merkit näkyvissä
 *
 * Raja kulkee siis siitä, mahtuuko maanosa ruudulle: Euroopan lauta ei
 * piilota merkkejä koskaan (koko lauta on 52° leveä), maailmankartta
 * piilottaa ne yleiskuvassa ja palauttaa ne, kun Eurooppa täyttää
 * ruudun. Tiukempi raja (60°) piilotti merkit myös Euroopan laudan
 * omassa yleiskuvassa, mikä on väärin — se lauta ON Euroopan kartta.
 */
export const ELAINTAKY_NAKYY_ASTETTA = 90;

/** Tyylitiedoston tunnus — SAMA kuin täkynostolla (ks. lataaTyyli). */
const ELAINTAKY_TYYLIN_TUNNUS = 'fokusnosto-tyyli';

/**
 * Täkynoston tyylitiedosto sivulle, jos sitä ei vielä ole.
 *
 * Tunnus on tarkoituksella sama kuin js/fokusnosto.js:llä: kortti on
 * sama kortti samoilla luokilla, joten tiedosto ladataan enintään
 * kerran kummasta tahansa moduulista. Eläintäky ei voi jäädä
 * täkynoston lataajan varaan — täkynostoa ei välttämättä avata
 * kertaakaan.
 */
function elaintakyLataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(ELAINTAKY_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  // Yhden tiedoston versiossa tyylit ovat jo sivun <style>-lohkossa.
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = ELAINTAKY_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusnosto.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/* ==================== MITKÄ TÄYT JA MISSÄ ==================== */

/**
 * Laudan mittakaava: montako lautayksikköä on yksi pituusaste.
 *
 * Luetaan projektiolta itseltään (kaksi pistettä, yksi asteen väli),
 * jotta uusi lauta ei tarvitse tänne riviäkään — sama taulu palvelee
 * mittajanaa (js/fokusmitat.js) ja tätä.
 */
function elaintakyAsteenLeveys(lauta) {
  const a = projisoiLaudalle(lauta, 0, 0);
  const b = projisoiLaudalle(lauta, 1, 0);
  if (!a || !b) return 0;
  return Math.abs(b.x - a.x);
}

/*
 * KARTTARIVIT JA NIMIÖ ASUVAT js/elaintaky-rivit.js:SSÄ (3.9.2026):
 * kohdekerros lukee täyn paikan omaan ladontaansa ja tämä kerros
 * lukee kohdekerroksen ladonnan omaan kylkeensä — kumpikaan ei voi
 * tuoda toista ilman kehää. Laattageneraattori ja kohdekerros tuovat
 * rivit suoraan sieltä.
 */

/**
 * Tämän laudan eläintäyt paikkoineen (ks. js/elaintaky-rivit.js).
 */
export function elaintakyLaudalla(ui) {
  return elaintakyKarttarivit(ui?.game?.pack);
}

/** Maan nimi laudan omasta taulusta — sama lähde kuin kartuutsilla. */
function elaintakyMaanNimi(ui, iso) {
  return ui?.game?.pack?.map?.countryShapes?.[iso]?.nimi ?? iso;
}

/* ==================== KARTTAKERROS ==================== */

/** Kerros SVG:n juureen kerran; palauttaa null ilman karttaa. */
function elaintakyVarmistaKerros(ui) {
  if (!ui.svg) return null;
  if (!ui.elaintakyKerros?.isConnected || ui.elaintakyKerros.ownerSVGElement !== ui.svg) {
    const kerros = el('g', { class: 'elaintakyt' });
    ui.elaintakyAvain = null;
    /*
     * VIHREÄN PISTEEN ETEEN, JOS SE ON JO OLEMASSA. js/fokuspiste.js
     * siirtää oman kerroksensa takaisin viimeiseksi aina kun sen
     * perässä on jotain; jos tämä kerros tekisi samoin, kaksi kerrosta
     * vaihtaisi paikkaa joka piirrossa loputtomiin. Sama ratkaisu kuin
     * täkysymboleilla (js/fokusnosto-symbolit.js).
     */
    const piste = ui.fokuspisteKerros?.isConnected
      && ui.fokuspisteKerros.ownerSVGElement === ui.svg ? ui.fokuspisteKerros : null;
    if (piste) ui.svg.insertBefore(kerros, piste);
    else ui.svg.appendChild(kerros);
    ui.elaintakyKerros = kerros;
  }
  return ui.elaintakyKerros;
}

/* ============ POLTETTU ELÄINTÄKY EI PIIRRY UUDESTAAN ==============
 *
 * OMISTAJAN HAVAINTO 2.9.2026, sanatarkasti: *"samalla kun symbolit
 * uudistetaan, niin voisi tarkistaa, että kaikki kartan merkinnät
 * tulevat poltetuiksi. Esim. Kreikassa Merikilpikonna on vielä
 * polttamatta."*
 *
 * Eläintäky on juuri sitä, mitä Raamattu (KARTTANOSTOT POLTETAAN
 * LAATTOIHIN) käskee polttaa: sen paikka, symboli ja nimiö eivät
 * muutu pelin aikana, ja kaksi pelaajaa näkee samassa koordinaatissa
 * saman asian. Se jäi pois vain siksi, että se on oma kerroksensa
 * eikä kulje kohdekerroksen ladonnan läpi — nyt generaattori polttaa
 * senkin (tools/fokuskartta/nostot.mjs keraaElaintakyt).
 *
 * MITÄ JÄÄ ELÄVÄKSI: näkymätön osuma-alue (poltettu muste ei ota
 * kosketusta), aihevalo ja kortin avaus. Merkki on siis yhä
 * napautettava täsmälleen kuten ennen.
 *
 * LUNASTUKSEN HAALISTUS EI KOSKE POLTETTUA MERKKIÄ, ja se on tämän
 * muutoksen tietoinen hinta: `opacity` elää elävässä ryhmässä, ja
 * poltettua laattaa ei voi haalistaa jälkikäteen. Sama koskee kaikkia
 * muitakin poltettuja perheitä — luettua täkynostoa tai avattua
 * syvennystä ei merkitä kartalle mitenkään — joten eläintäky vain
 * siirtyy samaan sääntöön. Löydön tilan kertoo kortti.
 */

/** Merkin sisältötiiviste — sama laskenta kuin laattageneraattorissa. */
function elaintakyTiiviste(tieto) {
  return nostoladontaTiiviste({
    tunnus: tieto.tunnus,
    symboli: 'elain',
    laji: 'elain',
    nimio: tieto.nimio,
    x: tieto.x,
    y: tieto.y,
    osat: [],
  });
}

/** Onko tämä eläintäky poltettu laattaan? */
function elaintakyOnPoltettu(tieto) {
  return nostoOnPoltettu(tieto.tunnus, elaintakyTiiviste(tieto));
}

/** Yksi merkki: näkymätön osuma-alue, viivamerkki ja nimiö. */
function elaintakyPiirraMerkki(ui, ryhma, tieto) {
  const g = el('g', { class: 'elaintaky-merkki' }, ryhma);
  /*
   * MAAKOODI SOLMUUN (QA 1.9.2026): kohdekerros ratkoo limittäiset
   * napautukset kaikkien merkkien kesken (js/fokuskohteet.js
   * merkkiNapautuksenVoittaja) ja tuntee tämän kerroksen vain DOMin
   * kautta — tuonti toisin päin olisi kehä. Määre kertoo voittaneen
   * merkin eläimen, ja ui.avaaElaintakyMerkki panee voiton täytäntöön.
   */
  g.dataset.elaintaky = tieto.iso;
  g.setAttribute('role', 'button');
  g.setAttribute('tabindex', '0');
  g.setAttribute('aria-label', `${elaintakyMaanNimi(ui, tieto.iso)}: ${tieto.taky.elain}`);
  if (ui.game?.elaintakyLunastettu?.(tieto.iso)) g.classList.add('lunastettu');
  /*
   * AIHEVALO MERKIN ALLE (js/karttavalot.js): selitevalikon "Eläimet"
   * sytyttää sen. Valo on aina piirretty ja oletuksena `display: none`,
   * joten kerroksen uudelleenrakennus (lunastus, laudan vaihto) ei voi
   * hukata valotilaa — bodyn luokka päättää näkyvyyden.
   *
   * AVAIN ON MAAKOODI EIKÄ SOLMU: kiertävällä laudalla sama eläin
   * piirretään kahteen kiertokohtaan, ja selitevalikon laskuri laskee
   * kappaleet eikä solmuja (karttavalotLaskurit).
   */
  piirraKarttavalo(g, 'elain', tieto.iso, ELAINTAKY_VALO_KOKO);
  el('circle', { class: 'elaintaky-osuma', r: ELAINTAKY_OSUMA_R }, g);
  /*
   * PIENI VIIVAMERKKI JA NIMIÖ, kuten kaikilla kohdemerkeillä
   * (js/fokuskohteet.js piirraKohdemerkki): alaryhmä kutistaa kirjaston
   * merkin kohdemerkin mittaan, ja piirraNostosymKartalle tuo merkin ja
   * nimiön yhtenä rasterina (varapolkuna elävä SVG). Symboliluokkien
   * tyylit (nostosym-*) ovat css/styles.css:ssä, joka on aina ladattu.
   */
  const symboli = el('g', {
    class: 'elaintaky-symboli',
    transform: `scale(${ELAINTAKY_SYMBOLI_SKAALA.toFixed(4)})`,
  }, g);
  const glyyfi = el('g', { class: 'elaintaky-glyyfi' }, symboli);
  // Poltettu merkki on jo laatassa: elävä piirto jäisi sen päälle
  // kaksinkertaiseksi musteeksi (ks. lohko yllä).
  if (!elaintakyOnPoltettu(tieto)) {
    /*
     * KYLKI MAAN LADONNAN YMPÄRILTÄ (3.9.2026, js/elaintaky-rivit.js
     * elaintakyNimioKylki): sama päätös samasta funktiosta kuin
     * laattageneraattorilla (tools/fokuskartta/nostot.mjs
     * keraaElaintakyt), samalla portaalla — täyn merkki on lehden
     * vakiomitassa (NOSTOLADONTA_S) eikä maan omassa.
     */
    const kylki = elaintakyNimioKylki(
      tieto, ELAINTAKY_SYMBOLI_SKAALA * NOSTOLADONTA_S,
      maanLadontaEsteet(ui.game?.pack, tieto.iso),
    );
    piirraNostosymKartalle(glyyfi, 'elain', tieto.nimio, 'elain', kylki);
  }
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
    /*
     * LÄHIN KESKIPISTE VOITTAA — MYÖS TOISESTA KERROKSESTA (QA-ajo
     * 1.9.2026, kolme väärin auennutta korttia). Tämä kerros piirtyy
     * kohdekerroksen päälle, joten selain antoi limittäisen napautuksen
     * aina eläimelle, vaikka kohdemerkin keskipiste oli lähempänä.
     * Kilpailu käydään yhdessä paikassa (js/fokuskohteet.js
     * merkkiNapautuksenVoittaja); jos voitto meni muualle, työ on jo
     * tehty siellä. Kysytään ENNEN kiireen estoa, jotta luovutettu
     * napautus kulkee samalla tavalla kuin kohdemerkiltä.
     */
    if (elainmerkinNapautusLuovutettu(ui, tapahtuma, g)) return;
    // Kesken animaation (nopan pyörähdys, siirtymä) kartta ottaa yhä
    // napautuksia vastaan — sama kiireen esto kuin kaupungin laatalla.
    if (ui.busy) return;
    avaaElaintaky(ui, tieto.iso);
  };
  g.addEventListener('click', avaa);
  g.addEventListener('keydown', (tapahtuma) => {
    if (tapahtuma.key === 'Enter' || tapahtuma.key === ' ') avaa(tapahtuma);
  });
  return g;
}

/**
 * Merkit kartalle ja niiden koko zoomin mukaan.
 *
 * KUTSUTAAN SAMASTA KOHDASTA KUIN VIHREÄ PISTE (js/ui.js render ja
 * paivitaFokusPohja) — merkit elävät kartan mukana eivätkä odota omaa
 * ajastintaan.
 *
 * TYÖ TEHDÄÄN VAIN KUN SISÄLTÖ MUUTTUI. Zoomi muuttaa vain
 * ankkuriryhmien muunnosta ja kerroksen näkyvyysluokkaa, ei yhtäkään
 * solmua.
 */
export function paivitaElaintakyt(ui) {
  if (typeof document === 'undefined') return;
  const kerros = elaintakyVarmistaKerros(ui);
  if (!kerros) return;
  /*
   * VOITON TÄYTÄNTÖÖNPANO KOHDEKERROKSELLE (QA 1.9.2026). Kun kilpailun
   * (js/fokuskohteet.js merkkiNapautuksenVoittaja) voittaa eläinmerkki,
   * kortin avaa tämä kerros — kohdekerros ei voi tuoda tätä moduulia
   * (kehä), joten se saa avaajan ui:n kautta. Kiireen esto on tässä
   * samasta syystä kuin merkin omassa kuuntelijassa.
   *
   * KERRAN PER UI: tämä ajetaan joka piirrossa, eikä sulkeumaa kannata
   * luoda uudestaan joka kehyksellä (sama tapa kuin vastaskaalaajalla
   * alempana).
   */
  ui.avaaElaintakyMerkki ??= (merkki) => {
    const iso = merkki?.dataset?.elaintaky;
    if (!iso || ui.busy) return;
    avaaElaintaky(ui, iso);
  };
  const takyt = elaintakyLaudalla(ui);
  const lunastetut = takyt.filter((t) => ui.game?.elaintakyLunastettu?.(t.iso)).length;
  /*
   * LAATTALUETTELO SAAPUU VERKOSTA KESKEN ISTUNNON, joten poltettujen
   * määrä kuuluu avaimeen: ilman sitä kerros jäisi siihen tilaan, joka
   * sillä oli ennen luettelon saapumista — merkit kahteen kertaan tai
   * ei kertaakaan (js/laattapyramidi.js nostoOnPoltettu, oletus "ei
   * mitään poltettu").
   */
  const poltetut = takyt.filter(elaintakyOnPoltettu).length;
  const avain = takyt.length
    ? `${ui.game.pack.id}:${takyt.map((t) => t.iso).join('|')}:${lunastetut}:${poltetut}`
    : 'tyhja';
  if (ui.elaintakyAvain !== avain) {
    ui.elaintakyAvain = avain;
    kerros.textContent = '';
    ui.elaintakyRyhmat = [];
    if (takyt.length) elaintakyLataaTyyli();
    for (const tieto of takyt) {
      // Kiertävällä laudalla sama merkki molempiin kohtiin (sääntö 1).
      for (const x of ui.kiertoKohdat?.(tieto.x) ?? [tieto.x]) {
        const ryhma = el('g', { class: 'elaintaky-ryhma' }, kerros);
        ui.elaintakyRyhmat.push({ g: ryhma, x, y: tieto.y });
        elaintakyPiirraMerkki(ui, ryhma, tieto);
      }
    }
  }
  elaintakyPaivitaNakyvyys(ui, kerros);
  elaintakyAsetaMittakaava(ui, 1);
  // Rekisteröinti nipistykseen jää (js/kartta.js vastaskaalaaMerkit),
  // vaikka vakioskaala ei enää tarvitse vastaskaalaa: varapolku
  // (lehdetön näkymä) on yhä ruutumitassa ja tarvitsee sen.
  (ui.nipistysVastaskaalaajat ??= new Set())
    .add(ui.elaintakyVastaskaala ??= (suhde) => elaintakyAsetaMittakaava(ui, suhde));
}

/** Merkit piiloon yleiskuvassa (ks. ELAINTAKY_NAKYY_ASTETTA). */
function elaintakyPaivitaNakyvyys(ui, kerros) {
  const nakyva = ui.nakyvaAlue?.();
  const asteenLeveys = elaintakyAsteenLeveys(ui.game?.pack?.id);
  // Ilman mitattavaa näkymää tai tuntematonta projektiota merkit
  // jätetään näkyviin: väärä piilotus olisi pahempi kuin turha merkki.
  const piiloon = nakyva?.w > 0 && asteenLeveys > 0
    && nakyva.w / asteenLeveys > ELAINTAKY_NAKYY_ASTETTA;
  kerros.classList.toggle('elaintakyt-piilossa', Boolean(piiloon));
  if (piiloon) suljeElaintaky(ui);
}

/**
 * Ankkuriryhmien mittakaava — VAKIO, ei zoomin käänteisluku.
 *
 * Sama kaava kuin vihreällä pisteellä (js/fokuspiste.js): `suhde` on
 * käynnissä olevan nipistyseleen kerroin ja merkitsee vain lehdettömän
 * varapolun ruutumitassa.
 */
function elaintakyAsetaMittakaava(ui, suhde) {
  /*
   * ELEEN AIKANA ASEMOIDAAN NYT MYÖS TÄMÄ KERROS (omistaja 1.9.2026:
   * *"kaikki elementit pitää pysyä päällä kun karttaa liikutetaan tai
   * zoomataan vaikka niitä ei olisi poltettu."*).
   *
   * Tässä oli vahti `if (ui.merkitPiilossa && suhde !== 1) return;`:
   * kun kerros oli eleen ajaksi `display: none`, sen mittakaavaa ei
   * kannattanut kirjoittaa joka kehyksellä, ja oikea mitta tuli eleen
   * päättävästä kutsusta `vastaskaalaaMerkit(1)`. Piilotusta ei enää
   * ole (js/kartta.js asennaPanorointi), joten näkyvä merkki tarvitsee
   * vastaskaalansa jokaisella kehyksellä — muuten se venyisi eleen
   * mukana ja napsahtaisi kokoonsa vasta lopussa.
   *
   * HINTA ON RAJATTU SIIHEN, MISSÄ SE ON PAKKO MAKSAA: koko silmukka
   * ajetaan vain lehdettömällä varapolulla, joka on yhä ruutumitassa
   * (js/kartta.js vastaskaalaaMerkit palaa heti vakioskaalassa). Kerros
   * on kolmesta rekisteröidystä ylivoimaisesti isoin — 53 maata kertaa
   * kaksi kiertokohtaa on 106 ryhmää, kun vihreitä pisteitä on yksi —
   * joten juuri tästä v1277 mittasi hukan pois fokusnäkymässä.
   */
  /*
   * ====== PERUSMITTA ON LEHDEN OMA, EI RUUDUN (2.9.2026) ============
   *
   * Rivi luki `fokusMerkkiSkaalaKartalle` eli RUUDUN mittaa
   * (`min(fokusMerkkiSkaala, perustaso)`), kun kohdemerkit lukevat
   * `fokusMerkkiSkaalaPohja`ta eli lehden rajauksesta laskettua vakiota
   * (js/fokuskohteet.js asetaKohdeMittakaava, js/nostoladonta.js
   * NOSTOLADONTA_S = 0,60). Kaksi eri mittaa samassa kuvassa on
   * täsmälleen se vika, jota omistaja on lukenut ruudulta kahdesti — ja
   * tämän tiedoston oma lupaus sanoo toisin: *"eläintäky ei ole
   * kartalla isompi eikä pienempi kuin muut kohdemerkit."*
   *
   * ERO EI NÄKYNYT, KOSKA KATTO PEITTI SEN. Niin kauan kuin ruutukatto
   * puri syvässä zoomissa molempia perheitä, kumpikin päätyi samaan
   * kattoarvoon eikä perusmitalla ollut väliä. Kun katto alkoi venyä
   * laatan mukana (js/nostoladonta.js nostoladontaVenytys), se ei enää
   * pure eläintäkyä lainkaan — ja ero tuli näkyviin: mitattuna Sofian
   * iPad-näkymässä (skaala 9,24) tassu oli 21,96 px kun viereinen
   * karttanosto oli 25,78 px eli 15 % isompi, ja kartalla oli taas
   * neljä perhettä kolmessa mitassa (tools/savukkeet/savuke-syvazoomi.mjs
   * vartio 7 kaatui hajontaan 1,52).
   *
   * MITTA ON NYT SAMA RIVI KUIN KOHDEMERKILLÄ, varapolut mukaan lukien:
   * ilman lehden ikkunaa jäljelle jää entinen ruutumitta, koska siinä
   * näkymässä ei ole poltettavaakaan.
   */
  const s = ui.fokusMerkkiSkaalaPohja?.()
    || ui.fokusMerkkiSkaalaKartalle?.(suhde) || ui.fokusMerkkiSkaala?.(suhde);
  // Ilman mitattavaa näkymää muunnos jätetään entiselleen: väärä
  // mittakaava olisi pahempi kuin yhden kehyksen viive.
  if (!(s > 0)) return;
  /*
   * ====== RUUTUKATTO KOSKEE MYÖS ELÄINTÄKYÄ (omistaja 2.9.2026) =====
   *
   * OMISTAJAN BUGIRAPORTTI, sanatarkasti: *"Siirto viivat aivan liian
   * paksuja. Osa nostoista vielä polttamatta ja väärän kokoisia"*
   * (iPhone, Kreikka, mittajana 25 km). Kaappauksessa Peloponnesoksen
   * *"Merikilpikonna"* oli kartan ylivoimaisesti suurin merkintä:
   * tassusymboli ja nimi kolminkertaisina viereisiin karttanostoihin
   * nähden.
   *
   * ── JUURISYY, MITATTUNA ──────────────────────────────────────────
   *
   * Tiedoston johdanto lupaa: *"eläintäky ei ole kartalla isompi eikä
   * pienempi kuin muut kohdemerkit"* — ja kerroin (ELAINTAKY_SYMBOLI_
   * SKAALA = KOHDE_SYMBOLI_SKAALA) onkin sama. Lupaus piti niin kauan
   * kuin kohdemerkilläkään ei ollut kattoa. Kohdemerkki sai 1.9.2026
   * RUUTUKATON (js/nostoladonta.js nostoladontaKattoPorras: nimiö
   * enintään kartan oman kohdenimen kokoinen), tämä kerros ei — ja
   * katto on juuri se osa, joka syvässä zoomissa ratkaisee. Ilman
   * kattoa merkki on puhdas karttavakio ja kasvaa rajatta:
   *
   *   iPhone 402 x 874 dpr 3, Kreikka, mittajana 25 km (skaala 6,26)
   *     karttanosto (katossa)     symboli 10,0 px   nimi  8,5 px
   *     eläintäky (kattamaton)    symboli 25,6 px   nimi 21,6 px
   *
   * Kerroin on tasan skaala x NOSTOLADONTA_S / katon mitta, eli mitä
   * syvemmälle omistaja zoomaa, sitä isommaksi kilpikonna kasvaa.
   *
   * ── KAAVA ON SAMA, EIKÄ SE OLE TÄSSÄ ─────────────────────────────
   *
   * Katto lasketaan merkin KIRJASTON mitassa (nimiön kirjasinkoko on
   * siinä yksikössä) ja jaetaan takaisin ryhmän mittaan — rivistä
   * riviin sama kuin kohdemerkillä (js/fokuskohteet.js
   * asetaKohdeMittakaava). Kaksi kopiota samasta kaavasta ajautuisi eri
   * arvoihin; tämä lukee saman funktion samoilla luvuilla, ja ainoa ero
   * on kerroksen oma nimi kertoimelle.
   *
   * NIMIÖ TULEE MUKANA ILMAN ERILLISTÄ SÄÄNTÖÄ. Eläimen nimi on samassa
   * rasterissa kuin symboli (piirraNostosymKartalle), joten se kutistuu
   * samalla luvulla — ja päätyy täsmälleen kohdenimen mittaan, koska
   * juuri se mitta on katon yläraja.
   *
   * OSUMA-ALUE EI KUTISTU (sama sääntö kuin kohdemerkillä): ympyrä on
   * ryhmän lapsi, joten säde kerrotaan takaisin ylös sillä samalla
   * suhteella, jolla ryhmä pienenee. Merkki on kartan kokoinen,
   * napautusala sormen kokoinen.
   */
  const nakyvaSkaala = ui.nakyvaAlue?.()?.skaala;
  const sPiirto = nostoladontaKattoPorras(ELAINTAKY_SYMBOLI_SKAALA * s, nakyvaSkaala)
    / ELAINTAKY_SYMBOLI_SKAALA;
  const kattoSuhde = sPiirto > 0 && s > 0 ? s / sPiirto : 1;
  const osumaR = ELAINTAKY_OSUMA_R * (ui.fokusMerkkiOsumaKerroin?.(suhde) ?? 1) * kattoSuhde;
  const zoom = (sPiirto > 0 ? sPiirto : s).toFixed(4);
  for (const ryhma of ui.elaintakyRyhmat ?? []) {
    ryhma.g.setAttribute('transform', `translate(${ryhma.x} ${ryhma.y}) scale(${zoom})`);
    const osuma = ryhma.g.querySelector?.('.elaintaky-osuma');
    if (osuma) maare(osuma, 'r', osumaR.toFixed(2));
  }
}

/** Laudan vaihto tai uusi peli: merkit pois ja muisti nollille. */
export function nollaaElaintakyt(ui) {
  suljeElaintaky(ui);
  ui.elaintakyAvain = null;
  ui.elaintakyRyhmat = [];
  if (ui.elaintakyKerros?.isConnected) ui.elaintakyKerros.textContent = '';
}

/* ==================== KORTTI ==================== */

/**
 * ELÄIMEN KORTTI — kuva, kaanonteksti ja löytö.
 *
 * Kortti on kartan päällä kelluva paperi, ei koko ruudun modaali: sama
 * sääntö ja samat luokat kuin täkynoston lunastuskortilla
 * (js/fokusnosto.js avaaNostonKortti). Napautus kortin ulkopuolelle tai
 * Esc sulkee.
 *
 * PALKKIO MAKSETAAN AVATESSA eikä napista: omistajan tilaus on
 * *"klikkaus avaa kuvan + lyhyen faktatekstin + pienen
 * puntapalkkion"*, eli löytö on itse kortti. Peli päättää, onko löytö
 * uusi (js/game.js actionElaintaky), joten toinen napautus ei voi
 * tuplata punnankaan — kortti kertoo silloin löydön jo tapahtuneen.
 */
export function avaaElaintaky(ui, iso) {
  const taky = ELAINTAKYT[iso];
  if (!taky) return;
  elaintakyLataaTyyli();
  suljeElaintaky(ui);

  /*
   * OMAT KERROS- JA KORTTILUOKAT, LAINATTU SISUS. Ulkokuori on
   * `elaintaky-*`, koska js/fokusnosto.js sulkee OMAN korttinsa
   * pyyhkimällä jokaisen `.fokusnosto-kerros`-solmun sivulta — jaettu
   * luokka veisi eläinkortin mukanaan. Kortin sisus (ylärivi, otsikko,
   * kuva, teksti) käyttää täkynoston luokkia sellaisinaan, ja
   * css/fokusnosto.css luettelee kummankin kuoren samoissa säännöissä.
   */
  const kerros = html('div', 'elaintaky-kerros');
  const kortti = html('div', 'elaintaky-kortti');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');
  kortti.setAttribute('aria-label', taky.otsikko);

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusnosto-sisalto');
  // Ylärivi on kohdemallin yhteinen: aihesymboli ja luokan nimi —
  // sama rivi kuin kartan kohdekortissa, nostoilla ja
  // syvennystarinoilla (YHTENÄINEN KOHDEMALLI, Raamattu 29.8.2026).
  sisalto.appendChild(nostosymKortinYlarivi('elain', 'fokusnosto-ylarivi'));
  sisalto.appendChild(html('h3', 'fokusnosto-kortti-otsikko', taky.otsikko));
  elaintakyPiirraKuva(ui, sisalto, taky, elaintakyMaanNimi(ui, iso));
  const teksti = html('div', 'fokusnosto-teksti');
  for (const kappale of jaaKappaleiksi(taky.teksti)) {
    teksti.appendChild(html('p', '', kappale));
  }
  sisalto.appendChild(teksti);
  /*
   * LÄHDERIVI ON SAMA RIVI KUIN TÄKYNOSTOLLA (1.9.2026, nostoaudit):
   * sama luokka `fokusnosto-lahde` ja sama paikka — tekstin jälkeen,
   * ennen lunastusta — kuin js/fokusnosto.js piirraNostonSisus.
   */
  if (taky.lahde) {
    sisalto.appendChild(taytaLahderivi(html('p', 'fokusnosto-lahde'), taky.lahde, taky));
  }
  sisalto.appendChild(elaintakyLunasta(ui, iso));

  kortti.appendChild(sisalto);
  kerros.appendChild(kortti);
  document.body.appendChild(kerros);

  const kiinni = () => {
    sfx.play('paper');
    suljeElaintaky(ui);
  };
  sulje.addEventListener('click', kiinni);
  /*
   * Napautus kortin ULKOPUOLELLE sulkee; kortin päällä se ei tee
   * mitään, jotta tekstiä voi valita. Sulkeva napautus nielaistaan
   * tässä kerroksessa: kerros katoaa jo pointerdownissa, ja ilman
   * nielua selain etsisi saman napautuksen click-kohteen vasta sormen
   * noustessa — kartalta kerroksen alta (ks. ui-apurit
   * nielaiseSulkevaNapautus).
   */
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.elaintaky-kortti')) return;
    nielaiseSulkevaNapautus(tapahtuma);
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    /*
     * KUVAN SUURENNOS SULKEUTUU ENSIN. Kortin kuuntelija on
     * rekisteröity ennen suurennoksen omaa (js/fokuskohteet.js
     * avaaKohdeSuurennos) ja ehtisi siis ensin — sama väistösääntö
     * kuin täkynoston kortilla (js/fokusnosto.js).
     */
    if (ui?.elaintakyZoom) return;
    tapahtuma.stopPropagation();
    suljeElaintaky(ui);
  };
  document.addEventListener('keydown', nappain, true);

  ui.elaintakyKortti = {
    kerros,
    purku: () => document.removeEventListener('keydown', nappain, true),
  };
  void kerros.offsetWidth;
  kerros.classList.add('elaintaky-auki');
  sfx.play('popup');
}

/* ==================== KORTIN KUVAKARUSELLI ==================== */

/*
 * KAKSI KUVAA SAMASTA AIHEESTA (omistajan päätös 5.9.2026).
 *
 * Raamatun osio "ELAINKUVIIN TARINAA, KAKSI KUVAA SAMASTA AIHEESTA",
 * omistajan päätös sanatarkasti: *"samasta eläinaiheesta voi olla
 * kaksi erilaista hyväksyttyä kuvaa, ja kortilla ne näytetään
 * KARUSELLINA (kuva vaihtuu pyyhkäisyllä kuten lehden alarivin
 * karuselli, pisteet kertovat määrän, kummallakin kuvalla oma
 * kuvateksti)"*.
 *
 * YKSI KUVA EI OLE KARUSELLI. Yhden kuvan tietue latoutuu tavu
 * tavulta kuten ennen (elaintakyPiirraKuva alempana) — ei raitaa, ei
 * pisteitä, ei uutta kuuntelijaa. Karuselli syntyy vasta, kun
 * tietueessa on toinen kuva (js/packs/elaintakyt.js elaintakynKuvat).
 *
 * MALLI ON LEHDEN ALARIVIN KARUSELLI, EI UUSI KEKSINTÖ. Rakenne,
 * eleet ja mitat ovat samat kuin Tiedeliitteen havainnekuvien
 * karusellilla (js/tiedeliite.js piirraIlmiokaruselli,
 * css/aikajana.css): ikkuna, jonka sisällä raita liukuu, ruutu per
 * kuva, pisteet alla ja sormen alla liikkuva raita.
 *
 * MIKSI KOODI ON TÄSSÄ EIKÄ TUOTU SIELTÄ: js/tiedeliite.js kuuluu
 * aikajanan perheeseen, joka ladataan VAIN dynaamisesti (js/ui.js
 * `await import('./aikajana.js')`) eikä ole yhden tiedoston version
 * niputuslistalla (tools/build-standalone.mjs MODULES). Staattinen
 * tuonti sieltä olisi niputuksen järjestysvirhe (tools/tarkista-
 * niputus.mjs sääntö 3) ja jättäisi karusellin standalone-versiossa
 * ilman funktioitaan. Yhteistä on siksi MALLI ja MITAT, ja tämän
 * kerroksen oma pysäytys- ja pyyhkäisysääntö on kirjoitettu puhtaiksi
 * funktioiksi, jotka testi mittaa (tests/elaintakyt.test.mjs).
 */

/** Pyyhkäisyn kynnys pikseleinä — sama luku kuin lehden karusellilla. */
export const ELAINTAKY_KARUSELLIN_KYNNYS = 30;

/**
 * Askel karusellissa: raita on yhtenäinen nauha, joten se PYSÄHTYY
 * PÄIHIN eikä kierrä ympäri (päästä päähän hyppy liu'uttaisi koko
 * matkan takaisin).
 */
export function elaintakynKarusellinKohta(kohdalla, suunta, maara) {
  if (!(maara >= 1)) return 0;
  return Math.min(maara - 1, Math.max(0, Math.trunc(kohdalla) + suunta));
}

/**
 * Pyyhkäisyn suunta: vasemmalle veto (dx < 0) vie seuraavaan kuvaan,
 * oikealle edelliseen. Kynnystä lyhyempi liike ei siirrä (0).
 */
export function elaintakynKarusellinPyyhkaisy(dx, kynnys = ELAINTAKY_KARUSELLIN_KYNNYS) {
  if (!Number.isFinite(dx) || Math.abs(dx) < kynnys) return 0;
  return dx < 0 ? 1 : -1;
}

/**
 * KAHDEN KUVAN KARUSELLI KORTTIIN.
 *
 * Selaus kahdella tavalla: pyyhkäisy sormella tai hiirellä (raita
 * seuraa liikettä ja napsahtaa kynnyksen ylitettyään) ja pisteet
 * kuvan alla. Nuolinäppäimet selaavat, kun kohdistus on karusellissa.
 * Kuvateksti ja lähderivi vaihtuvat kuvan mukana, koska kummallakin
 * kuvalla on omansa (omistajan päätös yllä).
 *
 * LIIKE ON PEHMEÄ (Raamattu: KAIKKI LIIKE ANIMOIDAAN PEHMEASTI):
 * raidan liuku ja kuvatekstin esiintulo kestävät 250 ms nopeutuen ja
 * hidastuen, ja `prefers-reduced-motion` vaihtaa kuvan suoraan ilman
 * siirtymää (css/fokusnosto.css osio 6).
 *
 * SUURENNOS NÄYTTÄÄ NYKYISEN KUVAN. Napautus ruutuun avaa saman
 * suurennoksen kuin yhden kuvan kortissa (js/fokuskohteet.js
 * avaaKohdeSuurennos, ui-avain elaintakyZoom) — paitsi jos sormi
 * oikeasti liikkui, jolloin kyse oli pyyhkäisystä eikä napautuksesta.
 *
 * RIKKINÄINEN KUVA jättää oman ruutunsa tyhjäksi paperiksi, ja vasta
 * kun KAIKKI kuvat pettävät, kehys katoaa — sama sääntö kuin yhdellä
 * kuvalla: teksti kantaa kortin yksinkin.
 */
function elaintakyPiirraKaruselli(ui, kohde, kuvat, vakioselite) {
  const kehys = html('figure', 'fokusnosto-kuva elaintaky-kuva elaintaky-karuselli');
  kehys.dataset.maara = String(kuvat.length);
  const ikkuna = html('div', 'elaintaky-karuselli-ikkuna');
  const raita = html('div', 'elaintaky-karuselli-raita');
  ikkuna.appendChild(raita);
  kehys.appendChild(ikkuna);

  let kohdalla = 0;
  let estaNapautus = false;
  let virheita = 0;
  const osoitteet = kuvat.map((kuva) => assetOsoite('elaimet', kuva.url || kuva.tiedosto));
  const selitteet = kuvat.map((kuva) => kuva.kuvateksti || vakioselite);

  const ruudut = selitteet.map((teksti, j) => {
    const nappi = html('button', 'fokusnosto-kuvanappi elaintaky-karuselli-ruutu');
    nappi.type = 'button';
    nappi.setAttribute('aria-label', `${teksti} — avaa suurena`);
    const img = document.createElement('img');
    img.alt = teksti;
    img.decoding = 'async';
    img.draggable = false;
    /*
     * EI `loading = 'lazy'`: molemmat kuvat ovat samassa raidassa ja
     * pyyhkäisy on välitön ele — toinen kuva ei saa alkaa latautua
     * vasta siinä vaiheessa, kun sormi on jo vienyt sen esiin. Kortin
     * kuvat haetaan yhä vasta kortin avautuessa (ks. elaintakyPiirraKuva).
     */
    img.src = osoitteet[j];
    img.addEventListener('error', () => {
      img.hidden = true;
      virheita += 1;
      if (virheita === kuvat.length) kehys.hidden = true;
    }, { once: true });
    nappi.appendChild(img);
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      if (estaNapautus) { estaNapautus = false; return; }
      avaaKohdeSuurennos(
        ui,
        { osoite: osoitteet[kohdalla], selite: selitteet[kohdalla] },
        () => ruudut[kohdalla],
        'elaintakyZoom',
      );
    });
    raita.appendChild(nappi);
    return nappi;
  });

  /*
   * KUVATEKSTI JA LÄHDERIVI OVAT SAMAT LUOKAT KUIN YHDELLÄ KUVALLA
   * (.fokusnosto-kuvateksti, -kuvaselite, -kuvalahde): karuselli on
   * sama kortti samalla pergamentilla, vain kuvia on kaksi.
   */
  const teksti = html('figcaption', 'fokusnosto-kuvateksti elaintaky-karuselli-teksti');
  const selite = html('span', 'fokusnosto-kuvaselite');
  const lahde = html('span', 'fokusnosto-kuvalahde');
  teksti.append(selite, lahde);

  const pisteet = html('div', 'elaintaky-karuselli-pisteet');
  const pistenapit = selitteet.map((teksti, j) => {
    const piste = html('button', 'elaintaky-karuselli-piste');
    piste.type = 'button';
    // Ruudunlukija saa kuvan järjestysluvun JA sen kuvatekstin: pelkkä
    // "kuva 2/2" ei kerro, mihin piste vie.
    piste.setAttribute('aria-label', `Kuva ${j + 1}/${selitteet.length}: ${teksti}`);
    piste.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      siirry(j);
    });
    pisteet.appendChild(piste);
    return piste;
  });
  kehys.append(teksti, pisteet);

  /** Raidan paikka: nykyinen kuva ja mahdollinen sormen veto päälle. */
  const asetaRaita = (dx = 0) => {
    const siirto = dx ? ` + ${Math.round(dx)}px` : '';
    raita.style.transform = `translate3d(calc(${-100 * kohdalla}%${siirto}), 0, 0)`;
  };

  /** Kuvateksti, lähderivi, pisteet ja kohdistus nykyisen kuvan mukaan. */
  const nayta = () => {
    const kuva = kuvat[kohdalla];
    selite.textContent = selitteet[kohdalla];
    /*
     * LÄHDERIVI KULKEE taytaLahderivin LÄPI, jotta "Matkakirjan
     * havainnekuva" saa painettavan selitteensä (js/havainnekuva.js)
     * kummallakin kuvalla. Ilman omaa lähdettä rivi kertoo totuuden:
     * eläinkuvat ovat pelin omia generoituja kuvia — sama vakiorivi
     * kuin yhden kuvan kortissa.
     */
    taytaLahderivi(lahde, kuva.lahde || 'Matkakirjan havainnekuva', kuva);
    // Uusi kuvateksti tulee esiin pehmeästi: luokka irrotetaan ja
    // kiinnitetään uudestaan, jotta CSS-animaatio alkaa alusta.
    teksti.classList.remove('vaihtui');
    void teksti.offsetWidth;
    teksti.classList.add('vaihtui');
    ruudut.forEach((nappi, j) => {
      // Vain näkyvä kuva on sarkaimella tavoitettava.
      nappi.tabIndex = j === kohdalla ? 0 : -1;
      nappi.setAttribute('aria-hidden', j === kohdalla ? 'false' : 'true');
    });
    pistenapit.forEach((piste, j) => {
      piste.classList.toggle('nykyinen', j === kohdalla);
      if (j === kohdalla) piste.setAttribute('aria-current', 'true');
      else piste.removeAttribute('aria-current');
    });
    asetaRaita();
  };

  function siirry(j) {
    const uusi = Math.min(kuvat.length - 1, Math.max(0, j));
    if (uusi === kohdalla) { asetaRaita(); return; }
    kohdalla = uusi;
    sfx.play('paper');
    nayta();
  }

  /*
   * PYYHKÄISY KOSKETUKSELLA JA HIIRELLÄ: raita seuraa osoitinta ja
   * napsahtaa kynnyksen ylityttyä seuraavaan kuvaan. Pystysuora liike
   * jätetään kortin vieritykselle (.elaintaky-kortti on `touch-action:
   * pan-y`), joten suunta ratkaistaan ensimmäisistä pikseleistä eikä
   * vaakaraahaus ala vahingossa kesken vierityksen.
   */
  let raahaus = null;
  ikkuna.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.pointerType === 'mouse' && tapahtuma.button !== 0) return;
    /*
     * NAPAUTUKSEN ESTO NOLLATAAN ELEEN ALUSSA eikä vasta seuraavassa
     * clickissä — talon oma oppi kuvasarjoista (js/ui.js
     * kaariNostoGalleria): kosketusnäytöllä pyyhkäisy ei tuota clickiä
     * lainkaan, joten click-puolen nollaus jättäisi lipun päälle ja
     * nielaisisi pyyhkäisyä SEURAAVAN napautuksen. Jokainen ele
     * päättää itse, oliko se veto vai napautus.
     */
    estaNapautus = false;
    raahaus = {
      id: tapahtuma.pointerId, x: tapahtuma.clientX, y: tapahtuma.clientY,
      dx: 0, vaaka: false,
    };
  });
  ikkuna.addEventListener('pointermove', (tapahtuma) => {
    if (!raahaus || tapahtuma.pointerId !== raahaus.id) return;
    const dx = tapahtuma.clientX - raahaus.x;
    const dy = tapahtuma.clientY - raahaus.y;
    if (!raahaus.vaaka) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dx) <= Math.abs(dy)) { raahaus = null; return; }
      raahaus.vaaka = true;
      raita.classList.add('raahataan');
      ikkuna.setPointerCapture?.(tapahtuma.pointerId);
    }
    raahaus.dx = dx;
    asetaRaita(dx);
  });
  const lopetaRaahaus = (tapahtuma) => {
    if (!raahaus || (tapahtuma && tapahtuma.pointerId !== raahaus.id)) return;
    const { dx, vaaka } = raahaus;
    raahaus = null;
    raita.classList.remove('raahataan');
    // Sormi liikkui: napautus oli pyyhkäisyn loppu eikä kuvan avaus.
    if (Math.abs(dx) > 6) estaNapautus = true;
    const suunta = vaaka ? elaintakynKarusellinPyyhkaisy(dx) : 0;
    if (suunta) siirry(elaintakynKarusellinKohta(kohdalla, suunta, kuvat.length));
    else asetaRaita();
  };
  ikkuna.addEventListener('pointerup', lopetaRaahaus);
  ikkuna.addEventListener('pointercancel', lopetaRaahaus);

  kehys.addEventListener('keydown', (tapahtuma) => {
    if (tapahtuma.key !== 'ArrowLeft' && tapahtuma.key !== 'ArrowRight') return;
    tapahtuma.stopPropagation();
    siirry(elaintakynKarusellinKohta(kohdalla, tapahtuma.key === 'ArrowRight' ? 1 : -1,
      kuvat.length));
  });

  nayta();
  kohde.appendChild(kehys);
}

/**
 * Kortin kuva. Kuva haetaan VASTA TÄSSÄ eli kortin avautuessa:
 * eläinkuvia on kymmeniä megatavun kokoluokassa, eikä niitä ole
 * palvelutyöntekijän esilatauksessa (sw.js) juuri siksi.
 *
 * Rikkinäinen tai lataamaton kuva piilottaa kehyksensä — teksti kantaa
 * kortin yksinkin, kuten täkynostolla.
 */
function elaintakyPiirraKuva(ui, kohde, taky, maa) {
  const vakioselite = `${taky.elain.charAt(0).toUpperCase()}${taky.elain.slice(1)}, ${maa}`;
  /*
   * KAKSI KUVAA SAMASTA AIHEESTA MENEE KARUSELLIIN (omistajan päätös
   * 5.9.2026, ks. lohko yllä). Tietue kertoo kuvansa yhdellä tavalla
   * (js/packs/elaintakyt.js elaintakynKuvat), ja yhden kuvan tietue
   * latoutuu tästä eteenpäin täsmälleen kuten ennen.
   */
  const kuvat = elaintakynKuvat(taky);
  if (kuvat.length > 1) { elaintakyPiirraKaruselli(ui, kohde, kuvat, vakioselite); return; }
  /*
   * YKSIKIN KUVA LUETAAN NORMALISOIJASTA (5.9.2026, kuvaputken toimitus
   * posti/animals-approved-32-20260905). Tässä luettiin ennen suoraan
   * `taky.kuva` ja `taky.kuvaLahde`, jolloin YHDEN kuvan `kuvat`-lista
   * olisi jäänyt kortilla piiloon: kuva ei olisi latautunut lainkaan ja
   * kuvateksti olisi kadonnut, vaikka karuselli näytti kahden kuvan
   * listan oikein. Vanha tietue kulkee saman normalisoijan läpi
   * muuttumattomana (tiedosto = taky.kuva, lahde = taky.kuvaLahde,
   * kuvateksti tyhjä → vakioselite), joten yksikään entinen kortti ei
   * muutu tavuakaan.
   *
   * KUVATON TIETUE EI SAA KEHYSTÄ. Tyhjä lista on kelvollinen vastaus
   * (js/packs/elaintakyt.js elaintakynKuvat), ja teksti kantaa kortin
   * yksinkin — sama sääntö kuin rikkinäisellä kuvalla.
   */
  const [kuva] = kuvat;
  if (!kuva) return;
  const selite = kuva.kuvateksti || vakioselite;
  const kehys = html('figure', 'fokusnosto-kuva elaintaky-kuva');
  const nappi = html('button', 'fokusnosto-kuvanappi');
  nappi.type = 'button';
  nappi.title = 'Katso kuva suurempana';
  const img = document.createElement('img');
  nappi.setAttribute('aria-label', `${selite} — avaa suurena`);
  img.alt = selite;
  img.decoding = 'async';
  img.loading = 'lazy';
  img.draggable = false;
  img.addEventListener('error', () => { kehys.hidden = true; }, { once: true });
  // Repon polku, ämpäritunnus tai kuvajonon valmis osoite sen mukaan,
  // mitä tietue kantaa (js/media.js assetOsoite, R2_ASSETIT) —
  // kutsupaikka ei muutu siirrosta eikä toimitustavasta.
  const elainkuva = assetOsoite('elaimet', kuva.url || kuva.tiedosto);
  img.src = elainkuva;
  nappi.appendChild(img);
  /*
   * NAPAUTUS SUURENTAA (omistajan raportti 30.8.2026: kaikki popupien
   * kuvat aukeavat koko näytölle). Sama suurennos kuin kartan
   * kohteilla ja täkynostolla (js/fokuskohteet.js avaaKohdeSuurennos);
   * repon oma kuva kulkee `osoite`-kenttänä, jolla ei ole thumb-
   * putkea. Oma ui-avain, koska kortin elinkaari ei ole tietoruudun
   * (ks. avaaKohdeSuurennos, kohta ELINKAARI) — suljeElaintaky sulkee
   * suurennoksen kortin mukana.
   */
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    avaaKohdeSuurennos(ui, { osoite: elainkuva, selite }, () => nappi, 'elaintakyZoom');
  });
  kehys.appendChild(nappi);
  const teksti = html('figcaption', 'fokusnosto-kuvateksti');
  teksti.appendChild(html('span', 'fokusnosto-kuvaselite', selite));
  /*
   * LÄHDERIVI KUTEN MUISSA KORTEISSA (omistajan testikierros 30.8.2026:
   * *"Kilpikonnilta puuttuu lähde"*; media-sääntö vaatii lähteen
   * näkyviin). Eläinkuvat ovat pelin omia generoituja kuvia eivätkä
   * Commons-valokuvia (js/packs/elaintakyt.js, osio "KUVAT OVAT
   * OMISTAJAN OMIA"), joten rivi kertoo TOTUUDEN eikä keksittyä
   * kuvaajaa — sama sanamuoto kuin muilla pelin omilla kuvilla
   * (js/packs/fokusvirta-*.js `lahde: 'Matkakirjan havainnekuva'`).
   *
   * KUVAN LÄHDE ON ERI KENTTÄ KUIN TEKSTIN (korjaus 2.9.2026,
   * omistajan bugiraportti *"Havainnekuvasta puuttuu popup linkki.
   * Tarkista kaikkialta pelistä että linkki tulee näkyviin"*). Tässä
   * luki `taky.lahde ?? 'Matkakirjan havainnekuva'`, ja koska jokaisella
   * täyllä ON `lahde` — se on kortin TEKSTIN lähde, en-Wikipedian
   * artikkeli, ja se ladotaan omalle rivilleen ylempänä — vakiorivi ei
   * koskaan toteutunut: kuvan alla luki Wikipedia-artikkeli kuvan
   * lähteenä, vaikka kuva on pelin oma. Rivi valehteli ja havainnekuvan
   * selite jäi syntymättä. Nyt kuvan oma lähde luetaan normalisoijasta
   * (vanhassa tietueessa se on `kuvaLahde`, kuvaputken toimituksessa
   * `kuvat`-listan alkion oma `lahde`), ja ilman sitä rivi kertoo
   * totuuden: kuva on Matkakirjan havainnekuva. Sama lauseke kuin
   * karusellissa — kaksi kuvaa ja yksi kuva eivät saa ajautua eri
   * tulkintoihin.
   */
  teksti.appendChild(taytaLahderivi(html('span', 'fokusnosto-kuvalahde'),
    kuva.lahde || 'Matkakirjan havainnekuva', kuva));
  kehys.appendChild(teksti);
  kohde.appendChild(kehys);
}

/**
 * LÖYTÖRIVI. Uusi eläin tuo punnat ja leiman; jo löydetty kertoo sen
 * suoraan eikä lupaa mitään uutta.
 */
function elaintakyLunasta(ui, iso) {
  const rivi = html('p', 'elaintaky-palkkio');
  const vastaus = ui.game?.actionElaintaky?.(iso, ELAINTAKY_PALKKIO);
  if (!vastaus?.ok) {
    rivi.textContent = 'Eläin on kirjattu.';
    return rivi;
  }
  if (!vastaus.uusi) {
    rivi.classList.add('elaintaky-palkkio-vanha');
    rivi.textContent = 'Tämä eläin on jo löydetty.';
    return rivi;
  }
  /*
   * PALKKIO ON JO MAKSETTU TÄSSÄ KOHTAA (actionElaintaky kasvatti
   * kukkaroa juuri yllä), ja rivin on sanottava se (omistajan
   * testikierros 30.8.2026: *"löytöpalkkio on epäselvä, että pitääkö
   * vielä etsiä vai tuliko palkkio jo"*). "Lisätty kukkaroon" on
   * mennyt aikamuoto samasta syystä kuin leimassa: raha tuli juuri.
   */
  rivi.textContent = `Löytöpalkkio +${vastaus.palkkio} puntaa lisätty kukkaroon.`;
  const leima = ui.buildToast?.({
    kind: 'stamp',
    icon: 'kukkaro',
    text: `+${vastaus.palkkio} puntaa`,
    sub: 'Eläintäky löytyi',
  });
  if (leima) setTimeout(() => ui.removeToast(leima), TOAST_MS.default);
  sfx.play('correct');
  ui.onChange?.(ui.game);
  ui.renderTurnPill?.();
  // Merkki haalistuu heti: löydetty eläin on kartalla eri asia kuin
  // löytämätön (avain kantaa lunastettujen määrän).
  paivitaElaintakyt(ui);
  return rivi;
}

/** Kortti pois ja kuuntelijat puretaan. */
export function suljeElaintaky(ui) {
  const auki = ui?.elaintakyKortti;
  if (ui) ui.elaintakyKortti = null;
  auki?.purku?.();
  // Kuvan suurennos on kortin oma jatke: ilman tätä se jäisi
  // kellumaan kartan päälle, kun kortti sen alta katoaa (sama
  // siivous kuin täkynostolla, js/fokusnosto.js suljeNostonKortti).
  suljeKohdeSuurennos(ui, 'elaintakyZoom');
  // Sama siivous kuin täkynostolla (suljeNostonKortti): orpo kerros
  // jäisi muuten nappaamaan napautuksia koko kartan päältä.
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.elaintaky-kerros')) vanha.remove();
}
