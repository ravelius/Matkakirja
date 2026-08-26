/*
 * TÄKYSYMBOLIT JA KARTTASYMBOLIEN KIRJASTO — poolin muut täyt kartan
 * omina merkkeinä, ja kaikkien karttamerkkien yhteiset piirtäjät.
 *
 * Raamatun osio "Fokusmoodi", kohta TÄKYSYMBOLIT (omistaja 25.8.2026):
 * *"kartalla on tekstikuplassa VAIN YKSI täkynosto kerrallaan; muut
 * vastaavat täkykohteet merkitään yksinkertaisilla symboleilla —
 * keltainen huutomerkki tms. skandaalille/uskomattomalle, ja SÖPÖILLE
 * eläinkohteille PÖLLÖVAUVAN kuva; muitakin symboleita voidaan
 * kehittää. Symbolit tehdään kartan henkeen ja samalla tyylillä
 * (seepiamuste, aikakauden karttamerkki)."*
 *
 * Ja SYMBOLITAKSONOMIA (omistaja 26.8.2026 ilta: *"tee kaikki
 * ehdotetut symbolit ja myös lisäkandidaatit"*): KAKSITOISTA
 * kategoriaa, joilla jokaisella oma symboli ja vaimea heraldinen väri.
 * MUOTO RATKAISEE, väri on toissijainen vihje — pergamentilla vaimeat
 * värit sekoittuvat. Symbolit piirretään koodilla 1800-luvun
 * kaiverrustyyliin (terävät joka zoomilla, ei latauksia) YHDESTÄ
 * kirjastosta, jota käyttävät sekä täkysymbolit että kartan
 * kohdemerkit (js/fokuskohteet.js) — ei kopioita kahteen paikkaan.
 * Taulukko: NOSTOSYM_PIIRTAJAT alempana; värit css/styles.css
 * (osio KARTTASYMBOLIT, --sym-*).
 *
 * ── MITÄ TÄMÄ TIEDOSTO ON ──────────────────────────────────────────
 *
 * KARTTAKERROS ja PIIRTOKIRJASTO. Kerros ei tiedä poolista,
 * lukemisista eikä siitä, milloin täky saa näkyä: kaikki se on
 * täkynoston omassa kirjanpidossa (js/fokusnosto.js), joka kutsuu tätä
 * valmiilla listalla. Näin näkyvyysehdot pysyvät yhdessä paikassa,
 * kuten liuskan aikana. Kirjaston (piirraNostosymboli) kutsujat
 * hoitavat itse paikan ja mittakaavan — piirtäjä tuottaa aina saman
 * ~21 px merkin origon ympärille.
 *
 * ── KOLME SÄÄNTÖÄ, JOTKA ON PERITTY MUILTA KARTAN KERROKSILTA ──────
 *
 * 1. OMA KERROS SVG:N JUURESSA (ui.svg:n suora lapsi). Kiertävän laudan
 *    <use>-kopiosta ei voi napauttaa mitään: tapahtuma osuisi
 *    <use>-elementtiin eikä sen sisältöön. Merkki piirretään siksi
 *    oikeana elementtinä jokaiseen kiertokohtaan (ui.kiertoKohdat) —
 *    sama ratkaisu kuin kohderenkailla, vinjeteillä, fokuskohteilla ja
 *    vihreällä pisteellä (js/fokuspiste.js).
 *
 * 2. EI SUODATTIMIA (js/fokuskartta.js sääntö 3, tests/rules.test.mjs):
 *    suodatettu kerros palaa iOS:n taustalta tyhjänä. Symbolit ovat
 *    siis pelkkiä täyttöjä ja viivoja — paperinvaalea aluslaatta on oma
 *    ympyränsä eikä varjo.
 *
 * 3. KARTAN MITTAKAAVA, EI RUUDUN (omistajan LOPULLINEN linjaus
 *    26.8.2026, Raamattu). Ankkuriryhmä on laudan koordinaateissa ja
 *    skaalataan VAKIOLLA (js/ui.js fokusMerkkiSkaala), jolloin merkin
 *    lapset ovat ruudun pikseleitä LEHDEN PERUSTASOLLA ja elävät siitä
 *    kartan mukana. Osuma-alueen r = 22 on 44 px läpimitta perustasolla
 *    — sama sormisääntö kuin muualla.
 *
 * ── KERROS EI TAPPELE Z-JÄRJESTYKSESTÄ ─────────────────────────────
 *
 * js/fokuspiste.js siirtää oman kerroksensa takaisin viimeiseksi aina
 * kun sen perässä on jotain. Jos tämä kerros tekisi samoin, kaksi
 * kerrosta vaihtaisi paikkaa joka piirrossa loputtomiin. Siksi tämä
 * kerros asetetaan syntyessään vihreän pisteen ETEEN, jos piste on jo
 * olemassa — ja jos ei ole, piste syntyy myöhemmin luonnostaan tämän
 * perään. Kummassakin tapauksessa järjestys asettuu kerralla.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NOSTOSYM_/nostosym-etuliitteellä.
 */
import { el } from './mapart.js';
import { niputaFokusmerkit } from './fokusniput.js';
import { sfx } from './sound.js';

/** Osuma-alueen säde ruudun pikseleinä (44 px läpimitta). */
const NOSTOSYM_OSUMA_R = 22;

/**
 * SYMBOLIN PIIRTÄJÄT.
 *
 * Kumpikin piirtää ruudun pikseleissä ORIGON YMPÄRILLE — ankkuriryhmä
 * hoitaa paikan ja vakioskaalauksen. Mitat on valittu niin,
 * että merkki on suunnilleen kohdemerkin kokoinen (halkaisija ~21 px):
 * pienempi katoaisi karttaan, isompi kilpailisi kaupungin laatan kanssa.
 */

/**
 * KELTAINEN HUUTOMERKKI — skandaali tai uskomaton tositarina.
 *
 * Väri on okrankeltainen, joka taittuu seepiaan (css/styles.css
 * --sym-huuto): puhdas keltainen olisi liikennemerkki kartalla, jonka
 * koko paletti on musteen ja paperin väliltä. Muoto on aikakauden
 * karttamerkin mukainen — pyöreä laatta, musteviivainen kehä ja sen
 * sisällä kapeneva palkki ja piste.
 */
function piirraNostosymHuuto(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  el('path', {
    class: 'nostosym-huuto',
    d: 'M-1.75 -6.6 L1.75 -6.6 L1.15 1.7 L-1.15 1.7 Z',
  }, g);
  el('circle', { class: 'nostosym-huuto', cx: 0, cy: 5.1, r: 1.6 }, g);
}

/**
 * PÖLLÖVAUVA — söpö eläinkohde.
 *
 * Ei värikuvaa vaan musteesta piirretty pöllönpoikanen: pyöreä
 * untuvainen kroppa, kaksi isoa silmää, nokka ja muutama viiva. Sama
 * karaktääri kuin pelin omalla pöllöllä (Raamattu, PÖLLÖN KARAKTÄÄRI),
 * mutta poikasena: korvatupsut ovat vasta töpöt ja kroppa on melkein
 * pallo.
 *
 * Symboli valitaan datasta: täky saa sen kentällä `symboli: 'elain'`
 * ilman että tähän tiedostoon kosketaan. Kreikan poolin ensimmäiset
 * käyttäjät ovat pikkupöllö ja reunuskilpikonna (js/fokusnosto.js
 * NOSTO_MAAT.GRC).
 */
function piirraNostosymPollo(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Korvatupsut ensin, jotta kroppa peittää niiden juuret.
  el('path', {
    class: 'nostosym-viiva',
    d: 'M-4.6 -6.0 L-6.5 -8.8 M4.6 -6.0 L6.5 -8.8',
  }, g);
  // Untuvainen kroppa: pää ja vartalo ovat poikasella sama pallo.
  el('path', {
    class: 'nostosym-pollo',
    d: 'M0 -7.7 C4.9 -7.7 7.6 -4.2 7.6 0.3 C7.6 4.9 4.4 8.0 0 8.0 '
      + 'C-4.4 8.0 -7.6 4.9 -7.6 0.3 C-7.6 -4.2 -4.9 -7.7 0 -7.7 Z',
  }, g);
  // Isot silmät: vaalea kehä musteviivalla ja tumma terä.
  el('circle', { class: 'nostosym-silma', cx: -3.0, cy: -1.6, r: 2.9 }, g);
  el('circle', { class: 'nostosym-silma', cx: 3.0, cy: -1.6, r: 2.9 }, g);
  el('circle', { class: 'nostosym-tera', cx: -3.0, cy: -1.6, r: 1.35 }, g);
  el('circle', { class: 'nostosym-tera', cx: 3.0, cy: -1.6, r: 1.35 }, g);
  // Nokka silmien välissä ja pari untuvaviivaa rinnassa.
  el('path', { class: 'nostosym-nokka', d: 'M0 0.9 L-1.5 -0.7 L1.5 -0.7 Z' }, g);
  el('path', {
    class: 'nostosym-viiva',
    d: 'M-3.5 3.4 q1.3 1.2 2.6 0 M0.9 3.4 q1.3 1.2 2.6 0',
  }, g);
  // Varpaat: poikanen seisoo omilla jaloillaan.
  el('path', {
    class: 'nostosym-viiva',
    d: 'M-2.4 7.6 L-2.4 9.4 M2.4 7.6 L2.4 9.4',
  }, g);
}

/**
 * SILMÄ — NÄHTÄVYYS- JA MULTIMEDIAKOHDE (omistajan tilaus v1119, kohdat
 * 19 ja 20: *"SILMÄ-ikoni … piirretään samaan symboliperheeseen"*).
 *
 * Sama pyöreä laatta ja musteviivainen kehä kuin huutomerkillä ja
 * pöllövauvalla; sisällä vanhan kartografian silmä: kaksi kaarta, terä
 * ja pieni kiilto. Symboli lupaa katsottavaa — kierroksen, kuvan tai
 * paikan, joka avautuu omaan ikkunaansa.
 */
function piirraNostosymSilma(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Silmän kehä: kaksi vastakkaista kaarta, ei ellipsiä — kartografin
  // kynänjälki on kaari, ei sujuva muotti.
  el('path', {
    class: 'nostosym-silmakaari',
    d: 'M-7.4 0 C-4.6 -4.6 4.6 -4.6 7.4 0 C4.6 4.6 -4.6 4.6 -7.4 0 Z',
  }, g);
  el('circle', { class: 'nostosym-silma', cx: 0, cy: 0, r: 3.0 }, g);
  el('circle', { class: 'nostosym-tera', cx: 0, cy: 0, r: 1.5 }, g);
  // Kiilto: yksi vaalea piste, jotta terä ei ole pelkkä musta läiskä.
  el('circle', { class: 'nostosym-kiilto', cx: 1.1, cy: -1.1, r: 0.55 }, g);
}

/*
 * ── SYMBOLITAKSONOMIAN YHDEKSÄN UUTTA (omistaja 26.8.2026 ilta) ────
 *
 * Kaikki samaan kaavaan kuin kolme ensimmäistä: paperinvaalea
 * aluslaatta omana ympyränä, musteviivainen kehä ja sen sisällä
 * pelkkiä täyttöjä ja viivoja — EI SUODATTIMIA. Muodot on pelkistetty
 * niin, että ne erottuvat toisistaan vielä 21 pikselin koossa:
 * jokaisella on yksi iso päämuoto ja korkeintaan pari apuviivaa.
 * Värit ovat vaimeita heraldisia sävyjä css/styles.css:ssä (--sym-*).
 */

/** MURTUNUT PYLVÄS — historia ja rauniot (punaruskea). */
function piirraNostosymPylvas(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Jalusta kahtena portaana ja varsi, jonka yläpää on murtunut
  // sahalaidaksi — juuri katkos tekee pylväästä rauniomerkin.
  el('path', {
    class: 'nostosym-pylvas',
    d: 'M-6.2 7.2 L6.2 7.2 L6.2 5.2 L4.2 5.2 L4.2 3.6 L-4.2 3.6 '
      + 'L-4.2 5.2 L-6.2 5.2 Z',
  }, g);
  el('path', {
    class: 'nostosym-pylvas',
    d: 'M-2.7 3.6 L-2.7 -5.4 L-1 -3.7 L0.3 -6.6 L1.6 -4.2 L2.7 -5.8 '
      + 'L2.7 3.6 Z',
  }, g);
  // Kaksi uurretta: kaiverruksen varjostus, ei uusi muoto.
  el('path', {
    class: 'nostosym-viiva',
    d: 'M-0.9 2.6 L-0.9 -2.6 M0.9 2.6 L0.9 -2.2',
  }, g);
}

/** VUORENHUIPPU JA AALTO — luonto: vuoret, joet, järvet (sinivihreä). */
function piirraNostosymLuonto(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Kaksi huippua — yksi kolmio olisi teltta, kaksi on vuoristo.
  el('path', {
    class: 'nostosym-vuoristo',
    d: 'M-7.4 2.4 L-2.6 -6.4 L0.2 -1.6 L2.6 -4.8 L7.4 2.4 Z',
  }, g);
  // Aalto huippujen alla: vesi kuuluu samaan kategoriaan.
  el('path', {
    class: 'nostosym-aalto',
    d: 'M-6.6 5.6 Q-4.95 3.4 -3.3 5.6 Q-1.65 7.8 0 5.6 '
      + 'Q1.65 3.4 3.3 5.6 Q4.95 7.8 6.6 5.6',
  }, g);
}

/** HÖYRYÄVÄ MALJA — ruoka ja juoma (viininpunainen). */
function piirraNostosymMalja(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Malja jalkoineen yhtenä täyttönä: leveä suu, kapea jalka.
  el('path', {
    class: 'nostosym-malja',
    d: 'M-6.4 -0.8 L6.4 -0.8 C6.4 3 3.8 5.2 1.3 5.6 L1.3 6.4 L3.4 6.4 '
      + 'L3.4 7.8 L-3.4 7.8 L-3.4 6.4 L-1.3 6.4 L-1.3 5.6 '
      + 'C-3.8 5.2 -6.4 3 -6.4 -0.8 Z',
  }, g);
  // Kaksi höyryjuovaa — ne tekevät maljasta aterian, eivät pikarin.
  el('path', {
    class: 'nostosym-viiva',
    d: 'M-2.2 -3 Q-3.6 -4.6 -2.2 -6.2 M2.2 -3 Q0.8 -4.6 2.2 -6.2',
  }, g);
}

/** LYYRA — kulttuuri: musiikki, teatteri, taide (violetti). */
function piirraNostosymLyyra(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Kaksi käsivartta yhtenä avoimena kaarena — lyyran tunnistettavin
  // ääriviiva. Väri on kaaressa, ei täytössä: muoto pysyy ilmavana.
  el('path', {
    class: 'nostosym-lyyrakaari',
    d: 'M-4.9 -7.4 C-6.4 -2 -4.4 2.4 0 3.2 C4.4 2.4 6.4 -2 4.9 -7.4',
  }, g);
  // Poikkipuu ja kolme kieltä ohuena musteena.
  el('path', {
    class: 'nostosym-viiva',
    d: 'M-5.3 -5.2 L5.3 -5.2 M-1.9 -5.2 L-1.3 2.6 M0 -5.2 L0 3 '
      + 'M1.9 -5.2 L1.3 2.6',
  }, g);
  // Kaikupohja jalkana.
  el('ellipse', {
    class: 'nostosym-lyyrapohja', cx: 0, cy: 5.4, rx: 3, ry: 1.6,
  }, g);
}

/** HAMMASRATAS — tekniikka ja keksinnöt (teräksenharmaa). */
function piirraNostosymRatas(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  el('path', { class: 'nostosym-ratas', d: nostosymRatasPolku() }, g);
  // Napa on paperia: reikä keskellä tekee kiekosta rattaan.
  el('circle', { class: 'nostosym-ratasnapa', r: 2 }, g);
}

/**
 * Rattaan polku lasketaan eikä ladota käsin: kahdeksan hammasta on 32
 * kulmapistettä, ja käsin kirjoitettuna yksikin niistä väärin särkisi
 * pyöreyden huomaamattomasti.
 */
function nostosymRatasPolku() {
  const hampaita = 8;
  const ulko = 7.6;
  const sisa = 5.4;
  // Hampaan lape on kapeampi kuin hammasväli: näin hampaat erottuvat
  // vielä 21 pikselissä eikä ratas puuroudu monikulmioksi.
  const lape = (Math.PI / hampaita) * 0.44;
  const osat = [];
  for (let i = 0; i < hampaita; i += 1) {
    const keski = (i / hampaita) * 2 * Math.PI - Math.PI / 2;
    const vali = ((i + 0.5) / hampaita) * 2 * Math.PI - Math.PI / 2;
    for (const [sade, kulma] of [
      [ulko, keski - lape], [ulko, keski + lape],
      [sisa, keski + lape * 1.9], [sisa, vali + Math.PI / hampaita - lape * 1.9],
    ]) {
      osat.push(`${osat.length ? 'L' : 'M'}${(Math.cos(kulma) * sade).toFixed(2)} `
        + `${(Math.sin(kulma) * sade).toFixed(2)}`);
    }
  }
  return `${osat.join(' ')} Z`;
}

/** VAAKA — kauppa ja raha (oliivi). */
function piirraNostosymVaaka(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Pylväs, orsi ja ripustimet musteella; nuppi orren päällä.
  el('path', {
    class: 'nostosym-viiva',
    d: 'M0 -3.6 L0 5 M-4.6 -3.6 L4.6 -3.6 '
      + 'M-4.6 -3.6 L-6.9 0.6 M-4.6 -3.6 L-2.3 0.6 '
      + 'M4.6 -3.6 L2.3 0.6 M4.6 -3.6 L6.9 0.6',
  }, g);
  el('circle', { class: 'nostosym-vaakakuppi', cx: 0, cy: -4.8, r: 1.1 }, g);
  // Vaakakupit puolikiekkoina ja jalusta — täytöt kantavat värin.
  el('path', {
    class: 'nostosym-vaakakuppi',
    d: 'M-6.9 0.6 A2.4 2.4 0 0 0 -2.3 0.6 Z '
      + 'M2.3 0.6 A2.4 2.4 0 0 0 6.9 0.6 Z '
      + 'M-3 7 L3 7 L1.7 5 L-1.7 5 Z',
  }, g);
}

/** SULKAKYNÄ — kieli, kirjallisuus ja legendat (tummansininen). */
function piirraNostosymSulka(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Sulan lapa viistossa: kaksi kaarta, jotka kohtaavat kärjessä.
  el('path', {
    class: 'nostosym-sulka',
    d: 'M6.6 -7 C1.8 -7 -2.8 -3.6 -4.8 1.4 L-3 3 '
      + 'C1.6 1.6 5 -2.4 6.6 -7 Z',
  }, g);
  // Ruoto jatkuu kynän teräksi, ja terän alla on kirjoitettu viiva.
  el('path', {
    class: 'nostosym-viiva',
    d: 'M5.4 -5.6 C1.6 -4.4 -1.8 -1.6 -3.9 2.2 M-3.9 2.2 L-6.2 6 '
      + 'M-6.8 7.8 Q-4.4 6.6 -2 7.4',
  }, g);
}

/** ANKKURI — merenkulku ja satamat (meren tummansininen). */
function piirraNostosymMeriankkuri(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Rengas ja poikkipuu musteella, kuten kaiverruksen ohuet osat.
  el('circle', { class: 'nostosym-ankkurirengas', cx: 0, cy: -6 , r: 1.5 }, g);
  el('path', { class: 'nostosym-viiva', d: 'M-3.4 -3.2 L3.4 -3.2' }, g);
  // Runko ja kynsikaari kantavat värin paksumpana viivana.
  el('path', {
    class: 'nostosym-ankkurirauta',
    d: 'M0 -4.5 L0 6.6 M-6 1.4 C-5.6 4.6 -3.2 6.4 0 6.6 '
      + 'C3.2 6.4 5.6 4.6 6 1.4',
  }, g);
  // Kourat: pieni väkänen kummankin kynnen päähän.
  el('path', {
    class: 'nostosym-ankkurikoura',
    d: 'M-6 1.4 L-7.6 3.6 L-4.4 3.4 Z M6 1.4 L7.6 3.6 L4.4 3.4 Z',
  }, g);
}

/** LAAKERISEPPELE — urheilu ja kisat (kullanvihreä). */
function piirraNostosymSeppele(g) {
  el('circle', { class: 'nostosym-laatta', r: 10.4 }, g);
  el('circle', { class: 'nostosym-kehys', r: 10.4 }, g);
  // Kaksi oksaa, jotka nousevat alhaalta ja jäävät auki ylhäältä —
  // seppeleen tunnistaa juuri aukosta.
  el('path', {
    class: 'nostosym-seppele',
    d: 'M0 7.4 C-4.6 6.6 -7 2.6 -6.2 -3.6 M0 7.4 C4.6 6.6 7 2.6 6.2 -3.6',
  }, g);
  // Lehdet lyhyinä piirtoina oksien MOLEMMIN puolin — pelkät
  // ulkosyrjän piirrot jättivät seppeleen katkoympyräksi 21 pikselissä.
  el('path', {
    class: 'nostosym-lehva',
    d: 'M-6.4 -2.6 L-8.2 -4 M-6.6 0.4 L-8.6 -0.4 M-5.6 3.4 L-7.6 3.2 '
      + 'M-3.6 5.9 L-5 7.4 M6.4 -2.6 L8.2 -4 M6.6 0.4 L8.6 -0.4 '
      + 'M5.6 3.4 L7.6 3.2 M3.6 5.9 L5 7.4 '
      + 'M-6 -2.2 L-4.4 -1 M-6 1 L-4.2 1.6 M-4.7 3.9 L-3.2 4.2 '
      + 'M6 -2.2 L4.4 -1 M6 1 L4.2 1.6 M4.7 3.9 L3.2 4.2',
  }, g);
}

/*
 * KIRJASTON TAULU: kategoria → piirtäjä. Avaimet ovat samat kuin täyn
 * ja kohteen `symboli`-kentän arvot (Raamattu, SYMBOLITAKSONOMIA).
 * Tuntematon tai puuttuva arvo piirretään huutomerkkinä
 * (piirraNostosymboli) — kutsuja saa siis antaa kentän suodattamatta.
 */
const NOSTOSYM_PIIRTAJAT = {
  huuto: piirraNostosymHuuto,
  elain: piirraNostosymPollo,
  silma: piirraNostosymSilma,
  historia: piirraNostosymPylvas,
  luonto: piirraNostosymLuonto,
  ruoka: piirraNostosymMalja,
  kulttuuri: piirraNostosymLyyra,
  tekniikka: piirraNostosymRatas,
  kauppa: piirraNostosymVaaka,
  sana: piirraNostosymSulka,
  merenkulku: piirraNostosymMeriankkuri,
  urheilu: piirraNostosymSeppele,
};

/** Tunnetut symbolikategoriat — yksi totuus myös kutsujien tarkistuksiin. */
export const NOSTOSYM_TYYPIT = new Set(Object.keys(NOSTOSYM_PIIRTAJAT));

/**
 * KIRJASTON OVI: piirtää kategorian symbolin ryhmään origon ympärille
 * (~21 px merkki lehden perustasolla). Sekä täkysymbolit (tämä
 * tiedosto) että kartan kohdemerkit (js/fokuskohteet.js) piirtävät
 * tällä — kutsuja hoitaa paikan ja mittakaavan ankkuriryhmällään.
 */
export function piirraNostosymboli(g, symboli) {
  (NOSTOSYM_PIIRTAJAT[symboli] ?? piirraNostosymHuuto)(g);
}

/**
 * AKTIIVISEN TÄYN ANKKURI — pieni mustepiste, jonka päälle kupla
 * asettuu ja johon sen nokka osoittaa.
 *
 * Piste on tarkoituksella hillitty: kupla on jo iso ja se kertoo
 * itsestään, joten kartalle jää vain merkintä siitä KOHDASTA, jota
 * juttu koskee. Piste ei ota napautuksia vastaan (css: pointer-events),
 * koska kupla on sen päällä ja sen oma nappi vie lunastukseen.
 */
function piirraNostosymAnkkuri(g) {
  el('circle', { class: 'nostosym-laatta', r: 5.6 }, g);
  el('circle', { class: 'nostosym-kehys', r: 5.6 }, g);
  el('circle', { class: 'nostosym-ankkuripiste', r: 2.0 }, g);
}

/* ==================== KERROS ==================== */

/** Kerros SVG:n juureen kerran; palauttaa null ilman karttaa. */
function nostosymKerros(ui) {
  if (!ui?.svg) return null;
  if (!ui.nostosymKerros?.isConnected || ui.nostosymKerros.ownerSVGElement !== ui.svg) {
    const kerros = el('g', { class: 'fokusnosto-symbolit' });
    /*
     * Vihreä piste pitää itsensä viimeisenä (js/fokuspiste.js
     * varmistaPistekerros). Jos se on jo olemassa, mennään sen eteen —
     * muuten kaksi kerrosta vaihtaisi paikkaa joka piirrossa.
     */
    const piste = ui.fokuspisteKerros?.isConnected
      && ui.fokuspisteKerros.ownerSVGElement === ui.svg ? ui.fokuspisteKerros : null;
    if (piste) ui.svg.insertBefore(kerros, piste);
    else ui.svg.appendChild(kerros);
    ui.nostosymKerros = kerros;
    ui.nostosymAvain = null;
  }
  return ui.nostosymKerros;
}

/** Yksi symbolimerkki: näkymätön osuma-alue ja sen päällä kuva. */
function piirraNostosymMerkki(ui, ryhma, merkinta, valitse) {
  /*
   * TYYPPILUOKKA ON OMA NIMENSÄ (`nostosym-tyyppi-*`) eikä sama kuin
   * muodon luokka: SVG:ssä `fill` ja `stroke` PERIYTYVÄT, joten ryhmälle
   * osunut muototyyli valuisi myös näkymättömään osuma-alueeseen ja
   * piirtäisi sen ympärille kehän.
   */
  const g = el('g', { class: `fokusnosto-symboli nostosym-tyyppi-${merkinta.symboli}` }, ryhma);
  g.dataset.nosto = merkinta.id;
  g.setAttribute('role', 'button');
  g.setAttribute('tabindex', '0');
  g.setAttribute('aria-label', `${merkinta.otsikko} — nosta esiin`);
  el('circle', { class: 'nostosym-osuma', r: NOSTOSYM_OSUMA_R }, g);
  piirraNostosymboli(g, merkinta.symboli);
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
    // Kesken animaation (nopan pyörähdys, siirtymä) kartta ottaa yhä
    // napautuksia vastaan — sama kiireen esto kuin vihreällä pisteellä.
    if (ui.busy) return;
    sfx.play('paper');
    valitse?.(merkinta.id);
  };
  g.addEventListener('click', avaa);
  g.addEventListener('keydown', (tapahtuma) => {
    if (tapahtuma.key === 'Enter' || tapahtuma.key === ' ') avaa(tapahtuma);
  });
  return g;
}

/**
 * SYMBOLIT JA AKTIIVISEN ANKKURI KARTALLE.
 *
 * @param {object} ui
 * @param {object} tila
 * @param {Array} tila.merkinnat  [{ id, otsikko, symboli, paikka:{x,y} }]
 *   — järjestyksessä; aktiivinen mukana, jos sillä on paikka.
 * @param {string|null} tila.aktiivinen  Kuplassa olevan täyn tunnus.
 * @param {(id:string)=>void} tila.valitse  Symbolin napautus.
 *
 * TYÖ TEHDÄÄN VAIN KUN SISÄLTÖ MUUTTUI, kuten muillakin kerroksilla:
 * zoomi muuttaa vain ankkuriryhmien muunnosta, ei yhtäkään solmua.
 */
export function paivitaNostosymbolit(ui, tila = {}) {
  if (typeof document === 'undefined') return;
  const kerros = nostosymKerros(ui);
  if (!kerros) return;
  const merkinnat = Array.isArray(tila.merkinnat) ? tila.merkinnat : [];
  const avain = merkinnat.length
    ? `${ui.game?.pack?.id}:${tila.aktiivinen ?? '-'}:`
      + merkinnat.map((m) => `${m.id}@${m.paikka.x},${m.paikka.y}/${m.symboli}`).join('|')
    : 'tyhja';
  if (ui.nostosymAvain !== avain) {
    ui.nostosymAvain = avain;
    kerros.textContent = '';
    ui.nostosymRyhmat = [];
    ui.nostosymAnkkurit = [];
    for (const merkinta of merkinnat) {
      const onAktiivinen = merkinta.id === tila.aktiivinen;
      // Kiertävällä laudalla sama merkki molempiin kohtiin (ks. sääntö 1).
      for (const x of ui.kiertoKohdat?.(merkinta.paikka.x) ?? [merkinta.paikka.x]) {
        const ryhma = el('g', { class: 'fokusnosto-symboliryhma' }, kerros);
        ui.nostosymRyhmat.push({ g: ryhma, x, y: merkinta.paikka.y });
        if (onAktiivinen) {
          const ankkuri = el('g', { class: 'fokusnosto-ankkuri' }, ryhma);
          piirraNostosymAnkkuri(ankkuri);
          ui.nostosymAnkkurit.push(ankkuri);
        } else {
          piirraNostosymMerkki(ui, ryhma, merkinta, tila.valitse);
        }
      }
    }
  }
  asemoiNostosymbolit(ui);
}

/**
 * VAIN MUUNNOKSET UUSIKSI — kutsutaan myös silloin, kun kartta liikkuu
 * ilman uutta piirtoa (js/fokusnosto.js kartan vahti). Yksi
 * setAttribute per ryhmä, ei yhtäkään uutta solmua.
 */
export function asemoiNostosymbolit(ui, suhde = 1) {
  /*
   * MITTAKAAVA ON VAKIO, EI ZOOMIN KÄÄNTEISLUKU (omistajan LOPULLINEN
   * linjaus 26.8.2026, Raamattu): täkysymbolit elävät kartan mukana
   * kuten muutkin lehden merkit. `suhde` (nipistyseleen kerroin) on
   * merkitsevä vain lehdettömällä varapolulla — ks. js/ui.js
   * fokusMerkkiSkaala.
   */
  const s = ui?.fokusMerkkiSkaala?.(suhde);
  // Ilman mitattavaa näkymää muunnos jätetään entiselleen: väärä
  // mittakaava olisi pahempi kuin yhden kehyksen viive.
  if (!(s > 0)) return;
  /*
   * Kaupungin päälle osuvat symbolit siirtyvät yhteiseen nippuun
   * kaupungin oikealle puolelle (js/fokusniput.js — sama passi kuin
   * kohdemerkeillä, jotta sarake on yksi). Passi kirjoittaa ryhmiin
   * `nippu`-kentän; muut merkit pysyvät omilla paikoillaan.
   */
  niputaFokusmerkit(ui, s);
  const zoom = s.toFixed(4);
  for (const ryhma of ui.nostosymRyhmat ?? []) {
    const x = ryhma.nippu?.x.toFixed(2) ?? ryhma.x;
    const y = ryhma.nippu?.y.toFixed(2) ?? ryhma.y;
    ryhma.g.setAttribute('transform', `translate(${x} ${y}) scale(${zoom})`);
  }
  // Rekisteröinti nipistykseen jää (js/kartta.js vastaskaalaaMerkit):
  // varapolku on yhä ruutumitassa ja tarvitsee vastaskaalan.
  (ui.nipistysVastaskaalaajat ??= new Set())
    .add(ui.nostosymVastaskaala ??= (s) => asemoiNostosymbolit(ui, s));
}

/**
 * Aktiivisen täyn ankkuri RUUDULLA — se kopio, joka on lähimpänä
 * näkymän keskustaa.
 *
 * Kiertävällä laudalla sama paikka on kartalla kahdesti, ja kupla on
 * asetettava sen kopion viereen, joka pelaajalla oikeasti on edessään.
 */
export function nostosymAnkkuri(ui) {
  const ankkurit = (ui?.nostosymAnkkurit ?? []).filter((a) => a.isConnected);
  if (!ankkurit.length) return null;
  if (ankkurit.length === 1) return ankkurit[0];
  const keski = (globalThis.innerWidth ?? 0) / 2;
  let paras = null;
  let parasEro = Infinity;
  for (const ankkuri of ankkurit) {
    const laatikko = ankkuri.getBoundingClientRect();
    if (!(laatikko.width > 0)) continue;
    const ero = Math.abs(laatikko.left + laatikko.width / 2 - keski);
    if (ero < parasEro) { parasEro = ero; paras = ankkuri; }
  }
  return paras ?? ankkurit[0];
}

/** Symbolit pois. Kerros jää paikalleen tyhjänä, kuten muillakin. */
export function nollaaNostosymbolit(ui) {
  if (!ui) return;
  ui.nostosymAvain = null;
  ui.nostosymRyhmat = [];
  ui.nostosymAnkkurit = [];
  if (ui.nostosymKerros?.isConnected) ui.nostosymKerros.textContent = '';
}
