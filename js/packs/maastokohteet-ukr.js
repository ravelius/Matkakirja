/*
 * MAASTOKOHTEET — UKR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs UKR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/UKR.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 4 6.9.2026: KOHTEITA MAASTON RINNALLE ───────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Erä 4 vie loppuun Euroopan viimeiset vajaat maat. Ukrainassa oli
 * kolmetoista karttamerkkiä ja NOLLA kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md), joten koko vaje oli
 * kohteissa. Tässä ovat ne kahdeksan; yhdenkään tyyppi ei ole maastoa,
 * vaan historiaa, kulttuuria, tekniikkaa tai kaupunkia.
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-ukr.js:ssä.
 * Sama syy kuin erässä 1: kohdepakki vaatisi rivin
 * js/fokuskohteet.js:n KOHDE_MAAT-tauluun ja lehden poltettujen nimien
 * lohkon (js/packs/fokus-grc.js FOKUS_LISANIMET), eikä kumpaankaan
 * kosketa tässä erässä. Maastokohteiden hakemisto
 * (js/packs/maastokohteet.js) liittää listan peliin sellaisenaan,
 * joten kohteet ovat kartalla heti.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Ukrainassa on kaksi
 * pelikaupunkia (Kiova ja Odessa) ja naapureissa lisää, joten etäisyys
 * mitattiin jokaiseen js/packs/maailmankartta.js CITIES-listan
 * kaupunkiin; jokaisen kohteen lähin on kirjattu sen oman
 * koordinaattirivin viereen. Lähin koko erässä on Tšernobylin
 * ydinvoimala 43,9 lautayksikön päässä Kiovasta — raja
 * KAUPUNGIN_KOHDALLA_SADE on 7 (js/fokuskohteet.js), joten yksikään ei
 * kuulu kohdekartalle vaan kaikki ovat pääkartan merkkejä.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen, ei kuvaa — sama linja
 * kuin erässä 1. Tarkistamaton Commons-tiedosto olisi huonompi kuin
 * kuvaton kortti (Perustuslaki, faktakuri). Faktat on tarkistettu
 * en-Wikipediasta kohde kerrallaan 6.9.2026.
 *
 * Ukrainan maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_UKR = [
  {
    id: 'hoverla',
    nimi: 'Hoverla',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä polonyna on?',
      'Mikä joki saa alkunsa Hoverlalta?',
    ],
    korostukset: ['polonyna|polonyna'],
    nappi: 'Ukrainan korkein vuori',
    // 24.5003 E / 48.16 N — en-Wikipedia "Hoverla"
    laudat: {
      maailmankartta: { x: 6650, y: 1469.4 },
      europe: { x: 681.6, y: 627 },
    },
    teksti: 'Hoverla on 2 061 metriä korkea ja Ukrainan korkein vuori sekä osa Ukrainan '
      + 'Karpaatteja. Se sijaitsee Itä-Beskideilla Tšornohoran alueella. Rinteitä peittävät '
      + 'pyökki- ja kuusimetsät, joiden yläpuolelle jää subalpiinisten niittyjen vyöhyke, jota '
      + 'ukrainaksi kutsutaan nimellä polonyna. Prut-joen päälähde on vuoren itärinteellä.',
    lahde: 'en-Wikipedia "Hoverla", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'mustameri',
    nimi: 'Mustameri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Mustameren syvyys on hapeton?',
      'Mistä meri sai nimensä?',
    ],
    korostukset: ['valuma-alue|valuma-alue'],
    nappi: 'Meri, jonka valuma-alue on 24 maassa',
    // 32 E / 44.4 N — ulappa Krimin eteläpuolella; artikkelin oma keskipiste on 35 / 44
    laudat: {
      maailmankartta: { x: 6900, y: 1626.4 },
      europe: { x: 825.6, y: 725.9 },
    },
    teksti: 'Mustameri on Euroopan ja Aasian välinen reunameri Balkanin itäpuolella, Kaukasuksen '
      + 'länsipuolella ja Anatolian pohjoispuolella. Sen rannoilla on kuusi maata — Bulgaria, '
      + 'Georgia, Romania, Venäjä, Turkki ja Ukraina — mutta valuma-alue ulottuu 24 Euroopan '
      + 'maahan, koska meren suurimmat tulojoet ovat Tonava, Dnepr ja Dnestr.',
    lahde: 'en-Wikipedia "Black Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'asovanmeri',
    nimi: 'Asovanmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Kertšinsalmi on?',
      'Miksi Asovanmeri on niin matala?',
    ],
    korostukset: ['Kertšinsalmi|Kertšinsalmen'],
    nappi: 'Meri kapean salmen takana',
    // 36.5 E / 46.3 N — en-Wikipedia "Sea of Azov" (37 / 46), siirretty hieman länteen Ukrainan rannikon puolelle
    laudat: {
      maailmankartta: { x: 7050, y: 1547.9 },
      europe: { x: 912, y: 675.9 },
    },
    teksti: 'Asovanmeri on Itä-Euroopan sisämannerjalustameri, joka yhtyy Mustaanmereen kapean '
      + 'Kertšinsalmen kautta ja jota pidetään toisinaan Mustanmeren pohjoisena jatkeena. Sitä '
      + 'rajaavat idässä Venäjä sekä luoteessa ja lounaassa Ukraina. Se on tärkeä kulkureitti '
      + 'Keski-Aasiaan Kaspianmereltä Volga–Don-kanavan kautta.',
    lahde: 'en-Wikipedia "Sea of Azov", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'dnepr',
    nimi: 'Dnepr',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Kiova rakennettiin Dneprin varrelle?',
      'Mitkä olivat Dneprin kosket?',
    ],
    korostukset: ['Valdai|Valdain'],
    nappi: 'Euroopan neljänneksi pisin joki',
    // 35.14 E / 47.84 N — Zaporižžjan kohta joen suuressa mutkassa; artikkelin koordinaatti 32,333 / 46,5 on suistossa
    laudat: {
      maailmankartta: { x: 7004.7, y: 1483 },
      europe: { x: 885.9, y: 635.4 },
    },
    teksti: 'Dnepr on yksi Euroopan suurista rajat ylittävistä joista. Se nousee Valdain '
      + 'kukkuloilta Smolenskin luota Venäjältä ja virtaa Valko-Venäjän ja Ukrainan halki '
      + 'Mustaanmereen. Pituutta sillä on noin 2 200 kilometriä ja valuma-alueella 504 000 '
      + 'neliökilometriä, joten se on sekä Ukrainan että Valko-Venäjän pisin joki ja Euroopan '
      + 'neljänneksi pisin Volgan, Tonavan ja Uralin jälkeen.',
    lahde: 'en-Wikipedia "Dnieper", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'dnestr',
    nimi: 'Dnestr',
    tyyppi: 'joki',
    kysymykset: [
      'Mitä nimi Dnestr tarkoittaa?',
      'Mikä Transnistria on?',
    ],
    korostukset: ['Dnepr|Dnepr'],
    nappi: 'Joki, joka palaa takaisin',
    // 30.23 E / 46.35 N — en-Wikipedia "Dniester" — joen suu Ukrainan puolella
    laudat: {
      maailmankartta: { x: 6841, y: 1545.8 },
      europe: { x: 791.6, y: 674.6 },
    },
    teksti: 'Dnestrin ja Dneprin nimet ovat toistensa vastakohdat. Molemmat ovat sarmatialaista '
      + 'perua: Dnestr on dānu nazdya, lähellä oleva joki, ja Dnepr taas kaukana virtaava — '
      + 'nimet on annettu jostakin niiden välistä. Kreikkalaisille joki oli Tyras, skyyttien '
      + 'sanasta tūra, nopea. Ottomaanit kutsuivat sitä vielä 1800-luvulla Turlaksi. Nimiä on '
      + 'muitakin: Nistru romaniaksi, Nester jiddišiksi. Joki nousee Ukrainassa Turkan '
      + 'tienoilla aivan Puolan rajan tuntumassa, virtaa Moldovan halki 398 kilometriä ja '
      + 'erottaa siellä maan pääosan irtautuneesta Transnistriasta, palaa Ukrainaan ja laskee '
      + 'Mustaanmereen leveään liman-laguuniin.',
    lahde: 'en-Wikipedia "Dniester", osiot "Names" ja "Geography" (tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 4 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston
   * alussa. Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'kamjanets-podilskyin-linna',
    nimi: 'Kamjanets-Podilskyin linna',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä joki tekee linnasta niemen?',
      'Kuka valtasi linnan vuonna 1672?',
    ],
    korostukset: ['Smotrytš|Smotrytš-joki'],
    nappi: 'Linna niemellä, jota joki kiertää',
    // 26.5625 E / 48.6733 N — en-Wikipedia "Kamianets-Podilskyi Castle";
    // lähin pelikaupunki Kiova 152,2 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 6718.8, y: 1447.5 },
    },
    teksti: 'Kamjanets-Podilskyin linna oli ensin ruteeni-liettualainen linna ja '
      + 'myöhemmin kolmiosainen puolalainen linnoitus Podolian alueella '
      + 'Länsi-Ukrainassa. Nimi juontuu slaavilaisesta sanasta kamin, kivi. Linna '
      + 'seisoo niemellä, jonka mutkitteleva Smotrytš-joki on kaivertanut, ja se '
      + 'rakennettiin alun perin suojaamaan siltaa, joka yhdisti kaupungin '
      + 'mantereeseen.\n\n'
      + 'Kirjalliset lähteet ajoittavat linnan 1300-luvun alkuun, mutta 1960-luvun '
      + 'kaivaukset viittaavat siihen, että paikalla on ollut asutusta jo '
      + '1100–1200-luvuilla. Sijainti Podolian kauppateiden risteyksessä teki '
      + 'linnasta houkuttelevan maalin: 1400–1600-luvuilla tataarilaumat hyökkäsivät '
      + 'sen kimppuun kaikkiaan 51 kertaa.\n\n'
      + 'Elokuussa 1672 sulttaani Mehmed IV:n johtama osmanijoukko piiritti linnaa, '
      + 'ja kaupungin johto antautui 18. elokuuta. Seuraavat 27 vuotta linna toimi '
      + 'osmanivallan tukikohtana Podoliassa, kunnes vuoden 1699 rauhansopimus '
      + 'palautti alueen Puolan hallintaan.',
    lahde: 'en-Wikipedia "Kamianets-Podilskyi Castle", johdanto-osa sekä osiot '
      + '"Foundation and early history" ja "Continuous attacks by invaders" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tsernobylin-ydinvoimala',
    nimi: 'Tšernobylin ydinvoimala',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Millainen reaktori RBMK on?',
      'Miksi Prypjatin kaupunki rakennettiin?',
    ],
    korostukset: ['RBMK|RBMK-reaktori', 'Prypjat|Prypjatin'],
    nappi: 'Voimala, jota puretaan vuoteen 2065',
    // 30.0994 E / 51.3892 N — en-Wikipedia "Chernobyl Nuclear Power Plant";
    // lähin pelikaupunki Kiova 43,9 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 6836.6, y: 1329.2 },
    },
    teksti: 'Tšernobylin ydinvoimala seisoo Pohjois-Ukrainassa hylätyn Prypjatin '
      + 'kaupungin vieressä, noin sata kilometriä Kiovasta pohjoiseen ja kuusitoista '
      + 'kilometriä Valko-Venäjän rajalta. Sen neljä reaktoria otettiin käyttöön '
      + 'vuosina 1978–1984. Käytössä ollut RBMK-reaktori on grafiittihidasteinen ja '
      + 'poikkeuksellinen malli: se asettaa kustannustehokkuuden turvallisuuden '
      + 'edelle esimerkiksi VVER-painevesireaktoriin verrattuna.\n\n'
      + '26. huhtikuuta 1986 nelosreaktori räjähti ja suli. Voimala jäi laajan '
      + 'suljetun alueen sisään, jota kutsutaan Tšernobylin suoja-alueeksi. Kolme '
      + 'muuta reaktoria jatkoivat silti käyntiään: kakkonen pysäytettiin '
      + 'lopullisesti 1991 turbiinipalon jälkeen, ykkönen 1996 ja kolmonen 2000.\n\n'
      + 'Vuonna 2013 voimalan haltija ilmoitti reaktorien 1–3 olevan tyhjennetty '
      + 'polttoaineesta, ja 2015 alkoi purkuvaihe, jossa käytön aikana saastunut '
      + 'laitteisto poistetaan. Työn arvioidaan kestävän vuoteen 2065, joten '
      + 'voimalalla on yhä suuri henkilöstö, vaikka yksikään reaktori ei enää tuota '
      + 'sähköä.',
    lahde: 'en-Wikipedia "Chernobyl Nuclear Power Plant", johdanto-osa ja osio '
      + '"Construction" (tarkistettu 6.9.2026).',
  },
  {
    id: 'hersonesos',
    nimi: 'Hersonesos',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Hersonesos tarkoittaa?',
      'Kuka kastettiin täällä vuonna 988?',
    ],
    korostukset: ['Herakleia Pontike|Herakleia Pontikesta'],
    nappi: 'Kreikkalaiskaupunki Krimin kärjessä',
    // 33.4933 E / 44.6117 N — en-Wikipedia "Chersonesus";
    // lähin pelikaupunki Odessa 124,1 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 6949.8, y: 1617.7 },
    },
    teksti: 'Hersonesos oli antiikin kreikkalainen siirtokunta Krimin niemimaan '
      + 'lounaisosassa, nykyisen Sevastopolin laitamilla. Sen perustivat doorilaiset '
      + 'uudisasukkaat Herakleia Pontikesta noin 2 500 vuotta sitten. Nimi tarkoittaa '
      + 'kreikaksi niemimaata ja kuvaa tarkasti paikkaa, jolle kaupunki nousi.\n\n'
      + 'Suuren osan antiikin ajasta Hersonesos oli demokratia: sitä johtivat '
      + 'vaaleilla valitut arkontit ja damiurgeiksi kutsuttu neuvosto. Kaupunkilaisten '
      + 'vala 200-luvulta eaa. on säilynyt meidän päiviimme asti. Rooma piti paikalla '
      + 'varuskuntaa 100-luvulta eaa. aina 370-luvulle jaa., jolloin hunnit valtasivat '
      + 'kaupungin.\n\n'
      + 'Bysantin aikana Hersonesos oli tarkkailupaikka arojen kansoja varten ja '
      + 'syrjäisyytensä vuoksi suosittu karkotuspaikka: sinne lähetettiin muun muassa '
      + 'paavit Klemens I ja Martinus I sekä syrjäytetty keisari Justinianos II. '
      + 'Vuonna 988 Kiovan Vladimir kastettiin täällä, ja siitä alkoi Kiovan Rusin '
      + 'kristillistyminen. Mongolit ryöstivät kaupungin 1299, ja se hylättiin '
      + '1400-luvun kuluessa. Unesco listasi paikan maailmanperintökohteeksi 2013.',
    lahde: 'en-Wikipedia "Chersonesus", johdanto-osa sekä osiot "Greek colony" ja '
      + '"Byzantine era" (tarkistettu 6.9.2026).',
  },
  {
    id: 'lviv',
    nimi: 'Lviv',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kenen mukaan Lviv on nimetty?',
      'Miksi kaupungilla on monta nimeä?',
    ],
    korostukset: ['Galitsia-Volhynia|Galitsia-Volhynian'],
    nappi: 'Kaupunki, jolla on monta nimeä',
    // 24.0322 E / 49.8425 N — en-Wikipedia "Lviv";
    // lähin pelikaupunki Krakova 136,8 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 6634.4, y: 1397 },
    },
    teksti: 'Lviv on Ukrainan viidenneksi suurin kaupunki ja maan länsiosan suurin; '
      + 'asukkaita on arviolta 723 000. Nimi tulee Leo I:stä, ruteenien kuninkaan '
      + 'Danielin vanhimmasta pojasta. Historiansa aikana kaupungilla on ollut monta '
      + 'nimeä: ukrainaksi Lviv, puolaksi Lwów, saksaksi Lemberg ja jiddišiksi '
      + 'Lemberik.\n\n'
      + 'Kaupunki nousi Punaisen Ruteenian ja Galitsian keskukseksi 1300-luvulla. Se '
      + 'oli Galitsia-Volhynian kuningaskunnan pääkaupunki 1272–1340, sai '
      + 'kaupunkioikeudet Puolan Kasimir Suurelta 1356 ja toimi vuodesta 1434 '
      + 'Ruteenian vojevodakunnan pääkaupunkina. Puolan ensimmäisen jaon jälkeen 1772 '
      + 'siitä tuli Habsburgien Galitsian ja Lodomerian kuningaskunnan pääkaupunki, ja '
      + 'vuosina 1918–1939 se oli Lwówin vojevodakunnan keskus toisessa Puolan '
      + 'tasavallassa.\n\n'
      + 'Historiallinen keskusta on mukulakivikatuja ja sekoitus renessanssia, '
      + 'barokkia, uusklassismia ja jugendia. Se kuuluu Unescon '
      + 'maailmanperintöluetteloon — ja on siellä nykyään merkitty uhanalaiseksi '
      + 'kohteeksi.',
    lahde: 'en-Wikipedia "Lviv", johdanto-osa ja osio "Names and symbols" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'hortytsja',
    nimi: 'Hortytsja',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Zaporižžja tarkoittaa?',
      'Mihin Dneprin kosket katosivat?',
    ],
    korostukset: ['Zaporožjen kasakat|Zaporožjen kasakoiden', 'petšenegit|petšenegeille'],
    nappi: 'Dneprin suurin saari',
    // 35.1 E / 47.82 N — en-Wikipedia "Khortytsia";
    // lähin pelikaupunki Odessa 156,9 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 7003.3, y: 1483.9 },
    },
    teksti: 'Hortytsja on Dneprin suurin saari: 12,5 kilometriä pitkä ja enimmillään '
      + '2,5 kilometriä leveä. Se kuuluu Hortytsjan kansallispuistoon ja sijaitsee '
      + 'Zaporižžjan kaupungin rajojen sisällä. Saaren pohjoisosa on kallioinen ja '
      + 'kohoaa kolmisenkymmentä metriä joenuoman yläpuolelle, eteläosa taas on matala '
      + 'ja jää usein tulvan alle.\n\n'
      + 'Saarella on ollut asutusta viiden vuosituhannen ajan, ja sillä on oma osansa '
      + 'Zaporožjen kasakoiden historiassa. Nimen alkuperästä on useita selityksiä; '
      + 'todennäköisimpiä on, että se juontuu muinaisslaavilaisesta jumalasta '
      + 'Horsista.\n\n'
      + 'Zaporižžjan nimi tarkoittaa koskien takaista maata. Keisari Konstantinos VII '
      + 'mainitsee noin vuonna 950 kirjoittamassaan teoksessa saaren heti koskien '
      + 'alapuolella ja kertoo, että koskia ylittävät Rusin miehet olivat helppoa '
      + 'saalista paimentolaisille petšenegeille. Kiovan Rusin ruhtinas Svjatoslav I '
      + 'kuoli juuri koskia ylittäessään vuonna 972. Kosket katosivat 1930-luvulla, '
      + 'kun Dneprin vesivoimalaitos padotti joen; jäljelle jäivät vain '
      + 'graniittikalliot.',
    lahde: 'en-Wikipedia "Khortytsia", johdanto-osa sekä osiot "Geography and '
      + 'location" ja "Earliest references" (tarkistettu 6.9.2026).',
  },
  {
    id: 'poltavan-taistelu',
    nimi: 'Poltavan taistelu',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka johti Ruotsin armeijaa Poltavassa?',
      'Miksi Kaarle XII kääntyi etelään?',
    ],
    korostukset: ['Ivan Mazepa|Ivan Mazepa'],
    nappi: 'Päivä, joka päätti Ruotsin suurvalta-ajan',
    // 34.5528 E / 49.6314 N — en-Wikipedia "Battle of Poltava";
    // lähin pelikaupunki Kiova 139,3 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 6985.1, y: 1406.2 },
    },
    teksti: 'Poltavan taistelu käytiin 8. heinäkuuta 1709, ja se oli suuren Pohjan '
      + 'sodan ratkaiseva ja suurin taistelu. Pietari I:n johtama venäläisarmeija löi '
      + 'Carl Gustaf Rehnskiöldin komentaman ruotsalaisarmeijan. Tappio vei Ruotsilta '
      + 'suurvalta-aseman ja aloitti Venäjän ylivallan Itä-Euroopassa.\n\n'
      + 'Kaarle XII oli hyökännyt Venäjälle syksyllä 1707 ja marssinut kohti Moskovaa. '
      + 'Sää, venäläisten poltetun maan taktiikka ja yllätyshyökkäykset pakottivat '
      + 'hänet kääntymään etelään talvimajoihin, joita järjesti kasakkahetmani Ivan '
      + 'Mazepa. Euroopan kylmimmän mitatun talven jälkeen heikentynyt armeija piiritti '
      + 'keväällä 1709 Poltavan linnoitusta, joka oli tärkeä kauppapaikka ja varikko '
      + 'Vorsklan varrella.\n\n'
      + 'Pietarin 75 000–80 000 miehen armeija saapui purkamaan piirityksen. '
      + 'Ruotsalaiset lyötiin, ja he pakenivat kentältä. Kaarle ja Mazepa vetäytyivät '
      + '1 500 miehen kanssa Dneprille ja pääsivät sen yli osmanien puolelle; loput '
      + 'armeijasta antautui Perevolotšnassa 11. heinäkuuta 1709.',
    lahde: 'en-Wikipedia "Battle of Poltava", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'sofijivkan-puisto',
    nimi: 'Sofijivkan puisto',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kenelle puisto oli syntymäpäivälahja?',
      'Mikä Acheron on tässä puistossa?',
    ],
    korostukset: ['Acheron|Acheron'],
    nappi: 'Syntymäpäivälahja, joka maksoi omaisuuden',
    // 30.2436 E / 48.7642 N — en-Wikipedia "Sofiyivka Park";
    // lähin pelikaupunki Kiova 73,2 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 6841.5, y: 1443.6 },
    },
    teksti: 'Sofijivkan puisto on arboretum ja tutkimuslaitos Umanin kaupungin '
      + 'pohjoisosassa Tšerkasyn alueella, Kamjanka-joen varrella. Puistossa kasvaa '
      + 'yli 2 000 puu- ja pensaslajia, niiden joukossa suokypressi, strobusmänty, '
      + 'tulppaanipuu, plataani ja neidonhiuspuu. Vuosittain sen läpi kulkee noin '
      + '300 000 kävijää.\n\n'
      + 'Englantilaistyylisen puiston perusti vuonna 1796 kreivi Stanisław Szczęsny '
      + 'Potocki, puolalainen aatelismies, joka rakensi Umanin uudelleen '
      + 'talonpoikaiskapinan jälkeen. Puisto sai nimensä hänen kreikkalaissyntyisen '
      + 'vaimonsa Sofian mukaan ja oli tälle syntymäpäivälahja. Sen hinnaksi '
      + 'arvioitiin viisitoista miljoonaa zlotya — aikanaan omaisuus.\n\n'
      + 'Työtä johti puolalainen sotilasinsinööri Ludwik Metzel, joka toi harvinaisia '
      + 'kasveja eri puolilta Eurooppaa ja käytti työvoimana paikallisia maaorjia. '
      + 'Maasto oli rosoista ja rotkoista, ja siihen rakennettiin altaita ja lampia, '
      + 'vesiputouksia — korkein neljätoista metriä — sulkuja, suihkulähteitä ja 224 '
      + 'metriä pitkä maanalainen joki, jolle annettiin nimi Acheron. Vuonna 1985 '
      + 'pieni planeetta numero 2259 nimettiin puiston mukaan.',
    lahde: 'en-Wikipedia "Sofiyivka Park", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'derzhprom',
    nimi: 'Derzhprom',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä nimi Derzhprom tarkoittaa?',
      'Mistä kohtaa rakennuksen symmetrian näkee?',
    ],
    korostukset: ['konstruktivismi|konstruktivismin'],
    nappi: 'Neuvostoliiton ensimmäinen pilvenpiirtäjä',
    // 36.2272 E / 50.0064 N — en-Wikipedia "Derzhprom";
    // lähin pelikaupunki Kiova 191,5 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 7040.9, y: 1389.9 },
    },
    teksti: 'Derzhprom on toimistorakennus Harkovan Vapaudenaukion laidalla. Se '
      + 'valmistui 1928 ja oli Neuvostoliiton ensimmäinen moderni pilvenpiirtäjä sekä '
      + 'konstruktivismin pääteoksia. Nimi on lyhenne kahdesta sanasta, jotka yhdessä '
      + 'tarkoittavat valtion teollisuutta.\n\n'
      + 'Arkkitehdit Sergei Serafimov, Samuil Kravets ja Mark Felger saivat '
      + 'rakennuksen pystyyn kolmessa vuodessa, ja avajaiset pidettiin 7. marraskuuta '
      + '1928. Valmistuessaan se oli maailman tilavin yksittäinen rakennus, eikä sitä '
      + 'ohitettu ennen 1930-lukua. Erikoisin piirre on symmetria, jonka näkee vain '
      + 'yhdestä pisteestä: aukion keskeltä.\n\n'
      + 'Betoni, toisiinsa kytketyt tornit ja niiden väliset yläkulkusillat tekivät '
      + 'talosta poikkeuksellisen. Sisällä oli ilmastointi, sähkövalot ja radiopisteet '
      + 'sekä Ukrainan ensimmäinen jätekuilujärjestelmä. Arkkitehtuurikriitikko Reyner '
      + 'Banham piti taloa 1920-luvun merkittävimpien saavutusten joukossa — '
      + 'mittakaavaltaan verrattavissa vain Dessaun Bauhausiin ja Rotterdamin Van '
      + 'Nelle -tehtaaseen.',
    lahde: 'en-Wikipedia "Derzhprom", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
];

