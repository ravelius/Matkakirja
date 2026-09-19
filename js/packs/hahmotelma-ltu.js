/*
 * LIETTUAN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Tanskan, Ruotsin,
 * Suomen, Romanian, Slovenian ja Viron jälkeen Liettua.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48 ja 51) =
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä muut EU-maiden pakat, viimeisimpänä Viro
 * (js/packs/hahmotelma-est.js): jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä en-Wikipedian (tarvittaessa lt-Wikipedian
 * lisälähteenä, kun en-artikkeli on tynkä) artikkelista omin sanoin suomeksi
 * (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli ja
 * tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi ja
 * lähdesivu kirjattuna, jokaisen kuvan tiedot luettu Commonsin
 * extmetadata-rajapinnasta; kuvatekstit ilman lähdeviittauksia lukijalle).
 * PAATOKSET 51: noin joka kolmannella nostolla on lisäksi `visa`-kenttä
 * (kysymys, neljä vaihtoehtoa, oikea indeksi, fakta) täsmälleen kuten
 * kaupunkien täkynostoilla (js/fokusnosto.js nostonVisa): vastaus löytyy
 * noston omasta tekstistä. Vuonna 1873 Liettua kuuluu Venäjän keisarikuntaan
 * (Vilnan, Kaunasin ja Suwałkin kuvernementit; Preussin Liettua Klaipėdan
 * seutuineen kuuluu Preussiin), liettuankielinen latinalainen kirjapaino on
 * kielletty ja kirjoja salakuljetetaan rajan yli. Myöhemmät kohteet ovat
 * mukana: teksti on nykytietoa ja `nappi` katsoo vuodesta 1873 eteenpäin tai
 * sanoo rehellisesti, että kohde tulee vasta myöhemmin.
 *
 * MIKSI NÄMÄ KOHTEET: Liettuan pakissa (js/packs/maastokohteet-ltu.js) on jo
 * Aukštojas, Itämeri, Nemunas, Trakain saarilinna, Kernavė, Ristien kukkula,
 * Kuurinkynnäs, Palangan meripihkamuseo, Rumšiškės, Grūtasin puisto,
 * Yhdeksäs fortti, Klaipėda, Puntukas ja Aukštaitijan puisto sekä Vilnan
 * kaupunkinostot. Tämän pakin kohteet eivät toista niitä (ei samoja id:itä
 * eikä nimiä) eivätkä ole niiden vieressä (lähin nosto yli 8 lautayksikön
 * päässä olemassa olevista).
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on pienempi),
 * nimeltään `ltu-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on kirjattu
 * pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`. Kuvia EI
 * ole viety ämpäriin eikä committoitu repoon (Fable vie); siihen asti
 * osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan sarjasta.
 * Tiedostot ovat kansiossa /Users/samireivinen/Matkakirja-nostot-kuvat/ltu/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * kaupungin (Vilna, maan ainoa pelikaupunki) ulkopuolella, lähin nosto yli 8
 * lautayksikön päässä kaupungista (raja KAUPUNGIN_KOHDALLA_SADE on 7), ja
 * js/fokuskohteet.js liittää rivit KOHDE_MAAT.LTU:iin. `lahi: true` on sama
 * lähizoomiportti kuin Ranskan hahmotelmalla (js/pallolauta/nostot.js
 * PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 20.9.2026) ja artikkelin nimi on
 * kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla kaavalla
 * (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu maan fokuslehden rajaukseen
 * (`osuuLehteen`).
 */

/** Liettuan hahmotelmanostot: sisällölliset kohteet kaupungin (Vilna) ulkopuolella. */
export const HAHMOTELMA_LTU = [
  {
    id: 'hahmotelma-kedainiai',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-kedainiai-52740a01.jpg',
      lyhyt: 'Pyhän Yrjön kirkko kohoaa rinteen päällä Kėdainiaissa.',
      selite: 'Punatiilinen kirkko seisoo kumpareella puutalojen yläpuolella, ja etualan tyyni '
        + 'vesi heijastaa rakennuksia. Pyhän Yrjön kirkko on kaupungin keskeinen '
        + 'maamerkki.',
      lahde: 'Valokuva: Laima Gūtmane (simka), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Laima Gūtmane (simka)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_St._George_in_K%C4%97dainiai,_Lithuania_in_2011.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-kedainiai-ad8530c4.jpg',
        lyhyt: 'Kėdainiain vanhan kaupungin tori vanhoine taloineen.',
        selite: 'Kivetyn torin laidalla on eriväristä, pienimittakaavaista rakennuskantaa ja '
          + 'vaalea kaksitorninen kirkko. Torin ympärillä on kaupungin historiallisia '
          + 'kauppiastaloja.',
        lahde: 'Valokuva: Michał Derela, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Michał Derela',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:K%C4%97dainiai_130522240_(cropped).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-kedainiai-951998ca.jpg',
        lyhyt: '1800-luvun piirros Kėdainiaista: silta, kirkko ja asuintaloja.',
        selite: 'Mustavalkoisessa piirroksessa kivipilarien varassa oleva silta johtaa joen '
          + 'yli kaupungin rakennusten luo, ja vasemmalla kohoaa kirkko. Piirroksen on '
          + 'tehnyt Napoleon Orda 1800-luvulla.',
        lahde: 'Valokuva: Napoleon Orda, Wikimedia Commons (Public domain).',
        tekija: 'Napoleon Orda',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:K%C4%97dainiai_in_19th_c.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Kėdainiai',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi skotlantilaisia protestantteja muutti Liettuan pikkukaupunkiin 1500- ja 1600-luvuilla?',
      'Miksi Radziwiłł-suvun linnassa allekirjoitettiin vuonna 1655 sopimus Ruotsin kanssa?',
    ],
    korostukset: ['Radziwiłł|Radziwiłł', 'skotlantilaiset|skotlantilaisia'],
    nappi: 'Radziwiłlien vanha kaupunki, jonka torin laidalla seisovat skotlantilaisten '
      + 'kauppiaiden talot',
    // 23.9667 E / 55.2833 N — en-Wikipedia "Kėdainiai"
    laudat: {
      maailmankartta: { x: 6632.2, y: 1152.6 },
      europe: { x: 671.4, y: 439.6 },
    },
    teksti: 'Kėdainiai on kaupunki Nevėžis-joen rannalla noin 45 kilometriä Kaunasista '
      + 'pohjoiseen. Se mainitaan ensimmäisen kerran vuonna 1372 Liivinmaan kronikassa ja '
      + 'sai kaupungin aseman vuonna 1590. Vuonna 1655 Radziwiłł-suvun kaksi jäsentä '
      + 'allekirjoitti kaupungin linnassa lyhytaikaisen sopimuksen Ruotsin kanssa; '
      + 'linnasta on jäljellä vähän, mutta kalvinistisen kirkon kryptaan on haudattu suvun '
      + 'jäseniä. Kaupunkiin muutti 1500- ja 1600-luvuilla skotlantilaisia protestantteja, '
      + 'joiden vaikutus säilyi 1800-luvun puoliväliin asti. Heidän kauppiastalonsa, niin '
      + 'sanotut skotlantilaiset talot, ympäröivät yhä toria, ja 1600-luvulta periytyvä '
      + 'vanha kaupunki on säilynyt hyvin.',
    lahde: 'en-Wikipedia "Kėdainiai", johdanto-osa ja osiot "History" ja "Culture" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä maan protestantteja muutti Kėdainiaihin 1500- ja 1600-luvuilla?',
      vaihtoehdot: [
        'Hollannin',
        'Tanskan',
        'Skotlannin',
        'Sveitsin',
      ],
      oikea: 2,
      fakta: 'Kaupungin vanhan tavan mukaan jokaisen vierailijan piti tuoda mukanaan kivi '
        + 'kaupungin rakennustöihin. Nykyään Kėdainiai tunnetaan Liettuan '
        + 'kurkkupääkaupunkina ja pitää vuosittain kurkkujuhlan.',
    },
  },
  {
    id: 'hahmotelma-birzai',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-birzai-4062b5b9.jpg',
      lyhyt: 'Biržain linnakartanon valkoinen päärakennus punaisine kattoineen.',
      selite: 'Kunnostetun linnakartanon valkoisen rakennuksen edessä on avoin kaarikäytävä ja '
        + 'ympärillä mäntyjä ja nurmikkoa. Vanha linna tuhoutui vuonna 1704 ja '
        + 'kunnostettiin vasta 1990-luvulla.',
      lahde: 'Valokuva: Dosmi, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Dosmi',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:BirzaiCastle2018.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-birzai-e3c2d046.jpg',
        lyhyt: 'Širvėna-järven rantamaisema Biržain linnan alueelta katsottuna.',
        selite: 'Kuva on otettu linnan alueelta, ja edessä kohoaa nurmikkoinen kumpu. Tyyni '
          + 'Širvėna leviää taustalla; se syntyi padon rakentamisesta vuonna 1575 ja on '
          + 'Liettuan vanhin säilynyt tekojärvi.',
        lahde: 'Valokuva: Ymblanter, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Ymblanter',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%A0irv%C4%97na_from_Bir%C5%BEai_Castle_grounds.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-birzai-cf9114f3.jpg',
        lyhyt: 'Karvės ola -romahdusaukon nurmikkoinen rinne puuportaineen.',
        selite: 'Karvės ola on karstinen romahdusaukko Biržain alueellisessa puistossa. Kuvan '
          + 'alareunassa näkyy puisia portaita, ja rinteen vaalea kivi työntyy esiin '
          + 'ruohon seasta.',
        lahde: 'Valokuva: Qwarc at Lithuanian Wikipedia, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Qwarc at Lithuanian Wikipedia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Karves_ola.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Biržai',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Biržaihin padottiin ihmisten tekemä järvi jo 1500-luvun lopulla?',
      'Miksi Biržain seudulle on syntynyt tuhansia äkillisiä romahdusaukkoja maahan?',
    ],
    korostukset: ['Širvėna|Širvėna', 'Karvės ola|Karvės ola'],
    nappi: 'Vanha linna on ollut raunioina vuodesta 1704; järven toisella puolella on '
      + 'valmistunut Astravasin kartano',
    // 24.75 E / 56.2 N — en-Wikipedia "Biržai"
    laudat: {
      maailmankartta: { x: 6658.3, y: 1109.7 },
      europe: { x: 686.4, y: 415.5 },
    },
    teksti: 'Biržai on pohjoisliettualainen kaupunki, joka tunnetaan uudelleenrakennetusta '
      + 'linnakartanostaan ja monista perinteisiä reseptejä noudattavista panimoista. '
      + 'Linnan rakentaminen alkoi vuonna 1586, ja sitä varten Agluona- ja Apaščia-jokien '
      + 'yhtymäkohtaan oli padottu jo 1575 Širvėna-järvi, Liettuan vanhin säilynyt '
      + 'tekojärvi. Linna oli tärkeä puolustuspaikka Ruotsin sotien aikana, tuhoutui '
      + 'useaan kertaan ja jäi raunioiksi vuodesta 1704 aina 1990-luvun kunnostukseen '
      + 'asti. Kaupunki liittyy vahvasti Radziwiłł-sukuun, ja siitä tuli Liettuan '
      + 'protestanttisen uskonpuhdistuksen kulttuurikeskus. Kaupungin pohjoisosassa on '
      + 'alueellinen luonnonpuisto, jossa on noin 9 000 karstiaukkoa; yksi niistä, 20 '
      + 'metriä syvä Karvės ola eli Lehmänluola, löytyi legendan mukaan, kun lehmä katosi '
      + 'maan alle.',
    lahde: 'en-Wikipedia "Biržai", johdanto-osa ja osiot "History" ja "Geography" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-telsiai',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-telsiai-35c86053.jpg',
      lyhyt: 'Telšiain tuomiokirkon valkoinen julkisivu ja koristeellinen portti.',
      selite: 'Valkoisen tuomiokirkon tornissa on tumma huippu, ja kirkkopihan portin '
        + 'syvennyksissä on patsaita. Telšiain hiippakunta perustettiin vuonna 1926, ja '
        + 'sen keskus on Telšiaissa.',
      lahde: 'Valokuva: MichalPL, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'MichalPL',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tel%C5%A1iai_Cathedral,_April_2019.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-telsiai-0a6a5b6d.jpg',
        lyhyt: 'Žemaitian kylämuseon puurakennuksia lammen rannalla Telšiaissa.',
        selite: 'Nurmikon takana lammen rannalla on perinteisiä maalaisrakennuksia, joilla on '
          + 'laajat harmaat katot. Telšiain ulkoilmamuseossa on kuusitoista aitoa '
          + '1800-luvun žemaitialaista rakennusta.',
        lahde: 'Valokuva: Obivan Kenobi, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Obivan Kenobi',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%BDemaitijos_kaimo_muziejus.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-telsiai-8014f6da.jpg',
        lyhyt: 'Mastis-järven hiekkaranta ja kävelytie kaupungin laidalla.',
        selite: 'Harmaan taivaan alla levittäytyy laaja järvi, jonka rannalla kulkee kivetty '
          + 'kävelytie ja jossa on vielä lumenkasoja. Telšiai on rakennettu Mastis-järven '
          + 'rannalle.',
        lahde: 'Valokuva: Homo ergaster, Wikimedia Commons (CC0).',
        tekija: 'Homo ergaster',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mas%C4%8Dio_e%C5%BEeras.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
    ],
    nimi: 'Telšiai',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mistä sanasta Telšiain nimi johtuu, ja mitä se kertoo kaupungin sijainnista?',
      'Miksi karhusta tuli Žemaitian tunnussymboli, ja millaisia karhuja Telšiaista löytyy?',
    ],
    korostukset: ['Džiugas|Džiugas', 'karhu|Karhu'],
    nappi: 'Juuri tänä vuonna Telšiai siirretään Kovnon (Kaunasin) kuvernementtiin',
    // 22.25 E / 55.9833 N — en-Wikipedia "Telšiai"
    laudat: {
      maailmankartta: { x: 6575, y: 1119.9 },
      europe: { x: 638.4, y: 421.2 },
    },
    teksti: 'Telšiai on Žemaitian alueen pääkaupunki, ja se on rakennettu seitsemän kukkulan '
      + 'päälle Mastis-järven rannalle. Kaupunki on saanut nimensä järveen laskevalta '
      + 'Telšė-purolta, ja nimi liittyy veteen. Ensimmäiset maininnat ovat vuodelta 1398, '
      + 'ja legendan mukaan kaupungin perusti ritari Džiugas. Vuoteen 1795 asti alue '
      + 'kuului Žemaitian ruhtinaskuntana Liettuan suuriruhtinaskuntaan, ja vuonna 1873 '
      + 'Telšiai siirrettiin Kovnon kuvernementtiin. Alka-museossa on yli 62 000 esinettä, '
      + 'ja ulkoilmamuseossa on kuusitoista aitoa 1800-luvun žemaitialaista '
      + 'talonpoikaistilan rakennusta. Karhu on Žemaitian vanha tunnuseläin, ja '
      + 'kaupungissa on 47 karhuveistosta.',
    lahde: 'en-Wikipedia "Telšiai", johdanto-osa ja osiot "Names", "History", "Culture" ja '
      + '"Tourism" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-plunge',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-plunge-78952da4.jpg',
      lyhyt: 'Ogińskien palatsin julkisivu ja hiekkatie Plungėssa.',
      selite: 'Harmaanvalkoisen palatsin edessä kulkee hiekkatie kukkapenkkien välissä. '
        + 'Ogińskien suku rakennutti palatsin vuonna 1879, ja kartanon alueella toimii '
        + 'Žemaitian taidemuseo.',
      lahde: 'Valokuva: Zidikai1, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zidikai1',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Plung%C4%97_manor_2018_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-plunge-7965de8a.jpg',
        lyhyt: 'Perkūnas-tammi syksyn väreissä palatsin puistossa.',
        selite: 'Vanha tammi levittää oksansa laajalle keltaisenruskeassa syyspuistossa, ja '
          + 'taustalla erottuu valkoinen palatsirakennus. Puu on suojeltu '
          + 'luonnonmuistomerkki Plungėn kartanon puistossa.',
        lahde: 'Valokuva: Žemaitijos kelias, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Žemaitijos kelias',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Perk%C5%ABno_%C4%85%C5%BEuolas_37_AB.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-plunge-f535170d.jpg',
        lyhyt: 'Plungėn Lourdesin luola sammaleisine kivimuureineen.',
        selite: 'Sammaleen peittämästä kivestä tehdyn luolan aukkoa sulkee koristeellinen '
          + 'rautaportti, jonka takana näkyy patsas. Plungėn Lourdesin luola on tehty '
          + 'vuonna 1905, ja se houkuttelee yhä kävijöitä.',
        lahde: 'Valokuva: Vilensija, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Vilensija',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2020._Plung%C4%97s_Lurdas.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Plungė',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mikä Perkūnas oli, ja miksi puistossa kasvava tammi on saanut hänen nimensä?',
      'Miksi Liettuan pikkukaupunkiin rakennettiin 1900-luvun alussa Lourdesin luolan jäljitelmä?',
    ],
    korostukset: ['Perkūnas|Perkūnas-tammi', 'Ogiński|Ogińskien'],
    nappi: 'Kartano vaihtaa omistajaa: Zubovin kausi päättyy, ja Ogińskien palatsi '
      + 'rakennetaan vasta 1879',
    // 21.85 E / 55.9167 N — en-Wikipedia "Plungė"
    laudat: {
      maailmankartta: { x: 6561.7, y: 1123 },
      europe: { x: 630.7, y: 423 },
    },
    teksti: 'Plungė on Länsi-Liettuan kaupunki Žemaitian alueella, ja Babrungas-joki jakaa sen '
      + 'kahteen osaan. Kaupunki mainitaan kaupunkina ensimmäisen kerran vuonna 1567, ja '
      + 'Magdeburgin oikeudet se sai vuonna 1792. Vuosina 1806–1873 Plungė oli Platon '
      + 'Zubovin omistuksessa, minkä jälkeen se siirtyi Ogińskien suvulle, joka rakennutti '
      + 'kaupunkiin palatsin vuonna 1879. Kartanon puistossa toimii Žemaitian taidemuseo, '
      + 'ja siellä kasvaa luonnonmuistomerkiksi suojeltu Perkūnas-tammi. Kaupungin '
      + 'Lourdesin luolan jäljitelmä tehtiin vuonna 1905, ja se houkuttelee yhä kävijöitä.',
    lahde: 'en-Wikipedia "Plungė", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-zagare',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-zagare-d893b6ec.jpg',
      lyhyt: 'Žagarėn kartanon palatsi kunnostuksen jälkeen syyspuistossa.',
      selite: 'Vaalea palatsi seisoo syksyisessä puistossa, ja etualalla on suihkulähde, jonka '
        + 'keskellä on lintuveistos. Uusklassinen palatsi on peräisin 1860-luvulta.',
      lahde: 'Valokuva: Žagarė2002, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Žagarė2002',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%BDagar%C4%97s_dvaro_r%C5%ABmai.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-zagare-82b78619.jpg',
        lyhyt: 'Žagarėn Pyhien Pietarin ja Paavalin kirkko valkaistuine seinineen.',
        selite: 'Kirkon valkaistu torni ja punaruskea katto kohoavat kirkasta sinistä taivasta '
          + 'vasten. Uuden Žagarėn kivikirkko rakennettiin vuonna 1633 paikallisesta '
          + 'dolomiitista.',
        lahde: 'Valokuva: Algirdas at Lithuanian Wikipedia, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Algirdas at Lithuanian Wikipedia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Naujosios_Zagares_baznycia.2009-06-11.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-zagare-61583adc.jpg',
        lyhyt: 'Žagarėn hevostilan pitkä tiilirakennus keltaisen lehvästön takaa.',
        selite: 'Tummakattoisessa punatiilirakennuksessa on rivi pieniä kattoikkunoita ja '
          + 'kaksi pientä tornia. Žagarėn kartanon hevostilalla kasvatetaan '
          + 'hannoverinhevosia.',
        lahde: 'Valokuva: Žagarė2002, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Žagarė2002',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%BDagar%C4%97s_%C5%BEirgyno_rytin%C4%97_fasado_dalis.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Žagarė',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Žagarė oli vielä 1900-luvun alussa Liettuan suurimpia kaupunkeja mutta on nykyään pieni?',
      'Mikä on Žagarvyšnė, ja miksi kaupungissa vietetään kirsikkajuhlaa?',
    ],
    korostukset: ['semgallilaisten|semgallilaisten', 'Žagarvyšnė|Žagarvyšnė'],
    nappi: 'Naryškinien omistama pikkukaupunki; kartanon uusklassinen palatsi on rakennettu '
      + '1860-luvulla',
    // 23.25 E / 56.3667 N — en-Wikipedia "Žagarė"
    laudat: {
      maailmankartta: { x: 6608.3, y: 1101.9 },
      europe: { x: 657.6, y: 411.2 },
    },
    teksti: 'Žagarė on pieni kaupunki Pohjois-Liettuassa lähellä Latvian rajaa. '
      + 'Semgallilaisten asutus Sagera mainitaan ensimmäisen kerran maaliskuussa 1254, ja '
      + '1200-luvulla paikalla oli semgallilaisten linnoitus. Kaupunki muodostui kahdesta '
      + 'pikkukaupungista, Vanhasta ja Uudesta Žagarėsta, joita Švėtė-joki jakaa; Uuden '
      + 'Žagarėn kivikirkko rakennettiin vuonna 1633 paikallisesta dolomiitista. Dmitri '
      + 'Naryškin osti pikkukaupungit vuonna 1857, ja kartanon uusklassinen palatsi on '
      + '1860-luvulta. Vuonna 1914 Žagarėssa asui 14 000 ihmistä ja se oli Liettuan '
      + 'seitsemänneksi suurin kaupunki, mutta nykyään asukkaita on noin 2 000. Kaupunki '
      + 'tunnetaan Žagarvyšnė-kirsikkalajikkeesta, ja kirsikkajuhlaa vietetään vuosittain '
      + 'vuodesta 2005.',
    lahde: 'en-Wikipedia "Žagarė" ja lt-Wikipedia "Žagarė", johdanto-osat (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Mistä paikallisesta kivilajista Uuden Žagarėn kirkko rakennettiin vuonna 1633?',
      vaihtoehdot: [
        'Graniitista',
        'Kalkkikivestä',
        'Hiekkakivestä',
        'Dolomiitista',
      ],
      oikea: 3,
      fakta: 'Kaupungin nimi juontuu todennäköisesti liettuan sanasta žagaras, joka '
        + 'tarkoittaa risua. Švėtė-joen rinteiltä avautuu myös dolomiittipaljastumia.',
    },
  },
  {
    id: 'hahmotelma-rokiskis',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-rokiskis-1141eddf.jpg',
      lyhyt: 'Rokiškin kartanon valkoinen päärakennus.',
      selite: 'Kartanon rakennutti Tyzenhausin suku, ja nykyään siinä toimii alueen museo. '
        + 'Valkoisessa julkisivussa on kolmen kaaren sisäänkäyntiloggia, ja katot ovat '
        + 'punaista tiiltä.',
      lahde: 'Valokuva: Zidikai1, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zidikai1',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rokiskis_manor_2018.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-rokiskis-913030f9.jpg',
        lyhyt: 'Rokiškin Pyhän Matteuksen kirkon punatiilinen julkisivu.',
        selite: 'Uusgoottilaisen kirkon rakennutti kreivi Tyzenhaus. Kirkon urut on kuvattu '
          + 'kaupungin vaakunassa, ja ne kertovat kaupungin musiikkiperinnöstä.',
        lahde: 'Valokuva: Renata3, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Renata3',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rokiskis_church_-_full_frontal.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-rokiskis-b21b8c01.jpg',
        lyhyt: 'Koristeellinen ruokasali Rokiškin kartanossa.',
        selite: 'Salin seinillä on koristeellisia puukaappeja ja astioita, ja pöytää '
          + 'ympäröivät kaiverretut tuolit. Kartanossa toimii nykyään seutumuseo.',
        lahde: 'Valokuva: Zidikai1, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zidikai1',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dining_room_of_Roki%C5%A1kis_manor.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Rokiškis',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi kaupunki alkoi kasvaa juuri rautatien haaralinjan valmistuttua?',
      'Mitä metsästäjä Rokas ja jänikset kertovat kaupungin nimestä?',
    ],
    korostukset: ['Tyzenhaus|Tyzenhausin', 'kiškis|kiškis'],
    nappi: 'Vuonna 1873 rakennettiin rautatien haaralinja ja Tyzenhausit alkoivat rahoittaa '
      + 'musiikkikoulua',
    // 25.5833 E / 55.9667 N — en-Wikipedia "Rokiškis"
    laudat: {
      maailmankartta: { x: 6686.1, y: 1120.7 },
      europe: { x: 702.4, y: 421.7 },
    },
    teksti: 'Rokiškis on kaupunki Koillis-Liettuassa lähellä Latvian rajaa. Sen keskusta '
      + 'muotoutui 1700-luvun lopulla Tyzenhausin suvun hallinnon aikana: uusgoottilainen '
      + 'Pyhän Matteuksen kirkko ja kartano, jossa toimii nykyään alueen museo, ovat '
      + 'arvokkaita esimerkkejä 1800-luvun rakennustaiteesta. Legendan mukaan kaupungin '
      + 'nimi juontuu metsästäjä Rokaksi, joka ajoi jäniksiä (liettuaksi kiškis). Vuodesta '
      + '1873 Tyzenhausit rahoittivat musiikkikoulua, joka koulutti kirkkourkureita, ja '
      + 'samana vuonna valmistunut rautatien haaralinja sai kaupungin kasvamaan. Nykyään '
      + 'Rokiškis tunnetaan juustostaan, sillä Rokiškio sūris on yksi Liettuan suurimmista '
      + 'maitotuotteiden valmistajista.',
    lahde: 'en-Wikipedia "Rokiškis", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-pakruojis',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-pakruojis-79fb214c.jpg',
      lyhyt: 'Pakruojin kartanon päärakennus pylväsportiikkeineen.',
      selite: 'Vaalea päärakennus on myöhäisklassismin esimerkki, ja sen julkisivun keskellä '
        + 'on kuuden pylvään portiikki. Kartano kunnostettiin matkailukäyttöön.',
      lahde: 'Valokuva: Rimantas Lazdynas, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Rimantas Lazdynas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2010_04_28Pakruojodvaras11.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-pakruojis-abe48eaa.jpg',
        lyhyt: 'Kaareva kivisilta ja kartanon rakennukset veden äärellä.',
        selite: 'Sillan kaaret heijastuvat veden tyyneen pintaan. Vuonna 1821 rakennettu silta '
          + 'toimii samalla patona, ja taustalla erottuu kartanon rakennuksia.',
        lahde: 'Valokuva: Rimantas Lazdynas, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Rimantas Lazdynas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2010_04_28Pakruojodvaras05.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-pakruojis-cb383cf5.jpg',
        lyhyt: 'Kartanon pitkä talousrakennus, jonka julkisivussa on kaarikäytävä.',
        selite: 'Matala rakennus jatkuu kaarien ryhmittämänä kartanon pihan reunalla. '
          + 'Kartanokokonaisuudessa oli päärakennuksen lisäksi paljon talous- ja '
          + 'tuotantorakennuksia.',
        lahde: 'Valokuva: Laima Gūtmane, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Laima Gūtmane',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pakruojis_manor%27s_outhouse_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Pakruojis',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi kartanon silta muistuttaa roomalaista akveduktia?',
      'Millaisia rakennuksia suureen kartanokokonaisuuteen kuului päärakennuksen lisäksi?',
    ],
    korostukset: ['von der Ropp|von der Ropp', 'portiikki|portiikki'],
    nappi: 'Kartano oli paroni von der Roppin suvun omistuksessa, rakennukset valmiit 1840 '
      + 'mennessä',
    // 23.8792 E / 55.9861 N — en-Wikipedia "Pakruojis Manor"
    laudat: {
      maailmankartta: { x: 6629.3, y: 1119.8 },
      europe: { x: 669.7, y: 421.2 },
    },
    teksti: 'Pakruojin kartano on entinen asuinkartano kahden kilometrin päässä '
      + 'Pakruojis-kaupungista Kruoja-joen oikealla rannalla. Paikka mainitaan lähteissä '
      + 'ensimmäisen kerran vuonna 1531, ja vuodesta 1780 vuoteen 1940 sen omisti '
      + 'paroniperhe von der Ropp. Nykyiset rakennukset ovat pääosin 1800-luvun '
      + 'alkupuolelta ja edustavat myöhäistä klassismia: päärakennuksen julkisivussa on '
      + 'kuuden pylvään portiikki, ja sisällä on soikea peilisali. Joen yli kulkee vuonna '
      + '1821 rakennettu kaareva dolomiittisilta, joka toimii samalla patona ja muistuttaa '
      + 'roomalaisia akvedukteja. Kartano on kunnostettu, ja nykyään siellä toimii '
      + 'hotelli, ravintola ja matkailukohde.',
    lahde: 'en-Wikipedia "Pakruojis Manor" ja lt-Wikipedia "Pakruojo dvaras", johdanto-osat '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-dzukija',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-dzukija-53ca0050.jpg',
      lyhyt: 'Čepkeliain suon vetisiä laikkuja ja valkoisia tupsuja.',
      selite: 'Suo on Liettuan suurin, ja se sijaitsee Dzūkijan kansallispuiston '
        + 'eteläpuolella. Etäällä metsä reunustaa avointa suoaluetta.',
      lahde: 'Valokuva: Wojsyl, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Wojsyl',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cepkeliu_marsh.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-dzukija-98ac8830.jpg',
        lyhyt: 'Perinteinen dzūkilainen talo ja aittoja Zervynosin kylässä.',
        selite: 'Zervynos on etnografinen kylä Dzūkijan kansallispuiston sisällä. Tummuneet '
          + 'puurakennukset ja hiekkatiet kertovat seudun maalaisperinteestä.',
        lahde: 'Valokuva: Šarūnas Šimkus, Wikimedia Commons (Public domain).',
        tekija: 'Šarūnas Šimkus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zervynos,_sodyba.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-dzukija-d6bda4af.jpg',
        lyhyt: 'Ūla-joen mutka vehreiden niittyjen ja pensaiden keskellä.',
        selite: 'Puiston vesistöihin kuuluu 30 jokea ja puroa. Ūla mutkittelee niityn ja '
          + 'pensaiden lomassa Dzūkijan kansallispuistossa.',
        lahde: 'Valokuva: Hugo.arg, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hugo.arg',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%AAla001.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Dzūkijan kansallispuisto',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi juuri tämä metsä- ja suoseutu haluttiin suojella kansallispuistona?',
      'Miten sisämaan dyynit ovat päätyneet metsän keskelle kaukana merestä?',
    ],
    korostukset: ['Dainava|Dainavan', 'Čepkeliai|Čepkeliain'],
    nappi: 'Kansallispuisto perustetaan vasta vuonna 1991 suojelemaan seudun metsiä ja soita',
    // 24.3767 E / 54.0819 N — en-Wikipedia "Dzūkija National Park"
    laudat: {
      maailmankartta: { x: 6645.9, y: 1208.1 },
      europe: { x: 679.2, y: 471.2 },
    },
    teksti: 'Dzūkijan kansallispuisto sijaitsee Etelä-Liettuassa, noin sadan kilometrin päässä '
      + 'Vilnasta lounaaseen ja Kaunasista etelään. Se perustettiin 23. huhtikuuta 1991 '
      + 'suojelemaan Dainavan maata, ja se on maan laajin suojeltu metsäalue: 584,5 '
      + 'neliökilometriä Nemunas-joen rannoilla. Maisemaa hallitsevat mäntyvaltaiset '
      + 'metsät, suot, järvet ja sisämaan dyynit, ja alueella on 30 jokea ja puroa. '
      + 'Puiston eteläpuolella on Čepkeliain suoalue, Liettuan suurin suo. Puiston '
      + 'hallintokeskus on Marcinkonysissa, ja alueella sijaitsee etnografinen Zervynosin '
      + 'kylä.',
    lahde: 'en-Wikipedia "Dzūkija National Park", johdanto-osa ja osiot "Features" ja '
      + '"Settlements" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-plateliai',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-plateliai-fafab674.jpg',
      lyhyt: 'Plateliain järvi ja metsäiset saaret kesäisen taivaan alla.',
      selite: 'Järvi on Samogitian suurin. Sen rannalla sijaitsee Plateliain kaupunki, joka on '
        + 'suosittu lomakohde.',
      lahde: 'Valokuva: Wojsyl, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Wojsyl',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lithuania_Plateliai_lake.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-plateliai-8c412d1a.jpg',
        lyhyt: 'Plateliain puukirkko puiden katveessa.',
        selite: 'Ruskeaseinäinen puukirkko on omistettu apostoleille Pietarille ja Paavalille. '
          + 'Se rakennettiin vuonna 1744.',
        lahde: 'Valokuva: Kvitas, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Kvitas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:BZN_Plateliai_church_sideview_right.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-plateliai-aef681b3.jpg',
        lyhyt: 'Puinen laituri ruovikon halki Plateliain järvelle.',
        selite: 'Laituri työntyy Šventorkalnisin niemen rannalta järvelle. Etäällä siintävät '
          + 'metsäiset saaret.',
        lahde: 'Valokuva: Fry72, Karel Frydrýšek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Fry72, Karel Frydrýšek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Molo,_mys_%C5%A0ventokalnis,_jezero_Plateliai,_Litva.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Plateliai',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi kansantarun mukaan järvi päätyi juuri Samogitian kumpujen väliseen kuoppaan?',
      'Millaista oli olla naiskirjailija historiallisessa Liettuassa 1800-luvun alussa?',
    ],
    korostukset: ['Samogitia|Samogitiassa', 'Sofija Tyzenhauzaitė|Sofija Tyzenhauzaitė'],
    nappi: 'Samogitian kylä, jossa oli seurakuntakoulu jo 1804; posti ja lennätin tulevat '
      + 'vasta 1879',
    // 21.8167 E / 56.05 N — en-Wikipedia "Plateliai"
    laudat: {
      maailmankartta: { x: 6560.6, y: 1116.8 },
      europe: { x: 630.1, y: 419.5 },
    },
    teksti: 'Plateliai on Samogitiassa sijaitseva kaupunki Plateliain järven länsirannalla; '
      + 'järvi on Samogitian suurin. Paikka mainitaan lähteissä ensimmäisen kerran vuonna '
      + '1450, ja nykyään siellä toimii Žemaitijan kansallispuiston hallinto. Kylän '
      + 'puukirkko rakennettiin vuonna 1744. Sofija Tyzenhauzaitė de Choiseul-Gouffier '
      + '(1790–1878) kirjoitti ranskaksi ja oli historiallisen Liettuan ensimmäinen '
      + 'naiskirjailija. Kansantarun mukaan järvi lipui ennen kaukana lännessä, kunnes '
      + 'myrsky nosti sen pilveksi ja kantoi itään. Sanat "Plate lej", eli "sataa '
      + 'leveästi", olivat järven salasana: kun samogiittinainen sanoi ne ääneen, koko '
      + 'vesimassa vajosi kumpujen väliseen kuoppaan.',
    lahde: 'en-Wikipedia "Plateliai" ja lt-Wikipedia "Plateliai", johdanto-osat (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Millä kielellä Sofija Tyzenhauzaitė de Choiseul-Gouffier kirjoitti?',
      vaihtoehdot: [
        'ranskaksi',
        'puolaksi',
        'liettuaksi',
        'saksaksi',
      ],
      oikea: 0,
      fakta: 'Plateliain kotiseutumuseo perustettiin vuonna 1982 kartanon aittaan, ja sen '
        + 'näyttelyssä on paljon esillä Užgavėnės-karnevaalin perinteitä.',
    },
  },
  {
    id: 'hahmotelma-rusne',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-rusne-d605deb1.jpg',
      lyhyt: 'Tulvan peittämä tie Rusnén saarelle.',
      selite: 'Suiston vedenpinta nousee ajoittain niin, että tie saarelle jää veden alle. '
        + 'Siksi saarella on penkereitä ja pumppuasemia.',
      lahde: 'Valokuva: Dalyba, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Dalyba',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pamario_potvynis.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-rusne-f4f1a7c9.jpg',
        lyhyt: 'Rusnén luterilaisen kirkon tiilitorni ja valkoiset seinät.',
        selite: 'Evankelisluterilainen kirkko rakennettiin vuosina 1809–1827. Tiilinen torni '
          + 'kohoaa puiden takaa.',
        lahde: 'Valokuva: Lokyz, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Lokyz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rusne_Lutheran_church.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-rusne-62115482.jpg',
        lyhyt: 'Tiilinen vedennostoasema Uostadvaris Rusnén saarella.',
        selite: 'Rakennuksessa toimii nykyään polderimuseo. Vedennostoasemat kuuluvat saaren '
          + 'tulvilta suojaavaan polderijärjestelmään.',
        lahde: 'Valokuva: JonasS (lt.wikipedia), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'JonasS (lt.wikipedia)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rusne_Uostadvaris_Polderiai.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Rusnė',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Millaista elämää tulva-alttiilla suiston saarella eletään?',
      'Miksi kalastajat ja lintuharrastajat viihtyvät juuri Nemunasin suistossa?',
    ],
    korostukset: ['Nemunas|Nemunasin', 'vedenmittausasema|vedenmittausasemista'],
    nappi: 'Nemunasin suiston saarikylä Preussin puolella, seurakuntakoulu perustettu jo 1553',
    // 21.3778 E / 55.2972 N — en-Wikipedia "Rusnė"
    laudat: {
      maailmankartta: { x: 6545.9, y: 1152 },
      europe: { x: 621.7, y: 439.3 },
    },
    teksti: 'Rusnė on rajakaupunki Nemunasin suistossa, samannimisellä saarella noin yhdeksän '
      + 'kilometriä Šilutėsta lounaaseen. Paikka mainitaan lähteissä ensimmäisen kerran '
      + '1300-luvulla, ja ensimmäinen kirkko rakennettiin vuonna 1419. Preussin herttua '
      + 'määräsi vuonna 1544 pidettäväksi jumalanpalveluksia liettuan ja kuurin kielillä, '
      + 'ja vuonna 1553 kylään perustettiin liettuankielinen seurakuntakoulu. Alue on '
      + 'tulva-altista, ja saarella aloitti 1810 toimintansa yksi Liettuan ensimmäisistä '
      + 'vedenmittausasemista. Venäjän rajan erottaa Skirvytė-joki, ja kaupunki on '
      + 'suosittu kalastajien ja lintuharrastajien kohde.',
    lahde: 'en-Wikipedia "Rusnė" ja lt-Wikipedia "Rusnė", johdanto-osat (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Rusnéen rakennettiin ensimmäinen kirkko?',
      vaihtoehdot: [
        '1365',
        '1419',
        '1553',
        '1810',
      ],
      oikea: 1,
      fakta: 'Osa Rusnén kaupungista Dumblė-järven tuntumassa on merenpinnan alapuolella ja '
        + 'Liettuan alinta aluetta. Tulvilta suojaa penkereet ja polderijärjestelmä, jossa '
        + 'on 20 vedennostoasemaa.',
    },
  },
  {
    id: 'hahmotelma-silute',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-silute-55bd33cc.jpg',
      lyhyt: 'Hugo Scheun kartanon sisäänkäynti ja lasiveranta Šilutėssa.',
      selite: 'Kartanon pihan puolella on koristeellinen puinen veranta ja parvekkeita, joilla '
        + 'on kukkia. Scheun kartano kuuluu Šilutėn säilyneisiin vanhoihin rakennuksiin.',
      lahde: 'Valokuva: Petriukas, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Petriukas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hugo_%C5%A0ojaus_dvaro_%C4%AF%C4%97jimas_su_veranda_i%C5%A1_kiemo.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-silute-be8be9b7.jpg',
        lyhyt: 'Heydekrugin, nykyisen Šilutėn, pääkatu vuonna 1914.',
        selite: 'Värillinen postikortti näyttää kaupungin pääkadun rakennuksineen ja '
          + 'hevoskärryineen. Kortin ajalta Šilutė oli vielä saksalaisittain Heydekrug.',
        lahde: 'Valokuva: Adolf Stahl, Heydekrug, O.-Pr., Wikimedia Commons (Public domain).',
        tekija: 'Adolf Stahl, Heydekrug, O.-Pr.',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Court_building_and_the_main_street_in_%C5%A0ilut%C4%97_in_1914.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-silute-ca871b22.jpg',
        lyhyt: 'Šilutėn rautatieaseman keltatiilinen asemarakennus.',
        selite: 'Kaksikerroksisessa tiilirakennuksessa on kaariaukkoiset ikkunat ja ovet sekä '
          + 'asemakyltti. Rautatieasema kuuluu Šilutėn vanhoihin rakennuksiin.',
        lahde: 'Valokuva: Pegasas (lt.wikipedia), Wikimedia Commons (Public domain).',
        tekija: 'Pegasas (lt.wikipedia)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%A0ilut%C4%97s_gele%C5%BEinkelio_stotis.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Šilutė',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Šilutėn saksalainen nimi Heydekrug viittaa majataloon?',
      'Miksi Šilutėssa pidettiin vuosittain suuria markkinoita, ja mitä niillä myytiin?',
    ],
    korostukset: ['Heydekrug|Heydekrug', 'Pikku-Liettua|Pikku-Liettuan'],
    nappi: 'Preussin Heydekrug, kalamarkkinapaikka, jossa liettuankielinen lehti ilmestyi jo '
      + 'vuodesta 1863',
    // 21.4833 E / 55.35 N — en-Wikipedia "Šilutė"
    laudat: {
      maailmankartta: { x: 6549.4, y: 1149.5 },
      europe: { x: 623.7, y: 437.9 },
    },
    teksti: 'Šilutė on kaupunki Länsi-Liettuassa, ja se kuuluu Pikku-Liettuan (Klein-Litauen) '
      + 'etnografiseen alueeseen. Paikka sai alkunsa majatalosta, joka palveli Klaipėdan '
      + 'ja Tilsitin välillä kulkevia matkalaisia ja hevosia; saksankielinen nimi '
      + 'Heydekrug viittaa tähän nummen majataloon. Vuonna 1511 majatalon osti maineen ja '
      + 'kalastusoikeuksineen Georg Tallat, ja paikalle syntyi tunnettu kalamarkkina. '
      + 'Preussin kuningaskuntaan Šilutė kuului 1700-luvulta lähtien, ja 1800-luvun '
      + 'lopulla asukkaista osa oli liettuankielisiä ja monet elivät maataloudesta, '
      + 'kalastuksesta ja lauttauksesta. Vuosittaisilla markkinoilla myytiin kalaa aina '
      + 'Varsovaan ja Pietariin asti, sikoja Berliiniin sekä vihanneksia, karjaa ja '
      + 'hevosia.',
    lahde: 'en-Wikipedia "Šilutė", johdanto-osa ja osiot "Name" ja "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-varniai',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-varniai-c783bab0.jpg',
      lyhyt: 'Pyhien Pietarin ja Paavalin kirkko Varniaissa lumisessa maisemassa.',
      selite: 'Valkoisessa kirkossa on kaksi tornia ja punaiset katot. Kirkko toimi aiemmin '
        + 'Samogitian hiippakunnan tuomiokirkkona.',
      lahde: 'Valokuva: Laima Gūtmane (simka), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Laima Gūtmane (simka)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_St._Peter_and_St._Paul_in_Varniai,_Lithuania_in_2013.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-varniai-d6337404.jpg',
        lyhyt: 'Varniain kirkko ilmasta katsottuna syksyisessä maisemassa.',
        selite: 'Ilmakuvassa näkyvät kirkon kaksi tornia ja punainen katto sekä ympärillä '
          + 'pikkukaupungin talot ja pellot.',
        lahde: 'Valokuva: Žemaitijos kelias, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Žemaitijos kelias',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_Church_of_St._Peter_and_St._Paul_in_Varniai,_Lithuania_in_2019.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-varniai-4da4a7f9.jpg',
        lyhyt: 'Näkymä Varniain kaduille ja kirkolle ylhäältä katsottuna.',
        selite: 'Keväisessä kuvassa pientalot ja puutarhat reunustavat kapeaa katua, ja '
          + 'oikealla kohoaa valkoinen punakattoinen kirkko.',
        lahde: 'Valokuva: Algirdas (lt.wikipedia), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Algirdas (lt.wikipedia)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Varniai1.2009-05-21.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Varniai',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Samogitian piispa asui juuri Varniaissa, ja miksi hiippakunnan keskus siirrettiin sieltä pois?',
      'Miksi liettuankielisen kirjan painaminen oli merkittävä tapahtuma 1500-luvun Liettuassa?',
    ],
    korostukset: ['Medininkai|Medininkai', 'Katechizmas|Katechizmasin'],
    nappi: 'Samogitian entinen piispankaupunki; hiippakunta siirrettiin Kaunasiin '
      + 'kansannousun 1863 jälkeen',
    // 22.3667 E / 55.7333 N — en-Wikipedia "Varniai"
    laudat: {
      maailmankartta: { x: 6578.9, y: 1131.6 },
      europe: { x: 640.6, y: 427.8 },
    },
    teksti: 'Varniai on pikkukaupunki Länsi-Liettuassa Telšiain maakunnassa, ja keskiajalla '
      + 'sen nimi oli Medininkai, joka mainitaan ensimmäisen kerran vuonna 1320. Nykyinen '
      + 'nimi tulee kaupungin läpi virtaavasta Varnelė-joesta. Samogitian kastamisen '
      + 'jälkeen piispa asui Varniaissa, ja kaupunki oli Samogitian katolisen kirkon '
      + 'keskus, kunnes Venäjän keisarikunnan viranomaiset siirsivät hiippakunnan '
      + 'Kaunasiin tammikuun kansannousun 1863 jälkeen. Piispa Merkelis Giedraitisin '
      + 'tuella Mikalojus Daukša valmisti julkaisukuntoon Katechizmasin, joka oli '
      + 'ensimmäinen Liettuan suuriruhtinaskunnassa painettu liettuankielinen kirja. '
      + 'Kaupungissa asui myös piispa Motiejus Valančius.',
    lahde: 'en-Wikipedia "Varniai", johdanto-osa ja osiot "Etymology" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-panemune',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-panemune-a18fe5e9.jpg',
      lyhyt: 'Panemunėn linna ja sen kaksi pyöreää tornia ilta-auringossa ilmasta kuvattuna.',
      selite: 'Tiilinen linna, jonka kulmilla on pyöreitä, punakattoisia torneja, ympäröi '
        + 'metsä. Se rakennettiin 1600-luvun alussa.',
      lahde: 'Valokuva: Mantas Golubevas, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Mantas Golubevas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panemun%C4%97_Castle.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-panemune-dd1cefb0.jpg',
        lyhyt: 'Panemunėn linna ja Nemunas-joen laakso ilmasta kuvattuna.',
        selite: 'Linna sijaitsee metsäisellä kumpareella joen läheisyydessä, ja sen ympärillä '
          + 'on puistoa ja lampia.',
        lahde: 'Valokuva: Steveo89, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Steveo89',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Panemune_Castle_Aerial.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-panemune-bb99af11.jpg',
        lyhyt: 'Vanha akvarelli Panemunėn linnan pihasta ja kahdesta tornista.',
        selite: '1800-luvun akvarellissa näkyvät linnan piha, pitkä rakennussiipi ja kaksi '
          + 'pyöreää tornia. Se näyttää linnan ennen nykyisiä entisöintejä.',
        lahde: 'Valokuva: Napoleon Orda, Wikimedia Commons (Public domain).',
        tekija: 'Napoleon Orda',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castle_of_Panemun%C4%97._19th_c..jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Panemunė',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Nemunas-joen ranta oli linnalle niin strateginen paikka?',
      'Miksi linna pääsi rappeutumaan 1800-luvulla, vaikka se oli ollut upea asuinlinna?',
    ],
    korostukset: ['Nemunas|Nemunas-joen', 'Peter Nonhaardt|Peter Nonhaardt'],
    nappi: 'Rappeutunut linna, jonka hidas entisöinti oli alkanut vuonna 1863',
    // 22.7667 E / 55.0833 N — en-Wikipedia "Jurbarkas"
    laudat: {
      maailmankartta: { x: 6592.2, y: 1161.9 },
      europe: { x: 648.3, y: 444.9 },
    },
    teksti: 'Panemunėn linna on historiallinen linna Länsi-Liettuassa Nemunas-joen rannalla, '
      + 'tärkeän kulku- ja kauppareitin varrella. Ensimmäisen linnan uskotaan rakentaneen '
      + 'Saksalaisritarikunta vuonna 1313, mutta Liettuan suuriruhtinas Vytenis valtasi '
      + 'sen jo seuraavana vuonna. Nykyisen tiililinnan rakennutti unkarilaistaustainen '
      + 'puukauppias János Eperjes vuosina 1604–1610, ja sen suunnitteli hollantilainen '
      + 'arkkitehti Peter Nonhaardt. Tyylissä on renessanssin ja barokin piirteitä sekä '
      + 'myöhäisgoottia, ja linnaa pidetään todennäköisesti Liettuan aidoimpana säilyneenä '
      + 'asuinlinnana. Tsaarin viranomaiset takavarikoivat linnan omistajasuvulta '
      + 'marraskuun kansannousun jälkeen, ja rakennus rappeutui; nykyisin se on avoinna '
      + 'kävijöille ja siellä on museo.',
    lahde: 'en-Wikipedia "Panemunė Castle", johdanto-osa ja osiot "Early history", "16th-17th '
      + 'centuries", "18th-19th centuries" ja "Architecture" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-siluva',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-siluva-ec5dc05b.jpg',
      lyhyt: 'Šiluvan basilikan kaksitorninen tiilijulkisivu aukion päässä.',
      selite: 'Punatiilisen basilikan julkisivua kehystävät kaksi punakattoista tornia. '
        + 'Nykyinen basilika rakennettiin vuonna 1786 paikalle, jossa Neitsyt Marian '
        + 'kerrotaan ilmestyneen.',
      lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zairon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Siluva_Basilika_Mari%C3%A4_Geburt_Fassade_1.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-siluva-8808aef0.jpg',
        lyhyt: 'Neitsyt Marian ja lapsen kultakehyksinen kuva basilikan pääalttarilla.',
        selite: 'Pääalttarin keskellä on kultaisin koristein kehystetty kuva Neitsyt Mariasta '
          + 'ja lapsesta, ympärillä pylväitä ja enkelipatsaita. Šiluvassa on kunnioitettu '
          + 'Marian ja lapsen kuvaa, jonka on kerrottu tehneen ihmeitä.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Siluva_Basilika_Mari%C3%A4_Geburt_Innen_Hochaltar_3.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-siluva-3913eb44.jpg',
        lyhyt: 'Šiluvan maisema vanhassa valokuvassa vuodelta 1930.',
        selite: 'Mustavalkoisessa kuvassa karja laiduntaa pellolla, taustalla näkyy '
          + 'kaksitorninen kirkko ja korkea valkoinen rakennus, ja oikealla kohoaa vanha '
          + 'mänty Šnabo pypkė.',
        lahde: 'Valokuva: J. Lukavičius, Wikimedia Commons (Public domain).',
        tekija: 'J. Lukavičius',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Landscape_of_Lithuania._%C5%A0iluva,_%C5%A0iluva_Chapel_and_the_historic_pine_tree_%22%C5%A0nabo_pypk%C4%97%22,_1930.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Šiluva',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi katolilaiset menettivät Šiluvan kirkon 1500-luvulla, ja miten he saivat sen takaisin?',
      'Miksi Preussista salakuljetettuja liettuankielisiä kirjoja jaettiin juuri pyhiinvaelluspaikalla?',
    ],
    korostukset: ['kalvinismiin|kalvinismiin', 'basilika|basilika'],
    nappi: 'Neitsyt Marian pyhiinvaelluspaikka, jossa kiellettyjä liettuankielisiä kirjoja '
      + 'vaihdettiin salaa',
    // 23.225 E / 55.5306 N — en-Wikipedia "Šiluva"
    laudat: {
      maailmankartta: { x: 6607.5, y: 1141.1 },
      europe: { x: 657.1, y: 433.1 },
    },
    teksti: 'Šiluva on alle 700 asukkaan pikkukaupunki Samogitiassa ja Liettuan tärkeä '
      + 'katolinen pyhiinvaelluskohde. Se mainitaan ensimmäisen kerran vuonna 1457, kun '
      + 'aatelismies Petras Gedgaudas rakennutti sinne Neitsyt Marian syntymän kirkon. '
      + 'Reformaation aikana monet seudun asukkaista kääntyivät kalvinismiin ja kirkko '
      + 'suljettiin noin vuonna 1569; viimeinen kirkkoherra hautasi kirkon arvoesineet ja '
      + 'asiakirjat rautalaatikossa kirkon lähelle. Erään uskomuksen mukaan Neitsyt Maria '
      + 'ilmestyi paikalle lapsi sylissään, ja asiakirjat löytyivät pian sen jälkeen, '
      + 'joten katolilaiset saivat kirkon takaisin vuonna 1622. Nykyinen basilika '
      + 'valmistui vuonna 1786, ja Venäjän vallan aikana pyhiinvaellusjuhlat olivat myös '
      + 'paikka, jossa jaettiin Preussista salakuljetettuja liettuankielisiä kirjoja.',
    lahde: 'en-Wikipedia "Šiluva", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Mitä Šiluvan viimeinen kirkkoherra teki kirkon arvoesineille ja asiakirjoille '
        + 'kirkon sulkemisen aikoihin?',
      vaihtoehdot: [
        'Hautasi ne rautalaatikossa kirkon lähelle',
        'Antoi ne kalvinistien haltuun säilytettäväksi',
        'Vei ne turvaan Preussin puolelle rajan taakse',
        'Piilotti ne kirkon tornin salaiseen kammioon',
      ],
      oikea: 0,
      fakta: 'Paavi Johannes Paavali II teki erityisen pyhiinvaellusmatkan Šiluvan Marian '
        + 'kansalliseen pyhäkköön vieraillessaan Liettuassa vuonna 1993.',
    },
  },
  {
    id: 'hahmotelma-tytuvenai',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-tytuvenai-6d68474a.jpg',
      lyhyt: 'Tytuvėnain Marian kirkko ja bernardiiniluostarin rakennukset.',
      selite: 'Valkoisen kirkon julkisivun kohdalla kohoaa kaksi tornia, ja kivetty polku '
        + 'johtaa luostarin pihalle. Luostarikompleksin pääosa valmistui 1600-luvulla.',
      lahde: 'Valokuva: user:CD, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'user:CD',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_the_Virgin_Mary_and_Tytuv%C4%97nai_Monastery_in_Tytuv%C4%97nai,_Lithuania_in_2022.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-tytuvenai-2b6a883f.jpg',
        lyhyt: 'Tytuvėnain luostarikirkon sisätila punaisine kangasnauhoineen.',
        selite: 'Vaaleasävyisessä holvikirkossa on kullattuja sivualttareita, penkkirivejä ja '
          + 'katosta riippuvia punaisia nauhoja. Kirkko kuuluu bernardiiniluostarin '
          + 'kokonaisuuteen.',
        lahde: 'Valokuva: Diliff, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Diliff',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tytuv%C4%97nai_Monastery_Church_Interior,_Tytuv%C4%97nai,_Lithuania_-_Diliff.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-tytuvenai-6f133227.jpg',
        lyhyt: 'Tytuvėnain ympäristön metsät syysaamun sumussa.',
        selite: 'Sumuiset metsät hehkuvat syksyn väreissä. Tytuvėnain seutu on järvien ja '
          + 'metsien ympäröimä, ja kaupungista tuli sotien välisenä aikana suosittu '
          + 'lomakaupunki.',
        lahde: 'Valokuva: TytuvenuRegioninisParkas, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'TytuvenuRegioninisParkas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tytuv%C4%97nai_regional_park_landscape.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Tytuvėnai',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Tytuvėnaille tapahtui 1600- ja 1700-lukujen sodissa, ja miten kaupunki toipui?',
      'Miksi Venäjän viranomaiset sulkivat luostarin vuonna 1864?',
    ],
    korostukset: ['Valavičius|Valavičius', 'Bridvaišis|Bridvaišis'],
    nappi: 'Bernardiiniluostari, jonka Venäjän viranomaiset sulkivat vuonna 1864 kansannousun '
      + 'jälkeen',
    // 23.2 E / 55.6 N — en-Wikipedia "Tytuvėnai"
    laudat: {
      maailmankartta: { x: 6606.7, y: 1137.9 },
      europe: { x: 656.6, y: 431.3 },
    },
    teksti: 'Tytuvėnai on kaupunki Kelmėn kunnassa Liettuassa, ja se tunnetaan '
      + 'bernardiiniluostaristaan. Paikka mainitaan ensimmäisen kerran 1300-luvun lopulla, '
      + 'jolloin Bridvaišis-järven yllä kohoavalla linnavuorella oli puulinna. Vuonna 1609 '
      + 'Liettuan suuri lipunkantaja Andrius Valavičius osti Tytuvėnain, ja hänen '
      + 'perheensä aloitti luostarin ja kirkon rakentamisen vanhan kirkon viereen; '
      + 'kompleksin pääosa valmistui vuonna 1633. Ruotsalaisten ja venäläisten joukkojen '
      + 'hyökkäykset ja pitkät sodat jättivät kaupungin autioksi vuoteen 1711 mennessä, '
      + 'mutta vuonna 1724 myönnetty markkinaoikeus auttoi sen toipumaan. Vuoden 1863 '
      + 'kansannousun jälkeen viranomaiset syyttivät paikallisia munkkeja kapinallisten '
      + 'auttamisesta ja sulkivat luostarin vuonna 1864.',
    lahde: 'en-Wikipedia "Tytuvėnai", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-alytus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-alytus-13b2edf6.jpg',
      lyhyt: 'Alytuksen linnavuori ja joenlaakso matalassa auringonvalossa.',
      selite: 'Linnavuori eli piliakalnis on kumpumainen, ihmisten rakentama vallimäki, joita '
        + 'Liettuassa on runsaasti. Huipulta avautuu näkymä joen mutkittelevaan laaksoon.',
      lahde: 'Valokuva: Juliux, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Juliux',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alytus_hillfort.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-alytus-68589071.jpg',
        lyhyt: 'Valkoisen ruusun silta ylittää Nemunas-joen jalankulkijoille.',
        selite: 'Silta on Liettuan suurin jalankulkusilta. Se rakennettiin vuonna 1915 '
          + 'räjäytetyn rautatiesillan jäänteiden päälle, ja sen nimen valitsivat '
          + 'kaupunkilaiset.',
        lahde: 'Valokuva: Vilensija, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Vilensija',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alytus,_Baltosios_ro%C5%BE%C4%97s_tiltas.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-alytus-f69fa86b.jpg',
        lyhyt: 'Vanha postikortti Alytuksesta: matalia puutaloja ja katuja kukkulalta '
          + 'nähtynä.',
        selite: 'Kortin yläkulmassa lukee "Olita (russisch)", Alytuksen venäjänkielinen nimi. '
          + 'Kuva on noin vuodelta 1915 ja näyttää pienen kaupungin talojen kattoja.',
        lahde: 'Valokuva: Tuntematon, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:New_street_and_bridge_over_Nemunas_in_Alytus_in_~1915.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Alytus',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Alytus oli vuosisatoja jaettu kahteen erilliseen osaan?',
      'Mitä linnake vartioi Alytuksen paikalla 1300-luvulla?',
    ],
    korostukset: ['Dzūkija|Dzūkijan', 'Nemunas|Nemunas-joen'],
    nappi: 'Kaksiosainen kaupunki Nemunas-joen varrella: osat yhdistyvät yhdeksi vasta vuonna '
      + '1915',
    // 24.0492 E / 54.4014 N — en-Wikipedia "Alytus"
    laudat: {
      maailmankartta: { x: 6635, y: 1193.4 },
      europe: { x: 672.9, y: 462.8 },
    },
    teksti: 'Alytus on Etelä-Liettuan kaupunki Nemunas-joen rannalla ja maan kuudenneksi '
      + 'suurin. Se on Dzūkijan historiallinen keskus, ja tiet yhdistävät sen muun muassa '
      + 'Vilnaan, Kaunasiin ja Grodnoon. Ensimmäinen maininta on vuodelta 1377, jolloin '
      + 'paikalla oli pieni puinen linnake Saksalaisen ritarikunnan rajalla. Kuningas '
      + 'Stefan Báthory antoi kaupungille kaupunkioikeudet vuonna 1581, ja päivää '
      + 'juhlitaan yhä Alytuksen päivänä. Kaupunki oli vuosisatoja jaettuna kahteen '
      + 'erilliseen osaan, joita kutsutaan yhä nimillä Alytus I ja Alytus II. Kaupungin '
      + 'vaakunassa on valkoinen ruusu, ja sama nimi on Liettuan suurimmalla '
      + 'jalankulkusillalla.',
    lahde: 'en-Wikipedia "Alytus", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-marijampole',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-marijampole-008e4f6a.jpg',
      lyhyt: 'Marijampolen Pyhän arkkienkeli Mikaelin pieni basilika kahdine torneineen.',
      selite: 'Valkoisen kirkon julkisivua reunustavat kaksi tornia. Kaupungin historia '
        + 'liittyy tiiviisti mariaanipatereiden luostariin ja kirkkoon.',
      lahde: 'Valokuva: Zidikai1, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zidikai1',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marijampol%C4%97s_%C5%A0v._arkangelo_Mykolo_bazilika.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-marijampole-af4fe220.jpg',
        lyhyt: 'Aukio, jonka laidalla on suuri hallintorakennus ja korkea pylväs '
          + 'ratsastajapatsaineen.',
        selite: 'Pylvään huipulla ratsastaa keihäänkantaja, ja juuressa on reliefi. Taustalla '
          + 'on monikerroksinen toimistorakennus.',
        lahde: 'Valokuva: Bearas, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Bearas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marijampol%C4%97.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-marijampole-ba547e9f.jpg',
        lyhyt: 'Basilikan julkisivu kahdine torneineen ja kuistineen sinisen taivaan alla.',
        selite: 'Julkisivun keskellä on kaareva portaali, ja tornit päättyvät tummiin '
          + 'huippuihin. Kirkon edessä on kivetty aukio.',
        lahde: 'Valokuva: Belamas, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Belamas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Marijampol%C4%97_%C5%A0v_arkangelo_Mykolo_ma%C5%BEoji_bazilika_(Large).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Marijampolė',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi liettuankielisiä kirjoja salakuljetettiin 1800-luvulla juuri Marijampolen seudulla?',
      'Miksi Marijampolen puutalot vaihtuivat 1800-luvulla kivitaloiksi?',
    ],
    korostukset: ['Šešupė|Šešupė-joki', 'Suvalkija|Suvalkijan'],
    nappi: 'Vuoden 1868 palon jälkeen kiviseksi rakentuva kaupunki, jossa mariaanien luostari '
      + 'sai jäädä auki',
    // 23.35 E / 54.5472 N — en-Wikipedia "Marijampolė"
    laudat: {
      maailmankartta: { x: 6611.7, y: 1186.7 },
      europe: { x: 659.5, y: 459 },
    },
    teksti: 'Marijampolė on Etelä-Liettuan kaupunki ja Suvalkijan historiallisen alueen '
      + 'kulttuurikeskus. Šešupė-joki jakaa sen kahteen osaan, joita yhdistää kuusi '
      + 'siltaa. Kaupungin nimi juontuu mariaanipatereista, joiden saapuminen vuonna 1751 '
      + 'vauhditti asutuksen kasvua. Vuoden 1868 palo tuhosi monta puutaloa, minkä jälkeen '
      + 'taloja rakennettiin kivestä. Koska Venäjä oli kieltänyt liettuankieliset kirjat, '
      + 'Preussin rajan läheisyys helpotti niiden salakuljetusta, ja kaupungista tuli '
      + 'liettualaisen kansallisen heräämisen keskus.',
    lahde: 'en-Wikipedia "Marijampolė", johdanto-osa ja osiot "Etymology" ja "History" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä munkkikunnan mukaan Marijampolė on saanut nimensä?',
      vaihtoehdot: [
        'jesuiittojen mukaan',
        'mariaanipatereiden mukaan',
        'dominikaanien mukaan',
        'fransiskaanien mukaan',
      ],
      oikea: 1,
      fakta: 'Marijampolė oli vuonna 2018 Liettuan kulttuuripääkaupunki, kun maan '
        + 'itsenäisyyden palauttamisesta tuli kuluneeksi sata vuotta. Kaupunki tunnetaan '
        + 'myös Malonny-katutaide- ja arkkitehtuurisymposiumista.',
    },
  },
  {
    id: 'hahmotelma-vistytis',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-vistytis-d3bdf027.jpg',
      lyhyt: 'Vištytis-järven tyyni pinta laiturilta katsottuna.',
      selite: 'Kaupunki sijaitsee järven koillisrannalla lähellä Venäjän rajaa. Vastarannalla '
        + 'häämöttää matala, metsäinen ranta.',
      lahde: 'Valokuva: Mbsoft, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Mbsoft',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Vi%C5%A1tytis.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-vistytis-dd2f0927.jpg',
        lyhyt: 'Kivi, johon on kaiverrettu kartta Vištytis-järvestä ja sen lähikohteista.',
        selite: 'Kaiverruksissa näkyvät järvi ja ympäristön paikkoja, kuten linnavuori. Kivi '
          + 'toimii karttana järven rannalla.',
        lahde: 'Valokuva: PrzemekS, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'PrzemekS',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stone_near_Vistytis_Lake_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-vistytis-48273aa9.jpg',
        lyhyt: 'Vištytisin luterilainen kirkko: vaalea rakennus, tiilikatto ja pieni torni.',
        selite: 'Harmaanvalkoisessa kirkossa on punaruskea katto ja risti tornin huipulla. '
          + 'Vištytisin asutukseen kuului historiassa liettualaisia, puolalaisia ja '
          + 'saksalaisia asukkaita.',
        lahde: 'Valokuva: Hugo.arg, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hugo.arg',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vi%C5%A1tytis5.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Vištytis',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi Vištytis alkoi taantua, vaikka rautatie rakennettiin vain muutaman kilometrin päähän?',
      'Mikä Vištytisin lähellä oleva suuri kivi on, ja miksi sitä on säilytetty?',
    ],
    korostukset: ['Sigismund II Augustus|Sigismund II Augustus', 'Kaliningradin|Kaliningradin'],
    nappi: 'Rautatie ohitti kaupungin jo 1861, ja pieni harjojen valmistuksesta tunnettu '
      + 'Vištytis taantui',
    // 22.7194 E / 54.4583 N — en-Wikipedia "Vištytis"
    laudat: {
      maailmankartta: { x: 6590.6, y: 1190.8 },
      europe: { x: 647.4, y: 461.3 },
    },
    teksti: 'Vištytis on pieni kaupunki Lounais-Liettuassa, Vištytis-järven koillisrannalla '
      + 'lähellä Venäjän Kaliningradin alueen rajaa. Suuriruhtinas Sigismund II Augustus '
      + 'myönsi paikalle kaupunkioikeudet ja vaakunan vuonna 1570, ja se oli alueen '
      + 'ensimmäinen kaupunki. 1800-luvulla tärkeä elinkeino oli harjojen valmistus. Kun '
      + 'rautatie Königsbergistä Venäjälle rakennettiin vuonna 1861 muutaman kilometrin '
      + 'päähän Kybartain kautta, kaupunki taantui nopeasti. Katurakenne ja torinaukio '
      + 'ovat säilyneet 1700-luvulta asti, ja lähistöllä on linnavuori sekä suuri '
      + 'Vištytis-kivi.',
    lahde: 'en-Wikipedia "Vištytis", johdanto-osa ja osiot "Geography" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-zarasai',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-zarasai-3d66d5fc.jpg',
      lyhyt: 'Zarasain kaupunki nousee järven rannalta, ja kirkon tornit kohoavat kauempana.',
      selite: 'Talot ja puut reunustavat rantaa, ja mäen laella näkyy kahden tornin valkoinen '
        + 'kirkko. Kaupunkia ympäröivät useat järvet.',
      lahde: 'Valokuva: Bloodless, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Bloodless',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zarasai.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-zarasai-3ab80217.jpg',
        lyhyt: 'Vanha mustavalkoinen valokuva Zarasaista: mutkitteleva tie, silta ja '
          + 'kaksitorninen kirkko.',
        selite: 'Kuvassa näkyvät matalat talot, pellot ja kaupungin siluetti kauempana. '
          + 'Etualalla tie kaartaa sillan yli.',
        lahde: 'Valokuva: Tuntematon, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zarasai,_senoji_panorama.jpeg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-zarasai-e0bf1510.jpg',
        lyhyt: 'Vanhauskoisten esirukouksen kirkko punaisine kattoineen ja sipulikupolisine '
          + 'torneineen.',
        selite: 'Vanhauskoiset ovat ortodoksinen yhteisö, jonka ensimmäinen kirkko Zarasaissa '
          + 'rakennettiin vuonna 1735 Barauka-alueelle. Kuvassa on vanhauskoisten Neitsyt '
          + 'Marian esirukouksen kirkko.',
        lahde: 'Valokuva: Vilensija, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Vilensija',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Zarasai,_sentiki%C5%B3_cerkv%C4%97.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Zarasai',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Miksi Zarasain keskusta rakennettiin vuonna 1837 hevosenkengän muotoiseksi?',
      'Mikä kansa antoi Zarasaille nimen, joka viittaa järviin?',
    ],
    korostukset: ['seloonit|seloonien', 'Novoaleksandrovsk|Novoaleksandrovskiksi'],
    nappi: 'Vuonna 1873 nimeltään Novoaleksandrovsk; hevosenkengän muotoinen keskusta oli '
      + 'rakennettu 1837',
    // 26.25 E / 55.7333 N — en-Wikipedia "Zarasai"
    laudat: {
      maailmankartta: { x: 6708.3, y: 1131.6 },
      europe: { x: 715.2, y: 427.8 },
    },
    teksti: 'Zarasai on Koillis-Liettuan kaupunki, jota ympäröivät lukuisat järvet ja joet. '
      + 'Sen nimi juontuu seloonien kielen sanasta, joka tarkoittaa järveä. Virallinen '
      + 'perustamisvuosi on 1506, ja sijainti oli suuren kauppatien varrella Riiasta '
      + 'Pihkovaan. Vuoden 1834 tulipalo poltti lähes koko keskustan, ja vuonna 1837 se '
      + 'rakennettiin uudelleen uuden kaavan mukaan: keskellä on hevosenkengän muotoinen '
      + 'aukio, josta kadut säteilevät. Tarkoitus oli ehkäistä suuria tulipaloja, ja kaava '
      + 'on säilynyt lähes muuttumattomana. Tsaari Nikolai I vieraili kaupungissa vuonna '
      + '1836 ja nimesi sen poikansa mukaan Novoaleksandrovskiksi; nimi säilyi vuoteen '
      + '1918.',
    lahde: 'en-Wikipedia "Zarasai", johdanto-osa ja osiot "Etymology" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-birstonas',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-birstonas-a7cd53c1.jpg',
      lyhyt: 'Birštonasin keskusta ja Nemunas-joki ilmasta nähtynä.',
      selite: 'Kaupunki levittäytyy joen rannalle metsien ja puistojen keskelle. Ympäristö on '
        + 'mäntymetsiä ja Nemunas-joen mutkia.',
      lahde: 'Valokuva: Rudolf H. Boettcher, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Rudolf H. Boettcher',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Birstonas_by_air_1rhb.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-birstonas-777a0e81.jpg',
        lyhyt: 'Birštonasin museon romanttinen puuvilla torneineen ja koristeellisine '
          + 'parvekkeineen.',
        selite: 'Metsänhoitaja Antanas Katelė rakennutti huvilan. Museona se on toiminut '
          + 'vuodesta 1967.',
        lahde: 'Valokuva: Martina, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Martina',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Birstonomuziejus.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/ltu-nosto-birstonas-df817f00.jpg',
        lyhyt: 'Näkymä Vytautas-kukkulalta Nemunas-joen mutkaan syksyisessä maisemassa.',
        selite: 'Kukkulalla suuriruhtinas Vytautasilla oli metsästyshuvila. Ylös kiipeäminen '
          + 'on Birštonasin vieraille perinne.',
        lahde: 'Valokuva: Anaiptol, Wikimedia Commons (CC0).',
        tekija: 'Anaiptol',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vaizdas_nuo_Vytauto_piliakalnio1_2018.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Birštonas',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mistä Birštonasin nimi mahdollisesti tulee?',
      'Miksi suuriruhtinaat matkustivat Birštonasiin jo 1300-luvulla?',
    ],
    korostukset: ['Nemunas|Nemunas-joen', 'suuriruhtinaat|suuriruhtinaat'],
    nappi: 'Nemunas-joen kylpylä, joka oli perustettu vain 27 vuotta aiemmin, vuonna 1846',
    // 24.0206 E / 54.6028 N — en-Wikipedia "Birštonas"
    laudat: {
      maailmankartta: { x: 6634, y: 1184.1 },
      europe: { x: 672.4, y: 457.5 },
    },
    teksti: 'Birštonas on kylpyläkaupunki Nemunas-joen oikealla rannalla noin 30 kilometrin '
      + 'päässä Kaunasista. Paikka mainitaan ensi kertaa 1300-luvulla Saksalaisen '
      + 'ritarikunnan kronikoissa "suolaisen veden tilana". Liettuan suuriruhtinaat ja '
      + 'aatelisto viettivät siellä metsästysretkiä 1300–1500-luvuilla, ja kylpylä '
      + 'perustettiin vuonna 1846. Venäläisistä, puolalaisista ja liettualaisista '
      + 'kaupungeista tulleet vieraat hakivat sieltä hoitoa kivennäisvedellä ja '
      + 'parantavilla mutakääreillä. Nykyään kaupungissa on kolme suurta sanatoriota, ja '
      + 'se on Nemunas-mutkien alueellisen puiston keskus.',
    lahde: 'en-Wikipedia "Birštonas", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Birštonas perustettiin kylpyläksi?',
      vaihtoehdot: [
        'vuonna 1382',
        'vuonna 1529',
        'vuonna 1966',
        'vuonna 1846',
      ],
      oikea: 3,
      fakta: 'Birštonasin jazzfestivaali on Liettuan vanhin kansainvälinen jazzfestivaali. Se '
        + 'on tehnyt kylpyläkaupungista maan jazzin Mekan.',
    },
  },
];
