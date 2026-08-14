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
export const PUHE_PERSOONAT = ['kertoja', 'pollo'];

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

/* ------------------------------------------------------------------ */
/* Jaettu audioelementti ja viritys                                    */
/* ------------------------------------------------------------------ */

/** Hiljainen tyhjä wav: viritys ei saa kuulua eikä vaatia verkkoa. */
const HILJAINEN_WAV = 'data:audio/wav;base64,'
  + 'UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

let puheElementti = null;
let viritetty = false;

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
  const avain = `${persoona}|${teksti}`;
  if (puheMuisti.has(avain)) return puheMuisti.get(avain);

  let kansio = null;
  let osoiteAvain = null;
  if (sailio && typeof caches !== 'undefined') {
    osoiteAvain = await sailioAvain(persoona, teksti);
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
  const vastaus = await fetch(POLLOPALVELIN, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ tehtava: 'puhe', teksti, persoona, lohko: sailio || undefined }),
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
 * @param {{
 *   persoona?: string,
 *   sailio?: string|null pysyvän säilön lohko; null = ei säilötä
 *   onLoppu?: () => void,
 *   onVirhe?: (vaihe: 'alku'|'kesken') => void,
 * }} asetukset
 * @returns {{
 *   lisaa(teksti: string): void,
 *   paata(): void,
 *   pysayta(): void,
 *   tauko(): void,
 *   jatka(): void,
 * }|null}
 */
export function luoPuheSoitin({
  persoona = 'kertoja', sailio = null, onLoppu = null, onVirhe = null,
} = {}) {
  if (!puheTuettu()) return null;
  const audio = haeElementti();
  if (!audio) return null;

  const palat = [];
  const haut = new Map(); // palaindeksi → Promise<blob-osoite>
  const tila = {
    peruttu: false,
    paatetty: false,
    soi: false,
    kohdalla: 0, // seuraavaksi soitettavan palan indeksi
  };

  const hae = (indeksi) => {
    if (indeksi >= palat.length || haut.has(indeksi)) return;
    haut.set(indeksi, haePala(palat[indeksi], persoona, sailio));
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
    if (tila.peruttu) return;
    if (tila.kohdalla >= palat.length) {
      tila.soi = false;
      if (tila.paatetty) loppu();
      return;
    }
    tila.soi = true;
    const indeksi = tila.kohdalla;
    tila.kohdalla += 1;
    hae(indeksi);
    hae(indeksi + 1); // etuhaku edellisen soidessa
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
    if (tila.peruttu) return;
    audio.src = osoite;
    const valmis = () => {
      audio.removeEventListener('ended', valmis);
      audio.removeEventListener('error', valmis);
      if (tila.peruttu) return;
      soitaSeuraava();
    };
    audio.addEventListener('ended', valmis);
    audio.addEventListener('error', valmis);
    try {
      await audio.play();
    } catch {
      // Soittolupa puuttui (ele ehti vanheta). Ei estolippua — kyse ei
      // ole palvelusta — mutta luenta päättyy, ettei jono pyöri tyhjää.
      audio.removeEventListener('ended', valmis);
      audio.removeEventListener('error', valmis);
      tila.soi = false;
      tila.peruttu = true;
      onVirhe?.(indeksi === 0 ? 'alku' : 'kesken');
    }
  };

  return {
    lisaa(teksti) {
      if (tila.peruttu || tila.paatetty) return;
      const uudet = niputaPalat(paloitteleVirkkeiksi(teksti));
      if (!uudet.length) return;
      palat.push(...uudet);
      if (!tila.soi) soitaSeuraava();
      else hae(tila.kohdalla); // varmista että seuraava on jo tulossa
    },
    paata() {
      if (tila.peruttu || tila.paatetty) return;
      tila.paatetty = true;
      if (!tila.soi && tila.kohdalla >= palat.length) loppu();
    },
    pysayta() {
      if (tila.peruttu) return;
      tila.peruttu = true;
      try {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      } catch { /* puheElementti oli jo tyhjä */ }
    },
    tauko() {
      try {
        audio.pause();
      } catch { /* ei soinut */ }
    },
    jatka() {
      if (tila.peruttu) return;
      audio.play().catch(() => {});
    },
  };
}
