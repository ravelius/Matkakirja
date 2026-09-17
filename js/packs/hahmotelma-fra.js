/*
 * RANSKAN HAHMOTELMAPISTEET — ensimmäinen kierros, pelkät pisteet.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 33) ====
 *
 * Sanatarkasti: *"Miksi Ranskassa kaikki pisteet ovat niin lahella
 * Pariisi … nostoja siis saisi mielellaan olla ympari Ranskaa, vuoret,
 * linnat, alueet, muut merkittavat kohteet. Voi aluksi vaikka vain
 * hahmotella ne pisteet ja lisata pelkat pisteet kartalle ja tehda
 * niille vain otsikko pop-upit. Lisataan sisalto sitten sen jalkeen,
 * kun on saatu oikea maara nostoja kartalle, jotta se nayttaa
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
 * viisitoista uutta merkkiä olisi työntänyt vanhoja katon yli.
 *
 * === KOORDINAATIT ==================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`) 17.9.2026, ja artikkelin nimi on
 * kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, sama Millerin
 * lieriö ja europe-tasaväli kuin maastokohteilla). Yhtäkään lukua ei
 * ole arvattu eikä luettu kartalta silmällä. Jokainen viisitoista
 * osuu Ranskan fokuslehden rajaukseen (`osuuLehteen`), ja lähinkin on
 * 29,9 lautayksikön päässä lähimmästä kaupungista eli selvästi yli
 * rajan KAUPUNGIN_KOHDALLA_SADE = 7 (js/fokuskohteet.js) — yksikään ei
 * siis valu kaupunkikartalle.
 *
 * === MITÄ JÄI POIS ================================================
 *
 * Fablen kohdelistalla oli 32 nimeä. Viisi oli jo kartalla samalla
 * paikalla (Mont Blanc, Carcassonne, Avignonin paavinpalatsi,
 * Pont du Gard, Carnac — js/packs/maastokohteet-fra.js), eikä yhtäkään
 * toisteta tässä. Loput kaksitoista jätettiin tältä kierrokselta pois
 * määrän vuoksi: Ranskassa on jo 28 kaupungin ulkopuolista nostoa, ja
 * nämä viisitoista vievät summan 43:een eli päätöksen "noin 40"
 * lukuun. Valinnan peruste oli tyhjä alue kartalla, ei kohteen arvo —
 * Korsika, Burgundi, Pohjois-Ranska, Pyreneet ja Bretagne olivat
 * tyhjimmät. Poisjääneet on lueteltu raportissa
 * docs/raportit/viesti-fable-ranska-hahmotelma-20260917.md.
 */

/** Kortin leipäteksti hahmotelmavaiheessa: alaotsikko + lupaus. */
const runko = (alaotsikko) => `${alaotsikko}. Sisältö tulossa.`;

/** Lähderivi: koordinaatin alkuperä, ei sisällön. */
const koordinaatinLahde = (artikkeli) => `en-Wikipedia "${artikkeli}", `
  + 'prop=coordinates (haettu 17.9.2026). Hahmotelmapiste: kortilla on '
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
];
