/*
 * MAASTOKOHTEET — LVA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs LVA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/LVA.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 2.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ───────────
 *
 * Omistaja 2.9.2026: *"pitäisi jatkaa kaikki Euroopan maat loppuun
 * näiden karttanostojen osalta."* Latvia oli yksi laudan tyhjimmistä
 * maista: kymmenen karttamerkkiä ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat.
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-lva.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei voitu
 * tehdä tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista sen sijaan liittyy peliin
 * hakemiston kautta (js/packs/maastokohteet.js), joten kohteet ovat
 * kartalla heti — ja kun KOHDE_MAAT vapautuu, lohko siirtyy omaan
 * pakkiinsa sellaisenaan.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin (Turaida)
 * on 29,6 lautayksikön päässä lähimmästä pelikaupungista, eli
 * reilusti yli kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js). Yksikään ei siis kuulu kohdekartalle, vaan
 * kaikki ovat pääkartan merkkejä — omistajan sääntö kohdekaupunkien
 * nostoista ei koske näitä.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti
 * kantaa tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto
 * olisi huonompi kuin kuvaton kortti (Perustuslaki, faktakuri).
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 2.9.2026.
 *
 * Latvian maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 */
export const MAASTOKOHTEET_LVA = [
  {
    id: 'gaizinkalns',
    nimi: 'Gaiziņkalns',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi tornia ei koskaan saatu valmiiksi?',
      'Millainen on Vidzemen ylänkö?',
    ],
    korostukset: ['Vidzeme|Vidzemen'],
    nappi: 'Mäki, jolle rakennettiin torni kilpailusta',
    // 25.9594 E / 56.8703 N — en-Wikipedia "Gaiziņkalns"
    laudat: {
      maailmankartta: { x: 6698.6, y: 1078 },
      europe: { x: 709.6, y: 397.9 },
    },
    teksti: 'Gaiziņkalns on 312 metriä merenpinnasta ja Latvian korkein kohta. Se on Vidzemen '
      + 'ylängöllä lyhyen matkan päässä Madonan kaupungista länteen. Naapurimaan Viron korkein '
      + 'kohta Suur Munamägi on kuusi metriä korkeampi, ja kilpailu siitä johti '
      + 'tornihankkeeseen: torni ylsi virolaisen ohi, mutta se jäi kesken, suljettiin '
      + 'turvallisuussyistä ja purettiin joulukuussa 2012.',
    lahde: 'en-Wikipedia "Gaiziņkalns", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Miksi Riianlahti on erillinen?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 21 E / 57 N — ulappa Kuurinmaan rannikon edustalla; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6533.3, y: 1071.8 },
      europe: { x: 614.4, y: 394.5 },
    },
    teksti: 'Itämeren pohjassa lepää laivoja, jotka eivät ole lahonneet. Vesi on kylmää ja '
      + 'niin vähäsuolaista, ettei laivamato viihdy siinä, ja siksi vanhat puuhylyt säilyvät '
      + 'täällä toisin kuin valtamerissä. Kuuluisin niistä on ruotsalainen sotalaiva Vasa: se '
      + 'kaatui neitsytmatkallaan 10. elokuuta 1628 reilun kilometrin purjehdittuaan, ja se '
      + 'nostettiin pohjasta 333 vuotta myöhemmin lähes ehjin rungoin. Meri on Atlantin haara, '
      + 'jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, Liettua, Puola, Venäjä ja '
      + 'Ruotsi, ja se on maailman suurin murtovesiallas. Latvian rannikkoa reunustaa '
      + 'Riianlahti, meren oma sivumeri, ja siihen laskee Väinäjoki — yksi niistä suurista '
      + 'joista, jotka pitävät meren veden vähäsuolaisena. Riian, Ventspilsin ja Liepājan '
      + 'telakat ovat Itämeren suurimpia.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa sekä osiot "Storms and storm floods", '
      + '"Subdivisions", "Hydrography" ja "Economy"; laivan osalta "Vasa (ship)", johdanto-osa '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'vainajoki',
    nimi: 'Väinäjoki',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi joella on kolme eri nimeä?',
      'Missä Väinäjoen lähde on?',
    ],
    korostukset: ['Valdai|Valdain'],
    nappi: 'Joki kolmen maan halki',
    // 25.86 E / 56.5 N — Jēkabpils joen keskijuoksulla Latviassa; artikkelin koordinaatti 24,031 / 57,062 on suistossa Riianlahdella
    laudat: {
      maailmankartta: { x: 6695.3, y: 1095.6 },
      europe: { x: 707.7, y: 407.7 },
    },
    teksti: 'Väinäjoki, jota kutsutaan myös Länsi-Dvinaksi ja latviaksi Daugavaksi, nousee Valdain '
      + 'kukkuloilta Venäjältä ja virtaa Valko-Venäjän ja Latvian halki Itämeren Riianlahteen. '
      + 'Pituutta sillä on 1 020 kilometriä, josta 352 kilometriä Latviassa ja 325 Venäjällä. '
      + 'Sen lähde on aivan Volgan lähteen naapurissa, mutta se kääntyy länteen ja piirtää '
      + 'matkallaan Pohjois-Valko-Venäjän halki suuren etelään taipuvan kaaren.',
    lahde: 'en-Wikipedia "Daugava", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   *
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026). Yllä olevien
   * maastokohteiden vanhoihin riveihin ei ole koskettu.
   *
   * RIIKA ON JÄTETTY RAUHAAN: kaupungin nostot asuvat kohdekartalla,
   * eikä kohdekaupungin kohdalla oleva merkki kuulu pääkartalle.
   * Lähin uusi kohde on Turaida 29,6 lautayksikön päässä.
   *
   * KAHDEKSAN KOHDETTA, KAHDEKSAN ERI SYMBOLIA: kulttuuri, historia,
   * sana, merenkulku, ruoka, kauppa, tekniikka ja eläin. Maan
   * karttamerkit eivät siis toista toistensa muotoa.
   * ============================================================== */
  {
    id: 'rundale',
    nimi: 'Rundālen palatsi',
    nimio: 'Rundāle',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka suunnitteli palatsin?',
      'Mihin palatsia käytettiin vuonna 1812?',
    ],
    korostukset: ['Rastrelli|Rastrellin'],
    nappi: 'Herttuan kesäpalatsi Semgallian tasangolla',
    // 24.0248 E / 56.4138 N — en-Wikipedia "Rundāle Palace"
    laudat: {
      maailmankartta: { x: 6634.2, y: 1099.6 },
    },
    teksti: 'Rundālen palatsi on toinen kahdesta suuresta barokkipalatsista, jotka '
      + 'rakennettiin Kuurinmaan herttuoille nykyisen Latvian alueelle; toinen on '
      + 'Jelgavan palatsi. Se seisoo Semgalliassa, kaksitoista kilometriä Bauskasta '
      + 'länteen, ja se rakennettiin kahdessa jaksossa: 1736–1740 ja 1764–1768.\n\n'
      + 'Herttua Ernst Johann von Biron osti Rundālen maat vanhoine keskiaikaisine '
      + 'linnoineen vuonna 1735 kesäasuntoa varten. Vanha linna purettiin, ja '
      + 'Bartolomeo Rastrellin piirustusten mukainen rakennustyö alkoi 1736. Se '
      + 'eteni hitaasti, koska osa aineksista ja työvoimasta siirrettiin Jelgavan '
      + 'palatsille, joka oli herttualle tärkeämpi. Kun Biron menetti asemansa 1740, '
      + 'palatsi jäi keskeneräisenä tyhjilleen — aina vuoteen 1762, jolloin hän '
      + 'palasi maanpaosta. Rastrellin valvonnassa työ saatiin valmiiksi 1768, ja '
      + 'Johann Michael Graff teki taloon runsaat stukkokoristeet. Biron muutti '
      + 'palatsiin heti ja vietti siellä kesänsä kuolemaansa 1772 asti.\n\n'
      + 'Kun herttuakunta liitettiin Venäjän keisarikuntaan 1795, Katariina Suuri '
      + 'lahjoitti palatsin kreivi Valerian Zuboville; myöhemmin se siirtyi '
      + 'Šuvalovin suvulle, jonka hallussa se pysyi ensimmäiseen maailmansotaan '
      + 'asti. Vuoden 1812 Venäjän-sotaretken aikana talo toimi Napoleonin armeijan '
      + 'sairaalana, ja siellä kuolleita sotilaita haudattiin palatsin puistoon; '
      + 'heille on sittemmin pystytetty muistomerkki. Palatsi ja puisto kunnostettiin '
      + '1800-luvun lopulla.',
    lahde: 'en-Wikipedia "Rundāle Palace", johdanto-osa ja osio "History" '
      + '(tarkistettu 2.9.2026).',
  },
  {
    id: 'cesis',
    nimi: 'Cēsisin linna',
    nimio: 'Cēsis',
    tyyppi: 'historia',
    kysymykset: [
      'Keitä olivat vendit?',
      'Mikä oli castellum?',
    ],
    korostukset: ['castellum|castellum'],
    nappi: 'Liivinmaan ritarikunnan pääpaikka',
    // 25.27 E / 57.3133 N — en-Wikipedia "Cēsis Castle"
    laudat: {
      maailmankartta: { x: 6675.7, y: 1056.9 },
    },
    teksti: 'Cēsisin linna on Latvian parhaiten säilyneitä keskiaikaisia linnoja. '
      + 'Sen perustukset laski Kalpaveljien ritarikunta kahdeksansataa vuotta sitten. '
      + 'Syksyllä 1206 vendit — pieni heimo nykyisen Cēsisin paikalla — kääntyivät '
      + 'kristinuskoon ja liittoutuivat ristiretkeläisten kanssa, ja vuonna 1208 '
      + 'ritarit asettuivat asumaan heidän linnavuorelleen ja korvasivat puiset '
      + 'varustukset kivimuurilla. Vaikka Henrik Liiviläisen kronikka kutsuu linnaa '
      + '"Liivinmaan pienimmäksi", se kesti toistuvat piiritykset.\n\n'
      + 'Uuden kivilinnan rakentaminen alkoi vanhan linnavuoren viereen 1213 tai '
      + '1214. Vuonna 1237 linna siirtyi Saksalaisen ritarikunnan Liivinmaan '
      + 'haaralle, ja seurasi suuri uudisrakennus: vanhat varustukset korvattiin '
      + 'neliömäisellä castellum-linnalla, jonka neljä siipeä ympäröivät sisäpihaa. '
      + 'Muoto oli tuotu Preussista, ja sen taustalla oli tarve linnoitetuille '
      + 'konventeille — helposti puolustettaville ja mahdollisimman tiiviille.\n\n'
      + 'Cēsisistä tuli ritarikunnan hallinnon ja talouden avainpaikka Liivinmaalla '
      + 'ja Liivinmaan maamestarin istuin. Ensimmäisen vakavan vaurion linna sai '
      + 'Liivinmaan sodassa, kun Iivana Julman armeija piiritti sitä; vuoden 1577 '
      + 'piirityksessä noin kolmesataa linnassa ollutta surmasi itsensä ruudilla. '
      + 'Linna oli käytössä vielä seuraavan vuosisadan, mutta suuren Pohjan sodan '
      + 'jälkeen se jäi autioksi.',
    lahde: 'en-Wikipedia "Cēsis Castle", johdanto-osa ja osio "History/Foundation '
      + 'and expansion" (tarkistettu 2.9.2026).',
  },
  {
    id: 'turaidan-ruusu',
    nimi: 'Turaidan ruusu',
    nimio: 'Turaida',
    tyyppi: 'sana',
    kysymykset: [
      'Mistä legenda sai alkunsa?',
      'Miksi vastavihityt käyvät haudalla?',
    ],
    korostukset: ['Gutmanin luola|Gutmanin luolaan'],
    nappi: 'Legenda, jolla on oikeuden pöytäkirja',
    // 24.8503 E / 57.1826 N — Turaidan linna Gaujan rannalla;
    // en-Wikipedia "Legend of Turaida Rose"
    laudat: {
      maailmankartta: { x: 6661.7, y: 1063.1 },
    },
    teksti: 'Turaidan ruusu on 1800-luvun legenda Maija-nimisestä nuoresta naisesta. '
      + 'Kertomuksen mukaan linnan kirjuri löysi vuoden 1601 taistelun jälkeen '
      + 'Turaidan linnan juurelta vauvan kuolleen äitinsä sylistä, otti tytön omakseen '
      + 'ja antoi hänelle nimen Maija. Tytöstä kasvoi niin kaunis, että häntä '
      + 'kutsuttiin Turaidan ruusuksi. Hän rakastui Viktoriin, Siguldan linnan '
      + 'puutarhuriin joen toisella puolen, ja syksyllä 1620 pari valmistautui '
      + 'häihin.\n\n'
      + 'Vähän ennen häitä Maija sai kirjeen, jossa Viktor pyysi häntä tapaamaan '
      + 'Gutmanin luolaan, heidän tavalliseen tapaamispaikkaansa. Luolassa odottikin '
      + 'puolalainen sotilas Adam Jakubowski, joka aikoi pakottaa hänet vaimokseen. '
      + 'Maija lupasi antaa miehelle taikahuivinsa, jonka sanottiin suojaavan '
      + 'kantajaansa kaikilta vammoilta, jos tämä päästäisi hänet menemään — ja '
      + 'suostutteli miehen koettelemaan huivin voimaa hänen itsensä päällä. Isku '
      + 'tappoi Maijan, ja niin hän säilytti kunniansa.\n\n'
      + 'Viktoria syytettiin murhasta, mutta oikeudessa todisti Peteris Skudritis, '
      + 'jonka Jakubowski oli palkannut viemään kohtalokkaan kirjeen. Viktor hautasi '
      + 'kihlattunsa linnan lähelle, istutti haudalle lehmuksen ja lähti maasta '
      + 'ainiaaksi; Siguldan arkiston asiakirjojen mukaan sotilas jäi myöhemmin '
      + 'kiinni ja hänet tuomittiin ja hirtettiin. Legendan pohjana ovat 1800-luvulla '
      + 'löytyneet oikeuden asiakirjat, jotka julkaistiin 1848 — samana vuonna, jona '
      + 'baltiansaksalainen runoilija Adelbert Cammerer julkaisi runon Die Jungfrau '
      + 'von Treiden. Haudalla käydään yhä: vastavihityt jättävät sinne kukkia '
      + 'toivoen samaa ikuista uskollisuutta.',
    lahde: 'en-Wikipedia "Legend of Turaida Rose", johdanto-osa ja osio "Story" '
      + '(tarkistettu 2.9.2026).',
  },
  {
    id: 'liepaja',
    nimi: 'Liepāja',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Mistä kaupungin nimi tulee?',
      'Miksi kaupunkia sanotaan tuulen syntypaikaksi?',
    ],
    korostukset: ['liepa|liepa'],
    nappi: 'Jäätön satama Kuurinmaan rannalla',
    // 21.0139 E / 56.5117 N — en-Wikipedia "Liepāja"
    laudat: {
      maailmankartta: { x: 6533.8, y: 1095 },
    },
    teksti: 'Liepāja on kaupunki Länsi-Latviassa Itämeren rannalla, Kuurinmaan suurin '
      + 'ja koko maan kolmanneksi suurin Riian ja Daugavpilsin jälkeen. Sen tärkein '
      + 'ominaisuus on satama, joka ei jäädy talvellakaan.\n\n'
      + 'Nimi tulee latvian sanasta liepa, lehmus. Vanha nimi Libau juontunee '
      + 'Līva-joesta, joka virtasi aikoinaan kaupungin läpi mutta jota ei enää ole. '
      + 'Vanhin kirjallinen maininta Līvan kylästä on Kuurinmaan piispan ja '
      + 'Liivinmaan ritarikunnan mestarin välisessä sopimuksessa 4. huhtikuuta 1253. '
      + 'Saksalainen ritarikunta perusti paikalle 1263 kaupungin nimeltä Libau, ja '
      + 'sitä nimeä käytettiin vuoteen 1920; latviankielinen Liepāja mainittiin '
      + 'ensimmäisen kerran 1649 Paul Einhornin teoksessa Historia Lettica.\n\n'
      + '1800-luvulla ja 1900-luvun alussa Liepāja oli suosittu merikylpylä- ja '
      + 'matkailukaupunki, jossa oli hieno puisto, monta kaunista puutarhaa ja '
      + 'teatteri. Koko Latviassa se tunnetaan kaupunkina, jossa tuuli syntyy — '
      + 'todennäköisesti lakkaamattoman merituulen takia. Samanniminen Imants '
      + 'Kalniņšin sävellys on kaupungin oma laulu.',
    lahde: 'en-Wikipedia "Liepāja", johdanto-osa sekä osiot "Names and toponymy" ja '
      + '"History/Early history" (tarkistettu 2.9.2026).',
  },
  {
    id: 'sabile',
    nimi: 'Sabile',
    tyyppi: 'ruoka',
    kysymykset: [
      'Mikä teki viinimäestä ennätyksellisen?',
      'Kuka kunnosti mäen vuonna 1936?',
    ],
    korostukset: ['viinimäki|viinimäki'],
    nappi: 'Maailman pohjoisin avoin viinitarha',
    // 22.5833 E / 57.05 N — en-Wikipedia "Sabile"
    laudat: {
      maailmankartta: { x: 6586.1, y: 1069.4 },
    },
    teksti: 'Sabile on pikkukaupunki Talsin kunnassa Kuurinmaalla. Se mainitaan '
      + 'kronikoissa ensimmäisen kerran 1253, ja 1300-luvulta 1500-luvulle paikalla '
      + 'oli Liivinmaan ritarikunnan linna ja sen viereinen kylä. Kaupungiksi Sabile '
      + 'tuli vasta 1917.\n\n'
      + 'Kaupungin viinimäki oli aikanaan maailman pohjoisin avoimen taivaan alla '
      + 'oleva viinitarha, ja se kirjattiin Guinnessin ennätystenkirjaan. '
      + 'Viininviljelyn perinne ulottuu 1500-luvulle, ja ensimmäisen kerran viiniä '
      + 'tehtiin täällä jo 1300-luvulla Liivinmaan aikaan. Mäki kunnostettiin '
      + 'kokonaan vuonna 1936 kaupunginjohtaja Osvalds Rezebergsin toimesta.\n\n'
      + 'Sabilen linnavuori, joka oli seudun keskus 900-luvulta 1200-luvulle, '
      + 'kohoaa kaupungin ja Abava-joen laakson yllä.',
    lahde: 'en-Wikipedia "Sabile", artikkelin runko-osa (tarkistettu 2.9.2026).',
  },
  {
    id: 'jelgava',
    nimi: 'Jelgava',
    tyyppi: 'kauppa',
    kysymykset: [
      'Mitä nimi Mitau saattaa tarkoittaa?',
      'Miksi kaupunki tulvii?',
    ],
    korostukset: ['Pilssala|Pilssalaksi'],
    nappi: 'Herttuakunnan pääkaupunki tasangolla',
    // 23.7139 E / 56.6483 N — en-Wikipedia "Jelgava"
    laudat: {
      maailmankartta: { x: 6623.8, y: 1088.5 },
    },
    teksti: 'Jelgava on kaupunki Keski-Latviassa noin 41 kilometriä Riiasta '
      + 'lounaaseen ja Semgallian suurin kaupunki. Se oli yhdistyneen Kuurinmaan ja '
      + 'Semgallian herttuakunnan pääkaupunki vuosina 1578–1795 ja sen jälkeen '
      + 'Kuurinmaan kuvernementin hallintokeskus vuoteen 1918.\n\n'
      + 'Kaupunki on hedelmällisellä tasangolla Lielupen oikealla rannalla vain 3,5 '
      + 'metriä merenpinnan yläpuolella, ja korkean veden aikaan tasanko ja joskus '
      + 'kaupunkikin tulvivat. Jelgava on rautateiden solmukohta: yli kuusi rataa '
      + 'yhdistää täällä Riian Liettuaan sekä Itä- ja Länsi-Latviaan ja Liettuan '
      + 'Itämerelle.\n\n'
      + 'Vuoteen 1917 asti kaupungin virallinen nimi oli Mitau. Nimen Jelgava '
      + 'uskotaan tulevan liivin sanasta jālgab, joen varren kaupunki. Mitaun alkuperä '
      + 'on epäselvä: se on voitu johtaa latvian sanoista mīt tai mainīt, vaihtaa tai '
      + 'käydä kauppaa, jolloin nimi tarkoittaisi kauppapaikkaa — tai saksan '
      + 'ilmauksesta Mitte in der Aue, keskellä Aa-jokea. Asutus syntyi Lielupen ja '
      + 'Driksan väliin 900-luvulla, ja Liivinmaan ritarikunta rakensi vuosina '
      + '1265–1266 linnan luonnolliselle saarelle, jota kutsutaan Pilssalaksi.',
    lahde: 'en-Wikipedia "Jelgava", johdanto-osa sekä osiot "Name" ja '
      + '"History/Early history" (tarkistettu 2.9.2026).',
  },
  {
    id: 'daugavpilsin-linnoitus',
    nimi: 'Daugavpilsin linnoitus',
    nimio: 'Daugavpils',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi linnoitus valmistui vasta 1878?',
      'Ketkä pysähtyivät linnoitukseen matkallaan Eurooppaan?',
    ],
    korostukset: ['Dinaburg|Dinaburgin'],
    nappi: 'Linnoitus, jota rakennettiin 68 vuotta',
    // 26.495 E / 55.8864 N — en-Wikipedia "Daugavpils fortress"
    laudat: {
      maailmankartta: { x: 6716.5, y: 1124.5 },
    },
    teksti: 'Daugavpilsin linnoitus on 1800-luvun alun linnoitus Kaakkois-Latviassa. '
      + 'Se on Pohjois-Euroopan ainoa lajinsa varhainen 1800-luvun sotilaslinnoitus, '
      + 'joka on säilynyt ilman merkittäviä muutoksia.\n\n'
      + 'Rakentaminen alkoi 1810 keisari Aleksanteri I:n käskystä, kun jännitys '
      + 'ennen Napoleonin hyökkäystä kiristyi. Noin kymmenentuhatta työmiestä '
      + 'rakensi sitä kahdessa vuorossa. Kun ranskalainen 24 000 miehen osasto '
      + 'hyökkäsi linnoitukseen 1812, se oli yhä kesken ja sitä puolusti 3 300 '
      + 'miestä ja 200 tykkiä. Hyökkäys, pitkät viivytykset, vakavat tulvat ja hidas '
      + 'työ venyttivät urakkaa niin, että linnoitus valmistui kokonaan vasta 1878.\n\n'
      + 'Linnoitus oli pitkään Venäjän keisarikunnan länsirajan puolustustukikohta. '
      + 'Pietarista Eurooppaan johtanut suora reitti kulki Dinaburgin — kaupungin '
      + 'silloisen nimen — kautta, ja linnoitus oli lepopaikka monelle matkalaiselle: '
      + 'siellä pysähtyivät keisarit Aleksanteri I, Nikolai I, Aleksanteri II, '
      + 'Aleksanteri III ja Nikolai II.',
    lahde: 'en-Wikipedia "Daugavpils fortress", johdanto-osa ja osio "History" '
      + '(tarkistettu 2.9.2026).',
  },
  {
    id: 'engure',
    nimi: 'Enguren luontopuisto',
    nimio: 'Engure',
    tyyppi: 'elain',
    kysymykset: [
      'Miksi järven pinta-ala puolittui vuoden 1842 jälkeen?',
      'Miten järvi pysyy kirkasvetisenä?',
    ],
    korostukset: ['näkinpartaislevä|näkinpartaislevät'],
    nappi: 'Matala järvi, jossa pesii 180 lajia',
    // 23.1 E / 57.2667 N — en-Wikipedia "Lake Engure"
    laudat: {
      maailmankartta: { x: 6603.3, y: 1059.1 },
    },
    teksti: 'Engure on matala rannikkojärvi Riianlahden tuntumassa Luoteis-Latviassa '
      + 'ja maan kolmanneksi suurin järvi. Se syntyi noin 4 000 vuotta sitten '
      + 'Litorinameren jäänteenä ja on Latvian rannikon suurin tällainen '
      + 'jäännevesistö. Järveä erottaa avomerestä pitkä hiekkainen Enguren '
      + 'niemi.\n\n'
      + 'Vuonna 1842 kaivettu Mērsragsin kanava laski järven vedenpintaa noin '
      + 'puolellatoista metrillä ja puolitti sen pinta-alan. Siitä syntyi nykyinen '
      + 'tasaisen matala järvi: keskisyvyys on vain 0,4 metriä ja suurin syvyys 2,1 '
      + 'metriä. Kanava pitää yllä suoraa yhteyttä Riianlahteen ja tasaa sekä '
      + 'vedenkorkeutta että suolapitoisuutta.\n\n'
      + 'Vesi pysyy kirkkaana kasvien ansiosta: laajat näkinpartaislevät sitovat '
      + 'fosforia itseensä ja estävät leväkukinnat. Järvi on kansainvälisesti '
      + 'merkittävä vesilinnuille — siellä pesii yli 180 lajia, ja se on tärkeä '
      + 'levähdyspaikka muuttoreiteillä. Järvellä on myös lintututkijoiden kelluva '
      + 'tukikohta. Ensimmäinen suojelualue perustettiin tänne 1957, ja koko järvi '
      + 'ympäristöineen on kuulunut Enguren luontopuistoon vuodesta 1999.',
    lahde: 'en-Wikipedia "Lake Engure", johdanto-osa sekä osiot "Geography and '
      + 'hydrology", "Ecology" ja "Conservation and management" '
      + '(tarkistettu 2.9.2026).',
  },
];
