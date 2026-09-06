/*
 * MAASTOKOHTEET — RUS. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs RUS --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/RUS.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on KURATOIDULLA reitillä (tools/fokuskartta/maat.mjs
 * FOKUSMAAT.RUS), joten 4 kohdetta istuu suoraan lehteen poltetun
 * nimen tai hachure-kolmion päälle.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * ── K2-ERÄ 4 6.9.2026: KOHTEITA MAASTON RINNALLE ───────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Venäjällä oli neljätoista karttamerkkiä ja NOLLA kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md), joten koko vaje oli
 * kohteissa. Tässä ovat ne kahdeksan; yhdenkään tyyppi ei ole maastoa,
 * vaan historiaa, kulttuuria, tekniikkaa tai kaupunkia.
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-rus.js:ssä.
 * Sama syy kuin erässä 1: kohdepakki vaatisi rivin
 * js/fokuskohteet.js:n KOHDE_MAAT-tauluun ja lehden poltettujen nimien
 * lohkon (js/packs/fokus-grc.js FOKUS_LISANIMET), eikä kumpaankaan
 * kosketa tässä erässä. Maastokohteiden hakemisto
 * (js/packs/maastokohteet.js) liittää listan peliin sellaisenaan.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Venäjällä on kaksi
 * pelikaupunkia (Moskova ja Pietari), ja etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-listan kaupunkiin; jokaisen
 * kohteen lähin on kirjattu sen oman koordinaattirivin viereen. Lähin
 * koko erässä on Veliki Novgorod 75,9 lautayksikön päässä Pietarista —
 * raja KAUPUNGIN_KOHDALLA_SADE on 7 (js/fokuskohteet.js), joten
 * yksikään ei kuulu kohdekartalle vaan kaikki ovat pääkartan merkkejä.
 *
 * NELJÄ KOHDETTA ON EUROOPAN LAUDAN KAAVAN ITÄPUOLELLA, mutta se ei
 * enää vaikuta mihinkään: erillislaudasta on luovuttu (Raamattu
 * 30.8.2026), eikä uusiin kohteisiin kirjoiteta `europe`-riviä
 * lainkaan. Kaikki kahdeksan osuvat Venäjän fokuslehden rajaukseen
 * (js/packs/fokus-grc.js FOKUS_POHJAT.RUS).
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen, ei kuvaa — sama linja
 * kuin erässä 1. Faktat on tarkistettu en-Wikipediasta kohde
 * kerrallaan 6.9.2026.
 *
 * Venäjän maastokohteet. Faktat en-Wikipediasta 29.8.2026. Venäjällä on KURATOITU fokuslehti (tools/fokuskartta/maat.mjs FOKUSMAAT.RUS), jonka meret ovat JÄÄMERI, BARENTSINMERI, OHOTANMERI ja BERINGINMERI — Barentsinmeren merkki istuu siis lehteen poltetun nimen päälle. Vuoria lehdellä ei ole yhtään. Suurin osa maasta on Euroopan laudan kaavan (lon -11...41) itäpuolella, joten useimmat kohteet saavat vain maailmankartan rivin.
 */
export const MAASTOKOHTEET_RUS = [
  {
    id: 'elbrus',
    nimi: 'Elbrus',
    tyyppi: 'vuori',
    kysymykset: [
      'Onko Elbrus Euroopassa vai Aasiassa?',
      'Milloin Elbrus viimeksi purkautui?',
    ],
    korostukset: ['Kaukasus|Kaukasuksen'],
    nappi: 'Euroopan korkein vuori',
    // 42.4392 E / 43.355 N — en-Wikipedia "Mount Elbrus"
    laudat: {
      maailmankartta: { x: 7248, y: 1669 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Elbrus on Venäjän ja Euroopan korkein vuori. Se on sammunut kerrostulivuori, joka '
      + 'kohoaa 5 642 metriin, ja samalla Euraasian korkein tulivuori sekä maailman '
      + 'kymmenenneksi hallitsevin huippu. Se sijaitsee Kabardi-Balkarian tasavallassa '
      + 'Etelä-Venäjällä ja on Kaukasuksen vuoriston korkein huippu.',
    lahde: 'en-Wikipedia "Mount Elbrus", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'narodnaja',
    nimi: 'Narodnaja',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Narodnaja on kahdessa maanosassa?',
      'Mitä komin nimi Naroda-Iz tarkoittaa?',
    ],
    korostukset: ['Ural|Uralin'],
    nappi: 'Uralin korkein huippu',
    // 60.1167 E / 65.0333 N — en-Wikipedia "Mount Narodnaya"
    laudat: {
      maailmankartta: { x: 7837.2, y: 664.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Narodnajan huipulta sadevesi lähtee kahteen maanosaan. Vuori seisoo Uralin '
      + 'vedenjakajalla, joka on samalla Euroopan ja Aasian raja: Naroda-joki virtaa huipulta '
      + 'kaakkoon Obiin eli Siperiaan, ja Kosju luoteeseen Petšoraan eli Euroopan puolelle. '
      + 'Korkeutta on 1 894 metriä, mikä tekee siitä Uralin korkeimman huipun ja '
      + 'Euroopan-puoleisen Venäjän korkeimman kohdan Kaukasuksen ulkopuolella — ja koska '
      + 'ympärillä ei ole mitään sen veroista, sen suhteellinen korkeus on peräti 1 772 metriä. '
      + 'Komin kielellä vuori on Naroda-Iz, kansan vuori. Rinteillä on pieniä jäätiköitä ja '
      + 'tunturikangasta, laaksoissa harvaa lehtikuusi- ja koivumetsää.',
    lahde: 'en-Wikipedia "Mount Narodnaya", johdanto-osa (tarkistettu 1.9.2026).',
  },
  {
    id: 'barentsinmeri',
    nimi: 'Barentsinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka Willem Barentsz oli?',
      'Miksi Murmansk ei jäädy talvella?',
    ],
    korostukset: ['Willem Barentsz|Willem Barentszilta'],
    nappi: 'Meri, joka on nimetty hollantilaiselta',
    // 38 E / 74.5 N — en-Wikipedia "Barents Sea" — sama piste kuin lehteen poltettu nimi BARENTSINMERI
    laudat: {
      maailmankartta: { x: 7100, y: 100.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Barentsinmeressä ui maailman viimeinen suuri turskakanta, eikä sen kohtaloa '
      + 'ratkaise kumpikaan rantavaltio yksin: Norja ja Venäjä ovat hoitaneet kalastusta '
      + 'yhdessä vuonna 1976 perustetussa yhteiskomissiossa. Meri on Jäämeren reunameri Norjan '
      + 'ja Venäjän pohjoisrannikoilla, jaettu maiden aluevesiksi, ja se lämpenee nopeammin '
      + 'kuin mikään muu osa arktista aluetta — tutkijat puhuvat sen atlantisoitumisesta. '
      + 'Venäläisillä kartoilla se oli 1500-luvulla Murmanskinmeri; nykyinen nimi tulee '
      + 'hollantilaiselta merenkulkijalta Willem Barentszilta, joka johti vuosisadan lopulla '
      + 'ensimmäisiä retkiä kauas pohjoiseen. Venäjän puolella Murmanskin satama pysyy sulana '
      + 'ympäri vuoden lämpimän Pohjois-Atlantin virran ansiosta, ja meren itäkulmalla '
      + 'Petšoran suistossa on oma nimensä: Petšoranmeri.',
    lahde: 'en-Wikipedia "Barents Sea", johdanto-osa sekä osiot "Extent", "Name" ja "Fishing" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'jaameri',
    nimi: 'Jäämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka paksua Jäämeren jää on?',
      'Miksi jotkut kutsuvat sitä Atlantin suistoksi?',
    ],
    korostukset: ['Beringinsalmi|Beringinsalmi'],
    nappi: 'Valtameristä pienin ja matalin',
    // 120 E / 81 N — lehteen poltetun nimen JÄÄMERI paikka (FOKUSMAAT.RUS.meret)
    laudat: {
      maailmankartta: { x: 9833.3, y: -365.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Jäämeri on maailman viidestä valtamerestä pienin, matalin ja kylmin: pinta-alaa noin '
      + '14 060 000 neliökilometriä. Se ulottuu pohjoisnavan ympäriltä etelään noin 60. '
      + 'leveyspiirille ja sitä ympäröivät Euraasia ja Pohjois-Amerikka; rajat kulkevat '
      + 'maastonmuotoja pitkin, Tyynenmeren puolella Beringinsalmi ja Atlantin puolella '
      + 'Grönlanti–Skotlanti-harjanne. Suurimman osan vuodesta se on merijään peitossa. Osa '
      + 'tutkijoista kutsuu sitä Pohjoiseksi napamereksi tai jopa Atlantin suistoksi.',
    lahde: 'en-Wikipedia "Arctic Ocean", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'ohotanmeri',
    nimi: 'Ohotanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mitkä ovat Kuriilit?',
      'Miksi Sahalin on niin pitkä ja kapea?',
    ],
    korostukset: ['Kamtšatka|Kamtšatkan'],
    nappi: 'Meri, joka on nimetty satamalta',
    // 150 E / 54.3 N — lehteen poltetun nimen OHOTANMERI paikka (FOKUSMAAT.RUS.meret)
    laudat: {
      maailmankartta: { x: 10833.3, y: 1198.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ohotanmeri on Luoteis-Tyynenmeren reunameri. Sitä rajaavat idässä Venäjän Kamtšatkan '
      + 'niemimaa, kaakossa Kuriilit, etelässä Japanin Hokkaido, lännessä Sahalinin saari sekä '
      + 'lännessä ja pohjoisessa Itä-Siperian rannikko. Koillisnurkassa on Šelihovinlahti. Meri '
      + 'on saanut nimensä Ohotskin satamasta, joka puolestaan on nimetty Ohota-joen mukaan.',
    lahde: 'en-Wikipedia "Sea of Okhotsk", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'beringinmeri',
    nimi: 'Beringinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka Vitus Bering oli?',
      'Kuinka kapea Beringinsalmi on?',
    ],
    korostukset: ['Vitus Bering|Vitus Beringiltä'],
    nappi: 'Kahden mantereen raja',
    // 180 E / 58.5 N — lehteen poltetun nimen BERINGINMERI paikka (FOKUSMAAT.RUS.meret)
    laudat: {
      maailmankartta: { x: 11833.3, y: 999.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Beringinmeri on Pohjois-Tyynenmeren reunameri, ja yhdessä Beringinsalmen kanssa se '
      + 'muodostaa rajan maailman kahden suurimman mantereen, Euraasian ja Amerikan, välille. '
      + 'Sen pinta-ala on yli 2 000 000 neliökilometriä: idässä ja koillisessa on Alaska, '
      + 'lännessä Venäjän Kaukoitä ja Kamtšatka. Nimi tulee Tanskassa syntyneeltä venäläiseltä '
      + 'merenkulkijalta Vitus Beringiltä, joka vuonna 1728 purjehti ensimmäisenä '
      + 'eurooppalaisena sen halki Tyyneltämereltä pohjoiseen Jäämerelle.',
    lahde: 'en-Wikipedia "Bering Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'volga',
    nimi: 'Volga',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Volga ei laske mereen vaan järveen?',
      'Mikä Rusin kaganaatti oli?',
    ],
    korostukset: ['Kaspianmeri|Kaspianmereen'],
    nappi: 'Euroopan pisin joki',
    // 47.8975 E / 45.695 N — en-Wikipedia "Volga" — joen suisto Kaspianmerellä
    laudat: {
      maailmankartta: { x: 7429.9, y: 1573 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Volga on Euroopan pisin joki ja maailman pisin sisävaluma-alueen joki: 3 531 '
      + 'kilometriä ja valuma-alue 1 360 000 neliökilometriä. Se virtaa Keski-Venäjältä '
      + 'Etelä-Venäjälle ja laskee Kaspianmereen, ei valtamereen. Sitä pidetään yleisesti '
      + 'Venäjän kansallisjokena, ja sen varrelle syntyi noin vuonna 830 varhainen '
      + 'valtiomuodostelma Rusin kaganaatti.',
    lahde: 'en-Wikipedia "Volga", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'ob',
    nimi: 'Ob',
    tyyppi: 'joki',
    kysymykset: [
      'Mitkä ovat Siperian kolme suurta jokea?',
      'Miksi Siperian joet virtaavat pohjoiseen?',
    ],
    korostukset: ['Altai|Altain'],
    nappi: 'Kolmesta Siperian suuresta läntisin',
    // 71.3947 E / 66.5339 N — en-Wikipedia "Ob (river)" — joen suu Obinlahdella
    laudat: {
      maailmankartta: { x: 8213.2, y: 582 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ob on Länsi-Siperian suuri joki, ja yhdessä sivujokensa Irtyšin kanssa se muodostaa '
      + 'maailman seitsemänneksi pisimmän jokijärjestelmän: 5 410 kilometriä. Joki syntyy Bijan '
      + 'ja Katunin yhtymäkohdassa, ja molemmat saavat alkunsa Altain vuorilta. Se on läntisin '
      + 'kolmesta suuresta Siperian joesta, jotka laskevat Jäämereen.',
    lahde: 'en-Wikipedia "Ob (river)", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 4 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston
   * alussa. Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'kizhin-pogosta',
    nimi: 'Kizhin pogosta',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka monta kupolia Kirkastuksen kirkossa on?',
      'Mitä sana pogosta tarkoittaa?',
    ],
    korostukset: ['pogosta|pogosta'],
    nappi: 'Kirkko, joka tehtiin ilman naulaa',
    // 35.225 E / 62.0667 N — en-Wikipedia "Kizhi Pogost";
    // lähin pelikaupunki Pietari 196,1 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 7007.5, y: 821.1 },
    },
    teksti: 'Kizhin pogosta on 1600-luvulle juontuva kokonaisuus Kizhin saarella '
      + 'Äänisellä Karjalan tasavallassa. Sana tarkoittaa aidan sisään jäävää aluetta, '
      + 'ja täällä sen sisällä ovat kaksi suurta puukirkkoa — 22-kupolinen '
      + 'Kirkastuksen kirkko ja 9-kupolinen Esirukouksen kirkko — sekä kellotapuli. '
      + 'Unesco otti kohteen maailmanperintöluetteloonsa 1990.\n\n'
      + 'Rakennusten perusyksikkö on pyöreä mäntyhirsi, halkaisijaltaan noin '
      + 'kolmekymmentä senttiä ja pituudeltaan kolmesta viiteen metriin. Koko pogosta '
      + 'rakennettiin ilman ainuttakaan naulaa, ja tuhannet hirret tuotiin mantereelta '
      + '— aikanaan mittava kuljetusurakka.\n\n'
      + 'Kirkastuksen kirkon alttari laskettiin 6. kesäkuuta 1714. Se on lämmittämätön '
      + 'kesäkirkko, joka nousi salaman polttaman edeltäjänsä paikalle, eikä '
      + 'rakentajien nimiä tiedetä. Tarun mukaan pääkirvesmies käytti koko työhön yhtä '
      + 'kirvestä ja heitti sen valmistuttua järveen sanoen, ettei toista samanlaista '
      + 'ole eikä tule. Kirkko on 37 metriä korkea ja yksi Pohjois-Euroopan '
      + 'korkeimmista puurakennuksista.',
    lahde: 'en-Wikipedia "Kizhi Pogost", johdanto-osa sekä osiot "General '
      + 'information" ja "The Church of the Transfiguration" (tarkistettu 6.9.2026).',
  },
  {
    id: 'solovetskin-luostari',
    nimi: 'Solovetskin luostari',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli Solovetskin kapina?',
      'Mitä luostarissa tuotettiin?',
    ],
    korostukset: ['vanhauskoiset|vanhauskoisten'],
    nappi: 'Linnoitusluostari Vienanmerellä',
    // 35.7106 E / 65.0244 N — en-Wikipedia "Solovetsky Monastery";
    // lähin pelikaupunki Pietari 319,3 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 7023.7, y: 664.9 },
    },
    teksti: 'Solovetskin luostari on linnoitettu luostari Solovetskin saarilla '
      + 'Vienanmerellä Pohjois-Venäjällä. Sen tärkeimmät rakennukset ovat 1500-luvulta, '
      + 'jolloin Filip Kolytšev toimi sen igumenina. Munkki Zosima perusti luostarin '
      + '1436; munkit German ja Savvati olivat asuneet saarella jo vuodesta 1429, ja '
      + 'heitä pidetään sen toisina perustajina.\n\n'
      + 'Luostari kasvoi kaupankäynnin varassa Vienanmeren alueen talous- ja '
      + 'politiikkakeskukseksi. Sillä oli suolakeittimöitä — 1660-luvulla 54 '
      + 'kappaletta — sekä ansapyyntiä, kalastusta, kiillelouhoksia, rautaruukkeja ja '
      + 'helmenkalastusta. 1600-luvulla siellä eli noin 350 munkkia ja 600–700 '
      + 'palvelijaa, käsityöläistä ja talonpoikaa.\n\n'
      + 'Luostari oli myös rajalinnoitus, jossa oli kymmeniä tykkejä ja vahva '
      + 'varuskunta; se torjui Liivinmaan ritarikunnan ja ruotsalaisten hyökkäykset '
      + '1571, 1582 ja 1611. 1650- ja 1660-luvuilla se oli vanhauskoisten tukikohta, '
      + 'ja vuosien 1668–1676 Solovetskin kapina nousi patriarkka Nikonin '
      + 'kirkkouudistusta vastaan. Vuosina 1926–1939 luostari muutettiin '
      + 'neuvostovankilaksi ja työleiriksi, josta tuli koko Gulag-järjestelmän '
      + 'esikuva.',
    lahde: 'en-Wikipedia "Solovetsky Monastery", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kazanin-kreml',
    nimi: 'Kazanin kreml',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka määräsi kremlin rakennettavaksi?',
      'Mikä Söyembikän torni on?',
    ],
    korostukset: ['Söyembikän torni|Söyembikän torni'],
    nappi: 'Kremli khaanien linnan raunioilla',
    // 49.1056 E / 55.7992 N — en-Wikipedia "Kazan Kremlin";
    // lähin pelikaupunki Moskova 382,0 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 7470.2, y: 1128.6 },
    },
    teksti: 'Kazanin kreml on Kazanin kaupungin vanha linnoitus Tatarstanissa. Iivana '
      + 'Julma määräsi sen rakennettavaksi Kazanin khaanien entisen linnan raunioille, '
      + 'ja Unesco listasi sen maailmanperintökohteeksi vuonna 2000. Tsaari kutsui '
      + 'työhön pihkovalaiset rakennusmestarit Postnik Jakovlevin ja Ivan Širjain, '
      + 'jota kutsuttiin Barmaksi.\n\n'
      + 'Vanhin rakennus on Marian ilmestyksen katedraali vuosilta 1554–1562. Se on '
      + 'ainoa 1500-luvun venäläinen kirkko, jossa on kuusi pilaria ja viisi apsista, '
      + 'ja se on rakennettu paikallisesta vaaleasta hiekkakivestä eikä tiilestä. '
      + 'Katedraalin viisikerroksinen kellotorni purettiin 1930.\n\n'
      + 'Näkyvin maamerkki on vino Söyembikän torni, joka on todennäköisesti Pietari '
      + 'Suuren ajalta; tunnettu tarina liittää sen Kazanin khaanikunnan viimeiseen '
      + 'kuningattareen. Kremlin eteläpäätä hallitsee Spasskajan torni, joka on samalla '
      + 'pääsisäänkäynti. Muurien sisällä ovat myös uudelleen rakennettu Kul Šarifin '
      + 'moskeija ja Konstantin Tonin suunnittelema kuvernöörin talo vuosilta '
      + '1843–1853, nykyään Tatarstanin presidentin palatsi.',
    lahde: 'en-Wikipedia "Kazan Kremlin", johdanto-osa ja osio "History and monuments" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'veliki-novgorod',
    nimi: 'Veliki Novgorod',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä Novgorodin tasavalta oli?',
      'Mikä oli hansan kontor?',
    ],
    korostukset: ['hansaliitto|hansaliiton', 'Volhov|Volhov-joen'],
    nappi: 'Tasavalta, joka hallitsi Venäjän pohjoista',
    // 31.2667 E / 58.55 N — en-Wikipedia "Veliky Novgorod";
    // lähin pelikaupunki Pietari 75,9 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 6875.6, y: 997.1 },
    },
    teksti: 'Veliki Novgorod on Novgorodin alueen suurin kaupunki ja hallinnollinen '
      + 'keskus. Se sijaitsee Volhov-joen varrella kuusi kilometriä siitä, mistä joki '
      + 'lähtee Ilmenjärvestä, Moskovan ja Pietarin välisen valtatien varrella. '
      + 'Asukkaita on runsaat 224 000. Nimi tarkoittaa kirjaimellisesti suurta '
      + 'uuttakaupunkia.\n\n'
      + 'Novgorod on Venäjän vanhimpia kaupunkeja, ja se mainitaan lähteissä '
      + 'ensimmäisen kerran 800-luvulla. Vuosina 1136–1478 se oli Novgorodin '
      + 'tasavallan keskus, ja tasavalta hallitsi suurta osaa Venäjän pohjoisesta.\n\n'
      + 'Kaupunki toimi välittäjänä muiden venäläiskaupunkien ja Luoteis-Euroopan '
      + 'välillä ja vaurastui hansaliiton kaupassa; hansan päätoimipaikka eli kontor '
      + 'kaupungissa oli nimeltään Peterhof. Huipussaan 1300-luvulla Novgorod oli '
      + 'Euroopan suurimpia kaupunkeja. Nimen Veliki Novgorod kaupunki sai virallisesti '
      + 'vasta 1999, ja Unesco listasi sen maailmanperintökohteeksi 1992.',
    lahde: 'en-Wikipedia "Veliky Novgorod", johdanto-osa ja osio "Early developments" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kolan-syvareika',
    nimi: 'Kolan syväreikä',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka syvälle reikä ylsi?',
      'Miksi kairaus keskeytettiin vuodeksi?',
    ],
    korostukset: ['maankuori|maankuoreen'],
    nappi: 'Maailman syvin ihmisen tekemä reikä',
    // 30.61 E / 69.3965 N — en-Wikipedia "Kola Superdeep Borehole";
    // lähin pelikaupunki Rovaniemi 233,1 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 6853.7, y: 418.1 },
    },
    teksti: 'Kolan syväreikä SG-3 on syvin ihmisen tekemä reikä maapallolla: se ylsi '
      + 'vuonna 1989 pystysuoraan syvyyteen 12 262 metriä. Kyse oli '
      + 'neuvostoliittolaisesta tiedehankkeesta, jonka tavoite oli tunkeutua '
      + 'maankuoreen niin syvälle kuin mahdollista. Paikka on Kuolan niemimaalla '
      + 'Petšengan piirissä lähellä Norjan rajaa.\n\n'
      + 'Kairaus alkoi 24. toukokuuta 1970 tavallisella öljynporauslautalla '
      + 'Uralmaš-4E, jota oli hieman muunneltu 7 000 metriä varten. Vuonna 1974 '
      + 'paikalle pystytettiin uusi Uralmaš-15000, joka oli nimetty uuden tavoitteen — '
      + 'viidentoista kilometrin — mukaan. Reikiä porattiin kaikkiaan viisi, kukin '
      + 'halkaisijaltaan 23 senttiä.\n\n'
      + '6. kesäkuuta 1979 hanke ohitti aiemman syvyysennätyksen, joka oli Oklahomassa '
      + 'porattu 9 583 metrin Bertha Rogers -reikä. Lokakuussa 1982 ensimmäinen reikä '
      + 'oli 11 662 metrissä. Kun toinen reikä ohitti 12 000 metriä vuonna 1983, '
      + 'kairaus pysäytettiin noin vuodeksi tieteellisten ja juhlallisten vierailujen '
      + 'ajaksi — ja juuri tuo seisokki saattoi osaltaan aiheuttaa rikkoutumisen, kun '
      + 'työ jatkui.',
    lahde: 'en-Wikipedia "Kola Superdeep Borehole", johdanto-osa ja osio "Drilling" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tunguskan-rajahdys',
    nimi: 'Tunguskan räjähdys',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi paikalta ei löydy kraatteria?',
      'Kuinka laajalta alueelta metsä kaatui?',
    ],
    korostukset: ['evenkit|evenkiläiset'],
    nappi: 'Räjähdys, joka ei jättänyt kraatteria',
    // 101.9097 E / 60.9031 N — en-Wikipedia "Tunguska event";
    // lähin pelikaupunki Irkutsk 416,0 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 9230.3, y: 880.4 },
    },
    teksti: 'Tunguskan räjähdys tapahtui Podkamennaja Tunguska -joen lähellä '
      + 'Siperiassa 30. kesäkuuta 1908 aamulla. Sen voimaksi on arvioitu 3–50 '
      + 'megatonnia TNT:tä, ja se kaatoi metsää 2 150 neliökilometrin alalta. '
      + 'Silminnäkijäkertomusten perusteella jopa kolme ihmistä saattoi kuolla.\n\n'
      + 'Syyksi katsotaan meteorin ilmaräjähdys: noin 50–60 metriä leveä kivinen '
      + 'asteroidi tuli itäkaakosta lähes 27 kilometrin sekuntinopeudella ja hajosi '
      + '5–10 kilometrin korkeudessa. Koska se ei osunut maahan, kraatteria ei jäänyt. '
      + 'Kyseessä on suurin tunnetun historian aikana tapahtunut törmäys maapallolla.\n\n'
      + 'Kello 7.14 paikallista aikaa evenkiläiset ja venäläiset uudisasukkaat '
      + 'Baikalin luoteispuolen kukkuloilla näkivät sinertävän valon, joka oli lähes '
      + 'yhtä kirkas kuin aurinko. Noin kymmenen minuuttia myöhemmin kuului tykkitulta '
      + 'muistuttava jyrinä, ja paineaalto kaatoi ihmisiä jaloiltaan ja rikkoi '
      + 'ikkunoita satojen kilometrien päässä. Järistys rekisteröitiin seismisillä '
      + 'asemilla halki Euraasian, ja paineaalto havaittiin Saksassa, Tanskassa, '
      + 'Kroatiassa ja Britanniassa asti.',
    lahde: 'en-Wikipedia "Tunguska event", johdanto-osa ja osio "Description" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tobolskin-kreml',
    nimi: 'Tobolskin kreml',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka oli Semjon Remezov?',
      'Ketkä rakensivat kremliä pakkotyössä?',
    ],
    korostukset: ['Semjon Remezov|Semjon Remezov'],
    nappi: 'Siperian ainoa kivikremli',
    // 68.2531 E / 58.1992 N — en-Wikipedia "Tobolsk Kremlin";
    // lähin pelikaupunki Jekaterinburg 263,8 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 8108.4, y: 1014.2 },
    },
    teksti: 'Tobolskin kreml on Siperian ainoa kivestä rakennettu kreml. Se seisoo '
      + 'Tobolskissa Tjumenin alueella. Kaupunki perustettiin 1587, ja Moskova '
      + 'kannusti rakentamaan sinne kivestä. Vuosina 1683–1686 Moskovasta ja Veliki '
      + 'Ustjugista lähetetyt muurarit pystyttivät kivisen Pyhän Sofian katedraalin, '
      + 'ja 1700-luvun alussa nousivat muurit ja tornit. Työtä valvoi Siperian '
      + 'metropoliitta Paavali.\n\n'
      + '1600-luvun lopulla rakentamista jatkoi Semjon Remezov, kartografi ja Siperian '
      + 'ensimmäinen historioitsija. Hän rakennutti virastopalatsin vuosina 1699–1704 '
      + 'kukkulan eteläisen jyrkänteen päälle ja kauppahallit 1702–1706.\n\n'
      + 'Ruhtinas Gagarin, joka nimitettiin 1708 Siperian läänin ensimmäiseksi '
      + 'kuvernööriksi, halusi kremlistä monumentaalisen hallinto- ja kauppakeskuksen. '
      + 'Töissä käytettiin Tobolskiin karkotettuja ruotsalaisia sotavankeja. Kukkulan '
      + 'sortumisen estämiseksi Tobol-joen uomaa siirrettiin kaksi virstaa '
      + 'etelämmäksi. Vuoden 1714 kivirakentamisen kielto ei pysäyttänyt työtä, joka '
      + 'jatkui vuoteen 1718.',
    lahde: 'en-Wikipedia "Tobolsk Kremlin", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'jasnaja-poljana',
    nimi: 'Jasnaja Poljana',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitkä kaksi romaania kirjoitettiin täällä?',
      'Mitä Jasnaja Poljana tarkoittaa?',
    ],
    korostukset: ['Lev Tolstoi|Lev Tolstoin'],
    nappi: 'Talo, jossa Sota ja rauha syntyi',
    // 37.5261 E / 54.0761 N — en-Wikipedia "Yasnaya Polyana";
    // lähin pelikaupunki Moskova 78,2 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 7084.2, y: 1208.3 },
    },
    teksti: 'Jasnaja Poljana on kirjailijakotimuseo, Lev Tolstoin entinen koti '
      + 'kaksitoista kilometriä Tulasta lounaaseen ja kaksisataa kilometriä '
      + 'Moskovasta. Nimi tarkoittaa kirkasta aukiota. Tolstoi syntyi tässä talossa 9. '
      + 'syyskuuta 1828 ja kirjoitti siellä sekä Sodan ja rauhan että Anna Kareninan; '
      + 'hänet on haudattu lähistölle.\n\n'
      + 'Tila oli alun perin Kartsevin suvun omistuksessa. 1700-luvulla sen osti '
      + 'kenraalimajuri, ruhtinas Sergei Volkonski, ja se siirtyi hänen pojalleen '
      + 'Nikolaille, kirjailijan isoisälle. Nikolai aloitti päärakennuksen '
      + 'rakentamisen 1810 tilan korkeimmalle kohdalle, pystytti tallit, vaunuvajan, '
      + 'kylpyrakennuksen ja kaksi kasvihuonetta sekä istutti ranskalaisen puutarhan, '
      + 'englantilaisen maisemapuiston lampineen ja pitkät koivu- ja tammikujat.\n\n'
      + 'Tolstoi kutsui Jasnaja Poljanaa saavuttamattomaksi kirjalliseksi '
      + 'linnakkeekseen. Kesäkuussa 1921 tila kansallistettiin museoksi, ja sen '
      + 'ensimmäinen johtaja oli kirjailijan tytär Aleksandra Tolstaja. Museossa on '
      + 'Tolstoin henkilökohtaista omaisuutta ja hänen 22 000 niteen kirjastonsa; '
      + 'alueella ovat myös koulu, jonka hän perusti talonpoikaislapsille, ja puisto, '
      + 'jossa on hänen koristelematon hautansa.',
    lahde: 'en-Wikipedia "Yasnaya Polyana", johdanto-osa sekä osiot "Early history" ja '
      + '"Leo Tolstoy at Yasnaya Polyana" (tarkistettu 6.9.2026).',
  },
];

