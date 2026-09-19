/*
 * TANSKAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan ja Alankomaiden jälkeen Tanska.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48 ja 51) =
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä muut EU-maiden pakat, viimeisimpänä Alankomaat
 * (js/packs/hahmotelma-nld.js): jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä en-Wikipedian artikkelista omin sanoin suomeksi
 * (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). PAATOKSET 51: noin joka kolmannella
 * nostolla on lisäksi `visa`-kenttä (kysymys, neljä vaihtoehtoa, oikea
 * indeksi, fakta) täsmälleen kuten kaupunkien täkynostoilla
 * (js/fokusnosto.js nostonVisa): vastaus löytyy noston omasta tekstistä.
 * Vuoden 1873 jälkeiset kohteet (kansallispuistot 2008 ja 2009,
 * Ladbyn laivahauta löytyy vasta 1930-luvulla, Samsøn energiasaari)
 * ovat mukana: teksti on nykytietoa ja `nappi` katsoo vuodesta 1873
 * eteenpäin tai sanoo rehellisesti, että kohde tulee vasta myöhemmin.
 *
 * MIKSI NÄMÄ KOHTEET: Tanskan pakissa (js/packs/maastokohteet-dnk.js) on
 * jo Møllehøj, Roskilden tuomiokirkko, Kronborg, Jellingin kivet, Ribe,
 * Trelleborg, Skagen, Frederiksborg, Storebæltin silta, Tollundin mies,
 * Egeskov, Møns Klint, Lindholm Høje ja Billund sekä hetki
 * Roskilden viikinkilaiva. Tämän pakin kohteet eivät toista niitä
 * (ei samoja id:itä eikä nimiä). Aarhus jätettiin pois (iso kaupunki
 * ilman yhtä kohdetta, Fablen päätös 19.9.2026) ja tilalle tuli Nyborgin
 * linna.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `dnk-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/dnk/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Kööpenhamina, Tanskan ainoa pelikaupunki) ulkopuolella,
 * lähin nosto (Lejre) yli 8 lautayksikön päässä kaupungista (raja
 * KAUPUNGIN_KOHDALLA_SADE on 7), ja js/fokuskohteet.js liittää rivit
 * KOHDE_MAAT.DNK:hon. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Tanskan fokuslehden rajaukseen
 * (`osuuLehteen`). Pelin karkea maailmankartta ei ulotu kaikkiin
 * saariin (Bornholm, Hammershus, Læsø, Samsø, Nyborg ja Ladby ovat
 * DNK-renkaan ulkopuolella); niiden koordinaatit ovat silti
 * Wikipedian todelliset.
 */

/** Tanskan hahmotelmanostot: sisällölliset kohteet kaupungin (Kööpenhamina) ulkopuolella. */
export const HAHMOTELMA_DNK = [
  {
    id: 'hahmotelma-rubjerg-knude',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-rubjerg-knude-24921644.jpg',
      lyhyt: 'Rubjerg Knuden majakka seisoo hiekkadyynien keskellä meren rannalla.',
      selite: 'Valkoinen majakkatorni ja sen ympärille kasautunut hiekka kesällä 2015. Hiekan '
        + 'liike ja rannikon eroosio ovat tämän paikan keskeisiä piirteitä.',
      lahde: 'Valokuva: Jörg Braukmann, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jörg Braukmann',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rubjerg_Knude_Fyr_2015.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-rubjerg-knude-b5c77b2f.jpg',
        lyhyt: 'Majakka ja aaltoileva hiekka iltahämärässä.',
        selite: 'Commonsin sivun mukaan majakka rakennettiin vuonna 1900. Kuvassa se erottuu '
          + 'vaaleanpunaisen ja violetin iltataivaan edessä, ja hiekkapinnalla näkyy '
          + 'tuulen tekemiä poimuja.',
        lahde: 'Valokuva: Ansgar Koreng, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ansgar Koreng',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rubjerg_Knude_Fyr,_Hj%C3%B8rring,_Denmark,_1807072231,_ako.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-rubjerg-knude-0838bc48.jpg',
        lyhyt: 'Hiekan peittämän sivurakennuksen tuettu katto.',
        selite: 'Majakan henkilökuntarakennus vuonna 2004: katto on tuettu puupuilla ja hiekka '
          + 'on kasautunut sen ympärille. Artikkelin mukaan hiekan paine vaurioitti pieniä '
          + 'rakennuksia pahoin.',
        lahde: 'Valokuva: Frmir, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Frmir',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rubjerg_Knude_Fyr_sidebygning_2004.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Rubjerg Knude',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Miksi Rubjerg Knuden majakka jouduttiin siirtämään kauemmas rannasta?',
      'Miten 720 tonnia painava majakkatorni saatiin siirrettyä 70 metriä sisämaahan?',
    ],
    korostukset: ['Lønstrup Klint|Lønstrup Klintin', 'eroosio|eroosio'],
    nappi: 'Majakkaa ei vielä ollut: rakennustyöt alkoivat vasta 1899 ja valo syttyi 1900',
    // 9.7743 E / 57.4489 N — en-Wikipedia "Rubjerg Knude Lighthouse"
    laudat: {
      maailmankartta: { x: 6159.1, y: 1050.4 },
      europe: { x: 398.9, y: 382.7 },
    },
    teksti: 'Rubjerg Knude on majakka Pohjanmeren rannikolla Pohjois-Jyllannissa, Lønstrup '
      + 'Klintin kallion päällä 60 metriä merenpinnan yläpuolella. Rakennustyöt alkoivat '
      + 'vuonna 1899, ja majakan valo syttyi ensimmäisen kerran 27. joulukuuta 1900. '
      + 'Alueella liikkuva hiekka ja rannikon eroosio ovat vakava ongelma, sillä '
      + 'rantaviiva syöpyy keskimäärin 1,5 metriä vuodessa. Hiekka pakotti hylkäämään '
      + 'majakan viereiset rakennukset vuonna 2002, ja vuonna 2019 majakkatorni '
      + 'siirrettiin 70 metriä kauemmas rannasta erityisesti rakennettuja kiskoja pitkin. '
      + 'Siirron ansiosta torni säilyy odotusten mukaan ainakin noin vuoteen 2060.',
    lahde: 'en-Wikipedia "Rubjerg Knude Lighthouse", johdanto-osa ja osio "Description and '
      + 'history" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-raabjerg-mile',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-raabjerg-mile-f2a12cc2.jpg',
      lyhyt: 'Paljas hiekkadyyni kohoaa havumetsän yläpuolelle.',
      selite: 'Vaalea, tuulen muotoilema hiekka-alue ja etualalla dyyniheinää; taustalla tumma '
        + 'metsä. Kuva on vuodelta 2018.',
      lahde: 'Valokuva: Ragnar1904, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ragnar1904',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:R%C3%A5bjerg_Mile_(44).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-raabjerg-mile-09db629a.jpg',
        lyhyt: 'Tuuli on piirtänyt hiekkaan aaltomaisia poimuja.',
        selite: 'Dyynin rinne ja sen harjalla kasvava heinä. Kuva vuodelta 2018 näyttää, miten '
          + 'liikkuva hiekka muotoutuu tuulessa.',
        lahde: 'Valokuva: Ragnar1904, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ragnar1904',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:R%C3%A5bjerg_Mile_(69).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-raabjerg-mile-63ba2fbc.jpg',
        lyhyt: 'Hiekan peittämän kirkon valkoinen torni.',
        selite: 'Torni on jäljellä kirkosta, jonka hiekka peitti 1700-luvulla. Commonsin sivun '
          + 'mukaan kuva on Skagenista; kirkko on artikkelissa esimerkki liikkuvan hiekan '
          + 'voimasta.',
        lahde: 'Valokuva: Tomasz Sienicki, Wikimedia Commons (CC BY 2.5).',
        tekija: 'Tomasz Sienicki',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Den_tilsandede_kirke_i_Skagen_2007_ubt.jpeg',
        lisenssi: 'CC BY 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
      },
    ],
    nimi: 'Råbjerg Mile',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Råbjerg Mile jätettiin tarkoituksella liikkumaan, vaikka muut dyynit pysäytettiin?',
      'Mitä tapahtui kirkolle, jonka hiekka peitti lähes kokonaan?',
    ],
    korostukset: ['Skagerrak|Skagerrakia', 'dyyni|dyyni'],
    nappi: 'Dyyni vaelsi jo silloin; valtio osti sen keskiosan vasta vuonna 1900',
    // 10.4061 E / 57.6481 N — en-Wikipedia "Råbjerg Mile"
    laudat: {
      maailmankartta: { x: 6180.2, y: 1040.8 },
      europe: { x: 411, y: 377.5 },
    },
    teksti: 'Råbjerg Mile on Skagenin ja Frederikshavnin välissä sijaitseva rannikkodyyni, '
      + 'joka vaeltaa tuulen mukana. Se on Pohjois-Euroopan suurin liikkuva dyyni: sen '
      + 'pinta-ala on noin kaksi neliökilometriä ja korkeus noin 40 metriä. Tuuli työntää '
      + 'sitä koilliseen enimmillään 18 metriä vuodessa, ja se jättää taakseen matalan, '
      + 'kostean hiekkakaistan kohti Skagerrakia, jossa se syntyi yli 300 vuotta sitten. '
      + 'Vaeltavat dyynit ajoivat Pohjois-Jyllannin asukkaita pois rannikolta, ja '
      + '1300-luvun lopulla rakennetun kirkon hiekka peitti lähes kokonaan; kirkko '
      + 'hylättiin 1795, ja jäljellä on vain torni. Useimmat dyynit pysäytettiin '
      + 'istuttamalla, mutta Råbjerg Mile jätettiin liikkumaan, jotta tulevat sukupolvet '
      + 'ymmärtäisivät ongelman.',
    lahde: 'en-Wikipedia "Råbjerg Mile", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Kuinka paljon tuuli työntää Råbjerg Milea koilliseen enimmillään vuodessa?',
      vaihtoehdot: [
        'Noin 3 metriä',
        'Noin 18 metriä',
        'Noin 60 metriä',
        'Noin 150 metriä',
      ],
      oikea: 1,
      fakta: 'Dyynissä on yhteensä noin neljä miljoonaa kuutiometriä hiekkaa. Alue on myös '
        + 'kansainvälisesti tärkeä muuttavien petolintujen levähdyspaikka, ja siellä '
        + 'pesivät muun muassa kapustarinta ja liro.',
    },
  },
  {
    id: 'hahmotelma-romo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-romo-bfc374b1.jpg',
      lyhyt: 'Leveä hiekkaranta ja pilvinen taivas Rømøllä.',
      selite: 'Tasainen ranta ja dyyniheinää sen takana; kaksi pyöräilijää etualalla antaa '
        + 'mittakaavaa. Kuva on otettu kesällä 2021.',
      lahde: 'Valokuva: TEkman73, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'TEkman73',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Beach_om_R%C3%B8m%C3%B8.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-romo-3b6ab93b.jpg',
        lyhyt: 'Ruokokattoinen tiilirakennus Kommandørgårdin tilalla.',
        selite: 'Kommandørgården-tilan rakennus lännestä kuvattuna vuonna 2023. Artikkelin '
          + 'mukaan tilan talo on vuodelta 1770 ja ladon sekä tallin rakennukset vuodelta '
          + '1744.',
        lahde: 'Valokuva: Hjart, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hjart',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kommand%C3%B8rg%C3%A5rden_2023_SV.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-romo-2757ae52.jpg',
        lyhyt: 'Valkoinen Pyhän Klemensin kirkko ja sen hautausmaa.',
        selite: 'Sankt Clemens Kirke on saaren pääkirkko. Artikkelin mukaan 1800-luvulla '
          + 'kirkosta sai ostaa penkkien nimikylttejä, ja Maerskin perustajan isoisän nimi '
          + 'näkyy yhä yhdessä etupenkeistä.',
        lahde: 'Valokuva: Mojnsen, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Mojnsen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sankt_Clemens_Kirke_R%C3%B8m%C3%B8_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Rømø',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi Kommandørgårdin museossa on valaan luuranko?',
      'Mitä tapahtui vuonna 1920, kun Rømø palasi Tanskalle?',
    ],
    korostukset: ['Jordsand|Jordsand', 'Kommandørgård|Kommandørgårdin'],
    nappi: 'Vuoden 1864 sodan jälkeen saari kuului Preussille; Tanskaan se palasi vasta '
      + 'vuonna 1920',
    // 8.5167 E / 55.1333 N — en-Wikipedia "Rømø"
    laudat: {
      maailmankartta: { x: 6117.2, y: 1159.6 },
      europe: { x: 374.7, y: 443.6 },
    },
    teksti: 'Rømø on Tanskan eteläisin Vatimeren saarista; tämän aseman piti aiemmin pieni '
      + 'asumaton Jordsand, joka upposi vuonna 1999. Saaren pinta-ala on 129 '
      + 'neliökilometriä. Se on yhdistetty mantereeseen penkereellä kulkevalla tiellä, ja '
      + 'saksalainen Sylt-saari on vain noin kolmen kilometrin päässä. Kommandørgårdin '
      + 'museossa on valaanpyyntiin liittyviä esineitä ja valaan luuranko; sana kommandør '
      + 'tarkoitti aikoinaan valaanpyyntialuksen kapteenia. Vuoden 1864 sodan jälkeen alue '
      + 'siirtyi Preussille ja myöhemmin Saksan keisarikunnalle, ja Rømø palasi Tanskalle '
      + 'vasta vuonna 1920 kansanäänestyksen jälkeen. Saarella syntyi vuonna 1836 myös '
      + 'merikapteeni Peter Mærsk Møller, jonka poika perusti Maersk-laivayhtiön.',
    lahde: 'en-Wikipedia "Rømø", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-thy',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-thy-cae4a3f5.jpg',
      lyhyt: 'Pohjanmeren aallot ja ruohoiset dyynit Nørre Vorupørin rannikolla.',
      selite: 'Kuva on otettu Nørre Vorupørin lähellä Tanskan Pohjanmeren rannikolla vuonna '
        + '2012. Tuulinen ranta ja dyynit ovat Thyn maiseman ydintä.',
      lahde: 'Valokuva: Slaunger, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Slaunger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:N%C3%B8rre_Vorup%C3%B8r_Coast_2012-11-18.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-thy-be8b379f.jpg',
        lyhyt: 'Laaja nummi Hanstholmin riistansuojelualueella.',
        selite: 'Avoin hiekkanummi pienine puroineen Hanstholmin riistansuojelualueella. '
          + 'Artikkelin mukaan Hanstholm Vildtreservat on Tanskan suurin yhtenäinen '
          + 'hiekkanummi.',
        lahde: 'Valokuva: Ragnar1904, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ragnar1904',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hanstholm_Wildreservat_(3).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-thy-e67379ce.jpg',
        lyhyt: 'Ruohon peittämiä dyynejä ja havuistutuksia järven rannalla.',
        selite: 'Commonsin sivun mukaan näkymä on dyyninummien yli Hanstholm Vildtreservatin '
          + 'ja Tved klitplantagen suuntaan. Havuistutukset ovat osa Thyn hiekan '
          + 'pysäyttämiseksi tehtyä työtä.',
        lahde: 'Valokuva: Jens Nielsen, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Jens Nielsen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Thy_Nationalpark.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Thyn kansallispuisto',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Thyn dyynialueille alettiin istuttaa heinää ja puita noin vuonna 1800?',
      'Mikä tekee Hanstholmin riistansuojelualueesta erityisen Tanskassa?',
    ],
    korostukset: ['Hanstholm Vildtreservat|Hanstholm Vildtreservat', 'Agger Tange|Agger Tangen'],
    nappi: 'Puisto avattiin vasta vuonna 2008; vuonna 1873 hiekkaa vastaan taisteltiin vielä '
      + 'istutuksin',
    // 8.422 E / 56.947 N — en-Wikipedia "Thy National Park"
    laudat: {
      maailmankartta: { x: 6114.1, y: 1074.4 },
      europe: { x: 372.9, y: 395.9 },
    },
    teksti: 'Thyn kansallispuisto avattiin yleisölle 22. elokuuta 2008 Luoteis-Jyllannissa, '
      + 'Hanstholmin ja Agger Tangen välisellä rannikolla. Se on noin 55 kilometriä pitkä '
      + 'ja 244 neliökilometrin laajuinen, ja se valittiin vuonna 2007 Tanskan varsinaisen '
      + 'alueen ensimmäiseksi kansallispuistoksi. Maisemaa hallitsevat tuuliset rannat, '
      + 'dyynit ja nummet sekä istutetut havumetsät. Liikkuva hiekka vaivasi asukkaita '
      + 'vuosisatoja, ja vasta noin vuonna 1800 alettiin järjestelmällisesti istuttaa '
      + 'dyyniheinää ja havupuita sen pysäyttämiseksi; onnistuminen kesti yli sata vuotta. '
      + 'Puiston pohjoisosan Hanstholm Vildtreservat on Tanskan suurin yhtenäinen '
      + 'hiekkanummi.',
    lahde: 'en-Wikipedia "Thy National Park", johdanto-osa ja osio "Nature" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-mols-bjerge',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-mols-bjerge-255fd8c4.jpg',
      lyhyt: 'Kanervan peittämä kumpuileva maisema Trehøjen lähellä.',
      selite: 'Näkymä Trehøjen suuntaan Mols Bjergen kansallispuistossa; etualalla kukkivaa '
        + 'kanervaa ja taustalla kumpuja. Kuva on otettu elokuussa 2015.',
      lahde: 'Valokuva: Mikkel Houmøller, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Mikkel Houmøller',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Treh%C3%B8je_Mols_Bjerge.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-mols-bjerge-b60b12ea.jpg',
        lyhyt: 'Ruokokattoinen ristikkorakenteinen vesimylly lammen rannalla.',
        selite: 'Ørnbjerg Mølle on artikkelin mukaan puiston ainoa toimiva vesimylly, jota '
          + 'ylläpitää vapaaehtoisten ryhmä. Kuva on vuodelta 2013.',
        lahde: 'Valokuva: Sebastian Nils, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Sebastian Nils',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C3%98rnbjerg_M%C3%B8lle.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-mols-bjerge-8e9d3913.jpg',
        lyhyt: 'Kalø-linnan rauniot ja kivetty keskiaikainen tie.',
        selite: 'Polku linnan raunioille kulkee pitkin kivetyn penkereen tietä. Artikkelin '
          + 'mukaan matkasta noin 500 metriä on keskiaikaista tietä.',
        lahde: 'Valokuva: Ajepbah, Wikimedia Commons (CC BY-SA 3.0 de).',
        tekija: 'Ajepbah',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kal%C3%B8_Slotsruin_(Syddjurs_Kommune).Bro_og_forsvarst%C3%A5rn.2.125359.ajb.jpg',
        lisenssi: 'CC BY-SA 3.0 de',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
      },
    ],
    nimi: 'Mols Bjerge',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Molsin maasto on niin kumpuilevaa ja monimuotoista?',
      'Mitä muinaisia jälkiä Molsin maastosta löytyy?',
    ],
    korostukset: ['Kalø|Kalø-linnan', 'Ørnbjerg Mølle|Ørnbjerg Mølle'],
    nappi: 'Puisto vihittiin vasta 2009, mutta Ørnbjergin myllyn nykyiset rakennukset olivat '
      + 'jo 40 vuotta vanhat',
    // 10.5125 E / 56.2075 N — en-Wikipedia "Mols Bjerge National Park"
    laudat: {
      maailmankartta: { x: 6183.8, y: 1109.4 },
      europe: { x: 413, y: 415.3 },
    },
    teksti: 'Mols Bjerge on Djurslandin niemimaalla Keski-Jyllannissa sijaitseva '
      + 'kansallispuisto, jonka kuningatar Margrethe II vihki 29. elokuuta 2009; se oli '
      + 'Tanskan toinen kansallispuisto. Puisto kattaa 180 neliökilometriä, ja sen '
      + 'kumpuileva, monimuotoinen maasto syntyi viime jääkauden lopulla. Molsin kukkulat '
      + 'nousevat enimmillään 137 metriin, ja alueelta on löydetty yli puolet Tanskan '
      + 'luonnonvaraisista kasvilajeista. Maisemassa näkyy myös menneisyyttä: kivikauden '
      + 'hautakumpuja ja dolmeneja sekä 1300-luvun alussa rakennetun Kalø-linnan rauniot '
      + 'pienellä saarella. Ørnbjerg Mølle on puiston ainoa toimiva vesimylly; nykyiset '
      + 'rakennukset ovat vuodelta 1833, mutta paikalla on ollut mylly jo 1500-luvulta.',
    lahde: 'en-Wikipedia "Mols Bjerge National Park", johdanto-osa ja osio "Attractions" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-himmelbjerget',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-himmelbjerget-d07a0715.jpg',
      lyhyt: 'Näkymä Himmelbjergetiltä Julsø-järvelle ja ympäröiville metsille.',
      selite: 'Kukkulan huipulta avautuu laaja näkymä Julsø-järvelle. Maisemien ihailu on '
        + 'ollut yksi syy siihen, että alueella on kokoonnuttu jo yli kahden vuosisadan '
        + 'ajan.',
      lahde: 'Valokuva: Colin, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Colin',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Juls%C3%B8_from_Himmelbjerget_2017-08-19_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-himmelbjerget-5399a8f5.jpg',
        lyhyt: 'Punatiilinen torni Himmelbjergetin huipulla.',
        selite: 'Torni valmistui vuonna 1875 kuningas Frederik VII:n kunniaksi. Se kohoaa 25,1 '
          + 'metrin korkeuteen kukkulan laella.',
        lahde: 'Valokuva: Askeuhd, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Askeuhd',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_tower_at_Himmelbjerget.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-himmelbjerget-206a86db.jpg',
        lyhyt: 'Himmelbjerget ja Julsø-järvi Ole Jørgen Rawertin akvarellissa vuodelta 1821.',
        selite: 'Akvarelli esittää kukkulaa ja järveä ajalta ennen tornin rakentamista. Sen on '
          + 'maalannut Ole Jørgen Rawert heinäkuussa 1821.',
        lahde: 'Valokuva: Ole Jørgen Rawert, Wikimedia Commons (Public domain).',
        tekija: 'Ole Jørgen Rawert',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ole_J%C3%B8rgen_Rawert_-_Himmelbjerget_og_Juul_S%C3%B6e,_ved_Skanderborg_d_3_July_1821._No._27_RA000510.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Himmelbjerget',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Himmelbjerget ei enää olekaan Tanskan korkein kohta?',
      'Mitä ihmiset tekivät kukkulalla 1800-luvulla ja miksi sinne rakennettiin torni?',
    ],
    korostukset: ['Møllehøj|Møllehøj', 'Frederik VII|Frederik VII'],
    nappi: 'Kansanjuhlien kukkula, jonka torni rakennetaan vasta vuonna 1875',
    // 9.6851 E / 56.1052 N — en-Wikipedia "Himmelbjerget"
    laudat: {
      maailmankartta: { x: 6156.2, y: 1114.2 },
      europe: { x: 397.2, y: 418 },
    },
    teksti: 'Himmelbjerget on 147 metriä korkea kukkula Ryn ja Silkeborgin välissä '
      + 'Søhøjlandetin järviseudulla. Sitä pidettiin Tanskan korkeimpana luonnonpisteenä '
      + 'vuoteen 1847, jolloin Ejer Bavnehøj mitattiin korkeammaksi; vuoden 2005 '
      + 'tutkimuksen jälkeen korkeimmaksi todettiin Møllehøj (170,86 m). Kukkulan rinne on '
      + 'silti tanskalaisittain vaikuttava, sillä Julsø-järven pinnasta huipulle on 121 '
      + 'metriä. Yli kaksisataa vuotta ihmiset ovat kokoontuneet täällä ihailemaan '
      + 'maisemia ja juhlimaan tanskalaisen kansakunnan syntyä. Huipulle rakennettiin '
      + 'vuonna 1875 punatiilinen torni kuningas Frederik VII:n kunniaksi, koska hän antoi '
      + 'maalle sen ensimmäisen perustuslain vuonna 1849.',
    lahde: 'en-Wikipedia "Himmelbjerget", johdanto-osa ja osio "Height and prominence" ja '
      + '"Historic importance" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kenen kunniaksi Himmelbjergetin huipulle rakennettu punatiilinen torni '
        + 'pystytettiin?',
      vaihtoehdot: [
        'Kuningas Christian IV',
        'Kuningas Christian IX',
        'Kuningas Frederik VII',
        'Kuningas Valdemar Voittoisa',
      ],
      oikea: 2,
      fakta: 'Lähellä huippua on muitakin muistomerkkejä, ja yksi niistä muistuttaa naisten '
        + 'äänioikeudesta vuonna 1915. Silkeborgista kulkee kukkulan juurelle yhä '
        + 'historiallinen höyrylaiva Hjejlen.',
    },
  },
  {
    id: 'hahmotelma-laeso',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-laeso-951fd612.jpg',
      lyhyt: 'Læsølainen talo, jonka katto on tehty meriajokkaasta.',
      selite: 'Perinteinen Læsøn talo, jonka paksu katto on tehty meriajokkaasta. Katot '
        + 'yleistyivät 1600-luvulta lähtien, kun muuta kattomateriaalia oli vähän.',
      lahde: 'Valokuva: Tomasz Sienicki, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Tomasz Sienicki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tangtag_paa_Laesoe_2011_ubt-026.JPG',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-laeso-6b77eca4.jpg',
        lyhyt: 'Suola kuivumassa koreissa Læsøn suolakeittämössä.',
        selite: 'Korit täynnä suolaa Læsøn suolakeittämössä. Suolan valmistus aloitettiin '
          + 'saarella uudelleen 1980-luvun lopulla pienessä mittakaavassa.',
        lahde: 'Valokuva: Northerner, Wikimedia Commons (CC0).',
        tekija: 'Northerner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:L%C3%A6s%C3%B8_salt_drying_in_baskets.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-laeso-b5adf3bb.jpg',
        lyhyt: 'Meriajokaskattoinen talo Læsøllä Martinus Rørbyen piirroksessa vuodelta 1847.',
        selite: 'Piirros esittää Vesterbyn tähystyspaikkaa Læsøllä: meriajokkaalla katettua '
          + 'taloa, jonka edessä on kaivo ja katolla tähystäjä kaukoputken kanssa.',
        lahde: 'Valokuva: Martinus Rørbye, Wikimedia Commons (Public domain).',
        tekija: 'Martinus Rørbye',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Martinus_R%C3%B8rbye_-_Vesterbys_observatorium_p%C3%A5_L%C3%A6s%C3%B8_-_1847.jpeg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Læsø',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi Læsøn suolateollisuus lopulta loppui?',
      'Miksi saaren talojen katot tehtiin merikasveista?',
    ],
    korostukset: ['Hlér|Hlérin', 'meriajokas|meriajokkaalla'],
    nappi: 'Entinen suolasaari, jonka talot oli 1600-luvulta asti katettu meriajokkaalla',
    // 11 E / 57.26 N — en-Wikipedia "Læsø"
    laudat: {
      maailmankartta: { x: 6200, y: 1059.4 },
      europe: { x: 422.4, y: 387.7 },
    },
    teksti: 'Læsø on Kattegatin suurin saari, noin 19 kilometrin päässä Jyllannin '
      + 'koillisrannikosta. Nimi juontuu muinaisnorjan sanasta Hlésey eli Hlérin saari, ja '
      + 'Hlér on norjalaisessa mytologiassa meren henkilöitymänä esiintyvä jättiläinen. '
      + 'Keskiajalla saari tunnettiin suolateollisuudestaan: pohjavesi voi olla yli '
      + '15-prosenttisen suolaista, ja kuumina kesinä suola väkevöityi luontaisesti '
      + 'tasaisilla suoniityillä. Lopullinen keittäminen tehtiin sadoissa suolauuneissa, '
      + 'jotka söivät valtavasti puuta. Lopulta saari jäi ilman metsää, hiekkamyrskyt '
      + 'hautasivat kyliä ja suolan otto kiellettiin. Kattomateriaalin puutteen vuoksi '
      + 'taloja alettiin 1600-luvulta lähtien peittää meriajokkaalla.',
    lahde: 'en-Wikipedia "Læsø", johdanto-osa ja osio "Name and Norse mythology" ja "Climate, '
      + 'industry, and wildlife" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi Læsøn talojen katot alettiin tehdä meriajokkaasta?',
      vaihtoehdot: [
        'Suolan keitto oli syönyt puut, joten kattoaineista oli pulaa',
        'Meriajokas kestää myrskyjä paremmin kuin savi- ja olkikatot',
        'Kuninkaan käsky velvoitti käyttämään vain saaren omaa raaka-ainetta',
        'Suolapitoinen ajokas suojasi talot tulipaloilta ja hiekalta',
      ],
      oikea: 0,
      fakta: 'Læsø kuuluu Tanskan \'aavikkovyöhykkeeseen\': kesällä sataa niin vähän, että '
        + 'purot ja lammet osittain kuivuvat. Suolan valmistus aloitettiin uudelleen '
        + 'pienessä mittakaavassa 1980-luvun lopulla arkeologisena kokeiluna ja '
        + 'matkailunähtävyytenä.',
    },
  },
  {
    id: 'hahmotelma-bornholm',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-bornholm-b0f07d66.jpg',
      lyhyt: 'Rosoinen kalliorannikko Helligdomsklipperne Bornholmin koillisrannalla.',
      selite: 'Kallioita Helligdomsklipperne-nimisellä rannikolla Bornholmilla. Artikkeli '
        + 'mainitsee sen yhtenä saaren jyrkkien merikallioiden nähtävyyksistä.',
      lahde: 'Valokuva: Klugschnacker, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Klugschnacker',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Heligdomsklipperne,_Bornholm_(2012-07-11),_by_Klugschnacker_in_Wikipedia_(13).JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-bornholm-af82a786.jpg',
        lyhyt: 'Østerlarsin pyöreä kirkko, yksi Bornholmin keskiaikaisista pyöreistä '
          + 'kirkoista.',
        selite: 'Valkoinen pyöreä kirkko, jossa on kartiomainen katto. Bornholmilla on neljä '
          + 'keskiaikaista pyöreää kirkkoa.',
        lahde: 'Valokuva: Richardmaackphotography, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Richardmaackphotography',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Denmark,_Bornholm,_%C3%98sterlars_Round_Church_150422-4.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-bornholm-34bae1f1.jpg',
        lyhyt: 'Keltaisen jäkälän peittämiä kallioita Itämeren rannalla Nexøn lähellä.',
        selite: 'Jäkälän peittämiä kallioita Bornholmin rannikolla Nexøn lähellä. Kuva näyttää '
          + 'saaren kallioista luonnetta.',
        lahde: 'Valokuva: Socket0, Wikimedia Commons (CC0).',
        tekija: 'Socket0',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Yellow_rocks_on_the_Baltic.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Bornholm',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi Bornholmia kutsutaan sekä aurinkosaareksi että kalliosaareksi?',
      'Mitä saarella tapahtui vuonna 1658 ja miten se palasi Tanskalle?',
    ],
    korostukset: ['Bornholmin timantti|Bornholmin timantille', 'Hammershus|Hammershusin'],
    nappi: 'Itämeren kalliosaari, joka oli palannut Tanskalle ruotsalaisvallan jälkeen jo '
      + '1660',
    // 14.9167 E / 55.1333 N — en-Wikipedia "Bornholm"
    laudat: {
      maailmankartta: { x: 6330.6, y: 1159.6 },
      europe: { x: 497.6, y: 443.6 },
    },
    teksti: 'Bornholm on tanskalainen saari Itämerellä, muusta Tanskasta itään, Ruotsin '
      + 'eteläpuolella sekä Saksan ja Puolan pohjoispuolella. Sitä sanotaan '
      + 'aurinkosaareksi sään vuoksi ja kalliosaareksi geologian takia, sillä kallioperä '
      + 'on pääosin graniittia. Pohjoisessa jyrkät kalliomuodostelmat erottavat saaren '
      + 'muun Tanskan loivasta kumpumaastosta, ja lämmin ilmasto antaa kasvaa '
      + 'paikalliselle viikunalajikkeelle \'Bornholmin timantille\'. Saarella on useita '
      + 'Tanskan pyöreistä kirkoista, ja luoteiskärjessä on Hammershusin linnanraunio, '
      + 'Pohjois-Euroopan suurin keskiaikainen linnoitus. Strategisen sijaintinsa vuoksi '
      + 'saaresta on taisteltu vuosisatoja: sitä ovat hallinneet Tanskan lisäksi Ruotsi ja '
      + 'Lyypekki, ja vuonna 1658 Ruotsille luovutettu saari palasi Tanskalle vuonna 1660 '
      + 'paikallisen kapinan jälkeen.',
    lahde: 'en-Wikipedia "Bornholm", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-hammershus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-hammershus-969447ae.jpg',
      lyhyt: 'Hammershusin punatiilinen linnanraunio kukkulan päällä.',
      selite: 'Hammershusin linnanraunio kohoaa Bornholmin pohjoiskärjessä. Punaiset '
        + 'tiilimuurit ovat 1200-luvulla alkaneen linnoituksen jäänteitä.',
      lahde: 'Valokuva: Unukorno, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Unukorno',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bornholm_Hammershus_01.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-hammershus-d71b15b9.jpg',
        lyhyt: 'Hammershusin raunio kalliokukkulalla meren rannalla.',
        selite: 'Raunio sijaitsee korkealla kalliokukkulalla Itämeren äärellä. Hammershus '
          + 'purettiin osittain noin vuonna 1750.',
        lahde: 'Valokuva: Socket0, Wikimedia Commons (CC0).',
        tekija: 'Socket0',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hammershus_Castle_Ruins,_Bornholm.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-hammershus-75f9ea89.jpg',
        lyhyt: 'Hammershusin kivimuureja ja tornin rauniota.',
        selite: 'Kivimuureja ja tornin jäänteitä Hammershusin rauniolla. Taustalla avautuu '
          + 'metsäinen laakso.',
        lahde: 'Valokuva: Fugit hora, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Fugit hora',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hammershus_3.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hammershus',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Hammershusia oli vaikea vallata?',
      'Mitä linnalle tapahtui sen jälkeen, kun se hylättiin linnoituksena?',
    ],
    korostukset: ['Hammershus|Hammershus', 'Lyypekki|Lyypekin'],
    nappi: 'Raunioitunut keskiaikainen linna: hylätty linnoituksena 1743 ja osin purettu noin '
      + '1750',
    // 14.755 E / 55.2708 N — en-Wikipedia "Hammershus"
    laudat: {
      maailmankartta: { x: 6325.2, y: 1153.2 },
      europe: { x: 494.5, y: 440 },
    },
    teksti: 'Hammershus on keskiaikainen linnoitus Bornholmin saaren pohjoiskärjessä '
      + 'Hammerenin niemellä. Se rakennettiin 1200-luvulla, ja se oli Skandinavian suurin '
      + 'keskiaikainen linnoitus. Linna kohoaa 74 metriä merenpinnan yläpuolelle, ja sitä '
      + 'ympäröi 750 metrin mittainen kehämuuri. Huoneita suojasi useita sisäkkäisiä '
      + 'puolustuskehiä, ja sivulla oli kaksi luonnonlähdelampea juomaveden tarpeisiin. '
      + 'Linnasta taisteltiin monesti Tanskan kuninkaiden ja arkkipiispojen välillä, ja '
      + 'myöhemmin sen valtasivat muun muassa Lyypekin joukot ja ruotsalaiset. Linna '
      + 'hylättiin linnoituksena vuonna 1743 ja purettiin osittain noin vuonna 1750, minkä '
      + 'vuoksi se on nykyään raunio, jota on kunnostettu ja huollettu 1800-luvun lopulta.',
    lahde: 'en-Wikipedia "Hammershus", johdanto-osa ja osio "History" ja "Description" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuinka pitkä kehämuuri ympäröi Hammershusin linnan aluetta?',
      vaihtoehdot: [
        '210 metriä',
        '480 metriä',
        '1 150 metriä',
        '750 metriä',
      ],
      oikea: 3,
      fakta: 'Bornholmin epätavallisen valon ja vain neljän tunnin kesäyön vuoksi monet '
        + 'Tanskan varhaisimmista taiteilijoista maalasivat Hammershusin maisemia. '
        + 'Tunnetuimpia on Anton Eduard Kieldrupin vuoden 1848 maalaus.',
    },
  },
  {
    id: 'hahmotelma-koldinghus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-koldinghus-a2c7bb9b.jpg',
      lyhyt: 'Restauroitu Koldinghus sisääntulopuolelta katsottuna.',
      selite: 'Linnan sisäänkäyntipuoli nykyisessä, restauroidussa asussa. Koldinghus toimii '
        + 'nykyään museona.',
      lahde: 'Valokuva: Bengt Oberger, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Bengt Oberger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Koldinghus_03.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-koldinghus-fdf541aa.jpg',
        lyhyt: 'Koldinghusin raunio F. C. Kiærskoun maalauksessa vuodelta 1837.',
        selite: 'Maalaus esittää palon jälkeistä Koldinghusin rauniota kukkulalla kaupungin '
          + 'yläpuolella. Se on tehty vuonna 1837, ennen restaurointia.',
        lahde: 'Valokuva: F.C. Kiærskou, Wikimedia Commons (Public domain).',
        tekija: 'F.C. Kiærskou',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Frederik_Christian_Ki%C3%A6rskou_-_Ruiner_af_Koldinghus_-_1837.png',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-koldinghus-27165f18.jpg',
        lyhyt: 'Koldinghus kohoaa kukkulan päällä etelästä katsottuna.',
        selite: 'Linna sijaitsee kukkulalla Koldingin keskustassa. Kukkula valittiin linnan '
          + 'paikaksi jo 1200-luvulla.',
        lahde: 'Valokuva: Hjart, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hjart',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Koldinghus_fra_syd.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Koldinghus',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Koldinghus rakennettiin juuri Koldingin kukkulalle?',
      'Miksi linna jäi rauniona vuosikymmeniksi vuoden 1808 palon jälkeen?',
    ],
    korostukset: ['Jättiläistorni|Jättiläistorni', 'H. C. Andersen|H. C. Andersen'],
    nappi: 'Palon 1808 jälkeen vuosikymmeniä raunio, jossa vieraili muun muassa H. C. '
      + 'Andersen',
    // 9.4742 E / 55.4917 N — en-Wikipedia "Koldinghus"
    laudat: {
      maailmankartta: { x: 6149.1, y: 1142.9 },
      europe: { x: 393.1, y: 434.2 },
    },
    teksti: 'Koldinghus on Tanskan kuninkaallinen linna Koldingin kaupungissa Jyllannin '
      + 'niemimaan etelä-keskiosassa. Se perustettiin 1200-luvulla puolustamaan etelärajaa '
      + 'Schleswigin herttuoita vastaan, ja myöhemmin siitä tuli kuninkaallinen '
      + 'asuinpaikka. Kristian IV rakennutti siihen Jättiläistornin, jota koristivat '
      + 'neljän jättiläisen patsaat; nykyään jäljellä on vain Herkuleen patsas. Vuonna '
      + '1808 linnaan majoitettiin espanjalaisia sotilaita, ja yöllä syttynyt tulipalo '
      + 'tuhosi päärakennukset. Varoja jälleenrakennukseen ei ollut, joten linna oli '
      + 'vuosikymmeniä raunio, jossa vieraili muun muassa H. C. Andersen. Nykyään '
      + 'restauroitu linna on museo: laaja kunnostus kesti vuodesta 1976 vuoteen 1993 ja '
      + 'palkittiin Europa Nostra -palkinnolla.',
    lahde: 'en-Wikipedia "Koldinghus", johdanto-osa ja osiot "History", "Expansion", "Fire" '
      + 'ja "Restoration" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-dybbol',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-dybbol-d5b58de0.jpg',
      lyhyt: 'Dybbølin mylly ja sen nurmikkoinen ympäristö, taustalla kaupunkia.',
      selite: 'Dybbølin mylly on Tanskan kansallissymboli. Ympäristö on suojeltua '
        + 'muistomerkki- ja museoaluetta.',
      lahde: 'Valokuva: Hjart, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Hjart',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dybb%C3%B8l_M%C3%B8lle_2020a.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-dybbol-7c48bc86.jpg',
        lyhyt: 'Rekonstruoituja ruohokattoisia suojia ja tykki Dybbølin historiakeskuksen '
          + 'alueella.',
        selite: 'Historiecenter Dybbøl Bankeen kuuluvan ulkoalueen rekonstruktiota. Museo '
          + 'kertoo vuoden 1864 sodasta ja Dybbølin taistelusta.',
        lahde: 'Valokuva: UW, Wikimedia Commons (Public domain).',
        tekija: 'UW',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Historiecenter_Dybb%C3%B8l_Banke_-_outside.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Dybbøl',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Tanskan armeija vetäytyi Dannevirken linjalta juuri Dybbølin juoksuhautoihin?',
      'Miksi Dybbøl tunnettiin aikoinaan nimellä Düppel?',
    ],
    korostukset: ['Dannevirke|Dannevirken', 'Düppel|Düppel'],
    nappi: 'Vuoden 1864 taistelupaikka, jonka Tanska menetti Preussille; saksaksi Düppel',
    // 9.7361 E / 54.9111 N — en-Wikipedia "Dybbøl"
    laudat: {
      maailmankartta: { x: 6157.9, y: 1169.9 },
      europe: { x: 398.1, y: 449.4 },
    },
    teksti: 'Dybbøl on pieni kaupunki Etelä-Jyllannin kaakkoiskulmassa, noin kuusi kilometriä '
      + 'Sønderborgista länteen. Se tunnetaan vuoden 1864 taistelusta Toisessa Schleswigin '
      + 'sodassa. Tanskan armeija vetäytyi Dannevirken puolustuslinjalta, kun sen tukena '
      + 'olleet vesistöt ja suot jäätyivät kovana talvena, ja hakeutui '
      + 'puolustuskelpoisempaan asemaan Dybbølin kenttälinnakkeisiin. Preussilaiset '
      + 'pommittivat asemaa kuukauden ajan rihlatuilla tykeillä, ja 18. huhtikuuta 1864 '
      + 'heidän hyökkäyksensä onnistui. Rauhansopimuksessa Tanska luovutti Schleswigin, ja '
      + 'paikkakunta oli vuosina 1864–1920 saksalaisen hallinnon alla nimellä Düppel. '
      + 'Dybbølin mylly on Tanskan kansallissymboli, ja alue on nykyään suojeltu '
      + 'muistomerkki- ja museoalue.',
    lahde: 'en-Wikipedia "Dybbøl", johdanto-osa ja osiot "History" ja "Today" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-viborg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-viborg-1582cc85.jpg',
      lyhyt: 'Viborgin tuomiokirkon kaksi tornia ja katto puiden takaa.',
      selite: 'Kuvassa näkyvät tuomiokirkon tornit ja katto Latinerhaven-puiston suunnasta. '
        + 'Nykyinen kivikirkko on 1800-luvulla rakennettu jäljitelmä romaanisesta '
        + 'esikuvasta.',
      lahde: 'Valokuva: Slaunger, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Slaunger',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Viborg_Cathedral_seen_from_the_gate_to_Latinerhaven_2014-07-09.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-viborg-913fe5ca.jpg',
        lyhyt: 'Tuomiokirkon länsipääty kahden tornin ja kaarikoristeisen sisäänkäynnin '
          + 'kanssa.',
        selite: 'Julkisivu on graniittia, ja sitä koristavat romaaniset kaarikuviot. Rakennus '
          + 'muistuttaa tarkoituksella Lundin tuomiokirkkoa, ei keskiaikaista Viborgin '
          + 'kirkkoa.',
        lahde: 'Valokuva: Colin, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Colin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Viborg_Cathedral_2017-04-14.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-viborg-b0f29776.jpg',
        lyhyt: 'Tuomiokirkon holvit ja seinät täynnä värikkäitä maalauksia.',
        selite: 'Kuva on otettu ylöspäin kirkon sisällä, ja siinä näkyvät holvien maalaukset '
          + 'sekä suuri kynttelikkö oikealla. Sisustus on lähes kokonaan 1876 jälkeistä, '
          + 'koska vanha sisustus tuhoutui vuoden 1726 tulipalossa.',
        lahde: 'Valokuva: Colin, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Colin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Viborg_cathedral_ceiling.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Viborgin tuomiokirkko',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Viborgin tuomiokirkko jouduttiin rakentamaan uudelleen 1800-luvulla?',
      'Mitä keskiaikaiselle kirkolle tapahtui vuoden 1726 jälkeen, ennen kuin se purettiin?',
    ],
    korostukset: ['Lundin tuomiokirkko|Lundin romaaninen tuomiokirkko', 'krypta|krypta'],
    nappi: 'Vanha tuomiokirkko purettiin ja uutta rakennettiin; se vihittiin käyttöön vasta '
      + 'vuonna 1876',
    // 9.4123 E / 56.4505 N — en-Wikipedia "Viborg Cathedral"
    laudat: {
      maailmankartta: { x: 6147.1, y: 1097.9 },
      europe: { x: 391.9, y: 409 },
    },
    teksti: 'Viborgin tuomiokirkko on yksi Tanskan tärkeimmistä historiallisista kirkoista '
      + 'Jyllannin pohjoisosassa, ja kaupungissa on ollut piispanistuin vuodesta 1065. '
      + 'Nykyinen rakennus on silti 1800-luvun työ: sen paikalla seissyt keskiaikainen '
      + 'katedraali aloitettiin noin vuonna 1130, mutta vuoden 1726 tulipalo jätti '
      + 'jäljelle vain paljaat seinät ja holvit. Rauniot koteloitiin barokkityyliseen '
      + 'rakennukseen, ja vuosina 1800–1814 kirkkoa käytettiin jopa viljavarastona. '
      + 'Lopulta se purettiin ja rakennettiin tiilestä uudelleen, minkä jälkeen eteen '
      + 'tehtiin halvempi graniittijulkisivu. Esikuvana oli Lundin romaaninen tuomiokirkko '
      + 'Ruotsissa, ja uusi kirkko vihittiin käyttöön 1876. Vanhin osa on krypta.',
    lahde: 'en-Wikipedia "Viborg Cathedral", johdanto-osa ja osio "Rebuilding" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-lejre',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-lejre-385dca0e.jpg',
      lyhyt: 'Rivi suuria kiviä laivan muotoon asetettuna Gammel Lejren nurmella.',
      selite: 'Laivan muotoon pystytettyjä kiviä, joita on Gammel Lejren viikinkiaikaisella '
        + 'hautausmaalla. Artikkelin mukaan alueella on useita tällaisia laivakivikehiä.',
      lahde: 'Valokuva: Lichterfelder, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Lichterfelder',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gammel_Lejre_skibss%C3%A6tning.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-lejre-357b99c0.jpg',
        lyhyt: 'Kivilaiva ja Lejren maisema pienen järven suuntaan.',
        selite: 'Commonsin kuvauksen mukaan kuvassa on viikinkiajan kivilaiva Lejressä, '
          + 'Sjællandissa. Maisema näyttää, miten avoimessa ja pehmeässä maastossa '
          + 'muinainen kuningasistuin sijaitsi.',
        lahde: 'Valokuva: Västgöten, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Västgöten',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lejre_Skibs%C3%A6tning_1.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-lejre-d3268b03.jpg',
        lyhyt: 'Rakennettu rautakauden kylä Sagnlandet Lejressä, olkikattoisia taloja lammen '
          + 'rannalla.',
        selite: 'Kuvassa on Sagnlandet Lejren eli Legendojen maan kokeellisen arkeologian '
          + 'keskuksen rautakauden kylä. Se on nykyaikainen rekonstruktio, ei alkuperäinen '
          + 'kylä.',
        lahde: 'Valokuva: Per Meistrup, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Per Meistrup',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lejre_Iron_age_village_DSCN0529_w1536.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Lejre',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Lejren kaivauksissa löytyi, joka tukee tarinoita muinaisesta kuningasistuimesta?',
      'Miksi Lejren asutusta pidetään pikemmin kauppa- ja uskontokeskuksena kuin sotilastukikohtana?',
    ],
    korostukset: ['Heorot|Heorotin', 'Skjöldung|Skjöldung'],
    nappi: 'Muinaisen kuningasistuimen tarinat tunnettiin, mutta kaivaukset alkoivat vasta '
      + '1980-luvulla',
    // 11.975 E / 55.6044 N — en-Wikipedia "Lejre"
    laudat: {
      maailmankartta: { x: 6232.5, y: 1137.7 },
      europe: { x: 441.1, y: 431.2 },
    },
    teksti: 'Lejre on pieni rautatiekaupunki Sjællandin luoteisosassa, mutta Tanskan '
      + 'historiassa sen nimi painaa paljon. Keskiaikaiset lähteet, kuten Saxo '
      + 'Grammaticuksen Gesta Danorum, kertovat Lejren Skjöldung-suvun kuninkaista, ja '
      + 'paikkaa on pidetty Beowulf-eepoksen kuninkaanhallin Heorotin esikuvana. Legendat '
      + 'ovat suurelta osin satua, mutta 1980-luvulta alkaneet kaivaukset osoittivat '
      + 'niillä olevan todellinen pohja. Gammel Lejren luona paljastui rautakauden ja '
      + 'viikinkiajan asutus, jossa oli vähintään 50–60 metrin pituisten hallien '
      + 'pylväänreikiä. Asutus ajoittuu noin vuosien 550 ja 1000 välille. Aseita löytyi '
      + 'vähän, joten paikka näyttää olleen pikemmin kauppa-, käsityö- ja uskonnollinen '
      + 'keskus kuin sotilastukikohta.',
    lahde: 'en-Wikipedia "Lejre", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ringsted',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-ringsted-28baf288.jpg',
      lyhyt: 'Pyhän Bendtin punatiilinen romaaninen kirkko vihreine kattoineen.',
      selite: 'Pyhän Bendtin kirkko Ringstedissä Sjællandilla. Artikkelin mukaan se on entinen '
        + 'benediktiiniläisluostarin romaaninen kirkko.',
      lahde: 'Valokuva: Orf3us, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Orf3us',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sankt_Bendts_Kirke.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-ringsted-1243b267.jpg',
        lyhyt: 'Kirkon pitkä keskilaiva tiilikaarineen alttarille päin katsottuna.',
        selite: 'Kuva Pyhän Bendtin kirkon sisältä keskilaivasta kohti alttaria. Kirkossa on '
          + 'artikkelin mukaan lukuisia keskiaikaisten Tanskan kuninkaallisten hautoja.',
        lahde: 'Valokuva: Leif Jørgensen, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Leif Jørgensen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sankt_Bendts_Kirke_-_Midtskibet_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-ringsted-1b8ab2b9.jpg',
        lyhyt: 'Kirkon kuori, kullattu alttari ja kuninkaallisen haudan laatta lattialla.',
        selite: 'Commonsin kuvauksen mukaan etualalla on kuningas Erik Menvedin (1274-1319) ja '
          + 'kuningatar Ingeborgin hauta. Taustalla on kirkon alttari.',
        lahde: 'Valokuva: Leif Jørgensen, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Leif Jørgensen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sankt_Bendts_Kirke_-_Koret.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ringsted',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Pyhän Bendtin kirkossa on, mikä tekee siitä erityisen Tanskan historiassa?',
      'Mitä maakäräjät (landsting) olivat, ja mitä niissä tehtiin?',
    ],
    korostukset: ['landsting|maakäräjät', 'Knud Lavard|Knud Lavard'],
    nappi: 'Vanha romaaninen luostarikirkko, jossa on lukuisia keskiajan kuninkaallisten '
      + 'hautoja',
    // 11.79 E / 55.4425 N — en-Wikipedia "Ringsted"
    laudat: {
      maailmankartta: { x: 6226.3, y: 1145.2 },
      europe: { x: 437.6, y: 435.5 },
    },
    teksti: 'Ringsted on kaupunki Sjællandin saaren keskiosassa, noin 60 kilometrin päässä '
      + 'Kööpenhaminasta. Keskiajalla siellä kokoontuivat Sjællandin maakäräjät, jotka '
      + 'siirtyivät vuonna 1584 Pyhän Bendtin kirkkoon ja vuonna 1805 Kööpenhaminaan. '
      + 'Pyhän Bendtin kirkko on kaupungin tunnetuin nähtävyys: se on entinen '
      + 'benediktiiniläisluostarin romaaninen kirkko, jossa on lukuisia keskiaikaisten '
      + 'Tanskan kuninkaallisten hautoja. Kaupungin vaakuna on vuodelta 1421, ja sen '
      + 'kolmen palvojahahmon tulkinnasta on väitelty. Kaupunki itse tulkitsee ne pyhäksi '
      + 'Knud Lavardiksi, kuningas Erik Plovpenningiksi ja Benedictus Nursialaiseksi. '
      + 'Nykyään Ringsted on myös vilkas rautatieristeys Sjællandin keskellä.',
    lahde: 'en-Wikipedia "Ringsted", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ladby',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-ladby-97c43b3b.jpg',
      lyhyt: 'Ladbyn laivan jäljennös rakenteilla viikinkimuseon pihalla.',
      selite: 'Commonsin kuvauksen mukaan kuvassa on Ladbyn laivan rekonstruktio Ladbyn '
        + 'viikinkimuseon luona kesällä 2014.',
      lahde: 'Valokuva: Toxophilus, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Toxophilus',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rekonstruktion_af_Ladbyskibet.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-ladby-e8d8df45.jpg',
        lyhyt: 'Ladbyn haudan laiva museossa, säilyneet jäänteet.',
        selite: 'Ladbyn laivan säilynyt jäänne. Commonsin kuvauksen mukaan laiva ja sen '
          + 'omistaja on haudattu Ladbyhøjiin yhdessä 11 hevosen ja vähintään 4 koiran '
          + 'kanssa.',
        lahde: 'Valokuva: Malene Thyssen, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Malene Thyssen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ladbyskibet.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-ladby-e5c9fdaa.jpg',
        lyhyt: 'Nurmen peittämä kumpu, jonka sisään nykyaikainen sisäänkäynti johtaa.',
        selite: 'Kuvassa on Ladbyn laivahaudan kummun nykyaikainen sisäänkäynti. Laiva on '
          + 'säilytetty löytöpaikallaan.',
        lahde: 'Valokuva: Toxophilus, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Toxophilus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Indgangen_til_Ladbyskibet.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ladbyn laivahauta',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Ladbyn laivahaudasta löytyi vain vähän vainajan luita?',
      'Millaisia hautalahjoja viikinkipäällikön mukana oli, ja mitä ne kertovat hänestä?',
    ],
    korostukset: ['Poul Helweg Mikkelsen|Poul Helweg Mikkelsen', 'Hedeby|Hedeby'],
    nappi: 'Vielä maan alla: laivahauta löytyy vasta vuonna 1935, noin tuhat vuotta '
      + 'hautaamisen jälkeen',
    // 10.6169 E / 55.4434 N — en-Wikipedia "Ladby ship"
    laudat: {
      maailmankartta: { x: 6187.2, y: 1145.2 },
      europe: { x: 415, y: 435.4 },
    },
    teksti: 'Ladbyn laivahauta on Fynin koillisosassa, lähellä Kertemindeä. Se on ainoa '
      + 'Tanskasta löydetty viikinkiajan laivahauta, koska vastaava Hedebyn kammiohauta on '
      + 'nykyään Saksassa. Haudan ajoitetaan 900-luvun alkuun, ja ajoitus perustuu koiran '
      + 'valjaiden kullattuun pronssilenkkiin. Hauta paljastui noin 28. helmikuuta 1935, '
      + 'kun apteekkari ja harrastelija-arkeologi Poul Helweg Mikkelsen löysi sen. '
      + 'Kaivauksissa esiin tuli runsaasti hautalahjoja, sekä esineitä että eläimiä. Hauta '
      + 'oli kuitenkin pahoin vahingoittunut, ja vainajasta löytyi vain muutama pieni luu. '
      + 'Nykyään laiva on säilytetty löytöpaikallaan, jossa toimii viikinkimuseo.',
    lahde: 'en-Wikipedia "Ladby ship", johdanto-osa ja osio "Discovery" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-christiansfeld',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-christiansfeld-002af1c3.jpg',
      lyhyt: 'Herrnhutilaisten kirkko, pitkä keltatiilinen rakennus tornikupoleineen.',
      selite: 'Commonsin kuvauksen mukaan kuvassa on herrnhutilaisten kirkko '
        + 'Christiansfeldissä toukokuussa 2015. Edessä on suihkulähde ja nurmikenttä.',
      lahde: 'Valokuva: Villy Fink Isaksen, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Villy Fink Isaksen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Christiansfeld_br%C3%B8dremenighedskirken_2.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-christiansfeld-a184919e.jpg',
        lyhyt: 'Christiansfeldin keskusaukio ja sitä ympäröivät keltatiiliset talot.',
        selite: 'Kuvassa on Christiansfeldin keskeinen aukio lännestä katsottuna. '
          + 'Keltatiiliset ja punakattoiset talot ympäröivät aukiota.',
        lahde: 'Valokuva: Hjart, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hjart',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grev_Zinzendorfs_Plads_2023_fra_vest.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-christiansfeld-af01d11e.jpg',
        lyhyt: 'Rivi keltatiilisiä taloja kaupungin yhdellä pääkaduista.',
        selite: 'Kuva Christiansfeldin kadusta, jonka varrella on keltatiilisiä, punakattoisia '
          + 'taloja. Yhtenäinen tyyli on yksi syy siihen, että vanhakaupunki on '
          + 'maailmanperintökohde.',
        lahde: 'Valokuva: Hjart, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hjart',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lindegade,_Christiansfeld_2023_SV_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Christiansfeld',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Christiansfeld on Unescon maailmanperintökohde?',
      'Mitä kuningas Kristian VII lupasi, jotta uuden kaupungin rakentaminen kannattaisi?',
    ],
    korostukset: ['herrnhutilaiset|herrnhutilaiset', 'hunajakakut|hunajakakuistaan'],
    nappi: 'Herrnhutilaisten kaupunki, perustettu 1773; vuonna 1873 Saksan puolella, Tanskaan '
      + 'vasta 1920',
    // 9.4863 E / 55.3567 N — en-Wikipedia "Christiansfeld"
    laudat: {
      maailmankartta: { x: 6149.5, y: 1149.2 },
      europe: { x: 393.3, y: 437.7 },
    },
    teksti: 'Christiansfeld on kaupunki Etelä-Jyllannissa, jonka herrnhutilaiset perustivat '
      + 'vuonna 1773. Se sai nimensä Tanskan kuningas Kristian VII:n mukaan, ja '
      + 'rakentajien houkuttelemiseksi kuningas lupasi kymmenen vuoden verovapauden sekä '
      + 'maksoi kymmenesosan uusien talojen kustannuksista. Suurin osa kaupungista '
      + 'rakennettiin vuosina 1773–1800 tiukan asemakaavan mukaan Kirkkotorin ympärille: '
      + 'talot ovat yksi- tai kaksikerroksisia, keltaisesta tiilestä tehtyjä ja '
      + 'punakattoisia, ja monet niistä olivat yhteisasuntoja leskille sekä naimattomille '
      + 'naisille ja miehille. Kaupunki liitettiin Preussille vuonna 1864 ja palasi '
      + 'Tanskaan vasta vuonna 1920. Nykyään se on Unescon maailmanperintökohde (2015), '
      + 'parhaiten säilynyt esimerkki herrnhutilaisten kaupunkisuunnittelusta, ja tunnettu '
      + 'hunajakakuistaan.',
    lahde: 'en-Wikipedia "Christiansfeld", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä väristä tiiltä Christiansfeldin herrnhutilaistalot on pääosin rakennettu?',
      vaihtoehdot: [
        'Punaista tiiltä',
        'Keltaista tiiltä',
        'Harmaata graniittia',
        'Valkoista kalkkikiveä',
      ],
      oikea: 1,
      fakta: 'Kaupungin hunajakakut leivotaan salaisen reseptin mukaan vuodelta 1783. Vuoteen '
        + '2008 asti ne leivottiin alkuperäisessä 1700-luvun leipomossa.',
    },
  },
  {
    id: 'hahmotelma-kalundborg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-kalundborg-064e05c3.jpg',
      lyhyt: 'Vor Frue Kirke ja sen viisi tornia punatiilisen muurin takana.',
      selite: 'Kalundborgin Vor Frue Kirken eli Neitsyt Marian kirkon viisi tornia '
        + 'punatiilimuurin takaa katsottuna. Artikkelin mukaan viisitorninen kirkko on '
        + 'kaupungin tunnettu maamerkki.',
      lahde: 'Valokuva: Thomas Dahlstrøm Nielsen, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Thomas Dahlstrøm Nielsen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vor_Frue_Kirke,_Kalundborg_2021.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-kalundborg-2395682c.jpg',
        lyhyt: 'Jacob Kornerupin maalaus Vor Frue Kirkesta: kirkko ja sen tornit '
          + '1800-luvulla.',
        selite: 'Maalaus esittää Kalundborgin Vor Frue Kirkea. Commonsin mukaan '
          + 'huutokauppayhtiön asiantuntijat ajoittivat sen sen perusteella, että Kornerup '
          + 'maalasi samanlaisen näkymän vuonna 1853.',
        lahde: 'Valokuva: Jacob Kornerup, Wikimedia Commons (Public domain).',
        tekija: 'Jacob Kornerup',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalundborg_Vor_Frue_Kirke_(Jacob_Kornerup).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-kalundborg-478cb2f7.jpg',
        lyhyt: 'Vor Frue Kirken runsaskoristeinen barokkialttari kullattuine patsaineen.',
        selite: 'Commonsin kuvauksen mukaan kuvassa on Kalundborgin Vor Frue Kirken '
          + 'barokkialttari. Alttarin patsaat ja koristeet on maalattu ja kullattu.',
        lahde: 'Valokuva: Leif Jørgensen, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Leif Jørgensen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vor_Frue_Kirke,_Kalundborg_10.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kalundborg',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Keitä olivat Absalon ja Esbern Snare, joihin kaupungin kuuluisa kirkko liitetään?',
      'Mikä on teollinen symbioosi, ja miten se sai alkunsa Kalundborgissa?',
    ],
    korostukset: ['Absalon|Absaloniin', 'teollinen symbioosi|teollisesta symbioosista'],
    nappi: 'Keskiaikainen viisitorninen kirkko seisoi jo; rautatie kaupunkiin avataan vasta '
      + '1874',
    // 11.085 E / 55.6814 N — en-Wikipedia "Kalundborg"
    laudat: {
      maailmankartta: { x: 6202.8, y: 1134.1 },
      europe: { x: 424, y: 429.2 },
    },
    teksti: 'Kalundborg on kaupunki Sjællandin saaren luoteisrannikolla, noin 110 kilometrin '
      + 'päässä Kööpenhaminasta. Alue asutettiin vuonna 1170 Kalundborgin vuonon '
      + 'pohjukassa olevan luonnonsataman ääreen, ja kaupunki kasvoi 1800-luvulla ja '
      + '1900-luvun puoliväliin mennessä suureksi teollisuuskeskukseksi. Sen tunnetuin '
      + 'nähtävyys on Vor Frue Kirke eli Neitsyt Marian kirkko, jonka viisi tornihuippua '
      + 'ovat kaupungin tavaramerkki. Kirkko liitetään kuningas Valdemar I:een ja '
      + 'arkkipiispa Absaloniin, ja sen kerrotaan rakentaneen Absalonin veli Esbern Snare. '
      + 'Kalundborg on myös tunnettu teollisesta symbioosista: yritykset ovat vaihtaneet '
      + 'vettä, energiaa ja sivutuotteita jo 1960-luvun alusta lähtien.',
    lahde: 'en-Wikipedia "Kalundborg", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-odense',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-odense-189250fb.jpg',
      lyhyt: 'Kivetty katu ja keltaisia taloja Odensen vanhassa kaupungissa.',
      selite: 'Commonsin kuvan otsikko on Hans Christian Andersenin syntymäkoti. Kuva näyttää '
        + 'kivetyn kadun ja matalia, keltaisiksi rapattuja taloja Odensen vanhassa '
        + 'kaupungissa.',
      lahde: 'Valokuva: Rüdiger Stehn, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Rüdiger Stehn',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hans_Christian_Andersen_Birthplace,_Odense,_Denmark.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-odense-16147c3e.jpg',
        lyhyt: 'Andersenin lapsuudenkoti Munkemøllestrædellä, kuvattuna puutarhan puolelta.',
        selite: 'Ristikkorakenteinen talo, jossa Andersen asui vuoteen 1819 asti eli '
          + 'neljäntoista ikäiseksi. Talossa on nykyään museo, jossa esitellään muun '
          + 'muassa Andersenin isän suutarintyökaluja.',
        lahde: 'Valokuva: Ipigott, Wikimedia Commons (Public domain).',
        tekija: 'Ipigott',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:H.C._Andersens_Barndomshjemmet.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-odense-ca2d4d0d.jpg',
        lyhyt: 'Louis Hasselriisin vuonna 1888 veistämä Andersenin patsas kirkon vieressä.',
        selite: 'Patsas seisoo Eventyrhavenissa eli satupuistossa Odensen tuomiokirkon '
          + 'vieressä. Taustalla näkyvät kirkon tiiliseinät ja kellotorni.',
        lahde: 'Valokuva: Jebulon, Wikimedia Commons (CC0).',
        tekija: 'Jebulon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Statue_Andersen_by_Louis_Hasselriis_Odense_Denmark.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Odense',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä Odensen nimi alun perin tarkoitti, ja minkä muinaisen jumalan mukaan kaupunki on nimetty?',
      'Millaisessa kodissa Andersen vietti lapsuutensa Odensessa, ja mitä talossa on nykyään?',
    ],
    korostukset: ['Odin|Odinin', 'Hans Christian Andersen|Hans Christian Andersen'],
    nappi: 'Sadunkertoja H. C. Andersenin syntymäkaupunki; hän on vuonna 1873 vielä elossa',
    // 10.3886 E / 55.3958 N — en-Wikipedia "Odense"
    laudat: {
      maailmankartta: { x: 6179.6, y: 1147.4 },
      europe: { x: 410.7, y: 436.7 },
    },
    teksti: 'Odense on Tanskan kolmanneksi suurin kaupunki ja Fynin saaren kaupallinen keskus. '
      + 'Nimi juontuu muodosta Óðins vé, ”Odinin pyhäkkö”, ja kirjallisissa lähteissä '
      + 'kaupunki mainitaan ensimmäisen kerran vuonna 988. Sadunkertoja Hans Christian '
      + 'Andersen syntyi Odensessa vuonna 1805 suutarin poikana ja asui lapsuutensa '
      + 'pienessä ristikkorakenteisessa talossa kaksivuotiaasta neljäntoistavuotiaaksi. '
      + 'Hänen syntymäkotinaan pidetystä keltaisesta talosta tuli museo vuonna 1908, ja '
      + 'lapsuudenkoti avattiin museona vuonna 1930. Kaupunki kasvoi 1800-luvulla '
      + 'nopeasti: Fynin poikki rakennettiin rautatie vuonna 1865, ja Odensesta tuli yksi '
      + 'Tanskan suurimmista rautatiesolmuista.',
    lahde: 'en-Wikipedia "Odense", johdanto-osa ja osio "Hans Christian Andersen connections" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä muinaisen jumalan pyhäkköä Odensen nimi alun perin tarkoittaa?',
      vaihtoehdot: [
        'Thorin pyhäkköä',
        'Freyan pyhäkköä',
        'Odinin pyhäkköä',
        'Tyrin pyhäkköä',
      ],
      oikea: 2,
      fakta: 'Kaupunki juhli tuhatvuotisjuhlaansa vuonna 1988 ja istutti sen kunniaksi '
        + 'Tusindårsskoven-metsän. Metsässä pidetään nykyään vuosittain '
        + 'Tinderbox-musiikkifestivaali.',
    },
  },
  {
    id: 'hahmotelma-horsens',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-horsens-8b2d7267.jpg',
      lyhyt: 'Horsensin rangaistuslaitos ennen vuotta 1875 painetussa piirroksessa.',
      selite: 'Piirros Horsensin valtionvankilasta, joka avattiin vuonna 1853. Kuva on '
        + 'peräisin Nordiska Taflor -kirjasta (1875), ja Commons ajoittaa sen ennen vuotta '
        + '1875.',
      lahde: 'Valokuva: Albert Bonnier: Nordiska Taflor, pittoreska utsigter från Sverige, Norge ock Danmark (1875), Wikimedia Commons (CC0).',
      tekija: 'Albert Bonnier: Nordiska Taflor, pittoreska utsigter från Sverige, Norge ock Danmark (1875)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Straff%C3%A4ngselet_i_Horsens,_f%C3%B8r_1875.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-horsens-13877e5c.jpg',
        lyhyt: 'Horsensin vankilan sisäänkäyntialue muurien sisäpuolelta nähtynä.',
        selite: 'Entisen valtionvankilan rakennuksia ja muureja. Vankila suljettiin vuonna '
          + '2006, ja rakennuksissa toimii nykyään vankila- ja rikosmuseo.',
        lahde: 'Valokuva: XyZ32xKx8TedEOyE (Wikimedia Commons -käyttäjä), Wikimedia Commons (CC0).',
        tekija: 'XyZ32xKx8TedEOyE (Wikimedia Commons -käyttäjä)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Horsens_Prison_entrance_building_as_seen_from_inside_the_walls.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-horsens-69829661.jpg',
        lyhyt: 'Horsensin Industrimuseum punatiilisessä rakennuksessa.',
        selite: 'Museo kertoo teollisen yhteiskunnan historiasta sekä työntekijöiden '
          + 'elinolojen ja teknologian kehityksestä. Horsensin museo on Tanskan ainoa '
          + 'teollisuusmuseo.',
        lahde: 'Valokuva: Echtner, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Echtner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Industrimuseet_Horsens.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Horsens',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi ihmiset muuttivat 1800-luvulla maaseudulta Horsensiin?',
      'Mitä vanhojen tanskan sanojen hors ja næs kertovat Horsensin sijainnista?',
    ],
    korostukset: ['Vitus Bering|Vitus Bering', 'rautavalimo|rautavalimo'],
    nappi: 'Teollistuva jyllantilainen kaupunki, jossa valtionvankila on toiminut vuodesta '
      + '1853',
    // 9.85 E / 55.8583 N — en-Wikipedia "Horsens"
    laudat: {
      maailmankartta: { x: 6161.7, y: 1125.8 },
      europe: { x: 400.3, y: 424.5 },
    },
    teksti: 'Horsens on kaupunki Jyllannin niemimaan kaakkoisrannikolla, Horsensinvuonon '
      + 'perukassa noin 50 kilometriä Aarhusista etelään. Nimen uskotaan tulevan vanhan '
      + 'tanskan sanoista hors (hevonen) ja næs (niemi). Kaupungin varhaisimmat jäljet '
      + 'ovat 800-luvun pakanallinen hautapaikka ja talojen jäänteet, ja 1200-luvulla se '
      + 'sai oman lakikirjansa. Teollistuminen alkoi 1800-luvun puolivälissä, ja maalta '
      + 'muutti väkeä tehtaisiin: Horsensiin perustettiin Kööpenhaminan ulkopuolella '
      + 'ensimmäinen tanskalainen rautavalimo sekä tupakka- ja tekstiilitehtaita. Vuosina '
      + '1853-2006 kaupungissa toimi Horsensin valtionvankila, jossa on nykyään vankila- '
      + 'ja rikosmuseo. Kaupungissa syntyi myös Venäjän laivaston kapteeni Vitus Bering.',
    lahde: 'en-Wikipedia "Horsens", johdanto-osa ja osiot "History", "Culture" ja "Prison" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä eläimen nimeä vanhan tanskan sana hors tarkoittaa, josta Horsensin nimen '
        + 'uskotaan tulevan?',
      vaihtoehdot: [
        'Hevosta',
        'Hirveä',
        'Hyljettä',
        'Hanhea',
      ],
      oikea: 0,
      fakta: 'Vankilasta pakeni vuonna 1949 mies, joka kaivoi sellistään tunnelin ulos ja '
        + 'jätti jälkeensä lapun: "Missä on tahto, siellä on keino". Hänet saatiin '
        + 'kuitenkin kiinni muutaman päivän kuluttua läheiseltä tilalta.',
    },
  },
  {
    id: 'hahmotelma-marstal',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-marstal-9665a930.jpg',
      lyhyt: 'Kuunari Marstal Marstalista, laivamuotokuva vuodelta 1873.',
      selite: 'Adolph Marius Nistedin laivamuotokuva kuunari Marstalista, jonka taustalla '
        + 'näkyy Aarhusin rantaa. Commons ajoittaa työn helmikuuhun 1873, ja alkuperäinen '
        + 'on Marstalin merenkulkumuseossa.',
      lahde: 'Valokuva: Adolph Marius Nisted (1829-1919), Wikimedia Commons (Public domain).',
      tekija: 'Adolph Marius Nisted (1829-1919)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Adolph_Marius_Nisted_-_Marstal_af_Marstal_-_1873.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-marstal-d4ffc36b.jpg',
        lyhyt: 'Marstalin merenkulkumuseon keltainen rakennus.',
        selite: 'Marstalin merenkulkumuseo (Marstal Søfartsmuseum) esittelee saarikaupungin '
          + 'merenkulun historiaa. Museossa säilytetään myös Nistedin kuunarimaalauksen '
          + 'alkuperäistä.',
        lahde: 'Valokuva: Bengt Oberger, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Bengt Oberger',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marstal_s%C3%B6fartsmuseum_01.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-marstal-1c7f0118.jpg',
        lyhyt: 'Marstalin kirkko punaisine tiilikattoineen ja vihertävine tornihuippuineen.',
        selite: 'Kirkko on rakennettu vuonna 1738, ja sen torni lisättiin vuonna 1920. Sisällä '
          + 'riippuu seitsemän votiivilaivaa.',
        lahde: 'Valokuva: Erik Christensen, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Erik Christensen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marstal_Kirke.1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Marstal',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Miksi Marstal ei kasvanut torin tai kirkon ympärille vaan satamalaitureilta nouseville poluille?',
      'Mitä seitsemän kirkossa roikkuvaa pienoislaivaa kertovat kaupungin historiasta?',
    ],
    korostukset: ['votiivilaiva|votiivilaivaa', 'Frederiksøen|Frederiksøen'],
    nappi: 'Ærøn purjelaivojen kaupunki, jonka puulaivat purjehtivat maailman merillä',
    // 10.5167 E / 54.8547 N — en-Wikipedia "Marstal"
    laudat: {
      maailmankartta: { x: 6183.9, y: 1172.5 },
      europe: { x: 413.1, y: 450.9 },
    },
    teksti: 'Marstal on Ærøn saaren suurin kaupunki Etelä-Tanskassa, ja sillä on pitkä '
      + 'merenkulun historia. Kaupunki perustettiin 1500-luvulla, ja 1600- ja '
      + '1700-luvuilla elanto tuli puulaivojen rakentamisesta ja purjehtimisesta. Talot '
      + 'nousivat satamalaitureilta ylöspäin johtavien polkujen varsille, eikä kaupunki '
      + 'kasvanut minkään torin tai kirkon ympärille. Satamassa sijaitsevalla '
      + 'Frederiksøen-saarella oli laivojen korjaustelakka, kunnes se vuokrattiin vuonna '
      + '1863 kalkinpolttoon; sen kivinen laituri on paikallisten merimiesten talkoilla '
      + 'tekemä vuodelta 1825. Marstalin kirkossa riippuu seitsemän votiivilaivaa, jotka '
      + 'kertovat kaupungin merenkulun kasvusta 1700-luvulta 1900-luvulle.',
    lahde: 'en-Wikipedia "Marstal", johdanto-osa ja osiot "Marstal Church" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-aalborg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-aalborg-b89c088f.jpg',
      lyhyt: 'Aalborgin akvaviittitehdas punatiilirakennuksineen ja säiliöineen vuonna 2006.',
      selite: 'Kuvan otsikko on Aalborg Akvavit, ja rakennuksen katolla on samanlainen kyltti. '
        + 'Kaupungissa toimi vuoteen 2014 asti De Danske Spritfabrikker, joka tuotti '
        + 'lukuisia akvaviittimerkkejä.',
      lahde: 'Valokuva: Tomasz Sienicki, Wikimedia Commons (CC BY 2.5).',
      tekija: 'Tomasz Sienicki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aalborg_Akvavit_2006_ubt.jpeg',
      lisenssi: 'CC BY 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-aalborg-c622db0c.jpg',
        lyhyt: 'De Danske Spritfabrikker -tehtaan tiilirakennus pyöreine ikkunoineen.',
        selite: 'Tehdasrakennus valmistui vuosina 1929-1931 arkkitehti Alfred Cock-Clausenin '
          + 'suunnittelemana. Yhtiön pääkonttoria pidetään tanskalaisen '
          + 'tehdasarkkitehtuurin mestariteoksena.',
        lahde: 'Valokuva: seier+seier, Wikimedia Commons (CC BY 2.0).',
        tekija: 'seier+seier',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aalborg_-_Danske_Spritfabrikker..jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Aalborg',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mitä akvaviitti on, ja miksi Aalborg tunnetaan siitä koko maailmassa?',
      'Miksi Aalborgin Limfjordin kapein kohta teki kaupungista tärkeän sataman?',
    ],
    korostukset: ['akvaviitti|akvaviittien', 'De Danske Spritfabrikker|De Danske Spritfabrikker'],
    nappi: 'Limfjordin satamakaupunki, jonne rautatie tuli 1869 ja jossa tehtiin tupakkaa ja '
      + 'väkeviä juomia',
    // 9.9167 E / 57.05 N — en-Wikipedia "Aalborg"
    laudat: {
      maailmankartta: { x: 6163.9, y: 1069.4 },
      europe: { x: 401.6, y: 393.2 },
    },
    teksti: 'Aalborg on Tanskan neljänneksi suurin kaupunki, ja se sijaitsee Limfjordin '
      + 'kapeimmassa kohdassa, mikä teki siitä keskiajalla tärkeän sataman. Kaupunki '
      + 'vaurastui 1500- ja 1600-luvuilla ulkomaankaupan ansiosta. 1800-luvun puolivälin '
      + 'jälkeen kasvu kääntyi uuteen nousuun, kun Limfjordin yli valmistui ponttonisilta '
      + 'vuonna 1865 ja rautatie saapui kaupunkiin vuonna 1869. Aalborgista tuli maan '
      + 'tärkein tupakkatuotteiden ja väkevien juomien valmistaja. Kaupungissa toimi '
      + 'vuoteen 2014 asti De Danske Spritfabrikker, joka on maailman suurin akvaviittien '
      + 'tuottaja ja viejä. Sen vuonna 1931 valmistunut pääkonttori on tanskalaisen '
      + 'tehdasarkkitehtuurin mestariteos ja nykyään kansallisesti suojeltu kohde.',
    lahde: 'en-Wikipedia "Aalborg", johdanto-osa ja osiot "16th to 19th centuries" ja "Major '
      + 'private companies" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä juoman maailman suurin tuottaja ja viejä Aalborgissa toiminut De Danske '
        + 'Spritfabrikker on?',
      vaihtoehdot: [
        'Viskin',
        'Rommin',
        'Konjakin',
        'Akvaviitin',
      ],
      oikea: 3,
      fakta: 'Aalborg-merkin akvaviitti tislataan meripihkan kanssa, mikä antaa siihen männyn '
        + 'ja sitrusten sävyjä. EU:n sääntöjen mukaan akvaviitin hallitsevan maun täytyy '
        + 'tulla kuminan tai tillin siemenistä.',
    },
  },
  {
    id: 'hahmotelma-soro',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-soro-e8773644.jpg',
      lyhyt: 'Sorøn luostarikirkko ja akatemian päärakennus, edessä laventelikukkia.',
      selite: 'Vasemmalla näkyy tiilinen luostarikirkko ja oikealla uusklassinen päärakennus. '
        + 'Nykyinen päärakennus rakennettiin vuosina 1822-1827 vuoden 1813 palon jälkeen.',
      lahde: 'Valokuva: Ramblersen, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ramblersen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sor%C3%B8_Academy_-_church_and_main_building.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-soro-f697eae4.jpg',
        lyhyt: 'Sorøn tiilinen luostarikirkko, yksi Tanskan ensimmäisistä tiilikirkoista.',
        selite: 'Kirkko on Tanskan kolmanneksi pisin. Siellä on haudattuna muun muassa Ludvig '
          + 'Holberg.',
        lahde: 'Valokuva: Toxophilus, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Toxophilus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sor%C3%B8_Klosterkirke.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-soro-d86819c9.jpg',
        lyhyt: 'Molbechin talo, keltainen 1740-luvun professorinasunto akatemian alueella.',
        selite: 'Molbechin talo on entinen professorin asunto, joka selvisi vuoden 1813 '
          + 'palosta ja on peräisin akatemian 1740 tehdystä uudelleenrakennuksesta.',
        lahde: 'Valokuva: Bob Collowan, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Bob Collowan',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Molbechs_Hus,_Sor%C3%B8_Akademi,_Danmark.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Sorø Akademi',
    nimio: 'Sorø',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Sorøn luostari muuttui reformaation jälkeen oppilaitokseksi?',
      'Mitä Saxo Grammaticus kirjoitti Sorøn porttirakennuksessa, ja miksi teos on tärkeä?',
    ],
    korostukset: ['Ludvig Holberg|Ludvig Holberg', 'Saxo Grammaticus|Saxo Grammaticus'],
    nappi: 'Vuonna 1825 uudelleen avattu akatemia, Tanskan kultakauden kirjailijoiden '
      + 'kohtaamispaikka',
    // 11.5565 E / 55.4296 N — en-Wikipedia "Sorø Academy"
    laudat: {
      maailmankartta: { x: 6218.6, y: 1145.8 },
      europe: { x: 433.1, y: 435.8 },
    },
    teksti: 'Sorø Akademi on Sjællandilla sijaitseva sisäoppilaitos ja lukio, jonka juuret '
      + 'ovat vuonna 1140 perustetussa Sorøn luostarissa. Reformaation jälkeen kruunu otti '
      + 'luostarin haltuunsa, ja Kristian IV muutti sen vuonna 1623 ritariakatemiaksi. '
      + 'Kirjailija Ludvig Holberg testamenttasi 1700-luvulla suurimman osan '
      + 'omaisuudestaan oppilaitoksen uudelleen perustamiseen. Päärakennus paloi vuonna '
      + '1813 ja rakennettiin uudelleen; akatemia avattiin uudelleen vuonna 1825, ja siitä '
      + 'tuli Tanskan kultakauden keskeinen kohtaamispaikka, jossa vierailivat muun muassa '
      + 'H. C. Andersen ja kuvanveistäjä Bertel Thorvaldsen. Porttirakennus on Tanskan '
      + 'vanhin yhä asuttu rakennus, ja siellä Saxo Grammaticus kirjoitti Gesta Danorum '
      + '-kronikkansa.',
    lahde: 'en-Wikipedia "Sorø Academy", johdanto-osa ja osiot "History" ja "Buildings" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-esbjerg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-esbjerg-70abfbaa.jpg',
      lyhyt: 'Esbjergin satama vuonna 2015: laivoja, nostureita ja satama-aluetta.',
      selite: 'Kuva on otettu Esbjergin satamasta elokuussa 2015. Satama on Tanskan toiseksi '
        + 'suurin, ja sitä on laajennettu erityisesti tuulivoimateollisuuden tarpeisiin.',
      lahde: 'Valokuva: Thomas Dahlstrøm Nielsen, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Thomas Dahlstrøm Nielsen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Esbjerg_Harbour,_2015.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-esbjerg-dcf88737.jpg',
        lyhyt: 'Neljä yhdeksän metrin korkuista valkoista istuvaa hahmoa Esbjergin '
          + 'länsipuolella.',
        selite: 'Svend Wiig Hansenin suunnittelema Mennesket ved Havet (Ihminen kohtaa meren) '
          + 'asennettiin Sædding Beachin rannalle vuonna 1995. Mereltä tultaessa se on '
          + 'yksi kaupungin näkyvimmistä maamerkeistä.',
        lahde: 'Valokuva: Jazia, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jazia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mennesket_ved_havet_stor.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-esbjerg-be8f6a14.jpg',
        lyhyt: 'Esbjergin punatiilinen vesitorni alhaalta päin kuvattuna.',
        selite: 'Christian Hjerrild Clausenin suunnittelema vesitorni on vuodelta 1895, ja sen '
          + 'esikuvana oli Nürnbergin keskiaikainen Nassauer Haus. Tornin '
          + 'näköalatasanteelta avautuvat näkymät kaupungille ja satamaan.',
        lahde: 'Valokuva: Kent Madsen, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Kent Madsen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Esbjerg_Water_Tower.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Esbjerg',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Miksi Tanska rakensi kokonaan uuden sataman lähes tyhjälle rannikolle vuonna 1868?',
      'Miksi rautatieyhteys oli uudelle satamalle yhtä tärkeä kuin itse laiturit?',
    ],
    korostukset: ['Altona|Altonan', 'Toinen Schleswigin sota|Toisen Schleswigin sodan'],
    nappi: 'Satama oli vielä rakenteilla: virallisesti se avattiin vasta 1874, ja kaupungissa '
      + 'asui n. 400 ihmistä',
    // 8.45 E / 55.4833 N — en-Wikipedia "Esbjerg"
    laudat: {
      maailmankartta: { x: 6115, y: 1143.3 },
      europe: { x: 373.4, y: 434.4 },
    },
    teksti: 'Esbjerg on Jyllannin länsirannikon satamakaupunki, josta on tullut Tanskan '
      + 'viidenneksi suurin kaupunki. Ennen vuotta 1868 alueella oli vain muutama maatila, '
      + 'kunnes päätettiin perustaa satama. Uusi satama korvasi Altonan, joka oli ollut '
      + 'Tanskan tärkein Pohjanmeren satama mutta joutui Saksan hallintaan Toisen '
      + 'Schleswigin sodan jälkeen vuonna 1864. Satamaa rakennettiin kuninkaallisen '
      + 'asetuksen nojalla vuodesta 1868 vuoteen 1874, ja sille avattiin rautatieyhteydet '
      + 'Vardeen ja Fredericiaan. Kaupungin kadut suunniteltiin ruutukaavaan, ja se kasvoi '
      + 'nopeasti kalastus- ja vientisatamana.',
    lahde: 'en-Wikipedia "Esbjerg", johdanto-osa ja osio "History and economy" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä Saksan haltuun joutuneen sataman tilalle Esbjergin satama perustettiin?',
      vaihtoehdot: [
        'Kiel',
        'Flensburg',
        'Altona',
        'Lübeck',
      ],
      oikea: 2,
      fakta: 'Esbjergistä kulki vuodesta 1875 aina syyskuuhun 2014 asti matkustajalaivayhteys '
        + 'Englannin Harwichiin. Nykyään satama huolehtii suuresta osasta Tanskan '
        + 'tuulivoimaloiden kuljetuksia.',
    },
  },
  {
    id: 'hahmotelma-samso',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-samso-140186b0.jpg',
      lyhyt: 'Kanhaven kanavan uoma, viikinkiajan kaivanto Samsøn saaren poikki.',
      selite: 'Kuvassa on Kanhaven kanavan nykyinen maisema. Kanava oli viikinkiajan '
        + 'rakennushanke, ja sen kaivaminen kertoo aikansa keskitetystä vallasta.',
      lahde: 'Valokuva: Jan Pešula, Wikimedia Commons (CC0).',
      tekija: 'Jan Pešula',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kanhavekanalen1.JPG',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-samso-4f3f65a7.jpg',
        lyhyt: 'Samsø Energiakademi (Energi Akademiet) Ballenin lähellä.',
        selite: 'Energiakademia toimii Ballenin kylässä saaren itärannikolla. Se on '
          + 'yhteisötila energia-asioille ja paikalliselle kehitykselle.',
        lahde: 'Valokuva: Atle Grimsby, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Atle Grimsby',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Energi_Akademiet_p%C3%A5_Sams%C3%B8_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-samso-c13d2790.jpg',
        lyhyt: 'Näkymä maatuulivoimalan päältä Samsøn peltomaisemaan.',
        selite: 'Kuva on otettu Samsøn 1 megawatin maatuulivoimalasta, ja siinä näkyy toinen '
          + 'voimala peltojen keskellä. Saarelle rakennettiin yhteensä 11 '
          + 'maatuulivoimalaa.',
        lahde: 'Valokuva: DirectorOlav, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'DirectorOlav',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_from_an_onshore_wind_turbine..jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Samsø',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi viikingit kaivoivat kanavan keskelle pientä saarta Kattegatissa?',
      'Miten saari, joka ennen tuotti energiansa tuontiöljyllä ja -hiilellä, pääsi eroon fossiilisista polttoaineista?',
    ],
    korostukset: ['Kanhaven kanava|Kanhaven kanava', 'viikingit|viikinkien'],
    nappi: 'Viikinkien kaivama kanava oli jo yli 1100 vuotta vanha; energiasaareksi Samsø '
      + 'muuttuu vasta 1997–2003',
    // 10.6167 E / 55.8667 N — en-Wikipedia "Samsø"
    laudat: {
      maailmankartta: { x: 6187.2, y: 1125.4 },
      europe: { x: 415, y: 424.3 },
    },
    teksti: 'Samsø on Kattegatin saari noin 15 kilometrin päässä Jyllannin rannikosta. Saaren '
      + 'poikki kaivettiin vuosina 726–729 puureunainen Kanhaven kanava, joka on yksi '
      + 'suurimmista tunnetuista viikinkien rakennushankkeista. Keskiajalla saarelle '
      + 'rakennettiin viisi linnoitusta, mutta niistä on jäljellä vain linnakumpuja. '
      + 'Vuonna 1997 Samsø voitti valtion kilpailun ja siitä tuli uusiutuvan energian '
      + 'mallikunta: ensimmäinen tuulivoimala käynnistyi vuonna 2000, ja merelle '
      + 'rakennettiin kymmenen voimalaa vuoteen 2003 mennessä. Nykyään saaren sähkö tulee '
      + 'vuositasolla kokonaan tuulesta, ja lämmöstä 75 % tuotetaan paikallisella aurinko- '
      + 'ja biomassaenergialla.',
    lahde: 'en-Wikipedia "Samsø", johdanto-osa ja osiot "Kanhave canal" ja "Renewable energy" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä Samsøn poikki kaivettiin vuosina 726–729 viikinkiaikaan?',
      vaihtoehdot: [
        'Kivinen silta',
        'Puureunainen kanava',
        'Puolustusmuuri',
        'Kivetty tie',
      ],
      oikea: 1,
      fakta: 'Samsø tunnetaan Tanskassa aikaisista uusista perunoistaan. Saarella on myös '
        + 'maailman suurin pysyvä labyrintti, joka kasvaa entisellä joulukuusiviljelmällä.',
    },
  },
  {
    id: 'hahmotelma-maribo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-maribo-98b26eb5.jpg',
      lyhyt: 'Maribon tuomiokirkko punatiilisine kellotorneineen Søndersøn rannalta nähtynä.',
      selite: 'Kuvassa on Maribon tuomiokirkko Søndersø-järven rannalta katsottuna. Kirkko oli '
        + 'aiemmin birgittalaisluostarin kirkko ja sai tuomiokirkon aseman vuosina '
        + '1803–1804.',
      lahde: 'Valokuva: Toxophilus, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Toxophilus',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Maribo_Domkirke_fra_vandet.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-maribo-d66598c6.jpg',
        lyhyt: 'Näkymä Søndersøhön eli eteläiselle järvelle Maribon kohdalla.',
        selite: 'Søndersø on Lollandin suurin järvi, ja sen saaria on enemmän kuin missään '
          + 'muussa Tanskan järvessä. Kuvassa näkyy järven ranta ja ruovikkoa Maribon '
          + 'kohdalla.',
        lahde: 'Valokuva: Dinkum, Wikimedia Commons (CC0).',
        tekija: 'Dinkum',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_of_Sonderso_by_Maribo.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-maribo-53eff376.jpg',
        lyhyt: 'Laituri ja järvimaisema Søndersøllä Lollandin saarella.',
        selite: 'Kuvassa on puinen laituri Søndersø-järven rannalla Lollandilla. Järvi kuuluu '
          + 'Maribon järvien luonnonpuistoon.',
        lahde: 'Valokuva: bjaglin, Wikimedia Commons (CC BY 2.0).',
        tekija: 'bjaglin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:S%C3%B8nders%C3%B8,_Lolland.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Maribo',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Millainen oli Leonora Christina Ulfeldtin elämä ennen kuin hän päätyi Maribon luostariin?',
      'Mikä birgittalaisluostari oikein oli, ja miksi sellainen perustettiin Lollandille?',
    ],
    korostukset: ['birgittalaisluostari|birgittalaisluostariin', 'Leonora Christina Ulfeldt|Leonora Christina Ulfeldt'],
    nappi: 'Järvien ympäröimä kauppakaupunki; entisestä luostarikirkosta oli tehty '
      + 'tuomiokirkko 1800-luvun alussa',
    // 11.5011 E / 54.7747 N — en-Wikipedia "Maribo"
    laudat: {
      maailmankartta: { x: 6216.7, y: 1176.2 },
      europe: { x: 432, y: 453 },
    },
    teksti: 'Maribo on Lollandin saaren keskellä sijaitseva kauppakaupunki, josta on nykyään '
      + 'tullut Lollandin kunnan hallintokeskus. Kaupunkia ympäröivät pohjoisessa Nørresø '
      + 'ja etelässä Søndersø, joka on Lollandin suurin järvi ja jossa on enemmän saaria '
      + 'kuin missään muussa Tanskan järvessä. Kaupungin menneisyys liittyy '
      + 'birgittalaisluostariin, jonka perustamista auttoivat Vadstenan luostarista '
      + 'lähetetyt munkit. Luostari lakkautettiin vuonna 1536 ja muutettiin 1556 '
      + 'aatelisneitojen luostariksi, ja sen kirkosta tuli myöhemmin kaupungin kirkko. '
      + 'Vuosina 1803–1804 kirkko sai Lolland-Falsterin hiippakunnan tuomiokirkon aseman, '
      + 'ja kuningas Kristian IV:n tytär Leonora Christina Ulfeldt vietti luostarissa '
      + 'elämänsä viimeiset vuodet.',
    lahde: 'en-Wikipedia "Maribo", johdanto-osa ja osiot "Surroundings" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ebeltoft',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-ebeltoft-da20990c.jpg',
      lyhyt: 'Vanha ristikkotalo torin laidalla Ebeltoftin vanhassa kaupungissa.',
      selite: 'Kuvan otsikon mukaan kyseessä on vanha kaupunkitalo Ebeltoftissa, kuvattu '
        + 'kesäkuussa 2006. Kaupunki tunnetaan mukulakivikaduistaan ja vuosisatoja '
        + 'vanhoista ristikkotaloistaan.',
      lahde: 'Valokuva: Lars Larsen, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Lars Larsen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Torvet,_Ebeltoft,_Denmark_2006.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-ebeltoft-8ae99bc0.jpg',
        lyhyt: 'Mukulakivikatu ja matalia taloja Ebeltoftin vanhassa keskustassa.',
        selite: 'Kuva on Overgade-kadulta Ebeltoftin vanhasta keskustasta, jossa on '
          + 'mukulakivikatuja ja vanhoja taloja. Alueen suojelu käynnistettiin '
          + '1960-luvulla.',
        lahde: 'Valokuva: Gachepi, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Gachepi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Overgade,_Ebeltoft_2008.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-ebeltoft-15f040dc.jpg',
        lyhyt: 'Fregatten Jylland Ebeltoftissa kesällä 1978: perä kultakoristeineen ja '
          + 'Tanskan lippu.',
        selite: 'Kuva on otettu kesällä 1978, ja siinä näkyy fregatin perä ja Tanskan lippu. '
          + 'Fregatten Jylland on maailman pisin puinen sotalaiva.',
        lahde: 'Valokuva: BKP, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'BKP',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fregatten_Jylland_i_Ebeltoft.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Ebeltoft',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Mitä Poul la Cour tutki, kun hän teki varhaista työtä tuulivoiman parissa?',
      'Miksi juuri Ebeltoftin vanha keskusta haluttiin suojella 1960-luvulla?',
    ],
    korostukset: ['Fregatten Jylland|Fregatten Jylland', 'Poul la Cour|Poul la Cour'],
    nappi: 'Vanha satamakaupunki; lasimuseo perustetaan vasta 1985 ja vanhan keskustan '
      + 'suojelu alkaa 1960-luvulla',
    // 10.6781 E / 56.1936 N — en-Wikipedia "Ebeltoft"
    laudat: {
      maailmankartta: { x: 6189.3, y: 1110 },
      europe: { x: 416.2, y: 415.7 },
    },
    teksti: 'Ebeltoft on vanha satamakaupunki Jyllannin niemimaan Djurslandin niemellä, '
      + 'Tanskan keskisellä itärannikolla. Vanhan keskustan mukulakivikadut ja vuosisatoja '
      + 'vanhat ristikkotalot on haluttu säilyttää: suojelusuunnitelmat aloittivat '
      + '1960-luvulla kaupunginvaltuusto ja Tanskan kansallismuseo. Kaupungin '
      + 'nähtävyyksiin kuuluu Fregatten Jylland, joka on maailman pisin puinen sotalaiva. '
      + 'Lisäksi Ebeltoftissa toimii Glasmuseet Ebeltoft, yksi maailman ensimmäisistä '
      + 'lasimuseoista, jonka lasitaiteilijat Finn Lynggaard ja Tchai Munch perustivat '
      + 'vuonna 1985. Ebeltoftissa syntyi myös tiedemies ja keksijä Poul la Cour, joka '
      + 'teki varhaista työtä tuulivoiman parissa.',
    lahde: 'en-Wikipedia "Ebeltoft", johdanto-osa ja osiot "Tourism" ja "Notable people" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-tonder',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-tonder-dfff71c4.jpg',
      lyhyt: 'Vanhoja rakennuksia Tønderin keskustorin koillislaidalla.',
      selite: 'Kuva on otettu keväällä 2026 Tønderin keskustorilta, ja siinä näkyy torin '
        + 'koillispuolen rakennuksia. Kaupungin keskustassa on paljon 1600-luvun lopun ja '
        + '1700-luvun alun taloja.',
      lahde: 'Valokuva: Hjart, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Hjart',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Torvet,_T%C3%B8nder_2026_NE.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-tonder-57b4a9f7.jpg',
        lyhyt: 'Vestergade Tønderissa: punatiilisiä ja valkoisia taloja kadun varrella.',
        selite: 'Vestergade on katu Tønderin keskustassa. Kuvassa näkyy tiilisiä ja rapattuja '
          + 'taloja kadun varrella.',
        lahde: 'Valokuva: Hjart, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hjart',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vestergade,_T%C3%B8nder_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Tønder',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Miksi kaupunki liitettiin Tanskaan, vaikka useimmat asukkaat äänestivät Saksan puolesta?',
      'Miten pitsiteollisuus sai pienen kauppakaupungin kasvamaan nopeasti 1600- ja 1700-luvuilla?',
    ],
    korostukset: ['Hansaliitto|Hansaliitto', 'pitsiteollisuus|pitsiteollisuuden'],
    nappi: 'Vanha kauppakaupunki, joka oli vuoden 1864 jälkeen Saksan puolella ja palasi '
      + 'Tanskaan vasta 1920',
    // 8.8639 E / 54.9428 N — en-Wikipedia "Tønder"
    laudat: {
      maailmankartta: { x: 6128.8, y: 1168.4 },
      europe: { x: 381.4, y: 448.6 },
    },
    teksti: 'Tønder on kaupunki Etelä-Tanskan alueella lähellä Saksan rajaa ja Tønderin kunnan '
      + 'pääkaupunki. Hansaliitto myönsi sille satamaoikeudet vuonna 1243, ja sitä '
      + 'pidetään Tanskan vanhimpana etuoikeutettuna kauppakaupunkina. 1550-luvulla '
      + 'sataman suora yhteys mereen katkesi, kun kaupungin länsipuolelle rakennettiin '
      + 'penkereitä. Keskustaa hallitsevat 1600-luvun lopun ja 1700-luvun alun talot, '
      + 'jolloin kaupunki kasvoi nopeasti pitsiteollisuuden ansiosta. Ennen vuotta 1864 '
      + 'Tønder kuului Schleswigin herttuakuntaan, ja vuoden 1920 kansanäänestysten '
      + 'jälkeen se liitettiin Tanskaan, vaikka noin 76 prosenttia kaupunkilaisista '
      + 'äänesti Saksan puolesta.',
    lahde: 'en-Wikipedia "Tønder", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-nyborg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-nyborg-c8c1b9f5.jpg',
      lyhyt: 'Nyborgin linna pohjoispuolelta: punatiilinen keskiaikainen linna.',
      selite: 'Kuvassa on Nyborgin linna pohjoispuolelta. Linna on entisöity keskiaikainen '
        + 'linna Fynin saarella, ja siellä allekirjoitettiin Tanskan ensimmäinen '
        + 'perustuslaki vuonna 1282.',
      lahde: 'Valokuva: Htawmonzel, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Htawmonzel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nyborg_Slot_from_the_northern_side.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-nyborg-6ad060b8.jpg',
        lyhyt: 'Nyborgin linnan eteläpää, jossa pyöreä kulmatorni ja porrasmainen '
          + 'päätykolmio.',
        selite: 'Kuva näyttää linnan eteläpuolen punatiiliset seinät ja pyöreän kulmatornin. '
          + 'Linna perustettiin noin vuonna 1170.',
        lahde: 'Valokuva: Jebulon, Wikimedia Commons (CC0).',
        tekija: 'Jebulon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castle_Nyborg_Denmark.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/dnk-nosto-nyborg-a2209349.jpg',
        lyhyt: 'Kuningas Kristian III:n esi-isätaulu Nyborgin linnassa.',
        selite: 'Maalattu sukupuu eli esi-isätaulu (Ahnentafel) kuningas Kristian III:sta on '
          + 'esillä Nyborgin linnassa. Kristian III oleskeli linnassa usein ja teetti '
          + 'sinne uuden juhlasalin ja tornin 1540-luvulla.',
        lahde: 'Valokuva: Andree Stephan, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Andree Stephan',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pano_Ahnentafel_Nyborg_Castle.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Nyborgin linna',
    nimio: 'Nyborg',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Danehof oli, ja keitä siellä kokoontui päättämään maan asioista?',
      'Mitä Tanskan ensimmäinen perustuslaki vuonna 1282 oikeastaan tarkoitti kuninkaan vallalle?',
    ],
    korostukset: ['Danehof|Danehof', 'Eerik V Klipping|Eerik V Klipping'],
    nappi: 'Perustuslain ja parlamentin historiallinen linna; museoksi se entisöidään vasta '
      + '1917–1923',
    // 10.7878 E / 55.3139 N — en-Wikipedia "Nyborg Castle"
    laudat: {
      maailmankartta: { x: 6192.9, y: 1151.2 },
      europe: { x: 418.3, y: 438.8 },
    },
    teksti: 'Nyborgin linna on entisöity keskiaikainen linna Nyborgin kaupungissa Fynin '
      + 'saarella. Se perustettiin noin vuonna 1170, ja alun perin se oli vallihaudan '
      + 'ympäröimä neliönmuotoinen linna, jossa oli kulmatornit ja niiden välillä muuri. '
      + 'Kuningas Eerik V Klipping allekirjoitti linnassa Tanskan ensimmäisen perustuslain '
      + 'vuonna 1282, ja vuoteen 1413 asti linnan päärakennus oli keskiaikaisen '
      + 'parlamentin, Danehofin, pääasiallinen kokouspaikka. Kuningas Kristian III teetti '
      + '1540-luvulla uuden juhlasalin ja tornin. Ruotsin ja Tanskan välisessä sodassa '
      + '1657–58 linna vaurioitui pahoin, ja se entisöitiin 1900-luvun alussa museoksi.',
    lahde: 'en-Wikipedia "Nyborg Castle" (uudelleenohjaus: "Nyborg Slot"), johdanto-osa ja '
      + 'osiot "History" ja "Restoration" (tarkistettu 19.9.2026).',
  },
];
