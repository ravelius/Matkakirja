// DIORAAMAN RESEPTIT — LATTIAT (Linnanrakentaja erä 2b, 29.9.2026, ali-agentti P2): kivilattia ja
// lankkulattia. Speksi: docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 3. Referenssi
// "Room 06, scale 1:12": laatat/lankut erillisinä laatikkoina pienin viistein, jokaisella oma
// COLOR_0.B (ks. rakenna.mjs: k.osa → osan satunnaisluku) ja pieni korkeusvaihtelu — käsintehdyn
// pienoismallin tuntu proseduraalisesti, ei maalattua tekstuuria.
//
// Molemmat jakavat alan (leveys × syvyys) RIVEIHIN (w-suunta) ja riveittäin SARAKKEISIIN
// (u-suunta) annetusta [min, max]-kokovälistä `siemen`-RNG:llä (mulberry32) — jokainen rivi arpoo
// sarakkeensa ERIKSEEN, joten pystysaumat eivät osu kohdakkain rivien välillä (epäsäännöllisen
// kivilattian tuntu). Lankkulattiassa on AINA yksi "rivi" (koko syvyys), joten lankut ovat pitkiä
// ja jakautuvat vain leveys-suuntaan (kutsuja voi vaihtaa leveys/syvyys-parametrit halutessaan
// lankut toiseen suuntaan). `osa`-tunniste (siemen:rivi:sarake) jokaiselle kärjelle → rakenna.mjs
// arpoo siitä COLOR_0.B:n (kiinteällä siemenellä, deterministinen, riippumaton ajojärjestyksestä).
// HUOM: kutsuja vastaa siitä, että eri lattiapalikoilla on eri `siemen` (muuten kahden palikan
// samat rivi/sarake-indeksit saisivat saman B:n).
import { nelio, mulberry32 } from './reseptit-apu.mjs';

const VIISTE = 0.01; // yläreunan viiste (m) — kohta 3: "pienin viistein (1 cm)"
const KORKEUSVAIHTELU = 0.004; // ± korkeusvaihtelu (m) — kohta 3

/**
 * Yksi laatta/lankku viistetyllä yläreunalla (u0…u1, w0…w1, paksuus alaspäin y1:stä). Yläpinta
 * kutistettu VIISTE:llä sisään, viisteseinämä ulos-alas, suorat sivut, pohja. Kaikki kärjet
 * saavat saman `osa`-tunnisteen (→ COLOR_0.B rakenna.mjs:ssä). Nurkkajärjestys (u0w1→u1w1→
 * u1w0→u0w0) mimikoi reseptit-apu.mjs:n laatikko()-apufunktion 'yla'/'etu'/'oikea'/'taka'/
 * 'vasen'-sivujen kiertosuuntaa, jotta normaalit osoittavat oikein (ulos/ylös).
 */
function viisteLaatta(u0, u1, w0, w1, y1, paksuus, ylaRooli, sivuRooli, osa) {
  const y0 = y1 - paksuus;
  const yV = y1 - VIISTE;
  const vu = Math.min(VIISTE, Math.max(0, (u1 - u0) / 2 - 1e-4));
  const vw = Math.min(VIISTE, Math.max(0, (w1 - w0) / 2 - 1e-4));
  const ul = [[u0, w1], [u1, w1], [u1, w0], [u0, w0]]; // ulkokehä, laatikko()-nurkkajärjestys
  const si = [[u0 + vu, w1 - vw], [u1 - vu, w1 - vw], [u1 - vu, w0 + vw], [u0 + vu, w0 + vw]]; // sisäkehä
  const P = (uw, y) => [uw[0], y, uw[1]];
  const k = [];
  k.push(...nelio(P(si[0], y1), P(si[1], y1), P(si[2], y1), P(si[3], y1), ylaRooli));
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    k.push(...nelio(P(ul[i], yV), P(ul[j], yV), P(si[j], y1), P(si[i], y1), ylaRooli)); // viiste
    k.push(...nelio(P(ul[i], y0), P(ul[j], y0), P(ul[j], yV), P(ul[i], yV), sivuRooli)); // sivu
  }
  k.push(...nelio(P(ul[3], y0), P(ul[2], y0), P(ul[1], y0), P(ul[0], y0), sivuRooli)); // pohja
  for (const t of k) t.osa = osa;
  return k;
}

/** Jakaa `pituus`:n paloihin [minK, maxK]-välistä rng:llä; viimeinen pala typistetään täsmäämään
 * (vähintään minK/2, ei mikroskooppista sirpaletta). Palauttaa rajat [0, r1, …, pituus]. */
function jaaPaloihin(pituus, minK, maxK, rng) {
  const rajat = [0];
  let s = 0;
  while (s < pituus - 1e-9) {
    let d = minK + rng() * (maxK - minK);
    if (s + d > pituus) d = Math.max(pituus - s, minK / 2);
    s += d;
    rajat.push(s);
  }
  return rajat;
}

/** Yhteinen runko: leveys × syvyys täytetään laatoilla/lankuilla kokovälistä `kokoVali`.
 * `omaRivi` = false: jokainen rivi jaetaan myös syvyys-suunnassa (kivilattia); true: yksi rivi
 * (koko syvyys) — lankut pitkinä koko matkan (lankkulattia). */
function lattiaResepti(param, kokoVali, ylaRooli, sivuRooli, omaRivi) {
  const leveys = param.leveys; const syvyys = param.syvyys; const paksuus = param.paksuus ?? 0.12;
  const [minK, maxK] = kokoVali;
  const sauma = param.sauma_m ?? 0.015;
  const siemen = param.siemen ?? 1;
  const rng = mulberry32(siemen >>> 0);
  const puoliSauma = sauma / 2;
  const u0 = -leveys / 2; const w0 = -syvyys / 2;
  const wRajat = omaRivi ? [0, syvyys] : jaaPaloihin(syvyys, minK, maxK, rng);
  const kaikki = [];
  for (let ri = 0; ri < wRajat.length - 1; ri++) {
    const uRajat = jaaPaloihin(leveys, minK, maxK, rng);
    const wA = w0 + wRajat[ri]; const wB = w0 + wRajat[ri + 1];
    for (let ci = 0; ci < uRajat.length - 1; ci++) {
      const uA = u0 + uRajat[ci]; const uB = u0 + uRajat[ci + 1];
      const y1 = (rng() * 2 - 1) * KORKEUSVAIHTELU;
      kaikki.push(...viisteLaatta(
        uA + puoliSauma, uB - puoliSauma, wA + puoliSauma, wB - puoliSauma,
        y1, paksuus, ylaRooli, sivuRooli, `${siemen}:${ri}:${ci}`,
      ));
    }
  }
  return kaikki;
}

/** Kivilattia: epäsäännölliset laatat (oletus 0,4–0,7 m), rivikohtainen sarakejako. */
export function kivilattia(param) {
  return lattiaResepti(param, param.laatta_m ?? [0.4, 0.7], 'yla', 'sivu', false);
}

/** Lankkulattia: pitkät lankut (oletus 0,18–0,26 m leveitä), yksi "rivi" (koko syvyys). */
export function lankkulattia(param) {
  return lattiaResepti(param, param.lankku_m ?? [0.18, 0.26], 'yla', 'sivu', true);
}

// Rooli → oletuspinta (reseptit.mjs:n sijoita ohittaa instanssin omalla pinnat-kentällä).
export const OLETUSPINNAT = {
  kivilattia: { yla: 'kivilattia', sivu: 'kivi' },
  lankkulattia: { yla: 'lankku', sivu: 'puu' },
};

export const RESEPTIT = { kivilattia, lankkulattia };
