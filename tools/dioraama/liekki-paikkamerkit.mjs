/*
 * Dioraamamoottorin LIEKKIEN paikkamerkkiatlasgeneraattori (Linnanrakentaja, erä 2).
 * Speksi: docs/raportit/dioraama-rajapinnat-era2-20260929.md kohta 2 (LIEKIT):
 * "Paikkamerkkiatlas (ei lähdettä): proseduraalinen, pehmeä pisara valkoisesta
 * keskeltä oranssiin reunaan, alfa = kirkkaus, ruudut hieman eri muotoisia
 * (siemen), sama koko ja ruudukko kuin yllä."
 *
 * Käytetään vain kun LIEKIT-pankin liekillä ei ole `lahde`-kenttää tai lähdetiedosto
 * puuttuu levyltä (ks. tools/dioraama/media.mjs) — Codexin oikea liekkiatlas korvaa
 * tämän sellaisenaan, kun se ilmestyy assets/dioraama/liekit/:iin.
 *
 * EI UUSIA NPM-RIIPPUVUUKSIA: PNG kirjoitetaan paikkamerkit.mjs:n kirjoitaRgbaPng-
 * funktiolla (viety sieltä, talon tyyli). Satunnaisuus mulberry32:lla
 * (reseptit-apu.mjs) — merkkijonosta laskettu siemen, jotta (liekki, ruutu)
 * määrää aina saman muodon (deterministinen, sama syöte = sama tavujono).
 *
 * Käyttö kirjastona: `teeLiekkiPaikkamerkkiAtlas(liekki, id) → Buffer` (PNG, RGBA,
 * koko = liekin ruutu × sarakkeet/rivit LIEKIT-pankin mukaan).
 */

import { mulberry32 } from './reseptit-apu.mjs';
import { kirjoitaRgbaPng } from './paikkamerkit.mjs';

const KESKI_VARI = [255, 255, 255]; // pisaran keskusta: valkoinen (kuumin kohta)
const REUNA_VARI = [255, 140, 30]; // pisaran reuna: oranssi
const PUOLILEVEYS_PERUSTE = 0.34; // liekin enimmäispuolileveys osuutena ruudun leveydestä (tyvessä)
const YLINAYTE = 3; // kevyt ylinäytteistys (3×3) reunan pehmennykseen ilman raskasta SDF-koneistoa

/** Yksinkertainen merkkijonosta laskettu 32-bittinen siemen (deterministinen, ei kryptografinen). */
function merkkijonoSiemen(teksti) {
  let h = 0;
  for (let i = 0; i < teksti.length; i++) {
    h = (Math.imul(h, 31) + teksti.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

/** Pehmeä reunafunktio: 1 sisällä (dist ≤ a), 0 ulkona (dist ≥ b), smoothstep välissä. */
function pehmeaReuna(dist, a, b) {
  if (dist <= a) return 1;
  if (dist >= b) return 0;
  const t = (dist - a) / (b - a);
  return 1 - t * t * (3 - 2 * t);
}

/**
 * Piirtää yhden liekkiruudun suoraan isoon atlaspuskuriin kohtaan (x0, y0).
 * `id` + `f` (ruutuindeksi) siemenenä: jokainen ruutu hieman eri muotoinen
 * ("lepatus"), mutta aina samat luvut samalla syötteellä. Väri sekoitetaan
 * valkoisesta (keskusta) oranssiin (reuna); alfa = kirkkaus (kirkkain tyvessä,
 * himmenee kärkeen — sama suunta kuin liekin pivot, joka on lähellä ruudun alareunaa).
 */
function piirraLiekkiRuutu(atlas, atlasLeveys, x0, y0, ruutuL, ruutuK, id, f) {
  const rng = mulberry32(merkkijonoSiemen(`liekki:${id}:${f}`));
  const leveysKerroin = 0.85 + rng() * 0.3;
  const taipuma = (rng() - 0.5) * 0.3;
  const aaltoTaajuus = 1.4 + rng() * 1.6;
  const aaltoVaihe = rng() * Math.PI * 2;
  const aaltoAmp = 0.06 + rng() * 0.1;
  const kapenema = 0.55 + rng() * 0.35;
  const kaanteisNaytteet = 1 / (YLINAYTE * YLINAYTE);

  for (let y = 0; y < ruutuK; y++) {
    for (let x = 0; x < ruutuL; x++) {
      let sumR = 0; let sumG = 0; let sumB = 0; let sumA = 0;
      for (let sy = 0; sy < YLINAYTE; sy++) {
        // ny: 0 = ruudun yläreuna (liekin kärki), 1 = alareuna (tyvi, pivot lähellä).
        const ny = (y + (sy + 0.5) / YLINAYTE) / ruutuK;
        const puoliLeveys = PUOLILEVEYS_PERUSTE * leveysKerroin
          * (ny ** kapenema)
          * (1 + aaltoAmp * Math.sin(ny * aaltoTaajuus * Math.PI * 2 + aaltoVaihe));
        const keskiX = 0.5 + taipuma * Math.sin(ny * Math.PI);
        const kirkkaus = 0.55 + 0.45 * ny;
        for (let sx = 0; sx < YLINAYTE; sx++) {
          const nx = (x + (sx + 0.5) / YLINAYTE) / ruutuL;
          const dist = Math.abs(nx - keskiX) / Math.max(puoliLeveys, 1e-4);
          const peitto = pehmeaReuna(dist, 0.7, 1.05) * kirkkaus;
          if (peitto <= 0) continue;
          const t = Math.min(1, dist);
          sumR += (KESKI_VARI[0] + (REUNA_VARI[0] - KESKI_VARI[0]) * t) * peitto;
          sumG += (KESKI_VARI[1] + (REUNA_VARI[1] - KESKI_VARI[1]) * t) * peitto;
          sumB += (KESKI_VARI[2] + (REUNA_VARI[2] - KESKI_VARI[2]) * t) * peitto;
          sumA += peitto;
        }
      }
      if (sumA > 1e-6) {
        const o = ((y0 + y) * atlasLeveys + (x0 + x)) * 4;
        atlas[o] = Math.round(sumR / sumA);
        atlas[o + 1] = Math.round(sumG / sumA);
        atlas[o + 2] = Math.round(sumB / sumA);
        atlas[o + 3] = Math.round(sumA * kaanteisNaytteet * 255);
      }
    }
  }
}

/**
 * `teeLiekkiPaikkamerkkiAtlas(liekki, id) → Buffer` (PNG, RGBA, läpinäkyvä tausta).
 * liekki = LIEKIT-pankin tietue { ruutu: [l, k], sarakkeet, ruudut, ... } (dioraama-
 * rajapinnat-era2 kohta 2). Ruudut sijoitetaan riveittäin kuten henkilöiden silmukat:
 * ruutu f → rivi = floor(f / sarakkeet), sarake = f % sarakkeet.
 */
export function teeLiekkiPaikkamerkkiAtlas(liekki, id) {
  const [ruutuL, ruutuK] = liekki.ruutu;
  const { sarakkeet, ruudut } = liekki;
  const rivit = Math.max(1, Math.ceil(ruudut / sarakkeet));
  const leveys = sarakkeet * ruutuL;
  const korkeus = rivit * ruutuK;
  const atlas = new Uint8ClampedArray(leveys * korkeus * 4);
  for (let f = 0; f < ruudut; f++) {
    const rivi = Math.floor(f / sarakkeet);
    const sarake = f % sarakkeet;
    piirraLiekkiRuutu(atlas, leveys, sarake * ruutuL, rivi * ruutuK, ruutuL, ruutuK, id, f);
  }
  return kirjoitaRgbaPng(leveys, korkeus, atlas);
}
