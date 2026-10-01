/*
 * ══════════════════════════════════════════════════════════════════
 * CUPOLAN ÄÄNI — ASEMAN HUMINA JA AVARUUS–MAA-RADIO
 * ══════════════════════════════════════════════════════════════════
 *
 * Kun ISS-kyydissä istutaan Cupolan ikkunassa (js/linssit/
 * iss-kyyti-nakyma.js, `kyyti.tila === TILA.ikkuna`), soi kaksi
 * kerrosta:
 *
 *   humina  90 s:n saumaton silmukka aseman sisätilasta (NASA:n Life On
 *           Station -materiaali ja pelin oma synteettinen humina),
 *           −26 LUFS. Soitetaan puskurista `AudioBufferSourceNode`illa
 *           (loop = true) täsmälleen kuten js/linssit/satelliitti-aani.js
 *           soittaa linssin huminan: näytetarkka kierros, ei saumaa.
 *   radio   23 minuutin aito avaruus–maa-radiosilmukka (NASA, EVA 38,
 *           6.1.2017), −20 LUFS, 11 Mt. Soitetaan `<audio>`-elementillä,
 *           joka on reititetty `createMediaElementSource` → GainNode →
 *           ctx.destination. Elementti hakee tiedoston HTTP-
 *           osapyynnöillä (206) — 11 megatavua ei ladata etukäteen
 *           yhden ikkunakäynnin takia. Jokainen käynnistys alkaa
 *           satunnaisesta kohdasta, joten radio ei toistu aina samana.
 *
 * Ikkunasta poistuttaessa tai kyydin/linssin purkautuessa molemmat
 * häivytetään ja pysäytetään.
 *
 * ------------------------------------------------------------------
 * TASO TULEE SAMASTA TOTUUDESTA KUIN LINSSIN HUMINA
 * ------------------------------------------------------------------
 *
 *   • pelin äänikonteksti (js/musiikkivahvistin.js musiikkiKonteksti)
 *     — EI omaa AudioContextia: toinen konteksti kilpailisi iOS:n
 *     äänisessiosta;
 *   • taustaäänikanava (omistaja 20.9.2026, ks. satelliitti-aani.js):
 *     kytkin js/sound.js `sfx.enabled`, taso rattaan "taustaäänet"-liuku
 *     (js/kehittajan-voimat.js kerroin 'tausta', katto 1);
 *   • puheen väistö (js/ambience-stream.js lisaaVaistaja) samalla
 *     poikkeuksella kuin linssin huminalla: linssin OMA hiljennys
 *     (LINSSIN_HILJENNYS) ei väistä, muuten Cupola soisi väistettynä
 *     koko ajan.
 *
 * VÄISTÖ ON KAKSITILAINEN, EI KERTOIMEN KOPIO. Kun Pulu tai kertoja
 * puhuu, radio painuu 15 %:iin (puhe ja radiopuhe päällekkäin olisi
 * sekamelskaa) ja humina 70 %:iin — pohjaväri saa jäädä. Painuminen
 * 400 ms, palautus 1,2 s.
 *
 * Cupolassa linssin oma astronautin humina (satelliitti-aani.js) on
 * vaiennettu: kaksi aseman huminaa päällekkäin olisi puuroa. Se palaa,
 * kun ikkunasta palataan muualle linssiin.
 *
 * AUTOPLAY-ESTO EI OLE VIRHE: jos konteksti nukkuu, odotetaan
 * `kuunteleReitityksenAvautumista`-vahtia kuten satelliitti-aani.js.
 * Puuttuva tiedosto (404, purkuvirhe) on normaali tila: kerros jää
 * pois tälle istunnolle eikä konsoliin kirjoiteta mitään.
 */
import { kuunteleReitityksenAvautumista, musiikkiKonteksti } from '../musiikkivahvistin.js';
import { lisaaVaistaja } from '../ambience-stream.js';
import { LINSSIN_HILJENNYS } from '../siirtymamusiikki.js';
import { sfx, AANIVALINTA_TAPAHTUMA } from '../sound.js';
import { kehittajanKerroin, kuunteleKehittajanKerrointa } from '../kehittajan-voimat.js';
import { asetaAstronautinHuminaPois } from './satelliitti-aani.js';

/* Versioitu ämpärikansio (v1): uusi äänite saa uuden kansion, ei vanhan nimeä. */
export const CUPOLA_HUMINA = 'https://media.matkakirja.app/aanet/cupola/v1/cupola-humina-90s.wav';
export const CUPOLA_RADIO = 'https://media.matkakirja.app/aanet/cupola/v1/cupola-radio-eva38-23min.mp3';

/** Radiosilmukan pituus sekunteina (23 min). */
export const RADION_KESTO_S = 1380;
/** Satunnainen aloitus jättää loppuun ainakin näin monta sekuntia. */
const RADION_LOPPUVARA_S = 5;

/*
 * KERROSTEN VOIMAT (tilaus 30.9.2026). Tiedostot on normalisoitu
 * (humina −26 LUFS, radio −20 LUFS). Radion kerroin on 6 dB huminan
 * kerrointa alempana (0,45 / 0,9), jotta radio kuuluu taustalla eikä
 * päälle. `vaisto` on kerroin puheen aikana. Kuulokokeen nupit.
 */
export const CUPOLA_KERROKSET = {
  humina: { voima: 0.9, vaisto: 0.7, nousuMs: 2000 },
  radio: { voima: 0.45, vaisto: 0.15, nousuMs: 3000 },
};

/** Ulosfeidi ikkunasta poistuttaessa. */
const LASKU_MS = 1000;
/** Väistön painuminen ja palautus. */
const VAISTO_ALAS_MS = 400;
const VAISTO_YLOS_MS = 1200;

/**
 * Kerroksen tavoitetaso — PUHDAS funktio, jotta taso on testattavissa
 * ilman selainta: voima × taustaäänten liuku (katto 1) × väistö, ja
 * 0 kun taustaäänet on kytketty pois.
 */
export function cupolanTaso(nimi, { paalla = true, tausta = 1, vaistossa = false } = {}) {
  const kerros = CUPOLA_KERROKSET[nimi];
  if (!kerros || !paalla) return 0;
  const saadin = Math.max(0, Math.min(1, Number(tausta) || 0));
  return kerros.voima * saadin * (vaistossa ? kerros.vaisto : 1);
}

/** Satunnainen aloituskohta radiosilmukassa: [0, 1375] s. */
export function radionAloituskohta(satunnainen = Math.random()) {
  const s = Math.max(0, Math.min(1, Number(satunnainen) || 0));
  return s * (RADION_KESTO_S - RADION_LOPPUVARA_S);
}

/**
 * Onko puheen väistö voimassa? Linssin oma hiljennys ei väistä
 * (sama sääntö kuin satelliitti-aani.js astronautinTaso).
 */
export function onVaistossa(kerroin, tiedot) {
  const syyt = tiedot?.syyt ?? [];
  const oma = syyt.includes(LINSSIN_HILJENNYS) ? (tiedot?.pohja ?? kerroin) : kerroin;
  return Number(oma) < 0.999;
}

/* ---- Tila ---------------------------------------------------------- */

/** Pyydetty Cupola-tila (paivitaUi). */
let paalla = false;
let vaistossa = false;
let irrotaVahti = null;

/** Soiva humina: { lahde, gain, ctx } tai null. */
let humina = null;
/** Huminan purettu puskuri istunnon ajaksi (lupaus). */
let huminaPuskuri = null;
let huminaPuuttuu = false;

/*
 * RADION ELEMENTTI ELÄÄ KOKO ISTUNNON. `createMediaElementSource`
 * voidaan kutsua elementille vain kerran, joten elementti ja sen
 * solmut rakennetaan ensimmäisellä käynnillä ja käytetään uudelleen.
 * `sukupolvi` estää vanhan pysäytysajastimen pysäyttämästä uutta soittoa.
 */
let radio = null; // { audio, lahde, gain, ctx }
let radioSoi = false;
let radioPuuttuu = false;
let sukupolvi = 0;

const kanavaPaalla = () => Boolean(sfx?.enabled);
const taso = (nimi) => cupolanTaso(nimi, {
  paalla: kanavaPaalla(),
  tausta: kehittajanKerroin('tausta'),
  vaistossa,
});

/** Pehmeä gain-ramppi äänisäikeellä (kuten satelliitti-aani.js liuta). */
const liuta = (gain, ctx, kohde, kestoMs) => {
  try {
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(Math.max(0, gain.gain.value), ctx.currentTime);
    gain.gain.linearRampToValueAtTime(Math.max(0, kohde), ctx.currentTime + Math.max(1, kestoMs) / 1000);
  } catch { /* konteksti kiinni — taso jää ennalleen */ }
};

/** Huminan tavut kerran istunnossa; tavallinen fetch kuten satelliitti-aani.js. */
function haeHuminaPuskuri(ctx) {
  if (huminaPuuttuu) return Promise.resolve(null);
  if (huminaPuskuri) return huminaPuskuri;
  huminaPuskuri = (async () => {
    const vastaus = await fetch(CUPOLA_HUMINA, { mode: 'cors' });
    if (!vastaus.ok) throw new Error('http');
    return ctx.decodeAudioData(await vastaus.arrayBuffer());
  })().catch(() => {
    huminaPuuttuu = true;
    huminaPuskuri = null;
    return null;
  });
  return huminaPuskuri;
}

async function kaynnistaHumina(ctx) {
  if (humina || typeof ctx.createBufferSource !== 'function') return;
  const puskuri = await haeHuminaPuskuri(ctx);
  /* Lataus kesti: ikkunasta on voitu poistua tai kytkin sammuttaa. */
  if (!puskuri || !paalla || !kanavaPaalla() || humina) return;
  try {
    const lahde = ctx.createBufferSource();
    lahde.buffer = puskuri;
    lahde.loop = true;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    lahde.connect(gain).connect(ctx.destination);
    lahde.start();
    humina = { lahde, gain, ctx };
    liuta(gain, ctx, taso('humina'), CUPOLA_KERROKSET.humina.nousuMs);
  } catch { /* konteksti kaatui — Cupola toimii ilman ääntä */ }
}

function lopetaHumina(kestoMs) {
  const soiva = humina;
  if (!soiva) return;
  humina = null;
  liuta(soiva.gain, soiva.ctx, 0, kestoMs);
  setTimeout(() => {
    try { soiva.lahde.stop(); } catch { /* jo pysäytetty */ }
    try { soiva.lahde.disconnect(); } catch { /* jo irti */ }
    try { soiva.gain.disconnect(); } catch { /* jo irti */ }
  }, kestoMs + 60);
}

/** Radion elementti ja solmut, rakennetaan kerran. */
function radionSoitin(ctx) {
  if (radio && radio.ctx === ctx) return radio;
  if (typeof document === 'undefined' || typeof ctx.createMediaElementSource !== 'function') return null;
  try {
    const audio = document.createElement('audio');
    audio.crossOrigin = 'anonymous';
    audio.preload = 'metadata';
    audio.loop = true;
    audio.src = CUPOLA_RADIO;
    audio.addEventListener('error', () => {
      radioPuuttuu = true;
      lopetaRadio(0);
    });
    const lahde = ctx.createMediaElementSource(audio);
    const gain = ctx.createGain();
    gain.gain.value = 0;
    lahde.connect(gain).connect(ctx.destination);
    radio = { audio, lahde, gain, ctx };
    return radio;
  } catch {
    radioPuuttuu = true;
    return null;
  }
}

function kaynnistaRadio(ctx) {
  if (radioSoi || radioPuuttuu) return;
  const soitin = radionSoitin(ctx);
  if (!soitin) return;
  const oma = ++sukupolvi;
  radioSoi = true;
  const { audio } = soitin;
  /*
   * SATUNNAINEN ALOITUS JOKA KERTA. Ennen metatietoja asetettu
   * currentTime ei aina pidä, joten se asetetaan uudelleen
   * loadedmetadata-hetkellä, jos kohta ei tarttunut.
   */
  const kohta = radionAloituskohta();
  try { audio.currentTime = kohta; } catch { /* metatiedot puuttuvat vielä */ }
  if (audio.readyState < 1) {
    audio.addEventListener('loadedmetadata', () => {
      if (oma !== sukupolvi) return;
      if (Math.abs(audio.currentTime - kohta) > 1) {
        try { audio.currentTime = kohta; } catch { /* ei haettavissa */ }
      }
    }, { once: true });
  }
  gainNollaan(soitin);
  Promise.resolve(audio.play?.()).catch(() => {
    /* Autoplay-esto tai verkkovirhe: radio jää pois, humina soi. */
    if (oma === sukupolvi) radioSoi = false;
  });
  liuta(soitin.gain, ctx, taso('radio'), CUPOLA_KERROKSET.radio.nousuMs);
}

function gainNollaan(soitin) {
  try {
    soitin.gain.gain.cancelScheduledValues(soitin.ctx.currentTime);
    soitin.gain.gain.setValueAtTime(0, soitin.ctx.currentTime);
  } catch { /* konteksti kiinni */ }
}

function lopetaRadio(kestoMs) {
  if (!radio || !radioSoi) { radioSoi = false; return; }
  radioSoi = false;
  const oma = ++sukupolvi;
  const soitin = radio;
  liuta(soitin.gain, soitin.ctx, 0, kestoMs);
  const pysayta = () => {
    if (oma !== sukupolvi) return; // uusi soitto ehti alkaa
    try { soitin.audio.pause(); } catch { /* jo pysähdyksissä */ }
  };
  if (kestoMs <= 0) pysayta();
  else setTimeout(pysayta, kestoMs + 60);
}

/** Molemmat kerrokset käyntiin, jos konteksti on hereillä ja kanava auki. */
function kaynnista() {
  if (!paalla || !kanavaPaalla()) return;
  const ctx = musiikkiKonteksti();
  if (!ctx || ctx.state !== 'running') return;
  kaynnistaHumina(ctx);
  kaynnistaRadio(ctx);
}

function lopeta(kestoMs) {
  lopetaHumina(kestoMs);
  lopetaRadio(kestoMs);
}

/** Soivien kerrosten taso uudelleen (liuku, väistö). */
function paivitaTasot(kestoMs) {
  if (humina) liuta(humina.gain, humina.ctx, taso('humina'), kestoMs);
  if (radio && radioSoi) liuta(radio.gain, radio.ctx, taso('radio'), kestoMs);
}

/* ---- Julkinen rajapinta --------------------------------------------- */

/**
 * Cupola-ikkuna päälle tai pois. Kutsutaan iss-kyyti-nakyma.js
 * paivitaUi:sta joka tilanvaihdossa; sama arvo uudelleen ei tee mitään,
 * eikä `false` ennen ensimmäistä käynnistystä tee mitään.
 */
export function asetaCupola(auki) {
  const uusi = Boolean(auki);
  if (uusi === paalla) return;
  paalla = uusi;
  asetaAstronautinHuminaPois(uusi);
  irrotaVahti?.();
  irrotaVahti = null;
  if (uusi) {
    /* Vahti kutsuu heti, jos konteksti on jo käynnissä. */
    irrotaVahti = kuunteleReitityksenAvautumista(() => kaynnista());
  } else {
    lopeta(LASKU_MS);
  }
}

/** Kyyti tai linssi puretaan: häivytys ja pysäytys. */
export function puraCupola() {
  asetaCupola(false);
}

/** Mittari savukkeille. */
export function cupolaAaniTila() {
  return {
    paalla,
    vaistossa,
    humina: {
      soi: Boolean(humina),
      taso: humina ? Number(humina.gain.gain.value.toFixed(4)) : 0,
      tavoite: Number(taso('humina').toFixed(4)),
      puuttuu: huminaPuuttuu,
    },
    radio: {
      soi: radioSoi,
      taso: radio && radioSoi ? Number(radio.gain.gain.value.toFixed(4)) : 0,
      tavoite: Number(taso('radio').toFixed(4)),
      aika: radio ? Number((radio.audio.currentTime || 0).toFixed(2)) : 0,
      puuttuu: radioPuuttuu,
    },
  };
}

/* ---- Kuuntelijat moduulin latauksessa (kuten satelliitti-aani.js) ---- */

lisaaVaistaja((kerroin, _kesto, tiedot) => {
  const uusi = onVaistossa(kerroin, tiedot);
  if (uusi === vaistossa) return;
  vaistossa = uusi;
  paivitaTasot(uusi ? VAISTO_ALAS_MS : VAISTO_YLOS_MS);
});

kuunteleKehittajanKerrointa('tausta', () => paivitaTasot(200));

if (typeof document !== 'undefined') {
  /* Taustaäänten kytkin kesken Cupolan: pois vaientaa, päälle palauttaa. */
  document.addEventListener(AANIVALINTA_TAPAHTUMA, () => {
    if (!paalla) return;
    if (kanavaPaalla()) kaynnista();
    else lopeta(LASKU_MS);
  });
}
