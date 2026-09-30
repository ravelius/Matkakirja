/*
 * PULUN AVARUUSKÄVELYASUN VALOT (Päätoimittaja 30.9.2026, omistajan tilaus; asu js/livia-eva.js).
 *
 * Asun kolme valokerrosta (kasvovalo visiirin sisällä, kypärälamput, maavalo alta) seuraavat ISS:n valoa
 * Astronautin kamerassa ja ISS:n kyydissä: yöllä (asema maan varjossa) kasvovalo ja lamput vahvoina ja maan
 * valo hämärä, päivällä maan heijastama valo vahvana ja omat valot hillittyinä. Voimakkuudet menevät
 * CSS-muuttujiin --livia-eva-kasvovalo, --livia-eva-kyparalamput ja --livia-eva-maavalo (css/satelliitti.css),
 * jotka periytyvät bodysta Pulun lentonäyttämölle. Kaava on sama kuin natiivin EvaValo ja CupolanValo
 * (Linssit/Ydin/Iss): aurinkoisuus = ISS auringossa 0…1, maavalo = maa alla valaistu 0,15…1.
 */

import { ISS_NYT, SIMUKELLO, auringonAlihajapiste, jdHetkesta } from './iss-rata.js';

const DEG = Math.PI / 180;
const pehmea01 = (t) => { const u = Math.min(1, Math.max(0, t)); return u * u * (3 - 2 * u); };

/** ISS auringossa 0…1 (natiivi CupolanValo.Aurinkoisuus): ylös · aurinko verrattuna maan varjon rajaan. */
export function evaAurinkoisuus(ylosDotAurinko, korkeusKm) {
  const r = 6371 / (6371 + Math.max(0, korkeusKm));
  return pehmea01((ylosDotAurinko + Math.sqrt(Math.max(0, 1 - r * r))) / 0.02 + 0.5);
}

/** Maavalo 0,15…1 (natiivi CupolanValo.Maavalo). */
export const evaMaavalo = (ylosDotAurinko) => 0.15 + 0.85 * pehmea01((ylosDotAurinko + 0.15) / 0.45);

/** Kerrosten peittävyydet 0…1 aurinkoisuudesta ja maavalosta (natiivi EvaValo.Valot). */
export function evaValot(aurinko, maavalo) {
  const s = Math.min(1, Math.max(0, aurinko));
  const m = Math.min(1, Math.max(0, (maavalo - 0.15) / 0.85));
  return { kasvovalo: 1 - 0.65 * s, kyparalamput: 1 - 0.75 * s, maavalo: 0.1 + 0.9 * m };
}

/** Valot hetkellä ms ISS:n alapisteen mukaan (natiivi EvaValo.Nyt). */
export function issEvaValot(ms, issNyt = ISS_NYT) {
  const p = issNyt.paikka(ms);
  const a = auringonAlihajapiste(jdHetkesta(ms));
  const ylos = Math.sin(p.lat * DEG) * Math.sin(a.lat * DEG)
    + Math.cos(p.lat * DEG) * Math.cos(a.lat * DEG) * Math.cos((p.lon - a.lon) * DEG);
  return evaValot(evaAurinkoisuus(ylos, p.korkeusKm), evaMaavalo(ylos));
}

/**
 * Päivittää valot kahdesti sekunnissa (varjon raja ohittuu ~10 s:ssa) linssin elinkaaren ajan; pura() poistaa
 * muuttujat. `testi` = 'yo' | 'paiva' pakottaa kuvaparia varten (?eva=yo|paiva).
 */
export function kaynnistaPulunEvaValo({ doc = document, kello = () => SIMUKELLO.nyt(), valiMs = 500, ikkuna = globalThis, testi = null } = {}) {
  const tyyli = doc?.body?.style;
  if (!tyyli?.setProperty) return { pura() {}, tila: () => null };
  let viime = null;
  const paivita = () => {
    const v = testi === 'yo' ? evaValot(0, 0.15) : testi === 'paiva' ? evaValot(1, 1) : issEvaValot(kello());
    viime = v;
    tyyli.setProperty('--livia-eva-kasvovalo', v.kasvovalo.toFixed(3));
    tyyli.setProperty('--livia-eva-kyparalamput', v.kyparalamput.toFixed(3));
    tyyli.setProperty('--livia-eva-maavalo', v.maavalo.toFixed(3));
  };
  paivita();
  const ajastin = ikkuna.setInterval?.(paivita, valiMs);
  return {
    tila: () => viime,
    pura() {
      if (ajastin != null) ikkuna.clearInterval?.(ajastin);
      for (const k of ['--livia-eva-kasvovalo', '--livia-eva-kyparalamput', '--livia-eva-maavalo']) tyyli.removeProperty?.(k);
    },
  };
}
