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
 * KAKSI JAETTUA AUDIOELEMENTTIÄ. iPadin Safari sallii audio.play():n
 * vain elementille, joka on kertaalleen käynnistetty käyttäjän
 * eleestä. Siksi moduuli luo kaksi <audio>-elementtiä ja "virittää"
 * molemmat ensimmäisestä kosketuksesta (hiljainen tyhjä wav) — sen
 * jälkeen ne saavat soittaa haettuja paloja myös ilman elettä, esim.
 * pöllön striimivastauksen tahdissa. Elementit vuorottelevat: toinen
 * soi ja toiseen esiladataan seuraava pala, jolloin palanvaihto on
 * saumaton (ks. luoPuheSoitin). Luentoja on silti vain yksi
 * kerrallaan.
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

/** Lukee koko laitekohtaisen persoonasäätötaulun (jaettu apuri —
 * sama luku työhuoneen välilehdellä ja pelin kehittäjäsäätimellä). */
export function luePuheAsetukset() {
  try {
    const arvo = JSON.parse(window.localStorage?.getItem(PUHE_ASETUS_AVAIN) ?? '{}');
    return arvo && typeof arvo === 'object' ? arvo : {};
  } catch {
    return {};
  }
}

/** Tallettaa persoonasäätötaulun; tyhjät persoonat siivotaan pois. */
export function tallennaPuheAsetukset(asetukset) {
  const siivottu = {};
  for (const [avain, arvo] of Object.entries(asetukset ?? {})) {
    if (arvo && (arvo.aani || (arvo.ohje ?? '').trim())) siivottu[avain] = arvo;
  }
  try {
    if (Object.keys(siivottu).length) {
      window.localStorage?.setItem(PUHE_ASETUS_AVAIN, JSON.stringify(siivottu));
    } else {
      window.localStorage?.removeItem(PUHE_ASETUS_AVAIN);
    }
  } catch { /* yksityistila: säädöt elävät vain istunnon */ }
}

function puheenSaadot(persoona) {
  const oma = luePuheAsetukset()?.[persoona];
  if (!oma || typeof oma !== 'object') return null;
  const aani = typeof oma.aani === 'string' && oma.aani ? oma.aani : null;
  const ohje = typeof oma.ohje === 'string' && oma.ohje.trim() ? oma.ohje.trim() : null;
  return aani || ohje ? { aani, ohje } : null;
}

function kehittajaKoodi() {
  try {
    // Oma avain ensin; varalla pöllön kehittäjätilan koodi — pelin
    // kehittäjätilassa säädöt toimivat silloin ilman koodin
    // syöttämistä toiseen kertaan (sama salaisuus workerissa).
    return window.localStorage?.getItem(PUHE_KOODI_AVAIN)
      || window.localStorage?.getItem('matkakirja-pollo-kehittajakoodi')
      || null;
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

/*
 * KAKSI VUOROTTELEVAA ELEMENTTIÄ (omistajan palaute 15.8.2026:
 * "tauko lauseiden välissä on häiritsevä"): yhdellä elementillä
 * seuraava pala pääsi soimaan vasta kun edellinen oli loppunut ja
 * uusi lähde ladattu — jokaiseen saumaan syntyi ylimääräinen tauko.
 * Nyt seuraava pala esiladataan vapaana olevaan elementtiin ja
 * käynnistetään hieman ennen edellisen loppua, jolloin palojen
 * hännät ja alut limittyvät ja sauma kuulostaa luonnolliselta
 * virkevälin tauolta. Molemmat elementit viritetään samasta eleestä.
 */
let puheElementit = null;
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
 * LUKUNOPEUS (omistajan tilaus 14.8.2026; tarkennus 15.8.2026:
 * "Käytä vain openai:n nopeutussäätöä, ei mitään muuta"). Nopeus
 * tehdään GENEROINNISSA: worker välittää sen OpenAI:n omana
 * speed-parametrina, joten puhe syntyy halutussa tahdissa eikä
 * toistoa venytetä selaimessa lainkaan. Toistopuolen venytys kokeili
 * kahta muotoa ja molemmat olivat rikki: iOS nollasi playbackRaten
 * palan vaihdossa, ja Safarin sävelkorkeuden säilyttävä venytin
 * leikkasi palan hännän. Tuki todennettu julkaistulla workerilla
 * 15.8.2026 (sama teksti: 0,6× 143 kt, 1,0× 114 kt, 1,6× 57 kt).
 * Poikkeava nopeus laajentaa välimuistiavaimet nopeudella — normaali
 * 1,0 pitää kaikki vanhat säilöt osumina. Laitekohtainen asetus;
 * uusi arvo tarttuu seuraavasta generoitavasta palasta.
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

/**
 * Asettaa nopeuden. Nopeus toteutuu generoinnissa (haePala vie sen
 * workerille), joten uusi arvo kuuluu seuraavasta palasta alkaen —
 * jo haettuja paloja ei venytetä.
 */
export function asetaPuheenNopeus(arvo) {
  const nopeus = Math.min(NOPEUS_MAX, Math.max(NOPEUS_MIN, Number(arvo) || NOPEUS_OLETUS));
  try {
    window.localStorage?.setItem(NOPEUS_AVAIN, String(nopeus));
  } catch { /* ei tallennu — istunnon ajan silti voimassa */ }
  return nopeus;
}

/** Nopeus välimuistiavainten häntään; normaali 1,0 ei muuta avaimia. */
function nopeusTunniste() {
  const nopeus = puheenNopeus();
  return nopeus !== 1 ? `|${nopeus}` : '';
}

/** Kytkee vahvistimen, kun äänipiiri saadaan käyntiin (ele vaaditaan). */
function kytkeVahvistin() {
  if (kytketty || typeof window === 'undefined') return;
  const elementit = haeElementit();
  if (!elementit) return;
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
      const lahteet = elementit.map((a) => piiri.createMediaElementSource(a));
      /*
       * VIIVELINJA ENNEN VAHVISTINTA (omistajan idea 15.8.2026:
       * "Voiko alkuun generoida tyhjää niin että ei häviä mitään
       * siinä nykäisyssä? Nyt ens. kirjain katoaa kuuluvista"):
       * 60 ms viive toimii jokaisen palan alkuun generoituna tyhjänä.
       * Palan ensimmäiset näytteet istuvat viivelinjassa sillä aikaa,
       * kun häivytys nousee nollasta täyteen — puhe astuu ulos vasta
       * täydellä voimalla, eikä ensimmäisestä kirjaimesta katoa
       * mitään. Vakioviive ei kuulu tahtina, se vain siirtää kaikkea
       * 60 ms myöhemmäksi.
       */
      const viive = piiri.createDelay(0.2);
      viive.delayTime.value = 0.06;
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
      for (const lahde of lahteet) lahde.connect(viive);
      viive.connect(vahvistin);
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

function haeElementit() {
  if (!puheElementit && typeof window !== 'undefined' && typeof window.Audio === 'function') {
    puheElementit = [new window.Audio(), new window.Audio()];
    for (const a of puheElementit) a.preload = 'auto';
  }
  return puheElementit;
}

/**
 * Virittää jaetun elementin käyttäjän eleen aikana. Kutsutaan kerran
 * ensimmäisestä kosketuksesta; myöhemmät kutsut eivät tee mitään.
 */
function virita() {
  if (viritetty) return;
  viritetty = true;
  const elementit = haeElementit();
  if (!elementit) return;
  // Vahvistin kytketään samasta eleestä: äänipiiri käynnistyy vain
  // käyttäjän kosketuksesta, ja kerran kytkettynä se pysyy.
  kytkeVahvistin();
  // MOLEMMAT elementit viritetään samasta eleestä — iOS sallii
  // play()-kutsut myöhemmin vain elementeille, jotka ovat kerran
  // soineet käyttäjän eleessä.
  for (const audio of elementit) {
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
  const saatoTunniste = `${saadot ? `${saadot.aani ?? ''}|${saadot.ohje ?? ''}` : ''}${nopeusTunniste()}`;
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
      // Nopeus generoidaan OpenAI:n omalla speed-parametrilla
      // (omistajan tarkennus 15.8.2026); 1,0 jätetään pois, jotta
      // pyyntö ja workerin välimuistiavain pysyvät entisellään.
      nopeus: puheenNopeus() !== 1 ? puheenNopeus() : undefined,
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
 *   onTila?: (t: {tauolla: boolean, kappale: number, kappaleita: number,
 *     teksti: string|null, alku: number}) => void,
 *   aloitusKappale?: number ensimmäisenä soitettava kappale (oletus 0)
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
  aloitusKappale = 0,
} = {}) {
  if (!puheTuettu()) return null;
  const elementit = haeElementit();
  if (!elementit) return null;

  const palat = []; // { teksti, kappale, alku (merkkikohta kappaleessa) }
  const haut = new Map(); // palaindeksi → Promise<blob-osoite>
  let esiladattu = -1; // palaindeksi, jonka ääni on jo vapaassa elementissä
  const tila = {
    peruttu: false,
    paatetty: false,
    soi: false,
    tauolla: false,
    kohdalla: 0, // seuraavaksi soitettavan palan indeksi
    soiva: -1, // parhaillaan soivan palan indeksi
    kappaleita: 0,
    vuoro: 0, // kumpi elementti ottaa seuraavan palan
    soivaAudio: null, // parhaillaan soiva elementti
    puraKuuntelijat: null, // soivan palan ended/error-kuuntelijat irti
  };
  /** Kaikki toisto seis — molemmat elementit hiljaisiksi. */
  const pysaytaElementit = ({ tyhjenna = false } = {}) => {
    for (const a of elementit) {
      try {
        a.pause();
        if (tyhjenna) {
          a.removeAttribute('src');
          a.load();
        }
      } catch { /* elementti oli jo tyhjä */ }
    }
  };

  const ilmoita = () => {
    if (!onTila || tila.peruttu) return;
    const pala = palat[tila.soiva] ?? palat[tila.kohdalla] ?? null;
    try {
      onTila({
        tauolla: tila.tauolla,
        kappale: pala?.kappale ?? 0,
        kappaleita: tila.kappaleita,
        // Soiva pala tekstinä ja merkkikohtanaan kappaleessa: lukija
        // maalaa juuri kuuluvat virkkeet ruudulle (omistajan toive
        // 14.8.2026 "tekstin kevyesti maalattua lukijan rytmissä").
        teksti: palat[tila.soiva]?.teksti ?? null,
        alku: palat[tila.soiva]?.alku ?? 0,
      });
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
    /*
     * Nukahtanut äänipiiri hereille ODOTETUSTI ennen toistoa
     * (omistajan havainto 15.8.2026: "nykäys kuuluu yhä tekstin
     * alussa"): resume on asynkroninen, ja ilman odotusta pala alkoi
     * soida ennen kuin piiri prosessoi — luennan alusta katosi pätkä
     * ja loppu kuului nykäyksenä.
     */
    if (piiri?.state === 'suspended') {
      try {
        await piiri.resume?.();
      } catch { /* piiri jäi kiinni — elementti soi silti */ }
      if (tila.peruttu || tila.tauolla || tila.soiva !== indeksi) return;
    }
    const audio = elementit[tila.vuoro];
    tila.vuoro = 1 - tila.vuoro;
    const edellinen = elementit[tila.vuoro];
    // Soiko edellinen pala vielä? Limittäisessä saumassa sen häntä
    // jatkuu uuden palan alun alla, eikä vahvistinta saa silloin
    // rampata — kuoppa osuisi edellisen hännän päälle.
    const limittain = edellinen !== audio && !edellinen.paused && !edellinen.ended
      && Boolean(edellinen.currentSrc);
    if (vahvistin) {
      const nyt = piiri.currentTime;
      vahvistin.gain.cancelScheduledValues(nyt);
      if (indeksi === 0) {
        /*
         * NAPSAHDUS POIS (14.8.2026): luennan ensimmäinen pala
         * nostetaan kuuluviin lyhyellä rampilla nollasta. Ramppi
         * mahtuu viivelinjan (60 ms) sisään, joten ensimmäisestä
         * kirjaimesta ei katoa mitään (15.8.2026 — vanha 90 ms:n
         * ramppi söi alun).
         */
        vahvistin.gain.setValueAtTime(0, nyt);
        vahvistin.gain.linearRampToValueAtTime(puheenVoima(), nyt + 0.05);
      } else if (!limittain) {
        // Tauon jälkeinen sauma: lyhyt häivytys pyöristää dekoodauksen
        // alun napsun; mahtuu viivelinjaan eikä syö puhetta.
        vahvistin.gain.setValueAtTime(0, nyt);
        vahvistin.gain.linearRampToValueAtTime(puheenVoima(), nyt + 0.025);
      } else {
        // Limittäinen sauma: täysi voima koko ajan.
        vahvistin.gain.setValueAtTime(puheenVoima(), nyt);
      }
    }
    tila.soivaAudio = audio;
    // Esiladattu lähde on jo elementissä — src-vaihto vain tarpeeseen.
    if (audio.src !== osoite) audio.src = osoite;
    let siirrytty = false;
    const seuraavaan = () => {
      if (siirrytty || tila.peruttu) return;
      siirrytty = true;
      soitaSeuraava();
    };
    /*
     * LIMITTÄINEN SAUMA (omistajan palaute 15.8.2026: "tauko
     * lauseiden välissä on häiritsevä"): seuraava pala käynnistetään
     * ~140 ms ennen edellisen loppua, kun sen ääni on jo esiladattu
     * vapaaseen elementtiin. Palan lopussa on generoinnin jättämää
     * hiljaisuutta ja alussa enkooderin tyhjää, joten limitys ei
     * mene puheen päälle — sauma lyhenee luonnollisen virkevälin
     * mittaiseksi.
     */
    const ennakko = () => {
      if (siirrytty || tila.peruttu || tila.tauolla) return;
      if (esiladattu !== tila.kohdalla) return;
      const kesto = audio.duration;
      if (!Number.isFinite(kesto) || !kesto) return;
      if (kesto - audio.currentTime <= 0.14) {
        audio.removeEventListener('timeupdate', ennakko);
        seuraavaan();
      }
    };
    const valmis = () => {
      audio.removeEventListener('ended', valmis);
      audio.removeEventListener('error', valmis);
      audio.removeEventListener('timeupdate', ennakko);
      seuraavaan();
    };
    tila.puraKuuntelijat = () => {
      audio.removeEventListener('ended', valmis);
      audio.removeEventListener('error', valmis);
      audio.removeEventListener('timeupdate', ennakko);
      tila.puraKuuntelijat = null;
    };
    audio.addEventListener('ended', valmis);
    audio.addEventListener('error', valmis);
    audio.addEventListener('timeupdate', ennakko);
    try {
      await audio.play();
    } catch {
      // Soittolupa puuttui (ele ehti vanheta). Ei estolippua — kyse ei
      // ole palvelusta — mutta luenta päättyy, ettei jono pyöri tyhjää.
      tila.puraKuuntelijat?.();
      tila.soi = false;
      tila.peruttu = true;
      onVirhe?.(indeksi === 0 ? 'alku' : 'kesken');
      return;
    }
    /*
     * Esilataus: heti kun seuraavan palan ääni on haettu, se pannaan
     * vapaaseen elementtiin latautumaan — sauman kohdalla play()
     * lähtee ilman lataustaukoa.
     */
    const seuraava = indeksi + 1;
    haut.get(seuraava)?.then((seuraavaOsoite) => {
      if (tila.peruttu || tila.kohdalla !== seuraava) return;
      const vapaa = elementit[tila.vuoro];
      if (vapaa !== tila.soivaAudio) {
        if (vapaa.src !== seuraavaOsoite) vapaa.src = seuraavaOsoite;
        esiladattu = seuraava;
      }
    }).catch(() => {});
  };

  /**
   * Pilkkoo lisätyn tekstin kappaleiksi ja paloiksi kappaletiedolla.
   *
   * Porrastus on KAPPALEKOHTAINEN (14.8.2026): kappaleen alkupää
   * kulkee kevyinä paloina ja koko kasvaa portaittain, jotta
   * kappalehyppy ja keskeltä sivua aloittaminen eivät odotuta ison
   * palan generointia. Koko jonon ensimmäinen virke kulkee YKSIN,
   * jotta luenta alkaa heti.
   *
   * Muiden kappaleiden ensimmäistä virkettä EI enää pakoteta omaksi
   * palakseen (omistajan havainto 15.8.2026: "ääni nykäisee jokaisen
   * lauseen alussa") — virkekohtaiset palat toivat palanvaihdon lähes
   * joka lauseen väliin, ja jokainen vaihto on erillinen mp3, jonka
   * alku kuuluu pienenä nykäisynä. Kappaleen ensipala on nyt enintään
   * ensimmäinen porras (240 mrk) — hyppy laskeutuu yhä kevyeen
   * palaan, mutta tavallinen 2–4 virkkeen kappale soi enimmäkseen
   * yhtenä tai kahtena palana.
   *
   * Jokainen pala muistaa myös merkkikohtansa kappaleessa (alku):
   * lukija maalaa sillä juuri kuuluvat virkkeet ruudulle.
   */
  const pilkoPaloiksi = (teksti) => {
    const uudet = [];
    for (const rivi of String(teksti ?? '').split('\n')) {
      if (!rivi.trim()) continue;
      const kappale = tila.kappaleita;
      tila.kappaleita += 1;
      const portaat = [240, 480];
      let kappaleessa = 0; // valmiita paloja tässä kappaleessa
      let kohta = 0; // seuraavan virkkeen merkkikohta kappaleessa
      let kertyma = '';
      let kertymanAlku = 0;
      const tyonna = () => {
        if (!kertyma) return;
        uudet.push({ teksti: kertyma, kappale, alku: kertymanAlku });
        kappaleessa += 1;
        kertyma = '';
      };
      for (const virke of paloitteleVirkkeiksi(rivi)) {
        const virkkeenAlku = kohta;
        kohta += virke.length + 1;
        // Koko jonon ensimmäinen virke yksin — luenta käyntiin heti.
        if (!(palat.length + uudet.length) && !kertyma) {
          uudet.push({ teksti: virke, kappale, alku: virkkeenAlku });
          kappaleessa += 1;
          continue;
        }
        const raja = portaat[kappaleessa] ?? PUHE_PALA_KATTO;
        if (kertyma && kertyma.length + virke.length + 1 > raja) {
          tyonna();
          kertyma = virke;
          kertymanAlku = virkkeenAlku;
          continue;
        }
        if (!kertyma) kertymanAlku = virkkeenAlku;
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
      /*
       * Aloitus keskeltä (omistajan toive 14.8.2026: "Lukija saisi
       * aloittaa sen kohdan alusta joka on näytöllä"): ennen
       * ensimmäistäkään soittoa jono kelataan pyydetyn kappaleen
       * alkuun. Jos kappaletta ei (vielä) ole, aloitetaan alusta.
       */
      if (aloitusKappale > 0 && !tila.soi && tila.soiva < 0 && tila.kohdalla === 0) {
        const indeksi = palat.findIndex((p) => p.kappale === aloitusKappale);
        if (indeksi > 0) tila.kohdalla = indeksi;
      }
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
      pysaytaElementit({ tyhjenna: true });
    },
    tauko() {
      if (tila.peruttu || tila.tauolla) return;
      tila.tauolla = true;
      // Molemmat elementit tauolle — limittäisessä saumassa myös
      // edellisen palan häntä voi vielä soida.
      pysaytaElementit();
      ilmoita();
    },
    jatka() {
      if (tila.peruttu || !tila.tauolla) return;
      tila.tauolla = false;
      ilmoita();
      // Kesken palan pysäytetty jatkuu samasta kohdasta; palojen
      // välissä pysäytetty jatkaa seuraavasta palasta.
      const audio = tila.soivaAudio;
      if (tila.soi && audio && audio.paused && audio.currentTime > 0 && !audio.ended) {
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
      pysaytaElementit();
      esiladattu = -1; // vanha esilataus ei kelpaa hypyn jälkeen
      tila.kohdalla = indeksi;
      tila.soiva = -1;
      tila.soi = false;
      tila.tauolla = false;
      soitaSeuraava();
    },
  };
}
