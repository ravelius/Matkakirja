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
          + 'Ranskalle vuonna 1829. Kivijättiläinen tuotiin laivalla '
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
          tiedosto: 'Parthenon (30276156187).jpg',
          selite: 'Parthenon, Athenen temppeli, on seissyt kalliolla lähes 2 500 vuotta.',
          lahde: 'Phanatic, Wikimedia Commons (CC BY-SA 2.0)',
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
          lahde: 'Tuntematon, Wikimedia Commons (Public domain)',
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
          tiedosto: 'Baščaršija.jpg',
          selite: 'Baščaršijan tori iltahämärässä sateen jäljiltä, kahvilan '
            + 'punaiset pöydät ja Sebilj-kaivo dramaattisen pilvitaivaan '
            + 'alla.',
          lahde: 'Yukof, Wikimedia Commons (CC BY-SA 4.0)',
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
          tiedosto: 'Latin Bridge Sarajevo summer 2010.JPG',
          selite: 'Latinalaissilta lähempää katsottuna kirkkaana kesäpäivänä, '
            + 'ihmisiä ylittämässä siltaa värikkäiden talojen edessä.',
          lahde: 'BiHVolim, Wikimedia Commons (CC BY-SA 4.0)',
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
          tiedosto: 'Golden Gate Kiev 2018 G1.jpg',
          selite: 'Kultainen portti sivukulmasta kuvattuna kirkkaassa '
            + 'auringonpaisteessa, puinen yläosa ja ruohopeitteinen valli '
            + 'näkyvissä.',
          lahde: 'George Chernilevsky, Wikimedia Commons (Public domain)',
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
  PLACEHOLDER_ERA11
};
