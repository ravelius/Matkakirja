/*
 * MAASTOKOHTEET — LBY. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs LBY --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/LBY.json. Työkalu laskee laudan
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
 * Libyan maastokohteet. Faktat en-Wikipediasta 30.8.2026. Libyassa ei ole pysyviä jokia, joten joen paikalla on toinen meri: Iso-Syrtti (fi-Wikipedian nimi; en "Gulf of Sidra").
 *
 * MAAILMAN ERÄ M15 (6.9.2026) lisäsi listaan seitsemän KOHDETTA —
 * Sabratha, Kyrene, Ptolemais, Ghadames, Tadrart Acacus, Garama ja
 * Ubarin hiekkameri. Kahdeksas kohde on maan oma Leptis Magna
 * (js/packs/fokuskohteet-lby.js), jota EI ole toistettu täällä.
 * Lähin uusi merkki on Sabratha 24,9 lautayksikön päässä
 * Tripolista (KAUPUNGIN_KOHDALLA_SADE 7), joten kaikki seitsemän
 * ovat pääkartan merkkejä. Erä on kuvaton, ja jokaisen kohteen
 * lähin pelikaupunki on kirjattu sen koordinaattirivin viereen.
 */
export const MAASTOKOHTEET_LBY = [
  {
    id: 'bikkubitti',
    nimi: 'Bikku Bitti',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi ensimmäinen huiputus onnistui vasta 2005?',
      'Missä Tibestin vuoristo on?',
    ],
    korostukset: ['Tibesti|Tibestin'],
    nappi: 'Huippu, jolle noustiin vasta 2005',
    // 19.2067 E / 22.0036 N — en-Wikipedia "Bikku Bitti"
    laudat: {
      maailmankartta: { x: 6473.6, y: 2466.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Bikku Bitti eli Bette on Libyan korkein vuori: noin 2 267 metriä. Se sijaitsee '
      + 'Tibestin vuoriston Dohonen haarakkeessa syvällä eteläisessä autiomaassa, lähellä '
      + 'Tšadin rajaa. Vuori on niin syrjäinen, että ensimmäinen tunnettu nousu huipulle '
      + 'tehtiin vasta joulukuussa 2005, kun brittiläinen Ginge Fullen onnistui kahden '
      + 'epäonnistuneen yrityksen jälkeen.',
    lahde: 'en-Wikipedia "Bikku Bitti", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Välimerta sanotaan lännen sivilisaation kehdoksi?',
      'Montako reunamerta Välimereen kuuluu?',
    ],
    nappi: 'Antiikin valtatie',
    // 13.5 E / 33.3 N — ulappa Tripolin edustalla; en-Wikipedia "Mediterranean Sea" antaa keskipisteeksi 18 / 35
    laudat: {
      maailmankartta: { x: 6283.3, y: 2059.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Välimeri on Euroopan, Aasian ja Afrikan välissä lepäävä meri, jonka rantaa koko Libyan '
      + 'pitkä rannikko on. Meri on lähes kokonaan maan ympäröimä ja peittää noin 2,5 miljoonaa '
      + 'neliökilometriä. Antiikissa se oli kauppiaiden, matkalaisten ja siirtolaisten '
      + 'valtatie, jonka ääreltä nousivat Egyptin, Kreikan ja hedelmällisen puolikuun varhaiset '
      + 'korkeakulttuurit — siksi sitä on kutsuttu lännen sivilisaation hautomoksi.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'isosyrtti',
    nimi: 'Iso-Syrtti',
    tyyppi: 'meri',
    kysymykset: [
      'Missä Pieni-Syrtti sijaitsee?',
      'Mistä lahden nykyiset nimet tulevat?',
    ],
    nappi: 'Antiikin Syrtis Major',
    // 18 E / 31.5 N — en-Wikipedia "Gulf of Sidra" (18 / 31,5)
    laudat: {
      maailmankartta: { x: 6433.3, y: 2125.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Iso-Syrtti on Välimeren suuri lahti Libyan pohjoisrannikolla. Antiikin aikaan se '
      + 'tunnettiin nimellä Syrtis Major erotuksena Tunisian rannikon Pienestä-Syrtistä eli '
      + 'Syrtis Minorista. Nykyiset nimet Gulf of Sidra ja Gulf of Sirte tulevat Sidran '
      + 'öljysatamasta ja Sirten kaupungista.',
    lahde: 'en-Wikipedia "Gulf of Sidra", johdanto-osa (tarkistettu 30.8.2026).',
  },

  /* ==============================================================
   * MAAILMAN ERÄ M15, AFRIKKA 5 6.9.2026 — SEITSEMÄN KOHDETTA.
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Libyalla oli kolme maastokohdetta ja yksi kohde,
   * Leptis Magna (js/packs/fokuskohteet-lby.js). Kohdetavoite on
   * kahdeksan, joten tässä erässä kirjoitettiin seitsemän uutta —
   * eikä Leptis Magnaa ole toistettu; se mainitaan vain Sabrathan
   * kortissa siltä osin kuin lähde nämä kaksi yhdistää.
   * Kaikki seitsemän ovat pääkartan merkkejä: etäisyys mitattiin
   * jokaiseen js/packs/maailmankartta.js CITIES-kaupunkiin, ja lähin
   * uusi merkki on Sabratha 24,9 lautayksikön päässä Tripolista
   * (raja KAUPUNGIN_KOHDALLA_SADE on 7, js/fokuskohteet.js).
   *
   * KOLME EHDOKASTA JÄI POIS. Apollonia on 4,7 lautayksikköä
   * Kyrenestä (nimiölimitys) ja mainitaan Kyrenen kortissa maan
   * satamana; Ubarin kaupunki on 9,9 yksikköä Germasta; ja Gaberoun
   * 18,2 yksikköä Germasta, joten Ubarin hiekkameri sai merkkinsä
   * lännempää erämaan omalta koordinaatilta. Kuvaton erä; faktat
   * en-Wikipedian raakatekstistä 6.9.2026, ja jokainen `lahde`-rivi
   * kertoo artikkelin osan.
   * ============================================================== */
  {
    id: 'sabratha',
    nimi: 'Sabratha',
    tyyppi: 'historia',
    kysymykset: [
      'Mitkä olivat Rooman Tripoliksen kolme kaupunkia?',
      'Miksi kaupunki kutistui kyläksi?',
    ],
    korostukset: ['mosaiikki|mosaiikit'],
    nappi: 'Kolmen kaupungin läntisin',
    // 12.4842 E / 32.7922 N — en-Wikipedia "Sabratha"
    // Lähin pelikaupunki: Tripoli 24,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6249.5, y: 2078.1 },
    },
    teksti: 'Sabratha oli läntisin Rooman Tripoliksen "kolmesta kaupungista" Oean ja Leptis '
      + 'Magnan rinnalla, ja se sijaitsee Välimeren rannalla nykyisestä Tripolista länteen. '
      + 'Satama perustettiin ehkä noin 500 eaa. foinikialaiseksi kauppapaikaksi nimeltä '
      + 'Tsabratan, ja sitä kautta kulki Afrikan sisämaan tavara. Karthagon tappion jälkeen '
      + 'kaupunki kuului hetken Massinissan Numidiaan ja liitettiin sitten Roomaan; '
      + 'huippukautensa se eli Septimius Severuksen suvun aikana 100- ja 200-luvuilla, jolloin '
      + 'se lähes kaksinkertaistui. Raunioissa on kolmikerroksisen taustaseinänsä säilyttänyt '
      + 'teatteri sekä Liber Paterin, Serapiin ja Isiksen temppelit, ja parhaiten säilyneet '
      + 'mosaiikit ovat rantaan avautuvissa forumin kylpylöissä. Maanjäristykset vaurioittivat '
      + 'kaupunkia pahoin 300-luvulla, erityisesti vuoden 365 järistys, ja sadan vuoden kuluessa '
      + 'muslimivalloituksesta kauppa oli siirtynyt muihin satamiin ja Sabrathasta oli tullut '
      + 'kylä. Unescon maailmanperintökohde 1982.',
    lahde: 'en-Wikipedia "Sabratha", johdanto-osa sekä osiot "History" ja "Archaeology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kyrene',
    nimi: 'Kyrene',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli silfium?',
      'Ketkä olivat kyreneläiset filosofit?',
    ],
    korostukset: ['silfium|silfiumista'],
    nappi: 'Kreikkalainen kaupunki Afrikassa',
    // 21.8625 E / 32.8225 N — en-Wikipedia "Cyrene, Libya"
    // Lähin pelikaupunki: Kreeta 147,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6562.1, y: 2077 },
    },
    teksti: 'Kyrene oli muinainen kreikkalainen siirtokunta ja roomalainen kaupunki '
      + 'Koillis-Libyassa, ja se antoi koko seudulle nimen Kyrenaika. Sen perustivat '
      + 'todennäköisesti Theran eli nykyisen Santorinin siirtolaiset 600-luvun eaa. lopulla, ja '
      + 'sitä hallitsi aluksi Battiadien kuningassuku, joka rikastui hevosista ja silfiumista, '
      + 'lääkekasvista, jota kaupunki vei ulkomaille. Kaupunki oli 300-luvulla eaa. '
      + 'kyreneläisen filosofikoulun kotipaikka; koulun perusti Sokrateen oppilas Aristippos. '
      + 'Rooman valtaan Kyrene siirtyi 96 eaa., ja vuosien 262 ja 365 maanjäristykset '
      + 'runtelivat sen. Vuoden 642 muslimivalloituksen jälkeen paikka autioitui, kunnes '
      + 'italialaiset perustivat sinne sotilastukikohdan 1913 — ja tukikohtaa rakentaessaan '
      + 'sotilaat löysivät päättömän marmoripatsaan, "Kyrenen Venuksen", joka vietiin Roomaan ja '
      + 'palautettiin Libyaan vasta 2008. Unescon maailmanperintökohde 1982.',
    lahde: 'en-Wikipedia "Cyrene, Libya", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ptolemais',
    nimi: 'Ptolemais',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä oli Pentapolis?',
      'Mihin kaupunki tarvitsi seitsemäätoista sisternaa?',
    ],
    korostukset: ['vesisäiliö|vesisäiliötä'],
    nappi: 'Hiekan säilömä ruutukaava',
    // 20.9529 E / 32.7069 N — en-Wikipedia "Ptolemais, Cyrenaica"
    // Lähin pelikaupunki: Kreeta 174,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6531.8, y: 2081.3 },
    },
    teksti: 'Ptolemais oli yksi Kyrenaikan Pentapoliksen eli viiden kaupungin liiton jäsenistä '
      + 'Kyrenen, Euesperideen, Taucheiran ja Apollonian rinnalla. Sen perusti ja nimesi joku '
      + 'Ptolemaiosten hallitsijoista, luultavasti Ptolemaios III Euergetes (246–221 eaa.), joka '
      + 'muutti pienen kreikkalaissataman 280 hehtaarin kaupungiksi muureineen. Roomalle '
      + 'kaupunki siirtyi 96 eaa., ja Diocletianuksen hallintouudistuksessa siitä tuli Libya '
      + 'Pentapoliksen pääkaupunki. Hiekan alle hautautuneet rauniot ovat säilyneet '
      + 'poikkeuksellisen hyvin: 1930-luvulla alkaneet kaivaukset paljastivat suorakulmaisen, '
      + 'noin 1 650 kertaa 1 400 metrin ruutukaavan, jossa oli hippodromi, amfiteatteri ja kolme '
      + 'teatteria. Vettä toi yli kahdeksan kilometrin päästä luultavasti Hadrianuksen aikainen '
      + 'akvedukti, ja Sisternojen aukion alla on seitsemäntoista holvattua vesisäiliötä, joihin '
      + 'mahtui 7 000 kuutiometriä vettä.',
    lahde: 'en-Wikipedia "Ptolemais, Cyrenaica", johdanto-osa sekä osiot "History" ja "Remains" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ghadames',
    nimi: 'Ghadames',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi taloissa on kolme kerrosta kolmelle käyttötavalle?',
      'Mitä transsaharalaisella reitillä kuljetettiin?',
    ],
    korostukset: ['katutaso|katutasolla'],
    nappi: 'Aavikon helmi kolmessa kerroksessa',
    // 9.5 E / 30.1333 N — en-Wikipedia "Ghadames"
    // Lähin pelikaupunki: Sahara 133,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6150, y: 2176 },
    },
    teksti: 'Ghadames on keidaskaupunki Luoteis-Libyassa lähellä Algerian ja Tunisian rajoja, ja '
      + 'sitä kutsutaan "aavikon helmeksi". Se on vanhimpia Saharan pohjoispuolisia '
      + 'asuinpaikkoja: arkeologisen aineiston perusteella seutu on ollut asuttu neljännestä '
      + 'vuosituhannesta eaa. Kaupungin talot on jaettu pystysuunnassa käyttötavan mukaan: '
      + 'katutasolla säilytettiin tavaraa, ensimmäisessä kerroksessa asui perhe, ja katolla '
      + 'olivat naisten avoimet terassit — kadut kulkevat katettuina alempien kerrosten välissä '
      + 'melkein maanalaisena käytäväverkkona. Ensimmäiset kirjalliset maininnat ovat Rooman '
      + 'ajalta, jolloin paikka tunnettiin nimellä Cydamus, ja Septimius Severuksen aikana '
      + 'sinne perustettiin pysyvä varuskunta. Arabivalloituksen jälkeen 600-luvun lopulla '
      + 'Ghadamesista tuli transsaharalaisen kaupan tukikohta, ja se pysyi sellaisena '
      + '1800-luvulle asti. Muurien ympäröimä vanhakaupunki, jossa jokaisella seitsemästä '
      + 'suvusta oli oma kortteli ja juhla-aukio, on Unescon maailmanperintökohde.',
    lahde: 'en-Wikipedia "Ghadames", johdanto-osa sekä osiot "Geography" ja "History" '
      + '("Ancient eras") (tarkistettu 6.9.2026).',
  },
  {
    id: 'tadrartacacus',
    nimi: 'Tadrart Acacus',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi aavikon kalliossa on kirahveja?',
      'Mikä oli Afrikan kostea kausi?',
    ],
    korostukset: ['kalliotaide|kalliotaiteestaan'],
    nappi: 'Kirahveja ja norsuja kalliossa',
    // 10.3333 E / 24.8333 N — en-Wikipedia "Acacus Mountains"
    // Lähin pelikaupunki: Sahara 86,7 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6177.8, y: 2366.6 },
    },
    teksti: 'Tadrart Acacus on vuorijono Länsi-Libyan aavikossa Ghatin kaupungista itään, ja se '
      + 'tunnetaan poikkeuksellisen runsaasta kalliotaiteestaan. Berberikielessä tadrart on '
      + 'sanan "vuori" feminiinimuoto. Metsästäjä-keräilijät asuivat alueella yhtäjaksoisesti '
      + 'koko holoseenin ajan, vaikka ilmasto vaihteli Afrikan kostean kauden aikana, ja '
      + 'eläinten kesyttäminen tuli seudulle noin 7 000 vuotta sitten. Maalaukset ja '
      + 'kaiverrukset ovat vuosilta 12 000 eaa. – 100 jaa., ja ne kertovat, miten seutu on '
      + 'muuttunut: kalliossa on kirahveja, norsuja, strutseja ja kameleita sekä ihmisiä, jotka '
      + 'soittavat ja tanssivat. Unescon maailmanperintökohde 1985.',
    lahde: 'en-Wikipedia "Acacus Mountains", johdanto-osa sekä osiot "Etymology", "Archaeology" '
      + 'ja "Rock art" (tarkistettu 6.9.2026).',
  },
  {
    id: 'germa',
    nimi: 'Garama',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä on foggara?',
      'Miten aavikkoon syntyi kaupunkiyhteiskunta?',
    ],
    korostukset: ['foggara|foggarat'],
    nappi: 'Garamanttien pääkaupunki',
    // 13.064 E / 26.544 N — en-Wikipedia "Germa"
    // Lähin pelikaupunki: Murzuk 114,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6268.8, y: 2305.7 },
    },
    teksti: 'Germa eli antiikin Garama oli Garamanttien kuningaskunnan pääkaupunki Fezzanissa. '
      + 'Garamantit olivat saharalainen kansa, joka asettui alueelle viimeistään 1000 eaa. ja '
      + 'jonka valtakunta kukoisti 600-luvulle jaa. asti. Heidän voimansa perustui '
      + 'vesitekniikkaan: he louhivat kalkkikivikerroksen alta fossiilista pohjavettä tunnelien '
      + 'ja kuilujen verkostolla, jota berberit kutsuvat nimellä foggarat, ja tunnelien '
      + 'kaivaminen ja kunnossapito tehtiin orjatyönä. Kastelu kannatteli maataloutta ja '
      + 'suurta väestöä, ja niin syntyi ensimmäinen suuren aavikon kaupunkiyhteiskunta, joka ei '
      + 'nojannut jokeen: Garamassa asui noin neljätuhatta ihmistä ja kylissä viiden kilometrin '
      + 'säteellä kuusituhatta lisää. Garamantit tekivät toistuvia ryöstöretkiä Rooman Afrikan '
      + 'rajan yli ja vetäytyivät aavikon turviin, kunnes keisari Septimius Severus marssi '
      + 'vuonna 203 syvälle Saharaan ja valtasi Garaman — mutta hylkäsi sen pian.',
    lahde: 'en-Wikipedia "Germa", johdanto-osa ja osio "History", sekä "Garamantes", johdanto-osa '
      + 'ja osio "Archaeology" (tarkistettu 6.9.2026).',
  },
  {
    id: 'idehanubari',
    nimi: 'Ubarin hiekkameri',
    tyyppi: 'muu',
    kysymykset: [
      'Mikä on erg?',
      'Miten hiekkameren keskellä voi olla järviä?',
    ],
    korostukset: ['erg|ergi'],
    nappi: 'Järviä hiekkameren keskellä',
    // 11.5 E / 27.5 N — en-Wikipedia "Idehan Ubari"
    // Lähin pelikaupunki: Sahara 105,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6216.7, y: 2271.4 },
    },
    teksti: 'Ubarin hiekkameri eli Idehan Ubari on noin 58 000 neliökilometrin laajuinen ergi '
      + 'Lounais-Libyan äärikuivassa Fezzanissa. Ergi tarkoittaa laajaa hiekkadyynialuetta, ja '
      + 'nimi idehan merkitsee tamasheq-kielessä hienoa hiekkaa. Hiekkameri on osa suurta '
      + 'Saharaa, ja se on saanut nimensä berberinkielisestä keidaskaupungista Ubarista. Alueen '
      + 'perinteisiä asukkaita ovat tuaregit, paimentolaisina eläneet berberit. Hiekkameren '
      + 'itäosassa Gaberounin keitaalla ovat Mandaran järvet.',
    lahde: 'en-Wikipedia "Idehan Ubari", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
];

