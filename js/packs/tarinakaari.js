/*
 * Euroopan tarinakaari pelissä (omistajan tilaus 9.8.2026: "Julkaiset
 * tekstit ja puheet heti, kun ne vain ovat valmiit. Julkaise siis
 * suoraan peliin.")
 *
 * Aineisto on SAMA kuin työhuoneen Kehitys-välilehdellä
 * (js/tyohuone-kehitys-data.js, KAARI_PAKETIT) — työhuone on
 * esikatselu, tämä hakemisto pelin käyttöliittymän ja moottorin
 * käyttöön. Yksi lähde, ei kopiota: uusi kohde työhuoneessa on heti
 * myös pelissä.
 *
 * Kolme osaa kohdetta kohti ja niiden paikat pelissä:
 *   saapuminen  — saapumiskortin matkakirjamerkintä
 *   kohtaaminen — henkilön repliikki kaupungin ensimmäisessä
 *                 aarrevisassa; sen päättämä kysymys on visan
 *                 OIKEA kysymys (pari kirjoitettu yhteen)
 *   aarre       — paljastuskortin jatko ja auki jäävä vihje
 *
 * Luennat: assets/audio/puhe-kaari-<osa>-<id>.mp3 (Viisas Kertoja,
 * tools/generoi-kaari.mjs). Kaikilla kohteilla on kaikki kolme.
 */

import { KAARI_PAKETIT } from '../tyohuone-kehitys-data.js';

export const TARINAKAARI = Object.fromEntries(
  KAARI_PAKETIT.kohteet.map((kohde) => [kohde.id, kohde]),
);

/*
 * Kaari koskee Euroopan lautaa ja maailmankarttaa, jolla samat
 * kaupungit ovat samoilla tunnuksilla. Muiden lautojen samannimiset
 * tunnukset (esim. Suomi-laudan helsinki) eivät kuulu kaareen — siellä
 * tarina ohitetaan, ettei Euroopan juoni vuoda väärälle laudalle.
 */
export const KAARI_LAUDAT = new Set(['europe', 'maailmankartta']);
