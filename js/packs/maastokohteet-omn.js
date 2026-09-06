/*
 * MAASTOKOHTEET — OMN. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs OMN --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/OMN.json. Työkalu laskee laudan
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
 * Omanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Jabal Shamsin korkeuslukema on artikkelin tietolaatikosta (Wikidata P2044: 3 018 m); johdanto sanoo vain, että vuori on maan korkein.
 *
 * ── MAAILMAN ERÄ M6, LÄHI-ITÄ (6.9.2026) ───────────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Omanilla oli kaksi karttamerkkiä eikä yhtään kohdetta. Erä tuo täyden
 * kiintiön: kahdeksan KOHDETTA ja kolmannen MAASTOKOHTEEN (Masirah).
 * Koordinaatit koneella (`import { laudat } from
 * tools/johda-maastokohteet.mjs`, lon/lat en-Wikipedian
 * coordinates-propista), tekstit käsin raakatekstistä. Kuvaton erä,
 * vain maailmankartan rivi.
 *
 * KAUPUNKIETÄISYYS MITATTIIN JOKAISEEN CITIES-KAUPUNKIIN
 * (js/packs/maailmankartta.js). Omanissa niitä on kaksi, Masqat ja
 * Salalah. Lähin uusi merkki on Sumhuram 15,9 lautayksikön päässä
 * Salalahista — yli KAUPUNGIN_KOHDALLA_SADE-rajan (7,
 * js/fokuskohteet.js) ja kaupunkikaton säteen (8). Juuri tästä
 * säännöstä jäi pois Al-Baleedin arkeologinen puisto: se on 5,8
 * yksikön päässä Salalahista eli kaupungin kohdalla.
 *
 * SÄÄNTÖ N3 JA SHISR. Shisrin (Ubarin) paikka ei ole tässä listassa
 * vaan js/packs/skandaalit.js:ssä, koska sen kiinnostavin tarina on
 * vuoden 1992 löytöväite ja sen kiistäminen. Yksikään tämän listan nimi
 * ei ole laudan omassa nimitaulussa (js/packs/maailmankartta-nimet.js).
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`);
 * Omanilla rajaus on olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.OMN),
 * joten vartio pätee ja jokainen piste on tarkistettu sitä vasten.
 * Vartiota ei ole muutettu.
 */
export const MAASTOKOHTEET_OMN = [
  {
    id: 'jabalshams',
    nimi: 'Jabal Shams',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren nimi on Auringon vuori?',
      'Miten kanjoni syntyy aavikkomaahan?',
    ],
    korostukset: ['Al Nakhur|Al Nakhurin'],
    nappi: 'Arabian suuri kanjoni',
    // 57.2639 E / 23.2369 N — en-Wikipedia "Jebel Shams"
    laudat: {
      maailmankartta: { x: 7742.1, y: 2423 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Omanin korkeimmalle huipulle ei pääse kukaan. Jabal Shamsin pohjoishuippu on 3 009 '
      + 'metriä korkea, ja sen päällä on sotilastukikohta suljetulla alueella; retkeilijöille '
      + 'jää eteläinen huippu, kaksitoista metriä matalampi, jonne turistiministeriön '
      + 'merkitsemä W4-polku vie. Nimi tarkoittaa Auringon vuorta, ja sen kerrotaan tulevan '
      + 'siitä, että auringonnousu osuu Omanissa ensimmäisenä juuri tälle huipulle. Vuoren '
      + 'kyljessä aukeaa Al Nakhurin rotko, jota kutsutaan Arabian Grand Canyoniksi. Korkeus '
      + 'näkyy myös lämpötilassa: kesällä huipulla on noin kaksikymmentä astetta, talvella '
      + 'pakkasta — kaksisataaneljäkymmentä kilometriä Muscatista ja aivan toinen ilmasto.',
    lahde: 'en-Wikipedia "Jebel Shams", johdanto-osa sekä osiot "Description" ja "Climate" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'omaninlahti',
    nimi: 'Omaninlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on hapeton merialue?',
      'Miksi Hormuzinsalmi on maailmankaupalle tärkeä?',
    ],
    korostukset: ['Hormuzinsalmi|Hormuzinsalmeen'],
    nappi: 'Portti Persianlahdelle',
    // 58.9 E / 24.2 N — ulappa Muscatin koillispuolella; artikkelin oma keskipiste on 58 / 25
    laudat: {
      maailmankartta: { x: 7796.7, y: 2389 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Vuonna 2018 tutkijat vahvistivat, että Omaninlahti on käytännössä kuollut. Sen lähes '
      + '165 000 neliökilometrin ulapasta on tullut yksi maailman suurimmista hapettomista '
      + 'merialueista — Floridan kokoinen vyöhyke, jossa merieläimille ei riitä happea. Syitä '
      + 'on kaksi yhtä aikaa: meri lämpenee, ja mailta huuhtoutuu siihen lannoitteiden typpeä '
      + 'ja fosforia. Silti lahti on yhä yksi maailman vilkkaimmin liikennöidyistä vesistä. Se '
      + 'yhdistää Arabianmeren Hormuzinsalmeen, jonka läpi kulkee kolmannes maailman '
      + 'nesteytetystä maakaasusta ja viidennes öljystä. Aina 1700-luvulle asti lahtea '
      + 'kutsuttiin Makranin mereksi, ja se nimi näkyy yhä vanhoissa kartoissa.',
    lahde: 'en-Wikipedia "Gulf of Oman", osiot "Ecology", "International trade" ja "Alternative '
      + 'names" (tarkistettu 1.9.2026).',
  },

  /* ================================================================
   * ERÄ M6, LÄHI-ITÄ (6.9.2026) — kahdeksan kohdetta ja Masirah.
   * ============================================================== */
  {
    id: 'masirah',
    nimi: 'Masirah',
    tyyppi: 'saari',
    kysymykset: [
      'Miksi saarelle vietiin radiolähettimiä?',
      'Mikä on Masirahin salmi?',
    ],
    korostukset: ['Ra’s Hilf|Ra’s Hilf'],
    nappi: 'Omanin suurin saari',
    // 58.81528 E / 20.47111 N — en-Wikipedia "Masirah Island"
    // Lähin pelikaupunki: Masqat 109,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7793.8, y: 2519.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Masirah on Omanin suurin saari, 95 kilometriä pohjoisesta etelään ja 12–14 kilometriä '
      + 'leveä, pinta-alaltaan noin 649 neliökilometriä. Se erottuu mantereesta Masirahin '
      + 'salmella. Saaren sisäosat ovat lähes autiot: noin kaksitoistatuhatta asukasta asuu '
      + 'kahdessatoista kylässä pääosin pohjoisosassa. Pääkylä on Ra’s Hilf, jossa on ilmavoimien '
      + 'tukikohta ja kalatehdas. Aikoinaan saarella oli BBC:n radioasema pitkine ja keskipitkine '
      + 'lähettimineen; nykyään pääelinkeinot ovat kalastus ja perinteinen tekstiilinvalmistus, '
      + 'ja ennen myös puulaivanrakennus oli tärkeää.',
    lahde: 'en-Wikipedia "Masirah Island", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'bahlanlinnoitus',
    nimi: 'Bahlan linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi mutatiili on vaikea säilyttää?',
      'Mikä on maailmanperinnön vaarantuneiden lista?',
    ],
    korostukset: ['Banu Nebhan|Banu Nebhanin'],
    nappi: 'Mutatiilistä muurattu jättiläinen',
    // 57.30111 E / 22.96417 N — en-Wikipedia "Bahla Fort"
    // Lähin pelikaupunki: Masqat 47,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7743.4, y: 2432.6 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Bahlan linnoitus on yksi neljästä historiallisesta linnakkeesta Jebel Akhdarin '
      + 'ylängön juurella ja Omanin ensimmäinen Unescon luetteloon otettu kohde, vuodelta 1987. '
      + 'Sen rakensi 1100–1400-luvuilla Banu Nebhanin heimo, joka hallitsi suitsukekauppaa. '
      + 'Linnoituksen vieressä on keidas ja sen ympärillä kolmentoista kilometrin pituinen '
      + 'muinainen muuri, josta osa seisoo yhä. Koska muurit on tehty mudasta ja oljesta '
      + 'muotoillusta tiilestä, eroosio söi rakennusta niin pahoin, että se oli maailmanperinnön '
      + 'vaarantuneiden listalla vuoteen 2004 asti; suuren kunnostuksen jälkeen linnoitus '
      + 'avattiin uudelleen 2012.',
    lahde: 'en-Wikipedia "Bahla Fort", johdanto-osa sekä osiot "History of Bahla Fort" ja '
      + '"Risks to the fort" (tarkistettu 6.9.2026).',
  },
  {
    id: 'nizwanlinnoitus',
    nimi: 'Nizwan linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi torni rakennettiin puron päälle?',
      'Mitä ovat murha-aukot?',
    ],
    korostukset: ['Sultan bin Saif|Sultan bin Saif'],
    nappi: 'Torni, jossa on kuoppia pimeässä',
    // 57.53028 E / 22.93333 N — en-Wikipedia "Nizwa Fort"
    // Lähin pelikaupunki: Masqat 41,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7751, y: 2433.6 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Nizwan linnoituksen rakennutti 1650-luvulla imaami Sultan bin Saif Al Ya’rubi, vaikka '
      + 'sen alla oleva rakenne on 1100-luvulta. Valtava rumpumainen torni nousee kolmekymmentä '
      + 'metriä maasta, sen halkaisija on kolmekymmentäkuusi metriä ja perustukset ulottuvat '
      + 'kolmenkymmenen metrin syvyyteen. Tornin laella on kaksikymmentäneljä aukkoa mörssäri'
      + 'tulelle. Rakennus on täynnä harhautusta: valeovia, salakuiluja ja kuusi kuoppaa pimeissä '
      + 'käytävissä, ja ovien yläpuolella olevista aukoista kaadettiin kiehuvaa öljyä, vettä tai '
      + 'taatelisiirappia. Torni pystytettiin maanalaisen puron päälle, jottei vesi loppuisi '
      + 'pitkässäkään piirityksessä.',
    lahde: 'en-Wikipedia "Nizwa Fort", johdanto-osa sekä osiot "History" ja "Layout" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'batinhaudat',
    nimi: 'Batin haudat',
    tyyppi: 'historia',
    kysymykset: [
      'Mihin ikkunattomia kivirakennuksia käytettiin?',
      'Mitä Omanista vietiin sumerilaisille?',
    ],
    korostukset: ['Hafit|Hafit-kaudelta'],
    nappi: 'Sata hautaa palmulehdon vieressä',
    // 56.745 E / 23.26986 N — en-Wikipedia "Archaeological Sites of Bat, Al-Khutm and Al-Ayn"
    // Lähin pelikaupunki: Masqat 61,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7724.8, y: 2421.8 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Batin, Al-Khutmin ja Al-Aynin muinaisjäännökset ovat mehiläispesähautoja Hafit-'
      + 'kaudelta, kolmannelta vuosituhannelta eaa., ja ne julistettiin maailmanperinnöksi 1988 '
      + 'Omanin toisena kohteena. Bat on palmulehdon sisällä: hautausmaalla on sata hautaa ja '
      + 'pyöreitä rakennuksia, joiden halkaisija on noin kaksikymmentä metriä. Rakennuksissa ei '
      + 'ole ainuttakaan ulkoaukkoa, joten niitä on arveltu myös vesisäiliöiksi tai varastoiksi — '
      + 'käyttötarkoitus on yhä auki. Noin 3000 eaa. seudulta vietiin paikallista kuparia ja '
      + 'kiveä sumerilaisille. Tanskalainen Karen Frifeltin retkikunta osoitti 1972, että aluetta '
      + 'on asuttu yhtäjaksoisesti neljätuhatta vuotta.',
    lahde: 'en-Wikipedia "Archaeological Sites of Bat, Al-Khutm and Al-Ayn", johdanto-osa sekä '
      + 'osiot "Bat" ja "Al-Khutm" (tarkistettu 6.9.2026).',
  },
  {
    id: 'sur',
    nimi: 'Sur',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miten Suezin kanava vaikutti Suriin?',
      'Mikä on ghanjah?',
    ],
    korostukset: ['ghanjah|ghanjah'],
    nappi: 'Dhow-veistämöiden kaupunki',
    // 59.52889 E / 22.56667 N — en-Wikipedia "Sur, Oman"
    // Lähin pelikaupunki: Masqat 48,4 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7817.6, y: 2446.5 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Sur oli jo 500-luvulla vakiintunut Itä-Afrikan kaupan keskus, ja Ibn Battuta kuvasi '
      + 'sen suuren kylän ankkuripaikaksi meren rannalla. 1500-luvulla kaupunki oli portugalilais'
      + 'vallan alla, kunnes imaami Nasir ibn Murshid vapautti sen; sen jälkeen se kukoisti '
      + 'Intian ja Itä-Afrikan kauppapaikkana. Kaksi asiaa lopetti kukoistuksen 1800-luvun '
      + 'puolivälissä: britit kielsivät orjakaupan, ja Suezin kanavan avaaminen vei Intian-'
      + 'liikenteen muualle. Suria tunnetaan yhä puulaivanrakennuksesta: täällä tehtiin sambuk- '
      + 'ja ghanjah-tyyppisiä aluksia, jotka purjehtivat Kiinaan, Intiaan, Sansibariin ja Irakiin '
      + 'ja joilla myös pyydettiin helmiä.',
    lahde: 'en-Wikipedia "Sur, Oman", johdanto-osa sekä osiot "History" ja "Shipbuilding" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sumhuram',
    nimi: 'Sumhuram',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi satama lakkasi toimimasta?',
      'Mikä oli Hadramawtin kuningaskunta?',
    ],
    korostukset: ['Hadramawt|Hadramawtin'],
    nappi: 'Suitsukesatama, jonka hiekka sulki',
    // 54.4327 E / 17.0397 N — en-Wikipedia "Khor Rori"
    // Lähin pelikaupunki: Salalah 15,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7647.8, y: 2638.1 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Khor Rori on Wadi Darbatin suulla oleva laguuni Dhofarissa lähellä Taqahia. Yhteys '
      + 'Arabianmereen aukeaa ja sulkeutuu vuorotellen, ja avoimena ollessaan lahti oli tärkeä '
      + 'suitsukekaupan satama. Itärannalla ovat muinaisen linnoitetun satamakaupungin Sumhuramin '
      + 'rauniot: se perustettiin 200-luvulla eaa. Hadramawtin kuningaskunnan tukikohdaksi ja '
      + 'siirtyi myöhemmin Himjarin vaikutuspiiriin, mistä kertovat kaivetut himjarilaiset '
      + 'kolikot. Kaupunki hylättiin 400-luvulla jaa., ja syyksi arvellaan hiekkavallia, joka '
      + 'sulki laguunin suun. Alue on ollut vuodesta 2000 osa Unescon Suitsukkeen maa '
      + '-maailmanperintökohdetta.',
    lahde: 'en-Wikipedia "Khor Rori", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'sharqiyanhiekat',
    nimi: 'Sharqiyan hiekat',
    // Aavikko ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi aavikko kiinnostaa tutkijoita?',
      'Mistä aavikko sai nimensä?',
    ],
    korostukset: ['Bani Wahiba|Bani Wahiban'],
    nappi: 'Aavikko, joka laskettiin lajilleen',
    // 58.8333 E / 22.0 N — en-Wikipedia "Sharqiya Sands"
    // Lähin pelikaupunki: Masqat 56,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7794.4, y: 2466.3 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Sharqiyan hiekat, ennen Wahiban hiekat, on aavikkoalue Omanin itäosassa, ja se on '
      + 'saanut nimensä Bani Wahiban heimosta. Alue on satakahdeksankymmentä kilometriä '
      + 'pohjoisesta etelään ja kahdeksankymmentä kilometriä idästä länteen, yhteensä noin '
      + '12 500 neliökilometriä. Tiede kiinnostui siitä toden teolla 1986, kun Royal Geographical '
      + 'Societyn retkikunta kartoitti maaston, kasvit ja eläimet. Retkikunta kirjasi '
      + 'kuusitoistatuhatta selkärangatonta, kaksisataa muuta eläinlajia ja sataviisikymmentä '
      + 'alkuperäistä kasvilajia — aavikko ei siis ole tyhjä.',
    lahde: 'en-Wikipedia "Sharqiya Sands", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'nakhalinlinnoitus',
    nimi: 'Nakhalin linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnoituksen sisällä on kalliota?',
      'Mikä on Ain A’Thawwarah?',
    ],
    korostukset: ['Said bin Sultan|Said bin Sultanin'],
    nappi: 'Linna, joka rakennettiin kallion muotoon',
    // 57.829 E / 23.395 N — en-Wikipedia "Nakhal Fort"
    // Lähin pelikaupunki: Masqat 25,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7761, y: 2417.4 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Nakhalin linnoitus, toiselta nimeltään Husn Al Heem, seisoo kalliokielekkeellä Jebel '
      + 'Nakhalin juurella noin sadankahdenkymmenen kilometrin päässä Masqatista länteen. Se '
      + 'rakennettiin suojaamaan keidasta ja sen ohi kulkevia kauppareittejä, ja omanilaiset '
      + 'rakentajat uusivat sen 1600-luvulla; nykyinen portti ja tornit ovat imaami Said bin '
      + 'Sultanin vuoden 1834 laajennusta. Linna on rakennettu epäsäännöllisen kallion muotoon '
      + 'niin, että kallio työntyy paikoin sisätiloihin — sellaista ei ole muissa Omanin '
      + 'linnoissa. Ympärillä on palmutarhoja, ja lähellä pulppuavat Ain A’Thawwarahin lämpimät '
      + 'lähteet.',
    lahde: 'en-Wikipedia "Nakhal Fort", johdanto-osa sekä osiot "History" ja "Overview" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'musandam',
    nimi: 'Musandam',
    // Vuonomainen niemimaa ei ole vuori eikä meri: 'muu' + 'luonto'.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi Musandamiin ei pääse Omanista maitse?',
      'Mikä kieli on kumzari?',
    ],
    korostukset: ['Hormuzinsalmi|Hormuzinsalmeen'],
    nappi: 'Omanin erillinen niemimaa',
    // 56.25 E / 26.2 N — en-Wikipedia "Musandam Governorate"
    // Lähin pelikaupunki: Dubai 59,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 7708.3, y: 2318 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Musandam on Omanin maakunta, joka työntyy Hormuzinsalmeen — kapeaan portiin '
      + 'Persianlahdelle — ja on samalla eksklaavi: Arabiemiirikunnat erottaa sen muusta Omanista. '
      + 'Sijainti antaa Omanille osan salmen hallinnasta, jonka se jakaa Iranin kanssa. '
      + 'Niemimaan pinta-ala on noin 1 800 neliökilometriä ja väkiluku vuoden 2020 laskennassa '
      + '49 062. Pohjoisosassa Kumzarin kylässä puhutaan kumzaria, luoteisiranilaista kieltä, '
      + 'joka on sukua larestanille ja lurille. Alueelle pääsi ennen vain lennolla tai '
      + 'kymmenen tunnin ajomatkalla neljän rajatarkastuksen läpi, kunnes Shinasin pikalautta '
      + 'aloitti Masqatista elokuussa 2008.',
    lahde: 'en-Wikipedia "Musandam Governorate", johdanto-osa (tarkistettu 6.9.2026).',
  },
];

