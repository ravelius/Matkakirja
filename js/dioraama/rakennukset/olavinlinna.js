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
// Keittiö G 102 (7.10.2026): uusi keittiö lähteiden mukaiseen eteläsiipeen, kohdistettava: false natiivin todennukseen asti.
import { TILA as TILA_KEITTIO_G102 } from './olavinlinna/keittio-g102.js';
import { TILA as TILA_TUNNELMA } from './olavinlinna/tunnelma.js';
import { TILA_LINNANTUPA, TILA_VOUDIN_SALI } from './olavinlinna/palatsi.js';
import { kohtauksetV3 } from './olavinlinna/kohtaukset-v3.js';

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
  // Ympäristömallien lisäkentät id:n mukaan (rakenna.mjs → ymparisto.mallit[]): vene on rekvisiitta, jonka Timeline sijoittaa
  // (Siirtoseppä 7.10.: maailmaan false = ei piirretä maailman origoon).
  ymparistoMallit: { vene: { maailmaan: false } },
  // Pystyleikkeen portinvartija (Siirtoseppä 7.10.): paikka ja reitti käsikirjoituksesta, kun kohtaus lukittu.
  lisaHenkilot: ['portinvartija-1500'],
  lisaPinnat: ['rantakivi'],   // ranta-1499:n kivet (Blender-kävely), natiivi ottaa värin ja kuvan rakennus.jsonin pinnoista
  otsikko: 'Olavinlinna – elävä linna',
  versio: 1,
  // 9.10.2026 (Siirtoseppä): CC BY 4.0 -aineistojen nimeäminen historia-animaation vaihemalleista (restaurointikuvat,
  // MML:n korkeusmalli tyhjässä saaressa ja puuvarustuksessa).
  lahteet: [
    { nimi: 'Kansallismuseo: Olavinlinnan historiaa', osoite: 'https://www.kansallismuseo.fi/fi/olavinlinna/historiaa' },
    { nimi: 'Restaurointikuvat 1961–1975: Museovirasto, CC BY 4.0', osoite: 'https://www.finna.fi/Search/Results?lookfor=Olavinlinna+restaurointi&filter%5B%5D=building%3A%220%2FMV%2F%22' },
    { nimi: 'Korkeusmalli 2 m: Maanmittauslaitos, CC BY 4.0', osoite: 'https://www.maanmittauslaitos.fi/avoindata-lisenssi-cc40' },
  ],
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
  // Yhtenäinen kamera-ajo (omistaja 6.10. klo 13.1x: "sisääntuloajo ei ole pehmeästi synkassa esittelyn kamera-ajon kanssa"):
  // loppu 'kertoja' = saapumiskaari päättyy suoraan kertojan 1. jakson kameraan (järveltä 200°, sama atsimuutti kuin kaaren
  // alku, joten kaari on suora liuku 600 → 230 m), ei yleisnäkymään välissä. Natiivi (Siirtoseppä) lukee kentän; vanhat ohittavat.
  saapuminen: { alku: { atsimuutti: 200, etaisyys: 600, korkeus: 8 }, kesto: 6, lyhyt: 6, loppu: 'kertoja' },
  // Kertoja (noin 45 s): 4 jaksoa, tekstilaatikko kuten ihmisen matkan linssissä (≤ 3 virkettä, ≤ 240 merkkiä per jakso),
  // napautus ohittaa, uusinta napista. Kamera kuten yleiskamera (kohde + atsimuutti/korkeus/etäisyys, fov). Tekstit v2
  // Päätoimittajalta (faktat Sisältökirjuri 30.9., 5684d5d81) (docs/raportit/olavinlinna-kertoja-pulu-tekstit-20260930.md), odottavat omistajaa ja Sisältökirjuria.
  // Kamerapaikat: kohteet tilojen elava.kohde-pisteistä; kameraPysty iPhonen pystyasentoon (kuten tiloissa). Siirtoseppä
  // hioo kulmat natiivissa. Vanhat kentät (taulu, pulu, kasikirjoitus) säilyvät TF 1.0.57–72:n yhteensopivuutta varten. Ääni 1.10.2026: isoisä
  // (Viisas Kertoja, eleven_v3; omistaja 30.9. klo 23.5x), kesto_s vähintään äänen kesto + 0,5 s.
  // Avainsanat (Päätoimittaja 5.10. hyväksyi, omistajan toive): enintään 6; t_s = sekuntia kertojan klipin alusta (ElevenLabs-
  // kohdistus 5.10.; v3 Williamin äänellä; 8.10. ajat v4: _valmiit/linna-kohtaukset-v4/ajat/avaus-avainsanat.json), natiivi häivyttää sisään t_s:ssä ja pois noin 4 s:n jälkeen. Web ohittaa.
  kertoja: {
    jaksot: [
      { id: 'jarvelta', kesto_s: 13, aani: 'linna-kertoja-jarvelta',
        kamera: { kohde: [0, 2, 0], atsimuutti: 200, korkeus: 10, etaisyys: 230, fov: 32 },
        kameraPysty: { kohde: [0, 0, 2], atsimuutti: 200, korkeus: 14, etaisyys: 420, fov: 40 },
        teksti: 'Olavinlinna nousee kalliosaarelta Kyrönsalmessa. Sen rakentaminen alkoi vuonna 1475, ja linnan tehtävä oli vartioida valtakunnan itärajaa.',
        avainsanat: [{ t_s: 5.56, vuosi: '1475', sanat: 'Rakentaminen alkaa' }] },
      // Kolme tornia saman kokoisina (omistaja 6.10.): kamera kohtisuoraan tornilinjaa vastaan (atsimuutti 157°, linnan pihan
      // puoli), 260 m, jolloin tornien etäisyydet eroavat ≤ 1,1 % (Kellotorni 261, Kirkkotorni 258, Kijlin torni 260 m).
      // Tornien paikat ulkokuoren kattohuipuista (Linnanrakentaja 6.10.). Pystykenttä 16° (vaaka) / 66° (iPhone pysty: korkeampi
      // kulma ja matalampi kohde, jolloin linna on kuvan yläpuoliskolla kortin yllä). Tarkistettu Blender-renderöinnillä molemmista.
      // nimet: nimikylttipohja tornin kärjen yläpuolella 3 s, kun kertoja sanoo nimen (sanakohdistus, ajat/linna-kertoja-tornit.json).
      { id: 'tornit', kesto_s: 14, aani: 'linna-kertoja-tornit',
        kamera: { kohde: [-1.0, 22, -20.7], atsimuutti: 157, korkeus: 8, etaisyys: 260, fov: 16 },
        kameraPysty: { kohde: [-1.0, -20, -20.7], atsimuutti: 157, korkeus: 14, etaisyys: 260, fov: 66 },
        nimet: [
          { teksti: 'Kirkkotorni', paikka: [-15.13, 38.8, -14.03], alku_s: 8.48, kesto_s: 3 },
          { teksti: 'Kellotorni', paikka: [-44.05, 45.2, -4.61], alku_s: 9.68, kesto_s: 3 },
          { teksti: 'Kijlin torni', paikka: [47.5, 34.4, -43.44], alku_s: 10.88, kesto_s: 3 },
        ],
        teksti: 'Linnan perusti ritari Erik Akselinpoika Tott, ja se sai nimensä Pyhän Olavin mukaan. Sen kolme tornia ovat Kirkkotorni, Kellotorni ja Kijlin torni.',
        avainsanat: [{ t_s: 1.72, sanat: 'Erik Akselinpoika Tott' }] },
      { id: 'piha', kesto_s: 12, aani: 'linna-kertoja-piha',
        kamera: { kohde: [-14.75, 3.5, -9.2], atsimuutti: 160, korkeus: 42, etaisyys: 85, fov: 32 },
        kameraPysty: { kohde: [-14.75, 2, -9.2], atsimuutti: 160, korkeus: 48, etaisyys: 150, fov: 40 },
        teksti: 'Linnaa johti vouti, joka hoiti kuninkaan puolesta veroja, oikeutta ja puolustusta. Arki kulki tulisijojen, vahtivuorojen ja veneiden tahdissa.',
        avainsanat: [{ t_s: 0.82, sanat: 'Linnanvouti' }] },
      // tila: kierroksen aikana laiturin leikkausikkuna aukeaa lennon jälkipuoliskolla (laituri on kuoren sisällä; Siirtoseppä 1.1 (74)),
      // ja natiivi käyttää laituri-tilan omaa kameraa (sijoitettu paikka). Jakson omat kamera-arvot poistettu (vanhentuneet).
      { id: 'laituri', tila: 'laituri', kesto_s: 21, aani: 'linna-kertoja-laituri',
        teksti: 'Linna jäi Turun rauhassa 1743 Venäjälle, ja vuonna 1812 Vanha Suomi liitettiin Suomen suuriruhtinaskuntaan. Nykyään Savonlinnan oopperajuhlat pidetään linnassa joka heinäkuu. Tutki linnaa: napauta huonetta.',
        avainsanat: [{ t_s: 0.74, vuosi: '1743', sanat: 'Turun rauha' }, { t_s: 5.86, vuosi: '1812', sanat: 'Vanha Suomi' },
          { t_s: 13.3, sanat: 'Oopperajuhlat' }] },
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
    TILA_KAPPELI, TILA_KESKUSHALLI, TILA_KEITTIO, TILA_TUNNELMA, TILA_KEITTIO_G102,
    TILA_LINNANTUPA, TILA_VOUDIN_SALI,
  ].map(kohtauksetV3), // kohtaukset v3 (5.10.): kertoja + keskustelu, käsikirjoitus pulu-lenna + taulu (olavinlinna/kohtaukset-v3.js)
};
