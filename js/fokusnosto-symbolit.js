/*
 * TÄKYN ANKKURISYMBOLI JA KARTTASYMBOLIEN KIRJASTO — kuplan alla oleva
 * merkintä paikasta, ja kaikkien karttamerkkien yhteiset piirtäjät.
 *
 * Raamatun osio "Fokusmoodi", kohta TÄKYSYMBOLIT (omistaja 25.8.2026):
 * *"kartalla on tekstikuplassa VAIN YKSI täkynosto kerrallaan; muut
 * vastaavat täkykohteet merkitään yksinkertaisilla symboleilla —
 * keltainen huutomerkki tms. skandaalille/uskomattomalle, ja SÖPÖILLE
 * eläinkohteille PÖLLÖVAUVAN kuva; muitakin symboleita voidaan
 * kehittää. Symbolit tehdään kartan henkeen ja samalla tyylillä
 * (seepiamuste, aikakauden karttamerkki)."*
 *
 * TÄMÄN KERROKSEN OSUUS TUOSTA KAPENI 26.8.2026 illalla, kun omistaja
 * linjasi: *"Täkyjä josta tulee puhekupla pitää olla vain yksi per maa.
 * Kaikki muut normaaleita."* Maan poolissa on nyt tasan yksi täky, joten
 * "muut vastaavat täkykohteet" ovat kartan TAVALLISIA KOHTEITA
 * (js/fokuskohteet.js) — ja koska ne piirtyvät samasta kirjastosta,
 * symbolitaksonomia näkyy kartalla entiseen tapaan. Tämä kerros piirtää
 * enää sen yhden täyn ankkurin, ja siksi täällä ei ole enää
 * napautettavia merkkejä eikä osuma-alueita.
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
 * valmiilla merkinnällä. Näin näkyvyysehdot pysyvät yhdessä paikassa,
 * kuten liuskan aikana. Kirjaston (piirraNostosymboli) kutsujat
 * hoitavat itse paikan ja mittakaavan — piirtäjä tuottaa aina saman
 * ~21 px merkin origon ympärille.
 *
 * ── KOLME SÄÄNTÖÄ, JOTKA ON PERITTY MUILTA KARTAN KERROKSILTA ──────
 *
 * 1. OMA KERROS SVG:N JUURESSA (ui.svg:n suora lapsi). Kiertävän laudan
 *    <use>-kopio ei kelpaa: sama paikka on kartalla kahdesti, ja kuplan
 *    on löydettävä se ankkuri, joka pelaajalla oikeasti on edessään
 *    (js/fokusnosto.js nostoAnkkurinPaikka). Merkki piirretään siksi
 *    oikeana elementtinä
 *    jokaiseen kiertokohtaan (ui.kiertoKohdat) — sama ratkaisu kuin
 *    kohderenkailla, vinjeteillä, fokuskohteilla ja vihreällä pisteellä
 *    (js/fokuspiste.js).
 *
 * 2. EI SUODATTIMIA (js/fokuskartta.js sääntö 3, tests/rules.test.mjs):
 *    suodatettu kerros palaa iOS:n taustalta tyhjänä. Symbolit ovat
 *    siis pelkkiä täyttöjä ja viivoja.
 *
 * 3. KARTAN MITTAKAAVA, EI RUUDUN (omistajan LOPULLINEN linjaus
 *    26.8.2026, Raamattu). Ankkuriryhmä on laudan koordinaateissa ja
 *    skaalataan VAKIOLLA (js/ui.js fokusMerkkiSkaala), jolloin merkin
 *    lapset ovat ruudun pikseleitä LEHDEN PERUSTASOLLA ja elävät siitä
 *    kartan mukana — sama mitta kuin kartan kohdemerkeillä.
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
 *
 * ── LÄPINÄKYVÄ MUSTETYYLI (omistajan valinta 27.8.2026, montaasin C) ─
 *
 * Merkeillä oli 26.–27.8.2026 paperinvaalea aluslaatta ja
 * musteviivainen kehä: pergamentille painettu poletti, jonka päällä
 * glyyfi istui. Omistaja valitsi kolmen konseptin vertailusta C:n:
 * *"koko karttasymboliperhe siirtyy läpinäkyvään mustetyyliin"* —
 * merkki piirretään SUORAAN pergamenttikartalle ilman ympyräpohjaa,
 * samaan tapaan kuin lehteen poltetut vuorimerkit, ja sen perään
 * ladotaan LYHYT NIMIÖ kartan nimiötypografialla (ks. osio NIMIÖ:
 * siellä myös se, miksi peräkkäin eikä alle).
 *
 * KAKSI SEURAUSTA, JOTKA ON HYVÄ TIETÄÄ:
 *
 * a) GLYYFI TÄYTTÄÄ ENTISEN LAATAN. Kuva piirtyy nyt koko entisen
 *    laatan levyisenä (NOSTOSYM_R * 2 = 20,8) eikä laatan sisään
 *    jätettyyn 15 yksikön ruutuun. Merkin ULKOMITTA ei siis muuttunut
 *    — kaikki sitä lukevat vakiot (js/fokusniput.js NIPPU_TAKY_R,
 *    js/fokuskohteet.js KOHDE_SYMBOLI_R) pitävät edelleen paikkansa —
 *    mutta itse kuva on kolmanneksen isompi ja siksi luettavampi
 *    ilman laattaa.
 *
 * b) KONTRASTI ON KUVAN VASTUULLA. Laatta antoi ennen jokaiselle
 *    glyyfille vaalean pohjan; nyt merkki lepää akvarellitopografian
 *    päällä. Kuudelle vanhalle glyyfille (huuto, kauppa, kulttuuri,
 *    ruoka, sana, urheilu) generoitiin 27.8.2026 uudet, selvästi
 *    tummemmalla musteella piirretyt versiot juuri tästä syystä.
 *
 * ── KARTALLE VIIVA, KORTILLE MUSTEPIIRROS (27.8.2026 ilta) ─────────
 *
 * Kontrastia yritettiin lisää — ja siihen se kaatui. Omistajan
 * palaute laitteelta v1211: nykyiset symbolit ovat *"aivan liian
 * raskaita"*, ja kartalle kuuluu *"superyksinkertainen,
 * minimalistinen, vanhan ajan kartan fiilis — kuten karttaan alunperin
 * poltettu yksinkertainen vuorisymboli (pieni kolmio
 * hachure-viivoituksella)"*. Generoitu kaiverrus on kuvitusta, ja
 * kuvitus vie kartalla katseen kartalta.
 *
 * TIEDOSTOSSA ON SIIS NYT KAKSI MERKKIPERHETTÄ, ja niillä on eri työ:
 *
 *   NOSTOSYM_MINI      Kartan viivamerkki: poltetun vuorikolmion
 *                      mitta (13 yksikköä), muste ja viivanpaino.
 *                      Tämän piirtää piirraNostosymKartalle ja
 *                      piirraNostosymMini — kaikki kartalla oleva.
 *   NOSTOSYM_KUVAT     Generoitu mustepiirros. Jäi KORTIN ylärivin
 *                      luokkatunnukseksi (piirraNostosymboli,
 *                      js/fokuskohteet.js piirraKohdeYlarivi), jossa
 *                      merkki on 1,5 em ja kuvitus on paikallaan.
 *
 * Nimiö seurasi samaa linjaa: se latoo nyt lehden omalla antiikvalla
 * eikä isoisän kaunokäsialalla (ks. osio NIMIÖ).
 */
import { el, maare } from './mapart.js';
import { niputaFokusmerkit } from './fokusniput.js';

/**
 * WEBP-GLYYFIN SÄDE ruudun pikseleinä lehden perustasolla — sama luku
 * kuin entisen aluslaatan säde, jotta merkin ulkomitta ja kaikki siihen
 * nojaavat välimatkat säilyivät laatan poistuessa ennallaan.
 *
 * TÄMÄ ON NYT VAIN KORTIN MITTA (27.8.2026 ilta). Kartalla merkki on
 * viivamerkki (NOSTOSYM_MINI_R); raskas mustepiirros jäi kohdekortin
 * ylärivin luokkatunnukseksi, johon se sopii (js/fokuskohteet.js
 * piirraKohdeYlarivi).
 */
export const NOSTOSYM_R = 10.4;

/* ==================== KARTAN VIIVAMERKKI ==================== */

/*
 * MINIMERKIT — KARTTAAN POLTETUN VUORIKOLMION MITASSA JA MUSTEESSA
 * (omistajan palaute laitteelta v1211: *"nykyiset symbolit ovat aivan
 * liian raskaita … superyksinkertainen, minimalistinen, vanhan ajan
 * kartan fiilis — kuten karttaan alunperin poltettu yksinkertainen
 * vuorisymboli (pieni kolmio hachure-viivoituksella)"*).
 *
 * ── MITÄ MUUTTUI ───────────────────────────────────────────────────
 *
 * 26.–27.8.2026 kartan kohdemerkki oli GENEROITU MUSTEPIIRROS
 * (NOSTOSYM_KUVAT, sym-*.webp): valokuvamainen kaiverrus, jossa on
 * täytettyjä pintoja ja sävyjä. Pergamentin päällä se luki
 * kuvituksena eikä karttamerkkinä — lehteen poltettu vuorikolmio on
 * kolme viivaa ja neljä hachurea, ja merkin pitää olla samaa sukua.
 * Nyt kartan merkki piirretään VIIVOINA tästä taulusta; webp-glyyfit
 * jäivät kortin ylärivin tunnuksiksi (piirraNostosymboli).
 *
 * ── MITTAKAAVA ON POLTETUN KOLMION ─────────────────────────────────
 *
 * Lehti hiottiin 1600 prototyyppipikselin levyisenä (tools/fokuskartta/
 * piirto.js S), ja poltettu vuorikolmio on siinä `r = 6.5` eli 13
 * prototyyppipikseliä leveä. Kartalla yksi kirjaston yksikkö on
 * KOHDE_SYMBOLI_SKAALAn (js/fokuskohteet.js) jälkeen 0,524 ruudun
 * pikseliä lehden perustasolla, ja Kreikan lehdellä yksi
 * prototyyppipikseli on 0,508 — käytännössä sama mitta. Siksi tämän
 * taulun koordinaatit ovat SUORAAN piirto.js:n prototyyppipikseleitä:
 * `r = 6.5` täällä on sama kolmio kuin lehteen poltettu.
 *
 * (Suhde ei ole täsmälleen sama joka laitteella — poltettu mitta on
 * lehden yksiköitä ja merkin mitta ruudun pikseleitä perustasolla —
 * mutta merkin ON pysyttävä luettavana myös kapealla puhelimella,
 * jossa poltettu teksti kutistuu kolmeen pikseliin. Kiinteä mitta on
 * siis tarkoituksellinen: sama kokoluokka, ei orjallinen kytkentä.)
 *
 * ── SÄÄNNÖT, JOITA KAIKKI MERKIT NOUDATTAVAT ───────────────────────
 *
 * 1. VAIN VIIVAA. Ei täytettyjä pintoja (pisteitä lukuun ottamatta:
 *    poltettu kartta itsekin merkitsee kaupungin 1,3 px:n täytetyllä
 *    pisteellä), ei sävyjä, ei suodattimia (js/fokuskartta.js sääntö 3).
 * 2. KARTAN MUSTE, EI KATEGORIAVÄRIÄ. Väri on `.nostosym-mini`-luokassa
 *    ja se on sama seepia kuin poltetuilla merkinnöillä. Kategorian
 *    kertoo MUOTO — heraldiset aksentit (--sym-*) elävät yhä kortin
 *    ylärivillä, jossa merkki on iso.
 * 3. KAKSI PAINOA. `vahva` on merkin ääriviiva (poltetun kolmion 1,15)
 *    ja `ohut` on hachure tai varjostus (0,75, haaleampi muste).
 * 4. KORKEINTAAN KOURALLINEN VETOJA. Merkki on kartalla ~7 px leveä.
 */

/** Viivamerkin puolileveys: poltetun vuorikolmion oma `r`. */
export const NOSTOSYM_MINI_R = 6.5;

/**
 * RASTERIN RUUTU on hitusen merkkiä isompi.
 *
 * Kolmion jalat ulottuvat täsmälleen säteelle 6,5, ja viiva on 1,15
 * leveä — puolet siitä jäisi ruudun ulkopuolelle ja leikkautuisi
 * bittikartan reunaan. Väljyys on siis puolikas paksuin viiva ja
 * hitunen päälle; merkin OMA mitta (välit, väistöt, erottelu) on yhä
 * NOSTOSYM_MINI_R.
 */
const NOSTOSYM_MINI_RUUTU = 7.4;

/*
 * POLTETUN VUORIKOLMION HACHURET LUKUINA.
 *
 * piirto.js piirtää ne silmukassa (`t = i/5`, i = 1..4) kolmion
 * huipulta jalkaa kohti. Samat luvut on laskettu tähän auki, jotta
 * kartan merkki on kirjaimellisesti sama kuvio eikä sen tulkinta.
 */
const NOSTOSYM_HACHURE = [
  'M-0.72 -3.87 L-1.30 4.23', 'M0.72 -3.87 L1.30 4.23',
  'M-1.43 -2.87 L-2.60 4.23', 'M1.43 -2.87 L2.60 4.23',
  'M-2.15 -1.87 L-3.90 4.23', 'M2.15 -1.87 L3.90 4.23',
  'M-2.86 -0.87 L-5.20 4.23', 'M2.86 -0.87 L5.20 4.23',
].join(' ');

/**
 * MINIMERKKIEN TAULU: tunnus → { vahva, ohut, ympyrat, pisteet }.
 *
 * `vahva` ja `ohut` ovat SVG-polkuja (`d`). Sama merkkijono kelpaa
 * sekä SVG:lle (varapolku ja täyn ankkuri) että canvasille
 * (`Path2D`, rasteroitu karttamerkki) — piirtotapoja on kaksi, mutta
 * muoto on määritelty kerran.
 */
const NOSTOSYM_MINI = {
  /*
   * VUORI — poltettu kolmio sellaisenaan (piirto.js kohta 8e). Tämä on
   * koko perheen mitta- ja tyylimalli: kaikki muut merkit on piirretty
   * mahtumaan samaan ruutuun ja samalla musteella.
   */
  vuori: {
    vahva: 'M-6.50 4.23 L0 -4.88 L6.50 4.23',
    ohut: NOSTOSYM_HACHURE,
  },
  /*
   * MERI JA JOKI — kaksi aaltoviivaa, atlaksen vanhin vesimerkintä.
   * Alempi on ohuempi, jolloin merkki syvenee ilman toista muotoa.
   */
  meri: {
    vahva: 'M-6.40 -1.40 q1.6 -1.9 3.2 0 q1.6 1.9 3.2 0 q1.6 -1.9 3.2 0 q1.6 1.9 3.2 0',
    ohut: 'M-6.40 2.40 q1.6 -1.9 3.2 0 q1.6 1.9 3.2 0 q1.6 -1.9 3.2 0 q1.6 1.9 3.2 0',
  },
  /* HUUTOMERKKI — skandaali. Yksi veto ja piste; ei tule tätä yksinkertaisemmaksi. */
  huuto: {
    vahva: 'M0 -5.80 L0 1.40',
    pisteet: [{ cx: 0, cy: 4.0, r: 0.85 }],
  },
  /*
   * PÖLLÖNPOIKANEN — pallo, kaksi TÖPÖÄ tupsua, kaksi silmää ja nokka.
   * Tupsut ovat lyhyet ja jyrkät: pitkinä ja ulospäin ne lukivat
   * tuntosarviksi, ja merkistä tuli kartalle pieni robotti.
   */
  elain: {
    vahva: 'M-3.00 -3.30 L-4.10 -5.20 M3.00 -3.30 L4.10 -5.20',
    ohut: 'M0 1.50 L-0.95 0.25 L0.95 0.25 Z',
    ympyrat: [{ cx: 0, cy: 0.6, r: 4.6 }],
    pisteet: [{ cx: -1.9, cy: -0.7, r: 0.9 }, { cx: 1.9, cy: -0.7, r: 0.9 }],
  },
  /* SILMÄ — kaksi kaarta, terä ja piste. */
  silma: {
    vahva: 'M-6.40 0 C-4 -3.6 4 -3.6 6.40 0 C4 3.6 -4 3.6 -6.40 0 Z',
    ympyrat: [{ cx: 0, cy: 0, r: 1.7 }],
    pisteet: [{ cx: 0, cy: 0, r: 0.7 }],
  },
  /* MURTUNUT PYLVÄS — historia. Kaksi varsiviivaa, murtuma ja jalusta. */
  historia: {
    vahva: 'M-3.80 5.00 L3.80 5.00 M-1.90 5.00 L-1.90 -3.60 M1.90 5.00 L1.90 -5.00 '
      + 'M-1.90 -3.60 L-0.70 -4.60 L0.50 -3.40 L1.90 -5.00',
    ohut: 'M0 4.20 L0 -3.90',
  },
  /* MALJA — ruoka ja juoma. Ääriviiva, jalka ja kaksi höyryjuovaa. */
  ruoka: {
    vahva: 'M-3.90 -2.80 L3.90 -2.80 C3.70 1.20 2.00 2.90 0 3.20 '
      + 'C-2.00 2.90 -3.70 1.20 -3.90 -2.80 Z M0 3.20 L0 5.20 M-2.90 5.40 L2.90 5.40',
    ohut: 'M-1.80 -4.20 q-1.1 -1.2 0 -2.4 M1.80 -4.20 q-1.1 -1.2 0 -2.4',
  },
  /*
   * LYYRA — kulttuuri. Kaksi käsivartta, poikkipuu, kolme kieltä ja
   * kaikupohja. Käsivarret KAARTUVAT ULOS ja kokoontuvat alas: yhtenä
   * umpinaisena kaarena merkki luki koriksi eikä soittimeksi.
   */
  kulttuuri: {
    vahva: 'M-2.40 3.60 C-5.20 1.20 -5.60 -3.00 -4.60 -6.00 '
      + 'M2.40 3.60 C5.20 1.20 5.60 -3.00 4.60 -6.00 '
      + 'M-5.00 -4.60 L5.00 -4.60 M-2.40 3.60 L2.40 3.60',
    ohut: 'M-1.60 -4.60 L-1.30 3.60 M0 -4.60 L0 3.60 M1.60 -4.60 L1.30 3.60',
  },
  /*
   * HÖYRYVETURI — tekniikka. Matala runko, KORKEA savupiippu ja kaksi
   * eri kokoista pyörää; kulkusuunta oikealle kuten matka. Höyrypilvi
   * jäi pois: se olisi noussut merkin ruudun ulkopuolelle, ja piipun
   * ja vetopyörän ero riittää kertomaan koneen veturiksi.
   */
  tekniikka: {
    vahva: 'M-6.20 2.00 L-6.20 -1.60 L4.40 -1.60 L5.40 -0.60 L5.40 2.00 Z '
      + 'M-4.80 -1.60 L-4.80 -5.60 L-3.00 -5.60 L-3.00 -1.60',
    ympyrat: [{ cx: 2.8, cy: 3.8, r: 1.8 }, { cx: -3.4, cy: 4.2, r: 1.3 }],
  },
  /* VAAKA — kauppa. Pylväs, orsi, ripustimet ja kaksi kuppikaarta. */
  kauppa: {
    vahva: 'M0 -3.40 L0 4.60 M-4.80 -3.40 L4.80 -3.40 M-2.40 4.80 L2.40 4.80 '
      + 'M-6.20 -0.60 A2 2 0 0 0 -3.40 -0.60 M3.40 -0.60 A2 2 0 0 0 6.20 -0.60',
    ohut: 'M-4.80 -3.40 L-6.20 -0.60 M-4.80 -3.40 L-3.40 -0.60 '
      + 'M4.80 -3.40 L3.40 -0.60 M4.80 -3.40 L6.20 -0.60',
  },
  /* SULKAKYNÄ — tarinat ja kieli. Lapa kahtena kaarena, ruoto teräksi. */
  sana: {
    vahva: 'M5.60 -5.60 C2.00 -4.40 -1.60 -1.20 -3.60 2.60 '
      + 'C0.60 0.40 3.60 -2.60 5.60 -5.60 M-3.60 2.60 L-5.40 5.40',
    ohut: 'M3.90 -3.90 L2.40 -4.90 M1.90 -2.00 L0.40 -3.00 M-0.20 -0.10 L-1.70 -1.00',
  },
  /* ANKKURI — merenkulku. Rengas, poikkipuu, varsi ja kynsikaari. */
  merenkulku: {
    vahva: 'M0 -4.00 L0 5.00 M-3.20 -2.60 L3.20 -2.60 '
      + 'M-4.80 1.40 C-4.40 3.80 -2.40 5.00 0 5.20 C2.40 5.00 4.40 3.80 4.80 1.40',
    ohut: 'M-4.80 1.40 L-6.10 3.20 M4.80 1.40 L6.10 3.20',
    ympyrat: [{ cx: 0, cy: -5.0, r: 1.2 }],
  },
  /* LAAKERISEPPELE — urheilu. Kaksi oksaa auki ylhäältä, lehdet ohuina. */
  urheilu: {
    vahva: 'M0 5.60 C-3.60 4.60 -5.30 1.20 -4.60 -4.00 '
      + 'M0 5.60 C3.60 4.60 5.30 1.20 4.60 -4.00',
    ohut: 'M-5.00 -2.20 L-6.30 -3.40 M-5.20 0.40 L-6.40 -0.20 M-4.40 2.80 L-5.80 2.80 '
      + 'M-2.60 4.80 L-3.50 6.10 M5.00 -2.20 L6.30 -3.40 M5.20 0.40 L6.40 -0.20 '
      + 'M4.40 2.80 L5.80 2.80 M2.60 4.80 L3.50 6.10',
  },
  /* PORTTITORNI — kaupunki. Yksi siluetti sakaroineen, alla holvi. */
  kaupunki: {
    vahva: 'M-3.40 5.40 L-3.40 -5.40 L-1.90 -5.40 L-1.90 -4.20 L-0.75 -4.20 '
      + 'L-0.75 -5.40 L0.75 -5.40 L0.75 -4.20 L1.90 -4.20 L1.90 -5.40 '
      + 'L3.40 -5.40 L3.40 5.40 M-4.60 5.40 L4.60 5.40',
    ohut: 'M-1.50 5.40 L-1.50 1.60 A1.5 1.5 0 0 1 1.50 1.60 L1.50 5.40',
  },
  /* KOMPASSIRUUSUN TÄHTI — kadonnut ihme. Kahdeksan sakaraa ääriviivana. */
  ihme: {
    vahva: 'M0 -6.40 L1.50 -1.50 L6.40 0 L1.50 1.50 L0 6.40 L-1.50 1.50 '
      + 'L-6.40 0 L-1.50 -1.50 Z',
    ohut: 'M-3.40 -3.40 L-0.90 -0.90 M3.40 -3.40 L0.90 -0.90 '
      + 'M-3.40 3.40 L-0.90 0.90 M3.40 3.40 L0.90 0.90',
  },
};

/*
 * LUONNON KAKSI MUOTOA. Kategoria `luonto` kattaa vuoret, meret, saaret
 * ja joet (js/fokuskohteet.js KOHDE_TYYPPISYMBOLIT), mutta kartalla
 * vedelle ja kalliolle on eri merkki jo 1800-luvun atlaksissa — ja
 * omistaja pyysi juuri ne kaksi nimeltä. Kohteen TYYPPI ratkaisee;
 * kortin ylärivi puhuu yhä yhdestä Luonto-luokasta.
 */
const NOSTOSYM_MINI_LAJIT = { meri: 'meri', joki: 'meri' };

/**
 * Kategoria + kohteen tyyppi → minimerkin tunnus.
 *
 * Viety ulos, jotta portti pääsee tarkistamaan sen mitä silmä ei
 * lyhyellä katsomisella huomaa: jos taksonomiaan tulee uusi kategoria
 * eikä sille piirretä viivamerkkiä, kartalle ilmestyy huutomerkki
 * ilman että mikään valittaa (tests/fokusvirta.test.mjs).
 */
export function nostosymMiniTunnus(symboli, laji) {
  if (symboli === 'luonto') return NOSTOSYM_MINI_LAJIT[laji] ?? 'vuori';
  return NOSTOSYM_MINI[symboli] ? symboli : 'huuto';
}

/**
 * MINIMERKKI SVG:NÄ — täyn ankkuri ja karttamerkin varapolku.
 *
 * Elementit saavat luokat `.nostosym-mini` ja `.nostosym-mini-ohut`,
 * joissa muste ja viivanleveys asuvat (css/styles.css). Sama tyyli
 * luetaan canvasille rasteria varten (nostosymMustelajit), joten
 * kumpikin piirtotapa jäljittää yhtä lähdettä.
 */
export function piirraNostosymMini(g, symboli, laji) {
  const merkki = NOSTOSYM_MINI[nostosymMiniTunnus(symboli, laji)];
  if (merkki.ohut) el('path', { class: 'nostosym-mini-ohut', d: merkki.ohut }, g);
  if (merkki.vahva) el('path', { class: 'nostosym-mini', d: merkki.vahva }, g);
  for (const y of merkki.ympyrat ?? []) {
    el('circle', { class: 'nostosym-mini', cx: y.cx, cy: y.cy, r: y.r }, g);
  }
  for (const p of merkki.pisteet ?? []) {
    el('circle', { class: 'nostosym-mini-piste', cx: p.cx, cy: p.cy, r: p.r }, g);
  }
}

/**
 * MINIMERKKI CANVASILLE — rasteroitu karttamerkki.
 *
 * `porras` on laitepikseleitä kirjaston yksikköä kohti, ja origo on jo
 * siirretty merkin keskelle. Path2D ottaa saman `d`-merkkijonon kuin
 * SVG, joten muotoa ei ole kirjoitettu kahdesti.
 */
function piirraNostosymMiniCanvas(ctx, tunnus, muste, porras) {
  const merkki = NOSTOSYM_MINI[tunnus];
  ctx.save();
  ctx.scale(porras, porras);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.fillStyle = muste.vahva;
  const veda = (d, asu) => {
    ctx.strokeStyle = asu.vari;
    ctx.lineWidth = asu.leveys;
    ctx.stroke(new Path2D(d));
  };
  if (merkki.ohut) veda(merkki.ohut, { vari: muste.ohut, leveys: muste.ohutLev });
  if (merkki.vahva) veda(merkki.vahva, { vari: muste.vahva, leveys: muste.vahvaLev });
  ctx.strokeStyle = muste.vahva;
  ctx.lineWidth = muste.vahvaLev;
  for (const y of merkki.ympyrat ?? []) {
    ctx.beginPath();
    ctx.arc(y.cx, y.cy, y.r, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (const p of merkki.pisteet ?? []) {
    ctx.beginPath();
    ctx.arc(p.cx, p.cy, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

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

/**
 * VUORI, HAVUPUU JA AALTO — luonto: vuoret, metsät, joet, järvet.
 *
 * KOLME VÄRIÄ, EI YHTÄ (omistajan tilaus 27.8.2026: *"uusi tunnus jossa
 * esim. sininen meri ja ruskea vuori, jossa vihreä puu"*). Vanha merkki
 * oli kokonaan sinivihreä, ja kaukaa siitä tuli yksi tahra: huippu, puu
 * ja vesi sulautuivat samaksi läiskäksi. Nyt jokaisella osalla on oma
 * vaimea sävynsä (--sym-luonto-vuori / -puu / -vesi), ja kolmen värin
 * kerros erottuu pergamentilla myös 21 pikselissä.
 *
 * Perheen muut merkit kantavat yhden heraldisen aksentin; luonto on
 * tietoinen poikkeus, koska juuri värien ero kertoo mistä on kyse.
 */
function piirraNostosymLuonto(g) {
  // Kaksi huippua — yksi kolmio olisi teltta, kaksi on vuoristo.
  el('path', {
    class: 'nostosym-vuoristo',
    d: 'M-7.6 2.6 L-3.4 -6.6 L-0.6 -1.8 L1.8 -5.0 L6.6 2.6 Z',
  }, g);
  // Havupuu vuoren kyljessä: kolme kavenevaa lapetta ja lyhyt runko.
  el('path', {
    class: 'nostosym-havu',
    d: 'M5.4 -5.4 L7.8 -1.6 L6.4 -1.6 L8.4 1.8 L2.4 1.8 L4.4 -1.6 '
      + 'L3.0 -1.6 Z',
  }, g);
  el('path', { class: 'nostosym-viiva', d: 'M5.4 1.8 L5.4 3.4' }, g);
  // Aalto alimpana: vesi kuuluu samaan kategoriaan ja kantaa sinisen.
  el('path', {
    class: 'nostosym-aalto',
    d: 'M-7.0 5.8 Q-5.25 3.6 -3.5 5.8 Q-1.75 8.0 0 5.8 '
      + 'Q1.75 3.6 3.5 5.8 Q5.25 8.0 7.0 5.8',
  }, g);
}

/** HÖYRYÄVÄ MALJA — ruoka ja juoma (viininpunainen). */
function piirraNostosymMalja(g) {
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

/**
 * HÖYRYVETURI — tekniikka ja keksinnöt (teräksenharmaa).
 *
 * HAMMASRATAS PUTOSI POIS (omistaja 27.8.2026: *"nykyinen näyttää
 * liikaa asetusvalikon rattaalta (väärä konnotaatio) — keksi KOKONAAN
 * TOINEN aihe"*). Ratas on nykylukijalle asetusnappi, eikä kartta saa
 * luvata valikkoa. Veturi on 1873:n oma kone — juuri se, jolla
 * maailmanympärimatka tehdään — ja sen ääriviiva (matala runko, korkea
 * savupiippu, iso vetopyörä) tunnistetaan yhdellä silmäyksellä myös
 * 21 pikselissä. Lennätinpylväs ja vauhtipyörä olivat ehdolla mutta
 * hävisivät: pylvään langat katoavat pieneksi kutistuessa ja
 * vauhtipyörä olisi taas kiekko.
 */
function piirraNostosymVeturi(g) {
  // Runko yhtenä täyttönä: kattila edessä, ohjaamo takana, savupiippu
  // ylös. Kulkusuunta oikealle, kuten matka.
  el('path', {
    class: 'nostosym-veturi',
    d: 'M-8.2 3.6 L-8.2 -4.6 L-3.6 -4.6 L-3.6 -0.6 L-2.2 -0.6 '
      + 'L-2.2 -5.4 L-0.6 -5.4 L-0.6 -0.6 L7.4 -0.6 L8.2 0.4 '
      + 'L8.2 3.6 Z',
  }, g);
  // Höyrypilvi piipun päältä: kolme nousevaa palloa.
  el('circle', { class: 'nostosym-hoyry', cx: -1.4, cy: -6.8, r: 1.2 }, g);
  el('circle', { class: 'nostosym-hoyry', cx: 1.0, cy: -8.0, r: 0.9 }, g);
  el('circle', { class: 'nostosym-hoyry', cx: 3.0, cy: -8.6, r: 0.6 }, g);
  // Iso vetopyörä ja kaksi pikkupyörää — pyörät tekevät koneesta veturin.
  el('circle', { class: 'nostosym-veturipyora', cx: 3.6, cy: 4.6, r: 2.9 }, g);
  el('circle', { class: 'nostosym-veturinapa', cx: 3.6, cy: 4.6, r: 0.8 }, g);
  el('circle', { class: 'nostosym-veturipyora', cx: -2.2, cy: 5.4, r: 1.7 }, g);
  el('circle', { class: 'nostosym-veturipyora', cx: -6.2, cy: 5.4, r: 1.7 }, g);
}

/** VAAKA — kauppa ja raha (oliivi). */
function piirraNostosymVaaka(g) {
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

/**
 * PORTTITORNI — kaupunki. Jokainen kortin avaava kohde saa symbolin
 * (omistaja 26.8.2026: "onhan kaupungille myös oma symboli, jos sen
 * takaa aukeaa popup?").
 *
 * YKSI TORNI, EI KAHTA (omistaja 27.8.2026: *"nykyinen näyttää kaukaa
 * katsottuna liikaa kiikarilta"*). Kahden yhtä korkean pyöreähkön
 * tornin pari on juuri kiikarin ääriviiva, ja kaukaa katsottuna se
 * luki kiikariksi eikä kaupungiksi. Nyt merkki on EPÄSYMMETRINEN:
 * yksi sakarapäinen porttitorni, sen juuressa holvattu aukko ja
 * huipulla viiri — siluetti, jota mikään toinen taulun symboli ei
 * muistuta.
 */
function piirraNostosymPortti(g) {
  // Yksi torni sakaroineen ja matala muuri sen oikealla puolella.
  el('path', {
    class: 'nostosym-kaupunki',
    d: 'M-4.6 7.4 L-4.6 -4.6 L-3.4 -4.6 L-3.4 -6.0 L-1.8 -6.0 '
      + 'L-1.8 -4.6 L-0.6 -4.6 L-0.6 -6.0 L1.0 -6.0 L1.0 -4.6 '
      + 'L2.2 -4.6 L2.2 7.4 Z '
      + 'M2.2 7.4 L2.2 1.4 L7.4 1.4 L7.4 7.4 Z',
  }, g);
  // Holvattu porttiaukko tornin juuressa — paperinvärinen, jotta
  // portti näyttää avoimelta.
  el('path', {
    class: 'nostosym-portinaukko',
    d: 'M-2.8 7.4 L-2.8 2.4 Q-1.2 0.4 0.4 2.4 L0.4 7.4 Z',
  }, g);
  // Viiri tornin huipulta oikealle: se rikkoo symmetrian lopullisesti.
  el('path', { class: 'nostosym-viiva', d: 'M-1.8 -6.0 L-1.8 -9.2' }, g);
  el('path', {
    class: 'nostosym-viiri',
    d: 'M-1.8 -9.2 L2.6 -8.2 L-1.8 -7.2 Z',
  }, g);
  // Muurin harjan sakarat viivana.
  el('path', {
    class: 'nostosym-viiva',
    d: 'M2.2 1.4 L3.4 1.4 L3.4 0.2 L4.8 0.2 L4.8 1.4 L6.2 1.4 '
      + 'L6.2 0.2 L7.4 0.2 L7.4 1.4',
  }, g);
}

/**
 * TÄHTI — MATKAKIRJAN IHME, jota ei enää ole (Raamattu, osio
 * "Matkakirjan ihmeet"; omistaja 27.8.2026: *"Jos kohde on KOKONAAN
 * KADONNUT (Faros, kolossi, mausoleumi...), kartalla on suoraan oma
 * TÄHTISYMBOLI"*).
 *
 * Muoto on vanhan merikartan kompassiruusun tähti: kahdeksan sakaraa,
 * joista pääilmansuunnat ovat pitkiä ja väli-ilmansuunnat lyhyitä.
 * Se erottuu yhdellä silmäyksellä huutomerkistä ja portista myös
 * yhdentoista pikselin kokoisena, eikä muistuta mitään muuta taulun
 * symbolia — juuri siksi tähti valittiin: kartalla se lupaa jotain,
 * mitä muualla ei ole.
 *
 * TÄHTI ON PERHEEN AINOA, JOKA EI TULE KUVANA (NOSTOSYM_GENEROIDUT):
 * kompassiruusun sakarat ovat suoria viivoja ja teräviä kärkiä, jotka
 * kestävät koodilla piirrettynä pienenemisen paremmin kuin rasterina.
 * Läpinäkyvässä mustetyylissä (ks. tiedoston alku) se on siksi ainoa,
 * jonka kontrasti pergamentilla on TÄMÄN tiedoston vastuulla — ja
 * siitä huolehtii tähden oma musteääriviiva (css .nostosym-tahti).
 *
 * Sakaroiden juuressa oli 26.–27.8.2026 hiuksenohut kehä, joka sitoi
 * tähden aluslaattaan. Laatan mukana kehäkin poistui: ilman laattaa se
 * olisi ollut irrallinen rengas keskellä pergamenttia.
 */
function piirraNostosymTahti(g) {
  /*
   * SAKARAT LIHOIVAT LAATAN POISTUESSA (27.8.2026). Vanha tähti oli
   * hyvin teräväpiikkinen (sisänurkka säteellä 2,2), ja laatan päällä
   * se toimi: vaalea kiekko antoi muodolle massan. Ilman laattaa
   * yhdentoista pikselin kohdemerkki kutistui pelkäksi kultaiseksi
   * pisteeksi. Nyt sisänurkka on säteellä 4,6, väli-ilmansuunnat 5,8
   * ja kärjet ulottuvat merkin reunaan asti — tähdellä on keskus, joka
   * kantaa kullan, eivätkä pelkät piikit.
   */
  el('path', {
    class: 'nostosym-tahti',
    d: 'M0.00 -10.00 L1.76 -4.25 L4.10 -4.10 L4.25 -1.76 L10.00 0.00 '
      + 'L4.25 1.76 L4.10 4.10 L1.76 4.25 L0.00 10.00 L-1.76 4.25 '
      + 'L-4.10 4.10 L-4.25 1.76 L-10.00 0.00 L-4.25 -1.76 '
      + 'L-4.10 -4.10 L-1.76 -4.25 Z',
  }, g);
}

const NOSTOSYM_PIIRTAJAT = {
  huuto: piirraNostosymHuuto,
  elain: piirraNostosymPollo,
  silma: piirraNostosymSilma,
  historia: piirraNostosymPylvas,
  luonto: piirraNostosymLuonto,
  ruoka: piirraNostosymMalja,
  kulttuuri: piirraNostosymLyyra,
  tekniikka: piirraNostosymVeturi,
  kauppa: piirraNostosymVaaka,
  sana: piirraNostosymSulka,
  merenkulku: piirraNostosymMeriankkuri,
  urheilu: piirraNostosymSeppele,
  kaupunki: piirraNostosymPortti,
  ihme: piirraNostosymTahti,
};

/** Tunnetut symbolikategoriat — yksi totuus myös kutsujien tarkistuksiin. */
export const NOSTOSYM_TYYPIT = new Set(Object.keys(NOSTOSYM_PIIRTAJAT));

/*
 * KATEGORIALUOKKIEN NIMET (omistaja 26.8.2026 ilta: *"Voisiko symboli
 * ja sen luokka näkyä noston ylimmällä rivillä nykyisen ylimmän rivin
 * tilalla"*). Kohdekortin ylärivi näyttää symbolin vierellä tämän
 * nimen — NOMINATIIVISSA eli luokan nimenä (omistajan oikaisu
 * 26.8.2026 ilta: *"Pitäisikö olla ruoka ja juoma?"* — rivi nimeää
 * kategorian, ei lupaa annosta). Avaimet ovat samat kuin
 * piirtäjätaulussa; taulu asuu tässä, jotta symboli ja sen nimi
 * pysyvät yhdessä paikassa.
 */
export const NOSTOSYM_LUOKAT = {
  huuto: 'Skandaalit',
  elain: 'Eläimet',
  silma: 'Nähtävyydet',
  historia: 'Historia',
  luonto: 'Luonto',
  ruoka: 'Ruoka ja juoma',
  kulttuuri: 'Kulttuuri',
  tekniikka: 'Tekniikka',
  kauppa: 'Kauppa',
  sana: 'Tarinat',
  merenkulku: 'Merenkulku',
  urheilu: 'Urheilu',
  kaupunki: 'Kaupungit',
  // Tähti on oma luokkansa eikä historian alalaji: kortin ylärivi
  // kertoo heti, että tästä kohteesta on jäljellä vain tarina.
  ihme: 'Kadonneet ihmeet',
};

/**
 * KIRJASTON OVI: piirtää kategorian symbolin ryhmään origon ympärille
 * (~21 px merkki lehden perustasolla). Sekä täkysymbolit (tämä
 * tiedosto) että kartan kohdemerkit (js/fokuskohteet.js) piirtävät
 * tällä — kutsuja hoitaa paikan ja mittakaavan ankkuriryhmällään.
 */
export function piirraNostosymboli(g, symboli) {
  const tunnus = NOSTOSYM_PIIRTAJAT[symboli] ? symboli : 'huuto';
  if (!NOSTOSYM_KUVAT[tunnus]) {
    // Kuvaa ei ole (viela) generoitu: koodipiirtaja hoitaa koko merkin.
    NOSTOSYM_PIIRTAJAT[tunnus](g);
    return;
  }
  /*
   * GENEROITU KAIVERRUSKUVA SUORAAN KARTALLE (omistajan tilaus
   * 26.8.2026 ilta: "Symboleista voisi tehdä generoimalla paremmat" +
   * "Lisää peliin niin katson"; läpinäkyvä mustetyyli 27.8.2026, ks.
   * tiedoston alku). Kuva peittää koko entisen laatan alan
   * (NOSTOSYM_R * 2), koska laattaa ei enää piirretä sen ympärille —
   * merkin ulkomitta pysyi siis samana ja glyyfi kasvoi.
   *
   * Jos kuva ei lataudu (offline ennen esilatausta, rikkoutunut
   * tiedosto), ryhmä tyhjennetään ja sama merkki piirretään koodilla —
   * vanhat piirtäjät ovat siis VARAPOLKU, eivät kuollutta koodia.
   * Nimiö on tarkoituksella ryhmän ULKOPUOLELLA (kutsujat), jotta
   * tyhjennys ei vie sitä mukanaan.
   */
  const kuva = el('image', {
    href: NOSTOSYM_KUVAT[tunnus],
    x: -NOSTOSYM_R, y: -NOSTOSYM_R, width: NOSTOSYM_R * 2, height: NOSTOSYM_R * 2,
    preserveAspectRatio: 'xMidYMid meet',
  }, g);
  // Vanha WebKit lukee vain xlink-nimiavaruuden osoitteen.
  kuva.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', NOSTOSYM_KUVAT[tunnus]);
  kuva.addEventListener('error', () => {
    g.replaceChildren();
    NOSTOSYM_PIIRTAJAT[tunnus](g);
  });
}

/*
 * Generoidut symbolikuvat (19th-century copperplate engraving,
 * läpinäkyvä pohja). Leikattu sisältöön ja pienennetty 96 px:iin —
 * merkki näkyy ~21 px kokoisena, joten 96 riittää retinallakin.
 * Avaimet = piirtäjätaulu.
 *
 * KAKSI ERÄÄ. Ensimmäinen (26.8.2026, gpt-image-1) piirrettiin
 * vaalealle aluslaatalle, ja sen ohut kaiverrusjälki riitti hyvin
 * laatan päällä. Kun laatta poistui (läpinäkyvä mustetyyli, ks.
 * tiedoston alku), kuudessa niistä ei ollut enää tarpeeksi mustetta
 * pergamentin päällä: huutomerkki, vaaka, lyyra, malja, sulka ja
 * seppele katosivat neljäntoista pikselin koossa akvarellitopografiaan.
 * Ne generoitiin uudelleen 27.8.2026 (gpt-image-2, generoi-kuva-api.yml,
 * tausta transparent) samoista aiheista mutta paksulla musteella.
 * Loput seitsemän kelpasivat sellaisinaan.
 */
/*
 * Vain jo generoidut tunnukset — puuttuva tunnus (nyt ihme, joka
 * piirretään koodilla) haetaan suoraan piirtäjätaulusta ilman turhaa
 * 404-pyyntöä jokaisesta merkistä.
 */
const NOSTOSYM_GENEROIDUT = ['huuto', 'elain', 'silma', 'historia', 'luonto', 'ruoka',
  'kulttuuri', 'tekniikka', 'kauppa', 'sana', 'merenkulku', 'urheilu',
  // kaupunki hyvaksytty 27.8.2026 (generoi-symbolit.yml, vain=kaupunki).
  'kaupunki'];
const NOSTOSYM_KUVAT = Object.fromEntries(
  NOSTOSYM_GENEROIDUT.map((t) => [t, `assets/kartat/symbolit/sym-${t}.webp`]),
);

/* ==================== NIMIÖ ==================== */

/*
 * MERKIN NIMIÖ (omistajan valinta 27.8.2026, montaasin C: *"lisää
 * symbolin perään lyhyt teksti kartalle … tai symbolin alapuolelle"*).
 *
 * SIJOITUS ON MERKIN PERÄSSÄ eli oikealla, merkin keskiviivalla —
 * omistajan kahdesta vaihtoehdosta ensimmäinen, ja sama asettelu kuin
 * hyväksytyn montaasin C-näytteessä ("merkki + teksti vierekkäin").
 * ALAPUOLI KOKEILTIIN ENSIN JA HYLÄTTIIN, ja syy on kartassa itsessään:
 *
 *   LEHTEEN ON JO POLTETTU NIMIÄ, JA NE OVAT MERKKIENSÄ ALLA.
 *   Fokuslehden oma atlaskerros (tools/fokuskartta/maat.mjs) latoo
 *   vuorten, kaupunkien ja merten nimet kuvaan keskitettynä merkkinsä
 *   alapuolelle — Ólympos kolmionsa alle ja korkeuslukema sen alle.
 *   Kartan kohdemerkit istuvat täsmälleen samoissa paikoissa, joten
 *   alapuolelle ladottu nimiö osui suoraan poltetun nimen päälle:
 *   Kreikan lehdellä "Ólympos", "Parnassós", "Taÿgetos", "Psilorítis"
 *   ja "Pátra" painuivat kaksinkertaisina päällekkäin (kaappaus
 *   $SP/kuvat/symbolic/z-olympos.png). Oikea puoli antaa merkkikerrokselle
 *   OMAN KAISTANSA, jota lehden painojälki ei käytä — kaksi nimistöä ei
 *   siis voi enää tapella samasta kohdasta.
 *
 * Sivu on aina sama (oikea), joten kiertävällä laudalla saman kohteen
 * kaksi kopiota näyttävät varmasti samalta, eikä sijoitusta tarvitse
 * valita merkkikohtaisesti. Ateenan kaltaisessa nipussa
 * (js/fokusniput.js) sarake kasvaa alaspäin ja vaakatila on vapaana,
 * joten sama sääntö kelpaa siellä ilman poikkeusta.
 *
 * TYPOGRAFIA ON LEHTEEN POLTETTUJEN NIMIEN OMAA (27.8.2026 ilta, omistajan
 * palaute laitteelta v1211: nimiö *"pitää muuttaa täsmälleen samaan
 * tyyliin ja kokoon kuin karttaan poltetut nimet olivat"*).
 *
 * Nimiö oli 27.8.2026 alkaen isoisän kaunokirjoitusta (--font-kauno),
 * ja se erottui lehden omasta ladonnasta heti: poltetut nimet ovat
 * ANTIIKVAA. Nyt niitä on kaksi asua, samat kaksi kuin piirto.js:n
 * kohdissa 8b ja 8e:
 *
 *   vuori  Pieni kursiivi antiikva, tumma muste ja pergamentinvaalea
 *          halo (paint-order: stroke) — poltettu vuorennimi
 *          ("Smólikas", piirto.js koko 11, tyylitys italic,
 *          rgba(74,52,33,0.92), halo 3,2). Tämä on OLETUS: kaikki
 *          kohteet paitsi meret nimetään näin.
 *   meri   Harvennettu kursiivikapiteeli ilman haloa, haaleampi muste
 *          ("EGEANMERI", piirto.js kohta 8b: vali = koko × 0,28,
 *          rgba(120,108,84,0.72)). Meren nimi jää paperiin, ei nouse
 *          sen päälle.
 *
 * Nimiö ei ota napautuksia vastaan: se on leveämpi kuin merkki, ja
 * muuten se peittäisi naapurin osuma-alueen.
 *
 * NIMIÖ SAA JÄÄDÄ POIS AHTAASSA RYPPÄÄSSÄ (omistajan siistintätilaus
 * 27.8.2026, Ateenan seutu Kreikan lehdellä). Kirjasto ei itse päätä
 * sitä — kutsuja antaa nimen tai tyhjän merkkijonon — mutta se antaa
 * päätöstä varten nimiön MITAT (nostosymNimioLaatikko), jotta
 * törmäystarkastus mittaa juuri sitä laatikkoa, joka kartalle
 * oikeasti piirtyy. Ks. js/fokuskohteet.js paivitaKohdeNimiot.
 */

/**
 * Nimiön kirjasinkoko merkin omissa yksiköissä.
 *
 * Yksikkö on minimerkin yksikkö eli poltetun lehden prototyyppipikseli
 * (ks. NOSTOSYM_MINI_R), joten tämä on TÄSMÄLLEEN piirto.js:n
 * poltetun vuorennimen koko: `koko: 11`. Aiempi 13,5 oli neljänneksen
 * isompi kuin lehden oma ladonta, ja se näkyi.
 */
const NOSTOSYM_NIMIO_KOKO = 11;

/**
 * NIMIÖN ASUT — samat kaksi kuin lehteen poltetuilla nimillä.
 *
 * `vali` on kirjainväli kirjaston yksikköinä (piirto.js `teksti`:n
 * `vali`), `versaali` nostaa nimen kapiteeliksi ja `halo` kertoo,
 * vedostetaanko nimen taakse pergamenttia. Väri ja kirjasin luetaan
 * CSS:stä (nostosymNimionAsu) — tässä on vain se, mitä CSS ei osaa
 * kertoa canvasille.
 */
const NOSTOSYM_NIMIO_ASUT = {
  vuori: { luokka: '', vali: 0, versaali: false },
  meri: { luokka: 'nostosym-nimio-meri', vali: NOSTOSYM_NIMIO_KOKO * 0.28, versaali: true },
};

/** Kohteen tyyppi → nimiön asu. Meri saa oman, kaikki muut vuoren. */
const NOSTOSYM_NIMIO_LAJIT = { meri: 'meri' };

const nostosymNimionLaji = (laji) => NOSTOSYM_NIMIO_LAJIT[laji] ?? 'vuori';

/** Nimiön alkukohta: merkin oikea reuna ja pieni kirjainväli. */
const NOSTOSYM_NIMIO_X = NOSTOSYM_MINI_R + 2.4;

/**
 * Perusviiva merkin keskeltä alas noin kolmanneksen kirjainkorkeudesta:
 * versaalirivi asettuu silloin optisesti merkin keskelle.
 */
const NOSTOSYM_NIMIO_Y = NOSTOSYM_NIMIO_KOKO * 0.36;

/**
 * Nimiön enimmäispituus merkkeinä. Pidempi nimi on kartalla nauha eikä
 * nimiö: se peittäisi naapurit ja veisi katseen merkiltä.
 */
const NOSTOSYM_NIMIO_MERKKEJA = 18;

/**
 * KARTAN LYHENNYSTAPA: nimestä jää alkuosa ja lyhennyspiste, kuten
 * 1800-luvun atlaksissa ("Halikarnassoksen." eikä "Halikarnassoks…").
 * Rinnastus katkaistaan kokonaan — "Pamukkale ja Hierapolis" on
 * kartalla "Pamukkale.", koska puolikas rinnastus lukisi virheeltä.
 * Kokonaiset sanat säilyvät: kartta ei katkaise kesken sanan.
 */
function nostosymLyhennaNimio(nimi) {
  const siisti = String(nimi ?? '').trim().replace(/\s+/g, ' ');
  if (!siisti || siisti.length <= NOSTOSYM_NIMIO_MERKKEJA) return siisti;
  const sanat = siisti.split(' ');
  const rinnastus = sanat.findIndex((s) => s === 'ja' || s === 'sekä');
  const kelpaavat = rinnastus > 0 ? sanat.slice(0, rinnastus) : sanat;
  let ulos = kelpaavat[0];
  if (ulos.length > NOSTOSYM_NIMIO_MERKKEJA) {
    // Yksikin sana voi olla liian pitkä; silloin lyhennys osuu sanaan.
    return `${ulos.slice(0, NOSTOSYM_NIMIO_MERKKEJA - 1)}.`;
  }
  for (const sana of kelpaavat.slice(1)) {
    if (`${ulos} ${sana}`.length > NOSTOSYM_NIMIO_MERKKEJA) break;
    ulos += ` ${sana}`;
  }
  return ulos === siisti ? ulos : `${ulos}.`;
}

/**
 * Nimiön lopullinen teksti: lyhennys ja asun oma kirjainlaji. Meren
 * nimi nousee kapiteeliksi kuten lehteen poltettu EGEANMERI, ja koska
 * lyhennys tehdään ENNEN versaalia, "18 merkkiä" tarkoittaa yhä samaa
 * kuin muillakin.
 */
function nostosymNimioTeksti(nimi, asu) {
  const lyhyt = nostosymLyhennaNimio(nimi);
  return asu.versaali ? lyhyt.toUpperCase() : lyhyt;
}

/**
 * NIMIÖ MERKIN PERÄÄN. Kutsuja antaa ryhmän, jossa symboli jo on —
 * teksti tulee symbolin SISARUKSEKSI eikä sen ryhmään, koska kuvan
 * varapolku tyhjentää oman ryhmänsä (piirraNostosymboli) eikä saa
 * viedä nimiötä mukanaan. Palauttaa null, jos nimeä ei ole.
 */
export function piirraNostosymNimio(g, nimi, laji) {
  const asu = NOSTOSYM_NIMIO_ASUT[nostosymNimionLaji(laji)];
  const teksti = nostosymNimioTeksti(nimi, asu);
  if (!teksti) return null;
  const t = el('text', {
    class: `nostosym-nimio ${asu.luokka}`.trim(),
    x: NOSTOSYM_NIMIO_X.toFixed(2),
    y: NOSTOSYM_NIMIO_Y.toFixed(2),
    'font-size': NOSTOSYM_NIMIO_KOKO,
    'text-anchor': 'start',
    'aria-hidden': 'true',
  }, g);
  t.textContent = teksti;
  return t;
}

/* ==================== RASTEROITU KARTTAMERKKI ==================== */

/*
 * MERKKI + NIMIÖ YHTENÄ VALMIINA KUVANA (omistajan lisätilaus
 * 27.8.2026: *"uudet karttasymbolit kannattaa RASTEROIDA
 * suorituskyvyn takia — älä jätä niitä eläviksi SVG/DOM-elementeiksi
 * joita selain piirtää uudelleen panoroinnissa"*).
 *
 * ── MIKÄ TÄSSÄ MAKSAA ──────────────────────────────────────────────
 *
 * Kartan merkkikerroksessa on kolmisenkymmentä kohdetta ja kiertävällä
 * laudalla jokainen kahtena kappaleena. Ennen rasterointia kukin oli
 * <image> JA <text>, jonka halo on `paint-order: stroke` — eli teksti
 * ladotaan ja vedostetaan kahdesti joka kerta kun merkin muunnos
 * muuttuu. Panoroinnissa muunnos muuttuu joka kehyksellä. Asettelua se
 * ei vaadi (savuke-panorointi mittaa nimenomaan asetteluja, ja luku
 * pysyi ennallaan), mutta vedostustyö on turhaa: sisältö on
 * täsmälleen sama kehyksestä toiseen, vain paikka vaihtuu.
 *
 * Nyt merkki on YKSI <image>, jonka sisältö on piirretty kerran
 * canvasille ja välimuistissa data-URLina. Panoroinnissa selaimelle jää
 * valmiin bittikartan siirto.
 *
 * ── PORTAAT, JOTTA RETINA PYSYY TERÄVÄNÄ ───────────────────────────
 *
 * Merkki elää kartan mukana (ks. sääntö 3), joten sama merkki on
 * lehden perustasolla ~11 px ja lähimmällä zoomiportaalla noin
 * viisinkertainen. Yksi ainoa tarkkuus olisi joko sumea lähikuvassa
 * tai turhan raskas yleiskuvassa, joten rasteri tehdään PORTAITTAIN:
 * NOSTOSYM_PORTAAT on laitepikseleitä kirjaston yksikköä kohti, ja
 * kutsuja kertoo tarpeensa (nostosymAsetaPorras) — tarve on merkin
 * oma mittakaava × kartan suhde perustasoon × devicePixelRatio.
 *
 * PORRAS VAIHTUU VAIN LEVOSSA. Kutsuja tarkistaa portaan siellä, missä
 * merkit muutenkin rakennetaan uudelleen (js/fokuskohteet.js
 * paivitaFokuskohteet, jota ajetaan näkymän asetuttua) — ei eleen
 * aikana, jolloin kehysbudjetti on kireimmillään. Portaan vaihtuessa
 * välimuisti tyhjennetään, joten muistissa on kerrallaan vain yhden
 * tarkkuuden rasterit.
 *
 * ── PIIRTO ON VIIVAA, EI KUVAA (27.8.2026 ilta) ────────────────────
 *
 * 27.8.2026 rasteriin vedostettiin generoitu webp-glyyfi. Nyt merkki
 * on minimerkkitaulun viivoja (NOSTOSYM_MINI), jotka canvas piirtää
 * Path2D:llä samasta `d`-merkkijonosta kuin SVG — verkosta ei siis
 * ladata kartalle enää mitään, eikä varapolkua kuvan kaatumiselle
 * tarvita. Vanha elävä SVG-piirto jää silti varalle siihen, ettei
 * canvasia ole (yksikkötestit, ikivanha selain).
 */

/** Rasterin tarkkuusportaat: laitepikseliä kirjaston yksikköä kohti. */
const NOSTOSYM_PORTAAT = [1.5, 3, 6, 9];

/** Nykyinen porras ja sillä tehdyt rasterit (avain → Promise). */
let NOSTOSYM_PORRAS = NOSTOSYM_PORTAAT[0];
const NOSTOSYM_RASTERIT = new Map();

/** Nimiön asu luetaan CSS:stä kerran per asu — väri ja kirjasin asuvat siellä. */
const NOSTOSYM_ASUT = new Map();

/** Minimerkin muste luetaan CSS:stä kerran (.nostosym-mini). */
let NOSTOSYM_MUSTE = null;

/** Asu ilman karttaa (yksikkötestit, varapolku ennen ensimmäistä SVG:tä). */
const NOSTOSYM_ASU_VARA = {
  perhe: '"Liberation Serif", "Times New Roman", Times, serif',
  tyyli: 'italic', muste: 'rgba(74,52,33,0.92)',
  halo: 'rgba(232,220,188,0.85)', haloLeveys: 3.1,
};

/** Musteen varapaino, kun CSS:ää ei ole luettavissa. */
const NOSTOSYM_MUSTE_VARA = {
  vahva: 'rgba(58,40,25,0.82)', vahvaLev: 1.15,
  ohut: 'rgba(58,40,25,0.45)', ohutLev: 0.75,
};

/** Mittanauha tekstin leveydelle; yksi konteksti koko kirjastolle. */
let NOSTOSYM_MITTA = null;

/** Mitatut nimiöleveydet (lyhennetty teksti → kirjaston yksiköitä). */
const NOSTOSYM_LEVEYDET = new Map();

/**
 * Valitsee portaan annetulle tarpeelle. Palauttaa true, jos porras
 * vaihtui — silloin kutsujan on rakennettava merkkinsä uudelleen.
 */
export function nostosymAsetaPorras(tarve) {
  const uusi = NOSTOSYM_PORTAAT.find((p) => p >= tarve) ?? NOSTOSYM_PORTAAT.at(-1);
  if (uusi === NOSTOSYM_PORRAS) return false;
  NOSTOSYM_PORRAS = uusi;
  NOSTOSYM_RASTERIT.clear();
  return true;
}

/**
 * Nimiön väri, halo ja kirjasin CSS:stä (.nostosym-nimio + asun oma
 * luokka). Luetaan oikeasta elementistä eikä kirjoiteta tähän
 * uudestaan: tyyli saa asua yhdessä paikassa, vaikka piirto tapahtuu
 * canvasilla.
 *
 * KIRJASINTA EI TARVITSE ODOTTAA. --font-atlas on pelkkä
 * järjestelmäkirjasinpino (css/styles.css) eikä yhtään verkkokirjasinta,
 * joten canvasin lataman kirjasimen ei voi käydä niin, että rasteri
 * paistetaan varakirjasimella ja oikea saapuu vasta sen jälkeen.
 */
function nostosymNimionAsu(svg, laji = 'vuori') {
  if (NOSTOSYM_ASUT.has(laji)) return NOSTOSYM_ASUT.get(laji);
  if (!svg) return null;
  const muoto = NOSTOSYM_NIMIO_ASUT[laji];
  const apu = el('text', {
    class: `nostosym-nimio ${muoto.luokka}`.trim(),
    'font-size': NOSTOSYM_NIMIO_KOKO,
    visibility: 'hidden',
  }, svg);
  apu.textContent = 'M';
  const t = getComputedStyle(apu);
  const halo = t.stroke && t.stroke !== 'none' ? t.stroke : null;
  const asu = {
    perhe: t.fontFamily || NOSTOSYM_ASU_VARA.perhe,
    tyyli: t.fontStyle && t.fontStyle !== 'normal' ? t.fontStyle : '',
    muste: t.fill || NOSTOSYM_ASU_VARA.muste,
    halo,
    // strokeWidth on kirjaston yksiköitä, koska font-size on niitä.
    haloLeveys: halo ? (parseFloat(t.strokeWidth) || NOSTOSYM_ASU_VARA.haloLeveys) : 0,
    vali: muoto.vali,
  };
  apu.remove();
  NOSTOSYM_ASUT.set(laji, asu);
  return asu;
}

/** Asu myös ilman karttaa: varapino täydennettynä asun harvennuksella. */
function nostosymAsuTai(svg, laji) {
  return nostosymNimionAsu(svg, laji)
    ?? { ...NOSTOSYM_ASU_VARA, vali: NOSTOSYM_NIMIO_ASUT[laji].vali };
}

/**
 * MINIMERKIN MUSTE CSS:stä (.nostosym-mini ja .nostosym-mini-ohut).
 *
 * Sama syy kuin nimiöllä: kartalla merkki on canvasin viivaa, mutta
 * tyyli kuuluu tyylitiedostoon — muuten sävy olisi kahdessa paikassa
 * ja eriytyisi ensimmäisessä hienosäädössä.
 */
function nostosymMustelajit(svg) {
  if (NOSTOSYM_MUSTE || !svg) return NOSTOSYM_MUSTE ?? NOSTOSYM_MUSTE_VARA;
  const lue = (luokka, vara) => {
    const apu = el('path', { class: luokka, d: 'M0 0 L1 0', visibility: 'hidden' }, svg);
    const t = getComputedStyle(apu);
    const arvo = {
      vari: t.stroke && t.stroke !== 'none' ? t.stroke : vara.vari,
      leveys: parseFloat(t.strokeWidth) || vara.leveys,
    };
    apu.remove();
    return arvo;
  };
  const vahva = lue('nostosym-mini', { vari: NOSTOSYM_MUSTE_VARA.vahva, leveys: NOSTOSYM_MUSTE_VARA.vahvaLev });
  const ohut = lue('nostosym-mini-ohut', { vari: NOSTOSYM_MUSTE_VARA.ohut, leveys: NOSTOSYM_MUSTE_VARA.ohutLev });
  NOSTOSYM_MUSTE = {
    vahva: vahva.vari, vahvaLev: vahva.leveys, ohut: ohut.vari, ohutLev: ohut.leveys,
  };
  return NOSTOSYM_MUSTE;
}

/** Canvasin kirjasinmerkkijono: tyyli, koko ja perhe samasta asusta. */
const nostosymKirjasin = (asu, porras) => `${asu.tyyli} ${(NOSTOSYM_NIMIO_KOKO * porras).toFixed(2)}px ${asu.perhe}`.trim();

/**
 * Nimiön leveys KIRJASTON YKSIKÖISSÄ, halo ja harvennus mukaan luettuna.
 *
 * Sama mitta sekä rasteriin (nostosymRasteroi) että törmäyslaatikkoon
 * (nostosymNimioLaatikko) — kahdesta mittaustavasta seuraisi ennen
 * pitkää se, että väistö laskee eri laatikkoa kuin kartalle piirtyy.
 * Mitta otetaan portaan tarkkuudella ja jaetaan takaisin yksiköiksi,
 * koska pieni kirjasinkoko pyöristyy canvasilla karkeasti.
 */
function nostosymMittaaNimio(teksti, asu, porras = 1) {
  NOSTOSYM_MITTA ??= document.createElement('canvas').getContext('2d');
  NOSTOSYM_MITTA.font = nostosymKirjasin(asu, porras);
  const merkit = [...teksti];
  const leveys = merkit.reduce((s, m) => s + NOSTOSYM_MITTA.measureText(m).width, 0)
    + asu.vali * porras * Math.max(0, merkit.length - 1);
  return leveys / porras + asu.haloLeveys;
}

/**
 * NIMIÖN LAATIKKO KIRJASTON YKSIKÖISSÄ merkin origon ympärillä — tai
 * null, jos nimeä ei ole. Kutsuja (js/fokuskohteet.js) käyttää tätä
 * väistölaskennassa, ja mitat ovat tarkoituksella SAMAT kuin
 * rasterissa: laatikko alkaa merkin oikeasta reunasta
 * (NOSTOSYM_MINI_R) ja on merkin korkuinen, koska nimiö ladotaan
 * rasterin sisään juuri siihen kaistaan. Näin väistö mittaa sitä
 * mustetta, joka kartalla on.
 */
export function nostosymNimioLaatikko(nimi, svg, laji) {
  if (typeof document === 'undefined') return null;
  const nimionLaji = nostosymNimionLaji(laji);
  const teksti = nostosymNimioTeksti(nimi, NOSTOSYM_NIMIO_ASUT[nimionLaji]);
  if (!teksti) return null;
  const avain = `${nimionLaji}|${teksti}`;
  let leveys = NOSTOSYM_LEVEYDET.get(avain);
  if (leveys === undefined) {
    const asu = nostosymNimionAsu(svg, nimionLaji);
    leveys = nostosymMittaaNimio(teksti, asu ?? nostosymAsuTai(null, nimionLaji));
    // Ilman karttaa mitta on varakirjasimen eikä kartan omaa: sitä ei
    // talleteta, tai koko istunto jäisi väärän mitan varaan.
    if (asu) NOSTOSYM_LEVEYDET.set(avain, leveys);
  }
  return {
    x1: NOSTOSYM_MINI_RUUTU,
    x2: NOSTOSYM_NIMIO_X + leveys,
    y1: -NOSTOSYM_MINI_RUUTU,
    y2: NOSTOSYM_MINI_RUUTU,
  };
}

/** Yksi rasteri: viivamerkki ja sen perässä nimiö. Mitat kirjaston yksiköitä. */
async function nostosymRasteroi(tunnus, nimio, svg, porras, nimionLaji) {
  const asu = nostosymAsuTai(svg, nimionLaji);
  const muste = nostosymMustelajit(svg);
  const tekstiLeveys = nimio ? nostosymMittaaNimio(nimio, asu, porras) : 0;
  const sade = NOSTOSYM_MINI_RUUTU;
  const leveys = sade * 2 + (nimio ? NOSTOSYM_NIMIO_X - sade + tekstiLeveys : 0);
  const korkeus = sade * 2;
  const kangas = document.createElement('canvas');
  kangas.width = Math.max(1, Math.round(leveys * porras));
  kangas.height = Math.max(1, Math.round(korkeus * porras));
  const ctx = kangas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  // Merkin origo on neliön keskellä, kuten SVG:ssäkin.
  ctx.save();
  ctx.translate(sade * porras, sade * porras);
  piirraNostosymMiniCanvas(ctx, tunnus, muste, porras);
  ctx.restore();
  if (nimio) {
    ctx.font = nostosymKirjasin(asu, porras);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.lineJoin = 'round';
    const x = (NOSTOSYM_NIMIO_X + sade) * porras;
    const y = (NOSTOSYM_NIMIO_Y + sade) * porras;
    /*
     * MERKIT YKSITELLEN, kuten lehden omassa ladonnassa (piirto.js
     * `teksti`): canvasin `letterSpacing` ei ole kaikissa selaimissa, ja
     * harvennus on juuri se, mikä tekee meren nimestä meren nimen.
     * Halo ensin ja teksti päälle — sama järjestys kuin CSS:n
     * `paint-order: stroke`.
     */
    const vali = asu.vali * porras;
    const merkit = [...nimio];
    if (asu.halo) {
      ctx.strokeStyle = asu.halo;
      ctx.lineWidth = asu.haloLeveys * porras;
      let t = x;
      for (const m of merkit) { ctx.strokeText(m, t, y); t += ctx.measureText(m).width + vali; }
    }
    ctx.fillStyle = asu.muste;
    let t = x;
    for (const m of merkit) { ctx.fillText(m, t, y); t += ctx.measureText(m).width + vali; }
  }
  /*
   * MITAT PALAUTETAAN PYÖRISTETYISTÄ PIKSELEISTÄ eikä lasketuista
   * yksiköistä: canvasin leveys on kokonaisluku, ja jos <image> saisi
   * pyöristämättömän mitan, kuvasuhteet eroaisivat prosentin murto-osan
   * ja `preserveAspectRatio: meet` kirjelöisi merkin keskelle omaa
   * laatikkoaan. Näin laatikko on tarkalleen bittikartan muotoinen.
   */
  return {
    osoite: kangas.toDataURL('image/png'),
    leveys: kangas.width / porras,
    korkeus: kangas.height / porras,
  };
}

/**
 * KARTAN MERKKI: viivamerkki ja nimiö yhtenä rasteroituna kuvana.
 *
 * Kutsuja antaa tyhjän ryhmän, joka on jo SVG:ssä kiinni (tyyli ja
 * ownerSVGElement luetaan siitä), sekä kohteen TYYPIN (`laji`), josta
 * ratkeaa luonnon kaksi muotoa ja meren oma nimiöasu. Ryhmään
 * ilmestyy ensin tyhjä <image> ja siihen rasterin osoite heti kun se
 * on valmis — välimuistista osuttaessa vielä samalla mikrotehtävällä.
 * Jos rasteria ei saada, ryhmään piirretään elävä merkki ja teksti.
 */
export function piirraNostosymKartalle(g, symboli, nimio, laji) {
  const tunnus = nostosymMiniTunnus(symboli, laji);
  const nimionLaji = nostosymNimionLaji(laji);
  // Lyhennys ja kirjainlaji tehdään KERRAN tässä, jotta rasteri ja
  // varapolku latovat varmasti saman tekstin — ja jotta välimuistin
  // avain on se, mikä kuvaan oikeasti piirtyy.
  const teksti = nostosymNimioTeksti(nimio, NOSTOSYM_NIMIO_ASUT[nimionLaji]);
  const elavana = () => {
    g.replaceChildren();
    piirraNostosymMini(g, symboli, laji);
    if (teksti) piirraNostosymNimio(g, teksti, laji);
  };
  if (typeof document === 'undefined') { elavana(); return; }
  const kuva = el('image', {
    class: 'nostosym-rasteri',
    preserveAspectRatio: 'xMidYMid meet',
  }, g);
  /*
   * Vartijoille ja virheenetsintään: KATEGORIA (ei minitunnus, jotta
   * savukkeiden taksonomiaväitteet lukevat yhä sitä luokkaa, jonka
   * kortti kertoo) ja se nimi, joka kuvaan ladottiin.
   */
  kuva.dataset.symboli = NOSTOSYM_PIIRTAJAT[symboli] ? symboli : 'huuto';
  kuva.dataset.nimio = teksti;
  const porras = NOSTOSYM_PORRAS;
  const avain = `${porras}|${tunnus}|${nimionLaji}|${teksti}`;
  let valmis = NOSTOSYM_RASTERIT.get(avain);
  if (!valmis) {
    valmis = nostosymRasteroi(tunnus, teksti, g.ownerSVGElement, porras, nimionLaji);
    NOSTOSYM_RASTERIT.set(avain, valmis);
  }
  valmis.then((r) => {
    if (!kuva.isConnected) return;
    maare(kuva, 'x', (-NOSTOSYM_MINI_RUUTU).toFixed(2));
    maare(kuva, 'y', (-NOSTOSYM_MINI_RUUTU).toFixed(2));
    maare(kuva, 'width', r.leveys.toFixed(2));
    maare(kuva, 'height', r.korkeus.toFixed(2));
    maare(kuva, 'href', r.osoite);
    // Vanha WebKit lukee vain xlink-nimiavaruuden osoitteen.
    kuva.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', r.osoite);
  }).catch(() => {
    NOSTOSYM_RASTERIT.delete(avain);
    if (kuva.isConnected) elavana();
  });
}

/**
 * AKTIIVISEN TÄYN ANKKURI — täyn OMA SYMBOLI, jonka päälle kupla
 * asettuu ja johon sen nokka osoittaa.
 *
 * Ennen ankkuri oli pelkkä mustepiste, mutta se näytti pelaajasta
 * siltä, että symboli katoaa tai "muuttuu peruspisteeksi" napautuksesta
 * (omistaja 26.8.2026 ilta: *"Kartalta katoaa pöllön poikasen kuvake
 * kun sitä painaa ... Saisi pysyä"*). Nyt symboli pysyy paikallaan
 * kuplan alla — merkki ja kupla kertovat samasta asiasta. Ankkuri ei
 * silti ota napautuksia vastaan (css: pointer-events), koska kupla on
 * sen päällä ja KOKO KUPLA vie lunastukseen (omistaja 26.8.2026 ilta);
 * siksi tässä ei ole osuma-aluetta eikä kuuntelijoita.
 *
 * EIKÄ NIMIÖTÄ (27.8.2026, läpinäkyvä mustetyyli): kartan kohdemerkki
 * saa nimensä merkin alle, mutta täyn nimi on jo kuplassa merkin
 * päällä. Nimiö toistaisi sen kahdesti päällekkäin.
 */
function piirraNostosymAnkkuri(g, symboli) {
  /*
   * ANKKURI ON KARTALLA, JOTEN SE ON VIIVAMERKKI (27.8.2026 ilta). Kupla
   * asettuu sen päälle, mutta merkki itse on osa karttaa eikä kuplan
   * kuvitusta: raskas mustepiirros luki tässäkin kuvituksena. Sama
   * taulu kuin kohdemerkeillä — kaksi merkkiperhettä samalla lehdellä
   * olisi juuri se sekamelska, josta läpinäkyvään mustetyyliin
   * aikanaan siirryttiin.
   */
  piirraNostosymMini(g, symboli);
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

/**
 * KUPLAN ANKKURI KARTALLE.
 *
 * @param {object} ui
 * @param {object} tila
 * @param {?object} tila.merkinta  { id, otsikko, symboli, paikka:{x,y} }
 *   — kuplassa olevan täyn ankkuri, tai null/puuttuva kun kartalla ei
 *   ole yhtään täkyä.
 *
 * YKSI TÄKY PER MAA (omistaja 26.8.2026 ilta), joten kerroksella on
 * enää tämä yksi merkintä. Ennen sama kerros piirsi myös poolin muut
 * täyt napautettavina symboleina, joiden napautus nosti täyn kuplaan;
 * kun poolissa on vain yksi täky, sellaisia merkkejä ei enää synny, ja
 * maan muut aiheet ovat kartan tavallisia kohteita (js/fokuskohteet.js
 * — sama symbolikirjasto piirtää nekin, ks. tiedoston alku).
 *
 * TYÖ TEHDÄÄN VAIN KUN SISÄLTÖ MUUTTUI, kuten muillakin kerroksilla:
 * zoomi muuttaa vain ankkuriryhmien muunnosta, ei yhtäkään solmua.
 */
export function paivitaNostosymbolit(ui, tila = {}) {
  if (typeof document === 'undefined') return;
  const kerros = nostosymKerros(ui);
  if (!kerros) return;
  const merkinta = tila.merkinta ?? null;
  const avain = merkinta
    ? `${ui.game?.pack?.id}:${merkinta.id}@${merkinta.paikka.x},${merkinta.paikka.y}`
      + `/${merkinta.symboli}`
    : 'tyhja';
  if (ui.nostosymAvain !== avain) {
    ui.nostosymAvain = avain;
    kerros.textContent = '';
    ui.nostosymRyhmat = [];
    ui.nostosymAnkkurit = [];
    // Kiertävällä laudalla sama merkki molempiin kohtiin (ks. sääntö 1).
    for (const x of merkinta
      ? ui.kiertoKohdat?.(merkinta.paikka.x) ?? [merkinta.paikka.x] : []) {
      const ryhma = el('g', { class: 'fokusnosto-symboliryhma' }, kerros);
      ui.nostosymRyhmat.push({ g: ryhma, x, y: merkinta.paikka.y });
      const ankkuri = el('g', {
        class: `fokusnosto-ankkuri nostosym-tyyppi-${merkinta.symboli}`,
      }, ryhma);
      piirraNostosymAnkkuri(ankkuri, merkinta.symboli);
      ui.nostosymAnkkurit.push(ankkuri);
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

/*
 * AKTIIVISEN TÄYN ANKKURIT ovat `ui.nostosymAnkkurit` — kiertävällä
 * laudalla sama paikka on kartalla kahdesti, ja kupla asetetaan sen
 * kopion viereen, joka pelaajalla oikeasti on edessään.
 *
 * Valinta EI OLE ENÄÄ TÄSSÄ (26.8.2026): se luki jokaisen kopion
 * paikan getBoundingClientRectillä, ja koska kartan vahti asemoi
 * kuplan joka kehyksellä, siitä tuli kaksi asettelunlukua kehykseen
 * kesken eleen. Nyt kopiot mitataan kerran ja lähin valitaan
 * talletetuista luvuista (js/fokusnosto.js nostoAnkkurinPaikka) —
 * v1115:n sääntö "ei asettelunlukuja silmukassa".
 */

/** Symbolit pois. Kerros jää paikalleen tyhjänä, kuten muillakin. */
export function nollaaNostosymbolit(ui) {
  if (!ui) return;
  ui.nostosymAvain = null;
  ui.nostosymRyhmat = [];
  ui.nostosymAnkkurit = [];
  if (ui.nostosymKerros?.isConnected) ui.nostosymKerros.textContent = '';
}
