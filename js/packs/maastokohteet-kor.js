/*
 * MAASTOKOHTEET — KOR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs KOR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/KOR.json. Työkalu laskee laudan
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
 * Etelä-Korean maastokohteet (pelin Korea-koodi on KOR, asia-countries.js: 'Etelä-Korea'; PRK on oma lehtensä). Faktat en-Wikipediasta 30.8.2026. Japaninmeri on annettu JPN:lle, joten Korean meri on Keltainenmeri.
 */
export const MAASTOKOHTEET_KOR = [
  {
    id: 'hallasan',
    nimi: 'Hallasan',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten kilpitulivuori eroaa kartiosta?',
      'Mitkä ovat Korean kolme päävuorta?',
    ],
    korostukset: ['Jeju|Jejun'],
    nappi: 'Tulivuori, joka on kokonainen saari',
    // 126.5292 E / 33.3617 N — en-Wikipedia "Hallasan" — Jejun saarella lehden ikkunan etelälaidalla
    laudat: {
      maailmankartta: { x: 10051, y: 2056.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Hallasan on kilpitulivuori, joka muodostaa suurimman osan Jejun saaresta Korean '
      + 'niemimaan eteläpuolella — ja sen laki, 1 947 metriä, on koko Etelä-Korean korkein '
      + 'kohta. Maan korkein vuori ei siis ole mantereella vaan saarella, joka on itsessään '
      + 'tulivuoren rakentama. Korealaiset lukevat sen maan kolmen päävuoren joukkoon Jirisanin '
      + 'ja Seoraksanin rinnalle, ja koko vuori ympäristöineen on kansallispuistoa.',
    lahde: 'en-Wikipedia "Hallasan", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'keltainenmeri',
    nimi: 'Keltainenmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mistä meri on saanut värinsä ja nimensä?',
      'Mitä nimi on koreaksi?',
    ],
    korostukset: ['Hwanghae|Hwanghae'],
    nappi: 'Matala meri Kiinan ja Korean välissä',
    // 125 E / 36 N — ulappa niemimaan länsirannikon edustalla; artikkelin oma keskipiste 123 / 38 jää lehden ikkunan länsipuolelle
    laudat: {
      maailmankartta: { x: 10000, y: 1957.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Keltainenmeri on läntisen Tyynenmeren reunameri Manner-Kiinan ja Korean niemimaan '
      + 'välissä, pohjimmiltaan Itä-Kiinan meren matala luoteisosa. Korealaiset kutsuvat sitä '
      + 'nimellä Hwanghae, joka tarkoittaa täsmälleen samaa — keltaista merta. Väri ei ole '
      + 'tarua: Kiinan suuret joet kuljettavat mereen niin paljon hienoa maa-ainesta, että vesi '
      + 'todella sävyttyy.',
    lahde: 'en-Wikipedia "Yellow Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'nakdong',
    nimi: 'Nakdong',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Andongissa syötiin merikalaa?',
      'Mikä oli Gayan liitto?',
    ],
    korostukset: ['Gaya|Gayan'],
    nappi: 'Etelä-Korean pisin joki',
    // 128.9225 E / 35.0517 N — en-Wikipedia "Nakdong River" — joen suu Busanin kohdalla
    laudat: {
      maailmankartta: { x: 10130.8, y: 1993.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Andong on kaukana merestä, mutta se tunnetaan kalastaan — ja syy on tässä joessa. '
      + 'Joseon-kaudella suolattua ja kuivattua makrillia kuljetettiin Nakdongia ylös '
      + 'sisämaahan, ja Andong oli kauimpana oleva paikka, jonne kala ehti pilaantumatta. Sinne '
      + 'siis mentiin syömään merikalaa. Joki on Etelä-Korean pisin, noin 506 kilometriä '
      + 'Taebaek-vuorilta Koreansalmeen, ja se on saanut nimensä siitä, että se oli Gayan '
      + 'liiton itäraja kolmen kuningaskunnan aikaan. Kesällä 1950 joki sai aivan toisen '
      + 'merkityksen: sen eteläinen juoksu muodosti Pusanin puolustusrenkaan läntisen laidan. '
      + 'Waegwanin silta räjäytettiin 3. elokuuta 1950, ja räjähdyksessä kuoli suuri joukko '
      + 'pakolaisia.',
    lahde: 'en-Wikipedia "Nakdong River", johdanto-osa sekä osiot "Geography" ja "History" '
      + '(tarkistettu 1.9.2026).',
  },
  /* ───── KOHTEET (8) — ERÄ M10, AASIA 3, 6.9.2026 ───────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Etelä-Korealla oli ennen tätä erää kolme maastokohdetta mutta ei
   * yhtäkään kohdetta, eläintäkyä eikä skandaalia. Tavoite maata kohti
   * on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)` en-Wikipedian coordinates-propin lon/lat-parista,
   * ja jokainen piste osuu maan fokuslehden rajaukseen
   * (x 9943,6…10272,3 ja y 1818,5…2099,3).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Hwaseongin linnoitus 12,6 lautayksikön päässä Soul-laatasta ja
   * kaukaisin Geomundo 136,0 yksikön päässä siitä. Raja
   * KAUPUNGIN_KOHDALLA_SADE on 7.
   *
   * KAKSI EHDOKASTA KAATUI ETÄISYYSMITTAAN. Namhansanseongin vuorilinna
   * on vain 7,6 lautayksikön päässä Soul-laatasta, eli käytännössä
   * kaupungin kohdalla, ja Jejun Seongsan Ilchulbong on 14,2 yksikön
   * päässä saaren oman Hallasan-merkin nimiöstä. Kumpikin jätettiin
   * pois; tilalle tulivat Baekjen historialliset alueet ja Gochangin
   * dolmenit.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'gyeongju',
    nimi: 'Gyeongju',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä valtakunta Gyeongjussa hallitsi?',
      'Mikä on Cheomseongdae?',
    ],
    korostukset: ['Silla|Sillan'],
    nappi: 'Museo ilman seiniä',
    // 129.22667 E / 35.78889 N — en-Wikipedia "Gyeongju Historic Areas"
    laudat: {
      maailmankartta: { x: 10140.9, y: 1965.5 },
    },
    teksti: 'Gyeongjun historialliset alueet ovat vuodesta 2000 maailmanperintökohde, ja '
      + 'niissä on koolla Sillan valtakunnan (57 eaa.–935 jaa.) temppelien ja palatsien '
      + 'raunioita, ulkoilmapagodeja ja kivipatsaita. Kohde jakautuu viiteen vyöhykkeeseen. '
      + 'Namsanin pyhää vuorta sanotaan suureksi ulkoilmamuseoksi: rinteillä on 122 '
      + 'temppelin rauniot, 53 kivipatsasta, 64 kivipagodia ja 16 kivilyhtyä. Wolseongin '
      + 'vyöhykkeellä on entisen palatsin paikka, Gyerimin lehto ja Cheomseongdaen '
      + 'observatorio, joka on lajissaan Itä-Aasian vanhin. Kolmas vyöhyke on '
      + 'kuninkaanhautojen kumpupuisto: useimmat hautakummut ovat kupolin tai '
      + 'maakasan muotoisia, mutta jotkin muistuttavat kurpitsaa tai puolikuuta, ja '
      + 'kaivetuista haudoista on löytynyt kultaa, lasia ja korkealaatuista keramiikkaa.',
    lahde: 'en-Wikipedia "Gyeongju Historic Areas", johdanto-osa ja osio '
      + '"Description" (tarkistettu 6.9.2026).',
  },
  {
    id: 'haeinsa',
    nimi: 'Haeinsa',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mikä on Tripitaka Koreana?',
      'Miksi temppeli perustettiin?',
    ],
    korostukset: ['Tripitaka Koreana|Tripitaka Koreana'],
    nappi: '81 350 puulaattaa vuorella',
    // 128.1 E / 35.8 N — en-Wikipedia "Haeinsa"
    laudat: {
      maailmankartta: { x: 10103.3, y: 1965.1 },
    },
    teksti: 'Haeinsa on buddhalainen temppeli Gayasanin kansallispuistossa Etelä-Gyeongsangin '
      + 'maakunnassa ja Korean seon-buddhalaisen Jogye-suuntakunnan päätemppeli. Sen '
      + 'kuuluisin aarre on Tripitaka Koreana: koko buddhalainen kirjoituskokoelma '
      + 'kaiverrettuna 81 350 puiselle painolaatalle, joita on säilytetty temppelissä '
      + 'vuodesta 1398. Haeinsa on yksi kolmesta jalokivitemppelistä ja edustaa niistä '
      + 'dharmaa eli Buddhan opetusta. Temppeli rakennettiin 802, ja tarinan mukaan kaksi '
      + 'munkkia, Suneung ja Ijeong, olivat palanneet Tangin Kiinasta ja parantaneet Sillan '
      + 'kuningas Aejangin puolison, minkä kiitokseksi kuningas määräsi temppelin '
      + 'rakennettavaksi. Rakennukset paloivat 1817 ja pystytettiin uudelleen jo seuraavana '
      + 'vuonna.',
    lahde: 'en-Wikipedia "Haeinsa", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'hwaseong',
    nimi: 'Hwaseong',
    tyyppi: 'historia',
    kysymykset: [
      'Kenen muistoksi linnoitus rakennettiin?',
      'Miksi kuningas halusi siirtää pääkaupungin?',
    ],
    korostukset: ['kruununprinssi Sado|kruununprinssi Sadon'],
    nappi: 'Linnoitus riisiarkun muistoksi',
    // 127.00833 E / 37.27222 N — en-Wikipedia "Hwaseong Fortress"
    laudat: {
      maailmankartta: { x: 10066.9, y: 1908.9 },
    },
    teksti: 'Hwaseong on korealainen linnoitus, joka ympäröi Suwonin keskustaa Gyeonggin '
      + 'maakunnassa. Kuningas Jeongjo rakennutti sen 1794–1796 isänsä, kruununprinssi Sadon, '
      + 'jäännösten sijaksi ja muistoksi — Sado oli teloitettu sulkemalla hänet riisiarkkuun '
      + 'isänsä kuningas Yeongjon käskystä. Linnoitus on kolmenkymmenen kilometrin päässä '
      + 'Soulista, ja sen sisällä on kuninkaan väliaikainen palatsi; muurissa on neljä '
      + 'pääporttia ja kaksi vesiporttia Suwoncheon-puron yli. Jeongjo näyttää rakentaneen '
      + 'linnoituksen valmistautuakseen siirtämään pääkaupungin Soulista Suwoniin, joka oli '
      + 'edullisella paikalla Soulin, Keltaisenmeren ja Kiinan välissä; hän halusi päästä '
      + 'eroon hovin ryhmäkuntariidoista ja saada uudistuksensa läpi. Kohde on ollut '
      + 'maailmanperintöluettelossa vuodesta 1997.',
    lahde: 'en-Wikipedia "Hwaseong Fortress", johdanto-osa ja osio "Background" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'hahoe',
    nimi: 'Hahoe',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä kylän nimi tarkoittaa?',
      'Miten kylä on aseteltu?',
    ],
    korostukset: ['pungsu|pungsun'],
    nappi: 'Kylä joen mutkassa',
    // 128.51667 E / 36.53917 N — en-Wikipedia "Hahoe Folk Village"
    laudat: {
      maailmankartta: { x: 10117.3, y: 1937 },
    },
    teksti: 'Hahoen perinnekylä Andongissa Pohjois-Gyeongsangin maakunnassa on '
      + 'Joseon-kauden kylä, jonka nimen alkuosa tarkoittaa jokea ja loppuosa kääntymistä '
      + 'ja palaamista — joki kiertää kylän. Pungsan Ryu -suvun perustama kylä on '
      + '1300–1400-luvulta, ja se säilyttää Joseon-ajan rakennustavan, kansanperinteen ja '
      + 'sukukylien vanhan järjestyksen: kylässä on asuintalojen lisäksi paviljonkeja ja '
      + 'konfutselaisia opinahjoja, ja 124 talosta kuusi on luokiteltu kansallisaarteiksi. '
      + 'Kylä on aseteltu pungsun eli korealaisen maantieteenopin sääntöjen mukaan, ja siksi '
      + 'sen muoto on lootuksenkukka tai kaksi toisiinsa lomittuvaa pilkkua. Pohjoispuolella '
      + 'kohoaa Buyongdaen kallio ja etelässä Namsan. Yhdessä Yangdongin kylän kanssa Hahoe '
      + 'liitettiin maailmanperintöluetteloon 2010.',
    lahde: 'en-Wikipedia "Hahoe Folk Village", johdanto-osa sekä osiot "Overview" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'gochangin-dolmenit',
    nimi: 'Gochangin dolmenit',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka suuri osa maailman dolmeneista on Koreassa?',
      'Mihin dolmeneja käytettiin?',
    ],
    korostukset: ['dolmen|dolmenia'],
    nappi: 'Kivipöytiä hallitsijoiden haudoilla',
    // 126.7 E / 35.43333 N — en-Wikipedia "Gochang County" (kohdeartikkelissa
    // "Gochang, Hwasun and Ganghwa Dolmen Sites" ei ole koordinaatteja)
    laudat: {
      maailmankartta: { x: 10056.7, y: 1979 },
    },
    teksti: 'Gochangin, Hwasunin ja Ganghwan dolmenikentät ovat satojen kivisten '
      + 'hautamerkkien alueita, jotka pystytettiin ensimmäisellä vuosituhannella eaa. '
      + 'hautamerkeiksi ja rituaalikäyttöön. Korean niemimaalla on yli 35 000 dolmenia eli '
      + 'noin 40 prosenttia koko maailman määrästä, ja pelkästään näillä kolmella alueella '
      + 'niitä on yli tuhat. Gochang on Korean dolmenirikkain seutu, ja sen kentät ovat '
      + 'Maesanin kylässä. Kivet ovat arvokkaita siksi, että ne merkitsevät hallitsevan '
      + 'yläluokan hautoja: niiden alta on kaivettu keramiikkaa, pilkun muotoisia koruja, '
      + 'pronssiesineitä ja kivityökaluja, ja kivistä itsestään voi päätellä, miten ne '
      + 'louhittiin ja siirrettiin. Korean dolmenit on ajoitettu 600-luvulle eaa., ja tapa '
      + 'loppui noin 200-luvulla eaa.; kaivaukset alkoivat vasta 1965. Alueet liitettiin '
      + 'maailmanperintöluetteloon 2000.',
    lahde: 'en-Wikipedia "Gochang, Hwasun and Ganghwa Dolmen Sites", johdanto-osa, ja '
      + '"Gochang County", johdanto-osa sekä osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'jeonjun-hanok-kyla',
    nimi: 'Jeonjun hanokit',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä on hanok?',
      'Miksi Jeonjua sanotaan Joseonin henkiseksi pääkaupungiksi?',
    ],
    korostukset: ['hanok|hanokia'],
    nappi: '800 perinnetaloa nykykaupungin keskellä',
    // 127.1475 E / 35.82389 N — en-Wikipedia "Jeonju" (kylän omassa
    // artikkelissa ei ole koordinaatteja)
    laudat: {
      maailmankartta: { x: 10071.6, y: 1964.2 },
    },
    teksti: 'Jeonjun hanok-kylä on kaupunginosa Jeonjussa, ja siinä on yli 800 korealaista '
      + 'perinnetaloa eli hanokia. Kylä on kuuluisa juuri siitä, että sen matalat '
      + 'harjakattoiset talot ovat jyrkässä ristiriidassa ympäröivän nykykaupungin kanssa; '
      + 'vuonna 2010 se nimettiin kansainväliseksi hitaaksi kaupungiksi, koska perinne ja '
      + 'luonto elävät siellä rauhallisessa tahdissa. Kaupungilla itsellään on yli 1 300 '
      + 'vuotta historiaa: se oli aikoinaan Hubaekjen kuningaskunnan pääkaupunki, jonka '
      + 'Kyŏn Hwŏn perusti 900-luvulla, ja Joseon-kaudella sitä pidettiin dynastian '
      + 'henkisenä pääkaupunkina, koska kuninkaallinen Yi-suku oli sieltä kotoisin. Jeonju '
      + 'hallitsi silloin koko Jeolla-aluetta ja Jejun saarta. Unesco nimesi kaupungin 2012 '
      + 'gastronomian luovaksi kaupungiksi.',
    lahde: 'en-Wikipedia "Jeonju Hanok Village", johdanto-osa ja osio "History", sekä '
      + '"Jeonju", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'baekjen-alueet',
    nimi: 'Baekjen alueet',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Baekje oli?',
      'Missä kolmessa kaupungissa kohteet ovat?',
    ],
    korostukset: ['Baekje|Baekje'],
    nappi: 'Kahdeksan muistomerkkiä, kolme kaupunkia',
    // 127.12722 E / 36.46194 N — en-Wikipedia "Baekje Historic Areas"
    laudat: {
      maailmankartta: { x: 10070.6, y: 1939.7 },
    },
    teksti: 'Baekjen historialliset alueet ovat maailmanperintökohde, joka koostuu '
      + 'kahdeksasta muistomerkistä kolmessa eteläkorealaisessa kaupungissa: Gongjussa, '
      + 'Buyeossa ja Iksanissa. Ne kertovat Baekjen kuningaskunnan (18 eaa.–660 jaa.) '
      + 'viimeisestä kaudesta eli vuosista 475–660. Kohteisiin kuuluvat Gongsanseongin ja '
      + 'Busosanseongin linnoitukset, Songsan-rin ja Neungsan-rin kuninkaanhaudat, '
      + 'Jeongnimsan ja Mireuksan temppelit, Naseongin kaupunginmuuri ja Wanggung-rin '
      + 'kaivauskohde. Unesco kirjasi kohteet luetteloon 8. heinäkuuta 2015 kahdella '
      + 'perusteella: itäaasialaisten valtakuntien rakennustavan ja buddhalaisuuden '
      + 'vaihdosta Korean, Kiinan ja Japanin välillä sekä Baekjen oman arkkitehtuurin, '
      + 'uskonnon ja kivipagodien poikkeuksellisuudesta.',
    lahde: 'en-Wikipedia "Baekje Historic Areas", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'songgwangsa',
    nimi: 'Songgwangsa',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä temppelin nimi tarkoittaa?',
      'Kuka herätti temppelin uudelleen henkiin?',
    ],
    korostukset: ['Jinul|Jinul'],
    nappi: 'Munkkiyhteisön jalokivi',
    // 127.2761 E / 35.00219 N — en-Wikipedia "Songgwangsa"
    laudat: {
      maailmankartta: { x: 10075.9, y: 1995.3 },
    },
    teksti: 'Songgwangsa eli levittäytyvän männyn temppeli on Etelä-Jeollan maakunnassa '
      + 'Jogye-vuorella, noin kolmenkymmenen kilometrin päässä merestä Jogyesanin '
      + 'maakuntapuistossa. Se on yksi seon-buddhalaisuuden kolmesta jalokivitemppelistä. '
      + 'Temppeli perustettiin 867, mutta se rappeutui käyttämättömänä, kunnes seon-mestari '
      + 'Jinul herätti sen uudelleen 1190. Jinulin mietiskelyopetus kehittyi juuri tässä '
      + 'luostarissa, ja se on vaikuttanut siihen seon-käytäntöön, joka Koreassa on '
      + 'vallalla yhä tänään. Kolmesta jalokivitemppelistä Songgwangsa edustaa sanghaa eli '
      + 'munkkiyhteisöä, ja vaikka se on kooltaan pienin, sitä pidetään niistä '
      + 'merkittävimpänä.',
    lahde: 'en-Wikipedia "Songgwangsa", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
