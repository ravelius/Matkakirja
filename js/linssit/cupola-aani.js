/*
 * ══════════════════════════════════════════════════════════════════
 * CUPOLAN ÄÄNI — ASEMAN HUMINA
 * ══════════════════════════════════════════════════════════════════
 *
 * Kun ISS-kyydissä istutaan Cupolan ikkunassa (js/linssit/
 * iss-kyyti-nakyma.js, `kyyti.tila === TILA.ikkuna`), soi aseman humina:
 * 90 s:n saumaton silmukka, kokonaan generoitu (Linssiseppä 2, v2: ruskea
 * kohina 22–160 Hz, vaaleanpunainen 180–1100 Hz, pohjasävy 41 Hz ja
 * yläsävelet), −26 LUFS. Soitetaan puskurista `AudioBufferSourceNode`illa
 * (loop = true) täsmälleen kuten js/linssit/satelliitti-aani.js soittaa
 * linssin huminan: näytetarkka kierros, ei saumaa.
 *
 * EI RADIOTA (omistaja 3.10.2026 klo 06.3x: "ottaa iss linssin huminasta
 * Ratina pois. Pidä pelkkä generoitu kohina jossa matala taajuus mukana."):
 * NASA:n EVA 38 -radiosilmukka ja v1-humina (NASA Life On Station +
 * synteesi), joista rätinä tuli, on poistettu.
 *
 * Ikkunasta poistuttaessa tai kyydin/linssin purkautuessa humina
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
 *     koko ajan. Kun Pulu tai kertoja puhuu, humina painuu 70 %:iin —
 *     pohjaväri saa jäädä. Painuminen 400 ms, palautus 1,2 s.
 *
 * Cupolassa linssin oma astronautin humina (satelliitti-aani.js) on
 * vaiennettu: kaksi aseman huminaa päällekkäin olisi puuroa. Se palaa,
 * kun ikkunasta palataan muualle linssiin.
 *
 * AUTOPLAY-ESTO EI OLE VIRHE: jos konteksti nukkuu, odotetaan
 * `kuunteleReitityksenAvautumista`-vahtia kuten satelliitti-aani.js.
 * Puuttuva tiedosto (404, purkuvirhe) on normaali tila: humina jää
 * pois tälle istunnolle eikä konsoliin kirjoiteta mitään.
 */
import { kuunteleReitityksenAvautumista, musiikkiKonteksti } from '../musiikkivahvistin.js';
import { lisaaVaistaja } from '../ambience-stream.js';
import { LINSSIN_HILJENNYS } from '../siirtymamusiikki.js';
import { sfx, AANIVALINTA_TAPAHTUMA } from '../sound.js';
import { kehittajanKerroin, kuunteleKehittajanKerrointa } from '../kehittajan-voimat.js';
import { asetaAstronautinHuminaPois } from './satelliitti-aani.js';

/* Versioitu ämpärikansio: uusi äänite saa uuden kansion, ei vanhan nimeä (v2 = generoitu, 3.10.2026). */
export const CUPOLA_HUMINA = 'https://media.matkakirja.app/aanet/cupola/v2/cupola-humina-gen-90s.wav';

/*
 * HUMINAN VOIMA (tilaus 30.9.2026): tiedosto on normalisoitu −26 LUFS:iin.
 * `vaisto` on kerroin puheen aikana. Kuulokokeen nupit.
 */
export const CUPOLA_KERROKSET = {
  humina: { voima: 0.9, vaisto: 0.7, nousuMs: 2000 },
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

/** Humina käyntiin, jos konteksti on hereillä ja kanava auki. */
function kaynnista() {
  if (!paalla || !kanavaPaalla()) return;
  const ctx = musiikkiKonteksti();
  if (!ctx || ctx.state !== 'running') return;
  kaynnistaHumina(ctx);
}

function lopeta(kestoMs) {
  lopetaHumina(kestoMs);
}

/** Soivan huminan taso uudelleen (liuku, väistö). */
function paivitaTasot(kestoMs) {
  if (humina) liuta(humina.gain, humina.ctx, taso('humina'), kestoMs);
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
