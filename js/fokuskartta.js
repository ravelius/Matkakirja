/*
 * FOKUSKARTTA — nykyisen maan esirenderöity topografia laudan päälle.
 *
 * Omistajan linjaus 24.8.2026 (Raamatun osio "Fokusmoodi"): *"nykyinen
 * maa tarkkana topografioineen"* ja *"PIIRTO: maakohtainen
 * esirenderöity topografia PD-datasta (Natural Earth, SRTM/ETOPO),
 * 1873-atlaksen akvarellityyliin"*.
 *
 * Kuvat tehdään tools/tee-fokuskartta.mjs:llä ja ne asuvat ämpärissä
 * kansiossa `fokus/` (js/media.js fokuskarttaUrl). Paria kohti kaksi
 * tiedostoa: GRC.webp ja GRC.json, jossa on kuvan paikka LAUDAN
 * koordinaatteina. Peli ei arvaa paikkaa vaan lukee sen.
 *
 * === KOLME SÄÄNTÖÄ ===
 *
 * 1. PUUTTUVA KUVA EI RIKO MITÄÄN. Jos maalle ei ole pohjaa tai lataus
 *    epäonnistuu, kerros jää tyhjäksi ja kaikki toimii kuten ennen
 *    tätä pakettia. Jokainen maa muistetaan käynnin ajaksi, joten
 *    puuttuvaa tiedostoa ei haeta uudestaan joka vuorolla.
 *
 * 2. KUVA ON TAITEEN PÄÄLLÄ MUTTA PELITILAN ALLA. Kerros on laudan
 *    bittikartan (js/mapart.js pilkoTaide) päällä ja kaupunkien,
 *    nimien, laattojen ja nappuloiden alla.
 *
 *    REITTEJÄ EI PIIRRETÄ UUDELLEEN KUVAN PÄÄLLE (omistaja 24.8.2026,
 *    pelitestipalaute v1095:stä: *"pelilaudan pisteet (reittien ympyrät
 *    ja katkoviivat) pois näkyvistä, jotta karttaan voi keskittyä"*).
 *    Aiemmin rajaukseen osuvat reitit vedettiin kuvan päälle, jottei
 *    pelitila jäisi kuvituksen alle; nyt lehti saa olla lehti. Liikkuminen
 *    ei kärsi: kohderenkaat (targetLayer) ovat oma kerroksensa kuvan
 *    PÄÄLLÄ, joten matkakohteet näkyvät ja ovat napautettavissa kuten
 *    ennenkin.
 *
 * 3. EI SUODATTIMIA. Sama iOS-sääntö kuin muillakin kartan kerroksilla
 *    (tests/rules.test.mjs): suodatettu kerros palaa taustalta tyhjänä.
 *    Kuva on <image>, ei mitään muuta.
 *
 * 4. KUVA ON OPAAKKI JA VIE ALUEENSA. Lehti peittää laudan oman
 *    grafiikan rajauksessaan, joten kaikki, mikä kuuluisi näkyä sen
 *    päällä, on nostettava kuvan päälle tai piilotettava. Peli
 *    piilottaa maan punaisen korostusrenkaan, sumuverhon ja kuvan
 *    alueelle osuvat maastonimet (ui.paivitaFokusPohja).
 *
 * Kuvat välimuistittuvat palvelutyöntekijän tavallista reittiä pitkin
 * (sw.js ämpärikori) — niitä EI esiladata, koska pelaaja käy vain
 * murto-osassa maista.
 */
import { el, paperinSavy } from './mapart.js';
import { fokuskarttaUrl, peiliKaytossa } from './media.js';
import { natiiviKuori } from './natiivi.js';
import {
  FOKUS_LISANIMET, FOKUS_POHJAT, FOKUS_SVG_NIMET, YLEISLEHTI,
} from './packs/fokus-grc.js';

/*
 * Maakohtaiset pohjat käynnin ajan muistissa: 'lauta:ISO' ->
 * { bbox, kuva } tai 'ei' (tiedostoa ei ole tälle laudalle). Kartta on
 * moduulitasolla eikä UI-oliossa, jotta uusi peli ei aloita hakuja
 * alusta — tiedostot eivät muutu kesken istunnon.
 *
 * AVAIMESSA ON LAUTA, koska rajaus on laudan koordinaateissa: sama maa
 * on eri paikassa pelilaudalla ja katselutilan maanosalaudalla.
 */
const VARASTO = new Map();

/** Kesken oleva haku maata kohti, jottei samaa haeta kahdesti. */
const HAUT = new Map();

/*
 * Kaukozoomin yleislehden avain. Se ei ole maatunnus vaan oma
 * erikoistapauksensa, ja sitä käytetään samassa varastossa kuin
 * maalehtiä (`lauta:MAAILMA`) — koko latausketju purkuineen ja
 * muistipienennyksineen on täsmälleen sama, vain rajaus tulee toisesta
 * taulusta (ks. pohjanTiedot).
 */
const YLEISLEHDEN_AVAIN = 'MAAILMA';

/**
 * Lehden rajaustiedot avaimesta: maalehdet FOKUS_POHJAT-taulusta ja
 * kaukozoomin yleislehti omastaan (js/packs/fokus-grc.js YLEISLEHTI).
 */
function pohjanTiedot(iso) {
  return iso === YLEISLEHDEN_AVAIN ? YLEISLEHTI : FOKUS_POHJAT[iso];
}

/**
 * Minkä maan pohja kuuluu juuri nyt näkyä?
 *
 * Sama kolmen ehdon sääntö kuin sumuverholla (ui.fokusSumuPaalla):
 * fokusmoodi päällä, ei katselutila, peli käynnissä. Aloitusruudulla
 * maailmaa katsellaan kokonaisuutena eikä yhtäkään maata ole valittu.
 */
function nykyinenMaa(ui) {
  if (!ui.fokusmoodi || ui.katselu) return null;
  /*
   * TURVATILASSA EI YHTÄÄN LEHTEÄ (25.8.2026, toinen kierros: pelkkä
   * atlaksen sammutus ei riittänyt — omistajan iPhone kuoli jo
   * käynnistyksessä, kun tallenne palautti pelin Ateenaan ja nykyisen
   * maan lehti purettiin laudan rakentamisen päälle). Turvatilassa
   * myös oman maan lehti jää pois: peli näyttää vanhan laudan, kaikki
   * toimii, eikä ainuttakaan isoa kuvaa pureta muistiin.
   */
  if (atlasTurvatila()) return null;
  if (ui.game.phase === 'pickstart') return null;
  const taulu = ui.game.pack?.map?.cityCountry;
  if (!taulu) return null;
  const kaupunki = ui.game.cityOf?.();
  return (kaupunki && taulu[kaupunki.id]) || null;
}

/**
 * Odottaa, että kuva oikeasti latautuu. Palauttaa true tai false.
 *
 * TAVALLINEN <img> EIKÄ FETCH. Kuvan lataus ei tarvitse CORS-otsakkeita
 * eikä siis ole kiinni siitä, mistä osoitteesta peli on avattu — sama
 * syy kuin muillakin pelin kuvilla (js/media.js). Samalla kuva päätyy
 * selaimen välimuistiin, joten <image>-elementti saa sen heti eikä
 * ruudulla välähdä tyhjää.
 *
 * Lataus on osa POHJAN OLEMASSAOLOA: jos kuvaa ei ole, koko pohja
 * merkitään puuttuvaksi eikä kerrokseen jää tyhjää <image>-elementtiä
 * (ks. haePohja).
 *
 * PURKU TEHDÄÄN decode():LLA JA SIIS TAUSTASÄIKEESSÄ (omistajan
 * pelitesti 25.8.2026: aloituslento oli *"vähän tökkivä"*).
 *
 * onload kertoo vain, että tavut ovat perillä. Itse purku — kolmisen
 * megatavua webpiä maan kokoiseksi bittikartaksi — jäi selaimen
 * tehtäväksi siihen hetkeen, kun kuva ensimmäisen kerran maalataan, ja
 * juuri se hetki on pahin mahdollinen: lehti asetetaan kartalle heti
 * laskeutumisen jälkeen, samaan kehykseen kuin saapumisen kamera-ajo.
 * decode() tekee saman työn etukäteen ja selaimen omassa
 * purkusäikeessä, joten pääsäie saa valmiin rasterin. Haku alkaa yhä
 * lennon aikana (ks. paivitaFokuskartta) — verkko ei ole pääsäikeessä.
 *
 * VARAREITTI: jos decode() puuttuu, odotetaan kuten ennen. Kumpikin
 * haara palauttaa saman tosi/epätosi-arvon.
 */
function lataaKuva(osoite) {
  const kuva = new Image();
  kuva.src = osoite;
  if (typeof kuva.decode !== 'function') {
    return new Promise((valmis) => {
      kuva.onload = () => valmis(kuva);
      kuva.onerror = () => valmis(null);
    });
  }
  return kuva.decode().then(() => kuva, () => null);
}

/*
 * ============ LEHTI PIENENNETÄÄN JO PURUSSA ==========================
 *
 * OMISTAJAN TESTFLIGHT-PELITESTI 25.8.2026: peli kuoli aloituslogon
 * silmukkaan sekä iPhonella ETTÄ iPadilla. Kuoren (WKWebView)
 * sisältöprosessilla on tiukempi muistikatto kuin Safarin omalla
 * välilehdellä, ja kaksi raskasta työtä osui samaan hetkeen: laudan
 * rasterointi ja fokuslehden purku. Yksi lehti on 6400 x 4000 = 25,6
 * megapikseliä eli PURETTUNA noin 102 megatavua (4 tavua/pikseli) —
 * tiedostona se on kolmisen megatavua, joten verkko ei ole se raja,
 * joka tulee vastaan, vaan RGBA-puskuri. Prosessi kuoli, kuori latasi
 * sivun uudelleen, tallenne palautti pelin samaan kohtaan ja sama
 * kuolema toistui.
 *
 * Turvatila (atlasTurvatila) purki silmukan sammuttamalla lehdet
 * kokonaan. Se on vakuutus eikä ratkaisu: fokusnäkymä ON peli.
 *
 * RATKAISU ON PIENENTÄÄ LEHTI SILLÄ HETKELLÄ, KUN SE PURETAAN, eikä
 * jäädä pitämään täyttä rasteria muistissa. Ruudulla ei häviä mitään,
 * mitä siellä olisi ollutkaan: puhelimen ruutu on 390 x 844 pistettä
 * eli kolminkertaisellakin pikselitiheydellä 1170 x 2532 fyysistä
 * pikseliä, ja lehti kattaa siitä murto-osan kerrallaan. Täysi 6400
 * pikselin leveys näkyy vasta zoomissa, jota kamera ei salli
 * (kartta.tarkistaFokusZoom).
 *
 * MITAT. Pitkä sivu enintään 3200 pikseliä ja pinta-ala enintään 8
 * megapikseliä, kuvasuhde säilyttäen: tyypillinen lehti kutistuu
 * 6400 x 4000:sta 3200 x 2000:een eli 25,6 megapikselistä 6,4:ään —
 * muistissa 102 Mt → 26 Mt, siis neljäsosa. Katto 3200 on myös
 * turvallisesti iOS:n vanhan canvas-rajan (4096 x 4096 = 16,7 Mp)
 * alapuolella; sitä isompi canvas palautuu Safarissa tyhjänä.
 *
 * KOLME POLKUA, PARAS ENSIN:
 *
 *   1. createImageBitmap(blob, { resizeWidth, resizeHeight }) purkaa JA
 *      pienentää selaimen omassa säikeessään, jolloin täyttä
 *      100 megatavun rasteria ei synny lainkaan. Mitat luetaan ensin
 *      <img>-elementin onloadista — se kertoo naturalWidthin
 *      purkamatta pikseleitä (purku tapahtuu vasta maalattaessa, ks.
 *      lataaKuva) — joten resize-valinnat osataan asettaa oikein eikä
 *      pientä lehteä vahingossa suurenneta.
 *   2. canvas + drawImage, jos createImageBitmap puuttuu tai kaatuu.
 *      Silloin täysi purku tapahtuu kerran (transientti piikki), mutta
 *      muistiin JÄÄ vain pienennetty kuva.
 *   3. Alkuperäinen kuva sellaisenaan. Tähän pudotaan, jos tavuja ei
 *      saada CORS-noudolla (peli avattu muualta kuin ämpärin sallimasta
 *      osoitteesta): ilman CORSia canvas tahriintuu eikä toBlob toimi.
 *      Peli näyttää silloin täsmälleen samalta kuin ennen tätä pakettia.
 *
 * MIKSI CORS ONNISTUU. Ämpärissä on 6.8.2026 lisätty sääntö, joka
 * vastaa `access-control-allow-origin: https://ravelius.github.io`
 * (sw.js kuvalähde-haara), ja iOS-kuori lataa pelin täsmälleen siitä
 * osoitteesta (ios/Matkakirja/Resurssit/Config.plist). Paikallisessa
 * kehityksessä sääntö ei osu, ja silloin polku 3 hoitaa asian.
 *
 * PIENENNYS EI KOSKE TYÖPÖYTÄSELAINTA. Siellä muisti riittää, ja lehti
 * kuuluu nähdä täytenä (mitattu 25.8.2026: sama polku kulkee
 * pöytäselaimessa puhtaasti läpi). Kytkin on kuori TAI kapea ruutu.
 */

/** Pienennetyn lehden pisin sivu pikseleinä (iOS-canvasraja 4096). */
const PIENENNYS_PITKA_SIVU = 3200;
/** ...ja pinta-alan katto megapikseleinä (noin 32 Mt RGBA). */
const PIENENNYS_KATTO_MP = 8;
/** Uudelleenpakkauksen laatu; lehti on akvarellia, ei tekstiä. */
const PIENENNYS_LAATU = 0.8;

/**
 * Pienennetäänkö lehdet? Kuoressa aina, selaimessa vain kapealla
 * ruudulla (sama puhelinvihje kuin atlaksen katoilla, ATLAS_PUHELIN).
 *
 * Kysytään joka kerta eikä muisteta: silta ruiskutetaan sivulle ennen
 * pelin skriptejä, mutta muistettu "ei kuorta" olisi väärä ikuisesti,
 * jos se joskus saapuisi myöhässä.
 */
function pienennysPaalla() {
  return natiiviKuoriTurvassa() || ATLAS_PUHELIN;
}

/** Kuoren kysely ilman kaatumista (silta puuttuu selaimessa ja Nodessa). */
function natiiviKuoriTurvassa() {
  try {
    return natiiviKuori();
  } catch {
    return false;
  }
}

/**
 * Pienennetyn lehden mitat, tai null jos alkuperäinen kelpaa jo.
 *
 * Kuvasuhde säilyy: kumpikin katto (pitkä sivu, pinta-ala) lasketaan
 * kertoimeksi ja pienin voittaa. Kerroin ei koskaan ole yli yhden —
 * pientä lehteä (Kypros 5,6 Mp) ei suurenneta, koska se maksaisi
 * muistia ilman yhtäkään uutta pikseliä.
 */
function pienennysMitat(w, h) {
  if (!(w > 0) || !(h > 0)) return null;
  const kerroin = Math.min(
    PIENENNYS_PITKA_SIVU / Math.max(w, h),
    Math.sqrt((PIENENNYS_KATTO_MP * 1e6) / (w * h)),
  );
  if (!(kerroin < 1)) return null;
  return {
    w: Math.max(1, Math.round(w * kerroin)),
    h: Math.max(1, Math.round(h * kerroin)),
  };
}

/** Sivun oma canvas tai null (Node, tai selain ilman documenttia). */
function teeDomCanvas(w, h) {
  const asiakirja = globalThis.document;
  if (typeof asiakirja?.createElement !== 'function') return null;
  const canvas = asiakirja.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

/**
 * Pienennyksen canvas — OffscreenCanvas jos sellainen on.
 *
 * SYY ON PAKKAUS EIKÄ PIIRTO (mitattu 25.8.2026, ilta). Lehden
 * pienennys päättyy uudelleenpakkaukseen, ja tavallisen canvasin
 * `toBlob` tekee sen PÄÄSÄIKEESSÄ: 3200 x 2000 pikseliä akvarellia
 * webpiksi on satojen millisekuntien työ, ja se osui avauslennon
 * päälle, jossa lehtiä puretaan kaksi peräkkäin. Mitattuna lennon
 * aikana yksi 1 522 ms:n longtask.
 *
 * OffscreenCanvasin `convertToBlob` tekee saman pakkauksen pääsäikeen
 * ULKOPUOLELLA ja palauttaa lupauksen. Piirto (drawImage) jää
 * pääsäikeeseen, mutta se on pelkkä skaalattu kopiointi eikä
 * pakkausta.
 *
 * VARAREITTI ON ENNALLAAN. Ilman OffscreenCanvasia (vanha WebKit)
 * palataan sivun omaan canvasiin ja toBlobiin, eli täsmälleen siihen
 * mitä ennenkin — pienennys ei saa jäädä tekemättä muistin takia.
 */
function teeCanvas(w, h) {
  if (typeof OffscreenCanvas === 'function') {
    try {
      const canvas = new OffscreenCanvas(w, h);
      // Vain jos se osaa myös pakata: pelkkä konstruktori ilman
      // convertToBlobia veisi meidät umpikujaan (ks. canvasOsoitteeksi).
      if (typeof canvas.convertToBlob === 'function') return canvas;
    } catch { /* varareitti alla */ }
  }
  return teeDomCanvas(w, h);
}

/*
 * WebP vai JPEG? WebKit ei kirjoita webpiä canvasista, ja toBlob
 * palauttaa spesifikaation mukaan tuntemattomasta tyypistä PNG:n —
 * ja PNG kuudesta megapikselistä akvarellia on kymmeniä megatavuja.
 * Siksi tuki kysytään kerran pikkuruisella canvasilla. Lehdet ovat
 * opaakkeja (ks. sääntö 4 tiedoston alussa), joten JPEG kelpaa.
 */
let webpTuki = null;
function tukeeWebp() {
  if (webpTuki !== null) return webpTuki;
  try {
    // SIVUN OMA CANVAS, ei OffscreenCanvas: koe tehdään toDataURLilla,
    // jota OffscreenCanvasissa ei ole. Sama moottori pakkaa molemmat,
    // joten vastaus kelpaa kummallekin.
    const canvas = teeDomCanvas(1, 1);
    webpTuki = Boolean(canvas?.toDataURL?.('image/webp')?.startsWith?.('data:image/webp'));
  } catch {
    webpTuki = false;
  }
  return webpTuki;
}

/** Pienennetyn lehden pakkausmuoto. Yksi paikka, kaksi kysyjää. */
function pakkausTyyppi() {
  return tukeeWebp() ? 'image/webp' : 'image/jpeg';
}

/*
 * ============ ALFA EI SÄILY JPEGISSÄ — SIITÄ TULIVAT MUSTAT KAISTAT ==
 *
 * OMISTAJAN PELITESTI 26.8.2026 (iPhone, v1116): lehtien väliin jäi
 * täysin mustia vaakakaistoja, lennolla lehti loppui terävään
 * suorakulmaan ja koko lehden yli oli harmaa utu.
 *
 * MIKÄ MAKSOI. Jokaisessa lehdessä on häivytetty vuotoreuna: alfa
 * laskee 255:stä nollaan uloimmalla kaistalla (mitattu: Kreikan lehti
 * ~2,5 % korkeudesta, Ruotsin ~12 % leveydestä), ja juuri se saumaton
 * reuna sulattaa lehdet toisiinsa ja pergamenttiin. Puhelimessa lehti
 * pienennetään canvasille, ja WebKit ei kirjoita canvasista webpiä —
 * pakkaus menee JPEGille. HTML:n spesifikaatio sanoo alfattomasta
 * muodosta yksiselitteisesti: kuva ladotaan MUSTAA taustaa vasten.
 * Häivytetty reuna muuttui siis mustaksi reunukseksi, ja koko vuoto-
 * alue harmaaksi utuksi lehden päälle.
 *
 * KORJAUS. Kun pakkausmuodossa ei ole alfaa, canvas pohjustetaan
 * pergamentin sävyllä (js/mapart.js PAPERIN_SAVY) ennen kuin lehti
 * piirretään. Silloin häivytys latistuu sitä samaa paperia vasten,
 * jonka päällä lehti kartalla lepää — reuna sulaa taustaan eikä
 * ruudulle jää yhtään mustaa pikseliä.
 *
 * TYÖPÖYTÄSELAIN EI MUUTU. Siellä pakkaus on webpiä, alfa säilyy ja
 * lehdet sekoittuvat toisiinsa kuten ennenkin — pohjustus tehdään
 * VAIN alfattomalle polulle.
 *
 * MIKSI EI PNG. Alfa säilyisi, mutta 3200 x 2000 pikseliä akvarellia
 * on PNG:nä noin seitsemän megatavua lehteä kohti (mitattu). Juuri
 * tämä laite kaatui muistiin (ks. moduulin johdanto), joten
 * lisämegatavut ovat viimeinen asia, jota siihen saa kaataa.
 */
function alfaSailyy() {
  return pakkausTyyppi() === 'image/webp';
}

/** Canvasin sisältö blob-osoitteeksi; null jos ei onnistu. */
function canvasOsoitteeksi(canvas) {
  if (typeof URL?.createObjectURL !== 'function') return Promise.resolve(null);
  const tyyppi = pakkausTyyppi();
  /*
   * PAKKAUS POIS PÄÄSÄIKEELTÄ, kun selain osaa (ks. teeCanvas). Lupaus
   * ratkeaa kun pakkaus on valmis; virhe on sama tulos kuin epäonnistunut
   * toBlob, eli varareitti täyteen lehteen.
   */
  if (typeof canvas?.convertToBlob === 'function') {
    return canvas.convertToBlob({ type: tyyppi, quality: PIENENNYS_LAATU })
      .then((blob) => {
        try {
          return blob ? URL.createObjectURL(blob) : null;
        } catch { return null; }
      })
      .catch(() => null);
  }
  if (typeof canvas?.toBlob !== 'function') return Promise.resolve(null);
  return new Promise((valmis) => {
    let vastattu = false;
    // Varmistus: jos toBlob ei koskaan kutsu takaisin, lehti ei saa
    // jäädä roikkumaan jonoon (jono on sarjallinen, ks. purkuJono).
    const kello = setTimeout(() => anna(null), 8000);
    function anna(blob) {
      if (vastattu) return;
      vastattu = true;
      clearTimeout(kello);
      let osoite = null;
      try {
        osoite = blob ? URL.createObjectURL(blob) : null;
      } catch { osoite = null; }
      valmis(osoite);
    }
    try {
      canvas.toBlob(anna, tyyppi, PIENENNYS_LAATU);
    } catch { anna(null); }
  });
}

/** Piirtää lähteen pienennettynä canvasille ja palauttaa blob-osoitteen. */
async function canvasille(lahde, mitat, savy) {
  const canvas = teeCanvas(mitat.w, mitat.h);
  const piirtoalusta = canvas?.getContext?.('2d');
  if (!piirtoalusta) return null;
  try {
    // Alfaton pakkaus latistaisi häivytetyn reunan mustaa vasten
    // (ks. alfaSailyy): pohjaksi se pergamentti, jonka päällä lehti
    // kartalla lepää, jolloin reuna sulaa siihen näkymättömiin.
    if (!alfaSailyy() && savy) {
      piirtoalusta.fillStyle = savy;
      piirtoalusta.fillRect(0, 0, mitat.w, mitat.h);
    }
    piirtoalusta.drawImage(lahde, 0, 0, mitat.w, mitat.h);
  } catch {
    return null;
  }
  const osoite = await canvasOsoitteeksi(canvas);
  // Canvas irti heti: iOS pitää piirtopuskurin (tässä 26 Mt) hengissä
  // niin kauan kuin elementillä on mittoja.
  try {
    canvas.width = 1;
    canvas.height = 1;
  } catch { /* ei väliä */ }
  return osoite;
}

/**
 * Polku 1: purku ja pienennys yhdellä kertaa selaimen omassa säikeessä.
 *
 * resizeQuality: 'high' on tässä oikea valinta — lehti on maastoa ja
 * viivakuvaa, ja karkea alasotanta tekisi rannikoista rosoa.
 */
async function bittikartasta(blob, mitat, savy) {
  if (typeof createImageBitmap !== 'function') return null;
  let bittikartta = null;
  try {
    bittikartta = await createImageBitmap(blob, {
      resizeWidth: mitat.w,
      resizeHeight: mitat.h,
      resizeQuality: 'high',
    });
    return await canvasille(bittikartta, mitat, savy);
  } catch {
    return null;
  } finally {
    // Bittikartta on oma puskurinsa eikä katoa roskien mukana heti.
    try { bittikartta?.close?.(); } catch { /* vanha selain */ }
  }
}

/** Kuva blob-osoitteesta MITAT edellä: onload ei vielä pura pikseleitä. */
function lataaMitat(osoite) {
  return new Promise((valmis) => {
    const kuva = new Image();
    kuva.onload = () => valmis(kuva);
    kuva.onerror = () => valmis(null);
    kuva.src = osoite;
  });
}

/** Lehden tavut CORS-noudolla; null jos sääntö ei salli (ks. johdanto). */
async function haeTavut(osoite) {
  if (typeof fetch !== 'function') return null;
  try {
    const vastaus = await fetch(osoite, { mode: 'cors', credentials: 'omit' });
    if (!vastaus?.ok) return null;
    const blob = await vastaus.blob();
    return blob?.size ? blob : null;
  } catch {
    return null;
  }
}

/**
 * Purkaa ja pienentää yhden lehden. Palauttaa
 * `{ url, w, h, objectURL }` tai null.
 *
 * `objectURL` on se osoite, joka on vapautettava lehden mukana
 * (vapautaLehti → siivoaLehtiUrlit); null tarkoittaa, että näytössä on
 * ämpärin oma osoite eikä mitään vapautettavaa.
 */
async function pienennaLehti(lahde, blob, savy) {
  let blobOsoite = null;
  try {
    blobOsoite = URL.createObjectURL(blob);
  } catch {
    return null;
  }
  try {
    const kuva = await lataaMitat(blobOsoite);
    if (!kuva) return null;
    const mitat = pienennysMitat(kuva.naturalWidth, kuva.naturalHeight);
    if (!mitat) {
      /*
       * JO VALMIIKSI PIENI LEHTI näytetään ämpärin omasta osoitteesta:
       * uudelleenpakkaus veisi aikaa ja tuottaisi tismalleen saman
       * muistikuorman. Mitat on silti mitattu eikä arvattu.
       */
      return { url: lahde, w: kuva.naturalWidth, h: kuva.naturalHeight, objectURL: null };
    }
    const osoite = await bittikartasta(blob, mitat, savy)
      ?? await canvasille(kuva, mitat, savy);
    if (!osoite) return null;
    return {
      url: osoite, w: mitat.w, h: mitat.h, objectURL: osoite,
    };
  } finally {
    // Väliaikainen blob-osoite ei jää muistiin: kuva on jo piirretty
    // canvasille siihen mennessä, kun tämä suoritetaan.
    try { URL.revokeObjectURL(blobOsoite); } catch { /* ei URLia */ }
  }
}

/*
 * YKSI LEHTI KERRALLAAN (omistajan TestFlight-testi 25.8.2026).
 *
 * Atlas hakee useaa lehteä rinnakkain, ja kaksi yhtaikaista purkua on
 * kuoressa kaksi kertaa se piikki, joka jo yksinään tappoi prosessin.
 * Jono ei hidasta mitään näkyvää: lehdet ilmestyvät kartalle
 * järjestyksessä, ja kohdemaan lehti on aina ensimmäisenä jonossa,
 * koska sen haku alkaa jo lennon aikana (paivitaFokuskartta).
 *
 * JONOSSA ON VAIN PURKU, EI NOUTOA. Verkko ei ole muistista pois:
 * tavut ovat kolmisen megatavua ja saavat tulla rinnakkain kuten
 * ennenkin. Jos jono kattaisi noudon, kolmen lehden atlas odottaisi
 * kolme peräkkäistä latausta.
 *
 * Jono koskee VAIN pienennettyä polkua. Työpöytäselaimessa purku on
 * selaimen omissa käsissä kuten ennenkin.
 */
let purkuJono = Promise.resolve();
function jonossa(tyo) {
  const vuoro = purkuJono.then(tyo, tyo);
  purkuJono = vuoro.then(() => {}, () => {});
  return vuoro;
}

/**
 * Lehti näyttökuntoon: `{ url, w, h, objectURL }` tai null.
 *
 * Kuoressa ja puhelimessa purku pienennetään ja sarjoitetaan; muualla
 * tämä on entinen lataaKuva mittoineen.
 */
async function lataaLehti(lahde, savy) {
  if (pienennysPaalla()) {
    const blob = await haeTavut(lahde);
    const pienennetty = blob
      ? await jonossa(() => pienennaLehti(lahde, blob, savy)) : null;
    if (pienennetty) return pienennetty;
    // Varareitti: tavuja ei saatu CORSilla tai pienennys ei onnistunut.
    // Lehti on tärkeämpi kuin sen koko (sääntö 1 tiedoston alussa).
  }
  const kuva = await lataaKuva(lahde);
  if (!kuva) return null;
  return {
    url: lahde, w: kuva.naturalWidth, h: kuva.naturalHeight, objectURL: null,
  };
}

/**
 * Vapauttaa ne blob-osoitteet, joita mikään kartalla oleva lehti ei
 * enää käytä.
 *
 * MIKSI KÄYTTÖ TARKISTETAAN DOMISTA eikä luoteta kutsujaan: sama
 * pohja voi olla yhtä aikaa nykyisen maan lehtenä (.fokus-lehti) ja
 * atlaksen lehtenä (.fokus-atlas), ja vapautettu osoite näkyisi
 * pelaajalle rikkinäisenä kuvana. Solmuja on korkeintaan kourallinen,
 * joten kysely on halpa.
 *
 * VAPAUTETTU POHJA PURETAAN UUDELLEEN, jos lehti palaa kartalle:
 * `kuva` nollataan, mutta mitattu `mp` jää talteen, jotta atlaksen
 * muistibudjetti laskee yhä oikeilla luvuilla eikä arviolla.
 */
function siivoaLehtiUrlit(ui) {
  let kaytossa = null;
  for (const pohja of VARASTO.values()) {
    if (!pohja || pohja === 'ei' || !pohja.objectURL || !pohja.piirretty) continue;
    if (!kaytossa) {
      kaytossa = new Set();
      const solmut = ui?.fokuskarttaKerros?.querySelectorAll?.('image') ?? [];
      for (const solmu of solmut) {
        const osoite = solmu.getAttribute?.('href');
        if (osoite) kaytossa.add(osoite);
      }
    }
    if (kaytossa.has(pohja.objectURL)) continue;
    try { URL.revokeObjectURL(pohja.objectURL); } catch { /* ei URLia */ }
    pohja.objectURL = null;
    pohja.kuva = null;
    pohja.piirretty = false;
  }
}

/**
 * Hakee maan pohjan tiedot. Palauttaa { bbox, kuva } tai null.
 *
 * Kaksi noutoa: JSON kertoo rajauksen ja kuva on itse pohja. Kumpikin
 * on ehto — puolikas pohja ei kelpaa, koska väärään paikkaan asetettu
 * tai puuttuva kuva näkyisi pelaajalle rikkinäisenä karttana.
 */
async function haePohja(iso, lauta, map = null) {
  const avain = `${lauta}:${iso}`;
  const ennestaan = VARASTO.get(avain);
  if (ennestaan === 'ei') return null;
  /*
   * VAPAUTETTU LEHTI PURETAAN UUDELLEEN. Muistissa oleva pohja kelpaa
   * vain jos sillä on yhä osoite: siivoaLehtiUrlit nollaa `kuva`-kentän
   * silloin, kun blob-osoite on vapautettu lehden mukana. Rajaus ja
   * mitattu koko jäävät talteen, joten uusi purku on ainoa työ.
   */
  if (ennestaan?.kuva) return ennestaan;
  if (HAUT.has(avain)) return HAUT.get(avain);
  const haku = (async () => {
    try {
      // Katkaisijan sammuttamana ämpäriä ei kysellä lainkaan.
      if (!peiliKaytossa('kuvat')) throw new Error('peili pois');
      /*
       * RAJAUS LUETAAN REPOSTA (FOKUS_POHJAT), EI ÄMPÄRISTÄ. Ämpärin
       * r2.dev-osoite ei lähetä CORS-otsakkeita, joten fetch() kaatuisi
       * selaimessa vaikka kuva latautuu <img>-elementillä — mitattu
       * tuotannossa 24.8.2026. Kuva pysyy ämpärissä (iso), rajaus
       * repossa (pieni ja muuttumaton).
       */
      const tiedot = pohjanTiedot(iso);
      if (!tiedot) throw new Error('ei pohjaa');
      const b = tiedot.bbox;
      if (!(b?.w > 0) || !(b?.h > 0)) throw new Error('rajaus puuttuu');
      /*
       * LAUTA ON TARKISTETTAVA. Rajaus on laudan koordinaateissa, ja
       * laudoilla on eri projektio (pelilauta Millerin lieriössä,
       * maanosalaudat tasavälissä). Väärälle laudalle asetettu kuva
       * näyttäisi oikealta kartalta mutta olisi keskellä väärää merta —
       * mitattu 24.8.2026, kun Kreikan kuva päätyi Euroopan laudan
       * koordinaateilla maailmankartalle.
       */
      if (tiedot.lauta && tiedot.lauta !== lauta) throw new Error('eri lauta');
      const lahde = fokuskarttaUrl(tiedot.tiedosto ?? `${iso}.webp`);
      const pohja = (ennestaan && ennestaan !== 'ei') ? ennestaan : {
        bbox: b,
        // Ikkuna, johon kamera ajaa; vanhemmilla pohjilla sitä ei ole,
        // jolloin koko kuva on ikkuna kuten ennen.
        rajaus: tiedot.rajaus ?? b,
      };
      /*
       * PERGAMENTIN SÄVY LEHDEN KOHDALLA. Alfaton pakkaus (iOS, ks.
       * alfaSailyy) latistaa lehden häivytetyn vuotoreunan jotakin
       * väriä vasten, ja ainoa oikea väri on se pergamentti, jonka
       * päällä lehti kartalla lepää. Piste on lehden keskikohta: sävy
       * muuttuu laudalla hitaasti, ja yksi lehti on murto-osa laudasta.
       */
      const savy = paperinSavy(map, b.x + b.w / 2, b.y + b.h / 2);
      const lehti = await lataaLehti(lahde, savy);
      if (!lehti) throw new Error('kuva ei lataudu');
      pohja.kuva = lehti.url;
      // Vapautettava blob-osoite (pienennetty lehti) tai null, jos
      // näytössä on ämpärin oma osoite.
      pohja.objectURL = lehti.objectURL ?? null;
      pohja.piirretty = false;
      /*
       * TODELLINEN PIKSELIMÄÄRÄ TALTEEN — JA NIMENOMAAN PIENENNETTY.
       * Jatkuva atlas pitää useaa lehteä kartalla yhtä aikaa, ja sen
       * muistikatto lasketaan megapikseleinä eikä lehtien lukumääränä
       * (ks. atlasMegapikselia). Mitta luetaan siitä samasta kuvasta,
       * joka oikeasti jää muistiin: jos lehti pienennettiin 6400 x
       * 4000:sta 3200 x 2000:een, budjettiin kirjataan 6,4 eikä 25,6
       * megapikseliä. Arvaus olisi tässä pahin mahdollinen virhe.
       */
      pohja.mp = (lehti.w * lehti.h) / 1e6 || ATLAS_OLETUS_MP;
      VARASTO.set(avain, pohja);
      return pohja;
    } catch {
      // Puuttuva pohja on tavallinen tila eikä virhe: maita on satoja
      // ja kuvia toistaiseksi yksi.
      //
      // TÄMÄ KOSKEE MYÖS UUDELLEENPURKUA: jos kerran nähty lehti ei
      // enää lataudu (verkko poikki), se merkitään puuttuvaksi istunnon
      // loppuun. Vaihtoehto olisi yrittää uudelleen joka panoroinnissa,
      // ja juuri se olisi väärin muistin kannalta — puuttuva lehti ei
      // riko mitään (sääntö 1 tiedoston alussa), loputon uudelleenyritys
      // veisi kaistaa ja purkuja siihen asti kunnes jokin onnistuu.
      VARASTO.set(avain, 'ei');
      return null;
    } finally {
      HAUT.delete(avain);
    }
  })();
  HAUT.set(avain, haku);
  return haku;
}

/**
 * Hakee maan pohjan valmiiksi taustalla ilman että mitään piirretään.
 *
 * Avausruudussa tiedetään jo, minne matka menee (js/ui.js
 * ETUSIVUN_KOHTEET), ja alkukertomus kestää kymmeniä sekunteja. Pohja
 * on megatavujen kokoinen webp, jonka purku vie oman aikansa — kun se
 * on tehty jo kertomuksen aikana, laskeutumisen jälkeinen lehti
 * ilmestyy heti eikä sekunteja kamera-ajon jälkeen.
 *
 * Tulos päätyy samaan välimuistiin (VARASTO) kuin tavallinen haku,
 * joten myöhempi piirto saa sen ilmaiseksi. Epäonnistuminen on
 * tavallinen tila eikä virhe (sääntö 1 tiedoston alussa).
 */
export function esilammitaFokuspohja(iso, lauta, map = null) {
  if (!iso || !lauta) return;
  void haePohja(iso, lauta, map).catch(() => {});
}

/*
 * === SUOMENKIELISET LISÄNIMET ===
 *
 * Nimet ovat SVG:nä eivätkä kuvassa (ks. js/packs/fokus-grc.js):
 * terävinä joka zoomilla ja suomeksi. Mitat ovat laudan yksiköitä,
 * jotta ne skaalautuvat kartan mukana kuten kaupunkien nimetkin.
 *
 * KOOT SUHTEESSA PELILAATTOJEN NIMIIN. Kaupungin nimi on laudalla 18
 * yksikköä (css .city-label); näiden on oltava selvästi pienempiä,
 * koska ne eivät ole pelikohteita — pelaajan katse ei saa harhautua
 * niihin, kun kartalta etsitään laattaa.
 */
const NIMEN_KOKO = 8;
const MEREN_KOKO = 10.5;
/*
 * Nimet syttyvät vasta kun ne ovat luettavia. Sama sääntö kuin
 * maastonimillä (js/mapart.js nimiNakyy): raja on kirjaimen koko
 * RUUDULLA, ei laudan zoomitaso — sama kartta on eri kokoinen
 * puhelimessa ja työpöydällä.
 */
const FOKUS_NIMI_LUETTAVA_PX = 5;

/** Yhden lisäkohteen nimi; palauttaa <text>-elementin. */
function nimi(sailio, teksti, x, y, {
  koko = NIMEN_KOKO, luokka = '', ank = 'start', kulma = 0, harvennus = 0,
} = {}) {
  const t = el('text', {
    x,
    y,
    class: `fokus-nimi ${luokka}`.trim(),
    'font-size': koko,
    'text-anchor': ank,
    ...(harvennus ? { 'letter-spacing': harvennus } : {}),
    ...(kulma ? { transform: `rotate(${kulma} ${x} ${y})` } : {}),
  }, sailio);
  t.textContent = teksti;
  return t;
}

/**
 * Maan lisänimet: muut kaupungit pisteinä, vuoret kolmioina ja merten
 * nimet ulapalle.
 */
function piirraLisanimet(ui, iso, sailio) {
  // Nimet ovat nykyään kuvassa (js/packs/fokus-grc.js FOKUS_SVG_NIMET).
  if (!FOKUS_SVG_NIMET) return null;
  const tiedot = FOKUS_LISANIMET[iso];
  if (!tiedot || tiedot.lauta !== ui.game.pack.id) return null;
  const g = el('g', { class: 'fokus-nimet', 'pointer-events': 'none' }, sailio);

  for (const m of tiedot.meret ?? []) {
    nimi(g, m.nimi.toUpperCase(), m.x, m.y, {
      koko: MEREN_KOKO * (m.koko ?? 1),
      luokka: 'fokus-meri',
      ank: 'middle',
      kulma: m.kulma ?? 0,
      harvennus: MEREN_KOKO * 0.3,
    });
  }

  for (const v of tiedot.vuoret ?? []) {
    const r = v.iso ? 5 : 4;
    // Kolmio kuin 1873-atlaksessa: pelkkä ääriviiva, ei täyttöä.
    el('path', {
      d: `M${v.x - r},${v.y + r * 0.6} L${v.x},${v.y - r * 0.8} L${v.x + r},${v.y + r * 0.6}`,
      class: 'fokus-vuori-merkki',
    }, g);
    nimi(g, v.nimi, v.x, v.y + r * 2.4, {
      koko: v.iso ? NIMEN_KOKO : NIMEN_KOKO * 0.9,
      luokka: 'fokus-vuori',
      ank: 'middle',
    });
    nimi(g, `${v.m} m`, v.x, v.y + r * 2.4 + NIMEN_KOKO, {
      koko: NIMEN_KOKO * 0.72,
      luokka: 'fokus-korkeus',
      ank: 'middle',
    });
  }

  for (const k of tiedot.kaupungit ?? []) {
    el('circle', {
      cx: k.x, cy: k.y, r: 2.2, class: 'fokus-piste',
    }, g);
    const loppuun = k.ank === 'end';
    nimi(g, k.nimi, k.x + (loppuun ? -4.5 : 4.5), k.y + 3, {
      luokka: 'fokus-kaupunki',
      ank: loppuun ? 'end' : 'start',
    });
  }
  return g;
}

/**
 * Lisänimien näkyvyys zoomin mukaan.
 *
 * Kutsutaan samasta kohdasta kuin maastonimien päivitys (ui.js
 * paivitaMaastonimet), eli aina kun näkymä on asettunut. Yleiskuvassa
 * nimet olisivat pistekokoa ja tekisivät Kreikasta tahran; ne
 * ilmestyvät vasta kun kirjain on ruudulla luettava.
 */
export function paivitaFokusNimet(ui) {
  const g = ui.fokuskarttaKerros?.querySelector('.fokus-nimet');
  if (!g) return;
  const skaala = ui.nakyvaAlue?.()?.skaala ?? 0;
  g.classList.toggle('fokus-nimet-piilossa', NIMEN_KOKO * skaala < FOKUS_NIMI_LUETTAVA_PX);
}

/**
 * Maan fokusnäkymä laudan koordinaateissa — kamera-ajon kohde.
 *
 * IKKUNA LUETAAN TAULUSTA EIKÄ KUVASTA (omistajan pelitesti v1101:
 * *"kamera EI ajanut Bulgarian näkymään vaan jäi kauas"*). Ennen ajo
 * lähti vasta kun kuva oli latautunut ämpäristä — kuva on kolmisen
 * megatavua, ja siihen asti pelaaja ehti jo koskea karttaan, mikä
 * keskeyttää ajon (kartta.pysaytaKameraAjo). Rajaus on repossa
 * (FOKUS_POHJAT) ja luettavissa samassa kehyksessä kuin saapuminen, eikä
 * kamera enää odota verkkoa.
 *
 * VARAREITTINÄ MAAN OMA MUOTO: maita on satoja ja pohjia kymmeniä, ja
 * saapumisen kuuluu viedä uuden maan näkymään myös silloin kun pohjaa ei
 * ole. Silloin rajaus tulee laudan maamuodoista (kartta.maidenBbox) ja
 * saa tavallisen reunavaran.
 */
function maanNakyma(ui, iso, lauta) {
  const tiedot = FOKUS_POHJAT[iso];
  if (tiedot && (!tiedot.lauta || tiedot.lauta === lauta)) {
    const ikkuna = tiedot.rajaus ?? tiedot.bbox;
    // Marginaali on nolla: ikkunassa on jo oma ilmansa (ks. nayta).
    if (ikkuna?.w > 0 && ikkuna?.h > 0) return { bbox: ikkuna, marginaali: 0 };
  }
  const muoto = ui.kartta?.maidenBbox?.([iso]);
  return muoto ? { bbox: muoto } : null;
}

/*
 * ================== JATKUVA ATLAS (omistajan tilaus 25.8.2026) ======
 *
 * *"fokuskarttapiirros piirretään KOKO AJAN — kaikkien valmistuneiden
 * maiden lehdet näkyvät kartalla samanaikaisesti koko maailman
 * mittakaavassa"*.
 *
 * Lehdet ovat jo valmiiksi maailmankartan koordinaateissa (FOKUS_POHJAT
 * bbox), joten yhtenäinen atlas ei vaadi uutta grafiikkaa: riittää että
 * niitä piirretään useampi kuin yksi. Koko työ on siinä, MITKÄ niistä
 * ovat kartalla milläkin hetkellä.
 *
 * === MUISTI ON AINOA OIKEA RAJOITE ===
 *
 * Mitattu 25.8.2026 ämpäristä (39 lehteä, WebP-otsakkeista luetut
 * mitat): tiedostoina 62,5 Mt, mutta PURETTUINA 928 megapikseliä eli
 * noin 3,7 gigatavua (4 tavua/pikseli). Yksittäinen lehti on tyypillisesti
 * 6400 x 4000 = 25,6 Mp ≈ 102 Mt; pienimmät ovat Kypros 5,6 Mp ≈ 22 Mt
 * ja Luxemburg 8,9 Mp ≈ 36 Mt. Kaikkien lataaminen kerralla ei siis ole
 * hidasta vaan MAHDOTONTA — iOS jättää kuvat purkamatta ja kartta jää
 * tyhjäksi (sama vikaluokka kuin suodattimilla, ks. sääntö 3 yllä).
 *
 * NELJÄ SÄÄNTÖÄ:
 *
 *   1. VAIN NÄKYMÄN LEHDET. Ehdokkaaksi pääsee lehti, jonka bbox
 *      leikkaa nykyistä näkymää tai sen esilatausvaraa (ATLAS_VARA) ja
 *      joka on näkymään nähden riittävän leveä (ATLAS_VAHIMMAISLEVEYS).
 *   2. VAIN NE, JOTKA TUOVAT UUTTA. Lehdet ovat isoja ja menevät
 *      raskaasti päällekkäin — kohdemaan lehti peittää tavallisesti
 *      koko ruudun yksin. Ahne peittotesti karkealla ruudukolla ottaa
 *      lehden vain, jos se peittää vähintään ATLAS_UUSIA_RUUTUJA
 *      sellaista ruutua, jota mikään jo valittu lehti ei peitä.
 *      Käytännössä kartalla on 1–4 lehteä, ei kahdeksaa.
 *   3. KAKSI KATTOA, LRU VAPAUTTAA. Enintään atlasEnintaan() lehteä JA
 *      enintään atlasMegapikselia() megapikseliä (pienennettyinä,
 *      ks. "LEHTI PIENENNETÄÄN JO PURUSSA"). Kun katto ylittyy,
 *      kauimmin sitten käytetty lehti irrotetaan DOMista — juuri se
 *      vapauttaa puretun kuvan, koska VARASTO ei pidä Image-oliota
 *      tallessa vaan pelkän osoitteen ja mitat.
 *   4. PURKU TAUSTALLA. Lehti ilmestyy kartalle vasta kun decode() on
 *      valmis (haePohja → lataaKuva), joten pääsäie ei purkaudu
 *      panoroinnin keskellä.
 *
 * ATLAS ON VOIMASSA KOKO PELIN AJAN — MYÖS YLEISKUVASSA JA LENNOSSA
 * (omistajan linjaus 25.8.2026, ilta: *"Lennon aikana taidetaan käyttää
 * sitä vanhaa karttaa. Vanha kartta pitää ottaa kokonaan pois pelistä
 * toistaiseksi."*).
 *
 * AIEMPI RAJAUS ON KUMOTTU. Atlas oli voimassa vain mannerZoomissa ja
 * aloituslennon ulkopuolella, koska niissä kahdessa näkymässä vanha
 * lauta sai näkyä: yleiskuvassa lehdet ovat postimerkin kokoisia
 * tilkkuja ja lennossa kartan piti olla "niukka vanha kartta". Kun
 * vanhaa piirrosta ei enää näytetä pelin aikana lainkaan, niistä ei jää
 * karttaa vaan tyhjä pergamentti — joten atlas on se kartta myös
 * siellä. Postimerkkiehto (ATLAS_VAHIMMAISLEVEYS) hoitaa yleiskuvan
 * itsestään: koko maailman mittakaavassa yksikään maa ei ole näkymään
 * nähden riittävän leveä, joten yleiskuva jää lehdettömäksi
 * pergamentiksi verhon alla eikä lataa mitään.
 *
 * KAKSI POIKKEUSTA, JOISSA VANHA PIIRROS SAA YHÄ NÄKYÄ: aloitusruutu
 * (phase 'pickstart', maailma-lauta jolle ei ole lehtiä lainkaan) ja
 * katselutila (?lauta=) muilla laudoilla. Molemmat ovat laudan
 * ESITTELYÄ eivätkä matkaa.
 */

/*
 * PUHELIMELLE PIENEMMÄT KATOT (25.8.2026). Omistajan iPhone kuoli
 * saapumisessa Ateenaan toistuvaan uudelleenlataussilmukkaan: samaan
 * hetkeen osuvat ison lehden purku (~100 Mt RGBA), laudan rasterointi
 * ja atlaksen naapurihaut, ja iOS tappaa sivun muistin loppuessa —
 * Safari lataa uudelleen, tallenne palauttaa samaan kohtaan ja kuolema
 * toistuu. Pöytäselaimessa sama polku kulkee puhtaasti läpi (mitattu
 * 25.8.2026, ei yhtään virhettä). Kapea ruutu on paras saatavilla
 * oleva puhelinvihje: iOS ei kerro muistia (navigator.deviceMemory
 * puuttuu WebKitistä).
 */
const ATLAS_PUHELIN = typeof screen !== 'undefined'
  && Math.min(screen.width || 9999, screen.height || 9999) < 500;

/*
 * KUORI ON OMA TAPAUKSENSA — MYÖS iPADILLA (omistajan TestFlight-testi
 * 25.8.2026: peli kuoli aloituslogon silmukkaan sekä iPhonella että
 * iPadilla). WKWebView'n sisältöprosessilla on tiukempi muistikatto kuin
 * Safarin omalla välilehdellä, eikä ruudun leveys kerro siitä mitään:
 * iPadin kuori on leveä ruutu ja silti se ympäristö, joka kaatui. Siksi
 * kuori tunnistetaan sillasta (js/natiivi.js) eikä ruudusta, ja se saa
 * puhelintakin harkitummat katot.
 *
 * LUVUT OVAT PIENENNETTYJÄ MEGAPIKSELEITÄ (ks. "LEHTI PIENENNETÄÄN JO
 * PURUSSA"): kuoressa ja puhelimessa lehti on tyypillisesti 6,4 Mp
 * ≈ 26 Mt eikä 25,6 Mp ≈ 102 Mt.
 *
 *   kuori    5 lehteä / 40 Mp — käytännössä 5 x 6,4 = 32 Mp ≈ 128 Mt.
 *            Enemmän lehtiä kuin ennen, VÄHEMMÄN muistia (ennen 40 Mp
 *            täysinä lehtinä oli 160 Mt eli puolitoista lehteä).
 *   puhelin  4 / 40 kuten ennenkin — selaimessa sivu saa kuolla ilman
 *            että koko sovellus katoaa, ja Safarin oma välilehti kestää
 *            enemmän kuin kuoren sisältöprosessi.
 *   työpöytä 8 / 96 täysinä lehtinä, ei pienennystä. Siellä muisti
 *            riittää eikä yksikään mittaus ole kaatunut.
 */
const ATLAS_KUORI_ENINTAAN = 5;
const ATLAS_KUORI_MEGAPIKSELIA = 40;

/** Enintään näin monta lehteä muistissa kerralla (omistajan ohje ~8). */
function atlasEnintaan() {
  if (natiiviKuoriTurvassa()) return ATLAS_KUORI_ENINTAAN;
  return ATLAS_PUHELIN ? 4 : 8;
}
/*
 * ...ja enintään näin monta megapikseliä purettuna, mikä on käytännössä
 * se katto, joka osuu ensin: täysi lehti on 25,6 Mp, joten 96 Mp on
 * kolme–neljä lehteä eli noin 384 Mt purettua kuvaa. Kahdeksan täyttä
 * lehteä olisi 205 Mp ≈ 820 Mt, mitä yksikään iPad ei kestä. Puhelimen
 * 40 Mp on pienennettynä 6 lehteä, jolloin lukumääräkatto osuu ensin.
 */
function atlasMegapikselia() {
  if (natiiviKuoriTurvassa()) return ATLAS_KUORI_MEGAPIKSELIA;
  return ATLAS_PUHELIN ? 40 : 96;
}
/*
 * LEHDEN OLETUSKOKO ENNEN KUIN TODELLINEN ON MITATTU.
 *
 * ARVIO ON TÄYSI LEHTI MYÖS SILLOIN, KUN PIENENNYS ON PÄÄLLÄ. Se
 * näyttää varovaiselta ja on sitä tarkoituksella: pienennys voi pudota
 * varareitille (CORS ei onnistu, canvas ei kirjoita blobia), jolloin
 * lehti onkin kartalla täytenä. Mitattu 25.8.2026 juuri sillä polulla:
 * kun budjetti laski 6,4 megapikselin arviolla, valinta otti VIISI
 * lehteä ja ne kaikki saapuivat täysinä — 128 Mp ≈ 512 Mt, eli
 * täsmälleen se tilanne, jota tämä paketti on estämässä. Arvio on siis
 * pessimistinen ja mittaus optimistinen: kun lehti on kerran mitattu,
 * budjettiin kirjautuu sen todellinen (pienennetty) koko ja naapureita
 * mahtuu enemmän jo seuraavassa päivityksessä.
 */
const ATLAS_OLETUS_MP = 25.6;
/** Esilatausvara näkymän ympärille, osuutena näkymän mitasta. */
const ATLAS_VARA = 0.3;
/** Lehti sivuutetaan, jos se on tätä kapeampi osuus näkymästä. */
const ATLAS_VAHIMMAISLEVEYS = 0.12;
/*
 * Peittotestin ruudukko näkyvän alueen päällä, ja kuinka monta uutta
 * ruutua lehden on tuotava kelvatakseen.
 *
 * MITTA ON RUUTUJA EIKÄ OSUUS NÄKYMÄSTÄ. Pystyruudulla näkymä on kaksi
 * kertaa korkeampi kuin leveä, ja lehdet ovat vaakasuuntaisia: yksikään
 * naapurilehti ei täytä viittä prosenttia sellaisesta näkymästä, joten
 * suhdeluku hylkäsi ne kaikki (mitattu 25.8.2026 — atlakseen jäi vain
 * Italia). Ruutumäärä on sama kaikilla ruuduilla ja tarkoittaa sitä,
 * mitä sen pitääkin: tuoko tämä lehti kartalle kaistaleen, jota
 * mikään jo valittu lehti ei kata.
 */
const ATLAS_RUUTUJA_X = 16;
const ATLAS_RUUTUJA_Y = 16;
const ATLAS_UUSIA_RUUTUJA = 5;

/** Kahden laatikon leikkauksen pinta-ala (0 jos eivät leikkaa). */
function leikkausAla(a, b) {
  const x0 = Math.max(a.x, b.x);
  const x1 = Math.min(a.x + a.w, b.x + b.w);
  const y0 = Math.max(a.y, b.y);
  const y1 = Math.min(a.y + a.h, b.y + b.h);
  return (x1 > x0 && y1 > y0) ? (x1 - x0) * (y1 - y0) : 0;
}

/**
 * Onko atlas voimassa juuri nyt? Sama kolmen ehdon perhe kuin muillakin
 * fokuskerroksilla, plus yleiskuvan ja lennon rajaus (ks. johdanto).
 */
/*
 * TURVATILA (25.8.2026): jos peli on käynnistynyt monta kertaa parissa
 * minuutissa (js/main.js kirjaaKaynnistys), laite on todennäköisesti
 * tappanut sivun muistin loppuessa — silloin atlas pidetään tunti pois
 * päältä, jolloin vanha lauta palaa näkyviin ja vain nykyisen maan
 * lehti piirretään. Silmukka purkautuu itsestään ilman että pelaajan
 * tarvitsee tehdä mitään. Luetaan kerran ja muistetaan istunnon ajan.
 */
const TURVATILA_AVAIN = 'matkakirja-atlas-turvatila';
const TURVATILA_MS = 60 * 60 * 1000;
let atlasTurvatilaMuisti = null;
function atlasTurvatila() {
  if (atlasTurvatilaMuisti !== null) return atlasTurvatilaMuisti;
  try {
    const leima = Number(localStorage.getItem(TURVATILA_AVAIN) ?? 0);
    atlasTurvatilaMuisti = leima > 0 && (Date.now() - leima) < TURVATILA_MS;
  } catch {
    atlasTurvatilaMuisti = false;
  }
  return atlasTurvatilaMuisti;
}

/**
 * Onko tällä laudalla ylipäätään lehtiä?
 *
 * TÄMÄ ON SE VARTIJA, JOKA PITÄÄ VANHAN PIIRROKSEN LAUDOILLA, JOILLE
 * ATLASTA EI OLE. Piilotus on nyt voimassa aina kun peliä pelataan, ja
 * ilman tätä ehtoa lauta, jolle ei ole yhtäkään lehteä, jäisi
 * kokonaan tyhjäksi pergamentiksi. Vastaus ei muutu kesken istunnon
 * (tiedostolista on käännösaikainen), joten se muistetaan.
 */
const LEHTILAUDAT = new Map();
function laudallaLehtia(lauta) {
  if (!lauta) return false;
  let on = LEHTILAUDAT.get(lauta);
  if (on === undefined) {
    on = false;
    for (const tiedot of Object.values(FOKUS_POHJAT)) {
      if (!tiedot.lauta || tiedot.lauta === lauta) { on = true; break; }
    }
    LEHTILAUDAT.set(lauta, on);
  }
  return on;
}

function atlasPaalla(ui) {
  if (!ui.fokusmoodi || ui.katselu) return false;
  if (atlasTurvatila()) return false;
  /*
   * ALOITUSRUUDULLA EI ATLASTA. Sama ehto kuin nykyisellä maalla
   * (nykyinenMaa) ja verholla (ui.fokusSumuPaalla): pickstart-vaiheessa
   * maailmaa katsellaan kokonaisuutena eikä matka ole alkanut. Ilman
   * tätä puhelimen aloituszoom (kartta.zoomTarpeen) sytyttäisi
   * mannerZoomin ja koko Euroopan atlaksen ruudulle ennen kuin pelaaja
   * on valinnut lähtöpaikkaa — päinvastoin kuin Raamattu vaatii
   * (*"kartoittamaton päiväkirja tarkentuu vasta kun jäljillä
   * kuljetaan"*), ja vielä ilman verhoa, joka on pickstartissa pois.
   */
  if (ui.game.phase === 'pickstart') return false;
  /*
   * YLEISKUVA JA ALOITUSLENTO EIVÄT OLE ENÄÄ POIKKEUKSIA (omistajan
   * linjaus 25.8.2026, ilta — ks. atlaksen johdanto). Ne olivat sitä
   * niin kauan kuin niissä näytettiin vanhaa lautaa; nyt sitä ei
   * näytetä pelin aikana missään, joten atlas on kartta myös siellä.
   */
  return laudallaLehtia(ui.game.pack?.id);
}

/*
 * ============ VANHA LAUTA POIS ATLAKSEN ALTA =========================
 *
 * Omistajan linjaus 25.8.2026 (pelitesti iPadilla, v1106: *"kartan
 * scrollaus on aika hidasta ja tökkivää"*): *"Ota vanha maailmankartta
 * suoraan kokonaan pois näkyvistä. Ei siis poisteta sitä mutta tässä
 * näkymässä sitä ei kannata piirtää enää ollenkaan. Rakennetaan uusi
 * kartta korvaamaan vanha kartta kokonaan ja on tässä vaiheessa ihan OK
 * että koska piirto on kesken niin kaikkea kartan osia ei ole vielä
 * näkyvillä."*
 *
 * MIKÄ MAKSOI. Fokusnäkymässä atlaksen lehdet ovat OPAAKKEJA (ks. sääntö
 * 4 tiedoston alussa) ja peittävät alueensa kokonaan — mutta laudan oma
 * bittikartta jäi silti niiden alle: karkea pohjataso (.taide-pohja) ja
 * tarkkojen ruutujen sarja (.staattinen, js/ui.js rasteroiTaide). Ne
 * ovat ruudun kokoisia bittikarttoja, ja panoroinnissa selain maalaa
 * jokaisen paljastuvan kaistaleen niistäkin, vaikka pikselit jäävät
 * lehden alle näkymättömiin. Ennen jatkuvaa atlasta lehtiä oli yksi ja
 * lauta näkyi sen ympärillä; nyt lehdet kattavat ruudun ja koko työ on
 * hukkaan heitettyä.
 *
 * MITATTU (Chromium 430 x 930, kolme oikean kokoista lehteä kartalla,
 * kahdeksan vetoa suuntaansa, kehysvälit rAF:sta):
 *
 *   ennen  — pudonneita kehyksiä (yli 32 ms) 99/1116 = 8,9 %, p99 150 ms
 *   pois   — pudonneita kehyksiä             65/1053 = 6,2 %, p99  67 ms
 *
 * DISPLAY: NONE EIKÄ OPACITY. Läpinäkyvä kerros on yhä osa
 * komposointia — iOS Safari maalaa ja pitää sen puskureissaan
 * täsmälleen kuten näkyvänkin. Sama oppi kuin .fokus-piilossa- ja
 * .fokus-lehden-alla-luokilla (css/styles.css).
 *
 * KOODIA EI POISTETA. Lauta piirretään, rasteroidaan ja pidetään yllä
 * kuten ennenkin (ui.taydennaTaide) heti kun piilotus väistyy —
 * aloitusruudulla, katselutilassa, turvatilassa ja fokusmoodin ollessa
 * pois. Piiloon menee vain PIIRTO ja täsmälleen atlasPaallan ehdoilla.
 *
 * PIILOTUS KATTAA NYT KOKO PELIN (omistajan linjaus 25.8.2026, ilta:
 * *"Vanha kartta pitää ottaa kokonaan pois pelistä toistaiseksi."*).
 * Ensimmäinen versio piilotti laudan vain lähikuvassa (mannerZoom) ja
 * lennon ulkopuolella; omistaja näki vanhan piirroksen yhä
 * avauslennossa ja uloszoomatussa yleiskuvassa. Ehto on nyt sama kuin
 * atlaksella: pelilaudalla piilotus on päällä AINA.
 *
 * PERGAMENTTI JÄÄ. Paperin pohja (.paper-pohja) on laudan juuriryhmän
 * ensimmäinen lapsi eikä kuulu rasteroitavaan taideryhmään (js/ui.js
 * drawPaperPohja), joten lehtien ulkopuolelle jää paperi eikä paneelin
 * tumma tausta. Pelin omat kerrokset — kaupungit, laatat, nappula,
 * kohderenkaat, kohtaamispiste — ovat lehden PÄÄLLÄ omissa
 * ryhmissään eivätkä ole tässä mukana.
 */
const LAUTA_POIS_LUOKKA = 'fokus-atlas-nakyma';

/**
 * Kytkee vanhan laudan piirron pois (tai takaisin).
 *
 * PIILOTUS PYSÄYTTÄÄ MYÖS RASTEROINNIN (omistajan kysymys 25.8.2026:
 * *"Eihän sitä vanhaa maailman karttaa vaan lasketa myös vaikka sitä ei
 * näytetä eikä käytetä?"* — laskettiin: ruutusarja jauhoi satoja
 * millisekunteja pääsäikeessä jokaisen eleen päätteeksi kuvaa, joka on
 * display: none). Piilotuksen huomaa js/ui.js taydennaTaide itse
 * luokasta; paluu on kerrottava, koska mikään muu ei laukaisisi
 * lykättyä työtä ennen seuraavaa elettä.
 */
function paivitaVanhaLauta(ui, paalla) {
  try {
    globalThis.document?.body?.classList?.toggle(LAUTA_POIS_LUOKKA, Boolean(paalla));
  } catch { /* ei bodya (yksikkötesti): näkymää ei ole piilotettavaksi */ }
  if (!paalla) ui?.jatkaLykattyPiirto?.();
}

/** Atlaksen oma ryhmä fokuskerroksessa; luodaan tarvittaessa. */
function atlasRyhma(ui) {
  const kerros = ui.fokuskarttaKerros;
  if (!kerros) return null;
  let g = kerros.querySelector('.fokus-atlas');
  if (!g) {
    // ENSIMMÄISENÄ LAPSENA: nykyisen maan lehti (.fokus-lehti) on tämän
    // päällä, jotta kohdemaa ei jää naapurin vuodon alle. Yleislehti on
    // ainoa, joka menee tämänkin alle — se on koko laudan kokoinen
    // pohja, ei naapuri.
    g = el('g', { class: 'fokus-atlas', 'pointer-events': 'none' });
    const yleis = kerros.querySelector('.fokus-yleislehti');
    kerros.insertBefore(g, yleis ? yleis.nextSibling : kerros.firstChild);
  }
  return g;
}

/** Nykyisen maan oma ryhmä (kuva + lisänimet) atlaksen päällä. */
function lehtiRyhma(ui) {
  const kerros = ui.fokuskarttaKerros;
  if (!kerros) return null;
  let g = kerros.querySelector('.fokus-lehti');
  if (!g) g = el('g', { class: 'fokus-lehti', 'pointer-events': 'none' }, kerros);
  return g;
}

/** Lehden arvioitu koko megapikseleinä (mitattu, jos jo ladattu). */
function lehdenMp(iso, lauta) {
  const tallessa = VARASTO.get(`${lauta}:${iso}`);
  return (tallessa && tallessa !== 'ei' && tallessa.mp) || ATLAS_OLETUS_MP;
}

/**
 * Näkymään osuvat lehdet parhaasta huonoimpaan.
 *
 * KIERTÄVÄ LAUTA: sama lehti voi olla näkyvissä laudan leveyden päässä
 * (js/ui.js kiertoKohdat piirtää kartan uudelleen sauman toiselle
 * puolelle). Jokaisesta lehdestä otetaan se kopio, joka leikkaa näkymää
 * eniten; päivämäärärajan yli ULOTTUVA lehti rajautuisi väärin, mikä on
 * sama tiedossa oleva yksinkertaistus kuin kartan muissakin rajauksissa
 * (js/kartta.js rajaaFokusPan) eikä koske yhtäkään nykyistä lehteä.
 */
function atlasEhdokkaat(ui, nakyva, lauta) {
  const kierto = ui.kartta?.kiertava?.() ? (ui.game.pack.map?.width ?? 0) : 0;
  const vara = {
    x: nakyva.x - nakyva.w * ATLAS_VARA,
    y: nakyva.y - nakyva.h * ATLAS_VARA,
    w: nakyva.w * (1 + 2 * ATLAS_VARA),
    h: nakyva.h * (1 + 2 * ATLAS_VARA),
  };
  /*
   * NÄKYMÄN SYDÄN — keskimmäinen puolikas. Järjestys ei saa olla pelkkä
   * leikkauksen pinta-ala: pystyruudulla näkymä on korkea, ja Norjan
   * lehti (2025 x 1265 yksikköä) leikkaa sellaista näkymää enemmän kuin
   * yksikään Kreikan naapuri, vaikka pelaaja seisoo Ateenassa ja katsoo
   * ruudun keskelle (mitattu 25.8.2026: atlakseen valikoitui Norja).
   * Sydämen osuus painaa nelinkertaisesti, joten lähimmät lehdet tulevat
   * ensin ja kaukainen jättiläinen vasta jos budjettia jää.
   */
  const sydan = {
    x: nakyva.x + nakyva.w * 0.25,
    y: nakyva.y + nakyva.h * 0.25,
    w: nakyva.w * 0.5,
    h: nakyva.h * 0.5,
  };
  const lista = [];
  for (const [iso, tiedot] of Object.entries(FOKUS_POHJAT)) {
    if (tiedot.lauta && tiedot.lauta !== lauta) continue;
    // Tiedetysti puuttuva lehti ei ole ehdokas: muuten valinta odottaisi
    // ikuisesti kuvaa, jota ei ole (VARASTO muistaa puutteen).
    if (VARASTO.get(`${lauta}:${iso}`) === 'ei') continue;
    const b = tiedot.bbox;
    if (!(b?.w > 0) || !(b?.h > 0)) continue;
    // Postimerkkiä ei kannata purkaa: näkymään nähden liian kapea lehti
    // ei toisi ruudulle mitään luettavaa.
    if (b.w < nakyva.w * ATLAS_VAHIMMAISLEVEYS) continue;
    let paras = null;
    for (const dx of kierto ? [0, kierto, -kierto] : [0]) {
      const laatikko = {
        x: b.x + dx, y: b.y, w: b.w, h: b.h,
      };
      const osuus = leikkausAla(laatikko, vara);
      if (osuus > (paras?.osuus ?? 0)) {
        paras = { laatikko, osuus, dx, arvo: osuus + 4 * leikkausAla(laatikko, sydan) };
      }
    }
    if (!paras) continue;
    const ikkuna = tiedot.rajaus ?? b;
    lista.push({
      iso,
      bbox: paras.laatikko,
      ikkuna: {
        x: ikkuna.x + paras.dx, y: ikkuna.y, w: ikkuna.w, h: ikkuna.h,
      },
      arvo: paras.arvo,
      kuva: fokuskarttaUrl(tiedot.tiedosto ?? `${iso}.webp`),
    });
  }
  lista.sort((a, b) => b.arvo - a.arvo);
  return lista;
}

/**
 * Merkitsee lehden peittämät ruudut ja kertoo, kuinka moni niistä oli
 * uusi. `merkitse = false` vain kysyy.
 */
function peita(ruudut, laatikko, nakyva, merkitse) {
  let uusia = 0;
  for (let iy = 0; iy < ATLAS_RUUTUJA_Y; iy += 1) {
    const y = nakyva.y + ((iy + 0.5) / ATLAS_RUUTUJA_Y) * nakyva.h;
    if (y < laatikko.y || y > laatikko.y + laatikko.h) continue;
    for (let ix = 0; ix < ATLAS_RUUTUJA_X; ix += 1) {
      const x = nakyva.x + ((ix + 0.5) / ATLAS_RUUTUJA_X) * nakyva.w;
      if (x < laatikko.x || x > laatikko.x + laatikko.w) continue;
      const i = iy * ATLAS_RUUTUJA_X + ix;
      if (ruudut[i]) continue;
      uusia += 1;
      if (merkitse) ruudut[i] = 1;
    }
  }
  return uusia;
}

/**
 * Ahne valinta: mitkä lehdet kuuluvat juuri nyt atlakseen?
 *
 * Nykyisen maan lehti ei ole listassa (se piirtyy omaan ryhmäänsä),
 * mutta se vie peittoa ja muistibudjettia — muuten kohdemaan viereen
 * ladattaisiin naapureita, joita ei näy.
 */
function atlasValinta(ui, nakyva, lauta, nykyinen, ehdokkaat) {
  const ruudut = new Uint8Array(ATLAS_RUUTUJA_X * ATLAS_RUUTUJA_Y);
  const valitut = [];
  let mp = 0;
  const oma = ehdokkaat.find((e) => e.iso === nykyinen);
  if (oma) {
    peita(ruudut, oma.bbox, nakyva, true);
    mp += lehdenMp(oma.iso, lauta);
  }
  for (const e of ehdokkaat) {
    if (e.iso === nykyinen) continue;
    if (valitut.length + (oma ? 1 : 0) >= atlasEnintaan()) break;
    if (peita(ruudut, e.bbox, nakyva, false) < ATLAS_UUSIA_RUUTUJA) continue;
    const koko = lehdenMp(e.iso, lauta);
    // Budjetin täyttyminen ei lopeta hakua: seuraava lehti voi olla
    // pieni (Kypros 5,6 Mp) ja mahtua vielä.
    if (mp + koko > atlasMegapikselia()) continue;
    peita(ruudut, e.bbox, nakyva, true);
    mp += koko;
    valitut.push(e);
  }
  return valitut;
}

/**
 * Vapauttaa yhden lehden: irti DOMista = purettu kuva pois muistista.
 *
 * PIENENNETYLLÄ LEHDELLÄ ON MYÖS BLOB-OSOITE, joka pitää pakatut tavut
 * hengissä niin kauan kuin sitä ei vapauteta. Yksi lehti on kolmisen
 * megatavua ja niitä kertyisi maa maalta koko istunnon ajan — vuoto
 * söisi juuri sen hyödyn, jonka pienennys tuo. Vapautus tehdään vasta
 * kun mikään kartalla oleva kuva ei enää käytä osoitetta.
 */
function vapautaLehti(ui, iso) {
  const tieto = ui.atlasLehdet?.get(iso);
  if (!tieto) return;
  tieto.el?.remove();
  ui.atlasLehdet.delete(iso);
  siivoaLehtiUrlit(ui);
}

/**
 * LRU-vapautus: pudottaa kauimmin sitten käytetyt lehdet, kunnes
 * molemmat katot toteutuvat. Suojatut (juuri nyt valitut) jäävät.
 */
function karsiAtlas(ui, lauta, suojatut) {
  const lehdet = ui.atlasLehdet;
  if (!lehdet?.size) return;
  const yli = () => {
    let mp = ui.atlasOmaMp ?? 0;
    for (const [iso] of lehdet) mp += lehdenMp(iso, lauta);
    return lehdet.size + (ui.atlasOmaMp ? 1 : 0) > atlasEnintaan()
      || mp > atlasMegapikselia();
  };
  while (yli()) {
    let vanhin = null;
    for (const [iso, tieto] of lehdet) {
      if (suojatut.has(iso)) continue;
      if (!vanhin || tieto.kaytetty < vanhin.kaytetty) vanhin = { iso, kaytetty: tieto.kaytetty };
    }
    if (!vanhin) return; // pelkkiä suojattuja jäljellä: katto joustaa
    vapautaLehti(ui, vanhin.iso);
  }
}

/*
 * ============ KAUKOZOOMIN YLEISLEHTI (omistajan tilaus 26.8.2026) ====
 *
 * *"Uloszoomattu maailmankartta näyttää tilkkutäkiltä"*, koska jokainen
 * maalehti korostaa omaa maataan ja piirtää naapurit haaleina — kaksi
 * vierekkäistä lehteä esittää saman rajaseudun eri voimalla. Vastaus on
 * YKSI koko laudan kattava lehti ilman maakorostuksia
 * (tools/tee-yleislehti.mjs, js/packs/fokus-grc.js YLEISLEHTI), joka
 * näytetään kaukaa ja väistyy maalehtien tieltä lähempänä.
 *
 * === KYNNYS ON 2600 LAUTAYKSIKKÖÄ, JA SE ON MITTA EIKÄ MAKUASIA ===
 *
 * Yleislehti on 6400 pikseliä koko laudan 12000 yksikölle eli 0,53
 * kuvapikseliä yksikköä kohti. Kun näkymä on 2600 yksikköä leveä, sitä
 * katsotaan noin 1:1 (2600 x 0,53 = 1387 kuvapikseliä tuhatkunnan
 * pisteen ruudulle); sitä lähempänä kuvaa alettaisiin suurentaa, ja
 * juuri siinä kohtaa maalehtien tarkkuutta tarvitaan. Toisin päin
 * katsottuna 2600 yksikköä on mannerta leveämpi näkymä — Eurooppa on
 * laudalla noin 1700 ja Afrikka 2300 yksikköä leveä — joten yhdenkään
 * maan lehti ei ole siinä mittakaavassa enää luettava.
 *
 * HYSTEREESI ±10 % on pakollinen eikä hienosäätöä. Ilman sitä kynnyksen
 * päällä keikkuva näkymä purkaisi ja hakisi lehdet vuorotellen joka
 * kehyksessä — sama välkyntä, joka atlaksen valinnasta jouduttiin
 * poistamaan (ks. "HYSTEREESI VÄLKKYMISTÄ VASTAAN").
 *
 * === MAALEHDET PURETAAN, JA SE ON KOKO PALKINTO ===
 *
 * Kaukozoomissa kartalla oli tähän asti neljä tai viisi maalehteä —
 * pienennettynäkin 6,4 megapikseliä kappale — eikä yksikään niistä
 * näyttänyt yhtään yksityiskohtaa, jota tässä mittakaavassa lukisi.
 * Kun yleislehti tulee tilalle, kaikki maalehdet irrotetaan DOMista
 * (juuri se vapauttaa puretun kuvan) ja muistiin jää yksi kuva.
 * Lähizoomissa mikään ei muutu: katot, LRU ja valinta ovat ennallaan.
 *
 * TURVATILASSA EI YLEISLEHTEÄKÄÄN. Sama sääntö kuin muillakin lehdillä
 * (atlasTurvatila): turvatilassa ei pureta yhtäkään isoa kuvaa, ja
 * laudan oma pergamentti riittää. Tämä koodi on atlasPaallan takana,
 * joten turvatilassa yleislehteä ei edes haeta.
 */
const KAUKOZOOMIN_RAJA = 2600;
const KAUKOZOOMIN_HYSTEREESI = 0.1;

/** Onko näkymä kaukozoomissa? Edellinen tila ratkaisee kynnyksen välissä. */
function kaukozoomissa(ui, leveys) {
  if (!(leveys > 0)) return false;
  if (leveys > KAUKOZOOMIN_RAJA * (1 + KAUKOZOOMIN_HYSTEREESI)) return true;
  if (leveys < KAUKOZOOMIN_RAJA * (1 - KAUKOZOOMIN_HYSTEREESI)) return false;
  return Boolean(ui.yleislehtiPaalla);
}

/** Yleislehden oma ryhmä — kaiken muun alla, koska se on pohja. */
function yleislehtiRyhma(ui) {
  const kerros = ui.fokuskarttaKerros;
  if (!kerros) return null;
  let g = kerros.querySelector('.fokus-yleislehti');
  if (!g) {
    g = el('g', { class: 'fokus-yleislehti', 'pointer-events': 'none' });
    kerros.insertBefore(g, kerros.firstChild);
  }
  return g;
}

/**
 * Hakee ja piirtää yleislehden, jos sitä ei jo ole kartalla.
 *
 * Lehti kulkee saman haun ja saman muistipienennyksen läpi kuin
 * maalehdet (haePohja → lataaLehti), joten puhelimessa ja kuoressa se
 * puretaan pienennettynä eikä täytenä.
 */
function naytaYleislehti(ui, lauta) {
  const ryhma = yleislehtiRyhma(ui);
  if (!ryhma) return;
  if (YLEISLEHTI?.lauta && YLEISLEHTI.lauta !== lauta) return;
  if (ryhma.querySelector('image') || ui.yleislehtiHaku) return;
  ui.yleislehtiHaku = true;
  void haePohja(YLEISLEHDEN_AVAIN, lauta, ui.game.pack.map).then((pohja) => {
    ui.yleislehtiHaku = false;
    if (ui.dead || !pohja?.kuva || !ui.fokuskarttaKerros) return;
    // Näkymä on voinut palata lähikuvaan haun aikana; silloin lehti
    // jää varastoon eikä kartalle.
    if (!ui.yleislehtiPaalla || ui.game.pack.id !== lauta) return;
    const kohde = yleislehtiRyhma(ui);
    if (!kohde || kohde.querySelector('image')) return;
    pohja.piirretty = true;
    el('image', {
      x: pohja.bbox.x,
      y: pohja.bbox.y,
      width: pohja.bbox.w,
      height: pohja.bbox.h,
      href: pohja.kuva,
      preserveAspectRatio: 'none',
      class: 'fokuskartta-kuva',
    }, kohde);
  });
}

/** Yleislehti pois kartalta ja sen blob-osoite vapautettavaksi. */
function poistaYleislehti(ui) {
  const ryhma = ui.fokuskarttaKerros?.querySelector('.fokus-yleislehti');
  if (!ryhma?.firstChild) return;
  ryhma.replaceChildren();
  siivoaLehtiUrlit(ui);
}

/**
 * Palauttaa nykyisen maan lehden kartalle kaukozoomin jälkeen.
 *
 * Maa ei vaihtunut, joten paivitaFokuskartta ei tee mitään (se vertaa
 * vain avainta) — ja purettu lehti on irrotettu DOMista. Atlaksen muut
 * lehdet palaavat itsestään, koska valinnan tunniste nollataan.
 *
 * YLEISLEHTI POISTETAAN VASTA TÄSSÄ, EI HETI KYNNYKSEN ALITTUESSA.
 * Maalehden purku kestää satoja millisekunteja (blob-osoite on voitu jo
 * vapauttaa), ja jos pohja vedettäisiin alta samassa kehyksessä, väliin
 * jäisi välähdys tyhjää pergamenttia. `yleislehtiPalautus` kertoo
 * kutsujalle, että poisto on jo hoidossa.
 */
function palautaMaalehti(ui) {
  const valmis = () => {
    ui.yleislehtiPalautus = false;
    if (!ui.yleislehtiPaalla) poistaYleislehti(ui);
  };
  const iso = ui.fokuskarttaAvain;
  const ryhma = lehtiRyhma(ui);
  if (!iso || iso === 'pois' || !ryhma || ryhma.querySelector('image')) {
    valmis();
    return;
  }
  const lauta = ui.game.pack.id;
  ui.yleislehtiPalautus = true;
  void haePohja(iso, lauta, ui.game.pack.map).then((pohja) => {
    if (ui.dead) return;
    if (pohja?.kuva && ui.fokuskarttaAvain === iso && !ui.yleislehtiPaalla
      && ui.game.pack.id === lauta) piirra(ui, iso, pohja);
    // Myös epäonnistunut haku päättää palautuksen: yleislehti ei saa
    // jäädä muistiin siksi, ettei maalla ollutkaan omaa lehteä.
    valmis();
  });
}

/**
 * Tahdistaa atlaksen näkymään. Kutsutaan aina kun näkymä on ASETTUNUT
 * (js/ui.js paivitaMaastonimet) ja fokuskerroksen päivityksestä.
 *
 * Työ on halpaa, kun mikään ei muuttunut: karkea näkymätunniste
 * (atlasAvain) ohittaa koko valinnan. Tunniste on karkea tarkoituksella
 * — pienen panoroinnin jälkeen sama joukko lehtiä on yhä oikea.
 */
export function paivitaFokusAtlas(ui) {
  /*
   * VANHAN LAUDAN PIIRTO ENSIMMÄISENÄ ja ennen kaikkia varhaisia
   * paluita: tämä funktio on ainoa paikka, joka tietää atlaksen tilan,
   * ja sitä kutsutaan sekä joka piirrosta (ui.paivitaFokusKerros) että
   * jokaisesta näkymän asettumisesta (ui.paivitaMaastonimet). Jos
   * kytkentä olisi vasta ryhmän luonnin jälkeen, lauta jäisi piiloon
   * niissä tilanteissa, joissa fokuskerrosta ei ole (laudan vaihto).
   */
  const atlas = atlasPaalla(ui);
  paivitaVanhaLauta(ui, atlas);
  const ryhma = atlasRyhma(ui);
  if (!ryhma) return;
  ui.atlasLehdet ??= new Map();
  ui.atlasHaut ??= new Set();
  if (!atlas) {
    // Turvatila ja fokusmoodin sammutus vievät myös yleislehden: tässä
    // haarassa kartalle ei jätetä yhtäkään purettua kuvaa.
    ui.yleislehtiPaalla = false;
    ui.yleislehtiPalautus = false;
    poistaYleislehti(ui);
    if (ui.atlasLehdet.size) {
      for (const iso of [...ui.atlasLehdet.keys()]) vapautaLehti(ui, iso);
      ui.atlasAvain = null;
      ui.paivitaAtlasVerho?.();
    }
    return;
  }
  const nakyva = ui.nakyvaAlue?.();
  if (!nakyva?.w) return;
  const lauta = ui.game.pack.id;

  /*
   * KAUKOZOOMI ENNEN VALINTAA (ks. "KAUKOZOOMIN YLEISLEHTI"): jos
   * näkymä on mannerta leveämpi, kartalla on yksi yhtenäinen lehti ja
   * maalehdet puretaan pois. Tila muistetaan, koska kynnyksellä on
   * hystereesi.
   */
  /*
   * PUUTTUVA YLEISLEHTI EI SAA TYHJENTÄÄ KARTTAA (sääntö 1 tiedoston
   * alussa: puuttuva kuva ei riko mitään). Jos MAAILMA.webp ei ole
   * ämpärissä — uusi versio ennen kuvan vientiä, katkaisija pois
   * päältä, verkko poikki — kaukozoom palaa maalehtien atlakseen
   * sellaisena kuin se oli ennen tätä pakettia. Puute muistetaan
   * käynnin ajaksi (VARASTO), joten turhaa hakua ei toisteta.
   */
  const kauko = kaukozoomissa(ui, nakyva.w)
    && VARASTO.get(`${lauta}:${YLEISLEHDEN_AVAIN}`) !== 'ei';
  if (Boolean(ui.yleislehtiPaalla) !== kauko) {
    ui.yleislehtiPaalla = kauko;
    // Valinta on laskettava uudelleen kumpaankin suuntaan: lehdet joko
    // purettiin juuri tai ne kuuluu hakea takaisin.
    ui.atlasAvain = null;
    if (!kauko) palautaMaalehti(ui);
  }
  if (kauko) {
    if (ui.atlasLehdet.size) {
      for (const iso of [...ui.atlasLehdet.keys()]) vapautaLehti(ui, iso);
      ui.paivitaAtlasVerho?.();
    }
    /*
     * MYÖS NYKYISEN MAAN LEHTI PURETAAN. Se on kaukozoomissa yhtä
     * lukukelvoton tilkku kuin naapurien lehdet, ja sen purettu kuva on
     * suurin yksittäinen erä muistia. Maan tunnus (fokuskarttaAvain)
     * jää ennalleen, joten paluu lähizoomiin piirtää sen takaisin
     * (palautaMaalehti) ilman että peli luulee maan vaihtuneen.
     */
    const oma = lehtiRyhma(ui);
    if (oma?.firstChild) {
      oma.replaceChildren();
      siivoaLehtiUrlit(ui);
    }
    naytaYleislehti(ui, lauta);
    return;
  }
  // Kesken oleva palautus poistaa yleislehden itse, kun maalehti on
  // kartalla (palautaMaalehti) — muuten se poistetaan tässä.
  if (!ui.yleislehtiPalautus) poistaYleislehti(ui);
  const nykyinen = ui.fokuskarttaAvain !== 'pois' ? ui.fokuskarttaAvain : null;
  ui.atlasOmaMp = nykyinen ? lehdenMp(nykyinen, lauta) : 0;
  // Karkea tunniste: kymmenesosa näkymän mitasta riittää tarkkuudeksi.
  const avain = [
    lauta, nykyinen ?? '-',
    Math.round(nakyva.x / (nakyva.w / 10)),
    Math.round(nakyva.y / (nakyva.h / 10)),
    Math.round(Math.log2(nakyva.w) * 4),
  ].join(':');
  if (ui.atlasAvain === avain) return;

  const ehdokkaat = atlasEhdokkaat(ui, nakyva, lauta);
  const valitut = atlasValinta(ui, nakyva, lauta, nykyinen, ehdokkaat);
  ui.atlasValitut = new Set(valitut.map((v) => v.iso));
  /*
   * HYSTEREESI VÄLKKYMISTÄ VASTAAN (omistajan iPad-havainto 25.8.2026:
   * "Scrollatessa karttaa jotkut maat ilmestyvät ja häviävät
   * vuorotellen"). Kaksi mekanismia tuotti välkkeen: (1) LRU pudotti
   * katon täyttyessä lehtiä, jotka olivat yhä RUUDULLA mutta eivät
   * valittuja — seuraava vieritys valitsi ne takaisin; (2) varan
   * reunalla keikkuva lehti vapautettiin ja haettiin vuorotellen.
   * Siksi: karsinta suojaa kaikki ruudulla näkyvät ladatut lehdet
   * (ei vain valittuja), ja välitön vapautus tehdään vasta selvästi
   * varan takaa (tuplavara). Muisti pysyy aisoissa, koska UUSIA lehtiä
   * haetaan yhä vain valintabudjetin (atlasMegapikselia) verran —
   * suojaus koskee vain jo maksettuja, yhä näkyviä kuvia.
   */
  ui.atlasSuojatut = new Set(ui.atlasValitut);
  for (const [iso, tieto] of ui.atlasLehdet) {
    if (tieto.bbox && leikkausAla(tieto.bbox, nakyva) > 0) ui.atlasSuojatut.add(iso);
  }
  const tuplavara = {
    x: nakyva.x - nakyva.w * ATLAS_VARA * 2,
    y: nakyva.y - nakyva.h * ATLAS_VARA * 2,
    w: nakyva.w * (1 + 4 * ATLAS_VARA),
    h: nakyva.h * (1 + 4 * ATLAS_VARA),
  };
  /*
   * KAUKAINEN LEHTI VAPAUTETAAN HETI, EI VASTA KATON TÄYTTYESSÄ. LRU
   * yksin pitäisi purettua kuvaa muistissa katon verran, ja katto on
   * satoja megatavuja — iOS:llä se on juuri se tilanne, jossa seuraava
   * purku epäonnistuu ja kartta jää tyhjäksi. Näkymän (ja sen varan)
   * ulkopuolelle jäänyt lehti ei näytä mitään, joten sillä ei ole
   * mitään syytä olla muistissa. LRU alla hoitaa loput: näkymässä yhä
   * olevat mutta valitsematta jääneet lehdet saavat jäädä välimuistiin,
   * kunnes katto oikeasti täyttyy.
   */
  const lahella = new Set(ehdokkaat.map((e) => e.iso));
  for (const [iso, tieto] of [...ui.atlasLehdet]) {
    if (lahella.has(iso)) continue;
    // Hystereesi: vapautus vasta kun lehti on selvästi varan takana —
    // varan reunalla keikkuva lehti ei saa välkkyä (ks. yllä).
    if (tieto.bbox && leikkausAla(tieto.bbox, tuplavara) > 0) continue;
    vapautaLehti(ui, iso);
  }
  ui.atlasKello = (ui.atlasKello ?? 0) + 1;
  const nyt = ui.atlasKello;
  let kesken = false;
  for (const v of valitut) {
    const tieto = ui.atlasLehdet.get(v.iso);
    if (tieto) { tieto.kaytetty = nyt; continue; }
    kesken = true;
    if (ui.atlasHaut.has(v.iso)) continue;
    ui.atlasHaut.add(v.iso);
    void haePohja(v.iso, lauta, ui.game.pack.map).then((pohja) => {
      ui.atlasHaut?.delete(v.iso);
      /*
       * SAAPUNUT LEHTI OTETAAN VASTAAN, VAIKKA NÄKYMÄ OLISI EHTINYT
       * SIIRTYÄ (mitattu 25.8.2026). Ensimmäinen versio hylkäsi lehden,
       * jos näkymätunniste oli vaihtunut haun aikana — ja koska kamera-ajo
       * päivittää tunnisteen useasti sekunnissa, jokainen ajon aikana
       * alkanut haku hylättiin ja atlas jäi tyhjäksi. Purettu kuva on jo
       * maksettu siinä vaiheessa; oikea paikka päättää sen kohtalosta on
       * LRU-karsinta, joka pudottaa sen heti jos katot ylittyvät.
       */
      if (ui.dead || !pohja?.kuva || !ui.fokuskarttaKerros) return;
      if (ui.game.pack.id !== lauta || !atlasPaalla(ui)) return;
      const kohde = atlasRyhma(ui);
      if (!kohde || ui.atlasLehdet.has(v.iso)) return;
      // Maa ehti vaihtua haun aikana juuri tähän: sen lehti kuuluu nyt
      // omaan ryhmäänsä eikä atlakseen (ks. piirra, kaksoiskappale).
      if (v.iso === ui.fokuskarttaAvain) return;
      /*
       * NÄKYMÄ EHTI SILTI SIIRTYÄ NIIN KAUAS, ETTEI LEHTI NÄY (mitattu
       * 25.8.2026, ilta). Yllä oleva sääntö "otetaan vastaan vaikka
       * tunniste vaihtui" on oikea kamera-ajolle, jossa lehti on koko
       * ajan menossa RUUDULLE — mutta väärä aloituslennolle, joka on
       * nyt atlaksen piirissä: lento katsoo koko Eurooppaa ja aloittaa
       * kourallisen hakuja, joista osa valmistuu vasta perillä
       * Ateenassa. Ne jäivät kartalle, koska LRU-vapautus lasketaan
       * vain paivitaFokusAtlaksen alussa ja asettunut näkymä ohittaa
       * sen tunnisteella (atlasAvain). Mitattuna Ateenassa jäi
       * Norjan lehti — 2025 x 1265 yksikköä opaakkia kuvaa ruudun
       * ulkopuolella, joka maalattiin jokaisessa nipistyskehyksessä.
       *
       * TESTI ON GEOMETRIAA EIKÄ TUNNISTE: sama tuplavara kuin
       * hystereesillä yllä, joten varan reunalla keikkuva lehti tulee
       * yhä vastaanotetuksi eikä ala välkkyä.
       */
      const nyky = ui.nakyvaAlue?.();
      if (nyky?.w > 0) {
        const raja = {
          x: nyky.x - nyky.w * ATLAS_VARA * 2,
          y: nyky.y - nyky.h * ATLAS_VARA * 2,
          w: nyky.w * (1 + 4 * ATLAS_VARA),
          h: nyky.h * (1 + 4 * ATLAS_VARA),
        };
        if (!(leikkausAla(v.bbox, raja) > 0)) return;
      }
      // Osoite on nyt kartalla: siivous saa vapauttaa sen vasta kun
      // lehti irrotetaan (siivoaLehtiUrlit).
      pohja.piirretty = true;
      const kuva = el('image', {
        x: v.bbox.x,
        y: v.bbox.y,
        width: v.bbox.w,
        height: v.bbox.h,
        href: pohja.kuva,
        preserveAspectRatio: 'none',
        class: 'fokuskartta-kuva',
      }, kohde);
      ui.atlasLehdet.set(v.iso, {
        el: kuva, kaytetty: nyt, bbox: v.bbox, ikkuna: v.ikkuna,
      });
      // ISO LEHTI POHJIMMAISEKSI: pienempi maa ei saa jäädä naapurinsa
      // vuodon alle. Järjestys on halpa korjata, koska solmuja on
      // korkeintaan kahdeksan.
      const jarjestys = [...ui.atlasLehdet.values()]
        .sort((a, b) => (b.bbox.w * b.bbox.h) - (a.bbox.w * a.bbox.h));
      for (const t of jarjestys) kohde.appendChild(t.el);
      karsiAtlas(ui, lauta, ui.atlasSuojatut ?? ui.atlasValitut ?? new Set());
      // Verho ei tiedä uudesta lehdestä ennen kuin sille kerrotaan.
      ui.paivitaAtlasVerho?.();
    });
  }
  /*
   * TUNNISTE VASTA KUN JOUKKO ON KOOSSA. Jos yksikin lehti on vielä
   * matkalla, tunniste jätetään nollaksi ja valinta lasketaan uudelleen
   * seuraavasta piirrosta — muuten kesken jäänyt haku ei koskaan saisi
   * toista tilaisuutta. Uusintalaskenta on halpa (39 laatikkotestiä) ja
   * käynnissä oleva haku tunnistetaan atlasHaut-joukosta.
   */
  ui.atlasAvain = kesken ? null : avain;
  const ennen = ui.atlasLehdet.size;
  karsiAtlas(ui, lauta, ui.atlasSuojatut ?? ui.atlasValitut);
  if (ui.atlasLehdet.size !== ennen) ui.paivitaAtlasVerho?.();
}

/**
 * Atlaksen lehtien laatikot verhoa varten (js/ui.js paivitaFokusSumu).
 *
 * Palauttaa vain ne lehdet, joiden maa on annetussa joukossa: PELITILASSA
 * käymättömän maan päällä pysyy sumuverho (Raamattu, osio "Fokusmoodi":
 * *"käymättömät maat himmeinä"*) vaikka sen lehti piirtyisikin alle.
 */
export function fokusAtlasIkkunat(ui, maat) {
  const ulos = [];
  for (const [iso, tieto] of ui.atlasLehdet ?? []) {
    if (maat && !maat.has(iso)) continue;
    ulos.push({ bbox: tieto.bbox, ikkuna: tieto.ikkuna });
  }
  return ulos;
}

/** Piirtää lehden ja kertoo kartalle, että sen alue on nyt kuvan alla. */
function piirra(ui, iso, pohja) {
  const ryhma = lehtiRyhma(ui);
  if (!ryhma || !pohja.kuva) return;
  ryhma.textContent = '';
  const { bbox } = pohja;
  // Osoite on kartalla: pienennetyn lehden blob-osoitetta ei vapauteta
  // ennen kuin tämä kuva on irronnut (siivoaLehtiUrlit).
  pohja.piirretty = true;
  el('image', {
    x: bbox.x,
    y: bbox.y,
    width: bbox.w,
    height: bbox.h,
    href: pohja.kuva,
    // Rajaus on kuvan oma mittasuhde; venytys estetään silti
    // erikseen, jottei pyöristys jätä pikselin rakoa reunaan.
    preserveAspectRatio: 'none',
    class: 'fokuskartta-kuva',
  }, ryhma);
  // Nimet päällimmäisenä tässä kerroksessa — mutta yhä kaupunkien ja
  // laattojen alla, koska koko kerros on niiden alla. Nykyisellä
  // lipulla (FOKUS_SVG_NIMET) tämä ei tee mitään: nimet ovat kuvassa.
  piirraLisanimet(ui, iso, ryhma);
  paivitaFokusNimet(ui);
  /*
   * SAMA MAA EI SAA OLLA KARTALLA KAHDESTI (mitattu 25.8.2026, ilta).
   *
   * Aloituslennon aikana nykyistä maata ei ole ('pois'), joten kohdemaa
   * on atlaksen mielestä tavallinen naapuri ja latautuu .fokus-atlas
   * -ryhmään. Perillä sama maa saa oman ryhmänsä — ja atlaksen kopio
   * jäi paikoilleen, koska LRU vapauttaa vain näkymästä poistuneita
   * lehtiä eikä yksikään lehti ole niin varmasti näkymässä kuin se,
   * jossa seistään. Kartalla oli siis kaksi identtistä opaakkia kuvaa
   * päällekkäin: kaksinkertainen maalaus jokaisessa panorointikehyksessä
   * ja kaksinkertainen muistilasku (mitattu Ateenassa: pudonneita
   * kehyksiä nipistyksessä 5,5 % → 18,1 %).
   *
   * VASTA TÄSSÄ, KUVAN ASETTAMISEN JÄLKEEN. vapautaLehti siivoaa myös
   * pienennettyjen lehtien blob-osoitteet sen mukaan, mitkä osoitteet
   * ovat elävässä DOMissa (siivoaLehtiUrlit) — ennen appendChildia sama
   * osoite näyttäisi käyttämättömältä ja vapautuisi juuri asetetun
   * kuvan alta.
   */
  vapautaLehti(ui, iso);
  // Kaksi laatikkoa: kuva vie bboxin, mutta kameran ja rajausten
  // mittapuu on IKKUNA (ks. maanNakyma ja kartta.fokusRajaukset).
  ui.paivitaFokusPohja?.(bbox, pohja.rajaus ?? bbox);
}

/**
 * Tahdistaa fokuskartan nykyiseen maahan.
 *
 * Kutsutaan joka piirrossa (ui.paivitaFokusKerros). Työ tehdään vain
 * kun maa oikeasti vaihtui — muuten kutsu on yksi vertailu.
 *
 * KAMERA-AJO vain maasta toiseen siirryttäessä, ei laudan ensimmäisessä
 * piirrossa: sivun lataus kesken pelin ei ole saapuminen, ja silloin
 * kartan oma saapumiszoom (kartta.ajastaMannerZoom) hoitaa näkymän.
 * Ajo lähtee SAMASSA KEHYKSESSÄ kuin maa vaihtuu eikä odota kuvaa
 * verkosta (ks. maanNakyma).
 */
export function paivitaFokuskartta(ui) {
  const kerros = ui.fokuskarttaKerros;
  if (!kerros) return;
  const maa = nykyinenMaa(ui);
  /*
   * === LENNON AIKANA EI LEHTEÄ (omistajan pelitesti 25.8.2026) ======
   *
   * *"Kreikan fokuskuva piirtyy rumana suorakaiteena oikeaan alakulmaan
   * ja jättimäiset nimilaput ATEENA ja Kreeta leikkautuvat ruudun
   * reunaan."*
   *
   * Peli siirtää nappulan perille jo lennon alussa (actionPickStart),
   * joten kohdemaa on kartan mielestä "nykyinen maa" koko lennon ajan —
   * ja lehti ilmestyi Euroopan yleiskuvaan pikkuruisena suorakaiteena
   * keskelle merta. Sen mukana tulivat kaikki muutkin fokuskerrokset,
   * jotka lukevat pohjan olemassaoloa (ui.fokusPohjaBbox): verhon
   * reikä, laatan alle keskitetyt nimilaput ja kohtaamispiste.
   *
   * Fokuskerrokset kuuluvat vasta laskeutumisen jälkeiseen
   * kamera-ajoon — jonka tämä sama funktio käynnistää heti kun lippu
   * laskeutuu, koska maa vaihtuu silloin arvosta 'pois' kohdemaahan.
   *
   * KOHDEMAAN KUVA EI SILTI KATOA LENNOSTA (omistajan linjaus
   * 25.8.2026, ilta: vanha kartta pois myös lennosta, *"lennossa
   * näkyvät atlas-lehdet ja sumu kuten muutenkin"*). Kun `iso` on
   * lennon ajan null, kohdemaa ei ole atlaksen mielestä "nykyinen maa"
   * vaan tavallinen ehdokas — ja piirtyy siis muiden lehtien joukossa
   * atlasryhmään (paivitaFokusAtlas). Pois jää vain se, mikä v1103:ssa
   * oli vikana: oma lehtiryhmä, verhon reikä, laatan alle keskitetyt
   * nimilaput ja kohtaamispiste, jotka kaikki lukevat ui.fokusPohjaBbox
   * -kenttää. Lento pysyy siis niukkana eikä määränpää erotu muista
   * maista, mutta kartta on kartta eikä tyhjä paperi.
   *
   * KUVA HAETAAN SILTI JO LENNON AIKANA. Pohja on megatavujen
   * kokoinen, ja jos lataus alkaisi vasta laskeutumisesta, lehti
   * välähtäisi paikalleen vasta sekunteja kamera-ajon jälkeen. Haku on
   * välimuistitettu (VARASTO, HAUT), joten toistuvat piirrot eivät
   * kuormita mitään.
   */
  if (maa && ui.aloituslentoKesken) {
    void haePohja(maa, ui.game.pack.id, ui.game.pack.map);
  }
  const iso = ui.aloituslentoKesken ? null : maa;
  const avain = iso ?? 'pois';
  if (ui.fokuskarttaAvain === avain) return;
  const ensimmainen = ui.fokuskarttaAvain == null;
  ui.fokuskarttaAvain = avain;
  /*
   * VAIN NYKYISEN MAAN RYHMÄ TYHJENNETÄÄN, EI KOKO KERROSTA. Atlaksen
   * naapurilehdet (.fokus-atlas) elävät näkymän eivätkä vuoron mukana:
   * jos ne pyyhittäisiin joka maanvaihdossa, ne purettaisiin heti
   * uudelleen — ja juuri purku on se kallis työ (ks. atlaksen johdanto).
   */
  lehtiRyhma(ui)?.replaceChildren();
  // Edellisen maan lehti on nyt irti kartalta: jos se oli pienennetty,
  // sen blob-osoite on vapautettava (ellei sama kuva ole yhä atlaksessa).
  siivoaLehtiUrlit(ui);
  // Atlaksen valinta on maakohtainen (nykyisen maan lehti vie peiton ja
  // budjetin), joten tunniste on nollattava — muuten uusi maa jäisi
  // vanhan valinnan varaan seuraavaan panorointiin asti.
  ui.atlasAvain = null;
  ui.paivitaFokusPohja?.(null);
  if (!iso) {
    paivitaFokusAtlas(ui);
    return;
  }

  const nayta = (pohja) => {
    // Maa on voinut vaihtua haun aikana (botti, nopea siirto).
    if (ui.dead || !pohja?.kuva || ui.fokuskarttaAvain !== iso || !ui.fokuskarttaKerros) return;
    /*
     * KAUKOZOOMISSA MAALEHTEÄ EI PIIRRETÄ. Näkymä on voinut loitontua
     * haun aikana, ja silloin kartalla on yleislehti — juuri tästä
     * haarasta tullut maalehti jäisi sen päälle tilkuksi, jota mikään
     * ei enää irrottaisi ennen seuraavaa maanvaihtoa. Lehti palaa
     * lähizoomissa (palautaMaalehti).
     */
    if (ui.yleislehtiPaalla) return;
    /*
     * KAMERA AJAA LEHDEN IKKUNAAN, EI KOKO KUVAAN. Kuvassa on ikkunan
     * ympärillä vuotoa, jonka tehtävä on jäädä ruudun ulkopuolelle — jos
     * kamera sovittaisi koko kuvan, pelaaja näkisi lehden pienenä ruudun
     * keskellä ja vuodon reunat ympärillä.
     *
     * AJO EI OLE ENÄÄ TÄSSÄ vaan saapumishetkellä (ks. maanNakyma).
     * Piirto tekee sen, mitä kuvan saapuminen vaatii: asettaa kuvan ja
     * kertoo rajauksen kartalle, joka tarkistaa samalla, mahtuuko
     * ikkuna ruudulle (kartta.tarkistaFokusZoom).
     */
    piirra(ui, iso, pohja);
  };

  const lauta = ui.game.pack.id;
  /*
   * KAMERA AJAA HETI, EI VASTA KUVAN LATATTUA. Sivun lataus kesken pelin
   * ei ole saapuminen (silloin kartan oma saapumiszoom hoitaa näkymän),
   * mutta maasta toiseen siirtyminen on — ja silloin näkymä vaihtuu
   * samassa kehyksessä kuin maa.
   */
  if (!ensimmainen) {
    const nakyma = maanNakyma(ui, iso, lauta);
    if (nakyma) ui.kartta?.ajaKamera?.(nakyma);
  }
  const valmis = VARASTO.get(`${lauta}:${iso}`);
  // Jo muistissa JA yhä osoitteineen: piirretään samassa kehyksessä,
  // jottei kuva välähdä vasta seuraavalla ruudunpäivityksellä. Ilman
  // osoitetta (vapautettu blob) pohja puretaan uudelleen kuten uusi.
  if (valmis && valmis !== 'ei' && valmis.kuva) nayta(valmis);
  else if (valmis !== 'ei') void haePohja(iso, lauta, ui.game.pack.map).then(nayta);
  /*
   * NYKYISEN MAAN LEHTI ON MYÖS ATLAKSEN LEHTI: se vie peittoa ja
   * muistibudjettia, joten naapurivalinta on tehtävä uusiksi heti eikä
   * vasta seuraavasta panoroinnista. Kun maa on juuri vaihtunut, atlas
   * on tavallisesti tyhjä — kohdemaan lehti täyttää ruudun yksin.
   */
  paivitaFokusAtlas(ui);
}

/** Laudan vaihto: kerros, atlas ja muistettu maa nollille. */
export function nollaaFokuskartta(ui) {
  /*
   * Uusi lauta piirtyy näkyviin kokonaisena: piilotus palaa heti
   * seuraavasta paivitaFokusAtlaksesta, jos uusikin näkymä on atlas.
   * Ilman tätä vanhan laudan piilotus jäisi voimaan laudalle, jolla
   * atlasta ei ole lainkaan.
   *
   * TÄSSÄ ON MYÖS SE HETKI, JOKA PÄÄSTÄÄ VEKTORIT POIS (mitattu
   * 25.8.2026, ilta). Laudan bittikarttaputki käynnistetään muutamaa
   * riviä myöhemmin (js/ui.js rasteroiTaide), ja se katsoo elävästä
   * luokasta, kannattaako työtä aloittaa (ui.piirtoLykkaantyy).
   * Kokeiltiin arvata piilotus valmiiksi oikein, jolloin koko putki
   * olisi jäänyt tekemättä piilossa olevalle laudalle — ja mitattiin,
   * että se on huono kauppa: laudan ~6500 vektorielementtiä jäävät
   * silloin DOMiin (poistaVektorit ei laukea ilman bittikarttaa), ja
   * vaikka ne ovat display: none, Chromium maksaa niistä jokaisessa
   * eleessä. Nipistyksessä pudonneita kehyksiä 3,2 % → 15,3 %.
   *
   * Oikea järjestys on siis tämä: lauta syntyy näkyvänä, pohjataso
   * rakennetaan kerran, vektorit lähtevät sen mukana — ja vasta sitten
   * atlas peittää lopun. Tarkkoja ruutuja ei enää piirretä
   * (taideAtlasOdottaa), joten toistuva työ jää silti pois.
   */
  paivitaVanhaLauta(ui, false);
  ui.fokuskarttaAvain = null;
  if (ui.fokuskarttaKerros) ui.fokuskarttaKerros.textContent = '';
  // Atlas asuu samassa kerroksessa: DOM meni jo, mutta kirjanpito on
  // nollattava erikseen tai LRU luulisi lehtiä yhä kartalla oleviksi.
  ui.atlasLehdet?.clear();
  ui.atlasHaut?.clear();
  ui.atlasAvain = null;
  ui.atlasOmaMp = 0;
  // Yleislehden ryhmä katosi kerroksen mukana; tila on nollattava
  // erikseen tai uusi lauta luulisi lehden olevan yhä kartalla.
  ui.yleislehtiPaalla = false;
  ui.yleislehtiHaku = false;
  ui.yleislehtiPalautus = false;
  // Kerros on tyhjä, joten jokainen pienennetyn lehden blob-osoite on
  // nyt käyttämätön — ne vapautuvat kaikki tässä.
  siivoaLehtiUrlit(ui);
  ui.paivitaFokusPohja?.(null);
}
