/*
 * FOKUSKOHTEET — BOSNIA JA HERTSEGOVINA. Nostot, joissa huomio kääntyy
 * pois pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-bgr.js:lle ja js/packs/
 * fokuskohteet-grc.js:lle. Rakenne on kopioitu Bulgarian tiedostosta
 * sellaisenaan: SAMA LISTA palvelee kahta pintaa, kohdenostoa
 * fokusvirrassa (js/fokusvirta.js poimii kohteita tunnuksilla, pöllö
 * puhuu `teksti`-kentän kuplasta, painikkeen lupaus on `nappi`) ja
 * kartan klikattavaa pop-upia (js/fokuskohteet.js lukee `nimi`,
 * `tyyppi`, `kuva`, `teksti` ja `lahde`). Kentät ja niiden perustelut on
 * selitetty Kreikan tiedoston alussa; tässä on vain se, mikä Bosniassa
 * on toisin.
 *
 * KAKSI KENTTÄÄ PÖLLÖÄ VARTEN (omistajan tilaus 25.8.2026) on nekin
 * kuvattu Kreikan tiedoston alussa: `kysymykset` on kaksi valmista,
 * pelaajan äänellä kirjoitettua kysymystä kartan tietoruudun loppuun,
 * ja `korostukset` on lista sanoista, jotka alleviivataan
 * leipätekstistä ja joista pöllö kertoo lisää ('perusmuoto|näkyvä
 * muoto', jos taivutus eroaa). Sama sääntö kuin muualla: kysymys ei
 * toista sitä, minkä teksti jo kertoo. Bosniassa on lisäksi yksi oma
 * sääntö, ks. SÄVYRAJAUS alempana.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * docs/mantereet-tyoaineisto/fokuskohteet-bosnia.md, kohteet 1–12
 * samassa järjestyksessä kuin aineistossa. Aineiston pop-up-tekstit on
 * siirretty tänne sellaisinaan: yhtään faktaa ei ole lisätty eikä
 * muutettu. Kaksi tietoista muotoseikkaa, samat kuin Bulgariassa:
 * ajatusviivat on kirjoitettu talon tapaan pitkinä (—) ja aineiston
 * korostusmerkinnät (*kursiivi*, **lihavointi**) on purettu, koska
 * pop-up näyttää tekstin sellaisenaan eikä lue merkintäkieltä.
 * Kumpikaan ei kosketa väitteitä.
 *
 * ── AJOITUS, JOKA KOSKEE KOKO MAATA ────────────────────────────────
 *
 * Aineiston oma varoitus (osio "1873-kerros"): vuonna 1873 koko maa oli
 * ottomaanien hallinnossa. Itävalta-Unkarin miehitys alkoi vasta 1878
 * Berliinin kongressin päätöksellä ja liittäminen 1908. Se koskee
 * jokaista kohdetta, ja aineiston kohdekohtaiset 1873-huomiot on
 * noudatettu: Mostarin ja Višegradin sillat sekä Blagajin tekija olivat
 * paikoillaan, Travnik oli menettänyt kuvernöörin istuimen vasta 23
 * vuotta aiemmin — mutta Banja Lukan trappistiluostarin perustamisvuosi
 * EI ole lähteessä, joten teksti sanoo vain "1800-luvulla" eikä sido
 * sitä isoisän matkavuoteen (aineiston Hylätyt-kohta 6).
 *
 * ── SÄVYRAJAUS (tämän maan oma sääntö) ─────────────────────────────
 *
 * docs/mantereet-tyoaineisto/takynostot-bosnia.md, sääntö 3
 * (tehtävänannon ohje 25.8.2026): 1990-luvun sota käsitellään
 * kunnioittavasti eikä sitä skandaalisoida. Aineisto jätti Mostarin
 * sillan tuhon 1993 ja jälleenrakennuksen 2004 pois popup-tekstistä
 * (sen Hylätyt-kohta 2), ja sama rajaus on tässä. Se koskee myös
 * `kysymykset`-kenttää: yksikään kysymys ei ohjaa pöllöä kertomaan
 * sodasta, koska kysymys on pöllölle kehotus eikä pelkkä koriste.
 * Peli kertoo sodan siellä, missä se jo kertoo sen neutraalisti
 * (js/packs/kulttuuri-kategoriat.js, js/packs/europe-artikkelit.js).
 *
 * ── KOORDINAATIT ───────────────────────────────────────────────────
 *
 * Sama kaksi kaavaa ja samat vakiot kuin Kreikassa ja Bulgariassa,
 * koska Sarajevo on pelattavissa kummallakin laudalla:
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio).
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js).
 *
 * KAAVA ON TARKISTETTU TUNNETULLA PISTEELLÄ, ei Sarajevolla: Sofia
 * 23,33526 E / 42,69666 N antaa 6611,2 / 1695,6, ja Sofian laatta on
 * maailmankartalla 6610,8 / 1696,1 — sama 0,6 yksikön osumatarkkuus
 * kuin Bulgarian tiedostossa.
 *
 * SARAJEVON LAATTA EI KELPAA TARKISTUSPISTEEKSI, ja se on tämän maan
 * tärkein tekninen huomio. Kaupungin oikea paikka on kaavalla
 * maailmankartalla 6447,1 / 1648,6 ja Euroopan laudalla 564,7 / 740,2,
 * mutta laatta on siirretty pohjoiseen: maailmankartalla 6440,6 /
 * 1601,6 ja Euroopan laudalla 561 / 710. Siirto on tietoinen ja
 * perusteltu laudan omassa datassa (js/packs/europe.js, Sarajevon
 * kommentti): kaupunki on vain 30 yksikön päässä Dubrovnikista, ja
 * lauta vaatii kaupunkien väliksi 60, jottei nimikilpi mene päällekkäin.
 * ALLA OLEVAT KOHTEET OVAT SILTI OIKEILLA PAIKOILLAAN, koska ne
 * piirtyvät maan oman lehden (FOKUS_POHJAT.BIH) päälle, ja lehti on
 * johdettu Natural Earthin geometriasta — kohde kuuluu sinne, missä se
 * maastossa on. Vain laatta on siirtynyt, ja se on laudan asia eikä
 * tämän listan.
 *
 * KAIKKI KOHTEET OVAT MAAN LEHDEN SISÄLLÄ. FOKUS_POHJAT.BIH rajaa
 * ikkunan x 6333,79…6510,72 ja y 1565,17…1725,21; listan äärimmäiset
 * pisteet ovat Una 6371,2 / 1622,5, Višegrad 6476,4, Banja Luka
 * 1611,1 ja Vjetrenica 1689,6 — jokainen mahtuu, eikä yksikään merkki
 * jää lehden ulkopuolelle.
 *
 * KARKEAT YLEISPISTEET on merkitty kohteittain, kuten Bulgariassa:
 * Neretvan koordinaatti osoittaa joen SUULLE Adrianmerelle Kroatian
 * puolelle eikä Bosnian osuudelle, Una-joen piste on kansallispuiston
 * piste eikä joen suu, ja Sutjeskan piste on koko puiston piste (maan
 * korkein huippu Maglić on 6457,9 / 1672,0, jos se joskus halutaan
 * omaksi merkikseen). Kartalla nämä ovat oikeita paikkoja alueen
 * nimeämiselle; täsmäpaikkoja niistä ei saa tehdä.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Yksi kuva kohdetta kohti, ja jokainen on sama tiedosto, jonka
 * aineisto oli jo tarkistanut. Ne on silti tarkistettu UUDELLEEN
 * Commonsin imageinfo-rajapinnasta 25.8.2026 (olemassaolo, koko, mime,
 * lisenssi, tekijä, kuvaus, kategoriat) — ei arvattuja nimiä eikä
 * luottamista toisen käden merkintään. Kaikki ovat PD, CC0 tai CC, ja
 * tekijä on `lahde`-rivillä, koska CC BY vaatii maininnan.
 *
 * KAKSI KOKOHUOMIOTA, jotka aineisto teki ja jotka pitävät yhä:
 * Banja Lukan kuva on vain 1152×864 (riittää pop-upiin, ei koko ruudun
 * kuvaksi) ja Hutovo Blaton kuva on pystykuva 3264×4896.
 */

/**
 * Bosnia ja Hertsegovinan fokuskohteet: aineiston 12 kohdetta samassa
 * järjestyksessä kuin docs/mantereet-tyoaineisto/fokuskohteet-bosnia.md.
 */
export const FOKUSKOHTEET_BIH = [
  {
    id: 'mostar',
    nimi: 'Mostar',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka oli Mimar Sinan?',
      'Mitä sillanvartijan työhön kuului?',
    ],
    korostukset: ['mostari', 'Mimar Sinan|Mimar Sinanin'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Silta, joka oli maailman levein',
    /*
     * 43,34361 N / 17,8075 E — en-Wikipedia "Mostar". Aineiston huomio:
     * artikkelilla "Stari Most" EI ole omia koordinaatteja, joten
     * käytetään kaupungin pistettä.
     */
    laudat: {
      maailmankartta: { x: 6426.9, y: 1669.5 },
      europe: { x: 553.1, y: 753.7 },
    },
    teksti: 'Kaupunki on saanut nimensä sillanvartijoista, mostari, jotka '
      + 'vartioivat Vanhaa siltaa ottomaanien aikaan. Sulttaani Suleiman '
      + 'Suuri tilasi sillan 1557, ja sen suunnitteli Mimar Hayruddin, '
      + 'Istanbulin suurmestarin Mimar Sinanin oppilas. Silta valmistui '
      + 'yhdeksän vuotta myöhemmin ja oli valmistuessaan maailman levein '
      + 'ihmiskätten tekemä kaari. Sitä ennen paikalla heilui puinen '
      + 'riippusilta, jonka yli kuljettiin ottomaanimaantieteilijän mukaan '
      + '"kuolemanpelossa".',
    lahde: 'en-Wikipedia "Stari Most", johdanto ja osio "History" '
      + '(tarkistettu 25.8.2026).',
    // Commons 25.8.2026: 2390×1600, CC BY-SA 4.0, Ramirez, 10.7.2007,
    // kuvattu Koski Mehmed Pashan moskeijan minareetista Vanhaa siltaa
    // vastapäätä. Category:Old Bridge Area of the Old City of Mostar.
    kuva: {
      tiedosto: 'Mostar Old Town Panorama 2007.jpg',
      selite: 'Mostarin vanhaakaupunkia ja Neretvan yli kaartuva Vanha '
        + 'silta.',
      lahde: 'Ramirez, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'blagaj',
    nimi: 'Blagajin dervissiluostari',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
    tyyppi: 'muu',
    kysymykset: [
      'Keitä dervissit olivat?',
      'Miksi luostari rakennettiin juuri kallion juureen?',
    ],
    korostukset: ['dervissiluostari', 'mausoleumi'],
    /* Valintakuplan painike. Lupaus on lähde, ei rakennus. */
    nappi: 'Joki, joka alkaa luolasta',
    /*
     * 43,257266 N / 17,903581 E — en-Wikipedia "Blagaj Tekke", joka
     * ohjautuu artikkeliin "Vrelo Bune". Aineiston huomio: tekijalla
     * itsellään ei ole omia koordinaatteja.
     */
    laudat: {
      maailmankartta: { x: 6430.1, y: 1673.0 },
      europe: { x: 554.9, y: 755.9 },
    },
    teksti: 'Buna-joki ei ala purosta vaan syöksyy valmiina esiin '
      + 'valtavasta luolasta pystysuoran kallioseinän alta. Se on yksi '
      + 'Euroopan suurimmista lähteistä: vettä tulee noin 30 kuutiometriä '
      + 'sekunnissa, ja se on poikkeuksellisen kylmää ja kirkasta. Kallion '
      + 'juureen, aivan lähteen viereen, rakennettiin dervissiluostari '
      + 'viimeistään noin vuonna 1520 — sen vierashuone ja mausoleumi ovat '
      + 'yhä pystyssä.',
    lahde: 'en-Wikipedia "Vrelo Bune", johdanto ja osiot "Vrelo Bune" ja '
      + '"Blagaj tekke" (tarkistettu 25.8.2026). Suomenkielinen nimi on '
      + 'aineiston koostajan muodostama: fi-Wikipediassa ei ole omaa '
      + 'artikkelia.',
    // Commons 25.8.2026: 3000×4000, CC0, Bosancica by MK, 10.9.2024,
    // kuvaus nimeää sekä tekijan että Bunan lähteen kallioseinän alla.
    // CC0 ei vaadi nimeämistä, mutta tekijä merkitään silti pelin tapaan.
    kuva: {
      tiedosto: 'Blagaj Tekke, the spring of the Buna river, Bosnia and Herzegovina 01.jpg',
      selite: 'Blagajin tekija ja Bunan lähde pystysuoran kallioseinän '
        + 'alla.',
      lahde: 'Bosancica by MK, Wikimedia Commons (CC0)',
    },
  },
  {
    id: 'una',
    nimi: 'Una-joki',
    tyyppi: 'joki',
    kysymykset: [
      'Mihin Una lopulta laskee?',
      'Mitä Unan kansallispuistossa voi tehdä?',
    ],
    korostukset: ['karstilähde|karstilähteitä', 'Štrbački buk'],
    /* Valintakuplan painike. Lupaus on nimen tarina. */
    nappi: 'Joki, jonka nimi tarkoittaa ainoaa',
    /*
     * 44,49527 N / 16,13499 E — en-Wikipedia "Una National Park".
     * KANSALLISPUISTON PISTE, ei joen suu: aineiston suositus, koska
     * suistopiste (45,27 N / 16,918 E) osuisi maan pohjoisrajalle.
     */
    laudat: {
      maailmankartta: { x: 6371.2, y: 1622.5 },
      europe: { x: 521.0, y: 723.4 },
    },
    teksti: 'Paikallisen tarinan mukaan joen nimesivät roomalaiset: '
      + 'nähtyään sen ensi kerran he sanoivat una — "ainoa", "yksi ainoa" '
      + '— kuvaillakseen sen kauneutta. 212 kilometrin mittainen Una on '
      + 'täynnä koskia, putouksia ja karstilähteitä, ja sen yläjuoksu '
      + 'kuuluu Unan kansallispuistoon. Suurin putous on Štrbački buk. '
      + 'Joen varren tärkein kaupunki on Bihać.',
    lahde: 'en-Wikipedia "Una (Sava)", johdanto ja osio "Etymology" '
      + '(tarkistettu 25.8.2026). Nimiselitys on lähteen oma varaus '
      + '("According to local legends"), ja teksti sanoo sen ääneen. '
      + 'Muoto "Una-joki" on aineiston ohje: fi-Wikipedian "Una" on '
      + 'moniselitesivu.',
    // Commons 25.8.2026: 4899×3266, CC BY-SA 3.0, Julian Nyča, 8.9.2018,
    // kuvaus "Wasserfall Štrbački buk an der Una südlich von Bihać" —
    // juuri se putous, jonka teksti nimeää. Category:Štrbački buk.
    kuva: {
      tiedosto: 'Štrbački buk 1.jpg',
      selite: 'Štrbački buk on Unan suurin putous, ja se sijaitsee '
        + 'Bihaćista etelään.',
      lahde: 'Julian Nyča, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'jajce',
    nimi: 'Jajce',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka oli Mithras?',
      'Millainen valtakunta Bosnian kuningaskunta oli?',
    ],
    korostukset: ['Mithras-temppeli'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Kaupunki, jonka keskellä on vesiputous',
    // 44,34167 N / 17,26944 E — en-Wikipedia "Jajce".
    laudat: {
      maailmankartta: { x: 6409.0, y: 1628.8 },
      europe: { x: 542.8, y: 727.4 },
    },
    teksti: 'Jajce on kaupunki, jonka keskellä on vesiputous: Pliva-joki '
      + 'syöksyy Vrbasiin keskellä vanhaakaupunkia. Täällä oli itsenäisen '
      + 'Bosnian kuningaskunnan viimeinen pääkaupunki, ja täällä viimeinen '
      + 'kuningas Stjepan Tomašević otti vastaan kruununsa paavi Pius '
      + 'II:lta. Kaupungin alla on myös Mithras-temppeli 100-luvulta, yksi '
      + 'Euroopan parhaiten säilyneistä — se löytyi vahingossa, kun '
      + 'yksityistaloa rakennettiin.',
    lahde: 'en-Wikipedia "Jajce", johdanto sekä osiot "Ancient times" ja '
      + '"Banate of Jajce" (tarkistettu 25.8.2026). Aineiston '
      + 'ikäsopivuusrajaus on noudatettu: teksti kertoo kruunauksen, ei '
      + 'kuninkaan kohtaloa.',
    // Commons 25.8.2026: 4032×3024, CC0, YxMb, 11.7.2022, kuvaus "Pliva
    // Waterfall of Jajce". Category:Pliva Waterfall.
    kuva: {
      tiedosto: 'Pliva Waterfall, Jajce, 2022.jpg',
      selite: 'Plivan putous keskellä Jajcen vanhaakaupunkia.',
      lahde: 'YxMb, Wikimedia Commons (CC0)',
    },
  },
  {
    id: 'visegrad',
    nimi: 'Višegrad',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
    tyyppi: 'muu',
    kysymykset: [
      'Mistä romaani Drinan silta kertoo?',
      'Mitä suurvisiirin työhön kuului?',
    ],
    korostukset: ['suurvisiiri', 'Ivo Andrić|Ivo Andrićin'],
    /* Valintakuplan painike. Lupaus on sillan mitta. */
    nappi: 'Yksitoista kaarta Drinan yli',
    /*
     * 43,78278 N / 19,29111 E — en-Wikipedia "Višegrad". Aineiston
     * huomio: artikkelilla "Mehmed Paša Sokolović Bridge" EI ole omia
     * koordinaatteja, joten käytetään kaupungin pistettä.
     */
    laudat: {
      maailmankartta: { x: 6476.4, y: 1651.6 },
      europe: { x: 581.6, y: 742.1 },
    },
    teksti: 'Drina-joen yli kaartuu yksitoista kivikaarta, yhteensä 179,5 '
      + 'metriä. Sillan tilasi suurvisiiri Mehmed-pasha Sokolović '
      + 'kotiseutunsa kunniaksi, ja sen suunnitteli sama Mimar Sinan, joka '
      + 'rakensi sulttaanin tärkeimmät rakennukset — työ valmistui 1577. '
      + 'Silta on Unescon maailmanperintökohde vuodesta 2007, ja se on koko '
      + 'maailmalle tuttu Ivo Andrićin romaanista Drinan silta.',
    lahde: 'en-Wikipedia "Mehmed Paša Sokolović Bridge", johdanto ja osiot '
      + '"Characteristics", "History" ja "In literature" (tarkistettu '
      + '25.8.2026).',
    // Commons 25.8.2026: 3531×1907, CC BY-SA 3.0, Pudelek (Marcin Szala),
    // 8/2012. Category:Mehmed Paša Sokolović Bridge in Višegrad.
    kuva: {
      tiedosto: 'Mehmed Paša Sokolović Bridge, Višegrad.JPG',
      selite: 'Mehmed-pasha Sokolovićin silta Drinan yli Višegradissa.',
      lahde: 'Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'neretva',
    nimi: 'Neretva',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi karstijoen vesi on niin kylmää?',
      'Mitä kaloja Neretvan vesistössä elää?',
    ],
    korostukset: ['karstijoki', 'kotoperäinen|kotoperäisiä'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Dinaaristen Alppien suurin karstijoki',
    /*
     * 43,01972 N / 17,445 E — en-Wikipedia "Neretva". HUOM: tämä on JOEN
     * SUU Adrianmerellä KROATIAN puolella, ei Bosnian osuus (aineiston
     * Hylätyt-kohta 1 ja kohteen oma huomio). Piste kelpaa koko joen
     * nimeämiseen kartalla; jos Bosnian kohdalle halutaan täsmäpiste, se
     * on valittava erikseen esimerkiksi Mostarin tai Konjicin kohdalta.
     */
    laudat: {
      maailmankartta: { x: 6414.8, y: 1682.6 },
      europe: { x: 546.1, y: 762.2 },
    },
    teksti: 'Neretva on Dinaaristen Alppien suurin karstijoki: 225 '
      + 'kilometriä, josta 208 Bosnia ja Hertsegovinan puolella. Nimen '
      + 'arvellaan tulevan indoeurooppalaisesta juuresta ner, "sukeltaa" — '
      + 'sama juuri näkyy bosnian sanassa roniti. Joki on niin kylmää, että '
      + 'Mostarin sillalta hyppääminen vaatii harjoittelua, ja sen '
      + 'vesistössä elää poikkeuksellisen paljon kotoperäisiä kaloja.',
    lahde: 'en-Wikipedia "Neretva", johdanto ja osiot "Geography and '
      + 'hydrology" ja "Endemic and endangered species"; veden kylmyys '
      + 'en-Wikipedia "Stari Most", osio "Diving" (tarkistettu 25.8.2026). '
      + 'Nimiselitys on lähteen oma varaus ("has been suggested"), ja '
      + 'teksti sanoo sen ääneen.',
    // Commons 25.8.2026: 5184×3456, CC BY-SA 3.0, Bjoertvedt, 23.6.2012,
    // kuvaus "the Neretva river in Konjic city" — kuva on nimenomaan
    // Bosnian osuudelta, jota tekstin luvut koskevat.
    kuva: {
      tiedosto: 'Bosnia IMG 9590 Konjic Neretva river.JPG',
      selite: 'Neretva Konjicin kohdalla Bosnian puolella.',
      lahde: 'Bjoertvedt, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'sutjeska',
    nimi: 'Sutjeskan kansallispuisto',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten aarniometsä eroaa talousmetsästä?',
      'Millainen eläin on gemssi?',
    ],
    korostukset: ['aarniometsä', 'gemssi|gemssejä'],
    /* Valintakuplan painike. Lupaus on metsän ikä. */
    nappi: 'Metsä, jota ei ole koskaan hakattu',
    /*
     * 43,33333 N / 18,68333 E — en-Wikipedia "Sutjeska National Park".
     * KOKO PUISTON PISTE. Maan korkein huippu Maglić on 43,28111 N /
     * 18,73694 E eli laudalla 6457,9 / 1672,0 ja 570,9 / 755,3, jos se
     * joskus halutaan omaksi merkikseen.
     */
    laudat: {
      maailmankartta: { x: 6456.1, y: 1669.9 },
      europe: { x: 569.9, y: 753.9 },
    },
    teksti: 'Puiston sydämessä on Perućica, aarniometsä jota ei ole '
      + 'koskaan hakattu. Pyökit kasvavat siellä yli 60 metriä korkeiksi ja '
      + 'osa puista on 300 vuotta vanhoja. Puistossa on nähty karhuja, '
      + 'gemssejä, susia, villikissoja ja villivuohia, ja se on koti yli '
      + '300 lintulajille — muun muassa maakotkalle ja muuttohaukalle. '
      + 'Yllä kohoaa Maglić, maan korkein huippu.',
    lahde: 'en-Wikipedia "Sutjeska National Park", osiot "Flora" ja "Fauna" '
      + '(tarkistettu 25.8.2026). Lähde sanoo eläimistä "have been '
      + 'sighted", ja teksti sanoo saman: puistossa on nähty. Maglićin '
      + 'korkeuslukua ei ole tässä, koska sitä ei ole varmennettu '
      + 'artikkelin tekstistä (aineiston Hylätyt-kohta 3).',
    // Commons 25.8.2026: 4000×2656, CC BY-SA 3.0, Darko Gavrić, 3.7.2011,
    // kuvaus "NP Sutjeska planina Maglić". Category:Maglić,
    // Category:National park Sutjeska.
    kuva: {
      tiedosto: 'Np sutjeska maglic.JPG',
      selite: 'Maglić Sutjeskan kansallispuistossa on maan korkein '
        + 'huippu.',
      lahde: 'Darko Gavrić, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'travnik',
    nimi: 'Travnik',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä Bosnian kuvernöörin työhön kuului?',
      'Miksi hallinto siirtyi lopulta pois Travnikista?',
    ],
    korostukset: ['karstilähde', 'Vlašić'],
    /* Valintakuplan painike. Lupaus on 1873-kulma, ei maantiede. */
    nappi: 'Pääkaupunki, joka oli juuri lakannut',
    // 44,22639 N / 17,65972 E — en-Wikipedia "Travnik".
    laudat: {
      maailmankartta: { x: 6422.0, y: 1633.5 },
      europe: { x: 550.3, y: 730.4 },
    },
    teksti: 'Travnik oli Bosnian kuvernöörien pääkaupunki vuosina '
      + '1699–1850 — täältä maata hallittiin puolitoista vuosisataa, ja '
      + 'siltä ajalta on jäänyt sen kulttuuriperintö. Kaupunki on '
      + 'Lašva-joen laaksossa 514 metrin korkeudessa, ja sen yllä kohoaa '
      + 'Vlašić, yksi maan korkeimmista vuorista (1 933 m). '
      + 'Vanhankaupungin keskellä, linnan alta, purskahtaa esiin suuri '
      + 'karstilähde Plava Voda.',
    lahde: 'en-Wikipedia "Travnik", johdanto ja osio "Geography" '
      + '(tarkistettu 25.8.2026).',
    // Commons 25.8.2026: 4608×3456, CC BY-SA 4.0, Dans, 17.8.2014,
    // kuvaus "Panorama of Travnik old town (stari grad) from the Fortress
    // Gate" — kuva on linnan portilta, jonka alta lähde purskahtaa.
    kuva: {
      tiedosto: 'Travnik western panorama.jpg',
      selite: 'Travnikin vanhaakaupunkia linnan portilta katsottuna.',
      lahde: 'Dans, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'neum',
    nimi: 'Neum',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä oli Ragusan tasavalta?',
      'Miten kapea käytävä toimii nykyään?',
    ],
    korostukset: ['Ragusan tasavalta', 'puskurivyöhyke|puskurivyöhykettä'],
    /* Valintakuplan painike. Lupaus on mitta, joka näkyy kartalta. */
    nappi: 'Kahdenkymmenen kilometrin rannikko',
    // 42,925 N / 17,61667 E — en-Wikipedia "Neum".
    laudat: {
      maailmankartta: { x: 6420.6, y: 1686.4 },
      europe: { x: 549.4, y: 764.7 },
    },
    teksti: 'Bosnia ja Hertsegovinalla on merenrantaa 20 kilometriä, ja '
      + 'Neum on sen ainoa kaupunki — koko maan ainoa yhteys '
      + 'Adrianmerelle. Kaistale syntyi vuoden 1699 Karlowitzin rauhassa: '
      + 'Ragusan tasavalta luovutti kaksi puskurivyöhykettä ottomaaneille '
      + 'estääkseen kilpailijaansa Venetsiaa hyökkäämästä maitse. Kapea '
      + 'käytävä katkaisee yhä Kroatian rannikon kahtia, ja siitä tuli '
      + 'kansainvälinen raja 1991.',
    lahde: 'en-Wikipedia "Neum", johdanto ja osiot "Geography" ja "History" '
      + '(tarkistettu 25.8.2026).',
    // Commons 25.8.2026: 4071×2208, CC BY-SA 4.0, LBM1948, 30.3.2010,
    // kuvaus "Adriatic coast of Bosnia and Herzegovina al Neum".
    // Category:Bay of Neum.
    kuva: {
      tiedosto: 'Neum, costa.jpg',
      selite: 'Neumin rannikko on maan ainoa kosketus Adrianmereen.',
      lahde: 'LBM1948, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'banjaluka',
    nimi: 'Banja Luka',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka oli bani?',
      'Millaista trappistijuusto on?',
    ],
    korostukset: ['bani|banin', 'trappistimunkki|trappistimunkkeja'],
    /* Valintakuplan painike. Lupaus on nimen väärinkäsitys. */
    nappi: 'Nimi, joka ei tarkoita kylpylää',
    // 44,7725 N / 17,1925 E — en-Wikipedia "Banja Luka".
    laudat: {
      maailmankartta: { x: 6406.4, y: 1611.1 },
      europe: { x: 541.3, y: 716.1 },
    },
    teksti: 'Maan toiseksi suurin kaupunki Vrbas-joen varrella. Nimi '
      + 'mainitaan ensi kerran 6.2.1494, ja se tarkoittaa todennäköisesti '
      + '"banin niittyä" — ei kylpylää, vaikka moni niin luulee. Kaupungin '
      + 'keskellä seisoo Kastel, jonka juuret ovat roomalaisessa '
      + 'linnakkeessa. 1800-luvulla tänne muutti sefardijuutalaisia ja '
      + 'trappistimunkkeja, joiden luostari antoi nimensä kokonaiselle '
      + 'kaupunginosalle — ja maailmalle trappistijuuston.',
    lahde: 'en-Wikipedia "Banja Luka", johdanto ja osiot "Name", "Roman '
      + 'times" ja "Ottoman rule" (tarkistettu 25.8.2026). Lähde ei anna '
      + 'luostarin perustamisvuotta, joten teksti sanoo vain 1800-luvulla '
      + '— sitä ei saa sitoa isoisän matkavuoteen.',
    // Commons 25.8.2026: 1152×864, CC BY-SA 4.0, 130309p, 19.7.2019,
    // kuvaus "Vrbas river pictured from southern wall of Kastel fortress".
    // HUOM: melko pieni — riittää pop-upiin, ei koko ruudun kuvaksi.
    kuva: {
      tiedosto: 'Vrbas from Kastel Banja Luka 2019.jpg',
      selite: 'Vrbas Kastelin muurilta katsottuna Banja Lukassa.',
      lahde: '130309p, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'vjetrenica',
    nimi: 'Vjetrenican luola',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miten luolaeläin tulee toimeen ilman valoa?',
      'Miksi luolan suusta puhaltaa kylmää?',
    ],
    korostukset: ['tuuliluola|tuuliluolaa', 'karstimaisema|karstimaisemaa'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Maailman lajirikkain luola',
    /*
     * 42,8458 N / 17,9839 E — en-Wikipedia "Vjetrenica", joka ohjautuu
     * artikkeliin "Vjetrenica Cave".
     */
    laudat: {
      maailmankartta: { x: 6432.8, y: 1689.6 },
      europe: { x: 556.5, y: 766.8 },
    },
    teksti: 'Maan suurin luola on samalla maailman lajirikkain luola: '
      + 'sieltä on löydetty yli kaksisataa lajia, joista noin 37 kuvattiin '
      + 'tieteelle ensimmäisen kerran juuri täällä. Nimi tarkoittaa '
      + 'tuuliluolaa — kesähelteellä suuaukosta puhaltaa kylmä viima '
      + 'keskelle kuivaa karstimaisemaa. Käytäviä on kartoitettu 7 014 '
      + 'metriä, ja geologit arvelevat luolan ulottuvan aina Adrianmerelle '
      + 'asti. Unescon maailmanperintökohde 2024.',
    lahde: 'en-Wikipedia "Vjetrenica Cave", johdanto ja osiot "Popovo Polje '
      + 'and cave location" ja "UNESCO nomination" (tarkistettu 25.8.2026). '
      + 'HUOM: artikkeli EI mainitse olmia, joten teksti ei väitä lajista '
      + 'mitään (aineiston Hylätyt-kohta 4 — koko paketin tärkein "älä '
      + 'oikaise" -merkintä).',
    // Commons 25.8.2026: 4032×3024, CC0, Bdx, 29.8.2024, kuvaus "Inside
    // Vjetrenica Cave in Bosnia and Herzegovina". Category:Vjetrenica.
    kuva: {
      tiedosto: 'Vjetrenica Cave Inside 2024.jpg',
      selite: 'Vjetrenican luolakäytävää Itä-Hertsegovinassa.',
      lahde: 'Bdx, Wikimedia Commons (CC0)',
    },
  },
  {
    id: 'hutovoblato',
    nimi: 'Hutovo Blato',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'elain',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä Ramsar-kosteikko on?',
      'Mitä lintuja täällä levähtää?',
    ],
    korostukset: ['Ramsar-kosteikko', 'Krupa-joki'],
    /* Valintakuplan painike. Lupaus on joen outous. */
    nappi: 'Joki, joka virtaa molempiin suuntiin',
    /*
     * 43,06 N / 17,79 E — en-Wikipedia "Hutovo Blato". HUOM: rajapinta
     * antaa tälle vain kaksi desimaalia, eli piste on karkeampi kuin
     * muilla kohteilla.
     */
    laudat: {
      maailmankartta: { x: 6426.3, y: 1680.9 },
      europe: { x: 552.8, y: 761.1 },
    },
    teksti: 'Neretvan alajuoksun soilla lepää muuttomatkallaan yli 240 '
      + 'lintulajia, ja muuttoaikaan järven ympärille kerääntyy '
      + 'kymmeniätuhansia lintuja kerralla. Alue on Ramsar-kosteikko '
      + 'vuodesta 2001. Kosteikon läpi kulkeva Krupa-joki on Euroopassa '
      + 'ainutlaatuinen: se virtaa molempiin suuntiin — kun Neretvan vesi '
      + 'nousee, se työntää Krupan takaisin ylävirtaan.',
    lahde: 'en-Wikipedia "Hutovo Blato", johdanto ja osiot "Ramsar site" ja '
      + '"Krupa River" (tarkistettu 25.8.2026).',
    // Commons 25.8.2026: 3264×4896, CC BY-SA 4.0, CV1958 (Colin Viney),
    // 21.5.2022, kuvaus "Hutovo Blato Wetlands: an important Bird
    // Reserve". PYSTYKUVA — huomioi pop-upin muoto.
    kuva: {
      tiedosto: 'Hutovo Blato Wetlands 01.jpg',
      selite: 'Hutovo Blaton kosteikkoa Neretvan alajuoksulla.',
      lahde: 'CV1958 (Colin Viney), Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
];

const BIH_TUNNUKSITTAIN = new Map(FOKUSKOHTEET_BIH.map((k) => [k.id, k]));

/**
 * Poimii Bosnian kohteet tunnuksilla siinä järjestyksessä kuin ne on
 * pyydetty. Tuntematon tunnus jätetään pois hiljaa — sama sääntö ja
 * sama syy kuin Kreikassa ja Bulgariassa: kirjoitusvirhe listassa ei saa
 * kaataa koko kaupungin virtaa.
 *
 * NIMI ON PREFIKSOITU (bihFokuskohteet), koska yhden tiedoston versio
 * ketjuttaa kaikki moduulit samaan näkyvyysalueeseen: paljas
 * `fokuskohteet` olisi niputuksessa uudelleenjulistus Kreikan
 * vastaavan kanssa (tools/tarkista-niputus.mjs).
 */
export function bihFokuskohteet(tunnukset) {
  return (tunnukset ?? []).map((id) => BIH_TUNNUKSITTAIN.get(id)).filter(Boolean);
}
