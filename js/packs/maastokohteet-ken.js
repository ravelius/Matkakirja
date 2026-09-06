/*
 * MAASTOKOHTEET — KEN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs KEN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/KEN.json. Työkalu laskee laudan
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
 * Kenian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Mount Kenya on myös fi-Wikipedian nimi; järven asu fi-Wikipedian mukaan Victorianjärvi.
 *
 * MAAILMAN ERÄ M11 (6.9.2026) lisäsi listaan kahdeksan KOHDETTA —
 * Lamu, Fort Jesus, Gedin rauniot, Thimlich Ohinga, Koobi Fora,
 * Hell's Gate, Amboselin kansallispuisto ja Lewa. Lähin uusi merkki on
 * Fort Jesus 44,9 lautayksikön päässä Kilimandžarosta
 * (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki kahdeksan ovat pääkartan
 * merkkejä. Erä on kuvaton, ja jokaisen kohteen lähin pelikaupunki on
 * kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_KEN = [
  {
    id: 'mountkenya',
    nimi: 'Mount Kenya',
    tyyppi: 'vuori',
    kysymykset: [
      'Kauanko vuoren jäätiköt vielä kestävät?',
      'Kuinka korkea Mount Kenya oli ennen jäätiköitymistä?',
    ],
    korostukset: ['päiväntasaaja|päiväntasaajalta'],
    nappi: 'Vuori, joka antoi maalle nimen',
    // 37.3075 E / -0.1508 N — en-Wikipedia "Mount Kenya"
    laudat: {
      maailmankartta: { x: 7076.9, y: 3216.5 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Kenya on Afrikan toiseksi korkein vuori ja koko maan kaima. Sen korkeimmat '
      + 'huiput ovat Batian (5 199 m), Nelion (5 188 m) ja Point Lenana (4 985 m), ja se kohoaa '
      + 'vain 16,5 kilometriä päiväntasaajalta etelään. Tulivuori oli ennen jäätiköitymistään '
      + 'noin 7 000 metriä korkea; nykyisin sen rinteillä on yksitoista kutistuvaa jäätikköä, '
      + 'jotka voivat kadota vuoteen 2050 mennessä. Metsäiset rinteet ovat suurelle osalle '
      + 'Keniaa elintärkeä vesitorni.',
    lahde: 'en-Wikipedia "Mount Kenya", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'victorianjarvi',
    nimi: 'Victorianjärvi',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka suuri osa järvestä kuuluu Kenialle?',
      'Miksi niilinahven oli tuhoisa tulokas?',
    ],
    nappi: 'Afrikan suurin järvi',
    // 34.2 E / -0.35 N — Kenialle kuuluva koilliskulma järvestä; en-Wikipedia "Lake Victoria" antaa keskipisteeksi 33 / -1
    laudat: {
      maailmankartta: { x: 6973.3, y: 3223.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Victorianjärvi on Afrikan suurin ja maailman suurin trooppinen järvi — makean veden '
      + 'järvistä vain Pohjois-Amerikan Yläjärvi on pinta-alaltaan suurempi. Järvi jakautuu '
      + 'kolmen maan kesken: Tansanialle kuuluu 49, Ugandalle 45 ja Kenialle 6 prosenttia. '
      + 'Matalassa, keskimäärin vain 40-metrisessä vedessä elää kirjoahvenia, joita ei tapaa '
      + 'missään muualla maailmassa, mutta niilinahvenen kaltaiset tulokaslajit ovat ajaneet '
      + 'monet niistä sukupuuttoon.',
    lahde: 'en-Wikipedia "Lake Victoria", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'intianvaltameri',
    nimi: 'Intian valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on monsuuni?',
      'Mitä Intian valtameren yli purjehdittiin jo muinoin?',
    ],
    nappi: 'Monsuunien meri',
    // 40.2 E / -4.3 N — ulappa Mombasan edustalla; en-Wikipedia "Indian Ocean" antaa keskipisteeksi 80 / -20
    laudat: {
      maailmankartta: { x: 7173.3, y: 3354.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Intian valtameri on maailman valtameristä kolmanneksi suurin ja lämpimin, ja sen '
      + 'ilmastoa hallitsevat monsuunit. Se on ollut kaupan ja kulttuurien kohtauspaikka '
      + 'muinaisista ajoista asti, ja Kenian rannikko on osa tätä vanhaa valtamerten '
      + 'kauppaverkkoa. Meren ekosysteemit ovat monimuotoisia: koralliriuttoja, mangrovemetsiä '
      + 'ja meriheinäniittyjä.',
    lahde: 'en-Wikipedia "Indian Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },

  /* ==============================================================
   * MAAILMAN ERÄ M11, AFRIKKA 6.9.2026 — KAHDEKSAN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Kenialla oli kolme maastokohdetta ja nolla kohdetta
   * (docs/moduulit/karttanostot-kattavuus.md, Afrikka). Kaikki
   * kahdeksan ovat pääkartan merkkejä: etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin uusi
   * merkki on Fort Jesus 44,9 lautayksikön päässä Kilimandžarosta
   * (raja KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js).
   * Kuvaton erä; faktat en-Wikipedian raakatekstistä 6.9.2026, ja
   * jokainen `lahde`-rivi kertoo artikkelin osan. Kaikki kortit
   * kertovat kohteen historiasta ja luonnosta; Lamun artikkelin
   * nykypäivän turvallisuustilannetta ei kirjoitettu korttiin, koska
   * erän linja on jättää nykyiset selkkaukset pois (M3:n
   * Myanmar-linja).
   * ============================================================== */
  {
    id: 'lamu',
    nimi: 'Lamu',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mikä oli Lamun kultakausi?',
      'Miksi Lamun talous romahti 1900-luvun alussa?',
    ],
    korostukset: ['swahili|swahiliasutus'],
    nappi: 'Vanhin swahilikaupunki',
    // 40.9022 E / 2.2694 S — en-Wikipedia "Lamu"
    // Lähin pelikaupunki: Kilimandžaro 99,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7196.7, y: 3287.2 },
    },
    teksti: 'Lamu on Kenian vanhin yhtäjaksoisesti asuttu kaupunki: se uskotaan perustetun 1370, '
      + 'ja Unescon luettelossa se on "Itä-Afrikan vanhin ja parhaiten säilynyt '
      + 'swahiliasutus". Portugalin laivasto saartoi sen 1506 ja pakotti kaupungin veroa '
      + 'maksavaksi, mutta 1600-luvun lopulta 1800-luvun alkuun Lamu eli Omanin suojeluksessa '
      + 'kultakauttaan: sitä hallitsi vanhinten neuvosto Yumbe, ja kaupungista tuli runouden, '
      + 'käsityön ja oppineisuuden keskus. Runoilija Mwana Kupona kirjoitti täällä kuuluisan '
      + 'ohjerunonsa vaimon velvollisuuksista. Saksalaisilla oli Lamussa 1888–1891 Itä-Afrikan '
      + 'rannikon ensimmäinen postitoimisto, jolle on nyt oma museonsa. Talous nojasi '
      + 'orjakauppaan sen lakkauttamiseen 1907 asti, ja lopun teki Ugandan rautatie, joka '
      + 'rakennettiin 1901 kilpailevasta Mombasan satamasta.',
    lahde: 'en-Wikipedia "Lamu", johdanto-osa sekä osiot "History" ("Early history", "Golden '
      + 'Age", "Colonial period"), "Economy" ja "Notable landmarks" (tarkistettu 6.9.2026).',
  },
  {
    id: 'fortjesus',
    nimi: 'Fort Jesus',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnoitus on ihmisen muotoinen?',
      'Kuinka monta kertaa linnoitus vaihtoi omistajaa?',
    ],
    korostukset: ['piiritys|piiritys'],
    nappi: 'Yhdeksän kertaa vallattu linnoitus',
    // 39.6797 E / 4.0628 S — en-Wikipedia "Fort Jesus"
    // Lähin pelikaupunki: Kilimandžaro 44,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7156, y: 3347 },
    },
    teksti: 'Fort Jesus rakennettiin Mombasan vanhan sataman vartioksi 1593–1596. Sen suunnitteli '
      + 'milanolainen Giovanni Battista Cairati, joka oli Portugalin itäisten alueiden '
      + 'pääarkkitehti, ja se oli ensimmäinen Euroopan ulkopuolelle rakennettu '
      + 'eurooppalaistyylinen linnoitus, joka oli tehty kestämään tykkitulta. Ilmasta katsoen '
      + 'muoto on selällään makaava ihminen pää merelle päin. Muurit ovat 18 metriä korkeat: '
      + 'portugalilaiset tekivät niistä viisitoista, omanilaiset lisäsivät kolme. Linnoitus '
      + 'vaihtoi omistajaa ainakin yhdeksän kertaa vuosien 1631 ja 1895 välillä, ja pisin '
      + 'kamppailu oli Saif bin Sultanin johtama piiritys 1696–1698, joka päätti Portugalin '
      + 'vallan rannikolla. Britit tekivät linnoituksesta vankilan 1895; 1958 siitä tuli '
      + 'kansallismuseo ja 2011 maailmanperintökohde.',
    lahde: 'en-Wikipedia "Fort Jesus", johdanto-osa sekä osiot "Historical significance", '
      + '"Preservation and legacy" ja "Overview" (tarkistettu 6.9.2026).',
  },
  {
    id: 'gedi',
    nimi: 'Gedin rauniot',
    tyyppi: 'historia',
    kysymykset: [
      'Milloin Gedi hylättiin?',
      'Keitä "vanhat" ovat paikallisessa perinteessä?',
    ],
    korostukset: ['pilarihauta|pilarihaudat'],
    nappi: 'Metsään jäänyt kaupunki',
    // 40.0172 E / 3.3094 S — en-Wikipedia "Ruins of Gedi"
    // Lähin pelikaupunki: Kilimandžaro 58,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7167.2, y: 3321.8 },
    },
    teksti: 'Arabuko-Sokoken metsän sisällä on muurien ympäröimä keskiaikainen swahilikaupunki: '
      + 'moskeijoita, palatsi ja kivitaloja, kaikki yksikerroksisia, ja niiden lomassa aukioita, '
      + 'joilla seisoivat savi- ja olkimajat. Gedi on yksi 116 tunnetusta swahilipaikasta '
      + 'Somaliasta Tansanian rajalle, ja sen tavaralöydöt — tuontiastiat, helmet ja kolikot — '
      + 'kertovat vaurastumisesta 1000-luvulta 1600-luvun alkuun, jolloin kaupunki hylättiin. '
      + 'Paikan tunnusomaisia rakenteita ovat pilarihaudat, swahilirannikon oma hautatyyppi. '
      + 'Siirtomaavallan silmissä rauniot "löytyivät" vasta 1884, kun sansibarilainen Sir John '
      + 'Kirk kävi paikalla, mutta mijikendat olivat tunteneet ne aina. Giriamat pitävät paikkaa '
      + 'pyhänä ja kertovat, että sitä vartioivat "vanhat", pappien henget, jotka kiroavat '
      + 'raunioiden vahingoittajan. Kaivaukset alkoivat James Kirkmanin johdolla 1948.',
    lahde: 'en-Wikipedia "Ruins of Gedi", johdanto-osa sekä osio "History of discovery and '
      + 'excavation" alaosioineen (tarkistettu 6.9.2026).',
  },
  {
    id: 'thimlichohinga',
    nimi: 'Thimlich Ohinga',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä nimi Thimlich Ohinga tarkoittaa?',
      'Miten kivet pysyvät paikoillaan ilman laastia?',
    ],
    korostukset: ['laasti|laastia'],
    nappi: 'Kivikehät Victorian rannalla',
    // 34.3252 E / 0.8911 S — en-Wikipedia "Thimlich Ohinga"
    // Lähin pelikaupunki: Viktoria Nyanza 90,8 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6977.5, y: 3241.2 },
    },
    teksti: 'Victorianjärven itäpuolella on 138 kivirakennelmapaikkaa ja niissä yhteensä 521 '
      + 'rakennetta; Thimlich Ohinga on niistä suurin. Sen päähäkin muurit ovat 1–3 metriä '
      + 'paksut ja jopa 4,2 metriä korkeat, ja ne on ladottu muotoilemattomista lohkareista '
      + 'ilman laastia niin, että kivet lukittuvat toisiinsa. Luon kielellä thimlich tarkoittaa '
      + 'pelottavan tiheää metsää ja ohinga suurta linnaketta; nimi otettiin käyttöön 1981, kun '
      + 'paikka suojeltiin. Suullinen perinne kertoo, että aidat rakennettiin suojaksi '
      + 'petoeläimiltä, karjavarkailta ja vihamielisiltä naapureilta, mutta paikka oli myös '
      + 'talouden ja uskonnon keskus. Rakenteet ajoitetaan 1400-luvulle tai sitä vanhemmiksi, ja '
      + 'niiden pohjakaava — pyöreä piha ja keskellä karjatarha — muistuttaa luolaisten '
      + 'perinteistä kotipiiriä. Viimeiset asukkaat muuttivat pois vasta 1900-luvun alkupuolella.',
    lahde: 'en-Wikipedia "Thimlich Ohinga", johdanto-osa sekä osiot "Etymology", "Location", '
      + '"Purpose" ja "Builders and inhabitants" (tarkistettu 6.9.2026).',
  },
  {
    id: 'koobifora',
    nimi: 'Koobi Fora',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Koobi Fora tarkoittaa?',
      'Mikä oli "hominidijengi"?',
    ],
    korostukset: ['fossiili|fossiileja'],
    nappi: 'Turkanan luukenttä',
    // 36.1872 E / 3.9478 N — en-Wikipedia "Koobi Fora"
    // Lähin pelikaupunki: Nairobi 69,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7039.6, y: 3079.8 },
    },
    teksti: 'Turkana-järven itärannalla on harjanne, jonka savi-, siltti- ja hiekkakivikerrokset '
      + 'ovat täynnä fossiileja. Gabbran kielellä koobi fora tarkoittaa paikkaa, jossa kasvaa '
      + 'mirhapensas. Richard Leakey perusti tukikohdan järveen työntyvälle hiekkasärkälle 1968, '
      + 'ja Kenia rauhoitti alueen 1973 Sibiloin kansallispuistoksi. Leakey kokosi ja koulutti '
      + 'kenialaisen etsijäryhmän, joka tunnettiin nimellä "hominidijengi" ja jota johti Kamoya '
      + 'Kimeu; se löysi valtaosan alueen yli kahdestasadasta ihmisen sukulaisen fossiilista. '
      + 'Kuuluisin niistä on kallo KNM-ER 1470, jonka Bernard Ngeneo löysi 1972 ja jonka Meave '
      + 'Leakey kokosi paloista. Samalta alueelta on löytynyt runsaasti kivityökaluja, '
      + 'olduvailaisia ja acheuleenilaisia; niiden kehitys näkyy siinä, kuinka monta '
      + 'senttimetriä terää samasta kivimäärästä saatiin irti.',
    lahde: 'en-Wikipedia "Koobi Fora", johdanto-osa sekä osiot "Archaeological sites and '
      + 'artifacts" ("Archaeological sites", "Fossil finds", "Stone tools") (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'hellsgate',
    nimi: "Hell's Gate",
    tyyppi: 'muu',
    kysymykset: [
      'Kuka antoi rotkolle sen nimen?',
      'Mitä Olkariassa tehdään?',
    ],
    korostukset: ['geoterminen|geoterminen'],
    nappi: 'Rotko, jossa maa on kuuma',
    // 36.3133 E / 0.9158 S — en-Wikipedia "Hell's Gate National Park"
    // Lähin pelikaupunki: Nairobi 118,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7043.8, y: 3242 },
    },
    teksti: 'Hell\'s Gaten kansallispuisto on nimetty kapean kalliokuilun mukaan, joka oli '
      + 'aikoinaan esihistoriallisen järven laskujoki. Nimen antoivat 1883 saksalainen Gustav '
      + 'Fischer ja britti Joseph Thomson, jotka kulkivat samaa seutua kilpailevilla '
      + 'retkikunnillaan. Rotkon punaisista kallioseinistä kohoaa kaksi tulivuoren kurkkutulppaa, '
      + 'Fischerin torni ja Keskitorni, ja sivurotkossa on kuumia lähteitä, joiden kivet '
      + 'polttavat ja vesi haisee rikiltä. Puisto perustettiin 1984, se on 68 neliökilometriä ja '
      + '1 900 metrin korkeudessa. Lintuja on yli 103 lajia, ja alue on ollut tärkeä '
      + 'partakorppikotkien koti. Puiston alla toimii Olkarian voimalaitosryhmä: Afrikan '
      + 'ensimmäinen geoterminen voimalaitos avattiin 1981, ja viides yksikkö kytkettiin verkkoon '
      + '2019.',
    lahde: 'en-Wikipedia "Hell\'s Gate National Park", johdanto-osa sekä osiot "History", '
      + '"Geography", "Wildlife" ja "Olkaria Geothermal Power Station" (tarkistettu 6.9.2026).',
  },
  {
    id: 'amboseli',
    nimi: 'Amboseli',
    tyyppi: 'elain',
    kysymykset: [
      'Mitä maan kielellä tarkoittaa Empusel?',
      'Kuka oli Echo?',
    ],
    korostukset: ['norsu|norsuistaan'],
    nappi: 'Maailman tutkituin norsulauma',
    // 37.2481 E / 2.6414 S — en-Wikipedia "Amboseli National Park"
    // Lähin pelikaupunki: Kilimandžaro 54,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7074.9, y: 3299.6 },
    },
    teksti: 'Amboseli on 392 neliökilometrin puisto keskellä 8 000 neliökilometrin ekosysteemiä, '
      + 'joka jatkuu Tansanian puolelle. Maasait kutsuivat seutua nimellä Empusel, "suolainen, '
      + 'pölyinen paikka", ja juuri se on maisemassa erikoista: kuivunut jääkautinen järvenpohja '
      + 'ja sen keskellä vihreät suot. Alue erotettiin maasaiden eteläiseksi reservaatiksi 1906, '
      + 'palautettiin paikalliseen hallintaan riistasuojeluna 1948 ja tuli kansallispuistoksi '
      + '1974. Puisto tunnetaan norsuistaan: amerikkalainen käyttäytymistutkija Cynthia Moss on '
      + 'seurannut niitä vuodesta 1972, ja sen tunnetuin yksilö oli naaras Echo, maailman '
      + 'tutkituin norsu, jota Moss seurasi lähes neljä vuosikymmentä ja joka kuoli 2009 noin '
      + '60-vuotiaana. Lintulajeja on 400, joista 47 on petolintuja.',
    lahde: 'en-Wikipedia "Amboseli National Park", johdanto-osa sekä osiot "History" ja '
      + '"Wildlife" (tarkistettu 6.9.2026).',
  },
  {
    id: 'lewa',
    nimi: 'Lewa',
    tyyppi: 'elain',
    kysymykset: [
      'Mikä on grevynseepra?',
      'Miten karjatilasta tuli suojelualue?',
    ],
    korostukset: ['sarvikuono|sarvikuonoista'],
    nappi: 'Karjatila, josta tuli suojelualue',
    // 37.4167 E / 0.2 N — en-Wikipedia "Lewa Wildlife Conservancy"
    // Lähin pelikaupunki: Nairobi 73,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7080.6, y: 3204.8 },
    },
    teksti: 'Lewa on Mount Kenyan pohjoispuolella oleva suojelualue, joka syntyi karjatilasta. '
      + 'Craig-Douglasin perhe sai maan siirtomaahallinnolta 1922 ja piti sitä karjatilana yli '
      + 'viisikymmentä vuotta. Vuonna 1983 perhe ja hanketta rahoittanut Anna Merz perustivat '
      + 'tilan länsipäähän aidatun ja vartioidun Ngare Sergoin sarvikuonosuojelualueen; kymmenen '
      + 'vuotta myöhemmin suojelu laajennettiin koko tilalle, ja 1994 aidan sisään otettiin myös '
      + 'Ngare Ndaren metsä. Näin syntyi 267 neliökilometrin alue, joka sai nykyisen nimensä '
      + '1995. Lewalla elää yli 12 prosenttia Kenian itäisistä mustista sarvikuonoista ja '
      + 'maailman suurin yhtenäinen grevynseeprakanta, noin 350 yksilöä. Salametsästystä vastaan '
      + 'työskentelevä partio on oma yksikkönsä: sen johtaja Edward Ndiritu sai 2015 Tusk '
      + 'Wildlife Ranger -palkinnon.',
    lahde: 'en-Wikipedia "Lewa Wildlife Conservancy", johdanto-osa sekä osiot "History" ja '
      + '"Wildlife" (tarkistettu 6.9.2026).',
  },
];

