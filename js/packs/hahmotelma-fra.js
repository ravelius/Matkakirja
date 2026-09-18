/*
 * RANSKAN HAHMOTELMAPISTEET — ensimmäinen kierros, pelkät pisteet.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 33) ====
 *
 * Sanatarkasti: *"Miksi Ranskassa kaikki pisteet ovat niin lahella
 * Pariisi … nostoja siis saisi mielellaan olla ympäri Ranskaa, vuoret,
 * linnat, alueet, muut merkittavat kohteet. Voi aluksi vaikka vain
 * hahmotella ne pisteet ja lisata pelkat pisteet kartalle ja tehda
 * niille vain otsikko pop-upit. Lisataan sisalto sitten sen jälkeen,
 * kun on saatu oikea määrä nostoja kartalle, jotta se nayttaa
 * tasapainoiselta."*
 *
 * TARKENNUS (sama päätös, kortit): ensimmäinen kierros NOIN 40 nostoa
 * koko Ranskassa nykyiset mukaan lukien; Fable valitsee kohteet ja
 * kirjoittaa otsikot vuoden 1873 näkökulmasta, tämä erä lisää pisteet
 * ja otsikko-pop-upit, sisältötekstit tulevat myöhemmin.
 *
 * === MITÄ TÄMÄ TIEDOSTO ON JA MITÄ SE EI OLE =======================
 *
 * Jokaisella rivillä on VAIN otsikko (`nimi`) ja yhden rivin alaotsikko
 * (`nappi`). Kortin leipätekstinä on sama alaotsikko ja rivi "Sisältö
 * tulossa." — ei tyhjää tekstiä, ei keksittyjä faktoja. EI KUVIA, EI
 * VISOJA, EI PULU-KYSYMYKSIÄ: ne kuuluvat toiseen erään, kun määrä ja
 * sijoittelu on hyväksytty. Lippu `hahmotelma: true` merkitsee rivin,
 * jonka sisältö on vielä kirjoittamatta, jotta seuraava erä löytää ne
 * yhdellä haulla.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ================================
 *
 * Nämä ovat kaikki AIDOSTI kaupungin ulkopuolella, ja PAATOKSET 34
 * kohta 4 sanoo juuri niiden jäävän kartalle omina pisteinään poltetun
 * merkin kokoisina. Sama reitti kuin maastokohteilla ja kuratoiduilla
 * kohteilla (js/fokuskohteet.js KOHDE_MAAT): pallolauta lukee merkit
 * sieltä, joten koko, ladonta ja ankkurit tulevat olemassa olevasta
 * nostomekanismista eikä tässä erässä ole koskettu
 * js/pallolauta/nostot.js:ään lainkaan.
 *
 * `lahi: true` on sama lähizoomiportti kuin maalehtinostoilla
 * (js/packs/maalehtinostot-fra.js, js/pallolauta/nostot.js
 * PAAKARTAN_MERKKIKATTO): saapumisnäkymässä pääkartan 21 merkin katto
 * pysyy, ja kohdemaassa portti päästää nämä esiin. Ilman lippua
 * uudet merkit olisivat työntäneet vanhoja katon yli.
 *
 * === KOORDINAATIT ==================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`) — ensimmäiset viisitoista
 * 17.9.2026, varaston kaksitoista 18.9.2026 — ja artikkelin nimi on
 * kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, sama Millerin
 * lieriö ja europe-tasaväli kuin maastokohteilla). Yhtäkään lukua ei
 * ole arvattu eikä luettu kartalta silmällä. Jokainen rivi osuu
 * Ranskan fokuslehden rajaukseen (`osuuLehteen`) eikä yksikään ole
 * minkään Ranskan kaupungin sisäpuolella
 * (js/pallolauta/kaupunkiliuska.js `onKaupunginSisainen`) — yksikään
 * ei siis valu kaupunkikartalle eikä kaupungin liuskaan.
 *
 * === MITÄ JÄI POIS ================================================
 *
 * Fablen kohdelistalla oli 32 nimeä. Viisi oli jo kartalla samalla
 * paikalla (Mont Blanc, Carcassonne, Avignonin paavinpalatsi,
 * Pont du Gard, Carnac — js/packs/maastokohteet-fra.js), eikä yhtäkään
 * toisteta tässä. Loput 27 ovat nyt kaikki tässä pakassa: ensimmäinen
 * erä 17.9.2026 otti viisitoista (peruste oli tyhjä alue kartalla —
 * Korsika, Burgundi, Pohjois-Ranska, Pyreneet ja Bretagne olivat
 * tyhjimmät) ja jätti kaksitoista varastoon raporttiin
 * docs/raportit/viesti-fable-ranska-hahmotelma-20260917.md; toinen erä
 * 18.9.2026 lisäsi nekin, jolloin Ranskan kaupungin ulkopuolisia
 * nostoja on 55 (17 maastokohdetta + 11 maalehtinostoa + 27 tässä).
 */

/** Kortin leipäteksti hahmotelmavaiheessa: alaotsikko + lupaus. */
const runko = (alaotsikko) => `${alaotsikko}. Sisältö tulossa.`;

/**
 * Lähderivi: koordinaatin alkuperä, ei sisällön. Hakupäivä on
 * parametri, koska pakka on kertynyt kahdessa erässä (ensimmäiset
 * viisitoista 17.9.2026, varaston kaksitoista 18.9.2026) eikä yhtään
 * lukua saa merkitä väärän ajon nimiin.
 */
const koordinaatinLahde = (artikkeli, haettu = '17.9.2026') => `en-Wikipedia "${artikkeli}", `
  + `prop=coordinates (haettu ${haettu}). Hahmotelmapiste: kortilla on `
  + 'toistaiseksi vain otsikko ja alaotsikko.';

/** Ranskan hahmotelmapisteet — otsikko-pop-up, ei sisältöä. */
export const HAHMOTELMA_FRA = [
  {
    id: 'hahmotelma-pic-du-midi',
    nimi: 'Pic du Midi de Bigorre',
    tyyppi: 'vuori',
    hahmotelma: true,
    lahi: true,
    nappi: 'Pyreneiden huippu, jonne rakennetaan observatoriota',
    // 0,14277778 E / 42,93638889 N — en-Wikipedia "Pic du Midi de Bigorre"
    laudat: {
      maailmankartta: { x: 5838.1, y: 1685.9 },
      europe: { x: 213.9, y: 764.4 },
    },
    teksti: runko('Pyreneiden huippu, jonne rakennetaan observatoriota'),
    lahde: koordinaatinLahde('Pic du Midi de Bigorre'),
  },
  {
    id: 'hahmotelma-lourdes',
    nimi: 'Lourdes',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Luola, jonne pyhiinvaeltajat virtaavat',
    // -0,04694444 E / 43,09416667 N — en-Wikipedia "Lourdes"
    laudat: {
      maailmankartta: { x: 5831.8, y: 1679.6 },
      europe: { x: 210.3, y: 760.2 },
    },
    teksti: runko('Luola, jonne pyhiinvaeltajat virtaavat'),
    lahde: koordinaatinLahde('Lourdes'),
  },
  {
    id: 'hahmotelma-canigou',
    nimi: 'Canigou',
    tyyppi: 'vuori',
    hahmotelma: true,
    lahi: true,
    nappi: 'Katalonian pyhä vuori',
    // 2,45666667 E / 42,51888889 N — en-Wikipedia "Canigó"
    // (haku "Canigou" ohjautuu tähän artikkeliin)
    laudat: {
      maailmankartta: { x: 5915.2, y: 1702.8 },
      europe: { x: 258.4, y: 775.4 },
    },
    teksti: runko('Katalonian pyhä vuori'),
    lahde: koordinaatinLahde('Canigó'),
  },
  {
    id: 'hahmotelma-verdon',
    nimi: 'Gorges du Verdon',
    tyyppi: 'joki',
    hahmotelma: true,
    lahi: true,
    nappi: 'Euroopan syvin kanjoni',
    // 6,36388889 E / 43,73777778 N — en-Wikipedia "Verdon Gorge"
    laudat: {
      maailmankartta: { x: 6045.5, y: 1653.5 },
      europe: { x: 333.4, y: 743.3 },
    },
    teksti: runko('Euroopan syvin kanjoni'),
    lahde: koordinaatinLahde('Verdon Gorge'),
  },
  {
    id: 'hahmotelma-chenonceau',
    nimi: 'Chenonceau',
    tyyppi: 'kulttuuri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Linna, joka seisoo joen päällä',
    // 1,0704 E / 47,3247 N — en-Wikipedia "Château de Chenonceau"
    laudat: {
      maailmankartta: { x: 5869, y: 1504.8 },
      europe: { x: 231.8, y: 649 },
    },
    teksti: runko('Linna, joka seisoo joen päällä'),
    lahde: koordinaatinLahde('Château de Chenonceau'),
  },
  {
    id: 'hahmotelma-saint-malo',
    nimi: 'Saint-Malo',
    tyyppi: 'merenkulku',
    hahmotelma: true,
    lahi: true,
    nappi: 'Merirosvojen muurikaupunki',
    // -2,0261 E / 48,6494 N — en-Wikipedia "Saint-Malo"
    laudat: {
      maailmankartta: { x: 5765.8, y: 1448.5 },
      europe: { x: 172.3, y: 614.1 },
    },
    teksti: runko('Merirosvojen muurikaupunki'),
    lahde: koordinaatinLahde('Saint-Malo'),
  },
  {
    id: 'hahmotelma-pointe-du-raz',
    nimi: 'Pointe du Raz',
    tyyppi: 'meri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Bretagnen läntisin kärki',
    // -4,74111111 E / 48,04027778 N — en-Wikipedia "Pointe du Raz"
    laudat: {
      maailmankartta: { x: 5675.3, y: 1474.5 },
      europe: { x: 120.2, y: 630.1 },
    },
    teksti: runko('Bretagnen läntisin kärki'),
    lahde: koordinaatinLahde('Pointe du Raz'),
  },
  {
    id: 'hahmotelma-etretat',
    nimi: 'Étretat',
    tyyppi: 'meri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Liitukalliot ja kiviportit',
    // 0,21 E / 49,71 N — en-Wikipedia "Étretat"
    laudat: {
      maailmankartta: { x: 5840.3, y: 1402.8 },
      europe: { x: 215.2, y: 586.2 },
    },
    teksti: runko('Liitukalliot ja kiviportit'),
    lahde: koordinaatinLahde('Étretat'),
  },
  {
    id: 'hahmotelma-amiens',
    nimi: 'Amiensin tuomiokirkko',
    tyyppi: 'kulttuuri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Ranskan suurin goottilainen kirkko',
    // 2,30222222 E / 49,895 N — en-Wikipedia "Amiens Cathedral"
    laudat: {
      maailmankartta: { x: 5910.1, y: 1394.7 },
      europe: { x: 255.4, y: 581.4 },
    },
    teksti: runko('Ranskan suurin goottilainen kirkko'),
    lahde: koordinaatinLahde('Amiens Cathedral'),
  },
  {
    id: 'hahmotelma-reims',
    nimi: 'Reims',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Kuninkaiden kruunauskirkko ja samppanjakellarit',
    // 4,0347 E / 49,2628 N — en-Wikipedia "Reims"
    laudat: {
      maailmankartta: { x: 5967.8, y: 1422.1 },
      europe: { x: 288.7, y: 598 },
    },
    teksti: runko('Kuninkaiden kruunauskirkko ja samppanjakellarit'),
    lahde: koordinaatinLahde('Reims'),
  },
  {
    id: 'hahmotelma-vezelay',
    nimi: 'Vézelay',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Pyhiinvaelluksen lähtökirkko kukkulalla',
    // 3,74861111 E / 47,46638889 N — en-Wikipedia "Vézelay Abbey"
    // (kylän oma artikkeli antaa 3,7467 / 47,4667; piste on luostarin)
    laudat: {
      maailmankartta: { x: 5958.3, y: 1498.8 },
      europe: { x: 283.2, y: 645.2 },
    },
    teksti: runko('Pyhiinvaelluksen lähtökirkko kukkulalla'),
    lahde: koordinaatinLahde('Vézelay Abbey'),
  },
  {
    id: 'hahmotelma-beaune',
    nimi: 'Beaunen Hôtel-Dieu',
    tyyppi: 'kulttuuri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Sairaala, jonka katto hohtaa väreissä',
    // 4,83666667 E / 47,02194444 N — en-Wikipedia "Hospices de Beaune"
    laudat: {
      maailmankartta: { x: 5994.6, y: 1517.6 },
      europe: { x: 304.1, y: 656.9 },
    },
    teksti: runko('Sairaala, jonka katto hohtaa väreissä'),
    lahde: koordinaatinLahde('Hospices de Beaune'),
  },
  {
    id: 'hahmotelma-ajaccio',
    nimi: 'Ajaccio',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Napoleonin syntymäkaupunki',
    // 8,7369 E / 41,9267 N — en-Wikipedia "Ajaccio"
    laudat: {
      maailmankartta: { x: 6124.6, y: 1726.5 },
      europe: { x: 378.9, y: 790.9 },
    },
    teksti: runko('Napoleonin syntymäkaupunki'),
    lahde: koordinaatinLahde('Ajaccio'),
  },
  {
    id: 'hahmotelma-bonifacio',
    nimi: 'Bonifacio',
    tyyppi: 'merenkulku',
    hahmotelma: true,
    lahi: true,
    nappi: 'Kaupunki kalkkikiven reunalla',
    // 9,156876 E / 41,386814 N — en-Wikipedia "Bonifacio, Corse-du-Sud"
    laudat: {
      maailmankartta: { x: 6138.6, y: 1748 },
      europe: { x: 387, y: 805.1 },
    },
    teksti: runko('Kaupunki kalkkikiven reunalla'),
    lahde: koordinaatinLahde('Bonifacio, Corse-du-Sud'),
  },
  {
    id: 'hahmotelma-place-stanislas',
    nimi: 'Nancy, Place Stanislas',
    tyyppi: 'kulttuuri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Kuninkaan aukio kullatuin portein',
    // 6,18305556 E / 48,69361111 N — en-Wikipedia "Place Stanislas"
    laudat: {
      maailmankartta: { x: 6039.4, y: 1446.6 },
      europe: { x: 329.9, y: 613 },
    },
    teksti: runko('Kuninkaan aukio kullatuin portein'),
    lahde: koordinaatinLahde('Place Stanislas'),
  },
  /* ================= VARASTON KAKSITOISTA (18.9.2026) ==============
   *
   * Nämä ovat täsmälleen ne kohteet, jotka ensimmäinen erä jätti pois
   * määrän vuoksi (docs/raportit/viesti-fable-ranska-hahmotelma-
   * 20260917.md, osio 4). Raamattu KARTTAUUDISTUKSEN PAATOKSET 33
   * TARKENNUS + PAATOKSET 34 TARKENNUS 2: varasto otetaan käyttöön,
   * kun kartta kaipaa lisää pisteitä — summa 43 → 55 kaupungin
   * ulkopuolisia nostoja (maastokohteet 17 + maalehtinostot 11 +
   * hahmotelma 27).
   *
   * Sama sääntö kuin yllä: vain otsikko ja yhden rivin alaotsikko, ei
   * kuvia, ei visoja, ei sisältötekstiä, ei keksittyjä faktoja.
   * Asteet en-Wikipedian rajapinnasta 18.9.2026, laudan luvut pelin
   * omalla kaavalla (tools/johda-maastokohteet.mjs `laudat`).
   * Jokainen osuu Ranskan lehden rajaukseen (`osuuLehteen`), on
   * maamaskin mukaan maalla (tools/maamaski.mjs) eikä yksikään ole
   * minkään Ranskan kaupungin sisäpuolella (`onKaupunginSisainen`);
   * lähin on Saint-Émilion 35,2 km Bordeaux'sta.
   */
  {
    id: 'hahmotelma-mont-ventoux',
    nimi: 'Mont Ventoux',
    tyyppi: 'vuori',
    hahmotelma: true,
    lahi: true,
    nappi: 'Provencen tuulinen huippu, 1 910 m',
    // 5,27888889 E / 44,17444444 N — en-Wikipedia "Mont Ventoux"
    laudat: {
      maailmankartta: { x: 6009.3, y: 1635.7 },
      europe: { x: 312.6, y: 731.8 },
    },
    teksti: runko('Provencen tuulinen huippu, 1 910 m'),
    lahde: koordinaatinLahde('Mont Ventoux', '18.9.2026'),
  },
  {
    id: 'hahmotelma-puy-de-sancy',
    nimi: 'Puy de Sancy',
    tyyppi: 'vuori',
    hahmotelma: true,
    lahi: true,
    nappi: 'Massif Centralin korkein huippu',
    // 2,81416667 E / 45,52833333 N — en-Wikipedia "Puy de Sancy"
    laudat: {
      maailmankartta: { x: 5927.1, y: 1580 },
      europe: { x: 265.2, y: 696.2 },
    },
    teksti: runko('Massif Centralin korkein huippu'),
    lahde: koordinaatinLahde('Puy de Sancy', '18.9.2026'),
  },
  {
    id: 'hahmotelma-amboise',
    nimi: 'Amboisen linna',
    tyyppi: 'kulttuuri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Kuninkaiden linna Loiren yllä',
    // 0,98603 E / 47,41368 N — en-Wikipedia "Château d'Amboise"
    laudat: {
      maailmankartta: { x: 5866.2, y: 1501.1 },
      europe: { x: 230.1, y: 646.6 },
    },
    teksti: runko('Kuninkaiden linna Loiren yllä'),
    lahde: koordinaatinLahde("Château d'Amboise", '18.9.2026'),
  },
  {
    id: 'hahmotelma-nimesin-areena',
    nimi: 'Nîmesin areena',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Roomalainen amfiteatteri yhä pystyssä',
    // 4,36 E / 43,835 N — en-Wikipedia "Arena of Nîmes"
    laudat: {
      maailmankartta: { x: 5978.7, y: 1649.5 },
      europe: { x: 294.9, y: 740.7 },
    },
    teksti: runko('Roomalainen amfiteatteri yhä pystyssä'),
    lahde: koordinaatinLahde('Arena of Nîmes', '18.9.2026'),
  },
  {
    id: 'hahmotelma-rouen',
    nimi: 'Rouenin tuomiokirkko',
    tyyppi: 'kulttuuri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Normandian goottilainen katedraali',
    // 1,095 E / 49,4402 N — en-Wikipedia "Rouen Cathedral"
    laudat: {
      maailmankartta: { x: 5869.8, y: 1414.5 },
      europe: { x: 232.2, y: 593.3 },
    },
    teksti: runko('Normandian goottilainen katedraali'),
    lahde: koordinaatinLahde('Rouen Cathedral', '18.9.2026'),
  },
  {
    id: 'hahmotelma-rocamadour',
    nimi: 'Rocamadour',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Pyhiinvaelluskylä kallioseinämässä',
    // 1,6186 E / 44,8003 N — en-Wikipedia "Rocamadour"
    laudat: {
      maailmankartta: { x: 5887.3, y: 1610 },
      europe: { x: 242.3, y: 715.4 },
    },
    teksti: runko('Pyhiinvaelluskylä kallioseinämässä'),
    lahde: koordinaatinLahde('Rocamadour', '18.9.2026'),
  },
  {
    id: 'hahmotelma-saint-emilion',
    nimi: 'Saint-Émilion',
    tyyppi: 'ruoka',
    hahmotelma: true,
    lahi: true,
    nappi: 'Viinikylä ja kallioon hakattu kirkko',
    // -0,1547 E / 44,8936 N — en-Wikipedia "Saint-Émilion"
    laudat: {
      maailmankartta: { x: 5828.2, y: 1606.2 },
      europe: { x: 208.2, y: 712.9 },
    },
    teksti: runko('Viinikylä ja kallioon hakattu kirkko'),
    lahde: koordinaatinLahde('Saint-Émilion', '18.9.2026'),
  },
  {
    id: 'hahmotelma-cognac',
    nimi: 'Cognac',
    tyyppi: 'ruoka',
    hahmotelma: true,
    lahi: true,
    nappi: 'Charenten kaupunki, joka antoi nimen polttoviinille',
    // -0,33 E / 45,7 N — en-Wikipedia "Cognac, France"
    // (haku "Cognac, Charente" ohjautuu tähän artikkeliin)
    laudat: {
      maailmankartta: { x: 5822.3, y: 1572.8 },
      europe: { x: 204.9, y: 691.7 },
    },
    teksti: runko('Charenten kaupunki, joka antoi nimen polttoviinille'),
    lahde: koordinaatinLahde('Cognac, France', '18.9.2026'),
  },
  {
    id: 'hahmotelma-vichy',
    nimi: 'Vichy',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Kylpyläkaupunki kivennäislähteiden äärellä',
    // 3,4267 E / 46,1278 N — en-Wikipedia "Vichy"
    laudat: {
      maailmankartta: { x: 5947.6, y: 1555 },
      europe: { x: 277, y: 680.4 },
    },
    teksti: runko('Kylpyläkaupunki kivennäislähteiden äärellä'),
    lahde: koordinaatinLahde('Vichy', '18.9.2026'),
  },
  {
    id: 'hahmotelma-biarritz',
    nimi: 'Biarritz',
    tyyppi: 'meri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Merikylpylä Biskajanlahden rannalla',
    // -1,56 E / 43,48 N — en-Wikipedia "Biarritz"
    laudat: {
      maailmankartta: { x: 5781.3, y: 1663.9 },
      europe: { x: 181.2, y: 750.1 },
    },
    teksti: runko('Merikylpylä Biskajanlahden rannalla'),
    lahde: koordinaatinLahde('Biarritz', '18.9.2026'),
  },
  {
    /*
     * CANAL DU MIDI — PISTE KANAVAN VARRELLA, EI TOULOUSESSA.
     * Kanavan omalla en-artikkelilla ei ole `prop=coordinates`-
     * lukua, ja kanavan päätepiste Toulousessa osuisi Toulousen oman
     * kaupunkimerkin päälle (pakka näkyvistä kaupungeista).
     * Piste on siksi kanavan vedenjakajalla Seuil de Naurouzessa,
     * Toulousen ja Carcassonnen välissä: 42,4 km Toulousesta ja
     * 47 km Carcassonnen linnoituskaupungista, eli kumpikaan merkki
     * ei jää alle.
     */
    id: 'hahmotelma-canal-du-midi',
    nimi: 'Canal du Midi',
    tyyppi: 'tekniikka',
    hahmotelma: true,
    lahi: true,
    nappi: 'Kanava, joka yhdistää kaksi merta',
    // 1,81862 E / 43,35071 N — en-Wikipedia "Seuil de Naurouze"
    laudat: {
      maailmankartta: { x: 5894, y: 1669.2 },
      europe: { x: 246.1, y: 753.5 },
    },
    teksti: runko('Kanava, joka yhdistää kaksi merta'),
    lahde: koordinaatinLahde('Seuil de Naurouze', '18.9.2026'),
  },
  {
    id: 'hahmotelma-le-puy-en-velay',
    nimi: 'Le Puy-en-Velay',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Kaupunki tulivuorenneulojen keskellä',
    // 3,88472222 E / 45,04444444 N — en-Wikipedia "Le Puy-en-Velay"
    laudat: {
      maailmankartta: { x: 5962.8, y: 1599.9 },
      europe: { x: 285.8, y: 708.9 },
    },
    teksti: runko('Kaupunki tulivuorenneulojen keskellä'),
    lahde: koordinaatinLahde('Le Puy-en-Velay', '18.9.2026'),
  },
];
