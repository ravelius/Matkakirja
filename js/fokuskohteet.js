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
 * === OMA KERROS ===
 *
 * Nämä merkit ovat kartan omaisuutta ja näkyvät heti kun lehti on
 * auki, riippumatta siitä missä vaiheessa virta on. (Fokusvirralla oli
 * ennen oma vinjettikerros virran matkamuistokuville; se purettiin —
 * ks. js/fokusvirta.js KUVAT KARTALLA — PURETTU.)
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
import {
  NOSTOSYM_LUOKAT, NOSTOSYM_MINI_R, NOSTOSYM_NIMIO_KYLJET, NOSTOSYM_TYYPIT,
  nostosymAsetaPorras, nostosymNimioLaatikko, nostosymVirkistaRasterit,
  piirraNostosymKartalle, piirraNostosymboli,
} from './fokusnosto-symbolit.js';
// Sähketehtävän sisältöhakemisto tarvitsee maan kohdelistan (ks.
// asetaKohdehakemisto-kutsu KOHDE_MAAT-taulun alla).
import { asetaKohdehakemisto } from './fokusvirta.js';
import { FOKUS_LISANIMET } from './packs/fokus-grc.js';
// Laattoihin poltetut maastonimet (vuoret, järvet, joet): sama nimi
// vain kerran kartalle, ks. maastonimiLahella.
import { MAAILMANKARTAN_NIMET } from './packs/maailmankartta-nimet.js';
import {
  LAUDAN_YMPARYS, PARIN_ETAISYYS, asetaKohdenimet, karttanimetLatovat, normalisoiNimi,
} from './karttanimet.js';
import { karttavaloKarkisymboli, piirraKarttavalo } from './karttavalot.js';
import { asetaKuva } from './media.js';
import { html, jaaKappaleiksi, nielaiseSulkevaNapautus, polloNimilappu } from './ui-apurit.js';
import { piirraReaktiot } from './reaktiot.js';
import { valokuvaSuurennos, valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { FOKUSKOHTEET_AFG } from './packs/fokuskohteet-afg.js';
import { FOKUSKOHTEET_BGR } from './packs/fokuskohteet-bgr.js';
import { FOKUSKOHTEET_BIH } from './packs/fokuskohteet-bih.js';
import { FOKUSKOHTEET_CHN } from './packs/fokuskohteet-chn.js';
import { FOKUSKOHTEET_DEU } from './packs/fokuskohteet-deu.js';
import { FOKUSKOHTEET_EGY } from './packs/fokuskohteet-egy.js';
import { FOKUSKOHTEET_FRA } from './packs/fokuskohteet-fra.js';
import { FOKUSKOHTEET_GBR } from './packs/fokuskohteet-gbr.js';
import { FOKUSKOHTEET_HUN } from './packs/fokuskohteet-hun.js';
import { FOKUSKOHTEET_HRV } from './packs/fokuskohteet-hrv.js';
import { FOKUSKOHTEET_IRN } from './packs/fokuskohteet-irn.js';
import { FOKUSKOHTEET_IRQ } from './packs/fokuskohteet-irq.js';
import { FOKUSKOHTEET_ITA } from './packs/fokuskohteet-ita.js';
import { FOKUSKOHTEET_JOR } from './packs/fokuskohteet-jor.js';
import { FOKUSKOHTEET_LBY } from './packs/fokuskohteet-lby.js';
import { FOKUSKOHTEET_MEX } from './packs/fokuskohteet-mex.js';
import { FOKUSKOHTEET_ROU } from './packs/fokuskohteet-rou.js';
import { FOKUSKOHTEET_SYR } from './packs/fokuskohteet-syr.js';
import { FOKUSKOHTEET_TUN } from './packs/fokuskohteet-tun.js';
import { FOKUSKOHTEET_TUR } from './packs/fokuskohteet-tur.js';
import { FOKUSKOHTEET_ZWE } from './packs/fokuskohteet-zwe.js';
import { FOKUSKOHTEET_GRC } from './packs/fokuskohteet-grc.js';
import { MAASTOKOHTEET } from './packs/maastokohteet.js';
import {
  niputaFokusmerkit, nippuAsettelunVersio, nippuAvaaKaupunki, nippuLaatanEtaisyys,
  nippuLaattaEsteet,
} from './fokusniput.js';
import { nostoOnPoltettu } from './laattapyramidi.js';
import { nostoladontaKattoPorras, nostoladontaTiiviste } from './nostoladonta.js';
import { polloKysy } from './pollo.js';
import { sfx } from './sound.js';
import { taytaLahderivi } from './tekijakortti.js';

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
  /*
   * Ranska ja Britannia tulivat mukaan 27.8.2026 Matkakirjan ihmeiden
   * EUROOPAN erän takia: Tuileries'n palatsi ja keskiaikainen St Paul
   * olisivat muuten jääneet ilman maata. Ehto on sama kuin Egyptillä ja
   * Irakilla — kummankin lehti on jo ämpärissä (FRA.webp, GBR.webp),
   * joten merkit saavat pohjan, jonka päälle asettua. Erän kolmas ihme,
   * Forum Romanum, mahtui jo olemassa olevaan Italian listaan.
   */
  FRA: FOKUSKOHTEET_FRA,
  GBR: FOKUSKOHTEET_GBR,
  /*
   * Seitsemän maata lisää 27.8.2026 Matkakirjan ihmeiden MAAILMAN erän
   * takia. Ehto on joka kerta sama eikä siitä ole poikettu: maa pääsee
   * tähän tauluun vain, jos sen fokuslehti on jo FOKUS_POHJAT-taulussa
   * (js/packs/fokus-grc.js). Kaikkien seitsemän lehti on ämpärissä
   * (SYR.webp, CHN.webp, MEX.webp, JOR.webp, IRN.webp, AFG.webp,
   * ZWE.webp), joten merkit saavat pohjan, jonka päälle asettua.
   *
   * Jokaisen tiedosto on yhden kohteen mittainen ja odottaa maan omaa
   * varsinaista erää — nämä ovat ihme-erän jalustoja, eivät
   * maakatsauksia. Erän muut kohteet mahtuivat jo olemassa oleviin
   * listoihin (Kreikka, Turkki, Egypti, Ranska, Britannia).
   */
  SYR: FOKUSKOHTEET_SYR,
  CHN: FOKUSKOHTEET_CHN,
  MEX: FOKUSKOHTEET_MEX,
  JOR: FOKUSKOHTEET_JOR,
  IRN: FOKUSKOHTEET_IRN,
  AFG: FOKUSKOHTEET_AFG,
  ZWE: FOKUSKOHTEET_ZWE,
  /*
   * Libya ja Tunisia tulivat mukaan 27.8.2026 Matkakirjan ihmeiden
   * VÄLIMEREN erän takia: Leptis Magna ja Karthagon pyöreä sotasatama
   * olisivat muuten jääneet ilman maata. Ehto on sama kuin kaikilla
   * edellisillä — kummankin fokuslehti on jo FOKUS_POHJAT-taulussa ja
   * ämpärissä (LBY.webp, TUN.webp, tarkistettu 27.8.2026), joten
   * merkit saavat pohjan, jonka päälle asettua. Erän kuusi muuta
   * kohdetta mahtuivat jo olemassa oleviin listoihin (Italia, Kreikka,
   * Turkki kahdella ja Irak kahdella).
   */
  LBY: FOKUSKOHTEET_LBY,
  TUN: FOKUSKOHTEET_TUN,
  /*
   * UNKARI 27.8.2026 — ensimmäinen maa, joka tulee tähän tauluun
   * KURATOIDUN lehden mukana eikä ihme-erän jalustana. Budapest on
   * pelattava kaupunki, ja sen fokuslehti kirjoitettiin käsin Kreikan
   * kaavalla (tools/fokuskartta/maat.mjs FOKUSMAAT.HUN): lehdessä on
   * vesileima, kolme hachure-vuorta ja viisi poltettua kaupunginnimeä.
   *
   * Ehto on sama kuin kaikilla edellisillä eikä siitä ole poikettu:
   * maan fokuslehti on FOKUS_POHJAT-taulussa (js/packs/fokus-grc.js) ja
   * ämpärissä (HUN.webp), joten merkit saavat pohjan, jonka päälle
   * asettua. Erona on, että tällä kertaa lehti ja kohteet on tehty
   * samalla kertaa — siksi jokainen kartalla nimetty asia on myös
   * napautettava, eikä yhtään nimeä ole kahdesti.
   */
  HUN: FOKUSKOHTEET_HUN,
  /*
   * KROATIA 27.8.2026, ja se on tässä taulussa ensimmäinen maa, jonka
   * LEHTI TEHTIIN TÄTÄ LISTAA VARTEN eikä toisin päin. Kaikilla
   * edellisillä ehto oli sama — maa pääsee tauluun vain, jos sen
   * fokuslehti on jo FOKUS_POHJAT-taulussa ja ämpärissä — ja Kroatian
   * kohdalla ehto täyttyi siten, että lehti (HRV.webp) renderöitiin
   * uusiksi kuratoituna samassa erässä: merten, vuorten ja jokien
   * nimiä ei ole poltettu kuvaan lainkaan, koska nimet tulevat näiden
   * kohteiden nimiöistä. Ks. tools/fokuskartta/maat.mjs FOKUSMAAT.HRV
   * ja js/packs/fokuskohteet-hrv.js:n alku.
   */
  HRV: FOKUSKOHTEET_HRV,
  /*
   * SAKSA tuli mukaan 27.8.2026 Berliinin lehden mukana, ja se on
   * ensimmäinen maa, jonka kohdelista on samalla LEHDEN KOKO NIMISTÖ:
   * Saksan lehteen ei ole poltettu yhtäkään nimeä, joten jokainen
   * kartalla näkyvä nimi tulee tästä listasta ja on napautettavissa
   * (Raamattu, KARTTAMERKIT MINIMALISTISIKSI; perustelut
   * js/packs/fokuskohteet-deu.js ja tools/fokuskartta/maat.mjs
   * FOKUSMAAT.DEU). Ehto on sama kuin kaikilla edellisillä — DEU.webp
   * on FOKUS_POHJAT-taulussa ja ämpärissä.
   */
  DEU: FOKUSKOHTEET_DEU,
};

/*
 * MAASTOKOHTEET (omistajan päätös 29.8.2026: *"Tee vuoret ja meret
 * avattaviksi kaikkiin maihin."*) — maan vuoret, meret ja joet omana
 * tiedostoperheenään. Perustelut sille, miksi ne eivät ole rivejä yllä
 * olevissa pakeissa, ovat js/packs/maastokohteet.js:n alussa; lyhyesti:
 * kahdeksallatoista tämän erän maalla ei ollut pakkia lainkaan, ja
 * niillä kuudella joilla oli, käsin kirjoitettuun sisältöön ei haluttu
 * koskea.
 *
 * Liitos on TÄSSÄ eikä hakemistossa, koska KOHDE_MAAT on tämän
 * tiedoston oma taulu. Maa, jolla on jo pakki, saa maastokohteensa sen
 * listan PERÄÄN; maa, jolla ei ole, saa listan kokonaan tästä.
 * Kumpikaan alkuperäinen lista ei muutu — ne vain katsotaan yhdessä.
 */
for (const [iso, kohteet] of Object.entries(MAASTOKOHTEET)) {
  KOHDE_MAAT[iso] = [...(KOHDE_MAAT[iso] ?? []), ...kohteet];
}

/*
 * KOHTEET SÄHKETEHTÄVÄN SISÄLTÖHAKEMISTOON (Raamattu, PÖLLÖN
 * SÄHKETEHTÄVÄ).
 *
 * Sähkelomakkeen valintalista on KOKO MAAN SISÄLTÖHAKEMISTO
 * (js/fokusvirta.js sisaltohakemisto), ja monessa maassa sen paksuin
 * aineisto on juuri tämä taulu — kartan kohteet, jotka pelaaja avaa
 * itse. Bulgariassa niitä on kahdeksantoista ja lehtijuttuja seitsemän,
 * joten ilman tätä riviä hakemisto olisi vain kolmasosa siitä, mitä
 * maasta on luettavissa.
 *
 * KYTKENTÄ ON TAKAISINKUTSU EIKÄ IMPORT, koska js/fokusvirta.js on
 * niputusjärjestyksessä ENNEN tätä tiedostoa (tools/build-standalone.mjs
 * MODULES): suora tuonti sieltä tänne kääntäisi järjestyksen väärin
 * päin. Sama ratkaisu ja sama syy kuin lehtitehtävien kuittauksella
 * (asetaTehtavakuittaus), vain vastakkaiseen suuntaan.
 */
asetaKohdehakemisto((iso) => KOHDE_MAAT[iso] ?? []);

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

/*
 * Aihevalon koko tämän merkin mittakaavassa (js/karttavalot.js).
 * Kohdemerkin näkyvä ala on korostuskehän luokkaa (r = 6), ja 0,6
 * asettaa valon täpläksi merkin alle. Eläintäky käyttää samaa
 * kerrointa samasta syystä (js/elaintaky.js ELAINTAKY_VALO_KOKO).
 */
const KOHDE_VALO_KOKO = 0.6;

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
function nykyinenIso(ui) {
  const taulu = ui?.game?.pack?.map?.cityCountry;
  const kaupunki = ui?.game?.cityOf?.();
  return (taulu && kaupunki && taulu[kaupunki.id]) || null;
}

/**
 * KARTAN MERKIT LAUDAN DATASTA — SAMA PASSI PELILLE JA GENERAATTORILLE.
 *
 * Viety ulos 31.8.2026 (Raamattu, KARTTANOSTOT POLTETAAN LAATTOIHIN):
 * *"Poltetun ladonnan ja selaimen osumamuotojen on tultava SAMASTA
 * lähteestä, ettei kahta ladontaa pääse eriytymään."* Laattageneraattori
 * kutsuu TÄTÄ funktiota (js/nostoladonta.js) eikä kirjoita omaa
 * versiotaan — myös kärkisymbolin valinta ja karttanimen sääntö tulevat
 * silloin samasta paikasta kuin pelissä.
 *
 * @param {?string} iso        maatunnus
 * @param {?string} lauta      laudan tunnus (kohteen `laudat`-avain)
 * @param {Array} kaupungit    maan kaupungit ryhmittelyn ankkureiksi
 * @param {function} pohjanAlla  (x, y) => onko piste lehden ikkunassa
 * @param {Array} lisat        lisälähteiden rivit (täky, syvennys,
 *   skandaali) — generaattori antaa vain ne, jotka se aikoo polttaa
 */
/*
 * `kaupungit` EI OLE ENÄÄ TÄMÄN PASSIN SYÖTETTÄ (31.8.2026). Se meni
 * kategoria per kaupunki -yhdistelylle (ent. js/fokusryhmat.js), joka
 * purettiin: kaupunkien ympärille latominen on nyt kasauspassin työtä
 * (js/fokusniput.js), ja se saa kaupungit `ui.fokuskohdeKaupungit`-
 * kentästä. Parametri jää kutsurajapintaan, koska kutsujia on kaksi
 * (peli ja laattageneraattori) eikä sen poisto kuulu tähän erään.
 */
export function kohdeKarttarivit({
  iso, lauta, kaupungit = [], pohjanAlla, lisat = [],
}) {
  const lista = (iso && KOHDE_MAAT[iso]) || [];
  const kohteet = lista.map((kohde) => ({ kohde, paikka: kohde.laudat?.[lauta] }));
  for (const rivi of lisat) kohteet.push(rivi);
  /*
   * JOKAINEN NOSTO ON OMA MERKKINSÄ (omistaja 31.8.2026,
   * esityssiirto): passi palauttaa rivit sellaisinaan eikä yhdistä
   * mitään. Yhdistely eli "kategoria per kaupunki" oli tässä
   * saman päivän aamusta iltaan — se ratkaisi ahtauden nimiön
   * kustannuksella, ja pilkkulista ("Olympieion, Iliou Melathron…") oli
   * omistajan mielestä väärä hinta. Ahtaus ratkeaa nyt ladonnassa
   * (js/fokusniput.js sääntö 2) eikä sisällössä.
   */
  const rivit = kohteet
    .filter(({ paikka }) => Number.isFinite(paikka?.x) && Number.isFinite(paikka?.y))
    /*
     * Vain lehden alueella olevat. Lehti on maan ikkuna, ja sen
     * ulkopuolelle jäävä merkki osuisi laudan omaan grafiikkaan —
     * pelaajalle se näyttäisi merkiltä ilman karttaa.
     */
    .filter(({ paikka }) => pohjanAlla(paikka.x, paikka.y));
  return karsiKaupunkiruuhka(rivit, kaupungit);
}

/*
 * === KAUPUNKINOSTOJEN KATTO (omistaja 1.9.2026, sanatarkasti) ======
 *
 * *"Karttanostot pitäisi periaatteessa olla nimenomaan nostoja muista
 * paikoista kuin kohdekaupungeista. Tehdään niin, että lisätään nuo
 * mahdollisuuksien mukaan kaupunkilehden sisältöön ja jätetään
 * maksimissaan kolme nostoa per kohdekaupunki näkyville. Ja ne, mitä
 * priorisoidaan, ovat joko ihmeitä tai skandaaleja. Kaikki muut
 * sisällytetään kaupunkilehtiin. Ja kun jatkossa tehdään nostoja, niin
 * kerätään niitä vain muista kuin kohdekaupungeista."*
 *
 * Kaupungin viereen osuvista riveistä (koordinaatittomat syvennykset,
 * skandaalit ja täkynostot ladotaan kaupunkiin 0–3 yksikön päähän, ja
 * kaupungin sisäiset nähtävyydet istuvat parin yksikön säteellä)
 * kartalle jää enintään KATTO kappaletta, prioriteetilla ihme >
 * skandaali > syvennys > täkynosto > muu. Pudotettu rivi EI katoa
 * pelistä: sisältö siirretään kaupunkilehteen (erillinen erä).
 *
 * SÄDE 8 yksikköä (~27 km): kattaa ladotut ja kaupungin sisäiset,
 * muttei naapurikohteita (Pernik 10, Vitosa 5 — Vitosa on rypästä).
 * Sääntö on osa nostoladontaa: sama karsinta ajaa pelissä ja
 * poltossa (NOSTOLADONTA_SAANTO v3), joten elävä kerros ja laatat
 * eivät voi erota.
 *
 * === KATTOVAPAA: NOSTO, JOKA EI OLE KAUPUNGISSA (2.9.2026) =========
 *
 * Omistajan sääntö 2.9.2026 (sanatarkasti): *"lisää kaikki historian
 * hetket ja muut karttanostot myös joko pääkarttanäkymään tai sitten
 * kaupunkilehden kaupunkikartalle, ellei näin ole jo tehty."* Lehtisivu
 * ei siis ole koskaan noston ainoa paikka, ja karsitulle merkille on
 * kaksi vaihtoehtoa: kaupunkilehden kohdekartta tai pääkartta.
 *
 * Kaupunkilehden kohdekartta kelpaa vain, jos nosto osuu sen rajaukseen
 * — kartta on esirenderöity kuva parin kilometrin ruudusta. Sofian
 * Vitoša (5 yksikköä keskustasta), Boyanan kirkko ja eläintarha,
 * Krakovan Wieliczka, Lontoon Richmond Park ja kolmetoista muuta jäävät
 * sen ulkopuolelle: ne EIVÄT OLE kohdekaupungissa vaan sen lähialueella.
 * Juuri sellaisia nostoja omistaja pyysi kartalle 1.9. (*"nostoja
 * nimenomaan muista paikoista kuin kohdekaupungeista"*) — kahdeksan
 * yksikön säde vain sattuu yltämään niiden yli.
 *
 * `kattoVapaa: true` on siksi datan kenttä, joka sanoo: tämä nosto ei
 * ole kaupungin sisällä, joten kaupunkinostojen katto ei koske sitä.
 * Lippu on merkitty vain niille, joille tools/tarkista-nostopaikat.mjs
 * osoittaa, ettei kohdekarttaa ole tarjolla; tests/nostot-kartalla.test.mjs
 * valvoo, ettei se leviä muualle.
 */
const KAUPUNKIKATON_SADE = 8;
const KAUPUNKINOSTOJEN_KATTO = 3;

function nostonPrioriteetti(kohde) {
  if (kohde?.ihme) return 0;
  const id = String(kohde?.id ?? '');
  if (id.startsWith('skandaali-')) return 1;
  if (id.startsWith('syvennys-')) return 2;
  if (id.startsWith('nosto-')) return 3;
  return 4;
}

function karsiKaupunkiruuhka(rivit, kaupungit) {
  if (!kaupungit?.length) return rivit;
  const pois = new Set();
  for (const c of kaupungit) {
    const ruuhka = [];
    rivit.forEach((r, i) => {
      if (r.kohde?.tyyppi === 'kaupunki') return; // kaupunkikohde on oma laattansa vieressä
      if (r.kohde?.kattoVapaa) return;            // ei kaupungissa (ks. KATTOVAPAA yllä)
      if (Math.hypot(r.paikka.x - c.x, r.paikka.y - c.y) <= KAUPUNKIKATON_SADE) {
        ruuhka.push({ r, i });
      }
    });
    if (ruuhka.length <= KAUPUNKINOSTOJEN_KATTO) continue;
    // Vakaa järjestys: prioriteettiluokka, tasapelissä alkuperäinen
    // rivijärjestys — sama syöte antaa saman kartan joka ajolla.
    ruuhka.sort((a, b) => (nostonPrioriteetti(a.r.kohde) - nostonPrioriteetti(b.r.kohde))
      || (a.i - b.i));
    for (const { i } of ruuhka.slice(KAUPUNKINOSTOJEN_KATTO)) pois.add(i);
  }
  return pois.size ? rivit.filter((_, i) => !pois.has(i)) : rivit;
}

function nykyisenMaanKohteet(ui) {
  if (!ui?.fokusPohjaBbox) return [];
  const iso = nykyinenIso(ui);
  /*
   * YHTENÄINEN KOHDEMALLI (Raamattu 29.8.2026): täkynostot ja
   * syvennystarinat ovat karttapisteitä samassa kerroksessa kuin
   * maan kohteet — sama merkki, sama nimiöväistö, sama kasauspassi ja
   * sama aihevalo, vain avautuva kortti on omansa (kohteen `avaa`).
   * Lähteet ilmoittautuvat rekisteröintinä (rekisteroiLisakohteet),
   * koska js/fokusnosto.js ja js/syvennys.js ovat niputusjärjestyksessä
   * tämän moduulin JÄLKEEN eikä tuonti heihin päin ole mahdollinen.
   */
  const lisat = [];
  for (const hae of KOHDE_LISALAHTEET) {
    for (const rivi of hae(ui) ?? []) lisat.push(rivi);
  }
  return kohdeKarttarivit({
    iso,
    lauta: ui.game?.pack?.id,
    kaupungit: maanKaupungit(ui, iso),
    pohjanAlla: (x, y) => Boolean(ui.fokusPohjanAlla?.(x, y)),
    lisat,
  });
}

/**
 * MAAN KAUPUNGIT LAUDAN KOORDINAATEISSA — ryhmittelyn ankkurit.
 *
 * Sama lähde kuin kohteiden maalla (map.cityCountry) ja sama lista,
 * jolta peli piirtää laattansa (pack.cities), joten ryhmittely ei tuo
 * peliin uutta paikkatietoa: se lukee sitä, mikä laudalla jo on.
 * Nykyinen kaupunki ei ole erikoisasemassa — maan jokainen kaupunki
 * kerää omat kohteensa, kuten omistajan kysymys edellytti (*"joillain
 * kaupungeilla"*, ei "sillä kaupungilla, jossa pelaaja seisoo").
 */
function maanKaupungit(ui, iso) {
  const taulu = ui?.game?.pack?.map?.cityCountry;
  if (!iso || !taulu) return [];
  return (ui.game.pack.cities ?? []).filter((kaupunki) => taulu[kaupunki.id] === iso);
}

/*
 * LISÄKOHTEIDEN LÄHTEET. Kukin lähde on funktio (ui) → [{ kohde,
 * paikka }], jossa `kohde` on kohdemallin tietue (id, nimi, symboli,
 * tyyppi, `avaa`) ja `paikka` laudan koordinaatit. Rekisteröinti
 * tapahtuu käynnistyksessä (js/main.js → kytkeFokusnosto,
 * kytkeSyvennys), joten taulu on valmis ennen ensimmäistä piirtoa.
 */
const KOHDE_LISALAHTEET = [];

export function rekisteroiLisakohteet(hae) {
  if (typeof hae === 'function' && !KOHDE_LISALAHTEET.includes(hae)) {
    KOHDE_LISALAHTEET.push(hae);
  }
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
 *
 * ── KARTALLA ON VAIN KAHDEKSAN SYMBOLIA (omistaja 31.8.2026) ───────
 *
 * Valintajärjestys yllä antaa KOHTEEN TARKAN KATEGORIAN
 * (kohteenKategoria), joita on neljätoista. Kartalle niistä piirretään
 * enää RYHMÄN KÄRKISYMBOLI — täsmälleen selitevalikon kahdeksan riviä
 * (js/karttavalot.js KARTTAVALO_AIHEET, karttavaloKarkisymboli).
 *
 * MIKSI: kuusi merkkiä (silmä, malja, veturi, sulkakynä, ankkuri,
 * seppele) esiintyi kartalla ilman omaa seliteriviä — pelaaja näki
 * ankkurin muttei löytänyt ankkuria selitteestä. Nyt ankkuri on vaaka,
 * sulkakynä on pylväs, ja kartta ja selite vastaavat toisiaan.
 *
 * MUUNNOS ON TÄSSÄ EIKÄ PIIRTOKERROKSESSA, koska tämä funktio on
 * kartan merkin ainoa lähde: sitä seuraavat myös aihevalo, selitteen
 * kappalemäärät ja kohdekortin ylärivi, eikä suodatinta tarvitse siksi
 * toistaa yhdessäkään kutsujassa.
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

/** Kohteen TARKKA kategoria (neljätoista) — ks. valintajärjestys yllä. */
function kohteenKategoria(kohde) {
  if (kohde?.ihme?.kadonnut && kohde.ihme.osoite) return 'ihme';
  if (NOSTOSYM_TYYPIT.has(kohde?.symboli)) return kohde.symboli;
  if (kohteenKierrokset(kohde).length) return 'silma';
  return KOHDE_TYYPPISYMBOLIT[kohde?.tyyppi] ?? null;
}

/** Kartalle piirtyvä merkki: ryhmän kärkisymboli, kahdeksasta. */
function kohteenSymboli(kohde) {
  return karttavaloKarkisymboli(kohteenKategoria(kohde));
}

/*
 * SAAKO MERKKI NIMIÖN (27.8.2026, läpinäkyvä mustetyyli)?
 *
 * Symbolimerkki saa nimensä perään (js/fokusnosto-symbolit.js
 * piirraNostosymNimio) — PAITSI KAUPUNKI, jonka nimen LEHTI PAINAA
 * ITSE. Jokainen fokuslehti latoo kaupunkiensa nimet kuvaan pienen
 * renkaan viereen: kuratoidulla Kreikan lehdellä käsin asetellut
 * (tools/fokuskartta/piirto.js kohta 8f) ja muilla mailla Natural
 * Earthistä poimitut (kohta 8g). Kohdemerkki istuu samassa pisteessä,
 * joten sen oma nimiö olisi sama nimi kahdesti vierekkäin — juuri se
 * näkyi Kreikan lehdellä Thessalonikin ja Pátran kohdalla.
 *
 * Muut kategoriat saavat nimiönsä: lehti ei nimeä pyhäköitä, museoita,
 * markkinoita eikä eläimiä, ja juuri niistä kartta ei ilman nimiötä
 * kerro mitään.
 *
 * ── EHTO ON NIMI KARTALLA, EI TYYPPI (v1218) ──────────────────────
 *
 * Omistajan kaappaus v1217:stä: Kreikan lehdellä oli useita merkkejä
 * kokonaan ilman nimeä siellä missä tilaa oli yllin kyllin. Syy oli
 * tässä: `tyyppi === 'kaupunki'` vaiensi nimiön KAIKILTA kaupungeilta,
 * mutta perustelu — *"lehti painaa nimen itse"* — pätee vain niihin,
 * jotka lehteen oikeasti on poltettu. Kreikan lehdessä niitä on neljä
 * (tools/fokuskartta/maat.mjs GRC.kaupungit: Thessaloníki, Pátra,
 * Ioánnina, Náfplio) ja lisäksi pelin oma laatta (Ateena). Iraklion,
 * Kalamata, Ermoupoli ja Marathon EIVÄT ole kummassakaan listassa,
 * joten niiden nimi ei lukenut kartalla missään — merkki oli sulkakynä,
 * ankkuri tai malja ilman yhtään sanaa.
 *
 * Ehto luetaan siksi DATASTA eikä tyypistä: nimiö jää pois vain, jos
 * samassa pisteessä on nimi, jonka joku muu kartalle kirjoittaa.
 * Vertailu on PAIKALLA eikä nimellä, koska kirjoitusasut eroavat
 * listojen välillä (`Patras` / `Pátra`).
 *
 * LEHDEN POLTETTU NIMI EI ENÄÄ KELPAA SIKSI NIMEKSI (2.9.2026): lehdet
 * on purettu, eikä pyramidiin polteta nimiä. Perustelu ja mittaus ovat
 * nimiJoKartallan kohdalla alempana.
 */

/** Sama piste laudalla: listat on poimittu samoista koordinaateista. */
const KOHDE_SAMA_PISTE = 3;

/*
 * LEHDEN ITSE PAINAMAT KAUPUNGINNIMET laudan koordinaateissa.
 *
 * TAULU ON JÄÄNNE, JA SE ON TIEDOSSA (2.9.2026): lehdet on purettu (ks.
 * nimiJoKartalla alla), joten yksikään näistä nimistä ei ole kartalla.
 * Funktio jää palvelemaan vain kaupunginNimiLaatikkoa eli sitä
 * näkymätöntä napautusaluetta, joka poltetun nimen kohdalla oli — se on
 * kartalla tyhjän paperin päällä ja avaa saman kortin kuin merkki, eikä
 * siis ole vaarallinen. Jos taulu joskus poistetaan kokonaan, poistuu
 * laatikkokin; se on oma erilliskysymyksensä (Raamattu:
 * KLIKATTAVUUSLINJAN VARTIO).
 */
function poltetutKaupungit(ui) {
  const iso = nykyinenIso(ui);
  const tiedot = iso ? FOKUS_LISANIMET[iso] : null;
  if (!tiedot || tiedot.lauta !== ui?.game?.pack?.id) return [];
  return tiedot.kaupungit ?? [];
}

/* ── LEHTEEN POLTETUT NIMET EIVÄT OLE ENÄÄ MISSÄÄN (2.9.2026) ──────
 *
 * OMISTAJAN BUGIRAPORTTI, sanatarkasti: *"symbolit heittelee muodoiltaa
 * ja tekstejä puuttuu"*; kaappauksessa Bulgariasta on linnasymboli
 * ilman tekstiä kohdassa 43°P / 25,5°I. Se on Veliko Tarnovo.
 *
 * JUURISYY ON VANHENTUNUT OLETUS. Tämä ehto vaiensi kaupunkikohteen
 * nimiön aina, kun samassa pisteessä oli FOKUS_LISANIMET-taulun rivi —
 * perustelu oli *"lehti painaa nimen itse"* (v1218). Se piti
 * paikkansa niin kauan kuin maakohtainen fokuslehti oli kartalla
 * rasterina. LEHDET ON PURETTU: laattapyramidi on pelin ainoa
 * karttapohja (omistaja 30.8.2026, *"poista kaikki muut vaihtoehdot
 * käytöstä"*; js/laattapyramidi.js johdanto ja js/ui.js
 * paivitaMaanIkkuna: *"lehdet ovat poissa"*), eikä pyramidiin polteta
 * nimiä lainkaan (js/karttanimet.js). Taulu jäi siis kuvaamaan nimiä,
 * jotka eivät ole kartalla missään — ja merkki jäi ilman yhtään
 * kirjainta.
 *
 * MITATTU (keraaNostot, koko maailma): nimiöttömiä merkkejä 77 -> 50.
 * Ne 27 ovat kaupunkikohteita, joiden nimeä ei nyt kirjoita kukaan:
 * Thessaloniki, Pátra, Ioánnina, Náfplio, Plovdiv, Varna, Veliko
 * Tarnovo, Mostar, Banja Luka, Zagreb, Split, Rijeka, Zadar, Osijek,
 * Debrecen, Szeged, Pécs, Eger, Győr, Napoli, Milano, Torino ja
 * vastaavat. Loput 50 vaikenevat yhä oikein: niiden nimi on kartalla
 * maastonimenä (maastonimiLahella) tai laudan omana kaupunkina.
 *
 * TAULU JÄÄ PAIKALLEEN. FOKUS_LISANIMET on yhä kohdedatan täydellisyyden
 * mitta (tests/fokusnimet.test.mjs, Raamattu: KLIKATTAVUUSLINJAN
 * VARTIO) — *"poltettu nimi ilman kohdetta vaatii velkakirjarivin"* —
 * ja se sääntö on riippumaton siitä, kuka nimen piirtää. Vain tämä
 * VAIENNUS poistuu, koska sen ehto ei enää päde.
 */

/** Onko kohteen nimi jo kartalla — laudan omana kaupunkina? */
function nimiJoKartalla(ui, kohde) {
  const paikka = kohde?.laudat?.[ui?.game?.pack?.id];
  if (!Number.isFinite(paikka?.x) || !Number.isFinite(paikka?.y)) return false;
  const lahella = (a) => Number.isFinite(a?.x) && Number.isFinite(a?.y)
    && Math.abs(a.x - paikka.x) <= KOHDE_SAMA_PISTE
    && Math.abs(a.y - paikka.y) <= KOHDE_SAMA_PISTE;
  /*
   * LAUDAN OMA KAUPUNKI ON YHÄ NIMETTY, ja sen nimen latoo nimikerros
   * (js/karttanimet.js) — kaksoisnimi olisi todellinen. Ehto on siis
   * sama kuin ennen, mutta vain toinen puolisko siitä.
   */
  return (ui?.game?.pack?.cities ?? []).some(lahella);
}

/* ====== SAMA NIMI VAIN KERRAN KARTALLE — MYÖS MAASTONIMET ==========
 *
 * Omistajan kaappaus Sofiasta 30.8.2026: laatassa luki *Balkanvuoret*
 * ja sen päällä tämän kerroksen kohdemerkki *Balkanvuoret* — sama nimi
 * kahdesti, eri kirjasimella.
 *
 * JUURISYY on sama kuin laatoilla itsellään: kohdeaineisto
 * (js/packs/fokuskohteet-*.js) ja maastonimet
 * (js/packs/maailmankartta-nimet.js) ovat eri lähteitä, eikä kumpikaan
 * tiedä toisesta. Osa kohteista ON vuori tai järvi, jolla on jo nimi
 * laatassa — laattoihin poltetaan samat 52 vuorta ja 38 järveä samasta
 * tiedostosta (tools/fokuskartta/sisalto.mjs).
 *
 * SÄÄNTÖ ON SAMA KUIN LAATOILLA (sisalto.mjs `parita`,
 * docs/moduulit/laattapyramidi.md luku 6c.1): pari on SAMA
 * NORMALISOITU NIMI LÄHEKKÄIN. Normalisointi tarvitaan, koska
 * kirjoitusasut eroavat listojen välillä; etäisyysraja tarvitaan,
 * koska eri maanosassa oleva samanniminen paikka on eri kohde.
 * Vakiot ovat samat luvut samasta mittauksesta.
 *
 * MERKKI JÄÄ, VAIN NIMIÖ VÄISTYY. Kolmio kertoo mistä on kyse ja on yhä
 * napautettava (kortti, aihevalo); nimen sanoo laatta.
 */

/*
 * NORMALISOINTI JA ETÄISYYSRAJA TULEVAT NIMIKERROKSELTA, EI KOPIOINA.
 *
 * Sääntö on sama kuin siellä (js/karttanimet.js): sama normalisoitu
 * nimi lähekkäin on sama kohde. Kaksi kopiota samasta luvusta ajautuu
 * ennen pitkää eri arvoihin, ja silloin kohdenimiö väistäisi eri
 * joukkoa kuin nimikerros latoo — juuri se kaksoisnimi, jota tämä
 * lohko estää.
 */

/**
 * Onko samanniminen maastonimi poltettu laattaan tähän kohtaan?
 *
 * Joen ankkuri on uoman kiinteä keskikohta — sama piste, jonka
 * laattojen ladonta ja entinen elävä kerros (js/mapart.js
 * drawMaastonimet) valitsivat.
 */
function maastonimiLahella(ui, kohde, paikka) {
  if (ui?.game?.pack?.id !== 'maailmankartta') return false;
  const nimi = normalisoiNimi(kohde?.nimi);
  if (!nimi) return false;
  const osuu = (x, y) => {
    let dx = Math.abs(x - paikka.x);
    if (dx > LAUDAN_YMPARYS / 2) dx = LAUDAN_YMPARYS - dx;
    return Math.hypot(dx, y - paikka.y) <= PARIN_ETAISYYS;
  };
  for (const laji of ['vuoret', 'jarvet']) {
    for (const m of MAAILMANKARTAN_NIMET[laji] ?? []) {
      if (normalisoiNimi(m.nimi) === nimi && osuu(m.x, m.y)) return true;
    }
  }
  for (const joki of MAAILMANKARTAN_NIMET.joet ?? []) {
    if (normalisoiNimi(joki.nimi) !== nimi) continue;
    const pisteet = joki.pisteet ?? [];
    if (pisteet.length < 2) continue;
    const keski = pisteet[Math.floor(pisteet.length / 2)];
    if (osuu(keski[0], keski[1])) return true;
  }
  return false;
}

function kohteenNimio(ui, kohde) {
  const paikka = kohde?.laudat?.[ui?.game?.pack?.id];
  if (Number.isFinite(paikka?.x) && Number.isFinite(paikka?.y)
    && maastonimiLahella(ui, kohde, paikka)) return false;
  if (kohde?.tyyppi !== 'kaupunki') return true;
  return !nimiJoKartalla(ui, kohde);
}

/* ============ KARTTANIMI EI OLE AINA KORTIN NIMI (v1224) ===========
 *
 * Omistajan havainto Bulgarian lehdeltä 27.8.2026: nimiössä luki
 * *"Bulgarialainen."* — sanoja, jotka eivät ole minkään paikan nimi.
 *
 * Nimiö ei mahduta kartalle kahdeksaatoista merkkiä pidempää nimeä
 * (js/fokusnosto-symbolit.js NOSTOSYM_NIMIO_MERKKEJA), ja lyhennys jättää
 * jäljelle kokonaisia sanoja ja lyhennyspisteen, kuten 1800-luvun
 * atlaksissa. Se on hyvä sääntö silloin, kun nimen ENSIMMÄINEN sana on
 * itsessään nimi ("Halikarnassoksen." kertoo Halikarnassoksesta), mutta
 * se hajoaa heti, kun alkusana on määrite: "Bulgarialainen jogurtti"
 * kutistuu määritteeksi ilman pääsanaa, eikä sitä voi lukea lyhennykseksi
 * vaan virheeksi.
 *
 * MORFOLOGIAA EI YRITETÄ ARVATA. Suomen genetiivin ja adjektiivin ero
 * ei ratkea säännöllä, jonka voisi luottaa kirjoittavan kartalle oikein
 * joka maassa. Ratkaisu on siksi DATASSA: kohde saa halutessaan
 * `nimio`-kentän, joka on sen nimi KARTALLA. Kortin otsikko, hakusanat ja
 * puhe käyttävät yhä koko nimeä — vain kartta saa lyhyen asun.
 *
 * KENTTÄ ON PAKOLLINEN AINA, KUN NIMI EI MAHDU. tests/fokusnimet.test.mjs
 * käy läpi jokaisen maan jokaisen kohteen ja vaatii, että karttanimi
 * mahtuu nimiöön sellaisenaan — eli ettei yhdenkään kohteen nimiö pääty
 * lyhennyspisteeseen. Uuden maan kirjoittaja saa virheen heti eikä vasta
 * pelitestissä.
 */
function kohteenKarttanimi(kohde) {
  return kohde?.nimio ?? kohde?.nimi;
}

/* ============ POLTETTU KAUPUNGINNIMI ON MYÖS NAPAUTETTAVA =========
 *
 * Omistaja v1217: Thessaloníkin kortin sai auki vain pikkuruisesta
 * porttitornista, vaikka kartalla iso kohde on kaupungin NIMI. Nimi on
 * poltettu lehden kuvaan eikä siitä ole solmua, joten peli laskee sen
 * laatikon itse ja panee siihen näkymättömän osuma-alueen.
 *
 * MITAT OVAT LEHDEN OMAT, EI ARVAUS. Luvut ovat suoraan
 * tools/fokuskartta/piirto.js:n kohdasta 8f (kaupungin nimi:
 * `koko: 13.5`, `vali: 0.5`, siirto `dx`/`dy`, ankkuri `ank`), ja
 * yksikkö on prototyyppipikseli — sama kuin piirto.js:n `S`. Yksi
 * prototyyppipikseli on lehden rajauksen leveys jaettuna 1600:lla,
 * joten laudan yksiköihin päästään kertomalla sillä. Leveys mitataan
 * canvasilla samalla kirjasimella kuin kuvaan ladottiin — sama tapa
 * kuin nimiöillä (js/fokusnosto-symbolit.js nostosymNimioLaatikko).
 *
 * LIKIARVO RIITTÄÄ. Laatikko on suorakaide nimen ympärillä pienellä
 * marginaalilla; kirjainten alapidennykset ja halon pyöristys jäävät
 * sen sisään. Tarkempi mittaus vaatisi kuvan lukemista pikseleittäin.
 *
 * KIRJASIMEN KOKO TULEE RIVILTÄ (v1224). Kuratoitu lehti latoo
 * kaupunginnimet aina koolla 13,5 (piirto.js 8f), mutta yleisen reitin
 * lehti valitsee kahdesta Natural Earthin SCALERANKin mukaan: 14 tai
 * 12,5 (piirto.js 8g). Rivin `koko` kertoo kumpi — ilman sitä laatikko
 * olisi joka toisella nimellä kahdeksan prosenttia väärän levyinen.
 * Puuttuva kenttä tarkoittaa kuratoitua 13,5:tä.
 */
const KOHDE_POLTETTU_PROTO = 1600;
const KOHDE_POLTETTU_KOKO = 13.5;
const KOHDE_POLTETTU_VALI = 0.5;
const KOHDE_POLTETTU_FONTTI = '"Liberation Serif", serif';
/** Marginaali laatikon joka reunaan, prototyyppipikseleitä. */
const KOHDE_POLTETTU_VARA = 3;
/** Puolikas rivikorkeus: perusviiva on keskellä (piirto.js textBaseline). */
const KOHDE_POLTETTU_PUOLIKAS = 0.62;

let KOHDE_NIMIMITTA = null;
const KOHDE_NIMILEVEYDET = new Map();

/**
 * Poltetun nimen leveys prototyyppipikseleinä annetulla kirjasinkoolla.
 *
 * Mitta otetaan MONINKERTAISENA ja jaetaan takaisin, koska 13,5
 * pikselin kirjasin pyöristyy canvasilla karkeasti — sama kikka ja
 * sama syy kuin nimiöiden mittauksessa. Välimuistin avaimessa on koko
 * mukana: sama nimi eri koolla on eri levyinen.
 */
function poltetunNimenLeveys(nimi, koko) {
  if (typeof document === 'undefined') return 0;
  const avain = `${koko}|${nimi}`;
  let leveys = KOHDE_NIMILEVEYDET.get(avain);
  if (leveys === undefined) {
    const kerroin = 8;
    KOHDE_NIMIMITTA ??= document.createElement('canvas').getContext('2d');
    KOHDE_NIMIMITTA.font = `${koko * kerroin}px ${KOHDE_POLTETTU_FONTTI}`;
    const merkit = [...nimi];
    leveys = merkit.reduce((s, m) => s + KOHDE_NIMIMITTA.measureText(m).width, 0) / kerroin
      + KOHDE_POLTETTU_VALI * Math.max(0, merkit.length - 1);
    KOHDE_NIMILEVEYDET.set(avain, leveys);
  }
  return leveys;
}

/**
 * Poltetun kaupunginnimen laatikko KOHTEEN DATAPISTEESEEN nähden,
 * laudan yksiköinä — tai null, jos lehti ei ole polttanut tätä nimeä.
 *
 * Suhteellinen siksi, että merkki itse voi olla siirretty (erottelu tai
 * nippu) mutta poltettu nimi ei liiku minnekään: laatikko lasketaan
 * datapisteestä ja asemoidaan ryhmän omaan mittaan vasta piirrossa
 * (asetaKohdeMittakaava).
 */
function kaupunginNimiLaatikko(ui, kohde) {
  const paikka = kohde?.laudat?.[ui?.game?.pack?.id];
  if (!Number.isFinite(paikka?.x) || !Number.isFinite(paikka?.y)) return null;
  const rajaus = ui?.fokusPohjaRajaus;
  if (!(rajaus?.w > 0)) return null;
  const poltettu = poltetutKaupungit(ui).find((a) => Number.isFinite(a?.x)
    && Math.abs(a.x - paikka.x) <= KOHDE_SAMA_PISTE
    && Math.abs(a.y - paikka.y) <= KOHDE_SAMA_PISTE);
  if (!poltettu?.nimi) return null;
  const proto = rajaus.w / KOHDE_POLTETTU_PROTO;
  const koko = poltettu.koko ?? KOHDE_POLTETTU_KOKO;
  const leveys = poltetunNimenLeveys(poltettu.nimi, koko);
  if (!(leveys > 0)) return null;
  const ax = poltettu.x + (poltettu.dx ?? 9) * proto;
  const ay = poltettu.y + (poltettu.dy ?? 0) * proto;
  const alku = poltettu.ank === 'end' ? ax - leveys * proto : ax;
  const vara = KOHDE_POLTETTU_VARA * proto;
  const puolikas = koko * KOHDE_POLTETTU_PUOLIKAS * proto;
  return {
    x1: alku - vara - paikka.x,
    x2: alku + leveys * proto + vara - paikka.x,
    y1: ay - puolikas - vara - paikka.y,
    y2: ay + puolikas + vara - paikka.y,
  };
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
/*
 * LUKU EI MUUTTUNUT VIIVAMERKKIIN SIIRRYTTÄESSÄ (27.8.2026 ilta),
 * MUTTA SEN MERKITYS TARKENTUI. Kirjasto
 * piirtää kartalle nyt VIIVAMERKIN, jonka ruutu on 13 yksikköä
 * (NOSTOSYM_MINI_R * 2) eikä webp-glyyfin 20,8 — merkki kutistui siis
 * tällä samalla kertoimella noin 11 pikselistä 6,8:aan, eli poltetun
 * vuorikolmion mittaan (13 prototyyppipikseliä). Kerroin on yhä sama,
 * jotta lähisukuiset mitat (nimiön koko, väistön varat, nipun välit)
 * pysyvät keskenään samassa suhteessa.
 */
/*
 * VIETY ULOS 31.8.2026: laattageneraattori tarvitsee saman kertoimen
 * (tools/fokuskartta/nostot.mjs), koska poltettu merkki on täsmälleen
 * sen kokoinen kuin elävä.
 */
export const KOHDE_SYMBOLI_SKAALA = 11 / 21;

/**
 * Symbolin säde kohdemerkin mitassa. Kirjaston karttamerkki on
 * NOSTOSYM_MINI_R:n levyinen, ja kaikki merkkien väleistä ja
 * väistöistä laskettu nojaa tähän lukuun — kun merkki pieneni,
 * pienenivät myös erottelusiirto ja nimiön törmäysvara sen mukana.
 */
const KOHDE_SYMBOLI_R = NOSTOSYM_MINI_R * KOHDE_SYMBOLI_SKAALA;

/**
 * MERKIN LADONTATIEDOT — se, mitä ladonta merkistä tarvitsee.
 *
 * Yksi lähde pelille ja laattageneraattorille (js/nostoladonta.js):
 * symboli, kartan nimi ja nimiön katko ovat ladonnan syötettä, ja jos
 * niistä olisi kaksi versiota, poltettu merkki ja selaimen osumamuoto
 * eriytyisivät ensimmäisessä hienosäädössä (Raamattu, KARTTANOSTOT
 * POLTETAAN LAATTOIHIN).
 *
 * `nimi` puuttuu, kun merkki ei saa nimiötä lainkaan — nimi on jo
 * kartalla (kohteenNimio: lehden poltettu kaupunginnimi, pelin laatta
 * tai laattaan poltettu maastonimi).
 */
export function kohdeMerkinLadonta(ui, kohde) {
  const symboli = kohteenSymboli(kohde);
  const ulos = { symboli, laji: kohde?.tyyppi };
  if (!symboli || !kohteenNimio(ui, kohde)) return ulos;
  // Kartan nimi, ei kortin (kohteenKarttanimi): väistöpassi mittaa
  // samaa tekstiä, joka merkin perään ladotaan.
  ulos.nimi = kohteenKarttanimi(kohde);
  /*
   * NIMIÖN KATTO ON KARTAN OMA 18 MERKKIÄ, EIKÄ POIKKEUKSIA OLE
   * (31.8.2026). Ainoa poikkeus oli yhdistetyn merkin pilkkulista, joka
   * oli jo ladottu omaan mittaansa ja sanoi kirjastolle "älä koske";
   * yhdistely purettiin, joten jokainen nimiö kulkee saman lyhennyksen
   * läpi (js/fokusnosto-symbolit.js nostosymLyhennaNimio). Kenttä jää
   * ladontatietueeseen, koska sekä piirto että väistön laatikkomitta
   * lukevat sen — yksi luku kumpaankin, tai teksteistä tulisi kaksi.
   */
  ulos.nimioKatto = undefined;
  return ulos;
}

/**
 * Yksi merkki: näkymätön osuma-alue, kategorian symboli ja sen perään
 * ladottu nimiö — tai pistekohteilla vaalea kehä, musteympyrä ja piste.
 * Korostusrengas on valmiina paikallaan läpinäkyvänä — auki oleva kohde
 * saa sen näkyviin luokalla eikä uudella elementillä.
 *
 * NIMIÖ ON VAIN SYMBOLIMERKEILLÄ (27.8.2026, läpinäkyvä mustetyyli).
 * Pistekohteet ovat kartan yleismerkkejä ilman kategoriaa, ja niiden
 * musteympyrä on tarkoituksella mykkä: nimiö tekisi jokaisesta
 * pisteestä nimilapun ja veisi merkiltä sen "tässä on jotain" -luonteen.
 */

/* ============ LÄHIN VOITTAA (v1218) ==============================
 *
 * Omistaja v1217: *"Parnassósta ei voi klikata — napautus vuoren
 * päältä avaa aina Delfoin."* Osuma-alue on SORMEN mitta
 * (KOHDE_OSUMA_R = 22, eli 44 px lehden perustasolla) eikä merkin,
 * joten naapurikohteiden alueet menevät väistämättä päällekkäin —
 * Delfoi on Parnassóksen rinteellä viiden lautayksikön päässä. Selain
 * antoi napautuksen sille, joka oli piirtojärjestyksessä päällimmäisenä
 * eli DATASSA MYÖHEMMÄLLE, ja alla oleva merkki oli kuollut.
 *
 * Sääntö on nyt: napautuksen saa se kohde, jonka OSUMAMUODON KESKIPISTE
 * on lähinnä napautuskohtaa. Symbolin päältä napautettaessa se on aina
 * symboli itse. Tasatilanteessa voittaa datassa ensimmäinen — sama
 * deterministinen järjestys kuin nimiöväistössä.
 *
 * Muotoja voi olla kohteella kaksi: sormen ympyrä ja kaupungin
 * poltetun nimen suorakaide. Kumpikin kilpailee omalla keskipisteellään,
 * jolloin nimen keskeltä napautettu nimi voittaa lähelläkin olevan
 * toisen merkin ympyrän.
 *
 * KAUPUNGIN LAATTA ON MUKANA SAMASSA RATKONNASSA (omistajan päätös
 * 28.8.2026, ks. js/fokusniput.js sääntö 9): kilpailijoita ei ole enää
 * kaksi lajia vaan yksi mitta. Ks. merkkiNapautuksenVoittaja alla.
 *
 * ELÄINTÄKYMERKKI ON KOLMAS KILPAILIJA (QA-ajo 1.9.2026, 168
 * napautusta): eläinkerros (js/elaintaky.js .elaintaky-merkki) piirtyy
 * kohdekerroksen PÄÄLLE, joten selain antoi limittäisen napautuksen
 * aina eläimelle — täsmälleen sama vika kuin v1217:n Parnassóksella,
 * vain kerrosten välillä. QA:n kolme tapausta: Bulgarian
 * skandaali-veda-slovena (23,73E/41,57N) avasi pelastuskarhun
 * (23,6/41,6), Turkin vanin-kissa avasi Vanin kissan eläintäyn ja
 * Bosnian syvennys-sarajevo-villihevoset (17,06/43,90) avasi
 * villihevosvarsan (17,05/43,83). Nyt kummankin kerroksen merkit
 * mitataan samalla mittatikulla ja voitto käy KUMPAANKIN suuntaan:
 * eläinmerkki voittaa kohdemerkin silloin kun se on lähempänä.
 * Ks. lahinElaintaky ja merkkiNapautuksenVoittaja alla.
 *
 * @returns {{kohde: ?object, etaisyys: number}} lähin kohde ja sen
 *   keskipisteen etäisyys napautuksesta ruudun pikseleinä (Infinity,
 *   kun napautus ei osu yhteenkään kohteeseen).
 */
function lahinKohde(ui, tapahtuma) {
  const x = tapahtuma?.clientX;
  const y = tapahtuma?.clientY;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return { kohde: null, etaisyys: Infinity };
  let paras = null;
  let lyhin = Infinity;
  // DOM-järjestys on datajärjestys: ensimmäinen voittaa tasatilanteen.
  for (const g of ui.fokuskohdeKerros?.querySelectorAll('.fokuskohde') ?? []) {
    const kohde = ui.fokuskohdeTiedot?.get(g.dataset.kohde);
    if (!kohde) continue;
    for (const muoto of g.querySelectorAll('.fokuskohde-osuma')) {
      const r = muoto.getBoundingClientRect();
      if (!(r.width > 0) || !(r.height > 0)) continue;
      if (x < r.left || x > r.right || y < r.top || y > r.bottom) continue;
      const etaisyys = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
      // Ympyrän laatikko on sen neliö: nurkat eivät kuulu alueeseen.
      if (muoto.tagName === 'circle' && etaisyys > r.width / 2) continue;
      if (etaisyys < lyhin) { lyhin = etaisyys; paras = kohde; }
    }
  }
  return { kohde: paras, etaisyys: lyhin };
}

/**
 * LÄHIN ELÄINTÄKYMERKKI — sama mitta, toinen kerros (QA 1.9.2026).
 *
 * Eläintäkymerkit (js/elaintaky.js) ovat kartan omassa kerroksessaan
 * eivätkä kohdekerroksessa, mutta niiden osuma-alue on sama sormen
 * ympyrä (ELAINTAKY_OSUMA_R = 22) ja ne asettuvat kohdemerkkien
 * sekaan. Ilman tätä hakua ne eivät kilpailleet lainkaan, vaan veivät
 * napautuksen piirtojärjestyksellä — sillä samalla tavalla, jonka
 * v1218 poisti kohdemerkkien väliltä.
 *
 * MITTA LUETAAN DOMISTA EIKÄ MODUULISTA. Eläinkerros tuo tämän
 * moduulin (avaaKohdeSuurennos), joten tuonti toisin päin olisi kehä;
 * kerroksen solmut riittävät, kun voiton täytäntöönpano jää sen omalle
 * avaajalle (ui.avaaElaintakyMerkki). ILMAN AVAAJAA EI KILPAILLA:
 * merkkiä, jota ei voisi avata, ei saa päästää voittamaan.
 *
 * Piilossa oleva kerros (elaintakyt-piilossa) on `display: none`,
 * jolloin ruutulaatikot ovat nollan kokoisia eikä yksikään merkki
 * mittaa — sama vaikutus kuin selaimen osumatestissä. Eleen ajaksi
 * mitään ei enää piiloteta (js/kartta.js asennaPanorointi).
 *
 * @returns {{merkki: ?Element, etaisyys: number}}
 */
function lahinElaintaky(ui, tapahtuma) {
  const tyhja = { merkki: null, etaisyys: Infinity };
  const x = tapahtuma?.clientX;
  const y = tapahtuma?.clientY;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return tyhja;
  if (typeof ui?.avaaElaintakyMerkki !== 'function') return tyhja;
  const kerros = ui.elaintakyKerros;
  if (!kerros?.isConnected) return tyhja;
  let paras = null;
  let lyhin = Infinity;
  for (const muoto of kerros.querySelectorAll('.elaintaky-osuma')) {
    const r = muoto.getBoundingClientRect();
    if (!(r.width > 0) || !(r.height > 0)) continue;
    if (x < r.left || x > r.right || y < r.top || y > r.bottom) continue;
    const etaisyys = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
    // Ympyrän laatikko on sen neliö: nurkat eivät kuulu alueeseen.
    if (etaisyys > r.width / 2) continue;
    if (etaisyys < lyhin) { lyhin = etaisyys; paras = muoto.closest('.elaintaky-merkki'); }
  }
  return { merkki: paras, etaisyys: lyhin };
}

/**
 * Merkin OMAN osumamuodon keskipisteen etäisyys napautuksesta.
 *
 * Varapolku sille pikselin murto-osan levyiselle reunakaistalle, jossa
 * selaimen osumatesti hyväksyy napautuksen mutta tämän moduulin
 * ruutulaatikkomatematiikka hylkää sen (lahinKohde vertaa etäisyyttä
 * laatikon puolikkaaseen). Ilman tätä kilpailu jäisi käymättä ja
 * kaupunki voittaisi kaistalla aina, vaikka merkki oli sormen alla.
 *
 * Valitsin on parametri, koska sama varapolku koskee eläintäkymerkkiä
 * (QA 1.9.2026): sen osumamuodolla on oma luokkansa, mutta mitta ja
 * syy ovat samat.
 */
function omanMerkinEtaisyys(g, tapahtuma, valitsin = '.fokuskohde-osuma') {
  const x = tapahtuma?.clientX;
  const y = tapahtuma?.clientY;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return Infinity;
  let lyhin = Infinity;
  for (const muoto of g?.querySelectorAll?.(valitsin) ?? []) {
    const r = muoto.getBoundingClientRect();
    if (!(r.width > 0) || !(r.height > 0)) continue;
    const etaisyys = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
    if (etaisyys < lyhin) lyhin = etaisyys;
  }
  return lyhin;
}

/**
 * NAPAUTUKSEN VOITTAJA: lähin kohde, eläintäky vai kaupungin laatta?
 *
 * Merkkikerrokset piirtyvät laattakerroksen päälle, joten selain antaa
 * limittäisen napautuksen aina merkille. Omistajan päätös 28.8.2026
 * (js/fokusniput.js sääntö 9) tekee tästä valinnan eikä sattumaa: kun
 * napautus osuu myös kaupungin osuma-alueelle ja laatan keskipiste on
 * lähempänä kuin yhdenkään merkin, työ luovutetaan laatalle. Juuri tämä
 * sallii nipun asettua kaupungin viereen (NIPPU_DX 48 -> 37).
 *
 * SAMA KOSKEE ELÄINTÄKYKERROSTA (QA 1.9.2026, ks. LÄHIN VOITTAA
 * yllä). Kumpi tahansa merkkikerros voi saada tapahtuman ensin, ja
 * kumpi tahansa voi voittaa — ratkaisu on aina lähin keskipiste.
 *
 * TASATILANTEESSA VOITTAA MERKKI (`<` eikä `<=`): merkki on laattaa
 * pienempi ja sitä hankalampi osua, ja kaupunki on tavoitettavissa myös
 * ilman merkkien kanssa kilpailua koko laatan alalta. Merkkien kesken
 * tasan menevän voittaa kohdemerkki (`<=`) — kartan pääkerros ensin,
 * jotta järjestys on deterministinen eikä kerrosten piirtojärjestyksen
 * varassa.
 *
 * VARAPOLKU ON SEN KERROKSEN, JOKA TAPAHTUMAN SAI. Reunakaistalla (ks.
 * omanMerkinEtaisyys) oma kerros mittaa itsensä, ja toinen kerros jää
 * Infinityyn — muuten napautus karkaisi naapurikerrokselle juuri siinä
 * kaistassa, jossa selain oli jo valinnut merkin.
 *
 * @param {?object} oma kohde, jonka kuuntelija tapahtuman sai — null,
 *   kun kysyjä on eläintäkykerros.
 * @param {Element} g   saman merkin ryhmä — varapolun mitta (ks.
 *   omanMerkinEtaisyys) ja se merkki, joka voittaa ilman napautuskohtaa
 *   (näppäimistön Enter).
 * @returns {{laji: string, kohde: ?object, merkki: ?Element}} voittaja:
 *   `kohde` (kohdemerkki), `elain` (eläintäkymerkki) tai `kaupunki`.
 */
function merkkiNapautuksenVoittaja(ui, tapahtuma, oma, g) {
  const osuma = lahinKohde(ui, tapahtuma);
  // Jos yksikään muoto ei mitannut, kilpailijaksi tulee se merkki, jonka
  // kuuntelija tapahtuman sai — ei Infinity, joka antaisi voiton
  // laatalle ilman kilpailua.
  const kohde = osuma.kohde ?? oma ?? null;
  let kohdeEtaisyys = Infinity;
  if (osuma.kohde) kohdeEtaisyys = osuma.etaisyys;
  else if (oma) kohdeEtaisyys = omanMerkinEtaisyys(g, tapahtuma);
  const elain = lahinElaintaky(ui, tapahtuma);
  const merkki = elain.merkki ?? (oma ? null : g ?? null);
  let elainEtaisyys = Infinity;
  if (elain.merkki) elainEtaisyys = elain.etaisyys;
  else if (!oma) elainEtaisyys = omanMerkinEtaisyys(g, tapahtuma, '.elaintaky-osuma');
  if (nippuLaatanEtaisyys(ui, tapahtuma) < Math.min(kohdeEtaisyys, elainEtaisyys)) {
    return { laji: 'kaupunki', kohde: null, merkki: null };
  }
  if (kohde && kohdeEtaisyys <= elainEtaisyys) return { laji: 'kohde', kohde, merkki: null };
  if (merkki) return { laji: 'elain', kohde: null, merkki };
  return { laji: 'kohde', kohde, merkki: null };
}

/**
 * Kohdemerkin napautuksen työ: auki, tai kiinni jos se oli jo auki.
 * Yhdessä paikassa, koska sen tekee myös eläinkerrokselta luovutettu
 * napautus (QA 1.9.2026).
 */
function avaaTaiSuljeKohde(ui, kohde) {
  if (!kohde) return;
  if (ui.fokuskohdeAuki?.id === kohde.id) suljeFokuskohde(ui);
  else avaaFokuskohde(ui, kohde);
}

/**
 * ELÄINTÄKYMERKIN NAPAUTUS SAMAAN KILPAILUUN (QA 1.9.2026).
 *
 * Eläinkerros kysyy tätä ennen oman korttinsa avaamista — sama
 * sopimus kuin kaupungin laatalla (js/fokusniput.js sääntö 9), vain
 * kolmella kilpailijalla. Työ tehdään täällä, koska kilpailun tuntee
 * tämä moduuli; eläinkerros tarvitsee vain tiedon, jäikö sille mitään.
 *
 * @param {Element} g eläintäkymerkin ryhmä (.elaintaky-merkki).
 * @returns {boolean} true kun napautus kuului toiselle merkille tai
 *   kaupungille ja se on jo hoidettu; false kun kysyjä itse voitti.
 */
export function elainmerkinNapautusLuovutettu(ui, tapahtuma, g) {
  const voittaja = merkkiNapautuksenVoittaja(ui, tapahtuma, null, g);
  // Laatta voitti: napautus on kaupungin, myös silloin kun kaupunkia ei
  // juuri nyt voi avata (kiire, ei tutkittavaa) — sama kuin kohdemerkillä.
  if (voittaja.laji === 'kaupunki') { nippuAvaaKaupunki(ui); return true; }
  if (voittaja.laji === 'kohde') { avaaTaiSuljeKohde(ui, voittaja.kohde); return true; }
  // Eläinkerros voitti — mutta voittaja voi olla naapurimerkki.
  if (voittaja.merkki && voittaja.merkki !== g) {
    ui.avaaElaintakyMerkki?.(voittaja.merkki);
    return true;
  }
  return false;
}

function piirraKohdemerkki(ui, ryhma, kohde, tietue) {
  const g = el('g', { class: `fokuskohde fokuskohde-${kohde.tyyppi ?? 'muu'}` }, ryhma);
  g.dataset.kohde = kohde.id;
  g.setAttribute('role', 'button');
  g.setAttribute('tabindex', '0');
  g.setAttribute('aria-label', `${kohde.nimi}: avaa tietoruutu`);
  /*
   * SÄDE ELÄÄ MITTAKAAVAPASSISSA (asetaKohdeMittakaava): kun merkin
   * näkyvä koko on katettu lehden omiin mittoihin, osuma-ympyrä
   * kasvatetaan takaisin sormen mittaan. Tässä kirjoitetaan lähtöarvo,
   * jotta merkillä on osuma-alue jo ennen ensimmäistä passia.
   */
  tietue.osuma = el('circle', { class: 'fokuskohde-osuma', r: KOHDE_OSUMA_R }, g);
  /*
   * TOINEN OSUMA-ALUE POLTETULLE NIMELLE (v1218). Kaupungin nimi on
   * kartan iso kohde, ja se on kuvassa eikä solmuna — laatikko tulee
   * datasta (kaupunginNimiLaatikko) ja asemoidaan mittakaavapassissa,
   * koska sen paikka on merkin OMASTA siirrosta riippumaton.
   */
  const nimiLaatikko = kaupunginNimiLaatikko(ui, kohde);
  if (nimiLaatikko) {
    tietue.nimiLaatikko = nimiLaatikko;
    tietue.nimiOsuma = el('rect', { class: 'fokuskohde-osuma fokuskohde-nimiosuma' }, g);
  }
  el('circle', { class: 'fokuskohde-korostus', r: KOHDE_KOROSTUS_R }, g);
  const symboli = kohteenSymboli(kohde);
  /*
   * AIHEVALO MERKIN ALLE (js/karttavalot.js). Valo on aina piirretty ja
   * oletuksena `display: none`; selitevalikon väripallo kytkee sen
   * bodyn luokalla, joten kerroksen uudelleenrakennus ei voi hukata
   * valotilaa eikä valoista tule kehyskohtaista työtä.
   *
   * MERKKI ANTAA OMAN SYMBOLINSA, ei valikon riviä: ryhmittely
   * kahdeksaan aiheeseen tehdään yhdessä paikassa
   * (js/fokusnosto-symbolit.js NOSTOSYM_PAAKATEGORIAT). SYMBOLITON
   * KOHDE EI SAA VALOA — kartalla se on musteympyrä eikä
   * kategoriamerkki (alempi haara), eikä sillä siis ole aihetta, jonka
   * selite sen nimeäisi.
   *
   * KOKO ON MERKIN KOKO. Kirjaston symboli kutistetaan kohdemerkillä
   * KOHDE_SYMBOLI_SKAALAlla, joten sama kutistus koskee valoa: ilman
   * sitä sama täplä olisi eläintäyn alla täplä ja tässä lautanen.
   */
  piirraKarttavalo(g, symboli, kohde.id, KOHDE_VALO_KOKO);
  /*
   * LADONTATIEDOT KERRAN (kohteenNimio käy maastonimet läpi, eikä sitä
   * kannata tehdä kahdesti merkkiä kohti) JA AINA TIETUEESEEN: symboli
   * ja laji ovat tiivisteen syötettä (merkitsePoltetutNostot), joten ne
   * on kirjattava myös nimiöttömälle merkille. Muuten pelin laskema
   * tiiviste eroaisi laattageneraattorin omasta, ja jokainen nimiötön
   * merkki piirtyisi kahdesti.
   */
  const ladonta = kohdeMerkinLadonta(ui, kohde);
  Object.assign(tietue, ladonta);
  /*
   * KOLMAS OSUMA-ALUE: NOSTON TEKSTI KOKONAAN (omistaja 1.9.2026 ilta:
   * "Saisiko karttanostoissa myös tekstit kokonaisuudessa
   * klikattaviksi? Nyt vain osa tekstistä on klikattavissa"). Sormen
   * ympyrä kattoi nimiöstä vain alun; loppu oli kuollutta paperia.
   * Suorakaide asettuu väistöpassin valitsemaan nimiölaatikkoon
   * (asetaTekstiOsumat) — samaan, johon nimiö rasterissa ladotaan tai
   * laattaan poltettiin — ja kilpailee napautuksesta keskipisteellään
   * kuten muutkin osumamuodot (lahinKohde). Nimikerroksen latomat
   * elävät nimet hoitaa kerros itse (js/karttanimet.js data-kohde).
   */
  if (ladonta.nimi) {
    tietue.tekstiOsuma = el('rect', {
      class: 'fokuskohde-osuma fokuskohde-tekstiosuma', width: 0, height: 0,
    }, g);
  }
  if (symboli) {
    /*
     * Alaryhmä kutistaa kirjaston merkin kohdemerkin mittaan; symbolin
     * omat luokat (nostosym-*) tyylittyvät css/styles.css:stä, joka on
     * aina ladattu — merkki ei siis odota fokusnosto.css:ää.
     *
     * MERKKI JA NIMIÖ TULEVAT YHTENÄ RASTERINA (omistajan lisätilaus
     * 27.8.2026, js/fokusnosto-symbolit.js piirraNostosymKartalle):
     * panoroinnissa selain siirtää valmista bittikarttaa eikä lado
     * halollista tekstiä uudestaan joka kehyksellä. Rasteri saa oman
     * ryhmänsä, koska varapolku (ei kuvaa, tai kuva ei lataudu)
     * tyhjentää sen ja piirtää tilalle elävän merkin ja tekstin.
     */
    const sisus = el('g', {
      class: 'fokuskohde-symboli',
      transform: `scale(${KOHDE_SYMBOLI_SKAALA.toFixed(4)})`,
    }, g);
    const glyyfi = el('g', { class: 'fokuskohde-glyyfi' }, sisus);
    if (ladonta.nimi) {
      /*
       * NIMIÖN TILA ON VÄISTÖPASSIN PÄÄTÖS (paivitaKohdeNimiot), joka
       * ajetaan heti tämän rakennuksen perään. Ensipiirto käyttää
       * EDELLISEN passin päätöstä arvauksena: kun merkit rakennetaan
       * uusiksi pelkän rasteriportaan takia, geometria ei ole muuttunut
       * eikä ahtaaseen ryppääseen synny turhaa nimiöllistä rasteria.
       */
      tietue.glyyfi = glyyfi;
      tietue.nimioNakyy = !ui.fokuskohdePiiloNimiot?.has(kohde.id);
      // Sama arvaus koskee myös nimiön PUOLTA (v1218): ahtaassa
      // paikassa väistö on saattanut siirtää nimiön toiselle kyljelle, ja
      // ilman muistia ensipiirto latoisi sen hetkeksi väärin päin.
      tietue.nimioPuoli = ui.fokuskohdeNimioPuolet?.get(kohde.id) ?? 'oikea';
    }
    /*
     * TYYPPI KULKEE MERKILLE MUKANA (27.8.2026 ilta). Kirjasto tarvitsee sen
     * kahteen asiaan: luontokategorian merkki on merelle aaltoviiva ja
     * vuorelle poltettu kolmio, ja meren nimiö ladotaan harvennettuna
     * kapiteelina kuten lehteen poltettu EGEANMERI.
     */
    piirraNostosymKartalle(glyyfi, symboli,
      tietue.nimioNakyy ? kohteenKarttanimi(kohde) : '',
      kohde.tyyppi, tietue.nimioPuoli, tietue.nimioKatto);
  } else {
    el('circle', { class: 'fokuskohde-halo', r: KOHDE_HALO_R }, g);
    el('circle', { class: 'fokuskohde-rengas', r: KOHDE_RENGAS_R }, g);
    el('circle', { class: 'fokuskohde-piste', r: KOHDE_PISTE_R }, g);
  }
  const avaa = (tapahtuma) => {
    tapahtuma.stopPropagation();
    tapahtuma.preventDefault();
    // Osuma-alueet limittyvät (KOHDE_OSUMA_R on sormen mitta, ei
    // merkin): voittajan valitsee etäisyys eikä piirtojärjestys.
    // Kaupungin laatta (omistaja 28.8.2026, js/fokusniput.js sääntö 9)
    // ja eläintäkymerkki (QA 1.9.2026) ovat samassa kilpailussa.
    const voittaja = merkkiNapautuksenVoittaja(ui, tapahtuma, kohde, g);
    if (voittaja.laji === 'kaupunki') { nippuAvaaKaupunki(ui); return; }
    if (voittaja.laji === 'elain') { ui.avaaElaintakyMerkki?.(voittaja.merkki); return; }
    avaaTaiSuljeKohde(ui, voittaja.kohde);
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
/*
 * LEVEIN MERKKI ON NYT PISTEKOHTEEN HALO (27.8.2026 ilta). Kun symbolimerkki
 * kutistui poltetun vuorikolmion mittaan (KOHDE_SYMBOLI_R), se ei ole
 * enää kartan levein merkintä — kategoriaton pistekohde on. Erottelun
 * on käytettävä sitä isompaa, tai symbolin ja pisteen pari jäisi
 * ruudulla limittäin vaikka luku sanoisi muuta.
 */
const KOHDE_ERO_MIN = 2 * Math.max(KOHDE_SYMBOLI_R, KOHDE_HALO_R);

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
 * ── PASSI AJETAAN KASAUKSEN JÄLKEEN, EI ENNEN (31.8.2026) ─────────
 *
 * Järjestys oli erottelu → kasaus → väistö, ja se oli väärin heti kun
 * rypäs alkoi latoutua kaupungin molemmin puolin (js/fokusniput.js
 * sääntö 2). Erottelu näki merkkien DATAPAIKAT, kasaus siirsi osan
 * niistä kaupungin kylkeen — ja siellä ne saattoivat laskeutua suoraan
 * jonkin kasauksen ULKOPUOLELLE jääneen merkin päälle. Mitattu Ateenassa:
 * Marathon (datassa 10 lautayksikköä kaupungista) jäi 1,7 yksikön päähän
 * ryppääseen ladotusta Akropoliista, kun symbolien pitäisi olla 5,9
 * yksikön päässä toisistaan; koko maailmassa liian lähelle jääneitä
 * pareja oli 33.
 *
 * KIINTEÄ JA VAPAA. Passi lukee nyt merkkien LOPULLISET paikat, ja
 * ryppääseen ladottu merkki on KIINTEÄ: se ei väisty, koska sen paikka
 * on ladonnan päätös eikä sattuma, ja väistyminen hajottaisi juuri sen
 * sarakkeen, joka kertoo merkin kuuluvan kaupunkiin. Vapaa merkki
 * väistää silloin yksin koko matkan. Kahden vapaan pari erkanee kuten
 * ennenkin puoliksi, ja kaksi kiinteää ei voi olla liian lähellä
 * toisiaan, koska sarakkeen riviväli on mitoitettu juuri tähän
 * (js/fokusniput.js NIPPU_VALI).
 *
 * TYÖ TEHDÄÄN VAIN KUN MITTA TAI ASETTELU MUUTTUI: vakioskaalalla
 * vastaus on sama niin kauan kuin lehti ja kasausasettelu pysyvät
 * (ui.fokuskohdeEroAvain; asettelun versio js/fokusniput.js
 * nippuAsettelunVersio).
 */
export function eritteleKohdeRyhmat(ui, s) {
  const ryhmat = ui.fokuskohdeRyhmat ?? [];
  if (!ryhmat.length) return;
  const avain = `${ui.fokuskohdeAvain}:${s.toFixed(4)}:${nippuAsettelunVersio()}`;
  if (ui.fokuskohdeEroAvain === avain) return;
  ui.fokuskohdeEroAvain = avain;
  const vahin = KOHDE_ERO_MIN * s;
  // Lähtöpaikka on merkin LOPULLINEN paikka: kasattu nippupaikka tai
  // datapaikka. Vanhat erottelusiirrot nollautuvat, koska ne lasketaan
  // tässä joka kerta uudestaan samasta lähtökohdasta.
  const kiinteat = ryhmat.map((r) => Boolean(r.nippu));
  const paikat = ryhmat.map((r) => ({ x: r.nippu?.x ?? r.x, y: r.nippu?.y ?? r.y }));
  for (let kierros = 0; kierros < KOHDE_ERO_KIERROKSIA; kierros += 1) {
    let liikkui = false;
    for (let i = 0; i < paikat.length; i += 1) {
      for (let j = i + 1; j < paikat.length; j += 1) {
        // Kaksi kiinteää ei väisty kumpikaan: ladonta on jo päättänyt.
        if (kiinteat[i] && kiinteat[j]) continue;
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
        /*
         * Vapaat puoliksi, mutta kiinteän parina vapaa siirtyy yksin
         * koko matkan — muuten pari jäisi puoliksi limittäin.
         */
        const vaje = vahin - etaisyys;
        const aOsuus = kiinteat[i] ? 0 : (kiinteat[j] ? 1 : 0.5);
        const bOsuus = kiinteat[j] ? 0 : (kiinteat[i] ? 1 : 0.5);
        const yx = dx / etaisyys;
        const yy = dy / etaisyys;
        a.x -= yx * vaje * aOsuus; a.y -= yy * vaje * aOsuus;
        b.x += yx * vaje * bOsuus; b.y += yy * vaje * bOsuus;
        liikkui = true;
      }
    }
    if (!liikkui) break;
  }
  for (let i = 0; i < ryhmat.length; i += 1) {
    /*
     * KIINTEÄN SIIRTO ON NOLLA, ja se kirjoitetaan silti: nippupaikka
     * ohittaa sen kaikkialla (`r.nippu?.x ?? r.x + r.sx`), mutta jos
     * merkki putoaa ryppäästä seuraavalla ajolla, vanha siirto ei saa
     * jäädä sen mukaan.
     */
    ryhmat[i].sx = kiinteat[i] ? 0 : paikat[i].x - ryhmat[i].x;
    ryhmat[i].sy = kiinteat[i] ? 0 : paikat[i].y - ryhmat[i].y;
  }
}

/* ============ POLTETTU MERKKI EI PIIRRY UUDESTAAN =================
 *
 * OMISTAJAN PÄÄTÖS 31.8.2026 (Raamattu, KARTTANOSTOT POLTETAAN
 * LAATTOIHIN): kohdemerkin symboli, nimiö ja nostoviiva ovat pysyvää
 * sisältöä ja kuuluvat laattoihin. Kun ne ovat siellä, tämä kerros ei
 * saa piirtää niitä toistamiseen — v1366:n kaksoisnimi oli täsmälleen
 * sama vika toisessa kerroksessa.
 *
 * MITÄ JÄÄ: näkymätön osumamuoto (poltettu merkki ei ota vastaan
 * kosketusta), aihevalo (js/karttavalot.js — se vilkkuu ja on siksi
 * pelitilaa) ja korostusrengas, joka syttyy vain auki olevalle
 * kortille. Merkki on siis yhä napautettava ja avaa korttinsa
 * täsmälleen kuten ennen.
 *
 * PÄÄTÖS ON LUETTELON, EI KOODIN (js/laattapyramidi.js
 * nostoOnPoltettu): laatat vaihtuvat eri aikaan kuin koodi, ja
 * kytkin koodissa jättäisi ikkunan, jossa nostot olisivat joko
 * kahdesti tai eivät kertaakaan. Oletus on "mitään ei ole poltettu",
 * eli epävarmuudessa merkki piirretään.
 *
 * TIIVISTE LASKETAAN TÄSSÄ SAMOISTA LUVUISTA kuin generaattorissa
 * (js/nostoladonta.js nostoladontaTiiviste): merkin lopullinen paikka,
 * symboli, laji, nimiöteksti ja ryhmän jäsenet. Jos jokin niistä on
 * muuttunut polton jälkeen, tiiviste eroaa luettelosta ja merkki
 * piirretään elävänä — laatassa oleva vanhentunut kuva jää sen alle,
 * ja seuraava poltto korjaa sen.
 */

/** Onko merkki poltettu laattaan? Yksi vastaus, kaksi kysyjää. */
function kohdeOnPoltettu(ui, r) {
  return nostoOnPoltettu(r.id, kohteenNostotiiviste(ui, r));
}

/** Merkin sisältötiiviste — sama laskenta kuin laattageneraattorissa. */
function kohteenNostotiiviste(ui, r) {
  return nostoladontaTiiviste({
    tunnus: r.id,
    symboli: r.symboli ?? null,
    laji: r.laji ?? null,
    nimio: r.nimi ?? '',
    x: (r.nippu?.x ?? r.x + (r.sx ?? 0)) - (r.kierto ?? 0),
    y: r.nippu?.y ?? r.y + (r.sy ?? 0),
    osat: (ui.fokuskohdeTiedot?.get(r.id)?.osat ?? []).map((osa) => osa.id),
  });
}

/**
 * MERKITSEE POLTETUT JA VAIENTAA NIIDEN PIIRRON.
 *
 * Ajetaan asemoinnin JÄLKEEN, koska tiivisteessä on merkin lopullinen
 * paikka: erottelusiirto ja kasauspassi ovat juuri ajaneet.
 *
 * Luokka tekee vaientamisen (css/fokuskohteet.css .fokuskohde-poltettu)
 * eikä solmujen purku: merkki voi palata eläväksi kesken istunnon, jos
 * luettelo saapuu myöhässä tai sisältö muuttuu, eikä kerrosta haluta
 * rakentaa uudestaan sen takia.
 */
function merkitsePoltetutNostot(ui) {
  for (const r of ui.fokuskohdeRyhmat ?? []) {
    const poltettu = kohdeOnPoltettu(ui, r);
    if (r.poltettu === poltettu) continue;
    r.poltettu = poltettu;
    r.g?.classList?.toggle('fokuskohde-poltettu', poltettu);
    /*
     * POLTETUN NIMIÖN RASTERI PURETAAN. Symboli ja nimiö ovat samassa
     * kuvassa (piirraNostosymKartalle), joten tyhjä ryhmä on ainoa tapa
     * saada kumpikin pois; CSS piilottaisi ne kyllä, mutta silloin
     * selain kantaisi turhaa rasteria jokaisesta poltetusta merkistä.
     */
    if (poltettu) r.glyyfi?.replaceChildren();
    else if (r.glyyfi) {
      piirraNostosymKartalle(r.glyyfi, r.symboli,
        r.nimioNakyy ? r.nimi : '', r.laji, r.nimioPuoli, r.nimioKatto);
    }
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
  /*
   * KAKSI MITTAA (omistaja 28.8.2026, ks. js/ui.js
   * fokusMerkkiSkaalaKartalle): merkin NÄKYVÄ koko on katettu lehden
   * omiin mittoihin, mutta sormen 44 px:n sääntö elää kattamattomassa
   * skaalassa. Ryhmä skaalataan katetulla arvolla, ja osuma-ympyrän säde
   * kerrotaan suhteella takaisin ylös — merkki pienenee, napautusala ei.
   */
  /*
   * LADONTA ON LEHDEN MITASSA, EI RUUDUN (omistaja 31.8.2026, Raamattu
   * KARTTANOSTOT POLTETAAN LAATTOIHIN). `fokusMerkkiSkaalaPohja` on
   * pelkästä lehden rajauksesta laskettu vakio (js/ui.js), joten sekä
   * merkin koko että KAIKKI kolme entistä ruudusta riippunutta mittaa
   * — erottelusiirto (KOHDE_ERO_MIN * s), nippuun pääsyn raja ja
   * sarakkeen ladonta (NIPPU_DX, riviväli, yhdysviivan alkupää) —
   * antavat nyt saman vastauksen puhelimella, työpöydällä ja
   * laattageneraattorin Nodessa. Ilman lehteä (muu lauta, pohjaton
   * maa) jäljelle jää entinen ruutumitta, koska siinä näkymässä ei ole
   * poltettavaakaan.
   */
  const s = ui.fokusMerkkiSkaalaPohja?.()
    || ui.fokusMerkkiSkaalaKartalle?.(suhde) || ui.fokusMerkkiSkaala?.(suhde);
  if (!(s > 0)) return;
  /*
   * PIIRTOMITTA ON KATOLLA, LADONTA EI (omistaja 1.9.2026: *"Tee max
   * sama koko kuin kohdekaupungin koko"* — js/nostoladonta.js
   * nostoladontaKattoPorras). Katto lasketaan merkin KIRJASTON mitassa,
   * koska nimiön kirjasinkoko on siinä yksikössä, ja jaetaan takaisin
   * ryhmän mittaan — sama kaava kuin laattageneraattorilla, vain
   * mittakaava on eri lähteestä (näkymän oma, ei tason).
   *
   * KATTAMATON `s` JÄÄ LADONNAKSI: kasaus, erottelusiirto ja
   * nimiöväistö on laskettava samalla luvulla kuin laattaan, tai
   * poltettu ja elävä merkki eivät olisi samassa pisteessä.
   */
  const nakyvaSkaala = ui.nakyvaAlue?.()?.skaala;
  const sPiirto = nostoladontaKattoPorras(KOHDE_SYMBOLI_SKAALA * s, nakyvaSkaala)
    / KOHDE_SYMBOLI_SKAALA;
  /*
   * KATTO ON SUHDE, JA SE KOSKEE KOKO PIIRROSTA (omistaja 2.9.2026:
   * *"symbolit heittelee muodoiltaa ja tekstejä puuttuu"*).
   *
   * Tähän asti katto kutisti VAIN merkin oman skaalan. Sarakkeen
   * siirtymä, siirtoviiva ja nimiön rako jäivät kattamattomaan
   * ladontamittaan eli karttavakioksi, joka kasvaa rajatta
   * lähennettäessä — mitattuna Sofiassa (skaala 9,24) merkki oli
   * 11,3 px, mutta sen sarakesiirtymä 86 px ja siirtoviivan leveys
   * 8,87 px. Merkki, sen nimi ja niiden välinen viiva olivat kolmessa
   * eri mittajärjestelmässä samassa kuvassa.
   *
   * Nyt sama luku kertoo koko piirroksen ankkurinsa ympäri; perustelu
   * ja mitat js/nostoladonta.js nostoladontaKattoSuhde.
   */
  const kattoSuhde = s > 0 ? sPiirto / s : 1;
  const sRuutu = ui.fokusMerkkiSkaala?.(suhde) ?? s;
  /*
   * OSUMASÄDE LASKETAAN PIIRTOMITASTA, EI LADONNASTA. Ympyrä on ryhmän
   * lapsi ja skaalautuu sen mukana, joten sormen 44 px säilyy vain jos
   * säde jaetaan sillä samalla luvulla, jolla ryhmä piirretään — katon
   * purressa ryhmä on pienempi ja säde siis suurempi. Sama sääntö kuin
   * typografiakatolla (js/ui.js fokusMerkkiOsumaKerroin).
   */
  const osumaR = KOHDE_OSUMA_R * (sRuutu > 0 && sPiirto > 0 ? sRuutu / sPiirto : 1);
  /*
   * OSUMAMUODOT TULEVAT SAMASTA LADONNASTA kuin merkki: sama passi
   * kirjoittaa ryhmän paikan, ja osuma-ympyrä on sen lapsi. Vain
   * SÄDE elää ruudun mitassa (sormen 44 px), ja se kerrotaan takaisin
   * ylös suhteella sRuutu/s — merkki on lehden kokoinen, napautusala
   * sormen kokoinen, paikka yksi ja sama.
   */
  /*
   * KASAUS ENSIN, EROTTELU SEN JÄLKEEN (31.8.2026 — ks.
   * eritteleKohdeRyhmat, "PASSI AJETAAN KASAUKSEN JÄLKEEN"). Erottelu
   * väistää ryppääseen ladottuja merkkejä eikä toisin päin, joten sen
   * on nähtävä kasauksen tulos.
   *
   * KASAUSPASSI KYSYY TÄLTÄ KERROKSELTA, ONKO MERKKI POLTETTU
   * (palautettu 1.9.2026 ilta siirtoviivojen mukana, omistajan tilaus
   * *"otetaan siirtoviivat takaisin karttanostoille (esim. ateena)"*):
   * se ei saa piirtää siirtoviivaa merkille, jonka viiva on jo
   * laatassa, eikä js/fokusniput.js tunne luetteloa. Kysymys esitetään
   * merkin lopullisesta paikasta, jonka passi itse juuri asettaa —
   * ryppääseen ladotun merkin erottelusiirto on nolla
   * (eritteleKohdeRyhmat), joten vastaus on sama ennen ja jälkeen
   * erottelun.
   */
  ui.nostoPoltettu = (r) => kohdeOnPoltettu(ui, r);
  niputaFokusmerkit(ui, s, s, kattoSuhde);
  eritteleKohdeRyhmat(ui, s);
  /*
   * POLTETUT VAIKENEVAT VASTA TÄSSÄ: tiiviste tuntee merkin lopullisen
   * paikan, jonka kaksi edellistä passia juuri asettivat.
   */
  merkitsePoltetutNostot(ui);
  const zoom = sPiirto.toFixed(4);
  for (const ryhma of ui.fokuskohdeRyhmat ?? []) {
    if (ryhma.osuma) maare(ryhma.osuma, 'r', osumaR.toFixed(2));
    /*
     * LADOTTU PAIKKA JA PIIRRETTY PAIKKA OVAT ERI ASIA (2.9.2026).
     *
     * LADOTTU (lx, ly) on se, mikä menee tiivisteeseen ja laattaan
     * (kohteenNostotiiviste) — kattamaton, tasoriippumaton, Raamatun
     * ehto. PIIRRETTY on sama paikka ANKKURINSA ympäri kutistettuna
     * ruutukaton suhteella: sarakkeen siirtymä on osa noston piirrosta
     * eikä kartan geometriaa, joten se ei saa kasvaa ohi merkin.
     *
     * ANKKURI on sarakkeessa kaupungin piste (nippu.cx/cy,
     * js/fokusniput.js) ja muualla merkin oma datapiste — se piste,
     * jonka ympäri merkki on siirretty. Erottelusiirto (sx, sy) on
     * samalla tavalla piirroksen siirtymä ja kutistuu samoin.
     */
    const lx = ryhma.nippu?.x ?? ryhma.x + (ryhma.sx ?? 0);
    const ly = ryhma.nippu?.y ?? ryhma.y + (ryhma.sy ?? 0);
    const ax = ryhma.nippu?.cx ?? ryhma.x;
    const ay = ryhma.nippu?.cy ?? ryhma.y;
    const px = ax + (lx - ax) * kattoSuhde;
    const py = ay + (ly - ay) * kattoSuhde;
    /* Nimikerros latoo nimet PIIRRETYN paikan viereen, ei ladotun. */
    ryhma.piirtoX = px;
    ryhma.piirtoY = py;
    maare(ryhma.g, 'transform', `translate(${px.toFixed(2)} ${py.toFixed(2)}) scale(${zoom})`);
    /*
     * POLTETUN NIMEN OSUMA-ALUE EI SEURAA MERKKIÄ. Laatikko on lehden
     * kuvassa datapisteen kohdalla, kun taas merkki on voitu siirtää
     * (erottelu tai nippu) — laatikko lasketaan siksi ryhmän omaan
     * mittaan datapisteestä käsin ja ryhmän NYKYISESTÄ paikasta.
     * Kiertävän laudan toinen kopio hoituu samalla, koska ryhma.x
     * kantaa jo laudan leveyden.
     */
    const laatikko = ryhma.nimiLaatikko;
    if (!laatikko || !ryhma.nimiOsuma) continue;
    const dx = ryhma.x - px;
    const dy = ryhma.y - py;
    // Laatikko on LAUDAN yksiköissä ja ryhmä piirretään sPiirrolla:
    // jakaja on siis se, jolla ryhmä on skaalattu (ei ladonnan s).
    maare(ryhma.nimiOsuma, 'x', ((laatikko.x1 + dx) / sPiirto).toFixed(2));
    maare(ryhma.nimiOsuma, 'y', ((laatikko.y1 + dy) / sPiirto).toFixed(2));
    maare(ryhma.nimiOsuma, 'width', ((laatikko.x2 - laatikko.x1) / sPiirto).toFixed(2));
    maare(ryhma.nimiOsuma, 'height', ((laatikko.y2 - laatikko.y1) / sPiirto).toFixed(2));
  }
}

/* ============ NIMIÖIDEN VÄISTÖ AHTAISSA RYPPÄISSÄ =================
 *
 * Omistajan siistintätilaus 27.8.2026 (v1207:n jälkeen, Kreikan lehti,
 * Ateenan seutu): merkkien perään ladotut nimiöt (v1207, läpinäkyvä
 * mustetyyli) menivät tiheissä ryppäissä toistensa ja naapurisymbolien
 * päälle, ja kartasta tuli nimikasa.
 *
 * ── SÄÄNTÖ ────────────────────────────────────────────────────────
 *
 * SYMBOLI NÄKYY AINA, VAIN NIMIÖ VÄISTYY. Merkki on kartan tieto —
 * "tässä on jotain, ja tätä lajia" — ja sen osuma-alue (KOHDE_OSUMA_R)
 * on sormen mitta; kumpaakaan ei kosketa. Nimi on lisäselite, ja
 * napautus kertoo sen joka tapauksessa kortin otsikkona.
 *
 * NIMIÖ JÄÄ POIS VASTA KUN KUMPIKAAN KYLKI EI KELPAA (v1218). Kaista
 * kokeillaan ensin merkin oikealta ja sitten vasemmalta puolelta
 * (KOHDE_NIMIO_PUOLET), ja nimi jää pois vain, jos kumpikin osuisi
 * toisen merkin symboliin tai jo hyväksyttyyn nimiöön. Laatikko on sama
 * kaista, johon nimiö rasterissa ladotaan (js/fokusnosto-symbolit.js
 * nostosymNimioLaatikko) — väistö mittaa siis juuri sitä mustetta, joka
 * kartalle piirtyy.
 *
 * Ennen v1218:aa paikkoja oli yksi, ja se maksoi nimen jokaiselta
 * merkiltä, jonka oikealla kyljellä sattui olemaan naapuri: omistajan
 * kaappauksessa v1217:stä Delfoi ja reunuskilpikonna olivat mykkiä,
 * vaikka vasemmalla puolella oli tyhjää paperia.
 *
 * ── MIKSI EI ZOOMIPORTAITTAISTA PALJASTUSTA ───────────────────────
 *
 * Ensimmäinen ajatus oli näyttää piilotetut nimiöt lähemmällä
 * zoomilla. Se ei tässä kartassa toimi, ja syy on merkkien omassa
 * linjauksessa: merkit elävät KARTAN MITTAKAAVASSA (omistajan
 * LOPULLINEN linjaus 26.8.2026), eli merkki, nimiö ja niiden välimatka
 * kasvavat lähennettäessä yhdessä. Rypäs näyttää joka zoomilla
 * täsmälleen samalta, vain suurempana — limitys ei siis aukene
 * lähentämällä, ja "paljastus" olisi sama nimikasa isompana.
 * Zoomiportaista riippuu vain rasterin TARKKUUS (NOSTOSYM_PORTAAT),
 * ei asettelu.
 *
 * ── DETERMINISTINEN JÄRJESTYS ─────────────────────────────────────
 *
 * Nimiöt käydään läpi DATAN JÄRJESTYKSESSÄ (js/packs/fokuskohteet-*.js),
 * ja ensimmäisenä listattu voittaa. Järjestys on kirjoittajan oma —
 * lehden pääkohteet on listattu ensin — eikä se riipu näkymästä,
 * satunnaisuudesta tai piirtojärjestyksestä. Sama lehti antaa siis
 * aina saman kartan, eikä nimiö voi vilkkua panoroinnissa.
 *
 * KIERTÄVÄLLÄ LAUDALLA PÄÄTÖS ON KOHTEEN, EI KOPION: jos kohteen
 * jommankumman kopion nimiö törmää, nimiö jää pois molemmista. Muuten
 * sauman kahta puolta olisivat saman kohteen erinäköiset merkit.
 *
 * ── EI JOKA KEHYKSELLE ────────────────────────────────────────────
 *
 * Passi ajetaan vain paivitaFokuskohteet-kutsusta eli näkymän
 * asetuttua — ei nipistyksen vastaskaalauksesta (js/kartta.js
 * vastaskaalaaMerkit), jonka kehysbudjetti on kireimmillään. Lisäksi
 * tulos on välimuistissa avaimen takana: kohdejoukko, merkkien
 * vakioskaala ja nippuasettelun versio (js/fokusniput.js). Kun mikään
 * niistä ei muuttunut, passi ei laske eikä kirjoita mitään.
 */

/**
 * Väljyysvara nimiön ympärille ruudun pikseleinä lehden perustasolla.
 * Nolla hyväksyisi nimiön, joka juuri sipaisee naapurin reunaa; pari
 * pikseliä pitää kaistan väljänä ilman että se hylkää nimiöitä turhaan.
 */
const KOHDE_NIMIO_VARA = 2;

/**
 * NIMIÖN PUOLET KOKEILUJÄRJESTYKSESSÄ (v1218): ensin merkin oikea
 * puoli, sitten vasen.
 *
 * Omistajan kaappaus v1217:stä: merkkejä oli kartalla ilman nimeä
 * siellä missä tilaa oli. Yksi syy oli se, että nimiö tunsi vain YHDEN
 * paikan — merkin oikean kyljen — ja kun juuri se kaista oli tukossa
 * (Delfoi Parnassóksen alla, reunuskilpikonna Ateenan nipun kyljessä),
 * nimi jäi kokonaan pois, vaikka vasen puoli oli tyhjä.
 *
 * Kaksi puolta on kartografisesti kotona: lehden oma poltettu ladonta
 * latoo Pátran ja Ioánninan nimet pisteen VASEMMALLE puolelle
 * (tools/fokuskartta/maat.mjs GRC.kaupungit, `ank: 'right'`), ja
 * yleinen reitti kääntää nimen vasemmalle kuvan oikeassa laidassa
 * (piirto.js kohta 8g).
 *
 * ── KAKSI EI RIITTÄNYT (omistaja 1.9.2026 aamu, iPad, Bulgaria) ────
 *
 * *"Osalta nostoista puuttuu nimiö poltetuista laatoista."* Väite
 * "kaksi riittää poistamaan kadot" oli mitattavissa, ja mittaus kumosi
 * sen: koko maailman 605 nimellisestä nostosta 55 jäi ilman nimiötä,
 * ja JOKAISESSA tapauksessa molemmat kyljet osuivat naapurin
 * SYMBOLIIN (tools/savukkeet/mittaa-nostonimiot.mjs). Vaakakaista on
 * pitkä — 18 merkkiä on Sofian mitassa toistakymmentä lautayksikköä —
 * joten vaakasuora merkkirivi tukkii kummankin kyljen, vaikka merkin
 * ylä- ja alapuolella on tyhjää paperia.
 *
 * NELJÄ KYLKEÄ ON KARTAN OMA LADONTA (js/karttanimet.js: oikea, vasen,
 * ylä, ala) ja omistajan oma päätös 30.8.2026 *"sama ladonta kuin
 * paikannimillä."* Pystykyljet ovat keskitettyjä, joten ne vievät
 * sivusuunnassa vain puolet nimen mitasta. Mitattu jälkeen: 55 -> 31
 * pudotusta, ja jokainen jäljelle jäänyt on todellinen törmäys, jossa
 * kaikki neljä kylkeä ovat varattuja.
 *
 * JÄRJESTYS SAA TULLA LADONNALTA (31.8.2026, esityssiirto). Kun merkki
 * on ladottu kaupungin VASEMPAAN sarakkeeseen (js/fokusniput.js
 * sääntö 2), sen nimiö kuuluu vasemmalle: oikea kylki on kaupungin
 * laattaan päin, ja sinne ladottu nimi kulkisi laatan yli. Kasauspassi
 * kirjoittaa toiveensa kenttään `nippuPuoli`, ja tämä lista käännetään
 * sen mukaan (kohdeNimioPuolet). Toive ei ole käsky: jos toivottu kylki
 * on tukossa, seuraavat kokeillaan yhä.
 */
const KOHDE_NIMIO_PUOLET = NOSTOSYM_NIMIO_KYLJET;

/** Puolten kokeilujärjestys yhdelle merkille: toivottu ensin. */
function kohdeNimioPuolet(r) {
  if (!r?.nippuPuoli) return KOHDE_NIMIO_PUOLET;
  return ['vasen', ...KOHDE_NIMIO_PUOLET.filter((p) => p !== 'vasen')];
}

/** Laatikot laudan koordinaateissa. Kosketus ei ole vielä limitystä. */
function kohdeLimittyy(a, b) {
  return a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
}

/* ============ PUDOTUKSEN SYY KIRJATAAN, EI ARVATA =================
 *
 * Omistajan kuvakaappaus 1.9.2026 aamu (iPad, Bulgaria): osalta
 * nostoista puuttui nimiö poltetuista laatoista, ja harvassa maastossa
 * (Koillis-Bulgaria) pudotus ei näyttänyt törmäykseltä. Ilman mittaa
 * syytä ei voi tietää: väistö vain vaikenee.
 *
 * MITTA ON VALINNAINEN JA PELISSÄ POIS PÄÄLTÄ. Kirjanpito syntyy vain,
 * jos kutsuja on asettanut `ui.fokuskohdeNimioSyyt`-Mapin ennen
 * passia — mittatyökalu (tools/savukkeet/mittaa-nostonimiot.mjs) tekee
 * niin, peli ei. Pelissä tämä on siis yksi `instanceof`-vertailu niiden
 * merkkien kohdalla, joiden nimiö putosi.
 */
function kirjaaNimionPudotus(ui, id, rivi, esteet) {
  const kirja = ui?.fokuskohdeNimioSyyt;
  if (!(kirja instanceof Map)) return;
  const { symbolit, laatat, varatut } = esteet;
  const syyt = rivi.puolet.map((puoli, p) => {
    for (let n = 0; n < rivi.kehykset.length; n += 1) {
      const kehys = rivi.kehykset[n][p];
      const sym = symbolit.findIndex((este, j) => j !== rivi.indeksit[n]
        && kohdeLimittyy(kehys, este));
      if (sym >= 0) return { puoli, este: 'symboli', mika: sym };
      const laatta = laatat.findIndex((este) => kohdeLimittyy(kehys, este));
      if (laatta >= 0) return { puoli, este: 'kaupunki' };
      const varattu = varatut.findIndex((este) => kohdeLimittyy(kehys, este));
      if (varattu >= 0) return { puoli, este: 'nimio' };
    }
    return { puoli, este: 'tuntematon' };
  });
  kirja.set(id, syyt);
}

/* ============ NIMIÖT LUOVUTETAAN YHTEISEEN LADONTAAN ==============
 *
 * Omistajan päätös 30.8.2026 kysymyskortilla, kuvakaappaus Sofiasta:
 * *"Sama ladonta kuin paikannimillä."* Kohdenimiöt menevät samaan
 * ruutuavaruuden ladontaan kuin kaupunkien nimet — sama koko, sama
 * törmäyksenvältely, samat tiheyskynnykset.
 *
 * ── MIKÄ OLI VIKA ─────────────────────────────────────────────────
 *
 * Kun paikannimet siirtyivät laatoista peliin (v1369), ne saivat
 * ruutuun mitoitetun koon (10,5–12 CSS-px). Kohdenimiöt jäivät omaan
 * mittaansa, joka ei ollut kartan mitta lainkaan vaan kahden kertoimen
 * tulo: NOSTOSYM_NIMIO_KOKO 11 × KOHDE_SYMBOLI_SKAALA 11/21 = 5,8
 * CSS-pikseliä lehden perustasolla. Sofiassa se tarkoitti toistakymmentä
 * lukukelvotonta nimiötä kaupungin kyljessä — eikä yksikään niistä
 * pudonnut, koska väistö tunsi vain kaksi paikkaa eikä yhtään kynnystä.
 *
 * ── MIKSI EI OMAA LADONTAA, VAIKKA SELLAINEN JO OLI ───────────────
 *
 * Juuri se oli vika. Kaksi rinnakkaista ladontaa ei voi ratkaista
 * törmäystä keskenään: kaupungin nimi ja kohteen nimi saattoivat
 * päätyä samaan kohtaan, koska kumpikaan ei tiennyt toisesta. Yksi
 * ladonta, joka tuntee kaikki nimet, ratkaisee ne kerralla.
 *
 * ── MERKKI EI OLE OSA TÄTÄ PÄÄTÖSTÄ ───────────────────────────────
 *
 * Ladonta päättää vain NIMISTÄ. Merkki, sen symboli, sen aihevalo ja
 * sen osuma-alue (KOHDE_OSUMA_R, sormen mitta) jäävät tähän kerrokseen
 * koskemattomina, ja pudotetun nimen merkki avaa korttinsa täsmälleen
 * kuten ennenkin. Se on omistajan nimenomainen ehto samalla kortilla:
 * *"Merkit jäävät napautettaviksi myös ilman nimeä."*
 */
function luovutaKohdeNimiot(ui, s, piilossa, sPiirto = s) {
  const ryhmat = ui.fokuskohdeRyhmat ?? [];
  /*
   * KERROS PIILOSSA = EI NIMIÄ. Nimi seuraa merkkiään: kun merkit
   * sammuvat yleiskuvassa tai saapumisportin takana (paivitaNakyvyys),
   * nimien on sammuttava samalla hetkellä — muuten kartalla olisi
   * nimiä ilman merkkejä.
   */
  const rivit = [];
  if (!piilossa) {
    /*
     * YKSI RIVI KOHDETTA KOHTI, EI KOPIOTA KOHTI. Kiertävällä laudalla
     * merkki piirretään molempiin kohtiin, mutta ladonta on laudan
     * asia ja hoitaa sauman itse (js/karttanimet.js saumasiirto) —
     * täsmälleen kuten kaupunkien nimillä. Kahdesta rivistä syntyisi
     * kaksi kilpailijaa samasta nimestä.
     */
    const nahty = new Set();
    for (const r of ryhmat) {
      if (!r.nimi || nahty.has(r.id)) continue;
      /*
       * POLTETUN MERKIN NIMI ON JO LAATASSA (Raamattu 31.8.2026:
       * *"myös nostojen tekstit on hyvä polttaa suoraan kartalle"*),
       * eikä sitä anneta nimikerrokselle — sama nimi kahdesti eri
       * kirjasimella olisi täsmälleen v1366:n vika.
       */
      if (r.poltettu) continue;
      nahty.add(r.id);
      rivit.push({
        id: r.id,
        teksti: r.nimi,
        /*
         * PIIRTOPAIKKA, EI DATAPISTE eikä LADOTTU paikka: merkki on
         * voitu siirtää nipussa tai erottelussa, ja ruutukatto kutistaa
         * sen siirtymän ankkurinsa ympäri (asetaKohdeMittakaava
         * ryhma.piirtoX). Nimi kuuluu sen viereen, missä merkki
         * RUUDULLA on — ladottuun paikkaan ladottuna se jäisi syvässä
         * zoomissa kymmenien pikselien päähän omasta symbolistaan.
         * Varapolku on ladottu paikka: ennen ensimmäistä asemointia
         * piirtopaikkaa ei vielä ole.
         */
        x: r.piirtoX ?? r.nippu?.x ?? r.x + (r.sx ?? 0),
        y: r.piirtoY ?? r.nippu?.y ?? r.y + (r.sy ?? 0),
        /*
         * KYLJEN TOIVE KULKEE LADONTAAN ASTI (31.8.2026). Kaupungin
         * ympärille ladottu rypäs on kahtena sarakkeena laatan
         * molemmin puolin (js/fokusniput.js sääntö 2), ja vasemman
         * sarakkeen nimi kuuluu vasemmalle — muuten se kulkisi laatan
         * yli kohti toista saraketta. Sama toive kuin merkin oman
         * väistön kokeilujärjestyksessä (kohdeNimioPuolet).
         */
        puoli: Boolean(r.nippuPuoli),
      });
    }
  }
  /*
   * MERKIN SÄDE LAUDAN YKSIKÖINÄ, PIIRTOMITASSA (2.9.2026).
   *
   * Rako nimen ja merkin reunan välissä lasketaan tästä säteestä
   * (js/karttanimet.js merkkiR), joten sen on oltava sen merkin säde,
   * joka RUUDULLA on. Kattamattomalla mitalla säde oli Sofian syvässä
   * zoomissa 30,5 px vaikka piirretty merkki oli 5,6 px — nimi asettui
   * 34 pikselin päähän tyhjälle paperille, ja mitä kauemmas se joutui,
   * sitä useammin se törmäsi naapuriin ja putosi kokonaan. Juuri se on
   * omistajan *"tekstejä puuttuu"*: viidestä yhdeksästä nimellisestä
   * nostosta nimi katosi.
   */
  asetaKohdenimet(rivit, KOHDE_SYMBOLI_R * sPiirto);
  /*
   * OMAT NIMIÖT POIS RASTERISTA. Nimi on nyt nimikerroksen asia, ja
   * merkin oma nimiö olisi sama nimi kahdesti — sama kaksoisnimivaara,
   * jonka v1366 ja v1369 jo kertaalleen ratkoivat, vain eri kerrosten
   * välillä. Rasteri on symbolikohtainen ja siksi yhteinen kaikille
   * saman lajin merkeille, joten tämä myös keventää: nimiöttömiä
   * rastereita on lajien verran eikä kohteiden.
   */
  ui.fokuskohdePiiloNimiot = new Set(ryhmat.map((r) => r.id));
  ui.fokuskohdeNimioPuolet = new Map();
  for (const r of ryhmat) {
    if (!r.glyyfi || !r.nimi || r.nimioNakyy === false || r.poltettu) continue;
    r.nimioNakyy = false;
    r.nimioPuoli = 'oikea';
    r.glyyfi.replaceChildren();
    piirraNostosymKartalle(r.glyyfi, r.symboli, '', r.laji, 'oikea');
  }
}

/**
 * VÄISTÖN PUHDAS LASKENTA (1.9.2026, nostotekstien napautusalueet):
 * sama algoritmi kuin ennenkin, mutta päätökset palautetaan arvona eikä
 * kirjoiteta suoraan tietueisiin. Kutsujia on kaksi: oma väistö
 * (paivitaKohdeNimiot) ja nimikerroksen tie, joka tarvitsee poltettujen
 * nimien kehykset napautusalueiksi muttei saa koskea rastereihin
 * (asetaPoltetutTekstiOsumat). Algoritmi on ladontasopimusta — muutos
 * vaatii NOSTOLADONTA_SAANTO-noston (js/nostoladonta.js).
 */
function laskeKohdeNimioPaatokset(ui, s) {
  const ryhmat = ui.fokuskohdeRyhmat ?? [];
  // Kirjaston yksikkö laudan yksiköiksi — sama ketju kuin piirrossa:
  // merkin oma kutistus ja merkkien vakioskaala.
  const k = KOHDE_SYMBOLI_SKAALA * s;
  const vara = KOHDE_NIMIO_VARA * s;
  const paikat = ryhmat.map((r) => ({
    x: r.nippu?.x ?? r.x + (r.sx ?? 0),
    y: r.nippu?.y ?? r.y + (r.sy ?? 0),
  }));
  // Symbolit ovat esteitä KAIKKI — myös niiden merkkien, joiden oma
  // nimiö jää pois, ja niiden, joilla ei nimiötä koskaan ollutkaan.
  const symbolit = paikat.map(({ x, y }) => ({
    x1: x - KOHDE_SYMBOLI_R * s - vara, x2: x + KOHDE_SYMBOLI_R * s + vara,
    y1: y - KOHDE_SYMBOLI_R * s - vara, y2: y + KOHDE_SYMBOLI_R * s + vara,
  }));
  /*
   * KAUPUNGIN LAATTA ON ESTE (31.8.2026, esityssiirto). Rypäs latoutuu
   * laatan molemmin puolin (js/fokusniput.js sääntö 2), joten väärälle
   * kyljelle joutunut nimiö kulkisi suoraan kaupungin kiekon yli. Este
   * ei ole indeksoitu merkkeihin, joten se kelpaa `esteet`-listan
   * loppuun sellaisenaan.
   */
  const laatat = nippuLaattaEsteet(ui, s);
  // Kohteittain, ei kopioittain: kiertävän laudan kopiot samaan riviin.
  const jono = new Map();
  ryhmat.forEach((r, i) => {
    /*
     * EI `r.glyyfi`-EHTOA (31.8.2026): väistö on LADONTAA, ja
     * laattageneraattori ajaa sen ilman DOMia (js/nostoladonta.js).
     * Pelissä ehto ei muutu — `nimi` ja `glyyfi` kirjoitetaan samassa
     * haarassa (piirraKohdemerkki), joten nimellinen rivi on aina myös
     * solmullinen. Piirto alempana tarkistaa solmun erikseen.
     */
    if (!r.nimi) return;
    // Kaikki neljä kylkeä valmiiksi: mittaus on välimuistissa
    // (NOSTOSYM_LEVEYDET), joten laatikot ovat saman luvun
    // uudelleenasettelua eivätkä uutta canvas-mittausta.
    const puolet = kohdeNimioPuolet(r);
    const vaihtoehdot = puolet.map((puoli) => {
      const laatikko = nostosymNimioLaatikko(
        r.nimi, r.g?.ownerSVGElement, r.laji, puoli, r.nimioKatto,
      );
      if (!laatikko) return null;
      /*
       * VÄLJYYSVARA SILLE REUNALLE, JOSTA NIMIÖ LÄHTEE MERKISTÄ POISPÄIN
       * — vaakakyljillä ulompi pystyreuna, pystykyljillä molemmat sivut
       * (nimiö on silloin keskitetty eikä kummallakaan sivulla ole
       * merkkiä pitämässä väliä).
       */
      const pysty = puoli === 'yla' || puoli === 'ala';
      return {
        x1: paikat[i].x + laatikko.x1 * k - (pysty || puoli === 'vasen' ? vara : 0),
        x2: paikat[i].x + laatikko.x2 * k + (pysty || puoli === 'oikea' ? vara : 0),
        y1: paikat[i].y + laatikko.y1 * k,
        y2: paikat[i].y + laatikko.y2 * k,
      };
    });
    if (vaihtoehdot.some((kehys) => !kehys)) return;
    const rivi = jono.get(r.id) ?? { indeksit: [], kehykset: [], puolet };
    rivi.indeksit.push(i);
    rivi.kehykset.push(vaihtoehdot);
    jono.set(r.id, rivi);
  });
  const varatut = [];
  const piilossa = new Set();
  const puolet = new Map();
  // Valitut nimiökehykset ryhmäindeksillä (laudan yksiköitä):
  // nostotekstin napautusalue asettuu juuri siihen laatikkoon, johon
  // nimiö rasterissa ladotaan tai laattaan poltettiin.
  const kehykset = new Map();
  for (const [id, rivi] of jono) {
    /*
     * PUOLET JÄRJESTYKSESSÄ: toivottu kylki ensin (kohdeNimioPuolet),
     * toinen vasta jos toivottu on tukossa. Järjestys on merkin oma ja
     * kiinteä, joten sama lehti antaa saman kartan — eikä nimiö voi
     * vaihtaa puolta panoroinnissa.
     */
    const valittu = rivi.puolet.findIndex((_, p) => rivi.kehykset
      .every((vaihtoehdot, n) => {
        const kehys = vaihtoehdot[p];
        return !symbolit.some((sym, j) => j !== rivi.indeksit[n]
          && kohdeLimittyy(kehys, sym))
          && !laatat.some((laatta) => kohdeLimittyy(kehys, laatta))
          && !varatut.some((varattu) => kohdeLimittyy(kehys, varattu));
      }));
    if (valittu < 0) {
      piilossa.add(id);
      kirjaaNimionPudotus(ui, id, rivi, { symbolit, laatat, varatut });
    } else {
      puolet.set(id, rivi.puolet[valittu]);
      varatut.push(...rivi.kehykset.map((vaihtoehdot) => vaihtoehdot[valittu]));
      rivi.indeksit.forEach((indeksi, n) => kehykset.set(indeksi, rivi.kehykset[n][valittu]));
    }
  }
  return { piilossa, puolet, kehykset };
}

export function paivitaKohdeNimiot(ui, s) {
  const ryhmat = ui.fokuskohdeRyhmat ?? [];
  if (!ryhmat.length) return;
  const avain = `${ui.fokuskohdeAvain}|${s.toFixed(4)}|${nippuAsettelunVersio()}`;
  if (ui.fokuskohdeNimioAvain !== avain) {
    ui.fokuskohdeNimioAvain = avain;
    ui.fokuskohdeNimioPaatokset = laskeKohdeNimioPaatokset(ui, s);
    kirjoitaKohdeNimioPaatokset(ui);
  }
  /*
   * NAPAUTUSALUEET JOKA KUTSULLA, PÄÄTÖKSET VÄLIMUISTISTA: alueen
   * ruutumitta riippuu piirron ruutukatosta (sPiirto), joka elää
   * zoomiportaan mukana vaikka väistön päätökset eivät muutu. `maare`
   * kirjoittaa vain muuttuneet arvot, joten toisto on halpa.
   */
  asetaTekstiOsumat(ui, s, ui.fokuskohdeNimioPaatokset, false);
}

/** Väistön päätökset tietueisiin ja rastereihin — entinen häntä. */
function kirjoitaKohdeNimioPaatokset(ui) {
  const ryhmat = ui.fokuskohdeRyhmat ?? [];
  const { piilossa, puolet } = ui.fokuskohdeNimioPaatokset;
  // Päätös jää muistiin seuraavan rakennuksen arvaukseksi.
  ui.fokuskohdePiiloNimiot = piilossa;
  ui.fokuskohdeNimioPuolet = puolet;
  for (const r of ryhmat) {
    if (!r.nimi) continue;
    const nakyy = !piilossa.has(r.id);
    const kylki = puolet.get(r.id) ?? 'oikea';
    if (r.nimioNakyy === nakyy && r.nimioPuoli === kylki) continue;
    /*
     * PÄÄTÖS KIRJOITETAAN TIETUEESEEN ENNEN SOLMUEHTOA (31.8.2026).
     * Kentät olivat solmuehdon takana, ja koska laattageneraattori ajaa
     * tämän passin ILMAN DOMia (tools/fokuskartta/nostot.mjs), yksikään
     * poltettava merkki ei koskaan saanut `nimioNakyy: false` — laattaan
     * paloi myös se 32 nimiötä, jotka väistö oli juuri päättänyt
     * pudottaa. Sama vika kuin väistön oma `glyyfi`-ehto, joka
     * poistettiin jonon rakennuksesta samana päivänä: väistö on
     * LADONTAA, ja ladonnan tulos ei saa riippua siitä, onko ruutua.
     */
    r.nimioNakyy = nakyy;
    r.nimioPuoli = kylki;
    // Poltetun merkin rasteri on tyhjä eikä sitä herätetä henkiin:
    // symboli ja nimiö ovat laatassa (merkitsePoltetutNostot).
    if (!r.glyyfi || r.poltettu) continue;
    // Nimiö on paistettu rasteriin, joten tila vaihtuu piirtämällä
    // merkki uudestaan. Nimiötön rasteri on symbolikohtainen ja siksi
    // yhteinen kaikille saman lajin vaienneille merkeille.
    r.glyyfi.replaceChildren();
    piirraNostosymKartalle(
      r.glyyfi, r.symboli, nakyy ? r.nimi : '', r.laji, kylki, r.nimioKatto,
    );
  }
}

/*
 * NOSTON TEKSTI ON KOKONAAN NAPAUTETTAVA (omistaja 1.9.2026 ilta:
 * "Saisiko karttanostoissa myös tekstit kokonaisuudessa klikattaviksi?
 * Nyt vain osa tekstistä on klikattavissa"). Suorakaide asetetaan
 * väistön valitsemaan nimiökehykseen; kehys on laudan yksiköissä
 * merkin piirtopaikasta käsin, ja ryhmä on skaalattu piirron
 * ruutukatolla, joten jakaja on sPiirto — sama kaava kuin poltetun
 * kaupunginnimen laatikolla (asetaKohdeMittakaava).
 *
 * KUMPI NÄYTTÄÄ NIMEN, SE SAA ALUEEN: omalla väistöllä (vanhat laudat,
 * nimet rasterissa tai laatassa) alue annetaan jokaiselle näkyvälle
 * nimiölle; nimikerroksen tiellä vain poltetuille — elävien nimet
 * latoo ja napauttaa nimikerros itse (js/karttanimet.js data-kohde).
 */
function asetaTekstiOsumat(ui, s, paatokset, vainPoltetut) {
  if (!paatokset) return;
  const nakyvaSkaala = ui.nakyvaAlue?.()?.skaala;
  const sPiirto = nostoladontaKattoPorras(KOHDE_SYMBOLI_SKAALA * s, nakyvaSkaala)
    / KOHDE_SYMBOLI_SKAALA;
  if (!(sPiirto > 0)) return;
  (ui.fokuskohdeRyhmat ?? []).forEach((r, i) => {
    const alue = r.tekstiOsuma;
    if (!alue) return;
    const kehys = paatokset.kehykset.get(i);
    if (!kehys || (vainPoltetut && !r.poltettu)) {
      // Leveydetön alue ei ota napautuksia eikä osallistu kilpailuun
      // (lahinKohde ohittaa mitattomat muodot).
      maare(alue, 'width', '0');
      maare(alue, 'height', '0');
      return;
    }
    const px = r.nippu?.x ?? r.x + (r.sx ?? 0);
    const py = r.nippu?.y ?? r.y + (r.sy ?? 0);
    maare(alue, 'x', ((kehys.x1 - px) / sPiirto).toFixed(2));
    maare(alue, 'y', ((kehys.y1 - py) / sPiirto).toFixed(2));
    maare(alue, 'width', ((kehys.x2 - kehys.x1) / sPiirto).toFixed(2));
    maare(alue, 'height', ((kehys.y2 - kehys.y1) / sPiirto).toFixed(2));
  });
}

/**
 * Poltettujen nimien napautusalueet nimikerroksen tiellä.
 *
 * Laatan nimiö ladottiin generaattorissa TÄLLÄ SAMALLA väistöllä
 * (tools/fokuskartta/nostot.mjs paivitaKohdeNimiot), joten sama
 * laskenta samalla aineistolla antaa saman kehyksen — luettelon
 * tiiviste vartioi, että aineisto todella on sama (kohdeOnPoltettu).
 * Jos naapurusto on muuttunut polton jälkeen, muuttuneet merkit ovat
 * jo eläviä ja kehys voi sillä välillä elää; seuraava poltto korjaa.
 */
function asetaPoltetutTekstiOsumat(ui, s, piilossa) {
  if (piilossa) {
    for (const r of ui.fokuskohdeRyhmat ?? []) {
      if (!r.tekstiOsuma) continue;
      maare(r.tekstiOsuma, 'width', '0');
      maare(r.tekstiOsuma, 'height', '0');
    }
    return;
  }
  const avain = `${ui.fokuskohdeAvain}|${s.toFixed(4)}|${nippuAsettelunVersio()}`;
  if (ui.fokuskohdeTekstiOsumaAvain !== avain) {
    ui.fokuskohdeTekstiOsumaAvain = avain;
    ui.fokuskohdeTekstiOsumaPaatokset = laskeKohdeNimioPaatokset(ui, s);
  }
  asetaTekstiOsumat(ui, s, ui.fokuskohdeTekstiOsumaPaatokset, true);
}

/**
 * RASTERIN TARKKUUSPORRAS NÄKYMÄN MUKAAN (omistajan lisätilaus
 * 27.8.2026; js/fokusnosto-symbolit.js nostosymAsetaPorras).
 *
 * Tarve on laitepikseleitä kirjaston yksikköä kohti: merkin oma
 * mittakaava (KOHDE_SYMBOLI_SKAALA) × kartan suhde lehden perustasoon
 * × näytön pikselitiheys. Suhde saadaan samasta parista kuin merkkien
 * mittakaava — `nakyvaAlue().skaala` on kartan nykyinen kerroin ja
 * `fokusMerkkiSkaala()` on sen käänteisluku perustasolla, joten
 * tulo on 1 juuri siinä näkymässä, johon maahan saapuminen päättyy.
 *
 * TÄMÄ AJETAAN VAIN LEVOSSA. paivitaFokuskohteet kutsutaan näkymän
 * asetuttua (js/ui.js paivitaMaastonimet), ei eleen aikana — rasterit
 * eivät siis synny uudelleen kesken panoroinnin tai nipistyksen.
 */
function paivitaRasteriporras(ui, skaala) {
  // Katettu skaala: rasterin tarve on merkin NÄKYVÄ koko ruudulla, ja
  // katon purressa merkki on pienempi kuin kattamaton mitta lupaisi.
  const perus = ui.fokusMerkkiSkaalaPohja?.()
    || ui.fokusMerkkiSkaalaKartalle?.() || ui.fokusMerkkiSkaala?.();
  if (!(perus > 0) || !(skaala > 0)) return false;
  const tiheys = typeof window === 'undefined' ? 1 : (window.devicePixelRatio || 1);
  /*
   * RUUTUKATTO KUULUU TÄHÄNKIN (1.9.2026). Rasterin tarve on merkin
   * NÄKYVÄ koko, ja katon purressa merkki piirretään pienempänä kuin
   * kattamaton mitta lupaisi (asetaKohdeMittakaava sPiirto) — ilman
   * kattoa syvä zoomi tilaisi kolminkertaisen rasterin siitä musteesta,
   * joka ruudulle päätyy.
   */
  const porras = nostoladontaKattoPorras(KOHDE_SYMBOLI_SKAALA * perus, skaala);
  return nostosymAsetaPorras(porras * skaala * Math.min(tiheys, 3));
}

/**
 * PORRAS VAIHTUU VASTA KUN NÄKYMÄ ON OIKEASTI JÄÄNYT RAUHAAN.
 *
 * Portaan vaihto purkaa koko merkkikerroksen ja rakentaa sen uusiksi
 * (avain nollataan alempana). Se on oikea hinta kerran zoomausta
 * kohti — mutta ei kerran ELETTÄ kohti: `paivitaFokuskohteet` ajetaan
 * jokaisen eleen päätteeksi (js/ui.js paivitaMaastonimet), ja
 * peräkkäiset nipistykset ovat toisilleen "lepoa".
 *
 * MITATTU (nipistys Kreikan fokusnäkymässä, iPhone 390×844 dpr3, 4×
 * kuristus, 12 s): näkymä asettui 32 kertaa ja merkkikerros purettiin
 * ja rakennettiin 16 kertaa — `paivitaFokuskohteet` 2655 ms
 * pääsäiettä, siitä `piirraKohdemerkki` 1916 ms. Sormi oli koko sen
 * ajan menossa takaisin toiseen suuntaan, eikä yksikään näistä
 * portaista ehtinyt näkyä.
 *
 * VIIVE ON SAMA HENKI KUIN asteikoilla (js/fokusmitat.js LEPO_MS): eleen
 * loppuun kuuluu vielä liuku ja näkymän asettuminen, eikä kalleinta
 * työtä kannata tehdä sen keskellä. Väliaikana merkit ovat edellisen
 * portaan tarkkuudella — sama KOKO, vain karkeampi kuva (rasterin
 * mitat lasketaan portaalla jaettuna, js/fokusnosto-symbolit.js
 * nostosymRasteroi), joten mikään ei liiku eikä hyppää.
 *
 * SISÄLLÖN MUUTTUESSA PORRAS OTETAAN HETI (ks. kutsupaikka alempana):
 * kun kerros joka tapauksessa rakennetaan uusiksi — maahan saavuttaessa
 * tai kohdejoukon vaihtuessa — viivyttäminen tekisi vain sen, että
 * ensiesitys olisi hetken karkea ja maksaisi toisen purkukierroksen.
 */
const PORTAAN_LEPO_MS = 350;

function ajastaRasteriporras(ui) {
  clearTimeout(ui.fokusPorrasAjastin);
  ui.fokusPorrasAjastin = setTimeout(() => {
    ui.fokusPorrasAjastin = 0;
    if (ui.dead) return;
    if (!paivitaRasteriporras(ui, ui.nakyvaAlue?.()?.skaala)) return;
    /*
     * KERROSTA EI PURETA (28.8.2026, ks. PORTAAN_LEPO_MS). Ennen tässä
     * nollattiin `fokuskohdeAvain` ja rakennettiin koko merkkikerros
     * uusiksi — kymmeniä ryhmiä ja rasterointeja yhdessä
     * ajastintehtävässä, mitattuna 346–416 ms:n TimerFire-piikki juuri
     * eleen levon jälkeen. Sisältö ei ole muuttunut, vain tarkkuus, ja
     * tarkkuus asuu rasterin osoitteessa: kerros jää paikoilleen ja
     * osoitteet vaihtuvat erissä sitä mukaa kuin uudet rasterit
     * valmistuvat (nostosymVirkistaRasterit).
     */
    nostosymVirkistaRasterit(varmistaKohdekerros(ui));
  }, PORTAAN_LEPO_MS);
}

export function paivitaFokuskohteet(ui, tiedettyNakyva = null) {
  if (typeof document === 'undefined') return;
  const kerros = varmistaKohdekerros(ui);
  if (!kerros) return;
  const kohteet = nykyisenMaanKohteet(ui);
  const avain = kohteet.length
    ? `${ui.game.pack.id}:${kohteet.map(({ kohde }) => kohde.id).join('|')}`
    : 'tyhja';
  if (ui.fokuskohdeAvain !== avain) {
    /*
     * Kerros rakennetaan joka tapauksessa: porras otetaan HETI, jottei
     * ensiesitys jäisi karkeaksi ja vaatisi kohta toista purkua
     * (ks. PORTAAN_LEPO_MS). Ajastin pois alta samasta syystä.
     */
    clearTimeout(ui.fokusPorrasAjastin);
    ui.fokusPorrasAjastin = 0;
    paivitaRasteriporras(ui, (tiedettyNakyva ?? ui.nakyvaAlue?.())?.skaala);
    ui.fokuskohdeAvain = avain;
    kerros.textContent = '';
    ui.fokuskohdeRyhmat = [];
    // Erottelusiirrot lasketaan uusille ryhmille uudestaan.
    ui.fokuskohdeEroAvain = null;
    ui.fokuskohdeMerkit = new Map();
    // Tunnus → kohde, jotta napautuksen voittaja (lahinKohde) löytää
    // kortin datan ilman että jokainen merkki kantaa omaa sulkeumaansa.
    ui.fokuskohdeTiedot = new Map(kohteet.map(({ kohde }) => [kohde.id, kohde]));
    /*
     * MAAN KAUPUNGIT KASAUSPASSILLE (js/fokusniput.js nippuKaupungit).
     * Sama lista, jolla ryhmittely juuri tehtiin — sarake latoutuu maan
     * jokaisen kaupungin ympärille eikä vain sen, jossa pelaaja seisoo,
     * koska poltettu merkki ei voi vaihtaa paikkaa vuoron mukana
     * (Raamattu, KARTTANOSTOT POLTETAAN LAATTOIHIN).
     */
    ui.fokuskohdeKaupungit = maanKaupungit(ui, nykyinenIso(ui));
    if (!kohteet.length) suljeFokuskohde(ui);
    else lataaKohdeTyyli();
    for (const { kohde, paikka } of kohteet) {
      const merkit = [];
      // Kiertävällä laudalla sama merkki molempiin kohtiin: kopiosta ei
      // voi napauttaa mitään (ks. tiedoston alku, sääntö 1).
      for (const x of ui.kiertoKohdat?.(paikka.x) ?? [paikka.x]) {
        const ryhma = el('g', { class: 'fokuskohde-ryhma' }, kerros);
        // Tietue kantaa myös nimiöväistön tarpeet (paivitaKohdeNimiot):
        // kohteen tunnus, glyyfiryhmä ja nimiön nykyinen tila.
        /*
         * `kierto` on tämän KOPION siirtymä laudan leveyden verran
         * (js/ui.js kiertoKohdat). Se on tiivisteessä pakko vähentää
         * pois: laattaan poltetaan yksi merkki, ja kiertävä lauta
         * hoitaa toisen kopion laattojen omalla kierrolla
         * (js/laattapyramidi.js). Ilman tätä kopio saisi eri
         * tiivisteen, jäisi poltetuksi tunnistamatta ja piirtyisi
         * elävänä poltetun päälle — juuri se kaksoispiirto, jota
         * luettelo estää.
         */
        const tietue = {
          g: ryhma, x, y: paikka.y, id: kohde.id, kierto: x - paikka.x,
        };
        ui.fokuskohdeRyhmat.push(tietue);
        merkit.push(piirraKohdemerkki(ui, ryhma, kohde, tietue));
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
  } else {
    // Sisältö ennallaan: pelkkä zoomin tuoma tarkkuusporras odottaa
    // levon yli (ks. PORTAAN_LEPO_MS).
    ajastaRasteriporras(ui);
  }
  // Kutsujan mittaama näkymä kelpaa: kerroksen rakennus yllä on
  // pelkkää kirjoitusta eikä liikuta karttaa (ks. js/ui.js
  // taydennaTaide, "NÄKYMÄ MITATAAN KERRAN").
  const nakyva = tiedettyNakyva ?? ui.nakyvaAlue?.();
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
  const piilossa = paivitaNakyvyys(ui, kerros, nakyva);
  asetaKohdeMittakaava(ui, 1);
  /*
   * NIMIÖIDEN VÄISTÖ VASTA TÄSSÄ eli asemoinnin jälkeen ja vain
   * levossa: passi lukee merkkien lopulliset paikat (myös nipun) ja
   * jää muuten välimuistin taakse. Nipistyksen vastaskaalaus ei kutsu
   * sitä lainkaan — ks. osio NIMIÖIDEN VÄISTÖ.
   */
  // Väistö mittaa NÄKYVÄÄ merkkiä ja nimiötä, joten mitta on katettu
  // skaala — sama, jolla merkit juuri asemoitiin.
  const merkkiSkaala = ui.fokusMerkkiSkaalaPohja?.()
    || ui.fokusMerkkiSkaalaKartalle?.() || ui.fokusMerkkiSkaala?.();
  /*
   * KAKSI TIETÄ, JA LUETTELO VALITSEE (ks. luovutaKohdeNimiot).
   * Pyramidilaudalla, jonka laatoissa EI ole nimiä, nimet latoo
   * nimikerros — silloin tämä kerros luovuttaa nimensä sinne. Muualla
   * (katselutilan manterelaudat, vanhat laatat, joissa nimet ovat
   * poltettuina) nimikerros on hiljaa, ja tämän kerroksen oma väistö
   * on yhä ainoa ladonta, joka kohteille on.
   */
  /*
   * PIIRTOMITTA NIMIÖILLE (2.9.2026): nimen rako merkin reunaan on
   * PIIRRETYN merkin säde, ei ladotun — sama katto ja sama kaava kuin
   * asemoinnissa (asetaKohdeMittakaava kattoSuhde).
   */
  const merkkiPiirto = merkkiSkaala > 0
    ? nostoladontaKattoPorras(KOHDE_SYMBOLI_SKAALA * merkkiSkaala,
      ui.nakyvaAlue?.()?.skaala) / KOHDE_SYMBOLI_SKAALA
    : merkkiSkaala;
  if (merkkiSkaala > 0) {
    if (karttanimetLatovat(ui)) {
      luovutaKohdeNimiot(ui, merkkiSkaala, piilossa, merkkiPiirto);
      // Laattaan poltetut nimet saavat silti napautusalueensa tästä
      // kerroksesta (ks. asetaPoltetutTekstiOsumat).
      asetaPoltetutTekstiOsumat(ui, merkkiSkaala, piilossa);
    } else paivitaKohdeNimiot(ui, merkkiSkaala);
  }
  /*
   * NIMIKERROKSEN NAPAUTUS TAKAISIN TÄNNE (omistaja 1.9.2026 ilta,
   * tekstit kokonaan klikattaviksi): kerros (js/karttanimet.js) antaa
   * napautetun nimen kohdetunnuksen, ja kortti avataan täsmälleen kuin
   * merkistä. Nimi nimeää kohteensa yksiselitteisesti, joten
   * etäisyyskilpailua (lahinKohde) ei käydä.
   */
  ui.kohdenimenNapautus ??= (id) => {
    const kohde = ui.fokuskohdeTiedot?.get(id);
    if (!kohde) return;
    if (ui.fokuskohdeAuki?.id === kohde.id) suljeFokuskohde(ui);
    else avaaFokuskohde(ui, kohde);
  };
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

/*
 * ...JA VASTA KUN ON SAAVUTTU (omistajan pelitestipalaute 28.8.2026,
 * iPhone, matka Ateenasta Sofiaan: *"symbolit, nimiöt ja nippujen
 * katkoviivat näkyvät Sofiassa jo siirtymän aikana kaukaa"*).
 *
 * Portin nostaa maanvaihto (js/fokuskartta.js paivitaFokuskartta)
 * juuri ennen saapumisen kamera-ajoa, ja se aukeaa vasta kun KAIKKI
 * KOLME on tosi:
 *
 *   1. saapumisen kamera-ajo on ohi (kartta.kameraAjo),
 *   2. nappula ei enää liiku (ui.movingPlayerId),
 *   3. maanvaihdosta on kulunut PORTIN_VIIVE_MS.
 *
 * MIKSI MYÖS VIIVE EIKÄ PELKKÄ AJO. Mitattuna (Chromium, iPhone-mitat,
 * matka Ateenasta Sofiaan) saapumisen kamera-ajo jää usein KOKONAAN
 * TEKEMÄTTÄ: matkan ajan kameraa saattava ajo (js/ui.js
 * aloitaSaattavaKamera) on jo vienyt näkymän lehden ikkunaan, ja
 * ajaKamera hylkää ajon, joka ei liikuta mitään. Silloin ehdot 1 ja 2
 * ovat tosia samassa kehyksessä kuin lehti asetetaan, ja merkit
 * syttyisivät edelleen yhtä aikaa lehden kanssa. Viive on se osa, jonka
 * omistaja pyysi ("mieluiten muutaman sekunnin viiveellä"), ja ehdot 1
 * ja 2 huolehtivat siitä, ettei viive lopu KESKEN ajon silloin kun ajo
 * on pitkä.
 *
 * PORTTI HERÄTTÄÄ ITSENSÄ. Viiveen päättyessä ei ole mitään muuta
 * syytä piirtää merkkejä uudelleen, joten portti varaa yhden ajastimen
 * ja kutsuu itse paivitaFokuskohteet. Kamera-ajon päättyminen herättää
 * piirron muutenkin (js/kartta.js → ui.taydennaTaide →
 * paivitaMaastonimet), joten ajastin on tarpeen vain viivettä varten.
 */
const PORTIN_VIIVE_MS = 1400;

function saapumisPortti(ui) {
  if (!ui.fokuskohteetPortti) return false;
  const kesken = Boolean(ui.kartta?.kameraAjo) || ui.movingPlayerId != null;
  const jaljella = kesken
    ? PORTIN_VIIVE_MS
    : ui.fokuskohteetPortti + PORTIN_VIIVE_MS - Date.now();
  if (jaljella > 0) {
    /*
     * Yksi ajastin kerrallaan: portti tikittää samasta kutsusta, josta
     * merkit muutenkin päivitetään, eikä ajastimia saa kertyä jokaisesta
     * piirrosta. Kesken olevan ajon aikana herätys tulee ajolta itseltään
     * (ks. yllä), joten silloin varataan vain yksi varmistus.
     */
    if (!ui.fokuskohdePorttiAjastin) {
      ui.fokuskohdePorttiAjastin = setTimeout(() => {
        ui.fokuskohdePorttiAjastin = null;
        if (!ui.dead) paivitaFokuskohteet(ui);
      }, Math.min(jaljella, PORTIN_VIIVE_MS));
    }
    return true;
  }
  ui.fokuskohteetPortti = 0;
  // Portin avaus on se hetki, jossa merkit saavat syttyä pehmeästi
  // (ks. sytytaKohteet); tavallinen lähennys ei sitä tee.
  ui.fokuskohteetSyttyvat = true;
  return false;
}

/*
 * PEHMEÄ SYTTYMINEN on YKSI CSS-animaatio YHDELLE ryhmälle (css/
 * fokuskohteet.css). Merkit ovat kaikki saman kerroksen lapsia, joten
 * peittävyys on kompositorin työtä eikä maksa piirtoa; luokka lähtee
 * pois animaation päätyttyä, jotta seuraava saapuminen sytyttää sen
 * uudelleen. Liikeherkkyys hoituu tyylitiedoston omalla säännöllä.
 */
const KOHTEIDEN_SYTTYMINEN_MS = 700;

function sytytaKohteet(ui, kerros) {
  kerros.classList.remove('fokuskohteet-syttyy');
  // Uudelleenkäynnistys vaatii välikehyksen: ilman tätä sama luokka
  // takaisin samassa kehyksessä ei ole selaimelle muutos lainkaan.
  void kerros.getBoundingClientRect();
  kerros.classList.add('fokuskohteet-syttyy');
  clearTimeout(ui.fokuskohdeSytytysAjastin);
  ui.fokuskohdeSytytysAjastin = setTimeout(() => {
    kerros.classList.remove('fokuskohteet-syttyy');
  }, KOHTEIDEN_SYTTYMINEN_MS);
}

/**
 * @returns {boolean} onko kerros piilossa — nimikerros tarvitsee
 *   tiedon, jotta nimet sammuvat samalla hetkellä kuin merkit
 *   (ks. luovutaKohdeNimiot).
 */
function paivitaNakyvyys(ui, kerros, nakyva) {
  const pohja = ui.fokusPohjaBbox;
  const osuus = pohja && nakyva?.w > 0 ? pohja.w / nakyva.w : 0;
  // Portti ensin, jotta se ehtii tikittää myös yleiskuvassa.
  const odottaa = saapumisPortti(ui);
  const piiloon = odottaa || osuus < LEHDEN_VAHIN_OSUUS;
  kerros.classList.toggle('fokuskohteet-piilossa', piiloon);
  if (piiloon) {
    suljeFokuskohde(ui);
    return true;
  }
  if (ui.fokuskohteetSyttyvat) {
    ui.fokuskohteetSyttyvat = false;
    sytytaKohteet(ui, kerros);
  }
  return false;
}

/** Laudan vaihto tai uusi peli: merkit pois ja muisti nollille. */
export function nollaaFokuskohteet(ui) {
  suljeFokuskohde(ui);
  // Saapumisportti ja sen ajastimet eivät saa jäädä roikkumaan uudelle
  // laudalle (ks. saapumisPortti).
  ui.fokuskohteetPortti = 0;
  ui.fokuskohteetSyttyvat = false;
  clearTimeout(ui.fokuskohdePorttiAjastin);
  ui.fokuskohdePorttiAjastin = null;
  clearTimeout(ui.fokuskohdeSytytysAjastin);
  ui.fokuskohdeSytytysAjastin = null;
  ui.fokuskohdeAvain = null;
  ui.fokuskohdeEroAvain = null;
  ui.fokuskohdeRyhmat = [];
  ui.fokuskohdeMerkit = new Map();
  ui.fokuskohdeTiedot = new Map();
  if (ui.fokuskohdeKerros?.isConnected) ui.fokuskohdeKerros.textContent = '';
}

/* ==================== POP-UP ==================== */

/** Sulkee auki olevan tietoruudun ja purkaa sen kuuntelijat. */
/*
 * KORTIN OMAT SUURENNOSAVAIMET.
 *
 * Tietoruudun oma kuva aukeaa avaimella `fokuskohdeZoom`. Täkynoston ja
 * syvennystarinan kortit latovat kuvansa OMILLA avaimillaan —
 * `fokusnostoZoom` ja `syvennysZoom` — ja koska ne aukeavat kartan
 * kohdemerkistä (YHTENÄINEN KOHDEMALLI), ne ovat silloin TÄMÄN kortin
 * jatkeita: sulku vie ne mukanaan, ja Esc kuoritaan niistä ensin
 * (kuunteleKohdetta), tai Esc sulkisi koko lehden kuvan alta.
 */
const KOHDE_SUURENNOSAVAIMET = ['fokuskohdeZoom', 'fokusnostoZoom', 'syvennysZoom'];

export function suljeFokuskohde(ui) {
  // Suurennos on tietoruudun kuvan jatke: kortin lähtiessä sen ankkuri
  // katoaa, joten se ei saa jäädä yksin kartan päälle.
  for (const avain of KOHDE_SUURENNOSAVAIMET) suljeKohdeSuurennos(ui, avain);
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
 *     Useimmilla kadonneilla se on kortin AINOA kuva — kohteesta ei ole
 *     valokuvaa, koska kohdetta ei ole.
 *   • `kadonnut: false` — kohde on yhä pystyssä. Kartalla on kohteen
 *     tavallinen merkki, ja "Koe ihme" -nappi tulee kortissa
 *     ENSIMMÄISEN KUVAN ALLE (omistajan tilaus 27.8.2026 ilta, Akropolis
 *     iPhonella): pelaaja näkee ensin sen, mitä paikalla NYT on, ja
 *     nappi seisoo juuri siinä kohdassa, jossa vanha rekonstruktiokuva
 *     ennen oli. Ihmekuva ei ole kuvalistassa: kaksi rinnakkaista
 *     näkymää samasta paikasta hukuttaisi yllätyksen.
 *
 * NAUHAN PIIRTÄÄ PELI, EI KUVATIEDOSTO (Raamattu: *"peli piirtää nauhan
 * kuvan päälle, sitä ei polteta kuvatiedostoon"*). Nauha on DIAGONAALINEN
 * KULMANAUHA kuvan vasemmassa yläkulmassa (omistajan tilaus 27.8.2026
 * ilta): 45 asteen kaista, joka taittuu kuvan reunalla ja jatkuu siitä
 * kapeampana ja tummempana kehyksen paperimarginaalille — nauha
 * näyttää kääriytyvän kuvan ympäri sen sijaan että leijuisi sen
 * päällä tai loppuisi kuin veitsellä. Geometria on kokonaan css:ssä
 * (css/fokuskohteet.css, osio MATKAKIRJAN IHME); täällä syntyy vain
 * rakenne: kääre, kaksi taitetta ja tekstikaista.
 *
 * SAMA komponentti (piirraIhmenauha) käytetään kortin kuvapaikassa ja
 * suurennoksessa — kaksi kopiota erkanisi ensimmäisessä
 * tyylimuutoksessa. Kuvaolio kantaa nauhan tekstin kentässä `nauha`,
 * joten piirtäjien ei tarvitse tietää ihmeistä mitään: nauha on kuvan
 * ominaisuus siinä missä selitekin.
 *
 * KOLMAS IKKUNA 27.8.2026 ILTA (omistaja, kaappaus nähtävyysikkunasta:
 * *"täällä pitäisi olla myöskin se ihme nähtävillä"*). Kaupunkikartan
 * nähtävyysjuttu (js/nahtavyydet.js) näyttää samat kaksi esitystapaa
 * samoilla säännöillä, ja siksi nauha, nappi ja ihmekuvan haku ovat
 * tästä lohkosta VIENTILISTALLA (matkakirjanIhme, piirraIhmenauha,
 * piirraIhmenappi). Ihmettä ei kopioida nähtävyysaineistoon: se pysyy
 * fokuskohteen kenttänä, ja juttu hakee sen nimellä.
 * =================================================================== */

/** Nauhan teksti — yksi totuus kortissa ja suurennoksessa. */
// Nauhan teksti on pelin alaotsikko (omistajan valinta 28.8.2026:
// "Unohdettu aarre, kaytetaan sita kaikkiin") - sama kaikilla
// ihmekuvilla, kadonneilla ja sailyneilla.
const KOHDE_IHMENAUHA = 'Unohdettu aarre';

/*
 * NAUHAN SÄVY: yksi rivi, kaksi valmista väriryhmää (omistajan tilaus
 * 27.8.2026 ilta: *"tee kaksi väriversiota rinnakkain … molempien
 * pitää olla valmiita"*). Tyhjä = KULTA (pergamentti);
 * 'fokuskohde-ihmenauha--puna' = PUNA (sinettivaha). Molempien sävyt
 * ovat css/fokuskohteet.css:n osiossa MATKAKIRJAN IHME omina
 * muuttujaryhminään, joten vaihto ei koske mihinkään muuhun.
 *
 * OMISTAJAN VALINTA 27.8.2026 ILTA: PUNA. Kulta jää kytkimen taakse
 * — se on yhä täysin toimiva ryhmä, ja tämän rivin tyhjentäminen
 * palauttaa sen.
 */
const KOHDE_IHMENAUHAN_SAVY = 'fokuskohde-ihmenauha--puna';

/**
 * Kohteen ihmekuva kuvaoliona, tai null jos kohteella ei ole ihmettä.
 * Palautettu olio on kuvalistan kanssa samaa muotoa (`osoite`, `selite`,
 * `lahde`) ja kantaa lisäksi nauhan tekstin.
 */
/*
 * REAKTIOTUNNISTEET (js/reaktiot.js). Kaksi lyhyttä funktiota, jotta
 * sama sisältö saa saman nimen riippumatta siitä, mistä ikkunasta
 * pelaaja sen näkee: kohteen kortti kartalla ja sama kohde
 * nähtävyysikkunassa osoittavat samaan tunnisteeseen, ja ihme on oma
 * sisältönsä (yksi kuva, yksi selite) eikä sama asia kuin kortti,
 * jossa se asuu.
 *
 * Kohteen id on koko maailmassa yksilöllinen (js/packs/fokuskohteet-*),
 * ihmeen tunnisteeksi kelpaa kohteen nimi — sillä se haetaankin
 * (matkakirjanIhme).
 */
function kohdeReaktioTunniste(kohde) {
  return kohde?.id ? `kohde:${kohde.id}` : null;
}

function ihmeReaktioTunniste(nimi) {
  return nimi ? `ihme:${nimi}` : null;
}

function kohteenIhmekuva(kohde) {
  const ihme = kohde?.ihme;
  if (!ihme?.osoite) return null;
  return {
    osoite: ihme.osoite,
    selite: ihme.selite ?? '',
    lahde: ihme.lahde ?? '',
    nauha: KOHDE_IHMENAUHA,
    /*
     * IHMEKUVAN LIPPU (omistajan lisäys 1.9.2026). Kadonneen ihmeen
     * rekonstruktio saa lähderivin selitepopupista oman tekstinsä
     * ("Mihin ihmeen kuva perustuu?") tavallisen havainnekuvatekstin
     * sijaan — js/havainnekuva.js havainnekuvaLaji.
     *
     * LIPPU ON TÄSSÄ eikä lähderivin sanamuodossa, koska tämä on ainoa
     * tehdas, joka ihmekuvia tekee: lippu kulkee kaikkien renderöijien
     * (kortti, karuselli, suurennos, nähtävyysikkuna) läpi datan
     * mukana, eikä yksikään niistä tarvitse tietää ihmeistä mitään.
     * Lähderivit ovat sisältöä ja ne muuttuvat; tämä kenttä ei.
     */
    ihmekuva: true,
    // Suurennos saa oman reaktiorivinsä (avaaKohdeSuurennos ja
    // js/ui.js naytaKulttuuriKuva lukevat tämän kentän).
    reaktio: ihmeReaktioTunniste(kohde?.nimi),
    reaktioOtsikko: kohde?.nimi ?? '',
  };
}

/**
 * Diagonaalinen pergamenttinauha kuvan vasempaan yläkulmaan. Kutsuja
 * antaa sen elementin, jonka sisällä nauha kelluu (kortissa kuvanappi,
 * suurennoksessa kuvan oma kehys) — kaikki mitat ja kulmat ovat
 * css:ssä.
 *
 * KAKSI KÄÄRETTÄ, KOSKA RAJOJA ON KAKSI (omistajan tilaus 27.8.2026
 * ilta, lähikuva suurennoksesta: *"nauhan pitäisi mennä hieman kuvan
 * ulkopuolelle eli valkoisen paperimarginaalin päälle, jotta näyttää
 * että se oikeasti kaartuu kuvan ympärille"*). Ulompi kääre
 * (.fokuskohde-ihmenauha) on täsmälleen kuvan kokoinen ja leikkaa
 * kaistan ja taitteet kuvan reunaan — nauha ei koske paperiin.
 *
 * YKSI OSA (omistajan tarkennus 27.8.2026 ilta: esikuvana pelin oma
 * MATKAOPAS-nauha — pelkkä vino kaista ilman taitekappaleita): kaista
 * on 45 asteen kulmaan käännetty tekstipalkki, jonka kääre leikkaa
 * kuvan reunaan. Päiden varjostus on kaistan omassa pinnassa.
 *
 * Sama komponentti istuu kortin kuvaan ja suurennokseen pelkillä
 * muuttujien arvoilla; myös väriryhmä on pelkkä luokka
 * (KOHDE_IHMENAUHAN_SAVY).
 */
export function piirraIhmenauha(isanta, teksti) {
  if (!teksti) return null;
  // Nauhan geometria on css/fokuskohteet.css:ssä, joka ladataan
  // laiskasti. Kortin polulla tyyli on jo paikallaan (avaaFokuskohde),
  // mutta nähtävyysikkuna piirtää nauhan ilman fokusmoodia — sieltä
  // tullessa lataus on tässä ainoa tilaisuus. Kutsu on tyhjä työ, jos
  // tyyli on jo sivulla.
  lataaKohdeTyyli();
  const nauha = html('span', 'fokuskohde-ihmenauha');
  if (KOHDE_IHMENAUHAN_SAVY) nauha.classList.add(KOHDE_IHMENAUHAN_SAVY);
  nauha.setAttribute('aria-hidden', 'true');
  // Tähtikoristeet kuuluvat ihmeelle: ne ovat samaa merkkiä kuin
  // kadonneiden ihmeiden karttasymboli.
  nauha.appendChild(html('span', 'fokuskohde-ihmekaista', `✦ ${teksti} ✦`));
  isanta.appendChild(nauha);
  return nauha;
}

/**
 * "Koe ihme" -nappi tähtineen. Nappi kantaa saman tähden kuin
 * kadonneiden kohteiden karttamerkki: sama lupaus, sama merkki.
 *
 * AVAUS TULEE KUTSUJALTA (jako 27.8.2026 ilta, kun ihme vietiin myös
 * nähtävyysikkunaan): kartan tietoruudussa suurennos on kartan päällä
 * oleva `.fokuskohde-zoom`, mutta nähtävyysikkuna on modaali <dialog>
 * eli selaimen ylimmässä kerroksessa — bodyyn liitetty suurennos jäisi
 * sen TAAKSE (js/ui.js suurennosIsanta). Nappi on siis sama komponentti
 * molemmissa, mutta katselin on se, joka kussakin ikkunassa toimii.
 *
 * @param {Element} sisalto mihin nappi liitetään
 * @param {string} teksti napin teksti
 * @param {(nappi: Element) => void} avaa mitä napautus tekee; saa napin
 *   itsensä, jotta suurennos voi kasvaa juuri siitä kohdasta ruutua
 * @returns {Element} nappi, jotta kutsuja voi siirtää sen paikalleen
 */
export function piirraIhmenappi(sisalto, teksti, avaa) {
  lataaKohdeTyyli();
  const nappi = html('button', 'fokuskohde-ihmenappi');
  nappi.type = 'button';
  const tahti = el('svg', {
    class: 'fokuskohde-ihmetahti',
    viewBox: '-12 -12 24 24',
    'aria-hidden': 'true',
  }, nappi);
  piirraNostosymboli(el('g', {}, tahti), 'ihme');
  nappi.appendChild(document.createTextNode(teksti));
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    avaa(nappi);
  });
  sisalto.appendChild(nappi);
  return nappi;
}

/**
 * Kortin oma "Koe ihme" -nappi, jos kohde on YHÄ OLEMASSA ja sillä on
 * ihmekuva. Paikan valitsee kutsuja (piirraKohdeKuvat: ensimmäisen
 * kuvan alle).
 */
function piirraKortinIhmenappi(ui, sisalto, kohde) {
  const kuva = kohteenIhmekuva(kohde);
  if (!kuva || kohde.ihme.kadonnut) return;
  piirraIhmenappi(sisalto, kohde.ihme.nappi ?? 'Koe ihme',
    (nappi) => avaaKohdeSuurennos(ui, kuva, () => nappi));
}

/* ---------- IHME MYÖS NÄHTÄVYYSIKKUNAAN (omistaja 27.8.2026 ilta) ----
 *
 * *"täällä pitäisi olla myöskin se ihme nähtävillä"* — kaappaus
 * nähtävyysikkunan kohdenäkymästä (KOHDE 1 · Antiikin agora). Ihme oli
 * siihen asti vain fokusmoodin kartan tietoruudussa, vaikka sama paikka
 * on kaupunkikartalla oma juttunsa (js/nahtavyydet.js avaaNahtavyys).
 *
 * KUVA HAETAAN NIMELLÄ, EI KOPIOIDA. Ihme on ja pysyy fokuskohteen
 * kenttänä (js/packs/fokuskohteet-*.js): yksi kuva, yksi lähde, yksi
 * totuus. Nähtävyysjuttu ei siis saa omaa `ihme`-kenttää, vaan
 * nähtävyyden nimi katsotaan tästä taulusta — kun ihmeitä lisätään
 * pakettitiedostoihin, ne ilmestyvät kumpaankin ikkunaan itsestään.
 *
 * NIMIVASTAAVUUDET (KOHDE_IHMEEN_NIMET) ovat niitä harvoja paikkoja,
 * joissa kaupunkikartta ja fokuskartta kutsuvat SAMAA kohdetta eri
 * nimellä. Lista on tarkoituksella lyhyt ja tarkistettu pareittain;
 * kaikki muut osuvat suoraan nimellä.
 */

/** Kaupunkikartan nimi → fokuskohteen nimi, kun ne eroavat. */
const KOHDE_IHMEEN_NIMET = {
  // Ateena: kaupunkikartalla suomeksi, fokuskartalla antiikin nimellä.
  'Zeuksen temppeli': 'Olympieion',
  // Lontoo: sama katedraali, suomennettu vs. englantilainen asu.
  'Pyhän Paavalin katedraali': 'St Paulin katedraali',
  // Peking: Yuanmingyuan = Vanha kesäpalatsi (poltettu 1860).
  'Vanha kesäpalatsi': 'Yuanmingyuan',
  // Luxor: sama Karnakin pylvässali, kaupunkikartalla "suuri".
  'Karnakin suuri pylvässali': 'Karnakin pylvässali',
};

/** Vertailuasu: isot/pienet kirjaimet ja ylimääräiset välit pois. */
function ihmeAvain(nimi) {
  return String(nimi ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Nimi → kohde, jolla on ihme. Rakennetaan kerran, ensimmäisellä haulla. */
let KOHDE_IHMEHAKU = null;

function ihmehaku() {
  if (KOHDE_IHMEHAKU) return KOHDE_IHMEHAKU;
  KOHDE_IHMEHAKU = new Map();
  for (const lista of Object.values(KOHDE_MAAT)) {
    for (const kohde of lista) {
      if (kohde?.ihme?.osoite) KOHDE_IHMEHAKU.set(ihmeAvain(kohde.nimi), kohde);
    }
  }
  return KOHDE_IHMEHAKU;
}

/**
 * Nimetyn paikan Matkakirjan ihme, tai null jos sillä ei ole sellaista.
 *
 * Palautettu olio on kuvalistan kanssa samaa muotoa (`osoite`, `selite`,
 * `lahde`, `nauha`) ja kertoo lisäksi, kumpi esitystapa kohteelle
 * kuuluu: `kadonnut` (kuva on kuvasarjan ensimmäinen) vai nappi
 * (`nappi`-teksti, kuva odottaa suurennoksessa).
 */
export function matkakirjanIhme(nimi) {
  const haettu = KOHDE_IHMEEN_NIMET[String(nimi ?? '').trim()] ?? nimi;
  const kohde = ihmehaku().get(ihmeAvain(haettu));
  const kuva = kohteenIhmekuva(kohde);
  if (!kuva) return null;
  return {
    ...kuva,
    kadonnut: Boolean(kohde.ihme.kadonnut),
    nappi: kohde.ihme.nappi ?? 'Koe ihme',
  };
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
  /*
   * "KOE IHME" ENSIMMÄISEN KUVAN ALLE eikä otsikon alle (omistajan
   * tilaus 27.8.2026 ilta). Nappi asuu siinä kohdassa, jossa poistettu
   * loistoaikarekonstruktio ennen oli: pelaaja näkee ensin valokuvan
   * kohteen NYKYISESTÄ kunnosta, ja nappi lupaa sen viereen sen, miltä
   * paikka näyttäisi ehjänä. Kuvaton kohde saa napin silti — muuten
   * lupaus katoaisi kokonaan, jos kuva jäisi lataamatta.
   */
  lista.forEach((kuva, i) => {
    piirraKohdeKuva(ui, sisalto, kuva);
    if (i === 0) piirraKortinIhmenappi(ui, sisalto, kohde);
  });
  if (!lista.length) piirraKortinIhmenappi(ui, sisalto, kohde);
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
  /*
   * Nauha napin sisään eikä kehykseen: kehyksessä on myös kuvateksti,
   * ja nauhan on jäätävä kuvan päälle sen vasempaan yläkulmaan.
   *
   * KEHYS SAA OMAN LUOKAN, joka kertoo että tämä kuva kantaa nauhan:
   * css siirtää kääreen napin 1px reunuksen sisään, kuvan pinnalle.
   * Tilaa ei enää varata mistään, koska kääre leikkaa nauhan kuvan
   * reunaan (omistajan tilaus 27.8.2026) eikä kortin vieritettävälle
   * sisällölle jää mitään leikattavaa.
   */
  if (kuva.nauha) kehys.classList.add('fokuskohde-kuva-nauhalla');
  piirraIhmenauha(nappi, kuva.nauha);
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    avaaKohdeSuurennos(ui, kuva, () => nappi);
  });
  kehys.appendChild(nappi);
  if (kuva.selite || kuva.lahde) {
    const teksti = html('figcaption', 'fokuskohde-kuvateksti', kuva.selite ?? '');
    // CC BY vaatii tekijän maininnan: lähde on aina kuvan vieressä.
    if (kuva.lahde) {
      teksti.appendChild(taytaLahderivi(html('span', 'fokuskohde-kuvalahde'), kuva.lahde, kuva));
    }
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
  // Pelkkätekstipinnat (title, aria-label): ei yliviivausta, vain "pululta".
  nappi.title = `Kysy pululta lisää: ${korostus.perus}`;
  nappi.setAttribute('aria-label', `Kysy pululta lisää: ${korostus.perus}`);
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
  // Otsikkorivi on nimilappu → yliviivausvitsi (omistaja 27.8.2026,
  // muoto tarkennettu 31.8.2026): "Kysy viisaalta pöllöltä pululta:",
  // jossa koko nimi on yhden vedon alla. Ryhmän aria-label on pelkkää
  // tekstiä eikä siinä ole yliviivausta.
  sisalto.appendChild(polloNimilappu(html('p', 'fokuskohde-kysy-otsikko'), {
    ennen: 'Kysy ', yli: 'viisaalta pöllöltä', tilalle: 'pululta', jalkeen: ':',
  }));
  const rivi = html('div', 'fokuskohde-kysymykset');
  rivi.setAttribute('role', 'group');
  rivi.setAttribute('aria-label', `Kysy pululta: ${kohde.nimi}`);
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
  // Kierroksen lähderivi kulkee saman apurin kautta kuin kuvien
  // (2.9.2026): yksi paikka, jossa lähderivi kirjoitetaan.
  if (kierros.lahde) {
    vara.appendChild(taytaLahderivi(html('p', 'fokuskierros-lahde'),
      kierros.lahde, kierros));
  }
  ikkuna.appendChild(vara);
  if (kierros.lahde) {
    ikkuna.appendChild(taytaLahderivi(html('p', 'fokuskierros-lahde'),
      kierros.lahde, kierros));
  }

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
  /*
   * Napautus ikkunan ULKOPUOLELLE sulkee; ikkunan sisällä napautus
   * kuuluu kierrokselle itselleen. Sulkeva napautus jää kerrokseen:
   * kerros katoaa jo pointerdownissa, ja ilman nielua sen click osuisi
   * kartalle kerroksen alta (sama vuoto kuin pöllön kuplissa, ks.
   * ui-apurit nielaiseSulkevaNapautus).
   */
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (ikkuna.contains(tapahtuma.target)) return;
    nielaiseSulkevaNapautus(tapahtuma);
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
 * Kartan tietoruudun oma tie ulos on suljeFokuskohde, joka kutsuu tätä —
 * niin kortti ja sen kuva katoavat aina yhdessä eikä kutsujan tarvitse
 * muistaa kahta sulkua.
 *
 * `avain` KERTOO, KENEN SUURENNOS SULJETAAN (29.8.2026). Täkynoston
 * karttaliite avaa saman suurennoksen omalla avaimellaan, koska sen
 * elinkaari ei ole tietoruudun elinkaari — ks. avaaKohdeSuurennos.
 */
export function suljeKohdeSuurennos(ui, avain = 'fokuskohdeZoom') {
  ui?.[avain]?.heti?.();
  if (ui) ui[avain] = null;
}

/**
 * Kuva suureksi kartan päälle, pikkukuvan paikalta kasvattaen.
 *
 * @param {object} ui
 * @param {{tiedosto:string, selite?:string, lahde?:string}} kuva
 * @param {() => Element|null} ankkuri mistä ruudun kohdasta kuva kasvaa
 *   ja mihin se kutistuu. Funktio eikä valmis elementti, koska kortti voi
 *   liikkua kartan mukana suurennoksen ollessa auki.
 *
 * @param {string} avain mihin ui-kenttään auki oleva suurennos
 *   talletetaan.
 *
 * VIENTILISTALLA 29.8.2026: isoisän karttaliite (js/fokusnosto.js
 * piirraNostonKarttaliite) suurentuu samalla mekanismilla. Kartta on
 * luettavaa sisältöä, ei koriste — pienenä se olisi vain harmaa laatta —
 * ja tämä on pelin ainoa suurennos, joka osaa sekä Commons-tiedoston
 * että repon oman `osoite`-kuvan, kasvaa ankkuristaan ja kantaa
 * lähderivin mukanaan. Kopio fokusnostoon olisi ollut sama koodi
 * toiseen kertaan.
 *
 * MUTTA ELINKAARI ON KUTSUJAN, EI TÄMÄN PAKETIN (löydös savukkeesta
 * 29.8.2026). `ui.fokuskohdeZoom` on tietoruudun oma kenttä, ja
 * paivitaNakyvyys sulkee sen JOKA PIIRROSSA, kun kohdekerros on
 * piilossa — ja täkynoston kortti elää juuri silloin, kun kartta on
 * yleiskuvassa eikä kerrosta ole. Karttaliitteen suurennos katosi siis
 * runsaassa sadassa millisekunnissa itsestään. Siksi avain on
 * parametri: nosto pitää omansa omassa kentässään
 * (`fokusnostoZoom`) ja sulkee sen itse.
 */
export function avaaKohdeSuurennos(ui, kuva, ankkuri, avain = 'fokuskohdeZoom') {
  if (typeof document === 'undefined' || (!kuva?.tiedosto && !kuva?.osoite)) return;
  suljeKohdeSuurennos(ui, avain);
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
    taytaLahderivi(html('span', 'fokuskohde-zoomlahde'), kuva.lahde ?? '', kuva),
  );
  kehys.append(img, teksti);
  // "Matkakirjan ihme" -nauha myös suurennokseen, samalla komponentilla
  // kuin kortissa (ks. lohko MATKAKIRJAN IHME). Kehys on nauhan
  // asemointipohja, ja css nostaa sen kuvan vasempaan yläkulmaan.
  piirraIhmenauha(kehys, kuva.nauha);
  /*
   * REAKTIORIVI SUURENNOKSEN PAPERILLE (js/reaktiot.js), kun kuvalla on
   * oma tunniste — käytännössä Matkakirjan ihme, joka on oma
   * sisältönsä eikä sama kuin kortti, jonka napista se aukesi.
   *
   * Kehys ohittaa eleet (css pointer-events: none), jotta napautus
   * paperin päällä sulkee suurennoksen; rivi ottaa ne takaisin omalla
   * luokallaan, ja kerroksen sulkukuuntelija väistää sen (ks. alempana).
   */
  piirraReaktiot(kehys, kuva.reaktio, {
    otsikko: kuva.reaktioOtsikko ?? kuva.selite ?? '',
    luokka: 'reaktiot-suurennos',
  });
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
    if (ui?.[avain]?.kerros === kerros) ui[avain] = null;
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
    // Reaktiorivi on paperin oma toiminto: peukku ei saa sulkea kuvaa,
    // eikä virhelomakkeen kenttään pääsisi muuten kirjoittamaan.
    if (tapahtuma.target?.closest?.('.reaktiorivi')) return;
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
  if (ui) ui[avain] = { kerros, sulje, heti: poista };
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
 *
 * SÄÄNTÖ ON YHÄ SAMA, MUTTA SEN ARVOJA ON NYT KAHDEKSAN (omistaja
 * 31.8.2026): kun kartan merkiksi tuli ryhmän kärkisymboli, sama
 * kärkisymboli ja sen luokkanimi näkyvät myös tässä ylärivissä —
 * ankkurikohteen kortti sanoo *Kauppa* eikä *Merenkulku*. Se on
 * suoraa seurausta siitä, että kortin ja merkin on kerrottava samaa;
 * jos omistaja haluaa kortille tarkan luokan takaisin, tässä
 * vaihdetaan kohteenSymboli → kohteenKategoria, ja kartta pysyy
 * kahdeksassa.
 */
/*
 * ============ NOSTO JOLLA ON KOHDE EI LUO OMAA MERKKIÄ ==============
 *
 * YHTENÄINEN KOHDEMALLI (Raamattu 29.8.2026): täkynosto, joka nimeää
 * kartan kohteen (`kohde`-kenttä — Kastrin kylä → Delfoi, Antikythera-
 * kone → Antikythera), EI saa omaa merkkiä: kaksi merkkiä samassa
 * pisteessä oli juuri se tuplamerkki, jonka takia luettu piste ennen
 * "astui sivuun". Noston tarina ei silti katoa — se aukeaa kohteen
 * OMASTA tietoruudusta Livian leikekirjan nappina (piirraKohteenNosto).
 *
 * Haku on rekisteröity takaisinkutsu (js/fokusnosto.js kytkeFokusnosto):
 * nostopoolit asuvat niputusjärjestyksessä tämän moduulin jäljessä,
 * joten suora tuonti kääntäisi järjestyksen väärin päin — sama syy
 * kuin lisäkohteiden rekisterillä (rekisteroiLisakohteet).
 */
let kohdeNostoHaku = null;

export function asetaKohdeNostot(hae) {
  kohdeNostoHaku = typeof hae === 'function' ? hae : null;
}

/** Kohteeseen kiinnitetty täkynosto tietoruudun napiksi, jos sellainen on. */
function piirraKohteenNosto(ui, sisalto, kohde) {
  const nosto = kohdeNostoHaku?.(ui, kohde.id);
  if (!nosto?.otsikko || typeof nosto.avaa !== 'function') return;
  const nappi = html('button', 'fokuskohde-leikekirja');
  nappi.type = 'button';
  nappi.appendChild(html('span', 'fokuskohde-leikekirja-otsake', 'Livian leikekirja'));
  // Klikkiotsikko on napin sisältö — se on koukku, jonka lupaus
  // lunastetaan noston omassa kortissa (js/fokusnosto.js).
  nappi.appendChild(html('span', 'fokuskohde-leikekirja-otsikko', nosto.otsikko));
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    suljeFokuskohde(ui);
    nosto.avaa(ui);
  });
  sisalto.appendChild(nappi);
}

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

/**
 * YHDEN KOHTEEN SISUS — kaikki se, mikä otsikon alle kuuluu.
 *
 * Erotettu omaksi funktiokseen 31.8.2026 yhdistetyn merkin lehteä
 * varten; yhdistely purettiin saman päivän illalla, mutta jako jäi,
 * koska se pitää kortin rungon (avaaFokuskohde) luettavana. Rivit ovat
 * täsmälleen entiset ja entisessä järjestyksessä.
 */
function piirraKohteenSisus(ui, sailio, kohde) {
  // Kuvat ja niiden mukana "Koe ihme" -nappi: nappi piirtyy kortin
  // ENSIMMÄISEN kuvan alle (piirraKohdeKuvat), ei otsikon alle.
  piirraKohdeKuvat(ui, sailio, kohde);
  piirraKohdeTeksti(ui, sailio, kohde);
  piirraKohdeKysymykset(ui, sailio, kohde);
  piirraKierrosnappi(ui, sailio, kohde);
  piirraKohteenNosto(ui, sailio, kohde);
  // Tekstin lähderivi samalla apurilla kuin kuvien (2.9.2026).
  if (kohde.lahde) {
    sailio.appendChild(taytaLahderivi(html('p', 'fokuskohde-lahde'),
      kohde.lahde, kohde));
  }
  /*
   * REAKTIOT LÄHDERIVIN PERÄÄN (js/reaktiot.js): peukku ja
   * virheilmoitus samasta kortista, jossa teksti on. Tunniste on
   * kohteen oma id, joka on sama kaikissa kaupungeissa — kohde ei
   * kuulu yhdelle kaupungille (ks. pakettien lohkon alku).
   */
  piirraReaktiot(sailio, kohdeReaktioTunniste(kohde), { otsikko: kohde.nimi });
}

/* ============ YHDISTETYN MERKIN LEHTI PURETTIIN (31.8.2026) =======
 *
 * Kortilla oli 31.8.2026 aamusta iltaan kaksi asua: yhden kohteen sisus
 * ja yhdistetyn merkin lehti, jossa jokainen jäsen oli oma osionsa
 * (`piirraRyhmanOsiot`, `piirraOsionOtsikko`). Kun kartan yhdistely
 * purettiin saman päivän illalla (kohdeKarttarivit, js/fokusniput.js),
 * yhdistettyjä merkkejä ei enää synny, eikä kuoria siis ole avattavaksi
 * — osiolatoja jäi koodiin ilman ainoatakaan kutsujaa.
 *
 * `piirraKohteenSisus` JÄI, vaikka se erotettiin omaksi funktiokseen
 * juuri osioita varten: se on nyt kortin ainoa runko, ja jako pitää
 * `avaaFokuskohde`-funktion luettavana.
 */

export function avaaFokuskohde(ui, kohde) {
  if (typeof document === 'undefined' || !kohde) return null;
  /*
   * LISÄKOHDE AVAA OMAN KORTTINSA (YHTENÄINEN KOHDEMALLI): täkynoston
   * ja syvennystarinan merkki on kartalla tavallinen kohdemerkki, mutta
   * napautus avaa niiden oman kortin — lunastuksen tai tarinan visoineen
   * — eikä kohteiden tietoruutua. Avaaja hoitaa äänensä itse.
   */
  if (typeof kohde.avaa === 'function') {
    kohde.avaa(ui);
    return null;
  }
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
  piirraKohteenSisus(ui, sisalto, kohde);
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
      // Myös osion oma suurennos (ks. KOHDE_SUURENNOSAVAIMET).
      if (KOHDE_SUURENNOSAVAIMET.some((avain) => ui?.[avain])) return;
      tapahtuma.stopPropagation();
      suljeFokuskohde(ui);
    }
  };
  const ulos = (tapahtuma) => {
    if (popup.contains(tapahtuma.target)) return;
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
    /*
     * SULKEVA NAPAUTUS EI AVAA MITÄÄN UUTTA (omistaja 31.8.2026:
     * *"jos näkyvillä on jokin nosto popup ja pelaaja klikkaa popupin
     * ulkopuolelta karttaa, niin popup pitäisi aina sulkeutua, mutta
     * mitään uutta ei saisi koskaan aueta samalla napautus kerralla
     * vaikka pelaaja klikkaisi kartalla jotain toista kohdetta"*).
     *
     * Ennen tässä oli poikkeus `.fokuskohde` — toisen merkin napautus
     * VAIHTOI kohdetta, ja kortti vaihtui sormen alta toiseksi. Nyt
     * napautus vain sulkee, ja seuraava napautus avaa normaalisti.
     *
     * NIELU ON TÄSSÄ, EI AVAAJISSA. Tämä on koko napautusketjun juuri
     * kortin kannalta: ainoa käsittelijä, joka näkee sulkevan
     * napautuksen ennen ketään muuta (document + kaappausvaihe).
     * Vaihtoehto olisi ripotella "onko kortti auki" -ehto jokaiseen
     * avaajaan erikseen — kohdemerkkiin, kaupungin laattaan,
     * kohderenkaaseen, poltettuun kaupunginnimeen, nipun kuoreen —
     * ja seuraava uusi avaaja unohtaisi sen taas. Yksi nielu kattaa
     * ne kaikki, myös ne, joita tämä paketti ei saa koskea
     * (js/laattapyramidi.js, js/karttanimet.js).
     *
     * VAIN KARTALTA (`#board`): omistajan sääntö koskee napautusta
     * *kartalle*. Kartan ulkopuoliset painikkeet — zoomirivi,
     * matkustusnapit, valikot — pitävät entisen käytöksensä, eikä
     * kortin sulkeminen syö niiltä painallusta.
     *
     * VETO EI OLE NAPAUTUS EIKÄ NIELU KOSKE SIIHEN. Nielu odottaa
     * CLICKIÄ napautuksen KOHDALTA ja vain puolen sekunnin ajan
     * (ui-apurit nielaiseSulkevaNapautus): kynnyksen ylittänyt veto ei
     * tuota clickiä lainkaan, ja kartan oma raahausvahti nielee senkin
     * (js/kartta.js raahattiin). Vetoele käyttäytyy siis täsmälleen
     * kuten ennen tätä muutosta — myös se mitattu yksityiskohta, että
     * kortin sulkeva veto itse ei vielä panoroi (sulku tapahtuu
     * pointerdownissa); se on vanhaa käytöstä eikä nielun seurausta.
     */
    if (tapahtuma.target?.closest?.('#board')) nielaiseSulkevaNapautus(tapahtuma);
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
