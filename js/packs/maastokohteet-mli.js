/*
 * MAASTOKOHTEET — MLI. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MLI --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MLI.json. Työkalu laskee laudan
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
 * Malin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mali on sisämaavaltio ilman suurta pysyvää järveä, joten meret-lista on tyhjä ja jokia on kaksi. Vuoren nimi on paikallinen Hombori Tondo (en "Mount Hombori"); fi-Wikipedia tuntee vuorijonon nimellä Homborivuoret.
 *
 * MAAILMAN ERÄ M12 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Djennén moskeija, Dogonmaa, Askian hauta, Ségou, Baoulén mutka,
 * Médinen linnake, Sikasson tata ja Bamako. Lähin uusi merkki on
 * Dogonmaa 100,5 lautayksikön päässä Timbuktu-laatasta
 * (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki ovat pääkartan merkkejä.
 * Erä on kuvaton, ja jokaisen kohteen lähin pelikaupunki on kirjattu
 * sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_MLI = [
  {
    id: 'homboritondo',
    nimi: 'Hombori Tondo',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi ylätasangolla kasvaa enemmän kuin ympäröivällä tasangolla?',
      'Mitä Hombori Tondon luolista on löydetty?',
    ],
    korostukset: ['Homborivuoret|Homborivuorten'],
    nappi: 'Malin korkein kohta',
    // -1.6689 E / 15.2572 N — en-Wikipedia "Mount Hombori"
    laudat: {
      maailmankartta: { x: 5777.7, y: 2699 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Kahden neliökilometrin kokoisella ylätasangolla kasvaa 150 kasvilajia; sen ympärillä '
      + 'leviävällä kymmenentuhannen neliökilometrin tasangolla vain noin kaksisataa. Ero on '
      + 'Hombori Tondon jyrkänteiden ansiota: Malin korkeinta kohtaa, 1 155 metriä, ympäröivät '
      + 'joka puolelta pystysuorat seinämät, eivätkä karjalaumat pääse laelle laiduntamaan. '
      + 'Niin ylätasangosta on tullut turvapaikka, jossa monen eteläisen lajin — muun muassa '
      + 'Bombax costatum -puun — levinneisyys yltää pohjoisimmilleen. Kalliokoloissa elää '
      + 'kalliotamaaneja ja oliivipaviaaneja. Homborivuorten luolissa on lisäksi asuttu yli '
      + 'kaksituhatta vuotta sitten, ja ne ovat Sahelin merkittäviä arkeologisia kohteita.',
    lahde: 'en-Wikipedia "Mount Hombori", johdanto-osa sekä osiot "Biodiversity" ja "Archaeology" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'niger',
    nimi: 'Niger',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joki virtaa puolikuun muotoisen kaaren?',
      'Mikä on Nigerin sisämaasuisto?',
    ],
    korostukset: ['Guinean ylänkö|Guinean ylängöltä'],
    nappi: 'Länsi-Afrikan valtasuoni',
    // -4.2 E / 14.5 N — Moptin kohta joen sisämaasuistossa; en-Wikipedia "Niger River" antaa koordinaatiksi Nigerian suiston 6,47 / 5,32
    laudat: {
      maailmankartta: { x: 5693.3, y: 2724.8 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Niger on Länsi-Afrikan pääjoki ja Afrikan kolmanneksi pisin — vain Niili ja Kongo ovat '
      + 'pidempiä. Se alkaa Guinean ylängöltä läheltä Sierra Leonen rajaa ja piirtää noin 4 180 '
      + 'kilometrin mittaisen puolikuun: ensin koilliseen kohti Saharaa Malin halki, sitten '
      + 'kaakkoon Nigerin ja Nigerian läpi, kunnes se laskee Guineanlahteen valtavan suistonsa '
      + 'kautta.',
    lahde: 'en-Wikipedia "Niger River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'senegal',
    nimi: 'Senegal',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi jokea ei juuri käytetä kuljetuksiin?',
      'Mikä on OMVS?',
    ],
    nappi: 'Malin tie merelle?',
    // -10.83 E / 13.8 N — yläjuoksu Bafoulabén seudulla Malissa; en-Wikipedia "Senegal River" antaa koordinaatiksi suun -16,53 / 15,79
    laudat: {
      maailmankartta: { x: 5472.3, y: 2748.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Senegal on 1 086 kilometrin pituinen Länsi-Afrikan joki, jonka pitkä keskijuoksu '
      + 'piirtää Senegalin ja Mauritanian rajan. Sen yläjuoksu patoineen on Malissa, ja neljä '
      + 'valtiota hoitaa jokea yhdessä OMVS-järjestön kautta. Järjestö on tutkinut '
      + 'laivakelpoisen kanavan rakentamista Malin Ambidédistä merelle asti — se antaisi '
      + 'sisämaavaltio Malille suoran reitin Atlantille.',
    lahde: 'en-Wikipedia "Senegal River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /*
   * ── MAAILMAN ERÄ M12 (LÄNSI-AFRIKKA) 6.9.2026 ────────────────────
   *
   * Kahdeksan KOHDETTA Maliin. Yksikään ei ole pelikaupungin kohdalla:
   * lähin uusi merkki on Bandiagara 100,5 lautayksikön päässä
   * Timbuktu-laatasta (KAUPUNGIN_KOHDALLA_SADE 7), ja jokaisen kohteen
   * lähin pelikaupunki on kirjattu koordinaattirivin viereen. Erä on
   * kuvaton, ja jokainen väite on en-Wikipedian raakatekstin katteessa.
   *
   * TIMBUKTU JA GAO OVAT PELIKAUPUNKEJA, joten niiden omista
   * nähtävyyksistä ei tehty kohteita. Askian hauta on Gaossa, mutta
   * laudan Gao-laatta on 115,9 yksikön päässä haudan oikeasta
   * paikasta, joten merkki ei ole kaupungin kohdalla.
   *
   * BANDIAGARAN JYRKÄNNE ON KIRJOITETTU DOGONMAANA (tyyppi kulttuuri)
   * eikä maastona: artikkelin mukaan jyrkänne on hiekkakiviseinämä,
   * mutta nosto kertoo tellemien ja dogonien asutuksesta, ja
   * maastotyyppi kasvattaisi maaston eikä kohteiden lukua. Sama linja
   * kuin erän M5 Tassili n'Ajjerissa. Kortti kertoo kohteen historian
   * ja luonnon; artikkelin nykytilaosuutta seudun turvattomuudesta ei
   * ole kirjoitettu korttiin (M3:n Myanmar-linja).
   */
  {
    id: 'djennen-moskeija',
    nimi: 'Djennén moskeija',
    nimio: 'Djenné',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä Djennén moskeijan seinät on tehty?',
      'Mitä moskeijalle tehdään joka vuosi?',
    ],
    korostukset: ['toron|toron'],
    nappi: 'Maailman suurin savitiilirakennus',
    // 4.5556 W / 13.9053 N — en-Wikipedia "Great Mosque of Djenné"
    // Lähin pelikaupunki: Timbuktu 113,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5681.5, y: 2745 },
    },
    teksti: 'Djennén suuri moskeija on maailman suurin savitiilirakennus. Ensimmäinen moskeija '
      + 'nousi paikalle joskus 1200- ja 1300-luvun välillä, mutta nykyinen rakennus on '
      + 'vuodelta 1907, jolloin se pystytettiin pakkotyöllä Djennén muurarikillan johtajan '
      + 'Ismaila Traorén johdolla. Seinät ovat auringossa kuivattua ferey-tiiltä, ja niistä '
      + 'törröttää noin 60 senttiä ulos nippuja palmupuun sauvoja, toron, jotka toimivat '
      + 'valmiina rakennustelineinä. Moskeija seisoo 75 metriä sivultaan olevalla ja kolme '
      + 'metriä korotetulla jalustalla, jotta Banin tulva ei vahingoittaisi sitä; rukousseinän '
      + 'kolmesta tornista keskimmäinen kohoaa noin 16 metriin, ja huippuja koristavat '
      + 'strutsinmunat. Koko kaupunki korjaa moskeijan kerran vuodessa juhlassa, jossa '
      + 'kilpaillaan siitä, kuka ehtii ensimmäisenä tuoda savilaastin muurareille.',
    lahde: 'en-Wikipedia "Great Mosque of Djenné", johdanto-osa sekä osiot "Present mosque", '
      + '"Design" ja "Cultural significance" (tarkistettu 6.9.2026).',
  },
  {
    id: 'dogonmaa',
    nimi: 'Dogonmaa',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Ketkä asuivat jyrkänteellä ennen dogoneja?',
      'Miksi tellemit hautasivat vainajansa korkealle?',
    ],
    korostukset: ['tellem|tellemien'],
    nappi: 'Hautoja hiekkakiviseinämässä',
    // 3.4167 W / 14.3333 N — en-Wikipedia "Bandiagara Escarpment"
    // Lähin pelikaupunki: Timbuktu 100,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5719.4, y: 2730.5 },
    },
    teksti: 'Bandiagaran jyrkänne on noin 150 kilometriä pitkä hiekkakiviseinämä, joka kohoaa '
      + 'viitisensataa metriä eteläpuolisen hiekkatasangon yltä. Sitä asuttavat nykyään '
      + 'dogonit, mutta ennen heitä siellä elivät tellemit ja toloyt. Tellemien jäljistä '
      + 'näkyvimpiä ovat kalliokolot, joita he louhivat rinteeseen haudatakseen vainajansa '
      + 'korkealle seudun äkillisten tulvien ulottumattomiin. Dogonit tulivat 1300-luvulla '
      + 'Kani Bonzonin kylän seudulle ja levisivät sieltä ylätasangolle, jyrkänteelle ja '
      + 'Seno-Gondon tasangoille. Suullisen perimätiedon mukaan he säilyivät suhteellisen '
      + 'rauhassa siirtomaavallalta, koska vain he tunsivat jyrkänteen läpi kulkevat luonnon '
      + 'tunnelit ja pystyivät väijymään niistä. Unesco liitti kohteen luetteloonsa 1989.',
    lahde: 'en-Wikipedia "Bandiagara Escarpment", johdanto-osa ja osio "History" (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'askian-hauta',
    nimi: 'Askian hauta',
    nimio: 'Askia',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka on haudattu Askian hautaan?',
      'Mistä haudan rakennusaineet kerrotaan tuodun?',
    ],
    korostukset: ['Songhai|Songhain'],
    nappi: 'Sahelin savipyramidi',
    // 0.0444 W / 16.2897 N — en-Wikipedia "Tomb of Askia"
    // Lähin pelikaupunki: Gao 115,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5831.9, y: 2663.8 },
    },
    teksti: 'Askian hauta Gaossa on Songhain valtakunnan mahtavimpiin kuuluneen hallitsijan '
      + 'Askia Muhammad I:n oletettu hautapaikka. Se rakennettiin 1400-luvun lopulla, ja '
      + 'seitsemäntoistametrisenä se on Gaon suurin esisiirtomaa-ajan rakennus sekä varhainen '
      + 'esimerkki sudanilais-sahelilaisesta tyylistä, joka levisi myöhemmin ympäri seutua. '
      + 'Kokonaisuuteen kuuluvat pyramidimaisen haudan lisäksi kaksi moskeijaa, hautausmaa ja '
      + 'kokoontumiskenttä; itse hautaan on haudattu vain Askia Muhammad, muita askioita pihaan. '
      + 'Kerrotaan, että hän palasi pyhiinvaellukseltaan Mekasta 1497 tai 1498 tuhansien '
      + 'kamelien saattueella ja toi mukanaan hautansa savet ja puut. Hauta on yhä käytössä '
      + 'rukouspaikkana ja kaupungin kulttuurikeskuksena.',
    lahde: 'en-Wikipedia "Tomb of Askia", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'segou',
    nimi: 'Ségou',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Minkä valtakunnan pääkaupunki Ségou oli?',
      'Kuka skotlantilainen tutkimusmatkailija kävi siellä 1797?',
    ],
    korostukset: ['bambara|bambaravaltakunnan'],
    nappi: 'Bambaravaltakunnan pääkaupunki',
    // 6.2667 W / 13.45 N — en-Wikipedia "Ségou"
    // Lähin pelikaupunki: Timbuktu 146,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5624.4, y: 2760.5 },
    },
    teksti: 'Ségou on Nigerin oikealla rannalla 235 kilometriä Bamakosta koilliseen. '
      + '1800-luvun puolivälissä nimeä kantoi neljä kylää noin kahdentoista kilometrin '
      + 'matkalla; nykyinen kaupunki on niistä alimmalla, Ségou-Sikoron paikalla. Noin 1650 '
      + 'Kaladian Coulibaly kaatoi Koitan suvun vallasta ja perusti kuningaskunnan, ja hänen '
      + 'lapsenlapsenlapsensa Mamary "Bitòn" Coulibaly kasvatti siitä 1700-luvun alussa '
      + 'bambaravaltakunnan, jonka pääkaupunki Ségou oli ja jolle Timbuktukin maksoi veroa. '
      + 'Vuonna 1766 entinen orja ja soturi Ngolo Diarra otti vallan ja aloitti vaurauden '
      + 'ajan; hänen sukunsa hallitsi 1800-luvun puoliväliin asti. Skotlantilainen Mungo Park '
      + 'kulki kaupungin kautta 1797 ja jätti todistuksen sen vauraudesta.',
    lahde: 'en-Wikipedia "Ségou", johdanto-osa sekä osiot "Origin" ja "Bambara Empire" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'baoulen-mutka',
    nimi: 'Baoulén mutka',
    nimio: 'Baoulé',
    tyyppi: 'muu',
    kysymykset: [
      'Mistä Baoulén mutkan puisto tunnetaan?',
      'Mikä uhanalainen apina puistossa elää?',
    ],
    korostukset: ['kalliotaide|kalliotaiteestaan'],
    nappi: 'Kalliotaidetta kuivassa savannissa',
    // 9 W / 14 N — en-Wikipedia "Boucle du Baoulé National Park"
    // Lähin pelikaupunki: Timbuktu 196,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5533.3, y: 2741.8 },
    },
    teksti: 'Boucle du Baoulén kansallispuisto perustettiin 1982 Länsi-Maliin Kayesin ja '
      + 'Koulikoron alueille. Se on valtava, 25 330 neliökilometriä, mutta suuria eläimiä '
      + 'siellä on vähän; puisto tunnetaan ennen kaikkea esihistoriallisesta kalliotaiteestaan '
      + 'ja haudoistaan. Puisto kuuluu Unescon biosfäärialueeseen yhdessä Badinkon, Finan ja '
      + 'Kongossambougoun riistansuojelualueiden kanssa, ja se perustettiin torjumaan kuivuuden '
      + 'ja ylilaidunnuksen vaikutuksia — Mali on niistä pahiten kärsiviä maita Saharan '
      + 'eteläpuolella. Alueella elää äärimmäisen uhanalainen länsiafrikansimpanssi, jota '
      + 'uhkaavat salametsästys ja elinympäristön tuho. Kansainvälinen luonnonsuojeluliitto '
      + 'pitää suojelualueiden valvontaa Malissa tehottomana.',
    lahde: 'en-Wikipedia "Boucle du Baoulé National Park", johdanto-osa ja osio "The park" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'medinen-linnake',
    nimi: 'Médinen linnake',
    nimio: 'Médine',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka kauan Médinen piiritys kesti?',
      'Miksi juuri Médineen rakennettiin linnake?',
    ],
    korostukset: ['Félou|Féloun'],
    nappi: 'Piiritys, joka päättyi höyrylaivaan',
    // 11.3683 W / 14.3761 N — en-Wikipedia "Médine, Mali"
    // Lähin pelikaupunki: Dakar 175,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5454.4, y: 2729 },
    },
    teksti: 'Médine on kylä Senegaljoen vasemmalla rannalla kaksitoista kilometriä Kayesista '
      + 'itään, heti Féloun putousten alapuolella. Paikka oli tärkeä, koska putoukset olivat '
      + 'kauimmainen kohta, johon Saint-Louis’sta pääsi veneellä — ja sinnekin vain sadekauden '
      + 'jälkeen tulva-aikaan. Kuvernööri Louis Faidherbe rakennutti kylään linnakkeen 1855 '
      + 'liittolaisensa, kuningatar Hawa Demba Diallon luvalla. Huhtikuussa 1857 El Hadj Umar '
      + 'Tall julisti sodan Khasson kuningaskunnalle ja piiritti linnaketta 20 000–25 000 '
      + 'kiväärimiehen armeijalla; 97 vuorokauden jälkeen ruoka oli lopussa ja antautuminen '
      + 'lähellä, kunnes Faidherbe saapui höyrylaivalla viidensadan miehen ja muonan kanssa. '
      + 'Kylän vieressä on yhä vanha Dakar–Koulikoro-radan asema ja 1800-luvun puolivälin '
      + 'hautausmaa.',
    lahde: 'en-Wikipedia "Médine, Mali", johdanto-osa sekä osiot "History", "Siege by El Hadj '
      + 'Umar Tall" ja "Today" (tarkistettu 6.9.2026).',
  },
  {
    id: 'sikasson-tata',
    nimi: 'Sikasson tata',
    nimio: 'Sikasso',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti Sikasson tatan?',
      'Kuinka kauan Samory Tourén piiritys kesti?',
    ],
    korostukset: ['tata|tatalla'],
    nappi: 'Länsi-Afrikan suurin linnoituskaupunki',
    // 5.6667 W / 11.3167 N — en-Wikipedia "Sikasso"
    // Lähin pelikaupunki: Timbuktu 206,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5644.4, y: 2832.7 },
    },
    teksti: 'Sikasso oli pieni kylä vuoteen 1870, jolloin Tieba Traoré nousi Kénédougoun '
      + 'kuningaskunnan faamaksi ja siirsi pääkaupungin sinne. Hän rakensi palatsinsa pyhälle '
      + 'Mamelon-kukkulalle ja ympäröi kaupungin valtavalla savimuurilla, tatalla, joka teki '
      + 'siitä Länsi-Afrikan suurimman linnoituskaupungin. Sikasso kesti Samory Tourén '
      + '15 kuukauden piirityksen 1887–1888, kunnes ranskalaiset Kénédougoun liittolaisina '
      + 'vapauttivat kaupungin. Kymmenen vuotta myöhemmin ranskalaiset kääntyivät itse '
      + 'kaupunkia vastaan: tykistö avasi tulen 15. huhtikuuta 1898 ja kaupunki kaatui '
      + '1. toukokuuta talo talolta käydyn taistelun jälkeen. Tieban veli ja seuraaja Babemba '
      + 'Traoré käski henkivartijoidensa surmata itsensä ennemmin kuin joutua vangiksi.',
    lahde: 'en-Wikipedia "Sikasso", johdanto-osa sekä osiot "History" ja "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'bamako',
    nimi: 'Bamako',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Milloin Bamakosta tuli Ranskan Sudanin pääkaupunki?',
      'Kuka perusti Bamakon kafun?',
    ],
    korostukset: ['kafu|kafun'],
    nappi: 'Nigerin koskien kaupunki',
    // 8.0028 W / 12.6392 N — en-Wikipedia "Bamako"
    // Lähin pelikaupunki: Timbuktu 202,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 5566.6, y: 2788 },
    },
    teksti: 'Bamako on Malin pääkaupunki ja suurin kaupunki: vuoden 2022 laskennassa '
      + '4 227 569 asukasta. Se sijaitsee Nigerin varrella niiden koskien tuntumassa, jotka '
      + 'erottavat joen ylä- ja keskijuoksun toisistaan. Kaupungin kafun perusti noin 1650 '
      + 'Niaren suku, ja se oli Ségoun valtakunnan alusmaa; skotlantilainen Mungo Park kävi '
      + 'siellä 1806 ja arvioi asukasluvuksi kuusituhatta. Ranskan komentaja Gustave '
      + 'Borgnis-Desbordes kiiruhti perustamaan paikalle linnakkeen 1. helmikuuta 1883, koska '
      + 'Samory Tourén laajeneva Wassouloun valtakunta uhkasi tätä Nigerin avainpaikkaa. '
      + 'Rautatie Kayesiin valmistui 1904, kaupungista tuli Ranskan Sudanin pääkaupunki 1908, '
      + 'ja rata Dakariin asti saatiin valmiiksi 1923.',
    lahde: 'en-Wikipedia "Bamako", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
];
