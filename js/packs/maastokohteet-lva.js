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
 * KUVAT LISÄTTY 20.9.2026 (ent. kuvaton erä): kortti kantaa nyt kaksi tarkistettua
 * Commons-kuvaa.
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 2.9.2026.
 *
 * Latvian maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 */
export const MAASTOKOHTEET_LVA = [
  {
    id: 'gaizinkalns',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-gaizinkalns-d635b014.jpg',
      lyhyt: 'Talvinen näkymä Gaiziņkalnsin rinteeltä yli Vidzemen metsien.',
      selite: 'Lumen peittämä rinne laskee kohti metsäistä ylänköä. Huurteiset puut reunustavat maisemaa selkeän talvitaivaan alla.',
      lahde: 'Valokuva: Sirujs Enobs, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Sirujs Enobs',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gaizi%C5%86kalns_-_panoramio_-_Sirujs_Enobs.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-gaizinkalns-c3e1cdd6.jpg',
        lyhyt: 'Gaiziņkalnsin kukkula ja metsät ilmasta nähtynä.',
        selite: 'Ilmakuvassa kukkulan laella kulkee avoin rinne, jota ympäröi havu- ja lehtimetsä. Rinteen alla erottuu pieni rakennus.',
        lahde: 'Valokuva: BirdsEyeLV, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'BirdsEyeLV',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gaizi%C5%86kalns-aeropanorama_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-itameri-c109878d.jpg',
      lyhyt: 'Itämeren hiekkaranta ja rantaheinää Latvian ja Liettuan rajan tienoilla.',
      selite: 'Pitkä vaalea hiekkaranta kaartuu kohti horisonttia, ja aallot vyöryvät rannalle. Oikealla kasvaa kuivunutta rantaheinää.',
      lahde: 'Valokuva: Algirts, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Algirts',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Baltic_sea_coast_near_LV-LT_border_-_panoramio.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-itameri-25d26bff.jpg',
        lyhyt: 'Auringon kimmeltämät Itämeren aallot ja hiekkaranta uhkaavan pilvitaivaan alla.',
        selite: 'Vaahtopäinen aalto vyöryy matalalle hiekkarannalle. Taustalla kasvaa rannan mäntymetsää.',
        lahde: 'Valokuva: Laima Gūtmane (simka…, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Laima Gūtmane (simka…',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Liepaja,_silver_waves_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-vainajoki-600febc5.jpg',
      lyhyt: 'Väinäjoen rantaa ja kalkkikivipaljastuma Latviassa.',
      selite: 'Jyrkän törmän kylkeen paljastuu vaaleaa kalliota, ja joen sininen vesi leviää oikealla. Paljaat puut kasvavat rannan nurmella.',
      lahde: 'Valokuva: Ainars Brūvelis, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ainars Brūvelis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Daugava_river_near_Dole_Island_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-vainajoki-5c6aa6f2.jpg',
        lyhyt: 'Väinäjoen leveä ja tyyni vesi Ikšķilen kohdalla.',
        selite: 'Joki leviää laajaksi vesialueeksi, jonka rannalla kasvaa koivuja ja ruohoa. Etualalla on pieni laituri.',
        lahde: 'Valokuva: Kikos, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kikos',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Daugava_iepret%C4%AB_Ik%C5%A1%C4%B7ilei.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-rundale-4d331246.jpg',
      lyhyt: 'Rundālen palatsin keltainen barokkijulkisivu ja portaikko.',
      selite: 'Palatsin julkisivua koristavat pilasterit ja koristeelliset ikkunankehykset. Sisäänkäynnin edessä on kaareva kivikaide ja pihamaa.',
      lahde: 'Valokuva: Zhagatasligzda, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zhagatasligzda',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rund%C4%81les_pils_no_d%C4%81rza_puses.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-rundale-78296cb7.jpg',
        lyhyt: 'Rundālen palatsin juhlasali, jossa on rokokoo-koristeet ja veistokset.',
        selite: 'Vaaleaseinäisessä salissa on koristeellinen katto, kristallikruunuja, marmoripatsaita ja kullattu lipasto.',
        lahde: 'Valokuva: Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Pudelek (Marcin Szala)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rund%C4%81le_Palace_-_the_Marble_Hall.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-cesis-0686991c.jpg',
      lyhyt: 'Cēsisin keskiaikaisen linnan rauniot syksyisessä puistossa.',
      selite: 'Kivilinnan pyöreä torni ja hataraksi jääneet muurit kohoavat ruohokentän takana. Kaksi suurta puuta värjää maiseman syksyn väreillä.',
      lahde: 'Valokuva: AgrisR, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'AgrisR',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:C%C4%93sis_Castle_frontside_in_2014.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-cesis-57cced62.jpg',
        lyhyt: 'Cēsisin linnan länsitorni ja Pyhän Johanneksen kirkon torni.',
        selite: 'Kiviseinäinen linnantorni kohoaa puiden lomasta iltavalossa. Taustalla erottuu kirkon terävä huippu.',
        lahde: 'Valokuva: AgrisR, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'AgrisR',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:C%C4%93sis_Castle_west_tower_and_St._John%27s_church_in_the_background.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-turaidan-ruusu-e43cda37.jpg',
      lyhyt: 'Turaidan linnan punatiiliset tornit ja polku linnanmäellä.',
      selite: 'Pyöreät tiilitornit kohoavat vihreiden pensaiden takaa. Hiekkapolku johtaa kohti linnan portteja.',
      lahde: 'Valokuva: Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Pudelek (Marcin Szala)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Turaida_Castle.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-turaidan-ruusu-ed967a6c.jpg',
        lyhyt: 'Turaidan linnan päätorni nousee metsän yläpuolelle.',
        selite: 'Punatiilinen linnan torni ja jyrkkä katto erottuvat vihreästä metsästä Gauja-joen laaksossa.',
        lahde: 'Valokuva: Fawksik, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Fawksik',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Turaida_castle_from_the_opposite_side.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-liepaja-b151cb8e.jpg',
      lyhyt: 'Liepājan rannalla peilipintaiset kirjaimet muodostavat kaupungin nimen.',
      selite: 'Suuret metallikirjaimet seisovat hiekalla ja heijastavat auringonvaloa. Taustalla näkyy Itämeri ja pieni joukko rannalla kulkijoita.',
      lahde: 'Valokuva: Werner100359, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Werner100359',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Liepaja_beach.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-liepaja-ee57fca1.jpg',
        lyhyt: 'Liepājan Pyhän Kolminaisuuden kirkko kirkkaan taivaan alla.',
        selite: 'Barokkityylisen kirkon korkea kellotorni kohoaa katukuvan yläpuolelle. Vaalean kiven pinta on aikojen saatossa tummunut.',
        lahde: 'Valokuva: Chmee2, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Chmee2',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Liep%C4%81ja_-_church_(1).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-sabile-a552b713.jpg',
      lyhyt: 'Sabilen viinimäen rinteellä kasvaa viiniköynnöksiä kaupungin yläpuolella.',
      selite: 'Viinipuut kasvavat riveissä tukikeppien varassa rinteellä. Alhaalla laaksossa erottuu Sabilen kylä punakattoisine taloineen.',
      lahde: 'Valokuva: BirdsEyeLV, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'BirdsEyeLV',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sabiles_v%C4%ABna_kalns_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-sabile-6945eb9e.jpg',
        lyhyt: 'Näkymä Sabilen kaupunkiin ja sen kattoihin viinimäeltä.',
        selite: 'Vihreiden puiden ympäröimä pikkukaupunki levittäytyy kukkulan rinteelle. Etualalla erottuu valkoinen rakennus, jossa on koristeellinen päätykoriste.',
        lahde: 'Valokuva: Rimantas Lazdynas, Wikimedia Commons (public domain).',
        tekija: 'Rimantas Lazdynas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:SabilenoVinakalna.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-jelgava-4c77523d.jpg',
      lyhyt: 'Jelgavan palatsi kohoaa Lielupe-joen tyynen veden rannalla.',
      selite: 'Pitkä punavalkoinen barokkipalatsi seisoo joen vasemmalla rannalla. Vesi heijastaa palatsia sinisen taivaan alla.',
      lahde: 'Valokuva: Yakikaki, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Yakikaki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jelgava_Palace_viewed_from_the_Lielupe_riverside.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-jelgava-bfcadbea.jpg',
        lyhyt: 'Jelgavan palatsin punatiilinen julkisivu koristeellisine ikkunoineen.',
        selite: 'Palatsin pitkää siipeä koristavat vaaleat ikkunankehykset ja pilasterit. Edessä on ruohokenttä ja kävelytie.',
        lahde: 'Valokuva: Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Pudelek (Marcin Szala)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Jelgava_Castle_(Schloss_Mitau).JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-daugavpilsin-linnoitus-78d97a57.jpg',
      lyhyt: 'Puinen silta ja vallihauta Daugavpilsin linnoituksella.',
      selite: 'Silta johtaa punatiilirakennelmalle, jonka vieressä ruohoinen vallihauta ja puurivi kaartuvat. Taivas on kesäisen kirkas.',
      lahde: 'Valokuva: Scotch Mist, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Scotch Mist',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Daugavpils_Fortress_04.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-daugavpilsin-linnoitus-610a116b.jpg',
        lyhyt: 'Daugavpilsin linnoituksen Nikolauksen portti tiilestä ja graniitista.',
        selite: 'Portin holvattua kaarta ja sivuikkunoita kehystävät harmaat graniittilohkareet. Portin päällä kohoaa nurmipeitteinen valli.',
        lahde: 'Valokuva: Scotch Mist, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Scotch Mist',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Daugavpils_Fortress_05.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-engure-fcc682c3.jpg',
      lyhyt: 'Enguren järven ruovikot ja pienet veneet kesäpäivänä.',
      selite: 'Matalan järven rannalla kasvaa ruovikkoa, ja kapean vesiuoman varrella lepää vihreitä veneitä. Kaukana näkyy vastarannan metsä.',
      lahde: 'Valokuva: Uldis Osis, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Uldis Osis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Engures_ezers_(Lake_Engure)_-_Uldis_Osis_-_Panoramio.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-engure-5751f2e2.jpg',
        lyhyt: 'Karjaa laiduntamassa Enguren järven rantaniityllä.',
        selite: 'Nurmella lepää ruskea sarvikarja, ja toinen eläin laiduntaa etäämpänä. Taustalla häämöttää vesialue ja ruovikko.',
        lahde: 'Valokuva: Evita wiki, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Evita wiki',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Engures_ezera_dabas_parks3.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
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
  /* ================================================================
   * K2-ERÄ 3, 11.9.2026 — NELJÄ KOHDETTA LISÄÄ. Omistaja 11.9.2026:
   * *"Agentit voisivat tarkastaa myös muut Euroopan maat että
   * kaikissa tarpeeksi nostoja."* Tavoite on vähintään 20 pääkartan
   * nostoa per Euroopan maa; Latvia oli 16:ssa.
   *
   * Riika on jätetty rauhaan kuten K2-erässäkin: lähin uusi kohde on
   * Ventas rumba 73 lautayksikön päässä, joten kaikki neljä ovat
   * pääkartan merkkejä. Kuvat lisätty 20.9.2026 (ent. kuvaton erä); faktat en-Wikipediasta kohde
   * kerrallaan 11.9.2026.
   * ============================================================== */
  {
    id: 'ventas-rumba',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ventas-rumba-d5d2802d.jpg',
      lyhyt: 'Ventas rumba Kuldīgassa ulottuu leveänä koskena joen poikki.',
      selite: 'Matala vesiputous jatkuu suoraa linjaa pitkin Venta-jokea. Rannalla on puita ja pieni rakennus.',
      lahde: 'Valokuva: Christopher Voitus, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Christopher Voitus',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kuldiga-Venta_Rumba.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-ventas-rumba-efd84bdd.jpg',
        lyhyt: 'Venta-joki ja Ventas rumba iltahämärässä ylhäältä nähtynä.',
        selite: 'Joen vesi kohisee kivien yli, ja pitkä rumba erottuu taustalla. Rannat ovat vehreiden puiden ja ruohikon peitossa.',
        lahde: 'Valokuva: Андрей Романенко, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Андрей Романенко',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Venta_Rapid,_view_from_Pils_Hill.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ventas rumba',
    tyyppi: 'ruoka',
    kysymykset: [
      'Miksi putous perääntyy hitaasti ylävirtaan?',
      'Miten lohia pyydettiin ilmasta?',
    ],
    korostukset: ['dolomiitti|dolomiitti'],
    nappi: 'Euroopan levein vesiputous',
    // 21.9722 E / 56.9689 N — Kuldīga; en-Wikipedia "Venta Rapid"
    laudat: {
      maailmankartta: { x: 6565.7, y: 1073.3 },
    },
    teksti: 'Ventas rumba on Venta-joen vesiputous Kuldīgassa Länsi-Latviassa ja '
      + 'Euroopan levein: 249 metriä, kevättulvien aikaan jopa 275. Korkeutta '
      + 'sillä on veden korkeudesta riippuen vain 1,8–2,2 metriä. Putouksen '
      + 'tekee devonikautinen dolomiitti, jonka alempi kerros rapautuu '
      + 'nopeammin kuin ylempi: ylempi jää roikkumaan, kunnes lohkeaa jokeen. '
      + 'Siksi putous perääntyy hitaasti ylävirtaan, ja koska virta on '
      + 'keskellä voimakkain, keskikohta vetäytyy reunoja nopeammin.\n\n'
      + 'Kaupunki syntyi juuri tähän, koska putous katkaisi keskiaikaisen '
      + 'Ventan sisävesireitin. Kuurinmaan herttua Jacob Kettler yritti '
      + '1600-luvun puolivälissä kaivattaa ohitusuoman oikealle rannalle, '
      + 'mutta dolomiitti oli liian kovaa ja työ liian hidasta. Legendan mukaan '
      + 'herttua käski sitten räjäyttää putouksen: ensimmäinen räjäytys vain '
      + 'irrotti suuria lohkareita ja siirsi reunaviivaa, ja kun paine halkoi '
      + 'läheisen palatsin seiniä, hanke jäi siihen.\n\n'
      + 'Noin vuonna 1640 Kettler keksi toisenlaisen ratkaisun: hän tilasi sata '
      + 'suurta pajukoria ja hakkautti kallioon kalapatoja. Kutuaikaan lohet ja '
      + 'sammet yrittivät hypätä putouksen yli, ja epäonnistuneet huuhtoutuivat '
      + 'virran mukana koreihin. Myöhemmin kalastajat vuokrasivat putouksesta '
      + 'muutaman metrin, asettivat korinsa ja odottivat; tavallinen saalis oli '
      + '80–100 kalaa ja hyvä lisä vuosituloihin. Kuldīgaa alettiin kutsua '
      + 'kaupungiksi, jossa lohia voi pyydystää ilmasta.\n\n'
      + 'Lohet ja sammet katosivat joesta aikoja sitten; viimeinen sampi saatiin '
      + '1892. Nykyään pyydetään lähinnä vimpaa, ja kutuaikaan kalastus on '
      + 'kielletty.',
    lahde: 'en-Wikipedia "Venta Rapid", johdanto-osa sekä osiot "Geology", '
      + '"History" ja "Fishing" (tarkistettu 11.9.2026).',
  },
  {
    id: 'kolkan-niemi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-kolkan-niemi-de394d88.jpg',
      lyhyt: 'Kuivunut puu Kolkan niemen hiekkarannalla ja Itämeri taustalla.',
      selite: 'Puunrunko on kuivunut valkeaksi rantadyynin päällä. Pilvet kasautuvat taivaalle, ja aallot vyöryvät kapealle hiekkarannalle.',
      lahde: 'Valokuva: Italas, Wikimedia Commons (public domain).',
      tekija: 'Italas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Baltijos_j%C5%ABra_Kolkos_rage.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-kolkan-niemi-79fd5eb4.jpg',
        lyhyt: 'Sumuinen hiekkaranta ja mäntyjä Kolkan niemellä.',
        selite: 'Sumu peittää maiseman, ja hiekkadyyni kohoaa rannalla. Vasemmalla kasvaa mäntyjä.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kolka_Kolkarags_10.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kolkan niemi',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Mikä salmi erottaa niemen Virosta?',
      'Miksi dyynit ovat säilyneet niin luonnontilaisina?',
    ],
    korostukset: ['Irbensalmi|Irbensalmi'],
    nappi: 'Kuurinmaan kärki Riianlahden suulla',
    // 22.5947 E / 57.7539 N — en-Wikipedia "Cape Kolka"
    laudat: {
      maailmankartta: { x: 6586.5, y: 1035.7 },
    },
    teksti: 'Kolkan niemi, latviaksi Kolkasrags ja liiviksi Kūolka nanā, on '
      + 'Kuurinmaan niemimaan kärki Itämeren rannalla Riianlahden suulla. Sitä '
      + 'ympäröi Irbensalmi, joka on luonnollinen raja Viroon; itäpuolella '
      + 'keskellä lahtea on virolainen Ruhnun saari. Niemi on Riianlahden '
      + 'luoteisin piste. Lähellä ovat Kolkan majakka ja Kolkan kylä, ja rantaa '
      + 'myöten jatkuu jono vanhoja liiviläiskyliä — Vaide, Saunags, Pitrags, '
      + 'Košrags ja Sīkrags — jotka kuuluvat suojeltuun Liivinrannan '
      + 'alueeseen.\n\n'
      + 'Niemi on osa Slīteren kansallispuistoa. Rantaa reunustaa metsäisten '
      + 'dyynien vyöhyke, jolla mänty kasvaa karulla ja vettä pidättämättömällä '
      + 'hiekalla. Tuuli siirtää hiekkaa jatkuvasti, ja kovissa myrskyissä '
      + 'puiden runkoja on hautautunut yli 60 senttimetrin syvyyteen. Suuret '
      + 'hautautumisjaksot 1967–1969 ja tammikuussa 2005 näkyvät puiden '
      + 'vuosilustoissa kapeina tai kokonaan puuttuvina renkaina, kunnes kasvu '
      + 'on palautunut ennalleen.\n\n'
      + 'Dyynimaisema on harjuja ja niiden välisiä painanteita, noin 4–10 '
      + 'metriä merenpinnan yläpuolella. Neuvostoaikana alue oli suljettua '
      + 'rajavyöhykettä, ja vähäinen ihmistoiminta on säilyttänyt dyynit '
      + 'poikkeuksellisen luonnontilaisina.\n\n'
      + 'Kolka on myös yli 700 kilometriä pitkän rannikkovirran päätepiste. '
      + 'Kaliningradin rannoilta Pärnunlahdelle ulottuva kuljetus tuo niemelle '
      + 'vuosittain 700 000–800 000 kuutiometriä hiekkaa, josta noin 90 '
      + 'prosenttia kasautuu heti niemen pohjoispuolelle ja vain noin 50 000 '
      + 'kuutiometriä jatkaa Riianlahdelle.',
    lahde: 'en-Wikipedia "Cape Kolka", johdanto-osa ja osio "Coastal dune '
      + 'ecology" (tarkistettu 11.9.2026).',
  },
  {
    id: 'aglona',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-aglona-3a13dcf1.jpg',
      lyhyt: 'Aglonan valkoinen kaksitorninen basilika ja rukouskappeli.',
      selite: 'Basilikan kaksi tornia kohoavat sinistä pilvitaivasta vasten. Vasemmalla on pieni pyöreä kappeli ja oikealla luostarirakennus.',
      lahde: 'Valokuva: Dainis Matisons uploaded and derivative work: MrPanyGoff, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Dainis Matisons uploaded and derivative work: MrPanyGoff',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aglona_Basilica.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-aglona-236a6093.jpg',
        lyhyt: 'Aglonan basilika iltavalossa.',
        selite: 'Valkoiset tornit hehkuvat laskevan auringon valossa. Etualalla on nurmikenttä ja valaisinpylväs.',
        lahde: 'Valokuva: Chmee2, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Chmee2',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aglona_Basilica(2).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Aglonan basilika',
    nimio: 'Aglona',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka perusti kirkon ja luostarin?',
      'Miksi elokuun 15. päivä on Aglonassa erityinen?',
    ],
    korostukset: ['pyhiinvaeltaja|pyhiinvaeltajaa'],
    nappi: 'Latgalen pyhiinvaelluskirkko kahden järven välissä',
    // 27.0086 E / 56.1306 N — en-Wikipedia "Aglona"
    laudat: {
      maailmankartta: { x: 6733.6, y: 1113.0 },
    },
    teksti: 'Aglona on kylä Latgalessa, neljäkymmentä kilometriä Daugavpilsista '
      + 'koilliseen. Se seisoo kapealla kannaksella Cirišs- ja Egles-järvien '
      + 'välissä, ja nykyinen kylä on syntynyt kolmen asutuksen — Aglonan, '
      + 'Somersetan ja Jaunciemsin — yhdistyessä. Lähistöllä ovat Uhrisaari, '
      + 'Pirunjärvi ja Madelanun linnavuori.\n\n'
      + 'Dominikaanit perustivat kirkon ja luostarin vuonna 1700. Alkuperäinen '
      + 'puinen kirkko ja luostari purettiin 1760-luvulla, uuden rakentaminen '
      + 'alkoi 1768, ja kirkko vihittiin 1800. Taivaaseenottamisen basilika on '
      + 'Latvian tärkein katolinen kirkko.\n\n'
      + 'Neitsyt Marian taivaaseenottamisen päivänä 15. elokuuta ja helluntaina '
      + 'paikalle saapuu kymmeniätuhansia ihmisiä. Aglonan Jumalanäidin ikonia '
      + 'on kauan pidetty ihmeitätekevänä; se on 1600-luvulta, eikä sen tekijää '
      + 'tunneta.\n\n'
      + 'Vuonna 1980 kirkko täytti kaksisataa vuotta, ja paavi Johannes Paavali '
      + 'II antoi sille basilica minor -arvon. Vuonna 1986 siellä vietettiin '
      + 'Latvian kristinuskon 800-vuotisjuhlaa. Basilikaa ja sen ympäristöä '
      + 'kunnostettiin vuodesta 1992 alkaen paavin vierailua varten: Johannes '
      + 'Paavali II kävi Aglonassa syyskuussa 1993, ja paikalle kokoontui yli '
      + '300 000 pyhiinvaeltajaa. Paavi Franciscus vieraili siellä syyskuussa '
      + '2018.',
    lahde: 'en-Wikipedia "Aglona", johdanto-osa ja osio "History" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'gluckin-raamattumuseo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-gluckin-raamattumuseo-57f2f9e4.jpg',
      lyhyt: 'Alūksnen raamattumuseon vihreäkattoinen rakennus nurmikon reunassa.',
      selite: 'Vihreä kupariperäinen katto peittää pienen museorakennuksen. Nurmikon halki kulkee kivetty polku ja taustalla kasvaa vanha puu.',
      lahde: 'Valokuva: Martins Smits, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Martins Smits',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bible_museum_in_Al%C5%ABksne_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/lva-nosto-gluckin-raamattumuseo-43753b37.jpg',
        lyhyt: 'Alūksnen raamattumuseon vihreäkattoinen paviljonki lähempää.',
        selite: 'Rakennuksessa on pyöreitä ikkunoita, vihreä ovi ja ikkunaluukut. Sen edessä on penkkejä ja kukkaistutuksia.',
        lahde: 'Valokuva: WikedKentaur, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'WikedKentaur',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bible_Museum_in_Aluksne.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Glückin raamattumuseo',
    nimio: 'Alūksne',
    tyyppi: 'sana',
    kysymykset: [
      'Milloin Raamattu käännettiin ensi kerran latviaksi?',
      'Kuka oli Glückin kasvattitytär?',
    ],
    korostukset: ['Marienburg|Marienburgissa'],
    nappi: 'Talo, jossa latvia sai Raamattunsa',
    // 27.0428 E / 57.4211 N — Alūksne, entinen Marienburg;
    // en-Wikipedia "Ernst Glück"
    laudat: {
      maailmankartta: { x: 6734.8, y: 1051.7 },
    },
    teksti: 'Johann Ernst Glück (1654–1705) oli saksalainen kääntäjä ja '
      + 'luterilainen teologi, joka työskenteli Liivinmaalla nykyisen Latvian '
      + 'alueella. Hän syntyi Wettinissä pappisperheeseen, kävi Altenburgin '
      + 'latinakoulun ja opiskeli Wittenbergissä ja Jenassa teologiaa, '
      + 'retoriikkaa, filosofiaa, geometriaa, historiaa, maantiedettä ja '
      + 'latinaa.\n\n'
      + 'Glück käänsi ensimmäisenä Raamatun latviaksi ja sai työn valmiiksi '
      + 'vuonna 1694. Käännös tehtiin kokonaisuudessaan Marienburgissa, joka on '
      + 'nykyinen Alūksne, ja samassa rakennuksessa toimii nyt Ernst Glückin '
      + 'raamattumuseo. Vuonna 1683 hän perusti Liivinmaan ensimmäiset '
      + 'latviankieliset koulut.\n\n'
      + 'Glückillä oli neljä tytärtä ja poika, Ernst Gottlieb Glück, sekä '
      + 'kasvattitytär Marta Skowrońska. Marta meni naimisiin Pietari Suuren '
      + 'kanssa, ja hänet tunnetaan Katariina I:nä: vuosina 1725–1727 hän oli '
      + 'Venäjän keisarinna. Glück itse kuoli Moskovassa.',
    lahde: 'en-Wikipedia "Ernst Glück", johdanto-osa sekä osiot "Early life and '
      + 'career" ja "Personal life" (tarkistettu 11.9.2026).',
  },
];
