/*
 * VIRON HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Tanskan, Ruotsin,
 * Suomen, Romanian ja Slovenian jälkeen Viro.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48 ja 51) =
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä muut EU-maiden pakat, viimeisimpänä Slovenia
 * (js/packs/hahmotelma-svn.js): jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä en-Wikipedian (tarvittaessa et-Wikipedian
 * lisälähteenä, kun en-artikkeli on tynkä) artikkelista omin sanoin
 * suomeksi (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville
 * artikkeli ja tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi
 * pulun kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva`
 * + `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä,
 * lisenssi ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta; kuvatekstit ilman lähdeviittauksia lukijalle).
 * PAATOKSET 51: noin joka kolmannella nostolla on lisäksi `visa`-kenttä
 * (kysymys, neljä vaihtoehtoa, oikea indeksi, fakta) täsmälleen kuten
 * kaupunkien täkynostoilla (js/fokusnosto.js nostonVisa): vastaus löytyy
 * noston omasta tekstistä. Vuonna 1873 Viro on jaettu Venäjän
 * keisarikunnan Viron (Estland) ja Liivinmaan (Livland) kuvernementteihin,
 * kartanoiden omistajat ovat baltiansaksalaisia ja kansallinen herääminen
 * on käynnissä (ensimmäinen yleislaulujuhla Tartossa 1869); myöhemmät
 * kohteet ovat mukana: teksti on nykytietoa ja `nappi` katsoo vuodesta
 * 1873 eteenpäin tai sanoo rehellisesti, että kohde tulee vasta
 * myöhemmin (Alatskivin linna rakennetaan 1876–85, Kuremäen Pühtitsan
 * luostari perustetaan 1891, Viron lippu vihitään 1884).
 *
 * MIKSI NÄMÄ KOHTEET: Viron pakissa (js/packs/maastokohteet-est.js) on jo
 * Suur Munamägi, Itämeri, Suomenlahti, Tartun yliopisto, Narvan linnus,
 * Kuressaaren linna, Kõpun majakka, Kihnu, Pärnu, Matsalu, Struven kaari,
 * Peipsi, Emajõgi, Kaali, Haapsalu, Rakvere, Ontikan klintti ja Lahemaa
 * sekä Tallinnan kaupunkinostot. Tämän pakin kohteet eivät toista niitä
 * (ei samoja id:itä eikä nimiä). Saarenmaa, Hiidenmaan Kõpu, Tartto,
 * Narva, Haapsalu, Pärnu, Lahemaa ja Rakvere olivat jo nostoina.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `est-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/est/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Tallinna, Viron ainoa pelikaupunki) ulkopuolella, lähin
 * nosto yli 8 lautayksikön päässä kaupungista (raja
 * KAUPUNGIN_KOHDALLA_SADE on 7), ja js/fokuskohteet.js liittää rivit
 * KOHDE_MAAT.EST:iin. `lahi: true` on sama lähizoomiportti kuin Ranskan
 * hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Viron fokuslehden rajaukseen
 * (`osuuLehteen`). Pelin karkea maailmankartta ei ulotu kaikkiin saariin
 * ja rannikkoon (Vilsandi, Muhu, Vormsi ja Kärdla ovat EST-renkaan
 * ulkopuolella); niiden koordinaatit ovat silti Wikipedian todelliset.
 */

/** Viron hahmotelmanostot: sisällölliset kohteet kaupungin (Tallinna) ulkopuolella. */
export const HAHMOTELMA_EST = [
  {
    id: 'hahmotelma-soomaa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-soomaa-63ffb84a.jpg',
      lyhyt: 'Tulvan peittämä tie Soomaalla, etualalla koverretun kanootin keula.',
      selite: 'Kevättulva on nostanut veden metsätielle, ja veden pinnalla on jäälauttoja. '
        + 'Etualalla näkyy puusta koverretun kanootin keula; tällaisten haabjaksi '
        + 'kutsuttujen kanoottien tekoperinne on säilynyt Soomaalla nykypäivään.',
      lahde: 'Valokuva: Ruukel, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ruukel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C3%9Cleujutatud_maantee_Soomaal.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-soomaa-e194e012.jpg',
        lyhyt: 'Suolampi ja harvat männyt Kuresoon kohosuolla.',
        selite: 'Suon pinnalla on avoin lampi, jota reunustaa punertava suokasvillisuus ja '
          + 'harvat männyt. Kuresoo on yksi Viron parhaiten säilyneistä laajoista soista.',
        lahde: 'Valokuva: Vaido Otsar, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vaido Otsar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kuresoo_raba_2020_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-soomaa-47adbfa8.jpg',
        lyhyt: 'Kaksi koverrettua haabjas-kanoottia peräkärryllä Soomaan kansallispuistossa.',
        selite: 'Haabjas on yhdestä puunrungosta koverrettu kanootti. Soomaalla tekoperinne on '
          + 'säilynyt 2000-luvulle asti, ja viime vuosikymmeninä kiinnostus kanoottien '
          + 'valmistamiseen on herännyt uudelleen.',
        lahde: 'Valokuva: Jürgen Regel, Marian… (Panoramio), Wikimedia Commons (CC BY 3.0).',
        tekija: 'Jürgen Regel, Marian… (Panoramio)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Einb%C3%A4ume_im_Soomaa-Nationalpark_-_panoramio.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Soomaan kansallispuisto',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Miksi Soomaalla puhutaan viidennestä vuodenajasta?',
      'Miksi koverretun kanootin tekotaito on säilynyt juuri Soomaalla?',
    ],
    korostukset: ['viides vuodenaika|viidenneksi vuodenajaksi', 'Kuresoo|Kuresoo'],
    nappi: 'Suoerämaa, josta tulee kansallispuisto vasta vuonna 1993',
    // 25.1056 E / 58.4408 N — en-Wikipedia "Soomaa National Park"
    laudat: {
      maailmankartta: { x: 6670.2, y: 1002.5 },
      europe: { x: 693.2, y: 356.6 },
    },
    teksti: 'Soomaa tarkoittaa suomaata, ja nimi sopii: 390 neliökilometrin kansallispuisto '
      + 'Lounais-Virossa suojelee laajoja kohosoita, tulvaniittyjä ja rämemetsiä, joita '
      + 'halkovat Pärnun vesistöön kuuluvat joet. Tunnetuin soista on Kuresoo. Keväisin, '
      + 'yleensä maalis–huhtikuun vaihteessa, Sakalan ylängöltä valuva vesi nostaa joet '
      + 'yli äyräidensä ja peittää tiet. Tätä tulva-aikaa sanotaan Soomaalla viidenneksi '
      + 'vuodenajaksi, ja Riisan tulva-alue voi laajimmillaan olla 175 neliökilometrin '
      + 'kokoinen. Syrjäisyyden ansiosta alueella on säilynyt haabjaksi kutsuttujen '
      + 'koverrettujen kanoottien tekoperinne.',
    lahde: 'en-Wikipedia "Soomaa National Park", johdanto-osa ja osiot "Geography", "Floods" '
      + 'ja "Traditional culture" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä Soomaalla tarkoitetaan "viidennellä vuodenajalla"?',
      vaihtoehdot: [
        'Pitkää sumuista syysjaksoa',
        'Jäätyneiden soiden hiihtokautta',
        'Kevättulvaa, joka nostaa joet yli äyräidensä',
        'Suokukkien kukinta-aikaa',
      ],
      oikea: 2,
      fakta: 'Soomaa on tärkeä lintujen levähdyspaikka: keväisin alueella pysähtyy noin 2000 '
        + 'pikkujoutsenta ja syksyisin noin tuhat kurkea. Puistossa elää myös ilveksiä, '
        + 'susia ja karhuja.',
    },
  },
  {
    id: 'hahmotelma-vilsandi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vilsandi-46292358.jpg',
      lyhyt: 'Iltataivas punertaa merenlahden yllä, kaukana Vilsandin majakan siluetti.',
      selite: 'Matala kivikkoranta ja tyyni meri heijastavat auringonlaskun värejä. '
        + 'Horisontissa erottuu Vilsandin majakan tumma siluetti Saarenmaan länsirannikon '
        + 'saaristossa.',
      lahde: 'Valokuva: Ralf Tafenau, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ralf Tafenau',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C3%95htune_Vilsandi_saar.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vilsandi-2d7f8028.jpg',
        lyhyt: 'Vilsandin valkoinen majakka tumman ukkostaivaan edessä.',
        selite: 'Kapeneva valkoinen majakkatorni kohoaa nurmikon yllä, ja sen takana taivas on '
          + 'tummunut ukkosta ennen. Kuva on otettu heinäkuussa 2022.',
        lahde: 'Valokuva: TormiTuulik, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'TormiTuulik',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vilsandi_lighthouse_before_storm_in_July.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vilsandi-043c9ebf.jpg',
        lyhyt: 'Keltaisen jäkälän peittämiä kallioita ja aaltoja Vilsandin rannikolla.',
        selite: 'Matalan kivikkorannan kalliot ovat keltaisen jäkälän peitossa, ja tuuli '
          + 'nostattaa mereen valkoharjaisia aaltoja. Ranta on avointa Itämeren rannikkoa.',
        lahde: 'Valokuva: ErikAbner, Wikimedia Commons (CC BY 4.0).',
        tekija: 'ErikAbner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vilsandi_coastline,_Estonia.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Vilsandin kansallispuisto',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi Vilsandin saaristo on niin tärkeä muuttolinnuille?',
      'Miksi alueen suojelu aloitettiin jo vuonna 1910 lintujen suojelualueena?',
    ],
    korostukset: ['haahka|haahka', 'Harilaid|Harilaidin'],
    nappi: 'Saarenmaan länsirannan saaristo; lintujen suojelualue perustetaan vasta 1910',
    // 21.8772 E / 58.3786 N — en-Wikipedia "Vilsandi National Park"
    laudat: {
      maailmankartta: { x: 6562.6, y: 1005.5 },
      europe: { x: 631.2, y: 358.2 },
    },
    teksti: 'Vilsandin kansallispuisto on merellinen suojelualue Saarenmaan länsirannikolla '
      + 'Virossa. Se kattaa osan Vilsandin saaresta, noin sata pienempää saarta ja luotoa '
      + 'sekä Saarenmaan länsiosan rannikkoa Harilaidin niemimaa mukaan lukien; Vilsandi '
      + 'on puiston ainoa asuttu saari. Puisto on kasvanut vuonna 1910 perustetusta '
      + 'lintujen suojelualueesta, ja sitä pidetään Baltian vanhimpana suojelualueena. '
      + 'Alueella on havaittu yli 250 lintulajia, ja yleisin pesijä on haahka. '
      + 'Muuttolinnut, kuten valkoposkihanhet, pysähtyvät alueen vesillä levähtämään, ja '
      + 'kolmannes Viron suojelluista kasvilajeista kasvaa puistossa. Metsästys on siellä '
      + 'kokonaan kielletty.',
    lahde: 'en-Wikipedia "Vilsandi National Park" ja et-Wikipedia "Vilsandi rahvuspark", '
      + 'johdanto-osat ja en-osio "Environment" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-endla',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-endla-5166bcd5.jpg',
      lyhyt: 'Näkötornista nähty lankkupolku, joka halkoo suolampia Endlan alueella.',
      selite: 'Kapea lankkupolku kulkee ruskeanpunertavien kasvillisuussaarekkeiden ja tummien '
        + 'suolampien välissä. Suo jatkuu horisonttiin saakka.',
      lahde: 'Valokuva: Abrget47j, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Abrget47j',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:M%C3%A4nnikj%C3%A4rve_raba_tornist.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-endla-661072ab.jpg',
        lyhyt: 'Ruovikkoinen järvi ja metsänreuna Endlan luonnonsuojelualueella.',
        selite: 'Matala järvi ulottuu metsäisten rantojen välissä, ja vedestä pilkistää '
          + 'ruovikkosaarekkeita. Alueella on paljon jäännejärviä ja soita.',
        lahde: 'Valokuva: Ivar Leidus, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Ivar Leidus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Endla_j%C3%A4rv.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-endla-66373036.jpg',
        lyhyt: 'Ilmakuva: lankkupolku ja näkötorni suolampien ja saarekkeiden keskellä.',
        selite: 'Ylhäältä katsottuna suo on tumman veden ja oranssinruskeiden saarekkeiden '
          + 'mosaiikki, jonka halki kulkee suora lankkupolku. Polun varrella on näkötorni.',
        lahde: 'Valokuva: Sillerkiil, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Sillerkiil',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Endla_nature_reserve,_boardwalk_and_observation_tower_in_J%C3%B5gevamaa,_Estonia_(spring_2023).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Endlan luonnonsuojelualue',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi suot ja lähteet ovat tärkeitä Põltsamaa-joen vesille?',
      'Mitä suon paksu turvekerros kertoo alueen historiasta?',
    ],
    korostukset: ['Endla Sinijärv|Endla Sinijärv', 'kämmekkä|kämmekkälajeja'],
    nappi: 'Suo- ja lähdealue, jonka suojelu alkaa vasta 1980-luvulla',
    // 26.1403 E / 58.8797 N — en-Wikipedia "Endla Nature Reserve"
    laudat: {
      maailmankartta: { x: 6704.7, y: 981 },
      europe: { x: 713.1, y: 345.1 },
    },
    teksti: 'Endlan luonnonsuojelualue on Keski-Virossa Pandiveren ylängön eteläosassa. Se '
      + 'suojelee makean veden järjestelmää, johon kuuluu soita, rämeitä, lähteitä ja '
      + 'puroja, ja alueella on tärkeä osa Põltsamaa-joen vesien uusiutumisessa. Alueella '
      + 'on monia jäännejärviä, joista suurin on Endla Sinijärv, ja soiden turvekerros voi '
      + 'olla jopa kahdeksan metriä paksu. Suojelu alkoi 1980-luvulla, ja valtiollinen '
      + 'luonnonsuojelualue perustettiin vuonna 1985. Alueella pesii noin 180 lintulajia '
      + 'ja kasveja on löydetty noin 450, muun muassa useita uhanalaisia kämmekkälajeja. '
      + 'Vierailijoille on näkötorneja ja luontopolkuja.',
    lahde: 'en-Wikipedia "Endla Nature Reserve" ja et-Wikipedia "Endla looduskaitseala", '
      + 'johdanto-osat (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-taevaskoja',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-taevaskoja-dee8d713.jpg',
      lyhyt: 'Punertavaa ja kellertävää hiekkakiveä Taevaskojan kalliossa joen rannalla.',
      selite: 'Kallioseinämän kerrokset vaihtelevat punaisen, oranssin ja vaalean sävyissä, ja '
        + 'niiden päällä kasvaa kuusi- ja mäntymetsää. Taevaskojan kalliot ovat '
        + 'devonikautista hiekkakiveä Ahja-joen rannalla.',
      lahde: 'Valokuva: Ilme Parik, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ilme Parik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Varing_Suur-Taevaskojas.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-taevaskoja-52bb757d.jpg',
        lyhyt: 'Talvinen joenmutka: lumiset kuuset reunustavat hiekkakivikalliota ja tummaa '
          + 'vettä.',
        selite: 'Tyyni vedenpinta peilaa lumen peittämiä puita, ja rannan törmässä näkyy '
          + 'ruskeanoranssia hiekkakiveä. Taevaskojan kalliot ovat Ahja-joen rannalla.',
        lahde: 'Valokuva: Külli Kolina, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Külli Kolina',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Talv_V%C3%A4ike-Taevaskojas.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-taevaskoja-95d330c2.jpg',
        lyhyt: 'Devonikauden hiekkakiven kerrokset Taevaskojassa punaisina ja oranssina '
          + 'juovina.',
        selite: 'Kallion pinnalla näkyy ohuita, vinoja kerroksia, jotka vaihtelevat vaaleasta '
          + 'oranssiin ja punaiseen. Taevaskojan kalliot ovat devonikautista hiekkakiveä.',
        lahde: 'Valokuva: ErikAbner, Wikimedia Commons (CC BY 4.0).',
        tekija: 'ErikAbner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Devonian_sandstone_layers_in_Taevaskoja,_Estonia.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Taevaskoja',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Miksi Ahja-joen rannoilla kohoaa korkeita punertavia hiekkakivikallioita?',
      'Mikä sai Taevaskojan kylän syntymään vasta 1930-luvulla?',
    ],
    korostukset: ['Taevaskoda|Suur Taevaskoda', 'hiekkakivi|hiekkakivipaljastumista'],
    nappi: 'Vuoden 1873 metsäkartalla nimellä Taiwaskodda pallo; kylä syntyy vasta '
      + '1930-luvulla',
    // 27.0333 E / 58.1 N — en-Wikipedia "Taevaskoja"
    laudat: {
      maailmankartta: { x: 6734.4, y: 1019 },
      europe: { x: 730.2, y: 365.6 },
    },
    teksti: 'Taevaskoja on kylä Kaakkois-Virossa Põlvan kunnassa, ja se tunnetaan Ahja-joen '
      + 'rannoilla kohoavista devonikautisista hiekkakivipaljastumista. Kylä on saanut '
      + 'nimensä Ahja-joen ikivanhan jokilaakson hiekkakivikallioista, joita kutsutaan '
      + 'taevaskodiksi. Jokilaakson maisemansuojelualueella sijaitsevat Suur Taevaskoda ja '
      + 'Väike Taevaskoda ovat Etelä-Viron vierailluimpia matkailukohteita. Kylän '
      + 'pohjoisosa kuului aiemmin Ahjan kartanolle ja eteläosa Vana-Koiolan kartanolle, '
      + 'ja Ahjan kartanon vuoden 1873 metsäkartalla mainitaan paikannimi Taiwaskodda '
      + 'pallo. Nykyinen kylä syntyi vasta 1930-luvulla Tartto–Petseri-rautatien '
      + 'rakentamisen jälkeen.',
    lahde: 'en-Wikipedia "Taevaskoja" ja et-Wikipedia "Taevaskoja", johdanto-osat ja et-osiot '
      + '"Ajalugu" ja "Loodus" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-vortsjarv',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vortsjarv-f8564641.jpg',
      lyhyt: 'Ruovikkoinen kivikkoranta Võrtsjärven avoveden äärellä iltahämärässä.',
      selite: 'Matala ranta on ruokoa ja pientä kiveä, ja etäällä avautuu järven avovesi. '
        + 'Võrtsjärv on Viron toiseksi suurin järvi ja hyvin matala.',
      lahde: 'Valokuva: Heidi Soosalu, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Heidi Soosalu',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_V%C3%B5rtsj%C3%A4rv_in_midsummer_2019.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vortsjarv-8f6c5bdd.jpg',
        lyhyt: 'Auringon kimmeltävä jää ja sulamisvesi Võrtsjärven pinnalla myöhäistalvella.',
        selite: 'Jään pinnalla on sulamisvettä ja siellä täällä yksittäinen kivenlohkare, ja '
          + 'pilvet peittävät taivaan. Järvi on jään peitossa suunnilleen marraskuusta '
          + 'huhtikuuhun.',
        lahde: 'Valokuva: Marks66, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Marks66',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:V%C3%B5rtsj%C3%A4rv_hilistalvel.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vortsjarv-5d3f3334.jpg',
        lyhyt: 'Punertava hiekkakivipaljastuma metsän reunassa Võrtsjärven itärannalla.',
        selite: 'Puiden takana kohoaa punertavaa hiekkakiveä. Tammen kylän lähellä järven '
          + 'itärannalla olevista jyrkänteistä on löytynyt devonikautisten kalojen '
          + 'fossiileja.',
        lahde: 'Valokuva: Estsiiri, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Estsiiri',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tamme_paljand_paerkson_2020.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Võrtsjärv',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi Võrtsjärven vedenpinta nousee ja laskee joka vuosi näin paljon?',
      'Miten devonikauden kalojen fossiileja päätyi järven rannan jyrkänteisiin?',
    ],
    korostukset: ['Emajõgi|Emajõgi', 'Tamme|Tammen'],
    nappi: 'Matala järvi, joka mainitaan ensi kerran noin vuonna 1229 Liivinmaan kronikassa',
    // 26.0333 E / 58.2833 N — en-Wikipedia "Võrtsjärv"
    laudat: {
      maailmankartta: { x: 6701.1, y: 1010.1 },
      europe: { x: 711, y: 360.7 },
    },
    teksti: 'Võrtsjärv on Etelä-Viron matala järvi, jonka pinta-ala on 270 neliökilometriä. Se '
      + 'on Viron toiseksi suurin järvi Peipsijärven jälkeen ja suurin kokonaan Viron '
      + 'rajojen sisällä oleva. Veden korkeus vaihtelee vuosittain keskimäärin 1,4 metriä, '
      + 'mikä on noin puolet järven keskisyvyydestä, ja järvi on jään peitossa suunnilleen '
      + 'marraskuusta huhtikuuhun. Järvestä laskee Emajõgi-joki Peipsijärveen. Itärannalla '
      + 'Tammen kylän lähellä olevista jyrkänteistä on löytynyt devonikautisten kalojen '
      + 'fossiileja, ja järven rannoilla pesii ja levähtää runsaasti lintuja.',
    lahde: 'en-Wikipedia "Võrtsjärv", johdanto-osa ja osiot "History", "Geography" ja '
      + '"Ecology" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä joki vie Võrtsjärven vedet Peipsijärveen?',
      vaihtoehdot: [
        'Narva',
        'Emajõgi',
        'Pärnu',
        'Ahja',
      ],
      oikea: 1,
      fakta: 'Ankerias on Võrtsjärven tunnetuin kala, mutta luonnonankeriaat eivät enää palaa '
        + 'järveen riittävästi, joten kalastus perustuu istutettuihin ankeriaanpoikasiin. '
        + 'Järvi mainitaan ensi kerran noin vuonna 1229 Liivinmaan kronikassa.',
    },
  },
  {
    id: 'hahmotelma-muhu',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-muhu-8064b510.jpg',
      lyhyt: 'Kiviaidan reunustama tie ja ruokokattoiset rakennukset Koguvan kylässä.',
      selite: 'Koguvan kylä on Viron parhaiten säilyneitä kyläkokonaisuuksia: kiviaitojen '
        + 'reunustamia kylänteitä, ruokokattoisia hirsirakennuksia ja vanhoja puita. '
        + 'Suurin osa rakennuksista on 1800-luvulta, mutta joukossa on myös 1700-luvun '
        + 'rakennuksia.',
      lahde: 'Valokuva: Hei1972, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Hei1972',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Koguva_k%C3%BCla,_Muhu_vald.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-muhu-2110980c.jpg',
        lyhyt: 'Muhun Pyhän Katariinan kirkko kesäisessä maisemassa.',
        selite: 'Pyhän Katariinan kirkko on keskiaikainen luterilainen kirkko Muhun saarella. '
          + 'Valkoisen kivirakennuksen päädyssä on kapea suippokaari-ikkuna, ja edessä '
          + 'kiertää kiviaita.',
        lahde: 'Valokuva: Vaido Otsar, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Vaido Otsar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Muhu_Katariina_kirik_2011_07.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-muhu-4919a181.jpg',
        lyhyt: 'Puinen tuulimylly kiviperustan päällä Koguvassa.',
        selite: 'Muhu tunnetaan perinteisistä tuulimyllyistään, joista osa on Viron ainoita '
          + 'yhä toimivia. Kuvan puinen mylly seisoo kivestä muuratun jalustan päällä.',
        lahde: 'Valokuva: Fry72, Karel Frydrýšek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Fry72, Karel Frydrýšek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:V%C4%9Btrn%C3%BD_ml%C3%BDn,_Koguva,_ostrov_Muhu,_Estonsko.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Muhu',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi Muhun Mona-linnakkeen antautuminen päätti Viron ristiretken?',
      'Miten Muhusta pääsi Saarenmaalle ja mantereelle ennen kuin Väinatamm-pengertie valmistui?',
    ],
    korostukset: ['Mona|Mona', 'Koguva|Koguvan'],
    nappi: 'Saari, jonka Saaremaahan yhdistävä Väinatamm-pengertie valmistuu vasta vuonna '
      + '1896',
    // 23.2378 E / 58.5961 N — en-Wikipedia "Muhu"
    laudat: {
      maailmankartta: { x: 6607.9, y: 994.9 },
      europe: { x: 657.4, y: 352.5 },
    },
    teksti: 'Muhu on Viron kolmanneksi suurin saari, ja sen pinta-ala on 208 neliökilometriä. '
      + 'Suuri väin erottaa sen mantereesta ja Pieni väin Saarenmaasta, ja saksaksi saarta '
      + 'kutsutaan nimillä Mohn ja Moon. Vuonna 1227 Liivinmaan Kalparitarikunnan joukot '
      + 'ylittivät jäätä pitkin Saarenmaalle, ja viimeiset pakanalliset virolaiset '
      + 'antautuivat Muhussa Mona-nimisessä pyöreässä linnakkeessa, jonka valleja on yhä '
      + 'jäljellä. Saaren länsikärjessä on Koguvan kylä, jossa on vuosisatoja vanhoja '
      + 'rakennuksia ja Muhun museo; kylässä syntyi kirjailija Juhan Smuul. Muhu tunnetaan '
      + 'myös toimivista perinteisistä tuulimyllyistään ja neulotuista sukistaan.',
    lahde: 'en-Wikipedia "Muhu", johdanto-osa ja osiot "History" ja "Culture", sekä '
      + 'en-Wikipedia "Koguva", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-otepaa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-otepaa-9567add5.jpg',
      lyhyt: 'Koivikko Pühajärven rannalla Otepään lähellä.',
      selite: 'Syksyn värittämät koivut kasvavat Pühajärven rannalla. Otepään ylänköä '
        + 'leimaavat kumpuileva maasto ja lukuisat järvet.',
      lahde: 'Valokuva: Aleksander Kaasik, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Aleksander Kaasik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Otep%C3%A4%C3%A4_P%C3%BChaj%C3%A4rv.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-otepaa-55c68c2a.jpg',
        lyhyt: 'Otepään kirkon valkoinen torni kohoaa puiden takaa.',
        selite: 'Otepään Pyhän Marian kirkon vanhimmat osat ovat 1860-luvulta, ja kirkkoa '
          + 'rakennettiin uudelleen perusteellisesti vuosina 1889–1890.',
        lahde: 'Valokuva: HendrixEesti, Wikimedia Commons (Public domain).',
        tekija: 'HendrixEesti',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Otep%C3%A4%C3%A4_church_2007_1.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-otepaa-41b794ea.jpg',
        lyhyt: 'Vanha mustavalkoinen maisemakuva Pühajärven rannalta.',
        selite: 'Otepään maisemaa esittävä kuva 1930-luvulta: etualalla Pühajärven ranta, '
          + 'kaukana siintävät kylä ja terävä torni.',
        lahde: 'Valokuva: Adolf Purve, Wikimedia Commons (Public domain).',
        tekija: 'Adolf Purve',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Otep%C3%A4%C3%A4_maastik_-_P%C3%BChaj%C3%A4rv,_AM_N06007.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Otepää',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi Otepään linnan raunioista löytynyt tuliase on niin merkittävä?',
      'Miksi Otepäätä kutsutaan Viron talvipääkaupungiksi?',
    ],
    korostukset: ['Nuustaku|Nuustaku', 'tuliase|tuliase'],
    nappi: 'Nuustaku-niminen asutus; Viron lippu vihitään täällä vasta vuonna 1884',
    // 26.4958 E / 58.0594 N — en-Wikipedia "Otepää"
    laudat: {
      maailmankartta: { x: 6716.5, y: 1021 },
      europe: { x: 719.9, y: 366.6 },
    },
    teksti: 'Otepää on kaupunki Etelä-Virossa Otepään ylängöllä, jonka kumpuilevassa maastossa '
      + 'on lukuisia järviä, kuten Pühajärv. Nimi tarkoittaa etelävirossa "Otin päätä", ja '
      + 'ott on kiertoilmaus karhulle. Paikalla oli muinaislinnake, jonka saksalaiset '
      + 'ristiretkeläiset valloittivat vuonna 1224, ja piispa Hermann rakennutti sinne '
      + 'Viron ensimmäisen kivilinnan. Linnan raunioista on löydetty Euroopan vanhin '
      + 'säilynyt tuliase, jonka ajoitetaan vuoteen 1396 tai sitä aiemmaksi. Asutus sai '
      + 'nimen Nuustaku vuonna 1862, ja nykyisen nimensä se sai vasta 1922. Nuustakun '
      + 'kirkossa vihittiin vuonna 1884 lippu, josta tuli Viron kansallislippu.',
    lahde: 'en-Wikipedia "Otepää", johdanto-osa ja osiot "History" ja "Geography" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-viljandi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-viljandi-255d777d.jpg',
      lyhyt: 'Viljandin päälinnan rauniot: konventtirakennuksen seinä, portti ja kaivo.',
      selite: 'Kuvassa näkyvät Viljandin päälinnan rauniot etelästä katsottuna: vasemmalla '
        + 'konventtirakennuksen pystyyn jäänyt seinä, taustalla ensimmäisen esilinnan '
        + 'portti ja oikealla kaivo. Raunioalueella on avoimen lavan penkkejä.',
      lahde: 'Valokuva: Otoomet, Wikimedia Commons (Public domain).',
      tekija: 'Otoomet',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Viljandi_castle_main.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-viljandi-75be8538.jpg',
        lyhyt: 'Linnan raunioiden kivimuuri ja Viljandi-järvi taustalla.',
        selite: 'Konventtirakennuksen eteläseinän jäänteitä ulkopuolelta katsottuna. Taustalla '
          + 'häämöttää Viljandi-järvi.',
        lahde: 'Valokuva: Otoomet, Wikimedia Commons (Public domain).',
        tekija: 'Otoomet',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Viljandi_castle_convent_south.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-viljandi-1a51337f.jpg',
        lyhyt: 'Viljandin (Fellin) linnan rauniot värillisessä postikortissa 1910-luvulta.',
        selite: 'Vanha postikortti esittää linnamäen rauniomuureja, joiden takaa nousee tornin '
          + 'huippu. Kortin saksankielinen teksti on "Fellin, Schlosshof", eli Viljandin '
          + 'linnanpiha.',
        lahde: 'Valokuva: Tuntematon (kustantaja Ernst Ring), Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon (kustantaja Ernst Ring)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ernst_Ring%27i_foto,_Viljandi_kaevum%C3%A4gi_1910_aastal_(Fellin_-1910).jpeg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Viljandi',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millaiset sodat jättivät Viljandin suuren linnan raunioiksi?',
      'Miksi Viljandi oli pitkään ilman kaupunkioikeuksia, ja mikä muuttui vuonna 1783?',
    ],
    korostukset: ['Fellin|Fellin', 'Kalparitarikunta|Kalparitarikunta'],
    nappi: 'Fellin, piirikuntakaupunki vuodesta 1783; linna oli raunio, Sakala-lehti syntyy '
      + 'vasta 1878',
    // 25.6 E / 58.3667 N — en-Wikipedia "Viljandi"
    laudat: {
      maailmankartta: { x: 6686.7, y: 1006.1 },
      europe: { x: 702.7, y: 358.6 },
    },
    teksti: 'Viljandi on Etelä-Viron kaupunki Viljandi-järven luoteisrannalla Pärnun ja Tartun '
      + 'välissä. Paikan muinaislinnakkeen ensimmäinen kirjallinen maininta on vuodelta '
      + '1154, ja Kalparitarikunta valtasi linnakkeen vuonna 1223. Sen paikalle '
      + 'rakennettiin Viljandin (saksaksi Fellin) linna, joka oli yksi Baltian suurimmista '
      + 'ja ritarikunnan tärkeä tukikohta. Kaupunki liittyi 1300-luvulla Hansaliittoon, '
      + 'sillä se oli kauppiaiden pysähdyspaikka matkalla Venäjälle. Linna ja kaupunki '
      + 'tuhoutuivat sodissa, ja Viljandista tuli Katariina II:n uudistusten myötä '
      + 'piirikuntakaupunki vuonna 1783. Nykyään linnan raunioissa toimii perinnemusiikin '
      + 'keskus.',
    lahde: 'en-Wikipedia "Viljandi", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä kauppaliiton jäseneksi Viljandi liittyi 1300-luvulla, koska se oli '
        + 'kauppiaiden pysähdyspaikka matkalla Venäjälle?',
      vaihtoehdot: [
        'Reinin kaupunkiliitto',
        'Novgorodin kauppaliitto',
        'Hansaliitto',
        'Baltian kauppakilta',
      ],
      oikea: 2,
      fakta: 'Viljandin kansanmusiikkifestivaali pidetään perinteisesti heinäkuun lopussa, ja '
        + 'se on Viron suurin vuosittainen musiikkifestivaali: vuonna 2006 konsertteihin '
        + 'tuli yli 24 000 kävijää.',
    },
  },
  {
    id: 'hahmotelma-paldiski',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-paldiski-e9fe29ca.jpg',
      lyhyt: 'Pakrin rannikkojyrkänne jäätyneen Paldiskin lahden rannalla.',
      selite: 'Kerroksellinen Pakrin jyrkänne kohoaa Paldiskin lahden jäätyneen rannan yllä, '
        + 'ja kalliosta roikkuu jääpuikkoja.',
      lahde: 'Valokuva: Ivar Leidus, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ivar Leidus',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Paldiski_bay_and_Pakri_cliff.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-paldiski-f12b1809.jpg',
        lyhyt: 'Piirros Baltisportista vuodelta 1842: jyrkänne ja majakka.',
        selite: 'Vuonna 1842 julkaistun kirjan piirros, jonka otsikko on Baltisport '
          + '(Paldiski). Jyrkänteen takana kohoaa majakan torni.',
        lahde: 'Valokuva: Tuntematon (kirja 1842), Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon (kirja 1842)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:RIGBY(1842)_Baltic_letters,_p1.165_BALTISPORT_(Pakri_Cliff,_Paldiski).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-paldiski-ea22bd1d.jpg',
        lyhyt: 'Paldiskin Pyhän Nikolauksen luterilainen kirkko lumisessa maisemassa.',
        selite: 'Paldiskin Pyhän Nikolauksen kirkko on rakennettu vuonna 1841. Valkoisessa '
          + 'rakennuksessa on pieni torni ja punainen katto.',
        lahde: 'Valokuva: Ivar Leidus, Wikimedia Commons (CC BY-SA 3.0 ee).',
        tekija: 'Ivar Leidus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Paldiski_Nikolai_kirik.jpg',
        lisenssi: 'CC BY-SA 3.0 ee',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
      },
    ],
    nimi: 'Paldiski',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Paldiskin linnoitus ja satama jäivät kesken Pietari Suuren kuoleman jälkeen?',
      'Miksi Pietari Suuri valitsi uuden sotasatamansa paikaksi juuri Rågervikin lahden?',
    ],
    korostukset: ['Rågervik|Rågervik', 'Pietari Suuri|Pietari Suuri'],
    nappi: 'Baltiiski Port eli Baltisch-Port, jonka jäätön satama sai rautatieyhteyden '
      + 'Pietariin vuonna 1870',
    // 24.05 E / 59.35 N — en-Wikipedia "Paldiski"
    laudat: {
      maailmankartta: { x: 6635, y: 957.9 },
      europe: { x: 673, y: 332.7 },
    },
    teksti: 'Paldiski on rannikkokaupunki Luoteis-Virossa Pakrin niemimaalla Suomenlahden '
      + 'rannalla. Alueen ensimmäinen tunnettu nimi oli ruotsalainen Rågervik, '
      + '"ruissaarten lahti". Pietari Suuri päätti vuonna 1715 rakentaa lahden rannalle '
      + 'uuden sotalaivastosataman, ja työt aloitettiin seremonialla 1718; suunnitelmaan '
      + 'kuuluivat linnoitus, aallonmurtaja ja majakka. Työt hidastuivat keisarin kuoleman '
      + 'jälkeen ja pysähtyivät 1730-luvun alkuun mennessä, ja Katariina Suuri antoi '
      + 'satamalle vuonna 1762 nimen Baltiiski Port, "Itämeren satama". Kaupunki sai '
      + 'kaupunkioikeudet 1783. Vuonna 1870 valmistui rautatie Pietarista Tallinnan kautta '
      + 'Paldiskiin, jotta sataman jäätömyyttä voitiin hyödyntää tavaroiden kuljetuksessa '
      + 'Pietariin. Nykyään satamista lähtee lauttoja Ruotsiin.',
    lahde: 'en-Wikipedia "Paldiski", johdanto-osa ja osiot "Etymology" ja "History" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä Baltiiski Portin sataman ominaisuus oli syynä siihen, että sinne '
        + 'rakennettiin rautatie Pietarin tavaraliikennettä varten?',
      vaihtoehdot: [
        'Satama oli Suomenlahden syvin ja suurin',
        'Satama pysyi talvellakin vapaana jäästä',
        'Satama oli lähimpänä Tukholman kauppaa',
        'Satama oli suojassa kaikilta myrskyiltä',
      ],
      oikea: 1,
      fakta: 'Nykyinen nimi Paldiski vahvistettiin viralliseksi 19. kesäkuuta 1933. Venäjän '
        + 'keisari Nikolai II ja Saksan keisari Vilhelm II tapasivat Baltiiskissa '
        + 'viimeisen kerran kesäkuussa 1912, pari vuotta ennen maailmansotaa.',
    },
  },
  {
    id: 'hahmotelma-padise',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-padise-24b8e900.jpg',
      lyhyt: 'Padisen luostarin kivimuurit ja pyöreä torni nurmikon reunalla.',
      selite: 'Padisen kistersiläisluostarin kivimuurit kohoavat nurmikon takaa; kulmassa on '
        + 'pyöreä torni ja seinässä suippokaari-ikkuna. Rauniot kunnostettiin ja avattiin '
        + 'vierailijoille uudelleen vuonna 2020.',
      lahde: 'Valokuva: Madise khk, Wikimedia Commons (CC0).',
      tekija: 'Madise khk',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Padise_klooster.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-padise-5785f2d7.jpg',
        lyhyt: 'Luostarikirkon holvattu sisätila, jossa valo tulee suippokaari-ikkunasta.',
        selite: 'Luostarikirkon kivinen sisätila kohoaa korkeille suippokaarille, ja kaukaisen '
          + 'päädyn ikkunasta tulvii valoa. Holvit lisättiin kirkon kattoon 1400-luvulla.',
        lahde: 'Valokuva: Athanasius Soter, Wikimedia Commons (CC BY-SA 3.0 ee).',
        tekija: 'Athanasius Soter',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Padise_kloostri_kirik_koori_poolt.JPG',
        lisenssi: 'CC BY-SA 3.0 ee',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-padise-53923289.jpg',
        lyhyt: 'Holvattu tila pylväineen ja ikkunasyvennyksineen Padisen luostarissa.',
        selite: 'Pylväs kannattaa ristiholveja, ja seinien syvennyksistä tulee valoa pieniin '
          + 'ikkunoihin. Tilan muurit ja holvit ovat luostarin keskiaikaista rakennusta.',
        lahde: 'Valokuva: simka, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'simka',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:V%C3%B5lvid_Padise_kloostris.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Padisen luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Padisen luostari muutettiin linnoitukseksi vuonna 1559?',
      'Miksi Padisen munkit muuttivat Latviasta Viroon?',
    ],
    korostukset: ['kistersiläiset|kistersiläisluostari', 'Dünamünde|Dünamündessä'],
    nappi: 'Raunio salamaniskun 1766 jälkeen; alue on Ramm-suvun omistuksessa vuoteen 1919 '
      + 'asti',
    // 24.1449 E / 59.2242 N — en-Wikipedia "Padise Abbey"
    laudat: {
      maailmankartta: { x: 6638.2, y: 964.1 },
      europe: { x: 674.8, y: 336 },
    },
    teksti: 'Padisen luostari oli kistersiläisluostari Harjumaalla Pohjois-Virossa. Sen munkit '
      + 'menettivät aiemman luostarinsa Dünamündessä Latviassa, kun Saksalainen '
      + 'ritarikunta otti sen haltuunsa vuonna 1305, ja he asettuivat Padiseen vuonna 1310 '
      + 'Tanskan kuninkaan luvalla. Kivirakennusten työt alkoivat vasta 1317, ja '
      + 'luostarista tuli 1400-luvulla yksi Viron tärkeimmistä hengellisistä keskuksista, '
      + 'jolla oli maita myös Etelä-Suomessa. Liivinmaan sodassa ritarikunnan mestari '
      + 'Gotthard Kettler lakkautti luostarin vuonna 1559 ja muutti sen linnoitukseksi '
      + 'peläten ruotsalaisten valtaavan sen. Vuodesta 1622 alue oli Ramm-suvun hallussa; '
      + 'suku rakensi luostarin tiloihin barokkikartanon, joka paloi salaman iskusta 1766. '
      + 'Rauniot avattiin uudelleen museona vuonna 2020 kunnostuksen jälkeen.',
    lahde: 'en-Wikipedia "Padise Abbey", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-koluvere',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-koluvere-0d603152.jpg',
      lyhyt: 'Koluveren linnan pyöreä tykkitorni ja siipirakennus heijastuvat veteen.',
      selite: 'Vaaleanpunertavat paksut muurit ja punainen kartiokatto kohoavat veden yllä. '
        + 'Linna on rakennettu tekosaarelle, jonka ympärillä on padotun joen vettä.',
      lahde: 'Valokuva: Piret Pärnpuu, Wikimedia Commons (CC BY-SA 3.0 ee).',
      tekija: 'Piret Pärnpuu',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Koluvere_linnus_vallikraaviga.jpg',
      lisenssi: 'CC BY-SA 3.0 ee',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-koluvere-f9a8cb31.jpg',
        lyhyt: 'Koluveren linnan valkoiseksi rapatut muurit, nelikulmainen torni ja pyöreä '
          + 'torni.',
        selite: 'Korkea nelikulmainen torni kuuluu linnan vanhimpiin osiin, ja vasemmalla '
          + 'näkyvä pyöreä tykkitorni lisättiin 1500-luvulla. Punaiset katot erottuvat '
          + 'valkoisia muureja vasten.',
        lahde: 'Valokuva: Luc Saffre, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Luc Saffre',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Koluvere_linnus_(September_2015,_eest).JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-koluvere-500a134c.jpg',
        lyhyt: 'Piirros Koluveren linnasta (Castle Lode) vuoden 1842 matkakirjassa.',
        selite: 'Piirroksessa linnan pyöreä torni, nelikulmainen torni ja rauniomaiset '
          + 'siipirakennukset heijastuvat veteen; oikealla näkyy obeliskein koristeltu '
          + 'kaarisilta. Piirros on Itämeren rannoilla asumista kuvaavasta kirjasta, joka '
          + 'julkaistiin 1842.',
        lahde: 'Valokuva: Tuntematon piirtäjä; kirja: Elizabeth Rigby, A Residence on the Shores of the Baltic (1842), British Library, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon piirtäjä; kirja: Elizabeth Rigby, A Residence on the Shores of the Baltic (1842), British Library',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:RIGBY(1842)_Baltic_letters,_p2.070_RUINS_OF_LODE_CASTLE_(Koluvere_Castle).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Koluveren linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Koluveren linna on rakennettu tekosaarelle joen keskelle?',
      'Miksi linnaan lisättiin 1500-luvulla suuri pyöreä tykkitorni vanhan tornin viereen?',
    ],
    korostukset: ['tekosaari|tekosaarelle', 'tykkitorni|tykkitorni'],
    nappi: 'Buxhoevedenin suvun kartano; tulipalo oli vaurioittanut vanhaa piispanlinnaa jo '
      + 'vuonna 1840',
    // 24.1042 E / 58.9056 N — en-Wikipedia "Koluvere Castle"
    laudat: {
      maailmankartta: { x: 6636.8, y: 979.8 },
      europe: { x: 674, y: 344.4 },
    },
    teksti: 'Koluveren linna sijaitsee Länsi-Virossa Läänemaalla, ja paikalla on ollut '
      + 'linnoitus jo 1200-luvulta. Vuonna 1439 se siirtyi Saare-Läänen piispalle ja oli '
      + 'yksi hänen pääasunnoistaan. Linna on rakennettu tekosaarelle, joka syntyi '
      + 'Liivi-joen padotun osan keskelle, ja sen korkea nelikulmainen torni on '
      + 'luultavasti peräisin 1200-luvun alusta, joten se on yksi Viron vanhimmista '
      + 'linnantorneista. Tuliaseiden yleistyttyä linnaan lisättiin 1500-luvulla suuri '
      + 'pyöreä tykkitorni. Kun linna menetti sotilaallisen merkityksensä, siitä tehtiin '
      + 'mukava aatelisasunto: sisätilat sisustettiin 1770 tienoilla rokokoo-tyyliin ja '
      + '1800-luvulla uusgoottilaisiksi.',
    lahde: 'en-Wikipedia "Koluvere Castle", johdanto-osa ja osio "Architecture" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-alatskivi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-alatskivi-d3630033.jpg',
      lyhyt: 'Alatskivin uusgoottilainen linna edestä nähtynä.',
      selite: 'Valkoisessa, epäsymmetrisessä rakennuksessa on kulmatorneja, kaareva '
        + 'sisäänkäynti ja liuskekatto. Linna rakennettiin 1876–1885 Skotlannin '
        + 'Balmoral-linnan tyyliin.',
      lahde: 'Valokuva: Hei1972, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Hei1972',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alatskivi_Castle,_Tartumaa,_Estonia.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-alatskivi-6450fcbe.jpg',
        lyhyt: 'Alatskivin linnan pyöreä kulmatorni ja siipirakennus viistosti sivusta.',
        selite: 'Pyöreä torni teräväkärkisine kattoineen ja portaittaiset päädyt antavat '
          + 'linnalle skotlantilaisen linnan ilmeen. Linna kunnostettiin 2005–2011.',
        lahde: 'Valokuva: Tauno Erik, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Tauno Erik',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alatskivi_castle_2011.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-alatskivi-d2ec4a12.jpg',
        lyhyt: 'Näkymä Alatskivin linnalle kartanon portin holvin läpi.',
        selite: 'Linnan edessä on soraa ja nurmikenttä, ja portin holvikaari kehystää '
          + 'valkoisen rakennuksen.',
        lahde: 'Valokuva: Ehitisennistaja, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Ehitisennistaja',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alatskivi_loss_vaadatuna_v%C3%A4ravast.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Alatskivin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi baltiansaksalainen paroni rakennutti virolaiseen kartanoon linnan Skotlannin Balmoralin mallin mukaan?',
      'Mitä kaikkea suuren kartanon alueella oli linnan lisäksi?',
    ],
    korostukset: ['Balmoral|Balmoral-linnan', 'Eduard Tubin|Eduard Tubinin'],
    nappi: 'Nolckenin suvun kartano; nykyinen linna rakennetaan vasta vuosina 1876–1885',
    // 27.1333 E / 58.5997 N — en-Wikipedia "Alatskivi"
    laudat: {
      maailmankartta: { x: 6737.8, y: 994.7 },
      europe: { x: 732.2, y: 352.4 },
    },
    teksti: 'Alatskivin linna on uusgoottilainen kartanolinna Tartumaalla, noin 40 kilometriä '
      + 'Tartosta pohjoiseen Alatskivi-järven korkealla rannalla. Kartano mainitaan '
      + 'ensimmäisen kerran vuonna 1601, ja Nolckenin suku peri sen 1870. Paroni Arved von '
      + 'Nolcken rakennutti linnan uudelleen vuosina 1876–1885 omien suunnitelmiensa '
      + 'mukaan Skotlannin Balmoral-linnan tyyliin, jossa hän oli käynyt vuonna 1875. '
      + 'Rakennus on epäsymmetrinen, ja siinä on torneja ja liuskekatto. Kartanossa oli '
      + '1800-luvulla 57 rakennusta, joista 41 on säilynyt, ja linnaa ympäröi 130 '
      + 'hehtaarin puisto. Ensimmäisessä kerroksessa on säveltäjä Eduard Tubinin museo.',
    lahde: 'en-Wikipedia "Alatskivi Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-kuremae',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-kuremae-b478fa87.jpg',
      lyhyt: 'Pühtitsan luostarin pääkirkko tummine kupoleineen.',
      selite: 'Punatiilinen kirkko keltaisine pintoineen on rakennettu venäläiseen '
        + 'herätystyyliin ja vihitty käyttöön 1910. Kuvassa näkyy myös muutamia '
        + 'vierailijoita pihalla.',
      lahde: 'Valokuva: Vaido Otsar, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Vaido Otsar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kurem%C3%A4e_nunnaklooster_2014_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-kuremae-77d44b36.jpg',
        lyhyt: 'Pühtitsan luostari metsien ympäröimänä ilmasta nähtynä.',
        selite: 'Vihreäkattoiset rakennukset, kivimuuri ja pääkirkko sijaitsevat laajan '
          + 'metsäalueen keskellä Ida-Virumaalla. Luostari on yksi Baltian suurimmista '
          + 'ortodoksisista luostariyhteisöistä.',
        lahde: 'Valokuva: Kaiti Lillipuu, Wikimedia Commons (CC BY-SA 3.0 ee).',
        tekija: 'Kaiti Lillipuu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kurem%C3%A4e_kloostri_hooned_%C3%B5hust_l%C3%A4%C3%A4ne_k%C3%BClg.JPG',
        lisenssi: 'CC BY-SA 3.0 ee',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-kuremae-665fbeaf.jpg',
        lyhyt: 'Pühtitsan luostarin porttirakennus koristeellisine torneineen.',
        selite: 'Kivi- ja tiiliseinäisessä porttirakennuksessa on koristeellinen puinen torni. '
          + 'Portin vieressä kukkii kukkapenkkejä.',
        lahde: 'Valokuva: Ilme Parik, Wikimedia Commons (CC BY-SA 3.0 ee).',
        tekija: 'Ilme Parik',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kurem%C3%A4e_kloostri_peav%C3%A4rav.jpg',
        lisenssi: 'CC BY-SA 3.0 ee',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
      },
    ],
    nimi: 'Kuremäen Pühtitsan luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi paikkaa kutsutaan nimellä Pühitsetud eli siunattu?',
      'Miksi Kostroman luostarista lähetettiin nunna perustamaan luostaria Viroon?',
    ],
    korostukset: ['Pühitsetud|Pühitsetud', 'ikonin|ikonin'],
    nappi: 'Perustetaan vasta 1891; Jumalanäidin ikoni on löydetty paikalta jo 1500-luvulla',
    // 27.5364 E / 59.2025 N — en-Wikipedia "Pühtitsa Convent"
    laudat: {
      maailmankartta: { x: 6751.2, y: 965.2 },
      europe: { x: 739.9, y: 336.6 },
    },
    teksti: 'Pühtitsan eli Kuremäen luostari on venäläisortodoksinen naisluostari Itä-Virossa '
      + 'Ida-Virumaalla, Peipsijärven ja Suomenlahden välissä. Paikka tunnetaan nimellä '
      + 'Pühitsetud, siunattu, ja legendan mukaan kuremäkeläinen paimen näki lähteen luona '
      + 'jumalallisen ilmestyksen. Myöhemmin 1500-luvulla paikalliset löysivät valtavan '
      + 'tammen alta Jumalanäidin kuolonuneen kuvaavan ikonin, joka on yhä luostarin '
      + 'hallussa. Vuonna 1888 Venäjän ortodoksinen kirkko lähetti nunnan Kostroman '
      + 'Ipatjevin luostarista perustamaan luostaria, ja se perustettiin vuonna 1891. '
      + 'Pääkirkko rakennettiin Mihail Preobraženskin piirustusten mukaan venäläiseen '
      + 'herätystyyliin ja vihittiin 1910, ja luostarissa on kuusi kirkkoa.',
    lahde: 'en-Wikipedia "Pühtitsa Convent", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-keila-joa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-keila-joa-5dab5fce.jpg',
      lyhyt: 'Keilan putous syksyisessä lehtimetsässä.',
      selite: 'Keila-joen vesi putoaa monena kapeana virtana kynnyksen yli vihreän metsän '
        + 'ympäröimänä. Keilan putous on Viron kolmanneksi voimakkain vesiputous.',
      lahde: 'Valokuva: AndreasToomas, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'AndreasToomas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Keila_juga_s%C3%BCgisel.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-keila-joa-d56b078d.jpg',
        lyhyt: 'Schloss Fall eli Keila-Joan kartano ja putous 1800-luvun painokuvassa.',
        selite: 'Wilhelm Siegfried Stavenhagenin vuodelle 1866 päivätyssä kuvassa '
          + 'uusgoottilainen kartano torneineen kohoaa joen rannalla, ja putous näkyy '
          + 'oikealla. Puistossa kävelee ihmisiä.',
        lahde: 'Valokuva: Wilhelm Siegfried Stavenhagen, Wikimedia Commons (Public domain).',
        tekija: 'Wilhelm Siegfried Stavenhagen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schloss_Fall.png',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-keila-joa-650e1795.jpg',
        lyhyt: 'Keila-Joan kartanon päärakennus ja porttirakennus ilmasta katsottuna.',
        selite: 'Vaalea, vuosina 1831–1833 rakennettu kartano seisoo metsäisen puiston '
          + 'keskellä nurmikenttien ympäröimänä. Edessä näkyy punainen porttirakennus.',
        lahde: 'Valokuva: Kaiti Lillipuu, Wikimedia Commons (CC BY-SA 3.0 ee).',
        tekija: 'Kaiti Lillipuu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Keila-Joa_m%C3%B5isa_peahoone_%C3%B5hust_ida_k%C3%BClg.JPG',
        lisenssi: 'CC BY-SA 3.0 ee',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
      },
    ],
    nimi: 'Keila-Joa',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi pieni kylä on saanut nimensä Keilan putouksen mukaan?',
      'Mitä uusgoottilainen tyyli tarkoittaa ja miksi se oli 1830-luvulla uutta Virossa?',
    ],
    korostukset: ['Schloss Fall|Schloss Fall', 'Andrei Stackenschneider|Andrei Stackenschneiderin'],
    nappi: 'Kreivi Benckendorffin perheen Schloss Fall; uusgoottilainen kartano valmistui '
      + '1833',
    // 24.2986 E / 59.3986 N — en-Wikipedia "Keila-Joa"
    laudat: {
      maailmankartta: { x: 6643.3, y: 955.5 },
      europe: { x: 677.7, y: 331.4 },
    },
    teksti: 'Keila-Joa on pieni taajama Pohjois-Virossa Harjumaalla, ja sen nimi tarkoittaa '
      + 'kirjaimellisesti Keilan putousta. Keila-joen Keilan putous on Viron kolmanneksi '
      + 'voimakkain vesiputous, ja paikalla on myös pieni vesivoimala. Putouksen äärellä '
      + 'on ollut kartano 1600-luvulta lähtien, ja saksaksi sitä kutsuttiin nimellä '
      + 'Schloss Fall. Nykyinen päärakennus rakennettiin vuosina 1831–1833 pietarilaisen '
      + 'arkkitehdin Andrei Stackenschneiderin piirustusten mukaan, ja se on yksi Viron '
      + 'varhaisimmista uusgoottilaisista rakennuksista. Kartano oli kreivi Alexander von '
      + 'Benckendorffin perheen, ja keisarillisen ajan vieraisiin kuuluivat muun muassa '
      + 'Venäjän keisarillinen perhe, sopraano Henriette Sontag ja säveltäjä Aleksei Lvov.',
    lahde: 'en-Wikipedia "Keila-Joa", johdanto-osa ja osio "Keila-Joa Manor" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-vasknarva',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vasknarva-d850d776.jpg',
      lyhyt: 'Vasknarvan linnan rauniomuuri kesäisen taivaan alla.',
      selite: 'Muurista on jäljellä korkea osa, jossa näkyy ikkuna-aukkoja. Linna rakennettiin '
        + '1400-luvulla, ja se tuhoutui 1610–1617 käydyssä sodassa.',
      lahde: 'Valokuva: Ervin Pabbo, Wikimedia Commons (CC BY-SA 3.0 ee).',
      tekija: 'Ervin Pabbo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vasknarva_kindluse_varemed_01.jpg',
      lisenssi: 'CC BY-SA 3.0 ee',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vasknarva-58634e1c.jpg',
        lyhyt: 'Veneitä rannalla Vasknarvassa Narva-joen alkulähteillä.',
        selite: 'Kylä sijaitsee Peipsijärven pohjoisrannalla. Narva-joki muodostaa Vasknarvan '
          + 'kohdalla rajan Venäjän kanssa.',
        lahde: 'Valokuva: Aleksander Kaasik, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Aleksander Kaasik',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Narva_j%C3%B5el.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vasknarva-4c35a99a.jpg',
        lyhyt: 'Profeetta Elian ortodoksinen kirkko Vasknarvassa.',
        selite: 'Valkoisen kirkon vieressä on hautausmaa, jossa on valkoisia ortodoksiristejä. '
          + 'Kylässä on kirkon lisäksi myös nunnaluostari.',
        lahde: 'Valokuva: Vaido Otsar, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vaido Otsar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Prohvet_Eeliase_kirik_Vasknarvas_2014_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Vasknarva',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Vasknarvan nimeen liittyy vask eli kupari?',
      'Miksi Vasknarvan linna oli rajaseudulla niin tärkeä paikka?',
    ],
    korostukset: ['Liivinmaan ritarikunta|Liivinmaan ritarikunnan', 'vanhauskoisia|vanhauskoisia'],
    nappi: 'Kalastajakylä linnan raunioilla; profeetta Elian ortodoksinen kirkko rakennettu '
      + 'jo 1818',
    // 27.7386 E / 58.9994 N — en-Wikipedia "Vasknarva"
    laudat: {
      maailmankartta: { x: 6758, y: 975.2 },
      europe: { x: 743.8, y: 341.9 },
    },
    teksti: 'Vasknarva on kylä Koillis-Virossa Peipsijärven pohjoisrannalla, Narva-joen '
      + 'alkulähteen vasemmalla rannalla, jossa joki muodostaa rajan Venäjän kanssa. Kylä '
      + 'syntyi 1300-luvulla Liivinmaan ritarikunnan linnan viereen, ja uusi linna '
      + 'rakennettiin paikalle vuosina 1427–1442 alueen hallintokeskukseksi. Ruotsin '
      + 'vallan aikana linnoitus rakennettiin uudelleen, ja se valvoi Narva-joen suuta ja '
      + 'rajaa Venäjään, mutta Venäjän ja Ruotsin sodassa 1610–1617 se tuhoutui kokonaan. '
      + 'Linnan kiviä käytettiin kalastajakylän uudelleenrakentamiseen, ja osa kolme '
      + 'metriä paksuista muureista on säilynyt. Yhden selityksen mukaan kylän nimi '
      + 'viittaa linnan kuparikattoon, ja nykyisistä asukkaista suurin osa on '
      + 'vanhauskoisia ortodokseja.',
    lahde: 'en-Wikipedia "Vasknarva", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-setomaa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-setomaa-80278768.jpg',
      lyhyt: 'Setojen tsässon, hirsinen kappeli, Obinitsan kylässä syksyllä.',
      selite: 'Tsässon on setokylän oma pieni hirsikappeli. Obinitsan kappelin edessä on avoin '
        + 'kuisti, ja sitä ympäröi syksyinen kylän piha aitoineen ja hedelmäpuineen.',
      lahde: 'Valokuva: Rein Järvelill, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Rein Järvelill',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Obinitsa_ts%C3%A4sson_2013_s%C3%BCgis.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-setomaa-4f351a69.jpg',
        lyhyt: 'Obinitsan vaaleanvihreä ortodoksinen kirkko metsän reunassa.',
        selite: 'Obinitsan ortodoksisessa kirkossa on kaksi pientä ristein koristettua tornia '
          + 'ja valkoinen kivijalka. Ortodoksinen usko on setojen perinteinen uskonto.',
        lahde: 'Valokuva: Klarqa, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Klarqa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Orthodox_church_in_Obinitsa,_Estonia_03.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-setomaa-3867fe22.jpg',
        lyhyt: 'Peko-hahmon puinen veistos Setomaan talomuseossa Värskassa.',
        selite: 'Peko on setojen jumalhahmo, ja sen nimeä kantaa Kuningaskunnan päivänä '
          + 'valittavan "kuningaskunnan" hoitaja. Pöydällä hahmon vieressä on '
          + 'lasipurkeissa viljanäytteitä.',
        lahde: 'Valokuva: Klarqa, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Klarqa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Peko_god_Setomaa_region_Estonia_Varska.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Setomaa',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi setojen laulutapa leelo on niin erityinen, että UNESCO otti sen aineettoman kulttuuriperinnön luetteloonsa?',
      'Mitä ihmettä on Setomaan "kuningaskunta", ja kuka on kuningas Peko?',
    ],
    korostukset: ['leelo|leelo', 'Peko|Pekon'],
    nappi: 'Setot vapautettiin maaorjuudesta vasta 1861–1866; Jakob Hurt kirjasi nimen '
      + 'Setomaa 1869',
    // 27.6 E / 57.82 N — en-Wikipedia "Setomaa"
    laudat: {
      maailmankartta: { x: 6753.3, y: 1032.5 },
      europe: { x: 741.1, y: 372.9 },
    },
    teksti: 'Setomaa on Peipsijärven eteläpuolinen alue, jossa asuvat setot, '
      + 'itämerensuomalainen alkuperäiskansa ja kielellinen vähemmistö. Setojen kieli on '
      + 'eteläviron muoto, ja he ovat perinteisesti kuuluneet ortodoksiseen kirkkoon, '
      + 'johon on sekoittunut piirteitä vanhemmasta kansanuskosta. Alueen historiallinen '
      + 'ja hengellinen keskus on ollut Petserin luostari. Setojen monikuoroinen laulutapa '
      + 'leelo merkittiin UNESCOn aineettoman kulttuuriperinnön luetteloon vuonna 2009. '
      + 'Nykyisin Setomaa on jaettu Viron ja Venäjän kesken, ja setot valitsevat '
      + 'vuosittaisessa Kuningaskunnan päivässä Pekon kuningaskunnalle seremoniallisen '
      + 'hoitajan.',
    lahde: 'en-Wikipedia "Setomaa" ja "Setos" sekä et-Wikipedia "Setomaa", johdanto-osat ja '
      + 'osiot "Seto leelo" ja "Ajalugu" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Millä nimellä setojen monikuoroista laulutapaa kutsutaan?',
      vaihtoehdot: [
        'Joiku',
        'Runolaulu',
        'Leelo',
        'Itkuvirsi',
      ],
      oikea: 2,
      fakta: 'Leelo esitetään yleensä naisvoimin perinteisissä kansanpuvuissa. Kuningaskunnan '
        + 'päivänä parhaan leelo-ryhmän johtolaulaja saa arvonimen "Laulun äiti".',
    },
  },
  {
    id: 'hahmotelma-voru',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-voru-acda1013.jpg',
      lyhyt: 'Kreutzwaldin koti Võrussa: punainen päärakennus ja vanha hirsirakennus pihalla.',
      selite: 'Näissä rakennuksissa asui ja työskenteli lääkäri Friedrich Reinhold Kreutzwald '
        + 'vuosina 1833–1877. Nykyään täällä toimii hänen muistomuseonsa.',
      lahde: 'Valokuva: Athanasius Soter, Wikimedia Commons (CC BY-SA 3.0 ee).',
      tekija: 'Athanasius Soter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kreutzwaldi_majamuuseum_V%C3%B5rus.JPG',
      lisenssi: 'CC BY-SA 3.0 ee',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-voru-9c55f06a.jpg',
        lyhyt: 'Ilmakuva Tamula-järvestä; oikealla Võrun kaupungin pientaloja.',
        selite: 'Võru sijaitsee Tamula-järven rannalla matalassa ja leveässä '
          + 'Võru–Hargla-laaksossa. Horisontissa leijuu usvaa ja rannoilla on pientaloja.',
        lahde: 'Valokuva: Vaido Otsar, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Vaido Otsar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tamula_j%C3%A4rve_panoraam_2022_08.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-voru-d84a90ea.jpg',
        lyhyt: 'Katariinan kirkon torni nousee syksyisten puiden yli Võrun keskustassa.',
        selite: 'Kirkon vaalea torni kellotauluineen kohoaa kaupungin keskustassa katulyhtyjen '
          + 'ja puiden takaa. Kaupunki perustettiin 1784 uuden piirikunnan keskukseksi.',
        lahde: 'Valokuva: Vaido Otsar, Wikimedia Commons (CC BY-SA 3.0 ee).',
        tekija: 'Vaido Otsar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:V%C3%B5ru_Katariina_kirik_2013-09.jpg',
        lisenssi: 'CC BY-SA 3.0 ee',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
      },
    ],
    nimi: 'Võru',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi vironkielinen kansalliseepos syntyi juuri pienessä Võrun kaupungissa?',
      'Miksi Võru perustettiin vasta vuonna 1784, ja kenen käskystä?',
    ],
    korostukset: ['Friedrich Reinhold Kreutzwald|Kreutzwald', 'Kalevipoeg|Kalevipoegin'],
    nappi: 'Kaupunki oli vasta 89 vuoden ikäinen, ja lääkäri Kreutzwald asui siellä yhä '
      + '(1833–1877)',
    // 26.9928 E / 57.8486 N — en-Wikipedia "Võru"
    laudat: {
      maailmankartta: { x: 6733.1, y: 1031.1 },
      europe: { x: 729.5, y: 372.2 },
    },
    teksti: 'Võru on kaupunki Kaakkois-Virossa Tamula-järven rannalla, ja se on Võrumaan '
      + 'maakunnan keskus. Kaupunki perustettiin 21. elokuuta 1784 keisarinna Katariina '
      + 'II:n pyynnöstä uuden piirikunnan keskukseksi, ja vuodesta 1797 lähtien se on '
      + 'ollut ympäristön hallintokeskus. Lääkäri Friedrich Reinhold Kreutzwald asui ja '
      + 'työskenteli Võrussa vuosina 1833–1877, ja täällä hän kirjoitti Viron '
      + 'kansalliseepoksen Kalevipoegin. Kaupungin nimi on võron kielellä Võro, ja siellä '
      + 'toimivat Kreutzwaldin muistomuseo sekä Võro-instituutti. Võrun '
      + 'kansanperinnefestivaali on järjestetty joka heinäkuu vuodesta 1995.',
    lahde: 'en-Wikipedia "Võru", johdanto-osa ja osiot "History", "Geography and climate" ja '
      + '"Culture" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä Viron kansalliseepoksen lääkäri Kreutzwald kirjoitti asuessaan Võrussa?',
      vaihtoehdot: [
        'Kalevala',
        'Lembitu-runoelma',
        'Linda-laulu',
        'Kalevipoeg',
      ],
      oikea: 3,
      fakta: 'Võrussa on mitattu sekä Viron ennätyskuumuus, 35,6 astetta, että -43,4 asteen '
        + 'pakkasen, joka jäi vain 0,1 astetta Viron kylmimmästä mitatusta lukemasta.',
    },
  },
  {
    id: 'hahmotelma-suure-jaani',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-suure-jaani-153a7e4a.jpg',
      lyhyt: 'Suure-Jaanin Johanneksen kirkko valkoisena jäätyneen lammen takana hämärässä.',
      selite: 'Kaupunki kasvoi Suuren Johanneksen evankeliumin kirkon ympärille. Kuvassa '
        + 'kirkko kohoaa jäätyneen lammen rannalta, laituri johtaa jäälle.',
      lahde: 'Valokuva: Tiina Kangro, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Tiina Kangro',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Suure-Jaani_Johannese_kirik.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-suure-jaani-c46ecf5b.jpg',
        lyhyt: 'Säveltäjäsuku Kappien kotimuseo Suure-Jaanissa talvella.',
        selite: 'Lumipeitteinen keltainen puutalo on Kappien säveltäjä- ja muusikkosuvun '
          + 'kotimuseo. Suure-Jaanin musiikkifestivaali on omistettu tälle suvulle.',
        lahde: 'Valokuva: Ivo Kruusamägi, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Ivo Kruusamägi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Heliloojate_Kappide_Majamuuseum.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-suure-jaani-3e86f832.jpg',
        lyhyt: 'Lõhaveren linnavuoren rinne lähellä Suure-Jaania.',
        selite: 'Lehola oli muinaisvirolaisten linnavuori, joka rakennettiin 1100-luvun '
          + 'lopulla ja oli yksi virolaisten vastarinnan keskuksista saksalaisia '
          + 'miekkaveljiä vastaan 1200-luvulla. Nykyään paikalla on lähinnä ruohoinen '
          + 'kumpu, jota vierailijat käyvät katsomassa.',
        lahde: 'Valokuva: Kotkasulg, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Kotkasulg',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:L%C3%B5havere_linnam%C3%A4gi_1.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Suure-Jaani',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi pieni Suure-Jaani tunnetaan musiikista?',
      'Mistä nimi Suure-Jaani tulee, ja miksi se vakiintui koko asutukselle vasta 1880-luvulla?',
    ],
    korostukset: ['Joosep Kapp|Joosep Kappin', 'Johann Köler|Johann Köler'],
    nappi: 'Suure-Jaani tarkoitti vielä vain kirkkoa pihapiireineen; nykyiset kaupunginosat '
      + 'olivat erillisiä kyliä',
    // 25.4667 E / 58.5333 N — en-Wikipedia "Suure-Jaani"
    laudat: {
      maailmankartta: { x: 6682.2, y: 998 },
      europe: { x: 700.2, y: 354.2 },
    },
    teksti: 'Suure-Jaani on pikkukaupunki Viljandimaan pohjoisosassa, noin 25 kilometriä '
      + 'Viljandista pohjoiseen. Se kasvoi Suuren Johanneksen evankeliumin kirkon '
      + 'ympärille; kirkko on rakennettu ennen vuotta 1300, se paloi Pohjan sodassa vuonna '
      + '1703, ja sen korjaus valmistui vasta vuonna 1767. Nimi tarkoittaa suunnilleen '
      + '"Suuren Juhanan" paikkaa, ja se vakiintui koko asutukselle vasta 1880-luvulla. '
      + '1800-luvun kansallisen heräämisen aikana pitäjä oli kulttuurin ja sivistyksen '
      + 'keskus koulumestari ja muusikko Joosep Kappin ansiosta, ja sieltä oli kotoisin '
      + 'myös Viron ensimmäinen ammattimaalari Johann Köler. Nykyään Suure-Jaanissa '
      + 'järjestetään kesäisin klassisen musiikin festivaali, joka on omistettu '
      + 'säveltäjäsuku Kappien muistolle.',
    lahde: 'en-Wikipedia "Suure-Jaani", johdanto-osa ja osiot "History" ja "Culture" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-vormsi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vormsi-b996433c.jpg',
      lyhyt: 'Ilmakuva Vormsin saaresta: metsäistä rantaa, niittyjä ja valkoinen alus.',
      selite: 'Vormsi on matala ja metsäinen saari Länsi-Viron saaristossa; metsää on yli '
        + 'puolet pinta-alasta. Saaren ja mantereen välillä kulkee lauttayhteys.',
      lahde: 'Valokuva: Tiit Tõnurist/Hiiumaa Mudeliklubi, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Tiit Tõnurist/Hiiumaa Mudeliklubi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vormsi_saar.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vormsi-f2ceed8f.jpg',
        lyhyt: 'Vormsin Pyhän Olavin kirkko Hullon kylässä, valkoinen kivikirkko punaisella '
          + 'katolla.',
        selite: 'Kirkko rakennettiin 1200-luvulla katolisena puukirkkona, ja siitä tuli '
          + 'uskonpuhdistuksen jälkeen luterilainen. Nykyinen kivirakennus pystytettiin '
          + 'vuonna 1632.',
        lahde: 'Valokuva: simka, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'simka',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vormsi_kirik_2011.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-vormsi-3c00c4ec.jpg',
        lyhyt: 'Saxbyn majakka kohoaa kivikkoisen rannan yllä kirkkaassa säässä.',
        selite: 'Saxbyn kylä on tunnettu ennen kaikkea majakastaan. Se on yksi saaren käytössä '
          + 'olevista merenkulun merkeistä, joihin kuuluvat myös Norrbyn ylä- ja '
          + 'alamajakat.',
        lahde: 'Valokuva: Minnekon, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Minnekon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Saxby_tuletorn_2025_a.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Vormsi',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Vormsin saarella asui vuosisatoja ruotsinkielisiä?',
      'Mitä tapahtui saaren ruotsinkieliselle väestölle toisen maailmansodan lopulla?',
    ],
    korostukset: ['rannikkoruotsalaiset|rannikkoruotsalaiset', 'Ormsö|Ormsö'],
    nappi: 'Saaren väki oli yhä rannikkoruotsalaista; ortodoksinen seurakunta perustettiin '
      + 'vasta 1886',
    // 23.2167 E / 59 N — en-Wikipedia "Vormsi"
    laudat: {
      maailmankartta: { x: 6607.2, y: 975.1 },
      europe: { x: 657, y: 341.9 },
    },
    teksti: 'Vormsi on Viron neljänneksi suurin saari, pinta-alaltaan noin 92 neliökilometriä, '
      + 'ja se sijaitsee Itämerellä Hiidenmaan itäpuolella Länsi-Viron saaristossa. Saaren '
      + 'asiakirjoin todettu historia ulottuu 1200-luvulle, ja suurimman osan ajasta '
      + 'siellä ovat asuneet rannikkoruotsalaiset. Ruotsinkielinen nimi Ormsö tarkoittaa '
      + '"Ormin saarta" tai "käärmesaarta", ja siitä ovat johdettuja sekä viron- että '
      + 'saksankielinen nimi. Asukasluku nousi noin 3000:een ennen toista maailmansotaa, '
      + 'jolloin lähes kaikki saaren väestö evakuoitiin tai pakeni Ruotsiin. Nykyisin '
      + 'saarella asuu noin 400 rekisteröityä asukasta, Hullo on hallinnollinen keskus ja '
      + 'Sviby pääsatama.',
    lahde: 'en-Wikipedia "Vormsi" ja et-Wikipedia "Vormsi", johdanto-osat ja osio "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-poltsamaa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-poltsamaa-54d243f6.jpg',
      lyhyt: 'Ilmakuva Põltsamaan linnuksesta, kirkosta ja joesta syksyllä.',
      selite: 'Linnuksen rakentaminen aloitettiin vuonna 1272, ja sen nelikulmainen muuri on '
        + 'säilynyt 1300-luvulta. Keskellä näkyy 1770-luvulla rakennetun rokokoolinnan '
        + 'rauniot; se tuhoutui vuonna 1941.',
      lahde: 'Valokuva: Sillerkiil, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Sillerkiil',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:P%C3%B5ltsamaa_castle_and_river_in_Estonia_0841.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-poltsamaa-a5933423.jpg',
        lyhyt: '1800-luvun värikuva Põltsamaan linnasta: pitkä muuri, päärakennus ja '
          + 'kalastaja.',
        selite: 'Väritetty piirros esittää Põltsamaan (saksaksi Oberpahlen) linnaa '
          + 'pohjoisesta, joen toiselta puolelta. Etualalla kalastaja istuu rannalla, '
          + 'taustalla kohoavat pitkä kivimuuri ja vihreäkattoinen päärakennus.',
        lahde: 'Valokuva: Wilhelm Tusch, Wikimedia Commons (Public domain).',
        tekija: 'Wilhelm Tusch',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:P%C3%B5ltsamaa_linnus_ja_loss_W.Tusch_2.59.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-poltsamaa-6f812e2d.jpg',
        lyhyt: 'Põltsamaan Nikolauksen kirkko peilautuu lammikkoon linnuksen raunion '
          + 'vieressä.',
        selite: 'Luterilainen kirkko rakennettiin vuosina 1633–1634 linnuksen muurin ja '
          + 'erillisen tykkitornin väliin. Kirkon oikealla puolella näkyy linnuksen '
          + 'raunioitunutta rakennusta.',
        lahde: 'Valokuva: Kairi Kalmann, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kairi Kalmann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:P%C3%B5ltsamaa_Niguliste_kirik.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Põltsamaa',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Põltsamaasta tuli 1500-luvulla hetkeksi kuningaskunnan pääkaupunki?',
      'Miten ensimmäinen vironkielinen aikakauslehti syntyi pienellä paikkakunnalla?',
    ],
    korostukset: ['Lühhike öppetus|Lühhike öppetus', 'Magnus|Magnus'],
    nappi: 'Ensimmäinen vironkielinen lehti painettiin täällä 1766; paikkakunta on nyt '
      + 'heräämisen keskuksia',
    // 25.9769 E / 58.6553 N — en-Wikipedia "Põltsamaa"
    laudat: {
      maailmankartta: { x: 6699.2, y: 992 },
      europe: { x: 710, y: 351 },
    },
    teksti: 'Põltsamaa on kaupunki Keski-Virossa Põltsamaa-joen varrella, ja sen tunnetuin '
      + 'nähtävyys on 1200-luvulla aloitettu linnus. Ensimmäiset merkinnät paikasta ovat '
      + 'vuodelta 1234. Vuosina 1570–1578 Põltsamaa oli Liivinmaan kuningaskunnan '
      + 'pääkaupunki, jossa hallitsi herttua Magnus. 1700-luvun jälkipuoliskolla siitä '
      + 'tuli Pohjois-Liivinmaan valistusliikkeen keskus: lähelle perustettiin ensimmäinen '
      + 'yksityinen kirjapaino Venäjän keisarikunnassa, ja vuonna 1766 siellä alettiin '
      + 'julkaista ensimmäistä vironkielistä aikakauslehteä nimeltä Lühhike öppetus. '
      + '1800-luvun jälkipuoliskolla paikka oli kansallisen heräämisen keskuksia, ja '
      + 'toisessa maailmansodassa noin 75 prosenttia kaupungin rakennuksista tuhoutui.',
    lahde: 'en-Wikipedia "Põltsamaa" ja et-Wikipedia "Põltsamaa", johdanto-osat ja osiot '
      + '"Ajalugu" ja "Vaatamisväärsused" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sindi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-sindi-d0be7554.jpg',
      lyhyt: 'Sindin tehtaan tiilirakennuksia ja kellotorni lumisena talvipäivänä.',
      selite: 'Punatiilisiä tehdasrakennuksia ja keskellä kellotorni ilmasta kuvattuna; '
        + 'taustalla kaartuu Pärnun joki. Tehdas oli koko Sindin asutuksen ydin.',
      lahde: 'Valokuva: Kristian Pikner, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kristian Pikner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sindi_Kalevivabrik_copy.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-sindi-9b94707b.jpg',
        lyhyt: 'Pärnun joen virta Sindin padolla, taustalla tehdasalue.',
        selite: 'Pärnun joen vesi virtaa padon ohi, ja rannalla näkyvät tehdasalueen '
          + 'rakennukset sekä savupiippu. Betoninen pato purettiin vuosina 2018–2020.',
        lahde: 'Valokuva: Kristian Pikner, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kristian Pikner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sindi_pais.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-sindi-7628abf2.jpg',
        lyhyt: 'Sindin kalakoski Pärnun joessa vuonna 2020.',
        selite: 'Kivinen luonnonmukainen koski korvaa entisen padon, jotta kalat pääsevät '
          + 'nousemaan jokea ylös. Taustalla näkyy tehdasalueen savupiippu.',
        lahde: 'Valokuva: Jaan Künnap, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jaan Künnap',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sindi_kalak%C3%A4restik_talvel_19._jaanuar_2020.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Sindi',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi kokonainen asutus syntyi juuri yhden tehtaan ympärille?',
      'Miksi pato haittasi kalojen nousua joessa?',
    ],
    korostukset: ['Wöhrmann|Wöhrmann', 'tekstiilitehdas|tekstiilitehtaan'],
    nappi: 'Tekstiilitehtaan ympärille 1833 kasvanut työläiskylä; kaupungiksi se tulee vasta '
      + 'vuonna 1938',
    // 24.6675 E / 58.4006 N — en-Wikipedia "Sindi, Estonia"
    laudat: {
      maailmankartta: { x: 6655.6, y: 1004.4 },
      europe: { x: 684.8, y: 357.7 },
    },
    teksti: 'Sindi on nykyään pieni kaupunki Pärnun joen vasemmalla rannalla, noin 14 '
      + 'kilometrin päässä Pärnusta. Asutus syntyi vuonna 1833 kartanon maille perustetun '
      + 'tekstiilitehtaan ympärille. Tehtaan perusti riikalainen kauppias ja '
      + 'teollisuudenharjoittaja Johann Christoph Wöhrmann, ja siitä tuli yksi Liivinmaan '
      + 'ja Viron kuvernementtien suurimmista. Tehdas rakennettiin joen rannalle, '
      + 'työläisten talot sen itäpuolelle ja työnjohtajien talot etelään, ja vuoteen 1841 '
      + 'mennessä alueelle oli valmistunut 57 taloa. Joessa oli pitkään betoninen pato, '
      + 'joka esti kaloja nousemasta joen yläjuoksulle; se purettiin vuosina 2018–2020 ja '
      + 'korvattiin luonnonmukaisella koskella.',
    lahde: 'en-Wikipedia "Sindi, Estonia", johdanto-osa ja osiot "History" ja "Geography" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mistä kaupungista kotoisin oleva kauppias perusti Sindin tekstiilitehtaan '
        + 'vuonna 1833?',
      vaihtoehdot: [
        'Tallinnasta',
        'Tartosta',
        'Pärnusta',
        'Riiasta',
      ],
      oikea: 3,
      fakta: 'Sindin alueella sijaitsi Pulli, Viron vanhimmaksi tunnettu asuinpaikka: '
        + 'mesoliittinen asutus noin vuodelta 8500 eKr., jonka geologit löysivät vuonna '
        + '1965. Kaupungin nimi juontuu Pärnun pormestarista Clauss Zindtistä, joka '
        + 'perusti alueelle kartanon 1500-luvulla.',
    },
  },
  {
    id: 'hahmotelma-kunda',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-kunda-5f5d82b6.jpg',
      lyhyt: 'Ilmakuva Kundasta: sementtitehdas, joki, kaupunki ja satama Suomenlahden '
        + 'rannalla.',
      selite: 'Sementtitehtaan piiput ja rakennukset nousevat metsän keskeltä, ja taustalla '
        + 'siintävät Kundan satama ja Suomenlahti. Kuvassa näkyy myös Kundajoki, joka '
        + 'mutkittelee tehtaan vieritse.',
      lahde: 'Valokuva: Kunda Nordic Tsement, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kunda Nordic Tsement',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kunda_Nordic_Tsement,_tsemenditehas.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-kunda-d1997e3d.jpg',
        lyhyt: 'Kundan satama ilmasta: laituri, varastot ja säiliöt lahden rannalla.',
        selite: 'Satamassa on pitkä laituri, katettuja varastoja ja säiliöitä. Kundan '
          + 'satamalle myönnettiin rakennuslupa jo vuonna 1805.',
        lahde: 'Valokuva: Kunda Nordic Tsement, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kunda Nordic Tsement',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kunda_sadam.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-kunda-129975a5.jpg',
        lyhyt: 'Kundan sementtitehtaan vanha pullouuni, kartionmuotoinen tiilitorni.',
        selite: 'Pullouuni on kartionmuotoinen tiilitorni, joka rakennettiin sementtitehtaalle '
          + 'vuonna 1870. Sen juurella on rintakuva.',
        lahde: 'Valokuva: Ivar Leidus, Wikimedia Commons (CC BY-SA 3.0 ee).',
        tekija: 'Ivar Leidus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kunda_tsemendivabriku_pudelahi.jpg',
        lisenssi: 'CC BY-SA 3.0 ee',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
      },
    ],
    nimi: 'Kunda',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi sementtitehdas rakennettiin juuri meren rannalle?',
      'Mitä ihmiset elivät täällä noin 6500 eaa. ja mistä se tiedetään?',
    ],
    korostukset: ['Kunda-kulttuuri|Kundan kulttuuri', 'sementtitehdas|sementtitehtaan'],
    nappi: 'Sementtitehdas on toiminut vasta kolme vuotta (perustettu 1870); satamalla on '
      + 'tulli jo vuodesta 1812',
    // 26.5333 E / 59.5 N — en-Wikipedia "Kunda, Estonia"
    laudat: {
      maailmankartta: { x: 6717.8, y: 950.5 },
      europe: { x: 720.6, y: 328.8 },
    },
    teksti: 'Kunda on Suomenlahden rannalla Pohjois-Virossa sijaitseva kaupunki, joka '
      + 'tunnetaan sementtitehtaastaan, satamastaan ja arkeologisesta perinnöstään. Kundan '
      + 'lähistöltä on löydetty Viron vanhimpiin kuuluvia esihistoriallisia '
      + 'metsästäjä-kalastajayhteisöjä noin vuodelta 6500 eaa., ja niiden mukaan on '
      + 'nimetty Kundan kulttuuri. Paikka mainitaan kirjallisissa lähteissä ensi kerran '
      + 'vuonna 1241 kylänä ja vuonna 1443 kartanona. Nykyinen kaupunki kasvoi kartanon '
      + 'omistajan John Karl Girard de Soucantonin vuonna 1870 perustaman sementtitehtaan '
      + 'ympärille. Satamalle oli myönnetty rakennuslupa jo vuonna 1805, ja tullipiste '
      + 'avattiin siellä 1812.',
    lahde: 'en-Wikipedia "Kunda, Estonia" ja et-Wikipedia "Kunda", johdanto-osat ja osiot '
      + '"History"/"Ajalugu" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Kundan sementtitehdas perustettiin?',
      vaihtoehdot: [
        '1805',
        '1870',
        '1443',
        '1241',
      ],
      oikea: 1,
      fakta: 'Rakvere–Kunda-rautatie valmistui vuonna 1905, ja entisen sementtitehtaan '
        + 'konttorirakennuksessa toimii nykyään sementtimuseo. Kunda sai kaupunkioikeudet '
        + '1. toukokuuta 1938.',
    },
  },
  {
    id: 'hahmotelma-rapina',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-rapina-bf0e8673.jpg',
      lyhyt: 'Ilmakuva Räpinan paperitehtaasta syksyllä 2024 joen rannalla.',
      selite: 'Tiilinen tehdasrakennus piippuineen, uudemmat tuotantohallit ja syksyn '
        + 'värittämä puusto Räpinan paperitehtaan ympärillä. Tehdas sijaitsee patoaltaan '
        + 'rannalla.',
      lahde: 'Valokuva: Paberivabrik, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Paberivabrik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20241016-DJI_0984-HDR-Edit.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-rapina-58381e79.jpg',
        lyhyt: 'Räpinan patoallas ja paperitehtaan rakennukset yöllä.',
        selite: 'Yövalaistus heijastuu patoaltaan tyyneen pintaan; vastarannalla erottuvat '
          + 'tehtaan tiilirakennukset ja piiput sekä oikealla vanha kivirakennus.',
        lahde: 'Valokuva: Kadri Niinsalu, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kadri Niinsalu',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:R%C3%A4pina_paisj%C3%A4rv_04.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-rapina-d48f5abf.jpg',
        lyhyt: 'Räpinan paperitehtaan tiilirakennuksia ja vanha vesimylly patoaltaan '
          + 'rannalla.',
        selite: 'Punatiilisiä tehdasrakennuksia piippuineen ja oikealla vanha, '
          + 'vaaleanpunertava vesimylly; molemmat ovat Viron suojeltuja '
          + 'kulttuurimuistomerkkejä.',
        lahde: 'Valokuva: Maris Juuse, Wikimedia Commons (CC BY-SA 3.0 ee).',
        tekija: 'Maris Juuse',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:R%C3%A4pina_paberivabriku_peakorpus,_reg_nr_23814_ja_R%C3%A4pina_m%C3%B5isa_vesiveski,_reg_nr_23815.JPG',
        lisenssi: 'CC BY-SA 3.0 ee',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
      },
    ],
    nimi: 'Räpina',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi paperitehtaat rakennettiin yleensä jokien varrelle?',
      'Millä tavalla paperia valmistettiin ennen nykyaikaisia koneita?',
    ],
    korostukset: ['paperitehdas|paperitehdas', 'Võhandu|Võhandu-joen'],
    nappi: 'Paperitehdas toiminut Võhandu-joen varrella jo vuodesta 1734; kaupunkioikeudet '
      + 'tulevat vasta 1993',
    // 27.4642 E / 58.0978 N — en-Wikipedia "Räpina"
    laudat: {
      maailmankartta: { x: 6748.8, y: 1019.1 },
      europe: { x: 738.5, y: 365.6 },
    },
    teksti: 'Räpina on kaupunki Põlvan maakunnassa Võhandu-joen alajuoksun varrella. Sen '
      + 'vanhin kaupallinen yritys on paperitehdas, joka avattiin vuonna 1734 ja joka '
      + 'toimii Räpinassa edelleen. Tehtaan lisäksi kaupungissa toimivat muun muassa '
      + 'puutarhakoulu ja lukio, ja kaupungissa on myös Pyhän Sakariaan ja Elisabetin '
      + 'kirkko. Asukkaita Räpinassa oli vuonna 1881 vain 709, mutta vuonna 1922 jo 2100. '
      + 'Räpina sai taajaman aseman vuonna 1945 ja kaupunkioikeudet vuonna 1993. Vuonna '
      + '2002 kaupunki ja maalaiskunta yhdistettiin Räpinan kunnaksi.',
    lahde: 'en-Wikipedia "Räpina" ja et-Wikipedia "Räpina", johdanto-osat ja osiot '
      + '"Elanikkond" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kardla',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-kardla-73bbc26e.jpg',
      lyhyt: 'Kärdlan tehtaan pitkä talo, vihreä puurakennus punaisella tiilikatolla.',
      selite: 'Pitkä, vaaleanvihreäksi maalattu puurakennus on osa Kärdlan vanhaa '
        + 'tehdasaluetta. Rakennus tunnetaan nimellä Pikk maja eli Pitkä talo.',
      lahde: 'Valokuva: Ivo Kruusamägi, Wikimedia Commons (CC BY-SA 3.0 ee).',
      tekija: 'Ivo Kruusamägi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalevivabriku_%22Pikk_maja%22_K%C3%A4rdlas_Vabrikuv%C3%A4ljak_8.JPG',
      lisenssi: 'CC BY-SA 3.0 ee',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ee/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-kardla-6612e8f0.jpg',
        lyhyt: 'Ilmakuva Kärdlan satamasta ja kivisestä aallonmurtajasta.',
        selite: 'Satamaa ympäröi kivistä tehty aallonmurtaja, ja sisällä on venelaitureita. '
          + 'Kärdlaan rakennettiin satama jo vuonna 1849.',
        lahde: 'Valokuva: Hiiumaamudeliklubi, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hiiumaamudeliklubi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:K%C3%A4rdla_sadam_2013.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/est-nosto-kardla-63a98cc1.jpg',
        lyhyt: 'Kärdlan kirkko, valkoinen kivikirkko, jossa on kapea torni.',
        selite: 'Kirkon seinät ovat valkoiset ja etuosassa on kapea torni. Kirkko valmistui '
          + 'vuonna 1863 pääosin lahjoitusvaroin.',
        lahde: 'Valokuva: TriinuR, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'TriinuR',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:K%C3%A4rdla_kirik,_2011,_regnr_23574.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kärdla',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mistä ruotsalaiset päätyivät Hiidenmaalle jo 1500-luvulla?',
      'Miksi 455 miljoonaa vuotta vanha kraatteri ei näy maisemassa selvästi?',
    ],
    korostukset: ['meteoriittikraatteri|meteoriittikraatteri', 'Kärrdal|Kärrdal'],
    nappi: 'Kangastehtaan ympärille 1830 kasvanut kylä; satama valmistui 1849, '
      + 'kaupunkioikeudet vasta 1938',
    // 22.7467 E / 58.9981 N — en-Wikipedia "Kärdla"
    laudat: {
      maailmankartta: { x: 6591.6, y: 975.2 },
      europe: { x: 647.9, y: 342 },
    },
    teksti: 'Kärdla on Hiidenmaan ainoa kaupunki ja Hiiun maakunnan pääkaupunki. Se sijaitsee '
      + 'saaren koillisrannalla Tareste-lahden äärellä, ja sen kaakkoispuolella on 455 '
      + 'miljoonaa vuotta vanha Kärdlan meteoriittikraatteri. Kärdla mainitaan ensi kertaa '
      + 'vuonna 1564 ruotsalaisten asuttamana kylänä. Sen kasvuun vaikutti erityisesti '
      + 'vuonna 1830 perustettu kangastehdas, ja satama rakennettiin vuonna 1849. Kirkko '
      + 'valmistui vuonna 1863 pääasiassa lahjoitusvaroin. Ruotsinkielinen nimi Kärrdal '
      + 'tarkoittaa suolaaksoa, sillä kaupunki sijaitsee matalassa laaksossa. Kärdla sai '
      + 'kaupunkioikeudet vuonna 1938.',
    lahde: 'en-Wikipedia "Kärdla" ja et-Wikipedia "Kärdla", johdanto-osat ja osio '
      + '"History"/"Ajalugu" (tarkistettu 19.9.2026).',
  },
];
