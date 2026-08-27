/*
 * FOKUSKOHTEET — kartan erityiskohteet klikattaviksi.
 *
 * Omistajan tilaus 24.8.2026: *"Tee kartalla näkyvistä kohteista
 * klikattava pop up infoja"*. Raamatun osio "Fokusmoodi", kohta
 * ETENEMINEN: *"kartan erityiskohteista (vuoret, joet, muut kaupungit)
 * aukeaa pienet pop-up-tietoruudut"*, ja kohta KOHDEKOROSTUS: auki
 * oleva kohde nostetaan esiin.
 *
 * === MIKÄ ON KLIKATTAVA JA MIKÄ EI ===
 *
 * Fokuslehti (js/fokuskartta.js) on YKSI KUVA. Olympos, Thessaloniki ja
 * merten nimet ovat siihen poltettua painojälkeä — ei elementtejä,
 * joihin voisi ripustaa tapahtumankuuntelijan. Siksi tämä moduuli
 * piirtää lehden päälle oman kerroksensa, jossa jokaista kohdetta
 * kohti on pieni musteympyrä ja sen alla NÄKYMÄTÖN ≥44 px osuma-alue.
 * Merkki on se klikkauskohde, ja se istuu kuvan oman nimen viereen.
 *
 * === MIKSI OMA KERROS EIKÄ FOKUSVIRRAN VINJETTIKERROS ===
 *
 * Vinjetit (js/fokusvirta.js paivitaFokuskuvat) ovat virran
 * matkamuistoja: ne kertyvät sitä mukaa kun pöllö puhuu. Nämä merkit
 * ovat kartan omaisuutta ja näkyvät heti kun lehti on auki, riippumatta
 * siitä missä vaiheessa virta on. Kaksi eri elinkaarta, kaksi kerrosta.
 *
 * === KOLME SÄÄNTÖÄ, JOTKA ON PERITTY MUILTA KARTAN KERROKSILTA ===
 *
 * 1. JUURIRYHMÄN ULKOPUOLELLE (this.svg:n suora lapsi), koska kiertävän
 *    laudan <use>-kopiosta ei voi napauttaa mitään: tapahtuma osuisi
 *    <use>-elementtiin eikä sen sisältöön. Napautettavat merkit
 *    piirretään siksi oikeina elementteinä molempiin kohtiin
 *    (ui.kiertoKohdat) — sama ratkaisu kuin kohderenkailla.
 *
 * 2. EI SUODATTIMIA (tests/rules.test.mjs): suodatettu kerros palaa
 *    iOS:n taustalta tyhjänä. Vaalea kehä merkin alla on oma ympyränsä.
 *
 * 3. KARTAN MITTAKAAVA, EI RUUDUN (omistajan LOPULLINEN linjaus
 *    26.8.2026, Raamattu; kumoaa 25.8. kirjatun kiinteän ruutukoon):
 *    *"pisteiden pitäisi suurentua samalla kun karttaa suurentaa ja
 *    pienentyä karttaa zoomatessa ulospäin"*. Ankkuriryhmä on laudan
 *    koordinaateissa ja skaalataan VAKIOLLA (js/ui.js
 *    fokusMerkkiSkaala), joka on viritetty niin, että merkin lapset ovat
 *    ruudun pikseleitä LEHDEN PERUSTASOLLA — siinä näkymässä, johon
 *    saapumisajo maahan päätyy. Osuma-alueen r = 22 on siis 44 px
 *    läpimitta perustasolla, isompi lähennettäessä ja pienempi
 *    loitonnettaessa. Se on tarkoitus: napautettavaksi merkit syttyvät
 *    muutenkin vasta lähikuvassa (LEHDEN_VAHIN_OSUUS).
 *
 * === KUVA PIENENÄ, KLIK ISOKSI ===
 *
 * Raamatun osio "Fokusmoodi", kohta KUVAT KARTALLE: kuvat ovat kartalla
 * PIENENÄ ja pelaaja *"klikkaa ne auki isoksi"*. Omistajan pelitesti
 * iPadilla 24.8.2026 (kuvakaappaus Iraklionin tietoruudusta) osoitti,
 * ettei pop-upin kuvaviite totellut sitä: sitä saattoi vain katsoa
 * postimerkin kokoisena. Nyt viite on painike, ja napautus kasvattaa
 * kuvan kartan päälle (avaaKohdeSuurennos).
 *
 * OMA SUURENNOS EIKÄ FOKUSVIRRAN. Fokusvirran `avaaSuurennos` ei ole
 * vientilistalla (js/fokusvirta.js: funktio on moduulin sisäinen), eikä
 * tämä paketti saanut muokata sitä tiedostoa. Kopio olisi silti väärin
 * kahdesta muustakin syystä: fokusvirran kerros on luokaltaan
 * `.fokuszoom`, ja juuri sen ilmestyminen on tälle moduulille merkki
 * sulkea tietoruutu (ks. kuunteleKohdetta) — suurennos veisi mennessään
 * oman ankkurinsa. Siksi täällä on oma kevyt suurennos omalla luokallaan
 * ja SAMALLA ULKOASULLA (css/fokuskohteet.css peilaa .fokuszoom-tyylit).
 *
 * === KORTTI JA PÖLLÖ OVAT TYÖPARI (omistajan pelitesti 25.8.2026) ===
 *
 * Kortti EI enää katoa, kun pelaaja avaa pöllön: chat aukeaa sen
 * viereen, ja kortti väistyy paneelin tieltä (asetaKohteenPaikka).
 * Kolme kohtaa tekevät sen yhdessä:
 *
 *   1. SULKUSOPIMUKSEN POIKKEUS. Napautus pöllönapin tai -paneelin
 *      päällä ei ole "ulkopuolelle" (kuunteleKohdetta ulos) — juuri se
 *      sulki kortin ennen. Toiseen suuntaan sama sopimus on pöllön
 *      päässä: napautus kortin päällä ei sulje chattia (js/pollo.js
 *      seuraaSulkemista).
 *   2. KORTTI ON PÖLLÖN KONTEKSTISSA. Auki oleva kohde talletetaan
 *      `ui.fokuskohdeAuki.kohde`-kenttään, ja js/pollo.js lueNakyma
 *      lukee siitä nimen, tyypin ja tekstin samaan pakettiin, jolla
 *      lehti ja kartta jo kulkevat workerille.
 *   3. KAKSI VALMISTA KYSYMYSTÄ JA ALLEVIIVATUT SANAT ovat DATAA
 *      (`kysymykset`, `korostukset` js/packs/fokuskohteet-*.js) eivätkä
 *      koodia: napautus lähettää kysymyksen pöllölle (js/pollo.js
 *      polloKysy) ja kortti jää auki sen rinnalle.
 *
 * === MITÄ TÄSSÄ EI OLE ===
 *
 * TÄYSI NIUKKA-KARTTA-KOROSTUS. Raamatun KOHDEKOROSTUS lupaa kartan
 * piirtyvän muuten niukkana ja nostavan yhden kohteen esiin. Tässä
 * vaiheessa korostus on kevyt rengas auki olevan kohteen ympärillä.
 */
import { el, maare } from './mapart.js';
import { NOSTOSYM_LUOKAT, NOSTOSYM_TYYPIT, piirraNostosymboli } from './fokusnosto-symbolit.js';
import { asetaKuva } from './media.js';
import { html, jaaKappaleiksi } from './ui-apurit.js';
import { valokuvaSuurennos, valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { FOKUSKOHTEET_BGR } from './packs/fokuskohteet-bgr.js';
import { FOKUSKOHTEET_BIH } from './packs/fokuskohteet-bih.js';
import { FOKUSKOHTEET_EGY } from './packs/fokuskohteet-egy.js';
import { FOKUSKOHTEET_IRQ } from './packs/fokuskohteet-irq.js';
import { FOKUSKOHTEET_ITA } from './packs/fokuskohteet-ita.js';
import { FOKUSKOHTEET_ROU } from './packs/fokuskohteet-rou.js';
import { FOKUSKOHTEET_TUR } from './packs/fokuskohteet-tur.js';
import { FOKUSKOHTEET_GRC } from './packs/fokuskohteet-grc.js';
import { niputaFokusmerkit } from './fokusniput.js';
import { polloKysy } from './pollo.js';
import { sfx } from './sound.js';

/*
 * Maakohtaiset kohdelistat ISO-tunnuksella. Sama tunnus kuin
 * fokuskartan pohjilla (js/fokuskartta.js nykyinenMaa), jotta lehti ja
 * sen kohteet ovat aina samasta maasta. Uusi maa on yksi rivi tähän ja
 * yksi pakettitiedosto sen viereen.
 *
 * Bulgaria lisätty 25.8.2026 Sofian fokusvirran mukana — ja se oli
 * täsmälleen yksi rivi, kuten yllä luvattiin. Pohja BGR.webp ja BGR.json
 * ovat ämpärissä (tarkistettu 25.8.2026), joten merkit saavat lehden,
 * jonka päälle asettua.
 */
const KOHDE_MAAT = {
  GRC: FOKUSKOHTEET_GRC,
  BGR: FOKUSKOHTEET_BGR,
  ITA: FOKUSKOHTEET_ITA,
  TUR: FOKUSKOHTEET_TUR,
  ROU: FOKUSKOHTEET_ROU,
  BIH: FOKUSKOHTEET_BIH,
  /*
   * Egypti ja Irak tulivat mukaan 26.8.2026 kadonneiden ihmeiden erän
   * takia: Faroksen majakka, Aleksandrian kirjasto ja Babylonin
   * riippuvat puutarhat olisivat muuten jääneet ilman maata. Kummankin
   * lehti on jo ämpärissä (EGY.webp, IRQ.webp), joten merkit saavat
   * pohjan, jonka päälle asettua — se oli lisäyksen ainoa ehto.
   */
  EGY: FOKUSKOHTEET_EGY,
  IRQ: FOKUSKOHTEET_IRQ,
};

/** Osuma-alueen säde ruudun pikseleinä (44 px läpimitta). */
const KOHDE_OSUMA_R = 22;

/*
 * MERKIN OSAT RUUDUN PIKSELEINÄ LEHDEN PERUSTASOLLA (ks. sääntö 3
 * tiedoston alussa). Omistajan pelitestitilaus 26.8.2026 (iPhone,
 * Kreikka): *"Kaikkia pisteitä voisi hieman pienentää"* — ja saman
 * illan jatko: *"Kartan kohdenapit saisi olla hieman pienempiä"*.
 * Mitat ovat nyt kahden pienennyksen jäljiltä ~25 % alle
 * alkuperäisen (9,5 / 6,6 / 4,6 / 1,5 → 8,1-sarja → tämä) — merkki
 * on lehden painojäljen päällä merkintä eikä nappi, ja sen
 * löytämisen hoitaa muoto eikä koko.
 *
 * OSUMA-ALUE EI PIENENTYNYT. KOHDE_OSUMA_R on yhä 22 eli 44 px:n
 * sormisääntö perustasolla, joten napautus osuu täsmälleen yhtä
 * hyvin kuin ennen.
 */
const KOHDE_KOROSTUS_R = 6.0;
const KOHDE_HALO_R = 4.9;
const KOHDE_RENGAS_R = 3.4;
const KOHDE_PISTE_R = 1.15;

/** Pop-upin reunavara ja merkin ja kortin väliin jäävä rako. */
const KOHDE_MARGINAALI = 8;
const KOHDE_RAKO = 12;

/*
 * KORTTI IRTI RUUDUN YLÄ- JA ALALAIDASTA (omistajan pelitestitilaus
 * 26.8.2026: *"Pop-up-ikkunat avautuvat nyt joko ylä- tai alalaitaan.
 * Ne voisivat olla hieman enemmän irti laidoista, kun aukeavat, vähän
 * lähempänä keskustaa."*).
 *
 * Kortti tarttui ennen laitaan KOHDE_MARGINAALIn eli kahdeksan pikselin
 * päähän, ja pystysuunnassa juuri se on yleisin lopputulos: merkki on
 * lehden ylä- tai alaosassa, ja kortti keskitetään sen kohdalle.
 *
 * VARA ON OSUUS karttapinnan korkeudesta, jotta se tarkoittaa samaa
 * puhelimessa ja työpöydällä. Katto pitää huolen siitä, ettei kortille
 * jäävä katto kutistu isolla ruudulla turhaan, ja pohjana on entinen
 * marginaali. Vaakasuunta jää ennalleen: siellä kortti kääntyy merkin
 * toiselle puolelle eikä puskeudu laitaan.
 */
const KOHDE_LAITAVARA_OSUUS = 0.1;
const KOHDE_LAITAVARA_ENINTAAN = 96;

/*
 * Pop-upin kuvan pyyntöleveys. Kuva kasvoi 10 rem korkeaksi (omistaja
 * 26.8.2026 ilta: "kuva voisi olla hieman isompi jo heti tässä
 * näkymässä"), joten 480 px jäisi iPadin tuplatiheydellä pehmeäksi —
 * 800 px kattaa kortin leveyden @2x. Suurennos hakee yhä omansa.
 */
const KOHDE_KUVAN_PX = 800;

/**
 * Suurennoksen pyyntöleveys Commonsista (js/packs/africa-valokuvat.js
 * valokuvaSuurennos → commonsUrl).
 *
 * NOSTETTU 1600 → 2000 (omistajan pelitestipalaute v1119: *"Kuvat
 * saisi näkyä isommalla"*). Suurennos venyy nyt lähes koko ruudun
 * levyiseksi, ja iPadin kaksinkertaisella pikselitiheydellä 1600
 * pikseliä on 834 pisteen ruudulla jo alle kaksi laitepikseliä per
 * piste. Commonsin thumb-putki tuottaa pyydetyn leveyden suoraan
 * URL-parametrista, joten isompaa ei tarvitse hakea mistään muualta —
 * ja alkuperäistä isompaa se ei koskaan tee, joten pikselipuuroa ei
 * synny.
 */
const KOHDE_ZOOM_PX = 2000;

/** Tyyppien ylärivit. Tuntematon tyyppi saa yleisen otsikon. */
const KOHDE_TYYPIT = {
  kaupunki: 'Kaupunki',
  vuori: 'Vuori',
  meri: 'Meri',
  saari: 'Saari',
  joki: 'Joki',
  /*
   * MULTIMEDIA (omistajan tilaus v1119, kohta 19: *"uusi
   * karttamerkkityyppi 'multimedia/nähtävyyssivu' — SILMÄ-ikoni"*).
   * Kohde, jolla on katsottavaa muualla kuin lehden sivulla:
   * virtuaalikierros, panoraama tai vastaava. Merkki on silmä, ja
   * napautus avaa kierroksen pelin omaan ikkunaan (avaaKierros).
   */
  multimedia: 'Katsottavaa',
  /*
   * SYMBOLITAKSONOMIAN TYYPIT (Raamattu, omistaja 26.8.2026 ilta):
   * kohteen tyyppi kertoo kategorian, ja kategoria näkyy kartalla
   * omana symbolinaan (KOHDE_TYYPPISYMBOLIT alempana). Ylärivi on
   * pop-upin pieni otsake — partitiivi, koska se lupaa sisältöä.
   */
  historia: 'Historiaa',
  ruoka: 'Ruokaa ja juomaa',
  kulttuuri: 'Kulttuuria',
  tekniikka: 'Tekniikkaa',
  kauppa: 'Kauppaa',
  sana: 'Tarinoita',
  merenkulku: 'Merenkulkua',
  urheilu: 'Urheilua',
  elain: 'Eläimiä',
  kaupunki: 'Kaupunkielämää',
  muu: 'Kartalla',
};

/* ==================== TYYLI ==================== */

const KOHDE_TYYLIN_TUNNUS = 'fokuskohteet-tyyli';

/**
 * Oma tyylitiedosto sivulle, jos sitä ei vielä ole. Sama kaava ja sama
 * syy kuin fokusvirralla (js/fokusvirta.js lataaTyyli): css/styles.css
 * on toisen työvaiheen hallussa. Yhden tiedoston versiossa erillistä
 * linkkiä ei ole, koska tyylit ovat jo sivun <style>-lohkossa.
 *
 * NIMI ON PREFIKSOITU (lataaKohdeTyyli, KOHDE_*), koska yhden tiedoston
 * versio ketjuttaa kaikki moduulit samaan näkyvyysalueeseen: sama nimi
 * kahdessa tiedostossa olisi niputuksessa uudelleenjulistus
 * (tools/tarkista-niputus.mjs).
 */
function lataaKohdeTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KOHDE_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = KOHDE_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokuskohteet.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/* ==================== MITKÄ KOHTEET NÄKYVÄT ==================== */

/**
 * Minkä maan kohteet kuuluvat juuri nyt kartalle?
 *
 * Ehto on LEHTI, ei fokusmoodi sinänsä: merkit ovat lehden päällä
 * olevia merkintöjä, ja ilman lehteä ne leijuisivat pelilaudan
 * grafiikan päällä ilman mitään mihin tarttua. `fokusPohjaBbox` on
 * sama tieto, jolla peli piilottaa pallot lehden alta (js/ui.js
 * paivitaFokusPallot) — yksi totuus, ei toista ehtoa.
 *
 * Maa luetaan laudan omasta taulusta eikä fokuskartan muistikentästä:
 * sama päättely kuin js/fokuskartta.js nykyinenMaa, mutta ilman
 * riippuvuutta sen sisäiseen tilaan.
 */
function nykyisenMaanKohteet(ui) {
  if (!ui?.fokusPohjaBbox) return [];
  const taulu = ui.game?.pack?.map?.cityCountry;
  const kaupunki = ui.game?.cityOf?.();
  const iso = (taulu && kaupunki && taulu[kaupunki.id]) || null;
  const lista = iso ? KOHDE_MAAT[iso] : null;
  if (!lista) return [];
  const lauta = ui.game?.pack?.id;
  return lista
    .map((kohde) => ({ kohde, paikka: kohde.laudat?.[lauta] }))
    .filter(({ paikka }) => Number.isFinite(paikka?.x) && Number.isFinite(paikka?.y))
    /*
     * Vain lehden alueella olevat. Lehti on maan ikkuna, ja sen
     * ulkopuolelle jäävä merkki osuisi laudan omaan grafiikkaan —
     * pelaajalle se näyttäisi merkiltä ilman karttaa.
     */
    .filter(({ paikka }) => ui.fokusPohjanAlla?.(paikka.x, paikka.y));
}

/* ==================== MERKIT KARTALLE ==================== */

/** Kerros SVG:n juureen kerran; palauttaa null ilman karttaa. */
function varmistaKohdekerros(ui) {
  if (!ui.svg) return null;
  if (!ui.fokuskohdeKerros?.isConnected || ui.fokuskohdeKerros.ownerSVGElement !== ui.svg) {
    ui.fokuskohdeKerros = el('g', { class: 'fokuskohteet' }, ui.svg);
    ui.fokuskohdeAvain = null;
  }
  return ui.fokuskohdeKerros;
}

/*
 * KOHDEMERKIN SYMBOLI (Raamattu, SYMBOLITAKSONOMIA — omistaja
 * 26.8.2026 ilta): kohdemerkki kertoo kategoriansa symbolilla, ei
 * enää pelkällä pisteellä. Symbolit piirtää sama kirjasto kuin
 * täkysymbolit (js/fokusnosto-symbolit.js piirraNostosymboli) —
 * ei kopioita kahteen paikkaan; myös entinen kohdemerkin oma
 * silmäpiirtäjä (v1119) korvautui kirjaston silmällä.
 *
 * VALINTAJÄRJESTYS:
 *   0. KADONNUT MATKAKIRJAN IHME → tähti (Raamattu, osio "Matkakirjan
 *      ihmeet"; omistaja 27.8.2026: kokonaan kadonneella kohteella on
 *      kartalla *"suoraan oma TÄHTISYMBOLI"*). Tämä voittaa kohteen
 *      oman `symboli`-kentän tarkoituksella: Faros on merenkulkua ja
 *      kolossi historiaa, mutta kartalla niiden lupaus on sama ja
 *      harvinaisempi kuin kategoria — paikka, jota ei enää ole.
 *   1. kohteen oma `symboli`-kenttä, jos se on tunnettu kategoria;
 *   2. kohteella on kierros → silmä (v1119: katsottavaa muualla kuin
 *      lehdellä — tämä voittaa tyyppijohdon, koska kierros on
 *      napautuksen varsinainen lupaus);
 *   3. TYYPPIJOHTO alla olevasta taulusta;
 *   4. muuten null → vanha piste (tyypit `kaupunki` ja `muu` JÄÄVÄT
 *      pisteiksi — kaupunki on paikka eikä kategoria).
 *
 * Vihreä tuikkiva kohtaamispiste (js/fokuspiste.js) EI saa symbolia —
 * sen erilaisuus on sen merkki (Raamattu).
 */
const KOHDE_TYYPPISYMBOLIT = {
  // Luonto on yksi kategoria: vuoret, meret, saaret ja joet jakavat
  // vuorenhuippu ja aalto -symbolin.
  vuori: 'luonto',
  meri: 'luonto',
  saari: 'luonto',
  joki: 'luonto',
  multimedia: 'silma',
  historia: 'historia',
  ruoka: 'ruoka',
  kulttuuri: 'kulttuuri',
  tekniikka: 'tekniikka',
  kauppa: 'kauppa',
  sana: 'sana',
  merenkulku: 'merenkulku',
  urheilu: 'urheilu',
  elain: 'elain',
  // Kaupunkikin avaa kortin, joten silläkin on merkki (omistaja 26.8.2026).
  kaupunki: 'kaupunki',
};

function kohteenSymboli(kohde) {
  if (kohde?.ihme?.kadonnut && kohde.ihme.osoite) return 'ihme';
  if (NOSTOSYM_TYYPIT.has(kohde?.symboli)) return kohde.symboli;
  if (kohteenKierrokset(kohde).length) return 'silma';
  return KOHDE_TYYPPISYMBOLIT[kohde?.tyyppi] ?? null;
}

/*
 * Symbolin mittakaava kohdemerkissä: kirjasto piirtää ~21 px merkin
 * (täkysymbolin koko), kohdemerkki on halkaisijaltaan noin 14 px —
 * pienempi, koska kohteita on lehdellä toistakymmentä ja täky on
 * kartalla aina harvinaisempi kutsu. 16 → 14 (omistaja 26.8.2026
 * ilta: "Kartan kohdenapit saisi olla hieman pienempiä").
 */
/*
 * 14 -> 11 (omistaja 27.8.2026 aamu, iPhone-kaappaus Kreikasta:
 * "Pienennä kaikkia symboleita") — merkit täyttivät kapealla ruudulla
 * saariston niin, että kartta jäi niiden alle.
 */
const KOHDE_SYMBOLI_SKAALA = 11 / 21;

/** Symbolilaatan säde kohdemerkin mitassa (kirjaston laatta r = 10.4). */
const KOHDE_SYMBOLI_R = 10.4 * KOHDE_SYMBOLI_SKAALA;

/**
 * Yksi merkki: näkymätön osuma-alue ja kategorian symboli — tai
 * pistekohteilla vaalea kehä, musteympyrä ja piste. Korostusrengas on
 * valmiina paikallaan läpinäkyvänä — auki oleva kohde saa sen näkyviin
 * luokalla eikä uudella elementillä.
 */
function piirraKohdemerkki(ui, ryhma, kohde) {
  const g = el('g', { class: `fokuskohde fokuskohde-${kohde.tyyppi ?? 'muu'}` }, ryhma);
  g.dataset.kohde = kohde.id;
  g.setAttribute('role', 'button');
  g.setAttribute('tabindex', '0');
  g.setAttribute('aria-label', `${kohde.nimi}: avaa tietoruutu`);
  el('circle', { class: 'fokuskohde-osuma', r: KOHDE_OSUMA_R }, g);
  el('circle', { class: 'fokuskohde-korostus', r: KOHDE_KOROSTUS_R }, g);
  const symboli = kohteenSymboli(kohde);
  if (symboli) {
    // Alaryhmä kutistaa kirjaston merkin kohdemerkin mittaan; symbolin
    // omat luokat (nostosym-*) tyylittyvät css/styles.css:stä, joka on
    // aina ladattu — merkki ei siis odota fokusnosto.css:ää.
    piirraNostosymboli(el('g', {
      class: 'fokuskohde-symboli',
      transform: `scale(${KOHDE_SYMBOLI_SKAALA.toFixed(4)})`,
    }, g), symboli);
  } else {
    el('circle', { class: 'fokuskohde-halo', r: KOHDE_HALO_R }, g);
    el('circle', { class: 'fokuskohde-rengas', r: KOHDE_RENGAS_R }, g);
    el('circle', { class: 'fokuskohde-piste', r: KOHDE_PISTE_R }, g);
  }
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
    if (ui.fokuskohdeAuki?.id === kohde.id) suljeFokuskohde(ui);
    else avaaFokuskohde(ui, kohde);
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
 * KUTSUTAAN SAMASTA KOHDASTA KUIN VINJETIT (js/ui.js paivitaMaastonimet)
 * ja lisäksi silloin kun lehti saapuu verkosta (paivitaFokusPohja) —
 * muuten merkit odottaisivat seuraavaa kartan liikettä.
 *
 * TYÖ TEHDÄÄN VAIN KUN SISÄLTÖ MUUTTUI. Zoomi muuttaa vain ankkuri-
 * ryhmien muunnosta, ei yhtäkään solmua.
 */
/* ============ PÄÄLLEKKÄISET MERKIT ERILLEEN (esitys, ei data) ========
 *
 * Omistajan pelitestitilaus 26.8.2026 (iPhone-kuvakaappaus Kreikasta,
 * Parnassoksen seutu): *"Tuossa menee kaksi pistettä päällekkäin.
 * Niitä voisi keinotekoisesti siirtää poispäin toisistaan. Ei haittaa,
 * vaikka ne eivät ole sitten aivan oikealla paikalla kartan mukaan."*
 *
 * Delfoi on Parnassoksen rinteellä ja siis laudalla vain noin viiden
 * yksikön päässä vuoresta (ks. LEHDEN_VAHIN_OSUUS): merkkien vaaleat
 * kehät peittivät toisensa, ja päällimmäinen — jälkimmäisenä piirretty —
 * söi alemman napautuksen.
 *
 * SIIRTO ON ESITYSTÄ, EI DATAA. Sama sopimus kuin kohtaamispisteellä
 * (js/fokuspiste.js PISTE_ERO_MIN): kohteen omat koordinaatit
 * (js/packs/fokuskohteet-*.js) jäävät koskematta, ja vain PIIRTOPAIKKAA
 * työnnetään yhteysakselia pitkin niin, että kehät juuri erkanevat.
 * Popup ja napautus tulevat siirretystä paikasta ilman eri sääntöä,
 * koska molemmat lukevat merkin oman ruutulaatikon.
 *
 * MITTA ELÄÄ KARTAN MUKANA. Merkit ovat ruudun pikseleitä LEHDEN
 * PERUSTASOLLA (sääntö 3), joten vähimmäisetäisyys muunnetaan laudan
 * yksiköiksi samalla vakioskaalalla — merkki ja sen väli kasvavat
 * yhdessä, eli pari on päällekkäin joko joka zoomilla tai ei
 * yhdelläkään.
 */

/**
 * Merkkien vähin keskipiste-etäisyys ruudun pikseleinä perustasolla:
 * leveimmän merkin eli symbolilaatan HALKAISIJA (ennen taksonomiaa
 * vaalean kehän), jolloin laatat sipaisevat toisiaan mutta eivät mene
 * limittäin. Isompi luku heittäisi merkit kauas oikealta paikaltaan,
 * ja omistajan lupa siirtoon koski limittäisyyttä.
 */
const KOHDE_ERO_MIN = 2 * KOHDE_SYMBOLI_R;

/**
 * Rentoutuskierrosten määrä. Kolmen merkin ryppäässä yksi työntö voi
 * luoda uuden limittäisyyden, joten pareja käydään läpi muutamaan
 * kertaan; kierrokset loppuvat heti kun mikään ei enää liiku.
 */
const KOHDE_ERO_KIERROKSIA = 4;

/**
 * Esityssiirrot ryhmille (`sx`, `sy`) — deterministinen erottelupassi.
 *
 * DETERMINISTINEN KAHDESTA SYYSTÄ: parit käydään läpi aina samassa
 * järjestyksessä (ryhmät ovat datan järjestyksessä), ja täsmälleen
 * samassa pisteessä olevat merkit erotetaan indeksistä johdetulla
 * kiinteällä suunnalla eikä satunnaisluvulla. Sama lehti antaa siis
 * aina saman kartan.
 *
 * TYÖ TEHDÄÄN VAIN KUN MITTA MUUTTUI: vakioskaalalla vastaus on sama
 * niin kauan kuin lehti ja ruutukoko pysyvät (ui.fokuskohdeEroAvain).
 */
function eritteleKohdeRyhmat(ui, s) {
  const ryhmat = ui.fokuskohdeRyhmat ?? [];
  if (!ryhmat.length) return;
  const avain = `${ui.fokuskohdeAvain}:${s.toFixed(4)}`;
  if (ui.fokuskohdeEroAvain === avain) return;
  ui.fokuskohdeEroAvain = avain;
  const vahin = KOHDE_ERO_MIN * s;
  const paikat = ryhmat.map(({ x, y }) => ({ x, y }));
  for (let kierros = 0; kierros < KOHDE_ERO_KIERROKSIA; kierros += 1) {
    let liikkui = false;
    for (let i = 0; i < paikat.length; i += 1) {
      for (let j = i + 1; j < paikat.length; j += 1) {
        const a = paikat[i];
        const b = paikat[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let etaisyys = Math.hypot(dx, dy);
        if (etaisyys >= vahin) continue;
        if (!(etaisyys > 0)) {
          // Täsmälleen samassa pisteessä: kiinteä suunta indeksistä,
          // jotta myös tämä tapaus on sama joka ajolla.
          const kulma = (j * Math.PI) / 4;
          dx = Math.cos(kulma);
          dy = Math.sin(kulma);
          etaisyys = 1;
        }
        // Molempia puoliksi: pari erkanee, eikä kumpikaan siirry yksin.
        const puolikas = (vahin - etaisyys) / 2;
        const sx = (dx / etaisyys) * puolikas;
        const sy = (dy / etaisyys) * puolikas;
        a.x -= sx; a.y -= sy;
        b.x += sx; b.y += sy;
        liikkui = true;
      }
    }
    if (!liikkui) break;
  }
  for (let i = 0; i < ryhmat.length; i += 1) {
    ryhmat[i].sx = paikat[i].x - ryhmat[i].x;
    ryhmat[i].sy = paikat[i].y - ryhmat[i].y;
  }
}

/**
 * Ankkuriryhmien mittakaava — VAKIO, ei zoomin käänteisluku.
 *
 * `suhde` on käynnissä olevan nipistyseleen kerroin (1 = ei elettä), ja
 * vakioskaalassa se OHITETAAN: ele saa suurentaa merkit kartan mukana,
 * mikä on juuri se mitä omistaja pyysi. Vain lehdetön varapolku
 * (ui.fokusMerkkiSkaala) tarvitsee eleen vastaskaalan yhä.
 *
 * PAIKKA ON DATAN PAIKKA PLUS EROTTELUSIIRTO (eritteleKohdeRyhmat) —
 * paitsi kaupungin päälle osuneilla merkeillä, jotka yhteinen
 * kasauspassi (js/fokusniput.js) siirtää nippuun kaupungin oikealle
 * puolelle; nipun paikka korvaa sekä datan paikan että erottelusiirron.
 *
 * MUUNNOS KIRJOITETAAN VAIN JOS SE MUUTTUI (js/mapart.js maare —
 * v1158:n sääntö nimilapuilta). Panorointi ei liikuta yhtäkään
 * kohdemerkkiä laudalla eikä muuta mittakaavaa, joten tämä silmukka
 * kirjoitti sormen irrotessa 48 ryhmälle täsmälleen saman muunnoksen
 * kuin ennenkin — ja mitätöi 48 SVG-solmun asettelun juuri siinä
 * nykäyshetkessä. Mitattu 26.8.2026: 48 samanarvoista kirjoitusta
 * ryöpyssä, korjauksen jälkeen 0.
 */
function asetaKohdeMittakaava(ui, suhde) {
  const s = ui.fokusMerkkiSkaala?.(suhde);
  if (!(s > 0)) return;
  eritteleKohdeRyhmat(ui, s);
  niputaFokusmerkit(ui, s);
  const zoom = s.toFixed(4);
  for (const ryhma of ui.fokuskohdeRyhmat ?? []) {
    const x = (ryhma.nippu?.x ?? ryhma.x + (ryhma.sx ?? 0)).toFixed(2);
    const y = (ryhma.nippu?.y ?? ryhma.y + (ryhma.sy ?? 0)).toFixed(2);
    maare(ryhma.g, 'transform', `translate(${x} ${y}) scale(${zoom})`);
  }
}

export function paivitaFokuskohteet(ui) {
  if (typeof document === 'undefined') return;
  const kerros = varmistaKohdekerros(ui);
  if (!kerros) return;
  const kohteet = nykyisenMaanKohteet(ui);
  const avain = kohteet.length
    ? `${ui.game.pack.id}:${kohteet.map(({ kohde }) => kohde.id).join('|')}`
    : 'tyhja';
  if (ui.fokuskohdeAvain !== avain) {
    ui.fokuskohdeAvain = avain;
    kerros.textContent = '';
    ui.fokuskohdeRyhmat = [];
    // Erottelusiirrot lasketaan uusille ryhmille uudestaan.
    ui.fokuskohdeEroAvain = null;
    ui.fokuskohdeMerkit = new Map();
    if (!kohteet.length) suljeFokuskohde(ui);
    else lataaKohdeTyyli();
    for (const { kohde, paikka } of kohteet) {
      const merkit = [];
      // Kiertävällä laudalla sama merkki molempiin kohtiin: kopiosta ei
      // voi napauttaa mitään (ks. tiedoston alku, sääntö 1).
      for (const x of ui.kiertoKohdat?.(paikka.x) ?? [paikka.x]) {
        const ryhma = el('g', { class: 'fokuskohde-ryhma' }, kerros);
        ui.fokuskohdeRyhmat.push({ g: ryhma, x, y: paikka.y });
        merkit.push(piirraKohdemerkki(ui, ryhma, kohde));
      }
      ui.fokuskohdeMerkit.set(kohde.id, merkit);
    }
    // Auki ollut pop-up osoittaa nyt poistettuun solmuun: uusi merkki
    // samalle kohteelle otetaan korostukseen, muuten kortti sulkeutuu.
    if (ui.fokuskohdeAuki) {
      const merkki = ui.fokuskohdeMerkit.get(ui.fokuskohdeAuki.id)?.[0];
      if (merkki) {
        ui.fokuskohdeAuki.merkki = merkki;
        merkki.classList.add('auki');
      } else suljeFokuskohde(ui);
    }
  }
  const nakyva = ui.nakyvaAlue?.();
  const skaala = nakyva?.skaala;
  if (!skaala || !Number.isFinite(skaala) || skaala <= 0) return;
  /*
   * NÄKYVYYS ENNEN ASEMOINTIA. Tämä oli aiemmin asemoinnin JÄLKEEN, ja
   * järjestys jäi huomaamatta niin kauan kuin luokkaa luki vain CSS.
   * Kasauspassi (js/fokusniput.js) lukee sen nyt myös koodista —
   * yhdysviivaa ei piirretä piilotetun kerroksen merkkiin — ja
   * jäljessä oleva luokka tarkoitti, että passi näki edellisen kehyksen
   * tilan: yleiskuvasta lähennettäessä viivat jäivät pois siihen asti,
   * kunnes karttaa seuraavan kerran liikutettiin. Toisin päin (paluu
   * yleiskuvaan) viivat olisivat jääneet kehykseksi näkymään.
   *
   * Passi ei riipu näkyvyydestä eikä näkyvyys asemoinnista
   * (paivitaNakyvyys lukee vain lehden osuuden näkyvästä alueesta),
   * joten järjestyksen kääntäminen on turvallinen.
   */
  paivitaNakyvyys(ui, kerros, nakyva);
  asetaKohdeMittakaava(ui, 1);
  // Rekisteröinti nipistykseen jää (js/kartta.js vastaskaalaaMerkit),
  // vaikka vakioskaala ei enää tarvitse vastaskaalaa: varapolku
  // (lehdetön näkymä) on yhä ruutumitassa ja tarvitsee sen.
  (ui.nipistysVastaskaalaajat ??= new Set())
    .add(ui.fokuskohdeVastaskaala ??= (suhde) => asetaKohdeMittakaava(ui, suhde));
  // Kartta liikkui: auki oleva kortti seuraa merkkiään.
  if (ui.fokuskohdeAuki) asetaKohteenPaikka(ui);
}

/**
 * MERKIT SYTTYVÄT VASTA KUN LEHTI ON LÄHIKUVASSA.
 *
 * Yleiskuvassa koko Kreikka on parinkymmenen pikselin läiskä, ja
 * kaikkien kohteiden 44 pikselin osuma-alueet kasautuisivat samaan
 * kohtaan — pahimmillaan Ateenan oman laatan päälle, jolloin merkit
 * söisivät pelaajan napautuksen pelikohteesta. Sama oppi ja sama
 * ratkaisu kuin fokusnimillä (js/fokuskartta.js paivitaFokusNimet):
 * kerros piilotetaan luokalla, kun se ei ole käyttökelpoinen, eikä
 * yhtäkään solmua pureta.
 *
 * MITTA ON OSUUS, EI ZOOMITASO. Sama lauta on eri kokoinen puhelimessa
 * ja työpöydällä; ehto on siksi "kuinka suuren osan näkyvästä
 * kartasta lehti täyttää", jolloin raja tarkoittaa samaa asiaa
 * jokaisella ruudulla.
 *
 * TIEDOSSA OLEVA RAJA: Delfoi ja Parnassos ovat laudalla noin viiden
 * yksikön päässä toisistaan (pyhäkkö on vuoren rinteellä), joten
 * lehden peruszoomilla niiden osuma-alueet menevät päällekkäin ja
 * päällimmäinen — jälkimmäisenä piirretty — voittaa. Lähemmäs
 * zoomatessa ne erkanevat. Kummankin osuma pidetään mieluummin
 * täysikokoisena kuin kutistetaan sormelle liian pieneksi.
 */
const LEHDEN_VAHIN_OSUUS = 0.5;

function paivitaNakyvyys(ui, kerros, nakyva) {
  const pohja = ui.fokusPohjaBbox;
  const osuus = pohja && nakyva?.w > 0 ? pohja.w / nakyva.w : 0;
  const piiloon = osuus < LEHDEN_VAHIN_OSUUS;
  kerros.classList.toggle('fokuskohteet-piilossa', piiloon);
  if (piiloon) suljeFokuskohde(ui);
}

/** Laudan vaihto tai uusi peli: merkit pois ja muisti nollille. */
export function nollaaFokuskohteet(ui) {
  suljeFokuskohde(ui);
  ui.fokuskohdeAvain = null;
  ui.fokuskohdeEroAvain = null;
  ui.fokuskohdeRyhmat = [];
  ui.fokuskohdeMerkit = new Map();
  if (ui.fokuskohdeKerros?.isConnected) ui.fokuskohdeKerros.textContent = '';
}

/* ==================== POP-UP ==================== */

/** Sulkee auki olevan tietoruudun ja purkaa sen kuuntelijat. */
export function suljeFokuskohde(ui) {
  // Suurennos on tietoruudun kuvan jatke: kortin lähtiessä sen ankkuri
  // katoaa, joten se ei saa jäädä yksin kartan päälle.
  suljeKohdeSuurennos(ui);
  const auki = ui?.fokuskohdeAuki;
  if (!auki) return;
  ui.fokuskohdeAuki = null;
  auki.merkki?.classList.remove('auki');
  auki.popup?.remove();
  if (auki.purku) auki.purku();
}

/** Auki oleva pöllöpaneeli ruudun koordinaateissa, tai null. */
function kohdePolloPaneeli() {
  const paneeli = document.querySelector('.pollo-paneeli');
  if (!paneeli || paneeli.hidden) return null;
  const r = paneeli.getBoundingClientRect();
  return r.width > 0 && r.height > 0 ? r : null;
}

/**
 * Kortin paikka merkin viereen.
 *
 * NELJÄ PAKKOA: kortti ei valu ruudun (karttapaneelin) ulkopuolelle,
 * se ei peitä alanappeja — vuorolaatikko luetaan ruudulta eikä
 * arvata — se väistää auki olevaa pöllöpaneelia, ja jos pystysuunnassa
 * on ahdasta, kortti saa oman kattonsa ja loppu vieritetään sen
 * sisällä. Vaakasuunnassa kortti menee mieluiten merkin OIKEALLE
 * puolelle ja kääntyy vasemmalle vasta jos ei mahdu; niin merkki jää
 * näkyviin kortin viereen.
 *
 * PYSTYSUUNNAN LAIDAT OVAT VÄLJEMMÄT (KOHDE_LAITAVARA_OSUUS, omistajan
 * pelitestitilaus 26.8.2026): ylä- tai alalaitaan asettuva kortti jää
 * selvästi irti reunasta, lähemmäs keskustaa.
 *
 * PÖLLÖN VÄISTÖ ON KAKSIVAIHEINEN. Paneeli on kiinteä ja asuu oikeassa
 * alanurkassa, mutta kapealla ruudulla (css/styles.css max-width 560px)
 * se levittäytyy reunasta reunaan. Jos paneelin vasemmalle puolelle
 * mahtuu koko kortti, kortti menee sinne; muuten se nousee paneelin
 * yläpuolelle ja saa sieltä oman kattonsa. Kortin vähimmäiskorkeus
 * voittaa yhä molemmat: mieluummin kapea kaista kortin alalaidasta
 * paneelin alle kuin kortti, jota ei voi lukea.
 */
function asetaKohteenPaikka(ui) {
  const auki = ui.fokuskohdeAuki;
  if (!auki?.popup?.isConnected || !auki.merkki?.isConnected) return;
  // Pelaajan raahaama kortti pysyy siinä, mihin se raahattiin
  // (raahausTaiSulku) — automaattinen asemointi ei kilpaile käden kanssa.
  if (auki.raahattu) return;
  const koti = auki.popup.offsetParent ?? auki.popup.parentNode;
  const pane = koti?.getBoundingClientRect?.();
  if (!pane || !(pane.width > 0)) return;
  const m = auki.merkki.getBoundingClientRect();

  /*
   * PYSTYSUUNNAN LAIDAT OVAT VÄLJEMMÄT KUIN VAAKASUUNNAN
   * (KOHDE_LAITAVARA_OSUUS): kortti aukeaa lähemmäs keskustaa eikä
   * tartu ylä- tai alalaitaan kiinni.
   */
  const laitavara = Math.min(
    KOHDE_LAITAVARA_ENINTAAN,
    Math.max(KOHDE_MARGINAALI, Math.round(pane.height * KOHDE_LAITAVARA_OSUUS)),
  );
  // Alanapit: vuorolaatikko kelluu kapealla ruudulla kartan päällä.
  let alaraja = pane.bottom - laitavara;
  const ylaraja = pane.top + laitavara;
  let oikeaRaja = pane.right - KOHDE_MARGINAALI;
  const vasenRaja = pane.left + KOHDE_MARGINAALI;
  const napit = document.querySelector('.turn-card')?.getBoundingClientRect();
  if (napit && napit.height > 0 && napit.right > pane.left && napit.left < pane.right
    && napit.top > pane.top) {
    alaraja = Math.min(alaraja, napit.top - KOHDE_MARGINAALI);
  }

  // Leveys on tyylistä eikä katosta, joten se voidaan mitata jo tässä.
  const leveys = auki.popup.getBoundingClientRect().width;
  const chat = kohdePolloPaneeli();
  if (chat && chat.right > vasenRaja && chat.left < oikeaRaja && chat.bottom > pane.top) {
    if (chat.left - vasenRaja >= leveys + KOHDE_RAKO) {
      oikeaRaja = Math.min(oikeaRaja, chat.left - KOHDE_RAKO);
    } else {
      alaraja = Math.min(alaraja, chat.top - KOHDE_MARGINAALI);
    }
  }

  const katto = Math.max(140, Math.round(alaraja - ylaraja));
  auki.popup.style.maxHeight = `${katto}px`;

  const korkeus = auki.popup.getBoundingClientRect().height;
  let vasen = m.right + KOHDE_RAKO;
  if (vasen + leveys > oikeaRaja) vasen = m.left - KOHDE_RAKO - leveys;
  vasen = Math.max(vasenRaja, Math.min(vasen, oikeaRaja - leveys));
  let ylin = m.top + m.height / 2 - korkeus / 2;
  ylin = Math.min(ylin, alaraja - korkeus);
  ylin = Math.max(ylaraja, ylin);
  auki.popup.style.left = `${Math.round(vasen - pane.left)}px`;
  auki.popup.style.top = `${Math.round(ylin - pane.top)}px`;
}

/**
 * Kortin paikka uudelleen sen jälkeen, kun pöllöpaneeli on ehtinyt
 * avautua tai sulkeutua. Kaksi mittausta: heti seuraavalla kehyksellä
 * ja vielä hetken päästä — paneelin oma korkeus asettuu vasta kun sen
 * sisältö on ladottu, eikä tästä tiedostosta kuunnella sen tilaa.
 */
function siirraKohdeMyohemmin(ui) {
  globalThis.requestAnimationFrame?.(() => asetaKohteenPaikka(ui));
  setTimeout(() => asetaKohteenPaikka(ui), 260);
}

/**
 * Valmis kysymys pöllölle kortista käsin.
 *
 * KORTTI JÄÄ AUKI (omistajan tilaus 25.8.2026): chat aukeaa sen
 * viereen ja kortti väistää paneelia. Kysymys menee js/pollo.js:n
 * omaa ohjelmallista reittiä, joten se näkyy chatissa täsmälleen kuin
 * pelaajan itse kirjoittamana.
 */
function kysyKohteesta(ui, kysymys) {
  const lahti = polloKysy(kysymys);
  siirraKohdeMyohemmin(ui);
  return lahti;
}

/**
 * Kortin kuva: pieni viite, jota NAPAUTTAMALLA SE KASVAA ISOKSI.
 *
 * Raamatun KUVAT KARTALLE -linjaus (*"pienenä, klik isoksi"*) ja
 * omistajan iPad-pelitesti 24.8.2026. Kuva on siksi <button>-painikkeen
 * sisällä eikä paljaana kuvana — kahdesta syystä:
 *
 *   1. NAPPI ON NÄPPÄIMISTÖLLÄ SAAVUTETTAVISSA, paljas <img> ei.
 *   2. KORTIN OMA SULKUSOPIMUS TOTTELEE SITÄ. Pop-upin päällä napautus
 *      on sulku, mutta painikkeen tai linkin päällä valinta (ks.
 *      avaaFokuskohde). Painikkeena kuva saa napautuksensa itselleen
 *      ilman että kortti katoaa sen alta.
 *
 * PUUTTUVA KUVA POISTAA KUVAPAIKAN kokonaan, kuten fokusvirran kortilla:
 * tyhjä kehys ja sitä selittävä kuvateksti olisi pahempi kuin pelkkä
 * teksti. Peilin ja Commonsin välinen porras on median omassa
 * asettajassa (js/media.js asetaKuva), joten sitä ei kirjoiteta tähän
 * uudestaan.
 */
/*
 * USEAMPI KUVA SAMAAN KORTTIIN (Raamattu, eläinkohteen kuvasäännön
 * laajennus — omistaja 26.8.2026 ilta: "Söpö kohteissa voisi olla
 * useampikin kuva jos vain löytyy"): kohde saa `kuva`-kentän rinnalle
 * valinnaisen `kuvat`-listan, ja jokainen piirtyy omana kehyksenään
 * selitteineen peräkkäin — kortti on jo vieritettävä. Yhden kuvan
 * kohteet toimivat ennallaan.
 */
/*
 * PÄÄKUVA ENSIN, LISÄKUVAT PERÄSSÄ (tarkennus 26.8.2026, kadonneiden
 * ihmeiden erä). Ennen `kuvat` KORVASI `kuva`-kentän, mikä pakotti
 * toistamaan pääkuvan listassa, jos kohteelle halusi lisäkuvan. Nyt
 * listat ketjutetaan: `kuva` on kohteen pääkuva (sitä lukee myös
 * fokusvirran pinni, js/fokusvirta.js) ja `kuvat` on sen jatke.
 * Sama tiedosto molemmissa piirretään silti vain kerran, joten vanhat
 * kohteet (Srebarnan pelikaanit, Vanin kissa — pelkkä `kuvat`) ja uudet
 * (pääkuva + havainnekuva) toimivat kummatkin ennallaan.
 */
/* ============== MATKAKIRJAN IHME: NAUHA, TÄHTI JA NAPPI ============
 *
 * Raamattu, osio "Matkakirjan ihmeet" (omistaja 27.8.2026): *"kadonnut
 * suuruus palautetaan pelaajan silmien eteen FOTOREALISTISENA KESKELLÄ
 * NYKYMAAILMAA … Saa kokea pienen ihmeen kun näkee jotain mitä on jo
 * tavallaan kadonnut nykymaailmasta."*
 *
 * KAKSI ESITYSTAPAA, YKSI KUVA. Kohteella on valinnainen `ihme`-kenttä
 * (js/packs/fokuskohteet-*.js): `{ osoite, selite, lahde, kadonnut }`.
 *
 *   • `kadonnut: true` — kohdetta ei ole enää olemassa. Kartalla merkki
 *     on TÄHTI (kohteenSymboli), ja ihmekuva on kortin ENSIMMÄINEN
 *     kuva: napautus vie suoraan suurennokseen, ilman välinappia.
 *   • `kadonnut: false` — kohde on yhä pystyssä. Kartalla on kohteen
 *     tavallinen merkki, ja kortin yläosaan heti otsikon alle tulee
 *     "Koe ihme" -nappi, joka avaa ihmekuvan suurennoksena. Kuva ei ole
 *     kuvalistassa: kohteella on jo oma valokuva, ja kaksi rinnakkaista
 *     näkymää samasta paikasta hukuttaisi yllätyksen.
 *
 * NAUHAN PIIRTÄÄ PELI, EI KUVATIEDOSTO (Raamattu: *"peli piirtää nauhan
 * kuvan päälle, sitä ei polteta kuvatiedostoon"*). Nauha on DOM-elementti
 * kuvan vasemmassa yläkulmassa, ja SAMA komponentti (piirraIhmenauha)
 * käytetään kortin kuvapaikassa ja suurennoksessa — kaksi kopiota
 * erkanisi ensimmäisessä tyylimuutoksessa. Kuvaolio kantaa nauhan
 * tekstin kentässä `nauha`, joten piirtäjien ei tarvitse tietää
 * ihmeistä mitään: nauha on kuvan ominaisuus siinä missä selitekin.
 * =================================================================== */

/** Nauhan teksti — yksi totuus kortissa ja suurennoksessa. */
const KOHDE_IHMENAUHA = 'Matkakirjan ihme';

/**
 * Kohteen ihmekuva kuvaoliona, tai null jos kohteella ei ole ihmettä.
 * Palautettu olio on kuvalistan kanssa samaa muotoa (`osoite`, `selite`,
 * `lahde`) ja kantaa lisäksi nauhan tekstin.
 */
function kohteenIhmekuva(kohde) {
  const ihme = kohde?.ihme;
  if (!ihme?.osoite) return null;
  return {
    osoite: ihme.osoite,
    selite: ihme.selite ?? '',
    lahde: ihme.lahde ?? '',
    nauha: KOHDE_IHMENAUHA,
  };
}

/**
 * Pergamenttinauha kuvan vasempaan yläkulmaan. Kutsuja antaa sen
 * elementin, jonka sisällä nauha kelluu (kortissa kuvanappi,
 * suurennoksessa kuvan oma kehys) — asemointi on css:ssä.
 */
function piirraIhmenauha(isanta, teksti) {
  if (!teksti) return null;
  const nauha = html('span', 'fokuskohde-ihmenauha', teksti);
  nauha.setAttribute('aria-hidden', 'true');
  isanta.appendChild(nauha);
  return nauha;
}

/**
 * "Koe ihme" -nappi kortin yläosaan, jos kohde on YHÄ OLEMASSA ja
 * sillä on ihmekuva. Nappi kantaa saman tähden kuin kadonneiden
 * kohteiden karttamerkki: sama lupaus, sama merkki.
 */
function piirraIhmenappi(ui, sisalto, kohde) {
  const kuva = kohteenIhmekuva(kohde);
  if (!kuva || kohde.ihme.kadonnut) return;
  const nappi = html('button', 'fokuskohde-ihmenappi');
  nappi.type = 'button';
  const tahti = el('svg', {
    class: 'fokuskohde-ihmetahti',
    viewBox: '-12 -12 24 24',
    'aria-hidden': 'true',
  }, nappi);
  piirraNostosymboli(el('g', {}, tahti), 'ihme');
  nappi.appendChild(document.createTextNode(kohde.ihme.nappi ?? 'Koe ihme'));
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    avaaKohdeSuurennos(ui, kuva, () => nappi);
  });
  sisalto.appendChild(nappi);
}

function piirraKohdeKuvat(ui, sisalto, kohde) {
  const nahty = new Set();
  // Kadonneen ihmeen kuva on kortin ENSIMMÄINEN kuva (ks. lohkon alku):
  // kortti avaa suoraan sen, mitä paikalla ei enää ole.
  const ihme = kohde.ihme?.kadonnut ? kohteenIhmekuva(kohde) : null;
  const lista = [ihme, kohde.kuva, ...(Array.isArray(kohde.kuvat) ? kohde.kuvat : [])]
    .filter((kuva) => {
      const tunnus = kuva?.tiedosto ?? kuva?.osoite;
      if (!tunnus || nahty.has(tunnus)) return false;
      nahty.add(tunnus);
      return true;
    });
  for (const kuva of lista) piirraKohdeKuva(ui, sisalto, kuva);
}

/*
 * KAKSI KUVALÄHDETTÄ. `tiedosto` on Commonsin nimi ja kulkee median
 * portaikon läpi (paikallinen kopio → peili → Commons); `osoite` on
 * valmis polku repossa olevaan tiedostoon, ja sitä käyttävät pelin
 * OMAT generoidut havainnekuvat (assets/kartat/ihmeet/), joilla ei ole
 * Commons-nimeä eikä varareittiä. Puuttuva tiedosto poistaa kuvapaikan
 * kokonaan, joten kohde toimii jo ennen kuin kuvaerä on generoitu.
 *
 * PORRAS ON ERI, JA SIKSI ASETTAJAKIN ON ERI. Verkkokuva kulkee median
 * asettajan (js/media.js asetaKuva) läpi, joka uusii pyynnön neljän
 * sekunnin päästä ennen kuin luovuttaa — se on oikea sääntö purskeen
 * takana yskähtävälle palvelimelle. Repon oma tiedosto joko on tai ei
 * ole: uusinta ei löytäisi sitä toisellakaan kerralla, ja odotus
 * jättäisi kortille neljäksi sekunniksi tyhjän kehyksen kuvatekstin
 * päälle. Siksi `osoite` luovuttaa heti.
 */
function asetaKohdeKuva(img, kuva, leveys, onVirhe) {
  if (kuva.osoite) {
    img.addEventListener('error', () => onVirhe(), { once: true });
    img.src = kuva.osoite;
    return;
  }
  asetaKuva(img, valokuvaUrl(kuva.tiedosto, leveys),
    valokuvaVara(kuva.tiedosto, leveys), onVirhe);
}

function piirraKohdeKuva(ui, sisalto, kuva) {
  if (!kuva?.tiedosto && !kuva?.osoite) return;
  const kehys = html('figure', 'fokuskohde-kuva');
  const nappi = html('button', 'fokuskohde-kuvanappi');
  nappi.type = 'button';
  nappi.title = 'Katso kuva suurempana';
  nappi.setAttribute('aria-label', 'Katso kuva suurempana');
  const img = document.createElement('img');
  img.decoding = 'async';
  img.draggable = false;
  img.alt = kuva.selite ?? '';
  asetaKohdeKuva(img, kuva, KOHDE_KUVAN_PX, () => kehys.remove());
  nappi.appendChild(img);
  // Nauha napin sisään eikä kehykseen: kehyksessä on myös kuvateksti,
  // ja nauhan on jäätävä kuvan päälle sen vasempaan yläkulmaan.
  piirraIhmenauha(nappi, kuva.nauha);
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    avaaKohdeSuurennos(ui, kuva, () => nappi);
  });
  kehys.appendChild(nappi);
  if (kuva.selite || kuva.lahde) {
    const teksti = html('figcaption', 'fokuskohde-kuvateksti', kuva.selite ?? '');
    // CC BY vaatii tekijän maininnan: lähde on aina kuvan vieressä.
    if (kuva.lahde) teksti.appendChild(html('span', 'fokuskohde-kuvalahde', kuva.lahde));
    kehys.appendChild(teksti);
  }
  sisalto.appendChild(kehys);
}

/* ========== ALLEVIIVATUT SANAT JA KAKSI VALMISTA KYSYMYSTÄ ==========
 *
 * Omistajan tilaus 25.8.2026. Molemmat ovat DATAA eivätkä koodia:
 * kohteella on valinnainen `korostukset`-lista ja valinnainen
 * `kysymykset`-lista (js/packs/fokuskohteet-*.js). Uusi kohde saa
 * kummatkin ilman että tähän tiedostoon kosketaan.
 *
 * MERKINTÄ ON SAMA KUIN PÖLLÖLINKEISSÄ (js/pollo.js puraPutki):
 * `'perusmuoto|näkyvä muoto'`. Tekstissä alleviivataan taivutettu muoto,
 * mutta kysymys tehdään perusmuodosta — "Kerro lisää: minolaiset" on
 * kysymys, "Kerro lisää: minolaisen" ei ole. Ilman putkea muodot ovat
 * samat.
 *
 * SANA MERKITÄÄN KERRAN. Sama sana voi toistua tekstissä, mutta toinen
 * ja kolmas alleviivaus tekisivät kappaleesta linkkiviidakon; jäljellä
 * olevista korostuksista poistetaan aina se, joka juuri osui.
 */

/** Yhden korostuksen kaksi muotoa. Tyhjä merkintä jätetään pois. */
function puraKorostus(merkinta) {
  const teksti = String(merkinta ?? '').trim();
  if (!teksti) return null;
  const putki = teksti.indexOf('|');
  if (putki < 0) return { perus: teksti, nakyva: teksti };
  const perus = teksti.slice(0, putki).trim();
  const nakyva = teksti.slice(putki + 1).trim();
  if (!perus || !nakyva) return null;
  return { perus, nakyva };
}

/** Napautettava sana leipätekstin sisällä. */
function piirraKorostettuSana(ui, kohde, korostus, nakyvaTeksti) {
  const nappi = html('button', 'fokuskohde-sana', nakyvaTeksti);
  nappi.type = 'button';
  nappi.title = `Kysy pöllöltä lisää: ${korostus.perus}`;
  nappi.setAttribute('aria-label', `Kysy pöllöltä lisää: ${korostus.perus}`);
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    kysyKohteesta(ui, `Kerro lisää: ${korostus.perus} (kohteessa ${kohde.nimi})`);
  });
  return nappi;
}

/**
 * Yksi kappale, jossa jäljellä olevat korostukset ovat painikkeina.
 *
 * Teksti asetetaan aina TEKSTISOLMUINA eikä merkkauksena — sama sääntö
 * kuin pöllön vastauksissa (js/pollo.js): pelin oma aineisto on tekstiä,
 * eikä siitä tulkita hakasulkeita, kulmasulkeita tai mitään muutakaan.
 */
function piirraKohdeKappale(ui, kohde, kappale, jaljella) {
  const p = html('p', '');
  let loppu = kappale;
  for (;;) {
    let osuma = null;
    const matala = loppu.toLowerCase();
    for (const korostus of jaljella) {
      const kohta = matala.indexOf(korostus.nakyva.toLowerCase());
      if (kohta < 0) continue;
      if (!osuma || kohta < osuma.kohta) osuma = { kohta, korostus };
    }
    if (!osuma) break;
    const pituus = osuma.korostus.nakyva.length;
    if (osuma.kohta > 0) p.appendChild(document.createTextNode(loppu.slice(0, osuma.kohta)));
    // Näkyvä teksti otetaan KAPPALEESTA eikä datasta: kirjoitusasu
    // (iso alkukirjain, tarkkeet) on tekstin oma, ei merkinnän.
    p.appendChild(piirraKorostettuSana(ui, kohde, osuma.korostus,
      loppu.slice(osuma.kohta, osuma.kohta + pituus)));
    loppu = loppu.slice(osuma.kohta + pituus);
    jaljella.delete(osuma.korostus);
  }
  if (loppu) p.appendChild(document.createTextNode(loppu));
  return p;
}

/** Kortin leipäteksti kappaleittain, korostukset painikkeina. */
function piirraKohdeTeksti(ui, sisalto, kohde) {
  const jaljella = new Set(
    (Array.isArray(kohde.korostukset) ? kohde.korostukset : [])
      .map(puraKorostus).filter(Boolean),
  );
  const teksti = html('div', 'fokuskohde-teksti');
  for (const kappale of jaaKappaleiksi(kohde.teksti)) {
    teksti.appendChild(piirraKohdeKappale(ui, kohde, kappale, jaljella));
  }
  sisalto.appendChild(teksti);
}

/** Kortin loppuun enintään kaksi valmista kysymystä pöllölle. */
function piirraKohdeKysymykset(ui, sisalto, kohde) {
  const kysymykset = (Array.isArray(kohde.kysymykset) ? kohde.kysymykset : [])
    .map((k) => String(k ?? '').trim()).filter(Boolean).slice(0, 2);
  if (!kysymykset.length) return;
  // Omistaja 25.8.2026: "Ennen kysymyksiä voisi olla lause: kysy
  // pöllöltä" — kertoo, mihin pisteviivanapit johtavat.
  sisalto.appendChild(html('p', 'fokuskohde-kysy-otsikko', 'Kysy pöllöltä:'));
  const rivi = html('div', 'fokuskohde-kysymykset');
  rivi.setAttribute('role', 'group');
  rivi.setAttribute('aria-label', `Kysy pöllöltä: ${kohde.nimi}`);
  for (const kysymys of kysymykset) {
    const nappi = html('button', 'fokuskohde-kysymys', kysymys);
    nappi.type = 'button';
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      kysyKohteesta(ui, kysymys);
    });
    rivi.appendChild(nappi);
  }
  sisalto.appendChild(rivi);
}

/* ============ VIRTUAALIKIERROS PELIN SISÄLLÄ (v1119, kohta 19) ======
 *
 * Omistajan tilaus: *"omistaja löysi acropolisvirtualtour.gr ja haluaa
 * sen aukeavan PELIN SISÄLLÄ ikkunaan, lisättynä suoraan kartalle omalla
 * nähtävyys/multimedia-ikonilla"*.
 *
 * AVAUSTAPA ON DATASSA, EI PALVELIMEN OTSAKKEISSA (kartoitus
 * 26.8.2026): moni kierrossivusto sallii kehyksen teknisesti mutta
 * KIELTÄÄ sen käyttöehdoissaan — esimerkiksi Kreikan
 * kulttuuriministeriön ehdot vaativat sivujen latautuvan omaan
 * ikkunaansa, vaikka acropolisvirtualtour.gr ei lähetä
 * X-Frame-Options- eikä CSP-otsaketta. Siksi jokainen kierros kantaa
 * kentän `avaustapa`: 'upotus' avaa pelin sisäisen ikkunan (vain kun
 * upotus on sekä teknisesti sallittu että ehtojen mukaan tarkoitettu,
 * kuten museoiden itse julkaisemat embed-osoitteet), 'linkki' avaa
 * kierroksen suoraan laitteen selaimeen eikä kehystä edes yritetä.
 * Ilman kenttää oletus on 'linkki' — ehtoja ei rikota vahingossa.
 *
 * VARAPOLKU ON SILTI OLEMASSA. Kolmannen osapuolen sivu voi vaihtaa
 * otsakkeitaan milloin tahansa, ja WKWebView voi torjua kehyksen omista
 * syistään. Ikkunan otsikkorivillä on siksi aina "Avaa selaimessa"
 * -linkki (target=_blank, rel=noopener) — kuori vie sen ulkoiseen
 * selaimeen — ja jos kehys ei lataudu kymmenessä sekunnissa, ikkuna
 * kertoo sen ja tarjoaa saman linkin isona nappina.
 *
 * IKKUNA ON SAMAA PERHETTÄ KUIN KOHDEPOPUP: pergamenttikehys, ruksi
 * ja raahattava otsikkorivi — mutta lähes koko ruudun kokoinen, koska
 * kierros on katsottavaa eikä luettavaa.
 * =================================================================== */

/** Kuinka kauan kehyksen latautumista odotetaan ennen varapolkua. */
const KIERROS_ODOTUS_MS = 10000;

/**
 * Kohteen kierrokset yhtenä listana. Yksi kierros annetaan kenttänä
 * `kierros`, useampi listana `kierrokset` (esim. Akropolis-museon kolme
 * galleriaa) — kumpikin kelpaa, eikä dataa tarvitse muotoilla uusiksi
 * yhden kierroksen kohteissa.
 */
function kohteenKierrokset(kohde) {
  if (Array.isArray(kohde?.kierrokset)) return kohde.kierrokset.filter((k) => k?.url);
  return kohde?.kierros?.url ? [kohde.kierros] : [];
}

/**
 * "Avaa kierros" -nappi tietoruutuun, jos kohteella on kierros.
 *
 * Nappi eikä suora avaus: tietoruutu kertoo ensin mistä on kyse ja
 * mistä kierros on peräisin, ja vasta sitten pelaaja päättää avaako
 * hän koko ruudun kokoisen ikkunan.
 */
function piirraKierrosnappi(ui, sisalto, kohde) {
  for (const kierros of kohteenKierrokset(kohde)) {
    if (kierros.avaustapa !== 'upotus') {
      // Linkkikierros: suoraan laitteen selaimeen. Kuori (WKWebView) vie
      // target="_blank"-linkin ulkoiseen selaimeen.
      const linkki = html('a', 'fokuskohde-kierrosnappi', `${kierros.nappi ?? 'Avaa kierros'} ↗`);
      linkki.href = kierros.url;
      linkki.target = '_blank';
      linkki.rel = 'noopener noreferrer';
      linkki.addEventListener('click', (tapahtuma) => tapahtuma.stopPropagation());
      sisalto.appendChild(linkki);
      continue;
    }
    const nappi = html('button', 'fokuskohde-kierrosnappi', kierros.nappi ?? 'Avaa kierros');
    nappi.type = 'button';
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      avaaKierros(ui, kohde, kierros);
    });
    sisalto.appendChild(nappi);
  }
}

/** Sulkee auki olevan kierrosikkunan. */
export function suljeKierros(ui) {
  const auki = ui?.kierrosIkkuna;
  if (!auki) return;
  ui.kierrosIkkuna = null;
  clearTimeout(auki.ajastin);
  document.removeEventListener('keydown', auki.nappain, true);
  auki.kerros.remove();
}

/**
 * Virtuaalikierros pelin omaan ikkunaan (v1119, kohta 19b).
 *
 * @param {object} ui
 * @param {{nimi:string, kierros:{url:string, otsikko?:string, lahde?:string}}} kohde
 */
function avaaKierros(ui, kohde, kierros = kohteenKierrokset(kohde)[0]) {
  if (typeof document === 'undefined') return null;
  if (!kierros?.url) return null;
  sfx.play('popup');
  suljeKierros(ui);
  lataaKohdeTyyli();

  const kerros = html('div', 'fokuskierros');
  kerros.setAttribute('role', 'dialog');
  kerros.setAttribute('aria-modal', 'true');
  kerros.setAttribute('aria-label', kierros.otsikko ?? kohde.nimi);
  const ikkuna = html('div', 'fokuskierros-ikkuna');
  const ylarivi = html('div', 'fokuskierros-ylarivi');
  ylarivi.appendChild(html('span', 'fokuskierros-otsikko', kierros.otsikko ?? kohde.nimi));
  /*
   * ULKOINEN LINKKI AINA NÄKYVISSÄ. Kuori (WKWebView) vie
   * target="_blank" -linkin laitteen omaan selaimeen, jossa kierros
   * saa käyttöönsä kaiken, mitä kehys ei anna — koko ruudun, sensorit
   * ja täyden näytön.
   */
  const ulos = html('a', 'fokuskierros-ulos', 'Avaa selaimessa ↗');
  ulos.href = kierros.url;
  ulos.target = '_blank';
  ulos.rel = 'noopener noreferrer';
  ylarivi.appendChild(ulos);
  const sulje = html('button', 'fokuskierros-sulje', '✕');
  sulje.type = 'button';
  sulje.setAttribute('aria-label', 'Sulje kierros');
  sulje.addEventListener('click', () => suljeKierros(ui));
  ylarivi.appendChild(sulje);
  ikkuna.appendChild(ylarivi);

  const kehys = document.createElement('iframe');
  kehys.className = 'fokuskierros-kehys';
  kehys.src = kierros.url;
  kehys.title = kierros.otsikko ?? kohde.nimi;
  kehys.setAttribute('allow', 'fullscreen; accelerometer; gyroscope; xr-spatial-tracking');
  kehys.setAttribute('referrerpolicy', 'no-referrer');
  ikkuna.appendChild(kehys);

  /*
   * VARAPOLKU: jos kehys ei ilmoita latautuneensa, sivu on joko
   * torjunut upotuksen tai verkko on poikki. Silloin ikkunaan
   * kirjoitetaan siisti kortti ja iso nappi ulos.
   */
  const vara = html('div', 'fokuskierros-vara');
  vara.hidden = true;
  vara.appendChild(html('p', '', kierros.varaTeksti
    ?? 'Kierros ei aukea pelin sisällä. Se avautuu laitteen omassa selaimessa.'));
  const varaNappi = html('a', 'fokuskierros-varanappi', 'Avaa kierros selaimessa ↗');
  varaNappi.href = kierros.url;
  varaNappi.target = '_blank';
  varaNappi.rel = 'noopener noreferrer';
  vara.appendChild(varaNappi);
  if (kierros.lahde) vara.appendChild(html('p', 'fokuskierros-lahde', kierros.lahde));
  ikkuna.appendChild(vara);
  if (kierros.lahde) ikkuna.appendChild(html('p', 'fokuskierros-lahde', kierros.lahde));

  kerros.appendChild(ikkuna);
  document.body.appendChild(kerros);

  const ajastin = setTimeout(() => {
    if (!kehys.dataset.latautui) {
      kehys.hidden = true;
      vara.hidden = false;
    }
  }, KIERROS_ODOTUS_MS);
  kehys.addEventListener('load', () => { kehys.dataset.latautui = '1'; }, { once: true });

  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    tapahtuma.stopPropagation();
    suljeKierros(ui);
  };
  document.addEventListener('keydown', nappain, true);
  // Napautus ikkunan ULKOPUOLELLE sulkee; ikkunan sisällä napautus
  // kuuluu kierrokselle itselleen.
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (ikkuna.contains(tapahtuma.target)) return;
    suljeKierros(ui);
  });
  ui.kierrosIkkuna = {
    kerros, kehys, ajastin, nappain,
  };
  return kerros;
}

/* ==================== KUVAN SUURENNOS KARTAN PÄÄLLE ==================
 *
 * Sama ele ja sama ulkoasu kuin fokusvirran kuvilla: kuva KASVAA
 * paikaltaan suureksi niin, että KARTTA NÄKYY YHÄ TAUSTALLA (omistajan
 * tilaus 24.8.2026). Ei pelin omaa katselinta (ui.openLightbox): se on
 * koko ruudun modaali, joka tummentaa ja sumentaa kaiken alleen — oikein
 * lehdessä, väärin fokusmoodissa, jonka koko idea on kartta näkymänä.
 *
 * MIKSI OMA EIKÄ FOKUSVIRRAN: ks. tiedoston alku, "OMA SUURENNOS EIKÄ
 * FOKUSVIRRAN". Ulkoasu on peilattu tarkoituksella samaksi
 * (css/fokuskohteet.css), jotta pelaaja näkee yhden ja saman eleen
 * riippumatta siitä, mistä kuvasta hän sen avaa.
 *
 * LIIKE ON FLIP. Kuva ladotaan HETI lopulliseen kokoonsa, ja sen päälle
 * asetetaan muunnos, joka kutistaa KEHYKSEN takaisin pikkukuvan
 * ruutupaikkaan; seuraavana kehyksenä muunnos poistetaan siirtymän
 * kanssa. Vain `transform` ja `opacity` liikkuvat, joten animaatio ei
 * kilpaile kartan rasteroinnin kanssa — sama oppi kuin kartan
 * kamera-ajossa (js/kartta.js ajaKamera).
 *
 * TAUSTA JÄÄ NÄKYVIIN. Kartta, tietoruutu ja sen pikkukuva pilkottavat
 * hyvin kevyen sumennuksen ja tummennuksen läpi (css/fokuskohteet.css
 * .fokuskohde-zoom-auki). Sumennus on `backdrop-filter` HTML-kerroksella
 * kartan päällä, ei suodatin kartan omassa SVG-kerroksessa — kielto
 * (tests/rules.test.mjs) koskee jälkimmäistä, koska iOS pudottaa
 * suodatetun KARTTAKERROKSEN tyhjäksi taustalta palatessa.
 *
 * ANKKURI EI SAA KADOTA. Juuri siksi tietoruutua ei enää häivytetä
 * suurennoksen ajaksi: kutistuminen laskeutuu kortin pikkukuvaan, ja
 * jos kortti palaa vasta kutistumisen jälkeen, lopussa näkyy pomppu
 * (omistajan palaute 25.8.2026).
 */

/** Kasvun ja kutistuksen kesto; sama tuntuma kuin fokusvirralla. */
const KOHDE_ZOOM_MS = 320;
/**
 * Katot ruudusta paperikehyksen ULKOMITALLE. Omistajan palaute
 * 25.8.2026: *"kuva vielä hieman isommaksi"*. Vanha mitoitus rajasi
 * leveyden ruudun PIENEMMÄSTÄ sivusta, jolloin vaakakuva jäi
 * pystyruudulla turhan pieneksi; nyt kumpikin suunta katsoo omaa
 * sivuaan ja kartalle jää joka reunalle vain kapea kaista.
 */
/*
 * Omistajan palaute 25.8.2026 v1103:sta: "Kuvat isommalla" — katot
 * nostettu lähes koko ruutuun ja reunus puolitettu.
 */
const KOHDE_ZOOM_LEVEIN = 0.99;
const KOHDE_ZOOM_KORKEIN = 0.97;
/** Vähimmäisreunus pikseleinä, ettei paperi puske ruudun reunaan asti. */
const KOHDE_ZOOM_REUNA = 10;
/** Kuvalle jäävä vähimmäisosuus ruudun korkeudesta, jos kuvateksti on pitkä. */
const KOHDE_ZOOM_VAHIN_OSUUS = 0.28;
/** Kehyksen kapein sallittu ulkomitta pikseleinä. */
const KOHDE_ZOOM_KAPEIN = 140;
/**
 * Kuinka paljon lähdettä isommaksi suurennos saa venyä (omistajan
 * pelitestipalaute v1119: *"skaalaus ei saa venyttää pikselipuuroksi:
 * jos lähde on pieni, rajaa suurennos lähteen luonnolliseen kokoon
 * ×1,4 asti"*).
 */
const KOHDE_ZOOM_VENYMA = 1.4;
/** Kuvasuhde, jota käytetään ennen kuin kuvan omat mitat tiedetään. */
const KOHDE_ZOOM_OLETUSSUHDE = 4 / 3;
/** Kiihtyy alussa, jarruttaa lopussa — kartan kamera-ajon sukulainen. */
const KOHDE_ZOOM_PEHMENNYS = 'cubic-bezier(0.22, 0.9, 0.24, 1)';

/** Onko käyttäjä pyytänyt vähemmän liikettä? */
function kohdeLiikeVahennetty() {
  return Boolean(globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
}

/*
 * Sulkee auki olevan suurennoksen ilman animaatiota (kortti sulkeutuu).
 * EI VIENTILISTALLE: ainoa tie ulos on suljeFokuskohde, joka kutsuu tätä
 * — niin kortti ja sen kuva katoavat aina yhdessä eikä kutsujan tarvitse
 * muistaa kahta sulkua.
 */
function suljeKohdeSuurennos(ui) {
  ui?.fokuskohdeZoom?.heti?.();
  if (ui) ui.fokuskohdeZoom = null;
}

/**
 * Kuva suureksi kartan päälle, pikkukuvan paikalta kasvattaen.
 *
 * @param {object} ui
 * @param {{tiedosto:string, selite?:string, lahde?:string}} kuva
 * @param {() => Element|null} ankkuri mistä ruudun kohdasta kuva kasvaa
 *   ja mihin se kutistuu. Funktio eikä valmis elementti, koska kortti voi
 *   liikkua kartan mukana suurennoksen ollessa auki.
 */
function avaaKohdeSuurennos(ui, kuva, ankkuri) {
  if (typeof document === 'undefined' || (!kuva?.tiedosto && !kuva?.osoite)) return;
  suljeKohdeSuurennos(ui);
  lataaKohdeTyyli();
  let suljettu = false;

  const kerros = html('div', 'fokuskohde-zoom');
  kerros.setAttribute('role', 'dialog');
  kerros.setAttribute('aria-modal', 'true');
  kerros.setAttribute('aria-label', 'Kuva suurennettuna');
  const kehys = html('figure', 'fokuskohde-zoomkehys');
  const img = document.createElement('img');
  img.className = 'fokuskohde-zoomkuva';
  img.draggable = false;
  img.alt = kuva.selite ?? '';
  const teksti = html('figcaption', 'fokuskohde-zoomteksti');
  teksti.append(
    html('span', 'fokuskohde-zoomselite', kuva.selite ?? ''),
    // CC BY vaatii tekijän maininnan myös suurennoksessa.
    html('span', 'fokuskohde-zoomlahde', kuva.lahde ?? ''),
  );
  kehys.append(img, teksti);
  // "Matkakirjan ihme" -nauha myös suurennokseen, samalla komponentilla
  // kuin kortissa (ks. lohko MATKAKIRJAN IHME). Kehys on nauhan
  // asemointipohja, ja css nostaa sen kuvan vasempaan yläkulmaan.
  piirraIhmenauha(kehys, kuva.nauha);
  kerros.appendChild(kehys);

  /*
   * PIKKUKUVA ENSIN, ISO PERÄSSÄ. Kortin pikkukuva on jo selaimen
   * välimuistissa, joten se on ruudulla samassa kehyksessä — ja mikä
   * tärkeämpää, sillä on oikeat mittasuhteet heti, jolloin kasvun lähtö-
   * ja maalilaatikko voidaan mitata odottamatta verkkoa.
   */
  asetaKohdeKuva(img, kuva, KOHDE_KUVAN_PX, () => {});
  /*
   * REPON OMALLA KUVALLA (`osoite`) EI OLE ISOMPAA VERSIOTA: tiedosto
   * on jo se, mikä se on, eikä thumb-putkea ole. Toinen haku pyytäisi
   * saman tiedoston uudestaan, joten se jätetään tekemättä — ja se on
   * jo suurennoksen lopullinen kuva, joten lippu on heti tosi.
   *
   * LIPPU EIKÄ VERTAILU ISON OSOITTEESEEN (korjaus 27.8.2026,
   * Matkakirjan ihmeet): mitoitus luki ennen `img.src === iso.src`,
   * mutta `iso` syntyi tämän ehdon SISÄLLÄ. Repon omalla kuvalla
   * muuttujaa ei siis ollut olemassa, ja mitoitus kaatui
   * ReferenceErroriin heti ensimmäisellä kierroksella — suurennos jäi
   * mitoittamatta. Nyt tila on yksi boolean, joka on olemassa
   * kummallakin kuvalähteellä.
   */
  let isoValmis = Boolean(kuva.osoite);
  if (!kuva.osoite) {
    const iso = new Image();
    iso.decoding = 'async';
    iso.addEventListener('load', () => {
      if (!kerros.isConnected) return;
      img.src = iso.src;
      isoValmis = true;
    }, { once: true });
    iso.src = valokuvaSuurennos(kuva.tiedosto, KOHDE_ZOOM_PX);
  }

  /**
   * KUVASUHDE, JOKA ON TIEDOSSA JO ENSIMMÄISELLÄ KEHYKSELLÄ.
   *
   * Suurennoksen oma <img> voi olla vielä lataamatta, mutta kortin
   * pikkukuva on ruudulla ja sillä on samasta tiedostosta luetut mitat.
   * Ilman tätä kehys aloittaisi oletussuhteella ja loksahtaisi oikeaan
   * muotoonsa kesken kasvun — juuri se hyppy, jonka pitää olla poissa.
   */
  const kuvasuhde = () => {
    if (img.naturalWidth && img.naturalHeight) return img.naturalWidth / img.naturalHeight;
    const pikku = ankkuri?.()?.querySelector?.('img');
    if (pikku?.naturalWidth && pikku.naturalHeight) return pikku.naturalWidth / pikku.naturalHeight;
    return KOHDE_ZOOM_OLETUSSUHDE;
  };

  /**
   * MITTOJA ON YKSI: KEHYKSEN LEVEYS.
   *
   * Kuvan korkeus tulee kuvasuhteesta (css: height: auto + aspect-ratio),
   * joten paperi on aina täsmälleen kuvan muotoinen — ei tyhjiä kaistoja
   * kuvan ylä- ja alapuolella (omistajan palaute 25.8.2026). Vanha
   * mitoitus kirjoitti kuvalle sekä leveyden että korkeuden, ja kaksi
   * erikseen laskettua mittaa pääsi menemään ristiin.
   *
   * PAPERIN OMA TILA MITATAAN, EI ARVATA. Reunus, sisennys, rako ja
   * kuvatekstipalkki vievät kehyksestä osan, ja kuvateksti TAITTUU eri
   * tavalla eri leveydellä — vakioluku olisi väärä juuri silloin, kun
   * pystykuva on kapea ja teksti pitkä. Siksi kierros mitataan ja
   * toistetaan, kunnes leveys asettuu (yleensä kaksi kierrosta).
   */
  const mitoita = () => {
    /*
     * RUUDUN MITAT PELIN OMASTA MITTARISTA, EI innerWidthista
     * (omistajan pelitestipalaute v1119: *"suurennos jää iPadilla
     * pieneksi keskelle ruutua … kuvat saisi näkyä isommalla"*).
     *
     * Katot ovat jo lähes koko ruutu (KOHDE_ZOOM_LEVEIN 0,99), joten
     * vika ei ollut mitoituksessa vaan mitassa: WKWebView voi pitää
     * asetteluviewportin vanhassa kapeassa lukemassa, ja `innerWidth`
     * kertoo silloin kapeamman ruudun kuin laitteessa oikeasti on.
     * Sama ilmiö on korjattu tässä repossa jo useasti (js/ui.js
     * mittaaNakyma ja mittaaNakymanKorkeus ristiintarkistavat
     * visuaalisen ja asetteluviewportin) — nyt suurennos käyttää
     * samaa mittaria kuin lehden arkki ja kulttuurikuvan suurennos.
     *
     * Ilman ui-oliota (yksikkötesti, esikatselu) pudotaan entiseen.
     */
    const leveys = ui?.nakymanLeveys || ui?.mittaaNakyma?.()
      || document.documentElement?.clientWidth || globalThis.innerWidth || 0;
    const korkeus = ui?.mittaaNakymanKorkeus?.()
      || document.documentElement?.clientHeight || globalThis.innerHeight || 0;
    if (!leveys || !korkeus) return;
    const suhde = kuvasuhde();
    img.style.aspectRatio = suhde.toFixed(4);
    /*
     * PIENTÄ LÄHDETTÄ EI VENYTETÄ PIKSELIPUUROKSI (omistajan
     * pelitestipalaute v1119). Suurennos pyydetään Commonsista
     * KOHDE_ZOOM_PX:n levyisenä, mutta thumb-putki ei koskaan tuota
     * alkuperäistä isompaa — jos kuva on pieni, se on pieni. Silloin
     * katto on kuvan oma luonnollinen leveys kertaa KOHDE_ZOOM_VENYMA:
     * hitusen suurentaminen on parempi kuin pieni kuva keskellä
     * ruutua, mutta moninkertaistaminen ei ole.
     *
     * Kuvan omat mitat tunnetaan vasta kun ISO versio on ladattu; sitä
     * ennen (välimuistin pikkukuva) katto jää pois eikä mitoita mitään.
     */
    const luonnollinen = isoValmis && img.naturalWidth
      ? img.naturalWidth * KOHDE_ZOOM_VENYMA : Infinity;
    const enintaanW = Math.min(
      leveys * KOHDE_ZOOM_LEVEIN, leveys - KOHDE_ZOOM_REUNA, luonnollinen,
    );
    const enintaanH = Math.min(korkeus * KOHDE_ZOOM_KORKEIN, korkeus - KOHDE_ZOOM_REUNA);
    const vahinH = korkeus * KOHDE_ZOOM_VAHIN_OSUUS;
    let ulko = Math.round(enintaanW);
    for (let kierros = 0; kierros < 3; kierros += 1) {
      kehys.style.width = `${ulko}px`;
      const kuvaLeveys = img.offsetWidth;
      if (!kuvaLeveys) break;
      const vaakaTila = kehys.offsetWidth - kuvaLeveys;
      const pystyTila = kehys.offsetHeight - img.offsetHeight;
      // Kuinka leveä kuva mahtuu pystysuunnassa jäljelle jäävään tilaan.
      const korkeudesta = Math.max(enintaanH - pystyTila, vahinH) * suhde;
      const uusi = Math.round(
        Math.max(Math.min(enintaanW - vaakaTila, korkeudesta), KOHDE_ZOOM_KAPEIN) + vaakaTila,
      );
      if (Math.abs(uusi - ulko) <= 1) { ulko = uusi; break; }
      ulko = uusi;
    }
    kehys.style.width = `${ulko}px`;
  };

  /**
   * Muunnos, joka vie ladotun KEHYKSEN ankkurin ruutupaikkaan. Muunnos on
   * kehyksellä eikä kuvalla: muuten näyttäisi siltä, että valmis kortti
   * on jo ruudulla ja kuva vasta hakee paikkaansa sen sisällä.
   */
  const ankkuriMuunnos = () => {
    const alkuun = ankkuri?.()?.getBoundingClientRect?.();
    const nyt = kehys.getBoundingClientRect();
    if (!alkuun?.width || !nyt.width || kohdeLiikeVahennetty()) return null;
    return `translate(${(alkuun.left - nyt.left).toFixed(1)}px, `
      + `${(alkuun.top - nyt.top).toFixed(1)}px) `
      + `scale(${(alkuun.width / nyt.width).toFixed(4)}, `
      + `${(alkuun.height / nyt.height).toFixed(4)})`;
  };

  const poista = () => {
    globalThis.removeEventListener?.('resize', mitoita);
    document.removeEventListener('keydown', nappain, true);
    kerros.remove();
  };

  const sulje = () => {
    if (suljettu) return;
    suljettu = true;
    if (ui?.fokuskohdeZoom?.kerros === kerros) ui.fokuskohdeZoom = null;
    kerros.classList.remove('fokuskohde-zoom-auki');
    const takaisin = ankkuriMuunnos();
    if (!takaisin) { poista(); return; }
    void kerros.offsetWidth;
    kehys.style.transition = `transform ${KOHDE_ZOOM_MS}ms ${KOHDE_ZOOM_PEHMENNYS}`;
    kehys.style.transform = takaisin;
    teksti.style.opacity = '0';
    setTimeout(poista, KOHDE_ZOOM_MS + 60);
  };

  /*
   * ESC SULKEE SUURENNOKSEN, EI TIETORUUTUA. Kortin oma Esc-kuuntelija
   * on rekisteröity ennen tätä ja ehtisi siis ensin; se väistää niin
   * kauan kuin ui.fokuskohdeZoom on olemassa (ks. kuunteleKohdetta).
   */
  function nappain(tapahtuma) {
    if (tapahtuma.key !== 'Escape') return;
    tapahtuma.stopPropagation();
    sulje();
  }
  document.addEventListener('keydown', nappain, true);
  kerros.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    sulje();
  });

  /*
   * TIETORUUTU JÄÄ NÄKYVIIN (omistajan tilaus 25.8.2026). Kortti ja sen
   * pikkukuva pilkottavat kevyen sumennuksen takaa koko suurennoksen
   * ajan — ne ovat sekä lähtö- että maalipaikka, ja kun ankkuri on koko
   * ajan ruudulla, sulkeminen laskeutuu siihen saumatta. Aiemmin kortti
   * häivytettiin ja palasi vasta kutistumisen jälkeen, jolloin lopussa
   * näkyi pomppu.
   */
  document.body.appendChild(kerros);
  if (ui) ui.fokuskohdeZoom = { kerros, sulje, heti: poista };
  /*
   * MITTA HETI, EI VASTA KASVUN ALKAESSA. Kehyksen muoto ei saa riippua
   * siitä, ehtiikö kuva latautua tai ajastin laueta: ilman tätä paperi
   * ehtisi näkyä oletussuhteessa ja loksahtaisi vasta myöhemmin kuvan
   * muotoon. Kuvasuhde tiedetään jo nyt, koska kortin pikkukuva on
   * ruudulla (kuvasuhde).
   */
  mitoita();

  /*
   * KASVU ALKAA VASTA KUN KUVALLA ON MITAT. Ladottu <img> ilman ladattua
   * tiedostoa on nollan levyinen, ja nollasta laskettu mittakaava olisi
   * ääretön. Varmistus ajastimella pitää huolen siitä, ettei suurennos
   * jää muunnokseen jumiin, jos lataus epäonnistuu.
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
     * PAKOTETTU TYYLIN LASKENTA ENNEN KÄÄNNÖSTÄ: ilman tätä selain
     * niputtaa lähtö- ja maalitilan samaan kehykseen eikä näe niiden
     * välillä eroa — kuva ilmestyisi suoraan lopulliseen kokoonsa.
     */
    void kerros.offsetWidth;
    if (alusta) {
      kehys.style.transition = `transform ${KOHDE_ZOOM_MS}ms ${KOHDE_ZOOM_PEHMENNYS}`;
      kehys.style.transform = 'none';
      teksti.style.opacity = '';
    }
    kerros.classList.add('fokuskohde-zoom-auki');
  };
  img.addEventListener('load', () => { mitoita(); aloita(); });
  globalThis.addEventListener?.('resize', mitoita);
  if (img.complete && img.naturalWidth) aloita();
  setTimeout(aloita, 400);
}

/**
 * Avaa yhden kohteen tietoruudun. Vain yksi kerrallaan: uusi napautus
 * sulkee edellisen, ja fokusvirran kortin tai kuplan avautuminen sulkee
 * tämän (ks. vahdiVirtaa).
 */
/*
 * Kynnys, jonka jälkeen kortin päällä alkanut ele on raahaus eikä
 * napautus. Sama luokka kuin selainten omissa napautustoleransseissa —
 * tärisevä sormi ei saa vahingossa siirtää korttia.
 */
const KOHDE_RAAHAUSKYNNYS = 8;

/**
 * Yksi kortin päällä alkanut ele: napautus sulkee sormen noustessa,
 * kynnyksen ylittänyt liike raahaa korttia. Raahattu kortti muistetaan
 * (auki.raahattu), eikä automaattinen asemointi enää siirrä sitä —
 * pelaajan valitsema paikka voittaa (asetaKohteenPaikka).
 *
 * Kosketuksella pystyveto tekstin päällä jää selaimen vieritykseksi
 * (touch-action: pan-y → pointercancel), jolloin ele ei sulje eikä
 * siirrä — vieritys voittaa. Ylärivin ja otsikon päältä raahaus toimii
 * joka suuntaan (css/fokuskohteet.css touch-action: none).
 */
function raahausTaiSulku(ui, popup, alku) {
  const alkuX = alku.clientX;
  const alkuY = alku.clientY;
  const lahtoVasen = popup.offsetLeft;
  const lahtoYlin = popup.offsetTop;
  let raahaa = false;
  const siirry = (tapahtuma) => {
    if (tapahtuma.pointerId !== alku.pointerId) return;
    const dx = tapahtuma.clientX - alkuX;
    const dy = tapahtuma.clientY - alkuY;
    if (!raahaa) {
      if (Math.hypot(dx, dy) < KOHDE_RAAHAUSKYNNYS) return;
      raahaa = true;
      popup.classList.add('raahauksessa');
      try { popup.setPointerCapture(alku.pointerId); } catch { /* ei pakollinen */ }
    }
    const koti = popup.offsetParent;
    const maxVasen = Math.max(0, (koti?.clientWidth ?? Infinity) - popup.offsetWidth);
    const maxYlin = Math.max(0, (koti?.clientHeight ?? Infinity) - popup.offsetHeight);
    popup.style.left = `${Math.round(Math.min(Math.max(0, lahtoVasen + dx), maxVasen))}px`;
    popup.style.top = `${Math.round(Math.min(Math.max(0, lahtoYlin + dy), maxYlin))}px`;
  };
  const puru = () => {
    popup.removeEventListener('pointermove', siirry);
    popup.removeEventListener('pointerup', loppu);
    popup.removeEventListener('pointercancel', peru);
    popup.classList.remove('raahauksessa');
  };
  const loppu = (tapahtuma) => {
    if (tapahtuma.pointerId !== alku.pointerId) return;
    puru();
    if (raahaa) {
      if (ui.fokuskohdeAuki?.popup === popup) ui.fokuskohdeAuki.raahattu = true;
      return;
    }
    sfx.play('paper');
    suljeFokuskohde(ui);
  };
  const peru = (tapahtuma) => {
    if (tapahtuma.pointerId !== alku.pointerId) return;
    puru();
  };
  popup.addEventListener('pointermove', siirry);
  popup.addEventListener('pointerup', loppu);
  popup.addEventListener('pointercancel', peru);
}

/*
 * KORTIN YLÄRIVI (omistaja 26.8.2026 ilta: *"Voisiko symboli ja sen
 * luokka näkyä noston ylimmällä rivillä nykyisen ylimmän rivin
 * tilalla"* — Kalamatan kortissa luki KAUPUNKI, vaikka kartalla
 * kohteella on malja). Symboli valitaan SAMALLA säännöllä kuin
 * karttamerkkiin (kohteenSymboli), joten kortti ja merkki kertovat
 * aina samaa; vierellä on luokan nimi (NOSTOSYM_LUOKAT). Symbolittomat
 * kohteet — kaupunki ja muu ilman symboli-kenttää — pitävät entisen
 * tyyppinimiön, koska niillä ei ole luokkaa kerrottavana.
 */
function piirraKohdeYlarivi(kohde) {
  const rivi = html('p', 'fokuskohde-ylarivi');
  const symboli = kohteenSymboli(kohde);
  const luokka = symboli ? NOSTOSYM_LUOKAT[symboli] : null;
  if (!luokka) {
    rivi.textContent = KOHDE_TYYPIT[kohde.tyyppi] ?? KOHDE_TYYPIT.muu;
    return rivi;
  }
  // Sama piirtokirjasto kuin kartalla: symboli asuu ~24 yksikön
  // ruudussa origon ympärillä, ja viewBox tuo sen rivin kokoon.
  // Luokat (nostosym-*) tyylittyvät css/styles.css:n
  // KARTTASYMBOLIT-osiosta, joka on aina ladattu.
  const kuva = el('svg', {
    class: 'fokuskohde-ylarivi-symboli',
    viewBox: '-12 -12 24 24',
    'aria-hidden': 'true',
  }, rivi);
  piirraNostosymboli(el('g', {}, kuva), symboli);
  rivi.appendChild(document.createTextNode(luokka));
  return rivi;
}

export function avaaFokuskohde(ui, kohde) {
  if (typeof document === 'undefined' || !kohde) return null;
  /*
   * ÄÄNI ENSIMMÄISENÄ RIVINÄ (omistajan pelitestipalaute v1119, kohta
   * 17: *"soitto lähtee pointerup/click-käsittelijässä heti, ennen
   * raskaampaa työtä"*).
   *
   * Ennen tämä oli funktion VIIMEINEN rivi, ja sitä ennen ehdittiin
   * ladata tyylitiedosto, rakentaa koko kortti, hakea kuva ja mitata
   * asettelu kolmesti. Nyt soitto lähtee samassa mikrotehtävässä kuin
   * napautus, ja loppu tapahtuu sen jälkeen.
   *
   * Äänen mykistys ja TAUSTAÄÄNET-kytkin hoituvat SoundKit.play():n
   * sisällä (enabled), joten tässä ei tarvitse tietää niistä mitään.
   */
  sfx.play('popup');
  lataaKohdeTyyli();
  suljeFokuskohde(ui);
  const merkki = ui.fokuskohdeMerkit?.get(kohde.id)?.[0];
  const koti = document.querySelector('.map-pane') ?? document.body;

  const popup = html('div', 'fokuskohde-popup');
  popup.setAttribute('role', 'group');
  popup.setAttribute('aria-label', `${kohde.nimi}: tietoruutu`);
  /*
   * NAPAUTUS SULKEE, PAINIKE EI, RAAHAUS SIIRTÄÄ. Sulkusopimus on sama
   * kuin pöllön kuplalla (js/fokusvirta.js piirraKupla): kortin päällä
   * napautus on sulku, mutta painikkeen tai linkin päällä se on
   * valinta. Uutena (omistaja 25.8.2026: *"Pystyykö pop up ikkunoista
   * tehdä raahattavia"*) sama ele jatkettuna on siirto: sulku ratkeaa
   * vasta sormen noustessa, ja kynnyksen ylittänyt liike muuttuu
   * raahaukseksi eikä sulje. Samalla korjaantui vanha vika, jossa
   * pitkän kortin vieritysyritys sulki kortin heti pointerdownissa.
   */
  popup.addEventListener('pointerdown', (tapahtuma) => {
    tapahtuma.stopPropagation();
    if (tapahtuma.target?.closest?.('button, a')) return;
    raahausTaiSulku(ui, popup, tapahtuma);
  });

  const sulje = html('button', 'fokuskohde-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', `Sulje ${kohde.nimi}`);
  sulje.addEventListener('click', () => {
    sfx.play('paper');
    suljeFokuskohde(ui);
  });
  popup.appendChild(sulje);

  const sisalto = html('div', 'fokuskohde-sisalto');
  sisalto.appendChild(piirraKohdeYlarivi(kohde));
  sisalto.appendChild(html('h3', 'fokuskohde-otsikko', kohde.nimi));
  // "Koe ihme" HETI OTSIKON ALLE (Raamattu, osio "Matkakirjan ihmeet":
  // *"popupin yläosassa heti oma nappi, josta ihmeen pääsee kokemaan"*)
  // — ennen kuvaa ja tekstiä, jotta lupaus näkyy ilman vieritystä.
  piirraIhmenappi(ui, sisalto, kohde);
  piirraKohdeKuvat(ui, sisalto, kohde);
  piirraKohdeTeksti(ui, sisalto, kohde);
  piirraKohdeKysymykset(ui, sisalto, kohde);
  piirraKierrosnappi(ui, sisalto, kohde);
  if (kohde.lahde) sisalto.appendChild(html('p', 'fokuskohde-lahde', kohde.lahde));
  popup.appendChild(sisalto);
  koti.appendChild(popup);

  merkki?.classList.add('auki');
  /*
   * KOHDE ITSE TALTEEN, ei vain sen tunnus: pöllön kontekstinkeruu
   * (js/pollo.js lueNakyma) lukee tästä auki olevan kortin nimen,
   * tyypin ja tekstin, jotta chat vastaa siitä, mitä ruudulla näkyy.
   */
  ui.fokuskohdeAuki = { id: kohde.id, kohde, popup, merkki, purku: null };
  ui.fokuskohdeAuki.purku = kuunteleKohdetta(ui, popup);
  asetaKohteenPaikka(ui);
  // Mitta uudelleen, kun asettelu ja tyyli ovat valmiit: ensimmäinen
  // mitta voi osua hetkeen, jolloin tyylitiedosto on vasta matkalla.
  globalThis.requestAnimationFrame?.(() => asetaKohteenPaikka(ui));
  setTimeout(() => asetaKohteenPaikka(ui), 200);
  // Avausääni soi jo funktion alussa (ks. sfx.play('popup') ylhäällä).
  return popup;
}

/**
 * Kortin kuuntelijat: Esc, napautus kortin ulkopuolelle, ikkunan koko
 * ja fokusvirran pinnat. Palauttaa purkufunktion — jokainen tähän
 * lisätty kuuntelija on purettava, tai suljettu kortti jäisi
 * kuuntelemaan ikkunaa ikuisesti.
 */
function kuunteleKohdetta(ui, popup) {
  const nappain = (tapahtuma) => {
    if (tapahtuma.key === 'Escape') {
      // Suurennos kuoritaan ensin: Esc sulkee sen, ei koko tietoruutua.
      if (ui?.fokuskohdeZoom) return;
      tapahtuma.stopPropagation();
      suljeFokuskohde(ui);
    }
  };
  const ulos = (tapahtuma) => {
    if (popup.contains(tapahtuma.target)) return;
    // Toisen merkin napautus vaihtaa kohdetta; merkki hoitaa sulun itse.
    if (tapahtuma.target?.closest?.('.fokuskohde')) return;
    /*
     * Suurennos on tämän kortin oma jatke, vaikka se asuu bodyssa
     * (js/kartta.js KELLUVA_UI: kelluvat pinnat ovat siellä samasta
     * syystä). Ilman tätä napautus suurennoksen päällä sulkisi kortin, ja
     * kuva kutistuisi paikkaan, jota ei enää ole.
     */
    if (tapahtuma.target?.closest?.('.fokuskohde-zoom')) return;
    /*
     * PÖLLÖ EI SULJE KORTTIA (omistajan pelitesti 25.8.2026: *"kohteen
     * pop-up katoaa, kun painaa pöllönappia"*). Juurisyy oli tässä:
     * pöllönappi on kortin ulkopuolella, joten sen napautus meni tästä
     * läpi sulkuna, ja chat aukesi tyhjän kartan päälle. Nyt nappi ja
     * paneeli ovat kortin työpari — kortti jää auki ja väistää
     * paneelia (asetaKohteenPaikka). Sama sopimus toiseen suuntaan on
     * js/pollo.js seuraaSulkemista.
     */
    if (tapahtuma.target?.closest?.('.pollo-nappi, .pollo-paneeli')) {
      siirraKohdeMyohemmin(ui);
      return;
    }
    suljeFokuskohde(ui);
  };
  const asemoi = () => asetaKohteenPaikka(ui);
  /*
   * FOKUSVIRTA VOITTAA. Kun pöllö puhuu kuplasta tai annostelukortti
   * aukeaa, tietoruutu väistyy — kaksi paperia päällekkäin kartan
   * päällä olisi juuri sitä raskautta, jota omistaja moitti. Vahti on
   * MutationObserver eikä kutsu js/fokusvirta.js:ään: se tiedosto on
   * toisen työvaiheen hallussa, eikä tämä paketti saanut koskea siihen.
   */
  const vahti = new MutationObserver((muutokset) => {
    for (const muutos of muutokset) {
      for (const solmu of muutos.addedNodes ?? []) {
        if (solmu.nodeType !== 1) continue;
        if (solmu.matches?.('.fokusvirta-kortti, .fokusvirta-kupla, .fokuszoom')
          || solmu.querySelector?.('.fokusvirta-kortti, .fokusvirta-kupla, .fokuszoom')) {
          suljeFokuskohde(ui);
          return;
        }
      }
    }
  });
  document.addEventListener('keydown', nappain, true);
  document.addEventListener('pointerdown', ulos, true);
  globalThis.addEventListener?.('resize', asemoi);
  globalThis.addEventListener?.('orientationchange', asemoi);
  vahti.observe(document.body, { childList: true, subtree: true });
  return () => {
    document.removeEventListener('keydown', nappain, true);
    document.removeEventListener('pointerdown', ulos, true);
    globalThis.removeEventListener?.('resize', asemoi);
    globalThis.removeEventListener?.('orientationchange', asemoi);
    vahti.disconnect();
  };
}
