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
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti
 * kantaa tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto
 * olisi huonompi kuin kuvaton kortti (Perustuslaki, faktakuri).
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 2.9.2026.
 *
 * Islannin maastokohteet. Faktat en-Wikipediasta 29.8.2026. HUOM: Islanti on Euroopan laudan kaavan (lon -11...41) ULKOPUOLELLA, joten kohteet saavat vain maailmankartan rivin — sama sääntö kuin laudan omalla Islanti-pisteellä (js/packs/europe.js).
 */
export const MAASTOKOHTEET_ISL = [
  {
    id: 'hvannadalshnukur',
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
];
