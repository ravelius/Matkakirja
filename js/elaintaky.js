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
 *   Eläintäkyjä on 29 MAASSA, joista useimmilla ei ole fokuskaupunkia
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
 * Merkki ei ole uusi symboli vaan symbolikirjaston `elain`-kategoria
 * (js/fokusnosto-symbolit.js piirraNostosymboli) — sama kaiverrettu
 * eläinmerkki, jolla kartan eläinkohteet on merkitty v1126:sta asti.
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
 * 29 merkkiä siinä olisi merkkien ryteikkö eikä kartta. Merkit näkyvät
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
import { html, jaaKappaleiksi, nielaiseSulkevaNapautus, TOAST_MS } from './ui-apurit.js';
import { el, maare } from './mapart.js';
import { avaaKohdeSuurennos, suljeKohdeSuurennos } from './fokuskohteet.js';
import { nostosymKortinYlarivi, piirraNostosymboli } from './fokusnosto-symbolit.js';
import { piirraKarttavalo } from './karttavalot.js';
import { projisoiLaudalle } from './fokusmitat.js';
import { ELAINTAKYT } from './packs/elaintakyt.js';
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
const ELAINTAKY_NAKYY_ASTETTA = 90;

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

/**
 * Tämän laudan eläintäyt paikkoineen.
 *
 * Maa kelpaa vain jos LAUTA TUNTEE SEN (countryShapes): maalehti,
 * maapilleri ja kartuutsi lukevat maan nimen samasta taulusta, eikä
 * kartalle saa ilmestyä merkkiä maahan, jota lauta ei muuten tunne.
 * Laudan reunan ulkopuolelle jäävä piste jätetään pois — Vanjärvi on
 * Euroopan laudan itäreunan takana (js/packs/elaintakyt.js).
 */
export function elaintakyLaudalla(ui) {
  const pack = ui?.game?.pack;
  const map = pack?.map;
  if (!map?.countryShapes) return [];
  const tulos = [];
  for (const [iso, taky] of Object.entries(ELAINTAKYT)) {
    if (!map.countryShapes[iso]) continue;
    const piste = projisoiLaudalle(pack.id, taky.lon, taky.lat);
    if (!piste) continue;
    if (piste.x < 0 || piste.y < 0) continue;
    if (map.width > 0 && piste.x > map.width) continue;
    if (map.height > 0 && piste.y > map.height) continue;
    tulos.push({ iso, taky, x: piste.x, y: piste.y });
  }
  return tulos;
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

/** Yksi merkki: näkymätön osuma-alue ja kaiverrettu eläinsymboli. */
function elaintakyPiirraMerkki(ui, ryhma, tieto) {
  const g = el('g', { class: 'elaintaky-merkki' }, ryhma);
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
  piirraKarttavalo(g, 'elain', tieto.iso);
  el('circle', { class: 'elaintaky-osuma', r: ELAINTAKY_OSUMA_R }, g);
  const symboli = el('g', { class: 'elaintaky-symboli' }, g);
  piirraNostosymboli(symboli, 'elain');
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
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
  const takyt = elaintakyLaudalla(ui);
  const lunastetut = takyt.filter((t) => ui.game?.elaintakyLunastettu?.(t.iso)).length;
  const avain = takyt.length
    ? `${ui.game.pack.id}:${takyt.map((t) => t.iso).join('|')}:${lunastetut}`
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
   * ELEEN AIKANA EI ASEMOIDA NÄKYMÄTÖNTÄ. Merkkikerrokset ovat
   * nipistyksen ajan `display: none` (js/kartta.js piilotaMerkit,
   * css/styles.css kartta-merkit-piilossa), ja tämä kerros on
   * kolmesta rekisteröidystä ylivoimaisesti isoin: 29 maata
   * kertaa kaksi kiertokohtaa on 58 ryhmää, kun vihreitä pisteitä on
   * yksi. Sata turhaa määrekirjoitusta joka kehyksellä on juuri se
   * hukka, jonka v1277 mittasi vastaskaalaajista pois. Eleen
   * PÄÄTTÄVÄ kutsu tulee suhteella 1 (vastaskaalaaMerkit(1)) ja
   * menee läpi, joten mittakaava on oikea siinä hetkessä, kun merkit
   * palaavat näkyviin.
   */
  if (ui.merkitPiilossa && suhde !== 1) return;
  const s = ui.fokusMerkkiSkaalaKartalle?.(suhde) ?? ui.fokusMerkkiSkaala?.(suhde);
  // Ilman mitattavaa näkymää muunnos jätetään entiselleen: väärä
  // mittakaava olisi pahempi kuin yhden kehyksen viive.
  if (!(s > 0)) return;
  const osumaR = ELAINTAKY_OSUMA_R * (ui.fokusMerkkiOsumaKerroin?.(suhde) ?? 1);
  const zoom = s.toFixed(4);
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

/**
 * Kortin kuva. Kuva haetaan VASTA TÄSSÄ eli kortin avautuessa: 29
 * eläinkuvaa on 3,3 megatavua, eikä niitä ole palvelutyöntekijän
 * esilatauksessa (sw.js) juuri siksi.
 *
 * Rikkinäinen tai lataamaton kuva piilottaa kehyksensä — teksti kantaa
 * kortin yksinkin, kuten täkynostolla.
 */
function elaintakyPiirraKuva(ui, kohde, taky, maa) {
  const kehys = html('figure', 'fokusnosto-kuva elaintaky-kuva');
  const nappi = html('button', 'fokusnosto-kuvanappi');
  nappi.type = 'button';
  nappi.title = 'Katso kuva suurempana';
  const img = document.createElement('img');
  const selite = `${taky.elain.charAt(0).toUpperCase()}${taky.elain.slice(1)}, ${maa}`;
  nappi.setAttribute('aria-label', `${selite} — avaa suurena`);
  img.alt = selite;
  img.decoding = 'async';
  img.loading = 'lazy';
  img.draggable = false;
  img.addEventListener('error', () => { kehys.hidden = true; }, { once: true });
  img.src = taky.kuva;
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
    avaaKohdeSuurennos(ui, { osoite: taky.kuva, selite }, () => nappi, 'elaintakyZoom');
  });
  kehys.appendChild(nappi);
  const teksti = html('figcaption', 'fokusnosto-kuvateksti');
  teksti.appendChild(html('span', 'fokusnosto-kuvaselite', selite));
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
  rivi.textContent = `Löytöpalkkio +${vastaus.palkkio} puntaa.`;
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
