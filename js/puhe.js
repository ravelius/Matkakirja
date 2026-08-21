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
 * TOISTO ON WEBAUDIO-PUSKUREISSA (15.8.2026). Palat dekoodataan
 * AudioBuffereiksi, hiljaisuudet leikataan päistä ja palat liitetään
 * piirin aikajanalle vakiomittaisin väliin — saumat kuulostavat
 * yhtenäisen luennan virkeväleiltä (ks. luoPuheSoitin). Kaksi
 * <audio>-elementtiä on yhä olemassa, mutta vain virittämässä
 * äänipiirin käyntiin käyttäjän eleestä (iOS vaatii eleen) —
 * varsinainen luenta ei kulje niiden kautta.
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
 *
 * 700 → 950 (omistaja 18.8.2026): luenta kulkee nyt kokonaisina
 * kappaleina (ks. kappaleenPalat), ja katon on siksi katettava
 * mahdollisimman moni kappale yhdellä pyynnöllä — raja on enää
 * workerin kovan rajan vartija, ei palakoon säädin.
 */
export const PUHE_PALA_KATTO = 950;

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

/**
 * Yhden kappaleen palat merkkikohtineen ({ teksti, alku }).
 *
 * KOKO KAPPALE ON YKSI PALA aina kun se mahtuu kattoon (omistaja
 * 18.8.2026: "siinä tulee outo intonaation hyppy, kun lukija lukee
 * vain osan kappaleesta ja sitten jatkaa seuraavaan lauseeseen
 * uudella lähdöllä"). Jokainen pala on oma generointinsa ja alkaa
 * uudella intonaatiolla, joten palaraja kesken kappaleen kuuluu —
 * virkerajalla pilkkominen ja porrastettu palakoko poistettiin.
 * Katto pilkkoo virkerajalta vain kappaleen, joka ei mahdu workerin
 * rajaan; kattoa pidempi yksittäinen virke lähtee omanaan.
 *
 * Sama funktio johtaa palat sekä soittimessa (pilkoPaloiksi) että
 * esipuskurissa (js/lukija.js esipuskuroiLuenta) — puskuri osuu
 * välimuistiavaimeen vain, jos teksti on täsmälleen sama.
 */
export function kappaleenPalat(rivi, katto = PUHE_PALA_KATTO) {
  const palat = [];
  let kohta = 0;
  let kertyma = '';
  let alku = 0;
  const tyonna = () => {
    if (!kertyma) return;
    palat.push({ teksti: kertyma, alku });
    kertyma = '';
  };
  for (const virke of paloitteleVirkkeiksi(rivi)) {
    const virkkeenAlku = kohta;
    kohta += virke.length + 1;
    if (kertyma && kertyma.length + virke.length + 1 > katto) {
      tyonna();
      kertyma = virke;
      alku = virkkeenAlku;
      continue;
    }
    if (!kertyma) alku = virkkeenAlku;
    kertyma = kertyma ? `${kertyma} ${virke}` : virke;
  }
  tyonna();
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

/*
 * SANELUN KOVA TAUKO KOSKEE MYÖS LUKIJAÄÄNTÄ (omistajan havainto
 * 21.8.2026: "pöllön puhe ei ohjaudu bluetooth-kuulokkeisiin,
 * lehtisivun luenta kuuluu").
 *
 * js/sound.js pysäytti tehostekontekstin sanelun ajaksi jo 13.8.
 * (saneluTauko), mutta TÄMÄ piiri jäi käyntiin. Käynnissä oleva
 * WebAudio-konteksti pitää sivun äänisession toistotilassa samaan
 * aikaan kun mikrofoni on auki, jolloin iOS jää nauhoitusreitille:
 * Bluetooth-kuuloke putoaa musiikkiprofiilista (A2DP) puhelu-
 * profiiliin (HFP) eikä palaa ennen kuin sessio oikeasti vapautuu.
 * Sanelun jälkeen luettu pöllön vastaus soi silloin laitteen
 * kaiuttimesta, vaikka lehtiluenta (jonka aikana mikrofonia ei ole
 * avattu) kuuluu kuulokkeista normaalisti.
 *
 * Siksi piiri pannaan sanelun ajaksi oikeasti tauolle ja herätetään
 * vasta sanelun päätyttyä — sama kohtelu kuin tehosteilla.
 */
let saneluTauko = false;

/** Lukijaäänen piiri tauolle sanelun ajaksi (js/ambience-stream.js). */
export function taukoaPuhePiiri() {
  saneluTauko = true;
  try {
    piiri?.suspend?.()?.catch?.(() => {});
  } catch { /* piiri ei ollut käynnissä */ }
}

/** Sanelu ohi — piiri takaisin hereille. */
export function jatkaPuhePiiri() {
  saneluTauko = false;
  try {
    if (piiri?.state === 'suspended') piiri.resume?.()?.catch?.(() => {});
  } catch { /* piiri syntyy seuraavasta luennasta */ }
}

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
      // kytketty-lippu estää toisen yrityksen. Elementit soittavat enää
      // virityksen (puskuripolku hoitaa varsinaisen luennan), mutta ne
      // pidetään ketjussa varmuuden vuoksi.
      const lahteet = elementit.map((a) => piiri.createMediaElementSource(a));
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
      for (const lahde of lahteet) lahde.connect(vahvistin);
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
  /*
   * PIIRI HEREILLE JOKAISESTA ELEESTÄ (Mac-Safarin havainto 15.8.2026:
   * "striimi ääni ei kuulu macin selaimella"). Safari epää piirin
   * resume-kutsun käyttäjän eleen ULKOPUOLELLA, ja striimiluenta
   * (pöllön vastaus, lehtiluenta) käynnistyy vasta verkkovastauksen
   * saavuttua — eli eleen jälkeen. Piiri jäi suspended-tilaan ja
   * kaikki aikajanalle liitetyt palat "soivat" äänettöminä.
   *
   * Siksi pysyvä kuuntelija: jokainen kosketus herättää piirin, jos
   * se ei ole käynnissä. Käytännössä jo se klikkaus, joka lähettää
   * kysymyksen tai avaa luennan, herättää piirin ennen kuin ääntä
   * edes tarvitaan. Running-tilassa kuuntelija ei tee mitään, joten
   * se on ilmainen — ja se kattaa myös Safarin interrupted-tilan
   * (puhelu, toinen välilehti), josta kerran viritetty once-polku ei
   * enää auttanut.
   */
  document.addEventListener('pointerdown', () => {
    // Sanelun kova tauko voittaa elvytyksen: mikrofonin ollessa auki
    // piiriä ei herätetä (ks. taukoaPuhePiiri).
    if (saneluTauko) return;
    if (!piiri || piiri.state === 'running') return;
    try {
      piiri.resume?.().catch(() => { /* seuraava ele yrittää taas */ });
    } catch { /* piiri kuoli — luoPuheSoitin tekee uuden */ }
  }, { capture: true, passive: true });
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

/**
 * ESIHAKU VÄLIMUISTIIN (omistajan tilaus 15.8.2026, "Etukäteispuskurin
 * periaate"): hakee yhden palan valmiiksi ilman että mitään soi.
 *
 * Esihaku EI käynnistä ääntä eikä vaadi käyttäjän elettä — se on
 * pelkkä fetch, jonka tulos jää istunnon muistiin (puheMuisti) ja
 * laitteen pysyvään säilöön. Kun pelaaja sitten painaa kaiutinta,
 * luennan ensimmäinen pala löytyy samalla avaimella eikä generointia
 * odoteta lainkaan.
 *
 * AVAIMEN ON OSUTTAVA. Avain on `persoona|säädöt|teksti` (ks.
 * haePala), joten esihaun tekstin, persoonan, säilölohkon ja
 * nopeusasetuksen on oltava täsmälleen samat kuin luennassa. Väärä
 * avain maksaisi generoinnin kahdesti — se olisi pahempi kuin ei
 * puskuria lainkaan. Siksi kutsuja ei kirjoita tekstiä itse vaan
 * johtaa sen samasta luennan koonnista (js/lukija.js
 * esipuskuroiLuenta).
 *
 * Virheet niellään: puskuri on pelkkää nopeutta, ja ilman sitä kaikki
 * toimii kuten ennenkin.
 *
 * @returns {Promise<boolean>} osuiko haku talteen
 */
export async function esihaePala(teksti, persoona = 'kertoja', sailio = null) {
  const pala = String(teksti ?? '').trim();
  if (!pala || !puheTuettu()) return false;
  try {
    await haePala(pala, persoona, sailio);
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Soitin                                                              */
/* ------------------------------------------------------------------ */

/**
 * Luo puhesoittimen. Palauttaa null, jos puhe ei ole käytettävissä.
 *
 * PUSKURISOITIN (15.8.2026). Omistajan havainto "ongelma on varmaankin
 * OpenAI:n lähettämässä äänessä" piti paikkansa: mittauksessa generoitu
 * pala alkaa ~60 ms hiljaisuudella, jonka jälkeen puhe iskee sisään
 * lähes täydellä tasolla, ja perässä on ~400 ms kuollutta häntää.
 * Audioelementti soitti nämä sellaisinaan, joten jokaiseen saumaan
 * syntyi puolen sekunnin kuoppa ja terävä isku — "nykäys".
 *
 * Puskurisoitin dekoodaa palat WebAudio-puskureiksi, LEIKKAA
 * hiljaisuudet molemmista päistä, liittää palat piirin aikajanalle
 * vakiomittaisin väliin (lyhyt virkeväli palojen, pidempi kappaleväli
 * kappaleiden välissä — sama poljento kuin yhtenäisessä luennassa) ja
 * pehmentää jokaisen sauman mikrohäivytyksellä. Tauko pysäyttää koko
 * piirin (suspend), joten jatko lähtee näytteen tarkkuudella samasta
 * kohdasta.
 *
 * KAPPALEET JA OHJAUS (omistajan tilaus 14.8.2026): rivinvaihto
 * luettavassa tekstissä on kappaleen raja, ja jokainen pala muistaa
 * kappaleensa — kappalehypyt ja laskuri toimivat kuten ennenkin.
 *
 * @param {{
 *   persoona?: string,
 *   sailio?: string|null pysyvän säilön lohko; null = ei säilötä
 *   onLoppu?: () => void,
 *   onVirhe?: (vaihe: 'alku'|'kesken') => void,
 *   onTila?: (t: {tauolla: boolean, kappale: number, kappaleita: number,
 *     teksti: string|null, alku: number}) => void,
 *   aloitusKappale?: number ensimmäisenä soitettava kappale (oletus 0)
 *   otsikkoKappaleet?: Iterable<number> otsikolla alkavat kappaleet —
 *     niiden edellä pidetään pidempi tauko (OTSIKKOVALI)
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
  aloitusKappale = 0, otsikkoKappaleet = null,
} = {}) {
  if (!puheTuettu()) return null;
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  try {
    piiri = piiri ?? new AC();
  } catch {
    return null;
  }

  const VIRKEVALI = 0.22; // s — palojen väli samassa kappaleessa
  const KAPPALEVALI = 0.45; // s — kappaleiden väli
  /*
   * Otsikolla alkavan kappaleen edellä pidetään pidempi tauko
   * (omistajan tilaus 15.8.2026: "Lukija voisi pitää pienen tauon
   * ennen kun tulee uusi otsikko tai väliotsikko") — hengähdys
   * kertoo korvalle, että osasto vaihtuu, samoin kuin tyhjä tila
   * kertoo sen silmälle. Kutsuja nimeää otsikolliset kappaleet
   * (otsikkoKappaleet), koska soitin näkee vain paljasta tekstiä.
   */
  const OTSIKKOVALI = 0.95; // s — tauko ennen otsikolla alkavaa kappaletta
  const otsikolliset = new Set(otsikkoKappaleet ?? []);
  const HAIVYTYS = 0.012; // s — mikrohäivytys sauman molemmin puolin
  const KYNNYS = 0.02; // hiljaisuuden huippuraja trimmauksessa
  const PUSKURI_S = 20; // näin pitkälle aikataulutetaan etukäteen

  const palat = []; // { teksti, kappale, alku (merkkikohta kappaleessa) }
  const haut = new Map(); // palaindeksi → Promise<{puskuri, alku, loppu}>
  const aloitusajat = []; // palaindeksi → {alku, loppu} piirin ajassa
  const lahteet = new Set(); // aikataulussa olevat source-nodet
  const tila = {
    peruttu: false,
    paatetty: false,
    tauolla: false,
    kaynnissa: false,
    soiva: -1,
    kappaleita: 0,
  };
  let vuorossa = 0; // seuraavaksi aikataulutettava pala
  let seuraavaAlku = 0; // piirin aika, johon seuraava pala liitetään
  let kello = null;
  let aikataulutus = null;

  const ilmoita = () => {
    if (!onTila || tila.peruttu) return;
    const pala = palat[tila.soiva]
      ?? palat[Math.min(vuorossa, palat.length - 1)] ?? null;
    try {
      onTila({
        tauolla: tila.tauolla,
        kappale: pala?.kappale ?? 0,
        kappaleita: tila.kappaleita,
        // Soiva pala tekstinä ja merkkikohtanaan kappaleessa: lukija
        // maalaa juuri kuuluvat virkkeet ruudulle.
        teksti: palat[tila.soiva]?.teksti ?? null,
        alku: palat[tila.soiva]?.alku ?? 0,
      });
    } catch { /* paneelin virhe ei saa kaataa luentaa */ }
  };

  /** Puheen rajat puskurissa: hiljaisuus pois päistä, pieni jousto jää. */
  const trimmaa = (puskuri) => {
    const data = puskuri.getChannelData(0);
    const sr = puskuri.sampleRate;
    const ikkuna = Math.max(1, Math.round(sr * 0.02));
    let eka = -1;
    let vika = -1;
    for (let i = 0; i < data.length; i += ikkuna) {
      const raja = Math.min(i + ikkuna, data.length);
      let huippu = 0;
      for (let j = i; j < raja; j += 1) {
        const a = Math.abs(data[j]);
        if (a > huippu) huippu = a;
      }
      if (huippu > KYNNYS) {
        if (eka < 0) eka = i;
        vika = raja;
      }
    }
    // Pelkkää hiljaisuutta (testityngät): soitetaan sellaisenaan.
    if (eka < 0) return { alku: 0, loppu: puskuri.duration };
    return {
      alku: Math.max(0, eka / sr - 0.02),
      loppu: Math.min(puskuri.duration, vika / sr + 0.06),
    };
  };

  const hae = (indeksi) => {
    if (indeksi >= palat.length || haut.has(indeksi)) return;
    haut.set(indeksi, (async () => {
      const osoite = await haePala(palat[indeksi].teksti, persoona, sailio);
      const raaka = await (await fetch(osoite)).arrayBuffer();
      const puskuri = await piiri.decodeAudioData(raaka);
      return { puskuri, ...trimmaa(puskuri) };
    })());
    // Hylkäys käsitellään aikatauluttajassa; tämä estää vain
    // "unhandled rejection" -kohinan konsoliin.
    haut.get(indeksi).catch(() => {});
  };

  const loppu = () => {
    if (tila.peruttu) return;
    tila.peruttu = true;
    clearInterval(kello);
    kello = null;
    onLoppu?.();
  };

  const pysaytaLahteet = () => {
    for (const lahde of lahteet) {
      try { lahde.onended = null; lahde.stop(); } catch { /* jo pysähtynyt */ }
      try { lahde.disconnect(); } catch { /* jo irti */ }
    }
    lahteet.clear();
  };

  /** Liittää valmiit palat piirin aikajanalle, pari palaa kerrallaan. */
  const aikatauluta = () => {
    if (aikataulutus) return;
    aikataulutus = (async () => {
      while (!tila.peruttu && !tila.tauolla && vuorossa < palat.length) {
        hae(vuorossa);
        hae(vuorossa + 1);
        hae(vuorossa + 2);
        // Riittävä etumatka aikataulussa — koko lehteä ei liitetä
        // kerralla, jotta hyppy ja pysäytys pysyvät kevyinä.
        if (seuraavaAlku - piiri.currentTime > PUSKURI_S) return;
        const indeksi = vuorossa;
        let pala;
        try {
          pala = await haut.get(indeksi);
        } catch {
          // Ensimmäisen palan virhe → kutsuja voi valita varapolun
          // koko tekstille; myöhempi virhe päättää luennan siististi.
          const vaihe = tila.soiva < 0 && !lahteet.size ? 'alku' : 'kesken';
          tila.peruttu = true;
          clearInterval(kello);
          kello = null;
          pysaytaLahteet();
          onVirhe?.(vaihe);
          return;
        }
        if (tila.peruttu || tila.tauolla || vuorossa !== indeksi) return;
        const kesto = Math.max(0.05, pala.loppu - pala.alku);
        const alkuAika = Math.max(seuraavaAlku, piiri.currentTime + 0.08);
        const lahde = piiri.createBufferSource();
        lahde.buffer = pala.puskuri;
        const verho = piiri.createGain();
        verho.gain.setValueAtTime(0, alkuAika);
        verho.gain.linearRampToValueAtTime(1, alkuAika + HAIVYTYS);
        verho.gain.setValueAtTime(1, Math.max(alkuAika + HAIVYTYS, alkuAika + kesto - HAIVYTYS));
        verho.gain.linearRampToValueAtTime(0, alkuAika + kesto);
        lahde.connect(verho);
        verho.connect(vahvistin ?? piiri.destination);
        lahde.start(alkuAika, pala.alku, kesto);
        lahde.onended = () => {
          lahteet.delete(lahde);
          try { verho.disconnect(); } catch { /* jo irti */ }
        };
        lahteet.add(lahde);
        aloitusajat[indeksi] = { alku: alkuAika, loppu: alkuAika + kesto };
        const sama = palat[indeksi + 1]?.kappale === palat[indeksi].kappale;
        const vali = sama ? VIRKEVALI
          : (otsikolliset.has(palat[indeksi + 1]?.kappale) ? OTSIKKOVALI : KAPPALEVALI);
        seuraavaAlku = alkuAika + kesto + vali;
        vuorossa += 1;
      }
    })().finally(() => { aikataulutus = null; });
  };

  /** Kello: soivan palan seuranta, jatkoaikataulutus ja lopetus. */
  const kaynnistaKello = () => {
    if (kello) return;
    kello = setInterval(() => {
      if (tila.peruttu) {
        clearInterval(kello);
        kello = null;
        return;
      }
      if (!tila.tauolla) aikatauluta();
      const nyt = piiri.currentTime;
      let soiva = tila.soiva;
      for (let i = 0; i < aloitusajat.length; i += 1) {
        const aika = aloitusajat[i];
        if (aika && aika.alku <= nyt + 0.03) soiva = i;
      }
      if (soiva !== tila.soiva) {
        tila.soiva = soiva;
        ilmoita();
      }
      // Vanhat puskurit pois muistista — taaksepäin hyppy dekoodaa
      // laitteen välimuistista uudestaan halvalla.
      for (const avain of haut.keys()) {
        if (avain < tila.soiva - 1) haut.delete(avain);
      }
      const viimeinen = aloitusajat[palat.length - 1];
      if (tila.paatetty && vuorossa >= palat.length && viimeinen
        && nyt > viimeinen.loppu + 0.1) {
        loppu();
      }
    }, 150);
  };

  /**
   * Pilkkoo lisätyn tekstin kappaleiksi ja paloiksi kappaletiedolla.
   *
   * KAPPALE = PALA (omistaja 18.8.2026). Aiempi porrastus (eka virke
   * yksin, sitten 240/480 mrk:n palat) sai luennan alkuun nopeasti,
   * mutta jokainen pala on oma generointinsa ja alkaa uudella
   * intonaatiolla — kesken kappaleen se kuulosti oudolta hypyltä.
   * Nyt kappale kulkee yhtenä palana (kappaleenPalat pilkkoo vain
   * workerin rajan ylittävän kappaleen), aloitusviive katetaan
   * esipuskurilla (js/lukija.js esipuskuroiLuenta). Jokainen pala
   * muistaa merkkikohtansa kappaleessa (alku) — lukija maalaa sillä
   * kuuluvan alueen, nyt siis koko kappaleen.
   */
  const pilkoPaloiksi = (teksti) => {
    const uudet = [];
    for (const rivi of String(teksti ?? '').split('\n')) {
      if (!rivi.trim()) continue;
      const kappale = tila.kappaleita;
      tila.kappaleita += 1;
      for (const pala of kappaleenPalat(rivi)) {
        uudet.push({ ...pala, kappale });
      }
    }
    return uudet;
  };

  const kaynnista = async () => {
    if (tila.kaynnissa || tila.peruttu) return;
    tila.kaynnissa = true;
    try {
      await piiri.resume?.();
    } catch { /* piiri jää kiinni — lähteet soivat resumen jälkeen */ }
    kytkeVahvistin();
    if (tila.peruttu) return;
    kaynnistaKello();
    ilmoita();
    aikatauluta();
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
       * ensimmäistäkään aikataulutusta jono kelataan pyydetyn
       * kappaleen alkuun.
       */
      if (aloitusKappale > 0 && !tila.kaynnissa && vuorossa === 0) {
        const indeksi = palat.findIndex((p) => p.kappale === aloitusKappale);
        if (indeksi > 0) vuorossa = indeksi;
      }
      if (!tila.kaynnissa) kaynnista();
      else if (!tila.tauolla) aikatauluta();
    },
    paata() {
      if (tila.peruttu || tila.paatetty) return;
      tila.paatetty = true;
      if (!palat.length) loppu();
    },
    pysayta() {
      if (tila.peruttu) return;
      tila.peruttu = true;
      clearInterval(kello);
      kello = null;
      pysaytaLahteet();
    },
    tauko() {
      if (tila.peruttu || tila.tauolla) return;
      tila.tauolla = true;
      // Koko piiri seis: jatko lähtee näytteen tarkkuudella samasta
      // kohdasta, eikä aikatauluun kosketa.
      try { piiri.suspend?.(); } catch { /* piiri oli jo kiinni */ }
      ilmoita();
    },
    jatka() {
      if (tila.peruttu || !tila.tauolla) return;
      tila.tauolla = false;
      try { piiri.resume?.(); } catch { /* resume epäonnistui */ }
      ilmoita();
      aikatauluta();
    },
    tauolla() {
      return tila.tauolla;
    },
    /** Sen hetkinen tila paneelin ensipiirtoa varten. */
    tilanne() {
      const pala = palat[tila.soiva]
        ?? palat[Math.min(vuorossa, palat.length - 1)] ?? null;
      return { tauolla: tila.tauolla, kappale: pala?.kappale ?? 0, kappaleita: tila.kappaleita };
    },
    /**
     * Kappalehyppy: +1 seuraavan kappaleen alkuun, -1 nykyisen
     * kappaleen alkuun (tai edelliseen, jos ollaan jo alussa) —
     * sama logiikka kuin levysoittimen kelauksessa.
     */
    siirryKappale(askel) {
      if (tila.peruttu || !palat.length) return;
      const nykyisenIndeksi = tila.soiva >= 0 ? tila.soiva : Math.min(vuorossa, palat.length - 1);
      const nykyinen = palat[nykyisenIndeksi]?.kappale ?? 0;
      let kohde = nykyinen + (askel > 0 ? 1 : 0);
      if (askel < 0) {
        const alku = palat.findIndex((p) => p.kappale === nykyinen);
        kohde = (tila.soiva === alku && nykyinen > 0) ? nykyinen - 1 : nykyinen;
      }
      const indeksi = palat.findIndex((p) => p.kappale === kohde);
      if (indeksi < 0) return; // kohdekappaletta ei (vielä) ole
      pysaytaLahteet();
      aloitusajat.length = 0;
      vuorossa = indeksi;
      tila.soiva = -1;
      seuraavaAlku = 0;
      if (tila.tauolla) {
        tila.tauolla = false;
        try { piiri.resume?.(); } catch { /* resume epäonnistui */ }
      }
      ilmoita();
      aikatauluta();
    },
  };
}
