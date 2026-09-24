/*
 * TARKKUUS LIIKKEESSÄ — pelaajan asetus (omistaja 22.9.2026 Fablen kautta,
 * sulavuuskatsauksen kohta 5). Hampurilainen → Kartta → "Tarkkuus
 * liikkeessä", kolme arvoa:
 *
 *   terava       dpr 3 + MSAA aina (oletus, nykyinen käytös)
 *   tasainen     dpr 2 liikkeessä, 3 levossa — yksi puskurinvaihto eleen
 *                alussa ja lopussa, kaikki täyttö 2,25 kertaa kevyempää
 *   kokeellinen  dpr 3 ilman MSAA:ta — antialias on WebGL-kontekstin
 *                luontiparametri, joten tämä tulee voimaan vasta sivun
 *                seuraavassa latauksessa (valikko kertoo sen)
 *
 * Asetus on localStorage-avaimessa TARKKUUS_AVAIN; `?tarkkuus=` ohittaa
 * sen mittausta varten. Pallon laatunosto (js/pallo.js kytkeLaatunosto)
 * lukee pikselisuhteen tästä, rakennaPallo antialias-lipun.
 */

export const TARKKUUS_AVAIN = 'matkakirja-tarkkuus-liikkeessa';
export const TARKKUUS_TAPAHTUMA = 'matkakirja-tarkkuus-liikkeessa';
export const TARKKUUDET = Object.freeze(['terava', 'tasainen', 'kokeellinen']);
export const TARKKUUS_OLETUS = 'terava';
/** Pikselisuhteen katot: lepo ja tasaisen tilan liike. */
export const TARKKUUS_SUHDE_LEPO = 3;
export const TARKKUUS_SUHDE_LIIKE = 2;

export const TARKKUUKSIEN_NIMET = Object.freeze({
  terava: { nimi: 'terävä', seloste: 'täysi tarkkuus ja reunanpehmennys myös liikkeessä' },
  tasainen: { nimi: 'tasainen', seloste: 'liikkeessä kevyempi tarkkuus, levossa täysi' },
  kokeellinen: { nimi: 'kokeellinen', seloste: 'täysi tarkkuus ilman reunanpehmennystä — voimaan seuraavassa latauksessa' },
});

let muisti = null;

const kelpaa = (arvo) => (TARKKUUDET.includes(arvo) ? arvo : null);

/** Voimassa oleva asetus ('terava' | 'tasainen' | 'kokeellinen'). */
export function tarkkuusLiikkeessa(win = globalThis) {
  if (muisti !== null) return muisti;
  let arvo = null;
  try { arvo = kelpaa(new URLSearchParams(win.location?.search ?? '').get('tarkkuus')); } catch { /* ei osoitetta */ }
  if (!arvo) {
    try { arvo = kelpaa(win.localStorage?.getItem(TARKKUUS_AVAIN)); } catch { /* yksityinen selaus */ }
  }
  muisti = arvo ?? TARKKUUS_OLETUS;
  return muisti;
}

/**
 * Asetus talteen ja ilmoitus laudalle. Palauttaa true, jos muutos
 * vaatii sivun latauksen (antialias-lippu vaihtuu).
 */
export function asetaTarkkuusLiikkeessa(arvo, win = globalThis) {
  const uusi = kelpaa(arvo) ?? TARKKUUS_OLETUS;
  const vanha = tarkkuusLiikkeessa(win);
  muisti = uusi;
  try { win.localStorage?.setItem(TARKKUUS_AVAIN, uusi); } catch { /* ei muistia */ }
  const lataus = antialiasTarkkuudella(uusi) !== antialiasTarkkuudella(vanha);
  try {
    win.dispatchEvent?.(new CustomEvent(TARKKUUS_TAPAHTUMA, { detail: { tarkkuus: uusi, lataus } }));
  } catch { /* ei tapahtumia (testit) */ }
  return lataus;
}

/** Testit: unohda muisti. */
export function unohdaTarkkuus() { muisti = null; }

/** Reunanpehmennys (WebGL antialias) tällä asetuksella. */
export function antialiasTarkkuudella(tarkkuus) {
  return tarkkuus !== 'kokeellinen';
}

/**
 * Renderöijän pikselisuhde: laitteen dpr, levon katto 3, ja tasaisessa
 * tilassa liikkeen katto 2.
 */
export function pikselisuhdeTarkkuudella(tarkkuus, dpr, lepo) {
  const d = Number.isFinite(dpr) && dpr > 0 ? dpr : 1;
  if (tarkkuus === 'tasainen' && !lepo) return Math.min(d, TARKKUUS_SUHDE_LIIKE);
  return Math.min(d, TARKKUUS_SUHDE_LEPO);
}
