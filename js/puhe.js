import { ilmoitaLivianKasvopuhe } from './livia-puhetila.js';
import { luoLivianKuunteluvuoro } from './livia-tilanteet.js';
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

import { PUHEVOIMA_OLETUS, puheVoima } from './aani-ehdokkaat.js';
import { lisaaTaustaVaimennus } from './aani-tausta.js';
import { POLLOPALVELIN } from './packs/pollo-asetukset.js';
import { akustiikka, tehosteketju } from './tehosteketju.js';
import { luoMp3Virta } from './puhevirta.js';

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

/*
 * STRIIMIÄÄNI KEHITTÄJÄVALIKOSSA (omistaja 27.9.2026 klo 01.2x: "Lisää
 * kehittäjä valikkoon äänen valinta xai:n vaihtoehdoista striimille").
 * Worker lukee striimiluennan xAI:n Grok TTS:llä (oletus 'ara', päätös
 * 27.9. klo 00.25); tämä lista on workerin XAI_AANET-taulun NÄYTTÖKOPIO
 * (tools/pollo/worker.js) — tests/puheohjeet.test.mjs valvoo, että ne
 * ovat samat. Valinta tallentuu samaan laitekohtaiseen persoonatauluun
 * kuin työhuoneen säädöt (kaikille kolmelle persoonalle kerralla).
 * 27.9.2026 klo 09.3x (omistaja): valinta on pelaajan — nostokortin
 * säätörattaassa (js/lukija.js), ei enää kehittäjävalikossa — ja worker
 * tottelee listan ääntä ilman kehittäjäkoodia.
 */
export const STRIIMIAANET_XAI = ['altair', 'ara', 'atlas', 'aurora', 'carina', 'castor',
  'celeste', 'cosmo', 'eve', 'helios', 'helix', 'iris', 'kepler', 'leo',
  'liora', 'lumen', 'luna', 'lux', 'naksh', 'orion', 'perseus', 'rex',
  'rigel', 'sal', 'sirius', 'ursa', 'zagan', 'zenith'];
export const STRIIMIAANI_OLETUS = 'ara';

/*
 * ÄÄNTEN PELINIMET (omistaja 27.9.2026 klo 10.2x, sitova): pelaaja näkee
 * vain pelinimen — moottorin äänitunnus pysyy sisäisenä (pyyntö, worker,
 * välimuistiavain). Yksi taulu, tests/lukija.test.mjs valvoo, että
 * jokainen STRIIMIAANET_XAI-ääni on nimetty. Järjestys on valikon järjestys.
 */
export const AANTEN_PELINIMET = {
  ara: 'Aino', aurora: 'Aamu', carina: 'Kerttu', celeste: 'Siiri', eve: 'Helmi',
  iris: 'Ilta', liora: 'Lyyli', luna: 'Vieno', ursa: 'Saima',
  altair: 'Aarne', atlas: 'Antero', castor: 'Kalle', cosmo: 'Kosti', helios: 'Heikki',
  helix: 'Herman', kepler: 'Kaarlo', leo: 'Lauri', lumen: 'Lassi', lux: 'Luukas',
  naksh: 'Niilo', orion: 'Onni', perseus: 'Pekka', rex: 'Reino', rigel: 'Risto',
  sal: 'Sulo', sirius: 'Simo', zagan: 'Sakari', zenith: 'Väinö',
};

/** Äänitunnuksen pelinimi (tuntematon → oletusäänen nimi). */
export function aanenPelinimi(aani) {
  return AANTEN_PELINIMET[aani] ?? AANTEN_PELINIMET[STRIIMIAANI_OLETUS];
}
const STRIIMIN_PERSOONAT = ['kertoja', 'merkinnat', 'pollo'];

/** Kehittäjän valitsema xAI-striimiääni, tai null = workerin oletus (ara). */
export function striimiaani() {
  const aani = luePuheAsetukset()?.pollo?.aani;
  return typeof aani === 'string' && STRIIMIAANET_XAI.includes(aani) ? aani : null;
}

/** Asettaa xAI-striimiäänen kaikille persoonille; null/'' palauttaa oletuksen. */
export function asetaStriimiaani(aani) {
  const valinta = typeof aani === 'string' && STRIIMIAANET_XAI.includes(aani) ? aani : null;
  const asetukset = luePuheAsetukset();
  for (const persoona of STRIIMIN_PERSOONAT) {
    const oma = { ...(asetukset[persoona] ?? {}) };
    if (valinta) oma.aani = valinta;
    else delete oma.aani;
    asetukset[persoona] = oma;
  }
  tallennaPuheAsetukset(asetukset);
  return valinta;
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
 * Yhden pyynnön merkkikatto. Workerin kova raja on 2500
 * (tools/pollo/rajat.js PUHE_TEKSTIN_KATTO); tämä pysyy sen alla,
 * jotta siivousten pyöristykset eivät koskaan leikkaa lausetta kesken.
 *
 * 700 → 950 (omistaja 18.8.2026): luenta kulkee nyt kokonaisina
 * kappaleina (ks. kappaleenPalat), ja katon on siksi katettava
 * mahdollisimman moni kappale yhdellä pyynnöllä — raja on enää
 * workerin kovan rajan vartija, ei palakoon säädin.
 */
/*
 * 950 → 2400 (omistaja 27.9.2026 klo 01.5x): pitkäkin kappale on yksi
 * pala. Palojen väliin ei synny odotusta, koska soitin hakee jo kaksi
 * seuraavaa palaa sillä aikaa kun edellinen soi (aikatauluta: hae +1, +2;
 * mitattu 27.9. xAI:lla — lehtisivun palojen välit 0,45/0,95 s eli vain
 * suunnitellut tauot). Aloituspala katetaan esipuskurilla.
 */
export const PUHE_PALA_KATTO = 2400;

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
// 2,0 on omistajan 21.8.2026 puhelimella hakema taso ("Talleta nämä
// samat asetukset kaikkiin lukijakohtiin") — koskee kaikkia
// persoonia, koska voimakkuus on lukijoiden yhteinen säätö.
const VOIMA_OLETUS = 2.0;
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
  if (taustaTauko) return; // taustalla piiri pysyy nukkumassa
  try {
    if (piiri?.state === 'suspended') piiri.resume?.()?.catch?.(() => {});
  } catch { /* piiri syntyy seuraavasta luennasta */ }
}

/*
 * ── TAUSTALLE MENEVÄ PELI (omistajan tilaus 24.8.2026) ──────────────
 *
 * Sama kova tauko kuin sanelulla, mutta EPÄSYMMETRINEN: piiri
 * nukutetaan taustalle mentäessä, mutta sitä EI herätetä paluussa.
 *
 * Syy on luennan luonteessa. Piirin herättäminen jatkaisi kesken
 * jäänyttä lausetta siitä hiljaisuudesta, johon se katkesi — kukaan ei
 * kuullut lauseen alkua eikä pyytänyt sen loppua. Kesken jäänyt luenta
 * jää siis tauolle (js/lukija.js taustaHiljennaLukija panee soittimen
 * tauolle ja luentasoittimen paneeli näyttää jatkonapin), ja piiri
 * herää vasta siitä, että pelaaja jatkaa tai aloittaa uuden luennan —
 * kummassakin tapauksessa omalla resume-kutsullaan.
 */
let taustaTauko = false;

/** Lukijaäänen piiri nukkumaan, kun peli ei ole päällimmäisenä. */
export function taukoaPuheTaustalle() {
  taustaTauko = true;
  try {
    piiri?.suspend?.()?.catch?.(() => {});
  } catch { /* piiri ei ollut käynnissä */ }
}

/** Peli takaisin etualalle: lippu pois, piiri jää nukkumaan (ks. yllä). */
export function jatkaPuheEtualalla() {
  taustaTauko = false;
}

lisaaTaustaVaimennus({ hiljenna: taukoaPuheTaustalle, palauta: jatkaPuheEtualalla });

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
  paivitaLukijanVoima();
  return voima;
}

/*
 * ── LUKIJA-LIUKU OHJAA MYÖS STRIIMATTUA LUKIJAA ─────────────────────
 *
 * OMISTAJAN VIKAILMOITUS 12.9.2026: *"äänien voimakkuussäädin ei muuten
 * toimi."*
 *
 * MITATTU JUURISYY: asetusvalikon Lukija-liuku (index.html
 * #voima-lukija) kirjoitti vain avaimeen `matkakirja-puhevoima`, jota
 * lukevat pelkät ÄÄNITTEET (js/luenta.js, js/linssipuhe.js, js/ui.js).
 * Tämän moduulin striimattu lukija — pelin ENSISIJAINEN lukija, se joka
 * lukee lehdet ja artikkelit — sai tasonsa yksinomaan työhuoneen omasta
 * kertoimesta (`matkakirja-puhe-voima`, oletus 2,0), eikä liuku koskenut
 * siihen millään asennolla. Pelaajan näkökulmasta "Lukija"-niminen
 * säädin ei siis tehnyt lukijalle mitään.
 *
 * LIUKU ON SUHDE, EI KORVAAJA. Työhuoneen kerroin on kalibrointi
 * (omistajan puhelimellaan hakema 2,0) ja liuku on pelaajan säädin.
 * Kertomalla suhteella (liuku / liu'un oletusasento) OLETUSTASO SÄILYY
 * TÄSMÄLLEEN ENNALLAAN: 90 % antaa kertoimen 1,0, 0 % hiljaisuuden ja
 * 100 % hitusen oletusta enemmän. Suora korvaaminen olisi pudottanut
 * lukijan tason 2,0:sta 0,9:ään eli hiljentänyt pelin lukijan yli
 * puolella — korjaus ei saa kuulua siltä, että jokin muu meni rikki.
 *
 * KATTO ON VAHVISTIMESSA, EI TÄSSÄ: ketjussa on kompressori juuri siksi,
 * että yli yhden nouseva vahvistus ei leikkaisi säröksi.
 */
/** Lukija-liu'un osuus: 1,0 liu'un oletusasennossa. */
const liuunOsuus = () => (PUHEVOIMA_OLETUS > 0 ? puheVoima() / PUHEVOIMA_OLETUS : 1);

/** Vahvistimeen menevä taso: työhuoneen kerroin × Lukija-liuku. */
export function lukijanTaso() {
  return puheenVoima() * liuunOsuus();
}

/**
 * Lukija-liuku liikkui: soiva luenta saa uuden tason heti eikä vasta
 * seuraavasta luennasta (js/main.js AANIVOIMAT). Ilman vahvistinta
 * (äänipiiri ei ole käynnissä) ei ole mitään säädettävää — seuraava
 * viritys lukee arvon itse.
 */
export function paivitaLukijanVoima() {
  if (vahvistin) vahvistin.gain.value = lukijanTaso();
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
/*
 * 1,15 on omistajan 21.8.2026 hakema lukutahti kaikille lukijoille
 * (pöllö, kertoja, merkinnät — nopeus on yhteinen säätö; ensin 1,2,
 * omistajan tarkennus samana iltana: "Muuta nopeus sittenkin
 * 1.15x"). HUOM: poikkeava oletus laajentaa välimuistiavaimet
 * (nopeusTunniste), joten vanhalla 1,0-nopeudella generoidut palat
 * eivät enää osu — puhe generoituu uudelleen ensikuuntelulla.
 */
export const NOPEUS_OLETUS = 1.15;
export const NOPEUS_MIN = 0.6;
export const NOPEUS_MAX = 1.6;

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

/*
 * PUHEPIIRI 24 KHZ:LLÄ (progressiivinen puhe, omistaja 27.9.2026). Puhe
 * tulee mp3:na 24 kHz:llä (xAI ja OpenAI), ja virta dekoodataan
 * segmentteinä (js/puhevirta.js). Segmenttien sauma on bittitarkka vain,
 * kun dekoodaus ei näytteistä: 48 kHz:n piirissä jokainen segmentti
 * näytteistettiin erikseen ja rajoille jäi mitattuna 0,04–0,13:n hyppy.
 * 24 kHz ei hukkaa mitään (lähde on jo 24 kHz). Jos selain ei suostu
 * taajuuteen, piiri syntyy oletuksella ja pala dekoodataan kokonaisena
 * kuten ennen (virtaKaytossa).
 */
export const PUHEPIIRIN_TAAJUUS = 24000;
function luoPiiri(AC) {
  try {
    return new AC({ sampleRate: PUHEPIIRIN_TAAJUUS });
  } catch {
    return new AC();
  }
}

/*
 * Progressiivisen soiton vara-avain: `?puhevirta=0` tai localStorage
 * `matkakirja-puhevirta` = '0' palauttaa kokonaisen palan dekoodauksen
 * (vertailumittaus ja hätävara laitteelle, jolla sauma ei toimi).
 */
export const PUHEVIRTA_AVAIN = 'matkakirja-puhevirta';
function virtaKaytossa() {
  if (!piiri || piiri.sampleRate !== PUHEPIIRIN_TAAJUUS) return false;
  try {
    if (new URLSearchParams(window.location?.search ?? '').get('puhevirta') === '0') return false;
    if (window.localStorage?.getItem(PUHEVIRTA_AVAIN) === '0') return false;
  } catch { /* yksityinen tila */ }
  return true;
}

/** Lukijaäänen analysaattori (VU-mittari), tai null ennen kuin piiri on kytketty. */
let mittari = null;
export function puheMittari() {
  return mittari;
}

/** Kytkee vahvistimen, kun äänipiiri saadaan käyntiin (ele vaaditaan). */
function kytkeVahvistin() {
  if (kytketty || typeof window === 'undefined') return;
  const elementit = haeElementit();
  if (!elementit) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  try {
    piiri = piiri ?? luoPiiri(AC);
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
      vahvistin.gain.value = lukijanTaso();
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
      /*
       * VU-MITTARI (nostokortin luenta, omistaja 27.9.2026 klo 09.3x):
       * analysaattori kompressorin ja kaiuttimien välissä näkee kaiken
       * lukijaäänen juuri sellaisena kuin se kuuluu (js/kaiutinmittari.js).
       */
      try {
        mittari = piiri.createAnalyser();
        mittari.fftSize = 512;
        kompressori.connect(mittari);
        mittari.connect(piiri.destination);
      } catch {
        mittari = null;
        kompressori.connect(piiri.destination);
      }
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
    // Sama koskee taustalla olevaa peliä: taustan napautus (esim.
    // ilmoituksen kuittaus jaetulla näytöllä) ei saa herättää piiriä.
    if (taustaTauko) return;
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

/*
 * LUKIJAMITTARI (Fable 27.9.2026 klo 07.2x: korvakuuntelu ei saa olla
 * ainoa todiste). Viimeisin haettu pala: moottori ja lähde workerin
 * otsakkeista (x-puhe-moottori xai|openai, x-puhe-lahde
 * generoitu|reuna|r2; laitteen oma säilö = 'laite'), ensimmäisen tavun
 * ja koko palan aika millisekunteina pyynnöstä sekä merkkimäärä.
 * Kehittäjävalikko (js/main.js) näyttää sen ja kuuntelee tapahtumaa
 * PUHEMITTARI_TAPAHTUMA. Mittari on pelkkää tietoa — luenta ei lue sitä.
 */
export const PUHEMITTARI_TAPAHTUMA = 'matkakirja-puhemittari';
let puhemittari = null;

/** Viimeisimmän haetun palan mittari tai null. */
export function viimeisinPuhe() {
  return puhemittari;
}

function kirjaaPuhe(tieto) {
  puhemittari = { ...tieto, aika: Date.now() };
  try {
    window.dispatchEvent(new CustomEvent(PUHEMITTARI_TAPAHTUMA, { detail: puhemittari }));
  } catch { /* ei selainta (testit) */ }
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
async function haePala(teksti, persoona, sailio = null, kuulija = null) {
  // Laitekohtaiset säädöt mukaan avaimeen ja pyyntöön: säädetty ääni ei
  // saa soida vanhan äänen välimuistista eikä päinvastoin.
  const saadot = puheenSaadot(persoona);
  const saatoTunniste = `${saadot ? `${saadot.aani ?? ''}|${saadot.ohje ?? ''}` : ''}${nopeusTunniste()}`;
  const avain = `${persoona}|${saatoTunniste}|${teksti}`;
  if (puheMuisti.has(avain)) return puheMuisti.get(avain);
  /*
   * KÄYNNISSÄ OLEVA HAKU JAETAAN (progressiivinen puhe 27.9.2026): jos
   * esipuskuri tai edellinen kutsu hakee jo samaa palaa, uusi kuulija
   * saa tähän asti tulleet tavut heti ja loput sitä mukaa — pala
   * generoidaan kerran eikä soitto odota koko haun loppua.
   */
  const kesken = puheHautKesken.get(avain);
  if (kesken) {
    if (kuulija) {
      for (const o of kesken.osat) kuulija(o);
      kesken.kuulijat.add(kuulija);
    }
    return kesken.lupaus;
  }
  const tila = { osat: [], kuulijat: new Set(kuulija ? [kuulija] : []), lupaus: null };
  tila.lupaus = haePalaVerkosta(teksti, persoona, sailio, saadot, saatoTunniste, avain, tila);
  puheHautKesken.set(avain, tila);
  try {
    return await tila.lupaus;
  } finally {
    puheHautKesken.delete(avain);
  }
}

/** Käynnissä olevat haut avaimittain (ks. haePala). */
const puheHautKesken = new Map();

async function haePalaVerkosta(teksti, persoona, sailio, saadot, saatoTunniste, avain, tila) {

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
          kirjaaPuhe({
            moottori: osuma.headers.get('x-puhe-moottori'), lahde: 'laite', ekaTavuMs: 0, valmisMs: 0, merkkeja: teksti.length,
          });
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
  const alku = performance.now();
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
    const virhe = new Error(`puhe ${vastaus.status}`);
    virhe.status = vastaus.status;
    /*
     * RAJA JA PALVELINVIRHE PYSÄYTTÄVÄT (27.9.2026): 429 (worker: päivä-
     * tai kuukausiraja) ja 5xx eivät saa ohittaa virkettä äänettä eikä
     * pudota laitteen ääneen — luenta pysähtyy ja workerin viesti näkyy
     * kerran (js/lukija.js ilmoitaPuhevirhe).
     */
    virhe.pysayttaa = vastaus.status === 429 || vastaus.status >= 500;
    try {
      virhe.viesti = (await vastaus.json())?.viesti ?? null;
    } catch {
      virhe.viesti = null;
    }
    throw virhe;
  }
  // Kopio talteen rinnalla (klooni luetaan samaan aikaan kuin runko, joten
  // mittarin ensimmäinen tavu on todellinen); täysi levy ei kaada luentaa.
  const talteen = kansio && osoiteAvain
    ? kansio.put(osoiteAvain, vastaus.clone()).catch(() => { /* säilö täynnä tai estetty */ })
    : null;
  // Runko luetaan paloina: ensimmäisen tavun aika mittariin ja palat
  // kuulijoille heti (progressiivinen soitto, js/puhevirta.js).
  const osat = tila.osat;
  const jaa = (o) => {
    osat.push(o);
    for (const k of tila.kuulijat) {
      try { k(o); } catch { /* kuulijan virhe ei kaada hakua */ }
    }
  };
  let ekaTavu = null;
  const lukija = vastaus.body?.getReader?.();
  if (lukija) {
    for (;;) {
      const { done, value } = await lukija.read();
      if (done) break;
      ekaTavu ??= performance.now();
      jaa(value);
    }
  } else {
    jaa(new Uint8Array(await vastaus.arrayBuffer()));
  }
  await talteen;
  const blob = new Blob(osat, { type: vastaus.headers.get('content-type') || 'audio/mpeg' });
  kirjaaPuhe({
    moottori: vastaus.headers.get('x-puhe-moottori'),
    lahde: vastaus.headers.get('x-puhe-lahde'),
    ekaTavuMs: Math.round((ekaTavu ?? performance.now()) - alku),
    valmisMs: Math.round(performance.now() - alku),
    merkkeja: teksti.length,
  });
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
 *   onVirhe?: (vaihe: 'alku'|'kesken', virhe?: Error) => void — virhe.pysayttaa
 *     (429/5xx) ja virhe.viesti (workerin teksti) kertovat rajasta
 *   onTila?: (t: {tauolla: boolean, kappale: number, kappaleita: number,
 *     teksti: string|null, alku: number}) => void,
 *   aloitusKappale?: number ensimmäisenä soitettava kappale (oletus 0)
 *   aloitusAlku?: number merkkikohta aloituskappaleessa: soitto alkaa
 *     palasta, joka sisältää kohdan (keskeytetyn luennan jatko, onTila.alku)
 *   otsikkoKappaleet?: Iterable<number> otsikolla alkavat kappaleet —
 *     niiden edellä pidetään pidempi tauko (OTSIKKOVALI)
 *   yksiPuheenvuoro?: boolean kaikki lisätty teksti on yhtä kappaletta
 *     (Pulun striimivastaus): palojen väliin virkeväli, ei kappaleväliä
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
  aloitusKappale = 0, aloitusAlku = 0, otsikkoKappaleet = null, yksiPuheenvuoro = false,
} = {}) {
  if (!puheTuettu()) return null;
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  try {
    piiri = piiri ?? luoPiiri(AC);
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
  const VIRRAN_ALKUVARA = 0.45; // s — kesken olevan virran aloitusvara (ks. soitaPala)
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
    // Virran myöhästymiset: osa ehti soittovuoroonsa vasta sen jälkeen (mittari).
    katkoja: 0,
    // [pala, osa, valmistui (piirin aika), vuoro, soitettiin] — mittaus.
    virtaloki: [],
  };
  let vuorossa = 0; // seuraavaksi aikataulutettava pala
  let seuraavaAlku = 0; // piirin aika, johon seuraava pala liitetään
  let kello = null;
  let aikataulutus = null;

  /*
   * PUHUJAN AKUSTIIKKA (omistajan päätös 5.9.2026, Tuna: *"Livian ääni
   * luolassa saa luolan kaiun"*). Kohdekortti asettaa tilan
   * (js/tehosteketju.js asetaAkustiikka), ja jokainen pala kysyy sen
   * aikataulutuksessa: kun luolan kortti on auki, palat kulkevat
   * luolaketjun läpi vahvistimeen; kun kortti sulkeutuu, seuraavat palat
   * menevät suoraan ja vanha ketju liukuu kuivaksi 200 ms:ssa (pura).
   * Ilman kirjastoa tehosteketju palauttaa null ja ääni kulkee suoraan
   * kuten ennen — tämä ei muuta luentaa millään laitteella, jolla
   * kirjasto ei lataudu.
   */
  let ketju = null;
  const puraKetju = () => {
    ketju?.pura();
    ketju = null;
  };
  const paate = () => {
    const suora = vahvistin ?? piiri.destination;
    const nimi = akustiikka();
    if (!nimi) {
      puraKetju();
      return suora;
    }
    if (!ketju || ketju.nimi !== nimi) {
      puraKetju();
      ketju = tehosteketju(piiri, nimi, suora);
    }
    return ketju ? ketju.input : suora;
  };

  const kasvoTunnus = {};
  const kuuntelu = persoona === 'pollo' ? null : luoLivianKuunteluvuoro(kasvoTunnus, { lahde: 'lukija' });
  const ilmoitaKasvopuhe = () => {
    const nyt = piiri.currentTime;
    const kay = !tila.peruttu && !tila.tauolla && piiri.state === 'running';
    const i = kay
      ? aloitusajat.findIndex(a => a && nyt >= a.alku && nyt < a.loppu) : -1;
    if (persoona === 'pollo') ilmoitaLivianKasvopuhe(kasvoTunnus, i >= 0, palat[i]?.teksti);
    else if (tila.peruttu) kuuntelu.lopeta();
    else {
      // Suunnitellut virke-/otsikkotauot kuuluvat samaan luentaan.
      // Puskurin loppuminen tai pysähtynyt piiri sen sijaan vapauttaa.
      const eka = aloitusajat.find(Boolean), vika = aloitusajat.findLast(Boolean);
      kuuntelu.paivita(Boolean(kay && eka && nyt >= eka.alku && nyt < vika.loppu),
        nyt, palat[i >= 0 ? i : tila.soiva]?.teksti ?? '');
    }
  };
  const ilmoita = () => {
    ilmoitaKasvopuhe();
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

  /**
   * Äänekkään puheen rajat puskurissa sekunteina: ensimmäinen ja viimeinen
   * 20 ms:n ikkuna, jonka huippu ylittää kynnyksen. Hiljaisella null.
   */
  const aanirajat = (puskuri) => {
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
    return eka < 0 ? { eka: null, vika: null } : { eka: eka / sr, vika: vika / sr };
  };

  /*
   * ODOTUS: virran uusi osa, virran loppu tai ohjaus (hyppy, pysäytys,
   * tauko) herättää aikatauluttajan. Varmuuden vuoksi herätys myös
   * ajastimella, ettei mikään unohtunut kutsu jätä luentaa jumiin.
   */
  const odottajat = new Set();
  const heratys = () => {
    const kaikki = [...odottajat];
    odottajat.clear();
    for (const f of kaikki) f();
  };
  const odota = () => new Promise((valmis) => {
    odottajat.add(valmis);
    setTimeout(() => { odottajat.delete(valmis); valmis(); }, 400);
  });

  /*
   * PALA ON VIRTA (progressiivinen puhe, omistaja 27.9.2026 klo 07.5x:
   * "pala alkaa soida heti kun ensimmäiset tavut tulevat"). hae()
   * käynnistää haun ja dekoodaa mp3:n segmentteinä sitä mukaa kuin
   * tavuja tulee (js/puhevirta.js): v.osat kasvaa, v.valmis kertoo
   * lopun. Välimuistista tuleva pala dekoodataan kokonaisena kuten
   * ennen, samoin kaikki, jos piiri ei ole 24 kHz (virtaKaytossa).
   */
  const hae = (indeksi) => {
    if (indeksi >= palat.length || haut.has(indeksi)) return;
    const v = { osat: [], saapui: [], valmis: false, virhe: null };
    haut.set(indeksi, v);
    const lisaaOsa = (puskuri, alku, pituus) => {
      // Koko puskuri (välimuisti, kokonainen dekoodaus): sellaisenaan.
      if (alku === 0 && pituus === puskuri.length) {
        v.osat.push(puskuri);
        heratys();
        return;
      }
      const kanavia = puskuri.numberOfChannels ?? 1;
      const osa = piiri.createBuffer(kanavia, pituus, puskuri.sampleRate);
      for (let c = 0; c < kanavia; c += 1) {
        osa.copyToChannel(puskuri.getChannelData(c).subarray(alku, alku + pituus), c);
      }
      v.osat.push(osa);
      v.saapui.push(piiri.currentTime);
      heratys();
    };
    const virta = luoMp3Virta({
      dekoodaa: (tavut) => piiri.decodeAudioData(tavut),
      osa: lisaaOsa,
      kokonaan: !virtaKaytossa(),
    });
    (async () => {
      try {
        const osoite = await haePala(palat[indeksi].teksti, persoona, sailio, (o) => virta.lisaa(o));
        if (virta.tavuja()) {
          await virta.loppu();
        } else {
          // Muistista tai laitteen säilöstä: koko pala on jo täällä.
          const raaka = await (await fetch(osoite)).arrayBuffer();
          const puskuri = await piiri.decodeAudioData(raaka);
          lisaaOsa(puskuri, 0, puskuri.length);
        }
      } catch (virhe) {
        v.virhe = virhe;
      }
      v.valmis = true;
      heratys();
    })();
  };

  const loppu = () => {
    if (tila.peruttu) return;
    tila.peruttu = true;
    ilmoitaKasvopuhe();
    clearInterval(kello);
    kello = null;
    puraKetju();
    heratys();
    onLoppu?.();
  };

  const verhot = new Set();
  const pysaytaLahteet = () => {
    for (const lahde of lahteet) {
      try { lahde.onended = null; lahde.stop(); } catch { /* jo pysähtynyt */ }
      try { lahde.disconnect(); } catch { /* jo irti */ }
    }
    lahteet.clear();
    for (const verho of verhot) {
      try { verho.disconnect(); } catch { /* jo irti */ }
    }
    verhot.clear();
    heratys();
  };

  /**
   * Soittaa yhden palan sitä mukaa kuin sen osat valmistuvat.
   *
   * Osat liitetään peräkkäin samalle aikajanalle ilman väliä (sauma on
   * bittitarkka, ks. js/puhevirta.js), alun hiljaisuus jätetään pois ja
   * yksi häivytysverho kattaa koko palan: sisään alussa, ulos puheen
   * viimeisen äänekkään kohdan jälkeen. Palauttaa puheen loppuhetken
   * piirin ajassa, tai 'keskeytyi', jos hyppy, pysäytys tai tauko ennen
   * ensimmäistä ääntä vei vuoron.
   */
  const soitaPala = async (indeksi, v) => {
    const keskeytyi = () => tila.peruttu || vuorossa !== indeksi;
    let i = 0;
    let ohitus = 0;
    for (;;) {
      if (keskeytyi() || tila.tauolla) return 'keskeytyi';
      while (i < v.osat.length) {
        const r = aanirajat(v.osat[i]);
        if (r.eka !== null) {
          ohitus = Math.max(0, r.eka - 0.02);
          break;
        }
        i += 1; // kokonaan hiljainen alkuosa jää soittamatta
      }
      if (i < v.osat.length || v.valmis) break;
      await odota();
    }
    if (v.virhe && !v.osat.length) throw v.virhe;
    // Pelkkää hiljaisuutta (testityngät): soitetaan sellaisenaan.
    const hiljainen = i >= v.osat.length;
    if (hiljainen) {
      i = 0;
      ohitus = 0;
    }
    /*
     * VIRRAN ALKUVARA: kesken oleva virta aloitetaan hieman myöhemmin kuin
     * valmis pala, jotta seuraavat segmentit ehtivät dekoodautua ennen
     * soittovuoroaan (mitattu 27.9.: ilman varaa kaksi 0,5 s:n katkoa alussa, 0,3 s:llä yksi 0,04–0,27 s:n katko joka toisessa ajossa — xAI:n virta tulee purskeina).
     */
    const alkuAika = Math.max(seuraavaAlku, piiri.currentTime + (v.valmis ? 0.08 : VIRRAN_ALKUVARA));
    const verho = piiri.createGain();
    verho.gain.setValueAtTime(0, alkuAika);
    verho.gain.linearRampToValueAtTime(1, alkuAika + HAIVYTYS);
    verho.connect(paate());
    verhot.add(verho);
    aloitusajat[indeksi] = { alku: alkuAika, loppu: Infinity };
    const soitetut = [];
    let kursori = alkuAika;
    let ensimmainen = true;
    let soimassa = 0;
    for (;;) {
      while (i < v.osat.length) {
        const osa = v.osat[i];
        const offset = ensimmainen ? ohitus : 0;
        ensimmainen = false;
        const kesto = osa.duration - offset;
        if (kesto > 0) {
          // Myöhästynyt osa (virta ei ehtinyt): ei soiteta menneisyyteen.
          const aika = Math.max(kursori, piiri.currentTime + 0.02);
          if (aika > kursori + 0.001) tila.katkoja += 1;
          if (tila.virtaloki.length < 60) {
            tila.virtaloki.push([indeksi, i, Number((v.saapui[i] ?? -1).toFixed(3)), Number(kursori.toFixed(3)), Number(aika.toFixed(3))]);
          }
          const lahde = piiri.createBufferSource();
          lahde.buffer = osa;
          lahde.connect(verho);
          lahde.start(aika, offset, kesto);
          soimassa += 1;
          /*
           * KERRAN PER LÄHDE: ended-tapahtuma saapui mitattuna kahdesti
           * samalle lähteelle (Chromium, start kestolla), ja laskuri meni
           * nollaan kesken palan — verho irtosi ja loppu pala oli mykkä
           * (27.9.2026, kuulonäytteessä hiljaisuus 10,7 s:sta alkaen).
           */
          let paattyi = false;
          lahde.onended = () => {
            if (paattyi) return;
            paattyi = true;
            lahteet.delete(lahde);
            soimassa -= 1;
            if (!soimassa && v.valmis) {
              verhot.delete(verho);
              try { verho.disconnect(); } catch { /* jo irti */ }
            }
          };
          lahteet.add(lahde);
          soitetut.push({ aika, osa, offset });
          kursori = aika + kesto;
        }
        i += 1;
      }
      if (v.valmis) break;
      await odota();
      if (keskeytyi()) return 'keskeytyi';
    }
    // Puheen loppu: viimeinen äänekäs kohta osien yli, pieni jousto perään.
    let loppuAika = kursori;
    if (!hiljainen) {
      for (let k = soitetut.length - 1; k >= 0; k -= 1) {
        const { aika, osa, offset } = soitetut[k];
        const r = aanirajat(osa);
        if (r.vika !== null && r.vika > offset) {
          loppuAika = Math.min(kursori, aika + (r.vika - offset) + 0.06);
          break;
        }
      }
    }
    loppuAika = Math.max(loppuAika, alkuAika + 0.05);
    verho.gain.setValueAtTime(1, Math.max(alkuAika + HAIVYTYS, loppuAika - HAIVYTYS));
    verho.gain.linearRampToValueAtTime(0, loppuAika);
    aloitusajat[indeksi] = { alku: alkuAika, loppu: loppuAika };
    return loppuAika;
  };

  /** Liittää palat piirin aikajanalle sitä mukaa kuin ne valmistuvat. */
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
        let loppuAika;
        try {
          loppuAika = await soitaPala(indeksi, haut.get(indeksi));
        } catch (virhe) {
          // Ensimmäisen palan virhe → kutsuja voi valita varapolun
          // koko tekstille; myöhempi virhe päättää luennan siististi.
          const vaihe = tila.soiva < 0 && !lahteet.size ? 'alku' : 'kesken';
          tila.peruttu = true;
          ilmoitaKasvopuhe();
          clearInterval(kello);
          kello = null;
          pysaytaLahteet();
          puraKetju();
          onVirhe?.(vaihe, virhe);
          return;
        }
        if (loppuAika === 'keskeytyi') return;
        const sama = palat[indeksi + 1]?.kappale === palat[indeksi].kappale;
        const vali = sama ? VIRKEVALI
          : (otsikolliset.has(palat[indeksi + 1]?.kappale) ? OTSIKKOVALI : KAPPALEVALI);
        seuraavaAlku = loppuAika + vali;
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
      ilmoitaKasvopuhe();
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
      /*
       * YKSI VASTAUS ON YKSI PUHEENVUORO (Fable 27.9.2026 klo 07.4x):
       * striimi tuo Pulun vastauksen virke kerrallaan, ja jokainen lisäys
       * oli oma kappaleensa → 450 ms kappaleväli joka virkkeen välissä.
       * Puheenvuorossa kaikki on samaa kappaletta, joten väli on 220 ms.
       */
      if (yksiPuheenvuoro && tila.kappaleita > 0) {
        for (const pala of kappaleenPalat(rivi)) uudet.push({ ...pala, kappale: 0 });
        continue;
      }
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
      if ((aloitusKappale > 0 || aloitusAlku > 0) && !tila.kaynnissa && vuorossa === 0) {
        let indeksi = palat.findIndex((p) => p.kappale === aloitusKappale);
        /*
         * JATKO SAMASTA KOHDASTA (omistaja 27.9.2026 klo 09.3x): keskeytetty
         * luenta jatkuu siitä palasta, jonka alku on viimeksi kuullussa
         * kohdassa — ei kappaleen alusta.
         */
        for (let i = indeksi; i >= 0 && i < palat.length && palat[i].kappale === aloitusKappale; i += 1) {
          if (palat[i].alku <= aloitusAlku) indeksi = i;
        }
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
      ilmoitaKasvopuhe();
      clearInterval(kello);
      kello = null;
      pysaytaLahteet();
      puraKetju();
    },
    tauko() {
      if (tila.peruttu || tila.tauolla) return;
      tila.tauolla = true;
      // Koko piiri seis: jatko lähtee näytteen tarkkuudella samasta
      // kohdasta, eikä aikatauluun kosketa.
      try { piiri.suspend?.(); } catch { /* piiri oli jo kiinni */ }
      ilmoita();
      heratys();
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
    /** Progressiivisen soiton mittari: virran myöhästymiset. */
    mittari() {
      return { katkoja: tila.katkoja, virta: virtaKaytossa(), loki: tila.virtaloki.slice() };
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
