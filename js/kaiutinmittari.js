/*
 * KAIUTTIMEN KOLME KAARTA VU-MITTARINA (omistaja 15.9.2026 klo 05.10
 * UTC, iPhone-kuva Dubrovnikin saapumisluennasta, sanatarkasti: *"onko
 * mahdollista animoida kaiuttimen kolmea kaarta elamaan Vu mittarin
 * tapaan ja ottaa feidaus animaatio siita pois?"*).
 *
 * MIKÄ TÄMÄ KORVAA. Luennan merkki oli koko kuvakkeen opacity/scale-syke
 * (css `@keyframes fact-kaiutin-syke`). Omistaja näki sen häivytyksenä;
 * tilalle tulee mittari, jossa kaiuttimen KOLME KAARTA syttyvät ja
 * sammuvat luennan tahdissa. Kuvake itse ei liiku eikä häivy.
 *
 * ── KAKSI LÄHDETTÄ, SAMA KUVA RUUDULLA ─────────────────────────────
 *
 *   1. TODELLINEN TASO, kun luenta kulkee Web Audion läpi. iOS ei
 *      tottele <audio>-elementin volumea, joten luenta reititetään
 *      GainNoden kautta (js/luenta.js liitaLuennanVahvistin →
 *      js/musiikkivahvistin.js liitaMusiikkiin). Sama ketju sisältää jo
 *      AnalyserNoden (`audio.aaniMittari`), joten taso saadaan
 *      ILMAISEKSI — mitään ei lisätä äänigraafiin tätä varten.
 *   2. AJASTETTU KUVIO, kun reititystä ei ole (työpöytäselaimet, joissa
 *      elementin oma volume toimii). Kuvio on hillitty ja hidas: se
 *      kertoo "ääni käy", ei esitä aaltomuotoa.
 *
 * ── MIKSI KOLME TASOA EIKÄ LIUKUVA ARVO ────────────────────────────
 *
 * Kaaria on kolme, joten mittarissa on neljä tilaa (0–3 palavaa). Tila
 * vaihtuu vain kun luku vaihtuu, eli DOM:iin kosketaan korkeintaan
 * muutaman kerran sekunnissa, vaikka silmukka pyörii joka kehyksellä.
 *
 * ── EI SUODATTIMIA (iOS-sääntö, tests/rules.test.mjs) ──────────────
 *
 * Kaaret vaihtavat vain `opacity`-arvoa luokan kautta. Ei blur-, ei
 * drop-shadow- eikä muutakaan suodatinta, ei myöskään skaalausta.
 */

/** Kaaria kaiuttimessa — sama luku kuin index.html:n poluissa. */
export const KAARIA = 3;

/** Ajastetun kuvion jakso: yksi nousu ja lasku (ms). */
const KUVION_JAKSO_MS = 900;

/**
 * Analysaattorin lukemien tasoitus: uusi lukema painaa tämän verran.
 * Ilman tasoitusta kaaret värisisivät puheen tavurajoilla.
 */
const TASOITUS = 0.35;

/** Tasot, joilla kaari syttyy analysaattorin RMS:llä (0…1). */
const KYNNYKSET = [0.012, 0.045, 0.11];

/**
 * Ajastetun kuvion omat kynnykset (0…1).
 *
 * MITATTU SYY OMILLE KYNNYKSILLE: kun kuvion 0…1 kuvattiin RMS:n
 * asteikolle, mittari jumittui kahteen palavaan kaareen — kolmas vaati
 * yli 0,8:n huipun ja nolla alle 0,09:n pohjan, eikä kahden siniaallon
 * summa käy siellä kuin harvoin (mitattu Chromiumilla 15.9.2026:
 * kolme näytettä 320 ms:n välein antoi 110 → 110 → 110). Omat,
 * tasavälisemmät kynnykset käyvät kaikki neljä tilaa läpi.
 */
const KUVION_KYNNYKSET = [0.18, 0.45, 0.72];

/** Käynnissä oleva mittari, tai null. */
let mittariKay = null;

/**
 * Yhden napin kaaret. Haetaan kerran: nappi ei vaihdu pelin aikana,
 * mutta varmuuden vuoksi haku on tilakohtainen.
 */
function haeKaaret(nappi) {
  return [...(nappi?.querySelectorAll?.('.kaiutin-kaari') ?? [])];
}

/** Palavien kaarien määrä tasosta annetuilla kynnyksillä. */
function tasosta(taso, kynnykset) {
  let n = 0;
  for (const kynnys of kynnykset) if (taso >= kynnys) n += 1;
  return n;
}

/**
 * Analysaattorin RMS 0…1, tai null jos mittaria ei ole. Aikatasoinen
 * data riittää eikä vaadi taajuusmuunnosta.
 */
function mittarinTaso(mittari, puskuri) {
  if (!mittari || !puskuri) return null;
  try {
    mittari.getByteTimeDomainData(puskuri);
  } catch {
    return null;
  }
  let summa = 0;
  for (let i = 0; i < puskuri.length; i += 1) {
    const poikkeama = (puskuri[i] - 128) / 128;
    summa += poikkeama * poikkeama;
  }
  return Math.sqrt(summa / puskuri.length);
}

/**
 * Ajastettu kuvio: kaksi eri mittaista siniaaltoa päällekkäin, jotta
 * kuvio ei toistu tasan joka jaksolla eikä näytä metronomilta.
 */
function kuvionTaso(kulunut) {
  const a = Math.sin((kulunut / KUVION_JAKSO_MS) * Math.PI * 2);
  const b = Math.sin((kulunut / (KUVION_JAKSO_MS * 1.7)) * Math.PI * 2);
  // 0…1, painopiste keskellä: kaikki kolme kaarta palavat vain huipuilla.
  return Math.max(0, Math.min(1, 0.5 + 0.34 * a + 0.16 * b));
}

/** Sytytä n ensimmäistä kaarta, sammuta loput. */
function piirraKaaret(kaaret, n) {
  for (let i = 0; i < kaaret.length; i += 1) {
    kaaret[i].classList.toggle('palaa', i < n);
  }
}

/**
 * MITTARI KÄYNTIIN. Kutsutaan luentavahdista (js/ui.js) heti kun
 * kertoja on äänessä. Toistuva kutsu samalle napille ei tee mitään —
 * vahti kysyy tilaa 200 ms:n välein.
 *
 * @param {?Element} nappi kaiutinnappi (#fact-kuuntele)
 * @param {() => ?AnalyserNode} [haeMittari] luennan analysaattori, jos on
 * @returns {boolean} lähtikö mittari käyntiin tällä kutsulla
 */
export function kaynnistaKaiutinmittari(nappi, haeMittari = null) {
  if (!nappi || typeof globalThis.requestAnimationFrame !== 'function') return false;
  if (mittariKay?.nappi === nappi) return false;
  pysaytaKaiutinmittari();
  const kaaret = haeKaaret(nappi);
  if (!kaaret.length) return false;
  const tila = {
    nappi, kaaret, haeMittari, kahva: 0, alku: 0, taso: 0, nyt: -1, puskuri: null,
  };
  mittariKay = tila;
  const askel = (aika) => {
    if (mittariKay !== tila || !nappi.isConnected) return;
    if (!tila.alku) tila.alku = aika;
    const mittari = tila.haeMittari?.() ?? null;
    if (mittari && (!tila.puskuri || tila.puskuri.length !== mittari.fftSize)) {
      tila.puskuri = new Uint8Array(mittari.fftSize);
    }
    const mitattu = mittari ? mittarinTaso(mittari, tila.puskuri) : null;
    /*
     * TASOITUS VAIN ANALYSAATTORILLE. Ajastettu kuvio on jo sileä, ja
     * kehyskohtainen tasoitus söi sen: kun kartta kuormittaa ruudun-
     * päivitystä, kehyksiä tulee 5–10 sekunnissa, jolloin 0,35:n
     * tasoitus on jo puolen sekunnin aikavakio — kuvion 0,9 s:n jakso
     * litistyi keskiarvokseen ja mittari jäi yhteen tai kahteen
     * kaareen (mitattu Chromiumilla 15.9.2026: 30 näytettä, vain tilat
     * 100 ja 110). Kuvio ohjaa siis kaaria suoraan.
     */
    const kohde = mitattu === null ? kuvionTaso(aika - tila.alku) : mitattu;
    tila.taso = mitattu === null ? kohde : tila.taso + (kohde - tila.taso) * TASOITUS;
    const n = tasosta(tila.taso, mitattu === null ? KUVION_KYNNYKSET : KYNNYKSET);
    if (n !== tila.nyt) {
      tila.nyt = n;
      piirraKaaret(kaaret, n);
    }
    tila.kahva = globalThis.requestAnimationFrame(askel);
  };
  tila.kahva = globalThis.requestAnimationFrame(askel);
  return true;
}

/**
 * MITTARI SEIS JA KAIKKI KAARET SAMMUKSIIN. Luennan loppu, keskeytys
 * ja mykistys päätyvät kaikki tänne — mykistettynä ääntä ei synny,
 * joten luentavahti näkee saman tilan kuin vaikeneminen.
 *
 * @returns {boolean} oliko mittari käynnissä
 */
export function pysaytaKaiutinmittari() {
  const tila = mittariKay;
  if (!tila) return false;
  mittariKay = null;
  globalThis.cancelAnimationFrame?.(tila.kahva);
  piirraKaaret(tila.kaaret, 0);
  return true;
}

/** Onko mittari juuri nyt käynnissä? (vartijoita ja testejä varten) */
export function kaiutinmittariKaynnissa() {
  return mittariKay !== null;
}
