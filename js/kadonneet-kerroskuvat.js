/*
 * KADONNEIDEN IHMEIDEN KERROSKUVAT NATIIVILLE (JU 16.11.2026, PT 03.49 / KK 03.45).
 * Natiivi hakee kerrostarinan aikalaiskuvan osoitteen media.json:sta; ilman riviä
 * se putosi julisteet/assets/… -osoitteeseen (404). Tämä moduuli tuo kuvapolut
 * vientiin (tools/vienti/lahteet.mjs LISAMODUULIT), jolloin vienti antaa niille
 * ämpärin osoitteen (assets/…?v=<sha>) ja vie tiedostot ämpäriin kuten muut
 * sivuston assetit. Lähde ja tekijätiedot: data/temple-torni-kerroskuvat.json (SK).
 * Web ei lataa tätä moduulia.
 */
import TEMPLE_TORNI from '../data/temple-torni-kerroskuvat.json' with { type: 'json' };

/** kohde → [{ tarinat, taso, tiedosto }] */
export const KERROSKUVAT = {
  [TEMPLE_TORNI.kohde]: TEMPLE_TORNI.kuvat.map(({ tarinat, taso, tiedosto }) => ({ tarinat, taso, tiedosto })),
};
