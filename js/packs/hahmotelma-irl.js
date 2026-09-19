/*
 * IRLANNIN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Belgian, Puolan,
 * Tšekin ja Unkarin jälkeen Irlanti.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä edellisten maiden pakat: jokaisella nostolla on
 * valmis sisältö — `teksti` 3–5 virkettä Wikipedian johdannosta omin sanoin
 * suomeksi (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville
 * artikkeli ja tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi
 * pulun kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). 1873-näkökulma: Irlanti on osa Yhdistynyttä
 * kuningaskuntaa (unioni 1801), Dublinin linna on Britannian hallinnon
 * keskus, Suuri nälänhätä (1845–1852) on alle kolmenkymmenen vuoden takana
 * ja kotihallintoliike (Home Rule) perustetaan vuonna 1873. Cobh on
 * vuoden 1873 Queenstown. Nälänhädän kohteet käsitellään asiallisesti:
 * ei uhrikuvia, ei hautoja, vain muistomerkit, rakennukset, alukset ja
 * maisemat. Vuoden 1873 jälkeiset asiat (Knockin ilmestys 1879, Birrin
 * teleskoopin loppu, Waterford Crystalin nykytuotanto) ovat mukana:
 * teksti on nykytietoa ja `nappi` katsoo vuodesta 1873.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `irl-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/irl/. Kuvissa ei ole
 * tunnistettavia yksityishenkilöitä.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Dublin, Irlannin ainoa pelikaupunki) ulkopuolella,
 * lähin nosto yli 5 lautayksikön päässä nykyisistä merkeistä ja
 * keskenään yli 8 lautayksikön päässä, ja js/fokuskohteet.js liittää
 * rivit KOHDE_MAAT.IRL:iin. Irlannissa on jo 17 nostoa; Carrauntoohil,
 * Newgrange, Tarán kukkula, Clonmacnoise, Cashel, Skellig Michael, Céide
 * Fields, Moherin kalliot, Kilkenny, Croagh Patrick, Dún Aonghasa ja
 * Glendalough ovat niiden joukossa eikä niitä toisteta. `lahi: true` on
 * sama lähizoomiportti kuin Ranskan hahmotelmalla
 * (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen (Waterford Crystalin piste on Waterfordin
 * kaupungin artikkelista). Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Irlannin fokuslehden rajaukseen
 * (`osuuLehteen`). Seitsemän rannikkokohdetta (Achill, Slieve League,
 * Cobh, Hook Head, Malin Head, Loop Head, Valentia) on pelin karkean
 * maailmankartan IRL-renkaan hieman ULKOPUOLELLA, koska rengas on
 * yksinkertaistettu; niiden koordinaatit ovat Wikipedian todelliset.
 * Bunratty on 5,4 yksikköä Shannonin nykyisestä merkistä (hyväksytty).
 */

/** Irlannin hahmotelmanostot: sisällölliset kohteet kaupungin ulkopuolella. */
export const HAHMOTELMA_IRL = [
  {
    id: 'hahmotelma-killarney',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-killarney-b7df4c16.jpg',
      lyhyt: 'Killarneyn järvet ja vuoret näkyvät laajana maisemana Ladies View -näköalapaikalta.',
      selite: 'Ladies View -näköalapaikalta avautuu näkymä Killarneyn järville ja niitä ympäröiville vuorille Killarneyn kansallispuistossa Kerryn kreivikunnassa.',
      lahde: 'Valokuva: Marco Ober, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Marco Ober',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ladies_View_in_summer,_Ring_of_Kerry,_Killarney_National_Park.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-killarney-9c86ea37.jpg',
        lyhyt: 'Ross Castlen tornilinna kohoaa harmaana kivimuurien takaa.',
        selite: 'Ross Castle on 1400-luvulta peräisin oleva tornilinna Lough Leane -järven rannalla Killarneyn kansallispuistossa.',
        lahde: 'Valokuva: Einaz80, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Einaz80',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ross_Castle_(Killarney).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Killarney',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mikä on Killarneyn järvistä suurin?',
      'Minä vuonna Muckross House valmistui?',
    ],
    korostukset: ['punahirvi|punahirvilauma'],
    nappi: 'Killarneyn järvet ja Muckrossin kartano, jonka Herbertin suku sai valmiiksi 1843',
    // -9.50664 E / 52.02099 N — en-Wikipedia "Killarney National Park"
    laudat: {
      maailmankartta: { x: 5516.4, y: 1301.2 },
      europe: { x: 28.7, y: 525.4 },
    },
    teksti: 'Killarneyn kansallispuisto Kerryn kreivikunnassa oli Irlannin ensimmäinen '
      + 'kansallispuisto: se perustettiin, kun Muckrossin kartano lahjoitettiin Irlannin '
      + 'vapaavaltiolle vuonna 1932. Puisto on sittemmin laajentunut yli sadan '
      + 'neliökilometrin kokoiseksi, ja siihen kuuluvat Killarneyn järvet, kansainvälisesti '
      + 'merkittävät tammi- ja marjakuusimetsät sekä vuorenhuiput. Puistossa elää Irlannin '
      + 'mantereen ainoa punahirvilauma, ja sillä on Irlannin laajin luonnonmetsäala; Unesco '
      + 'nimesi sen biosfäärialueeksi vuonna 1981. Lough Leane on Killarneyn järvistä suurin, '
      + 'ja siinä on yli 30 saarta; Herbertin suvun Muckross House valmistui vuonna 1843.',
    lahde: 'en-Wikipedia "Killarney National Park", johdanto-osa ja osiot "Climate and '
      + 'geography" ja "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä eläinlauma elää Killarneyn puistossa ainoana Irlannin mantereella?',
      vaihtoehdot: [
        'Villisikalauma',
        'Karhulauma',
        'Punahirvilauma',
        'Susilauma',
      ],
      oikea: 2,
      fakta: 'Muckrossin niemi kuului Herbertin suvulle vuodesta 1770, ja suku rikastui sen '
        + 'kuparikaivoksista.',
    },
  },
  {
    id: 'hahmotelma-connemara',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-connemara-ddc07e35.jpg',
      lyhyt: 'Derryclare-järvi ja puustoinen saareke Twelve Bensin vuorten juurella Connemarassa.',
      selite: 'Derryclare Lough Connemarassa Twelve Bensin vuoristossa; taustalla kohoaa Derryclare-vuori. Järven rannalla on puiden peittämä saareke.',
      lahde: 'Valokuva: Bernd Thaller, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Bernd Thaller',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Derryclare_Lough,_Twelve_Bens.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-connemara-1d9e690d.jpg',
        lyhyt: 'Twelve Bensin kalliohuiput kohoavat vihreän nummen yli.',
        selite: 'Twelve Bensin vuoriryhmä Connemarassa Irlannin länsirannikolla, kuvattuna soisen ja ruohoisen tasangon yli.',
        lahde: 'Valokuva: Lindy Buckley, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Lindy Buckley',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Twelve_Bens_Horseshoe.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Connemara',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mitkä ovat Connemaran tunnetuimmat vuoret?',
      'Mikä on Connemaran suurin asutuskeskus?',
    ],
    korostukset: ['gaeltacht|gaeltachtista'],
    nappi: 'Nälänhädän autioittama länsirannikko, jossa irlannin kieli elää yhä',
    // -9.75 E / 53.5 N — en-Wikipedia "Connemara"
    laudat: {
      maailmankartta: { x: 5508.3, y: 1234.6 },
      europe: { x: 24, y: 486.6 },
    },
    teksti: 'Connemara on Galwayn kreivikunnan länsiosassa Atlantin rannikolla oleva alue, jolla '
      + 'on vahva yhteys perinteiseen irlantilaiseen kulttuuriin: se kattaa suurimman osan '
      + 'Connachtin gaeltachtista, Irlannin suurimmasta irlanninkielisestä alueesta. '
      + 'Maisemassa on paljon vuoria, joista tunnetuimmat ovat Twelve Pins, sekä niemimaita, '
      + 'poukamia, saaria ja pieniä järviä. Alueen suurin asutuskeskus on Clifden, jonka '
      + 'ympäristössä on runsaasti megaliittihautoja, ja Connemaran vihreä marmori oli '
      + 'arvokasta kauppatavaraa jo esihistoriallisina aikoina. Suuren nälänhädän aikana '
      + '1840-luvun lopulla Connemara autioitui rajusti, ja vuonna 1843 Daniel O\'Connell '
      + 'puhui Clifdenin kansankokouksessa, johon arvioitiin osallistuneen 100 000 ihmistä.',
    lahde: 'en-Wikipedia "Connemara", johdanto-osa ja osiot "Definition" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-burren',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-burren-ee6541b9.jpg',
      lyhyt: 'Poulnabronen dolmen: valtava kattokivi lepää pystykivien päällä Burrenin kalkkikivimaastossa.',
      selite: 'Poulnabronen dolmen Clarenkreivikunnassa Burrenin alueella. Kivinen hautakammio seisoo paljaan kalkkikallion ympäröimänä.',
      lahde: 'Valokuva: Bernard Gagnon, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Bernard Gagnon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Poulnabrone_dolmen_02.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-burren-44ea511f.jpg',
        lyhyt: 'Burrenin paljas kalkkikivilaatta halkeamineen ulottuu horisonttiin asti.',
        selite: 'Burren on karsti-maisema, jossa on laajoja paljaita kalkkikivialueita. Kuvassa kalkkikivilaatta (limestone pavement) Itä-Burrenin alueella, ja kalliossa näkyy syviä rakoja.',
        lahde: 'Valokuva: Limnoporus, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Limnoporus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Limestone_pavement_in_the_East_Burren_complex_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Burren',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mitä nimi Burren tarkoittaa?',
      'Millaista kasvillisuutta Burrenissa kasvaa rinnakkain?',
    ],
    korostukset: ['karsti|karstimaisema'],
    nappi: 'Kivinen karstimaa Clarein länsirannikolla, jossa arktiset ja välimerelliset kukat kasvavat rinnakkain',
    // -9.00222222 E / 53.00777778 N — en-Wikipedia "The Burren"
    laudat: {
      maailmankartta: { x: 5533.3, y: 1256.9 },
      europe: { x: 38.4, y: 499.5 },
    },
    teksti: 'Burren on Clarein kreivikunnan länsirannikolla sijaitseva karsti- ja '
      + 'jäätikkökarstimaisema, jonka pinta-ala on noin 530 neliökilometriä; nimi tarkoittaa '
      + 'irlanniksi kivistä aluetta. Alueen luonnonnähtävyyksiin kuuluvat Mullaghmoren '
      + 'kukkula ja Ailladien kalliot sekä historiallisiin muistomerkkeihin Poulnabronen '
      + 'dolmen ja Caherconnellin kivilinnoitus. Burren tunnetaan kasvistostaan: yli 70 '
      + 'prosenttia Irlannin kukkalajeista löytyy sieltä, ja epätavallisen ympäristön '
      + 'ansiosta arktis-alppiset ja Välimeren alueen kasvit kasvavat rinnakkain. Burrenin '
      + 'kansallispuisto on Irlannin kahdeksasta kansallispuistosta pienin.',
    lahde: 'en-Wikipedia "The Burren", johdanto-osa ja osiot "Geology" ja "Flora" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mitä nimi Burren tarkoittaa irlanniksi?',
      vaihtoehdot: [
        'Kivistä aluetta',
        'Valkoista kukkulaa',
        'Vihreää saarta',
        'Tuulista kalliota',
      ],
      oikea: 0,
      fakta: 'Burrenissa on noin sata umpinaista, pyöreähköä painannetta, joita kutsutaan '
        + 'poljeiksi.',
    },
  },
  {
    id: 'hahmotelma-dingle',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-dingle-77051889.jpg',
      lyhyt: 'Slea Headin jyrkkä niemeke ja Blasket-saaret Dinglen niemimaan länsikärjessä.',
      selite: 'Slea Head on Dinglen niemimaan länsikärjessä oleva jyrkkä niemeke. Vasemmalla näkyvät Blasket-saaret Kerryn kreivikunnan rannikon edustalla.',
      lahde: 'Valokuva: Einaz80, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Einaz80',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Slea_Head_panorama.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-dingle-5c65c874.jpg',
        lyhyt: 'Conor Passin vuoristotie laskeutuu vihreään laaksoon Dinglen niemimaalla.',
        selite: 'Näkymä Conor Passilta Dinglen ja Cloghanen välillä: vuoret ympäröivät laaksoa, jossa on pieniä järviä, ja kaukana häämöttää meri.',
        lahde: 'Valokuva: David Leip, Wikimedia Commons (CC BY 2.0).',
        tekija: 'David Leip',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Connor_pass,_Kerry.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Dinglen niemimaa',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mikä on Irlannin läntisin mantereen piste?',
      'Mikä vuori on Dinglen niemimaan korkein?',
    ],
    korostukset: ['gaeltacht|gaeltacht-aluetta'],
    nappi: 'Länsirannikon irlanninkielinen niemimaa, jonka kertojien perinne elää yhä',
    // -10.08388889 E / 52.19333333 N — en-Wikipedia "Dingle Peninsula"
    laudat: {
      maailmankartta: { x: 5497.2, y: 1293.5 },
      europe: { x: 17.6, y: 520.9 },
    },
    teksti: 'Dinglen niemimaa, irlanniksi Corca Dhuibhne, on Kerryn kreivikunnan pohjoisin suuri '
      + 'niemimaa, ja sen päättää Dunmore Head, Irlannin läntisin mantereen piste. Niemimaa '
      + 'on saanut nimensä Dinglen kaupungista, ja Dinglen lahti erottaa sen etelässä '
      + 'olevasta Iveraghin niemimaasta. Korkein vuori on 951 metrin Mount Brandon, ja Conor '
      + 'Pass on Irlannin korkein vuoriylikulku. Niemimaan länsipää on gaeltacht-aluetta, '
      + 'josta on tullut tärkeitä irlanninkielisiä kertojia, runoilijoita ja kirjailijoita. '
      + 'Länsirannikon edustan Blasketinsaaret tunnetaan entisten asukkaidensa kirjallisesta '
      + 'ja kielellisestä perinnöstä; ne ovat olleet asumattomia 1950-luvulta lähtien.',
    lahde: 'en-Wikipedia "Dingle Peninsula", johdanto-osa ja osiot "Geography" ja "Culture, '
      + 'literature, and language" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-corrib',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-corrib-4c39a553.jpg',
      lyhyt: 'Lough Corribin metsäiset saaret häämöttävät sinisellä vedellä kiviaitojen reunustaman niityn takana.',
      selite: 'Näkymä Lough Corribille Clonburin eteläpuolella: laajalla järvellä on useita pieniä metsäisiä saaria, ja etualalla kulkee kivimuureja.',
      lahde: 'Valokuva: JoachimKohler-HB, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'JoachimKohler-HB',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_on_Lough_Corrib,_south_of_Clonbur.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-corrib-91cf6ec3.jpg',
        lyhyt: 'Pyhän Patrickin kirkon jäkälänpeittämä kivimuuri metsän keskellä Inchagoillin saarella.',
        selite: 'Pyhän Patrickin kirkon (Templepatrick) rauniot Inchagoillin saarella. Muuri on rakennettu kivestä ja sen ympärillä kasvaa rehevää kasvillisuutta.',
        lahde: 'Valokuva: Herbert Ortner, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Herbert Ortner',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Inchagoill_island_2009-08-12_(05).jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Lough Corrib',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mikä on Irlannin tasavallan suurin järvi?',
      'Mikä joki yhdistää järven mereen?',
    ],
    korostukset: ['kanava|kanava'],
    nappi: 'Länsi-Irlannin suurin järvi; Friar\'s Cut -kanava on ollut olemassa 1100-luvulta',
    // -9.23333333 E / 53.43333333 N — en-Wikipedia "Lough Corrib"
    laudat: {
      maailmankartta: { x: 5525.6, y: 1237.6 },
      europe: { x: 33.9, y: 488.3 },
    },
    teksti: 'Lough Corrib on Länsi-Irlannissa oleva järvi, jonka Corrib-joki eli Galway-joki '
      + 'yhdistää mereen Galwayssa. Se on Irlannin tasavallan suurin järvi ja koko Irlannin '
      + 'saaren toiseksi suurin Lough Neaghin jälkeen; sen pinta-ala on 176 neliökilometriä. '
      + 'Saaren ensimmäinen kanava, Friar\'s Cut, kaivettiin 1100-luvulla, ja sen ansiosta '
      + 'veneet pääsivät Corribilta mereen Galwayssa. Vuodesta 2007 tehdyt kartoitukset ovat '
      + 'paljastaneet järvestä muun muassa pronssi- ja rautakautisia kaivettuja puuveneitä '
      + 'sekä 900-luvun aluksen, jossa oli kolme viikinkien taistelukirvestä, joten Corrib on '
      + 'kansainvälisesti merkittävä meriarkeologinen kohde.',
    lahde: 'en-Wikipedia "Lough Corrib", johdanto-osa ja osio "Marine archaeology and charts" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-achill',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-achill-d9d2649c.jpg',
      lyhyt: 'Croaghaunin jyrkät merikalliot Achill-saarella laskeutuvat suoraan Atlantille.',
      selite: 'Kuvassa Croaghaunin rinne ja kallioinen rannikko Achill-saaren länsipäässä, jossa on Irlannin korkeimpia merikallioita.',
      lahde: 'Valokuva: Deejayw, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Deejayw',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Croghaun_Cliffs,_Dooagh,_Achill,_Co._Mayo,_Ireland.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-achill-f7a34557.jpg',
        lyhyt: 'Keemin lahden hiekkaranta Achill-saarella sumuisen vihreän vuorenrinteen alla.',
        selite: 'Kuvassa Keemin lahden pitkä hiekkaranta ja turkoosi vesi ylhäältä päin katsottuna. Rannan takana nousee usvan peittämä vihreä rinne.',
        lahde: 'Valokuva: Giuseppe Peronato, Wikimedia Commons (CC BY-SA 2.5).',
        tekija: 'Giuseppe Peronato',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Keel_beach_achill_island.jpg',
        lisenssi: 'CC BY-SA 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5/',
      },
    ],
    nimi: 'Achill',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mikä on Irlannin saarista suurin?',
      'Minä vuonna silta yhdisti Achillin mantereeseen?',
    ],
    korostukset: ['Croaghaun|Croaghaunin'],
    nappi: 'Irlannin suurin saari, jonne ei vielä johda siltaa mantereelta',
    // -10.003 E / 53.964 N — en-Wikipedia "Achill Island"
    laudat: {
      maailmankartta: { x: 5499.9, y: 1213.5 },
      europe: { x: 19.1, y: 474.3 },
    },
    teksti: 'Achill on Mayon kreivikunnan edustalla Irlannin länsirannikolla oleva saari, joka on '
      + 'Irlannin saarista suurin: sen pinta-ala on noin 148 neliökilometriä. Saarta on '
      + 'asutettu ainakin neoliittisesta kivikaudesta lähtien, ja Slievemore-vuoren juurella '
      + 'on Autio kylä, jossa on 80–100 raunioitunutta yhden huoneen kivitaloa. Saaren '
      + 'länsipäässä Croaghaunin kalliot ovat Euroopan kolmanneksi korkeimmat merikalliot, '
      + 'mutta niille ei pääse tietä pitkin. Suuri nälänhätä 1845–1849 iski Achilliin '
      + 'erityisen kovasti, koska maaperä oli huonoa ja saarelaiset olivat lähes täysin '
      + 'perunan varassa. Saari on ollut sillalla yhteydessä mantereeseen vuodesta 1887, ja '
      + 'Michael Davittin silta kulkee Achill Soundin ja Polrannyn kylien välillä.',
    lahde: 'en-Wikipedia "Achill Island", johdanto-osa ja osiot "History" ja "Geography" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-powerscourt',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-powerscourt-6f523c29.jpg',
      lyhyt: 'Powerscourtin vesiputous valuu kallioista rinnettä alas metsäisessä laaksossa.',
      selite: 'Kuvassa vesiputous pohjoisesta katsottuna, kallioinen ja metsäinen rinne sekä nurmikenttä sen edessä.',
      lahde: 'Valokuva: DXR, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'DXR',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Powerscourt_Waterfall,_North_view_20150806_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-powerscourt-dd226067.jpg',
        lyhyt: 'Ylhäältä kuvattu näkymä Powerscourtin peuranpuistoon ja vesiputoukseen Wicklow\'n vuorten keskellä.',
        selite: 'Putous on 121 metriä korkea. Kuva on otettu Crone Woodsin rinteeltä Enniskerryn lähistöltä, ja taustalla kohoaa Djouce-vuori.',
        lahde: 'Valokuva: Joe King, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Joe King',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Powerscourt_Deerpark_and_Waterfall.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Powerscourtin vesiputous',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Kuinka korkea Powerscourtin vesiputous on?',
      'Minkä joen vesiputous se on?',
    ],
    korostukset: ['vesiputous|vesiputous'],
    nappi: 'Dargle-joen putous Glensoulanin riippulaaksossa Wicklowin vuorilla',
    // -6.211 E / 53.146 N — en-Wikipedia "Powerscourt Waterfall"
    laudat: {
      maailmankartta: { x: 5626.3, y: 1250.7 },
      europe: { x: 91.9, y: 495.9 },
    },
    teksti: 'Powerscourtin vesiputous on Irlannin toiseksi korkein vesiputous: se on 121 metriä '
      + 'korkea, ja se sijaitsee Wicklowin kreivikunnassa Enniskerryn lähellä Dargle-joessa. '
      + 'Putous on Glensoulanin riippulaakson pohjalla, jonka läpi Dargle virtaa lähteeltään '
      + 'Tonduff-vuoren etelärinteeltä jyrkkään kuoppaan, jossa vesiputous on. Sen yllä '
      + 'kohoavat Djouce (725 metriä) ja Maulin (570 metriä), ja se virtaa koko vuoden '
      + 'hevosenhännän muotoisena viuhkana. Vesiputous on osa Powerscourtin tilaa, ja lippuja '
      + 'saa 363 päivänä vuodessa.',
    lahde: 'en-Wikipedia "Powerscourt Waterfall", johdanto-osa ja osiot "Geography" ja "Geology" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Millainen laakso Glensoulan on, jonka pohjalla Powerscourtin vesiputous sijaitsee?',
      vaihtoehdot: [
        'Tulivuoren kraatteri',
        'Jokisuisto',
        'Ihmisen kaivama kanava',
        'Riippulaakso',
      ],
      oikea: 3,
      fakta: 'Vesiputous virtaa koko vuoden hevosenhännän muotoisena viuhkana, ja sen yllä '
        + 'kohoavat Djouce ja Maulin.',
    },
  },
  {
    id: 'hahmotelma-slieve-league',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-slieve-league-52489e96.jpg',
      lyhyt: 'Slieve Leaguen jylhät merikalliot levittäytyvät panoraamana Atlantin rannalla.',
      selite: 'Panoraamakuvassa Donegalin Slieve Leaguen kalliot ja niiden edessä oleva lahti. Etualalla kukkivaa kanervaa.',
      lahde: 'Valokuva: Superbass, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Superbass',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2016-08-05-Slieve_League_Panorama-.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-slieve-league-3ed34af1.jpg',
        lyhyt: 'Kallioiden juurella aallot huuhtovat kahta kivipylvästä turkoosissa lahdessa.',
        selite: 'Kuvassa kanervaa kasvava rinne, kalliolahti ja kaksi merestä nousevaa kalliopilaria Slieve Leaguen merikallioilla.',
        lahde: 'Valokuva: Thomas Fuhrmann, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Thomas Fuhrmann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_bay_at_Slieve_League_sea_cliffs.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Slieve League',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mitä nimi Sliabh Liag tarkoittaa?',
      'Mikä on Slieve Leaguen tunnettu vaellusharjanne?',
    ],
    korostukset: ['merikallio|merikalliot'],
    nappi: 'Atlantin rannikon kivipylväiden vuori, jonka merikalliot ovat Euroopan korkeimpia',
    // -8.68138889 E / 54.63805556 N — en-Wikipedia "Slieve League"
    laudat: {
      maailmankartta: { x: 5544, y: 1182.5 },
      europe: { x: 44.5, y: 456.6 },
    },
    teksti: 'Slieve League, irlanniksi Sliabh Liag eli kivipylväiden vuori, on Donegalin '
      + 'kreivikunnan Atlantin rannikolla oleva vuori. Sen 601 metrin merikalliot ovat '
      + 'Irlannin toiseksi korkeimmat Croaghaunin jälkeen ja Euroopan korkeimpien joukossa. '
      + 'Luonnontieteilijä Robert Lloyd Praeger kirjoitti vuonna 1937 muistelmissaan vuoren '
      + 'pohjoispuolen jyrkänteestä ja huipun veitsenteräisestä One Man\'s Path -harjanteesta, '
      + 'joka on yksi Irlannin merkittävimmistä vaelluksista. Vuorta kuvataan usein '
      + 'Bunglassin näköalapaikalta, jonne pääsee kapeaa tietä pitkin Teelinistä, ja tien '
      + 'viimeiset kilometrit kulkevat jyrkänteen reunaa.',
    lahde: 'en-Wikipedia "Slieve League", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-malin-head',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-malin-head-b9b01359.jpg',
      lyhyt: 'Malin Headin rosoiset kalliot ja merikivet hehkuvat iltavalossa Atlantin rannalla.',
      selite: 'Ilmakuva Malin Headista, Irlannin pohjoisimmasta kohdasta Donegalin kreivikunnassa. Etualalla tummia kallioita ja aaltoja, taustalla vastarannan vuoria.',
      lahde: 'Valokuva: Kent Wang, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Kent Wang',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malin_Head_(2019).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-malin-head-f264600f.jpg',
        lyhyt: 'Malin Headin rantakalliot ja kävelypolku, jonka päässä kukkulalla näkyy pieni tornirakennus.',
        selite: 'Kuvassa Malin Headin aallokon runtelema rannikko pohjoiseen katsottuna. Kukkulan huipulla erottuu vaalea torni ja sinne johtava polku.',
        lahde: 'Valokuva: Jamip29, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jamip29',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Malin_head_coast.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-malin-head-df2652c1.jpg',
        lyhyt: 'Frederic Leightonin maalaus Malin Headin vihreistä rantatörmistä vuodelta 1874.',
        selite: 'Öljymaalaus, jossa nurmen peittämä kallionaama laskee mereen. Törmän reunalla on matala rakennus ja merellä kalliopylväs.',
        lahde: 'Maalaus: Frederic Leighton, Wikimedia Commons (public domain).',
        tekija: 'Frederic Leighton',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Frederic_Leighton_-_Malin_Head,_Donegal_(1874).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Malin Head',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Mikä on Irlannin mantereen pohjoisin kohta?',
      'Minä vuonna Malin Headin torni rakennettiin?',
    ],
    korostukset: ['sääasema|sääasema'],
    nappi: 'Irlannin pohjoiskärki, jossa on Napoleonin sotien aikainen vartiotorni',
    // -7.36666667 E / 55.38333333 N — en-Wikipedia "Malin Head"
    laudat: {
      maailmankartta: { x: 5587.8, y: 1148 },
      europe: { x: 69.8, y: 437 },
    },
    teksti: 'Malin Head on Irlannin mantereen pohjoisin kohta Donegalin Inishowenin niemimaalla, '
      + 'ja sen pohjoisin piste on Dunalderagh 55,38 asteen pohjoista leveyttä. Niemeltä on '
      + 'nimensä saanut Malinin merialue, ja sen sääasema on yksi BBC:n merisäätiedotuksessa '
      + 'kuuluvista 22 asemasta; säähavainnot alkoivat siellä vuonna 1885. Tower Hillillä on '
      + 'vuonna 1805 rakennettu torni, ja noin vuonna 1902 lähelle rakennettiin '
      + 'Marconi-yhtiön käyttämä merkinantoasema. Ballyhillionin nousseiden rantojen '
      + 'järjestelmä on kansainvälisesti tieteellisesti merkittävä, sillä sen selvät '
      + 'rantaviivat kertovat, miten meren ja maan suhde muuttui, kun jäätiköt alkoivat sulaa '
      + 'noin 15 000 vuotta sitten.',
    lahde: 'en-Wikipedia "Malin Head", johdanto-osa ja osiot "Locality" ja "Weather station" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-loop-head',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-loop-head-f294cfab.jpg',
      lyhyt: 'Loop Headin valkoinen majakka ja majakkamestarin talot niemen nurmikentällä.',
      selite: 'Kuvassa Loop Headin majakan piha: punakaiteinen majakkatorni ja valkoiset asuin- ja huoltorakennukset kiviaidan takana. Tornin kaiteella näkyy pieni joukko kävijöitä.',
      lahde: 'Valokuva: Joseph Mischyshyn, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Joseph Mischyshyn',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Loop_Head_Peninsula_-_Lighthouse_Compound_-_geograph.org.uk_-_3055962.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-loop-head-461fbe81.jpg',
        lyhyt: 'Myrskyisen meren aallot vyöryvät Loop Headin kerroksellisia kallioita vasten.',
        selite: 'Kuvassa Loop Headin lähellä jyrkkää kallioseinämää, jonka vaakasuorat kerrokset erottuvat, sekä vaahtoava meri. Kallioiden päällä on loivaa nurmea.',
        lahde: 'Valokuva: Gordon Hatton, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Gordon Hatton',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Impressive_cliffs_near_Loop_Head_-_geograph.org.uk_-_4684265.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
      },
    ],
    nimi: 'Loop Head',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Mitä nimi Ceann Léime tarkoittaa?',
      'Mikä merkitsee Loop Headin kärkeä?',
    ],
    korostukset: ['majakka|majakka'],
    nappi: 'Shannonin suun majakkaniemi, jonka nimi tarkoittaa hyppyniemeä',
    // -9.93175 E / 52.56097222 N — en-Wikipedia "Loop Head"
    laudat: {
      maailmankartta: { x: 5502.3, y: 1277 },
      europe: { x: 20.5, y: 511.2 },
    },
    teksti: 'Loop Head, irlanniksi Ceann Léime eli hyppyniemi, on Shannon-joen suun '
      + 'pohjoispuolella Clarein kreivikunnassa Länsi-Irlannissa oleva niemi. Sen kärkeä '
      + 'merkitsee näkyvä majakka, ja vastapäätä Shannonin toisella puolella on Kerry Head. '
      + 'Niemimaan toisella puolella on Atlantti ja toisella Shannonin suisto, ja vain noin '
      + 'mailin levyinen maakaistale estää sitä olemasta saari. Vuonna 2010 niemimaa sai EU:n '
      + 'European Destinations of Excellence -tunnustuksen, ja sen kärjessä on toisen '
      + 'maailmansodan Emergency-ajalta jäänyt jättimäinen Eire-kyltti.',
    lahde: 'en-Wikipedia "Loop Head", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-cobh',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-cobh-186138c6.jpg',
      lyhyt: 'Pyhän Colmanin katedraali Cobhissa, kuvattuna The Crescentilta.',
      selite: 'Goottilaisen katedraalin länsijulkisivu ja korkea kellotorni kohoavat kaupungin yllä; oikealla näkyy merenlahtea. Katedraali rakennettiin 1860-luvun lopulta alkaen.',
      lahde: 'Valokuva: Andreas F. Borchert, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Andreas F. Borchert',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cobh_St._Colman\'s_Cathedral_2015_08_27.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-cobh-0e911282.jpg',
        lyhyt: 'Värikkäät rinnetalot West Viewn kadulla Cobhissa.',
        selite: 'Cobhin West View -kadun värikkäät talorivit tunnetaan paikallisesti nimellä "Deck of Cards".',
        lahde: 'Valokuva: Colin Park, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Colin Park',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cobh_-_\'Deck_of_Cards\'_houses,_West_View_-_geograph.org.uk_-_7930681.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Cobh (Queenstown)',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Millä nimellä Cobhia kutsuttiin vuosina 1849–1920?',
      'Kuinka moni Irlannista Pohjois-Amerikkaan muuttanut lähti Cobhista?',
    ],
    korostukset: ['Queenstown|Queenstown'],
    nappi: 'Queenstown, jonka nimi on peräisin Victorian vierailulta 1849 ja josta siirtolaislaivat lähtevät',
    // -8.2967 E / 51.851 N — en-Wikipedia "Cobh"
    laudat: {
      maailmankartta: { x: 5556.8, y: 1308.7 },
      europe: { x: 51.9, y: 529.9 },
    },
    teksti: 'Cobh, jota kutsuttiin vuosina 1849–1920 nimellä Queenstown, on satamakaupunki Corkin '
      + 'kreivikunnan etelärannikolla Corkin sataman Great Islandin eteläpuolella. Nimi '
      + 'Queenstown annettiin vuonna 1849 kuningatar Victorian vierailun aikana, ja nimi '
      + 'Cobh, joka on englanninkielisen nimen Cove gaelisointi, palautettiin vuonna 1920. '
      + 'Kaupungin korkealla kohdalla kohoaa Pyhän Colmanin katedraali, joka on 91,4 metriä '
      + 'korkea. Cobh oli suuri transatlanttinen satama: sieltä lähti 2,5 miljoonaa niistä '
      + 'kuudesta miljoonasta irlantilaisesta, jotka muuttivat Pohjois-Amerikkaan vuosina '
      + '1848–1950. Kaupungin siirtolais- ja merenkulkuperintö on nykyään matkailun perusta.',
    lahde: 'en-Wikipedia "Cobh", johdanto-osa ja osiot "Name" ja "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä tapahtuman yhteydessä Cobh nimettiin Queenstowniksi vuonna 1849?',
      vaihtoehdot: [
        'Kuninkaallisen laivaston saapuminen',
        'Kuningatar Annen kruunajaiset',
        'Kuningatar Elisabetin vierailu',
        'Kuningatar Victorian vierailu',
      ],
      oikea: 3,
      fakta: 'Pyhän Colmanin katedraali on 91,4 metriä korkea ja yksi Irlannin korkeimmista rakennuksista.',
    },
  },
  {
    id: 'hahmotelma-bunratty',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-bunratty-bbb0971a.jpg',
      lyhyt: 'Bunratty Castle kaakosta, edessä joki ja kivisilta.',
      selite: 'Nelitorninen kivilinna kohoaa Clare-kreivikunnassa; sen vieressä on Durty Nelly\'s -pubi.',
      lahde: 'Valokuva: DXR, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'DXR',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bunratty_Castle_and_Durty_Nellys,_Southeast_view_20150803_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-bunratty-f0e6583f.jpg',
        lyhyt: 'Bunratty Castlen kivimuurit ja torni koillisesta.',
        selite: 'Linnan linnoitettu torniosa ja sisäpihan muurit nurmikentän ympäröimänä Bunratty Castle & Folk Parkissa.',
        lahde: 'Valokuva: Chris Light, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Chris Light',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bunratty_Castle_NE.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Bunratty',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä nimi Bunratty tarkoittaa?',
      'Kuka pelasti linnan raunioitumiselta vuonna 1956?',
    ],
    korostukset: ['tornitalo|tornitalo'],
    nappi: 'Shannonin suun 1400-luvun tornilinna, entinen Thomondin vahva linnoitus',
    // -8.81166667 E / 52.69666667 N — en-Wikipedia "Bunratty Castle"
    laudat: {
      maailmankartta: { x: 5539.6, y: 1270.9 },
      europe: { x: 42, y: 507.7 },
    },
    teksti: 'Bunratty Castle on suuri 1400-luvun tornitalo Clarein kreivikunnassa Bunrattyn kylän '
      + 'keskustassa, Limerickin ja Ennisin välisen tien varrella lähellä Shannonin kaupunkia '
      + 'ja sen lentokenttää. Nimi tarkoittaa irlanniksi Ratty-joen suuta; Ratty on toinen '
      + 'nimi Owenogarney-joelle, joka laskee Shannonin suistoon linnan ohi. Nykyinen, neljäs '
      + 'linna aloitettiin noin vuonna 1450, ja sen rakentajaksi arvellaan MacNamaran '
      + 'päällikköä. Vuonna 1558 Irlannin kuninkaan sijainen Thomas Radclyffe valtasi linnan, '
      + 'joka oli tuolloin yksi Thomondin tärkeimmistä linnoituksista, ja vuonna 1956 '
      + 'varakreivi Gort osti ja kunnosti linnan pelastaen sen raunioitumiselta; yleisölle se '
      + 'avattiin vuonna 1960.',
    lahde: 'en-Wikipedia "Bunratty Castle", johdanto-osa ja osiot "Name" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-blarney',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-blarney-5cf53095.jpg',
      lyhyt: 'Blarney Castle puiston puiden ja joen takaa.',
      selite: 'Korkea tornilinna ja sen viereinen pyöreä pikkutorni kohoavat vehreän puiston yllä; etualalla virtaa joki.',
      lahde: 'Valokuva: Gerd Eichmann, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Gerd Eichmann',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blarney_Castle-02-2017-gje.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-blarney-40fc275d.jpg',
        lyhyt: 'Blarney Castlen päätorni ja sen viereinen pieni torni lähikuvassa.',
        selite: 'Linnan kivinen päätorni ja sen vieressä kapea pyöreä torni, jossa on kaarevat ikkuna-aukot.',
        lahde: 'Valokuva: DeFacto, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'DeFacto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blarney_Castle_2017.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Blarney',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka suku rakennutti Blarneyn nykyisen tornin?',
      'Milloin torni valmistui?',
    ],
    korostukset: ['MacCarthy|MacCarthy'],
    nappi: 'MacCarthyn vanha linna, jonka viereen suunnitellaan uutta kartanoa',
    // -8.5708 E / 51.9289 N — en-Wikipedia "Blarney Castle"
    laudat: {
      maailmankartta: { x: 5547.6, y: 1305.3 },
      europe: { x: 46.6, y: 527.9 },
    },
    teksti: 'Blarney Castle on keskiaikainen linnoitus Blarneyn kaupungissa Corkin '
      + 'kreivikunnassa. Nykyisen tornin rakennutti Desmondin kuninkaiden sivuhaaran '
      + 'MacCarthy of Muskerryn suku, ja se on vuodelta 1446; Blarneyn kivi on linnan ylimmän '
      + 'ulkonevan kaiteen osana. Linnan paikalla oli ennen vuotta 1200 puutalo, joka '
      + 'korvattiin noin vuonna 1210 kivilinnoituksella, ja Cormac Láidir MacCarthy rakensi '
      + 'sen uudelleen vuoden 1446 tuhon jälkeen. Parlamentaariset joukot valtasivat linnan '
      + 'vuonna 1646, ja Williamiittien sodassa 1690-luvulla se takavarikoitiin; vuonna 1874 '
      + 'linnan lähelle rakennettiin uusi Blarney House -kartano skotlantilaiseen '
      + 'paroni-tyyliin.',
    lahde: 'en-Wikipedia "Blarney Castle", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-hook',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-hook-229718f3.jpg',
      lyhyt: 'Hook Headin musta-valkoraidallinen majakka kalliorannalla.',
      selite: 'Majakan torni on maalattu mustin ja valkoisin vyöhyköin; se seisoo Wexfordin kreivikunnan niemellä avomeren äärellä.',
      lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Zairon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:County_Wexford_Hook_Head_Lighthouse_6.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-hook-d68cc35d.jpg',
        lyhyt: 'Hook Head -majakka jyrkän kalliorannan takana, aallot pitkällä valotusajalla.',
        selite: 'Majakka ja vartijoiden rakennukset sijaitsevat kerroksellisten kalliomuodostelmien päällä; pitkä valotusaika tekee merestä usvaisen.',
        lahde: 'Valokuva: PatrickByrnePhotography, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'PatrickByrnePhotography',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hook_Head_Lighthouse_-_slow_seascape.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hook Head',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka rakennutti Hook Headin majakan?',
      'Miksi majakka rakennettiin?',
    ],
    korostukset: ['majakka|majakka'],
    nappi: 'Yli 700 vuotta vanha majakka Waterfordin sataman suulla',
    // -6.92930556 E / 52.12380556 N — en-Wikipedia "Hook Lighthouse"
    laudat: {
      maailmankartta: { x: 5602.4, y: 1296.6 },
      europe: { x: 78.2, y: 522.7 },
    },
    teksti: 'Hook Head -majakka on Wexfordin kreivikunnassa Hookin niemimaan kärjessä oleva '
      + 'rakennus, joka on yksi maailman vanhimmista majakoista ja Espanjan Herkuleen tornin '
      + 'jälkeen toiseksi vanhin toimiva majakka. Nykyinen torni on 1100-luvulta, vaikka '
      + 'perimätiedon mukaan lähetyssaarnaaja Dubhán perusti merkkitulen jo 400-luvulla. '
      + 'Tornin rakennutti Strongbow\'n vävy William Marshall, Pembroken jaarli, joka oli '
      + 'perustanut sataman New Rossiin noin 30 kilometrin päähän ylävirtaan; jotta satama '
      + 'menestyisi ja laivat pääsisivät turvallisesti perille, hän rakennutti 36 metriä '
      + 'korkean tornin Waterfordin sataman suulle. Ensimmäiset valonvartijat olivat niemellä '
      + 'asuneen luostarin munkit, jotka sytyttivät varoitustulia vaarallisten karien '
      + 'varoitukseksi.',
    lahde: 'en-Wikipedia "Hook Lighthouse", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Miksi William Marshall rakennutti tornin Hook Headille?',
      vaihtoehdot: [
        'Vartioimaan rannikkoa viikingeiltä',
        'Toimimaan kuninkaan tähystyspaikkana',
        'Ohjaamaan laivat New Rossiin',
        'Opastamaan pyhiinvaeltajia luostariin',
      ],
      oikea: 2,
      fakta: 'Perimätiedon mukaan lähetyssaarnaaja Dubhán perusti merkkitulen jo 400-luvulla.',
    },
  },
  {
    id: 'hahmotelma-kinsale',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-kinsale-221dae06.jpg',
      lyhyt: 'Kinsalen satamaranta ja rinnetalot kukkien takaa.',
      selite: 'Kinsalen ranta-alueen talot nousevat rinteeseen; etualalla kukkivat kukat ja vasemmalla lahden tyyni vesi.',
      lahde: 'Valokuva: N Chadwick, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'N Chadwick',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Riverfront,_Kinsale_-_geograph.org.uk_-_6051541.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-kinsale-36301335.jpg',
        lyhyt: 'Charles Fortin muurit ja rauniot merenrannalla.',
        selite: 'Linnakkeen ruohopeitteiset muurit ja rakennusten rauniot; taustalla näkyy pieni majakka ja merenlahti.',
        lahde: 'Valokuva: Dieglop, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dieglop',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kinsale_-_Charles_Fort_-_20200804164924.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-kinsale-5bede96e.jpg',
        lyhyt: 'Charles Fortin sisäänkäynti: kivinen portti ja puinen silta.',
        selite: 'Linnakkeen kivinen portti ja puinen silta; muurit ympäröivät sisääntuloa.',
        lahde: 'Valokuva: JoachimKohler-HB, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'JoachimKohler-HB',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Entrance_to_Charles_Fort_in_Kinsale,_Co._Cork_(2014).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kinsale',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuonna espanjalaiset nousivat maihin Kinsalessa?',
      'Mikä on Kinsalen tähtilinnoitus?',
    ],
    korostukset: ['Charles Fort|Charles Fort'],
    nappi: 'Satamakaupunki, jossa Espanjan viimeinen armada laskeutui vuonna 1601',
    // -8.52222222 E / 51.70555556 N — en-Wikipedia "Kinsale"
    laudat: {
      maailmankartta: { x: 5549.3, y: 1315.2 },
      europe: { x: 47.6, y: 533.7 },
    },
    teksti: 'Kinsale on historiallinen satama- ja kalastajakaupunki Corkin kreivikunnassa, noin '
      + '25 kilometriä Corkista etelään Bandon-joen suulla, ja se tunnetaan ravintoloistaan '
      + 'ja gourmet-festivaaleistaan. Vuonna 1601 espanjalainen sotaretkikunta, viimeinen '
      + 'Englantia vastaan lähetetyistä armadoista, nousi Kinsalessa maihin yhdistyäkseen '
      + 'irlantilaisten kapinallisten kanssa; sen seurauksena käytiin Kinsalen taistelu '
      + 'Yhdeksänvuotisen sodan lopussa, jossa englantilaiset Lord Mountjoyn johdolla löivät '
      + 'Hugh O\'Neillin ja Red Hugh O\'Donnellin irlantilaisjoukot. Kaupungin tärkeitä '
      + 'rakennuksia ovat Desmond Castle, James Fort ja Charles Fort, vuonna 1677 rakennettu '
      + 'tähtilinnoitus, joka suojelee sataman sisäänkäyntiä.',
    lahde: 'en-Wikipedia "Kinsale", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä valtion sotaretkikunta nousi maihin Kinsalessa vuonna 1601?',
      vaihtoehdot: [
        'Espanjan',
        'Ranskan',
        'Ruotsin',
        'Hollannin',
      ],
      oikea: 0,
      fakta: 'Vuonna 1689 James II nousi Kinsalessa maihin 2 500 miehen kanssa Ludvig XIV:n '
        + 'tuella.',
    },
  },
  {
    id: 'hahmotelma-carrowmore',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-carrowmore-9782cd6c.jpg',
      lyhyt: 'Carrowmoren dolmen nousee nurmikumpareelle, taustalla tasakattoinen vuori.',
      selite: 'Kuvassa on Carrowmoren käytävähaudan kivikammio: suuri kansikivi lepää pystykivien varassa vihreällä kummulla. Taustalla kohoaa jyrkkäreunainen, tasainen vuori.',
      lahde: 'Valokuva: Cliffoney, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Cliffoney',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:County_Sligo_-_Carrowmore_Passage_Tomb_-_20190922144246.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-carrowmore-03e53a26.jpg',
        lyhyt: 'Jäkälän peittämä megaliittihauta P54 Carrowmoren niityllä.',
        selite: 'Kuvassa on Carrowmoren hautakentän megaliittikammio P54: suuri kansikivi lepää pienempien kivien päällä. Taustalla häämöttävät matalat vuoret.',
        lahde: 'Valokuva: Andreas F. Borchert, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Andreas F. Borchert',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Carrowmore_Megalithic_Cemetery_P54_2015_09_08.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Carrowmore',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minä vuosituhantena Carrowmoren haudat rakennettiin?',
      'Mikä vuori hallitsee Carrowmoren maisemaa?',
    ],
    korostukset: ['megaliitti|megaliittimuistomerkkien'],
    nappi: 'Sligon megaliittihaudat, joista monet ovat jo tuhoutuneet 1800-luvulla',
    // -8.51916667 E / 54.25085556 N — en-Wikipedia "Carrowmore"
    laudat: {
      maailmankartta: { x: 5549.4, y: 1200.3 },
      europe: { x: 47.6, y: 466.8 },
    },
    teksti: 'Carrowmore, irlanniksi suuri neljännes, on suuri megaliittimuistomerkkien ryhmä '
      + 'Coolera-niemimaalla Sligon länsipuolella, ja ne rakennettiin 4. vuosituhannella eaa. '
      + 'neoliittisella kivikaudella. Nykyään säilyneitä hautoja on 30, ja vielä 25 on '
      + 'tuhoutunut vuoden 1800 jälkeen, joten Carrowmore on yksi Irlannin suurimmista '
      + 'megaliittihautojen keskittymistä ja yksi neljästä suuresta yhdessä Carrowkeelin, '
      + 'Loughcrewin ja Brú na Bóinnen kanssa. Alueen hallitsee lännessä Knocknarea-vuori, '
      + 'jonka huipulla on suuri Miosgán Médhbhin kummuke. Osa monumenteista on joutunut '
      + 'louhinnan ja pellonraivauksen uhriksi 1700-, 1800- ja 1900-luvun alussa, ja '
      + 'kompleksi on suojeltu kansallinen muistomerkki.',
    lahde: 'en-Wikipedia "Carrowmore", johdanto-osa ja osio "Description" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-loughcrew',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-loughcrew-61511f1d.jpg',
      lyhyt: 'Loughcrewn suuri kivikasa-hautakumpu Cairn T kohoaa harjanteella.',
      selite: 'Kuvassa on Cairn T, Loughcrewn käytävähauta, jonka kumpu on tehty kivistä. Etualalla on pienempi satelliittihauta, luultavasti Cairn S, ja taustalla avautuu Irlannin tasankomaisema.',
      lahde: 'Valokuva: Rob Hurson, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Rob Hurson',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cairns_S(?)_and_T,_Loughcrew.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-loughcrew-ebbdb64b.jpg',
        lyhyt: 'Kiveen veistetyt kierteet Loughcrewn Cairn T:n käytävän suulla.',
        selite: 'Lähikuvassa on hiekkakiveen kaiverrettuja spiraalikuvioita Cairn T:n sisäänkäynnin oikealla puolella. Kuviot ovat noin 5 000 vuotta vanhaa esihistoriallista kiviveistoa.',
        lahde: 'Valokuva: Rob Hurson, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Rob Hurson',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Spirals_at_Loughcrew_Cairn_T.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Loughcrew',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä nimi Slieve na Calliagh tarkoittaa?',
      'Kuka legendan mukaan pudotti Loughcrewin kivet esiliinastaan?',
    ],
    korostukset: ['Cailleach|Cailleachin'],
    nappi: 'Meathin kukkuloiden neoliittiset hautakummut ja jättiläisakan tarina',
    // -7.112483 E / 53.744672 N — en-Wikipedia "Loughcrew"
    laudat: {
      maailmankartta: { x: 5596.3, y: 1223.5 },
      europe: { x: 74.6, y: 480.1 },
    },
    teksti: 'Loughcrew on historiallisesti merkittävä alue Oldcastlen lähellä Meathin '
      + 'kreivikunnassa, jossa on 4. vuosituhannen eaa. muinaisia hautoja, joista osa on '
      + 'koristeltu harvinaisella megaliittitaiteella ja jotka sijaitsevat kukkuloiden '
      + 'huipuilla. Kukkulat ja haudat tunnetaan yhdessä nimellä Slieve na Calliagh eli '
      + 'Cailleachin, irlantilaisen mytologian jumalallisen akan, vuori, ja ne ovat Meathin '
      + 'korkein kohta. Yli kolmekymmentä hautaa on jäänteinä neljällä kukkulalla, ja '
      + 'monumentit arvioidaan noin vuoteen 3300 eaa. Legendan mukaan ne syntyivät, kun '
      + 'jättiläisakka pudotti astellessaan esiliinastaan suuria kiviä.',
    lahde: 'en-Wikipedia "Loughcrew", johdanto-osa ja osio "The tombs" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-new-ross',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-new-ross-64c01da8.jpg',
      lyhyt: 'Dunbrody-purjelaivan jäljennös rannassa New Rossin satamassa pilvisellä säällä.',
      selite: 'Kolmimastoinen purjelaiva Dunbrody on kiinnittynyt laituriin New Rossin satamassa Wexfordin kreivikunnassa. Laiva on jäljennös 1800-luvun siirtolaisalus Dunbrodysta.',
      lahde: 'Valokuva: Gfox228, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Gfox228',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dunbrody,_New_Ross,_Ireland_-_panoramio.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-new-ross-ebe85192.jpg',
        lyhyt: 'Dunbrodyn perä ja mastot New Rossin laiturissa, kyljessä laivan nimi.',
        selite: 'Kuvassa näkyy Dunbrody-purjelaivan tumma runko, valkoiset mastot ja köysistö sekä perässä laivan nimi ja teksti New Ross. Laiva makaa joella laiturin vieressä.',
        lahde: 'Valokuva: Suckindiesel, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Suckindiesel',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dunbrody_ship_NewRoss.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'New Ross',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Kuka rakennutti sillan, jonka ympärille New Ross kasvoi?',
      'Minkä laivan jäljennös on New Rossin laiturilla?',
    ],
    korostukset: ['Dunbrody|Dunbrody'],
    nappi: 'Barrow-joen satamakaupunki, josta nälänhädän aikana lähti siirtolaislaivoja',
    // -6.945 E / 52.396 N — en-Wikipedia "New Ross"
    laudat: {
      maailmankartta: { x: 5601.8, y: 1284.4 },
      europe: { x: 77.9, y: 515.6 },
    },
    teksti: 'New Ross on noin 8 600 asukkaan kaupunki Wexfordin kreivikunnan lounaisosassa '
      + 'Barrow-joen varrella, 20 kilometriä Waterfordista koilliseen. Kaupunki nousi '
      + 'merkittäväksi normannien valloituksen jälkeen: ritari William Marshall ja hänen '
      + 'vaimonsa Isabella de Clare saapuivat 1200-luvun alussa, ja Rossin kronikan mukaan '
      + 'Isabella ryhtyi vuonna 1189 rakentamaan ihanaa kaupunkia Barrow-joen rannalle. '
      + 'Kaupunki kasvoi William Marshallin rakennuttaman sillan ympärille. Nykyään '
      + 'satamalaiturilla on Dunbrody-nälänhätälaivan jäljennös ja Siirtolaisliekki, joka '
      + 'palaa nälänhädän aikana lähteneiden siirtolaisten muistoksi.',
    lahde: 'en-Wikipedia "New Ross", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-grianan',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-grianan-b8a82b33.jpg',
      lyhyt: 'Grianán of Aileachin pyöreä kivilinnoitus kohoaa kanervaisella vuorenharjalla.',
      selite: 'Kuvassa on Donegalin varhaiskeskiaikainen kivilinnoitus (ringfort), jonka paksu, kuivamuurattu kiviseinä kaartuu pyöreäksi. Seinässä näkyy matala oviaukko.',
      lahde: 'Valokuva: Silyba, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Silyba',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grianan_of_Aileach_Donegal.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-grianan-1519e541.jpg',
        lyhyt: 'Linnoituksen sisäpuolella kiertävät kivimuurin terassit ja portaat.',
        selite: 'Kuvassa näkyy Grianán of Aileachin sisäpuolinen muuri, jossa on kivisiä terasseja, kapeita portaita ja matalia oviaukkoja. Taustalla häämöttävät sinertävät vuoret.',
        lahde: 'Valokuva: Guyw4444, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Guyw4444',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:County_Donegal_-_Grianan_of_Aileach_-_20110704094128.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Grianán of Aileach',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Milloin Grianán of Aileachin merkittävä kunnostus tehtiin?',
      'Minkä kuningaskunnan istuin linnoitus oli?',
    ],
    korostukset: ['Ailech|Ailechin'],
    nappi: 'Uí Néillin kuninkaallinen linnoitus, jonka jälleenrakennus on juuri valmistunut (1870)',
    // -7.42759167 E / 55.02379444 N — en-Wikipedia "Grianan of Aileach"
    laudat: {
      maailmankartta: { x: 5585.7, y: 1164.7 },
      europe: { x: 68.6, y: 446.5 },
    },
    teksti: 'Grianán of Aileach on Inishowenin niemimaalla Donegalin kreivikunnassa 244 metriä '
      + 'korkean Greenan-vuoren huipulla oleva linnoitettu kukkula. Sen päärakenne on '
      + '1800-luvun jälleenrakennus kivisestä ringfortista, jonka Pohjoisen Uí Néillin '
      + 'arvellaan rakentaneen 500- tai 600-luvulla; kohde on tunnistettu Ailechin '
      + 'kuningaskunnan istuimeksi ja yhdeksi gaelilaisen Irlannin kuninkaallisista '
      + 'paikoista. Muuri on noin 4,5 metriä paksu ja 5 metriä korkea, ja sisällä on kolme '
      + 'portaiden yhdistämää terassia sekä kaksi pitkää käytävää. Irlantilaisen '
      + 'kirjallisuuden mukaan Munsterin kuningas Muirchertach Ua Briain tuhosi linnoituksen '
      + 'suurelta osin vuonna 1101, ja merkittäviä kunnostustöitä tehtiin vuonna 1870.',
    lahde: 'en-Wikipedia "Grianan of Aileach", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lismore',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-lismore-a636b8d6.jpg',
      lyhyt: 'Lismore Castle kohoaa metsäisellä rinteellä joen yllä.',
      selite: 'Kuvassa on Lismoren linna Waterfordin kreivikunnassa: tornit ja rintavarustetut muurit nousevat jyrkän, puiden peittämän rinteen päältä. Etualalla virtaa joki.',
      lahde: 'Valokuva: Raúl Corral, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Raúl Corral',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lismore_Castle_(Lismore,_Co._Waterford).jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-lismore-95f811ab.jpg',
        lyhyt: 'Vuoden 1833 puupiirros Lismoren linnasta sillan kaaren alta katsottuna.',
        selite: 'Dublin Penny Journal -lehden kansikuva vuodelta 1833: Lismoren linna näkyy joen yli sillan kuivan kaaren alta piirrettynä. Piirros on R. Hillin tekemä, ja vesillä on pieni vene.',
        lahde: 'Kaiverrus: R. Hill, Wikimedia Commons (public domain).',
        tekija: 'R. Hill',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dublin_Penny_Journal,_Lismore_Castle,_1833_(cropped).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Lismore',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka osti linnan Sir Walter Raleighilta?',
      'Mikä luostari oli paikalla ennen linnaa?',
    ],
    korostukset: ['Raleigh|Raleigh'],
    nappi: 'Jaarlien linna, jonka Devonshiren herttua rakennuttaa goottilaiseen tyyliin 1800-luvun puolivälissä',
    // -7.9325 E / 52.14055556 N — en-Wikipedia "Lismore Castle"
    laudat: {
      maailmankartta: { x: 5568.9, y: 1295.8 },
      europe: { x: 58.9, y: 522.3 },
    },
    teksti: 'Lismore Castle on linna Lismoren kaupungissa Waterfordin kreivikunnassa. Se kuului '
      + 'Desmondin jaarleille, Corkin jaarleille ja vuodesta 1753 Cavendishin suvulle, ja '
      + 'nykyään se on Devonshiren herttuan Irlannin koti. Ensimmäisen linnan rakennutti '
      + 'vuonna 1185 Irlannin herra, Englannin prinssi John, vartioimaan joen ylityspaikkaa, '
      + 'ja paikalla oli aiemmin 600-luvun alussa perustettu Lismoren luostari, tärkeä '
      + 'oppineisuuden keskus. Vuonna 1589 Sir Walter Raleigh vuokrasi linnan ja hankki sen '
      + 'myöhemmin, ja hän myi sen vankeutensa aikana vuonna 1602 Richard Boylelle, josta '
      + 'tuli vuonna 1620 Corkin ensimmäinen jaarli. 1800-luvun puolivälissä linna '
      + 'rakennettiin suurelta osin uudelleen goottilaiseen tyyliin Devonshiren kuudennelle '
      + 'herttualle.',
    lahde: 'en-Wikipedia "Lismore Castle", johdanto-osa ja osio "Early history" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-skibbereen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-skibbereen-b87193e6.jpg',
      lyhyt: 'Skibbereenin keskusaukio, jossa kellotorni ja patsas.',
      selite: 'Kaupungin keskustassa kohoaa kellotorni, ja aukion laidalla on patsas jalustallaan. Kuvassa näkyy pieni joukko ihmisiä etäällä katukuvassa.',
      lahde: 'Valokuva: Kondephy, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kondephy',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skibbereen_Town_Center.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-skibbereen-ed38760c.jpg',
        lyhyt: 'Skibbereenin katedraali kivestä rakennettuna.',
        selite: 'Kivinen kirkkorakennus kellotorneineen ja kaari-ikkunoineen. Rautaportti ja aita ympäröivät pihaa.',
        lahde: 'Kuva: JohnArmagh, Wikimedia Commons (public domain).',
        tekija: 'JohnArmagh',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:SkibbereenCathedral.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Skibbereen',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Millä nimellä nälänhätää kutsutaan irlanniksi?',
      'Mikä komitea toimi Skibbereenissä nälänhädän aikana?',
    ],
    korostukset: ['nälänhätä|nälänhädän'],
    nappi: 'Nälänhädän riivaama Länsi-Cork, jonka avustuskomitea antoi mallin keittiöavustuksille',
    // -9.2675 E / 51.54916667 N — en-Wikipedia "Skibbereen"
    laudat: {
      maailmankartta: { x: 5524.4, y: 1322.1 },
      europe: { x: 33.3, y: 537.9 },
    },
    teksti: 'Skibbereen on Länsi-Corkin kaupunki N71-tien varrella; Ilen-joki virtaa kaupungin '
      + 'läpi ja saavuttaa meren noin 12 kilometrin päässä Baltimoren kylässä. Vuosina '
      + '1845–1852 seudulla riehui vakava nälänhätä, jota kutsutaan Suureksi nälänhädäksi tai '
      + 'irlanniksi an Gorta Mór. Nälänhädän aikana kaupunki oli paikallisen avustuskomitean '
      + 'organisointikeskus, joka koordinoi vapaaehtoista avustustyötä ja antoi mallin '
      + 'keittiöavustuksille sekä siirtolaisohjelmille. Skibbereenin perintökeskus arvioi, '
      + 'että lähellä olevalla Abbeystrewery-hautausmaalla on nälänhädän uhrien hautakuopissa '
      + '8 000–10 000 uhria, ja keskuksessa on pysyvä näyttely heidän muistokseen. Skibbereen '
      + 'oli myös vuonna 2009 Irlannin ensimmäisen kansallisen nälänhätämuistopäivän kohde.',
    lahde: 'en-Wikipedia "Skibbereen", johdanto-osa ja osio "Famine" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-knock',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-knock-a34a1b42.jpg',
      lyhyt: 'Knockin basilika päivänvalossa valkoisine seinineen ja korkeine tornikeihäineen.',
      selite: 'Valkoinen moderni pyhiinvaelluskirkko kohoaa nurmikkojen takaa, ja sen edustalla liehuvat liput. Kaukana kuvassa on vain muutamia pieniä hahmoja.',
      lahde: 'Valokuva: Sinéad Mallee, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Sinéad Mallee',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Knock_Basilica_16_July_2017.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-knock-0763ed93.jpg',
        lyhyt: 'Valaistu Knockin basilika sinisessä hämärässä.',
        selite: 'Kirkon vaaleat julkisivut ja kärkevä torni loistavat iltahämärässä. Kuva on otettu suoraan edestä, ja rakennuksen symmetrinen muoto näkyy selvästi.',
        lahde: 'Valokuva: PM Photography and A&D Wejcherts Architects, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'PM Photography and A&D Wejcherts Architects',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:PM_Photography_and_A%26D_Wejcherts_Architects_Knock_Basilica_Exterior.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Knock',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Minä vuonna Knockin ilmestyksen kerrotaan tapahtuneen?',
      'Minkä nimen kylä sai ilmestysten jälkeen?',
    ],
    korostukset: ['pyhiinvaelluskohde|pyhiinvaelluskohteena'],
    nappi: 'Mayon syrjäinen pikkukylä; sen nimi tarkoittaa kukkulaa',
    // -8.91667 E / 53.7833 N — en-Wikipedia "Knock, County Mayo"
    laudat: {
      maailmankartta: { x: 5536.1, y: 1221.7 },
      europe: { x: 40, y: 479.1 },
    },
    teksti: 'Knock, irlanniksi An Cnoc eli kukkula, on kylä Mayon kreivikunnassa, ja se tunnetaan '
      + 'Marian pyhäkkönä ja pyhiinvaelluskohteena. Katolisen uskon mukaan Neitsyt Maria, '
      + 'pyhä Joosef ja evankelista Johannes ilmestyivät todistajille kylässä 21. elokuuta '
      + '1879, ja nykyään kylä tunnetaan irlanniksi myös nimellä Cnoc Mhuire eli Marian '
      + 'kukkula. 1900-luvulla Knockista tuli yksi Euroopan eniten vierailluista Marian '
      + 'pyhäköistä Lourdesin ja Fatiman rinnalla, ja toisen maailmansodan aikana siellä '
      + 'järjestettiin rauhan pyhiinvaelluksia. Vuonna 1979 ilmestysten satavuotispäivänä '
      + 'paavi Johannes Paavali II vieraili pyhäkössä.',
    lahde: 'en-Wikipedia "Knock, County Mayo", johdanto-osa ja osio "Name" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Ketkä katolisen uskon mukaan ilmestyivät Knockissa 21. elokuuta 1879?',
      vaihtoehdot: [
        'Pyhä Patrick, Brigid ja Columba',
        'Neitsyt Maria, Joosef ja Johannes',
        'Franciscus ja Antonius Padovalainen',
        'Kolme tietäjää ja Joosef',
      ],
      oikea: 1,
      fakta: 'Paavi Franciscus vieraili Knockin basilikassa 26. elokuuta 2018.',
    },
  },
  {
    id: 'hahmotelma-waterford',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-waterford-12860fe5.jpg',
      lyhyt: 'Waterford-kristallimaljakko, jossa on kaiverrettu lintukuva ja tiheä timanttihionta.',
      selite: 'Paksu kristallimaljakko on koristeltu hiotuilla timanttikuvioilla, ja keskellä on kaiverrettu linnun kuva oksalla. Taustalla näkyy työpajan tiloja.',
      lahde: 'Valokuva: TR001, Wikimedia Commons (CC BY 3.0).',
      tekija: 'TR001',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Waterford_Crystal_engraved_glass.JPG',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-waterford-f34bee6d.jpg',
        lyhyt: 'Suuri Waterford-kristallikruunu täynnä riippuvia kristalleja.',
        selite: 'Monikerroksinen kristallikruunu loistaa valoissa, ja taustalla näkyy ikkunan sininen taivas. Kuva näyttää kristallilasin loisteen suuressa mittakaavassa.',
        lahde: 'Kuva: Mutantchicken14 at English Wikipedia, Wikimedia Commons (public domain).',
        tekija: 'Mutantchicken14 at English Wikipedia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Waterfordchandelier.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Waterford Crystal',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Milloin kristallin valmistus Waterfordissa alkoi?',
      'Milloin alkuperäinen lasitehdas suljettiin?',
    ],
    korostukset: ['kristalli|kristallilasitavaroiden'],
    nappi: 'Penrosen suvun lasitehdas on suljettu 1851; kristallin maine elää yhä',
    // -7.12916667 E / 52.25666667 N — en-Wikipedia "Waterford Crystal"
    laudat: {
      maailmankartta: { x: 5595.7, y: 1290.6 },
      europe: { x: 74.3, y: 519.2 },
    },
    teksti: 'Waterford Crystal on irlantilainen kristallilasitavaroiden, erityisesti '
      + 'kaiverrettujen lasituotteiden, valmistaja, ja se on nimetty Waterfordin kaupungin '
      + 'mukaan. Kristallin valmistus Waterfordissa alkoi vuonna 1783, kun George Penrose ja '
      + 'hänen veljenpoikansa William Penrose perustivat Waterford Glassworksin, joka tuotti '
      + 'erittäin hienoa piikivilasia, josta tuli maailmankuulua. Yritys suljettiin '
      + 'kesäkuussa 1851. Tuotannon elvyttämiseksi tehtiin yrityksiä 1900-luvun alusta '
      + 'lähtien, ja vuonna 2010 tuotanto siirtyi kaupungin keskustaan Mallille, jossa on '
      + 'vieraskeskus ja maailman suurin Waterford-kristallien kokoelma.',
    lahde: 'en-Wikipedia "Waterford Crystal", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Ketkä perustivat Waterford Glassworksin vuonna 1783?',
      vaihtoehdot: [
        'Arthur Guinness ja poika',
        'Waterfordin kaupunginvaltuusto',
        'George Penrose ja veljenpoika William',
        'Kolme flaamilaista lasimestaria',
      ],
      oikea: 2,
      fakta: 'Vuodesta 2015 alkaen tuotemerkin on omistanut Fiskars Corporation.',
    },
  },
  {
    id: 'hahmotelma-valentia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-valentia-475c1927.jpg',
      lyhyt: 'Valentia-saaren majakka kalliokärjellä ilmakuvassa.',
      selite: 'Valkoinen Cromwell Pointin majakka seisoo matalilla kallioilla meren ympäröimänä, ja taustalla siintävät vuoret pilvisen taivaan alla.',
      lahde: 'Valokuva: Podstawko, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Podstawko',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_Valentia_Lighthouse.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-valentia-bc513095.jpg',
        lyhyt: 'Bray Headin kivinen vartiotorni Valentia-saaren laidalla.',
        selite: 'Harmaa torni seisoo nurmisella kukkulalla matalan kiviaidan takana pilvisen taivaan alla. Tornilta on näkymä Atlantille.',
        lahde: 'Valokuva: Phil Champion, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Phil Champion',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bray_Head_Tower,_Valentia_Island,_County_Kerry_-_geograph.org.uk_-_5652406.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
      },
    ],
    nimi: 'Valentia',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Minkä kaapelin itäpää Valentia oli?',
      'Mitä varten saarelle rakennettiin observatorio vuonna 1866?',
    ],
    korostukset: ['lennätinkaapeli|lennätinkaapelin'],
    nappi: 'Saari, jonka lennätinkaapeli yhdistää Amerikkaan; kaapeli on toiminut seitsemän vuotta',
    // -10.35 E / 51.9 N — en-Wikipedia "Valentia Island"
    laudat: {
      maailmankartta: { x: 5488.3, y: 1306.6 },
      europe: { x: 12.5, y: 528.6 },
    },
    teksti: 'Valentia on Irlannin läntisimpiä kohtia, saari Dinglen lahdessa Iveraghin niemimaan '
      + 'edustalla Kerryn kreivikunnassa; sen ja mantereen yhdistää Portmageen silta. Saari '
      + 'on noin 11 kilometriä pitkä ja lähes kolme kilometriä leveä. Se oli ensimmäisen '
      + 'kaupallisesti toimivan Atlantin lennätinkaapelin itäpää: ensimmäinen yritys vuonna '
      + '1857 epäonnistui, ja myös kaapelit vuosina 1858 ja 1865 epäonnistuivat, kunnes '
      + 'vuonna 1866 kaapeli lopulta saatiin toimimaan. Vuonna 1866 Yhdysvaltain '
      + 'rannikkomittauslaitos teki saarella pituuspiirimittauksen yhdistääkseen '
      + 'Yhdysvaltojen ja Greenwichin pituuspiirit, ja mittauksia varten rakennettiin '
      + 'väliaikainen observatorio. Saaren liuskelouhoksen liuskeita käytettiin Britannian '
      + 'parlamenttitalossa.',
    lahde: 'en-Wikipedia "Valentia Island", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä yhteyden itäpää Valentia-saari oli 1860-luvulla?',
      vaihtoehdot: [
        'Atlantin höyrylaivareitin',
        'Irlannin postilaivayhteyden',
        'Atlantin majakkaketjun',
        'Atlantin lennätinkaapelin',
      ],
      oikea: 3,
      fakta: 'Saaren liuskelouhoksen liuskeita käytettiin Britannian parlamenttitalossa.',
    },
  },
  {
    id: 'hahmotelma-birr',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-birr-6acf8651.jpg',
      lyhyt: 'Leviathan-teleskoopin kivimuurit ja suuri putki Birr Castlen puistossa.',
      selite: 'Kaksi korkeaa kiviseinää portaineen kehystää valtavaa teleskooppiputkea. Rakennelma on aidattu nurmikentän keskelle puiden keskelle.',
      lahde: 'Valokuva: DixonD, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'DixonD',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Leviathan_of_Parsonstown.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-birr-499983d1.jpg',
        lyhyt: 'Birr Castle kukkapenkkien ja murattien takana.',
        selite: 'Tornein ja rintavarustein koristeltu harmaa linna kohoaa värikkäiden kukkapenkkien takaa. Osa seinistä on punaisen ja vihreän köynnöksen peitossa.',
        lahde: 'Valokuva: Ingrid helena, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ingrid helena',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Birr_Castle.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Birrin linna',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mikä nimi Birrin suurella teleskoopilla on?',
      'Kuka rakennutti teleskoopin linnan puistoon?',
    ],
    korostukset: ['Leviathan|Leviathan'],
    nappi: 'Rossen jaarlin Leviathan, maailman suurin teleskooppi, on yhä käytössä',
    // -7.91476 E / 53.09536 N — en-Wikipedia "Birr Castle"
    laudat: {
      maailmankartta: { x: 5569.5, y: 1252.9 },
      europe: { x: 59.2, y: 497.2 },
    },
    teksti: 'Birrin linna on linna Birrin kaupungissa Offalyn kreivikunnassa, ja siellä asuu '
      + 'Rossen 7. jaarli perheineen; linnan puutarhat ovat yleisölle avoimet. Linnan '
      + 'paikalla on ollut linna vuodesta 1170, ja 1300–1600-luvuilla O\'Carrollien suku '
      + 'hallitsi täältä. Sir Lawrence Parsons sai linnan ja 1 277 eekkeriä maata vuonna '
      + '1620, ja Rossen 2. jaarli goottilaisti linnaa 1800-luvun alussa. Hänen poikansa, '
      + 'Rossen 3. jaarli, rakennutti linnan puistoon Leviathan-nimisen suuren teleskoopin, '
      + 'jonka 183 senttimetrin peili valmistui vuonna 1845 ja joka oli maailman suurin '
      + 'teleskooppi.',
    lahde: 'en-Wikipedia "Birr Castle", johdanto-osa ja osiot "History" ja "The Great Telescope" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mikä oli Birrin Leviathan-teleskooppi valmistuttuaan vuonna 1845?',
      vaihtoehdot: [
        'Ensimmäinen radioteleskooppi',
        'Maailman suurin teleskooppi',
        'Ensimmäinen avaruusteleskooppi',
        'Maailman ainoa aurinkoteleskooppi',
      ],
      oikea: 1,
      fakta: 'Teleskoopin ennätyskokoa ei ylitetty ennen Hooker-teleskoopin valmistumista Mount Wilsonilla vuonna 1917.',
    },
  },
];
