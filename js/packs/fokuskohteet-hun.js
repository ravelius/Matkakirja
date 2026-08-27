/*
 * FOKUSKOHTEET — UNKARI. Budapestin fokuslehden napautettavat paikat.
 *
 * Rakenne, kentät ja äänensävy ovat samat kuin Kreikan pilottilistalla
 * (js/packs/fokuskohteet-grc.js), jonka tiedoston alussa on koko mallin
 * pitkä perustelu — sitä ei toisteta tässä. Lyhyesti: sama lista
 * palvelee kahta pintaa, kartan pop-upia (js/fokuskohteet.js) ja
 * mahdollista kohdenostoa kaupungin fokusvirrassa (js/fokusvirta.js),
 * ja kartan tietoruutu on lehden reunahuomio eikä kenenkään puhetta.
 *
 * ── MIKSI TÄSMÄLLEEN NÄMÄ SEITSEMÄNTOISTA ─────────────────────────
 *
 * Lista EI ole vapaa valikoima Unkarin nähtävyyksiä vaan sen lehden
 * peilikuva, joka renderöidään tools/fokuskartta/maat.mjs:n HUN-osiosta.
 * Lehden linjaus on, että KARTALLA NIMETTY ASIA ON NAPAUTETTAVA, ja se
 * jakaa nämä kohteet kolmeen luokkaan:
 *
 *   1. LEHTI POLTTAA NIMEN, KOHDE TEKEE SIITÄ NAPAUTETTAVAN. Viisi
 *      kaupunkia — Debrecen, Szeged, Pécs, Eger ja Győr — ovat
 *      maat.mjs:n `kaupungit`-listassa, ja niiden poltettu nimi on
 *      kartalla se iso kohde, johon sormi osuu. Peli laskee nimen
 *      napautuslaatikon FOKUS_LISANIMET.HUN-taulusta
 *      (js/packs/fokus-grc.js), joka on saman listan peilikuva laudan
 *      koordinaateissa. Näiltä viideltä peli jättää oman nimiönsä pois
 *      (js/fokuskohteet.js kohteenNimio), koska nimi on jo kartalla —
 *      kaksoisnimiä ei synny.
 *
 *   2. LEHTI EI POLTA NIMEÄ, KOHDE ANTAA SEN. Kolme vuorta ja kolme
 *      vettä. Lehdellä `poltetutNimet` on kaikissa kolmessa lajissa
 *      false, joten Kékesin, Istállós-kőn ja Írott-kőn kohdalla kuvassa
 *      on vain hachure-kolmio ja korkeuslukema, ja joet ovat pelkkiä
 *      uomia. Nimen antaa kohteen nimiö, joka liikkuu merkin mukana ja
 *      avaa kortin. Vuorikohteet ovat TÄSMÄLLEEN samoissa asteissa kuin
 *      lehden kolmiot — jos toista siirtää, on siirrettävä molempia.
 *
 *   3. LEHDELLÄ EI OLE NIMEÄ EIKÄ MERKKIÄ. Balaton, Hortobágy, Tokaj,
 *      Pannonhalma, Aggtelek ja Hollókő. Kuvassa Balaton on sininen
 *      läiskä ja loput pelkkää maastoa; kaikki, mitä pelaaja niistä saa
 *      tietää, tulee merkistä ja kortista.
 *
 * BUDAPEST EI OLE LISTASSA. Se on pelin oma laatta, jonka nimen peli
 * latoo itse ja jonka fokusvirta on kaupungin oma — sama ratkaisu kuin
 * Ateenalla Kreikan listassa.
 *
 * ── KOORDINAATIT ──────────────────────────────────────────────────
 *
 * Asteet on muunnettu laudan yksiköiksi valmiiksi ja jätetty
 * kommenttiin, kuten Kreikan listassa; pelissä ei ole projektiokoodia.
 * Molemmat laudat ovat mukana, koska Budapest on pelattavissa sekä
 * maailmankartalla että Euroopan laudalla:
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76. Tarkistus: Budapest 19,0402 E / 47,4979 N →
 *     6468,0 / 1497,5, ja laudalla laatta on kohdassa 6468 / 1497.
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
 *
 * Jokien pisteet on poimittu Natural Earthin 10m-uomasta eikä arvattu:
 * kukin kohde istuu sillä viivalla, jonka lehti piirtää. Tiszan
 * unkarilainen jakso on aineistossa nimetön piirre, mikä oli yksi syy
 * luovuttaa jokien nimeäminen kokonaan pelille.
 *
 * ── FAKTAPOHJA JA KUVAT ───────────────────────────────────────────
 *
 * Tekstit nojaavat en- ja hu-Wikipedian artikkeleihin, ja `lahde`-rivi
 * kertoo kohdekohtaisesti minkä artikkelin mihin osaan. Luvut on
 * pyöristetty ja epävarmat rajattu pois; ikäsopivuus (Perustuslaki) on
 * pidetty mielessä erityisesti Egerin piirityksessä ja Szegedin
 * tulvassa — tapahtumat kerrotaan, kauhukuvia ei maalata.
 *
 * Kuvat on haettu Commonsin rajapinnalla (generator=search +
 * imageinfo) 27.8.2026, ja jokaisen valitun tiedoston nimi, koko,
 * lisenssi ja tekijä ovat rajapinnan omaa vastausta — ei arvattuja
 * tiedostonimiä. Lisenssit ovat CC0, CC BY tai CC BY-SA, ja tekijä on
 * `lahde`-rivillä, koska CC BY vaatii maininnan.
 */

/**
 * Unkarin fokuskohteet: viisi kaupunkia, kolme vuorta, kolme vettä ja
 * kuusi maisemaa. Järjestys on kirjoittajan oma ja sillä on merkitys —
 * nimiöiden väistö käy listan läpi tässä järjestyksessä ja ensimmäisenä
 * listattu voittaa (js/fokuskohteet.js paivitaKohdeNimiot).
 */
export const FOKUSKOHTEET_HUN = [
  /* ── 1. LEHTEEN POLTETUT KAUPUNGIT ──────────────────────────────
   *
   * Nämä viisi ovat maat.mjs:n HUN.kaupungit -listan peilikuva. Nimi on
   * jo kartalla, joten näiltä peli ei latoisi nimiötä; merkki ja
   * poltetun nimen laatikko avaavat saman kortin.
   */
  {
    id: 'debrecen',
    nimi: 'Debrecen',
    tyyppi: 'kaupunki',
    nappi: 'Kaupunki, jota sanottiin kalvinismin Roomaksi',
    kysymykset: [
      'Miksi juuri Debrecenistä tuli protestanttien keskus?',
      'Mitä Unkarissa tapahtui vuonna 1849?',
    ],
    korostukset: ['reformaatio|reformaation'],
    // 21,6273 E / 47,5316 N — en-Wikipedia "Debrecen".
    laudat: {
      maailmankartta: { x: 6554.2, y: 1496.1 },
      europe: { x: 626.4, y: 643.5 },
    },
    teksti: 'Unkarin toiseksi suurin kaupunki keskellä Suurta alankoa. '
      + 'Reformaation jälkeen Debrecen oli niin yksimielisen '
      + 'protestanttinen, että sitä kutsuttiin "kalvinismin Roomaksi", ja '
      + 'sen 1820-luvulla valmistunut Suuri kirkko on yhä maan suurin '
      + 'protestanttinen kirkko. Samassa kirkossa julistettiin huhtikuussa '
      + '1849 Habsburgien suvun menettäneen Unkarin valtaistuimen — '
      + 'kaupunki toimi silloin muutaman kuukauden ajan maan '
      + 'pääkaupunkina.',
    lahde: 'en-Wikipedia "Debrecen" ja "Reformed Great Church of Debrecen", '
      + 'johdanto ja historiaosa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Debrecen - Protestant Great Church.JPG',
      selite: 'Debrecenin Suuri kirkko, Unkarin suurin protestanttinen '
        + 'kirkko, kaupungin päätorin laidalla.',
      lahde: 'Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'szeged',
    nimi: 'Szeged',
    tyyppi: 'kaupunki',
    nappi: 'Kaupunki, jonka joki vei ja Eurooppa rakensi takaisin',
    kysymykset: [
      'Miten kaupunki rakennettiin tulvan jälkeen uudelleen?',
      'Mistä szegediläinen paprika on kuuluisa?',
    ],
    // 20,1414 E / 46,2530 N — en-Wikipedia "Szeged".
    laudat: {
      maailmankartta: { x: 6504.7, y: 1549.8 },
      europe: { x: 597.9, y: 677.1 },
    },
    teksti: 'Kaupunki Tiszan ja Marosin yhtymäkohdassa, aurinkoisin paikka '
      + 'Unkarissa. Maaliskuussa 1879 — vain kuusi vuotta isoisän matkan '
      + 'jälkeen — Tisza mursi patonsa ja vei lähes koko kaupungin; pystyyn '
      + 'jäi muutama sata taloa. Szeged rakennettiin uudelleen kokonaan '
      + 'uuden kaavan mukaan, ja avun antaneet Euroopan suurkaupungit '
      + 'muistetaan yhä kehäkatujen nimissä: Wien, Bryssel, Rooma, Pariisi '
      + 'ja Lontoo. Kaupunki tunnetaan myös paprikastaan ja '
      + 'salamimakkarastaan.',
    lahde: 'en-Wikipedia "Szeged", historiaosa ja "Great Flood of Szeged" '
      + '(tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Szeged Fogadalmi templom DDNy.jpg',
      selite: 'Szegedin votiivikirkko, joka rakennettiin tulvan jälkeen '
        + 'annetun lupauksen täyttämiseksi.',
      lahde: 'Motacilla, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'pecs',
    nimi: 'Pécs',
    tyyppi: 'kaupunki',
    nappi: 'Kaupunki, jonka kirkko oli ennen moskeija',
    kysymykset: [
      'Millainen kaupunki roomalaisten Sopianae oli?',
      'Mitä ottomaanien ajasta on Unkarissa jäljellä?',
    ],
    korostukset: ['ottomaanit|ottomaanien'],
    // 18,2323 E / 46,0727 N — en-Wikipedia "Pécs".
    laudat: {
      maailmankartta: { x: 6441.1, y: 1557.3 },
      europe: { x: 561.3, y: 681.9 },
    },
    teksti: 'Mecsek-vuorten etelärinteellä oleva kaupunki on ollut '
      + 'asuttuna roomalaisajoista asti: Sopianaen varhaiskristillinen '
      + 'hautausmaa 300-luvulta on yhä maan alla nähtävissä. Unkarin '
      + 'ensimmäinen yliopisto perustettiin täällä vuonna 1367. '
      + 'Ottomaanien vallan aikana kaupungin päätorille rakennettiin '
      + 'Gázi Kászim -pashan moskeija, ja sama kupolirakennus on '
      + 'nykyään katolinen kirkko — Unkarin suurin säilynyt ottomaanien '
      + 'ajan rakennus.',
    lahde: 'en-Wikipedia "Pécs" ja "Mosque of Pasha Qasim", johdanto ja '
      + 'historiaosa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Pécs Cathedral Roman art era - Hungary.jpg',
      selite: 'Pécsin tuomiokirkko neljine torneineen Mecsek-vuorten '
        + 'juurella.',
      lahde: 'Takkk, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'eger',
    nimi: 'Eger',
    tyyppi: 'kaupunki',
    nappi: 'Linna, joka piti puolensa',
    kysymykset: [
      'Miten pieni varuskunta kesti niin pitkän piirityksen?',
      'Mikä tekee Egerin viinistä erityisen?',
    ],
    // 20,3772 E / 47,9025 N — en-Wikipedia "Eger".
    laudat: {
      maailmankartta: { x: 6512.6, y: 1480.4 },
      europe: { x: 602.4, y: 633.8 },
    },
    teksti: 'Barokkikaupunki Mátran ja Bükin välissä. Vuonna 1552 Egerin '
      + 'linna kesti kuukausia kestäneen ottomaanien piirityksen, vaikka '
      + 'puolustajia oli vain runsaat kaksituhatta — tapaus on Unkarissa '
      + 'yhtä tunnettu kuin mikä tahansa voitettu taistelu. Puoli '
      + 'vuosisataa myöhemmin kaupunki kuitenkin siirtyi ottomaaneille, ja '
      + 'siltä ajalta on jäljellä 40 metriä korkea minareetti, Euroopan '
      + 'pohjoisin säilynyt. Ympäröivät rinteet tuottavat Egri bikavér '
      + '-punaviiniä, jonka nimi tarkoittaa "härän verta".',
    lahde: 'en-Wikipedia "Eger" ja "Siege of Eger", johdanto ja '
      + 'historiaosa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Eger castle (by Pudelek) 01.JPG',
      selite: 'Egerin linnan muureja, joiden takana puolustajat kestivät '
        + 'vuoden 1552 piirityksen.',
      lahde: 'Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'gyor',
    nimi: 'Győr',
    tyyppi: 'kaupunki',
    nappi: 'Kolmen joen barokkikaupunki',
    kysymykset: [
      'Miksi kaupunki rakennettiin juuri jokien yhtymäkohtaan?',
      'Mitä Győrissä tehdään nykyään?',
    ],
    // 17,6504 E / 47,6875 N — en-Wikipedia "Győr".
    laudat: {
      maailmankartta: { x: 6421.7, y: 1489.5 },
      europe: { x: 550.1, y: 639.4 },
    },
    teksti: 'Kaupunki Budapestin ja Wienin puolivälissä, siinä missä Rába '
      + 'ja Rábca laskevat Tonavan sivuhaaraan Mosoni-Dunaan. Kolme jokea '
      + 'teki paikasta sekä kauppapaikan että linnoituksen, ja saksaksi se '
      + 'tunnettiin nimellä Raab. Ottomaanit pitivät kaupunkia neljä vuotta '
      + '1590-luvulla, minkä jälkeen se rakennettiin uudelleen italialaisten '
      + 'suunnittelijoiden käsissä — Győrin vanhakaupunki on siksi yksi '
      + 'Keski-Euroopan yhtenäisimpiä barokkikokonaisuuksia.',
    lahde: 'en-Wikipedia "Győr", johdanto, maantiede ja historiaosa '
      + '(tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Széchenyi Square, Győr.jpg',
      selite: 'Győrin Széchenyi-aukio, vanhankaupungin barokkitalojen '
        + 'reunustama päätori.',
      lahde: 'goga504, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /* ── 2. VUORET — LEHDELLÄ KOLMIO, PELISSÄ NIMI ──────────────────
   *
   * Asteet ovat samat kuin maat.mjs:n HUN.vuoret -listassa, joten
   * kohdemerkki osuu täsmälleen kuvaan poltetun hachure-kolmion päälle
   * ja nimiö latoo nimen sen viereen. Korkeuslukema on kuvassa, nimi
   * pelissä — ne täydentävät toisiaan eivätkä toista.
   */
  {
    id: 'kekes',
    nimi: 'Kékes',
    tyyppi: 'vuori',
    nappi: 'Unkarin katto — 1014 metriä',
    kysymykset: [
      'Miten Mátran vuoret syntyivät?',
      'Millaista on Unkarin ainoalla yli tuhannen metrin huipulla?',
    ],
    // 20,0100 E / 47,8714 N — en-Wikipedia "Kékes".
    laudat: {
      maailmankartta: { x: 6500.3, y: 1481.7 },
      europe: { x: 595.4, y: 634.6 },
    },
    teksti: 'Unkarin korkein kohta, 1014 metriä, Mátra-vuoriston laella. '
      + 'Se on maan ainoa yli tuhannen metrin huippu, ja koko Unkarista '
      + 'vain runsas prosentti on tätä ylänköä — muu maa on alankoa ja '
      + 'loivia kukkuloita. Mátra on vulkaanista alkuperää, ja sen '
      + 'andesiitti- ja rioliittirinteitä peittää pyökkimetsä. Nimi Kékes '
      + 'tulee sanasta kék, sininen: kaukaa katsottuna vuori näyttää '
      + 'siniseltä.',
    lahde: 'en-Wikipedia "Kékes" ja "Mátra", johdanto ja geologiaosa '
      + '(tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Kékestető.JPG',
      selite: 'Kékesin laki, Unkarin korkein kohta, jossa on näkötorni ja '
        + 'lähetinmasto.',
      lahde: 'Susulyka, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'istallos-ko',
    nimi: 'Istállós-kő',
    tyyppi: 'vuori',
    nappi: 'Vuori, jonka luolassa asuttiin jääkaudella',
    kysymykset: [
      'Mitä Istállós-kőn luolasta on löydetty?',
      'Millainen vuoristo Bükk on?',
    ],
    korostukset: ['jääkausi|jääkauden'],
    // 20,4439 E / 48,0831 N — en-Wikipedia "Istállós-kő".
    laudat: {
      maailmankartta: { x: 6514.8, y: 1472.7 },
      europe: { x: 603.7, y: 629.0 },
    },
    teksti: 'Bükk-vuoriston korkein huippu, 959 metriä, ja Unkarin toiseksi '
      + 'korkein kohta. Vuoren kyljessä oleva Istállós-kőn luola on yksi '
      + 'maan tärkeimmistä kivikauden löytöpaikoista: sieltä on kaivettu '
      + 'esiin kymmeniätuhansia vuosia vanhoja kivi- ja luutyökaluja sekä '
      + 'jääkauden eläinten luita. Bükk on kalkkikivivuoristo, ja sen '
      + 'ylätasanko on täynnä doliineja eli maanpinnan painanteita, joihin '
      + 'sadevesi katoaa.',
    lahde: 'en-Wikipedia "Istállós-kő" ja "Bükk", johdanto ja '
      + 'arkeologiaosa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Istállós-kő.JPG',
      selite: 'Istállós-kőn laki Bükk-vuoristossa, Unkarin toiseksi '
        + 'korkein kohta.',
      lahde: 'Debrecenivalaki, Wikimedia Commons (CC0)',
    },
  },
  {
    id: 'irottko',
    nimi: 'Írott-kő',
    tyyppi: 'vuori',
    nappi: 'Alppien viimeinen kivi',
    kysymykset: [
      'Miksi Alpit loppuvat juuri tähän?',
      'Millaista oli asua rajavuorella?',
    ],
    // 16,4261 E / 47,3522 N — en-Wikipedia "Geschriebenstein".
    laudat: {
      maailmankartta: { x: 6380.9, y: 1503.7 },
      europe: { x: 526.6, y: 648.2 },
    },
    teksti: 'Kőszegin vuorten korkein kohta, 882 metriä, ja Unkarin '
      + 'läntisin huippu. Vuori on tasan Unkarin ja Itävallan rajalla, ja '
      + 'saksaksi se on Geschriebenstein — molemmat nimet tarkoittavat '
      + '"kirjoitettua kiveä". Laella oleva näkötorni on rakennettu '
      + 'suoraan rajalinjan päälle, joten portaissa voi astua maasta '
      + 'toiseen. Kőszegin vuoret ovat Alppien itäisin haara: idempänä '
      + 'alkaa Pannonian alanko, joka jatkuu tasaisena satoja '
      + 'kilometrejä.',
    lahde: 'en-Wikipedia "Geschriebenstein" ja "Kőszeg Mountains", '
      + 'johdanto (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Geschriebenstein - Gipfelplateau.JPG',
      selite: 'Írott-kőn laki Unkarin ja Itävallan rajalla; näkötorni '
        + 'seisoo suoraan rajalinjan päällä.',
      lahde: 'C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /* ── 3. VEDET ───────────────────────────────────────────────────
   *
   * Jokien pisteet ovat Natural Earthin 10m-uomalta, joten merkki
   * istuu sillä viivalla, jonka lehti piirtää. Nimeä ei ole poltettu
   * kuvaan (maat.mjs `poltetutNimet.joet: false`), joten nimiö on
   * ainoa paikka, jossa joen nimi kartalla lukee.
   */
  {
    id: 'tonava',
    nimi: 'Tonava',
    tyyppi: 'joki',
    nappi: 'Joki, joka kääntyy etelään',
    kysymykset: [
      'Miksi Tonava kääntyy Unkarissa niin jyrkästi?',
      'Miten Buda ja Pest yhdistettiin?',
    ],
    // 19,1230 E / 47,7755 N — Natural Earth 10m, uoman piste Tonavan
    // mutkassa Visegrádin kohdalla.
    laudat: {
      maailmankartta: { x: 6470.8, y: 1485.8 },
      europe: { x: 578.4, y: 637.1 },
    },
    teksti: 'Euroopan toiseksi pisin joki virtaa Mustan metsän lähteiltä '
      + 'Mustallemerelle, ja Unkarin halki sitä kulkee runsaat 400 '
      + 'kilometriä. Visegrádin kohdalla joki törmää vuoriin ja kääntyy '
      + 'lännestä jyrkästi etelään — sitä mutkaa sanotaan Tonavan '
      + 'mutkaksi. Sata kilometriä alavirtaan joki jakaa pääkaupungin '
      + 'kahtia: vuoriselle länsirannalle jää Buda ja tasaiselle '
      + 'itärannalle Pest, ja vuonna 1849 valmistunut Ketjusilta oli '
      + 'ensimmäinen pysyvä silta niiden välillä.',
    lahde: 'en-Wikipedia "Danube" ja "Danube Bend", johdanto ja '
      + 'maantiedeosa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Hungary donau Visegrad bend IMG 0186.JPG',
      selite: 'Tonavan mutka Visegrádin kohdalla, jossa joki kääntyy '
        + 'vuorten pakottamana etelään.',
      lahde: 'Bjoertvedt, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'tisza',
    nimi: 'Tisza',
    tyyppi: 'joki',
    nappi: 'Joki, joka lyhennettiin ihmiskäsin',
    kysymykset: [
      'Miksi jokea haluttiin oikaista?',
      'Mitä säännöstely teki alangon maisemalle?',
    ],
    korostukset: ['säännöstely|säännöstelytyöt'],
    // 20,1677 E / 47,1458 N — Natural Earth 10m, uoman piste Szolnokin
    // pohjoispuolella. Aineistossa Tiszan unkarilainen jakso on
    // nimetön piirre, ks. tiedoston alku.
    laudat: {
      maailmankartta: { x: 6505.6, y: 1512.4 },
      europe: { x: 598.4, y: 653.7 },
    },
    teksti: 'Unkarin toinen suuri joki tulee Karpaateilta ja halkoo Suuren '
      + 'alangon pohjoisesta etelään. Ennen 1800-lukua Tisza mutkitteli '
      + 'niin loivasti, että kevättulvat levittivät veden kymmenien '
      + 'kilometrien levyisiksi soiksi. Isoisän matkan aikaan käynnissä '
      + 'olivat Euroopan suurimmat säännöstelytyöt: yli sata mutkaa '
      + 'katkaistiin läpikaivetuilla oikoteillä, joki lyheni satoja '
      + 'kilometrejä ja suot kuivattiin pelloiksi. Samalla katosi suuri '
      + 'osa vanhasta alankomaisemasta.',
    lahde: 'en-Wikipedia "Tisza", johdanto ja "River regulation" -osa '
      + '(tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Tisza river - Szolnok, Hungary (1).JPG',
      selite: 'Tisza Szolnokin kohdalla, missä joki kulkee oikaistua '
        + 'uomaansa Suuren alangon halki.',
      lahde: 'Derzsi Elekes Andor, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'drava',
    nimi: 'Dráva',
    tyyppi: 'joki',
    nappi: 'Raja, joka virtaa',
    kysymykset: [
      'Miksi Dráva sai jäädä säännöstelemättä?',
      'Millaisia eläimiä joen rannoilla elää?',
    ],
    // 17,5179 E / 45,8945 N — Natural Earth 10m, uoman piste Barcsin
    // kohdalla Unkarin ja Kroatian rajalla.
    laudat: {
      maailmankartta: { x: 6417.3, y: 1564.8 },
      europe: { x: 547.5, y: 686.6 },
    },
    teksti: 'Alpeilta tuleva joki kulkee runsaat kaksisataa kilometriä '
      + 'Unkarin ja Kroatian rajaa pitkin ja laskee lopulta Tonavaan. '
      + 'Toisin kuin Tisza, Dráva jäi suurelta osin oikaisematta, ja siksi '
      + 'se on yhä leveä ja arvaamaton: joki siirtelee hiekkasärkkiään, '
      + 'kaivaa uusia uomia ja jättää vanhoja kuivumaan. Rantojen '
      + 'tulvametsät ovat Keski-Euroopan laajimpia, ja niissä pesii muun '
      + 'muassa merikotkia ja mustahaikaroita.',
    lahde: 'en-Wikipedia "Drava" ja "Mura-Drava-Danube Biosphere '
      + 'Reserve", johdanto (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Barcs, Dráva-part 2021 01.jpg',
      selite: 'Drávan hiekkarantaa Barcsin kohdalla Unkarin ja Kroatian '
        + 'rajalla.',
      lahde: 'Pasztilla aka Attila Terbócs, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'balaton',
    nimi: 'Balaton',
    tyyppi: 'muu',
    symboli: 'luonto',
    nappi: 'Keski-Euroopan suurin järvi',
    kysymykset: [
      'Miksi Balaton on niin matala?',
      'Mikä on Tihanyn luostarin perustamiskirja?',
    ],
    // 17,7407 E / 46,8733 N — Natural Earth 10m, Balatonin
    // rantaviivan keskipiste.
    laudat: {
      maailmankartta: { x: 6424.7, y: 1523.8 },
      europe: { x: 551.8, y: 660.8 },
    },
    teksti: 'Keski-Euroopan suurin järvi, pinta-alaltaan noin 590 '
      + 'neliökilometriä mutta hämmästyttävän matala: keskisyvyys on vain '
      + 'kolmisen metriä, ja Tihanyn niemen kohdalla voi kahlata pitkälle '
      + 'ulapalle. Matalan veden takia järvi lämpenee kesällä nopeasti ja '
      + 'jäätyy talvella kokonaan. Tihanyn niemellä on vuonna 1055 '
      + 'perustettu luostari, jonka perustamiskirja on vanhin säilynyt '
      + 'asiakirja, jossa on unkarinkielisiä sanoja latinan seassa.',
    lahde: 'en-Wikipedia "Lake Balaton" ja "Tihany Abbey", johdanto ja '
      + 'historiaosa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Lake Balaton at Tihany, Hungary.jpg',
      selite: 'Balaton Tihanyn niemeltä katsottuna; järvi on laaja mutta '
        + 'vain muutaman metrin syvyinen.',
      lahde: 'Takkk, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },

  /* ── 4. MAISEMAT, JOITA LEHTI EI NIMEÄ ──────────────────────────
   *
   * Näistä kuudesta kuvassa ei ole merkintää eikä nimeä. Kaikki, mitä
   * pelaaja niistä saa tietää, tulee kohdemerkistä ja kortista — ja
   * juuri siksi ne ovat listassa.
   */
  {
    id: 'hortobagy',
    nimi: 'Hortobágy',
    tyyppi: 'muu',
    symboli: 'luonto',
    nappi: 'Aro, jonka yllä ei ole aitaa',
    kysymykset: [
      'Miten puszta syntyi?',
      'Millaista karjaa aroilla laidunnetaan?',
    ],
    korostukset: ['puszta|pusztan'],
    // 21,0500 E / 47,6000 N — en-Wikipedia "Hortobágy National Park",
    // puiston keskiosa Hortobágyn kylän seudulla.
    laudat: {
      maailmankartta: { x: 6535.0, y: 1493.2 },
      europe: { x: 615.4, y: 641.7 },
    },
    teksti: 'Suuren alangon aroa, jota unkariksi sanotaan pusztaksi: '
      + 'Euroopan laajin yhtenäinen luonnonlaidun, jolla ei kasva puita '
      + 'juuri lainkaan. Maisema ei ole aivan luonnon oma — Tiszan '
      + 'säännöstely kuivatti suot, ja suolainen maa jäi laitumeksi. '
      + 'Paimenet eli csikósit laiduntavat täällä yhä unkarilaista '
      + 'harmaakarjaa, kierteissarvisia racka-lampaita ja hevoslaumoja, ja '
      + 'aron tunnusmerkki on gémeskút, korkea vipuvarrellinen kaivo, '
      + 'jonka näkee kilometrien päähän.',
    lahde: 'en-Wikipedia "Hortobágy National Park" ja "Puszta", johdanto '
      + 'ja luonto-osa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Hortobagy-ziehbrunnen.jpg',
      selite: 'Hortobágyn vipukaivo eli gémeskút, aron tunnusmerkki, joka '
        + 'näkyy kauas puuttomalle laitumelle.',
      lahde: 'Andreas Poeschek, fotografikus.hu, Wikimedia Commons (CC BY 2.0 AT)',
    },
  },
  {
    id: 'tokaj',
    nimi: 'Tokaj',
    tyyppi: 'muu',
    symboli: 'ruoka',
    nappi: 'Kuninkaiden viini',
    kysymykset: [
      'Miten aszú-viini tehdään?',
      'Miksi juuri tämä rinne tuottaa makeaa viiniä?',
    ],
    // 21,4092 E / 48,1178 N — en-Wikipedia "Tokaj".
    laudat: {
      maailmankartta: { x: 6547.0, y: 1471.2 },
      europe: { x: 622.3, y: 628.1 },
    },
    teksti: 'Bodrog- ja Tisza-jokien yhtymäkohdassa nousee vulkaaninen '
      + 'kukkula, jonka rinteillä tehdään Unkarin kuuluisinta viiniä. '
      + 'Jokien sumu suosii jalohometta, joka kuivattaa rypäleet '
      + 'rusinoiksi ja väkevöi sokerin — niistä puristetaan makea '
      + 'aszú-viini. Tokaj-Hegyalja rajattiin omaksi viinialueekseen jo '
      + 'vuonna 1737, mikä tekee siitä yhden maailman ensimmäisistä '
      + 'suojatuista alkuperäalueista. Ranskan hovissa viinistä sanottiin '
      + '"viinien kuningas ja kuninkaiden viini".',
    lahde: 'en-Wikipedia "Tokaj wine region" ja "Tokaji", johdanto ja '
      + 'historiaosa (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Vineyard near Tokaj, Hungary.jpg',
      selite: 'Viinitarhoja Tokajin vulkaanisella rinteellä Bodrogin ja '
        + 'Tiszan yhtymäkohdan yllä.',
      lahde: 'Pudelek, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'pannonhalma',
    nimi: 'Pannonhalma',
    tyyppi: 'muu',
    symboli: 'historia',
    nappi: 'Luostari, joka on ollut paikallaan tuhat vuotta',
    kysymykset: [
      'Mitä munkit tekivät luostarissa keskiajalla?',
      'Miten Unkarista tuli kristitty maa?',
    ],
    // 17,7592 E / 47,5525 N — en-Wikipedia "Pannonhalma Archabbey".
    laudat: {
      maailmankartta: { x: 6425.3, y: 1495.2 },
      europe: { x: 552.2, y: 643.0 },
    },
    teksti: 'Kukkulan laella Győrin eteläpuolella seisoo benediktiiniläinen '
      + 'arkkiluostari, joka perustettiin vuonna 996 — siis ennen kuin '
      + 'Unkarissa oli kuningasta. Munkit toivat maahan kristinuskon '
      + 'lisäksi kirjoitustaidon, viininviljelyn ja koulun, ja luostarissa '
      + 'on yhä toiminnassa oleva lukio. Sen kirjastossa on satojatuhansia '
      + 'niteitä, ja rakennuksissa näkyy tuhannen vuoden verran tyylejä '
      + 'romaanisesta kaarikäytävästä uusklassiseen kirjastosaliin.',
    lahde: 'en-Wikipedia "Pannonhalma Archabbey", johdanto ja historiaosa '
      + '(tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Pannonhalma - stutue and archabbey.JPG',
      selite: 'Pannonhalman arkkiluostari kukkulallaan; paikalla on ollut '
        + 'benediktiiniläisyhteisö vuodesta 996.',
      lahde: 'Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'aggtelek',
    nimi: 'Aggtelekin luolat',
    tyyppi: 'muu',
    symboli: 'luonto',
    nappi: 'Luola, jossa pidetään konsertteja',
    kysymykset: [
      'Miten tippukivet syntyvät?',
      'Miksi luolassa kaikuu niin hyvin?',
    ],
    // 20,5236 E / 48,4703 N — en-Wikipedia "Baradla Cave".
    laudat: {
      maailmankartta: { x: 6517.5, y: 1456.2 },
      europe: { x: 605.3, y: 618.8 },
    },
    teksti: 'Aggtelekin karstialueen kalkkikiveen on liuennut yli '
      + 'kaksisataa luolaa, ja niistä suurin on Baradla: yli kaksikymmentä '
      + 'kilometriä käytävää, joka jatkuu Slovakian puolelle Domican '
      + 'luolana. Käytävissä on kymmenien metrien korkuisia saleja ja '
      + 'Euroopan suurimpiin kuuluvia tippukivipatsaita. Suurimmassa '
      + 'salissa on niin poikkeuksellinen akustiikka, että siellä on '
      + 'pidetty konsertteja jo 1800-luvulta lähtien.',
    lahde: 'en-Wikipedia "Baradla Cave" ja "Aggtelek National Park", '
      + 'johdanto (tarkistettu 27.8.2026).',
    kuva: {
      tiedosto: 'Aggtelek - Baradla.jpg',
      selite: 'Baradlan luolan tippukiviä; luolasto jatkuu Slovakian '
        + 'puolelle yli kahdenkymmenen kilometrin mittaisena.',
      lahde: 'Fenyessanyi, Wikimedia Commons (CC BY 3.0)',
    },
  },
  {
    id: 'holloko',
    nimi: 'Hollókő',
    tyyppi: 'muu',
    symboli: 'kulttuuri',
    nappi: 'Kylä, joka rakennettiin uudelleen vanhaan malliin',
    kysymykset: [
      'Keitä palócit ovat?',
      'Miksi vanha kylä säilytettiin ennallaan?',
    ],
    // 19,5900 E / 47,9950 N — en-Wikipedia "Hollókő".
    laudat: {
      maailmankartta: { x: 6486.3, y: 1476.4 },
      europe: { x: 587.3, y: 631.3 },
    },
    teksti: 'Cserhátin kukkuloilla oleva pikkukylä, jossa asuu palóceiksi '
      + 'kutsuttu kansanryhmä. Kylän vanha osa paloi vuonna 1909, ja se '
      + 'rakennettiin uudelleen täsmälleen entiseen malliin: valkoiseksi '
      + 'kalkitut savitalot, puiset parvekkeet ja olkikatot kahden puolen '
      + 'yhtä kaarevaa kujaa. Rinteellä on 1200-luvun linnan raunio. '
      + 'Hollókő oli ensimmäinen kylä maailmassa, joka otettiin Unescon '
      + 'maailmanperintöluetteloon elävänä asuinpaikkana eikä museona.',
    lahde: 'en-Wikipedia "Hollókő", johdanto ja historiaosa (tarkistettu '
      + '27.8.2026).',
    kuva: {
      tiedosto: 'Holloko Village Center.jpg',
      selite: 'Hollókőn vanhan kylän kuja, jonka talot rakennettiin '
        + 'vuoden 1909 tulipalon jälkeen entiseen malliin.',
      lahde: 'Kfbs06, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
];
