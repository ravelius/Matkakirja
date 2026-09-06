/*
 * MAASTOKOHTEET — SLE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SLE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SLE.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Sierra Leonen maastokohteet. Faktat en-Wikipediasta 30.8.2026.
 *
 * MAAILMAN ERÄ M12 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Tiwain suojelualue, Outamba-Kilimi, Golan sademetsä, Bo, Kenema,
 * Bumbunan pato, Bonthe ja Kabala. Lähin uusi merkki on Bonthe 39,4
 * lautayksikön päässä Sierra Leone -laatasta (KAUPUNGIN_KOHDALLA_SADE 7),
 * joten kaikki ovat pääkartan merkkejä. Erä on kuvaton, ja jokaisen
 * kohteen lähin pelikaupunki on kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_SLE = [
  {
    id: 'bintumani',
    nimi: 'Bintumani',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on kääpiövirtahepo?',
      'Milloin Loma-vuorten metsästyskielto asetettiin?',
    ],
    korostukset: ['Loma-vuoret|Loma-vuoret'],
    nappi: 'Loma-vuorten korkein',
    // -11.1167 E / 9.225 N — en-Wikipedia "Mount Bintumani"
    laudat: {
      maailmankartta: { x: 5462.8, y: 2903.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sierra Leonen korkeimman vuoren alarinteillä elää eläin, jota harva on nähnyt '
      + 'luonnossa: kääpiövirtahepo. Bintumanin — toiselta nimeltään Loma Mansa — sademetsissä '
      + 'kulkevat sen lisäksi kääpiökrokotiilit, ruostekalapöllöt ja useat kädellislajit. '
      + 'Huippu on 1 945 metriä, ja Loma-vuoret sen ympärillä ovat maan korkein vuorijono. Alue '
      + 'julistettiin metsästyskieltoalueeksi jo 1952, ja suojelualuetta on 33 201 hehtaaria: '
      + 'alempana kasvaa Guinean ja Kongon alankometsää, 1 680 metriin asti ainavihantaa '
      + 'vuoristometsää ja ylätasangolla vuoristoniittyä. BirdLife International on nimennyt '
      + 'alueen kansainvälisesti tärkeäksi lintualueeksi.',
    lahde: 'en-Wikipedia "Mount Bintumani" ja en-Wikipedia "Loma Mountains", johdanto-osa ja osio '
      + '"Environment" (tarkistettu 1.9.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Ketkä ylittivät Atlantin ensimmäisinä?',
      'Miksi vuotta 1492 pidetään käännekohtana?',
    ],
    nappi: 'Länsi-Afrikan portti maailmalle',
    // -13.7 E / 8.1 N — ulappa Freetownin edustalla; artikkelin oma keskipiste on -25 / 0
    laudat: {
      maailmankartta: { x: 5376.7, y: 2940.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Atlantti on maailman toiseksi suurin valtameri, joka erottaa Amerikan mantereet '
      + 'Afrikasta ja Euraasiasta. Ensimmäisinä sen tiedetään ylittäneen norjalaisten '
      + 'viikinkien, mutta vasta Kolumbuksen retki vuonna 1492 avasi valtameren ylittävän '
      + 'liikenteen ja löytöretkien aikakauden. Sierra Leonen koko rannikko avautuu tälle '
      + 'valtamerelle.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'rokel',
    nimi: 'Rokel',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Freetownin satama on niin suuri?',
      'Mikä on Ramsar-kosteikko?',
    ],
    korostukset: ['Freetown|Freetownin'],
    nappi: 'Sierra Leonen suurin joki',
    // -12.8 E / 8.55 N — en-Wikipedia "Rokel River" — koordinaatti on joen keskijuoksulla
    laudat: {
      maailmankartta: { x: 5406.7, y: 2925.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Rokelin suisto avautuu niin leveäksi, että sen eteläranta muodostaa luonnonsataman, '
      + 'jota on sanottu maailman kolmanneksi suurimmaksi — ja juuri siihen on rakennettu '
      + 'Freetownin satama. Joki alkaa Loma-vuorten yhdeksänsadan metrin ylätasangolta, virtaa '
      + 'lounaaseen noin 390 kilometriä ja levenee suistoksi, joka on neljäkymmentä kilometriä '
      + 'pitkä ja leveimmillään kuudentoista kilometrin levyinen. Suisto on ollut vuodesta 1999 '
      + 'kansainvälisesti merkittävä Ramsar-kosteikko: sen mangrovesuot ja mutatasangot '
      + 'kattavat lähes viidenneksen koko maan mangrovemetsästä. Joesta on käytetty myös nimiä '
      + 'Seli ja aiemmin Pamoronkoh.',
    lahde: 'en-Wikipedia "Rokel River", johdanto-osa ja osio "Geography" (tarkistettu 1.9.2026).',
  },
  /*
   * ── MAAILMAN ERÄ M12 (LÄNSI-AFRIKKA) 6.9.2026 ────────────────────
   *
   * Kahdeksan KOHDETTA Sierra Leoneen. Yksikään ei ole pelikaupungin
   * kohdalla: lähin uusi merkki on Bonthe 39,4 lautayksikön päässä
   * Sierra Leone -laatasta (KAUPUNGIN_KOHDALLA_SADE 7), ja jokaisen
   * kohteen lähin pelikaupunki on kirjattu koordinaattirivin viereen.
   * Erä on kuvaton, ja jokainen väite on en-Wikipedian raakatekstin
   * katteessa.
   *
   * BUNCE ISLAND, PORT LOKO JA FOURAH BAY COLLEGE JÄIVÄT POIS
   * MITATUSTA SYYSTÄ: ne ovat 6,0, 5,2 ja 12,8 lautayksikön päässä
   * Sierra Leone -laatasta, eli kaksi ensimmäistä ovat pelikaupungin
   * kohdalla ja kolmas sen kyljessä. Loman vuoret jäivät pois, koska
   * saman listan Bintumani on niiden huippu. Koidu jäi pois
   * kohteista, koska sen timanttikaivoksen sopimus kerrotaan saman
   * erän skandaalina siellä (js/packs/skandaalit.js).
   */
  {
    id: 'tiwain-saari',
    nimi: 'Tiwain suojelualue',
    nimio: 'Tiwai',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka monta kädellislajia Tiwailla elää?',
      'Kuka luovutti puolet saaresta naapuripäällikölle?',
    ],
    korostukset: ['kääpiövirtahepo|kääpiövirtahepojen'],
    nappi: 'Yksitoista kädellislajia yhdellä saarella',
    // 11.3488 W / 7.5441 N — en-Wikipedia "Tiwai Island"
    // Lähin pelikaupunki: Sierra Leone 62,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5455, y: 2959.6 },
    },
    teksti: 'Tiwai tarkoittaa menden kielellä isoa saarta, ja se on kahdentoista neliökilometrin '
      + 'suojelualue Moajoessa Pujehunin piirikunnassa — yksi Sierra Leonen suurimmista '
      + 'sisämaan saarista. Saari kuului barri-kansalle, kunnes päällikkö kuningatar Nyarroh '
      + 'luovutti 1800-luvun lopulla puolet siitä joen toisen rannan koyan päällikölle; siitä '
      + 'asti molemmat kansat ovat omistaneet saaren yhdessä. Tutkijat kiersivät saarta '
      + '1970- ja 1980-luvuilla, ja heidän sekä barrien ja koyien pyynnöstä siitä tehtiin '
      + '1987 virallinen suojelualue. Saarella elää kääpiövirtahepojen kanta, yli 135 '
      + 'lintulajia ja yksi maailman tiheimmistä ja monilajisimmista kädellisyhteisöistä: '
      + 'yksitoista lajia, muun muassa länsiafrikansimpanssi, dianamarakatti ja '
      + 'oliivikolobus. Unesco liitti Tiwain ja Golan yhteisenä kohteena '
      + 'maailmanperintöluetteloon 2025.',
    lahde: 'en-Wikipedia "Tiwai Island", johdanto-osa sekä osiot "History", "Geography" ja '
      + '"Biology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'outamba-kilimi',
    nimi: 'Outamba-Kilimi',
    nimio: 'Outamba',
    tyyppi: 'muu',
    kysymykset: [
      'Mistä puiston kaksi osaa ovat saaneet nimensä?',
      'Minkä eläimen takia alue valittiin suojeltavaksi?',
    ],
    korostukset: ['susu|susut'],
    nappi: 'Simpanssien takia suojeltu savanni',
    // 12.0261 W / 9.7694 N — en-Wikipedia "Outamba-Kilimi National Park"
    // Lähin pelikaupunki: Sierra Leone 47,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5432.5, y: 2884.8 },
    },
    teksti: 'Outamba-Kilimi on Sierra Leonen luoteisnurkassa Karenen piirikunnassa lähellä '
      + 'Guinean rajaa. Puisto on kahdessa osassa: Outamba on 741 ja Kilimi 368 neliökilometriä, '
      + 'ja nimet tulevat toisen osan korkeimmasta huipusta Outambasta ja toisen pisimmästä '
      + 'joesta Kilimistä. Alueesta tuli riistansuojelualue 1974 ja kansallispuisto lokakuussa '
      + '1995, ja se valittiin suojeltavaksi ennen kaikkea suuren simpanssikantansa takia. '
      + 'Maasto on enimmäkseen tasaista korkearuohoista savannia ja metsikköä, ja lajistoon '
      + 'kuuluvat simpanssien lisäksi kolobukset, nokimangabit, virtahevot, kääpiövirtahevot, '
      + 'metsänorsut ja harvinaiset bongoantiloopit. Puiston ympärillä ja sisällä asuvat '
      + 'susut, ja suurin osa puiston työntekijöistä on heitä; useimmat kylät siirtyivät '
      + 'suojavyöhykkeelle, mutta ne, joilla oli puiston sisällä esi-isien hautoja, saivat '
      + 'jäädä.',
    lahde: 'en-Wikipedia "Outamba-Kilimi National Park", johdanto-osa sekä osiot "History", '
      + '"Environment" ja "Susu" (tarkistettu 6.9.2026).',
  },
  {
    id: 'golan-sademetsa',
    nimi: 'Golan sademetsä',
    nimio: 'Gola',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka suuri Golan kansallispuisto on?',
      'Milloin puisto perustettiin lailla?',
    ],
    korostukset: ['perhonen|perhoslajia'],
    nappi: 'Sierra Leonen suurin sademetsä',
    // 10.9167 W / 7.5 N — en-Wikipedia "Gola Rainforest National Park"
    // Lähin pelikaupunki: Sierra Leone 75,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5469.4, y: 2961 },
    },
    teksti: 'Golan sademetsän kansallispuisto suojelee Sierra Leonen laajimman sademetsäalueen, '
      + '71 070 hehtaaria maan itäosassa. Metsä on osa Ylä-Guinean metsävyöhykettä, joka '
      + 'ulottuu Guineasta Togoon. Sitä hakattiin kaupallisesti: 1960- ja 1980-luvun välillä '
      + 'yli 20 000 hehtaaria, ja sen jälkeen sitä ovat painaneet timanttien ja rautamalmin '
      + 'kaivuu. Suojeluhanke alkoi 1990-luvulla Sierra Leonen hallituksen, maan oman '
      + 'luonnonsuojeluseuran ja brittiläisen lintuyhdistyksen yhteistyönä, ja parlamentti '
      + 'sääti puiston lailla joulukuussa 2010 yhdistämällä Golan pohjoisen, itäisen ja '
      + 'läntisen metsänvarannon. Metsässä on yli 330 lintulajia, yli 650 perhoslajia ja '
      + '49 nisäkäslajia, muun muassa yli kolmensadan länsiafrikansimpanssin kanta ja '
      + 'kääpiövirtahepoja.',
    lahde: 'en-Wikipedia "Gola Rainforest National Park", johdanto-osa sekä osiot "History" ja '
      + '"Environment" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bo',
    nimi: 'Bo',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Minkä protektoraatin pääkaupunki Bo oli?',
      'Mistä kaupungin nimen kerrotaan tulevan?',
    ],
    korostukset: ['mende|menden'],
    nappi: 'Norsunlihasta nimensä saanut kaupunki',
    // 11.74 W / 7.9564 N — en-Wikipedia "Bo, Sierra Leone"
    // Lähin pelikaupunki: Sierra Leone 44,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5442, y: 2945.7 },
    },
    teksti: 'Bo on Sierra Leonen toiseksi suurin kaupunki ja Eteläisen provinssin pääkaupunki. '
      + 'Se alkoi kasvaa, kun valtionrautatie saapui 1889, ja siitä tuli koulukaupunki 1906, '
      + 'kun Bo Government Secondary School perustettiin; koulu on yhä Länsi-Afrikan '
      + 'tunnetuimpia. Vuodesta 1930 itsenäistymiseen 1961 Bo oli Sierra Leonen protektoraatin '
      + 'pääkaupunki. Kaupunki on menden kansan tärkein keskus, ja siellä on Njalan '
      + 'yliopisto, maan toiseksi suurin. Perimätiedon mukaan nimi kertoo anteliaisuudesta: '
      + 'kun metsästäjä oli kaatanut norsun, ympäröivien kylien väki tuli hakemaan osansa, ja '
      + 'lihaa oli niin paljon, että jakaminen kesti päiviä — metsästäjä toisti "Bi-woo", '
      + 'menden kielellä tämä on sinun, niin monta kertaa että siitä tuli paikan nimi. '
      + 'Valtionrautatie lakkautettiin 1974.',
    lahde: 'en-Wikipedia "Bo, Sierra Leone", johdanto-osa sekä osiot "History" ja "Etymology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kenema',
    nimi: 'Kenema',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Milloin rautatie saapui Kenemaan?',
      'Mitä virasto nimeltä Government Diamond Office tekee?',
    ],
    korostukset: ['Kambui|Kambuin'],
    nappi: 'Kambuin kukkuloiden aukossa',
    // 11.1833 W / 7.8667 N — en-Wikipedia "Kenema"
    // Lähin pelikaupunki: Sierra Leone 62,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5460.6, y: 2948.7 },
    },
    teksti: 'Kenema on Itäisen provinssin hallinnollinen keskus ja vuoden 2021 laskennan '
      + 'mukaan Sierra Leonen toiseksi väkirikkain kaupunki, 255 110 asukasta. Se on 173 '
      + 'metrin korkeudella laaksossa, luonnon jättämässä aukossa Kambuin kukkuloiden läpi. '
      + 'Perimätiedon mukaan kaupungin perusti metsästäjä Ngombulango läheisestä Gombun '
      + 'kylästä useita sukupolvia ennen siirtomaahallinnon tuloa. Rautatie saapui 1909 ja '
      + 'yhdisti kaupungin suoraan Freetowniin, jolloin siitä tuli puutavaran, palmuöljyn, '
      + 'palmunydinten, kaakaon ja kahvin kokoamispaikka. Alluviaalitimanttien löytyminen '
      + '1931 sitoi kaupungin kaivannaistalouteen, ja vuonna 1959 perustettu Government '
      + 'Diamond Office arvioi ja sertifioi yhä Itäisen provinssin timantit.',
    lahde: 'en-Wikipedia "Kenema", johdanto-osa sekä osiot "Pre-colonial and early settlement" '
      + 'ja "Colonial period" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bumbunan-pato',
    nimi: 'Bumbunan pato',
    nimio: 'Bumbuna',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Milloin Bumbunan padon rakentaminen alkoi?',
      'Kuinka paljon pato tuottaa sähköä?',
    ],
    korostukset: ['Seli|Selijoen'],
    nappi: 'Maan ensimmäinen vesivoimala',
    // 11.7333 W / 9.05 N — en-Wikipedia "Bumbuna Dam"
    // Lähin pelikaupunki: Sierra Leone 40,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5442.2, y: 2909 },
    },
    teksti: 'Bumbunan pato on Selijoen kivitäytteinen betonipintainen pato Tonkolilin '
      + 'piirikunnassa, 350 kilometriä pääkuluttajasta Freetownista. Se on maan ensimmäinen '
      + 'vesivoimapato, ja sen voimalan teho on 50 megawattia. Paikka löydettiin Bumbunan '
      + 'putouksilta 1971, rakentaminen alkoi 1975 ja pysähtyi toukokuussa 1997 noin 85 '
      + 'prosentin valmiusasteessa; työ jatkui vasta 2005, ja laitos kytkettiin verkkoon '
      + '2009. Afrikan kehityspankki maksoi 327 miljoonan dollarin hankkeesta lähes '
      + 'kolmanneksen. Pato on 87 metriä korkea ja harjaltaan 400 metriä pitkä, ja siinä on '
      + 'kaksi 25 megawatin Francis-turbiinia. Vuoden 2013 tietojen mukaan laitos on tuottanut '
      + 'käytännössä vain 10–25 megawattia.',
    lahde: 'en-Wikipedia "Bumbuna Dam", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'bonthe',
    nimi: 'Bonthe',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Millä saarella Bonthe on?',
      'Mitä Bonthesta vietiin siirtomaa-aikana?',
    ],
    korostukset: ['piassava|piassavaa'],
    nappi: 'Sherbron saaren vanha vientisatama',
    // 12.505 W / 7.5264 N — en-Wikipedia "Bonthe"
    // Lähin pelikaupunki: Sierra Leone 39,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5416.5, y: 2960.2 },
    },
    teksti: 'Bonthe on rannikkokaupunki Sherbron saarella Sherbrojoen suistossa, noin sadan '
      + 'kilometrin päässä Bosta lounaaseen. Se on Sierra Leonen kuudesta kunnasta selvästi '
      + 'pienin, ja sitä johtaa suoraan kaupunginvaltuusto pormestareineen; vuoden 2004 '
      + 'laskennassa asukkaita oli 9 535. Pääelinkeino on kalastus. Siirtomaa-aikana kaupunki '
      + 'oli merkittävä kauppapaikka, josta vietiin piassavaa eli palmukuitua ja muita '
      + 'maataloustuotteita. Väestö on monikansallinen mutta enimmäkseen sherbroja ja '
      + 'mendejä.',
    lahde: 'en-Wikipedia "Bonthe", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'kabala',
    nimi: 'Kabala',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mistä Kabalaan siirrettiin hallintopaikka 1895?',
      'Mitä kaupungin nimi tarkoittaa?',
    ],
    korostukset: ['limba|limbojen'],
    nappi: 'Kahden päällikkökunnan kaupunki',
    // 11.55 W / 9.5833 N — en-Wikipedia "Kabala, Sierra Leone"
    // Lähin pelikaupunki: Sierra Leone 54,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5448.3, y: 2891.1 },
    },
    teksti: 'Kabala on Koinadugun piirikunnan pääkaupunki Pohjoisessa provinssissa, vuorten '
      + 'ympäröimässä maalaismaisemassa noin 137 kilometriä Makenista koilliseen. Vuoden '
      + '1895 Ranskan ja Britannian rajasopimuksen jälkeen brittihallinto siirsi paikallisen '
      + 'hallintopaikkansa Falabasta Kabalaan, joka oli tuolloin niin merkityksetön kylä, '
      + 'ettei se näkynyt brittien tarkoillakaan kartoilla. Nimi on limban ja fulan kieltä ja '
      + 'tarkoittaa kirjaimellisesti Balan paikkaa. Kaupunkiin kuuluu kaksi '
      + 'päällikkökuntakeskusta: Gbawuria on limbojen Wara Wara Yagalan ja Yogomaia '
      + 'korankojen Sengben keskus, ja perinteinen hallinto jakautuu kahden ylipäällikön '
      + 'kesken. Kabala kasvoi nopeasti brittivallan aikana: kauppiaita saapui 1930-luvulta '
      + 'lähtien, ja vuoden 1947 jälkeen libanonilaiset kauppiaat avasivat siellä liikkeitä.',
    lahde: 'en-Wikipedia "Kabala, Sierra Leone", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
];
