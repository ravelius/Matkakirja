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
 *    nimien, laattojen ja nappuloiden alla. Reitit ovat poikkeus: ne
 *    kuuluvat bittikarttaan eli jäisivät kuvan alle, joten rajaukseen
 *    osuvat reitit piirretään uudelleen kuvan päälle
 *    (ui.piirraReittiViivat). Pelitila ei jää kuvituksen alle.
 *
 * 3. EI SUODATTIMIA. Sama iOS-sääntö kuin muillakin kartan kerroksilla
 *    (tests/rules.test.mjs): suodatettu kerros palaa taustalta tyhjänä.
 *    Kuva on <image>, ei mitään muuta.
 *
 * Kuvat välimuistittuvat palvelutyöntekijän tavallista reittiä pitkin
 * (sw.js ämpärikori) — niitä EI esiladata, koska pelaaja käy vain
 * murto-osassa maista.
 */
import { el } from './mapart.js';
import { fokuskarttaUrl, peiliKaytossa } from './media.js';
import { FOKUS_LISANIMET, FOKUS_POHJAT } from './packs/fokus-grc.js';

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
 */
function lataaKuva(osoite) {
  return new Promise((valmis) => {
    const kuva = new Image();
    kuva.onload = () => valmis(true);
    kuva.onerror = () => valmis(false);
    kuva.src = osoite;
  });
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
      const pohja = { bbox: b, kuva: fokuskarttaUrl(tiedot.tiedosto ?? `${iso}.webp`) };
      if (!await lataaKuva(pohja.kuva)) throw new Error('kuva ei lataudu');
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

/** Osuuko reitti kuvan rajaukseen? Karkea laatikkotesti riittää. */
function reittiOsuu(reitti, b) {
  for (const [x, y] of reitti.poly ?? []) {
    if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return true;
  }
  return false;
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

/** Piirtää kuvan, sen päälle rajaukseen osuvat reitit ja lisänimet. */
function piirra(ui, iso, pohja) {
  const kerros = ui.fokuskarttaKerros;
  kerros.textContent = '';
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
  }, kerros);
  /*
   * Reitit takaisin näkyviin kuvan päälle (ks. tiedoston sääntö 2).
   * Vain rajaukseen osuvat: muualla lauta on koskematon.
   */
  const reitit = (ui.game.board?.edges ?? []).filter((e) => reittiOsuu(e, bbox));
  if (reitit.length) {
    const g = el('g', { class: 'routes fokuskartta-reitit' }, kerros);
    ui.piirraReittiViivat(g, reitit);
  }
  // Nimet päällimmäisenä tässä kerroksessa — mutta yhä kaupunkien ja
  // laattojen alla, koska koko kerros on niiden alla.
  piirraLisanimet(ui, iso, kerros);
  paivitaFokusNimet(ui);
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
 */
export function paivitaFokuskartta(ui) {
  const kerros = ui.fokuskarttaKerros;
  if (!kerros) return;
  const iso = nykyinenMaa(ui);
  const avain = iso ?? 'pois';
  if (ui.fokuskarttaAvain === avain) return;
  const ensimmainen = ui.fokuskarttaAvain == null;
  ui.fokuskarttaAvain = avain;
  kerros.textContent = '';
  if (!iso) return;

  const nayta = (pohja) => {
    // Maa on voinut vaihtua haun aikana (botti, nopea siirto).
    if (ui.dead || !pohja || ui.fokuskarttaAvain !== iso || !ui.fokuskarttaKerros) return;
    piirra(ui, iso, pohja);
    if (!ensimmainen) {
      ui.kartta.ajaKamera({ bbox: pohja.bbox });
    }
  };

  const lauta = ui.game.pack.id;
  const valmis = VARASTO.get(`${lauta}:${iso}`);
  // Jo muistissa: piirretään samassa kehyksessä, jottei kuva välähdä
  // vasta seuraavalla ruudunpäivityksellä.
  if (valmis && valmis !== 'ei') nayta(valmis);
  else if (valmis !== 'ei') void haePohja(iso, lauta).then(nayta);
}

/** Laudan vaihto: kerros ja muistettu maa nollille. */
export function nollaaFokuskartta(ui) {
  ui.fokuskarttaAvain = null;
  if (ui.fokuskarttaKerros) ui.fokuskarttaKerros.textContent = '';
}
