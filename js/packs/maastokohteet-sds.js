/*
 * MAASTOKOHTEET — SDS. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SDS --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SDS.json. Työkalu laskee laudan
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
 * Etelä-Sudanin maastokohteet. Pelin maakoodi on SDS (Natural Earthin ADM0_A3, ks. tools/fokuskartta/aineisto.mjs NE_PAIKKATUNNUS) — ISO-koodi SSD esiintyy vain aineistokäännöksissä. Faktat en-Wikipediasta 30.8.2026.
 *
 * MAAILMAN ERÄ M5 (6.9.2026) lisäsi listaan Suddin MAASTOKOHTEEKSI sekä
 * kahdeksan KOHDETTA — Gondokoro, Lado, Jonglein kanava, Boman puisto,
 * Bandingilon puisto, Wau, Nzara ja Nimule. Lähin uusi merkki on Wau
 * 34,0 lautayksikön päässä Bahr el Ghazal -laatasta
 * (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat pääkartan merkkejä.
 * Erä on kuvaton, ja jokaisen kohteen lähin pelikaupunki on kirjattu
 * sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_SDS = [
  {
    id: 'kinyeti',
    nimi: 'Kinyeti',
    tyyppi: 'vuori',
    kysymykset: [
      'Missä Imatong-vuoret sijaitsevat?',
      'Miksi vuoren metsät ovat lajissaan pohjoisimmat?',
    ],
    korostukset: ['Imatong-vuoristo|Imatong-vuoristossa'],
    nappi: 'Etelä-Sudanin korkein huippu',
    // 32.9089 E / 3.9475 N — en-Wikipedia "Kinyeti"
    laudat: {
      maailmankartta: { x: 6930.3, y: 3079.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Etelä-Sudanin korkein huippu on samalla erään metsätyypin viimeinen etuvartio '
      + 'pohjoisessa. Kinyeti kohoaa 3 187 metriin Imatong-vuoristossa lähellä Ugandan rajaa, '
      + 'ja sen alarinteitä peitti tiheä sademetsä — Itä-Afrikan vuoristometsien pohjoisin '
      + 'esiintymä, jonka jälkeen alkaa Sahelin kuivuus. Huippu itse on paljasta kalliota, '
      + 'jonka koloissa kasvaa vuoristoniittyä ja matalaa kanervikkoa. Ensimmäisiä '
      + 'eurooppalaisia kävijöitä oli kasvitieteilijä Thomas Ford Chipp, joka löysi huipun '
      + 'läheltä tieteelle uuden kasvin, Coreopsis chippiin. Vuoren mukaan on nimetty myös '
      + 'uhanalainen kameleontti, Trioceros kinetensis.',
    lahde: 'en-Wikipedia "Kinyeti" (tarkistettu 1.9.2026).',
  },
  {
    id: 'valkoinenniili',
    nimi: 'Valkoinen Niili',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä on Sudd?',
      'Miksi Niilin lähdettä etsittiin idästä käsin?',
    ],
    korostukset: ['Sudd|Suddin'],
    nappi: 'Niilin pitempi haara',
    // 31.65 E / 9.53 N — Malakal joen varrella; artikkelilla ei ole koordinaattia
    laudat: {
      maailmankartta: { x: 6888.3, y: 2892.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Arabian kielen sana sadd tarkoittaa estettä, ja juuri siksi Niilin lähdettä ei '
      + 'löydetty jokea pitkin. Valkoisen Niilin keskijuoksu leviää Etelä-Sudanissa Suddin '
      + 'suoksi — yhdeksi maailman laajimmista kosteikoista, jonka kelluvat kasvilautat '
      + 'tukkivat kulun vuosisadoiksi. Muinaiset egyptiläiset eivät päässeet sen läpi. Vuonna '
      + '61 keisari Neron lähettämä roomalainen sotilasosasto eteni Valkoista Niiliä ylös mutta '
      + 'pysähtyi Suddiin, ja siihen jäi Rooman tunnettu maailma päiväntasaajan suunnassa. '
      + 'Siksi lähteen etsijät joutuivat kulkemaan maitse Itä-Afrikan rannikolta. Joen vaalea '
      + 'väri tulee savesta, jota vesi kantaa mukanaan.',
    lahde: 'en-Wikipedia "White Nile", johdanto-osa, ja en-Wikipedia "Sudd", johdanto-osa '
      + '(tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * MAAILMAN ERÄ M5, AFRIKKA 6.9.2026 — YKSI MAASTOKOHDE JA KAHDEKSAN
   * KOHDETTA. Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Etelä-Sudanilla oli kaksi maastokohdetta ja nolla
   * kohdetta (docs/moduulit/karttanostot-kattavuus.md, Afrikka), joten
   * erä täytti maastovajeen Suddilla ja kirjoitti kahdeksan kohdetta.
   * Kaikki yhdeksän ovat pääkartan merkkejä: etäisyys mitattiin
   * jokaiseen js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin
   * uusi merkki on Wau 34,0 lautayksikön päässä Bahr el Ghazal
   * -laatasta (raja KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js).
   * Kuvaton erä; faktat en-Wikipedian raakatekstistä 6.9.2026, ja
   * jokainen `lahde`-rivi kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'sudd',
    nimi: 'Sudd',
    tyyppi: 'jarvi',
    kysymykset: [
      'Mitä arabian sana sudd tarkoittaa?',
      'Miksi roomalaiset eivät päässeet Niiliä ylöspäin vuonna 61?',
    ],
    korostukset: ['kelluva|kelluvasta'],
    nappi: 'Suo, joka pysäytti Niilin matkalaiset',
    // 31.0 E / 8.0 N — en-Wikipedia "Sudd"
    // Lähin pelikaupunki: Bahr el Ghazal 132,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6866.7, y: 2944.3 },
    },
    teksti: 'Sudd on Etelä-Sudanin valtava suo, jonka Valkoisen Niilin Bahr al-Jabal '
      + '-haara muodostaa. Arabian sana sudd tulee sanasta sadd, este tai tukos, ja samaa '
      + 'nimeä käytetään nykyään mistä tahansa suuresta kelluvasta kasvilautasta. Suo on '
      + 'maailman laajimpia kosteikkoja ja Niilin altaan suurin makean veden kosteikko: '
      + 'keskimäärin yli 30 000 neliökilometriä, mutta sadekaudella jopa 130 000 eli '
      + 'viidennes koko maasta. Vuosisatojen ajan sen kasvitiheikkö oli ylitsepääsemätön '
      + 'este Niiliä pitkin kulkeville: muinaiset egyptiläiset eivät päässeet sen ohi, ja '
      + 'keisari Neron vuonna 61 lähettämä roomalaisjoukko pysähtyi siihen — se jäi Rooman '
      + 'tunkeutumisen rajaksi päiväntasaajan Afrikkaan. Siksi myös Niilin lähteitä '
      + 'etsittiin myöhemmin maitse idän rannikolta käsin.',
    lahde: 'en-Wikipedia "Sudd", johdanto-osa ja osio "Location" (tarkistettu 6.9.2026).',
  },
  {
    id: 'gondokoro',
    nimi: 'Gondokoro',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi Gondokoro oli tärkeä juuri siinä kohdassa jokea?',
      'Kuka otti Speken ja Grantin vastaan 1863?',
    ],
    korostukset: ['purjehduskelpoinen|purjehduskelpoinen'],
    nappi: 'Niilin viimeinen satama 1800-luvulla',
    // 31.6614 E / 4.9072 N — en-Wikipedia "Gondokoro"
    // Lähin pelikaupunki: Viktoria Nyanza 163,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6888.7, y: 3047.8 },
    },
    teksti: 'Gondokoro on saari ja entinen kauppa-asema Valkoisen Niilin itärannalla, '
      + '1 200 kilometriä Khartumista etelään. Sen merkitys oli sijainnissa: se oli '
      + 'muutaman kilometrin päässä siitä kohdasta, johon Khartumista ylävirtaan '
      + 'purjehduskelpoinen joki päättyi, ja siitä eteenpäin matka etelään jatkui maitse. '
      + 'Itävaltalainen katolinen lähetyssaarnaaja Ignatius Knoblecher perusti paikalle '
      + 'aseman 1852; se hylättiin 1859. Vuonna 1862 tutkimusmatkailija Alexine Tinne '
      + 'valokuvasi paikan ensimmäisenä. Gondokoroon saapuivat 13. helmikuuta 1863 '
      + 'uupuneina John Hanning Speke ja James Augustus Grant kahden vuoden ja viiden '
      + 'kuukauden matkalta Sansibarista; heitä oli määrä olla vastassa konsuli John '
      + 'Petherick, mutta tämä oli metsästämässä, ja tervetulokupin teetä tarjosivat Samuel '
      + 'ja Florence Baker. Vuonna 1874 Charles George Gordon otti paikan Egyptin kediivin '
      + 'nimissä.',
    lahde: 'en-Wikipedia "Gondokoro", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'lado',
    nimi: 'Lado',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka hallitsi Ladon aluetta 1894–1910?',
      'Miksi Gordon siirsi hallintokeskuksen Gondokorosta?',
    ],
    korostukset: ['vuokra-alue|vuokra-alue'],
    nappi: 'Vuokra-alue Niilin länsirannalla',
    // 29.8333 E / 4.8333 N — en-Wikipedia "Lado Enclave"
    // Lähin pelikaupunki: Bahr el Ghazal 141,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6827.8, y: 3050.3 },
    },
    teksti: 'Lado oli vuokra-alue, jota Kongon vapaavaltio ja sen jälkeen Belgian Kongo '
      + 'hallitsivat 1894–1910. Se sijaitsi ylä-Niilin länsirannalla nykyisen Etelä-Sudanin '
      + 'ja Luoteis-Ugandan alueella, ja sen pääpaikka oli Lado. Seutu on perinteisesti '
      + 'lugbara-, kakwa-, bari- ja moru-kansojen kotia, ja se kuului ensin '
      + 'ottomaanien Egyptin Ekvatorian maakuntaan; eurooppalaiset kävivät siellä ensi '
      + 'kerran 1841–1842, ja siitä tuli norsunluun ja orjien kauppapaikka. Samuel Baker '
      + 'loi alueelle hallinnon 1869 Gondokorosta käsin ja tukahdutti orjakauppaa. Kun '
      + 'Charles George Gordon seurasi häntä Ekvatorian kuvernöörinä 1874, hän piti '
      + 'Gondokoron ilmastoa epäterveellisenä ja siirsi hallintokeskuksen alavirtaan '
      + 'paikkaan, jota kutsui Ladoksi — kadut leveiksi ja suoriksi ja varjopuita riviin, '
      + 'kuten intialaisessa varuskuntakaupungissa.',
    lahde: 'en-Wikipedia "Lado Enclave", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'jonglein-kanava',
    nimi: 'Jonglein kanava',
    nimio: 'Jonglei',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä kanavalla oli tarkoitus tehdä?',
      'Kuinka pitkälle kaivuu ehti ennen kuin se pysähtyi?',
    ],
    korostukset: ['haihtuminen|haihtumiseen'],
    nappi: 'Kanava, jota ei koskaan saatu valmiiksi',
    // 31.5081 E / 7.0131 N — en-Wikipedia "Jonglei Canal"
    // Lähin pelikaupunki: Bahr el Ghazal 153,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6883.6, y: 2977.3 },
    },
    teksti: 'Jonglein kanava oli hanke, jolla vettä olisi ohjattu Suddin kosteikkojen ohi '
      + 'niin, että Sudaniin ja Egyptiin olisi riittänyt alavirrassa enemmän kastelu- ja '
      + 'käyttövettä. Ajatuksen esitti Sir William Garstin 1907; Egyptin hallitus teki '
      + 'selvityksen 1946, ja suunnitelmat muotoutuivat 1954–1959. Perustelu oli '
      + 'vesitaloudellinen: Bahr el Ghazalin sivujokien vedet eivät käytännössä koskaan '
      + 'päädy Niilin pääuomaan, vaan ne katoavat suossa haihtumiseen ja kasvien '
      + 'haihduntaan. Kaivuu alkoi 1978, mutta Sudanin sisäiset levottomuudet viivyttivät '
      + 'sitä, ja kun SPLA pysäytti työt 1984, kanavaa oli kaivettu 240 kilometriä '
      + 'kaikkiaan 360:stä. Kiista kanavasta ja Niilin vesistä toi ympäristöulottuvuuden '
      + 'vuosien 1983–2005 sotaan.',
    lahde: 'en-Wikipedia "Jonglei Canal", johdanto-osa sekä osiot "Concept" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'boman-puisto',
    nimi: 'Boman puisto',
    nimio: 'Boma',
    tyyppi: 'elain',
    kysymykset: [
      'Mikä on maailman suurin vuotuinen eläinvaellus?',
      'Milloin puisto perustettiin?',
    ],
    korostukset: ['vaellus|vaellus'],
    nappi: 'Ruohotasankoa Etiopian rajalla',
    // 33.91 E / 6.49 N — en-Wikipedia "Boma National Park"
    // Lähin pelikaupunki: Addis Abeba 181,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6963.7, y: 2994.9 },
    },
    teksti: 'Boman kansallispuisto on Itä-Etelä-Sudanissa lähellä Etiopian rajaa. Se '
      + 'perustettiin 1977, ja sen 22 800 neliökilometriä on ruohotasankoa ja tulvamaata: '
      + 'eteläosassa on lyhyttä ruohikkoa ja akasiapensaikkoa, idässä lehtimetsää ja '
      + 'lännessä avointa savannia. Kosteikot ovat enimmäkseen kausiluonteisia, mutta '
      + 'muutama vesiallas pysyy ympäri vuoden; suurin niistä on pohjoisosan Juomin suo. '
      + 'Puiston läpi kulkee maailman suurin vuotuinen eläinvaellus, jossa valkokorvakobit, '
      + 'tiangit ja muut antiloopit siirtyvät Bandingilon ja Boman puistojen välillä ja '
      + 'edelleen Etiopian Gambellaan. African Parks teki 2022 Etelä-Sudanin hallituksen '
      + 'kanssa kymmenvuotisen sopimuksen puistojen kunnostamisesta, ja heinäkuussa 2026 '
      + 'Unesco nimesi Boman ja Bandingilon vaellusmaiseman maailmanperintökohteeksi ja '
      + 'merkitsi sen samalla uhanalaiseksi.',
    lahde: 'en-Wikipedia "Boma National Park", johdanto-osa ja osio "Wildlife" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'bandingilo',
    nimi: 'Bandingilon puisto',
    nimio: 'Bandingilo',
    tyyppi: 'elain',
    kysymykset: [
      'Milloin puisto perustettiin?',
      'Mitä ruohikolle tapahtuu kuivalla kaudella?',
    ],
    korostukset: ['kirahvi|kirahvi'],
    nappi: 'Vaelluksen toinen pää Valkoisen Niilin varrella',
    // 32.2775 E / 5.4328 N — en-Wikipedia "Bandingilo National Park"
    // Lähin pelikaupunki: Viktoria Nyanza 182,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6909.3, y: 3030.2 },
    },
    teksti: 'Bandingilon kansallispuisto on Etelä-Sudanin Ekvatorian alueella metsäisellä '
      + 'seudulla Valkoisen Niilin varrella. Se perustettiin 1992, ja pinta-alaa on yli '
      + '10 000 neliökilometriä; siihen kuuluu myös laajoja soita, jotka jatkuvat Jongleihin '
      + 'saakka. Puiston kautta kulkee sama suuri vaellus kuin Boman puistonkin: '
      + 'valkokorvakobit, tiangit ja muut antiloopit liikkuvat puistojen välillä ja '
      + 'Etiopian Gambellaan asti. Puistossa elää myös äärimmäisen uhanalainen '
      + 'nubiankirahvi, koillisafrikkalainen gepardi, pohjoinen leijona, afrikanvillakoira, '
      + 'karakali ja täplähyeena, ja lintulajeja arvioitiin 2021 olevan noin 400 — se on '
      + 'nimetty tärkeäksi lintualueeksi. Sadekaudella ruohotasangot tulvivat, ja kuivalla '
      + 'kaudella niitä poltetaan laajalti, mikä pitää ruohomaan avoimena.',
    lahde: 'en-Wikipedia "Bandingilo National Park", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'wau',
    nimi: 'Wau',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Minkä joen rannalla Wau on?',
      'Millä nimellä ranskalaisten tukikohta tunnettiin?',
    ],
    korostukset: ['zariba|zariba'],
    nappi: 'Kauppakaupunki Jur-joen länsirannalla',
    // 28.0 E / 7.7 N — en-Wikipedia "Wau, South Sudan"
    // Lähin pelikaupunki: Bahr el Ghazal 34,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6766.7, y: 2954.3 },
    },
    teksti: 'Wau on Luoteis-Etelä-Sudanin kaupunki Jur-joen länsirannalla ja Läntisen Bahr '
      + 'el Ghazalin alueen pääkaupunki. Juballe on matkaa noin 650 kilometriä luoteeseen, '
      + 'ja kaupunki on seudun kauppakeskus. Sen juuret ovat kahdenlaiset: ranskalainen '
      + 'Marchandin retkikunta perusti paikalle tukikohdan nimeltä Fort Desaix, ja '
      + '1800-luvulla orjakauppiaat pitivät siellä zaribaa eli varustettua tukikohtaa. '
      + 'Anglo-egyptiläisen yhteishallinnon aikana Wausta tuli hallintokeskus. Kaupunki on '
      + 'ollut oma kuntansa vuodesta 2012, ja sitä johtaa pormestari, jonka osavaltion '
      + 'kuvernööri yleensä nimittää; kaupunginosia ovat muun muassa Nazareth, Hai Fahal, '
      + 'Sika Hadid ja Daraja.',
    lahde: 'en-Wikipedia "Wau, South Sudan", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'nzara',
    nimi: 'Nzara',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Azanden hanke oli?',
      'Mikä tauti todettiin Nzarassa ensimmäisen kerran?',
    ],
    korostukset: ['ebola|ebolaepidemia'],
    nappi: 'Azanden hankkeen tehdaskylä',
    // 28.258 E / 4.647 N — en-Wikipedia "Nzara, South Sudan"
    // Lähin pelikaupunki: Bahr el Ghazal 119,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6775.3, y: 3056.5 },
    },
    teksti: 'Nzara on Länsi-Ekvatorian osavaltion kaupunki noin 24 kilometriä Yambiosta '
      + 'luoteeseen ja 25 kilometriä Kongon demokraattisen tasavallan rajalta. Se oli '
      + 'anglo-egyptiläisen siirtomaakauden Azanden hankkeen — toiselta nimeltään Ekvatorian '
      + 'hankkeen — teollinen keskus, jossa alueen puuvilla ja muut tuotteet jalostettiin. '
      + 'Etelä-Sudanin hallitus on vuodesta 2006 aikonut herättää maatalouden ja '
      + 'teollisuuden yhdistelmän uudelleen henkiin. Nzara on myös lääketieteen historiassa: '
      + 'siellä todettiin maailman ensimmäinen kirjattu ebolaepidemia, jossa kesäkuusta 1976 '
      + 'alkaneiden viiden kuukauden aikana kuoli seudulla 151 ihmistä.',
    lahde: 'en-Wikipedia "Nzara, South Sudan", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'nimule',
    nimi: 'Nimule',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Minkä maan rajalla Nimule on?',
      'Milloin Nimulen kansallispuisto perustettiin?',
    ],
    korostukset: ['rajakaupunki|rajakaupunki'],
    nappi: 'Rajakaupunki Ugandan portilla',
    // 32.0636 E / 3.5961 N — en-Wikipedia "Nimule"
    // Lähin pelikaupunki: Viktoria Nyanza 120,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6902.1, y: 3091.6 },
    },
    teksti: 'Nimule on Etelä-Sudanin eteläosan kaupunki Magwin piirikunnassa Itäisessä '
      + 'Ekvatoriassa, noin 197 kilometriä Jubasta kaakkoon ja 120 kilometriä Ugandan '
      + 'Gulusta pohjoiseen. Se on siis rajakaupunki maiden välisen liikenteen varrella. '
      + 'Vuonna 1901 britit käyttivät sitä tukikohtana rangaistusretkellä lango-kansaa '
      + 'vastaan, joka oli tehnyt ryöstöretkiä naapuripiireihin. Asukkaita arvioitiin olevan '
      + 'noin 45 000, ja 2013 parlamentti korotti Nimulen kaupunkineuvoston asemaan. '
      + 'Kaupungin kupeessa on Nimulen kansallispuisto, joka perustettiin 1954 ja jonka 410 '
      + 'neliökilometriä levittäytyy Ugandan rajaa pitkin.',
    lahde: 'en-Wikipedia "Nimule", johdanto-osa ja osio "Overview and history", sekä '
      + 'en-Wikipedia "Nimule National Park", johdanto-osa (tarkistettu 6.9.2026).',
  },
];

