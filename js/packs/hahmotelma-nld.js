/*
 * ALANKOMAIDEN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan ja Itävallan jälkeen Alankomaat.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48) =====
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä Espanjan, Italian, Saksan, Portugalin,
 * Kreikan ja Itävallan pakat: jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä Wikipedian johdannosta omin sanoin suomeksi (ei
 * käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta). Vuoden 1873 jälkeiset kohteet (Keukenhofin
 * kukkapuisto 1949, Nuenenin Van Gogh 1883–85, Cruquiuksen museo 1933,
 * Oostvaardersplassen 1968) ovat mukana: teksti on nykytietoa ja `nappi`
 * katsoo vuodesta 1873 eteenpäin. Delftin posliini ei ole oma nostonsa
 * (nosto-leeuwenhoek on samassa paikassa).
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `nld-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/nld/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Amsterdam, Alankomaiden ainoa pelikaupunki) ulkopuolella,
 * lähin nosto yli 8 lautayksikön päässä kaupungista (raja
 * KAUPUNGIN_KOHDALLA_SADE on 7), ja js/fokuskohteet.js liittää rivit
 * KOHDE_MAAT.NLD:hen. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Alankomaiden fokuslehden
 * rajaukseen (`osuuLehteen`). Neljä Watteninsaarta (Texel, Vlieland,
 * Terschelling, Schiermonnikoog) on pelin karkean maailmankartan
 * NLD-renkaan ulkopuolella (rannikko ja saaret); niiden koordinaatit
 * ovat silti Wikipedian todelliset.
 */

/** Alankomaiden hahmotelmanostot: sisällölliset kohteet kaupungin ulkopuolella. */
export const HAHMOTELMA_NLD = [
  {
    id: 'hahmotelma-texel',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-texel-4831c0de.jpg',
      lyhyt: 'Eierlandin punainen majakka ja majakanvartijan talo Texelin pohjoiskärjessä.',
      selite: 'Punatiilinen Eierlandin majakka kohoaa dyynien ja ruohikon takaa De Cocksdorpin lähellä. Tienvarressa on majakan viereinen tiilinen asuinrakennus oransseine kattoineen.',
      lahde: 'Valokuva: Michielverbeek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Michielverbeek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:De_Cocksdorp,_vuurtoren_Eierland_RM35278_IMG_6024_2020-06-07_11.32.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-texel-8803bfc1.jpg',
        lyhyt: 'Ruohoiset dyynit ja kaukana näkyvä Eierlandin majakka Texelin pohjoisosassa.',
        selite: 'Aaltoilevaa dyynimaisemaa Pohjanmeren rannalla Texelin pohjoispäässä. Vasemmalla horisontissa erottuu Eierlandin punainen majakka.',
        lahde: 'Valokuva: Txllxt TxllxT, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Txllxt TxllxT',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Texel_-_North_Sea_Dunes_at_Eierland_Lighthouse_10.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Texel',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Minkä retken laivat lähtivät Texelistä vuonna 1594?',
      'Miksi John Paul Jones purjehti Texeliin vuonna 1779?',
    ],
    korostukset: ['Serapis|Serapis'],
    nappi: 'Watteninsaarista suurin, jonka matalikoille on karilleajettu laivoja vuosisatojen ajan',
    // 4.8 E / 53.05 N — en-Wikipedia "Texel"
    laudat: {
      maailmankartta: { x: 5993.3, y: 1255 },
      europe: { x: 303.4, y: 498.4 },
    },
    teksti: 'Texel on saari ja kunta Pohjois-Hollannissa, ja se on Länsi-Friisin saarten suurin '
      + 'ja asutuin; saari sijaitsee Wattenmerellä Den Helderin pohjoispuolella. Nykyään '
      + 'siellä asuu noin 13 800 ihmistä. Saari sai kaupunkioikeudet vuonna 1415, ja sieltä '
      + 'lähti 5. kesäkuuta 1594 ensimmäinen hollantilainen retkikunta Koillisväylälle. '
      + 'Saaren ympäristön matalat vedet ovat aiheuttaneet lukuisia haaksirikkoja. Kun '
      + 'amerikkalainen upseeri John Paul Jones oli vuonna 1779 vallannut englantilaisen '
      + 'fregatin Serapis, hän purjehti sen kiireellisiin korjauksiin Texeliin.',
    lahde: 'en-Wikipedia "Texel", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minne suuntasi ensimmäinen hollantilainen retkikunta, joka lähti Texelistä 5. '
        + 'kesäkuuta 1594?',
      vaihtoehdot: [
        'Itä-Intiaan',
        'Koillisväylälle',
        'Luoteisväylälle',
        'Pohjoisnavalle',
      ],
      oikea: 1,
      fakta: 'Texelin saari syntyi Kaikkien pyhien tulvassa vuonna 1170, jolloin meri irrotti sen '
        + 'ja Wieringenin Pohjois-Hollannista.',
    },
  },
  {
    id: 'hahmotelma-vlieland',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-vlieland-cb09e69e.jpg',
      lyhyt: 'Vlielandin punainen majakka ja tiilinen talo mäntyjen ja dyynien keskellä.',
      selite: 'Kuva on otettu lautalta: punainen valurautainen majakka ja sen vieressä oleva teräsrakenteinen tarkkailutorni erottuvat mäntymetsän edestä. Oikealla on punatiilinen talo.',
      lahde: 'Valokuva: Hertha56, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Hertha56',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vlieland-Vuurtoren.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-vlieland-d341103a.jpg',
        lyhyt: 'Vlielandin pohjoisosan dyynejä ja Pohjanmerta.',
        selite: 'Ruohon peittämiä hiekkadyynejä Vlielandin pohjoisosassa. Taustalla siintää Pohjanmeri ja hiekkaranta.',
        lahde: 'Valokuva: Paul Arps from The Netherlands, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Paul Arps from The Netherlands',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dunes_of_northern_Vlieland_(Netherlands_2015)_(20232988066).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Vlieland',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mitä tapahtui West-Vlielandin kylälle?',
      'Millä tavalla vieraat pääsevät Vlielandille ja liikkuvat siellä?',
    ],
    korostukset: ['West-Vlieland|West-Vlieland'],
    nappi: 'Watteninsaari, jonka toinen kylä hukkui mereen jo 1736',
    // 5.06666667 E / 53.3 N — en-Wikipedia "Vlieland"
    laudat: {
      maailmankartta: { x: 6002.2, y: 1243.7 },
      europe: { x: 308.5, y: 491.8 },
    },
    teksti: 'Vlieland on saari Wattenmerellä Texelin ja Terschellingin välissä, ja se kuuluu '
      + 'Länsi-Friisin saariin. Saari irtosi mantereesta vuoden 1287 Pyhän Lucian tulvassa, '
      + 'ja se on nimetty Vlie-salmen mukaan. Saaren maisema on enimmäkseen hiekkadyynejä, ja '
      + 'siellä on vain yksi kylä, Oost-Vlieland; toinen kylä, West-Vlieland, hukkui mereen '
      + 'vuonna 1736. Mantereelta, Harlingenista, saarelle pääsee lautalla, mutta turistit '
      + 'eivät saa tuoda autojaan mukanaan, ja yleisin kulkuneuvo on polkupyörä. Saarelaiset '
      + 'eivät puhu friisiä: heidän oma Vlielandin murteensa oli sukua Texelin murteelle, ja '
      + 'sen viimeinen äidinkielinen puhuja kuoli vuonna 1993 107-vuotiaana.',
    lahde: 'en-Wikipedia "Vlieland", johdanto-osa ja osiot "History", "Geography" ja "Transport" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-terschelling',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-terschelling-b409ed8e.jpg',
      lyhyt: 'Brandariksen majakka kohoaa West-Terschellingin kadun päässä.',
      selite: 'Nelikulmainen kellertävä tiilitorni ylhäältä alaspäin kuvattuna. Majakan juurella on ovi ja kaari, ja vasemmalla näkyy pieni osa kylän taloja.',
      lahde: 'Valokuva: Ruben Holthuijsen, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Ruben Holthuijsen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:BrandarisLighthouse1_(44339409361).jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-terschelling-1971b106.jpg',
        lyhyt: 'Korkeita dyynejä ja mäntyjä West-Terschellingin lähellä, kaukana lautta.',
        selite: 'Ruohoinen dyynimaisema, jossa kasvaa mäntyjä ja keltakukkaisia pensaita. Taustalla Vattameren hiekkasärkkiä ja kaukana lautta.',
        lahde: 'Valokuva: Smiley.toerist, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Smiley.toerist',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Duinen_bij_West-Terschelling_7.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Terschelling',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mistä Terschellingin saarelle tuli karpalot?',
      'Mistä saarelaiset saavat rakennustarvikkeita?',
    ],
    korostukset: ['karpalot|karpalot'],
    nappi: 'Watteninsaari, jonka lato- ja talorakennukset tehdään haaksirikkojen mastoista',
    // 5.31666667 E / 53.4 N — en-Wikipedia "Terschelling"
    laudat: {
      maailmankartta: { x: 6010.6, y: 1239.1 },
      europe: { x: 313.3, y: 489.2 },
    },
    teksti: 'Terschelling on Vlielandin ja Amelandin välissä sijaitseva Länsi-Friisin saari '
      + 'Pohjois-Alankomaissa. Puuta on saarella vähän, joten useimmat talot ja ladot on '
      + 'rakennettu haaksirikkoutuneilta laivoilta pelastetuista mastoista. Saarella kasvavat '
      + 'karpalot alkoivat vuonna 1840, kun rannalle ajautui tynnyri karpaloita, jotka '
      + 'merimiehet olivat ilmeisesti pakanneet keripukkia vastaan; saarelaiset alkoivat '
      + 'viljellä niitä. Vuonna 1666 englantilaiset polttivat West-Terschellingin maan '
      + 'tasalle, ja tapahtuma tunnetaan admiraali Robert Holmesin mukaan nimellä Holmesin '
      + 'rovio. Merenkulkija Willem Barentsz syntyi Terschellingillä noin vuonna 1550.',
    lahde: 'en-Wikipedia "Terschelling", johdanto-osa ja osiot "Cranberries" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-schiermonnikoog',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-schiermonnikoog-0d3baf20.jpg',
      lyhyt: 'Schiermonnikoogin punainen Noordertoren-majakka dyynien takana.',
      selite: 'Korkea punainen majakka kohoaa ruohoisen dyynimaiseman ja matalien talojen takaa harmaata taivasta vasten.',
      lahde: 'Valokuva: acediscovery, Wikimedia Commons (CC BY 4.0).',
      tekija: 'acediscovery',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Schiermonnikoog_Noordertoren.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-schiermonnikoog-d7c5399d.jpg',
        lyhyt: 'Puinen merimerkki ja ruohoinen rantaniitty Kobbeduinen reunalla Schiermonnikoogissa.',
        selite: 'Kolmijalkainen puinen baken-merkki kohoaa pensaikon yli, ja edessä levittäytyy laakea ruohoinen kosteikko. Taivaalla on tummia sadepilviä.',
        lahde: 'Valokuva: Uberprutser, Wikimedia Commons (CC BY-SA 3.0 nl).',
        tekija: 'Uberprutser',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Het_baken_op_de_uitlopers_van_de_Kobbeduinen_van_Schiermonnikoog.jpg',
        lisenssi: 'CC BY-SA 3.0 nl',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en',
      },
    ],
    nimi: 'Schiermonnikoog',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Mitä Schiermonnikoog-nimi tarkoittaa?',
      'Miksi saarella on vain vähän autoja?',
    ],
    korostukset: ['Klaarkamp|Klaarkampin'],
    nappi: 'Harmaiden munkkien saari, jonka maa liikkuu hitaasti kaakkoon',
    // 6.225 E / 53.49 N — en-Wikipedia "Schiermonnikoog"
    laudat: {
      maailmankartta: { x: 6040.8, y: 1235.1 },
      europe: { x: 330.7, y: 486.8 },
    },
    teksti: 'Schiermonnikoog on Länsi-Friisin saari Pohjois-Alankomaissa Amelandin ja '
      + 'Rottumerplaatin välissä. Saari on noin 16 kilometriä pitkä ja neljä kilometriä '
      + 'leveä, ja siellä on Alankomaiden ensimmäinen kansallispuisto. Yksi kylä kantaa '
      + 'saaren nimeä, ja pysyviä asukkaita on noin 900, joten se on Alankomaiden harvimmin '
      + 'asuttu kunta; koska saari on pieni ja tasainen, vain noin 200 saarelaista on '
      + 'hankkinut luvan omaan autoon. Nimi tarkoittaa harmaiden munkkien saarta: saaren '
      + 'ensimmäiset tunnetut omistajat olivat mantereella sijainneen Klaarkampin luostarin '
      + 'sistersiläismunkit. Vuoroveden, tuulten ja myrskyjen takia saari siirtyy hitaasti '
      + 'etelään ja itään; vuonna 1250 se oli noin kaksi kilometriä nykyistä paikkaansa '
      + 'pohjoisempana.',
    lahde: 'en-Wikipedia "Schiermonnikoog", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-dwingelderveld',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-dwingelderveld-130b3a16.jpg',
      lyhyt: 'Kanervaa, koivu ja järvi Dwingelderveldin kansallispuistossa.',
      selite: 'Etualalla kukkivaa vaaleanpunaista kanervaa ja nuori koivu, taustalla nummilampi ja mäntymetsän reuna. Taivaalla on korkeita pilviä.',
      lahde: 'Valokuva: Agnes Monkelbaan, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Agnes Monkelbaan',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nationaal_Park_Dwingelderveld_20-08-2019_(actm.)_19.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-dwingelderveld-11fe09b5.jpg',
        lyhyt: 'Nummilampi ja mäntymetsän reuna Dwingelderveldin kosteikkoalueella.',
        selite: 'Kuivuneita ruohotupsuja etualalla, keskellä matala lampi turvekasojen ympäröimänä ja taustalla mänty- ja koivumetsää.',
        lahde: 'Valokuva: Agnes Monkelbaan, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Agnes Monkelbaan',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nationaal_Park_Dwingelderveld_20-08-2019_(actm.)_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Dwingelderveld',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Dwingelderveldillä pidetään yhä lampaita?',
      'Mistä ihmisen jäljet alueella kertovat?',
    ],
    korostukset: ['nummi|nummialue'],
    nappi: 'Drenthen nummi, jossa esihistorian kalmakummut ja kelttiläiset pellot ovat yhä näkyvissä',
    // 6.399 E / 52.803 N — en-Wikipedia "Dwingelderveld National Park"
    laudat: {
      maailmankartta: { x: 6046.6, y: 1266.1 },
      europe: { x: 334.1, y: 504.9 },
    },
    teksti: 'Dwingelderveld on Drenthen maakunnassa sijaitseva kansallispuisto, joka perustettiin '
      + 'vuonna 1991 ja joka kattaa noin 37 neliökilometriä. Se on Länsi-Euroopan suurin '
      + 'märkä nummialue. Alueella näkyvät yhä kelttiläisten peltojen ja hautakumpujen '
      + 'jäljet, mutta ihminen ei ole koskaan käyttänyt sitä kovin intensiivisesti; '
      + '1930-luvulla suunniteltiin raivauksia, mutta luonnonsuojelujärjestöt ostivat osan '
      + 'alueesta talteen. Nummen pitämiseksi avoimena alueella laiduntavat yhä lampaat ja '
      + 'lehmät, ja puistossa on lammastarha sekä yksi Alankomaiden suurimmista katajikoista.',
    lahde: 'en-Wikipedia "Dwingelderveld National Park", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-oostvaardersplassen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-oostvaardersplassen-19d942fd.jpg',
      lyhyt: 'Konik-hevosia laiduntamassa ja lintuja lentämässä kosteikon vesialueen yllä.',
      selite: 'Konik-hevosten lauma laiduntaa ruovikon ja vihreän niityn välissä. Etualan vedessä on lentoon lähteviä lintuja.',
      lahde: 'Valokuva: EM Kintzel, I Van Stokkum, Wikimedia Commons (CC BY 3.0).',
      tekija: 'EM Kintzel, I Van Stokkum',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oostvaardersplassen_koniks_vogels.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-oostvaardersplassen-4d0fbf80.jpg',
        lyhyt: 'Näkymä Oostvaardersplassenin vesialueelle linnunkatselukojusta.',
        selite: 'Avovettä, veteen kasvaneita paljaita puita ja taustalla ruovikko. Puiden oksilla näkyy tummia lintuja.',
        lahde: 'Valokuva: Dominicus Johannes Bergsma, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dominicus Johannes Bergsma',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Uitzicht_vanuit_vogelkijkhut_De_Schollevaar._Locatie,_Oostvaardersplassen_11.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Oostvaardersplassen',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Millä tavalla Oostvaardersplassen syntyi?',
      'Miksi alueelle tuotiin suuria kasvinsyöjiä?',
    ],
    korostukset: ['konik|konik'],
    nappi: 'Vuonna 1873 tässä on vielä meren pohjaa; kosteikko syntyy vasta 1900-luvulla',
    // 5.36666667 E / 52.45 N — en-Wikipedia "Oostvaardersplassen"
    laudat: {
      maailmankartta: { x: 6012.2, y: 1282 },
      europe: { x: 314.2, y: 514.2 },
    },
    teksti: 'Oostvaardersplassen on Flevolandin luonnonsuojelualue, jonka pinta-ala on noin 56 '
      + 'neliökilometriä ja joka on rewilding-kokeilu eli yritys palauttaa luonto villiksi. '
      + 'Alue on vuonna 1968 syntyneellä polderilla: maa kuivattiin merestä '
      + 'teollisuuskäyttöön, mutta se osoittautui viljelyyn sopimattomaksi, ja hylätylle '
      + 'alueelle asettuivat ensimmäisinä merihanhet. Biologi Frans Vera johti aluetta '
      + 'tutkinutta työtä 1970-luvun lopusta, ja alue julistettiin Ramsar-kosteikoksi vuoteen '
      + '1989 mennessä. Pajujen tihentymisen estämiseksi alueelle tuotiin suuria '
      + 'kasvinsyöjiä, kuten konik-hevosia, saksanhirviä ja heck-nautoja, jotka elävät ulkona '
      + 'ympäri vuoden.',
    lahde: 'en-Wikipedia "Oostvaardersplassen", johdanto-osa ja osio "Wet and dry areas" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitkä eläimet asettuivat hylätylle polderille ensimmäisinä?',
      vaihtoehdot: [
        'Konik-hevoset',
        'Saksanhirvet',
        'Heck-naudat',
        'Merihanhet',
      ],
      oikea: 3,
      fakta: 'Alueen suuret kasvinsyöjät elävät ulkona ympäri vuoden, eikä niitä ruokita talvella.',
    },
  },
  {
    id: 'hahmotelma-biesbosch',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-biesbosch-88c5d9d0.jpg',
      lyhyt: 'Tulvametsän pajut reunustavat rauhallista vesiväylää Biesboschin kansallispuistossa.',
      selite: 'Biesboschin kansallispuiston vuorovesivaikutteinen vesiväylä, jonka rannoilla kasvaa tulvametsän puita, ruokoa ja kukkivia rantakasveja.',
      lahde: 'Valokuva: FrDr, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'FrDr',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nationaal_park_De_Biesbosch_08.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-biesbosch-e643399d.jpg',
        lyhyt: 'Ruovikkoinen suvanto avautuu leveälle vesialueelle Biesboschissa.',
        selite: 'Biesboschin kansallispuistoa esittävässä kuvassa ruovikon halkoma matala vesiväylä johtaa laajalle avovedelle, jonka takana häämöttää tasainen vastaranta.',
        lahde: 'Valokuva: Ymblanter, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ymblanter',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:De_Wassende_Maan.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Biesbosch',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mikä tulva loi Biesboschin?',
      'Millainen luonto Biesboschilla on?',
    ],
    korostukset: ['Elisabetin tulva|Elisabetin tulva'],
    nappi: 'Tulvan 1421 luoma sarojen ja pajujen sokkelo, jossa vuorovesi vielä liikuttaa vettä',
    // 4.75 E / 51.73333333 N — en-Wikipedia "De Biesbosch National Park"
    laudat: {
      maailmankartta: { x: 5991.7, y: 1314 },
      europe: { x: 302.4, y: 533 },
    },
    teksti: 'Biesbosch on yksi Alankomaiden suurimmista kansallispuistoista ja Luoteis-Euroopan '
      + 'viimeisiä laajoja makean veden vuorovesikosteikkoja. Nimi tarkoittaa saroista '
      + 'koostuvaa metsää, ja alue on jokien ja pienempien salmien verkosto saarineen; '
      + 'kasvillisuus on enimmäkseen pajumetsää, ja se on tärkeä vesilintujen ja muuttavien '
      + 'hanhien alue. Biesbosch syntyi, kun Pyhän Elisabetin tulva vuonna 1421 upotti noin '
      + '300 neliökilometriä polderimaata, joka oli aiemmin Suuri Hollannin Waard -niminen '
      + 'viljelyalue kylineen. Perinteen mukaan tulvassa katosi 72 kylää. Tulva ei kuitenkaan '
      + 'muuttanut aluetta yhdessä yössä; kesti vuosikymmeniä, ennen kuin koko alue oli veden '
      + 'alla.',
    lahde: 'en-Wikipedia "De Biesbosch National Park", johdanto-osa ja osio "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-naarden',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-naarden-b17f3ec9.jpg',
      lyhyt: 'Naarden-Vestingin tähtimuotoinen linnoitus ilmasta kuvattuna.',
      selite: 'Ilmakuva Naardenin linnoituskaupungista, jonka punakattoisia taloja ympäröivät tähtimäiset vallit ja leveät vallihaudat.',
      lahde: 'Valokuva: Nederlands Vestingmuseum, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Nederlands Vestingmuseum',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Luchtfoto_Naarden-Vesting.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-naarden-fe059bde.jpg',
        lyhyt: 'Promers-bastionin kivimuuri kohoaa Naardenin vallihaudan yläpuolelle.',
        selite: 'Panoraamakuva Naarden-Vestingin Promers-bastionista: vallihaudan yli näkyy bastionin kivimuuri ja sen päällä puiden peittämä valli.',
        lahde: 'Valokuva: Jan Kranendonk, Wikimedia Commons (CC0).',
        tekija: 'Jan Kranendonk',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bastion_Promers_Naarden.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Naarden',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Naardenille tapahtui vuonna 1572?',
      'Minkä muotoinen Naardenin linnoitus on?',
    ],
    korostukset: ['Naardenin verilöyly|Naardenin verilöyly'],
    nappi: 'Tähtilinnoitus, jonka asukkaat surmattiin 1572 ja jossa Comenius lepää',
    // 5.16222222 E / 52.29527778 N — en-Wikipedia "Naarden"
    laudat: {
      maailmankartta: { x: 6005.4, y: 1288.9 },
      europe: { x: 310.3, y: 518.2 },
    },
    teksti: 'Naarden on kaupunki Gooin alueella Pohjois-Hollannissa; se sai kaupunkioikeudet '
      + 'vuonna 1300 ja kehittyi linnoitetuksi varuskuntakaupungiksi, jossa oli '
      + 'tekstiiliteollisuutta. Vuonna 1572 espanjalaissotilaat ryöstivät ja polttivat '
      + 'kaupungin rangaistusretkellä hollantilaisia kapinallisia vastaan; Naardenin '
      + 'verilöylyssä selvisi hengissä vain noin 60 ihmistä. Tuho yllytti kapinalliset '
      + 'jatkamaan itsenäisyyssotaa Espanjaa vastaan. Naarden on esimerkki '
      + 'tähtilinnoituksesta, jossa on muurit ja vallihauta, ja niitä on kunnostettu monta '
      + 'kertaa, erityisesti ranskalaisaikana 1795–1814. Kaupunkiin on haudattu myös '
      + 'tšekkiläinen kasvattaja Johann Amos Comenius, jonka mausoleumiin voi tutustua.',
    lahde: 'en-Wikipedia "Naarden", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä muotoinen Naardenin linnoitus on?',
      vaihtoehdot: [
        'Tähti',
        'Ympyrä',
        'Neliö',
        'Kolmio',
      ],
      oikea: 0,
      fakta: 'Napoleonin sotien lopulla Naardenia piiritettiin kuukausien ajan, koska '
        + 'ranskalaiskomentaja ei uskonut uutista Napoleonin kohtalosta.',
    },
  },
  {
    id: 'hahmotelma-dokkum',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-dokkum-f588dc16.jpg',
      lyhyt: 'Dokkumin Grootdiep-kanavalla on purjeproomuja, taustalla mylly.',
      selite: 'Näkymä Dokkumin Grootdiep-vesiväylälle: laiturissa on perinteisiä purjeproomuja, rannalla tiilitaloja ja kaukana myllyn siivet.',
      lahde: 'Valokuva: Agnes Monkelbaan, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Agnes Monkelbaan',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dokkum,_Grootdiep._20-09-2021._(actm.).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-dokkum-8da39042.jpg',
        lyhyt: 'Bonifatiuksen patsas ja lähde Dokkumin Bonifatiuskappelin edessä.',
        selite: 'Kuvassa on Bonifatiuksen kiviveistos, Bonifatius-lähteen pyöreä allas ja taustalla Bonifatiuskappeli Dokkumissa. Patsaan jalustan latinankielinen teksti viittaa Bonifatiuksen kuolinvuoteen 754.',
        lahde: 'Valokuva: Theun at Western Frisian Wikipedia, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Theun at Western Frisian Wikipedia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bonifatius_Kapel_2.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-dokkum-772b8980.jpg',
        lyhyt: 'Katsojat seuraavat Elfstedentochtia Dokkumin Kleindiep-kanavan jäällä vuonna 1963.',
        selite: 'Vuoden 1963 Elfstedentocht Dokkumissa: jäätynyt Kleindiep-kanava, jäätä reunustavia katsojia, Bonte Brug -silta ja taustalla mylly.',
        lahde: 'Kuva: Jack de Nijs / Anefo, Nationaal Archief, Wikimedia Commons (CC0).',
        tekija: 'Jack de Nijs (Anefo)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Elfstedentocht_1963._Dokkum._Kleindiep_met_Bonte_Brug,_Bestanddeelnr_914-7253.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Dokkum',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka sai marttyyrikuoleman Dokkumissa vuonna 754?',
      'Mitä Dokkumin linnoitusten muureja kutsutaan?',
    ],
    korostukset: ['Bonifatius|Bonifatiuksen'],
    nappi: 'Friisiläinen muurikaupunki, jossa pyhä Bonifatius sai marttyyrikuoleman',
    // 5.99805556 E / 53.32694444 N — en-Wikipedia "Dokkum"
    laudat: {
      maailmankartta: { x: 6033.3, y: 1242.5 },
      europe: { x: 326.4, y: 491.1 },
    },
    teksti: 'Dokkum on linnoitettu kaupunki Friisinmaalla Pohjois-Alankomaissa, ja sen hyvin '
      + 'säilyneitä puolustusvalleja kutsutaan nimellä bolwerken. Kaupungin historian '
      + 'tunnetuin tapahtuma on anglosaksisen lähetyssaarnaajan Bonifatiuksen '
      + 'marttyyrikuolema vuonna 754. Dokkum sai kaupunkioikeudet vuonna 1298, ja vuonna 1572 '
      + 'espanjalaiset ryöstivät sen, kun kaupunki oli liittynyt hollantilaiseen kapinaan. '
      + 'Friisinmaan amiraliteetti perustettiin Dokkumiin 1597, mutta se siirrettiin '
      + 'Harlingeniin vuonna 1645. Katolilaiset rakensivat kaupungin ulkopuolelle 1923 '
      + 'Bonifatiuksen puiston, jonka keskellä on kaivo, jonka he uskoivat (virheellisesti) '
      + 'nousseen pyhimyksen kuoleman paikalta.',
    lahde: 'en-Wikipedia "Dokkum", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-oudewater',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-oudewater-fb0426b7.jpg',
      lyhyt: 'Oudewaterin Heksenwaag, porrasgaabelinen tiilirakennus kadunkulmassa.',
      selite: 'Oudewaterin vaakatalo (Heksenwaag), jossa epäiltyjä noitia punnittiin. Julkisivussa on porrastettu tiilipääty, jonka huipulla on kiviveistos.',
      lahde: 'Valokuva: Rumex12, Wikimedia Commons (CC BY-SA 3.0 nl).',
      tekija: 'Rumex12',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oudewater-Waag.jpg',
      lisenssi: 'CC BY-SA 3.0 nl',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-oudewater-d1fd912f.jpg',
        lyhyt: 'Heksenwaagin sisätila: iso puuvaaka, painot ja Pyhän Yrjön kohokuva.',
        selite: 'Mustavalkoinen sisäkuva Oudewaterin Waagista, jossa näkyvät köysiin ripustettu punnitusvaaka, painot ja seinällä Pyhän Yrjön ja lohikäärmeen hiekkakivinen kohokuva.',
        lahde: 'Valokuva: Gerard Dukker (Rijksdienst voor het Cultureel Erfgoed), Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Gerard Dukker (Rijksdienst voor het Cultureel Erfgoed)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Interieur,_weegschaal_en_zandstenen_reli%C3%ABf_van_St._Joris_-_Oudewater_-_20376417_-_RCE.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-oudewater-ac4aeb87.jpg',
        lyhyt: 'Vuoden 1745 piirros esittää Oudewaterin vaakataloa ja torin puita.',
        selite: 'Hendrik de Winterin lavieerattu mustepiirros vuodelta 1745: vaakatalon porrasgaabeli, torin puut ja kaksi työmiestä, joista toinen vierittää tynnyriä ja toinen kantaa säkkiä.',
        lahde: 'Piirros: Hendrik de Winter, Wikimedia Commons (CC0).',
        tekija: 'Hendrik de Winter',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:De_Waag_te_Oudewater_D_Waag_tot_Oudewaatter_(titel_op_object),_RP-T-1888-A-1832.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Oudewater',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä on Oudewaterin Heksenwaag?',
      'Millä uskomuksella noidan painoa arvioitiin?',
    ],
    korostukset: ['noitavaaka|noitavaa\'asta'],
    nappi: 'Kaupunki, jonka vaaka julisti syytetyt ei-noidiksi',
    // 4.86666667 E / 52.01666667 N — en-Wikipedia "Oudewater"
    laudat: {
      maailmankartta: { x: 5995.6, y: 1301.4 },
      europe: { x: 304.6, y: 525.6 },
    },
    teksti: 'Oudewater on kaupunki Utrechtin maakunnassa; se sai kaupunkioikeudet vuonna 1265. '
      + 'Kaupunki on kuuluisa Heksenwaagista eli noitavaa\'asta: punnitusrakennus tuli '
      + 'tunnetuksi 1500-luvun noitaoikeudenkäyntien aikaan, koska syytetyille tarjottiin '
      + 'siellä reilu mahdollisuus todistaa syyttömyytensä, toisin kuin monin paikoin, joissa '
      + 'vaa\'at oli vääristetty. Ihmisiä matkusti punnittavaksi kaikkialta Euroopasta, ja he '
      + 'saivat virallisen todistuksen, ettei heitä katsottu noidiksi. Taustalla oli vanha '
      + 'uskomus, että noidalla ei ole sielua ja hän painaa siksi selvästi tavallista ihmistä '
      + 'vähemmän. Oudewater oli 1500- ja 1600-luvulla myös tärkeä köyden valmistuskeskus, ja '
      + 'siellä on yhä köysimuseo.',
    lahde: 'en-Wikipedia "Oudewater", johdanto-osa ja osiot "History" ja "Witches\' scales" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mihin vanhaan uskomukseen noitavaa\'an punnitus perustui?',
      vaihtoehdot: [
        'Noita painaa tavallista enemmän raskaan synnin vuoksi',
        'Noidan paino vaihtelee kuun vaiheiden mukaan',
        'Noidalla ei ole sielua, joten hän painaa selvästi tavallista vähemmän',
        'Noidan paino on aina sama kuin hänen isänsä painoi',
      ],
      oikea: 2,
      fakta: 'Oudewaterissa ketään ei koskaan todettu oikeaksi noidaksi.',
    },
  },
  {
    id: 'hahmotelma-kampen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-kampen-a1a0eb7b.jpg',
      lyhyt: 'Kampenin Bovenkerk ja Koornmarktspoort nousevat IJssel-joen taakse.',
      selite: 'Näkymä IJsselin yli Kampeniin: kaupungin yllä kohoaa Bovenkerkin teräväkärkinen torni ja oikealla näkyy Koornmarktspoort-porttitorni.',
      lahde: 'Valokuva: Gouwenaar, Wikimedia Commons (CC0).',
      tekija: 'Gouwenaar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20150909_Zicht_op_Kampen_met_Bovenkerk_en_Koornmarktspoort.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-kampen-eda00da3.jpg',
        lyhyt: 'Kampenin Cellebroederspoort, kaksitorninen tiilinen kaupunginportti.',
        selite: 'Cellebroederspoort on Kampenin vanhankaupungin portti, jonka kahta terävää kattokartiota ja tiilijulkisivun kaarikäytävää katsotaan alhaalta.',
        lahde: 'Valokuva: Steven Lek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Steven Lek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cellebroederspoort_Kampen_2019.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kampen',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Kampenin vauraus hiipui?',
      'Kuinka nopeasti Kampenin silta rakennettiin vuonna 1448?',
    ],
    korostukset: ['Koornmarktpoort|Koornmarktpoort'],
    nappi: 'IJssel-joen hansakaupunki, jonka silta rakennettiin viidessä kuukaudessa',
    // 5.91666667 E / 52.55 N — en-Wikipedia "Kampen, Overijssel"
    laudat: {
      maailmankartta: { x: 6030.6, y: 1277.5 },
      europe: { x: 324.8, y: 511.5 },
    },
    teksti: 'Kampen on entinen hansakaupunki Overijsselin maakunnassa IJssel-joen alajuoksulla. '
      + 'Kaupunki sai kaupunkioikeudet vuonna 1236 ja liittyi virallisesti Hansaan vuonna '
      + '1441; kauppareitin varrella Zuiderzeen ja Reinin välillä siitä kehittyi yksi '
      + 'Pohjois-Alankomaiden suurimmista kaupungeista 1300–1500-luvulla. Vuonna 1448 Hansa '
      + 'hyväksyi joen ylittävän sillan rakentamisen, ja hanke valmistui vain viidessä '
      + 'kuukaudessa. Kampenin vauraus alkoi kuitenkin hiipua vuodesta 1430, kun IJssel alkoi '
      + 'liettyä. Vanhassa kaupungissa on yhä muurin jäänteitä, joihin kuuluu kolme '
      + 'kaupunginporttia; yksi niistä on 1300-luvulta peräisin oleva Koornmarktpoort.',
    lahde: 'en-Wikipedia "Kampen, Overijssel", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-hoorn',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-hoorn-f406482c.jpg',
      lyhyt: 'Hoornin satama, jossa purjelaivoja ja Hoofdtoren-torni.',
      selite: 'Näkymä Hoornin satamaan Oude Doelenkaden suunnasta: perinteisiä purjealuksia laiturissa, porrasgaabelitaloja rannalla ja keskellä Hoofdtoren-torni.',
      lahde: 'Valokuva: Michielverbeek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Michielverbeek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hoorn,_de_Haven_vanaf_de_Oude_Doelenkade_met_de_Hoofdtoren_RM22411_IMG_9177_2021-05-30_10.26.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-hoorn-fe4cc436.jpg',
        lyhyt: 'Hendrick Vroomin maalaus vuodelta 1622 esittää Hoornin merenpuolelta.',
        selite: 'Hendrick Cornelisz Vroomin maalauksessa Hoornin kaupunki siintää kaukana, ja etualalla purjehtii isoja purjelaivoja ja soutuvene.',
        lahde: 'Maalaus: Hendrick Cornelisz Vroom, Wikimedia Commons (public domain).',
        tekija: 'Hendrick Cornelisz Vroom',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gezicht_op_Hoorn_van_Hendrick_Cornelisz_Vroom_1622_Westfries_Museum_Hoorn.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-hoorn-953cdb10.jpg',
        lyhyt: 'Westfries Museum ja J. P. Coenin patsas Hoornin Roode Steen -torilla.',
        selite: 'Hoornin Roode Steen -tori: vasemmalla värikäs Westfries Museumin renessanssijulkisivu, keskellä museon sisäänkäynti ja torin laidalla Jan Pieterszoon Coenin patsas.',
        lahde: 'Valokuva: Dqfn13, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Dqfn13',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Westfries_Museum,_Hoorn.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hoorn',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Minkä mukaan Hornin niemi on nimetty?',
      'Mikä yhtiö piti Hornissa toimipaikkaansa?',
    ],
    korostukset: ['Hornin niemi|Hornin niemi'],
    nappi: 'Entinen VOC:n satama, jonka mukaan Hornin niemi on nimetty',
    // 5.06666667 E / 52.65 N — en-Wikipedia "Hoorn"
    laudat: {
      maailmankartta: { x: 6002.2, y: 1273 },
      europe: { x: 308.5, y: 508.9 },
    },
    teksti: 'Hoorn on kaupunki Luoteis-Alankomaissa Pohjois-Hollannin maakunnassa, ja se on '
      + 'Länsi-Friisin perinteinen pääkaupunki. Kaupunki sai kaupunkioikeudet vuonna 1357 ja '
      + 'kukoisti Alankomaiden kulta-aikana, kun siitä kehittyi vauras satamakaupunki ja yksi '
      + 'Hollannin Itä-Intian kauppakomppanian (VOC) kuudesta kamarista. Hornin kauppalaivat '
      + 'toivat Itä-Intiasta mausteita, kuten pippuria, muskottipähkinää ja neilikkaa. Vuonna '
      + '1619 Jan Pieterszoon Coen perusti Hollannin Itä-Intian pääkaupungin, jonka hän aikoi '
      + 'nimetä Uudeksi Horniksi mutta josta tuli Batavia. Vuonna 1616 hornilainen '
      + 'merenkulkija Willem Schouten kiersi Etelä-Amerikan eteläisimmän kärjen ja nimesi sen '
      + 'kotikaupunkinsa mukaan: Hornin niemi on saanut nimensä Hoornista.',
    lahde: 'en-Wikipedia "Hoorn", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-het-loo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-het-loo-3d533505.jpg',
      lyhyt: 'Het Loon palatsin etuosa ja esipiha puiden reunustaman käytävän päästä nähtynä.',
      selite: 'Apeldoornin lähellä sijaitseva entinen kuninkaallinen residenssi Paleis Het Loo. Punatiilinen päärakennus ja sivusiivet ympäröivät laajaa esipihaa.',
      lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zairon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Apeldoorn_Paleis_Het_Loo_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-het-loo-b753b435.jpg',
        lyhyt: 'Palatsin puutarhan puoleinen julkisivu portaineen ja veistoksineen.',
        selite: 'Het Loon palatsin puutarhan puoleinen julkisivu: keskellä kolmiopääty ja kultainen ovi, edessä leveä porrasnousu ja pihan muotoon leikattuja pensasaidanteita.',
        lahde: 'Valokuva: Remi Mathis, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Remi Mathis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Het_Loo_Palace_-_facade_from_the_gardens.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-het-loo-29ef1ac1.jpg',
        lyhyt: 'Vanha kaiverrus Het Loon palatsista ja puutarhoista ylhäältä nähtynä 1600-luvun lopulla.',
        selite: 'Bastiaen Stopendaelin kaiverrus (1689–1693) esittää palatsia, esipihaa ja muodollisia barokkipuutarhoja lintuperspektiivistä, aikana jolloin paikka oli Vilhelm III:n hallussa.',
        lahde: 'Kuva/Maalaus/Kaiverrus: Bastiaen Stopendael, Wikimedia Commons (CC0).',
        tekija: 'Bastiaen Stopendael',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gezicht_op_Paleis_Het_Loo,_Bastiaen_Stopendael,_1689_-_1693.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Het Loon palatsi',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kenelle Het Loon palatsi rakennettiin?',
      'Mitä Royal Loo Hawking Club teki?',
    ],
    korostukset: ['Het Loo|Het Loon'],
    nappi: 'Oranian barokkipalatsi, jossa kuningas Vilhelm III viettää aikaansa maalaisherrana',
    // 5.945833 E / 52.234167 N — en-Wikipedia "Het Loo Palace"
    laudat: {
      maailmankartta: { x: 6031.5, y: 1291.7 },
      europe: { x: 325.4, y: 519.8 },
    },
    teksti: 'Het Loon palatsi on Apeldoornissa sijaitseva Oranian-Nassaun suvun rakennuttama '
      + 'barokkipalatsi. Symmetrinen hollantilaisbarokkinen rakennus valmistui vuosina '
      + '1684–1686 Alankomaiden käskynhaltijalle Vilhelm III:lle ja hänen puolisolleen Maria '
      + 'II:lle, jotka hallitsivat yhdessä Englantia, Irlantia ja Skotlantia; rakennuksen '
      + 'suunnittelivat Jacob Roman ja Johan van Swieten ja puutarhan Claude Desgots. '
      + 'Kuningas Vilhelm I piti paikasta kovasti ja salli 1800-luvun alussa '
      + 'haukkametsästyksen elvyttämisen palatsin alueella, ja hänen pojanpoikansa liittyivät '
      + 'Royal Loo Hawking Clubiin. Vilhelm III vietti palatsissa mielellään aikaansa '
      + 'maalaisherrana ja kuoli siellä marraskuussa 1890. Vuodesta 1984 palatsi on ollut '
      + 'valtion museo.',
    lahde: 'en-Wikipedia "Het Loo Palace", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-borger',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-borger-323a3ae3.jpg',
      lyhyt: 'Hunebed D27 Borgerissa: jättimäisistä siirtolohkareista rakennettu kivikautinen hauta metsässä.',
      selite: 'Hunebed D27 Borgerin lähellä Drenthessä. Massiiviset kivilohkareet muodostavat pitkän kiviarkun, jonka päällä lepäävät valtavat kansikivet.',
      lahde: 'Kuva/Maalaus/Kaiverrus: Alex Hoekerd, Wikimedia Commons (CC0).',
      tekija: 'Alex Hoekerd',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hunebed_Borger_1.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-borger-04df52b0.jpg',
        lyhyt: 'Ilmakuva Borgerin hunebedistä: kivet riviin asetettuina metsäaukion keskellä.',
        selite: 'Ylhäältä otettu kuva Borgerin hunebedistä. Kivilohkareiden rivi erottuu selvästi ympäröivien puiden keskeltä.',
        lahde: 'Valokuva: Wdejager, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Wdejager',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hunebed_Borger.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Borger',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuinka pitkä Borgerin hunebed D27 on?',
      'Mitä vuoden 1984 löydöt paljastivat hunebedin iästä?',
    ],
    korostukset: ['hunebed|hunebed'],
    nappi: 'Drenthen kylä, jonka maasta kohoaa Alankomaiden suurin kivikautinen jättiläishauta',
    // 6.8 E / 52.91666667 N — en-Wikipedia "Borger, Netherlands"
    laudat: {
      maailmankartta: { x: 6060, y: 1261 },
      europe: { x: 341.8, y: 501.9 },
    },
    teksti: 'Borger on kylä Drenthen maakunnassa Alankomaissa, noin 18 kilometriä Assenista '
      + 'itään. Kylässä on Alankomaiden suurin hunebed eli kivinen jättiläishauta, D27, jolla '
      + 'on oma museonsa. Hunebed on 22,5 metriä pitkä, ja siinä on yhdeksän kansikiveä, 26 '
      + 'sivukiveä ja kaksi lukkokiveä. Vuonna 1865 Titia Brongersma teki hautaan '
      + 'amatöörikaivauksen ja löysi saviastioita ja luita, mutta yksikään löytö ei ole '
      + 'säilynyt. Vuonna 1984 paikallinen nuori löysi lisää saviastian palasia ja luita, '
      + 'jotka ajoittuivat yllättäen pronssikaudelle, paljon odotettua myöhemmäksi.',
    lahde: 'en-Wikipedia "Borger, Netherlands", johdanto-osa ja osio "Dolmen" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-elburg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-elburg-a651fa89.jpg',
      lyhyt: 'Vanha ilmakuva Elburgin vanhastakaupungista, jossa katuverkko on säännöllisenä ruudukkona.',
      selite: 'KLM Aerophoton vanha ilmakuva Elburgista: kaupungin ruudukkomainen asemakaava, kirkko ja ympäröivä vallihautojen vyöhyke näkyvät selvästi. Kuvan etualalla on Zuiderzeetramwegin raitiovaunuvarikko.',
      lahde: 'Kuva/Maalaus/Kaiverrus: KLM Aerophoto, Wikimedia Commons (public domain).',
      tekija: 'KLM Aerophoto',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Elburg_met_Zuiderzeetram.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-elburg-ea955ea7.jpg',
        lyhyt: 'Elburgin satama, jossa vanhoja purjealuksia ja perinteisiä puuveneitä.',
        selite: 'Kuva Elburgin satamasta vuonna 2020. Etualalla on perinteinen puuvene, taustalla mastoja ja satamarakennuksia.',
        lahde: 'Valokuva: Richard Broekhuijzen, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Richard Broekhuijzen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Elburg_-_Haven_2020.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-elburg-6498edb9.jpg',
        lyhyt: 'Näkymä kirkontornista Elburgin punakattoisten talojen yli Veluwemerelle.',
        selite: 'Elburgin vanhakaupunki kirkon tornista nähtynä: tiiviisti rakennetut talot ja puuistutuksin reunustettu kaupungin ulkolaita sekä Veluwemeri taustalla. Kuvan oikeassa reunassa on Vischpoortin torni.',
        lahde: 'Valokuva: Spotter2, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Spotter2',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Elburg_(Nederland)_-_stadszicht_2008.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Elburg',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi rautatie ohitti Elburgin?',
      'Mikä Elburgissa on erikoista kaupunkisuunnittelun kannalta?',
    ],
    korostukset: ['ruudukkokaava|ruudukkokaava'],
    nappi: 'Ruudukkokaavainen muurikaupunki, jonka ohi rautatie kulki 1863',
    // 5.85 E / 52.45 N — en-Wikipedia "Elburg"
    laudat: {
      maailmankartta: { x: 6028.3, y: 1282 },
      europe: { x: 323.5, y: 514.2 },
    },
    teksti: 'Elburg on kaupunki Gelderlandin maakunnassa Alankomaissa. Vanhin säilynyt '
      + 'kirjallinen maininta on vuodelta 796, ja kaupunki liittyi Hansaan vuonna 1367. '
      + 'Vuosina 1392–1396 Elburg rakennettiin uudelleen nopeasti vallihaudoin, '
      + 'kaupunginmuurein ja ruudukkokaavaisin katuverkoin, mikä osoittaa sen olleen '
      + 'keskiajalla varakas. Vuonna 1863 kaupunki kieltäytyi käyttämästä varojaan '
      + 'rautatieaseman rakentamiseen, koska maanomistajat pyysivät kohtuuttomia hintoja '
      + 'radan alta, ja Utrechtin, Amersfoortin ja Zwollen välinen rata ohitti sen. '
      + 'Kalastuksella ja maanviljelyllä elänyt kaupunki menetti kalastuksensa, kun '
      + 'Zuiderzeen sulkeminen vuonna 1932 muutti murtoveden makeaksi.',
    lahde: 'en-Wikipedia "Elburg", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-keukenhof',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-keukenhof-320a573e.jpg',
      lyhyt: 'Punaisia ja vaaleanpunaisia tulppaaneja Keukenhofin puistossa, taustalla kukkiva puu.',
      selite: 'Tulppaanipenkkejä Keukenhofin puutarhassa Lissessä. Kirjavat tulppaanit täyttävät etualan, ja taustalla nurmikon ja penkkien takana kohoaa vaaleanpunaisena kukkiva puu.',
      lahde: 'Valokuva: Elena.laps, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Elena.laps',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tulips_and_tree_at_Keukenhof_gardens.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-keukenhof-8803e658.jpg',
        lyhyt: 'Lähikuva vaaleanpunaisista, punajuovaisista tulppaaneista Keukenhofissa.',
        selite: 'Tulppaaneja lähikuvassa Keukenhofissa Lissessä huhtikuussa 2018. Terälehtiä koristavat punaiset juovat.',
        lahde: 'Valokuva: Atamari, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Atamari',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Keukenhof_2018_DSC_0059.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-keukenhof-a7021a3c.jpg',
        lyhyt: 'Keukenhofin linna, punatiilinen kartano torneineen.',
        selite: 'Kasteel Keukenhof Lissessä: tiilinen linna, jossa on kaksi kartiomaista tornia ja koristeellinen etuosa. Linnan ympärillä on puutarha.',
        lahde: 'Valokuva: MPhernambucq, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'MPhernambucq',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kasteel_Keukenhof_Lisse.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Keukenhof',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mitä Keukenhof-nimi tarkoittaa?',
      'Kuka rakensi Keukenhofin nykyiseksi kukkapuistoksi?',
    ],
    korostukset: ['Zocher|Zocher'],
    nappi: 'Lissen linnan keittiöpuutarha, jonka Zocherit muotoilivat 1857; tulppaanipuisto tulee vasta 1949',
    // 4.546365 E / 52.271256 N — en-Wikipedia "Keukenhof"
    laudat: {
      maailmankartta: { x: 5984.9, y: 1290 },
      europe: { x: 298.5, y: 518.9 },
    },
    teksti: 'Keukenhof on Lissen kunnassa Etelä-Hollannissa sijaitseva puisto, joka on yksi '
      + 'maailman suurimmista kukkapuutarhoista. Nimi tarkoittaa keittiöpuutarhaa: alue oli '
      + '1400-luvulla Teylingenin linnan metsästysmaita ja linnan keittiötarha, ja sen '
      + 'tunnetuin asukas oli kreivitär Jacoba van Beieren. Vuonna 1641 alueelle rakennettiin '
      + 'kartano, josta on tullut Keukenhofin linna, ja vuonna 1857 maisema-arkkitehdit Jan '
      + 'David Zocher ja hänen poikansa Louis Paul Zocher suunnittelivat puiston uudelleen '
      + 'englantilaiseen tyyliin. Nykyinen kukkapuisto perustettiin vuonna 1949 '
      + 'kukkasipulinviljelijöiden konsortion voimin, ja se aukesi yleisölle 1950. Vuosittain '
      + 'istutetaan noin seitsemän miljoonaa sipulia, ja puisto on yleisölle auki vain '
      + 'kahdeksan viikon ajan maaliskuun puolivälistä toukokuun puoliväliin.',
    lahde: 'en-Wikipedia "Keukenhof", johdanto-osa ja osiot "History" ja "Gardens" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mitä Keukenhof-nimi tarkoittaa?',
      vaihtoehdot: [
        'Tulppaanien puutarhaa',
        'Kreivittären linnaa',
        'Kukkasipulien varastoa',
        'Keittiöpuutarhaa',
      ],
      oikea: 3,
      fakta: 'Jokaiseen istutuskohtaan pannaan kolme sipulia päällekkäin, jotta kukinta jatkuu '
        + 'koko kahdeksan viikon ajan.',
    },
  },
  {
    id: 'hahmotelma-gouda',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-gouda-0e895a8c.jpg',
      lyhyt: 'Goudan juustotori: oranssit juustopyörät kadulla ja hevoskärryt Stadhuisin edessä.',
      selite: 'Goudan perinteinen juustomarkkina torin kivetyksellä. Juustopyörät on asetettu riveihin valkoisten liinojen päälle, ja hevoset vetävät juustokuormaa. Taustalla kohoaa kaupungintalo Stadhuis.',
      lahde: 'Valokuva: Ralf Roletschek, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Ralf Roletschek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:13-06-27-gouda-by-RalfR-127.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-gouda-f01e458e.jpg',
        lyhyt: 'Goudan Waag eli vaakatalo, jonka julkisivussa on suuri reliefi ja vaakuna.',
        selite: 'Goudan Waag, entinen punnitusrakennus, kaupungin torin laidalla. Julkisivun kolmiopäädyssä on vaakuna ja keskellä kivireliefi.',
        lahde: 'Kuva/Maalaus/Kaiverrus: Andy Li, Wikimedia Commons (CC0).',
        tekija: 'Andy Li',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:De_Goudse_Waag_2024-12-01.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-gouda-46cfcca4.jpg',
        lyhyt: 'Goudan Stadhuis, kaupungintalo, jonka julkisivulla on punavalkoiset ikkunaluukut.',
        selite: 'Goudan kaupungintalo Stadhuis Markt-torilla. Rakennuksen julkisivun porrasmainen pääty ja punavalkoiset ikkunaluukut näkyvät kuvassa selvästi.',
        lahde: 'Valokuva: Steven Lek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Steven Lek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:City_hall_Gouda.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Gouda',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Missä Goudan juusto valmistetaan?',
      'Mitä Goudan Waagissa punnittiin?',
    ],
    korostukset: ['Goudan juusto|Goudan juusto'],
    nappi: 'Juuston kauppapaikka, jonka vaa\'assa juusto punnitaan',
    // 4.71111111 E / 52.01111111 N — en-Wikipedia "Gouda, South Holland"
    laudat: {
      maailmankartta: { x: 5990.4, y: 1301.6 },
      europe: { x: 301.7, y: 525.7 },
    },
    teksti: 'Gouda on noin 75 000 asukkaan kaupunki Etelä-Hollannissa Rotterdamin ja Utrechtin '
      + 'välissä. Kaupunki tunnetaan Goudan juustosta, stroopwafeleista, kanaaleistaan, '
      + 'tupakkapiipuistaan ja 1400-luvun kaupungintalostaan. Juustoa ei valmisteta itse '
      + 'kaupungissa vaan sen ympäristössä; se on saanut nimensä siitä, että sitä kaupataan '
      + 'Goudassa, jossa kaupunginvaltuusto valvoo laatua tiukasti. Goudan Waag eli '
      + 'punnitusrakennus valmistui vuonna 1667, ja siellä punnittiin tavaroita, erityisesti '
      + 'juustoa, verojen määräämiseksi. Juustokauppaa käydään yhä perinteisellä torilla joka '
      + 'torstai.',
    lahde: 'en-Wikipedia "Gouda, South Holland", johdanto-osa ja osiot "Economy" ja "Sights" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Missä Goudan juusto valmistetaan?',
      vaihtoehdot: [
        'Itse Goudan kaupungissa',
        'Kaupungin ympäristössä',
        'Zuiderzeen saarilla',
        'Waag-rakennuksen kellarissa',
      ],
      oikea: 1,
      fakta: 'Goudassa oli aikoinaan myös pellavateollisuutta ja useita olutpanimoita.',
    },
  },
  {
    id: 'hahmotelma-edam',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-edam-73c03c10.jpg',
      lyhyt: 'Edamin Kaaswaag eli juustovaaka, jonka edessä on kärry täynnä oransseja juustopyöriä.',
      selite: 'Kaaswaag Edamissa: tiilirakennuksen julkisivussa on maalattuja kaarikenttiä ja vaakuna, ja avoimen katoksen alla juustokauppa. Etualalla on juustopyörillä lastattu kärry.',
      lahde: 'Kuva/Maalaus/Kaiverrus: Gouwenaar, Wikimedia Commons (CC0).',
      tekija: 'Gouwenaar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kaaswaag_Edam.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-edam-73cccb63.jpg',
        lyhyt: 'Matthijs Tinxgracht -kanava Edamissa, taustalla kellotorni.',
        selite: 'Edamin rauhallinen kanava, Matthijs Tinxgracht, itkupajun ja lehtipuiden reunustamana. Taustalla kohoaa kaupungin Speeltoren-kellotorni.',
        lahde: 'Kuva/Maalaus/Kaiverrus: Gouwenaar, Wikimedia Commons (CC0).',
        tekija: 'Gouwenaar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Matthijs_Tinxgracht_met_speeltoren_Edam.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-edam-36f16a55.jpg',
        lyhyt: 'Perinteinen juustomarkkina Edamin torilla: juustopyöriä laatikoissa ja kantajia työssä.',
        selite: 'Edamin juustomarkkinan esitys torilla. Kuvauksen mukaan kyseessä on turisteille järjestetty uudelleenesitys aiemmin pidetystä oikeasta juustotorista.',
        lahde: 'Valokuva: Lupo, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Lupo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kaasmarkt_Edam.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Edam',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mistä Edamin nimi on peräisin?',
      'Miksi Edamin satama mataloitui?',
    ],
    korostukset: ['Edam-juusto|Edam-juusto'],
    nappi: 'Juustokaupungin satama, joka mutaantui umpeen sulkuporttien takia',
    // 5.05 E / 52.51666667 N — en-Wikipedia "Edam, Netherlands"
    laudat: {
      maailmankartta: { x: 6001.7, y: 1279 },
      europe: { x: 308.2, y: 512.4 },
    },
    teksti: 'Edam on noin 7 400 asukkaan kaupunki Pohjois-Hollannissa, ja yhdessä Volendamin '
      + 'kanssa se muodostaa Edam-Volendamin kunnan. Kaupunki tunnetaan Edam-juuston '
      + 'kotipaikkana, ja sen nimi tulee padosta: kaupunki syntyi E- eli IJe-joen padon '
      + 'ääreen Zuiderzeen läheisyyteen, ja noin vuonna 1230 tehdyllä padolla voitiin periä '
      + 'tulleja tavarasiirroista. Edam sai kaupunkioikeudet vuonna 1357, ja 1500-luvulla '
      + 'siellä oli jopa 33 telakkaa. Juustokauppa oli 1500-luvulla kaupungin tärkein '
      + 'elinkeino, ja keisari Kaarle V antoi Edamille oikeuden viikkotoriin vuonna 1526; '
      + 'vuonna 1544 hän määräsi sataman suljettavaksi sulkuportein, minkä jälkeen satama '
      + 'liettyi ja laivanrakennus taantui.',
    lahde: 'en-Wikipedia "Edam, Netherlands", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-leiden',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-leiden-876be778.jpg',
      lyhyt: 'Leidenin yliopiston Academiegebouw nousee Rapenburg-kanavan varrella Nonnenbrug-sillan vieressä.',
      selite: 'Punatiilinen Academiegebouw kellotorneineen näkyy Rapenburg-kanavan toiselta puolelta, etualalla kukilla koristeltu Nonnenbrug-silta. Rakennus on Leidenin yliopiston vanhin.',
      lahde: 'Valokuva: FrDr, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'FrDr',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Leiden_-_Rapenburg,_Academiegebouw_en_Nonnenbrug.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-leiden-7276b931.jpg',
        lyhyt: 'Leidenin Burchtin pyöreä tiilimuuri ja ylhäällä hammaslinnoitusta muistuttava reunus kummun päällä.',
        selite: 'Burcht on Leidenin keskustan kummulle rakennettu pyöreä linnoitus, jonka takasivu näkyy kuvassa ruskeana tiilimuurina, punaisena ovena ja hammastettuna reunana.',
        lahde: 'Valokuva: Johan Bakker, Wikimedia Commons (CC BY-SA 3.0 NL).',
        tekija: 'Johan Bakker',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:35904_Burcht_Leiden_Achterkant.jpg',
        lisenssi: 'CC BY-SA 3.0 NL',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-leiden-5a886cb1.jpg',
        lyhyt: 'Leidenin Hortus botanicus: lampi, palmuja ja kasviruukkuja sekä taustalla kellotorni.',
        selite: 'Kuva esittää Leidenin yliopiston kasvitieteellistä puutarhaa, Hortus botanicusta, jossa lammen takana kasvaa palmuja ja agaveja ruukuissaan.',
        lahde: 'Valokuva: Roger Veringmeier, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Roger Veringmeier',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hortus_botanicus_Leiden.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Leiden',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Leidenin yliopisto perustettiin?',
      'Mikä on Leidenin pullo?',
    ],
    korostukset: ['Leidenin yliopisto|Leidenin yliopisto'],
    nappi: 'Piiritetty kaupunki, jonka yliopisto perustettiin 1575 uskollisuuden palkaksi',
    // 4.49 E / 52.16 N — en-Wikipedia "Leiden"
    laudat: {
      maailmankartta: { x: 5983, y: 1295 },
      europe: { x: 297.4, y: 521.8 },
    },
    teksti: 'Leiden on Etelä-Hollannin kaupunki, jossa on ollut yliopisto vuodesta 1575; Leidenin '
      + 'yliopisto on Alankomaiden vanhin, ja kaupungin tunnuslause on Löytöjen kaupunki. '
      + 'Espanjalaiset piirittivät kaupunkia touko–lokakuussa 1574, ja piiritys päättyi, kun '
      + 'padot avattiin ja laivat pääsivät tuomaan ruokaa kaupunkilaisille; piirityksen '
      + 'päättymistä juhlitaan yhä joka vuosi 3. lokakuuta. Oranian Vilhelm I perusti '
      + 'yliopiston palkkioksi kaupungin sankarillisesta puolustuksesta, ja perinteen mukaan '
      + 'kaupunkilaiset saivat valita yliopiston ja verovapauden väliltä. Leidenissä on tehty '
      + 'monia löytöjä, kuten Snellin laki ja Pieter van Musschenbroekin vuonna 1746 keksimä '
      + 'Leidenin pullo, ja maalari Rembrandt syntyi ja kouluttautui kaupungissa.',
    lahde: 'en-Wikipedia "Leiden", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi Oranian Vilhelm I perusti Leidenin yliopiston?',
      vaihtoehdot: [
        'Palkkioksi kaupungin sankarillisesta puolustuksesta',
        'Rangaistukseksi kaupungin kapinasta',
        'Espanjan kuninkaan käskystä',
        'Tuhoutuneen luostarin korvaajaksi',
      ],
      oikea: 0,
      fakta: 'Leidenin piirityksen aikana kaupungissa lyötiin Euroopan ensimmäinen paperiraha, kun '
        + 'hopea loppui ja rukouskirjojen paperia leimattiin rahaleimasimilla.',
    },
  },
  {
    id: 'hahmotelma-hindeloopen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-hindeloopen-38efc253.jpg',
      lyhyt: 'Hindeloopenin satamasuu ja purjeveneitä IJsselmeerin rannalla.',
      selite: 'Kuvan kuvauksen mukaan näkymä on Hindeloopenin satamasta IJsselmeerille päin. Oikealla on kalastusalus ja purjeveneiden mastoja, vasemmalla satamaan johtavan aallonmurtajan rakenne.',
      lahde: 'Valokuva: Gouwenaar, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Gouwenaar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20190717_Haven_van_Hindeloopen.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-hindeloopen-4f2b00d4.jpg',
        lyhyt: 'Hindeloopenin huone museossa: sinivalkoiset laatat, kukkakoristeeksi maalattu pöytä ja maalattu kaappi.',
        selite: 'Fries Museumin Hindelooper kamer -näyttelyhuoneessa seinät on päällystetty sinivalkoisilla laatoilla. Huoneen esineet, kuten pöytä ja kaappi, on koristeltu Hindeloopenille tyypillisellä kukkamaalauksella.',
        lahde: 'Valokuva: Weetjesman, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Weetjesman',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hindelooper_kamer_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-hindeloopen-10d51bd8.jpg',
        lyhyt: 'Hindeloopenin kirkko ja sen kellotorni sekä oikealla museorakennus.',
        selite: 'Kuvan kuvauksen mukaan kuvassa on Hindeloopenin kirkko Friisinmaalla, ja oikealla näkyy Museum Hindeloopenin rakennus.',
        lahde: 'Valokuva: Wutsje, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Wutsje',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20080504_Church_Hindeloopen_NL.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Hindeloopen',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mistä Hindeloopenin oma kieli syntyi?',
      'Mitä ankkuri talon julkisivussa kertoi?',
    ],
    korostukset: ['ankkuri|ankkuri'],
    nappi: 'Merikapteenien kaupunki, jonka huonekalut ja seinät maalataan kirjaviksi',
    // 5.4 E / 52.95 N — en-Wikipedia "Hindeloopen"
    laudat: {
      maailmankartta: { x: 6013.3, y: 1259.5 },
      europe: { x: 314.9, y: 501 },
    },
    teksti: 'Hindeloopen on vanha kaupunki Pohjois-Alankomaissa Friisinmaalla IJsselmeerin '
      + 'rannalla, ja se tunnetaan Hindeloopenin taiteesta ja kansallispuvusta. Kaupunki sai '
      + 'kaupunkioikeudet vuonna 1225 ja liittyi Hansaan vuonna 1368. Vahvat ulkomaiset '
      + 'yhteydet ja harvat kontaktit sisämaahan johtivat oman Hindeloopenin kielen '
      + 'syntymiseen, joka oli sekoitus länsifriisiä, englantia, tanskaa ja norjaa. '
      + 'Merenkulku toi kaupunkiin vaurautta erityisesti 1600- ja 1700-luvulla, jolloin '
      + 'asukkaat ostivat Amsterdamista kalliita kankaita ja esineitä VOC:n kautta, ja '
      + 'kaupunki kehitti oman pukunsa sekä värikkäät maalatut seinät ja huonekalut. '
      + 'Kapteenin talon julkisivussa roikkuva ankkuri kertoi, että kapteeni saattoi vielä '
      + 'ottaa rahtia vastaan.',
    lahde: 'en-Wikipedia "Hindeloopen", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-urk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-urk-64bf6874.jpg',
      lyhyt: 'Urkin valkoinen majakka talojen takana ja kivetty rantakatu IJsselmeerin rannalla.',
      selite: 'Urkin majakka nousee valkoisena talojen takaa, ja etualalla kulkee kivetty rantakatu. Oikealla aukeaa IJsselmeer, joka oli ennen Zuiderzeen osa.',
      lahde: 'Valokuva: Uberprutser, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Uberprutser',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lighthouse_and_boulevard_Urk.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-urk-7f2e7484.jpg',
        lyhyt: 'Vanha mustavalkoinen valokuva Urkin satamasta, jossa kalastusveneitä on tiiviisti rivissä ja poikia rannalla.',
        selite: 'Kuvan nimi on Urk Harbour. Satamassa on lukuisia purjeveneitä mastot pystyssä, ja etualalla seisoo rivi poikia. Kuva on rajattu kirjan aukeamasta pelkäksi valokuvaksi.',
        lahde: 'Kuva: George Christopher Davies, Rijksmuseum, Wikimedia Commons (CC0).',
        tekija: 'George Christopher Davies (Rijksmuseum)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gezicht_op_de_haven_van_Urk_Urk_Harbour_(titel_op_object),_RP-F-2001-7-1357-12.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-urk-ac7c24fe.jpg',
        lyhyt: 'Urkin kalastajamuistomerkki ja taustalla hollantilaisen uudistetun kirkon (Kerkje aan zee) torni.',
        selite: 'Etualalla on Urkin kalastajamuistomerkin naispatsas ja taustalla Nederlands Hervormde Kerk, Kerkje aan zee, Urkin vanhassa keskustassa.',
        lahde: 'Valokuva: Baykedevries, Wikimedia Commons (CC BY-SA 3.0 NL).',
        tekija: 'Baykedevries',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Visserijmonument_en_Nederlands_Hervormde_Kerk_Urk.jpg',
        lisenssi: 'CC BY-SA 3.0 NL',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en',
      },
    ],
    nimi: 'Urk',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Milloin Urk lakkasi olemasta saari?',
      'Miksi Urkin murre on säilynyt niin omaleimaisena?',
    ],
    korostukset: ['murre|murteen'],
    nappi: 'Kalastajien saari keskellä Zuiderzeetä, jolle pääsee vain veneellä',
    // 5.59861111 E / 52.66305556 N — en-Wikipedia "Urk"
    laudat: {
      maailmankartta: { x: 6020, y: 1272.4 },
      europe: { x: 318.7, y: 508.6 },
    },
    teksti: 'Urk on kaupunki ja kunta Flevolandissa, ja se oli aiemmin saari Almere-sisämeressä, '
      + 'josta tuli Zuiderzeen osa 1200-luvulla. Lemmeristä rakennettu pato vuonna 1939 '
      + 'päätti Urkin saarena olon ja yhdisti sen mantereeseen. Kaupungin elinkeino on aina '
      + 'ollut kalastus, ja Urkilla on Alankomaiden suurin kalastuslaivasto. Urkilaiset ovat '
      + 'tiivis yhteisö, jolla on oma murteensa; se on säilynyt omaleimaisena, koska Urk oli '
      + 'toiseen maailmansotaan asti saari, jolle pääsi vain veneellä. Kalastajien '
      + 'muistomerkki, Urker vrouw, esittää naista, joka katsoo merelle odottaen turhaan '
      + 'miehensä ja poikiensa paluuta.',
    lahde: 'en-Wikipedia "Urk", johdanto-osa ja osiot "History" ja "Dialect" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Miksi Urkin murre on säilynyt omaleimaisena?',
      vaihtoehdot: [
        'Saarella oli vuosisatoja oma kuningas',
        'Murretta suojaa laki jo keskiajalta',
        'Urk oli toiseen maailmansotaan asti saari, jolle pääsi vain veneellä',
        'Kaikki asukkaat ovat muuttaneet mantereelta viime vuosikymmeninä',
      ],
      oikea: 2,
      fakta: 'Kun IJsselmeer syntyi, urkilaiset siirsivät kalastuksensa Pohjanmerelle.',
    },
  },
  {
    id: 'hahmotelma-thorn',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-thorn-184bcb3d.jpg',
      lyhyt: 'Thornin Hofstraat: kivetty katu ja valkoiseksi rapatut talot punaisin tiilikatoin.',
      selite: 'Hofstraat-kadun varrella on valkoisiksi maalattuja tiilitaloja, joissa on ikkunaluukkuja ja kukkia. Kuvassa kolmas talo oikealta on Kolmen tykinkuulan talo.',
      lahde: 'Valokuva: Alupus, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Alupus',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hofstraat_Thorn.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-thorn-0c02bee0.jpg',
        lyhyt: 'Thornin luostarikirkko eli Sint-Michaëlskerk terävine torneineen ja goottilaisine ikkunoineen.',
        selite: 'Kuvassa on Thornin luostarikirkko (Abdijkerk), jonka tiilinen torni ja hiekkakivinen goottilainen runko erottuvat matalan muurin takaa.',
        lahde: 'Valokuva: Bert Kaufmann, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Bert Kaufmann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Thorn_-_Sint-Michaëlkerk.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-thorn-da091bd0.jpg',
        lyhyt: 'Thornin valkoiset talot, oranssit tiilikatot ja pieni kellotapuli.',
        selite: 'Kuvan kuvauksen mukaan kohde on Thornin valkoinen kylä Limburgin maakunnassa. Valkoisten talojen katolla näkyy avoin kellotapuli kelloineen.',
        lahde: 'Valokuva: Microtoerisme, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Microtoerisme',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Juli_2012_Thorn_40.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Thorn',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Thornia kutsutaan valkoiseksi kaupungiksi?',
      'Kuka Thornin luostarivaltiota johti?',
    ],
    korostukset: ['abbedissa|abbedissa'],
    nappi: 'Valkoinen kaupunki Maas-joella, entinen abbedissan pikkuruhtinaskunta',
    // 5.83333333 E / 51.16666667 N — en-Wikipedia "Thorn, Netherlands"
    laudat: {
      maailmankartta: { x: 6027.8, y: 1339.1 },
      europe: { x: 323.2, y: 547.9 },
    },
    teksti: 'Thorn on kaupunki Limburgin maakunnassa Alankomaissa Maas-joen ja Witbeek-puron '
      + 'varrella. Sitä kutsutaan valkoiseksi kaupungiksi, koska keskustan tiilitalot on '
      + 'rapattu valkoisiksi. Alue oli alun perin suota Rooman ajan tien varrella '
      + 'Maastrichtin ja Nijmegenin välillä; noin vuonna 975 Utrechtin piispa Ansfried '
      + 'perusti sinne benediktiiniläisluostarin, josta kehittyi 1100-luvulta alkaen '
      + 'maallinen kanonissayhteisö. Sen johtajana oli abbedissa, jota avusti korkeintaan '
      + 'kaksikymmentä aatelisnaista, ja yhteisö muodostui pieneksi suvereeniksi '
      + 'ruhtinaskunnaksi Pyhässä saksalais-roomalaisessa keisarikunnassa. Ranskan hyökkäys '
      + 'vuosina 1794–1795 ja virallinen lakkauttaminen vuonna 1797 päättivät luostarin ja '
      + 'ruhtinaskunnan olemassaolon.',
    lahde: 'en-Wikipedia "Thorn, Netherlands", koko artikkeli (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-nuenen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-nuenen-6d85025b.jpg',
      lyhyt: 'Nuenenin Van Gogh Village Museum -museon kaareva kuparinruskea julkisivu kylän pääkadun varrella.',
      selite: 'Museorakennus Nuenenin keskustassa on omistettu Vincent van Goghin Nuenenin-vuosille. Uusi rakennus seisoo vanhan tiilirakennuksen vieressä, ja julkisivussa lukee Van Gogh Village Museum.',
      lahde: 'Valokuva: DorineSaes, Wikimedia Commons (CC0).',
      tekija: 'DorineSaes',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Van_Gogh_Village_Museum_exterieur.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-nuenen-736ecf00.jpg',
        lyhyt: 'Van Goghin maalaus Perunansyöjät vuodelta 1885: talonpoikaisperhe syö lampun valossa.',
        selite: 'Vincent van Gogh maalasi Perunansyöjät Nuenenissa, jossa hän asui isänsä pappilassa. Pimeään tupaan lampun alle kokoontunut talonpoikaisväki syö perunoita ja juo teetä.',
        lahde: 'Maalaus: Vincent van Gogh, Wikimedia Commons (public domain).',
        tekija: 'Vincent van Gogh',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_potato_eaters_-_Google_Art_Project.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-nuenen-600e34ef.jpg',
        lyhyt: 'Hildo Kropin graniittinen Van Gogh -muistomerkki Nuenenissa, kiveen kaiverrettu aurinko.',
        selite: 'Hildo Kropin tekemä muistomerkki pystytettiin Nuenenissa vuonna 1932, Van Goghin kuoleman 40-vuotismuistoksi. Sen sijaintina on pappilan ja pienen reformoidun kirkon välinen aukio.',
        lahde: 'Valokuva: Bob MacInnes, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Bob MacInnes',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nuenen_Hildo_Krop_Hommage_aan_Vincent_van_Gogh.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Nuenen',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Kuinka kauan Van Gogh asui Nuenenissa?',
      'Minkä maalauksen sarja huipentui Nuenenissa?',
    ],
    korostukset: ['Perunansyöjät|Perunansyöjät'],
    nappi: 'Pappilan kylä Brabantissa, jonne Vincent van Gogh muuttaa 1883',
    // 5.54666667 E / 51.47333333 N — en-Wikipedia "Nuenen"
    laudat: {
      maailmankartta: { x: 6018.2, y: 1325.5 },
      europe: { x: 317.7, y: 539.9 },
    },
    teksti: 'Nuenen on kaupunki Pohjois-Brabantissa Alankomaissa, jossa taidemaalari Vincent van '
      + 'Gogh asui ja työskenteli vuosina 1883–1885. Hänen isänsä oli tullut kylän pastoriksi '
      + 'vuonna 1882, ja perhe asui pappilassa; Vincent muutti vanhempiensa luo joulukuussa '
      + '1883 oleskeltuaan ensin useita kuukausia Drenthessä, ja hän jäi kylään toukokuuhun '
      + '1885. Sinä aikana hän maalasi lukuisia luonnetutkielmia talonpojista ja kutojista, '
      + 'ja niiden sarja huipentui maalaukseen Perunansyöjät. Hän maalasi myös asetelmia sekä '
      + 'isänsä kirkon, pappilan ja sen puutarhan. Kylä tunnetaan myös toisen maailmansodan '
      + 'Market Garden -operaation taistelusta syyskuussa 1944.',
    lahde: 'en-Wikipedia "Nuenen", johdanto-osa ja osio "Notable residents" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-orvelte',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-orvelte-9295a1c6.jpg',
      lyhyt: 'Orvelten kylän aukio eli dorpsbrink, jonka ympärillä on vanhoja maalaistaloja puiden siimeksessä.',
      selite: 'Kivetyn aukion ympärillä seisoo matalia talonpoikaistaloja, joista yhdessä on olkikatto. Kuva on otettu Drenthen Orvelten kylässä syksyllä.',
      lahde: 'Valokuva: Kris Roderburg, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kris Roderburg',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Overzicht,_dorpsplein_ook_wel_dorpsbrink_-_Orvelte_-_20420088_-_RCE.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-orvelte-5b7a36be.jpg',
        lyhyt: 'Orvelten museokylän olkikattoinen tiilinen maalaistalo ja opastaulu.',
        selite: 'Kuvan kuvauksen mukaan kohde on Drenthen maakunnan Orvelten museokylä. Talossa on olkikatto ja tiiliseinä, ja sen edessä kasvaa kastanjapuu.',
        lahde: 'Valokuva: Antoine, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Antoine',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Museumdorp_Orvelte_Drenthe_Nederland-01.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-orvelte-b7ec0517.jpg',
        lyhyt: 'Flintenweg 2:n olkikattoinen talo punaisine ikkunaluukkuineen Orvelten kylässä.',
        selite: 'Kuvan kuvauksen mukaan kyseessä on Orvelten Flintenweg 2:n tilan asuinosa, joka on suojeltu rakennusmonumentti (rijksmonument).',
        lahde: 'Valokuva: Anthony Ruijtenbeek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Anthony Ruijtenbeek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Flintenweg_2_in_Orvelte_Voorhuis.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Orvelte',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä Orvelten kylässä on erikoista liikenteessä?',
      'Mikä Bruntingerhof on?',
    ],
    korostukset: ['hevosraitiovaunu|hevosraitiovaunu'],
    nappi: 'Drenthen kyläraitti, jonka talot säästetään 1900-luvulla museoksi',
    // 6.65972222 E / 52.84361111 N — en-Wikipedia "Orvelte"
    laudat: {
      maailmankartta: { x: 6055.3, y: 1264.3 },
      europe: { x: 339.1, y: 503.8 },
    },
    teksti: 'Orvelte on kylä Drenthen maakunnassa Alankomaissa, ja se toimii museokylänä. Kylän '
      + 'nimi mainitaan ensimmäisen kerran vuonna 1362, ja se on keskiajalla kehittynyt '
      + 'esdorp-tyyppinen kylä. Bruntingerhof-tila, joka on rakennettu vuosien 1560 ja 1650 '
      + 'välillä, on Drenthen vanhin säilynyt maatila, ja se siirrettiin Orvelteen '
      + '1960-luvulla. Vuonna 1967 kylä nimettiin suojelukohteeksi, ja sen asettelua '
      + 'yritettiin palauttaa vuoden 1830 mukaiseksi; historiallisia tiloja ja latoja on '
      + 'siirretty sinne muista kylistä, joita oltiin purkamassa. Kylässä ei saa ajaa '
      + 'autoilla, ja julkisena liikenteenä on hevosraitiovaunu.',
    lahde: 'en-Wikipedia "Orvelte", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-sneek',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-sneek-083f1b3e.jpg',
      lyhyt: 'Sneekin Waterpoort kanavan päässä, kaksi terävää tornia ja kaksoiskaari.',
      selite: 'Waterpoort on Friisin Sneekin kaupunginportti, jonka alta kanava kulkee. Kuvassa näkyvät kaksi liuskekattoista tornia, kellotaulu ja kanavan ylittävä kivisilta.',
      lahde: 'Valokuva: Gouwenaar, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Gouwenaar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20190529_Waterpoort1_Sneek.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-sneek-6e6f1783.jpg',
        lyhyt: 'Näkymä Waterpoortin kaarten läpi Sneekin kanavalle ja huviveneille.',
        selite: 'Waterpoortin tiilikaarien kehystämänä näkyvät kaupungin kanava, tiilitaloja ja vesitorni sekä kanavaan ankkuroituja veneitä.',
        lahde: 'Valokuva: Gouwenaar, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Gouwenaar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20180828_Zicht_vanaf_de_Waterpoort_Sneek.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Sneek',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä on Sneekin tunnusmerkki?',
      'Mikä vaateketju aloitti Sneekissä?',
    ],
    korostukset: ['Waterpoort|Waterpoort'],
    nappi: 'Friisiläinen muurikaupunki, jonka Waterpoort vartioi kanavaa',
    // 5.66 E / 53.0325 N — en-Wikipedia "Sneek"
    laudat: {
      maailmankartta: { x: 6022, y: 1255.8 },
      europe: { x: 319.9, y: 498.8 },
    },
    teksti: 'Sneek on Friisinmaan kaupunki Leeuwardenin lounaispuolella, ja se tunnetaan '
      + 'kanavistaan, kaupungin tunnuksena olevasta Waterpoort-vesiportista ja '
      + 'vesiurheilusta; vuotuinen Sneekweek on suurin purjehdustapahtuma Euroopan '
      + 'sisävesillä. Kaupunki perustettiin 900-luvulla hiekkaiselle niemekkeelle, jossa pato '
      + 'ylitti tärkeän vesireitin. Se sai virallisesti kaupunkioikeudet vuonna 1456 ja '
      + 'kuuluu Friisinmaan yhteentoista kaupunkiin. Vuonna 1492 sen ympärille alettiin '
      + 'rakentaa vallihautaa ja muuria, ja Sneek oli tuolloin Friisinmaan ainoa muurein '
      + 'ympäröity kaupunki; Waterpoort ja Bolwerk ovat yhä jäljellä. Vaateketju C&A aloitti '
      + 'toimintansa Sneekissä vuonna 1841.',
    lahde: 'en-Wikipedia "Sneek", johdanto-osa ja osiot "History" ja "Trade and industry" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kinderdijk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-kinderdijk-990ec8b1.jpg',
      lyhyt: 'Kinderdijkin tuulimyllyt aterioivat kanavan varrella sinisen taivaan alla.',
      selite: 'Kinderdijkin myllyt seisovat rivissä kanavan reunalla Alankomaiden polderimaisemassa. Etualalla on kanavan tyyni vesi ja etummainen mylly nousee korkeana horisonttiin.',
      lahde: 'Valokuva: Norbert Reimer from Mettlach-Orscholz, Saarland, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Norbert Reimer from Mettlach-Orscholz, Saarland',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aufgereiht_(36735909403).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-kinderdijk-d65bfb4a.jpg',
        lyhyt: 'Kymmenen Kinderdijkin myllyä rivissä ruovikon takana.',
        selite: 'Kuvassa näkyy kymmenen Kinderdijkin tuulimyllyä laajassa polderimaisemassa. Etualalla on ruovikkoa ja taivaalla pilviä.',
        lahde: 'Valokuva: Uberprutser, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Uberprutser',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:10_molens_van_de_kinderdijk.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kinderdijkin myllyt',
    nimio: 'Kinderdijk',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä varten Kinderdijkin myllyt rakennettiin?',
      'Milloin Kinderdijkin myllyt otettiin pois käytöstä?',
    ],
    korostukset: ['Alblasserwaard|Alblasserwaardin'],
    nappi: 'Yhdeksäntoista tuulimyllyä, jotka pitävät polderin kuivana',
    // 4.64944444 E / 51.8825 N — en-Wikipedia "Kinderdijk windmills"
    laudat: {
      maailmankartta: { x: 5988.3, y: 1307.3 },
      europe: { x: 300.5, y: 529.1 },
    },
    teksti: 'Kinderdijkin myllyt ovat 19 mittavan tuulimyllyn ryhmä Alblasserwaardin polderilla '
      + 'Etelä-Hollannissa. Myllyt rakennettiin vuosina 1738 ja 1740 pitämään vesi poissa '
      + 'polderilta, ja ne ovat Alankomaiden suurin vanhojen tuulimyllyjen keskittymä. Kun '
      + 'maa vajosi ja vedenpinta nousi, 1800-luvulla tarvittiin enemmän '
      + 'pumppauskapasiteettia kuin myllyt pystyivät tuottamaan, ja vesilautakunnat '
      + 'rakennuttivat höyrykäyttöisiä pumppuasemia. Myllyjen käyttö loppui lopullisesti '
      + 'toisen maailmansodan jälkeen, mutta myllärit perheineen saivat jäädä asumaan niihin. '
      + 'Myllyt ovat kansallisia muistomerkkejä ja UNESCOn maailmanperintökohde vuodesta '
      + '1997.',
    lahde: 'en-Wikipedia "Kinderdijk windmills", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-cruquius',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-cruquius-3b420660.jpg',
      lyhyt: 'Cruquiuksen höyrypumppuaseman tiilirakennus, piippu ja kanavan puoleinen holvattu perusta.',
      selite: 'Museum De Cruquius toimii entisessä höyrypumppuasemassa Haarlemmermeerin äärellä. Kuvassa näkyvät pyöreä koneistotorni, korkea savupiippu ja veden puolelle avautuvat holvit.',
      lahde: 'Valokuva: Caspar, Wikimedia Commons (CC BY-SA 2.5).',
      tekija: 'Caspar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pumping_engine_Cruquius.jpg',
      lisenssi: 'CC BY-SA 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-cruquius-7ede35de.jpg',
        lyhyt: 'Mustavalkoinen kuva Cruquiuksen koneistohallista, jossa pumppukoneen sylinterit ja kierreportaat.',
        selite: 'Kuva on otettu pumppuaseman koneistohallissa, joka on nykyisin museo. Etualalla on suuri höyrykoneen sylinteri ja taustalla valurautainen kierreportaikko.',
        lahde: 'Valokuva: Cees de Boer, Wikimedia Commons (CC0).',
        tekija: 'Cees de Boer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:In_de_machinehal_van_het_gemaal,_nu_museum,_de_Cruquius._NL-HlmNHA_54014873.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Cruquius',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mikä oli Haarlemmermeer ennen kuivatusta?',
      'Kenen mukaan Cruquius-pumppuasema on nimetty?',
    ],
    korostukset: ['Haarlemmermeer|Haarlemmermeer'],
    nappi: 'Höyrypumppu, joka kuivasi Haarlemin järven kolmessa vuodessa',
    // 4.63833333 E / 52.33805556 N — en-Wikipedia "Museum De Cruquius"
    laudat: {
      maailmankartta: { x: 5987.9, y: 1287 },
      europe: { x: 300.3, y: 517.1 },
    },
    teksti: 'De Cruquius on vanhassa höyrypumppuasemassa toimiva museo Cruquiuksessa '
      + 'Alankomaissa. Se on nimetty maanmittari Nicolaas Kruikin eli latinalaisittain '
      + 'Nicolaus Samuel Cruquiuksen (1678–1754) mukaan, joka oli yksi Haarlemmermeer-järven '
      + 'kuivatussuunnitelman kannattajista. Pumppu aloitti työnsä vuonna 1850, ja Haarlemin '
      + 'järvi saatiin kuivaksi kolmessa vuodessa, kuten vuosisata aiemmin oli ennustettu. '
      + 'Asemaa käytettiin ajoittain vuoteen 1933, jolloin siitä tehtiin museo. Cruquiuksen '
      + 'koneen uskotaan olevan suurin koskaan rakennettu höyrykone, ja sen rakensi Harvey & '
      + 'Co Cornwallin Haylessa; sisin korkeapainesylinteri on halkaisijaltaan 2,1 metriä.',
    lahde: 'en-Wikipedia "Museum De Cruquius", johdanto-osa ja osio "Heritage site" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mitä Cruquiuksen koneesta uskotaan?',
      vaihtoehdot: [
        'Että se oli maailman ensimmäinen sähköpumppu',
        'Että se on suurin koskaan rakennettu höyrykone',
        'Että se on Alankomaiden vanhin tuulimylly',
        'Että se rakennettiin Haarlemin kaupungintalon kellariin',
      ],
      oikea: 1,
      fakta: 'Haarlemmermeeren pumppuasemat nimettiin kuivatuksen suunnittelijoiden mukaan: '
        + 'Leeghwater, Lynden ja Cruquius.',
    },
  },
  {
    id: 'hahmotelma-enkhuizen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-enkhuizen-212018ef.jpg',
      lyhyt: 'Enkhuizenin Drommedaris-satamatorni ja Zuiderkerkin torni sataman vesien takana.',
      selite: 'Drommedaris on Enkhuizenin vanhan sataman pyöreä tiilitorni, jonka takana kohoaa Zuiderkerkin torni. Oikealla näkyy perinteisen purjealuksen masto ja takila.',
      lahde: 'Valokuva: Gouwenaar, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Gouwenaar',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:5820180907_Zicht_op_Enkhuizen_met_Drommedaris_en_Zuiderkerk.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-enkhuizen-bb97a427.jpg',
        lyhyt: 'Zuiderzeemuseon ulkoalueen vanhoja taloja kanavan varrella Enkhuizenissa.',
        selite: 'Zuiderzeemuseon ulkomuseoalueella on vanhoja tiili- ja lautataloja, kapea kanava ja pieniä siltoja. Kuva näyttää, miten Zuiderzeen rannikon kylä on koottu museoksi.',
        lahde: 'Valokuva: Steven Lek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Steven Lek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zuiderzeemuseum_Enkhuizen_5.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Enkhuizen',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Mitä Peperhuis-varastossa säilytettiin?',
      'Miksi Enkhuizen menetti asemansa Amsterdamille?',
    ],
    korostukset: ['Peperhuis|Peperhuis'],
    nappi: 'Entinen VOC:n satamakaupunki, jonka loisto haihtui satamien mutaantuessa',
    // 5.3 E / 52.7 N — en-Wikipedia "Enkhuizen"
    laudat: {
      maailmankartta: { x: 6010, y: 1270.8 },
      europe: { x: 313, y: 507.6 },
    },
    teksti: 'Enkhuizen on historiallinen kaupunki Länsi-Friisissä Pohjois-Hollannissa, ja siitä '
      + 'kehittyi keskiajalla ja Alankomaiden kulta-aikana tärkeä kalastus- ja kauppasatama, '
      + 'yksi maan varakkaimmista ja vaikutusvaltaisimmista kaupungeista. Hoornin ja '
      + 'Amsterdamin tavoin se oli VOC:n satamakaupunkeja, joista käytiin Itä-Intian '
      + 'merikauppaa; kaupunki sai kaupunkioikeudet vuonna 1356. Valtansa huipulla Enkhuizen '
      + 'oli 1600-luvun puolivälissä, mutta satamien liettyminen syrjäytti sen Amsterdamin '
      + 'tieltä. Peperhuis on 1600-luvun varasto, jossa VOC säilytti mausteita, ja nykyään se '
      + 'kuuluu Zuiderzee-museoon. Kaupungin tunnusmerkkeihin kuuluu myös Drommedaris-torni.',
    lahde: 'en-Wikipedia "Enkhuizen", johdanto-osa ja osiot "History" ja "Museums" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mitä VOC säilytti Enkhuizenin Peperhuis-varastossa?',
      vaihtoehdot: [
        'Mausteita',
        'Silliä',
        'Villaa',
        'Viiniä',
      ],
      oikea: 0,
      fakta: 'Peperhuis toimi mallina KLM:n Delft Blue -talolle.',
    },
  },
  {
    id: 'hahmotelma-franeker',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-franeker-c7dc8c95.jpg',
      lyhyt: 'Eise Eisingan planetaarion sininen kattotaulu, jossa planeettojen ratojen kaaria ja tähtimerkkejä.',
      selite: 'Franekerin Eise Eisinga -planetaario rakennettiin vuosina 1774–1781. Kuvassa näkyy huoneen katon sininen taivaankartta, valkoiset ratakaaret ja pallot sekä seinällä olevat kellotaulut.',
      lahde: 'Valokuva: Erik Zachte, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Erik Zachte',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Planetarium_Eise_Eisinga_in_Franeker.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-franeker-81d9dc31.jpg',
        lyhyt: 'Planetarium-kyltillä varustettu tiilitalo Franekerin kadun varrella.',
        selite: 'Eise Eisinga -planetaarion tiilinen julkisivu, jossa on kaareva päätykoriste ja PLANETARIUM-kyltti.',
        lahde: 'Valokuva: Bouwe Brouwer, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Bouwe Brouwer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Franeker,_Planetarium.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/nld-nosto-franeker-ccd039a5.jpg',
        lyhyt: 'Franekerin kaupungintalon koristeellinen julkisivu ja terävä torni.',
        selite: 'Franekerin kaupungintalon tiili- ja kivijulkisivu, portaikkopäädyt ja liuskekattoinen torni pilviselle taivaalle kohoten.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Franeker_Stadhuis_4.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Franeker',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä Eise Eisingan planetaario esittää?',
      'Miksi Eisinga rakensi planetaarion?',
    ],
    korostukset: ['Eise Eisinga|Eise Eisinga'],
    nappi: 'Villakampaajan olohuoneeseen rakentama planeettojen koneisto',
    // 5.53333333 E / 53.18333333 N — en-Wikipedia "Franeker"
    laudat: {
      maailmankartta: { x: 6017.8, y: 1249 },
      europe: { x: 317.4, y: 494.9 },
    },
    teksti: 'Franeker on yksi Friisinmaan yhdestätoista historiallisesta kaupungista. '
      + 'Villakampaaja ja tähtitieteen harrastaja Eise Eisinga (1744–1828) rakensi vuosina '
      + '1774–1781 omaan olohuoneeseensa planetaarion selittääkseen planeettojen yhtymän ja '
      + 'lieventääkseen paikallisia pelkoja siitä, mitä planeettojen asettuminen samaan '
      + 'linjaan aiheuttaisi. Se on maailman vanhin yhtäjaksoisesti toiminut planetaario, ja '
      + 'UNESCO nimesi sen maailmanperintökohteeksi vuonna 2023. Franekerissa on myös '
      + 'toiminut yliopisto, joka perustettiin 29. heinäkuuta 1585 ja oli Leidenin jälkeen '
      + 'Alankomaiden vanhin; sen opiskelijoihin kuuluivat muun muassa René Descartes ja '
      + 'Eisinga itse.',
    lahde: 'en-Wikipedia "Franeker", johdanto-osa ja osiot "University of Franeker" ja '
      + 'museo-osio (tarkistettu 19.9.2026).',
  },
];
