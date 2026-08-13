// Vihreä passi ja sen leimat.
//
// Passi on pelaajan oma, ei pelin: leimat säilyvät pelikerrasta toiseen ja
// jäävät jäljelle vaikka peli aloitettaisiin alusta. Siksi ne tallennetaan
// omalla avaimellaan eivätkä ne kuulu pelitallenteeseen.

/*
 * Avain on julkinen, koska passi on yksi kahdesta asiasta, jotka
 * iOS-kuori synkkaa iCloudiin (js/natiivi.js): synkka tarvitsee saman
 * avaimen sekä levylle että pilveen.
 */
export const STAMP_KEY = 'matkakirja.passi.v1';

/**
 * Leimat muodossa { packId: { label, date } }, jossa date on ensimmäisen
 * käynnin päivä ISO-muodossa (YYYY-MM-DD).
 */
export function readStamps() {
  try {
    const raw = localStorage.getItem(STAMP_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw);
    return data && typeof data === 'object' ? data : {};
  } catch {
    // Rikkinäinen tai estetty tallennustila: passi on tyhjä, peli jatkuu.
    return {};
  }
}

/**
 * Leimaa laudan, jos sillä ei vielä ole leimaa. Palauttaa true, kun leima on
 * uusi — silloin sen voi näyttää pelaajalle.
 */
export function stampBoard(packId, label, today = new Date()) {
  const stamps = readStamps();
  if (stamps[packId]) return false;
  stamps[packId] = { label, date: isoDate(today) };
  try {
    localStorage.setItem(STAMP_KEY, JSON.stringify(stamps));
  } catch {
    return false; // tallennustila täynnä tai estetty
  }
  return true;
}

/**
 * Kirjoittaa koko leimakokoelman kerralla. Tätä käyttää vain
 * iCloud-synkka, joka yhdistää toisen laitteen leimat omiin
 * (js/natiivi.js natiiviYhdistaLeimat) — tavallinen peli leimaa yhden
 * laudan kerrallaan stampBoardilla.
 */
export function writeStamps(stamps) {
  try {
    localStorage.setItem(STAMP_KEY, JSON.stringify(stamps ?? {}));
    return true;
  } catch {
    return false; // tallennustila täynnä tai estetty
  }
}

/** Leimat vanhimmasta uusimpaan näyttöä varten. */
export function stampList() {
  return Object.entries(readStamps())
    .map(([packId, stamp]) => ({ packId, ...stamp }))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

/** Päivä muodossa YYYY-MM-DD paikallisen ajan mukaan. */
export function isoDate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Päivä leimaan luettavassa muodossa: 27.7.2026 */
export function stampDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${Number(d)}.${Number(m)}.${y}`;
}
