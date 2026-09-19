/*
 * ROMANIAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Tanskan, Ruotsin
 * ja Suomen jälkeen Romania.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48 ja 51) =
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä muut EU-maiden pakat, viimeisimpänä Suomi
 * (js/packs/hahmotelma-fin.js): jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä en-Wikipedian (tarvittaessa ro-Wikipedian
 * lisälähteenä, kun en-artikkeli on tynkä) artikkelista omin sanoin
 * suomeksi (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville
 * artikkeli ja tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi
 * pulun kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva`
 * + `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä,
 * lisenssi ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). PAATOKSET 51: noin joka kolmannella nostolla
 * on lisäksi `visa`-kenttä (kysymys, neljä vaihtoehtoa, oikea indeksi,
 * fakta) täsmälleen kuten kaupunkien täkynostoilla (js/fokusnosto.js
 * nostonVisa): vastaus löytyy noston omasta tekstistä. Vuonna 1873
 * Romania on ruhtinaskunta (Karol I) ja Transilvania kuuluu
 * Itävalta-Unkarille; vuoden 1873 jälkeiset kohteet ovat mukana: teksti on
 * nykytietoa ja `nappi` katsoo vuodesta 1873 eteenpäin tai sanoo
 * rehellisesti, että kohde tulee vasta myöhemmin.
 *
 * MIKSI NÄMÄ KOHTEET: Romanian pakeissa (js/packs/maastokohteet-rou.js ja
 * fokuskohteet-rou.js sekä Bukarestin täkynostot) on jo Bran, Sighișoara,
 * Peleș, Transfăgărășan, Tonavan suisto, Iloinen hautausmaa, Moldoveanu,
 * Rautaportti, Constanța, Sarmizegetusa Regia, Turdan suolakaivos,
 * Corvinin linna, Nadia Comăneci, Voronețin luostari, Negoiu, Mustameri ja
 * Tonava sekä Karhusanktuaari. Tämän pakin kohteet eivät toista niitä (ei
 * samoja id:itä eikä nimiä). Piatra Craiului (4,8 Karhusanktuaarista),
 * Bucegi (4,2 Branista), Sinaia (0,4 Peleșistä) ja Râșnov jätettiin pois.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `rou-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/rou/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Bukarest, Romanian ainoa pelikaupunki) ulkopuolella, lähin
 * nosto (Ploiești) yli 8 lautayksikön päässä kaupungista (raja
 * KAUPUNGIN_KOHDALLA_SADE on 7), ja js/fokuskohteet.js liittää rivit
 * KOHDE_MAAT.ROU:hun. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Romanian fokuslehden rajaukseen
 * (`osuuLehteen`) ja ROU-renkaan sisään.
 */

/** Romanian hahmotelmanostot: sisällölliset kohteet kaupungin (Bukarest) ulkopuolella. */
export const HAHMOTELMA_ROU = [
  {
    id: 'hahmotelma-retezat',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-retezat-66ba59a6.jpg',
      lyhyt: 'Pietrele-järven rantaa ja lumisia huippuja Retezat-vuoristossa.',
      selite: 'Kuva esittää Pietrele-järveä Retezat-vuoristossa Romaniassa. Taustalla kohoavat '
        + 'kallioiset, osin lumen peittämät huiput.',
      lahde: 'Valokuva: Gugalcrom123, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Gugalcrom123',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Pietrele.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-retezat-06833409.jpg',
        lyhyt: 'Retezat-vuoriston laakso Bucura-järven lähellä.',
        selite: 'Kuvassa polku kulkee vuoristolaakson läpi Bucura-järven lähellä. Maisemaa '
          + 'hallitsevat kallio, ruoho ja matala pensaikko.',
        lahde: 'Valokuva: Gugalcrom123, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Gugalcrom123',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Muntii_Retezat_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-retezat-abd6d840.jpg',
        lyhyt: 'Kallioisia huippuja ja havumetsää Retezatin kansallispuistossa.',
        selite: 'Kuvassa havupuut reunustavat kalliorinteitä Retezatin kansallispuiston '
          + 'alueella.',
        lahde: 'Valokuva: Dioszegi Zoltan, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dioszegi Zoltan',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Retezat_National.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Retezatin kansallispuisto',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Retezatia kutsutaan usein Euroopan viimeiseksi koskemattomaksi metsäksi?',
      'Mitä tarkoittaa "vanha metsä", ja miksi sellaista on Euroopassa jäljellä niin vähän?',
    ],
    korostukset: ['Peleaga|Peleaga', 'Gemenele|Gemenelen'],
    nappi: 'Kasvitieteilijät tutkivat vuoristoa jo 1800-luvun alusta; kansallispuistoksi se '
      + 'tulee vasta vuonna 1935',
    // 22.83 E / 45.34 N — en-Wikipedia "Retezat National Park"
    laudat: {
      maailmankartta: { x: 6594.3, y: 1587.7 },
      europe: { x: 649.5, y: 701.2 },
    },
    teksti: 'Retezatin kansallispuisto sijaitsee Retezat-vuoristossa Hunedoaran läänissä, ja '
      + 'se on Romanian vanhin kansallispuisto: se perustettiin vuonna 1935. Puistossa on '
      + 'yli kuusikymmentä yli 2 300 metrin huippua ja noin kahdeksankymmentä '
      + 'jäätikköjärveä, ja korkein huippu Peleaga kohoaa 2 509 metriin. Kasvilajeja on '
      + 'noin 1 190, mikä on yli kolmannes koko Romanian kasvistosta, ja Gemenelen '
      + 'suojelualueella on 1 800 hehtaaria koskematonta vanhaa metsää. Alueella elää muun '
      + 'muassa ruskeakarhu, susi ja ilves sekä kotkia, joista kultakotka on puiston '
      + 'tunnuksena.',
    lahde: 'en-Wikipedia "Retezat National Park", johdanto-osa ja osiot "History", '
      + '"Description", "Flora" ja "Fauna" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Retezatin kansallispuisto perustettiin Romanian ensimmäiseksi '
        + 'kansallispuistoksi?',
      vaihtoehdot: [
        '1908',
        '1921',
        '1935',
        '1949',
      ],
      oikea: 2,
      fakta: 'Vuonna 1979 UNESCO otti alueen biosfäärialueiden verkostoonsa, ja vuonna 2008 '
        + 'puisto sai Euroopan suojelualuediplomin.',
    },
  },
  {
    id: 'hahmotelma-bicaz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-bicaz-63e8ab75.jpg',
      lyhyt: 'Tie kulkee kallioseinämien välissä Bicazin rotkossa.',
      selite: 'Kuva on otettu Bicazin rotkossa vuonna 2006. Jyrkät kalliot kohoavat tien yllä, '
        + 'ja tien vieressä virtaa joki.',
      lahde: 'Valokuva: Laurap (Commonsin sivun mukaan oletettu tekijä), Wikimedia Commons (Public domain).',
      tekija: 'Laurap (Commonsin sivun mukaan oletettu tekijä)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chei_Bicaz_045.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-bicaz-d1d69ade.jpg',
        lyhyt: 'Hiusneulakäänne valtatiellä DN12C Bicaz-Chein kohdalla.',
        selite: 'Valtatie DN12C tekee jyrkän käänteen Bicazin rotkon alueella Bicaz-Chein '
          + 'kohdalla vuonna 2017. Sumuiset metsärinteet nousevat tien ympärillä.',
        lahde: 'Valokuva: DimiTalen, Wikimedia Commons (CC0).',
        tekija: 'DimiTalen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hairpin_turn_in_the_DN12C_in_the_Bicaz_Canyon,_Bicaz-Chei,_2017.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-bicaz-09cdea89.jpg',
        lyhyt: 'Punaisen järven vihreä vesi ja metsäiset rinteet.',
        selite: 'Lacu Roșu eli Punainen järvi Bicazin rotkon lähellä. Kuvassa soutuveneitä '
          + 'rannalla ja havumetsää rinteillä.',
        lahde: 'Valokuva: Mihai mad, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Mihai mad',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lacu_Rosu.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Bicazin rotko',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi joki pystyy kaivertamaan kalkkikiveen näin syvän rotkon?',
      'Miksi Moldovan ja Transilvanian välinen tie kulkee juuri rotkon kautta?',
    ],
    korostukset: ['Lacu Roșu|Lacu Roșu', 'Hășmaș|Hășmaș-vuorten'],
    nappi: 'Bicaz-joen kaivertama rotko, jota pitkin kulkee reitti Moldovan ja Transilvanian '
      + 'välillä',
    // 25.8189 E / 46.812 N — en-Wikipedia "Bicaz Gorge"
    laudat: {
      maailmankartta: { x: 6694, y: 1526.4 },
      europe: { x: 706.9, y: 662.4 },
    },
    teksti: 'Bicazin rotko (romaniaksi Cheile Bicazului, unkariksi Békás-szoros) on rotko '
      + 'Koillis-Romaniassa, Neamțin ja Harghitan läänien alueella Hășmaș-vuorten '
      + 'keskiosassa. Bicaz-joen vedet ovat kaivertaneet sen jurakauden kalkkikiveen, ja '
      + 'se on kulkuväylä Moldovan ja Transilvanian välillä. Valtatie DN12C kulkee rotkon '
      + 'jyrkkien seinämien välissä noin kahdeksan kilometrin matkan. Rotkon yhteydessä on '
      + 'myös Punainen järvi eli Lacu Roșu. Koko alue kuuluu Cheile Bicazului–Hășmașin '
      + 'kansallispuistoon.',
    lahde: 'en-Wikipedia "Bicaz Gorge" ja ro-Wikipedia "Cheile Bicazului", johdanto-osat '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ceahlau',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-ceahlau-b1cbc7ff.jpg',
      lyhyt: 'Toacan huippu Ceahlăun vuoristossa kesäasussa.',
      selite: 'Tiedoston kuvauksen mukaan Toaca (1 904 m) on Ceahlăun vuoriston toiseksi '
        + 'korkein huippu. Etualalla on vihreää vuoristokasvillisuutta.',
      lahde: 'Valokuva: xulescu_g, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'xulescu_g',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:V%C3%A2rful_Toaca_(Toaca_peak),_Ceahl%C4%83u_mountains,_Romania_(52290098053).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-ceahlau-032576d1.jpg',
        lyhyt: 'Talvinen Ceahlău: lumen peittämiä kallioita ja Toacan huippu.',
        selite: 'Kuvassa lumen peittämä kallioinen rinne ja havupuita; näkymässä ovat Piatra '
          + 'Ciobanului ja Toacan huippu.',
        lahde: 'Valokuva: Just In AR, Wikimedia Commons (CC0).',
        tekija: 'Just In AR',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ceahl%C4%83u.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-ceahlau-5755a010.jpg',
        lyhyt: 'Panaghia-kallio Ceahlăun massiivissa, korkeus 1 767 metriä.',
        selite: 'Pystysuora kalliotorni, jota kutsutaan nimellä Panaghia. Vieressä oleva '
          + 'opastaulu ilmoittaa sen korkeudeksi 1 767 metriä.',
        lahde: 'Valokuva: Just In AR, Wikimedia Commons (CC0).',
        tekija: 'Just In AR',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panaghia,_Ceahl%C4%83u.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Ceahlău-massiivi',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi vuoren huipuilla on niin paljon kylmempää kuin sen juurella?',
      'Mitä tarkoittaa, että kansallispuisto suojelee "endeemisiä" lajeja?',
    ],
    korostukset: ['Duruitoarea|Duruitoarea', 'Panaghia|Panaghia'],
    nappi: 'Moldovan puolen Itäkarpaattien vuori, joka on nykyään yksi Romanian tunnetuimpia',
    // 25.9457 E / 46.955 N — en-Wikipedia "Ceahlău Massif"
    laudat: {
      maailmankartta: { x: 6698.2, y: 1520.4 },
      europe: { x: 709.4, y: 658.7 },
    },
    teksti: 'Ceahlău-massiivi on yksi Romanian tunnetuimmista vuorista, ja se kuuluu '
      + 'Itäkarpaattien Bistrița-vuorten ryhmään Neamțin läänissä Moldovassa. Tärkeimmät '
      + 'huiput ovat Ocolașul Mare (1 907 metriä) ja Toaca (1 904 metriä). Vuoren '
      + 'itäpuolella virtaa Bistrița-joki ja etelässä Bicaz-joki. Alueen nähtävyyksiin '
      + 'kuuluvat kaksiportainen, noin 30 metriä korkea Duruitoarea-vesiputous ja '
      + 'Panaghia-kallio. Toacan sääasemalla vuoden keskilämpötila on vain noin 1,3 °C, ja '
      + 'vuorelle johtaa seitsemän merkittyä patikkareittiä.',
    lahde: 'en-Wikipedia "Ceahlău Massif" ja ro-Wikipedia "Masivul Ceahlău", johdanto-osat '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-berca',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-berca-c29f1054.jpg',
      lyhyt: 'Kuivuneita mutakartioita Pâclele Marin alueella.',
      selite: 'Kuvassa kuivuneen mudan muodostamia kartioita ja uurteita Pâclele Marin '
        + 'mutatulivuorialueella. Kasvillisuutta ei juuri ole.',
      lahde: 'Valokuva: Whitepixels, Wikimedia Commons (CC0).',
      tekija: 'Whitepixels',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:RO_Berca_mud_volcanoes_11.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-berca-e3434ca6.jpg',
        lyhyt: 'Mutatulivuoren kartio ja mutarenkaat Pâclele Marin suojelualueella.',
        selite: 'Kuvassa pieni mutakartio, jota ympäröivät sisäkkäiset mutarenkaat.',
        lahde: 'Valokuva: Bogdan Muraru, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Bogdan Muraru',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:P%C3%A2clele_mari.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-berca-afa9a384.jpg',
        lyhyt: 'Lähikuva mutatulivuoren märästä, kiiltävästä mudasta.',
        selite: 'Lähikuvassa kiiltävää harmaata mutaa suojelualueella Buzăun läänissä. Muta on '
          + 'kylmää, koska se nousee maankuoren kerroksista.',
        lahde: 'Valokuva: Radu Ana Maria, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Radu Ana Maria',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:RO_BZ_Berca_Mud_Volcanoes_7.JPG',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Bercan mutatulivuoret',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi mutakartioiden ympärillä ei kasva juuri mitään?',
      'Mistä kaasu ja muta oikein tulevat kolmen kilometrin syvyydestä?',
    ],
    korostukset: ['metaani|metaania', 'Buzău|Buzăun'],
    nappi: 'Romanian ainoa laatuaan: metaanikaasu työntää suolaista mutaa yhä pintaan Buzăun '
      + 'kukkuloilla',
    // 26.7167 E / 45.35 N — en-Wikipedia "Berca Mud Volcanoes"
    laudat: {
      maailmankartta: { x: 6723.9, y: 1587.3 },
      europe: { x: 724.2, y: 700.9 },
    },
    teksti: 'Bercan mutatulivuoret (romaniaksi Noroioși de la Pâclele Mici) ovat geologinen ja '
      + 'kasvitieteellinen suojelualue Buzăun läänissä Scorțoasan kunnassa. Tulivuorta '
      + 'muistuttavat kartiot, jotka ovat tavallisesti muutaman metrin korkuisia, syntyvät '
      + 'kolmen kilometrin syvyydestä nousevasta kaasusta, joka työntää suolaista vettä ja '
      + 'mutaa pintaan. Kaasu on enimmäkseen metaania. Muta on kylmää, koska se tulee '
      + 'maankuoren kerroksista eikä vaipasta, ja pinnalla se kuivuu kiinteäksi kartioksi. '
      + 'Maaperä on niin suolaista, että kasvillisuutta on vähän, ja maisema muistuttaa '
      + 'kuunpintaa. Romaniassa alue on ainoa laatuaan.',
    lahde: 'en-Wikipedia "Berca Mud Volcanoes", johdanto-osa ja osiot "The geological '
      + 'phenomenon", "Gases" ja "Flora" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi Bercan mutatulivuorten muta on kylmää?',
      vaihtoehdot: [
        'Se nousee maankuoren kerroksista, ei vaipasta',
        'Se sekoittuu jäiseen pohjaveteen ennen purkausta',
        'Suolapitoisuus laskee sen lämpötilaa pinnalla',
        'Kuivuva kuori jäähdyttää sen heti maan pinnalla',
      ],
      oikea: 0,
      fakta: 'Alueelle pääsee vierailijana vain kuivina päivinä, koska kuivunut mutakuori ei '
        + 'ole täysin kiinteä ja kävely märällä säällä vahingoittaisi ainutlaatuista '
        + 'ympäristöä. Suolaisessa maaperässä viihtyy joitakin harvinaisia kasveja, '
        + 'esimerkiksi Nitraria schoberi.',
    },
  },
  {
    id: 'hahmotelma-scarisoara',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-scarisoara-2d95de4e.jpg',
      lyhyt: 'Valaistuja jääpuikkoja Scărișoaran jääluolan seinämällä.',
      selite: 'Kuvassa jääpuikkoja ja kalkkikiviluolan kalliopinta. Tiedoston kuvauksen mukaan '
        + 'kyseessä ovat jääpuikot (jäätippukivet) Scărișoaran luolassa.',
      lahde: 'Valokuva: E.Coman, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'E.Coman',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:PesteraScarisoaraStalactite.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-scarisoara-37703bd3.jpg',
        lyhyt: 'Scărișoaran luolan Kirkko-sali eli Kirchensaal kesällä 2017.',
        selite: 'Kuvassa luolan sali, jonka läpi kulkee puinen kävelysilta punaisine '
          + 'kaiteineen. Kuva on otettu 16.6.2017 luolan Kirkko-salissa.',
        lahde: 'Valokuva: Mpdus, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Mpdus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kirchensaal_Sommer_2017.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-scarisoara-9be66827.jpg',
        lyhyt: 'Puinen kävelysilta kulkee Scărișoaran luolan sisällä.',
        selite: 'Kuvassa kävelysilta punaisine kaiteineen johtaa pimeään luolaan; kalliota '
          + 'peittää sammal.',
        lahde: 'Valokuva: Țetcu Mircea Rareș, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Țetcu Mircea Rareș',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:RO_AB_Pestera_Scarisoara_(2).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Scărișoaran jääluola',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi luolan jää ei sula kesälläkään?',
      'Miten kalkkikiveen voi syntyä näin suuri luola?',
    ],
    korostukset: ['Apuseni|Apuseni-vuorten', 'Pholeuon prozerpinae glaciale|Pholeuon prozerpinae glaciale'],
    nappi: 'Schmidl oli maininnut ja kartoittanut luolan 1863; Racoviță tutkii sen vasta '
      + '1921–1923',
    // 22.8097 E / 46.4897 N — en-Wikipedia "Scărișoara Ice Cave"
    laudat: {
      maailmankartta: { x: 6593.7, y: 1539.9 },
      europe: { x: 649.1, y: 670.9 },
    },
    teksti: 'Scărișoaran jääluola on yksi Apuseni-vuorten suurimmista jääluolista Romanian '
      + 'länsiosassa, ja se on esittelyluola sekä yksi maan luonnonihmeistä. '
      + 'Sisäänkäyntikuilu on halkaisijaltaan 60 metriä ja syvyydeltään 50 metriä, ja '
      + 'metalliportaat johtavat sen kautta suureen saliin. Salissa on lähes 18 metriä '
      + 'korkea jääseinämä, ja luolan jäätä arvioidaan olevan noin 75 000 kuutiometriä. '
      + 'Kesällä lämpötila nousee enintään yhteen plusasteeseen ja talvella laskee noin '
      + 'seitsemään pakkasasteeseen. Luolassa elää lepakoita sekä pieniä, 2–3 millimetrin '
      + 'mittaisia Pholeuon prozerpinae glaciale -hyönteisiä.',
    lahde: 'en-Wikipedia "Scărișoara Cave", johdanto-osa ja osiot "History" ja "Description" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuinka syvä Scărișoaran jääluolan sisäänkäyntikuilu on?',
      vaihtoehdot: [
        '20 metriä',
        '35 metriä',
        '80 metriä',
        '50 metriä',
      ],
      oikea: 3,
      fakta: 'Luola on noin 720 metriä pitkä ja sijaitsee noin 1 150 metrin korkeudessa. Vain '
        + 'osa siitä on avoinna matkailijoille, ja muut salit on varattu tieteelliselle '
        + 'tutkimukselle.',
    },
  },
  {
    id: 'hahmotelma-sovata',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sovata-3944611b.jpg',
      lyhyt: 'Ilmakuva Ursu-järvestä ja kylpylärakennuksista Sovatassa.',
      selite: 'Kuvassa Ursu-järvi ("Karhujärvi") metsäisten kukkuloiden keskellä ja sen '
        + 'rannalla hotelli- ja kylpyläkortteleita.',
      lahde: 'Valokuva: Sie, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Sie',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Medve-t%C3%B3_l%C3%A9gi.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sovata-4a3d544f.jpg',
        lyhyt: 'Ursu-järvi ja rannan rakennukset lehdettömien puiden lomasta.',
        selite: 'Näkymä Ursu-järven yli sen rannan rakennuksille Sovatassa Mureșin läänissä.',
        lahde: 'Valokuva: Țetcu Mircea Rareș, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Țetcu Mircea Rareș',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:RO_Sovata_Lacul_Ursu_2024_(3).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sovata-e2fd761d.jpg',
        lyhyt: 'Ursu-järven rannan kylpylä mustavalkokuvassa vuodelta 2017.',
        selite: 'Lehvistön läpi otettu mustavalkoinen kuva Ursu-järven rannan '
          + 'kylpylärakennuksesta Sovatassa; kuva on otettu järven vastarannalta.',
        lahde: 'Valokuva: DimiTalen, Wikimedia Commons (CC0).',
        tekija: 'DimiTalen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lacul_Ursu_resort,_seen_through_foliage_from_across_the_lake,_Sovata,_2017.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Sovata',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi suolaiset järvet houkuttelivat 1800-luvun lopulla kylpylävieraita Sovataan?',
      'Miten järvi voi syntyä "geologisten tapahtumien" seurauksena?',
    ],
    korostukset: ['Ursu-järvi|Ursu-järvi', 'Székelyföld|Székelyföldin'],
    nappi: 'Kylpyläkylä Transilvaniassa; Ursu-järvi syntyy vasta vuonna 1875',
    // 25.0744 E / 46.5961 N — en-Wikipedia "Sovata"
    laudat: {
      maailmankartta: { x: 6669.1, y: 1535.5 },
      europe: { x: 692.6, y: 668.1 },
    },
    teksti: 'Sovata on kylpyläkaupunki Transilvaniassa Mureșin läänissä, noin 60 kilometrin '
      + 'päässä läänin pääkaupungista Târgu Mureșista. Se sijaitsee Gurghiu-vuorten '
      + 'juurella Székelyföldin alueella. Ensimmäiset tiedot kylästä ovat vuodelta 1578, '
      + 'ja kaupungin aseman se sai vuonna 1952. Suolaisten järvien ja lämpimän veden '
      + 'ansiosta paikasta tuli 1800-luvun lopulla ja 1900-luvulla yhä suositumpi '
      + 'terveyskylpylä. Ursu-järvi eli Karhujärvi syntyi geologisten tapahtumien '
      + 'seurauksena vuonna 1875; sen vesi on suolaista ja auringon lämmittämää, ja sillä '
      + 'uskotaan olevan hoitavia vaikutuksia.',
    lahde: 'en-Wikipedia "Sovata", johdanto-osa ja osiot "Geography", "History" ja "Spa" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sfanta-ana',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sfanta-ana-e3b2dcc9.jpg',
      lyhyt: 'Pyhän Annan järvi ja metsäiset rinteet kesävalossa.',
      selite: 'Järven rannalla kasvaa koivu, ja vastarannalla kohoaa metsäinen rinne. Järvi on '
        + 'Transilvaniassa lähellä Băile Tușnadia.',
      lahde: 'Valokuva: Várkonyi Tibor, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Várkonyi Tibor',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Szent_Anna-t%C3%B3-1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sfanta-ana-57cdcad3.jpg',
        lyhyt: 'Metsäinen rinne kohoaa Pyhän Annan järven yllä.',
        selite: 'Kuva on otettu järven rannalta vuonna 2006. Havumetsä ja lehtipuut peittävät '
          + 'ympäröivän rinteen, ja vesi on tyyni.',
        lahde: 'Valokuva: Csanády (oletettu tekijä Commons-sivun mukaan), Wikimedia Commons (Public domain).',
        tekija: 'Csanády (oletettu tekijä Commons-sivun mukaan)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Szent_Anna_t%C3%B3_3.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sfanta-ana-bfc275c5.jpg',
        lyhyt: 'Pieni kappeli Pyhän Annan järven rannalla.',
        selite: 'Etualalla on järven nimikkopyhän kunniaksi rakennettu kappeli ja taustalla '
          + 'häämöttää järvi. Järven lähellä on roomalaiskatolinen Pyhän Annan kappeli.',
        lahde: 'Valokuva: Csanády (oletettu tekijä Commons-sivun mukaan), Wikimedia Commons (Public domain).',
        tekija: 'Csanády (oletettu tekijä Commons-sivun mukaan)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Szent_Anna_t%C3%B3_k%C3%A1polna.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Pyhän Annan järvi',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miten tulivuoren kraatteriin voi syntyä järvi?',
      'Miksi Pyhän Annan järven vesi on lähes tislatun veden puhdasta?',
    ],
    korostukset: ['Ciomad|Ciomad', 'kraatterijärvi|kraatterijärvi'],
    nappi: 'Kuusi vuotta aiemmin, 1867, kraatterijärvi oli vielä 12 metriä syvä; nyt alle '
      + 'seitsemän',
    // 25.8881 E / 46.1264 N — en-Wikipedia "Lake Sfânta Ana"
    laudat: {
      maailmankartta: { x: 6696.3, y: 1555.1 },
      europe: { x: 708.3, y: 680.5 },
    },
    teksti: 'Pyhän Annan järvi on Romanian ainoa kraatterijärvi, ja se täyttää '
      + 'Ciomad-tulivuoren kraatterin Itäisillä Karpaateilla Tușnadin lähellä. Lähes '
      + 'pyöreä järvi on noin 620 metriä pitkä ja 460 metriä leveä, ja se sijaitsee 946 '
      + 'metrin korkeudessa. Vettä tulee vain sateesta, joten se on hyvin vähämineraalista '
      + 'ja puhtaudeltaan lähes tislatun veden luokkaa. Tutkijat arvioivat tulivuoren '
      + 'viimeisen purkauksen tapahtuneen 9 800–32 000 vuotta sitten, eikä tarkkaa ikää '
      + 'tiedetä. Järvi madaltuu jatkuvasti: vuonna 1867 sen syvyys oli 12 metriä, nykyään '
      + 'alle seitsemän.',
    lahde: 'en-Wikipedia "Lake Sfânta Ana", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-bigar',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-bigar-bdfbb200.jpg',
      lyhyt: 'Bigărin putous sammaloituneine kallioineen kanjonin metsässä.',
      selite: 'Pitkällä valotusajalla otetussa kuvassa vesi valuu ohuina nauhoina sammaleisen '
        + 'kalliomuodostelman yli. Ylhäällä kulkee kävelysilta.',
      lahde: 'Valokuva: Giuseppe Milo, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Giuseppe Milo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bigar_Waterfall_Romania_Travel_Photography_(225471007).jpeg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-bigar-c1db5f1d.jpg',
        lyhyt: 'Bigărin putous Nera–Beușnițan kansallispuistossa.',
        selite: 'Vesi syöksyy sammaloituneen kalliokynnyksen yli jokeen, ja putouksen yllä '
          + 'kulkee silta. Paikka on Caraș-Severinin läänissä.',
        lahde: 'Valokuva: Zamolx, Wikimedia Commons (Public domain).',
        tekija: 'Zamolx',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cascada_bigar.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-bigar-f44a40fd.jpg',
        lyhyt: 'Pienempi putous Bigărin lähteen alueella.',
        selite: 'Kuvassa vaahtoava vesi putoaa kynnyksen yli Bigărin lähteen (Izbucul Bigăr) '
          + 'alueella. Ympärillä kasvaa sammaloituneita kiviä ja puita.',
        lahde: 'Valokuva: Zamolx (MyName), Wikimedia Commons (Public domain).',
        tekija: 'Zamolx (MyName)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Martie_2009_367.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Bigărin vesiputous',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Mitä travertiini on ja miten siitä voi kasvaa vesiputous?',
      'Miksi osa Bigărin putouksesta romahti kesäkuussa 2021?',
    ],
    korostukset: ['travertiini|travertiinista', '45. leveyspiiri|45. leveyspiirin'],
    nappi: 'Suojelualueeksi se perustettiin vasta 1982, ja matkailulehdet esittelivät sen '
      + '2010',
    // 21.9597 E / 45.0034 N — en-Wikipedia "Izvorul Bigăr"
    laudat: {
      maailmankartta: { x: 6565.3, y: 1601.6 },
      europe: { x: 632.8, y: 710 },
    },
    teksti: 'Bigărin vesiputous sijaitsee Caraș-Severinin läänissä Lounais-Romaniassa Aninan '
      + 'vuorilla, Cheile Nerei–Beușnițan kansallispuistossa. Sen ruokkijana on voimakas '
      + 'karstilähde, jonka vesi virtaa maanalaista reittiä saman nimisen luolan läpi. '
      + 'Noin 200 metrin päässä lähteestä kalkkipitoinen vesi putoaa kalliokynnykseltä '
      + 'Minișjokeen ja on kasvattanut travertiinista eli kalkkitufasta putouksen, jossa '
      + 'vesi leviää ohuiksi suihkuiksi. Putous on aivan 45. leveyspiirin tuntumassa, '
      + 'suunnilleen puolivälissä päiväntasaajaa ja pohjoisnapaa. Kesäkuussa 2021 osa '
      + 'putouksesta romahti, kun travertiinin ja sammalen paino oli kasvanut liian '
      + 'suureksi.',
    lahde: 'en-Wikipedia "Izvorul Bigăr" ja ro-Wikipedia "Izvorul Bigăr", johdanto-osat '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-biertan',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-biertan-7143dd1a.jpg',
      lyhyt: 'Biertanin linnoitettu kirkko muureineen ja torneineen.',
      selite: 'Kirkon ympärillä on monikerroksinen puolustusmuuri tornineen, ja taustalla '
        + 'nousee vihreä rinne. Biertanin linnoitettu kirkko sijaitsee Transilvaniassa.',
      lahde: 'Valokuva: Otto Schemmel, Wikimedia Commons (Public domain).',
      tekija: 'Otto Schemmel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kirchenburg_Birth%C3%A4lm.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-biertan-50574e13.jpg',
        lyhyt: 'Biertanin linnoitettu kirkko kohoaa kylän kattojen yläpuolelle.',
        selite: 'Kuvassa on evankelisen linnoitetun kirkon kokonaisuus. Kirkko ja sen tornit '
          + 'kohoavat kukkulalla talojen yläpuolella.',
        lahde: 'Valokuva: Neighbor\'s goat, Wikimedia Commons (CC BY-SA 3.0 ro).',
        tekija: 'Neighbor\'s goat',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Biertan_-_Ansamblul_bisericii_evanghelice_fortificate.jpg',
        lisenssi: 'CC BY-SA 3.0 ro',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-biertan-7244ad00.jpg',
        lyhyt: 'Kivetty kulkuväylä Biertanin kirkkolinnoituksen sisäänkäynnillä.',
        selite: 'Kuvauksen mukaan kuvassa on yksi kirkkoa ympäröivän linnoituksen '
          + 'sisäänkäynneistä. Paksujen kivimuurien välissä kulkeva käytävä jatkuu useiden '
          + 'holvikaarien läpi.',
        lahde: 'Valokuva: Alessio Damato, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Alessio Damato',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Biertan_fortified_church_entrance.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Biertan',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Keitä transilvanian saksalaiset olivat ja miten he päätyivät Transilvaniaan?',
      'Miksi kirkko rakennettiin linnoituksen tavoin muurien ja tornien suojaan?',
    ],
    korostukset: ['Unesco|Unescon', 'Transilvanian saksalaiset|Transilvanian saksalaiset'],
    nappi: 'Kuusi vuotta aiemmin, 1867, linnoituskirkko oli vielä Transilvanian luterilaisen '
      + 'piispan istuin',
    // 24.5236 E / 46.1397 N — en-Wikipedia "Biertan"
    laudat: {
      maailmankartta: { x: 6650.8, y: 1554.5 },
      europe: { x: 682.1, y: 680.1 },
    },
    teksti: 'Biertan on kylä Sibiun läänissä Transilvaniassa, ja sen linnoitettu kirkko on '
      + 'kuulunut Unescon maailmanperintökohteisiin vuodesta 1993. Kylän perustivat '
      + 'Transilvanian saksalaiset joskus vuosien 1224 ja 1283 välillä, ja siitä kasvoi '
      + 'nopeasti tärkeä kauppapaikka: vuonna 1510 asukkaita oli noin 5 000. Pieni '
      + 'kirkkolinnoitus rakennettiin ja laajennettiin vuodesta 1468 alkaen 1500-luvulle. '
      + 'Kirkko oli Transilvanian evankelis-luterilaisen piispan istuin vuosina 1572–1867. '
      + 'Nykyään Biertanissa asuu noin 1 600 ihmistä, ja se on yksi Transilvanian eniten '
      + 'vierailluista kylistä.',
    lahde: 'en-Wikipedia "Biertan", johdanto-osa ja osiot "History" ja "Demographics" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuosina Biertanin linnoitettu kirkko oli Transilvanian '
        + 'evankelis-luterilaisen piispan istuin?',
      vaihtoehdot: [
        '1283–1510',
        '1572–1867',
        '1468–1572',
        '1510–1867',
      ],
      oikea: 1,
      fakta: 'Biertanin kunta koostuu kolmesta kylästä, ja jokaisessa niistä on oma '
        + 'linnoitettu kirkkonsa. Kunnan läpi kulkee myös Via Transilvanica -pitkän matkan '
        + 'vaellusreitti.',
    },
  },
  {
    id: 'hahmotelma-prejmer',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-prejmer-89e8bc95.jpg',
      lyhyt: 'Prejmerin linnoitetun kirkon valkoinen kehämuuri ja kellotorni.',
      selite: 'Kuvassa näkyy kirkkoa ympäröivä pitkä valkoinen muuri ja sen takaa nouseva '
        + 'kellotorni. Paikka on Prejmer (saksaksi Tartlau).',
      lahde: 'Valokuva: Marion Schneider & Christoph Aistleitner, Wikimedia Commons (Public domain).',
      tekija: 'Marion Schneider & Christoph Aistleitner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Prejmer_200609.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-prejmer-e9da0528.jpg',
        lyhyt: 'Prejmerin linnoituskirkon sisäpiha ja monikerroksiset puurakenteet.',
        selite: 'Kuvauksen mukaan kuva on linnoitetun kirkon sisäpihalta. Muurin sisäpuolella '
          + 'kulkevat monikerroksiset huonerivit portaineen, joissa kyläläiset saattoivat '
          + 'suojautua.',
        lahde: 'Valokuva: Myrabella, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Myrabella',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eglise_fortifiee_Prejmer_cour.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-prejmer-9a2b6774.jpg',
        lyhyt: 'Linnoituskirkon muurin kulkukäytävä ampuma-aukkoineen.',
        selite: 'Kyseessä on Tartlaun eli Prejmerin linnoituskirkon muurin ylin kulkukäytävä. '
          + 'Muurin seinässä on ampuma-aukkoja, joista puolustajat pystyivät torjumaan '
          + 'hyökkääjiä.',
        lahde: 'Valokuva: Bettina Vier, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Bettina Vier',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rum%C3%A4nien_-_Tartlau_Prejmer_-_Wehrgang.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Prejmer',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Keitä saksalaisritarit olivat ja miksi he asuttivat Burzenlandia?',
      'Miksi kirkon ympärille rakennettiin 12 metriä korkea muuri ja tornit?',
    ],
    korostukset: ['Burzenland|Burzenlandin', 'saksalaisritarit|Saksalaisritarit'],
    nappi: 'Ritarien 1212 rakentama linnake oli jo 650-vuotias; entisöinti tehtiin vasta '
      + '1962–1970',
    // 25.7667 E / 45.7167 N — en-Wikipedia "Prejmer"
    laudat: {
      maailmankartta: { x: 6692.2, y: 1572.1 },
      europe: { x: 705.9, y: 691.3 },
    },
    teksti: 'Prejmer on Brașovin läänissä Transilvaniassa, noin 18 kilometriä Brașovista '
      + 'koilliseen. Saksalaisritarit rakensivat linnakkeen vuosina 1212–1213 osana '
      + 'Burzenlandin asuttamista, ja sen vieressä kasvanut kylä oli Transilvanian '
      + 'saksalaisten itäisin asutus. Kirkkoa ympäröi 1400-luvulla 12 metriä korkea muuri, '
      + 'jota vahvistivat neljä hevosenkengän muotoista tornia, ja muurin sisäpuolen '
      + 'neljässä kerroksessa oli varastoja ja huoneita kyläläisille. Linnoitusta '
      + 'uhkasivat keskiajalla monet hyökkääjät, mutta se valloitettiin vain kerran, kun '
      + 'Gabriel Báthory otti sen vuonna 1611. Kirkko on yksi Itä-Euroopan parhaiten '
      + 'säilyneistä omassa lajissaan.',
    lahde: 'en-Wikipedia "Prejmer", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-alba-iulia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-alba-iulia-b82bc230.jpg',
      lyhyt: 'Alba Carolinan linnoituksen tiilinen bastioni ja muuri.',
      selite: 'Kuvassa näkyy linnoituksen paksu tiilimuuri ja pyöreä bastioni, jonka edessä on '
        + 'kukkaistutus. Taustalla häämöttää kaupunkia.',
      lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pudelek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alba_Iulia_(Gyulafeh%C3%A9rv%C3%A1r,_Karlsburg)_-_fortress.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-alba-iulia-7e5b3e8e.jpg',
        lyhyt: 'Sfântul Capistrano -katu linnoituksen muurien välissä.',
        selite: 'Kuvan otsikon mukaan katu kulkee Alba Carolinan linnoituksen kehämuurien '
          + 'sisäpuolella vuonna 2017. Vasemmalla kohoaa vallin rinne ja taustalla näkyy '
          + 'torni.',
        lahde: 'Valokuva: DimiTalen, Wikimedia Commons (CC0).',
        tekija: 'DimiTalen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aleea_Sf%C3%A2ntul_Capistrano_within_the_curtain_wall_of_Alba_Carolina_Citadel,_Alba_Iulia,_2017.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-alba-iulia-02d2a01d.jpg',
        lyhyt: 'Linnoituksen ensimmäinen portti ulkopuolelta katsottuna.',
        selite: 'Kuva esittää Alba Carolinan linnoituksen ensimmäistä porttia ulkopuolelta. '
          + 'Portin päällä on kuvanveistoksia ja kotkakoriste.',
        lahde: 'Valokuva: Ciprian Lazar from Alba Iulia, Romania, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Ciprian Lazar from Alba Iulia, Romania',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Poarta_I,_Cetatea_Alba_Carolina,_Alba_Iulia_-_exterior.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Alba Carolina -linnoitus',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi linnoitus rakennettiin tähden muotoon?',
      'Mitä linnoituksen paikalla oli ennen Habsburgien aikaa?',
    ],
    korostukset: ['Vauban|Vaubanin', 'Apulum|Apulum'],
    nappi: 'Habsburgien 1715–1738 rakentama tähtilinnoitus oli vuonna 1873 jo yli 130 vuotta '
      + 'vanha',
    // 23.5712 E / 46.0675 N — en-Wikipedia "Alba Carolina Citadel"
    laudat: {
      maailmankartta: { x: 6619, y: 1557.6 },
      europe: { x: 663.8, y: 682 },
    },
    teksti: 'Alba Carolina on tähtimuotoinen linnoitus Alba Iulian keskustassa '
      + 'Transilvaniassa, ja se on tunnettu esimerkki Vaubanin linnoitusarkkitehtuurista. '
      + 'Habsburgien aikana sen rakentaminen alkoi 4. marraskuuta 1715 ja valmistui vuonna '
      + '1738; suunnittelijana pidetään arkkitehti Giovanni Morando Viscontia. Työssä oli '
      + 'mukana noin 20 000 maaorjaa, ja kustannuksiksi arvioidaan noin kolme miljoonaa '
      + 'floriinia. Linnoitus nousi kahden vanhemman linnoituksen paikalle: roomalaisen '
      + 'Legio XIII Geminan Apulum-leirin ja keskiaikaisen Belgradin linnoituksen. Nimensä '
      + 'se sai keisari Kaarle VI:n mukaan, joka hallitsi rakennusaikana.',
    lahde: 'en-Wikipedia "Alba Carolina Citadel", johdanto-osa ja osio "Name" ja en-Wikipedia '
      + '"Alba Iulia", osio "Ottoman and Habsburg period" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-targoviste',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-targoviste-07755e94.jpg',
      lyhyt: 'Chindia-torni Târgoviștein ruhtinaan hovialueella.',
      selite: 'Kuvassa kohoaa pyöreä tiilitorni leveän kivisen alaosan päällä; taustalla näkyy '
        + 'hovialueen kirkko ja rauniot. Näkymä on ruhtinaan palatsialueelta (Curtea '
        + 'Domnească).',
      lahde: 'Valokuva: Nicubunu, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Nicubunu',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chindia-tower-wide.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-targoviste-461845e8.jpg',
        lyhyt: 'Ruhtinaspalatsin rauniot Chindia-tornista katsottuna.',
        selite: 'Kuva on otettu Chindia-tornista alaspäin. Siinä näkyvät Curtea Domnească '
          + '-palatsin rauniot, suojakatokset ja hovialueen kirkko sekä kaupunki '
          + 'taustalla.',
        lahde: 'Valokuva: Nicubunu, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Nicubunu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Curtea-domneasca-Targoviste-aerial-view.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-targoviste-1323c95f.jpg',
        lyhyt: 'Chindia-torni: leveä kivinen alaosa ja tiilinen yläosa.',
        selite: 'Kuvauksen mukaan torni on Curtea Domnească -hovialueella Târgoviștessa. '
          + 'Tornin alaosa on leveä ja kivinen, yläosa kapeampi ja tiilinen.',
        lahde: 'Valokuva: Nicubunu, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Nicubunu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Turnul_Chindiei,_Targovi%C8%99te_02.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Târgoviște',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Târgoviște oli aikoinaan Valakian pääkaupunki?',
      'Miksi Chindia-torni on nykyään kaupungin tunnus?',
    ],
    korostukset: ['Chindia-torni|Chindia-tornin', 'Valakia|Valakian'],
    nappi: 'Valakian entinen pääkaupunki: Bukarest oli ottanut aseman jo vuonna 1659',
    // 25.4572 E / 44.9244 N — en-Wikipedia "Târgoviște"
    laudat: {
      maailmankartta: { x: 6681.9, y: 1604.9 },
      europe: { x: 700, y: 712.1 },
    },
    teksti: 'Târgoviște on kaupunki Dâmbovițan läänissä noin 80 kilometriä Bukarestista '
      + 'luoteeseen. Se oli Valakian ruhtinaskunnan pääkaupunki vuosina 1418–1659 ja 1400- '
      + 'ja 1500-luvuilla tärkeä kauppakeskus, etenkin Puolan, Brașovin ja Sibiun '
      + 'suuntaan. Ruhtinaan hovialuetta ympäröivät kivimuurit ja vallihauta, ja sinne '
      + 'rakennettiin uusi kirkko ja torni. Vlad III Dracula lisäsi hovialueelle myöhemmin '
      + 'Chindia-tornin, josta on tullut kaupungin tunnus. Kun pääkaupungin asema lopulta '
      + 'siirtyi Bukarestiin, Târgoviște menetti merkityksensä ja sen väkiluku väheni.',
    lahde: 'en-Wikipedia "Târgoviște", johdanto-osa ja osiot "Capital of Wallachia" ja '
      + '"Decline" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä hovialueen torni on nykyään Târgoviștein kaupungin tunnus?',
      vaihtoehdot: [
        'Sfatului-torni',
        'Poenarin torni',
        'Neagoe Basarabin torni',
        'Chindia-torni',
      ],
      oikea: 3,
      fakta: 'Kaupungin nimi Târgoviște juontuu vanhasta slaavilaisesta sanasta, joka '
        + 'tarkoittaa markkinapaikkaa. Kaupungin rautatieasema vihittiin käyttöön 2. '
        + 'tammikuuta 1884.',
    },
  },
  {
    id: 'hahmotelma-poenari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-poenari-ddf7ebf9.jpg',
      lyhyt: 'Poenarin linnan rauniot kallionkielekkeellä jyrkän laakson yllä.',
      selite: 'Linnan muurit ja torni kohoavat vuoren harjanteella Argeș-joen laakson '
        + 'yläpuolella. Etualalla kulkee kävelysilta, ja rinteet ovat metsän peitossa.',
      lahde: 'Valokuva: Diana Popescu, Wikimedia Commons (CC BY-SA 3.0 ro).',
      tekija: 'Diana Popescu',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cetatea_Poenari_1.jpg',
      lisenssi: 'CC BY-SA 3.0 ro',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-poenari-edcbb60f.jpg',
        lyhyt: 'Poenarin rauniolinna kallion päällä 1860-luvun piirroksessa.',
        selite: 'Taidemaalari Gheorghe Tătărescun vuonna 1860 tekemä piirros näyttää linnan '
          + 'raunioina jyrkän kallion huipulla. Kuva on siis tehty ennen vuotta 1873.',
        lahde: 'Valokuva: Gheorghe Tatarescu (1860), Wikimedia Commons (Public domain).',
        tekija: 'Gheorghe Tatarescu (1860)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cetatea_Poenari_by_Gheorghe_Tatarescu_(1860).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-poenari-add42528.jpg',
        lyhyt: 'Linnan tiilimuurit ja torni sisältä käsin, taustalla metsäiset vuoret.',
        selite: 'Poenarin linnan muurit on rakennettu tiilestä ja kivestä. Muurien välistä '
          + 'avautuu näkymä ympäröiville metsäisille vuorille.',
        lahde: 'Valokuva: Ciprian Samihaian, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ciprian Samihaian',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cetatea_Poenari,_din_interor.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Poenarin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Poenarin linnaa oli vaikea valloittaa?',
      'Mitä maanjäristykset ovat tehneet linnalle 1900-luvulla?',
    ],
    korostukset: ['Vlad Seivästäjä|Vlad Seivästäjä', 'Argeș|Argeș-joen'],
    nappi: 'Rauniona 1600-luvulta asti; vuoden 1913 maanvyörymä ja järistykset vahingoittivat '
      + 'sitä vasta myöhemmin',
    // 24.6352 E / 45.3539 N — en-Wikipedia "Poenari Castle"
    laudat: {
      maailmankartta: { x: 6654.5, y: 1587.2 },
      europe: { x: 684.2, y: 700.8 },
    },
    teksti: 'Poenarin linna on rauniolinna Romaniassa, Argeș-joen kanjonin äyräällä '
      + 'Cetatea-vuoren tasanteella Făgăraș-vuorten lähellä. Linnalle noustaan 1 480 '
      + 'betoniportaan kautta. Alueella oli jo 1200-luvun alussa valakialaisten rakentama '
      + 'linnoitus, josta tuli 1300-luvun puolivälissä Basarab-suvun päälinna, mutta se '
      + 'hylättiin ja jäi rauniolle. Vuonna 1459 ruhtinas Vlad Seivästäjä korjasi ja '
      + 'vahvisti linnan yhdeksi tärkeimmistä linnoistaan; sen koko ja sijainti tekivät '
      + 'siitä vaikean valloittaa. Linna hylättiin uudelleen 1500-luvun alkupuoliskolla ja '
      + 'oli raunio 1600-luvulla. Vuoden 1913 maanjäristyksen laukaisema maanvyörymä '
      + 'pudotti osia linnasta jokeen, ja järistykset 1940 ja 1977 vahingoittivat sitä '
      + 'lisää.',
    lahde: 'en-Wikipedia "Poenari Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-curtea-de-arges',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-curtea-de-arges-61553e8b.jpg',
      lyhyt: 'Curtea de Argeșin katedraali vaaleine kupoleineen puiston keskellä.',
      selite: 'Kirkon julkisivu on vaaleaa kalkkikiveä, ja sen kupolien alla olevat rummut on '
        + 'koristeltu kaiverruksin. Kuva esittää Argeșin luostarin Neitsyen kuolonunen '
        + 'kirkkoa.',
      lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pudelek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_the_Dormition,_Arge%C8%99_monastery_(by_Pudelek)_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-curtea-de-arges-240da9ed.jpg',
        lyhyt: 'Katedraalin sisällä kultaisena hohtava ikonostaasi.',
        selite: 'Kirkon sisätiloja koristavat kullatut ja maalatut yksityiskohdat. Ikonostaasi '
          + 'erottaa alttarin muusta kirkkotilasta.',
        lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pudelek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_the_Dormition,_Arge%C8%99_monastery_(by_Pudelek)_05.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Curtea de Argeșin luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi pehmeä kalkkikivi sopi kirkon koristeluun niin hyvin?',
      'Mitä legenda kertoo mestari Manolesta ja kirkon rakentamisesta?',
    ],
    korostukset: ['Neagoe Basarab|Neagoe Basarab', 'Manole|Manolesta'],
    nappi: 'Kirkon uudelleenrakennus alkoi vasta pari vuotta myöhemmin, 1875, ja valmistui '
      + '1885',
    // 24.6753 E / 45.1569 N — en-Wikipedia "Curtea de Argeș Cathedral"
    laudat: {
      maailmankartta: { x: 6655.8, y: 1595.3 },
      europe: { x: 685, y: 706 },
    },
    teksti: 'Curtea de Argeșin luostarin katedraali on romanialaisortodoksinen kirkko, joka on '
      + 'valmistunut 1500-luvun alussa ja omistettu Jumalansynnyttäjän kuolonunelle. '
      + 'Julkisivu on vaaleaa harmaata kalkkikiveä, joka oli helppo veistää ja kovettui '
      + 'ilmassa, ja sitä koristavat arabeskit. Kirjoitusten mukaan rakennuttajia olivat '
      + 'ruhtinas Neagoe Basarab ja hänen puolisonsa Milica Despina, ja Radu Afumați sai '
      + 'työn valmiiksi vuonna 1526. Kirkko rakennettiin uudelleen vuosina 1875–1885 ja '
      + 'vihittiin käyttöön 1886. Sinne on haudattu Romanian kuninkaita, esimerkiksi Carol '
      + 'I ja Mikael I. Kansantarina kertoo mestari Manolesta, joka uhrasi rakkaimpansa '
      + 'rakennuksen vuoksi.',
    lahde: 'en-Wikipedia "Curtea de Argeș Cathedral", johdanto-osa ja osiot "Inscriptions", '
      + '"Legends" ja "Burials" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-neamt',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-neamt-cc41679f.jpg',
      lyhyt: 'Neamțin linnoituksen paksut kivimuurit ja porttirakennus sillan päässä.',
      selite: 'Linnoitus on rakennettu joen- ja louhoskivestä. Kuvassa näkyy sisäänkäynti, '
        + 'jonne kuljetaan puisen sillan kautta.',
      lahde: 'Valokuva: Cezar Suceveanu, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Cezar Suceveanu',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cetatea_Neamtului.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-neamt-7916f861.jpg',
        lyhyt: 'Linnoituksen pyöreät bastionit ja korkeampi sisälinna niiden takana.',
        selite: 'Ulompi muuri on vahvistettu puolipyöreillä bastioneilla. Niiden takana kohoaa '
          + 'Mușatin linnake, linnoituksen vanhin osa.',
        lahde: 'Valokuva: Bogdan Muraru, Wikimedia Commons (CC BY-SA 3.0 ro).',
        tekija: 'Bogdan Muraru',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cetatea_Neam%C8%9B_15.jpg',
        lisenssi: 'CC BY-SA 3.0 ro',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-neamt-746a2adc.jpg',
        lyhyt: 'Rekonstruoitu keskiaikainen kaakeliuuni, jossa on peura ja merenneito.',
        selite: 'Uuni on rekonstruktio, joka perustuu linnoituksen alueelta löytyneisiin uunin '
          + 'jäänteisiin. Kaakeleissa on eläinkuvioita.',
        lahde: 'Valokuva: CristianChirita, Wikimedia Commons (Public domain).',
        tekija: 'CristianChirita',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Neamt_Citadel_2009_September_22_4.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Neamțin linnoitus',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi linnoituksen nimi Neamț liitetään saksalaisiin?',
      'Miten Tapani Suuri vahvisti linnoitusta piirityksiä vastaan?',
    ],
    korostukset: ['Tapani Suuri|Tapani Suuren', 'Neamț|Neamț'],
    nappi: 'Tie linnoitukselle oli tehty jo 1834, mutta linnan kunnostus matkailukohteeksi '
      + 'tehtiin vasta 2007–2009',
    // 26.3433 E / 47.2143 N — en-Wikipedia "Neamț Citadel"
    laudat: {
      maailmankartta: { x: 6711.4, y: 1509.5 },
      europe: { x: 717, y: 651.9 },
    },
    teksti: 'Neamțin linnoitus on keskiaikainen linna Koillis-Romaniassa lähellä Târgu Neamțin '
      + 'kaupunkia. Se rakennettiin Moldovan ruhtinaskunnassa ruhtinas Pietari II:n aikana '
      + '1300-luvulla ja sitä laajennettiin 1400-luvulla. Linnoitus kuului Tapani Suuren '
      + 'puolustusjärjestelmään yhdessä Suceavan ja muiden linnojen kanssa. Tapani korotti '
      + 'muureja ja katkaisi vuoren harjanteen linnasta puolustusojalla, jonka yli kulki '
      + 'nostettava silta. Vanha oletus saksalaisritarien 1200-luvun linnasta on kumottu, '
      + 'sillä kaivauksissa ei löytynyt merkkejä linnoituksesta ennen Pietari II:n aikaa. '
      + 'Linnoitus kesti vuonna 1476 sulttaani Mehmed Valloittajan piirityksen.',
    lahde: 'en-Wikipedia "Neamț Citadel", johdanto-osa ja osiot "History" ja "Description" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-suceava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-suceava-f6a3b10c.jpg',
      lyhyt: 'Suceavan linnoituksen muurit ja bastionit puolustusojan takaa nähtynä.',
      selite: 'Panoraamakuvassa näkyvät linnoituksen pyöreät ulkomuurit ja niiden takana '
        + 'sisempi Petru Mușatin linnake.',
      lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pudelek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Suceava_fortress_(by_Pudelek).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-suceava-c6d6ce2e.jpg',
        lyhyt: 'Suceavan istuinlinnoituksen keskiosa, pyöreä bastioni ja katolla varustettu '
          + 'torni.',
        selite: 'Kuvassa on linnoituksen keskiosa. Etualalla on Tapani Suuren aikaisen '
          + 'ulkolinnan pyöreä bastioni.',
        lahde: 'Valokuva: Cezar Suceveanu, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Cezar Suceveanu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cetatea_de_Scaun_a_Sucevei11.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-suceava-5962a459.jpg',
        lyhyt: 'Suceavan linnoituksen sisäpihan holvikaarisia huoneita.',
        selite: 'Petru Mușatin linnakkeen sisäpihan ympärillä olevat huoneet on osittain '
          + 'uudelleen rakennettu. Kuvassa näkyvät tiiliholvit ja kivimuurit.',
        lahde: 'Valokuva: Cezar Suceveanu, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Cezar Suceveanu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cetatea_de_Scaun_a_Sucevei40.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Suceavan linnoitus',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Moldovan ruhtinaat rakensivat linnoituksia 1300-luvun lopulla?',
      'Miksi Suceavan linnoituksessa on kaksi sisäkkäistä linnaketta?',
    ],
    korostukset: ['Petru Mușat|Petru Mușat', 'Tapani Suuri|Tapani Suuri'],
    nappi: 'Kaupunki kuului Itävallan Bukovinaan; linna oli ollut rauniona vuoden 1675 tuhon '
      + 'jälkeen',
    // 26.2556 E / 47.6514 N — en-Wikipedia "Suceava"
    laudat: {
      maailmankartta: { x: 6708.5, y: 1491 },
      europe: { x: 715.3, y: 640.4 },
    },
    teksti: 'Suceavan istuinlinnoitus (Cetatea de Scaun) on keskiaikainen linna kaupungin '
      + 'itälaidalla. Sen rakennutti Moldovan ruhtinas Petru Mușat 1300-luvun lopulla '
      + 'osana linnoitusjärjestelmää, jota alettiin rakentaa ottomaanien uhkaa vastaan. '
      + 'Aleksanteri I ja Tapani Suuri laajensivat sitä: sisempi suorakaiteen muotoinen '
      + 'linnake on Mușatin ajalta, ja Tapani lisäsi sen ympärille pyöreän ulkolinnan sekä '
      + 'suuren puolustusojan. Linna kesti sulttaani Mehmed II:n hyökkäyksen vuonna 1476. '
      + 'Suceava oli Moldovan pääkaupunki vuosina 1388–1565, ja linna toimi ruhtinaan '
      + 'asuinpaikkana. Kun pääkaupunki siirrettiin Iașiin, linna rappeutui, ja vuonna '
      + '1675 se tuhottiin. Laaja jälleenrakennus käynnistyi 2013.',
    lahde: 'en-Wikipedia "Suceava", johdanto-osa ja osiot "The Seat Fortress of Suceava" ja '
      + '"Habsburg rule and unification with the Kingdom of Romania" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-sibiu',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sibiu-6581f9e8.jpg',
      lyhyt: 'Brukenthalin palatsi Sibiun torin laidalla.',
      selite: 'Barokkityylinen Brukenthalin palatsi on nykyään Brukenthalin kansallismuseon '
        + 'taidegalleria. Sen vasemmalla puolella on Sininen talo.',
      lahde: 'Valokuva: Ymblanter, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ymblanter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Brukenthal_Palace_Sibiu.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sibiu-c2d98d46.jpg',
        lyhyt: 'Sibiun Suuri tori (Piața Mare) värikkäine taloineen.',
        selite: 'Suuren torin ympärillä on vanhoja taloja, joiden punaisissa tiilikatoissa on '
          + 'pieniä kattoikkunoita, joita on verrattu silmiin.',
        lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pudelek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sibiu_(Hermannstadt,_Nagyszeben)_-_Large_Square_(Pia%C8%9Ba_Mare,_Gro%C3%9Fer_Ring).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sibiu-1a5b3c53.jpg',
        lyhyt: 'Näkymä kaupungintornista Suurelle torille ja kaukaisille vuorille.',
        selite: 'Kuva on otettu Sibiun neuvostotornista (Council Tower). Suuri tori on täynnä '
          + 'markkinakojuja, ja horisontissa häämöttävät Karpaatit.',
        lahde: 'Valokuva: Paul Colin Hennig firstdorsal.eu, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Paul Colin Hennig firstdorsal.eu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Large_Square_of_Sibiu_and_the_Carpathians_from_the_Council_Tower_(2023).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Sibiu',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Sibiulla on kolme nimeä: Sibiu, Hermannstadt ja Nagyszeben?',
      'Keitä transilvaniansaksalaiset olivat ja miten he päätyivät Transilvaniaan?',
    ],
    korostukset: ['Hermannstadt|Hermannstadt', 'Brukenthal|Brukenthalin'],
    nappi: 'Hermannstadt, transilvaniansaksalaisten keskus; heidän yliopistonsa toimi '
      + 'kaupungissa vielä 1876 asti',
    // 24.1519 E / 45.7928 N — en-Wikipedia "Sibiu"
    laudat: {
      maailmankartta: { x: 6638.4, y: 1569 },
      europe: { x: 674.9, y: 689.2 },
    },
    teksti: 'Sibiu (saksaksi Hermannstadt, unkariksi Nagyszeben) on kaupunki Transilvaniassa '
      + 'Romanian keskiosassa Cibin-joen varrella. Sen perustivat saksalaiset '
      + 'uudisasukkaat, jotka Unkarin kuningas Géza II toi alueelle 1100-luvun '
      + 'puolivälissä. Keskiajalla Hermannstadt oli transilvaniansaksalaisten tärkein '
      + 'kulttuuri- ja hallintokeskus ja tärkein niistä seitsemästä kaupungista, joista '
      + 'Transilvanian saksankielinen nimi Siebenbürgen tulee. Kaupunkia kutsutaan '
      + 'lempinimellä "kaupunki, jolla on silmät", koska monien vanhojen talojen '
      + 'kattoikkunat näyttävät silmiltä. Brukenthalin kansallismuseo toimii kaupungissa, '
      + 'ja sen Brukenthalin palatsissa on taidegalleria ja vanha kirjasto. Sibiu oli '
      + 'Euroopan kulttuuripääkaupunki vuonna 2007.',
    lahde: 'en-Wikipedia "Sibiu", johdanto-osa ja osiot "History" ja "Museums and parks" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Millä lempinimellä Sibiuta kutsutaan vanhojen talojen kattoikkunoiden vuoksi?',
      vaihtoehdot: [
        'Kaupunki, jolla on kellot',
        'Kaupunki, jolla on torni',
        'Kaupunki, jolla on silmät',
        'Kaupunki, jolla on seitsemän porttia',
      ],
      oikea: 2,
      fakta: 'Sibiun joulumarkkinat ovat Romanian ensimmäiset. Ne järjestettiin ensimmäisen '
        + 'kerran vuonna 2007 Wienin joulumarkkinoiden mallin mukaan.',
    },
  },
  {
    id: 'hahmotelma-brasov',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-brasov-6ec3a5ff.jpg',
      lyhyt: 'Brașovin vanhankaupungin punaiset katot, Mustakirkko ja Tâmpa-vuori taustalla.',
      selite: 'Korkealta otettu näkymä Brașovin vanhaankaupunkiin: goottilainen Mustakirkko, '
        + 'vanhankaupungin kellotorni ja metsäinen Tâmpa-vuori. Kuva on otettu vuonna '
        + '2025.',
      lahde: 'Valokuva: Paul Colin Hennig firstdorsal.eu, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Paul Colin Hennig firstdorsal.eu',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panorama_of_Bra%C8%99ov_old_town_with_the_Black_Church_and_Mount_T%C3%A2mpa_(2025).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-brasov-cc5c70fd.jpg',
        lyhyt: 'Mustakirkko ja sitä ympäröivät vanhan kaupungin talot Tâmpa-vuorelta '
          + 'katsottuna.',
        selite: 'Näkymä Tâmpa-vuoren rinteeltä alas Mustakirkkoon ja sen viereisiin taloihin. '
          + 'Tâmpalta avautuu hyvä näkymä vanhaan kaupunkiin.',
        lahde: 'Valokuva: Cristian Bortes from Cluj-Napoca, Romania, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Cristian Bortes from Cluj-Napoca, Romania',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Brasov_-_Black_church_from_T%C3%A2mpa.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-brasov-f4f63c62.jpg',
        lyhyt: 'Casa Sfatului ja sen ympäröimä tori kattojen yli katsottuna.',
        selite: 'Entisen kaupungintalon Casa Sfatulun korkea kellotorni ja sen ympärillä oleva '
          + 'tori, jota reunustavat vanhat talot ja kahvilaparasollit. Kaupungin hallinto '
          + 'toimi rakennuksessa yli 500 vuotta.',
        lahde: 'Valokuva: Paul Colin Hennig firstdorsal.eu, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Paul Colin Hennig firstdorsal.eu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Council_House_and_Council_Square_seen_over_the_rooftops_of_Bra%C8%99ov_(2025).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Brașov',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Mustakirkko on saanut niin synkän nimen?',
      'Miksi juuri Brașovin kauppiaat vaurastuivat niin hyvin?',
    ],
    korostukset: ['Mustakirkko|Mustakirkko', 'Kronstadt|Kronstadt'],
    nappi: 'Kronstadtiksi kutsuttu kauppakaupunki, jonka Mustakirkko oli jo lähes 400 vuotta '
      + 'vanha',
    // 25.6167 E / 45.6667 N — en-Wikipedia "Brașov"
    laudat: {
      maailmankartta: { x: 6687.2, y: 1574.2 },
      europe: { x: 703, y: 692.6 },
    },
    teksti: 'Brașov on Transilvanian kaupunki Etelä-Karpaattien ympäröimänä, noin 166 '
      + 'kilometrin päässä Bukarestista pohjoiseen. Saksalaisnimeltään Kronstadt tunnettu '
      + 'kaupunki oli Burzenlandin keskus, jossa transilvaniansaksalaiset kauppiaat '
      + 'vaurastuivat, sillä se sijaitsi Itävallan ja Osmanien valtakunnan välisten '
      + 'kauppareittien risteyksessä. Vanhaa kaupunkia suojasivat linnoitusmuurit ja '
      + 'tornit, joista eri käsityöläisten killat pitivät huolta, ja keskustassa on '
      + 'entisen kaupungintalon, Casa Sfatuluin, ympäröimä tori. Goottilainen Mustakirkko '
      + 'on vuodelta 1477, ja se sai nimensä vuoden 1689 suuren tulipalon noesta. '
      + 'Saksalaisten lisäksi kaupungissa asui romanialaisia Șchein kaupunginosassa sekä '
      + 'unkarilaisia.',
    lahde: 'en-Wikipedia "Brașov", johdanto-osa ja osiot "History" ja "Tourism" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-ieud',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-ieud-a192b0cd.jpg',
      lyhyt: 'Ieudin rinteen puukirkko, jonka kapea kellotorni kohoaa jyrkän katon yllä.',
      selite: 'Jumalansynnyttäjän syntymälle omistettu puukirkko Ieudin kylässä (Ieud Deal). '
        + 'Sen ympärillä on kylän hautausmaan ristejä, ja katto ja torni on päällystetty '
        + 'puupäreillä.',
      lahde: 'Valokuva: Țetcu Mircea Rareș, Wikimedia Commons (CC BY-SA 3.0 ro).',
      tekija: 'Țetcu Mircea Rareș',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:IeudBisDinDeal_(73).JPG',
      lisenssi: 'CC BY-SA 3.0 ro',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-ieud-098164d2.jpg',
        lyhyt: 'Seinämaalaus Ieudin rinteen kirkon esikammiossa: kymmenen neitsyen vertaus.',
        selite: 'Maalaus kirkon esikammion (pronaos) eteläseinällä: viisi viisasta neitsyttä '
          + 'palavine lamppuineen Jeesuksen kohdattavina. Aihe on Raamatun vertaus '
          + 'kymmenestä neitsyestä.',
        lahde: 'Valokuva: Albabos (ro.wikipedia), Wikimedia Commons (CC BY 2.5).',
        tekija: 'Albabos (ro.wikipedia)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ieud_deal.pictura_murala_pron.jpg',
        lisenssi: 'CC BY 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-ieud-bed9edfd.jpg',
        lyhyt: 'Ieudin puukirkon massiivinen pärekatto ja kellotorni alhaalta katsottuna.',
        selite: 'Lähikuva kirkon laajasta, tiiviistä pärekatosta ja kellotornista. Massiivinen '
          + 'katto on yksi Maramureșin puukirkkojen tunnusmerkeistä.',
        lahde: 'Valokuva: Codrinb, Wikimedia Commons (CC BY-SA 3.0 ro).',
        tekija: 'Codrinb',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Wooden_Church_Birth_of_Virgin_Mary_in_Ieud_Deal_2011_-_Roof_Detail.jpg',
        lisenssi: 'CC BY-SA 3.0 ro',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
      },
    ],
    nimi: 'Ieud',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Maramureșissa rakennettiin ortodoksikirkkoja puusta eikä kivestä?',
      'Mitä Ieudin koodeksi on ja miksi se on tärkeä?',
    ],
    korostukset: ['Ieudin koodeksi|Ieudin koodeksi', 'UNESCO|UNESCO'],
    nappi: 'Maramureșin puukirkkojen kylä; rinteen kirkko oli 1873 jo yli 250 vuotta vanha',
    // 24.2336 E / 47.6778 N — en-Wikipedia "Ieud"
    laudat: {
      maailmankartta: { x: 6641.1, y: 1489.9 },
      europe: { x: 676.5, y: 639.7 },
    },
    teksti: 'Ieud on kylä Pohjois-Transilvanian Maramureșissa, Iza-joen sivujoen varrella. '
      + 'Kylä mainitaan jo keskiajan asiakirjoissa, ja sen kirkoissa säilyi Ieudin '
      + 'koodeksi, käsikirjoituskokoelma, jossa on 1600-luvun alkupuolella kirjoitettuja '
      + 'romaniankielisiä tekstejä. Jumalansynnyttäjän syntymälle omistettu rinteen '
      + 'puukirkko rakennettiin vuosina 1610–1621, ja se on vanhin kahdeksasta Maramureșin '
      + 'puukirkosta, jotka UNESCO merkitsi maailmanperintökohteiksi vuonna 1999. Korkeat '
      + 'hirsikirkot kapeine kellotorneineen syntyivät osin siksi, että katoliset '
      + 'Itävalta-Unkarin (Habsburgien) viranomaiset kielsivät ortodoksisten kivikirkkojen '
      + 'rakentamisen. Kylässä on toinenkin puukirkko, laakson kirkko, joka on '
      + '1710-luvulta.',
    lahde: 'en-Wikipedia "Ieud" ja "Wooden churches of Maramureș" sekä ro-Wikipedia "Ieud, '
      + 'Maramureș", johdanto-osat ja osiot (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-horezu',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-horezu-2e3650f9.jpg',
      lyhyt: 'Horezun luostarin kirkko sisäpihalta katsottuna, taustalla metsäiset kukkulat.',
      selite: 'Sisäpihalta otettu kuva luostarin kirkosta, jonka valkoiset seinät on '
        + 'koristeltu kiviveistoksin ja jonka edessä on kaarien kannattelema '
        + 'pylväskäytävä.',
      lahde: 'Valokuva: fusion-of-horizons, Wikimedia Commons (CC BY 2.0).',
      tekija: 'fusion-of-horizons',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Manastirea_Horezu_by_fusion-of-horisons.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-horezu-00e8117b.jpg',
        lyhyt: 'Horezun luostarin sisäpihan rakennus, jossa on kaarikuisti ja ulkoportaat.',
        selite: 'Valkoiseksi rapattu rakennus, jossa on kivipylväiden kannattelema kaarikuisti '
          + 'ja leveät ulkoportaat. Selkeä ja tasapainoinen arkkitehtuuri on luostarin '
          + 'tunnusmerkki.',
        lahde: 'Valokuva: fusion-of-horizons, Wikimedia Commons (CC BY 2.0).',
        tekija: 'fusion-of-horizons',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hurezi_Monastery_(Horezu_region)_(11105605806).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-horezu-e85cebac.jpg',
        lyhyt: 'Seinämaalauksia Hurezin luostarin sairaalakirkosta.',
        selite: 'Kuvassa on kirkon holvin freskoja, joissa esiintyy pyhiä hahmoja ja '
          + 'kohtauksia. Kuva on luostarikokonaisuuden sairaalakirkosta (bolnița).',
        lahde: 'Valokuva: Țetcu Mircea Rareș (ro.wikipedia), Wikimedia Commons (CC BY-SA 2.5).',
        tekija: 'Țetcu Mircea Rareș (ro.wikipedia)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:RO_VL_Romanii_de_Jos_Hurezi_monastery_14.jpg',
        lisenssi: 'CC BY-SA 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
      },
    ],
    nimi: 'Horezun luostari',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Brâncoveanun tyyliä pidetään niin erityisenä?',
      'Mikä lintu on antanut paikalle Hurezin nimen?',
    ],
    korostukset: ['Brâncoveanu-tyyli|Brâncoveanun tyylin', 'Brâncoveanu|Brâncoveanu'],
    nappi: 'Valakian ruhtinaan 1690 perustama luostari oli 1873 jo lähes 200 vuotta vanha',
    // 24.0067 E / 45.1695 N — en-Wikipedia "Horezu Monastery"
    laudat: {
      maailmankartta: { x: 6633.6, y: 1594.8 },
      europe: { x: 672.1, y: 705.6 },
    },
    teksti: 'Horezun eli Hurezin luostarin perusti Valakian ruhtinas Constantin Brâncoveanu '
      + 'vuonna 1690, ja pääkirkko vihittiin käyttöön syyskuussa 1693. Luostari on '
      + 'Romanian suurin luostarikokonaisuus, ja sitä pidetään Brâncoveanun tyylin '
      + 'mestariteoksena. Tyylin tuntomerkkejä ovat arkkitehtuurin selkeys ja tasapaino, '
      + 'runsas kiviveistos sekä koristeelliset maalaukset ja lahjoittajien muotokuvat. '
      + 'Pääkirkon kuistia kannattelee kymmenen kivipylvästä, joissa on '
      + 'myöhäisrenessanssin koristeita. Paikan nimen kerrotaan tulevan pöllöstä, jonka '
      + 'huhuilu rikkoo laakson hiljaisuuden.',
    lahde: 'en-Wikipedia "Horezu Monastery" ja ro-Wikipedia "Mănăstirea Hurezi", '
      + 'johdanto-osat ja osiot (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka perusti Horezun luostarin vuonna 1690?',
      vaihtoehdot: [
        'Vlad Seivästäjä',
        'Tapani Suuri',
        'Constantin Brâncoveanu',
        'Mikael Urhea',
      ],
      oikea: 2,
      fakta: 'Luostarikokonaisuuteen kuuluu pääkirkon lisäksi kolme muuta pyhäkköä, muun '
        + 'muassa ruhtinaan puolison Marian rakennuttama sairaalakirkko vuodelta 1696. '
        + 'Työn valvojana toimi aluksi ruhtinaan serkku Pârvu Cantacuzino.',
    },
  },
  {
    id: 'hahmotelma-sucevita',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sucevita-4ffe3c8f.jpg',
      lyhyt: 'Sucevițan luostarin maalattu kirkko ja linnoitusmuurin torni sisäpihalta.',
      selite: 'Sisäpihalta otettu kuva kirkosta, jonka seinät on peitetty värikkäillä '
        + 'maalauksilla, sekä luostarin kivisistä muureista ja torneista.',
      lahde: 'Valokuva: Stanislav Dusík, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Stanislav Dusík',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sucevi%C8%9Ba_Monastery_(_Romania_).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sucevita-5c331d93.jpg',
        lyhyt: 'Luostarin sisäpiha, maalattu kirkko ja kulmatorni kukkivien ruusujen takana.',
        selite: 'Kuvassa on maalattu kirkko sekä muurin kulmatornit ja kävelygalleria '
          + 'sisäpihalta katsottuna. Muurissa on neljä kulmatornia.',
        lahde: 'Valokuva: Alex Moise, Wikimedia Commons (CC BY-SA 3.0 ro).',
        tekija: 'Alex Moise',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Biserica_si_curtea_manastirii_Sucevita.jpg',
        lisenssi: 'CC BY-SA 3.0 ro',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-sucevita-847cfc5c.jpg',
        lyhyt: 'Sucevițan luostari muureineen laaksossa metsäisten rinteiden keskellä.',
        selite: 'Ylhäältä otettu näkymä luostarin muurien ympäröimään alueeseen ja Bukovinan '
          + 'metsäisiin kukkuloihin. Muurit ja tornit erottuvat selvästi.',
        lahde: 'Valokuva: David Stanley from Nanaimo, Canada, Wikimedia Commons (CC BY 2.0).',
        tekija: 'David Stanley from Nanaimo, Canada',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sucevita_Monastery_(26780974739).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Sucevițan luostari',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi luostarin ympärillä on niin korkea ja paksu muuri?',
      'Miksi luostarin seinät on maalattu myös ulkopuolelta?',
    ],
    korostukset: ['Movilă|Movilă-suvun', 'Bukovina|Bukovinassa'],
    nappi: 'Movilă-suvun linnoitettu luostari; sen ulkomaalaukset olivat 1873 jo yli 270 '
      + 'vuotta vanhat',
    // 25.7112 E / 47.7782 N — en-Wikipedia "Sucevița Monastery"
    laudat: {
      maailmankartta: { x: 6690.4, y: 1485.6 },
      europe: { x: 704.9, y: 637 },
    },
    teksti: 'Sucevițan luostari on ortodoksinen luostari Bukovinassa, Romanian koillisosassa, '
      + 'noin 18 kilometrin päässä Rădăuțin kaupungista. Sen rakennuttivat Movilă-suvun '
      + 'veljekset Ieremia, Gheorghe ja Simion vuonna 1585. Kirkon sisä- ja ulkoseinät on '
      + 'peitetty raamatullisilla kuvakertomuksilla Vanhasta ja Uudesta testamentista, ja '
      + 'maalaukset ovat noin vuodelta 1601, joten Sucevița oli viimeisiä Moldovan tyyliin '
      + 'ulkoa maalattuja luostareita. Luostaria ympäröi lähes neliönmuotoinen, kuuden '
      + 'metrin korkuinen ja kolme metriä paksu muuri kulmatorneineen, sillä paikka oli '
      + 'sekä linnoitettu luostari että ruhtinaiden asuinpaikka. Muurien sisällä on museo, '
      + 'jossa on hopealangalla kirjailtuja hautakansia ja vanhoja käsikirjoituksia.',
    lahde: 'en-Wikipedia "Sucevița Monastery", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-cotnari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-cotnari-009db3d7.jpg',
      lyhyt: 'Cotnarin seudun rinteitä, joilla erottuu viiniköynnösrivejä.',
      selite: 'Maantie ja loivat rinteet Cotnarin seudulla; rinteillä erottuu tasaisia '
        + 'köynnösrivejä. Alue on Romanian merkittävä viininviljelyseutu.',
      lahde: 'Valokuva: rack_alex, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'rack_alex',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Road_thru_cotnari_country_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-cotnari-6c942ace.jpg',
        lyhyt: 'Tummia viinirypäleterttuja köynnöksessä Cotnarin viinialueella.',
        selite: 'Kypsiä tummia rypäleitä lehtien keskellä köynnöksessä. Cotnarin seutu '
          + 'tunnetaan viininviljelystään.',
        lahde: 'Valokuva: ciur nicu, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'ciur nicu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cotnari_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-cotnari-ec23e9a1.jpg',
        lyhyt: 'Suuria viinitynnyreitä rivissä Cotnarin viinikellarissa.',
        selite: 'Kuva näyttää kellarikäytävän, jonka molemmilla puolilla on suuria '
          + 'puutynnyreitä. Kyseessä on Cotnarin viinikellari.',
        lahde: 'Valokuva: Epop, Wikimedia Commons (Public domain).',
        tekija: 'Epop',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cave_de_Cotnari.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Cotnari',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi Cotnarin seutu sopii viininviljelyyn, vaikka talvet ovat kylmiä?',
      'Mitä Cotnarin katolisen yhteisön kirkolle tapahtui vuonna 1873?',
    ],
    korostukset: ['Grasă de Cotnari|Grasă de Cotnari', 'Cucuteni|Cucuteni-kulttuurin'],
    nappi: 'Vanha viinikylä, jonka katolinen kirkko paloi vuonna 1873',
    // 26.9408 E / 47.3403 N — en-Wikipedia "Cotnari"
    laudat: {
      maailmankartta: { x: 6731.4, y: 1504.2 },
      europe: { x: 728.5, y: 648.6 },
    },
    teksti: 'Cotnari on kylä Iașin läänissä Moldovan länsiosassa, luoteeseen Iașista, ja se '
      + 'tunnetaan viinialueena sekä Grasă de Cotnari -viinilajikkeesta. Alueella on '
      + 'asuttu jo Cucuteni-kulttuurin ajoista, ja läheiseltä Cătălinan kukkulalta on '
      + 'löydetty linnoitus 500- tai 400-luvulta eaa. Kylä mainitaan asiakirjoissa '
      + 'ensimmäisen kerran vuonna 1448, ja siellä asui vahva katolinen yhteisö, jonka '
      + 'muodostivat lähinnä saksalaiset ja unkarilaiset. Paikallisen perimätiedon mukaan '
      + 'viinitarhat perustettiin ruhtinas Tapani Suuren aloitteesta. Reformaation aikaan '
      + '1560-luvulla ruhtinas Heraclid perusti kylään latinankielisen koulun, ja sen '
      + 'paikalle rakennettu kirkko palveli katolista yhteisöä, kunnes se paloi vuonna '
      + '1873.',
    lahde: 'en-Wikipedia "Cotnari", johdanto-osa ja osiot "History" ja "Climate" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä viinilajikkeen nimeen Cotnarin kylä on tunnettu?',
      vaihtoehdot: [
        'Fetească neagră',
        'Tămâioasă românească',
        'Busuioacă de Bohotin',
        'Grasă de Cotnari',
      ],
      oikea: 3,
      fakta: 'Talvet alueella ovat ankaria, ja pakkasvaara pakotti viininviljelijät '
        + 'peittämään köynnökset talveksi mullalla. Kasvukausi kestää noin 190 päivää '
        + 'huhtikuun alusta syyskuun loppuun.',
    },
  },
  {
    id: 'hahmotelma-iasi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-iasi-1345a842.jpg',
      lyhyt: 'Trei Ierarhin luostarin kirkko kesäpäivänä kadun puolelta katsottuna.',
      selite: 'Trei Ierarhin (Kolmen pyhän hierarkin) luostarin kirkko, jonka julkisivu on '
        + 'koristeltu tiheillä kiviornamenteilla. Luostari rakennettiin vuosina 1635–1639.',
      lahde: 'Valokuva: Andrei Lucian Vaida, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Andrei Lucian Vaida',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:M%C4%83n%C4%83stirea_Sfin%C8%9Bii_Trei_Ierarhi_Ia%C8%99i_-_ziua_%C3%AEn_b%C4%83taia_soarelui.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-iasi-05a4c5ed.jpg',
        lyhyt: 'J. Reyn litografia Trei Ierarhin luostarista vuodelta 1845.',
        selite: 'Vuoden 1845 piirros kirkosta ja sen kellotornista, jonka edessä kulkee '
          + 'ihmisiä ja hevosvaunuja. Näin luostari näytti lähes kolmekymmentä vuotta '
          + 'ennen vuotta 1873.',
        lahde: 'Valokuva: J. Rey, Wikimedia Commons (Public domain).',
        tekija: 'J. Rey',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jassy_(Iasi)-Trei_Ierarhi_Monastery_(J.Rey,_1845).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-iasi-41b3476f.jpg',
        lyhyt: 'Kulttuuripalatsi Iașissa, neogoottilainen rakennus ruhtinaslinnan paikalla.',
        selite: 'Neogoottilainen Kulttuuripalatsi on rakennettu keskiaikaisen Moldovan '
          + 'ruhtinaanlinnan raunioille. Palatsi valmistui vasta myöhemmin, joten vuonna '
          + '1873 sitä ei vielä ollut.',
        lahde: 'Valokuva: PIERRE ANDRE LECLERCQ, Wikimedia Commons (CC BY-SA 3.0 ro).',
        tekija: 'PIERRE ANDRE LECLERCQ',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pia%C8%9Ba_Palat,_Ia%C8%99i,_Roumanie.jpg',
        lisenssi: 'CC BY-SA 3.0 ro',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
      },
    ],
    nimi: 'Iași',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Iașia kutsutaan Romanian kulttuuripääkaupungiksi?',
      'Mikä Junimea oli ja miksi sen julkaisu Convorbiri Literare oli tärkeä?',
    ],
    korostukset: ['Junimea|Junimea-kirjallisuusseuran', 'Trei Ierarhi|Trei Ierarhin'],
    nappi: 'Moldovan entinen pääkaupunki, jossa Romanian ensimmäinen yliopisto oli 13-vuotias',
    // 27.5889 E / 47.1622 N — en-Wikipedia "Iași"
    laudat: {
      maailmankartta: { x: 6753, y: 1511.7 },
      europe: { x: 740.9, y: 653.2 },
    },
    teksti: 'Iași on Romanian kolmanneksi suurin kaupunki Moldovan historiallisella alueella. '
      + 'Se oli Moldovan ruhtinaskunnan pääkaupunki vuodesta 1564 vuoteen 1859, ja vaikka '
      + 'pääkaupunki siirrettiin Bukarestiin, Iași jäi romanialaisen kulttuurin ja '
      + 'koulutuksen keskukseksi. Kaupungissa perustettiin vuonna 1860 Romanian '
      + 'ensimmäinen yliopisto, ja Junimea-kirjallisuusseuran julkaisussa Convorbiri '
      + 'Literare julkaistiin vuodesta 1867 muun muassa Mihai Eminescun runoja. Tunnettuja '
      + 'rakennuksia ovat Trei Ierarhin luostari 1630-luvulta ja keskiaikaisen '
      + 'ruhtinaanlinnan raunioille rakennettu Kulttuuripalatsi. Iașissa ilmestyi myös '
      + 'maailman ensimmäinen jiddišinkielinen sanomalehti vuonna 1855.',
    lahde: 'en-Wikipedia "Iași", johdanto-osa ja osiot "History", "Cityscape", "Culture" ja '
      + '"Education" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ploiesti',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-ploiesti-f8160fbb.jpg',
      lyhyt: 'Kansallinen öljymuseo Ploieștin kaupungissa.',
      selite: 'Ploieștin kansallinen öljymuseo koristeellisessa kulmarakennuksessa. Kaupunki '
        + 'on ollut öljyteollisuuden keskus 1850-luvulta lähtien.',
      lahde: 'Valokuva: Andrei Stroe, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Andrei Stroe',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:RO_PH_Ploiesti_oil_museum.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-ploiesti-d63b5707.jpg',
        lyhyt: 'Ploieștin kulttuuripalatsi, alun perin oikeuspalatsiksi suunniteltu rakennus.',
        selite: 'Rakennus on alun perin oikeuspalatsi, jonka arkkitehteina olivat Toma T. '
          + 'Socolescu ja E. Doneaud. Se on suojeltu historiallinen monumentti.',
        lahde: 'Valokuva: Albacore70 - Famille Toma T. Socolescu, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Albacore70 - Famille Toma T. Socolescu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ploiesti-PalatulJustitiei-1.JPG',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-ploiesti-fda57c4c.jpg',
        lyhyt: 'Öljynjalostamon tornit ja putkistot Ploieștissa.',
        selite: 'Nykyaikaisen jalostamon laitteita Ploieștissa. Kaupungin öljynjalostuksen '
          + 'perinne ulottuu 1850-luvulle.',
        lahde: 'Valokuva: Clay Gilliland, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Clay Gilliland',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ploesti_Refineries_(11375580063).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Ploiești',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi juuri Ploieștissa syntyi maailman ensimmäinen suuri öljynjalostamo?',
      'Mitä Ploieștin lempinimi "Mustan kullan pääkaupunki" tarkoittaa?',
    ],
    korostukset: ['Mikael Urho|Mikael Urhean', 'öljynjalostamo|öljynjalostamon'],
    nappi: 'Maailman ensimmäisen suurjalostamon kaupunki (1856–1857); rautatie tulee vasta '
      + 'vuonna 1882',
    // 26.0225 E / 44.9411 N — en-Wikipedia "Ploiești"
    laudat: {
      maailmankartta: { x: 6700.8, y: 1604.2 },
      europe: { x: 710.8, y: 711.6 },
    },
    teksti: 'Ploiești on Prahovan piirikunnan keskus Muntenian alueella, noin 56 kilometriä '
      + 'Bukarestista pohjoiseen. Kaupunki alkoi kasvaa 1500-luvun lopulla Mikael Urhean '
      + 'perustamalle tilalle, ja vuonna 1597 ruhtinas antoi sille virallisen '
      + 'markkinakaupungin aseman. Kauppareitit Transilvaniasta Tonavalle toivat sinne '
      + 'vaurautta, ja 1600- ja 1700-luvuilla siitä tuli tärkeä kaupan ja käsityön keskus. '
      + 'Käänne tuli 1850-luvun puolivälissä, kun Mehedințeanun veljekset perustivat sinne '
      + 'maailman ensimmäisen laajamittaisen öljynjalostamon, joka toimi täydellä teholla '
      + 'vuosina 1856–1857. Sen jälkeen kaupunki on ollut Euroopan öljynjalostuksen keskus '
      + 'ja saanut lempinimen "Mustan kullan pääkaupunki".',
    lahde: 'en-Wikipedia "Ploiești", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka perusti Ploieștiin maailman ensimmäisen laajamittaisen öljynjalostamon?',
      vaihtoehdot: [
        'Bukarestin kauppiasyhdistys',
        'Mehedințeanun veljekset',
        'Mikael Urhean hovimiehet',
        'Transilvanian kauppakilta',
      ],
      oikea: 1,
      fakta: 'Ensimmäisessä maailmansodassa brittiupseeri John Norton-Griffiths johti '
        + 'Ploieștin öljylaitosten tuhoamista ennen saksalaisten hyökkäystä vuonna 1916, '
        + 'mikä viivästytti merkittävästi Saksan sotaponnistuksia.',
    },
  },
  {
    id: 'hahmotelma-rosia-montana',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-rosia-montana-4ca3bc20.jpg',
      lyhyt: 'Kiveen hakattu kaivoskäytävä Roșia Montanăn roomalaisilla kultakaivoksilla.',
      selite: 'Kapea kaivoskäytävä, jota valaisevat pienet lamput. Roșia Montanăsta on '
        + 'löydetty roomalaisajan kaivoskäytäviä ja työkaluja.',
      lahde: 'Valokuva: Codrinb, Wikimedia Commons (CC BY-SA 3.0 ro).',
      tekija: 'Codrinb',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rosia_Montana_Roman_Gold_Mines_2011_-_Galleries.jpg',
      lisenssi: 'CC BY-SA 3.0 ro',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-rosia-montana-81f19527.jpg',
        lyhyt: 'Roomalainen vahataulu Alburnus Maiorista, esillä Bukarestissa.',
        selite: 'Vahataulun merkintä on päivätty 20. Toukokuuta 164, ja se on Romanian '
          + 'kansallisessa historiamuseossa Bukarestissa. Alueelta on löydetty yhteensä 25 '
          + 'vahataulua.',
        lahde: 'Valokuva: Dorieo, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dorieo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tablilla_encerada_de_Alburnus_Maior.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-rosia-montana-4e7a2fb1.jpg',
        lyhyt: 'Kaivostoiminnan muovaamia rinteitä Roșia Montanăn seudulla.',
        selite: 'Elokuussa 2010 otettu maisemakuva Roșia Montanăn kaivosalueelta. Louhinta on '
          + 'muovannut alueen maisemaa.',
        lahde: 'Valokuva: Cristian Bortes, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Cristian Bortes',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Roșia_Montană_(4898849681).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Roșia Montană',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mistä tiedämme, että roomalaiset louhivat kultaa täällä lähes kaksituhatta vuotta sitten?',
      'Miksi Roșia Montanăn vanhoja kaivoskäytäviä pidetään niin arvokkaina?',
    ],
    korostukset: ['Alburnus Maior|Alburnus Maior', 'Trajanus|Trajanuksen'],
    nappi: 'Roomalaisten Alburnus Maior, jonka kultakaivoksia laajennettiin Habsburgien '
      + 'aikana 1700-luvulta',
    // 23.1303 E / 46.3061 N — en-Wikipedia "Roșia Montană"
    laudat: {
      maailmankartta: { x: 6604.3, y: 1547.6 },
      europe: { x: 655.3, y: 675.7 },
    },
    teksti: 'Roșia Montană on kunta Apuseni-vuoristossa Transilvanian länsiosassa Alban '
      + 'piirikunnassa. Alueen runsaita kultaesiintymiä on hyödynnetty jo roomalaisajoista '
      + 'tai sitäkin aiemmin. Roomalaiset perustivat Trajanuksen aikana paikalle '
      + 'kaivoskaupungin nimeltä Alburnus Maior, ja varhaisin maininta on vahatauluun '
      + 'merkitty päivämäärä 6. helmikuuta 131. Arkeologit ovat löytäneet '
      + 'asuinrakennuksia, hautausmaita, kaivoskäytäviä, työkaluja, 25 vahataulua sekä '
      + 'paljon kreikan- ja latinankielisiä kirjoituksia. Kaivostoiminta jatkui '
      + 'keskiajalla ja laajeni Itävallan keisarikunnan aikana, jolloin Kaarle VI rahoitti '
      + 'vuonna 1733 kaivosalueen tekoaltaiden rakentamisen.',
    lahde: 'en-Wikipedia "Roșia Montană", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-resita',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-resita-2a8fea8a.jpg',
      lyhyt: 'Reșițan rautaruukin rakennuksia ja savupiippuja noin vuonna 1860.',
      selite: 'Andreas Grollin kuva Reșițan rautaruukista, jonka päiväykseksi on merkitty noin '
        + '1860. Kuvassa tehdasrakennukset ja korkeat savupiiput kohoavat kaupungin yllä.',
      lahde: 'Valokuva: Andreas Groll, Wikimedia Commons (Public domain).',
      tekija: 'Andreas Groll',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Andreas_Groll_-_Ironworks_in_Reschitza_-_1992.222_-_Cleveland_Museum_of_Art.tif',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-resita-ce029f66.jpg',
        lyhyt: 'Höyryveturi RESICZA vuodelta 1872 ulkoilmamuseossa.',
        selite: 'Veturi nro 2 "Resicza" on ensimmäinen nykyisen Romanian alueella rakennettu '
          + 'höyryveturi. Sen suunnitteli John Haswell.',
        lahde: 'Valokuva: Eddy Renard, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Eddy Renard',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:RO-RESITA_-_Dampflok-Museum_-_RESICZA_--_04_-_Perspektivisch_von_links_unten_(2023).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-resita-3b9aedf0.jpg',
        lyhyt: 'Veturi Hungaria matkalla Wienin maailmannäyttelyyn vuonna 1873.',
        selite: 'Vanhan kuvan otsikon mukaan Reșițassa valmistettu höyryveturi nro 4 '
          + '"Hungaria" kuljetettiin Wienin maailmannäyttelyyn 1873. Kuvaajaa ei tunneta.',
        lahde: 'Valokuva: Tuntematon valokuvaaja, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon valokuvaaja',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Resita_-_Steam_locomotive_Nr._4_\'Hungaria\'_being_transported_to_the_Universial_Exhibition_in_Vienna,_1873.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Reșița',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Reșițaan muutti 1700-luvulla saksalaisia uudisasukkaita?',
      'Millainen oli ensimmäinen Romaniassa valmistettu höyryveturi?',
    ],
    korostukset: ['Maria Teresia|Maria Teresian', 'veturi|veturi'],
    nappi: 'Vuodesta 1771 toiminut metallitehdas valmisti ensimmäisen veturinsa vasta '
      + 'edellisenä vuonna (1872)',
    // 21.8903 E / 45.3 N — en-Wikipedia "Reșița"
    laudat: {
      maailmankartta: { x: 6563, y: 1589.4 },
      europe: { x: 631.5, y: 702.2 },
    },
    teksti: 'Reșița on Caraș-Severinin piirikunnan pääkaupunki Banatin alueella '
      + 'Länsi-Romaniassa, Bârzava-joen varrella. Teollinen Reșița sai alkunsa 3. '
      + 'heinäkuuta 1771, kun Habsburgien keisarinna Maria Teresian aikana alueesta tuli '
      + 'tärkeä metallinvalmistuksen keskus. Tehtaiden ympärille tarvittiin väkeä: vuonna '
      + '1776 Reșițaan asettui 70 saksalaista perhettä, ja vuoden 1880 väestönlaskennassa '
      + 'saksalaiset olivat kaupungin enemmistö. Reșițassa valmistettiin vuonna 1872 '
      + 'Romanian ensimmäinen kotimainen veturi, joka on nykyään esillä kaupungin '
      + 'ulkoilmaveturimuseossa. Reșițaa on pitkään pidetty Romanian toiseksi suurimpana '
      + 'teollisuuskeskuksena, ja se on tärkeä teräksen valmistuksen keskus.',
    lahde: 'en-Wikipedia "Reșița", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-slanic',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-slanic-67a515f2.jpg',
      lyhyt: 'Unirea-tason valtava sali Slănicin Vanhassa suolakaivoksessa.',
      selite: 'Yleiskuva Unirea-tasosta Vanhassa suolakaivoksessa (Salina Veche) Slănicissa. '
        + 'Suolakerrosten kuviot näkyvät salien seinissä.',
      lahde: 'Valokuva: Beradrian, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Beradrian',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Unirea_salt_mine.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-slanic-0f625cff.jpg',
        lyhyt: 'Taittuneita suolakerroksia Unirea-suolakaivoksen seinässä.',
        selite: 'Suolakerrokset ovat taipuneet seinässä aaltomaisiksi kuvioiksi. Seinään on '
          + 'maalattu myös hirvikuvia.',
        lahde: 'Valokuva: Horia Varlan, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Horia Varlan',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Unirea_salt_mine_wall_(4298251367).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-slanic-331bbb3b.jpg',
        lyhyt: 'Unirea-suolakaivoksen sisäänkäynnin rakennus Slănicissa.',
        selite: 'Rakennuksen kyltissä lukee Salina Slănic Prahova, ja sen päällä kohoaa '
          + 'kaivostorni. Kuva on otettu vuonna 2008.',
        lahde: 'Valokuva: Andrei Stroe, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Andrei Stroe',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Slanic_Unirea_mine_entrance.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Slănic Prahovan suolakaivos',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi suola oli aikoinaan niin arvokasta, että sen vuoksi ostettiin kokonainen tila?',
      'Miksi vanhasta suolakaivoksesta tehtiin myöhemmin kylpylä ja museo?',
    ],
    korostukset: ['Mihail Cantacuzino|Mihail Cantacuzino', 'suolajärvet|suolajärvistään'],
    nappi: 'Suolaa oli louhittu täällä lähes 190 vuotta; Carol I -kaivos oli avattu 1867',
    // 25.9392 E / 45.2333 N — en-Wikipedia "Slănic"
    laudat: {
      maailmankartta: { x: 6698, y: 1592.2 },
      europe: { x: 709.2, y: 704 },
    },
    teksti: 'Slănic on kaupunki Prahovan piirikunnassa Muntenian alueella, ja sen nimi '
      + 'tarkoittaa slaavilaisella kielellä suolaa. Suolan louhinta alkoi noin vuonna '
      + '1685, kun Mihail Cantacuzino huomasi maan alla suolaesiintymän ja osti Slănicin '
      + 'tilan; ensimmäinen kaivos avattiin vuonna 1688. Myöhemmin louhintaa uudistettiin: '
      + 'Carol I -kaivos avattiin vuonna 1867 ja se oli käytössä vuoteen 1937 asti. '
      + 'Nykyään Vanha suolakaivos on yleisölle avoinna oleva museo, kylpylä ja '
      + 'elämyskeskus, ja suolaa louhitaan yhä Uudessa kaivoksessa. Kaupunki tunnetaan '
      + 'myös suolajärvistään.',
    lahde: 'en-Wikipedia "Slănic" ja ro-Wikipedia "Salina Slănic", johdanto-osat ja osio '
      + '"Istoric" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka osti Slănicin tilan huomattuaan suolaesiintymän 1600-luvun lopulla?',
      vaihtoehdot: [
        'Barbu Știrbei',
        'Matei Basarab',
        'Carol I',
        'Mihail Cantacuzino',
      ],
      oikea: 3,
      fakta: 'Vuonna 1713 Cantacuzino lahjoitti sekä Slănicin tilansa että suolakaivokset '
        + 'Bukarestin Colțea-luostarille.',
    },
  },
  {
    id: 'hahmotelma-herculane',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-herculane-cadffe3c.jpg',
      lyhyt: 'Herkuleen patsas suihkulähteen huipulla Piața Hercules -aukiolla.',
      selite: 'Herkuleen patsas suihkulähteessä keskustan aukiolla. Kaupungin keskustassa on '
        + 'maamerkkinä pronssikopio yhdestä roomalaisajan Herkules-patsaasta.',
      lahde: 'Valokuva: Palickap, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Palickap',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Băile_Herculane,_Piaţa_Hercules.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-herculane-0177bda4.jpg',
        lyhyt: 'Băile Herculane vuorten ympäröimässä Cernan laaksossa.',
        selite: 'Näkymä Elisabeth-huvimajalta (Foișorul Elisabeta) laaksoon, jossa kaupunki '
          + 'sijaitsee Mehedințin ja Cernan vuorten välissä.',
        lahde: 'Valokuva: Zamolx, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Zamolx',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:B.Herculane_mai_2007.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-herculane-c725a04b.jpg',
        lyhyt: 'Kylpylän kasinon rakennuskokonaisuus vuorenseinämän edessä.',
        selite: 'Kasinon rakennuskokonaisuus (Ansamblul Cazinoului) on rakennettu 1850–1900 ja '
          + '1900-luvun alussa. Julkisivun yläreunassa on latinankielinen teksti SALUTI ET '
          + 'LAETITIAE.',
        lahde: 'Valokuva: Andrei kokelburg, Wikimedia Commons (CC BY-SA 3.0 ro).',
        tekija: 'Andrei kokelburg',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Baile_Herculane_Cazinoul.JPG',
        lisenssi: 'CC BY-SA 3.0 ro',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
      },
    ],
    nimi: 'Băile Herculane',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi roomalaiset nimesivät kylpyläkaupunkinsa Herkuleen mukaan?',
      'Mitä hyötyä kuumista lähteistä oli roomalaisille ja myöhemmille kylpyläkävijöille?',
    ],
    korostukset: ['Herkules|Herkules', 'Ad Aquas Herculis|Ad Aquas Herculis'],
    nappi: 'Roomalaisten Herkuleen kylpylä, jota keisari Franz Joseph oli kehunut jo vuonna '
      + '1852',
    // 22.4142 E / 44.8786 N — en-Wikipedia "Băile Herculane"
    laudat: {
      maailmankartta: { x: 6580.5, y: 1606.8 },
      europe: { x: 641.6, y: 713.3 },
    },
    teksti: 'Băile Herculane on kylpyläkaupunki Banatissa, Caraș-Severinin piirikunnassa '
      + 'Cerna-joen laaksossa vuorten välissä. Roomalaiset perustivat paikalle Ad Aquas '
      + 'Herculis -kaupungin legendan innoittamina: sen mukaan väsynyt Herkules pysähtyi '
      + 'laaksoon kylpemään ja lepäämään. Roomalaiset aatelisherrat tekivät siitä '
      + 'vapaa-ajan keskuksen, ja alueelta on löydetty kuusi Herkules-patsasta. Vuoden '
      + '1718 jälkeen paikka kuului Itävallalle, jonka arkkitehdit ottivat roomalaisen '
      + 'amfiteatterin rauniot huomioon suunnitellessaan keskustan puistoa terasseineen. '
      + 'Keisari Franz Joseph kuului kylpylän vieraisiin, ja Itävallan keisarin kerrotaan '
      + 'vuonna 1852 pitäneen paikkaa mantereen kauneimpana kylpyläkaupunkina.',
    lahde: 'en-Wikipedia "Băile Herculane" ja ro-Wikipedia "Băile Herculane", johdanto-osat '
      + 'ja osiot "History" ja "Istoric" (tarkistettu 19.9.2026).',
  },
];
