/*
 * LEHTIKUORI: PELKKÄ KAUPUNKILEHTI NATIIVIN PELIN WEB-NÄKYMÄÄN
 * (omistajan linjaus 23.9.2026: natiiviin mahdollisimman pian; Fablen
 * työnjako: kaupunkilehti natiivissa WKWebView-kuoressa, web-lehti
 * sellaisenaan aluksi).
 *
 * `index.html?lehti=<kaupunki-id>` avaa kaupungin lehden ilman lautaa:
 *   - peli rakennetaan kuten kehittäjän pikatiellä (js/kehittaja-pikatie.js
 *     rakennaPikatiePeli): yksi pelaaja kaupungissa, toimintavaihe, ei
 *     saapumisesitystä;
 *   - mitään ei tallenneta (onChange tyhjä) — laitteen oma verkkopeli ei
 *     muutu, jos sama selain avaa kuoren;
 *   - lautaa ei avata (ui.lehtikuori → paivitaPallolauta palaa heti), eikä
 *     WebGL-pallo tai tasokartta pyöri lehden alla;
 *   - `.app` on piilossa (css body.lehtikuori), dialogit toimivat: lehti,
 *     Wikipedia-artikkeli, nähtävyys ja kuvan suurennos ovat bodyn suoria
 *     lapsia.
 *
 * NATIIVILLE: kun pelaaja sulkee lehden, kuori lähettää viestin
 * `{ tapahtuma: 'lehti-suljettu', kaupunki }` WKWebViewn käsittelijälle
 * `matkakirja` (window.webkit.messageHandlers.matkakirja) ja samalla
 * sivutapahtuman `matkakirja-lehti-suljettu` (testit ja selain).
 *
 * Sisältöpaketin juuri (Siirtoseppä, tools/vienti/web-riippuvuudet.mjs
 * WEB_NAKYMAT): index.html + js/main.js — kuori on sama sovellus eri
 * tilassa eikä oma kopio käyttöliittymästä.
 */

export const LEHTIKUORI_TAPAHTUMA = 'matkakirja-lehti-suljettu';

/** Kaupunki osoitteesta `?lehti=<id>` tai null (tunnus kuten pikatiellä). */
export function lehtikuorenKaupunki(search = globalThis.location?.search ?? '') {
  try {
    const arvo = new URLSearchParams(search).get('lehti');
    return arvo && /^[a-z0-9-]{2,40}$/.test(arvo) ? arvo : null;
  } catch {
    return null;
  }
}

/** Viesti natiiville kuorelle; selaimessa pelkkä sivutapahtuma. */
export function ilmoitaNatiiville(tapahtuma, tiedot = {}, ikkuna = globalThis) {
  const viesti = { tapahtuma, ...tiedot };
  try { ikkuna.webkit?.messageHandlers?.matkakirja?.postMessage?.(viesti); } catch { /* ei kuorta */ }
  try { ikkuna.dispatchEvent?.(new CustomEvent(LEHTIKUORI_TAPAHTUMA, { detail: viesti })); } catch { /* ei ikkunaa */ }
  return viesti;
}

/**
 * Avaa kaupungin lehden ja kytkee sulkemisen natiiville. `ui` on jo
 * asennettu (mount) ja `ui.lehtikuori` tosi.
 */
export function avaaLehtikuori(ui, kaupunki) {
  const city = ui.game.board.cityById.get(kaupunki);
  if (!city) return false;
  const dialogi = ui.arrivalDialog;
  dialogi?.addEventListener('close', () => {
    ilmoitaNatiiville('lehti-suljettu', { kaupunki });
  }, { once: true });
  ui.openArrival(city, { ohitaLehtilukko: true });
  ilmoitaNatiiville('lehti-auki', { kaupunki });
  return true;
}
