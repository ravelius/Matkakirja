/*
 * MAASTOKOHTEET — ISL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ISL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ISL.json. Työkalu laskee laudan
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
 * näiden karttanostojen osalta."* Islanti oli koko laudan tyhjin maa:
 * viisi merkkiä, joista kolme yllä olevaa maastokohdetta ja kaksi
 * skandaalia (docs/moduulit/karttanostot-kattavuus.md). Tavoite on
 * kahdeksan KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat.
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-isl.js:ssä.
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
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin (Þingvellir)
 * on 26,7 lautayksikön päässä Islanti-laatasta, eli reilusti yli
 * kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js). Yksikään ei siis kuulu kohdekartalle, vaan
 * kaikki ovat pääkartan merkkejä — omistajan sääntö kohdekaupunkien
 * nostoista ei koske näitä.
 *
 * KUVAT (20.9.2026). Vanhat kuvattomat kortit ovat saaneet kaksi Commons-kuvaa
 * (PD/CC, lisenssi ja tekijä Commonsin rajapinnasta), ämpärin osoite
 * karttanostot/20260920/.
 *
 * Islannin maastokohteet. Faktat en-Wikipediasta 29.8.2026. HUOM: Islanti on Euroopan laudan kaavan (lon -11...41) ULKOPUOLELLA, joten kohteet saavat vain maailmankartan rivin — sama sääntö kuin laudan omalla Islanti-pisteellä (js/packs/europe.js).
 */
export const MAASTOKOHTEET_ISL = [
  {
    id: 'hvannadalshnukur',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/isl-maasto-hvannadalshnukur-3fe097e5bd85.jpg',
      lyhyt: 'Hvannadalshnúkur ja Öræfajökullin jäätiköity vuorimassiivi.',
      selite: 'Hvannadalshnúkur on Islannin korkein huippu ja kohoaa Öræfajökullin jäätiköityneen tulivuoren kraatterireunalla.',
      lahde: 'Matkakirjan havainnekuva',
      tekija: 'OpenAI, Matkakirjan toimituksen ohjaama havainnekuva',
      lahdeUrl: 'https://adventures.is/iceland/day-tours/glacier-tours/glacier-tours-on-vatnajokull/glacier-wonders/',
      lisenssi: 'Matkakirjan oma havainnekuva',
    },
    nimi: 'Hvannadalshnúkur',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Öræfajökull on?',
      'Mitä ultraprominentti huippu tarkoittaa?',
    ],
    korostukset: ['Vatnajökull|Vatnajökullin'],
    nappi: 'Islannin korkein piste',
    // -16.6747 E / 64.0158 N — en-Wikipedia "Hvannadalshnjúkur"
    laudat: {
      maailmankartta: { x: 5277.5, y: 719 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Hvannadalshnúkur on pyramidin muotoinen huippu Öræfajökull-tulivuoren huippukraatterin '
      + 'luoteisreunalla Vatnajökullin kansallispuistossa. Se on Islannin korkein kohta ja maan '
      + 'ainoa ultraprominentti huippu — ainoa, joka kohoaa ympäristöstään yli puolentoista '
      + 'kilometrin verran. Huippu ei siis ole oma vuorensa vaan jäätikön peittämän tulivuoren '
      + 'reuna.',
    lahde: 'en-Wikipedia "Hvannadalshnjúkur", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'gronlanninmeri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-gronlanninmeri-c365f21d.jpg',
      lyhyt: 'Jäävuori nousee tummana aaltoilevasta merestä Grönlannin rannikon vuorten edessä.',
      selite: 'Valaistu jäävuori kelluu Grönlanninmerellä, ja taustalla häämöttävät Grönlannin rannikon vuoret. Kuva kertoo, millaista on merenkulku kylmillä pohjoisilla vesillä.',
      lahde: 'Valokuva: Jerzy Strzelecki, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Jerzy Strzelecki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Iceberg,_Greenland_Sea_(js)1.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-gronlanninmeri-4f6f6a11.jpg',
        lyhyt: 'Satelliittikuva Grönlannin itärannikosta ja Grönlanninmeren ajelehtivasta merijäästä.',
        selite: 'Avaruudesta otetussa kuvassa Grönlannin fjordien uurtama rannikko reunustaa merta, jota peittää ajelehtiva jää. Tumma avovesi ja jäälautat vaihtelevat kesän edetessä.',
        lahde: 'Kuva: NASA Goddard Space Flight Center, Wikimedia Commons (public domain).',
        tekija: 'NASA Goddard Space Flight Center',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sea_ice_in_the_Greenland_Sea_(20663788001).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Grönlanninmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuuluuko Grönlanninmeri Jäämereen vai Atlanttiin?',
      'Mikä Framinsalmi on?',
    ],
    korostukset: ['Framinsalmi|Framinsalmeen'],
    nappi: 'Meri, joka ei tiedä mihin kuuluu',
    // -18.5 E / 67 N — meren eteläreuna Islannin pohjoispuolella; artikkelin oma keskipiste on -8 / 76
    laudat: {
      maailmankartta: { x: 5216.7, y: 555.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Grönlanninmeri rajautuu lännessä Grönlantiin, idässä Huippuvuoriin, pohjoisessa '
      + 'Framinsalmeen ja Jäämereen sekä etelässä Norjanmereen ja Islantiin. Se määritellään '
      + 'joskus osaksi Jäämerta ja joskus osaksi Atlanttia — Jäämeren ja sen sivumerten rajat '
      + 'ovat epätarkkoja. Merentutkimuksessa se luetaan Norjanmeren kanssa Pohjoisiin meriin.',
    lahde: 'en-Wikipedia "Greenland Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'jorsa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-jorsa-e5473eaf.jpg',
      lyhyt: 'Leveä Þjórsá-joki virtaa hiekkasärkkien ja vihreiden rinteiden lomassa.',
      selite: 'Islannin pisin joki levittäytyy laajaksi jäätikkövetiseksi virraksi etelän tasangolla. Etualan ruohoinen rinne ja kaukana siintävät matalat vuoret rajaavat maiseman.',
      lahde: 'Valokuva: Christian Bickel, Wikimedia Commons (CC BY-SA 2.0 de).',
      tekija: 'Christian Bickel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Þjórsá.jpg',
      lisenssi: 'CC BY-SA 2.0 de',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/de/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-jorsa-043ff8b3.jpg',
        lyhyt: 'Urriðafoss-vesiputous kuohuu mustien laavakivien lomassa Þjórsá-joessa.',
        selite: 'Joen vesi virtaa turkoosina ja vaahtoisena tummien basalttikallioiden yli, ja rantatöyräillä on vielä lumilaikkuja. Urriðafoss on yksi Þjórsá-joen suurista koskista.',
        lahde: 'Kuva: Salvör Gissurardóttir, Wikimedia Commons (public domain).',
        tekija: 'Salvör Gissurardóttir',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Urriðafoss_í_Þjórsá.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Þjórsá',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Stöng on?',
      'Mikä oli þing?',
    ],
    korostukset: ['jäätikköjoki|jäätikköjoki'],
    nappi: 'Härkäjoki',
    // -20.813 E / 63.774 N — en-Wikipedia "Þjórsá" — joen suu Atlantilla
    laudat: {
      maailmankartta: { x: 5139.6, y: 731.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Þjórsá on Islannin pisin joki, 230 kilometriä, ja se virtaa saaren eteläosassa. Se on '
      + 'jäätikköjoki, joka saa alkunsa Hofsjökullilta, kulkee kapeiden rotkojen läpi Islannin '
      + 'ylängöillä ja levenee alangolla. Nimi tulee sanoista á, joki, ja þjór, härkä: '
      + 'Landnámabókin mukaan joki nimettiin erään ensimmäisistä uudisasukaslaivoista '
      + 'keulakuvan mukaan, joka esitti härkää.',
    lahde: 'en-Wikipedia "Þjórsá", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'thingvellir',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-thingvellir-9fba4f61.jpg',
      lyhyt: 'Maalaus kuvittelee keskiaikaisen Alþingin koolle Þingvellirin kalliorotkon juurella.',
      selite: 'Romantisoitu maalaus esittää lakikallion Lögbergin juurelle kokoontunutta väkeä, telttoja ja kiviseinämiä sekä kaukana siintävää vuoristoa. Alþing kokoontui Þingvelliriin vuodesta 930.',
      lahde: 'Maalaus: W. G. Collingwood, Wikimedia Commons (public domain).',
      tekija: 'W. G. Collingwood',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Althingi.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-thingvellir-00847105.jpg',
        lyhyt: 'Polku kulkee Þingvellirin kalliorotkon jyrkkien laavaseinämien välissä.',
        selite: 'Tummat basalttiseinämät kohoavat ruohoisen laakson molemmin puolin. Lögberg oli paikka, josta lakimies johti Alþingin istuntoa vuosina 930-1262.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Roca_de_la_Ley,_Parque_Nacional_de_Þingvellir,_Suðurland,_Islandia,_2014-08-16,_DD_019.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Þingvellir',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi sama nimi toistuu Skotlannissa ja Mansaarella?',
      'Miksi käräjät lopetettiin täällä?',
    ],
    korostukset: ['þing|þing', 'Alþing|Alþing'],
    nappi: 'Käräjätasanko kahden mantereen välissä',
    // -21.0373 E / 64.2538 N — en-Wikipedia "Þingvellir"
    laudat: {
      maailmankartta: { x: 5132.1, y: 706.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Þingvellir oli Alþingin paikka: Islannin vuosittainen käräjäkokous '
      + 'istui täällä vuodesta 930 aina viimeiseen Þingvellirin istuntoon 1798 '
      + 'asti. Vuodesta 1881 parlamentti on kokoontunut Reykjavíkissa '
      + 'Alþingishúsið-talossa.\n\n'
      + 'Nimi on muinaisnorjan Þingvǫllr, sanoista þing eli käräjät ja vǫllr '
      + 'eli kenttä — käräjäkentät. Sama juuri kuuluu kaukana Islannista: '
      + 'Dingwall ja Tingwall Skotlannissa, Thingwall Englannissa, Tynwald '
      + 'Mansaarella, Dinklage Saksassa ja Tingvoll Norjassa kantavat samaa '
      + 'nimeä ja samaa merkitystä.\n\n'
      + 'Paikka on myös geologinen: laakso on repeämälaakso Keski-Atlantin '
      + 'selänteen harjalla, Pohjois-Amerikan ja Euraasian mannerlaattojen '
      + 'rajalla. Etelässä on Þingvallavatn, Islannin suurin luonnonjärvi. '
      + 'Alue suojeltiin vuoden 1928 lailla ja siitä tuli 1930 Islannin '
      + 'ensimmäinen kansallispuisto — juuri tuhat vuotta käräjien '
      + 'perustamisen jälkeen. Maailmanperintökohde siitä tuli 2004.',
    lahde: 'en-Wikipedia "Þingvellir", johdanto-osa sekä osiot "Toponymy" ja '
      + '"History" (tarkistettu 2.9.2026).',
  },
  {
    id: 'reykholt',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-reykholt-d74a90b3.jpg',
      lyhyt: 'Kivetty pyöreä kuuma lähde Snorralaug ruohokummun juurella Reykholtissa.',
      selite: 'Snorrin allas on luonnon lämmittämä lähde, jonka reunat on kivetty. Lähteestä johtaa kivilouhikko ruohopeitteisen kummun sisään vievälle puuovelle. Taustalla häämöttää kylän kirkon torni.',
      lahde: 'Kuva: TommyBee, Wikimedia Commons (public domain).',
      tekija: 'TommyBee',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Snorralaug10.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-reykholt-1e725f52.jpg',
        lyhyt: 'Reykholtin kylän kirkko ja kulttuurikeskus kohoavat vihreän niityn takana.',
        selite: 'Kylän rakennukset sijaitsevat matalalla kummulla, ja oikealla reunalla erottuu vanha punakattoinen puukirkko. Reykholt on Länsi-Islannin kylä Reykjadalsá-joen laaksossa.',
        lahde: 'Valokuva: RG72, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'RG72',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vilaĝo_Reykholt_en_Okcidenta_Islando.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Reykholt',
    tyyppi: 'sana',
    kysymykset: [
      'Kuka Snorri Sturluson oli?',
      'Mikä tekee Deildartunguhverista poikkeuksellisen?',
    ],
    korostukset: ['Deildartunguhver|Deildartunguhverin'],
    nappi: 'Kylä, jossa pohjoinen mytologia kirjoitettiin muistiin',
    // -21.3 E / 64.6667 N — en-Wikipedia "Reykholt, Western Iceland"
    laudat: {
      maailmankartta: { x: 5123.3, y: 684.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Reykholt on kylä Reykjadalsá-joen laaksossa Länsi-Islannissa. Se oli '
      + 'aikanaan yksi saaren henkisistä keskuksista, ja siellä toimi vuosien ajan '
      + 'yksi maan tärkeimmistä kouluista.\n\n'
      + 'Keskiajalla Reykholtissa asui runoilija ja poliitikko Snorri Sturluson. '
      + 'Hänen muistiinpanonsa muinaisnorjan kielestä ja mytologiasta ovat '
      + 'korvaamattomia nykytutkijoille: ilman niitä pohjoinen jumaltarusto '
      + 'tunnettaisiin paljon huonommin. Hänen tilastaan on yhä jäljellä jäänteet '
      + 'ja kylpyallas kuumine altaineen sekä tunneli, joka johti kylvystä '
      + 'taloon.\n\n'
      + 'Kylässä on nykyään noin kuusikymmentä asukasta, koulukeskus ja kirjasto, '
      + 'joka on keskittynyt Snorrin teoksiin. Lähistöllä on Deildartunguhverin '
      + 'kuuma lähde, joka ohittaa kaikki muut maan lähteet kuuman veden '
      + 'tuotossaan: 180 litraa sekunnissa 97 asteisena.',
    lahde: 'en-Wikipedia "Reykholt, Western Iceland", johdanto-osa ja artikkelin '
      + 'runko-osa (tarkistettu 2.9.2026).',
  },
  {
    id: 'geysir',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-geysir-a5d84edc.jpg',
      lyhyt: 'Höyrypilvi nousee Suuresta Geysiristä Haukadalurin geotermisellä alueella.',
      selite: 'Kuumalähteen purkautuva höyry nousee punaruskean, kuumuuden värjäämän maan keskeltä. Ympärillä levittäytyy Lounais-Islannin laakson vihreä tasanko.',
      lahde: 'Valokuva: Chmee2/Valtameri, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Chmee2/Valtameri',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Great_Geysir_(2).jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-geysir-99bb03b1.jpg',
        lyhyt: 'Suuren Geysirin sinertävä allas on piisaostuman peittämän tasangon keskellä.',
        selite: 'Geysirin pyöreä altaan sinertävä vesi erottuu vaaleasta piisaostuman muodostamasta kalliotasangosta. Suuri Geysir on Lounais-Islannin kuumalähde, jonka nimestä englannin sana geyser on peräisin.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gran_Geysir,_Área_geotérmica_de_Geysir,_Suðurland,_Islandia,_2014-08-16,_DD_108.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Geysir',
    tyyppi: 'sana',
    kysymykset: [
      'Mistä sana geysir tulee?',
      'Mikä Strokkur on?',
    ],
    korostukset: ['geysa|geysa'],
    nappi: 'Lähde, joka antoi nimen kaikille muille',
    // -20.2995 E / 64.3137 N — en-Wikipedia "Geysir"
    laudat: {
      maailmankartta: { x: 5156.7, y: 703.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Geysir — joskus Suuri Geysir — on kuumalähde Lounais-Islannissa. '
      + 'Geologisten tutkimusten mukaan se alkoi muodostua noin vuonna 1150.\n\n'
      + 'Englannin sana geyser on peräisin juuri tästä lähteestä, ja nimi Geysir '
      + 'itse tulee islannin verbistä geysa. Yksi islantilainen lähde on siis '
      + 'antanut nimen koko ilmiölle kaikkialla maailmassa.\n\n'
      + 'Geysir sijaitsee Haukadalurin laaksossa Laugarfjall-laavakupolin '
      + 'rinteellä. Noin viidenkymmenen metrin päässä etelässä on Strokkur, '
      + 'toinen kuumalähde, johon Geysir usein sekoitetaan. Koko geotermistä '
      + 'kenttää kutsutaan tavallisesti joko Geysiriksi tai Haukadaluriksi.',
    lahde: 'en-Wikipedia "Geysir", johdanto-osa (tarkistettu 2.9.2026).',
  },
  {
    id: 'eiriksstadir',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-eiriksstadir-cc998c4e.jpg',
      lyhyt: 'Rakennettu turvetalo, jonka ovi ja kiviseinät on tehty nurmikimpuista.',
      selite: 'Eiríksstaðirin jäljennös on turvitalo, jonka seinät on muurattu turvelaatoista ja katto peitetty heinällä. Pieni puukehyksinen ovi avautuu sisään.',
      lahde: 'Valokuva: EinarrMan, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'EinarrMan',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eiríksstaðir_kanpotik.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-eiriksstadir-7ba53763.jpg',
        lyhyt: 'Ruohon peittämä turvetalo nousee vihreää rinnettä vasten Haukadalurin laaksossa.',
        selite: 'Jäljennetyn talon paksut nurmiseinät ja ruohokatto sulautuvat ympäröivään rinteeseen. Katon harjalla näkyy pieni puinen rakennelma.',
        lahde: 'Valokuva: Wolfgang Sauber, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Wolfgang Sauber',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eiríksstaðir_-_Gehöft_außen_3.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Eiríksstaðir',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Kuka syntyi todennäköisesti tällä tilalla?',
      'Miksi Eiríkr joutui lähtemään Haukadalurista?',
    ],
    korostukset: ['Landnámabók|Landnámabókin'],
    nappi: 'Turvemaja, josta lähdettiin Amerikkaan',
    // -21.5389 E / 65.0592 N — en-Wikipedia "Eiríksstaðir"
    laudat: {
      maailmankartta: { x: 5115.4, y: 663 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Eiríksstaðir on Eiríkr Þorvaldssonin — Punaisen Eirikin — entinen '
      + 'tila Haukadalurin laaksossa Dalasýslassa. Se on todennäköisesti hänen '
      + 'poikansa Leifr Eiríkssonin syntymäpaikka, ja Leifr on ensimmäinen tunnettu '
      + 'eurooppalainen, joka löysi Amerikan.\n\n'
      + 'Landnámabókin ja Punaisen Eirikin saagan mukaan Eiríkr asettui ensin '
      + 'Vestfirðiriin, nai Þjóðhildur Jǫrundardóttirin ja perusti tilan '
      + 'Vatnshornin lähelle Haukadaluriin. Sieltä hänen oli lähdettävä, kun hän '
      + 'oli tappanut kaksi miestä kostoksi omien orjiensa kuolemasta.\n\n'
      + 'Arkeologit ovat tutkineet paikkaa monta kertaa vuodesta 1894 alkaen, ja '
      + 'kaivauksissa on tunnistettu kahden rakennuksen jäänteet 800–900-luvuilta. '
      + 'Päärakennus oli pitkätalo, noin viisikymmentä neliömetriä ja neljätoista '
      + 'metriä pitkä, keskellä pitkä tulisija. Seinät olivat turvetta kiviperustan '
      + 'päällä, paksuudeltaan metrin verran. Lähistölle on rakennettu ulkoilmamuseo.',
    lahde: 'en-Wikipedia "Eiríksstaðir", johdanto-osa sekä osiot "Historical record" '
      + 'ja "Archaeological investigations" (tarkistettu 2.9.2026).',
  },
  {
    id: 'holar',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-holar-28aa8f86.jpg',
      lyhyt: 'Puupiirros esittää Hólarin vanhaa piispanistuinta jyrkkien vuorten ympäröimässä laaksossa.',
      selite: 'Vuoden 1870 painokuvassa Hólarin rakennukset seisovat laakson pohjalla, ja ympärillä kohoavat kaltevat, tasalakiset vuoret. Etualalla kulkee hevosia ja ihmisiä.',
      lahde: 'Kaiverrus: tekijä tuntematon, Wikimedia Commons (public domain).',
      tekija: 'tuntematon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Det_gamle_islandske_bispesæde_Hólum_i_Hjaltadal.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-holar-5058ba2f.jpg',
        lyhyt: 'Ruohokattoiset puuseinäiset talot seisovat nurmikentän laidalla Hólarissa.',
        selite: 'Hólarin turvitalot ovat tummaksi patinoituneita puuhuoneita, joiden päädyt on valkoisin reunuksin koristeltu ja katot peitetty heinällä. Taustalla häämöttävät Hjaltadalurin vuoret.',
        lahde: 'Valokuva: Villy Fink Isaksen, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Villy Fink Isaksen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Turf_house_-_Holar_3.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hólar',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Milloin Islannin ensimmäinen kirjapaino tuli Hólariin?',
      'Mikä Nýibær on?',
    ],
    korostukset: ['kirjapaino|kirjapaino'],
    nappi: 'Pohjoisen oppineisuuden keskus',
    // -19.1136 E / 65.7319 N — en-Wikipedia "Hólar"
    laudat: {
      maailmankartta: { x: 5196.2, y: 626.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Hólar on pieni yhteisö Hjaltadalurin laaksossa Skagafjörðurin alueella '
      + 'Pohjois-Islannissa, noin 379 kilometrin päässä Reykjavíkista. Asukkaita on '
      + 'satakunta. Paikalla ovat Hólarin korkeakoulun päärakennukset, katedraali, '
      + 'islanninhevosen historian keskus ja turvetalo Nýibær.\n\n'
      + 'Islannin ensimmäinen kirjapaino tuotiin Hólariin vuonna 1530. Hólar oli '
      + 'Pohjois-Islannin piispanistuin — Skálholt hoiti saman tehtävän etelässä — '
      + 'ja kulttuurin ja opetuksen keskus lähes seitsemän vuosisadan ajan, vuosina '
      + '1106–1798. Piispa Jón Ögmundsson perusti hiippakunnan 1106, ja siitä tuli '
      + 'pian toinen maan kahdesta oppineisuuden keskuksesta.\n\n'
      + 'Hólar oli myös katolisen kirkon viimeinen tukikohta Islannissa '
      + 'uskonpuhdistuksen aikana: sen viimeinen katolinen piispa Jón Arason '
      + 'mestattiin Skálholtissa 1550 kahden poikansa kanssa. Tunnetuin luterilainen '
      + 'piispa oli Guðbrandur Þorláksson. Nykyisen kirkon uskotaan valmistuneen '
      + 'vuonna 1763.',
    lahde: 'en-Wikipedia "Hólar", osiot "Location" ja "History" (tarkistettu 2.9.2026).',
  },
  {
    id: 'heimaey',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-heimaey-784440ac.jpg',
      lyhyt: 'Punaruskea Eldfell-tulivuori kohoaa Heimaeyn laavarannan takana.',
      selite: 'Eldfell syntyi Heimaeylle vuoden 1973 purkauksessa. Tumma laavakenttä ulottuu kupumaisen tulivuoren juurelta suoraan mereen.',
      lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Diego Delso',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Eldfell,_Heimaey,_Islas_Vestman,_Suðurland,_Islandia,_2014-08-17,_DD_065.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-heimaey-eb6ca570.jpg',
        lyhyt: 'Heimaeyn jyrkkä kalliorannikko kohoaa tummansinisestä merestä ruohopeitteisenä kielekkeenä.',
        selite: 'Kerrostuneet laavakalliot nousevat suoraan Atlantin aalloista, ja kallion päällä on ruohoa. Vestmannaeyjarin saaristoon kuuluvan Heimaeyn rannikkoa reunustavat meriluolat ja jyrkänteet.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Acantilados_de_Heimaey,_Islas_Vestman,_Suðurland,_Islandia,_2014-08-17,_DD_051.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Heimaey',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miten Heimaeyn satama pelastettiin?',
      'Miksi asukkaat pääsivät pois saarelta yhdessä yössä?',
    ],
    korostukset: ['Eldfell|Eldfell'],
    nappi: 'Satama, joka pelastettiin merivedellä',
    // -20.2667 E / 63.4333 N — en-Wikipedia "Heimaey"
    laudat: {
      maailmankartta: { x: 5157.8, y: 749.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Heimaey on Vestmannaeyjarin saariston suurin saari, 13,4 neliökilometriä, '
      + 'ja samalla Islannin rannikon suurin ja asutuin saari. Se on neljän meripeninkulman '
      + 'päässä etelärannikolta ja saariston ainoa asuttu saari.\n\n'
      + 'Tammikuussa 1973 laavavirta viereisestä Eldfellistä tuhosi puolet kaupungista ja '
      + 'uhkasi sulkea sataman — saaren tärkeimmän tulonlähteen. Etenevä laava jäähdytettiin '
      + 'merivedellä, ja operaatio pelasti sataman.\n\n'
      + 'Purkaus alkoi 23. tammikuuta 1973 kello yksi yöllä. Maa alkoi täristä, halkeamat '
      + 'kasvoivat 1 600 metrin pituisiksi ja laava alkoi purkautua. Kaupungin päälle satoi '
      + 'puoli miljoonaa kuutiometriä tuhkaa. Saman yön aikana saaren 5 000 asukasta '
      + 'evakuoitiin, useimmat kalastusveneillä.',
    lahde: 'en-Wikipedia "Heimaey", johdanto-osa ja osio "Eldfell" (tarkistettu 2.9.2026).',
  },
  {
    id: 'latrabjarg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-latrabjarg-5994e527.jpg',
      lyhyt: 'Látrabjargin jyrkänne kohoaa suoraan Atlantin aaltoihin.',
      selite: 'Kerroksellinen basalttijyrkänne on täynnä lintujen jättämiä valkoisia jälkiä. Kallion reunalla erottuu majakan valkoinen rakennus.',
      lahde: 'Valokuva: Richard Bartz, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Richard Bartz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Látrabjarg_Vestfirðir_Iceland.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-latrabjarg-ee9b4691.jpg',
        lyhyt: 'Lunni levittää siipiään Látrabjargin kallion reunalla.',
        selite: 'Merilintu istuu jäkälän peittämällä kalliolla, ja sen värikäs nokka ja oranssit jalat erottuvat selvästi. Látrabjargin jyrkänteillä pesii suuria lunnien ja muiden merilintujen yhdyskuntia.',
        lahde: 'Valokuva: Boaworm, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Boaworm',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Puffin_Latrabjarg_Iceland.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Látrabjarg',
    tyyppi: 'elain',
    kysymykset: [
      'Kuinka suuri osa maailman ruokeista pesii täällä?',
      'Mikä on Islannin läntisin kohta?',
    ],
    korostukset: ['ruokki|ruokeista'],
    nappi: 'Euroopan suurin lintujyrkänne',
    // -24.5 E / 65.5 N — en-Wikipedia "Látrabjarg"
    laudat: {
      maailmankartta: { x: 5016.7, y: 639 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Látrabjarg on niemeke Länsivuonoilla ja Islannin läntisin kohta. '
      + 'Jyrkänne on Euroopan suurin lintujyrkänne: neljätoista kilometriä pitkä ja '
      + 'korkeimmillaan 440 metriä.\n\n'
      + 'Kalliolla pesii miljoonia lintuja — lunneja, suulia, kiisloja ja ruokkeja. '
      + 'Paikka on lajien selviytymiselle elintärkeä: jopa neljäkymmentä prosenttia '
      + 'maailman ruokeista pesii täällä.',
    lahde: 'en-Wikipedia "Látrabjarg", johdanto-osa (tarkistettu 2.9.2026).',
  },
  {
    id: 'lakagigar',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-lakagigar-e31e63b7.jpg',
      lyhyt: 'Sammalen peittämä kraatterijono Lakin halkeaman keskiosassa.',
      selite: 'Mustat laavakivet ja vihreä sammal täyttävät Lakagígarin vuoden 1783 purkauksessa syntyneen halkeaman. Taustalla kohoaa kraatterikartioita ja laakea ylänkö.',
      lahde: 'Valokuva: Chmee2/Valtameri, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Chmee2/Valtameri',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Laki_fissure_(2).jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-lakagigar-4addd411.jpg',
        lyhyt: 'Lakagígarin kraatterijono avautuu ylhäältä katsottuna laajaksi laavakentäksi.',
        selite: 'Korkealta kuvattu näkymä Laki-vuoren länsipuoleisiin kraatterijonoihin, joiden rinteillä kasvaa keltaista sammalta. Kraatterit ovat pitkän halkeaman varrella.',
        lahde: 'Valokuva: Areuland, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Areuland',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Laki_Krater.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Lakagígar',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka suuri osa islantilaisista kuoli purkauksen jälkeen?',
      'Miksi purkaus vaikutti satoihin Euroopassa asti?',
    ],
    korostukset: ['Skaftáreldar|Skaftáreldar'],
    nappi: 'Kahdeksan kuukautta, jotka muuttivat ilmaston',
    // -18.2261 E / 64.0647 N — en-Wikipedia "Laki"
    laudat: {
      maailmankartta: { x: 5225.8, y: 716.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Lakagígar on tulivuoren halkeama Vatnajökullin kansallispuiston '
      + 'länsiosassa, lähellä Kirkjubæjarklausturin kylää. Laki on se vuori, jonka '
      + 'halkeama halkaisee kahtia; itse halkeamaa kutsutaan Lakagígariksi. Se kuuluu '
      + 'Grímsvötn-tulivuoren järjestelmään.\n\n'
      + 'Järjestelmä purkautui rajusti kahdeksan kuukauden ajan kesäkuusta 1783 '
      + 'helmikuuhun 1784. Purkaus — Skaftáreldar eli Skaftán tulet — työnsi ulos noin '
      + '14 kuutiokilometriä basalttilaavaa sekä pilviä myrkyllistä fluorivetyhappoa ja '
      + 'rikkidioksidiyhdisteitä. Ne saastuttivat maaperän, tappoivat yli puolet '
      + 'Islannin karjasta ja tuhosivat lähes koko sadon. Seurannut nälänhätä tappoi '
      + 'ainakin viidesosan saaren väestöstä.\n\n'
      + 'Vaikutus ei jäänyt Islantiin. Purkaus syöksi pohjoiselle pallonpuoliskolle 120 '
      + 'miljoonaa tonnia rikkidioksidia, mikä laski maapallon lämpötiloja, aiheutti '
      + 'satojen menetyksiä Euroopassa ja on saattanut aiheuttaa kuivuutta '
      + 'Pohjois-Afrikassa ja Intiassa.',
    lahde: 'en-Wikipedia "Laki", johdanto-osa ja osio "1783 eruption" (tarkistettu 2.9.2026).',
  },
  /* ================================================================
   * NOSTOERÄ 11.9.2026 — KUUSI KOHDETTA LISÄÄ.
   *
   * Omistaja 11.9.2026: *"Suomesta puuttuu lisäksi myös nostoja …
   * Agentit voisivat tarkastaa myös muut Euroopan maat että kaikissa
   * tarpeeksi nostoja."* Päätoimittajan tavoite on 20 pääkartan nostoa
   * per Euroopan maa; Islanti oli kolmessatoista.
   *
   * ISLANNISSA ON YKSI PELIKAUPUNKI (laudan "Islanti"). Lähin uusi
   * merkki on Skálholt 43 lautayksikön päässä siitä, joten yksikään
   * näistä ei jää kaupunkikaton alle (js/fokuskohteet.js) — kaikki
   * kuusi ovat pääkartan merkkejä.
   *
   * MÝVATN ON TYYPPIÄ 'meri' EIKÄ 'jarvi' — perustelu on kirjattu
   * js/packs/maastokohteet-gha.js:n Voltajärvi-kortissa.
   *
   * Kuvat lisätty 20.9.2026. Faktat en-Wikipediasta kohde kerrallaan 11.9.2026.
   * ============================================================== */
  {
    id: 'snaefellsjokull',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-snaefellsjokull-4f4ec46f.jpg',
      lyhyt: 'Jäätikön peittämä Snæfellsjökull kohoaa kesäisen tasangon ylle.',
      selite: 'Lumen ja jään peittämä tulivuori näkyy kaukaa Snæfellsnesin niemimaalla. Etualalla on tummaa laavamaastoa ja lähempi tumma vuori.',
      lahde: 'Valokuva: Anjali Kiggal, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Anjali Kiggal',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Snæfellsjökull_Mountain.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-snaefellsjokull-3c61b6bd.jpg',
        lyhyt: 'Snæfellsjökullin jäätikkö ja huippukärjet hehkuvat iltaruskossa.',
        selite: 'Jäätikkö peittää tulivuoren laen, ja sen läpi työntyy esiin tummia kallionhuippuja. Jään pinnalla näkyy railoja.',
        lahde: 'Kuva: Juhászlegeny, Wikimedia Commons (public domain).',
        tekija: 'Juhászlegeny',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Snæfellsjökull_iceland.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Snæfellsjökull',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä romaani teki vuoresta kuuluisan?',
      'Mitä huipun jäälle on tapahtunut?',
    ],
    korostukset: ['Jules Verne|Jules Vernen'],
    nappi: 'Portti maan keskipisteeseen',
    // −23.776 E / 64.808 N — en-Wikipedia "Snæfellsjökull"
    laudat: {
      maailmankartta: { x: 5040.8, y: 676.6 },
    },
    teksti: 'Snæfellsjökull on 700 000 vuotta vanha kerrostulivuori Länsi-Islannissa, '
      + 'Snæfellsnesin niemen läntisimmässä kärjessä, ja sen huippua peittää jäätikkö. '
      + 'Selkeällä säällä se näkyy Reykjavíkiin Faxaflóin yli 120 kilometrin päähän. Vuori on '
      + 'Islannin tunnetuimpia paikkoja ennen kaikkea yhdestä syystä: Jules Vernen romaanissa '
      + 'Matka maan keskipisteeseen (1864) juuri sen kraatterista alkaa käytävä maapallon '
      + 'sisuksiin. Kirja oli isoisäsi matkan aikaan yhdeksän vuotta vanha ja luettiin '
      + 'kaikkialla. Vuoren kylkiä peittää joukko kuonakekoja, ja viimeisin purkaus huipun '
      + 'kraatterista ajoitetaan noin vuoteen 200 jaa. Vuonna 1939 kapteeni Robert Bartlett '
      + 'näki vuoren arktisen kangastuksen ansiosta yli viidensadan kilometrin päästä. '
      + 'Jäätikkö on kutistunut: pinta-ala oli 16 neliökilometriä 1946, 14 vuonna 1999 ja '
      + '10–11 vuonna 2008, ja elokuussa 2012 huippu oli mittaushistorian ensimmäistä kertaa '
      + 'jäätön.',
    lahde: 'en-Wikipedia "Snæfellsjökull", johdanto-osa ja osio "Geology" (tarkistettu '
      + '11.9.2026).',
  },
  {
    id: 'dettifoss',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-dettifoss-9ee0b174.jpg',
      lyhyt: 'Dettifoss syöksyy laajana vesiseinänä basalttikanjoniin.',
      selite: 'Jökulsá á Fjöllum -joen ruskeansamea vesi putoaa leveänä muurina kalliokielekkeen yli. Ympärillä on paljasta laavakivikkoa, ja putouksen reunalla häämöttää pieniä kävijöitä.',
      lahde: 'Valokuva: Jakub Hałun, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Jakub Hałun',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dettifoss_waterfall,_Iceland,_20240716_1506_1568.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-dettifoss-c89490d0.jpg',
        lyhyt: 'Dettifossin ruskea vesimassa syöksyy ryöppyävänä seinänä kuilun reunan yli.',
        selite: 'Lähikuva Euroopan voimakkaimpiin kuuluvan putouksen kuohuavasta reunasta, jossa vesi kuohuu ja sumu nousee kanjonin yllä. Taustalla näkyy jyrkkä kallioseinämä.',
        lahde: 'Valokuva: Roger McLassus, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Roger McLassus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Iceland_Dettifoss_1972.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Dettifoss',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi putouksen vesi on harmaata?',
      'Mitä nimi Dettifoss tarkoittaa?',
    ],
    korostukset: ['Jökulsárgljúfur|Jökulsárgljúfur-rotkoon'],
    nappi: 'Rotkoon syöksyvä jäätikköjoki',
    // −16.3844 E / 65.8144 N — en-Wikipedia "Dettifoss"
    laudat: {
      maailmankartta: { x: 5287.2, y: 621.8 },
    },
    teksti: 'Dettifoss putoaa Koillis-Islannissa Jökulsá á Fjöllum -joessa, joka tulee '
      + 'Vatnajökullin jäätiköltä ja kerää vetensä laajalta alueelta. Putous on sata metriä '
      + 'leveä ja pudottaa veden 44 metriä alas Jökulsárgljúfur-rotkoon. Virtaamaltaan se on '
      + 'Islannin toiseksi suurin putous Urriðafossin jälkeen, keskimäärin 193 kuutiometriä '
      + 'sekunnissa, ja kun virtaama kerrotaan pudotuskorkeudella, sitä on pidetty Euroopan '
      + 'toiseksi väkevimpänä putouksena heti Reininputousten jälkeen. Vesi ei ole kirkasta '
      + 'vaan harmaanvalkoista: jäätikköjoki kuljettaa mukanaan hienoa kiviainesta. Nimi on '
      + 'suora kuvaus siitä, mitä siinä tapahtuu — islannin detta tarkoittaa putoamista tai '
      + 'romahtamista ja foss putousta. Säveltäjä Jón Leifs teki putouksesta oman '
      + 'orkesteriteoksensa.',
    lahde: 'en-Wikipedia "Dettifoss", johdanto-osa ja osio "In media" (tarkistettu 11.9.2026).',
  },
  {
    id: 'myvatn',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-myvatn-2654bb7e.jpg',
      lyhyt: 'Mývatnin rannalla kohoaa ruohoisia kraatterisaarekkeita.',
      selite: 'Järven pinnasta nousee pieniä ruohon peittämiä kraatterikukkuloita, joita kutsutaan valekraattereiksi. Etualalla kellertää kuivunutta ruohoa, ja kaukana häämöttää vuoria.',
      lahde: 'Valokuva: Bernello, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Bernello',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Iceland_Lake_Mývatn_Myvatn.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-myvatn-3cd06650.jpg',
        lyhyt: 'Mývatn levittäytyy saarien ja kapeiden niemien ympärille.',
        selite: 'Vindbelgjarfjallin rinteeltä avautuu näkymä matalalle järvelle, jonka pinnasta kohoaa lukuisia pieniä saaria ja niemiä. Taustalla erottuvat pilvien alla tasaiset vuoret.',
        lahde: 'Valokuva: Arian Zwegers, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Arian Zwegers',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mývatn_(6802982523).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Mývatn',
    tyyppi: 'meri',
    kysymykset: [
      'Mistä järvi on saanut nimensä?',
      'Miksi sorsia on juuri täällä niin paljon?',
    ],
    korostukset: ['valekraatteri|valekraattereita'],
    nappi: 'Sääskien järvi ja sen sorsat',
    // −17.0 E / 65.6 N — järven keskiosa; en-Wikipedia "Mývatn"
    laudat: {
      maailmankartta: { x: 5266.7, y: 633.6 },
    },
    teksti: 'Mývatn on matala järvi Pohjois-Islannissa lähellä Kraflan tulivuorta. Nimi '
      + 'tarkoittaa sanatarkasti sääskijärveä, ja se on rehellinen: kesällä ilma on täynnä '
      + 'surviaissääskiä. Juuri ne selittävät kaiken muunkin. Järveen purkautuu '
      + 'ravinteikasta lähdevettä, hyönteisiä ja vesikirppuja on valtavasti, ja siksi järvi ja '
      + 'sen ympärysuot elättävät enemmän sorsalajeja kuin mikään muu paikka Euroopassa: '
      + 'pesiviä lajeja on viisitoista, ja pelkkiä tukkasotkia on kuusituhatta paria. Järvi '
      + 'syntyi noin 2 300 vuotta sitten suuresta basalttisesta laavapurkauksesta, ja maisema '
      + 'on sen mukainen — laavapatsaita ja valekraattereita, jotka syntyivät laavan valuessa '
      + 'kosteikon päälle. Keskisyvyys on vain 2,5 metriä. Laskujoki Laxá tunnetaan taimenesta '
      + 'ja lohesta, ja joki, järvi ja suot on rauhoitettu 4 400 neliökilometrin '
      + 'suojelualueeksi.',
    lahde: 'en-Wikipedia "Mývatn", johdanto-osa sekä osiot "Geography" ja "Birds" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'vatnajokull',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-vatnajokull-f646af31.jpg',
      lyhyt: 'Jäävuoren kappaleita kelluu jäätikkölaguunissa Vatnajökullin edustalla.',
      selite: 'Jökulsárlónin vedessä ajelehtii sinertäviä ja valkoisia jäälohkareita, ja taustalla hohtaa Vatnajökullin laskujäätikkö Breiðamerkurjökull. Kaukana horisontissa näkyy vuorenhuippuja.',
      lahde: 'Valokuva: DCheretovich, Wikimedia Commons (CC0).',
      tekija: 'DCheretovich',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vatnajökull_glacier.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-vatnajokull-7d894edf.jpg',
        lyhyt: 'Halkeileva Vatnajökullin laskujäätikkö valuu kahden vuoren välistä alas tasangolle.',
        selite: 'Jäätikön pinta on railojen ja jäämuurien rikkoma, ja sen yläosa levittäytyy laajana jäämassana korkeammalle. Tummat vuorenrinteet reunustavat jäävirtaa.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Island_Vatnajökull_02.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Vatnajökull',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka paksua jää on?',
      'Mikä jäätikkötulva on?',
    ],
    korostukset: ['jäätikkötulva|jäätikkötulvina'],
    nappi: 'Jäätikkö, jonka alla palaa tuli',
    // −16.8 E / 64.4 N — jäätikön keskiosa; en-Wikipedia "Vatnajökull"
    laudat: {
      maailmankartta: { x: 5273.3, y: 698.5 },
    },
    teksti: 'Vatnajökull peittää noin kahdeksan prosenttia koko Islannista. Pinta-alaa on '
      + '7 700 neliökilometriä ja tilavuutta noin 3 000 kuutiokilometriä, mikä tekee siitä '
      + 'Euroopan suurimman jäätikön tilavuudeltaan — pinta-alaltaan sitä suurempi on vain '
      + 'Novaja Zemljan Severnyin jääkenttä. Jää on keskimäärin 380 metriä paksua ja '
      + 'paksuimmillaan 950. Islannin korkein huippu Hvannadalshnjúkur on sen eteläreunassa. '
      + 'Jäätikön erikoisuus on se, mitä sen alla on: se makaa kahden mannerlaatan saumalla, ja '
      + 'sen luoteisosan alla on vaipan kuumapisteen keskus. Jään alla purkautuvat tulivuoret '
      + 'sulattavat jäähän vesitaskuja, jotka lopulta murtavat heikentyneen jään ja syöksyvät '
      + 'ulos jäätikkötulvina. Vuoden 1934 tulvassa vettä purkautui 15 kuutiokilometriä '
      + 'muutamassa päivässä. Vanha islantilainen nimi jäätikölle oli Klofajökull.',
    lahde: 'en-Wikipedia "Vatnajökull", johdanto-osa sekä osiot "Size", "Volcanoes" ja '
      + '"In culture" (tarkistettu 11.9.2026).',
  },
  {
    id: 'grimsey',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-grimsey-7e2a5e94.jpg',
      lyhyt: 'Jyrkkä basalttijyrkänne nousee mereltä Grímseyn saarella.',
      selite: 'Tummat pylväsmäiset kalliot kohoavat aaltojen yllä, ja niiden lomassa istuu ja lentelee lintuja. Kallion päällä levittäytyy vihreä ruohotasanne, jonka yli napapiiri kulkee.',
      lahde: 'Valokuva: MosheA, Wikimedia Commons (CC BY-SA 2.5).',
      tekija: 'MosheA',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grímsey_Iceland.JPG',
      lisenssi: 'CC BY-SA 2.5',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-grimsey-5f868e68.jpg',
        lyhyt: 'Orbis et Globus -pallo merkitsee napapiiriä Grímseyn saarella.',
        selite: 'Harmaa kivipallo on asetettu ruohikkoiselle rinteelle meren äärelle. Teos vihittiin käyttöön syksyllä 2017, ja sitä siirretään saaren pohjoispäässä napapiirin liikkeen mukana.',
        lahde: 'Valokuva: Andrii Gladii, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Andrii Gladii',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Orbis_et_Globus,_the_Arctic_Circle_on_Grímey_island,_Iceland,_general_view.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Grímsey',
    tyyppi: 'saari',
    kysymykset: [
      'Miksi napapiirin merkki pitää siirtää?',
      'Kuinka moni saarella asuu?',
    ],
    korostukset: ['napapiiri|napapiiri'],
    nappi: 'Saari napapiirin päällä',
    // −18.0142 E / 66.5442 N — en-Wikipedia "Grímsey"
    laudat: {
      maailmankartta: { x: 5232.9, y: 581.4 },
    },
    teksti: 'Grímsey on pieni saari neljänkymmenen kilometrin päässä Islannin pohjoisrannikolta, '
      + 'ja sen yli kulkee napapiiri. Se on Islannin pohjoisin asuttu paikka: ainoa kylä on '
      + 'Sandvík, ja asukkaita oli vuonna 2021 viisikymmentäseitsemän. Pinta-alaa on 5,3 '
      + 'neliökilometriä ja korkeinta kohtaa 105 metriä, ja rannat ovat jyrkkiä kallioseiniä '
      + 'lounaisrantaa lukuun ottamatta — juuri siksi saarelle tullaan katsomaan lunneja ja '
      + 'muita merilintuja. Napapiiri ei pysy paikallaan: Maan akselin pitkäaikainen heilahtelu '
      + 'siirtää sitä pohjoiseen noin 14,5 metriä vuodessa. Saarelle on pystytetty pysyvät '
      + 'merkit napapiirin paikoista vuosina 1717, 1817 ja 1917, ja vuonna 2017 sen kohdalle '
      + 'asetettiin kahdeksan tonnin kivipallo, jota siirretään sitä mukaa kuin viiva liikkuu. '
      + 'Napapiiri on kulkenut Grímseyn yli vuodesta 1750, ja noin vuonna 2047 se ohittaa saaren '
      + 'pohjoispuolelta.',
    lahde: 'en-Wikipedia "Grímsey", johdanto-osa sekä osiot "Geography" ja "Arctic Circle" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'skalholt',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-skalholt-d1e2aebe.jpg',
      lyhyt: 'Skálholtin kirkko ja sen rakennukset seisovat avaralla Etelä-Islannin tasangolla.',
      selite: 'Valkoinen kirkko torneineen ja sen ympärillä matalampia rakennuksia kohoavat ruohoisen aukean keskellä. Taustalla erottuu vesialue.',
      lahde: 'Valokuva: Gerd Eichmann, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Gerd Eichmann',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skalholt-04-1980-gje.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/isl-nosto-skalholt-78b78bd1.jpg',
        lyhyt: 'Skálholtin valkoinen kirkko ja ruohokattoinen Þorláksbúð.',
        selite: 'Torninen kirkko kohoaa harmaan taivaan alla, ja sen vieressä on turvekattoinen, ruohon peittämä rakennus. Maisema on tasaista viheraluetta.',
        lahde: 'Valokuva: VillageHero from Ulm, Germany, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'VillageHero from Ulm, Germany',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skálholt_(14602929087).jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Skálholt',
    tyyppi: 'historia',
    kysymykset: [
      'Milloin Skálholtiin tuli piispanistuin?',
      'Kuka teloitettiin täällä vuonna 1550?',
    ],
    korostukset: ['Jón Arason|Jón Arason'],
    nappi: 'Piispanistuin, jossa teloitettiin piispa',
    // −20.527 E / 64.128 N — en-Wikipedia "Skálholt"
    laudat: {
      maailmankartta: { x: 5149.1, y: 713.1 },
    },
    teksti: 'Skálholt Hvítá-joen varrella Etelä-Islannissa oli kahdeksan vuosisadan ajan yksi '
      + 'saaren tärkeimmistä paikoista. Piispanistuin perustettiin siihen vuonna 1056, ja '
      + 'vuoteen 1785 asti se oli Hólarin ohella Islannin toinen hiippakuntakeskus — siis '
      + 'kulttuurin ja politiikan keskus yhtä lailla kuin kirkon. Samana vuonna 1056 sinne '
      + 'perustettiin maan ensimmäinen virallinen koulu, Skálholtsskóli, kouluttamaan pappeja. '
      + 'Keskiajalla paikka oli kokonainen kylä: piispantalo, katedraali, koulu, laaja '
      + 'maanviljelys, paja ja katolisen ajan luostari sekä asuntolat opettajille ja väelle. '
      + 'Adam Bremeniläinen kuvasi sitä noin vuonna 1075 Islannin "suurimmaksi kaupungiksi". '
      + 'Katolisen ajan loppu piirtyi tänne: vuonna 1550 viimeinen katolinen piispa Jón Arason '
      + 'teloitettiin Skálholtissa kahden poikansa kanssa, ja samana vuonna hävitettiin myös '
      + 'pyhän Þorlákurin reliikkiarkku.',
    lahde: 'en-Wikipedia "Skálholt", osio "History" (tarkistettu 11.9.2026).',
  },
];
