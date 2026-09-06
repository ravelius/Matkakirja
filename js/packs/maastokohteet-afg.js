/*
 * MAASTOKOHTEET — AFG. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs AFG --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/AFG.json. Työkalu laskee laudan
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
 * Afganistanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Merta maalla ei ole, joten vuoren rinnalla on kaksi jokea: rajajoki Amudarja ja maan oma pisin Helmand.
 */
export const MAASTOKOHTEET_AFG = [
  {
    id: 'noshaq',
    nimi: 'Noshaq',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Hindukuš on?',
      'Miksi Wakhanin käytävä on niin kapea?',
    ],
    korostukset: ['Hindukuš|Hindukušin'],
    nappi: 'Maailman läntisin 7 000 metrin huippu',
    // 71.8283 E / 36.4317 N — en-Wikipedia "Noshaq"
    laudat: {
      maailmankartta: { x: 8227.6, y: 1941.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Noshaq on Afganistanin korkein vuori: 7 492 metriä Hindukušin vuoristossa Pakistanin '
      + 'rajalla, maan koillisessa Wakhanin käytävässä. Koko Hindukušissa sen edelle kohoaa '
      + 'vain Tirich Mir. Samalla se on maailman läntisin seitsemän kilometrin korkeuteen '
      + 'yltävä huippu — siitä länteen yhtä korkeaa ei ole missään.',
    lahde: 'en-Wikipedia "Noshaq", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'amudarja',
    nimi: 'Amudarja',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Amudarja ei enää yllä Araljärveen?',
      'Mikä oli Turan?',
    ],
    korostukset: ['Oxus|Oxus'],
    nappi: 'Antiikin Oxus, Iranin ja Turanin raja',
    // 67 E / 37.3 N — joen Afganistanin-rajan osuus Termezin luona; artikkelin koordinaatti 59,68 / 44,11 on kuivuneessa suistossa Uzbekistanissa
    laudat: {
      maailmankartta: { x: 8066.7, y: 1907.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Amudarja, antiikin aikana Oxus, on Keski-Aasian suuria jokia: se syntyy Pamirin '
      + 'vuoristossa Vahšin ja Pandžin yhtyessä ja muodostaa yläjuoksullaan Afganistanin '
      + 'pohjoisrajan. Vanhassa historiassa sitä pidettiin Iranin ja Turanin eli '
      + 'paimentolaisten arojen rajana. Nykyään joki ei enää yllä Araljärveen asti, vaan sen '
      + 'suu on entisen järven kuivuneella pohjalla.',
    lahde: 'en-Wikipedia "Amu Darya", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'helmand',
    nimi: 'Helmand',
    tyyppi: 'joki',
    kysymykset: [
      'Minne joki päätyy, jos ei mereen?',
      'Mikä Sistanin allas on?',
    ],
    korostukset: ['Hamunjärvi|Hamunjärveen'],
    nappi: 'Joki, joka ei laske mereen',
    // 64.36 E / 31.59 N — keskijuoksu Lashkar Gahin kohdalla; artikkelilla ei ole jokea kuvaavaa keskipistettä
    laudat: {
      maailmankartta: { x: 7978.7, y: 2122.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Helmand on Afganistanin pisin joki. Se saa alkunsa Hindukušin Sanglakhin vuorilta '
      + 'Kabulin länsipuolelta ja virtaa maan kuivan lounaisosan halki. Mereen se ei laske '
      + 'koskaan: joki päättyy Hamunjärveen Iranin rajalle, sillä koko Sistanin allas on '
      + 'umpinainen — vesi poistuu sieltä vain haihtumalla.',
    lahde: 'en-Wikipedia "Helmand River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (7) — ERÄ M14, AASIA 4, 6.9.2026 ──────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Afganistanilla oli ennen tätä erää kolme maastokohdetta (Noshaq,
   * Amudarja, Helmand) ja yksi kohde (Bamiyanin buddhat,
   * js/packs/fokuskohteet-afg.js) eikä eläintäkyä tai skandaalia
   * lainkaan. Tavoite maata kohti on kahdeksan KOHDETTA ja kolme
   * MAASTOKOHDETTA, joten tästä erästä tuli seitsemän kohdetta;
   * maastokiintiö oli jo täynnä. Bamiyanin buddhia EI toisteta täällä.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)`; lon/lat on luettu en-Wikipedian
   * coordinates-propista tai — kun prop on tyhjä — artikkelin oman
   * infolaatikon {{coord}}-mallista, ja kumpi kulloinkin, se lukee
   * kohteen koordinaattirivillä. Jokainen piste osuu maan fokuslehden
   * rajaukseen (x 7763,1…8416,2 ja y 1798,6…2262,4).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin on kirjattu
   * jokaisen kohteen koordinaattirivin viereen. Raja
   * KAUPUNGIN_KOHDALLA_SADE on 7.
   *
   * AASIAN LINJAUS ON SITOVA (docs/aasia-tyoaineisto/spec-asia.md):
   * historia asiallisesti, ei nykypolitiikkaa, ja artikkelit joiden
   * nykytila on sotaa jätetään pois (M3:n Myanmar-linja). Siksi
   * kortit kertovat kohteiden oman historian eivätkä maan nykytilaa,
   * eikä Bagramia kirjoitettu lainkaan: sen artikkeli lepää
   * lentotukikohdan ja sodan varassa.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'band-e-amir',
    nimi: 'Band-e Amir',
    // Järvet eivät ole meri-otsakkeen kohde eikä maastokiintiössä ole
    // tilaa: tyyppi 'muu' + symboli 'luonto' kuten maan naapuripakin
    // Araljärvellä (js/packs/maastokohteet-uzb.js).
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä pitää järvien veden paikallaan?',
      'Mistä nimi Band-e Amir tulee?',
    ],
    korostukset: ['travertiini|travertiini'],
    nappi: 'Kuusi sinistä järveä omien patojensa takana',
    // 67.2308 E / 34.8397 N — en-Wikipedia "Band-e Amir National Park"
    // (artikkelin infolaatikon coord). Lähin pelikaupunki Kabul 66,8
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 8074.4, y: 2001.5 },
    },
    teksti: 'Band-e Amir on Afganistanin ensimmäinen kansallispuisto, perustettu 22. '
      + 'toukokuuta 2009 Bamiyanin maakuntaan. Sen kuusi järveä ovat syvänsinisiä ja '
      + 'makaavat Hindukušin karussa vuoristoaavikossa toistensa yläpuolella. Padot eivät '
      + 'ole ihmisen tekemiä: kallioiden raoista tihkuva mineraalipitoinen vesi on '
      + 'saostanut kalsiumkarbonaattia, ja vuosituhansien aikana kertynyt travertiini on '
      + 'kasvattanut seinämät, jotka pitävät veden paikallaan. Tällaisia järviä on '
      + 'maailmassa vain harvassa. Nimi tarkoittaa darin kielellä hallitsijan patoa, ja '
      + 'puistosta saa alkunsa Balkhjoki, joka virtaa pohjoiseen.',
    lahde: 'en-Wikipedia "Band-e Amir National Park", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'jamin-minareetti',
    nimi: 'Jamin minareetti',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi torni on niin vaikeasti tavoitettavissa?',
      'Mitä torniin on kirjoitettu?',
    ],
    korostukset: ['Ghuridien|Ghuridien'],
    nappi: 'Poltettua tiiltä keskellä ei mitään',
    // 64.51606 E / 34.39656 N — en-Wikipedia "Minaret of Jam"
    // (coordinates-prop). Lähin pelikaupunki Kabul 156,1 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7983.9, y: 2018.1 },
    },
    teksti: 'Jamin minareetti seisoo yksin syrjäisessä vuorilaaksossa Ghorin maakunnassa, '
      + 'Jam- ja Harijokien välissä. Se rakennettiin noin vuonna 1190 kokonaan poltetusta '
      + 'tiilestä, ja sen korkeudeksi ilmoitetaan 62 tai 65 metriä. Ulkopintaa kiertävät '
      + 'kufilaisella ja naskhilaisella kalligrafialla kirjoitetut Koraanin jakeet, '
      + 'geometriset kuviot ja turkoosit lasitetut laatat; sisällä kaksi kierreporrasta, '
      + 'kummassakin 159 askelmaa, nousevat parvekkeille. Torni on todennäköisesti '
      + 'Ghuridien kadonneen pääkaupungin Firozkohin paikalla, ja sen uskotaan olleen '
      + 'esikuva Delhin Qutub Minarille. Unescon maailmanperintökohde se on ollut vuodesta '
      + '2002 ja samasta vuodesta asti myös uhanalaisten listalla.',
    lahde: 'en-Wikipedia "Minaret of Jam", johdanto sekä osiot "Architecture" ja "Site" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'heratin-linnoitus',
    nimi: 'Heratin linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka linnoituksen perusti?',
      'Mitä linnoituksen sisällä on nykyään?',
    ],
    korostukset: ['Qala-ye Ikhtiaruddin|Qala-ye Ikhtiaruddin'],
    nappi: 'Linna, joka on purettu ja rakennettu yhä uudelleen',
    // 62.18861 E / 34.34583 N — en-Wikipedia "Herat Citadel"
    // (artikkelin infolaatikon coord). Lähin pelikaupunki Kabul 233,8
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 7906.3, y: 2020 },
    },
    teksti: 'Heratin linnoitus eli Arg-e Herat, paikallisesti Qala-ye Ikhtiaruddin, kohoaa '
      + 'keskellä Heratin kaupunkia. Sen perustus juontuu vuoteen 330 eaa., jolloin '
      + 'Aleksanteri Suuri joukkoineen saapui alueelle Gaugamelan taistelun jälkeen. '
      + 'Kahdentuhannen vuoden aikana lukuisat valtakunnat pitivät linnaa päämajanaan, ja '
      + 'se tuhottiin ja rakennettiin uudelleen monta kertaa. Vuosina 2006–2011 linnoitus '
      + 'kunnostettiin kokonaan satojen afganistanilaisten käsityöläisten voimin. Muurien '
      + 'sisällä toimii Heratin museo, jonka kokoelmissa on noin 1 100 esinettä '
      + 'ympäröivältä seudulta.',
    lahde: 'en-Wikipedia "Herat Citadel", johdanto sekä osiot "History" ja "Recent '
      + 'restoration" (tarkistettu 6.9.2026).',
  },
  {
    id: 'balkh',
    nimi: 'Balkh',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kaupunkia sanottiin kaupunkien äidiksi?',
      'Kuka Baktriassa meni naimisiin?',
    ],
    korostukset: ['Zarathustra|Zarathustra'],
    nappi: 'Zarathustran kaupunki karavaaniteiden risteyksessä',
    // 66.89806 E / 36.75806 N — en-Wikipedia "Balkh"
    // (coordinates-prop). Lähin pelikaupunki Samarkand 113,9
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 8063.3, y: 1928.6 },
    },
    teksti: 'Balkh on yksi Aasian vanhimmista kaupungeista. Mahabharata tuntee sen nimellä '
      + 'Valhika ja kertoo, että sen perustivat kiinalaisella silkillä, pashminalla, '
      + 'jalokivillä ja hajusteilla kauppaa käyneet kauppiaat. Ranskalaiset arkeologit ovat '
      + 'ajoittaneet kaupunkilinnan Bala Hissarin ensimmäisen asutuksen varhaiselle '
      + 'rautakaudelle, noin vuosiin 1500–1000 eaa. Balkh oli pitkään zarathustralaisuuden '
      + 'keskus, ja persialaisrunoilija Ferdowsin mukaan Zarathustra kuoli sen muurien '
      + 'sisäpuolella. Aleksanteri Suuri nai baktrialaisen Roxanen 300-luvulla eaa., ja '
      + 'kaupunki oli yksi kreikkalais-baktrialaisen kuningaskunnan pääkaupungeista.',
    lahde: 'en-Wikipedia "Balkh", osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'mes-aynak',
    nimi: 'Mes Aynak',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Mes Aynak tarkoittaa?',
      'Miksi paikka on kahden asian välissä?',
    ],
    korostukset: ['stupa|stupien'],
    nappi: 'Buddhalaisluostarit kuparimalmin päällä',
    // 69.3070 E / 34.2707 N — en-Wikipedia "Mes Aynak" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Kabul 9,3 lautayksikköä
    // eli yli KAUPUNGIN_KOHDALLA_SADEn (7) ja yli kaupunkikaton (8);
    // koko erän lähin merkki.
    laudat: {
      maailmankartta: { x: 8143.6, y: 2022.9 },
    },
    teksti: 'Mes Aynak tarkoittaa pientä kuparilähdettä, ja nimi kertoo kaiken. Paikka on '
      + '40 kilometriä Kabulista kaakkoon Logarin maakunnan karussa maastossa, ja siellä on '
      + '40 hehtaarin laajuinen buddhalaisten luostarien, asuintalojen, stupien ja '
      + 'torialueiden kokonaisuus sekä yli 400 Buddha-patsasta. Löydöt ulottuvat '
      + 'pronssikaudelle asti, ja buddhalaisen kerroksen alta on alkanut paljastua 5 000 '
      + 'vuotta vanha asuinpaikka kuparisulattoineen. Kukoistuksensa Mes Aynak eli 400- ja '
      + '600-lukujen välillä ja hylättiin lopullisesti noin tuhat vuotta sitten. Saman '
      + 'kukkulan alla on Afganistanin suurin tunnettu kupariesiintymä, ja kaivostoiminta '
      + 'uhkaa jäänteitä; arkeologit ovat dokumentoineet paikan valokuvin ja kaivauksin.',
    lahde: 'en-Wikipedia "Mes Aynak", johdanto sekä osiot "Etymology", "History" ja '
      + '"Mining lease" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ai-khanoum',
    nimi: 'Ai-Khanoum',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä kreikkalainen kaupunki tänne tuli?',
      'Mitä kaupungin oikea nimi oli?',
    ],
    korostukset: ['akropoli|akropoli'],
    nappi: 'Kreikkalainen kaupunki Oxuksen rannalla',
    // 69.40861 E / 37.16472 N — en-Wikipedia "Ai-Khanoum"
    // (coordinates-prop). Lähin pelikaupunki Kabul 101,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 8147, y: 1913 },
    },
    teksti: 'Ai-Khanoum tarkoittaa Kuurouvaa, ja se on hellenistisen kaupungin '
      + 'kaivauspaikka Takharin maakunnassa. Kaupungin alkuperäistä nimeä ei tiedetä. Sen '
      + 'perusti todennäköisesti vuosien 300 ja 285 eaa. välillä joku Seleukos I '
      + 'Nikatorin tai Antiokhos I Soterin virkamies, ja siitä tuli kreikkalais-'
      + 'baktrialaisen kuningaskunnan sotilaallinen ja taloudellinen keskus, kunnes se '
      + 'tuhoutui noin 145 eaa. Kaupunki nousi Amudarjan eli antiikin Oxuksen ja Kokchan '
      + 'yhtymäkohtaan, ja se jakautui alakaupunkiin ja 60 metriä korkealle akropolille. '
      + 'Paikka löydettiin uudelleen 1961, ja ranskalainen tutkimusryhmä kaivoi sitä, '
      + 'kunnes työ keskeytyi 1970-luvun lopulla.',
    lahde: 'en-Wikipedia "Ai-Khanoum", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'ghazni',
    nimi: 'Ghazni',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä kaupungin nimi tarkoittaa?',
      'Kuka teki Ghaznista pääkaupungin?',
    ],
    korostukset: ['Ghaznavidien|Ghaznavidien'],
    nappi: 'Aarre, joka on myös kaupungin nimi',
    // 68.42333 E / 33.54917 N — en-Wikipedia "Ghazni"
    // (coordinates-prop). Lähin pelikaupunki Kabul 44,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 8114.1, y: 2049.9 },
    },
    teksti: 'Ghazni on noin 150 kilometriä Kabulista lounaaseen, ja sen nimi juontuu '
      + 'persian sanasta ganj, aarre. Kaupungin linna, Mas’ud III:n palatsi ja '
      + 'Ghaznin minareetit ovat vetäneet matkalaisia ja arkeologeja puoleensa vuosisatoja. '
      + 'Ennen islamia seudulla harjoitettiin buddhalaisuutta, hindulaisuutta ja '
      + 'zarathustralaisuutta; kiinalainen pyhiinvaeltaja Xuanzang kävi täällä 644 ja '
      + 'kuvaili runsasta viljelysmaata ja ankaraa, luminen talvea. Sabuktigin teki '
      + 'Ghaznista Ghaznavidien valtakunnan pääkaupungin 900-luvulla. Kaupungin '
      + 'linnoituksia purettiin osittain 1800-luvulla ensimmäisen anglo-afgaanisodan '
      + 'aikana.',
    lahde: 'en-Wikipedia "Ghazni", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
];
