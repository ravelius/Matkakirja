// OLAVINLINNA — dioraaman lähdedata, erä 1 (karkea linnan massa + yksityiskohtainen
// keittiö). Speksi: docs/raportit/dioraama-rajapinnat-20260929.md (kohdat 0, 1, 2);
// erä 2:n äänet (repliikit, reaktiot, taulujen kohdat, tilojen ambienssit ja
// tehosteet): docs/raportit/dioraama-rajapinnat-era2-20260929.md kohta 2 "AANET".
// Konsepti: Codexin luonnos (sommittelu ja tyyli), todelliset mittasuhteet viitteenä
// proto-3d:n Olavinlinna.cs:n alkukommentista (linna 168 × 98 m, kolme pyöreää tornia
// pohjoislaidalla rivissä) — tämä dioraama tiivistää mittasuhteet konseptin mukaan.
//
// Koordinaatisto (KANONINEN, ks. speksin kohta 0): metrit, +X itä, +Y ylös, +Z etelä.
// Origo = keskipihan lattia y = 0. Kamera katsoo etelästä-kaakosta pohjoiseen.
//
// Aikakerros n1500 (1500-luvun alku, tulkinta) — sama vuosikymmenkerros kuin
// henkilöpankin '-1500'-hahmoilla.
//
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md): linna auki, 7 tilaa (vartiotupa yhdistetty keskushalliin 29.9.). Tilat omissa
// tiedostoissaan olavinlinna/<id>.js (export const TILA), tämä tiedosto kokoaa rakennuksen.

import { TILA as TILA_MASSA } from './olavinlinna/massa.js';
import { TILA as TILA_LAITURI } from './olavinlinna/laituri.js';
import { TILA as TILA_FATABUURI } from './olavinlinna/fatabuuri.js';
import { TILA as TILA_KIERREPORTAAT } from './olavinlinna/kierreportaat.js';
import { TILA as TILA_MUURINHARJA } from './olavinlinna/muurinharja.js';
import { TILA as TILA_KAPPELI } from './olavinlinna/kappeli.js';
import { TILA as TILA_KESKUSHALLI } from './olavinlinna/keskushalli.js';
import { TILA as TILA_KEITTIO } from './olavinlinna/keittio.js';
import { TILA as TILA_TUNNELMA } from './olavinlinna/tunnelma.js';

// ---------------------------------------------------------------------------
// Linnan taulu (RAKENNUS-tason opetustaulu, 3 ydinasiaa). Sisältökirjuri tarkisti 29.9. (Kansallismuseo, Museovirasto, Finna):
// tekstit ovat luonnos, Fable/Sisältökirjuri tarkistaa ja korvaa oikealla lähteellä.
const TAULU_LINNA = {
  otsikko: 'Olavinlinna',
  tila: 'tarkistettu',
  kohdat: [
    { teksti: 'Olavinlinna rakennettiin 1475 kalliosaarelle vartioimaan valtakunnan itärajaa.', lahde: 'Kansallismuseo: Olavinlinnan historiaa', aani: 'linna-kohta-0' },
    { teksti: 'Keskiaikaista kivilinnaa on korjattu ja laajennettu vuosisatojen kuluessa moneen otteeseen.', lahde: 'Kansallismuseo: Olavinlinnan historiaa', aani: 'linna-kohta-1' },
    { teksti: 'Nykyään linnassa on museo, ja kesäisin sen pihat toimivat oopperajuhlien näyttämönä.', lahde: 'Kansallismuseo: Olavinlinnan historiaa', aani: 'linna-kohta-2' },
  ],
};

// ---------------------------------------------------------------------------
export const RAKENNUS = {
  id: 'olavinlinna',
  nimi: 'Olavinlinna',
  otsikko: 'Olavinlinna – elävä linna',
  versio: 1,
  lahteet: [{ nimi: 'Kansallismuseo: Olavinlinnan historiaa', osoite: 'https://www.kansallismuseo.fi/fi/olavinlinna/historiaa' }],
  geoAnkkuri: { lat: 61.8639, lon: 28.9011, suuntima: 0 },
  aikakerros: { id: 'n1500', nimi: '1500-luvun alku (tulkinta)' },
  // Valaistus (erä 2b, omistajan valo-päätös 29.9. "B + tummempi valo"): korkea lounaisaurinko, tumma
  // yleisvalo — tulisija, kynttilät ja ikkunan keila (ks. TILA_KEITTIO.valot) kantavat tunnelman.
  // Sumu varalla (ei vielä käytössä). `sisalla`: aurinko/taivas-kertoimet kun kamera on kohdistettu
  // tilaan (DioraamaValot.cs liukuu näihin ~1 s:ssa) — yleisnäkymässä kertoimet ovat 1 (ei vaimennusta).
  valaistus: {
    aurinko: { atsimuutti: 225, korkeus: 36, vari: '#ffd29a', voima: 1.5 },
    taivas: { yla: '#8fa3bc', ala: '#3a2c20', voima: 0.5 },
    sisalla: { aurinko: 0.2, taivas: 0.3 },
    sumu: null,
  },
  yleiskamera: {
    vaaka: { kohde: [0, 2, 0], atsimuutti: 165, korkeus: 30, etaisyys: 150, fov: 32, aukko: 0.3 },
    pysty: { kohde: [0, 0, 2], atsimuutti: 160, korkeus: 38, etaisyys: 300, fov: 40, aukko: 0.3 },
  },
  // Elävä linna (käsikirjoitus 29.9., omistajan hyväksyntä 22.28): ei nimilappuja yleisnäkymässä, ja saapuminen on
  // matala kaari Kyrönsalmen yltä (lounas, 600 m) yleisnäkymään; toisella käynnillä lyhyt (6 s).
  nimilaput: false,
  // Uusi rakenne (omistaja 30.9. klo 15.28): lyhyt saapuminen aina, sitten kertojan esittely ja kamerakierros.
  saapuminen: { alku: { atsimuutti: 200, etaisyys: 600, korkeus: 8 }, kesto: 6, lyhyt: 6 },
  // Kertoja (noin 45 s): 4 jaksoa, tekstilaatikko kuten ihmisen matkan linssissä (≤ 3 virkettä, ≤ 240 merkkiä per jakso),
  // napautus ohittaa, uusinta napista. Kamera kuten yleiskamera (kohde + atsimuutti/korkeus/etäisyys, fov). Tekstit v2
  // Päätoimittajalta (faktat Sisältökirjuri 30.9., 5684d5d81) (docs/raportit/olavinlinna-kertoja-pulu-tekstit-20260930.md), odottavat omistajaa ja Sisältökirjuria.
  // Kamerapaikat: kohteet tilojen elava.kohde-pisteistä; kameraPysty iPhonen pystyasentoon (kuten tiloissa). Siirtoseppä
  // hioo kulmat natiivissa. Vanhat kentät (taulu, pulu, kasikirjoitus) säilyvät TF 1.0.57–72:n yhteensopivuutta varten. Ei ääntä ennen lupaa.
  kertoja: {
    jaksot: [
      { id: 'jarvelta', kesto_s: 11, aani: null,
        kamera: { kohde: [0, 2, 0], atsimuutti: 200, korkeus: 10, etaisyys: 230, fov: 32 },
        kameraPysty: { kohde: [0, 0, 2], atsimuutti: 200, korkeus: 14, etaisyys: 420, fov: 40 },
        teksti: 'Olavinlinna nousee kalliosaarelta Kyrönsalmessa. Sen rakentaminen alkoi vuonna 1475, ja linnan tehtävä oli vartioida valtakunnan itärajaa.' },
      { id: 'tornit', kesto_s: 11, aani: null,
        kamera: { kohde: [-27.4, 11, -12.8], atsimuutti: 230, korkeus: 16, etaisyys: 95, fov: 32 },
        kameraPysty: { kohde: [-27.4, 9, -12.8], atsimuutti: 230, korkeus: 20, etaisyys: 170, fov: 40 },
        teksti: 'Linnan perusti ritari Erik Akselinpoika Tott, ja se sai nimensä Pyhän Olavin mukaan. Sen kolme tornia ovat Kirkkotorni, Kellotorni ja Kijlin torni.' },
      { id: 'piha', kesto_s: 11, aani: null,
        kamera: { kohde: [-14.75, 3.5, -9.2], atsimuutti: 160, korkeus: 42, etaisyys: 85, fov: 32 },
        kameraPysty: { kohde: [-14.75, 2, -9.2], atsimuutti: 160, korkeus: 48, etaisyys: 150, fov: 40 },
        teksti: 'Linnaa johti vouti, joka hoiti kuninkaan puolesta veroja, oikeutta ja puolustusta. Arki kulki tulisijojen, vahtivuorojen ja veneiden tahdissa.' },
      // tila: kierroksen aikana laiturin leikkausikkuna aukeaa lennon jälkipuoliskolla (laituri on kuoren sisällä; Siirtoseppä 1.1 (74)),
      // ja natiivi käyttää laituri-tilan omaa kameraa (sijoitettu paikka). Jakson omat kamera-arvot poistettu (vanhentuneet).
      { id: 'laituri', tila: 'laituri', kesto_s: 12, aani: null,
        teksti: 'Linna jäi Turun rauhassa 1743 Venäjälle, ja vuonna 1812 Vanha Suomi liitettiin Suomen suuriruhtinaskuntaan. Nykyään Savonlinnan oopperajuhlat pidetään linnassa joka heinäkuu. Tutki linnaa: napauta huonetta.' },
    ],
  },
  // Voudin sinetti (käsikirjoitus kohta 4, Päätoimittaja 29.9.): vapaaehtoinen kolmen vihjeen etsintä; vaiheet ovat
  // tilojen etsinta[]-listoissa (keittiö → kappeli → fatabuuri), vihjeet näkyvät vasta kun huone on avattu. Löytö on
  // matkamuisto (ei Aarnin luettelon aarre): PeliOhjain.LoydaMatkamuisto('voudin-sinetti') (Pelikoodari). Kortin
  // faktat ovat yleistä keskiajan sinettitietoa (Sisältökirjuri era4 S1, S3: Olavinlinnan voudin sinetistä ei lähdettä).
  etsinnat: [{
    id: 'voudin-sinetti', nimi: 'Voudin sinetti', vaiheet: ['keittio', 'kappeli', 'fatabuuri'],
    kuvaus: 'Vouti on hukannut sinettisormuksensa.',
    kortti: {
      tila: 'tarkistettu',
      kohdat: [
        { teksti: 'Keskiajalla kirjeeseen ei kirjoitettu nimeä: aitouden takasi vahaan painettu sinetti.', lahde: 'Kansallisarkisto: Arkistojen Portti, Keskiajan asiakirjat' },
        { teksti: 'Sinettisormus oli suosittu 1100-luvulta keskiajan loppuun, ja siinä oli usein oman suvun vaakuna.', lahde: 'Wikipedia: Sinetti' },
      ],
    },
  }],
  // Linnan taulun laskeutumispiste pihan länsiosaan, ettei Pulu peitä Keittiö-lappua (DoF-savuke 29.9.).
  pulu: { laskeutuminen: [-10, 0.5, 0] },
  taulu: TAULU_LINNA,
  // Pulun kiertue (erä 3 kohta 5): laiturilta portille, torneihin ja muurille, lopuksi saliin ja keittiöön.
  kiertue: ['laituri', 'fatabuuri', 'kierreportaat', 'muurinharja', 'kappeli', 'keskushalli', 'keittio'],
  tilat: [
    TILA_MASSA, TILA_LAITURI, TILA_FATABUURI, TILA_KIERREPORTAAT, TILA_MUURINHARJA,
    TILA_KAPPELI, TILA_KESKUSHALLI, TILA_KEITTIO, TILA_TUNNELMA,
  ],
};
