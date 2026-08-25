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
import { el } from './mapart.js';
import { fokuskarttaUrl, peiliKaytossa } from './media.js';
import { FOKUS_LISANIMET, FOKUS_POHJAT, FOKUS_SVG_NIMET } from './packs/fokus-grc.js';

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

/**
 * Minkä maan pohja kuuluu juuri nyt näkyä?
 *
 * Sama kolmen ehdon sääntö kuin sumuverholla (ui.fokusSumuPaalla):
 * fokusmoodi päällä, ei katselutila, peli käynnissä. Aloitusruudulla
 * maailmaa katsellaan kokonaisuutena eikä yhtäkään maata ole valittu.
 */
function nykyinenMaa(ui) {
  if (!ui.fokusmoodi || ui.katselu) return null;
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

/**
 * Hakee maan pohjan tiedot. Palauttaa { bbox, kuva } tai null.
 *
 * Kaksi noutoa: JSON kertoo rajauksen ja kuva on itse pohja. Kumpikin
 * on ehto — puolikas pohja ei kelpaa, koska väärään paikkaan asetettu
 * tai puuttuva kuva näkyisi pelaajalle rikkinäisenä karttana.
 */
async function haePohja(iso, lauta) {
  const avain = `${lauta}:${iso}`;
  if (VARASTO.has(avain)) return VARASTO.get(avain) === 'ei' ? null : VARASTO.get(avain);
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
      const tiedot = FOKUS_POHJAT[iso];
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
      const pohja = {
        bbox: b,
        // Ikkuna, johon kamera ajaa; vanhemmilla pohjilla sitä ei ole,
        // jolloin koko kuva on ikkuna kuten ennen.
        rajaus: tiedot.rajaus ?? b,
        kuva: fokuskarttaUrl(tiedot.tiedosto ?? `${iso}.webp`),
      };
      const kuva = await lataaKuva(pohja.kuva);
      if (!kuva) throw new Error('kuva ei lataudu');
      /*
       * TODELLINEN PIKSELIMÄÄRÄ TALTEEN. Jatkuva atlas pitää useaa
       * lehteä kartalla yhtä aikaa, ja sen muistikatto lasketaan
       * megapikseleinä eikä lehtien lukumääränä (ks. ATLAS_MEGAPIKSELIA).
       * Mitta luetaan siitä samasta kuvasta, joka juuri purettiin —
       * arvaus olisi tässä pahin mahdollinen virhe, koska lehtien koot
       * vaihtelevat Kyproksen 5,6:sta Suomen 25,6 megapikseliin.
       */
      pohja.mp = (kuva.naturalWidth * kuva.naturalHeight) / 1e6 || ATLAS_OLETUS_MP;
      VARASTO.set(avain, pohja);
      return pohja;
    } catch {
      // Puuttuva pohja on tavallinen tila eikä virhe: maita on satoja
      // ja kuvia toistaiseksi yksi.
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
export function esilammitaFokuspohja(iso, lauta) {
  if (!iso || !lauta) return;
  void haePohja(iso, lauta).catch(() => {});
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
 *   3. KAKSI KATTOA, LRU VAPAUTTAA. Enintään ATLAS_ENINTAAN lehteä JA
 *      enintään ATLAS_MEGAPIKSELIA megapikseliä. Kun katto ylittyy,
 *      kauimmin sitten käytetty lehti irrotetaan DOMista — juuri se
 *      vapauttaa puretun kuvan, koska VARASTO ei pidä Image-oliota
 *      tallessa vaan pelkän osoitteen ja mitat.
 *   4. PURKU TAUSTALLA. Lehti ilmestyy kartalle vasta kun decode() on
 *      valmis (haePohja → lataaKuva), joten pääsäie ei purkaudu
 *      panoroinnin keskellä.
 *
 * ATLAS EI OLE VOIMASSA YLEISKUVASSA (ui.mannerZoom pois) eikä
 * aloituslennon aikana: molemmat ovat laudan omia näkymiä, joissa
 * kuvien pitää olla poissa (sama raja kuin kartta.fokusRajauksilla ja
 * verholla). Maailmanlaajuisessa yleiskuvassa lehdet olisivat lisäksi
 * postimerkin kokoisia tilkkuja keskellä merta.
 */

/** Enintään näin monta lehteä muistissa kerralla (omistajan ohje ~8). */
const ATLAS_ENINTAAN = 8;
/*
 * ...ja enintään näin monta megapikseliä purettuna, mikä on käytännössä
 * se katto, joka osuu ensin: mitattu lehti on 25,6 Mp, joten 96 Mp on
 * kolme–neljä lehteä eli noin 384 Mt purettua kuvaa. Kahdeksan täyttä
 * lehteä olisi 205 Mp ≈ 820 Mt, mitä yksikään iPad ei kestä.
 */
const ATLAS_MEGAPIKSELIA = 96;
/** Lehden oletuskoko ennen kuin todellinen on mitattu (tyypillinen). */
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
function atlasPaalla(ui) {
  if (!ui.fokusmoodi || ui.katselu) return false;
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
  if (ui.aloituslentoKesken) return false;
  return Boolean(ui.mannerZoom);
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
 * KOODIA EI POISTETA. Lauta rasteroidaan ja pidetään yllä kuten ennenkin
 * (ui.taydennaTaide), joten yleiskuvaan, lentoon, aloitusruutuun ja
 * maailmankarttanäkymään palataan ilman uutta odotusta. Piiloon menee
 * vain PIIRTO ja vain siinä näkymässä, jossa atlas on kartta — eli
 * täsmälleen atlasPaallan ehdoilla.
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
    // päällä, jotta kohdemaa ei jää naapurin vuodon alle.
    g = el('g', { class: 'fokus-atlas', 'pointer-events': 'none' });
    kerros.insertBefore(g, kerros.firstChild);
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
    if (valitut.length + (oma ? 1 : 0) >= ATLAS_ENINTAAN) break;
    if (peita(ruudut, e.bbox, nakyva, false) < ATLAS_UUSIA_RUUTUJA) continue;
    const koko = lehdenMp(e.iso, lauta);
    // Budjetin täyttyminen ei lopeta hakua: seuraava lehti voi olla
    // pieni (Kypros 5,6 Mp) ja mahtua vielä.
    if (mp + koko > ATLAS_MEGAPIKSELIA) continue;
    peita(ruudut, e.bbox, nakyva, true);
    mp += koko;
    valitut.push(e);
  }
  return valitut;
}

/** Vapauttaa yhden lehden: irti DOMista = purettu kuva pois muistista. */
function vapautaLehti(ui, iso) {
  const tieto = ui.atlasLehdet?.get(iso);
  if (!tieto) return;
  tieto.el?.remove();
  ui.atlasLehdet.delete(iso);
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
    return lehdet.size + (ui.atlasOmaMp ? 1 : 0) > ATLAS_ENINTAAN
      || mp > ATLAS_MEGAPIKSELIA;
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
   * haetaan yhä vain valintabudjetin (ATLAS_MEGAPIKSELIA) verran —
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
    void haePohja(v.iso, lauta).then((pohja) => {
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
      if (ui.dead || !pohja || !ui.fokuskarttaKerros) return;
      if (ui.game.pack.id !== lauta || !atlasPaalla(ui)) return;
      const kohde = atlasRyhma(ui);
      if (!kohde || ui.atlasLehdet.has(v.iso)) return;
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
  if (!ryhma) return;
  ryhma.textContent = '';
  const { bbox } = pohja;
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
   * Lentonäkymä on Raamatun mukaan NIUKKA VANHA KARTTA punaisella
   * viivalla (ALOITUSLENTO UUSIKSI): kartta rajautuu lähtö- ja
   * kohdemaahan, kone lentää viivaa. Fokuskerrokset kuuluvat vasta
   * laskeutumisen jälkeiseen kamera-ajoon — jonka tämä sama funktio
   * käynnistää heti kun lippu laskeutuu, koska maa vaihtuu silloin
   * arvosta 'pois' kohdemaahan.
   *
   * KUVA HAETAAN SILTI JO LENNON AIKANA. Pohja on megatavujen
   * kokoinen, ja jos lataus alkaisi vasta laskeutumisesta, lehti
   * välähtäisi paikalleen vasta sekunteja kamera-ajon jälkeen. Haku on
   * välimuistitettu (VARASTO, HAUT), joten toistuvat piirrot eivät
   * kuormita mitään.
   */
  if (maa && ui.aloituslentoKesken) void haePohja(maa, ui.game.pack.id);
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
    if (ui.dead || !pohja || ui.fokuskarttaAvain !== iso || !ui.fokuskarttaKerros) return;
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
  // Jo muistissa: piirretään samassa kehyksessä, jottei kuva välähdä
  // vasta seuraavalla ruudunpäivityksellä.
  if (valmis && valmis !== 'ei') nayta(valmis);
  else if (valmis !== 'ei') void haePohja(iso, lauta).then(nayta);
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
  ui.paivitaFokusPohja?.(null);
}
