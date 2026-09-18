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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-nimesin-areena-1de0f981.jpg',
      lyhyt: 'Areenan kaarijulkisivu illan valossa.',
      selite: 'Nîmesin areenan kaksikerroksinen kaarijulkisivu ja sen edustan aukio illan valaistuksessa.',
      lahde: 'Valokuva: Greg68m, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Greg68m',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Amphith%C3%A9atre_de_N%C3%AEmes.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-nimesin-areena-3ea76153.jpg',
      lyhyt: 'Areena vanhassa photochrom-värivedoksessa.',
      selite: 'Areenan ulkokehä ja mukulakivinen aukio Library of Congressin photochrom-kokoelman värivedoksessa.',
      lahde: 'Valokuva: Photochrom Print Collection (Library of Congress), Wikimedia Commons (public domain).',
      tekija: 'Photochrom Print Collection (Library of Congress)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_arena%2C_exterior%2C_N%C3%AEmes%2C_France-LCCN2001698489.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    }],
    nimi: 'Nîmesin areena',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuinka moni katsoja tänne mahtui?',
      'Miksi juuri tämä amfiteatteri säilyi näin ehjänä?',
    ],
    nappi: 'Roomalainen amfiteatteri yhä pystyssä',
    // 4,36 E / 43,835 N — en-Wikipedia "Arena of Nîmes"
    laudat: {
      maailmankartta: { x: 5978.7, y: 1649.5 },
      europe: { x: 294.9, y: 740.7 },
    },
    teksti: 'Nîmesin areena on roomalainen amfiteatteri Etelä-Ranskassa. Se rakennettiin noin '
      + 'vuonna 100 jaa., vain parikymmentä vuotta Rooman Colosseumin jälkeen, ja se on yksi '
      + 'maailman parhaiten säilyneistä roomalaisista amfiteattereista. Rakennus on 133 metriä '
      + 'pitkä ja 101 metriä leveä, ja itse areena mittaa 68 × 38 metriä; ulkojulkisivu kohoaa '
      + '21 metriin, ja siinä on kaksi kerrosta ja yhteensä 60 kaariaukkoa. Roomalaisaikaan '
      + 'katsomoon mahtui 24 000 katsojaa 34 penkkiriville, jotka oli jaettu neljään erilliseen '
      + 'lohkoon.',
    lahde: 'en-Wikipedia "Arena of Nîmes", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-rouen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-rouen-670ab4d8.jpg',
      lyhyt: 'Tuomiokirkon kolme tornia ja valurautainen torninhuippu.',
      selite: 'Rouenin tuomiokirkon kolme eri tyylistä tornia ja niiden välissä kohoava valurautainen torninhuippu, kuvattuna Gros Horloge -tornista.',
      lahde: 'Valokuva: DXR, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'DXR',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rouen_Cathedral_as_seen_from_Gros_Horloge_140215_4.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-rouen-296fbe0d.jpg',
      lyhyt: 'Claude Monet\'n maalaus kirkon länsijulkisivusta auringonvalossa.',
      selite: 'Claude Monet maalasi tuomiokirkon länsijulkisivun kymmeniä kertoja eri valossa; tässä työssä julkisivu hehkuu auringossa.',
      lahde: 'Maalaus: Claude Monet, Wikimedia Commons (public domain).',
      tekija: 'Claude Monet',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Rouen_Cathedral%2C_West_Facade%2C_Sunlight.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    }],
    nimi: 'Rouenin tuomiokirkko',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi kolme tornia ovat kaikki erinäköisiä?',
      'Kauanko kirkko ehti olla maailman korkein rakennus?',
    ],
    nappi: 'Normandian goottilainen katedraali',
    // 1,095 E / 49,4402 N — en-Wikipedia "Rouen Cathedral"
    laudat: {
      maailmankartta: { x: 5869.8, y: 1414.5 },
      europe: { x: 232.2, y: 593.3 },
    },
    teksti: 'Rouenin tuomiokirkko on Normandian arkkipiispan istuinkirkko. Sitä rakennettiin ja '
      + 'rakennettiin uudelleen yli kahdeksansadan vuoden ajan, joten siinä on piirteitä '
      + 'varhaisgotiikasta myöhäiseen liekkigotiikkaan ja renessanssiin — kolme tornia ovat '
      + 'kaikki eri tyyliä. Vuosina 1876–1880 kirkko oli maailman korkein rakennus. Claude '
      + 'Monet maalasi sen julkisivusta kokonaisen sarjan impressionistisia töitä.',
    lahde: 'en-Wikipedia "Rouen Cathedral", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-rocamadour',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-rocamadour-a508d570.jpg',
      lyhyt: 'Kylän talot ja kirkot kiinni kalkkikiviseinämässä.',
      selite: 'Rocamadourin talot, pyhäköt ja piispanpalatsi nousevat portaittain kiinni kalkkikiviseinämään.',
      lahde: 'Valokuva: Einaz80, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Einaz80',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rocamadour_(2024).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-rocamadour-8183aad8.jpg',
      lyhyt: 'Pyhiinvaeltajien portaat lokakuussa 1900.',
      selite: 'Kävijöitä laskeutumassa pyhäköille johtavia portaita Rocamadourissa lokakuussa 1900, Eugène Trutat\'n lasilevykuvassa.',
      lahde: 'Valokuva: Eugène Trutat (1840–1910), Gallica / Wikimedia Commons (public domain).',
      tekija: 'Eugène Trutat',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Escalier_avec_des_gens_qui_descendent%2C_Rocamadour%2C_octobre_1900_-_btv1b10578985x.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    }],
    nimi: 'Rocamadour',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka kiipesi näitä portaita polvillaan?',
      'Mistä pieni vuohenjuusto sai nimensä?',
    ],
    nappi: 'Pyhiinvaelluskylä kallioseinämässä',
    // 1,6186 E / 44,8003 N — en-Wikipedia "Rocamadour"
    laudat: {
      maailmankartta: { x: 5887.3, y: 1610 },
      europe: { x: 242.3, y: 715.4 },
    },
    teksti: 'Rocamadour on kylä Lotin departementissa Lounais-Ranskassa, entisessä Quercyn '
      + 'maakunnassa. Se on rakennettu kallioseinämään, joka kohoaa 150 metriä Alzoun kapean '
      + 'laakson yläpuolelle; Alzou on Dordognen sivujoki. Kylän Neitsyt Marian pyhäkkö on '
      + 'vetänyt pyhiinvaeltajia 1100-luvun taitteesta alkaen, ja kävijöiden joukossa on ollut '
      + 'kuninkaita, piispoja ja aatelisia — monumentaalista portaikkoa pyhäköille noustiin '
      + 'polvillaan. Kylän mukaan on nimetty myös Rocamadour, pieni vuohenmaitojuusto, joka sai '
      + 'AOC-suojauksen vuonna 1996.',
    lahde: 'en- ja fr-Wikipedia "Rocamadour", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-saint-emilion',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-saint-emilion-bec0079a.jpg',
      lyhyt: 'Kaupungin tori ja tiilikattoinen keskusta yksikivisen kirkon tornista.',
      selite: 'Saint-Émilionin mukulakivinen tori ja tiilikattoinen keskusta yksikivisen kirkon kellotornista kuvattuna; taustalla viinikukkuloita.',
      lahde: 'Valokuva: JLPC, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'JLPC',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Saint-Emilion_33_Place_2013.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-saint-emilion-04355517.jpg',
      lyhyt: 'Kallioon louhitun kirkon portaali vanhassa valokuvassa.',
      selite: 'Kallioon louhitun yksikivisen kirkon veistoksinen portaali Jean-Auguste Brutailsin varhaisessa valokuvassa.',
      lahde: 'Valokuva: Jean-Auguste Brutails, Université Bordeaux Montaigne / Wikimedia Commons (public domain).',
      tekija: 'Jean-Auguste Brutails',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C3%89glise_monolithe_de_Saint-%C3%89milion_-_J-A_Brutails_-_Universit%C3%A9_Bordeaux_Montaigne_-_2520.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    }],
    nimi: 'Saint-Émilion',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miten kokonainen kirkko louhitaan kallion sisään?',
      'Mikä tekee näistä kukkuloista niin hyviä viinille?',
    ],
    nappi: 'Viinikylä ja kallioon hakattu kirkko',
    // -0,1547 E / 44,8936 N — en-Wikipedia "Saint-Émilion"
    laudat: {
      maailmankartta: { x: 5828.2, y: 1606.2 },
      europe: { x: 208.2, y: 712.9 },
    },
    teksti: 'Saint-Émilion on keskiaikainen pikkukaupunki Gironden departementissa '
      + 'Lounais-Ranskassa, viinikukkuloiden keskellä Libournais\'n sydämessä. Se seisoo '
      + 'kalkkikivikummulla Bordeaux\'n, Saintongen ja Périgord\'n risteyskohdassa, ja '
      + 'asukkaita on vain noin 1 600. Kallioon louhittu yksikivinen kirkko, kollegiaattikirkko, '
      + 'arkkipiispojen palatsi ja linnoituksen jäänteet reunustavat jyrkkiä ja kapeita kujia. '
      + 'Kaupunki ympäröivine viinitarhoineen otettiin Unescon maailmanperintöluetteloon vuonna '
      + '1999 pitkän ja yhä elävän viininviljelyhistoriansa vuoksi.',
    lahde: 'en- ja fr-Wikipedia "Saint-Émilion", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-cognac',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-cognac-1090d2ed.jpg',
      lyhyt: 'Cognacin vanha keskusta ja Charentejoki ilmasta.',
      selite: 'Ilmakuva Cognacin historiallisesta keskustasta; Charentejoki kaartaa vasemmalla, ja Pont Neufin jatkeella näkyy kaupungin linna.',
      lahde: 'Valokuva: Jacques Dassié, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jacques Dassié',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cognac_Centre_historique.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-cognac-300a0fa2.jpg',
      lyhyt: 'Vanha charentelainen tislauspannu.',
      selite: 'Vanha kuparinen tislauspannu, joka oli vuoteen 1979 asti käytössä viinitilalla Cherves-Richemontissa Cognacin lähellä.',
      lahde: 'Valokuva: Sémhur, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Sémhur',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Old_Cognac_Pot_Still_-_20091205.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    }],
    nimi: 'Cognac',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi juoma sai nimensä juuri tästä kaupungista?',
      'Mihin kuparipannua tarvitaan?',
    ],
    nappi: 'Charenten kaupunki, joka antoi nimen polttoviinille',
    // -0,33 E / 45,7 N — en-Wikipedia "Cognac, France"
    // (haku "Cognac, Charente" ohjautuu tähän artikkeliin)
    laudat: {
      maailmankartta: { x: 5822.3, y: 1572.8 },
      europe: { x: 204.9, y: 691.7 },
    },
    teksti: 'Cognac on kaupunki Charenten departementissa Lounais-Ranskassa ja departementin '
      + 'alaprefektuuri. Se sijaitsee Charentejoen varrella Angoulêmen ja Saintesin välissä ja '
      + 'on Angoulêmen jälkeen departementin toiseksi suurin taajama. Kaupungin mukaan nimensä '
      + 'saanut konjakki valmistetaan sen ympäristössä. Vuodesta 2012 Cognac on kantanut '
      + 'kulttuuriministeriön myöntämää Ville d\'art et d\'histoire -nimitystä.',
    lahde: 'fi-Wikipedia "Cognac" ja fr-Wikipedia "Cognac (Charente)", johdanto-osat '
      + '(tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-vichy',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-vichy-281159da.jpg',
      lyhyt: 'Lähdepuiston puinen myymäläkioski plataanien katveessa.',
      selite: 'Vaaleanvihreä puinen myymäläkioski Vichyn lähdepuiston pohjoispäässä, plataanien katveessa.',
      lahde: 'Valokuva: Romainbehar, Wikimedia Commons (CC0).',
      tekija: 'Romainbehar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vichy_-_Parc_des_Sources%2C_kiosques_boutiques.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-vichy-1f180188.jpg',
      lyhyt: 'Vichyn kylpylälaitokset vuoden 1862 puupiirroksessa.',
      selite: 'Vichyn kylpylälaitokset, puistokäytävät ja vaunut vuoden 1862 kuvateoksen puupiirroksessa, jonka otsikkona on "Eaux thermales de Vichy".',
      lahde: 'Kuva: Charles-Émile Jacque (1813–1894), Gallica / Wikimedia Commons (public domain).',
      tekija: 'Charles-Émile Jacque',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vichy_(Allier)_-_btv1b10571602q.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    }],
    nimi: 'Vichy',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä kylpylävieraat oikein tekivät täällä?',
      'Miksi juuri tämä kaupunki jäi historiaan sodan takia?',
    ],
    nappi: 'Kylpyläkaupunki kivennäislähteiden äärellä',
    // 3,4267 E / 46,1278 N — en-Wikipedia "Vichy"
    laudat: {
      maailmankartta: { x: 5947.6, y: 1555 },
      europe: { x: 277, y: 680.4 },
    },
    teksti: 'Vichy on noin 25 000 asukkaan kaupunki Allier\'n departementissa Keski-Ranskassa, '
      + 'Allierjoen rannalla. Sen kivennäislähteet tunnettiin jo antiikin aikana, ja '
      + 'kylpyläkaupunkina se kasvoi voimakkaasti 1800-luvulla; vuonna 1825 luotu Vichyn '
      + 'pastilli on samalta ajalta. Toisessa maailmansodassa Vichy oli vuosina 1940–1944 '
      + 'Ranskan valtion tosiasiallinen hallintopääkaupunki. Kymmenen muun eurooppalaisen '
      + 'kylpyläkaupungin kanssa se on ollut Unescon maailmanperintökohde 24.7.2021 alkaen.',
    lahde: 'en- ja fr-Wikipedia "Vichy", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-biarritz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-biarritz-8dae8abd.jpg',
      lyhyt: 'Neitsyenkallio ja sille johtava rautasilta.',
      selite: 'Biarritzin Neitsyenkallio, sen huipulla oleva patsas ja kalliolle johtava rautasilta Atlantin aallokossa.',
      lahde: 'Valokuva: Vorlod, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Vorlod',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rocher_de_la_Vierge_-_Biarritz.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-biarritz-07f842f6.jpg',
      lyhyt: 'Ranta ja kylpylähotellit vanhassa photochrom-värivedoksessa.',
      selite: 'Biarritzin pitkä hiekkaranta, rantabulevardi ja kylpylähotellit Library of Congressin photochrom-kokoelman värivedoksessa.',
      lahde: 'Valokuva: Photochrom Print Collection (Library of Congress), Wikimedia Commons (public domain).',
      tekija: 'Photochrom Print Collection (Library of Congress)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:General_view%2C_Biarritz%2C_Pyrenees%2C_France-LCCN2001698617.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    }],
    nimi: 'Biarritz',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Miten kalastajakylästä tuli muotikylpylä?',
      'Kuinka lähellä Espanjan raja oikeastaan on?',
    ],
    nappi: 'Merikylpylä Biskajanlahden rannalla',
    // -1,56 E / 43,48 N — en-Wikipedia "Biarritz"
    laudat: {
      maailmankartta: { x: 5781.3, y: 1663.9 },
      europe: { x: 181.2, y: 750.1 },
    },
    teksti: 'Biarritz on kaupunki Atlantin rannalla Biskajanlahden pohjukassa. Se kuuluu '
      + 'Pyrénées-Atlantiques\'n departementtiin Ranskan Baskimaassa, ja Espanjan rajalle on '
      + 'sieltä 35 kilometriä. Kaupunki on ylellinen merenrantakohde. Se tunnetaan Hôtel du '
      + 'Palais\'sta, rantakadun kasinoista ja surffauskulttuuristaan.',
    lahde: 'en-Wikipedia "Biarritz", johdanto-osa (tarkistettu 18.9.2026).',
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-canal-du-midi-3083a5ce.jpg',
      lyhyt: 'Kanavan vedenjakaja Seuil de Naurouzessa.',
      selite: 'Seuil de Naurouzen vedenjakaja: vasemmalla tasankorigolin suu, takana Canal du Midi vanhojen puiden katveessa.',
      lahde: 'Valokuva: Lucas Destrem, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Lucas Destrem',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Partage_des_eaux%2C_Naurouze_(1).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-canal-du-midi-f9be05ec.jpg',
      lyhyt: 'Fonseranes\'n sulkuporras proomun keulasta nähtynä.',
      selite: 'Fonseranes\'n sulkuporras Béziers\'n luona proomun keulasta nähtynä; sulut otettiin käyttöön vuonna 1697.',
      lahde: 'Valokuva: Martinvl, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Martinvl',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:FonseranesLocks.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    }],
    nimi: 'Canal du Midi',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mistä kanavan huipulle saadaan vettä?',
      'Kuinka kauan kaivamiseen meni?',
    ],
    nappi: 'Kanava, joka yhdistää kaksi merta',
    // 1,81862 E / 43,35071 N — en-Wikipedia "Seuil de Naurouze"
    laudat: {
      maailmankartta: { x: 5894, y: 1669.2 },
      europe: { x: 246.1, y: 753.5 },
    },
    teksti: 'Canal du Midi on 240 kilometriä pitkä kanava Etelä-Ranskassa. Se yhdistää Garonnen '
      + 'Välimeren rannalla olevaan Thaun laguuniin, ja yhdessä 193 kilometrin pituisen '
      + 'Garonnen sivukanavan kanssa se muodostaa Canal des Deux Mers\'n eli väylän Atlantilta '
      + 'Välimerelle. Työt aloitettiin Jean-Baptiste Colbertin kuninkaallisella määräyksellä '
      + 'lokakuussa 1666, ja Pierre-Paul Riquet\'n johdolla kanava valmistui vuonna 1681 Ludvig '
      + 'XIV:n hallituskaudella. Vaikein tehtävä oli johtaa vettä Montagne Noiren vuorilta '
      + 'Seuil de Naurouzeen, kanavan korkeimpaan kohtaan. Kanava otettiin Unescon '
      + 'maailmanperintöluetteloon vuonna 1996.',
    lahde: 'en-Wikipedia "Canal du Midi", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-le-puy-en-velay',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-le-puy-en-velay-192360d4.jpg',
      lyhyt: 'Saint-Michel d\'Aiguilhen kappeli tulivuorenneulan huipulla.',
      selite: 'Saint-Michel d\'Aiguilhen kappeli seisoo tulivuorenneulan huipulla Le Puy-en-Velayssa; kappeli pystytettiin 1000-luvulla.',
      lahde: 'Valokuva: W. Bulach, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'W. Bulach',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:00_1108_Le_Puy-en-Velay_-_Frankreich.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [{
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-le-puy-en-velay-9f6da30e.jpg',
      lyhyt: 'Tuomiokirkon julkisivu ja porrasrinne 1800-luvun lopun kabinettikuvassa.',
      selite: 'Tuomiokirkon vuoroin vaaleista ja tummista kivistä ladottu julkisivu ja sille nouseva porrasrinne valokuvaaja A. Georgesin kabinettikuvassa vuosilta 1870–1900.',
      lahde: 'Valokuva: A. Georges, Rijksmuseumin kokoelma, Wikimedia Commons (CC0).',
      tekija: 'A. Georges (Rijksmuseum)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kathedraal_Notre-Dame-de-l\'Annonciation_te_Le_Puy-en-Velay_Le_Puy_(titel_op_object)%2C_RP-F-F19876.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    }],
    nimi: 'Le Puy-en-Velay',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miten kappeli saatiin tuon neulan päälle?',
      'Minne pyhiinvaeltajat lähtevät täältä?',
    ],
    nappi: 'Kaupunki tulivuorenneulojen keskellä',
    // 3,88472222 E / 45,04444444 N — en-Wikipedia "Le Puy-en-Velay"
    laudat: {
      maailmankartta: { x: 5962.8, y: 1599.9 },
      europe: { x: 285.8, y: 708.9 },
    },
    teksti: 'Le Puy-en-Velay on Haute-Loiren departementin pääkaupunki Auvergne-Rhône-Alpesin '
      + 'alueella Etelä-Keski-Ranskassa. Kaupunki on Velayn historiallinen keskus Massif '
      + 'Centralin kaakkoisosassa, ja siinä asui 18 540 ihmistä vuonna 2023. Se tunnetaan '
      + 'tuomiokirkostaan, pitsinnypläyksestään ja vihreistä linsseistään. Kaupungista alkaa '
      + 'Via Podiensis eli Chemin du Puy, yksi neljästä ranskalaisesta Santiago de Compostelan '
      + 'pyhiinvaellusreitistä.',
    lahde: 'en- ja fr-Wikipedia "Le Puy-en-Velay", johdanto-osa (tarkistettu 18.9.2026).',
  },
];
