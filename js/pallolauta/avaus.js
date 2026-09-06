/*
 * PALLOLAUDAN AVAUSLENTO — Lontoo → aloituskaupunki karttapallolla
 * (vaihe 5b, docs/moduulit/karttapallo.md luku 4 rivi "Aloituslento
 * Lontoosta" ja luku 7 vaihe 5).
 *
 * ── MIKÄ TÄMÄ ON JA MIKÄ EI ───────────────────────────────────────
 *
 * Avauslennon KOREOGRAFIA — pergamenttiarkki, kamera-ajo rajaukseen,
 * kertojan luenta, matkustamon äänimaisema, repliikin kirjoitus,
 * isoisän valokuva, ohitusnuoli, saapumiskortti ja pöllön kuplat — on
 * yhdessä paikassa js/ui.js:ssä (aloituslentoSisalla) kummallekin
 * laudalle. Tämä moduuli on sen LAUDAN OMA OSA, täsmälleen samalla
 * jaolla kuin siirrossa (js/ui.js nappulanKuljettaja,
 * js/pallolauta/siirto.js): ui.js kertoo mitä tapahtuu ja milloin,
 * lauta kertoo miltä se näyttää.
 *
 * Kohtauksen sopimus (js/ui.js aloituslennonKohtaus):
 *   rajaus        { x, y, leveys } laudan yksiköissä — null tarkoittaa,
 *                 ettei tällä laudalla voi lentää (silloin vanha kalvo)
 *   valmistele()  lauta lennon tilaan (niukat nimet, kaari, tarkka laatu)
 *   odotaKartta() valinnainen: laudan oma "kartta on valmis" arkin takana
 *   rakenna()     kone kiitoradalle kamera-ajon jälkeen
 *   lenna(kesto)  { animaatiot, perilla } — kone matkaan
 *   poistuma()    kohtaus häipyy saapumiskortin alla
 *   pura()        kohtaus pois, lauta takaisin pelitilaan (idempotentti)
 *
 * ── KONE JA KAARI OVAT SAMAT KUIN MUUSSAKIN LENNOSSA ──────────────
 *
 * Kaari on arcsData (js/pallolauta/reitit.js) ja kone pelin oma
 * DOM-elementti kotelon päällä (js/pallolauta/siirto.js) — sama
 * lentokaari, sama isoympyrä, sama koneen piirros ja sama rAF-silmukka
 * kuin vaiheen 2 lennolla. Kuljettaja pyydetään ui.nappulanKuljettajalta
 * (`{ lento: true }`), jolloin sama sopimus palvelee molempia lentoja
 * eikä koneen kuljetusta ole kahdessa paikassa.
 *
 * ── KOLME OMISTAJAN TILAUSTA 5.9.2026 KLO 00.35 ───────────────────
 *
 * Uusi kaappaus samasta lennosta (v1601), sanatarkasti:
 * *"lentokonekohtauksessa kartta voi näkyä ilman sumennusta.
 * lentokoneen ei tarvitse kääntyä alussa vaan voi lehtää heti oikeaan
 * suuntaa ja jättää paksun punaisen viivan. isoisän kuva pitää
 * häivyttää joka reunastaan läpinäkyväksi ja tehdä vähän isommaksi"*
 *
 *   1. SUMENNUS POIS — niukkuusharso poistettiin pallolta kokonaan
 *      (js/pallolauta/lauta.js aloitaLentotila), ja koska kartta on nyt
 *      näkyvissä terävänä, `valmistele` PYYTÄÄ TARKAN LAATUTILAN koko
 *      lennon ajaksi (`pakotaPallonLaatu`, js/pallo.js) ja `pura`
 *      vapauttaa sen laskeutumisessa.
 *   2. SUORA LÄHTÖ — koneen asento luetaan kaaresta eikä edellisestä
 *      kehyksestä, ja käännöksen kesto on nolla (js/pallolauta/siirto.js
 *      KONEEN_KAANNOKSEN_MS). Kone on lentosuunnassa jo ilmestyessään,
 *      ja paksu viiva alkaa kasvaa samalla kehyksellä kuin lento.
 *   3. ISOISÄN KUVA — kortin koko ja reunojen häivytys ovat css
 *      (.lento-valokuva), ei tämän moduulin asia.
 *
 * ══════════════════════════════════════════════════════════════════
 * KAMERA SEURAA KONETTA JA ZOOMAA KOKO LENNON AJAN (omistaja 6.9.2026
 * aamupäivä)
 * ══════════════════════════════════════════════════════════════════
 *
 * Sanatarkasti: *"Lentokonekohtauksessa paljon lähempi zoom aste ja
 * kamera seuraa konetta. Kartta myös zoomaa koko ajan pikkuhiljaa
 * lähemmäs konetta. Pallon ei tarvitse siis liikkua lentokohtauksessa."*
 *
 * MIKÄ MUUTTUI. Ennen tätä avauslento oli YKSI RAJAUS: kaupunkiparin
 * laatikko (siirto.js lennonRajaus) omalla marginaalillaan
 * (AVAUSLENNON_RAJAUKSEN_MARGINAALI 0,2), ja sen päälle hidas pyörintä
 * (AVAUSLENNON_PYORINTA_AST 5°), jonka kamera teki tavallisena
 * kamera-ajona. Kuva oli siis koko lennon ajan niin kaukana, että
 * molemmat päät mahtuivat siihen — Lontoo → Ateena 1 306 lautayksikköä
 * (39,2°) työpöydällä ja 1 113 (33,4°) puhelimella. Kone oli sen
 * kokoinen kuin kone kartalla on: pieni merkki isolla kartalla.
 *
 * NYT KUVA ON KONEEN KUVA. Kamera lähtee LÄHTÖKAUPUNGIN yltä
 * (AVAUSLENNON_ALKULEVEYS, 600 lautayksikköä ≈ 18°) ja pitää koneen
 * ruudun keskellä joka kehyksellä: pallon oma pyörintä ei tee mitään,
 * vaan LIIKE SYNTYY KAMERAN SEURANNASTA. Reitin toinen pää ei ole
 * kuvassa, eikä sen tarvitse olla — jälki on jälki, ja se kertoo mistä
 * kone tuli.
 *
 * KOLME LUKUA JA KAKSI KÄYRÄÄ:
 *
 *   AVAUSLENNON_ALKULEVEYS          näkymän leveys lennon alussa
 *   PALLOLAUDAN_SAAPUMISLEVEYS      näkymän leveys perillä (kamera.js)
 *   AVAUSLENNON_SEURANNAN_VIIVE_MS  seurannan silotus
 *
 * Korkeus liukuu alusta loppuun LOGARITMISESTI (silmä lukee zoomista
 * suhteen, ei erotusta) `liukuPehmennys`-käyrällä: pehmeä lähtö, pehmeä
 * pysähdys, välissä lähes tasainen. Paikka silotetaan eksponentiaalisesti
 * kohti koneen omaa lat/lng:tä, jottei kuva nykäise, jos pelaaja on
 * ehtinyt vetää palloa ennen lähtöä — ja viimeisellä kehyksellä kamera
 * asetetaan TÄSMÄLLEEN koneen kohdalle, ettei silotuksen jälkijättö jää
 * näkyviin laskeutumiseen.
 *
 * KONE EI KUITENKAAN OLE TASAN KESKELLÄ. Isoisän valokuva kelluu
 * kuvan vasemmassa laidassa ja on kapealla ruudulla 37,5 vw leveä, eli
 * se ylittää keskiviivan: keskellä lentävä kone jäisi kortin taakse
 * koko lennoksi (mitattu 390 × 844). Kamera tähtää siksi
 * AVAUSLENNON_KONEEN_NOSTOn verran koneen eteläpuolelle — kone ratsastaa
 * hitusen keskilinjan yläpuolella, ja kuvaan jää enemmän sitä maata,
 * jota kohti se lentää. Nosto ajetaan sisään ja ulos trapetsilla
 * (AVAUSLENNON_NOSTON_RAMPPI), joten kamera ei loikkaa arkin väistyessä
 * eikä laskeutuessa.
 *
 * LOPPUKORKEUS ON SAAPUMISNÄKYMÄ, EIKÄ SIIRTYMÄ HYPI. Laskeutumisessa
 * kuljettaja ajaa kameran kohdekaupunkiin saapumisnäkymään
 * (js/pallolauta/siirto.js laske → kamera.kotiin,
 * PALLOLAUDAN_SAAPUMISLEVEYS). Lennon zoomi päättyy TÄSMÄLLEEN samaan
 * korkeuteen samassa paikassa, joten tuo ajo on nolla-ajo: kamera.js
 * tunnistaa liikkumattoman ajon ja kirjoittaa näkymän kerralla.
 *
 * LÄHIN KORKEUS ON LAATTOJEN, EI TÄMÄN MODUULIN. Molemmat päät
 * lasketaan `kamera.kameranKohde`lla, joka sitoo korkeuden laitteen ja
 * laattaluettelon syvimmän tason rajaan (kamera.js lahinKorkeus). Jos
 * raja purisi, lento zoomaa siihen asti eikä sen läpi.
 *
 * REDUCED MOTION: KAMERA HYPPÄÄ KOHTEESEEN. Kone ei lennä lainkaan
 * (siirto.js hyppaa), joten seurannallakaan ei ole mitään seurattavaa:
 * `rajaus` on silloin suoraan kohdekaupungin saapumisnäkymä, ja ui.js
 * asettaa sen kerralla arkin takana.
 *
 * LAATAT ETUKÄTEEN KORIIN. Lähempi kuva pyytää syvempiä laattoja (Z7 ja
 * lopussa Z8) pitkin koko reittiä, eikä laattamoottori hae mitään ennen
 * kuin kamera on jo siellä. Siksi `valmistele` lähettää koneen reitin
 * käytävän palvelutyöntekijälle heti (js/pallo.js esilataaLentoreitti) —
 * arkin takana on sekunteja aikaa, ja kori on lennon alkaessa valmis.
 */

import { esilataaLentoreitti, pakotaPallonLaatu } from '../pallo.js';
import { pixelOf } from '../rules.js';
import { hypynVaihe } from '../siirtokoreografia.js';
import { PALLOLAUDAN_SAAPUMISLEVEYS, asteetLeveydesta, leveysKorkeudesta } from './kamera.js';
import { REITIN_KORKEUS, lentokaarenKohta } from './reitit.js';

/**
 * NÄKYMÄN LEVEYS LENNON ALUSSA (lautayksikköä ruudun leveydellä;
 * 600 ≈ 18°). Omistaja 6.9.2026: *"paljon lähempi zoom aste"*.
 *
 * MITTA. Vanha rajaus (kaupunkiparin laatikko marginaalilla 0,2) antoi
 * Lontoo → Ateena -lennolle 1 306 lautayksikköä työpöydällä (39,2°) ja
 * 1 113 puhelimella (33,4°) — molemmat päät kuvassa, kone pieni.
 * Puolittaminen on juuri se "paljon lähempi": 600 yksikköä näyttää
 * lähtökaupungin ympäristön (Etelä-Englanti ja Kanaali kokonaan), ja
 * koska kamera seuraa konetta, kuvaan ei tarvitse mahtua muuta.
 * Loppuleveys on saapumisnäkymä 240, joten lento zoomaa 2,5-kertaisesti
 * — tasainen, hidas lähentyminen koko lennon mitalla (4,8–20 s).
 */
export const AVAUSLENNON_ALKULEVEYS = 600;
/**
 * SEURANNAN SILOTUS (ms): kamera hakeutuu koneen kohdalle
 * eksponentiaalisesti tällä aikavakiolla. Kone itse kulkee jo pehmeällä
 * käyrällä (hypynVaihe), joten silotus ei ole liikkeen vaan LÄHDÖN
 * takia: jos pelaaja on vetänyt palloa ennen koneen lähtöä, kamera
 * liukuu koneen päälle eikä loikkaa. Lyhyt aikavakio pitää koneen
 * käytännössä ruudun keskellä (jälkijättö alle koneen levyisen).
 */
export const AVAUSLENNON_SEURANNAN_VIIVE_MS = 260;
/**
 * KONE EI RIDE RUUDUN KESKELLÄ VAAN HITUSEN SEN YLÄPUOLELLA — osuus
 * näkyvän alueen KORKEUDESTA.
 *
 * SYY ON ISOISÄN VALOKUVA. Kortti (css .lento-valokuva) on kiinni
 * ruudun vasemmassa laidassa ja kelluu repliikin yläpuolella; kapealla
 * ruudulla se on 37,5 vw leveä, eli sen oikea reuna ylittää ruudun
 * keskiviivan. Mitattu Chromiumilla 6.9.2026 (390 × 844, dpr 3): kortti
 * peitti x 30…215, y 395…525, ja seuraava kamera piti konetta
 * täsmälleen kohdassa (195, 447) — kone oli kortin TAKANA koko lennon.
 * 0,15 nostaa sen 127 px ylemmäs puhelimella ja 120 px työpöydällä
 * (1280 × 800), eli kortin yläpuolelle kummallakin — ja samalla kuvaan
 * jää enemmän sitä maata, jota kohti kone lentää.
 */
export const AVAUSLENNON_KONEEN_NOSTO = 0.15;
/**
 * Noston sisään- ja ulosajo lennon osuutena. Nosto EI saa olla päällä
 * lennon päissä: alussa kamera on jo rajauksessa (lähtökaupunki keskellä)
 * ja loikkaisi noston verran arkin väistyessä, ja lopussa kameran on
 * päädyttävä TÄSMÄLLEEN saapumisnäkymään, jottei laskeutumisen ajo
 * (siirto.js laske → kamera.kotiin) siirrä kuvaa. Trapetsi nousee ja
 * laskee samalla pehmennyksellä kuin zoomi.
 */
export const AVAUSLENNON_NOSTON_RAMPPI = 0.15;
/**
 * PAKSU PUNAINEN VIIVA KUTEN ETUSIVULLA (omistaja 5.9.2026: *"lentokone
 * saisi tehdä saman paksun viivan kuin etusivulla"*). Etusivun viiva on
 * css .etusivupallo-viiva, stroke-width 11 — ja tämä on sama luku.
 *
 * PATHSTROKE ON RUUTUPIKSELEITÄ, EI ASTEITA. Mitattu Chromiumilla
 * 5.9.2026: Globe.gl 2.46 rakentaa viivan Line2:na, jonka
 * LineMaterialissa `worldUnits` on epätosi ja `resolution` on kotelon
 * KOKO CSS-pikseleinä (mitattu 374 × 777) — varjostin laskee
 * `offset *= linewidth; offset /= resolution.y`, eli luku on
 * css-pikseleitä ruudulla. Ensimmäinen toteutus laski paksuuden
 * asteina (0,89) tämän moduulin kommenttien mukaan, ja viiva jäi alle
 * pikselin levyiseksi eli näkymättömiin. Samat "asteina"-kommentit
 * olivat myös reitit.js:n ja linssien paksuusvakioissa
 * (MATKAREITIN_PAKSUUS_AST 0,05 jne.); ne on sittemmin korjattu
 * `_PX`-nimisiksi ruutupikseleiksi (karttapallo.md luku 10.3,
 * "Viivapaksuudet pallolla"). Sama mittaus osoitti myös, ettei
 * laitepikselisuhde vaikuta lukuun: 11 piirtyi puhelimella (dpr 2)
 * 22 laitepikseliä eli tasan 11 css-pikseliä.
 */
export const AVAUSLENNON_VIIVAN_PX = 11;
/** Jäljen pisteitä koko kaarella; kasvava jälki saa niistä osuutensa. */
export const AVAUSLENNON_JALJEN_PISTEET = 64;
/**
 * Reitin näytteitä laattojen esilatausta varten. 24 näytettä on
 * Lontoo → Ateena -mitalla noin 100 km:n välein, eli tiheämmin kuin
 * yksi Z7-laatta (2,8° ≈ 250 km) — käytävään ei jää reikiä.
 */
export const AVAUSLENNON_REITTINAYTTEET = 24;

/**
 * Pehmennys pitkille liu'uille: liikkeelle ja pysähdykseen pehmeästi,
 * välissä lähes tasainen. Ei siirtoajon trapetsia — se on tehty lyhyille
 * kamera-ajoille, ei koko lennon mittaiselle zoomille. Sama käyrä
 * hidastaa aloitusvalinnan pyörinnän (js/pallolauta/lauta.js).
 */
export function liukuPehmennys(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/**
 * Koneen noston trapetsi: nolla lennon päissä, täysi keskellä. Sama
 * pehmennys molemmissa päissä, joten nosto ei nytkähdä kumpaankaan
 * suuntaan (ks. AVAUSLENNON_NOSTON_RAMPPI).
 */
export function nostonOsuus(t, ramppi = AVAUSLENNON_NOSTON_RAMPPI) {
  if (!(t > 0) || t >= 1) return 0;
  return Math.min(liukuPehmennys(t / ramppi), liukuPehmennys((1 - t) / ramppi));
}

/** Lyhin kierto pituuspiirin suunnassa (−180…180) — kuten kamera.js. */
function lyhinLng(alusta, kohteeseen) {
  let d = kohteeseen - alusta;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

/**
 * Avauslennon kohtaus pallolle. `lahto` ja `kohde` ovat laudan
 * kaupunkeja (js/game.js board.cityById).
 */
export function luoAloituslennonKohtaus({ ui, lauta, lahto, kohde }) {
  const { board } = ui.game;
  if (!board || !lahto || !kohde || lahto.id === kohde.id) return null;
  const lahtoPos = { type: 'city', city: lahto.id };
  const kohdePos = { type: 'city', city: kohde.id };
  let kuljettaja = null;
  let purettu = false;
  let jalkiKehys = 0;
  let laatuPyydetty = false;
  let seuranta = null; // { kehys, maali } kesken olevalle seurannalle

  /**
   * Kameran näkymä kaupungin yllä annetulla leveydellä:
   * { lat, lng, altitude }. Korkeuden sitominen laattojen tarkkuuteen
   * tapahtuu kamerassa (kamera.js kameranKohde → lahinKorkeus), joten
   * lento ei koskaan pyydä lähempää kuin lauta antaa.
   */
  const nakyma = (pos, leveys) => lauta.kamera.kameranKohde({ ...pixelOf(board, pos), leveys });

  /** Kotelon kuvasuhde (leveys / korkeus) — luetaan kutsuttaessa. */
  const kuvasuhde = () => Math.max(
    0.01, (lauta.kotelo?.clientWidth || 1) / (lauta.kotelo?.clientHeight || 1),
  );
  /** Näkyvän alueen KORKEUS asteina annetulla kameran korkeudella. */
  const nakyvaKorkeusAst = (altitude) => {
    const suhde = kuvasuhde();
    return asteetLeveydesta(leveysKorkeudesta(altitude, { kuvasuhde: suhde })) / suhde;
  };

  /*
   * LENTO ALKAA LÄHTÖKAUPUNGIN YLTÄ, EI KAUPUNKIPARIN LAATIKOSTA
   * (omistaja 6.9.2026). Kamera seuraa konetta, joten rajaus on koneen
   * lähtöpaikka ja lennon alkuleveys — laatikkoa ei enää tarvita.
   *
   * Reduced motionissa kone ei lennä lainkaan, joten kamera hyppää
   * suoraan kohteeseen: rajaus on silloin kohdekaupungin
   * saapumisnäkymä, eli täsmälleen se kuva, johon liikkuva lento
   * päättyisi.
   */
  const rajaus = ui.reducedMotion
    ? { ...pixelOf(board, kohdePos), leveys: PALLOLAUDAN_SAAPUMISLEVEYS }
    : { ...pixelOf(board, lahtoPos), leveys: AVAUSLENNON_ALKULEVEYS };

  /** Kaaren geometria koneelle ja jäljelle (sama olio molemmille). */
  const lentokaari = () => lauta.reitit.lentokaari(lahto, kohde);

  /**
   * Koko kaari pisteinä [lat, lng, korkeus]. Lista tehdään KERRAN ja
   * annetaan viivakerrokselle sellaisenaan; kasvu hoidetaan katkoviivan
   * osuudella (reitit.js jalki), koska geometrian uudelleenkirjoitus
   * joka kehys jätti viivan Lontoon viereen (mitattu 5.9.2026).
   */
  const kaarenPisteet = (kaari) => {
    const pisteet = [];
    for (let i = 0; i <= AVAUSLENNON_JALJEN_PISTEET; i += 1) {
      const k = lentokaarenKohta(kaari, i / AVAUSLENNON_JALJEN_PISTEET, REITIN_KORKEUS);
      pisteet.push([k.lat, k.lng, k.korkeus]);
    }
    return pisteet;
  };

  /** Reitin näytepisteet laattojen esilataukselle ({ lat, lon }). */
  const reitinPisteet = (kaari) => {
    const pisteet = [];
    for (let i = 0; i <= AVAUSLENNON_REITTINAYTTEET; i += 1) {
      const k = lentokaarenKohta(kaari, i / AVAUSLENNON_REITTINAYTTEET);
      pisteet.push({ lat: k.lat, lon: k.lng });
    }
    return pisteet;
  };

  /** Seuranta seis; ohituksessa kamera viedään samalla maaliin. */
  const paataSeuranta = (maaliin = false) => {
    if (!seuranta) return;
    const oma = seuranta;
    seuranta = null;
    cancelAnimationFrame(oma.kehys);
    if (maaliin && oma.maali) lauta.pallo.pointOfView(oma.maali, 0);
  };

  /*
   * ══════════════════════════════════════════════════════════════════
   * KAMERA SEURAA KONETTA JA ZOOMAA (omistaja 6.9.2026)
   * ══════════════════════════════════════════════════════════════════
   *
   * Oma rAF-silmukkansa eikä kamera-ajo: ajo on matka pisteestä toiseen
   * (kohde tiedetään etukäteen), tämä on SEURANTA, jonka kohde lasketaan
   * joka kehyksellä koneen omasta kellosta ja omasta kaaresta
   * (hypynVaihe + lentokaarenKohta — samat kaksi kaavaa kuin koneella ja
   * jäljellä). Kolme yhtä aikaa piirtyvää asiaa, yksi totuus.
   *
   * Kuljettajan oma kamera-ajo (siirto.js hyppaa, LENNON_KAMERA_MS)
   * pysäytetään samassa kehyksessä: se ajaisi kaupunkiparin laatikkoon,
   * jota avauksessa ei enää käytetä.
   *
   * ELE EI KILPAILE TÄMÄN KANSSA. Tavallinen kamera-ajo pysähtyy
   * sormeen (kamera.js kuuntelee koteloa), mutta lennon ajan kotelon
   * päällä on koko ruudun lentokalvo (js/ui.js `.flight-overlay`), joka
   * ottaa napautuksen ja OHITTAA lennon. Pallo ei siis ole vedettävissä
   * lennon aikana, eikä seuranta voi jäädä tappelemaan pelaajan kanssa;
   * ohitus vie kameran maaliin (`paataSeuranta(true)`).
   */
  const seuraaKonetta = (kaari, kesto, alkuhetki) => {
    const kamera = lauta.kamera;
    kamera.pysaytaKameraAjo();
    const alkuKorkeus = nakyma(lahtoPos, AVAUSLENNON_ALKULEVEYS)?.altitude;
    const maali = nakyma(kohdePos, PALLOLAUDAN_SAAPUMISLEVEYS);
    if (!(alkuKorkeus > 0) || !(maali?.altitude > 0)) return;
    const nyt = kamera.kameranTila();
    let lat = Number.isFinite(nyt?.lat) ? nyt.lat : kaari.alku.lat;
    let lng = Number.isFinite(nyt?.lng) ? nyt.lng : kaari.alku.lng;
    let edellinen = alkuhetki;
    const oma = { kehys: 0, maali };
    seuranta = oma;
    const askel = (hetki) => {
      if (seuranta !== oma) return;
      if (purettu || ui.dead) { paataSeuranta(); return; }
      const t = Math.min(1, (hetki - alkuhetki) / Math.max(1, kesto));
      const kohta = lentokaarenKohta(kaari, hypynVaihe(t).e);
      /*
       * KEHYSVÄLIÄ EI KATKAISTA (toisin kuin aloitusvalinnan
       * pyörinnässä, lauta.js): siellä dt KERTOO liikkeen, joten pitkä
       * väli hypäyttäisi palloa; tässä dt vain kertoo, kuinka pitkälle
       * kamera ehtii koneen perään, ja eksponentti kyllästyy itsestään
       * (pitkä väli → osuus ≈ 1 → kamera napsahtaa koneen kohdalle).
       * Katkaisu tekisi päinvastoin: hitaalla kehysvälillä jälkijättö
       * kasvaisi joka kehyksellä. Mitattu kontin ohjelmistorasteroijalla
       * 6.9.2026 (kehysväli ~250 ms): katkaisun kanssa kone oli
       * lennon vauhdikkaimmassa kohdassa 186 px sivussa kotelon
       * keskeltä; ilman katkaisua sama silmukka pitää koneen
       * enimmillään 37 px:n päässä keskipisteestä. Oikealla laitteella
       * (60 kehystä sekunnissa) ero on olematon — jälkijättö on siellä
       * aikavakion mittainen kummallakin tavalla.
       */
      const dt = Math.max(0, hetki - edellinen);
      edellinen = hetki;
      if (t >= 1) {
        lat = kohta.lat;
        lng = kohta.lng;
      } else {
        const osuus = 1 - Math.exp(-dt / AVAUSLENNON_SEURANNAN_VIIVE_MS);
        lat += (kohta.lat - lat) * osuus;
        lng += lyhinLng(lng, kohta.lng) * osuus;
      }
      const e = liukuPehmennys(t);
      const altitude = Math.exp(
        Math.log(alkuKorkeus) + (Math.log(maali.altitude) - Math.log(alkuKorkeus)) * e,
      );
      /*
       * NOSTO KIRJOITETAAN VASTA TÄSSÄ, EI SILOTUKSEN TILAAN. Silotus
       * seuraa konetta; nosto on kuvan rajaus, ja koska se lisätään
       * vasta kirjoitettaessa, viimeinen kehys (t = 1, nosto 0) osuu
       * täsmälleen saapumisnäkymään.
       */
      const nosto = nostonOsuus(t) * AVAUSLENNON_KONEEN_NOSTO * nakyvaKorkeusAst(altitude);
      lauta.pallo.pointOfView({ lat: Math.max(-89.5, Math.min(89.5, lat - nosto)), lng, altitude }, 0);
      if (t < 1) { oma.kehys = requestAnimationFrame(askel); return; }
      seuranta = null;
    };
    lauta.heraa();
    oma.kehys = requestAnimationFrame(askel);
  };

  return {
    rajaus,

    valmistele() {
      /*
       * NIUKKA LAUTA ENNEN KAMERA-AJOA, kuten tasokartalla: kahden
       * nimen sääntö on voimassa jo silloin kun kuva asettuu
       * rajaukseen, eikä nimiä ehdi ladota kesken liikkeen. Harsoa ei
       * ole (omistaja 5.9.2026 klo 00.35), joten niukkuus on vain tämä.
       */
      lauta.lento.aloita({ lahto, kohde });
      /*
       * TARKAT LAATAT KOKO LENNON AJAN (omistaja 5.9.2026 klo 00.35:
       * *"lentokonekohtauksessa kartta voi näkyä ilman sumennusta"*).
       * Harso on poissa, joten laattakartta on lennon pääosassa — eikä
       * se saa olla liikkeen ajan lepolaatua karkeampi juuri silloin,
       * kun kamera seuraa konetta koko lennon läpi. Sama vipu kuin
       * keksintölinssin ajolla (js/pallo.js pakotaPallonLaatu, omistaja
       * 5.9.2026: *"pidä kokoajan terävä tila päällä"*); pyytäjiä
       * lasketaan, joten vapautus `pura`:ssa ei voi sammuttaa toisen
       * pyytäjän terävyyttä.
       */
      if (!laatuPyydetty) {
        laatuPyydetty = true;
        pakotaPallonLaatu(true);
      }
      /*
       * ELÄVÄ KAARI, EI LAATTOJEN LENTOREITTI (omistaja 1.9.2026:
       * *"Piirretään ne näkyviin reaaliajassa vasta sitten jos pelaaja
       * päättää mennä lentokoneella."*). lentoKaari on sama lippu, jolla
       * doFly sytyttää kaaren katkojäljen kiertämään — avauslento on
       * pelin ensimmäinen lento eikä ansaitse omaa merkintätapaa.
       */
      ui.lentoKaari = { a: lahto.id, b: kohde.id };
      /*
       * REITIN LAATAT KORIIN HETI (omistaja 6.9.2026, ks. moduulin
       * otsikko): lähempi kamera pyytää lennon aikana Z7:ää ja lopussa
       * Z8:aa pitkin koko kaarta, ja laattamoottori hakee vasta kun
       * kamera on jo paikalla. Tämä on ainoa hetki, jolloin haku ehtii
       * tapahtua pergamenttiarkin takana. Ilman palvelutyöntekijää
       * (yhden tiedoston versio, kehitys) kutsu ei tee mitään.
       */
      const kaari = lentokaari();
      if (kaari) void esilataaLentoreitti(reitinPisteet(kaari));
      lauta.paivita();
    },

    /*
     * KARTTA VALMIIKSI ENNEN FEIDIÄ, PALLON MITALLA (omistaja 3.9.2026:
     * *"kartta pitää ladata etukäteen, nyt se rakentui pikkuhiljaa
     * taustalla valmiiksi."*).
     *
     * Tasokartalla odotus on laattapyramidin oma (js/laattapyramidi.js
     * odotaPyramidi): se tietää, montako näkyvän alueen laattaa on yhä
     * kesken. Globe.gl:n laattamoottori ei kerro siitä mitään, joten
     * pallon mitta on TEKSTUURIEN MÄÄRÄ: jokainen saapunut laatta on
     * yksi tekstuuri lisää, ja kun luku ei enää kasva kahteen
     * peräkkäiseen näytteeseen, näkymä on valmis. Katto on pakollinen
     * samasta syystä kuin kartalla — yksi saapumatta jäävä laatta ei saa
     * jättää pergamenttiarkkia ruudulle. Ohitus katkaisee odotuksen:
     * kiirehtivä pelaaja ei jää katsomaan arkkia.
     */
    async odotaKartta({ katto = 6000, keskeytys = null } = {}) {
      const takaraja = performance.now() + katto;
      let edellinen = -1;
      let vakaita = 0;
      while (!ui.dead && !keskeytys?.() && performance.now() < takaraja) {
        const n = lauta.pallo?.renderer?.()?.info?.memory?.textures ?? 0;
        if (n > 1 && n === edellinen) {
          vakaita += 1;
          if (vakaita >= 2) break;
        } else {
          vakaita = 0;
        }
        edellinen = n;
        // eslint-disable-next-line no-await-in-loop
        await new Promise((valmis) => { setTimeout(valmis, 120); });
      }
      // Kiinnitetty ei ole vielä maalattu: kaksi kehystä, sama varmistus
      // kuin kartalla (odotaPyramidi).
      await new Promise((valmis) => requestAnimationFrame(() => requestAnimationFrame(valmis)));
    },

    rakenna() {
      // Kamera on nyt rajauksessa: nimet ladotaan tähän kuvaan heti
      // eikä vasta lepoviiveen päästä, koska arkki väistyy pian.
      lauta.ladoHeti();
      kuljettaja = ui.nappulanKuljettaja(ui.game.player, { lento: true });
      kuljettaja.nosta();
      /*
       * KONE KIITORADALLE JO LENTOSUUNNASSA (omistaja 5.9.2026 klo
       * 00.35: *"lentokoneen ei tarvitse kääntyä alussa vaan voi lehtää
       * heti oikeaan suuntaa"*). Kaari annetaan `aseta`lle, jolloin
       * kuljettaja lukee asennon siitä eikä liikkeestä
       * (siirto.js koneenKulma): kone on ruudulla oikeassa asennossa jo
       * ennen kuin arkki väistyy, eikä lähdössä ole kaartoa.
       */
      kuljettaja.aseta(lahtoPos, lentokaari());
    },

    lenna(kesto) {
      if (!kuljettaja) return { animaatiot: [], perilla: Promise.resolve() };
      const kaari = lentokaari();
      const paksuus = AVAUSLENNON_VIIVAN_PX;
      const alkuhetki = performance.now();
      const perilla = kuljettaja.hyppaa(lahtoPos, kohdePos, kesto);

      // Kamera koneen perään samasta kellosta ja samasta kaaresta.
      if (!ui.reducedMotion && kaari) seuraaKonetta(kaari, kesto, alkuhetki);

      /*
       * ══════════════════════════════════════════════════════════════
       * PAKSU PUNAINEN VIIVA KONEEN PERÄSSÄ (omistaja 5.9.2026)
       * ══════════════════════════════════════════════════════════════
       *
       * Sanatarkasti: *"lentokone saisi tehdä saman paksun viivan kuin
       * etusivulla."* Jälki kasvaa samasta kellosta kuin kone
       * (hypynVaihe) ja samalla kaarella (reitit.js lentokaarenKohta),
       * joten viivan kärki on koneen alla koko lennon. Reduced motion:
       * kone ei lennä lainkaan, joten jälki piirretään kerralla
       * valmiiksi.
       *
       * (Osuus on kaaren PARAMETRI ja katko mitataan viivan PITUUDESTA;
       * kaaren korkeusnyppylä tekee näiden väliin muutaman prosentin
       * eron lennon puolivälissä. Silmä ei erota sitä, koska kone on
       * viivan kärjen kokoinen.)
       */
      const pisteet = kaari ? kaarenPisteet(kaari) : null;
      const piirraJalki = (e) => lauta.reitit.jalki(pisteet, { paksuus, osuus: e });
      const paataJalki = () => {
        cancelAnimationFrame(jalkiKehys);
        jalkiKehys = 0;
        if (kaari) piirraJalki(1);
      };
      if (kaari && ui.reducedMotion) {
        piirraJalki(1);
      } else if (kaari) {
        // Viiva alkaa lähdöstä eikä vasta ensimmäisestä kehyksestä:
        // kerros on olemassa samalla hetkellä kuin kone lähtee
        // (omistaja 5.9.2026: *"lehtää heti … ja jättää paksun punaisen
        // viivan"*).
        piirraJalki(hypynVaihe(0).e);
        const askel = (hetki) => {
          if (purettu || ui.dead) return;
          const t = Math.min(1, (hetki - alkuhetki) / Math.max(1, kesto));
          piirraJalki(hypynVaihe(t).e);
          jalkiKehys = t < 1 ? requestAnimationFrame(askel) : 0;
        };
        jalkiKehys = requestAnimationFrame(askel);
      }

      /*
       * OHITUS PUHUU SAMAA KIELTÄ MOLEMMILLA LAUDOILLA. js/ui.js:n
       * `ohitaLento` vie lennon animaatiot loppuun kutsulla `finish()`;
       * pallolla lento on rAF-silmukka, ja sen loppuun vienti on
       * kuljettajan `paata()` — jäljen sama loppuun vienti, ettei viiva
       * jäisi kasvamaan jo perillä olevan koneen perään, ja kameran
       * seurannan vienti maaliin, ettei kuva jää puoliväliin reittiä.
       */
      return {
        animaatiot: [{
          finish: () => {
            paataJalki();
            kuljettaja?.paata?.();
            paataSeuranta(true);
          },
        }],
        perilla,
      };
    },

    poistuma() { lauta.lento.poistuma(); },

    pura() {
      if (purettu) return;
      purettu = true;
      /*
       * VIIVA JÄÄ NÄKYVIIN LENNON PÄÄTYTTYÄ ja katoaa vasta tässä, kun
       * saapumiskortti on jo ruudulla ja lauta palaa pelitilaan.
       * Poistuminen on kerroksen oma siirtymä (reitit.js jalki palauttaa
       * pathTransitionDurationin), joten viiva häipyy pehmeästi eikä
       * välähdä pois.
       */
      cancelAnimationFrame(jalkiKehys);
      jalkiKehys = 0;
      lauta.reitit.jalki(null);
      // Seuranta seis ennen laskeutumista: kamera on jo saapumisnäkymässä
      // (sama korkeus ja sama paikka), joten kuljettajan `laske()`:n ajo
      // on nolla-ajo eikä siirtymä hypi.
      paataSeuranta(true);
      // Kone pois ja kamera sukeltaa kohdekaupunkiin (siirto.js laske).
      kuljettaja?.laske();
      kuljettaja = null;
      // Terävä tila vapautetaan laskeutumisessa: pallo palaa omaan
      // liike/lepo-rytmiinsä (js/pallo.js asetaTila).
      if (laatuPyydetty) {
        laatuPyydetty = false;
        pakotaPallonLaatu(false);
      }
      ui.lentoKaari = null;
      lauta.lento.paata();
    },
  };
}
