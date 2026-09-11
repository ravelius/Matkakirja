/*
 * ETELÄMANTEREEN NOSTOT — kuusi tutkimuskohdetta navan ympäriltä.
 *
 * OMISTAJA 11.9.2026, sanatarkasti: *"Etelä-Mantereelle tehdään myös
 * omia nostoja, koska se on mielenkiintoinen tutkimuspaikka. Niin se
 * saisi piirtyä hyvin, myös silloin kun sitä zoomaan."*
 *
 * ── MIKSI TÄLLÄ TIEDOSTOLLA EI OLE `laudat`-KENTTÄÄ ────────────────
 *
 * Jokainen muu karttanosto sidotaan LAUDAN pisteeseen
 * (`laudat: { maailmankartta: { x, y } }`), ja siitä pallo laskee
 * asteet (js/pallolauta/lauta.js pallonAsteet → js/fokusmitat.js
 * laudaltaAsteiksi). Etelämantereella tie katkeaa jo ensimmäisellä
 * askeleella: pelin juliste on Miller-projektiota ja LOPPUU 61,47°
 * S:ään. Laudan korkeus on 5399 yksikköä, ja Miller projisoi
 * etelänavan riville 7611 — yli kaksituhatta yksikköä laudan
 * alareunan alapuolelle. Sama on kirjattu ennestään
 * js/packs/historian-hetket.js:ään (Amundsenin etelänapahetki):
 * *"Etelämannerta ei ole piirretty."*
 *
 * Lautapiste ei siis ole vaikea vaan MAHDOTON: kaikki nämä kuusi
 * kohdetta osuisivat laudan ULKOPUOLELLE, eikä laudan reunan yli
 * menevällä pisteellä ole merkitystä sen enempää tasokartalla kuin
 * laattapyramidissa.
 *
 * PALLOLLA NAPA-ALUE ON OLEMASSA. Karttapallo sai v1774:ssä molemmille
 * navoille oman atsimutaalisen karttakuvansa (js/pallo.js NAPAKALOTIT,
 * tools/tee-napakalotit.mjs); eteläkalotti kattaa 60°–90° S. Pallolla
 * nämä kohteet ovat siis oikean kartan päällä.
 *
 * SIKSI PAIKKA ANNETAAN SUORAAN ASTEINA. Kenttä `asteet: { lat, lon }`
 * on lautapisteen vaihtoehto eikä sen rinnakkainen kopio: nostolla on
 * joko `laudat` tai `asteet`, ei molempia. Pallon nostokerros
 * (js/pallolauta/nostot.js) lukee `asteet`-kentän sellaisenaan, ja
 * TASOKARTTA JÄTTÄÄ NÄMÄ POIS ITSESTÄÄN — js/fokuskohteet.js
 * kohdeKarttarivit suodattaa pois jokaisen rivin, jolla ei ole
 * äärellistä `laudat[lauta]`-pistettä. Tasokartalla ei siis ole
 * merkkiä, ei rikkinäistä riviä eikä poikkeusta: se on sama polku,
 * jolla kartan ulkopuolelle jäävät hetket ovat aina pudonneet.
 *
 * ── MIHIN TAULUUN NÄMÄ EIVÄT MENE (ja miksi) ───────────────────────
 *
 * EI KOHDE_MAAT-tauluun eikä MAASTOKOHTEET-hakemistoon. Molemmat
 * tarkoittavat MAATA: js/fokuskohteet.js latoo niistä maan merkit
 * (maanKohdemerkit → maanLadontaTynka) sen maan fokuslehden
 * (FOKUS_POHJAT) päälle, ja ladonta, kaupunkikatto, nimiöväistö ja
 * laattapoltto tehdään lehden rajauksessa. Etelämantereella ei ole
 * fokuslehteä eikä yhtäkään pelikaupunkia — maailmankartan oma maalista
 * on map.cityCountry -taulun ISO-tunnukset, eikä ATA ole siellä — joten
 * maan koneisto ei koskaan latoisi näitä merkkejä kenellekään.
 * Tauluun kirjaaminen lisäisi siis vain rivin, joka ei tee mitään, ja
 * sotkisi kattavuustyökalun maakohtaiset luvut
 * (tools/laske-karttanostot.mjs).
 *
 * EIKÄ FOKUS_POHJAT-tauluun. Se taulu on KUVIEN taulu: jokainen rivi
 * lupaa ämpärissä olevan lehden (ISO.webp) ja sen rajauksen, ja
 * tools/tarkista-nostopaikat.mjs sekä tests/fokuspohjat.test.mjs
 * lukevat sitä. Etelämantereen "lehti" on kalotti, jolla ei ole
 * lautarajausta lainkaan.
 *
 * Tämä lista on siis OMA JOUKKONSA, jonka ainoa lukija on pallon
 * nostokerros. Sisältö noudattaa täsmälleen samaa kaavaa kuin
 * maastokohteet-*.js (id, nimi, tyyppi, kysymykset, korostukset,
 * nappi, teksti, lahde), joten kortti, pöllö ja karttamerkki
 * käyttäytyvät kuten kaikkialla muualla.
 *
 * ── SISÄLTÖ ────────────────────────────────────────────────────────
 *
 * Kohderyhmä on 13 vuotta täyttäneet ja aikuiset. Faktat on tarkistettu
 * en-Wikipediasta kohde kerrallaan 11.9.2026, artikkeli on nimetty
 * `lahde`-kentässä ja rivin yläpuolisessa kommentissa, eikä yhtään
 * väitettä ole lisätty lähteen ulkopuolelta. Kuvakenttiä ei ole:
 * kuvat tilataan erikseen.
 *
 * Nämä kohteet ovat NYKYAJAN tutkimusta eivätkä isoisän matkan aikaa —
 * vuonna 1873 Etelämantereella ei ollut yhtäkään asemaa, ja se sanotaan
 * teksteissä ääneen aina kun se on luontevaa.
 */

/** Etelämantereen nostot. Paikka asteina, ei lautapisteenä (ks. yllä). */
export const MAASTOKOHTEET_ATA = [
  /*
   * 1. ETELÄNAPA JA AMUNDSEN–SCOTT.
   * Lähde: en.wikipedia.org "Amundsen–Scott South Pole Station"
   */
  {
    id: 'ata-etelanapa-asema',
    nimi: 'Amundsen–Scottin asema',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi asemaa pitää nostaa tunkeilla?',
      'Kuinka usein etelänavalla nousee aurinko?',
    ],
    korostukset: ['tunkki|tunkeilla', 'neutriino|neutriinoja'],
    nappi: 'Talo, joka nostetaan tunkeilla lumen yläpuolelle',
    // 90° S, 0° — napa itse; en-Wikipedia "Amundsen–Scott South Pole Station"
    asteet: { lat: -90, lon: 0 },
    teksti: 'Etelänavalla on ollut yhtäjaksoisesti asuttu tutkimusasema marraskuusta 1956 '
      + 'lähtien. Se seisoo 2 835 metrin korkeudessa mannerjäätikön päällä, ja lämpötila voi '
      + 'painua alle −73 asteen. Sadetta ja lunta tulee noin 25 millimetriä vuodessa, eli '
      + 'napa on autiomaa — mutta tuuli kinostaa lunta rakennuksen ympärille noin kahdenkymmenen '
      + 'sentin vuosivauhtia, ja siksi nykyinen 7 400 neliömetrin asema on rakennettu pilareille, '
      + 'jotka voidaan nostaa tunkeilla kokonaisen kerroksen verran ylemmäs. Vanha, vuonna 1975 '
      + 'valmistunut geodeettinen kupoli oli 50 metriä leveä ja 16 korkea. Aurinko nousee ja '
      + 'laskee navalla kerran vuodessa: se paistaa yhtäjaksoisesti puoli vuotta ja on poissa '
      + 'seuraavat puoli. Talvella asemalla on muutamia kymmeniä ihmisiä, kesällä noin '
      + 'sataviisikymmentä. Pimeys ja kuiva ilma ovat myös työväline: aseman teleskoopit '
      + 'mittaavat maailmankaikkeuden taustasäteilyä, ja IceCube-ilmaisin etsii neutriinoja '
      + 'kolmen kilometrin paksuisen jään sisältä.',
    lahde: 'en-Wikipedia "Amundsen–Scott South Pole Station", johdanto-osa sekä osiot '
      + '"Structures" ja "Research" (tarkistettu 11.9.2026).',
  },
  /*
   * 2. VOSTOKIN JÄRVI.
   * Lähde: en.wikipedia.org "Lake Vostok"
   */
  {
    id: 'ata-vostokin-jarvi',
    nimi: 'Vostokin järvi',
    tyyppi: 'jarvi',
    kysymykset: [
      'Miksi järvi ei jäädy, vaikka se on jään alla?',
      'Mitä tekemistä järvellä on Jupiterin kuiden kanssa?',
    ],
    korostukset: ['jääkairaus|jääkairaus', 'Europa|Europan'],
    nappi: 'Järvi neljän kilometrin jään alla',
    // 77°30′ S / 106°00′ E — en-Wikipedia "Lake Vostok"
    asteet: { lat: -77.5, lon: 106 },
    teksti: 'Etelämantereen suurin tunnettu jäänalainen järvi on Vostokin venäläisen aseman alla '
      + 'Itä-Antarktiksella. Se on 250 kilometriä pitkä, 50 leveä ja pinta-alaltaan 12 500 '
      + 'neliökilometriä — maailman kuudestoista suurin järvi — ja sen pinta on noin neljän '
      + 'kilometrin jään alla. Keskisyvyys on 432 metriä. Vesi pysyy sulana paineen ja maan oman '
      + 'lämmön ansiosta, vaikka keskilämpötilaksi on laskettu noin −3 astetta. Venäläinen '
      + 'maantieteilijä Andrei Kapitsa esitti järven olemassaolon neuvostoretkikuntien vuosina '
      + '1959 ja 1964 tekemien seismisten luotausten perusteella, ja se varmistettiin vasta 1993 '
      + 'satelliitin laserkorkeusmittauksista. Helmikuun 5. päivänä 2012 venäläinen ryhmä sai '
      + 'valmiiksi kaikkien aikojen pisimmän jääkairauksen, 3 768 metriä, ja puhkaisi jään '
      + 'järven pintaan asti. Järvi on saattanut olla eristyksissä 15–25 miljoonaa vuotta, ja '
      + 'juuri siksi se kiinnostaa: olosuhteet voivat muistuttaa niitä jään peittämiä meriä, '
      + 'joita arvellaan olevan Jupiterin kuulla Europalla ja Saturnuksen Enceladuksella.',
    lahde: 'en-Wikipedia "Lake Vostok", johdanto-osa sekä osiot "Discovery", "Drilling" ja '
      + '"Astrobiology" (tarkistettu 11.9.2026).',
  },
  /*
   * 3. MCMURDON KUIVAT LAAKSOT.
   * Lähde: en.wikipedia.org "McMurdo Dry Valleys"
   */
  {
    id: 'ata-kuivat-laaksot',
    nimi: 'McMurdon kuivat laaksot',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi laaksoissa ei ole lunta?',
      'Miksi NASA harjoittelee juuri täällä?',
    ],
    korostukset: ['katabaattinen|katabaattiset', 'muumioitunut|muumioituneita'],
    nappi: 'Etelämantereen lumeton erämaa',
    // 77°28′ S / 162°31′ E — en-Wikipedia "McMurdo Dry Valleys"
    asteet: { lat: -77.4667, lon: 162.5167 },
    teksti: 'Victorian maassa on noin 4 500 neliökilometrin alue, jolla ei ole jäätä lainkaan — '
      + 'noin kolme sadasosaa prosenttia koko mantereesta. Syy on tuulessa: katabaattiset tuulet '
      + 'syntyvät, kun kylmä ja raskas ilma valuu painovoiman vetämänä rinnettä alas, ja kuiva '
      + 'tuuli haihduttaa lumen nopeammin kuin sitä ehtii sataa. Sadetta tulee noin sata '
      + 'millimetriä vuodessa. Laaksoissa on silti vettä: Onyx on Etelämantereen pisin joki, '
      + 'sulamisvesipuro, ja koko alueella on yli kuusituhatta järveä ja lampea, muun muassa '
      + 'Victorian laakson suolainen Vida. Lämpötila on vaihdellut mitatusti 12 asteesta '
      + '−65,7 asteeseen. Ilman kosteus on niin vähäinen, että laaksoista löytyy '
      + 'muumioituneita hylkeenraatoja. Alue löydettiin 1900-luvun alussa, ja NASA on käyttänyt '
      + 'sitä Marsin vastineena tutkimuksissaan Viking-ohjelmasta eli 1970-luvulta lähtien. '
      + 'Yksi laaksojen oudoista kohdista on Verilähde, jonka punaisen värin tekee '
      + 'rautaoksidi.',
    lahde: 'en-Wikipedia "McMurdo Dry Valleys", johdanto-osa sekä osiot "Geography", '
      + '"Climate" ja "Research" (tarkistettu 11.9.2026).',
  },
  /*
   * 4. ROSSIN JÄÄHYLLY.
   * Lähde: en.wikipedia.org "Ross Ice Shelf"
   */
  {
    id: 'ata-rossin-jaahylly',
    nimi: 'Rossin jäähylly',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka suuri jäähylly on?',
      'Kuinka paljon jäästä on veden alla?',
    ],
    korostukset: ['jäähylly|jäähylly', 'poikiminen|poikimisessa'],
    nappi: 'Ranskan kokoinen jäälautta meren päällä',
    // 81°30′ S / 175°00′ W — en-Wikipedia "Ross Ice Shelf"
    asteet: { lat: -81.5, lon: -175 },
    teksti: 'Maailman suurin jäähylly on Rossinmerellä kelluva jäälautta, joka on 800 kilometriä '
      + 'leveä ja 970 pitkä — pinta-alaltaan 500 809 neliökilometriä eli suunnilleen Ranskan '
      + 'kokoinen. Etelässä sen paksuus on lähes 750 metriä, ja merenpinnan yläpuolelle jäätä '
      + 'nousee 15–50 metriä: yhdeksänkymmentä prosenttia kelluvasta jäästä on veden alla. '
      + 'Yli 600 kilometriä pitkä jäärintama on siis jyrkkä valkoinen seinä, jota vasten laivat '
      + 'pysähtyvät. Sir James Clark Ross löysi sen 28. tammikuuta 1841 aluksillaan Erebus ja '
      + 'Terror, eli isoisäsi aikaan löydöstä oli kulunut runsaat kolmekymmentä vuotta. Hylly '
      + 'työntyy mereen puolitoista–kolme metriä vuorokaudessa, ja meriveden jäätyminen '
      + 'kasvattaa sitä alapuolelta 40–50 senttiä vuodessa. Poikimisessa siitä irtoaa '
      + 'jäävuoria: maaliskuussa 2000 lohkesi B-15, suurin koskaan mitattu jäävuori. Sekä '
      + 'Amundsen että Scott ylittivät hyllyn matkallaan navalle vuonna 1911.',
    lahde: 'en-Wikipedia "Ross Ice Shelf", johdanto-osa sekä osiot "Geography", "Discovery" ja '
      + '"Movement" (tarkistettu 11.9.2026).',
  },
  /*
   * 5. DECEPTION ISLAND.
   * Lähde: en.wikipedia.org "Deception Island"
   */
  {
    id: 'ata-deception-island',
    nimi: 'Deception Island',
    tyyppi: 'saari',
    kysymykset: [
      'Miksi laivat pääsevät saaren sisään?',
      'Mitä saarella tehtiin isoisän jälkeen?',
    ],
    korostukset: ['kaldera|kaldera', 'Neptunuksen palkeet|Neptunuksen palkeiksi'],
    nappi: 'Satama tulivuoren sisällä',
    // 62°57′30″ S / 60°38′30″ W — en-Wikipedia "Deception Island"
    asteet: { lat: -62.9583, lon: -60.6417 },
    teksti: 'Eteläisillä Shetlandsaarilla on saari, joka on toimivan tulivuoren kaldera eli '
      + 'romahtanut huippu. Meri on murtautunut sen sisään, ja siksi keskellä on 10 kilometriä '
      + 'pitkä ja 7 leveä Port Fosterin lahti, jonne pääsee vain 500 metriä leveästä aukosta. '
      + 'Aukkoa sanotaan Neptunuksen palkeiksi. Britit William Smith ja Edward Bransfield '
      + 'näkivät saaren ensimmäisen kerran varmennetusti tammikuussa 1820, ja amerikkalainen '
      + 'Nathaniel Palmer tutki sen saman vuoden marraskuussa. Purkauksia on kirjattu vuosilta '
      + '1839–1842, 1967, 1969 ja 1970. Isoisäsi matkan jälkeen saaresta tuli teollisuuslaitos: '
      + 'norjalainen yhtiö aloitti valaanpyynnin Whalers Bayssä 1906, ja se loppui vasta '
      + 'alkuvuodesta 1931, kun Hektor-jalostamo suljettiin. Vuosien 1967 ja 1969 purkaukset '
      + 'vaurioittivat tutkimusasemia pahoin, ja sekä brittien että chileläisten tukikohdat '
      + 'jouduttiin evakuoimaan; nykyään saarella on Espanjan ja Argentiinan kesäasemat. '
      + 'Baily Headissa pesii valtava leukahihnapingviinien yhdyskunta, satatuhatta paria, ja '
      + 'rannan hiekkaan kaivamalla saa maalämmöstä lämpimän kylvyn.',
    lahde: 'en-Wikipedia "Deception Island", johdanto-osa sekä osiot "Geography", "History", '
      + '"Volcanic activity" ja "Wildlife" (tarkistettu 11.9.2026).',
  },
  /*
   * 6. VERNADSKIN TUTKIMUSASEMA (ent. Faraday).
   * Lähde: en.wikipedia.org "Vernadsky Research Base"
   */
  {
    id: 'ata-vernadski',
    nimi: 'Vernadskin asema',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Paljonko asemasta maksettiin?',
      'Mitä aseman mittaussarja kertoo ilmastosta?',
    ],
    korostukset: ['otsoni|otsonia', 'punta|punnalla'],
    nappi: 'Tutkimusasema, joka myytiin yhdellä punnalla',
    // 65°14′45″ S / 64°15′28″ W — Galindezin saari; en-Wikipedia
    // "Vernadsky Research Base"
    asteet: { lat: -65.2458, lon: -64.2578 },
    teksti: 'Antarktiksen niemimaan edustalla Galindezin saarella on asema, jonka britit '
      + 'perustivat 7. tammikuuta 1947. Päärakennus sai vuonna 1954 nimen Coronation House '
      + 'kuningatar Elisabetin kruunajaisten mukaan, ja 15. elokuuta 1977 koko asema '
      + 'nimettiin fyysikko Michael Faradayn mukaan. Britannia luovutti sen Ukrainalle '
      + '6. helmikuuta 1996 ja myi rakennukset symbolisella yhden punnan hinnalla — purkaminen '
      + 'olisi tullut huomattavasti kalliimmaksi, ja näin mittaussarjat jatkuivat katkeamatta. '
      + 'Ukrainan kansallinen Antarktis-tutkimuskeskus jatkaa asemalla säähavaintoja sekä '
      + 'yläilmakehän fysiikan, geomagnetismin, otsonin, seismologian, jäätikkötutkimuksen, '
      + 'ekologian ja biologian ohjelmia. Kesällä väkeä on kolmisenkymmentä, talvella '
      + 'kaksitoista. Aseman oma lämpötilasarja vuosilta 1947–2011 näyttää noin 0,6 asteen '
      + 'nousun vuosikymmentä kohti. Asemalla on myös baari, jossa sai vuoteen 2016 asti ostaa '
      + 'kolmen dollarin ryypyn talon omaa horilkaa.',
    lahde: 'en-Wikipedia "Vernadsky Research Base", johdanto-osa sekä osiot "History", '
      + '"Operations" ja "Facilities" (tarkistettu 11.9.2026).',
  },
];
