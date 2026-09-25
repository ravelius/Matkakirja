/*
 * BRITANNIAN HAHMOTELMANOSTOT — täydentää Britannian karttaa 13
 * olemassa olevan noston (js/packs/maastokohteet-gbr.js: Ben Nevis,
 * Snowdon, Pohjanmeri, Irlanninmeri, Thames, Stonehenge, Hadrianuksen
 * muuri, Skara Brae, Ironbridge, Bathin roomalaiset kylpylät;
 * js/packs/fokuskohteet-gbr.js: St Paulin katedraali, Crystal Palace,
 * Vanha London Bridge) rinnalle samalla hahmotelmareitillä kuin muut
 * EU-maiden ja lähialueiden pakit (malli js/packs/hahmotelma-svn.js).
 *
 * === MIKSI NÄMÄ 17 KOHDETTA ===
 *
 * Olemassa oleva 13 kattoi Skotlannin ja Walesin vuoret, kaksi merta,
 * Thamesin, esihistoriaa (Stonehenge, Skara Brae), roomalaisaikaa
 * (Hadrianuksen muuri, Bath) sekä Lontoon nähtävyyksiä ja teollisuus-
 * historiaa (Ironbridge). Kokonaan puuttuivat Pohjois-Irlanti, Lake
 * District, Cornwall, Skotlannin länsirannikko ja -ylämaat muualta
 * kuin Ben Nevisin ympäriltä, Wales muualta kuin Snowdonista, Oxford,
 * teollisuuskaupungit Liverpool ja Manchester, sekä kokonaiset
 * nostotyypit 'ruoka' ja Edinburgh (pelikaupungeista huolimatta ilman
 * yhtäkään omaa kohdetta). Tässä täydennetään juuri näitä aukkoja:
 * neljä uutta 'tekniikka'-nostoa (Cornish tinakaivos, Quarry Bank
 * Mill, Stockton ja Darlingtonin rautatie, Sohon manufaktuuri) nostaa
 * Britannian teknisen historian painoarvoa, kolme 'ruoka'-nostoa
 * (fish and chips, iltapäivätee, haggis) tuo puuttuneen tyypin
 * mukaan, ja loput täydentävät maantieteellistä kattavuutta idästä
 * länteen ja etelästä pohjoiseen.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos pienempi),
 * nimeltään `gbr-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on kirjattu
 * pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260921/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon; siihen asti
 * osoitteet vastaavat 404:llä. Tiedostot ja niiden JSON-metadata ovat
 * kansiossa /Users/samireivinen/Matkakirja-nostot-kuvat/gbr/ (metadata
 * _json/-alikansiossa). Kaikki kuvat ovat public domain / CC0 / CC BY
 * / CC BY-SA, tekijä ja lisenssi tarkistettu Commonsin
 * extmetadata-rajapinnasta 21.9.2026.
 *
 * === REITTI (KOHDE_MAAT) ==============================================
 *
 * Sama reitti kuin muidenkin hahmotelmapakkien (js/fokuskohteet.js
 * liittää rivit KOHDE_MAAT.GBR:ään olemassa olevan listan perään).
 * `lahi: true` on sama lähizoomiportti kuin muilla hahmotelmilla
 * (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian artikkelista (nimi kirjattu
 * rivin viereen) ja laudat on laskettu tools/johda-maastokohteet.mjs:n
 * `laudat`-funktiolla (Millerin lieriö maailmankartalle, tasaväli
 * Euroopan laudalle). Kaikki 17 kohdetta osuvat Britannian fokuslehden
 * rajaukseen. Sijainnit on tarkoituksella levitetty ympäri Britanniaa
 * eivätkä ne toista mitään 13 nykyisen noston paikkaa: Pohjois-Irlanti
 * (Giant's Causeway), Cumbria (Windermere), Cornwall (Geevor), Cheshire
 * (Quarry Bank Mill), Liverpool, Oxford, Lancashire (fish and chips),
 * Bedfordshire (iltapäivätee), Ayrshire (haggis), County Durham
 * (Stockton ja Darlington), Birmingham (Sohon manufaktuuri), Skye,
 * Loch Lomond, Wales (Caernarfon), Dover, York ja Edinburgh.
 */

/** Britannian hahmotelmanostot: sisällölliset kohteet. */
export const HAHMOTELMA_GBR = [
  {
    id: 'hahmotelma-giants-causeway',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-giants-causeway-483e6173.jpg',
      lyhyt: "Giant's Causewayn kuusikulmaiset bazalttipylväät ja aallokas Pohjois-Atlantti.",
      selite: 'Tuhannet mustat kivipylväät muodostavat portaikon kohti merta. Aallot lyövät '
        + 'pylväiden reunoja vasten sateisessa säässä.',
      lahde: 'Valokuva: Jriley17, Wikimedia Commons (CC0).',
      tekija: 'Jriley17',
      lahdeUrl: "https://commons.wikimedia.org/wiki/File:Giant's_Causeway_Panoramic.jpg",
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-giants-causeway-8f1be665.jpg',
        lyhyt: 'Kuusikulmaisten pylväiden tasaiset yläpinnat lähikuvassa.',
        selite: 'Pylväiden yläpinnat muodostavat epätasaisen, mutta selvästi kuusikulmaisen '
          + 'kuvion. Kävijät kulkevat pylväiden päällä taustalla.',
        lahde: 'Valokuva: Eric Jones, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Eric Jones',
        lahdeUrl: "https://commons.wikimedia.org/wiki/File:Hexagonal_columns_at_the_Giant's_Causeway_-_geograph.org.uk_-_3736290.jpg",
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: "Giant's Causeway",
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      "Mistä geologisesta ilmiöstä Giant's Causewayn kuusikulmaiset pylväät syntyivät?",
      'Mitä kansantarun mukaan jättiläinen Fionn mac Cumhaill rakensi pylväistä?',
    ],
    korostukset: ['Fionn mac Cumhaill|Fionn mac Cumhaillin', 'bazalttipylväs|bazalttipylvään'],
    nappi: '1873-matkailija näkisi saman kivipadon; UNESCO nimeää sen maailmanperinnöksi vasta '
      + '1986',
    // -6.5122 E / 55.2372 N — en-Wikipedia "Giant's Causeway"
    laudat: {
      maailmankartta: { x: 5616.3, y: 1154.8 },
      europe: { x: 86.2, y: 440.9 },
    },
    teksti: "Giant's Causeway on noin 40 000 toisiinsa lomittuvan bazalttipylvään muodostama "
      + 'alue Pohjois-Irlannin Antrimin kreivikunnassa, lähellä Bushmillsin kylää. Pylväät '
      + 'syntyivät noin 50–60 miljoonaa vuotta sitten, kun sula laava jäähtyi ja halkeili '
      + 'säännöllisiksi, enimmäkseen kuusikulmaisiksi pylväiksi; korkeimmat niistä nousevat '
      + 'noin 12 metriin. Kansantarun mukaan pylväät ovat jättiläinen Fionn mac Cumhaillin '
      + 'rakentaman padon jäännös, ja nimi juontuu tästä tarinasta. UNESCO otti alueen '
      + 'maailmanperintöluetteloon vuonna 1986, ja se on nykyään yksi Pohjois-Irlannin '
      + 'suosituimmista nähtävyyksistä.',
    lahde: 'en-Wikipedia "Giant\'s Causeway", johdanto-osa ja osiot "Geology", "Legend" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: "Minä vuonna Giant's Causeway otettiin UNESCOn maailmanperintöluetteloon?",
      vaihtoehdot: ['1972', '1986', '1995', '2005'],
      oikea: 1,
      fakta: 'Suurin osa pylväistä on kuusikulmaisia, mutta joukossa on myös neli- ja '
        + 'kahdeksankulmaisia; korkein pylväs kohoaa noin 12 metriin.',
    },
  },
  {
    id: 'hahmotelma-windermere',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-windermere-96955551.jpg',
      lyhyt: 'Windermere-järven tyyni pinta ja purjeveneitä pilvisenä päivänä.',
      selite: 'Järven molemmin puolin kohoaa puustoisia niemekkeitä, ja vedellä keinuu useita '
        + 'pieniä purjeveneitä. Taustalla siintävät Lake Districtin loivat vaarat.',
      lahde: 'Valokuva: Michael D Beckwith, Wikimedia Commons (CC0).',
      tekija: 'Michael D Beckwith',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Windermere_Panoramic.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-windermere-477a6a15.jpg',
        lyhyt: 'Venesatama ja poijuja Windermere-järven rannalla.',
        selite: 'Punaiset poijut merkitsevät väylää veneille. Rannalla on venesatama ja '
          + 'järveä reunustaa tiheä metsäinen rinne.',
        lahde: 'Valokuva: mattbuck, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'mattbuck',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Windermere_MMB_66_Bowness-on-Windermere.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Windermere',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mikä rautatiehaara teki Windermerestä suositun matkailukohteen 1840-luvulla?',
      'Mihin jokeen ja lahteen Windermeren vedet laskevat?',
    ],
    korostukset: ['nauhajärvi|nauhajärvi', 'Leven|Leven-jokea'],
    nappi: 'Rautatiehaara on tuonut Lake Districtin matkailijoiden ulottuville jo vuodesta 1847',
    // -2.9333 E / 54.3667 N — en-Wikipedia "Windermere"
    laudat: {
      maailmankartta: { x: 5735.6, y: 1195 },
      europe: { x: 154.9, y: 463.8 },
    },
    teksti: 'Windermere on Cumbriassa sijaitseva nauhajärvi ja Englannin suurin järvi '
      + 'pituudeltaan, pinta-alaltaan ja tilavuudeltaan, vaikka se jää selvästi Skotlannin '
      + 'suurimpia järviä pienemmäksi. Järvi on noin 18 kilometriä pitkä ja enimmillään '
      + 'reilun kilometrin levyinen, ja sen syvin kohta on 64 metriä. Vedet laskevat '
      + 'Leven-jokea pitkin Morecamben lahteen. Järvestä tuli suosittu matkailukohde, kun '
      + 'Kendalin ja Windermeren rautatiehaara avattiin vuonna 1847, ja se toi Lake '
      + 'Districtin ensi kertaa laajan yleisön ulottuville.',
    lahde: 'en-Wikipedia "Windermere", johdanto-osa (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Kuinka syvä on Windermere-järven syvin kohta?',
      vaihtoehdot: ['35 metriä', '50 metriä', '64 metriä', '18 metriä'],
      oikea: 2,
      fakta: 'Windermere on noin 18 kilometriä pitkä ja enimmillään reilun kilometrin '
        + 'levyinen nauhajärvi, ja sen vedet laskevat Leven-jokea pitkin Morecamben lahteen.',
    },
  },
  {
    id: 'hahmotelma-geevor-tin',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-geevor-tin-799121e1.jpg',
      lyhyt: 'Geevorin tinakaivoksen kivi- ja peltirakennuksia Cornwallin rannikolla.',
      selite: 'Vanhat kaivosrakennukset seisovat kalliorannikon reunalla, meri taustalla. '
        + 'Rakennusten joukossa on sekä kivestä että aaltopellistä tehtyjä osia.',
      lahde: 'Valokuva: ArildV, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'ArildV',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Geevor_Tin_Mine_July_2026_20.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-geevor-tin-adeea36b.jpg',
        lyhyt: 'Punertava kaivosjäte ja rannan kalliot Geevorin lähellä.',
        selite: 'Kallion pinnassa näkyy voimakkaan punaruskeita mineraalijuovia. Alhaalla '
          + 'rantakivikossa meri lyö kallioita vasten.',
        lahde: 'Valokuva: ArildV, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'ArildV',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Geevor_Tin_Mine_July_2026_25.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Geevorin tinakaivos',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Millä nimillä Geevorin aluetta louhittiin ennen nykyistä kaivosyhtiötä?',
      'Mihin maailmanperintökohteeseen Geevorin kaivos kuuluu nykyään?',
    ],
    korostukset: ['Wheal an Giver|Wheal an Giveriksi', 'North Levant Mine|North Levant Mine'],
    nappi: 'Vuonna 1873 alueella louhitaan vielä pienimuotoisesti; nykyinen Geevor-yhtiö syntyy '
      + 'vasta 1911',
    // -5.6739 E / 50.1552 N — en-Wikipedia "Geevor Tin Mine"
    laudat: {
      maailmankartta: { x: 5644.2, y: 1383.4 },
      europe: { x: 102.3, y: 574.5 },
    },
    teksti: 'Geevorin tinakaivos sijaitsee Cornwallin länsiosassa Pendeenin ja Trewellardin '
      + 'kylien välissä, alueella jossa tinaa ja kuparia on louhittu 1700-luvun lopulta '
      + 'lähtien. Alkujaan Wheal an Giveriksi kutsuttua kaivosta työstettiin 1800-luvulla '
      + 'nimillä East ja North Levant Mine, ja 1880-luvulla siellä työskenteli '
      + 'parhaimmillaan lähes 180 louhijaa ennen kuin North Levant suljettiin vuonna 1891. '
      + 'Nykyinen Geevor Tin Mines -yhtiö perustettiin vasta 1911, ja kaivos toimi aina '
      + 'vuoteen 1990 asti, jolloin se oli yksi viimeisistä toimivista tinakaivoksista '
      + 'Cornwallissa. Alue on nykyään museo ja osa Cornwallin ja Länsi-Devonin '
      + 'kaivosmaiseman maailmanperintökohdetta.',
    lahde: 'en-Wikipedia "Geevor Tin Mine", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-quarry-bank-mill',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-quarry-bank-mill-1090a197.jpg',
      lyhyt: 'Quarry Bank Millin punatiilinen tehdasrakennus ja korkea savupiippu.',
      selite: 'Pitkä, monikerroksinen tehdasrakennus kohoaa vehreän nurmikon reunalla. Korkea '
        + 'tiilinen savupiippu erottuu selvästi rakennuksen takana.',
      lahde: 'Valokuva: Francis Franklin, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Francis Franklin',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Quarry_Bank_Mill_Styal.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-quarry-bank-mill-ce55fc16.jpg',
        lyhyt: 'Tehtaan kellotorni ja kello lähikuvassa.',
        selite: 'Valkoinen kellotorni kohoaa tehtaan päädyn harjalla, ja sen alla on sininen '
          + 'kellotaulu. Vieressä nousee korkea tiilinen savupiippu.',
        lahde: 'Valokuva: Peter Barr, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Peter Barr',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Quarry_Bank_Mill,_Styal_-_geograph.org.uk_-_3866073.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Quarry Bank Mill',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Kuka perusti Quarry Bank Millin ja minä vuonna?',
      'Mikä laki lyhensi tehtaan työntekijöiden työaikaa vuonna 1847?',
    ],
    korostukset: ['Samuel Greg|Samuel Greg', 'Styal Estate|Styal Estaten'],
    nappi: 'Tehdas on vuonna 1873 jo lähes 90-vuotias, mutta yhä täydessä käytössä uuden, '
      + 'lyhyemmän työajan puitteissa',
    // -2.2634 E / 53.3436 N — en-Wikipedia "Quarry Bank Mill"
    laudat: {
      maailmankartta: { x: 5757.9, y: 1241.7 },
      europe: { x: 167.7, y: 490.7 },
    },
    teksti: 'Quarry Bank Mill on Cheshiren Stylissä sijaitseva puuvillatehdas, yksi Britannian '
      + 'parhaiten säilyneistä teollisen vallankumouksen ajan tekstiilitehtaista. Samuel '
      + 'Greg perusti tehtaan vuonna 1784 Bollin-joen rannalle hyödyntäen joen vesivoimaa, '
      + 'ja hänen eläköityessään 1832 laitoksesta oli tullut maan suurin puuvillanjalostamo. '
      + 'Greg rakensi tehtaan ympärille myös työläisilleen kokonaisen kylän, Styal Estaten, '
      + 'ja vaimonsa Hannah Lightbodyn ansiosta perhe suhtautui työntekijöihin tavanomaista '
      + 'huolehtivammin tarjoten muun muassa terveydenhoitoa. Työpäivät olivat silti '
      + 'pitkiä, noin 72 tuntia viikossa, kunnes uusi laki lyhensi työaikaa vuonna 1847.',
    lahde: 'en-Wikipedia "Quarry Bank Mill", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-liverpool-docks',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-liverpool-docks-0294c2d5.jpg',
      lyhyt: 'Ilmakuva Liverpoolin Albert Dockista ja Merseyjoesta.',
      selite: 'Punatiiliset varastorakennukset ympäröivät suorakaiteen muotoista satama-'
        + 'allasta. Taustalla avautuu leveä Merseyjoki ja kaupungin laitamat.',
      lahde: 'Valokuva: BCDS, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'BCDS',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_Liverpool_waterfront_2.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-liverpool-docks-d944d9f0.jpg',
        lyhyt: 'Albert Dockin varastorakennus ja veneitä satama-altaassa.',
        selite: 'Pitkä punatiilinen varasto lepää oranssien pilarien varassa vesirajassa. '
          + 'Vanhoja aluksia on kiinnitetty laiturin viereen, ja rakennus kuvastuu veteen.',
        lahde: 'Valokuva: Rodhullandemu, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Rodhullandemu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rear_of_Edward_Pavilion,_Albert_Dock_2018.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Albert Dock, Liverpool',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Mistä materiaaleista Albert Dock rakennettiin, ja miksi se teki siitä poikkeuksellisen?',
      'Millaista rahtia telakan varastoissa säilytettiin?',
    ],
    korostukset: ['Jesse Hartley|Jesse Hartley', 'hydraulinen nosturi|hydrauliset nosturit'],
    nappi: 'Vuonna 1873 telakka on 27-vuotiaana yhä täydessä käytössä konjakin, teen ja '
      + 'puuvillan varastona',
    // -2.9926 E / 53.4013 N — en-Wikipedia "Royal Albert Dock, Liverpool"
    laudat: {
      maailmankartta: { x: 5733.6, y: 1239.1 },
      europe: { x: 153.7, y: 489.1 },
    },
    teksti: 'Albert Dock on Liverpoolin satama- ja varastorakennusten kokonaisuus, jonka '
      + 'suunnittelivat Jesse Hartley ja Philip Hardwick ja joka avattiin vuonna 1846. Se '
      + 'oli ensimmäinen rakennus Isossa-Britanniassa, joka tehtiin valuraudasta, tiilestä '
      + 'ja kivestä ilman puuta kantavissa rakenteissa, minkä ansiosta siitä tuli maailman '
      + 'ensimmäinen paloturvallinen varastojärjestelmä. Laivat purettiin ja lastattiin '
      + 'suoraan varastoihin, mikä oli aikanaan vallankumouksellista, ja kaksi vuotta '
      + 'avaamisen jälkeen telakalle asennettiin maailman ensimmäiset hydrauliset nosturit. '
      + 'Suojaisen mutta silti turvallisen rakenteensa ansiosta telakka oli suosittu varasto '
      + 'arvokkaalle rahdille, kuten konjakille, puuvillalle, tealle, silkille, tupakalle, '
      + 'norsunluulle ja sokerille.',
    lahde: 'en-Wikipedia "Royal Albert Dock, Liverpool", johdanto-osa ja osio "History" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Albert Dock avattiin Liverpoolissa?',
      vaihtoehdot: ['1836', '1846', '1861', '1872'],
      oikea: 1,
      fakta: 'Telakka sai kuninkaallisen "Royal"-arvonimensä vasta vuonna 2018 – yli 170 '
        + 'vuotta avaamisensa jälkeen.',
    },
  },
  {
    id: 'hahmotelma-oxford',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-oxford-597505e4.jpg',
      lyhyt: 'Radcliffe Camera ja sitä ympäröivät Oxfordin college-rakennukset.',
      selite: 'Pyöreä kupolirakennus kohoaa nurmikentän keskellä, ja sitä reunustavat vanhat '
        + 'kivirakennukset joka puolelta. Pyöräpysäköintejä ja kävelijöitä näkyy pihalla.',
      lahde: 'Valokuva: Julian Herzog, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Julian Herzog',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Radcliffe_Camera_Oxford_2018_02.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-oxford-6a2becea.jpg',
        lyhyt: 'Radcliffe Cameran kupoli ja pylväsrivi lähempää.',
        selite: 'Harmaa lyijykupoli kohoaa pylväiden reunustaman pyöreän rakennuksen yllä. '
          + 'Alaosassa on pyöreitä ikkunoita ja kaarevia holvikäytäviä.',
        lahde: 'Valokuva: Diliff, Wikimedia Commons (CC BY 2.5).',
        tekija: 'Diliff',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Radcliffe_Camera,_Oxford_-_Oct_2006.jpg',
        lisenssi: 'CC BY 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
      },
    ],
    nimi: 'Radcliffe Camera, Oxford',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kenen jäämistöstä Radcliffe Cameran rakentaminen rahoitettiin?',
      'Mihin rakennukseen Radcliffe Camera on yhteydessä maanalaisen tunnelin kautta?',
    ],
    korostukset: ['John Radcliffe|John Radcliffen', 'James Gibbs|James Gibbs'],
    nappi: 'Vuonna 1873 rakennus on jo 124-vuotias osa Oxfordin arkea, kirjahyllyt täynnä '
      + 'tieteen kirjoja',
    // -1.2540 E / 51.7534 N — en-Wikipedia "Radcliffe Camera"
    laudat: {
      maailmankartta: { x: 5791.5, y: 1313.1 },
      europe: { x: 187.1, y: 532.5 },
    },
    teksti: 'Radcliffe Camera on Oxfordin yliopiston pyöreä kirjastorakennus, jonka James '
      + 'Gibbs suunnitteli barokkityyliin ja joka valmistui vuosina 1737–1749. Rakennus '
      + 'rahoitettiin lääkäri John Radcliffen jäämistöstä: hän testamenttasi kuollessaan '
      + '1714 40 000 puntaa kirjaston rakentamiseen, mutta kirjasto ehti valmistua vasta 35 '
      + 'vuotta myöhemmin. Pyöreä muoto ja sijainti Oxfordin keskellä, Vanhan '
      + 'Bodleian-kirjaston ja Pyhän Marian kirkon välissä, ovat tehneet siitä yliopiston '
      + 'tunnetuimman maamerkin. Nykyään rakennus toimii Bodleian-kirjaston lukusalina eikä '
      + 'ole avoinna yleisölle, ja sinne pääsee maanalaista tunnelia pitkin varsinaisesta '
      + 'kirjastosta.',
    lahde: 'en-Wikipedia "Radcliffe Camera", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
    visa: {
      kysymys: 'Miten Radcliffe Cameraan pääsee nykyään, kun se ei ole avoinna yleisölle?',
      vaihtoehdot: [
        'Erillisen sisäänkäynnin kautta pihalta',
        'Tunnelia pitkin Bodleian-kirjastosta',
        'Vain oppailla varustetuilla kierroksilla',
        'Katolla olevan portaikon kautta',
      ],
      oikea: 1,
      fakta: 'Rakennus rahoitettiin lääkäri John Radcliffen jäämistöstä: hän testamenttasi '
        + 'kuollessaan 1714 40 000 puntaa kirjaston rakentamiseen.',
    },
  },
  {
    id: 'hahmotelma-fish-and-chips',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-fish-and-chips-710a8ff8.jpg',
      lyhyt: 'Paistettua kalaa ja ranskalaisia lautasella sitruunaviipaleen kera.',
      selite: 'Kultaisenruskea kalapala ja paksut ranskalaiset täyttävät valkoisen lautasen. '
        + 'Vierellä on sitruunalohko ja persiljaa koristeeksi.',
      lahde: 'Valokuva: Matthias Meckel, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Matthias Meckel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fish_and_chips_blackpool.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-fish-and-chips-efb3e88f.jpg',
        lyhyt: 'Fish and chips -annos vaahtomuovirasiassa rasvaisen käärepaperin päällä.',
        selite: 'Kalapala ja ranskalaiset on pakattu ottaen mukaan -rasiaan. Rasia lepää '
          + 'tahriintuneen käärepaperin päällä.',
        lahde: 'Valokuva: Gvjekoslav, Wikimedia Commons (CC0).',
        tekija: 'Gvjekoslav',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fish_and_Chips_Bath,_UK.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Fish and chips',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Ketkä toivat paistetun kalan perinteen Englantiin, ja milloin?',
      'Mitkä kaksi kauppaa mainitaan usein varhaisimpina fish and chips -kauppoina?',
    ],
    korostukset: ['Joseph Malin|Joseph Malinin', 'höyrytroolari|höyrytroolarit'],
    nappi: 'Ensimmäiset fish and chips -kaupat ovat avanneet ovensa vasta muutama vuosi '
      + 'sitten, 1860-luvulla',
    // -2.0429 E / 53.5089 N — en-Wikipedia "Fish and chips"
    laudat: {
      maailmankartta: { x: 5765.2, y: 1234.2 },
      europe: { x: 172, y: 486.3 },
    },
    teksti: 'Fish and chips eli paistettu kala ja ranskalaiset on Britannian tunnetuin '
      + 'pikaruoka, joka syntyi 1800-luvun Englannissa. Paistetun kalan perinteen toivat '
      + 'maahan Alankomaista muuttaneet portugalilais- ja espanjalaistaustaiset juutalaiset '
      + 'jo 1500-luvulta lähtien, ja Charles Dickens mainitsee "paistetun kalan varastot" '
      + 'Oliver Twist -romaanissaan 1838. Ensimmäiset varsinaiset fish and chips -kaupat '
      + 'avattiin 1860-luvulla: Lontoossa Joseph Malinin kauppa ja Lancashiren Mossleyssä '
      + 'John Leesin kauppa mainitaan usein varhaisimpina. Annos yleistyi nopeasti '
      + 'työväenluokan ruokana, kun höyrytroolarit toivat tuoretta kalaa Pohjanmereltä ja '
      + 'rautatiet kuljettivat sen nopeasti satamista teollisuuskaupunkeihin; vuoteen 1910 '
      + 'mennessä kauppoja oli jo yli 25 000.',
    lahde: 'en-Wikipedia "Fish and chips", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
    visa: {
      kysymys: 'Missä kaupungissa Joseph Malinin fish and chips -kauppa sijaitsi?',
      vaihtoehdot: ['Liverpool', 'Lontoo', 'Manchester', 'Glasgow'],
      oikea: 1,
      fakta: 'Fish and chips oli yksi harvoista ruoista, joita ei säännöstelty kummankaan '
        + 'maailmansodan aikana Britanniassa, mikä kasvatti sen suosiota entisestään.',
    },
  },
  {
    id: 'hahmotelma-afternoon-tea',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-afternoon-tea-690bc93a.jpg',
      lyhyt: 'Perinteinen teehuone Englannissa, hyllyllä rivi teekannuja.',
      selite: 'Keltaseinäisessä huoneessa vieraat istuvat pienten pöytien ääressä nauttimassa '
        + 'teetä. Katonrajassa on rivistö erilaisia posliinisia teekannuja.',
      lahde: "Valokuva: Anthony O'Neil, Wikimedia Commons (CC BY-SA 2.0).",
      tekija: "Anthony O'Neil",
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Afternoon_Tea_-_geograph.org.uk_-_4115260.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-afternoon-tea-6e9cb5f0.jpg',
        lyhyt: 'Kolmikerroksinen tarjoiluteline täynnä voileipiä, sconeja ja leivonnaisia.',
        selite: 'Alimmalla tasolla on pieniä voileipäkolmioita, keskellä scone hillon kera '
          + 'ja ylimmällä tasolla värikkäitä leivonnaisia. Edessä pöydällä on teekuppi ja '
          + 'musta teekannu.',
        lahde: 'Valokuva: Ji-Elle, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ji-Elle',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:London-Liberty-Afternoon_tea_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Iltapäivätee',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Kenen sanotaan keksineen iltapäiväteen tavan, ja miksi?',
      'Mihin yhteiskuntaluokkaan iltapäivätee levisi 1860–1870-luvuilla?',
    ],
    korostukset: ['Anna Russell|Anna Russellin', 'Bedfordin herttuatar|Bedfordin herttuattaren'],
    nappi: 'Iltapäivätee leviää parhaillaan, juuri vuonna 1873, aristokratiasta keskiluokan '
      + 'koteihin',
    // -0.6297 E / 51.9877 N — en-Wikipedia "Tea (meal)"
    laudat: {
      maailmankartta: { x: 5812.3, y: 1302.7 },
      europe: { x: 199.1, y: 526.3 },
    },
    teksti: 'Iltapäivätee eli afternoon tea on ateria, jossa teetä nautitaan kakkujen, '
      + 'sconien ja voileipien kera puolenpäivän ja illallisen välissä. Tapaa pidetään '
      + 'usein herttuatar Anna Russellin, Bedfordin herttuattaren, keksintönä 1830- tai '
      + '1840-luvulta: hänen kerrotaan tilanneen huoneeseensa teetä ja pientä purtavaa, '
      + 'koska aristokraattinen illallinen tarjoiltiin vasta kello puoli kahdeksan tai '
      + 'kahdeksan ja iltapäivä tuntui pitkältä ilman ruokaa. Anna Russell toimi kuningatar '
      + 'Viktorian hovineitona, mikä auttoi tavan leviämisessä yläluokan piireissä. Tapa '
      + 'levisi 1860- ja 1870-luvuilla myös keskiluokkaan, ja juuri tähän aikaan '
      + 'iltapäivätee vakiintui osaksi brittiläistä arkea sellaisena kuin se tunnetaan '
      + 'nykyään.',
    lahde: 'en-Wikipedia "Tea (meal)", osio "Popularisation" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-haggis',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-haggis-09ff7219.jpg',
      lyhyt: "Robert Burnsin syntymämökki, Burns Cottage, Alloway'ssa.",
      selite: 'Matala, olkikattoinen mökki reunustaa kylän katua. Mustalla kyltillä kerrotaan '
        + 'runoilija Robert Burnsin syntyneen ja kuolleen tässä talossa.',
      lahde: 'Valokuva: DeFacto, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'DeFacto',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Burns_Cottage_-_Alloway.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-haggis-974c02ee.jpg',
        lyhyt: 'Halkaistu haggis tarjolla vihannesten kera.',
        selite: 'Pyöreä, ruskea haggis on leikattu auki niin, että täyte näkyy. Vierellä on '
          + 'tuoretta salaattia ja pieni annos kastiketta.',
        lahde: 'Valokuva: Tess Watson, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Tess Watson',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Haggis_with_a_CC_license.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Haggis',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Minkä runon ansiosta haggiksesta tuli Skotlannin kansallisruoka?',
      'Missä Robert Burns syntyi, ja mikä paikka se on nykyään?',
    ],
    korostukset: ['Robert Burns|Robert Burnsin', 'neeps and tatties|neeps and tatties'],
    nappi: 'Burns Supper -illallisia on vietetty jo vuosikymmeniä; Burnsin syntymämökki on '
      + 'avoinna kävijöille',
    // -4.6403 E / 55.4526 N — en-Wikipedia "Burns Cottage"
    laudat: {
      maailmankartta: { x: 5678.7, y: 1144.8 },
      europe: { x: 122.1, y: 435.2 },
    },
    teksti: 'Haggis on skotlantilainen makkarapata, joka valmistetaan lampaan sisäelimistä, '
      + 'sipulista, kaurasuurimoista, munuaisrasvasta ja mausteista sekoitettuna '
      + 'lihalientä, ja perinteisesti se kypsennetään eläimen omassa mahalaukussa. '
      + 'Ensimmäiset kirjatut reseptit ovat 1400-luvulta Englannista, mutta '
      + 'nykyisenkaltainen resepti vakiintui Skotlannissa, ja siitä tuli maan kansallisruoka '
      + 'erityisesti runoilija Robert Burnsin vuonna 1786 kirjoittaman runon Address to a '
      + 'Haggis ansiosta. Burns syntyi Ayrshiren Allowayssa savi- ja olkikattoisessa '
      + 'mökissä, joka on nykyään osa Robert Burns Birthplace Museumia. Haggista '
      + 'tarjoillaan perinteisesti neeps and tatties -lantun ja perunasoseen sekä '
      + 'viskiryypyn kanssa, varsinkin tammikuisissa Burns Supper -illallisissa, joita '
      + 'vietetään joka vuosi runoilijan kunniaksi.',
    lahde: 'en-Wikipedia "Haggis" ja "Burns Cottage", johdanto-osat (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-stockton-darlington',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-stockton-darlington-f1532c31.jpg',
      lyhyt: 'Veturi Locomotion No. 1 näytteillä Darlingtonin rautatiemuseossa.',
      selite: 'Musta, korkeapiippuinen höyryveturi seisoo museohallissa vanhojen '
        + 'asemakylttien alla. Sen rinnalla on matala hiilivaunu.',
      lahde: 'Valokuva: Kim Traynor, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kim Traynor',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Locomotion_No.1,_Darlington.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-stockton-darlington-67d93dc5.jpg',
        lyhyt: 'Aikalaismaalaus Stockton ja Darlingtonin rautatien avajaisista vuonna 1825.',
        selite: 'Pitkä avovaunujuna ylittää kivisillan väkijoukon seuratessa maassa. '
          + 'Etualalla hevosvaunut ja kansaa kerääntyy tapahtuman ympärille.',
        lahde: 'Valokuva: John Dobbin, Wikimedia Commons (Public domain).',
        tekija: 'John Dobbin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:StocktonDarlingtonOpening.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Stockton ja Darlingtonin rautatie',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Minä päivänä Stockton ja Darlingtonin rautatie avattiin, ja mikä veturi veti '
        + 'avajaisjunaa?',
      'Mitä hiilelle tapahtui, kun se saatiin kuljetettua rautateitse satamaan?',
    ],
    korostukset: ['Locomotion No. 1|Locomotion No. 1:n', 'Stephenson|Stephensonin'],
    nappi: 'Rautatien 50-vuotisjuhlaa vietetään jo kahden vuoden kuluttua, 1875',
    // -1.5541 E / 54.5228 N — en-Wikipedia "Stockton and Darlington Railway"
    laudat: {
      maailmankartta: { x: 5781.5, y: 1187.8 },
      europe: { x: 181.4, y: 459.7 },
    },
    teksti: 'Stockton ja Darlingtonin rautatie oli maailman ensimmäinen yleinen rautatie, '
      + 'jolla käytettiin höyryvetureita, ja se avattiin virallisesti 27. syyskuuta 1825 '
      + 'Koillis-Englannissa. Linja yhdisti Shildonin lähellä sijainneet hiilikaivokset '
      + 'Darlingtoniin ja Stocktoniin, ja hiilen kuljetus laivoihin muuttui nopeasti '
      + 'tuottoisaksi liiketoiminnaksi. Avajaisjunaa veti George ja Robert Stephensonin '
      + 'rakentama veturi Locomotion No. 1:n, joka oli tilattu vuonna 1824 hintaan 550 '
      + 'puntaa; se oli ensimmäinen höyryveturi, joka veti matkustajajunaa yleisellä '
      + 'rautatiellä. Rautatien avaamisen 50-vuotisjuhlaa vietettiin vuonna 1875, ja '
      + 'avajaiset vahvistivat höyryrautateiden tehokkuuden koko maailmalle.',
    lahde: 'en-Wikipedia "Stockton and Darlington Railway" ja "Locomotion No. 1", '
      + 'johdanto-osat (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minkä nimisenä ensimmäinen höyryveturi kulki Stocktonin ja Darlingtonin '
        + 'rautatiellä?',
      vaihtoehdot: ['Rocket-veturi', 'Locomotion No. 1', 'Puffing Billy', 'Planet-veturi'],
      oikea: 1,
      fakta: 'Veturi oli alun perin nimeltään Active, ja se räjähti myöhemmin vuonna 1828 '
        + 'tappaen kuljettajansa – silti se korjattiin ja on nykyään näytteillä museossa.',
    },
  },
  {
    id: 'hahmotelma-watt-soho',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-watt-soho-247a8dc5.jpg',
      lyhyt: '1700-luvun kaiverrus Sohon manufaktuurista Birminghamin liepeillä.',
      selite: 'Pitkä, kolmikerroksinen tehdasrakennus näkyy avoimen nurmikentän takana. '
        + 'Kaiverruksen alla lukee rakennuksen nimi ja omistajien Boultonin ja Wattin '
        + 'nimet.',
      lahde: 'Valokuva: Wellcome Collection, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Tuntematon taiteilija (Wellcome Collection)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Soho_Manufactory,_near_Birmingham._Etching._Wellcome_V0006177.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-watt-soho-e4481790.jpg',
        lyhyt: 'James Wattin ensimmäinen lauhdutin, säilynyt esine museossa.',
        selite: 'Sylinterimäinen metalliesine lepää pöydällä puutaustaa vasten. Se on Wattin '
          + 'höyrykoneen kehityksen kannalta ratkaiseva erillinen lauhdutin.',
        lahde: 'Valokuva: Dr. Mirko Junge, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Dr. Mirko Junge',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Watts_First_Condenser.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Sohon manufaktuuri',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Ketkä kaksi miestä kehittivät Sohon manufaktuurilla mullistavan höyrykoneen?',
      'Mitä tehtaalla valmistettiin höyrykoneiden lisäksi?',
    ],
    korostukset: ['Matthew Boulton|Matthew Boulton', 'aurinko- ja planeettavaihde|aurinko- ja '
      + 'planeettavaihde'],
    nappi: 'Manufaktuuri on purettu jo kaksikymmentä vuotta sitten, 1853 – vuonna 1873 '
      + 'tontilla on vain asuintaloja',
    // -1.9188 E / 52.5183 N — en-Wikipedia "Soho Manufactory"
    laudat: {
      maailmankartta: { x: 5769.4, y: 1278.9 },
      europe: { x: 174.4, y: 512.4 },
    },
    teksti: 'Sohon manufaktuuri oli Birminghamin Sohossa toiminut tehdas, joka oli teollisen '
      + 'vallankumouksen alkuaikoina edelläkävijä liukuhihnamaisessa sarjatuotannossa. '
      + 'Matthew Boulton ja hänen liikekumppaninsa vuokrasivat tontin 1760-luvun alussa, ja '
      + 'uusi tehdasrakennus valmistui 1766; siellä valmistettiin muun muassa nappeja, '
      + 'solkia ja japannilaistyylisiä koriste-esineitä sekä myöhemmin hopeaesineitä. '
      + 'Vuonna 1782 tehtaaseen asennettiin ensimmäinen James Wattin suunnittelema '
      + 'höyrykone, jossa oli niin kutsuttu aurinko- ja planeettavaihde, ja paikalla toimi '
      + 'myös maailman ensimmäinen höyryvoimalla käyvä rahapaja. Boulton ja Watt '
      + 'kehittivät tehtaalla yhdessä höyrykoneen, joka mullisti teollisuuden '
      + 'voimanlähteet, mutta itse manufaktuurirakennus purettiin jo vuonna 1853.',
    lahde: 'en-Wikipedia "Soho Manufactory" ja "James Watt", johdanto-osat (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-isle-of-skye',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-isle-of-skye-0f4e67cc.jpg',
      lyhyt: 'Punaisen Cuillinin pyöreähköjä huippuja Skyen saarella.',
      selite: 'Kolme loivapiirteistä vuorenhuippua kohoaa ruskean kanervikon yllä. Taivas on '
        + 'pilvinen ja huiput hohtavat vaaleina auringonvalossa.',
      lahde: 'Valokuva: Ridiculopathy, Wikimedia Commons (CC0).',
      tekija: 'Ridiculopathy',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Red_Cuillin,_Isle_of_Skye,_Scotland_01.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-isle-of-skye-b13ac24a.jpg',
        lyhyt: 'Cuillinin vuoret siintävät sumuisina meren takana.',
        selite: 'Tummansiniset vuorenhuiput erottuvat vaaleaa taivasta vasten meren '
          + 'toisella puolen. Etualalla soratie kulkee nummimaisen rannikon halki.',
        lahde: 'Valokuva: Mike McBey, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Mike McBey',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Cuillin_Mountains_of_Skye_(51148080435).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Cuillin, Skye',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mistä kivilajeista Musta ja Punainen Cuillin koostuvat?',
      'Mikä on Cuillinin ja koko Skyen korkein huippu?',
    ],
    korostukset: ['Sgùrr Alasdair|Sgùrr Alasdair', 'gabro|gabrosta'],
    nappi: '1873-matkailija näkisi jo saman jylhän vuoristonäkymän – Skye avautui '
      + 'höyrylaivareiteille vasta hiljattain',
    // -6.2300 E / 57.2000 N — en-Wikipedia "Cuillin"
    laudat: {
      maailmankartta: { x: 5625.7, y: 1062.3 },
      europe: { x: 91.6, y: 389.2 },
    },
    teksti: 'Cuillin on Skyen saarella sijaitseva jylhien, kivisten vuorten jono, joka '
      + 'jakautuu tummempaan Mustaan Cuilliniin ja itäisempään, pyöreämpään Punaiseen '
      + 'Cuilliniin. Mustan Cuillinin huiput koostuvat karkeasta gabrosta, joka tarjoaa '
      + 'kiipeilijöille erinomaisen pidon, kun taas Punainen Cuillin on graniittia ja siksi '
      + 'loivempaa ja kasvipeitteisempää. Vuoriston korkein huippu, ja samalla koko Skyen '
      + 'korkein kohta, on Sgùrr Alasdair, 992 metriä merenpinnasta, ja pääharjanne kaartuu '
      + 'noin 14 kilometrin matkalla Loch Coruiskin ympärillä. Cuillinin jylhä kauneus on '
      + 'tehnyt siitä yhden Skotlannin tunnetuimmista maisemista, ja se on nimetty '
      + 'kansalliseksi maisema-alueeksi.',
    lahde: 'en-Wikipedia "Cuillin", johdanto-osa (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minkä järven ympäri Cuillinin pääharjanne kaartuu noin 14 kilometrin matkalla?',
      vaihtoehdot: ['Loch Ness', 'Loch Lomond', 'Loch Katrine', 'Loch Coruisk'],
      oikea: 3,
      fakta: 'Vuoriston korkein huippu, ja samalla koko Skyen korkein kohta, on Sgùrr '
        + 'Alasdair, 992 metriä merenpinnasta.',
    },
  },
  {
    id: 'hahmotelma-loch-lomond',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-loch-lomond-537c4e37.jpg',
      lyhyt: 'Loch Lomondin rauhallinen lahdenpoukama syksyisessä valossa.',
      selite: 'Kivinen ranta ja puustoiset niemekkeet reunustavat tyyntä vedenpintaa. '
        + 'Taustalla kohoavat loivat vaarat pilvien alla.',
      lahde: 'Valokuva: Daniel Kraft, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Daniel Kraft',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Loch_Lomond_panosphere_20211022.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-loch-lomond-21d09474.jpg',
        lyhyt: 'Hiekkaranta ja pilvien heijastus Loch Lomondin tyynessä vedessä.',
        selite: 'Vaalea hiekkaranta laskee tasaisesti veteen, jossa pilvet kuvastuvat kuin '
          + 'peilistä. Taustalla siintävät järveä ympäröivät vaarat.',
        lahde: 'Valokuva: Stephen McKay, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Stephen McKay',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Loch_Lomond_-_geograph.org.uk_-_2512167.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Loch Lomond',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mikä kansanlaulu on tehnyt Loch Lomondista tunnetun ympäri maailmaa?',
      'Mitä krannogit ovat, ja kuinka kauan alueella on asuttu?',
    ],
    korostukset: ['krannogi|krannogeja', 'Ben Lomond|Ben Lomond'],
    nappi: "Kansanlaulu \"The Bonnie Banks o' Loch Lomond\" on jo tuttu koko Britanniassa "
      + 'vuonna 1873',
    // -4.6300 E / 56.1000 N — en-Wikipedia "Loch Lomond"
    laudat: {
      maailmankartta: { x: 5679, y: 1114.4 },
      europe: { x: 122.3, y: 418.2 },
    },
    teksti: 'Loch Lomond on Skotlannin suurin järvi pinta-alaltaan ja sijaitsee Ylämaiden '
      + 'reunavyöhykkeellä, joka erottaa perinteisesti Skotlannin Ala- ja Ylämaat '
      + 'toisistaan. Järvi on noin 36 kilometriä pitkä ja yhdestä kahdeksaan kilometriä '
      + 'leveä, ja sen syvin kohta pohjoisosassa yltää lähes 190 metriin. Alueella on '
      + 'asuttu jo noin 5 000 vuotta, ja järvessä on useita keinotekoisia asumussaaria eli '
      + 'krannogeja; roomalaiset rakensivat lähistölle myös puolustuslinnoituksen 1. '
      + 'vuosisadalla. Järvi tunnetaan laajalti kansanlaulusta "The Bonnie Banks o\' Loch '
      + 'Lomond", ja sen rannalla kohoava Ben Lomond on Skotlannin eteläisin Munro-huippu.',
    lahde: 'en-Wikipedia "Loch Lomond", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-caernarfon',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-caernarfon-0c6bae77.jpg',
      lyhyt: 'Caernarfonin linna satamasta nähtynä matalan veden aikaan.',
      selite: 'Massiiviset harmaat tornit ja muurit kohoavat sataman yllä. Etualalla veneet '
        + 'lepäävät kuivuneessa satama-altaassa.',
      lahde: 'Valokuva: Herbert Ortner, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Herbert Ortner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Caernarfon_Castle_1994.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-caernarfon-4917c72a.jpg',
        lyhyt: 'Historiallinen valokuva lippulakanoiden ripustamisesta linnan torniin.',
        selite: 'Mustavalkoisessa kuvassa miehet kiinnittävät suuria lohikäärmekuvioisia '
          + 'lippukankaita linnan tornin ikkuna-aukkoihin. Kivimuurit ovat kuvan '
          + 'pääosassa.',
        lahde: 'Valokuva: Geoff Charles, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Geoff Charles',
        lahdeUrl: "https://commons.wikimedia.org/wiki/File:Queen_Eleanor's_Gate,_Caernarfon_Castle_(1574632).jpg",
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Caernarfonin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka aloitti Caernarfonin linnan rakentamisen kivestä, ja minä vuonna?',
      'Mitä roomalaista linnaketta linna muistuttaa tietoisesti muureillaan?',
    ],
    korostukset: ['Edvard I|Edvard I', 'investituura|investituura'],
    nappi: 'Linna on 1873 rapistunut mutta juuri korjausten kohteena; Walesin prinssin '
      + 'investituuraan on vielä 38 vuotta',
    // -4.2766 E / 53.1394 N — en-Wikipedia "Caernarfon Castle"
    laudat: {
      maailmankartta: { x: 5690.8, y: 1251 },
      europe: { x: 129.1, y: 496 },
    },
    teksti: 'Caernarfonin linna on Pohjois-Walesissa Gwyneddissä sijaitseva keskiaikainen '
      + 'linnoitus, jonka Englannin kuningas Edvard I aloitti rakentaa kivestä vuonna 1283 '
      + 'aiemman multa- ja pihalinnan paikalle. Linna ja sen ympärille perustettu kaupunki '
      + 'toimivat Pohjois-Walesin hallinnollisena keskuksena, minkä vuoksi linnoitus '
      + 'rakennettiin poikkeuksellisen suureksi ja sen muurit muistuttavat tietoisesti '
      + 'Konstantinopolin muureja – lähistöllä sijaitsi myös roomalainen Segontiumin '
      + 'linnake. Rakentaminen ja kaupunginmuurit maksoivat 20 000–25 000 puntaa ja '
      + 'kestivät vuoteen 1330 asti, mutta osa sisätiloista jäi silti koskaan '
      + 'valmistumatta. Linna rapistui vuosisatojen saatossa, ja valtio aloitti sen '
      + 'korjaukset vasta 1800-luvulla; Walesin prinssin virallinen kruunajaistilaisuus, '
      + 'investituura, pidettiin linnassa ensimmäistä kertaa vasta vuonna 1911.',
    lahde: 'en-Wikipedia "Caernarfon Castle", johdanto-osa ja osio "Background" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-dover-strait',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-dover-strait-c98ece4a.jpg',
      lyhyt: 'Doverin liitukalliot kohoavat jyrkkinä meren yllä.',
      selite: 'Valkoinen liitukallio nousee pystysuorana rannasta, ja sen juurella on kapea '
        + 'sorakivi-ranta. Meri jatkuu tasaisena horisonttiin asti.',
      lahde: 'Valokuva: kallerna, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'kallerna',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dover_White_Cliffs_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-dover-strait-efb5a389.jpg',
        lyhyt: 'Lauttasatama ja Doverin liitukalliot taustalla.',
        selite: 'Valkoiset kalliot reunustavat satamaa, jossa näkyy laitureita ja '
          + 'rakennuksia. Vesi on tyyni ja taivas on kirkas.',
        lahde: 'Valokuva: Gary Todd, Wikimedia Commons (CC0).',
        tekija: 'Gary Todd',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:White_Cliffs_of_Dover_and_Ferry_Dock_(9816088736).jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Doverin liiduvuoret',
    tyyppi: 'meri',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Kuinka korkeita Doverin liiduvuoret parhaimmillaan ovat, ja mistä ne ovat syntyneet?',
      'Kuka mainitsi liiduvuoret jo antiikin aikana, ja milloin?',
    ],
    korostukset: ['Doverin salmi|Doverin salmi', 'Julius Caesar|Julius Caesar'],
    nappi: 'Doverin satama on jo 1873 vilkas ylityspaikka Ranskaan – höyrylaivat lyhentävät '
      + 'matkan tunteihin',
    // 1.4000 E / 51.0000 N — en-Wikipedia "White Cliffs of Dover"
    laudat: {
      maailmankartta: { x: 5880, y: 1346.4 },
      europe: { x: 238.1, y: 552.3 },
    },
    teksti: 'Doverin liiduvuoret ovat Englannin kaakkoisrannikon liitukalliot, jotka '
      + 'kohoavat parhaimmillaan noin 110 metrin korkeuteen ja ulottuvat noin 13 '
      + 'kilometrin matkalle Doverin kaupungin molemmin puolin. Kalliot syntyivät '
      + 'liitukauden loppupuolella, kun mikroskooppisten levien kuorien jäänteet '
      + 'kerrostuivat meren pohjaan hitaasti, noin puoli millimetriä vuodessa, muodostaen '
      + 'lopulta satoja metrejä paksun liitukerroksen. Doverin salmi on kohta, jossa '
      + 'Britannia on lähimpänä Manner-Eurooppaa – vain noin 32 kilometrin päässä – ja '
      + 'selkeällä säällä kalliot näkyvät Ranskan rannikolle asti. Kalliot ovat toimineet '
      + 'luonnollisena puolustusmuurina vuosisatojen ajan, ja jo Julius Caesar mainitsi '
      + 'niiden vaikuttavan ulkonäön hyökätessään Britanniaan vuonna 55 eaa.',
    lahde: 'en-Wikipedia "White Cliffs of Dover", johdanto-osa ja osio "Location" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Kuinka leveä Doverin salmi enimmillään on Englannin ja Ranskan välillä?',
      vaihtoehdot: ['8 km', '20 km', '32 km', '60 km'],
      oikea: 2,
      fakta: 'Kalliot ovat samaa geologista muodostumaa kuin Normandian rannikon liitukalliot '
        + 'Ranskan puolella – ne olivat kerran yhtä ja samaa liitutasankoa.',
    },
  },
  {
    id: 'hahmotelma-york-minster',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-york-minster-a0b66d99.jpg',
      lyhyt: 'Yorkin tuomiokirkon länsijulkisivun mittolat ja ikkunakoristelu.',
      selite: 'Kivisiä hirviöhahmoja eli mittoloita kyyhöttää julkisivun kulmissa. Niiden '
        + 'välissä on koristeellinen goottilainen ikkuna-aihe.',
      lahde: 'Valokuva: Benjamin Smith, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Benjamin Smith',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:York_-_Minster_-_16.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-york-minster-f38e005a.jpg',
        lyhyt: 'Yorkin tuomiokirkon pääkäytävä ja holvikatto.',
        selite: 'Pitkä keskilaiva jatkuu kohti alttaria kultaisten holvikoristeiden alla. '
          + 'Penkkirivit reunustavat käytävää molemmin puolin.',
        lahde: 'Valokuva: Diliff, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Diliff',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:York_Minster_Nave_1,_Nth_Yorkshire,_UK_-_Diliff.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Yorkin tuomiokirkko',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kenet kastettiin ensimmäisessä, vuonna 627 rakennetussa puukirkossa Yorkissa?',
      'Mikä on itäikkunan erikoisuus maailman mittakaavassa?',
    ],
    korostukset: ['Viisi sisarta|Viisi sisarta', 'kuningas Edwin|kuningas Edwin'],
    nappi: 'Katedraali on vuonna 1873 jo lähes 450-vuotias nykyisessä muodossaan, '
      + 'keskiaikaiset lasit yhä paikoillaan',
    // -1.0819 E / 53.9623 N — en-Wikipedia "York Minster"
    laudat: {
      maailmankartta: { x: 5797.3, y: 1213.5 },
      europe: { x: 190.4, y: 474.4 },
    },
    teksti: 'Yorkin tuomiokirkko eli York Minster on Yorkin arkkipiispan istuinkirkko ja '
      + 'yksi Pohjois-Euroopan suurimmista goottilaisista katedraaleista. Ensimmäinen '
      + 'kirkko paikalla oli hätäisesti rakennettu puinen kappeli vuodelta 627, jossa '
      + 'kastettiin Northumbrian kuningas Edwin, ja Edwin aloitti pian tätä suuremman '
      + 'kivikirkon rakentamisen, joka valmistui 637. Nykyinen, valtaosin vuosina '
      + '1220–1472 rakennettu kirkko koostuu useista eri goottilaisista tyylivaiheista, ja '
      + 'se on säilyttänyt suurimman osan keskiaikaisista lasimaalauksistaan – itäikkuna '
      + 'on maailman laajin yhtenäinen keskiaikainen lasimaalaus. Pohjoisen poikkilaivan '
      + 'Viisi sisarta -ikkuna koostuu viidestä yli 16 metrin korkuisesta harmaasävyisestä '
      + 'lasi-ikkunasta ja on toinen kirkon tunnetuista nähtävyyksistä.',
    lahde: 'en-Wikipedia "York Minster", johdanto-osa ja osio "History" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-edinburgh-castle',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-edinburgh-castle-efdd8654.jpg',
      lyhyt: 'Edinburghin linnan portti ja muurit Esplanadilta nähtynä.',
      selite: 'Linnan punaruskea porttirakennus ja sitä ympäröivät muurit kohoavat kallion '
        + 'päällä. Etualalla kulkee tie linnan porttia kohti.',
      lahde: 'Valokuva: Daniel Kraft, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Daniel Kraft',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Edinburgh_Castle_from_Esplanade_20211019.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/gbr-nosto-edinburgh-castle-c1190385.jpg',
        lyhyt: 'Edinburghin linnan torneja, tykkejä ja Ison-Britannian lippu.',
        selite: 'Pyöreä torni ja vanhat tykit erottuvat linnan muurilla. Lippu liehuu '
          + 'tornin huipulla kirkasta taivasta vasten.',
        lahde: 'Valokuva: Peulle, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Peulle',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Edinburgh_Castle_dec.23_(2).jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Edinburghin linna',
    tyyppi: 'historia',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Mikä on Edinburghin linnan ja koko kaupungin vanhin säilynyt rakennus?',
      'Mitä varten Yhden Aikaan -tykinlaukaus alun perin ammuttiin, ja mistä vuodesta '
        + 'lähtien?',
    ],
    korostukset: ['Pyhän Margareetan kappeli|Pyhän Margareetan kappeli',
      'Yhden Aikaan -tykinlaukaus|Yhden Aikaan -tykinlaukaus'],
    nappi: 'Tykki on ampunut kello yhdeltä jo 12 vuoden ajan, vuodesta 1861 lähtien',
    // -3.1999 E / 55.9486 N — en-Wikipedia "Edinburgh Castle"
    laudat: {
      maailmankartta: { x: 5726.7, y: 1121.5 },
      europe: { x: 149.8, y: 422.2 },
    },
    teksti: 'Edinburghin linna seisoo Castle Rockilla, sammuneen tulivuoren kivisydämellä, '
      + 'jota on asutettu jo rautakaudelta lähtien; kuninkaallinen linna paikalla on ollut '
      + 'Malcolm III:n ajoista 1000-luvulta. Linna on toiminut vuosisatojen mittaan '
      + 'kuninkaallisena asuinpaikkana, asevarikkona, aarrekammiona, vankilana ja '
      + 'rahapajana, ja tutkimusten mukaan sitä on piiritetty 26 kertaa yli '
      + 'tuhatvuotisen historiansa aikana. Vanhin säilynyt rakennus on 1100-luvun alun '
      + 'Pyhän Margareetan kappeli, joka on samalla koko Edinburghin vanhin rakennus. '
      + 'Vuodesta 1861 lähtien linnasta on ammuttu joka päivä, sunnuntaita ja muutamaa '
      + 'juhlapäivää lukuun ottamatta, kello yhdeltä niin kutsuttu Yhden Aikaan '
      + '-tykinlaukaus, joka alun perin auttoi Leithin sataman laivoja tarkistamaan '
      + 'kellonsa.',
    lahde: 'en-Wikipedia "Edinburgh Castle", johdanto-osa ja osio "Mills Mount Battery" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Mitä varten Edinburghin linnan kello yhden tykinlaukaus alun perin '
        + 'ammuttiin?',
      vaihtoehdot: ['Merkiksi vartion vaihdosta', 'Ajan näyttämiseksi Leithin laivoille',
        'Juhlistamaan kuninkaallisia juhlia', 'Varoittamaan tulipalosta'],
      oikea: 1,
      fakta: 'Koska ääni kulkee valoa hitaammin, vuonna 1861 laadittiin erityinen kartta, '
        + 'joka näytti kuinka monta sekuntia myöhässä laukauksen ääni kuuluisi eri '
        + 'puolilla Edinburghia.',
    },
  },
];
