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
};
