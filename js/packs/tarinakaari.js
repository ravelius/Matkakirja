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

/*
 * Peliin otetaan vain kohteet, joiden luennat on generoitu
 * (luennat !== false). Lähi-idän kohteet ovat datassa työhuoneen
 * arviota varten ILMAN luentoja (omistajan tilaus 9.8.2026:
 * "kirjoittaa saa, ei vielä generoida") — ilman tätä suodatusta ne
 * aktivoituisivat maailmankartalla, jolla on samat kaupunkitunnukset,
 * ja saapumiskortti yrittäisi soittaa ääntä jota ei ole.
 */
/*
 * Henkilön kutsumanimi saapumiskortin nappia varten ("Tapaa Nikos",
 * omistajan toive 10.8.2026). Kuvaukset alkavat kaavalla
 * "<ammatti> <Nimi> <tekee>…", ja ammatti voi olla moniosainen
 * ("Kellonvalajan jälkeläinen Vera tuntee…") — nimi on siis
 * kuvauksen alun viimeinen isolla alkava sana. Kohde voi antaa nimen
 * myös itse (nimi-kenttä), jos kuvaus ei noudata kaavaa.
 */
const kutsumanimi = (kohde) => {
  if (kohde.nimi) return kohde.nimi;
  const sanat = String(kohde.henkilo ?? '').split(' ').slice(0, 3)
    .map((s) => s.replace(/[,."]/g, ''));
  let nimi = null;
  for (const sana of sanat) if (/^[A-ZÅÄÖ]/u.test(sana)) nimi = sana;
  return nimi;
};

export const TARINAKAARI = Object.fromEntries(
  KAARI_PAKETIT.kohteet
    .filter((kohde) => kohde.luennat !== false)
    .map((kohde) => [kohde.id, { ...kohde, nimi: kutsumanimi(kohde) }]),
);

/*
 * Kaari koskee Euroopan lautaa ja maailmankarttaa, jolla samat
 * kaupungit ovat samoilla tunnuksilla. Muiden lautojen samannimiset
 * tunnukset (esim. Suomi-laudan helsinki) eivät kuulu kaareen — siellä
 * tarina ohitetaan, ettei Euroopan juoni vuoda väärälle laudalle.
 */
export const KAARI_LAUDAT = new Set(['europe', 'maailmankartta']);
