/*
 * KEHITTÄJÄN VOIMAKKUUSSÄÄTIMET (omistajan tilaus 3.9.2026: *"kehittäjätilaan
 * saisi hammasrattaan alle laittaa äänenvoimakkuus säätimet taustaäänen ja
 * taustamusiikin voimakkuuksille (+/- arvot nykyisille arvoille)"*).
 *
 * Yksi kerroin, joka kerrotaan pelin omaan tasoon päälle:
 *   tausta    kaupungin äänimaisema (js/ambience-stream.js taso)
 *
 * MUSIIKKI EI OLE ENÄÄ TÄÄLLÄ (9.9.2026). Musiikilla oli oma laji
 * `musiikki`, ja se oli sama ×0,25…×3,0 -askellin kuin taustaäänellä.
 * Omistajan vika toistui kahdesti (*"eikä rattaan säädin vaikuta sen
 * tasoon ollenkaan"* 8.9., *"vielä aivan liian kovalla … säätimen
 * pystyisi säätämään todella isolla välillä"* 9.9.), ja syitä oli
 * kaksi: lineaarinen ja kapea väli (alaraja ×0,25 on vain −12 dB, ei
 * hiljaisuus) sekä se, ettei taso mennyt iPhonessa perille lainkaan.
 * Musiikilla on nyt oma liuku 0–100 omalla korvan mukaisella
 * käyrällään (js/musiikkivalitsin.js `musiikinVahvistus`) ja oma tie
 * äänen läpi (js/musiikkivahvistin.js). Vanha avain
 * `matkakirja-dev-voima-musiikki` jää laitteille lojumaan, mutta sitä
 * ei enää lueta — juuri siksi, ettei sinne unohtunut ×2,0
 * kaksinkertaistaisi uuden säätimen tulosta.
 *
 * Kerroin 1,0 = pelin nykyinen taso; +/- liikuttaa sitä askelittain
 * (ASKEL) rajojen sisällä. Arvo tallennetaan localStorageen, joten
 * kuulokoe säilyy sivun latauksen yli. Säädin on vain kehittäjätilan
 * hammasratasvalikossa (index.html #kehittaja-valikko), mutta kerroin
 * luetaan aina — tavallisella pelaajalla se on 1,0, koska hän ei pääse
 * sitä muuttamaan.
 *
 * Moduulit, joiden taso riippuu kertoimesta, ilmoittautuvat kuuntelijoiksi
 * (kuunteleKehittajanKerrointa) ja päivittävät soivan äänen heti —
 * säädön pitää kuulua ilman että ääni vaihtuu.
 */

export const KEHITTAJAN_VOIMA_LAJIT = /** @type {const} */ (['tausta']);
export const KEHITTAJAN_VOIMA_MIN = 0.25;
export const KEHITTAJAN_VOIMA_MAX = 3;
export const KEHITTAJAN_VOIMA_ASKEL = 0.1;
export const KEHITTAJAN_VOIMA_AVAIN = 'matkakirja-dev-voima-';
/*
 * LAJIN OLETUSKERROIN — 1,0 ELI PELIN OMA TASO.
 *
 * OLETUS ON SE ARVO, JOLLA TAVALLINEN PELAAJA KUULEE PELIN; tallennus
 * kirjoitetaan vain, kun kerroin poikkeaa oletuksesta.
 */
export const KEHITTAJAN_VOIMA_OLETUS = /** @type {const} */ ({ tausta: 1 });
const oletus = (laji) => KEHITTAJAN_VOIMA_OLETUS[laji] ?? 1;

const kertoimet = new Map();
const kuuntelijat = new Map();

function rajaaKerroin(arvo) {
  const luku = Number(arvo);
  if (!Number.isFinite(luku)) return 1;
  return Math.min(KEHITTAJAN_VOIMA_MAX, Math.max(KEHITTAJAN_VOIMA_MIN, Math.round(luku * 100) / 100));
}

function lueTallennettu(laji) {
  try {
    const t = localStorage.getItem(KEHITTAJAN_VOIMA_AVAIN + laji);
    return t == null ? oletus(laji) : rajaaKerroin(t);
  } catch {
    return oletus(laji);
  }
}

/** Lajin kerroin (oletus = pelin oma taso, ks. KEHITTAJAN_VOIMA_OLETUS). Tuntematon laji → 1. */
export function kehittajanKerroin(laji) {
  if (!KEHITTAJAN_VOIMA_LAJIT.includes(laji)) return 1;
  if (!kertoimet.has(laji)) kertoimet.set(laji, lueTallennettu(laji));
  return kertoimet.get(laji);
}

/** Asettaa kertoimen, tallentaa ja herättää kuuntelijat. Palauttaa uuden arvon. */
export function asetaKehittajanKerroin(laji, arvo) {
  if (!KEHITTAJAN_VOIMA_LAJIT.includes(laji)) return 1;
  const uusi = rajaaKerroin(arvo);
  kertoimet.set(laji, uusi);
  try {
    if (uusi === oletus(laji)) localStorage.removeItem(KEHITTAJAN_VOIMA_AVAIN + laji);
    else localStorage.setItem(KEHITTAJAN_VOIMA_AVAIN + laji, String(uusi));
  } catch {
    /* yksityinen selaus: kerroin elää istunnon */
  }
  for (const fn of kuuntelijat.get(laji) ?? []) {
    try { fn(uusi); } catch { /* yksi kuuntelija ei kaada muita */ }
  }
  return uusi;
}

/** Askel ylös (+1) tai alas (−1). */
export function saadaKehittajanKerrointa(laji, suunta) {
  return asetaKehittajanKerroin(laji, kehittajanKerroin(laji) + Math.sign(suunta) * KEHITTAJAN_VOIMA_ASKEL);
}

/** Kuuntelija saa uuden kertoimen heti kun se muuttuu. */
export function kuunteleKehittajanKerrointa(laji, fn) {
  if (!kuuntelijat.has(laji)) kuuntelijat.set(laji, new Set());
  kuuntelijat.get(laji).add(fn);
  return () => kuuntelijat.get(laji)?.delete(fn);
}

/** Näyttöasu: "×1,0", "×0,8". */
export function kehittajanKerroinTeksti(laji) {
  return `×${kehittajanKerroin(laji).toFixed(1).replace('.', ',')}`;
}
