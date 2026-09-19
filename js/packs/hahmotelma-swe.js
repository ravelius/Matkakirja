/*
 * RUOTSIN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden ja Tanskan jälkeen
 * Ruotsi.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48 ja 51) =
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä muut EU-maiden pakat, viimeisimpänä Tanska
 * (js/packs/hahmotelma-dnk.js): jokaisella nostolla on valmis sisältö —
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
 * Vuoden 1873 jälkeiset kohteet (Vimmerbyn Astrid Lindgren, Älmhultin
 * IKEA, kansallispuistot) ovat mukana: teksti on nykytietoa ja `nappi`
 * katsoo vuodesta 1873 eteenpäin tai sanoo rehellisesti, että kohde
 * tulee vasta myöhemmin.
 *
 * MIKSI NÄMÄ KOHTEET: Ruotsin pakissa (js/packs/maastokohteet-swe.js) on
 * jo Kebnekaise, Itämeri, Pohjanlahti, Göta älv, Visby, Gamla Uppsala,
 * Birka, Falunin kaivos, Göta-kanava, Vadstenan luostari, Kiruna, Ales
 * stenar, Vänern, Kalmarin linna, Karlskrona, Lundin tuomiokirkko,
 * Tornionjoki ja Salan hopeakaivos sekä Vasaloppet ja Spillingsin kätkö.
 * Tämän pakin kohteet eivät toista niitä (ei samoja id:itä eikä nimiä).
 * Uppsalan tuomiokirkko (2,0 lautayksikköä Gamla Uppsalasta), Nusnäs
 * (3,2 Vasaloppetista) ja Trollhättan (Göta älv -nosto samassa paikassa)
 * jätettiin pois, ja tilalle tulivat Skokloster, Rättvik ja Eskilstuna.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `swe-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/swe/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Tukholma, Ruotsin ainoa pelikaupunki) ulkopuolella, lähin
 * nosto yli 8 lautayksikön päässä kaupungista (raja
 * KAUPUNGIN_KOHDALLA_SADE on 7), ja js/fokuskohteet.js liittää rivit
 * KOHDE_MAAT.SWE:hen. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Hälsingen koristellut maatilat on
 * sijoitettu yhden UNESCO-tilan, Erik-Andersin (Söderala), kohdalle.
 * Laudan luvut on laskettu pelin omalla kaavalla
 * (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Ruotsin fokuslehden rajaukseen
 * (`osuuLehteen`). Pelin karkea maailmankartta ei ulotu kaikkiin
 * saariin ja rannikkoon (Fårö, Höga kusten, Kosterhavet ja Marstrand
 * ovat SWE-renkaan ulkopuolella); niiden koordinaatit ovat silti
 * Wikipedian todelliset.
 */

/** Ruotsin hahmotelmanostot: sisällölliset kohteet kaupungin (Tukholma) ulkopuolella. */
export const HAHMOTELMA_SWE = [
  {
    id: 'hahmotelma-sarek',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-sarek-d5137427.jpg',
      lyhyt: 'Rapajoen suisto ja Skierfe-vuori Sarekin kansallispuistossa.',
      selite: 'Näkymä rinteeltä Rapajoen mutkitteleviin haaroihin ja suiston laakson taakse '
        + 'kohoavaan Skierfe-vuoreen. Rapajoen suisto on puiston tunnetuimpia maisemia.',
      lahde: 'Valokuva: Tero Laakso, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Tero Laakso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skierfe_and_Rapa%C3%A4tno_delta_-_Sarek_national_park_-_panoramio.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-sarek-bdcfa3ce.jpg',
        lyhyt: 'Sarekin keskiset vuoret nähtynä Akka-huipulta etelään.',
        selite: 'Kuva on otettu Akka-vuorelta etelään päin, ja se näyttää Sarekin keskiosan '
          + 'vuoria ja tunturilaaksoja lumilaikkuineen. Sarek on Ruotsin vuoristoisinta '
          + 'seutua.',
        lahde: 'Valokuva: Uwe und Lukas, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Uwe und Lukas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sarek_Nationalpark_Akka_2.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-sarek-9e78f647.jpg',
        lyhyt: 'Tjakkeli-tunturi ja Lulep Suobbatjávrre Kungsledeniltä katsottuna.',
        selite: 'Näkymä Kungsleden-vaellusreitiltä Sarekin kansallispuistossa kohti '
<<<<<<< HEAD
          + 'Tjakkeli-tunturia ja sen edustan järveä. Kungsleden kulkee puiston itäosan '
          + 'halki.',
=======
          + 'Tjakkeli-tunturia ja sen edustan järveä. Artikkelin mukaan Kungsleden kulkee '
          + 'puiston itäosan halki.',
>>>>>>> origin/main
        lahde: 'Valokuva: Trougnouf (Benoit Brummer), Wikimedia Commons (CC BY 4.0).',
        tekija: 'Trougnouf (Benoit Brummer)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tjakkeli_and_Lulep_Suobbatj%C3%A1vrre_viewed_from_the_Kungsleden_in_Sarek_National_Park_(DSCF2781).jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Sarekin kansallispuisto',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi juuri Sarekin vuoristomaisema haluttiin suojella jo Euroopan ensimmäisten kansallispuistojen joukossa?',
      'Mikä saa Rapajoen suiston näyttämään ylhäältä katsottuna niin erikoiselta?',
    ],
    korostukset: ['Sarektjåkkå|Sarektjåkkå', 'Rapajoen suisto|Rapajoen suisto'],
    nappi: 'Alueen kartoitti 1870 G. W. Bucht; kansallispuistoksi se tulee vasta vuonna 1909',
    // 17.7 E / 67.2833 N — en-Wikipedia "Sarek National Park"
    laudat: {
      maailmankartta: { x: 6423.3, y: 540 },
      europe: { x: 551, y: 124 },
    },
    teksti: 'Sarekin kansallispuisto sijaitsee Ruotsin Lapissa Jokkmokkin kunnassa, napapiirin '
      + 'pohjoispuolella, ja se perustettiin vuonna 1909 Euroopan vanhimpien '
      + 'kansallispuistojen joukossa. Alue on Ruotsin vuoristoisin: puistossa on kuusi '
      + 'maan kolmestatoista yli 2 000 metrin huipusta, korkeimpana Sarektjåkkå (2 089 m), '
      + 'sekä noin sata jäätikköä. Merkittyjä polkuja tai majoitusta ei ole, sillatkin '
      + 'ovat harvassa ja sadetta tulee poikkeuksellisen paljon, joten vaellus on '
      + 'vaativaa. Rapajoen suisto on yksi Euroopan tunnetuimmista maisemista: jäätiköistä '
      + 'syntyvä joki kuljettaa mukanaan runsaasti maa-ainesta, joka värjää sen '
      + 'harmaanvihreäksi ja muodostaa laajoja suistoja.',
    lahde: 'en-Wikipedia "Sarek National Park", johdanto-osa ja osio "Geography" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-abisko',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-abisko-4c232a64.jpg',
      lyhyt: 'Abiskojåkka-joen kanjoni Abiskon kansallispuistossa.',
      selite: 'Vaahtoava Abiskojåkka-joki virtaa kallioisessa kanjonissa, jonka rinteillä '
        + 'kasvaa pohjoista koivumetsää. Kuvan on otettu Abiskon kansallispuistossa.',
      lahde: 'Valokuva: Silverkey, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Silverkey',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Abiskoj%C3%A5kka_canyon.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-abisko-cd41bcc4.jpg',
        lyhyt: 'Revontulet taivaalla Abiskossa Torneträsk-järven lähellä.',
        selite: 'Vihreät revontulet loimuavat lumisen rinteen yllä Abiskon kansallispuistossa. '
<<<<<<< HEAD
          + 'Puisto on valosaasteeton ja siksi hyvä revontulten katseluun.',
=======
          + 'Artikkelin mukaan puisto on valosaasteeton ja siksi hyvä revontulten '
          + 'katseluun.',
>>>>>>> origin/main
        lahde: 'Valokuva: Pavel.shyshkouski, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pavel.shyshkouski',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aurora_in_Abisko_near_Tornetr%C3%A4sk.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-abisko-33eff96a.jpg',
        lyhyt: 'Näkymä Björklidenistä puiston yli kohti Lapporten-laaksoa.',
        selite: 'Kuvassa järven ranta ja kaukana siintävä Lapporten, erottuva U-muotoinen '
          + 'laakso. Kuva on otettu Björklidenistä kansallispuiston suuntaan.',
        lahde: 'Valokuva: Lapplaender, Wikimedia Commons (CC BY-SA 2.0 de).',
        tekija: 'Lapplaender',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lapporten.jpg',
        lisenssi: 'CC BY-SA 2.0 de',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/de/deed.en',
      },
    ],
    nimi: 'Abiskon kansallispuisto',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi tiedemiehet halusivat suojella juuri Abiskon tunturiluontoa?',
      'Mitä hyötyä tutkijoille on siitä, että Abisko on kaukana pohjoisessa ja vapaa valosaasteesta?',
    ],
    korostukset: ['Fredrik Svenonius|Fredrik Svenonius', 'revontulet|revontulia'],
    nappi: 'Tutkimusasema perustetaan vasta 1903 ja itse kansallispuisto vasta vuonna 1909',
    // 18.6833 E / 68.3167 N — en-Wikipedia "Abisko National Park"
    laudat: {
      maailmankartta: { x: 6456.1, y: 481 },
      europe: { x: 569.9, y: 96.9 },
    },
    teksti: 'Abiskon kansallispuisto sijaitsee Ruotsin Lapissa Torneträsk-järven rannalla, '
      + 'noin 195 kilometriä napapiirin pohjoispuolella. Sen ehdotti ja perusti vuonna '
      + '1909 joukko tunnettuja ruotsalaisia tiedemiehiä, joukossaan geologi Fredrik '
      + 'Svenonius, samana vuonna kun maan ensimmäiset luonnonsuojelulait säädettiin. '
      + 'Tarkoitus oli säilyttää pohjoista tunturiluontoa alkuperäisessä tilassaan '
      + 'tutkimuksen käyttöön, ja puistosta haluttiin myös matkailukohde. Abiskon '
      + 'tutkimusasema perustettiin ensin Vassijaureen vuonna 1903 ja rakennettiin '
      + 'tulipalon jälkeen uudelleen Abiskoon. Kesällä siellä voi nähdä keskiyön auringon '
      + 'ja talvella valosaasteettomalla taivaalla revontulia.',
    lahde: 'en-Wikipedia "Abisko National Park", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-vattern',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-vattern-ca87ddeb.jpg',
      lyhyt: 'Vättern ja Visingsö-saari nähtynä Brahehusin linnanraunioilta.',
      selite: 'Kuva on otettu Brahehusin linnan raunioilta Grännan lähistöltä, ja se näyttää '
        + 'pellot ja Vätternin avaran vesialueen. Kaukana järven yllä siintää Visingsö.',
      lahde: 'Valokuva: Ivo Kruusamägi, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ivo Kruusamägi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_V%C3%A4ttern_and_Visings%C3%B6_island,_seen_from_Brahehus,_Sweden.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-vattern-ee6151b6.jpg',
        lyhyt: 'Ilmakuva Visingsön saaresta Vätternillä maaliskuussa 2013.',
        selite: 'Ilmakuvassa Visingsö näkyy kapeana saarena Vätternin sinisen veden keskellä '
          + 'ja järven rannat lumen peittäminä. Visingsö sijaitsee Grännan edustalla.',
        lahde: 'Valokuva: acediscovery, Wikimedia Commons (CC BY 4.0).',
        tekija: 'acediscovery',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Visings%C3%B6_and_V%C3%A4ttern_aerial_photograph.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-vattern-40d88fcf.jpg',
        lyhyt: 'Auringonlasku Vätternin yllä Gisebobrantenilta katsottuna.',
        selite: 'Auringonlaskun värjäämä pilvinen taivas heijastuu Vätternin tyyneen pintaan. '
          + 'Kuva on otettu Gisebobrantenilta.',
        lahde: 'Valokuva: Jarl Strömbom, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jarl Strömbom',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:A_view_over_lake_V%C3%A4ttern_from_Gisebobranten.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Vättern',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi monet Vätternin ympäristön kunnat ottavat juomavetensä lähes sellaisenaan järvestä?',
      'Mihin vedet virtaavat Vätternistä, kun järvi on yhteydessä sekä Motala strömiin että Götan kanavaan?',
    ],
    korostukset: ['Visingsö|Visingsö', 'Götan kanava|Götan kanava'],
    nappi: 'Götan kanava oli yhdistänyt järven Vänerniin ja Kattegatiin jo vuodesta 1832',
    // 14.6 E / 58.4 N — en-Wikipedia "Lake Vättern"
    laudat: {
      maailmankartta: { x: 6320, y: 1004.4 },
      europe: { x: 491.5, y: 357.7 },
    },
    teksti: 'Vättern on Ruotsin toiseksi suurin järvi Vänernin jälkeen ja Euroopan kuudenneksi '
      + 'suurin. Se on pitkä, sormen muotoinen järvi Etelä-Ruotsissa, ja sen pinta-ala on '
      + 'noin 1 900 neliökilometriä. Vättern on paljon Vänerniä syvempi: syvin kohta on '
      + '128 metriä merenpinnan alapuolella, ja siksi vettä on noin puolet Vänernin '
      + 'määrästä, vaikka pinta-ala on vain kolmannes. Rannoilla ovat muun muassa '
      + 'Jönköping, Vadstena ja Gränna, jonka edustalla on Visingsö-saari. Vesi on niin '
      + 'kirkasta, että monet ympäristön kunnat ottavat juomavetensä suoraan järvestä. '
      + 'Vedet laskevat Motala ström -virtaa pitkin Itämereen, ja vuodesta 1832 lähtien '
      + 'Götan kanava on yhdistänyt järven myös Vänerniin ja Kattegatiin.',
    lahde: 'en-Wikipedia "Lake Vättern", johdanto-osa ja osio "Geography" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Miksi Vättern sisältää puolet Vänernin vesimäärästä, vaikka sen pinta-ala on '
        + 'vain kolmannes?',
      vaihtoehdot: [
        'Koska sen vesi haihtuu hitaammin',
        'Koska siihen laskee enemmän jokia',
        'Koska se on paljon Vänerniä syvempi',
        'Koska sen ranta on paljon pidempi',
      ],
      oikea: 2,
      fakta: 'Vättern tunnetaan Vätternrundan-pyöräilytapahtumasta, jossa noin 20 000 '
        + 'osallistujaa ajaa 300 kilometrin lenkin järven ympäri. Järvessä elää myös '
        + 'jääkaudelta peräisin oleva Vätternin nieriäkanta.',
    },
  },
  {
    id: 'hahmotelma-oland',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-oland-c132e821.jpg',
      lyhyt: 'Stora Alvaretin avara kalkkikivitasanko ja kiviaita Öllannilla.',
      selite: 'Kuvassa Stora Alvaretin avoin tasanko, jonka poikki kulkee matala kiviaita. '
        + 'Alvar on Ölandin eteläosan tunnusmaisema ja monien harvinaisten lajien koti.',
      lahde: 'Valokuva: Bernt Fransson, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Bernt Fransson',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stora_Alvaret,_%C3%96land_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-oland-4b44d27a.jpg',
        lyhyt: 'Eketorpin linnoituksen kiviseinä ja portti Öllannilla.',
        selite: 'Eketorpin pyöreän linnoituksen kiviseinä ja sen keskellä oleva portti. '
          + 'Eketorp on Ölandin rautakautisista linnavarustuksista ainoa, joka on kaivettu '
          + 'kokonaan.',
        lahde: 'Valokuva: Håkan Svensson (Xauxa), Wikimedia Commons (CC BY 2.5).',
        tekija: 'Håkan Svensson (Xauxa)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eketorp_main_view.jpg',
        lisenssi: 'CC BY 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-oland-c268be8a.jpg',
        lyhyt: 'Borgholmin linnan rauniot Ölannilla.',
        selite: 'Borgholmin linna rakennettiin vuosina 1669–1681 kuningatar Hedvig Eleonoralle '
          + 'Nicodemus Tessin vanhemman suunnitelmien mukaan. Kuvassa linnan rauniot.',
        lahde: 'Valokuva: Håkan Dahlström, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Håkan Dahlström',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Borgholm_castle_ruin.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Öland',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi Stora Alvaretin kalkkikivitasanko on niin arvokas luontokohde?',
      'Mitä Eketorpin linnoituksen kaivauksissa on löytynyt?',
    ],
    korostukset: ['Stora Alvaret|Stora Alvaret', 'Eketorp|Eketorp'],
    nappi: 'Ruotsin kuninkaiden riistamaa; silta mantereelle valmistuu vasta vuonna 1972',
    // 16.6667 E / 56.7333 N — en-Wikipedia "Öland"
    laudat: {
      maailmankartta: { x: 6388.9, y: 1084.5 },
      europe: { x: 531.2, y: 401.5 },
    },
    teksti: 'Öland on Ruotsin toiseksi suurin saari ja perinteisistä maakunnista pienin. Se on '
      + 'Itämerellä Smålannin rannikon edustalla, 137 kilometriä pitkä mutta enimmillään '
      + 'vain 16 kilometriä leveä. Saaren tunnusmaisema on Stora Alvaret, '
      + 'kalkkikivitasanko, joka on monien harvinaisten ja uhanalaisten lajien '
      + 'elinympäristö ja kuuluu UNESCOn maailmanperintöön; Linné tutki sen eliöstöä jo '
      + 'vuonna 1741. Saarella on yhdeksäntoista rautakautista linnavarustusta, joista '
      + 'Eketorp on kaivettu kokonaan ja tuottanut yli 24 000 esinettä. Mantereeseen Öland '
      + 'yhdistettiin vasta vuonna 1972 valmistuneella kuuden kilometrin sillalla.',
    lahde: 'en-Wikipedia "Öland", johdanto-osa ja osio "Environment" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Millainen luontotyyppi Ölandin tunnusmaisema Stora Alvaret on?',
      vaihtoehdot: [
        'Kalkkikivitasanko',
        'Suo- ja rämealue',
        'Hiekkadyynialue',
        'Graniittivuoristo',
      ],
      oikea: 0,
      fakta: 'Saaren mukaan on nimetty kambrikautinen trilobiitti Eccaparadoxides oelandicus. '
        + 'Ölandin itärannikko on myös kansainvälisesti tärkeä lintualue, jolla pesii muun '
        + 'muassa merikotkia.',
    },
  },
  {
    id: 'hahmotelma-faro',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-faro-9eba3797.jpg',
      lyhyt: 'Raukkeja Langhammarsin luonnonsuojelualueella meren rannalla.',
      selite: 'Vaaleita kivipylväitä eli raukkeja kohoaa Langhammarsin rannalla Fårön '
        + 'luoteisosassa. Langhammars oli myös Ingmar Bergmanin elokuvan Shame '
        + 'kuvauspaikka.',
      lahde: 'Valokuva: ArildV, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'ArildV',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Langhammars_July_2025_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-faro-bc890cfa.jpg',
        lyhyt: 'Raukkeja Digerhuvudin luonnonsuojelualueella Fårössä.',
        selite: 'Digerhuvudin rannikolla on Ruotsin suurin raukkialue, jossa satoja '
          + 'kivipylväitä seisoo kolmen ja puolen kilometrin matkalla. Kuvassa osa niistä '
          + 'heijastuu rantaveteen.',
        lahde: 'Valokuva: Mattias Pontén, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Mattias Pontén',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Raukar_vid_Digerhuvud_naturreservat_F%C3%A5r%C3%B6.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-faro-5f947811.jpg',
        lyhyt: 'Fårön majakka saaren koilliskärjessä.',
        selite: 'Valkoinen Fårön majakka kohoaa puiden takaa sorarannan yläpuolella. Majakka '
          + 'on 30 metriä korkea ja valmistui vuosina 1846–1847.',
        lahde: 'Valokuva: ArildV, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'ArildV',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:F%C3%A5r%C3%B6_fyr_July_2019_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Fårö',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi Fårön ja Gotlannin rannoilla on outoja kivipylväitä, raukeja?',
      'Mitä Fårön nimi todennäköisesti tarkoittaa, vaikka sitä voi luulla lampaisiin liittyväksi?',
    ],
    korostukset: ['raukit|raukit', 'Digerhuvud|Digerhuvudin'],
    nappi: 'Majakka oli valmistunut 1847; Bergmanin elokuvat kuvataan saarella vasta '
      + '1960-luvulla',
    // 19.15 E / 57.95 N — en-Wikipedia "Fårö"
    laudat: {
      maailmankartta: { x: 6471.7, y: 1026.3 },
      europe: { x: 578.9, y: 369.5 },
    },
    teksti: 'Fårö on Itämeren saari Gotlannin pohjoispuolella, ja Gotlannista sen erottaa '
      + 'kapea salmi, jonka yli kulkee kaksi autolauttaa. Saari on noin 111 '
      + 'neliökilometrin kokoinen, ja siellä puhutaan omaa murretta, fårömålia. Fårön ja '
      + 'Gotlannin erikoisuus ovat raukit, jääkauden aikana eroosion muovaamat '
      + 'kivipylväät, joita ei ole muualla. Digerhuvudin rannikolla on Ruotsin suurin '
      + 'raukkialue: satoja pylväitä 3,5 kilometrin matkalla. Nimen arvellaan tarkoittavan '
      + 'matkustajan saarta, vaikka manner-Ruotsissa sen voi luulla tulevan sanasta får '
      + 'eli lammas. Majakka valmistui vuosina 1846–1847, ja ohjaaja Ingmar Bergman asui '
      + 'saarella ja kuvasi siellä useita elokuviaan.',
    lahde: 'en-Wikipedia "Fårö", johdanto-osa ja osio "Places of interest" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-hoga-kusten',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-hoga-kusten-a7020dcd.jpg',
      lyhyt: 'Höga kustenin saaristomaisema mäntyineen ja lahtineen korkealta katsottuna.',
      selite: 'Panoraamassa mäntymetsäiset kallioiset saaret, sisälahdet ja Pohjanlahden '
        + 'avovesi. Maa on kohonnut alueella lähes 300 metriä jääkauden jälkeen.',
      lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pudelek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:High_Coast_(H%C3%B6ga_kusten)_-_by_Pudelek.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-hoga-kusten-3fd22a3d.jpg',
        lyhyt: 'Högakustenbron-riippusilta Höga kustenin eteläreunalla.',
<<<<<<< HEAD
        selite: 'Silta on maailmanperintökohteen eteläinen päätepiste: kohde ulottuu sillalta '
          + 'etelässä Skagsuddeen pohjoisessa.',
=======
        selite: 'Silta on maailmanperintökohteen eteläinen päätepiste: artikkelin mukaan kohde '
          + 'ulottuu sillalta etelässä Skagsuddeen pohjoisessa.',
>>>>>>> origin/main
        lahde: 'Valokuva: Tunegravity, Wikimedia Commons (CC0).',
        tekija: 'Tunegravity',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:High_Coast_Bridge,_Sweden_in_summer.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Höga kusten',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi maa nousee Höga kustenilla yhä vieläkin, tuhansia vuosia jääkauden jälkeen?',
      'Mistä rannikon poikkeuksellisen korkeat kalliot ovat peräisin?',
    ],
    korostukset: ['maankohoaminen|maankohoamisen', 'Kvarken|Kvarkenin'],
    nappi: 'Aluetta kutsuttiin Ångermanlandin rannikoksi; nimi Höga kusten syntyy vasta '
      + 'vuonna 1974',
    // 18.5 E / 63 N — en-Wikipedia "High Coast"
    laudat: {
      maailmankartta: { x: 6450, y: 772.6 },
      europe: { x: 566.4, y: 236.7 },
    },
    teksti: 'Höga kusten eli Korkea rannikko on Pohjanlahden rannikkoa Ruotsin '
      + 'Ångermanlandissa Härnösandin, Kramforsin ja Örnsköldsvikin kuntien seudulla. Alue '
      + 'tunnetaan maankohoamisen tutkimuksesta: kun mannerjää suli täältä noin 9 600 '
      + 'vuotta sitten, jään painon alla painunut maa alkoi nousta. Maa on kohonnut lähes '
      + '300 metriä, mikä on korkein tunnettu maankohoaminen maailmassa, ja nousu jatkuu '
      + 'yhä noin kahdeksan millimetrin vuosivauhdilla. Entisten rantaviivojen jäänteet '
      + 'näkyvät rannikolla, ja kohoaminen selittää alueen poikkeuksellisen korkeat '
      + 'kalliot. UNESCO otti alueen maailmanperintöluetteloon vuonna 2000, ja vuonna 2006 '
      + 'se yhdistettiin Suomen Kvarkenin saariston kanssa yhdeksi kohteeksi.',
    lahde: 'en-Wikipedia "High Coast", johdanto-osa ja osio "Geology" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mikä ilmiö on nostanut Höga kustenin rannikkoa lähes 300 metriä jääkauden '
        + 'jälkeen?',
      vaihtoehdot: [
        'Vuoristojen hidas poimuttuminen',
        'Tulivuorten toistuvat purkaukset',
        'Merenpinnan pitkäaikainen lasku',
        'Jääkauden jälkeinen maankohoaminen',
      ],
      oikea: 3,
      fakta: 'Höga kusten -vaellusreitti kulkee noin 135 kilometrin matkan '
        + 'maailmanperintöalueen halki Högakustenbron-sillalta Örnsköldsvikiin. Alueella '
        + 'elää myös ruskeakarhuja, ilveksiä ja hirviä.',
    },
  },
  {
    id: 'hahmotelma-kosterhavet',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kosterhavet-a07a52e3.jpg',
      lyhyt: 'Kalliosaaria ja avomerta Kosterinsaarten seudulla.',
      selite: 'Kuvassa näkyy kallioisia luotoja ja aavaa merta Kosterinsaarten seudulla '
        + 'Bohuslänissä, etualalla violetteja kukkia. Kosterhavetin kansallispuisto '
        + 'käsittää saarten ympärillä olevan meren ja rannat.',
      lahde: 'Valokuva: Bengt Nyman, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Bengt Nyman',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Koster%C3%B6arna_islets.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kosterhavet-f794670e.jpg',
        lyhyt: 'Punaisia taloja Ursholmenin kalliosaarella.',
        selite: 'Kuva esittää Ursholmenin saarta Kosterhavetin kansallispuistossa. Paljaat '
          + 'kalliot, matala kasvillisuus ja punaiset puutalot kuuluvat Bohuslänin '
          + 'saariston ilmeeseen.',
        lahde: 'Valokuva: Petr Vodička, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Petr Vodička',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kosterhavet-Ursholmen_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kosterhavet-b902ddc5.jpg',
        lyhyt: 'Kirkasta merivettä ja kaukana kalliosaaria.',
        selite: 'Kuvassa on matalaa merivettä ja kaukana horisontissa kalliosaaria '
          + 'Kosterhavetin kansallispuistossa. Puistoon kuuluu meri ja rannat, mutta ei '
          + 'saarten muuta aluetta.',
        lahde: 'Valokuva: Petr Vodička, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Petr Vodička',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kosterhavet_national_park.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kosterhavetin kansallispuisto',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Miksi Kosterhavetin vesistä löytyy lajeja, joita ei tapaa muualla Ruotsissa?',
      'Mitä eroa on merellisellä kansallispuistolla ja tavallisella maakansallispuistolla?',
    ],
    korostukset: ['Skagerrak|Skagerrakin', 'sienieläimet|sienieläinten'],
    nappi: 'Puisto perustetaan vasta vuonna 2009: Ruotsin ensimmäinen merellinen '
      + 'kansallispuisto',
    // 11.0167 E / 58.8333 N — en-Wikipedia "Kosterhavet National Park"
    laudat: {
      maailmankartta: { x: 6200.6, y: 983.3 },
      europe: { x: 422.7, y: 346.3 },
    },
    teksti: 'Kosterhavetin kansallispuisto on Ruotsin ensimmäinen merellinen kansallispuisto, '
      + 'ja se vihittiin käyttöön syyskuussa 2009. Se sijaitsee Skagerrakin merialueella '
      + 'Bohuslänissä ja käsittää Kosterinsaarten ympärillä olevan meren ja rannat, mutta '
      + 'ei itse saaria. Alueelta on löydetty yli 6 000 merieliölajia, ja noin 200 niistä '
      + 'ei tavata missään muualla Ruotsissa. Atlantilta tulevat virtaukset tuovat '
      + 'mukanaan esimerkiksi sienieläinten, korallien ja käsijalkaisten toukkia. Kylmässä '
      + 'ja suolaisessa Kosterfjordissa on syvimmillään 247 metriä vettä, ja puistossa '
      + 'elää Ruotsin suurin hyljeyhmä.',
    lahde: 'en-Wikipedia "Kosterhavet National Park", johdanto-osa ja osio "Nature" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kullaberg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kullaberg-7aa94311.jpg',
      lyhyt: 'Kullabergin jyrkät punertavat kalliot laskevat mereen.',
      selite: 'Kuvassa näkyy jyrkkiä kallioita Kullabergin niemellä Skånessa. Kalliot nousevat '
        + 'suoraan Kattegatista, ja niiden eri suunnat luovat alueelle vaihtelevia '
        + 'elinympäristöjä.',
      lahde: 'Valokuva: Moralist, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Moralist',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kullaberg_klippor.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kullaberg-3475299d.jpg',
        lyhyt: 'Kullenin majakka ja sen rakennukset niemen kärjessä.',
        selite: 'Kullenin majakka Kullabergin niemen läntisessä kärjessä. Sitä pidetään '
          + 'Ruotsin kirkkaimpana majakkana, ja sen suunnitteli arkkitehti Magnus '
          + 'Dahlander vuonna 1898.',
        lahde: 'Valokuva: Peterappelros, Wikimedia Commons (Public domain).',
        tekija: 'Peterappelros',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kullens_fyr_2009.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kullaberg-7d0a69f8.jpg',
        lyhyt: 'Kalliorantaa ja avomerta Kullabergin niemellä.',
        selite: 'Kuvassa on kallioista rannikkoa ja avomerta Kullabergin niemellä. Rinteillä '
          + 'kasvaa värikästä pensaikkoa, ja alue on suojeltu luonnonsuojelualueena.',
        lahde: 'Valokuva: Silverkey (Mickaël Delcey), Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Silverkey (Mickaël Delcey)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kullaberg_peninsula.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kullaberg',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Kullabergin kallioilla kasvaa lajeja, joita ei tapaa monessa muussa paikassa Ruotsissa?',
      'Mitä kivikehät ja hautakummut kertovat siitä, keitä Kullabergissa on asunut?',
    ],
    korostukset: ['Håkull|Håkull', 'Lathyrus sphaericus|Lathyrus sphaericus'],
    nappi: 'Linné vieraili niemellä jo 1740-luvulla; nykyinen majakka suunnitellaan vasta '
      + 'vuonna 1898',
    // 12.4667 E / 56.3 N — en-Wikipedia "Kullaberg"
    laudat: {
      maailmankartta: { x: 6248.9, y: 1105 },
      europe: { x: 450.6, y: 412.9 },
    },
    teksti: 'Kullaberg on Kattegatiin työntyvä niemi ja luonnonsuojelualue Skånessa Möllen '
      + 'kaupungin lähellä. Jyrkät kalliot nousevat suoraan merestä, ja korkein kohta, '
      + 'Håkull, yltää 188 metriin. Alueella on asuttu jo kivikaudella, ja kivikehiä, '
      + 'hautakumpuja ja muinaisten kylien jäänteitä on yhä nähtävissä. Eri ilmansuuntiin '
      + 'aukeavat kalliot luovat erilaisia mikroilmastoja, joten kasvillisuus on '
      + 'poikkeuksellisen monipuolista: harvinainen Lathyrus sphaericus -kasvi tavataan '
      + 'Ruotsissa vain täällä ja yhdessä muussa paikassa. Niemen läntisessä kärjessä on '
      + 'Kullenin majakka, jota pidetään Ruotsin kirkkaimpana.',
    lahde: 'en-Wikipedia "Kullaberg", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-skokloster',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-skokloster-88a59e58.jpg',
      lyhyt: 'Skoklosterin barokkilinna edestä katsottuna.',
      selite: 'Skoklosterin linnan pääjulkisivu ja sinne johtava kuja. Linna rakennettiin '
        + 'barokkityyliin vuosina 1654–1676 kreivi Carl Gustaf Wrangelin toimesta.',
      lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pudelek',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skokloster_castle_(by_Pudelek)_2.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-skokloster-40aba89a.jpg',
        lyhyt: 'Skoklosterin linna ja puistot ilmasta kuvattuna.',
        selite: 'Ilmakuva linnasta, jonka ympärillä on metsää, puistoa ja peltoja. Linna '
          + 'sijaitsee Mälarjärven niemellä Tukholman ja Uppsalan välillä.',
        lahde: 'Valokuva: Kateryna Baiduzha, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kateryna Baiduzha',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skokloster_castle,_aerial_view.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-skokloster-a42db2e2.jpg',
        lyhyt: 'Arcimboldon Vertumnus: kasvot hedelmistä ja vihanneksista.',
        selite: 'Giuseppe Arcimboldon maalaus, jossa keisari Rudolf II:n kasvot on koottu '
          + 'hedelmistä, vihanneksista ja kukista roomalaisen vuodenaikojen jumalan '
          + 'hahmoksi. Teos on Skoklosterin linnan kokoelmissa.',
        lahde: 'Valokuva: Giuseppe Arcimboldo, Wikimedia Commons (Public domain).',
        tekija: 'Giuseppe Arcimboldo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vertumnus_%C3%A5rstidernas_gud_m%C3%A5lad_av_Giuseppe_Arcimboldo_1591_-_Skoklosters_slott_-_91503.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Skoklosterin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Skoklosterin suuri sali on yhä keskeneräinen, ja mitä se kertoo 1600-luvun rakennustyömaasta?',
      'Miksi Arcimboldon maalauksessa keisarin kasvot on tehty hedelmistä ja vihanneksista?',
    ],
    korostukset: ['Keskeneräinen sali|Keskeneräinen sali', 'Arcimboldo|Arcimboldon'],
    nappi: 'Linna on yksityisessä suvun omistuksessa; valtio ostaa sen museoksi vasta vuonna '
      + '1967',
    // 17.6194 E / 59.7038 N — en-Wikipedia "Skokloster Castle"
    laudat: {
      maailmankartta: { x: 6420.6, y: 940.4 },
      europe: { x: 549.5, y: 323.4 },
    },
    teksti: 'Skoklosterin linna on barokkilinna Mälarjärven niemellä Tukholman ja Uppsalan '
      + 'välillä. Sotapäällikkö, kreivi Carl Gustaf Wrangel rakennutti sen vuosina '
      + '1654–1676 Ruotsin suurvalta-ajan muistomerkiksi. Wrangelin kuoltua vuonna 1676 '
      + 'linna jäi keskeneräiseksi, ja suuri juhlasali on säilynyt lähes sellaisena kuin '
      + 'rakentajat sen jättivät. Se tunnetaan nimellä Keskeneräinen sali. Nykyään linna '
      + 'on valtion museo, jonka noin 20 000 esineen kokoelmiin kuuluvat maalaukset, '
      + 'huonekalut, tekstiilit, aseet ja kirjat, muun muassa Giuseppe Arcimboldon '
      + 'Vertumnus-maalaus.',
    lahde: 'en-Wikipedia "Skokloster Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-sigtuna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-sigtuna-9afba53c.jpg',
      lyhyt: 'Sigtunan pääkatu Stora gatan värikkäine puutaloineen.',
      selite: 'Stora gatan on Sigtunan vanha pääkatu, jonka varrella on matalia puutaloja, '
        + 'kahviloita ja pieniä kauppoja.',
      lahde: 'Valokuva: Brorsson, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Brorsson',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stora_gatan_i_Sigtuna_nr_1.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-sigtuna-6ba492e8.jpg',
        lyhyt: 'Holvikaaria Pyhän Olavin kirkon raunioissa.',
        selite: 'Kivestä ja tiilestä muurattuja holvikaaria Sigtunan Pyhän Olavin kirkon '
          + 'raunioissa. Kirkon arvioidaan olevan peräisin 1000-luvun puolivälistä.',
        lahde: 'Valokuva: Arild Vågen, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Arild Vågen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sankt_Olofs_kyrkoruin_september_2013_01.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-sigtuna-d873f932.jpg',
        lyhyt: 'Pyhän Olavin kirkon rauniot ulkoa katsottuna.',
        selite: 'Kirkon kivimuurit ja torni kohoavat vihreiden puiden keskellä. Rauniot ovat '
          + 'muistona Sigtunan keskiaikaisesta kirkkorakentamisesta.',
        lahde: 'Valokuva: Pudelek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pudelek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:St_Olofs_kyrkoruin,_Sigtuna.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Sigtuna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Sigtuna oli aikoinaan tärkeä kaupunki, vaikka se on nykyään pieni?',
      'Miten maankohoaminen voi tehdä satamakaupungista tarpeettoman?',
    ],
    korostukset: ['maankohoaminen|maankohoaminen', 'Pyhän Olavin kirkko|Pyhän Olavin kirkon'],
    nappi: 'Muinainen kuninkaiden ja kauppiaiden kaupunki on kutistunut: 1800-luvun lopulla '
      + 'vain n. 600 asukasta',
    // 17.7167 E / 59.6167 N — en-Wikipedia "Sigtuna"
    laudat: {
      maailmankartta: { x: 6423.9, y: 944.7 },
      europe: { x: 551.4, y: 325.7 },
    },
    teksti: 'Sigtuna perustettiin Mälarjärven rannalle runsaat tuhat vuotta sitten, '
      + 'satamakaupunkina noin vuoden 980 tienoilla. Se toimi noin 250 vuotta '
      + 'kuninkaallisena ja kaupallisena keskuksena ja oli yksi Ruotsin tärkeimmistä '
      + 'kaupungeista. Lyhyen aikaa 900-luvun lopulla ja 1000-luvun alussa täällä lyötiin '
      + 'Ruotsin ensimmäiset kolikot. Kaupunki alkoi menettää merkitystään 1200-luvulla, '
      + 'koska jääkauden jälkeinen maankohoaminen vaikeutti laivaliikennettä. Vanhasta '
      + 'kukoistuksesta kertovat yhä useiden kirkkojen rauniot, kuten 1000-luvun '
      + 'puolivälistä peräisin olevan Pyhän Olavin kirkon rauniot, sekä vanha pääkatu '
      + 'Stora gatan.',
    lahde: 'en-Wikipedia "Sigtuna", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Miksi Sigtunan merkitys alkoi vähetä 1200-luvulla?',
      vaihtoehdot: [
        'Suuri tulipalo tuhosi kaupungin kokonaan',
        'Kuninkaat muuttivat pois Ruotsin rajamaille',
        'Maankohoaminen vaikeutti laivaliikennettä',
        'Kauppiaat siirtyivät kalastamaan Atlantille',
      ],
      oikea: 2,
      fakta: 'Kaupungin vaakuna voidaan jäljittää vanhimpaan tunnettuun sinettiin vuodelta '
        + '1311. Nykyään Tukholman Arlandan lentokenttä on vain noin 10 kilometrin päässä.',
    },
  },
  {
    id: 'hahmotelma-gripsholm',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-gripsholm-5fe3c8c8.jpg',
      lyhyt: 'Gripsholmin punatiilinen linna ja sisäänkäynti puusiltoineen.',
      selite: 'Gripsholmin linna kaakosta kuvattuna: punatiilinen rakennus, kivinen perusmuuri '
        + 'ja portille johtava silta. Nykyisen linnan rakennutti Kustaa Vaasa vuosina '
        + '1537–1545.',
      lahde: 'Valokuva: Arkland, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Arkland',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gripsholms_slott_med_vindbryggan.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-gripsholm-752892b3.jpg',
        lyhyt: 'Gripsholmin punatiilinen pyöreä torni ja pihan rakennuksia.',
        selite: 'Kuvassa linnan tiilinen, pyöreä torni ja siihen liittyviä rakennuksia; edessä '
          + 'on vanhoja tykkejä. Kustaa Vaasan rakennuttamassa linnassa on pyöreät '
          + 'kulmatornit.',
        lahde: 'Valokuva: ThomasLendt, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'ThomasLendt',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gripsholm_Castle_May_2018.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-gripsholm-11991860.jpg',
        lyhyt: 'Kustaa III:n linnateatteri Gripsholmissa.',
<<<<<<< HEAD
        selite: 'Kustaa III:n rakennuttama teatteri sijaitsee linnan pyöreässä tornissa. Se on '
          + 'yksi Euroopan parhaiten säilyneistä 1700-luvun teattereista.',
=======
        selite: 'Kustaa III:n rakennuttama teatteri sijaitsee linnan pyöreässä tornissa. '
          + 'Commonsin mukaan se on yksi Euroopan parhaiten säilyneistä 1700-luvun '
          + 'teattereista.',
>>>>>>> origin/main
        lahde: 'Valokuva: ArildV, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'ArildV',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Slottsteatern_Gripsholm_2016_01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Gripsholmin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä kartusiaaniluostarille tapahtui, kun Ruotsi siirtyi uskonpuhdistukseen?',
      'Miksi kuningas Kustaa III rakennutti linnaan oman teatterin?',
    ],
    korostukset: ['kartusiaaniluostari|kartusiaaniluostari', 'Bo Jonsson Grip|Bo Jonsson Grip'],
    nappi: 'Kuninkaallinen linna on ollut museo jo vuodesta 1822: siellä on kansallinen '
      + 'muotokuvagalleria',
    // 17.2192 E / 59.2561 N — en-Wikipedia "Gripsholm Castle"
    laudat: {
      maailmankartta: { x: 6407.3, y: 962.6 },
      europe: { x: 541.8, y: 335.2 },
    },
    teksti: 'Gripsholmin linna sijaitsee Mariefredissä Mälarjärven rannalla, noin 60 '
      + 'kilometriä Tukholmasta länteen. Ensimmäisen linnoituksen rakennutti 1370-luvulla '
      + 'Bo Jonsson Grip, ja 1400-luvun lopulta noin 30 vuoden ajan paikalla toimi '
      + 'kartusiaaniluostari. Luostari lakkautettiin uskonpuhdistuksen aikana vuonna 1526, '
      + 'ja kuningas Kustaa Vaasa rakennutti nykyisen linnan vuosina 1537–1545 yhdeksi '
      + 'kuningassuvun pääasunnoista. Kustaa III:n aikana linnaan lisättiin teatteri '
      + 'yhteen torneista. Vuodesta 1822 rakennuksessa on toiminut Ruotsin kansallinen '
      + 'muotokuvagalleria, joka on yksi maailman vanhimmista muotokuvakokoelmista.',
    lahde: 'en-Wikipedia "Gripsholm Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-ystad',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-ystad-0e1a3731.jpg',
      lyhyt: 'Lilla Västergatan Ystadissa, taustalla Marian kirkon torni.',
      selite: 'Kapea katu ja värikkäitä vanhoja taloja Ystadin keskustassa. Taustalla kohoaa '
        + 'Sankta Maria -kirkon torni.',
      lahde: 'Valokuva: OleNeitzel, Wikimedia Commons (CC BY 4.0).',
      tekija: 'OleNeitzel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lilla_V%C3%A4stergatan,_Ystad,_Sweden.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-ystad-49dfc98f.jpg',
        lyhyt: 'Ystadin fransiskaanien luostarin itäjulkisivu.',
        selite: 'Gråbrödraklostret eli fransiskaanien luostari, jonka julkisivu on kuvattu '
          + 'idästä. Luostari perustettiin Ystadiin vuonna 1267, ja se on yksi Ruotsin '
          + 'parhaiten säilyneistä keskiaikaisista luostareista.',
        lahde: 'Valokuva: David Castor (dcastor), Wikimedia Commons (CC0).',
        tekija: 'David Castor (dcastor)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gr%C3%A5br%C3%B6draklostret_i_Ystad_01.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-ystad-50c184a4.jpg',
        lyhyt: 'Ystadin Stortorget eli pääaukio vanhoine rakennuksineen.',
        selite: 'Stortorget on Ystadin pääaukio, jota reunustavat vanhat rakennukset.',
        lahde: 'Valokuva: Mickaël Delcey (Silverkey), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Mickaël Delcey (Silverkey)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ystad_stortorget.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Ystad',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Ystad kuului ensin Tanskalle ja sitten Ruotsille?',
      'Mitä on tiiligotiikka, ja mistä sen tunnistaa Ystadin kirkoista?',
    ],
    korostukset: ['Hansaliitto|Hansaliittoon', 'tiiligotiikka|tiiligotiikkaa'],
    nappi: 'Rautatie on tullut jo 1866, ja Ystads Allehanda -lehti perustetaan vuonna 1873',
    // 13.8333 E / 55.4167 N — en-Wikipedia "Ystad"
    laudat: {
      maailmankartta: { x: 6294.4, y: 1146.4 },
      europe: { x: 476.8, y: 436.1 },
    },
    teksti: 'Ystad on kaupunki Skånessa Etelä-Ruotsissa. Asutus syntyi 1000-luvulla, kun '
      + 'kalastajaperheet asettuivat Vassa-joen suulle ja sillinkalastuksesta tuli tärkein '
      + 'elinkeino. Kaupunki mainitaan asiakirjoissa ensimmäisen kerran vuonna 1244, ja '
      + '1300-luvulla se liittyi Hansaliittoon. Tanskalle kuulunut Skåne siirtyi Ruotsille '
      + 'Roskilden rauhassa 1658. Vanhassa kaupungissa on säilynyt keskiaikaista '
      + 'rakennuskantaa, kuten fransiskaanien luostari ja Neitsyt Marian kirkko, jotka '
      + 'edustavat tiiligotiikkaa.',
    lahde: 'en-Wikipedia "Ystad", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-lacko',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-lacko-4805bc85.jpg',
      lyhyt: 'Läckön linna ilmasta: valkoiset seinät ja punaiset tornit veden ympäröimällä '
        + 'niemellä.',
      selite: 'Ilmakuvassa Läckö kohoaa Vänern-järven ympäröimällä kallioniemellä. '
        + 'Keskiaikainen linna sai nykyisen ilmeensä pääosin 1600-luvulla De la Gardien '
        + 'suvun aikana.',
      lahde: 'Valokuva: L.G.foto, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'L.G.foto',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:0283L%C3%A4ck%C3%B6_slott.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-lacko-f4079e74.jpg',
        lyhyt: 'Läckön linna heijastuu tyynestä vedestä auringonlaskun valossa.',
        selite: 'Kuvan mukaan linna on kuvattu Kållandsön saarella auringonlaskun aikaan. Vesi '
          + 'ja pilvinen taivas tekevät linnan ympärille tunnelmallisen maiseman.',
        lahde: 'Valokuva: Billy Palmius, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Billy Palmius',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:L%C3%A4ck%C3%B6_Slott_vid_solnedg%C3%A5ng.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-lacko-1debcef8.jpg',
        lyhyt: 'Läckön linnan sisäpiha: kaarikäytäviä, vaakunalaattoja ja kaksi patsasta.',
        selite: 'Sisäpihan seinillä on holvikaaria, vaakunalaattoja ja patsaita. Pihan '
          + 'kaarikäytävät lisättiin 1600-luvulla Magnus Gabriel De la Gardien aikana, ja '
          + 'pihalla esitetään nykyään joka kesä ooppera.',
        lahde: 'Valokuva: Netha Hussain, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Netha Hussain',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:L%C3%A4ck%C3%B6_slott_interior_02.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Läckön linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Fläskgraven on, ja miksi sen kerrotaan syntyneen sianlihan avulla?',
      'Mitä Läckölle tapahtui uskonpuhdistuksen jälkeen, ja kuka teki siitä loistavan aatelislinnan?',
    ],
    korostukset: ['Fläskgraven|Fläskgraven', 'Brynolf Algotsson|Brynolf Algotsson'],
    nappi: 'Loiston ajat ohi: arvokkaimmat muotokuvat vietiin Gripsholmiin ja irtaimistoa '
      + 'myytiin huutokaupassa vuonna 1830',
    // 13.22 E / 58.675 N — en-Wikipedia "Läckö Castle"
    laudat: {
      maailmankartta: { x: 6274, y: 991.1 },
      europe: { x: 465, y: 350.4 },
    },
    teksti: 'Läckön linna on keskiaikainen linna Vänern-järven Kållandsön saarella '
      + 'Länsi-Götanmaalla, noin 25 kilometriä Lidköpingistä pohjoiseen. Skaran piispa '
      + 'Brynolf Algotsson laski sen perustukset vuonna 1298: alun perin kyse oli muurin '
      + 'ympäröimästä linnakkeesta, jossa oli kaksi tai kolme rakennusta. Kustaa Vaasa '
      + 'otti linnan haltuunsa uskonpuhdistuksen jälkeen 1527, ja 1600-luvulla De la '
      + 'Gardien suku laajensi sitä ja koristeli sen maalauksin ja stukkein; huoneita on '
      + 'noin 248. Kalliossa on 27 metriä syvä Fläskgraven-kuilu, jonka Olaus Magnus '
      + 'kertoi vuonna 1554 syntyneen kuumentamalla kalliota palavalla sianlihalla. '
      + 'Nykyään linna on kansallismonumentti, ja sen sisäpihalla esitetään joka heinäkuu '
      + 'ooppera.',
    lahde: 'en-Wikipedia "Läckö Castle", johdanto-osa ja osiot "History" ja "Building" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-marstrand',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-marstrand-2462216a.jpg',
      lyhyt: 'Carlstenin linnoitus ilmasta: kiviset muurit, sisäpiha ja pyöreä torni.',
      selite: 'Ilmakuvassa näkyvät 1600-luvun Carlstenin linnoituksen muurit, rakennukset ja '
        + 'sisäpiha. Linnoitus on nimetty kuningas Kaarle X Kustaan mukaan.',
      lahde: 'Valokuva: Jenbuc, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Jenbuc',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Carlstens_Fastning_Flygfoto.JPG',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-marstrand-8f784e8b.jpg',
        lyhyt: 'Marstrandin saari asuintaloineen ja venesatamineen auringonlaskun aikaan.',
        selite: 'Panoraamassa näkyvät saaren rakennukset ja venesatama; saaren korkeimmalla '
          + 'kohdalla kohoaa Carlstenin linnoitus. Saari sijaitsee Ruotsin '
          + 'länsirannikolla, ja se on suosittu purjehduskohde.',
        lahde: 'Valokuva: Peterannlov, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Peterannlov',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Carlsten_Fortress_at_Marstrand.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-marstrand-626219ce.jpg',
        lyhyt: 'Carlstenin linnoitus kohoaa Marstrandin talojen yllä; etualalla on lautta.',
        selite: 'Näkymä vesiltä: linnoituksen kivimuurit ja pyöreä torni hallitsevat saaren '
          + 'kyläasutusta. Kuvan etualalla on lautta.',
        lahde: 'Valokuva: Wazeld, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Wazeld',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Carlstens_f%C3%A4stning,_Marstrand.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Marstrand',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä vapaasatama tarkoitti, ja miksi Marstrandiin ehti sen aikana syntyä juutalaisyhteisö?',
      'Miksi Carlstenin linnoitus on nimetty juuri kuningas Kaarle X Kustaan mukaan?',
    ],
    korostukset: ['Carlsten|Carlstenin', 'vapaasatama|vapaasatamaksi'],
    nappi: 'Vapaasataman (1775–1794) ja silakkakalastuksen aika ohi; nyt Marstrand on '
      + 'merikylpypaikka',
    // 11.5833 E / 57.8833 N — en-Wikipedia "Marstrand"
    laudat: {
      maailmankartta: { x: 6219.4, y: 1029.5 },
      europe: { x: 433.6, y: 371.3 },
    },
    teksti: 'Marstrand on pieni merenrantakylä Kungälvin kunnassa Länsi-Götanmaalla, ja se on '
      + 'saanut nimensä saaresta, jolla se sijaitsee. Asukkaita oli vuonna 2010 vain noin '
      + '1 300, mutta historiallisista syistä paikkaa kutsutaan usein kaupungiksi: '
      + 'kaupunkioikeudet sillä on ollut vuodesta 1200. Kustaa III julisti Marstrandin '
      + 'vapaasatamaksi vuosiksi 1775–1794, ja hänen myöntämänsä uskonnonvapaus '
      + 'mahdollisti juutalaisyhteisön synnyn; yksi Pohjoismaiden ensimmäisistä '
      + 'synagogista perustettiin Fredriksborgin linnakkeeseen 1780. Maisemaa hallitsee '
      + '1600-luvun Carlstenin linnoitus. Vapaasataman ja silakkakalastuksen hiipumisen '
      + 'jälkeen Marstrand vakiintui 1800-luvulla merikylpypaikaksi.',
    lahde: 'en-Wikipedia "Marstrand", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kivik',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kivik-2ffdab97.jpg',
      lyhyt: 'Kiviksen Kuninkaanhaudan sisäänkäynti pyöreän kiviröykkiön muurissa.',
      selite: 'Kuninkaanhauta on pronssikautinen pyöreä hautapaikka, jonka halkaisija on 75 '
        + 'metriä. Kuvassa näkyy kiviröykkiön muurissa oleva sisäänkäynti.',
      lahde: 'Valokuva: User Fantomen on sv.wikipedia, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'User Fantomen on sv.wikipedia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kivik_Kungagraven.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kivik-006b8d76.jpg',
        lyhyt: 'Näkymä Kuninkaanhaudan ovelta ulos kivimuurien välistä.',
        selite: 'Kuvassa katsotaan hautaröykkiön ovelta kivetyn käytävän ja kivimuurien '
<<<<<<< HEAD
          + 'ylitse. Taustalla on rakennus, jota kuvataan majataloksi.',
=======
          + 'ylitse. Taustalla on rakennus, jota Commonsin kuvaus kutsuu majataloksi.',
>>>>>>> origin/main
        lahde: 'Valokuva: Schorle, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Schorle',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kungagraven_Kivik_(21).JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kivik-6116d054.jpg',
        lyhyt: 'Kuninkaanhaudan kivilaattoja museoinnissa, joissa on kuvia ja merkkejä.',
        selite: 'Kuvassa näkyvät Bredarörin eli Kuninkaanhaudan kammion kivilaatat, joihin on '
          + 'kuvattu hahmoja ja symboleja. Kuvassa on myös kaksi kävijää.',
        lahde: 'Valokuva: Arkland, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Arkland',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kungagraven_Bredar%C3%B6r_gravh%C3%A4llar.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kivik',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi pronssikauden ihmiset rakensivat halkaisijaltaan 75 metrin kivihautapaikan?',
      'Miksi juuri silakka, omenat ja siideri ovat Kiviksen tunnusmerkkejä?',
    ],
    korostukset: ['Kungagraven|Kuninkaanhauta', 'Stenshuvud|Stenshuvudin'],
    nappi: 'Pronssikautinen hautapaikka Österlenin rannikolla; markkina-, silakka- ja '
      + 'omenakylä',
    // 14.2333 E / 55.6833 N — en-Wikipedia "Kivik"
    laudat: {
      maailmankartta: { x: 6307.8, y: 1134 },
      europe: { x: 484.5, y: 429.1 },
    },
    teksti: 'Kivik on noin 960 asukkaan taajama Simrishamnin kunnassa Skånen Österlenin '
      + 'alueella Etelä-Ruotsissa. Paikka tunnetaan vuosittaisista heinäkuun '
      + 'markkinoistaan sekä runsaasta silakan, omenoiden ja omenasiiderin tuotannostaan. '
      + 'Kylän tunnetuin nähtävyys on Kuninkaanhauta (Kungagraven), pronssikautinen pyöreä '
      + 'hautapaikka. Sen halkaisija on 75 metriä, mikä tekee siitä Ruotsin suurimman '
      + 'laatuaan. Kylän eteläpuolella on Stenshuvudin kansallispuisto.',
    lahde: 'en-Wikipedia "Kivik", johdanto-osa (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä aikakautena Kiviksen Kuninkaanhauta on peräisin?',
      vaihtoehdot: [
        'Kivikaudelta',
        'Pronssikaudelta',
        'Rautakaudelta',
        'Viikinkiajalta',
      ],
      oikea: 1,
      fakta: 'Kiviksen markkinat kestävät yleensä kolme päivää, heinäkuun kolmannesta '
        + 'maanantaista keskiviikkoon, ja niillä myydään suuria määriä silakkaa, omenoita '
        + 'ja siideriä.',
    },
  },
  {
    id: 'hahmotelma-varberg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-varberg-7bca56a6.jpg',
      lyhyt: 'Varbergin linnoitus talvella ilmasta: vallihauta, muurit ja meri taustalla.',
      selite: 'Lumen peittämä linnoitus ja sitä ympäröivä vallihauta rannikolla. Linnoitus '
        + 'rakennettiin 1287–1300, ja nykyään siinä toimii museo.',
      lahde: 'Valokuva: Kateryna Baiduzha, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kateryna Baiduzha',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Varbergs_f%C3%A4stning_2023.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-varberg-e3d3bcc3.jpg',
        lyhyt: 'Varbergin linnoituksen muuri kohoaa rantakallioiden takaa.',
        selite: 'Linnoitus etelästä katsottuna. Paksut kivimuurit ja nurmipeitteiset vallit '
          + 'kertovat sen sotilaallisesta menneisyydestä; sotilaskäytössä se oli vuoteen '
          + '1830.',
        lahde: 'Valokuva: David J from Skara, Sweden., Wikimedia Commons (CC BY 2.0).',
        tekija: 'David J from Skara, Sweden.',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Varbergs_f%C3%A4stning_fr%C3%A5n_s%C3%B6der.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-varberg-6d48bd38.jpg',
        lyhyt: 'Mukulakivikatu ja vanhoja rakennuksia Varbergin linnoituksen sisällä.',
        selite: 'Kuva linnoituksen sisäpuolelta: mukulakivikatu, vaaleat rakennukset ja vahva '
          + 'kivimuuri. Linnoitusta on käytetty myös vankilana vuoteen 1931.',
        lahde: 'Valokuva: Wolfgangus Mozart, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Wolfgangus Mozart',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Varbergs_f%C3%A4stning_2010_a.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Varbergin linnoitus',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Halland kuului 1300-luvulla osittain Norjalle, ja miten se päätyi lopulta Ruotsille?',
      'Miksi 1300-luvun vaatteet ovat museolle niin harvinainen aarre?',
    ],
    korostukset: ['Bocksten Man|Bocksten-miehen', 'Brömsebro|Brömsebron'],
    nappi: 'Vanha linnoitus toimii vankilana; sotilaskäyttö päättyi 1830, vankila sulkeutuu '
      + 'vasta 1931',
    // 12.24 E / 57.1067 N — en-Wikipedia "Varberg Fortress"
    laudat: {
      maailmankartta: { x: 6241.3, y: 1066.7 },
      europe: { x: 446.2, y: 391.7 },
    },
    teksti: 'Varbergin linnoitus on entinen linnake Hallandin läänissä Länsi-Ruotsissa, ja '
      + 'nykyään siinä toimii museo. Kreivi Jacob Nielsen rakennutti sen vuosina 1287–1300 '
      + 'suojaksi Tanskan kuningas Erik VI:ta vastaan norjalaisten avustuksella, ja vuonna '
      + '1305 linnoitus siirtyi Norjalle. Sitä piiritettiin useita kertoja 1500-luvulla, '
      + 'ja Tanskan Christian IV vahvisti sitä myöhemmin; Brömsebron rauhan jälkeen 1645 '
      + 'se tuli Ruotsille. Linnoitus oli sotilaskäytössä vuoteen 1830 ja vankilana '
      + '1600-luvun lopulta vuoteen 1931. Museon kokoelmiin kuuluvat Bocksten-miehen '
      + '1300-luvun vaatteet, ainoa kokonainen yhden ihmisen käyttämä 1300-luvun asu, sekä '
      + 'luoti, jonka uskotaan surmanneen Kaarle XII:n.',
    lahde: 'en-Wikipedia "Varberg Fortress", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-rattvik',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-rattvik-0f066689.jpg',
      lyhyt: 'Rättvikin kirkon torni ja vanhat hirsiset kirkkotallit.',
      selite: 'Valkoinen kirkontorni kohoaa hirsisten kirkkotallien (kyrkstallar) yllä. '
        + 'Talleihin kirkkovieraat jättivät aikoinaan hevosensa.',
      lahde: 'Valokuva: Annalovisa, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Annalovisa',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:R%C3%A4ttviks_kyrka_med_kyrkstallar.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-rattvik-631d319c.jpg',
        lyhyt: 'Rivi hirsisiä kirkkotalleja vesistön rannalla.',
        selite: 'Vanhat kirkkotallit riviin rakennettuina; taustalla näkyy vesistö. Tällaisia '
          + 'talleja on Rättvikin kirkon ympärillä.',
        lahde: 'Valokuva: TS Eriksson, Wikimedia Commons (CC BY 3.0).',
        tekija: 'TS Eriksson',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kyrkstallar_R%C3%A4ttviks_kyrka.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-rattvik-71ebdb94.jpg',
        lyhyt: 'Rättvikin kirkko Siljan-järven rannalla.',
        selite: 'Kuva on otettu järven puolelta: valkoinen kirkko seisoo rannalla, taustalla '
          + 'metsäinen kukkula ja kylän taloja.',
        lahde: 'Valokuva: Henrik Riomar, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Henrik Riomar',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:R%C3%A4ttviks_kyrka_fr%C3%A5n_Siljan.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Rättvik',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi kirkon ympärille rakennettiin kokonainen rivi kirkkotalleja?',
      'Miksi Dalhalla-ooppera pidetään entisessä kalkkikivilouhoksessa eikä tavallisessa oopperatalossa?',
    ],
    korostukset: ['kyrkstallar|kyrkstallar', 'Dalhalla|Dalhalla-ooppera'],
    nappi: 'Kansanmusiikistaan tunnettu Siljanin rannan kunta; Boda erotetaan siitä omaksi '
      + 'kunnakseen vasta 1875',
    // 15.1333 E / 60.8833 N — en-Wikipedia "Rättvik"
    laudat: {
      maailmankartta: { x: 6337.8, y: 881.4 },
      europe: { x: 501.8, y: 292.4 },
    },
    teksti: 'Rättvik on taajama Siljan-järven itärannalla Taalainmaan läänissä '
      + 'Keski-Ruotsissa. Se tunnetaan vanhasta kansanmusiikkiperinteestään ja Siljanin '
      + 'rannan kauniista maisemista, ja monilla Ruotsin kiertomatkoilla se on mukana '
      + 'esimerkkinä perinteisestä ruotsalaisesta elämäntavasta. Veden äärellä seisoo '
      + 'kuvauksellinen vanha kirkko, jota ympäröivät kirkkotallit (kyrkstallar): niihin '
      + 'kirkkovieraat jättivät ennen hevosensa. Joka vuosi rannalla järjestetään '
      + 'kansanmusiikkifestivaali Music at Siljan, ja seitsemän kilometriä pohjoiseen '
      + 'avoimessa kalkkikivilouhoksessa on kesäisin Dalhalla-ooppera.',
    lahde: 'en-Wikipedia "Rättvik Municipality", johdanto-osa ja osio "Town" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-jokkmokk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-jokkmokk-cdd84c0e.jpg',
      lyhyt: 'Ájtte-museon rakennus Jokkmokkissa; etualalla poroveistos.',
<<<<<<< HEAD
      selite: 'Ájtte on Ruotsin vuori- ja saamelaismuseo Jokkmokkissa (ruotsiksi Svenskt '
        + 'fjäll- och samemuseum). Museo on yksi Jokkmokkin saamelaisiin liittyvistä '
        + 'laitoksista.',
=======
      selite: 'Ájtte on Ruotsin vuori- ja saamelaismuseo Jokkmokkissa (Commonsin nimi Svenskt '
        + 'fjäll- och samemuseum). Artikkelin mukaan museo on yksi Jokkmokkin saamelaisiin '
        + 'liittyvistä laitoksista.',
>>>>>>> origin/main
      lahde: 'Valokuva: Dove SV, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Dove SV',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C3%81jtte,_Svenskt_fj%C3%A4ll-_och_samemuseum.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-jokkmokk-bde97a07.jpg',
        lyhyt: 'Jokkmokkin talvimarkkinat vuonna 2023: kojuja lumisella kadulla.',
        selite: 'Markkinakatu illan valossa. Jokkmokkin markkinoita on pidetty vuodesta 1605, '
          + 'ja tapahtuma on yksi saamelaisten tärkeimmistä yhteisötapahtumista.',
        lahde: 'Valokuva: Tunegravity, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tunegravity',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jokkmokks_marknad_2023.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-jokkmokk-8f8f5e59.jpg',
        lyhyt: 'Lule-saamelaisalueen turkis- ja nahkakenkiä Ájtte-museossa.',
        selite: 'Museoesineenä ovat kengät Lule-saamelaiselta alueelta, ja niiden etusaumassa '
          + 'on punaista kangasta. Kuvan esineet ovat Ájtte-museosta.',
        lahde: 'Valokuva: Åsa Sundqvist, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Åsa Sundqvist',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:H%C3%A4rnskor_fr%C3%A5n_lulesamiskt_omr%C3%A5de_med_b%C3%A4llingskinn_och_h%C3%A4rna_som_botten._R%C3%B6tt_kl%C3%A4de_i_s%C3%B6mmen_framtill.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Jokkmokk',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Jokkmokkin markkinat pidetään keskellä talvea, vaikka pakkanen voi olla −40 astetta?',
      'Miksi Jokkmokk on saamelaisille niin tärkeä paikka?',
    ],
    korostukset: ['Ájtte|Ájtte-museo', 'Sápmi|Sápmissa'],
    nappi: 'Napapiirin pohjoispuolinen markkinapaikka, jossa markkinoita on pidetty jo yli '
      + '260 vuotta',
    // 19.8333 E / 66.6167 N — en-Wikipedia "Jokkmokk"
    laudat: {
      maailmankartta: { x: 6494.4, y: 577.4 },
      europe: { x: 592, y: 141.6 },
    },
    teksti: 'Jokkmokk on Norrbottenin läänissä, Lapin maakunnassa sijaitseva taajama aivan '
      + 'napapiirin pohjoispuolella. Sen lule-saamenkielinen nimi tarkoittaa ”joen '
      + 'mutkaa”, koska paikan halki mutkittelee joki. Jokkmokk on tärkeä paikka '
      + 'saamelaisille: siellä on useita saamelaisiin liittyviä laitoksia, kuten '
      + 'koulutuskeskus, Ájtte-museo ja Ruotsin saamelaiskäräjien toimisto. Jokkmokkin '
      + 'markkinoita on pidetty vuodesta 1605, ja joka helmikuun ensimmäisenä torstaina '
      + 'tuhannet ihmiset kokoontuvat kaupunkiin konsertteihin, näyttelyihin ja kauppaan. '
      + 'Tapahtuma on yksi saamelaisten tärkeimmistä yhteisötapahtumista Sápmissa, ja '
      + 'pakkanen voi laskea sen aikana jopa −40 asteeseen.',
    lahde: 'en-Wikipedia "Jokkmokk", johdanto-osa (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä Jokkmokkin lule-saamenkielinen nimi tarkoittaa?',
      vaihtoehdot: [
        'Kylmä järvi',
        'Poron polku',
        'Napapiirin portti',
        'Joen mutka',
      ],
      oikea: 3,
      fakta: 'Jokkmokk on talvilämpötiloissa Ruotsin kylmin kuntakeskus: se sijaitsee 250 '
        + 'metrin korkeudessa vuoristojen juurella, ja öisin ilma jäähtyy lämpötilan '
        + 'inversion vuoksi. Kesäisin paikalla on yötön yö.',
    },
  },
  {
    id: 'hahmotelma-vimmerby',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-vimmerby-cc74fb58.jpg',
      lyhyt: 'Keltaisia taloja Vimmerbyn keskustassa Storgatan-kadun varrella.',
      selite: 'Näkymä Vimmerbyn pääkadulta Storgatanilta, jossa vanhat rakennukset reunustavat '
<<<<<<< HEAD
        + 'katua. Kadun muoto on säilynyt keskiajalta ja kaupungissa on paljon vanhoja '
        + 'puutaloja.',
=======
        + 'katua. Artikkelin mukaan kadun muoto on säilynyt keskiajalta ja kaupungissa on '
        + 'paljon vanhoja puutaloja.',
>>>>>>> origin/main
      lahde: 'Valokuva: I99pema, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'I99pema',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Storgatan,_Vimmerby_02.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-vimmerby-7738c797.jpg',
        lyhyt: 'Vimmerbyn uusklassinen kirkko ja sen kellotorni sivusta kuvattuna.',
        selite: 'Vimmerbyn kirkko valmistui vuosina 1854–1855 uusklassiseen tyyliin, ja sen '
          + 'länsipäässä on kellotorni. Kuva on otettu kesäkuussa 2008.',
        lahde: 'Valokuva: Västgöten, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Västgöten',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vimmerby_kyrka,_den_23_juni_2008,_bild_6.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-vimmerby-ddc70268.jpg',
        lyhyt: 'Keltainen kellotornillinen rakennus ja suihkulähde Vimmerbyn keskustassa.',
        selite: 'Kuva on otettu Vimmerbyn keskustassa kesäkuussa 2008; edustalla on '
          + 'suihkulähde ja taustalla kellotornillinen rakennus.',
        lahde: 'Valokuva: Västgöten, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Västgöten',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vimmerby,_den_23_juni_2008,_bild_7.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Vimmerby',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miten yhden kirjailijan lapsuus on tehnyt pienestä Vimmerbystä matkailukohteen?',
      'Miksi kaupungin pääkatu Storgatan kertoo yhä keskiajasta?',
    ],
    korostukset: ['Astrid Lindgren|Astrid Lindgrenin', 'Storgatan|Storgatan'],
    nappi: 'Tuore kirkko (1854–55) ja keskiaikainen pääkatu; Astrid Lindgren syntyy vasta '
      + 'vuonna 1907',
    // 15.85 E / 57.6667 N — en-Wikipedia "Vimmerby"
    laudat: {
      maailmankartta: { x: 6361.7, y: 1039.9 },
      europe: { x: 515.5, y: 377 },
    },
    teksti: 'Vimmerby on Kalmarin läänissä sijaitseva kaupunki, jonka läpi virtaa pieni '
      + 'Stångån-joki. Kaupunkioikeudet se sai jo 1300-luvulla, ja pääkatu Storgatan on '
      + 'yhä samassa muodossa kuin keskiajalla; lisäksi kaupungissa on paljon vanhoja '
      + 'puutaloja. Nykyisin Vimmerby on tunnettu kirjailija Astrid Lindgrenin (1907–2002) '
      + 'kotiseutuna: hänen kirjojensa aiheisiin perustuva huvipuisto Astrid Lindgrenin '
      + 'maailma houkuttelee kävijöitä ympäri maailmaa. Emil Lönnebergasta kertovia '
      + 'kirjoja kirjoittaessaan Lindgren käytti paljon omaa lapsuuttaan Vimmerbyn '
      + 'maaseudulla. Kaupungin uusklassinen kirkko rakennettiin vuosina 1854–1855.',
    lahde: 'en-Wikipedia "Vimmerby", johdanto-osa ja osio "Overview; Vimmerby Church" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Milloin Vimmerbyn nykyinen uusklassinen kirkko rakennettiin?',
      vaihtoehdot: [
        '1654–1655',
        '1754–1755',
        '1854–1855',
        '1913–1914',
      ],
      oikea: 2,
      fakta: 'Kirkon graniittinen kastemalja on paljon kirkkoa vanhempi, noin vuodelta 1200. '
        + 'Saarnatuoli on tehty vuonna 1713, ja alttaritaulun maalasi Sven Alfred Thörne '
        + 'vuonna 1877.',
    },
  },
  {
    id: 'hahmotelma-kalix',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kalix-f9685a06.jpg',
      lyhyt: 'Kalixin punainen kirkko jyrkkine tiilikattoineen kesäpäivänä.',
      selite: 'Kalixin kirkon rakentaminen alkoi 1400-luvun alkupuoliskolla, ja se mainitaan '
        + 'ensimmäisen kerran kirjallisesti vuonna 1472 päivätyssä anekirjeessä.',
      lahde: 'Valokuva: Xauxa (Håkan Svensson), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Xauxa (Håkan Svensson)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalix_kyrka_view.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kalix-e9654e7c.jpg',
        lyhyt: 'Lusikallinen oranssia Kalixin löjromia, muikun mätiä.',
<<<<<<< HEAD
        selite: 'Kalixin löjrom on muikun mätiä. Jokien makea vesi tekee sen mausta '
          + 'ainutlaatuisen. Kuva on vuodelta 2010.',
=======
        selite: 'Kalixin löjrom on muikun mätiä. Artikkelin mukaan jokien makea vesi tekee sen '
          + 'mausta ainutlaatuisen. Kuva on vuodelta 2010.',
>>>>>>> origin/main
        lahde: 'Valokuva: Dalmato99, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Dalmato99',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Caviar_of_Kalix.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-kalix-ab0c5657.jpg',
        lyhyt: 'Kalixjoen ranta Kalixin keskustassa: laituri, punainen vene ja punainen '
          + 'rakennus.',
<<<<<<< HEAD
        selite: 'Näkymä Kalixjoen yli Centrumkajen-rantaan Kalixin keskustassa; rannalla '
          + 'toimii Kalixin kalastusmuseo. Joen vanhan nimen uskotaan tarkoittaneen '
          + '”kylmää jokea”.',
=======
        selite: 'Näkymä Kalixjoen yli Centrumkajen-rantaan Kalixin keskustassa; Commonsin '
          + 'kuvauksen mukaan rannalla toimii Kalixin kalastusmuseo. Joen vanhan nimen '
          + 'uskotaan tarkoittaneen ”kylmää jokea”.',
>>>>>>> origin/main
        lahde: 'Valokuva: Villr99, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Villr99',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Centrumkajen_i_Kalix_vid_Kalixälven_2013.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kalix',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi Kalixin muikunmäti maistuu erilaiselta kuin muualta saatu?',
      'Mitä Kalixissa tapahtui vuonna 1809, ja miksi se oli Suomelle niin tärkeää?',
    ],
    korostukset: ['Kalix Löjrom|Kalixin löjrom', 'Gáláseatnu|Gáláseatnu'],
    nappi: 'Suomen sodan antautuminen Kalixissa oli tapahtunut 64 vuotta aiemmin, vuonna 1809',
    // 23.1667 E / 65.85 N — en-Wikipedia "Kalix"
    laudat: {
      maailmankartta: { x: 6605.6, y: 619.8 },
      europe: { x: 656, y: 161.7 },
    },
    teksti: 'Kalix on Norrbottenin läänin paikkakunta ja saman nimisen kunnan keskus. Nimen '
      + 'uskotaan tulevan saamen sanasta Gáláseatnu eli ”kylmä joki”, joka oli Kalixjoen '
      + 'vanha nimi. Alueen tunnetuin erikoisuus on Kalixin löjrom, muikun mäti: '
      + 'ympäröivien suurten jokien makea vesi antaa sille ainutlaatuisen maun, ja EU on '
      + 'suojannut nimen maantieteellisellä merkinnällä. Rannikon edustalla on 792 saarta, '
      + 'ja paikkakunnan vanhin nähtävyys on 1400-luvulla rakennettu Kalixin kirkko. '
      + 'Vuonna 1809 Ruotsin armeija antautui Kalixissa Suomen sodassa, mikä käytännössä '
      + 'luovutti Suomen Venäjälle.',
    lahde: 'en-Wikipedia "Kalix", johdanto-osa ja osiot "Kalix Löjrom; Sites of interest; '
      + 'History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-leksand',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-leksand-5f306d50.jpg',
      lyhyt: 'Leksandin kirkko lumisena tammikuussa, katolla ruskea sipulikupoli.',
      selite: 'Keltainen Leksandin kirkko lumisen hautausmaan takana; katon keskellä on '
        + 'tornikupoli. Kuva on otettu tammikuussa 2011.',
      lahde: 'Valokuva: Jan Ainali, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Jan Ainali',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Leksands_kyrka_2011.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-leksand-3f16b9f3.jpg',
        lyhyt: 'Näkymä Siljanille Leksandin Hjortnäsin kylästä varhaisessa värivalokuvassa.',
        selite: 'Autokromi-värivalokuva, joka on otettu noin vuosien 1900 ja 1925 välillä: '
          + 'edustalla pieni hirsirakennus ja taustalla Siljan-järven vesi.',
        lahde: 'Valokuva: John Hertzberg (1871-1895), Wikimedia Commons (Public domain).',
        tekija: 'John Hertzberg (1871-1895)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vy_mot_Siljan,_Hjortnäs_by_i_Leksand_-_Nordiska_Museet_-_NMA.0031748.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-leksand-6568122c.jpg',
        lyhyt: 'Ilmakuva Leksandin seudusta: metsiä, peltoja ja punaisia taloja.',
        selite: 'Lentokuva Leksandin kunnan alueelta Dalarnan läänistä, otettu elokuussa 2012. '
          + 'Kuvassa näkyy, kuinka asutus ja pellot ovat metsän keskellä.',
        lahde: 'Valokuva: Calle Eklund/V-wolf, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Calle Eklund/V-wolf',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Leksand_från_ovan_(1).JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Leksand',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Siljan-järven avovesi voi aiheuttaa keväällä yllättäviä lumipyryjä?',
      'Miksi ruotsalaisessa pikkukaupungissa toimii amerikkalaisen baseball-liigan tukema akatemia?',
    ],
    korostukset: ['Leksandsbröd|Leksandsbrödiä', 'Siljan|Siljan'],
    nappi: 'Siljanin ja Österdalälvenin yhtymäkohta; baseball-seura perustetaan vasta '
      + '1950-luvun lopulla',
    // 15 E / 60.7333 N — en-Wikipedia "Leksand"
    laudat: {
      maailmankartta: { x: 6333.3, y: 889 },
      europe: { x: 499.2, y: 296.3 },
    },
    teksti: 'Leksand on Dalarnan läänin paikkakunta Siljan-järven eteläisellä lahdella, jossa '
      + 'järvi laskee Österdalälven-jokeen. Se on tunnettu Leksands IF '
      + '-jääkiekkojoukkueesta, joka on voittanut neljä Ruotsin mestaruutta. '
      + 'Paikkakunnalla toimii myös Ruotsin vanhimpiin kuuluva baseball-seura, joka '
      + 'perustettiin 1950-luvun lopulla, sekä vuonna 2006 perustettu Baseball Academy '
      + 'Leksand: se on Major League Baseballin tukema ja osa pyrkimystä kehittää '
      + 'eurooppalaisia pelaajia. Paikallista teollisuutta on Leksandsbrödiä valmistava '
      + 'näkkileipäyritys. Siljan jäätyy talvisin, mutta avovesi voi silti aiheuttaa '
      + 'runsaita lumipyryjä: toukokuussa 2008 alueelle satoi yllättäen 30 senttiä lunta.',
    lahde: 'en-Wikipedia "Leksand", johdanto-osa ja osiot "Sport; Climate; Industry" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-granna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-granna-8322f1e1.jpg',
      lyhyt: 'Näkymä vuorelta Grännan punakattoisiin taloihin, kirkkoon ja Vätternille.',
      selite: 'Kuva on otettu vuorelta käsin: alla levittäytyy Grännan kaupunki ja sen kirkko, '
        + 'ja taustalla siintää Vättern.',
      lahde: 'Valokuva: Florencia.wk, Wikimedia Commons (Public domain).',
      tekija: 'Florencia.wk',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gränna.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-granna-5105e68e.jpg',
        lyhyt: 'Raidallisia polkagris-karkkeja myynnissä Grännassa.',
        selite: 'Polkagris on Grännassa alun perin valmistettu mintunmakuinen karkkitanko. '
          + 'Kuva on otettu Grännassa vuonna 2008, ja siinä karkkeja on lajiteltu riveihin '
          + 'makujen ja värien mukaan.',
        lahde: 'Valokuva: Niklas Morberg, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Niklas Morberg',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Polkagrisar_in_Granna.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-granna-c64b736d.jpg',
        lyhyt: 'Brahehusin linnanraunion kaarevat ikkuna-aukot ja kivimuurit.',
        selite: 'Brahehusin linnan jäljelle jääneet muurit Grännan lähellä; ikkuna-aukoista '
          + 'näkyy maisemaa. Linnan rakentaminen alkoi vuonna 1638, mutta tuli tuhosi sen '
          + 'vuonna 1708.',
        lahde: 'Valokuva: kallerna, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'kallerna',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Brahehus_Gränna_2.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Gränna',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi polkagris-karkki on tehnyt pienestä Grännasta tunnetun?',
      'Mitä Brahehusin linnalle tapahtui, ja mikä siitä on jäljellä?',
    ],
    korostukset: ['polkagris|polkagris', 'Brahehus|Brahehusin'],
    nappi: 'Polkagris-karkki on vasta 14-vuotias keksintö, ja Brahehusin linna on ollut '
      + 'raunio vuodesta 1708',
    // 14.4667 E / 58.0167 N — en-Wikipedia "Gränna"
    laudat: {
      maailmankartta: { x: 6315.6, y: 1023 },
      europe: { x: 489, y: 367.8 },
    },
    teksti: 'Gränna on pieni kaupunki Vätternin itärannalla, noin 40 kilometriä Jönköpingistä '
      + 'pohjoiseen. Kreivi Per Brahe perusti sen vuonna 1652, ja jyrkkine katuineen ja '
      + 'vanhoine puutaloineen se sijaitsee Grännavuoren juurella. Gränna on tunnettu '
      + 'punavalkoisesta polkagris-karkkitangosta (kirjaimellisesti ”polkkasika”), jonka '
      + 'leski Amalia Eriksson valmisti ensimmäisen kerran vuonna 1859. Kaupungista lähtee '
      + 'lauttayhteys Visingsön saarelle, ja ilmapalloilija S. A. Andrée, joka kuoli '
      + 'yrittäessään ilmapallolla pohjoisnavalle, oli kotoisin täältä. Lähellä kohoavan '
      + 'Brahehusin linnan rakentaminen alkoi vuonna 1638, mutta linna jäi keskeneräiseksi '
      + 'ja paloi vuonna 1708.',
    lahde: 'en-Wikipedia "Gränna", johdanto-osa ja osio "History and academic development" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä sana polkagris tarkoittaa kirjaimellisesti?',
      vaihtoehdot: [
        'Polkkatanssi',
        'Polkkasika',
        'Mintunvarsi',
        'Raitatikku',
      ],
      oikea: 1,
      fakta: 'Amalia Erikssonin patsas seisoo nykyään puistossa Grännavuoren juurella. '
        + 'Grännan museo esittelee polkagrisin historian lisäksi näyttelyn '
        + 'Andrée-retkikunnasta vuodelta 1897.',
    },
  },
  {
    id: 'hahmotelma-halsingegardar',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-halsingegardar-61fc7701.jpg',
      lyhyt: 'Erik-Andersin punainen kaksikerroksinen hirsinen päärakennus Söderalassa.',
      selite: 'Erik-Andersin päärakennus Astan kylässä Söderalan pitäjässä Hälsingessä. Talon '
        + 'rakennutti uudelleen talonpoika Erik Andersson vuosina 1813–1827.',
      lahde: 'Valokuva: Annika64, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Annika64',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Erik-Anders_1.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-halsingegardar-e670aa7f.jpg',
        lyhyt: 'Maalattuja seiniä ja koristereunuksia Erik-Andersin huoneessa.',
        selite: 'Huoneen seinät on koristeltu maalatuilla kuvioilla ja reunuksilla, ja '
          + 'huoneessa on katettu pöytä. Maalatut sisustukset ovat keskeinen osa sitä '
          + 'perinnettä, jonka vuoksi Hälsingen tilat on nimetty maailmanperintökohteeksi.',
        lahde: 'Valokuva: Tulipasylvestris, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tulipasylvestris',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hälsingegård_Erik-Anders_-_rumsinteriör.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-halsingegardar-01c5ae32.jpg',
        lyhyt: 'Gästgivars, yksi Hälsingen maailmanperintötiloista Vallstassa.',
        selite: 'Gästgivars kuuluu samaan Unescon maailmanperintökohteeseen kuin Erik-Anders; '
<<<<<<< HEAD
          + 'se sijaitsee Vallstassa Bollnäsin kunnassa. Kuvassa kaksikerroksinen '
=======
          + 'artikkeli sijoittaa sen Vallstaan Bollnäsin kuntaan. Kuvassa kaksikerroksinen '
>>>>>>> origin/main
          + 'päärakennus ja oikealla toinen rakennus.',
        lahde: 'Valokuva: Catasa, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Catasa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gästgivars.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Hälsingen koristellut maatilat',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miten Taalainmaan kiertävät maalarit ja kallis tuontitapetti muuttivat talonpoikaisten huoneiden seinät?',
      'Mitä Erik-Anders-tilalle tapahtui, kun Erik Anderssonin perheen onni kääntyi?',
    ],
    korostukset: ['Erik-Anders|Erik-Anders', 'Knutesmålarna|Knutesmålarna'],
    nappi: 'Päärakennuksen rakentanut Erik Andersson (1788–1874) oli vielä elossa; talo oli '
      + 'valmistunut 1827',
    // 16.9933 E / 61.2722 N — en-Wikipedia "Erik-Anders"
    laudat: {
      maailmankartta: { x: 6399.8, y: 861.7 },
      europe: { x: 537.5, y: 282.1 },
    },
    teksti: 'Hälsingen koristellut maatilat ovat vuodesta 2012 Unescon maailmanperintökohde: '
      + 'seitsemän 1800-luvulla rakennettua tilaa edustaa alueen puurakennus- ja '
      + 'maalauskoristelun perinnettä. Suuret päärakennukset tehtiin pelkästä puusta, ja '
      + 'niiden sisällä seinillä on maalauksia, kaavamaalauksia ja kallista '
      + 'tuontitapettia. Yksi seitsemästä on Erik-Anders Söderalassa Söderhamnin kunnassa. '
      + 'Talon nimi tulee talonpoika Erik Anderssonista (1788–1874), joka rakennutti '
      + 'päärakennuksen uudelleen vuosina 1813–1827. Vastaanottohuoneen värikkäät '
      + 'koristeet teki Rättvikin maalarien ryhmä Knutesmålarna. Perheen menestys hiipui '
      + 'myöhemmin, ja tila vaihtoi omistajaa useasti, mutta rakennuksia on entisöity '
      + 'vuodesta 1993.',
    lahde: 'en-Wikipedia "Decorated Farmhouses of Hälsingland", johdanto-osa ja osio '
      + '"History"; en-Wikipedia "Erik-Anders", johdanto-osa ja osiot "History; '
      + 'Architecture et decoration" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-karlskoga',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-karlskoga-14de3d5b.jpg',
      lyhyt: 'Björkbornin kartano Karlskogassa, jossa Alfred Nobel asui kesäisin.',
<<<<<<< HEAD
      selite: 'Valkoinen kaksikerroksinen kartanorakennus ympäröivine puistoineen. Nobel asui '
        + 'Björkbornin kartanossa kesäisin 1894–1896.',
=======
      selite: 'Valkoinen kaksikerroksinen kartanorakennus ympäröivine puistoineen. Artikkelin '
        + 'mukaan Nobel asui Björkbornin kartanossa kesäisin 1894–1896.',
>>>>>>> origin/main
      lahde: 'Valokuva: Eskil Malmberg, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Eskil Malmberg',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bj%C3%B6rkborns_herrg%C3%A5rd.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-karlskoga-66228703.jpg',
        lyhyt: 'Alfred Nobelin vuoden 1895 laboratorion jäljennös Björkbornin museossa.',
        selite: 'Museoon on rekonstruoitu Nobelin laboratorio, ja nurkassa istuu Nobelia '
          + 'esittävä hahmo. Kuvan henkilöt ovat museon hahmoja.',
        lahde: 'Valokuva: Tomas er, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Tomas er',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nobel_laboratory_Bj%C3%B6rkborn_museum_1.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-karlskoga-5b264f82.jpg',
        lyhyt: 'Karlskogan kirkko punaisine seinineen ja vihreine tornin huippuineen.',
        selite: 'Punaseinäinen kirkko, jonka patinoitunut vihreä tornin huippu erottuu '
<<<<<<< HEAD
          + 'pilvistä taivasta vasten. Seurakunnan vanhin kirkko voidaan jäljittää '
          + '1600-luvulle.',
=======
          + 'pilvistä taivasta vasten. Artikkelin mukaan seurakunnan vanhin kirkko voidaan '
          + 'jäljittää 1600-luvulle.',
>>>>>>> origin/main
        lahde: 'Valokuva: AleWi, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'AleWi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Karlskoga_kyrka,_20220902.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Karlskoga',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Alfred Nobelin testamentti rekisteröitiin juuri Karlskogassa?',
      'Miksi Karlskogan seutu kehittyi rautateollisuuden alueeksi eikä pelkäksi maatalousseuduksi?',
    ],
    korostukset: ['Björkborn|Björkbornin', 'Bofors|Boforsin'],
    nappi: 'Boforsin rautaruukki muuttui osakeyhtiöksi juuri tänä vuonna; Nobel tulee mukaan '
      + 'vasta 1894',
    // 14.5167 E / 59.3333 N — en-Wikipedia "Karlskoga"
    laudat: {
      maailmankartta: { x: 6317.2, y: 958.8 },
      europe: { x: 489.9, y: 333.1 },
    },
    teksti: 'Karlskoga on kaupunki Örebron läänissä Möckeln-järven pohjarannalla. Seudun '
      + 'metsät ja kukkulat sopivat maanviljelyä paremmin rautatyöhön, ja 1600-luvulla '
      + 'alueelle perustettiin neljätoista pientä ruukkia ja kahdeksan vesivoimalla '
      + 'toimivaa vasaraa, muun muassa Björkbornin ja Boforsin ruukit. Useimmat ruukit '
      + 'toimivat vielä 1860-luvulla, mutta hallitseva oli Bofors: vuonna 1871 se tuotti 6 '
      + '124 tonnia rautaa, enemmän kuin mikään muu ruukki Ruotsissa. Yhtiö perustettiin '
      + 'osakeyhtiönä 1873 ja erikoistui 1880-luvulta lähtien tykkien valmistukseen, ja '
      + 'kaupunki kasvoi sen ympärille. Alfred Nobel omisti Boforsin vuodesta 1894 '
      + 'kuolemaansa 1896 asti. Hänen laillinen kotipaikkansa oli Björkbornin kartano, '
      + 'joten hänen testamenttinsa rekisteröitiin Karlskogassa, ja Nobel-palkinnon '
      + 'perustaminen tuli mahdolliseksi.',
    lahde: 'en-Wikipedia "Karlskoga", johdanto-osa ja osio "Industrial era" ja "Alfred Nobel" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Millä alalla Boforsin yhtiö erikoistui 1880-luvulta alkaen?',
      vaihtoehdot: [
        'Laivojen rakentamiseen',
        'Tykkien valmistukseen',
        'Tekstiilien kutomiseen',
        'Paperin valmistukseen',
      ],
      oikea: 1,
      fakta: 'Karlskogan seudulle asettui 1580-luvulla suomalaisia kaskeamaan tulleita '
        + 'uudisasukkaita: vuonna 1649 jopa 32 tilaa 186:sta oli suomalaisten hallussa. '
        + 'Nykyään Karlskogan kunta on virallisesti suomenkielinen hallintokunta (vuodesta '
        + '2012).',
    },
  },
  {
    id: 'hahmotelma-eskilstuna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-eskilstuna-a7a07950.jpg',
      lyhyt: 'Punaisia puurakennuksia Rademachersmedjornan kadun varrella Eskilstunassa.',
      selite: 'Rademachersmedjorna eli \'Rademacherin takomot\' on Eskilstunan vanha takomoalue. '
<<<<<<< HEAD
        + 'Karl Gustavs Stad rakennettiin seppä Reinhold Rademacherin takomoiden '
        + 'ympärille.',
=======
        + 'Artikkelin mukaan Karl Gustavs Stad rakennettiin seppä Reinhold Rademacherin '
        + 'takomoiden ympärille.',
>>>>>>> origin/main
      lahde: 'Valokuva: Calle Eklund/V-wolf, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Calle Eklund/V-wolf',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rademachersmedjorna_04.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-eskilstuna-015466c3.jpg',
        lyhyt: 'Eskilstunaån-joen ranta ja rakennukset heijastuvat tyyneen veteen.',
        selite: 'Eskilstunaån virtaa kaupungin läpi ja yhdistää Hjälmaren- ja Mälaren-järvet. '
          + 'Kuvassa joen rannan talot peilautuvat veteen marraskuussa 2020.',
        lahde: 'Valokuva: Jssfrk, Wikimedia Commons (CC0).',
        tekija: 'Jssfrk',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eskilstuna%C3%A5n_nov_2020.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-eskilstuna-b2054cd1.jpg',
        lyhyt: 'Vanha punainen puurakennus ja portti Rademachersmedjornan alueella.',
        selite: 'Kuva Rademachersmedjornasta Eskilstunassa. Punaiseksi maalatut puurakennukset '
          + 'ja kivetty katu ovat osa vanhaa takomoaluetta.',
        lahde: 'Valokuva: Calle Eklund/V-wolf, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Calle Eklund/V-wolf',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rademachersmedjorna_01.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Eskilstuna',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mitä kaikkea Eskilstunan pajoissa ja tehtaissa valmistettiin aseiden lisäksi?',
      'Miksi Eskilstunaa on verrattu englantilaiseen Sheffieldiin?',
    ],
    korostukset: ['Rademacher|Rademacherin', 'Stålstaden|Stålstaden'],
    nappi: 'Karl Gustavs Stadin takomot ovat vielä oma kaupunkinsa; yhdistyminen Eskilstunaan '
      + 'tapahtuu vasta 1879',
    // 16.5097 E / 59.3708 N — en-Wikipedia "Eskilstuna"
    laudat: {
      maailmankartta: { x: 6383.7, y: 956.9 },
      europe: { x: 528.2, y: 332.1 },
    },
    teksti: 'Eskilstuna sijaitsee Eskilstunaån-joen varrella, joka yhdistää Hjälmaren- ja '
      + 'Mälaren-järvet. Joen länsirannalle perustettiin 1600-luvulla Karl Gustavs Stad, '
      + 'jonka ydin oli seppä Reinhold Rademacherin takomot; hanketta tuki kuningas Kaarle '
      + 'X Kustaa. Ensimmäisiä tuotteita olivat pienaseet ja tykit. Vuodesta 1771 alue oli '
      + 'vapaakaupunki, jossa käsityöläiset ja valmistajat saivat perustaa verovapaita '
      + 'pajoja ja tehtaita. Teollisen vallankumouksen aikana Eskilstunasta kasvoi yksi '
      + 'Ruotsin tärkeimmistä teollisuuskaupungeista, ja se sai lempinimen Stålstaden eli '
      + 'teräksen kaupunki. Aseiden lisäksi täällä valmistettiin taltta, aterimia, saksia, '
      + 'avaimia, työstökoneita ja tarkkuusinstrumentteja. Karl Gustavs Stad liitettiin '
      + 'Eskilstunaan vuonna 1879.',
    lahde: 'en-Wikipedia "Eskilstuna", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä lempinimen Eskilstuna sai teollisen vallankumouksen aikana?',
      vaihtoehdot: [
        'Rautakaupunki (Järnstaden)',
        'Työkalukaupunki (Verktygsstaden)',
        'Asekaupunki (Vapenstaden)',
        'Teräksen kaupunki (Stålstaden)',
      ],
      oikea: 3,
      fakta: 'Kaupungin nimi tulee englantilaisesta pyhästä Eskilistä, jonka luostari \'Tuna\' '
        + 'oli paikalla keskiajalla; Kustaa Vaasa tuhosi luostarin uskonpuhdistuksen '
        + 'aikana. Kaupungin ensimmäiset kaupunkioikeudet myönnettiin vasta vuonna 1659.',
    },
  },
  {
    id: 'hahmotelma-norrkoping',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-norrkoping-22c6d61d.jpg',
      lyhyt: 'Entinen Holmens bruk -tehdasrakennus joen rannalla Norrköpingissä.',
      selite: 'Keltainen tehdasrakennus ja punatiilisiä teollisuusrakennuksia Motala ströminin '
<<<<<<< HEAD
        + 'varrella; oikealla virtaa koski. Tunnettu Holmenin paperitehdas ilmoitti '
        + 'sulkemisestaan vuonna 1970.',
=======
        + 'varrella; oikealla virtaa koski. Artikkelin mukaan tunnettu Holmenin '
        + 'paperitehdas ilmoitti sulkemisestaan vuonna 1970.',
>>>>>>> origin/main
      lahde: 'Valokuva: ArildV, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'ArildV',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Holmens_bruk_October_2024_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-norrkoping-451086cd.jpg',
        lyhyt: 'Norrköpingin teollisuusmaisema Motala ströminin varrella mustavalkokuvassa.',
<<<<<<< HEAD
        selite: 'Industrilandskapet on hyvin säilynyt historiallinen teollisuusalue joen '
          + 'varrella, jossa teollistuminen alkoi 1600-luvulla. Joen varrella sijaitsivat '
          + 'aikanaan vanhat tekstiilitehtaat.',
=======
        selite: 'Commonsin kuvauksen mukaan Industrilandskapet on hyvin säilynyt '
          + 'historiallinen teollisuusalue joen varrella, jossa teollistuminen alkoi '
          + '1600-luvulla. Artikkeli kertoo, että joen varrella sijaitsivat aikanaan '
          + 'vanhat tekstiilitehtaat.',
>>>>>>> origin/main
        lahde: 'Valokuva: Arild Vågen, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Arild Vågen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Industrilandskapet_Norrk%C3%B6ping_February_2017.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-norrkoping-9ae90f84.jpg',
        lyhyt: 'Holmens bruk vuonna 1858: Geskel Salomonin maalaus joen rannalta.',
        selite: 'Maalauksessa savuavat tehdasrakennukset ja koski, ja etualalla kulkee '
          + 'ihmisiä. Se antaa kuvan Norrköpingin joenvarsiteollisuudesta 1800-luvun '
          + 'puolivälissä. Kuvaa on suurennettu, joten se on alkuperäistä (1008 px) '
          + 'pehmeämpi.',
        lahde: 'Valokuva: Geskel Saloman, Wikimedia Commons (Public domain).',
        tekija: 'Geskel Saloman',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Holmens_bruk_1858_av_Geskil_Salomon.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Norrköping',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Miksi Norrköpingistä kasvoi juuri Motala ströminin suulle merkittävä teollisuuskaupunki?',
      'Miksi keskiaikaisesta Norrköpingistä ei ole nykyään jäljellä mitään?',
    ],
    korostukset: ['Motala ström|Motala ström', 'Louis De Geer|Louis De Geer'],
    nappi: 'Motala ströminin vesivoimalla kasvanut teollisuuskaupunki; paperitehdas on '
      + 'toiminut jo vuodesta 1854',
    // 16.2 E / 58.6 N — en-Wikipedia "Norrköping"
    laudat: {
      maailmankartta: { x: 6373.3, y: 994.7 },
      europe: { x: 522.2, y: 352.4 },
    },
    teksti: 'Norrköping sijaitsee Motala ström -joen suulla Bråvikenin lahden pohjukassa '
      + 'Itä-Götanmaalla. Joen vesivoima ja hyvä satama edistivät kaupungin nopeaa kasvua, '
      + 'ja siitä tuli tekstiiliteollisuudestaan tunnettu teollisuuskaupunki. Vuonna 1618 '
      + 'kaupunkiin perustettiin asetehdas, ja samaan aikaan käynnistyi laaja '
      + 'tekstiilituotanto; tärkeä tukija oli teollisuusmies Louis De Geer. Hänen '
      + 'kuollessaan 1652 Norrköpingissä oli 6 000 asukasta, ja se oli Ruotsin toiseksi '
      + 'suurin kaupunki. Tulipalot ja venäläisten polttama kaupunki vuonna 1719 '
      + 'hävittivät keskiaikaisen kaupungin, eikä siitä ole jäljellä mitään. Palojen '
      + 'jälkeen puutalot kiellettiin, ja 1800-luvulla teollisuus kasvoi edelleen: Motala '
      + 'ströminin varrelle rakennettiin muun muassa puuvillan jalostuslaitos ja vuonna '
      + '1854 sanomalehtipaperiin erikoistunut paperitehdas.',
    lahde: 'en-Wikipedia "Norrköping", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-gammelstad',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-gammelstad-c267ed89.jpg',
      lyhyt: 'Nederluleån kirkko ja sitä ympäröivät kirkkomajat ilmakuvassa.',
      selite: 'Kivikirkko ja valkoinen kellotorni kohoavat kirkkokylän keskellä, ja ympärillä '
<<<<<<< HEAD
        + 'on punaisia ja vaaleita puutaloja. Kirkko on kylän ainoa kivirakennus.',
=======
        + 'on punaisia ja vaaleita puutaloja. Artikkelin mukaan kirkko on kylän ainoa '
        + 'kivirakennus.',
>>>>>>> origin/main
      lahde: 'Valokuva: Tortap, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Tortap',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nederlule%C3%A5_kyrka_2.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-gammelstad-b3b384b6.jpg',
        lyhyt: 'Punaisia kirkkomajoja kadun varrella Gammelstadin kirkkokylässä.',
        selite: 'Kirkkomajat toimivat kaukaa tulleiden kirkkovieraiden yöpymispaikkoina '
          + 'sunnuntaisin ja juhlapäivinä. Kuvassa punaiseksi maalattuja rakennuksia '
          + 'kapean kadun molemmin puolin.',
        lahde: 'Valokuva: Karl Brodowsky, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Karl Brodowsky',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gammelstad_near_Lule%C3%A5_41701_G32.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-gammelstad-c93ac87f.jpg',
        lyhyt: 'Nederluleån harmaakivikirkko ja valkoinen kellotorni Gammelstadissa.',
<<<<<<< HEAD
        selite: 'Nederluleån kirkko on 1400-luvun lopun kivikirkko, jonka koko kertoo seudun '
          + 'vauraudesta.',
=======
        selite: 'Nederluleån kirkko on 1400-luvun lopun kivikirkko, jonka koko kertoo '
          + 'artikkelin mukaan seudun vauraudesta.',
>>>>>>> origin/main
        lahde: 'Valokuva: Lars Falkdalen Lindahl, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Lars Falkdalen Lindahl',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nederlule%C3%A5_church_October_2011.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Gammelstadin kirkkokylä',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Luleån kaupallinen keskus siirrettiin pois vanhalta kirkkopaikalta?',
      'Miksi kirkkokylän talot olivat käytössä vain sunnuntaisin ja juhlapäivinä?',
    ],
    korostukset: ['Nederluleå|Nederluleån', 'kirkkomajat|kirkkomajat'],
    nappi: 'Vanha kirkkokylä, jonka kehitys pysähtyi 1600-luvun puolivälin jälkeen; '
      + 'Unesco-kohteeksi se tulee vasta 1996',
    // 22.0286 E / 65.6461 N — en-Wikipedia "Gammelstad Church Town"
    laudat: {
      maailmankartta: { x: 6567.6, y: 631 },
      europe: { x: 634.1, y: 167.1 },
    },
    teksti: 'Gammelstadin kirkkokylä sijaitsee noin kymmenen kilometriä Luleån pohjoispuolella '
      + 'Pohjanlahden pohjukassa, ja se on ollut Unescon maailmanperintökohde vuodesta '
      + '1996. Kylän keskellä on 1400-luvun lopun Nederluleån kivikirkko, jota ympäröivät '
      + 'puiset kirkkomajat: niitä on 404. Majat olivat käytössä vain sunnuntaisin ja '
      + 'kirkollisina juhlapäivinä, koska kaukaa maaseudulta tulleet kirkkovieraat eivät '
      + 'pitkän matkan ja ankarien olojen vuoksi päässeet samana päivänä kotiin. '
      + 'Maankohoaminen teki sataman käyttökelvottomaksi 1600-luvulle mennessä, jolloin '
      + 'kaupallinen keskus siirtyi uuteen paikkaan, joka sai nimekseen Luleå; vanha '
      + 'kirkkopaikka nimettiin Gammelstadiksi eli vanhaksi kaupungiksi. Siirto säästi '
      + 'kylän 1800-luvun teollistumiselta.',
    lahde: 'en-Wikipedia "Gammelstad Church Town", johdanto-osa ja osiot "History" ja '
      + '"Buildings" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-almhult',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-almhult-1fbfd487.jpg',
      lyhyt: 'IKEA-museon rakennus Älmhultissa.',
<<<<<<< HEAD
      selite: 'IKEA-museo avattiin Älmhultissa 30. Kesäkuuta 2016, ja se esittelee IKEAn '
=======
      selite: 'IKEA-museo avattiin Älmhultissa 30. kesäkuuta 2016, ja se esittelee IKEAn '
>>>>>>> origin/main
        + 'historiaa.',
      lahde: 'Valokuva: Kigsz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Kigsz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:IKEA-Museum-August-2016.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-almhult-595625bd.jpg',
        lyhyt: 'Älmhultin kirkko: keltainen rakennus ja tumma kellotorni.',
<<<<<<< HEAD
        selite: 'Kuvassa on Älmhultin kirkko Smålandissa. Rakennuksen tumma kellotorni kohoaa '
          + 'vaalean kirkkorakennuksen päältä.',
=======
        selite: 'Commonsin sivun mukaan kuvassa on Älmhultin kirkko Smålandissa. Rakennuksen '
          + 'tumma kellotorni kohoaa vaalean kirkkorakennuksen päältä.',
>>>>>>> origin/main
        lahde: 'Valokuva: MPD01605 from Sterling, Virginia, United States, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'MPD01605 from Sterling, Virginia, United States',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C3%84lmhults_kyrka_2011.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/swe-nosto-almhult-ef924d64.jpg',
        lyhyt: 'Älmhultin rautatieasemarakennus.',
<<<<<<< HEAD
        selite: 'Kuvassa on Älmhultin rautatieasema (Järnvägsstationen i Älmhult).',
=======
        selite: 'Commonsin sivun mukaan kuvassa on Älmhultin rautatieasema (Järnvägsstationen '
          + 'i Älmhult).',
>>>>>>> origin/main
        lahde: 'Valokuva: Sven pe, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Sven pe',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Almhult_railroad_station.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Älmhult',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Miksi juuri Älmhult tunnetaan koko maailmassa IKEAsta?',
      'Millainen paikka Råshult on, ja kuka siellä syntyi?',
    ],
    korostukset: ['IKEA|IKEA', 'Carl von Linné|Carl von Linné'],
    nappi: 'Linnén syntymäseutu, jossa IKEA-kaupunkia ei vielä ole: markkinapaikaksi Älmhult '
      + 'tulee vasta 1901',
    // 14.1333 E / 56.55 N — en-Wikipedia "Älmhult"
    laudat: {
      maailmankartta: { x: 6304.4, y: 1093.2 },
      europe: { x: 482.6, y: 406.3 },
    },
    teksti: 'Älmhult on taajama ja kunnan hallintokeskus Kronobergin läänissä Etelä-Ruotsissa, '
      + 'ja siellä asuu noin 18 000 ihmistä. Paikkakunta irrotettiin Stenbrohultin '
      + 'pitäjästä ja tehtiin markkinakaupungiksi (köping) vuonna 1901. Seudulla syntyi '
      + '1700-luvun alussa kasvitieteilijä Carl von Linné, ja hänen syntymätilansa '
      + 'Råshultissa on nykyään museo, jota ympäröivät yhä samat niityt ja pellot kuin 300 '
      + 'vuotta sitten. Älmhult tunnetaan kuitenkin ennen kaikkea siitä, että sinne '
      + 'rakennettiin ensimmäinen IKEA-myymälä: Ingvar Kamprad kasvoi kunnassa, ja '
      + 'yhtiöllä on yhä suuri toiminta paikkakunnalla. IKEAn historiaa esittelevä '
      + 'IKEA-museo avattiin kaupunkiin 30. kesäkuuta 2016.',
    lahde: 'en-Wikipedia "Älmhult" ja "Älmhult Municipality", johdanto-osat (tarkistettu '
      + '19.9.2026).',
  },
];
