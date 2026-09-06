/*
 * MAASTOKOHTEET — TCD. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs TCD --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/TCD.json. Työkalu laskee laudan
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
 * Tšadin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Sisämaavaltion 'meri' on Tšadjärvi, joka on antanut koko maalle nimensä ja jonka tyyppi on pelin symbolitaksonomiassa meri (luonto-symboli; erillistä järvityyppiä ei ole).
 *
 * MAAILMAN ERÄ M15 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Guelta d'Archei, Aloban kaari, Ouniangan järvet, Zakouma, Fitri,
 * Manda, Abéché ja Iro. Lähin uusi merkki on Fitri 79,6
 * lautayksikön päässä Tšad-järvestä (KAUPUNGIN_KOHDALLA_SADE 7),
 * joten kaikki kahdeksan ovat pääkartan merkkejä. Erä on kuvaton,
 * ja jokaisen kohteen lähin pelikaupunki on kirjattu sen
 * koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_TCD = [
  {
    id: 'emikoussi',
    nimi: 'Emi Koussi',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka suuri Emi Koussin kaldera on?',
      'Mikä on Era Kohor?',
    ],
    korostukset: ['Tibesti|Tibestin'],
    nappi: 'Saharan korkein huippu',
    // 18.5464 E / 19.7925 N — en-Wikipedia "Emi Koussi"
    laudat: {
      maailmankartta: { x: 6451.5, y: 2543.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Emi Koussi on Tibestin vuoriston kaakkoispäässä kohoava kilpitulivuori ja koko Saharan '
      + 'korkein huippu: 3 447 metriä, kolme kilometriä ympäröiviä hiekkakivitasankoja '
      + 'ylempänä. Sen lakea reunustaa kaksi sisäkkäistä kalderaa, joista ulompi on noin '
      + 'viidentoista kilometrin levyinen; kaakkoisosassa on lisäksi 350 metriä syvä Era '
      + 'Kohorin kaldera.',
    lahde: 'en-Wikipedia "Emi Koussi", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tsadjarvi',
    nimi: 'Tšadjärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi järven koko vaihtelee niin rajusti?',
      'Mistä järvi saa vetensä?',
    ],
    korostukset: ['Chari|Charista'],
    nappi: 'Järvi neljän maan rajalla',
    // 14.533 E / 13.099 N — en-Wikipedia "Lake Chad"
    laudat: {
      maailmankartta: { x: 6317.8, y: 2772.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tšadjärvi on laskujoeton makeavesijärvi neljän maan — Tšadin, Nigerian, Nigerin ja '
      + 'Kamerunin — rajojen solmukohdassa, ja sen valuma-alue on yli miljoona neliökilometriä. '
      + 'Vetensä järvi saa pääosin Charista, ja sen pinta ja pinta-ala vaihtelevat rajusti '
      + 'vuodenaikojen mukaan. Järvi on yksi Afrikan tärkeimmistä makean veden kala-alueista.',
    lahde: 'en-Wikipedia "Lake Chad", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'chari',
    nimi: 'Chari',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Tšad-järvi kutistuu?',
      'Mikä on guineaanmato?',
    ],
    korostukset: ['Logone|Logone'],
    nappi: 'Tšadjärven elinehto',
    // 15.05 E / 12.11 N — N'Djamena joen alajuoksulla; artikkelin koordinaatti 14,565 / 12,909 on suulla Tšadjärvellä
    laudat: {
      maailmankartta: { x: 6335, y: 2805.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tšad-järvi on käytännössä yhden joen varassa: Charista tulee yhdeksänkymmentä '
      + 'prosenttia sen vedestä. Joki virtaa 1 400 kilometriä Keski-Afrikan tasavallasta Tšadin '
      + 'halki, seuraa Kamerunin rajaa N\'Djamenasta alkaen ja saa siellä pääsivujokensa '
      + 'Logonen. Suurin osa Tšadin väestöstä asuu sen varrella, N\'Djamena ja Sarh mukaan '
      + 'luettuina, ja joki elättää mittavan kalastuksen — arvostetuinta saalista on '
      + 'niilinahven. Sen vedessä on myös vaaransa: Tšad on yksi neljästä maasta, joissa '
      + 'guineaanmato yhä esiintyy, ja jäljellä olevat tapaukset keskittyvät juuri Charin '
      + 'varrelle. Järven pelastamiseksi on 1960-luvulta asti kaavailtu veden kääntämistä '
      + 'Ubangista Chariin.',
    lahde: 'en-Wikipedia "Chari River", johdanto-osa ja osio "Geography" (tarkistettu 1.9.2026).',
  },

  /* ==============================================================
   * MAAILMAN ERÄ M15, AFRIKKA 5 6.9.2026 — KAHDEKSAN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Tšadilla oli kolme maastokohdetta ja nolla
   * kohdetta (docs/moduulit/karttanostot-kattavuus.md, Afrikka).
   * Kaikki kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin
   * jokaiseen js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin
   * uusi merkki on Lake Fitri 79,6 lautayksikön päässä
   * Tšad-järvestä (raja KAUPUNGIN_KOHDALLA_SADE on 7,
   * js/fokuskohteet.js).
   *
   * KOLME EHDOKASTA KARSIUTUI MERKKIEN PÄÄLLEKKÄISYYDEN TAKIA.
   * Gaoui on 4,0 lautayksikköä Chari-merkistä, Ouara 14,4 yksikköä
   * Abéchésta ja Fadan kaupunki 11,9 yksikköä Guelta d'Archeista;
   * kaikki kolme mainitaan sen kortin tekstissä, jonka päälle ne
   * olisivat osuneet. Faya-Largeau jäi pois M3:n Myanmar-linjalla:
   * sen artikkelin koko historiaosuus on 1970- ja 1980-lukujen
   * sotaa. Kuvaton erä; faktat en-Wikipedian raakatekstistä
   * 6.9.2026, ja jokainen `lahde`-rivi kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'gueltadarchei',
    nimi: 'Guelta d\'Archei',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on guelta?',
      'Miten krokotiilit päätyivät keskelle Saharaa?',
    ],
    korostukset: ['guelta'],
    nappi: 'Saharan viimeiset krokotiilit',
    // 21.7747 E / 16.9047 N — en-Wikipedia "Guelta d'Archei"
    // Lähin pelikaupunki: Darfur 91,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6559.2, y: 2642.7 },
    },
    teksti: 'Guelta d\'Archei on Saharan tunnetuimpia gueltoja eli kalliolammikoita, ja se on '
      + 'Ennedin ylängöllä Fadan kaupungista kaakkoon. Lammikossa elää yhä '
      + 'länsiafrikankrokotiileja: keskiholoseenin luulöydöt ja kalliomaalaukset kertovat, että '
      + 'laji viihtyi aikoinaan lähes koko nykyisen Saharan alueella, ja Archein pieni parvi on '
      + 'yksi viimeisistä tunnetuista siirtokunnista aavikolla — Mauritanian Tagantin ylängön '
      + 'kanta lienee hävinnyt vuonna 1996. Ennedin krokotiilit ovat eristyksessä kääpiöityneet, '
      + 'mikä tekee kannasta poikkeuksellisen. Paikalle ei vie päällystettyä tietä: '
      + 'N\'Djamenasta sinne ajaa maastoautolla noin neljä päivää.',
    lahde: 'en-Wikipedia "Guelta d\'Archei", johdanto-osa, ja "Ennedi Plateau", osio "Fauna" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'alobankaari',
    nimi: 'Aloban kaari',
    tyyppi: 'muu',
    kysymykset: [
      'Miten luonnonkaari syntyy?',
      'Mikä on maailman pisin luonnonkaari?',
    ],
    korostukset: ['luonnonkaari'],
    nappi: 'Kivikaari keskellä aavikkoa',
    // 22.2392 E / 16.7415 N — en-Wikipedia "Aloba Arch"
    // Lähin pelikaupunki: Darfur 80,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6574.6, y: 2648.3 },
    },
    teksti: 'Aloban kaari on luonnonkaari Tšadin Ennedin ylängöllä. Suuret luonnonkaaret ovat '
      + 'harvinaisia Etelä- ja Länsi-Kiinan sekä Yhdysvaltain Coloradon ylängön ulkopuolella, '
      + 'mutta Ennedin hiekkakivi muistuttaa geologialtaan Coloradon ylänköä ja on synnyttänyt '
      + 'useita kaaria — vain Aloba yltää maailman kymmenen pisimmän joukkoon. Valokuvista '
      + 'arvioitu jänneväli on noin 76 metriä, mikä tekee siitä kahdeksanneksi pisimmän tunnetun '
      + 'luonnonkaaren ja pisimmän Kiinan ja Utahin ulkopuolella; pisin mitattu on Kiinan '
      + 'Xianrenin silta, jonka jänneväli on noin 122 metriä. Jänneväliäkin huomattavampi on '
      + 'korkeus: noin 120-metrisenä Aloba on maailman korkeimpia tunnettuja kaaria.',
    lahde: 'en-Wikipedia "Aloba Arch", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'ounianga',
    nimi: 'Ouniangan järvet',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi järvet eivät kuivu, vaikka sadetta ei tule?',
      'Mitä Yoa-järven pohjasedimentti kertoo?',
    ],
    korostukset: ['pohjavesi|pohjavesivarasto'],
    nappi: 'Kahdeksantoista järveä ilman sadetta',
    // 20.5056 E / 19.055 N — en-Wikipedia "Lakes of Ounianga"
    // Lähin pelikaupunki: Darfur 177,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6516.9, y: 2568.7 },
    },
    teksti: 'Ouniangan järvet ovat kahdeksantoista järven ryhmä Saharassa Koillis-Tšadissa, ja '
      + 'ne pääsivät Unescon maailmanperintöluetteloon vuonna 2012. Sadetta alueelle tulee alle '
      + 'kaksi millimetriä vuodessa, mutta järviä ruokkii kosteina vuosituhansina kertynyt '
      + 'pohjavesivarasto. Yhteispinta-ala on noin 20 neliökilometriä, ja suurin niistä, '
      + 'Yoa-järvi, on noin 3,5 neliökilometriä ja 20 metriä syvä — siitä haihtuu vettä kuuden '
      + 'metrin kerros vuodessa. Ounianga Sérirn ryhmässä hiekkadyynit ovat jakaneet altaan '
      + 'kymmeneksi järveksi, joiden pinnalla kelluvat paksut ruokolautat hidastavat '
      + 'haihtumista; keskimmäisestä suolaisesta Teli-järvestä haihtuu enemmän, joten vesi '
      + 'virtaa naapureista sen suuntaan ja ne pysyvät makeina. Yoa-järven pohjasta porattiin '
      + 'sedimenttinäyte, jossa oli 10 940 vuosikerrosta — yksi kutakin vuotta kohti aina '
      + 'jääkauden lopun aavikkopohjaan asti.',
    lahde: 'en-Wikipedia "Lakes of Ounianga", johdanto-osa sekä osiot "Geography" ja "Connection '
      + 'to the history of humanity" (tarkistettu 6.9.2026).',
  },
  {
    id: 'zakouma',
    nimi: 'Zakouma',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi puiston norsukanta romahti?',
      'Mikä on kordofaninkirahvi?',
    ],
    korostukset: ['norsu|norsua'],
    nappi: 'Puisto, joka sai norsunsa takaisin',
    // 19.6478 E / 10.8478 N — en-Wikipedia "Zakouma National Park"
    // Lähin pelikaupunki: Darfur 171,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6488.3, y: 2848.5 },
    },
    teksti: 'Zakouma on Tšadin vanhin kansallispuisto: se sai suojelunsa presidentin asetuksella '
      + 'vuonna 1963. Puisto kuuluu sudanilais-saheliläiseen kasvillisuusvyöhykkeeseen, ja siellä '
      + 'elää muun muassa puhvelia, savanninorsua, kordofaninkirahvia, suurkuduta, leopardia ja '
      + 'leijonaa — arvioiden mukaan kuusikymmentä prosenttia koko maailman '
      + 'kordofaninkirahvikannasta on Zakoumassa. Norsukanta romahti norsunluukaupan ja '
      + 'salametsästyksen takia: vuonna 2002 puistossa laskettiin yli neljätuhatta norsua, '
      + 'vuonna 2005 alle yhdeksänsataa ja vuoteen 2010 mennessä noin 450. Tšadin hallitus '
      + 'antoi puiston hoidon African Parks -järjestölle vuonna 2010, minkä jälkeen '
      + 'salametsästys väheni jyrkästi ja kanta alkoi taas lisääntyä: vuonna 2013 syntyi 23 '
      + 'vasaa, 2016 seitsemänkymmentä, ja vuonna 2021 puistossa oli 636 norsua.',
    lahde: 'en-Wikipedia "Zakouma National Park", johdanto-osa sekä osiot "History", "Flora and '
      + 'fauna" ja "Elephants" (tarkistettu 6.9.2026).',
  },
  {
    id: 'lakefitri',
    nimi: 'Fitri',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on Ramsar-kosteikko?',
      'Mistä Fitri saa vetensä?',
    ],
    korostukset: ['kosteikko|kosteikoksi'],
    nappi: 'Järvi, joka kolminkertaistuu',
    // 17.5025 E / 12.8092 N — en-Wikipedia "Lake Fitri"
    // Lähin pelikaupunki: Tšad-järvi 79,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6416.7, y: 2782.2 },
    },
    teksti: 'Fitri on matala makean veden järvi Keski-Tšadin Sahelissa noin 300 kilometriä '
      + 'N\'Djamenasta itään, ja se on nimetty kansainvälisesti merkittäväksi kosteikoksi '
      + 'Ramsarin sopimuksen nojalla. Tavallisesti järvi on noin 50 000 hehtaaria, mutta '
      + 'sateisina vuosina se voi kolminkertaistua. Vesi tulee kausisateista ja noin 70 000 '
      + 'neliökilometrin valuma-alueelta, ja tärkein tulojoki on kausiluonteinen Batha, joka tuo '
      + 'vetensä lännempää Ouaddain vuoristosta. Kuten Tšadjärvi, Fitrikin on entistään pienempi, '
      + 'ja pahoina kuivuusvuosina se on kuivunut kokonaan — niin kävi 1900-luvun alussa ja '
      + 'uudestaan vuosina 1984–1985. BirdLife International on nimennyt järven tärkeäksi '
      + 'lintualueeksi, sillä siellä elää huomattavia määriä muun muassa vihellyssorsia, '
      + 'ruskosotkia, heinätaveja, jouhisorsia ja mustakruunukurkia.',
    lahde: 'en-Wikipedia "Lake Fitri", johdanto-osa sekä osiot "Geography" ja "Important Bird '
      + 'Area" (tarkistettu 6.9.2026).',
  },
  {
    id: 'manda',
    nimi: 'Manda',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on jättiläisseeprantilooppi?',
      'Miksi eläimet näkyvät vain kuivana kautena?',
    ],
    korostukset: ['kuiva kausi|kuivana kautena'],
    nappi: 'Puisto, joka perustettiin yhdelle lajille',
    // 17.9403 E / 9.2942 N — en-Wikipedia "Manda National Park"
    // Lähin pelikaupunki: Tšad-järvi 170,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6431.3, y: 2900.8 },
    },
    teksti: 'Manda on kansallispuisto Etelä-Tšadissa Sarhin kaupungin lähellä. Sen itärajana on '
      + 'Chari-joki ja lounaisrajana Sarhista N\'Djamenaan vievä tie, ja se on yli 113 000 '
      + 'hehtaarin laajuinen. Alue suojeltiin eläinsuojelualueena 1953 ja siitä tuli '
      + 'kansallispuisto 1965. Puisto perustettiin alun perin suojelemaan '
      + 'jättiläisseeprantiloopin, mutta se laji katosi alueelta savanninorsun tavoin '
      + '1980-luvun loppuun mennessä. Leijonia ja muita suuria eläimiä näkee vain kuivana '
      + 'kautena, ja alueella elää myös afrikanvillikoiria. BirdLife International on nimennyt '
      + 'puiston tärkeäksi lintualueeksi.',
    lahde: 'en-Wikipedia "Manda National Park", johdanto-osa ja osio "Wildlife" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'abeche',
    nimi: 'Abéché',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi Ouaddain pääkaupunki siirrettiin Abéchéen?',
      'Mikä oli transsaharalainen karavaanireitti?',
    ],
    korostukset: ['karavaanireitti|karavaanireitin'],
    nappi: 'Sulttaanien kaupunki kuivuneiden kaivojen takia',
    // 20.8347 E / 13.8331 N — en-Wikipedia "Abéché"
    // Lähin pelikaupunki: Darfur 80,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6527.8, y: 2747.5 },
    },
    teksti: 'Abéché on Itä-Tšadin suuria kaupunkeja ja Ouaddain alueen hallintokeskus savannin '
      + 'keskellä. Se nousi 1800-luvun alusta lähtien transsaharalaisen karavaanireitin '
      + 'varrella kaupan ja islamilaisen oppineisuuden keskukseksi — ja samalla Tšadin '
      + 'orjakaupan keskukseksi. Kaupungista tuli Ouaddain sulttaanikunnan pääkaupunki '
      + '1890-luvulla, kun aiemman pääkaupungin Ouaran kaivot kuivuivat. Vuonna 1909 '
      + 'ranskalaiset joukot valtasivat kuningaskunnan, perustivat Abéchéen varuskunnan ja '
      + 'pakottivat sulttaanin luopumaan valtaistuimestaan; kaupunki oli silloin Tšadin suurin, '
      + '28 000 asukasta, mutta kulkutaudit pudottivat väkiluvun kuuteen tuhanteen vuoteen 1919 '
      + 'mennessä. Sulttaanikunta palautettiin Ranskan määräyksestä 1935. Kaupungissa on yhä '
      + 'vanhan pääkaupungin jäänteitä: palatseja, moskeijoita ja sulttaanien hautoja, ja '
      + 'keskusaukion suuri moskeija 1800-luvulta on maan merkittävimpiä.',
    lahde: 'en-Wikipedia "Abéché", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'irojarvi',
    nimi: 'Iro',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on törmäyskraatteri?',
      'Miksi järvi katoaa joka vuosi?',
    ],
    korostukset: ['törmäyskraatteri|törmäyskraatterin'],
    nappi: 'Pyöreä järvi, joka katoaa',
    // 19.4167 E / 10.1 N — en-Wikipedia "Iro Lake"
    // Lähin pelikaupunki: Tšad-järvi 182,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6480.6, y: 2873.7 },
    },
    teksti: 'Iro on kausittainen järvi Kaakkois-Tšadin Moyen-Charin alueella, noin sata '
      + 'kilometriä Keski-Afrikan tasavallan rajasta pohjoiseen. Se täyttyy kesällä ja syksyllä '
      + 'Bahr Salamatin itähaarasta, joka haarautuu seitsemän kilometriä järvestä lounaaseen. '
      + 'Muoto on lähes ympyrä, 13 kilometriä pitkä ja 11 leveä, ja kuivana kautena järvi voi '
      + 'kadota kokonaan. Painanteen on epäilty olevan muinaisen törmäyskraatterin jäänne.',
    lahde: 'en-Wikipedia "Iro Lake", johdanto-osa (tarkistettu 6.9.2026).',
  },
];

