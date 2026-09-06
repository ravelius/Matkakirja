/*
 * MAASTOKOHTEET — PAK. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs PAK --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/PAK.json. Työkalu laskee laudan
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
 * Pakistanin maastokohteet. Faktat en-Wikipediasta 30.8.2026. K2 on maan tunnusvuori ja maailman toiseksi korkein; Indus on koko maan elämänlanka ja Arabianmeri sen päätepiste.
 */
export const MAASTOKOHTEET_PAK = [
  {
    id: 'k2',
    nimi: 'K2',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi K2:lla ei ole oikeaa nimeä?',
      'Miksi K2 on vaarallisempi kuin Everest?',
    ],
    korostukset: ['Karakorum|Karakorumin'],
    nappi: 'Julma vuori',
    // 76.5133 E / 35.8825 N — en-Wikipedia "K2"
    laudat: {
      maailmankartta: { x: 8383.8, y: 1962 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'K2 on 8 611-metrisenä maailman toiseksi korkein vuori — vain Everest on korkeampi. Se '
      + 'sijaitsee Karakorumin vuoristossa Pakistanin ja Kiinan hallitsemien alueiden rajalla. '
      + 'Vuorikiipeilijät kutsuvat sitä Julmaksi vuoreksi: ennen vuotta 2021 arviolta yksi '
      + 'kiipeilijä kuoli jokaista neljää huipulle päässyttä kohti, ja vaikka Everestin huippu '
      + 'on ylempänä, K2 on nousuna vaikeampi ja vaarallisempi.',
    lahde: 'en-Wikipedia "K2", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'arabianmeri',
    nimi: 'Arabianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka syvä Arabianmeri on?',
      'Minne Arabianmereltä pääsee purjehtimaan?',
    ],
    korostukset: ['Bab-el-Mandeb|Bab-el-Mandebin'],
    nappi: 'Valtameren porttikäytävä',
    // 66 E / 23.8 N — ulappa Karachin edustalla; artikkelin oma keskipiste on 65 / 14
    laudat: {
      maailmankartta: { x: 8033.3, y: 2403.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Arabianmeri on Intian valtameren pohjoisosa Arabian niemimaan, Pakistanin ja Intian '
      + 'välissä: pinta-alaa 3 862 000 neliökilometriä ja syvyyttä enimmillään 5 395 metriä. '
      + 'Lännessä Adeninlahti johtaa siltä Bab-el-Mandebin salmen kautta Punaisellemerelle ja '
      + 'luoteessa Omaninlahti Persianlahdelle. Sen salmet ovat yhdistäneet idän ja lännen '
      + 'valtakuntia jo antiikin ajoista.',
    lahde: 'en-Wikipedia "Arabian Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'indus',
    nimi: 'Indus',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Indus saa alkunsa?',
      'Miksi kokonainen sivilisaatio syntyi juuri tämän joen varteen?',
    ],
    korostukset: ['Himalaja|Himalajan'],
    nappi: 'Pakistanin elämänlanka',
    // 68.85 E / 27.7 N — Sukkurin kohta joen keskijuoksulla; artikkelin koordinaatti 67,435 / 23,995 on suistossa Karachin luona
    laudat: {
      maailmankartta: { x: 8128.3, y: 2264.2 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Indus on 3 180 kilometriä pitkä ylirajainen virta, joka alkaa Tiibetistä nimellä '
      + 'Sengge Zangbo, kiertää Himalajan Nanga Parbatin massiivin ja kääntyy sitten etelään '
      + 'halki koko Pakistanin. Se laskee Arabianmereen satamakaupunki Karachin lähellä. '
      + 'Tasangolla siihen yhtyy Panjnad, johon Punjabin viisi jokea — Chenab, Jhelum, Ravi, '
      + 'Beas ja Sutlej — ovat jo yhtyneet.',
    lahde: 'en-Wikipedia "Indus River", johdanto-osa (tarkistettu 30.8.2026).',
  },
  /* ───── KOHTEET (8) — ERÄ M14, AASIA 4, 6.9.2026 ──────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Pakistanilla oli ennen tätä erää kolme maastokohdetta (K2,
   * Arabianmeri, Indus) eikä yhtäkään kohdetta, eläintäkyä tai
   * skandaalia. Maastokiintiö oli siis täynnä ja koko vaje kohteissa:
   * tästä erästä tuli kahdeksan kohdetta.
   *
   * VAIN MAAILMANKARTAN RIVI (Raamattu 30.8.2026). Koordinaatit on
   * laskettu koneella tools/johda-maastokohteet.mjs:n vientifunktiolla
   * `laudat(lon, lat)`; lon/lat on luettu en-Wikipedian
   * coordinates-propista tai — kun prop on tyhjä — artikkelin oman
   * infolaatikon {{coord}}-mallista, ja kumpi kulloinkin, se lukee
   * kohteen koordinaattirivillä. Jokainen piste osuu maan fokuslehden
   * rajaukseen (x 7764,3…8498,9 ja y 1824,1…2491,2).
   *
   * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
   * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
   * Makli 28,0 lautayksikön päässä Karachista, ja raja
   * KAUPUNGIN_KOHDALLA_SADE on 7.
   *
   * LAHORE JÄI KOHDELISTALTA POIS, ja syy on mitattu: maan Kohinoor-
   * skandaali (js/packs/skandaalit.js) asuu Lahoressa, jossa vuoden
   * 1849 sopimus allekirjoitettiin, ja Lahoren linnoituksen nimiö
   * tulisi sen päälle. Kaupungin tarina kerrotaan siis skandaalin
   * kortissa. Khunjerabin sola jätettiin pois, koska sen artikkelilla
   * ei ole koordinaattia ja koska kortista tulisi rajakortti.
   *
   * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
   * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
   */
  {
    id: 'mohenjo-daro',
    nimi: 'Mohenjo-daro',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kaupungin oikeaa nimeä ei tiedetä?',
      'Mikä oli suuri kylpylä?',
    ],
    korostukset: ['Indus-kulttuurin|Indus-kulttuurin'],
    nappi: 'Kuolleiden kumpu ruutukaavassa',
    // 68.13889 E / 27.32917 N — en-Wikipedia "Mohenjo-daro"
    // (coordinates-prop). Lähin pelikaupunki Karachi 90,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 8104.6, y: 2277.6 },
    },
    teksti: 'Mohenjo-daro rakennettiin noin 2500 eaa., ja se oli Indus-kulttuurin '
      + 'suurimpia asutuksia ja yksi maailman ensimmäisiä suurkaupunkeja — aikalainen '
      + 'muinaiselle Egyptille ja Mesopotamialle. Väkeä oli arviolta ainakin 40 000. '
      + 'Kaupunki noudattaa ruutukaavaa: talot ovat poltettua tiiltä, kadut suoria ja '
      + 'jätevesi johdettiin katettuihin viemäreihin. Ylälinnan päällä olivat julkiset '
      + 'kylpylät, noin viidelle tuhannelle asukkaalle mitoitettu rakennus ja kaksi suurta '
      + 'kokoushuonetta. Alkuperäistä nimeä ei tunneta; nykyinen tarkoittaa sindhiksi '
      + 'kuolleiden kumpua. Paikka hylättiin noin 1700 eaa. ja löydettiin uudelleen '
      + '1920-luvulla; Unescon maailmanperintökohteeksi se tuli 1980 ensimmäisenä koko '
      + 'Etelä-Aasiassa.',
    lahde: 'en-Wikipedia "Mohenjo-daro", johdanto sekä osiot "Etymology" ja "Architecture '
      + 'and urban infrastructure" (tarkistettu 6.9.2026).',
  },
  {
    id: 'taxila',
    nimi: 'Taxila',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka valtasi kaupungin ilman taistelua?',
      'Kuka kaivoi rauniot esiin?',
    ],
    korostukset: ['Gandhāran|Gandhāran'],
    nappi: 'Vanha oppikeskus kahden maanosan risteyksessä',
    // 72.7875 E / 33.74583 N — en-Wikipedia "Taxila"
    // (coordinates-prop). Lähin pelikaupunki Kabul 122,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 8259.6, y: 2042.5 },
    },
    teksti: 'Taxila eli Takshashila on Punjabin Pothohar-ylängöllä ja yksi Etelä-Aasian '
      + 'vanhimmista kaupungeista: se perustettiin noin 1000 eaa. Vanha Taxila oli aikanaan '
      + 'Gandhāran kuningaskunnan pääkaupunki, ja se seisoi Indus-joen itärannalla eli '
      + 'juuri siinä kohdassa, jossa Intian niemimaa ja Keski-Aasia kohtaavat. Vuonna 326 '
      + 'eaa. Aleksanteri sai kaupungin ilman taistelua, koska se antautui heti; sen '
      + 'jälkeen sitä hallitsivat vuorollaan Maurya-, indokreikkalainen, indoskyyttiläinen, '
      + 'kušana- ja guptavaltakunta. Kauppateiden hiivuttua kaupunki menetti merkityksensä. '
      + 'Rauniot löysi uudelleen brittiarkeologi Alexander Cunningham 1800-luvun puolivälissä '
      + 'ja niitä kaivoi laajasti John Marshall; maailmanperintökohde 1980. Joidenkin '
      + 'arvioiden mukaan Taxilan muinainen yliopisto oli Etelä-Aasian varhaisimpia '
      + 'oppikeskuksia.',
    lahde: 'en-Wikipedia "Taxila", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'makli',
    nimi: 'Makli',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä paikka sai nimensä?',
      'Ketä kummulle on haudattu?',
    ],
    korostukset: ['nekropoli|nekropoleista'],
    nappi: 'Puoli miljoonaa hautaa yhdellä ylängöllä',
    // 67.902 E / 24.760 N — en-Wikipedia "Makli Necropolis" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Karachi 28,0
    // lautayksikköä; koko erän lähin merkki.
    laudat: {
      maailmankartta: { x: 8096.7, y: 2369.2 },
    },
    teksti: 'Makli on yksi maailman suurimmista nekropoleista: kymmenen kilometrin '
      + 'matkalla Thattan kaupungin liepeillä Sindhissä on arviolta 500 000–miljoona '
      + 'hautaa, jotka rakennettiin neljänsadan vuoden aikana. Joukossa on suuria '
      + 'hautamonumentteja hallitsijoille, sufipyhimyksille ja arvostetuille oppineille. '
      + 'Unesco merkitsi paikan maailmanperintöluetteloon 1981 poikkeuksellisena '
      + 'todistuksena sindhiläisestä sivilisaatiosta 1300–1700-luvuilla. Nimen sanotaan '
      + 'juontuvan tarinasta, jossa pyhiinvaeltaja pysähtyi paikalle ja julisti sen omaksi '
      + 'Mekakseen; sufipyhimys Sheikh Hamad Jamali antoi kummulle nimen Makli, pieni '
      + 'Mekka.',
    lahde: 'en-Wikipedia "Makli Necropolis", johdanto sekä osiot "Location" ja "Etymology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'rohtasin-linnoitus',
    nimi: 'Rohtasin linnoitus',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka linnoituksen rakennutti ja ketä vastaan?',
      'Miksi linnoitusta sanotaan eläväksi?',
    ],
    korostukset: ['Sher Shah Suri|Sher Shah Suri'],
    nappi: 'Linnoitus, jonka sisällä asutaan yhä',
    // 73.57528 E / 32.96861 N — en-Wikipedia "Rohtas Fort"
    // (coordinates-prop). Lähin pelikaupunki Kabul 156,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 8285.8, y: 2071.5 },
    },
    teksti: 'Rohtasin linnoitus on 1500-luvulla rakennettu jättiläinen Jhelumin '
      + 'piirikunnassa Punjabissa, ja se on yhä lähes ehjä. Sen rakennutti Sur-valtakunnan '
      + 'perustaja Sher Shah Suri, ja työtä valvoi Raja Todar Mal; tarkoitus oli murtaa '
      + 'kapinoivan gakhar-heimon vastarinta Suolavuoriston seudulla. Linnoitus nousi '
      + 'kukkulalle Tilla Jogianin vuorijonossa, 91 metriä ympäristöään korkeammalle, ja se '
      + 'peittää 70 hehtaaria. Yli kolmasosalla linnoituksen alasta on Rohtasin kylä, jossa '
      + 'on asuttu yhtäjaksoisesti Islam Shah Surin ajoista asti — se tekee Rohtasista '
      + 'yhden maailman harvoista elävistä linnoituksista. Unesco kutsui sitä 1997 '
      + 'poikkeukselliseksi esimerkiksi Keski- ja Etelä-Aasian sotilasarkkitehtuurista.',
    lahde: 'en-Wikipedia "Rohtas Fort", johdanto sekä osiot "Location" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'takht-i-bahi',
    nimi: 'Takht-i-Bahi',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Takht-i-Bahi tarkoittaa?',
      'Kuinka kauan luostari oli käytössä?',
    ],
    korostukset: ['Gandhāran|Gandhāran'],
    nappi: 'Lähteen valtaistuin vuoren päällä',
    // 71.94667 E / 34.28611 N — en-Wikipedia "Takht-i-Bahi" (artikkelin
    // infolaatikon coord). Lähin pelikaupunki Kabul 91,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 8231.6, y: 2022.3 },
    },
    teksti: 'Takht-i-Bahi on indoparthialaisajan buddhalaisen luostarin kaivauspaikka '
      + 'Mardanissa Khyber Pakhtunkhwan maakunnassa. Sitä pidetään yhtenä koko Gandhāran '
      + 'alueen tärkeimmistä buddhalaisista muistomerkeistä. Luostari perustettiin '
      + 'ensimmäisellä vuosisadalla jaa., ja se oli käytössä 600-luvulle asti eli noin '
      + 'kuusisataa vuotta. Arkeologit pitävät sitä erityisen edustavana esimerkkinä '
      + 'aikansa buddhalaisen luostarikeskuksen arkkitehtuurista, ja Unesco kutsui sitä '
      + '1980 poikkeuksellisen hyvin säilyneeksi. Nimen alkuperä on epävarma: persiaksi '
      + 'takht on huippu tai valtaistuin ja bahi lähde, ja paikallisen selityksen mukaan '
      + 'nimi viittaa kukkulan kahteen lähteeseen.',
    lahde: 'en-Wikipedia "Takht-i-Bahi", johdanto-osa ja osio "Etymology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'khewran-suolakaivos',
    nimi: 'Khewran kaivos',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kenen hevoset löysivät suolan?',
      'Kuka kaivoi nykyisen päätunnelin?',
    ],
    korostukset: ['haliitti|haliittia'],
    nappi: 'Maailman toiseksi suurin suolakaivos',
    // 73.00839 E / 32.64794 N — en-Wikipedia "Khewra Salt Mine"
    // (artikkelin infolaatikon coord). Lähin pelikaupunki Kabul 144,5
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 8266.9, y: 2083.5 },
    },
    teksti: 'Khewran suolakaivos on maailman toiseksi suurin suolakaivos. Se on Jhelumin '
      + 'piirikunnassa Punjabissa, Pothohar-ylängön Suolavuoristossa, joka kohoaa Induksen '
      + 'tasangolta. Kaivos tunnetaan vaaleanpunaisesta khewransuolastaan, jota myydään '
      + 'usein himalajansuolan nimellä, ja se on suuri matkailukohde: vierailijoita on '
      + 'jopa 250 000 vuodessa. Löytö ajoitetaan tarinan mukaan vuoteen 326 eaa., jolloin '
      + 'Aleksanterin joukot huomasivat sen; kauppa alkoi mogulien aikana. Nykyisen '
      + 'maanpinnan tasossa kulkevan päätunnelin louhi kaivosinsinööri H. Warth vuonna '
      + '1872. Kaivos tuottaa yhä yli 350 000 tonnia suolaa vuodessa, ja se on noin 99 '
      + 'prosenttisesti puhdasta haliittia.',
    lahde: 'en-Wikipedia "Khewra Salt Mine", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'deosai',
    nimi: 'Deosai',
    // Ylänkö ei ole vuori-, joki- eikä meriotsakkeen kohde ja
    // maastokiintiö on jo täynnä: tyyppi 'muu' + symboli 'luonto'.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä nimi Deosai tarkoittaa?',
      'Minkä eläimen takia puisto perustettiin?',
    ],
    korostukset: ['ylätasanko|ylätasangon'],
    nappi: 'Jättiläisen varjo neljän kilometrin korkeudessa',
    // 75.4 E / 34.9667 N — en-Wikipedia "Deosai National Park"
    // (artikkelin infolaatikon coord). Lähin pelikaupunki Kašgar 175,0
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 8346.7, y: 1996.7 },
    },
    teksti: 'Deosain kansallispuisto on alpiininen ylätasanko Skardun ja Astoren välissä '
      + 'Pakistanin hallinnoimassa Gilgit-Baltistanissa, läntisellä Himalajalla lähellä '
      + 'Karakoramia ja Nanga Parbatin itäpuolella. Keskikorkeus on 4 114 metriä, mikä '
      + 'tekee siitä maailman toiseksi korkeimman ylätasangon Tiibetin Changtangin '
      + 'jälkeen; suojeltua alaa on 843 neliökilometriä. Nimi tulee shinan sanoista deo, '
      + 'jättiläinen, ja sai, varjo. Baltit kutsuvat aluetta nimellä Ghbiarsa, kesäpaikka, '
      + 'koska sinne pääsee vain kesällä. Puisto perustettiin 1993 himalajanruskeakarhun '
      + 'suojelemiseksi, ja karhukanta on kasvanut 19 yksilöstä 78:aan vuoteen 2022 '
      + 'mennessä. Keväällä tasanko peittyy kukkiin ja perhosiin.',
    lahde: 'en-Wikipedia "Deosai National Park", johdanto sekä osiot "Etymology", '
      + '"Geography" ja "Fauna and flora" (tarkistettu 6.9.2026).',
  },
  {
    id: 'mehrgarh',
    nimi: 'Mehrgarh',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä Mehrgarhissa opittiin ensin?',
      'Mikä yhdistää Mehrgarhin Mohenjo-daroon?',
    ],
    korostukset: ['neoliittinen|neoliittinen'],
    nappi: 'Etelä-Aasian varhaisin maanviljelyskylä',
    // 67.6167 E / 29.3833 N — en-Wikipedia "Mehrgarh"
    // (coordinates-prop). Lähin pelikaupunki Karachi 158,2
    // lautayksikköä.
    laudat: {
      maailmankartta: { x: 8087.2, y: 2203.4 },
    },
    teksti: 'Mehrgarh on neoliittinen kaivauspaikka Balochistanin Kacchin tasangolla '
      + 'Bolanin solan kupeessa, ja se on Etelä-Aasian varhaisimpia paikkoja, joista '
      + 'tunnetaan sekä maanviljely että karjanhoito. Ranskalainen tutkimusretkikunta '
      + 'Jean-François ja Catherine Jarrigen johdolla löysi sen 1974, ja kuudesta '
      + 'kummusta on kaivettu esiin noin 32 000 esinettä. Varhaisin asutus oli pieni '
      + 'maanviljelijäkylä. Asukkaat asuivat polttamattomasta savitiilestä muuratuissa '
      + 'taloissa, varastoivat viljansa aittoihin ja vuorasivat suuret korinsa bitumilla; '
      + 'he viljelivät kuusirivistä ohraa, einkorn- ja emmervehnää, jujubeja ja taateleita '
      + 'ja pitivät lampaita, vuohia ja nautoja. Mehrgarhin kaltaisesta kulttuurista kasvoi '
      + 'aikanaan Indus-laakson sivilisaatio.',
    lahde: 'en-Wikipedia "Mehrgarh", johdanto sekä osiot "History" ja "Lifestyle and '
      + 'technology" (tarkistettu 6.9.2026).',
  },
];
