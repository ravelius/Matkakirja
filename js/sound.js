// Peliäänet syntetisoituna Web Audio API:lla — ei äänitiedostoja, joten peli
// pysyy kevyenä ja toimii myös offline.
//
// Selaimet vaativat käyttäjän eleen ennen äänen toistoa, joten AudioContext
// luodaan vasta ensimmäisen napautuksen yhteydessä.

/*
 * Äänivalinnan avain on pelin omalla nimellä. Vanha avain luetaan yhä
 * kerran, jottei kukaan saa ääniä yllättäen päälle päivityksen jälkeen.
 */
const STORAGE_KEY = 'matkakirja-aani';
const VANHA_STORAGE_KEY = 'afrikan-tahti-sound';

import { valittuAani, jaaAlku } from './aani-ehdokkaat.js';
import { lisaaTaustaVaimennus } from './aani-tausta.js';
import { haeAani } from './media.js';

// Ambienssin ristihäivytys ja tapahtumien väli. Väli on tarkoituksella pitkä
// ja epäsäännöllinen: säännöllinen ääni alkaa kuulua kellona.
const AMBIENCE_FADE = 2;
const AMBIENCE_EVENT_MIN = 8000;
const AMBIENCE_EVENT_MAX = 30000;

/*
 * ── MITKÄ TEHOSTEET SOIVAT ───────────────────────────────────────────
 *
 * Kaikki. Sen takia tässä ei ole listaa eikä porttia.
 *
 * Historia kannattaa tietää, koska se on käynyt kummallakin puolella:
 *
 *  - v293 (5.8.2026) omistaja vaiensi tehosteet kolmea lukuun
 *    ottamatta: *"Kytke pois kaikki syntetisoidut tehosteäänet, kun
 *    näppäimiä painetaan ja kaikki muutkin. Lentokoneen ääni voi jäädä
 *    … paitsi nopanheiton ääni."* Toteutus oli sallittu lista
 *    (SALLITUT_TEHOSTEET), jotta paluu olisi helppo.
 *  - v340 (7.8.2026) omistaja pyysi ne takaisin: *"Palauta pelin
 *    tehosteäänet."* Lista poistui kokonaan — puolityhjä portti olisi
 *    jäänyt houkuttelemaan arvailuun siitä, mikä on tarkoituksellisesti
 *    hiljaa ja mikä vahingossa.
 *
 * Se, että ratkaisu oli kytkin eikä koodin poisto, maksoi itsensä
 * takaisin: paluu oli kahden rivin poisto eikä satojen rivien
 * uudelleenkirjoitus.
 *
 * Äänet valitaan nyt kahdesta paikasta: soita/vaienna koko peli
 * asetuksista (setEnabled), ja yksittäisen tehosteen äänite valitaan
 * viritysivulta (/aanet.html, valittuAani). Tyhjä valinta jättää
 * syntetisoidun version voimaan.
 *
 * TÄMÄ EI KOSKE muita äänijärjestelmiä: kaupunkien äänimaisema
 * (js/ambience-stream.js), kertojan luennat, visamusiikki ja radio
 * kulkevat omia reittejään eivätkä play():n kautta.
 */

/*
 * ── PELIN ÄÄNET MEDIAKANAVAAN ────────────────────────────────────────
 *
 * OMISTAJAN BUGIRAPORTIT:
 *  - 22.8.2026 aamu (iPad, Safari): "Peli ei kunnioita laitteen
 *    äänenvoimakkuus säädintä." → v1007 asetti
 *    navigator.audioSession.type = 'playback'.
 *  - 22.8.2026 ilta (iPad, v1007 asennettuna): "Pelin pitäisi totella
 *    aina tuota äänisäädintä. Nyt ääntä pystyi muuttamaan iPadin
 *    napeista mutta tuo säädin pysyi paikallaan vaikka äänentaso
 *    muuttui." Ohjauskeskuksen mediasäädin ei siis liikkunut pelin
 *    mukana: peli ei ollut siinä kanavassa, jota säädin näyttää.
 *    v1007 EI riittänyt.
 *
 * MITÄ iOS OIKEASTI TEKEE. Prosessilla on tasan YKSI AVAudioSession,
 * ja sen luokka ratkaisee kaiken: mediakanava (MediaPlayback) seuraa
 * Ohjauskeskuksen mediasäädintä ja sen mykistystä, Ambient roikkuu
 * soittoäänessä ja hiljaisuuskytkimessä. Luokan valitsee WebKit itse,
 * ja valintasääntö on luettavissa lähteestä
 * (Source/WebCore/platform/audio/cocoa/MediaSessionManagerCocoa.mm,
 * updateSessionState):
 *
 *     ... else if (hasAudibleVideoMediaType)  category = MediaPlayback;
 *     else if (hasAudibleAudioOrVideoMediaType) category = MediaPlayback;
 *     else if (webAudioCount)                category = AmbientSound;
 *
 * Eli: KUULUVA <audio>- tai <video>-elementti nostaa koko prosessin
 * mediakanavaan; pelkkä WebAudio putoaa Ambientiin. Juuri siksi pelin
 * äänimaisema (js/ambience-stream.js) näkyi omistajan kuvakaappauksessa
 * Ohjauskeskuksen "Nyt toistetaan" -ikkunassa, mutta tehosteet (tämä
 * moduuli) ja lukijaäänen puskurit (js/puhe.js) eivät totelleet
 * mediasäädintä.
 *
 * MIKSI v1007 EI RIITTÄNYT. navigator.audioSession.type on oikea ja
 * standardinmukainen tapa ohittaa tuo päättely (WebKit
 * Modules/audiosession/DOMAudioSession.cpp: setType → AudioSession::
 * setCategoryOverride(MediaPlayback)), mutta se on yksi ainoa,
 * kokeellinen ja vain Safarin polku, jolla on lähdekoodista näkyviä
 * hiljaisia epäonnistumistapoja:
 *  - setType palaa ÄÄNETTÖMÄSTI (ei poikkeusta, ei vaikutusta), jos
 *    dokumentin mikrofonin permissions-policy ei ole päällä;
 *  - override on prosessinlaajuinen singleton, jonka WebKit itse voi
 *    nollata (MediaSessionManagerInterface: setCategoryOverride(None)),
 *    ja jonka pelin oma sanelutauko käy välillä 'auto'-tilassa;
 *  - vanhemmassa Safarissa navigator.audioSessionia ei ole lainkaan,
 *    jolloin koko v1007 oli tyhjä käsky.
 * Yhdelläkään näistä ei ole selainpuolelta havaittavaa merkkiä, joten
 * pelkän tyypin varaan ei voi jäädä.
 *
 * KORJAUS: MEDIAKANAVAN ANKKURI. Peli pitää soimassa yhtä hiljaista
 * <audio>-silmukkaa aina kun se voi tuottaa ääntä. WebKit laskee
 * elementin kuuluvaksi ILMAN näytteiden tarkastelua
 * (HTMLMediaElement.h: isAudible() = canProduceAudio(), ja
 * computeCanProduceAudio() katsoo vain ääniraitaa, volumea ja
 * mykistystä), joten digitaalinen hiljaisuus riittää: luokaksi tulee
 * MediaPlayback. Ja koska sessio on prosessikohtainen, sama luokka
 * koskee SAMALLA kaikkea muutakin pelin ääntä — tehosteita, lukijan
 * puskureita, äänimaisemaa ja radiota. Yksi ankkuri, kaikki äänet.
 *
 * Tämä on sama mekanismi, jolla jokainen videopalvelu iOS:ssä toimii,
 * ei kokeellinen rajapinta. audioSession.type jätetään paikalleen
 * rinnalle: siellä missä se toimii, se on täsmällisempi ja nopeampi.
 * Kaksi riippumatonta polkua samaan lopputulokseen.
 *
 * HYLÄTTY VAIHTOEHTO: WebAudion reititys mediakanavaan
 * MediaStreamAudioDestinationNodella ja <audio srcObject>:lla. Se ei
 * tekisi luokalle mitään, mitä hiljainen ankkuri ei jo tee (kummassakin
 * kyse on kuuluvasta mediaelementistä), mutta se veisi KAIKEN pelin
 * äänen sillan läpi — ja juuri se silta on iOS:n Safarissa tunnetusti
 * mykkä (WebAudio/web-audio-api#1722, #2293). Nollahyöty, koko äänen
 * menettämisen riski.
 *
 * HINTA, JOKA MAKSETAAN TIETOISESTI: mediakanava ei tottele
 * hiljaisuuskytkintä (sama valinta kuin videotoistossa), ja se on
 * yksinoikeusluokka, joka keskeyttää muiden sovellusten toiston.
 * Siksi KUMPIKAAN puoli ei lähde sivun latauksesta vaan vasta
 * käyttäjän eleestä (ks. eleNahty alla) — autoplay-säännöt pysyvät
 * ennallaan eikä pelkkä sivun avaaminen katkaise pelaajan musiikkia.
 * Pelin oma äänivalinta (setEnabled) vaientaa pelin entiseen tapaan.
 *
 * Muissa selaimissa ja testitynkien alla molemmat polut ovat pelkkiä
 * ei-operaatioita: navigator.audioSessionia ei ole eikä window.Audiota
 * välttämättä ole. Mitään ei kaadu eikä kirjoiteta konsoliin.
 */
let aaniIstunnonLuokka = null;

/*
 * Sanelun aikana mediakanavaa ei pidetä yllä: mikrofoni tarvitsee
 * session itselleen (ks. taukoaKonteksti). Lippu on moduulitasolla,
 * koska myös eleen kuuntelija tarvitsee sen.
 */
let saneluKaynnissa = false;

/*
 * Sama lippu taustalle siirtyneelle pelille (js/aani-tausta.js).
 * Mediakanavaa ei oteta eikä ankkuria herätetä taustalla: hiljainenkin
 * silmukka pitäisi sovelluksen "toistavana" Ohjauskeskuksen silmissä ja
 * estäisi toista sovellusta saamasta ääntä itselleen.
 */
let taustalla = false;

/** Asettaa äänisession luokan; palauttaa true jos se muuttui. */
function asetaAaniIstunto(tyyppi) {
  if (aaniIstunnonLuokka === tyyppi) return false;
  if (typeof navigator === 'undefined' || !navigator) return false;
  if (!('audioSession' in navigator) || !navigator.audioSession) return false;
  try {
    navigator.audioSession.type = tyyppi;
    aaniIstunnonLuokka = tyyppi;
    return true;
  } catch {
    // Vanha tai osittainen toteutus: peli soi entiseen tapaan.
    return false;
  }
}

/*
 * MIKSI 'playback' eikä jokin muu tyyppi:
 *  - 'ambient' on täsmälleen se rikkinäinen nykytila, jonka 'auto'
 *    pelkälle WebAudio-sivulle valitsee. Se ei korjaisi mitään.
 *  - 'transient' ja 'transient-solo' ovat ilmoitusäänille ja lyhyille
 *    ohjeille: ne duckaavat tai keskeyttävät muut äänet joka kerta.
 *    Peli soittaa minuuttikaupalla luentaa ja äänimaisemaa.
 *  - 'play-and-record' kuuluu mikrofonille — ks. sanelun tauko alla.
 */
const ISTUNNON_LUOKKA = 'playback';

/*
 * Ankkurin lähde tehdään koodissa: 0,5 s 8-bittistä hiljaisuutta
 * 8 kHz:llä on 4 kt dataa eikä vaadi verkkoa, service workeria eikä
 * tiedostoa repossa. Ääniraidan PITÄÄ olla oikea (ei nollan mittainen
 * data-lohko kuten js/puhe.js:n virityswav): WebKit lukee raidan
 * olemassaolon, ei näytteitä.
 */
let ankkurinLahde = null;

function hiljainenLahde() {
  if (ankkurinLahde !== null) return ankkurinLahde;
  if (typeof btoa !== 'function') {
    ankkurinLahde = '';
    return ankkurinLahde;
  }
  const taajuus = 8000;
  const naytteita = taajuus / 2;
  const tavut = new Uint8Array(44 + naytteita);
  const nakyma = new DataView(tavut.buffer);
  const teksti = (kohta, arvo) => {
    for (let i = 0; i < arvo.length; i += 1) tavut[kohta + i] = arvo.charCodeAt(i);
  };
  teksti(0, 'RIFF');
  nakyma.setUint32(4, 36 + naytteita, true);
  teksti(8, 'WAVEfmt ');
  nakyma.setUint32(16, 16, true); // fmt-lohkon koko
  nakyma.setUint16(20, 1, true); // pakkaamaton PCM
  nakyma.setUint16(22, 1, true); // mono
  nakyma.setUint32(24, taajuus, true);
  nakyma.setUint32(28, taajuus, true); // tavua sekunnissa
  nakyma.setUint16(32, 1, true); // lohkon tasaus
  nakyma.setUint16(34, 8, true); // bittiä näytteessä
  teksti(36, 'data');
  nakyma.setUint32(40, naytteita, true);
  tavut.fill(128, 44); // 8-bittisen näytteen nollataso on 128
  let merkit = '';
  for (let i = 0; i < tavut.length; i += 1) merkit += String.fromCharCode(tavut[i]);
  ankkurinLahde = `data:audio/wav;base64,${btoa(merkit)}`;
  return ankkurinLahde;
}

/*
 * null = ei vielä yritetty, false = ei saatavilla (ei window.Audiota),
 * muu = elementti. Yritys tehdään tasan kerran.
 */
let ankkuri = null;

function haeAnkkuri() {
  if (ankkuri !== null) return ankkuri;
  ankkuri = false;
  if (typeof window === 'undefined' || typeof window.Audio !== 'function') return ankkuri;
  const lahde = hiljainenLahde();
  if (!lahde) return ankkuri;
  try {
    const soitin = new window.Audio();
    soitin.src = lahde;
    soitin.loop = true;
    soitin.preload = 'auto';
    // Volume ja mykistys ovat ainoat asiat, joita WebKit kuuluvuudesta
    // katsoo — kumpaakaan ei saa säätää pois.
    soitin.volume = 1;
    soitin.muted = false;
    // playsinline pitää iOS:n avaamasta omaa soitinta; airplay-kielto
    // pitää hiljaisuuden pois AirPlay-valikosta.
    soitin.setAttribute?.('playsinline', '');
    soitin.setAttribute?.('x-webkit-airplay', 'deny');
    ankkuri = soitin;
  } catch {
    ankkuri = false;
  }
  return ankkuri;
}

/** Käynnistää mediakanavan ankkurin, jos se ei jo soi. */
function soitaAnkkuri() {
  if (saneluKaynnissa) return false;
  const soitin = haeAnkkuri();
  if (!soitin || soitin.paused === false) return false;
  try {
    soitin.play?.()?.catch?.(() => {
      /* Ele puuttui tai laite kieltäytyi: seuraava ele yrittää uudestaan. */
    });
  } catch {
    return false;
  }
  return true;
}

/** Pysäyttää ankkurin (sanelu tarvitsee session mikrofonille). */
function pysaytaAnkkuri() {
  const soitin = ankkuri;
  if (!soitin) return;
  try {
    soitin.pause?.();
  } catch {
    /* elementti oli jo pysähtynyt */
  }
}

/*
 * MEDIAKANAVAA EI OTETA ENNEN KÄYTTÄJÄN ELETTÄ. Mediakanava on
 * yksinoikeusluokka: sen ottaminen katkaisee pelaajan oman musiikin.
 * ensureContext ajetaan kuitenkin jo sivun latauksessa (js/ui.js
 * syncAmbience → js/ambience-stream.js liitaKompressori), joten
 * v1007:n lupaus "vasta eleestä" ei pitänyt: luokka asetettiin
 * latauksessa. Tämä lippu palauttaa lupauksen. Ankkuri ei olisi
 * lähtenytkään soimaan (autoplay-esto), mutta luokka olisi.
 */
let eleNahty = false;

/**
 * Varmistaa, että pelin äänet ovat mediakanavassa — eli että
 * Ohjauskeskuksen äänisäädin, sen mykistys ja kyljen napit hallitsevat
 * peliä (ks. selitys yllä). Turvallinen kutsua joka eleestä: luokka
 * asetetaan kerran ja soiva ankkuri jätetään rauhaan.
 */
export function varmistaAaniIstunto() {
  if (saneluKaynnissa || taustalla || !eleNahty) return false;
  const muuttui = asetaAaniIstunto(ISTUNNON_LUOKKA);
  soitaAnkkuri();
  return muuttui;
}

/*
 * Mediakanava varmistetaan JOKAISESTA eleestä, ei pelkästään tämän
 * moduulin kontekstista. Kolme syytä:
 *  - Ele on se hetki, josta lähtien mediakanavan saa ottaa (ks. yllä).
 *  - Kaikki äänipolut eivät kulje täältä: lukijan oma WebAudio-piiri
 *    (js/puhe.js) ja <audio>-luennat syntyvät omissa moduuleissaan.
 *    Yksi kuuntelija kattaa ne kaikki, eikä yhdenkään moduulin tarvitse
 *    tietää mediakanavasta mitään (sama viritysmalli kuin js/puhe.js:n
 *    virita()).
 *  - Ankkuri voi pysähtyä ilman että peli tietää: Ohjauskeskuksen
 *    tauko, puhelu tai muu keskeytys. Kertaluonteinen kuuntelija
 *    (v1007:n once) ei olisi silloin herättänyt sitä enää koskaan.
 * Kuuntelija on halpa: jos luokka on jo asetettu ja ankkuri soi, se
 * palaa heti. Kaappausvaiheessa se ehtii ennen sovelluksen omia
 * käsittelijöitä, joten eleessä alkava ääni ehtii mediakanavaan.
 */
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  const ele = () => {
    eleNahty = true;
    varmistaAaniIstunto();
  };
  for (const nimi of ['pointerdown', 'keydown']) {
    document.addEventListener(nimi, ele, { capture: true, passive: true });
  }
}

/**
 * Tapahtuma, jonka setEnabled lähettää documentille: detail.enabled
 * kertoo uuden valinnan. Kuuntelija on js/lukija.js:ssä — mykistys
 * pysäyttää soivan luennan (omistajan bugiraportti 22.8.2026).
 */
export const AANIVALINTA_TAPAHTUMA = 'matkakirja-aanivalinta';

function ilmoitaAaniValinta(enabled) {
  if (typeof document === 'undefined' || typeof document.dispatchEvent !== 'function') return;
  if (typeof CustomEvent !== 'function') return;
  try {
    document.dispatchEvent(new CustomEvent(AANIVALINTA_TAPAHTUMA, { detail: { enabled } }));
  } catch {
    /* tapahtumaa ei voitu lähettää — valinta on silti voimassa */
  }
}

class Sound {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.noise = null;
    this.ambience = null;
    this.ambienceType = null;
    // Väistökerroin syntetisoidulle äänimaisemalle. Nauhoitetulla
    // taustalla on oma vastaava (js/ambience-stream.js), ja ne ajetaan
    // yhdessä: aiemmin vain nauhoitettu väistyi, ja syntetisoitu jäi
    // soimaan täydellä voimalla näytteen ja kertojan päälle (omistajan
    // havainto: "Kuuntele kieltä kohdassa muut äänet voisi vaimentaa").
    this.ambienssiVaisto = 1;
    /*
     * Kova tauko, kun peli ei ole päällimmäisenä (js/aani-tausta.js).
     * Erillään sanelun tauosta, koska ne voivat olla voimassa
     * yhtä aikaa: sanelu voi jäädä kesken juuri siihen, että pelaaja
     * vaihtaa sovellusta. Kumpi tahansa lipuista pitää kontekstin
     * nukkumassa, ja vain oma jatkonsa nostaa oman lippunsa.
     */
    this.taustaTauko = false;
    this.enabled = this.loadSetting();
  }

  loadSetting() {
    try {
      const arvo = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(VANHA_STORAGE_KEY);
      return arvo !== 'off';
    } catch {
      return true;
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
    } catch {
      /* tallennus ei ole välttämätöntä */
    }
    if (enabled) this.play('click');
    else this.setAmbience(null);
    /*
     * Tieto valinnasta ulos tapahtumana (omistajan bugiraportti
     * 22.8.2026, ks. js/lukija.js aanetPaalla). Näin jo soiva luenta
     * hiljenee mykistyksestä ilman että jokainen mykistyksen kytkevä
     * paikka muistaa pysäyttää sen erikseen — eikä tämän moduulin
     * tarvitse tuntea lukijaa (tuonti tänne olisi kehä).
     */
    ilmoitaAaniValinta(enabled);
  }

  /**
   * Luo äänikontekstin ensimmäisellä kerralla ja herättää sen tarvittaessa.
   *
   * `pakota` OHITTAA PELIN OMAN ÄÄNIVALINNAN, ja sille on tasan yksi
   * käyttötarkoitus: ääni, joka EI ole pelin ääni.
   *
   * Maailmanradion suora lähetys soi <audio>-elementistä eikä kysy tätä
   * luokkaa mitään — se kuuluu siis silloinkin, kun pelaaja on sammuttanut
   * pelin äänet. Viritysääni sen sijaan kulkee tämän kontekstin läpi, ja
   * ilman pakotusta se jäi ainoana pois: laite soitti aseman mutta ei sitä
   * kohinaa, josta asema ristihäivytetään, eikä VU-mittarilla ollut
   * kontekstia jota lukea. MITATTU 4.8.2026 (js/linssit/radio.js): kun
   * `enabled` oli false, viritysäänen gain ei syntynyt lainkaan ja neula
   * makasi lepokulmassaan koko lähetyksen ajan.
   *
   * Radio on laite, jonka pelaaja on itse kytkenyt päälle. Sen omat äänet
   * seuraavat radion virtakytkintä, eivät kertojavalikkoa — ja koska
   * lähetys kuuluu joka tapauksessa, kohinan vaientaminen ei ollut
   * hiljaisuutta vaan puolikas laite.
   *
   * TÄMÄ EI SOITA MITÄÄN. Konteksti on pelkkä putki; mitä sen läpi menee,
   * päättää kutsuja. Pelin omat tehosteet (play, ambience, kertoja)
   * kysyvät `enabled`-lippua erikseen eivätkä muutu tästä.
   */
  ensureContext({ pakota = false } = {}) {
    /*
     * Mediakanava kuntoon ENNEN enabled-porttia (omistajan
     * bugiraportit 22.8.2026, ks. varmistaAaniIstunto yllä): kertoja,
     * äänimaisema ja radio soivat myös silloin, kun pelin omat
     * tehosteet on vaiennettu, ja Ohjauskeskuksen säädin koskee
     * niitäkin. Sanelun aikana ei kosketa — silloin sessio kuuluu
     * mikrofonille.
     */
    if (!this.saneluTauko && !this.taustaTauko) varmistaAaniIstunto();
    if (!this.enabled && !pakota) return null;
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      this.ctx = new Ctx();

      // Masteriketju: kaikki äänet → kompressori → ulos. Kompressori pitää
      // päällekkäiset äänet kasassa ilman että kokonaisvoimakkuus nousee.
      // Hillitty kokonaistaso: syntetisoitu ääni antaa anteeksi paljon
      // enemmän hiljaisena kuin kovana.
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.24;
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -20;
      comp.knee.value = 26;
      comp.ratio.value = 3;
      comp.attack.value = 0.006;
      comp.release.value = 0.22;
      this.master.connect(comp).connect(this.ctx.destination);

      // Tila: pieni generoitu kaiku, jonka läpi kaikki äänet kulkevat
      // rinnakkain kuivan signaalin kanssa. Tämä on suurin yksittäinen
      // parannus — ilman sitä äänet kuulostavat siltä, että ne syntyvät
      // korvan sisällä eivätkä huoneessa.
      this.dry = this.ctx.createGain();
      this.dry.gain.value = 0.82;
      this.wet = this.ctx.createGain();
      this.wet.gain.value = 0.18;
      this.reverb = this.ctx.createConvolver();
      this.reverb.buffer = this.makeImpulse(1.2);
      this.dry.connect(this.master);
      this.wet.connect(this.reverb).connect(this.master);
      // Äänet kytketään tähän: se haaroittaa kuivaan ja märkään.
      this.bus = this.ctx.createGain();
      this.bus.connect(this.dry);
      this.bus.connect(this.wet);

      // Yhden sekunnin valkoinen kohina, jota käytetään uudelleen kaikissa äänissä.
      const frames = this.ctx.sampleRate;
      this.noise = this.ctx.createBuffer(1, frames, this.ctx.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;

      // Oikeat äänitteet (noppa, kynä) latautuvat taustalla.
      this.loadRealSamples();
    }
    if (!this.saneluTauko && !this.taustaTauko && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /*
   * SANELUN KOVA TAUKO (omistajan havainto 13.8.2026): iOS:n WebKit ei
   * aloita mikrofonin kaappausta, jos sivun WebAudio-konteksti on
   * käynnissä. Lippu estää myös ensure():n automaattisen resumen —
   * muuten yksikin tehoste herättäisi kontekstin kesken kaappauksen.
   */
  taukoaKonteksti() {
    this.saneluTauko = true;
    saneluKaynnissa = true;
    /*
     * Mediakanava puretaan sanelun ajaksi (22.8.2026). Kumpikin osa on
     * pakko purkaa, ja samasta syystä: mikrofoni ei lähde käyntiin,
     * jos sivu pitää äänisessiota toistossa.
     *  - Luokka takaisin selaimen omaan päättelyyn ('auto'). Playback
     *    ei ole äänitysluokka: lukkoon jätettynä WebKit ei saisi
     *    siirtää sessiota mikrofonille.
     *  - Ankkuri kiinni. Soiva mediaelementti on juuri se este, jonka
     *    takia äänimaisemakin pysäytetään oikeasti sanelun ajaksi
     *    (js/ambience-stream.js taukoaSanelunAjaksi).
     * jatkaKonteksti nostaa molemmat takaisin heti sanelun jälkeen.
     */
    asetaAaniIstunto('auto');
    pysaytaAnkkuri();
    try {
      this.ctx?.suspend?.().catch?.(() => {});
    } catch {
      /* konteksti ei ollut käynnissä */
    }
  }

  jatkaKonteksti() {
    this.saneluTauko = false;
    saneluKaynnissa = false;
    // Mediakanava takaisin, jotta Ohjauskeskuksen säädin ja kyljen
    // napit hallitsevat taas peliä.
    varmistaAaniIstunto();
    // Taustalla oleva peli pysyy hiljaa, vaikka sanelu päättyisi juuri
    // siihen: taustavahdin oma jatko herättää kontekstin (jatkaEtualalle).
    if (this.taustaTauko) return;
    try {
      if (this.ctx?.state === 'suspended') this.ctx.resume().catch(() => {});
    } catch {
      /* konteksti syntyy seuraavasta äänestä */
    }
  }

  /*
   * ── TAUSTALLE MENEVÄ PELI (omistajan tilaus 24.8.2026) ────────────
   *
   * Sama kaksikko kuin sanelun tauolla, mutta eri syystä: sanelu
   * tarvitsee äänisession mikrofonille, tausta ei tarvitse sitä
   * kenellekään. Molemmat purkavat mediakanavan (ankkuri kiinni,
   * luokka takaisin selaimen omaan päättelyyn) ja nukuttavat
   * kontekstin — mediakanava on prosessikohtainen, ja taustalle jäänyt
   * peli pitäisi sen turhaan itsellään toisten sovellusten tieltä.
   *
   * Tehosteet eivät myöskään SYNNY taustalla (ks. play). Pysäytetyssä
   * kontekstissa aikataulutus jäätyy: minuutin taustalla kertyneet
   * tehosteet purskahtaisivat kaikki yhtä aikaa paluuhetkellä.
   */
  taukoaTaustalle() {
    if (this.taustaTauko) return;
    this.taustaTauko = true;
    taustalla = true;
    asetaAaniIstunto('auto');
    pysaytaAnkkuri();
    try {
      this.ctx?.suspend?.().catch?.(() => {});
    } catch {
      /* konteksti ei ollut käynnissä */
    }
  }

  jatkaEtualalle() {
    if (!this.taustaTauko) return;
    this.taustaTauko = false;
    taustalla = false;
    // Sanelu jatkuu omasta jatkostaan: se pitää sekä mediakanavan että
    // kontekstin kiinni niin kauan kuin mikrofoni on käytössä.
    if (this.saneluTauko) return;
    varmistaAaniIstunto();
    try {
      if (this.ctx?.state === 'suspended') this.ctx.resume().catch(() => {});
    } catch {
      /* konteksti syntyy seuraavasta äänestä */
    }
  }

  /**
   * Kaiun impulssivaste: eksponentiaalisesti vaimeneva kohinapulssi.
   * Ei äänitiedostoa, joten standalone ja offline pysyvät kevyinä.
   */
  makeImpulse(seconds) {
    const rate = this.ctx.sampleRate;
    const frames = Math.floor(rate * seconds);
    const buf = this.ctx.createBuffer(2, frames, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buf.getChannelData(ch);
      for (let i = 0; i < frames; i++) {
        // Loppuosa vaimenee jyrkemmin, jotta häntä ei jää soimaan.
        const vaimennus = (1 - i / frames) ** 3.2;
        data[i] = (Math.random() * 2 - 1) * vaimennus;
      }
    }
    return buf;
  }

  /**
   * Pieni satunnaisheitto vireeseen ja voimakkuuteen. Ilman tätä sama ääni
   * kymmenennellä kerralla alkaa kuulostaa koneelta. Math.random käy: äänet
   * eivät ole pelitilaa eivätkä vaikuta tallennukseen.
   */
  jitter(arvo, osuus = 0.03) {
    return arvo * (1 + (Math.random() * 2 - 1) * osuus);
  }

  // --- perusäänet ---------------------------------------------------------

  tone({ freq = 440, to = null, dur = 0.2, type = 'sine', gain = 0.2, attack = 0.006, delay = 0 }) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    const f0 = this.jitter(freq);
    osc.frequency.setValueAtTime(f0, t0);
    if (to) osc.frequency.exponentialRampToValueAtTime(Math.max(this.jitter(to), 20), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(this.jitter(gain), t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(this.bus);
    osc.start(t0);
    osc.stop(t0 + dur + 0.06);
  }

  hiss({
    dur = 0.2, gain = 0.15, type = 'bandpass', freq = 1200, sweepTo = null, q = 1, delay = 0,
  }) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.Q.value = q;
    filter.frequency.setValueAtTime(this.jitter(freq), t0);
    if (sweepTo) filter.frequency.exponentialRampToValueAtTime(Math.max(sweepTo, 40), t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(this.jitter(gain), t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter).connect(g).connect(this.bus);
    src.start(t0);
    src.stop(t0 + dur + 0.06);
  }


  /*
   * KIERRÄTETTY SUHINAKANAVA tiheään toistuville äänille (naputus).
   * hiss() luo kolme Web Audio -solmua joka kutsulla, ja kirjoituskoneen
   * naputus kutsuu sitä jokaisella sanalla — CPU-profiilissa ~19 %
   * ajasta meni roskienkeruuseen aloituslennon aikana (mittaus
   * 25.8.2026, omistajan "vähän tökkivä" -havainnon juurisyy). Tämä
   * kanava rakentaa lähde→suodatin→voimakkuus-ketjun KERRAN ja soittaa
   * lyönnit säätämällä vain suodatinta ja voimakkuutta: nolla uutta
   * solmua per lyönti. Kanava on yksiääninen — uusi lyönti leikkaa
   * edellisen hännän, mikä sopii kirjoituskoneelle.
   */
  hissNopea({ dur = 0.2, gain = 0.15, type = 'bandpass', freq = 1200, sweepTo = null, q = 1 }) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    if (!this.nopeaKanava || this.nopeaKanava.ctx !== ctx) {
      const src = ctx.createBufferSource();
      src.buffer = this.noise;
      src.loop = true;
      const filter = ctx.createBiquadFilter();
      const g = ctx.createGain();
      g.gain.value = 0.0001;
      src.connect(filter).connect(g).connect(this.bus);
      src.start();
      this.nopeaKanava = { ctx, filter, g };
    }
    const { filter, g } = this.nopeaKanava;
    const t0 = ctx.currentTime;
    filter.type = type;
    filter.Q.value = q;
    filter.frequency.cancelScheduledValues(t0);
    filter.frequency.setValueAtTime(this.jitter(freq), t0);
    if (sweepTo) filter.frequency.exponentialRampToValueAtTime(Math.max(sweepTo, 40), t0 + dur);
    g.gain.cancelScheduledValues(t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(this.jitter(gain), t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  }

  /**
   * Resonoiva kopsahdus: lyhyt kohinapurske useamman kaistanpäästön läpi.
   * Suodattimien taajuudet ovat esineen ominaistaajuuksia, joten sama
   * rakenne kuulostaa puulta tai metallilta pelkillä luvuilla.
   */
  knock({ freqs = [180, 290, 430], dur = 0.16, gain = 0.2, q = 9, delay = 0 }) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    for (const [i, freq] of freqs.entries()) {
      const src = ctx.createBufferSource();
      src.buffer = this.noise;
      src.loop = true;
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = this.jitter(freq);
      f.Q.value = q;
      const g = ctx.createGain();
      // Ylemmät osasävelet vaimenevat nopeammin, kuten oikeassa esineessä.
      const kesto = dur * (1 - i * 0.22);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(this.jitter(gain / (i + 1.4)), t0 + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.max(kesto, 0.03));
      src.connect(f).connect(g).connect(this.bus);
      src.start(t0);
      src.stop(t0 + dur + 0.06);
    }
  }

  /**
   * Soittorasian kello: epäharmoniset osasävelet omilla vaimenemisillaan.
   * Juuri epäharmonisuus tekee äänestä kellon eikä pillin.
   */
  bell({ freq = 880, dur = 1.1, gain = 0.12, delay = 0 }) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    // Kellon klassiset suhteet: perusääni, pieni desimi, kaksoisoktaavi.
    for (const [kerroin, osuus, kestoOsuus] of [[1, 1, 1], [2.76, 0.5, 0.62], [5.4, 0.28, 0.38]]) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = this.jitter(freq * kerroin);
      const g = ctx.createGain();
      const kesto = dur * kestoOsuus;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(this.jitter(gain * osuus), t0 + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + kesto);
      osc.connect(g).connect(this.bus);
      osc.start(t0);
      osc.stop(t0 + kesto + 0.06);
    }
  }

  /** Metallinen kilahdus: FM-synteesi nopealla vaimennuksella. */
  ding({ freq = 1200, ratio = 3.5, index = 500, dur = 0.4, gain = 0.12, delay = 0 }) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const carrier = ctx.createOscillator();
    carrier.frequency.value = this.jitter(freq);
    const mod = ctx.createOscillator();
    mod.frequency.value = this.jitter(freq * ratio);
    const modGain = ctx.createGain();
    // Moduloinnin syvyys romahtaa nopeasti: siitä syntyy metallin kirkas isku.
    modGain.gain.setValueAtTime(index, t0);
    modGain.gain.exponentialRampToValueAtTime(1, t0 + dur * 0.4);
    mod.connect(modGain).connect(carrier.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(this.jitter(gain), t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    carrier.connect(g).connect(this.bus);
    carrier.start(t0); mod.start(t0);
    carrier.stop(t0 + dur + 0.06); mod.stop(t0 + dur + 0.06);
  }

  /**
   * Potkurihurina lennon ajaksi: saha-aalto alipäästön läpi, ja LFO moduloi
   * voimakkuutta lapojen tahtiin. Soi kunnes stopFlight kutsutaan.
   */
  startFlight(kestoMs = 4800) {
    const ctx = this.ensureContext();
    if (!ctx || this.flightNodes) return;
    const t0 = ctx.currentTime;
    const kesto = kestoMs / 1000;

    // Oikea moottoriäänitys, jos se on ehditty ladata: lentoonlähtö
    // matkustamosta kuultuna. Ilman verkkoa soi syntetisoitu kone.
    const jet = this.samples?.jet;
    if (jet) {
      // Viritysivun valinta voi säätää alkukohtaa ja voimakkuutta
      // (#alku=40&voima=1.5); oletukset ovat omistajan hyväksymät.
      const asetus = jaaAlku(valittuAani('tehoste:jet'));
      const src = ctx.createBufferSource();
      src.buffer = jet;
      src.loop = true; // lyhyempikin äänite kantaa koko kohtauksen yli
      const g = ctx.createGain();
      // Kevyt sisäänfeidaus (omistajan palaute 10.8.2026): moottori
      // nousee kuuluviin ~5 sekunnissa samalla kun edellisen näkymän
      // äänet häipyvät, eikä pamahda päälle kalvon kanssa yhtä aikaa.
      // HUOM: gain on asetettava hiljaiseksi HETI (t0) — pelkkä
      // t0+0.15-ajastus jätti oletusarvon 1.0 soimaan 150 ms täysillä
      // ennen häivytystä (omistajan bugiraportti 10.8.2026).
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.setValueAtTime(0.0001, t0 + 0.15);
      g.gain.exponentialRampToValueAtTime(Math.min(1, 0.7 * asetus.voima), t0 + 5.2);
      // Ei ajastettua loppua: moottori soi, kunnes stopFlight häivyttää
      // sen — kalvo on auki niin kauan kuin pelaaja viipyy koneessa.
      src.connect(g).connect(this.bus);
      // Pitkissä äänityksissä alku on lähestymistä ja odottelua —
      // hypätään suoraan lennon ytimeen (omistajan ohje: ~40 s kohdalta).
      const alku = asetus.alku || (jet.duration > 60 ? 40 : 0);
      // Jos kohtaus venyy äänitettä pidemmäksi, silmukka palaa samaan
      // kohtaan eikä äänitteen hiljaiseen alkuun.
      src.loopStart = alku;
      src.loopEnd = jet.duration;
      src.start(t0, alku);
      this.flightNodes = { lahteet: [src], vaimennukset: [g] };
      src.onended = () => {
        if (this.flightNodes?.lahteet?.includes(src)) this.flightNodes = null;
      };
      return;
    }

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(this.jitter(84), t0);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(400, t0);
    lp.Q.value = 1.2;

    // Lapojen isku: ~14 Hz voimakkuusmodulaatio.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = this.jitter(14);
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.35;
    const depth = ctx.createGain();
    depth.gain.value = 0.65;
    lfo.connect(lfoGain).connect(depth.gain);

    // Nousee lentoon ja jää soimaan; stopFlight häivyttää. Sisääntulo
    // pehmennetty samaan tapaan kuin äänitetyssä moottorissa.
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.setValueAtTime(0.0001, t0 + 0.15);
    g.gain.exponentialRampToValueAtTime(0.075, t0 + 3.8);

    // Moottorin virtausääni potkurin alle: kohinaa kaistanpäästön läpi,
    // taajuus nousee lähdössä ja laskee laskeutuessa. Tämä tekee lennosta
    // koneen — pelkkä saha-aalto kuulosti hyttyseltä.
    const virtaus = ctx.createBufferSource();
    virtaus.buffer = this.noise;
    virtaus.loop = true;
    const vf = ctx.createBiquadFilter();
    vf.type = 'bandpass';
    vf.Q.value = 0.5;
    vf.frequency.setValueAtTime(600, t0);
    vf.frequency.exponentialRampToValueAtTime(1600, t0 + kesto * 0.4);
    vf.frequency.exponentialRampToValueAtTime(500, t0 + kesto);
    const vg = ctx.createGain();
    vg.gain.setValueAtTime(0.0001, t0);
    vg.gain.setValueAtTime(0.0001, t0 + 0.15);
    vg.gain.exponentialRampToValueAtTime(0.055, t0 + 4.0);

    // Matala jyrinä pohjalle.
    const runko = ctx.createBufferSource();
    runko.buffer = this.noise;
    runko.loop = true;
    const rf = ctx.createBiquadFilter();
    rf.type = 'lowpass';
    rf.frequency.value = 180;
    const rg = ctx.createGain();
    rg.gain.setValueAtTime(0.0001, t0);
    rg.gain.setValueAtTime(0.0001, t0 + 0.15);
    rg.gain.exponentialRampToValueAtTime(0.06, t0 + 3.9);

    osc.connect(lp).connect(depth).connect(g).connect(this.bus);
    virtaus.connect(vf).connect(vg).connect(this.bus);
    runko.connect(rf).connect(rg).connect(this.bus);
    osc.start(t0); lfo.start(t0); virtaus.start(t0); runko.start(t0);
    this.flightNodes = { lahteet: [osc, lfo, virtaus, runko], vaimennukset: [g, vg, rg] };
    // Siivotaan itsestään, jos stopFlight jää kutsumatta.
    osc.onended = () => {
      if (this.flightNodes?.lahteet?.includes(osc)) this.flightNodes = null;
    };
  }

  /** Lopettaa moottoriäänen pehmeästi. */
  stopFlight() {
    const solmut = this.flightNodes;
    if (!solmut || !this.ctx) return;
    this.flightNodes = null;
    const t = this.ctx.currentTime;
    try {
      // Moottori hiipuu rauhassa — pelaaja astuu ulos, kone ei sammu
      // seinään.
      for (const gain of solmut.vaimennukset) {
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      }
      for (const src of solmut.lahteet) src.stop(t + 1);
    } catch {
      /* solmu oli jo pysäytetty */
    }
  }


  // --- ambienssi ------------------------------------------------------------
  //
  // Hiljainen taustaäänimaisema, joka vaihtuu kohteen mukaan. Rakenne on
  // kaikilla tyypeillä sama: jatkuva pohja (suodatettua kohinaa hitailla
  // LFO:illa) ja sen päällä satunnaisia tapahtumia epäsäännöllisin välein.
  // Kaikki on tarkoituksella hyvin hiljaista — ambienssin kuuluu huomata
  // vasta kun se lakkaa.

  /**
   * Vaihtaa äänimaiseman ristihäivytyksellä. `null` sammuttaa.
   * Sama tyyppi uudelleen ei tee mitään, jotta maisema ei nykäise
   * jokaisella renderöinnillä.
   */
  setAmbience(type) {
    if (type === this.ambienceType) return;
    this.ambienceType = type ?? null;

    const ctx = this.ensureContext();
    if (!ctx) return;

    // Vanha häivytetään pois ja puretaan vasta sen jälkeen.
    if (this.ambience) this.fadeOutAmbience(this.ambience);
    this.ambience = null;
    if (!type || !AMBIENCES[type]) return;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, ctx.currentTime);
    // Väistö on voimassa myös uudelle maisemalle: ilman tätä kesken
    // näytteen vaihtuva maisema nousisi täyteen voimaan puheen päälle.
    out.gain.exponentialRampToValueAtTime(
      Math.max(0.0001, this.ambienssiVaisto), ctx.currentTime + AMBIENCE_FADE,
    );
    out.connect(this.bus);

    const maisema = { out, nodes: [], timer: null, type };
    this.ambience = maisema;
    AMBIENCES[type](this, maisema);
    this.scheduleAmbienceEvent(maisema);
  }

  /**
   * Väistää syntetisoidun äänimaiseman muun äänen tieltä (ääninäyte,
   * kertoja, tietovisa). Kerroin 1 on täysi voima.
   *
   * Kerroin jää talteen, koska maisema voi vaihtua väistön aikana:
   * setAmbience nostaa uuden maiseman tähän eikä täyteen voimaan.
   * Häivytys on nopeampi kuin maiseman oma vaihto — väistön pitää ehtiä
   * ennen puheen ensimmäistä tavua, ei sen jälkeen.
   */
  vaimennaAmbienssi(kerroin, liukuS = 0.35) {
    this.ambienssiVaisto = Math.max(0, Math.min(1, kerroin));
    const maisema = this.ambience;
    if (!this.ctx || !maisema || maisema.loppuu) return;
    const t = this.ctx.currentTime;
    try {
      maisema.out.gain.cancelScheduledValues(t);
      maisema.out.gain.setValueAtTime(Math.max(maisema.out.gain.value, 0.0001), t);
      // Liuku tulee kutsujalta (ambience-stream ajaVaisto), jotta
      // nauhoitettu ja syntetisoitu tausta feidaavat samaa tahtia.
      maisema.out.gain.exponentialRampToValueAtTime(
        Math.max(0.0001, this.ambienssiVaisto), t + Math.max(0.05, liukuS),
      );
    } catch {
      /* solmu oli jo purettu */
    }
  }

  /** Häivyttää ja purkaa yhden maiseman. */
  fadeOutAmbience(maisema) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    clearTimeout(maisema.timer);
    maisema.timer = null;
    maisema.loppuu = true;
    try {
      maisema.out.gain.cancelScheduledValues(t);
      maisema.out.gain.setValueAtTime(Math.max(maisema.out.gain.value, 0.0001), t);
      maisema.out.gain.exponentialRampToValueAtTime(0.0001, t + AMBIENCE_FADE);
    } catch {
      /* solmu oli jo purettu */
    }
    for (const n of maisema.nodes) {
      try { n.stop(t + AMBIENCE_FADE + 0.1); } catch { /* jo pysäytetty */ }
    }
  }

  /**
   * Jatkuva pohja: kohinaa suodattimen läpi, ja hidas LFO liikuttaa
   * voimakkuutta niin ettei ääni ole tasainen seinä.
   */
  ambienceBed(maisema, { type = 'lowpass', freq = 500, q = 0.7, gain = 0.04, lfoHz = 0.08, lfoDepth = 0.5 }) {
    const ctx = this.ctx;
    const t0 = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.value = gain;

    // Hidas huojunta: puuskia ja laantumista.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = lfoHz;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = gain * lfoDepth;
    lfo.connect(lfoGain).connect(g.gain);

    src.connect(f).connect(g).connect(maisema.out);
    src.start(t0);
    lfo.start(t0);
    maisema.nodes.push(src, lfo);
  }

  /** Ajastaa seuraavan satunnaisen tapahtuman epäsäännöllisen välin päähän. */
  scheduleAmbienceEvent(maisema) {
    if (maisema.loppuu) return;
    const viive = AMBIENCE_EVENT_MIN + Math.random() * (AMBIENCE_EVENT_MAX - AMBIENCE_EVENT_MIN);
    maisema.timer = setTimeout(() => {
      if (maisema.loppuu || this.ambience !== maisema) return;
      // Taustalla vain rytmi jatkuu, ei ääni: pysäytettyyn kontekstiin
      // aikataulutetut tapahtumat soisivat kaikki yhtä aikaa paluussa.
      const tapahtuma = this.taustaTauko ? null : AMBIENCE_EVENTS[maisema.type];
      if (tapahtuma) {
        try { tapahtuma(this, maisema); } catch { /* ei saa kaataa peliä */ }
      }
      this.scheduleAmbienceEvent(maisema);
    }, viive);
    // Ajastin ei saa pitää Nodea hereillä testeissä.
    if (maisema.timer && typeof maisema.timer.unref === 'function') maisema.timer.unref();
  }

  /** Lyhyt ambienssiääni maiseman omaan ulostuloon (ei kaikubussiin suoraan). */
  ambienceHit({ maisema, freq = 800, dur = 0.5, gain = 0.02, type = 'bandpass', q = 4, sweepTo = null }) {
    const ctx = this.ctx;
    if (!ctx || maisema.loppuu) return;
    const t0 = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(this.jitter(freq), t0);
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(Math.max(sweepTo, 40), t0 + dur);
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(this.jitter(gain), t0 + dur * 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f).connect(g).connect(maisema.out);
    src.start(t0);
    src.stop(t0 + dur + 0.05);
  }

  /** Lyhyt sävelambienssi: linnut, kulkuset ja vastaavat. */
  ambienceTone({ maisema, freq = 900, to = null, dur = 0.3, gain = 0.02, type = 'sine', delay = 0 }) {
    const ctx = this.ctx;
    if (!ctx || maisema.loppuu) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(this.jitter(freq), t0);
    if (to) osc.frequency.exponentialRampToValueAtTime(Math.max(this.jitter(to), 20), t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(this.jitter(gain), t0 + dur * 0.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(maisema.out);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  // --- pelin äänet --------------------------------------------------------


  play(name, asetukset = undefined) {
    // Taustalla ei synny tehosteita lainkaan: pysäytetyssä
    // kontekstissa ne jäisivät jonoon ja purskahtaisivat paluussa.
    if (!this.enabled || this.taustaTauko) return;
    // Oikea äänite ensin, jos se on ladattu; muuten syntetisoitu versio.
    const real = REAL_PLAYERS[name];
    if (real && real(this, asetukset)) return;
    const sound = SOUNDS[name];
    if (sound) sound(this, asetukset);
  }

  /**
   * Lataa oikeat äänitteet WebAudio-puskureiksi taustalla. Kutsutaan
   * kerran, kun äänikonteksti syntyy. Epäonnistunut lataus (offline) ei
   * haittaa: play() palaa synteesiin niin kauan kuin puskuria ei ole.
   */
  loadRealSamples() {
    if (this.samples) return;
    this.samples = {};
    this.sampleHits = {};
    for (const [name, { url }] of Object.entries(REAL_SAMPLES)) {
      // Omistajan valitsema äänite (/aanet.html) ohittaa oletuksen;
      // tyhjä valinta jättää synteesin voimaan.
      const valinta = valittuAani(`tehoste:${name}`);
      if (valinta === '') continue;
      // Ilman oletusta (url null) ladataan vain, jos omistaja on valinnut
      // äänen viritysivulta.
      if (!(valinta ?? url)) continue;
      // Peili ensin, alkuperäinen lähde varareittinä (js/media.js).
      haeAani(valinta ?? url)
        .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject(new Error('http'))))
        .then((data) => this.ctx.decodeAudioData(data))
        .then((buf) => {
          this.samples[name] = buf;
          this.sampleHits[name] = this.findHits(buf);
        })
        .catch(() => { /* ei verkkoa — synteesi kelpaa */ });
    }
  }

  /**
   * Etsii äänitteestä iskukohdat (esim. kirjoituskoneen näppäilyt tai
   * nopan kopsahdukset): kohdat, joissa taso ylittää osan äänitteen
   * huipusta. Satunnainen siivu osui usein iskujen väliseen hiljaisuuteen,
   * jolloin ääntä ei kuulunut — iskulistalta siivu osuu aina.
   */
  findHits(buf, { kynnys = 0.3, valiMs = 100 } = {}) {
    const data = buf.getChannelData(0);
    const rate = buf.sampleRate;
    const vali = Math.floor(rate * (valiMs / 1000));
    let huippu = 0;
    for (let i = 0; i < data.length; i += 16) huippu = Math.max(huippu, Math.abs(data[i]));
    const raja = huippu * kynnys;
    const iskut = [];
    for (let i = 0; i < data.length; i += 8) {
      if (Math.abs(data[i]) >= raja) {
        iskut.push(Math.max(0, i / rate - 0.005));
        i += vali;
      }
    }
    return iskut;
  }

  /**
   * Soittaa satunnaisen siivun äänitteestä masterketjun läpi. Siivut
   * otetaan äänitteen keskiosasta (20–80 %), jottei osuta alun tai lopun
   * hiljaisuuteen; `tail` soittaa äänitteen lopun (esim. nopan asettuminen).
   * Palauttaa false, jos puskuria ei ole ladattu — silloin soi synteesi.
   */
  playSlice(name, {
    dur = 0.1, gain = 0.3, tail = null, alusta = false, isku = false, delay = 0, tasavire = false,
    vire = null, nopeusKayra = null,
  } = {}) {
    const ctx = this.ensureContext();
    const buf = this.samples?.[name];
    if (!ctx || !buf) return false;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    // Vireheitto elävöittää kolahduksia, mutta vääristää mekaanisia ääniä
    // (kirjoituskone kuulosti sen kanssa oudolta). Nimetty vire soittaa
    // saman äänitteen matalampana tai korkeampana (nappulan tok/tik).
    src.playbackRate.value = vire ? this.jitter(vire, 0.02) : (tasavire ? 1 : this.jitter(1, 0.05));
    const kesto = tail ?? dur;
    const iskut = isku ? this.sampleHits?.[name] : null;
    const alku = tail != null
      ? Math.max(0, buf.duration - tail - 0.15)
      : alusta
        ? 0
        : iskut?.length
          ? iskut[Math.floor(Math.random() * iskut.length)]
          : buf.duration * 0.2 + Math.random() * Math.max(0.01, buf.duration * 0.6 - dur);
    // Pehmeä alku ja loppu, ettei leikkauskohta naksu.
    const g = ctx.createGain();
    const t0 = ctx.currentTime + delay;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
    g.gain.setValueAtTime(gain, t0 + Math.max(0.02, kesto - 0.04));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + kesto);
    // Toistonopeuden käyrä: äänen korkeus seuraa animaation vauhtia
    // (omistajan toive). Zoomauksessa moottori kiihtyy ja hidastuu
    // samaan tahtiin kuin kartta.
    if (nopeusKayra?.length > 1) {
      try {
        src.playbackRate.setValueCurveAtTime(Float32Array.from(nopeusKayra), t0, kesto);
      } catch {
        /* jos selain ei kelpuuta käyrää, tasainen nopeus kelpaa */
      }
    }
    src.connect(g).connect(this.bus);
    src.start(t0, alku, kesto + 0.03);
    return true;
  }
}

/**
 * Cubic-bezier-pehmennyksen etenemä hetkellä t (0…1). Sama kaava kuin
 * css:llä; ratkaistaan x Newtonin menetelmällä ja luetaan siitä y.
 */
function bezierEtenema(x1, y1, x2, y2, t) {
  const kayra = (a, b, u) => {
    const v = 1 - u;
    return 3 * v * v * u * a + 3 * v * u * u * b + u * u * u;
  };
  const derivaatta = (a, b, u) => {
    const v = 1 - u;
    return 3 * v * v * a + 6 * v * u * (b - a) + 3 * u * u * (1 - b);
  };
  let u = t;
  for (let i = 0; i < 8; i++) {
    const d = derivaatta(x1, x2, u);
    if (Math.abs(d) < 1e-6) break;
    u -= (kayra(x1, x2, u) - t) / d;
    u = Math.min(1, Math.max(0, u));
  }
  return kayra(y1, y2, u);
}

/**
 * Toistonopeuden käyrä pehmennyksen vauhdista. Zoomausliuku on hidas
 * alussa, nopea keskellä ja hidas lopussa; moottorin korkeus seuraa
 * samaa kaarta. Nopeus ei laske nollaan — pysähtynyt moottori olisi
 * hiljainen, ja tässä on kyse sävyn elämisestä.
 *
 * Koko haarukka on alle yhden: äänite soi hitaampana ja siis
 * matalampana kuin alkuperäinen, jolloin koneisto kuulostaa
 * vanhemmalta ja isommalta (omistajan toive).
 */
function vauhtiKayra(pehmennys, matalin = 0.76, korkein = 1.02, pisteita = 28) {
  const [x1, y1, x2, y2] = pehmennys;
  const vauhdit = [];
  for (let i = 0; i < pisteita; i++) {
    const t = i / (pisteita - 1);
    const h = 1 / (pisteita * 2);
    const a = bezierEtenema(x1, y1, x2, y2, Math.max(0, t - h));
    const b = bezierEtenema(x1, y1, x2, y2, Math.min(1, t + h));
    vauhdit.push((b - a) / (Math.min(1, t + h) - Math.max(0, t - h)));
  }
  const huippu = Math.max(...vauhdit) || 1;
  return vauhdit.map((v) => matalin + (korkein - matalin) * (v / huippu));
}

// Sama pehmennys kuin kartan liu'ulla (js/ui.js ZOOM_PEHMENNYS). Jos se
// muuttuu siellä, muuta myös tässä — ääni ja kuva seuraavat toisiaan.
// Nimi on eri kuin ui.js:ssä, koska yhden tiedoston versio niputtaa moduulit
// samaan näkyvyysalueeseen: samanniminen const kahdesti kaataisi koko sivun.
const ZOOM_PEHMENNYS_PISTEET = [0.68, 0, 0.3, 1];
const ZOOM_VAUHTI = vauhtiKayra(ZOOM_PEHMENNYS_PISTEET);
const ZOOM_VAUHTI_MIN = Math.min(...ZOOM_VAUHTI);
const ZOOM_VAUHTI_MAX = Math.max(...ZOOM_VAUHTI);

// Oikeat äänitteet Freesoundista (CC0). Ladataan verkosta puskuriin;
// ilman verkkoa vastaava syntetisoitu ääni soi entiseen tapaan.
const REAL_SAMPLES = {
  dice: {
    url: 'https://cdn.freesound.org/previews/94/94031_1554038-lq.mp3',
    credit: '"Dice Roll" — LoafDV, Freesound (CC0)',
  },
  // Kirjoituskoneen yksittäinen näppäinlyönti: edellisessä äänityksessä
  // naputus alkoi vasta ~20 sekunnin kohdalla, joten iskuntunnistus
  // poimi rullan rahinaa. Tässä klipissä on pelkkiä lyöntejä.
  pen: {
    url: 'https://cdn.freesound.org/previews/856/856165_18901108-lq.mp3',
    credit: '"Vintage Typewriter Key Press" — brktkrgll, Freesound (CC0)',
  },
  // Potkurikoneen ylilento — omistajan viritysivulta valitsema
  // lentokohtauksen moottoriääni.
  jet: {
    url: 'https://cdn.freesound.org/previews/315/315660_2506497-lq.mp3',
    credit: '"ATR 72 flyover" — Hoscalegeek, Freesound (CC0)',
  },
  // Sivunkääntö: kysymyskortti avautuu kuin päiväkirjan sivu.
  quizOpen: {
    url: 'https://cdn.freesound.org/previews/842/842183_13307919-lq.mp3',
    credit: '"Page Turn Free" — AardsReal, Freesound (CC0)',
  },
  // ElevenLabs-efektipilotit: ei oletusta (url: null) — syntetisoitu soi,
  // kunnes omistaja valitsee äänen viritysivulta. Tiedostot ovat repossa.
  click: { url: 'assets/audio/efekti-klik.mp3', credit: 'ElevenLabs SFX' },
  paper: { url: 'assets/audio/efekti-paperi.mp3', credit: 'ElevenLabs SFX' },
  coin: { url: 'assets/audio/efekti-kolikot.mp3', credit: 'ElevenLabs SFX' },
  correct: { url: 'assets/audio/efekti-oikein.mp3', credit: 'ElevenLabs SFX' },
  wrong: { url: 'assets/audio/efekti-vaarin.mp3', credit: 'ElevenLabs SFX' },
  swipe: { url: 'assets/audio/efekti-pyyhkaisy.mp3', credit: 'ElevenLabs SFX' },
  // Nappulan liike: sama puinen naksu, väliaskel matalampana ja
  // perillinen kolaus korkeampana (omistajan "tok-tok-tik").
  step: { url: 'assets/audio/efekti-naksu.mp3', credit: 'ElevenLabs SFX' },
  arrive: { url: 'assets/audio/efekti-naksu.mp3', credit: 'ElevenLabs SFX' },
  ferry: { url: 'assets/audio/efekti-laiva.mp3', credit: 'ElevenLabs SFX' },
  flight: { url: 'assets/audio/efekti-lento.mp3', credit: 'ElevenLabs SFX' },
  hint: { url: 'assets/audio/efekti-vihje.mp3', credit: 'ElevenLabs SFX' },
  tick: { url: 'assets/audio/efekti-tikitys.mp3', credit: 'ElevenLabs SFX' },
  timeout: { url: 'assets/audio/efekti-aikaloppui.mp3', credit: 'ElevenLabs SFX' },
  flip: { url: 'assets/audio/efekti-kaanto.mp3', credit: 'ElevenLabs SFX' },
  clack: { url: 'assets/audio/efekti-naksu.mp3', credit: 'ElevenLabs SFX' },
  // Kartan zoomaus: aito kompaktikameran zoomimoottori. Lähde on
  // Wikimedia Commonsin "Pocket camera start and shut down" (public
  // domain), josta on otettu linssin sisäänvedon tasainen surina ja
  // toistettu ristihäivytyksellä zoomausliu'un mittaiseksi.
  // Kartan zoomaus: aito kompaktikameran zoomimoottori. Lähteestä on
  // eristetty tasaisin 82 ms:n pätkä (mitattu: 8 %:n vaihtelu, kun
  // koko sisäänvedossa sitä on 21 %) ja silmukoitu kokonaisin
  // perusjaksoin, vuorotellen eteen- ja taaksepäin. Lopuksi
  // voimakkuus on tasattu, joten ääni ei nouse eikä laske.
  zoom: {
    url: 'assets/audio/efekti-zoom.mp3',
    credit: '"Pocket camera start and shut down" — stephan, pdsounds.org '
      + 'Wikimedia Commonsin kautta (public domain)',
  },
  star: { url: 'assets/audio/efekti-tahti.mp3', credit: 'ElevenLabs SFX' },
  gem: { url: 'assets/audio/efekti-jalokivi.mp3', credit: 'ElevenLabs SFX' },
  robber: { url: 'assets/audio/efekti-rosvo.mp3', credit: 'ElevenLabs SFX' },
  empty: { url: 'assets/audio/efekti-tyhja.mp3', credit: 'ElevenLabs SFX' },
  stuck: { url: 'assets/audio/efekti-jumissa.mp3', credit: 'ElevenLabs SFX' },
  turn: { url: 'assets/audio/efekti-vuoro.mp3', credit: 'ElevenLabs SFX' },
  win: { url: 'assets/audio/efekti-voitto.mp3', credit: 'ElevenLabs SFX' },
};

// Mitkä äänet soivat oikeasta äänitteestä ja miten siivu otetaan.
const REAL_PLAYERS = {
  dieTick: (s) => s.playSlice('dice', { dur: 0.08, gain: 0.4, isku: true }),
  dieLand: (s) => s.playSlice('dice', { tail: 0.6, gain: 0.55 }),
  // Yksi kunnollinen lyönti sanan ilmestymishetkellä: siivu alkaa aina
  // iskukohdasta ja on tarpeeksi pitkä, että lyönnin sointi kuuluu —
  // lyhyet pätkät eivät kuulostaneet kirjoituskoneelta. Rytmi tulee
  // tekstin kirjoittumisesta (typeText), ei purskeista.
  // `voima` kertoo, kuinka kovaa lyödään: etusivulla täydellä (1),
  // pöllön striimin taustanaputuksessa vaimeammin (js/pollo.js).
  pen: (s, { voima = 1 } = {}) => s.playSlice('pen', {
    dur: 0.24, gain: 0.35 * voima, isku: true, tasavire: true,
  }),
  // Sivunkääntö soi alusta, ei siivuna — se on yksi ele.
  quizOpen: (s) => s.playSlice('quizOpen', { dur: 1.1, gain: 0.4, alusta: true }),
  // Generoidut yksittäisefektit soivat aina alusta kokonaisina.
  click: (s) => s.playSlice('click', { dur: 0.5, gain: 0.35, alusta: true }),
  paper: (s) => s.playSlice('paper', { dur: 1.2, gain: 0.35, alusta: true }),
  coin: (s) => s.playSlice('coin', { dur: 1.3, gain: 0.4, alusta: true }),
  correct: (s) => s.playSlice('correct', { dur: 1.5, gain: 0.4, alusta: true }),
  wrong: (s) => s.playSlice('wrong', { dur: 1.1, gain: 0.4, alusta: true }),
  swipe: (s) => s.playSlice('swipe', { dur: 0.8, gain: 0.3, alusta: true }),
  step: (s) => s.playSlice('step', { dur: 0.5, gain: 0.3, alusta: true, vire: 0.82 }),
  arrive: (s) => s.playSlice('arrive', { dur: 0.6, gain: 0.42, alusta: true, vire: 1.18 }),
  ferry: (s) => s.playSlice('ferry', { dur: 2.6, gain: 0.4, alusta: true }),
  flight: (s) => s.playSlice('flight', { dur: 2.1, gain: 0.35, alusta: true }),
  hint: (s) => s.playSlice('hint', { dur: 1.1, gain: 0.35, alusta: true }),
  /*
   * PÖLLÖN KUPLA (omistajan pelitestipalaute v1119: *"pieni hiljainen
   * ääni kun kupla ilmestyy — käytä ensisijaisesti olemassa olevaa
   * hiljaista ääniassettia"*).
   *
   * Sama paperiäänite kuin `paper`, mutta lyhyempänä siivuna ja
   * neljäsosan voimakkuudella: kupla on kuiskaus eikä ilmoitus, ja se
   * voi toistua kahdesti muutaman sekunnin sisällä (saapumisen kaksi
   * kuplaa). Omaa tiedostoa ei tarvita — siivu on jo muistissa.
   */
  kupla: (s) => s.playSlice('paper', { dur: 0.38, gain: 0.09, alusta: true }),
  tick: (s) => s.playSlice('tick', { dur: 0.6, gain: 0.25, alusta: true }),
  timeout: (s) => s.playSlice('timeout', { dur: 1.6, gain: 0.4, alusta: true }),
  flip: (s) => s.playSlice('flip', { dur: 0.9, gain: 0.35, alusta: true }),
  /*
   * `voima` kertoo, kuinka kovaa naksautetaan — sama säädin kuin
   * kirjoituskoneen lyönnillä yllä. Oletus 1 on se hillitty naksu, joka
   * kuittaa pelin sisäiset napautukset; avauslennon lähtönapautus soi
   * kovempaa, koska sen päällä soivat sekä kertoja että etusivun
   * äänimaisema (js/ui.js doPickStart).
   */
  clack: (s, { voima = 1 } = {}) => s.playSlice('clack', {
    dur: 0.6, gain: 0.3 * voima, alusta: true,
  }),
  // Koko äänite alusta loppuun, ilman satunnaista vireheittoa: moottori
  // kuulostaa oudolta jos sitä siirretään umpimähkään. Sen sijaan
  // toistonopeus seuraa zoomausliu'un vauhtia (omistajan toive), joten
  // moottori kiihtyy ja hidastuu samassa tahdissa kartan kanssa.
  // Kesto tulee kutsujalta: etusivu 2,8 s, mantereet 2,0 s.
  zoom: (s, { kesto = 3.6 } = {}) => s.playSlice('zoom', {
    // Voimakkuus on selvästi pienempi kuin naksahduksellisessa
    // versiossa: tasattu moottori on keskitasoltaan paljon kovempi
    // vaikka huippu on sama.
    dur: kesto, gain: 0.21, alusta: true, tasavire: true, nopeusKayra: ZOOM_VAUHTI,
  }),
  star: (s) => s.playSlice('star', { dur: 2.6, gain: 0.45, alusta: true }),
  gem: (s) => s.playSlice('gem', { dur: 1.6, gain: 0.4, alusta: true }),
  robber: (s) => s.playSlice('robber', { dur: 2.1, gain: 0.45, alusta: true }),
  empty: (s) => s.playSlice('empty', { dur: 1.1, gain: 0.3, alusta: true }),
  stuck: (s) => s.playSlice('stuck', { dur: 1.1, gain: 0.35, alusta: true }),
  turn: (s) => s.playSlice('turn', { dur: 1.1, gain: 0.3, alusta: true }),
  win: (s) => s.playSlice('win', { dur: 3.6, gain: 0.5, alusta: true }),
};


// --- äänimaisemat -----------------------------------------------------------
//
// Jokainen maisema on jatkuva pohja; tapahtumat ovat erikseen alla. Kaikki
// voimakkuudet ovat välillä 0,03–0,05: taustan kuuluu jäädä huomaamatta,
// kunnes se lakkaa.

const AMBIENCES = {
  // Aavikko: matala tuulen suhina, jossa pitkät puuskat.
  aavikko: (s, m) => {
    s.ambienceBed(m, { type: 'lowpass', freq: 420, gain: 0.045, lfoHz: 0.06, lfoDepth: 0.6 });
    s.ambienceBed(m, { type: 'bandpass', freq: 1100, q: 0.5, gain: 0.018, lfoHz: 0.11 });
  },
  // Meri: aallot paisuvat ja laantuvat hitaasti.
  meri: (s, m) => {
    s.ambienceBed(m, { type: 'lowpass', freq: 600, gain: 0.05, lfoHz: 0.13, lfoDepth: 0.75 });
    s.ambienceBed(m, { type: 'highpass', freq: 1800, gain: 0.012, lfoHz: 0.09 });
  },
  // Sademetsä: tiheä korkea sirinä ja kostea pohja.
  sademetsa: (s, m) => {
    s.ambienceBed(m, { type: 'bandpass', freq: 3600, q: 1.6, gain: 0.03, lfoHz: 0.22, lfoDepth: 0.35 });
    s.ambienceBed(m, { type: 'lowpass', freq: 300, gain: 0.03, lfoHz: 0.05 });
  },
  // Savanni: heinäsirkkojen kapea kaista ja kuiva tuuli.
  savanni: (s, m) => {
    s.ambienceBed(m, { type: 'bandpass', freq: 5200, q: 3.2, gain: 0.022, lfoHz: 0.3, lfoDepth: 0.5 });
    s.ambienceBed(m, { type: 'lowpass', freq: 500, gain: 0.032, lfoHz: 0.07 });
  },
  // Ylänkö: ohut viima, ei juuri muuta.
  ylanko: (s, m) => {
    s.ambienceBed(m, { type: 'highpass', freq: 900, gain: 0.03, lfoHz: 0.1, lfoDepth: 0.6 });
  },
  // Basaari: ei yritetä puhetta — vain matala hälypohja, jonka päälle tulee
  // kulkusia ja kavionkopsetta harvakseltaan.
  basaari: (s, m) => {
    s.ambienceBed(m, { type: 'bandpass', freq: 700, q: 0.8, gain: 0.035, lfoHz: 0.17, lfoDepth: 0.45 });
  },
};

// Satunnaiset tapahtumat maiseman päällä, 8–30 sekunnin välein.
const AMBIENCE_EVENTS = {
  // Hiekan rahinaa puuskassa.
  aavikko: (s, m) => s.ambienceHit({
    maisema: m, type: 'highpass', freq: 1800, sweepTo: 3400, dur: 1.6, gain: 0.022, q: 0.6,
  }),
  // Harva lokinhuuto: kaksi laskevaa säveltä.
  meri: (s, m) => {
    if (Math.random() < 0.55) {
      s.ambienceTone({ maisema: m, freq: 1500, to: 950, dur: 0.3, gain: 0.016, type: 'triangle' });
      s.ambienceTone({ maisema: m, freq: 1400, to: 900, dur: 0.26, gain: 0.013, type: 'triangle', delay: 0.42 });
    } else {
      s.ambienceHit({ maisema: m, type: 'lowpass', freq: 900, sweepTo: 300, dur: 2.4, gain: 0.03, q: 0.5 });
    }
  },
  // Vesipisara tai kaukainen linnun vihellys.
  sademetsa: (s, m) => {
    if (Math.random() < 0.5) {
      s.ambienceTone({ maisema: m, freq: 2400, to: 1300, dur: 0.09, gain: 0.02, type: 'sine' });
    } else {
      s.ambienceTone({ maisema: m, freq: 1900, to: 2600, dur: 0.22, gain: 0.014, type: 'sine' });
      s.ambienceTone({ maisema: m, freq: 2600, to: 1800, dur: 0.18, gain: 0.012, type: 'sine', delay: 0.24 });
    }
  },
  // Sirkkojen tiheys nousee hetkeksi.
  savanni: (s, m) => s.ambienceHit({
    maisema: m, type: 'bandpass', freq: 5600, dur: 2.2, gain: 0.016, q: 4,
  }),
  // Yksittäinen viiman kiihdytys.
  ylanko: (s, m) => s.ambienceHit({
    maisema: m, type: 'highpass', freq: 1200, sweepTo: 2600, dur: 2.8, gain: 0.018, q: 0.5,
  }),
  // Kulkunen tai kavionkopse.
  basaari: (s, m) => {
    if (Math.random() < 0.5) {
      for (let i = 0; i < 3; i++) {
        s.ambienceTone({
          maisema: m, freq: 2100 + i * 90, dur: 0.12, gain: 0.012, type: 'triangle', delay: i * 0.14,
        });
      }
    } else {
      for (let i = 0; i < 4; i++) {
        s.ambienceHit({ maisema: m, freq: 260, dur: 0.09, gain: 0.014, q: 7 });
      }
    }
  },
};

export const AMBIENCE_TYPES = Object.keys(AMBIENCES);

const SOUNDS = {
  // Käyttöliittymä
  // Kysymyskortin avaus ilman verkkoa: paperi ja pehmeä kello.
  quizOpen: (s) => {
    s.hiss({ dur: 0.4, type: 'highpass', freq: 800, sweepTo: 2400, gain: 0.07 });
    s.bell({ freq: 740, dur: 0.5, gain: 0.06, delay: 0.1 });
  },
  click: (s) => s.knock({ freqs: [540, 880], dur: 0.045, gain: 0.06, q: 8 }),
  paper: (s) => s.hiss({ dur: 0.34, type: 'highpass', freq: 900, sweepTo: 2800, gain: 0.075 }),
  // Kynän raapaisu pergamentilla — avaustekstin käsinkirjoitus. Hyvin
  // hiljainen, koska se toistuu joka sanalla. `voima` on kutsujan oma
  // kerroin: pöllön striimin naputus on taustaa eikä pääosa, joten se
  // soittaa saman lyönnin selvästi hiljempaa (js/pollo.js).
  // Kierrätetty kanava (hissNopea): naputus toistuu joka sanalla, eikä
  // se saa luoda uusia audiosolmuja per lyönti (ks. hissNopea-kommentti).
  pen: (s, { voima = 1 } = {}) => s.hissNopea({
    dur: 0.06, type: 'highpass', freq: 2600, sweepTo: 1500, gain: 0.02 * voima, q: 0.7,
  }),
  swipe: (s) => s.hiss({ dur: 0.24, freq: 700, sweepTo: 2600, gain: 0.09, q: 0.8 }),

  /*
   * PÖLLÖN HUHUILU paneelin avautuessa (omistajan tilaus 13.8.2026:
   * *"saisiko pöllölle oman äänen kun hänet 'herättää'. — Huhuu on
   * vähän pitkä mutta alun 'hu' voisi toimia."*).
   *
   * Yksitavuinen, ei kaksitavuinen "hu-huu": yksi pehmeä siniaalto
   * matalalla, loivalla alulla (attack 60 ms — nopeampi alku kuulostaisi
   * pillin puhallukselta) ja pienellä laskulla lopussa, kuten oikean
   * lehtopöllön huhuilussa. Oktaavi päällä pelkkänä ruumiina, ja hyvin
   * hiljainen henkäys alkuun: ilman sitä sini kuulostaa
   * signaaligeneraattorilta eikä linnulta.
   *
   * Ääni on tarkoituksella lyhyt ja hiljainen: se on tervehdys, ei
   * hälytys, ja se soi joka kerta kun paneeli avataan.
   */
  owl: (s) => {
    s.tone({ freq: 402, to: 336, dur: 0.32, type: 'sine', gain: 0.13, attack: 0.06 });
    s.tone({ freq: 804, to: 672, dur: 0.26, type: 'sine', gain: 0.022, attack: 0.07 });
    s.hiss({ dur: 0.08, type: 'bandpass', freq: 620, gain: 0.016, q: 1.2 });
  },

  /*
   * KIRJOITUSKONEEN RIVINVAIHTOKELLO pöllön vastauksen valmistuessa
   * (omistajan tilaus 13.8.2026: *"kun pöllö on valmis, voisi kuulua
   * bling ääni joka kuuluu kun kirjoituskone vaihtaa riviä"*).
   *
   * Marginaalikello on pieni lyöty kuppi: kirkas, lyhyt ja YKSI
   * helähdys. Kaksi osaa, koska kumpikin tekee eri työn — FM-kilahdus
   * on vasaran isku ja bell sen sointi. Taajuus 1480 Hz on kokeilluista
   * (1300 / 1480 / 1600) uskottavin: 1300 kuulosti ovikellolta ja 1600
   * jo kalliolta. Sointi on lyhyt (0,5 s), jottei se jää soimaan
   * vastauksen päälle.
   */
  typeBell: (s) => {
    s.ding({ freq: 1480, ratio: 2.4, index: 420, dur: 0.12, gain: 0.06 });
    s.bell({ freq: 1480, dur: 0.5, gain: 0.085 });
  },

  /*
   * Kartan zoomaus: kompaktikameran zoomimoottori (omistajan toive —
   * ensimmäinen versio kuulosti liikaa möyriseltä jyrinältä). Oikeassa
   * kamerassa kuuluu pieni sähkömoottori vaihteiston läpi:
   *  1. naksahdus, kun linssi lähtee liikkeelle,
   *  2. purevan sörisevä kanttiaalto ~220 Hz kaistanpäästön läpi —
   *     moottorin oma sävel, joka kiihtyy alussa ja hidastuu lopussa,
   *  3. hammaspyörän ohut vinkuna noin viisinkertaisella taajuudella,
   *  4. nopea aaltoilu voimakkuudessa = kommutaattorin sörinä,
   *  5. kuiva muovinen kohina ja lopetusnaksahdus, kun linssi pysähtyy.
   *
   * Kierrokset seuraavat zoomausliu'un vauhtia (omistajan toive): sama
   * pehmennyskäyrä kuin kartalla, joten moottori kiihtyy ja hidastuu
   * täsmälleen kuvan mukana. Kesto tulee kutsujalta.
   */
  zoom: (s, { kesto = 3.6 } = {}) => {
    const ctx = s.ensureContext();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    // Vauhtikäyrä taajuudeksi: matalin arvo joutokäynti, korkein täysi
    // vauhti. setValueCurveAtTime piirtää saman kaaren kuin liuku.
    const kaari = (matala, korkea) => Float32Array.from(
      ZOOM_VAUHTI, (v) => {
        const k = (v - ZOOM_VAUHTI_MIN) / (ZOOM_VAUHTI_MAX - ZOOM_VAUHTI_MIN || 1);
        return matala + (korkea - matala) * k;
      },
    );

    // Moottorin sävel: kanttiaalto on paljon puremampi kuin saha-aalto
    // alipäästön takana, ja juuri sitä pieni zoomimoottori kuulostaa.
    const osc = ctx.createOscillator();
    osc.type = 'square';
    /*
     * Taajuudet laskettu reilusti (omistajan toive: "madalla ääniefektin
     * taajuutta reilusti"). Moottori 106-201 Hz -> 62-118 Hz, eli
     * suunnilleen oktaavin verran alas. Sävelkulku ja kaari säilyvät
     * samoina, joten ääni on sama moottori mutta raskaampi ja
     * isompikokoinen — ja se sopii hitaampaan liukuun, joka on nyt
     * pidempi (ui.js ZOOM_MS).
     */
    osc.frequency.setValueCurveAtTime(kaari(62, 118), t0, kesto);

    // Kaistanpäästö jättää jäljelle keskialueen sörinän: matalat jyrinät
    // pois, jotta ääni tulee koneistosta eikä kellarista.
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 1.1;
    bp.frequency.setValueCurveAtTime(kaari(430, 625), t0, kesto);

    // Hammaspyörän vinkuna: ohut sävel moottorin yläpuolella.
    const vinku = ctx.createOscillator();
    vinku.type = 'triangle';
    vinku.frequency.setValueCurveAtTime(kaari(312, 590), t0, kesto);
    const vinkuTaso = ctx.createGain();
    vinkuTaso.gain.value = 0.055;

    // Kommutaattorin sörinä omana kertoimenaan, jottei LFO vie
    // voimakkuutta negatiiviseksi.
    const sorina = ctx.createGain();
    sorina.gain.value = 0.78;
    const lfo = ctx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.setValueCurveAtTime(kaari(50, 88), t0, kesto);
    const lfoTaso = ctx.createGain();
    lfoTaso.gain.value = 0.2;
    lfo.connect(lfoTaso).connect(sorina.gain);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.16, t0 + 0.05);
    g.gain.setValueAtTime(0.16, t0 + Math.max(0.1, kesto - 0.13));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + kesto);

    osc.connect(bp).connect(sorina);
    vinku.connect(vinkuTaso).connect(sorina);
    sorina.connect(g).connect(s.bus);
    for (const o of [osc, vinku, lfo]) {
      o.start(t0);
      o.stop(t0 + kesto + 0.05);
    }

    // Muovinen kuiva kohina koneiston taustalla. Naksahdukset otettu
    // pois (omistajan toive): kuuluu vain moottori.
    s.hiss({ dur: kesto, type: 'bandpass', freq: 2200, sweepTo: 2900, gain: 0.035, q: 0.8 });
  },

  // Noppa
  dieTick: (s) => s.knock({ freqs: [420, 680], dur: 0.05, gain: 0.09, q: 12 }),
  dieLand: (s) => {
    // Puinen noppa pergamentille: matalat ominaistaajuudet ja pehmeä kahahdus.
    s.knock({ freqs: [180, 290, 430], dur: 0.2, gain: 0.22, q: 8 });
    s.hiss({ dur: 0.09, type: 'highpass', freq: 1600, gain: 0.045 });
  },

  // Liikkuminen
  step: (s) => s.knock({ freqs: [260, 390], dur: 0.06, gain: 0.055, q: 7 }),
  arrive: (s) => {
    s.tone({ freq: 440, to: 300, dur: 0.16, type: 'triangle', gain: 0.14 });
    s.hiss({ dur: 0.06, freq: 1400, gain: 0.05 });
  },
  ferry: (s) => {
    // Sumutorvi: kaksi hieman eri vireistä kanttiaaltoa alipäästön läpi.
    // Pieni vire-ero saa äänen huojumaan kuten oikea torvi.
    s.tone({ freq: 116, dur: 0.9, type: 'square', gain: 0.07 });
    s.tone({ freq: 119, dur: 0.9, type: 'square', gain: 0.06, delay: 0.01 });
    s.hiss({ dur: 0.7, type: 'lowpass', freq: 420, sweepTo: 180, gain: 0.06, delay: 0.05 });
  },
  // Lyhyt lähtöääni; varsinainen potkurihurina on sfx.startFlight().
  flight: (s) => {
    s.hiss({ dur: 0.7, type: 'lowpass', freq: 300, sweepTo: 900, gain: 0.06, q: 0.7 });
    s.tone({ freq: 96, to: 150, dur: 0.6, type: 'sawtooth', gain: 0.045 });
  },

  // Tietovisa
  correct: (s) => {
    // Lyhyt puhdas suuri terssi — ei fanfaaria, vain hyväksyvä nyökkäys.
    s.bell({ freq: 659, dur: 0.5, gain: 0.11 });
    s.bell({ freq: 830, dur: 0.6, gain: 0.09, delay: 0.05 });
  },
  wrong: (s) => {
    // Vaimea matala "hmph": ei piippausta eikä pilkkaa, vain pettymys.
    s.knock({ freqs: [120, 172], dur: 0.34, gain: 0.16, q: 5 });
    s.tone({ freq: 138, to: 104, dur: 0.3, type: 'sine', gain: 0.08, delay: 0.02 });
  },

  // Tiimalasi ja vihjeet
  hint: (s) => {
    s.hiss({ dur: 0.26, type: 'highpass', freq: 1100, sweepTo: 2600, gain: 0.06 });
    s.tone({ freq: 660, dur: 0.22, type: 'sine', gain: 0.09, delay: 0.06 });
  },
  tick: (s) => s.hiss({ dur: 0.025, freq: 3200, gain: 0.03, q: 2.4 }),
  /*
   * Kuplan varapolku ilman äänitettä: hyvin lyhyt pehmeä paperin
   * kahahdus (ks. REAL_PLAYERS.kupla). Ei kelloa eikä sointua — kupla
   * ei ilmoita mitään, se vain ilmestyy.
   */
  kupla: (s) => s.hiss({
    dur: 0.09, type: 'highpass', freq: 1800, sweepTo: 2600, gain: 0.025, q: 0.8,
  }),
  timeout: (s) => {
    s.tone({ freq: 300, to: 90, dur: 0.7, type: 'triangle', gain: 0.15 });
    s.hiss({ dur: 0.5, type: 'lowpass', freq: 900, sweepTo: 200, gain: 0.07 });
  },

  // Aarteen paljastus
  flip: (s) => s.hiss({ dur: 0.55, freq: 380, sweepTo: 2100, gain: 0.08, q: 0.9 }),
  clack: (s, { voima = 1 } = {}) => {
    // Passin leima: matala läiskä ja kuiva klikki. `voima` kuten
    // äänitteellisessä versiossa (REAL_PLAYERS.clack).
    s.tone({ freq: 80, to: 62, dur: 0.16, type: 'sine', gain: 0.17 * voima });
    s.knock({ freqs: [900, 1500], dur: 0.05, gain: 0.09 * voima, q: 6 });
  },
  star: (s) => {
    // Soittorasia: epäharmoniset kellot nousevassa sarjassa.
    [523, 659, 784, 1046].forEach((freq, i) => {
      s.bell({ freq, dur: i === 3 ? 1.6 : 0.7, gain: 0.13, delay: i * 0.1 });
    });
    s.hiss({ dur: 0.9, type: 'highpass', freq: 3000, sweepTo: 6000, gain: 0.04, delay: 0.25 });
  },
  gem: (s) => s.bell({ freq: 880, dur: 1.2, gain: 0.13 }),
  robber: (s) => {
    s.tone({ freq: 130, to: 62, dur: 0.55, type: 'sawtooth', gain: 0.17 });
    s.tone({ freq: 196, to: 185, dur: 0.5, type: 'square', gain: 0.06, delay: 0.04 });
    s.hiss({ dur: 0.3, type: 'lowpass', freq: 700, sweepTo: 220, gain: 0.08 });
  },
  empty: (s) => s.tone({ freq: 210, to: 175, dur: 0.14, type: 'sine', gain: 0.1 }),

  // Muut tapahtumat
  coin: (s) => {
    // Metallinen kilahdus ja pyörähdys pöydällä.
    s.ding({ freq: 1180, ratio: 3.5, index: 620, dur: 0.28, gain: 0.12 });
    s.ding({ freq: 1560, ratio: 3.5, index: 380, dur: 0.34, gain: 0.07, delay: 0.07 });
  },
  stuck: (s) => s.tone({ freq: 175, to: 140, dur: 0.22, type: 'square', gain: 0.1 }),
  turn: (s) => s.tone({ freq: 392, dur: 0.1, type: 'sine', gain: 0.07 }),
  win: (s) => {
    [523, 659, 784, 1046, 1318].forEach((freq, i) => {
      s.tone({ freq, dur: i === 4 ? 1.1 : 0.26, type: 'triangle', gain: 0.17, delay: i * 0.14 });
    });
    s.tone({ freq: 261, dur: 1.2, type: 'sine', gain: 0.1, delay: 0.56 });
  },
};

export const sfx = new Sound();

/*
 * Tehosteet, syntetisoitu äänimaisema ja mediakanavan ankkuri liittyvät
 * taustavahtiin (js/aani-tausta.js). Rekisteröinti on tässä eikä
 * rakentimessa, jotta luokan voi yhä luoda testissä ilman vahtia.
 */
lisaaTaustaVaimennus({
  hiljenna: () => sfx.taukoaTaustalle(),
  palauta: () => sfx.jatkaEtualalle(),
});

/**
 * Aarteen paljastuksen ääni laattatyypin mukaan.
 *
 * Pääaarteella on oma fanfaarinsa ja ryöstäjällä oma iskunsa; kaikki
 * muut aarteet — mantereen aarre ja paikallisaarteet — jakavat saman
 * kilahduksen ('gem'), jottei jokainen uusi laattatyyppi kasvattaisi
 * offline-pakettia omalla mp3:llaan. Sisäinen 'empty' on yhä oma
 * äänensä, jottei pöllön korvaama laatta kilahtaisi aarteena.
 */
export function treasureSound(type) {
  if (type === 'star') return 'star';
  if (type === 'robber') return 'robber';
  if (type === 'empty') return 'empty';
  return 'gem';
}
