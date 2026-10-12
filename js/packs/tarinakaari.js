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
 *
 * SAAPUMINEN-OSA ON FOKUSVIRTAKAUPUNGEISSA VARJOSSA (27.8.2026).
 * Ateenassa, Sofiassa, Istanbulissa, Roomassa, Bukarestissa ja
 * Sarajevossa matkakirjakortin omistaa fokusvirran oma merkintä
 * (js/fokusvirta.js fokusvirtaMatkakirja) — kaaren `saapuminen` ei siis
 * päädy näissä kaupungeissa ruudulle. KOHTAAMINEN, KYSYMYS ja AARRE
 * ovat näissäkin kaupungeissa täydessä käytössä: laatan kysymys tulee
 * yhä täältä (js/game.js kaariTilanne, js/visa.js), joten kohteita ei
 * saa poistaa fokusvirran perusteella.
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

/**
 * Saako osan ('saapuminen' | 'kohtaaminen' | 'aarre') luennan soittaa.
 *
 * Kohteen mykistetyt-lista kertoo osat, joiden TEKSTI on uudistettu
 * mutta luentaa ei ole vielä generoitu uusiksi (omistajan linjaus
 * 10.8.2026: tekstit heti peliin, äänet myöhemmässä erässä). Vanha
 * ääni eri sanoilla olisi pahempi kuin hiljaisuus — ruututeksti =
 * luenta -sääntö palautuu, kun generointierä ajetaan ja listat
 * tyhjennetään.
 */
export function kaariLuentaSoi(kohde, osa) {
  return !!kohde && !(kohde.mykistetyt ?? []).includes(osa);
}

/*
 * KAARILUENTOJEN TALLENTEET NATIIVILLE (PT 12.10.2026 klo 03.4x, juna 184;
 * docs/moduulit/tarinakaari.md: saapuminen, kohtaaminen ja aarre luetaan
 * ääneen). Vienti (tools/vienti/kokoelmat.mjs, skeema 1.65) antaa
 * tarinakaari-riville äänikentän { kohtaaminen, aarre } = { url, kesto } vain
 * generoiduille (TARINAKAARI = luennat !== false) ja mykistämättömille
 * osille; natiivi soittaa ne saapumisen tallenteen tavoin, lukijaääni jää
 * varapoluksi. Webin oma soitto ei muutu (natiivi on malli).
 *
 * -v2: Äänittäjän korjatut luennat (−14,4…−14,9 LUFS) uusilla nimillä
 * puhe-kaari-<osa>-<id>-v2.mp3; vanhat −17,1 LUFS -tiedostot jäävät
 * käyttämättä. Kesto sekunteina (afinfo ämpärin tiedostosta 12.10.2026).
 */
export const KAARI_AANITTEET_V2 = Object.freeze({
  bryssel: { kohtaaminen: 22.126, aarre: 17.711 },
  kosice: { kohtaaminen: 20.506, aarre: 15.308 },
  ljubljana: { kohtaaminen: 18.599, aarre: 16.431 },
  luxemburg: { kohtaaminen: 23.327, aarre: 20.193 },
  valletta: { kohtaaminen: 19.148, aarre: 17.006 },
  bergen: { kohtaaminen: 16.039, aarre: 18.442 },
  firenze: { kohtaaminen: 19.487, aarre: 14.916 },
  sevilla: { kohtaaminen: 19.409, aarre: 17.398 },
  tampere: { kohtaaminen: 17.241, aarre: 16.509 },
});

/** Kaaren osan ('kohtaaminen' | 'aarre') tallenne { polku, kesto } tai null (mykistetty tai ei generoitu). */
export function kaariAanite(kohde, osa) {
  if (!kohde || kohde.luennat === false || !kaariLuentaSoi(kohde, osa)) return null;
  const v2 = KAARI_AANITTEET_V2[kohde.id]?.[osa];
  return { polku: `assets/audio/puhe-kaari-${osa}-${kohde.id}${v2 ? '-v2' : ''}.mp3`, kesto: v2 ?? null };
}

/*
 * Kaari koskee Euroopan lautaa ja maailmankarttaa, jolla samat
 * kaupungit ovat samoilla tunnuksilla. Muiden lautojen samannimiset
 * tunnukset (esim. Suomi-laudan helsinki) eivät kuulu kaareen — siellä
 * tarina ohitetaan, ettei Euroopan juoni vuoda väärälle laudalle.
 */
export const KAARI_LAUDAT = new Set(['europe', 'maailmankartta']);
