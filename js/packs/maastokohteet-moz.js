/*
 * MAASTOKOHTEET — MOZ. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MOZ --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MOZ.json. Työkalu laskee laudan
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
 * Mosambikin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Monte Binga ja Sambesi ovat fi-Wikipedian asuja.
 */
export const MAASTOKOHTEET_MOZ = [
  {
    id: 'montebinga',
    nimi: 'Monte Binga',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on Chimanimanin rajat ylittävä puisto?',
      'Miksi vuorella on useita valehuippuja?',
    ],
    korostukset: ['Chimanimani|Chimanimanin'],
    nappi: 'Kahden maan rajahuippu',
    // 33.0619 E / -19.7767 N — en-Wikipedia "Monte Binga"
    laudat: {
      maailmankartta: { x: 6935.4, y: 3879.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Monte Bingan huipulle nousevan polun löytää siitä, mistä se haarautuu salakuljettajien '
      + 'vanhalta reitiltä. Bundin laaksosta lännestä lähtevä epämääräinen ura erkanee '
      + 'pääpolusta, joka vie Skeleton Passille rajan yli; itse nousu vie parhaan osan '
      + 'päivästä, ja matkalla tulee vastaan useita valehuippuja ennen kuin oikea löytyy. '
      + 'Vuori, 2 440 metriä, on Mosambikin korkein ja Zimbabwen toiseksi korkein ja seisoo '
      + 'tasan maiden rajalla Chimanimanin rajat ylittävässä puistossa. Kivi on kovaa '
      + 'vaaleanharmaata prekambrista kvartsiittia, joka tekee koko ylätasangosta '
      + 'autiontuntuisen ja paljaan: itäpuolelta nousu on loiva, mutta länsi- ja '
      + 'pohjoisseinämät ovat paikoin pystysuoria.',
    lahde: 'en-Wikipedia "Monte Binga", johdanto-osa sekä osiot "Geology" ja "Climbing" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'intianvaltameri',
    nimi: 'Intian valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Intian valtameri on valtameristä nuorin?',
      'Mikä oli Tethysmeri?',
    ],
    nappi: 'Nuorin ja lämpimin valtameri',
    // 35.6 E / -20.2 N — ulappa Beiran edustalla; en-Wikipedia "Indian Ocean" antaa keskipisteeksi 80 / -20
    laudat: {
      maailmankartta: { x: 7020, y: 3893.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Intian valtameri on maailman kolmanneksi suurin valtameri, ja Mosambikin koko pitkä '
      + 'rannikko on sen rantaa. Se on valtameristä geologisesti nuorin — syntynyt vasta '
      + 'muinaisen Tethysmeren hajottua — ja samalla lämpimin, mikä tekee siitä maapallon '
      + 'ilmastolle erityisen tärkeän. Keskisyvyyttä valtamerellä on 3 741 metriä.',
    lahde: 'en-Wikipedia "Indian Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sambesi',
    nimi: 'Sambesi',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Victorian putoukset ovat?',
      'Mitä Cahora Bassan pato tuottaa?',
    ],
    korostukset: ['Victorian putoukset|Victorian putoukset'],
    nappi: 'Afrikan suuri itäjoki',
    // 33.6 E / -16.15 N — alajuoksu Teten seudulla Mosambikissa; en-Wikipedia "Zambezi" antaa suistolle 36,47 / -18,57
    laudat: {
      maailmankartta: { x: 6953.3, y: 3754.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sambesi on Afrikan neljänneksi pisin joki, pisin itään virtaavista ja suurin Intian '
      + 'valtamereen laskevista. Se alkaa Sambiasta, kiertää 2 574 kilometrin matkan kuuden '
      + 'maan kautta ja ylittää lopulta koko Mosambikin ennen kuin laskee mereen. Joen '
      + 'kuuluisin kohta on Victorian putoukset Sambian ja Zimbabwen rajalla, ja Mosambikin '
      + 'puolella sen vettä patoaa Cahora Bassa, joka tuottaa sähköä sekä Mosambikille että '
      + 'Etelä-Afrikalle.',
    lahde: 'en-Wikipedia "Zambezi", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (8) — ERÄ M13, ETELÄINEN AFRIKKA, 6.9.2026 ─────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Mosambikilla oli ennen tätä erää kolme maastokohdetta mutta ei
   * yhtäkään kohdetta, eläintäkyä eikä skandaalia. Tavoite maata kohti
   * on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)` en-Wikipedian coordinates-propin lon/lat-parista,
   * ja jokainen piste osuu maan fokuslehden rajaukseen
   * (x 6776,7…7258,7 ja y 3462,6…4235,2).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Sofala 21,5 lautayksikön päässä Mosambik-laatasta ja kaukaisin
   * Angoche 211,1 yksikön päässä samasta laatasta. Raja
   * KAUPUNGIN_KOHDALLA_SADE on 7.
   *
   * MOSAMBIKIN SAARI ON PELIKAUPUNKI (`mosambik`), joten sitä ei ole
   * kirjoitettu kohteeksi lainkaan. Cabo Delgadon saaristo — Ibo ja
   * Quirimbas — jätettiin pois M3:n Myanmar-linjalla: artikkelien
   * nykytila on aseellista konfliktia. Bazaruton saaristo on varattu
   * maan eläintäylle (dugongi), joten sekään ei ole täällä kohteena.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'gorongosa',
    nimi: 'Gorongosa',
    tyyppi: 'muu',
    kysymykset: [
      'Kenelle puisto alun perin perustettiin?',
      'Mitä sisällissota teki eläinkannoille?',
    ],
    korostukset: ['Mosambikin yhtiö|Mosambikin yhtiö'],
    nappi: 'Hallintovirkamiesten metsästysmaa',
    // 34.5 E / -18.766 N — en-Wikipedia "Gorongosa National Park"
    laudat: {
      maailmankartta: { x: 6983.3, y: 3844.3 },
    },
    teksti: 'Gorongosan kansallispuisto on Suuren afrikkalaisen hautavajoaman eteläpäässä '
      + 'Keski-Mosambikissa. Yli 4 000 neliökilometrin puistoon kuuluu laakson pohja ja osia '
      + 'ympäröiviltä ylätasangoilta, ja Gorongosa-vuorelta (1 863 m) alkavat joet kastelevat '
      + 'tasangon. Vuotuiset tulvat ja monenlaiset maalajit ovat synnyttäneet '
      + 'ekosysteemimosaiikin: ruohotasankoja, akasiasaarekkeita, savannia, kuivaa '
      + 'hiekkametsää, sateen täyttämiä painanteita ja kalkkikivirotkojen sademetsää. '
      + 'Suojelu alkoi 1920, kun Mosambikin yhtiö rajasi tuhat neliökilometriä '
      + 'metsästysalueeksi yhtiön hallintovirkamiehille ja heidän vierailleen. Mosambikin '
      + 'sisällissodassa 1977–1992 suurten nisäkkäiden määrä romahti jopa 95 prosenttia; '
      + 'Carr-säätiö ja Mosambikin hallitus ovat sittemmin ennallistaneet aluetta yhdessä.',
    lahde: 'en-Wikipedia "Gorongosa National Park", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sofala',
    nimi: 'Sofala',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä kaupungin kulta tuli?',
      'Miksi sataman pohja nousi?',
    ],
    korostukset: ['Kilwa|Kilwan'],
    nappi: 'Kultasatama, joka liettyi umpeen',
    // 34.71667 E / -20.15 N — en-Wikipedia "Sofala"
    laudat: {
      maailmankartta: { x: 6990.6, y: 3892.2 },
    },
    teksti: 'Sofala, nykyiseltä nimeltään Nova Sofala, oli merkittävä swahilikaupunkivaltio '
      + 'ja yksi eteläisen Afrikan vanhimmista tunnetuista satamista. Se syntyi 900-luvulla '
      + 'Buzi-joen suistoon, ja jokea pitkin se oli yhteydessä Manican markkinakaupunkiin ja '
      + 'sitä kautta Suuren Zimbabwen kultakentille. 1180-luvulla Kilwan sulttaani Suleiman '
      + 'Hassan valtasi sataman ja liitti sen Kilwan sulttaanikuntaan. Vuonna 1505 Pêro de '
      + 'Anaia sai sheikki Isufilta luvan rakentaa kauppa-aseman ja linnoituksen: Fort São '
      + 'Caetano oli portugalilaisten toinen linnake Itä-Afrikassa, ja sen kivet tuotiin '
      + 'laivoilla Euroopasta — myöhemmin ne käytettiin uudelleen Beiran katedraaliin. '
      + 'Kuumetaudit veivät varuskunnan, toiminta siirtyi Mosambikin saarelle, ja kun Beira '
      + 'perustettiin 1890 kolmenkymmenen kilometrin päähän pohjoiseen, Sofala menetti '
      + 'lopunkin merkityksensä. Satama, johon kerrottiin mahtuneen sata alusta, on '
      + 'liettynyt umpeen jokivarsien metsänhakkuiden irrottamasta maasta.',
    lahde: 'en-Wikipedia "Sofala", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'inhambane',
    nimi: 'Inhambane',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mitä täältä ostettiin ennen kultaa?',
      'Kuka kutoi kaupungin puuvillan?',
    ],
    korostukset: ['ambra|ambraa'],
    nappi: 'Hyvien ihmisten maa',
    // 35.38333 E / -23.865 N — en-Wikipedia "Inhambane"
    laudat: {
      maailmankartta: { x: 7012.8, y: 4022.1 },
    },
    teksti: 'Inhambane on kaupunki Etelä-Mosambikissa syvän lahden rannalla, jonne pieni '
      + 'Mutamba-joki laskee; kaksi hiekkaniemekettä suojaavat satamaa. Se on yksi '
      + 'Mosambikin itärannikon vanhimmista asutuksista, ja se tunnetaan myös nimellä Terra '
      + 'de Boa Gente, "hyvien ihmisten maa". Kaupunkivaltio alistui vuorollaan Kilwan '
      + 'sulttaanikunnalle, Gazan valtakunnalle ja lopulta Portugalille. Dhow-purjelaivat '
      + 'kävivät täällä kauppaa jo 1000-luvulla, ja ensimmäiset meritse tulleet ulkopuoliset '
      + 'olivat muslimi- ja persialaiskauppiaat, jotka ostivat helmiä ja ambraa. Seutu '
      + 'tunnettiin bitongojen kehräämästä ja kutomasta puuvillasta. Ennen portugalilaisten '
      + 'tuloa karangat valtasivat alueen ja perustivat päällikkökuntia, jotka hallitsivat '
      + 'tongalaisia puuvillantekijöitä ja korjasivat kaupan tuoton.',
    lahde: 'en-Wikipedia "Inhambane", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'cahora-bassa',
    nimi: 'Cahora Bassa',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kenelle padon sähkö rakennettiin?',
      'Kuka omisti padon itsenäisyyden jälkeen?',
    ],
    korostukset: ['vesisähkö|vesisähköä'],
    nappi: 'Sambesin pato, jonka sähkö meni etelään',
    // 32.70472 E / -15.58583 N — en-Wikipedia "Cahora Bassa Dam"
    laudat: {
      maailmankartta: { x: 6923.5, y: 3735.2 },
    },
    teksti: 'Cahora Bassa on pato Sambesi-joen yli Mosambikissa. Hanke alkoi 1969, ja pato '
      + 'valmistui 1979; sen taakse syntyi Cahora Bassa -tekojärvi. Pato rakennettiin '
      + 'ensisijaisesti tuottamaan vesisähköä Etelä-Afrikkaan, ei Mosambikin omaan käyttöön. '
      + 'Se on toinen Sambesin kahdesta suurpadosta — toinen on Kariban pato. Mosambikin ja '
      + 'Portugalin hallitukset omistivat padon yhdessä, mutta osuudet olivat pitkään '
      + 'epätasaiset: itsenäistymisestä vuoteen 2007 Mosambikilla oli 18 ja Portugalilla 82 '
      + 'prosenttia. Vuonna 2007 Portugali laski osuutensa viiteentoista prosenttiin.',
    lahde: 'en-Wikipedia "Cahora Bassa Dam", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'quelimane',
    nimi: 'Quelimane',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuka päätti tänne mantereen ylityksensä?',
      'Mistä joen nimi "hyvien merkkien joki" tulee?',
    ],
    korostukset: ['Livingstone|Livingstone'],
    nappi: 'Hyvien merkkien joen satama',
    // 36.888 E / -17.878 N — en-Wikipedia "Quelimane", johdanto-osan sijaintitiedot
    laudat: {
      maailmankartta: { x: 7062.9, y: 3813.7 },
    },
    teksti: 'Quelimane on satamakaupunki Mosambikissa, Zambezian maakunnan pääkaupunki ja '
      + 'sen suurin kaupunki. Se sijaitsee 25 kilometriä Rio dos Bons Sinais -joen suulta; '
      + 'joen nimi tarkoittaa "hyvien merkkien jokea", ja sen antoi Vasco da Gama, joka '
      + 'Intiaan matkallaan näki täällä merkit siitä, että hän oli oikealla reitillä. '
      + 'Kaupunki syntyi swahilikauppapaikkana, jonka muslimikauppiaat perustivat, ja se '
      + 'kasvoi Intian valtameren orjakaupan markkinapaikaksi — se on yksi seudun '
      + 'vanhimmista kaupungeista. Quelimane oli myös se piste, johon David Livingstone '
      + 'päätti 1856 kulkunsa Etelä-Keski-Afrikan halki lännestä itään.',
    lahde: 'en-Wikipedia "Quelimane", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'angoche',
    nimi: 'Angoche',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka kauan sulttaanikunta piti puoliaan?',
      'Kuka oli Mussa Quanto?',
    ],
    korostukset: ['sulttaanisuku|sulttaanisuvun'],
    nappi: 'Sulttaanikunta, joka kaatui vasta 1910',
    // 39.91667 E / -16.23333 N — en-Wikipedia "Angoche"
    laudat: {
      maailmankartta: { x: 7163.9, y: 3757.3 },
    },
    teksti: 'Angoche on kaupunki ja saaristo Koillis-Mosambikin rannikolla. Suullisen '
      + 'perinteen mukaan saaria asutti ennen Vasco da Gaman tuloa 1498 swahilikulttuuriin '
      + 'kuulunut yhteisö, ja sulttaanisuvun juuret johdetaan Persianlahden Shiraziin. '
      + 'Duarte Barbosa kirjoitti 1508, että saarten tavat, kieli ja elämä muistuttivat '
      + 'Mosambikin saaren asukkaita. 1800-luvun puoliväliin asti portugalilaiset eivät '
      + 'kyenneet hallitsemaan Angochea; tilanne muuttui, kun kuningassuvun jäsen Mussa '
      + 'Mohammad Sahib Quanto (k. 1879) hyökkäsi sisämaasta rannikolle kulkevien orjateiden '
      + 'hallinnasta kiistellen. Portugalilaiset miehittivät saaren parinkymmenen miehen '
      + 'osastolla 1861, mutta Mussa Quanto valtasi sen takaisin ja karkotti heidät. '
      + 'Vastarinta jatkui Omar bin Nacogo Farallahin ja sulttaani Ibrahimin johdolla vuoteen '
      + '1910, jolloin Portugali sai alueen sotilaallisesti haltuunsa.',
    lahde: 'en-Wikipedia "Angoche", osiot "Arab explorers" ja "Portuguese Colonial and '
      + 'Occupation Resistance" (tarkistettu 6.9.2026).',
  },
  {
    id: 'manyikeni',
    nimi: 'Manyikeni',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä yhdistää paikan Suureen Zimbabween?',
      'Miten arkeologi tietää, kuka söi naudanlihaa?',
    ],
    korostukset: ['kuivamuuraus|kuivamuuraten'],
    nappi: 'Kiviaitaus 350 kilometriä Suuresta Zimbabwesta',
    // 34.84494 E / -22.18617 N — en-Wikipedia "Manyikeni"
    laudat: {
      maailmankartta: { x: 6994.8, y: 3963.2 },
    },
    teksti: 'Manyikeni on arkeologinen kohde noin 52 kilometriä Vilankulon rannikkokaupungista '
      + 'länteen, ja se oli asuttu 1100-luvulta 1600-luvulle. Keskellä on kiviaitaus, joka on '
      + 'rakennettu Suuren Zimbabwen tapaan ilman laastia kuivamuuraten, ja paikalta löytynyt '
      + 'zimbabwelaistyylinen rautakello vahvistaa kulttuuriyhteyden; matkaa Suureen '
      + 'Zimbabween on 350 kilometriä. Nautojen luita on löytynyt vain alueen keskiosasta, '
      + 'mistä on päätelty, että naudanlihaa söi vain hallitseva eliitti, kun taas laidoilla '
      + 'asuneet söivät lampaan ja vuohen lihaa. Runsaat lasihelmet ja simpukankuoret '
      + 'kertovat vilkkaasta kaupasta rannikon Chibuenen kanssa.',
    lahde: 'en-Wikipedia "Manyikeni", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'maputo-kaupunki',
    nimi: 'Maputo',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi pääkaupunki siirrettiin tänne 1898?',
      'Mikä kaupungissa oli 1871 ainoa tykki?',
    ],
    korostukset: ['Lourenço Marques|Lourenço Marques'],
    nappi: 'Transvaalin lähin merisatama',
    // 32.57333 E / -25.96889 N — en-Wikipedia "Maputo"
    laudat: {
      maailmankartta: { x: 6919.1, y: 4096.7 },
    },
    teksti: 'Maputo, vuoteen 1976 Lourenço Marques, on Mosambikin pääkaupunki Delagoan lahden '
      + 'pohjoisrannalla. Paikka sai nimensä portugalilaiselta merenkulkijalta, joka tutki '
      + 'lahden jokia 1544, ja nykyinen kaupunki juontuu 1781 perustetusta linnakkeesta; '
      + 'asutus alkoi kasvaa sen ympärille noin 1850. Vuonna 1871 kaupunkia kuvattiin '
      + 'köyhäksi paikaksi: kapeat kadut, tasakattoisia taloja, ruokomajoja, rapistuneita '
      + 'linnakkeita ja yksi ruostunut tykki äskettäin pystytetyn kaksimetrisen muurin '
      + 'sisällä. Transvaalin kasvava merkitys muutti kaiken — Portugali lähetti 1876 '
      + 'komission kuivaamaan suomaita ja rakentamaan sairaalan ja kirkon, kaupunkioikeudet '
      + 'tulivat 1887, ja 1898 Portugalin Itä-Afrikan pääkaupunki siirrettiin Mosambikin '
      + 'saarelta tänne. Vuonna 1895 avattu rautatie Pretoriaan ja 1886 alkanut '
      + 'Witwatersrandin kultaryntäys tekivät satamasta Etelä-Afrikan kullan lähimmän '
      + 'vientiväylän.',
    lahde: 'en-Wikipedia "Maputo", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
];

