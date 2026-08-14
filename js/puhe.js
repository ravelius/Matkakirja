/*
 * PUHE — lukijaääni lennossa generoituna (omistajan päätös 14.8.2026).
 *
 * Pelin luennat tehdään OpenAI:n puhesynteesillä (gpt-4o-mini-tts)
 * pöllön välityspalvelimen kautta: peli lähettää workerille pelkän
 * tekstin ja persoonan nimen, worker omistaa äänen ja ohjeistuksen ja
 * avain elää vain sen salaisuudessa (tools/pollo/worker.js, "puhe").
 * API-avainta ei ole selaimessa, repossa eikä lokissa.
 *
 * TÄMÄ MODUULI EI OLE LUKIJA. js/lukija.js päättää, millä äänellä
 * luetaan (tämä ensin, laitteen oma ääni varalla) ja pitää kirjaa
 * siitä, että vain yksi luenta soi kerrallaan. Tämä moduuli osaa vain
 * yhden asian: tekstistä puhetta, lause kerrallaan.
 *
 * LAUSE KERRALLAAN. Koko sivun lähettäminen yhtenä pyyntönä
 * tarkoittaisi pitkää hiljaisuutta ennen ensimmäistä sanaa. Siksi
 * teksti pilkotaan virkkeiksi ja niputetaan paloiksi niin, että
 * ensimmäinen pala on pelkkä ensimmäinen virke — se on generoitu ja
 * soimassa parissa sekunnissa — ja loput kulkevat isompina nippuina,
 * joita haetaan valmiiksi edellisen soidessa (yksi etuhaku).
 *
 * YKSI JAETTU AUDIOELEMENTTI. iPadin Safari sallii audio.play():n
 * vain elementille, joka on kertaalleen käynnistetty käyttäjän
 * eleestä. Siksi moduuli luo yhden <audio>-elementin ja "virittää"
 * sen ensimmäisestä kosketuksesta (hiljainen tyhjä wav) — sen jälkeen
 * sama puheElementti saa soittaa haettuja paloja myös ilman elettä, esim.
 * pöllön striimivastauksen tahdissa. Yksi puheElementti riittää, koska
 * lukija sallii vain yhden luennan kerrallaan.
 *
 * VARAPOLKU ON KUTSUJAN. Jos worker vastaa "ei käytössä" (avain
 * puuttuu, origin väärä), moduuli merkitsee puheen istunnon ajaksi
 * estetyksi ja puheTuettu() palauttaa false — lukija valitsee siitä
 * lähtien laitteen oman äänen. Verkoton laite ei edes yritä.
 */

import { POLLOPALVELIN } from './packs/pollo-asetukset.js';

/** Persoonat, jotka worker tuntee. Muu arvo lukee kertojan äänellä. */
export const PUHE_PERSOONAT = ['kertoja', 'merkinnat', 'pollo'];

/*
 * LAITEKOHTAISET ÄÄNISÄÄDÖT (työhuoneen Lukijaääni-välilehti,
 * omistajan tilaus 14.8.2026). Työhuone tallettaa localStorageen
 * persoonittain äänen ja ohjeen sekä kehittäjäkoodin; peli lähettää ne
 * puhepyynnön mukana. Worker tottelee säätöjä VAIN oikealla
 * kehittäjäkoodilla — muiden pelaajien laitteilla nämä avaimet eivät
 * tee mitään. Säädetyt äänet säilötään vain omalle laitteelle
 * (välimuistiavain kattaa säädöt), ei jaettuihin säilöihin.
 */
export const PUHE_ASETUS_AVAIN = 'matkakirja-puhe-persoonat';
export const PUHE_KOODI_AVAIN = 'matkakirja-puhe-kehittaja';

function puheenSaadot(persoona) {
  try {
    const kaikki = JSON.parse(window.localStorage?.getItem(PUHE_ASETUS_AVAIN) ?? '{}');
    const oma = kaikki?.[persoona];
    if (!oma || typeof oma !== 'object') return null;
    const aani = typeof oma.aani === 'string' && oma.aani ? oma.aani : null;
    const ohje = typeof oma.ohje === 'string' && oma.ohje.trim() ? oma.ohje.trim() : null;
    return aani || ohje ? { aani, ohje } : null;
  } catch {
    return null;
  }
}

function kehittajaKoodi() {
  try {
    return window.localStorage?.getItem(PUHE_KOODI_AVAIN) || null;
  } catch {
    return null;
  }
}

/**
 * Yhden pyynnön merkkikatto. Workerin kova raja on 1000
 * (tools/pollo/rajat.js PUHE_TEKSTIN_KATTO); tämä pysyy sen alla,
 * jotta siivousten pyöristykset eivät koskaan leikkaa lausetta kesken.
 */
export const PUHE_PALA_KATTO = 700;

/*
 * Istunnon estolippu: asetusvirhe (503/403) tarkoittaa, ettei puhe ole
 * tässä ympäristössä käytössä — jokaista nappia ei kannata kokeilla
 * uudestaan. Ohimenevä verkkovirhe EI nosta lippua.
 */
let puheEstetty = false;

/** Merkitsee puheen istunnon ajaksi pois käytöstä (testeille näkyvä). */
export function estaPuhe() {
  puheEstetty = true;
}

/** Onko lennossa generoitu lukijaääni käytettävissä juuri nyt? */
export function puheTuettu() {
  if (puheEstetty) return false;
  if (!POLLOPALVELIN) return false;
  if (typeof window === 'undefined') return false;
  if (typeof window.Audio !== 'function' || typeof window.fetch !== 'function') return false;
  // Lentokoneessa ei yritetä: laitteen oma ääni toimii verkotta.
  if (window.navigator && window.navigator.onLine === false) return false;
  return true;
}

/* ------------------------------------------------------------------ */
/* Tekstin pilkonta                                                    */
/* ------------------------------------------------------------------ */

/**
 * Pilkkoo tekstin virkkeiksi. Rivinvaihto on aina raja (lukija erottaa
 * otsikot ja kappaleet rivinvaihdoilla), ja rivin sisällä raja on
 * virkkeen päättävä välimerkki välilyönteineen. Lyhenteiden pisteitä
 * ei yritetä tunnistaa — liian tiheä katko on pieni tauko, liian
 * harva pitkä odotus, ja tauko on näistä pienempi paha.
 */
export function paloitteleVirkkeiksi(teksti) {
  const virkkeet = [];
  for (const rivi of String(teksti ?? '').split('\n')) {
    const siisti = rivi.trim();
    if (!siisti) continue;
    for (const osa of siisti.split(/(?<=[.!?…])\s+/)) {
      const virke = osa.trim();
      if (virke) virkkeet.push(virke);
    }
  }
  return virkkeet;
}

/**
 * Niputtaa virkkeet lähetettäviksi paloiksi.
 *
 * Ensimmäinen pala on pelkkä ensimmäinen virke, jotta luenta alkaa
 * nopeasti; loput täytetään kattoon asti. Kattoa pidempi yksittäinen
 * virke lähtee omana palanaan — worker leikkaa ääritapauksen omaan
 * kovaan rajaansa.
 */
export function niputaPalat(virkkeet, katto = PUHE_PALA_KATTO) {
  const palat = [];
  let kertyma = '';
  for (const virke of virkkeet) {
    if (!palat.length && !kertyma) {
      palat.push(virke);
      continue;
    }
    if (kertyma && kertyma.length + virke.length + 1 > katto) {
      palat.push(kertyma);
      kertyma = virke;
      continue;
    }
    kertyma = kertyma ? `${kertyma} ${virke}` : virke;
  }
  if (kertyma) palat.push(kertyma);
  return palat;
}

/**
 * Niputus PORRASTETULLA palakoolla (omistajan havainto 14.8.2026:
 * "lukija pitää oudon tauon otsikon jälkeen lehdessä").
 *
 * Syy: ensimmäinen pala on lyhyt otsikko, joka soi sekunnissa, mutta
 * seuraava täysimittainen pala oli vasta generoitavana — väliin jäi
 * hiljaisuus. Nyt palakoko kasvaa portaittain (eka virke → pieni →
 * keskikoko → täysi), jolloin lyhyiden alkupalojen soidessa generointi
 * ehtii aina seuraavan palan edelle.
 */
export function niputaRampilla(virkkeet, portaat = [240, 480], katto = PUHE_PALA_KATTO) {
  const palat = [];
  let kertyma = '';
  const rajaNyt = () => portaat[palat.length - 1] ?? katto;
  for (const virke of virkkeet) {
    if (!palat.length && !kertyma) {
      palat.push(virke);
      continue;
    }
    if (kertyma && kertyma.length + virke.length + 1 > rajaNyt()) {
      palat.push(kertyma);
      kertyma = virke;
      continue;
    }
    kertyma = kertyma ? `${kertyma} ${virke}` : virke;
  }
  if (kertyma) palat.push(kertyma);
  return palat;
}

/* ------------------------------------------------------------------ */
/* Jaettu audioelementti ja viritys                                    */
/* ------------------------------------------------------------------ */

/** Hiljainen tyhjä wav: viritys ei saa kuulua eikä vaatia verkkoa. */
const HILJAINEN_WAV = 'data:audio/wav;base64,'
  + 'UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

let puheElementti = null;
let viritetty = false;

/*
 * VAHVISTUS (omistajan tilaus 14.8.2026: "laita lukijan ääntä
 * kovemmalle"). <audio>-elementin volume ei ylitä yhtä, joten korotus
 * tehdään WebAudio-vahvistimella: elementti kytketään GainNodeen, kun
 * äänipiiri on käynnissä (vaatii käyttäjän eleen — kytkentä tehdään
 * virityksen yhteydessä). Ilman WebAudiota ääni soi entiseen tapaan
 * suoraan elementistä täydellä voimalla.
 *
 * Voimakkuus on laitekohtainen asetus (localStorage), jotta työhuoneen
 * säätövälilehti voi ohjata sitä; oletus on reilusti yli yhden.
 */
const VOIMA_AVAIN = 'matkakirja-puhe-voima';
const VOIMA_OLETUS = 1.6;
const VOIMA_MIN = 0.25;
const VOIMA_MAX = 2.5;

let piiri = null;
let vahvistin = null;
let kytketty = false;

/** Lukijaäänen voimakkuus (1 = elementin täysi voima). */
export function puheenVoima() {
  try {
    const arvo = Number.parseFloat(window.localStorage?.getItem(VOIMA_AVAIN));
    if (Number.isFinite(arvo)) return Math.min(VOIMA_MAX, Math.max(VOIMA_MIN, arvo));
  } catch { /* yksityistila estää localStoragen */ }
  return VOIMA_OLETUS;
}

/** Asettaa voimakkuuden ja vie sen heti soivaan ääneen. */
export function asetaPuheenVoima(arvo) {
  const voima = Math.min(VOIMA_MAX, Math.max(VOIMA_MIN, Number(arvo) || VOIMA_OLETUS));
  try {
    window.localStorage?.setItem(VOIMA_AVAIN, String(voima));
  } catch { /* ei tallennu — istunnon ajan silti voimassa gainissa */ }
  if (vahvistin) vahvistin.gain.value = voima;
  return voima;
}

/*
 * LUKUNOPEUS (omistajan tilaus 14.8.2026). Nopeus tehdään toistossa
 * (playbackRate + sävelkorkeuden säilytys), EI generoinnissa: se osuu
 * silloin myös säilöistä soiviin paloihin, ei maksa mitään eikä
 * pirsto välimuistiavaimia. Laitekohtainen asetus kuten voimakkuus.
 */
const NOPEUS_AVAIN = 'matkakirja-puhe-nopeus';
const NOPEUS_OLETUS = 1;
const NOPEUS_MIN = 0.6;
const NOPEUS_MAX = 1.6;

/** Lukijaäänen nopeus (1 = normaali). */
export function puheenNopeus() {
  try {
    const arvo = Number.parseFloat(window.localStorage?.getItem(NOPEUS_AVAIN));
    if (Number.isFinite(arvo)) return Math.min(NOPEUS_MAX, Math.max(NOPEUS_MIN, arvo));
  } catch { /* yksityistila estää localStoragen */ }
  return NOPEUS_OLETUS;
}

/** Asettaa nopeuden ja vie sen heti soivaan ääneen. */
export function asetaPuheenNopeus(arvo) {
  const nopeus = Math.min(NOPEUS_MAX, Math.max(NOPEUS_MIN, Number(arvo) || NOPEUS_OLETUS));
  try {
    window.localStorage?.setItem(NOPEUS_AVAIN, String(nopeus));
  } catch { /* ei tallennu — istunnon ajan silti voimassa */ }
  if (puheElementti) {
    try {
      puheElementti.playbackRate = nopeus;
    } catch { /* elementti ei soi */ }
  }
  return nopeus;
}

/** Nopeus ja sävelkorkeuden säilytys elementtiin (src-vaihto nollaa ne). */
function asetaToistonopeus(audio) {
  const nopeus = puheenNopeus();
  try {
    audio.defaultPlaybackRate = nopeus;
    audio.playbackRate = nopeus;
    if ('preservesPitch' in audio) audio.preservesPitch = true;
    else if ('webkitPreservesPitch' in audio) audio.webkitPreservesPitch = true;
  } catch { /* vanha selain: nopeus jää normaaliksi */ }
}

/** Kytkee vahvistimen, kun äänipiiri saadaan käyntiin (ele vaaditaan). */
function kytkeVahvistin() {
  if (kytketty || typeof window === 'undefined') return;
  const audio = haeElementti();
  if (!audio) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  try {
    piiri = piiri ?? new AC();
  } catch {
    return;
  }
  const yrita = () => {
    if (kytketty || piiri.state !== 'running') return;
    try {
      // createMediaElementSource onnistuu vain kerran per elementti —
      // kytketty-lippu estää toisen yrityksen.
      const lahde = piiri.createMediaElementSource(audio);
      vahvistin = piiri.createGain();
      vahvistin.gain.value = puheenVoima();
      /*
       * Kompressori vahvistimen perään: yli yhden nouseva vahvistus voi
       * leikata äänekkäimmät kohdat säröksi, ja kompressori pyöristää
       * huiput kuulumattomiin. Kevyet asetukset — puhe ei saa alkaa
       * pumpata.
       */
      const kompressori = piiri.createDynamicsCompressor();
      kompressori.threshold.value = -10;
      kompressori.knee.value = 18;
      kompressori.ratio.value = 4;
      kompressori.attack.value = 0.003;
      kompressori.release.value = 0.25;
      lahde.connect(vahvistin);
      vahvistin.connect(kompressori);
      kompressori.connect(piiri.destination);
      kytketty = true;
    } catch { /* elementti oli jo kytketty tai piiri kuoli */ }
  };
  try {
    piiri.resume?.().then(yrita).catch(() => {});
  } catch { /* vanha selain ilman resumea */ }
  yrita();
}

function haeElementti() {
  if (!puheElementti && typeof window !== 'undefined' && typeof window.Audio === 'function') {
    puheElementti = new window.Audio();
    puheElementti.preload = 'auto';
  }
  return puheElementti;
}

/**
 * Virittää jaetun elementin käyttäjän eleen aikana. Kutsutaan kerran
 * ensimmäisestä kosketuksesta; myöhemmät kutsut eivät tee mitään.
 */
function virita() {
  if (viritetty) return;
  viritetty = true;
  const audio = haeElementti();
  if (!audio) return;
  // Vahvistin kytketään samasta eleestä: äänipiiri käynnistyy vain
  // käyttäjän kosketuksesta, ja kerran kytkettynä se pysyy.
  kytkeVahvistin();
  try {
    audio.src = HILJAINEN_WAV;
    const lupaus = audio.play();
    lupaus?.then?.(() => audio.pause()).catch(() => {
      // Esto ei kaada mitään: seuraava soitto yritetään silti, ja
      // useimmiten se osuu itsekin eleeseen (kaiutinnapin painallus).
      viritetty = false;
    });
  } catch {
    viritetty = false;
  }
}

// Viritys ensimmäisestä kosketuksesta — vain selaimessa.
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  document.addEventListener('pointerdown', virita, { once: true, capture: true, passive: true });
}

/* ------------------------------------------------------------------ */
/* Palojen haku ja välimuistit                                         */
/* ------------------------------------------------------------------ */

/*
 * VAKIOTEKSTI GENEROIDAAN VAIN KERRAN (omistajan kysymys 14.8.2026).
 *
 * Kaksi kerrosta:
 *
 *   1. Istunnon muisti: persoona+teksti → valmis blob-osoite. Sama
 *      sivu kahdesti peräkkäin ei hae mitään. Koko on rajattu, vanhin
 *      lentää ensin ja sen blob-osoite vapautetaan.
 *   2. Laitteen pysyvä säilö (CacheStorage): generoitu mp3 säilyy
 *      istuntojen yli, joten vakioteksti maksaa generoinnin kerran
 *      per laite. SÄILÖT OVAT LOHKOITTAIN (omistajan ohje 14.8.2026):
 *      matkakirjan merkinnät omassaan, lehtien luennat omassaan —
 *      kun tekstit kirjoitetaan uusiksi, vanhentunut lohko tuhotaan
 *      yhdellä kutsulla (tuhoaPuheSailio) eikä laitteen tila lopu
 *      kesken. Pöllön vastauksia ei säilötä pysyvästi lainkaan: ne
 *      ovat kertakäyttöisiä, ja niiden tallentaminen vain kuluttaisi
 *      tilaa. Sama teksti on tallella myös Cloudflaren reunalla
 *      (tools/pollo/worker.js), joten uusi laite ei yleensä maksa
 *      generointia sekään.
 *
 * HUOM sw.js: service workerin activate siivoaa tuntemattomat
 * välimuistit — puhesäilöjen etuliite on siellä ohituslistalla. Jos
 * etuliite muuttuu, muuta molemmat.
 */
const VALIMUISTIN_KOKO = 60;
const puheMuisti = new Map();

/** Pysyvien puhesäilöjen nimet: matkakirja-puhe-<lohko>-v1. */
export const PUHE_SAILIO_ETULIITE = 'matkakirja-puhe-';
const SAILIO_VERSIO = 'v1';

function sailionNimi(sailio) {
  return `${PUHE_SAILIO_ETULIITE}${sailio}-${SAILIO_VERSIO}`;
}

/**
 * Tuhoaa yhden puhelohkon pysyvän säilön (esim. 'merkinnat', kun
 * matkakirjan tekstit vaihtuvat uusiin). Palauttaa false, jos säilöä
 * ei ollut tai CacheStorage puuttuu.
 */
export async function tuhoaPuheSailio(sailio) {
  try {
    return await caches.delete(sailionNimi(sailio));
  } catch {
    return false;
  }
}

function muistiin(avain, osoite) {
  puheMuisti.set(avain, osoite);
  if (puheMuisti.size <= VALIMUISTIN_KOKO) return;
  const vanhin = puheMuisti.keys().next().value;
  const pois = puheMuisti.get(vanhin);
  puheMuisti.delete(vanhin);
  try {
    URL.revokeObjectURL(pois);
  } catch { /* jo vapautettu */ }
}

/**
 * Pysyvän säilön avainosoite: tiiviste persoonasta ja tekstistä.
 * Synteettinen osoite — mihinkään ei yhdistetä. Ilman crypto.subtlea
 * (http-testipalvelin) palautuu null ja pysyvä säilö ohitetaan.
 */
async function sailioAvain(persoona, teksti) {
  try {
    const data = new TextEncoder().encode(`${persoona}|${teksti}`);
    const tiiviste = await crypto.subtle.digest('SHA-256', data);
    const hex = [...new Uint8Array(tiiviste)].map((t) => t.toString(16).padStart(2, '0')).join('');
    return `https://puhe.paikallinen.matkakirja/${hex}`;
  } catch {
    return null;
  }
}

/**
 * Hakee yhden palan puheeksi ja palauttaa blob-osoitteen.
 *
 * Asetusvirhe (503/403/404) nostaa istunnon estolipun; muut virheet
 * heitetään kutsujalle sellaisinaan (ohimenevä verkkovika ei sammuta
 * puhetta koko istunnoksi).
 *
 * @param {string} teksti pala
 * @param {string} persoona workerin persoonataulun avain
 * @param {string|null} sailio pysyvän säilön lohko, null = ei säilötä
 */
async function haePala(teksti, persoona, sailio = null) {
  // Laitekohtaiset säädöt mukaan avaimeen ja pyyntöön: säädetty ääni ei
  // saa soida vanhan äänen välimuistista eikä päinvastoin.
  const saadot = puheenSaadot(persoona);
  const saatoTunniste = saadot ? `${saadot.aani ?? ''}|${saadot.ohje ?? ''}` : '';
  const avain = `${persoona}|${saatoTunniste}|${teksti}`;
  if (puheMuisti.has(avain)) return puheMuisti.get(avain);

  let kansio = null;
  let osoiteAvain = null;
  if (sailio && typeof caches !== 'undefined') {
    osoiteAvain = await sailioAvain(`${persoona}|${saatoTunniste}`, teksti);
    if (osoiteAvain) {
      try {
        kansio = await caches.open(sailionNimi(sailio));
        const osuma = await kansio.match(osoiteAvain);
        if (osuma) {
          const osoite = URL.createObjectURL(await osuma.blob());
          muistiin(avain, osoite);
          return osoite;
        }
      } catch {
        kansio = null;
      }
    }
  }

  // Lohko kulkee workerille asti: lohkollinen pala säilötään myös
  // reunalle ja R2-ämpäriin (puhe/<lohko>/…), lohkoton ei minnekään.
  // Säädöt ja kehittäjäkoodi mukaan vain jos niitä on — muiden
  // pelaajien pyynnöt pysyvät täsmälleen entisellään.
  const otsakkeet = { 'content-type': 'application/json' };
  const koodi = saadot ? kehittajaKoodi() : null;
  if (koodi) otsakkeet['x-pollo-kehittaja'] = koodi;
  const vastaus = await fetch(POLLOPALVELIN, {
    method: 'POST',
    headers: otsakkeet,
    body: JSON.stringify({
      tehtava: 'puhe',
      teksti,
      persoona,
      lohko: sailio || undefined,
      aani: saadot?.aani || undefined,
      ohje: saadot?.ohje || undefined,
    }),
  });
  if (!vastaus.ok) {
    if ([403, 404, 503].includes(vastaus.status)) estaPuhe();
    throw new Error(`puhe ${vastaus.status}`);
  }
  if (kansio && osoiteAvain) {
    // Kopio talteen ennen lukemista; täysi levy ei kaada luentaa.
    try {
      await kansio.put(osoiteAvain, vastaus.clone());
    } catch { /* säilö täynnä tai estetty */ }
  }
  const blob = await vastaus.blob();
  const osoite = URL.createObjectURL(blob);
  muistiin(avain, osoite);
  return osoite;
}

/* ------------------------------------------------------------------ */
/* Soitin                                                              */
/* ------------------------------------------------------------------ */

/**
 * Luo puhesoittimen. Palauttaa null, jos puhe ei ole käytettävissä.
 *
 * Soitin ottaa tekstiä vastaan lisaa()-kutsuina (valmis teksti voi
 * tulla yhtenä kutsuna, striimi monena), pilkkoo sen paloiksi ja
 * soittaa palat järjestyksessä jaetulla audioelementillä. Seuraavaa
 * palaa haetaan edellisen soidessa (yksi etuhaku kerrallaan).
 *
 * KAPPALEET JA OHJAUS (omistajan tilaus 14.8.2026: lukijalle
 * säätöpaneeli, "pause ja kappaleen vaihdot"). Rivinvaihto luettavassa
 * tekstissä on kappaleen raja (lukija erottaa otsikot ja kappaleet
 * rivinvaihdoilla), ja jokainen pala muistaa kappaleensa — tauko,
 * jatko ja kappalehypyt toimivat palarajojen tarkkuudella.
 *
 * @param {{
 *   persoona?: string,
 *   sailio?: string|null pysyvän säilön lohko; null = ei säilötä
 *   onLoppu?: () => void,
 *   onVirhe?: (vaihe: 'alku'|'kesken') => void,
 *   onTila?: (t: {tauolla: boolean, kappale: number, kappaleita: number}) => void,
 * }} asetukset
 * @returns {{
 *   lisaa(teksti: string): void,
 *   paata(): void,
 *   pysayta(): void,
 *   tauko(): void,
 *   jatka(): void,
 *   tauolla(): boolean,
 *   siirryKappale(askel: number): void,
 * }|null}
 */
export function luoPuheSoitin({
  persoona = 'kertoja', sailio = null, onLoppu = null, onVirhe = null, onTila = null,
} = {}) {
  if (!puheTuettu()) return null;
  const audio = haeElementti();
  if (!audio) return null;

  const palat = []; // { teksti, kappale }
  const haut = new Map(); // palaindeksi → Promise<blob-osoite>
  const tila = {
    peruttu: false,
    paatetty: false,
    soi: false,
    tauolla: false,
    kohdalla: 0, // seuraavaksi soitettavan palan indeksi
    soiva: -1, // parhaillaan soivan palan indeksi
    kappaleita: 0,
    puraKuuntelijat: null, // soivan palan ended/error-kuuntelijat irti
  };

  const ilmoita = () => {
    if (!onTila || tila.peruttu) return;
    const kappale = palat[tila.soiva]?.kappale ?? palat[tila.kohdalla]?.kappale ?? 0;
    try {
      onTila({ tauolla: tila.tauolla, kappale, kappaleita: tila.kappaleita });
    } catch { /* paneelin virhe ei saa kaataa luentaa */ }
  };

  const hae = (indeksi) => {
    if (indeksi >= palat.length || haut.has(indeksi)) return;
    haut.set(indeksi, haePala(palat[indeksi].teksti, persoona, sailio));
    // Hylkäys käsitellään soittovuorossa; tämä estää vain
    // "unhandled rejection" -kohinan konsoliin.
    haut.get(indeksi).catch(() => {});
  };

  const loppu = () => {
    if (tila.peruttu) return;
    tila.peruttu = true;
    onLoppu?.();
  };

  const soitaSeuraava = async () => {
    if (tila.peruttu || tila.tauolla) return;
    if (tila.kohdalla >= palat.length) {
      tila.soi = false;
      tila.soiva = -1;
      if (tila.paatetty) loppu();
      return;
    }
    tila.soi = true;
    const indeksi = tila.kohdalla;
    tila.kohdalla += 1;
    tila.soiva = indeksi;
    hae(indeksi);
    // Kaksi palaa etukäteen: alun lyhyet palat soivat nopeasti, eikä
    // generointi saa jäädä niistä jälkeen (outo tauko otsikon perässä).
    hae(indeksi + 1);
    hae(indeksi + 2);
    ilmoita();
    let osoite;
    try {
      osoite = await haut.get(indeksi);
    } catch {
      // Ensimmäisen palan virhe → kutsuja voi valita varapolun koko
      // tekstille. Myöhempi virhe päättää luennan siististi: teksti on
      // ruudulla, ja seuraava painallus yrittää uudestaan (tai
      // estolipun noustua laitteen omalla äänellä).
      const vaihe = indeksi === 0 ? 'alku' : 'kesken';
      tila.soi = false;
      tila.peruttu = true;
      onVirhe?.(vaihe);
      return;
    }
    if (tila.peruttu || tila.tauolla || tila.soiva !== indeksi) return;
    // Nukahtanut äänipiiri hereille (iOS taustalta paluu) ja tuore
    // voimakkuus joka palaan — säätö osuu myös kesken luennan.
    if (piiri?.state === 'suspended') piiri.resume?.().catch?.(() => {});
    if (vahvistin) {
      /*
       * NAPSAHDUS POIS (omistajan havainto 14.8.2026: "ääni lähtee
       * napsahtaen käyntiin"): luennan ensimmäinen pala nostetaan
       * kuuluviin lyhyellä rampilla nollasta. Myöhemmät palat soivat
       * täydellä voimalla heti — ne jatkavat puhetta virkerajalta,
       * eikä keskelle luentaa saa tulla voimakkuuskuoppia.
       */
      const nyt = piiri.currentTime;
      vahvistin.gain.cancelScheduledValues(nyt);
      if (indeksi === 0) {
        vahvistin.gain.setValueAtTime(0, nyt);
        vahvistin.gain.linearRampToValueAtTime(puheenVoima(), nyt + 0.09);
      } else {
        vahvistin.gain.setValueAtTime(puheenVoima(), nyt);
      }
    }
    audio.src = osoite;
    asetaToistonopeus(audio);
    const valmis = () => {
      audio.removeEventListener('ended', valmis);
      audio.removeEventListener('error', valmis);
      if (tila.peruttu) return;
      soitaSeuraava();
    };
    tila.puraKuuntelijat = () => {
      audio.removeEventListener('ended', valmis);
      audio.removeEventListener('error', valmis);
      tila.puraKuuntelijat = null;
    };
    audio.addEventListener('ended', valmis);
    audio.addEventListener('error', valmis);
    try {
      await audio.play();
    } catch {
      // Soittolupa puuttui (ele ehti vanheta). Ei estolippua — kyse ei
      // ole palvelusta — mutta luenta päättyy, ettei jono pyöri tyhjää.
      tila.puraKuuntelijat?.();
      tila.soi = false;
      tila.peruttu = true;
      onVirhe?.(indeksi === 0 ? 'alku' : 'kesken');
    }
  };

  /** Pilkkoo lisätyn tekstin kappaleiksi ja paloiksi kappaletiedolla. */
  const pilkoPaloiksi = (teksti) => {
    const uudet = [];
    for (const rivi of String(teksti ?? '').split('\n')) {
      if (!rivi.trim()) continue;
      const kappale = tila.kappaleita;
      tila.kappaleita += 1;
      // Porrastus katsoo KOKO jonon pituutta: alun palat pieniä,
      // loput täysiä (ks. niputaRampilla — sama porrastus käsin,
      // koska kappaleraja ei saa kadota niputuksessa).
      const portaat = [240, 480];
      let kertyma = '';
      const tyonna = () => {
        if (!kertyma) return;
        uudet.push({ teksti: kertyma, kappale });
        kertyma = '';
      };
      for (const virke of paloitteleVirkkeiksi(rivi)) {
        const jonossa = palat.length + uudet.length;
        if (!jonossa && !kertyma) {
          uudet.push({ teksti: virke, kappale });
          continue;
        }
        const raja = portaat[jonossa - 1] ?? PUHE_PALA_KATTO;
        if (kertyma && kertyma.length + virke.length + 1 > raja) {
          tyonna();
          kertyma = virke;
          continue;
        }
        kertyma = kertyma ? `${kertyma} ${virke}` : virke;
      }
      tyonna();
    }
    return uudet;
  };

  return {
    lisaa(teksti) {
      if (tila.peruttu || tila.paatetty) return;
      const uudet = pilkoPaloiksi(teksti);
      if (!uudet.length) return;
      palat.push(...uudet);
      if (!tila.soi && !tila.tauolla) soitaSeuraava();
      else hae(tila.kohdalla); // varmista että seuraava on jo tulossa
    },
    paata() {
      if (tila.peruttu || tila.paatetty) return;
      tila.paatetty = true;
      if (!tila.soi && !tila.tauolla && tila.kohdalla >= palat.length) loppu();
    },
    pysayta() {
      if (tila.peruttu) return;
      tila.peruttu = true;
      tila.puraKuuntelijat?.();
      try {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      } catch { /* puheElementti oli jo tyhjä */ }
    },
    tauko() {
      if (tila.peruttu || tila.tauolla) return;
      tila.tauolla = true;
      try {
        audio.pause();
      } catch { /* ei soinut */ }
      ilmoita();
    },
    jatka() {
      if (tila.peruttu || !tila.tauolla) return;
      tila.tauolla = false;
      ilmoita();
      // Kesken palan pysäytetty jatkuu samasta kohdasta; palojen
      // välissä pysäytetty jatkaa seuraavasta palasta.
      if (tila.soi && audio.paused && audio.currentTime > 0 && !audio.ended) {
        audio.play().catch(() => {});
      } else {
        soitaSeuraava();
      }
    },
    tauolla() {
      return tila.tauolla;
    },
    /** Sen hetkinen tila paneelin ensipiirtoa varten. */
    tilanne() {
      const kappale = palat[tila.soiva]?.kappale
        ?? palat[Math.min(tila.kohdalla, palat.length - 1)]?.kappale ?? 0;
      return { tauolla: tila.tauolla, kappale, kappaleita: tila.kappaleita };
    },
    /**
     * Kappalehyppy: +1 seuraavan kappaleen alkuun, -1 nykyisen
     * kappaleen alkuun (tai edelliseen, jos ollaan jo alussa) —
     * sama logiikka kuin levysoittimen kelauksessa.
     */
    siirryKappale(askel) {
      if (tila.peruttu || !palat.length) return;
      const nykyinen = palat[tila.soiva]?.kappale
        ?? palat[Math.min(tila.kohdalla, palat.length - 1)]?.kappale ?? 0;
      let kohde = nykyinen + (askel > 0 ? 1 : 0);
      if (askel < 0) {
        const alku = palat.findIndex((p) => p.kappale === nykyinen);
        kohde = (tila.soiva === alku && nykyinen > 0) ? nykyinen - 1 : nykyinen;
      }
      const indeksi = palat.findIndex((p) => p.kappale === kohde);
      if (indeksi < 0) return; // kohdekappaletta ei (vielä) ole
      tila.puraKuuntelijat?.();
      try {
        audio.pause();
      } catch { /* ei soinut */ }
      tila.kohdalla = indeksi;
      tila.soiva = -1;
      tila.soi = false;
      tila.tauolla = false;
      soitaSeuraava();
    },
  };
}
