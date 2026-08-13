/*
 * Kaupunkikartan kohteiden omat nähtävyysjutut, avaimistettu
 * kaupungin id:llä ja sitten kohteen nimellä (täsmälleen sama nimi
 * kuin js/packs/maakartat.js KAUPUNKIKARTAT[kaupunki].kohteet[i].nimi).
 * js/ui.js piirraKaupunkiKartta yhdistää tämän kartan kohdeolioon
 * ajonaikaisesti, joten karttadataa (maakartat.js: koordinaatit,
 * kaupunkijulisteet, wiki-viitteet) ei tarvitse koskea uusia juttuja
 * lisättäessä.
 *
 * Rakenne on Lontoon malli (maakartat.js, Opuksen v350), mutta ilman
 * `wiki`-kenttää: omistajan spesifikaatio 8.8.2026 haluaa lähderiviksi
 * pelkän "Wikipedia"-maininnan, ei "Lue lisää" -linkkiä artikkeliin.
 * Tekstit ovat oma tiivis suomenkielinen kooste englanninkielisestä
 * Wikipediasta, ei käännös.
 *
 * Mitta on tarkoituksella lyhyt (omistajan korjaus 8.8.2026 Berliinin
 * pilotin jälkeen: "tämä on tarkoitettu lyhyeksi pop-up-lukuelämykseksi"):
 * 2-3 kappaletta ja yksi kuva per juttu, useampi kuva (max 2-3) vain kun
 * aihe kantaa sen. Hyvät lainaukset (Reagan, Reuter, Vrubel) säilyvät.
 */

export const NAHTAVYYSJUTUT = {
  berliini: {
    Valtiopäivätalo: {
      aika: '1894',
      teksti: 'Valtiopäivätalon suunnitteli arkkitehti Paul Wallot, ja se '
          + 'valmistui 1894. Se on 47 metriä korkea, ja kattoa koristi '
          + 'alun perin teräksestä ja lasista tehty kupoli — aikansa '
          + 'insinööritaidon näyte.'
        + '\n\n'
        + '27. helmikuuta 1933 rakennus paloi, ja Hitler käytti paloa '
          + 'tekosyynä kansalaisoikeuksien kaventamiseen. Toisessa '
          + 'maailmansodassa talo raunioitui, ja toukokuussa 1945 '
          + 'neuvostosotilaat pystyttivät katolle lipun kuuluisassa '
          + 'valokuvassa.'
        + '\n\n'
        + 'Sodan jälkeen talo seisoi tyhjänä Länsi-Berliinissä koko '
          + 'kylmän sodan ajan, kunnes Saksa yhdistyi 1990. Uusi '
          + 'lasikupoli nousi 1990-luvulla arkkitehti Norman Fosterin '
          + 'suunnitelmien mukaan: sen läpi näkee suoraan alla istuvien '
          + 'kansanedustajien saliin.',
      lainaus: {
        teksti: 'Ihr Völker der Welt … schaut auf diese Stadt! — Te '
          + 'maailman kansat … katsokaa tätä kaupunkia!',
        lahde: 'Pormestari Ernst Reuter yli 300 000 berliiniläiselle talon '
          + 'edustalla 9. syyskuuta 1948, kun Neuvostoliitto oli katkaissut '
          + 'tiet Länsi-Berliiniin',
      },
      kuvat: [
        {
          tiedosto: 'Reichstag building Berlin view from west before sunset.jpg',
          selite: 'Valtiopäivätalon länsijulkisivu ilta-auringossa, '
            + 'lasikupoli pylväikön yllä.',
          lahde: 'Jürgen Matern, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Raising a flag over the Reichstag - Restoration.jpg',
          selite: 'Neuvostosotilas pystyttää lippua raunioituneen talon '
            + 'katolle toukokuussa 1945.',
          lahde: 'Jevgeni Haldei, Wikimedia Commons (PD)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Brandenburgin portti': {
      aika: '1791',
      teksti: 'Portin suunnitteli arkkitehti Carl Gotthard Langhans, ja se '
          + 'rakennettiin 1788–1791 antiikin temppelien malliin. Harjalla '
          + 'seisoo pronssinen kvadriga, jonka Napoleon vei sotasaaliina '
          + 'Pariisiin 1806 — se palautettiin vasta 1814.'
        + '\n\n'
        + 'Kun Berliinin muuri nousi 1961, se kulki juuri portin ohi ja '
          + 'sulki koko alueen. Portti seisoi lähes 30 vuotta tyhjän '
          + 'kaistaleen keskellä, kunnes muuri avautui marraskuussa '
          + '1989.'
        + '\n\n'
        + 'Nykyään portti on Saksan tunnetuin yhtenäisyyden symboli, ja '
          + 'sen ympärillä oleva Pariser Platz on autoton kävelyalue.',
      lainaus: {
        teksti: 'Mr. Gorbachev, tear down this wall! — Herra Gorbatšov, '
          + 'purkakaa tämä muuri!',
        lahde: 'Presidentti Ronald Reagan puheessaan Brandenburgin portin '
          + 'edustalla 12. kesäkuuta 1987',
      },
      kuvat: [
        {
          tiedosto: 'Brandenburger Tor abends.jpg',
          selite: 'Portti valaistuna iltahämärässä, kultainen kvadriga '
            + 'harjalla.',
          lahde: 'Thomas Wolf, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'President Ronald Reagan Making His Berlin Wall Speech at Brandenburg Gate West Berlin - DPLA - dce9b53e6ef9b7e01d184ce61f78871b.jpg',
          selite: 'Presidentti Reagan puhumassa muurin ja portin edessä '
            + 'kesäkuussa 1987.',
          lahde: 'Yhdysvaltain presidentin valokuvaajien toimisto, '
            + 'Wikimedia Commons (PD)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Checkpoint Charlie': {
      aika: '1961',
      teksti: 'Checkpoint Charlie oli yksi kolmesta liittoutuneiden '
          + 'rajanylityspaikasta — nimi tulee Naton aakkosista, C niin '
          + 'kuin Charlie. Se rakennettiin elokuussa 1961, kun Itä-Saksa '
          + 'pystytti muurin estämään ihmisten pakenemisen länteen.'
        + '\n\n'
        + 'Lokakuussa 1961 tarkastuspisteellä seisoi kymmenen '
          + 'amerikkalaista ja kymmenen neuvostovaunua piipun mitan '
          + 'päässä toisistaan — tilanne laukesi rauhanomaisesti vasta '
          + 'seuraavana päivänä. Monet yrittivät paeta juuri täältä, ja '
          + 'osa maksoi siitä hengellään.'
        + '\n\n'
        + 'Muuri avautui 1989, ja alkuperäinen vartiokoppi purettiin '
          + '1990. Nykyinen koppi on jälkeenpäin rakennettu jäljennös, '
          + 'jonka luona tuhannet turistit pysähtyvät joka päivä.',
      kuvat: [
        {
          tiedosto: 'US Army tanks face off against Soviet tanks, Berlin 1961.jpg',
          selite: 'Amerikkalaisia panssarivaunuja rajanylityspaikalla '
            + 'lokakuussa 1961.',
          lahde: 'Yhdysvaltain armeija, Wikimedia Commons (PD)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Museosaari: {
      aika: '1830',
      teksti: 'Museosaari on saari joen Spreen keskellä, ja siellä on '
          + 'peräti viisi museota vierekkäin. Ensimmäinen, Vanha museo, '
          + 'avattiin 1830 — viimeisenä valmistui Pergamonmuseo vasta '
          + '1930.'
        + '\n\n'
        + 'Pergamonmuseossa on koottuna kokonaisia muinaisia '
          + 'rakennuksia oikean kokoisina, kuten Babylonin sinisenä '
          + 'hohtava Ištar-portti. Uudessa museossa taas asuu 3 300 '
          + 'vuotta vanha kuningatar Nefertitin rintakuva.'
        + '\n\n'
        + 'Unesco liitti koko Museosaaren maailmanperintöluetteloon '
          + '1999. Museot on nykyään yhdistetty maan alla kulkevalla '
          + 'käytävällä, jota pitkin pääsee kulkemaan museosta toiseen '
          + 'kastumatta.',
      kuvat: [
        {
          tiedosto: 'Altes Museum (Berlin) (6339770591).jpg',
          selite: 'Vanhan museon pylväsjulkisivu Lustgarten-puiston '
            + 'puolelta.',
          lahde: 'Jean-Pierre Dalbéra, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Nefertiti Bust Neues Museum Berlin.jpg',
          selite: 'Kuningatar Nefertitin rintakuva lasivitriinissä.',
          lahde: 'Ywpark2003, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Tv-torni': {
      aika: '1969',
      teksti: 'Fernsehturm eli tv-torni rakennettiin 1965–1969 '
          + 'Itä-Saksan hallituksen päätöksellä osoittamaan tekniikan '
          + 'huipputekoja. Se on 368 metriä korkea — Saksan korkein '
          + 'rakennelma.'
        + '\n\n'
        + 'Kun aurinko paistaa palloon sopivasta kulmasta, teräslaatat '
          + 'heijastavat valon ristin muotoisena. Länsiberliiniläiset '
          + 'ristivät ilmiön nimellä paavin kosto, koska hallitus oli '
          + 'poistanut ristejä kirkoista.'
        + '\n\n'
        + 'Näköalatasanteelta 204 metrin korkeudesta näkee kirkkaalla '
          + 'säällä 42 kilometrin päähän, ja sen yläpuolella pyörii '
          + 'ravintola. Torni on nykyään koko Berliinin tunnusmerkki.',
      kuvat: [
        {
          tiedosto: 'Berliner Fernsehturm, Sicht vom Neptunbrunnen - Berlin Mitte.jpg',
          selite: 'Torni koko pituudeltaan sinistä taivasta vasten.',
          lahde: 'Christian Wolf, Wikimedia Commons (CC BY-SA 3.0 DE)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'East Side Gallery': {
      aika: '1990',
      teksti: 'East Side Gallery on 1 316 metrin pituinen pätkä '
          + 'Berliinin muuria, jonka 118 taiteilijaa 21 maasta maalasi '
          + 'keväällä 1990. Se on maailman pisin galleria ulkoilmassa.'
        + '\n\n'
        + 'Tunnetuin teos on Dmitri Vrubelin maalaus, jossa '
          + 'Neuvostoliiton ja Itä-Saksan johtajat suutelevat — se '
          + 'perustuu oikeaan valokuvaan vuodelta 1979. Toinen suosikki '
          + 'on Birgit Kinderin maalaama Trabant-auto, joka näyttää '
          + 'puhkaisevan muurin.'
        + '\n\n'
        + '2000-luvulla rapistuneet maalaukset maalattiin uudelleen '
          + '2009, ja galleria on nykyään suojeltu muistomerkki, jota '
          + 'käy katsomassa yli kolme miljoonaa ihmistä vuodessa.',
      lainaus: {
        teksti: 'Mein Gott, hilf mir, diese tödliche Liebe zu überleben — '
          + 'Jumalani, auta minua selviämään tästä tappavasta '
          + 'rakkaudesta.',
        lahde: 'Maalauksen teksti, jonka Dmitri Vrubel kirjoitti muurille '
          + 'suudelmakuvan viereen 1990',
      },
      kuvat: [
        {
          tiedosto: 'East Side Gallery - Dmitri Vrubel - Le baiser (Berlin).jpg',
          selite: 'Maalaus, jossa kaksi valtionjohtajaa suutelee.',
          lahde: 'Gzen92, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'East Side Gallery trabi.jpg',
          selite: 'Valkoinen Trabant-auto puhkaisee maalatun muurin.',
          lahde: 'Toytoy, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  kairo: {
    'Kairon torni': {
      aika: '1961',
      teksti: 'Kairon torni valmistui vuonna 1961 Niilin rannalle. Se on '
          + '187 metriä korkea, ja se oli hetken Afrikan korkein '
          + 'rakennelma. Arkkitehti Naoum Shebib suunnitteli tornin '
          + 'muistuttamaan muinaista lootuskukkaa, tärkeää egyptiläistä '
          + 'symbolia.'
        + '\n\n'
        + 'Tornin rakentamiseen käytettiin rahaa, joka oli alun perin '
          + 'tarkoitettu ihan muuhun. Presidentti Gamal Abdel Nasser '
          + 'käytti sen tornin rakentamiseen, kun hän ei halunnut ottaa '
          + 'vastaan ulkomaista lahjusta.'
        + '\n\n'
        + 'Tornin huipulla on pyörivä ravintola ja näköalatasanne, josta '
          + 'näkee koko Kairon. Vuosina 2006–2009 torni kunnostettiin, ja '
          + 'se on yhä suosittu nähtävyys.',
      kuvat: [
        {
          tiedosto: 'نهر النيل وبرج القاهرة.jpg',
          selite: 'Kairon torni kohoaa Niilin rantamaisemassa.',
          lahde: 'Abdouououou, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Egyptin museo': {
      aika: '1902',
      teksti: 'Egyptin museo avattiin Tahririn aukion laidalla vuonna '
          + '1902. Ranskalainen arkkitehti Marcel Dourgnon suunnitteli '
          + 'rakennuksen, ja sen rakensi italialainen yhtiö.'
        + '\n\n'
        + 'Museossa on yli 170 000 muinaisen Egyptin esinettä — enemmän '
          + 'kuin missään muualla maailmassa. Täältä löytyy muun muassa '
          + 'kuningas Tutankhamonin aarteita ja muumioita. Alakerrassa on '
          + '42 huonetta täynnä kivipatsaita, yläkerrassa pienempiä '
          + 'esineitä kuten papyruksia ja kolikoita.'
        + '\n\n'
        + 'Osa aarteista on siirretty uuteen Ison Egyptin museoon '
          + 'Gizaan. Vanha museo on silti yhä auki, ja vuoden 2011 '
          + 'mellakoiden aikana varastetut esineet saatiin lopulta '
          + 'suurimmaksi osaksi takaisin.',
      kuvat: [
        {
          tiedosto: 'Facade of the Egyptian Museum, Tahrir Square, Cairo, Egypt1.jpg',
          selite: 'Egyptin museon punainen julkisivu Tahririn aukiolla.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Tahririn aukio': {
      aika: '2011',
      teksti: 'Tahririn aukio tarkoittaa arabiaksi "vapautuksen aukiota". '
          + 'Aukio syntyi vuonna 1867 nimellä Ismailia-aukio, mutta se '
          + 'sai nykyisen nimensä vasta myöhemmin, kansannousun jälkeen.'
        + '\n\n'
        + 'Vuonna 2011 aukiosta tuli koko maailman huomion keskipiste. '
          + 'Kymmenettuhannet egyptiläiset kokoontuivat sinne 18 '
          + 'päiväksi vaatimaan muutosta. Lopulta presidentti erosi, ja '
          + 'aukiolla juhlittiin läpi yön.'
        + '\n\n'
        + 'Nykyään aukion laidalla on Egyptin museo ja Kairon metron '
          + 'asema. Aukiolle mahtuu parhaimmillaan jopa 250 000 ihmistä, '
          + 'ja sinne on pystytetty muinainen obeliski ja sfinssipatsaita '
          + 'muistona Egyptin pitkästä historiasta.',
      kuvat: [
        {
          tiedosto: 'Tahrir Square, Cairo, in the early morning - c.jpg',
          selite: 'Tahririn aukio ylhäältä kuvattuna auringonnousun '
            + 'aikaan.',
          lahde: 'Frank Schulenburg ja Julian Herzog, Wikimedia Commons '
            + '(CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Ibn Tulunin moskeija': {
      aika: '879',
      teksti: 'Ibn Tulunin moskeija valmistui vuonna 879 Kairoon. Sen '
          + 'rakennutti Ahmad ibn Tulun, joka hallitsi Egyptiä lähes '
          + 'itsenäisesti. Moskeija on yksi Egyptin suurimmista, ja se on '
          + 'säilynyt lähes alkuperäisessä asussaan — maan vanhin hyvin '
          + 'säilynyt moskeija.'
        + '\n\n'
        + 'Moskeijan minareetti on erikoinen: sen ulkopuolella kiertää '
          + 'spiraalimainen porras. Tarinan mukaan Ibn Tulun keksi '
          + 'muodon vahingossa, kun hän kokouksessa kietoi '
          + 'pergamenttiliuskan sormensa ympärille.'
        + '\n\n'
        + 'Moskeijan seinillä kiertää Koraanin tekstiä lähes kaksi '
          + 'kilometriä — vanhin säilynyt näin pitkä kirjoitus '
          + 'islamilaisessa taiteessa.',
      kuvat: [
        {
          tiedosto: 'Kairo Ibn Tulun Moschee BW 5.jpg',
          selite: 'Moskeijan sisäpiha ja taustalla kiertyvä '
            + 'spiraaliminareetti.',
          lahde: 'Berthold Werner, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Saladinin linnoitus': {
      aika: '1176',
      teksti: 'Saladin aloitti linnoituksen rakentamisen vuonna 1176 '
          + 'suojellakseen Kairoa ristiretkeläisten hyökkäyksiltä. '
          + 'Linnoitus kohoaa Mokattam-kukkulalla, ja siitä tuli Egyptin '
          + 'hallituksen keskus lähes 700 vuodeksi.'
        + '\n\n'
        + 'Vuosisatoja myöhemmin, 1800-luvulla, Muhammad Ali Pasha '
          + 'muutti linnoitusta rajusti. Hän purki vanhoja rakennuksia ja '
          + 'rakensi tilalle suuren moskeijan, jonka kupoli ja '
          + 'minareetit näkyvät yhä kauas Kairon yli.'
        + '\n\n'
        + 'Linnoituksessa on nähty synkkiäkin hetkiä: vuonna 1811 '
          + 'Muhammad Ali kutsui mamelukkiruhtinaat juhlaan ja väijytti '
          + 'heidät portailla. Nykyään linnoitus on avoinna kaikille ja '
          + 'kuuluu maailmanperintökohteisiin.',
      kuvat: [
        {
          tiedosto: 'Muhammad Ali Mosque 1.jpg',
          selite: 'Muhammad Alin moskeija linnoituksen sisäpihalla.',
          lahde: 'kallerna, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Khan el-Khalili': {
      aika: '1382',
      teksti: 'Khan el-Khalilin basaari perustettiin 1380-luvulla '
          + 'sulttaani Barquqin aikana. Nimensä se sai '
          + 'Jaharkas al-Khalililtä, joka purki vanhan haudan ja rakensi '
          + 'tilalle suuren kauppahallin.'
        + '\n\n'
        + 'Basaarista kasvoi vuosisatojen myötä Kairon tärkein '
          + 'kauppapaikka. Vuoteen 1800 mennessä alueella oli lähes 40 '
          + 'kauppamajaa, joissa kauppiaat myivät mausteita, kultaa ja '
          + 'kankaita. Yksi vanhimmista kahviloista, El-Fishawy, on '
          + 'ollut auki vuodesta 1773 lähtien.'
        + '\n\n'
        + 'Basaari innoitti myös kirjailija Naguib Mahfouzia, joka '
          + 'sijoitti kuuluisan romaaninsa Midaq-kuja juuri tänne. '
          + 'Kapeilla kujilla voi yhä tänään tinkiä ja haistella '
          + 'mausteiden tuoksua.',
      kuvat: [
        {
          tiedosto: 'Khan el-Khalili 2019.jpg',
          selite: 'Kimaltavia lyhtyjä basaarin kojussa.',
          lahde: 'Mohammed Moussa, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  venetsia: {
    'Canal Grande': {
      aika: '1631',
      teksti: 'Canal Grande on Venetsian pääkatu, vaikka se onkin '
          + 'oikeasti vesitie. Se mutkittelee kaupungin läpi käänteisen '
          + 'S-kirjaimen muotoisena, on 3,8 kilometriä pitkä ja 30–90 '
          + 'metriä leveä. Rannoilla seisoo yli 170 rakennusta, monet '
          + '1200–1700-luvuilta.'
        + '\n\n'
        + 'Pitkään kanaalin yli pääsi vain yhtä ainoaa siltaa, Rialtoa — '
          + 'muuten piti mennä veneellä. Nykyään ylityspaikkoja on '
          + 'neljä, uusin on vuonna 2008 valmistunut lasinen '
          + 'Konstituutiosilta.'
        + '\n\n'
        + 'Kanaalin varrella kohoaa valkoinen Santa Maria della Saluten '
          + 'kirkko. Sen rakentaminen alkoi 1631 kiitokseksi siitä, että '
          + 'hirveä ruttoepidemia vihdoin väistyi.',
      kuvat: [
        {
          tiedosto: 'Canal Grande Chiesa della Salute e Dogana dal ponte dell Accademia.jpg',
          selite: 'Canal Grande iltapäivän valossa, gondoli etualalla ja '
            + 'Santa Maria della Salute -kirkon kupoli taustalla.',
          lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'La Fenicen oopperatalo': {
      aika: '1792',
      teksti: 'La Fenice tarkoittaa Feeniksiä, satulintua joka nousee '
          + 'tuhkasta uudelleen — ja nimi on osunut kohdalleen. '
          + 'Arkkitehti Giannantonio Selvan suunnittelema talo valmistui '
          + '1792, ja siihen mahtuu nykyään 1126 katsojaa.'
        + '\n\n'
        + 'Talo on palanut kahdesti. Ensin 1836, ja se rakennettiin '
          + 'uudelleen vain vuodessa. Sitten tuhopolttajat sytyttivät '
          + 'sen tuleen tammikuussa 1996. Uudelleenrakennus maksoi 90 '
          + 'miljoonaa euroa ja kesti seitsemän vuotta.'
        + '\n\n'
        + 'Talossa ovat kantaesittäneet oopperansa muun muassa Rossini '
          + 'ja Verdi, jonka Rigoletto ja La traviata kuultiin täällä '
          + 'ensi kertaa. Talo avattiin taas juhlallisesti 2003.',
      kuvat: [
        {
          tiedosto: 'Teatro La Fenice, Venice.jpg',
          selite: 'La Fenicen kultainen katsomo täynnä yleisöä '
            + 'esityksen aikana.',
          lahde: 'Youflavio, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Rialton silta': {
      aika: '1591',
      teksti: 'Rialton silta on Canal Granden neljästä sillasta vanhin '
          + 'ja kuuluisin. Ennen sitä jopa Michelangelo ja Palladio '
          + 'ehdottivat omia siltamallejaan, mutta lopulta valittiin '
          + 'arkkitehti Antonio da Ponten kivinen kaarisilta, joka '
          + 'valmistui vuosina 1588–1591.'
        + '\n\n'
        + 'Paikalla oli aiemmin pelkkä pontonisilta vuodesta 1181 ja '
          + 'puinen kääntösilta vuodesta 1255. Se romahti kahdesti: '
          + 'kerran 1444 häitä katsomassa olleen väkijoukon alla ja '
          + 'uudelleen 1524.'
        + '\n\n'
        + 'Sillan pisin kaari on lähes 32 metriä ja koko silta on liki '
          + '23 metriä leveä. Keskellä kulkee katettu käytävä, jonka '
          + 'reunoilla on pieniä kauppoja — aivan kuten satoja vuosia '
          + 'sitten.',
      kuvat: [
        {
          tiedosto: 'Ponte di Rialto Venice 1.jpg',
          selite: 'Rialton silta kultaisessa iltavalossa, veneitä '
            + 'kanaalilla sen edessä.',
          lahde: 'kallerna, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pyhän Markuksen tori': {
      aika: '1902',
      teksti: 'Pyhän Markuksen tori on Venetsian sydän, jota '
          + 'Napoleonin kerrotaan kutsuneen "Euroopan olohuoneeksi". '
          + 'Torin laidalla kohoaa Pyhän Markuksen basilika: pyhän '
          + 'Markuksen jäännökset tuotiin sinne salaa Alexandriasta, ja '
          + 'ensimmäinen kirkko niille valmistui jo vuonna 836.'
        + '\n\n'
        + '14. heinäkuuta 1902 kello 9.53 vieressä kohoava 98,6 metriä '
          + 'korkea kellotorni, campanile, romahti täysin muutamassa '
          + 'sekunnissa. Ihmeen kaupalla kukaan ei loukkaantunut — '
          + 'ainoa uhri oli vahtimestarin kissa. Torni rakennettiin '
          + 'uudelleen tismalleen samanlaisena ja avattiin taas vuonna '
          + '1912.'
        + '\n\n'
        + 'Torilla asuu myös kymmeniä pulukatraita. Matalan sijaintinsa '
          + 'vuoksi tori tulvii yhä usein: vuonna 1966 vesi nousi '
          + 'peräti 194 senttiä.',
      kuvat: [
        {
          tiedosto: 'Piazza San Marco, St Mark\'s Square, Venice, Italy.jpg',
          selite: 'Pyhän Markuksen basilika ja campanile, pulukatraita '
            + 'torin kivetyksellä.',
          lahde: 'Vyacheslav Argenberg, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'San Giorgio Maggiore': {
      aika: '1566',
      teksti: 'San Giorgio Maggiore on pieni saari aivan Pyhän '
          + 'Markuksen torin edustalla, ja sen valkoinen kirkko on yksi '
          + 'Venetsian tunnetuimmista näkymistä. Munkki Giovanni '
          + 'Morosini perusti saarelle luostarin jo vuonna 982 '
          + 'kuivattuaan ensin suot.'
        + '\n\n'
        + 'Nykyinen kirkko alkoi nousta vuonna 1566 kuuluisan '
          + 'arkkitehti Andrea Palladion piirustusten mukaan. Sen '
          + 'korkea tiilinen kellotorni ja valkoinen marmorijulkisivu '
          + 'näkyvät kauas yli laguunin.'
        + '\n\n'
        + 'Maalari Claude Monet maalasi kirkosta kokonaisen sarjan '
          + 'tauluja. Nykyään saarella toimii kulttuurisäätiö, kirjasto '
          + 'ja ulkoilmateatteri, ja tornissa soi yhdeksän kellon '
          + 'sarja.',
      kuvat: [
        {
          tiedosto: 'Basilica di San Giorgio Maggiore a Venezia.jpg',
          selite: 'San Giorgio Maggioren valkoinen kirkko ja tiilinen '
            + 'kellotorni saaren rannalla.',
          lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Arsenaali: {
      aika: '1104',
      teksti: 'Arsenaali oli Venetsian valtava laivaveistämö, jonka '
          + 'rakentaminen alkoi noin vuonna 1104. Parhaimmillaan '
          + '1500-luvulla siellä työskenteli lähes 16 000 ihmistä, ja '
          + 'uusi laiva voitiin koota liukuhihnamaisesti jopa yhdessä '
          + 'päivässä.'
        + '\n\n'
        + 'Osat olivat valmiiksi tehtyjä ja samanlaisia, aivan kuten '
          + 'tehtaissa vasta satoja vuosia myöhemmin. Arsenaalissa myös '
          + 'käännettiin laivanrakennuksen järjestys: ensin pystytettiin '
          + 'kylkiluista tehty runko, sitten laudat sen ympärille. Tämä '
          + 'nopeutti työtä ja säästi puuta.'
        + '\n\n'
        + 'Runoilija Dante kirjoitti Arsenaalista Jumalaisessa '
          + 'näytelmässään, kuinka siellä kiehui piki jo talvella. '
          + 'Vuonna 1797 Napoleon valloitti Venetsian, ja Arsenaalin '
          + 'suuruuden aika päättyi.',
      lainaus: {
        teksti: 'Quale ne l\'arzanà de\' Viniziani bolle l\'inverno la '
          + 'tenace pece — Niin kuin Venetsian arsenaalissa kiehuu '
          + 'talvella sitkeä piki.',
        lahde: 'Dante Alighieri, Jumalaisen näytelmän Helvetti-osan 21. '
          + 'laulu (n. 1308–1320), jossa Arsenaalin touhu vertautuu '
          + 'helvetin kiehuvaan pikeen',
      },
      kuvat: [
        {
          tiedosto: 'Arsenale ingresso Venezia notte.jpg',
          selite: 'Arsenaalin porttitornit ja silta valaistuina '
            + 'iltahämärässä, kuvastuen veteen.',
          lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  madrid: {
    Kuninkaanlinna: {
      aika: '1755',
      teksti: 'Jouluaattona 1734 vanha Alcázar-linna paloi neljä '
          + 'vuorokautta, ja suuri osa siitä tuhoutui kokonaan. Osa '
          + 'taideaarteista oli onneksi jo siirretty toiseen palatsiin, '
          + 'mutta yksi Velázquezin maalaus katosi liekeissä.'
        + '\n\n'
        + 'Kuningas Filip V käski rakentaa palon paikalle upouuden '
          + 'linnan. Italialainen arkkitehti Filippo Juvarra suunnitteli '
          + 'sen, ja rakennustyöt kestivät vuodesta 1738 vuoteen 1755.'
        + '\n\n'
        + 'Linnassa on 3 418 huonetta ja yli 135 000 neliömetriä '
          + 'lattiapinta-alaa — se on Länsi-Euroopan suurin palatsi. '
          + 'Nykyään siellä pidetään valtiovierailuja, ja kokoelmiin '
          + 'kuuluu muun muassa maailman ainoa täydellinen '
          + 'Stradivarius-viulukvintetti.',
      kuvat: [
        {
          tiedosto: 'Royal Palace of Madrid east facade 1.jpg',
          selite: 'Kuninkaanlinnan itäjulkisivu iltapäivän auringossa, '
            + 'edustalla kävelijöitä.',
          lahde: 'Kallerna, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Plaza Mayor': {
      aika: '1619',
      teksti: 'Espanjan kuningas halusi kaupungille kunnon aukion toreja '
          + 'ja juhlia varten. Nykyinen Plaza Mayor valmistui 1619 '
          + 'arkkitehti Juan Gómez de Moran suunnitelmien mukaan. Se on '
          + '129 metriä pitkä ja 94 metriä leveä, ja sitä ympäröivissä '
          + 'taloissa on peräti 237 parveketta, joilta väki katseli '
          + 'aikoinaan tapahtumia alhaalla.'
        + '\n\n'
        + 'Aukiolla nähtiin myös synkempiä hetkiä: kesäkuussa 1680 '
          + 'inkvisitio tuomitsi siellä 117 ihmistä, ja 21 heistä '
          + 'poltettiin roviolla. Aukio itsekin paloi kolmesti, pahiten '
          + 'vuonna 1790.'
        + '\n\n'
        + 'Keskellä ratsastaa pronssinen kuningas Filip III, valettu jo '
          + '1616 mutta nostettu paikalleen vasta 1848. Nykyään aukiolla '
          + 'pidetään joulutoria ja viikonloppuisin postimerkki- ja '
          + 'kolikkomarkkinoita.',
      kuvat: [
        {
          tiedosto: 'Plaza Mayor de Madrid - 01.jpg',
          selite: 'Plaza Mayorin pohjoissivu torneineen ja kuningas '
            + 'Filip III:n ratsastajapatsas edessä.',
          lahde: 'Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Plaza Mayor, Madrid, España, 2023-01-03, DD 78.jpg',
          selite: 'Maalattu talon julkisivu parvekkeineen aukion '
            + 'laidalla.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Puerta del Sol': {
      aika: '1857',
      teksti: 'Puerta del Sol eli Auringon portti oli aikoinaan Madridin '
          + 'muurin portti 1400-luvulla. Nimi tulee portin koristeesta, '
          + 'nousevasta auringosta, koska portti oli käännetty itään.'
        + '\n\n'
        + 'Aukion kiveyksessä on messinkilaatta, joka merkitsee '
          + 'Espanjan kilometriä nolla — vuodesta 1857 lähtien juuri '
          + 'siitä pisteestä on mitattu kaikki maan päätiet. Kuusi '
          + 'valtatietä lähtee sieltä eri suuntiin kuin kellotaulun '
          + 'viisarit.'
        + '\n\n'
        + 'Aukion kellotalosta soi joka uudenvuodenyönä kaksitoista '
          + 'lyöntiä, ja espanjalaiset syövät jokaisella lyönnillä '
          + 'viinirypäleen — perinnettä on lähetetty televisiosta '
          + 'vuodesta 1962. Aukiolla seisoo myös patsas karhusta, joka '
          + 'kurkottaa mansikkapuuhun: se on koko Madridin tunnus.',
      kuvat: [
        {
          tiedosto: 'Puerta del Sol, panorama, Madrid, España, 2015.JPG',
          selite: 'Näkymä vilkkaalle aukiolle, taustalla vanha '
            + 'kellotorni.',
          lahde: 'Benjamín Núñez González, Wikimedia Commons '
            + '(CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Escultura del Oso y el Madroño, Puerta del Sol, Madrid, España, Spain.jpg',
          selite: 'Pronssinen karhu kurkottaa mansikkapuuhun — Madridin '
            + 'tunnuskuva.',
          lahde: 'Carlos Teixidor Cadenas, Wikimedia Commons '
            + '(CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Cibeleen aukio': {
      aika: '1780',
      teksti: 'Aukion keskellä kohoava Cibeles-suihkulähde on Madridin '
          + 'tunnetuimpia näkymiä. Arkkitehti Ventura Rodríguez '
          + 'suunnitteli sen vuonna 1780: valkoisesta marmorista '
          + 'veistetty jumalatar Cibele ajaa vaunuilla, joita vetävät '
          + 'kaksi leijonaa.'
        + '\n\n'
        + 'Suihkulähde siirrettiin nykyiselle paikalleen vuonna 1895. '
          + 'Sitä ympäröi neljä komeaa rakennusta kolmesta eri '
          + 'kaupunginosasta, joista suurin on entinen postipalatsi — '
          + 'nykyään Madridin kaupungintalo.'
        + '\n\n'
        + 'Suihkulähteestä on tullut myös jalkapallon juhlapaikka: kun '
          + 'Real Madrid voittaa mestaruuden, joukkueen kapteeni '
          + 'ripustaa lipun patsaan kaulaan. Innostus on mennyt '
          + 'liiallisuuksiin kahdesti — jumalattarelta katkesi käsi '
          + 'sekä 1994 että 2002.',
      kuvat: [
        {
          tiedosto: 'Fountain of Cybele at Plaza de Cibeles, Madrid, Spain (Ank Kumar, Infosys Limited ) 07.jpg',
          selite: 'Cibeles-suihkulähde suihkuamassa, taustalla entinen '
            + 'postipalatsi.',
          lahde: 'Ank Kumar, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Prado-museo': {
      aika: '1819',
      teksti: 'Arkkitehti Juan de Villanueva suunnitteli rakennuksen jo '
          + 'vuonna 1785 kuningas Kaarle III:n tilauksesta '
          + 'luonnontieteiden museoksi. Suunnitelmat viivästyivät '
          + 'sotien takia, ja lopulta kuningas Ferdinand VII päätti '
          + 'tehdä siitä taidemuseon. Prado avasi ovensa marraskuussa '
          + '1819.'
        + '\n\n'
        + 'Museossa on maailman hienoimpia maalauksia: Velázquezin Las '
          + 'Meninas, Boschin Maallisten ilojen puutarha ja Goyan '
          + 'synkät niin kutsutut mustat maalaukset. Goya on museon '
          + 'eniten esillä oleva taiteilija.'
        + '\n\n'
        + 'Kokoelmiin kuuluu nykyään noin 7 600 maalausta ja tuhansia '
          + 'piirustuksia ja veistoksia. Rakennusta laajennettiin maan '
          + 'alle 2007, ja vuonna 2023 museossa kävi yli 3,3 miljoonaa '
          + 'kävijää.',
      kuvat: [
        {
          tiedosto: 'Buildings of the Museo del Prado 20180720.jpg',
          selite: 'Museon punatiilinen julkisivu pylväikköineen '
            + 'kirkkaana päivänä.',
          lahde: 'Suicasmo, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Las Meninas 01.jpg',
          selite: 'Velázquezin maalaus Las Meninas, museon tunnetuin '
            + 'teos.',
          lahde: 'Diego Velázquez, Wikimedia Commons (PD)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Alcalán portti': {
      aika: '1778',
      teksti: 'Kuningas Kaarle III halusi komean uuden portin vanhan, '
          + 'rapistuneen kaupunginmuurin portin tilalle — sitä pitkin '
          + 'kuljettiin tietä Alcalá de Henaresin kaupunkiin. '
          + 'Arkkitehti Francesco Sabatini suunnitteli portin, ja työt '
          + 'alkoivat noin vuonna 1774.'
        + '\n\n'
        + 'Portti on rakennettu Segovian graniitista, ja sen '
          + 'koristeveistokset veistivät Francisco Gutiérrez ja Roberto '
          + 'Michel valkoisesta Colmenarin kivestä. Se on 43 metriä '
          + 'leveä ja 19,5 metriä korkea, ja se vihittiin käyttöön '
          + '1778.'
        + '\n\n'
        + 'Keskellä olevassa laatassa lukee latinaksi REGE CAROLO III '
          + 'ANNO MDCCLXXVIII eli Kuningas Kaarle III, vuonna 1778. '
          + 'Portti seisoo nykyään keskellä vilkasta liikenneympyrää, '
          + 'kaupunginmuurit ovat kadonneet jo kauan sitten.',
      kuvat: [
        {
          tiedosto: 'Puerta de Alcalá, Madrid, España, 2017-05-18, DD 14.jpg',
          selite: 'Portti edestä katsottuna, kaarien läpi näkyy '
            + 'kaupunkia.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  tukholma: {
    Kaupungintalo: {
      aika: '1923',
      teksti: 'Arkkitehti Ragnar Östberg suunnitteli kaupungintalon, '
          + 'joka rakennettiin kaupungin rantaan vuosina 1911–1923 — '
          + 'melkein kahdeksan miljoonaa punaista tiiltä. Tornissa on '
          + '106 metriä ja huipulla kolme kultaista kruunua, Ruotsin '
          + 'vanha tunnus.'
        + '\n\n'
        + 'Talon sisällä on Sininen sali, jossa Nobelin palkintojen '
          + 'juhlaillallinen syödään joka vuosi. Sen jälkeen vieraat '
          + 'tanssivat Kultaisessa salissa, jonka seinät on peitetty '
          + 'yli 18 miljoonalla pienellä mosaiikkipalalla.'
        + '\n\n'
        + 'Kaupungintalo avattiin juhlallisesti 23. kesäkuuta 1923. '
          + 'Avaajat luulivat sen olevan tasan 400 vuotta siitä, kun '
          + 'kuningas Kustaa Vaasa saapui Tukholmaan — todellisuudessa '
          + 'päivämäärä oli hieman väärin, mutta juhla pidettiin '
          + 'silti.',
      kuvat: [
        {
          tiedosto: 'Stockholm City Hall February 2014 02.jpg',
          selite: 'Kaupungintalon torni valaistuna iltahämärässä '
            + 'Riddarholmenilta nähtynä, huipulla kolme kultaista '
            + 'kruunua.',
          lahde: 'Arild Vågen, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Gyllene salen (Golden Hall) and mosaic of Mälardrottningen - Stockholms stadshus (24831465706).jpg',
          selite: 'Kultaisen salin kimaltavat mosaiikkiseinät, joissa '
            + 'on yli 18 miljoonaa pientä lasipalaa.',
          lahde: 'Jorge Láscar, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Riddarholmenin kirkko': {
      aika: '1835',
      teksti: 'Riddarholmenin kirkko on yksi Tukholman vanhimmista '
          + 'rakennuksista — se rakennettiin fransiskaanimunkkien '
          + 'luostariksi jo 1200-luvun lopulla. Uskonpuhdistuksen '
          + 'jälkeen munkit lähtivät, ja kirkosta tuli vähitellen '
          + 'kuninkaallisten hautakirkko.'
        + '\n\n'
        + 'Melkein kaikki Ruotsin kuninkaat Kustaa II Aadolfista '
          + 'Kustaa V:een lepäävät kirkon holveissa, samoin kaksi '
          + 'keskiaikaista kuningasta. Vain kuningatar Kristiina on '
          + 'haudattu muualle, Roomaan.'
        + '\n\n'
        + 'Alkuperäisen tornin huipun suunnitteli flaamilainen '
          + 'arkkitehti Willem Boy 1500-luvulla, mutta salama tuhosi '
          + 'sen 28. heinäkuuta 1835. Nykyinen valurautahuippu on '
          + 'rakennettu sen tilalle. Seurakunta lakkautettiin jo 1807, '
          + 'joten kirkkoa käytetään enää hautajaisiin ja '
          + 'muistotilaisuuksiin.',
      kuvat: [
        {
          tiedosto: 'Riddarholmskyrkan norra fasaden.jpg',
          selite: 'Kirkon pohjoisjulkisivu: goottilainen tiilitorni ja '
            + 'pyöreäkattoinen kuninkaallinen hautakappeli vierekkäin.',
          lahde: 'Zeke530, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Riddarholmskyrkan February 2013 01.jpg',
          selite: 'Ilmakuva kirkon mustasta valurautaisesta '
            + 'tornihuipusta ja vihreistä kattokupoleista talvella.',
          lahde: 'Arild Vågen, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sergelin tori': {
      aika: '1967',
      teksti: 'Sergelin tori sai nykyisen muotonsa vuonna 1967. '
          + 'Keskellä pyörii liikenneympyrä, jonka muoto ei ole '
          + 'tavallinen soikio vaan supermuna — sen keksi matemaatikko '
          + 'Piet Hein.'
        + '\n\n'
        + 'Torin tunnusmerkki on 37 metriä korkea lasi- ja '
          + 'teräsobeliski, jonka arkkitehti Edvin Öhrström '
          + 'suunnitteli. Se valmistui vasta 1974 ja on aiheuttanut '
          + 'tekniikkaongelmia vuosien varrella.'
        + '\n\n'
        + 'Alempi kävelytaso, Plattan, on päällystetty '
          + 'mustavalkoisilla kolmioilla — sama kuvio löytyy nykyään '
          + 'Tukholman metrojunien penkeistä. Torilla juhlitaan '
          + 'urheiluvoittoja, mielenosoitetaan ja vietetään vappua.',
      kuvat: [
        {
          tiedosto: 'Sergels torg-Stockholm-DSC 0115w.jpg',
          selite: 'Sergelin torin 37 metriä korkea lasiobeliski '
            + 'valaistuna iltahämärässä liikenneympyrän keskellä.',
          lahde: 'Peter Haas, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Sergels Torg.jpg',
          selite: 'Alempi kävelytaso Plattan mustavalkoisine '
            + 'kolmiokuvioineen, obeliski taustalla.',
          lahde: 'Kallerna, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kuninkaanlinna: {
      aika: '1697',
      teksti: 'Vanha Kolmen kruunun linna paloi maan tasalle 7. '
          + 'toukokuuta 1697 — vain pohjoismuuri jäi pystyyn. Samana '
          + 'vuonna arkkitehti Nicodemus Tessin nuorempi aloitti '
          + 'uuden, vieläkin suuremman linnan rakentamisen samalle '
          + 'paikalle.'
        + '\n\n'
        + 'Rakentaminen kesti vuosikymmeniä, ja kuningasperhe pääsi '
          + 'muuttamaan sisään vasta 1754. Linnassa on peräti 1 430 '
          + 'huonetta, joista 660:ssä on ikkuna, ja ovia ja portteja on '
          + 'noin 7 500.'
        + '\n\n'
        + 'Kuninkaallinen henkivartiokaarti on vartioinut linnaa jo '
          + 'vuodesta 1523 asti — se on yksi Ruotsin vanhimmista '
          + 'laitoksista. Nykyään linnassa käy vuosittain noin 800 000 '
          + 'vierasta.',
      kuvat: [
        {
          tiedosto: 'Stockholm Palace 01.jpg',
          selite: 'Kuninkaanlinna kultaisessa iltavalossa vedestä '
            + 'kuvattuna.',
          lahde: 'Ad Meskens, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Façade of Stockholms slott (Stockholm Palace) Palace (24763668411).jpg',
          selite: 'Linnan pääovi ja kuninkaallinen henkivartija '
            + 'vartiokopissaan.',
          lahde: 'Jorge Láscar, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Vasa-museo': {
      aika: '1628',
      teksti: 'Vasa oli komea, 64-tykkinen sotalaiva, mutta se kaatui '
          + 'ja upposi jo neitsytmatkallaan 10. elokuuta 1628 — vain '
          + '1 300 metrin päässä satamasta. Tuulenpuuska kallisti '
          + 'laivan kyljelleen, vesi tulvi sisään avoimista '
          + 'tykkiluukuista, ja noin 30 ihmistä hukkui.'
        + '\n\n'
        + 'Laiva oli liian epävakaa: yläosat olivat liian raskaita, ja '
          + 'kannen palkit oli tehty liian isoiksi. Laiva nostettiin '
          + 'vedestä vasta 1961, yli 330 vuotta myöhemmin, lähes '
          + 'ehjänä.'
        + '\n\n'
        + 'Vasan runkoa koristaa lähes 500 puuveistosta. Museo avattiin '
          + '15. kesäkuuta 1990, ja siitä lähtien laivaa on käynyt '
          + 'katsomassa jo yli 45 miljoonaa ihmistä.',
      kuvat: [
        {
          tiedosto: 'Lateral view of the Vasa ship, Vasa Museum, Stockholm, Sweden julesvernex2.jpg',
          selite: 'Vasa-laivan kylki lähikuvassa: tykkiluukut ja '
            + 'köysistö museohallissa.',
          lahde: 'Jules Verne Times Two, Wikimedia Commons '
            + '(CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Stern of the Vasa ship, Vasa Museum, Stockholm, Sweden julesvernex2.jpg',
          selite: 'Laivan koristeellinen perä täynnä puuveistoksia ja '
            + 'Ruotsin vaakunaa.',
          lahde: 'Jules Verne Times Two, Wikimedia Commons '
            + '(CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Skansen: {
      aika: '1891',
      teksti: 'Artur Hazelius perusti Skansenin 11. lokakuuta 1891. Se '
          + 'on Ruotsin vanhin ulkoilmamuseo, ja sinne koottiin taloja, '
          + 'myllyjä ja pihoja eri puolilta Ruotsia — lähes 150 '
          + 'rakennusta, joista vain kolme on jälkeenpäin rakennettuja '
          + 'jäljennöksiä.'
        + '\n\n'
        + 'Skansenilla asuu myös eläimiä: karhuja, hirviä, ilveksiä, '
          + 'poroja ja hylkeitä pääsee katsomaan aivan läheltä. Alue on '
          + '30 hehtaarin kokoinen, ja sinne pääsee muun muassa '
          + 'pienellä köysiradalla.'
        + '\n\n'
        + 'Nykyään Skansenissa käy yli 1,3 miljoonaa vierasta joka '
          + 'vuosi. Suosituin perinne on Allsång på Skansen eli '
          + 'yhteislaulutilaisuus, joka on jatkunut jo vuosikymmenten '
          + 'ajan.',
      kuvat: [
        {
          tiedosto: 'Skansen, Stockholm (by Pudelek) 3.JPG',
          selite: 'Skogaholmin kartano, yksi Skansenin lähes 150 '
            + 'vanhasta rakennuksesta.',
          lahde: 'Marcin Szala (Pudelek), Wikimedia Commons '
            + '(CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Brown bear at Skansen (15181590522).jpg',
          selite: 'Ruskeakarhu lähikuvassa Skansenin eläintarhassa.',
          lahde: 'Magnus Johansson, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  lontoo: {
    'Buckinghamin palatsi': {
      aika: '1837',
      teksti: 'Palatsi ei ollut alun perin palatsi vaan tavallinen '
          + 'kaupunkitalo, jonka herttua rakensi 1703. Kuningas Yrjö III '
          + 'osti sen 1761 vaimolleen, ja ensimmäinen hallitsija, joka '
          + 'todella muutti sisään, oli kuningatar Viktoria vasta 1837.'
        + '\n\n'
        + 'Sisään pääsi silti kuka tahansa sitkeä: nelitoistavuotias '
          + 'Edward Jones murtautui palatsiin kolme kertaa 1838–1841, '
          + 'kerran häntä etsittiin sohvan alta. Nykyään huoneita on '
          + '775, ja katolla liehuva lippu kertoo, onko hallitsija '
          + 'kotona.',
      lainaus: {
        teksti: 'Olen iloinen, että meitä pommitettiin. Nyt voin '
          + 'katsoa East Endiä silmiin.',
        lahde: 'Kuningatar Elisabet syyskuussa 1940, kun pommi oli '
          + 'osunut palatsiin',
      },
      kuvat: [
        {
          tiedosto: 'Buckingham Palace, London - April 2009.jpg',
          selite: 'Palatsin itäjulkisivu The Mallin päästä, edessä '
            + 'kukkapenkit ja katolla lipputanko.',
          lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Guard of Buckingham Palace - 01.jpg',
          selite: 'Vartiomies vartiokopissaan palatsin '
            + 'keskiholvikäytävän vieressä.',
          lahde: 'Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Trafalgar Square': {
      aika: '1844',
      teksti: 'Ennen aukiota tässä olivat kuninkaan tallit. Kun ne '
          + 'siirrettiin pois, tontti vapautui ja aukio avattiin '
          + 'yleisölle 1844. Keskellä seisova pylväs muistaa Horatio '
          + 'Nelsonia, joka voitti meritaistelun 1805 ja kuoli siinä.'
        + '\n\n'
        + 'Pronssileijonat tulivat vasta 1867. Kuvanveistäjä pyysi '
          + 'mallikseen kuolleen leijonan eläintarhasta, mutta piirsi '
          + 'niin hitaasti, että raato ehti mädäntyä — siksi tassut '
          + 'muistuttavat enemmän kissaa kuin leijonaa.'
        + '\n\n'
        + 'Aukio oli pitkään kuuluisa kyyhkyistään: parvi kasvoi '
          + 'pahimmillaan noin 35 000 linnun kokoiseksi. Ruokinta '
          + 'kiellettiin 2003, ja tilalle tuotiin haukka partioimaan.',
      lainaus: {
        teksti: 'Englanti odottaa jokaisen tekevän velvollisuutensa.',
        lahde: 'Horatio Nelsonin lippuviesti laivastolleen '
          + 'Trafalgarin taistelun alkaessa 21. lokakuuta 1805',
      },
      kuvat: [
        {
          tiedosto: 'Trafalgar Square (21178394832).jpg',
          selite: 'Aukio kesäpäivänä: Nelsonin pylväs keskellä, '
            + 'suihkulähde käynnissä ja ihmisiä altaan reunalla.',
          lahde: 'Markus Trienke, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: "Landseer's lion and the clock tower seen from Trafalgar Square.jpg",
          selite: 'Landseerin pronssileijona jalustallaan iltavalossa, '
            + 'taustalla Big Benin kellotorni ja punainen '
            + 'kaksikerrosbussi.',
          lahde: 'Maggie Jones, Wikimedia Commons (PD)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Big Ben': {
      aika: '1859',
      teksti: 'Big Ben ei ole torni, vaan kello, joka roikkuu tornin '
          + 'huipulla ja painaa 13,7 tonnia. Ensimmäinen kello halkesi '
          + 'jo koekäytössä, ja uusikin halkesi syyskuussa 1859, koska '
          + 'lyömävasara painoi liikaa.'
        + '\n\n'
        + 'Halkeamaa ei koskaan korjattu, ja juuri se antaa Big '
          + 'Benille sen tunnetun soinnun. Kello käy silti sekunnin '
          + 'tarkkuudella: sitä säädetään lisäämällä tai poistamalla '
          + 'vanhoja pennejä heilurin päältä.'
        + '\n\n'
        + 'Torni on 96 metriä korkea ja nojaa hieman luoteeseen. '
          + 'Kellotaulujen alareunaan on kaiverrettu latinankielinen '
          + 'rukous kuningatar Viktorian ajalta.',
      lainaus: {
        teksti: 'DOMINE SALVAM FAC REGINAM NOSTRAM VICTORIAM PRIMAM — '
          + 'Herra, varjele kuningattaremme Viktoria ensimmäistä.',
        lahde: 'Kaikkien neljän kellotaulun alareunaan kaiverrettu teksti',
      },
      kuvat: [
        {
          tiedosto: 'Big Ben at sunset - 2014-10-27 17-30.jpg',
          selite: 'Torni hämärässä, kellotaulu valaistuna ja '
            + 'parlamenttitalon huiput taustalla.',
          lahde: 'Colin, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'London Big Ben Inner Clock Face 1070925-PSD.jpg',
          selite: 'Kellotaulu läheltä: latinankielinen kaiverrus '
            + 'alareunassa ja lasiruudut viisarien takana.',
          lahde: 'Ermell, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Lontoon silmä': {
      aika: '2000',
      teksti: 'Pyörä on 135 metriä korkea, mutta oudointa siinä on '
          + 'tuki: se roikkuu vain toiselta puolelta, kuten '
          + 'polkupyörän eturenkaan pinnat yhdellä haarukalla. Toista '
          + 'yhtä korkeaa näin tuettua maisemapyörää ei maailmassa ole.'
        + '\n\n'
        + 'Pyörää ei nostettu paikalleen valmiina. Koko kehä koottiin '
          + 'makuulleen Thamesin päälle rakennetuille lautoille, ja '
          + 'sitten sitä nostettiin pystyyn hitaasti, pari astetta '
          + 'tunnissa.'
        + '\n\n'
        + 'Kapseleita on 32, numeroitu 1–33, koska numeroa 13 ei ole '
          + 'lainkaan. Pyörä pyörii hitaammin kuin ihminen kävelee '
          + 'eikä pysähdy koskaan — kyytiin astutaan sen liikkuessa.',
      kuvat: [
        {
          tiedosto: 'London Eye County Hall River Thames Lambeth London England 02.jpg',
          selite: 'Koko pyörä joen toiselta rannalta aurinkoisena '
            + 'päivänä, kehää kannattavat ohuet teräsvaijerit kuin '
            + 'polkupyörän pinnat.',
          lahde: 'Acabashi, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'The London Eye Under Construction - August 1999.jpg',
          selite: 'Elokuu 1999: kehä makaa vielä vaakatasossa joen '
            + 'päällä rakennetuilla lautoilla, ympärillä nostureita.',
          lahde: 'Jim Linwood, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pyhän Paavalin katedraali': {
      aika: '1675–1710',
      teksti: 'Nykyinen kirkko on jo viides samalla kukkulalla — '
          + 'edellinen tuhoutui suurpalossa 1666. Uuden suunnitteli '
          + 'Christopher Wren, koulutukseltaan tähtitieteilijä, jolle '
          + 'rakennusten piirtämisestä tuli sivutyö loppuelämäksi.'
        + '\n\n'
        + 'Kupoli näyttää yksinkertaiselta, mutta niitä on kolme '
          + 'sisäkkäin. Kupolin sisäreunaa kiertää Kuiskausgalleria, '
          + 'jossa seinää vasten kuiskattu sana kuuluu selvästi yli '
          + 'kolmenkymmenen metrin päähän.'
        + '\n\n'
        + 'Pommitusten aikana kirkosta tuli koko maan symboli: '
          + 'joulukuun 1940 yönä otettu valokuva savun keskellä '
          + 'seisovasta kupolista kiersi maailman. Wren on haudattu '
          + 'oman kirkkonsa kryptaan.',
      lainaus: {
        teksti: 'Lukija, jos etsit hänen muistomerkkiään — katso '
          + 'ympärillesi.',
        lahde: 'Christopher Wrenin hautakiven latinankielinen teksti '
          + 'kryptassa: LECTOR SI MONUMENTUM REQUIRIS CIRCUMSPICE',
      },
      kuvat: [
        {
          tiedosto: 'St Paul\'s Cathedral Dome 2020 Exterior Ground.jpg',
          selite: 'Kupoli läheltä: lyijypinta jaettu kaariin, '
            + 'huipulla kivinen lyhty ja kullattu risti.',
          lahde: 'Julian Herzog, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'St Paul\'s Survives.jpg',
          selite: 'Kupoli kohoaa savupilvien yläpuolelle joulukuun '
            + '1940 pommitusyönä.',
          lahde: 'Herbert Mason, Wikimedia Commons (PD)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Tower Bridge': {
      aika: '1886–1894',
      teksti: 'Sillan piti ratkaista mahdoton tehtävä: itä-Lontoo '
          + 'tarvitsi ylityspaikan, mutta purjelaivojen oli yhä '
          + 'päästävä satamaan sillan kohdalta. Laki määräsi, että '
          + 'silta avataan laivalle koska tahansa, ruuhkasta '
          + 'riippumatta.'
        + '\n\n'
        + 'Tornit näyttävät keskiaikaisilta, mutta sisällä on '
          + 'teräsluuranko, jonka päälle ladottiin kiveä, jotta silta '
          + 'sopisi yhteen viereisen Lontoon Towerin kanssa. '
          + 'Avautuvat läpät, kumpikin noin 1 070 tonnia, nousevat '
          + 'vastapainojen ansiosta viidessä minuutissa.'
        + '\n\n'
        + 'Silta sekoitetaan yhä naapuriinsa London Bridgeen. Kun '
          + 'vanha London Bridge myytiin 1968 amerikkalaiselle '
          + 'liikemiehelle ja koottiin uudelleen Arizonaan, syntyi '
          + 'tarina, että ostaja luuli saavansa juuri tämän sillan.',
      kuvat: [
        {
          tiedosto: 'Tower bridge London Twilight - November 2006.jpg',
          selite: 'Silta joelta iltahämärässä valot sytytettyinä: '
            + 'kaksi kivistä tornia, niiden välissä yläkäytävät ja '
            + 'vaaleansiniset riippuketjut.',
          lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Tower Bridge walkway.jpg',
          selite: 'Yläkäytävän lasilattia, jonka läpi näkyy ajorata '
            + 'kymmenien metrien alapuolella.',
          lahde: 'Tristan Surtel, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  praha: {
    'Petřínin näkötorni': {
      aika: '1891',
      teksti: 'Kun prahalaiset turistiseuran jäsenet kävivät Pariisin '
          + 'maailmannäyttelyssä vuonna 1889 ja näkivät '
          + 'vastavalmistuneen Eiffel-tornin, he innostuivat niin, että '
          + 'päättivät rakentaa Prahaan oman pienoisversion. Rahat '
          + 'kerättiin nopeasti, ja torni nousi Petřínin kukkulalle '
          + 'vain neljässä kuukaudessa vuonna 1891 suurta '
          + 'juhlanäyttelyä varten.'
        + '\n\n'
        + 'Petřínin torni on 63,5 metriä korkea, mutta toisin kuin '
          + 'Eiffel-torni, sen jalusta on kahdeksankulmainen eikä '
          + 'neliönmuotoinen. Torniin nousee 299 porrasaskelmaa, jotka '
          + 'on rakennettu kaksoiskierteeksi: yksi kierre vie ylös ja '
          + 'toinen alas, joten kiipeäjät eivät koskaan törmää '
          + 'vastaantulijoihin. Alun perin tornissa oli kaasukäyttöinen '
          + 'hissi kuudelle hengelle, mutta se purettiin vuonna 1953, '
          + 'kun torniin asennettiin televisiolähetin — Petřín toimi '
          + 'Prahan tv-signaalin lähettäjänä aina vuoteen 1992 asti.'
        + '\n\n'
        + 'Nykyään torniin pääsee myös köysirataa pitkin, ja '
          + 'näköalapaikka on yhä suosittu: pelkästään vuonna 2014 '
          + 'kävijöitä oli yli 557 000, ja suurin osa heistä oli '
          + 'ulkomaalaisia matkailijoita.',
      kuvat: [
        {
          tiedosto: 'Petrin Tower.jpg',
          selite: 'Petřínin näkötorni Prahan puistossa.',
          lahde: 'Carmelo Bayarcal, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Prahan linna': {
      aika: '870',
      teksti: 'Prahan linnan rakentaminen alkoi jo vuonna 870, kun '
          + 'kukkulalle pystytettiin ensimmäinen kivikirkko. Siitä '
          + 'lähtien linnaa on laajennettu ja rakennettu uudelleen yli '
          + 'tuhannen vuoden ajan, ja nykyään se on Guinnessin '
          + 'ennätystenkirjan mukaan maailman suurin muinainen '
          + 'linnakokonaisuus: aluetta on noin 70 000 neliömetriä, ja '
          + 'se on lähes 570 metriä pitkä.'
        + '\n\n'
        + 'Linnassa on asunut Böömin kuninkaita ja Pyhän '
          + 'saksalais-roomalaisen keisarikunnan hallitsijoita, ja '
          + 'nykyisin se on Tšekin tasavallan presidentin virka-asunto. '
          + 'Linnan sisällä, salaisessa kammiossa, säilytetään myös '
          + 'Böömin kruununjalokiviä, joita pääsee katsomaan vain '
          + 'harvoin.'
        + '\n\n'
        + 'Linnan pihalla on koettu myös dramaattisia hetkiä: '
          + 'natsi-Saksan miehityksen aikana täällä yöpyi jopa Adolf '
          + 'Hitler vuonna 1939. Nykyään linna on Tšekin suosituin '
          + 'nähtävyys: vuonna 2024 siellä kävi peräti 2,59 miljoonaa '
          + 'vierailijaa.',
      kuvat: [
        {
          tiedosto: 'Prague Castle from Charles Bridge panorama.JPG',
          selite: 'Prahan linna Kaarlensillalta kuvattuna.',
          lahde: 'Janmad, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kaarlensilta: {
      aika: '1357–1402',
      teksti: 'Kaarlensillan rakensi keisari Kaarle IV vuonna 1357 '
          + 'korvaamaan vanhan Judit-sillan, jonka tulva oli tuhonnut. '
          + 'Legendan mukaan rakennustyöt aloitettiin tarkalleen kello '
          + '5.31 aamulla 9. heinäkuuta 1357 — päivämäärä ja kellonaika '
          + 'muodostavat yhdessä palindromin, ja Kaarle IV uskoi tämän '
          + 'erikoisen lukusarjan tekevän sillasta vahvemman.'
        + '\n\n'
        + 'Silta on 516 metriä pitkä ja lepää 16 kaariholvin päällä. '
          + 'Vuosina 1683–1714 sillan kaiteille pystytettiin 30 '
          + 'barokkipatsasta pyhimyksistä — nykyään sillalla nähtävät '
          + 'patsaat ovat kuitenkin kopioita, sillä alkuperäiset '
          + 'siirrettiin talteen museoon vuodesta 1965 lähtien sään ja '
          + 'saasteiden vaurioittamina.'
        + '\n\n'
        + 'Kaarlensilta oli Vltava-joen ainoa ylityspaikka aina '
          + 'vuoteen 1841 asti, ja vielä pitkään sillalla kulki myös '
          + 'hevoskärryjä ja myöhemmin raitiovaunuja. Vasta vuonna 1978 '
          + 'sillasta tehtiin pelkästään jalankulkijoille tarkoitettu.',
      kuvat: [
        {
          tiedosto: 'Charles Bridge (Karlův most), Vltava River, Prague, 2015.jpg',
          selite: 'Kaarlensilta ja Vltava-joki.',
          lahde: 'Peter K Burian, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Vanhauusi synagoga': {
      aika: '1270',
      teksti: 'Vanhauusi synagoga valmistui Prahan juutalaiskortteliin '
          + 'noin vuonna 1270, ja se on Euroopan vanhin yhä toimiva '
          + 'synagoga. Rakennus on goottilaista tyyliä, ja sen '
          + 'kivikattoa kannattelee poikkeuksellinen viisisakarainen '
          + 'holvikaari — useimmissa goottilaisissa rakennuksissa '
          + 'holvissa on neljä tai kuusi sakaraa, mutta täällä niitä on '
          + 'juuri viisi.'
        + '\n\n'
        + 'Synagogassa on kaksitoista pitkää, kapeaa ikkunaa — yksi '
          + 'Israelin jokaista sukukuntaa kohden. Rakennuksen vintillä '
          + 'säilytetään legendan mukaan rabbi Jehuda Löw ben Becalelin '
          + '1500-luvulla luoman Golemin, savesta muovatun '
          + 'jättiläisolennon, ruumista. Kun vintti lopulta todella '
          + 'tutkittiin vuonna 2014, sieltä ei kuitenkaan löytynyt '
          + 'Golemista jälkeäkään.',
      kuvat: [
        {
          tiedosto: 'Prague Praha 2014 Holmstad Den gammelnye synagogen.JPG',
          selite: 'Vanhauusi synagoga Prahan juutalaiskorttelissa.',
          lahde: 'Øyvind Holmstad, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Astronominen kello': {
      aika: '1410',
      teksti: 'Prahan astronominen kello eli Orloj on maailman vanhin yhä '
          + 'toimiva astronominen kello — sen vanhin osa valmistui jo '
          + 'vuonna 1410, ja sen suunnittelivat kellomestari Mikuláš '
          + 'Kadaňista ja matemaatikko Jan Šindel. Kello ei näytä '
          + 'pelkästään kellonaikaa, vaan myös Auringon ja Kuun paikan '
          + 'taivaalla sekä kalenterivuoden.'
        + '\n\n'
        + 'Joka tunti kellon yläpuolella avautuu kaksi pientä '
          + 'ikkunaa, joista kulkee ohi kaikki kaksitoista apostolia. '
          + 'Samalla luurankona kuvattu Kuolema-hahmo soittaa kelloaan, '
          + 'ja muutkin kellon vieressä seisovat patsaat liikahtavat. '
          + 'Legendan mukaan Prahalle käy huonosti, jos kelloa '
          + 'laiminlyödään.'
        + '\n\n'
        + 'Kellon kuunkiertoa näyttävä osa toimii pelkän painovoiman '
          + 'ja ruuvikierteen avulla eikä tarvitse erillistä moottoria, '
          + 'ja se osuu kuun vaiheen kohdalleen niin tarkasti, että '
          + 'virhe on vain noin yksi päivä viidessä vuodessa. Kello '
          + 'selvisi elossa myös toisen maailmansodan pommituksista '
          + 'vuonna 1945 ja saatiin korjattua toimintaan jälleen vuonna '
          + '1948.',
      kuvat: [
        {
          tiedosto: 'Prague - Astronomical Clock Detail 1.JPG',
          selite: 'Prahan astronomisen kellon kellotaulu.',
          lahde: 'Maros Mraz, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kansallismuseo: {
      aika: '1885–1891',
      teksti: 'Prahan kansallismuseo perustettiin jo vuonna 1818, mutta '
          + 'nykyinen komea rakennus Vaclavin aukion päässä valmistui '
          + 'vasta vuosina 1885–1891 arkkitehti Josef Schulzin '
          + 'suunnitelmien mukaan. Museon kokoelmissa on nykyään noin '
          + '14 miljoonaa esinettä — kivennäisistä ja eläimistä '
          + 'keskiaikaisiin käsikirjoituksiin.'
        + '\n\n'
        + 'Elokuussa 1968, kun Varsovan liiton joukot miehittivät '
          + 'Tšekkoslovakian, museon julkisivuun ammuttiin lukuisia '
          + 'luoteja neuvostosotilaiden konekivääreistä. Reiät '
          + 'paikattiin, mutta koska korjauksiin käytettiin hieman '
          + 'vaaleampaa hiekkakiveä kuin alkuperäisessä julkisivussa, '
          + 'luodinreikien paikat erottuvat seinästä yhä tänäkin '
          + 'päivänä.'
        + '\n\n'
        + 'Vuosina 2011–2018 koko museo remontoitiin '
          + 'perusteellisesti, ja kaikki 14 miljoonaa esinettä piti '
          + 'siirtää tilapäisesti muualle — se oli suurin '
          + 'museokokoelman muutto Tšekin historiassa.',
      kuvat: [
        {
          tiedosto: 'Main building of National Museum in Prague.JPG',
          selite: 'Prahan kansallismuseon päärakennus.',
          lahde: 'Interfase, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  wien: {
    Raatihuone: {
      aika: '1872–1883',
      teksti: 'Wienin komea raatihuone rakennettiin vuosina 1872–1883 '
          + 'arkkitehti Friedrich von Schmidtin suunnitelmien mukaan. '
          + 'Rakennuksesta tuli niin kallis — peräti 14 miljoonaa '
          + 'guldenia — että sekä kaupunki että keisarikunta maksoivat '
          + 'siitä yhdessä.'
        + '\n\n'
        + 'Talo on valtava: siellä on 1575 huonetta ja 2035 ikkunaa. '
          + 'Torni kohoaa 98 metrin korkeuteen, ja sen huipulla seisoo '
          + 'rautainen ritarihahmo nimeltä Rathausmann, joka nostaa '
          + 'kokonaiskorkeuden yli sataan metriin. Rakennuksen '
          + 'juhlasali on Itävallan suurin historiallinen sali.'
        + '\n\n'
        + 'Toisen maailmansodan pommitukset vaurioittivat '
          + 'raatihuonetta pahoin, mutta se korjattiin. Nykyään se on '
          + 'Wienin pormestarin työpaikka ja koko kaupungin sydän, '
          + 'jonka edustalla Rathausplatzilla järjestetään yhä suuria '
          + 'juhlia.',
      kuvat: [
        {
          tiedosto: 'Wien Rathaus hochauflösend.jpg',
          selite: 'Wienin raatihuoneen komea uusgoottilainen julkisivu ja '
            + 'torni.',
          lahde: 'Thomas Ledl, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Hofburg: {
      aika: 'noin 1200-luvulta 1913',
      teksti: 'Hofburg ei ole vain yksi linna, vaan kokonainen '
          + 'keisarillinen kaupunginosa, joka kasvoi vähitellen yli 600 '
          + 'vuoden aikana. Vanhin osa, niin sanottu Sveitsiläissiipi, '
          + 'rakennettiin jo 1200-luvulla, ja Habsburgien hallitsijat '
          + 'asuivat ja hallitsivat täältä käsin lähes koko '
          + 'keisarikunnan historian ajan.'
        + '\n\n'
        + 'Linnan sisällä on outo ja hieman kammottavakin huone: '
          + 'Sydänten krypta, jossa säilytetään 54 Habsburg-suvun '
          + 'jäsenen sydäntä hopeisissa uurnissa. Nykyään Hofburgissa '
          + 'työskentelee Itävallan presidentti.'
        + '\n\n'
        + 'Vuosina 1814–1815 Hofburgissa pidettiin Wienin kongressi, '
          + 'jossa Euroopan valtiot neuvottelivat sodan jälkeisistä '
          + 'rajoista. Neuvottelut venyivät niin pitkiksi ja juhlat '
          + 'niin loistokkaiksi, että aikalaiset alkoivat pilkata koko '
          + 'tapahtumaa.',
      lainaus: {
        teksti: 'Kongressi tanssii, mutta ei etene mihinkään.',
        lahde: 'Ruhtinas Charles-Joseph de Ligne Wienin kongressista, '
          + '1814–1815',
      },
      kuvat: [
        {
          tiedosto: 'Wien - Neue Hofburg.JPG',
          selite: 'Hofburgin Neue Burg -siipi ja Heldenplatz-aukio.',
          lahde: 'C.Stadler/Bwag, Wikimedia Commons (CC BY-SA 3.0 AT)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Valtionooppera: {
      aika: '1869',
      teksti: 'Wienin valtionooppera rakennettiin vuosina 1861–1869 '
          + 'uudelle, hienolle Ringstrasse-kehätielle — se oli '
          + 'ensimmäinen suurista rakennuksista, jotka nousivat kadun '
          + 'varrelle. Wieniläiset eivät aluksi pitäneet uudesta '
          + 'talosta lainkaan, vaan vertasivat sitä pilkallisesti '
          + 'uponneeseen aarrearkkuun.'
        + '\n\n'
        + 'Molempien arkkitehtien elämä päättyi surullisesti ennen '
          + 'avajaisia: toinen teki itsemurhan ankaran arvostelun '
          + 'painostamana, ja toinen kuoli sairauteen vain viikkoja '
          + 'myöhemmin. Talo avattiin toukokuussa 1869 Mozartin '
          + 'oopperalla Don Giovanni, eivätkä kumpikaan rakentaja '
          + 'päässyt sitä koskaan näkemään.'
        + '\n\n'
        + 'Pommitus tuhosi oopperatalon pahoin vuonna 1945, mutta se '
          + 'rakennettiin uudelleen ja avattiin taas 1955. Nykyään '
          + 'talossa nähdään vuosittain yli 350 esitystä, ja '
          + 'seisomapaikkalippuja myydään edullisesti vain 80 minuuttia '
          + 'ennen esityksen alkua.',
      kuvat: [
        {
          tiedosto: 'Staatsoper Wien DSC 5273w.jpg',
          selite: 'Wienin valtionoopperan julkisivu Ringstrassen varrella.',
          lahde: 'Peter Haas, Wikimedia Commons (CC BY-SA 3.0 AT)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Stephansdom: {
      aika: '1359–1433',
      teksti: 'Stephansdomin historia alkoi jo vuonna 1137, mutta suuri '
          + 'tulipalo tuhosi kirkon vuonna 1258. Nykyisen goottilaisen '
          + 'kirkon rakentaminen alkoi vuonna 1359, ja eteläinen torni, '
          + 'jota wieniläiset kutsuvat hellästi nimellä Steffl, '
          + 'valmistui vuonna 1433. Se kohoaa 137 metrin korkeuteen.'
        + '\n\n'
        + 'Tornissa vartioitiin öitäkin myöten aina vuoteen 1955 asti '
          + '— vartijat tähyilivät ylhäältä tulipaloja ja jopa '
          + 'vihollisjoukkoja. Katto on vielä hurjempi näky: se on '
          + 'peitetty 230 000 värikkäällä kattotiilellä, jotka '
          + 'muodostavat yhdessä valtavan kaksoiskotkan kuvion.'
        + '\n\n'
        + 'Kirkon pohjoistornissa riippuu Itävallan suurin kello, '
          + 'lempinimeltään Pummerin, joka painaa yli 20 000 kiloa. '
          + 'Kirkon alla kiemurtelevissa katakombeissa lepää yli 11 000 '
          + 'ihmisen jäännökset.',
      kuvat: [
        {
          tiedosto: '0181-0183a - Wien - Stephansdom.jpg',
          selite: 'Stephansdomin laaja ulkonäkymä päiväsaikaan.',
          lahde: 'Andrew Bossi, Wikimedia Commons (CC BY-SA 2.5)',
        },
        {
          tiedosto: 'Wien Stephansdom Dachziegel Gaube.jpg',
          selite: 'Lähikuva katon värikkäistä, kaksoiskotkakuvion '
            + 'muodostavista kattotiilistä.',
          lahde: 'Herbert Heim, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Belvedere: {
      aika: '1712–1723',
      teksti: 'Belvedere rakennettiin vuosina 1712–1723 kesälinnaksi '
          + 'kuuluisalle sotasankarille, prinssi Eugen Savoyilaiselle. '
          + 'Arkkitehti Johann Lukas von Hildebrandt suunnitteli kaksi '
          + 'upeaa palatsia, Ylä- ja Ala-Belvederen, joiden välissä '
          + 'levittäytyvät koristeelliset puutarhat.'
        + '\n\n'
        + 'Prinssin kuoltua palatsin osti keisarinna Maria Theresia, '
          + 'ja vuonna 1776 siitä tehtiin julkinen taidegalleria — yksi '
          + 'Euroopan ensimmäisistä paikoista, joissa tavalliset '
          + 'ihmiset pääsivät ihailemaan taidetta. Nykyään Belvederessä '
          + 'on esillä muun muassa Gustav Klimtin kuuluisa maalaus '
          + 'Suudelma.'
        + '\n\n'
        + 'Vuonna 1955 Ylä-Belvederessä allekirjoitettiin Itävallan '
          + 'valtiosopimus, joka teki maasta jälleen itsenäisen. '
          + 'Palatsin kuva on niin tunnettu, että se löytyy jokaisesta '
          + 'Itävallan 20 sentin kolikosta.',
      kuvat: [
        {
          tiedosto: 'Palacio Belvedere, Viena, Austria, 2020-02-01, DD 93-95 HDR.jpg',
          selite: 'Ylä-Belvedere palatsi ja sen edusta hämärän valossa.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Jättiratas: {
      aika: '1897',
      teksti: 'Praterin puiston jättiratas valmistui vuonna 1897 '
          + 'juhlistamaan keisari Frans Joosef I:n 50-vuotista '
          + 'hallituskautta. Sen suunnittelivat brittiläiset '
          + 'insinöörit. Pyörä oli niin ylivoimainen, että se oli '
          + 'maailman korkein jättiratas peräti 65 vuoden ajan, vuosina '
          + '1920–1985.'
        + '\n\n'
        + 'Pyörä oli lähellä katoamista jo vuonna 1916, kun sille '
          + 'myönnettiin purkulupa — mutta rahat loppuivat, eikä sitä '
          + 'koskaan purettu. Toisessa maailmansodassa pyörä vaurioitui '
          + 'pahoin, ja alkuperäisistä 30 kopista jäljelle jäi vain 15, '
          + 'jotka pyörivät yhä tänään 64,75 metrin korkeudessa.'
        + '\n\n'
        + 'Jättiratas on myös elokuvatähti: se esiintyy kuuluisassa '
          + 'vuoden 1949 elokuvassa Kolmas mies, jonka ikimuistoisin '
          + 'kohtaus kuvattiin suoraan kopin sisällä pyörän kiertäessä '
          + 'korkealla Wienin yllä.',
      lainaus: {
        teksti: 'Sveitsissä oli viisisataa vuotta rauhaa ja demokratiaa — '
          + 'ja mitä se tuotti? Käkikellon.',
        lahde: 'Harry Lime (Orson Welles), elokuva Kolmas mies, 1949, '
          + 'kuvattu jättirattaan kopissa',
      },
      kuvat: [
        {
          tiedosto: 'Wien Riesenrad.jpg',
          selite: 'Praterin jättiratas kuvattuna puiston ulkopuolelta.',
          lahde: 'Thomas Ledl, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  budapest: {
    Kalastajanlinnake: {
      aika: '1895–1902',
      teksti: 'Kalastajanlinnake näyttää keskiaikaiselta satulinnalta '
          + 'Budan kukkulalla, mutta se ei ole koskaan puolustanut '
          + 'ketään. Arkkitehti Frigyes Schulek suunnitteli sen '
          + 'kaunistamaan viereistä Matthias-kirkkoa, ja rakennustyöt '
          + 'kestivät vuodesta 1895 vuoteen 1902. Torneja on tasan '
          + 'seitsemän, ja ne muistuttavat seitsemästä heimosta, jotka '
          + 'asettuivat Karpaattien altaaseen vuonna 895.'
        + '\n\n'
        + 'Nimi tulee keskiaikaisista kalastajista, joiden kerrotaan '
          + 'vartioineen tätä kukkulanreunaa vihollisilta. Nykyään '
          + 'paikalta avautuu yksi kaupungin komeimmista näköaloista '
          + 'Tonavalle ja Pestin puolelle. Toisessa maailmansodassa '
          + 'linnake vaurioitui pahoin, mutta se korjattiin täysin '
          + 'ennalleen vuoteen 1953 mennessä.',
      kuvat: [
        {
          tiedosto: 'Fishermansbastion.jpg',
          selite: 'Kalastajanlinnake Budan puolella, Matthias-kirkon '
            + 'vieressä.',
          lahde: 'Ian Pitchford, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Ketjusilta: {
      aika: '1840–1849',
      teksti: 'Ennen vuotta 1849 Budan ja Pestin välillä ei ollut yhtään '
          + 'pysyvää siltaa — talvella joki jäätyi, keväällä se täyttyi '
          + 'ajojäästä, ja ihmiset joutuivat odottamaan tai '
          + 'turvautumaan veneisiin. Kreivi István Széchenyi tilasi '
          + 'ratkaisun englantilaiselta insinööriltä William Tierney '
          + 'Clarkilta, ja silta valmistui 375 metrin pituisena — '
          + 'aikanaan mullistava insinööritaidon näyte.'
        + '\n\n'
        + 'Sillan päissä makaa neljä kivileijonaa, jotka János '
          + 'Marschalkó veisti vuonna 1852. Kaupungissa kiertää vanha '
          + 'tarina, jonka mukaan leijonilta unohdettiin veistää kielet '
          + '— todellisuudessa kielet ovat paikallaan, ne eivät vain '
          + 'näy kadulta. Vuonna 1945 saksalaisjoukot räjäyttivät '
          + 'sillan sodan lopulla; se rakennettiin uudelleen ja '
          + 'avattiin jälleen vuonna 1949.',
      kuvat: [
        {
          tiedosto: 'Danube River and Chain Bridge in Budapest.jpg',
          selite: 'Ketjusilta yhdistää Budan ja Pestin Tonavan yli.',
          lahde: 'Ivanildo Figueiredo, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Parlamenttitalo: {
      aika: '1885–1904',
      teksti: 'Unkarin parlamenttitalo on niin valtava, että siinä on 691 '
          + 'huonetta, 29 porrashuonetta ja peräti 13 hissiä. '
          + 'Arkkitehti Imre Steindl otti mallia Lontoon '
          + 'parlamenttitalosta ja suunnitteli rakennuksen 96 metrin '
          + 'korkuiseksi — luku viittaa vuoteen 896, jolloin '
          + 'unkarilaiset asettuivat nykyiselle alueelleen. '
          + 'Rakentamiseen käytettiin 40 miljoonaa tiiltä ja lähes 40 '
          + 'kiloa kultaa koristeisiin.'
        + '\n\n'
        + 'Työt alkoivat vuonna 1885 ja valmistuivat vuonna 1904, '
          + 'mutta Steindl itse ei ehtinyt nähdä lopputulosta: hän '
          + 'sokeutui ja kuoli juuri ennen valmistumista. Rakennuksen '
          + 'keskeisessä kuusitoistakulmaisessa salissa säilytetään '
          + 'nykyään Unkarin pyhää kruunua, jota vartioi aina kaksi '
          + 'sotilasta.',
      kuvat: [
        {
          tiedosto: 'Hungarian Parliament Building from across the Danube, 2025-01-11.jpg',
          selite: 'Unkarin parlamenttitalo Tonavan rannalla.',
          lahde: 'Kilyann Le Hen, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Gellértinvuori: {
      aika: '1850–1854',
      teksti: 'Gellértinvuori kohoaa 235 metrin korkeuteen Tonavan yllä, '
          + 'ja sen nimi tulee piispa Gellertistä, joka surmattiin '
          + 'kukkulalla kansannousussa vuonna 1046 — tarinan mukaan '
          + 'hänet suljettiin piikkitynnyriin ja vieritettiin alas '
          + 'rinnettä. Kukkulan sisällä on kuumien lähteiden muovaamia '
          + 'luolia; vuonna 2007 sieltä löytyi kokonainen kristallien '
          + 'peittämä luola, joka on syntynyt jo 300 000–500 000 vuotta '
          + 'sitten.'
        + '\n\n'
        + 'Huipulla seisoo Citadella-linnoitus, jonka Habsburgit '
          + 'rakensivat 1850-luvulla vuoden 1848 kansannousun jälkeen '
          + 'pitääkseen kaupunkia kurissa. Sen vieressä kohoaa iso '
          + 'pronssipatsas, jonka neuvostojoukot pystyttivät toisen '
          + 'maailmansodan jälkeen voiton muistoksi — patsas näkyy '
          + 'lähes joka puolelle kaupunkia ja on yksi Budapestin '
          + 'tunnetuimmista maamerkeistä.',
      kuvat: [
        {
          tiedosto: '20151003 082 Budapest - Gellért Hill (21733573719).jpg',
          selite: 'Citadella-linnoitus Gellértinvuoren huipulla.',
          lahde: 'Sjaak Kempe, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pyhän Tapanin kirkko': {
      aika: '1851–1906',
      teksti: 'Pyhän Tapanin kirkon rakentaminen kesti peräti 55 vuotta, '
          + 'vuodesta 1851 vuoteen 1906, ja matkan varrella tapahtui '
          + 'katastrofi: vuonna 1858 kesken rakennustöiden kupoli '
          + 'romahti, ja lähes valmis rakennus piti purkaa ja aloittaa '
          + 'alusta. Kolme eri arkkitehtia ehti työstää suunnitelmia '
          + 'ennen kuin kirkko vihdoin valmistui.'
        + '\n\n'
        + 'Kirkon kupoli kohoaa 96 metrin korkeuteen, täsmälleen '
          + 'saman verran kuin parlamenttitalon kupoli — kaupungissa '
          + 'kuulemma sovittiin, ettei mikään muu rakennus saisi nousta '
          + 'korkeammalle kuin nämä kaksi. Kirkon sisällä säilytetään '
          + 'yhtä Unkarin oudoimmista aarteista: kuningas Pyhän Tapanin '
          + 'yli tuhat vuotta vanhaa, mumioitunutta oikeaa kättä.',
      kuvat: [
        {
          tiedosto: 'Budapest Szent Istvan Bazilika R01.jpg',
          selite: 'Pyhän Tapanin kirkko Budapestissa.',
          lahde: 'Marc Ryckaert, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Suuri kauppahalli': {
      aika: '1897',
      teksti: 'Suuri kauppahalli avasi ovensa 15. helmikuuta 1897, ja se '
          + 'on yhä Budapestin suurin ja vanhin sisämarkkinahalli — '
          + 'lattiapinta-alaa on peräti 10 000 neliömetriä. Ajatus '
          + 'hallista syntyi jo 1860-luvulla, kun kaupunki tarvitsi '
          + 'paremman paikan ruoan myyntiin.'
        + '\n\n'
        + 'Arkkitehti Samu Pecz suunnitteli hallille teräksisen '
          + 'kattorakenteen, jonka päällä kimaltelevat Pécsin '
          + 'kaupungista tuodut värikkäät Zsolnay-keramiikkalaatat. '
          + 'Toinen maailmansota jätti rakennuksen surkeaan kuntoon '
          + 'vuosikymmeniksi, kunnes se kunnostettiin perusteellisesti '
          + 'ja avattiin uudelleen vuonna 1997.',
      kuvat: [
        {
          tiedosto: 'Great Market Hall Budapest.jpg',
          selite: 'Suuri kauppahalli Budapestin Fővám-torilla.',
          lahde: 'Randy Connolly, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  pariisi: {
    'Eiffel-torni': {
      aika: '1889',
      teksti: 'Kun Pariisiin rakennettiin maailmannäyttelyä varten vuonna '
          + '1889, insinööri Gustave Eiffelin toimisto pystytti Champ '
          + 'de Mars -puistoon 330 metriä korkean rautatornin vain '
          + 'reilussa kahdessa vuodessa. Torniin käytettiin 18 038 '
          + 'metalliosaa ja peräti 2,5 miljoonaa niittiä, ja koko '
          + 'rakennustyön aikana sattui vain yksi kuolemantapaus.'
        + '\n\n'
        + 'Moni pariisilainen taiteilija vihasi tornia aluksi: '
          + 'kolmisensataa taiteilijaa ja kirjailijaa allekirjoitti '
          + 'vetoomuksen, jossa torni tuomittiin rumaksi ja '
          + 'hyödyttömäksi. Kirjailija Guy de Maupassant väitti '
          + 'syövänsä lounasta tornin ravintolassa joka päivä juuri '
          + 'siksi, että se oli ainoa paikka Pariisissa, josta tornia '
          + 'ei näkynyt.'
        + '\n\n'
        + 'Torni oli tarkoitus purkaa jo vuonna 1909, mutta se '
          + 'pelastui, koska siitä tuli tärkeä radiolähetysasema. '
          + 'Toisen maailmansodan lopulla Hitler käski räjäyttää tornin '
          + 'Pariisin vapautuessa — mutta käskyä ei toteltu, ja torni '
          + 'seisoo yhä paikallaan.',
      kuvat: [
        {
          tiedosto: 'Eiffel tower from trocadero.jpg',
          selite: 'Eiffel-torni Trocadéron puutarhoista kuvattuna.',
          lahde: 'NonOmnisMoriar, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Riemukaari: {
      aika: '1806–1836',
      teksti: 'Keisari Napoleon käski rakentaa valtavan riemukaaren '
          + 'vuonna 1806 juhlistamaan Austerlitzin taistelun voittoa. '
          + 'Kaari on lähes 50 metriä korkea, ja sen pintoihin on '
          + 'kaiverrettu 158 taistelun ja 660 sotapäällikön nimet. '
          + 'Napoleon ei koskaan nähnyt valmista kaarta, sillä se '
          + 'saatiin valmiiksi vasta vuonna 1836.'
        + '\n\n'
        + 'Kaaren alla lepää Tuntemattoman sotilaan hauta, jonne '
          + 'haudattiin vuonna 1920 nimetön ranskalaissotilas muistoksi '
          + 'kaikista sodissa kadonneista. Haudalla palaa ikuinen '
          + 'liekki, joka sytytetään uudelleen joka ilta.'
        + '\n\n'
        + 'Vuonna 1919 lentäjä Charles Godefroy lensi '
          + 'kaksitasokoneellaan kaaren läpi — uskomaton temppu, sillä '
          + 'aukko on vain reilut 14 metriä leveä.',
      kuvat: [
        {
          tiedosto: 'Arc de Triomphe, Paris 21 October 2010.jpg',
          selite: 'Riemukaari Pariisissa.',
          lahde: 'Jiuguang Wang, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Concorden aukio': {
      aika: '1757–1772',
      teksti: 'Arkkitehti Ange-Jacques Gabriel suunnitteli Pariisin '
          + 'suurimman aukion 1700-luvulla kuningas Ludvig XV:n '
          + 'kunniaksi. Vallankumouksen aikana aukiolle pystytettiin '
          + 'giljotiini, ja siellä mestattiin muun muassa kuningas '
          + 'Ludvig XVI ja kuningatar Marie Antoinette. Kaikkiaan '
          + 'aukiolla teloitettiin yli tuhat ihmistä reilun vuoden '
          + 'aikana.'
        + '\n\n'
        + 'Aukion keskellä kohoaa 23-metrinen, yli 3 300 vuotta vanha '
          + 'Luxorin obeliski, jonka Egyptin hallitsija lahjoitti '
          + 'Ranskalle marraskuussa 1830. Kivijättiläinen tuotiin laivalla '
          + 'Niililtä asti ja pystytettiin aukiolle vuonna 1836 '
          + 'valtavan väkijoukon seuratessa.'
        + '\n\n'
        + 'Nykyään aukiolla poreilevat komeat suihkulähteet ja sitä '
          + 'reunustavat kahdeksan naispatsasta, jotka kuvaavat Ranskan '
          + 'suurkaupunkeja.',
      kuvat: [
        {
          tiedosto: 'Obelisk and fountain in Place de la Concorde, Paris.JPG',
          selite: 'Luxorin obeliski ja suihkulähde Concorden aukiolla.',
          lahde: 'Rodrigo Menezes, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Louvre: {
      aika: '1793',
      teksti: 'Louvre ei ollut alun perin museo vaan linnoitus: kuningas '
          + 'Filip II rakennutti sen 1100-luvun lopulla puolustamaan '
          + 'Pariisia. Vuosisatojen kuluessa siitä tehtiin '
          + 'kuninkaallinen palatsi, kunnes Ranskan vallankumouksen '
          + 'jälkeen se avattiin kaikille kansalaisille museona '
          + 'elokuussa 1793.'
        + '\n\n'
        + 'Nykyään Louvressa on esillä noin 35 000 taideteosta, ja '
          + 'koko kokoelmassa on peräti 500 000 esinettä. Museo on '
          + 'maailman suurin, ja sen käytävät ovat kilometrien '
          + 'mittaiset.'
        + '\n\n'
        + 'Vuonna 1989 palatsin sisäpihalle nousi yllättävä uutuus: '
          + 'arkkitehti I. M. Pein suunnittelema lasinen pyramidi, '
          + 'josta tuli museon pääsisäänkäynti. Aluksi moni '
          + 'pariisilainen paheksui lasirakennelmaa vanhan palatsin '
          + 'edessä, mutta siitä tuli pian yksi Pariisin tunnetuimmista '
          + 'maamerkeistä.',
      kuvat: [
        {
          tiedosto: 'Louvre Museum Wikimedia Commons.jpg',
          selite: 'Louvren lasipyramidi ja palatsin siivet '
            + 'iltavalaistuksessa.',
          lahde: 'Benh Lieu Song, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sacré-Cœur': {
      aika: '1875–1914',
      teksti: 'Basilika Sacré-Cœur eli Pyhän sydämen kirkko rakennettiin '
          + 'Montmartren kukkulan huipulle sen jälkeen, kun Ranska oli '
          + 'hävinnyt sodan Preussille vuonna 1870. Arkkitehti Paul '
          + 'Abadie valittiin suunnittelijaksi peräti 77 ehdotuksen '
          + 'joukosta, ja kirkko valmistui vasta 40 vuotta myöhemmin.'
        + '\n\n'
        + 'Kirkon ulkoseinät on tehty erikoisesta '
          + 'travertiini-kalkkikivestä, joka valkenee sateella eikä '
          + 'koskaan tummu — siksi kirkko hohtaa yhä valkoisena, vaikka '
          + 'se on jo yli sata vuotta vanha. Sisällä kattoa koristaa '
          + 'yksi maailman suurimmista mosaiikeista, joka on koottu 25 '
          + '000 pienestä keraamisesta palasesta.'
        + '\n\n'
        + 'Tornissa riippuu "Savoyarde", Ranskan suurin kello, joka '
          + 'painaa lähes 19 tonnia. Kirkon huipulta, 200 metrin '
          + 'korkeudesta Seine-joen yläpuolelta, avautuu näkymä koko '
          + 'Pariisiin.',
      kuvat: [
        {
          tiedosto: 'Paris - Basilique du Sacré-Cœur de Montmartre - 2025-09-30 23-31-57 001.jpg',
          selite: 'Sacré-Cœurin basilika Montmartren kukkulalla.',
          lahde: 'Giò Terra, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Notre-Dame': {
      aika: '1163–1345',
      teksti: 'Notre-Damen katedraalin rakentaminen kesti uskomattomat '
          + '182 vuotta — työ alkoi vuonna 1163 ja valmistui vasta '
          + '1345. Kirkko oli aikansa insinööritaidon huippu: sen '
          + 'kivikattoa kannattelevat ulkopuoliset tukikaaret, niin '
          + 'sanotut lentävät tukipilarit, jotka keksittiin juuri '
          + 'tällaisia jättimäisiä kirkkoja varten.'
        + '\n\n'
        + 'Katedraalissa on tapahtunut historian suuria hetkiä: '
          + 'vuonna 1804 Napoleon kruunasi itsensä keisariksi kirkon '
          + 'alttarilla, ja vuonna 1944 kenraali de Gaulle kiitti '
          + 'Jumalaa Pariisin vapautumisesta samassa kirkossa.'
        + '\n\n'
        + 'Huhtikuussa 2019 katedraalin vintillä syttyi tulipalo, '
          + 'joka tuhosi vanhan puukaton ja tornihuipun. Palomiehet '
          + 'onnistuivat kuitenkin pelastamaan tornit, julkisivun ja '
          + 'lasimaalaukset. Katedraali korjattiin ennätysajassa, ja se '
          + 'avattiin yleisölle uudelleen joulukuussa 2024.',
      kuvat: [
        {
          tiedosto: 'Notre-Dame de Paris, 4 October 2017.jpg',
          selite: 'Notre-Damen katedraali Seine-joen rannalla.',
          lahde: 'Ali Sabbagh, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  helsinki: {
    'Temppeliaukion kirkko': {
      aika: '1968–1969',
      teksti: 'Temppeliaukion kirkko on louhittu suoraan Töölön '
          + 'kalliomäkeen. Sitä alettiin rakentaa helmikuussa 1968, ja '
          + 'se vihittiin käyttöön syyskuussa 1969. Suunnittelijat, '
          + 'veljekset Timo ja Tuomo Suomalainen, eivät aluksi '
          + 'uskaltaneet edes ehdottaa kilpailussa niin rohkeaa ideaa '
          + 'kuin paljas, räjäytetty kalliopinta sisäseininä — lopulta '
          + 'juuri se teki kirkosta ainutlaatuisen.'
        + '\n\n'
        + 'Katossa kiertää kupariholvi, jota reunustava ikkunarengas '
          + 'päästää päivänvalon virtaamaan sisään pitkin karkeaa '
          + 'kiveä. Kirkossa ei ole lainkaan oikeita kelloja: kellojen '
          + 'ääni kuuluu kaiuttimista nauhalta. Kalliopinnat tekevät '
          + 'tilasta niin kaikuisan, että urkujen 3001 pilliä ja '
          + 'konsertit kuulostavat siellä poikkeuksellisen hyviltä.'
        + '\n\n'
        + 'Kesällä 1968, kun kirkkoa vielä rakennettiin, joukko '
          + 'nuoria maalasi ulkoseinään sanan BIAFRA muistuttaakseen '
          + 'nälänhädän uhreista Afrikassa. Nykyään kirkossa käy silti '
          + 'noin puoli miljoonaa vierailijaa joka vuosi.',
      kuvat: [
        {
          tiedosto: 'Lascar Temppeliaukio Church (4548628589).jpg',
          selite: 'Kirkkosali kallioseinineen kuparikupolin ja '
            + 'valokehän alla.',
          lahde: 'Jorge Láscar, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Päärautatieasema: {
      aika: '1919',
      teksti: 'Nykyinen asemarakennus syntyi arkkitehti Eliel Saarisen '
          + 'kilpailuehdotuksesta, jonka nimi oli "Siivekäs pyörä '
          + 'maapallon päällä". Rakennustyöt alkoivat vuonna 1912, '
          + 'mutta ensimmäinen maailmansota hidasti niitä — kesken '
          + 'rakennustöiden asema toimi jopa venäläisten '
          + 'sotilassairaalana vuosina 1915–1916. Uusi asema avattiin '
          + 'lopulta 5. maaliskuuta 1919.'
        + '\n\n'
        + 'Pääsisäänkäyntiä vartioi neljä kivijättiläistä, niin '
          + 'kutsuttua lyhdynkantajaa, jotka kuvanveistäjä Emil '
          + 'Wikström loi — jokainen patsas pitelee kädessään valaistua '
          + 'palloa. Kellotorniin kellot asennettiin vasta vuonna 1922, '
          + 'ja julkisivun punainen graniitti tuotiin kaukaa Hangosta.'
        + '\n\n'
        + 'Nykyään asemalla vilisee vilkkaimpina päivinä yli 200 000 '
          + 'ihmistä. Brittiläinen BBC valitsi aseman vuonna 2013 '
          + 'yhdeksi maailman kauneimmista rautatieasemista.',
      lainaus: {
        teksti: 'Yksi maailman kauneimmista rautatieasemista.',
        lahde: 'BBC, 2013',
      },
      kuvat: [
        {
          tiedosto: 'Estación central de FF.CC. de Helsinki, Finlandia, 2012-08-14, DD 08.JPG',
          selite: 'Aseman graniittijulkisivu ja pääsisäänkäynnin suuri '
            + 'kaari-ikkuna kesäpäivänä.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kaisaniemen puisto': {
      aika: '1812',
      teksti: 'Kaisaniemi on Helsingin vanhin julkinen puisto — se sai '
          + 'alkunsa jo vuonna 1812. Puisto on saanut nimensä '
          + 'paikallisesta naisesta, Catharina eli "Kajsa" '
          + 'Wahllundista. Vuonna 1829 osa alueesta annettiin Helsingin '
          + 'yliopistolle puutarhaksi, ja vuonna 1889 sinne avattiin '
          + 'ensimmäinen kasvihuone — Kaisaniemen kasvitieteellinen '
          + 'puutarha kasvattaa siellä kasveja edelleen.'
        + '\n\n'
        + 'Puistosta löytyy myös Helsingin vanhin julkinen '
          + 'muistomerkki sekä jalkapallo-, tennis- ja '
          + 'koripallokenttiä. Puisto sijaitsee aivan päärautatieaseman '
          + 'kupeessa, joten se on ollut vuosikymmenien ajan '
          + 'helsinkiläisten suosima kohtauspaikka.'
        + '\n\n'
        + 'Puistossa on juhlittu isojakin asioita: vuonna 2019 '
          + 'tuhannet ihmiset kokoontuivat sinne juhlimaan Suomen '
          + 'jääkiekkomaajoukkueen MM-kultaa.',
      kuvat: [
        {
          tiedosto: 'Pond in Kaisaniemi Park - Marit Henriksson.jpg',
          selite: 'Kasvitieteellisen puutarhan lampi ilta-auringossa, '
            + 'kaupungin talot kuvastuvat veteen.',
          lahde: 'Marit Henriksson, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Tuomiokirkko: {
      aika: '1830–1852',
      teksti: 'Senaatintorin valkoisen tuomiokirkon suunnitteli '
          + 'saksalaissyntyinen arkkitehti Carl Ludvig Engel. '
          + 'Rakennustyöt alkoivat vuonna 1830, mutta Engel kuoli jo '
          + 'vuonna 1840 ennen kirkon valmistumista. Kirkko vihittiin '
          + 'lopulta käyttöön 15. helmikuuta 1852. Aluksi sitä '
          + 'kutsuttiin Nikolainkirkoksi Venäjän keisarin mukaan, ja '
          + 'nykyisen nimensä se sai vasta Suomen itsenäistyttyä 1917.'
        + '\n\n'
        + 'Kirkon vihreä kupoli ja sitä ympäröivät neljä pienempää '
          + 'kupolia näkyvät kauas merelle asti. Katolla seisoo 12 '
          + 'sinkistä valettua apostolinpatsasta, jotka valmistettiin '
          + 'Berliinissä 1840-luvulla.'
        + '\n\n'
        + 'Kirkkoon mahtuu istumaan 1300 ihmistä. Moni suomalainen '
          + 'tunnistaa kirkon myös tutulta musiikkivideolta — se näkyy '
          + 'Darude-artistin Sandstorm-kappaleen videon alussa.',
      kuvat: [
        {
          tiedosto: 'Helsinki\'s Cathedral.jpg',
          selite: 'Helsingin tuomiokirkko vihreine kupoleineen Senaatintorin '
            + 'laidalla.',
          lahde: 'Julie Tsarfati, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Uspenskin katedraali': {
      aika: '1862–1868',
      teksti: 'Katajanokan kalliolla kohoava Uspenskin katedraali on '
          + 'Pohjois- ja Länsi-Euroopan suurin ortodoksinen kirkko. Sen '
          + 'suunnitteli venäläinen arkkitehti Aleksei Gornostajev, '
          + 'mutta hän ehti kuolla ennen rakennustöiden alkua — '
          + 'rakentamista johti lopulta insinööri Ivan Varnek vuosina '
          + '1862–1868.'
        + '\n\n'
        + 'Kirkko muurattiin lähes 700 000 tiilestä, jotka purettiin '
          + 'Bomarsundin linnoituksesta Ahvenanmaalta ja kuljetettiin '
          + 'proomuilla Helsinkiin asti. Katedraali vihittiin käyttöön '
          + '25. lokakuuta 1868.'
        + '\n\n'
        + 'Kirkon sisällä kultaiset ikonit ja kuvakaiteen eli '
          + 'ikonostaasin maalasi Pavel Shiltsov. Nykyään katedraalissa '
          + 'käy noin puoli miljoonaa vierailijaa vuodessa ihailemassa '
          + 'sen punatiilistä ulkoasua ja kultaisia kupoleita.',
      kuvat: [
        {
          tiedosto: 'Uspenski Cathedral gilded domes 01.jpg',
          selite: 'Katedraalin kultaiset sipulikupolit ja punatiiliset '
            + 'tornit sinitaivasta vasten.',
          lahde: 'Sinikka Halme, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Johanneksenkirkko: {
      aika: '1888–1891',
      teksti: 'Ullanlinnassa seisova Johanneksenkirkko on Suomen suurin '
          + 'kivikirkko istumapaikkojen määrällä — sinne mahtuu peräti '
          + '2600 ihmistä. Ruotsalainen arkkitehti Adolf Melander '
          + 'suunnitteli sen goottilaista tyyliä mukaillen, ja kirkko '
          + 'rakennettiin vuosina 1888–1891 kukkulalle, jolla ennen '
          + 'poltettiin juhannuskokkoja.'
        + '\n\n'
        + 'Kirkon kaksoistornit kohoavat 74 metrin korkeuteen ja '
          + 'näkyvät kauas ympäri kaupunkia. Sisällä alttaritaulun '
          + '"Jumalallinen ilmestys" maalasi taidemaalari Eero '
          + 'Järnefelt vuonna 1932.'
        + '\n\n'
        + 'Kirkon urkuja on kasvatettu vuosikymmenien varrella: '
          + 'ensimmäiset urut tulivat Saksasta vuonna 1891, ja nykyisin '
          + 'niissä on peräti 66 äänikertaa ja 4036 pilliä — yksi maan '
          + 'suurimmista urkuinstrumenteista.',
      kuvat: [
        {
          tiedosto: 'Johanneksenkirkko Helsinki 2006-08-15.jpg',
          selite: 'Johanneksenkirkon kaksoistornit ja punatiilinen '
            + 'julkisivu kesäauringossa.',
          lahde: 'KFP, Wikimedia Commons (PD)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Suomenlinna: {
      aika: '1748',
      teksti: 'Merilinnoitus Suomenlinna alkoi nousta kahdeksalle '
          + 'saarelle Helsingin edustalla vuonna 1748, kun Ruotsin '
          + 'kruunu halusi vahvan tukikohdan Venäjää vastaan. Työmaalla '
          + 'riitti väkeä: parhaimmillaan vuonna 1755 linnoitusta '
          + 'rakensi yhtä aikaa noin 7000 työntekijää. Alun perin '
          + 'linnoitus tunnettiin nimellä Sveaborg.'
        + '\n\n'
        + 'Maineestaan huolimatta — sitä kutsuttiin "Pohjolan '
          + 'Gibraltariksi" — linnoitus antautui venäläisille jo vuonna '
          + '1808, vain parin kuukauden piirityksen jälkeen. Vuonna '
          + '1855 Krimin sodan aikana Englannin ja Ranskan laivastot '
          + 'pommittivat saaria voimakkaasti.'
        + '\n\n'
        + 'Linnoitus sai suomenkielisen nimensä Suomenlinna vasta '
          + 'vuonna 1918, ja vuonna 1991 siitä tuli Unescon '
          + 'maailmanperintökohde. Nykyään saarilla asuu ympäri vuoden '
          + 'noin 900 ihmistä.',
      kuvat: [
        {
          tiedosto: 'Kuninkaanportti Kustaanmiekka Suomenlinna 2022-09-17 01.jpg',
          selite: 'Kuninkaanportti Kustaanmiekan nurmivallien välissä — '
            + 'linnoituksen juhlava pääportti mereltä.',
          lahde: 'Leonhard Lenz, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  ateena: {
    'Antiikin agora': {
      aika: '500-luku eaa.',
      teksti: 'Antiikin agora oli vanhan Ateenan sydän. Jo 500-luvulta '
          + 'eaa. lähtien tälle aukiolle kokoontuivat kauppiaat, '
          + 'poliitikot ja tavalliset kaupunkilaiset. Toreilla myytiin '
          + 'hedelmiä, kankaita, saviastioita ja tuoksuvia voiteita, ja '
          + 'yllättävän moni myyjä oli nainen, vaikka naiset viettivät '
          + 'muuten aikansa yleensä kotona.'
        + '\n\n'
        + 'Agoran laidalla seisoo yhä pystyssä Hefaistoksen temppeli, '
          + 'yksi maailman parhaiten säilyneistä antiikin '
          + 'kreikkalaisista temppeleistä. Se on kestänyt lähes '
          + 'koskemattomana yli 2 400 vuotta, vaikka moni muu agoran '
          + 'rakennus on murentunut ajan saatossa.'
        + '\n\n'
        + 'Arkeologit ovat kaivaneet agoraa esiin vuodesta 1931 '
          + 'lähtien: pelkästään vuoteen 1935 mennessä maasta nousi '
          + 'noin 600 patsasta, yli 6 000 saviastian palaa ja 41 000 '
          + 'kolikkoa. Vuonna 1974 löytyi jopa lyijytaulu, jolle '
          + 'orjapoika Lesis oli kirjoittanut kirjeen.',
      kuvat: [
        {
          tiedosto: 'Temple of Hephaestus from ancient agora Athens.jpg',
          selite: 'Hefaistoksen temppeli antiikin agoran laidalla.',
          lahde: 'Jebulon, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Attalos Stoa.jpg',
          selite: 'Attaloksen pylväikkö rakennettiin uudelleen 1950-luvulla alkuperäisin mitoin — sen varjoisa käytävä on sama, jossa ateenalaiset kävelivät 2 100 vuotta sitten.',
          lahde: 'Mirjanamimi, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Akropolis: {
      aika: '460–430 eaa.',
      teksti: 'Akropolis kohoaa 150 metrin korkeuteen jyrkällä kalliolla '
          + 'keskellä Ateenaa. Ensimmäiset ihmiset asuivat kalliolla jo '
          + 'tuhansia vuosia sitten, ja pronssikaudella sen ympärille '
          + 'rakennettiin valtava puolustusmuuri, joka oli peräti 760 '
          + 'metriä pitkä.'
        + '\n\n'
        + 'Persialaiset tuhosivat kukkulan temppelit vuonna 480 eaa., '
          + 'mutta valtiomies Perikleen johdolla Ateena rakensi tilalle '
          + 'vielä komeamman kokonaisuuden vuosina 460–430 eaa. Silloin '
          + 'nousivat muun muassa Parthenon ja Erekhteion, jonka '
          + 'pylväinä seisoo kuusi naishahmoista patsasta.'
        + '\n\n'
        + 'Toisen maailmansodan aikana, vuonna 1941, nuori Manolis '
          + 'Glezos kiipesi salaa yöllä Akropolikselle ja repi alas '
          + 'natsi-Saksan lipun — rohkea teko, josta tuli koko Kreikan '
          + 'vastarinnan symboli.',
      kuvat: [
        {
          tiedosto: 'Acropolis, Athens-13.jpg',
          selite: 'Näkymä Akropolikselle, Ateenan antiikin pyhälle kalliolle.',
          lahde: 'Syawwwish, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Parthenon from south.jpg',
          selite: 'Parthenonin pylväsrivi iltavalossa, edessä maahan '
            + 'aseteltuja marmorilohkoja restaurointia varten.',
          lahde: 'Thermos, Wikimedia Commons (CC BY-SA 2.5)',
        },
        {
          tiedosto: 'Erechtheum Acropolis Athens.jpg',
          selite: 'Erekhtheionin kuistia kannattelevat karyatidit — kuusi marmorineitoa pylväiden paikalla.',
          lahde: 'Jebulon, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Zeuksen temppeli': {
      aika: '561 eaa. – 131 jaa.',
      teksti: 'Zeuksen temppeli on yksi antiikin ajan suurimmista '
          + 'rakennushankkeista — ja hitaimmista. Sen rakentaminen '
          + 'aloitettiin jo 500-luvulla eaa., mutta työt keskeytyivät '
          + 'moneen kertaan. Temppeli valmistui vasta vuonna 131 jaa., '
          + 'kun Rooman keisari Hadrianus vihki sen käyttöön — '
          + 'rakentamiseen meni siis yli 600 vuotta!'
        + '\n\n'
        + 'Valmiina temppeli oli valtava: yli 110 metriä pitkä, ja '
          + 'sitä ympäröi 104 jättimäistä korinttilaista pylvästä, '
          + 'joista jokainen oli 17 metriä korkea. Sisällä seisoi '
          + 'kultaa ja norsunluuta oleva jättipatsas itse Zeuksesta.'
        + '\n\n'
        + 'Nykyään pystyssä on enää 15 pylvästä. Yhden pylvään '
          + 'ottomaanihallitsija tuhotti vuonna 1759 kalkin polttamista '
          + 'varten, ja toinen kaatui myrskyssä vuonna 1852 — se makaa '
          + 'yhä maassa siinä missä putosi.',
      kuvat: [
        {
          tiedosto: '1011 Temple of Olympian Zeus in Athens Photo by Giles Laurent.jpg',
          selite: 'Zeuksen temppelin jättiläismäiset korinttilaiset pylväät.',
          lahde: 'Giles Laurent, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Temple of Olympian Zeus, Athens - panoramio.jpg',
          selite: 'Korinttilaiset pylväät kohoavat 17 metriin — temppelistä on jäljellä 15 pylvästä yli sadasta.',
          lahde: 'tamara semina, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sýntagman aukio': {
      aika: '1843',
      teksti: 'Sýntagman aukio tarkoittaa "perustuslain aukiota". Vuonna '
          + '1843 sotilaat ja kaupunkilaiset kokoontuivat vanhan '
          + 'kuninkaanlinnan eteen vaatimaan kuningas Otolta Kreikalle '
          + 'perustuslakia. Vaatimus onnistui, ja aukio nimettiin '
          + 'tapahtuman kunniaksi.'
        + '\n\n'
        + 'Entinen kuninkaanlinna aukion laidalla toimii nykyään '
          + 'Kreikan parlamenttitalona, ja sen edessä sijaitsee '
          + 'Tuntemattoman sotilaan hauta. Sitä vartioivat perinteisiin '
          + 'univormuihin pukeutuneet evzon-kaartilaiset, jotka '
          + 'vaihtavat vartiota juhlallisen hitaasti joka tunti.'
        + '\n\n'
        + 'Aukio on yhä Ateenan sykkivä keskus: sen alla risteävät '
          + 'metrolinjat, ja talvisin torille pystytetään iso '
          + 'joulukuusi.',
      kuvat: [
        {
          tiedosto: 'Syntagma square Athens.jpg',
          selite: 'Sýntagman aukio, Ateenan sykkivä keskusaukio '
            + 'parlamenttitalon edessä.',
          lahde: 'M. Stefanović, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Evzones at Changing of the Guard, Syntagma Square, Athens.JPG',
          selite: 'Evzone-kaartilaiset vaihtavat vartiota tuntemattoman sotilaan haudalla — hameessa on 400 laskosta, yksi jokaiselle vieraan vallan vuodelle.',
          lahde: 'Marshallhenrie, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Hellenic Parliament from high above.jpg',
          selite: 'Parlamenttitalo ja Sýntagman aukio ylhäältä — takana lumihuippuinen Hymettos-vuori.',
          lahde: 'Gerard McGovern, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Lykavittós: {
      aika: '1800-luku',
      teksti: 'Tarinan mukaan Lykavittós-kukkula syntyi, kun jumalatar '
          + 'Athena kantoi valtavaa kalkkikivilohkaretta mutta pudotti '
          + 'sen yllättäen keskelle Ateenaa. Todellisuudessa kukkula on '
          + 'kaupungin korkein kohta, 277 metriä merenpinnasta, ja sen '
          + 'rinteet ovat täynnä tuoksuvaa mäntymetsää.'
        + '\n\n'
        + 'Huipulla seisoo pieni, 1800-luvulla rakennettu Pyhän Yrjön '
          + 'kappeli sekä avoin amfiteatteri, jossa on aikoinaan nähty '
          + 'jopa Bob Dylanin kaltaisia maailmantähtiä.'
        + '\n\n'
        + 'Huipulle pääsee kävellen tai köysirautatiellä. Nimen '
          + 'Lykavittós arvellaan juontuvan kreikan sanasta "lykos", '
          + 'susi — ehkä kukkula oli aikoinaan yksinäisten susien '
          + 'piilopaikka kaupungin laidalla.',
      kuvat: [
        {
          tiedosto: 'View of Lycabettus Hill from the Areopagus, Athens, 20240531 1216 9596.jpg',
          selite: 'Lykavittós-kukkula kohoaa Ateenan ylle — kaupungin korkein '
            + 'kohta.',
          lahde: 'Jakub Hałun, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'View of Athens from Lycabettus Hill.jpg',
          selite: 'Näkymä Lykavittókselta: Akropolis nousee kaupungin keskeltä ja Saroninlahti siintää takana.',
          lahde: 'DaringDonna, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kallimarmaro: {
      aika: '144 jaa. – 1896',
      teksti: 'Kallimarmaro tarkoittaa "kauniisti marmoroitua" — se on '
          + 'maailman ainoa stadion, joka on kokonaan valkoista '
          + 'marmoria. Rikas roomalainen Herodes Atticus rakennutti sen '
          + 'vanhan juoksuradan paikalle, ja se valmistui noin vuonna '
          + '144 jaa. mahtuen istumaan 50 000 katsojaa.'
        + '\n\n'
        + 'Vuosisatojen ajan unohduksissa maannut stadion kaivettiin '
          + 'esiin ja kunnostettiin, kun Ateenassa järjestettiin '
          + 'ensimmäiset nykyaikaiset olympialaiset vuonna 1896. '
          + 'Avajaisia seurasi paikan päällä noin 60 000 katsojaa.'
        + '\n\n'
        + 'Kallimarmaro näkyy vuodesta 2004 lähtien jokaisessa '
          + 'olympiamitalissa, ja katsomon penkkien joukossa on '
          + 'kaiverrettuina pöllöjä, Athenan pyhiä lintuja.',
      kuvat: [
        {
          tiedosto: 'Panathenaic stadium panorama.jpg',
          selite: 'Kallimarmaro, maailman ainoa kokonaan marmorista '
            + 'rakennettu stadion.',
          lahde: 'Vangelisb, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: '1896 Olympic opening ceremony.jpg',
          selite: 'Ensimmäisten uuden ajan olympialaisten avajaiset Kallimarmarolla huhtikuussa 1896 — katsomossa 80 000 ihmistä.',
          lahde: 'Wikimedia Commons (PD)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  amsterdam: {
    Keskusrautatieasema: {
      aika: '1889',
      teksti: 'Amsterdamin komea keskusrautatieasema valmistui vuonna '
          + '1889, mutta se ei seiso tavallisella maalla. Rakentajat '
          + 'loivat sille kolme keinotekoista saarta keskelle IJ-lahtea '
          + 'ja löivät pohjaan lähes 8 700 puupaalua, jotta koko asema '
          + 'pysyisi pystyssä pehmeässä maaperässä.'
        + '\n\n'
        + 'Aseman suunnitteli arkkitehti Pierre Cuypers, sama mies '
          + 'joka rakensi kuuluisan Rijksmuseumin. Siksi asema '
          + 'muistuttaakin enemmän satulinnaa kuin junapysäkkiä: siinä '
          + 'on kaksi tornia ja kivikoristeita.'
        + '\n\n'
        + 'Nykyään asemalla vilisee joka päivä lähes 200 000 '
          + 'matkustajaa, ja sen pisin laituri on lähes 700 metriä — '
          + 'toiseksi pisin koko Alankomaissa.',
      lainaus: {
        teksti: 'Mahdollisimman ruma hyökkäys kaupunkimme kauneutta '
          + 'vastaan.',
        lahde: 'Amsterdamilaisten aikalaisten arvio asemasta, siteerannut '
          + 'historioitsija Geert Mak',
      },
      kuvat: [
        {
          tiedosto: 'Amsterdam Centraal - panoramio (1).jpg',
          selite: 'Amsterdamin keskusrautatieasema ulkoa kuvattuna.',
          lahde: 'Arwin Meijer, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Anne Frankin talo': {
      aika: '1960',
      teksti: 'Kanaalin varrella Prinsengrachtilla seisova talo '
          + 'rakennettiin jo vuonna 1635, mutta maailmankuuluksi se '
          + 'tuli toisen maailmansodan aikana. Vuonna 1942 juutalainen '
          + 'Frank-perhe piiloutui talon takaosaan salaiseen kätköön, '
          + 'jonne pääsi vain kääntyvän kirjahyllyn takaa.'
        + '\n\n'
        + 'Perhe ja neljä muuta piileskelivät siellä lähes kaksi '
          + 'vuotta. Nuori Anne kirjoitti koko ajan päiväkirjaa, josta '
          + 'tuli sodan jälkeen yksi maailman luetuimmista kirjoista — '
          + 'isä Otto oli perheestä ainoa, joka selvisi hengissä.'
        + '\n\n'
        + 'Talo avattiin museona vuonna 1960, ja nykyään siellä '
          + 'vierailee joka vuosi yli miljoona ihmistä ympäri maailman.',
      lainaus: {
        teksti: 'Uskon yhä, kaikesta huolimatta, että ihmiset ovat '
          + 'sisimmältään hyviä.',
        lahde: 'Anne Frank, päiväkirja (1944)',
      },
      kuvat: [
        {
          tiedosto: 'Amsterdam (NL), Anne-Frank-Huis -- 2015 -- 7185.jpg',
          selite: 'Anne Frankin talo Prinsengrachtin varrella.',
          lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kuninkaanpalatsi: {
      aika: '1648–1655',
      teksti: 'Dam-aukion laidalla kohoava komea rakennus ei ollut alun '
          + 'perin palatsi lainkaan, vaan Amsterdamin raatihuone. Se '
          + 'rakennettiin vuosina 1648–1655 vanhan raatihuoneen '
          + 'paikalle, joka oli palanut poroksi vuonna 1652.'
        + '\n\n'
        + 'Rakennus on niin painava, että sen alle piti lyödä lähes '
          + '13 700 puupaalua. Katolla seisoo kuuden metrin korkuinen '
          + 'Atlas-patsas, joka kannattelee koko maapalloa harteillaan.'
        + '\n\n'
        + 'Raatihuoneesta tuli kuninkaallinen palatsi vasta '
          + '1800-luvun alussa. Nykyään siellä otetaan vastaan '
          + 'valtiovieraita, mutta perustus on yhä sama vanha '
          + 'puupaalumetsä maan alla.',
      kuvat: [
        {
          tiedosto: 'Amsterdam - Koninklijk Paleis (30265843216).jpg',
          selite: 'Kuninkaanpalatsi Dam-aukiolla.',
          lahde: 'Fred Romero, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Rembrandtin talo': {
      aika: '1911',
      teksti: 'Taidemaalari Rembrandt osti tämän talon '
          + 'Jodenbreestraatilta vuonna 1639 peräti 13 000 guldenilla. '
          + 'Talo itse oli rakennettu jo vuonna 1606, mutta Rembrandt '
          + 'asui ja työskenteli siinä 19 vuoden ajan, maalasi '
          + 'mestariteoksiaan yläkerrassa ja piti taidekauppaa '
          + 'alakerrassa.'
        + '\n\n'
        + 'Onni ei kestänyt: Rembrandt joutui rahavaikeuksiin, ja '
          + 'talo myytiin huutokaupalla vuonna 1658 tappiolla. '
          + 'Vuosisatojen kuluessa talo rapistui, kunnes kaupunki osti '
          + 'ja kunnosti sen 1900-luvun alussa.'
        + '\n\n'
        + 'Museo avattiin vuonna 1911. Vuonna 1997 talon vanhasta '
          + 'käymäläkuopasta löytyi yllättäen kaksi savista ruukkua, '
          + 'joita Rembrandt oli aikoinaan käyttänyt maalauskankaidensa '
          + 'valmisteluun.',
      kuvat: [
        {
          tiedosto: 'Rembrandt huis - panoramio.jpg',
          selite: 'Rembrandtin talo Jodenbreestraatilla.',
          lahde: 'Kell Kell, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Artis-eläintarha': {
      aika: '1838',
      teksti: 'Artis on Alankomaiden vanhin eläintarha — se perustettiin '
          + 'jo vuonna 1838 kolmen eläintieteestä innostuneen '
          + 'amsterdamilaisen toimesta. Se on koko maailmankin '
          + 'viidenneksi vanhin yhä toimiva eläintarha.'
        + '\n\n'
        + 'Puistossa asuu nykyään lähes 900 eri eläinlajia. Alueella '
          + 'on myös vuonna 1882 avattu akvaario, planetaario ja '
          + 'mikrobeille omistettu museo nimeltä Micropia.'
        + '\n\n'
        + 'Artiksella on myös surullinen ennätys: siellä kuoli vuonna '
          + '1883 maailman viimeinen kvagga, puoliksi raidallinen '
          + 'seepran sukulainen. Sen jälkeen koko laji katosi '
          + 'maapallolta ikuisesti.',
      kuvat: [
        {
          tiedosto: 'Portail Accès Parc Artis Plantage Kerklaan - Amsterdam (NL32) - 2024-11-27 - 1.jpg',
          selite: 'Artis-eläintarhan sisäänkäynti Amsterdamissa.',
          lahde: 'Chabe01, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Rijksmuseum: {
      aika: '1885',
      teksti: 'Alankomaiden valtakunnanmuseo perustettiin jo vuonna 1798, '
          + 'mutta se muutti nykyiseen komeaan rakennukseensa vasta '
          + 'vuonna 1885. Talon suunnitteli arkkitehti Pierre Cuypers, '
          + 'sama mies joka rakensi Amsterdamin keskusrautatieaseman — '
          + 'siksi ne muistuttavatkin hieman toisiaan.'
        + '\n\n'
        + 'Museossa on lähes miljoona esinettä, joista noin 8 000 on '
          + 'esillä kerralla. Niiden joukossa on Rembrandtin '
          + 'jättimäinen maalaus Yövartio ja Vermeerin kuuluisa '
          + 'Maitotyttö.'
        + '\n\n'
        + 'Vuonna 2013 koko museo avattiin uudelleen kymmenen vuotta '
          + 'kestäneen jättiremontin jälkeen. Museo houkuttelee nykyään '
          + 'vuosittain miljoonia kävijöitä.',
      kuvat: [
        {
          tiedosto: 'View of the Rijksmuseum.jpg',
          selite: 'Rijksmuseumin komea rakennus.',
          lahde: 'Francesco Pollasto, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  dublin: {
    'Guinness-panimo': {
      aika: '1759',
      teksti: 'Guinnessin panimo Dublinissa on yksi maailman '
          + 'kuuluisimmista oluttehtaista. Sen perusti Arthur Guinness '
          + 'vuonna 1759, kun hän allekirjoitti St. James\'s Gate '
          + '-panimon tontista vuokrasopimuksen, joka on voimassa '
          + 'peräti 9000 vuotta! Panimo valmistaa tummaa stout-olutta '
          + 'vain neljästä aineesta: vedestä, ohrasta, humalasta ja '
          + 'hiivasta.'
        + '\n\n'
        + 'Nykyinen vierailukeskus Guinness Storehouse avautui '
          + 'yleisölle vuonna 2000 rakennuksessa, joka valmistui jo '
          + 'vuonna 1902 panimon käymistehtaaksi. Sen keskellä kohoaa '
          + 'lasinen aula, joka on muotoiltu valtavan olutlasin '
          + 'näköiseksi — rakennus on peräti seitsemän kerrosta korkea.'
        + '\n\n'
        + 'Ylimmässä kerroksessa sijaitsee Gravity Bar, josta näkee '
          + 'kauas Dublinin ylle. Vuoteen 2022 mennessä Storehousessa '
          + 'oli käynyt jo yli 23,9 miljoonaa vierasta — jopa '
          + 'kuningatar Elisabet II vieraili siellä vuonna 2011.',
      lainaus: {
        teksti: 'Guinness on hyväksi sinulle.',
        lahde: 'Guinnessin tunnettu mainoslause 1920-luvulta',
      },
      kuvat: [
        {
          tiedosto: 'Guinness Storehouse exterior 1.jpg',
          selite: 'Guinness Storehousen rakennus St. James\'s Gate -panimolla.',
          lahde: 'Steven Lek, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Patrickin katedraali': {
      aika: '1191–1270',
      teksti: 'Pyhän Patrickin katedraali on yksi Irlannin vanhimmista ja '
          + 'tärkeimmistä kirkoista. Se sai alkunsa vuonna 1191, kun '
          + 'arkkipiispa John Comyn korotti pienen kirkon '
          + 'katedraaliksi. Nykyinen goottilaistyylinen kivikirkko '
          + 'rakennettiin vaiheittain 1200-luvulla.'
        + '\n\n'
        + 'Katedraali on valtava: sisältä se on lähes 90 metriä '
          + 'pitkä. Yksi sen kuuluisimmista haudatuista on kirjailija '
          + 'Jonathan Swift, joka tunnetaan kirjastaan Gulliverin '
          + 'retket. Swift toimi katedraalin kirkkoherrana vuosina '
          + '1713–1745.'
        + '\n\n'
        + 'Kirkossa on myös kummallinen "sovinnon ovi": vuonna 1492 '
          + 'kaksi riitaista aatelissukua teki rauhan leikkaamalla '
          + 'oveen reiän, jotta toinen voisi kätellä pelkäämättä '
          + 'väijytystä. Tästä syntyi englanninkielinen sanonta "to '
          + 'chance your arm".',
      lainaus: {
        teksti: 'Swift on purjehtinut lepoon, minne raju suuttumus ei enää '
          + 'voi raadella hänen rintaansa. Matkalainen, seuraa hänen '
          + 'esimerkkiään, jos uskallat — hän puolusti ihmisten '
          + 'vapautta.',
        lahde: 'Jonathan Swiftin hautakirjoitus (W. B. Yeatsin käännös), '
          + 'Patrickin katedraali',
      },
      kuvat: [
        {
          tiedosto: 'St Patrick\'s Cathedral Exterior, Dublin, Ireland - Diliff.jpg',
          selite: 'Pyhän Patrickin katedraalin julkisivu Dublinissa.',
          lahde: 'David Iliff, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Dublinin linna': {
      aika: '1204–1230',
      teksti: 'Dublinin linna on yksi Irlannin historian tärkeimmistä '
          + 'paikoista. Sen rakennutti normanni Meiler Fitzhenry '
          + 'kuningas Juhana Maattoman käskystä vuonna 1204, ja se oli '
          + 'pääosin valmis vuoteen 1230 mennessä. Alun perin se oli '
          + 'vahva linnoitus, jota ympäröivät paksut muurit ja pyöreät '
          + 'kulmatornit.'
        + '\n\n'
        + 'Lähes 700 vuoden ajan linna toimi Englannin ja myöhemmin '
          + 'Britannian vallan keskuksena Irlannissa. Vuonna 1907 '
          + 'linnasta varastettiin Irlannin kruununjalokivet — niitä ei '
          + 'ole koskaan löydetty, ja arvoitus on yhä ratkaisematta!'
        + '\n\n'
        + 'Irlannin itsenäistyessä linna luovutettiin juhlallisesti '
          + 'uudelle hallitukselle Michael Collinsin johdolla vuoden '
          + '1921 sopimuksen jälkeen. Vuodesta 1938 lähtien linnassa on '
          + 'vihitty virkaansa jokainen Irlannin presidentti.',
      kuvat: [
        {
          tiedosto: 'Dublin Castle and Tower.jpg',
          selite: 'Dublinin linna ja sen torni.',
          lahde: 'Sarah Murphy, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Ha’penny-silta': {
      aika: '1816',
      teksti: 'Ha\'penny-silta on Dublinin tunnetuimpia maamerkkejä. Se '
          + 'valmistui toukokuussa 1816 Liffey-joen yli, ja se '
          + 'valettiin kokonaan raudasta Englannissa — malmi oli '
          + 'kaivettu Irlannin Leitrimin kreivikunnasta. Silta on 43 '
          + 'metriä pitkä ja vain reilut kolme ja puoli metriä leveä.'
        + '\n\n'
        + 'Silta sai lempinimensä tulliltaan. Ennen siltaa joen yli '
          + 'kuljettiin lautoilla, ja lauttoja pyörittänyt William '
          + 'Walsh sai luvan periä sillan käyttäjiltä puolen pennyn eli '
          + '"ha\'pennyn" maksun peräti 100 vuoden ajan, kunnes se '
          + 'lopulta poistettiin vuonna 1919.'
        + '\n\n'
        + 'Sillan virallinen nimi oli aluksi Wellingtonin silta, '
          + 'mutta dublinilaiset kutsuvat sitä yhä Ha\'penny-sillaksi. '
          + 'Vuosina 2012–2013 sillasta jouduttiin poistamaan tuhansia '
          + 'rakastavaisten kiinnittämiä lukkoja, koska niiden paino '
          + 'alkoi uhata sillan rakenteita.',
      kuvat: [
        {
          tiedosto: 'Ha\'penny Bridge from west.jpg',
          selite: 'Ha\'penny-silta Liffey-joen yli Dublinissa.',
          lahde: 'Daniel Wieser, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Spire: {
      aika: '2002–2003',
      teksti: 'Dublinin Spire eli "Valon monumentti" kohoaa O\'Connell '
          + 'Streetillä, kaupungin pääkadulla. Samalla paikalla seisoi '
          + 'ennen Nelsonin pylväs, jonka aktivistit räjäyttivät vuonna '
          + '1966. Uusi teräksinen huippu pystytettiin vuosina '
          + '2002–2003.'
        + '\n\n'
        + 'Spire on huikean 120 metriä korkea — suunnilleen yhtä '
          + 'korkea kuin 40-kerroksinen talo! Se kapenee vaiheittain: '
          + 'alaosan halkaisija on kolme metriä, mutta aivan huipulla '
          + 'enää 15 senttimetriä. Huippuosassa on lähes 12 000 pientä '
          + 'valoreikää, jotka loistavat pimeän tultua.'
        + '\n\n'
        + 'Dublinilaiset ovat antaneet patsaalle monta hupaisaa '
          + 'lempinimeä, kuten "piikkikorko slummissa" ja "nuppineula '
          + 'roskiksessa". Teräspylväs maksoi 4,6 miljoonaa euroa ja '
          + 'pystytettiin osana vuosituhannen vaihteen juhlallisuuksia.',
      kuvat: [
        {
          tiedosto: 'Henry Street (View Of The Spire) - panoramio (1).jpg',
          selite: 'Dublinin Spire-teräspylväs Henry Streetiltä kuvattuna.',
          lahde: 'William Murphy, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Trinity College': {
      aika: '1592',
      teksti: 'Trinity College on Irlannin vanhin yliopisto. Sen perusti '
          + 'kuningatar Elisabet I kuninkaallisella peruskirjalla '
          + 'vuonna 1592, entisen luostarin paikalle keskelle Dublinia. '
          + 'Sen ensimmäinen rehtori nimesi sen Cambridgen Trinity '
          + 'Collegen mukaan.'
        + '\n\n'
        + 'Yliopiston kirjaston kuuluisin aarre on Kellsin kirja, '
          + 'upeasti kuvitettu käsin kirjoitettu evankeliumikirja, joka '
          + 'on säilytetty Trinityssä vuodesta 1661. Kirjaa säilytetään '
          + 'Long Room -nimisessä valtavassa kirjastosalissa, jossa käy '
          + 'yli 900 000 vierasta vuodessa.'
        + '\n\n'
        + 'Trinitystä on valmistunut monia kuuluisia kirjailijoita, '
          + 'kuten Jonathan Swift, Oscar Wilde ja Samuel Beckett. '
          + 'Naiset pääsivät opiskelemaan Trinityyn vasta vuonna 1904, '
          + 'mutta nykyään yliopistossa opiskelee yhteensä yli 20 000 '
          + 'opiskelijaa.',
      lainaus: {
        teksti: 'Voisi sanoa, että tämä kaikki on enkelin, ei ihmisen, '
          + 'kättentyötä.',
        lahde: 'Giraldus Cambrensis (Gerald Walesilainen), n. 1188, '
          + 'kuvaili samankaltaista käsikirjoitusta',
      },
      kuvat: [
        {
          tiedosto: 'Dublin - Trinity College Dublin - 20170825165318.jpg',
          selite: 'Trinity Collegen rakennuksia Dublinissa.',
          lahde: 'Oliver Gargan, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  istanbul: {
    'Suuri basaari': {
      aika: '1455–1461',
      teksti: 'Suuri basaari alkoi nousta Istanbuliin jo talvella '
          + '1455–1456, heti sen jälkeen kun sulttaani Mehmed II oli '
          + 'vallannut kaupungin. Basaarin sydän, kalleuksien '
          + 'kauppahalli Cevahir Bedesten, valmistui vuonna 1461. '
          + 'Aluksi siellä myytiin lähinnä kangasta ja koruja, mutta '
          + 'vuosisatojen kuluessa ympärille rakentui lisää katettuja '
          + 'katuja, kunnes koko kortteli peittyi holvikattojen alle.'
        + '\n\n'
        + 'Nykyisin basaarissa on 61 katettua katua ja jopa 4000 '
          + 'kauppaa, joissa työskentelee noin 26 000 ihmistä. Kadut on '
          + 'jaettu ammattikunnittain: yhdellä myydään koruja, toisella '
          + 'mattoja, kolmannella mausteita tai nahkatavaroita. Vuonna '
          + '2014 basaaria pidettiin maailman käydyimpänä nähtävyytenä '
          + 'yli 91 miljoonalla vuotuisella kävijällä.'
        + '\n\n'
        + 'Basaari on tuhoutunut ja noussut uudelleen monta kertaa: '
          + 'sitä ovat runnelleet ainakin viisitoista paloa sekä suuret '
          + 'maanjäristykset vuosina 1766 ja 1894. Silti se on pysynyt '
          + 'samalla paikalla yli 560 vuotta.',
      kuvat: [
        {
          tiedosto: 'Grand Bazaar (Istanbul).jpg',
          selite: 'Katettu kauppakäytävä basaarin sisällä, kojut pullollaan '
            + 'tavaraa.',
          lahde: 'Nicolas Vigier, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sininen moskeija': {
      aika: '1609–1617',
      teksti: 'Sulttaani Ahmed I halusi rakentaa moskeijan, joka olisi '
          + 'yhtä komea kuin lähellä sijaitseva Hagia Sofia. '
          + 'Rakennustyöt kestivät vuodesta 1609 vuoteen 1617. '
          + 'Moskeijan lempinimi Sininen moskeija tulee sen sisätilojen '
          + 'upeista İznikin kaakeleista — niitä on peräti 21 043 '
          + 'kappaletta yli viidessäkymmenessä eri kuviossa.'
        + '\n\n'
        + 'Moskeijassa on kuusi minarettia, mikä oli rakennusaikaan '
          + 'poikkeuksellista — vain Mekan pyhäkössä oli yhtä monta. '
          + 'Perimätiedon mukaan arkkitehti kuuli sulttaanin pyynnön '
          + '"kultaiset minareetit" väärin "kuutena minareettina", ja '
          + 'kohusta selvittiin lopulta rakentamalla Mekkaan seitsemäs '
          + 'minareetti.'
        + '\n\n'
        + 'Osa oppineista vastusti hanketta, koska sulttaani ei ollut '
          + 'voittanut sotia, jotka olisivat oikeuttaneet näin kalliin '
          + 'rakennuksen. Moskeijan komeus voitti kuitenkin '
          + 'istanbulilaiset puolelleen, ja siitä tuli yksi kaupungin '
          + 'rakastetuimmista paikoista.',
      kuvat: [
        {
          tiedosto: 'Exterior of Sultan Ahmed I Mosque in Istanbul, Turkey 002.jpg',
          selite: 'Sinisen moskeijan kuusi minarettia ja kupolit kultaisessa '
            + 'iltavalossa.',
          lahde: 'Moonik, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'The Blue Mosque at sunset.jpg',
          selite: 'Moskeija auringonlaskussa merenrannan yllä kuvattuna.',
          lahde: 'Constantin Barbu, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Hagia Sofia': {
      aika: '532–537',
      teksti: 'Keisari Justinianus I rakennutti nykyisen Hagia Sofian '
          + 'uskomattoman nopeasti, vain viidessä vuodessa 532–537. '
          + 'Rakennustöitä johtivat kaksi matemaatikkoa, ja työmaalla '
          + 'saattoi olla yhtä aikaa yli 10 000 työntekijää.'
        + '\n\n'
        + 'Rakennus on 82 metriä pitkä ja 73 metriä leveä, ja sen '
          + 'valtava kupoli kohoaa lähes 56 metrin korkeuteen '
          + 'halkaisijaltaan noin 33-metrisenä. Aikanaan se oli '
          + 'maailman suurin katettu tila, ja monet pitivät sen '
          + 'pysymistä pystyssä pienenä ihmeenä.'
        + '\n\n'
        + 'Hagia Sofia on elänyt monta elämää: kirkkona se toimi yli '
          + 'tuhat vuotta (360–1453), sitten moskeijana Osmannien '
          + 'valloituksen jälkeen, museona vuodesta 1935 ja jälleen '
          + 'moskeijana vuodesta 2020 alkaen.',
      lainaus: {
        teksti: 'Salomo, minä olen voittanut sinut!',
        lahde: 'Perimätiedon mukainen keisari Justinianuksen huudahdus '
          + 'kirkon vihkiäisissä vuonna 537',
      },
      kuvat: [
        {
          tiedosto: 'Hagia Sophia Mars 2013.jpg',
          selite: 'Hagia Sofia kupoleineen ja minaretteineen kirkkaalla '
            + 'taivaalla.',
          lahde: 'Arild Vågen, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Topkapın palatsi': {
      aika: '1459–1465',
      teksti: 'Sulttaani Mehmed II aloitti palatsin rakentamisen vuonna '
          + '1459, ja se oli valmis noin vuonna 1465. Seuraavat lähes '
          + '400 vuotta se oli Osmannien sulttaanien koti ja '
          + 'valtakunnan hallintokeskus, kunnes hovi muutti Dolmabahçen '
          + 'palatsiin 1850-luvulla.'
        + '\n\n'
        + 'Palatsin haaremissa asuivat sulttaanin äiti, vaimot ja '
          + 'loppu perhe — tiloja oli yli 400 huonetta. Keittiöt '
          + 'puolestaan valmistivat ruokaa jopa 4000 hengelle '
          + 'päivittäin, ja siellä työskenteli yli 800 kokkia ja '
          + 'apulaista.'
        + '\n\n'
        + 'Aarrekammiossa säilytetään yhä sulttaanien kalleuksia, '
          + 'kuten Lusikkamestarin timanttia ja Topkapin tikaria. '
          + 'Vuodesta 1924 palatsi on ollut museo, jossa kuka tahansa '
          + 'voi käydä katsomassa, miten sulttaanit elivät.',
      kuvat: [
        {
          tiedosto: 'Topkapi Palace Seen From Harem.JPG',
          selite: 'Topkapın palatsi mäellä Bosporin rannalla, lautta '
            + 'ohittamassa edustalla.',
          lahde: 'Bjørn Christian Tørrissen, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Grand Kiosk of Topkapı Palace in Istanbul, Turkey 002.jpg',
          selite: 'Palatsialueen puutarha ja huvimaja, joista avautuu näkymä '
            + 'merelle.',
          lahde: 'Moonik, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Galatan torni': {
      aika: '1348',
      teksti: 'Genovalaiset kauppiaat rakensivat Galatan tornin vuonna '
          + '1348 osana kaupunkinsa laajennusta. Torni tunnettiin alun '
          + 'perin nimellä Kristuksen torni, ja se oli valmistuessaan '
          + 'kaupungin korkein rakennus, lähes 63 metriä korkea.'
        + '\n\n'
        + 'Osmannien valloitettua Istanbulin 1453 tornia käytettiin '
          + 'muun muassa vankilana. Vuodesta 1717 alkaen sen huipulla '
          + 'vartioitiin kaupunkia tulipalojen varalta — puukaupunki '
          + 'syttyi herkästi, ja vartijat tähyilivät savua yli 50 '
          + 'metrin korkeudesta.'
        + '\n\n'
        + 'Tornin tarinaan kuuluu legenda vuodelta 1638: Hezarfen '
          + 'Ahmed Çelebin kerrotaan sitoneen siivet käsiinsä ja '
          + 'liitäneen tornin huipulta yli Bosporin salmen aina '
          + 'Üsküdariin asti. Nykyään tornissa on museo ja '
          + 'näköalatasanne.',
      kuvat: [
        {
          tiedosto: 'Istanbul Galata Tower IMG 8211 1920.jpg',
          selite: 'Galatan torni kohoaa Istanbulin kattojen ja talojen yllä.',
          lahde: 'Alexxx1979, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Galata Kulesi - 01.jpg',
          selite: 'Lähikuva tornin yläosasta: kartiokatto ja kaariholvit.',
          lahde: 'Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Üsküdar: {
      aika: '600-luku eaa.',
      teksti: 'Üsküdar sijaitsee Istanbulin Aasian-puoleisella rannalla, '
          + 'vastapäätä vanhaa kaupunkia. Kreikkalaiset siirtolaiset '
          + 'Megarasta perustivat sen jo 600-luvulla eaa. ja antoivat '
          + 'sille nimen Khrysopolis, "Kultainen kaupunki". Osmanit '
          + 'valtasivat sen jo vuonna 1338 — yli sata vuotta ennen kuin '
          + 'Konstantinopoli itse kaatui vuonna 1453.'
        + '\n\n'
        + 'Nykyään Üsküdar on Istanbulin vilkkaimpia liikenteen '
          + 'solmukohtia: laivat kuljettavat matkustajia Bosporin yli '
          + 'Eurooppaan, ja Marmaray-junat kulkevat salmen alittavassa '
          + 'tunnelissa. Aivan lauttarannan edustalla, omalla pienellä '
          + 'saarellaan, kohoaa Kız Kulesi eli Neitsyttorni — se on '
          + 'toiminut muun muassa majakkana ja tullitalona.'
        + '\n\n'
        + 'Üsküdaria kutsutaan joskus moskeijoiden kaupunginosaksi: '
          + 'siellä on yli 180 moskeijaa, monet kuuluisan arkkitehti '
          + 'Mimar Sinanin suunnittelemia. Alueella asuu nykyään yli '
          + '500 000 ihmistä.',
      kuvat: [
        {
          tiedosto: 'Şemsi Pasha Mosque, Üsküdar.JPG',
          selite: 'Şemsi Pasha -moskeija Üsküdarin rantaviivalla, meri '
            + 'taustalla.',
          lahde: 'İhsan Deniz Kılıçoğlu, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  marseille: {
    MuCEM: {
      aika: '2013',
      teksti: 'MuCEM eli Euroopan ja Välimeren sivilisaatioiden museo '
          + 'avattiin vuonna 2013, samana vuonna kun Marseille oli '
          + 'Euroopan kulttuuripääkaupunki. Se seisoo aivan meren '
          + 'rannalla Vanhansataman suulla.'
        + '\n\n'
        + 'Rakennus on harmaa kivikuutio, jota ympäröi musta, '
          + 'pitsimäinen betoniverkko — se muistuttaa hieman '
          + 'kalaverkkoa tai koralliriuttaa. 130 metriä pitkä silta '
          + 'yhdistää museon vieressä kohoavaan vanhaan Saint-Jeanin '
          + 'linnaan.'
        + '\n\n'
        + 'Museossa kerrotaan Euroopan ja Välimeren kansojen '
          + 'historiasta muinaisajasta nykypäivään. Jo kolmen '
          + 'ensimmäisen vuoden aikana museossa kävi 8,5 miljoonaa '
          + 'vierailijaa.',
      lainaus: {
        teksti: 'Rakensimme sen kivestä, vedestä ja tuulesta.',
        lahde: 'Arkkitehdit Rudy Ricciotti ja Roland Carta kuvailivat näin '
          + 'MuCEMia',
      },
      kuvat: [
        {
          tiedosto: '"Beeindruckende Architektur". 5.jpg',
          selite: 'MuCEMin pitsimäinen betoniverkko ja silta Saint-Jeanin '
            + 'linnaan.',
          lahde: 'Holger Uwe Schmitt, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Marseillen katedraali': {
      aika: '1852–1897',
      teksti: 'Keisari Napoleon III laski katedraalin peruskiven vuonna '
          + '1852. Rakentaminen kesti kauan: ensimmäinen messu '
          + 'pidettiin vasta 1893, ja koko rakennus vihittiin käyttöön '
          + '1897 — siis 45 vuotta myöhemmin.'
        + '\n\n'
        + 'Katedraali suunniteltiin bysanttilais-roomalaiseen '
          + 'tyyliin, ja seinät on tehty raidallisesta vaaleasta ja '
          + 'vihreästä kivestä. Katedraali on 142 metriä pitkä, ja sen '
          + 'suurin kupoli kohoaa 70 metrin korkeuteen — sisään mahtuu '
          + '3000 istujaa.'
        + '\n\n'
        + 'Ihan vieressä seisoo vanhan, 1100-luvulla rakennetun '
          + 'katedraalin jäänteet. Paikalla on ollut kirkko jo '
          + '400-luvulta lähtien, joten sama kohta on palvellut '
          + 'uskovaisia yli 1500 vuotta.',
      kuvat: [
        {
          tiedosto: 'Cathédrale de la Major vue du mucem.jpg',
          selite: 'Marseillen katedraali eli Cathédrale la Major.',
          lahde: 'Adrien Payet, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Saint-Victorin kirkko': {
      aika: '415',
      teksti: 'Munkki ja teologi Johannes Cassianus perusti luostarin '
          + 'Marseilleen vuonna 415 tultuaan Egyptin erakkoluostareista '
          + '— se on yksi Ranskan vanhimmista luostareista. Kirkon alla '
          + 'olevissa kryptoissa on jäljellä muinaiskreikkalainen '
          + 'kivilouhos, josta tuli myöhemmin hautapaikka.'
        + '\n\n'
        + 'Saraseenit hyökkäsivät ja hävittivät luostarin kahdesti, '
          + 'vuosina 838 ja 923, mutta munkit palasivat 977. Vuonna '
          + '1020 apotti Isarn aloitti ison rakennusurakan, ja kirkosta '
          + 'tehtiin samalla myös linnoitus — siksi siinä on yhä paksut '
          + 'harjakivimuurit.'
        + '\n\n'
        + 'Vuonna 1365 paavi Urbanus V — joka oli aiemmin ollut tämän '
          + 'saman luostarin apotti — palasi Marseilleen ja vihki '
          + 'kirkon alttarin.',
      kuvat: [
        {
          tiedosto: 'Marseille-Saint-Victor-bjs180810-01.jpg',
          selite: 'Saint-Victorin linnamainen luostarikirkko '
            + 'harjakivimuureineen.',
          lahde: 'Bjs, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Vanhasatama: {
      aika: '600 eaa.',
      teksti: 'Kreikkalaiset uudisasukkaat Fokaiasta saapuivat '
          + 'kallioiselle Lacydonin lahdelle vuonna 600 ennen '
          + 'ajanlaskun alkua — siitä tuli Vanhasatama, ja Marseille on '
          + 'siksi Ranskan vanhin kaupunki.'
        + '\n\n'
        + '1800-luvun puolivälissä satama oli yhtä vilkas kuin '
          + 'Liverpoolin satama Englannissa, mutta se oli liian matala '
          + 'uusille höyrylaivoille, joten kaupunki rakensi uuden ja '
          + 'syvemmän sataman vähän kauemmas.'
        + '\n\n'
        + 'Toisen maailmansodan aikana, tammikuussa 1943, natsit '
          + 'räjäyttivät suuren osan satamaa ympäröivästä vanhasta '
          + 'kaupunginosasta. Vuonna 2013 satama-alue muutettiin '
          + 'kävelyalueeksi, ja vuoden 2024 olympialaisissa siellä '
          + 'kilpailtiin purjehduksessa.',
      kuvat: [
        {
          tiedosto: 'Marseille Old Port.jpg',
          selite: 'Vanhasatama täynnä purjeveneitä, Notre-Dame de la Garde '
            + 'näkyy kukkulalla.',
          lahde: 'Ingo Mehling, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Notre-Dame de la Garde': {
      aika: '1853–1897',
      teksti: 'Kukkulan laella, 149 metrin korkeudessa Vanhansataman '
          + 'yllä, on seissyt kappeli jo vuodesta 1214. Vuonna 1536 '
          + 'kuningas Frans I rakennutti paikalle linnoituksen suojaksi '
          + 'keisari Kaarle V:n hyökkäyksiä vastaan.'
        + '\n\n'
        + 'Nykyinen upea basilika alkoi nousta vuonna 1853. Sen '
          + 'suunnitteli vain 23-vuotias arkkitehti Henri-Jacques '
          + 'Espérandieu, ja ylempi kirkko on koristeltu noin 12 '
          + 'miljoonalla pienellä mosaiikkikivellä. Kirkko vihittiin jo '
          + '1864, vaikka viimeistely kesti aina vuoteen 1897 asti.'
        + '\n\n'
        + 'Tornin huipulla, 41 metrin korkeudessa, seisoo 11,2 metriä '
          + 'korkea kultainen patsas Neitsyt Mariasta lapsi sylissään. '
          + 'Marseillelaiset kutsuvat kirkkoa lempinimellä "Bonne '
          + 'Mère", Hyvä Äiti.',
      kuvat: [
        {
          tiedosto: '1027 Basilique Notre-Dame-de-la-Garde in Marseille at sunset Photo by Giles Laurent.jpg',
          selite: 'Notre-Dame de la Garde kohoaa kukkulalla kaupungin yllä, '
            + 'ilta-auringossa.',
          lahde: 'Giles Laurent, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Saint-Charlesin asema': {
      aika: '1848',
      teksti: 'Marseillen päärautatieasema avattiin 8. tammikuuta 1848 '
          + 'vanhan hautausmaan paikalle, pienelle kukkulalle keskustan '
          + 'yläpuolelle. Asemasta tuli Pariisi-Marseille-radan '
          + 'eteläinen pääteasema.'
        + '\n\n'
        + 'Koska asema on korkealla mäellä, kaupunki tarvitsi '
          + 'jättimäiset portaat sen ja keskustan välille. Portaiden '
          + 'rakentaminen aloitettiin vasta 1923 ja ne avattiin 1925; '
          + 'niiden reunoilla on patsaita, jotka kuvaavat kaukaisia '
          + 'maita, joihin Marseillen satamasta purjehdittiin.'
        + '\n\n'
        + 'Nykyään asemalla on 16 raidetta ja se on Ranskan 27. '
          + 'vilkkain rautatieasema. Vuonna 2000 asemalla kävi 7,1 '
          + 'miljoonaa matkustajaa vuodessa, mutta vuonna 2024 luku oli '
          + 'jo lähes 18 miljoonaa.',
      kuvat: [
        {
          tiedosto: 'Gare Saint Charles Marseille 02.jpg',
          selite: 'Saint-Charlesin rautatieaseman komea julkisivu.',
          lahde: 'Houss 2020, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Gare Marseille Saint Charles - Marseille I (FR13) - 2023-07-22 - 3.jpg',
          selite: 'Lähikuva aseman julkisivun yläosan koristepatsaista.',
          lahde: 'Chabe01, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  edinburgh: {
    'Charlotte Square': {
      aika: '1791–1820',
      teksti: 'Charlotte Square on yksi Edinburghin uuden kaupunginosan, '
          + 'New Townin, komeimmista aukioista. Arkkitehti Robert Adam '
          + 'suunnitteli sen vuonna 1791. Aukiosta tuli koko New Townin '
          + 'rakennushankkeen viimeinen ja hitain osa — se "valmistui" '
          + 'vasta vuonna 1820, ja sen luoteiskulma jopa vasta vuonna '
          + '1990.'
        + '\n\n'
        + 'Talossa numero 6, nimeltään Bute House, asuu nykyään '
          + 'Skotlannin pääministeri. Aukion kulmassa syntyi puhelimen '
          + 'keksijä Alexander Graham Bell.'
        + '\n\n'
        + 'Puiston keskellä ratsastaa pronssinen prinssi Albert — '
          + 'patsaan paljasti itse kuningatar Victoria vuonna 1876. '
          + 'Elokuisin aukiolla pystytettiin vuosikymmenten ajan '
          + 'Edinburghin kirjallisuusfestivaalin valkoisia telttoja.',
      kuvat: [
        {
          tiedosto: '1-11 Charlotte Square, Edinburgh (inc. Bute House).jpg',
          selite: 'Charlotte Squaren pohjoislaidan hiekkakivijulkisivu, '
            + 'mukana Bute House.',
          lahde: 'Mike Shaw, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Charlotte Square from the SW.JPG',
          selite: 'Näkymä aukion keskuspuistoon ja prinssi Albertin '
            + 'ratsastajapatsaaseen.',
          lahde: 'Stephencdickson, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Edinburghin linna': {
      aika: '1130–1650',
      teksti: 'Edinburghin linna seisoo sammuneen tulivuoren kalliolla, '
          + 'joka syntyi noin 350 miljoonaa vuotta sitten. Linnan '
          + 'vanhin osa, Pyhän Margareetan kappeli, rakennettiin '
          + '1100-luvun alussa ja on koko Edinburghin vanhin säilynyt '
          + 'rakennus. Linnaa on piiritetty ainakin 26 kertaa yli 1100 '
          + 'vuoden aikana.'
        + '\n\n'
        + 'Linnassa säilytetään Skotlannin kruununjalokivia. Ne '
          + 'olivat unohtuneet lukittuun huoneeseen, kunnes kirjailija '
          + 'Sir Walter Scott löysi ne uudelleen vuonna 1818. Pihalla '
          + 'lojuu myös jättiläismäinen Mons Meg -tykki, joka tuotiin '
          + 'Edinburghiin jo vuonna 1457.'
        + '\n\n'
        + 'Joka päivä kello yksi linnasta ammutaan yhä tykinlaukaus — '
          + 'perinne, jonka avulla kaupunkilaiset pystyivät ennen '
          + 'tarkistamaan kellonsa. Nykyään linnassa vierailee '
          + 'vuosittain lähes kaksi miljoonaa ihmistä.',
      kuvat: [
        {
          tiedosto: 'Edinburgh Castle from the Grassmarket.jpg',
          selite: 'Edinburghin linna kohoaa kalliolla Grassmarket-torin '
            + 'yläpuolella.',
          lahde: 'Stephencdickson, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'St Gilesin katedraali': {
      aika: '1385–1500',
      teksti: 'St Gilesin kirkko on seisonut Edinburghin Kuninkaankadun '
          + 'eli Royal Milen varrella jo satoja vuosia — nykyinen '
          + 'goottilainen kivikirkko rakennettiin pääosin '
          + '1300–1500-luvuilla. Tunnetuin piirre on kruunun muotoinen '
          + 'torni 1460-luvulta, jossa on poikkeuksellisesti kahdeksan '
          + 'tukipilaria.'
        + '\n\n'
        + 'Vuonna 1559 kirkon saarnastuoliin nousi uskonpuhdistaja '
          + 'John Knox, joka teki kirkosta protestanttisen pääkirkon. '
          + 'Legendan mukaan vuonna 1637 markkinakauppias Jenny Geddes '
          + 'suuttui uudesta rukouskirjasta niin, että heitti '
          + 'jakkaransa saarnaajaa kohti — teko, joka sytytti mellakan '
          + 'koko kaupunkiin.'
        + '\n\n'
        + 'Vuosina 1909–1911 kirkkoon rakennettiin upea '
          + 'Thistle-kappeli Skotlannin ritarikuntaa varten. Nykyään '
          + 'kirkossa käy vuosittain yli 1,3 miljoonaa kävijää.',
      kuvat: [
        {
          tiedosto: 'St Giles\'Cathedral Edinburgh.jpg',
          selite: 'St Gilesin katedraalin länsijulkisivu ja kruununmuotoinen '
            + 'torni.',
          lahde: 'Eléonore Gaudry, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Greyfriars Bobby': {
      aika: '1858–1872',
      teksti: 'Bobby oli pieni terrieri, joka kulki isäntänsä John Grayn, '
          + 'Edinburghin poliisin yövahdin, mukana kaupungin kaduilla. '
          + 'Kun Gray kuoli vuonna 1858 ja haudattiin Greyfriarsin '
          + 'hautausmaalle, Bobby ei suostunut lähtemään haudan luota — '
          + 'tarinan mukaan se vartioi hautaa lähes joka yö peräti 14 '
          + 'vuoden ajan.'
        + '\n\n'
        + 'Bobbysta tuli koko kaupungin lemmikki. Vuonna 1867 '
          + 'pormestari antoi sille oman kaulapannan ja koiraluvan, '
          + 'jottei sitä tarvinnut lopettaa irtokoirana. Bobby kuoli '
          + '16-vuotiaana vuonna 1872.'
        + '\n\n'
        + 'Jo vuotta myöhemmin, 1873, kaupunkiin pystytettiin '
          + 'Bobbylle pieni pronssipatsas juomalähteen päälle. Se on '
          + 'nykyään Edinburghin pienin suojeltu rakennelma.',
      lainaus: {
        teksti: 'Let his loyalty and devotion be a lesson to us all.',
        lahde: 'Bobbyn hautakivi, Greyfriars Kirkyard (pystytetty 1981)',
      },
      kuvat: [
        {
          tiedosto: 'Greyfriars Bobby Memorial Fountain.jpg',
          selite: 'Greyfriars Bobbyn muistolähde kaupungin vanhoja kivitaloja '
            + 'vasten.',
          lahde: 'Almbauer, Wikimedia Commons (PD)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Calton Hill': {
      aika: '1807–1831',
      teksti: 'Calton Hill on 103 metrin korkuinen kukkula aivan '
          + 'Edinburghin keskustan kupeessa, ja se kuuluu kaupungin '
          + 'Unescon maailmanperintökohteeseen. Jo vuonna 1456 kuningas '
          + 'Jaakko II antoi kukkulan kaupunkilaisten käyttöön urheilua '
          + 'ja turnajaisia varten.'
        + '\n\n'
        + 'Kukkulan huipulla seisoo outo joukko pylväikköjä. '
          + 'Kuuluisin on Kansallismonumentti, joka aloitettiin vuonna '
          + '1826 antiikin Parthenonin mallin mukaan mutta jäi '
          + 'rahapulan takia kesken vain 12 pylvään kohdalla — '
          + 'edinburghilaiset ristivät sen pilkkanimellä "Edinburghin '
          + 'häpeä". Vieressä kohoaa amiraali Nelsonin muistoksi '
          + 'rakennettu torni.'
        + '\n\n'
        + 'Huhtikuun viimeisenä iltana kukkulalla juhlitaan '
          + 'kelttiläistä Beltane-tulijuhlaa, johon kokoontuu yli 12 '
          + '000 katsojaa. Huipulta avautuu myös yksi kaupungin '
          + 'parhaista näköalapaikoista.',
      kuvat: [
        {
          tiedosto: 'Edinburgh Calton Hill.jpg',
          selite: 'Nelsonin muistomerkin torni ja kansallismonumentin '
            + 'pylväsrivistö.',
          lahde: 'Saffron Blaze, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Holyroodin palatsi': {
      aika: '1501–1678',
      teksti: 'Holyroodin palatsi on Britannian hallitsijan virallinen '
          + 'asuinpaikka Skotlannissa. Sen vanhin osa rakennettiin '
          + '1520–1530-luvuilla, mutta suurin osa nykyisestä '
          + 'linnamaisesta palatsista rakennettiin uudelleen vuosina '
          + '1671–1678. Palatsin vieressä on Holyroodin luostarin '
          + 'rauniot — luostari perustettiin jo vuonna 1128.'
        + '\n\n'
        + 'Palatsi tunnetaan erityisesti Marian, Skotlannin '
          + 'kuningattaren, kotina — hän asui siellä vuosina 1561–1567. '
          + 'Vuonna 1566 kuningattaren sihteeri David Rizzio murhattiin '
          + 'raa\'asti hänen omissa huoneissaan.'
        + '\n\n'
        + 'Palatsin 45-metrisessä juhlasalissa riippuu 96 muotokuvaa '
          + 'Skotlannin muinaisista kuninkaista. Koko palatsissa on 289 '
          + 'huonetta, ja sitä ympäröi kymmenen eekkerin puutarha.',
      kuvat: [
        {
          tiedosto: 'Holyrood Palace and Abbey 20211021.jpg',
          selite: 'Holyroodin palatsin julkisivu ja viereisen luostarikirkon '
            + 'rauniot.',
          lahde: 'Daniel Kraft, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  lissabon: {
    'Glórian köysirata': {
      aika: '1885',
      teksti: 'Osa Lissabonin kaduista nousee niin jyrkkinä mäkinä, että '
          + 'niitä olisi työlästä kiivetä jalan. Siksi kaupunkiin '
          + 'rakennettiin hassunhauska kulkuneuvo, joka on osittain '
          + 'raitiovaunu ja osittain hissi - Glórian köysirata. Se '
          + 'avattiin vuonna 1885, ja se vie matkustajat '
          + 'Restauradoresin aukiolta ylös Bairro Alton kaupunginosaan.'
        + '\n\n'
        + 'Matka on lyhyt, vain 275 metriä, mutta rinne on niin '
          + 'jyrkkä - lähes 18 astetta - että matkaan kuluu silti pari '
          + 'minuuttia. Aluksi pieniä vaunuja liikutti veden '
          + 'painovoima, sitten höyry, ja lopulta 1910-luvulla rata sai '
          + 'sähkömoottorit.'
        + '\n\n'
        + 'Radan suunnitteli insinööri Raoul Mesnier du Ponsard, ja '
          + 'saksalaisessa tehtaassa rakennettuihin keltaisiin '
          + 'vaunuihin mahtuu kerralla 42 matkustajaa ja kuljettaja. '
          + 'Rata on säilynyt niin hyvin alkuperäisessä asussaan, että '
          + 'siitä tehtiin Portugalin kansallinen muistomerkki vuonna '
          + '2002.',
      kuvat: [
        {
          tiedosto: 'Elevador da Glória, Lisbon, 20250604 1603 9346.jpg',
          selite: 'Keltainen Glórian köysiraitiovaunu (Elevador da Glória) '
            + 'laskeutuu kapeaa mäkikujaa Lissabonin Bairro Alton '
            + 'kaupunginosassa aurinkoisessa säässä.',
          lahde: 'Jakub Hałun, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Rossio: {
      aika: '1755–1874',
      teksti: 'Rossio on yksi Lissabonin vanhimmista aukioista - täällä '
          + 'on kokoonnuttu jo keskiajalta asti. Nimi "rossio" '
          + 'tarkoittaa suunnilleen "yhteismaata", ja aikoinaan '
          + 'aukiolla pidettiin jopa hevosmarkkinoita. Noin vuonna 1450 '
          + 'aukion laidalle nousi komea palatsi, josta tuli myöhemmin '
          + 'pelätyn inkvisition päämaja - ja aukiolla poltettiin '
          + 'ihmisiä roviolla jo vuonna 1540.'
        + '\n\n'
        + 'Vuoden 1755 valtava maanjäristys tuhosi lähes kaiken '
          + 'Rossion ympäriltä. Aukio rakennettiin uudelleen kauniiseen '
          + 'pombalilaiseen tyyliin, ja sen keskelle pystytettiin '
          + 'vuonna 1874 korkea pylväs, jonka huipulla seisoo kuningas '
          + 'Pedro IV:n patsas.'
        + '\n\n'
        + 'Aukion laidalla kohoaa 1840-luvulla rakennettu '
          + 'kansallisteatteri, ja aivan vieressä sijaitsee vuosina '
          + '1886-1887 valmistunut rautatieasema, jonka sisäänkäynnit '
          + 'on koristeltu näyttävillä hevosenkengän muotoisilla '
          + 'kaarilla.',
      kuvat: [
        {
          tiedosto: 'Rossio - Praca Dom Pedro IV.JPG',
          selite: 'Ilmakuva Rossion aukiosta (Praça Dom Pedro IV): keskellä '
            + 'Dom Pedro IV:n pylväspatsas ja suihkulähde, aaltokuvioinen '
            + 'kivilattia edessä ja Kansallisteatteri D. Maria II '
            + 'vaaleankeltaisine julkisivuineen taustalla, kirkas sininen '
            + 'taivas.',
          lahde: 'Szilas, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Rossio Lissabon September 2014.jpg',
          selite: 'Läheiskuva Rossion pylväspatsaasta alhaalta ylöspäin '
            + 'kuvattuna kirkkaan sinistä taivasta vasten, '
            + 'Kansallisteatteri D. Maria II erottuu patsaan takana.',
          lahde: 'Felix König, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'São Jorgen linna': {
      aika: '1147',
      teksti: 'São Jorgen linna kohoaa Lissabonin korkeimmalla '
          + 'kukkulalla, ja paikalla on linnoituksia ollut jo yli 2000 '
          + 'vuotta. Nykyinen linna sai nimensä ja merkityksensä vuonna '
          + '1147, kun kristityt joukot valtasivat sen maureilta pitkän '
          + 'piirityksen jälkeen.'
        + '\n\n'
        + 'Legendan mukaan ritari nimeltä Martim Moniz uhrasi '
          + 'henkensä pitämällä linnan porttia auki omalla ruumiillaan, '
          + 'jotta kristittyjen sotilaat pääsivät sisään. Myöhemmin '
          + 'linnaa käytettiin sekä kuninkaiden palatsina että '
          + 'Portugalin tärkeimpien asiakirjojen arkistona.'
        + '\n\n'
        + 'Vuoden 1755 maanjäristys vaurioitti linnaa pahoin, ja se '
          + 'kunnostettiin nykyiseen kuntoonsa vasta 1930-luvulla. '
          + 'Yhdestä torneista, "Odysseuksen tornista", löytyy '
          + 'erikoinen kamera obscura -laite, jonka avulla voi katsella '
          + 'koko kaupunkia kuin taikapeilistä.',
      kuvat: [
        {
          tiedosto: 'Lisbon Castelo de São Jorge BW 2018-10-03 11-13-09.jpg',
          selite: 'São Jorgen linnan sisäänkäyntitorni, hammastettu muuri ja '
            + 'kaarisilta kirkkaan sinistä taivasta vasten; sillalla '
            + 'muutama kävijä, ei ruuhkaa.',
          lahde: 'Berthold Werner, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Castelo de São Jorge, Lisbon, 20250604 1706 9397.jpg',
          selite: 'Läheiskuva linnan tornista, jonka huipulla liehuu '
            + 'Portugalin lippu; kivinen polku ja oliivipuita johtavat '
            + 'kohti porttia kirkkaassa auringossa.',
          lahde: 'Jakub Hałun, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Tuomiokirkko: {
      aika: '1147',
      teksti: 'Lissabonin tuomiokirkko, jota paikalliset kutsuvat '
          + 'lyhyesti nimellä Sé, on kaupungin vanhin kirkko. Sen '
          + 'rakentaminen aloitettiin heti vuonna 1147, kun kaupunki '
          + 'oli vasta vallattu maureilta - kirkko nousi suoraan '
          + 'entisen suuren moskeijan paikalle.'
        + '\n\n'
        + 'Kirkko muistuttaa hieman pientä linnoitusta: sen paksut '
          + 'kivimuurit, hammastetut muurinharjat ja tornit kertovat '
          + 'ajasta, jolloin Lissabonia piti puolustaa hyökkääjiltä. '
          + 'Vuosisatojen varrella kirkkoon on lisätty osia monessa eri '
          + 'tyylissä, joten siellä näkyy sekä romaniikkaa, goottia '
          + 'että myöhempiä koristeellisempia tyylejä.'
        + '\n\n'
        + 'Kirkko selvisi hengissä vuoden 1755 suuresta '
          + 'maanjäristyksestä, vaikka moni muu Lissabonin rakennus '
          + 'tuhoutui. Lattian alta on kaivettu esiin roomalaisten ja '
          + 'visigoottien jättämiä muinaisjäännöksiä, ja alttarilla '
          + 'säilytetään pyhän Vincentin, Lissabonin '
          + 'suojeluspyhimyksen, pyhäinjäännöksiä.',
      kuvat: [
        {
          tiedosto: 'Sé de Lisboa • Santa Maria Maior de Lisboa • Lisbon Cathedral (50661841878).jpg',
          selite: 'Lissabonin tuomiokirkon (Sé) kaksoistornit ja pyöreä '
            + 'ruusuikkuna alhaalta ylöspäin kuvattuna kirkkaan sinistä '
            + 'taivasta vasten.',
          lahde: 'Sonse, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kauppatori: {
      aika: '1755–1775',
      teksti: 'Kauppatori eli Praça do Comércio on yksi Euroopan '
          + 'suurimmista aukioista - se on lähes neliön muotoinen ja '
          + 'mittaa 175 kertaa 175 metriä. Paikalliset kutsuvat sitä '
          + 'myös nimellä Terreiro do Paço, "palatsin piha", sillä '
          + 'täällä sijaitsi ennen kuninkaallinen Ribeiran palatsi, '
          + 'jonka kirjastossa oli yli 200 000 kirjaa.'
        + '\n\n'
        + 'Vuoden 1755 maanjäristys ja sitä seurannut hyökyaalto '
          + 'tuhosivat palatsin täysin. Tilalle rakennettiin avara, '
          + 'jokea vasten avautuva aukio, ja vuonna 1775 sen keskelle '
          + 'pystytettiin komea ratsastajapatsas kuningas Joosef I:stä.'
        + '\n\n'
        + 'Aukion läpi kulkee kaupungin pääkatu vuosina 1873-1875 '
          + 'valmistuneen suuren riemukaaren ali. Aukiolla on nähty '
          + 'myös synkkiä hetkiä: vuonna 1908 kuningas Kaarle I '
          + 'murhattiin täällä. Yhä tänäänkin aukion laidalla toimii '
          + 'kahvila nimeltä Martinho da Arcada, joka on avannut ovensa '
          + 'jo vuonna 1782.',
      kuvat: [
        {
          tiedosto: 'Lissabon - Praça do Comércio - King Joseph Statue.jpg',
          selite: 'Kuningas Joosef I:n ratsastajapatsas Kauppatorilla (Praça '
            + 'do Comércio), ympärillä keltaiset pylväikkörakennukset ja '
            + 'punaiset raitiovaunut, kirkas sininen taivas.',
          lahde: 'Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Lisbon Praça do Comércio BW 2018-10-08 17-40-44.jpg',
          selite: 'Rua Augustan riemukaari Kauppatorin pohjoislaidalla, '
            + 'koristeltu patsain ja kirjoituksin, kirkas sininen taivas '
            + 'ja muutama ohikulkija.',
          lahde: 'Berthold Werner, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kansallispanteoni: {
      aika: '1681–1966',
      teksti: 'Kansallispanteoni on komea kupolikirkko Lissabonin Alfaman '
          + 'kaupunginosassa. Se on Portugalin tärkeimpien henkilöiden '
          + 'viimeinen lepopaikka - täältä löytyvät muun muassa '
          + 'runoilija Luís de Camõesin ja kuuluisan fado-laulajan '
          + 'Amália Rodriguesin haudat sekä jalkapallotähti Eusébion '
          + 'muistomerkki.'
        + '\n\n'
        + 'Rakennus oli alun perin Pyhän Engrácian kirkko, ja sen '
          + 'rakentaminen aloitettiin vuonna 1681. Työ kesti niin '
          + 'uskomattoman kauan - peräti 285 vuotta! - että '
          + 'portugalilaiset alkoivat käyttää sanontaa "Pyhän Engrácian '
          + 'työmaa" tarkoittamaan mitä tahansa hanketta, joka ei tunnu '
          + 'koskaan valmistuvan.'
        + '\n\n'
        + 'Rakennus valmistui lopulta vasta vuonna 1966, ja pian sen '
          + 'jälkeen siitä tehtiin kansallispanteoni, jonne haudataan '
          + 'maan merkkihenkilöitä. Kupolin huipulle voi kiivetä '
          + 'katsomaan upeaa näkymää yli koko Lissabonin kattojen.',
      kuvat: [
        {
          tiedosto: 'Panteão Nacional, Lisboa, Portugal (55075210304).jpg',
          selite: 'Ilmakuva Kansallispanteonin (Panteão Nacional) valkoisesta '
            + 'kupolikirkosta, taustalla Tagus-joki ja Alfaman '
            + 'punakattoiset talot kirkkaassa kesäauringossa.',
          lahde: 'Pom\', Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  barcelona: {
    'Sagrada Família': {
      aika: '1882–',
      teksti: 'Sagrada Família on Barcelonan valtava, yhä keskeneräinen '
          + 'kirkko, jota nerokas arkkitehti Antoni Gaudí alkoi '
          + 'suunnitella 1880-luvulla. Rakennustyöt käynnistyivät '
          + 'vuonna 1882, ja Gaudí otti hankkeen johtoonsa jo '
          + 'seuraavana vuonna. Hän omisti kirkolle lopun elämästään, '
          + 'mutta kun hän kuoli vuonna 1926, rakennuksesta oli '
          + 'valmiina vasta pieni osa.'
        + '\n\n'
        + 'Kirkkoon on suunniteltu peräti 18 tornia, ja korkein '
          + 'niistä kohoaa yli 172 metriin – tämä tekee Sagrada '
          + 'Famíliasta maailman korkeimman kirkkorakennuksen. Sisällä '
          + 'valtavat kivipilarit haarautuvat katossa kuin puiden '
          + 'oksat, ja kirkon eri julkisivut kertovat Jeesuksen '
          + 'elämästä aivan eri tavoin: toinen riemuiten ja '
          + 'koristeellisesti, toinen karun pelkistetysti.'
        + '\n\n'
        + 'Kirkkoa rahoitetaan yhä pelkillä pääsylippu- ja '
          + 'lahjoitusrahoilla, ei lainkaan valtion tuella, ja '
          + 'rakentaminen on jatkunut jo yli 140 vuotta. Silti Sagrada '
          + 'Família houkuttelee vuosittain noin 5 miljoonaa kävijää '
          + 'ihailemaan tätä keskeneräistä mestariteosta, jonka '
          + 'arvioidaan valmistuvan vasta lähivuosina.',
      lainaus: {
        teksti: 'Taidehistoriasta tuskin löytyy toista kirkkoa, joka olisi '
          + 'tämän kaltainen.',
        lahde: 'Taidekriitikko Rainer Zerbst',
      },
      kuvat: [
        {
          tiedosto: 'Sagrada Familia 8-12-21 (1).jpg',
          selite: 'Sagrada Família -basilika iltapäivän auringossa, edessä '
            + 'Gaudín puiston lampi ja puut, tornien huipulla näkyy vielä '
            + 'pieniä rakennusnostureita.',
          lahde: 'Canaan, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Casa Batlló': {
      aika: '1904–1906',
      teksti: 'Casa Batlló on yksi Barcelonan tunnetuimmista taloista, ja '
          + 'senkin takana on Antoni Gaudí. Talo oli rakennettu jo '
          + 'vuonna 1877, mutta Gaudí muutti sen lähes '
          + 'tunnistamattomaksi vuosina 1904–1906 varakkaan tehtailijan '
          + 'tilauksesta. Lopputulos ei muistuttanut enää mitään '
          + 'tavallista kerrostaloa.'
        + '\n\n'
        + 'Talon julkisivu on kuin mosaiikki lasista ja keramiikasta, '
          + 'ja sen värit vaihtuvat kultaisen oranssista syvän siniseen '
          + '– moni on verrannut sitä taidemaalari Monet\'n '
          + 'lammikkomaisemiin. Vielä hurjempi on katto: sen pyöreät, '
          + 'värikylläiset kattotiilet muistuttavat lohikäärmeen '
          + 'selkäpiitä, ja katolla kohoava risti näyttää ritarin '
          + 'keihäältä, joka on iskeytynyt lohikäärmeen selkään.'
        + '\n\n'
        + 'Sisällä taloa kannattelee kymmeniä kaarevia puupalkkeja, '
          + 'jotka näyttävät valtavan eläimen kylkiluilta, ja keskellä '
          + 'rakennusta on siniseksi laatoitettu valokuilu, joka tuo '
          + 'päivänvaloa aina alimpiin kerroksiin asti. Talon '
          + 'lempinimikin, \'Luiden talo\', kertoo sen erikoisesta, '
          + 'melkein elävältä tuntuvasta muodosta. Nykyään talossa voi '
          + 'vierailla museona, ja se on ollut Unescon '
          + 'maailmanperintökohde vuodesta 2005.',
      kuvat: [
        {
          tiedosto: 'Gaudi\'s Casa Batllo, Barcelona, Spain (IMG 5380a).jpg',
          selite: 'Casa Batllón luumaisin parvekkein ja värikkäin '
            + 'mosaiikkilaatoin koristeltu julkisivu selkeässä '
            + 'päivänvalossa.',
          lahde: 'Frank K., Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Casa Batlló facade at night.JPG',
          lahde: 'Mikenorton, Wikimedia Commons (CC BY-SA 3.0)',
          selite: 'Casa Batllón julkisivu valaistuna illalla. Mosaiikki hohtaa '
            + 'lampuissa, ja parvekkeet erottuvat naamiomaisina Passeig de '
            + 'Gràcialle.',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Arc de Triomf': {
      aika: '1888',
      teksti: 'Arc de Triomf ei ole Pariisin kuuluisan Riemukaaren '
          + 'pikkuveli, vaan aivan oma, punaisesta tiilestä muurattu '
          + 'porttinsa Barcelonassa. Arkkitehti Josep Vilaseca '
          + 'suunnitteli sen vuonna 1888 pidetyn maailmannäyttelyn '
          + 'pääsisäänkäynniksi, ja kaari otettiin käyttöön juuri ennen '
          + 'näyttelyn avajaisia.'
        + '\n\n'
        + 'Kaari on lähes 30 metriä korkea ja melkein yhtä leveä, ja '
          + 'se on koristeltu näyttävillä kivireliefeillä. Etusivun '
          + 'veistos esittää Barcelonan toivottamassa maailman kansoja '
          + 'tervetulleiksi, ja kaaren molemmilla pilareilla kohoaa '
          + 'kivestä veistettyjä lepakoita, jotka olivat aikoinaan '
          + 'kuningas Jaume I:n vaakunaeläimiä.'
        + '\n\n'
        + 'Kaaren yläreunaa kiertää laakeriseppele, johon on '
          + 'kaiverrettu peräti 49 silloisen espanjalaisen maakunnan '
          + 'vaakunat. Toisin kuin monet muut riemukaaret, tätä ei '
          + 'rakennettu muistuttamaan sodasta tai voitosta, vaan se oli '
          + 'iloinen tervetulotoivotus näyttelyvieraille.',
      kuvat: [
        {
          tiedosto: 'Barcelona Arc de Triomf.jpg',
          selite: 'Arc de Triomf -riemukaari varhaisaamun kultaisessa '
            + 'valossa, tyhjä palmureunustainen promenadi johtaa suoraan '
            + 'sen läpi.',
          lahde: 'Daniel Kraft, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Musiikkipalatsi: {
      aika: '1905–1908',
      teksti: 'Palau de la Música Catalana eli Musiikkipalatsi on '
          + 'Barcelonan konserttitalo, jonka arkkitehti Lluís Domènech '
          + 'i Montaner suunnitteli 1900-luvun alussa. Rakennus '
          + 'valmistui vuosina 1905–1908, ja se avattiin yleisölle '
          + 'helmikuussa vuonna 1908.'
        + '\n\n'
        + 'Konserttisalin katossa roikkuu jättimäinen, ylösalaisin '
          + 'oleva lasimaalattu kupoli, joka hehkuu kullan- ja '
          + 'sinisenvärisenä päivänvalon osuessa siihen. Salin seinillä '
          + 'on 18 muusaa esittävää veistosta, joiden alaosa on '
          + 'koristeltu värikkäällä mosaiikilla, ja katossa liitää '
          + 'siivekkäitä hevosia antiikin Pegasos-tarun hengessä.'
        + '\n\n'
        + 'Rakennuksen julkisivu on täynnä värikkäitä laattoja, '
          + 'punatiiltä ja rautakoristeita, ja konserttisaliin mahtuu '
          + 'jopa noin 2 200 kuulijaa. Musiikkipalatsi on ollut Unescon '
          + 'maailmanperintökohde vuodesta 1997, ja siellä vierailee '
          + 'vuosittain yli puoli miljoonaa ihmistä.',
      lainaus: {
        teksti: 'Tämä on yksi maailman kauneimmista konserttisaleista – '
          + 'ilman liioittelua.',
        lahde: 'Arkkitehti David Mackay',
      },
      kuvat: [
        {
          tiedosto: 'Palau de la Música Catalana-8.jpg',
          selite: 'Palau de la Música Catalanan koristeellinen kulmatorni '
            + 'pylväineen, patsaineen ja mosaiikkikupolein aurinkoisena '
            + 'päivänä.',
          lahde: 'bep, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Palau de la Música Catalana-Palace of Catalan Music (Image 2).jpg',
          selite: 'Palau de la Música Catalanan konserttisalin sisätila, jota '
            + 'hallitsee kuuluisa käänteinen lasimosaiikkinen '
            + 'kattoikkuna.',
          lahde: 'Tudoi61, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Boquerian kauppahalli': {
      aika: '1840–1853',
      teksti: 'Boquerian kauppahalli on yksi Euroopan vanhimmista ja '
          + 'vilkkaimmista toreista, ja sen juuret ulottuvat todella '
          + 'kauas: jo vuonna 1217 kaupunginportin lähellä myytiin '
          + 'lihaa samalla paikalla. Vuosisatojen kuluessa myyjiä tuli '
          + 'lisää, ja 1400-luvulla torilla myytiin erityisesti sikoja.'
        + '\n\n'
        + 'Nykyinen katettu halli alkoi rakentua vuonna 1840, ja se '
          + 'avattiin virallisesti vuonna 1853. Myöhemmin halliin '
          + 'rakennettiin oma kalaosasto, ja vuonna 1914 koko markkinan '
          + 'päälle nostettiin näyttävä metallikatto, joka suojaa '
          + 'myyjiä ja ostajia edelleen tänäkin päivänä.'
        + '\n\n'
        + 'Torin nimi Boqueria juontuu luultavasti katalaanin sanasta '
          + '\'boc\', joka tarkoittaa vuohta – ennen vanhaan siellä '
          + 'nimittäin myytiin paljon vuohenlihaa. Nykyään hallin sadat '
          + 'myyntikojut pursuavat tuoreita hedelmiä, kaloja, lihaa ja '
          + 'herkullisia makeisia, ja se on yksi Barcelonan '
          + 'suosituimmista käyntikohteista niin paikallisille kuin '
          + 'matkailijoillekin.',
      kuvat: [
        {
          tiedosto: 'Mercat de la Boqueria 01.jpg',
          selite: 'Boquerian kauppahallin rautainen ja lasimaalauksin '
            + 'koristeltu sisäänkäyntiportti kyltteineen iltapäivän '
            + 'valossa, katu täynnä kävelijöitä.',
          lahde: 'Nicholas Gemini, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kolumbuksen patsas': {
      aika: '1882–1888',
      teksti: 'Kolumbuksen patsas kohoaa Barcelonan satamassa siinä, '
          + 'missä La Rambla -katu päättyy mereen. Se rakennettiin '
          + 'vuosina 1882–1888 suurta maailmannäyttelyä varten, joka '
          + 'järjestettiin Barcelonassa vuonna 1888, ja arkkitehti '
          + 'Gaietà Buigas voitti kilpailun patsaan suunnittelusta.'
        + '\n\n'
        + 'Koko monumentti on 60 metriä korkea – lähes kahdenkymmenen '
          + 'kerroksisen talon mittainen! Huipulla seisoo 7,2 metrin '
          + 'korkuinen pronssinen Kolumbus-patsas, joka osoittaa '
          + 'kädellään kohti merta ja pitää toisessa kädessä '
          + 'karttakääröä. Pylvästä koristavat muun muassa siivekkäät '
          + 'voitonjumalattaret ja mytologiset griipit.'
        + '\n\n'
        + 'Hauska yksityiskohta: monet luulevat Kolumbuksen '
          + 'osoittavan kohti Amerikkaa, mutta todellisuudessa sormi '
          + 'näyttää suuntaan, joka vie kartalla Pohjois-Afrikkaan '
          + 'asti. Todennäköisin selitys on, että patsas haluttiin '
          + 'yksinkertaisesti kääntää kohti avomerta korostamaan '
          + 'Kolumbuksen mainetta merenkulkijana. Pylvään sisällä on '
          + 'jopa pieni hissi, jolla pääsee näköalatasanteelle aivan '
          + 'patsaan jalustan alle.',
      kuvat: [
        {
          tiedosto: 'Mirador de Colom - panoramio.jpg',
          selite: 'Kolumbuksen patsas pylväineen suoraan edestä kuvattuna '
            + 'kirkkaassa auringonpaisteessa, ympärillä palmureunustainen '
            + 'promenadi ja koristelyhdyt.',
          lahde: 'Mister No, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  granada: {
    'Sacromonten luolat': {
      aika: '1500-luku',
      teksti: 'Granadan itälaidalla kohoaa Sacromonten kukkula, jonka '
          + 'rinteisiin on kaiverrettu satoja luolakoteja jo '
          + '1500-luvulta lähtien. Ensin luoliin piiloutuivat ihmiset, '
          + 'jotka oli karkotettu kaupungista, mutta pian niistä tuli '
          + 'koti romanikansalle eli gitaneille, jotka asettuivat '
          + 'Granadaan sen jälkeen kun kaupunki oli vuonna 1492 '
          + 'vallattu takaisin kristityille. Jokainen luola on '
          + 'erimuotoinen, sillä se on louhittu suoraan kukkulan '
          + 'kallioon - ovena toimii usein pyöreä, valkoiseksi kalkittu '
          + 'kaariaukko.'
        + '\n\n'
        + 'Lähellä sijaitsevassa rotkossa, jota kutsutaan Mustien '
          + 'rotkoksi, kerrotaan tarina vapautetuista orjista, jotka '
          + 'etsivät sotien jälkeen kätkettyä arabikultaa '
          + 'oliivilehdosta - aivan kuin suoraan aarrejahdista! '
          + 'Luolakylässä syntyi myös oma tanssiperinne, zambra, joka '
          + 'juontuu romanien häärituaaleista ja jota tanssittiin '
          + 'luolien sisällä soihtujen valossa.'
        + '\n\n'
        + 'Nykyään yksitoista vanhaa luolaa on avattu yleisölle '
          + 'Sacromonten luolamuseona, joka avattiin vuonna 2002. '
          + 'Siellä pääsee näkemään, millaisia ammatteja luolien '
          + 'asukkailla oli ja miten flamenco syntyi juuri näillä main.',
      kuvat: [
        {
          tiedosto: 'AA SACROMONTE HOUSES 2016.jpg',
          selite: 'Kapea mukulakivinen katu Sacromontessa: valkoiseksi '
            + 'kalkittuja luolataloja, punatiilinen kaariovi ja portaikko '
            + 'iltapäivän kultaisessa valossa.',
          lahde: 'Øyvind Holmstad, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Albaicínin näköalapaikka': {
      aika: '1000-luku–1400-luku',
      teksti: 'Alhambraa vastapäätä, joen toisella puolella, kohoaa '
          + 'Albaicín - Granadan vanha kaupunginosa, jonka '
          + 'mutkittelevat kujat ovat säilyneet lähes ennallaan '
          + '1200–1400-luvuilta asti. Alueen juuret ulottuvat vielä '
          + 'kauemmas: jo 1000-luvulla täällä seisoi Zawi ben Zirin '
          + 'rakennuttama linnoitus, jota ympäröi lähes 75 hehtaarin '
          + 'kokoinen muuri.'
        + '\n\n'
        + 'Kukkulan laella sijaitsee Mirador de San Nicolás, '
          + 'näköalapaikka josta avautuu Granadan kuuluisin maisema: '
          + 'koko Alhambra levittäytyy katsojan eteen laakson toisella '
          + 'puolella, lumihuippuinen Sierra Nevada taustalla. Kujien '
          + 'varsilla on yhä kymmeniä satojenkin vuosien takaisia '
          + 'maanalaisia vesisäiliöitä - yksi niistä, 1000-luvulla '
          + 'rakennettu Aljibe del Rey, veti mahtavat 300 kuutiometriä '
          + 'vettä.'
        + '\n\n'
        + 'Vuonna 1994 Unesco liitti Albaicínin '
          + 'maailmanperintöluetteloon osana Alhambran ja Generalifen '
          + 'kokonaisuutta. Kaupunginosan nimen alkuperästä kiistellään '
          + 'yhä: jotkut tutkijat arvelevat sen tarkoittavan haukkojen '
          + 'kaupunginosaa, toiset taas kalkinlevittäjien asuinaluetta.',
      kuvat: [
        {
          tiedosto: 'Granada - View from Mirador de San Nicolás - 01.jpg',
          selite: 'Alhambran linnoitus kukkulalla auringonlaskun kultaisessa '
            + 'valossa, kuvattuna Albaicínin Mirador de San Nicolásin '
            + 'näköalapaikalta sypressien välistä.',
          lahde: 'Benjamin Smith, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'AA SPECTATORS AT PLAZA MIRADOR IN GRANADA 2016.jpg',
          selite: 'Ihmisiä istumassa Mirador de San Nicolásin vanhalla tiili- '
            + 'ja kivimuurilla iltavalossa katselemassa auringonlaskua '
            + 'Albaicínin kujalla.',
          lahde: 'Øyvind Holmstad, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Generalife: {
      aika: '1273–1319',
      teksti: 'Alhambran vieressä, hieman korkeammalla kukkulalla, '
          + 'sijaitsee Generalife - Granadan emiirien kesäpalatsi ja '
          + 'maatila, jonne hallitsijat pakenivat kaupungin kuumuutta. '
          + 'Sen rakentaminen alkoi 1200-luvun lopulla emiiri Muhammad '
          + 'II:n aikana, ja emiiri Ismail I laajensi palatsia vuonna '
          + '1319. Alueella kasvatettiin myös hedelmiä ja vihanneksia '
          + 'hallitsijan pöytään, joten Generalife ei ollut pelkkä '
          + 'huvipuutarha vaan myös oikea maatila.'
        + '\n\n'
        + 'Palatsin sydän on Acequia-piha, lähes 49 metriä pitkä '
          + 'puutarha, jonka keskellä solisee vesikanava reunasta '
          + 'reunaan. Vesi tuotiin paikalle kuutta kilometriä pitkää '
          + 'kanavaa pitkin Darro-joesta asti, ja se piti puutarhan '
          + 'vihreänä keskellä Andalusian helleaikoja. Aikalaiset '
          + 'kertoivat pihan suihkulähteiden olleen niin voimakkaita, '
          + 'että vesi lensi korkealle ilmaan.'
        + '\n\n'
        + 'Vuonna 1958 Generalifessa syttyi tulipalo, mutta se toi '
          + 'mukanaan yllätyksen: palon jäljiltä tehdyissä kaivauksissa '
          + 'löytyi 70 senttimetrin syvyydestä alkuperäisiä, satoja '
          + 'vuosia unohduksissa olleita nasridiajan kivettyjä polkuja. '
          + 'Generalife liitettiin Unescon maailmanperintöluetteloon '
          + 'vuonna 1984.',
      lainaus: {
        teksti: 'Vesi suihkusi lähes kymmenen metrin korkeuteen ilmaan.',
        lahde: 'venetsialainen matkustaja Andrea Navagero, joka näki '
          + 'Generalifen puutarhat 1520-luvulla',
      },
      kuvat: [
        {
          tiedosto: 'Granada - Generalife - Patio de la Acequia - 1.jpg',
          selite: 'Generalifen puutarhan Patio de la Acequia: pitkä vesiallas '
            + 'ja suihkulähteiden vesisuihkut johtavat kesäpalatsin '
            + 'rakennukselle, kukkapenkit ja pensasaidat molemmin puolin.',
          lahde: 'Benjamin Smith, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Granadan katedraali': {
      aika: '1523–1704',
      teksti: 'Kun Granada oli vallattu takaisin kristityille vuonna '
          + '1492, kaupungin suurimman moskeijan paikalle alettiin '
          + 'vuosikymmeniä myöhemmin rakentaa valtava katedraali. '
          + 'Perustustyöt aloitti arkkitehti Enrique Egas vuonna 1518, '
          + 'mutta varsinainen rakentaminen pääsi vauhtiin vasta vuonna '
          + '1523 - ja kesti siitä peräti 181 vuotta, aina jouluaattoon '
          + '1704 asti, jolloin viimeiset kivet muurattiin paikoilleen. '
          + 'Vuonna 1529 työt otti vastuulleen Diego de Siloé, joka '
          + 'muutti suunnitelman renessanssityyliin ja lisäsi kirkkoon '
          + 'viisi holvikäytävää sekä epätavallisen pyöreän '
          + 'pääkappelin.'
        + '\n\n'
        + 'Katedraalin sisällä soi kaksi 1700-luvulla rakennettua '
          + 'urkua, jotka näyttävät koristeiltaan lähes identtisiltä '
          + 'mutta kuulostavat aivan erilaisilta. Kirkosta löytyy myös '
          + 'kuuluisien maalarien El Grecon ja Jusepe de Riberan '
          + 'teoksia sekä kuvanveistäjä Alonso Canon veistämät Aatamin '
          + 'ja Eevan rintakuvat.'
        + '\n\n'
        + 'Alun perin katedraaliin suunniteltiin kaksi jättimäistä, '
          + '81 metriä korkeaa tornia, mutta rahat loppuivat kesken '
          + 'eikä niitä koskaan saatu valmiiksi. Yksi tornikin on nyt '
          + 'kunnostettu, ja siitä avautuu jälleen näköala kaupungin '
          + 'ylle.',
      kuvat: [
        {
          tiedosto: 'Facade of the Cathedral of Granada (3).JPG',
          selite: 'Granadan katedraalin valkoinen barokkijulkisivu Plaza de '
            + 'las Pasiegasilla kirkkaassa auringonvalossa, ihmisiä '
            + 'portailla ja aukiolla edessä.',
          lahde: 'Jbribeiro1, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Alhambra: {
      aika: '1238–1391',
      teksti: 'Punertavalle kukkulalle Granadan laitaan alkoi vuonna 1238 '
          + 'nousta linnoituskaupunki, jonka arabiankielinen nimi '
          + 'Alhambra tarkoittaa suunnilleen punaista. Nimi juontuu '
          + 'paikallisesta savesta, jossa on niin paljon rautaa, että '
          + 'muurit hehkuvat punertavina auringonlaskussa. Rakentamisen '
          + 'aloitti Nasridien suvun perustaja Muhammad I, ja '
          + '1300-luvulla hallitsijat Yusuf I ja Muhammad V laajensivat '
          + 'linnoituksesta kokonaisen pikkukaupungin, jossa oli '
          + 'moskeijoita, kylpylöitä, työpajoja ja jopa oma '
          + 'vesijohtoverkosto.'
        + '\n\n'
        + 'Alhambra on valtava - sen alueelle mahtuisi lähes '
          + 'kaksikymmentä jalkapallokenttää - ja sisällä on ainakin '
          + 'kuusi eri palatsia. Kuuluisin niistä on Leijonien palatsi, '
          + 'jonka pihalla marmoriset leijonapatsaat kannattelevat '
          + 'suihkulähdettä. Seinät oli alun perin maalattu kirkkaan '
          + 'punaisiksi, sinisiksi ja kultaisiksi, vaikka ne näyttävät '
          + 'nykyään lähes värittömiltä.'
        + '\n\n'
        + 'Vuonna 1492, samana vuonna kun Granada antautui '
          + 'kristityille, Kristoffer Kolumbus esitteli Alhambran '
          + 'saleissa suunnitelmansa purjehtia valtameren yli. '
          + 'Kuningatar Isabella ja kuningas Ferdinand hyväksyivät '
          + 'retkikunnan huhtikuun 17. päivä - vain kuukausia ennen '
          + 'kuin Kolumbus lähti kohti Amerikkaa.',
      lainaus: {
        teksti: 'Eikä ole voittajaa paitsi Jumala.',
        lahde: 'Nasridien suvun tunnuslause, kaiverrettuna satoihin '
          + 'kertoihin Alhambran seinille',
      },
      kuvat: [
        {
          tiedosto: 'Granada - Alhambra - Palacios nazaríes - Patio de los Leones - 1.jpg',
          selite: 'Alhambran Leijonien pihan (Patio de los Leones) '
            + 'koristeelliset nasridipilarit ja kaariholvit, joiden läpi '
            + 'näkyy paviljonki ja sypressejä kirkkaassa päivänvalossa.',
          lahde: 'Benjamin Smith, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Fountain patio de los Leones Alhambra Granada Spain.jpg',
          selite: 'Alhambran Leijonien pihan keskellä oleva kuuluisa '
            + 'marmorinen suihkulähde, jota kannattelee kaksitoista '
            + 'kivileijonaa.',
          lahde: 'Jebulon, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Manuel de Fallan talo': {
      aika: '1921–1939',
      teksti: 'Aivan Alhambran kupeessa seisoo vaatimaton huvila, josta '
          + 'avautuu näkymä koko Granadaan. Siellä asui vuosina '
          + '1921–1939 säveltäjä Manuel de Falla, yksi Espanjan '
          + 'tunnetuimmista muusikoista - ja juuri tässä talossa hän '
          + 'sävelsi osan kuuluisimmista teoksistaan.'
        + '\n\n'
        + 'Vuonna 1922 Falla järjesti Concurso de Cante Jondo '
          + '-nimisen laulukilpailun, joka nosti Andalusian perinteisen '
          + 'flamencolaulun suuren yleisön tietoisuuteen. Falla asui '
          + 'talossa koko tämän luovan kautensa ajan, kunnes Espanjan '
          + 'sisällissota pakotti hänet lähtemään maasta vuonna 1939 - '
          + 'hän ei koskaan palannut Granadaan.'
        + '\n\n'
        + 'Fallan lähdön jälkeen hänen huvilansa säilytettiin '
          + 'sellaisena kuin hän sen jätti, ja siitä tehtiin museo, '
          + 'joka kertoo säveltäjän elämästä ja työstä. 1970-luvulla '
          + 'talon viereen rakennettiin konserttitalo, Auditorio Manuel '
          + 'de Falla, jonka avajaiskonsertissa soitettiin tietenkin '
          + 'juuri Fallan omaa musiikkia.',
      kuvat: [
        {
          tiedosto: 'House of Manuel de Falla in Granada.jpg',
          selite: 'Manuel de Fallan valkoiseksi kalkittu Carmen-talo '
            + 'Alhambran kupeessa: sininen puuovi, siniset '
            + 'ikkunanpuitteet ja seinällä museokyltti \'Museo Manuel de '
            + 'Falla\'.',
          lahde: 'Agracier, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Granada, Casa-Museo de Manuel de Falla (4).jpg',
          selite: 'Talon seinällä oleva sinivalkoinen kaakelilaatta, jossa '
            + 'lukee espanjaksi \'En esta casa vivió Manuel de Falla\' '
            + '(Tässä talossa asui Manuel de Falla).',
          lahde: 'Palickap, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  rooma: {
    Pietarinkirkko: {
      aika: '1506–1626',
      teksti: 'Nykyisen kirkon paikalla seisoi ennen toinen, paljon '
          + 'vanhempi kirkko, jonka roomalainen keisari Konstantinus '
          + 'rakennutti jo 300-luvulla. Uuden, valtavan kirkon '
          + 'rakentaminen alkoi vuonna 1506 ja kesti yli 120 vuotta — '
          + 'se valmistui vasta 1626. Monta kuuluisaa arkkitehtia ehti '
          + 'työstää sitä matkan varrella: Michelangelo suunnitteli '
          + 'kirkon jättimäisen kupolin, ja Bernini rakensi eteen '
          + 'aukion, jota kiertävät pylväskäytävät kuin avoimet '
          + 'käsivarret.'
        + '\n\n'
        + 'Kupoli kohoaa lähes 137 metrin korkeuteen ja on maailman '
          + 'korkein kirkonkupoli. Sisään mahtuu seisomaan jopa 60 000 '
          + 'ihmistä yhtä aikaa. Vuonna 1950 kirkon alta kaivettiin '
          + 'esiin muinainen hauta, jonka uskotaan olevan apostoli '
          + 'Pietarin oma — hänen mukaansa koko kirkko on saanut '
          + 'nimensä.'
        + '\n\n'
        + 'Kirkossa on myös Michelangelon kuuluisa marmoriveistos '
          + 'Pietà, joka esittää Neitsyt Mariaa pitelemässä kuollutta '
          + 'Jeesusta sylissään. Se on ainoa teos, johon Michelangelo '
          + 'koskaan kaiversi oman nimensä.',
      lainaus: {
        teksti: 'An ornament of the earth ... the sublime of the beautiful '
          + '— Maan kaunistus ... kauneuden ylevin muoto.',
        lahde: 'Yhdysvaltalainen kirjailija ja ajattelija Ralph Waldo '
          + 'Emerson kuvaili näin Pietarinkirkkoa.',
      },
      kuvat: [
        {
          tiedosto: 'St. Peter\'s Basilica view from Saint Peter\'s Square, Vatican City, Rome, Italy.jpg',
          selite: 'Pietarinkirkon julkisivu ja kupoli kirkkaassa '
            + 'auringonpaisteessa, kuvattuna suoraan edestä '
            + 'Pietarinaukiolta.',
          lahde: 'Mstyslav Chernov, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Rom, Vatikan, Petersdom - Silhouette bei Sonnenuntergang 2.jpg',
          selite: 'Pietarinkirkon kupoli mustana siluettina auringonlaskun '
            + 'oranssinkeltaista taivasta vasten.',
          lahde: 'Dnalor 01, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Brogi, Giacomo (1822-1881) - n. 0117 - Roma - Basilica di S. Pietro in Vaticano (1870s).jpg',
          selite: 'Vanha mustavalkoinen valokuva Pietarinkirkosta ja '
            + 'Pietarinaukiosta 1870-luvulta, hevoskärryjä aukiolla.',
          lahde: 'Giacomo Brogi, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Castel Sant’Angelo': {
      aika: '135–139',
      teksti: 'Linna ei ollut alkujaan linna lainkaan, vaan valtava '
          + 'hauta. Keisari Hadrianus rakennutti sen itselleen ja '
          + 'perheelleen mausoleumiksi vuosina 135–139 — hänen vaimonsa '
          + 'Sabina ja ottopoikansa Lucius Aelius haudattiin sinne '
          + 'ensimmäisinä. Vuosisatoja myöhemmin paavit muuttivat '
          + 'rakennuksen linnoitukseksi, ja siitä rakennettiin suoraan '
          + 'Pietarinkirkolle johtava salainen katettu käytävä, '
          + 'Passetto di Borgo, jota pitkin paavi pääsi tarvittaessa '
          + 'pakenemaan vaaran uhatessa.'
        + '\n\n'
        + 'Linnan huipulla seisoo pronssinen enkelipatsas. Legendan '
          + 'mukaan arkkienkeli Mikael ilmestyi katolle, tuppesi '
          + 'miekkansa ja lopetti näin kauhean ruttoepidemian. '
          + 'Ensimmäinen enkelipatsas nousi katolle 1536, ja nykyinen '
          + 'pronssiversio on vuodelta 1753.'
        + '\n\n'
        + 'Linnaa käytettiin myös vankilana: siellä istui muun muassa '
          + 'kultaseppä ja taiteilija Benvenuto Cellini sekä '
          + 'tähtitieteilijä Giordano Bruno, joka vietti siellä peräti '
          + 'kuusi vuotta. Nykyään linnassa käy vuosittain yli miljoona '
          + 'vierasta, ja se on nähty myös oopperassa Tosca, jonka '
          + 'päähenkilö hyppää sen muureilta.',
      kuvat: [
        {
          tiedosto: 'RomaCastelSantAngelo.jpg',
          selite: 'Castel Sant\'Angelo kultaisessa iltavalaistuksessa '
            + 'syvänsinistä hämärätaivasta vasten, Ponte Sant\'Angelon '
            + 'enkelipatsaiden kehystämänä.',
          lahde: 'Andreas Tille, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Castle and bridge of St. Angelo, Rome, Italy LOC 4754573425.jpg',
          selite: 'Käsin väritetty photochrom-valokuva Castel Sant\'Angelosta '
            + 'ja sillan patsaista noin 1890-luvulta.',
          lahde: 'Tuntematon (Library of Congress -kokoelma), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Espanjalaiset portaat': {
      aika: '1723–1725',
      teksti: 'Portaat rakennettiin vuosina 1723–1725 yhdistämään '
          + 'alakaupunki ja yläkaupunki loivin, kaartuvin askelmin. '
          + 'Askelmia on 135, ja ne kohoavat 29 metriä ylös jyrkkää '
          + 'rinnettä. Rahat portaisiin jätti testamentissaan '
          + 'ranskalainen diplomaatti Étienne Gueffier jo vuonna 1660, '
          + 'mutta hanke jumiutui vuosikymmeniksi, ennen kuin '
          + 'arkkitehti Francesco de Sanctis vihdoin pääsi piirtämään '
          + 'ne.'
        + '\n\n'
        + 'Portaiden alla on 1620-luvulta peräisin oleva suihkulähde, '
          + 'jonka lempinimi on \'ruma vene\' — se on muotoiltu puoliksi '
          + 'upoksissa olevaksi laivaksi. Ylhäällä portaat päättyvät '
          + 'Trinità dei Monti -kirkon eteen, jonka kaksoistornit '
          + 'näkyvät kauas yli kaupungin katujen.'
        + '\n\n'
        + 'Portaiden juurella asui myös englantilainen runoilija John '
          + 'Keats, joka kuoli talossaan vuonna 1821 vain 25-vuotiaana '
          + '— nykyään talo on hänen museonsa. Portaat ovat sittemmin '
          + 'esiintyneet monissa elokuvissa, muun muassa klassikossa '
          + 'Loma Roomassa (1953) Audrey Hepburnin kanssa.',
      lainaus: {
        teksti: 'Here lies one whose name was writ in water — Tässä lepää '
          + 'mies, jonka nimi on kirjoitettu veteen.',
        lahde: 'Runoilija John Keatsin oma toivomus hautakirjoitukseksi; '
          + 'hän kuoli 1821 talossa aivan portaiden juurella.',
      },
      kuvat: [
        {
          tiedosto: 'Roma - Piazza di Spagna (28025798777).jpg',
          selite: 'Espanjalaiset portaat ja Trinità dei Montin kirkko '
            + 'aurinkoisena päivänä, Barcaccia-suihkulähde etualalla, '
            + 'palmu vasemmalla.',
          lahde: 'Fred Romero, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Piazza di Spagna, Roma - scalinata fc03.jpg',
          selite: 'Espanjalaiset portaat keväällä täynnä vaaleanpunaisia '
            + 'atsaleoita, suihkulähde ja turisteja etualalla.',
          lahde: 'Fczarnowski, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Trevin suihkulähde': {
      aika: '1732–1762',
      teksti: 'Suihkulähde seisoo paikassa, jonne muinaiset roomalaiset '
          + 'johtivat puhdasta vettä jo vuodesta 19 eaa. lähtien pitkää '
          + 'Aqua Virgo -vesijohtoa pitkin — matkaa maan alla kertyi '
          + 'peräti 22 kilometriä. Nykyinen upea lähde on paljon '
          + 'uudempi: arkkitehti Nicola Salvi aloitti sen rakentamisen '
          + '1732, ja se valmistui vasta 1762, 11 vuotta hänen '
          + 'kuolemansa jälkeen.'
        + '\n\n'
        + 'Lähde on maailman suurin barokkityylinen suihkulähde: se '
          + 'on 26 metriä korkea ja lähes 50 metriä leveä. Keskellä '
          + 'komeilee merenjumala Neptunus vaunuillaan, joita vetävät '
          + 'kaksi hevosta — toinen rauhallinen ja toinen villi, '
          + 'kuvaamassa meren kahta puolta.'
        + '\n\n'
        + 'Perinteen mukaan olan yli lähteeseen heitetty kolikko '
          + 'takaa paluun Roomaan. Kolikoita kertyy joka päivä noin 3 '
          + '000 euron edestä, ja kaikki rahat lahjoitetaan '
          + 'hyväntekeväisyysjärjestölle, joka auttaa vähävaraisia. '
          + 'Lähde on nähty monissa elokuvissa, kuuluisimmin filmissä '
          + 'La Dolce Vita (1960), jossa näyttelijä kahlaa iltapuvussa '
          + 'keskellä allasta.',
      kuvat: [
        {
          tiedosto: 'Fontaine Trevi - Rome.jpg',
          selite: 'Trevin suihkulähde kokonaisuudessaan suoraan edestä '
            + 'kuvattuna, patsaat ja turkoosi vesi selkeästi näkyvissä.',
          lahde: 'Wilfredor, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Fountain of Trevi, Rome, Italy LOC 4755209370.jpg',
          selite: 'Vanha käsin väritetty photochrom-valokuva Trevin '
            + 'suihkulähteestä noin 1890-luvulta, aukio lähes tyhjä '
            + 'muutamaa ohikulkijaa lukuun ottamatta.',
          lahde: 'Tuntematon (Library of Congress -kokoelma), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Pantheon: {
      aika: 'n. 126',
      teksti: 'Samalla paikalla seisoi ensin toinen temppeli, jonka '
          + 'sotapäällikkö Marcus Agrippa rakennutti noin 29 eaa., '
          + 'mutta se paloi. Keisari Hadrianus rakennutti tilalle '
          + 'täysin uuden temppelin, joka valmistui noin vuonna 126 — '
          + 'ja hän antoi kohteliaasti Agrippan nimen pysyä rakennuksen '
          + 'otsassa, vaikka koko hanke oli hänen omansa.'
        + '\n\n'
        + 'Temppelin kupoli on edelleen maailman suurin '
          + 'raudoittamaton betonikupoli, halkaisijaltaan 43 metriä. '
          + 'Katon keskellä on pyöreä aukko, oculus eli \'silmä\', jonka '
          + 'läpi paistaa aurinko ja sataa sade suoraan lattialle. '
          + 'Roomalaiset käyttivät kupolin yläosassa yhä kevyempää '
          + 'kiveä kuin alaosassa, jotta se ei romahtaisi omaan '
          + 'painoonsa.'
        + '\n\n'
        + 'Pantheon on säilynyt näin hyväkuntoisena, koska paavi '
          + 'Bonifatius IV muutti sen kirkoksi vuonna 609 — pyhäksi '
          + 'julistettua rakennusta kukaan ei enää uskaltanut purkaa, '
          + 'toisin kuin monelle muulle antiikin temppelille kävi. '
          + 'Kirkkoon on haudattu myös taidemaalari Raffael sekä '
          + 'Italian ensimmäiset kuninkaat.',
      lainaus: {
        teksti: 'Kaareva katto muistuttaa taivasta.',
        lahde: 'Roomalainen historioitsija Cassius Dio kuvaili näin '
          + 'Pantheonin kupolia noin 75 vuotta rakennuksen '
          + 'valmistumisen jälkeen.',
      },
      kuvat: [
        {
          tiedosto: 'Pantheon Rom 1 cropped.jpg',
          selite: 'Pantheonin pylväikkö, päätykolmio ja kupoli kultaisessa '
            + 'illan valossa, aukio ja suihkulähde lähes tyhjinä.',
          lahde: 'Rabax63, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Interior oculus of the Rome Pantheon.jpg',
          selite: 'Pantheonin sisäkaton pyöreä aukko (oculus) alhaalta '
            + 'kuvattuna, valo virtaa sisään kassettikaton läpi.',
          lahde: 'T. Le Berre, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'The Pantheon, Rome, Italy LCCN93512726.jpg',
          selite: 'Vanha mustavalkoinen valokuva Pantheonista vuodelta 1870; '
            + 'julkisivun päällä näkyy vielä kaksi pientä kellotornia, '
            + 'jotka purettiin myöhemmin.',
          lahde: 'Library of Congress -kokoelma, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Colosseum: {
      aika: '72–80',
      teksti: 'Keisari Vespasianus aloitti jättimäisen areenan '
          + 'rakentamisen vuonna 72, ja hänen poikansa Titus vihki sen '
          + 'käyttöön kahdeksan vuotta myöhemmin, vuonna 80. Avajaisia '
          + 'juhlittiin peräti 100 päivän ajan erilaisin näytöksin. '
          + 'Rakennuksen oikea nimi oli Flavolaisten amfiteatteri — '
          + 'lempinimi \'Colosseum\' tulee sen vierestä kohonneesta '
          + 'jättiläismäisestä Colossus-patsaasta, ei areenasta '
          + 'itsestään.'
        + '\n\n'
        + 'Katsomoon mahtui kerralla 50 000–80 000 katsojaa, enemmän '
          + 'kuin moneen nykyaikaiseen jalkapallostadioniin. Areenalla '
          + 'nähtiin gladiaattoritaisteluita ja villieläinten '
          + 'metsästyksiä — sinne tuotiin leijonia, norsuja ja jopa '
          + 'sarvikuonoja kaukaa Afrikasta. Areena voitiin jopa täyttää '
          + 'vedellä ja lavastaa siellä pienoiskoossa oikeita '
          + 'laivataisteluita.'
        + '\n\n'
        + 'Lattian alla piileskeli hypogeum, monimutkainen '
          + 'tunneliverkosto, jossa eläimet ja taistelijat odottivat '
          + 'vuoroaan. Sieltä johti 80 nostoluukkua suoraan areenalle, '
          + 'joten peto saattoi yllättäen ponnahtaa esiin kesken '
          + 'taistelun. Vuosisatojen saatossa maanjäristykset ja '
          + 'kivenryöstäjät veivät osan rakennuksesta — moni '
          + 'keskiaikainen roomalaistalo on muurattu juuri Colosseumin '
          + 'kivistä.',
      lainaus: {
        teksti: 'Quamdiu stat Colisæus, stat et Roma; quando cadet '
          + 'colisæus, cadet et Roma; quando cadet Roma, cadet et '
          + 'mundus — Niin kauan kuin Colossus seisoo, seisoo Roomakin; '
          + 'kun Colossus kaatuu, kaatuu Roomakin; kun Rooma kaatuu, '
          + 'kaatuu koko maailma.',
        lahde: '800-luvulla kirjattu ennustus, joka viittasi alun perin '
          + 'areenan vieressä seisoneeseen jättiläispatsaaseen — '
          + 'myöhemmin sanonta on yhdistetty itse Colosseumiin.',
      },
      kuvat: [
        {
          tiedosto: 'Rome (IT), Kolosseum -- 2013 -- 3400.jpg',
          selite: 'Colosseum kokonaisuudessaan aurinkoisena päivänä kirkkaan '
            + 'sinistä taivasta vasten, aukio edessä lähes tyhjä.',
          lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Colosseum Interior 1 (15005911295).jpg',
          selite: 'Colosseumin sisäareena istumakatsomoineen ja '
            + 'paljastettuine maanalaisine käytävineen, kirkkaassa '
            + 'auringonpaisteessa.',
          lahde: 'daryl_mitchell, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'The Colisuem and Meta Sudans, Rome, Italy LOC 4755211890.jpg',
          selite: 'Käsin väritetty photochrom-valokuva Colosseumista noin '
            + '1890-luvulta; edessä näkyy vielä tuolloin pystyssä ollut '
            + 'Meta Sudans -suihkulähteen raunio ja Konstantinuksen '
            + 'riemukaari.',
          lahde: 'Tuntematon (Library of Congress -kokoelma), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  krakova: {
    Barbakaani: {
      aika: '1498',
      teksti: 'Krakovan vanhaan kaupunginmuuriin liittyvä pyöreä '
          + 'puolustuslinnake Barbakaani rakennettiin vuonna 1498. '
          + 'Puolalaiset pelkäsivät ottomaanien hyökkäystä, sillä '
          + 'kuningas Jan I Olbracht oli juuri kärsinyt raskaan '
          + 'sotilaallisen tappion. Niinpä kaupungin tärkeimmän portin '
          + 'eteen päätettiin pystyttää järeä kivilinnake vartioimaan '
          + 'kulkijoita.'
        + '\n\n'
        + 'Barbakaani on lähes täydellisen pyöreä, ja sen sisäpiha on '
          + 'halkaisijaltaan noin 24 metriä. Muureissa on peräti 130 '
          + 'ampuma-aukkoa, joista puolustajat saattoivat ampua '
          + 'vihollista turvallisesti sisältä käsin. Rakennusta ympäröi '
          + 'leveä vallihauta - 26 metriä leveä ja 6 metriä syvä - ja '
          + 'seinät ovat alhaalta jopa 3 metriä paksut mutta ohenevat '
          + 'ylhäältä vain puoleen metriin.'
        + '\n\n'
        + 'Katettu käytävä yhdisti Barbakaanin Floriankadun porttiin, '
          + 'joten sotilaat pääsivät pakenemaan turvallisesti kaupungin '
          + 'sisään tarpeen tullen. 1800-luvun alussa linnake oltiin '
          + 'purkamassa pois tieltä, mutta kaksi krakovalaista '
          + 'senaattoria pelasti sen vuonna 1817. Nykyään Barbakaanissa '
          + 'voi kävellä muurien päällä ja tutustua kaupungin '
          + 'puolustushistoriaan museona.',
      kuvat: [
        {
          tiedosto: 'Barbakan przed wschodem słońca.jpg',
          selite: 'Krakovan Barbakaani aamuhämärässä: pyöreä punatiilinen '
            + 'puolustustorni kohoaa autiolla kadulla, taivas '
            + 'sinipunervana ja katuvalot vielä palavat.',
          lahde: 'Gswito, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Wilhelm Kleinberg, Kraków, Barbakan, MHF 104 II 7 (MuFo).jpg',
          selite: 'Vanha valokuva Barbakaanista noin vuosilta 1890–1900; '
            + 'edessä hevosvetoinen ajoneuvo ja kaupunkilaisia kivetyllä '
            + 'aukiolla.',
          lahde: 'Wilhelm Kleinberg (kustantaja Rommler & Jonas), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Collegium Maius': {
      aika: '1400-luvun loppu',
      teksti: 'Jagellonin yliopiston vanhin rakennus Collegium Maius sai '
          + 'nykyisen goottilaisen ilmeensä 1400-luvun lopulla, vaikka '
          + 'talo on osittain jo 1300-luvulta. Kuningas Władysław '
          + 'Jagiełło osti rakennuksen yliopiston käyttöön rahoilla, '
          + 'jotka olivat jääneet hänen edesmenneeltä puolisoltaan '
          + 'kuningatar Jadwigalta.'
        + '\n\n'
        + 'Sisäpihaa kiertävät kivikaaret, ja pihan keskellä on kaivo '
          + 'vuodelta 1517. Talossa opiskeli 1490-luvulla nuori Mikael '
          + 'Kopernikus, josta tuli myöhemmin tähtitieteilijä, joka '
          + 'osoitti Maan kiertävän Aurinkoa eikä toisin päin.'
        + '\n\n'
        + 'Nykyään rakennuksessa toimii yliopiston museo. '
          + 'Aarrekammiossa säilytetään muun muassa vanha Jagellonin '
          + 'maapallo, jossa näkyy jo äskettäin löydetty Amerikka, sekä '
          + 'rehtorien kultaiset juhlasauvat. Ulkoseinän mekaaninen '
          + 'kello soittaa musiikkia viisi kertaa päivässä, kello 9, '
          + '11, 13, 15 ja 17.',
      kuvat: [
        {
          tiedosto: 'Collegium Maius 2017.jpg',
          selite: 'Collegium Maiuksen goottilainen kaarikäytäväpiha ylhäältä '
            + 'kuvattuna; punatiiliset seinät auringossa, pihalla '
            + 'kävijöitä kaivon ympärillä.',
          lahde: 'RR KRK, Wikimedia Commons (CC BY 3.0)',
        },
        {
          tiedosto: 'Courtyard of the Collegium Maius, Kraków, 2024, 14.jpg',
          selite: 'Pihan toinen kulma kirkkaassa auringonpaisteessa; '
            + 'näkyvissä ulkoportaikko ja pihan aurinkokello seinällä.',
          lahde: 'Chris Olszewski, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Klejnoty miasta Krakowa - dwadziescia cztery widokow w chromolitografiach podlug oryginalnych akwarel Juliusza Kossaka i Stanislawa Tondosa 1886-1887 (310292).jpg',
          selite: 'Värillinen kivipainoskuva (kromolitografia) vuodelta '
            + '1886–1887, jossa Collegium Maiuksen piha kaivoineen ja '
            + 'aikalaispukuisine hahmoineen.',
          lahde: 'Juliusz Kossak, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Mariankirkko: {
      aika: '1397',
      teksti: 'Mariankirkko on Krakovan tuomiokirkkoaukiolla seisova '
          + 'tiiligoottilainen kirkko. Sen perustukset ovat 1200-luvun '
          + 'alusta, mutta nykyinen mahtava runko valmistui vuoteen '
          + '1397 mennessä. Kirkolla on kaksi eripituista tornia - '
          + 'korkeampi torni sai kultaisen kruununsa vuonna 1666.'
        + '\n\n'
        + 'Joka tunti, yötä päivää, korkeamman tornin huipulta kaikuu '
          + 'trumpetisti, joka soittaa vanhan hälytysmelodian ja '
          + 'katkaisee sen aina yhtäkkiä kesken. Tarinan mukaan tapa '
          + 'muistuttaa keskiaikaisesta soittajasta, jonka vihollinen '
          + 'ampui kesken varoituksen. Keskipäivän soitto lähetetään '
          + 'radiossa ympäri koko Puolaa.'
        + '\n\n'
        + 'Kirkon sisällä on valtava puinen alttaritaulu, jonka '
          + 'kuvanveistäjä Veit Stoss veisti 1400-luvun lopulla - se on '
          + 'yksi maailman suurimmista goottilaisista puuveistoksista. '
          + 'Myöhemmin, 1880-luvun lopulla, taidemaalari Jan Matejko '
          + 'koristi kirkon seinät ja katon näyttävillä väreillä.',
      kuvat: [
        {
          tiedosto: 'St. Mary\'s church in Krakow (11787311126).jpg',
          selite: 'Näkymä Kaupungintalon tornista Mariankirkon '
            + 'kaksoistorneihin auringonlaskun kultaisessa valossa, '
            + 'kirkko osana koko kaupunkimaisemaa.',
          lahde: 'Pawel Pacholec, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Kościół parafialny p.w. Wniebowzięcia NMP (Mariacki), Kraków, Rynek Główny, A-3 01.jpg',
          selite: 'Mariankirkon molemmat tornit kuvattuna Kauppahallin '
            + '(Sukiennice) arkadikaaren läpi kultaisessa illan valossa.',
          lahde: 'Piotrekwas, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'The chancel of the altar by Veit Stoss - St. Mary\'s Basilica interior, it\'s nave is 28m. high (9157013989).jpg',
          selite: 'Mariankirkon sisätila: Veit Stossin puinen alttarikaappi '
            + 'sekä tähdillä koristeltu sininen holvikatto.',
          lahde: 'Jorge Láscar, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Wawelin linna': {
      aika: '1507–1536',
      teksti: 'Vistula-joen yllä kohoavalla kalkkikivikukkulalla '
          + 'sijaitseva Wawelin linna oli Puolan kuninkaiden koti ja '
          + 'kruunajaispaikka satojen vuosien ajan. Kuningas Kasimir '
          + 'Suuri rakennutti ensimmäisen kivilinnan 1300-luvulla, ja '
          + 'tulipalon jälkeen kuningas Sigismund I rakennutti sen '
          + 'uudelleen upeaksi renessanssilinnaksi vuosina 1507-1536.'
        + '\n\n'
        + 'Linnan tornissa riippuu Sigismund-kello, joka painaa lähes '
          + '13 tonnia ja jota soittamaan tarvitaan 12 miestä - sitä '
          + 'kumautetaan vain aivan erityisinä hetkinä. Aarrekammiossa '
          + 'säilytetään muun muassa Szczerbiec-nimistä '
          + 'kruunajaismiekkaa, ja linnan alla piilee tunnettu '
          + 'lohikäärmeen luola.'
        + '\n\n'
        + 'Linna on kokenut sekä loistoa että tuhoa: vuonna 1794 '
          + 'Preussi vei kruununjalokivet sulatettavaksi, ja myöhemmin '
          + 'Itävalta muutti linnan kasarmiksi. Vuodesta 1930 lähtien '
          + 'Wawel on ollut museo, ja nykyään se on yksi maailman '
          + 'suosituimmista taidemuseoista - vuonna 2025 siellä kävi '
          + 'yli 3,4 miljoonaa vierailijaa.',
      kuvat: [
        {
          tiedosto: 'Krakow - Wawel from Vistula - 4.jpg',
          selite: 'Leveä panoraama Wawelin linnasta Veikselin rannalta '
            + 'syksyisessä auringonpaisteessa; joella matkustajalaivoja '
            + 'ja syysvärisiä puita.',
          lahde: 'Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Arcaded Courtyard at Wawel Castle, Krakow.jpg',
          selite: 'Wawelin linnan renessanssiajan kaksikerroksinen kaaripiha, '
            + 'lähes tyhjänä ja rauhallisena.',
          lahde: 'Lloyd Tudor, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Klejnoty miasta Krakowa - dwadziescia cztery widokow w chromolitografiach podlug oryginalnych akwarel Juliusza Kossaka i Stanislawa Tondosa 1886-1887 (310446).jpg',
          selite: 'Värillinen kivipainoskuva vuodelta 1886–1887: Wawelin '
            + 'linna kukkulallaan muurien ja portin takana, edustalla '
            + 'kävelijöitä.',
          lahde: 'Juliusz Kossak, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Wawelin lohikäärme': {
      aika: '1972',
      teksti: 'Vanhan tarinan mukaan Wawelin kukkulan luolassa asui '
          + 'hirmuinen lohikäärme, joka vaati viikoittain karjaa '
          + 'ruoakseen - tai söi muuten ihmisiä. Vanhin kirjoitettu '
          + 'versio tarinasta on 1200-luvulta, piispa Kadłubekin '
          + 'kronikasta, jossa kuningas Krakuksen pojat viekoittelevat '
          + 'pedon syömään rikillä täytettyä eläimennahkaa.'
        + '\n\n'
        + 'Suosituimmassa, vuonna 1597 kirjoitetussa tarinassa '
          + 'sankarina on suutari nimeltä Skuba. Hän täyttää '
          + 'lampaannahan tulikivellä, lohikäärme syö sen ja janoaa '
          + 'niin kovasti, että se juo koko Vistula-joen kuiviin ja '
          + 'lopulta halkeaa.'
        + '\n\n'
        + 'Lohikäärmeen luola on yhä avoinna vierailijoille linnan '
          + 'alla, ja sen suulla seisoo pronssinen lohikäärmepatsas '
          + 'vuodelta 1972. Kuvanveistäjä Bronisław Chromyn tekemä '
          + 'patsas todella syöksee tulta suustaan muutaman minuutin '
          + 'välein kaasuliekin ansiosta! Tuomiokirkon seinällä roikkuu '
          + 'myös vanhoja luita, joita pidetään lohikäärmeen luina - '
          + 'tarinan mukaan maailma loppuu, jos ne joskus putoavat '
          + 'maahan.',
      lainaus: {
        teksti: 'Hänen luolansa näkyy yhä linnan alla. Sitä kutsutaan '
          + 'Lohikäärmeen luolaksi.',
        lahde: 'Marcin Bielski, Kronika Polska, 1597',
      },
      kuvat: [
        {
          tiedosto: 'Wawel Dragon monument. Krakow, Poland.jpg',
          selite: 'Wawelin lohikäärmepatsas kirkkaana päivänä Wawelin muurin '
            + 'edessä, taustalla linnan punatiilinen torni ja Puolan '
            + 'lippu.',
          lahde: 'Ввласенко, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Wawel Dragon statue (8476741820).jpg',
          selite: 'Lohikäärmepatsas iltahämärän lämpimässä valossa, taustalla '
            + 'punatiilinen muuri paljaiden puiden oksien takana.',
          lahde: 'Guillaume Speurt, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kazimierz: {
      aika: '1335',
      teksti: 'Vuonna 1335 kuningas Kasimir Suuri perusti Krakovan '
          + 'viereen aivan oman kaupungin ja nimesi sen itsensä mukaan '
          + 'Kazimierziksi. Sen keskusaukio Wolnica oli valtava, 195 x '
          + '195 metriä - lähes yhtä iso kuin Krakovan oma tori.'
        + '\n\n'
        + 'Vuonna 1495 juutalaiset asukkaat käskettiin muuttamaan '
          + 'pois Krakovan vanhastakaupungista Kazimierziin, ja '
          + 'alueesta kasvoi vuosisatojen kuluessa vilkas '
          + 'juutalaiskortteli lukuisine synagogineen. Vanha synagoga '
          + 'on Puolan vanhin yhä pystyssä seisova synagogarakennus.'
        + '\n\n'
        + 'Toisen maailmansodan aikana korttelin juutalaisväestöä '
          + 'kohtasi julma kohtalo, mutta nykyään Kazimierz on jälleen '
          + 'täynnä elämää: kahviloita, kirjakauppoja ja vuotuinen '
          + 'juutalaisen kulttuurin festivaali vuodesta 1988 lähtien. '
          + 'Alue tuli maailmankuuluksi myös, kun ohjaaja Steven '
          + 'Spielberg kuvasi täällä suuren osan elokuvastaan '
          + 'Schindlerin lista vuonna 1993.',
      kuvat: [
        {
          tiedosto: 'Nowy (New) square, Kazimierz, Krakow, Poland.jpg',
          selite: 'Plac Nowy, Kazimierzin sydän: pyöreä vanha kauppahalli '
            + '(okrąglak) aukion keskellä, aurinkoinen kesäpäivä ja '
            + 'ihmisiä kahviloiden edessä.',
          lahde: 'Zygmunt Put, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Old Synagogue, 24 Szeroka Street, Kazimierz, Kraków, Poland.jpg',
          selite: 'Vanha synagoga (Stara Synagoga) Szeroka-kadulla, edessä '
            + 'keskiaikaisen puolustusmuurin jäänne.',
          lahde: 'Jeremiah Z. Cockroach, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Kazimierz, cmentarz i synagoga Remuh (1930).jpg',
          selite: 'Vanha valokuva vuodelta 1930: Remuh-synagoga ja sen '
            + 'vieressä juutalainen hautausmaa hautakivineen puun '
            + 'katveessa.',
          lahde: 'Tuntematon (kustantaja Stowarzyszenie Bnej B\'rith), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  varsova: {
    'Vanhankaupungin tori': {
      aika: 'n. 1280-luku (jälleenrakennettu 1948–1953)',
      teksti: 'Vanhankaupungin tori syntyi jo 1200-luvun lopulla, samaan '
          + 'aikaan kun koko Varsova perustettiin. Se oli kaupungin '
          + 'sydän aina 1700-luvulle asti: torilla kokoontuivat '
          + 'kauppiaat ja ammattikuntien mestarit, ja keskellä seisoi '
          + 'raatihuone, joka rakennettiin jo ennen vuotta 1429.'
        + '\n\n'
        + 'Torin neljä sivua on nimetty 1700-luvun puolalaisten '
          + 'valtiomiesten mukaan, ja torin keskellä seisoo pronssinen '
          + 'Varsovan merenneito - kaupungin tunnuskuva, joka on '
          + 'vahtinut toria vuodesta 1855 lähtien.'
        + '\n\n'
        + 'Varsovan kansannousun jälkeen syksyllä 1944 saksalaiset '
          + 'joukot räjäyttivät koko torin maan tasalle. Se '
          + 'rakennettiin huolella uudelleen vuosina 1948–1953 '
          + 'täsmälleen entisen näköiseksi, ja vuonna 1980 se '
          + 'liitettiin Varsovan vanhankaupungin mukana Unescon '
          + 'maailmanperintöluetteloon.',
      kuvat: [
        {
          tiedosto: 'Rynek Starego Miasta w Warszawie 2024a.jpg',
          selite: 'Vanhankaupungin torin värikkäät porvaristalot aurinkoisena '
            + 'kesäpäivänä, kahvilaterasseja aukion laidalla.',
          lahde: 'Adrian Grycuk, Wikimedia Commons (CC BY 3.0 pl)',
        },
        {
          tiedosto: 'Poland-00764 - Old Town Market (30394077784).jpg',
          selite: 'Laaja näkymä torin ympäri kaartuvaan, moniväriseen '
            + 'talorivistöön ja mukulakivikatuun.',
          lahde: 'Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Pocztowka - Warszawa. Stare Miasto. 1901 (67321488).jpg',
          selite: 'Värisävytetty postikortti vuodelta 1901: vilkas torikauppa '
            + 'vaunuineen ja hevosineen Vanhankaupungin torilla.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Varsovan linna': {
      aika: '1971–1984 (alkuperäinen linna 1300-luvulta)',
      teksti: 'Varsovan linna on seisonut Wisła-joen rannalla jo '
          + '1300-luvulta lähtien, aluksi vaatimattomana Mazovian '
          + 'herttuoiden linnana. 1600-luvun alussa kuningas Zygmunt '
          + 'III Vaasa siirsi hovinsa Krakovasta Varsovaan ja '
          + 'rakennutti linnasta komean barokkilinnan, jota kruunaa 60 '
          + 'metriä korkea Sigismundin torni.'
        + '\n\n'
        + 'Linnan sisällä sijaitsee sali, jossa hyväksyttiin Euroopan '
          + 'ensimmäinen kirjoitettu perustuslaki vuonna 1791. '
          + 'Kuninkaallisissa asunnoissa riippuu maalauksia mestari '
          + 'Canaletolta, ja linnan kappelissa säilytetään jopa '
          + 'sotasankari Tadeusz Kościuszkon sydäntä.'
        + '\n\n'
        + 'Toinen maailmansota tuhosi linnan lähes kokonaan - ensin '
          + 'pommeissa syksyllä 1939, sitten saksalaisten joukkojen '
          + 'räjäyttäessä rauniot loppuun vuonna 1944. Linna '
          + 'rakennettiin uudelleen pikkutarkasti vuosina 1971–1984, ja '
          + 'nykyään sen taidemuseossa käy vuosittain yli 2 miljoonaa '
          + 'vierailijaa.',
      kuvat: [
        {
          tiedosto: 'Royal Castle in Warsaw 2020.jpg',
          selite: 'Varsovan linnan koko julkisivu Linnanaukion puolelta, '
            + 'dramaattiset tummat pilvet taustalla.',
          lahde: 'Adrian Grycuk, Wikimedia Commons (CC BY-SA 3.0 pl)',
        },
        {
          tiedosto: 'Royal Castle Warsaw Aerial Toni Klemm 2025 2500px.jpg',
          selite: 'Ilmakuva Varsovan linnasta ja sen puutarhoista '
            + 'Veiksel-joen rannalla.',
          lahde: 'Toniklemm, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Warszawa - Zamek krolewski. 1898-1906 (75185878).jpg',
          selite: 'Värisävytetty postikortti n. 1898-1906: Varsovan linna ja '
            + 'Sigismundin pylväs, hevosvaunuja ja raitiotiekiskot '
            + 'aukiolla.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kopernikuksen tiedekeskus': {
      aika: '2010–2011',
      teksti: 'Kopernikuksen tiedekeskus avasi ensimmäiset ovensa '
          + 'Wisła-joen rannalla marraskuussa 2010, ja vuotta myöhemmin '
          + 'valmistui myös pallomainen Taivaat-planetaario. '
          + 'Rakennuksen pinta-ala on huima 15 000 neliömetriä, ja '
          + 'katolla kasvaa jopa oma puutarha.'
        + '\n\n'
        + 'Sisällä on yli 450 kokeiltavaa laitetta kuudessa eri '
          + 'teemaosastossa - täältä löytyy niin robottiteatteri kuin '
          + 'Foucault\'n heiluri, joka todistaa konkreettisesti, että '
          + 'Maa pyörii akselinsa ympäri.'
        + '\n\n'
        + 'Tiedekeskus on Puolan suurin ja yksi Euroopan '
          + 'nykyaikaisimmista tiedekeskuksista. Se on ottanut vastaan '
          + 'jo yli 8 miljoonaa vierailijaa avaamisensa jälkeen, ja '
          + 'joka vuosi paikalla käy noin miljoona uutta '
          + 'kokeilunhaluista lasta ja aikuista.',
      kuvat: [
        {
          tiedosto: 'Centrum Nauki Kopernik 2018.jpg',
          selite: 'Kopernikuksen tiedekeskuksen moderni, ruosteenvärinen '
            + 'julkisivu aurinkoisena päivänä, sisäänkäynti näkyvissä.',
          lahde: 'Adrian Grycuk, Wikimedia Commons (CC BY-SA 3.0 pl)',
        },
        {
          tiedosto: 'Centrum Kopernik w Warszawie (1).JPG',
          selite: 'Läheltä otettu kuva rakennuksen mustasta kyltistä, jossa '
            + 'lukee \'Centrum Nauki Kopernik\'.',
          lahde: 'Darekm135, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pyhän ristin kirkko': {
      aika: '1679–1696',
      teksti: 'Pyhän ristin kirkko rakennettiin Krakowskie Przedmieście '
          + '-kadun varrelle vuosina 1679–1696 komeaan barokkityyliin, '
          + 'pääsuunnittelijanaan Józef Szymon Bellotti. Julkisivun '
          + 'koristeelliset huiput lisättiin vielä 1720- ja '
          + '1730-luvuilla.'
        + '\n\n'
        + 'Kirkon pilariin muurattiin vuonna 1882 pieni uurna, jossa '
          + 'säilytetään säveltäjä Fryderyk Chopinin sydäntä. Chopinin '
          + 'sisar oli salakuljettanut sydämen Pariisista Varsovaan jo '
          + 'vuonna 1849 veljensä toiveen mukaisesti - vaikka ruumis '
          + 'haudattiin Ranskaan, sydän sai levätä kotimaassa.'
        + '\n\n'
        + 'Sodan aikana vuonna 1944 saksalaiset joukot räjäyttivät '
          + 'kirkon pahoin, mutta Chopinin sydän ehdittiin siirtää '
          + 'turvaan ennen räjäytyksiä. Kirkko rakennettiin uudelleen '
          + 'vuosina 1945–1953, ja siitä lähtien sunnuntaimessuja on '
          + 'lähetetty Puolan radiossa - kuuntelijoita on joka viikko '
          + 'noin 5–6 miljoonaa.',
      lainaus: {
        teksti: 'Sillä missä sinun aarteesi on, siellä on myös sinun '
          + 'sydämesi.',
        lahde: 'Raamatun lause (Matt. 6:21), joka on kaiverrettu kirkon '
          + 'pilariin Chopinin sydämen kohdalle',
      },
      kuvat: [
        {
          tiedosto: 'Kościół Świętego Krzyża - panoramio.jpg',
          selite: 'Pyhän ristin kirkon barokkijulkisivu ja molemmat tornit '
            + 'aurinkoisella, pilvisellä taivaalla.',
          lahde: 'Mister No, Wikimedia Commons (CC BY 3.0)',
        },
        {
          tiedosto: 'Kościół św. Krzyża w Warszawie 1908.jpg',
          selite: 'Postikortti vuodelta 1908: Pyhän ristin kirkko Krakowskie '
            + 'Przedmieście -kadulta, ohikulkijoita ja hevosvaunu edessä.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Varsovan kansallismuseo': {
      aika: '1938 (perustettu 1862)',
      teksti: 'Varsovan kansallismuseo perustettiin jo vuonna 1862 '
          + 'taidemuseona, ja se sai nykyisen nimensä vuonna 1916. '
          + 'Nykyinen suuri rakennus Jerusalimin puistokadun varrella '
          + 'valmistui vasta vuonna 1938, arkkitehti Tadeusz Tolwińskin '
          + 'suunnittelemana.'
        + '\n\n'
        + 'Kokoelmiin kuuluu yli 830 000 esinettä muinaisajalta '
          + 'nykypäivään. Erikoisuutena on Euroopan suurin nubialaisen '
          + 'kristillisen taiteen kokoelma, joka on tuotu aikoinaan '
          + 'Sudanista. Museon seinillä riippuu myös Jan Matejkon '
          + 'jättimäinen maalaus Grunwaldin taistelu vuodelta 1878 - se '
          + 'on lähes 10 metriä leveä, yksi Puolan suurimmista '
          + 'tauluista.'
        + '\n\n'
        + 'Nykyään museossa käy vuosittain yli 1,5 miljoonaa '
          + 'vierailijaa, ja se kuuluu maailman käydyimpien '
          + 'taidemuseoiden joukkoon. 2010-luvun peruskorjauksen '
          + 'jälkeen sitä pidetään yhtenä Euroopan nykyaikaisimmista '
          + 'museoista, sillä esimerkiksi valaistus säätyy tietokoneen '
          + 'avulla.',
      kuvat: [
        {
          tiedosto: 'Muzeum Narodowe Warszawa 2010a.jpg',
          selite: 'Kansallismuseon symmetrinen pylväsjulkisivu ja suihkulähde '
            + 'edessä, kirkas sininen taivas.',
          lahde: 'Szczebrzeszynski, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Muzeum Narodowe w Warszawie - panoramio - Mister No.jpg',
          selite: 'Näkymä kansallismuseon sisäpihalta pylväikköön ja '
            + 'pääsisäänkäyntiin, aurinkoinen päivä.',
          lahde: 'Mister No, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kulttuuri- ja tiedepalatsi': {
      aika: '1952–1955',
      teksti: 'Kulttuuri- ja tiedepalatsi oli Neuvostoliiton lahja Puolan '
          + 'kansalle. Sopimus rakentamisesta allekirjoitettiin '
          + 'huhtikuussa 1952, ja jättiläismäinen pilvenpiirtäjä '
          + 'valmistui jo heinäkuussa 1955 - työmaalla ahersi tuhansia '
          + 'neuvostoliittolaisia ja puolalaisia rakentajia.'
        + '\n\n'
        + 'Rakennus on 237 metriä korkea, Puolan toiseksi korkein, ja '
          + 'siinä on peräti 3 288 huonetta 42 kerroksessa - '
          + 'teattereita, museoita, konserttisaleja ja jopa yliopisto. '
          + 'Näköalatasanteelta 30. kerroksesta, 114 metrin '
          + 'korkeudesta, näkee koko Varsovan.'
        + '\n\n'
        + 'Vuonna 2000 torniin asennettiin neljä valtavaa, yli 6 '
          + 'metriä leveää kellotaulua - hetken aikaa maailman suurin '
          + 'kellotorni. Rakennus jakaa yhä mielipiteitä '
          + 'neuvostomenneisyyden symbolina, mutta vuodesta 2007 se on '
          + 'ollut suojeltu kulttuurimuistomerkki.',
      lainaus: {
        teksti: 'Parhaan näköalan Varsovaan saa juuri tästä tornista - '
          + 'sieltä kun ei näy itse tornia.',
        lahde: 'tunnettu varsovalaisten vitsi rakennuksesta',
      },
      kuvat: [
        {
          tiedosto: '2017-05-27 Pałac Kultury i Nauki.jpg',
          selite: 'Kulttuuri- ja tiedepalatsin torni juurelta huippuun asti, '
            + 'puiden reunustamana kirkkaan sinistä taivasta vasten.',
          lahde: 'Maksym Kozlenko, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: '2025 Warszawa Pałac Kultury i Nauki z Placem Centralnym, 1.jpg',
          selite: 'Palatsi suoraan edestä pilvettömän tummansinisen taivaan '
            + 'alla, aukio ja moderni Varso-torni sivussa.',
          lahde: 'Cybularny, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: '2025 Warszawa widok z Varso na PKiN, 1.jpg',
          selite: 'Ilmakuva Varso-tornista: koko palatsi ja sitä ympäröivä '
            + 'Varsovan keskusta linnuperspektiivistä.',
          lahde: 'Cybularny, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  tallinna: {
    'Paksu Margareeta': {
      aika: '1511–1530',
      teksti: 'Paksu Margareeta on tanakka, pyöreä torni Tallinnan vanhan '
          + 'kaupungin laidalla, aivan sataman kupeessa Pika kadun '
          + 'päässä. Se rakennettiin vuosien 1511 ja 1530 välillä '
          + 'osaksi kaupungin meren puoleista puolustusta, Suuren '
          + 'Rantaportin kylkeen. Torni on niin järeä, että sen '
          + 'läpimitta on 25 metriä ja seinät jopa 5 metriä paksut - se '
          + 'on koko kaupunginmuurin tukevin yksittäinen rakennelma. '
          + 'Sillä oli kaksi tehtävää: torjua hyökkääjät ja tehdä '
          + 'samalla vaikutuksen merta pitkin saapuviin vieraisiin.'
        + '\n\n'
        + 'Vuosisatojen varrella torni sai monta erilaista '
          + 'käyttötarkoitusta. Ensin siellä säilytettiin ruutia ja '
          + 'aseita, myöhemmin siitä tehtiin vankila. Vuoden 1917 '
          + 'vallankumouksen aikaan tornissa tapahtui verisiä '
          + 'kohtauksia, kun vangittuja vartijoita surmattiin. '
          + '1920-luvulla tornia suunniteltiin jopa taiteilijoiden '
          + 'kodiksi, mutta lopulta vuosina 1978-1981 tehdyn '
          + 'perusteellisen kunnostuksen jälkeen siitä tuli museo.'
        + '\n\n'
        + 'Tänä päivänä Paksussa Margareetassa toimii Viron '
          + 'merimuseo, joka kertoo maan pitkästä merenkulun '
          + 'historiasta. Rakennuksessa on myös kahvila, josta avautuu '
          + 'näköala suoraan satamaan ja merelle.',
      kuvat: [
        {
          tiedosto: 'At Tallinn 2024 240 - Fat Margaret.jpg',
          selite: 'Paksu Margareetan pyöreä tykkitorni aurinkoisessa säässä, '
            + 'Oleviste kirkon torni siintää vasemmalla taustalla.',
          lahde: 'Mike Peel, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Suure rannavärava eesvärav, Paks Margareete, AM N06056.jpg',
          selite: 'Vanha mustavalkoinen valokuva Paksusta Margareetasta ja '
            + 'portista 1930-luvulta, polku ja niittykasvillisuutta '
            + 'edustalla.',
          lahde: 'Adolf Purve, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Paks Margareeta õhtul.jpg',
          selite: 'Paksu Margareeta valaistuna talvi-iltana, lumihanki '
            + 'edustalla.',
          lahde: 'HartOve, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Olevisten kirkko': {
      aika: '1267',
      teksti: 'Olevisten kirkko on nimetty Norjan kuningas Olavin mukaan, '
          + 'joka oli merenkulkijoiden suojeluspyhimys. Kirkosta on '
          + 'maininta jo vuodelta 1267, jolloin sen perustivat alueelle '
          + 'asettuneet skandinaaviset kauppiaat. Kirkon torni '
          + 'puolestaan mainitaan asiakirjoissa ensimmäisen kerran '
          + 'vuonna 1364, ja vuosisatojen kuluessa kirkkoa '
          + 'laajennettiin useaan otteeseen goottilaiseen tyyliin.'
        + '\n\n'
        + 'Torni on kokenut paljon: salamat ovat iskeneet siihen noin '
          + 'kymmenen kertaa, ja koko kirkko on palanut maan tasalle '
          + 'jopa kolme kertaa tunnetun historiansa aikana. Erään '
          + 'keskiaikaisen tarinan mukaan kirkon rakentaja kertoi '
          + 'tornin olevan 84 syltä korkea - jos hän tarkoitti '
          + 'Rein-joen seudun syltä, se tarkoittaisi lähes 159 metriä, '
          + 'mikä olisi tehnyt kirkosta oman aikansa korkeimman '
          + 'rakennuksen maailmassa. Monien remonttien jälkeen torni '
          + 'kohoaa nykyään 123,8 metrin korkeuteen, mikä tekee siitä '
          + 'yhä Viron korkeimman kirkkorakennuksen.'
        + '\n\n'
        + 'Kylmän sodan aikana, vuosina 1944-1991, Neuvostoliiton KGB '
          + 'käytti kirkon huippua vakoiluun ja radiolähetyksiin, sillä '
          + 'sieltä näki kauas yli kaupungin ja sataman. Toisen '
          + 'maailmansodan jälkeen kirkko siirtyi baptistien käyttöön, '
          + 'ja se toimii baptistikirkkona edelleen tänäkin päivänä.',
      kuvat: [
        {
          tiedosto: 'Vanalinn päikeseloojangul. Drooni vaade.jpg',
          selite: 'Droonikuva Tallinnan vanhastakaupungista auringonlaskussa, '
            + 'Olevisten kirkon torni kohoaa keskellä kultaisessa '
            + 'valossa.',
          lahde: 'Aleksandr Abrosimov, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'CarlUngerSternbergOleviste1818.png',
          selite: 'Vuonna 1818 tehty sepiasävyinen tussipiirros Olevisten '
            + 'kirkosta ja kaupunginmuurista, etualalla puita ja '
            + 'kävelijöitä.',
          lahde: 'Carl von Ungern-Sternberg, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Oleviste kirik.jpg',
          selite: 'Olevisten kirkon torni alhaalta kuvattuna sinistä taivasta '
            + 'ja dramaattisia pilviä vasten.',
          lahde: 'Naine, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Raatihuoneentori: {
      aika: '1402–1404',
      teksti: 'Tallinnan raatihuone on koko Itämeren alueen ja '
          + 'Pohjoismaiden vanhin säilynyt raatihuone. Se rakennettiin '
          + 'vain parissa vuodessa, vuosina 1402-1404, keskiaikaisen '
          + 'torin laidalle. Hansakaupunkina Tallinnan '
          + 'kaupunginhallitus piti täällä kokouksiaan ja päätti niin '
          + 'kaupan, oikeuden kuin arjenkin asioista. Rakennuksen 36,8 '
          + 'metriä pitkässä salissa on nähtävissä yli 500 vuotta '
          + 'vanhoja seinävaatteita, jotka kuvaavat kuningas Salomonin '
          + 'elämää.'
        + '\n\n'
        + 'Raatihuoneen 64 metriä korkeaan torniin johtaa peräti 115 '
          + 'porrasaskelmaa. Huipulla pyörii Vana Toomas, eli "Vanha '
          + 'Toomas" - kaupunginvartijaa esittävä tuuliviiri, joka on '
          + 'ollut Tallinnan tunnuskuva vuodesta 1530 lähtien. '
          + 'Alkuperäinen tuuliviiri on nykyään esillä raatihuoneen '
          + 'kellarissa, sillä sotavaurioiden vuoksi huipulle '
          + 'asennettiin uusi versio vasta vuonna 1996.'
        + '\n\n'
        + 'Raatihuone selvisi myös vuoden 1944 pommituksista, vaikka '
          + 'sen torni tuolloin syttyi palamaan - korjaustyöt saatiin '
          + 'valmiiksi vuoteen 1952 mennessä. Rakennuksen katolla ja '
          + 'seinillä komeilee lisäksi lohikäärmeenpäisiä vesikouruja, '
          + 'jotka ovat tuijottaneet torille jo vuosisatojen ajan.',
      kuvat: [
        {
          tiedosto: 'Tallinn - Town Hall Square (Raekoja plats).jpg',
          selite: 'Laaja panoraamanäkymä Raatihuoneentorista aurinkoisena '
            + 'päivänä, värikkäät kauppiaantalot ja muutamia ihmisiä '
            + 'torilla.',
          lahde: 'Marcin Szala (Pudelek), Wikimedia Commons (CC BY-SA 3.0 ee)',
        },
        {
          tiedosto: '1024 Reval Rathaus-8379.jpg',
          selite: 'Tallinnan raatihuoneen rakennus ja torni kokonaisuudessaan '
            + 'sinistä taivasta vasten, toriteltat näkyvät alareunassa.',
          lahde: 'Hedwig Storch, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Tallinna Raekoda, AM N05985.jpg',
          selite: 'Vanha mustavalkoinen valokuva Tallinnan raatihuoneesta '
            + '1930-luvulta, edustalla hevosvetoisia vuokra-ajoneuvoja '
            + 'jonossa.',
          lahde: 'Adolf Purve, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Nevskin katedraali': {
      aika: '1894–1900',
      teksti: 'Aleksanteri Nevskin katedraali kohoaa komeana Tallinnan '
          + 'linnamäellä Toompealla, ja se on kaupungin suurin '
          + 'kupolikirkko. Se rakennettiin vuosina 1894-1900 Venäjän '
          + 'keisarikunnan aikana arkkitehti Mihail Preobraženskin '
          + 'suunnitelmien mukaan ja vihittiin käyttöön vuonna 1900. '
          + 'Katedraalin viisi sipulikupolia kimaltavat kullatuin '
          + 'ristein, ja koko rakennuksen perustukset on tehty '
          + 'suomalaisesta graniitista.'
        + '\n\n'
        + 'Katedraalin sisällä on kolme kullattua puista '
          + 'ikonikuvastoa, joiden ikonit on maalattu kuparille ja '
          + 'sinkille. Tornissa soi yksitoista Pietarissa valettua '
          + 'kelloa - suurin niistä painaa noin 16 tonnia, enemmän kuin '
          + 'kaikki muut kymmenen kelloa yhteensä!'
        + '\n\n'
        + 'Katedraalin kohtalo ei ole aina ollut varma: 1920- ja '
          + '1930-luvuilla Viron viranomaiset harkitsivat vakavasti sen '
          + 'purkamista, ja arkkitehti Karl Burman ehdotti tilalle '
          + 'Viron itsenäisyyden muistorakennusta. Katedraali kuitenkin '
          + 'säästyi, ja Viron itsenäistyttyä uudelleen vuonna 1991 se '
          + 'kunnostettiin huolella entiseen loistoonsa.',
      kuvat: [
        {
          tiedosto: 'Aleksander Nevski katedraal.jpg',
          selite: 'Nevskin katedraali sipulikupoleineen kirkkaassa '
            + 'auringonpaisteessa Toompean torilta kuvattuna.',
          lahde: 'Tammerix, Wikimedia Commons (CC BY-SA 3.0 ee)',
        },
        {
          tiedosto: 'TLA 1465 1 6689 Aleksander Nevski katedraal, taamal Niguliste kirik, ning vaade üle linna merele 1900.jpg',
          selite: 'Vuodelta 1900 oleva mustavalkoinen ilmakuva '
            + 'vastavalmistuneesta Nevskin katedraalista, Niguliste '
            + 'kirkon torni ja meri taustalla.',
          lahde: 'Tuntematon, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Virun portti': {
      aika: '1446',
      teksti: 'Virun portin kaksi pyöreää, punakattoista tornia ovat yksi '
          + 'Tallinnan vanhan kaupungin tunnetuimmista näkymistä. Ne '
          + 'vartioivat yhä paikkaa, jossa Virun katu, Vana-Virun katu '
          + 'ja Vallin katu kohtaavat. Paikalla oli portti jo vuodesta '
          + '1345 lähtien, mutta nykyisin näkyvät tornit rakennettiin '
          + 'vuonna 1446, kun vanha porttirakennus purettiin ja tilalle '
          + 'nousi uusi kaksikerroksinen porttitalo hoikkine '
          + 'kulmatorneineen.'
        + '\n\n'
        + 'Portin nimi juontuu alueella sijainneista savikuopista - '
          + 'viroksi Savivärav, saksaksi Lehmporte. Aikanaan koko '
          + 'porttijärjestelmä oli paljon nykyistä laajempi, ja siihen '
          + 'kuului myös suuri neliskulmainen torni kauempana kadun '
          + 'varrella.'
        + '\n\n'
        + 'Vuonna 1888 suurin osa porttirakennuksista purettiin, kun '
          + 'kaupunkiin rakennettiin hevosraitiotietä - vain nämä kaksi '
          + 'pyöreää tornia säästyivät, koska niitä pidettiin erityisen '
          + 'arvokkaina. Torneja on sittemmin kunnostettu useaan '
          + 'otteeseen, muun muassa Moskovan olympialaisia varten '
          + 'vuonna 1980, ja nykyään ne on rekisteröity Tallinnan '
          + 'kaupungin omaksi tavaramerkiksi nimellä "Virun portti".',
      kuvat: [
        {
          tiedosto: 'Viru värav ja tornid.jpg',
          selite: 'Virun portin molemmat tornit sinistä taivasta vasten, '
            + 'ihmisiä kulkemassa portin läpi.',
          lahde: 'SofiRussia, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Viru tänav. Viru värav hoburaudtee ehitamise ajal 1888.a., AM 8612-1 F 11194.jpg',
          selite: 'Vuodelta 1888 oleva valokuva Virun portin torneista, '
            + 'kadulla näkyy hevosraitiotien rakennustöitä.',
          lahde: 'Charles Borchardt, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Matkustajasatama: {
      aika: '900-luku',
      teksti: 'Tallinnan Vanasatama eli matkustajasatama on yksi maailman '
          + 'vilkkaimmista matkustajasatamista. Tallinnan loistava '
          + 'sijainti meren äärellä on ollut tunnettu jo 900-luvulta '
          + 'lähtien, jolloin alueella kulki vilkasta kauppaa. Nykyisin '
          + 'satamassa on kaksi suurta matkustajaterminaalia, A- ja '
          + 'D-terminaalit, ja laitureita on yhteensä 4,2 kilometriä.'
        + '\n\n'
        + 'Parhaimmillaan, ennen koronapandemiaa, satamassa kävi '
          + 'vuosittain jopa 10,6 miljoonaa matkustajaa - vuonna 2023 '
          + 'luku oli 7,75 miljoonaa. Satamasta pääsee laivalla muun '
          + 'muassa Helsinkiin ja Tukholmaan, ja kesäisin rantaan '
          + 'kiinnittyy myös valtavia risteilyaluksia ympäri Eurooppaa.'
        + '\n\n'
        + 'Satama on ollut myös tekniikan edelläkävijä: syyskuussa '
          + '2017, EU:n digitaalihuippukokouksen aikaan, Tallinnan '
          + 'Vanasatamassa avattiin Euroopan ensimmäinen julkinen '
          + '5G-verkko.',
      kuvat: [
        {
          tiedosto: 'Old City Harbour, Tallinn.jpg',
          selite: 'Ilmakuva Tallinnan matkustajasatamasta, risteilyaluksia '
            + 'laitureissa ja sininen meri auringonpaisteessa.',
          lahde: 'Tallinna Sadam / Port of Tallinn, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'TLA 1465 1 1954 Reval. Hafen und Zollamt M. Lewinthal postkaart.jpg',
          selite: 'Vanha käsin väritetty postikortti Tallinnan (Revalin) '
            + 'satamasta ja tulliasemasta purjelaivoineen, Olevisten '
            + 'kirkon torni taustalla.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  sofia: {
    Mineraalikylpylä: {
      aika: '1908–1913',
      teksti: 'Keskellä Sofiaa seisoo kaunis rakennus, jonka julkisivua '
          + 'koristavat värikkäät keraamiset laatat. Se on kylpylä, '
          + 'joka rakennettiin lämpimien mineraalilähteiden päälle – '
          + 'samalle paikalle, jossa kaupunkilaiset olivat kylpeneet jo '
          + 'satoja vuosia aiemmin. Jo 1500-luvulla ohikulkeva '
          + 'matkustaja kirjoitti nähneensä siellä kupolikattoisia '
          + 'kylpyhuoneita ja marmoria.'
        + '\n\n'
        + 'Nykyinen rakennus suunniteltiin vuosina 1904–1905, ja '
          + 'siinä yhdistyvät wieniläinen secessio-tyyli sekä '
          + 'bysanttilaiset ja ortodoksiset koristeaiheet. Runko '
          + 'valmistui vuonna 1908, mutta koko kylpylä avattiin vasta '
          + 'toukokuussa 1913. Toisessa maailmansodassa pommi '
          + 'vaurioitti rakennuksen pohjoissiipeä, mutta se korjattiin '
          + 'sodan jälkeen.'
        + '\n\n'
        + 'Kylpylä palveli sofialaisia aina vuoteen 1986 asti, '
          + 'jolloin katto uhkasi romahtaa ja talo suljettiin. '
          + 'Vuosikymmenten kunnostustöiden jälkeen rakennus sai uuden '
          + 'elämän: syyskuussa 2015 siihen avattiin Sofian '
          + 'historiallinen museo, joka kertoo kaupungin vaiheista '
          + 'antiikin ajoista nykypäivään.',
      kuvat: [
        {
          tiedosto: 'CentralMineralBath-Sofia-8a 3.jpg',
          selite: 'Keskustan mineraalikylpylän pääjulkisivu ja '
            + 'kupolikattoinen sisäänkäynti kirkkaassa '
            + 'auringonpaisteessa, syvänsininen taivas taustalla.',
          lahde: 'MrPanyGoff, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Sofia Mineralni bani.JPG',
          selite: 'Mineraalikylpylän rakennus kokonaisuudessaan edestä, '
            + 'edessä suihkuava vesiallas ja puutarha.',
          lahde: 'Kamburov, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pyhän Yrjön rotunda': {
      aika: '300-luku',
      teksti: 'Sofian keskustassa, hotellin ja presidentinlinnan '
          + 'välisellä pihalla, seisoo pyöreä punatiilinen rakennus. Se '
          + 'on kaupungin vanhin yhä pystyssä oleva rakennus: rotunda '
          + 'pystytettiin jo 300-luvun alussa, alun perin roomalaisen '
          + 'kylpylän kupolikattoiseksi saliksi – kauan ennen kuin '
          + 'siitä tuli kirkko.'
        + '\n\n'
        + 'Kupoli kohoaa lähes 14 metrin korkeuteen, ja sisäseinillä '
          + 'on peräti viisi eri aikakauden freskokerrosta päällekkäin. '
          + 'Vaikuttavin niistä on peräisin 900-luvulta, Bulgarian niin '
          + 'sanotulta kultakaudelta: maalauksissa on 22 yli '
          + 'kaksimetristä profeettaa ja enkeli, jonka kasvot on '
          + 'maalattu niin taidokkaasti, että ne ovat innoittaneet '
          + 'taiteilijoita vuosisatojen ajan.'
        + '\n\n'
        + '1500-luvulla osmanit muuttivat kirkon moskeijaksi, ja '
          + 'vanhat freskot peitettiin islamilaisilla koristekuvioilla. '
          + 'Ne paljastuivat uudelleen vasta 1900-luvulla tehdyissä '
          + 'kunnostustöissä. Tarinan mukaan kirkossa säilytettiin myös '
          + 'Bulgarian suojeluspyhimyksen, Rilan Johanneksen, '
          + 'pyhäinjäännöksiä, jotka unkarilaiset joukot veivät '
          + 'mukanaan vuonna 1183 ja palauttivat vuonna 1187.',
      kuvat: [
        {
          tiedosto: 'StGeorgeRotundaSofia.JPG',
          selite: 'Pyhän Yrjön pyöreä tiilikirkko aurinkoisena päivänä, '
            + 'taustalla Bulgarian pääministerin kanslian rakennus.',
          lahde: 'Preslav (Wikimedia Commons -käyttäjä), Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'St. George church, Sofia (P1070786).jpg',
          selite: 'Läheltä kuvattu Pyhän Yrjön rotunda, tiilipintaa ja pyöreä '
            + 'kattokupoli selvästi esillä.',
          lahde: 'Matti Blume, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sofian katedraali': {
      aika: '1882–1924',
      teksti: 'Sofian kukkulalla kohoaa valtava kultakupolinen '
          + 'katedraali, joka näkyy kauas yli kattojen. Se rakennettiin '
          + 'kiitokseksi venäläisille sotilaille, jotka kaatuivat '
          + 'taistellessaan Bulgarian vapauttamiseksi osmanien vallasta '
          + 'vuosien 1877–1878 sodassa. Peruskivi muurattiin vuonna '
          + '1882, mutta varsinainen rakentaminen valmistui vasta 1912, '
          + 'ja katedraali vihittiin käyttöön vuonna 1924.'
        + '\n\n'
        + 'Rakennus on valtavan kokoinen: se on yli 73 metriä pitkä, '
          + 'ja sisään mahtuu jopa 5000 ihmistä kerralla. '
          + 'Kultapäällysteinen keskuskupoli kohoaa 45 metrin '
          + 'korkeuteen. Tornissa soi 12 kellon sarja, joista painavin '
          + 'painaa 12 tonnia ja kevyin vain 10 kiloa – suunnilleen '
          + 'yhtä paljon kuin keskikokoinen koira!'
        + '\n\n'
        + 'Sisällä seiniä koristavat italialainen marmori, '
          + 'brasilialainen onyksi ja Venetsiasta tuodut mosaiikit, ja '
          + 'keskuskupolin ympärille on kirjoitettu Isä meidän -rukous '
          + 'ohuin kultakirjaimin. Pitkään katedraalia pidettiin '
          + 'maailman suurimpana valmiina ortodoksikirkkona – vasta '
          + 'vuonna 2000 se menetti tämän ennätyksen.',
      kuvat: [
        {
          tiedosto: 'Alexander Nevsky Cathedral, Sofia (by Pudelek).JPG',
          selite: 'Aleksanteri Nevskin katedraali viistosti edestä '
            + 'kultaisessa ilta-auringossa, kulta- ja vihreäkupolit '
            + 'hohtavat sinistä taivasta vasten.',
          lahde: 'Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'AlexanderNevskyCathedral-Sofia-6.jpg',
          selite: 'Katedraali toisesta kulmasta, kellotorni ja kultakupolit '
            + 'näkyvät selvästi lämpimässä valossa.',
          lahde: 'Plamen Agov, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'BASA-237K-1-351-95-Alexander Nevsky Cathedral, Sofia.jpg',
          selite: 'Vanha sepiansävyinen valokuva Aleksanteri Nevskin '
            + 'katedraalista puiden keskellä, ihmishahmo '
            + 'puistokäytävällä.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sofian yliopisto': {
      aika: '1888',
      teksti: 'Bulgarian vanhin yliopisto aloitti toimintansa 1. '
          + 'lokakuuta vuonna 1888 – vain kymmenen vuotta sen jälkeen, '
          + 'kun maa oli vapautunut osmanien vallasta. Aluksi kyse oli '
          + 'vaatimattomasta yhden vuoden opettajankoulutuskurssista, '
          + 'jossa oli seitsemän opettajaa ja 43 oppilasta.'
        + '\n\n'
        + 'Koulu kasvoi nopeasti, ja vuonna 1904 siitä tuli '
          + 'virallisesti yliopisto. Ensimmäiset 16 naisopiskelijaa '
          + 'kirjoittautuivat sisään jo vuonna 1901 – poikkeuksellisen '
          + 'aikaisin moneen muuhun maahan verrattuna. Yliopiston komea '
          + 'päärakennus valmistui vasta vuosina 1924–1934, ja sen '
          + 'rakentamisen maksoivat kauppiasveljekset Evlogi ja Hristo '
          + 'Georgiev.'
        + '\n\n'
        + 'Nykyään rakennuksessa on peräti 324 huonetta ja yli 18 000 '
          + 'neliömetriä tilaa, ja yliopistossa opiskelee yli 21 000 '
          + 'opiskelijaa. Sen kunniaksi on nimetty jopa vuoristo '
          + 'Etelämantereella, kun yliopisto täytti 100 vuotta vuonna '
          + '1988.',
      lainaus: {
        teksti: 'Ipsa scientia potestas est',
        lahde: 'Sofian yliopiston tunnuslause ("Tieto itsessään on '
          + 'valtaa")',
      },
      kuvat: [
        {
          tiedosto: 'Sofia University panorama 2.jpg',
          selite: 'Sofian yliopiston päärakennus edestä, symmetrinen '
            + 'julkisivu ja vihreät kupolit kirkasta sinistä taivasta '
            + 'vasten.',
          lahde: 'MrPanyGoff, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Sof.University~1935.jpg',
          selite: 'Vanha mustavalkoinen postikorttikuva Sofian yliopiston '
            + 'juhlasalirakennuksesta 1930-luvulta, edessä puistokäytävä '
            + 'ja penkkejä.',
          lahde: 'Tuntematon (postikortti n. 1934), Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Borisovan puutarha': {
      aika: '1884',
      teksti: 'Sofian vanhin ja tunnetuin puisto sai alkunsa vuonna 1884, '
          + 'kun sveitsiläinen puutarhuri Daniel Neff alkoi suunnitella '
          + 'sitä kaupungin laidalle. Puisto on valtava, yli kolme '
          + 'neliökilometriä, ja täynnä puukujia, lampia ja '
          + 'urheilukenttiä.'
        + '\n\n'
        + '1900-luvun alussa puistoa laajensi puutarhuri Joseph Frei, '
          + 'joka istutti pitkät lehmus- ja kastanjakujat ja perusti '
          + 'ruusutarhan. 1930-luvulla ruusutarha kasvoi entisestään '
          + '7000 neliömetrin kokoiseksi, ja puistoon rakennettiin '
          + 'japanilainen kolkka, jonka kasvit olivat lahja Japanin '
          + 'edustajalta vuonna 1940.'
        + '\n\n'
        + 'Puisto on nimetty ruhtinas, myöhemmin tsaari, Boris III:n '
          + 'mukaan, mutta kommunismin aikana sitä kutsuttiin Vapauden '
          + 'puistoksi. Nimi vaihtui takaisin alkuperäiseksi, kun '
          + 'kommunismin aika päättyi. Vuonna 1986 puisto julistettiin '
          + 'Bulgarian puutarhataiteen muistomerkiksi, ja sen laidalla '
          + 'kohoaa yhä 1950-luvun lopulla valmistunut televisiotorni.',
      kuvat: [
        {
          tiedosto: 'Borisova-garden-lily-lake.JPG',
          selite: 'Borisovan puiston lampi ja suihkulähde aurinkoisena '
            + 'kesäpäivänä, penkillä istuvia ihmisiä etualalla.',
          lahde: 'Vassia Atanassova - Spiritia, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Borisova gradina autumn.jpg',
          selite: 'Syksyinen puistokäytävä Borisovan puutarhassa aamuauringon '
            + 'valaisemana, penkillä istuva pariskunta ja keltaisia '
            + 'lehtiä.',
          lahde: 'Gergana (Urbanstyle), Wikimedia Commons (CC BY-SA 2.5)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kansalliskulttuuripalatsi: {
      aika: '1978–1981',
      teksti: 'Sofian suurin kulttuurikeskus rakennettiin nopeasti, '
          + 'vuosina 1978–1981, ja se avattiin 31. maaliskuuta 1981 '
          + 'juuri silloin, kun Bulgaria juhli 1300-vuotista '
          + 'taivaltaan. Rakennus on jättimäinen: siinä on 123 000 '
          + 'neliömetriä tilaa, kahdeksan kerrosta maan päällä ja kolme '
          + 'kerrosta maan alla.'
        + '\n\n'
        + 'Suurimpaan saliin mahtuu peräti 3 380 katsojaa kerralla. '
          + 'Rakennuksen sisällä ja ulkopuolella on yli 80 taideteosta '
          + '– seinämaalauksia, mosaiikkeja ja veistoksia – jotka '
          + 'tunnetut bulgarialaiset taiteilijat loivat.'
        + '\n\n'
        + 'Idean koko palatsista antoi kommunistijohtaja Todor '
          + 'Živkovin tytär Ljudmila Živkova, joka halusi Sofialle '
          + 'näyttävän kulttuurin kodin. Vuonna 2005 rakennus '
          + 'palkittiin maailman parhaana kongressikeskuksena.',
      kuvat: [
        {
          tiedosto: 'The National Palace of Culture, Sofia, 2012 - 004.jpg',
          selite: 'Kansalliskulttuuripalatsi edestä päivänvalossa, edessä '
            + 'heijastava allas ja suihkulähde, taustalla vuoret.',
          lahde: 'Peter Kirkov, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'National Palace of Culture (23997858848).jpg',
          selite: 'Ilmakuva kulttuuripalatsista auringonlaskun aikaan, edessä '
            + 'valaistu suihkulähdekäytävä ja vuoret taustalla.',
          lahde: 'Deensel, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'National Palace of Culture, Sofia 1.jpg',
          selite: 'Kulttuuripalatsi hämärässä valaistuna, edessä valaistut '
            + 'suihkulähteet ja sinipunertava iltataivas.',
          lahde: 'Ivano Giambattista, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  bukarest: {
    'Romanian ateneum': {
      aika: '1888',
      teksti: 'Romanian ateneum on pyöreä, kupolikattoinen konserttitalo '
          + 'Bukarestin sydämessä. Idea rakennuksesta syntyi jo vuonna '
          + '1865, kun joukko sivistyneitä romanialaisia perusti '
          + 'kulttuuriseuran. Rahaa rakennukseen kerättiin tavallisilta '
          + 'ihmisiltä tunnuslauseella "Anna yksi leu Ateneumille!", ja '
          + 'rakennus vihittiin käyttöön vuonna 1888, vaikka '
          + 'viimeistelytyöt jatkuivat vielä vuoteen 1897 asti.'
        + '\n\n'
        + 'Sisällä konserttisalissa on 794 istumapaikkaa, ja katon '
          + 'alla kiertää valtava freskomaalaus, 75 metriä pitkä ja 3 '
          + 'metriä korkea. Maalari Costin Petrescu kuvasi siihen koko '
          + 'Romanian historian aina roomalaisten valloituksista '
          + '1900-luvun alun suureen yhdistymiseen asti.'
        + '\n\n'
        + 'Joulukuussa vuonna 1919 rakennuksessa tehtiin tärkeä '
          + 'päätös, kun eri alueiden edustajat äänestivät Romanian '
          + 'yhdistymisestä. Vuonna 1992 Ateneum oli lähellä sortua, '
          + 'mutta se pelastettiin mittavalla korjauksella. Nykyään '
          + 'rakennus on Bukarestin filharmonikkojen koti ja yksi '
          + 'kaupungin ylpeyden aiheista.',
      lainaus: {
        teksti: 'Anna yksi leu Ateneumille!',
        lahde: 'Ateneumin rakennuskeräyksen tunnuslause 1880-luvulta',
      },
      kuvat: [
        {
          tiedosto: '2017 Romanian Athenaeum.jpg',
          selite: 'Romanian ateneum kevätaamun valossa kukkapenkin takaa '
            + 'kuvattuna, pylväikkö ja kupoli kokonaan näkyvissä.',
          lahde: 'Babu, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Ateneul roman in lumina apusului de soare.jpg',
          selite: 'Romanian ateneum auringonlaskun kultaisessa valossa, '
            + 'sisäänkäynti valaistuna ja ihmisiä edustalla.',
          lahde: 'Korinna, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Bukarest. Atheneum LOC ppmsca.52717.jpg',
          selite: 'Väritetty photochrom-valokuva Romanian ateneumista ja sen '
            + 'edustan puistokäytävästä noin vuodelta 1890-1900, mies '
            + 'kävelemässä käytävällä.',
          lahde: 'Miscellaneous Items in High Demand, PPOC, Library of Congress, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Cișmigiun puutarha': {
      aika: '1847',
      teksti: 'Cișmigiun puutarha on Bukarestin vanhin ja suurin '
          + 'keskustan puisto. Se avattiin yleisölle syyskuussa vuonna '
          + '1847 paikalla, jossa oli aiemmin ollut kalastuslampi '
          + 'nimeltä Dura. Saksalainen puutarhasuunnittelija Carl Meyer '
          + 'suunnitteli puiston järven ympärille, ja puisto on '
          + 'kooltaan lähes 15 hehtaaria.'
        + '\n\n'
        + 'Meyer toi puistoon puita ympäri Eurooppaa ja rakensi '
          + 'mutkittelevia polkuja ja pieniä kanavia. Puistoon saatiin '
          + 'sähkövalot jo vuonna 1882, mikä oli tuohon aikaan '
          + 'harvinaista. Puiston järvellä ui edelleen mustia joutsenia '
          + 'ja sinisorsia.'
        + '\n\n'
        + 'Puistossa on myös Kirjailijoiden rotunda, jonka ympärillä '
          + 'on kaksitoista kivistä rintakuvaa kuuluisista '
          + 'romanialaisista kirjailijoista. Puisto on innostanut monia '
          + 'kirjailijoita, ja se mainitaan muun muassa brittiläisen '
          + 'Olivia Manningin romaanissa.',
      kuvat: [
        {
          tiedosto: 'Lake Cișmigiu.jpg',
          selite: 'Cișmigiun puutarhan lampi syksyisessä auringonpaisteessa, '
            + 'suihkulähde vedessä ja vanha ravintolalaituri rannalla '
            + 'puiden keskellä.',
          lahde: 'Turgidson, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Cismigiu 01.jpg',
          selite: 'Cișmigiun puutarha keväällä, keltaisena kukkiva pensas '
            + 'edustalla ja ihmisiä kävelemässä lammen rantareitillä.',
          lahde: 'Calinos, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Yliopiston aukio': {
      aika: '1857',
      teksti: 'Yliopiston aukio syntyi vuonna 1857 samaan aikaan kun '
          + 'Bukarestin yliopisto perustettiin. Aukio sijaitsee '
          + 'keskellä kaupunkia metroaseman vieressä. Paikka on ollut '
          + 'tärkeä risteyskohta jo satoja vuosia, sillä jo '
          + '1400-luvulla siitä kulki kaupungin raja.'
        + '\n\n'
        + 'Aukiolla seisoo neljä patsasta tärkeistä romanialaisista '
          + 'henkilöistä: hallitsija Mihai Rohkean patsas pystytettiin '
          + 'vuonna 1874, runoilija Ion Heliade Rădulescun vuonna 1879, '
          + 'opettaja Gheorghe Lazărin vuonna 1889 ja tiedemies Spiru '
          + 'Haretin vuonna 1932. Vieressä kohoaa myös '
          + 'Intercontinental-hotelli, yksi Bukarestin korkeimmista '
          + 'rakennuksista.'
        + '\n\n'
        + 'Vuonna 1990 aukiolla järjestettiin rauhanomainen '
          + 'opiskelijamielenosoitus, joka muuttui väkivaltaiseksi, kun '
          + 'paikalle lähetettiin kaivostyöläisiä palauttamaan '
          + 'järjestystä. Aukio on edelleen suosittu kokoontumispaikka, '
          + 'siellä on järjestetty jopa katukoripallon MM-kisoja.',
      kuvat: [
        {
          tiedosto: 'Bucharest University Square.jpg',
          selite: 'Ilmakuva Yliopiston aukiosta ja Bulevardul Regina '
            + 'Elisabetasta ympäröivine rakennuksineen kirkkaassa '
            + 'päivänvalossa.',
          lahde: 'Madalin Pentelie, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Szathmari - Universitatea.jpg',
          selite: 'Carol Szathmarin valokuva Bukarestin '
            + 'yliopistorakennuksesta vuodelta 1864, kuvattu läheisen '
            + 'katon yli.',
          lahde: 'Carol Szathmari, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Stavropoleoksen kirkko': {
      aika: '1724',
      teksti: 'Stavropoleoksen kirkko on pieni mutta kaunis '
          + 'luostarikirkko Bukarestin vanhassa keskustassa. '
          + 'Kreikkalainen munkki Ioannikios Stratonikeas rakennutti '
          + 'sen vuonna 1724 ruhtinas Nicholas Mavrocordatoksen aikana. '
          + 'Nimi tulee kreikan sanoista "Stavropolis", joka tarkoittaa '
          + '"Ristin kaupunkia".'
        + '\n\n'
        + 'Kirkon arkkitehtuuri edustaa niin sanottua '
          + 'brâncoveanu-tyyliä, jossa on koristeellisia kiviveistoksia '
          + 'ja kaiverruksia. Luostarin kirjastossa on yli 8000 kirjaa '
          + 'teologiasta, taiteesta ja historiasta, ja siellä '
          + 'säilytetään myös yli 80 vanhaa käsikirjoitusta.'
        + '\n\n'
        + 'Luostarissa on Romanian suurin bysanttilaisen '
          + 'kirkkomusiikin kokoelma, ja vuonna 1994 perustettu kuoro '
          + 'laulaa yhä vanhoja psalmisävelmiä. Kirkko on tänäkin '
          + 'päivänä nunnaluostari keskellä vilkasta kaupunkia.',
      kuvat: [
        {
          tiedosto: 'Bucharest - Stavropoleos Church (28540586792).jpg',
          selite: 'Stavropoleoksen kirkko iltapäivän auringossa, koristeltu '
            + 'julkisivu ja pylväskäytävä kokonaan näkyvissä sinistä '
            + 'taivasta vasten.',
          lahde: 'Ștefan Jurcă, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Stavropoleos Preziosi.jpg',
          selite: 'Amedeo Preziosin 1800-luvun maalaus Stavropoleoksen '
            + 'kirkosta, edustalla ajan asuihin pukeutuneita ihmisiä ja '
            + 'hevonen.',
          lahde: 'Amedeo Preziosi, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Vanha ruhtinaanhovi': {
      aika: '1459',
      teksti: 'Vanha ruhtinaanhovi eli Curtea Veche oli aikoinaan '
          + 'Valakian ruhtinaiden linna Bukarestin keskustassa. Se '
          + 'rakennettiin vuonna 1459, ja seuraavien vuosisatojen '
          + 'aikana monet hallitsijat laajensivat ja kaunistivat sitä. '
          + 'Muun muassa ruhtinas Constantin Brâncoveanu lisäsi linnaan '
          + 'komean marmoriportaikon.'
        + '\n\n'
        + 'Linna sijaitsi lähellä jokea, ja sen ympärille kasvoi '
          + 'kauppiaiden ja käsityöläisten kortteli, joka teki paikasta '
          + 'koko kaupungin taloudellisen keskuksen. Vuonna 1775 '
          + 'ruhtinaat muuttivat uuteen palatsiin, ja vanha hovi '
          + 'jätettiin rappeutumaan, kunnes se lopulta myytiin '
          + 'huutokaupalla vuonna 1798.'
        + '\n\n'
        + 'Nykyään paikalla on vain raunioita: vanhoja kivimuureja ja '
          + 'holvikaaria, joita arkeologit ovat kaivaneet esiin '
          + '1950-luvulta lähtien. Rauniot ovat nykyään avoin '
          + 'ulkomuseo, ja vieressä seisoo yhä vuonna 1559 rakennettu '
          + 'pieni kirkko, Bukarestin vanhin alkuperäisasussaan '
          + 'säilynyt kirkkorakennus.',
      kuvat: [
        {
          tiedosto: 'Curtea Domnească din Bucureşti - panoramio.jpg',
          selite: 'Vanhan ruhtinaanhovin tiiliraunioita ja pylväs kirkkaan '
            + 'sinistä taivasta vasten, valkoisia kukan terälehtiä '
            + 'maassa.',
          lahde: 'Валерий Дед, Wikimedia Commons (CC BY 3.0)',
        },
        {
          tiedosto: 'Curtea Veche (3).jpg',
          selite: 'Ruhtinaanhovin maanalainen holvikäytävä, tiiliholvit '
            + 'jatkuvat käytävän perspektiivissä kohti valaistua seinää.',
          lahde: 'Leontin l, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Parlamenttipalatsi: {
      aika: '1984–1997',
      teksti: 'Parlamenttipalatsi on yksi maailman valtavimmista '
          + 'rakennuksista. Sen rakennutti Romanian diktaattori Nicolae '
          + 'Ceaușescu, joka halusi näyttävän hallintorakennuksen. '
          + 'Rakennustyöt alkoivat vuonna 1984, ja niiden piti kestää '
          + 'vain kaksi vuotta, mutta todellisuudessa rakentaminen '
          + 'kesti 13 vuotta ja valmistui vasta vuonna 1997.'
        + '\n\n'
        + 'Rakennusta varten purettiin kokonainen vanha kaupunginosa, '
          + 'ja noin 40 000 ihmistä joutui muuttamaan pois kodeistaan. '
          + 'Palatsissa on 1100 huonetta, ja se ulottuu 92 metriä maan '
          + 'alle, jonne rakennettiin jopa ydinpommisuoja 1,5 metriä '
          + 'paksuine betoniseinineen. Työmaalla saattoi olla samaan '
          + 'aikaan jopa 100 000 työntekijää kolmessa vuorossa.'
        + '\n\n'
        + 'Palatsi on maailman raskain rakennus, se painaa arviolta '
          + 'lähes 2 miljoonaa tonnia, ja myös maailman kallein '
          + 'hallintorakennus. Sisällä on 480 kristallikruunua, ja '
          + 'rakentamiseen käytettiin miljoona kuutiometriä marmoria. '
          + 'Nykyään rakennuksessa istuu Romanian parlamentti.',
      kuvat: [
        {
          tiedosto: 'Palatul Parlamentului 1.jpg',
          selite: 'Parlamenttipalatsi auringonlaskun värjäämänä, kuvattuna '
            + 'ilmasta kaupungin kattojen yli.',
          lahde: 'Mihai Petre, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Palace București 23 BG.jpg',
          selite: 'Parlamenttipalatsin koko julkisivu edestä kuvattuna, '
            + 'taustalla sininen taivas ja valkoisia pilviä.',
          lahde: 'Bingar1234, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Antipan museo': {
      aika: '1908',
      teksti: 'Antipan museo on Bukarestin suuri luonnontieteellinen '
          + 'museo. Sen juuret ulottuvat vuoteen 1834, mutta nykyinen '
          + 'komea rakennus valmistui vuonna 1908, ja kuningas Carol I '
          + 'avasi sen juhlallisesti. Museo sai nykyisen nimensä vuonna '
          + '1933 tutkija Grigore Antipan mukaan, joka johti museota '
          + 'peräti 51 vuotta.'
        + '\n\n'
        + 'Museon kokoelmissa on yli 2 miljoonaa näytettä eläimistä, '
          + 'kasveista ja kivistä. Erikoisuutena on maailman ainoa '
          + 'täydellinen luuranko sukupuuttoon kuolleesta jättimäisestä '
          + 'Deinotherium-norsueläimestä. Museossa on myös oma huone '
          + 'täynnä värikkäitä perhosia.'
        + '\n\n'
        + 'Vuonna 2011 museo remontoitiin perusteellisesti 14 '
          + 'miljoonalla dollarilla, ja se avattiin uudelleen '
          + 'nykyaikaisena näyttelytilana. Antipan museota pidetään '
          + 'yhtenä maailman arvostetuimmista ja parhaiten '
          + 'järjestetyistä luonnontieteellisistä museoista.',
      kuvat: [
        {
          tiedosto: '2023 - National Museum of Natural History "Grigore Antipa" - IMG 01.jpg',
          selite: 'Antipan luonnontieteellinen museo kirkkaassa '
            + 'päivänvalossa, edustalla kirahvipatsas ja puita.',
          lahde: 'Chainwit., Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Belle Époque photo of the Antipa Museum in Victory Square of Bucharest, Romania.jpg',
          selite: 'Väritetty postikortti museosta noin 1900-luvun alusta, '
            + 'jolloin sitä kutsuttiin nimellä "Muzeul Zoologic".',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  sarajevo: {
    'Sarajevon katedraali': {
      aika: '1884–1889',
      teksti: 'Sarajevon suurin katolinen kirkko, Pyhän Sydämen '
          + 'katedraali, kohoaa kahdella tornillaan keskustan '
          + 'sydämessä. Rakennustyöt alkoivat vuonna 1884, ja kirkko '
          + 'vihittiin käyttöön jo viiden vuoden kuluttua, vuonna 1889. '
          + 'Arkkitehti Josip Vancaš otti mallia kaukaisesta Ranskan '
          + 'Dijonista, Notre-Damen kirkosta, ja niin Sarajevoon syntyi '
          + 'oma pieni sisarrakennus sille.'
        + '\n\n'
        + 'Katedraalin kaksi tornia kohoavat yli 43 metrin '
          + 'korkeuteen, ja koko rakennus on lähes 42 metriä pitkä. Sen '
          + 'suippokaariset ikkunat ja pyöreät tornit ovat niin '
          + 'tunnettuja, että ne on kuvattu Sarajevon kaupungin '
          + 'vaakunassa ja koko kantonin lipussa — katedraali on siis '
          + 'virallisesti osa kaupungin tunnusta.'
        + '\n\n'
        + '1990-luvun alussa Sarajevoa piiritettiin lähes neljän '
          + 'vuoden ajan, ja pommitukset vaurioittivat katedraaliakin. '
          + 'Sodan jälkeen kirkko korjattiin, ja se seisoo yhä ylpeänä '
          + 'keskustassa muistuttamassa kaupungin pitkästä historiasta.',
      kuvat: [
        {
          tiedosto: 'Bosnia Church.jpg',
          selite: 'Katedraalin koko julkisivu kultaisessa iltavalossa, '
            + 'molemmat tornit ja ruusuikkuna kokonaan näkyvissä.',
          lahde: 'Talha Çakır, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Sarajevo Catholic Church 1900.jpg',
          selite: 'Vanha puupiirros katedraalista ja sen edustalla '
            + 'kävelevistä ihmisistä 1800-luvun lopun asuissa, koko '
            + 'kaupunkinäkymä taustalla.',
          lahde: 'Rudolf Bernt, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Gazi Husrev-begin moskeija': {
      aika: '1530–1531',
      teksti: 'Baščaršijan sydämessä seisoo Sarajevon suurin ja kaunein '
          + 'moskeija, joka on nimetty rakennuttajansa Gazi '
          + 'Husrev-begin mukaan. Se valmistui vuosina 1530–1531 '
          + 'persialaista sukua olleen arkkitehdin suunnitelmien '
          + 'mukaan. Moskeijan pääkupoli kohoaa 26 metrin korkeuteen ja '
          + 'on läpimitaltaan 13 metriä — kupoleita on rakennuksessa '
          + 'kaikkiaan yhdeksän, ja vieressä kurottaa taivasta kohti 47 '
          + 'metriä korkea minareetti.'
        + '\n\n'
        + 'Moskeijaan mahtuu rukoilemaan noin 1500 ihmistä, joista '
          + '500 sen pihamaalle. Se oli myös tekniikan edelläkävijä: '
          + 'vuonna 1898 siitä tuli maailman ensimmäinen moskeija, '
          + 'johon asennettiin sähkövalot.'
        + '\n\n'
        + '1990-luvun sodassa moskeijaa pommitettiin tahallaan, ja se '
          + 'kärsi pahoja vaurioita. Se kunnostettiin ulkomaisella '
          + 'avulla, ja uudet, taidokkaasti maalatut sisäkoristelut '
          + 'valmistuivat 2000-luvun alussa. Moskeija on yhä käytössä '
          + 'ja yksi Sarajevon vilkkaimmista rukouspaikoista.',
      kuvat: [
        {
          tiedosto: 'GaziHusrev-begMosqueSarajevo.JPG',
          selite: 'Gazi Husrev-begin moskeijan kupoli ja pylväsholvein '
            + 'katettu eteisaula kirkkaassa päivänvalossa, puita '
            + 'ympärillä.',
          lahde: 'CeeGee, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Sarajevo Begova Mosque 1900.jpg',
          selite: 'Vanha kaiverrus moskeijasta minareetteineen ja edustan '
            + 'puisine suihkukaivoineen, ihmisiä pihalla.',
          lahde: 'Rudolf Bernt, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Baščaršija: {
      aika: '1462',
      teksti: 'Baščaršija on Sarajevon vanha kauppatori, joka syntyi '
          + 'vuonna 1462, kun Isa-bey Ishaković perusti alueelle '
          + 'majatalon ja ensimmäiset kaupat. Vuosisatojen varrella '
          + 'torista kasvoi valtava käsityöläisten ja kauppiaiden kylä '
          + 'keskellä kaupunkia — parhaimmillaan siellä oli jopa noin '
          + '12 000 pientä puotia ja verstasta.'
        + '\n\n'
        + 'Jokaisella kadulla tehtiin omaa käsityötä: yhdellä lyötiin '
          + 'kuparia, toisella ommeltiin satuloita, kolmannella '
          + 'valmistettiin kenkiä. Baščaršijalla seisovat myös '
          + 'Sarajevon kuuluisa kellotorni, moskeijoita, vanha '
          + 'ortodoksikirkko ja jopa kaksi vanhaa synagogaa — se oli '
          + 'monen uskonnon ja kansan yhteinen kauppapaikka.'
        + '\n\n'
        + 'Baščaršija on kokenut paljon: maanjäristyksen '
          + '1640-luvulla, tulipaloja ja jopa täydellisen tuhon, kun '
          + 'sotapäällikkö Eugen Savoyalainen poltti sen vuonna 1697. '
          + 'Joka kerta se rakennettiin uudelleen, ja toisen '
          + 'maailmansodan jälkeen sitä oltiin purkamassa '
          + 'uudenaikaisten talojen tieltä — onneksi suunnitelma '
          + 'peruttiin, ja vanha tori säilyi meidän päiviimme asti.',
      lainaus: {
        teksti: 'Tässä čaršijassa on kaikkiaan tuhatkahdeksankymmentä '
          + 'puotia, jotka ovat kauneuden perikuva.',
        lahde: 'Evliya Çelebi, 1600-luvun ottomaanimatkailija',
      },
      kuvat: [
        {
          tiedosto: 'Early Morning in Bascarsija (54564806901).jpg',
          selite: 'Baščaršijan tori aamuvalossa: Sebilj-puukaivo, moskeijan '
            + 'minareetti taustalla ja lentäviä kyyhkysiä.',
          lahde: 'Jocelyn Erskine-Kellie, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Kazandziluk.jpg',
          selite: 'Kazandžilukin kuja Baščaršijassa: kupariseppien puoteja '
            + 'vieri vieressä, pöydillä taottuja tarjottimia, kahvipannuja '
            + 'ja kuparimaljoja.',
          lahde: 'Francisco Antunes, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Sarajevo carsija, 1892.jpg',
          selite: 'Aito valokuva vuodelta 1892: kauppakatu puukojuineen ja '
            + 'minareetteineen, lapsia poseeraamassa kadulla.',
          lahde: 'Tuntematon (Itävallan kansalliskirjasto), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Vijećnica: {
      aika: '1892–1896',
      teksti: 'Vijećnica on Sarajevon komea kaupungintalo, jonka '
          + 'tšekkiläinen arkkitehti Karel Pařík suunnitteli '
          + 'maurilaistyyliin — se muistuttaa enemmän Espanjan ja '
          + 'Pohjois-Afrikan islamilaista arkkitehtuuria kuin '
          + 'tavallista eurooppalaista virastotaloa. Rakennus valmistui '
          + 'vuosina 1892–1894 ja avattiin juhlallisesti vuonna 1896.'
        + '\n\n'
        + 'Vuonna 1949 rakennuksesta tehtiin kansallis- ja '
          + 'yliopistokirjasto, jonka hyllyillä oli parhaimmillaan 1,5 '
          + 'miljoonaa kirjaa. Elokuussa 1992, Sarajevon piirityksen '
          + 'aikana, rakennus tuhoutui pommituksessa lähes kokonaan, ja '
          + 'liekit veivät mukanaan satoja ainutlaatuisia vanhoja '
          + 'käsikirjoituksia.'
        + '\n\n'
        + 'Vijećnica rakennettiin uudelleen vuosina 1996–2013, ja se '
          + 'avattiin jälleen yleisölle vuonna 2014. Nykyään siellä '
          + 'toimivat Sarajevon pormestari ja kaupunginvaltuusto. Juuri '
          + 'tässä rakennuksessa arkkiherttua Franz Ferdinand ehti '
          + 'pitää vastaanoton kesäkuun 28. päivänä 1914 — vain hetkeä '
          + 'ennen kuin hänet ammuttiin lähellä Latinalaissiltaa.',
      kuvat: [
        {
          tiedosto: 'Sarajevo - Gradska Vijećnica (49127275993).jpg',
          selite: 'Vijećnican raidallinen maurilaistyylinen julkisivu joen '
            + 'rannalla kultaisessa valossa, silta ja heijastus vedessä.',
          lahde: 'Fred Romero, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Sarajevo - Gradska Vijećnica (49099920123).jpg',
          selite: 'Lähikuva Vijećnican koristeellisista holvikaarista ja '
            + 'parvekkeesta, liput liehumassa edustalla.',
          lahde: 'Fred Romero, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Image from page 89 of "Durch Bosnien und die Herzegovina kreuz und quer; Wanderungen" (1897) (14594946789).jpg',
          selite: 'Vanha kaiverrus Vijećnicasta pian sen valmistumisen '
            + 'jälkeen, katukuva ihmisineen rakennuksen edustalla.',
          lahde: 'Internet Archive Book Images (teoksesta Durch Bosnien und die Herzegovina kreuz und quer, 1897), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Latinalaissilta: {
      aika: '1798–1799',
      teksti: 'Latinalaissilta on yksi Sarajevon vanhimmista silloista, '
          + 'ja sen tarina ulottuu 1500-luvulle asti. Ensimmäinen silta '
          + 'paikalla oli puinen, nahkuri Husseinin rakentama vuonna '
          + '1541. Pian sen tilalle nousi kivisilta, jonka teetti '
          + 'arvostettu sarajevolainen Ali Ajni-Beg vuonna 1565.'
        + '\n\n'
        + 'Marraskuussa 1791 valtava tulva vaurioitti siltaa pahasti, '
          + 'ja se jouduttiin rakentamaan lähes kokonaan uudelleen. '
          + 'Jälleenrakennuksen maksoi kauppias Abdulah-aga Briga, ja '
          + 'nykyinen silta on pääosin vuosilta 1798–1799. Silta lepää '
          + 'neljän kivikaaren ja kolmen pilarin varassa, ja pilarien '
          + 'yläpuolella on pyöreitä keventäviä aukkoja — nämä '
          + 'tunnusomaiset "silmät" näkyvät jopa Sarajevon vanhassa '
          + 'kaupunginvaakunassa.'
        + '\n\n'
        + 'Silta on kantanut montaa nimeä. Jugoslavian aikana sitä '
          + 'kutsuttiin Principin sillaksi, koska sen pohjoispäässä '
          + 'tapahtui kesäkuussa 1914 yksi historian '
          + 'käänteentekevimmistä laukauksista, kun arkkiherttua Franz '
          + 'Ferdinand ammuttiin. Sodan jälkeen silta sai takaisin '
          + 'vanhan nimensä, ja se seisoo yhä paikallaan — yksi '
          + 'harvoista rakennuksista, jotka ovat nähneet koko Sarajevon '
          + 'vaiherikkaan historian.',
      kuvat: [
        {
          tiedosto: 'Miljacka and the Latin bridge (55018397907).jpg',
          selite: 'Latinalaissilta ja Miljacka-joki kultaisessa illanvalossa, '
            + 'taustalla kukkulalla siintää Keltainen linnake.',
          lahde: 'Filip Maljković, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Latin Bridge in Sarajevo.jpg',
          selite: 'Latinalaissilta kokonaisuudessaan Miljackan yli: neljä '
            + 'kivikaarta ja pilarien päällä pyöreät aukot, takana rinteille '
            + 'noussut kaupunki ja minareetti.',
          lahde: 'Tumi-1983, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Friedrich Alois Schönn - An der lateinischen Brücke in Sarajewo - 171 - Österreichische Galerie Belvedere.jpg',
          selite: '1800-luvun maalaus Latinalaissillasta ja sen lähellä '
            + 'käytävästä torikaupasta hevosineen ja kauppiaineen '
            + 'perinneasuissa.',
          lahde: 'Alois Schönn, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Keltainen linnake': {
      aika: '1727–1739',
      teksti: 'Keltainen linnake eli Žuta tabija kohoaa jyrkällä '
          + 'kalliolla Vratnikin vanhan kaupunginosan laidalla, '
          + 'korkealla Sarajevon yllä. Sen rakennutti Ahmed-pasha '
          + 'Rustempašić Skopljak vuosina 1727–1739 keltaisesta '
          + 'hiekkakivestä — juuri kiven väristä linnake on saanut '
          + 'nimensäkin.'
        + '\n\n'
        + 'Linnake oli yksi viidestä tykkilinnoituksesta, jotka '
          + 'rakennettiin Vratnikin ympärille sen jälkeen, kun '
          + 'sotapäällikkö Eugen Savoyalainen oli polttanut Sarajevon '
          + 'vuonna 1697. Linnaketta käytettiin puolustukseen vielä '
          + 'vuonna 1878, kun Itävalta-Unkarin joukot hyökkäsivät '
          + 'kaupunkiin.'
        + '\n\n'
        + 'Vuosisatojen aikana Keltainen linnake vaurioitui ja '
          + 'korjattiin useaan otteeseen, viimeksi vuonna 1998. Nykyään '
          + 'sen muurien päältä avautuu yksi Sarajevon parhaista '
          + 'näköaloista — koko vanha kaupunki punaisine kattoineen ja '
          + 'minareetteineen näkyy sieltä kuin kartalta.',
      kuvat: [
        {
          tiedosto: 'Zuta tabija.jpg',
          selite: 'Keltaisen linnakkeen puolikaarinen kivimuuri, jonka päällä '
            + 'seisoo ihmisiä katselemassa maisemaa iltavalossa.',
          lahde: 'Damien Smith, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  kiova: {
    'Kontraktovan aukio': {
      aika: '1817',
      teksti: 'Podilin kaupunginosassa Kiovassa on ollut vilkas '
          + 'kauppapaikka jo Kiovan-Venäjän ajoista lähtien, mutta '
          + 'Kontraktovan aukio sai nykyisen nimensä vasta vuonna 1817, '
          + 'kun sille valmistui Kontraktitalo eli sopimustalo. '
          + 'Taustalla oli vuosi 1798, jolloin Venäjän keisari Paavali '
          + 'I päätti siirtää suuret vuotuiset kauppamessut Dubnon '
          + 'kaupungista Kiovaan – ja pian aukiosta tuli koko seudun '
          + 'vilkkain kauppapaikka.'
        + '\n\n'
        + '1820-luvulla aukiolla vaihtoi omistajaa niin viljasäkkejä '
          + 'kuin kokonaisia kartanoitakin, ja kauppiaat sopivat '
          + 'messuilla myös palvelusväen palkkaamisesta. Iltaisin '
          + 'aukiolla pidettiin balleja, konsertteja ja '
          + 'teatteriesityksiä. Aukion vanhin rakennus on '
          + 'Samson-suihkulähde vuosilta 1748–1749: arkkitehti Ivan '
          + 'Hryhorovytš-Barski suunnitteli sen korjaamaan kaupungin '
          + 'vesijohtoja, ja se toi podilaisille juomavettä vielä '
          + 'pitkään sen jälkeen.'
        + '\n\n'
        + 'Aukio on vaihtanut nimeä moneen kertaan – se on ollut sekä '
          + 'Aleksanterin aukio että Punainen aukio – mutta vuodesta '
          + '1990 se on taas kantanut nimeä Kontraktova. Nykyään aukion '
          + 'alla kulkee metro, ja kesäisin siellä järjestetään '
          + 'konsertteja ja katufestivaaleja.',
      kuvat: [
        {
          tiedosto: 'Contracts House (Kiev).jpg',
          selite: 'Kontraktova-aukion klassistinen Kontraktovyi-talo '
            + '(kauppahuone) pylväikköineen kirkkaassa iltapäivävalossa.',
          lahde: 'Sergiy Klymenko, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Academy on Kontraktova square Kyiv.jpg',
          selite: 'Vanha valokuva Kiovan mohylan akatemian rakennuksesta '
            + 'Kontraktova-aukiolla 1900-luvun alussa, hevoskärryjä ja '
            + 'ohikulkijoita kadulla.',
          lahde: 'A. Mikulin, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Andreaksen kirkko': {
      aika: '1747–1754',
      teksti: 'Andreaksen kirkko kohoaa jyrkällä mäellä Kiovan Podilin '
          + 'yläpuolella, ja sen taustalla on vanha legenda. Tarinan '
          + 'mukaan apostoli Andreas nousi tälle samalle kukkulalle jo '
          + 'lähes kaksituhatta vuotta sitten, pystytti sinne ristin ja '
          + 'ennusti paikalle nousevan suuren kaupungin, jossa olisi '
          + 'paljon kirkkoja. Juuri tähän pyhäksi uskottuun paikkaan '
          + 'rakennettiin vuosina 1747–1754 kirkko, joka on saanut '
          + 'nimensä apostolin käynnin muistoksi.'
        + '\n\n'
        + 'Kirkon suunnitteli italialainen arkkitehti Bartolomeo '
          + 'Rastrelli, joka piirsi myös komeita palatseja Pietariin, '
          + 'ja rakennustyötä valvoi paikan päällä Ivan Mitšurin. '
          + 'Kirkko seisoo 15 metriä korkealla kivijalustalla, minkä '
          + 'ansiosta se näyttää melkein leijuvan katujen yläpuolella. '
          + 'Rakennus itse on 31,7 metriä pitkä, 20,4 metriä leveä ja '
          + 'kohoaa 50 metrin korkeuteen, yhden kupolin ja viiden '
          + 'hoikan tornin koristamana.'
        + '\n\n'
        + 'Sisällä ikonostaasin kultauksiin käytettiin peräti 1 028 '
          + 'kultalevyä, ja koko sisustus valmistui vasta vuonna 1767 – '
          + 'kolmisenkymmentä vuotta rakennustöiden alkamisen jälkeen. '
          + '2010-luvulla kirkko peruskorjattiin perustuksia myöten, '
          + 'jotta se pysyisi tukevasti pystyssä jyrkällä rinteellään '
          + 'myös tulevaisuudessa.',
      lainaus: {
        teksti: 'Näettekö nämä kukkulat? Niille loistaa Jumalan armo, ja '
          + 'tälle paikalle nousee suuri kaupunki, jossa on paljon '
          + 'kirkkoja.',
        lahde: 'Nestorin kronikka (Menneiden vuosien tarina), legenda '
          + 'apostoli Andreaksesta',
      },
      kuvat: [
        {
          tiedosto: 'Андріївська церква, липень 2020 року.jpg',
          selite: 'Andreaksen kirkon sinivalkoinen barokkijulkisivu '
            + 'portaineen kesäisenä päivänä, taustalla kirkas sininen '
            + 'taivas.',
          lahde: 'Sergei bar, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'St. Andrew\'s Church, Kiev.jpg',
          selite: 'Varhainen valokuva vuodelta 1852: näkymä Andreaksen '
            + 'mäenalaiselta kadulta ylös kukkulalla kohoavaan Andreaksen '
            + 'kirkkoon.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pyhän Mikaelin luostari': {
      aika: '1108–1113',
      teksti: 'Pyhän Mikaelin kultakupolinen luostari perustettiin '
          + 'Kiovan-Venäjän ruhtinas Svjatopolk II:n toimesta vuosina '
          + '1108–1113 arkkienkeli Mikaelin kunniaksi. Sen pääkirkon '
          + 'kupoli kullattiin ehkä ensimmäisenä koko Kiovan-Venäjällä, '
          + 'ja juuri siitä koko luostari sai lempinimensä '
          + '”kultakupolinen”. Vuonna 1108 luostariin tuotiin myös '
          + 'Konstantinopolista pyhän Barbaran pyhäinjäännökset, ja '
          + 'niistä tuli niin suosittu pyhiinvaellusaarre, että '
          + '1870-luvulla luostarissa kävi vuosittain jopa 100 000 '
          + 'vierailijaa.'
        + '\n\n'
        + '1700-luvulla kirkkoa laajennettiin ukrainalaiseen '
          + 'barokkityyliin, ja alkuperäisestä yhdestä kupolista tuli '
          + 'lopulta seitsemän kupolin kokonaisuus. Sisäseiniltä löytyi '
          + 'myös upeita 1100-luvun bysanttilaisia mosaiikkeja, jotka '
          + 'olivat vuosisatoja piilossa kalkkimaalin alla, kunnes '
          + 'taidehistorioitsija Adrian Prahov löysi ja restauroi ne '
          + '1880-luvulla.'
        + '\n\n'
        + '1930-luvulla neuvostoviranomaiset purkivat koko luostarin '
          + 'uuden hallintokeskuksen tieltä: kultakupolit purettiin '
          + 'keväällä 1935 ja itse kirkkorakennus räjäytettiin '
          + 'elokuussa 1937, joskin arvokkaimmat mosaiikit ehdittiin '
          + 'ensin siirtää talteen museoihin. Ukrainan itsenäistyttyä '
          + 'luostari rakennettiin kokonaan uudelleen vanhojen '
          + 'piirustusten avulla ja avattiin juhlallisesti uudestaan '
          + 'vuonna 1999. Kaivauksissa löytyi yli 300 hautaa, ja uuteen '
          + '48 metriä korkeaan kellotorniin asennettiin 12 kelloa, '
          + 'joita ohjaa nykyään tietokone – ainutlaatuinen laitteisto '
          + 'koko Ukrainassa.',
      kuvat: [
        {
          tiedosto: 'St. Michael\'s Golden-Domed Monastery. Kiev, Ukraine, Eastern Europe-2.jpg',
          selite: 'Pyhän Mikaelin kultakupolisen luostarin sinivalkoinen '
            + 'katedraali alhaalta kuvattuna, kultaiset kupolit kirkasta '
            + 'taivasta vasten.',
          lahde: 'Mstyslav Chernov, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Ukraine St Michael Cathedral Postcard 1.jpg',
          selite: 'Vanha postikortti 1890-1905-luvuilta: luostarin kellotorni '
            + 'ja kupolit sepiavärein kuvattuina.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Saint Michael\'s Square 2025-06-30 02.jpg',
          selite: 'Laaja näkymä koko luostarikompleksista tyhjältä aukiolta '
            + 'kesäisenä päivänä, komeat pilvet taustalla.',
          lahde: 'Lklundin, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pyhän Sofian katedraali': {
      aika: '1037',
      teksti: 'Pyhän Sofian katedraali on Kiovan vanhin säilynyt '
          + 'suurkirkko. Ruhtinas Jaroslav Viisas rakennutti sen '
          + 'ilmeisesti vuonna 1037 samalle kentälle, jolla hänen '
          + 'joukkonsa olivat vuotta aiemmin voittaneet aroilta '
          + 'hyökänneet petšenegit. Kirkko oli 1000-luvulla yksi '
          + 'Euroopan suurimmista rakennuksista: sen keskiosa on neliö, '
          + 'jonka sivu on 30 metriä – täsmälleen sama mitta kuin '
          + 'Konstantinopolin Hagia Sofian pääkupolin alla olevalla '
          + 'neliöllä. Alun perin katedraalia peitti peräti 13 kupolia.'
        + '\n\n'
        + 'Kirkon seinillä on Euroopan parhaiten säilynyt 1000-luvun '
          + 'mosaiikki- ja freskokokoelma: mosaiikkeja on 260 '
          + 'neliömetriä ja freskoja peräti 3 000 neliömetriä. '
          + 'Kahdeksan taitavaa käsityöläistä latoi kultataustaiset '
          + 'mosaiikit niin näppärästi, ettei niiden sävyjä ole '
          + 'onnistuttu jäljittämään nykyaikanakaan. Seinistä on '
          + 'löydetty myös yli 7 000 keskiaikaista naarmutettua '
          + 'piirrosta ja kirjoitusta sekä ainoa tunnettu kuva '
          + 'urkusoittimesta koko Kiovan-Venäjän taiteessa.'
        + '\n\n'
        + 'Jaroslav perusti kirkkoon myös Kiovan-Venäjän ensimmäisen '
          + 'kirjaston, jossa oli yli tuhat kirjaa, ja legenda kertoo, '
          + 'että sen arvokkaimmat aarteet piilotettiin kerran '
          + 'salaiseen maanalaiseen käytävään – jota ei ole koskaan '
          + 'löydetty. Kirkon 76-metrinen kellotorni valmistui vuonna '
          + '1699 hetmani Ivan Mazepan kustannuksella, ja siinä riippuu '
          + '13 tonnia painava, vuonna 1705 valettu Mazepa-kello. '
          + 'Katedraali on ollut Unescon maailmanperintökohde vuodesta '
          + '1990.',
      kuvat: [
        {
          tiedosto: '80-391-9014 Kyiv Sofia 2 RB 24.jpg',
          selite: 'Sofian katedraali lumisena talvipäivänä kirkkaassa '
            + 'auringonpaisteessa, paljaiden puiden kehystämänä.',
          lahde: 'Rbrechko, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'St. Sophia Cathedral, Kiev, Russia, (i.e., Ukraine)-LCCN2001697426.jpg',
          selite: 'Värillinen photochrom-kuva 1890-1900-luvuilta: Sofian '
            + 'katedraalin kellotorni ja Bogdan Hmelnytskyin '
            + 'ratsastajapatsas aukiolla.',
          lahde: 'Photochrom Print Collection, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Kyiv-Saint Sophia Cathedral-east view.jpg',
          selite: 'Sofian katedraalin itäsivu läheltä kuvattuna, vihreät '
            + 'kupolit ja kullatut ristit erottuvat pilvisellä taivaalla.',
          lahde: 'Galvm, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Itsenäisyyden aukio': {
      aika: '2001',
      teksti: 'Kiovan keskustan suurin aukio ei ole aina näyttänyt '
          + 'nykyiseltä eikä kantanut nykyistä nimeään. Vielä '
          + '1700-luvulla paikalla oli matala suoalue, jota kutsuttiin '
          + 'leikkisästi ”Vuohensuoksi”, ja lähellä sijaitsi yksi '
          + 'keskiaikaisen Kiovan kolmesta pääportista, Ljadskin portti '
          + '– se tuhoutui mongolien hyökätessä kaupunkiin vuonna 1240. '
          + 'Vasta 1830-luvulla alueelle alettiin rakentaa puutaloja ja '
          + '1850-luvulla jo kivitaloja, kun Kiovasta kasvoi '
          + 'teollistumisen myötä yksi Venäjän keisarikunnan '
          + 'suurimmista kaupungeista.'
        + '\n\n'
        + 'Aukio on vaihtanut nimeä moneen kertaan vuosikymmenten '
          + 'varrella. Vuodesta 1991 se on kantanut nimeä Itsenäisyyden '
          + 'aukio eli Maidan Nezalezhnosti – sana ”maidan” juontuu '
          + 'persian kielen sanasta, joka tarkoittaa toria tai '
          + 'kokoontumispaikkaa. Vuosina 1976–1977 aukion alle '
          + 'rakennettiin metroasema, ja samalla paikalle valmistui '
          + 'myös suihkulähteitä ja avaria kävelyalueita.'
        + '\n\n'
        + 'Aukion tunnetuin nähtävyys on 61 metriä korkea '
          + 'Itsenäisyyspatsas, joka pystytettiin vuonna 2001. Sen '
          + 'huipulla seisoo kultainen Berehynia, ukrainalaisen '
          + 'tarinaperinteen suojelijatar-jumalatar, kultainen '
          + 'marjaoksa kädessään. Aukiolla ja sen tuntumassa on myös '
          + 'patsaita Kiovan tarunhohtoisille perustajille – '
          + 'veljeksille Kyi, Štšek ja Horyv sekä heidän sisarelleen '
          + 'Lybidille – samoin kuin kasakka Mamaylle ja kaupungin '
          + 'suojeluspyhälle, arkkienkeli Mikaelille.',
      kuvat: [
        {
          tiedosto: '2005-08-15 Maidan Nezalezhnosti Kiev 261.JPG',
          selite: 'Itsenäisyyden aukio iltahämärässä valaistuna: '
            + 'Riippumattomuuspatsaan pylväs, lasikupu ja hotelli Ukraina '
            + 'taustalla.',
          lahde: 'Norbert Aepli, Wikimedia Commons (CC BY 3.0)',
        },
        {
          tiedosto: 'Modern fountain on the Independence square (8162296734).jpg',
          selite: 'Aukion moderni voikukka-aiheinen suihkulähde päiväsaikaan, '
            + 'taustalla pylväikköinen rakennus.',
          lahde: 'Guillaume Speurt, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kiovan kultainen portti': {
      aika: '1017–1024',
      teksti: 'Ruhtinas Jaroslav Viisas rakennutti Kiovan kultaisen '
          + 'portin vuosina 1017–1024 kaupungin muurien '
          + 'pääsisäänkäynniksi. Portti sai nimensä ja mallinsa '
          + 'Konstantinopolin kuuluisasta Kultaisesta portista, ja se '
          + 'toimi lähes 500 vuoden ajan sekä puolustusrakenteena että '
          + 'voitokkaana riemuporttina, josta ruhtinaat ratsastivat '
          + 'kaupunkiin. Läpikulkuaukko oli noin 12 metriä korkea ja 6 '
          + 'metriä leveä, ja sen päälle rakennettiin pieni kirkko '
          + 'suojelemaan kaupunkia taivaallisin voimin.'
        + '\n\n'
        + 'Vuonna 1240 Batu-kaanin mongolijoukot valloittivat Kiovan '
          + 'ja vaurioittivat porttia pahoin. Seuraavien vuosisatojen '
          + 'aikana rakennus rapistui hiljalleen lähes raunioksi: '
          + '1970-luvulle tultaessa maan päällä oli enää näkyvissä '
          + 'kaksi muurinpätkää, toinen noin 24 metrin ja toinen 13 '
          + 'metrin pituinen. Puolalaisen kuningas Boleslaw I:n '
          + 'kerrotaan legendan mukaan lyöneen miekallaan porttia '
          + 'vuonna 1018 – kuuluisassa Jan Matejkon maalauksessa nähty '
          + 'tarina, jota historioitsijat eivät kuitenkaan pidä '
          + 'todellisena tapahtumana.'
        + '\n\n'
        + 'Kiova juhli 1500-vuotispäiväänsä vuonna 1982, ja samalla '
          + 'viranomaiset rakennuttivat kultaisen portin kokonaan '
          + 'uudelleen jäljellä olleiden muurinpätkien ympärille. Koska '
          + 'mistään ei ole säilynyt yhtään aitoa kuvaa alkuperäisestä '
          + 'portista, arkkitehdit joutuivat päättelemään sen ulkonäön '
          + 'vanhojen kirjallisten kuvausten perusteella, joten '
          + 'nykyinen rakennus on parhaan arvauksen mukainen jäljitelmä '
          + 'keskiaikaisesta alkuperäisestä. Sisällä toimii nykyään '
          + 'pieni museo.',
      kuvat: [
        {
          tiedosto: 'Kiev Golden Gate.jpg',
          selite: 'Kultainen portti puistikon laidalla: jälleenrakennettu '
            + 'porttitorni kultakupolisine kirkkoineen. Alaosan harmaa '
            + 'betonikuori pitää sisällään portin säilyneet muurinpätkät.',
          lahde: 'Луц Фишер-Лампрехт, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Киев. Золотые ворота. Почтовая открытка 04.jpg',
          selite: 'Vanha postikortti vuodelta 1910: Kultaisen portin '
            + 'keskiaikaiset rauniot suojakatoksen alla ennen 1980-luvun '
            + 'jälleenrakennusta.',
          lahde: 'Tuntematon kustantaja, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Золоті ворота повний вигляд.jpg',
          selite: 'Kultaisen portin edusta ja portaat suoraan edestä '
            + 'kuvattuna, ohikulkijoita portailla pilvisenä päivänä.',
          lahde: 'Ольжич Мушинський, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  pietari: {
    'Pietari-Paavalin linnoitus': {
      aika: '1703–1733',
      teksti: 'Pietari Suuri perusti linnoituksen vuonna 1703 pienelle '
          + 'Jänissaarelle Nevajoen suulle – tästä paikasta koko '
          + 'Pietarin kaupunki sai alkunsa. Sveitsiläissyntyinen '
          + 'arkkitehti Domenico Trezzini suunnitteli tähdenmuotoiset '
          + 'muurit ja bastionit, ja saaren keskelle nousi '
          + 'Pietari-Paavalin katedraali, jonka 122,5 metriä korkeaa '
          + 'kellotornia kruunaa kultainen enkeli tuulen mukana '
          + 'kääntyvän viirin päällä.'
        + '\n\n'
        + 'Saaren nimi juontuu vanhasta tarinasta: kun Pietari Suuri '
          + 'astui maihin, tulvavesi ajoi säikähtäneen jäniksen suoraan '
          + 'hänen saappaansa suojaan. Tapahtumaa muistaa nykyään pieni '
          + 'pronssinen jänispatsas sillan vieressä olevan pylvään '
          + 'päällä, ja pylvääseen on merkitty vanhojen tulvien '
          + 'korkeudet. Vuodesta 1873 lähtien linnoituksesta on ammuttu '
          + 'tykinlaukaus joka päivä juuri keskipäivällä, ja '
          + 'kaupunkilaiset tarkistivat siitä aikanaan kellonsa.'
        + '\n\n'
        + 'Katedraaliin haudattiin Pietari Suuresta lähtien lähes '
          + 'kaikki Venäjän tsaarit. Myöhemmin osaa linnoituksesta '
          + 'käytettiin myös vankilana, mutta nykyisin koko alue on '
          + 'museo, jossa käy vuosittain miljoonia vierailijoita.',
      kuvat: [
        {
          tiedosto: 'Peter & Paul fortress in SPB 03.jpg',
          selite: 'Aurinkoisena kesäpäivänä joen takaa kuvattu '
            + 'Pietari-Paavalin linnoitus: kultainen kellotorni, kupolit '
            + 'ja muurit erottuvat selvästi sinistä taivasta ja valkoisia '
            + 'pilviä vasten.',
          lahde: 'Florstein, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Saint Petersburg. Panoramic view towards the Peter and Paul Fortress (Petropavlovskaia Krepost\') across the Neva.jpg',
          selite: 'Käsin väritetty valokuva vuodelta 1931: näkymä Nevajoen '
            + 'yli linnoitukseen, jonka kultainen huippu ja kupolit '
            + 'kimaltelevat iltavalossa.',
          lahde: 'Branson DeCou, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'RUS-2016-Aerial-SPB-Peter and Paul Fortress.jpg',
          selite: 'Ilmakuva linnoituksesta ylhäältä: tähdenmuotoiset '
            + 'bastionit, sisäpiha ja katedraali erottuvat kokonaisuutena '
            + 'joen ympäröimällä saarella.',
          lahde: 'Godot13, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Talvipalatsi: {
      aika: '1754–1762',
      teksti: 'Keisarinna Anna tilasi upean talvipalatsin, ja '
          + 'italialainen arkkitehti Bartolomeo Rastrelli sai '
          + 'vihreä-valkoisen barokkilinnan valmiiksi vuonna 1762. '
          + 'Palatsissa on peräti 1500 huonetta, 1945 ikkunaa ja 117 '
          + 'porrasta, ja sen pääjulkisivu venyy 215 metrin pituudelta. '
          + 'Suurimpaan juhlasaliin mahtui seisomaan jopa 10 000 '
          + 'ihmistä, ja ruokapöytään voitiin kerralla kattaa '
          + 'tuhannelle vieraalle.'
        + '\n\n'
        + 'Palatsi oli Venäjän hallitsijoiden koti lähes 150 vuoden '
          + 'ajan. Palvelijat pitivät jopa lehmää ullakolla, jotta '
          + 'keittiöön riitti tuoretta maitoa joka aamu! Katariina '
          + 'Suuri alkoi keräillä palatsin viereen niin paljon '
          + 'taideteoksia, että kokoelmasta kasvoi Eremitaasi – nykyään '
          + 'yksi maailman suurimmista taidemuseoista.'
        + '\n\n'
        + 'Vuonna 1837 tulipalo tuhosi palatsin sisustuksen lähes '
          + 'kokonaan, mutta se rakennettiin entisenlaiseksi vain '
          + 'vuodessa – silloin käytettiin ensi kertaa uudenlaisia '
          + 'rautapalkkeja, jotka kestivät tulta paremmin kuin puu.',
      lainaus: {
        teksti: 'Näitä aarteita ihailevat vain hiiret ja minä.',
        lahde: 'Katariina Suuri, kirjeessä Voltairelle',
      },
      kuvat: [
        {
          tiedosto: 'Winter Palace - Palace Square facade, 2006 (01).jpg',
          selite: 'Talvipalatsin vaaleanvihreä julkisivu Palatsiaukiolta '
            + 'kuvattuna, edustalla Aleksanterin pylväs ja aurinkoinen '
            + 'kesätaivas.',
          lahde: 'Bahnfrend, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Winter Palace, St. Petersburg, Russia LCCN2014646334.jpg',
          selite: 'Mustavalkoinen valokuva Talvipalatsista vuodelta 1890, '
            + 'edustalla höyrylaiva Nevajoella.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'RUS-2016-Aerial-SPB-Winter Palace.jpg',
          selite: 'Ilmakuva Talvipalatsin ja Palatsiaukion kokonaisuudesta '
            + 'ylhäältä, näkyvissä myös rakennuksen sisäpiha ja ympäröivä '
            + 'kaupunki.',
          lahde: 'Godot13, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Verikirkko: {
      aika: '1883–1907',
      teksti: 'Kirkko sai syntynsä traagisesta hetkestä: keisari '
          + 'Aleksanteri II haavoittui kuolettavasti juuri tällä '
          + 'paikalla vuonna 1881. Hänen poikansa käski rakentaa '
          + 'muistoksi kirkon, jonka arkkitehti Alfred Parland '
          + 'suunnitteli – rakennustyö kesti peräti 24 vuotta ja '
          + 'valmistui vasta vuonna 1907.'
        + '\n\n'
        + 'Toisin kuin Pietarin muut vaaleat ja suorakulmaiset '
          + 'rakennukset, Verikirkko on täynnä värikkäitä '
          + 'sipulikupoleita, jotka muistuttavat Moskovan kuuluisaa '
          + 'Pyhän Basileioksen katedraalia. Sisällä seiniä ja kattoja '
          + 'peittää yli 7000 neliömetriä värikkäitä mosaiikkeja – se '
          + 'on yksi maailman suurimmista mosaiikkikokoelmista. Tarkka '
          + 'kohta, jossa keisari haavoittui, on merkitty pieneen '
          + 'koristeltuun pyhäkköön kirkon sisällä.',
      kuvat: [
        {
          tiedosto: 'Спас на Крови (вид с канала).jpg',
          selite: 'Verikirkko Gribojedovin kanavan varrella aurinkoisena '
            + 'päivänä, kultaiset ja kirjavat sipulikupolit erottuvat '
            + 'selvästi kanavamaiseman keskellä.',
          lahde: 'Yaroslav Alekseev, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'The Church of the Savior on Spilled Blood in spring.jpg',
          selite: 'Verikirkko alhaalta ylös kuvattuna kanavan rannalta, '
            + 'kupolit ja koristeelliset julkisivut erottuvat kirkkaan '
            + 'sinistä taivasta vasten.',
          lahde: 'Egorchetvernin, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'SPB Saviour on the Blood 1905-1915.jpg',
          selite: 'Prokudin-Gorskin värivalokuva Verikirkosta 1900-luvun '
            + 'alusta, kirkko vielä uudenveroisena vähän valmistumisensa '
            + 'jälkeen.',
          lahde: 'Sergei Prokudin-Gorski, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Vaskiratsastaja: {
      aika: '1782',
      teksti: 'Ranskalainen kuvanveistäjä Étienne Falconet loi Pietari '
          + 'Suuren ratsastajapatsaan Katariina Suuren tilauksesta, ja '
          + 'se paljastettiin Senaatintorilla vuonna 1782. Pietari '
          + 'istuu pystyssä hevosensa selässä ja osoittaa kädellään '
          + 'kohti Nevajokea, kun taas hevosen kavion alla käärme '
          + 'vääntelehtii – sen katsotaan kuvaavan vihollisia, jotka '
          + 'Pietari voitti uudistuksillaan.'
        + '\n\n'
        + 'Patsaan jalusta on yhtä vaikuttava kuin itse veistos: se '
          + 'on 1250 tonnia painava jättiläismäinen graniittilohkare '
          + 'nimeltä Ukkoskivi. Yli 400 miestä raahasi sitä yhdeksän '
          + 'kuukauden ajan erikoisrakenteisilla kelkoilla, joissa '
          + 'pronssikuulat toimivat kuin nykyaikaiset kuulalaakerit – '
          + 'koneita tai vetoeläimiä ei käytetty lainkaan.'
        + '\n\n'
        + 'Patsas sai lisänimensä Vaskiratsastaja runoilija Aleksandr '
          + 'Puškinin vuonna 1833 kirjoittamasta kuuluisasta runosta, '
          + 'joka on yksi venäläisen kirjallisuuden tunnetuimmista '
          + 'teoksista.',
      lainaus: {
        teksti: 'Katariina Toinen – Pietari Ensimmäiselle, 1782.',
        lahde: 'Vaskiratsastajan jalustan kaiverrus',
      },
      kuvat: [
        {
          tiedosto: 'RUS-2016-SPB-Bronze Horseman 03.jpg',
          selite: 'Vaskiratsastaja-patsas iltaruskon kultaisessa valossa: '
            + 'Pietari Suuri hevosen selässä graniittikiven päällä, '
            + 'taustalla kirkas taivas.',
          lahde: 'Godot13, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Paterssen View Senate Square with Monument of Peter the Great 1799.jpg',
          selite: 'Vuoden 1799 väritetty kaiverrus Senaatintorista: '
            + 'Vaskiratsastaja-patsas keskellä toria hevoskärryjen ja '
            + 'purjelaivojen ympäröimänä.',
          lahde: 'Benjamin Patersen (jäljennös), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kazanin katedraali': {
      aika: '1801–1811',
      teksti: 'Arkkitehti Andrei Voronihin sai tehtäväkseen suunnitella '
          + 'katedraalin, joka kunnioittaisi ihmeitä tekevää Kazanin '
          + 'Jumalanäidin ikonia. Ortodoksisessa kirkossa '
          + 'pääsisäänkäynnin tulisi olla lännessä, mutta tontti '
          + 'sijaitsi Nevski-bulevardin varrella pohjoisessa – niinpä '
          + 'Voronihin ratkaisi pulman rakentamalla sivulle mahtavan '
          + 'puolikaaren muotoisen pylväikön, jossa on 96 '
          + 'korinttilaista pylvästä neljässä rivissä. Katedraali '
          + 'valmistui vuonna 1811 ja kohoaa korkeimmillaan 71,6 '
          + 'metriin.'
        + '\n\n'
        + 'Vuonna 1812 Napoleonin sotajoukot hyökkäsivät Venäjälle, '
          + 'ja voiton jälkeen katedraalista tuli sodan muistomerkki. '
          + 'Sotamarsalkka Mihail Kutuzov, joka johti Venäjän armeijaa '
          + 'Napoleonia vastaan, haudattiin katedraaliin vuonna 1813, '
          + 'ja sen sakastiin tuotiin muistoksi valloitettujen '
          + 'kaupunkien ja linnoitusten avaimia.',
      kuvat: [
        {
          tiedosto: 'Kazan Cathedral Saint Petersburg.jpg',
          selite: 'Kazanin katedraalin puolikaarinen pylväikkö ja kupoli '
            + 'hämärän sinisessä iltavalaistuksessa, edustalla '
            + 'suihkulähde ja puutarha.',
          lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Kazan Cathedral-Toselli.jpg',
          selite: '1800-luvun alun litografia Kazanin katedraalista '
            + 'sivukuvakulmasta, edustalla hevoskärryjä ja ohikulkijoita.',
          lahde: 'Angelo Toselli (piirros), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Mariinski-teatteri': {
      aika: '1860',
      teksti: 'Mariinski-teatteri avasi ovensa vuonna 1860 ja sai nimensä '
          + 'keisarinna Maria Aleksandrovnan mukaan. Sen lavalla on '
          + 'nähty ensi-iltoja, joita esitetään yhä ympäri maailmaa: '
          + 'Tšaikovskin baletti Prinsessa Ruusunen kantaesitettiin '
          + 'täällä vuonna 1890 ja Pähkinänsärkijä vuonna 1892.'
        + '\n\n'
        + 'Teatterin balettikoulusta ovat ponnistaneet monet '
          + 'historian kuuluisimmista tanssijoista, kuten Anna Pavlova, '
          + 'Vaslav Nijinski ja Mihail Baryšnikov. Päänäyttämölle '
          + 'mahtuu 1625 katsojaa, ja vuonna 2013 teatterin viereen '
          + 'valmistui kokonaan uusi toinen näyttämö, jossa on 1830 '
          + 'istumapaikkaa.',
      kuvat: [
        {
          tiedosto: 'Санкт-Петербург, Мариинский театр, фасад (edited version).jpg',
          selite: 'Mariinski-teatterin vaaleanvihreä julkisivu suoraan edestä '
            + 'kuvattuna aurinkoisena päivänä, kaareva kattoterassi ja '
            + 'pylväät erottuvat selvästi.',
          lahde: 'Nikolai Bulykin, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: '20240524 Mariinsky Theatre main building 01.jpg',
          selite: 'Mariinski-teatterin kulmatorni läheltä kuvattuna '
            + 'alaviistosta, koristeelliset yksityiskohdat ja kirkas '
            + 'taivas.',
          lahde: 'Sergei A. Demidov, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  moskova: {
    'Bolšoi-teatteri': {
      aika: '1825',
      teksti: 'Moskovan Bolšoi-teatteri, jonka nimi tarkoittaa venäjäksi '
          + '"suurta teatteria", avasi ovensa vuonna 1825. Sen '
          + 'suunnitteli arkkitehti Joseph Bové, ja rakennuksen '
          + 'pylväikön yläpuolella nelivaljakkoa ajaa jumala Apollo '
          + 'pronssisessa vaunussa - patsaan teki kuvanveistäjä Pjotr '
          + 'Klodt.'
        + '\n\n'
        + 'Teatterin historiaan mahtuu useita paloja. Edellinen, '
          + 'vielä vanhempi teatteri tuhoutui tulipalossa jo vuonna '
          + '1805, ja tulipalo iski uuteenkin rakennukseen vuonna 1853. '
          + 'Arkkitehti Alberto Cavos suunnitteli katsomon uudelleen, '
          + 'ja siitä lähtien salissa on loistanut tuttu punainen ja '
          + 'kultainen väritys. Nykyisin saliin mahtuu noin 1740 '
          + 'katsojaa.'
        + '\n\n'
        + 'Bolšoi-teatterissa on nähty monta merkittävää ensi-iltaa - '
          + 'muun muassa Tšaikovskin baletti Joutsenlampi '
          + 'kantaesitettiin siellä vuonna 1877. Teatterin oma '
          + 'balettiryhmä on nykyään maailman suurin: tanssijoita on '
          + 'yli 200.',
      kuvat: [
        {
          tiedosto: 'Moscow - 2025 - Facade of Big Theatre (1).jpg',
          selite: 'Bolšoi-teatterin klassisistinen päajulkisivu '
            + 'pylväikköineen ja Apollonin nelivaljakkoveistoksineen '
            + 'kirkkaana kesäpäivänä.',
          lahde: 'Юрий Д.К., Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Bolshoy Teatr.jpg',
          selite: '1830–1840-luvun väritetty litografia Bolšoi-teatterista '
            + 'talvisena päivänä, hevosajoneuvoja rakennuksen edustalla.',
          lahde: 'Jean Baptiste Arnout (Vivienin alkuperäiskuvan mukaan), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Punainen tori': {
      aika: '1490-luku',
      teksti: 'Punainen tori sijaitsee aivan Kremlin muurien vierellä '
          + 'Moskovan keskustassa. Aukio syntyi 1490-luvulla, kun '
          + 'ruhtinas Iivana III käski purkaa alueen puutalot '
          + 'paloturvallisuuden ja puolustuksen vuoksi. Aluksi paikkaa '
          + 'kutsuttiin yksinkertaisesti Toriksi, sillä siellä käytiin '
          + 'kauppaa vuosisatojen ajan.'
        + '\n\n'
        + 'Nimi "punainen" ei alun perin viitannut väriin: vanhalla '
          + 'venäjän kielellä sana tarkoitti "kaunista". Vasta '
          + 'myöhemmin samasta sanasta tuli myös punaisen värin '
          + 'nimitys. Tori on lähes 330 metriä pitkä ja 70 metriä leveä '
          + '- yhteensä melkein 73 000 neliömetriä.'
        + '\n\n'
        + 'Aukion laidalla kohoavat Pyhän Vasilin katedraalin '
          + 'värikkäät kupolit, tummanpunainen historian museo ja '
          + 'valtava GUM-tavaratalo. Vuosisatojen ajan torilla '
          + 'julistettiin kuninkaallisia tiedotteita ja juhlittiin '
          + 'tsaarien kruunajaisia.',
      kuvat: [
        {
          tiedosto: 'Moscow - Red Square in May 2026.jpg',
          selite: 'Punaisen torin laaja näkymä: Kremlin muuri, Historiallinen '
            + 'museo ja GUM-tavaratalo aurinkoisena päivänä pilvisellä '
            + 'mutta kirkkaalla taivaalla.',
          lahde: 'Юрий Д.К., Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Red Square at sunset (12.07.2016).jpg',
          selite: 'Punainen tori auringonlaskun kultaisessa valossa, Kremlin '
            + 'torni ja Historiallinen museo hehkuvana siluettina.',
          lahde: 'Gennady Grachev, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Krasnaya Ploshad-19v.jpg',
          selite: 'Väritetty postikortti 1900-luvun alusta: Punainen tori, '
            + 'Vasili-katedraali ja Spasskajan torni hevoskärryineen ja '
            + 'ohikulkijoineen.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pyhän Vasilin katedraali': {
      aika: '1555-1561',
      teksti: 'Tsaari Iivana Julma käski rakentaa tämän katedraalin '
          + 'muistoksi Kazanin kaupungin valtauksesta vuonna 1552. '
          + 'Rakennustyöt kestivät yllättävän lyhyen ajan, vuodesta '
          + '1555 vuoteen 1561 - vain kuusi vuotta.'
        + '\n\n'
        + 'Rakennuksen yhdeksän erimuotoista ja -väristä '
          + 'sipulikupolia tekevät siitä ainutlaatuisen: mitään täysin '
          + 'samanlaista ei ole rakennettu koskaan ennen tai jälkeen. '
          + 'Alun perin kirkko oli nimeltään Pyhän Kolminaisuuden '
          + 'kirkko, mutta vuonna 1588 sen kylkeen lisättiin kappeli '
          + 'pyhän hullun, Vasili Siunatun, haudan päälle. Vähitellen '
          + 'koko katedraali alkoi kantaa hänen nimeään.'
        + '\n\n'
        + 'Katedraaliin liittyy vanha legenda, jonka mukaan Iivana '
          + 'Julma olisi sokaissut rakennuksen tekijät, Barman ja '
          + 'Postnik Jakovlevin, jotta he eivät voisi koskaan rakentaa '
          + 'mitään yhtä kaunista muualle. Historioitsijat pitävät '
          + 'tarinaa kuitenkin pelkkänä legendana, sillä samat '
          + 'rakentajat tiedetään työskennelleen myös myöhemmissä '
          + 'rakennushankkeissa.',
      kuvat: [
        {
          tiedosto: 'St. Basil\'s Cathedral at autumn sunny day.jpg',
          selite: 'Pyhän Vasilin katedraali kokonaisuudessaan värikkäine '
            + 'sipulikupoleineen kirkkaan sinistä taivasta vasten.',
          lahde: 'Юрий Д.К., Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: '00 0568 Saint Basil\'s Cathedral - Moscow.jpg',
          selite: 'Läheltä alaviistosta kuvatut Pyhän Vasilin katedraalin '
            + 'värikkäät, kuvioidut sipulikupolit.',
          lahde: 'W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Saint Basil\'s Cathedral 1870.jpg',
          selite: 'Vuoden 1870 kaiverrus Pyhän Vasilin katedraalista '
            + 'hevosajoneuvoineen ja ohikulkijoineen edustalla.',
          lahde: 'K. O. Brož (piirros), L. A. Serjakov (kaiverrus), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Moskovan Kreml': {
      aika: '1485-1495',
      teksti: 'Linnoitus tällä paikalla on paljon vanhempi kuin luulisi: '
          + 'ensimmäisen linnan rakensi ruhtinas Juri Dolgorukin jo '
          + 'vuonna 1156, ja vuonna 1339 ruhtinas Iivana I Kalita '
          + 'vahvisti sitä tammisilla muureilla. Nykyiset punatiiliset '
          + 'muurit ja tornit, jotka yhä seisovat, rakennettiin vuosina '
          + '1485-1495 ruhtinas Iivana III:n käskystä.'
        + '\n\n'
        + 'Iivana III kutsui työhön taitavia arkkitehtejä kaukaa '
          + 'Italiasta. Pietro Antonio Solari suunnitteli uudet muurit '
          + 'ja tornit, ja Marco Ruffo piirsi ruhtinaan uuden palatsin. '
          + 'Solarin nimi on kaiverrettu latinaksi yhä nähtävissä '
          + 'Spasskajan tornin porttien yläpuolella.'
        + '\n\n'
        + 'Muuria on yhteensä 2235 metriä, ja se on paikoin 5-19 '
          + 'metriä korkea ja jopa 6,5 metriä paksu. Torneja on '
          + 'kaikkiaan 20, ja korkein niistä, Troitskaja-torni, kohoaa '
          + '80 metrin korkeuteen. Muurien sisällä seisoo vanhoja '
          + 'katedraaleja sekä Iivana Suuren kellotorni, joka valmistui '
          + 'vuonna 1600 ja nousee 81 metrin korkeuteen.',
      kuvat: [
        {
          tiedosto: 'Moscow - 2026-3 - Kremlin at spring.jpg',
          selite: 'Kremlin punatiiliset muurit ja tornit sekä Suuri Kremlin '
            + 'palatsi Moskva-joen rannalta kuvattuna kirkkaana päivänä.',
          lahde: 'Юрий Д.К., Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Cathedral square inside the Kremlin.jpg',
          selite: 'Kremlin Katedraalitori ylhäältä kuvattuna: kultakupolisia '
            + 'kirkkoja ja palatseja aurinkoisena päivänä.',
          lahde: 'Pedro Szekely, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Noël Paymal Lerebours 06 Moscow.jpg',
          selite: '1840-luvun väritetty kaiverrus Kremlin muureista ja '
            + 'torneista Moskva-joen rannalta, soutuveneitä joella.',
          lahde: 'Johann Hürlimann, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Vapahtajan katedraali': {
      aika: '1839-1883',
      teksti: 'Kun Napoleonin joukot perääntyivät Moskovasta vuonna 1812, '
          + 'tsaari Aleksanteri I halusi rakentaa valtavan katedraalin '
          + 'kiitokseksi Venäjän pelastumisesta ja kaatuneiden '
          + 'sotilaiden muistoksi. Peruskivi muurattiin vuonna 1839, '
          + 'mutta katedraali valmistui vasta vuonna 1883 - '
          + 'rakentaminen kesti yli 40 vuotta. Säveltäjä Tšaikovski '
          + 'sävelsi juhlaan sopivan 1812-alkusoiton, joka kuultiin '
          + 'katedraalin pihalla jo elokuussa 1882, ennen kuin koko '
          + 'rakennus oli edes valmis.'
        + '\n\n'
        + 'Vuonna 1931 katedraali räjäytettiin dynamiitilla, sillä '
          + 'sen paikalle oli tarkoitus rakentaa aivan uudenlainen '
          + 'jättimäinen rakennus. Sitä ei koskaan saatu valmiiksi, ja '
          + 'tyhjälle paikalle rakennettiin sen sijaan maailman suurin '
          + 'ulkouima-allas, joka oli käytössä aina vuoteen 1994 asti.'
        + '\n\n'
        + '1990-luvulla katedraali päätettiin rakentaa uudelleen '
          + 'täsmälleen alkuperäisen näköiseksi. Uusi katedraali '
          + 'valmistui vuonna 2000, se on 103 metriä korkea ja sen '
          + 'sisään mahtuu kerralla jopa 9500 ihmistä.',
      lainaus: {
        teksti: '...kiitokseksi siitä, että Venäjä pelastui tuhosta, joka '
          + 'oli sitä uhannut.',
        lahde: 'Tsaari Aleksanteri I:n julistus, 1812',
      },
      kuvat: [
        {
          tiedosto: 'Moscow July 2011-34a.jpg',
          selite: 'Vapahtajan Kristus-katedraali kultakupoleineen sinistä '
            + 'taivasta vasten, Patriarhin silta edustalla.',
          lahde: 'Alvesgaspar, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Москва. Храм Христа Спасителя 1881 Найденов t75105.jpg',
          selite: 'Vuoden 1881 valokuva alkuperäisestä Vapahtajan '
            + 'katedraalista pian sen valmistumisen jälkeen, '
            + 'rakennustyömaan jälkiä edustalla.',
          lahde: 'Nikolai Naidjonov, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Tretjakovin galleria': {
      aika: '1856-1893',
      teksti: 'Moskovalainen kauppias Pavel Tretjakov aloitti '
          + 'taidekokoelmansa vuonna 1856 ostamalla kaksi venäläistä '
          + 'maalausta. Vuosikymmenten aikana hän osti satoja teoksia '
          + 'lisää, kunnes kokoelmassa oli jo lähes 2000 taideteosta - '
          + 'yli 1300 maalausta, satoja piirustuksia ja muutama '
          + 'veistos.'
        + '\n\n'
        + 'Elokuussa 1892 Tretjakov lahjoitti koko kokoelmansa '
          + 'Moskovan kaupungille, ja galleria avattiin yleisölle 15. '
          + 'elokuuta 1893. Nykyään museossa on esillä yli 130 000 '
          + 'teosta, muun muassa Andrei Rublevin kuuluisa ikoni '
          + 'Kolminaisuus.'
        + '\n\n'
        + 'Museon satumaisen näköisen punatiilisen julkisivun '
          + 'suunnitteli taiteilija Viktor Vasnetsov vuosina 1902-1904, '
          + 'ja se muistuttaa suoraan venäläisestä kansantarinasta '
          + 'poimittua linnaa. Toisen maailmansodan aikana koko '
          + 'taidekokoelma vietiin turvaan junalla - peräti 17 vaunua '
          + 'täynnä taidetta - kauas Siperian Novosibirskiin.',
      kuvat: [
        {
          tiedosto: 'Tretyakov and his gallery.jpg',
          selite: 'Tretjakovin galleria Pavel Tretjakovin patsaan takaa '
            + 'kuvattuna, satumainen punatiilinen ja koristeellinen '
            + 'julkisivu aurinkoisena päivänä.',
          lahde: 'Andrey, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  odessa: {
    'Vorontsovin majakka': {
      aika: '1862–1955',
      teksti: 'Odessan satamansuulla seisoo punavalkoinen Vorontsovin '
          + 'majakka, joka kohoaa lähes 30 metrin korkeuteen – yhtä '
          + 'korkealle kuin kymmenkerroksinen talo. Nykyinen torni on '
          + 'jo kolmas samalla paikalla: ensin siellä oli puinen '
          + 'majakka 1800-luvun puolivälissä, sen jälkeen valurautainen '
          + 'torni, ja lopulta vuonna 1955 valmistui torni, joka seisoo '
          + 'paikalla vielä nykyäänkin.'
        + '\n\n'
        + 'Majakan huipulla palava valo näkyy merelle yli 20 '
          + 'kilometrin päähän. Se vilkkuu aina samalla tunnuksellaan: '
          + 'kolme pitkää välähdystä, mikä on Morse-aakkosissa kirjain '
          + 'O – niin kuin Odessa. Sumuisina päivinä majakasta kuuluu '
          + 'myös kova sumutorvi, joka varoittaa laivoja karikoista.'
        + '\n\n'
        + 'Majakka on nimetty ruhtinas Vorontsovin mukaan, joka '
          + 'aikanaan hallitsi Odessan seutua. Se on yhdistetty rantaan '
          + 'pitkällä kivisellä aallonmurtajalla, joka suojaa satamaa '
          + 'myrskyiltä ja korkeilta aalloilta.',
      kuvat: [
        {
          tiedosto: 'Воронцовський маяк DSC5033.jpg',
          selite: 'Vorontsovin majakka merenpuolelta kuvattuna: valkoinen '
            + 'kivimajakka punaisine lyhtyhuoneineen kohoaa sinistä '
            + 'taivasta ja valkoisia pilviä vasten, ympärillä avomeri.',
          lahde: 'Konstantin Brizhnichenko, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Воронцовський маяк та грузовий порт.jpg',
          selite: 'Vorontsovin majakka aallonmurtajan päässä omalla pyöreällä '
            + 'jalustallaan. Takana näkyy rahtisatama nostureineen.',
          lahde: 'SvetlanaM85, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Vorontsov Lighthouse.jpg',
          selite: '1890-luvun postikorttikuva Vorontsovin majakasta: vanha '
            + 'metallinen/kivinen majakka kivilaiturilla, ympärillä '
            + 'soutuveneitä ajan tyylissä.',
          lahde: 'Tuntematon, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Odessan satama': {
      aika: '1793–1794',
      teksti: 'Odessan satama sai alkunsa 1790-luvulla, kun upseeri José '
          + 'de Ribas etsi parasta paikkaa uudelle satamalle '
          + 'Mustanmeren rannalta. Rakennustyöt alkoivat vuonna 1793, '
          + 'ja jo seuraavana vuonna ensimmäiset laivat pääsivät '
          + 'kiinnittymään uusiin laitureihin. Siitä lähtien satama on '
          + 'kasvanut yhdeksi Ukrainan suurimmista ja koko Mustanmeren '
          + 'alueen vilkkaimmista satamista.'
        + '\n\n'
        + 'Nykyään satamassa on 46 laituripaikkaa ja 52 laituria, ja '
          + 'sinne mahtuvat jopa valtavan kokoiset Panamax-luokan '
          + 'rahtilaivat. Satamasta kulkee vuosittain noin 50 miljoonaa '
          + 'tonnia tavaraa – viljaa, öljyä, kontteja ja monenlaista '
          + 'muuta rahtia.'
        + '\n\n'
        + 'Satamassa on myös oma telakka laivojen korjaamiseen, '
          + 'matkustajaterminaali ja pieni merenkulkumuseo, joka kertoo '
          + 'Ukrainan laivaston historiasta. Parhaimmillaan satamasta '
          + 'on lähtenyt matkalle miljoonia matkustajia vuodessa.',
      kuvat: [
        {
          tiedosto: 'Вид на морской вокзал (Одесса).jpg',
          selite: 'Odessan meriasema satamassa: korkea Hotel Odessa -torni, '
            + 'matkustaja-alus ja purjeveneitä laiturissa kirkkaan '
            + 'sinisen taivaan alla.',
          lahde: 'Georgiy Dolgopskiy, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Potjomkinin portaat': {
      aika: '1837–1841',
      teksti: 'Odessan kuuluisin nähtävyys on jättiläismäinen kivinen '
          + 'porrasrivistö, joka johtaa satamasta ylös kaupungin '
          + 'keskustaan. Portaat rakennettiin vuosina 1837–1841 '
          + 'sveitsiläisen arkkitehti Francesco Boffon suunnitelmien '
          + 'mukaan, ja niiden rakentamista valvoi englantilainen '
          + 'insinööri John Upton. Alun perin portaissa oli 200 '
          + 'askelmaa, mutta ajan myötä osa niistä hautautui maan alle '
          + '– nykyään portaissa lasketaan 192 askelmaa kymmenen '
          + 'tasanteen välissä.'
        + '\n\n'
        + 'Portaissa on hauska temppu: ne on rakennettu niin, että '
          + 'yläpää on kapeampi (12,5 metriä) ja alapää leveämpi (yli '
          + '21 metriä). Kun seisoo alhaalla ja katsoo ylös, portaat '
          + 'näyttävät paljon lyhyemmiltä kuin ne todellisuudessa ovat, '
          + 'sillä tasanteet katoavat näkyvistä. Ja jos seisoo ylhäällä '
          + 'ja katsoo alas, koko 142 metriä pitkä porrasrivistö '
          + 'näyttää yhtenäiseltä, suoralta muurilta, koska yksittäiset '
          + 'askelmat eivät erotu lainkaan!'
        + '\n\n'
        + 'Portaat tulivat maailmankuuluisiksi vuonna 1925, kun '
          + 'ohjaaja Sergei Eisenstein kuvasi niillä kohtauksia '
          + 'mykkäelokuvaansa Panssarilaiva Potjomkin. Elokuvan '
          + 'ansiosta portaista tuli yksi elokuvahistorian '
          + 'tunnetuimmista kuvauspaikoista, ja myöhemmin myös '
          + 'portaiden oma nimi alkoi muistuttaa laivasta, josta '
          + 'elokuva kertoo.',
      kuvat: [
        {
          tiedosto: 'Potemkin Stairs, Odessa.jpg',
          selite: 'Potjomkinin portaat alhaalta kuvattuna: koko leveä '
            + 'rappuskäytävä nousee ylös siniseen taivaaseen, ihmisiä '
            + 'kävelemässä portailla.',
          lahde: 'Oleh Kushch, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Потьомкінські східці, Potemkin Stairs (11378021554).jpg',
          selite: 'Näkymä Potjomkinin portaiden yläpäästä alas kohti satamaa '
            + 'ja Hotel Odessa -tornia syksyisessä auringonpaisteessa, '
            + 'puissa ruskan värejä.',
          lahde: 'Clay Gilliland, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Potemkinstairs.jpg',
          selite: 'Vuoden 1896 valokuva Potjomkinin portaista: portaat '
            + 'reunustavat ajan rakennukset, portailla yksittäisiä '
            + 'ohikulkijoita.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Odessan oopperatalo': {
      aika: '1810–1887',
      teksti: 'Odessan ensimmäinen oopperatalo avattiin jo vuonna 1810, '
          + 'mutta se tuhoutui tulipalossa vuonna 1873. Sen tilalle '
          + 'rakennettiin uusi, vieläkin komeampi talo, jonka '
          + 'suunnittelivat itävaltalaiset arkkitehdit Ferdinand '
          + 'Fellner ja Hermann Helmer. Uusi oopperatalo avasi ovensa '
          + 'lokakuussa 1887, ja sen julkisivua koristavat kuuluisien '
          + 'venäläisten kirjailijoiden ja säveltäjien, kuten Gogolin '
          + 'ja Pushkinin, kuvapatsaat.'
        + '\n\n'
        + 'Talon sisällä on hevosenkengän muotoinen katsomosali, '
          + 'jonka akustiikka on niin hyvä, että näyttelijän '
          + 'kuiskauskin kuuluu selvästi viimeiselle riville asti. Sali '
          + 'oli aikanaan myös tekniikan ihme: se oli ensimmäinen '
          + 'rakennus koko Odessassa, jossa oli sähkövalot. Kesäisin '
          + 'salia viilennettiin laskemalla jäällä täytettyjä vaunuja '
          + 'rakennuksen alle kellariholveihin.'
        + '\n\n'
        + 'Katsomoon mahtuu yli 1 600 katsojaa, ja lavalla on '
          + 'esiintynyt monia kuuluisia laulajia, muun muassa '
          + 'mahtiäänisenä tunnettu bassolaulaja Fjodor Saljapin. '
          + 'Rakennus koki vielä yhden tulipalon vuonna 1925, mutta se '
          + 'korjattiin, ja oopperatalo loistaa yhä Odessan '
          + 'keskustassa.',
      kuvat: [
        {
          tiedosto: 'The auditorium of the Odessa Opera House 01.jpg',
          selite: 'Oopperatalon katsomo ennen esitystä: punakultainen '
            + 'esirippu, aitiokerroksia päällekkäin salin molemmin puolin ja '
            + 'kattoa kiertävät valkoiset kipsihahmot.',
          lahde: 'OlenaMuzychenko (WMUA), Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Odessa Opera Theatre 2016 G2.jpg',
          selite: 'Lähikuva oopperatalon päätykolmiosta: hevospatsasryhmä, '
            + 'pylväät ja koristeveistokset alhaalta kuvattuna kirkkaassa '
            + 'auringonpaisteessa.',
          lahde: 'George Chernilevsky, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Stadttheater in Odessa (BildID 15665727).jpg',
          selite: 'Vuoden 1917 valokuva Odessan oopperatalosta kadulta '
            + 'kuvattuna: katukiveys, katulyhdyt ja ajan asukkaita '
            + 'kävelemässä rakennuksen editse.',
          lahde: 'K.u.k. Kriegspressequartier, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kaupunginpuisto: {
      aika: '1803',
      teksti: 'Odessan vanhin puisto perustettiin jo vuonna 1803, kun '
          + 'kaupungin perustajan veli Felix de Ribas raivasi alueen '
          + 'keskelle kaupunkia. Muutaman vuoden kuluttua hänellä ei '
          + 'enää ollut varaa hoitaa puistoa, joten hän lahjoitti sen '
          + 'koko kaupungille vuonna 1806 – ja niin siitä tuli kaikkien '
          + 'odessalaisten yhteinen olohuone.'
        + '\n\n'
        + 'Puisto on pieni, alle kaksi hehtaaria, mutta sinne mahtuu '
          + 'paljon: vanha kesäteatterin lava, jolla orkesteri soittaa '
          + 'kesäiltoina, pieni paviljonki, patsaita ja musiikkia '
          + 'soittava suihkulähde. Puiston käytävät kiemurtelevat '
          + 'vanhojen puiden alla, ja penkeillä istuskelee sekä '
          + 'paikallisia että matkailijoita.'
        + '\n\n'
        + 'Puisto sijaitsee aivan Odessan vilkkaimman kadun, '
          + 'Deribasovskajan, varrella, joten se on kätevä '
          + 'levähdyspaikka kävelijöille. Puistoa on kunnostettu useaan '
          + 'otteeseen, viimeksi vuonna 2007, jolloin suihkulähde ja '
          + 'rakennukset saivat uuden ilmeen.',
      kuvat: [
        {
          tiedosto: 'Odessa city garden orchestra Rotunda.JPG',
          selite: 'Kaupunginpuiston pyöreä musiikkipaviljonki (rotunda) ja '
            + 'suihkulähde kukkapenkkien keskellä, ihmisiä istumassa '
            + 'penkeillä auringossa.',
          lahde: 'HOBOPOCC, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Восени у міському саду, Одеса.jpg',
          selite: 'Kaupunginpuiston käytävä syksyisessä kultaisessa '
            + 'lehtimeressä, punaiset penkit rivissä käytävän varrella, '
            + 'katulyhty edessä.',
          lahde: 'Krasnickaja Katya, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Privozin tori': {
      aika: '1827',
      teksti: 'Privoz on Odessan suurin ja vanhin ruokatori, ja sen '
          + 'tarina alkoi vuonna 1827. Aluksi kauppiaat myivät '
          + 'tavaroitaan suoraan hevoskärryjen lavalta – nimi ”Privoz” '
          + 'tarkoittaakin suunnilleen ”tuotu tavara”. Vuosikymmenten '
          + 'kuluessa torista kasvoi koko kaupungin sydän, paikka jossa '
          + 'ei vain ostettu ja myyty, vaan vaihdettiin myös kaikki '
          + 'tuoreimmat kaupungin kuulumiset.'
        + '\n\n'
        + 'Tulipalo tuhosi torin, mutta se rakennettiin kokonaan '
          + 'uudelleen 1900-luvun alussa. Vuonna 1904 torille valmistui '
          + 'kaunis Hedelmäkäytävä, jonka kaarevat holvikäytävät ja '
          + 'koristeelliset julkisivut tekivät siitä torin näyttävimmän '
          + 'rakennuksen. Sitä pidetään edelleen torin ainoana '
          + 'varsinaisena arkkitehtuurinähtävyytenä.'
        + '\n\n'
        + 'Privozilla myydään yhä kaikkea taivaan ja maan väliltä: '
          + 'tuoretta kalaa ja äyriäisiä, lihaa, juustoja, hedelmiä ja '
          + 'mausteita – ja joskus vaikka mitä yllättävää pikkutavaraa. '
          + 'Tori on innoittanut myös kirjailijoita ja '
          + 'elokuvantekijöitä: muun muassa vanha koomikko-elokuva '
          + 'kaupungin kaduille karanneesta elefantista sai alkunsa '
          + 'Privozin tarinoista.',
      kuvat: [
        {
          tiedosto: 'Pryviz entrance.jpg',
          selite: 'Privozin torin näyttävä kaarikattoinen sisäänkäynti '
            + 'kadulta kuvattuna, PRIVOZ-kyltti julkisivussa, kirkas '
            + 'kevätaurinko ja tyhjä katu edessä.',
          lahde: 'Hwyrd, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Privoz market in Odessa.JPG',
          selite: 'Privozin sisäänkäynti: torin nimi ПРИВОЗ suurin kirjaimin '
            + 'katoksen päällä ja sen alla sinivalkoisia myyntitelttoja '
            + 'rivissä niin kauas kuin näkee.',
          lahde: 'Garik 11, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  tromssa: {
    Polaarimuseo: {
      aika: '1837 (rakennus) / 1978 (museo)',
      teksti: 'Polaarimuseo on hämmentävän vanhassa talossa: se toimii '
          + 'vuonna 1837 rakennetussa laiturimakasiinissa, jonne '
          + 'aikoinaan varastoitiin turkiksia ja muita tavaroita. Talon '
          + 'paksut hirsiseinät ovat nähneet satamassa satojen vuosien '
          + 'ajan hylkeenpyytäjien ja karhumiesten laivoja.'
        + '\n\n'
        + 'Museo kertoo, miten Tromssasta tuli 1800-luvun '
          + 'puolivälissä pohjoisen jäämeren pyynnin pääkaupunki - jo '
          + 'vuoden 1850 tienoilla kaupunki ohitti tärkeydessä aiemman '
          + 'keskuksen Hammerfestin. Täältä lähtivät liikkeelle myös '
          + 'kuuluisat retkeilijät: museo muistaa erityisesti Fridtjof '
          + 'Nansenia ja Roald Amundsenia, joiden matkat pohjoisnavalle '
          + 'ja Etelämantereelle saivat alkunsa juuri Tromssan '
          + 'satamasta.'
        + '\n\n'
        + 'Näyttelyissä pääsee tutustumaan hylkeenpyyntiin, '
          + 'talvehtimiseen jäissä ja Huippuvuorten historiaan - '
          + 'aiheita, joita isoisän 1873 päiväkirjassa varmasti '
          + 'sivuttaisiin, sillä juuri tuohon aikaan Tromssa oli '
          + 'vilkkaimmillaan pyyntilaivaston lähtösatamana.',
      kuvat: [
        {
          tiedosto: 'Polar Museum (52602951465).jpg',
          selite: 'Punainen puinen Polarmuseet-rakennus kirkkaan sinisen '
            + 'taivaan alla, etualalla vanhan veneen keula.',
          lahde: 'David Stanley, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Polar Museum.jpg',
          selite: 'Lumipeitteinen Polarmuseet-rakennus aurinkoisena '
            + 'talvipäivänä, katolla ja seinustalla paksu lumikerros.',
          lahde: 'Illustratedjc, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Tromssan silta': {
      aika: '1960',
      teksti: 'Tromssan silta on jättimäinen betoninen kaari, joka '
          + 'yhdistää Tromsøyan saaren mantereeseen yli Tromsøysundetin '
          + 'salmen. Se on peräti 1036 metriä pitkä - siinä on 58 '
          + 'erillistä siltakaarta peräkkäin! Sillan pisin yksittäinen '
          + 'jänneväli on 80 metriä, ja laivat mahtuvat kulkemaan sen '
          + 'alta jopa 38 metrin korkeudessa.'
        + '\n\n'
        + 'Sillan rakentaminen alkoi vuonna 1958, ja se avattiin '
          + 'liikenteelle 3. heinäkuuta 1960. Valmistuessaan se oli '
          + 'koko Pohjois-Euroopan pisin silta - ja samalla ensimmäinen '
          + 'ulokerakenteinen (konsoli-) silta koko Norjassa! Ennen '
          + 'siltaa saarelle pääsi vain lautalla, joten silta muutti '
          + 'koko kaupungin elämän ja kasvun.'
        + '\n\n'
        + 'Nykyään silta on niin arvokas rakennelma, että Norjan '
          + 'muinaismuistoviranomaiset suojelivat sen vuonna 2000 - '
          + 'vaikka se onkin paljon nuorempi kuin useimmat suojellut '
          + 'kohteet.',
      kuvat: [
        {
          tiedosto: 'Tromsøsund bridge.jpg',
          selite: 'Tromssan silta kaartuu salmen yli kultaisessa iltavalossa, '
            + 'sillan pilarit heijastuvat tyyneen veteen.',
          lahde: 'Lars Tiede, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Tromso - 02a.jpg',
          selite: 'Tromssan silta kirkkaan sinisen taivaan alla kesäpäivänä, '
            + 'vuoret ja laivoja taustalla.',
          lahde: 'Jojo, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Tromssan tuomiokirkko': {
      aika: '1861',
      teksti: 'Tromssan tuomiokirkko on kokonaan puusta rakennettu '
          + 'keltainen kirkko, joka valmistui vuonna 1861 arkkitehti '
          + 'Christian Heinrich Groschin piirustusten mukaan. Se on '
          + 'ainoa Norjan luterilainen tuomiokirkko, joka on rakennettu '
          + 'puusta - ja sen sisään mahtuu yli 600 kirkkovierasta!'
        + '\n\n'
        + 'Paikalla on ollut kirkko jo satoja vuosia ennen tätäkin: '
          + 'kuningas Håkon IV rakennutti tänne kappelin jo vuonna '
          + '1252, ja sen jälkeen paikalla on ollut ainakin kaksi muuta '
          + 'kirkkoa ennen nykyistä rakennusta. Kellotorni valmistui '
          + 'vuotta myöhemmin, 1862, ja kirkkoa koristeltiin lisää '
          + 'vielä 1880-luvulla.'
        + '\n\n'
        + 'Isoisän vieraillessa Tromssassa 1873 kirkko oli vasta '
          + 'reilut kymmenen vuotta vanha - täysin uusi nähtävyys '
          + 'pienessä puukaupungissa! Kirkkoa pidetään todennäköisesti '
          + 'maailman pohjoisimpana protestanttisena tuomiokirkkona, '
          + 'sillä Tromssa sijaitsee lähes 69 leveysasteen kohdalla.',
      kuvat: [
        {
          tiedosto: 'TromsoDomkirkeFraRWithsPlass.JPG',
          selite: 'Tromssan puinen tuomiokirkko vinosti sivulta kuvattuna '
            + 'aurinkoisena päivänä, ohikulkijoita kirkon edustalla.',
          lahde: 'Osopolar, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          // Commonsin oma tiedostonimi on pitkä; se on pakko pitää yhdellä
          // rivillä, jotta peilaustyökalu poimii sen kokonaan.
          tiedosto: 'Tromsø Cathedral (domkirke) Norway interior. Gallery, Claus Jensen organ (orgel) 1863, chandelier (lysekrone), timber roof truss (takstoler) etc Wooden Gothic Revival style church 1861 2019-04-04 DSC02236.jpg',
          selite: 'Kirkon sisus parven kohdalta: urkujen valkokultainen '
            + 'julkisivu suippokaarineen, puiset kattoristikot ja '
            + 'kruunukynttilä.',
          lahde: 'Wolfmann, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Tromsø - no-nb digifoto 20160303 00124 bldsa L KK0091 (cropped).jpg',
          selite: 'Vanha mustavalkoinen valokuva 1800-luvun lopulta: Tromssan '
            + 'kaupunki rannasta kuvattuna, tuomiokirkon torni erottuu '
            + 'keskellä kattojen joukosta.',
          lahde: 'Knud Knudsen, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Jäämerenkatedraali: {
      aika: '1965',
      teksti: 'Jäämerenkatedraali (norjaksi Ishavskatedralen) on Tromssan '
          + 'tunnetuin rakennus, mutta se ei ole isoisän aikaan '
          + 'liittyvä nähtävyys - se rakennettiin vasta paljon '
          + 'myöhemmin, vuosina 1964-1965. Rakennustyöt alkoivat 1. '
          + 'huhtikuuta 1964, ja kirkko vihittiin käyttöön 19. '
          + 'marraskuuta 1965.'
        + '\n\n'
        + 'Arkkitehti Jan Inge Hovig suunnitteli kirkolle '
          + 'omalaatuisen muodon: sen terävät, taivasta kohti nousevat '
          + 'harjat muistuttavat läheisen Håja-saaren kaksoishuippuja. '
          + 'Rakennus on tehty valetusta, alumiinipäällysteisestä '
          + 'betonista, mikä oli 1960-luvulla hyvin moderni ratkaus.'
        + '\n\n'
        + 'Itäpäädyssä on vuonna 1972 valmistunut suurikokoinen '
          + 'lasimosaiikki \'Kristuksen paluu\', taiteilija Victor '
          + 'Sparren käsialaa. Kirkossa on tilaa noin 600 hengelle, ja '
          + 'siellä soi nykyään komea urku, jossa on 42 äänikertaa ja '
          + 'lähes 3000 pilliä.',
      kuvat: [
        {
          tiedosto: 'NOR-2016-Tromsø-Arctic Cathedral (Ishavskatedralen) 01 front.jpg',
          selite: 'Jäämerenkatedraali edestä kuvattuna aurinkoisena päivänä, '
            + 'kirkas sininen taivas ja vihreä nurmi ympärillä.',
          lahde: 'Godot13, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Arctic Cathedral Midnight Sun.JPG',
          selite: 'Jäämerenkatedraali sivulta kuvattuna '
            + 'auringonlaskun/keskiyön auringon oranssissa valossa, rivat '
            + 'kimmeltävät.',
          lahde: 'Molde20, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Arctic Cathedral in Tromsoe.jpg',
          selite: 'Jäämerenkatedraali iltavalossa tummaa vuorenrinnettä '
            + 'vasten, pieniä norjalaistaloja edustalla.',
          lahde: 'Henrik, Wikimedia Commons (CC BY 2.5)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Polaria: {
      aika: '1998',
      teksti: 'Polaria on maailman pohjoisin akvaario, ja se avattiin '
          + 'Tromssan rantaan toukokuussa 1998. Rakennuksen muoto ei '
          + 'ole sattumaa: se on suunniteltu näyttämään jäälautoilta, '
          + 'jotka meri on työntänyt rantaan - aivan kuin arktisella '
          + 'merellä oikeasti tapahtuu myrskyjen aikana.'
        + '\n\n'
        + 'Akvaarion tähtiä ovat koulutetut partahylkeet, joita voi '
          + 'katsella altaan reunalta tai kävellä niiden \'alla\' '
          + 'läpinäkyvässä tunnelissa altaan pohjan alla. Muissa '
          + 'näyttelyissä pääsee tutustumaan Norjan rannikon kaloihin '
          + 'ja eläimiin, ja viisiruutuisessa '
          + 'panoraamaelokuvateatterissa voi kokea arktisen luonnon '
          + 'aivan uudella tavalla.'
        + '\n\n'
        + 'Polarian pihapiirissä on myös oma pieni museo, jossa '
          + 'säilytetään Polstjerna-nimistä vanhaa hylkeenpyyntialusta '
          + '- todiste siitä, että Tromssa oli isoisänkin aikaan tärkeä '
          + 'pyyntikaupunki.',
      kuvat: [
        {
          tiedosto: 'Polaria museum, Tromsø, Norway.jpg',
          selite: 'Polarian jääpaanmuotoiset vinot seinäelementit kultaisessa '
            + 'iltavalossa, ikkunoista loistaa lämmin valo.',
          lahde: 'Jeroen Komen, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Polaria winter.jpg',
          selite: 'Polaria talvi-iltana lumisateessa, ikkunat hehkuvat '
            + 'keltaisina lumihiutaleiden keskellä.',
          lahde: 'Lee Dyer, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Fjellheisenin köysirata': {
      aika: '1961',
      teksti: 'Fjellheisen on köysirata, joka nostaa matkustajat Tromssan '
          + 'laidalta ylös Storsteinen-vuorelle, 420 metrin korkeuteen '
          + 'merenpinnasta. Matka kestää vain neljä minuuttia, mutta '
          + 'näkymä ylhäältä palkitsee: koko kaupunki, saaret ja vuonot '
          + 'avautuvat jalkojen alle.'
        + '\n\n'
        + 'Köysirata rakennettiin laivayhtiö Brødrene Jakobsens '
          + 'Rederin toimesta, ja se avattiin yleisölle 22. helmikuuta '
          + '1961 - siis lähes sata vuotta isoisän matkan jälkeen. '
          + 'Ylhäällä on Fjellstua-niminen ravintola, ja monet jatkavat '
          + 'matkaa jalan vielä korkeammalle, Tromsdalstindenin '
          + 'huipulle (1238 metriä).'
        + '\n\n'
        + 'Kesäisin ylhäältä näkee yötöntä yötä eli keskiyön '
          + 'aurinkoa, ja talvella paikka on yksi parhaista revontulien '
          + 'katselupaikoista koko kaupungissa.',
      kuvat: [
        {
          tiedosto: 'Fjellheisen, Tromsø 2019.jpg',
          selite: 'Fjellheisenin yläasema näköalatasanteineen, ihmisiä '
            + 'kaiteella katsomassa Tromssan kaupunkia ja siltaa '
            + 'alhaalla.',
          lahde: 'Olivier Bruchez, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Fjellheisen view Tromsø 02.jpg',
          selite: 'Fjellheisenin yläasema ja ravintolarakennus, taustalla '
            + 'lumihuippuiset vuoret ja vuono.',
          lahde: 'weisserstier, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Tromsø Cable cars Fjellheisen 06.jpg',
          selite: 'Punainen köysiratakoppi matkalla ylös vihreää '
            + 'vuorenrinnettä pitkin, pilvinen sininen taivas taustalla.',
          lahde: 'Ad Meskens, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  dubrovnik: {
    'Minčetan torni': {
      aika: '1463–1464',
      teksti: 'Minčetan torni ei ollut alun perin kovin vaikuttava: '
          + 'vuonna 1319 samalla paikalla seisoi vaatimaton '
          + 'nelikulmainen linnoitus, joka sai nimensä sen maat '
          + 'omistaneelta Menčetićin suvulta. Kaikki muuttui '
          + '1400-luvulla, kun Osmanien valtakunta alkoi uhata '
          + 'Dubrovnikia. Paavi Pius II lähetti kaupunkiin italialaisia '
          + 'insinöörejä, ja he suunnittelivat yhdessä paikallisen '
          + 'rakentajan Nicifor Ranjinan kanssa tornille kokonaan uuden '
          + 'muodon.'
        + '\n\n'
        + 'Työtä johti kuuluisa firenzeläinen arkkitehti Michelozzo, '
          + 'ja korkean, pyöreän tornin lopullisen piirustuksen teki '
          + 'kuvanveistäjä Giorgio da Sebenico. Torni valmistui vuonna '
          + '1464, ja sen muurit ovat paikoin jopa kuusi metriä paksut! '
          + 'Muurien sisään rakennettiin suojattuja ampuma-aukkoja, '
          + 'joista tykit osoittivat kaupungin ulkopuolelle.'
        + '\n\n'
        + 'Minčetan torni kohoaa Dubrovnikin korkeimmalla kukkulalla, '
          + 'ja siitä tuli kaupungin voittamattomuuden symboli - vielä '
          + '1800-luvun alun sodissakin viholliset ampuivat tornia '
          + 'tykeillä, mutta se pysyi pystyssä. Tornin alta on löydetty '
          + 'myös yli 500 vuotta vanha tykkivalimo, jossa metallia '
          + 'sulatettiin kanuunoiksi; nykyään paikka toimii pienenä '
          + 'museona.',
      kuvat: [
        {
          tiedosto: 'Dusk Carresed the Tower Fondly (27368304931).jpg',
          selite: 'Minčetan pyöreä puolustustorni kaupunginmuurin päällä '
            + 'lämpimässä ilta-auringossa, taivaalla ohut '
            + 'suihkuvanajuova.',
          lahde: 'Los Paseos, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Minceta Fortress, Dubrovnik, 16th century (2) (30113651035).jpg',
          selite: 'Minčetan torni alhaalta viistosti kuvattuna, harmaa '
            + 'hammastettu muuri kirkasta sinistä taivasta vasten.',
          lahde: 'Richard Mortel, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Ludwig Hans Fischer Dubrovnik Minčeta-Festung.jpg',
          selite: 'Itävaltalaisen taidemaalari Ludwig Hans Fischerin '
            + 'akvarelli Minčetan tornista kukkivan puutarhan takaa, '
            + 'maalattu ennen vuotta 1915.',
          lahde: 'Ludwig Hans Fischer, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pilen portti': {
      aika: '1471–1628',
      teksti: 'Pilen portti on Dubrovnikin vanhankaupungin näyttävin '
          + 'sisäänkäynti, ja se avautuu lännestä saapuvalle tielle. '
          + 'Portti ei ole vain yksi ovi vaan kokonainen '
          + 'puolustusjärjestelmä: kaksi erillistä porttia ja niiden '
          + 'välissä silta kuivan vallihaudan yli. Alun perin silta oli '
          + 'puinen nostosilta, joka vedettiin joka ilta ylös - kukaan '
          + 'ei päässyt sisään eikä ulos ennen aamua.'
        + '\n\n'
        + 'Sisäportille johtava kivisilta suunniteltiin vuonna 1471, '
          + 'ja ulompi portti valmistui vasta paljon myöhemmin, vuonna '
          + '1628. Porttien yllä katselee kiveen veistetty pyhä '
          + 'Blasius, Dubrovnikin suojeluspyhimys, sylissään '
          + 'pienoismalli koko kaupungista - ikään kuin hän vartioisi '
          + 'sitä käsissään.'
        + '\n\n'
        + 'Vuonna 1806 ranskalaiset joukot valtasivat Dubrovnikin, ja '
          + 'pian sen jälkeen yli 400 vuotta itsenäisenä pysynyt '
          + 'tasavalta lakkasi olemasta. Nykyään portin sisäpuolelta '
          + 'pääsee kiipeämään suoraan kaupunginmuurille - Pilen portti '
          + 'on yksi vain kolmesta paikasta koko muurilla, josta '
          + 'muurikävelyn voi aloittaa.',
      kuvat: [
        {
          tiedosto: 'Dubrovnik Pile (33547873443).jpg',
          selite: 'Pilen portti ja sen edessä oleva kivinen silta '
            + 'aurinkoisena päivänä, Kroatian lippu liehuu tornissa ja '
            + 'pieni ihmisjoukko kävelee sillalla.',
          lahde: 'Jorge Franganillo, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'ETH-BIB-Dobrovnik, Pile-Tor-Dia 247-09508.tif',
          selite: 'Käsin väritetty valokuva Pilen portista vuodelta 1936, '
            + 'hienoihin takkeihin pukeutuneita ihmisiä seisoo portin '
            + 'edustalla.',
          lahde: 'Leo Wehrli, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sponzan palatsi': {
      aika: '1516–1522',
      teksti: 'Sponzan palatsi rakennettiin vuosina 1516–1522 arkkitehti '
          + 'Paskoje Miličevićin suunnitelmien mukaan, ja se yhdistelee '
          + 'kahta tyyliä: osa rakennuksesta on goottilaista, osa '
          + 'renessanssia. Nimi \'Sponza\' tulee latinan sanasta, joka '
          + 'tarkoittaa paikkaa, johon sadevesi kerääntyy - katoilta '
          + 'valuva vesi kerääntyi juuri tämän talon pihalle.'
        + '\n\n'
        + 'Palatsissa toimi melkein kaikki, mitä kaupungin '
          + 'talouselämä tarvitsi: tulli, tavaravarasto, rahapaja, '
          + 'asevarasto ja pankki, kaikki saman katon alla! Sisäpihan '
          + 'holvikäytävässä kauppiaat punnitsivat tavaransa julkisesti '
          + 'niin, ettei kukaan voinut huijata - seinään oli hakattu '
          + 'latinankielinen muistutus rehellisyydestä.'
        + '\n\n'
        + 'Kun valtava maanjäristys tuhosi suuren osan Dubrovnikista '
          + 'vuonna 1667, Sponzan palatsi selvisi lähes '
          + 'vahingoittumattomana. Nykyään rakennuksessa säilytetään '
          + 'kaupungin arkistoa, jonka vanhimmat asiakirjat ovat '
          + 'peräisin jo 1000-luvulta - hyllyillä lepää yhteensä noin '
          + '100 000 käsin kirjoitettua asiakirjaa.',
      lainaus: {
        teksti: 'Meidän vaakamme eivät salli petosta. Kun punnitsen '
          + 'tavaroita, Jumala punnitsee kanssani.',
        lahde: 'Latinankielinen kirjoitus Sponzan palatsin pihakäytävässä',
      },
      kuvat: [
        {
          tiedosto: 'Sponza Palace, Dubrovnik, 16th century (1) (29859239440).jpg',
          selite: 'Sponzan palatsin renessanssijulkisivu holvikaarineen, '
            + 'goottilaisine kaksoisikkunoineen ja kellotorneineen.',
          lahde: 'Richard Mortel, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Paleis Sponza te Dubrovnik Ragusa. Palazzo Sponza. (serietitel), RP-F-1919-182.jpg',
          selite: 'Vanha valokuva Sponzan palatsista noin vuosilta 1890–1900, '
            + 'muutama ohikulkija seisoo aukiolla arkadikäytävän edessä.',
          lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Vanhasatama: {
      aika: '1100-luku–1873',
      teksti: 'Vanhasatama oli Dubrovnikin sydän jo kauan ennen kuin '
          + 'nykyistä kaupunkia rakennettiin - satama-alueelta on '
          + 'löytynyt yli 2000 vuotta vanhoja kolikoita ja muita '
          + 'jäänteitä ajalta ennen Rooman valtakuntaakin. Myöhemmin '
          + 'satamasta lähti liikkeelle Dubrovnikin tasavallan mahtava '
          + 'kauppalaivasto, joka teki pienestä kaupunkivaltiosta yhden '
          + 'Adrianmeren rikkaimmista.'
        + '\n\n'
        + 'Sataman reunalla kohoaa kolme valtavaa kiviholvia - alun '
          + 'perin niitä oli neljä, mutta yksi muurattiin myöhemmin '
          + 'umpeen. Holvien takana sijaitsi telakka, jossa tasavallan '
          + 'laivat rakennettiin ja korjattiin jo 1100-luvulta lähtien. '
          + 'Sataman suulla vartioi Pyhän Johanneksen linnake, joka '
          + 'esti vihollislaivoja pääsemästä sisään; nykyään linnakkeen '
          + 'sisällä on akvaario.'
        + '\n\n'
        + 'Satamaa suojasi myös kaksi kivistä aallonmurtajaa: Kaše '
          + 'vuodelta 1485 ja Porporela, joka valmistui vuonna 1873 - '
          + 'täsmälleen samana vuonna, kun isoisän matkapäiväkirja '
          + 'alkaa! Vaaran uhatessa sataman suun saattoi vielä sulkea '
          + 'raskailla ketjuilla, jotka vedettiin linnakkeen ja '
          + 'aallonmurtajan väliin.',
      kuvat: [
        {
          tiedosto: '31.12.16 Dubrovnik 3 Around Sunset 40 (31635072250).jpg',
          selite: 'Vanhasatama iltavalossa ylhäältä kuvattuna: satama-allas '
            + 'veneineen, Lovrijenacin niemi vasemmalla ja punakattoinen '
            + 'vanhakaupunki taustalla.',
          lahde: 'Donald Judge, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Croatia-01870 - Old Port (10091210236).jpg',
          selite: 'Vanhasataman veneitä ja vanhan telakkarakennuksen '
            + 'holvikaaria aurinkoisena päivänä, matkustajia ja veneitä '
            + 'rannassa.',
          lahde: 'Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Lovrijenacin linnake': {
      aika: '1301',
      teksti: 'Tarinan mukaan Dubrovnikin asukkaat rakensivat '
          + 'Lovrijenacin linnakkeen vain kolmessa kuukaudessa, kun he '
          + 'kuulivat Venetsian aikovan pystyttää oman linnoituksensa '
          + 'samalle kalliolle kaupungin länsipuolelle. Kun '
          + 'venetsialaiset laivat lopulta saapuivat tuomaan '
          + 'rakennustarvikkeita, linnake seisoi jo valmiina - ja '
          + 'laivat käännytettiin takaisin merelle. Ensimmäinen '
          + 'kirjallinen maininta linnakkeesta on vuodelta 1301.'
        + '\n\n'
        + 'Linnake kohoaa 37 metrin korkeudessa meren yllä, ja sen '
          + 'pohjapiirros on kolmion muotoinen. Merta kohti osoittavat '
          + 'muurit ovat lähes 12 metriä paksut, mutta kaupunkiin päin '
          + 'katsovat seinät vain noin 60 senttimetriä - '
          + 'dubrovnikilaiset luottivat siihen, ettei heidän oma '
          + 'kaupunkinsa koskaan hyökkäisi omaa linnakettaan vastaan. '
          + 'Linnaketta puolusti kymmenen suurta tykkiä, joista '
          + 'suurinta kutsuttiin nimellä \'Gušter\', eli Lisko.'
        + '\n\n'
        + 'Portin yläpuolella on yhä luettavissa latinankielinen '
          + 'lause, joka kertoi koko Dubrovnikin tasavallan '
          + 'tärkeimmästä arvosta. Nykyään linnakkeen sisäpihalla '
          + 'esitetään kesäisin näytelmiä, ja se on yksi Dubrovnikin '
          + 'kesäfestivaalin kuuluisimmista näyttämöistä.',
      lainaus: {
        teksti: 'Vapautta ei myydä kaikella maailman kullalla.',
        lahde: 'Latinankielinen kirjoitus Lovrijenacin linnakkeen portin '
          + 'yllä (\'Non bene pro toto libertas venditur auro\')',
      },
      kuvat: [
        {
          tiedosto: 'Croatia-01664 - Fortress Lovrijenac (10088562716).jpg',
          selite: 'Lovrijenacin linnake jyrkän kallion päällä, kirkas sininen '
            + 'taivas ja meri ympärillä, ei muita rakennuksia näkyvissä.',
          lahde: 'Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Bokar Fortress and the Old Town of Dubrovnik, Croatia (48613181692).jpg',
          selite: 'Ilmakuva Lovrijenacin linnakkeesta merelle työntyvällä '
            + 'niemellä, taustalla vanhankaupungin muurit ja punaiset '
            + 'katot.',
          lahde: 'Dronepicr, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'ETH-BIB-Dobrovnik, Fort Lovrijenac vom Hôtel Impérial-Dia 247-09506.tif',
          selite: 'Käsin väritetty valokuva Lovrijenacin linnakkeesta '
            + 'vuodelta 1936, kuvattu Hotel Imperialista käsin, alla '
            + 'punakattoisia taloja.',
          lahde: 'Leo Wehrli, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Dubrovnikin katedraali': {
      aika: '1671–1713',
      teksti: 'Tarinan mukaan Englannin kuningas Rikhard Leijonamieli '
          + 'haaksirikkoutui lähellä Lokrumin saarta vuonna 1192 '
          + 'palatessaan ristiretkeltä. Pelastuttuaan hengissä hän '
          + 'lupasi rakentaa kirkon kiitokseksi - ja rahoitti osan '
          + 'Dubrovnikiin nousseesta ensimmäisestä kirkosta.'
        + '\n\n'
        + 'Tuo vanha kirkko vaurioitui pahasti vuoden 1667 valtavassa '
          + 'maanjäristyksessä, joka mullisti koko kaupungin. '
          + 'Dubrovnikilaiset eivät kuitenkaan luovuttaneet: uuden '
          + 'katedraalin rakentaminen alkoi vuonna 1671 ja kesti peräti '
          + '42 vuotta, kunnes se valmistui vuonna 1713. Roomalainen '
          + 'arkkitehti Andrea Buffalini suunnitteli komean, '
          + 'kupolikattoisen rakennuksen, joka on 41 metriä pitkä.'
        + '\n\n'
        + 'Katedraalin aarrekammiossa säilytetään 182 '
          + 'pyhäinjäännöslipasta, joista osa sisältää kaupungin '
          + 'suojeluspyhimyksen, pyhän Blasiuksen, jäännöksiä. '
          + 'Pääalttarin yllä riippuu myös kuuluisan italialaismaalari '
          + 'Tizianon maalaama taulu. Katedraali on selvinnyt '
          + 'vuosisatojen varrella sekä maanjäristyksistä että sodista '
          + 'ja seisoo yhä ylpeänä keskellä vanhaakaupunkia.',
      kuvat: [
        {
          tiedosto: 'Façana de la catedral de Dubrovnik.JPG',
          selite: 'Dubrovnikin katedraalin barokkijulkisivu pylväineen ja '
            + 'patsaineen kirkkaan sinistä taivasta vasten, kupoli '
            + 'siintää yläkulmassa.',
          lahde: 'Joanbanjo, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Cathedral of the Assumption, Dubrovnik, 1713 (1) (29933670232).jpg',
          selite: 'Katedraalin kupoli ja sivujulkisivu patsaineen viistosta '
            + 'alakulmasta kuvattuna.',
          lahde: 'Richard Mortel, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Ragusa. Duomo LCCN2017660935.jpg',
          selite: 'Väritetty 1890-luvun photochrom-valokuva Dubrovnikin '
            + '(silloisen Ragusan) tuomiokirkosta, kuvattu viistosti '
            + 'ylhäältä portaineen ja kupoleineen.',
          lahde: 'Photoglob Co., Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  riika: {
    Vapaudenpatsas: {
      aika: '1935',
      teksti: 'Riian keskustassa kohoaa 42 metriä korkea Vapaudenpatsas, '
          + 'joka pystytettiin vuonna 1935 muistoksi Latvian '
          + 'itsenäisyyssodassa 1918–1920 kaatuneille sotilaille. '
          + 'Patsaan huipulla seisoo Vapaus-niminen naishahmo, jota '
          + 'latvialaiset kutsuvat hellästi Mildaksi. Hän pitelee '
          + 'käsissään kolmea kultaista tähteä, jotka kuvaavat Latvian '
          + 'kolmea vanhaa maakuntaa: Vidzemeä, Latgalea ja '
          + 'Kuurinmaata.'
        + '\n\n'
        + 'Patsaan kivi- ja graniittiosien veistämiseen kului yli 300 '
          + '000 työtuntia – yhdeltä kivenveistäjältä olisi mennyt '
          + 'siihen yli sata vuotta! Patsas seisoo paikalla, jossa '
          + 'aiemmin oli Venäjän tsaari Pietari Suuren '
          + 'ratsastajapatsas. Kun Neuvostoliitto miehitti Latvian, '
          + 'monet pelkäsivät patsaan tuhoamista, mutta se säilyi – '
          + 'kerrotaan, että kuuluisa kuvanveistäjä Vera Muhina piti '
          + 'sitä liian arvokkaana hävitettäväksi.'
        + '\n\n'
        + 'Vuonna 1987 patsaan juurelle kokoontui salaa tuhansia '
          + 'ihmisiä tuomaan kukkia, vaikka se oli Neuvostoliiton '
          + 'aikaan vaarallista. Se oli yksi ensimmäisistä merkeistä '
          + 'siitä, että latvialaiset halusivat vapautensa takaisin – '
          + 'ja vuonna 1991 Latvia itsenäistyi uudelleen.',
      lainaus: {
        teksti: 'Tēvzemei un Brīvībai – Isänmaalle ja vapaudelle',
        lahde: 'Patsaan juurella oleva latviankielinen kaiverrus, '
          + 'kirjailija Kārlis Skalben sanoin',
      },
      kuvat: [
        {
          tiedosto: 'Brīvības laukums.jpg',
          selite: 'Vapaudenpatsas Brīvības-aukion perällä iltapäivän '
            + 'auringossa, avara näkymä puiden reunustamalta '
            + 'kävelyväylältä.',
          lahde: 'DaceX, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Centrs, Centra rajons, Rīga, Latvia - panoramio (11).jpg',
          selite: 'Kunniavartiosto univormuissaan ja kivääreineen '
            + 'Vapaudenpatsaan juurella harmaana marraskuun päivänä.',
          lahde: 'alinco_fan, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kolme veljestä': {
      aika: '1400-luvun loppu–1746',
      teksti: 'Riian vanhassa kaupungissa, kapealla Mazā Pils -kadulla, '
          + 'seisoo vierekkäin kolme erinäköistä taloa, joita kutsutaan '
          + 'Kolmeksi veljeksi. Ne ovat koko Riian vanhin säilynyt '
          + 'asuinrakennusten rivi. Vanhin veljeksistä on peräisin '
          + '1400-luvun lopulta, ja alun perin siellä oli vain yksi '
          + 'suuri huone sekä ullakko tavaroiden säilytystä varten.'
        + '\n\n'
        + 'Keskimmäinen talo sai nykyisen ulkoasunsa vuonna 1646, '
          + 'mutta sen koristeellinen kivinen ovensuu lisättiin vasta '
          + 'sata vuotta myöhemmin, vuonna 1746. Nuorin veljeksistä '
          + 'rakennettiin 1600-luvun lopulla, ja se on kapea, '
          + 'koristeellinen barokkitalo.'
        + '\n\n'
        + 'Sodan jälkeen talot olivat pahoin rapistuneet, mutta ne '
          + 'kunnostettiin 1950-luvulla. Vuonna 2020 Kolme veljestä sai '
          + 'arvostetun Euroopan perintötunnuksen. Nykyään taloissa '
          + 'toimii Latvian arkkitehtuurimuseo, joten sisään pääsee yhä '
          + 'tutustumaan siihen, miltä Riiassa näytti satoja vuosia '
          + 'sitten.',
      kuvat: [
        {
          tiedosto: 'Riga - The three brothers - trīs brāļi - panoramio.jpg',
          selite: 'Kolme veljestä -taloryhmä Mazā Pils -kadulla: kolme '
            + 'eri-ikäistä ja -väristä porrastalojulkisivua vierekkäin '
            + 'sinistä taivasta vasten.',
          lahde: 'giggel, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Riian tuomiokirkko': {
      aika: '1211',
      teksti: 'Riian tuomiokirkko on Baltian maiden suurin keskiaikainen '
          + 'kirkko. Sen ensimmäinen kivi muurattiin jo vuonna 1211 '
          + 'piispa Albertin toimesta, lähelle Väinäjoen rantaa. '
          + 'Tiilistä muurattu punertava kirkko näkyy kauas, ja sen '
          + 'tornin huipulla pyörii viiri, jota riikalaiset ovat '
          + 'vuosisatoja käyttäneet tuulen – ja tarinoiden mukaan '
          + 'onnenkin – tarkkailuun.'
        + '\n\n'
        + 'Kirkon sisällä soi yksi Euroopan suurimmista urkuista: yli '
          + '6700 pilliä käsittävä soitin valmistui vuonna 1883, ja '
          + 'sitä soitettiin ensi kertaa tammikuussa 1884. Urkuja voi '
          + 'soittaa neljällä eri näppäimistöllä yhtä aikaa.'
        + '\n\n'
        + 'Neuvostoaikana kirkossa ei saanut pitää jumalanpalveluksia '
          + 'viiteenkymmeneen vuoteen – tilassa toimi sen sijaan '
          + 'konserttisali ja museo. Vasta vuonna 1991, kun Latvia oli '
          + 'itsenäistynyt uudelleen, kirkko avattiin taas '
          + 'seurakuntalaisille.',
      kuvat: [
        {
          tiedosto: '2025 Riga Cathedral (01).jpg',
          selite: 'Riian tuomiokirkko aurinkoisena kesäpäivänä Doma laukums '
            + '-aukiolta kuvattuna, punatiilinen julkisivu ja kupolitorni '
            + 'erottuvat selvästi sinistä taivasta vasten.',
          lahde: 'Chris06, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Dome Square, Riga, Latvia, 1930s.jpg',
          selite: 'Doman aukio lumisena talvipäivänä 1930-luvulla, '
            + 'tuomiokirkon torni kohoaa kapean katukuilun päässä ja '
            + 'kadulla näkyy vanha auto.',
          lahde: 'Roberts Johansons, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: '2013 Домский собор в Риге -panoramio.jpg',
          selite: 'Tuomiokirkko lumisena talvipäivänä aukion laidalta '
            + 'kuvattuna, ohikulkijoita etualalla ja kirkas sininen '
            + 'taivas.',
          lahde: 'Валерий Дед, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pyhän Pietarin kirkko': {
      aika: '1209–1746',
      teksti: 'Pyhän Pietarin kirkko mainitaan Riian asiakirjoissa jo '
          + 'vuonna 1209, ja se on yksi kaupungin vanhimmista '
          + 'rakennuksista. Sen torni on ollut vuosisatojen ajan Riian '
          + 'korkein rakennelma – mutta myös yksi onnettomimmista: '
          + 'torni on romahtanut ja palanut useita kertoja historian '
          + 'aikana.'
        + '\n\n'
        + 'Vuonna 1666 aiempi 136 metriä korkea puutorni romahti ja '
          + 'surmasi kahdeksan ihmistä. Uusi torni valmistui 1690, ja '
          + 'se oli 148 metriä korkea – tuolloin koko Euroopan korkein '
          + 'puurakennelma! Salama tuhosi tornin taas vuonna 1721, ja '
          + 'seuraava, matalampi torni valmistui vasta 1746. Toisessa '
          + 'maailmansodassa vuonna 1941 tykistö tuhosi koko kirkon, ja '
          + 'nykyinen torni valmistui jälleenrakennettuna vasta '
          + '1970-luvulla.'
        + '\n\n'
        + 'Tornin huipulla kiiltää kukonviiri, joka painaa 158 kiloa '
          + 'ja on kullattu. Hississä pääsee 72 metrin korkeuteen '
          + 'katselemaan Riian kattoja, ja kirkonkello soittaa '
          + 'latvialaista kansansävelmää viisi kertaa päivässä – vaikka '
          + 'kellossa on vain yksi viisari, joka näyttää pelkät tunnit!',
      kuvat: [
        {
          tiedosto: 'Plaza del Ayuntamiento, Riga, Letonia, 2012-08-07, DD 24.JPG',
          selite: 'Pyhän Pietarin kirkon korkea kerroksittainen torni kohoaa '
            + 'Rātslaukums-aukion yllä, etualalla myös Mustapäiden talon '
            + 'julkisivu.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Riga - St. Peter’s Church - Pētera baznīca - panoramio.jpg',
          selite: 'Pyhän Pietarin kirkon julkisivu ja koko torni suoraan '
            + 'edestä kuvattuna, muutama ohikulkija kirkon ovella.',
          lahde: 'giggel, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Mustapäiden talo': {
      aika: '1334 (jälleenrakennettu 1999)',
      teksti: 'Mustapäiden talo rakennettiin Riian vanhaan kaupunkiin jo '
          + 'vuonna 1334 kauppiaiden varastoksi ja kokoontumispaikaksi. '
          + '1400-luvun puolivälistä lähtien taloa käytti myös '
          + 'Mustapäiden veljeskunta – naimattomien kauppiaiden, '
          + 'laivanomistajien ja ulkomaalaisten kilta, joka piti '
          + 'talossa juhlia ja kokouksia.'
        + '\n\n'
        + 'Talon kerrotaan olevan paikka, jonne pystytettiin '
          + 'ensimmäinen koristeltu joulukuusi vuonna 1510! Talo säilyi '
          + 'näyttävänä satoja vuosia, kunnes toinen maailmansota '
          + 'pommitti sen raunioiksi kesäkuussa 1941. '
          + 'Neuvostoviranomaiset purkivat jäljellä olleet seinät '
          + 'kokonaan vuonna 1948, vaikka riikalaiset vastustivat sitä '
          + 'voimakkaasti.'
        + '\n\n'
        + 'Talo rakennettiin kokonaan uudelleen vuosina 1996–2000 '
          + 'vanhojen tutkimusten ja piirustusten avulla – yli 5000 '
          + 'riikalaista osallistui talkoisiin lahjoittamalla tiiliä. '
          + 'Talon kellari on ainoa alkuperäinen osa, joka säilyi '
          + 'sodasta: siellä on yhä 1300-luvun kivimuureja, ja kellari '
          + 'oli piilossa maan alla aina vuoteen 1992 asti.',
      kuvat: [
        {
          tiedosto: '2025 House of Blackheads (Riga) (01).jpg',
          selite: 'Mustapäiden talon koristeellinen renessanssijulkisivu '
            + 'Rātslaukums-aukiolla, kirkkaan sininen taivas taustalla.',
          lahde: 'Chris06, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'House of the Blackheads.jpg',
          selite: 'Mustapäiden talo valaistuna sinisellä hämärätunnilla, '
            + 'edessä Roland-patsas miekka pystyssä. Julkisivun yläosassa '
            + 'erottuvat kello ja vaakunat.',
          lahde: 'Shawn M. Kent, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Riga house of the blackheads.jpg',
          selite: 'Mustapäiden talo ja Roland-patsas aukiolla vanhassa '
            + 'sepiapostikortissa 1900-1918-luvulta, ennen talon '
            + 'tuhoutumista toisessa maailmansodassa.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Keskustori: {
      aika: '1924–1930',
      teksti: 'Riian Keskustori on Euroopan suurin markkinahalli – viisi '
          + 'valtavaa paviljonkia peittävät yhteensä yli 72 000 '
          + 'neliömetriä, ja niissä on tilaa yli 3000 myyntipaikalle. '
          + 'Halli rakennettiin vuosina 1924–1930, ja ensimmäiset '
          + 'kaupat käytiin marraskuussa 1930.'
        + '\n\n'
        + 'Paviljonkien katoissa on kummallinen salaisuus: niiden '
          + 'metallirungot ovat peräisin ensimmäisen maailmansodan '
          + 'aikaisista saksalaisista zeppeliinihalleista, jotka '
          + 'purettiin ja koottiin uudelleen torin katoiksi. Maailmassa '
          + 'on jäljellä enää yhdeksän tällaista zeppeliinihallia, ja '
          + 'peräti viisi niistä on juuri Riian Keskustorilla.'
        + '\n\n'
        + 'Vuonna 1998 Keskustori liitettiin Unescon '
          + 'maailmanperintöluetteloon yhdessä koko Riian '
          + 'vanhankaupungin kanssa. Rakennus yhdistää siistiä '
          + 'uusklassismia ja tyylikästä art deco -koristelua, ja '
          + 'valmistuessaan se oli maailman suurin ja nykyaikaisin '
          + 'markkinapaikka.',
      kuvat: [
        {
          tiedosto: 'Riga Central Market in the Evening (55010487126).jpg',
          selite: 'Riian keskustorin viisi kaarihallia ilmakuvassa '
            + 'iltavalossa, taustalla Tiedeakatemian torni ja '
            + 'vaaleanpunertavat pilvet.',
          lahde: 'Michael Kuhn, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Riga Central Market.01.jpg',
          selite: 'Keskustorin päähallin sisäänkäynti sinisellä '
            + 'hämärätunnilla, suuret ikkunat valaistuina sisältä.',
          lahde: 'Nenea hartia, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  vilna: {
    'Gediminaksen torni': {
      aika: '1409',
      teksti: 'Legenda kertoo, että suurruhtinas Gediminas näki noin '
          + 'vuonna 1323 metsästysretkellä unta rautaisesta sudesta, '
          + 'joka ulvoi kukkulan laella niin kovaa kuin sata sutta '
          + 'yhdessä. Hovin tietäjä Lizdeika selitti unen tarkoittavan, '
          + 'että juuri sille kukkulalle pitäisi rakentaa mahtava '
          + 'linnoituskaupunki. Näin sai alkunsa Vilna.'
        + '\n\n'
        + 'Ensin kukkulalle nousi puulinnoitus, mutta vuonna 1409 '
          + 'suurruhtinas Vytautas rakennutti tilalle punatiilisen '
          + 'linnan. Vuosisatojen saatossa suurin osa linnasta romahti '
          + 'tai purettiin, ja jäljelle jäi vain yksi kolmikerroksinen '
          + 'torni. Se, mitä tornista näkyy tänään, on suurelta osin '
          + 'vuonna 1933 tehdyn jälleenrakennuksen näköinen.'
        + '\n\n'
        + 'Torni on tärkeä koko Liettualle: kun maa alkoi irrottautua '
          + 'Neuvostoliitosta, kansallislippu nostettiin torniin '
          + 'lokakuun 7. päivänä 1988. Nykyään tornissa on museo '
          + 'vanhoine aseineen ja linnan pienoismalleineen, ja hississä '
          + 'pääsee ylös ihailemaan koko Vilnan kattojen merta.',
      kuvat: [
        {
          tiedosto: 'Gediminas Tower (9651326233).jpg',
          selite: 'Gediminaksen torni mäen laella, rinteen juurelta '
            + 'kuvattuna. Punatiilisen kahdeksankulmaisen tornin huipulla '
            + 'liehuu Liettuan lippu.',
          lahde: 'Bernt Rostad, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Gedimino kalnas 139.jpg',
          selite: 'Ilmakuva Gediminaksen tornista auringonlaskun aikaan, '
            + 'alapuolella alalinnan raunioita ja valaistu '
            + 'tuomiokirkonaukio.',
          lahde: 'Gytis Grižas, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'View of Vilnius Upper Castle with remaining Gediminas Tower.jpg',
          selite: '1861 puupiirros Vilnan linnanmäestä: Gediminaksen torni ja '
            + 'alalinnan rauniot kukkulalla, kaupunki ja joki '
            + 'alapuolella.',
          lahde: 'Julian Cegliński, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Vilnan tuomiokirkko': {
      aika: '1783',
      teksti: 'Vilnan tuomiokirkko näyttää ulkoa kreikkalaiselta '
          + 'temppeliltä pylväineen, mutta sen alla piileskelee yli 700 '
          + 'vuoden historia. Paikalla on seissyt kirkko jo '
          + '1200-luvulta lähtien, ja arkeologit ovat löytäneet maan '
          + 'alta jopa vanhan pakanatemppelin jäänteitä. Nykyinen '
          + 'valkoinen kirkko sai lopullisen muotonsa vuonna 1783, kun '
          + 'se rakennettiin uudelleen aiempien tulipalojen tuhottua '
          + 'edelliset kirkot.'
        + '\n\n'
        + 'Katolla seisoo kolme kivipatsasta, ja keskimmäisen, Pyhän '
          + 'Helenan, käsissä kohoaa yhdeksän metriä korkea kultainen '
          + 'risti. Neuvostoaikana patsaat purettiin katolta vuonna '
          + '1950, koska uskonto ei silloin ollut suosiossa – ne '
          + 'nostettiin takaisin paikoilleen vasta vuonna 1997.'
        + '\n\n'
        + 'Kirkon alla olevissa holvihaudoissa lepää muun muassa '
          + 'suurruhtinas Vytautas ja kaunis Barbara Radvila, jonka '
          + 'salainen avioliitto kuninkaan kanssa on yksi Liettuan '
          + 'tunnetuimmista rakkaustarinoista. Neuvostoaikana koko '
          + 'kirkosta tehtiin varasto, ja messut pääsivät alkamaan '
          + 'uudelleen vasta vuonna 1988.',
      kuvat: [
        {
          tiedosto: 'Vilnius (Wilno) - cathedral.jpg',
          selite: 'Vilnan tuomiokirkko ja sen erillinen kellotorni '
            + 'tuomiokirkonaukiolla kirkkaan sinisen taivaan alla.',
          lahde: 'Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Vilnius Landmarks 162.jpg',
          selite: 'Tuomiokirkonaukio auringonpaisteessa: kellotorni, '
            + 'tuomiokirkko ja suurruhtinas Gediminaksen '
            + 'ratsastajapatsas.',
          lahde: 'Scotch Mist, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Vilnius Cathedral in the 19th c.jpg',
          selite: '1800-luvun puupiirros Vilnan tuomiokirkosta ja '
            + 'kellotornista.',
          lahde: 'Baranowski, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Pyhän Annan kirkko': {
      aika: '1495–1500',
      teksti: 'Pyhän Annan kirkko näyttää punaisesta pitsistä muuratulta '
          + 'satulinnalta. Sen tornit ja huiput on muurattu peräti 33 '
          + 'erilaisesta poltetusta tiilestä, jotka valettiin juuri '
          + 'tätä kirkkoa varten omiin erikoismuotoihinsa. Nykyinen '
          + 'kirkko valmistui vuosien 1495 ja 1500 välillä, kun '
          + 'edellinen puukirkko oli tuhoutunut tulipalossa.'
        + '\n\n'
        + 'Kirkon tarina liittyy suurruhtinas Vytautaan: hän '
          + 'rakennutti alun perin puisen kirkon vaimolleen Annalle, '
          + 'mutta se paloi vuonna 1419. Uusi tiilikirkko rakennettiin '
          + 'kestämään paremmin, ja se on pysynyt lähes muuttumattomana '
          + 'jo yli 500 vuotta.'
        + '\n\n'
        + 'Tarinan mukaan keisari Napoleon ihastui kirkkoon niin '
          + 'kovasti Vilnaan saapuessaan vuonna 1812, että hän olisi '
          + 'halunnut nostaa koko rakennuksen kämmenelleen ja kantaa '
          + 'sen mukanaan Pariisiin. Kirkko jäi kuitenkin paikalleen, '
          + 'ja siellä pidetään messuja edelleen tänäkin päivänä.',
      kuvat: [
        {
          tiedosto: 'Vilnius, St Anne and St Francis.jpg',
          selite: 'Pyhän Annan punatiilikirkko ja sen takana kohoava Pyhän '
            + 'Fransiskuksen (bernhardiinien) kirkko kirkkaana '
            + 'kesäpäivänä.',
          lahde: 'Syrio, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'St. Anne\'s Church Exterior 3, Vilnius, Lithuania - Diliff.jpg',
          selite: 'Pyhän Annan kirkon punatiilinen goottilainen julkisivu '
            + 'läheltä, terävät tornit kohoavat siniselle taivaalle.',
          lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Vilnan yliopisto': {
      aika: '1579',
      teksti: 'Vilnan yliopisto on yksi Itä-Euroopan vanhimmista '
          + 'yliopistoista: kuningas Stefan Batory perusti sen '
          + 'huhtikuun 1. päivänä 1579, ja paavi vahvisti sen '
          + 'viralliseksi yliopistoksi samana vuonna. Ensimmäisenä '
          + 'lukuvuonna opiskelijoita oli 160, mutta jo seitsemän '
          + 'vuotta myöhemmin heitä oli lähes 700.'
        + '\n\n'
        + 'Yliopiston kirjasto perustettiin jo vuonna 1570, ja siellä '
          + 'on nykyään yli viisi miljoonaa kirjaa ja käsikirjoitusta. '
          + 'Pihapiiriin rakennettiin vuonna 1753 tähtitorni, joka oli '
          + 'tuolloin vasta neljäs koko Euroopassa – sieltä '
          + 'tähtitieteilijät tarkkailivat taivasta aikansa parhailla '
          + 'kaukoputkilla.'
        + '\n\n'
        + 'Yliopiston tunnuslause \'Hinc itur ad astra\' tarkoittaa '
          + '\'täältä tie vie tähtiin\', ja se sopii hyvin paikkaan, '
          + 'josta on valmistunut esimerkiksi kirjailija Czesław '
          + 'Miłosz, joka voitti myöhemmin Nobelin '
          + 'kirjallisuuspalkinnon. Tsaarin hallitus sulki yliopiston '
          + 'kokonaan vuonna 1832, mutta se avattiin myöhemmin '
          + 'uudelleen ja toimii tänään yli 23 000 opiskelijan kotina.',
      lainaus: {
        teksti: 'Hinc itur ad astra – täältä tie vie tähtiin.',
        lahde: 'Vilnan yliopiston tunnuslause',
      },
      kuvat: [
        {
          tiedosto: 'The Grand Courtyard of Vilnius University.jpg',
          selite: 'Yliopiston Iso piha aamuauringossa, taustalla Pyhän '
            + 'Johanneksen kirkon kellotorni ja punaiset kukat edessä.',
          lahde: 'Vilnius University, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Courtyard of Vilnius University - Vilnius - Lithuania (27739333602).jpg',
          selite: 'Yliopiston piha matalassa aamuauringossa: keltaiset ja '
            + 'valkoiset siipirakennukset tiilikattoineen, ja oikealla '
            + 'kohoaa Pyhän Johanneksen kirkon torni.',
          lahde: 'Adam Jones, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Užupis: {
      aika: '1997',
      teksti: 'Užupis on pieni Vilnan kaupunginosa joen toisella puolella '
          + '– nimikin tarkoittaa suunnilleen \'joen takana\'. '
          + 'Aprillipäivänä eli huhtikuun 1. päivänä 1997 alueen '
          + 'taiteilijat julistivat sen leikkimielisesti omaksi '
          + 'tasavallakseen, jolla on oma lippu, oma pieni armeija ja '
          + 'yli 500 suurlähettilästä ympäri maailmaa.'
        + '\n\n'
        + 'Tasavallalla on oma perustuslaki, jossa on 41 pykälää ja '
          + 'jotka on käännetty jo yli 40 kielelle. Yksi '
          + 'suosikkipykälistä kuuluu: \'Koiralla on oikeus olla koira.\' '
          + 'Toinen muistuttaa, että jokaisella on oikeus olla sekä '
          + 'onnellinen että onneton, aivan miten itse haluaa.'
        + '\n\n'
        + 'Vuonna 2002 Užupikseen pystytettiin pronssinen '
          + 'enkelipatsas, joka puhaltaa trumpettia korkean pylvään '
          + 'huipulla – se korvasi paikalla aiemmin seisseen munan '
          + 'muotoisen veistoksen. Nykyään Užupiksessa asuu noin 7000 '
          + 'ihmistä, ja lähes tuhat heistä on taiteilijoita, joten '
          + 'kadut ovat täynnä maalauksia ja outoja veistoksia.',
      lainaus: {
        teksti: 'Koiralla on oikeus olla koira.',
        lahde: 'Užupiksen tasavallan perustuslaki',
      },
      kuvat: [
        {
          tiedosto: 'The Republic of Užupis (52361108997).jpg',
          selite: 'Užupiksen sillalla oleva kyltti \'Užupio Res Publika\', joka '
            + 'merkitsee humoristisen itsenäisen taiteilijatasavallan '
            + 'rajaa.',
          lahde: 'William John Gauthier, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'The Uzupis Angel (7932213486).jpg',
          selite: 'Pronssinen enkelipatsas pylväällä Užupiksen aukiolla, '
            + 'siivet levällään ja trumpetti kädessä, taustalla vanhoja '
            + 'taloja.',
          lahde: 'Guillaume Speurt, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Vilnia, Zarečča. Вільня, Зарэчча (S. Fleury, 1896).jpg',
          selite: '1896 valokuva Užupiksen (Zareččan) kaupunginosasta joen '
            + 'yli kukkulalta kuvattuna, matalia puutaloja ja '
            + 'kirkontorneja horisontissa.',
          lahde: 'Stanisław Filibert Fleury, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Aamuportti: {
      aika: '1503–1514',
      teksti: 'Aamuportti on ainoa säilynyt niistä yhdeksästä portista, '
          + 'jotka kerran kuuluivat Vilnan vanhaan kaupunginmuuriin. Se '
          + 'rakennettiin vuosina 1503–1514 puolustamaan kaupunkia, ja '
          + 'portin ulkoseinässä näkyy vieläkin vanhoja ampuma-aukkoja.'
        + '\n\n'
        + 'Kun kaupunginmuuri purettiin vuosina 1799–1805, Aamuportti '
          + 'jätettiin pystyyn ainoana, koska sen sisällä olevaa '
          + 'Neitsyt Marian ihmekuvaa pidettiin niin pyhänä. Vuonna '
          + '1702 ruotsalaissotilaan luoti osui taistelun aikana '
          + 'suoraan kuvaan – kaupunkia puolustaneet pitivät tapahtumaa '
          + 'ihmeenä, sillä taistelu päättyi ilman suuria tappioita.'
        + '\n\n'
        + 'Kuva on kiehtonut myös maailman mahtimiehiä: paavi '
          + 'Johannes Paavali II rukoili kappelissa vuonna 1993 ja '
          + 'paavi Franciscus vuonna 2018. Nykyään portin yläkerran '
          + 'kappelin seinät ovat täynnä satoja pieniä hopeisia ja '
          + 'kultaisia kiitoslahjoja, joita ihmiset ovat jättäneet '
          + 'sinne vuosisatojen aikana.',
      kuvat: [
        {
          tiedosto: 'Vilnius Dawn Gate.jpg',
          selite: 'Aamuportti kadun päässä auringonpaisteessa, kultainen '
            + 'Neitsyt Marian kuva näkyy holvikaaren yläpuolella ja katu '
            + 'on täynnä kulkijoita.',
          lahde: 'Marcin Białek, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Vault of the Ostra brama chapel.JPG',
          selite: 'Kappelin holvi sisältä: valkoista stukkokoristelua '
            + 'vaakunoineen ja kullattuja sädekuvioita. Vasemmalla näkyy '
            + 'ihmekuvan kehyksen yläreuna kerubeineen.',
          lahde: 'Alma Pater, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  oslo: {
    Kuninkaanlinna: {
      aika: '1825–1849',
      teksti: 'Oslon kuninkaanlinna on Norjan kuninkaan koti, ja se '
          + 'seisoo ylhäällä mäellä Karl Johans gaten päässä. '
          + 'Vaaleankeltainen palatsi on rakennettu tyylikkääseen, '
          + 'pylväitä täynnä olevaan asuun, ja sitä ympäröi iso puisto, '
          + 'jossa kuka tahansa saa kävellä.'
        + '\n\n'
        + 'Rakentaminen alkoi vuonna 1825, kun kuningas Kaarle Juhana '
          + 'laski juhlallisesti peruskiven. Työ kesti kauan – palatsi '
          + 'valmistui vasta vuonna 1849, viisi vuotta sen jälkeen kun '
          + 'kuningas itse oli jo kuollut eikä ehtinyt koskaan asua '
          + 'siellä. Palatsissa on peräti 173 huonetta, ja sen '
          + 'suunnitteli tanskalainen arkkitehti Hans Linstow.'
        + '\n\n'
        + 'Vartijat marssivat palatsin edustalla joka päivä, ja '
          + 'vahdinvaihtoa on suosittua käydä katsomassa. Vasta vuonna '
          + '2002 tavalliset ihmiset pääsivät ensimmäistä kertaa '
          + 'kiertämään palatsin sisätiloja kesäisin. Vanhoista '
          + 'talleista tehtiin vuonna 2017 taidenäyttelytila, jossa '
          + 'esitellään kuningatar Sonjan taidekokoelmaa.',
      kuvat: [
        {
          tiedosto: '00 7737 Royal Palace, Oslo.jpg',
          selite: 'Kuninkaanlinna kirkkaana kesäpäivänä suoraan edestä '
            + 'kuvattuna, ratsastajapatsas ja pylväikkö sekä '
            + 'vierailijoita puistoaukiolla.',
          lahde: 'W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Slottet i Oslo 1.jpg',
          selite: 'Kuninkaanlinna symmetrisestä etunäkymästä '
            + 'puistokäytävältä, pilvenhattaroita sinisellä '
            + 'kesätaivaalla.',
          lahde: 'Andreas Haldorsen, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Oslo Royal Palace 1890.jpg',
          selite: 'Kuninkaanlinna vuonna 1890 valokuvaaja Axel Lindahlin '
            + 'kuvaamana; puisto on vielä nuori ja puut pieniä.',
          lahde: 'Axel Lindahl, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Karl Johans gate': {
      aika: '1840–1866',
      teksti: 'Karl Johans gate on Oslon vilkkain katu, joka kulkee '
          + 'rautatieasemalta suoraan kuninkaanlinnalle asti. Katu '
          + 'syntyi, kun vanhoja kaupungin kujia yhdisteltiin ja '
          + '1840-luvulla rakennettiin uusi, leveä katuosuus '
          + 'kuninkaanlinnan suuntaan.'
        + '\n\n'
        + 'Katu sai nykyisen nimensä vuonna 1852, kun kuningas Kaarle '
          + 'Juhana oli juuri kuollut ja häntä haluttiin muistaa. '
          + 'Palatsin edustalle pystytettiin vuonna 1875 pronssinen '
          + 'ratsastajapatsas kuninkaasta, ja se seisoo siellä yhä. Kun '
          + 'Norjan parlamenttitalo, Storting, avattiin kadun varrella '
          + 'vuonna 1866, kaksi erillistä katua yhdistyi lopulta '
          + 'yhdeksi pitkäksi Karl Johans gateksi.'
        + '\n\n'
        + 'Toukokuun 17. päivänä, Norjan perustuslakipäivänä, katu '
          + 'täyttyy lippuja heiluttavista lapsista ja marssijoista. '
          + 'Joulun alla kadulla on värikkäät markkinat, joilla myydään '
          + 'kuumaa glögiä ja käsitöitä.',
      kuvat: [
        {
          tiedosto: 'Karl Johans gate, Oslo - Royal Palace, Oslo - perspective.jpg',
          selite: 'Karl Johans gate kesäisenä päivänä; puukujan reunustama '
            + 'katu johtaa suoraan kohti kuninkaanlinnaa kadun päässä.',
          lahde: 'Philippe Salgarolo, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Karl Johans gate abt 1890.jpg',
          selite: 'Karl Johans gate noin vuonna 1890; hevosvetoinen '
            + 'raitiovaunu kadulla ja kuninkaanlinna näkyvissä kadun '
            + 'päässä.',
          lahde: 'Axel Lindahl, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Oslon tuomiokirkko': {
      aika: '1694–1697',
      teksti: 'Oslon tuomiokirkko on kaupungin pääkirkko, mutta se on jo '
          + 'kolmas kirkko, joka on kantanut tätä tehtävää. '
          + 'Ensimmäinen, keskiaikainen Hallvardin katedraali, jäi '
          + 'liian kauas uudesta kaupungista, kun kuningas Kristian IV '
          + 'siirsi koko Oslon lähemmäs Akershusin linnoitusta suuren '
          + 'tulipalon jälkeen vuonna 1624.'
        + '\n\n'
        + 'Toinen kirkko paloi vain 50 vuoden käytön jälkeen, joten '
          + 'uuden peruskivi muurattiin vuonna 1694. Kirkko vihittiin '
          + 'käyttöön marraskuussa 1697, ja se on seissyt Stortorvetin '
          + 'torin laidalla siitä asti. Kirkon ovet ovat pronssia, ja '
          + 'ikkunoissa on taiteilija Emanuel Vigelandin suunnittelemia '
          + 'lasimaalauksia.'
        + '\n\n'
        + 'Kirkossa on vietetty kuuluisia kuninkaallisia häitä: '
          + 'kuningas Harald ja kuningatar Sonja vihittiin siellä '
          + 'vuonna 1968, ja kruununprinssi Haakon meni naimisiin '
          + 'Mette-Maritin kanssa vuonna 2001. Vuosina 2006–2010 kirkko '
          + 'oli kokonaan kiinni suuren remontin ajan, ja tornissa soi '
          + 'nykyään 48 kellon kellopeli.',
      kuvat: [
        {
          tiedosto: 'Oslo Domkirke 1880s.jpeg',
          selite: 'Oslon tuomiokirkko 1880-luvulla; laaja näkymä koko '
            + 'kirkkorakennuksesta puiden ja aukion keskellä.',
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Oslo Domkirke 20180729.jpg',
          selite: 'Oslon tuomiokirkon torni alhaalta kuvattuna kirkkaan '
            + 'sinistä kesätaivasta vasten.',
          lahde: 'Suicasmo, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Kaupungintalo: {
      aika: '1931–1950',
      teksti: 'Oslon punatiilinen kaupungintalo on kaupungin hallinnon '
          + 'koti, ja siinä on kaksi neliömäistä tornia, jotka näkyvät '
          + 'pitkälle satamaan. Rakennus on 66 metriä korkea, ja sitä '
          + 'rakennettiin arkkitehtien Arnstein Arnebergin ja Magnus '
          + 'Poulssonin suunnitelmien mukaan vuosina 1931–1950.'
        + '\n\n'
        + 'Rakentaminen keskeytyi kesken toisen maailmansodan, joten '
          + 'talo valmistui lopulta vasta vuonna 1950 – juuri sopivasti '
          + 'Oslon 900-vuotisjuhliin. Sisällä seiniä koristavat isot '
          + 'maalaukset, jotka kertovat Norjan historiasta ja '
          + 'miehityksen ajasta; niitä maalasi kahdeksan taiteilijaa, '
          + 'ja lisäksi 17 kuvanveistäjää teki patsaita.'
        + '\n\n'
        + 'Joka vuosi 10. joulukuuta salissa jaetaan Nobelin '
          + 'rauhanpalkinto, ja marmoripintainen juhlasali on 31 metriä '
          + 'pitkä. Kansanäänestyksessä norjalaiset valitsivat '
          + 'kaupungintalon kerran jopa "vuosisadan rakennukseksi".',
      kuvat: [
        {
          tiedosto: 'Oslo Rådhus - Oslo City Hall - Oslo, Norway 2020-09-16.jpg',
          selite: 'Oslon kaupungintalo edestä kuvattuna, patsaat aukion '
            + 'edessä ja kirkas syystaivas.',
          lahde: 'Ryan Hodnett, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Oslo Rådhus - no-nb digifoto 20150218 00063 NB MIT FNR 17150.jpg',
          selite: 'Oslon kaupungintalo 1950-luvulla; aikakauden autoja '
            + 'aukiolla rakennuksen edessä.',
          lahde: 'Jac Brun, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Akershusin linnoitus': {
      aika: '1290-luku',
      teksti: 'Akershusin linnoitus kohoaa kalliolla Oslon rannalla, ja '
          + 'se on vartioinut kaupunkia jo yli 700 vuotta. Kuningas '
          + 'Haakon V käski rakentaa sen 1290-luvun lopulla, sen '
          + 'jälkeen kun kaupunki oli osoittautunut liian helposti '
          + 'hyökättäväksi vuonna 1287.'
        + '\n\n'
        + 'Linnoitusta on piiritetty monta kertaa – ruotsalaiset '
          + 'yrittivät vuonna 1308 ja Kaarle Knuutinpoika vuosina '
          + '1449–1450 – mutta mikään vieras armeija ei ole koskaan '
          + 'onnistunut valtaamaan sitä taistelemalla. Kuningas '
          + 'Kristian IV muutti vanhan linnan 1600-luvulla hienoksi '
          + 'renessanssipalatsiksi.'
        + '\n\n'
        + 'Toisen maailmansodan aikana saksalaiset miehittivät '
          + 'linnoituksen ja teloittivat siellä vankeja, mutta Norjan '
          + 'vastarintaliike vapautti sen 11. toukokuuta 1945. Sodan '
          + 'jälkeen linnoituksessa teloitettiin myös maanpettureita, '
          + 'kuten Vidkun Quisling. Nykyään linnoituksessa on Norjan '
          + 'kuninkaallinen hautaholvi ja sotilaiden toimistoja.',
      kuvat: [
        {
          tiedosto: 'Akershus Festning from the fjord.jpg',
          selite: 'Akershusin linnoitus vuonon toiselta puolelta katsottuna, '
            + 'purjevene edustalla kirkkaana kesäpäivänä.',
          lahde: 'GuoJunjun, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Castle of Aggerhus (JW Edy plate 53).jpg',
          selite: 'Akershusin linnoitus vuoden 1820 käsivärjätyssä '
            + 'kaiverruksessa, purjelaivoja vuonolla edustalla.',
          lahde: 'John William Edy, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'Oslo, Akershus Castle (5).JPG',
          selite: 'Akershusin linnoituksen porrastettu tiilinen päätykolmio '
            + 'alhaalta kuvattuna lämpimässä iltapäivänvalossa.',
          lahde: 'Michal Klajban, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Oopperatalo: {
      aika: '2007–2008',
      teksti: 'Oslon oopperatalo näyttää siltä kuin valtava valkoinen '
          + 'jäävuori olisi noussut merestä keskelle kaupunkia. '
          + 'Rakennuksen suunnitteli arkkitehtitoimisto Snøhetta, ja '
          + 'sen kalteville pinnoille käytettiin valkoista Carraran '
          + 'marmoria ja graniittia.'
        + '\n\n'
        + 'Talo avattiin huhtikuun 12. päivä 2008, ja siellä on '
          + 'peräti 1 100 huonetta yhteensä 49 000 neliömetrin alalla. '
          + 'Suurimpaan saliin mahtuu 1 364 katsojaa kuuntelemaan '
          + 'oopperaa tai balettia.'
        + '\n\n'
        + 'Kattokaltevuudet ulottuvat maahan asti, joten kuka tahansa '
          + 'voi kävellä katolle ihailemaan näkymää vuonolle. Rakennus '
          + 'valmistui etuajassa ja jopa 300 miljoonaa kruunua alle '
          + 'budjetin, ja ensimmäisenä vuonna sitä kävi katsomassa 1,3 '
          + 'miljoonaa ihmistä.',
      kuvat: [
        {
          tiedosto: 'Oslo Opera house (2015).jpg',
          selite: 'Oslon oopperatalo vuonon rannalla kirkkaana päivänä; '
            + 'valkoinen marmoripinta ja lasijulkisivu erottuvat '
            + 'selvästi.',
          lahde: 'Beata May, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Oslo Opera House at sunset 4.jpg',
          selite: 'Oslon oopperatalo auringonlaskun aikaan; lasijulkisivu '
            + 'hohtaa kultaisena ja kuvastuu tyyneen veteen.',
          lahde: 'Nurtenge, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: '2025-09-26-Operahuset-Oslo-1.jpg',
          selite: 'Oopperatalon viistolla marmorikatolla kävellään; taustalla '
            + 'rakennuksen alumiininen kuutio ja kirkas sininen taivas.',
          lahde: 'Gunnar Klack, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  kobenhavn: {
    'Pieni merenneito': {
      aika: '1913',
      teksti: 'Pieni merenneito -patsas istuu kalliolla Langelinien '
          + 'rannassa Kööpenhaminassa. Se on valettu pronssista, vain '
          + '1,25 metriä korkea ja painaa 175 kiloa. Panimomiljonääri '
          + 'Carl Jacobsen tilasi patsaan innostuttuaan baletista, joka '
          + 'kertoi H. C. Andersenin sadun pienestä merenneidosta. '
          + 'Kuvanveistäjä Edvard Eriksen sai tilauksen vuonna 1909, ja '
          + 'patsas paljastettiin 23. elokuuta 1913.'
        + '\n\n'
        + 'Hauska yksityiskohta liittyy patsaan malliin: baleriina, '
          + 'jonka tanssi oli koko idean innoittaja, ei halunnut '
          + 'poseerata patsasta varten, joten Eriksen käytti mallina '
          + 'omaa vaimoaan Eline Eriksenia.'
        + '\n\n'
        + 'Pieni merenneito on kokenut yllättävän kovaa kohtelua '
          + 'vuosien varrella. Pää on sahattu irti kahdesti, vuosina '
          + '1964 ja 1998, käsi katkaistiin 1984 ja koko patsas jopa '
          + 'räjäytettiin veteen vuonna 2003. Siitä huolimatta se on '
          + 'aina nostettu takaisin paikalleen, ja sen kopioita on '
          + 'pystytetty yli kolmeentoista kaupunkiin ympäri maailmaa.',
      kuvat: [
        {
          tiedosto: 'The Little Mermaid - 4668118032.jpg',
          selite: 'Aurinkoisena kesäpäivänä matkailijat kokoontuvat '
            + 'rantakivillä ihailemaan pronssista Pientä merenneitoa '
            + 'kiven päällä meren äärellä.',
          lahde: 'Andrea Lai, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Denmark, Copenhagen, Little Mermaid, Langelinie Promenade 150422-26.jpg',
          selite: 'Läheltä kuvattu pronssinen Pieni merenneito -patsas '
            + 'kivellä, ilta-auringon kultaisessa valossa meren edessä.',
          lahde: 'Richardmaackphotography, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: '1913-Edvard Eriksen-Den lillie Havfrue.jpg',
          selite: 'Vanha sepiansävyinen postikorttivalokuva Pienestä '
            + 'merenneidosta pian patsaan paljastamisen jälkeen vuonna '
            + '1913, satamalaivat taustalla.',
          lahde: 'Tuntematon (postikorttikustantajien kokoelma), Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Amalienborg: {
      aika: '1750–1760',
      teksti: 'Amalienborg on Tanskan kuninkaallisen perheen koti '
          + 'Kööpenhaminassa. Se muodostuu neljästä samanlaisesta '
          + 'rokokopalatsista, jotka rakennettiin kahdeksankulmaisen '
          + 'aukion ympärille vuosina 1750–1760 arkkitehti Nicolai '
          + 'Eigtvedin suunnitelmien mukaan. Aukion keskellä on '
          + 'kuningas Fredrik V:n ratsastajapatsas, jonka kuvanveistäjä '
          + 'Jacques Saly paljasti vuonna 1771.'
        + '\n\n'
        + 'Palatsit rakennettiin alun perin neljälle rikkaalle '
          + 'aatelissuvulle. Kaikki muuttui, kun Christiansborgin linna '
          + 'tuhoutui tulipalossa vuonna 1794 - kuningasperhe osti '
          + 'tyhjät palatsit ja muutti Amalienborgiin, ja siellä se '
          + 'asuu yhä tänäkin päivänä.'
        + '\n\n'
        + 'Joka päivä keskipäivällä turistit kerääntyvät katsomaan, '
          + 'kun kuninkaalliset henkivartijat marssivat '
          + 'scharlakaninpunaisissa univormuissaan ja karvalakeissaan '
          + 'aukiolle vaihtamaan vartiota. Amalienborg on nähnyt myös '
          + 'vakavampia hetkiä: 9. huhtikuuta 1940 sen pihalla käytiin '
          + 'tunnin mittainen tulitaistelu tanskalaisten '
          + 'henkivartijoiden ja hyökkäävien saksalaisjoukkojen '
          + 'välillä.',
      kuvat: [
        {
          tiedosto: 'Denmark 0104 - Amalienborg Palace (3990546376).jpg',
          selite: 'Amalienborgin palatsiaukio aamuvalossa: Fredrik V:n '
            + 'ratsastajapatsas keskellä ja kaksi symmetristä '
            + 'palatsisiipeä sivuilla, kirkas sininen taivas.',
          lahde: 'Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Vagtparade på Amalienborg Plads, 1896-1912.jpg',
          selite: 'Vanha stereokuvakortti (n. 1896–1912) kaartin paraatista '
            + 'Amalienborgin aukiolla, palatsi ja ratsastajapatsas '
            + 'taustalla.',
          lahde: 'Peter Alstrup, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Rundetårn: {
      aika: '1637–1642',
      teksti: 'Rundetårn eli Pyöreä torni kohoaa Kööpenhaminan '
          + 'keskustassa 34,8 metrin korkeuteen. Kuningas Christian IV '
          + 'halusi kaupunkiin tähtitornin, ja peruskivi muurattiin 7. '
          + 'heinäkuuta 1637; torni valmistui vuonna 1642.'
        + '\n\n'
        + 'Tornissa ei ole lainkaan tavallisia portaita! Sisällä '
          + 'kiertyy 210 metriä pitkä loiva spiraalikäytävä, jota '
          + 'pitkin hevoset ja kärryt pääsivät kuljettamaan kirjoja ja '
          + 'raskaita tähtitieteen laitteita aina huipulle asti.'
        + '\n\n'
        + 'Spiraali on nähnyt monta hurjaa temppua. Vuonna 1716 '
          + 'Venäjän tsaari Pietari Suuri ratsasti sitä pitkin '
          + 'hevosella huipulle asti, vuonna 1902 siellä ajettiin '
          + 'ensimmäistä kertaa autolla, ja vuonna 1989 eräs mies ajoi '
          + 'koko matkan yksipyöräisellä vain 1 minuutissa 48,7 '
          + 'sekunnissa - ennätys, joka on yhä voimassa.',
      kuvat: [
        {
          tiedosto: 'Rundetaarn (Købmagergade).jpg',
          selite: 'Rundetårn kattojen yli: tiiliseinässä Christian IV:n '
            + 'kultainen kuva-arvoitus, laella observatorion vihreä kupoli '
            + 'ja takana Juutinrauma.',
          lahde: 'Orf3us, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Peter Tom-Petersen - Parti fra gården ved Regensen med udsigt til Rundetårn - 1888.png',
          selite: 'Taidemaalari Peter Tom-Petersenin vuonna 1888 maalaama '
            + 'näkymä Regensenin pihalta puiden lomasta kohti '
            + 'Rundetårnia.',
          lahde: 'Peter Tom-Petersen, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Nyhavn: {
      aika: '1670–1675',
      teksti: 'Nyhavn eli "uusi satama" on 450 metriä pitkä kanava '
          + 'Kööpenhaminan keskustassa. Kuningas Christian V rakennutti '
          + 'sen vuosina 1670–1675, ja työn tekivät tanskalaiset '
          + 'sotilaat sekä Tanskan ja Ruotsin sodassa vangiksi jääneet '
          + 'ruotsalaiset sotavangit. Kanavan piti tuoda laivat suoraan '
          + 'merenlahdelta kaupungin Kongens Nytorv -torille asti.'
        + '\n\n'
        + 'Ennen vanhaan Nyhavn oli meluisa ja vähän vaarallinenkin '
          + 'satamakortteli täynnä merimiehiä ja krouveja - aivan '
          + 'toisenlainen paikka kuin nykyinen värikäs turistikatu. '
          + 'Vanhin talo, numero 9, on peräisin jo vuodelta 1681. '
          + 'Satukirjailija H. C. Andersen asui Nyhavnin varrella eri '
          + 'osoitteissa yhteensä 18 vuoden ajan.'
        + '\n\n'
        + '1960-luvulla kanava oli päässyt rappiolle, mutta '
          + 'kaupunkilaiset päättivät pelastaa sen. Laiturialue '
          + 'kivettiin jalankulkijoille vuonna 1980, ja nykyään '
          + 'Nyhavnin kirkkaanväriset talot ja vanhat purjelaivat ovat '
          + 'yksi koko Kööpenhaminan tunnetuimmista näkymistä.',
      kuvat: [
        {
          tiedosto: 'Nyhavn houses and boats.jpg',
          selite: 'Nyhavnin kanavan värikkäät talot ja perinteiset puiset '
            + 'purjeveneet auringonpaisteessa, lokki lentää taivaalla.',
          lahde: 'OleNeitzel, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Classic Nyhavn I (7530252984).jpg',
          selite: 'Ylhäältä kuvattu näkymä Nyhavnin kanavalle kirkkaassa '
            + 'sinisessä taivaassa, koko kirjava talorivistö ja '
            + 'purjeveneet näkyvissä.',
          lahde: 'Karen Mardahl, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Nyhavn, København, 1896-1912.jpg',
          selite: 'Vanha stereokuvakortti (n. 1896–1912) Nyhavnin kanavasta '
            + 'täynnä vanhoja purjelaivoja ja rantakatua reunustavia '
            + 'taloja.',
          lahde: 'Peter Alstrup, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Christiansborgin linna': {
      aika: '1907–1928',
      teksti: 'Christiansborgin linna seisoo Slotsholmenin saarella '
          + 'paikalla, jossa piispa Absalon rakensi Kööpenhaminan '
          + 'ensimmäisen linnan jo vuonna 1167. Sen jälkeen paikalle on '
          + 'noussut linna toisensa perään - kahdesti aiempi rakennus '
          + 'on tuhoutunut kokonaan tulipalossa, vuosina 1794 ja 1884.'
        + '\n\n'
        + 'Nykyinen, jo kolmas Christiansborg valmistui vuosina '
          + '1907–1928. Se on rakennettu uusbarokkityyliin '
          + 'raudoitetusta betonista, ja sen torni kohoaa 106 metrin '
          + 'korkeuteen - se on Kööpenhaminan korkein rakennus.'
        + '\n\n'
        + 'Christiansborg on maailmanlaajuisestikin harvinainen: se '
          + 'on ainoa rakennus, jossa toimivat samaan aikaan kaikki '
          + 'kolme valtiovallan haaraa - Tanskan parlamentti, '
          + 'pääministerin toimisto ja korkein oikeus. Linnan alta '
          + 'löytyy myös yli 800 vuotta vanhat Absalonin linnan '
          + 'rauniot, joissa voi käydä yhä tänäkin päivänä.',
      kuvat: [
        {
          tiedosto: 'Christiansborg Slot from west Copenhagen Denmark.jpg',
          selite: 'Christiansborgin linna suoraan edestä kuvattuna, '
            + 'kultaisessa illan valossa dramaattisten pilvien alla, '
            + 'ratsastajapatsas edustalla.',
          lahde: 'Jebulon, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: '2018 - Christiansborg from the Marble Bridge.jpg',
          selite: 'Näkymä Marmorisillalta linnan kahden porttiholvin läpi '
            + 'kohti valaistua tornia hämärän sinisellä taivaalla.',
          lahde: 'Moahim, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Christiansborg Palace before 1873 by Budtz Müller.jpg',
          selite: 'Vanha stereokuvakortti vanhasta Christiansborgin linnasta '
            + 'Christiansborgin aukiolta kuvattuna, sellaisena kuin se '
            + 'näytti ennen vuotta 1873.',
          lahde: 'Bertel Christian Budtz Müller, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
    Tivoli: {
      aika: '1843',
      teksti: 'Tivoli avasi Kööpenhaminan keskustassa 15. elokuuta 1843. '
          + 'Se on maailman toiseksi vanhin yhä toimiva huvipuisto - '
          + 'vanhempi on vain toinen tanskalainen puisto, '
          + 'Dyrehavsbakken. Puiston perusti Georg Carstensen, joka '
          + 'otti mallia Pariisin Tivoli-puutarhasta ja Lontoon '
          + 'Vauxhall Gardensista.'
        + '\n\n'
        + 'Puiston puinen vuoristorata Rutschebanen on rakennettu jo '
          + 'vuonna 1914, ja se pyörii yhä - se on yksi maailman '
          + 'vanhimmista toimivista vuoristoradoista. Toisen '
          + 'maailmansodan aikana natsimieliset tuhosivat osan '
          + 'Tivolista vuonna 1943, mutta puisto avattiin uudelleen jo '
          + 'muutaman viikon päästä. Kesäkuussa 1944 pommitusten '
          + 'jälkeen Rutschebanenkin oli taas käynnissä vain 25 '
          + 'päivässä.'
        + '\n\n'
        + 'Tivolin vaikutus ulottuu kauas: Walt Disney vieraili '
          + 'puistossa ja sai siitä inspiraatiota omaan '
          + 'Disneylandiinsa. Nykyään Tivolissa käy vuosittain '
          + 'miljoonia vierailijoita - vuonna 2024 peräti 4,25 '
          + 'miljoonaa.',
      lainaus: {
        teksti: 'Tivoli ei tule koskaan valmiiksi.',
        lahde: 'Georg Carstensen, Tivolin perustaja, 1844',
      },
      kuvat: [
        {
          tiedosto: 'Tivoli Copenhagen Main Entrance.jpg',
          selite: 'Tivolin pääsisäänkäynnin kolme rakennusta kultaisessa '
            + 'illan valossa, ihmisiä kävelemässä kadulla portin edessä.',
          lahde: 'Sissew, Wikimedia Commons (Public domain)',
        },
        {
          tiedosto: 'The Tivoli park entrance, Copenhagen, Denmark-LCCN2001697993.jpg',
          selite: 'Värillinen aikalaisvalokuva (photochrom, n. 1890–1900) '
            + 'Tivolin sisäänkäynnistä: hevosvetoinen omnibussi, '
            + 'aikalaispukuisia kävelijöitä ja Tanskan lippu portin '
            + 'päällä.',
          lahde: 'Photochrom Print Collection, Wikimedia Commons (Public domain)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Dubain kohdekartta (maakartat.js, v467) oli pelissä ilman yhtään
   * juttua — auditin löydös 12.8.2026. Kuusi kohdetta samassa
   * järjestyksessä kuin kartalla, pohjoisesta etelään.
   */
  dubai: {
    'Kultasuuk': {
      aika: '1900-luvun alku',
      teksti: 'Kultasuuk syntyi epävirallisesti 1900-luvun alussa, kun '
          + 'kourallinen kauppiaita avasi puotinsa lahden rannalle Deiran '
          + 'puolelle. Kauppa kasvoi 1940-luvulla, kun Dubain '
          + 'vapaakauppapolitiikka veti paikalle yrittäjiä Intiasta ja '
          + 'Iranista. Nykyään Al Rasin kaupunginosassa on yli 380 '
          + 'liikettä, joista suurin osa on kultasepänliikkeitä. Myynnissä '
          + 'on kulta-, platina- ja hopeakoruja, harkkoja, irtotimantteja '
          + 'ja värikiviä.'
          + '\n\n'
          + '1960-luvulla suukin kauppa oli kansainvälisen mittaluokan '
          + 'bisnestä. Vuonna 1966 Dubai oli Lontoon kullan kolmanneksi '
          + 'suurin vientikohde noin neljällä miljoonalla unssilla. Vuonna '
          + '1967 unssi maksoi Dubain suukeissa 35 dollaria ja Intiassa 68, '
          + 'ja koska Intia säännösteli kullan tuontia, Dubain kauppiaat '
          + 'lensivät metallin Lontoosta ja lähettivät sen edelleen '
          + 'dhow-veneillä Intian aluevesirajalle. Kulta pakattiin kymmenen '
          + 'tolan harkkoihin — tola on runsaat 11,66 grammaa.'
          + '\n\n'
          + 'Suukin pohjoispuolella ovat Deiran kala- ja vihannestori ja '
          + 'Corniche-rantakatu, lahden toisella rannalla kangassuukki. '
          + 'Koru punnitaan asiakkaan edessä, ja hinta lasketaan päivän '
          + 'kultakurssista plus työn osuus.',
      kuvat: [
        {
          tiedosto: 'Dubai Gold Souk (8668422526).jpg',
          selite: 'Kultasuukin katettu puukäytävä, kultasepänliikkeiden '
            + 'ikkunat molemmin puolin.',
          lahde: 'Rob Young from United Kingdom, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Gold Souk, Dubai5.jpg',
          selite: 'Näyteikkuna täynnä kultakaulakoruja suukin liikkeessä: '
            + 'viisi mallinukkea massiivisissa koruissa ja alla rivi '
            + 'rannerenkaita.',
          lahde: 'dconvertini, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Dhow-satama': {
      teksti: 'Khor Dubai ei ole joki vaan Persianlahden suolainen lahti, '
          + 'joka työntyy noin 14 kilometriä sisämaahan. Leveyttä on '
          + '200–1200 metriä ja syvyyttä keskimäärin 6,5–7 metriä. Deiran '
          + 'puoleiseen laituriin kiinnittyy puisia dhow-aluksia kahden ja '
          + 'kolmen rivissä, ja lasti odottaa laiturilla taivasalla '
          + 'laatikkopinoina. Lahden kautta kulkee yhä yli 13 000 alusta '
          + 'vuodessa.'
          + '\n\n'
          + 'Dhow on eurooppalaisten antama yleisnimi Intian valtameren '
          + 'pitkärunkoisille purjealuksille. Suurimmissa on noin '
          + 'kolmenkymmenen hengen miehistö, pienimmissä tusinan verran. '
          + 'Osa purjehtii yhä monsuunin mukana: etelään Itä-Afrikkaan '
          + 'talvella tai alkukeväästä taatelilastissa, takaisin Arabiaan '
          + 'myöhään keväällä mangrovepuutavaraa kyydissä. Runkoja '
          + 'rakennetaan edelleen Beyporessa Keralassa, jossa alusta '
          + 'kutsutaan nimellä uru.'
          + '\n\n'
          + '1900-luvun alussa lahti oli matala satama, johon dhowit '
          + 'tulivat Intiasta ja Itä-Afrikasta asti. Ruoppaukset 1950- ja '
          + '1960-luvun taitteessa syvensivät väylän niin, että 2,1 metrin '
          + 'syväyksen alukset pääsivät läpi vuorovedestä riippumatta. '
          + 'Jebel Alin suursataman valmistuttua lahden merkitys '
          + 'rahtiväylänä pieneni, mutta Port Saeedin kaltaiset pienet '
          + 'laiturit palvelevat yhä lähialueen ja Intian niemimaan '
          + 'kauppiaita.',
      kuvat: [
        {
          tiedosto: 'Deira Dhow Wharfage (Dubai).jpg',
          selite: 'Dhow-aluksia rinnakkain laiturissa Deirassa, lasti '
            + 'pinottuna laiturille laatikoiksi ja säkeiksi.',
          lahde: 'Iwona Rege, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Al Shindagha': {
      aika: '1896',
      teksti: 'Al Shindagha on niemi Khor Dubain suulla, Bur Dubain puolella '
          + 'lahtea. Alue on pieni: 0,26 neliökilometriä, ja vuoden 2000 '
          + 'laskennassa siellä asui 16 ihmistä. Niemen tunnetuin rakennus '
          + 'on noin vuonna 1896 pystytetty Sheikh Saeed Al Maktoumin talo, '
          + 'Al Maktoumin suvun päämaja. Dubain hallitsija Saeed bin '
          + 'Maktoum asui siinä vuodesta 1912 kuolemaansa 1958 asti.'
          + '\n\n'
          + 'Talo on kunnostettu ja avattu museoksi. Pinta-alaa on 3 600 '
          + 'neliömetriä, ja näyttely jakautuu yhdeksään siipeen: talon '
          + 'historia, Al Maktoumin suku, vanha Dubai, meren elämä, näkymiä '
          + 'Dubaista, kaupungin sosiaalinen elämä, kolikot ja postimerkit '
          + 'sekä historialliset asiakirjat ja kartat.'
          + '\n\n'
          + 'Niemen rantaviiva ei ole alkuperäinen. Kun lahtea ruopattiin '
          + '1958–1959, pohjasta nostetulla massalla vahvistettiin '
          + 'viereistä Ghubaiban vuorovesialuetta, jonka yli oli aiemmin '
          + 'päästy betonisia askelkiviä pitkin, ja jatkettiin Shindaghan '
          + 'rantaa ulospäin. Vuonna 1975 niemen alle avattiin Al '
          + 'Shindaghan tunneli, yhä lahden ainoa maantietunneli: neljä '
          + 'kaistaa, viiden metrin alikulkukorkeus ja vuoteen 2010 '
          + 'mennessä noin 55 000 ajoneuvoa päivässä.',
      kuvat: [
        {
          tiedosto: 'Saeed Al Maktoum House-Dubai2841.JPG',
          selite: 'Sheikh Saeed Al Maktoumin talon hiekkapohjainen sisäpiha, '
            + 'kipsikoristeltu yläparveke ja tuulitorni taivasta vasten.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Abra-laiturit': {
      teksti: 'Abra on puinen vene, ja nimi tulee arabian verbistä abara, '
          + 'ylittää. Abrat ovat Dubain vanhin joukkoliikenneväline: ennen '
          + 'siltoja ja Al Shindaghan tunnelia lahdelman toiselle puolelle '
          + 'pääsi vain veneellä. Keskikokoiseen yksimoottoriseen abraan '
          + 'mahtuu 20 matkustajaa. He istuvat katoksen alla penkeillä '
          + 'ohjaamon ympärillä, kymmenen kummallakin puolella, kasvot '
          + 'vettä kohti, ja kuljettaja ohjaa veneen keskeltä.'
          + '\n\n'
          + 'Ylitys Deiran ja Bur Dubain välillä kestää viidestä seitsemään '
          + 'minuuttia, ja veneitä lähtee muutaman minuutin välein. Lippu '
          + 'maksetaan suoraan kuljettajalle. Veneitä on noin 150, ja ne '
          + 'kuljettavat vuodessa 15–20 miljoonaa matkustajaa. Al Sabkhan '
          + 'ja vanhan suukin välinen reitti kulkee ympäri vuorokauden, '
          + 'Deira Old Souqin ja Bur Dubain välinen viidestä aamulla '
          + 'puoleenyöhön.'
          + '\n\n'
          + 'Vanhat rantalaiturit on korvattu virallisilla asemilla, joissa '
          + 'kulkuväylät on mitoitettu ihmisjoukoille. Laiturin edustalla '
          + 'veneet ohittavat toisensa hyvin läheltä, ja siksi matkustajien '
          + 'on pysyttävä istuallaan koko matkan ajan. Heinäkuussa 2024 '
          + 'liikenteeseen tulivat ensimmäiset 3D-tulostetut abrat.',
      kuvat: [
        {
          tiedosto: 'Bur Dubai Abra Station.jpg',
          selite: 'Abroja kiinni Bur Dubain laiturilla iltavalossa. Veneiden '
            + 'päällä on vaaleat kangaskatokset, mastoissa liehuu '
            + 'Emiraattien lippuja, ja takana avautuu lahdelma.',
          lahde: 'Iwona Rege, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Commuting by Abra (3049532876).jpg',
          selite: 'Täysi abra ylittämässä lahdelmaa. Matkustajat istuvat '
            + 'katoksen alla kahdessa rivissä, ja takarannalla näkyy '
            + 'Deiran matalia taloja ja minareetti.',
          lahde: 'Peter Dowley, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Bastakian kaupunginosa': {
      aika: '1890-luku',
      teksti: 'Kortteli rakennettiin 1890-luvulta alkaen, ja rakentajat '
          + 'olivat varakkaita persialaisia kauppiaita, jotka Dubain '
          + 'kauppaedut olivat houkutelleet lahden yli. Alue sai nimensä '
          + 'Bastakin kaupungista Etelä-Iranista. Parhaimmillaan taloja oli '
          + 'noin 60, ja useimpien välissä kulki vain kapea mutkitteleva '
          + 'kuja.'
          + '\n\n'
          + '1980-luvulla puolet Bastakiasta purettiin toimistokompleksin '
          + 'tieltä, ja jäljelle jääneet talot päätyivät varastoiksi. '
          + 'Vuonna 1989 Dubain kaupunki määräsi lopunkin purettavaksi. '
          + 'Alueella asunut brittiarkkitehti Rayner Otter oli kunnostanut '
          + 'oman talonsa perusteellisesti, ja hän aloitti kampanjan '
          + 'korttelin puolesta ja kirjoitti kirjeen prinssi Charlesille, '
          + 'joka oli tulossa Dubaihin samana vuonna. Charles pyysi päästä '
          + 'Bastakiaan, kierteli alueen Otterin kanssa ja ehdotti sen '
          + 'säilyttämistä. Purkupäätös peruttiin.'
          + '\n\n'
          + 'Dubain kaupunki aloitti kunnostushankkeen vuonna 2005, ja '
          + 'samalla nimeksi vaihtui Al Fahidin historiallinen '
          + 'kaupunginosa. Kujien varrella on nykyään gallerioita, '
          + 'kahviloita ja pieniä museoita: kahvimuseon alakerrassa '
          + 'paahdetaan ja keitetään papuja näytille.',
      kuvat: [
        {
          tiedosto: 'Bastikya - With Old City Wall.jpg',
          selite: 'Kapea kuja Bastakiassa. Vasemmalla on palmunvarsista tehty '
            + 'seinä ja rivi puuovia, oikealla korkea hiekanvärinen '
            + 'muuri, ja perällä kohoaa tuulitorni.',
          lahde: 'MrT HK, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Al Fahidin linnoitus': {
      aika: '1787',
      teksti: 'Linnoituksen vanhin torni rakennettiin noin vuonna 1787, ja se '
          + 'on Dubain vanhin yhä pystyssä oleva rakennus. Linnoitus on '
          + 'neliön muotoinen, ja kolmessa sen kulmassa on torni. Muurit '
          + 'ovat korallikiveä ja laastia, ja ne nousivat useassa '
          + 'vaiheessa. Linnoitus vartioi kaupunkiin johtavia maareittejä '
          + 'ja toimi vuoroin hallitsijan asuntona, varuskuntana ja '
          + 'vankilana. Itämuurin pääportilla seisoo kaksi tykkiä.'
          + '\n\n'
          + 'Vuonna 1969 sheikki Hamdan bin Rashid Al Maktoum pyysi '
          + 'kirjeitse Kuwaitista museoasiantuntijaa Dubaihin, ja museo '
          + 'avattiin linnoitukseen vuonna 1971. Tilaa on 4 000 '
          + 'neliömetriä. Vuonna 2007 kävijöitä oli 1 800 päivässä ja 611 '
          + '840 koko vuonna; vuonna 2013 ylittyi miljoonan raja. Rakennus '
          + 'kunnostettiin vuonna 2021.'
          + '\n\n'
          + 'Näyttely jatkuu maan alla. Lounaistornista laskeudutaan '
          + 'kierreportaita käytäviin, joissa on luonnollisen kokoisia '
          + 'lavasteita öljyä edeltävästä Dubaista: rannan suuki kojuineen, '
          + 'räätäli, puuseppä ja seppä työn ääressä, sitten aavikko ja '
          + 'meri, jossa rakennetaan dhow-purjelaivaa. Viimeinen lavaste on '
          + 'Al Qusaisin kaivauskohde, jonka haudat ovat vuodelta 3000 eaa.',
      kuvat: [
        {
          tiedosto: 'Al Fahidi Fort 02.jpg',
          selite: 'Al Fahidin linnoituksen pyöreä kulmatorni ja '
            + 'korallikivestä ladottu muuri. Tornin huipulla liehuu '
            + 'Dubain lippu, ja takana kohoaa moskeijan minareetti.',
          lahde: 'Nasser Ali Alkhlaifi, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Dohan nähtävyysjutut (nippu 2, 12.8.2026). Kolme kohdetta — Souq
   * Waqif, Islamilaisen taiteen museo ja kansallismuseo — on jo QAT-
   * maalehdessä omina juttuinaan, koska maalehti kirjoitettiin ennen
   * kuin Dohalla oli lehteä. Niiden jutut kertovat siksi tarkoituksella
   * eri asian kuin maalehti: museon sisätilan, haukkasuukin ja vanhan
   * palatsin. Perustelu ja mittaus:
   * docs/raportit/lehtityo-2026-08-12-nippu2-suunnittelu.md.
   */
  doha: {
    'Islamilaisen taiteen museo': {
      teksti: 'Näyttelysalit on ryhmitelty suuren keskusaulan ympärille, ja '
        + 'valo tulee aulaan ylhäältä. Katon kupoli on monikulmainen ja '
        + 'koostuu kolmiomaisista pinnoista, ja sen lakeen on jätetty '
        + 'tähdenmuotoinen aukko, josta päivänvalo putoaa suoraan alas. '
        + 'Pääportaikko haarautuu kahdeksi kaartuvaksi syöksyksi, ja '
        + 'portaiden yllä riippuu rengasmainen metallinen kattokruunu. '
        + 'Lattiaan on ladottu mustan ja vaalean kiven geometrinen kuvio.'
        + '\n\n'
        + 'Päärakennuksessa on viisi kerrosta, kupoli ja keskustorni, ja '
        + 'pinta-alaa 45 000 neliömetriä. Julkisivut ovat kermanvaaleaa '
        + 'kalkkikiveä, jonka sävy vaihtuu päivän mittaan, ja kiveen on '
        + 'tehty pieniä kaari-ikkunoita tasavälein. Pohjoissivulla kaikki '
        + 'viisi kerrosta on verhottu lasiseinällä. Salien sisustuksen '
        + 'suunnitteli Wilmotte & Associés, sama toimisto kuin Louvren '
        + 'hankkeessa.'
        + '\n\n'
        + 'Museo seisoo noin 60 metrin päässä Corniche-rantakadusta ja on '
        + 'sen seitsemän kilometrin mitan toisessa päässä. Itä- ja '
        + 'eteläsivua kiertää varta vasten tehty 290 000 neliömetrin '
        + 'puisto, jolle johtaa museon eteläjulkisivulta kaksi siltaa; '
        + 'lännessä ja pohjoisessa on vanha dhow-satama. Rakennustyöstä '
        + 'vastasi turkkilainen Baytur Construction vuonna 2006, ja museo '
        + 'avattiin yleisölle 8. joulukuuta 2008. Remontin jälkeen ovet '
        + 'aukesivat uudelleen 4. lokakuuta 2022: saleja oli 18 ja esillä '
        + 'yli 1 100 esinettä.',
      kuvat: [
        {
          tiedosto: 'Doha Museum of Islamic Arts Interior Hall 01.jpg',
          selite: 'Museon keskusaula: portaat haarautuvat kahdeksi kaarevaksi '
            + 'syöksyksi, yllä riippuu rengasmainen kattokruunu ja '
            + 'taustalla nousee pohjoisseinän lasipinta.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Doha Museum of Islamic Arts Interior Hall Ceiling 1.jpg',
          selite: 'Aulan kupoli alhaalta kuvattuna: kolmiopinnoista koottu '
            + 'holvi ja sen lakeen jätetty tähdenmuotoinen valoaukko.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Corniche': {
      teksti: 'Kartalla näkyvä kaari on Corniche, seitsemän kilometrin '
        + 'rantabulevardi puolikuun muotoisen Dohanlahden ympäri: '
        + 'pohjoispäässä West Bayn Sheraton, eteläpäässä Al Khulaifatin '
        + 'puisto, välissä kuusikaistainen katu ja yhtenäinen '
        + 'jalankulkuraitti. Kaari ei seuraa vanhaa rantaviivaa. Vesiraja '
        + 'kulki ennen nykyisten kortteleiden kohdalla, ja Souq Waqif — '
        + 'joka oli satamatori — jäi sisämaahan.'
        + '\n\n'
        + 'Kaari piirrettiin 1970-luvun puolivälissä, kun lahden '
        + 'pohjukkaan oli kasattu 630 hehtaaria uutta maata. Emiirin '
        + 'hallintoviraston suunnittelutoimistoa johtanut Hisham Qaddumi '
        + 'kutsui Dohaan amerikkalaisen arkkitehdin William Pereiran '
        + 'vuonna 1975. Kaksikko teki yli neljäkymmentä luonnosta: kaari '
        + 'suljettiin puoliympyräksi ja katuun merkittiin viisi '
        + 'liikenneympyrää. Pereiran pyramidinmuotoinen Sheraton nousi '
        + 'omalle täyttömaasaarelleen ja avattiin 22. helmikuuta 1982. '
        + 'Sen taakse ruopatulle maalle kasvoi 1980-luvulla Al Dafnan '
        + 'liikekeskusta.'
        + '\n\n'
        + 'Sama kaari yhdistää vanhan sataman ja pohjoispään lasitornit. '
        + 'Sataman suulla seisoo veistos: avattu simpukankuori ja sen '
        + 'sisällä helmi. Rantaan on rakennettu kolme laituria puisille '
        + 'dhow-veneille, katua reunustaa 1 440 palmunlehden muotoista '
        + 'valaisinta, ja Dohan metron 37 asemasta seitsemän on kaaren '
        + 'varrella. Aamuvarhaisella raitilla juostaan, keskipäivällä '
        + 'istutaan palmujen varjossa, illalla ranta täyttyy perheistä.',
      kuvat: [
        {
          tiedosto: 'Corniche in Doha, Promenade.jpg',
          selite: 'Cornichen laatoitettu kävelyraitti ja matala betonimuuri '
            + 'kaartuvat lahden ympäri, vastarannalla West Bayn tornit.',
          lahde: 'FLASHPACKER TRAVELGUIDE, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Traditional dhows on Doha Corniche used for pearling.jpg',
          selite: 'Kaksi puista dhow-venettä kiinni rannassa, kansilla '
            + 'lehvistä katetut varjokatokset; takana rantakadun palmut '
            + 'ja kaupungin talot.',
          lahde: 'Larry Johnson @ Flickr, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Souq Waqif': {
      teksti: 'Torin laidalla on oma osastonsa haukoille. Haukkasuukissa '
        + 'pidetään huutokauppoja ja totutetaan lintuja käsittelyyn, ja '
        + 'myynnissä on lintujen lisäksi varusteita laskeutumisalustoista '
        + 'GPS-paikantimiin. Metsästyskausi kestää lokakuusta '
        + 'huhtikuuhun. Lintu maksaa tavallisesti 4 000–10 000 dollaria, '
        + 'mutta vuonna 2022 yhdestä maksettiin huutokaupassa 250 000. '
        + 'Lajeja käytetään neljää: aavikkohaukkaa sitkeyden ja näön '
        + 'takia, muuttohaukkaa nopeuden vuoksi, kuivuutta kestävää '
        + 'keltapäähaukkaa ja tuotua tunturihaukkaa, joka on lähinnä '
        + 'näyttölintu.'
        + '\n\n'
        + 'Eläinlääkäri on samalla kujalla. Souq Waqif Falcon Hospital on '
        + 'tarkoitettu pelkästään haukoille, se toimii useassa '
        + 'kerroksessa, ja kiireimpään aikaan siellä käy jopa 150 lintua '
        + 'päivässä. Aavikkohaukka on Qatarin kansallislintu, sama laji '
        + 'kuin Arabiemiirikunnissa, Saudi-Arabiassa, Omanissa ja '
        + 'Jemenissä. Linnut hankitaan enimmäkseen pyydystämällä, harvoin '
        + 'pesästä, ja Al Khorin lahden seutu on suosittu pyyntipaikka.'
        + '\n\n'
        + 'Kortteli on nimeltään Al Jasrah. Samassa korttelissa ovat Souq '
        + 'Waqifin hevostallit ja Al Kootin linnake, ja ihmisten '
        + 'ensimmäinen sairaala perustettiin tänne vuonna 1947. '
        + 'Haukkametsästäjien ainoa yhdistys Al Gannas syntyi 2008 '
        + 'Kataran kulttuurikylässä ja järjestää vuosittaisen '
        + 'S\'hail-festivaalin.',
      kuvat: [
        {
          tiedosto: 'Falcon souq 03.jpg',
          selite: 'Haukkasuukin liike Souq Waqifissa: lattiana on hiekka, sen '
            + 'yli kulkee vihreäpäällysteisiä orsirimoja ja niillä istuu '
            + 'haukkoja ilman huppua. Takaseinällä on varustevitriini, ja '
            + 'asiakkaat seisovat korotetulla kivilattialla; takaseinällä '
            + 'on liikkeen sisustuksena suuria muotokuvia.',
          lahde: 'Davide Mauro, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Doha - Gyrfalcon at Falcon hospital.jpg',
          selite: 'Valkoinen tunturihaukka vihreällä pylväsorrella '
            + 'haukkasairaalan portaiden edessä Dohassa.',
          lahde: 'P. Hughes, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Qatarin kansallismuseo': {
      aika: '1975',
      teksti: 'Sheikki Jassim bin Mohammed Al Thani valitsi hallintonsa '
        + 'paikaksi 1900-luvun alussa Fereej Al Salatan, '
        + 'merenrantakorttelin, jonne veneillä oli helppo tulla. Kun hän '
        + 'kuoli 1913, palatsiin jäi asumaan hänen poikansa Abdullah bin '
        + 'Jassim Al Thani, maan seuraava hallitsija. Rakennusryhmä '
        + 'kasvoi vuosikymmenten mittaan ilman kokonaissuunnitelmaa, ja '
        + 'vuoden 2010 inventoinnissa siitä tunnistettiin yhdeksän osaa: '
        + 'kolmen sheikin perheasunnot, vartijan talo, moskeijan hoitajan '
        + 'talo, kaksi porttitaloa ja kaksi majlista eli vierashuonetta.'
        + '\n\n'
        + 'Vuonna 1923 Abdullah siirsi hallinnon rannalta keskustaan, '
        + 'tyhjäksi jääneeseen vanhaan linnakkeeseen, ja palatsi jäi '
        + 'ilman tehtävää ja rapistui. Vuonna 1972 valtaan noussut '
        + 'Khalifa bin Hamad Al Thani päätti tehdä siitä maan '
        + 'kansallismuseon. Palatsi kunnostettiin, sen ympärille '
        + 'rakennettiin näyttelytilat ja viereen kaivettiin allas '
        + 'puuveneitä ja helmenpyynnin välineitä varten. Museo avattiin '
        + '23. kesäkuuta 1975, ja siihen kuului sadan paikan luentosali '
        + 'ja kirjasto. Vuonna 1980 se sai Aga Khan '
        + '-arkkitehtuuripalkinnon.'
        + '\n\n'
        + 'Palatsi kunnostettiin toistamiseen vuonna 2015, kun uutta '
        + 'museorakennusta valmisteltiin. Työstä vastasi berliiniläinen '
        + 'ZRS Architekten Ingenieure. Nykyään palatsi on museon keskellä '
        + 'oma pihapiirinsä: sahalaitaisten muurien sisällä on '
        + 'hiekkakenttä, palmuja ja kaksikerroksinen päärakennus, jonka '
        + 'yläkerrassa on rivi kaariaukkoja.',
      kuvat: [
        {
          tiedosto: 'Old Palace at National Museum of Qatar.jpg',
          selite: 'Vanha palatsi ylhäältä: sahalaitaisten muurien rajaama '
            + 'pihapiiri, palmurivi ja kaksikerroksinen päärakennus, '
            + 'ympärillä museon vaaleat katot ja takana meri.',
          lahde: 'Manjri Saxena, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Courtyard of the Palace.jpg',
          selite: 'Palatsin piha: palmunrunkopylväiden kannattaman katoksen '
            + 'alla rivi isoja saviruukkuja puutelineillä, taustalla '
            + 'päärakennuksen puuristikkoparvekkeet.',
          lahde: 'Alexmounayer, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Al Koot -linnake': {
      teksti: 'Al Koot -linnake tunnetaan myös nimellä Dohan linnake, ja se '
        + 'seisoo Al Biddan kaupunginosassa Souq Waqifin laidalla. '
        + 'Pohjakaava on neliö, muurit on rapattu valkoisiksi ja niiden '
        + 'harjalla kiertää rivi kolmiomaisia sakaroita. Kulmatorneja on '
        + 'neljä, mutta ne eivät ole keskenään samanlaisia: kolme on '
        + 'pyöreää ja yksi nelikulmainen. Muurissa on kapeita pystysuoria '
        + 'aukkoja, ja sisään mennään vaatimattomasta puuovesta keskellä '
        + 'seinää.'
        + '\n\n'
        + 'Vuosiluvuista on eri tietoja, mutta useimmin toistettu kulku '
        + 'menee näin: paikalle rakennettiin poliisiasema vuonna 1880, '
        + 'tilat otettiin vankilakäyttöön 1906, ja kun osmanit olivat '
        + 'jättäneet linnakkeen, sheikki Abdullah bin Jassim Al Thani '
        + 'rakennutti sen uudelleen vuonna 1927. Hän hallitsi Qataria '
        + 'vuodesta 1913 vuoteen 1949. Osa lähteistä kertoo tehtäväksi '
        + 'suoraan sen, että viereisen torin kauppiaat saisivat pitää '
        + 'tavaransa varkailta rauhassa.'
        + '\n\n'
        + 'Vankila-aika näkyy yhä yhdessä yksityiskohdassa: sisäpihan '
        + 'rukouspaikalta jätettiin pois sekä seinät että katto, jotta '
        + 'vartijat näkivät vangit myös rukouksen ajan. Vuoden 1978 '
        + 'korjaus muutti rakennusta niin paljon, että osa alkuperäisistä '
        + 'yksityiskohdista katosi, ja samalla linnakkeesta tuli '
        + 'näyttelytila. Esillä on kipsi- ja puuleikkauksia, '
        + 'kalastusvälineitä ja veneitä, vanhoja valokuvia ja '
        + 'öljymaalauksia käsityöläisistä. Qatar Museums sai uuden '
        + 'kunnostuksen valmiiksi vuonna 2022.',
      kuvat: [
        {
          tiedosto: 'Doha Souq Waqif Al Koot Fort 1.jpg',
          selite: 'Linnake kadun puolelta: nelikulmainen kulmatorni '
            + 'vasemmalla, pyöreät tornit keskellä ja oikealla, muurin '
            + 'harjalla kolmiomaiset sakarat.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Msheireb': {
      aika: '2010–2022',
      teksti: 'Msheireb tarkoittaa arabiaksi paikkaa, jossa juodaan vettä. '
        + 'Dohan vanha liikekeskusta oli rapistunut, ja tilalle '
        + 'rakennettiin kokonaan uusi 31 hehtaarin kaupunginosa. Työ '
        + 'alkoi tammikuussa 2010 ja eteni kuudessa vaiheessa; viimeinen '
        + 'valmistui helmikuussa 2022. Hinta oli noin 5,5 miljardia '
        + 'dollaria, asukkaita on suunniteltu 15 000. Vanhaa ei kopioitu, '
        + 'mutta mittakaava otettiin talteen: matalat talot seisovat '
        + 'lähekkäin varjostaen toisiaan, ja kadut on käännetty ottamaan '
        + 'vastaan lahdelta tuleva tuuli. Katoilla on 6 400 '
        + 'aurinkopaneelia sähköä ja 1 400 veden lämmitystä varten.'
        + '\n\n'
        + 'Neljää vanhaa taloa ei purettu. Ne kunnostettiin arkkitehti '
        + 'John McAslanin johdolla ja avattiin museoina lokakuussa 2015. '
        + 'Company House kertoo öljyalan ensimmäisistä työntekijöistä ja '
        + 'heidän perheistään: ensimmäinen kaivo porattiin Dukhanissa '
        + '1939 ja ensimmäinen öljylasti lähti maasta 1949. Radwani House '
        + 'on 1920-luvulta, kuului Akbar Radwanin perheelle ja näyttää '
        + 'tavallisen perheen arjen. Mohammed Bin Jassim Housen '
        + 'rakennutti maan perustajan poika; siellä on Echo Memory '
        + '-kokoelma esineitä, jotka tulivat esiin aluetta purettaessa. '
        + 'Bin Jelmood House käsittelee Intian valtameren orjakauppaa ja '
        + 'sen lakkauttamista.'
        + '\n\n'
        + 'Talot ovat Mohammed Bin Jassim -kadulla kansallisarkiston '
        + 'naapurissa, ja korttelin läpi kulkee raitiotie. Britannian '
        + 'arkkitehtiliitto valitsi museon 2018 maailman parhaiden uusien '
        + 'rakennusten joukkoon.',
      kuvat: [
        {
          tiedosto: 'Msheireb Downtown Doha tram at night.jpg',
          selite: 'Msheirebin raitiovaunu illalla uuden korttelin '
            + 'kivijulkisivujen välissä; kiskot on upotettu kuvioituun '
            + 'jalankulkupintaan.',
          lahde: 'Michael Coghlan @ Flickr, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Radwani House.jpg',
          selite: 'Radwani Housen lattia on avattu kaivauksin: renkaan '
            + 'muotoinen syvennys ja vanhempien muurien pohjia '
            + 'kalkittujen seinien sisällä.',
          lahde: 'Davide Mauro, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Nikosian nähtävyysjutut (nippu 2, 12.8.2026). Nikosia on jaettu
   * kaupunki, mutta lehti ei käsittele jakoa: peli ei kerro
   * nykykonflikteista, joten kohteet kuvataan kulttuurikohteina
   * omalla historiallaan. CYP-maalehti kertoo saaren muinaisuudesta
   * ja kirkoista, joten kaupungin jutut pysyvät rakennuksissa.
   */
  nikosia: {
    'Selimiyen moskeija': {
      aika: '1570',
      teksti: 'Perustuskivi laskettiin 1209, ja vihkiminen ehti vasta vuoteen '
        + '1326. Väliin osui kaksi maanjäristystä, 1267 ja 1303, ja '
        + 'keskilaiva ja länsijulkisivu valmistuivat vasta arkkipiispa '
        + 'Giovanni del Conten aikana 1319–1326. Sisämitat ovat 66 × 21 '
        + 'metriä, ja rakennus on Kyproksen vanhin ja suurin säilynyt '
        + 'goottilainen kirkko. Pohjakaava on lainattu Pariisista: kuoria '
        + 'kiertää käytävä eikä apsidiin tehty kappeleita, kuten '
        + 'Notre-Damessa. Ranskalaisen Lusignan-suvun kuninkaat '
        + 'kruunattiin täällä.'
        + '\n\n'
        + 'Syyskuussa 1570 rakennus sai toisen elämän. Ensimmäinen '
        + 'perjantairukous pidettiin 15. syyskuuta, ja samana vuonna '
        + 'länsipäätyyn nousi kaksi minareettia. Sisällä muutos oli '
        + 'käytännöllinen: patsaat ja kirkon kalusteet kannettiin ulos, '
        + 'kivilattia peitettiin matoilla ja seinään hakattiin '
        + 'mihrab-syvennys. Mekka on Nikosiasta kaakossa, ei idässä, '
        + 'joten rukoussuunta ei osu kirkon pituusakselille — matot on '
        + 'ladottu vinoon pilaririveihin nähden. Runkoon ei koskettu: '
        + 'ristiholvit, ikkunaruusukkeet ja kimppupilarit jäivät '
        + 'paikoilleen. Rukoustilaa on 1 750 neliömetriä, ja väkeä mahtuu '
        + '2 500.'
        + '\n\n'
        + 'Nimi on nuori: vuoteen 1954 asti rakennus oli Ayasofya, ja 13. '
        + 'elokuuta se nimettiin sulttaani Selim II:n mukaan. Vuodesta '
        + '1949 rukouskutsu on tullut kaiuttimista eikä minareetin '
        + 'parvekkeelta.',
      kuvat: [
        {
          tiedosto: 'Selimiye Mosque (St. Sophie Cathedral) (01).JPG',
          selite: 'Länsipäädyn eteishalli: kaksi korkeaa goottilaista '
            + 'suippokaarta järeiden kivipilarien välissä, takaa nousee '
            + 'minareetti parvekkeineen. Kaaren takana näkyy veistoksin '
            + 'koristeltu ovipieli, josta kuljetaan rukoussaliin.',
          lahde: 'Chris06, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Lefkoşa Selimiye-Moschee (Sophienkathedrale) Innen Mihrab 1.jpg',
          selite: 'Mihrab valkoiseksi kalkitun goottilaisen seinän edessä: '
            + 'maalattu kukkakehys, kalligrafiakenttä ja tippukivimäinen '
            + 'katos syvennyksen yllä. Vasemmalla kohoaa kimppupilari, '
            + 'oikealla korkea puuristikkoikkuna, ja koko lattian peittää '
            + 'punainen kuviomatto.',
          lahde: 'Zairon, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Büyük Han': {
      aika: '1572',
      teksti: 'Kyproksen suurin karavaaniseraaji mittaa ulkoa 50,67 × 45,25 '
        + 'metriä, ja sen sisään jää 27,68 × 26,21 metrin piha. Ovia on '
        + 'kaksi, idässä ja lännessä, vaikka tämän tyypin majatalossa on '
        + 'tavallisesti yksi. Pääovi on itäsivulla, ja sen yllä oleva '
        + 'piirtokirjoituksen kehys jäi tyhjäksi. Alakerran ristiholvatun '
        + 'kaarikäytävän takana ovat holvatut huoneet, ja niiden edessä '
        + 'oli kaukalot, joihin matkustajan eläimet kytkettiin: tavara ja '
        + 'juhdat jäivät maan tasalle.'
        + '\n\n'
        + 'Yläkertaan noustaan kahta kiviportaikkoa myöten pihan '
        + 'kaakkois- ja luoteiskulmasta. Huoneita on kahdessa kerroksessa '
        + 'yhteensä 68, ja yläkerran huone on tehty nukkumista varten: '
        + 'matalakaarinen ovi, tulisija, kaappina käytetty seinäsyvennys, '
        + 'kapeat ikkuna-aukot ja katossa valoaukko. Itäportin päällä '
        + 'oleva huone on muita suurempi. Katolla seisoo puolentoista '
        + 'metrin korkuisia savupiippuja, joiden pohja on kuusi- tai '
        + 'kahdeksankulmainen ja huippu kartiomainen.'
        + '\n\n'
        + 'Pihan keskellä on köşk mescit, kahdeksankulmainen rukoushuone '
        + 'kupolin alla. Se lepää kahdeksan marmoripylvään kannattamien '
        + 'suippokaarien varassa, jokaisella sivulla on pihalle avautuva '
        + 'ikkuna, ja pylväiden alla on vesisäiliö. Britannian hallinnon '
        + 'aikana rakennus toimi kaupungin keskusvankilana 1892–1903, '
        + 'sitten jälleen majatalona ja vuodesta 1947 halpoina '
        + 'vuokrahuoneina; kunnostus valmistui 2002. Vuokrasopimus vaatii '
        + 'nyt, että myytävä tavara on myyjän omaa käsialaa.',
      kuvat: [
        {
          tiedosto: 'Büyük Han (43722761521).jpg',
          selite: 'Sisäpiha ylhäältä: suippokaariset holvikäytävät kiertävät '
            + 'pihaa kahdessa kerroksessa, keskellä kohoaa kupolinen '
            + 'rukoushuone kaarien päällä ja katonharjalla on rivi '
            + 'kartiopäisiä savupiippuja.',
          lahde: 'dronepicr, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Lefkoşa Karawanserei Büyük Han Innenhof Obere Galerie 1.jpg',
          selite: 'Yläkerran pylväskäytävä huoneiden edessä: holvattu '
            + 'kivikatto, vasemmalla huoneen ovi ja karkea kiviseinä, '
            + 'oikealla kaide ja näkymä pihan yli vastapäiseen käytävään.',
          lahde: 'Zairon, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Faneromenin kirkko': {
      aika: '1872',
      teksti: 'Kirkon muurikivistä suuri osa on vanhempaa perua. Pääosa '
        + 'tuotiin La Cavan linnasta, joka pystytettiin noin 1385 '
        + 'Arona-kukkulalle ja joka sai nimensä kallioon louhitusta '
        + 'vesisäiliöstä. Venetsialaiset räjäyttivät linnan 1520-luvulla, '
        + 'mutta vielä 1870 siitä oli pystyssä holvisali, kehämuurit ja '
        + 'kaksi tornia. Sinä vuonna jäljellä ollut purettiin lähes '
        + 'kokonaan ja kivet ajettiin kirkon työmaalle. Loput otettiin '
        + 'samalla paikalla aiemmin toimineesta nunnaluostarista.'
        + '\n\n'
        + 'Nykyinen kirkko valmistui 1872 vanhemman kirkon paikalle, ja '
        + 'se on vanhankaupungin suurin kirkko. Se on omistettu Neitsyt '
        + 'Marialle, ja nimi Faneromeni tarkoittaa ilmestynyttä. Tyylejä '
        + 'on kolme päällekkäin: uusklassinen, bysanttilainen ja '
        + 'keskiaikainen latinalainen. Pilaririvit jakavat salin kolmeen '
        + 'laivaan, holvit ovat suippokaarisia ja perällä on kullattu '
        + 'ikonostaasi. Kellotorni kohoaa kirkon toisessa päässä kahtena '
        + 'kaariaukkoisena kerroksena.'
        + '\n\n'
        + 'Pihalla seisoo marmorinen mausoleumi neljän vuonna 1821 '
        + 'teloitetun kirkonmiehen muistoksi; kryptassa lepäävät '
        + 'arkkipiispa Kyprianoksen ja kolmen piispan jäännökset. '
        + 'Vastapäätä on Faneromenin koulu, jonka arkkipiispa Makarios I '
        + 'perusti 1857 saaren ensimmäisenä tyttökouluna. Oppilaita oli '
        + 'alussa 115 ja opettajia yksi, joten vanhemmat lapset pantiin '
        + 'apuopettajiksi. Vuodesta 1903 talossa koulutettiin myös '
        + 'naisopettajia, ja nykyisen muotonsa se sai 1924 kirkon '
        + 'rahoituksella.',
      kuvat: [
        {
          tiedosto: 'Lefkosia-faneromeni-church.jpg',
          selite: 'Kirkon kylki hiekankeltaisesta kivestä: etualalla '
            + 'suippokaarinen kuisti, takana kellotorni, jonka molemmissa '
            + 'kerroksissa on kaariaukkoja ja huipulla risti.',
          lahde: 'Mboesch, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Lefkosia-faneromeni-church-inside.jpg',
          selite: 'Kirkkosali sisäänkäynniltä: pilaririvit, suippokaariset '
            + 'holvit ja perällä kullattu ikonostaasi. Katosta riippuu '
            + 'monikerroksinen kristallikruunu, vasemmalla on puinen '
            + 'saarnatuoli portaineen.',
          lahde: 'Mboesch, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'NICOSIA, 11 AUGUST, 2011 172.jpg',
          selite: 'Marmorinen mausoleumi kirkon pihalla: pylväät kannattavat '
            + 'kaarta ja kupolia, jonka huipulla on risti. Takana kohoaa '
            + 'Faneromenin koulun uusklassinen julkisivu, ja niiden '
            + 'välissä liehuu ortodoksikirkon keltainen lippu '
            + 'kaksipäisine kotkineen.',
          lahde: 'Giorgis 2011, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Omeryen hamam': {
      aika: '1571',
      teksti: 'Kylpylän paikalla seisoi 1300-luvulla augustinolaisten Pyhän '
        + 'Marian kirkko, kivestä muurattu ja katettu pienillä '
        + 'kupoleilla. Nikosian piirityksessä 1570 tykkituli hajotti '
        + 'siitä suurimman osan. Vuonna 1571 Lala Mustafa Pasha '
        + 'rakennutti paikalle moskeijan kalifi Omarin muistoksi, ja '
        + 'kylpylä pystytettiin saman kokonaisuuden osaksi. Kirkosta on '
        + 'yhä jäljellä pääsisäänkäynnin ovi, joka on 1300-luvulta '
        + 'Lusignanien ajalta, ja koillissivulla erottuu jäänteitä '
        + 'myöhemmästä renessanssivaiheesta.'
        + '\n\n'
        + 'Hamamissa kuljetaan aina samassa järjestyksessä: riisuutumis- '
        + 'ja vilvoittelutila, lämmin välihuone, kuuma huone. Kuuman '
        + 'huoneen keskellä on lämmitetty marmoripöytä, jolla maataan, ja '
        + 'nurkissa pieniä kupolikomeroita yksityistä peseytymistä '
        + 'varten. Lämpö tulee huoneiden takaa, niitä alemmas '
        + 'sijoitetusta uunista: padassa kuumennetaan vesi, ja savu ja '
        + 'kuuma ilma johdetaan lattian alla kulkevia kanavia pitkin '
        + 'seinien sisään ja hormeihin. Kylpijä ei upottaudu altaaseen '
        + 'vaan peseytyy juoksevassa vedessä. Kupoleihin on puhkaistu '
        + 'pieniä aukkoja, jotka päästävät päivänvalon sisään ja liian '
        + 'höyryn ulos.'
        + '\n\n'
        + 'Rakennus kunnostettiin 2002–2004 osana Nikosian '
        + 'yleissuunnitelmaa EU:n rahoituksella. Työhön kuului kupolien, '
        + 'lattianalaisen lämmityskanaviston ja uunitilan lujittaminen, '
        + 'ja se palkittiin Europa Nostra -palkinnolla rakennusperinnön '
        + 'suojelusta. Kylpylästä ei tehty museota: se on yhä käytössä.',
      kuvat: [
        {
          tiedosto: 'Hamam baths, Cyprus.jpg',
          selite: 'Hamamin matalat valkoiset kupolit karkean kalkkikivimuurin '
            + 'takaa: kupolien pintaan on upotettu rivi pyöreitä '
            + 'lasitäpliä ja yksi suorakaiteen muotoinen valoluukku. '
            + 'Takana kohoaa kaksi rapattua hormia, joiden yläosassa on '
            + 'aukko, ja kauempana moskeijan minareetti.',
          lahde: 'Mikettg at English Wikipedia, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'Omerye - panoramio.jpg',
          selite: 'Kylpylän laatoitettu etupiha: seinässä lukee Hamam Omerye, '
            + 'vieressä ruskeat luukkuovet, ja muurin takaa nousee '
            + 'valkoinen kupoli, jonka huipulla on ikkunallinen lyhty. '
            + 'Kupolin edessä näkyy vanhaa hiekkakivimuuria ja pihalle '
            + 'ripustetut verhot.',
          lahde: 'Georgy Papantoniou, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kyproksen museo': {
      teksti: 'Punaiseksi maalatun seinän edessä seisoo porrastetulla '
        + 'kivialustalla noin kaksituhatta terrakottahahmoa '
        + 'puolikaaressa. Ne kaivettiin Agia Irinin pyhäköstä '
        + 'marraskuussa 1929 puolen metrin syvyydestä hiekasta, ja ne '
        + 'olivat maassa juuri samassa puoliympyrässä — kaivajien '
        + 'mielestä asetelma muistutti teatteria. Museo on toistanut sen: '
        + 'kämmenen kokoiset hahmot ovat eturiveissä, taaimpana lähes '
        + 'luonnollisen kokoisia. Joukossa on pappeja, sotureita, härkiä '
        + 'ja hevosvaljakoita. Yksi tunnetaan uhripappina: pitkä viitta, '
        + 'turbaani ja kohotettu vasen käsi, jossa on luultavasti ollut '
        + 'uhriveitsi.'
        + '\n\n'
        + 'Roomalaisajan salissa seisoo pyöreän kivipaaden päällä '
        + 'pronssinen Septimius Severus, luonnollista kokoa suurempi. '
        + 'Patsas tuli esiin sattumalta 1928 Kythrean kylän liepeillä. '
        + 'Piirtokirjoitukset todistavat, että saarella oli '
        + 'roomalaisaikana runsaasti pronssiveistoksia; tämä on niistä '
        + 'ainoa säilynyt. Toisessa salissa on omalla jalustallaan '
        + 'marmorinen Afrodite Soloista, ensimmäiseltä vuosisadalta eaa.'
        + '\n\n'
        + 'Museo perustettiin 1882 kyproslaisten vetoomuksesta, kun Luigi '
        + 'Palma di Cesnola oli vienyt saarelta yli 35 000 esinettä. '
        + 'Nykyisen rakennuksen työt alkoivat 1908 ja päättyivät 1924. '
        + 'Neljätoista näyttelysalia kiertää neliömäistä keskiosaa, jossa '
        + 'ovat kirjasto, varastot ja laboratoriot; salit etenevät '
        + 'kivikaudesta roomalaisaikaan. Esillä on vain pieni osa '
        + 'kokoelmasta, ja pelkästään saarelta löytyneitä esineitä.',
      kuvat: [
        {
          tiedosto: 'Nikosia BW 2023-09-21 11-50-51.jpg',
          selite: 'Agia Irinin terrakottahahmot punaisen seinän edessä: '
            + 'pienet figuurit alimmilla kiviportailla, takarivissä lähes '
            + 'luonnollisen kokoiset hahmot kartiomaisine päähineineen.',
          lahde: 'Berthold Werner, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Nikosia BW 2023-09-21 12-04-43.jpg',
          selite: 'Septimius Severuksen pronssipatsas pyöreän kivipaaden '
            + 'päällä: vihertäväksi patinoitunut parrakas hahmo, kädet '
            + 'koukussa kuin ne olisivat pitäneet asetta.',
          lahde: 'Berthold Werner, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Leventis-museo': {
      aika: '1989',
      teksti: 'Museo kertoo yhden kaupungin tarinan, ja se kerrotaan '
        + 'takaperin. Näyttely alkaa nykypäivän Nikosiasta ja vie kävijän '
        + 'kerros kerrokselta taaksepäin kalkoliittiseen aikaan, vuoteen '
        + '3000 eaa. Kokoelmissa on yli 5 000 vuotta pääkaupungin '
        + 'historiaa: kaivauslöytöjä, keskiaikaista keramiikkaa, koruja, '
        + 'pukuja, valokuvia ja huonekaluja.'
        + '\n\n'
        + 'Vanhimmasta päästä on lautamainen naista esittävä hahmo '
        + '1700-luvulta eaa. ja tynnyrinmuotoinen oinochoe-kannu, jonka '
        + 'kylkeen on maalattu lintu; se on arkaaiselta kaudelta 750–600 '
        + 'eaa. Keskiajan vitriineissä ovat vihreän ja ruskean kirjava '
        + 'lasitettu savivati 1300-luvulta, ristiretkeläisen miekka noin '
        + 'vuodelta 1200 ja kaupunginsinetti 1200-luvulta. Uusin pää on '
        + 'sisustettu huoneiksi, joissa on lasiovisia kaappeja ja '
        + 'veistoselkäisiä tuoleja. Yhdessä vitriinissä on nikosialaisen '
        + 'naisen puku vuoden 1721 piirroksen mukaan, toisessa '
        + 'hopealankakori kullattuine kotkineen vuodelta 1884.'
        + '\n\n'
        + 'Museo toimii vanhassa asuintalossa Hippokrateen kadun '
        + 'varrella. A. G. Leventisin säätiö osti ja kunnosti '
        + 'rakennuksen, ja museo perustettiin 1984 kaupunginjohtaja '
        + 'Lellos Demetriadesin aloitteesta; kaupunki hallinnoi sitä. '
        + 'Ovet avattiin yleisölle 20. huhtikuuta 1989, ja se oli '
        + 'Kyproksen ensimmäinen historiallinen museo. Kokoelmia '
        + 'kartuttamaan perustettiin 1985 ystäväyhdistys, jonka '
        + 'jäsenmaksu oli viisi Kyproksen puntaa vuodessa. Vuonna 1991 '
        + 'museo valittiin Euroopan vuoden museoksi.',
      kuvat: [
        {
          tiedosto: 'Leventio historic museum in Nicosia Republic of Cyprus.JPG',
          selite: 'Museon julkisivu kadun varrella: okrankeltainen seinä, '
            + 'siniset säleikkoluukut ja harmaat kiviset pielet, '
            + 'takorautainen parveke veistettyjen konsolien varassa ja '
            + 'sen alla holvikaarinen ovi rautaisine viuhkaikkunoineen.',
          lahde: 'AyianapaProtaras, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'LMM - Schüssel 14.Jhdt.jpg',
          selite: 'Lasitettu savivati 1300-luvulta: vaalealle pohjalle on '
            + 'kaiverrettu kiertävä kuvio ja siihen levitetty vihreää ja '
            + 'oranssinruskeaa. Vati on halkeillut ja koottu paloista.',
          lahde: 'Wolfgang Sauber, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Muzei Leventis-Interior.jpg',
          selite: 'Sisustettu huone näyttelyssä: lasiovinen puukaappi '
            + 'kirjoineen, kaksi posliinimaljakkoa sen päällä, '
            + 'raidallinen saviruukku rautajalustalla ja veistoselkäinen '
            + 'nojatuoli matoilla.',
          lahde: 'Молли, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Kuwaitin nähtävyysjutut (nippu 2, 12.8.2026). Nikosia on jaettu
   * kaupunki, mutta lehti ei käsittele jakoa: peli ei kerro
   * nykykonflikteista, joten kohteet kuvataan kulttuurikohteina
   * omalla historiallaan. CYP-maalehti kertoo saaren muinaisuudesta
   * ja kirkoista, joten kaupungin jutut pysyvät rakennuksissa.
   */
  kuwait: {
    'Kuwait-tornit': {
      aika: '1976',
      teksti: 'Tornit syntyivät ruotsalaisen insinööritoimisto VBB:n '
        + 'hankkeessa. Toimiston pääarkkitehti Sune Lindström oli jo '
        + 'pystyttänyt viisi tornirykelmää samalla kaavalla, mutta '
        + 'kuudennelle paikalle niemen kärkeen haluttiin jotain muuta. '
        + 'Kymmenestä luonnoksesta kolme esiteltiin maan hallitsijalle '
        + 'Jaber al-Ahmadille, joka valitsi tanskalaisen arkkitehdin '
        + 'Malene Bjørnin työn. Rakentamisen hoiti belgradilainen Union '
        + 'Inženjering, ja rungot tehtiin teräsbetonista ja jännitetystä '
        + 'betonista. Työ kesti vuodesta 1971 vuoteen 1976.'
        + '\n\n'
        + 'Pallojen kuori on koottu pienistä emaloiduista teräskiekoista, '
        + 'jotka on ladottu kierteisiksi nauhoiksi pallon ympäri. Sävyt '
        + 'eivät muodosta yhtenäistä pintaa vaan kaarevia raitoja, ja '
        + 'siksi pallo näyttää eri suunnista ja eri valossa eri '
        + 'väriseltä. Kuvio muistuttaa vanhojen moskeijoiden kaakeloituja '
        + 'kupoleita. Arkkitehdin mukaan koko ryhmä yhdistää kaksi kuvaa, '
        + 'maapallon ja raketin.'
        + '\n\n'
        + 'Kolmas torni on kapea neula ilman palloa: siihen sijoitettiin '
        + 'laitteet, joilla kaksi muuta valaistaan pimeän tultua. Aga '
        + 'Khan -arkkitehtuuripalkinto jaettiin ensimmäisen kerran vuonna '
        + '1980, ja Kuwaitin tornit olivat yksi palkituista kohteista. '
        + 'Kunnostuksen ajan maaliskuusta 2012 maaliskuuhun 2016 tornit '
        + 'olivat suljettuina.',
      kuvat: [
        {
          tiedosto: 'Kuwait towers -2005 2006 Winter- (302658101).jpg',
          selite: 'Kolmikko tienvarresta nähtynä: oikealla päätorni kahtine '
            + 'palloineen, vasemmalla yksipalloinen torni ja niiden '
            + 'välissä kolmas, kapea ja palloton. Kiekkojen kierteinen '
            + 'ladonta erottuu pallojen pinnassa vaaleansinisenä '
            + 'ristikkona.',
          lahde: 'radiant guy from Den Haag, The Netherlands, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Kuwait City\'s popular landmarks Liberty Tower & Kuwait Towers.jpg',
          selite: 'Samat tornit mereltä kuvattuna keskipäivän autereessa. '
            + 'Kaukaa katsottuna pallot näyttävät hopeanharmailta ja '
            + 'kiekkojen kuvio häviää lähes kokonaan; takana kohoavat '
            + 'kaupungin uudemmat pilvenpiirtäjät.',
          lahde: 'Mahrs Multiverse, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Al Hamra -torni': {
      teksti: 'Tornin pohjakaava on pyöristetty neliö, josta on leikattu '
        + 'neljännes pois. Puuttuva neljännes ei ole joka kerroksessa '
        + 'samassa kohdassa: alhaalla se on lounaisnurkassa, ylhäällä '
        + 'kaakkoisnurkassa ja siirtyy kerros kerrokselta vähän. Siksi '
        + 'torni näyttää kiertyvän. Viillon reunoina on kaksi '
        + 'betoniseinää, jotka nousevat ytimen nurkista katolle asti ja '
        + 'kaartuvat ulospäin. Niiden väliin jäävä eteläsivu on lähes '
        + 'umpinainen kalkkikiviseinä; lasia on vain pohjoisessa, idässä '
        + 'ja lännessä.'
        + '\n\n'
        + 'Muodon sanelee aurinko. Kuwait City on 29. leveyspiirillä, '
        + 'joten aurinko on keskipäivällä aina etelässä ja eteläjulkisivu '
        + 'saisi päivän kovimman säteilyn. Poistettu neljännes siirtää '
        + 'toimistokerrokset pois siltä puolelta ja kääntää ne merelle '
        + 'päin. Jura-kalkkikiviseinään ikkunat on upotettu vinoon niin, '
        + 'että aukon reuna varjostaa lasia. Kantavat betoniseinät ovat '
        + 'alhaalla 1 200 millimetriä paksuja ja ohenevat huipulla 300 '
        + 'millimetriin.'
        + '\n\n'
        + 'Korkeutta on 412 metriä ja kerroksia 80, joista noin 72 on '
        + 'toimistokerroksia; ylin käytössä oleva lattia on 351 metrissä. '
        + 'Sisääntuloaula on 24 metriä korkea ilman yhtään pilaria, ja '
        + 'hissejä on 43. Perustuksena on neljä metriä paksu betonilaatta '
        + '289 paalun päällä. Tontille oli suunniteltu 200-metrinen talo, '
        + 'mutta kaupunki nosti korkeusrajan 400 metriin kesken '
        + 'kellarikaivuiden. Gary Haneyn ja Skidmore, Owings & Merrillin '
        + 'suunnittelema torni valmistui 2011.',
      kuvat: [
        {
          tiedosto: 'Kuwait City Kuwait Towers View to the al-Hamra Tower.jpg',
          selite: 'Al Hamra -torni keskustan matalampien tornien yllä: '
            + 'lasipinta kaartuu ylöspäin ja pohjakaavasta pois leikattu '
            + 'neljännes päättyy huipulla vinoon kärkeen.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Al Hamra Kuwait Mai 2010.jpg',
          selite: 'Torni keskeneräisenä toukokuussa 2010 alhaalta kuvattuna. '
            + 'Kalkkikivellä verhotut kaarevat betoniseinät nousevat '
            + 'maasta huipulle, ja niiden väliin jäävään eteläseinään on '
            + 'tehty vinot ikkuna-aukot.',
          lahde: 'J.Stiegler, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Seifin palatsi': {
      aika: '1904',
      teksti: 'Tunnusmerkki on kellotorni. Ylimpänä on sipulin muotoinen '
        + 'kupoli, joka on päällystetty kullalla, ja sen laella ohut '
        + 'piikki. Kupolin alla on avoin lyhtykerros: kapeita '
        + 'kaari-ikkunoita ja niiden yläpuolella rivi sinisiä '
        + 'tähtimedaljonkeja. Sen alla on neliömäinen kellokerros, jossa '
        + 'vaaleaa kellotaulua kehystää leveä nauha turkoosinsinistä '
        + 'laattaa. Torni nousee muurin takaa, jonka harjalla ovat '
        + 'porrastetut sakarat. Nykyisen koneiston teki englantilainen '
        + 'Smith of Derby — sama vuonna 1856 perustettu paja, joka '
        + 'rakensi Lontoon Pyhän Paavalin katedraalin tornikellon 1893.'
        + '\n\n'
        + 'Vuonna 1904 päätettiin rakentaa palatsi aivan rantaan, ja '
        + 'siitä tuli myös nimi: sif tarkoittaa arabiaksi merenrantaa. '
        + 'Rakennusaineet olivat paikallisia — savea, kiveä, kalkkikiveä, '
        + 'puuta ja metallia. Sen jälkeen kerroksia on kertynyt lisää: '
        + 'ensimmäinen uudistus tehtiin 1917, suuret muutokset ja '
        + 'lisäsiivet 1961, ja vuoden 1962 lopulla koko kortteli sai '
        + 'nimen al-Diwan al-Amiri. Palatsi on suurmoskeijaa vastapäätä.'
        + '\n\n'
        + 'Pääportin yläpuolelle asetettiin 1918 laatta, jossa lukee '
        + 'arabiaksi: ”Jos se olisi pysynyt toisilla, se ei olisi tullut '
        + 'sinulle.” Sama lause on hakattu myös uuden aukion '
        + 'kiviporttiin, ja sen alle vuosiluku 1337 — hidžra-ajanlaskun '
        + 'vuosi, joka vastaa vuotta 1918. Vanhan portin teräväkaarisesta '
        + 'aukosta näkee pihan yli suoraan merelle.',
      kuvat: [
        {
          tiedosto: 'Seif tér, az emír palotája. Fortepan 30446.jpg',
          selite: 'Palatsin vanha pääportti vuonna 1973: teräväkaarinen aukko '
            + 'sakaramuurissa, sen yllä tummareunainen laatta '
            + 'arabiankielisine lauseineen ja kahden puolen vartija '
            + 'punaisessa takissa. Muurin takaa nousee kellotorni, ja '
            + 'kaaresta näkyy meri.',
          lahde: 'FOTO:FORTEPAN / Schiffer Pál, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Plaza Sief, ciudad de Kuwait, Kuwait, 2024-08-12, DD 45.jpg',
          selite: 'Sama lause kiveen hakattuna uuden aukion portissa, alla '
            + 'hidžra-vuosi 1337. Takana kohoaa kellotorni: turkoosi '
            + 'laattakehys kellotaulun ympärillä ja kullattu kupoli, alla '
            + 'vanhan muurin sakarat.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kuwaitin suurmoskeija': {
      teksti: 'Päärukoussali on neliö, jonka jokainen sivu on 72 metriä. '
        + 'Lattian peittää sininen matto, ja seiniä kiertävät massiiviset '
        + 'marmoripilarit; niiden väliin on veistetty kaariaiheita ja '
        + 'asetettu tummasta puusta tehtyjä ristikkosäleikköjä. Ovet ovat '
        + 'tiikkiä, ja seinustalla on rivi matalia puisia lukutelineitä. '
        + 'Päivänvalo tulee saliin 144 ikkunasta, jotka ovat korkealla '
        + 'seinien yläosassa; kattoon on lisäksi ripustettu suuria '
        + 'kristallikruunuja.'
        + '\n\n'
        + 'Katossa on yksi ainoa kupoli. Sen sisäpinta on '
        + 'ruskeanpunainen, ja keskellä on pyöreä medaljonki, jonka '
        + 'kahdessa kehässä kiertää kullattu kalligrafia. Kupolin juurta '
        + 'kiertää sinisten ikkunoiden rivi, ja sen alapuolella katto on '
        + 'kaiverrettua ja kullattua puuta.'
        + '\n\n'
        + 'Rakennus peittää 20 000 neliömetriä ja koko tontti 45 000. '
        + 'Salin lisäksi sisällä on 350 neliön kirjasto, jossa '
        + 'säilytetään islamilaisia hakuteoksia ja asiakirjoja. Ainoa '
        + 'minareetti seisoo luoteiskulmassa, kohoaa 74 metriin ja on '
        + 'tehty andalusialaisen esikuvan mukaan. Itäisen pihan alle on '
        + 'kaivettu viisikerroksinen pysäköintihalli 550 autolle. Hanke '
        + 'maksoi 13 miljoonaa Kuwaitin dinaaria, ja moskeija otettiin '
        + 'käyttöön id al-fitr -juhlana, hijri-vuoden 1407 shawwal-kuun '
        + 'ensimmäisenä päivänä.',
      kuvat: [
        {
          tiedosto: 'Kuwait City Grand Mosque Interior 12.jpg',
          selite: 'Rukoussalin seinustaa: marmoripilarien välissä '
            + 'kaariaiheita ja puisia ristikkosäleikköjä, alhaalla rivi '
            + 'puisia lukutelineitä, katossa kullattu kaiverrettu pinta '
            + 'ja lattialla sininen matto.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Kuwait City Grand Mosque Interior Dome 2.jpg',
          selite: 'Kupoli suoraan alhaalta kuvattuna: ruskeanpunainen '
            + 'sisäpinta, keskellä kalligrafiamedaljonki ja reunalla '
            + 'sinisten ikkunoiden kehä.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Mubarakiyan tori': {
      teksti: 'Souq Al-Mubarakiya on ollut samalla paikalla ainakin '
        + 'kaksisataa vuotta, ja se oli kaupungin kauppapaikka jo kauan '
        + 'ennen öljyä. Vuonna 1952 valtio hyväksyi ensimmäisen '
        + 'asemakaavansa, jonka laati brittiläinen toimisto Minoprio, '
        + 'Spenceley & Macfarlane. Kaava pyyhki vanhan kaupungin: '
        + 'savitiilitalot purettiin kortteli kerrallaan. Tori jäi: se oli '
        + 'purkutöiden aikaan yhä paikka, jossa kaupunki kävi kauppaa, '
        + 'eikä kauppa keskeytynyt.'
        + '\n\n'
        + 'Kujat on jaettu ammatin mukaan, ja risteyksessä kyltti '
        + 'luettelee suunnat. Kultakujalla kulta ja hopea ovat samoissa '
        + 'vitriineissä, kangaskujalla riippuvat perinnepuvut ja '
        + 'persialaiset silkkimatot, mausteiden kujalla säkkien vieressä '
        + 'myydään myskiä ja oudia. Vihanneksilla, lihalla ja kalalla on '
        + 'omat kujansa. Käytävän yllä on puukatos: järeät pylväät '
        + 'molemmin puolin, näkyvät kattotuolit ja loiva harjakatto, '
        + 'jonka alla kuja pysyy varjossa koko päivän. Al-Bahar-moskeijan '
        + 'viereisellä pihalla pöytien yllä kulkevista putkista '
        + 'suihkutetaan kesällä vesisumua.'
        + '\n\n'
        + 'Torilla on kaksi pientä museota, joihin on vapaa pääsy: šeikki '
        + 'Mubarakin kioski ja Kuwaitin ensimmäinen apteekki. '
        + 'Maaliskuussa 2022 tulipalo tuhosi osan torin kaupoista, ja '
        + 'vuonna 2024 allekirjoitettiin urakkasopimus palaneen osan '
        + 'rakentamisesta uudelleen: noin seitsemäntoista rakennusta, '
        + 'kustannusarvio kahdeksan miljoonaa Kuwaitin dinaaria.',
      kuvat: [
        {
          tiedosto: 'Kuwait City Souq al-Mubarakeya 1.jpg',
          selite: 'Torin katettu pääkuja: puupylväät molemmin puolin, '
            + 'kattotuolit näkyvissä ja käytävän yllä opastekyltti, joka '
            + 'luettelee kultatorin sekä vihannes-, liha- ja kalatorin '
            + 'suunnat.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Kuwait City Souq al-Mubarakeya 5.jpg',
          selite: 'Šeikki Mubarakin kioski torin pihalla: puinen yläkerta '
            + 'ikkunaluukkuineen, ulkoportaat ja seinässä laatta '
            + 'rakennuksen uudelleenavaamisesta.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sadu House': {
      aika: '1936',
      teksti: 'Sadu-talo seisoo Persianlahden rantakadun varrella '
        + 'kansallismuseon naapurissa. Paikalla ollut savitiilitalo '
        + 'tuhoutui vuoden 1936 tulvissa, ja samana vuonna varakkaan '
        + 'suvun päämies Youssef al-Marzouk rakennutti tilalle uuden: '
        + 'Kuwaitin ensimmäisen kivestä muuratun ja betonilla vahvistetun '
        + 'talon. Siinä on neljä avointa sisäpihaa, ikkunoissa '
        + 'rautaristikot ja ovissa Karachista tuotua puukoristelua. '
        + 'Vuonna 1938 uusi omistaja lisäsi kerroksen ja eurooppalaiset '
        + 'takat diwaniya-huoneisiin. Valtio osti talon 1970-luvulla, ja '
        + 'rakennus kunnostettiin 2006.'
        + '\n\n'
        + 'Kudonnaiset muuttivat taloon vuonna 1980. Vuoteen 1984 '
        + 'mennessä seuraan oli kirjattu 300 beduiinikutojaa, jotka '
        + 'tekivät noin seitsemänkymmentä esinettä viikossa; 1991 '
        + 'hankkeesta tuli osuuskunta, jonka omistavat kutojat itse. '
        + 'Talossa on nyt museo, työpaja ja myymälä. Kokoelmassa on myös '
        + 'kaupungin kudontaa: aavikolla kutoivat naiset, kaupungissa '
        + 'miehet, joiden työtä oli bisht eli olkaviitta.'
        + '\n\n'
        + 'Värit ovat musta, valkoinen, ruskea, beige ja punainen; langat '
        + 'värjättiin kasveilla, hennalla ja sahramilla. Aloittelija '
        + 'opettelee ensin reunakuviot: hubub eli siemenet, dealla eli '
        + 'kylkiluut, eein eli silmä, dhurs el khail eli hevosen hampaat '
        + 'ja uwairjan eli vastakkain osoittavien kolmioiden rivi. Vasta '
        + 'sitten hän saa kutoa keskiraidan, jonka nimi on shajarah, puu; '
        + 'sen hallitsevaa kutojaa kutsutaan nimellä thafrah, voittoisa.',
      kuvat: [
        {
          tiedosto: 'Kuwaiti embroidered rugs.png',
          selite: 'Seinälle ripustettu kudonnainen: leveät tummanruskeat ja '
            + 'kermanvalkoiset kentät, niiden välissä kapeat '
            + 'mustavalkoiset kuvioraidat ja poikittain ommellut '
            + 'punaoranssit kolmioraidat.',
          lahde: 'Di7ane, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'السدو 3.jpg',
          selite: 'Kapea kaistale museon seinällä: punaisia ja mustia '
            + 'kolmioruutuja, niiden välissä valkoinen keskiraita. '
            + 'Vieressä oleva kyltti ajoittaa työn noin vuoteen 1950 ja '
            + 'nimeää keskiraidan kuvioksi shajarah.',
          lahde: 'Di7ane, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Masqatin nähtävyysjutut (nippu 2, 12.8.2026). Nikosia on jaettu
   * kaupunki, mutta lehti ei käsittele jakoa: peli ei kerro
   * nykykonflikteista, joten kohteet kuvataan kulttuurikohteina
   * omalla historiallaan. CYP-maalehti kertoo saaren muinaisuudesta
   * ja kirkoista, joten kaupungin jutut pysyvät rakennuksissa.
   */
  masqat: {
    'Masqatin portti': {
      teksti: 'Vanhaa Maskatia kiertää muuri, jossa on pyöreitä torneja. Se '
        + 'rakennettiin vuonna 1625, portugalilaisten kaudella, ja se '
        + 'kulkee vain kaupungin länsi- ja eteläsivulla: idässä ja '
        + 'pohjoisessa raja syntyy itsestään merestä ja kalliosta. Muurin '
        + 'läpi vievä Al Saidiyan katu on yhä se reitti, jota myöten '
        + 'vanhaan kaupunkiin ajetaan.'
        + '\n\n'
        + 'Portin arki oli tarkkaan säädelty. Portit suljettiin kolme '
        + 'tuntia hämärän jälkeen, ja tapa jatkui 1900-luvun puoliväliin '
        + 'asti. Sen jälkeen kadulla liikkuvan oli kannettava mukanaan '
        + 'lyhtyä. Samaan järjestykseen kuului kaksi muuta kieltoa: '
        + 'pääkaduilla ei saanut polttaa, eikä musiikkia saanut soittaa '
        + 'julkisesti.'
        + '\n\n'
        + 'Muurin sisään avattiin tammikuussa 2001 Muscat Gate Museum. '
        + 'Näyttely kulkee Omanin historian läpi nuoremmasta kivikaudesta '
        + 'nykypäivään, ja omat osastonsa ovat saaneet kaupungin lähteet, '
        + 'vanhat kaivot, torit, talot, moskeijat ja satamat. Ulkoa '
        + 'rakennus on yhä portti: kaksi suippokaarta ajoradan yllä, '
        + 'niiden päällä rivi kapeita kaari-ikkunoita ja hammastettu '
        + 'harja, ja kummassakin päässä pyöreä torni.',
      kuvat: [
        {
          tiedosto: 'Muscat Gate Museum.jpg',
          selite: 'Maskatin portti tieltä nähtynä: kaksi suippokaarta vie '
            + 'ajoradan muurin läpi, yläkerroksessa on rivi kapeita '
            + 'kaari-ikkunoita ja kulmissa pyöreät tornit. Muurin sisällä '
            + 'toimii museo.',
          lahde: 'Tristan from Luxembourg, Luxembourg, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'The gate to Muscat (8727196402).jpg',
          selite: 'Sama portti kauempaa rannikkotieltä: hammastettu muuri '
            + 'jatkuu portilta oikealle kallioiselle kummulle, ja kaaren '
            + 'läpi näkyy vanhan kaupungin kattolinjaa.',
          lahde: 'Francisco Anzola, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Al-Miranin linnake': {
      aika: '1587',
      teksti: 'Linnake ei seiso kalliolla vaan jatkaa sitä: muurit on ladottu '
        + 'kiinni sataman länsipuolen jyrkänteeseen, ja pohjakaava on '
        + 'epäsäännöllinen, koska se noudattaa kallion muotoa. Tasot ovat '
        + 'eri korkeuksilla — pyöreitä torneja, ampuma-aukoin '
        + 'varustettuja muureja ja pihoja, joiden välillä kuljetaan '
        + 'jyrkkiä kapeita portaita.'
        + '\n\n'
        + 'Linnake oli paikalla jo ennen portugalilaisia, ja se oli '
        + 'Omanin ensimmäinen tykeillä aseistettu linnoitus. Kallio ei '
        + 'kuitenkaan suojannut ylhäältä. Vuonna 1552 osmanien laivasto — '
        + 'neljä galleonia, kaksikymmentäviisi kaleeria ja '
        + 'kahdeksansataaviisikymmentä miestä — valtasi kaupungin ja '
        + 'piiritti linnaketta kahdeksantoista päivää. Ratkaisun teki '
        + 'yksi ainoa tykki, joka hinattiin linnakkeen yläpuoliselle '
        + 'harjanteelle: linnake vallattiin ja sen varustukset purettiin. '
        + 'Portugalilaiset rakensivat sen uudelleen vuonna 1587.'
        + '\n\n'
        + 'Portugalin valta Maskatissa päättyi tähän linnakkeeseen. '
        + 'Imaami Sultan bin Saifin joukot ottivat kaupungin joulukuussa '
        + '1649, ja Miraniin linnoittautuneet antautuivat 23. tammikuuta '
        + '1650. Maskatissa kerrotaan lopusta yhä tarinaa, jonka mukaan '
        + 'linnakkeen varastoa hoitanut intialainen Narottam pilasi '
        + 'ruutivaraston sen jälkeen, kun portugalilainen kapteeni oli '
        + 'kosinut hänen tytärtään. Tarinaa ei ole voitu todentaa.',
      kuvat: [
        {
          tiedosto: 'Al Khor Mosque and Al Mirani Fort (47953967282).jpg',
          selite: 'Al-Miranin linnake vanhassa Maskatissa: muurit ja pyöreä '
            + 'torni nousevat suoraan paljaasta kalliosta, edessä Al '
            + 'Khorin moskeijan sinikupolinen minareetti.',
          lahde: 'Eduard Marmet, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Fuerte de Al Mirani, Mascate, Omán, 2024-08-14, DD 43.jpg',
          selite: 'Linnakkeen sisällä kaksi pyöreää tornia seisoo eri '
            + 'korkeuksilla, ja pihalta nousee jyrkkä kapea porras muurin '
            + 'harjalle. Vasemmalla siintää meri, oikealla vuoret.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Al-Jalalin linnake': {
      aika: '1983',
      teksti: 'Kummun laella seisoo kaksi tornia eri korkeudella, toinen '
        + 'pyöreä ja toinen neliömäinen. Niiden välissä on muuri, johon '
        + 'on puhkaistu kahteen riviin kaariaukkoja tykeille. '
        + 'Merenpuoleiselle täyttömaalle on sittemmin tehty '
        + 'helikopterikenttä ja rinteeseen köysirata. Sisällä osastojen '
        + 'välissä on raskaita ovia, joista törröttää rautapiikkejä.'
        + '\n\n'
        + 'Suurimman osan 1900-lukua linnake toimi Omanin päävankilana, '
        + 'jossa oli kerrallaan noin kaksisataa vankia. Vuonna 1963 '
        + 'neljäkymmentäneljä vankia pakeni tarkkaan suunnitellussa '
        + 'joukkokarkauksessa, mutta useimmat saatiin kiinni pian: he '
        + 'olivat liian heikkokuntoisia päästäkseen kauas. Vankila '
        + 'suljettiin 1970-luvulla.'
        + '\n\n'
        + 'Linnake kunnostettiin vuonna 1983 ja siitä tehtiin Omanin '
        + 'kulttuurihistorian kokoelma. Portugalin ajalta on jäljellä '
        + 'muutama kiveen hakattu kirjoitus. Tykkiaukoilla seisoo tykkejä '
        + 'ammuksineen ja sytytysvälineineen, ja esillä on vanhoja '
        + 'musketteja ja karttoja; yksi taulu esittää Maskatin lahden '
        + 'tuulet ja virtaukset. Neliötornissa ovat mattoja, keramiikkaa, '
        + 'koruja, aseita ja suitsukeastioita, ja yhden huoneen katto on '
        + 'ladottu palmunrungoista. Yleisölle kokoelmaa ei ole avattu: '
        + 'sisään pääsevät vain valtiovieraat.',
      kuvat: [
        {
          tiedosto: 'Al Jalali Fort (47953954322).jpg',
          selite: 'Linnake kalliokummulla: vasemmalla matalampi pyöreä torni, '
            + 'oikealla korkeampi neliötorni, välissä kaariaukoin '
            + 'puhkaistu muuri. Oikealla erottuu kalliota ylös '
            + 'kiemurteleva kiviportaikko.',
          lahde: 'Eduard Marmet, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Fuerte de Al Jalali, Mascate, Omán, 2024-08-14, DD 37.jpg',
          selite: 'Muuri läheltä iltavalossa: kaariaukot kahdessa rivissä, '
            + 'tornit eri korkeudella ja oikealla rinteessä alempana '
            + 'porrastettu bastioni.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Al Alamin palatsi': {
      aika: '1972',
      teksti: 'Julkisivun tunnistaa pylväistä. Ne ovat alhaalta kapeita ja '
        + 'levenevät ylöspäin sienimäisiksi kannattimiksi, jotka kantavat '
        + 'litteän kattolaatan. Laatta työntyy joka sivulla pitkälle ulos '
        + 'seinälinjasta, joten pylväsrivi jää varjoon. Osa pylväistä on '
        + 'kullanvärisiä, osa sinisen mosaiikin peitossa, ja niiden '
        + 'väliin jää korkeita kaari-ikkunoita. Katon yli nousee '
        + 'lipputanko — nimi Qasr al-Alam tarkoittaa lipun palatsia.'
        + '\n\n'
        + 'Talossa ei asuta. Se on sulttaanin seremoniallinen palatsi: '
        + 'siellä otetaan vastaan valtiovieraita ja valtionpäämiehiä, ja '
        + 'asunnot ovat muualla. Nykyisen rakennuksen teetti sulttaani '
        + 'Qaboos bin Said, ja sen suunnitteli ja rakensi mumbailainen '
        + 'Shapoorji Pallonji. Talo valmistui vuonna 1972.'
        + '\n\n'
        + 'Palatsi seisoo 250 metriä pitkän, pylväskäytävien reunustaman '
        + 'aukion pohjoispäässä, vastapäätä Omanin kansallismuseota. '
        + 'Aukio on suljettu, mutta portille saa tulla kuvaamaan, ja '
        + 'julkisivun näkee myös satamasta veneestä. Edeltäjä Bait '
        + 'al-Alam rakennettiin 1800-luvun alussa sulttaani Said bin '
        + 'Sultanin aikana vanhan merimuurin perustuksille kahden '
        + 'linnakkeen väliin. Heimokapinalliset vaurioittivat sitä vuonna '
        + '1895, eikä sulttaani Faisal bin Turkilla ollut varaa '
        + 'korjauttaa sitä, ja Said bin Taimur, joka vietti aikansa '
        + 'Salalassa, piti taloa lukossa. Se purettiin 1971 uuden tieltä.',
      kuvat: [
        {
          tiedosto: 'Palacio de Al Alam, Mascate, Omán, 2024-08-14, DD 33.jpg',
          selite: 'Al Alamin palatsin julkisivu portin takaa: pylväät '
            + 'levenevät ylöspäin sienimäisiksi kannattimiksi, jotka '
            + 'kantavat pitkälle ulos työntyvää litteää kattolaattaa. '
            + 'Keskiosa on kullanvärinen, reunapylväät sinisen mosaiikin '
            + 'peitossa.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Palacio de Al Alam, Mascate, Omán, 2024-08-14, DD 36.jpg',
          selite: 'Sama julkisivu vinosti iltavalossa. Pylväiden turkoosi '
            + 'laattapinta ja kattolaatan hammastettu reunalista '
            + 'erottuvat, ja taustalla näkyvät aukiota reunustavat '
            + 'matalat vaaleat hallintorakennukset.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Bait Al Zubair': {
      teksti: 'Museo on Al Saidiyan kadun varrella vanhassa Maskatissa. Al '
        + 'Zubairin perhe rakennutti talon asuinkodikseen, ja siitä '
        + 'tehtiin yksityinen museo. Esineet ovat pääosin suvun omasta '
        + 'kokoelmasta: khanjar-tikareita, naisten hopeakoruja, pukuja, '
        + 'aseita ja kotitaloustavaraa. Pihalla on pienoismalli '
        + 'omanilaisesta kylämaisemasta linnakkeineen ja vesiuomineen.'
        + '\n\n'
        + 'Khanjarissa on kolme osaa: kahva, lyhyt kaareva terä ja tuppi, '
        + 'joka taittuu jyrkästi J-kirjaimen muotoon. Hienoimpien '
        + 'tikareiden tuppi on kultaa tai hopeaa, paikallisten seppien '
        + 'töissä messinkiä tai kuparia. Kahva tehtiin ennen sarvesta tai '
        + 'norsunluusta, mutta kansainvälisen kaupan kiellon jälkeen '
        + 'aineena on puu, kamelinluu tai muovi; kahvan pää on litteä, '
        + 'hallitsijasuvun tikarissa ristin muotoinen. Jokainen tikari '
        + 'tehdään tilaajan omien toiveiden mukaan, ja työhön menee '
        + 'kolmesta viikosta useaan kuukauteen.'
        + '\n\n'
        + 'Tikari työnnetään kudotun vyön alle keskelle vartalon '
        + 'etupuolta. Ennen se kuului arkiasuun, nykyään se otetaan esiin '
        + 'häihin, paraateihin ja virallisiin tilaisuuksiin; poika saa '
        + 'oman tikarinsa usein murrosiässä ja sulhanen häälahjaksi. '
        + 'Tupesta vetäminen ilman syytä on tapojen vastaista. Sama '
        + 'tikari tupessaan kahden ristikkäisen miekan päällä on Omanin '
        + 'vaakuna: se on ollut lipun ylänurkassa vuodesta 1970 ja näkyy '
        + 'myös yhden rialin setelissä.',
      kuvat: [
        {
          tiedosto: 'Muscat, Bait Al Zubair, ingresso.jpg',
          selite: 'Museon sisäänkäynti vanhassa Maskatissa: valkoinen portti, '
            + 'jonka päädyssä lukee Bait Al Zubair, ja avoimet '
            + 'takorautaiset koristeportit pihalle.',
          lahde: 'Francesco Bini, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Al Khanjar, Bait al Zubair Museum, Oman 1.jpg',
          selite: 'Khanjar museon vitriinissä. Hopeatuppi taittuu jyrkäksi '
            + 'koukuksi, kahvan pää on litteä, ja tikari roikkuu '
            + 'hopearenkailla kudotusta vyöstä.',
          lahde: 'Reda Kerbush, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Bait al Zubair Museum-02.jpg',
          selite: 'Museon pihan pienoismalli: savenvärisiä vuoria, muureja, '
            + 'vartiotorneja ja vesiuoma, jonka varrella on pieniä '
            + 'veneitä ja ihmishahmoja.',
          lahde: 'Muck, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Motishwar Mandir': {
      teksti: 'Motishwar Mandir seisoo vanhassa Maskatissa Al Alamin palatsin '
        + 'naapurissa, paljaan kalliorinteen juurella. Se ei ole yksi '
        + 'rakennus vaan kolmen pyhäkön piha: Shri Adi Motishwar Mahadev, '
        + 'Shri Motishwar Mahadev ja Hanumanille omistettu temppeli. '
        + 'Päärakennus on matala ja vaaleaa kiveä, oviaukot on muotoiltu '
        + 'simpukkakaariksi, ja katolla kohoaa pystyuriin jaettu kupoli '
        + 'kullattuine huippuineen. Pihan kaivossa on vettä ympäri '
        + 'vuoden, vaikka ympärillä on aavikkoa. Temppeli on '
        + 'päivittäisessä käytössä: papit toimittavat aamu- ja '
        + 'iltarituaalit, ja piha täyttyy juhlapäivinä.'
        + '\n\n'
        + 'Rakentajiksi mainitaan Thattan bhatia-kauppiaat. Bhatiat ovat '
        + 'kauppiasyhteisö Sindhin, Kutchin ja Gujaratin suunnalta, ja '
        + 'heitä asettui Maskatiin jo vuonna 1507. Tanskalainen matkaaja '
        + 'Carsten Niebuhr laski Maskatista vuonna 1765 noin 1 200 '
        + 'intialaista ja kirjasi, että nämä saivat elää omien lakiensa '
        + 'mukaan, tuoda vaimonsa kaupunkiin ja polttaa vainajansa. Oman '
        + 'on Lähi-idän ainoa maa, jossa on paikallissyntyinen '
        + 'hinduväestö.'
        + '\n\n'
        + 'Rakennusvuodesta lähteet ovat eri mieltä. Wikipedian teksti '
        + 'sanoo 1909, sen tietolaatikko antaa haarukan 1892–1909, ja kun '
        + 'Intian pääministeri kävi temppelissä 12. helmikuuta 2018, '
        + 'lehdet kutsuivat sitä 125-vuotiaaksi — se veisi vuoteen 1893. '
        + 'Hajonta on siis lähes sata vuotta, eikä millekään luvulle ole '
        + 'esitetty asiakirjaa. Maha Shivaratrin aikaan pihalla käy yli '
        + '20 000 ihmistä.',
      kuvat: [
        {
          tiedosto: 'Muscat-shiva temple.jpg',
          selite: 'Motishwar Mandirin päärakennus vaaleasta kivestä: '
            + 'pystyuriin jaettu kupoli kullattuine huippuineen, '
            + 'simpukkakaarilla kehystetyt puuovet ja laatoitettu piha, '
            + 'jolle on levitetty punainen matto. Pihan yllä liehuu '
            + 'punainen viiri.',
          lahde: 'కాసుబాబు, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Bagdadin nähtävyysjutut (nippu 2, 12.8.2026). Nikosia on jaettu
   * kaupunki, mutta lehti ei käsittele jakoa: peli ei kerro
   * nykykonflikteista, joten kohteet kuvataan kulttuurikohteina
   * omalla historiallaan. CYP-maalehti kertoo saaren muinaisuudesta
   * ja kirkoista, joten kaupungin jutut pysyvät rakennuksissa.
   */
  bagdad: {
    'Mutanabbin katu': {
      teksti: 'Katu on kapea ja autoton, alle kilometrin mittainen. Toisessa '
        + 'päässä on kaariportti runoilijan säkeineen, toisessa Tigrisin '
        + 'rannalla pronssipatsas, jonka Mohammed Ghani Hikmat veisti '
        + 'vuonna 1977. Väliin mahtuu kirjakauppoja, kustantamoja ja '
        + 'kirjapainoja, ja kauppojen edessä kirjat ladotaan riveihin '
        + 'suoraan katukiveykseen. Julkisivut ovat tiiltä ja parvekkeiden '
        + 'kaiteet takorautaa. Väkeä liikkuu aamuvarhaisesta iltamyöhään: '
        + 'runoilijoita, kirjoittajia, taiteilijoita ja opiskelijoita.'
        + '\n\n'
        + 'Nimi tulee runoilija Abu at-Tayyib al-Mutanabbista (n. '
        + '915–965), joka aloitti kirjoittamisen yhdeksänvuotiaana ja '
        + 'sepitti Aleppon hallitsijalle 300 lehteä runoutta. Hänen '
        + 'säkeitään siteerataan arabimaailmassa yhä sananlaskuina. '
        + 'Kirjakauppa on paikalla vanhaa perua: tässä oli abbasidien '
        + 'aikaan Bagdadin ensimmäinen kirjakauppiaiden tori. Nykyinen '
        + 'katu vihittiin vuonna 1932, ja vihkijänä oli kuningas Faisal '
        + 'I. Täältä on lähtöisin sanonta, jonka mukaan Kairo kirjoittaa, '
        + 'Beirut kustantaa ja Bagdad lukee.'
        + '\n\n'
        + 'Kadun varrella on Shabandarin kahvila vuodelta 1917, Bagdadin '
        + 'vanhimpia yhä toimivia. Seinät on peitetty vanhoilla '
        + 'valokuvilla irakilaisesta yhteiskunnasta. Kadun päästä jatkuu '
        + 'Souk al-Sarai, enintään 300 metrin kuja, jossa myytiin ennen '
        + 'nahkaa ja nykyään vihkoja, paperia ja koulukirjoja.',
      kuvat: [
        {
          tiedosto: 'شارع المتنبي صباحا.jpg',
          selite: 'Mutanabbin katu ylhäältä aamupäivällä: kirjat on levitetty '
            + 'riveihin katukiveykselle puisten myyntipöytien eteen, '
            + 'oikealla nousee keltatiilinen kaariholvirivistö '
            + 'valurautapylväineen ja vasemmalla on Shabandarin kahvilan '
            + 'puuparvekkeinen kulmatalo.',
          lahde: 'Mondalawy, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'مقهى الشابندر ببغداد.jpg',
          selite: 'Shabandarin kahvilan kulmatalo kadulta nähtynä: kaarevan '
            + 'oven yllä vihreä arabiankielinen kyltti, yläkerrassa '
            + 'kiertää puinen parvekekaide, ja jalkakäytävällä on rivi '
            + 'mustia valurautaruukkuja. Ovensuussa istuu miehiä pöydän '
            + 'ääressä, vieressä videokamera kolmijalalla ja oikealla '
            + 'hedelmäkärry.',
          lahde: 'Mondalawy, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Qushlan kellotorni': {
      aika: '1871',
      teksti: 'Kasarmipiha on nykyään julkinen puisto. Nurmen halki kulkee '
        + 'hiekkakäytäviä, niiden yllä puisia pergoloita, ja lehtimajat '
        + 'ovat istumista varten. Bagdadilaiset tulevat aukiolle '
        + 'viettämään aikaa: majoissa luetaan runoja ääneen, ja alueella '
        + 'pidetään näyttelyitä ja muita kulttuuritilaisuuksia. Sisään '
        + 'tullaan Mutanabbin kadun päästä, kirjakauppojen kadulta, ja '
        + 'aukion takaa avautuu Tigris.'
        + '\n\n'
        + 'Aukio oli aiemmin kasarmialue. Ottomaanien kuvernööri Mehmed '
        + 'Namık Pasha aloitti rakentamisen vuonna 1861 Rusafan puolelle: '
        + 'paikalle tulivat maakunnan virastot ja kasarmit, joissa asui '
        + 'tuhansia sotilaita. Kellotorni siirtyi Taqi al-Din Pashan '
        + 'vastuulle ja valmistui Midhat Pashan kaudella vuonna 1871. Se '
        + 'herätti miehistön aamulla ja ilmoitti harjoitusten ajat, ja se '
        + 'pantiin tarkoituksella aivan joen viereen, jotta kellon ääni '
        + 'kantaisi koko Bagdadiin.'
        + '\n\n'
        + 'Torni on kolmekymmentä metriä korkea, perustan sivu on neljä '
        + 'metriä, ja ylöspäin torni kapenee. Huipulle nousee 73 '
        + 'porrasta, ja joka sivulla on ikkunoita ilmanvaihtoa varten. '
        + 'Kellohuone on 23 metrin korkeudessa, ja sen koneisto pyörittää '
        + 'neljää taulua; se vedetään käsin kolmen päivän välein. Itse '
        + 'kello on lahja: kun kuningas Faisal I vieraili Britanniassa '
        + 'kesällä 1927, Yrjö V antoi hänelle brittiläisen yhtiön tekemän '
        + 'kellon. Kahdessa taulussa numerot ovat arabialaisia, kahdessa '
        + 'roomalaisia, ja sama kello käy tornissa yhä.',
      kuvat: [
        {
          tiedosto: 'ساعة القشلة في بغداد (4).jpg',
          selite: 'Kellotorni nousee aukion nurmelta, huipulla tuuliviiri. '
            + 'Vasemmalla vihreäkattoisessa puisessa lehtimajassa istuu '
            + 'väkeä, tornin juurella seisoo ihmisryhmiä, ja oikealla '
            + 'kulkee köysiaidoin rajattuja käytäviä pergoloiden alla.',
          lahde: 'Taisir Mahdi, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Qushla2.jpg',
          selite: 'Aukio ylhäältä: pergoloiden kattama käytävä johtaa '
            + 'tornille, ja nurmella ja hiekkapoluilla liikkuu satoja '
            + 'ihmisiä oliivipuiden ja palmujen välissä. Takana virtaa '
            + 'Tigris ja vastarannalla näkyy kaupungin taloja.',
          lahde: 'mohammed aladdin, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Abbasidipalatsi': {
      teksti: 'Tigrisin itärannalla al-Rusafassa seisoo tiilirakennus, joka '
        + 'ajoitetaan 1100-luvun lopulle tai 1200-luvun alkuun. Sen '
        + 'käyttötarkoituksesta ei ole yksimielisyyttä. Osa tutkijoista, '
        + 'muun muassa irakilaiset Mustafa Jawad ja Yaqub Sarkis, pitää '
        + 'sitä kalifi al-Nasirin palatsina: andalusialainen matkaaja Ibn '
        + 'Jubayr kertoi nähneensä al-Nasirin nousevan veneestä '
        + 'palatsiinsa Tigrisin itärannan yläpäässä, ja vanhan '
        + 'kaupunginmuurin perustukset ovat yhä rakennuksen seinässä. '
        + 'Toiset lukevat sen madrasaksi, Sharabiyya-kouluksi, koska '
        + 'molemmissa kerroksissa on sivuhuoneita, jotka riittäisivät '
        + 'luokiksi. Kaiverrettua todistetta palatsista ei ole löytynyt, '
        + 'eivätkä aikalaislähteet mainitse koulua.'
        + '\n\n'
        + 'Pohjakaava on suorakaide. Keskellä on piha ja sen keskellä '
        + 'suuri suihkulähde, ja pihaa kiertää kaksi kerrosta '
        + 'kaarikäytäviä, jotka avautuvat pihalle suippokaarina. Käytävät '
        + 'ovat yli 26 metriä pitkiä ja yli yhdeksän metriä korkeita. '
        + 'Pohjakerroksessa on 18 huonetta ja toisessa 22. Itäsivua '
        + 'hallitsee iwan, päädystään avoin holvihuone, joka on kaksi '
        + 'kertaa muita suurempi.'
        + '\n\n'
        + 'Tiili poltettiin kahdella lämmöllä: seinien ja holvien '
        + 'kantavat tiilet kovassa kuumuudessa kestäviksi, koristetiilet '
        + 'matalammassa niin että niitä pystyi veistämään. Itäkäytävän '
        + 'holvi on sarja toisiinsa lomittuvia muqarnas-kennoja, ja kukin '
        + 'niistä päättyy kahdeksansakaraiseen tähteen. Kaivaukset ja '
        + 'kunnostus tehtiin 1933-1971.',
      kuvat: [
        {
          tiedosto: 'القصر العباسي قلب الحكم والفخامة في العصر الإسلامي.jpg',
          selite: 'Sisäpiha ja sen keskellä matalalla jalustalla lepäävä '
            + 'kivinen allas, jonka ympärille on vedetty köysiaita. Pihaa '
            + 'kiertää kaksi kerrosta suippokaarikäytäviä, alakerran '
            + 'syvennysten holveissa on muqarnas-kennostoa, ja takaseinän '
            + 'keskellä avautuu muita suurempi iwan. Oikealla '
            + 'vierailijoita, joista kaksi valmistujaisviitoissa.',
          lahde: 'Montzr 1, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'القصر العباسي رمز السلطة والفن في بغداد التاريخية.jpg',
          selite: 'Kaarikäytävän holvi alhaalta kuvattuna: muqarnas-kennot '
            + 'lomittuvat toisiinsa ja laskeutuvat portaittain, kunkin '
            + 'pohjaan on veistetty kasvikuvio tai kirjoituskoriste, ja '
            + 'keskellä erottuu kahdeksansakarainen tähti. Alempana '
            + 'kulkee rivi suippokaaria ja paljasta tiilimuuria, oikeassa '
            + 'yläkulmassa näkyy taivas.',
          lahde: 'Montzr 1, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Khan Mirjan': {
      aika: '1358',
      teksti: 'Khan Mirjan on majatalo kauppiaille. Bagdadin '
        + 'jalayiridikuvernööri Amin al-Din Mirjan rakennutti sen vuosina '
        + '1356-1358, ja samalta rakennuttajalta on kadun toisella '
        + 'puolella Mirjanin moskeija. Kerroksia on kaksi ja huoneita 45: '
        + 'alakerrassa 22, yläkerrassa 23. Työnjako kulki pystysuunnassa. '
        + 'Alakerta oli tavaraa ja karavaanin eläimiä varten, yläkerta '
        + 'kauppiaita — matkustaja nukkui saman katon alla kuormansa '
        + 'kanssa.'
        + '\n\n'
        + 'Keskellä on pitkä sali, ja se on khanien joukossa poikkeus: '
        + 'pohjakaavaan ei kuulunut avointa keskuspihaa lainkaan. Salin '
        + 'yli kaartuu rivi suuria teräväkärkisiä kaaria, jotka on '
        + 'muurattu poltetusta tiilestä ja joiden reunaa kiertää '
        + 'porrastettu hammaslista. Katon huippu on kolmentoista metrin '
        + 'korkeudella. Valo tulee sisään päätyseinän kapeista '
        + 'suippoikkunoista ja muurin lävistetyistä ikkunoista. Ulkopinta '
        + 'on koristeltu kalligrafialla, ja kirjoituspaneelien tekijäksi '
        + 'mainitaan tabrizilainen Ahmad Shah, jota kutsuttiin '
        + 'kultakynäksi.'
        + '\n\n'
        + 'Rakennus oli pitkään rapistuneena, ja salissa seisoi Tigriksen '
        + 'tulvavettä vyötärön korkeudella. Vuonna 1937 tiloihin avattiin '
        + 'arabialaisten muinaisesineiden museo, ja 1980-luvun '
        + 'puoliväliin mennessä rakennus oli kunnostettu ja otettu '
        + 'ravintolakäyttöön. Se on yhä yksi Irakin vanhimmista '
        + 'säilyneistä khaneista.',
      kuvat: [
        {
          tiedosto: 'خان مرجان.jpg',
          selite: 'Khan Mirjanin katettu keskussali. Rivi teräväkärkisiä '
            + 'tiilikaaria jaksottaa katon, alaseinässä on kapeita '
            + 'suippokaarisia oviaukkoja ja ylhäällä kiertää parveke '
            + 'tummine puukaiteineen; päätyseinässä on kolme kapeaa '
            + 'ikkunaa. Sali on tyhjä, vasemmalla seisoo tumma puuseinäke '
            + 'lasimaalauksineen sekä pöytä ja tuoli.',
          lahde: 'Zaid isam, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'بوابة خان مرجان.jpg',
          selite: 'Khanin pääportaali kadulta: suippokaari, kaiverrettua '
            + 'tiilikoristetta, arabiankielinen kirjoituspaneeli, '
            + 'ristikkoikkuna ja kaksiosainen puuovi. Oikeassa '
            + 'alakulmassa näkyy valkoinen muovipöytä, vesipullo ja '
            + 'pahvilaatikko.',
          lahde: 'Zaid isam, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Mustansiriya-koulu': {
      aika: '1235',
      teksti: 'Porttihallissa seisoi vuonna 1235 valmistunut vesikello, jonka '
        + 'teki Ali ibn Thalab damaskolaisten kellojen malliin. Seinään '
        + 'oli kuvattu taivas ja siihen kaksi kultaista haukkaa, '
        + 'kummallakin oma kulhonsa. Tunnin täyttyessä haukan nokka '
        + 'aukeni ja pudotti pronssipallon kulhoon, ja yksi kaarten '
        + 'ovista vaihtui kultaisesta hopeiseksi. Kullatut planeetat '
        + 'kulkivat taivaankuvassa auringon mukana ja hehkuivat yöllä '
        + 'takaapäin valaistuina. Rukoushetket luettiin seinältä.'
        + '\n\n'
        + 'Samojen muurien sisällä oli hammam, sairaala, apteekki ja '
        + 'keittiö. Lääketieteen koulua johti vanhempi lääkäri, jolla oli '
        + 'oltava kymmenen oppilasta, ja sairaala oli saman katon alla. '
        + 'Talossa asui myös kolmekymmentä orpoa, jotka saivat saman '
        + 'palkkion ja ruoan kuin muut opiskelijat. Seinät ovat '
        + 'veistettyä tiiltä: pääoven kaarten ympärillä kiertää tähti- ja '
        + 'monikulmiokuvioita ja piirtokirjoitus rakennuttajasta, '
        + 'lounaisovessa myöhempi piirtokirjoitus ottomaanisulttaani '
        + 'Abdulazizista.'
        + '\n\n'
        + 'Vuoden 1258 piirityksen vaurioittamat osat korjattiin '
        + 'myöhemmin. Vesikellon kuvannut Ibn al-Fuwati palasi kaupunkiin '
        + 'ja nimitettiin koulun johtajaksi 1281. Timurin kaudella opetus '
        + 'keskeytyi, kirjastosta katosi tuhansia kirjoja ja '
        + 'rakennusmestareita vietiin Samarkandiin. Koulu yritettiin '
        + 'avata uudelleen 1589, mutta ovet suljettiin 1638. 1700-luvulla '
        + 'talo toimi kauppiaiden majatalona nimellä Khan al-Muwasilah. '
        + 'Irakin valtio kunnosti sen 1960.',
      kuvat: [
        {
          tiedosto: 'Al-Mustansriah School - SW Door.jpg',
          selite: 'Koulun lounaissivu: kolme suippokaarista aukkoa, ja niiden '
            + 'ympärillä seinä on ladottu tiilestä tähti- ja '
            + 'monikulmiokuvioiksi. Etualalla kasvaa korkeaa heinää, '
            + 'taustalla on pilvetön taivas.',
          lahde: 'Samir Al-Ibrahem, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Old rusafa (1).jpg',
          selite: 'Pääoven suippokaari alhaalta kuvattuna: kaaren sisään on '
            + 'veistetty rivi toisensa jälkeen vaakasuoria '
            + 'kirjoitusnauhoja, alimpana tähtikuvioinen kenttä, ja '
            + 'pieliä kiertää kapea koristenauha. Ylhäällä seinän editse '
            + 'kulkee sähköjohto.',
          lahde: 'ZaidAiraq, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Bagdadin museo': {
      aika: '1970',
      teksti: 'Kahvilan kohtauksessa miehet istuvat matalilla penkeillä '
        + 'keffiyeh päässä, ja keltatiilisellä seinällä riippuu '
        + 'kehystettyjä valokuvia. Toisessa kohtauksessa puuseppä työstää '
        + 'lautaa penkkinsä ääressä, työkalut hyllyillä ympärillään. '
        + 'Hahmot ovat täysikokoisia, ja niitä on 385 kappaletta 77 '
        + 'kohtauksessa. Kohtauksiin kuuluu hahmojen lisäksi ajan '
        + 'esineistöä: työkaluja, astioita ja huonekaluja.'
        + '\n\n'
        + 'Aiheina ovat käsityöammatit, kaupankäynti, kotien tavat ja '
        + 'kadunvarren elämä. Osa kohtauksista kertoo tarinan. Yhdessä '
        + 'äiti nimeltä Umm Ibrahim moittii poikaansa siitä, että tämä '
        + 'unohti äitinsä heti häiden jälkeen. Toinen esittää zaffan eli '
        + 'hääkulkueen, jossa naisseurue saattaa morsianta taputuksin, '
        + 'soitoin ja tanssein. Muualla soittaa irakilaista '
        + 'maqam-musiikkia esittävä yhtye ja istutaan iltapäivän teellä.'
        + '\n\n'
        + 'Museo perustettiin vuonna 1970. Se sijaitsee Tigrisin lähellä '
        + 'Rusafan puolella kaupunkia, ja rakennus on vuodelta 1869. '
        + 'Kokoelma rajaa tarkoituksella yhden ajanjakson: sen, miten '
        + 'bagdadilaiset perheet elivät, mitä työkaluja ja talousesineitä '
        + 'niillä oli ja miten juhlat vietettiin.',
      kuvat: [
        {
          tiedosto: 'مدخل المتحف البغدادي.jpg',
          selite: 'Museon julkisivu kadulta ylöspäin kuvattuna: vasemmalla '
            + 'ulkoneva puinen shanashil-parveke pylväineen ja '
            + 'ruutuikkunoineen, sen alla rautakoristeinen kaide ja '
            + 'seinälyhtyjä. Oikealla on kaiverrettu suippokaariovi ja '
            + 'sen yllä arabiankielinen kivilaatta; taustalla kohoaa '
            + 'naapuritalon paljas betoniseinä.',
          lahde: 'Ayat Jaryan, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Photos from the Al Baghdadi Museum- Baghdadi cafe.jpg',
          selite: 'Kahvilan kohtaus: toistakymmentä täysikokoista hahmoa '
            + 'istuu penkeillä ja tuoleilla valkoisen puukaiteen takana, '
            + 'päässä ruudullisia huiveja ja valkoisia kalotteja. '
            + 'Keltatiilisellä seinällä on kehystettyjä valokuvia ja '
            + 'pieniä hyllyjä, perällä tarjoilutiski kannuineen.',
          lahde: 'Mustafa alsalhi, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * İzmirin nähtävyysjutut (nippu 2, 12.8.2026). Nikosia on jaettu
   * kaupunki, mutta lehti ei käsittele jakoa: peli ei kerro
   * nykykonflikteista, joten kohteet kuvataan kulttuurikohteina
   * omalla historiallaan. CYP-maalehti kertoo saaren muinaisuudesta
   * ja kirkoista, joten kaupungin jutut pysyvät rakennuksissa.
   */
  izmir: {
    'İzmirin kellotorni': {
      aika: '1901',
      teksti: 'Torni on 25 metriä korkea ja seisoo 81 neliömetrin alalla. '
        + 'Pohjakaava on kahdeksankulmainen ja kerroksia on neljä. Runko '
        + 'on rautaa ja lyijyä, pinta marmoria ja kiveä. Jalustan '
        + 'ympärille on ladottu kehäksi neljä şadırvania eli '
        + 'suihkulähdettä. Kellotauluja on niin ikään neljä, '
        + 'halkaisijaltaan 75 senttiä, ja neljännessä kerroksessa riippuu '
        + 'soittokello, jota kannattaa kaksitoista pylvästä.'
        + '\n\n'
        + 'Aydınin vilajetin kuvernööri Kâmil Pasha kutsui İzmirin '
        + 'vaikutusvaltaiset koolle 1. elokuuta 1900. Kokouksessa '
        + 'päätettiin kellotornista, joka pystytettäisiin sulttaani '
        + 'Abdülhamid II:n valtaistuimelle nousun 25-vuotispäivän '
        + 'kunniaksi. Peruskivi laskettiin 1. syyskuuta 1900, torni '
        + 'valmistui elokuussa 1901 ja vihittiin käyttöön juuri '
        + 'vuosipäivänä 1. syyskuuta 1901. Ensimmäinen nimi oli '
        + 'Hamidiye-torni.'
        + '\n\n'
        + 'Suunnittelija oli ranskalainen Raymond Charles Péré '
        + '(1854–1929), joka oli tullut kaupunkiin ranskan opettajaksi '
        + 'vuonna 1880, nai paikallisen levantinolaissuvun tyttären ja '
        + 'jäi loppuiäkseen. Hänen töitään on myös Karşıyakan Pyhän '
        + 'Helenan kirkko vuodelta 1904. Tornin koristeaiheet ovat '
        + 'pohjoisafrikkalaisvaikutteisia. Neljälle sivulle oli hakattu '
        + 'sulttaanin tugra ja osmanien vaakuna; tasavallan julistuksen '
        + 'jälkeen ne poistettiin ja tilalle veistettiin tähti ja '
        + 'puolikuu. Torni on kaupungin vaakunassa, ja se oli 500 liiran '
        + 'setelin kääntöpuolella vuosina 1983–1989.',
      kuvat: [
        {
          tiedosto: 'İzmir Clock Tower, 2026.jpg',
          selite: 'Kellotorni keskellä Konakin aukiota: kahdeksankulmainen '
            + 'kaarigalleria jalustana, sen päältä nousee kapeneva torni, '
            + 'kellotaulu ja ylimpänä avoin pylväikkökamari. Vasemmalla '
            + 'Yalı-moskeijan kupoli ja minareetti, oikealla '
            + 'kuvernöörinkonak keltaisine julkisivuineen ja Turkin lippu '
            + 'salossa. Aukiolla kävelee ihmisiä, jalkakäytävällä on '
            + 'opastetaulu ja kiveyksellä satoja kyyhkyjä.',
          lahde: 'Koray, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Izmir Clock tower 5864.jpg',
          selite: 'Jalusta lähempää: hevosenkenkäkaaret lepäävät parittaisten '
            + 'hoikkien pylväiden päällä, ja kaarien alla on kaksi '
            + 'neljästä marmorisuihkulähteestä maljoineen ja altaineen. '
            + 'Keskellä on rautaristikolla suljettu ovi, jonka molemmin '
            + 'puolin on ympyrämedaljonki tähtineen ja puolikuineen. '
            + 'Kaarien läpi näkyy aukion kävelijöitä ja taustalla '
            + 'moskeijan turkoosi laattapinta.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kemeraltin basaari': {
      teksti: 'Kemeraltın pääkuja ei kulje suoraan. Anafartalar caddesi '
        + 'kaartuu leveänä puolikuuna, ja kaari on vanhan rantaviivan '
        + 'muoto: kuja seuraa İzmirin sisälahden reunaa. Keskiajalla '
        + 'katua sanottiin mevlevien kaduksi, koska sen varrella oli '
        + 'sufiveljeskunnan kokoontumistalo dergah. Basaari syntyi vasta, '
        + 'kun lahden matalimmat kohdat täytettiin vuosina 1650–1670 ja '
        + 'kauppa levisi uudelle maalle. Loput sisälahdesta liettyi '
        + 'umpeen 1700-luvulla, ja rantaviiva sai nykyisen suoran '
        + 'muotonsa 1800-luvun alussa.'
        + '\n\n'
        + 'Täytetylle maalle nousi karavaaniseraajeja. Vuonna 1744 '
        + 'valmistui Kızlarağası Han, josta tuli basaarin ydin ja joka on '
        + 'yhä pystyssä. Kortteliin rakennettiin 1600-luvulla myös Suuri '
        + 'ja Pieni Vezir Han: ensimmäisen rakennutti suurvisiiri Köprülü '
        + 'Fazıl Ahmed Pasha ja toisen hänen seuraajansa Merzifonlu Kara '
        + 'Mustafa Pasha. Cezayir Hanin eli Algerian hanin kautta '
        + 'Länsi-Anatolian liikaväkeä lähetettiin vuosittain töihin '
        + 'Algeriaan.'
        + '\n\n'
        + 'Basaarin keskellä seisoo Hisarin moskeija, keskustan '
        + 'suurimpia. Nimi tarkoittaa linnaketta ja viittaa samalla '
        + 'paikalla seisseeseen genovalaiseen San Pietroon, jota '
        + 'bysanttilaiset kutsuivat nimellä Neon Kastron; linnan '
        + 'viimeiset jäänteet purettiin uusien satamarakenteiden tieltä '
        + 'vuosina 1867–1876. Kujilla on omat nimensä, kuten Havra sokağı '
        + 'eli synagogankatu: alueella on yhä kahdeksan synagogaa.',
      kuvat: [
        {
          tiedosto: 'Kemeraltı daytime.jpg',
          selite: 'Kemeraltın kivetty kuja keskipäivällä: molemmin puolin '
            + 'markiisien alla myymälöitä, kylteissä lukee turkiksi '
            + 'berber, kahvesi ja aksesuar, ja katua varjostaa iso '
            + 'plataani. Penkeillä istuu miehiä, ohi kävelee ostoksilla '
            + 'olevia ihmisiä ja puun takana roikkuu punainen lippu.',
          lahde: 'Francisco Anzola, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Izmir Kızlarağası Hanı 5918.jpg',
          selite: 'Kızlarağası Hanin katettu käytävä sisältä: tiilinen '
            + 'tynnyriholvi jatkuu perälle asti, molemmin puolin on '
            + 'nahkatavara- ja korukauppoja valokylttien takana, ja '
            + 'käytävällä kulkee muutama asiakas.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Hisarin moskeija': {
      aika: '1598',
      teksti: 'Nimi tarkoittaa linnoitusta. Hisar Camii, myös Hisarönün '
        + 'moskeija, seisoo Kemeraltın basaarikorttelissa İzmirin '
        + 'keskustassa, ja se on keskustan suurimpia moskeijoita: '
        + 'pohjakaava on suorakaide, 25 metriä kertaa 20. Sisäänkäyntiä '
        + 'vastapäätä kohoaa pääkupoli, jota kannattaa kahdeksan järeää '
        + 'pylvästä. Sen molemmin puolin on kolme suurta kupolia ja '
        + 'takaosassa ylhäällä vielä kolme pienempää. Pihan sivuja '
        + 'kiertää seitsemän kupolin rivi, ja pihalle avautuu şadırvan, '
        + 'suihkulähde, jonka ääressä peseydytään ennen rukousta.'
        + '\n\n'
        + 'Rakennuttajaksi on kirjattu Aydınoğlu Yakup Bey, joka oli '
        + 'İzmirin osmanihallitsija vuosina 1592–1598, ja '
        + 'valmistumisvuodeksi 1598. Nykyinen asu ei ole alkuperäinen: '
        + 'rakennus on korjattu neljästi: 1813, 1881, 1927 ja 1980.'
        + '\n\n'
        + 'Sisällä katse nousee kupoliin. Sen sisäpinta on maalattu kehä '
        + 'kehältä soikeiksi medaljongeiksi, joissa on kullattuja '
        + 'kukkakimppuja vaalean liilalla pohjalla, ja keskellä on tumma '
        + 'pyörylä kullattuine ruusukkeineen. Pylväiden päät on veistetty '
        + 'kullatuiksi lehtikoristeiksi, kaarten ympärillä kiertää '
        + 'kullattu kipsikoriste ja seinillä riippuu mustia '
        + 'kalligrafiakilpiä. Sisustusta pidetään İzmirin näyttävimpiin '
        + 'kuuluvana esimerkkinä osmanien islamilaisesta taiteesta.',
      kuvat: [
        {
          tiedosto: 'Hisar Mosque (October 2018).jpg',
          selite: 'Moskeija viereisen kauppakorttelin katolta: vasemmalla '
            + 'minareetti, jonka ainoalla parvekkeella on kaiuttimet, '
            + 'oikealla lyijynharmaa pääkupoli kuunsirppihuippuineen ja '
            + 'sen ympärillä pienempiä kupoleita valkoisin, rei\'itetyin '
            + 'kaari-ikkunoin. Etualan tiili- ja kiviraidallisen '
            + 'rakennuksen katolla on punatiilisiä hormeja, lasikupuja ja '
            + 'ilmastointikoneita, ja alhaalla Kemeraltın kujalla näkyvät '
            + 'kauppojen markiisit, kyltit KAOS SILVER ja Halıcılık, '
            + 'mallinukkeja ja pöydän ääressä istuvia ihmisiä.',
          lahde: 'Francisco Anzola, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Hisar Camii 2025 Şubat 1.jpg',
          selite: 'Pääkupoli alhaalta: kehä kehältä soikeita medaljonkeja, '
            + 'joissa on kullattuja kukkakimppuja vaalean liilalla '
            + 'pohjalla, keskellä tumma pyörylä kullattuine '
            + 'ruusukkeineen. Reunoilla kiertää kullattu kipsikoriste, '
            + 'seinillä on mustia pyöreitä kalligrafiakilpiä ja '
            + 'kaari-ikkunoita, ja kupolin poikki kulkee kattokruunujen '
            + 'mustia ripustusvaijereita.',
          lahde: 'Satirdan kahraman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Hisar Camii 2025 Şubat 14.jpg',
          selite: 'Yksi kupolia kannattavista paksuista pylväistä '
            + 'alaviistosta kuvattuna: kapiteeli on veistetty kullatuiksi '
            + 'lehtikoristeiksi. Taustalla näkyvät sivukupolit ja kapeat '
            + 'kaari-ikkunat, vasemmalla riippuu iso messinkinen '
            + 'kynttiläkruunu ja kuvan poikki kulkee useita mustia '
            + 'ripustusvaijereita.',
          lahde: 'Satirdan kahraman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sulu Han': {
      teksti: 'Nimi on kuvaus: sulu tarkoittaa vetistä. Kemeraltın '
        + '1600-luvulla rakennettu han on korttelin suurimpia, ja sen '
        + 'sisäpihan keskellä on suihkulähde. Pihaa kiertää kaksi '
        + 'kerrosta kaarikäytäviä. Vesi oli hanissa käyttötavaraa eikä '
        + 'koristetta: sitä tarvittiin juomiseen, eläinten juottamiseen, '
        + 'peseytymiseen ja rukousta edeltävään puhdistautumiseen, ja se '
        + 'otettiin pihan lähteestä. Siksi kaivo tai suihkulähde kuuluu '
        + 'lähes jokaisen karavaaniseraajin pihaan.'
        + '\n\n'
        + 'Matkustajan kannalta talo on yksinkertainen. Sisään tullaan '
        + 'yhdestä portista, joka on mitoitettu niin, että kuormattu '
        + 'juhta mahtuu siitä läpi. Alakerta on tavaraa ja eläimiä '
        + 'varten: varastokomerot, pilttuut ja rehu. Yläkerta on ihmisiä '
        + 'varten. Kaupungin han ei ollut pelkkä yösija vaan yhtä lailla '
        + 'varasto ja kauppapaikka. Tavara purettiin, säilytettiin ja '
        + 'myytiin samassa talossa, jossa nukuttiin. Pihan puodeista '
        + 'täydennettiin matkavarat, ja osa puodeista osti tavaran '
        + 'suoraan tulijalta.'
        + '\n\n'
        + 'Haneja rakennettiin kortteliin paljon: vuonna 1905 '
        + 'ranskalaiset kartoittajat piirsivät alueesta kansainvälisten '
        + 'vakuutusyhtiöiden tilauksesta kartan, johon niitä on merkitty '
        + 'satoja.',
      kuvat: [
      ],
      lahde: 'Wikipedia',
    },
    'Smyrnan agora': {
      aika: '178',
      teksti: 'Torin lattiaa kannattaa kolmikerroksinen suorakaiteen '
        + 'muotoinen rakennus, joka on ladottu pylväiden ja kaarien '
        + 'varaan suuren sisäpihan ympärille ja jonka etusivulla nousevat '
        + 'portaat. Saksalainen arkeologi Rudolf Naumann ja İzmirin ja '
        + 'Efesoksen museoiden johtaja Selâhattin Kantar kaivoivat sen '
        + 'esiin vuosina 1931–1942. Läntisen pylväshallin korinttilaiset '
        + 'pylväät seisovat yhä rivissä, ja hallin toisessa kaaressa on '
        + 'keisarin vaimon Faustinan rintakuva.'
        + '\n\n'
        + 'Kreikkalaiset rakensivat torin 300-luvulla eaa. Pagos-kukkulan '
        + 'pohjoisrinteen juurelle. Se oli kaupungin kaupan, '
        + 'oikeudenkäytön ja hallinnon keskus sekä opetuksen paikka. '
        + 'Vuoden 178 maanjäristys tuhosi sen, ja keisari Marcus Aurelius '
        + 'määräsi sen rakennettavaksi uudelleen. Puhuja Aelius Aristides '
        + 'kirjoitti keisarille ja tämän pojalle Commodukselle ja pyysi '
        + 'heitä kaupungin uusiksi perustajiksi. Kaivauksista on löytynyt '
        + 'piirtokirjoituksia, joissa luetellaan järistyksen jälkeen apua '
        + 'antaneet.'
        + '\n\n'
        + 'Kaivaukset jatkuvat yhä. Vuodesta 2002 työtä on rahoittanut '
        + 'İzmirin suurkaupunkikunta, alue on kasvanut 16 590 '
        + 'neliömetriin, ja vanhoja betonipaikkauksia vaihdetaan '
        + 'marmoriin. Maasta on nostettu Hermeksen, Dionysoksen, Eroksen '
        + 'ja Herakleen patsaita sekä Hestiaa esittäviä reliefejä. Vuonna '
        + '2026 pohjoiskadun varrelta paljastui noin kolme kertaa neljä '
        + 'metriä mosaiikkilattiaa, jonka keskiössä on Salomonin solmu; '
        + 'se on tehty 300–500-luvuilla.',
      kuvat: [
        {
          tiedosto: 'Izmir agora substructure 6255.jpg',
          selite: 'Torin lattiaa kannattaneet holvit: leveä kivikaari ja sen '
            + 'takana rivi kapeampia kaaria, joiden alla kasvaa ruohoa ja '
            + 'pikkukukkia. Kaarten yläpuolella näkyy pylväshallin '
            + 'pylväitä ja yksi katkennut pylväänpätkä.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Agora of Smyrna, built during the Hellenistic era at the base of Pagos Hill and totally rebuilt under Marcus Aurelius after the destructive 178 AD earthquake, Izmir, Turkey (18699693425).jpg',
          selite: 'Läntisen pylväshallin korinttilaiset pylväät nurmen '
            + 'reunassa. Taustalla kohoaa vaaleanpunainen monikerroksinen '
            + 'pysäköintitalo, jonka kansilla seisoo autoja; vasemmalla '
            + 'kaivausalueen ylle on vedetty vihreä peltikatos.',
          lahde: 'Carole Raddato from FRANKFURT, Germany, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Salepçioğlun moskeija': {
      aika: '1905',
      teksti: 'Rukoussali on pohjaltaan neliö, ja sen päällä lepää yksi '
        + 'kupoli. Siirtymä neliöstä ympyrään on tehty pendentiiveillä '
        + 'eli kolmiomaisilla kaarevilla pinnoilla salin kulmissa. '
        + 'Kupolin sisäpinta on veistoskoristeltu, ja värit ovat '
        + 'punainen, vihreä ja ruskea. Pääkupolin lisäksi rakennuksessa '
        + 'on kolme pienempää kupolia sisäänkäynnin puolella. Ulkoseinät '
        + 'on verhottu vihreällä marmorilla ja kivellä, ja saliin tulee '
        + 'valoa kahdesta ikkunarivistä, alemmasta ja ylemmästä.'
        + '\n\n'
        + 'Minareetti ei liity rakennukseen kiinni. Se seisoo '
        + 'koillispuolella omalla kivijalustallaan, runko on pyöreä ja '
        + 'parvekkeita on yksi. Muoto on poikkeuksellisen hoikka. '
        + 'Minareetti on korjattu kahdesti, 1927 ja 1974.'
        + '\n\n'
        + 'Moskeija valmistui vuonna 1905 keskelle Kemeraltın '
        + 'basaarikorttelia, ja se on nimetty rakennuttajansa Salepçizade '
        + 'Hoca Ahmed Efendin mukaan. Mihrab on pyöreä syvennys valkoista '
        + 'ja harmaata marmoria, ja saarnatuoli on niin ikään marmoria, '
        + 'yläosassaan geometrista kuviointia.',
      kuvat: [
        {
          tiedosto: 'Salepçioğlu Mosque, October 2018.jpg',
          selite: 'Moskeija kadulta alaviistosta: keskellä kohoaa harmaa '
            + 'pääkupoli puolikuukoristeineen, sen sivuilla pienemmät '
            + 'kupolit, seinät ovat tummanvihreää kiveä valkoisin '
            + 'marmorikehyksin ja ikkunoiden edessä on valkoiset '
            + 'rautaparvekkeet. Vasemmalla nousee hyvin hoikka '
            + 'minareetti, jossa on yksi parveke ja joka seisoo erillään '
            + 'rakennuksesta. Aidan edessä on valkoinen kyltti moskeijan '
            + 'nimellä, kuvan reunaan osuvat katuvalon varsi ja '
            + 'palmunlehtiä.',
          lahde: 'BSRF, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Salepçioğlu Camii Kubbesi.jpg',
          selite: 'Kupoli alhaalta kuvattuna: vaaleansiniseltä pohjalta '
            + 'säteilee kullanruskeita ripoja keskusmedaljonkiin asti, ja '
            + 'väleihin on maalattu tähti- ja kasviaiheita. Kupolin '
            + 'juurella kiertää rivi kaari-ikkunoita värillisine '
            + 'laseineen, ja kulmien pendentiiveissä on mustat '
            + 'kahdeksankulmaiset kalligrafialevyt. Kuvan halki kulkee '
            + 'vaalea vaijeri, jossa kattokruunu riippuu.',
          lahde: 'Canercangul, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Ankaran nähtävyysjutut (nippu 2, 13.8.2026). Kellotornin juttu
   * kirjoitettiin uudelleen, koska se alkoi samalla virkkeellä kuin
   * linnan juttu ja toisti muurikehien mitat; nyt se lähtee
   * portista, jonka torniin kellotorni on rakennettu.
   */
  ankara: {
    'Ankaran linna': {
      teksti: 'Linnassa on kaksi muurikehää. Ulomman kehän tornit ovat noin '
        + '40 metrin välein. Sisempi kehä on paljon tiheämpi: siinä '
        + 'tornit seuraavat toisiaan lyhyin välein, ja muurin sisään jää '
        + 'alue, joka on noin 350 metriä pitkä ja 150 metriä leveä. '
        + 'Pohjana on laavakieleke, joka kohoaa selvästi vanhan kaupungin '
        + 'yläpuolelle.'
        + '\n\n'
        + 'Tarkkoja rakennusvuosia ei tiedetä. Molemmat kehät ovat '
        + 'kuitenkin vuotta 622 nuorempia: silloin persialaiset '
        + 'valtasivat ja hävittivät kaupungin, ja muurit nousivat vasta '
        + 'sen jälkeen. Tutkija Clive Foss on arvioinut sisemmän kehän '
        + 'keisari Konstans II:n ajalta — hän hallitsi Bysantissa vuosina '
        + '641–668 — ja ulompaa kehää pidetään hieman nuorempana. Kukkula '
        + 'oli linnoitettu jo kauan ennen sitä: ensimmäiset varustukset '
        + 'ovat fryygialaisilta 700-luvulta eaa., ja galatialaiset '
        + 'rakensivat ne uudestaan vuonna 278 eaa. Työ jatkui '
        + 'kerroksittain roomalaisten, bysanttilaisten, seldžukkien ja '
        + 'ottomaanien aikana.'
        + '\n\n'
        + 'Muurien sisäpuolella on Ankaran vanhin kaupunginosa. Kadut '
        + 'ovat kapeita ja mutkaisia, ja niiden varrella seisoo kaupungin '
        + 'parhaiten säilynyttä perinteistä rakennuskantaa; osa taloista '
        + 'on kunnostettu ravintoloiksi. Muurin ulkopuolella rinteessä on '
        + 'roomalaisen teatterin jäänteet: näyttämö ja sen takatilat ovat '
        + 'näkyvissä, katsomoa kaivetaan yhä esiin.',
      kuvat: [
        {
          tiedosto: 'Castillo de Ankara, Ankara, Turquía, 2024-10-02, DD 11-13 HDR.jpg',
          selite: 'Linnavuoren laki iltavalossa: sisemmän kehän hammastettu '
            + 'muuri seisoo kalliojyrkänteen päällä, ja muurin takaa '
            + 'nousee korkea salko, jossa liehuu Turkin lippu. Parapetin '
            + 'tuntumassa on tv-antenneja ja muuria vasten rakennettu '
            + 'peltikattoinen talo. Rinteessä on tiheässä '
            + 'punatiilikattoisia vanhoja taloja, ja horisontissa erottuu '
            + 'nykyinen keskusta tornitaloineen.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Ankara Ickale street view in 2011 01.jpg',
          selite: 'Kuja muurien sisäpuolella: molemmin puolin valkoiseksi '
            + 'rapattuja taloja, joissa on ristikkosäleiköllä suojatut '
            + 'ikkunat, ruskea puuovi ja kuvioitu peltiovi. Kauempana '
            + 'yläkerrat työntyvät kadun päälle ja katot ovat punaista '
            + 'tiiltä. Sähkölangat kulkevat puupylväiden varassa, '
            + 'seinässä on sähkömittarin kotelo, ja poika ajaa '
            + 'pikkupyörällä kameraa kohti.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Augustuksen temppeli': {
      teksti: 'Rooma valloitti Keski-Anatolian ja perusti Galatian maakunnan, '
        + 'jonka hallintokeskus oli Ancyra. Augustuksen ja Rooman '
        + 'temppeli rakennettiin sinne noin 25–20 eaa. Sitä laajennettiin '
        + '100-luvulla jaa., ja 400-luvulla siitä tehtiin kirkko. '
        + 'Pystyssä ovat enää sivuseinät ja koristeltu oviaukon kehys, ja '
        + 'kuuden pylvään paikat erottuvat yhä. Viereen nousi 1400-luvun '
        + 'alussa Hacı Bayramin moskeija.'
        + '\n\n'
        + 'Augustus kuoli 19. elokuuta vuonna 14 jaa., ja selonteko hänen '
        + 'teoistaan oli valmistunut kuukautta aiemmin. Testamentissaan '
        + 'hän määräsi senaatin pystyttämään tekstin. Alkuperäinen '
        + 'kaiverrettiin kahteen pronssipilariin Roomaan mausoleumin '
        + 'eteen, eivätkä pilarit ole säilyneet. Ancyrassa latina '
        + 'hakattiin eteishallin sisäseiniin, pohjoisseinästä alkaen ja '
        + 'eteläseinään päättyen, ja kreikankielinen käännös cellan '
        + 'ulkoseinään. Kaksi muuta säilynyttä kappaletta on '
        + 'epätäydellisiä; Ankaran seinien kappale on täydellisin.'
        + '\n\n'
        + 'Teksti on minä-muodossa: johdanto, 35 lukua ja kuoleman '
        + 'jälkeen lisätty loppuliite. Augustus luettelee virat, joista '
        + 'kieltäytyi, jakamansa rahat ja viljan sekä sotaretkensä; '
        + 'loppuliitteen mukaan hän kustansi julkisia hankkeita omista '
        + 'varoistaan 600 miljoonalla hopeadenaarilla. Vastustajia ei '
        + 'mainita nimeltä kertaakaan: Caesarin murhaajat ovat ”ne, jotka '
        + 'tappoivat isäni” ja Marcus Antonius ”se, jonka kanssa kävin '
        + 'sotaa”. Kreikannos ei ole sanatarkka.',
      kuvat: [
        {
          tiedosto: 'Ankara Temple of Augustus and Rome exterior from S in 2019 02.jpg',
          selite: 'Temppelin cellan seinä etelästä: vaaleaa kalkkikiveä '
            + 'ladottuna kerroksiin, seinässä pieniä ristikkoikkunoita ja '
            + 'lohkeamia. Vasemmalla nousee Hacı Bayramin moskeijan '
            + 'tiiliminareetti valkoisine vöineen ja sen takana moskeijan '
            + 'punatiilinen katto, oikeassa reunassa seinää vasten '
            + 'teräksinen tukiteline. Nurmikolla edessä on pylväänpaloja '
            + 'ja kivilohkareita sekä matala kiviaita.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'The Temple of Augustus and Rome with the Res Gestae Divi Augusti ("Deeds of the Divine Augustus") inscribed on the walls of the cella, Ancyra, Ankara (Turkey) (26068597826).jpg',
          selite: 'Kreikankielinen käännös cellan ulkoseinässä: kreikkalaisin '
            + 'suuraakkosin hakattua tekstiä tiiviinä palstoina, '
            + 'kivipinta paikoin lohjennut ja kirjaimia kadonnut. '
            + 'Alareunassa kulkee meanderilista.',
          lahde: 'Carole Raddato from Frankfurt, Germany, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Turkey. Ankara. Temple of Augustus Caesar. Latin inscription closer up. LOC matpc.03372.jpg',
          selite: 'Mustavalkokuva eteishallin seinästä: ylhäällä '
            + 'latinankielisen tekstin isokirjaiminen otsikkorivi RERVM '
            + 'GESTARVM DIVI AVGVSTI, sen alla tiheitä tekstipalstoja, ja '
            + 'seinässä isoja lohkeamia ja reikiä. Negatiivin mustaan '
            + 'alareunaan on tehty vaalea merkintä.',
          lahde: 'Matson Collection, Wikimedia Commons (PD)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Roomalainen kylpylä': {
      teksti: 'Kylpylän lattiat ovat poissa, mutta niiden kannattimet ovat '
        + 'tallella: nurmella seisoo satoja tiilipinoja tasaisissa '
        + 'riveissä. Ne ovat hypokaustin pilareita. Pinojen päälle '
        + 'ladottiin tiililaatta, sen päälle betonikerros ja vasta '
        + 'ylimmäksi huoneen lattia, joten lattian ja maan väliin jäi '
        + 'yhtenäinen ontelo. Uunista tuleva kuuma ilma ja savu kiersivät '
        + 'pilareiden välissä ja nousivat seinien sisään muurattuja '
        + 'tiiliputkia pitkin katolle, joten lämpöä tuli sekä lattiasta '
        + 'että seinistä.'
        + '\n\n'
        + 'Kylpylä rakennettiin 200-luvulla keisari Caracallan (hallitsi '
        + '198–217) aikana ja omistettiin lääketieteen jumalalle '
        + 'Asklepiokselle. Kolikkolöydöt ajoittivat rakentamisen ja '
        + 'osoittivat noin viidensadan vuoden käytön. 700-luvulla talo '
        + 'tuhoutui tulipalossa, ja jäljelle jäivät kellarikerroksen ja '
        + 'pohjakerroksen rauniot. Kaivaukset tehtiin 1937–1944.'
        + '\n\n'
        + 'Sisään tullaan Çankırı Caddesiltä vanhalle palaestralle eli '
        + 'painipihalle, jota kiersi pylväikkö: marmoripylväitä oli 128, '
        + '32 kullakin sivulla. Pihan takana ovat pukuhuone ja kolme '
        + 'kylpyhuonetta — caldarium kuumalle, tepidarium haalealle ja '
        + 'frigidarium kylmälle vedelle. Tepidarium ja caldarium ovat '
        + 'poikkeuksellisen suuria: lämpimissä huoneissa viivyttiin '
        + 'kaupungin kylmien talvien takia pisimpään. Nykyään alue on '
        + 'ulkoilmamuseo, ja pihalla on esillä hautakiviä, alttareita ja '
        + 'piirtokirjoituksia roomalaiselta, bysanttilaiselta ja '
        + 'myöhäishellenistiseltä ajalta.',
      kuvat: [
        {
          tiedosto: 'The Roman Baths of Ancyra, constructed in the third century during the reign of Roman Emperor Caracalla by a wealthy citizen of Ancyra called Tiberius Julius Justus Junianus, Ankara, Turkey (26211723132).jpg',
          selite: 'Hypokaustin pilarit paikoillaan: pyöreistä ja '
            + 'neliskulmaisista tiilistä ladotut pinot seisovat '
            + 'tasaisissa riveissä nurmettuneella pohjalla, ympärillä '
            + 'kiveä ja tiiltä vuorottelevat perustusmuurit ja oikealla '
            + 'rivi tiilikaaria. Takana on metalliaita, paljaita puita ja '
            + 'Ankaran rinteille nouseva nykykaupunki keltaisine '
            + 'nostokurkineen.',
          lahde: 'Carole Raddato from Frankfurt, Germany, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Ankara Thermen13.jpg',
          selite: 'Ulkoilmamuseon kivilöytöjä nurmella: korinttilaisia '
            + 'pylväänkapiteeleja akantinlehtineen, hakattu kivitaulu, '
            + 'jonka syvennyksessä seisoo ihmishahmo, ja etualalla maahan '
            + 'laskettuja harmaita pylväänvarsia. Kuvaa reunustavat '
            + 'männyn ja oliivipuun oksat, ja taustalla näkyy '
            + 'lasiseinäinen toimistotalo.',
          lahde: 'Ingeborg Simon, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Julianuksen pylväs': {
      aika: '362',
      teksti: 'Uluksen hallintokorttelissa seisoo yksinään noin viisitoista '
        + 'metriä korkea kivipylväs. Sitä ei ole veistetty yhdestä '
        + 'kivestä vaan muurattu kappaleista päällekkäin, ja varren pinta '
        + 'on uurrettu tiheiksi vaakarenkaiksi juuresta latvaan. Ylimpänä '
        + 'on lehtikoristeinen kapiteeli, jonka yläreunasta on lohjennut '
        + 'paloja. Turkiksi pylväs on Julianus Sütunu, mutta '
        + 'ankaralaisten oma nimi sille on Belkıs Minaresi, Belkısin '
        + 'minareetti.'
        + '\n\n'
        + 'Keisari Julianus julisti sodan persialaisia vastaan vuonna 362 '
        + 'ja määräsi sotaretkelle reitin, joka kulki Ankaran kautta. Kun '
        + 'kaupunkiin tuli tieto, että keisari pysähtyy siellä '
        + 'matkallaan, valmistelut aloitettiin koko kaupungissa ja pylväs '
        + 'pystytettiin hänen kunniakseen. Ajoitus ei silti ole aivan '
        + 'varma: valmistumisvuodeksi merkitään sekä 362 että 360. '
        + 'Julianus oli viimeinen pakanallinen Rooman keisari, ja hänestä '
        + 'jäi kaupunkiin toinenkin kivi: linnan sisemmän muurin '
        + 'itäsivulla on patsaan jalusta, jonka kirjoitus nimittää '
        + 'keisaria koko maailman herraksi Britannian valtamerestä '
        + 'barbaarikansoihin.'
        + '\n\n'
        + 'Pylväs seisoo nurmisaarekkeella porrastetun kivijalustan '
        + 'päällä, ajoteiden välissä, ja sen takana on Ankaran '
        + 'lääninhallituksen rakennus. Samassa korttelistossa ovat '
        + 'Augustuksen temppeli ja roomalainen kylpylä. Pylväs oli '
        + 'pitkään ilman korjauksia; lääninhallitus kunnosti sen vuonna '
        + '2001.',
      kuvat: [
        {
          tiedosto: 'Julian Column, Ankara 2024.jpg',
          selite: 'Pylväs kokonaisuudessaan aamuvalossa: profiloitu vaalea '
            + 'kivijalusta seisoo karkeasta punaruskeasta kivestä '
            + 'muuratun perustan päällä nurmisaarekkeella, ja jalustan '
            + 'eteen on asetettu kaksi mustaa valonheitintä. Varsi '
            + 'kapenee ylöspäin, ja sen pinta on uurrettu tiheiksi '
            + 'vaakarenkaiksi. Kapiteelissa erottuvat lehtikuvio ja '
            + 'soikea medaljonki, ja sen yläreunasta on lohjennut pala. '
            + 'Oikealla on leikattu pensasaita, takana matala kiviaita ja '
            + 'musta rautakaide, edessä asfalttitie ja vasemmalla '
            + 'kaksikerroksinen rakennus tiilikattoineen ja '
            + 'ristikkoikkunoineen.',
          lahde: 'Radosław Botev, Wikimedia Commons (CC BY 3.0 pl)',
        },
        {
          tiedosto: 'Ankara - Julianus Sütunu 0366.jpg',
          selite: 'Pylvään latva talvella: kapiteelin päällä on iso risuista '
            + 'kyhätty pesä, ja irtorisuja roikkuu kapiteelin reunojen '
            + 'yli. Kapiteeliin on veistetty akantinlehtiä muistuttavat '
            + 'lehdet ja pyöreä medaljonki, ja sen yläkulmista on '
            + 'lohjennut kiveä. Kapiteelin alapuolella varsi on uurrettu '
            + 'kymmeniksi kapeiksi vaakarenkaiksi. Ympärillä on '
            + 'lehdettömiä oksia ja taustalla harmaa pilvitaivas.',
          lahde: 'Phyrexian, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Anatolian sivilisaatioiden museo': {
      teksti: 'Museo on kahdessa 1400-luvun ottomaanirakennuksessa Ankaran '
        + 'linnan eteläpuolella Atpazarın korttelissa. Näyttely on Mahmut '
        + 'Paşan bedestenissä eli katetussa kauppahallissa, jonka Mehmed '
        + 'II:n visiiri rakennutti vuosina 1464–1471: kymmenen kupolia '
        + 'kattaa suorakaiteen, ja hallissa oli 102 puotia vastakkain. '
        + 'Vieressä on Kurşunlu Han: keskellä piha ja pylväskäytävä, '
        + 'ympärillä kaksi kerrosta huoneita, 28 alhaalla ja 30 ylhäällä. '
        + 'Han on nykyään hallintosiipi, jossa ovat työhuoneet, kirjasto, '
        + 'esitelmäsali ja laboratorio.'
        + '\n\n'
        + 'Kymmenkupolinen keskihalli on jätetty yhdeksi tilaksi, ja '
        + 'siinä seisovat suuret kivireliefit ja patsaat '
        + 'myöhäisheettiläiseltä ajalta: pitkäkaapuisia sotilaita, '
        + 'sotavaunuja, hieroglyfikirjoitusta ja basalttileijonia '
        + 'Malatya-Arslantepestä, Karkamışista ja Sakçagözüstä. Hallia '
        + 'kiertävissä sivusaleissa aikakaudet seuraavat toisiaan '
        + 'paleoliittisesta klassiseen: neoliittinen ja kalkoliittinen '
        + 'kausi, varhainen pronssikausi, assyrialaiset '
        + 'kauppasiirtokunnat, heettiläiset, frygialaiset, urartulaiset '
        + 'ja lyydialaiset, lopulta roomalainen ja bysanttilainen aika.'
        + '\n\n'
        + 'Neoliittisessa salissa on Çatalhöyükin seinämaalauksia '
        + 'rappauspaloina: metsästyskohtaus 7. vuosituhannelta eaa. ja '
        + 'purkautuva Hasan-vuori. Varhaisen pronssikauden vitriineissä '
        + 'ovat Alacahöyükin ruhtinashaudoista kaivetut aurinkokiekot ja '
        + 'hirvipatsaat. Museo valittiin Euroopan vuoden museoksi 19. '
        + 'huhtikuuta 1997.',
      kuvat: [
        {
          tiedosto: 'Museum of Anatolian Civilizations 2024.jpg',
          selite: 'Museon sisäänkäynti pihalta: luonnonkiviseinässä on '
            + 'valkoinen marmorikaari, johon on hakattu ANADOLU '
            + 'MEDENİYETLERİ MÜZESİ, ja oven kummallakin puolen pyöreä '
            + 'museomedaljonki sekä keltainen opastekilpi. Takana kohoaa '
            + 'bedestenin kaksi lyijykupolia lyhtyineen, vasemmalla näkyy '
            + 'hanin kaarikäytävä, ja pihan reunoilla seisoo rivi '
            + 'kivileijonia ja torsoja. Portaiden vieressä on luiska ja '
            + 'piha on ladottu harmaalla betonikivellä.',
          lahde: 'Radosław Botev, Wikimedia Commons (CC BY 3.0 pl)',
        },
        {
          tiedosto: 'Museo de las Civilizaciones Anatólicas. Interior.jpg',
          selite: 'Keskihalli tiiliholvien alla: vasemmalla seinustalla '
            + 'jatkuu rivi kivireliefejä, joissa kulkee pitkäkaapuisia '
            + 'hahmoja sauva ja jousi kädessä, ja rivin jatkona on '
            + 'hieroglyfein kirjoitettu kivipaasi. Oikealla kaksi tummaa '
            + 'basalttileijonaa on nostettu korokkeille ja '
            + 'lasivitriinissä on marmoripää. Holvissa on pieniä '
            + 'kaari-ikkunoita, katosta riippuu valkoinen kangasbanneri, '
            + 'seinällä on selitystauluja piirroksineen ja reliefien '
            + 'edessä kulkee köysiaita messinkitolpissa.',
          lahde: 'José Luis Filpo Cabana, Wikimedia Commons (CC BY 3.0)',
        },
        {
          tiedosto: 'Museum Ankara 04.jpg',
          selite: 'Esihistorian sivusali: oikealla seinällä on valaistuissa '
            + 'syvennyksissä Çatalhöyükin seinämaalausten rappauspaloja, '
            + 'joihin on maalattu punaruskeita eläin- ja ihmishahmoja, ja '
            + 'niiden alla on selitekilpiä. Salin keskellä on '
            + 'lasivitriinejä pienlöytöineen, katto on tummaa puurimaa ja '
            + 'kiskovalot on suunnattu vitriineihin. Vasemmalla yksi '
            + 'kävijä kumartuu vitriinin ääreen, musta reppu olalla.',
          lahde: 'Ingeborg Simon, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Linnanportin kellotorni': {
      aika: '1884',
      teksti: 'Linnaan mennään yhä samasta paikasta kuin ennen: ulomman '
        + 'muurin pääportista. Portille noustaan jyrkkää katua, sillä '
        + 'kukkula kohoaa 150 metriä Ankarajoen rannan yläpuolelle. '
        + 'Portin vieressä kohoaa pyöreä muuritorni, ja sen päälle on '
        + 'rakennettu kellotorni — torni tornin päälle, vanhan '
        + 'varustuksen jatkoksi.'
        + '\n\n'
        + 'Kellotorni on vuodelta 1884. Turkin vanhin pystyssä oleva '
        + 'kellotorni on Safranbolussa vuodelta 1797, ja Keski-Anatolia '
        + 'on maan kellotornirikkain alue. Osmanien kellotornit tehtiin '
        + 'kolmiosaisiksi: jalusta, runko ja ylin kamari. Jalustassa on '
        + 'huone ja portaat, rungossa kierre- tai siksakportaikko, '
        + 'ylhäällä koneisto. Kaksi teräsvaijeria kantaa painoja, joista '
        + 'toinen pyörittää viisareita ja toinen heiluttaa soittokellon '
        + 'vasaraa. Kamarin seiniin jätettiin aukkoja, jotta ääni '
        + 'kantaisi kauas.'
        + '\n\n'
        + 'Kellotorni tuli ottomaanien kaupunkeihin myöhään. Ajatus '
        + 'syntyi Euroopassa 1200-luvulla ja levisi ottomaanien alueelle '
        + '1500-luvun lopulla, mutta julkisia torneja rakennettiin vasta '
        + 'paljon myöhemmin. Syyksi on esitetty huolta siitä, että '
        + 'muezzinit ja ajanlaskijat menettäisivät merkityksensä — ja '
        + 'sitä, että koneisto saattoi näyttää väärin, kun ajanlaskija '
        + 'osasi laskea rukoushetken tarkasti. Leviämisen kynnyksenä '
        + 'pidetään Abdülhamid II:n valtaannousun 25-vuotisjuhlan '
        + 'määräyksiä; Ankaran torni on niitä vanhempi. Linnan päälle '
        + 'nostettuja kellotorneja on Turkissa muitakin: Niğde, Sinop ja '
        + 'Zile.',
      kuvat: [
        {
          tiedosto: 'Ankara Aug 2023 13 39 04 215000.jpeg',
          selite: 'Kellotorni ja linnan pääportti samassa kuvassa. Vasemmalla '
            + 'vaaleanpunaiseksi rapattu torni nousee pyöreän tiili- ja '
            + 'kivimuuritornin päältä: ylinnä on leveäräystäinen '
            + 'kahdeksankulmainen kamari kaariaukkoineen, sen alla '
            + 'valkoinen kellotaulu roomalaisin numeroin ja pieni '
            + 'kaari-ikkuna. Oikealla muurissa on kaariportti, jonka '
            + 'kaari on ladottu vuorotellen vaaleista ja tummista '
            + 'kivistä, ja portin läpi näkyy kauppakatu markiiseineen. '
            + 'Portin edessä on mustia katulyhtyjä vihrein banderollein, '
            + 'punainen paloposti, betonipollareita ja opastetaulu, jossa '
            + 'lukee Ankara Kalesi. Vasemmalla muurin juurella on puinen '
            + 'luukkukoju ja sen päällä kyltti PARK ETMEK YASAKTIR, ja '
            + 'oikealla muurin takaa pilkistää talo, jonka katolla on '
            + 'punainen PANORAMA-kyltti.',
          lahde: 'Robot8A, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Old Turkish Houses Ankara.jpg',
          selite: 'Ottomaanitalo linnan kaupunginosassa: kivestä ladotun '
            + 'pohjakerroksen päällä yläkerta työntyy ulos puupalkin '
            + 'varassa, ja sen puurunko on täytetty kalanruotokuvioon '
            + 'ladotuilla tiilillä. Ikkunat ovat puukehyksisiä ja '
            + 'pieniruutuisia, seinällä on pieni lyhty, ja julkisivun yli '
            + 'kiipeää villiviini punaisine lehtineen.',
          lahde: 'Pivox, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Aleppon nähtävyysjutut (nippu 2, 13.8.2026). Peli ei kerro
   * nykykonflikteista, joten kohteista kirjoitetaan rakennuksina ja
   * historiana: aikajana päättyy ensimmäiseen maailmansotaan, eikä
   * 2000-luvun korjauksia mainita lainkaan. Kulttuurivisa kertoo jo
   * linnoituksen kukkulasta ja Aleppon saippuasta, joten linnoitus- ja
   * khanjutut on kulmattu toisin.
   */
  halab: {
    'Aleppon linnoitus': {
      aika: '1213',
      teksti: 'Sisään pääsee vain yhtä tietä. Kumpua kiertää vallihauta, joka '
        + 'on 22 metriä syvä ja 30 metriä leveä ja on peräisin '
        + '1100-luvulta. Sen yli vie kaarien varaan muurattu kivisilta, '
        + 'joka päättyy linnoitettuun porttirakennukseen. Sisällä käytävä '
        + 'nousee holvattua ramppia ja kääntyy viisi kertaa suoraan '
        + 'kulmaan. Matkalla on kolme suurta porttia, joiden kiveen on '
        + 'veistetty hahmoja, ja holvin yllä on parvi, jolta kuumaa '
        + 'nestettä kaadettiin alas tunkeutujien niskaan.'
        + '\n\n'
        + 'Pohjaltaan kumpu on soikio, 450 metriä pitkä ja 325 metriä '
        + 'leveä; laella soikio kapenee 285 x 160 metriin, ja rinnettä on '
        + 'korkeutta 50 metriä. Ennen koko kumpu oli päällystetty '
        + 'suurilla kiiltävillä kalkkikivilohkareilla, ja osa '
        + 'kivetyksestä on yhä paikallaan. Kaivoja on porattu 125 metrin '
        + 'syvyyteen laen pinnasta.'
        + '\n\n'
        + 'Nykyinen asu on pääosin ajjubidien aikaa. Saladinin poika '
        + 'al-Zahir al-Ghazi hallitsi Aleppoa vuosina 1193–1215: hän '
        + 'vahvisti muurit, tasoitti kallion pinnan, verhosi rinteen '
        + 'kivellä ja syvensi vallihautaa. Näkyvin osa hänen työtään on '
        + 'porttirakennus vuodelta 1213. Laelle nousi hallitsijan oma '
        + 'kaupunki: palatsi, kylpylä, moskeijoita, asevarasto ja '
        + 'viljavarastot. Ghazin palatsi paloi hänen hääyönään, ja hän '
        + 'pääsi ulos morsiamensa kanssa. Palatsin portissa on '
        + 'kennomainen muqarnas-holvi, ja pihan neljällä sivulla on iwan '
        + 'eli avoin sali.',
      kuvat: [
        {
          tiedosto: 'John Henry Haynes. Gate of castle of Aleppo (id.13993458).jpg',
          selite: 'Linnoituksen sisäänkäynti vuonna 1887. Vasemmalla seisoo '
            + 'matala hammaslaitainen ulkotorni, siitä lähtee '
            + 'kaarijalkojen varaan muurattu silta vallihaudan yli, ja '
            + 'sillan päässä kohoaa korkea porttirakennus, jonka '
            + 'julkisivulla on rivi ulkonevia kivikoteloita ja keskellä '
            + 'teräväkaarinen syvennys. Oikealla rinnettä peittää '
            + 'suurista lohkareista ladottu kivetys, ja etualalla on '
            + 'tyhjä hiekkainen aukio.',
          lahde: 'John Henry Haynes, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'In de citadel van Aleppo Zicht op de hoofdpoort vanuit een binnenplaats, Bestanddeelnr 255-5951.jpg',
          selite: 'Näkymä ulomman portin holvikaaren alta porttirakennukseen '
            + 'vuonna 1950. Kiviportaat nousevat suoraan ovelle, '
            + 'julkisivulla on rivi kannattimien varaan muurattuja '
            + 'kivikoteloita ja niiden välissä kapeita pystyaukkoja. '
            + 'Ylempänä on ristikkoikkuna koristeellisessa '
            + 'kehyspaneelissa ja pieniä ikkunoita, ja oikeassa '
            + 'yläkulmassa näkyy muurin harja, ohut vaijeri ja kaistale '
            + 'taivasta.',
          lahde: 'Willem van de Poll, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Antiokian portti': {
      teksti: 'Vanhankaupungin läntisen muurin keskellä seisoo portti, jonka '
        + 'nimi kertoo suunnan: tie vei Antiokiaan, antiikin Syyrian '
        + 'pääkaupunkiin. Kaksi kuusikulmaista bastionia nousee '
        + 'rinnakkain, ja niiden välinen kulkuväylä mutkittelee sen '
        + 'sijaan että menisi suoraan läpi. Aukko on oikeanpuoleisen '
        + 'tornin alla, puolustussyistä: sisään tulija ei pääse vauhtiin '
        + 'eikä näe eteensä. Kivi on valkoista, ja lohkareet ovat noin '
        + '0,8 kertaa 1,0 metriä.'
        + '\n\n'
        + 'Bysantin aikana tämä oli kaupungin pääportti, ja sen jälkeen '
        + 'merkitys hiipui. Ajjubidien Aleppon emiiri an-Nasir Yusuf, '
        + 'Saladinin pojanpojanpoika, rakennutti portin uudelleen '
        + '1000-luvulta periytyvän perustuksen päälle. Vuosiluvut ovat '
        + 'epätarkkoja: portin kohdalla hänen kaudekseen ilmoitetaan '
        + '1242–1260, mutta hänestä itsestään kerrotaan, että hän '
        + 'hallitsi Aleppoa vuodesta 1236. Nykyinen asu on 1400-luvulta '
        + 'mamelukkien ajalta, ja silloin portti nousi takaisin '
        + 'vanhankaupungin tunnusmerkiksi.'
        + '\n\n'
        + 'Paikalla oli kaupunki jo paljon ennen porttia: Seleukos '
        + 'Nikator perusti tähän hellenistisen siirtokunnan vuosien 301 '
        + 'ja 286 eaa. välillä ja antoi sille nimen Beroea. Aleppoon '
        + 'yhtyivät reitit idästä Mesopotamiasta ja Kiinasta asti, '
        + 'etelästä Egyptistä ja lännestä Euroopasta, ja tämä oli se pää, '
        + 'josta lähdettiin Antiokiaan. Portista alkaa myös katetun '
        + 'basaarin pääakseli, joka johtaa kaupungin halki itään.',
      kuvat: [
        {
          tiedosto: 'Aleppo Bab Antakya 9065.jpg',
          selite: 'Porttikokonaisuus ulkoa: kaksi järeää kivimassaa nousee '
            + 'rinnakkain, ja oikealle jatkuu korkea muuri, jonka päällä '
            + 'ja takana on asuintaloja. Muurin juurella on pieni '
            + 'kärkikaarinen oviaukko ja sen vieressä opastetaulu '
            + 'nuolineen, ja julkisivua pitkin laskeutuu metallinen '
            + 'syöksytorvi. Kadun laidassa on punainen kielletty '
            + 'ajosuunta -merkki ja sähköpylväitä, ja aukiolla seisoo '
            + 'ihmisiä, käsikärry ja pysäköityjä autoja, joukossa '
            + 'keltainen taksi.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Aleppo Bab Antakya 9106.jpg',
          selite: 'Portin aukko lähempää: syvän kärkikaaren sisällä avautuu '
            + 'toinen, matalampi kaari, ja yläpuolella kiertää kiveen '
            + 'hakattu arabiankielinen kirjoitusnauha. Kiveyksen poikki '
            + 'kulkee ihmisiä, vasemmalla kaksi kantaa valkoisia myttyjä '
            + 'olallaan, ja etualalla mies istuu maassa myymässä muovin '
            + 'päälle levitettyjä punaisia paprikoita ja vihreitä varsia. '
            + 'Seinään on kiinnitetty katuvalo ja sähköjohtoja.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Qinnesrinin portti': {
      aika: '1256',
      teksti: 'Portin ovet olivat matkanneet kauan ennen kuin ne ripustettiin '
        + 'tänne. Ne olivat alun perin bysanttilaisen Amorionin '
        + 'kaupunginportin ovet. Kalifi al-Mu\'tasim otti ne sotasaaliiksi '
        + 'vallattuaan Amorionin elokuussa 838 ja pani ne palatsinsa '
        + 'sisäänkäyntiin Samarraan. Sieltä ne siirrettiin '
        + 'todennäköisesti 800-luvun lopulla Raqqaan, ja Raqqasta '
        + 'hamdanidihallitsija Sayf al-Dawla haki ne Aleppoon, kun hän '
        + 'rakennutti portin vuonna 964.'
        + '\n\n'
        + 'Vanhankaupungin muuri on viiden kilometrin kehä noin 160 '
        + 'hehtaarin ympärillä, ja siinä on yhdeksän porttia. Muurin '
        + 'ulkopuolella kulki leveä ja syvä vallihauta, ja viimeksi '
        + 'muurin rakensivat uudelleen mamelukit. Qinnasrinin portti '
        + 'avautuu eteläsivulla, ja sen nykyinen asu on vuodelta 1256. '
        + 'Nimi tulee Qinnasrinista, joka oli kaupunki 25 kilometriä '
        + 'lounaassa Queiq-joen länsirannalla; roomalaisajalla sinne '
        + 'kulki Aleposta valtatie.'
        + '\n\n'
        + 'Kaupunginportti oli valvottu kulkuaukko, josta ihmiset, '
        + 'ajoneuvot, tavara ja eläimet päästettiin sisään ja ulos. Sen '
        + 'tehtävät liittyivät puolustukseen, turvallisuuteen, '
        + 'terveyteen, kauppaan ja verotukseen, ja miehityksestä '
        + 'vastasivat sotilaat tai kaupungin virkamiehet. Portilla '
        + 'pidettiin esillä myös yleistä tietoa: kuulutuksia, tulli- ja '
        + 'verotaksoja, paikkakunnalla käytettyjä mittoja ja '
        + 'lakitekstejä. Monissa kaupungeissa portit suljettiin illalla '
        + 'määrätyn kellonlyömän jälkeen.',
      kuvat: [
        {
          tiedosto: 'Bab Qinnasrin2010.jpg',
          selite: 'Portin kivinen julkisivu kadun tasolta: korkea suippokaari '
            + 'kehystää holvattua porttikäytävää, ja seinässä '
            + 'vuorottelevat vaaleat ja lähes mustat kivikerrokset. '
            + 'Oikealla on arabiankielinen kaiverruspaneeli ja pyöreä '
            + 'medaljonki, ylhäällä ulkoneva kivikannatin. Kaaren alla '
            + 'seisoo kaksi ihmistä ja seinillä on kaksi pientä '
            + 'opastetaulua, käytävän perällä näkyy vihreä '
            + 'arabiankielinen kyltti ja ristikkoikkunoita, ja oikeassa '
            + 'laidassa on nykyaikaisia taloja, palmu ja pysäköity auto.',
          lahde: 'Nicholas Johnson, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Saippuakhan': {
      teksti: 'Sisäänkäynnin yläpuolinen koristeltu ikkuna on se '
        + 'yksityiskohta, josta khan tunnetaan. Sitä kehystävät '
        + 'kierrepintaiset pikkupylväät, yläreunassa on rivi veistettyjä '
        + 'kennoja, ja aukon ympärillä kivi vaihtaa väriä: vaaleat, '
        + 'mustat ja kellertävät lohkot on leikattu toisiinsa '
        + 'lomittuviksi paloiksi. Vuorottelevia vaaleita ja tummia '
        + 'kivikerroksia sanotaan ablaqiksi. Julkisivun poikki kulkee '
        + 'leveitä vöitä, joihin on hakattu punottu geometrinen kuvio.'
        + '\n\n'
        + 'Khan kuuluu Al-Madinan katettuun basaariin, jonka kujat on '
        + 'holvattu kivellä ja joiden varsille on muurattu kiviset '
        + 'myyntikojut. Basaarin khanit saivat nimensä tehtävästään ja '
        + 'sijainnistaan, ja tämä sai omansa saippuasta: se on yksi '
        + 'Aleppon saippuantuotannon päälaitoksista. Rakennuksessa on '
        + 'kaksi kerrosta, ja pihaa kiertävät kaarikäytävät.'
        + '\n\n'
        + 'Kaupungin vanhimmat säilyneet khanit ovat 1400-luvulta, ja '
        + 'Saippuakhan on niiden nuorimpia — lähteestä riippuen vuodelta '
        + '1479 tai 1500-luvun alusta. Vanhin niistä, Khan al-Qadi, '
        + 'rakennettiin alun perin kouluksi ja muutettiin pian '
        + 'kauppakäyttöön. Idän karavaanireitit olivat kääntyneet '
        + '1300-luvun lopulla Aleppon kautta, ja kaupunkiin tuli tavaraa '
        + 'Iranista ja ostajia Venetsiasta.',
      kuvat: [
        {
          tiedosto: 'Aleppo Khan al-Sabun 9310.jpg',
          selite: 'Julkisivu alaviistosta: keskellä rautaristikkoinen ikkuna, '
            + 'jonka ympärillä mustaa, vaaleaa ja kellertävää kiveä on '
            + 'ladottu lomittain, sivuilla kierrepintaiset pylväät ja '
            + 'yllä rivi veistettyjä kennoja sekä kuvioitu medaljonki. '
            + 'Molemmin puolin kulkee leveä punottu koristevyö ja kaksi '
            + 'pienempää ristikkoikkunaa, alhaalla kaartuu portin holvi '
            + 'kasviaiheineen ja sen alla erottuu varjossa suuri puuovi. '
            + 'Kuvan poikki kulkee sähköjohtoja, katonreunalta työntyy '
            + 'teräspalkki ja oikeassa alakulmassa roikkuu tummansininen '
            + 'matto kultaisella kuviolla; katolla kasvaa pieniä '
            + 'pensaita.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Aleppo Khan al-Sabun 9331.jpg',
          selite: 'Yläkerran kaarikäytävä: teräväkärkiset kivikaaret lepäävät '
            + 'massiivisten pilareiden päällä, katossa on paljaat '
            + 'puupalkit ja lattiassa suuret kivilaatat. Oikealla '
            + 'seinustalla on pinoissa valkoisia ja raidallisia säkkejä, '
            + 'lattialla pahvilaatikko, ja yhdestä kaaresta roikkuu pieni '
            + 'musta arabiankielinen kyltti. Kaarien läpi näkyy pihalle: '
            + 'pieni lehtipuu, alemman kerroksen kaaririvi, pylväskaide '
            + 'ja pihalla seisova mies.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Arghunin sairaala': {
      aika: '1354',
      teksti: 'Sisäänkäynnin vieressä on marmorilaatta, jossa perustamisvuosi '
        + 'on kahtena lukuna: 755 hidžra-ajan mukaan ja 1354. Sinä vuonna '
        + 'emiiri Arghun al-Kamili perusti Aleppoon bimaristanin. Nimi on '
        + 'persiaa ja tarkoittaa sairaan paikkaa. Arghun oli toiminut '
        + 'kaupungin käskynhaltijana vuoteen 1351 asti.'
        + '\n\n'
        + 'Talo jakautuu kuuteen osastoon, joista kukin oli varattu eri '
        + 'hoitomuodolle, ja osastot on ryhmitetty kolmen sisäpihan '
        + 'ympärille. Pihan keskellä on kivinen allas, ja sen ympäriltä '
        + 'avautuu oviaukkoja pieniin kammioihin. Hoitoon kuului runsas '
        + 'valo, raitis ilma, juokseva vesi ja musiikki, joten pihojen '
        + 'mitat ja aukot ovat osa hoitoa eivätkä pelkkää pohjakaavaa. '
        + 'Portaali on tyyliltään muuta taloa vanhempi: se on '
        + 'todennäköisesti peräisin aiemmasta ajjubidien aikaisesta '
        + 'rakennuksesta. Bimaristan oli mamelukkikauden alun merkittävin '
        + 'uudisrakennus Aleppossa.'
        + '\n\n'
        + 'Arghunin talo toimi sairaalana runsaat viisisataa vuotta, '
        + 'vuodesta 1354 1900-luvun alkuun. Bimaristaneja ylläpidettiin '
        + 'waqf-lahjoituksilla. Perustamisasiakirjat määräsivät, ettei '
        + 'ketään saanut käännyttää pois, ja mielisairaat mainittiin '
        + 'niissä erikseen. Potilaita otettiin vastaan varallisuudesta, '
        + 'uskonnosta, kansalaisuudesta ja sukupuolesta riippumatta, eikä '
        + 'hoitoajalle asetettu ylärajaa: asiakirjojen mukaan sairaalan '
        + 'oli hoidettava potilasta paranemiseen saakka.',
      kuvat: [
        {
          tiedosto: 'Bimaristan Argun 03.jpg',
          selite: 'Yksi sisäpihoista: keskellä on kivireunainen suorakaiteen '
            + 'muotoinen vesiallas ja sen ympärillä istutettuja pensaita. '
            + 'Perällä avautuu holvattu sali, jonka kaari on ladottu '
            + 'vuorotellen vaaleasta ja mustasta kivestä, ja sen takaa '
            + 'nousee matala kupoli. Sivuilla kiertää kaarikäytävä '
            + 'pylväineen; vasemmalla varjossa istuu kaksi miestä, ja '
            + 'seinillä on opastetauluja.',
          lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Bimaristan Argun fountain.jpg',
          selite: 'Pienemmän pihan keskellä on kahdeksankulmainen kivinen '
            + 'allas, jonka keskeltä nousee metalliputken päässä '
            + 'maljamainen suihkulähde. Pihaa kiertää rivi kapeita '
            + 'oviaukkoja, jotka johtavat pieniin kammioihin, ja aukkojen '
            + 'yläpuolella on puolikupolimaisia syvennyksiä. Vasemmalla '
            + 'seinässä on vaalea opastelaatta.',
          lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Beit Ajiqbash': {
      aika: '1757',
      teksti: 'Jdeideh tarkoittaa uutta kaupunkia. Kortteli kasvoi Aleppon '
        + 'pohjoisen muurin ulkopuolelle mamelukkien ajan lopulla, ja '
        + 'siitä tuli kristittyjen kauppiassukujen alue; armenialaiset '
        + 'kävivät täältä kauppaa Persiaan ja Intiaan. Beit Ajiqbash '
        + 'valmistui kujien keskelle vuonna 1757; rakennuttaja oli '
        + 'varakas kauppias Qarah Ali. Talo ei silti kanna hänen nimeään: '
        + 'kun suku muutti Alexandrettaan, sen osti mies nimeltä '
        + 'Ashiqbash. Itälaidan huoneet purettiin myöhemmin, kun talon '
        + 'eteen vedettiin katu. Talossa toimii kansanperinteen museo.'
        + '\n\n'
        + 'Ydin on sisäpiha. Sitä kiertää kaksi kerrosta ikkunoita, ja '
        + 'aukkojen ylle on veistetty kiveen leveitä koristenauhoja ja '
        + 'pyöreitä ruusukkeita. Tyyli yhdistää mamelukkiaiheita ja '
        + 'rokokoota, ja siihen on luettu barokin vaikutus. Yhdeltä '
        + 'sivulta piha avautuu iwaniin: korkeaan holvisaliin, jonka '
        + 'neljäs seinä puuttuu kokonaan. Se on kesähuone. Iwania '
        + 'vastapäätä on qaa, talon vastaanottohuone, seinät puupaneelia.'
        + '\n\n'
        + 'Qaa on kahdessa tasossa, ja jako on arvojärjestys. Ovelta '
        + 'tullaan matalalle osalle, jossa kengät riisutaan. Varsinainen '
        + 'istumataso on noin puoli metriä ylempänä ja maton peitossa; '
        + 'sinne nousee vain kunniavieras, muut jäävät alas. Talousosat '
        + 'pidettiin erillään edustuspihasta: keittiöt, tallit, '
        + 'viljamakasiinit ja varastot sijoitettiin tontin laidoille, ja '
        + 'niihin tultiin korttelia kiertäviltä kujilta. Kadulle päin '
        + 'talo ei näytä mitään: kokoa ei arvaa ulkoa.',
      kuvat: [
        {
          tiedosto: 'Aleppo Beit Ajiqbash 9348.jpg',
          selite: 'Beit Ajiqbashin sisäpiha: kaksi kerrosta ikkunoita, ja '
            + 'niiden ylle on veistetty kiveen viuhkamaisia '
            + 'koristekenttiä, pitkiä kasviaiheisia nauhoja ja pyöreitä '
            + 'ruusukkeita. Vasemmalla on mustavalkoraidallinen kaariovi, '
            + 'pihalla kasvaa puita ja ruukkukasveja, oikealla näkyy '
            + 'kivinen allas, ja kattojen yllä kulkee antenni ja '
            + 'sähkölanka.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Aleppo Beit Ajiqbash 9363.jpg',
          selite: 'Pihan iwan eli holvisali, jonka koko etusivu on auki '
            + 'pihalle. Kaaren kivet ovat vuoroin vaaleita ja tummia, '
            + 'reunalla on puinen räystäs ja seinillä riippuu lyhtyjä. '
            + 'Salin edessä on mustavalkoinen ruutukuvioinen '
            + 'marmorilattia ja pihalla pyöreä suihkulähde '
            + 'vesisuihkuineen, ympärillä ruukkukasveja. Seinien pienet '
            + 'keltaiset kyltit ovat museon opasteita.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Damaskoksen nähtävyysjutut (nippu 2, 13.8.2026). Peli ei kerro
   * nykykonflikteista, joten kohteista kirjoitetaan rakennuksina ja
   * historiana; aikajana päättyy ensimmäiseen maailmansotaan.
   * Kulttuurivisa kertoo jo Hamidiyyan peltiholvin valopisteet ja
   * kaariteksti moskeijan temppeli–kirkko–moskeija-ketjun, joten
   * suukin ja moskeijan jutut on kulmattu toisin.
   */
  damaskos: {
    'Damaskoksen linnoitus': {
      teksti: 'Keskiaikainen linna rakennettiin yleensä kukkulalle. '
        + 'Damaskoksen linnoitus seisoo tasamaalla, samassa tasossa kuin '
        + 'muu kaupunki. Se on vanhankaupungin luoteiskulmassa, ja '
        + 'kaupunginmuuri liittyy siihen kiinni lounais- ja '
        + 'koillisnurkasta. Muoto on epätasainen suorakaide, 230 × 150 '
        + 'metriä, ja portteja on kolme: pohjoisessa, idässä ja lännessä.'
        + '\n\n'
        + 'Nykyinen rakennus on ajjubidien työtä. Saladinin veli al-Adil '
        + 'purki vanhemman linnoituksen ja rakensi tilalle suuremman '
        + 'vuosina 1203–1216. Syy oli uusi ase: vastapainoheittokone '
        + 'mursi paksunkin kivimuurin. Tornit tehtiin pyöreiden sijaan '
        + 'neliömäisiksi, ja niiden päälle tuli tasanteet omille '
        + 'heittokoneille, jotka korkealta kantoivat piirittäjän koneita '
        + 'kauemmas. Ruhtinaat velvoitettiin kukin kustantamaan yksi '
        + 'suurista torneista. Torneja oli 14; kaksi läntistä sortui '
        + 'vuoden 1759 maanjäristyksessä, joten pystyssä on 12. Niistä '
        + 'kymmenen on alkuperäisessä korkeudessaan, 15–25 metrissä. '
        + 'Eteläsivulla muuri on 11,5 metriä korkea ja 3,65–4,90 metriä '
        + 'paksu, ja sen sisällä kulkee holvattu käytävä '
        + 'ampuma-aukkoineen.'
        + '\n\n'
        + 'Muurien sisällä oli oma kaupunkinsa. Nur ad-Din asui '
        + 'linnoituksessa, rakensi sinne moskeijan ja suihkulähteen ja '
        + 'kuoli siellä vuonna 1174. Saladin kuoli samoissa tiloissa 1193 '
        + 'ja haudattiin ensin sen sisään; hauta siirrettiin myöhemmin '
        + 'Umaijadien moskeijan viereen. Al-Adilin seuraajat rakensivat '
        + 'pihalle asuintiloja, palatseja ja altaan.',
      kuvat: [
        {
          tiedosto: 'Damascus Citadel western wall right 7926.jpg',
          selite: 'Linnoituksen länsimuuri nousee suoraan kadun tasosta: '
            + 'oikealla kalkkikivinen muuri ampuma-aukkoineen, sen '
            + 'juurella pensasaita ja rautakaide, ja vasemmalla '
            + 'mustavalkoraidalliseksi kivetty kävelykatu, jolla kulkee '
            + 'ihmisiä. Kadun päässä näkyy Saladinin tumma '
            + 'ratsastajapatsas, vasemmalla kadunvarren kahvila ja '
            + 'liikennemerkkejä.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Damascus north-western tower of the Citadel 1410.jpg',
          selite: 'Luoteisnurkan torni alaviistosta pilvetöntä taivasta '
            + 'vasten: nurkka on suora kulma, kiviladonta karkeaa ja '
            + 'lohkopintaista, seinässä on kapeita ampuma-aukkoja, ja '
            + 'ylimpänä työntyy ulos kannatinkivien varaan muurattuja '
            + 'ulokkeita.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Umaijadien moskeija': {
      teksti: 'Moskeijan pohjakaava on suorakaide, 97 metriä kertaa 156. '
        + 'Eteläisen puoliskon täyttää rukoussali, 136 metriä pitkä ja 37 '
        + 'syvä; loput on avointa kivettyä pihaa. Pihaa kiertävässä '
        + 'kaarikäytävässä on kahden pylvään välissä aina yksi järeämpi '
        + 'pilari, mutta pohjoissivulla rivi katkeaa: se sortui vuoden '
        + '1759 maanjäristyksessä eikä pylväitä palautettu.'
        + '\n\n'
        + 'Pihan seinissä on mosaiikeista parhaiten säilynyt osa. Pohja '
        + 'on kultaa, aiheena maisema: leveä joki, puurivejä ja '
        + 'monikerroksisia pylväikkötaloja myöhäisroomalaiseen tapaan. '
        + 'Ihmis- ja eläinhahmoja ei ole yhtään. Laajin yhtenäinen kenttä '
        + 'on länsipuolen kaarikäytävässä, 34,5 metriä pitkä ja 7,3 '
        + 'korkea. Kultamosaiikkia oli moskeijassa alun perin arviolta 4 '
        + '000 neliömetriä. Maantieteilijä al-Muqaddasi kirjoitti '
        + '900-luvulla, ettei seiniltä puutu juuri yhtään puuta eikä '
        + 'mainittavaa kaupunkia.'
        + '\n\n'
        + 'Pihan länsipäässä seisoo kahdeksankulmainen pikkurakennus '
        + 'kahdeksan roomalaisen pylvään päällä: aarrekammio, jonka '
        + 'abbasidikuvernööri rakennutti vuosina 789–790 moskeijan '
        + 'varoille. Minareetteja on kolme, eikä yksikään muistuta '
        + 'toistaan. Pohjoisseinän Morsiamen minareetti on vanhin ja '
        + 'neliskulmainen, ja huipulle nousee 160 kiviporrasta. '
        + 'Kaakkoiskulman Isan minareetti on korkein, noin 77 metriä; sen '
        + 'runko on vuodelta 1247. Lounaiskulman minareetin rakennutti '
        + 'Qaitbay vuonna 1488, ja se on kahdeksankulmainen koko '
        + 'matkaltaan. Jokaisen kärjessä on puolikuu.',
      kuvat: [
        {
          tiedosto: 'Damascus east and south side of courtyard of Umayyad Mosque 8078.jpg',
          selite: 'Moskeijan piha idän ja etelän suuntaan: vasemmalla '
            + 'kaksikerroksinen kaarikäytävä ja sen edessä matala '
            + 'kupolipaviljonki pylväiden päällä, oikealla rukoussalin '
            + 'seinä ristikkoikkunoineen ja punaruskeine oviaukkoineen. '
            + 'Yläoikealla kohoaa kapea minareetti parvekkeineen. '
            + 'Keskellä seisoo kivipylväs, jonka päässä on kullattu '
            + 'ristikkopallo. Kiveyksellä kävelee ihmisiä pienissä '
            + 'ryhmissä, ja oikeassa alanurkassa pikkutyttö kurottautuu '
            + 'maahan.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Damascus Barada Panel of Umayyad Mosque 8130.jpg',
          selite: 'Pihan mosaiikkia lähietäisyydeltä: kultainen pohja, jota '
            + 'vasten kasvaa isolehtisiä puita, ja niiden alla '
            + 'pylväikköjä, kaarigallerioita ja pieniä kaksikerroksisia '
            + 'taloja. Alareunassa virtaa vihertävä joki, ja kenttää '
            + 'reunustavat ylhäältä ja alhaalta kukkakuvioiset '
            + 'mosaiikkinauhat. Yhtään ihmistä tai eläintä ei ole '
            + 'kuvattu.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'The Great Umayyed Mosque of Damascus, Syria, and Khazne (Treasury).jpg',
          selite: 'Aarrekammion kahdeksankulmainen runko alaviistosta: '
            + 'kultapohjaista mosaiikkia, jossa kiertyy vihreitä '
            + 'lehtiköynnöksiä ja maljakkoaiheita, ja vasemmassa reunassa '
            + 'pala talo- ja palmumaisemaa. Rakennus lepää roomalaisten '
            + 'pylväiden korinttilaisten kapiteelien päällä. Taustalla '
            + 'tummansinistä taivasta vasten nousee vaalea minareetti '
            + 'kaiteellisine parvekkeineen ja sipulinmuotoisine '
            + 'huippuineen.',
          lahde: 'James Gordon from Los Angeles, California, USA, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Hamidiyyan suuki': {
      teksti: 'Suuki alkaa vanhankaupungin länsilaidalta linnoituksen '
        + 'kupeelta ja kulkee suoraan itään. Kuja on noin 600 metriä '
        + 'pitkä ja 15 metriä leveä, ja sen yllä kaartuu kymmenen metrin '
        + 'korkuinen metalliholvi. Kuja noudattaa roomalaisen kadun '
        + 'akselia, joka vei Jupiterin temppelille. Itäpäässä kuja '
        + 'päättyy temppelin porttirakennelmaan, jonka pylväät ja kaari '
        + 'seisovat yhä kadun päässä. Niiden takana avautuu Umaijadien '
        + 'moskeijan aukio.'
        + '\n\n'
        + 'Roomalaiset alkoivat rakentaa temppeliä ensimmäisellä '
        + 'vuosisadalla jaa., ja portti on sen läntisen sisäänkäynnin '
        + 'säilynyt osa. Basaarikuja itse on paljon nuorempi ja '
        + 'ottomaanien aikaa. Se on nimetty sulttaani Abdülhamidin '
        + 'mukaan: rakentaminen alkoi noin vuonna 1780 Abdülhamid I:n '
        + 'kaudella ja jatkui Abdülhamid II:n aikana vuoteen 1884.'
        + '\n\n'
        + 'Suuki on Syyrian suurin, ja sen varrella on satoja '
        + 'vaatekauppoja sekä käsityö- ja korupuoteja, ruokakauppoja, '
        + 'ruokakojuja, kahviloita ja jäätelöbaareja. Orientalistit '
        + 'Albert Socin ja Immanuel Benzinger kuvasivat sen vuoden 1898 '
        + 'matkaoppaassaan uudeksi ja komeasti koristelluksi basaariksi '
        + 'ja panivat merkille makeiskauppiaat, joiden jäädykkeet olivat '
        + 'hyvin suosittuja.',
      kuvat: [
        {
          tiedosto: 'Damascus Propylaeum at west of Umayyad Mosque 1420.jpg',
          selite: 'Kujan itäpää: kauppakatu päättyy roomalaiseen '
            + 'porttikaareen, jonka läpi näkyy Umaijadien moskeijan '
            + 'sisäänkäynti värillisine viuhkaikkunoineen. Oikealla '
            + 'nousevat korinttilaiskapiteelein kruunatut kivipilarit, '
            + 'kaarella ja ilmassa on kymmeniä kyyhkyjä, ja vasemmalla '
            + 'varjostavat valkoiset kangaskatokset ja myyntikojut '
            + 'hopeanauhoineen. Väkijoukko kulkee kujaa pitkin kohti '
            + 'aukiota.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Ingang van suq Hamidieh, Bestanddeelnr 255-5877.jpg',
          selite: 'Suukin länsipää vuonna 1950 ylhäältä kuvattuna: holvin '
            + 'puoliympyräinen pääty kaareutuu sisäänkäynnin yllä, ja '
            + 'siihen on ripustettu suuria käsin maalattuja '
            + 'elokuvajulisteita arabiankielisin tekstein. Portista '
            + 'virtaa sisään ja ulos tiivis väkijoukko, vasemmalla on '
            + 'raidalliset markiisit ja kojuja, oikealla puinen '
            + 'sähköpylväs, kauppojen kylttejä ja seinää vasten nojaava '
            + 'polkupyörä.',
          lahde: 'Willem van de Poll, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Khan As\'ad Pashan': {
      aika: '1752',
      teksti: 'Pihaa ei jätetty auki taivaalle, vaan se katettiin. Kupoleja '
        + 'on kahdeksan, ja niiden keskellä on yksi suuri aukko, josta '
        + 'valo ja ilma pääsevät sisään. Kahdeksan kupolia noudattaa '
        + 'shiialaista perinnettä, ja keskiaukko muistuttaa persialaista '
        + 'rakennustapaa. Katto nostettiin korkealle, ja juuri korkeus '
        + 'pitää katetun pihan siedettävänä sekä kuumana kesänä että '
        + 'kylmänä talvena. Ottomaanien tapa koota rakennus '
        + 'kupoliyksiköistä yhdistyy tässä paikalliseen syyrialaiseen '
        + 'rakennustapaan.'
        + '\n\n'
        + 'Kiveys on ablaq: vaaleaa ja tummaa kiveä vuorotellen kerros '
        + 'kerrokselta. Syyrian eteläosassa mustaa basalttia ja valkoista '
        + 'kalkkikiveä on suunnilleen yhtä paljon, joten raidoista tuli '
        + 'damaskoslaisen kivityön tunnusmerkki. Tekniikan vanhin '
        + 'varmasti tunnettu käyttö on Damaskoksesta vuodelta 1109, ja '
        + 'samaa kuviointia on kaupungissa myös 1500-luvun Sulaymaniyyan '
        + 'takiyyassa ja Azm-palatsissa.'
        + '\n\n'
        + 'Khan on vanhankaupungin suurin: pinta-alaa 2 500 neliömetriä '
        + 'ja kaksi kerrosta. Rakennuttaja oli Damaskoksen kuvernööri '
        + 'As\'ad Pasha al-Azm, joka hallitsi kaupunkia vuosina 1743–1757. '
        + 'Työ alkoi 1751 ja valmistui 1752, kaksi vuotta hänen oman '
        + 'Azm-palatsinsa jälkeen. Rakennus on Buzuriyan kujan varrella, '
        + '152 metriä pitkällä mausteiden kadulla. Karavaanit tulivat '
        + 'Bagdadista, Mosulista, Alepposta ja Beirutista, ja huoneita '
        + 'vuokrattiin kaupungin merkittäville kauppiaille.',
      kuvat: [
        {
          tiedosto: 'Khan As\'ad Pasha Panorama.jpg',
          selite: 'Katettu piha holvikäytävän alta: etualalla massiivinen '
            + 'mustavalkoraidallinen nelikulmapilari, sen molemmin puolin '
            + 'kaksi suurta kupolia ikkunarenkaineen ja maalattuine '
            + 'medaljonkeineen, ja keskellä kirkkaanvalkoinen soikea '
            + 'aukko taivaalle. Ympärillä kiertää kaksi kerrosta '
            + 'kaariaukkoja ja puisia ristikkoparvekkeita, keskellä on '
            + 'kivinen suihkuallas vesisuihkuineen. Vasemmalla on matala '
            + 'musta esiintymislava, pihalla kolmijalkoja ja '
            + 'valonheittimiä, ja oikealla sekä altaan luona seisoo '
            + 'muutamia ihmisiä.',
          lahde: 'Bassel Khabbaz, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'A Dome in Khan As\'ad Pasha- قبة في خان أسعد باشا.jpg',
          selite: 'Yksi kupoleista suoraan alhaalta kuvattuna: kehä kehän '
            + 'perään maalattuja pisara- ja neliapilamedaljonkeja okran, '
            + 'harmaan ja violetin sävyissä. Kupolin juurta kiertää '
            + 'rengas ristikkoikkunoita, kulmissa näkyy mustavalkoinen '
            + 'ablaq-raidoitus, ja aivan keskellä on tumma pyöreä aukko, '
            + 'jonka takana erottuu vinoon ladottua puuritilää.',
          lahde: 'Hani Zaitoun, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Itäportti': {
      teksti: 'Bab Sharqi eli Itäportti on ainoa Damaskoksen roomalaisista '
        + 'porteista, joka seisoo yhä, ja ainoa kaupungin kahdeksasta '
        + 'portista, joka on säilyttänyt alkuperäisen kolmiaukkoisen '
        + 'muotonsa. Keskellä on leveä aukko, joka tehtiin karavaaneille '
        + 'ja pyörillä kulkevalle liikenteelle, ja sen kummallakin '
        + 'puolella on kapeampi aukko jalankulkijoille. Portti '
        + 'pystytettiin noin vuonna 200 jaa. Koristelua on vähän: '
        + 'muurista työntyy esiin pilastereita, ei juuri muuta.'
        + '\n\n'
        + 'Roomalaiset omistivat portin auringolle ja kutsuivat sitä '
        + 'Auringon portiksi. Sama koski muitakin: kullakin seitsemästä '
        + 'portista oli oma taivaankappaleensa. Bab Tumalla oli Venus, '
        + 'Bab Kisanilla Saturnus, Bab al-Saghirilla Jupiter, Bab '
        + 'al-Jabiyahilla Mars, Bab al-Faradisilla Merkurius ja Bab '
        + 'al-Salamilla Kuu. Kahdeksas portti, Bab al-Faraj, tehtiin '
        + 'vasta muslimivalloituksen jälkeen.'
        + '\n\n'
        + 'Portista alkaa suora katu, roomalaisen kaupungin decumanus, '
        + 'jota on yli 1 500 metriä. Linja on porttia vanhempi: katu '
        + 'vedettiin jo seleukidien aikaan, ja siitä oli määrä tulla '
        + 'aikansa pisin katu. Toisessa päässä on Bab al-Jabiyah, ja sama '
        + 'katu yhdistää portit yhä. Itäpuoliskoa sanotaan nykyään Bab '
        + 'Sharqin kaduksi ja läntistä Midhat Pashan kaduksi, jonka '
        + 'varrella on katettu basaari. Apostolien teoissa (9:11) Ananias '
        + 'käskettiin tälle kadulle etsimään Saul Tarsolaista. Nur ad-Din '
        + 'Zangi teetti porttiin muutoksia 1100-luvulla.',
      kuvat: [
        {
          tiedosto: 'Damascus Bab Sharqi (Eastern Gate) 8210.jpg',
          selite: 'Itäportti ulkoa: keskellä korkea holvikaari, jonka läpi '
            + 'näkyy puuerkkerinen talo ja tumma auto, ja sen kummallakin '
            + 'puolella matalampi kaari. Vasemmasta kulkee ulos '
            + 'koululaisryhmä, oikeanpuoleinen aukeaa vanhemman '
            + 'kivimuurin puolella. Portin takaa kohoaa valkoinen '
            + 'minareetti, ja edustalla on kiveys, pensasistutuksia ja '
            + 'rivi valkoisia kivipalloja.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'De Bab Sharqi (Oostpoort) in de stadsmuur van Damascus, Bestanddeelnr 255-5863.jpg',
          selite: 'Sama portti vuonna 1950: käytössä on yksi kaari, jonka '
            + 'läpi ihmiset kävelevät kapealle kujalle. Portin vierestä '
            + 'nousee vaalea nelikulmainen minareetti, jossa on puinen '
            + 'parveke ja kartiohuippu. Vasemmalla on suuri eukalyptus, '
            + 'oikealla puuparvekkeisia taloja ja antiikkiliikkeiden '
            + 'kyltit, ja kadunreunassa polkupyörä ja avoauto.',
          lahde: 'Willem van de Poll, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Kisanin portti': {
      teksti: 'Portti seisoo vanhankaupungin muurin kaakkoiskulmassa. Muurin '
        + 'kehä on 4,5 kilometriä ja se rajaa 86 hehtaaria. Muurin '
        + 'rakensivat roomalaiset, ja ajjubidit ja mamelukit vahvistivat '
        + 'sitä myöhemmin; vuoden 634 piirityksen kuvauksissa muuri on 11 '
        + 'metriä korkea. Julkisivu on ladottu suurista vaaleista '
        + 'kivilohkareista, ja kahden ulkonevan tornin väliin jäävä '
        + 'keskiosa on koristeltu hakatuin listoin ja pyörein '
        + 'kivimedaljongein.'
        + '\n\n'
        + 'Roomalaiset omistivat kunkin portin yhdelle '
        + 'taivaankappaleelle, ja Kisanin portti sai Saturnuksen. '
        + 'Porttien lukumäärässä on lähteiden välillä hajontaa: vuoden '
        + '634 piirityksestä kertovassa luettelossa niitä on kuusi. '
        + 'Nimensä Kisanin portti sai orjasta, joka tuli tunnetuksi '
        + 'kalifi Mu\'awiyan valloitusretkellä.'
        + '\n\n'
        + 'Kristillisen perinteen mukaan tästä kohdasta Paavali pakeni '
        + 'kaupungista: hänet laskettiin yöllä korissa muurin '
        + 'ikkuna-aukosta alas. Raamatun kohdat (Ap.t. 9:25 ja 2. Kor. '
        + '11:33) puhuvat ikkunasta, eivät portista, joten yhteys tähän '
        + 'porttiin on perimätietoa. Porttiaukko on muurattu umpeen ja '
        + 'rakennus otettiin Pyhän Paavalin kappeliksi: se vihittiin '
        + 'vuonna 1939, ja sen rakenteisiin ladottiin kiviä portista. '
        + 'Sisään käydään umpeen muuratun aukon alle tehdystä ovesta.',
      kuvat: [
        {
          tiedosto: 'Damascus-Bab Kisan.jpg',
          selite: 'Kisanin portti edestä: kaksi ulkonevaa kivitornia, joiden '
            + 'yläreunassa kulkee pienten kaarien muodostama lista ja '
            + 'pinnassa on punoskoristeinen pyöreä kivimedaljonki. '
            + 'Tornien välissä on umpeen muurattu suorakaiteen muotoinen '
            + 'aukko ja sen alla esiin työntyvä kivihylly, alempana '
            + 'koristereunainen pyöröholvi ja tumma puuovi. Muurissa '
            + 'näkyy kapeita pystyrakoja ja puolipallon muotoisia '
            + 'kivinystyjä. Edustalla on matala vaalea kaide '
            + 'kuviorei\'ityksin, rautaportti ja pensaita; vasemmalla '
            + 'pylväs ja tumma metalliveistos jalustalla, oikealla '
            + 'asuintaloja ja puita, alareunassa auton katto.',
          lahde: 'Heretiq, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Szent Pál kapuja és kápolnája.jpg',
          selite: 'Sama rakennus viistosti alaviistosta: kulmatornin '
            + 'lohkareet ovat eri kokoisia ja käsin hakattuja, ja saumat '
            + 'kulkevat epätasaisina rivistöinä. Oikealla nousee '
            + 'portaikko mustine kaiteineen holvatulle ovelle, jonka '
            + 'yläpuolella riippuu tummanpunainen viiri; portaiden '
            + 'vieressä on ruukkukasveja. Vasemmalla on jalustallaan '
            + 'tumma pronssiveistos ja sen edessä vaalea marmorinen '
            + 'pylväänkapiteeli, taustalla puita ja matala tummista '
            + 'kivistä ladottu muuri.',
          lahde: 'Kocsis Fülöp, Hajdúdorogi Főegyházmegye, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Luxorin nähtävyysjutut (nippu 2, 13.8.2026). Neljä kuudesta
   * kohteesta on Karnakin alueella, joten jutut on kulmattu eri
   * suuntiin: sfinksikuja kulkemiseen, Mut veteen ja patsassarjaan,
   * Khonsu temppelin kaavaan ja pylvässali valoon. Kulttuurivisa
   * kertoo jo salin 134 pylvästä, joten sitä lukua ei käytetä
   * kärkenä.
   */
  luxor: {
    'Luxorin temppeli': {
      teksti: 'Theban muut temppelit oli omistettu jumalalle tai kuolleelle '
        + 'kuninkaalle; tämä oli omistettu kuninkuudelle itselleen. '
        + 'Vuotuisessa Opet-juhlassa faarao kruunattiin täällä uudelleen '
        + 'ja hänen kuninkaallinen ka-voimansa uusittiin. '
        + 'Ensikruunauksista täällä ei ole varmuutta: kruunaus saattoi '
        + 'olla myös käsitteellinen. Aleksanteri Suuri ilmoitti tulleensa '
        + 'kruunatuksi Luxorissa, vaikkei hän ehkä käynyt Memfisiä '
        + 'etelämpänä.'
        + '\n\n'
        + 'Työ alkoi Amenhotep III:n aikana 1300-luvulla eaa. Häneltä on '
        + '100 metrin pituinen kulkukäytävä, jota reunustaa 14 '
        + 'papyruskukkapäistä pylvästä; seiniin on kuvattu Opet-juhlan '
        + 'vaiheet. Noin sata vuotta myöhemmin Ramses II rakensi '
        + 'sisäänkäynnin: 24 metriä korkean pylonin, jonka kiveen '
        + 'hakattiin hänen sotavoittonsa, etenkin Qadeshin taistelu. '
        + 'Portin edessä seisoi kuusi hänen kolossiaan, neljä istuvaa ja '
        + 'kaksi seisovaa; jäljellä on kaksi istuvaa.'
        + '\n\n'
        + 'Pylonin edessä seisoo 25 metriä korkea punagraniittiobeliski. '
        + 'Sen pari oli 23-metrinen, mutta se seisoi korkeammalla '
        + 'jalustalla ja kauempana pylonista, joten tulijalle ne '
        + 'näyttivät yhtä korkeilta. Matalampi vietiin Ranskaan '
        + '1830-luvulla ja seisoo nykyään Pariisissa; kuljetus maksoi 2,5 '
        + 'miljoonaa frangia, mikä lienee syy siihen, ettei toista '
        + 'haettu.',
      kuvat: [
        {
          tiedosto: 'Louksor (Thèbes), Construction Antérieure - Pylône Colosses et Obélisque MET DP144527.jpg',
          selite: 'Pylonin edusta 1850-luvun alussa. Vasemmalla seisoo '
            + 'hieroglyfien peittämä obeliski, jonka jalusta on hiekan '
            + 'alla; oikealla kohoavat pylonin kaksi tornia, joiden '
            + 'kiveen on hakattu ihmishahmoja ja joiden harjalla on '
            + 'ulkoneva kruunulista. Porttiaukon edestä pistää hiekasta '
            + 'esiin kahden istuvan kolossin kruunupää ja hartiat, muu '
            + 'patsas on maan alla. Tornien seinissä on suorakaiteen '
            + 'muotoisia aukkoja, portin vasen kylki on romahtanut, ja '
            + 'vasemmassa laidassa näkyy matalia savitiiliraunioita. '
            + 'Etuala on tyhjää hiekkaa.',
          lahde: 'Félix Teynard, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Louksor (Thèbes). Construction Centrale - Grande Colonnade MET DP71345.jpg',
          selite: 'Saman matkan kuva suuresta pylväskäytävästä: viisi järeää '
            + 'pylvästä nousee vinoon riviin, avonaiset '
            + 'papyruskukkakapiteelit ovat osin lohjenneet, ja niiden '
            + 'päällä lepäävät massiiviset kivipalkit. Pylväiden juuret '
            + 'ovat hiekkakinoksen peitossa, ja pylväiden välissä seisoo '
            + 'savitiilirakennus, jossa on pieni kaariaukko ja '
            + 'suorakaiteen muotoinen ovi. Alareunassa on painetut '
            + 'tekstit kuvaajasta ja kustantajasta sekä punainen '
            + 'kokoelmaleima.',
          lahde: 'Félix Teynard / Imprimerie photographique H. de Fonteny et Cie, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Luxorin museo': {
      aika: '1975',
      teksti: 'Museo avattiin 1975 Niilin itärannalle rantakadun varteen. '
        + 'Kaksikerroksisen talon piirsi Mahmud El Hakim jo 1962, ja '
        + 'esineet aseteltiin 1972–1975. Esillä on tarkoituksella paljon '
        + 'vähemmän kuin Kairon egyptiläisessä museossa: vähän esineitä, '
        + 'väljä ripustus ja monikieliset selitteet.'
        + '\n\n'
        + 'Vuonna 1989 Luxorin temppelin aurinkopihan alta kaivettiin 26 '
        + 'patsaan kätkö. Ne oli haudattu, kun roomalaiset muuttivat '
        + 'alueen sotilasleiriksi; ensimmäiset viisi löytyivät noin '
        + 'metrin syvyydestä. Joukossa oli Amenhotep III:n '
        + 'kvartsiittipatsas kaksoiskruunuineen, kelkka jalustanaan; '
        + 'korkeudeksi ilmoitetaan 2,49 metriä, osassa lähteitä 1,8. '
        + 'Kartušeista on hakattu pois yksi ainoa sana, Amunin nimi — '
        + 'Ekhnatonin jälki isänsä jumalaa vastaan. Samasta kätköstä tuli '
        + 'Thutmosis III alabasterisfinksinä.'
        + '\n\n'
        + 'Ekhnaton itse on museossa seinänä. Hänen Karnakiin '
        + 'rakennuttamansa Aten-temppelit purettiin, ja vakiokokoiset '
        + 'talatat-lohkot — 27 × 27 × 54 senttiä, puoli kertaa puoli '
        + 'kertaa yksi kyynärä — muurattiin pyloonien täytteeksi. '
        + 'Yhdeksännestä pyloonista saadut kivet on tunnistettu ja koottu '
        + 'takaisin seinäksi kuin palapeli. Muumioita on kaksi, esillä '
        + 'maaliskuusta 2004: Ahmose I, joka löytyi 1881 Deir el-Bahrin '
        + 'kätköstä, ja Ramses I, joka seisoi yli 130 vuotta Niagara '
        + 'Fallsin museossa nimellä Egyptin ruhtinas. Emoryn yliopiston '
        + 'museo osti sen 1999 ja palautti Egyptiin 2003. Kummankaan '
        + 'tunnistusta ei pidetä varmana.',
      kuvat: [
        {
          tiedosto: 'Luxor Museum 1.JPG',
          selite: 'Museo rantakadun toiselta puolelta: matala punaruskea '
            + 'seinä ilman ikkunoita, vain kapeita pystyrakoja rivissä. '
            + 'Aidatulla nurmikolla seisoo kaksi tummaa kivipatsasta, '
            + 'edessä palmuja ja lehdetön puu, oikealla tyhjä valkoinen '
            + 'opastetaulu pylväässä. Muutama ihminen kävelee pihalla, ja '
            + 'etualalla on kukkaistutuksia ja tyhjä asfalttitie '
            + 'pilvettömän taivaan alla.',
          lahde: 'Charlesdrakew at English Wikipedia, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'Luxor Museum Amenophis III. Statue 05.jpg',
          selite: 'Amenhotep III:n patsas yksin salissa: punertavaa '
            + 'kvartsiittia, päässä kaksoiskruunu, leuassa seremoniaparta '
            + 'ja takana kaareva selkäpilari kartušeineen. Jalusta lepää '
            + 'kelkalla, jonka jalakset työntyvät edessä esiin. Seinä on '
            + 'paljas, ja siihen on kaiverrettu vasemmalle AMENHOTEP III, '
            + 'XVIII. DYN., 1405–1367 B.C. ja oikealle sama arabiaksi. '
            + 'Katossa palaa kaksi kohdevaloa, lattia on vaaleaa kiveä ja '
            + 'porrastuu matalina tasoina.',
          lahde: 'Olaf Tausch, Wikimedia Commons (CC BY 3.0)',
        },
        {
          tiedosto: 'Luxor Museum Relief Talatat 06.jpg',
          selite: 'Talatat-seinä koottuna: pieniä suorakaiteen muotoisia '
            + 'kivilohkoja riveissä vaalealla taustalla kuin tiilimuuri. '
            + 'Kuvat kulkevat vyöhykkeittäin — ylimpänä nautoja ja '
            + 'uhrikasoja, alempana valkoisiin lannevaatteisiin puettuja '
            + 'miehiä kantotankoineen ja työhön kumartuneina, välissä '
            + 'hieroglyfipaneeleja. Ihon punaruskeaa maalia on paikoin '
            + 'jäljellä. Riveissä on suuria aukkoja, ja alimmat rivit '
            + 'ovat sirpaleisia: yksittäisiä lohkoja seisoo erillään '
            + 'tyhjän kohdan keskellä.',
          lahde: 'Olaf Tausch, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sfinksikuja': {
      teksti: 'Kuja kulkee suorana 2,7 kilometriä Luxorin temppelin ja '
        + 'Karnakin välillä, ja sen molemmin puolin seisoi 1 057 '
        + 'kivipatsasta: 807 sfinksiä ja 250 pässinpäistä. Muotoja on '
        + 'kolme. Karnakin ja Mutin alueen välisellä noin 300 metrin '
        + 'pätkällä patsailla on leijonan ruumis ja pässin pää; ne ovat '
        + 'Tutankhamonin ajalta. Toinen laji on kokonainen pässipatsas, '
        + 'joka veistettiin 18. dynastian aikana Amenhotep III:lle '
        + 'muualla ja siirrettiin Karnakiin myöhemmin. Suurin ryhmä on '
        + 'ihmispäinen sfinksi, ja niitä riittää runsaan puolentoista '
        + 'kilometrin matkalle Luxorin temppelille asti.'
        + '\n\n'
        + 'Tien rakennutti Amenhotep III, ja lopullisen asunsa se sai '
        + 'Nektanebo I:n aikana (380–362 eaa.). Egyptiläinen nimi oli '
        + 'wi.t ntr, jumalan tie, ja käyttöä oli yksi: Opet-juhla. '
        + 'Amon-Ren, Mutin ja Khonsun kuvat kannettiin pyhissä veneissä '
        + 'pappien harteilla Karnakista Luxorin temppeliin ja takaisin, '
        + 'ja kujan varrella oli kuusi pysäkkikappelia veneiden '
        + 'laskupaikoiksi. Juhla piteni hallitsijasta toiseen: Thutmosis '
        + 'III:n aikana se kesti 11 päivää, Ramses III:n kuollessa 27.'
        + '\n\n'
        + 'Kuja hautautui vuosisatojen mittaan hiekan alle, ja Georges '
        + 'Daressy kirjoitti 1893, ettei Luxorin päätä voi kaivaa, koska '
        + 'tie makaa pohjaveden pinnan alapuolella. Ensimmäiset patsaat '
        + 'löytyivät sieltä silti vuonna 1949, ja vuosina 1984–2000 koko '
        + 'linja kaivettiin auki. Kuja avattiin kulkijoille marraskuussa '
        + '2021.',
      kuvat: [
        {
          tiedosto: 'Luxor Temple Avenue of Sphinxes (9794899133).jpg',
          selite: 'Kuja Luxorin temppelin päästä katsottuna: vaalea kivetty '
            + 'väylä kulkee suorana kohti taivaanrantaa, ja molemmin '
            + 'puolin seisoo ihmispäisiä sfinksejä matalilla suorakaiteen '
            + 'muotoisilla jalustoilla. Jalustojen edessä on pieniä '
            + 'maavalaisimia, kujan reunoilla soraa ja hiekkaa. Taustalla '
            + 'on palmurivejä, matalia okranvärisiä taloja ja kapea '
            + 'minareetti. Kujan keskellä kävelee yksi ihminen '
            + 'oranssinpunaisessa asussa, ja taivas on pilvetön.',
          lahde: 'Gary Todd from Xinzheng, China, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Theban region, Temple Complex of Amon in Karnak, 19th century pictures, 1870-1888, photo 2 of 91 - Archivio fotografico Museo Egizio, Turin INV08 005.jpg',
          selite: 'Ruskeasävyinen valokuva Karnakin pässinpäisistä '
            + 'sfinkseistä: rivi patsaita korkeilla kivijalustoilla, ja '
            + 'etualan suurimman leuan alla seisoo pieni kuninkaanhahmo. '
            + 'Keskellä kuvaa seisoo jalustan vieressä mies tummassa '
            + 'kaavussa ja valkoisessa päähineessä. Edustalla on '
            + 'irtolohkareita ja kivimurskaa, takana kuivamuuri ja tiheä '
            + 'palmulehto. Paperissa näkyy taitteita ja yläreunassa kaksi '
            + 'neulanreikää.',
          lahde: 'Antonio Beato, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Karnak (Thèbes), Sphinx a Tête Humaine et a Tête de Bélier, en Y MET DP71386.jpg',
          selite: 'Kaksi kujan patsasta maahan vajonneina: etualalla '
            + 'pässinpäinen sfinksi, jonka leuan alla on pieni seisova '
            + 'hahmo, ja sen takana ihmispäinen sfinksi '
            + 'nemes-päähineessään hartioita myöten mullassa. Oikeassa '
            + 'reunassa erottuu kolmas kivinen ruumis. Ympärillä nousee '
            + 'tupsuheinän ja pensaiden peittämä rinne, ja taivas on '
            + 'tyhjä ja vaalea. Alareunan marginaalissa on painetut '
            + 'tekstit ja pieni pyöreä leima.',
          lahde: 'Félix Teynard / Imprimerie photographique H. de Fonteny et Cie, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Mutin temppeli': {
      teksti: 'Karnakin eteläinen osa on Mutin pyhäkköalue, noin 325 metriä '
        + 'Amonin alueesta etelään. Sen tunnistaa vedestä: temppeliä '
        + 'kiertää kolmelta sivulta pitkä kaareva allas, Isheru. '
        + 'Sellainen kuului nimenomaan leijonapäisten jumalattarien '
        + 'pyhäköihin: temppelin teksteissä jumalat kaivoivat sen '
        + 'viilentämään Mutin tulista luonnetta. Muurien sisällä on noin '
        + 'yhdeksän hehtaaria ja ainakin kuusi temppeliä.'
        + '\n\n'
        + 'Alueelta on kaivettu satoja mustasta granodioriitista '
        + 'veistettyjä Sekhmet-patsaita, osa istuvina valtaistuimella, '
        + 'osa seisovina papyrussauva kädessä. Luvut vaihtelevat: yhden '
        + 'arvion mukaan patsaita oli alueella aikanaan noin 570, toisen '
        + 'mukaan temppelin pihalta löytyi kuusisataa. Sarjan teetti '
        + 'Amenhotep III, ja osa kappaleista saattaa olla peräisin hänen '
        + 'muistotemppelistään länsirannalta. British Museumissa niitä on '
        + 'kolmekymmentä, Kairon museossa kuusi.'
        + '\n\n'
        + 'Vanhimmat päivätyt kartussit ovat 18. dynastian Thutmosis II:n '
        + 'ja III:n, ja osa niistä on ilmeisesti kirjoitettu Hatshepsutin '
        + 'poistetun nimen päälle. Ramses III:n rakentama temppeli C '
        + 'purettiin 25. dynastian aikana louhokseksi, kun viereistä '
        + 'temppeli A:ta korjattiin. Kushin kuningas Taharqa (690–664 '
        + 'eaa.) lisäsi hiekkakiviportin, ja tiilinen ympärysmuuri on 30. '
        + 'dynastialta. Ensimmäisen ison kaivauksen teki Margaret Benson, '
        + 'joka sai 1895 ensimmäisenä naisena kaivausluvan Egyptissä.',
      kuvat: [
        {
          tiedosto: 'Egipto, 1882 "Las Estatuas on cabeza de Leon en Karnak" (21683939911).jpg',
          selite: 'Mutin alueen pyhä allas vuoden 1882 kirjan värilehdellä: '
            + 'vihertävä vesi kaartuu etualalla, ja sen oikealla rannalla '
            + 'istuu rivi tummia leijonapäisiä patsaita punertavien '
            + 'kivilohkareiden seassa. Vasemmalla rannassa makaa kaatunut '
            + 'patsas puoliksi hiekan peitossa, keskellä kohoaa '
            + 'taatelipalmu ja rannalla seisoo valkoinen kahlaajalintu. '
            + 'Taustalla on vihreää peltoa ja autiomaan pöytävuoria. '
            + 'Kuvan alla on espanjankielinen kuvateksti ja kustantajan '
            + 'nimi, vasemmassa alakulmassa signeeraus C. Werner.',
          lahde: 'Fondo Antiguo de la Biblioteca de la Universidad de Sevilla from Sevilla, España, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Ruines du temple de Mout - A3167.jpg',
          selite: 'Mutin temppelin raunioalue vuoden 1914 autokromilevyllä: '
            + 'etualalla on kaatuneita hiekkakivilohkareita ja matalia '
            + 'muurinjäännöksiä, ja niiden seassa seisoo päättömiä '
            + 'patsastorsoja. Oikealla kulkee hiekkainen polku, jolla '
            + 'seisoo kaksi miestä, toinen tummassa kaavussa ja '
            + 'valkoisessa turbaanissa, toinen vaaleassa galabiyassa. '
            + 'Takana on kuiva kumpu, savitiilimuuri ja tiheä palmulehto. '
            + 'Lasilevyn kehys näkyy kuvan reunoilla, ja vasemmassa '
            + 'reunassa on käsin kirjoitettu merkintä EGYPTE A 3167.',
          lahde: 'Léon Auguste, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Khonsun temppeli': {
      teksti: 'Karnakin lounaisnurkassa seisoo temppeli, joka on säilynyt '
        + 'lähes kokonaisena: siitä näkee egyptiläisen temppelin koko '
        + 'kaavan. Osat ovat peräkkäin yhdellä akselilla — kaksitorninen '
        + 'pyloni, avoin pylväspiha, katettu pylvässali, sivukappelit ja '
        + 'perimmäisenä pyhäkkö. Pylvässali on pieni, ja perimmäinen '
        + 'pyhäkkö pidettiin pimeänä. Kivi on hiekkakiveä ja graniittia — '
        + 'kalkkikivitemppelit purettiin melkein kaikki kalkinpolttoon.'
        + '\n\n'
        + 'Rakennuttaja oli Ramses III (n. 1186–1155 tai 1185–1154 eaa., '
        + 'lähteen mukaan), ja temppeli nousi vanhemman rakennuksen '
        + 'paikalle. Pylvässalista löytyi kaksi paviaanipatsasta Seti I:n '
        + 'ajalta (1294/1290–1279 eaa.), ilmeisesti vanhemmasta talosta. '
        + 'Salin pystytys ajoitetaan toisaalla vasta Nektanebo I:lle '
        + '(379/378–361/360 eaa.). Ramses IV (1154–1148 eaa.) jatkoi '
        + 'työtä, ja rakentamisen hiipuessa Thebassa myöhemmätkin '
        + 'kuninkaat keskittyivät tähän. Pihan seinään Amonin ylipappi '
        + 'Herihor (1080–1074 eaa.) kirjoitutti nimensä kuninkaan '
        + 'kartussiin, vaikka faaraona istui yhä Ramses XI.'
        + '\n\n'
        + 'Edessä seisoo Ptolemaios III Euergeteen (hallitsi 246–222 '
        + 'eaa.) rakennuttama suuri portti, sfinksikujan pohjoispää. Sama '
        + 'kuningas teetti myös ympärysmuurin, jota ei ole enää pystyssä. '
        + 'Kiveä kierrätettiin: seinissä on lohkareita, joiden kuviot '
        + 'eivät jatku naapurikiveen tai ovat ylösalaisin — ainesta '
        + 'otettiin ympäröivistä rakennuksista, etenkin ptolemaiosten '
        + 'aikana.',
      kuvat: [
        {
          tiedosto: 'Théodule Devéria (French - (Portal of the Temple of Khonsu, Karnak) - Google Art Project.jpg',
          selite: 'Euergetes-portti edestäpäin noin vuonna 1860. Ovenpielet '
            + 'on jaettu ruutuihin, joissa kuningas seisoo jumalten '
            + 'edessä, ja päällä on siivekäs aurinkokiekko ja uurrettu '
            + 'kourulista. Portin takaa nousevat molemmin puolin Khonsun '
            + 'temppelin pylonin viistot tornit, ja niiden välissä '
            + 'erottuu temppelin oma matala oviaukko. Oikealla makaa '
            + 'hiekkaan puoliksi hautautunut sfinksi ja kauempana kohoaa '
            + 'matala raunioseinä aukkoineen; vasemmalla on romahtanutta '
            + 'muuria ja irtolohkareita.',
          lahde: 'Théodule Devéria, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'Karnak Tempel Chons 06.jpg',
          selite: 'Pylväspiha sisältä pylonia kohti. Keskellä on oviaukko, '
            + 'jonka pielet ovat muuta seinää vaaleammat, ja käytävän '
            + 'päässä näkyy toinen kehys hahmoineen ja sen takana puu, '
            + 'metallinen kaide ja aurinkoinen aukio. Oviaukon yllä '
            + 'kulkee kourulista, jonka keskellä on siivekäs '
            + 'aurinkokiekko, ja sen yläpuolelle kohoavat pylonin kaksi '
            + 'tornia, kummassakin neliömäinen aukko. Kummallakin sivulla '
            + 'seisoo pylväsrivi kattopalkkeineen, ja oikeanpuoleisissa '
            + 'pylväissä ja palkissa on maalit yhä jäljellä.',
          lahde: 'Olaf Tausch, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Karnakin suuri pylvässali': {
      teksti: 'Sali on 5 000 neliömetriä, ja katto lepäsi kahdenlaisten '
        + 'pylväiden varassa. Keskikäytävän kaksitoista pylvästä tehtiin '
        + 'muita korkeammiksi ja paksummiksi: korkeudeksi ilmoitetaan '
        + 'lähteestä riippuen 21 tai 24 metriä ja ympärysmitaksi kymmenen '
        + 'metriä. Muut 122 jäivät 10 tai 14 metriin. Korkeusero '
        + 'täytettiin seinällä, ja siihen hakattiin ikkunat, joiden eteen '
        + 'jätettiin kivestä veistetyt pystyritilät. Muualta katto oli '
        + 'umpinainen, joten päivänvalo putosi saliin vain keskikäytävän '
        + 'yläpuolelta.'
        + '\n\n'
        + 'Sama jako näkyy pylväiden päissä: keskikäytävän kapiteelit '
        + 'ovat auenneen papyruksen kukkia, leveitä ja kellonmuotoisia, '
        + 'ja sivujen pylväissä kukka on yhä suljettu nuppu. Sali on '
        + '1200-luvulla eaa. hallinneiden Seti I:n ja Ramses II:n työtä. '
        + 'Seti I rakennutti koko salin ja kaiverrutti pohjoispuolen; '
        + 'eteläpuoli ja keskikäytävän kaksitoista suurta pylvästä '
        + 'koristeltiin Ramses II:lle. Tekniikka vaihtuu kesken: Seti I:n '
        + 'kuvat ovat kohokuvia, joissa hahmot nousevat pinnasta, ja '
        + 'Ramses II:n kaivertajat aloittivat samoin mutta siirtyivät '
        + 'uponneeseen reliefiin, joka on hakattu pintaa syvemmälle.'
        + '\n\n'
        + 'Sali pysyi käytössä 300-luvulle jaa., kunnes pakanuus '
        + 'Egyptissä hiipui. Vuonna 1899 yksitoista suurta pylvästä '
        + 'kaatui ketjureaktiona, kun pohjavesi oli syönyt niiden '
        + 'perustukset. Georges Legrain johti pystytystyön, joka '
        + 'valmistui toukokuussa 1902.',
      kuvat: [
        {
          tiedosto: 'Karnak (Thèbes), Palais - Salle Hypostyle - Fenêtre et Chapiteaux des Galeries Latérales MET DP71376.jpg',
          selite: 'Félix Teynardin valokuva vuosilta 1851–52 sivulaivan '
            + 'yläpuolelle nousevasta ikkunaseinästä. Seinässä on kolme '
            + 'suorakaiteen muotoista aukkoa, ja keskimmäisessä on yhä '
            + 'paikallaan pystysuorista kivipuikoista veistetty ritilä. '
            + 'Aukkojen pielet ja niiden yllä kulkeva palkki ovat täynnä '
            + 'hieroglyfejä, ja seinän alaosa on lohjennut. Kuvan '
            + 'alalaidassa näkyy rivi sivulaivan pylväitä, joiden '
            + 'nupinmuotoisiin kapiteeleihin on kaiverrettu kartusseja; '
            + 'keskellä on pyöreä punainen leima ja aivan alareunassa '
            + 'painetut kustantajan rivit.',
          lahde: 'Félix Teynard / Imprimerie photographique H. de Fonteny et Cie, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Hall of columns, Karnac, RP-F-F25403-AG.jpg',
          selite: 'Francis Frithin valokuva vuodelta 1857. Pylväitä katsotaan '
            + 'kaatuneiden kivilohkareiden täyttämältä maalta: yläpäät '
            + 'ovat murtuneet, muutamassa on yhä leveä kapiteeli, ja '
            + 'vasemmalla lepää järeitä kivipalkkeja pilarien päällä. '
            + 'Alhaalla keskellä seisoo kaksi pitkiin viittoihin '
            + 'pukeutunutta miestä lohkareiden seassa, oikealla on '
            + 'suorakaiteen muotoinen oviaukko, ja kuvan alakulmiin on '
            + 'merkitty valokuvaajan nimi ja vuosiluku.',
          lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Riadin nähtävyysjutut (nippu 2, 13.8.2026). Kohteet on valittu
   * sen mukaan, mistä on englanninkielinen lähde: Souq al-Zal, Qasr
   * al-Hukm, Thumairin portti ja Deeran aukio palauttavat 404, eikä
   * Riad-artikkeli mainitse niitä. Punaisen palatsin ja vesitornin
   * jutut ovat kuvattomia, koska Commonsissa ei ole niistä yhtään
   * kuvaa, joka täyttäisi lisenssi- ja kokovaatimukset — ks. raportti.
   */
  riad: {
    'Masmakin linnoitus': {
      aika: '1902',
      teksti: 'Linnoitus on savitiiltä ja savilaastia, ja perustus on ladottu '
        + 'kivilohkareista. Rakennus jakautuu kuuteen osaan: portti, '
        + 'moskeija, majlis, kaivo, tornit ja sisäpiha. Nurkissa on neljä '
        + 'tornia, kukin noin 18 metriä korkea, ja niiden seinät ovat '
        + '1,25 metriä paksut; ylös noustaan tornin sisäisiä portaita. '
        + 'Muodosta lähteet ovat eri mieltä: tornit kuvataan joko '
        + 'kartiomaisiksi tai sylinterimäisiksi. Kaivo ei ole pihan '
        + 'keskellä vaan koillisnurkassa. Pihaa kiertävät pylväshuoneet, '
        + 'ja itäsivun portaat vievät yläkertaan ja katoille. Asuintiloja '
        + 'on kolme: hallitsijan oma, valtionkassa bayt al-mal ja '
        + 'vierasmaja.'
        + '\n\n'
        + 'Pääportti on länsimuurissa. Ovi on 3,6 metriä korkea, 2,65 '
        + 'leveä ja kymmenen senttiä paksu, ja se on tehty palmupuusta. '
        + 'Keskellä on aukko nimeltä al-Khokha, juuri yhden ihmisen '
        + 'kokoinen. Se on puolustusrakenne: väki kulkee sisään ja ulos '
        + 'ilman että porttia avataan.'
        + '\n\n'
        + 'Työ alkoi 1865 ja valmistui 1895. 13. tammikuuta 1902 '
        + 'Abdulaziz ibn Saud palasi Kuwaitin maanpaosta ja otti Masmakin '
        + 'yöllisessä iskussa; Riadin päällikkö Ajlan bin Mohammed '
        + 'kaatui. Joukon kooksi kerrotaan noin 40 miestä, mutta luku on '
        + 'epävarma: neljäkymmentä on beduiinien tapa sanoa pieni joukko. '
        + 'Muualla luvut ovat 68 hyökkääjää ja 80 puolustajaa, kaatuneita '
        + '7 ja 30. Linnoitus oli asevarastona vuoteen 1938, ja 1995 se '
        + 'avattiin museona yleisölle.',
      kuvat: [
        {
          tiedosto: 'Masmak Fortress (6329473680).jpg',
          selite: 'Linnoituksen pääjulkisivu aukiolta palmujen välistä: sileä '
            + 'savimuuri, jossa kulkee rivi pieniä nelikulmaisia aukkoja, '
            + 'ja sen kummassakin päässä ylöspäin kapeneva pyöreä '
            + 'nurkkatorni kolmiohampaisine harjoineen. Muurin takaa '
            + 'kohoaa matalampi nelikulmainen torni, ja sen vieressä '
            + 'liehuu vihreä lippu. Portin yläpuolella työntyy seinästä '
            + 'kolme pyöreäpäistä ulkonemaa, joiden alapinnassa on reikä, '
            + 'ja muurista pistää esiin puisia parruja. Syvennyksessä on '
            + 'tumma kaksilehtinen puuovi naulanpäineen ja kaiverrettuine '
            + 'alapaneeleineen, ja sen eteen nousee tiili- ja '
            + 'kiviportaita. Aukiolla on lohkareita, ovelle on pysähtynyt '
            + 'oranssipaitainen kävijä valokuvaamaan, ja reunoilla näkyy '
            + 'kerrostaloja.',
          lahde: 'Sammy Six, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Masmak Citadel, Riyadh (14372839641).jpg',
          selite: 'Sisäpihan reunakäytävä alaviistosta: keskellä avoin '
            + 'taivas, ympärillä valkoiseksi rapattuja nelikulmaisia '
            + 'pilareita porrastettuine kannatinpäineen. Kattona on '
            + 'tiiviisti vierekkäin ladottuja pyöreitä puunrunkoja, ja '
            + 'pihalle työntyy savipinnan läpi kaksi järeää parrua. '
            + 'Seinät ovat savipintaisia, takaseinässä on '
            + 'kolmionmuotoisia syvennyksiä ja tumma oviaukko, ja '
            + 'katonrajassa palaa museon kohdevaloja.',
          lahde: 'Rick McCharles from Calgary, Canada, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Imam Turkin suurmoskeija': {
      teksti: 'Turki bin Abdullah otti Riadin 1824 ja teki siitä toisen '
        + 'Saudi-valtion pääkaupungin. Suurmoskeija rakennettiin hänen '
        + 'aikanaan vuosina 1826–1830, hallintopalatsi Qasr al-Hukmin '
        + 'viereen. Turki surmattiin vuonna 1834 perjantairukouksesta '
        + 'lähtiessään, ja moskeija kantaa yhä hänen nimeään.'
        + '\n\n'
        + 'Nykyinen moskeija on vuodelta 1992, ja se avattiin tammikuussa '
        + '1993. Samoihin vuosiin osui koko Qasr al-Hukmin korttelin '
        + 'uudistus, jonka työt kestivät 1983–1992. Sisätilaa on 16 800 '
        + 'neliömetriä ja rukoilijoita mahtuu 17 000; se on yksi maan '
        + 'suurimmista moskeijoista. Ulkoseinät ja sisätilan yläosa ovat '
        + 'ruskeaa riadilaista kalkkikiveä, alaosa valkoista marmoria. '
        + 'Miesten ja naisten kirjastot ovat kumpikin 325 neliömetriä.'
        + '\n\n'
        + 'Tyyli on modernia najdilaista: Najdissa seinä on perinteisesti '
        + 'savitiiltä ja hyvin paksu, tässä sama muotokieli on toteutettu '
        + 'kalkkikivestä. Minareetteja on kaksi; ne olivat ennen osmani- '
        + 'ja egyptiläistyylin sekoitus ja ovat nyt suorakulmaisia koko '
        + 'matkaltaan. Moskeija on Deeran aukion laidalla vastapäätä Qasr '
        + 'al-Hukmia, ja rakennukset yhdistää ensimmäisestä kerroksesta '
        + 'kaksi katettua siltaa as-Safaatin aukion yli. Arkkitehti Rasem '
        + 'Badran sai työstä Aga Khan -arkkitehtuuripalkinnon 1995.',
      kuvat: [
        {
          tiedosto: 'Deera Square and Imam Turki bin Abdullah Mosque (1).jpg',
          selite: 'Moskeija Deeran aukion laidalta heinäkuussa 2024: pitkä '
            + 'kalkkikiviseinä, jossa on pieniä neliöikkunoita ja niiden '
            + 'yläpuolella kolmion muotoisia tummia aukkoja, alhaalla '
            + 'rivi syviä oviaukkoja tummine puuristikkoineen. Vasemmalla '
            + 'nousee suorakulmainen minareetti, jonka huipussa on '
            + 'hammasmainen harja, ja taempana keskellä toinen '
            + 'samanlainen; seinän harjalla on valonheittimiä ja '
            + 'kaiuttimia. Vasemmassa laidassa on palmuja ja '
            + 'pylväskäytävä, oikealla toinen kivitalo, jonka katolla on '
            + 'antennimastoja ja seinässä arabiankielinen kyltti. Aukio '
            + 'on tyhjä ja kivetty vaalealla laatalla, johon on ladottu '
            + 'tummia suoria kuvioita; kaksi valkoisiin pukeutunutta '
            + 'ihmistä kävelee seinustalla.',
          lahde: 'Radosław Botev, Wikimedia Commons (CC BY 3.0 pl)',
        },
        {
          tiedosto: 'Qasr Al Hukm Palace, 2022.jpg',
          selite: 'Aukion vastakkainen laita joulukuussa 2022: '
            + 'hallintopalatsi Qasr al-Hukm, jonka kalkkikiviseinän '
            + 'harjassa on hammasmainen sahalaita ja seinässä pieniä '
            + 'kolmioaukkoja. Keskeltä työntyy ulos ylempi kerros, jossa '
            + 'on kaksi suurta tummaa aukkoa, ja oikealla on pylväiden '
            + 'kannattama katos ja sen yläpuolella vaalea ulkoneva '
            + 'palkkirakenne. Palmurivi kulkee seinustalla, aukiolla '
            + 'liikkuu ihmisiä, lapsi potkulaudalla ja valkoinen '
            + 'maastoauto, ja kiveystä reunustavat metalliaidat.',
          lahde: 'Geektaker, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Punainen palatsi': {
      teksti: 'Vuonna 1943 Saud bin Abdulazizin kaksikerroksinen '
        + 'savitiilipalatsi Murabban palatsin vieressä syttyi palamaan. '
        + 'Saud ja perhe saatiin ulos, palanut talo purettiin, ja '
        + 'tontille nousi myöhemmin al-Yamamahin koulu. Samana vuonna '
        + 'kuningas Abdulaziz teetti pojalleen uuden palatsin. Talo '
        + 'valmistui 1948, ja siitä tuli lähteen mukaan Saudi-Arabian '
        + 'ensimmäinen teräsbetonirakennus.'
        + '\n\n'
        + 'Esikuva oli kaukaa: Saud oli vieraillut 1940 Intian '
        + 'Hyderabadissa ja ihastunut brittiläisen residenssin '
        + 'rakennukseen niin, että halusi omansa samanlaisen. Virallinen '
        + 'nimi on al-Hamra, mutta talo tunnetaan paremmin nimellä '
        + 'al-Qasr al-Ahmar, Punainen palatsi; molemmat sanat '
        + 'tarkoittavat arabiaksi punaista. Saud asui talossa '
        + 'valmistumisesta alkaen, ja kun isä kuoli 1953 ja hänestä tuli '
        + 'kuningas, se oli myös hänen työpaikkansa. Vuonna 1956 hän '
        + 'muutti teettämäänsä al-Nassiriyan palatsiin.'
        + '\n\n'
        + 'Vuodesta 1956 talo oli ministerineuvoston päätoimipaikka aina '
        + 'vuoteen 1988. Valtiovieraita otettiin vastaan vuosina '
        + '1948–1988: muun muassa Iranin shaahi, Jordanian kuningas '
        + 'Talal, Egyptin Nasser ja Intian pääministeri Nehru. Neuvoston '
        + 'muuton jälkeen rakennus siirtyi valituslautakunnalle, ja 1999 '
        + 'se liitettiin kuningas Abdulazizin historialliseen keskukseen. '
        + 'Kun lautakuntakin muutti 2002, talo jäi tyhjilleen; yleisölle '
        + 'se avattiin ensimmäisen kerran maaliskuussa 2019.',
      kuvat: [
      ],
      lahde: 'Wikipedia',
    },
    'Riadin vesitorni': {
      aika: '1971',
      teksti: 'Torni on 61 metriä korkea betonirakennelma: leveä säiliö lepää '
        + 'rungon päällä kuin lakki. Säiliöitä on kaksi. Suurempaan '
        + 'mahtuu 12 000 kuutiometriä vettä, ja täytenä vedenpinta on 51 '
        + 'metrin korkeudella maasta. Pienempi vetää 350 kuutiometriä ja '
        + 'on varattu poikkeukselliseen vesipulaan.'
        + '\n\n'
        + 'Kaupungilla ei 1960- ja 1970-luvulla ollut vesijohtoverkkoa, '
        + 'joka olisi riittänyt asukkaille. Maatalousministeriö antoi '
        + 'tehtävän vuonna 1969 ruotsalaiselle arkkitehdille Sune '
        + 'Lindströmille, joka työskenteli tukholmalaisessa '
        + 'Vattenbyggnadsbyrån-toimistossa. Esikuva on Örebrossa: '
        + '58-metrinen Svampen, jonka nimi tarkoittaa ruotsiksi sientä ja '
        + 'jonka Lindström suunnitteli 1958. Työ alkoi 1969, ja torni '
        + 'valmistui 1971 palvelemaan al-Malazzin, Manfuhahin ja '
        + 'Shumaisin kaupunginosia.'
        + '\n\n'
        + 'Valmistuessaan torni oli Saudi-Arabian korkein rakennelma ja '
        + 'pysyi sellaisena vuoteen 1982, jolloin 170-metrinen Riadin '
        + 'televisiotorni ohitti sen. Paikallinen nimi on Burj '
        + 'al-Khazzaan, säiliötorni, ja sen mukaan on nimetty kaupungin '
        + 'Khazan-katu. Torni maalattiin uudelleen 1997, kun vuoden 1902 '
        + 'Riadin valtauksen satavuotispäivä lähestyi.',
      kuvat: [
      ],
      lahde: 'Wikipedia',
    },
    'Murabban palatsi': {
      teksti: 'Nimi tarkoittaa arabiaksi neliötä, ja neliö on mitta: muurin '
        + 'ympäröimä alue on 400 metriä kertaa 400 eli runsaat 16 '
        + 'hehtaaria, ja myöhemmin se laajeni 30 hehtaariin. '
        + 'Palatsirakennuksen pinta-alaksi on 2021 esitetty 9 845 '
        + 'neliömetriä. Savitiilimuurissa on yhdeksän porttia. Pääportti '
        + 'oli aluksi lännessä, mutta myöhemmin käytettiin eteläistä: '
        + 'sieltä oli lyhyt matka moskeijalle. Pihan ympärillä on '
        + 'asuintiloja, huoltotiloja ja kuninkaan diwan. Kerroksia on '
        + 'kaksi ja huoneita 32: alakerrassa varastot, vartiointi ja '
        + 'hallinto, yläkerrassa vastaanottosali, toimistot ja '
        + 'vierashuoneet.'
        + '\n\n'
        + 'Rakentaminen alkoi 1936, osa valmistui 1938 ja koko palatsi '
        + 'vasta 1945; työtä johti rakennusmestari Ibn Qabba. Seinät ovat '
        + 'oljella lujitettua savitiiltä, ja pinnassa on kaiverrettuja '
        + 'kuvioita. Katossa on akaasiaa ja palmunlehtimattoja, ja '
        + 'kattopalkkeihin on maalattu keltaisia, punaisia ja mustia '
        + 'geometrisia kuvioita.'
        + '\n\n'
        + 'Talo toi kaupunkiin kolme uutuutta: auton, generaattorisähkön '
        + 'ja vesivessat viemäreineen. Keskustaan vedettiin betonitie. '
        + 'Vuonna 1939 Aramcon asentajat lisäsivät valaistuksen, '
        + 'tuulettimet ja keskitetyn vesijohdon. 1940-luvun lopulla '
        + 'asennettiin maan ensimmäinen hissi, koska kuninkaan nivelrikko '
        + 'vaikeutti portaita. Abdulaziz siirsi hovinsa Masmakin '
        + 'linnoituksesta tänne 1938 ja asui täällä kuolemaansa 1953. '
        + 'Vuodesta 1999 palatsi on ollut museo osana Kuningas '
        + 'Abdulazizin historiallista keskusta.',
      kuvat: [
        {
          tiedosto: 'Murabba Palace (1).jpg',
          selite: 'Palatsialueen savitiilimuuri kulmasta katsottuna: pinnassa '
            + 'kulkee pystysuora harjattu kuviointi ja harjalla on '
            + 'valkoiseksi maalattu kolmiohampainen reunus. Muurin takaa '
            + 'nousee savitiilinen rakennus, jossa on kaari-ikkuna ja '
            + 'samanlainen hampainen harja, sen vieressä kohoaa palmu ja '
            + 'vasemmalla näkyy minareetin huippu. Etualalla on kivetty '
            + 'kuja varjoineen, oikealla pilarikäytävä ja pensaita, ja '
            + 'taivas on pilvetön.',
          lahde: 'Radosław Botev, Wikimedia Commons (CC BY 3.0 pl)',
        },
        {
          tiedosto: 'Murabba Palace7.jpg',
          selite: 'Palatsin sali museokäytössä: pyöreät pylväät on maalattu '
            + 'marmorikuvioisiksi ja niiden päissä on koristellut '
            + 'kapiteelit. Katto on vaaleanvihreä, ja siitä riippuu '
            + 'kupulamppuja ja kattotuulettimia. Seinien vierillä '
            + 'kiertävät matalat istuinpenkit punakuvioisin patjoin ja '
            + 'tyynyin, ikkunoissa on punaiset verhot ja vihreät karmit, '
            + 'ja lattian peittää tummakuvioinen kokolattiamatto. '
            + 'Oikeassa reunassa näkyy ilmastointilaite ja puinen kaappi.',
          lahde: 'saudipics, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Saudi-Arabian kansallismuseo': {
      aika: '1999',
      teksti: 'Museo avattiin 23. tammikuuta 1999 osaksi Kuningas Abdulazizin '
        + 'historiallista keskusta, noin 360 000 neliömetrin aluetta '
        + 'Murabban kaupunginosassa. Päivä ei ollut museon valinta: alue '
        + 'rakennettiin satavuotisjuhliin, joissa muistettiin Riadin '
        + 'valtausta 1902, ja suunnitteluun ja rakentamiseen jäi 26 '
        + 'kuukautta. Talon piirsi kanadalainen Raymond Moriyama. '
        + 'Esikuvana olivat Riadin ulkopuolisten Punaisten hiekkojen '
        + 'dyynit: Murabban aukion puoleinen länsijulkisivu myötäilee '
        + 'dyynin loivaa kaarta, ja pohjakaava kaartuu puolikuuksi, jonka '
        + 'kärki osoittaa Mekkaan.'
        + '\n\n'
        + 'Näyttely kulkee kahdeksassa salissa, kolme pohjakerroksessa ja '
        + 'viisi ylhäällä. Ensimmäisenä on rautameteoriitti Rub al-Khalin '
        + 'Wabarin kraattereista; painoksi ilmoitetaan 2,2 tonnia, museon '
        + 'omassa kyltissä 2,75. Samassa salissa ovat kalaliskon ja '
        + 'Platybelodonin luurangot; jälkimmäinen oli norsun sukulainen, '
        + 'jonka alaleuka päättyi leveään lapioon. Seuraava sali käy läpi '
        + '14 islamia edeltänyttä valtakuntaa.'
        + '\n\n'
        + 'Ripustus ei nojaa yksittäisiin aarteisiin: kopioita ja '
        + 'luonnollisen kokoisia lavastuksia on niin paljon, että '
        + 'alkuperäisen ja jäljennöksen erottaa paikoin vaivoin. '
        + 'Profeetan tehtävä -salista seuraavaan kuljetaan siltaa pitkin, '
        + 'jotta siirtymä islamia edeltäneestä ajasta sen jälkeiseen '
        + 'tulee kävellyksi. Sarja päättyy hajjiin ja kahteen pyhään '
        + 'moskeijaan; kahdeksan salin lisäksi talossa on kaksi tilaa '
        + 'vaihtuville näyttelyille.',
      kuvat: [
        {
          tiedosto: 'National Museum Riyadh (6781666263).jpg',
          selite: 'Museon sisäänkäynti illalla: valonheittimet nostavat '
            + 'hiekankeltaisen kiviverhouksen esiin mustaa taivasta '
            + 'vasten. Vasemmalla seinä kapenee teräväksi kärjeksi kuin '
            + 'veneen keula, keskellä kaartuu katos lasiseinäisen aulan '
            + 'yllä, ja oikealla julkisivussa on rivi ristikkoisia '
            + 'ikkunasäleikköjä. Lasin takaa näkyy aulan '
            + 'pystybanderolleja ja ruukkukasveja, edessä kävelee kaksi '
            + 'ihmistä, ja vasemmassa reunassa on puu.',
          lahde: 'Sammy Six, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'National Museum of Saudi Arabia 01.jpg',
          selite: 'Rautameteoriitti graniittijalustalla: tumma, kuoppainen ja '
            + 'paikoin kiiltävä möhkäle on aikuisen ihmisen levyinen ja '
            + 'rinnan korkuinen. Jalustan kyltissä lukee arabiaksi ja '
            + 'englanniksi ”Meteorite: Found in the Empty Quarter (2.75 '
            + 'tons)”. Takana on tekokallio, johon on kirjoitettu salin '
            + 'nimi MAN AND THE UNIVERSE arabiaksi ja englanniksi, ja sen '
            + 'vieressä on selitetaulu. Vasemmalla kaksi naista ja lapsi '
            + 'katsovat kalliota, oikealla mies valkoisessa asussa ja '
            + 'punavalkoisessa päähineessä kävelee ohi puhelin kädessä.',
          lahde: 'Gryffindor, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'National Museum of Saudi Arabia 02.jpg',
          selite: 'Ihminen ja maailmankaikkeus -sali: tekokalliolla seisoo '
            + 'norsun kokoinen luuranko, jonka päästä työntyvät eteenpäin '
            + 'suorat syöksyhampaat ja pitkä alaleuka. Vasemmalla '
            + 'vaalealla kaarevalla seinällä on kalaliskon luuranko '
            + 'laattaan asetettuna ja sen alla selitekyltti. Etualalla '
            + 'mies valkoisessa asussa ja kolme lasta katsovat vinoa '
            + 'lattiavitriiniä; katto on musta ja siinä näkyvät '
            + 'valoraiteet ja putkisto.',
          lahde: 'Gryffindor, Wikimedia Commons (CC0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
  /*
   * Tabrizin nähtävyysjutut (nippu 2, 13.8.2026). Kuusi kohdetta
   * jakautuu kahteen ryhmään kartalla: basaari ja perustuslakitalo
   * pohjoisessa, Arg, Saat-torni, museo ja Sininen moskeija samalla
   * itä-länsi-linjalla etelässä. Kolme vanhinta kohdetta ovat kaikki
   * tiilirakennuksia, joten kulmat on tietoisesti eriytetty: basaari
   * kertoo valosta ja ilmanvaihdosta, Arg kattamisen mitoista ja
   * Sininen moskeija laattatekniikasta.
   */
  tabriz: {
    'Tabrizin basaari': {
      teksti: 'Isfahanissa ja Teheranissa basaari kasvaa yhden pitkän '
        + 'kauppakadun varteen, josta sivukadut haarautuvat. Tabrizissa '
        + 'kaava on toinen: laaja suorakaiteen muotoinen alue, jonka läpi '
        + 'kulkee ruudukko rinnakkaisia ja risteäviä kauppakatuja. Katuja '
        + 'reunustavat yksi- ja kaksikerroksiset rakennukset, joissa on '
        + 'myymälätilat. Katot ovat tiiliholveja, ja holveihin on '
        + 'puhkaistu aukkoja: niistä tulee valo sisään ja ilma vaihtuu. '
        + 'Aluetta on noin 29 hehtaaria.'
        + '\n\n'
        + 'Alue jakautuu riveihin, ja monella rivillä on oma tavaransa ja '
        + 'oma nimensä. Amirin rivillä myydään kultaa ja koruja, '
        + 'Mozaffariyehissa mattoja lajiteltuina solmun koon ja tyypin '
        + 'mukaan, Bashmakhchissa kenkiä ja Rahlissa maan antimia.'
        + '\n\n'
        + 'Mozaffariyeh on timcheh eli pienoisbasaari suuren sisällä. '
        + 'Nimen alkuosa tim viittaa karavaaniseraajiin ja -cheh on '
        + 'deminutiivipääte: pieni karavaaniseraaji. Timchehin toinen pää '
        + 'liittyy pääkujaan ja toinen avautuu lastauspihaan tai '
        + 'karavaaniseraajiin, jonka nimen loppuosa saray tarkoittaa '
        + 'pihan ympärille rakennettua taloa. Keskellä on allas, sen '
        + 'ympärillä kahdessa tai kolmessa kerroksessa kauppiaiden '
        + 'huoneita, ja katossa usein suuri keskikupoli, jota koristavat '
        + 'laatat, stukko ja puuleikkaukset. Pohjamuoto voi olla neliö, '
        + 'suorakaide, ympyrä, soikio, kuusi- tai kahdeksankulmio, ja '
        + 'rakennusaine useimmiten tiili.',
      kuvat: [
        {
          tiedosto: 'Mozaffariyeh, Grand Bazzar of Tabriz, IRAN.jpg',
          selite: 'Mozaffariyehin holvikäytävä sisältä: tiilikaton kupolien '
            + 'laella on monikulmainen valoaukko ja niiden kylkiin on '
            + 'puhkaistu kaari-ikkunoita, tiilet on ladottu '
            + 'kalanruotokuvioon ja holvin harjat maalattu valkoisiksi. '
            + 'Molemmin puolin nousee kaksi kerrosta myymälöitä, joiden '
            + 'ovet ja ikkunat ovat valkoiseksi maalattua lasitettua '
            + 'puuta; yläkerran kaiteet ovat valkoista viuhkakuvioista '
            + 'metallia, ja seinillä on mustia lampetteja ja '
            + 'ilmastointilaitteita. Katosta riippuu ketjuissa '
            + 'pallolamppuja. Käytävän keskellä kasvaa ruukussa vihreä '
            + 'pensas, lattialla on vaaleaan kankaaseen käärittyjä '
            + 'kääröjä ja vasemmalla kuviollinen pino, muutama mies istuu '
            + 'ja seisoo käytävällä, ja perällä on tumma oviaukko ja sen '
            + 'yllä musta kyltti.',
          lahde: 'Navid Alizadeh Sadighi, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: '1241.JewelryBazaar.Tabriz (1470548513).jpg',
          selite: 'Kultasepänrivi tiiliholvin alla: käytävän molemmin puolin '
            + 'on lasivitriinejä, joiden kehyksissä palaa punainen '
            + 'neonputki ja joissa riippuu telineissä kultaketjuja ja '
            + '-koruja. Käytävä on täynnä ihmisiä, suurin osa miehiä, '
            + 'mukana valkohuivinen nainen ja mustaan chadoriin '
            + 'pukeutunut nainen; etualalla kävelee vastaan raidallisessa '
            + 'paidassa oleva mies. Vitriinien takana seisoo myyjiä, '
            + 'holvin alla roikkuu kaapeleita ja pyöreä valkoinen lamppu, '
            + 'ja seinillä on ilmastointilaitteita.',
          lahde: 'Ensie & Matthias from San Diego, California, USA, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Perustuslakitalo': {
      aika: '1868',
      teksti: 'Talon rakennutti vuonna 1868 Haj Mehdi Koozekonani, Tabrizin '
        + 'basaarin kauppias; rakentajaksi mainitaan Haj Vali Me’mar-e '
        + 'Tabrizi. Se on tavallinen qajar-kauden asuintalo aivan '
        + 'basaarin kyljessä: kaksi kerrosta ja tyylin mukaan erilliset '
        + 'sisä- ja ulko-osat.'
        + '\n\n'
        + 'Perustuslakivallankumous alkoi 1905 ja päättyi 1911, ja Tabriz '
        + 'oli sen keskuksia. Mozaffar ad-Din Shah antoi 5. elokuuta 1906 '
        + 'julistuksen, joka teki maasta perustuslaillisen monarkian, ja '
        + 'allekirjoitti perustuslain vähän ennen kuolemaansa; teksti on '
        + 'päivätty 30. joulukuuta 1906. Koozekonani liittyi liikkeeseen '
        + 'ja oli sen suurimpia rahoittajia; aikalaiset kutsuivat häntä '
        + 'nimellä Abolmele, kansan isä. Talossa kokoontuivat liikkeen '
        + 'johtajat, aktivistit ja kannattajat, heidän joukossaan Sattar '
        + 'Khan ja Bagher Khan, ja samassa talossa painettiin liikkeen '
        + 'maanalaisia lehtiä.'
        + '\n\n'
        + 'Talo merkittiin Iranin kulttuuriperintöluetteloon 1975. '
        + 'Museossa on esillä vallankumouksellisten veistoksia ja heidän '
        + 'henkilökohtaisia tavaroitaan: aseita, maanalaisia lehtiä ja '
        + 'shabnameja eli yökirjeitä, nimettömiä lentolehtisiä, joita '
        + 'jaettiin salaa. Esillä on myös painokone, jolla lehdet talossa '
        + 'tehtiin, sekä joukko vallankumouksen aikaisia valokuvia.',
      kuvat: [
        {
          tiedosto: 'ConstitutionHouseTabrizIran.jpg',
          selite: 'Talon sisäpihan julkisivu pilvettömän taivaan alla: '
            + 'ylhäällä viisi kaarta, joiden reunassa on turkoosia '
            + 'laattaa, ja kaaret lepäävät hoikkien pyöreiden pylväiden '
            + 'varassa, joissa on tummat lehtikoristeiset kapiteelit. '
            + 'Kaarten takana on yhtenäinen ikkunaseinä: alhaalla '
            + 'pieniruutuisia kaari-ikkunoita puukehyksissä, niiden '
            + 'yläpuolella viuhkakuvioisia puuristikoita. Pylväiden '
            + 'välissä on takorautakaiteet ja oikealla erillinen '
            + 'kaari-ikkuna valkoisine verhoineen. Alakerta on vaaleaa '
            + 'tiiltä kuvioituine muurauksineen ja kaarisyvennyksineen; '
            + 'siellä seisoo kaksi kullattua miespatsasta ja puiset '
            + 'kaksoisovet. Pihalla kukkii ruusupensaita, oikealla on '
            + 'musta tykki puolapyörillä, vasemmassa alanurkassa näkyy '
            + 'turkoosin altaan reuna ja polulla kulkee kävijöitä.',
          lahde: 'AmirAK, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Mashrute5.jpg',
          selite: 'Näkymä yläkerran ikkunasta pihalle: ylin ruutu on '
            + 'värillistä lasia, punaista, vihreää, sinistä ja valkoista '
            + 'mustien lyijylankojen välissä kukkakuviona, ja sen alla '
            + 'ovat kirkasruutuiset kaari-ikkunat, joiden kaarenkulmissa '
            + 'on punaista lasia. Lasin takana avautuu tiilinen sisäpiha: '
            + 'seinissä matalia kaarisyvennyksiä, puuovi, nuori puu, '
            + 'kukkapenkkejä ja turkoosi suorakaiteen muotoinen allas. '
            + 'Keskellä kuvaa nousee vaalea rapattu pylväs, karmiin on '
            + 'liimattu pieniä valkoisia paperilappuja, ja koko aukkoa '
            + 'kehystää tumma veistetty puu.',
          lahde: 'Amir.fila, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Constitution House, interior1.jpg',
          selite: 'Kattoikkuna alhaalta katsottuna: valkoiseksi rapattu '
            + 'neliön muotoinen kuilu, jonka pohjassa on puinen ristikko. '
            + 'Keskellä on ympyrä neliön sisällä, ja ympyrän täyttää '
            + 'tiheä kiemurteleva kuviointi, jonka keskipisteessä on '
            + 'pieni säteittäinen ruusuke; ristikon takaa näkyy '
            + 'tummansinistä ja vaaleaa lasia. Kuilun sivut on lasitettu '
            + 'pienillä ruuduilla, joista tulee päivänvalo. Kuvan '
            + 'neljässä nurkassa on valkoinen pyöreä pylväs, jonka '
            + 'kapiteeli on koristeltu kipsisin akantuslehdin, ja muu '
            + 'katto on paljasta ruskeahkoa rappausta.',
          lahde: 'Meisam, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Arg': {
      teksti: 'Arg ei ole linnoitus vaan moskeijan jäänne. Ilkhanidien '
        + 'vesiiri Ali Shah rakennutti paikalle 1310–1320 suuren '
        + 'rukoushuoneen; arkkitehti oli Falaki Tabrizi. Ylpeydenaihe oli '
        + 'holvi: sen piti olla suurempi kuin Ktesifonin Taq Kasra. '
        + 'Iwanin tynnyriholvi oli 30,5 metriä leveä ja 48 metriä syvä, '
        + 'portilta mihrabille kertyi 65,5 metriä, ja holvin laki nousi '
        + 'yli 45,7 metriin — 21,7 metriä 24 metriä korkean jalustan '
        + 'yläpuolelle. Taq Kasran halli on noin 37 metriä korkea ja 26 '
        + 'leveä.'
        + '\n\n'
        + 'Holvi sortui kesken rakennustyön, ja työ pysähtyi. Syyksi '
        + 'kerrotaan vaikeus kattaa näin suuri tila ilman pilareita; '
        + 'samaan aikaan kaupungin käskynhaltija kuoli äkillisesti, ja '
        + 'mausoleumi jäi kesken. Samalta 24 metrin jalustalta nousi '
        + 'kaksi minareettia vielä 35,4 metriä eli 61 metriin; kumpaakaan '
        + 'ei ole jäljellä. Marmoripihaa oli 286 × 229 metriä, ja '
        + 'keskellä oli kahdeksankulmainen allas, jossa neljä '
        + 'kivileijonaa syöksi vettä. Maanjäristys vaurioitti rakennusta '
        + 'pahoin helmikuussa 1641.'
        + '\n\n'
        + '1800-luvulla, Iranin ja Venäjän välien kiristyessä, jäänteestä '
        + 'tehtiin varuskunta: tykkivalimo, kasarmi, esikunta ja pieni '
        + 'palatsi. Nimi Arg tarkoittaa linnaketta. 1900-luvulla '
        + 'sotilasrakennukset purettiin ja ympäristöstä tehtiin puisto. '
        + 'Tarkoitus oli paljastaa alkuperäinen rakennus, mutta mukana '
        + 'meni vanhaakin: pystyssä on enää pala qiblamuuria, jossa on '
        + 'mihrab ja sen yllä kolme keventävää kaarta.',
      kuvat: [
        {
          tiedosto: 'Arg Alishah4.JPG',
          selite: 'Jäänne kokonaisuudessaan: leveä tiiliseinämä, jonka läpi '
            + 'on kaksi korkeaa suippokaarista aukkoa, ja niiden välissä '
            + 'koko korkeuden nouseva pyöreä muuripaksunnos. Yläreunaa '
            + 'kiertää metallikaide, ja takana kohoaa korkeampi lohko, '
            + 'jonka päällä on koppi ja mastoja; ylhäällä kulkee rivi '
            + 'pieniä kaarisyvennyksiä. Tiilipinnassa on vaaleita '
            + 'rappauksen jäänteitä, pitkiä halkeamia ja pieniä reikiä. '
            + 'Vasemman aukon täyttävät telineet ja metalliportaat, '
            + 'oikeasta näkyy läpi kaupunkia, kaukaisia kukkuloita ja '
            + 'ihmisiä. Edessä on kivetty käytävä, kuivaa nurmea ja '
            + 'pensaita, oikeassa laidassa pylväsjulkisivuinen '
            + 'nykyrakennus.',
          lahde: 'Elmju, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Arg of Tabriz 01.jpg',
          selite: 'Lähikuva muurista: vasemmalla korkea suippokaarinen aukko, '
            + 'josta näkyy nykyinen Tabriz — tiilitalo kaarevine '
            + 'ikkunoineen, betonipintaisia rakennuksia, puu, '
            + 'viuhkakuvioisin ritilöin varustettu aita, valkoisia '
            + 'työmaa-aitoja ja auto. Oikealla seinässä on umpinainen '
            + 'suippokaarinen syvennys. Tiilipinnassa on tiheässä pieniä '
            + 'neliömäisiä reikiä ja vaaleita paikkauksia. Muurin '
            + 'juurella on kivetty taso, jolla seisoo rivi mustia '
            + 'valonheittimiä, ja sen alla matala tiilireunus.',
          lahde: 'Valen1988, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Saat-torni': {
      aika: '1934',
      teksti: 'Sa\'at tarkoittaa persiaksi kelloa, ja nimi tulee tornin '
        + 'yläosan nelitauluisesta kellosta: kellot lyövät tasatunnein. '
        + 'Kellotorni on 30,5 metriä korkea, ja se nousee keskeltä taloa, '
        + 'joka valmistui vuonna 1934 Tabrizin kaupungintaloksi. '
        + 'Julkisivu on veistettyä kiveä. Piirtäjäksi mainitaan Avedis '
        + 'Ohanjanian, rakennuttajaksi tuolloinen pormestari Arfa al-Molk '
        + 'Jalili.'
        + '\n\n'
        + 'Talossa on sali, kellotorni ja pieni puutarha. Alaa on noin 9 '
        + '600 neliömetriä ja rakennettua alaa 6 500 neliömetriä kolmessa '
        + 'kerroksessa. Ylhäältä katsottuna pohjakaava muistuttaa '
        + 'lentävää kotkaa, ja muoto vastaa Saksassa ennen toista '
        + 'maailmansotaa rakennettujen talojen esimerkkiä.'
        + '\n\n'
        + 'Tornin alkuperäinen soittokello vaurioitui toisen '
        + 'maailmansodan aikaisessa venäläisten hyökkäyksessä Tabriziin, '
        + 'ja tilalle asennettiin uusi. Osa talosta otettiin '
        + 'kaupunginmuseoksi 2000-luvun alussa, ja museon aloitusvuodeksi '
        + 'ilmoitetaan myös 2007; esillä on muun muassa Tabrizin '
        + 'kultainen avain. Iranilaisen uudenvuoden alkaessa 20. '
        + 'maaliskuuta tornin taakse katetaan suuri haft sin -pöytä.',
      kuvat: [
        {
          tiedosto: 'Saat Tower (16722122147).jpg',
          selite: 'Talon pääjulkisivu edestä: keskeltä kohoaa kellotorni, '
            + 'jonka kapeat kaari-ikkunat on ladottu pystyriveiksi ja '
            + 'jonka yläosassa on vaalea kellotaulu roomalaisine '
            + 'numeroineen. Tornin harjalla on hammaskaide ja neljä '
            + 'nurkkatornia, keskellä matala vaalea kattokupu ja sen '
            + 'päällä lipputanko lippuineen. Kellotaulun alapuolella on '
            + 'parveke, jonka valkoisessa kaiteessa on maljakkoaiheiset '
            + 'pylväät, ja pääoven yläpuolella kaari-ikkuna säteittäisine '
            + 'ruoduineen. Molemmin puolin jatkuu kaksikerroksinen '
            + 'kiviseinä, ja vasemmalla katonharjalla seisoo tumma laite '
            + 'ohuine mastoineen. Edessä kasvaa havupuita ja lehdettömiä '
            + 'puita, alareunassa kävelee pari ihmistä, ja taivas on '
            + 'sininen hajanaisine valkoisine pilvineen.',
          lahde: 'Frode Ramone from Oslo, Norway, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Saat Tower 2016-12.jpg',
          selite: 'Porrastasanne talon sisällä: kaarevalla valkoisella '
            + 'seinällä on kolme korkeaa kaari-ikkunaa, joiden lasit ovat '
            + 'punaisia ja vihreitä — ylhäällä pyörän muotoinen ruusuke, '
            + 'alempana pystyraidat kirkkaiden ruutujen välissä. Katosta '
            + 'riippuu ketjussa tumma kristallikruunu. Etualalla kaartuu '
            + 'kaide, jossa on vaaleita sorvattuja pylväitä ja tumma '
            + 'puinen käsijohde, ja sen keskellä seisoo iso kivimaljakko '
            + 'jalustalla. Kaiteen takaa laskeutuvat portaat alempaan '
            + 'tilaan, jossa kasvaa köynnöksiä; lattia on tummaa kirjavaa '
            + 'kiveä.',
          lahde: 'AmirAK, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Azerbaidžanin museo': {
      aika: '1958',
      teksti: 'Museo avattiin huhtikuussa 1958 Sinisen moskeijan viereen. Sen '
        + 'piirsi ranskalainen André Godard (1881–1965), joka johti '
        + 'Iranin arkeologista tutkimuslaitosta vuosina 1928–1953 ja '
        + 'uudelleen 1956–1960 ja suunnitteli Teheranin kansallismuseon. '
        + 'Talossa on kolme näyttelysalia, sivupiha, toimistohuoneita ja '
        + 'kirjasto, jossa on yli 2 500 käsin kirjoitettua ja painettua '
        + 'kirjaa historiasta, arkeologiasta, taiteesta ja Iranin '
        + 'kulttuurista.'
        + '\n\n'
        + 'Ensimmäinen sali etenee aikajärjestyksessä: vanhimmat löydöt '
        + 'ovat 5. vuosituhannelta eaa., sitten seuraavat Urartu, '
        + 'akhaimenidien valtakunta ja lopuksi sasanidikausi 224–651 jaa. '
        + 'Toinen sali on kahtia: toisessa päässä islamilaisen ajan '
        + 'arkeologiaa, toisessa kolikot ja sinetit. Kolmannessa on '
        + 'tabrizilaisen Ahad Hosseinin (s. 1944) veistoksia. Hosseini '
        + 'opiskeli Firenzen taideakatemiassa, teki paluunsa jälkeen '
        + 'viisi vuotta kellarissaan kaksitoista veistosta — sarjan '
        + 'Misery Around the World — ja lahjoitti ne museolle.'
        + '\n\n'
        + 'Esineet on enimmäkseen kaivettu Iranin Azerbaidžanista, mutta '
        + 'kokoelmassa on löytöjä koko maasta: sasanidikauden '
        + 'hopealautasia ja lasia, akaattisinettejä, 1200-luvun '
        + 'keramiikkaa Gorganista ja marmoriin kaiverrettu '
        + 'bismillah-kalligrafia vuodelta 1845. Museo on Luoteis-Iranin '
        + 'vanhin. Toukokuun 7. päivänä 2013 kokoelmasta vietiin viisi '
        + 'sasanidikauden hopealautasta; varkaat pidätettiin saman vuoden '
        + 'marraskuussa, mutta lautasia ei saatu takaisin.',
      kuvat: [
        {
          tiedosto: 'Azerbaijan Museum, Tabriz, Iran, and stone lions in entrance.jpg',
          selite: 'Museon julkisivu vaaleanruskeaa tiiltä: koko etusivun '
            + 'levyinen syvä kaarisyvennys, jonka takaseinässä on '
            + 'korkealla suippokaarinen ikkuna puuritilöineen ja sen alla '
            + 'pienempi suippokaariportti. Portin puisessa kaarikentässä '
            + 'on museon nimi persialaisin kirjaimin ja sen alla '
            + 'AZARBAIJAN MUSEUM latinalaisin; alakulmissa on pientä '
            + 'tekstiä ja vuosiluku. Kaksilehtisestä puuovesta toinen '
            + 'puolisko on auki ja sisällä näkyy hämärää salia. Oven '
            + 'kummallakin puolella seisoo matalalla jalustalla kulunut '
            + 'vaalea kivieläin. Ovelle nousee kiviportaat, vasemmalla '
            + 'seinässä on valvontakamera, ja kuvan yläreunaan roikkuu '
            + 'puun lehviä.',
          lahde: 'Navid Sadighi, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Azerbaijan Museum, Tabriz, Iran, 1st. floor.jpg',
          selite: 'Pitkä näyttelysali: lattiassa on parkettia pienten '
            + 'ruutujen kuviona, katossa tummia puurimoja ja upotettuja '
            + 'kohdevaloja. Keskellä seisoo rivi vapaita lasivitriinejä '
            + 'mustilla jalustoilla ja oikealla seinustalla toinen rivi; '
            + 'vitriineissä on muun muassa tummia savikulhoja punaisella '
            + 'kankaalla. Vasemmalla on verhotut ikkunat, seinässä '
            + 'punertava kohokuvapaneeli, jossa on kaariporttinen '
            + 'julkisivu, ja sen alla ilmastointilaite. Sali päättyy '
            + 'valoisaan oviaukkoon, jonka edessä on matala penkki.',
          lahde: 'Navid Sadighi, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Detail of Anxiety - Sculpture by Ahad Hosseini - Azerbaijan Museum - Tabriz - Iranian Azerbaijan - Iran (7421593886).jpg',
          selite: 'Ahad Hosseinin veistosryhmä museon salissa: vasemmalta '
            + 'työntyy kolme suomupintaista lohikäärmeen kaulaa, kidat '
            + 'auki ja hampaat näkyvissä. Oikealla on tiivis ihmisjoukko '
            + '— yksi konttaa etualalla, toiset nostavat käsiään, '
            + 'lakkipäinen hahmo heiluttaa keppiä, ja joukko jatkuu '
            + 'taakse kauas. Hahmot ovat ruskeanharmaita kullanhohtoisin '
            + 'kohokohdin ja seisovat karkealla harmaalla alustalla. '
            + 'Taustalla on valkoisia pilareita, upotettuja kattovaloja, '
            + 'parkettilattia ja oviaukkoja; vasemmassa reunassa näkyy '
            + 'köysiaidan tolppa.',
          lahde: 'Adam Jones from Kelowna, BC, Canada, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
    'Sininen moskeija': {
      aika: '1465',
      teksti: 'Moskeija valmistui lokakuussa 1465; rakennuttaja oli Qara '
        + 'Qoyunlu -hallitsijan Jahanshahin puoliso Khatun Jan Begom. '
        + 'Virallinen nimi on Mozaffariya, mutta se tunnetaan pelkästä '
        + 'väristä: Masjed-e Kabud, sininen moskeija. Tiiliseinät '
        + 'peitettiin laatalla sisältä ja ulkoa lähes kokonaan. '
        + 'Tekniikkaa on kaksi: mosaiikki, jossa jokainen pala leikataan '
        + 'erikseen muotoonsa, ja seitsemän värin laatta, johon värit '
        + 'poltetaan pintaan. Kuvioina on geometrisia verkkoja, '
        + 'kasviaiheita sekä kufi- ja thuluth-kalligrafiaa. Qibla-puolen '
        + 'kupolisali on tummansinistä kuusikulmaista laattaa, jonka '
        + 'kultaus on painettu kaavan läpi.'
        + '\n\n'
        + 'Moskeija kuului laitokseen, jossa oli medresa, sufiluostari, '
        + 'kylpylöitä ja puutarhoja. Vuosiluvut hajoavat: moskeija '
        + 'valmistui 1465, mutta mausoleumia jatkettiin 1478–1490 Aq '
        + 'Qoyunlu -kaudella. Valmiiksi se ei tullut.'
        + '\n\n'
        + '8. tammikuuta 1780 sattui Pohjois-Tabrizin siirroksessa '
        + 'arviolta 7,4 magnitudin maanjäristys, joka tuhosi kaupungin '
        + 'lähes kokonaan; uhriarviot vaihtelevat 40 000:sta 200 000:een. '
        + 'Moskeijasta jäi pystyyn vain iwan, holvattu sisäänkäynti. '
        + 'Kunnosta sitä ennen lähteet kiistelevät: 1600-luvulta on '
        + 'maininta rakennuksesta autiona raunioina. Uudelleenrakennus '
        + 'alkoi 1973. Kaksikuorinen kupoli, matalat minareetit ja '
        + 'porttiosa ovat uusia, ja puuttuvien laattojen tilalle '
        + 'muurattiin tiiltä — tahallaan hieman erinäköistä, jotta uuden '
        + 'erottaa vanhasta.',
      kuvat: [
        {
          tiedosto: 'Tabriz Blue Mosque, northern view (entrance, in 2023).jpg',
          selite: 'Pohjoisjulkisivu lumisena päivänä: keskellä kohoaa korkea '
            + 'kärjekäs sisäänkäyntiholvi, jonka pinnassa on jäljellä '
            + 'laikkuja tummansinistä laattaa, muualla on paljasta '
            + 'tiiltä. Holvin suulla seisoo keltainen työteline, ja sen '
            + 'takaa näkyy lumen peittämä kupoli. Julkisivun molemmilla '
            + 'puolilla ulottuu matala tiilimuuri, joka päättyy pyöreään '
            + 'nurkkatorniin, ja muurin takaa pilkistää kaksi pienempää '
            + 'kupolia. Etualalla laskeutuu portaita puistoon, jossa on '
            + 'puisia istutuslaatikoita, penkkejä ja lumen peittämä '
            + 'käytävä; vasemmalla kävelee yksinäinen ihminen, oikealla '
            + 'seisoo lehdetön puu ja reunoilla näkyy kaupungin taloja.',
          lahde: 'Ahad Nejad Ebrahimi, Aylar Javadpour, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Portico of Blue (Kabud) Mosque - Tabriz - Iranian Azerbaijan - Iran (7421677298).jpg',
          selite: 'Sisäänkäyntiholvin laatoitus jyrkästi alaviistosta '
            + 'kuvattuna, taustalla pilvetön taivas. Tummansinistä pohjaa '
            + 'peittää tiheä vaaleansininen ja kullanruskea kasviköynnös, '
            + 'ja sen poikki kulkee leveä nauha valkoista kaarevaa '
            + 'kalligrafiaa sinisellä pohjalla. Alanurkassa kaartuu '
            + 'kennomainen muqarnas-puolikupu ja holvin reunassa juoksee '
            + 'kierteinen pylväslista. Laatoituksesta puuttuu suuria '
            + 'aloja, joiden kohdalla näkyy sileä vaalea rappauspinta.',
          lahde: 'Adam Jones from Kelowna, BC, Canada, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Interior of Blue Mosque, Tabriz, Iran.jpg',
          selite: 'Pääsali laajakulmasta: yläpuolella kaartuu paljas '
            + 'tiilikupoli ilman laatoitusta, ja sen alla avautuu joka '
            + 'suuntaan kärjekkäitä holvikaaria. Pilarien ja alaseinien '
            + 'laatoituksessa on sinistä, turkoosia ja valkoista '
            + 'geometrista ruudustoa, kasvikuvioita ja kirjoitusnauhoja, '
            + 'ja välissä on laajoja aukkoja, joista laatta puuttuu. '
            + 'Keskellä johtaa holvattu aukko pieneen tiilipintaiseen '
            + 'tilaan, jossa on ikkuna ja puiset portaat. Lattian peittää '
            + 'turkoosi rukousmatto toistuvine kuvioineen, pilareissa on '
            + 'kohdevalot, oikealla riippuu ruskea verho ja vasemmassa '
            + 'alakulmassa on valokuvaajan vaalea nimimerkki.',
          lahde: 'Navid Alizadeh Sadighi, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      lahde: 'Wikipedia',
    },
  },
};
