/*
 * SKANDAALIT — kuuluisat kohut, huijaukset ja kavallukset kartalle.
 *
 * Raamatun kirjaus SKANDAALIT KARTALLE: pääkategoria Skandaalit
 * (huuto-symboli) saa oman sisältönsä — 2–3 opettavaa skandaalia,
 * kohua tai kuuluisaa huijausta per maa. Tämä erä: 83 skandaalia
 * 29 maassa (Fablen katselmointi 30.8.2026: 85 luonnoksesta
 * pudotettiin 2). Korttitekstit ovat Fablen hyväksymiä; kirjoitus-
 * virhekorjaus ja EST/FIN-pirtuparin ristiviittausvirkkeet ovat
 * katselmointimuistion mukaiset. Erä tehtiin kuvattomana; kuvat
 * lisätään skandaali kerrallaan `kuvat`-listaan.
 *
 * PITKÄ TEKSTI (2.9.2026, omistajan havainto Sofian vihellyskohun
 * kortista: *"Tämä näyttää tyngältä. Puuttuu tekstiä."*): kortti sai
 * ingressin (`kortti`) rinnalle varsinaisen jutun (`teksti`), 3–4
 * kappaletta ja n. 160–240 sanaa. Kaikki 83 skandaalia saivat tekstin
 * samana päivänä kahdessa erässä (1–42 AUT–HUN ja 43–83 HUN–UKR). Faktat on
 * tarkistettu kunkin skandaalin `lahde`-rivin lähteestä 2.9.2026, ja
 * samalla korjattiin kahdeksan ingressin tai visan väitettä, jotka
 * eivät kestäneet lähteen lukemista (Farinet'n rahojen maine on
 * Ramuzin romaanin legenda, Mona Lisa ei mahtunut työtakin alle,
 * yliopiston sulki hallitus, Beringerin kivet teetettiin, Belokas
 * paljastui vastalauseesta, Struenseen valta kesti runsaan vuoden,
 * Battenbergin yöpuvusta ei ole lähdettä, ja oikeusmurha-sanan antoi
 * yksi aikalaishistorioitsija).
 *
 * Taulun muoto: maakoodi (ISO-3) → skandaalilista. Kentät:
 *
 *   id       erän sisällä yksikäsitteinen tunnus; minitehtäväavain on
 *            skandaali:<id> (js/skandaalit.js).
 *   otsikko  kortin otsikko.
 *   nimio    lyhyt karttanimiö (≤ 18 merkkiä ennen lyhennystä,
 *            js/fokusnosto-symbolit.js NOSTOSYM_NIMIO_MERKKEJA).
 *   vuosi    tapahtuma-aika kortin metariville.
 *   paikka   paikan nimi kortin metariville.
 *   lat/lon  tapahtumapaikka asteina. Laudalle projisoidaan ajossa
 *            (js/fokusmitat.js projisoiLaudalle) kuten syvennys-
 *            paikoilla — ei käsin laskettuja lautakoordinaatteja.
 *   kortti   Fablen hyväksymä korttiteksti sellaisenaan — kortin
 *            INGRESSI, 3–4 virkettä.
 *   teksti   VALINNAINEN pitkä juttu ingressin alle: 3–4 kappaletta
 *            (kappaleraja on tyhjä rivi \n\n), n. 160–240 sanaa.
 *            Rakenne on aina sama: mitä tapahtui ja missä, ihmiset
 *            nimeltä — miksi siitä tuli skandaali, kuka hyötyi ja kuka
 *            kärsi — miten päättyi ja mitä jäi (rakennus, laki,
 *            sanonta, oikeudenkäynti). Faktat ovat `lahde`-rivin
 *            lähteestä; ingressin virkkeitä ei toisteta sanasta sanaan.
 *            Ilman kenttää kortti latoo pelkän ingressin kuten ennen
 *            (js/skandaalit.js piirraSkandaalinSisus).
 *   kuvat    VALINNAINEN kuvalista [{ osoite | tiedosto, selite,
 *            lahde }]. Järjestys on omistajan linjaus 2.9.2026:
 *            ENSIN Matkakirjan oma havainnekuva (`osoite`, pelin
 *            ämpärissä) ja sen jälkeen aikalaiskuvat ja valokuvat
 *            Commonsista (`tiedosto` = Commons-nimi, `lahde` =
 *            tekijä + lisenssi). Kortti näyttää ensimmäisen isona ja
 *            antaa lopuille selailunuolet ja laskurin; puuttuva
 *            tiedosto putoaa sarjasta itsestään, joten havainnekuvan
 *            voi lisätä listan kärkeen heti kun kuvajono on sen
 *            tehnyt. Yhden kuvan lista piirtyy kuten ennenkin.
 *            Havainnekuvalla saa lisäksi olla `url`: kuvaputken
 *            toimittama faktalähteen osoite. Sitä ei ladota kortille
 *            (lähderivi on tekstiä, ja pitkä osoite täyttäisi puolet
 *            rivistä) vaan se säilytetään samassa kuvassa kuten
 *            historian hetkillä (js/packs/historian-hetket.js).
 *   kuva     VANHA yhden kuvan kenttä { osoite, selite, lahde }. Yhä
 *            tuettu (js/skandaalit.js skandaalinKuvat lukee sen yhden
 *            alkion listana), eikä sitä tarvitse muuttaa: erän
 *            1.9.2026 kolme Wienin havainnekuvaa piirtyvät ennallaan.
 *            `osoite` on valmis osoite pelin omassa ämpärissä — nämä
 *            ovat Matkakirjan omia havainnekuvia, joten lähderivi
 *            alkaa "Matkakirjan havainnekuva" ja saa selitelinkin
 *            (js/havainnekuva.js).
 *
 *            KUVAPUTKEN ERÄ photo-v1 (4.9.2026) toi näille kolmelle ja
 *            seitsemälle muulle skandaalille valokuvamaisen kuvan
 *            (`skandaali-<id>-photo-v1.jpg`). Kuvateksti ja lähderivi
 *            ovat kuvaputken toimittamia sanasta sanaan (posti
 *            4.9.2026 12:05 UTC), joten selite on nyt 2–3 virkettä ja
 *            lähderivi muotoa "Matkakirjan havainnekuva. Faktat: …".
 *            Saman päivän toinen posti (15:56 EEST) toi erän kuvat
 *            11–13: vedenpaisumuksen-todistaja, kuninkaanhovin-
 *            kasikirjoitukset ja kelley-alkemistihuijari saivat kukin
 *            yhden alkion `kuvat`-listan samalla kaavalla. Kolmas posti
 *            (18:34 EEST) toi kuvat 14–31: kahdeksantoista siihen asti
 *            kuvatonta skandaalia Tanskasta Ranskaan (tycho-brahen-
 *            kuolinmysteeri … kaulanauhajuttu-1785) saivat kukin oman
 *            yhden alkion `kuvat`-listansa, jälleen samalla kaavalla.
 *            Skandaalisarjasta on nyt kuvitettu 31 / 83.
 *   visa     minivisa: kysymys, kolme vaihtoehtoa, oikean indeksi.
 *            Oikean paikan jakauma tasattiin koko erän yli
 *            (28/28/27), ettei se painotu yhteen indeksiin.
 *
 * Lähteet ja koordinaattien tarkistusmerkinnät ovat kunkin skandaalin
 * kommentissa. Epävarmoiksi merkityt koordinaatit tarkistettiin
 * Wikipedia/Nominatim-kutsuin 30.8.2026 (±100 m riitti); korjatut
 * pisteet on merkitty kommenttiin.
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten ainoa top-level-nimi alkaa
 * SKANDAALI-etuliitteellä.
 */

/*
 * HAVAINNEKUVIEN JUURI. Kuvat ovat Matkakirjan omia havainnekuvia ja
 * asuvat pelin omassa ämpärissä (sama R2 kuin js/media.js:n peili ja
 * js/kohtaamiskuvat-data.js:n kohtaamiskuvat), eivät repossa —
 * omistajan linjaus "kaikki aina ämpäriin eikä repoon". Osoite on
 * siksi valmis `osoite`, jolla ei ole varareittiä: puuttuva tiedosto
 * piilottaa kuvakehyksen eikä riko korttia (js/fokusnosto.js
 * asetaNostonKuva).
 */
const SKANDAALI_KUVAJUURI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/kuvajono/';

export const SKANDAALIT = {
  AUT: [
    /*
     * Schönbrunnin palatsi, Wien (ensiesitys hoville).
     * Lähde: en.wikipedia.org: Mechanical Turk
     */
    {
      id: 'shakkiturkkilainen',
      otsikko: 'Shakkiturkkilainen — kone joka voitti Napoleonin',
      nimio: 'Shakkiturkkilainen',
      vuosi: '1770–1854',
      paikka: 'Schönbrunnin palatsi, Wien (ensiesitys hoville)',
      lat: 48.1845, lon: 16.3119,
      kortti: 'Kone kumarsi, siirsi nappulaa ja voitti keisarit — '
        + 'kahdeksankymmentäneljä vuotta kukaan ei saanut todistettua, että '
        + 'kaapissa istui ihminen. Napoleonkin hävisi puisennäköiselle '
        + 'turkkilaiselle. Paras huijaus on se, jonka kaikki aavistavat eikä '
        + 'kukaan pysty osoittamaan.',
      teksti: 'Unkarilainen hovivirkamies Wolfgang von Kempelen näki 1769 '
        + 'Schönbrunnissa ranskalaisen taikurin François Pelletier\'n esityksen ja '
        + 'lupasi keisarinna Maria Teresialle palata vuoden kuluessa paremman '
        + 'keksinnön kanssa. Kone valmistui alkuvuodesta 1770: luonnollisen '
        + 'kokoinen ylävartalo turbaanissa ja itämaisessa kaavussa, edessään '
        + 'puinen kaappi, jonka päällä oli shakkilauta. Esittelijä avasi kaapin '
        + 'ovet yksi kerrallaan ja näytti yleisölle rattaat, vivut ja tyhjän tilan.\n\n'
        + 'Kaapissa istui ihminen. Shakinpelaaja siirtyi liukuistuimella '
        + 'väliseinien taakse sitä mukaa kuin ovia avattiin, siirsi nappuloita '
        + 'vivuilla ja magneeteilla ja luki vastustajan siirrot laudan alta. '
        + 'Kynttilän savu johdettiin putkia myöten turbaaniin, jossa se katosi '
        + 'salin muiden kynttilöiden savuun. Myöhempien vuosien pelaajista '
        + 'tunnetaan Johann Allgaier, William Lewis, Jacques Mouret ja William '
        + 'Schlumberger; Kempelenin omien kiertueiden miehiä ei tiedetä yhä '
        + 'tänäkään päivänä.\n\n'
        + 'Kempelenin kuoltua 1804 poika myi koneen Johann Nepomuk Mälzelille '
        + 'puoleen hintaan siitä, mitä isä oli aikanaan pyytänyt. Vuonna 1809 '
        + 'Napoleon tuli Schönbrunniin pelaamaan ja yritti kolmesti laitonta '
        + 'siirtoa; kolmannella kerralla kone pyyhkäisi kädellään nappulat '
        + 'laudalta. Sen jälkeen pelattiin oikea peli, ja Napoleon kaatoi '
        + 'kuninkaansa yhdeksännentoista siirron kohdalla.\n\n'
        + 'Turkkilainen paloi 5. heinäkuuta 1854 Philadelphiassa, kun teatterista '
        + 'alkanut tulipalo levisi museorakennukseen. Salaisuuden kertoi vasta '
        + '1857 shakkilehdessä viimeisen omistajan poika Silas Mitchell: kun '
        + 'konetta ei enää ollut, ei ollut syytä vaietakaan. Alkuperäinen '
        + 'shakkilauta oli säilytyksessä muualla ja on tallella.',
      lahde: 'en-Wikipedia "Mechanical Turk". Tarkistettu 2.9.2026.',
      kuva: {
        osoite: `${SKANDAALI_KUVAJUURI}skandaali-shakkiturkkilainen-photo-v1.jpg`,
        selite: 'Nuori hovinainen kumartuu tutkimaan rattaita niin syvälle kuin '
          + 'etiketti sallii, ja vieressä hovipoika yrittää pidätellä nauruaan. '
          + 'Kempelen avaa ovet tyynenä: koneen sisään kätketty pelaaja osaa '
          + 'väistää katseita yhtä taitavasti kuin vastustajan nappuloita.',
        lahde: 'Matkakirjan havainnekuva. Faktat: The Metropolitan Museum of Art '
          + '— Art in Motion.',
        url: 'https://www.metmuseum.org/exhibitions/listings/2019/making-marvels-science-splendor/art-in-motion',
      },
      visa: {
        kysymys: 'Miten shakkiturkkilainen todellisuudessa pelasi?',
        vaihtoehdot: [
          'Kaapin sisällä piileskellyt shakkimestari ohjasi siirtoja vivuin '
            + 'ja magneetein',
          'Kellokoneisto toisti ennalta ohjelmoituja pelejä',
          'Esittäjä ohjasi nukkea salaa langoilla',
        ],
        oikea: 0,
      },
    },
    /*
     * Wienin yliopiston päärakennus.
     * Lähde: en.wikipedia.org: Klimt University of Vienna Ceiling Paintings
     */
    {
      id: 'klimtin-tiedekuntamaalaukset',
      otsikko: 'Klimtin tiedekuntamaalaukset — yliopiston hylkäämä katto',
      nimio: 'Klimtin maalaukset',
      vuosi: '1900–1907',
      paikka: 'Wienin yliopiston päärakennus',
      lat: 48.2131, lon: 16.3597,
      kortti: 'Yliopisto tilasi taiteilijalta katon täydeltä tieteen riemuvoittoa '
        + 'ja sai sen sijaan Klimtin näkemyksen — mikä oli professorien '
        + 'mielestä skandaali. Maalauksia ei ripustettu koskaan, ja lopulta '
        + 'sota poltti koko kiistan kohteen. Jäljelle jäivät mustavalkoiset '
        + 'valokuvat ja opetus tilaustöiden vaaroista.',
      teksti: 'Yliopisto tilasi Gustav Klimtiltä 1894 juhlasalin kattoon kolme '
        + 'suurta paneelia: Filosofian, Lääketieteen ja Oikeustieteen. Filosofia '
        + 'esiteltiin maaliskuussa 1900 Wienin secession seitsemännessä '
        + 'näyttelyssä ja Lääketiede vuotta myöhemmin kymmenennessä. Aiheeksi oli '
        + 'sovittu valon voitto pimeydestä; Klimt maalasi ihmisjoukon '
        + 'ajelehtimassa tyhjyydessä, ja Lääketieteessä terveyden jumalatar '
        + 'Hygieia kääntää selkänsä ihmiskunnalle.\n\n'
        + 'Kahdeksankymmentäseitsemän yliopiston opettajaa allekirjoitti '
        + 'vastalauseen. Vuonna 1901 asiaan kutsuttiin virallinen syyttäjä, ja '
        + 'kiistaa käsiteltiin Itävallan parlamentissa — ensimmäistä kertaa '
        + 'taiteesta. Ministereistä puolusti vain opetusministeri. Kun Klimt '
        + 'samana vuonna valittiin taideakatemian professoriksi, hallitus jätti '
        + 'nimityksen vahvistamatta, eikä hän saanut enää koskaan opetusvirkaa.\n\n'
        + 'Klimt irtisanoutui tilauksesta 3. huhtikuuta 1905 ja maksoi 30 000 '
        + 'kruunun ennakon takaisin keräilijä August Ledererin tuella; Lederer sai '
        + 'vastineeksi Filosofian. Valtio piti maalauksia omaisuutenaan, ja Klimt '
        + 'sai pitää ne vasta uhattuaan noutajia haulikolla. Lääketieteen ja '
        + 'Oikeustieteen osti 1911 Klimtin ystävä ja työtoveri Koloman Moser.\n\n'
        + 'Vuonna 1943 kolmikko siirrettiin turvaan Immendorfin linnaan '
        + 'Ala-Itävaltaan, ja toukokuussa 1945 linna paloi vetäytyvien joukkojen '
        + 'sytyttämänä. Jäljellä ovat luonnokset ja kourallinen valokuvia — '
        + 'Lääketieteestä yksi ainoa kuva koko teoksesta. Vuonna 2021 Googlen ja '
        + 'Leopold-museon koneoppimiskokeilu arvasi maalauksille takaisin värit.',
      lahde: 'en-Wikipedia "Klimt University of Vienna Ceiling Paintings". '
        + 'Tarkistettu 2.9.2026.',
      kuva: {
        osoite: `${SKANDAALI_KUVAJUURI}skandaali-klimtin-tiedekuntamaalaukset-photo-v1.jpg`,
        selite: 'Maaliapulainen pitää telineen köydestä kiinni ja yrittää lukea '
          + 'professorien kasvoilta, onko vuosien työ juuri tuomittu. Yksi osoittaa '
          + 'kattoon suuttuneena, toinen vaikenee ihastuksestaan — kiista on alkanut '
          + 'ennen kuin kangas ehtii paikalleen.',
        lahde: 'Matkakirjan havainnekuva. Faktat: University of Vienna — Gustav '
          + 'Klimt: Philosophy.',
        url: 'https://geschichte.univie.ac.at/de/bilder/gustav-klimt-die-philosophie-fakultatsbild',
      },
      visa: {
        kysymys: 'Mikä oli Klimtin tiedekuntamaalausten lopullinen kohtalo?',
        vaihtoehdot: [
          'Ne ripustettiin lopulta yliopiston juhlasaliin',
          'Ne myytiin amerikkalaiselle keräilijälle',
          'Niiden uskotaan tuhoutuneen linnan palossa sodan lopussa 1945',
        ],
        oikea: 2,
      },
    },
    /*
     * Kunsthistorisches Museum, Wien.
     * Lähde: en.wikipedia.org: Cellini Salt Cellar
     */
    {
      id: 'salieran-varkaus',
      otsikko: 'Saliera — suola-astia joka katosi kolmeksi vuodeksi',
      nimio: 'Saliera',
      vuosi: '2003–2006',
      paikka: 'Kunsthistorisches Museum, Wien',
      lat: 48.2036, lon: 16.3619,
      kortti: 'Renessanssin kuuluisin suola-astia vietiin museosta '
        + 'rakennustelineitä pitkin, ja hälytys kuitattiin tekniseksi viaksi. '
        + 'Kolme vuotta kultainen Cellini makasi lyijyarkussa metsässä. '
        + 'Museovartioinnin oppikirjat saivat uuden luvun; suola pysyi koko '
        + 'ajan turvassa.',
      teksti: 'Saliera on ainoa säilynyt Benvenuto Cellinin kultaveistos: '
        + 'kullasta, emalista, eebenpuusta ja norsunluusta tehty pöytäkoriste '
        + 'Ranskan kuninkaalle Frans I:lle, valmiina 1543. Se on 26 senttiä '
        + 'korkea, ja jalustassa on laakerit, joilla astiaa vieritettiin pöydällä '
        + 'vieraalta toiselle. Maa ja Meri istuvat vastakkain: suola tuli merestä, '
        + 'pippuri maasta. Cellini kertoi omaelämäkerrassaan saaneensa työstä '
        + 'tuhat scudoa; vuonna 1562 astia oli vähällä päätyä sulatettavaksi, '
        + 'kuten useimmat aikansa kultatyöt.\n\n'
        + 'Yöllä 11. toukokuuta 2003 mies nousi Kunsthistorisches Museumin '
        + 'julkisivua peittäneitä remonttitelineitä pitkin ikkunaan. Hälytin soi, '
        + 'mutta se kuitattiin vikailmoitukseksi, eikä varkautta huomattu ennen '
        + 'kuin aamulla kahtakymmentä yli kahdeksan. Museo lupasi miljoonan euron '
        + 'palkkion astian palauttamisesta.\n\n'
        + 'Astia löytyi 21. tammikuuta 2006 lyijylaatikkoon suljettuna metsästä '
        + 'Zwettlin kaupungin liepeiltä, yhdeksänkymmentä kilometriä Wienistä '
        + 'pohjoiseen. Varas Robert Mang ilmoittautui itse poliisille, kun '
        + 'valvontakameran kuvat oli julkaistu ja tuttavat olivat tunnistaneet '
        + 'hänet niistä. Tuomioksi tuli neljä vuotta vankeutta.\n\n'
        + 'Vakuutusarvoltaan Saliera on noin kuudenkymmenen miljoonan dollarin '
        + 'esine, ja museo oli remontissa koko julkisivun mitalta. Hälytys oli '
        + 'soinut ajallaan — kukaan vain ei uskonut sitä.',
      lahde: 'en-Wikipedia "Cellini Salt Cellar". Tarkistettu 2.9.2026.',
      kuva: {
        osoite: `${SKANDAALI_KUVAJUURI}skandaali-salieran-varkaus-photo-v1.jpg`,
        selite: 'Varas pysähtyy märillä telineillä, kun punainen hälytysvalo '
          + 'välähtää museon ikkunassa. Alhaalla sateenvarjon alla kulkeva ihminen '
          + 'ei katso ylös — eikä vartiointikeskuskaan usko, että hälytys on '
          + 'todellinen.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Kunsthistorisches Museum Wien '
          + '— statement on the theft.',
        url: 'https://www.presseportal.ch/de/pm/100000789/100462866',
      },
      visa: {
        kysymys: 'Mistä Saliera löytyi vuonna 2006?',
        vaihtoehdot: [
          'Sveitsiläisestä pankkiholvista',
          'Metsään haudatusta lyijyarkusta',
          'Antiikkihuutokaupasta Münchenistä',
        ],
        oikea: 1,
      },
    },
  ],
  BGR: [
    /*
     * Gotse Delchev (ent. Nevrokop), Länsi-Rodopit.
     * Lähde: en.wikipedia.org: Veda Slovena
     */
    {
      id: 'veda-slovena',
      otsikko: 'Veda Slovena — laulut jotka olivat liian muinaisia',
      nimio: 'Veda Slovena',
      vuosi: '1874–1881',
      paikka: 'Gotse Delchev (ent. Nevrokop), Länsi-Rodopit',
      lat: 41.5717, lon: 23.7261,
      kortti: 'Kyläopettaja toimitti keräilijälle lauluja, joissa Rodopien paimenet '
        + 'muistelivat Orfeusta kuin naapuria — vuosituhansien takaa, mitatussa '
        + 'runomitassa. Keräilijä uskoi joka säkeen ja julkaisi kaksi paksua '
        + 'nidettä. Euroopan oppineet lukivat, ihastuivat ja sitten laskivat, '
        + 'montako sattumaa on liikaa.',
      teksti: 'Bosniansyntyinen kansanrunouden keräilijä Stjepan Verković julkaisi '
        + 'ensimmäisen niteen Belgradissa 1874 ja toisen Pietarissa 1881. Säkeitä '
        + 'on yhteensä 23 809. Laulujen piti olla Rodopien pomakkien '
        + 'esikristillistä perintöä: niissä esiintyvät Orfeus, Aleksanteri Suuri '
        + 'sekä hindujumalat Višnu, Šiva ja Agni, ja niissä kerrotaan slaavien '
        + 'muutosta Intiasta.\n\n'
        + 'Aineiston toimitti Verkovićille kyläopettaja Ivan Gologanov, joka '
        + 'vakuutti kirjanneensa laulut omakätisesti. Aluksi sitä pidettiin '
        + 'uskottavana juuri siksi, ettei kyläopettajan luultu kykenevän '
        + 'sellaiseen. Gologanov oli kuitenkin saanut kreikkalaisen '
        + 'koulusivistyksen, tunsi Homeroksen ja kirjoitti itse mytologista '
        + 'runoutta. Petko Slavejkov arveli tekijöitä olleen useita ja Verkovićin '
        + 'maksaneen työstä.\n\n'
        + 'Vatroslav Jagić, Aleksandr Pypin ja Konstantin Jireček sekä '
        + 'bulgarialaiset Ivan Šišmanov, Marin Drinov ja Aleksandar Teodorov-Balan '
        + 'päätyivät väärennökseen: laulajia, joilta laulut oli muka kerätty, ei '
        + 'ollut olemassa, eikä kukaan tuntenut säkeitä. Verković matkusti 1891 ja '
        + '1892 vielä Länsi-Rodopeille etsimään laulajiaan eikä löytänyt ketään. '
        + 'Mihail Arnaudov sinetöi asian tutkimuksellaan 1968.\n\n'
        + 'Šišmanovin mukaan Veda Slovena oli silti ensimmäinen bulgarialainen '
        + 'kirja, joka sai Euroopan oppineet kiinnostumaan Bulgariasta ja sen '
        + 'menneisyydestä. Sellaisena sitä yhä luetaan — mystifikaationa.',
      lahde: 'en-Wikipedia "Veda Slovena". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-veda-slovena-photo-v1.jpg`,
          selite: 'Vanha laulaja etsii seuraavaa säettä muististaan, ja hänen '
            + 'vieressään paimenpoika liikuttaa huuliaan ääneti, ettei laulu '
            + 'katoaisi. Kerääjän kiireinen kynä tekee suullisesta perinteestä '
            + 'kirjan — mutta juuri näiden tuhansien säkeiden alkuperästä kasvaa '
            + 'myöhemmin yksi Balkanin sitkeimmistä aitouskiistoista.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Bulgarian National Library '
            + '— Biblioteka 1/2018.',
          url: 'https://www.nationallibrary.bg/www/wp-content/uploads/2025/07/Biblioteka_br1_2018.pdf',
        },
        {
          tiedosto: 'Veda-slovena-1874.gif',
          selite: 'Veda Slovenan ensimmäisen niteen nimiölehti; kokoelma '
            + 'painettiin 1874 Belgradissa.',
          lahde: 'Stefan Verković 1874, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'Veda-slovena-1881.gif',
          selite: 'Toinen nide ilmestyi 1881 Pietarissa — siihen mennessä tutkijat '
            + 'olivat jo alkaneet laskea sattumia.',
          lahde: 'Stefan Verković 1881, Wikimedia Commons (PD)',
        },
      ],
      visa: {
        kysymys: 'Kuka Veda Slovenan laulut tutkijoiden enemmistön mukaan '
          + 'todellisuudessa sepitti?',
        vaihtoehdot: [
          'Kyläopettaja Ivan Gologanov, joka väitti keränneensä ne',
          'Julkaisija Stjepan Verković itse',
          'Ne olivat aitoja pomakkien kansanlauluja',
        ],
        oikea: 0,
      },
    },
    /*
     * Entinen ruhtinaanpalatsi (nyk. Kansallinen taidegalleria), Sofia.
     * Lähde: en.wikipedia.org: Alexander of Battenberg
     */
    {
      id: 'battenbergin-ruhtinaskaappaus',
      otsikko: 'Ruhtinas kaapataan — Battenbergin pakkoluopuminen',
      nimio: 'Ruhtinaskaappaus',
      vuosi: '1886',
      paikka: 'Entinen ruhtinaanpalatsi (nyk. Kansallinen taidegalleria), Sofia',
      lat: 42.6965, lon: 23.3268,
      kortti: 'Maan ensimmäinen ruhtinas herätettiin omassa palatsissaan pistimet '
        + 'ovella ja saatettiin allekirjoittamaan luopumiskirja ennen aamua. Hän '
        + 'ehti vielä palata — mutta huomasi, että kaapattua kruunua on vaikea '
        + 'pitää päässä. Palatsissa katsellaan nykyään tauluja, mikä on kaikin '
        + 'puolin rauhallisempaa.',
      teksti: 'Suuri kansalliskokous valitsi 1879 Bulgarian ensimmäiseksi '
        + 'ruhtinaaksi 22-vuotiaan saksalaisprinssin Aleksanteri Battenbergin. Hän '
        + 'lakkautti perustuslain 1881 liian vapaamielisenä ja palautti sen 1883, '
        + 'mikä riitautti hänet Venäjän kanssa mutta teki hänestä suositun kotona. '
        + 'Syyskuussa 1885 Itä-Rumelia yhdistyi Bulgariaan hänen suostumuksellaan, '
        + 'ja marraskuussa bulgarialaiset voittivat Slivnitsan taistelun. '
        + 'Sulttaani nimitti hänet 5. huhtikuuta 1886 Itä-Rumelian '
        + 'kenraalikuvernööriksi viideksi vuodeksi.\n\n'
        + 'Voitto tuli kalliiksi. Tsaari Aleksanteri III oli vetänyt venäläiset '
        + 'upseerit pois Bulgarian armeijasta, ja osa jäljelle jääneistä koki '
        + 'jääneensä palkitsematta. Tsaari lupasi salaliittolaisille venäläisen '
        + 'sotilasarvon ja palkan. Yöllä 20. elokuuta 1886 upseerit ottivat '
        + 'ruhtinaan kiinni Sofian palatsissa ja pakottivat hänet '
        + 'allekirjoittamaan luopumiskirjan.\n\n'
        + 'Aleksanteri kuljetettiin Tonavalle Orjahovoon, sieltä hänen omalla '
        + 'huvijahdillaan Reniin ja luovutettiin Venäjän viranomaisille, jotka '
        + 'päästivät hänet Lembergiin. Stefan Stambolovin johtama '
        + 'vastavallankumous kaatoi Sofiaan pystytetyn väliaikaishallituksen, ja '
        + 'ruhtinas palasi maahan. Tsaari kirjoitti hänelle, ettei voi hyväksyä '
        + 'paluuta, ja Bismarck kielsi rankaisemasta salaliittolaisia.\n\n'
        + 'Vajaat kolme viikkoa kaappausyön jälkeen, 8. syyskuuta 1886, '
        + 'Aleksanteri julkaisi luopumismanifestin ja lähti maasta. Hän käytti '
        + 'loppuikänsä Tarnovon ruhtinaan arvonimeä, palveli kenraalina Itävallan '
        + 'armeijassa ja kuoli 36-vuotiaana 1893.',
      lahde: 'en-Wikipedia "Alexander of Battenberg". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-battenbergin-ruhtinaskaappaus-photo-v1.jpg`,
          selite: 'Aleksanteri I seisoo paljain jaloin vastapäätä upseereita, '
            + 'joita hän oli vielä vähän aiemmin johtanut sodassa. Nuorin heistä '
            + 'ei pysty katsomaan ruhtinasta silmiin, kun luopumispaperi ojennetaan '
            + '— kaappauksen ratkaiseva hetki on yhtä paljon häpeää kuin '
            + 'vallankäyttöä.',
          lahde: 'Matkakirjan havainnekuva. Faktat: National Museum of Military '
            + 'History — Alexander I chronology.',
          url: 'https://militarymuseum.bg/voenna-istoria/voenen-kalendar/april/',
        },
        {
          tiedosto: 'Alexander I of Bulgaria by Dimitar Karastoyanov.jpg',
          selite: 'Bulgarian ensimmäinen ruhtinas Aleksanteri Battenberg '
            + 'sofialaisen hovivalokuvaajan Dimitar Karastojanovin ottamassa '
            + 'muotokuvassa.',
          lahde: 'Dimitar Karastoyanov, Wikimedia Commons (CC0)',
        },
      ],
      visa: {
        kysymys: 'Ketkä pakottivat ruhtinas Aleksander Battenbergin luopumaan '
          + 'kruunusta 1886?',
        vaihtoehdot: [
          'Osmanien sulttaanin lähettiläät',
          'Oman armeijan venäjämieliset upseerit',
          'Bulgarian parlamentin tasavaltalaiset',
        ],
        oikea: 1,
      },
    },
    /*
     * Ivan Vazovin kansallisteatteri, Sofia.
     * Lähde: en.wikipedia.org: Sofia University
     * Lähde: en.wikipedia.org: Ivan Vazov National Theatre
     */
    {
      id: 'kansallisteatterin-vihellyskohu',
      otsikko: 'Vihellyskonsertti ruhtinaalle — ja yliopisto kiinni',
      nimio: 'Vihellyskonsertti',
      vuosi: '1907',
      paikka: 'Ivan Vazovin kansallisteatteri, Sofia',
      lat: 42.6942, lon: 23.3264,
      kortti: 'Ylioppilaat viheltivät ruhtinaalle teatterin avajaisissa, ja '
        + 'hallitus sulki vastineeksi koko yliopiston — puoleksi vuodeksi, '
        + 'opettajat erotettuina. Harvoin on yksi vihellyskonsertti tullut '
        + 'valtiolle näin kalliiksi. Teatteri sentään jäi pystyyn, ja se on yhä '
        + 'kaupungin komeimpia.',
      teksti: 'Kansallisteatteri perustettiin 1904 Salza i smjah -seurueen '
        + 'näyttelijöistä. Talon piirsivät wieniläiset teatteriarkkitehdit '
        + 'Ferdinand Fellner ja Hermann Helmer, se valmistui 1906 ja avattiin 3. '
        + 'tammikuuta 1907. Ensimmäisenä näyteltiin Ivan Vazovin Karkotetut — '
        + 'saman kirjailijan, jonka nimeä talo kantaa nykyään.\n\n'
        + 'Katsomossa istui ruhtinas Ferdinand, ja Sofian yliopiston ylioppilaat '
        + 'viheltivät hänelle. Hallitus vastasi mittakaavassa, joka yllätti '
        + 'kaikki: yliopisto suljettiin puoleksi vuodeksi ja kaikki opettajat '
        + 'erotettiin. Kriisi laukesi vasta, kun Aleksandar Malinovin uusi '
        + 'hallitus astui virkaan tammikuussa 1908 — vuosi avajaisten jälkeen.\n\n'
        + 'Teatterin oma tie oli sekin mutkainen. Talo vaurioitui pahoin '
        + 'tulipalossa 1923 juhlanäytännön aikana, ja se rakennettiin uudelleen '
        + '1929 saksalaisen Martin Dülferin suunnitelmien mukaan. Sota rikkoi '
        + 'rakennusta jälleen, ja se korjattiin 1945. Nimikin on vaihtunut '
        + 'kahdesti: aluksi talo oli pelkkä Kansallisteatteri, vuosina 1952–1962 '
        + 'se kantoi näyttelijä Krastjo Sarafovin nimeä, ja vasta sitten se sai '
        + 'Ivan Vazovin. Näyttelijäkoulu perustettiin taloon 1925.\n\n'
        + 'Nykyään päänäyttämöllä on 750 paikkaa ja talossa kaksi pienempää '
        + 'näyttämöä. Julkisivu on painettu Bulgarian 50 levan seteliin. Yliopisto '
        + 'ja teatteri seisovat yhä muutaman korttelin päässä toisistaan, kumpikin '
        + 'oman kohunsa muistona.',
      lahde: 'en-Wikipedia "Sofia University" ja en-Wikipedia "Ivan Vazov National '
        + 'Theatre". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-kansallisteatterin-vihellyskohu-photo-v1.jpg`,
          selite: 'Nuori opiskelija viheltää ruhtinas Ferdinandin vaunuille, mutta '
            + 'hänen ystävänsä seuraa jo poliisien liikkeitä. Avajaisillan uhma '
            + 'tuntuu hetken vapauttavalta; pian Sofian yliopisto suljetaan puoleksi '
            + 'vuodeksi ja opettajat joutuvat maksamaan protestista.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Ivan Vazov National Theatre '
            + '— 114 years since opening.',
          url: 'https://nationaltheatre.bg/bg/novini/dnes-otbelyazvame-114-godini-ot-otkrivaneto-na-sgradata-na-narodniya-teatr',
        },
        {
          tiedosto: 'BASA-3K-7-328-5a-Sofia Ivan Vazov National Theatre, 1907.jpg',
          selite: 'Kansallisteatteri Sofiassa vuonna 1907, samana vuonna kun talo '
            + 'avattiin ja ylioppilaat viheltivät ruhtinaalle.',
          lahde: 'Ivan Karastoyanov 1907, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'Nikola Petrov3.jpeg',
          selite: 'Nikola Petrovin maalaus Kansallisteatteri vuodelta 1912; talo '
            + 'oli tuolloin viisivuotias.',
          lahde: 'Nikola Petrov 1912, Wikimedia Commons (PD)',
        },
      ],
      visa: {
        kysymys: 'Miten hallitus rankaisi ylioppilaita, jotka viheltivät ruhtinas '
          + 'Ferdinandille kansallisteatterin avajaisissa 1907?',
        vaihtoehdot: [
          'Sulki yliopiston puoleksi vuodeksi ja erotti kaikki opettajat',
          'Kielsi teatteriesitykset ylioppilailta vuodeksi',
          'Karkotti ylioppilaiden johtajat maasta',
        ],
        oikea: 0,
      },
    },
  ],
  BIH: [
    /*
     * Fojnican fransiskaaniluostari, Fojnica.
     * Lähde: en-Wikipedia "Fojnica Armorial" (tarkistettu 30.8.2026)
     * Lähde: en-Wikipedia "Korjenić-Neorić Armorial" (Ohmučevićin sepitetty
     *   sukupuu; tarkistettu 30.8.2026)
     * Korjattu 561 m: hr-Wikipedia "Franjevački samostan Duha Svetoga u
     *   Fojnici" -koordinaatit.
     */
    {
      id: 'fojnican-vaakunakirja',
      otsikko: 'Fojnican vaakunakirja ja keksitty aateli',
      nimio: 'Vaakunakirja',
      vuosi: '1500–1600-luku',
      paikka: 'Fojnican fransiskaaniluostari, Fojnica',
      lat: 43.9612, lon: 17.8967,
      kortti: 'Amiraali tarvitsi aatelisarvon, joten hän tilasi itselleen sukupuun '
        + 'ja vaakunakirjan — molemmat tuoreeltaan keskiaikaisia. Temppu toimi, '
        + 'ja keksityt vaakunat päätyivät vuosisadoiksi ihan oikeiden '
        + 'historiankirjojen kuvitukseksi. Fojnican luostarissa säilynyt '
        + 'kappale on väärennös, josta tuli itsestään aito aarre.',
      teksti: 'Petar Ohmučević (k. 1599) oli ragusalaissyntyinen amiraali Espanjan '
        + 'laivastossa. Habsburgien ritarikuntiin pääsy vaati todistuksen '
        + 'kahdeksasta aatelisesta ja katolisesta isoisovanhemmasta, ja sellaista '
        + 'Ohmučevićillä ei ollut. Niinpä hän teetti vuosien 1584 ja 1594 välillä '
        + 'vaakunakirjan, joka todisti sukunsa aateluuden. Aatelisarvon hän sai '
        + '1594.\n\n'
        + 'Kirja sekoitti aitoja myöhäiskeskiaikaisia vaakunoita keksittyihin ja '
        + 'kokosi niistä \'Illyrian valtakunnan\', jonka rajat sattuivat käymään '
        + 'yksiin Espanjan etupiirin kanssa. Osa tunnuksista oli lainattu Virgil '
        + 'Solisin vuoden 1555 vaakunakirjasta, jossa ne olivat jo valmiiksi '
        + 'kuviteltuja. Alkuperäinen on kadonnut; vanhin kappale on vuoden 1595 '
        + 'Korjenić-Neorićin vaakunakirja, 168 lehteä, ja se on Zagrebin '
        + 'kansalliskirjastossa.\n\n'
        + 'Fojnican fransiskaaniluostarin kappaleessa on 139 vaakunaa. Nimiölehti '
        + 'ilmoittaa kyrillisin kirjaimin tekijäksi Stanislav Rubčićin ja vuodeksi '
        + '1340, kuningas Stefan Dušanin kunniaksi — vuosiluku on keksitty samalla '
        + 'kädellä kuin vaakunat. Latinankielinen lisäys vuodelta 1800 vakuuttaa '
        + 'kirjan olleen luostarissa muistamattomista ajoista.\n\n'
        + 'Radiohiiliajoitus antoi 2016 paksulle paperille vuodet 1635–1662 ja '
        + 'ohuelle 1695–1917; Aleksandr Solovjev ajoitti kirjan 1670-luvulle. '
        + 'Keksityistä vaakunoista tuli silti eteläslaavilaisen heraldiikan '
        + 'perusta. Fojnican kirja on niiden kolmen kappaleen joukossa, joista '
        + 'eteläslaavilaista klassista heraldiikkaa yhä tutkitaan — kaksi muuta '
        + 'ovat Korjenić-Neorić ja Lontoossa säilytettävä Illyrialainen '
        + 'vaakunakirja.',
      lahde: 'en-Wikipedia "Fojnica Armorial" ja en-Wikipedia "Korjenić-Neorić '
        + 'Armorial". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-fojnican-vaakunakirja-photo-v1.jpg`,
          selite: 'Nuori vieras etsii avoimesta kirjasta suvulleen kelpaavaa '
            + 'kilpeä, mutta munkki tarkkailee hänen kasvojaan enemmän kuin '
            + 'vaakunoita. Ikkunasyvennyksen noviisi hymyilee salaa: epävarma '
            + 'alkuperä ei estä käsikirjoitusta muuttumasta vuosisatojen mittaan '
            + 'aidoksi kulttuuriaarteeksi.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Bosnian Franciscans and the '
            + 'Fojnica Monastery Museum.',
          url: 'https://www.ejmanager.com/mnstemps/16/16-1498826562.pdf?t=1713733765',
        },
      ],
      visa: {
        kysymys: 'Miksi amiraali Petar Ohmučević teetti vaakunakirjan keksittyine '
          + 'vaakunoineen?',
        vaihtoehdot: [
          'Koristaakseen lippulaivansa kajuutan',
          'Todistaakseen sepitetyn aatelissukunsa aidoksi',
          'Myydäkseen sen keräilijöille Venetsiassa',
        ],
        oikea: 1,
      },
    },
    /*
     * Vijećnica (Sarajevon kaupungintalo), Sarajevo.
     * Lähde: en-Wikipedia "Bosnian Crisis" (tarkistettu 30.8.2026)
     */
    {
      id: 'bosnian-kriisi-1908',
      otsikko: 'Vuoden 1908 liittämiskriisi',
      nimio: 'Liittämiskriisi',
      vuosi: '1908–1909',
      paikka: 'Vijećnica (Sarajevon kaupungintalo), Sarajevo',
      lat: 43.8592, lon: 18.4342,
      kortti: 'Kaksi ulkoministeriä sopi linnassa hiljaiset kaupat: sinä saat '
        + 'maakunnan, minä salmet. Toinen ehti kassalle ensin, ja toinen '
        + 'huomasi maksaneensa tyhjästä. Euroopan lehdet saivat skandaalinsa, '
        + 'diplomaatit harmaita hiuksia — ja historia varoituksen siitä, mitä '
        + 'salaisista sopimuksista seuraa.',
      teksti: 'Venäjän ulkoministeri Aleksandr Izvolski kirjoitti 2. heinäkuuta '
        + '1908 Itävalta-Unkarin ulkoministerille Alois Aehrenthalille ja ehdotti '
        + 'kauppaa: Berliinin sopimusta muutettaisiin niin, että Wien saisi '
        + 'Bosnian ja Hertsegovinan ja Venäjä sotalaivoilleen kulkuoikeuden '
        + 'Konstantinopolin salmiin. Bosniaa Itävalta-Unkari oli hallinnut jo 1878 '
        + 'lähtien, mutta omistaja oli paperilla sulttaani.\n\n'
        + 'Ministerit tapasivat 16. syyskuuta Buchlaun linnassa Määrissä, kreivi '
        + 'Leopold Berchtoldin kotona. Keskustelu kesti kuusi tuntia, eikä '
        + 'pöytäkirjaa pidetty. Izvolski lupasi kirjoittaa muistion; sitä ei ole '
        + 'koskaan löytynyt. Aehrenthal uskoi saaneensa Venäjän siunauksen, '
        + 'Izvolski uskoi saavansa tiedon ennen kuin mitään tapahtuisi.\n\n'
        + 'Wien ilmoitti liittämisestä 5. lokakuuta 1908, samana päivänä kun '
        + 'Bulgaria julistautui itsenäiseksi. Izvolski vaati kansainvälistä '
        + 'konferenssia, Lontoo puhui sopimusrikkomuksesta, ja vihaisimmin reagoi '
        + 'Serbia, joka vaati korvaukseksi maakaistaletta ja jäi ilman. Berliinin '
        + 'sopimusta muutettiin huhtikuussa 1909 vastaamaan tapahtunutta.\n\n'
        + 'Osmanien vastaus oli boikotti: itävaltalaisia tavaroita kieltäydyttiin '
        + 'ostamasta Istanbulista Egyptiin asti, ja tuonti Itävalta-Unkarista '
        + 'putosi neljänneksellä. Helmikuussa 1909 Wien maksoi Bosnian '
        + 'valtionmaista 2,2 miljoonaa osmanien liiraa. Boikotin laskuksi on '
        + 'arvioitu yli sata miljoonaa kruunua. Serbia oli sillä välin '
        + 'liikekannallepannut armeijansa ja vaatinut liittämisen peruuttamista; '
        + 'diplomaattinen voitto jäi Wienille, mutta naapurisuhteet eivät '
        + 'toipuneet.',
      lahde: 'en-Wikipedia "Bosnian Crisis". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-bosnian-kriisi-1908-photo-v1.jpg`,
          selite: 'Nuori latoja kuiskaa julistuksen merkityksen isänsä korvaan, '
            + 'kun keisarillinen virkamies lukee uutisen Vijećnican portailta. '
            + 'Väkijoukossa joku taputtaa ja toinen puristaa koriaan: tavallisten '
            + 'sarajevolaisten tulevaisuus on muuttunut neuvotteluissa, joihin '
            + 'heitä ei kutsuttu.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Austrian State Archives '
            + '— Bosnia annexation files.',
          url: 'https://www.archivinformationssystem.at/detail.aspx?ID=5454260',
        },
      ],
      visa: {
        kysymys: 'Mitä Venäjän ulkoministeri tavoitteli Buchlaun salaisissa '
          + 'neuvotteluissa 1908 vastineeksi Bosnian liittämisestä?',
        vaihtoehdot: [
          'Sotalaivoille kulkuoikeutta Turkin salmiin',
          'Osuutta Bosnian kaivoksista',
          'Itävallan tukea Puolan jakoon',
        ],
        oikea: 0,
      },
    },
  ],
  CHE: [
    /*
     * Anna Göldi -museo, Ennenda (Glarus).
     * Lähde: en.wikipedia.org: Anna Göldi
     */
    {
      id: 'anna-goldin-tapaus',
      otsikko: 'Anna Göldi — Euroopan viimeinen \'noita\'',
      nimio: 'Anna Göldi',
      vuosi: '1782 (maineenpalautus 2008)',
      paikka: 'Anna Göldi -museo, Ennenda (Glarus)',
      lat: 47.0333, lon: 9.0833,
      kortti: 'Valistusfilosofit kirjoittivat jo tietosanakirjoja, kun Glarus '
        + 'tuomitsi palvelijattaren noituudesta. Aikalainen historioitsija '
        + 'antoi tuomiolle nimen, joka jäi kieleen: oikeusmurha. Virallinen '
        + 'anteeksipyyntö ehti perille 226 vuotta myöhässä — parempi sekin kuin '
        + 'ei koskaan.',
      teksti: 'Anna Göldi syntyi 1734 Sennwaldissa kahdeksanlapsiseen perheeseen '
        + 'ja meni palvelukseen 18-vuotiaana. Vuonna 1780 hän tuli piiaksi lääkäri '
        + 'Johann Jakob Tschudin taloon Glarusiin hoitamaan talon viittä tytärtä.\n\n'
        + 'Göldi teki isännästään kantelun ahdistelusta kantonin viranomaisille, '
        + 'joiden joukossa istui Tschudin sukua. Pian sen jälkeen Tschudi '
        + 'ilmoitti, että piika oli yliluonnollisin keinoin saanut neuloja '
        + 'ilmestymään tyttären leipään ja maitoon. Göldi ehti paeta, mutta '
        + 'Glarusin viranomaiset kuuluttivat 9. helmikuuta 1782 Zürcher '
        + 'Zeitungissa palkkion hänen kiinniottamisestaan.\n\n'
        + 'Kidutettuna Göldi tunnusti tehneensä liiton paholaisen kanssa, joka oli '
        + 'ilmestynyt hänelle mustana koirana, ja perui tunnustuksensa heti '
        + 'kidutuksen loputtua. Syytteeksi kirjattiin myrkytys eikä noituus, '
        + 'vaikka laki ei säätänyt kuolemantuomiota myrkytyksestä, joka ei '
        + 'tappanut. Oikeuden pöytäkirjat hävitettiin. Tuomio pantiin täytäntöön '
        + 'mestaamalla 13. kesäkuuta 1782.\n\n'
        + 'Historioitsija August Ludwig von Schlözer kutsui tuomiota '
        + 'oikeusmurhaksi: viattoman surmaamiseksi harkiten ja pyhän '
        + 'oikeudenkäytön koko loistossa. Sveitsin parlamentti tunnusti '
        + 'oikeusmurhan 2007, ja Glarusin kantoni palautti maineen 27. elokuuta '
        + '2008 laittoman oikeudenkäynnin perusteella. Oikeustalon seinällä palaa '
        + 'vuodesta 2014 kaksi lamppua hänen muistokseen, ja Ennendaan avattiin '
        + 'Anna Göldin museo elokuussa 2017. Tarina oli tullut takaisin jo sitä '
        + 'ennen: Eveline Haslerin romaani ilmestyi 1982, kaksisataa vuotta '
        + 'mestauksen jälkeen.',
      lahde: 'en-Wikipedia "Anna Göldi". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-anna-goldin-tapaus-photo-v1.jpg`,
          selite: 'Anna Göldi seisoo yksin pöydän edessä ja pakottaa raatimiehet '
            + 'kohtaamaan katseensa. Nuori kirjuri epäröi kynä paperilla: '
            + 'kuulustelun pöytäkirjasta tulee osa järjestelmää, jonka Glarusin '
            + 'kantoni tunnustaa 226 vuotta myöhemmin oikeusmurhaksi.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Anna Göldi Museum '
            + '— permanent exhibition.',
          url: 'https://annagoeldimuseum.ch/images/2026/Oeffentlich_Dauerausstellung.pdf',
        },
      ],
      visa: {
        kysymys: 'Milloin Glarusin kantoni palautti Anna Göldin maineen '
          + 'virallisesti?',
        vaihtoehdot: [
          'Heti Ranskan vallankumouksen jälkeen 1789',
          'Sveitsin liittovaltion synnyttyä 1848',
          'Vasta vuonna 2008',
        ],
        oikea: 2,
      },
    },
    /*
     * Väärän rahan museo (Musée de la Fausse Monnaie), Saillon.
     * Lähde: fr.wikipedia.org: Joseph-Samuel Farinet
     */
    {
      id: 'farinet-alppien-vaararahanpainaja',
      otsikko: 'Farinet — väärän rahan Robin Hood',
      nimio: 'Farinet',
      vuosi: '1869–1880',
      paikka: 'Väärän rahan museo (Musée de la Fausse Monnaie), Saillon',
      lat: 46.1667, lon: 7.1833,
      kortti: 'Legendan mukaan Farinet\'n väärillä kolikoilla maksettiin '
        + 'Valais\'ssa auliimmin kuin oikeilla — harvinainen maine '
        + 'rahanväärentäjälle. Poliisi jahtasi '
        + 'miestä vuosikausia vuorilla, joilla jokainen paimen katsoi toiseen '
        + 'suuntaan. Nykyään väärentäjällä on oma museo ja viinitarha; '
        + 'keskuspankeilla ei kummassakaan sananvaltaa.',
      teksti: 'Joseph-Samuel Farinet syntyi 1845 Saint-Rhémy-en-Bossesissa '
        + 'Aostanlaaksossa, Suuren Sankt Bernhardin solan yläpuolella. Vuonna 1869 '
        + 'hänet tuomittiin poissaolevana 18 kuukaudeksi varkauksista Aostassa. '
        + 'Kaksi vuotta myöhemmin, Valais\'n kantonipankin kaaduttua, hänet '
        + 'pidätettiin Martigny-Bourgissa ja tuomittiin neljäksi vuodeksi '
        + 'rahanväärennyksestä.\n\n'
        + 'Farinet väärensi vain yhtä kolikkoa, kahdenkymmenen centimen '
        + 'billon-rahaa. Sen metalliseos oli niin kovaa, että kolikosta sai '
        + 'painettua jäljen valkohehkuiseen teräkseen, ja leimasimella syntyi '
        + 'uusia. Kahdenkymmenen centimen arvo vastasi noin 1,85:tä vuoden 2010 '
        + 'frangia — pikkurahaa, jota kukaan ei tutkinut kahdesti.\n\n'
        + 'Hän karkasi vankilasta useasti, piileskeli ja työskenteli luolassa '
        + 'Bransonin yläpuolella ja sai kylistä suojelijoita. Puolustajaksi '
        + 'määrättiin asianajaja ja kansallisneuvos Victor de Chastonay. '
        + 'Poissaolotuomioita kertyi useita, viimeinen 17. heinäkuuta 1879.\n\n'
        + 'Farinet löytyi kuolleena 17. huhtikuuta 1880 Salentsen rotkon pohjalta. '
        + 'Huhu kertoi poliisin luodista; ruumiintarkastuspöytäkirjan mukaan '
        + 'kuolinsyy oli kallonmurtuma, ja asiakirja on nähtävillä Saillonin '
        + 'väärän rahan museossa. Kirkon kellotornin juuressa oleva hauta '
        + 'rakennettiin vuoden 1939 elokuvaa varten; todellista hautapaikkaa ei '
        + 'tiedetä. Kuvan jalosta väärentäjästä, jonka rahat olivat oikeita '
        + 'parempia, loi vasta C. F. Ramuzin romaani 1932 — siitä on peräisin myös '
        + 'nimitys Alppien Robin Hood, jolla Valais\'ssa yhä muistetaan mies, jota '
        + 'poliisi jahtasi vuosikausia vuorilla.',
      lahde: 'fr-Wikipedia "Joseph-Samuel Farinet". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-farinet-alppien-vaararahanpainaja-photo-v1.jpg`,
          selite: 'Farinet pysäyttää vasaran kesken lyönnin, kun leipää tuonut '
            + 'viininviljelijä vilkaisee vuoripolulle. Kaksi santarmia on jo '
            + 'näkyvissä, mutta naisen ilme kertoo, kumman puolella kylä tänään on '
            + '— ennen kuin myöhempi legenda tekee väärentäjästä Alppien Robin '
            + 'Hoodin.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Association Valaisanne des '
            + 'Musées — Musée de la Fausse Monnaie.',
          url: 'https://www.musees-vs.ch/musee-de-la-fausse-monnaie/',
        },
      ],
      visa: {
        kysymys: 'Miksi Valais\'n kansa suojeli rahanväärentäjä Farinet\'ta?',
        vaihtoehdot: [
          'Hän lahjoi kylänvanhimmat kullalla',
          'Häntä pidettiin vallan uhmaajana ja köyhien puolustajana',
          'Hän oli kantonin hallituksen salainen agentti',
        ],
        oikea: 1,
      },
    },
    /*
     * Zürich (Scheuchzerin koti- ja työkaupunki).
     * Lähde: en.wikipedia.org: Andrias scheuchzeri
     */
    {
      id: 'vedenpaisumuksen-todistaja',
      otsikko: 'Homo diluvii testis — salamanteri joka luultiin syntiseksi',
      nimio: 'Homo diluvii',
      vuosi: '1726–1811',
      paikka: 'Zürich (Scheuchzerin koti- ja työkaupunki)',
      lat: 47.3744, lon: 8.5411,
      kortti: 'Tutkija katsoi kiveä ja näki vedenpaisumukseen hukkuneen syntisen; '
        + 'Cuvier katsoi samaa kiveä ja näki jättiläissalamanterin. Kivi ei '
        + 'ollut muuttunut — katsoja oli. Lajin tieteellinen nimi ikuistaa '
        + 'kohteliaasti sekä erehdyksen että erehtyjän.',
      teksti: 'Johann Jakob Scheuchzer kuvasi 1726 kirjassaan Lithographia '
        + 'Helvetica Öhningenistä löytyneen fossiilin nimellä Homo diluvii testis, '
        + 'vedenpaisumuksen todistava ihminen. Kivessä oli metrin mittainen '
        + 'luuranko, jolta puuttuivat häntä ja takaraajat, ja se muistutti '
        + 'riittävästi ihmislasta, jotta tulkinta kävi järkeen.\n\n'
        + 'Epäilijöitä tuli hitaasti. Johannes Gessner arveli 1758 kyseessä olevan '
        + 'jättimäisen monnin ja Petrus Camper 1787 liskon — matelijoiden ja '
        + 'sammakkoeläinten eroa ei tuolloin tehty. Martin van Marum osti '
        + 'fossiilin 1802 Scheuchzerin pojanpojalta Teylerin museoon Haarlemiin '
        + 'neljällätoista louisdorilla ja piti sitäkin monnina.\n\n'
        + 'Georges Cuvier kirjoitti 1809, että kivessä ei ole muuta kuin '
        + 'salamanteri, jättimäistä kokoa ja tuntematonta lajia. Vuonna 1811 hän '
        + 'matkusti Haarlemiin ja antoi apulaisensa Charles Léopold Laurillardin '
        + 'naputella kiveä varovasti auki: alta paljastuivat etujalat, ja asia oli '
        + 'selvä. Kiven värierosta näkee yhä, minkä verran Scheuchzer katsoi ja '
        + 'minkä verran Cuvier.\n\n'
        + 'Friedrich Holl nimesi lajin 1831 Scheuchzerin mukaan, ja Johann Jakob '
        + 'von Tschudi antoi kuusi vuotta myöhemmin suvulle nimen Andrias, ihmisen '
        + 'kuva. Erehdys jäi siis kahteen kertaan tieteen nimistöön. Fossiili on '
        + 'yhä Teylerin museossa alkuperäisessä vitriinissään.',
      lahde: 'en-Wikipedia "Andrias scheuchzeri". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-vedenpaisumuksen-todistaja-photo-v1.jpg`,
          selite: 'Kaivertajan terä pysähtyy, kun Johann Jakob Scheuchzer '
            + 'osoittaa kivessä kalloa ja nimeää sen vedenpaisumuksessa '
            + 'kuolleeksi ihmiseksi. Kahdeksankymmentäviisi vuotta myöhemmin '
            + 'Cuvier näkee samassa hahmossa jättiläissalamanterin — erehdys '
            + 'syntyy katsojan varmuudesta, ei muuttuneesta kivestä.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Swiss National Museum '
            + '— A Witness to the Deluge; fossiilin muoto, vuoden 1726 '
            + 'kuparipiirros ja Scheuchzerin näköisyys ovat arkistolähteistä, '
            + 'kaivertajan läsnäolo ja keskustelu dramatisoituja.',
          url: 'https://blog.nationalmuseum.ch/en/2024/07/a-witness-to-the-deluge/',
        },
      ],
      visa: {
        kysymys: 'Mikä Scheuchzerin \'vedenpaisumuksen todistaja\' todellisuudessa '
          + 'oli?',
        vaihtoehdot: [
          'Jättiläissalamanterin fossiili',
          'Varhaisen ihmisapinan luuranko',
          'Kalliota vasten painunut suurikokoinen kala',
        ],
        oikea: 0,
      },
    },
  ],
  CZE: [
    /*
     * Kansallismuseo, Praha (käsikirjoitusten säilytyspaikka).
     * Lähde: en-Wikipedia: Manuscripts of Dvůr Králové and Zelená Hora
     */
    {
      id: 'kuninkaanhovin-kasikirjoitukset',
      otsikko: 'Dvůr Královén ja Zelená Horan käsikirjoitusväärennökset',
      nimio: 'Dvůr Králové',
      vuosi: '1817–1818, kumottu 1886',
      paikka: 'Kansallismuseo, Praha (käsikirjoitusten säilytyspaikka)',
      lat: 50.0793, lon: 14.431,
      kortti: 'Kansakunta sai muinaiset sankarirunonsa kirkontornista, ja vain '
        + 'ilonpilaaja kysyi, miksi muinaistšekki kuulosti epäilyttävän '
        + 'tuoreelta. Masaryk kysyi — ja hänestä tuli hetkeksi Böömin vihatuin '
        + 'mies. Myöhemmin hänestä tuli presidentti, mikä kertoo jotain '
        + 'lohdullista totuuden pitkästä matkasta.',
      teksti: 'Václav Hanka ilmoitti löytäneensä 1817 Dvůr Královén Johannes '
        + 'Kastajan kirkosta käsikirjoituksen, jossa oli neljätoista '
        + 'muinaistšekiksi kirjoitettua runoa: kuusi eeposta, kaksi lyyristä '
        + 'eeposta ja kuusi rakkauslaulua. Toinen käsikirjoitus, Zelená Horan, '
        + 'lähetettiin 1818 nimettömänä Böömin museolle. Lähettäjä paljastui vasta '
        + '1858 kartanon tulojen hoitajaksi Josef Kovářiksi.\n\n'
        + 'Ensimmäinen otettiin vastaan suurena löytönä, mutta toista Josef '
        + 'Dobrovský sanoi heti väärennökseksi, ja Jernej Kopitar nimesi tekijäksi '
        + 'Hankan. Puolustajien joukossa olivat sanakirjantekijä Josef Jungmann, '
        + 'kirjailija František Čelakovský, historioitsija František Palacký ja '
        + 'Karel Jaromír Erben. Palacký kirjoitti osan Böömin historiastaan näiden '
        + 'runojen varaan.\n\n'
        + 'Ratkaisu tuli 1880-luvulla. Kielitieteilijä Jan Gebauer osoitti '
        + 'helmikuussa 1886 Tomáš Masarykin Athenaeum-lehdessä käsikirjoitukset '
        + 'sepitteiksi, ja Masaryk esitti myöhemmässä numerossa runomitta- ja '
        + 'kielioppitodisteet siitä, että runot oli väännetty nykytšekistä '
        + 'muinaistšekiksi.\n\n'
        + 'Kiista jatkui silti yli vuosisadan, sillä runoista oli tullut '
        + 'kansallisen omakuvan osa: niiden piti todistaa tšekkiläisen runouden '
        + 'Nibelungenlaulua vanhemmaksi ja yhteiskunnan valmiiksi '
        + 'demokraattiseksi. Väärentäjinä pidetään Hankaa ja hänen ystäväänsä ja '
        + 'kämppäkumppaniaan Josef Lindaa. Kumpikaan ei tunnustanut, eikä '
        + 'kiistatonta todistetta ole. Sepitetyt sankarit elävät silti: Záboj ja '
        + 'Slavoj, kaksi keksittyä soturirunoilijaa, tunnetaan Böömissä yhä '
        + 'paremmin kuin runojen tekijät.',
      lahde: 'en-Wikipedia "Manuscripts of Dvůr Králové and Zelená Hora". '
        + 'Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-kuninkaanhovin-kasikirjoitukset-photo-v1.jpg`,
          selite: 'Nuori latoja jää oviaukkoon kuuntelemaan, kun 36-vuotias '
            + 'Masaryk pyytää kollegoitaan asettamaan kansallisen ylpeyden '
            + 'todisteiden jälkeen. Käsikirjoitusten aitouden epäily teki '
            + 'professorista hetkeksi vihollisen, mutta juuri huoneen hiljainen '
            + 'pelko kertoo, miksi kysymys oli niin vaikea esittää.',
          lahde: 'Matkakirjan havainnekuva. Faktat: National Museum, Praha '
            + '— T. G. Masaryk ja Athenaeum-lehden käsikirjoituskiista 1886; '
            + 'Masarykin näköisyys ja käsikirjoituksen mittakaava ovat valokuva- '
            + 'ja esinereferensseistä, toimitushuoneen kohtaaminen on '
            + 'dramatisoitu.',
          url: 'https://muzeum3000.nm.cz/zajimavosti/vynaseni-do-nebes-vlaceni-blatem-t-g-masaryk',
        },
      ],
      visa: {
        kysymys: 'Kuka johti taistelua käsikirjoitusten paljastamiseksi '
          + 'väärennöksiksi 1886?',
        vaihtoehdot: [
          'Tomáš Masaryk, myöhempi presidentti',
          'Václav Hanka, käsikirjoitusten löytäjä',
          'Itävallan keisarin sensori',
        ],
        oikea: 0,
      },
    },
    /*
     * Hněvínin linna, Most (Kelleyn viimeinen vankila).
     * Lähde: en-Wikipedia: Edward Kelley
     * Korjattu 401 m: en-Wikipedia "Hněvín" -koordinaatit.
     */
    {
      id: 'kelley-alkemistihuijari',
      otsikko: 'Edward Kelley — keisarin kultaa luvannut alkemisti',
      nimio: 'Edward Kelley',
      vuosi: '1586–1597',
      paikka: 'Hněvínin linna, Most (Kelleyn viimeinen vankila)',
      lat: 50.5203, lon: 13.6336,
      kortti: 'Kelley myi keisarille tuotetta, jota ei ollut olemassa: huomenna '
        + 'valmistuvaa kultaa. Liiketoimintamallin heikkous paljastui siinä '
        + 'vaiheessa, kun keisari alkoi odottaa toimitusta linnanmuurien kera. '
        + 'Alkemistin ura päättyi tornihuoneeseen, josta paraskaan tinktuura ei '
        + 'auttanut ulos.',
      teksti: 'Edward Kelley syntyi Worcesterissä 1555. Kertomusten mukaan hän oli '
        + 'ennen kuuluisuuttaan joutunut Lancasterissa häpeäpaaluun väärennyksestä '
        + 'ja menettänyt korvansa; siksi hän piti aina lakkia päässään. Vuonna '
        + '1582 hän tarjoutui John Deelle meedioksi, joka näkee enkelit '
        + 'kristallissa, ja seitsemän vuotta kaksikko piti istuntojaan.\n\n'
        + 'Vuonna 1583 he lähtivät perheineen Keski-Eurooppaan puolalaisen '
        + 'ylimyksen Olbracht Łaskin mukana. Deetä kiinnostivat enkelit, Kelleytä '
        + 'alkemia. Rosenbergin suvun suojeluksessa Kelley sai tiloja ja suuria '
        + 'rahasummia, ja kun hän oli saanut keisari Rudolf II:n uskomaan '
        + 'kullanteon alkavan, keisari löi hänet ritariksi 23. helmikuuta 1590.\n\n'
        + 'Toukokuussa 1591 sama keisari vangitutti hänet Křivoklátin linnaan '
        + 'Prahan ulkopuolelle. Virallinen syy oli kaksintaistelussa surmattu '
        + 'virkamies Jiří Hunkler; toinen syy lienee ollut se, ettei kullantekijä '
        + 'ehtisi kadota ennen ensimmäistä toimitusta. Vuonna 1595 Kelley suostui '
        + 'jatkamaan työtään ja pääsi vapaaksi. Kun kultaa ei kuulunut, hän joutui '
        + 'uudelleen vankeuteen, tällä kertaa Hněvínin linnaan Mostiin.\n\n'
        + 'Kelley kuoli vankina vuodenvaihteessa 1597–1598 vammoihin, jotka hän '
        + 'sai pakoyrityksessä: erään aikalaiskertomuksen mukaan hän putosi '
        + 'muurilta ja mursi jalkansa. Vankilasta käsin hän omisti keisarille '
        + 'kolme alkemistista tutkielmaa. Kelleyn nimiin pannaan myös enkelien '
        + 'kieli, jota kutsutaan enokiaaniksi.',
      lahde: 'en-Wikipedia "Edward Kelley". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-kelley-alkemistihuijari-photo-v1.jpg`,
          selite: 'Nuori linnanvartija yrittää olla katsomatta tyhjää upokasta, '
            + 'kun keisarin lähettiläs odottaa Edward Kelleyltä luvattua kultaa. '
            + 'Kelleyn vankeus alkoi kielletyn kaksintaistelun jälkeen, mutta '
            + 'portit pysyivät kiinni myös siksi, ettei Rudolf II halunnut '
            + 'päästää ‘kullantekijää’ pakoon ennen tuloksia.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Křivoklátin valtionlinna '
            + '— Edward Kelley; Huderka-torni, vaatetus ja henkilön näköisyys '
            + 'ovat lähdeankkuroituja, epäonnistunut upokas ja lähettilään '
            + 'odotus dramatisoituja.',
          url: 'https://www.hrad-krivoklat.cz/cs/o-hradu/vyznamne-osobnosti/edward-kelley',
        },
      ],
      visa: {
        kysymys: 'Miksi keisari Rudolf II vangitutti alkemisti Edward Kelleyn?',
        vaihtoehdot: [
          'Kelley yritti myrkyttää keisarin',
          'Kaksintaistelun takia — ja jottei kullantekijä karkaisi ennen '
            + 'tuloksia',
          'Kelley oli paljastunut Englannin vakoojaksi',
        ],
        oikea: 1,
      },
    },
    /*
     * Týnin kirkko, Praha (Brahen hauta).
     * Lähde: en-Wikipedia: Tycho Brahe
     */
    {
      id: 'tycho-brahen-kuolinmysteeri',
      otsikko: 'Tycho Brahen kuolinmysteeri ja myrkytyshuhut',
      nimio: 'Tychon mysteeri',
      vuosi: '1601, haudanavaukset 1901 ja 2010',
      paikka: 'Týnin kirkko, Praha (Brahen hauta)',
      lat: 50.0879, lon: 14.4225,
      kortti: 'Neljäsataa vuotta hyvä juoru voitti lääkärintodistuksen: '
        + 'tähtitieteilijä myrkytettiin, ja tekijä oli tietysti kollega. Sitten '
        + 'kaksi haudanavausta ja yksi laboratorio pilasivat kertomuksen — '
        + 'kuolinsyy oli kohtalokas kohteliaisuus pitopöydässä. Sivutuotteena '
        + 'selvisi, että legendaarinen hopeanenä oli messinkiä. Huhut kestävät '
        + 'huonosti punnitusta.',
      teksti: 'Tycho Brahe menetti 20-vuotiaana osan nenästään kaksintaistelussa, '
        + 'jonka hän kävi pikkuserkkunsa Manderup Parsbergin kanssa. Riita oli '
        + 'alkanut kihlajaisissa siitä, kumpi oli parempi matemaatikko. '
        + 'Loppuikänsä Brahe käytti nenäproteesia, jota pidettiin hopeasta ja '
        + 'kullasta tehtynä.\n\n'
        + 'Prahassa lokakuussa 1601 Brahe sairastui kutsujen jälkeen '
        + 'virtsatievaivaan. Keplerin silminnäkijäkertomuksen mukaan hän ei '
        + 'poistunut pöydästä helpottamaan oloaan, koska se olisi rikkonut '
        + 'seurustelutapoja. Yksitoista päivää myöhemmin, 24. lokakuuta, hän kuoli '
        + '54-vuotiaana. Aikalaislääkäri arveli munuaiskiveä, mutta vuoden 1901 '
        + 'haudanavauksessa kiviä ei löytynyt.\n\n'
        + '1990-luvun tutkimuksissa hiuksista löytyi elohopeaa, ja epäily kääntyi '
        + 'myrkytykseen. Epäiltyjen listalle päätyivät avustaja Johannes Kepler, '
        + 'joka olisi saanut laboratorion ja havaintoaineiston käyttöönsä, ja '
        + 'serkku Erik Brahe kuningas Kristian IV:n toimeksi saaneena.\n\n'
        + 'Marraskuussa 2010 tanskalais-tšekkiläinen ryhmä avasi haudan uudelleen '
        + 'ja otti näytteet luusta, hiuksista ja vaatteista. Vuonna 2012 se '
        + 'ilmoitti, ettei elohopeaa ole läheskään tappavaa määrää eikä muitakaan '
        + 'myrkkyjä: murha on mahdoton. Rostockissa tutkitut vuoden 1901 hiukset '
        + 'kertoivat saman — elohopeaa oli vain hiuksen pinnalla, luultavasti '
        + 'alkemistin työhuoneen pölystä. Samalla selvisi, että kuuluisa '
        + 'nenäproteesi oli messinkiä. Kuolinvuoteellaan Brahe oli pyytänyt '
        + 'Kepleriä saattamaan Rudolfiiniset taulukot loppuun — sen Kepler teki, '
        + 'joskin omalla tavallaan.',
      lahde: 'en-Wikipedia "Tycho Brahe". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-tycho-brahen-kuolinmysteeri-photo-v1.jpg`,
          selite: 'Nuori palveluspoika huomaa Tycho Brahen kivun ennen muita, '
            + 'mutta ei uskalla rikkoa juhlapöydän sääntöjä hänen puolestaan. '
            + 'Astronomi kuolee yksitoista päivää myöhemmin; tutkimukset '
            + 'sulkevat pois tappavan elohopeamyrkytyksen, mutta tarkka '
            + 'kuolinsyy jää yhä avoimeksi.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Aarhus University — '
            + 'Mercury poisoning ruled out; Brahen ikä, näköisyys ja tunnettu '
            + 'kertomus pidätellystä virtsaamisesta ovat tutkimuslähteistä, '
            + 'palveluspoika, huone ja eleet dramatisoituja. Kuva ei väitä '
            + 'myrkytystä eikä ratkaise kuolinsyytä.',
          url: 'https://projekter.au.dk/en/tycho-brahe/pressreleases/mercury-poisoning-ruled-out-as-cause-of-tycho-brahes-death',
        },
      ],
      visa: {
        kysymys: 'Mitä Tycho Brahen vuoden 2010 haudanavaus paljasti '
          + 'myrkytyshuhuista?',
        vaihtoehdot: [
          'Merkkejä elohopeamyrkytyksestä ei ollut',
          'Elohopeaa löytyi tappava määrä',
          'Haudassa ei ollutkaan Brahen ruumis',
        ],
        oikea: 0,
      },
    },
  ],
  DEU: [
    /*
     * Würzburgin yliopisto.
     * Lähde: en.wikipedia.org: Beringer's Lying Stones
     */
    {
      id: 'beringerin-valhekivet',
      otsikko: 'Würzburgin valhekivet — fossiileja Jumalan nimikirjoituksella',
      nimio: 'Valhekivet',
      vuosi: '1725–1726',
      paikka: 'Würzburgin yliopisto',
      lat: 49.7881, lon: 9.9353,
      kortti: 'Professori löysi kiviä, joissa oli valmiit kuvat linnuista, '
        + 'hämähäkeistä ja tähdenlennoista — ja piti jumalallisena johdatuksena '
        + 'sitä, ettei kukaan muu ollut sattunut samalle kukkulalle. Kollegat '
        + 'olivat teettäneet joka ikisen. Kirja ehti painoon ennen kuin kukaan '
        + 'kehtasi kertoa.',
      teksti: 'Johann Bartholomäus Adam Beringer oli Würzburgin yliopiston '
        + 'lääketieteellisen tiedekunnan dekaani ja Julius-sairaalan ylilääkäri. '
        + 'Vuonna 1725 hän palkkasi kolme nuorukaista — 17-vuotiaan Christian '
        + 'Zängerin sekä veljekset Niklaus ja Valentin Hehnin — etsimään kanssaan '
        + 'outoja kiviä Würzburgin ympäristöstä.\n\n'
        + 'Maantieteen ja matematiikan professori J. Ignatz Roderique, yliopiston '
        + 'kirjastonhoitaja Johann Georg von Eckhart ja paikallinen paroni von Hof '
        + 'pitivät Beringeriä ylimielisenä. He teettivät kalkkikiveen veistettyjä '
        + 'liskoja, sammakoita ja hämähäkkejä verkkoineen, osaan Jumalan nimen '
        + 'heprean, latinan ja arabian kirjaimin, ja kylvivät ne Eibelstadtin '
        + 'vuorelle, jossa Beringer kävi keräämässä.\n\n'
        + 'Beringer julkaisi löydöistään kuvitetun kirjan Lithographiae '
        + 'Wirceburgensis vuonna 1726. Hän punnitsi siinä useita selityksiä: '
        + 'kivettyneitä eliöitä, luonnon omaa muovausvoimaa, jumalallista '
        + 'luomistyötä ja pakanoiden kaiverruksia — viimeisen hän hylkäsi, koska '
        + 'pakanat eivät tunteneet Jumalan nimeä. Taltan jäljet hän huomasi ja '
        + 'kirjoitti niistä itse.\n\n'
        + 'Kun totuus valkeni, Beringer haastoi tekijät oikeuteen ja voitti. '
        + 'Roderique ja Eckhart menettivät virkansa, Roderique karkotettiin '
        + 'Würzburgista, ja Eckhart menetti oikeutensa käyttää kirjastoa ja '
        + 'arkistoa, joten hänen oma tutkimustyönsä jäi kesken. Kiviä kutsutaan '
        + 'yhä valhekiviksi, ja osa niistä on Oxfordin yliopistomuseon ja Teylerin '
        + 'museon kokoelmissa.',
      lahde: 'en-Wikipedia "Beringer\'s Lying Stones". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-beringerin-valhekivet-photo-v1.jpg`,
          selite: 'Louhoksen poika ymmärtää liian nopeasti, miksi oppineiden '
            + 'miesten kori on täynnä sammakoiksi ja tähdiksi kaiverrettuja '
            + 'kiviä. Johann Bartholomew Beringer julkaisee löydöt vuonna '
            + '1726 luonnon ihmeinä; pilasta tulee tieteen historian kuuluisa '
            + 'varoitus, vaikka sen yksityiskohdista kerrotaan myöhemmin '
            + 'ristiriitaisesti.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Würzburg University '
            + 'Library — Lügensteine; kivien muodot ja löytöpaikka ovat '
            + 'lähdepohjaisia, poika, miesten henkilöllisyydet ja kohtaaminen '
            + 'dramatisoituja, sillä tapauksen myöhempi kertomus sisältää '
            + 'myös legendaa.',
          url: 'https://www.bibliothek.uni-wuerzburg.de/ueber-uns/veranstaltungen/fakt-fake/luegensteine/',
        },
      ],
      visa: {
        kysymys: 'Ketkä olivat kätkeneet väärennetyt \'fossiilit\' Beringerin '
          + 'löydettäviksi?',
        vaihtoehdot: [
          'Hänen opiskelijansa kostoksi hylätyistä tenteistä',
          'Kiertelevä kivenhakkaaja rahan toivossa',
          'Hänen omat yliopistokollegansa pilkatakseen häntä',
        ],
        oikea: 2,
      },
    },
    /*
     * Köpenickin raatihuone, Berliini.
     * Lähde: en.wikipedia.org: Wilhelm Voigt
     */
    {
      id: 'kopenickin-kapteeni',
      otsikko: 'Köpenickin kapteeni — univormu joka komensi kaupunkia',
      nimio: 'Valekapteeni',
      vuosi: '1906',
      paikka: 'Köpenickin raatihuone, Berliini',
      lat: 52.4455, lon: 13.5745,
      kortti: 'Suutari osti käytetyn kapteenin univormun, ja Preussin sotilaskuri '
        + 'hoiti loput: sotilaat tottelivat, pormestari antautui, kassa aukesi. '
        + 'Kukaan ei pyytänyt papereita — takki riitti. Keisarikin nauroi, '
        + 'tosin vasta armahduspaperit allekirjoitettuaan.',
      teksti: 'Friedrich Wilhelm Voigt oli suutari, joka oli vuosien 1864 ja 1891 '
        + 'välillä saanut varkauksista, väärennyksistä ja murroista yhteensä 25 '
        + 'vuotta vankeutta. Hän vapautui 12. helmikuuta 1906, ja elokuussa '
        + 'poliisi karkotti hänet Berliinistä pelkän rikosrekisterin perusteella. '
        + 'Hän jäi silti kaupunkiin ilman kirjoja.\n\n'
        + '16. lokakuuta 1906 Voigt puki ylleen kapteenin univormun, jonka hän oli '
        + 'ostanut käytettynä osissa eri liikkeistä ja koekäyttänyt sotilaiden '
        + 'edessä. Kasarmin luona hän pysäytti neljä krenatööriä ja kersantin, '
        + 'keräsi lisää miehiä ampumaradalta ja vei joukkonsa junalla Köpenickiin. '
        + 'Kaupungintalo miehitettiin, poliisia käskettiin huolehtimaan '
        + 'järjestyksestä ja postissa estettiin puhelut Berliiniin tunnin ajaksi.\n\n'
        + 'Voigt pidätti kaupunginkassanhoitaja von Wiltbergin ja pormestari Georg '
        + 'Langerhansin väitetyn korruption vuoksi ja takavarikoi kassasta 4 002 '
        + 'markkaa ja 37 penniä. Kuitin hän allekirjoitti entisen vanginvartijansa '
        + 'nimellä. Pidätetyt lähetettiin vaunuilla Berliiniin kuulusteltaviksi, '
        + 'loput sotilaat käskettiin seisomaan puoli tuntia paikallaan, ja '
        + 'kapteeni vaihtoi asemalla siviilivaatteet ylleen.\n\n'
        + 'Kymmenen päivää myöhemmin entinen sellitoveri vinkkasi poliisille '
        + 'palkkiotoivossa. Voigt sai neljä vuotta vankeutta väärennyksestä, '
        + 'virkavallan anastuksesta ja vapaudenriistosta, mutta yleisö oli hänen '
        + 'puolellaan, ja keisari Wilhelm II armahti hänet 16. elokuuta 1908 '
        + 'vajaan kahden vuoden istumisen jälkeen.',
      lahde: 'en-Wikipedia "Wilhelm Voigt". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-kopenickin-kapteeni-photo-v1.jpg`,
          selite: 'Nuori sotilas tekee kunniaa ennen kuin ehtii kysyä, kuka '
            + 'käytetyssä kapteeninpuvussa oikeastaan käskee. Wilhelm Voigt '
            + 'saa Köpenickin raatihuoneen kassasta rahat pelkän univormun '
            + 'voimalla; virkailijan katseessa huvittava temppu muuttuu '
            + 'hetkeksi pelottavaksi kysymykseksi siitä, miksi kaikki '
            + 'tottelevat.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Museum Köpenick — Der '
            + 'Hauptmann von Köpenick; Voigtin näköisyys, käytetty '
            + 'kapteeninunivormu, sotilaiden totteleminen ja raatihuoneen '
            + 'kassan haltuunotto 16. lokakuuta 1906 ovat dokumentoituja, '
            + 'virkailijan ja sotilaan eleet dramatisoituja.',
          url: 'https://www.berlin.de/museum-treptow-koepenick/museen/hauptmannausstellung/',
        },
      ],
      visa: {
        kysymys: 'Mihin \'Köpenickin kapteenin\' vallankäyttö perustui?',
        vaihtoehdot: [
          'Väärennettyyn keisarin valtakirjaan',
          'Pelkkään preussilaisen upseerin univormuun',
          'Lahjottuihin kaupungin virkamiehiin',
        ],
        oikea: 1,
      },
    },
    /*
     * Sternin toimitalo, Hampuri.
     * Lähde: en.wikipedia.org: Hitler Diaries
     */
    {
      id: 'hitlerin-paivakirjat',
      otsikko: 'Sternin päiväkirjaskandaali — 60 väärennettyä nidettä',
      nimio: 'Väärät päiväkirjat',
      vuosi: '1981–1983',
      paikka: 'Sternin toimitalo, Hampuri',
      lat: 53.5436, lon: 9.9805,
      kortti: 'Lehti maksoi miljoonia päiväkirjoista, joiden paperia ei ollut '
        + 'valmistettu ennen kuin niiden kirjoittaja oli jo kuollut. Tekninen '
        + 'tarkistus tilattiin vasta lehdistötilaisuuden jälkeen — järjestys, '
        + 'jota toimitusopit eivät suosittele. Väärentäjä istui tuomionsa ja '
        + 'jatkoi sitten uraa myymällä \'aitoja Kujau-väärennöksiä\'.',
      teksti: 'Konrad Kujau kirjoitti kuusikymmentä nidettä vuosina 1981–1983 '
        + 'halvalla Itä-Berliinistä ostettuihin muistikirjoihin. Muste oli '
        + 'sekoitettu kahdesta Pelikan-pullosta ja vedestä, sivuille oli ripoteltu '
        + 'teetä ja niteitä oli hakattu pöytään vanhan näköisiksi. Kanteen '
        + 'liimattiin tavaratalosta ostetut muovikirjaimet — ne olivat FH eivätkä '
        + 'AH.\n\n'
        + 'Stern-lehden toimittaja Gerd Heidemann toi päiväkirjat lehteen, ja '
        + 'kustantaja maksoi niistä 9,3 miljoonaa Saksan markkaa. Aitoutta ei '
        + 'tarkistettu kunnolla: asiantuntijoille annettiin yksittäisiä sivuja ja '
        + 'vertailunäytteiksi muita Kujaun väärennöksiä, joten käsiala täsmäsi '
        + 'itsensä kanssa. Sunday Timesin pyytämä historioitsija Hugh Trevor-Roper '
        + 'vahvisti päiväkirjat aidoiksi ja perui kantansa vasta '
        + 'julkistustilaisuudessa.\n\n'
        + 'Liittoarkiston tutkimus kertoi lopun. Paperissa oli '
        + 'ultraviolettivalossa hohtava valkaisuaine, yhden niteen kansissa '
        + 'polyesteriä, jota ei valmistettu ennen vuotta 1953, ja musteen '
        + 'kloridimittaus osoitti tekstin kirjoitetun kahden viime vuoden aikana. '
        + 'Hallituksen tiedote ehti julkisuuteen viisi minuuttia ennen Sternin '
        + 'omaa.\n\n'
        + 'Oikeudenkäynti kesti elokuusta 1984 heinäkuuhun 1985. Heidemann sai '
        + 'neljä vuotta ja kahdeksan kuukautta, Kujau neljä vuotta ja kuusi '
        + 'kuukautta; ainakin viisi miljoonaa markkaa jäi löytymättä. Kujau '
        + 'vapautui 1987, avasi Stuttgartiin gallerian ja myi Dalín ja Mirón '
        + 'töiden jäljennöksiä omalla nimellään signeerattuina.',
      lahde: 'en-Wikipedia "Hitler Diaries". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-hitlerin-paivakirjat-photo-v1.jpg`,
          selite: 'Nuori asiakirjatutkija näkee ultraviolettivalossa sen, '
            + 'mitä toimitus ei enää haluaisi nähdä: sodanjälkeinen paperi '
            + 'paljastaa miljoonahankinnan väärennökseksi. Stern ehti '
            + 'julistaa päiväkirjat löydetyiksi ennen täydellistä tutkimusta; '
            + 'viikossa sensaatio muuttui yhdeksi Saksan liittotasavallan '
            + 'suurista mediaskandaaleista.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Bundesarchiv — gefälschte '
            + 'Hitler-Tagebücher; päiväkirjojen määrä, Sternin maksu ja '
            + 'sodanjälkeiset materiaalit ovat dokumentoituja, nuori tutkija, '
            + 'toimitushuone ja eleet dramatisoituja. Kuvassa ei kopioida '
            + 'alkuperäistä sivua eikä esitetä natsisymboliikkaa.',
          url: 'https://www.bundesarchiv.de/themen-entdecken/online-entdecken/geschichtsgalerien/pressekonferenz-des-bundesarchivs-zu-hitler-tagebuechern/',
        },
      ],
      visa: {
        kysymys: 'Miten Hitlerin päiväkirjat lopulta paljastuivat väärennöksiksi?',
        vaihtoehdot: [
          'Käsiala ei vastannut Hitlerin kirjeitä',
          'Väärentäjä tunnusti televisiohaastattelussa',
          'Tekninen tutkimus osoitti paperin ja musteen sodanjälkeisiksi',
        ],
        oikea: 2,
      },
    },
  ],
  DNK: [
    /*
     * Kastellet, Kööpenhamina (Struensee odotti täällä tuomiotaan).
     * Lähde: en.wikipedia.org: Johann Friedrich Struensee
     */
    {
      id: 'struensee-kuninkaan-laakari',
      otsikko: 'Kuninkaan lääkäri, joka hallitsi Tanskaa',
      nimio: 'Struensee',
      vuosi: '1770–1772',
      paikka: 'Kastellet, Kööpenhamina (Struensee odotti täällä tuomiotaan)',
      lat: 55.6911, lon: 12.5939,
      kortti: 'Struensee tuli hoitamaan kuningasta ja päätyi hoitamaan koko '
        + 'valtakuntaa: parhaimmillaan uudistusasetuksia syntyi tiheämmin kuin '
        + 'virkamiehet ehtivät niitä lukea. Lääkäri hallitsi Tanskaa runsaan '
        + 'vuoden osaamatta maan kieltä — se ei kaatanut häntä, '
        + 'mutta kuningattaren sydän kaatoi.',
      teksti: 'Johann Friedrich Struensee oli saksalainen valistuslääkäri '
        + 'Altonasta. Vuonna 1768 hänet otettiin mukaan Kristian VII:n '
        + 'Euroopan-matkalle henkilääkäriksi. Kuningas oli vakavasti sairas, ja '
        + 'lääkäri oli harvoja, jotka saivat hänet rauhoittumaan — ja pian myös '
        + 'harvoja, jotka kuuntelivat yksin jäänyttä kuningatar Caroline Mathildea.\n\n'
        + 'Valta kertyi nopeasti. Joulukuussa 1770 Struensee lakkautti '
        + 'valtioneuvoston, nimitti itsensä asioiden esittelijäksi ja päätti '
        + 'käytännössä, mitä kuningas vastasi. Kolmessatoista kuukaudessa hän '
        + 'antoi 1 069 kabinettikäskyä eli yli kolme päivässä: sensuuri '
        + 'lakkautettiin, orjakauppa Tanskan siirtomaissa kiellettiin ja '
        + 'kuolemanrangaistus varkaudesta poistettiin.\n\n'
        + 'Uudistusten hinta oli, ettei kukaan jäänyt puolustamaan häntä. '
        + 'Struensee ei puhunut tanskaa vaan hoiti asiat saksaksi, erotti '
        + 'kokonaisia virastoja ilman eläkkeitä ja nimitti tilalle miehiä, jotka '
        + 'eivät tunteneet maata. Vapautettu lehdistö täyttyi häntä vastaan '
        + 'kirjoitetuista pamfleteista. Heinäkuussa 1771 kuningatar synnytti '
        + 'tyttären, Louise Augustan, jota pidettiin yleisesti lääkärin lapsena.\n\n'
        + 'Leskikuningatar Juliane Marien nimissä toiminut salaliitto iski 17. '
        + 'tammikuuta 1772 aamuyöllä, naamiaisia seuranneena yönä: Struensee, '
        + 'hänen ystävänsä Enevold Brandt ja kuningatar pidätettiin '
        + 'makuuhuoneistaan, ja vapautetuksi julistettua kuningasta ajeltiin '
        + 'kultaisissa vaunuissa pitkin Kööpenhaminaa. Pääsyyte oli kuninkaan '
        + 'vallan anastaminen. Struensee ja Brandt mestattiin 28. huhtikuuta 1772, '
        + 'ja kuningatar vietiin valtiovankina Kronborgin linnaan.',
      lahde: 'en-Wikipedia "Johann Friedrich Struensee". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-struensee-kuninkaan-laakari-photo-v1.jpg`,
          selite: 'Vielä edellisenä päivänä Struensee hallitsi kuninkaan '
            + 'nimissä; nyt nuori vartija ei tiedä, pitäisikö hänen tervehtiä '
            + 'vankia vai entistä valtakunnan mahtavinta miestä. '
            + 'Valistuslääkärin uudistukset, suhde Caroline Mathildeen ja '
            + 'hovin vastaisku päättyvät pidätykseen 17. tammikuuta 1772.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Danmarkshistorien — '
            + 'Johann Friedrich Struensee; Struenseen näköisyys, ikä, pidätys '
            + 'ja vankeuspaikka Kastellet ovat lähdepohjaisia, vartijoiden '
            + 'henkilöt, katsekontakti ja sellin tilanne dramatisoituja.',
          url: 'https://danmarkshistorien.lex.dk/Johann_Friedrich_Struensee%2C_1737-1772',
        },
      ],
      visa: {
        kysymys: 'Mikä oli Johann Friedrich Struenseen virallinen tehtävä Tanskan '
          + 'hovissa?',
        vaihtoehdot: [
          'Kuningas Kristian VII:n henkilääkäri',
          'Kuningattaren tanskan kielen opettaja',
          'Hovin ylikamariherra',
        ],
        oikea: 0,
      },
    },
    /*
     * Børsen, vanha pörssitalo, Kööpenhamina.
     * Lähde: en.wikipedia.org: Danish state bankruptcy of 1813
     */
    {
      id: 'tanskan-valtionvararikko-1813',
      otsikko: 'Vuoden 1813 valtionvararikko',
      nimio: 'Vararikko 1813',
      vuosi: '1813',
      paikka: 'Børsen, vanha pörssitalo, Kööpenhamina',
      lat: 55.6756, lon: 12.5839,
      kortti: 'Valtio ei voi mennä konkurssiin, sanotaan usein. Tanska kokeili '
        + 'tammikuussa 1813 ja osoitti väitteen vääräksi. Setelien omistajat '
        + 'saivat pitää paperinsa — arvosta suurin osa vain oli kadonnut, ja '
        + 'luottamuksen paluuta saatiin odottaa pidempään kuin rauhaa.',
      teksti: 'Britannian laivasto pommitti Kööpenhaminaa syyskuussa 1807, ja '
        + 'Tanska-Norja liittoutui vastaukseksi Ranskan kanssa. Fontainebleaun '
        + 'sopimus lupasi edullisia lainoja ja avustuksia, mutta ehdot jäivät '
        + 'täyttämättä. Varustautumisen ja ranskalaisten joukkojen kulut maksoi '
        + 'Tanska itse.\n\n'
        + 'Kassa täytettiin painokoneella. Valuutta oli hopeaa, mutta seteleitä '
        + 'laskettiin liikkeeseen niin paljon, että hopeakate katosi. Puutavaran '
        + 'vienti romahti brittikaupan katkettua 99 prosenttia vuosien 1806 ja '
        + '1808 välillä, ja pelkästään vuonna 1813 hinnat nousivat noin 300 '
        + 'prosenttia. Valtio alkoi periä osan veroista viljana, koska se ei '
        + 'luottanut omaan seteliinsä.\n\n'
        + 'Vararikko julistettiin 5. tammikuuta 1813. Perustettiin uusi '
        + 'valtionpankki Rigsbank ja uusi raha rigsbankdaler; kaikkiin '
        + 'kiinteistöihin pantiin kuuden prosentin pakkokiinnitys, joka oli '
        + 'maksettava hopeassa. Vanhat setelit vaihdettiin uusiin suhteessa kuusi '
        + 'yhteen.\n\n'
        + 'Vuoden 1814 Kielin rauhassa Tanska luovutti Norjan Ruotsille ja '
        + 'Helgolandin Britannialle; Grönlanti, Islanti ja Färsaaret jäivät. '
        + 'Talouden paikkaus jatkui vuoteen 1818, jolloin perustettiin yksityinen '
        + 'Nationalbank palauttamaan luottamus keskuspankkiin. Sen jälkeen tapaus '
        + 'on ollut oppikirjaesimerkki siitä, että valtio voi mennä konkurssiin '
        + 'lakkaamatta olemasta valtio. Ulkomaisten velkojen ja korkojen maksu oli '
        + 'jouduttu keskeyttämään vuoteen 1815 asti, ja kuningas Frederik VI pysyi '
        + 'Napoleonin liittolaisena silloinkin, kun Ruotsi ja Venäjä olivat jo '
        + 'vaihtaneet puolta.',
      lahde: 'en-Wikipedia "Danish state bankruptcy of 1813". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-tanskan-valtionvararikko-1813-photo-v1.jpg`,
          selite: 'Poika katsoo äitiään, ei seteleitä: hänen kasvoiltaan hän '
            + 'ymmärtää, ettei perheen säästöillä enää osteta samaa leipää. '
            + 'Napoleonin sotien laskut maksettiin setelipainolla, kunnes '
            + 'Tanska perusti Rigsbankenin vuonna 1813 ja vaihtoi kuusi '
            + 'vanhaa setelirahan yksikköä yhteen uuteen rigsbankdaleriin.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Danmarks Nationalbank — '
            + 'historical banknotes; setelipainon käyttö, korkea inflaatio, '
            + 'Rigsbankenin perustaminen ja vaihtosuhde ovat dokumentoituja, '
            + 'perhe, virkailijat ja Børsenin vaihtotilanne dramatisoituja.',
          url: 'https://www.nationalbanken.dk/en/what-we-do/notes-and-coins/historical-banknotes',
        },
      ],
      visa: {
        kysymys: 'Mikä ajoi Tanskan valtion vararikkoon vuonna 1813?',
        vaihtoehdot: [
          'Epäonnistunut siirtomaakauppa Intiassa',
          'Napoleonin sotien rahoittaminen setelipainolla',
          'Kööpenhaminan suurpalon jälleenrakennus',
        ],
        oikea: 1,
      },
    },
    /*
     * Kööpenhaminan oikeustalo (Domhuset), Nytorv.
     * Lähde: en.wikipedia.org: Peter Adler Alberti
     */
    {
      id: 'alberti-skandaali',
      otsikko: 'Oikeusministeri ilmoittautui poliisille',
      nimio: 'Alberti',
      vuosi: '1908',
      paikka: 'Kööpenhaminan oikeustalo (Domhuset), Nytorv',
      lat: 55.6772, lon: 12.5731,
      kortti: 'Harva rikos selviää niin vaivattomasti: oikeusministeri hoiti '
        + 'ilmiannon, tunnustuksen ja syyllisen kiinnioton samalla '
        + 'asiointikerralla. Poliisin työksi jäi lähinnä kirjata summa — 18 '
        + 'miljoonaa kruunua — ja tarkistaa, ettei nollia puutu.',
      teksti: 'Peter Adler Alberti oli asianajaja ja säästöpankkiliikkeen '
        + 'uranuurtajan poika. Vuodesta 1890 hän johti Sjællandin '
        + 'talonpoikaissäädyn säästökassaa, ja kavallukset alkoivat jo varhain; '
        + 'taustalla oli pelihimo. Politiikkaan hän meni 1892 ehkä siksikin, että '
        + 'asema suojaisi häntä kysymyksiltä, ja liittyi 1895 Venstren '
        + 'uudistuspuolueeseen, jossa hänestä tuli pääministeri J. C. '
        + 'Christensenin oikea käsi.\n\n'
        + 'Oikeusministerinä Alberti oli vuosina 1901–1908. Sosiaaliliberaalit ja '
        + 'sosiaalidemokraatit syyttivät häntä vuosi vuodelta kovemmin '
        + 'taloudellisesta epärehellisyydestä. Christensen sivuutti arvostelun '
        + 'niin pitkään kuin pystyi ja joutui lopulta pyytämään ministeriään '
        + 'eroamaan.\n\n'
        + 'Muutamaa kuukautta myöhemmin, 8. syyskuuta 1908, Alberti käveli '
        + 'poliisiasemalle ja ilmoitti kavaltaneensa säästökassasta 18 miljoonaa '
        + 'kruunua — nykyrahassa yli miljardi. Tuomioksi tuli kahdeksan vuotta '
        + 'pakkotyötä, ja hän istui vuodet 1912–1917.\n\n'
        + 'Skandaali kaatoi Christensenin hallituksen ja myrkytti Tanskan '
        + 'poliittisen ilmapiirin vuosiksi. Kaikuja kuului muuallekin Eurooppaan, '
        + 'sillä mukana oli brittiläisiä liikekumppaneita. Vapauduttuaan entinen '
        + 'oikeusministeri työskenteli konttoristina ja kuoli 1932. Myöhempi '
        + 'tutkimus on osoittanut, että kavallukset olivat alkaneet jo aivan '
        + 'säästökassauran alussa: kaksi vuosikymmentä ehti kulua ennen kuin '
        + 'kukaan laski summia. Tapausta pidetään yhä Tanskan uuden ajan '
        + 'vakavimpiin kuuluvana petoksena.',
      lahde: 'en-Wikipedia "Peter Adler Alberti". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-alberti-skandaali-photo-v1.jpg`,
          selite: 'Nuori poliisikirjuri ehtii tarttua kynään, mutta ei vielä '
            + 'käsittää, miksi entinen oikeusministeri tuo avaimensa ja '
            + 'tilikirjansa hänen pöydälleen. Peter Adler Alberti '
            + 'ilmoittautui itse 8. syyskuuta 1908; vuosia peitellyt petos '
            + 'kaatoi samalla hallituksen luottamuksen.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Lex — P.A. Alberti; '
            + 'Albertin ikä, näköisyys, ero ministerinvirasta, '
            + 'ilmoittautumispäivä ja petoksen mittakaava ovat '
            + 'dokumentoituja, poliisiaseman henkilöt, avaimet ja eleet '
            + 'dramatisoituja.',
          url: 'https://lex.dk/P.A._Alberti',
        },
      ],
      visa: {
        kysymys: 'Miten oikeusministeri Albertin kavallukset paljastuivat '
          + 'lopullisesti vuonna 1908?',
        vaihtoehdot: [
          'Säästökassan tilintarkastaja löysi väärennetyt kirjat',
          'Sanomalehti julkaisi salaisia tiliotteita',
          'Alberti ilmoittautui itse poliisille',
        ],
        oikea: 2,
      },
    },
  ],
  ESP: [
    /*
     * Sacromonten luostari, Granada.
     * Lähde: en-Wikipedia "Lead Books of Sacromonte" (tarkistettu 30.8.2026)
     */
    {
      id: 'sacromonten-lyijykirjat',
      otsikko: 'Sacromonten lyijykirjat',
      nimio: 'Lyijykirjat',
      vuosi: '1595–1682',
      paikka: 'Sacromonten luostari, Granada',
      lat: 37.1822, lon: -3.5697,
      kortti: 'Lyijylevyille kaiverretut \'muinaiset\' kirjat kertoivat juuri sen, '
        + 'mitä Granadassa haluttiin kuulla — ja siksi niitä haluttiin uskoa '
        + 'lähes sata vuotta. Rooma tarvitsi neljä vuosikymmentä ja yhden '
        + 'inkvisition todetakseen ilmeisen. Väärennös oli huono, mutta toive '
        + 'oli vahva.',
      teksti: 'Granadan laidalla kohoavan Sacromonte-kukkulan luolista löytyi '
        + 'vuosien 1595 ja 1606 välillä kaksikymmentäkaksi kirjaa: pyöreitä '
        + 'lyijylevyjä, jotka oli sidottu lyijylangalla lyijykansien väliin. '
        + 'Niiden seurassa oli palaneita luita, jotka lyijylaatat nimesivät '
        + 'Elviran Caeciliuksen ja yhdentoista seuraajan jäännöksiksi.\n\n'
        + 'Teksti oli arabiaa ja latinaa, merkeillä joita morisco-oppineet '
        + 'sanoivat esi-islamilaiseksi arabiaksi. Kirjat kertoivat Neitsyt Marian '
        + 'opetuksia ja korostivat, että arabia on Espanjan muinainen kieli ja '
        + 'Granadan arabit maan ensimmäisiä kristittyjä. Kirkko oli tulkkien '
        + 'varassa, ja tärkeimmät tulkit olivat Miguel de Luna ja Alonso del '
        + 'Castillo — samat kaksi, joita nykytutkimus pitää väärentäjinä.\n\n'
        + 'Arkkipiispa Pedro de Castro uskoi kirjoihin ja rakennutti paikalle '
        + 'luostarin. Vatikaani ei uskonut: kirjat saatiin Roomaan 1642, ja pyhän '
        + 'officiumin pitkä tutkinta päätyi 1682 siihen, että sekä kirjat että '
        + 'niitä edeltänyt muinaiseksi väitetty pergamentti ovat harhaoppisia '
        + 'väärennöksiä.\n\n'
        + 'Yksi nide, Libro Mudo eli mykkä kirja, on yhä lukematta. Vatikaani '
        + 'palautti kokoelman Sacromonten luostarille vasta vuonna 2000, lähes '
        + 'kolmensadan vuoden jälkeen, mutta tutkijoiden pääsy aineistoon on '
        + 'edelleen kielletty, koska vanha kielto on yhä voimassa. Marttyyrien '
        + 'luita ei ole koskaan virallisesti kiistetty, ja niitä kunnioitetaan '
        + 'luostarissa yhä.',
      lahde: 'en-Wikipedia "Lead Books of Sacromonte". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-sacromonten-lyijykirjat-photo-v1.jpg`,
          selite: 'Nuori moriscotulkki tunnistaa lyijystä kielen, joka lupaa '
            + 'hänen yhteisölleen paikan Granadan vanhimmassa kristillisessä '
            + 'menneisyydessä — ja näkee papin jo uskovan. Vuosina 1595–1599 '
            + 'löytyneistä levyistä tuli toivon, vallan ja väärennöksen '
            + 'solmu, jonka Rooma tuomitsi vasta vuonna 1682.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Universidad de Granada — '
            + 'Los plomos del Sacromonte; löytöpaikka, levyjen materiaali ja '
            + 'kielten sekoitus ovat lähdepohjaisia, nuori työntekijä, '
            + 'moriscotulkki ja pappi dramatisoituja. Kuva ei väitä tiettyä '
            + 'henkilöä väärentäjäksi.',
          url: 'https://editorial.ugr.es/libro/los-plomos-del-sacromonte_139224/',
        },
      ],
      visa: {
        kysymys: 'Mistä materiaalista Sacromonten \'muinaiset kirjat\' oli tehty?',
        vaihtoehdot: [
          'Lyijylevyistä',
          'Pergamentista',
          'Papyruksesta',
        ],
        oikea: 0,
      },
    },
    /*
     * Lavapiésin kaupunginosa, Madrid.
     * Lähde: es-Wikipedia "Baldomera Larra" (tarkistettu 30.8.2026)
     */
    {
      id: 'baldomera-larra-pyramidi',
      otsikko: 'Baldomera Larran rahapyramidi',
      nimio: 'Baldomera',
      vuosi: '1870-luku',
      paikka: 'Lavapiésin kaupunginosa, Madrid',
      lat: 40.4089, lon: -3.7009,
      kortti: 'Baldomera lupasi tallettajille korkoa, jollaista pankit eivät '
        + 'kehdanneet edes vitsinä luvata, ja madridilaiset jonottivat ovelle. '
        + 'Järjestelmä toimi täydellisesti — niin kauan kuin uusia jonottajia '
        + 'riitti. Menetelmä sai myöhemmin nimensä eräältä herra Ponzilta, joka '
        + 'keksi saman pyörän uudestaan.',
      teksti: 'Baldomera Larra Wetoret oli kirjailija Mariano José de Larran '
        + 'tytär. Kun hänen miehensä, hovin lääkäri Carlos Montemar, muutti 1873 '
        + 'Amerikkaan ja jätti perheen vaille tuloja, Baldomera joutui itse '
        + 'lainaamaan rahaa korkealla korolla. Siitä kasvoi liikeidea.\n\n'
        + 'Hän lupasi kolmenkymmenen prosentin kuukausikoron ja perusti Caja de '
        + 'Imposiciones -nimisen talletuskassan, jonka edessä seisottiin jonossa. '
        + 'Kysyjille hän vastasi, että homma on yksinkertainen kuin Kolumbuksen '
        + 'muna. Rahaa kertyi arviolta 22 miljoonaa realia, ja kärsijöitä on '
        + 'laskettu noin viisituhatta. Uutinen levisi Pariisin Le Figaroon ja '
        + 'brysseliläiseen L\'Indépendance Belgeen asti.\n\n'
        + 'Kassa kaatui joulukuussa 1876. Baldomera katosi niiden rahojen kanssa, '
        + 'jotka sai mukaansa, ja kaksi vuotta myöhemmin selvisi, että hän asui '
        + 'väärällä nimellä Auteuilissa Pariisin laidalla. Hänet luovutettiin '
        + 'Espanjaan ja tuomittiin 26. toukokuuta 1879 kuudeksi vuodeksi '
        + 'vankeuteen; avustajat vapautettiin syytteistä.\n\n'
        + 'Sitten tuli käänne, jota kukaan ei olisi kehdannut keksiä: korkein '
        + 'oikeus vapautti hänet kaikesta syyllisyydestä, koska 1800-luvun '
        + 'Espanjan lain mukaan naimisissa oleva nainen ei saanut tehdä sopimuksia '
        + '— eikä sopimuksitta ollut velkojiakaan. Menetelmä sai nimensä vasta '
        + 'puoli vuosisataa myöhemmin Charles Ponzilta; Baldomera oli maailman '
        + 'toinen tunnettu tapaus saksalaisen Adele Spitzederin jälkeen.',
      lahde: 'es-Wikipedia "Baldomera Larra". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-baldomera-larra-pyramidi-photo-v1.jpg`,
          selite: 'Vanha ompelijatar näkee Baldomeran kädessä lupaamansa '
            + 'voiton; hänen takanaan tyttö huomaa, että rahat tulevat juuri '
            + 'sisään astuneen perheen kukkarosta. Caja de Imposiciones '
            + 'keräsi tuhansien madridilaisten säästöjä, kunnes uusien '
            + 'tallettajien virta loppui joulukuussa 1876.',
          lahde: 'Matkakirjan havainnekuva. Faktat: BOE — Baldomera Larran '
            + 'oikeusprosessi; Baldomeran henkilöllisyys, poikkeuksellinen '
            + 'korkolupaus ja järjestelmän romahdus ovat lähdepohjaisia, '
            + 'asiakkaat, tyttö ja kuvattu maksutapahtuma dramatisoituja.',
          url: 'https://www.boe.es/biblioteca_juridica/abrir_pdf.php?id=PUB-DH-2014-37_1',
        },
      ],
      visa: {
        kysymys: 'Miten Baldomera Larran \'talletuskassa\' maksoi luvatut suuret '
          + 'korot?',
        vaihtoehdot: [
          'Kultakaivosten osingoilla',
          'Uusien tallettajien rahoilla',
          'Kuninkaan salaisella tuella',
        ],
        oikea: 1,
      },
    },
    /*
     * Cerro de los Santosin pyhäkkö, Montealegre del Castillo.
     * Lähde: en-Wikipedia "Cerro de los Santos" (tarkistettu 30.8.2026)
     * Lähde: es-Wikipedia "Cerro de los Santos" (väärennökset ja Vicente Juan
     *   y Amat; tarkistettu 30.8.2026)
     */
    {
      id: 'cerro-de-los-santos-vaarennokset',
      otsikko: 'Cerro de los Santosin väärennetyt patsaat',
      nimio: 'Iberipatsaat',
      vuosi: '1860–1870-luku',
      paikka: 'Cerro de los Santosin pyhäkkö, Montealegre del Castillo',
      lat: 38.7333, lon: -1.2694,
      kortti: 'Kun museo maksaa muinaisista patsaista kappalehinnan, muinaisia '
        + 'patsaita alkaa merkillisesti riittää. Kansallismuseon kokoelmiin '
        + 'päätyi aitojen iberiveistosten sekaan tuoreita — ja tutkijat '
        + 'lajittelevat perintöä yhä. Kysyntä loi tarjontaa jo 1800-luvulla.',
      teksti: 'Cerro de los Santos on iberialainen pyhäkkö Montealegre del '
        + 'Castillon lähellä Albacetessa, rakennettu 300-luvulla ennen ajanlaskun '
        + 'alkua vanhan valtatien varteen. Alueelta on kaivettu noin kolmesataa '
        + 'votiiviveistosta, enimmäkseen naisia esittäviä; kuuluisin on Dama del '
        + 'Cerro de los Santos.\n\n'
        + 'Löydöt alkoivat tulla esiin 1830-luvulla, kun kukkula raivattiin '
        + 'puista. Ensimmäinen virallinen raportti on kesäkuulta 1860. Ensimmäiset '
        + 'kaivaukset teki Vicente Juan y Amat, joka myi löytöjä Espanjan '
        + 'kansalliselle arkeologiselle museolle — osan muokattuina arvokkaammiksi '
        + 'ja osan suoraan väärennettyinä.\n\n'
        + 'Museo maksoi kappalehinnan, ja tarjonta seurasi kysyntää. Aitojen '
        + 'iberiveistosten sekaan päätyi tuoretta työtä, ja aidon ja väärennetyn '
        + 'erottelu on työllistänyt tutkijoita siitä asti. Samalla sekaantui se, '
        + 'mitä pyhäköstä ylipäätään tiedetään: veistokset ovat lähes ainoa '
        + 'aineisto, jonka paikka on jättänyt jälkeensä.\n\n'
        + 'Itse paikasta on jäljellä vähän. Temppelin ääriviivat, jotka vielä '
        + '1700-luvulla erottuivat maastossa, ovat kadonneet kokonaan, ja '
        + 'rakennuksesta tiedetään lähinnä 1800-luvun kaivausten mitat: 15,6 '
        + 'kertaa 9,9 metriä, ovi kahden porrasjakson päässä. Paikan merkkinä on '
        + 'vuonna 1929 pystytetty muistoobeliski. Veistokset ovat keskenään hyvin '
        + 'samanlaisia hiuksiltaan ja puvuiltaan, mutta silmät on tehty eri '
        + 'kokoisiksi ja eri kohtiin — luultavasti siksi, että jokainen '
        + 'lahjoittaja tunnistaisi omansa.',
      lahde: 'en-Wikipedia "Cerro de los Santos" ja es-Wikipedia "Cerro de los '
        + 'Santos". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-cerro-de-los-santos-vaarennokset-photo-v1.jpg`,
          selite: 'Nuori museoapulainen katsoo ensin tuoretta uurretta ja '
            + 'vasta sitten pöydän ääressä seisovia miehiä: jos hän sanoo '
            + 'epäilyn ääneen, koko löytöhuuma alkaa horjua. Vicente Juan y '
            + 'Amat myi Madridin arkeologiselle museolle sekä aitoja että '
            + 'väärennettyjä tai muunneltuja esineitä; nykykäsityksen mukaan '
            + 'hän ei välttämättä itse veistänyt väärennöksiä, vaan osti ja '
            + 'välitti niitä.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Museo Arqueológico '
            + 'Nacional — väärennökseksi luokiteltu patsas MAN 3501; patsaat '
            + 'jäljittelevät museon dokumentoimaa väärennöstä MAN 3501 ja '
            + 'aitoa Dama Oferentea MAN 3500, nuori apulainen ja epäilyn '
            + 'hetki ovat dramatisoituja. Kuva ei väitä Amatia väärennösten '
            + 'tekijäksi.',
          url: 'https://ceres.mcu.es/pages/Main?idt=31468&inventary=3501&museum=MAN&table=FMUS',
        },
      ],
      visa: {
        kysymys: 'Miksi Cerro de los Santosin löytöjen joukkoon ilmestyi '
          + 'väärennöksiä 1800-luvulla?',
        vaihtoehdot: [
          'Kaivaja myi veistoksia museolle ja lisäsi tarjontaa omin käsin',
          'Kyläläiset halusivat pilailla tutkijoiden kustannuksella',
          'Hallitus halusi paisuttaa kansallista muinaishistoriaa',
        ],
        oikea: 0,
      },
    },
  ],
  EST: [
    /*
     * Lasnamäen kalliranta, Tallinna.
     * Lähde: en-Wikipedia: Juhan Leinberg
     * Korjattu n. 1,5 km: vanha piste jäi Kadriorgin puistoon; uusi on
     *   Lasnamäen rantatörmällä Narva mnt:n varrella (Nominatim/OSM
     *   "Lasnamägi"), josta merelle näkee. Odottajien tarkkaa kohtaa törmällä
     *   ei tunneta — arvio.
     */
    {
      id: 'lasnamaen-valkea-laiva',
      otsikko: 'Lasnamäen valkea laiva — profeetta Maltsvetin lupaus',
      nimio: 'Valkea laiva',
      vuosi: '1861',
      paikka: 'Lasnamäen kalliranta, Tallinna',
      lat: 59.4446, lon: 24.8135,
      kortti: 'Sadat ihmiset istuivat viikkoja rantakalliolla katsomassa '
        + 'horisonttiin, jossa valkean laivan piti milloin tahansa näkyä. Laiva '
        + 'ei tullut, mutta tarina jäi: \'valkea laiva\' tarkoittaa yhä toivoa, '
        + 'joka on liian kaunis saapuakseen. Profeetta itse palasi lopulta '
        + 'arkisempaan ammattiin — kaupankäyntiin.',
      teksti: 'Juhan Leinberg syntyi 1812 Järvamaalla ja oli ehtinyt olla '
        + 'talonpoikana, myllärinä, kapakoitsijana ja kauppiaana Tallinnassa, '
        + 'ennen kuin alkoi 1854 saarnata Pohjois-Virossa. Sanoma oli, että '
        + 'omaisuuden keräämisestä on luovuttava. Lyhyt vankeus 1858 kasvatti '
        + 'suosiota, ja seuraajia kertyi kahdesta kolmeensataa perhettä.\n\n'
        + 'Vuodesta 1860 Maltsvet-profeetaksi kutsuttu Leinberg kehotti muuttamaan '
        + 'Krimille ja lähti sinne itse helmikuussa 1861. Innokkaimmat jäivät '
        + 'odottamaan valkeaa laivaa Lasnamäen kalliolle touko- ja kesäkuuksi 1861.\n\n'
        + 'Laivaa ei tullut. Maltsvetilaiset olivat marraskuussa 1861 mukana Albun '
        + 'ja Ahulan talonpoikaislevottomuuksissa, ja 1860-luvun puoliväliin '
        + 'mennessä liikkeen vaikutus oli haihtunut. Leinberg palasi Viroon 1865 '
        + 'ja jatkoi kaupankäyntiä; hän kuoli 1885 Pruunan kylässä samassa '
        + 'maakunnassa, jossa oli syntynyt.\n\n'
        + 'Tarina jäi kirjallisuuteen. Eduard Vilde kirjoitti siitä romaanin '
        + 'Prohvet Maltsvet 1908 — kirjan, joka teki hänestä kirjailijan — ja '
        + 'suomalainen Aino Kallas novellin Lasnamäen valkea laiva. Sanonta elää '
        + 'yhä: valkea laiva on se, jota odotetaan ja joka ei tule. Vilde '
        + 'kirjoitti kirjansa Krimille päätyneiden virolaisten kirjeiden ja '
        + 'haastattelujen pohjalta — osa lähtijöistä nimittäin pääsi perille, '
        + 'vaikkei laivalla.',
      lahde: 'en-Wikipedia "Juhan Leinberg". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-lasnamaen-valkea-laiva-photo-v1.jpg`,
          selite: 'Äiti etsii tyttärensä kasvoilta vastausta, jota tyhjä '
            + 'horisontti ei anna: kuinka monta aamua heidän pitää vielä '
            + 'odottaa? Juhan Leinberg oli jo lähtenyt Krimille, mutta sadat '
            + 'seuraajat viipyivät Lasnamäellä viikkoja valkean laivan '
            + 'toivossa, kunnes epätoivo ja sotilaiden painostus hajottivat '
            + 'joukon.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Eesti Kirjandusmuuseum — '
            + 'Mare Kõiva: The White Ship; tummat yhtenäiset takit, kaulassa '
            + 'riippuvat valkoiset pussit, suuri kokoontumiskivi ja viikkojen '
            + 'odotus ovat arkistokuvauksista, äiti, tytär ja poika '
            + 'dramatisoituja.',
          url: 'https://www.folklore.ee/rl/pubte/ee/sator/sator6/8marekoiva.pdf',
        },
      ],
      visa: {
        kysymys: 'Mitä maltsvetilaiset odottivat Lasnamäen kalliolla 1861?',
        vaihtoehdot: [
          'Tsaarin armahduskirjettä',
          'Valkeaa laivaa, joka veisi heidät Krimille',
          'Profeetan paluuta Siperiasta',
        ],
        oikea: 1,
      },
    },
    /*
     * Tallinnan satama.
     * Lähde: fi-Wikipedia: Kieltolaki (Suomi)
     */
    {
      id: 'pirtukauppa-suomenlahdella',
      otsikko: 'Pirtulaivat Suomenlahdella — kieltolain kuuma vientituote',
      nimio: 'Pirtulaivat',
      vuosi: '1919–1932 (ja jo 1850-luku)',
      paikka: 'Tallinnan satama',
      lat: 59.4433, lon: 24.7511,
      kortti: 'Laki poisti viinan kaupoista, ja Suomenlahti hoiti logistiikan: '
        + 'pimeinä öinä Viron rannikolta lähti nopeita veneitä, joiden lasti '
        + 'loiskui kanistereissa. Tulli takavarikoi vuodessa sen, minkä yksi '
        + 'emälaiva toi yhdessä yössä. Harva laki on opettanut taloustiedettä '
        + 'yhtä tehokkaasti — tai kastellut yhtä montaa oppituntia. '
        + 'Vastaanottava ranta oli Suomen — sama tarina jatkuu Helsingin '
        + 'Kauppatorilla.',
      teksti: 'Suomen kieltolaki tuli voimaan 1. kesäkuuta 1919, ja alkuvuosina '
        + 'pirtu tuli maahan etupäässä Virosta; myöhemmin myös Saksasta ja '
        + 'Danzigista. Tallinnan satama oli lähtöpaikka ja Suomenlahti työmaa. '
        + 'Emälaivat odottivat aluevesirajan takana, ja viimeisen matkan hoiti '
        + 'nopea vene pimeässä.\n\n'
        + 'Mittasuhteista kertoo yksi luku: takavarikoidun alkoholin määrä kasvoi '
        + 'vuosi vuodelta ja ylitti 1930 miljoonan litran rajan. Yksi emälaiva '
        + 'saattoi tuoda kerralla saman verran kuin poliisi ehti takavarikoida '
        + 'koko vuonna.\n\n'
        + 'Laki oli ankara myös välineille. Salakuljetukseen käytetty ajoneuvo, '
        + 'astia tai alus tuomittiin valtiolle, ellei omistaja pystynyt '
        + 'osoittamaan, että se oli häneltä rikoksella viety. Vuoteen 1927 '
        + 'mennessä arviolta kaksisataa autoa oli menetetty valtiolle — joukossa '
        + 'autoliikkeiden osamaksulla myymiä, joiden kaupasta myyjä ei tiennyt '
        + 'mitään.\n\n'
        + 'Sama meri oli tehnyt saman työn jo kerran. 1850-luvulla rikottiin '
        + 'vuoden 1811 viinantuontikieltoa tuomalla joinakin vuosina miljoonia '
        + 'litroja virolaista spriitä. Vastaanottava ranta oli Suomen puolella — '
        + 'sama tarina jatkuu Helsingin Kauppatorilla. Kauppa loppui kertaheitolla '
        + '5. huhtikuuta 1932, kun Suomen kieltolaki kumottiin kansanäänestyksen '
        + 'jälkeen ja väkijuomat palasivat myymälöihin: kysyntä siirtyi '
        + 'laillisille markkinoille yhdessä aamupäivässä.',
      lahde: 'fi-Wikipedia "Kieltolaki (Suomi)". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-pirtukauppa-suomenlahdella-photo-v1.jpg`,
          selite: 'Nuori apumies kuulee tulliveneen moottorin juuri kun '
            + 'seuraava pirtukanisteri laskeutuu hänen käsiinsä. Kieltolaki '
            + 'teki tavallisista rannikon ihmisistä salakuljettajia: suuret '
            + 'emälaivat odottivat ulapalla, ja pienet nopeat veneet '
            + 'kuljettivat lastin, pelon ja ansion pimeän veden yli.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Helsingin Satama — '
            + 'Kieltolaki toi satamiin draamaa; alukset, kanisterit ja tullin '
            + 'etsintävalot ovat lähdepohjaisia, nuori apumies, nainen, '
            + 'vanhempi välittäjä ja kuvattu vaaran sekunti dramatisoituja.',
          url: 'https://www.portofhelsinki.fi/tietoa-meista/helsingin-satama/historia/itsenaisen-suomen-kasvava-paasatama/kieltolaki-toi-satamiin-draamaa/',
        },
      ],
      visa: {
        kysymys: 'Mistä pirtu pääosin salakuljetettiin Suomeen kieltolain '
          + 'alkuvuosina?',
        vaihtoehdot: [
          'Ruotsista',
          'Neuvosto-Venäjältä',
          'Virosta',
        ],
        oikea: 2,
      },
    },
    /*
     * Toompean linna, Tallinna (kuuluisan pakoretken näyttämö).
     * Lähde: et-Wikipedia: Rummu Jüri
     */
    {
      id: 'rummu-jyri-mestarikarkuri',
      otsikko: 'Rummu Jüri — kartanoiden kauhu ja mestarikarkuri',
      nimio: 'Rummu Jüri',
      vuosi: '1870-luku, kiinniotto 1879',
      paikka: 'Toompean linna, Tallinna (kuuluisan pakoretken näyttämö)',
      lat: 59.4356, lon: 24.7375,
      kortti: 'Vanginvartijat rakensivat Rummu Jürille sellin kaksinkertaisella '
        + 'katolla ja lattialla, koska tavallinen selli oli hänelle lähinnä '
        + 'ehdotus. Kartanonherrat pelkäsivät, kansa hymyili partaansa, ja '
        + 'lehdet keksivät hänelle ulkomaisia rosvonimiä, kun kotimainen suosio '
        + 'kiusasi. Legendan viimeinen temppu oli paras: kukaan ei varmasti '
        + 'tiedä, missä ja milloin hän kuoli.',
      teksti: 'Jüri Rummo syntyi 1856 Kehtnan pitäjässä vuokraviljelijän '
        + 'esikoiseksi ja palveli nuorena Kehtnan kartanossa sisäpoikana, missä '
        + 'oppi vähän saksaa. Kerran hän vei sairaalle isälleen kartanosta '
        + 'lihanpalan, mistä herra käski ruoskia hänet tallissa. Kuuden kuukauden '
        + 'vankeustuomion jälkeen hän alkoi ryöstellä kartanoita.\n\n'
        + 'Kiinni hän ei pysynyt. Tallinnan lossivankilasta Rummo pääsi katon läpi '
        + 'ja laskeutui lopulta tornista köyttä pitkin. Saksankieliset lehdet '
        + 'nimittivät häntä Viron Rinaldo Rinaldiniksi, maakunnan Fra Diavoloksi '
        + 'ja Viron Don Juaniksi ja valittelivat, että kansa suojeli häntä. '
        + 'Kartanonherrojen kokous lupasi kiinniottajalle sata ruplaa, Tallinnan '
        + 'kaupunki lisäsi siihen 75.\n\n'
        + 'Joulukuun 27. päivänä 1879 hänet vangittiin kotipitäjässään. Rummo oli '
        + '23-vuotias ja ehti odotusaikana viilata rautansa poikki ja katkaista '
        + 'seinähirren. Tallinnassa hänelle rakennettiin oma selli, jossa oli '
        + 'kaksinkertainen katto ja lattia sekä raudoitettu ovi; avainta piti '
        + 'vankilan tarkastaja itse. Rummo aloitti nälkälakon.\n\n'
        + 'Maaoikeus tuomitsi kuusi vuotta pakkotyötä, ylioikeus korotti tuomion '
        + 'viideksitoista. Siperiassa hänet kohtasi pakkotyöleirien tarkastaja, '
        + 'kreivi Alfred Keyserling, jonka muistelmat ovat ainoa luotettava tieto '
        + 'myöhemmistä vuosista. Tuomio päättyi 1894, kun Rummo oli 38-vuotias. '
        + 'Kuolinaikaa ja -paikkaa ei tiedetä.',
      lahde: 'et-Wikipedia "Rummu Jüri". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-rummu-jyri-mestarikarkuri-photo-v1.jpg`,
          selite: 'Keittiöpiika nostaa katseensa juuri kun Rummu Jüri solmii '
            + 'lakanaköyttä, ja päättää olla huutamatta. Tarina kattoreiästä '
            + 'ja tornista laskeutumisesta kuuluu mestarikarkurin legendaan; '
            + 'kansan suojeluksessa elänyt nuori renki muuttui jo omana '
            + 'aikanaan mieheksi, josta vartijat eivät tienneet, päättyikö '
            + 'pako selliin vai lauluun.',
          lahde: 'Matkakirjan havainnekuva. Faktat: ERR — Rummu Jürin '
            + 'Toompean-pako legendana; kattoreitti ja köydellä laskeutuminen '
            + 'esitetään lähteiden tavoin legendana, vankilan piha on '
            + 'paikkalähteestä, Jürin, vartijan ja keittiöpiian kuvattu '
            + 'sekunti on dramatisoitu.',
          url: 'https://eeter.err.ee/1608505163/vaiko-epliku-uued-sugulased-on-kurikuulus-rummu-juri-ja-laulja-thea-paluoja',
        },
      ],
      visa: {
        kysymys: 'Miten Rummu Jüri pakeni Toompean lossivankilasta?',
        vaihtoehdot: [
          'Lahjomalla vartijan hopealla',
          'Piiloutumalla pyykkikärryyn',
          'Katon kautta ja tornista köyttä pitkin',
        ],
        oikea: 2,
      },
    },
  ],
  FIN: [
    /*
     * Aleksis Kiven kuolinmökki, Tuusula.
     * Lähde: fi.wikipedia.org: Seitsemän veljestä
     * Lähde: fi.wikipedia.org: August Ahlqvist
     */
    {
      id: 'seitseman-veljesta-kirjasota',
      otsikko: 'Kirjasota Seitsemästä veljeksestä',
      nimio: 'Kirjasota',
      vuosi: '1870',
      paikka: 'Aleksis Kiven kuolinmökki, Tuusula',
      lat: 60.4236, lon: 25.0461,
      kortti: 'Yksi arvostelu voi olla tehokkaampi kuin sensuuri: professorin '
        + 'tyrmäys pysäytti Seitsemän veljeksen myynnin kolmeksi vuodeksi. '
        + 'Jälkipolvet ovat äänestäneet toisin — teilatusta kirjasta tuli '
        + 'kansalliskirjallisuuden kulmakivi, ja arvostelu muistetaan lähinnä '
        + 'varoittavana esimerkkinä.',
      teksti: 'Seitsemän veljestä ilmestyi keväällä 1870 Suomalaisen '
        + 'Kirjallisuuden Seuran Novellikirjasto-sarjassa neljänä vihkona. Aleksis '
        + 'Kivi toivoi teokselta helpotusta taloudelliseen ja henkiseen '
        + 'ahdinkoonsa; kirjallisuuspiireissä se sai osakseen niukasti ymmärrystä.\n\n'
        + 'Ajan ihanne oli kansallismielinen ja ylevä kansankuvaus, ja Kiven '
        + 'veljekset olivat kaikkea muuta. Arvostelijaksi osui maan painavin ääni: '
        + 'August Ahlqvist oli seurannut Elias Lönnrotia suomen kielen '
        + 'professorina 1863 ja oli fennougristiikan perustajia. Runoilijanimellä '
        + 'A. Oksanen kirjoittanut professori teilasi kirjan Finlands Allmänna '
        + 'Tidningenissä ja kutsui sitä myöhemmin häpeäpilkuksi suomalaisessa '
        + 'kirjallisuudessa.\n\n'
        + 'Arvostelu pelästytti kustantajan. Vihkojen myynti keskeytettiin ja '
        + 'suunnitelma julkaista teos yhtenä niteenä jäädytettiin kolmeksi '
        + 'vuodeksi, joten romaani ilmestyi kirjana vasta 1873. Kivi kuoli vuoden '
        + '1872 viimeisenä päivänä 38-vuotiaana; ankaran kritiikin on arveltu '
        + 'vaikuttaneen hänen viimeisiin vuosiinsa.\n\n'
        + 'Ahlqvist ei lopettanut kirjailijan kuolemaan vaan kirjoitti hänestä '
        + 'vielä pilkkarunon. Jälkipolvi on äänestänyt toisin: Seitsemästä '
        + 'veljeksestä tuli suomalaisen kirjallisuuden peruskivi ja realistisen '
        + 'kansankuvauksen tienraivaaja, ja arvostelu muistetaan lähinnä siitä, '
        + 'että se oli väärässä. Kivi sijoitti tapahtumat oikean Nurmijärven '
        + 'päälle: useimmilla kirjan paikannimillä on vastineensa maastossa, ja '
        + 'Jukolan talolle on löydetty Palojoelta kaksikin esikuvaa.',
      lahde: 'fi-Wikipedia "Seitsemän veljestä" ja fi-Wikipedia "August Ahlqvist". '
        + 'Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-seitseman-veljesta-kirjasota-photo-v1.jpg`,
          selite: 'Kirjapainon poika tuo Aleksis Kivelle myynnistä vedetyt '
            + 'vihkot, mutta piilottaa yhden takkinsa alle: hän haluaa lukea '
            + 'itse ennen kuin uskoo professoria. August Ahlqvistin '
            + 'murska-arvostelu pysäytti romaanin levityksen, mutta tässä '
            + 'kuvitteellisessa katseessa elää jo lukija, joka ei hylkää '
            + 'veljeksiä.',
          lahde: 'Matkakirjan havainnekuva. Faktat: SKS Tietävä — Seitsemän '
            + 'veljeksen julkaiseminen 1870; vihkojen vetäminen pois '
            + 'myynnistä on dokumentoitu, Fanjunkarsin lähettipoika, '
            + 'piilotettu kappale, Charlotta Lönnqvist ja kuvattu kohtaaminen '
            + 'ovat dramatisoituja.',
          url: 'https://tietava.finlit.fi/7-veljesta/seitseman-veljeksen-julkaiseminen-1870/',
        },
      ],
      visa: {
        kysymys: 'Mitä Seitsemän veljeksen tyrmäävästä arvostelusta seurasi vuonna '
          + '1870?',
        vaihtoehdot: [
          'Kirja kiellettiin keisarillisella asetuksella',
          'Vihkojen myynti keskeytettiin ja kirjajulkaisu lykkääntyi vuosia',
          'Kivi veti teoksensa pois myynnistä ja kirjoitti sen uusiksi',
        ],
        oikea: 1,
      },
    },
    /*
     * Helsingin Kauppatori ja Eteläsatama.
     * Lähde: fi.wikipedia.org: Kieltolaki (Suomi)
     * Lähde: fi.wikipedia.org: Algoth Niska
     * Tarkennettu 120 m: fi-Wikipedia "Kauppatori (Helsinki)" -koordinaatit.
     */
    {
      id: 'kieltolaki-ja-pirtukuningas',
      otsikko: 'Kieltolaki ja pirtukuningas',
      nimio: 'Pirtukuningas',
      vuosi: '1919–1932',
      paikka: 'Helsingin Kauppatori ja Eteläsatama',
      lat: 60.1676, lon: 24.9547,
      kortti: 'Laki kielsi alkoholin, mutta unohti kysyä kansalta. Kolmetoista '
        + 'vuotta pirtu kulki Suomenlahden yli nopeammin kuin tulli ehti '
        + 'perässä, ja tunnetuin salakuljettaja oli entinen '
        + 'maajoukkuejalkapalloilija. Lopulta äänestäjät ratkaisivat ottelun '
        + 'lain tappioksi. Lastien lähtöranta oli Viron — sama tarina alkaa '
        + 'Tallinnan satamasta.',
      teksti: 'Kieltolakiehdotus oli annettu jo 1909, ja Venäjän väliaikainen '
        + 'hallitus vahvisti sen 29. toukokuuta 1917 määräten voimaantulon kahden '
        + 'vuoden päähän. Laki astui voimaan 1. kesäkuuta 1919. Taustalla olivat '
        + 'raittiusliike ja yleinen äänioikeus — kieltolakia on kutsuttu naisten '
        + 'laiksi, koska naisäänestäjät kannattivat sitä erityisesti.\n\n'
        + 'Tunnetuin salakuljettaja oli Algoth Niska, viipurilaissyntyinen '
        + 'jalkapalloilija: Suomen ensimmäisen mestarijoukkueen Unitaksen pelaaja '
        + '1908, maajoukkueessa 1911–1912 ja Tukholman olympialaisissa 1912 '
        + 'vasempana laitahyökkääjänä. Kieltolain tultua voimaan hän ryhtyi '
        + 'tuomaan pirtua ja myi sitä Helsingin hienostolle; tavara tuli '
        + 'virolaisilta ja saksalaisilta laivoilta, myöhemmin Ruotsista.\n\n'
        + 'Laki kuormitti koko yhteiskuntaa. Vuodesta 1922 lähtien kieltolaki- ja '
        + 'juopumusrikokset olivat yli 80 prosenttia kaikista poliisin tietoon '
        + 'tulleista rikoksista, ja kotipoltto palasi saaristoon ja '
        + 'syrjäseuduille. Valtio menetti samalla alkoholiverotulonsa.\n\n'
        + 'Kumoamisadressi kerättiin keväällä 1931, ja 29.–30. joulukuuta 1931 '
        + 'järjestetyssä kansanäänestyksessä yli 70 prosenttia äänesti kumoamisen '
        + 'puolesta. Kieltolaki päättyi 5. huhtikuuta 1932 kello kymmenen, kun '
        + 'ensimmäiset alkoholiliikkeen myymälät avattiin — päivästä ja '
        + 'kellonajasta jäi muistiin numerosarja 543210. Lastien lähtöranta oli '
        + 'Viron puolella, ja sama tarina alkaa Tallinnan satamasta.',
      lahde: 'fi-Wikipedia "Kieltolaki (Suomi)" ja fi-Wikipedia "Algoth Niska". '
        + 'Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-kieltolaki-ja-pirtukuningas-photo-v1.jpg`,
          selite: 'Satamapoika näkee silakoiden alta paljastuvan '
            + 'pirtukanisterin ja etsii Algoth Niskan kasvoilta ohjetta ennen '
            + 'kuin tullimies ehtii lähemmäs. Entinen '
            + 'maajoukkuejalkapalloilija teki kieltolaista merellisen '
            + 'kissa–hiiri-leikin; maine herrasmiesrikollisena syntyi juuri '
            + 'tällaisesta tyyneydestä, vaikka riskin kantoivat myös hänen '
            + 'ympärillään työskennelleet tavalliset ihmiset.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Museovirasto / Finna — '
            + 'Algoth Niska vuonna 1906; Niskan henkilöllisyys, merimies- ja '
            + 'jalkapallotausta sekä pirtukauppa ovat dokumentoituja, '
            + 'satamapoika, kalakauppias, piilotettu lasti ja tullimiehen '
            + 'lähestyminen dramatisoituja.',
          url: 'https://finna.fi/Record/museovirasto.BD1BEAA87B8815A58A0CB541B6870519',
        },
      ],
      visa: {
        kysymys: 'Kuinka kauan Suomen kieltolaki oli voimassa?',
        vaihtoehdot: [
          'Vuodet 1919–1932',
          'Vuodet 1907–1917',
          'Vuodet 1929–1944',
        ],
        oikea: 0,
      },
    },
    /*
     * Paavo Nurmen patsas, Helsingin Olympiastadion.
     * Lähde: en.wikipedia.org: Paavo Nurmi
     * Lähde: fi.wikipedia.org: Paavo Nurmi
     */
    {
      id: 'nurmen-amatoorikohu',
      otsikko: 'Nurmen amatöörikohu',
      nimio: 'Nurmen kohu',
      vuosi: '1932',
      paikka: 'Paavo Nurmen patsas, Helsingin Olympiastadion',
      lat: 60.1875, lon: 24.9272,
      kortti: 'Aikakauden kovin kestävyysjuoksija pysäytettiin lopulta paperilla, '
        + 'ei radalla: kaksi päivää ennen avajaisia kokous päätti, ettei Nurmi '
        + 'juokse. Kysymys kuului, oliko juoksija ottanut matkoistaan rahaa — '
        + 'vastausta ei virallisesti annettu koskaan, mutta maratonhaave jäi.',
      teksti: 'Paavo Nurmi aikoi päättää uransa maratonkultaan, kuten esikuvansa '
        + 'Hannes Kolehmainen. Huhtikuussa 1932 kansainvälisen yleisurheilu-liiton '
        + 'IAAF:n johtokunta pidätti hänet kilpailuista amatööriaseman '
        + 'selvittämisen ajaksi. Suomen liitto tutki asian viikossa eikä löytänyt '
        + 'näyttöä ammattilaisuudesta.\n\n'
        + 'Kesäkuun 26. päivänä Nurmi juoksi ensimmäisen maratoninsa '
        + 'olympiakarsinnoissa. Hän veti vanhanmallisen 40,2 kilometrin matkan '
        + 'ajassa 2.22.03,8 juomatta tippaakaan ja johti tulevaa '
        + 'olympiapronssimitalistia Armas Toivosta kuudella minuutilla. Sitten hän '
        + 'keskeytti akillesjänteen takia luottaen siihen, että näyttöä oli '
        + 'tarpeeksi.\n\n'
        + 'Vajaat kolme vuorokautta ennen kymmenentuhannen metrin juoksua sama '
        + 'seitsemän miehen komissio hylkäsi hänen ilmoittautumisensa. '
        + 'Puheenjohtajana oli ruotsalainen Sigfrid Edström. Näyttönä pidettiin '
        + 'saksalaisten kilpailunjärjestäjien valaehtoisia lausuntoja, joiden '
        + 'mukaan Nurmi oli saanut syksyllä 1931 Saksassa 250–500 dollaria '
        + 'kilpailulta.\n\n'
        + 'Uutinen sai tuhannet osoittamaan mieltään Helsingissä, ja uutistoimisto '
        + 'AP kutsui järjestelyä yhdeksi urheilupolitiikan näppärimmistä '
        + 'liikkeistä. Maratonin aattona kaikki kilpailijat suomalaisia lukuun '
        + 'ottamatta allekirjoittivat vetoomuksen Nurmen päästämiseksi mukaan. Se '
        + 'ei auttanut. Ammattilaiseksi häntä ei julistettu koskaan, mutta '
        + 'hyllytyksestä tuli 1934 pysyvä, ja hän lopetti uransa voittamalla '
        + 'kymmenentuhatta metriä Viipurissa 16. syyskuuta 1934. Suomi katkaisi '
        + 'maaottelut Ruotsin kanssa vuoteen 1939 asti.',
      lahde: 'en-Wikipedia "Paavo Nurmi" ja fi-Wikipedia "Paavo Nurmi". '
        + 'Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-nurmen-amatoorikohu-photo-v1.jpg`,
          selite: 'Nuori joukkueen viestinviejä ei tohdi nostaa katsettaan, '
            + 'kun Paavo Nurmi lukee paperin, joka pitää hänet poissa Los '
            + 'Angelesin radalta. Sekuntikello käy yhä hänen kädessään: mies '
            + 'oli matkustanut vammasta huolimatta tavoittelemaan '
            + 'maratonkultaa, mutta amatöörisääntöjen tulkinta teki '
            + 'juoksijasta katsojan.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Paavo Nurmi Heritage — '
            + 'Life story: Los Angeles 1932; Nurmen Los Angelesissa jatkunut '
            + 'harjoittelu, jalkavaiva ja amatööriasemaan perustunut '
            + 'kilpailukielto ovat dokumentoituja, nuori viestinviejä ja '
            + 'kuvattu paperinluovutus dramatisoituja.',
          url: 'https://paavonurmi.fi/en/life-story/',
        },
      ],
      visa: {
        kysymys: 'Miksi Paavo Nurmi ei saanut kilpailla Los Angelesin '
          + 'olympialaisissa 1932?',
        vaihtoehdot: [
          'Hän myöhästyi laivamatkalta Amerikkaan',
          'Loukkaantuminen esti maratonin juoksemisen',
          'IAAF hyllytti hänet amatöörisääntöepäilyjen vuoksi',
        ],
        oikea: 2,
      },
    },
  ],
  FRA: [
    /*
     * Louvre, Pariisi.
     * Lähde: en-Wikipedia "Vincenzo Peruggia" (tarkistettu 30.8.2026)
     */
    {
      id: 'mona-lisan-varkaus-1911',
      otsikko: 'Mona Lisan varkaus',
      nimio: 'Mona Lisan varkaus',
      vuosi: '1911–1913',
      paikka: 'Louvre, Pariisi',
      lat: 48.8611, lon: 2.3364,
      kortti: 'Maailman kuuluisin taulu käveli ulos Louvresta maanantaiaamuna '
        + 'museon työtakki päällä, eikä kukaan huomannut mitään ennen seuraavaa '
        + 'päivää. Varas '
        + 'odotti sankarin mainetta Italiassa — sai sellin ja jälkimaailmalta '
        + 'sivuosan taulun tarinassa. Taulu sen sijaan sai varkaudesta '
        + 'lopullisen maailmanmaineensa.',
      teksti: 'Vincenzo Peruggia oli italialainen koristemaalari, joka oli tehnyt '
        + 'Louvressa lasitöitä — muun muassa Mona Lisan suojakotelon, jonka '
        + 'avaamiseen meni häneltä minuutteja. Maanantaina 21. elokuuta 1911 hän '
        + 'käveli museoon aamuseitsemältä työntekijöiden ovesta valkoisessa '
        + 'työtakissa. Maanantai oli kesäkauden sulkupäivä, ja talo oli tyhjä.\n\n'
        + 'Salon Carrésta hän nosti taulun neljältä rautatapilta, vei sen '
        + 'palvelusportaisiin, irrotti kotelon ja kehyksen ja jätti ne portaiden '
        + 'tasanteelle opiskelijatöiden taakse. Ulos hän pääsi huoltoovesta, jonka '
        + 'putkimies avasi luullen häntä museon mieheksi. Varkaus huomattiin vasta '
        + 'seuraavana päivänä, kun taulua kopioimaan tullut maalari löysi tyhjän '
        + 'seinän.\n\n'
        + 'Etsintä oli valtava ja hämmästyttävän huono. Peruggia oli jättänyt '
        + 'peukalonjäljen suojalasiin, ja hänen sormenjälkensä olivat poliisin '
        + 'kortistossa, mutta hänen nimensä unohtui vertailtavien listalta. Etsivä '
        + 'kävi asunnossa ja kirjoitti raporttinsa nojaten pöytään, jonka alla '
        + 'olevassa kolossa taulu oli. Pablo Picasso ja runoilija Guillaume '
        + 'Apollinaire ehdittiin pidättää.\n\n'
        + 'Kaksi vuotta myöhemmin Peruggia vei taulun junalla Firenzeen ja tarjosi '
        + 'sitä nimellä Leonardo V taidekauppias Alfredo Gerille. Uffizin johtaja '
        + 'Giovanni Poggi tunnisti teoksen, ja poliisi haki miehen hotellista '
        + 'joulukuussa 1913. Tuomioksi tuli vuosi ja viisitoista päivää, '
        + 'valituksen jälkeen seitsemän kuukautta. Taulu kiersi ensin näyttelyissä '
        + 'Italiassa ja palasi Louvreen samana vuonna.',
      lahde: 'en-Wikipedia "Vincenzo Peruggia". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-mona-lisan-varkaus-1911-photo-v1.jpg`,
          selite: 'Huoltomies avaa juuttuneen oven Vincenzo Peruggialle ja '
            + 'luulee auttavansa työtoveria. Valkoisen takin alla kulkee Mona '
            + 'Lisa — pieni puupaneeli, joka katoaa yli kahdeksi vuodeksi ja '
            + 'palaa Louvreen paljon kuuluisampana kuin lähti.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Louvre — The theft of the '
            + 'century; Peruggian henkilöllisyys, lasittajantausta, valkoinen '
            + 'työtakki, 21.8.1911 tehty varkaus ja teoksen yli kaksivuotinen '
            + 'katoaminen ovat dokumentoituja, huoltoportaikon katsekontakti '
            + 'ja kuvattu sekunti dramatisoituja.',
          url: 'https://www.louvre.fr/en/explore/the-palace/from-the-mona-lisa-to-the-wedding-feast-at-cana',
        },
      ],
      visa: {
        kysymys: 'Missä kaupungissa Mona Lisa löytyi yli kaksi vuotta varkauden '
          + 'jälkeen?',
        vaihtoehdot: [
          'Milanossa',
          'Firenzessä',
          'Roomassa',
        ],
        oikea: 1,
      },
    },
    /*
     * Versailles'n palatsi.
     * Lähde: en-Wikipedia "Affair of the Diamond Necklace" (tarkistettu
     *   30.8.2026)
     */
    {
      id: 'kaulanauhajuttu-1785',
      otsikko: 'Kuningattaren kaulanauhajuttu',
      nimio: 'Kaulanauhajuttu',
      vuosi: '1784–1785',
      paikka: 'Versailles\'n palatsi',
      lat: 48.8049, lon: 2.1204,
      /*
       * KAUPUNKIKATOSTA VAPAA (js/fokuskohteet.js, osio KATTOVAPAA):
       * Versailles on 20 kilometriä Pariisin keskustasta eikä osu
       * kaupunkilehden kohdekartan rajaukseen, joten merkki kuuluu
       * pääkartalle — kaupunkinostojen katto ei koske sitä.
       */
      kattoVapaa: true,
      kortti: 'Huijari myi kardinaalille tarinan, kardinaali osti '
        + 'timanttikaulanauhan kuningattarelle, eikä kuningatar tiennyt asiasta '
        + 'mitään. Kun lasku erääntyi, kaulanauha oli jo pilkottu myyntiin. '
        + 'Maksajaksi jäi lopulta koko kuningaskunta — maineessa mitattuna.',
      teksti: 'Kaulanauha oli tilattu 1772 Ludvig XV:n rakastajattarelle Madame du '
        + 'Barrylle, ja jalokivikauppiaat Boehmer ja Bassenge kokosivat siihen '
        + 'vuosia timantteja. Kuningas kuoli ennen kuin työ valmistui, ja Marie '
        + 'Antoinette kieltäytyi ostamasta kahdesti. Hinta oli kaksi miljoonaa '
        + 'livreä.\n\n'
        + 'Jeanne de Valois-Saint-Rémy, tunnetumpi nimellä Jeanne de la Motte, '
        + 'vakuutti kardinaali de Rohanille olevansa kuningattaren suosiossa. '
        + 'Kirjeenvaihto oli sepitetty: kirjeet kirjoitti Jeannen rakastaja Rétaux '
        + 'de Villette. Elokuussa 1784 Rohan tapasi Versailles\'n puistossa '
        + 'pimeällä naisen, jota luuli kuningattareksi; hän oli Nicole Le Guay '
        + 'd\'Oliva, palkattu yhdennäköisyytensä vuoksi.\n\n'
        + 'Tammikuussa 1785 Rohan osti kaulanauhan maksuerissä ja luovutti sen '
        + 'Jeannen talossa miehelle, jota piti kuningattaren palvelijana. Timantit '
        + 'purettiin heti ja myytiin Pariisin ja Lontoon mustilla markkinoilla. '
        + 'Ostomääräyksen allekirjoitus kuului "Marie Antoinette de France" — '
        + 'Ranskan kuninkaalliset allekirjoittivat pelkällä etunimellä, mutta sitä '
        + 'kardinaali ei muistanut.\n\n'
        + 'Rohan pidätettiin peilisalissa 15. elokuuta 1785 ja vapautettiin '
        + 'oikeudessa 31. toukokuuta 1786. Jeanne tuomittiin elinkautiseen, mutta '
        + 'pakeni vuoden kuluttua vankilasta pojaksi pukeutuneena ja julkaisi '
        + 'Lontoossa muistelmat, joissa syytti kuningatarta uudelleen. Oikeus '
        + 'totesi Marie Antoinetten syyttömäksi; yleisö ei uskonut, ja '
        + 'kuningattaren maine ei toipunut.',
      lahde: 'en-Wikipedia "Affair of the Diamond Necklace". Tarkistettu 2.9.2026.',
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-kaulanauhajuttu-1785-photo-v1.jpg`,
          selite: 'Jalokivisepän nuori apulainen ymmärtää ensimmäisenä, ettei '
            + 'kuningattaren nimi näytä oikealta, mutta kardinaali on jo '
            + 'painanut sulkakynän paperiin. Jeanne de la Motte tarvitsee '
            + 'vain hetken hiljaisuutta: 650 timantin kaulanauha katoaa, ja '
            + 'syytön Marie Antoinette joutuu kantamaan petoksen mainehaitan.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Château de Versailles — '
            + 'L\'affaire du collier de la Reine; Rohanin toimiminen '
            + 'välikätenä, väärennetty kuningattaren kirjeenvaihto, kallis '
            + 'timanttikaulanauha ja Jeannen petos ovat dokumentoituja, '
            + 'oppipoika, hänen havaintonsa ja kuvattu allekirjoitushetki '
            + 'dramatisoituja.',
          url: 'https://www.chateauversailles.fr/decouvrir/histoire/grandes-dates/affaire-collier-reine',
        },
      ],
      visa: {
        kysymys: 'Kenen nimissä huijari Jeanne de la Motte sai kardinaali de Rohanin '
          + 'ostamaan timanttikaulanauhan?',
        vaihtoehdot: [
          'Kuningatar Marie Antoinetten',
          'Keisarinna Maria Teresian',
          'Madame de Pompadourin',
        ],
        oikea: 0,
      },
    },
    /*
     * Institut de France (tiedeakatemia), Pariisi.
     * Lähde: en-Wikipedia "Denis Vrain-Lucas" (tarkistettu 30.8.2026)
     */
    {
      id: 'vrain-lucas-kirjevaarennokset',
      otsikko: 'Vrain-Lucasin 27 000 väärennettyä kirjettä',
      nimio: 'Vrain-Lucas',
      vuosi: '1861–1870',
      paikka: 'Institut de France (tiedeakatemia), Pariisi',
      lat: 48.8573, lon: 2.3372,
      kortti: 'Kleopatra kirjoitti Julius Caesarille ranskaksi, vesileimatulle '
        + 'paperille — ja kuuluisa matemaatikko osti kirjeen ilomielin, ja '
        + 'perään 27 000 muuta. Kansallisylpeys teki ostajasta sokean: olihan '
        + 'kirjeissä todiste, että painovoima keksittiin Ranskassa. '
        + 'Tiedeakatemia ei ollut aivan yhtä ilahtunut.',
      teksti: 'Denis Vrain-Lucas oli lakikirjuriksi kouluttautunut ranskalainen, '
        + 'joka alkoi 1854 väärentää historiallisia asiakirjoja. Hän hankki '
        + 'aikakauden mukaista paperia, valmisti musteensa itse ja keräsi '
        + 'yksityiskohdat keisarillisesta kirjastosta.\n\n'
        + 'Vuonna 1861 hän myi matemaatikko ja keräilijä Michel Chaslesille Robert '
        + 'Boylen, Isaac Newtonin ja Blaise Pascalin kirjeitä. Yhdessä niistä '
        + 'Pascal ilmoitti keksineensä painovoiman lait ennen Newtonia. '
        + 'Ranskalaisen ensisijaisuus oli kaupan paras myyntipuhe, ja Chasles '
        + 'halusi lisää.\n\n'
        + 'Kuudentoista vuoden aikana Vrain-Lucas väärensi noin 27 000 kirjettä ja '
        + 'asiakirjaa: Maria Magdaleenaa, Kleopatraa, Juudasta, Pontius Pilatusta, '
        + 'Jeanne d\'Arcia, Ciceroa ja Dantea myöten — kaikki 1800-luvun ranskaksi '
        + 'ja vesileimatulle paperille. Chasles maksoi niistä 140 000–150 000 '
        + 'frangia.\n\n'
        + 'Vuonna 1867 Chasles vei Pascal-kirjeet tiedeakatemialle todisteeksi. '
        + 'Käsiala ei vastannut Pascalin varmoja kirjeitä. Kun akatemia huomautti '
        + 'anakronismeista, Vrain-Lucas väärensi lisää kirjeitä selittämään '
        + 'edelliset. Väittely jatkui 1868 asti, ja seuraavana vuonna hänet '
        + 'pidätettiin. Helmikuussa 1870 Pariisin tuomioistuin antoi kaksi vuotta '
        + 'vankeutta ja 500 frangin sakon. Chasles ei saanut rahojaan takaisin. '
        + 'Jutulla on jälkinäytös: vuonna 2004 eräs tiedelehti julkaisi äskettäin '
        + 'löytyneen kirjeen, jonka Vrain-Lucas oli muka kirjoittanut vankilasta '
        + 'Chaslesille 1871 — sekin oli sepite.',
      lahde: 'en-Wikipedia "Denis Vrain-Lucas". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mikä paljasti järkevälle lukijalle Vrain-Lucasin \'Kleopatran '
          + 'kirjeet\' väärennöksiksi?',
        vaihtoehdot: [
          'Muste oli kemiallisesti uutta',
          'Kirjeet oli sinetöity väärin',
          'Ne oli kirjoitettu 1800-luvun ranskaksi',
        ],
        oikea: 2,
      },
    },
  ],
  GBR: [
    /*
     * Piltdown, East Sussex (löytöpaikka).
     * Lähde: en.wikipedia.org: Piltdown Man
     */
    {
      id: 'piltdownin-ihminen',
      otsikko: 'Piltdownin ihminen — puuttuva rengas joka ei ollut',
      nimio: 'Piltdownin ihminen',
      vuosi: '1912–1953',
      paikka: 'Piltdown, East Sussex (löytöpaikka)',
      lat: 50.9878, lon: 0.0628,
      kortti: 'Sorakuopasta nousi 1912 \'ihmiskunnan puuttuva rengas\': ihmisen kallo '
        + 'ja apinan leuka samassa paketissa. Tiedemaailma nielaisi syötin '
        + 'neljäksikymmeneksi vuodeksi — kukaan ei tullut kysyneeksi, miksi '
        + 'luut oli värjätty. Löytäjä halusi kuuluisaksi, ja tulikin: '
        + 'väärentäjänä.',
      teksti: 'Helmikuussa 1912 amatööriarkeologi Charles Dawson ilmoitti '
        + 'luonnonhistoriallisen museon geologian intendentille Arthur Smith '
        + 'Woodwardille löytäneensä Piltdownin sorakuopasta ihmismäisen kallon '
        + 'palan. Kesällä löytyi lisää: leukaluu, hampaita ja kivityökaluja. '
        + 'Woodward kokosi kallon, arvioi sen 500 000 vuoden ikäiseksi ja antoi '
        + 'löydölle nimen Eoanthropus dawsoni, Dawsonin aamuruskon ihminen.\n\n'
        + 'Epäilyt alkoivat heti. David Waterston julkaisi 1913 Nature-lehdessä '
        + 'päätelmän, että kyseessä on apinan leuka ja ihmisen kallo; ranskalainen '
        + 'Marcellin Boule päätyi samaan 1915 ja yhdysvaltalainen Gerrit Smith '
        + 'Miller omalla tahollaan. Franz Weidenreich totesi 1923 aineiston olevan '
        + 'nykyihmisen kallo ja orangin leuka, jonka hampaat oli viilattu.\n\n'
        + 'Aukkoja täytettiin sitä mukaa kuin niitä huomattiin. Elokuussa 1913 '
        + 'Woodward, Dawson ja jesuiittapaleontologi Pierre Teilhard de Chardin '
        + 'etsivät kaivuumaista puuttuvaa kulmahammasta, ja Teilhard löysi '
        + 'sellaisen, joka sopi leukaan täydellisesti. Vuonna 1915 Dawson ilmoitti '
        + 'löytäneensä toisen kallon parin kilometrin päästä mutta ei koskaan '
        + 'kertonut mistä. Silti Piltdownin ihminen pysyi oppikirjoissa '
        + 'neljäkymmentä vuotta. Vasta 1953 tehty tutkimus osoitti kokonaisuuden '
        + 'väärennökseksi: luut oli värjätty samansävyisiksi ja hampaat viilattu '
        + 'kulumaan ihmisen tapaan. Vuoden 2016 laaja selvitys nimesi tekijäksi '
        + 'Dawsonin, jonka motiiviksi arvioitiin halu päästä oikeiden tutkijoiden '
        + 'joukkoon.\n\n'
        + 'Muistokivi ehdittiin paljastaa löytöpaikalla vielä 1938. Piltdown on '
        + 'siitä lähtien ollut tieteenhistorian vakioesimerkki siitä, että '
        + 'väärennös menee helpoiten läpi silloin, kun se kertoo juuri sen, mitä '
        + 'on toivottu kuultavan.',
      lahde: 'en-Wikipedia "Piltdown Man". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mistä Piltdownin ihminen oli oikeasti koottu?',
        vaihtoehdot: [
          'Neandertalinihmisen luurangosta',
          'Ihmisen kallosta ja apinan leukaluusta',
          'Kipsistä valetusta jäljennöksestä',
        ],
        oikea: 1,
      },
    },
    /*
     * South Sea House, Threadneedle Street, Lontoo.
     * Lähde: en.wikipedia.org: South Sea Company
     * Korjattu 90 m: Threadneedle Streetin ja Bishopsgaten kulma
     *   (Nominatim/OSM), jossa South Sea House seisoi — vanha piste oli
     *   Bishopsgatella talon pohjoispuolella.
     */
    {
      id: 'etelameren-kupla',
      otsikko: 'Etelämeren kupla — pörssiromahdus joka opetti sanan \'bubble\'',
      nimio: 'Etelämeren kupla',
      vuosi: '1720',
      paikka: 'South Sea House, Threadneedle Street, Lontoo',
      lat: 51.5146, lon: -0.0837,
      kortti: 'Yhtiöllä oli yksinoikeus kauppaan, jota ei voinut käydä, ja osake, '
        + 'joka vain nousi — kunnes ei enää noussut. Lontoo oppi vuonna 1720 '
        + 'sanan \'kupla\' kalleimmalla mahdollisella tavalla. '
        + 'Konttorirakennuksen nimi seisoo yhä Threadneedle Streetin kulmassa.',
      teksti: 'South Sea Company perustettiin tammikuussa 1711 hoitamaan '
        + 'Britannian valtionvelkaa: velkojat luovuttivat saatavansa yhtiölle ja '
        + 'saivat tilalle osakkeita, ja valtio maksoi yhtiölle vuosittain 568 279 '
        + 'puntaa. Kaupankäyntioikeus Etelä-Amerikkaan tuli kaupan päälle — alue '
        + 'oli Espanjan hallussa, jonka kanssa Britannia oli sodassa.\n\n'
        + 'Ainoa todellinen kauppaoikeus oli Utrechtin rauhan 1713 asiento: lupa '
        + 'kuljettaa orjuutettuja afrikkalaisia Espanjan siirtomaihin ja lähettää '
        + 'vuodessa yksi tavaralaiva. Sekään ei tuottanut voittoa. Ensimmäiset '
        + 'lastit jouduttiin myymään tappiolla, koska paikalliset viranomaiset '
        + 'eivät tunnustaneet sopimusta.\n\n'
        + 'Vuonna 1720 osakkeen hinta nousi noin sadasta punnasta lähes tuhanteen. '
        + 'Yhtiö osti omia osakkeitaan, lainasi ostajille rahaa näitä samoja '
        + 'osakkeita vastaan ja lahjoi poliitikkoja; johtajat kävivät kauppaa '
        + 'etukäteistiedolla. Kesäkuussa säädetty Bubble Act, joka kielsi '
        + 'osakeyhtiöiden perustamisen ilman kuninkaan lupaa, nosti kurssia '
        + 'entisestään — ja sitten se romahti lähes liikkeeseenlaskuhintaan.\n\n'
        + 'Parlamentin tutkinta nöyryytti joukon poliitikkoja, ja laittomasti '
        + 'hyötyneiltä takavarikoitiin omaisuutta voittojen suhteessa; useimmat '
        + 'olivat olleet rikkaita ennen ja pysyivät rikkaina. Yhtiö järjesteltiin '
        + 'uusiksi ja jatkoi toimintaansa yli sadan vuoden ajan. Kilpailijan '
        + 'kaatuminen vahvisti Englannin Pankin aseman valtion pankkiirina.',
      lahde: 'en-Wikipedia "South Sea Company". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miksi South Sea Companyn luvattu Etelä-Amerikan kauppa ei koskaan '
          + 'tuottanut voittoa?',
        vaihtoehdot: [
          'Espanja ja Portugali hallitsivat aluetta, eikä kauppaa päässyt '
            + 'syntymään',
          'Yhtiön laivat upposivat myrskyissä',
          'Parlamentti kielsi kaupankäynnin heti alkuunsa',
        ],
        oikea: 0,
      },
    },
    /*
     * Leithin satama, Edinburgh (siirtolaislaivan lähtöpaikka).
     * Lähde: en.wikipedia.org: Gregor MacGregor
     */
    {
      id: 'poyaisin-huijaus',
      otsikko: 'Poyais — maa jota ei ollut olemassa',
      nimio: 'Poyais',
      vuosi: '1821–1823',
      paikka: 'Leithin satama, Edinburgh (siirtolaislaivan lähtöpaikka)',
      lat: 55.98, lon: -3.17,
      kortti: 'MacGregor ei myynyt sijoittajille huonoa maata — hän myi maata, jota '
        + 'ei ollut olemassa lainkaan. Poyaisilla oli lippu, obligaatiot ja '
        + 'opaskirjakin; puuttui vain itse valtio. Laivat purjehtivat kartalta '
        + 'löytymättömään satamaan täydessä lastissa.',
      teksti: 'Gregor MacGregor oli skotlantilainen upseeri, joka oli palvellut '
        + 'Venezuelan ja Uuden Granadan itsenäisyyssodissa kenraaliksi asti. '
        + 'Palattuaan Britanniaan 1821 hän ilmoitti, että Mosquito-rannikon '
        + 'kuningas George Frederic Augustus oli nimittänyt hänet Poyaisin '
        + 'cazikeksi, ja kuvaili maata kehittyneeksi siirtokunnaksi, jossa oli jo '
        + 'brittiläinen yhteisö.\n\n'
        + 'Sadat sijoittivat säästönsä Poyaisin valtionobligaatioihin ja '
        + 'maakirjoihin. Noin 250 ihmistä lähti matkaan 1822–1823. Perillä '
        + 'Hondurasissa odotti koskematon viidakko: ei satamaa, ei kaupunkia, ei '
        + 'virastoa. Yli puolet lähtijöistä kuoli, ja vajaat viisikymmentä palasi '
        + 'kotiin loppuvuodesta 1823.\n\n'
        + 'Kun brittilehdistö kertoi petoksesta, osa uhreista puolusti '
        + 'MacGregoria: kenraalin oli heidän mukaansa pettänyt ne, jotka olivat '
        + 'hoitaneet siirtolaisretken. Ranskassa hänet ja kolme muuta pantiin '
        + 'syytteeseen 1826, kun hän yritti samaa siellä. Tuomion sai vain yksi '
        + 'avustaja; MacGregor vapautettiin.\n\n'
        + 'Hän jatkoi pienempiä Poyais-järjestelyjä Lontoossa vielä vuosikymmenen '
        + 'ajan. Vuonna 1838 hän muutti Venezuelaan, jossa hänet otettiin vastaan '
        + 'sankarina. Hän kuoli Caracasissa 1845 ja sai täydet sotilaalliset '
        + 'kunnianosoitukset ja haudan kaupungin katedraalista. '
        + 'Poyais-järjestelyjä hän ehti pyörittää yhteensä kuusitoista vuotta, '
        + 'vuodesta 1821 vuoteen 1837.',
      lahde: 'en-Wikipedia "Gregor MacGregor". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mitä Poyaisiin purjehtineet siirtolaiset löysivät perille '
          + 'päästyään?',
        vaihtoehdot: [
          'Espanjalaisten miehittämän linnoituksen',
          'Hylätyn kultakaivoksen',
          'Pelkkää koskematonta viidakkoa',
        ],
        oikea: 2,
      },
    },
  ],
  GRC: [
    /*
     * Parthenon, Ateenan Akropolis.
     * Lähde: en-Wikipedia "Elgin Marbles" (tarkistettu 30.8.2026)
     */
    {
      id: 'elginin-marmorit',
      otsikko: 'Elginin marmorikiista',
      nimio: 'Elginin marmorit',
      vuosi: '1801–',
      paikka: 'Parthenon, Ateenan Akropolis',
      lat: 37.9715, lon: 23.7267,
      kortti: 'Parthenonin friisi lähti Ateenasta laivalla 1800-luvun alussa, eikä '
        + 'ole vieläkään palannut. Lupapaperista kiistellään kohta kolmatta '
        + 'vuosisataa — harvasta kuitista on väännetty näin pitkään. Ateenassa '
        + 'marmoreille on varattu museosali valmiiksi, varmuuden vuoksi.',
      teksti: 'Thomas Bruce, seitsemäs Elginin jaarli, oli Britannian '
        + 'suurlähettiläänä Konstantinopolissa. Hänen asiamiehensä irrottivat '
        + 'vuosina 1801–1812 noin puolet Parthenonin säilyneistä veistoksista sekä '
        + 'osia Erekhtheionista, Athena Niken temppelistä ja Propylaiasta ja '
        + 'lähettivät ne Britanniaan.\n\n'
        + 'Lupa perustui asiakirjaan, jonka Elgin kertoi saaneensa heinäkuussa '
        + '1801. Alkuperäistä ei ole löytynyt Turkin arkistoista; se oli vielä '
        + '1810 Ateenassa ja tuhoutui luultavasti kaupungin hallintoarkiston '
        + 'mukana 1821. Kreetan yliopiston Vassilis Demetriades on esittänyt, '
        + 'ettei kyseessä ollut sulttaanin firmaani vaan suurvisiirin sijaisen '
        + 'kirje, jolla ei ollut lain voimaa; toiset tutkijat pitävät asiakirjaa '
        + 'pätevänä.\n\n'
        + 'Britanniassa kiisteltiin heti. Lordi Byron vertasi Elginin tekoa '
        + 'ryöstöön. Parlamentin valiokunta tutki asian 1816, piti hankintaa '
        + 'laillisena ja suositti ostoa: parlamentti hyväksyi 35 000 punnan kaupan '
        + 'äänin 82–30, ja veistokset siirrettiin British Museumin huostaan 8. '
        + 'elokuuta 1816.\n\n'
        + 'Kreikka pyysi veistoksia virallisesti takaisin 1983 ja vei asian '
        + 'Unescoon; Britannia kieltäytyi sovittelusta. Vuonna 2009 avattu '
        + 'Akropolis-museo esittää säilyneen friisin alkuperäisessä asennossaan '
        + 'Parthenonin näköetäisyydellä ja merkitsee Lontoossa olevat osat '
        + 'valkoisin kipsivaloksin, ja tyhjää tilaa jää sinne, mistä friisiä ei '
        + 'ole enää olemassa: noin kolmasosa on tuhoutunut kokonaan. Unesco '
        + 'kehotti 2021 Britanniaa ratkaisemaan asian valtioiden välillä. '
        + 'Neuvottelut jatkuvat.',
      lahde: 'en-Wikipedia "Elgin Marbles". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Missä suurin osa Parthenonin irrotetuista veistoksista on nykyään?',
        vaihtoehdot: [
          'Louvressa Pariisissa',
          'British Museumissa Lontoossa',
          'Akropolis-museossa Ateenassa',
        ],
        oikea: 1,
      },
    },
    /*
     * Symin saari, Egeanmeri.
     * Lähde: en-Wikipedia "Constantine Simonides" (tarkistettu 30.8.2026)
     */
    {
      id: 'simonides-kasikirjoitusvaarentaja',
      otsikko: 'Simonides, käsikirjoitusten mestariväärentäjä',
      nimio: 'Simonides',
      vuosi: '1820–1890',
      paikka: 'Symin saari, Egeanmeri',
      lat: 36.6158, lon: 27.8388,
      kortti: 'Simonides myi \'muinaisia\' käsikirjoituksia kuninkaille ja museoille, '
        + 'ja kun eräs aito ikivanha Raamatun koodeksi löytyi, hän ilmoitti '
        + 'tehneensä senkin itse. Mies väärensi urallaan niin paljon, että '
        + 'väärensi lopulta oman kuolemansakin. Paleografia sai hänestä sekä '
        + 'painajaisensa että parhaan mainoksensa.',
      teksti: 'Konstantinos Simonides syntyi Symin saarella 1820. Hän asui '
        + 'Athos-vuoren luostareissa 1839–1841 ja uudelleen 1852 ja hankki sieltä '
        + 'käsikirjoituksia, joita myöhemmin myi. Osan hän valmisti itse: hänellä '
        + 'oli paleografin tiedot, kalligrafin käsi ja ikonikauppiaan verkosto.\n\n'
        + 'Vuosina 1843–1856 hän tarjosi kaikkialla Euroopassa muinaisiksi '
        + 'väittämiään käsikirjoituksia: esihistoriallisella kirjoitustyylillä '
        + 'kirjoitetun Homeroksen, kadonneen egyptiläisen historioitsijan ja '
        + 'Matteuksen evankeliumin papyruksena, muka viisitoista vuotta '
        + 'taivaaseenastumisen jälkeen kirjoitettuna. Osan osti Kreikan kuningas, '
        + 'osan keräilijä Thomas Phillipps; British Museum ja Bodleian '
        + 'kieltäytyivät.\n\n'
        + 'Syyskuun 13. päivänä 1862 Simonides ilmoitti The Guardianissa '
        + 'kirjoittaneensa itse Codex Sinaiticuksen vuonna 1839 ja kutsui sitä '
        + 'nuoruutensa vaatimattomaksi työksi. Väite oli väärä. Kun hänen '
        + 'Uranius-palimpsestinsa paljastui väärennökseksi, Oxfordin '
        + 'yliopistopainon oli tuhottava koko painos muutamaa myytyä kappaletta '
        + 'lukuun ottamatta.\n\n'
        + 'Simonideen kerrottiin kuolleen spitaaliin Aleksandriassa 1867. Tieto '
        + 'oli tekaistu: mies eli Albaniassa nimellä Alkibiades Simonides ja kuoli '
        + 'siellä vasta 1890. Hän luki hieroglyfejä toisin kuin Champollion ja '
        + 'kiisti ammatikseen tutkijoiden käsityksiä — alalla, jossa ainoa hänen '
        + 'kanssaan samaa mieltä ollut oli hän itse. Kirjoittaa hän osasi: hänen '
        + 'töitään julkaistiin Moskovassa, Odessassa, Englannissa ja Saksassa, ja '
        + 'osa jäi painamatta.',
      lahde: 'en-Wikipedia "Constantine Simonides". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Minkä kuuluisan aidon käsikirjoituksen Simonides väitti '
          + 'kirjoittaneensa itse?',
        vaihtoehdot: [
          'Codex Sinaiticuksen',
          'Kuolleenmeren kirjakääröt',
          'Magna Cartan',
        ],
        oikea: 0,
      },
    },
    /*
     * Panathinaikon-stadion, Ateena.
     * Lähde: en-Wikipedia "Athletics at the 1896 Summer Olympics – Men's
     *   marathon" (tarkistettu 30.8.2026)
     * Lähde: en-Wikipedia "Spyridon Belokas" (tarkistettu 30.8.2026)
     */
    {
      id: 'belokas-maratonhuijaus-1896',
      otsikko: 'Maratonin salamatkustaja 1896',
      nimio: 'Maratonhuijaus',
      vuosi: '1896',
      paikka: 'Panathinaikon-stadion, Ateena',
      lat: 37.9683, lon: 23.741,
      kortti: 'Olympia-aate oli 1896 muutaman päivän vanha, kun sitä jo koeteltiin: '
        + 'maratonin kolmonen oli matkannut osan reittiä kärryillä. Yleisö ehti '
        + 'hurrata kreikkalaista kolmoisvoittoa kokonaisen illan. Opetus kesti '
        + 'pidempään kuin pronssi — perässä tullut unkarilainen näet teki '
        + 'vastalauseen, ja se hyväksyttiin.',
      teksti: 'Ajatus Marathonista Ateenaan juostavasta kilpailusta oli Michel '
        + 'Bréalin, ja kreikkalaiset juoksivat siitä kaksi karsintaa jo ennen '
        + 'kisoja: ensimmäisen 22. maaliskuuta 1896 voitti Charilaos Vasilakos '
        + 'ajassa 3.18, toisen 5. huhtikuuta Ioannis Lavrentis. Olympiamaraton '
        + 'juostiin 10. huhtikuuta 1896, matkaa noin 40 kilometriä. Marathoniin '
        + 'matkusti 25 urheilijaa, mutta lähtijöitä oli seitsemäntoista viidestä '
        + 'maasta.\n\n'
        + 'Alussa johti ranskalainen Albin Lermusiaux, sitten australialainen '
        + 'Edwin Flack. Arthur Blake keskeytti 23 kilometrin ja Lermusiaux 32 '
        + 'kilometrin kohdalla. Spyridon Louis nousi kärkeen ja tuli maaliin '
        + 'Panathinaikon-stadionille alle kolmessa tunnissa: se jäi Kreikan '
        + 'ainoaksi yleisurheilun olympiavoitoksi näissä kisoissa.\n\n'
        + 'Toisena tuli Charilaos Vasilakos ja kolmantena ateenalainen Spyridon '
        + 'Belokas, joka ohitti loppusuoralla kiihdyttäneen unkarilaisen Gyula '
        + 'Kellnerin. Kreikkalainen kolmoisvoitto kesti illan. Kellner teki '
        + 'vastalauseen: Belokas oli hänen mukaansa poistunut kilpailusta ja '
        + 'kulkenut osan matkasta hevoskärryillä.\n\n'
        + 'Vastalause hyväksyttiin, Belokas suljettiin pois ja kolmas sija meni '
        + 'Kellnerille. Belokaksesta tiedetään vähän: syntynyt Ateenassa 1877, '
        + 'kuolinaika tuntematon. Nykyaikaiset olympialaiset olivat neljä päivää '
        + 'vanhat, kun niiden ensimmäinen tulosprotesti ratkaistiin.',
      lahde: 'en-Wikipedia "Athletics at the 1896 Summer Olympics – Men\'s '
        + 'marathon" ja en-Wikipedia "Spyridon Belokas". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miten Spyridon Belokas eteni osan vuoden 1896 olympiamaratonista?',
        vaihtoehdot: [
          'Polkupyörällä',
          'Soutuveneellä',
          'Hevoskärryillä',
        ],
        oikea: 2,
      },
    },
  ],
  HRV: [
    /*
     * Rijekan satama ja kaupungin keskusta.
     * Lähde: hr-Wikipedia "Riječka krpica" (tarkistettu 30.8.2026)
     * Lähde: en-Wikipedia "Croatian–Hungarian Settlement" (artikla 66 ja
     *   Rijekan asema; tarkistettu 30.8.2026)
     */
    {
      id: 'rijecka-krpica-1868',
      otsikko: 'Rijekan paperilappu',
      nimio: 'Rijekan lappu',
      vuosi: '1868',
      paikka: 'Rijekan satama ja kaupungin keskusta',
      lat: 45.3271, lon: 14.4422,
      kortti: 'Valtiosopimukseen tuli jälkikäteen pieni korjaus: artiklan päälle '
        + 'liimattiin lappu, jossa luki toinen sisältö. Näin kokonainen '
        + 'satamakaupunki vaihtoi hallitsijaa paperiliuskan hinnalla. '
        + 'Alkuperäinen teksti kuultaa lapun alta yhä — historian ohuin '
        + 'peittely on kestänyt valoa huonosti.',
      teksti: 'Kroatian ja Unkarin sovintosopimus eli nagodba neuvoteltiin 1868 '
        + 'kovilla ehdoilla. Keisari Frans Josef oli hajottanut Kroatian '
        + 'valtiopäivät, ja jo hajotetun sabor-kokouksen valtuuskunnalle saneltiin '
        + 'ehdot. Rijekan asemasta kroatialaiset eivät suostuneet unkarilaisten '
        + 'vaatimuksiin, vaikka keisari asettui avoimesti Unkarin puolelle.\n\n'
        + 'Kun kroatiankielinen teksti oli jo allekirjoitettu, artiklan 66 päälle '
        + 'liimattiin paperiliuska, jossa luki toisin. Uuden tekstin mukaan '
        + 'kaupunki, satama ja piiri muodostivat Unkarin kruunuun erikseen '
        + 'liitetyn alueen — latinaksi separatum sacrae regni coronae adnexum '
        + 'corpus — jonka autonomiasta sovittaisiin myöhemmin kolmen osapuolen '
        + 'kesken.\n\n'
        + 'Alkuperäisessä artiklassa luki vain, ettei Rijekan ja sen piirin '
        + 'asemasta ollut päästy sopuun valiokuntien välillä. Ero on ratkaiseva: '
        + 'kiistanalaisesta alueesta tuli lapun myötä Unkarin kruunun oma, ja '
        + 'kaupunki jäi käytännössä Unkarille.\n\n'
        + 'Lappu on paikallaan yhä, ja alkuperäinen teksti erottuu sen alta '
        + 'vahvassa valossa. Kroatian oikeushistoria tuntee tapauksen nimellä '
        + 'riječka krpica, Rijekan lappu — asiakirja, joka todistaa itse itseään '
        + 'vastaan. Kaupungin asema oli ollut epäselvä jo pitkään: Maria Teresia '
        + 'liitti Rijekan 1776 Kroatian puolelle, Josef II siirsi sen 1786 Pestin '
        + 'suoraan hallintaan, ja välillä se kuului Napoleonin Illyrian '
        + 'provinsseihin.',
      lahde: 'hr-Wikipedia "Riječka krpica" ja en-Wikipedia "Croatian–Hungarian '
        + 'Settlement". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miten Kroatian ja Unkarin sovintosopimuksen Rijekaa koskeva '
          + 'artikla muutettiin 1868?',
        vaihtoehdot: [
          'Sivu kirjoitettiin kokonaan uudelleen ja sinetöitiin',
          'Alkuperäisen tekstin päälle liimattiin paperiliuska uudella '
            + 'tekstillä',
          'Artikla yliviivattiin punakynällä',
        ],
        oikea: 1,
      },
    },
    /*
     * Biograd na Moru (kruunauskaupunki).
     * Lähde: en-Wikipedia "Pacta conventa (Croatia)" (tarkistettu 30.8.2026)
     */
    {
      id: 'pacta-conventa-vaarennosepaily',
      otsikko: 'Pacta conventa — sopimus vai väärennös?',
      nimio: 'Pacta conventa',
      vuosi: '1102 / 1300-luku',
      paikka: 'Biograd na Moru (kruunauskaupunki)',
      lat: 43.9436, lon: 15.4519,
      kortti: 'Yksi pergamentti, kaksi tulkintaa kansakunnan asemasta — ja vanhin '
        + 'kappale on parisataa vuotta väitettyä sopimusta nuorempi. Aito tai '
        + 'ei, paperi teki töitä 800 vuotta valtio-opin raskaassa sarjassa. '
        + 'Historioitsijat väittelevät yhä; pergamentti vaikenee.',
      teksti: 'Kroatian viimeinen oman suvun kuningas Petar Snačić kaatui 1097, '
        + 'eivätkä kroatialaiset antautuneet. Sota päättyi sopimukseen, '
        + 'luultavasti vuonna 1102, jolloin Unkarin kuningas Kálmán kruunattiin '
        + 'Biogradissa myös Kroatian kuninkaaksi.\n\n'
        + 'Asiakirja, jota kutsutaan nimillä Pacta conventa tai Qualiter, lupasi '
        + 'kahdelletoista kroatialaiselle aatelissuvulle — Čudomirićit, Gusićit, '
        + 'Kačićit, Šubićit ja muut — oikeuden pitää maansa ilman veroja ja '
        + 'maksuja kuninkaalle. Vastineeksi kunkin suvun oli rajan tullessa '
        + 'uhatuksi lähetettävä vähintään kymmenen ratsumiestä Dravalle asti '
        + 'omalla kustannuksellaan; joen pohjoispuolella kulut maksoi kuningas.\n\n'
        + 'Vanhin säilynyt käsikirjoitus on 1300-luvulta ja löytyi Trogirin '
        + 'kirjastosta; se on nykyään Unkarin kansallismuseossa Budapestissa. Osa '
        + 'historioitsijoista pitää sitä myöhäiskeskiaikaisena väärennöksenä, osa '
        + 'taas myöhempänä toisintona todellisesta sopimuksesta, jonka sisältö '
        + 'vastaa 1100-luvun oloja.\n\n'
        + 'Kiista ei ole akateeminen sivujuonne. Asiakirjan varassa on perusteltu, '
        + 'että Kroatia liittyi Unkariin sopimuksella eikä valloituksella — ja '
        + 'siitä on johdettu se, millainen asema kuningaskunnalla kuuluu unionissa '
        + 'olla. Milan Šufflay käsitteli kysymystä 1915 ja 1925, ja väittely '
        + 'jatkuu. 1800-luvulle asti asiakirjaa pidettiin yleisesti vuoden 1102 '
        + 'alkuperäisenä; vasta sitten alettiin kysyä, miksi vanhin kappale on '
        + 'kaksisataa vuotta nuorempi kuin sopimus, jota se kuvaa.',
      lahde: 'en-Wikipedia "Pacta conventa (Croatia)". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miksi osa historioitsijoista epäilee vuoden 1102 Pacta conventaa '
          + 'väärennökseksi?',
        vaihtoehdot: [
          'Sen sinetti kuuluu väärälle kuninkaalle',
          'Se on kirjoitettu kielellä, jota ei vielä ollut olemassa',
          'Vanhin säilynyt käsikirjoitus on vasta 1300-luvulta',
        ],
        oikea: 2,
      },
    },
    /*
     * Zagrebin katedraali (Zrinskin ja Frankopanin hauta).
     * Lähde: en-Wikipedia "Magnate conspiracy" (tarkistettu 30.8.2026)
     */
    {
      id: 'zrinski-frankopan-salaliitto',
      otsikko: 'Zrinskin ja Frankopanin salaliitto',
      nimio: 'Zrinski-Frankopan',
      vuosi: '1664–1671',
      paikka: 'Zagrebin katedraali (Zrinskin ja Frankopanin hauta)',
      lat: 45.8144, lon: 15.9799,
      kortti: 'Kaksi Kroatian mahtavinta sukua uskoi keisarin lupaukseen armosta ja '
        + 'matkusti Wieniin neuvottelemaan. Lupaus osoittautui kuolleeksi '
        + 'kirjaimeksi, ja sukujen maat — kolmannes maasta — valuivat keisarin '
        + 'kassaan. Salaliitto epäonnistui perusteellisesti, mutta muistona se '
        + 'on menestynyt: kaksikon nimet ovat Kroatiassa yhä katukylttien '
        + 'vakiokalustoa.',
      teksti: 'Vuoden 1664 Vasvárin rauha päätti Itävallan ja osmanien sodan '
        + 'ehdoilla, jotka olivat rajaseudulla nöyryyttäviä: Wien jätti suuren '
        + 'osan Unkaria ja Kroatiaa osmanien haltuun ja käänsi katseensa '
        + 'Länsi-Eurooppaan. Samaan aikaan hovi keskitti hallintoa ja kavensi '
        + 'suurylimysten valtaa.\n\n'
        + 'Salaliiton aloittivat Kroatian baani Nikola Zrinski ja Unkarin '
        + 'palatiini Ferenc Wesselényi, jotka kumpikin kuolivat ennen kuin hanke '
        + 'paljastui. Mukaan tulivat Nikolan veli Petar Zrinski, tämän lanko Fran '
        + 'Krsto Frankopan, Unkarin ylituomari Franz Nádasdy ja Esztergomin '
        + 'arkkipiispa György Lippay. Suunnitelma oli irrottautua Habsburgeista '
        + 'osmanien tuella — samojen, joita vastaan oli tarkoitus kääntyä heti sen '
        + 'jälkeen.\n\n'
        + 'Hanke oli huonosti järjestetty ja vuoti keisari Leopold I:lle. Zrinski '
        + 'ja Frankopan matkustivat Wieniin luottaen armoon. Heidät ja Nádasdy '
        + 'teloitettiin 1671 maanpetoksesta; ainoana johtohenkilönä säästyi Ferenc '
        + 'Rákóczi, jonka puolesta äiti Sofia Báthory neuvotteli ja maksoi.\n\n'
        + 'Suvut hallitsivat noin 35:tä prosenttia siviilihallinnon alaisesta '
        + 'Kroatiasta, ja maat takavarikoitiin keisarille jaettaviksi. Seuraus '
        + 'näkyy luvuissa: vuosina 1527–1670 Kroatialla oli kolmetoista '
        + 'kroatialaissyntyistä baania, vuosina 1670–1848 enää kaksi.',
      lahde: 'en-Wikipedia "Magnate conspiracy". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mitä Zrinskin ja Frankopanin sukujen maaomaisuuksille tapahtui '
          + 'salaliiton kukistuttua 1671?',
        vaihtoehdot: [
          'Keisari takavarikoi ne itselleen',
          'Ne jaettiin kirkolle ja kaupungeille',
          'Ne myytiin Venetsian tasavallalle',
        ],
        oikea: 0,
      },
    },
  ],
  HUN: [
    /*
     * Visegrádin ylälinna.
     * Lähde: en-Wikipedia: Helene Kottanner
     */
    {
      id: 'pyhan-kruunun-varkaus-1440',
      otsikko: 'Hovinaisen kruunuvarkaus — Pyhän Tapanin kruunu tyynyn sisässä',
      nimio: 'Kruunuvarkaus 1440',
      vuosi: '1440',
      paikka: 'Visegrádin ylälinna',
      lat: 47.7846, lon: 18.9822,
      kortti: 'Unkarin laki oli selvä: kuningas on se, jolla on kruunu. Niinpä '
        + 'hovinainen, pari apuria, viila ja tyyny ratkaisivat '
        + 'kruununperimyksen tehokkaammin kuin yksikään armeija. Jos joskus '
        + 'näet Pyhän Tapanin kruunun vinon ristin, tiedät nyt, että se taipui '
        + 'pakoreessä jäätyneellä Tonavalla.',
      teksti: 'Kuningas Albert kuoli syksyllä 1439, ja kuningatar Elisabeth odotti '
        + 'lasta. Unkarin aateli oli valitsemassa kuninkaaksi Puolan 16-vuotiasta '
        + 'Vladislausta, jonka avulla toivottiin puolustusta osmaneja vastaan. '
        + 'Yksi asia oli kuitenkin varma: kuningas oli se, joka kruunattaisiin '
        + 'Pyhän Tapanin kruunulla.\n\n'
        + 'Kruunu oli Visegrádin linnassa. Kuningatar pyysi hovinaistaan Helene '
        + 'Kottanneria hakemaan sen. Kottanner kirjoitti muistelmissaan '
        + 'pelänneensä pyyntöä, koska se merkitsi vaaraa hänelle ja hänen '
        + 'lapsilleen, ja lupanneensa tehdä paljasjalkaisen pyhiinvaelluksen '
        + 'Zelliin, jos yritys onnistuisi.\n\n'
        + '20. helmikuuta 1440 kaksi apuria mursi lukot Kottannerin vartioidessa. '
        + 'Ovet lukittiin jälkeenpäin ja kuningattaren sinetit pantiin takaisin '
        + 'paikoilleen. Kruunu vietiin ulos tyynyn sisään ommeltuna, ja Kottanner '
        + 'ajoi reellä jäätyneen Tonavan yli peläten jään pettävän. Kruunun '
        + 'kultainen risti taipui matkalla ja on vinossa yhä.\n\n'
        + 'Poika, Ladislaus Jälkeensyntynyt, syntyi Komáromissa saman tunnin '
        + 'sisällä kuin kruunu saapui — niin Kottanner ainakin kirjoitti. Lapsi '
        + 'kruunattiin Székesfehérvárissa 15. toukokuuta 1440, ja Kottanner piti '
        + 'itkevää kuningasta sylissään koko seremonian ajan. Palkkioksi hän sai '
        + '1452 Kisfaludin kylän, ja Matias Corvinus vahvisti lahjoituksen vielä '
        + '1466 ja 1470. Koko tapaus tunnetaan, koska Kottanner saneli siitä noin '
        + '1451 saksaksi muistelman Denkwürdigkeiten — hän oli mukana, ja hän '
        + 'kirjoitti sen ylös.',
      lahde: 'en-Wikipedia "Helene Kottanner". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Missä Unkarin pyhä kruunu piilotettiin, kun se varastettiin '
          + 'Visegrádista 1440?',
        vaihtoehdot: [
          'Viinitynnyrissä',
          'Tyynyn sisässä',
          'Heinäkuorman alla',
        ],
        oikea: 1,
      },
    },
    /*
     * Budapest, de Horyn synnyinkaupunki.
     * Lähde: en-Wikipedia: Elmyr de Hory
     */
    {
      id: 'elmyr-de-hory-vaarentaja',
      otsikko: 'Elmyr de Hory — tuhannen väärennöksen mestari',
      nimio: 'Elmyr de Hory',
      vuosi: '1906–1976 (paljastui 1967–1968)',
      paikka: 'Budapest, de Horyn synnyinkaupunki',
      lat: 47.4979, lon: 19.0402,
      kortti: 'De Hory väärensi mestareita niin hyvin, että asiantuntijat ostivat — '
        + 'ja väärensi oman elämäkertansa niin hyvin, että toimittajat ostivat '
        + 'senkin. Hänestä kirjan kirjoittanut mies jäi pian itse kiinni '
        + 'väärennetyistä muistelmista, mikä lienee alan täydellisin oppitunti: '
        + 'väärentäjän ympärillä kaikki alkaa olla vähän väärennettyä.',
      teksti: 'Elemér Albert Hoffmann syntyi Budapestissa 1906 ja opiskeli maalausta '
        + 'Münchenissä ja Pariisissa, muun muassa Fernand Léger\'n oppilaana. Hänen '
        + 'omat työnsä eivät käyneet kaupaksi. Vuonna 1946 pariisilainen ostaja luuli '
        + 'hänen tussipiirrostaan Picassoksi ja maksoi siitä; siitä alkoi '
        + 'kaksikymmentä vuotta työtä, jossa de Hory esiintyi kotinsa menettäneenä '
        + 'unkarilaisaatelisena ja myi gallerioille sitä, mitä suvun kokoelmasta muka '
        + 'oli jäljellä.'
        + '\n\nPicassoihin tulivat lisäksi Matisse, Modigliani ja Renoir. Kun '
        + 'galleristit alkoivat epäillä, hän vaihtoi nimeä — Louis Cassou, Joseph '
        + 'Dory, E. Raynal — ja siirtyi myymään postitse. 1950-luvun puolivälissä hän '
        + 'myi \'Matissen\' Harvardin Fogg-museolle ja tarjosi perään \'Modiglianin\' '
        + 'ja \'Renoirin\'. Museon intendentti huomasi kolmessa piirroksessa saman '
        + 'käden, kieltäytyi ostamasta ja alkoi kysellä muista museoista. Kauppiaana '
        + 'toiminut Fernand Legros otti myynnistä ensin 40, sitten 50 prosenttia ja '
        + 'maksoi de Horylle 400 dollaria kuussa Ibizalla. Texasilainen öljymies Algur '
        + 'H. Meadows oli ostanut Legros\'lta 56 väärennöstä ja vaati syytteitä.'
        + '\n\nEspanjalainen tuomioistuin tuomitsi de Horyn 1968 kahdeksi kuukaudeksi '
        + 'vankeuteen — ei väärennöksistä, koska ei voitu näyttää toteen, että hän '
        + 'olisi väärentänyt mitään Espanjan maaperällä, vaan homoseksuaalisuudesta, '
        + 'toimeentulon puutteesta ja rikollisten seurasta. Kun Espanja suostui '
        + 'luovuttamaan hänet Ranskaan joulukuussa 1976, hän otti yliannostuksen '
        + 'unilääkettä.'
        + '\n\nYhtä asiaa de Hory kiisti loppuun asti: hän ei ollut koskaan '
        + 'signeerannut työtään toisen taiteilijan nimellä. Toisen tyyliin maalaaminen '
        + 'ei ole rikos — vasta nimikirjoitus tekee taulusta väärennöksen. Nimet '
        + 'saattoi vetää Legros.',
      lahde: 'en-Wikipedia "Elmyr de Hory". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Minkä taiteilijoiden tyyliin Elmyr de Hory erityisesti väärensi '
          + 'teoksia?',
        vaihtoehdot: [
          'Rembrandtin ja Vermeerin',
          'Da Vincin ja Michelangelon',
          'Picasson, Matissen ja Modiglianin',
        ],
        oikea: 2,
      },
    },
    /*
     * Unkarin kansallismuseo, Budapest (aarteen nykyinen koti).
     * Lähde: en-Wikipedia: Seuso Treasure
     */
    {
      id: 'seuso-aarteen-kiista',
      otsikko: 'Seuson hopea-aarre ja väärennetyt paperit',
      nimio: 'Seuson hopeat',
      vuosi: 'löytö n. 1975–76, skandaali 1990, paluu 2014 ja 2017',
      paikka: 'Unkarin kansallismuseo, Budapest (aarteen nykyinen koti)',
      lat: 47.4912, lon: 19.0625,
      kortti: 'Roomalainen hopeakalusto matkusti Unkarin pellosta Lontoon holveihin '
        + 'paperilla, jonka mukaan se oli aina asunut Libanonissa. Hopea itse '
        + 'todisti toista: lautaseen oli kaiverrettu Balatonin roomalainen '
        + 'nimi. Esine voi valehdella alkuperänsä vain, jos kukaan ei lue mitä '
        + 'siihen on kirjoitettu.',
      teksti: 'Aarre on neljätoista koristeltua hopea-astiaa ja kuparipata, jossa ne '
        + 'olivat olleet, 300-luvun lopulta tai 400-luvun alusta. Suurin lautanen on '
        + 'seitsemänkymmentä senttiä leveä ja painaa lähes yhdeksän kiloa. Ensimmäinen '
        + 'kappale tuli myyntiin Lontooseen 1980 kahden wieniläisen antiikkikauppiaan '
        + 'kautta, ja kokonaisuuden osti Spencer Comptonin, Northamptonin seitsemännen '
        + 'markiisin, johtama ryhmä. Paperit tulivat Sveitsin '
        + 'Libanonin-suurlähetystöstä ja kertoivat löytöpaikaksi Tyroksen ja Sidonin '
        + 'seudun.'
        + '\n\nKauppa Gettyn museolle kymmenellä miljoonalla dollarilla raukesi, ja '
        + 'aarre pantiin Sotheby\'sin huutokauppaan New Yorkissa 1990. Myynti '
        + 'pysäytettiin, kun paperit todettiin vääriksi, ja Unkari, Jugoslavia ja '
        + 'Libanon vaativat kukin aarretta itselleen. New Yorkin '
        + 'muutoksenhakutuomioistuin hylkäsi vaatimukset 1993, ja hopeat jäivät '
        + 'markiisin pankkiholviin.'
        + '\n\nUnkarin todiste oli kaiverrus: metsästyslautasessa lukee Pelso, '
        + 'Balatonin roomalainen nimi. Löytäjäksi arvioidaan nuori sotilas József '
        + 'Sümegh, joka kaivoi Polgárdin lähellä noin 1975–76. Hänet löydettiin '
        + 'kuolleena kellarista 1980. Tuolloin puhuttiin itsemurhasta; myöhemmin '
        + 'poliisi päätyi murhaan, ja tutkinta on ollut auki vuosikymmeniä.'
        + '\n\nUnkari osti seitsemän esinettä takaisin 2014 ja loput seitsemän 2017, '
        + 'jälkimmäiset 28 miljoonalla eurolla. Koko aarre on ollut Unkarin '
        + 'kansallismuseossa pysyvästi esillä vuodesta 2019. Scotland Yardin tutkinta '
        + 'esineiden alkuperästä on yhä avoinna.',
      lahde: 'en-Wikipedia "Seuso Treasure". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mikä kaiverrus tuki Unkarin väitettä Seuson aarteen alkuperästä?',
        vaihtoehdot: [
          '\'Pelso\' — Balaton-järven roomalainen nimi',
          '\'Pannonia\' — Rooman maakunnan nimi',
          'Omistajan sukuvaakuna',
        ],
        oikea: 0,
      },
    },
  ],
  IRL: [
    /*
     * Phoenix Park, Dublin (kirjeiden aihe).
     * Lähde: en.wikipedia.org: Richard Pigott
     * Lähde: en.wikipedia.org: Charles Stewart Parnell
     */
    {
      id: 'pigottin-vaarennetyt-kirjeet',
      otsikko: 'Pigottin kirjeet — väärennös joka kaatui yhteen kirjoitusvirheeseen',
      nimio: 'Pigottin kirjeet',
      vuosi: '1887–1889',
      paikka: 'Phoenix Park, Dublin (kirjeiden aihe)',
      lat: 53.36, lon: -6.33,
      kortti: 'Suuri sanomalehti osti kirjeet, jotka olisivat tuhonneet Irlannin '
        + 'kuuluisimman poliitikon — ja koko juttu kaatui yhteen väärin '
        + 'kirjoitettuun sanaan. Väärentäjä teki oikeussalissa saman virheen '
        + 'kuin paperilla. Oikoluku olisi kannattanut.',
      teksti: 'Richard Pigott syntyi Ratoathissa Meathin kreivikunnassa 1835 ja teki '
        + 'uran nationalistisissa lehdissä; vuonna 1879 hän omisti kolme lehteä ja myi '
        + 'ne pian Irlannin maaliitolle. Vuonna 1883 hän syytti maaliiton '
        + 'rahastonhoitajaa siitä, ettei tämä pystynyt tekemään tiliä '
        + 'sadastatuhannesta punnasta. Kun asialle ei tehty mitään, Pigott kääntyi '
        + 'entisiä tovereitaan vastaan ja alkoi myydä tietoja heidän poliittisille '
        + 'vastustajilleen.'
        + '\n\nKirjeet, jotka hän väärensi, esittivät Charles Stewart Parnellin '
        + 'hyväksyneen vuoden 1882 Phoenix Parkin murhat. The Times maksoi niistä 1 '
        + '780 puntaa ja julkaisi pahimman 18. huhtikuuta 1887. Parnell sanoi sitä '
        + 'samana päivänä törkeäksi ja häpeämättömäksi väärennökseksi, mutta lehti '
        + 'piti kiinni aineistostaan, ja asiaa tutkimaan asetettiin '
        + 'erityistuomioistuin.'
        + '\n\nHelmikuussa 1889 kirjeistä löytyi kirjoitusvirhe — hesitency — jonka '
        + 'Pigott oli tehnyt muissakin teksteissään. Todistelu kaatui siihen. Pigott '
        + 'tunnusti väärennökset Henry Labouchèrelle, pakeni Espanjaan ja ampui '
        + 'itsensä madridilaisessa hotellihuoneessa 1. maaliskuuta 1889.'
        + '\n\nParnell haastoi The Timesin oikeuteen ja sai sovinnossa 5 000 puntaa; '
        + 'lehden oikeudenkäyntikulut olivat moninkertaiset. Tuomioistuimen aineisto '
        + 'paisui lopulta kolmeenkymmeneenseitsemään niteeseen. Kun Parnell seuraavan '
        + 'kerran astui alahuoneeseen, jäsenet nousivat seisomaan. Pigottilta jäi '
        + 'neljä poikaa, nuorin kuusivuotias.',
      lahde: 'en-Wikipedia "Richard Pigott" ja en-Wikipedia "Charles Stewart Parnell". '
        + 'Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miten Richard Pigottin väärennös paljastui erityistuomioistuimessa '
          + '1889?',
        vaihtoehdot: [
          'Musteen kemiallinen analyysi osoitti kirjeet uusiksi',
          'Hän toisti sanelussa saman kirjoitusvirheen kuin kirjeissä',
          'Parnell esitti alibin kirjeiden päiväyksille',
        ],
        oikea: 1,
      },
    },
    /*
     * Avondale House, Rathdrum (Parnellin kotitalo).
     * Lähde: en.wikipedia.org: Charles Stewart Parnell
     */
    {
      id: 'parnellin-lankeemus',
      otsikko: 'Parnellin lankeemus — skandaali joka jakoi Irlannin',
      nimio: 'Parnell',
      vuosi: '1890–1891',
      paikka: 'Avondale House, Rathdrum (Parnellin kotitalo)',
      lat: 52.9133, lon: -6.2228,
      kortti: 'Mies, joka piti käsissään Britannian parlamentin vaakaa, kaatui '
        + 'avioero-oikeudenkäyntiin. Vuodessa kansallissankarista tuli '
        + 'puolueensa riitakysymys, ja Irlannin itsehallinto siirtyi '
        + 'sukupolvella eteenpäin. Historia tuntee harvoja kalliimpia '
        + 'yksityiselämän paljastuksia.',
      teksti: 'Vuosien 1885 ja 1886 kotisääntökiistoissa Parnell oli pitänyt käsissään '
        + 'Britannian alahuoneen vaakaa. Kapteeni William O\'Shea jätti '
        + 'avioerohakemuksen 24. joulukuuta 1889 ja nimesi Parnellin '
        + 'kanssavastaajaksi. Käsittely alkoi vasta 15. marraskuuta 1890 ja kesti '
        + 'kaksi päivää. Parnell ei riitauttanut mitään — hän halusi eron menevän läpi '
        + 'voidakseen naida Katharine O\'Shean — joten kapteenin väitteet jäivät '
        + 'kiistämättä, niiden joukossa se, että Parnell oli ollut Katharinen '
        + 'rakastaja vuosikausia ja kolmen tämän lapsen isä. Päätös annettiin 17. '
        + 'marraskuuta.'
        + '\n\nGladstone ilmoitti, ettei voisi enää tehdä työtä Parnellin kanssa. '
        + 'Irlannin parlamenttipuolue kokoontui Westminsterin komiteahuoneeseen numero '
        + '15 1. joulukuuta, paikalla 73 jäsentä. Parnell kieltäytyi väistymästä edes '
        + 'väliaikaisesti ja esti puheenjohtajana kaikki esitykset itsensä '
        + 'syrjäyttämiseksi. Puolue hajosi siihen paikkaan.'
        + '\n\nHän lähti kiertämään maata. Pohjois-Kilkennyn täytevaaleissa hänen '
        + 'ehdokkaansa hävisi lähes kaksi yhteen, ja Castlecomerissa joku heitti hänen '
        + 'silmiinsä sammuttamatonta kalkkia. Hän vihki avioliiton Katharinen kanssa '
        + '25. kesäkuuta 1891; samana päivänä Irlannin katoliset piispat julkaisivat '
        + 'lähes yksimielisen julistuksen, jonka mukaan hän oli tehnyt itsensä '
        + 'kelvottomaksi johtajaksi.'
        + '\n\nParnell kuoli Hovessa 6. lokakuuta 1891 keuhkokuumeeseen 45-vuotiaana. '
        + 'Hautajaisiin Glasnevinin hautausmaalle tuli yli kaksisataatuhatta ihmistä. '
        + 'Hautakiveen, joka pystytettiin vasta 1940, ei kirjoitettu vuosilukuja eikä '
        + 'arvonimiä — siinä lukee vain Parnell.',
      lahde: 'en-Wikipedia "Charles Stewart Parnell". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mikä oli Parnellin vuoden 1890 skandaalin merkittävin poliittinen '
          + 'seuraus?',
        vaihtoehdot: [
          'Irlannin puolue hajosi ja itsehallintohanke lykkääntyi '
            + 'vuosikymmeniksi',
          'Britannia myönsi Irlannille välittömän itsehallinnon',
          'Parnell karkotettiin siirtomaihin',
        ],
        oikea: 0,
      },
    },
    /*
     * Custom House, Dublin (kauppasataman symboli).
     * Lähde: en.wikipedia.org: Ouzel Galley
     */
    {
      id: 'ouzel-galleyn-mysteeri',
      otsikko: 'Ouzel Galley — kadonnut laiva joka palasi aarteineen',
      nimio: 'Ouzel Galley',
      vuosi: '1695–1705',
      paikka: 'Custom House, Dublin (kauppasataman symboli)',
      lat: 53.3485, lon: -6.2531,
      kortti: 'Laiva julistettiin menneeksi, miehistö kuolleiksi ja vakuutukset '
        + 'maksettiin — sitten koko komeus purjehti takaisin satamaan lasti '
        + 'täynnä. Kenelle kuuluu aarre, jonka omistajille on jo korvattu sen '
        + 'menetys? Dublin perusti kysymyksen ratkomiseen kokonaisen seuran.',
      teksti: 'Syksyllä 1695 kauppalaiva Ouzel — mustarastas — lähti Ringsendistä '
        + 'kapteeni Eoghan Masseyn johdolla. Omistaja oli dublinilainen huone Ferris, '
        + 'Twigg ja Cash, määränpää Smyrna. Laivan piti palata seuraavana vuonna. Se '
        + 'ei palannut silloin eikä sitä seuraavana, ja kolmannen vuoden mentyä Dublin '
        + 'piti sitä kadonneena kaikkine miehineen.'
        + '\n\nVuonna 1698 kaupungin arvostetuimmista kauppiaista koottu lautakunta '
        + 'ratkaisi vakuutuskysymyksen: laiva oli menetetty, korvaukset maksettiin, ja '
        + 'kolmekymmentäseitsemän miehistön jäsentä ja kolme päällystöön kuuluvaa '
        + 'julistettiin kuolleiksi. Syksyllä 1700 Ouzel purjehti Liffeytä ylös ruuma '
        + 'täynnä. Massey kertoi, että algerialaiset kaapparit olivat ottaneet laivan '
        + 'menomatkalla, miehistö oli pakotettu palvelemaan merirosvoja viisi vuotta '
        + 'ja että he olivat vallanneet laivan takaisin humalaisten juhlien aikana.'
        + '\n\nDublin ei uskonut tarinaa kokonaan. Ryöstösaalista ei voinut '
        + 'laillisesti jakaa miehistölle, joten sama lautakunta kutsuttiin uudelleen '
        + 'koolle. Se päätti, että kaiken sen jälkeen, mitä omistajille ja '
        + 'vakuuttajille kuului, ylijäämä pantaisiin rahastoksi kaupungin köyhtyneille '
        + 'kauppiaille.'
        + '\n\nOsa miehistöstä palasi kotiin ja löysi vaimonsa naimisissa toisen '
        + 'kanssa ja omaisuutensa jaettuna. Ringsendissä epätavallisissa oloissa '
        + 'syntyneitä lapsia kutsutaan yhä ouzelereiksi. Lautakunnasta tehtiin 1705 '
        + 'pysyvä välimieselin, jonka jäsenmäärä sidottiin laivan miehistön kokoon, '
        + 'neljäänkymmeneen; jäsenillä oli laivan arvonimet, ja joukossa istuivat '
        + 'aikanaan Arthur Guinness ja John Jameson.',
      lahde: 'en-Wikipedia "Ouzel Galley". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mitä Ouzel Galleyn ylimääräiselle saalisrahalle tehtiin, kun '
          + 'omistajat ja vakuuttajat oli hyvitetty?',
        vaihtoehdot: [
          'Se lahjoitettiin kuninkaalle',
          'Se jaettiin miehistön kesken',
          'Se ohjattiin köyhtyneiden kauppiaiden avustusrahastoksi',
        ],
        oikea: 2,
      },
    },
  ],
  ISL: [
    /*
     * Stjórnarráðshúsið (hallituksen talo), Reykjavík.
     * Lähde: en.wikipedia.org: Jørgen Jørgensen
     */
    {
      id: 'koirapaivien-kuningas',
      otsikko: 'Koirapäivien kuningas — kaksi kuukautta vallankumousta',
      nimio: 'Koirapäiväkuningas',
      vuosi: '1809',
      paikka: 'Stjórnarráðshúsið (hallituksen talo), Reykjavík',
      lat: 64.1475, lon: -21.933,
      kortti: 'Mies astui maihin kauppalaivasta, pidätti kuvernöörin ja julisti '
        + 'saarivaltion itsenäiseksi — kaikki tämä yhden kesän aikana. Kahden '
        + 'kuukauden päästä kuningaskunta oli ohi ja kuningas vankina laivassa. '
        + 'Islanti antoi hänelle arvonimen, jota yksikään hallitsija ei ole '
        + 'halunnut periä.',
      teksti: 'Jørgen Jørgensen oli tanskalainen laivuri, joka oli menettänyt '
        + 'aluksensa Admiral Juelin brittien käsiin ja eli Englannissa sotavankina '
        + 'ehdonalaisessa. Kesällä 1809 hän lähti tulkiksi saippuakauppias Samuel '
        + 'Phelpsin kauppamatkalle Islantiin laivalla Margaret & Anne. Islannissa oli '
        + 'pula tavarasta, mutta Tanskan kauppamonopoli ja käynnissä oleva sota '
        + 'tekivät kaupankäynnistä laitonta, eikä kuvernööri, kreivi Trampe, suostunut '
        + 'poikkeukseen.'
        + '\n\nSunnuntaina 25. kesäkuuta Trampe pidätettiin ja vietiin laivalle. '
        + 'Seuraavana päivänä seinälle naulattiin yksitoistakohtainen julistus, jonka '
        + 'Jørgensen allekirjoitti Koko Islannin suojelijana ja ylimpänä käskijänä '
        + 'merellä ja maalla. Phelps rakennutti rantakalliolle patterin kuudelle '
        + 'tykille, ja sen yllä liehui lippu, jonka Jørgensen oli itse suunnitellut: '
        + 'sininen, jossa kolme valkoista litistettyä turskaa.'
        + '\n\nElokuussa Hafnarfjörduriin saapui brittiläinen sotalaiva Talbot. '
        + 'Jørgensenin valta päättyi 19. elokuuta, ja 22. päivänä allekirjoitettiin '
        + 'sopimus, jonka mukaan kaikki hänen julistuksensa olivat mitättömiä. '
        + 'Lontoossa hänet pidätettiin — ei vallankaappauksesta vaan siitä, että hän '
        + 'oli rikkonut sotavangin kunniasanansa — ja hän istui lähes vuoden '
        + 'vankilaivalla, jolla oli kahdeksansataa vankia.'
        + '\n\nPaluumatkalla Margaret & Anne syttyi tuleen. Jørgensen otti palavan '
        + 'laivan komentoonsa; alusta ei pelastettu, mutta koko miehistö saatiin '
        + 'toiseen laivaan. Islanti tuntee hänet nimellä Jörundur hundadagakonungur, '
        + 'koirapäivien kuningas. Hän kuoli 1841 Tasmaniassa, jossa oli toiminut '
        + 'poliisimiehenä.',
      lahde: 'en-Wikipedia "Jørgen Jørgensen" ja is-Wikipedia "Jörundur '
        + 'hundadagakonungur". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miksi islantilaiset kutsuvat Jørgen Jørgenseniä \'koirapäivien '
          + 'kuninkaaksi\'?',
        vaihtoehdot: [
          'Hän kulki kaikkialla koiralaumansa kanssa',
          'Hänen lyhyt valtakautensa osui kesän koirapäiviin',
          'Hän verotti islantilaisten koiria',
        ],
        oikea: 1,
      },
    },
    /*
     * Eldeyn saari (viimeisten lintujen pesäpaikka).
     * Lähde: en.wikipedia.org: Great auk
     */
    {
      id: 'siivettoman-ruokin-loppu',
      otsikko: 'Eldey 1844 — kokoelmiin kerätty sukupuutto',
      nimio: 'Eldey 1844',
      vuosi: '1844',
      paikka: 'Eldeyn saari (viimeisten lintujen pesäpaikka)',
      lat: 63.7409, lon: -22.9576,
      kortti: 'Mitä harvinaisemmaksi lintu kävi, sitä enemmän museot siitä '
        + 'maksoivat — ja sitä nopeammin se katosi. Viimeinen pari haettiin '
        + 'Eldeyn kalliolta tilaustyönä vuonna 1844. Kokoelma täydentyi; laji '
        + 'loppui.',
      teksti: 'Siivetön ruokki oli seitsemänkymmentäviisi senttiä pitkä ja painoi noin '
        + 'viisi kiloa. Sen siivet olivat viidentoista sentin mittaiset eivätkä '
        + 'kantaneet lentoon, mutta vedessä lintu oli nopea. Se pesi kalliosaarilla, '
        + 'yhden munan paljaalle kivelle, ja pesimäyhdyskuntia uskotaan olleen '
        + 'kaikkiaan enintään parikymmentä.'
        + '\n\nViimeinen niistä oli Geirfuglasker Islannin edustalla, jyrkänteiden '
        + 'ympäröimä kallio, jolle ei päässyt maihin. Vuonna 1830 luoto vajosi '
        + 'tulivuorenpurkauksen jälkeen ja linnut siirtyivät Eldeylle, jolle pääsee '
        + 'yhdeltä sivulta. Kun yhdyskunta löydettiin 1835, lintuja oli lähes '
        + 'viisikymmentä. Museot halusivat nahkoja ja munia, ja mitä harvinaisempi '
        + 'lintu oli, sitä enemmän niistä maksettiin.'
        + '\n\nKolmantena kesäkuuta 1844 Jón Brandsson ja Sigurður Ísleifsson nousivat '
        + 'Eldeylle kauppiaan tilauksesta ja tappoivat viimeisen parin, joka hautoi '
        + 'munaa. Sigurður kuvasi tapahtuman myöhemmin lintututkijalle: lintu käveli '
        + 'kuin ihminen, ei päästänyt ääntäkään, ja hän kuristi sen kallionreunalla.'
        + '\n\nNahkoja on jäljellä 78, munia noin 75 ja luurankoja 24. Viimeisen parin '
        + 'silmät ja sisäelimet ovat Kööpenhaminan eläintieteellisessä museossa, mutta '
        + 'nahkojen olinpaikkaa ei tiedetty yli sataankahdeksaankymmeneen vuoteen. '
        + 'DNA-vertailu tunnisti koiraan nahan Brysselistä 2017 ja naaraan '
        + 'Cincinnatista 2025.',
      lahde: 'en-Wikipedia "Great auk". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miksi viimeiset siivettömät ruokit tapettiin Eldeyllä vuonna 1844?',
        vaihtoehdot: [
          'Kauppias halusi yksilöt kokoelmiin',
          'Saarelaiset tarvitsivat ravintoa katovuonna',
          'Linnut uhkasivat kalastajien verkkoja',
        ],
        oikea: 0,
      },
    },
  ],
  ITA: [
    /*
     * Fosso Reale -kanava, Livorno.
     * Lähde: en-Wikipedia "Amedeo Modigliani" (osio Legacy: 1984 heads hoax;
     *   tarkistettu 30.8.2026)
     */
    {
      id: 'modiglianin-paat-1984',
      otsikko: 'Modiglianin väärennetyt päät',
      nimio: 'Modiglianin päät',
      vuosi: '1984',
      paikka: 'Fosso Reale -kanava, Livorno',
      lat: 43.5485, lon: 10.3106,
      kortti: 'Livornon kanavasta nousi 1984 kolme kivipäätä, ja asiantuntijat '
        + 'itkivät liikutuksesta: Modiglianin kadonneet veistokset! Sitten '
        + 'opiskelijat näyttivät television katsojille videon, jolla päät '
        + 'syntyivät porakoneella. Asiantuntijat eivät itkeneet enää '
        + 'liikutuksesta.',
      teksti: 'Modigliani syntyi Livornossa ja piti itseään pitkään ennemmin '
        + 'kuvanveistäjänä kuin maalarina; Pariisissa hän oli vuoden Constantin '
        + 'Brâncușin oppilaana. Kotikaupungissa on kerrottu sukupolvien ajan, että hän '
        + 'heitti epäonnistuneet kivipäänsä kanavaan. Kesällä 1984, sata vuotta '
        + 'taiteilijan syntymästä, Fosso Reale tyhjennettiin, ja pohjasta nousi kolme '
        + 'veistettyä päätä.'
        + '\n\nAsiantuntijat tunnistivat ne Modiglianin kadonneiksi töiksi, ja löytö '
        + 'oli Italian kesän uutinen: kadonnut varhaistuotanto oli palannut ja juuri '
        + 'juhlavuonna. Sitten opiskelijat näyttivät televisiossa videon, jolla he '
        + 'itse veistivät yhden päistä — työkaluna Black & Deckerin porakone.'
        + '\n\nJuttu ei ole yhtä hyvin muistettu siksi, että kyse oli kepposesta, vaan '
        + 'siksi, että se osui kohtaan, jossa taidemaailma on aidosti heikoilla: '
        + 'Modigliani on yksi maailman väärennetyimmistä taiteilijoista. Nousevat '
        + 'hinnat ja lyhyeen elämään kietoutunut legenda ovat pitäneet yllä markkinaa, '
        + 'jossa on arvioitu, että suurin osa hänen nimiinsä pannuista teoksista ei '
        + 'ole hänen.'
        + '\n\nElmyr de Hory myönsi tehneensä useita Modiglianeja. Taidekauppias Klaus '
        + 'Perls osti väärennettyjä Modigliani-veistoksia. Vuonna 2018 Genovan '
        + 'näyttelystä takavarikoitiin kaksikymmentä väärää Modigliania. Livornon '
        + 'kanavasta nousseet päät ovat siis poikkeus vain siinä, että väärentäjät '
        + 'ilmoittautuivat itse.',
      lahde: 'en-Wikipedia "Amedeo Modigliani". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Millä työkalulla opiskelijat paljastivat veistäneensä yhden '
          + 'Livornon kanavasta löytyneistä \'Modiglianin päistä\'?',
        vaihtoehdot: [
          'Taltalla ja nuijalla',
          'Porakoneella',
          'Kulmahiomakoneella',
        ],
        oikea: 1,
      },
    },
    /*
     * Palazzo Montecitorio (parlamentti), Rooma.
     * Lähde: en-Wikipedia "Banca Romana scandal" (tarkistettu 30.8.2026)
     */
    {
      id: 'banca-romana-1893',
      otsikko: 'Banca Romanan skandaali',
      nimio: 'Banca Romana',
      vuosi: '1893',
      paikka: 'Palazzo Montecitorio (parlamentti), Rooma',
      lat: 41.9009, lon: 12.4785,
      kortti: 'Kun setelipainossa loppuvat numerot kesken, voi tietysti painaa '
        + 'samat numerot kahdesti — näin ajateltiin Banca Romanassa. Skandaali '
        + 'kaatoi hallituksen ja synnytti sivutuotteena Italian keskuspankin. '
        + 'Harva pankkikriisi on ollut näin tuottelias.',
      teksti: 'Italiassa oli kuusi setelinanto-oikeuden saanutta pankkia, ja Banca '
        + 'Romana oli niistä yksi. Sen pääjohtajaksi tuli 1881 Bernardo Tanlongo, '
        + 'entinen maatyöläinen, jota Corriere della Sera kuvasi puolilukutaitoiseksi '
        + 'mutta nerokkaaksi laskijaksi. Hän oli rakentanut suhdeverkoston lainoilla, '
        + 'jotka peittivät muiden salaisuuksia.'
        + '\n\nKesäkuussa 1889 valtion tarkastus löysi, että 91 prosenttia pankin '
        + 'varoista oli kiinni epälikvideissä kohteissa ja että pankki oli painattanut '
        + 'seteleitä samoilla sarjanumeroilla kahdesti. Pääministeri Francesco Crispi '
        + 'ja valtiovarainministeri Giovanni Giolitti lukivat raportin ja hautasivat '
        + 'sen. Pankki oli lainannut suuria summia poliitikoille, usein korotta, ja '
        + 'heille itselleen.'
        + '\n\nKansanedustaja Napoleone Colajanni luki raportista otteita '
        + 'parlamentissa 20. joulukuuta 1892. Asiantuntijakomission raportti 18. '
        + 'tammikuuta 1893 vahvisti luvut: liikkeessä oli 135 miljoonaa liiraa '
        + 'seteleitä, kun laki salli 75 miljoonaa, ja lisäksi Britanniassa oli '
        + 'painettu 40 miljoonan liiran kaksoissarja, joka jäi liikkeeseen laskematta '
        + 'vain siksi, että pankin alempien virkailijoiden rehellisyys ei pettänyt.'
        + '\n\nTanlongo pidätettiin seuraavana päivänä ja vapautettiin syytteistä '
        + 'heinäkuussa 1894 perusteella, jonka mukaan varsinaiset rikolliset olivat '
        + 'muualla. Giolitti oli eronnut jo marraskuussa 1893. Elokuun 1893 pankkilaki '
        + 'purki Banca Romanan ja jätti setelinanto-oikeuden uudelle Banca '
        + 'd\'Italialle sekä kahdelle eteläiselle pankille.',
      lahde: 'en-Wikipedia "Banca Romana scandal". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mikä instituutio perustettiin Banca Romanan skandaalin '
          + 'seurauksena?',
        vaihtoehdot: [
          'Italian keskuspankki Banca d\'Italia',
          'Euroopan keskuspankki',
          'Rooman pörssi',
        ],
        oikea: 0,
      },
    },
    /*
     * Forte di San Leo, San Leo.
     * Lähde: en-Wikipedia "Alessandro Cagliostro" (tarkistettu 30.8.2026)
     */
    {
      id: 'cagliostro-san-leo',
      otsikko: 'Cagliostro, huijareiden kreivi',
      nimio: 'Cagliostro',
      vuosi: '1743–1795',
      paikka: 'Forte di San Leo, San Leo',
      lat: 43.8962, lon: 12.3411,
      kortti: 'Kreivi Cagliostro paransi sairaita, muutti metalleja kullaksi ja '
        + 'luki tulevaisuutta — ainakin omien sanojensa mukaan. Euroopan hovit '
        + 'uskoivat vuosikausia. Ura päättyi vuoristolinnoituksen selliin, '
        + 'josta edes suuri maagikko ei loihtinut itseään ulos.',
      teksti: 'Giuseppe Balsamo syntyi Palermossa 1743, karkasi luostarikoulusta ja '
        + 'oli seitsemäntoista, kun hän sai kultaseppä Maranon uskomaan, että '
        + 'oliivilehdon alla oli aarre ja että sen paikan saisi selville seremonialla, '
        + 'johon tarvittiin kuusikymmentä unssia kultaa. Seremonian lopuksi hän '
        + 'hakkasi miehen maahan ja lähti kullan kanssa. Messinassa hän otti enonsa '
        + 'sukunimen ja muuttui kreivi Alessandro Cagliostroksi.'
        + '\n\nVaimonsa Lorenza Felicianin kanssa hän kiersi Euroopan hoveja '
        + 'parannusjuomien ja \'egyptiläisen vapaamuurariuden\' kanssa, jonka '
        + 'suurmestariksi hän nimitti itsensä. Katariina Suuren henkilääkäri tutki '
        + 'hänen valmisteensa ja totesi ne hyödyttömiksi. Kuurinmaalla kreivitär Elisa '
        + 'von der Recke paljasti hänet julkisesti. Strasbourgissa hän sai ystäväkseen '
        + 'kardinaali de Rohanin, ja Pariisissa molemmat joutuivat '
        + 'kaulakoruskandaaliin: yhdeksän kuukautta Bastiljissa, vapauttava tuomio 31. '
        + 'toukokuuta 1786 ja karkotus Ranskasta.'
        + '\n\nVuoteen 1789 mennessä pariskunta pantitti tavaroitaan. Roomassa '
        + 'Cagliostro yritti perustaa loosin, ja inkvisitio pidätti hänet 29. '
        + 'joulukuuta 1789. Lorenza tunnusti kaiken ja päätyi luostariin, jossa kuoli '
        + '1794. Huhtikuussa 1791 Cagliostro tuomittiin elinkautiseen ja kuoli '
        + 'sellissään San Leon linnoituksessa 26. elokuuta 1795.'
        + '\n\nVielä kreivin eläessä Ranskan hallitus palkkasi palermolaisen '
        + 'lakimiehen selvittämään, kuka mies oli. Goethe kuuli selvityksestä '
        + 'Italian-matkallaan 1788, meni katsomaan sukua ja löysi Cagliostron äidin '
        + 'elämästä köyhyydessä tyttärensä ja lastenlastensa kanssa — ja yhä velkaa '
        + 'poikansa lähdöstä.',
      lahde: 'en-Wikipedia "Alessandro Cagliostro". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mikä oli \'kreivi Cagliostrona\' esiintyneen huijarin oikea nimi?',
        vaihtoehdot: [
          'Vincenzo Peruggia',
          'Bernardo Tanlongo',
          'Giuseppe Balsamo',
        ],
        oikea: 2,
      },
    },
  ],
  LTU: [
    /*
     * Liettuan suurruhtinaiden palatsi, Vilna.
     * Lähde: en.wikipedia.org: Barbara Radziwiłł
     */
    {
      id: 'barbora-salainen-avioliitto',
      otsikko: 'Kuninkaan salainen avioliitto',
      nimio: 'Salattu avioliitto',
      vuosi: '1547–1551',
      paikka: 'Liettuan suurruhtinaiden palatsi, Vilna',
      lat: 54.6862, lon: 25.289,
      kortti: 'Kuningas voi julistaa sotia ja säätää lakeja, mutta salaa solmittu '
        + 'avioliitto osoittautui vaikeimmaksi asiaksi puolustaa. Sigismund '
        + 'August valitsi Barboran ja piti valintansa — vaikka koko valtakunta, '
        + 'oma äiti etunenässä, oli toista mieltä. Myrkkyhuhut elävät Vilnassa '
        + 'yhä.',
      teksti: 'Vilnan kuninkaanlinna ja Radvilojen palatsi olivat naapureita, ja '
        + 'tarina kertoo, että Sigismund August kaivatti niiden välille käytävän. '
        + 'Kesällä 1547, jonakin päivänä heinäkuun lopun ja elokuun alun välillä, hän '
        + 'vihki salaa Barbora Radvilaitėn. Serkulleen hän kirjoitti syyksi rakkauden.'
        + '\n\nVanhemmilleen hän kertoi asiasta 2. helmikuuta 1548. Senaatilta ei '
        + 'ollut kysytty, ja morsian oli kuninkaan oma alamainen. Pilkkakirjoitukset '
        + 'syyttivät Barboraa siveettömyydestä, noituudesta ja myrkystä. Piotrkówin '
        + 'valtiopäivillä loppuvuodesta 1548 aateli anoi kuningasta luopumaan liitosta '
        + 'ja uhkasi tarttua aseisiin; kerrotaan, että Sigismund harkitsi mieluummin '
        + 'luopuvansa kruunusta. Kuninkaan äiti Bona Sforza lähti hovista.'
        + '\n\nBarbora kruunattiin Wawelin katedraalissa 7. joulukuuta 1550. '
        + 'Kruunauksen toimitti arkkipiispa Mikołaj Dzierzgowski, Bonan liittolainen, '
        + 'joka oli jouduttu voittamaan puolelle. Barbora oli jo sairas. Hän kuoli '
        + 'Krakovassa 8. toukokuuta 1551. Kun epäiltiin, mahtuisiko hänen '
        + 'kuljetusvaununsa kaupunginportista, kuningas käski purkaa portin.'
        + '\n\nMyrkkyhuhut ovat eläneet siitä asti; nykyhistorioitsijat puhuvat '
        + 'syövästä tai tulehduksesta. Barboran jäännökset löytyivät Vilnan '
        + 'katedraalista tulvan jälkeen 1931. Hänet oli haudattu kruunu, valtikka ja '
        + 'valtakunnanomena mukanaan. Esineet katosivat toisessa maailmansodassa — ja '
        + 'löytyivät uudelleen katedraalin kryptasta joulukuussa 2024.',
      lahde: 'en-Wikipedia "Barbara Radziwiłł". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Kuka vastusti kiivaimmin Sigismund Augustin ja Barbora Radvilaitėn '
          + 'avioliittoa?',
        vaihtoehdot: [
          'Kuninkaan äiti Bona Sforza ja Puolan aateli',
          'Barboran oma Radvila-suku',
          'Paavi, joka ei tunnustanut liittoa',
        ],
        oikea: 0,
      },
    },
    /*
     * Dariuksen ja Girėnasin muistomerkki, Ąžuolynasin puisto, Kaunas.
     * Lähde: en.wikipedia.org: Lituanica
     */
    {
      id: 'lituanican-viimeinen-lento',
      otsikko: 'Lituanican viimeinen lento',
      nimio: 'Lituanica',
      vuosi: '1933',
      paikka: 'Dariuksen ja Girėnasin muistomerkki, Ąžuolynasin puisto, Kaunas',
      lat: 54.9, lon: 23.944,
      kortti: 'Kaksi siirtolaislentäjää, yksi pieni kone ja 6 411 kilometriä '
        + 'Atlantin yli Eurooppaan — kaikki meni nappiin, kunnes viimeiset 650 kilometriä '
        + 'jäivät lentämättä. Syytä ei koskaan selvitetty, ja juuri se piti '
        + 'tarinan hengissä: jokainen liettualainen tuntee Lituanican, ja moni '
        + 'tietää siitä oman versionsa.',
      teksti: 'Steponas Darius ja Stasys Girėnas olivat liettualaisia siirtolaisia '
        + 'Chicagossa. Kesäkuussa 1932 he ostivat 3 200 dollarilla Bellanca CH-300 '
        + 'Pacemakerin rahoilla, jotka oli kerätty liettualaisseuroista ja '
        + 'lentonäytöksistä. Kone rakennettiin uusiksi: pidemmät siivet, lisäsäiliöt '
        + 'runkoon, uusi moottori. Se maalattiin oranssiksi, kylkiin kirjoitettiin '
        + 'lahjoittajien nimet, ja sille annettiin nimi Lituanica.'
        + '\n\nLähtö oli New Yorkin Floyd Bennett Fieldiltä 15. heinäkuuta 1933 kello '
        + '6.24 aamulla. Suunnistusvälineitä ei ollut. Atlantti ylitettiin, mutta '
        + 'Irlannin yllä sää pakotti kiertämään pohjoisen kautta, ja kone tuli '
        + 'mantereelle Skotlannin ja Pohjanmeren yli. Kello 0.36 heinäkuun 17. päivänä '
        + 'se syöksyi maahan Kuhdammin kylän lähellä Soldinissa Saksassa. Lennettyä '
        + 'oli 37 tuntia 11 minuuttia ja 6 411 kilometriä; Kaunasiin oli matkaa noin '
        + '650.'
        + '\n\nLiettualainen tutkintalautakunta totesi lentäjät päteviksi ja koneen '
        + 'kunnossa: moottori kävi törmäyshetkellä ja polttoainetta oli jäljellä. '
        + 'Syyksi jäivät vaikeat sääolot, moottorivika ja epäonnistunut pakkolasku. '
        + 'Huhu, että kone olisi ammuttu alas vakoilukoneena, on elänyt sitkeästi; '
        + 'ruumiinavauksissa ei löytynyt luodinjälkiä, mutta kaikkia koneen osia ei '
        + 'koskaan palautettu Liettuaan.'
        + '\n\nRuumiit lennätettiin kotiin 19. heinäkuuta ja balsamoitiin seuraavana '
        + 'vuonna. Hylky on Kaunasissa Vytautas Suuren sotamuseossa. Viimeisessä '
        + 'kirjeessään lentäjät olivat kirjoittaneet, että sekä onnistunut lento että '
        + 'mahdollinen onnettomuus olisivat kylliksi merkittäviä — matka kannatti '
        + 'kummassakin tapauksessa.',
      lahde: 'en-Wikipedia "Lituanica". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mihin Lituanican lento vuonna 1933 päättyi?',
        vaihtoehdot: [
          'Kone laskeutui polttoaineen loputtua Itämereen',
          'Kone saapui Kaunasiin kolme päivää myöhässä',
          'Kone syöksyi maahan Saksassa, syy jäi selvittämättä',
        ],
        oikea: 2,
      },
    },
    /*
     * Liettuan pankin rahamuseo, Vilna.
     * Lähde: en.wikipedia.org: Boratynka
     */
    {
      id: 'boratynka-kuparikohu',
      otsikko: 'Boratynka — kuparirahojen kohu',
      nimio: 'Boratynka',
      vuosi: '1659–1668',
      paikka: 'Liettuan pankin rahamuseo, Vilna',
      lat: 54.6861, lon: 25.2833,
      kortti: 'Kun kassa on tyhjä, voi aina lyödä lisää rahaa — kunhan ei kysy, '
        + 'mitä raha sen jälkeen on arvoltaan. Puola-Liettua kokeili tätä '
        + '1600-luvulla kuparilla, ja kansa antoi kolikolle pilkkanimen, joka '
        + 'on kestänyt pidempään kuin kolikon ostovoima.',
      teksti: 'Ruotsin sotien jälkeen Puola-Liettuan valtionkassa ei pystynyt '
        + 'maksamaan sotilailleen. Krakovan rahapajan hoitaja, italialainen Tito Livio '
        + 'Burattini, esitti pientä kuparikolikkoa, jolle annettaisiin '
        + 'viranomaispäätöksellä hopeisen szelągin arvo eli kolmasosa groszia. '
        + 'Valtiopäivät hyväksyi hankkeen 1659, vaikka kaikki tiesivät, ettei kolikon '
        + 'kupari ollut lähelläkään sitä arvoa.'
        + '\n\nYhdestä kuparinaulasta, 405 grammasta, Burattini löi kolmesataa '
        + 'szelągia, joiden virallinen arvo oli sata groszia. Valtio sai niistä 57, '
        + 'loput jäivät rahapajan vuokraajalle. Lyöntimäärille asetetut rajat hän '
        + 'ylitti salaa. Valtiopäivät keskeytti lyönnin 1662, mutta kassa oli yhä '
        + 'tyhjä, ja 1663 lyönti aloitettiin uudelleen ja laajennettiin Liettuan '
        + 'rahapajoihin.'
        + '\n\nKolikoita tehtiin arviolta 1,8 miljardia, ja niistä noin kymmenesosa '
        + 'oli väärennöksiä — vaikka kiinni jääneelle väärentäjälle luvattiin kidutus, '
        + 'oikean käden katkaisu ja naulaaminen kaupunginportille sekä mestaus. Vuonna '
        + '1664 dukaatti maksoi hopeassa 195 groszia mutta boratynkoina 270, siis 810 '
        + 'kolikkoa: yli kilo kuparia. Palkkansa niinä saaneet sotilaat kapinoivat ja '
        + 'liittyivät Lubomirskin nousuun, jonka vaatimuksiin kuului palkanmaksun '
        + 'lopettaminen boratynkoina.'
        + '\n\nLyönti loppui 1668, mutta kolikot kiersivät vielä 1700-luvun alussa. '
        + 'Puolan kielessä epäluotettava tuttu tunnetaan yhä \'kuin huono szeląg\', ja '
        + 'arvottomasta asiasta sanotaan, ettei se ole katkenneen szelągin väärtti.',
      lahde: 'pl-Wikipedia "Boratynka" ja en-Wikipedia "Boratynka". Tarkistettu '
        + '2.9.2026.',
      visa: {
        kysymys: 'Mistä boratynka-kolikko sai nimensä?',
        vaihtoehdot: [
          'Kolikkoa lyöneen rahapajan kaupungista',
          'Rahanlyönnistä vastanneesta Tito Livio Burattinista',
          'Puolan sanasta, joka tarkoittaa halpaa',
        ],
        oikea: 1,
      },
    },
  ],
  LVA: [
    /*
     * Zaube (entinen Jürgensburg), Latvia — oikeudenkäynnin pitäjä.
     * Lähde: en.wikipedia.org: Thiess of Kaltenbrun
     */
    {
      id: 'thiess-ihmissusi',
      otsikko: 'Jumalan koira — Liivinmaan ihmissusioikeudenkäynti',
      nimio: 'Jumalan koira',
      vuosi: '1692',
      paikka: 'Zaube (entinen Jürgensburg), Latvia — oikeudenkäynnin pitäjä',
      lat: 56.9963, lon: 25.2611,
      kortti: 'Useimmat oikeusjutut alkavat kiistämisellä. Tämä alkoi sillä, että '
        + 'kahdeksankymppinen vastaaja myönsi heti olevansa ihmissusi — ja '
        + 'lisäsi, että hän on nimenomaan hyvien puolella, Jumalan koira, joka '
        + 'käy helvetissä hakemassa varastetun sadon takaisin. Tuomarit '
        + 'pyörittelivät papereitaan pitkään.',
      teksti: 'Vuonna 1691 Jürgensburgin tuomarit kutsuivat kahdeksankymppisen '
        + 'Thiessin todistajaksi kirkkovarkausjuttuun. He tiesivät, että seutu piti '
        + 'miestä ihmissutena, mutta se ei kuulunut asiaan. Thiess otti sen puheeksi '
        + 'itse.'
        + '\n\nKolmena yönä vuodessa — Lucian päivänä, helluntaina ja juhannuksena — '
        + 'hän ja muut menivät pensaikkoon, riisuivat vaatteensa ja muuttuivat '
        + 'susiksi. Sitten he matkasivat helvettiin, joka sijaitsi Lemburgin lähellä '
        + 'suolla puolen peninkulman päässä oikeuden puheenjohtajan kartanosta. Siellä '
        + 'he hakkasivat Paholaista ja tämän noitia pitkillä rautakangilla ja '
        + 'kantoivat takaisin viljan, karjan ja hedelmät, jotka noidat olivat vieneet. '
        + 'Ilman sitä sato epäonnistuisi. He eivät olleet Paholaisen palvelijoita vaan '
        + 'Jumalan koiria.'
        + '\n\nSaman hän oli kertonut kymmenen vuotta aiemmin, kun hän syytti erästä '
        + 'talollista nenänsä murtamisesta luudanvarrella helvetissä. Silloin hänet '
        + 'naurettiin ulos salista — mutta yksi tuomareista tarkisti asian, ja nenä '
        + 'oli todella ollut poikki. Nyt tuomarit kysyivät kylältä, oliko mies '
        + 'järjissään. Aina ollut, vastattiin, ja hänen arvostuksensa oli edellisen '
        + 'jutun jälkeen noussut.'
        + '\n\nKohtalokas ei ollut ihmissusi vaan parantaja. Thiess siunasi viljaa ja '
        + 'hevosia ja osasi loitsun, jossa siunattua suolaa annettiin lämpimässä '
        + 'oluessa: aurinko ja kuu käyvät meren yli hakemassa sielun, jonka paholainen '
        + 'on vienyt. Jumalaan loitsu ei vedonnut kertaakaan. Kristinuskosta pois '
        + 'kääntämisestä hänet tuomittiin ruoskittavaksi ja karkotettavaksi '
        + 'loppuiäksi.',
      lahde: 'en-Wikipedia "Thiess of Kaltenbrun". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miksi Thiess omien sanojensa mukaan muuttui ihmissudeksi?',
        vaihtoehdot: [
          'Hän taisteli Paholaista ja noitia vastaan sadon puolesta',
          'Hän halusi pelotella naapurinsa pois mailtaan',
          'Noita oli kironnut hänet vasten tahtoaan',
        ],
        oikea: 0,
      },
    },
    /*
     * Riian raatihuoneentori (Rātslaukums), Riika.
     * Lähde: en.wikipedia.org: Calendar riots in Riga
     */
    {
      id: 'riian-kalenterikahakat',
      otsikko: 'Riian kalenterikahakat',
      nimio: 'Kalenterikahakat',
      vuosi: '1584–1589',
      paikka: 'Riian raatihuoneentori (Rātslaukums), Riika',
      lat: 56.9469, lon: 24.1064,
      kortti: 'Voiko kymmenen kadonnutta päivää kaataa kaupungin? Riiassa vuonna '
        + '1584 pystyi: uusi kalenteri vei kaupungin vuosiksi sekasortoon, ja '
        + 'kun pöly laskeutui, Riika päätti pysyä vanhassa ajassa. Sinnikkyys '
        + 'kesti — kaupunki vaihtoi kalenteria vasta 335 vuotta myöhemmin.',
      teksti: 'Puola-Liettua otti gregoriaanisen kalenterin käyttöön 1582: torstaita '
        + '4. lokakuuta seurasi perjantai 15. lokakuuta. Protestanttinen Riika '
        + 'kieltäytyi. Vuonna 1584 kuningas Stefan Batory toisti käskyn nimenomaan '
        + 'Riikalle ja uhkasi kymmenentuhannen dukaatin sakolla.'
        + '\n\nSyksyllä raati ja luterilainen papisto taipuivat ja päättivät viettää '
        + 'joulun uuden kalenterin mukaan. Kirkot olivat jouluaamuna lähes tyhjät, '
        + 'koska kaupunkilaiset eivät tunnustaneet päivää. Sitten väkijoukko murtautui '
        + 'Jaakobinkirkkoon kesken jumalanpalveluksen, pahoinpiteli papit ja poltti '
        + 'kuvat, alttarit ja liput Kuben kukkulalla; se mikä ei palanut, heitettiin '
        + 'Väinäjokeen.'
        + '\n\nKun linnanvouti Nicholas Ecke pidätti koulunrehtorin kuninkaan '
        + 'loukkaamisesta, joukko vapautti vangin ja ryösti raadin miesten talot. '
        + 'Kaksi raatimiestä sai surmansa. Lakimies Martin Giesen ja viinikauppias '
        + 'Hans Brinkenin johdolla porvarit sulkivat kaupunginportit, ottivat '
        + 'kaupungin kassan haltuunsa ja partioivat kaduilla. Raati allekirjoitti '
        + 'aselevon, perui uuden kalenterin ja antoi killoille osan kaupungin '
        + 'hallinnosta.'
        + '\n\nBatory kuoli 1586, kuninkaan joukot linnoittautuivat joen toiselle '
        + 'puolen, ja Giese matkusti Tukholmaan pyytämään Ruotsin suojelusta — '
        + 'turhaan. Vuonna 1589 uuden kuninkaan lähetti myöntyi useimpiin vaatimuksiin '
        + 'sillä ehdolla, että johtajat luovutetaan. Giese ja Brinken kidutettiin ja '
        + 'mestattiin 2. elokuuta 1589. Riika sai pitää vanhan kalenterin.',
      lahde: 'en-Wikipedia "Calendar riots in Riga". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Milloin Riika lopulta siirtyi gregoriaaniseen kalenteriin?',
        vaihtoehdot: [
          'Vuonna 1589, kalenterikahakoiden päätyttyä',
          'Vuonna 1700, Ruotsin vallan aikana',
          'Vasta vuonna 1919',
        ],
        oikea: 2,
      },
    },
  ],
  NLD: [
    /*
     * Tresoar (Frieslandin maakunta-arkisto), Leeuwarden.
     * Lähde: en.wikipedia.org: Oera Linda Book
     */
    {
      id: 'oera-linda-kasikirjoitus',
      otsikko: 'Oera Linda -kirja — muinaiskäsikirjoitus joka oli liian hyvä',
      nimio: 'Oera Linda',
      vuosi: '1867–1879',
      paikka: 'Tresoar (Frieslandin maakunta-arkisto), Leeuwarden',
      lat: 53.2035, lon: 5.7903,
      kortti: 'Käsikirjoitus lupasi friiseille kolmentuhannen vuoden kunniakkaan '
        + 'historian — paperilla, joka tuoksui vielä painomusteelta. Oppineet '
        + 'riitelivät vuosikymmenen ennen kuin sepite myönnettiin sepitteeksi. '
        + 'Väärennös on nyt arkistossa arvopaikalla: se on aito väärennös.',
      teksti: 'Vuonna 1867 Cornelis Over de Linden antoi Frieslandin '
        + 'maakunnankirjastonhoitajalle Eelco Verwijsille käsikirjoituksen, jonka '
        + 'sanoi perineensä isoisältään. Se väitti kertovan friisien historian, myytit '
        + 'ja uskonnon vuodesta 2194 eaa. vuoteen 803 jaa. — lähes kolmentuhannen '
        + 'vuoden kaaren — muinaisfriisiksi kirjoitettuna.'
        + '\n\nVerwijs ei huolinut sitä. Vuonna 1872 Jan Gerhardus Ottema julkaisi '
        + 'hollanninkielisen käännöksen ja puolusti tekstiä aitona; englanninnos '
        + 'ilmestyi 1876. Kiista kesti vuosia, mutta anakronismeja oli liikaa, ja '
        + 'vuoteen 1879 mennessä oppineet olivat käytännössä yksimielisiä: teksti oli '
        + 'tuore.'
        + '\n\nSiihen asian olisi pitänyt loppua. Vuonna 1933 hollantilainen '
        + 'kansallismielinen kielentutkija Herman Wirth julkaisi saksannoksen ja '
        + 'kutsui kirjaa pohjoismaiseksi Raamatuksi. Berliinin yliopistossa käytiin '
        + 'siitä paneelikeskustelu 4. toukokuuta 1934; Wirthin puoli hävisi, '
        + 'ratkaisevana germanisti Arthur Hübnerin arvio. Silti riita johti suoraan '
        + 'Himmlerin Ahnenerbe-laitoksen perustamiseen, kirjaa alettiin kutsua '
        + 'Himmlerin Raamatuksi, ja lopulta se päätyi puolueen kiellettyjen kirjojen '
        + 'listalle.'
        + '\n\nVakuuttavin nykytulkinta on Goffe Jensman: kirjoittaja oli '
        + 'runoilijapappi François Haverschmidt Over de Lindenin ja Verwijsin '
        + 'avustuksella, ja tarkoitus oli Raamatun parodia, jonka piti kestää vain '
        + 'hetken. Siitä tuli itse pyhä kirja.',
      lahde: 'en-Wikipedia "Oera Linda Book". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Millä kielellä Oera Linda -kirja oli kirjoitettu?',
        vaihtoehdot: [
          'Latinaksi',
          'Muinaisnorjaksi',
          'Jäljitellyllä muinaisfriisillä',
        ],
        oikea: 2,
      },
    },
    /*
     * Museum Boijmans Van Beuningen, Rotterdam.
     * Lähde: en.wikipedia.org: Han van Meegeren
     */
    {
      id: 'van-meegerenin-vermeerit',
      otsikko: 'Van Meegeren — mies joka maalasi Vermeerit itse',
      nimio: 'Van Meegeren',
      vuosi: '1937–1947',
      paikka: 'Museum Boijmans Van Beuningen, Rotterdam',
      lat: 51.9142, lon: 4.4733,
      kortti: 'Ainoa keino välttää tuomio maanpetoksesta oli tunnustaa olevansa '
        + 'väärentäjä — ja todistaa se maalaamalla vartijoiden katsellessa uusi '
        + 'Vermeer. Göring oli maksanut omaisuuden taulusta, jota Vermeer ei '
        + 'ollut koskaan nähnyt. Hollanti sai sodanjälkeisen sankarin, jonka '
        + 'ammatti oli petos.',
      teksti: 'Kriitikot eivät pitäneet Han van Meegerenin omista töistä, joten hän '
        + 'käytti kuusi vuotta menetelmän kehittämiseen. Värit hän sekoitti '
        + 'syreeniöljyyn — ateljee haisi siltä niin voimakkaasti, että hän piti '
        + 'pöydällä tuoretta syreeniä selitykseksi — ja kovetti maalin bakeliitilla. '
        + 'Valmis taulu paistettiin sadan ja sadankahdenkymmenen asteen välillä, sen '
        + 'yli vieritettiin tela halkeamien saamiseksi ja halkeamiin pestiin tussia.'
        + '\n\nSyyskuussa 1937 aikansa arvostetuin Vermeer-tuntija Abraham Bredius '
        + 'tutki taulun Emmauksen ateria ja kirjoitti sen olevan Delftin Johannes '
        + 'Vermeerin mestariteos. Rembrandt-seura osti sen 520 000 guldenilla ja '
        + 'lahjoitti Rotterdamin Boijmans-museolle, jossa siitä tuli suuren näyttelyn '
        + 'keskus.'
        + '\n\nGöring vaihtoi 137 ryöstettyä maalausta \'Vermeeriin\' nimeltä Kristus '
        + 'ja aviorikkoja. Liittoutuneiden sotilaat löysivät sen itävaltalaisesta '
        + 'suolakaivoksesta 17. toukokuuta 1945 ja jäljittivät sen van Meegereniin, '
        + 'joka pidätettiin 29. toukokuuta kansallisomaisuuden myymisestä viholliselle '
        + '— syytteestä, josta uhkasi kuolemantuomio. Puolustus oli tunnustus. '
        + 'Heinäkuun ja joulukuun välillä hän maalasi toimittajien ja oikeuden '
        + 'nimeämien todistajien katsellessa uuden taulun Vermeerin tyyliin.'
        + '\n\nKemisti Paul Coremans löysi maalista bakeliittia, ja 12. marraskuuta '
        + '1947 oikeus tuomitsi van Meegerenin vuodeksi vankeuteen väärennöksestä ja '
        + 'petoksesta. Hän sai sydänkohtauksen valitusajan viimeisenä päivänä ja kuoli '
        + '30. joulukuuta istumatta päivääkään. Saman syksyn mielipidemittauksessa hän '
        + 'oli Alankomaiden toiseksi suosituin mies.',
      lahde: 'en-Wikipedia "Han van Meegeren". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miksi van Meegeren tunnusti väärentäneensä \'Vermeerinsä\'?',
        vaihtoehdot: [
          'Röntgenkuvaus paljasti maalikerrosten alta luonnoksen',
          'Häntä syytettiin kansallisaarteen myymisestä natseille, mistä '
            + 'uhkasi kuolemantuomio',
          'Kilpaileva väärentäjä kavalsi hänet',
        ],
        oikea: 1,
      },
    },
    /*
     * Delft (Naundorffin hautamuistomerkki).
     * Lähde: en.wikipedia.org: Karl Wilhelm Naundorff
     */
    {
      id: 'naundorff-delftin-valekuningas',
      otsikko: 'Naundorff — kelloseppä joka haudattiin kuninkaana',
      nimio: 'Naundorff',
      vuosi: '1845 (vaateet 1830-luvulta)',
      paikka: 'Delft (Naundorffin hautamuistomerkki)',
      lat: 52.0123, lon: 4.3609,
      kortti: 'Ranskan kuningashuone kiisti miehen eläessä kaiken — mutta Delftissä '
        + 'hänen hautakivensä julistaa yhä: tässä lepää Ludvig XVII, Ranskan '
        + 'kuningas. Kelloseppä hävisi jokaisen oikeusjutun ja voitti '
        + 'hautakirjoituksen. DNA ratkaisi kiistan vasta puolentoista '
        + 'vuosisadan päästä.',
      teksti: 'Ludvig XVII:ksi ilmoittautui yli kolmekymmentä miestä. Karl Wilhelm '
        + 'Naundorff esiintyy asiakirjoissa ensi kerran Spandaussa 1810, ja 1824 hänet '
        + 'tuomittiin kolmeksi vuodeksi rahanväärennyksestä. Vapauduttuaan hän '
        + 'kirjoitti muistelmansa: hänet oli vaihdettu kuuromykkään orpoon, piilotettu '
        + 'Templen torniin, otettu myöhemmin kiinni Napoleonin miesten toimesta ja '
        + 'pidetty vankityrmissä eri puolilla Eurooppaa. Todisteita ei ollut yhtään.'
        + '\n\nRanskaa hän puhui huonosti, mutta Pariisissa 1833 hän tunsi vanhan '
        + 'hovin yksityiselämän, vastasi kysymyksiin oikein ja puhutteli hovilaisia '
        + 'kuin olisi tuntenut heidät lapsena. Ludvig XVI:n oikeusministeri Étienne de '
        + 'Joly, kuninkaan yksityissihteeri Jean Bremond ja kruununprinssin '
        + 'lastenhoitaja Agathe de Rambaud tunnustivat hänet. Kadonneen prinssin sisar '
        + 'Marie-Thérèse ei suostunut edes tapaamaan häntä; de Rambaud matkusti '
        + 'vaunuilla Prahaan suostuttelemaan, eikä häntäkään otettu vastaan.'
        + '\n\nVuonna 1836 Naundorff haastoi Marie-Thérèsen oikeuteen omaisuudesta. '
        + 'Louis Philippen poliisi pidätti hänet, takavarikoi paperit ja karkotti '
        + 'hänet Englantiin. Siellä hän kehitti sotilasteknisiä keksintöjä — varhaisen '
        + 'käsikranaatin ja rekyylittömän aseen, jonka myi Alankomaiden armeijalle. '
        + 'Hän ilmoitti nousevansa valtaistuimelle 1. tammikuuta 1840; kun päivä meni, '
        + 'useimmat kannattajat lähtivät.'
        + '\n\nHän kuoli Delftissä 10. elokuuta 1845 Alankomaiden armeijan '
        + 'pyrotekniikan johtajana. Kuolintodistuksessa hänet nimetään Charles-Louis '
        + 'de Bourboniksi, Ludvig XVI:n ja Marie Antoinetten pojaksi, ja hautakivi '
        + 'ilmoittaa yhä kadonneen kruununperijän lepäävän siinä. DNA-tutkimukset '
        + '1998–2016 puhuvat häntä vastaan; osa jälkeläisistä kiistää näytteiden '
        + 'aitouden.',
      lahde: 'en-Wikipedia "Karl Wilhelm Naundorff". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Kuka Karl Wilhelm Naundorff väitti olevansa?',
        vaihtoehdot: [
          'Ludvig XVII, Ranskan kadonnut kruununperijä',
          'Napoleonin salainen poika',
          'Alankomaiden laillinen kuningas',
        ],
        oikea: 0,
      },
    },
  ],
  NOR: [
    /*
     * Sogndalsfjøra, Sogndal (Baardsenin lapsuudenkoti, säilytetty museona).
     * Lähde: en.wikipedia.org: Gjest Baardsen
     */
    {
      id: 'gjest-baardsen-mestarivaras',
      otsikko: 'Gjest Baardsen, mestarivaras ja pakotaituri',
      nimio: 'Gjest Baardsen',
      vuosi: '1791–1849',
      paikka: 'Sogndalsfjøra, Sogndal (Baardsenin lapsuudenkoti, säilytetty '
        + 'museona)',
      lat: 61.2288, lon: 7.0965,
      kortti: 'Baardsenin ura sisälsi kaksi taitolajia: lukkojen avaamisen ja oman '
        + 'tarinansa kertomisen. Jälkimmäinen osoittautui tuottoisammaksi — '
        + 'elinkautisvanki kirjoitti sellissään omaelämäkerran, jossa varas on '
        + 'sankari, ja kansa osti tarinan mieluummin kuin viranomaisten '
        + 'version.',
      teksti: 'Gjest Baardsen syntyi noin 1791 Sogndalsfjørassa kalastajan poikana; '
        + 'isä kuoli, kun poika oli kaksivuotias. Hänet pidätettiin varkauksista kerta '
        + 'toisensa jälkeen, mutta kuuluisaksi hänet tekivät paot: vankiloista pois '
        + 'pääseminen oli 1800-luvun Norjassa uutinen, jota kerrottiin edelleen.'
        + '\n\nVuodesta 1827 hän istui elinkautista Akershusin linnoituksessa Oslossa, '
        + 'kaikkiaan kahdeksantoista vuotta. Siellä alkoi toinen ura. Omaelämäkerran '
        + 'ensimmäiset osat ilmestyivät 1835, kun kirjoittaja oli yhä kaltereiden '
        + 'takana. Kirjan varas ryöstää rikkailta ja jakaa köyhille; myöhempi tutkimus '
        + 'pitää kuvausta jonkin verran kaunisteltuna.'
        + '\n\nBaardsen kokosi myös sanaluettelon fantespråkista, kulkijoiden omasta '
        + 'kielimuodosta. Yhteiskuntatutkija Eilert Sundt käytti aineistoa työssään, '
        + 'ja luettelo julkaistiin lopulta 1948. Vapauduttuaan 1845 Baardsen elätti '
        + 'itsensä Bergenissä myymällä lauluja ja kirjoja, avioitui 1848 kahden lapsen '
        + 'äidin Anne Elisabeth Reinchen kanssa ja kuoli 1849. Hänen lauluihinsa '
        + 'kuuluvat sellaiset kuin vankitoveri Ole Høilandin pako Akershusista 1839 ja '
        + 'saman miehen kuolema kymmenen vuotta myöhemmin.'
        + '\n\nTancred Ibsenin ohjaama elokuva Baardsenin elämästä oli 1939 yksi '
        + 'vuosikymmenen katsotuimmista norjalaiselokuvista, ja siinä laulettu '
        + 'Fjellsangen jäi elämään omana kappaleenaan. Omaelämäkerran viimeinen osa, '
        + 'joka kertoi vapautumisen jälkeisistä vuosista, ilmestyi postuumisti 1869, '
        + 'ja koko teos on painettu uudelleen useita kertoja. Baardsenin lapsuudenkoti '
        + 'Sogndalsfjørassa on säilytetty museoksi.',
      lahde: 'en-Wikipedia "Gjest Baardsen". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mistä Gjest Baardsen tuli tunnetuksi rikostensa lisäksi?',
        vaihtoehdot: [
          'Vankilapaoistaan ja sellissä kirjoitetusta omaelämäkerrasta',
          'Hän lahjoitti kaiken saaliinsa kirkolle',
          'Hän toimi myöhemmin Oslon poliisimestarina',
        ],
        oikea: 0,
      },
    },
    /*
     * Nasjonalgalleriet, Universitetsgata 13, Oslo.
     * Lähde: en.wikipedia.org: The Scream
     */
    {
      id: 'huudon-varkaus',
      otsikko: 'Huuto katosi olympia-aamuna',
      nimio: 'Huudon varkaus',
      vuosi: '1994',
      paikka: 'Nasjonalgalleriet, Universitetsgata 13, Oslo',
      lat: 59.9163, lon: 10.7373,
      kortti: 'Koko maailman katsoessa Lillehammerille joku katsoi Oslon '
        + 'kansallisgallerian toisen kerroksen ikkunaa. Taidehistorian '
        + 'kuuluisin kirkaisu vietiin tikapuilla, ja varkaiden jättämä '
        + 'kiitoskortti vartioinnista lienee lajissaan tylyimpiä '
        + 'asiakaspalautteita.',
      teksti: 'Aamulla 12. helmikuuta 1994, samana päivänä kun Lillehammerin '
        + 'talviolympialaiset avattiin, kaksi miestä tunkeutui Oslon '
        + 'kansallisgalleriaan ja vei Huudon. Taulu oli siirretty '
        + 'olympiajuhlallisuuksien takia toisen kerroksen saliin. Miehet jättivät '
        + 'paikalle lapun, jossa kiitettiin huonosta vartioinnista.'
        + '\n\nMaaliskuussa varkaat vaativat miljoonaa dollaria. Galleria kieltäytyi. '
        + 'Norjan poliisi järjesti soluttautumisoperaation Britannian SO10-yksikön ja '
        + 'Gettyn museon avulla, ja taulu saatiin takaisin vahingoittumattomana 7. '
        + 'toukokuuta 1994.'
        + '\n\nTammikuussa 1996 neljä miestä tuomittiin. Yksi heistä oli Pål Enger, '
        + 'joka oli aiemmin tuomittu Munchin Rakkaus ja tuska -maalauksen varkaudesta '
        + '1988. Valitusasteessa kaikki vapautettiin oikeudellisella perusteella: '
        + 'operaatioon osallistuneet brittiagentit olivat tulleet Norjaan väärillä '
        + 'henkilöllisyyksillä.'
        + '\n\nMunch teki Huudosta kaksi maalattua ja kaksi pastelliversiota, ja '
        + 'molemmat maalatut on varastettu ja saatu takaisin. Vuoden 1910 versio '
        + 'vietiin Munch-museosta aseistettujen ja naamioituneiden miesten voimin '
        + 'keskellä päivää 2004, ja samalla lähti Madonna; kolme miestä sai 2006 '
        + 'neljästä kahdeksaan vuotta, museo oli kymmenen kuukautta kiinni '
        + 'turvallisuusremontin takia, ja taulut löytyivät elokuussa 2006 pienemmin '
        + 'vaurioin kuin oli pelätty. Vuonna 2018 koomikkoduo Ylvis teki vuoden 1994 '
        + 'varkaudesta musikaalin, jossa esiintyi Enger itse.',
      lahde: 'en-Wikipedia "The Scream". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mitä Huudon varastaneet miehet jättivät jälkeensä vuonna 1994?',
        vaihtoehdot: [
          'Väärennetyn kopion taulun paikalle',
          'Lapun, jossa kiitettiin huonosta vartioinnista',
          'Lunnasvaatimuksen gallerian ovelle',
        ],
        oikea: 1,
      },
    },
    /*
     * Grand Café, Karl Johans gate, Oslo (Kristianian boheemien
     *   kantapaikkoja).
     * Lähde: no.wikipedia.org: Fra Kristiania-Bohêmen
     * Lähde: en.wikipedia.org: Hans Jæger
     */
    {
      id: 'boheemikirjan-takavarikko',
      otsikko: 'Boheemikirjan takavarikko',
      nimio: 'Boheemikirja',
      vuosi: '1885–1886',
      paikka: 'Grand Café, Karl Johans gate, Oslo (Kristianian boheemien '
        + 'kantapaikkoja)',
      lat: 59.9135, lon: 10.741,
      kortti: 'Kirja ehti tuskin kirjakauppaan, kun valtio jo keräsi sen pois. '
        + 'Virallisesti kyse oli säädyllisyydestä; epävirallisesti siitä, että '
        + 'Kristiania oli pieni kaupunki ja romaanin henkilöt tunnistettavia. '
        + 'Mikään ei tee kirjasta kiinnostavampaa kuin takavarikko — sen '
        + 'tiesivät boheemitkin.',
      teksti: 'Hans Jæger syntyi Drammenissa 1854, lähti merille viisitoistavuotiaana '
        + 'ja palasi maihin lukeakseen filosofiaa. Opinnot hän kustansi '
        + 'työskentelemällä suurkäräjien pikakirjoittajana. Vuonna 1881 hän tuli '
        + 'Kristianiassa tunnetuksi luennoilla, joissa vaati kansalaisoikeuksia '
        + 'prostituoiduille, avioliiton lakkauttamista, vapaata rakkautta ja '
        + 'sosialismia.'
        + '\n\nJoulukuussa 1885 ilmestyi Fra Kristiania-Bohêmen. Kirja takavarikoitiin '
        + 'saman tien. Virallinen peruste oli säädyttömyys. Todellinen ongelma oli, '
        + 'että Kristiania oli pieni kaupunki ja Jæger oli käyttänyt eläviä malleja, '
        + 'jotka moni tunnisti nimeltä.'
        + '\n\nVuonna 1886 hänet tuomittiin tuntuviin sakkoihin ja kuudenkymmenen '
        + 'päivän vankeuteen, ja hän menetti paikkansa suurkäräjillä. Kun hänet '
        + 'tuomittiin uudelleen kirjan uusintapainoksen yrittämisestä, hän pakeni '
        + 'Pariisiin — ja palasi sitten istumaan tuomionsa. Asiasta tuli '
        + 'painovapauskiista, joka nolasi Johan Sverdrupin liberaalihallitusta: '
        + 'liberaalit opiskelijat arvostelivat omaa hallitustaan kirjan '
        + 'tukahduttamisesta. Samana vuonna Jæger julkaisi puolustuspuheensa '
        + 'korkeimmassa oikeudessa omana kirjasenaan ja kirjoitti Christian Krohgin '
        + 'kanssa teoksen Albertine.'
        + '\n\nMyöhemmin Jæger asui Pariisissa, kirjoitti ulkopolitiikkaa '
        + 'ruotsalaiseen sosiaalidemokraattiseen lehteen, muuttui anarkistiksi ja '
        + 'julkaisi 1906 teoksen Anarkiets bibel. Hänen romaanitrilogiansa suhteesta '
        + 'Oda Krohgiin kiellettiin niin ikään Norjassa. Hän kuoli syöpään Oslossa '
        + '1910.',
      lahde: 'no-Wikipedia "Fra Kristiania-Bohêmen" ja en-Wikipedia "Hans Jæger". '
        + 'Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mitä kirjailija Hans Jægerille tapahtui romaanin Fra '
          + 'Kristiania-Bohêmen ilmestyttyä?',
        vaihtoehdot: [
          'Hän pakeni Pariisiin ja jäi sinne loppuiäkseen',
          'Hän sai valtion kirjailijapalkinnon',
          'Kirja takavarikoitiin ja hän sai sakot ja vankeutta',
        ],
        oikea: 2,
      },
    },
  ],
  POL: [
    /*
     * Wawelin linnan aarrekammio, Krakova.
     * Lähde: en-Wikipedia: Szczerbiec
     */
    {
      id: 'szczerbiec-odysseia',
      otsikko: 'Szczerbiec — kruunajaismiekan 133 vuoden harharetki',
      nimio: 'Szczerbiec',
      vuosi: '1795–1928',
      paikka: 'Wawelin linnan aarrekammio, Krakova',
      lat: 50.0541, lon: 19.9352,
      kortti: 'Kokonainen kuningaskunnan aarrekammio katosi maailmalle, ja jäljelle '
        + 'jäi yksi miekka — sekin myytiin välillä väärällä nimilapulla. '
        + 'Pariisin maailmannäyttelyssä 1878 puolalaiset kävijät tuijottivat '
        + '\'saksalaista miekkaa\' ja kuiskivat, että tuohan näyttää '
        + 'epäilyttävästi omalta kruunajaismiekalta. He olivat oikeassa; '
        + 'paluumatka kesti silti vielä viisikymmentä vuotta.',
      teksti: 'Vuonna 1795 preussilaiset joukot tyhjensivät Wawelin aarrekammion '
        + 'Fredrik Vilhelm II:n käskystä. Kruununjalokivet vietiin Breslauhun, '
        + 'Berliiniin ja Königsbergiin, ja vuosina 1809–1811 suurin osa niistä '
        + 'sulatettiin. Szczerbiec pantiin sen sijaan myyntiin.'
        + '\n\nRuhtinas Dmitri Lobanov-Rostovski osti miekan ja tarjosi sitä 1819 '
        + 'puolalaiselle keräilijälle Wincenty Krasińskille kertoen ostaneensa sen '
        + 'Moskovassa armenialaiselta kauppiaalta, joka oli löytänyt sen jostakin '
        + 'Belgradin ja Rusen väliltä. Krasiński epäili, mikä miekka oli, mutta ei '
        + 'saanut varmuutta ja kieltäytyi kaupasta. Miekka päätyi ruhtinas Anatoli '
        + 'Demidovin huvilaan Firenzen liepeille ja 1870 kahdellakymmenellätuhannella '
        + 'frangilla Ranskan Venäjän-suurlähettiläälle Aleksandr Basilevskille.'
        + '\n\nBasilevski asetti sen esille Pariisin maailmannäyttelyyn 1878, tuppi '
        + 'kauan sitten kadonneena ja esine merkittynä saksalaiseksi työksi. Vuonna '
        + '1884 Aleksanteri III osti koko Basilevskin kokoelman Eremitaasiin, ja 1913 '
        + 'Pietarissa pidetty museokongressi julisti miekan 1600-luvun jäljitelmäksi. '
        + 'Riian rauhansopimuksen 11. artikla toi sen kotiin 1928, 133 vuoden jälkeen.'
        + '\n\nVuonna 1939 se lähti taas. Matkalla Bordeaux\'sta Falmouthiin laivaa '
        + 'ammuttiin ilmasta, ja evakuointia johtanut Karol Estreicher otti miekan '
        + 'arkusta ja sitoi sen kahden lankun väliin pullopostin kanssa — jos laiva '
        + 'uppoaisi, kruunajaismiekka ainakin kelluisi. Se päätyi Kanadaan ja palasi '
        + 'Krakovaan vasta 1959.',
      lahde: 'en-Wikipedia "Szczerbiec". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miten kruunajaismiekka Szczerbiec palasi Puolaan vuonna 1928?',
        vaihtoehdot: [
          'Puolalainen keräilijä osti sen huutokaupasta',
          'Neuvosto-Venäjä palautti sen Riian rauhansopimuksen nojalla',
          'Se löytyi muurin sisästä Wawelin remontissa',
        ],
        oikea: 1,
      },
    },
    /*
     * Wrocław–Wałbrzych-radan 'kilometri 65', Wałbrzych.
     * Lähde: en-Wikipedia: Nazi gold train
     */
    {
      id: 'walbrzychin-kultajuna',
      otsikko: 'Wałbrzychin kultajuna — aarre jota ei ollut',
      nimio: 'Kultajuna',
      vuosi: '1945 (legenda), 2015–2016 (kaivaukset)',
      paikka: 'Wrocław–Wałbrzych-radan \'kilometri 65\', Wałbrzych',
      lat: 50.8222, lon: 16.3067,
      kortti: 'Maatutka näytti vuonna 2015 jotain junanmuotoista, ja pian puoli '
        + 'maailmaa tiesi tarkalleen, missä natsien kultajuna makaa. '
        + 'Kaivinkoneet löysivät kunnioitettavan määrän savea. Legenda ei tästä '
        + 'lannistunut — kadonneen aarteen paras piilopaikka on ihmisten '
        + 'mielikuvitus, jonne ei lapio yllä.',
      teksti: 'Legendan mukaan sodan viimeisinä kuukausina Breslausta lähti '
        + 'panssaroitu juna, jonka lastina oli kolmesataa tonnia kultaa. Se saapui '
        + 'Świebodziceen eikä koskaan Wałbrzychiin, vaan katosi Riese-hankkeen '
        + 'tunneleihin. Puolan armeija etsi sitä vuosikymmeniä eikä löytänyt mitään; '
        + 'historiantutkijoiden mukaan junaa ei ollut olemassakaan.'
        + '\n\nElokuussa 2015 Piotr Koper ja Andreas Richter ilmoittivat, että '
        + 'kuolinvuoteella annettu tunnustus oli johtanut heidät perille, ja '
        + 'tarjosivat paikkatietoa kymmenesosaa löydön arvosta vastaan. '
        + 'Kulttuuriministeriön varaministeri kertoi 28. elokuuta, että maatutkakuvat '
        + 'osoittivat 99 prosentin varmuudella sadan metrin junan. '
        + 'Wrocław–Wałbrzych-radan kilometri 65 aidattiin, ja armeija raivasi puut ja '
        + 'tarkisti miinat.'
        + '\n\nJoulukuussa Krakovan AGH-yliopiston ryhmä ilmoitti, ettei junaa ole. '
        + 'Löytäjät pitivät kiinni väitteestään, ja kaivaukset aloitettiin 15. '
        + 'elokuuta 2016 kuudenkymmenenneljän hengen voimin ja 116 000 euron '
        + 'yksityisrahoituksella. Työ keskeytettiin seitsemän päivän jälkeen. Se, '
        + 'minkä tutka oli nähnyt, oli luonnon omaa maanalaista muodostumaa.'
        + '\n\nKaupunki hyötyi silti. Matkailu kasvoi 44 prosenttia, ja virkamies '
        + 'arvioi maailmanlaajuisen julkisuuden arvoksi noin kaksisataa miljoonaa '
        + 'dollaria — kaupungin oma markkinointibudjetti oli 380 000. Pormestari '
        + 'harkitsi liikenneympyrän nimeämistä etsijöiden mukaan. Koper jatkoi '
        + 'etsintöjä ja löysi tammikuussa 2019 jotain aitoa: 1500-luvun '
        + 'seinämaalauksia rappauksen alta Strugan kartanossa.',
      lahde: 'en-Wikipedia "Nazi gold train". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mitä Wałbrzychin kultajunan kaivauksissa 2016 lopulta löytyi?',
        vaihtoehdot: [
          'Tyhjä tunneli ilman junaa',
          'Muutama kultaharkko mutta ei junaa',
          'Vain luonnollisia maakerroksia',
        ],
        oikea: 2,
      },
    },
    /*
     * Puolan kansalliskirjasto, Varsova (julkaisukaupunki).
     * Lähde: pl-Wikipedia: Kronika Prokosza
     */
    {
      id: 'prokoszin-kronikka',
      otsikko: 'Prokoszin kronikka — keksitty 900-luvun historiateos',
      nimio: 'Prokoszin kronikka',
      vuosi: '1825 (julkaisu ja paljastus 1826)',
      paikka: 'Puolan kansalliskirjasto, Varsova (julkaisukaupunki)',
      lat: 52.214, lon: 21.0035,
      kortti: 'Kirja lupasi kokonaisen rivin muinaisia kuninkaita, joista kukaan '
        + 'muu ei ollut kuullutkaan — mikä olisi pitänyt olla ensimmäinen '
        + 'varoitusmerkki. Historioitsija Lelewel tarvitsi väärennöksen '
        + 'kaatamiseen noin vuoden ja yhden väärään aikaan päivätyn '
        + 'käsikirjoituksen. Opetus on kestänyt paremmin kuin kronikka: mitä '
        + 'mairittelevampi menneisyys, sitä tarkemmin kannattaa katsoa paperin '
        + 'ikää.',
      teksti: 'Kenraali Franciszek Morawski antoi Julian Ursyn Niemcewiczille '
        + 'käsikirjoituksen, jonka sanoi ostaneensa lublinilaiselta kojulta. Sen '
        + 'mukaan kyseessä oli 900-luvulla kirjoitettu kronikka Puolan vanhimmasta '
        + 'historiasta, tekijänä Prokosz, Krakovan ensimmäinen arkkipiispa, kuollut '
        + '986 — mies, jota yksikään aikakauden luotettava lähde ei mainitse.'
        + '\n\nNiemcewicz uskoi ja esitteli teoksen Varsovan tieteenystävien seurassa. '
        + 'Hipolit Kownacki painatti sen Varsovassa 1825 ja käänsi tekstin latinaksi. '
        + 'Kronikka tarjosi pitkän rivin muinaisia kuninkaita, joista kukaan ei ollut '
        + 'aiemmin kuullut.'
        + '\n\nVuoden sisällä historioitsija Joachim Lelewel löysi Vilnasta saman '
        + 'tekstin käsikirjoituksen, joka oli päivätty 21. kesäkuuta 1764 ja jossa '
        + 'tekijäksi mainittiin Przybysław Dyamentowski, tunnettu asiakirjaväärentäjä '
        + 'ja aatelissukujen keksittyjen sukupuiden laatija. Sen jälkeen Lelewel purki '
        + 'sisällön osiin painetussa arviossaan.'
        + '\n\nTuomiota toistettiin lähes kaksi vuosisataa sellaisenaan. Piotr Boroń '
        + 'on 2000-luvulla huomauttanut, että jälki Dyamentowskiin on ohut: miestä ei '
        + 'löydy niistä virkaluetteloista, joihin hänen pitäisi kuulua. Kronikka voi '
        + 'siis olla jotain muuta kuin 1700-luvun väärennös — ehkä Morawskin oma '
        + 'seurapiirivitsi juuri ennen vuotta 1825, jota ei koskaan peruttu. Muinaista '
        + '\'Suur-Lechiaa\' koskevassa salaliittoteoriassa sitä siteerataan yhä.',
      lahde: 'pl-Wikipedia "Kronika Prokosza". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Kuka paljasti Prokoszin kronikan väärennökseksi?',
        vaihtoehdot: [
          'Krakovan arkkipiispa',
          'Kirjan kustantaja itse',
          'Historioitsija Joachim Lelewel',
        ],
        oikea: 2,
      },
    },
  ],
  PRT: [
    /*
     * Banco de Portugal, Lissabon.
     * Lähde: en-Wikipedia "Alves dos Reis" (tarkistettu 30.8.2026)
     */
    {
      id: 'alves-dos-reis-setelihuijaus',
      otsikko: 'Alves dos Reisin setelihuijaus',
      nimio: 'Alves dos Reis',
      vuosi: '1924–1925',
      paikka: 'Banco de Portugal, Lissabon',
      lat: 38.7085, lon: -9.139,
      kortti: 'Alves dos Reis ei väärentänyt seteleitä — hän väärensi paperit, '
        + 'joilla oikea setelipaino painoi hänelle aitoja. Hetken Portugalissa '
        + 'kiersi kahdet aidot 500 escudon setelit, joista vain toiset oli '
        + 'tilattu. Suunnitelman ainoa vika oli, että sarjanumerotkin olivat '
        + 'aitoja: samat kahteen kertaan.',
      teksti: 'Artur Alves Reis oli väärentänyt itselleen tutkintotodistuksen Oxfordin '
        + 'insinöörikoulusta, jota ei ollut olemassa, jo ennen lähtöään Angolaan. '
        + 'Vuonna 1924 hän istui 54 päivää Portossa Ambaca-rautatien varojen takia, ja '
        + 'siellä syntyi suunnitelma: ei väärentää seteleitä vaan sopimus, jonka '
        + 'nojalla joku muu painaisi ne aidoiksi.'
        + '\n\nKumppani Karel Marang vei paperit hollantilaiselle painotalolle Joh. '
        + 'Enschedélle, joka tunnisti näytesetelit lontoolaisen Waterlow and Sonsin '
        + 'työksi ja huomautti, että vain Waterlowilla olivat laatat. Marang meni 4. '
        + 'joulukuuta 1924 sir William Waterlow\'n puheille suosituskirjeen kanssa ja '
        + 'selitti, että asia vaati poliittisista syistä hienotunteisuutta. Waterlow '
        + 'painoi 200 000 viidensadan escudon seteliä Vasco da Gaman kuvalla — sadan '
        + 'miljoonan escudon nimellisarvo, lähes prosentti Portugalin '
        + 'kansantaloudesta.'
        + '\n\nSetelit olivat aitoja ja oikeilta laatoilta, mutta sarjanumerot '
        + 'toistivat jo liikkeessä olevia. Reis selitti, että Lissabonissa niihin '
        + 'lyötäisiin ylipainatus Angola, ja painotalo tyytyi siihen. Hän perusti '
        + 'pankin, osti palatsin Lissabonista ja kiersi Angolaa, jossa häntä '
        + 'ylistettiin Portugalin omaksi Cecil Rhodesiksi — ja osti hiljaa Portugalin '
        + 'keskuspankin osakkeita, mikä olisi tehnyt väärennetystä sopimuksesta '
        + 'jälkikäteen totta.'
        + '\n\nNeljäntenä joulukuuta 1925 portolaisen valuutanvaihtimon kassa arvasi '
        + 'asian, tarkastaja löysi seuraavana päivänä sattumalta kaksoisnumeroita ja O '
        + 'Século julkaisi jutun. Pankkeja käskettiin järjestää setelinsä '
        + 'numerojärjestykseen, ja lisää löytyi. Reis sai kaksikymmentä vuotta 1930. '
        + 'Portugalin keskuspankki voitti Waterlowia vastaan käydyn jutun lordien '
        + 'huoneessa 1932, eikä painotalo toipunut siitä koskaan täysin.',
      lahde: 'en-Wikipedia "Alves dos Reis". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miksi Alves dos Reisin huijausseteleitä oli lähes mahdoton '
          + 'tunnistaa vääriksi?',
        vaihtoehdot: [
          'Ne oli painettu keskuspankin holvissa',
          'Ne vaihdettiin heti kullaksi',
          'Oikea setelipaino painoi ne aidoilta painolaatoilta',
        ],
        oikea: 2,
      },
    },
    /*
     * Convento da Conceição (Mértolan ikkuna), Beja.
     * Lähde: en-Wikipedia "Letters of a Portuguese Nun" (tarkistettu
     *   30.8.2026)
     */
    {
      id: 'portugalilaisen-nunnan-kirjeet',
      otsikko: 'Portugalilaisen nunnan kirjeet',
      nimio: 'Nunnan kirjeet',
      vuosi: '1669',
      paikka: 'Convento da Conceição (Mértolan ikkuna), Beja',
      lat: 38.0117, lon: -7.865,
      kortti: 'Viisi rakkauskirjettä, epätoivoinen nunna ja komea upseeri — '
        + 'Euroopan lukijat hykertelivät, ja painokset loppuivat kesken. Vasta '
        + 'paljon myöhemmin heräsi kysymys, oliko koko nunnaa olemassakaan. '
        + 'Bejassa näytetään silti yhä ikkunaa, josta häntä ei ehkä koskaan '
        + 'katsottu.',
      teksti: 'Viisi kirjettä ilmestyi nimettöminä Claude Barbinin kustantamana '
        + 'Pariisissa 1669 nimellä Les Lettres Portugaises: nainen kirjoittaa '
        + 'ranskalaiselle upseerille, joka on lähtenyt. Niitä pidettiin aitoina, ja '
        + 'juuri se oli suuri osa niiden vetovoimaa. Ensimmäisenä vuonna otettiin '
        + 'viisi painosta ja saman vuosisadan aikana yli neljäkymmentä. Ennen vuoden '
        + 'loppua sama kustantaja julkaisi seitsemän uutta kirjettä toisen '
        + '\'portugalilaisen naisen\' nimissä.'
        + '\n\nKölnissä painettu laitos nimesi jo 1669 vastaanottajan: markiisi de '
        + 'Chamilly, joka oli tullut Portugaliin sotimaan restauraatiosodassa. '
        + 'Kirjoittaja jäi nimettömäksi. Vasta 1810 hänelle annettiin nimi — Mariana '
        + 'Alcoforado, fransiskaanisisar Bejan luostarista — ja Bejassa näytetään yhä '
        + 'Mértolan ikkunaa, josta hänen kerrotaan ensi kerran nähneen upseerin.'
        + '\n\nVuonna 1926 F. C. Green esitti kirjoittajaksi Gabriel-Joseph de La '
        + 'Vergneä, kreivi de Guilleraguesia, diplomaattia ja Racinen ja Boileaun '
        + 'ystävää. Myöhempi tutkimus on pääosin yhtynyt tähän: kyse ei ole '
        + 'käännöksestä vaan ranskalaisesta sepitteestä ja yhdestä kirjeromaanin '
        + 'perusteoksista.'
        + '\n\nKirja loi muodin, joka kesti seuraavalle vuosisadalle asti — '
        + 'Montesquieun persialaiskirjeisiin ja Rousseaun Uuteen Heloiseen. Ja '
        + '1600-luvun ranskassa sana portugaise alkoi merkitä yksinkertaisesti '
        + 'intohimoista rakkauskirjettä.',
      lahde: 'en-Wikipedia "Letters of a Portuguese Nun". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Kuka useimpien tutkijoiden mukaan todella kirjoitti '
          + '\'portugalilaisen nunnan\' kuuluisat rakkauskirjeet?',
        vaihtoehdot: [
          'Nunna Mariana Alcoforado itse',
          'Markiisi de Chamilly',
          'Ranskalainen diplomaatti Guilleragues',
        ],
        oikea: 2,
      },
    },
    /*
     * Sociedade de Geografia de Lisboa, Lissabon.
     * Lähde: en-Wikipedia "1890 British Ultimatum" (tarkistettu 30.8.2026)
     */
    {
      id: 'vaaleanpunainen-kartta-1890',
      otsikko: 'Vaaleanpunainen kartta ja Britannian ultimaatum',
      nimio: 'Ultimaatum 1890',
      vuosi: '1890',
      paikka: 'Sociedade de Geografia de Lisboa, Lissabon',
      lat: 38.716, lon: -9.1414,
      kortti: 'Portugali väritti kartalle vaaleanpunaisen vyöhykkeen Atlantilta '
        + 'Intian valtamerelle — Britannia lähetti vastaukseksi ultimaatumin, '
        + 'ja väri kuivui kokoon päivässä. Lissabonissa nöyryytys muistettiin '
        + 'pitkään, ja lasku lankesi lopulta kuningashuoneelle. Kartta on '
        + 'sentään tallessa.',
      teksti: 'Ranskan ja Saksan kanssa 1886 tehtyjen sopimusten jälkeen Portugalin '
        + 'ulkoministeriö piirsi kartan, jossa vaaleanpunainen vyöhyke ulottui '
        + 'Angolasta Mosambikiin nykyisten Zimbabwen, Sambian ja suuren osan Malawin '
        + 'yli. Berliinin konferenssi oli jo linjannut, että vaatimusten on nojattava '
        + 'tosiasialliseen hallintaan eikä löytöretkiin. Portugalin vaatimukset '
        + 'nojasivat löytöretkiin: Alexandre de Serpa Pinto oli kulkenut alueen läpi '
        + 'kolmesti, viimeksi Angolasta poikki mantereen vuosina 1877–1879, ja niiden '
        + 'nojalla Lissabon oli esittänyt vaatimuksensa jo 1879.'
        + '\n\nVuonna 1889 Serpa Pinto ylitti Ruo-joen Shiren ylängölle, vaikka '
        + 'Britannian konsuli oli varoittanut häntä, ja marraskuussa hänen joukkonsa '
        + 'taistelivat makololoja vastaan. Lordi Salisbury lähetti 11. tammikuuta 1890 '
        + 'muistion, jossa vaadittiin portugalilaisten joukkojen vetäytymistä. '
        + 'Lissabon suostui päivissä.'
        + '\n\nJosé Luciano de Castron hallitus kaatui. Lontoossa 20. elokuuta 1890 '
        + 'allekirjoitettu sopimus otettiin vastaan niin huonosti, että sekin kaatoi '
        + 'hallituksen eikä sitä koskaan ratifioitu. Uusi sopimus tehtiin Lissabonissa '
        + '11. kesäkuuta 1891: Portugali sai lisää Sambesin laaksoa ja menetti '
        + 'Manicalandin Cecil Rhodesin yhtiölle.'
        + '\n\nNöyryytys jäi kuningashuoneen laskuun. Sitä pidetään yhtenä syynä sekä '
        + 'tasavaltalaisten kapinaan Portossa 31. tammikuuta 1891 että kaksikymmentä '
        + 'vuotta myöhemmin lokakuun 5. päivän vallankumoukseen 1910, joka lopetti '
        + 'Portugalin monarkian.',
      lahde: 'en-Wikipedia "1890 British Ultimatum". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mitä Portugalin \'vaaleanpunainen kartta\' esitti?',
        vaihtoehdot: [
          'Rautatietä Lissabonista Intiaan',
          'Portugalin vaatimaa yhtenäistä siirtomaa-aluetta Angolasta '
            + 'Mosambikiin',
          'Brasilian jakoa Portugalin ja Espanjan kesken',
        ],
        oikea: 1,
      },
    },
  ],
  ROU: [
    /*
     * Gara de Nord, Bukarest.
     * Lähde: ro-Wikipedia: Afacerea Strousberg
     * Lähde: en-Wikipedia: Bethel Henry Strousberg
     */
    {
      id: 'strousbergin-rautatieskandaali',
      otsikko: 'Strousbergin rautatieskandaali',
      nimio: 'Strousberg',
      vuosi: '1868–1872',
      paikka: 'Gara de Nord, Bukarest',
      lat: 44.4463, lon: 26.0745,
      kortti: 'Rautatiekuningas lupasi kiskottaa Romanian Eurooppaan, kunhan '
        + 'sopimuksen sai kirjoittaa itse ja mielellään Berliinissä. Kiskoja '
        + 'tuli hitaammin kuin laskuja, ja laskut olivat sopimuksessa ainoa '
        + 'täsmällisesti toimiva osa. Nuori valtio oppi kalliisti '
        + 'kansainvälisen rahoituksen ensimmäisen säännön: lue paperi ennen '
        + 'kuin juna lähtee.',
      teksti: 'Bethel Henry Strousberg syntyi Itä-Preussissa nimellä Baruch Hirsch '
        + 'Strausberg, muutti nuorena Lontooseen ja vaihtoi sekä nimensä että '
        + 'uskontonsa. Vuonna 1847 hän otti hoidettavakseen uskotut '
        + 'rakennusyhdistysten maksut ja varasi laivalipun Amerikkaan. Höyrylaiva oli '
        + 'lastannut väärää hiililaatua ja joutui kääntymään takaisin Southamptoniin; '
        + 'Strousberg tuomittiin puoleksi vuodeksi pakkotyöhön. 1860-luvulla hän oli '
        + 'Saksan rautatiekuningas.'
        + '\n\nSopimus Romanin, Bukarestin ja Vârciorovan välisestä radasta laadittiin '
        + 'Berliinissä hänen omalla puolellaan ja lähetettiin ruhtinas Carolille 18. '
        + 'helmikuuta 1868. Parlamentti myönsi konsession 10. syyskuuta, ja yhtiön '
        + 'piti liikennöidä rataa yhdeksänkymmentä vuotta. Työmailta tuli kiistoja '
        + 'mittauksista sekä laskuja osuuksista, jotka olivat myöhässä tai '
        + 'rakentamatta.'
        + '\n\nStrousberg meni vararikkoon 1870, ja 5. heinäkuuta 1871 Romania mitätöi '
        + 'konsession lailla. Wieniläispankkiirit Bleichröder ja Hansemann ottivat '
        + 'työn hoitaakseen 1872, ja rata valmistui kymmenessä vuodessa. Vuonna 1874 '
        + 'osakkeenomistajien varat loppuivat ja valtion oli lunastettava osa '
        + 'verkosta; 1880 se osti lopunkin.'
        + '\n\nSamoin kävi rakentajalle. Strousberg julistettiin konkurssiin 1875, ja '
        + 'Hansemann ja Bleichröder saivat hänen rautatiensä murto-osalla arvostaan. '
        + 'Häntä syytettiin Venäjällä, hänet karkotettiin, ja hän kuoli '
        + 'sydänkohtaukseen Berliinissä 1884 vaatimattomissa oloissa.',
      lahde: 'ro-Wikipedia "Afacerea Strousberg" ja en-Wikipedia "Bethel Henry '
        + 'Strousberg". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miten Strousbergin rautatiekonsessio Romaniassa päättyi?',
        vaihtoehdot: [
          'Rata valmistui ajallaan ja voitollisena',
          'Strousberg meni vararikkoon ja Romania mitätöi konsession lailla '
            + '1871',
          'Itävalta osti radan ja liitti sen omaan verkkoonsa',
        ],
        oikea: 1,
      },
    },
    /*
     * Romanian kansallishistorian museo, Bukarest (aarre esillä).
     * Lähde: en-Wikipedia: Pietroasele Treasure
     * Lähde: ro-Wikipedia: Tezaurul de la Pietroasa
     */
    {
      id: 'kultakanan-ryosto-1875',
      otsikko: '\'Kultakana poikasineen\' — Pietroaselen aarteen ryöstö',
      nimio: 'Kultakana',
      vuosi: 'löytö 1837, ryöstö 1875',
      paikka: 'Romanian kansallishistorian museo, Bukarest (aarre esillä)',
      lat: 44.4313, lon: 26.0973,
      kortti: 'Tämä aarre on selvinnyt varkaudesta, sahasta, tulipalosta ja '
        + 'neljänkymmenen vuoden ulkomaanevakosta — museoesineeksi harvinaisen '
        + 'vauhdikas ura. Varas katkoi ainoan riimukirjoitetun kaularenkaan '
        + 'paloiksi, ja muinainen teksti pelastui vain siksi, että joku oli '
        + 'sattunut valokuvaamaan sen Lontoossa. Kopio voi joskus olla aarteen '
        + 'tärkein osa.',
      teksti: 'Keväällä 1837 kaksi kivimiestä, Ion Lemnaru ja hänen appensa Stan '
        + 'Avram, louhivat kiveä Istrițan kukkuloilla Buzăun piispanistuimen '
        + 'rakennustyömaalle ja löysivät kiven alta kultaa. He pitivät löydön '
        + 'ullakolla vuoden ja myivät sen sitten neljällätuhannella leillä '
        + 'Anastase-nimiselle miehelle, joka työskenteli Câlnăun sillalla. Tämä '
        + 'hakkasi esineet rikki kirveellä, ja jalokivet varisivat lattialle ja '
        + 'lakaistiin pihan pölyyn.'
        + '\n\nKahdestakymmenestäkuudesta esineestä saatiin talteen kaksitoista, '
        + 'kaikkiaan lähes yhdeksäntoista kiloa kultaa. Lemnaru ja Stan Avram kuolivat '
        + 'vankilassa ennen tuomiota. Esineiden joukossa on kaularengas, jossa on '
        + 'riimukirjoitus; se on aarteen ainoa teksti ja syy siihen, että löytö '
        + 'osataan ylipäätään ajoittaa ja liittää goottien maailmaan.'
        + '\n\nVuonna 1875 Dumitru Pantazescu-Popescu varasti aarteen Bukarestin '
        + 'yliopistonpalatsissa toimineesta antiikkimuseosta, ja bukarestilainen '
        + 'hopeaseppä katkoi riimukaularenkaan ainakin neljään osaan; suurin osa siitä '
        + 'sulatettiin. Riimut tunnetaan vain siksi, että lontoolainen Arundel-seura '
        + 'oli valokuvannut renkaan tarkasti ennen varkautta.'
        + '\n\nTulipalo samassa museossa 1884 vaurioitti aarretta lisää. Sen jälkeen '
        + 'Carol I lähetti kokoelman Berliiniin, jossa kultaseppä Paul Telge entisöi '
        + 'esineet, vahvisti niitä hopealla ja pronssilla ja teki niistä myös kopion. '
        + 'Joulukuussa 1916 aarre lähetettiin Moskovaan ja palautettiin vasta 1956.',
      lahde: 'en-Wikipedia "Pietroasele Treasure", ro-Wikipedia "Tezaurul de la '
        + 'Pietroasa" ja en-Wikipedia "Ring of Pietroassa". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miksi Pietroaselen aarteen riimukirjoitus voitiin rekonstruoida '
          + 'vuoden 1875 ryöstön jälkeen?',
        vaihtoehdot: [
          'Kaularenkaasta oli otettu valokuvat Lontoossa ennen varkautta',
          'Varas tunnusti ja saneli tekstin muistista',
          'Sama teksti löytyi toisesta aarteesta',
        ],
        oikea: 0,
      },
    },
  ],
  RUS: [
    /*
     * Pietari-Paavalin linnoitus, Pietari.
     * Lähde: en-Wikipedia: Princess Tarakanova
     */
    {
      id: 'prinsessa-tarakanova',
      otsikko: 'Prinsessa Tarakanova — huijariprinsessa ja keisarinnan ansa',
      nimio: 'Tarakanova',
      vuosi: '1774–1775',
      paikka: 'Pietari-Paavalin linnoitus, Pietari',
      lat: 59.95, lon: 30.3164,
      kortti: 'Nainen ilman nimeä pelotti Euroopan mahtavinta keisarinnaa niin, '
        + 'että perään lähetettiin laivasto ja viettelijä. Kuulustelijat eivät '
        + 'koskaan saaneet selville, kuka hän oli — eikä kukaan muukaan ole '
        + 'saanut. Taulussa hän hukkuu selliin tulvassa; todellisuus oli '
        + 'proosallisempi, mutta arvoitus jäi, ja arvoitus elää pidempään kuin '
        + 'tulva.',
      teksti: 'Hän ilmestyi Kieliin 1770 ja jatkoi matkaa nimestä toiseen: Berliinissä '
        + 'neiti Frank, Gentissä neiti Schell, Lontoossa madame de Trémouille, '
        + 'myöhemmin lady Shelley, kreivitär Pinneberg ja sulttaanitar Selime. '
        + 'Frankenissa hän oli Ali Emena, persialaisen satraapin tytär. Joka paikkaan '
        + 'jäi velkojia.'
        + '\n\nMerkitsevä väite oli viimeinen: että hän oli keisarinna Elisabetin ja '
        + 'Aleksei Razumovskin tytär ja siis lähempänä Venäjän valtaistuinta kuin '
        + 'Katariina II. Katariina lähetti hänen peräänsä amiraali Aleksei Orlovin. '
        + 'Orlov teki hänelle lähentelyjä Livornossa, kutsui hänet venäläiselle '
        + 'laivalle ja purjehti Venäjälle helmikuussa 1775.'
        + '\n\nPietari-Paavalin linnoituksessa häntä kuulusteli Pietarin kuvernööri '
        + 'Golitsyn, joka raportoi, että naisen elämäntarina oli täynnä uskomattomia '
        + 'käänteitä ja muistutti pikemminkin satua. Oikea nimi ei tullut ilmi silloin '
        + 'eikä myöhemmin. Hän kuoli keuhkotautiin 4. joulukuuta 1775 ja on haudattu '
        + 'linnoituksen hautausmaalle.'
        + '\n\nKuuluisa maalaus, jossa hän hukkuu selliinsä tulvassa, tehtiin vasta '
        + '1800-luvulla, ja tulva tuli hänen kuolemansa jälkeen. Nimikin on '
        + 'jälkikäteen annettu: kukaan ei kutsunut häntä Tarakanovaksi hänen '
        + 'eläessään. Huhu, että kuolema lavastettiin ja hänet pantiin nunnaksi, on '
        + 'kiinnittynyt Dosifea-nimiseen sisareen, joka eli moskovalaisessa '
        + 'luostarissa 1785–1810.',
      lahde: 'en-Wikipedia "Princess Tarakanova". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miten \'prinsessa Tarakanova\' saatiin kiinni?',
        vaihtoehdot: [
          'Amiraali Orlov vietteli hänet ja houkutteli laivalleen '
            + 'Livornossa',
          'Hänet tunnistettiin Pietarin oopperassa',
          'Oma kamarineiti kavalsi hänet palkkiota vastaan',
        ],
        oikea: 0,
      },
    },
    /*
     * Moskovan Kreml.
     * Lähde: en-Wikipedia: Lost Library of Ivan the Terrible
     */
    {
      id: 'iivanan-kadonnut-kirjasto',
      otsikko: 'Iivana Julman kadonnut kirjasto Kremlin alla',
      nimio: 'Kadonnut kirjasto',
      vuosi: '1500-luku, etsintöjä nykypäivään',
      paikka: 'Moskovan Kreml',
      lat: 55.7517, lon: 37.6178,
      kortti: 'Paras kadonnut aarre on sellainen, jonka olemassaoloa ei voi '
        + 'todistaa eikä kumota — Iivana Julman kirjasto on lajin mestariteos. '
        + 'Viisisataa vuotta etsintöjä, nolla nidettä, ja silti joka sukupolvi '
        + 'joku laskeutuu Kremlin kellareihin lyhty kädessä. Kirjaston '
        + 'sisällysluettelokin on kadonnut, mikä on etsijöiden kannalta '
        + 'suorastaan käytännöllistä.',
      teksti: 'Tarina alkaa vuodesta 1518, jolloin oppinut Maksim Kreikkalainen '
        + 'kutsuttiin Moskovaan ja Vasili III näytti hänelle kreikkalaisia kirjoja. '
        + 'Elämäkerran mukaan Maksim vakuutti, ettei ollut nähnyt niin montaa '
        + 'kreikkalaista kirjaa edes Kreikassa. Osan niistä kerrotaan tulleen Sofia '
        + 'Palaiologinan mukana Konstantinopolista, kun hän meni naimisiin Iivana '
        + 'III:n kanssa 1472.'
        + '\n\nSeuraava kuvaus on saksalaisen papin. Johannes Wettermanin kutsui '
        + 'Iivana IV, ei asevarastoon vaan lukittuun huoneeseen, jota ei ollut avattu '
        + 'sataan vuoteen, ja hänen piti luetteloida kirjoja, jotka tutkijat tunsivat '
        + 'vain viittauksista. Vuoden 1724 raportissa kerrotaan miehestä, joka oli '
        + '1682 lähetetty Kremlin salakäytävään ja löytänyt huoneen täynnä arkkuja; '
        + 'kun hän ilmoitti asiasta, ruhtinatar Sofia kielsi käytävään menon.'
        + '\n\n1800-luvun alussa professori Dabelov löysi Pärnun arkistosta luettelon '
        + 'nimeltä \'Tsaarin hallussa olevat käsikirjoitukset\', noin kahdeksansataa '
        + 'nimikettä. Hän lähti hakemaan kollegaansa todistajaksi, ja palatessaan '
        + 'asiakirja oli poissa. Jäljellä on vain se, minkä hän oli ehtinyt kopioida.'
        + '\n\nProfessori Thraemer asui Moskovassa kuukausia 1891. Zabelin päätteli '
        + '1893, että kirjasto oli ollut olemassa mutta tuhoutunut 1600-luvulla. '
        + 'Kremlin alta kaivettiin esiin kammioita ja käytäviä, kaikki tyhjiä. '
        + 'Arkeologi Stelletski etsi kirjastoa vuosikymmeniä eikä löytänyt. Pietari '
        + 'Suuri oli etsinyt sitä ennen häntä, sotiensa rahoitusta ajatellen.',
      lahde: 'en-Wikipedia "Lost Library of Ivan the Terrible". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mistä Iivana Julman kirjaston arvokkaimpien käsikirjoitusten '
          + 'kerrotaan tulleen Moskovaan?',
        vaihtoehdot: [
          'Novgorodin kauppiaiden tuomina',
          'Sotasaaliina Puolasta',
          'Sofia Palaiologinan mukana Konstantinopolista',
        ],
        oikea: 2,
      },
    },
    /*
     * Vagankovon hautausmaa, Moskova (Sonjan legendamuistomerkki).
     * Lähde: en-Wikipedia: Sonya Golden Hand
     * Tarkennettu 105 m: en-Wikipedia "Vagankovo Cemetery" -koordinaatit.
     */
    {
      id: 'sonja-kultakasi',
      otsikko: 'Sonja Kultakäsi — keisarikunnan kuuluisin huijaritar',
      nimio: 'Sonja Kultakäsi',
      vuosi: '1870–1880-luvut',
      paikka: 'Vagankovon hautausmaa, Moskova (Sonjan legendamuistomerkki)',
      lat: 55.7681, lon: 37.5483,
      kortti: 'Sonja Kultakäsi ymmärsi, että paras työkalu ei ole tiirikka vaan '
        + 'hyvin harjoiteltu kohtaus: hänen huijauksissaan oli rooleja, '
        + 'lavastus ja täydellinen ajoitus. Jalokivikauppias sai psykiatrilta '
        + 'diagnoosin, Sonja sai jalokivet. Laki sai hänet lopulta kiinni, '
        + 'mutta legenda karkasi Sahalinilta helpommin kuin hän itse.',
      teksti: 'Hän syntyi nimellä Sheindlia-Sura Solomoniak Varsovan piirissä 1846 — '
        + 'itsestään hän ei koskaan kertonut suoraan, ja jopa vuosiluku on epävarma. '
        + 'Toukokuussa 1883 hän astui moskovalaisen jalokivikauppias Karl von Melin '
        + 'liikkeeseen tunnetun psykiatrin vaimona, valitsi kolmenkymmenentuhannen '
        + 'ruplan edestä koruja ja pyysi kauppiasta tuomaan ne itse kotiin.'
        + '\n\nHän oli jo käynyt lääkärin luona rouva von Melinä ja maksanut etukäteen '
        + 'hoidosta iäkkäälle miehelleen, joka oli tullut hulluksi timanttien '
        + 'ostamisesta. Ovella hän otti rasian, sanoi käyttävänsä koruja illalla ja '
        + 'ohjasi kauppiaan odottamaan työhuoneeseen. Kun kauppias vaati maksua, '
        + 'hoitajat veivät hänet pois.'
        + '\n\nLokakuussa 1884 hän sai odessalaisen pankkiirin makuuvaunuun ja poistui '
        + 'aamulla 43 000 ruplan käteisen ja arvopapereiden kanssa. Elokuussa 1885 hän '
        + 'jätti Petrovkan liikkeeseen vakuudeksi harmaahapsisen isän ja '
        + 'lastenhoitajan sylissä olevan pikkutytön ja lähti 22 300 ruplan koruilla. '
        + 'Poliisi selvitti, että \'sukulaiset\' oli palkattu Hitrovkan torilta '
        + 'lehti-ilmoituksella.'
        + '\n\nHän päätyi Sahalinin rangaistussiirtolaan. Tšehov tapasi hänet siellä '
        + '1890 eristyssellissä jalkaraudoissa — hän oli paennut saarelta sotilaaksi '
        + 'pukeutuneena — ja kirjoitti, ettei ollut mahdollista uskoa naisen olleen '
        + 'kaunis, vaikka hän oli lumonnut vartijansa Smolenskissa niin, että '
        + 'vartiopäällikkö oli karannut hänen mukanaan. Vagankovon hautausmaalla '
        + 'seisoo nimettömällä haudalla päätön patsas, jonka luona käydään yhä '
        + 'pyytämässä Sonjalta apua omiin rikoksiin.',
      lahde: 'en-Wikipedia "Sonya Golden Hand". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Millä tempulla Sonja Kultakäsi huijasi moskovalaista '
          + 'jalokivikauppiasta 1883?',
        vaihtoehdot: [
          'Hän vaihtoi korut kopioihin sovituskopissa',
          'Hän esitti psykiatrin vaimoa ja jätti kauppiaan \'potilaaksi\'',
          'Hän nukutti kauppiaan teellä',
        ],
        oikea: 1,
      },
    },
  ],
  SWE: [
    /*
     * Södra Bankohuset, Järntorget, Gamla Stan, Tukholma.
     * Lähde: en.wikipedia.org: Stockholms Banco
     * Lähde: en.wikipedia.org: Johan Palmstruch
     */
    {
      id: 'palmstruchin-setelipankki',
      otsikko: 'Euroopan ensimmäiset setelit — ja ensimmäinen setelipankin romahdus',
      nimio: 'Setelipankki',
      vuosi: '1657–1668',
      paikka: 'Södra Bankohuset, Järntorget, Gamla Stan, Tukholma',
      lat: 59.3225, lon: 18.0739,
      kortti: 'Setelin keksiminen oli nerokasta: paperi painaa vähemmän kuin '
        + 'kahdenkymmenen kilon kuparilevy. Toinen oivallus — että paperia voi '
        + 'painaa enemmän kuin kassassa on katetta — vei keksijän vankilaan ja '
        + 'pankin nurin. Molemmat opetukset ovat pysyneet ajankohtaisina siitä '
        + 'asti.',
      teksti: 'Ruotsissa ei ollut yhtä rahaa: hopeataalerit katosivat säästöön, ja '
        + 'käytössä kiersi kuparilevyraha, kolikoita tarjottimen kokoon asti. Riiassa '
        + 'syntynyt Johan Palmstruch — alkuaan Wittmacher — sai kaksi pankkiehdotusta '
        + 'hylätyksi; kolmas, joka lupasi kruunulle puolet voitosta, kelpasi, ja '
        + 'Kaarle X Kustaa allekirjoitti oikeuskirjat 30. marraskuuta 1656.'
        + '\n\nEnsimmäinen keksintö oli lainata talletukset eteenpäin. Talletukset '
        + 'olivat lyhyitä ja lainat pitkiä, joten rahaa ei ollut kassassa silloin kun '
        + 'tallettajat sitä halusivat — ja kun kolikoiden kuparipitoisuutta laskettiin '
        + '17 prosenttia vuonna 1660, kaikki halusivat vanhat levynsä takaisin. Toinen '
        + 'keksintö ratkaisi ensimmäisen: vuonna 1661 pankki alkoi antaa '
        + 'kreditiiviseteleitä tasasummina. Ne olivat Euroopan ensimmäisiä seteleitä, '
        + 'ja jokaisessa oli Palmstruchin ja pankin virkailijoiden allekirjoitukset.'
        + '\n\nMenestys oli välitön, koska seteli mahtui kirjekuoreen ja kuparilevy '
        + 'vaati kärryt. Sitten pankki huomasi, että seteleitä voi painaa lisää, ja '
        + 'painoi. Syksyllä 1663 setelien arvo alkoi laskea, lokakuusta lähtien pankki '
        + 'kieltäytyi yhä useammin lunastamasta niitä, ja 1664 toiminta loppui. '
        + 'Valtiopäivien oli otettava vastuu, ja selvitystila saatiin päätökseen 1667.'
        + '\n\nVuonna 1668 Palmstruch tuomittiin menettämään aatelisarvonsa ja '
        + 'pankkioikeutensa sekä karkotukseen tai kuolemaan. Kuolemantuomio '
        + 'armahdettiin; hän istui vankilassa vuoteen 1670 ja kuoli seuraavana vuonna. '
        + 'Oikeus siirtyi valtiopäivien pankille, nykyiselle Riksbankenille, maailman '
        + 'vanhimmalle yhä toimivalle keskuspankille — joka ei saanut painaa seteleitä '
        + 'ennen seuraavaa vuosisataa.',
      lahde: 'en-Wikipedia "Stockholms Banco" ja en-Wikipedia "Johan Palmstruch". '
        + 'Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miksi Stockholms Banco, Euroopan ensimmäinen setelipankki, kaatui?',
        vaihtoehdot: [
          'Seteleitä painettiin enemmän kuin pankilla oli katetta',
          'Setelit väärennettiin heti liian helposti',
          'Kuningas takavarikoi pankin varat sotaan',
        ],
        oikea: 0,
      },
    },
    /*
     * Kuninkaallinen ooppera, Gustav Adolfs torg, Tukholma (murhapaikalla
     *   seisova nykyinen oopperatalo).
     * Lähde: en.wikipedia.org: Gustav III
     */
    {
      id: 'naamiaisten-laukaus',
      otsikko: 'Naamiaisten laukaus',
      nimio: 'Naamiaislaukaus',
      vuosi: '1792',
      paikka: 'Kuninkaallinen ooppera, Gustav Adolfs torg, Tukholma (murhapaikalla '
        + 'seisova nykyinen oopperatalo)',
      lat: 59.3297, lon: 18.0706,
      kortti: 'Naamiaiset ovat salamurhaajan kannalta käytännölliset: kaikilla on '
        + 'naamio, eikä kukaan ihmettele, miksi joku lähestyy kuningasta. '
        + 'Kustaa III oli saanut varoituskirjeenkin, mutta meni tanssiaisiin '
        + 'silti. Jälkimaailma sai aiheesta oopperan; Ruotsi sai '
        + 'perustuslakikriisin.',
      teksti: 'Kustaa III saapui oopperataloon 16. maaliskuuta 1792 hyvissä ajoin '
        + 'illastamaan ystäviensä kanssa. Illallisella hänelle ojennettiin nimetön '
        + 'ranskankielinen kirje, jossa pyydettiin peruuttamaan tanssiaiset: rosvot '
        + 'eivät pidä lyhdyistä, siinä luki, eikä murhalle ole mitään niin sopivaa '
        + 'kuin pimeys ja naamio. Kuningas oli saanut uhkauskirjeitä ennenkin ja meni '
        + 'saliin.'
        + '\n\nKirjeen oli kirjoittanut henkikaartin eversti Carl Pontus Lilliehorn — '
        + 'yksi salaliittolaisista. Muut olivat Jacob Johan Anckarström, Adolph '
        + 'Ribbing, Claes Fredrik Horn ja Carl Fredrik Pechlin, aatelismiehiä, joiden '
        + 'viha oli kasvanut kuninkaan vallankaappauksesta ja Venäjän-sodasta asti. '
        + 'Keskiyöllä he asettuivat hänen taakseen väkijoukkoon. Laukaus osui '
        + 'kolmannen lannenikaman kohdalta.'
        + '\n\nKuningas ei kaatunut. Hän sanoi ranskaksi vain \'aï, je suis blessé\'. '
        + 'Anckarström pudotti pistoolin ja veitsen ja huusi tulipaloa. Uloskäynnit '
        + 'suljettiin, ja hänet pidätettiin seuraavana aamuna. Ampumisen hän tunnusti '
        + 'heti, salaliiton kiisti — kunnes kuuli, että Horn ja Ribbing olivat '
        + 'tunnustaneet kaiken.'
        + '\n\nKustaa eli vielä kolmetoista päivää, johti valtakuntaa vuoteestaan ja '
        + 'vastaanotti anteeksipyyntöjä poliittisilta vastustajiltaan. Hän kuoli '
        + 'verenmyrkytykseen 29. maaliskuuta. Murhasta tehtiin kolme oopperaa; niistä '
        + 'jäi elämään Verdin Un ballo in maschera, jossa sensuurin vaatimuksesta '
        + 'tapahtumat oli siirretty Bostoniin.',
      lahde: 'en-Wikipedia "Gustav III". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Missä kuningas Kustaa III ammuttiin vuonna 1792?',
        vaihtoehdot: [
          'Metsästysretkellä Djurgårdenissa',
          'Naamiaisissa Tukholman oopperatalossa',
          'Drottningholmin linnan juhlaillallisella',
        ],
        oikea: 1,
      },
    },
    /*
     * Tändstickspalatset (Tulitikkupalatsi), Västra Trädgårdsgatan 15,
     *   Tukholma.
     * Lähde: en.wikipedia.org: Ivar Kreuger
     */
    {
      id: 'kreugerin-romahdus',
      otsikko: 'Tulitikkukuninkaan romahdus',
      nimio: 'Kreuger',
      vuosi: '1932',
      paikka: 'Tändstickspalatset (Tulitikkupalatsi), Västra Trädgårdsgatan 15, '
        + 'Tukholma',
      lat: 59.3318, lon: 18.0696,
      kortti: 'Kreuger keksi liikeidean, jota valtiovarainministerit rakastivat: '
        + 'hän lainasi valtioille rahaa ja pyysi vastineeksi vain yksinoikeuden '
        + 'tulitikkuihin. Kukaan ei kysynyt liian tarkkaan, mistä lainarahat '
        + 'tulivat — ennen kuin kevät 1932 vastasi kysymykseen kaikkien '
        + 'puolesta.',
      teksti: 'Ivar Kreuger aloitti ruotsalaisista tulitikkutehtaista ja päätyi '
        + 'hallitsemaan kahdesta kolmasosasta kolmeen neljäsosaan maailman '
        + 'tulitikkutuotannosta. Menetelmä oli helppo selittää: hän lainasi valtiolle '
        + 'rahaa ja pyysi vastineeksi maan tulitikkumonopolin. Kaupan tekivät muun '
        + 'muassa Puola, Romania, Turkki, Latvia, Liettua, Viro, Bolivia, Guatemala ja '
        + 'Saksa.'
        + '\n\nRahat tulivat sijoittajilta, ja niiden houkuttelemiseksi Kreuger keksi '
        + 'omat välineensä: B-osakkeen, jolla oli tuhannesosa äänestä, niin että '
        + 'pääoman saattoi kaksinkertaistaa määräysvallasta luopumatta, sekä American '
        + 'Certificates -todistukset, jotka olivat osaksi lainaa ja osaksi osaketta. '
        + 'Vuonna 1929 hänen imperiuminsa arvoksi laskettiin kolmekymmentä miljardia '
        + 'kruunua ja yli kaksisataa yhtiötä; kaikkien ruotsalaispankkien '
        + 'yhteenlaskettu luotonanto oli tuolloin runsaat neljä miljardia.'
        + '\n\nHelmikuussa 1932 Kreuger pyysi Riksbankenilta lisää. Hänen velkansa '
        + 'ruotsalaispankeille arvioitiin puoleksi maan valuuttavarannosta, ja tällä '
        + 'kertaa hallitus vaati koko konsernin tilinpäätöksen. Hän palasi Amerikasta '
        + 'laivalla ja saapui Pariisiin 11. maaliskuuta. Seuraavana aamuna hänet '
        + 'löydettiin kuolleena asuntonsa vuoteesta, pistooli vieressä ja kirje, jossa '
        + 'luki hänen sotkeneen asiat niin pahoin, että tämä tuntui kaikkien kannalta '
        + 'parhaalta ratkaisulta.'
        + '\n\nPrice Waterhouse kävi kirjanpidon läpi ja totesi, että manipulaatiot '
        + 'olivat niin lapsellisia, että alkeellisinkin kirjanpidon tuntemus olisi '
        + 'paljastanut kirjojen olevan väärennettyjä. Tuhannet ruotsalaiset menettivät '
        + 'säästönsä. Yhdysvallat kirjoitti arvopaperilakinsa uusiksi 1933 ja 1934 — '
        + 'pitkälti Kreugerin takia.',
      lahde: 'en-Wikipedia "Ivar Kreuger". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mitä Ivar Kreuger pyysi valtioilta vastineeksi lainoistaan?',
        vaihtoehdot: [
          'Kaivosoikeuksia ja rautatieosuuksia',
          'Verovapauden yhtiöilleen',
          'Tulitikkujen myyntimonopolin',
        ],
        oikea: 2,
      },
    },
  ],
  TUR: [
    /*
     * Topkapın palatsin aarrekammio, Istanbul.
     * Lähde: en-Wikipedia "Spoonmaker's Diamond" (tarkistettu 30.8.2026)
     */
    {
      id: 'kasikci-elmasi-legenda',
      otsikko: 'Lusikantekijän timantti',
      nimio: 'Kaşıkçı-timantti',
      vuosi: '1700-luku–',
      paikka: 'Topkapın palatsin aarrekammio, Istanbul',
      lat: 41.0128, lon: 28.984,
      kortti: 'Topkapın kuuluisin timantti on saanut nimensä kaupasta, jossa toinen '
        + 'osapuoli sai 86 karaattia ja toinen kolme puulusikkaa. Näin ainakin '
        + 'kerrotaan — ja juuri se on tämän kiven erikoisuus: kukaan ei tiedä, '
        + 'mistä se tuli. Aarrekammiossa kiiltää 86 karaattia todistetta siitä, '
        + 'että paraskaan tarina ei tarvitse kuittia.',
      teksti: 'Kivi on 86 karaatin päärynänmuotoinen timantti, kehystetty hopeaan ja '
        + 'ympäröity kahdella rivillä, yhteensä 49:llä vanhalla hiotulla briljantilla. '
        + 'Se riippuu vitriinissä aarrekammion kolmannessa huoneessa Topkapın '
        + 'Valloittajan paviljongissa ja on lajissaan neljänneksi suurin maailmassa. '
        + 'Miten se tuli sinne, ei tiedä kukaan.'
        + '\n\nTunnetuin tarina: köyhä mies löysi Yenikapın rannalta roskien seasta '
        + 'kiiltävän kiven, kantoi sitä taskussaan muutaman päivän ja vei sen '
        + 'ensimmäiselle vastaan tulleelle jalokivikauppiaalle. Tämä katsoi kiveä '
        + 'ohimennen, sanoi sitä lasinpalaksi ja tarjosi kolmea lusikkaa, ettei matka '
        + 'menisi hukkaan. Toisissa versioissa löytäjä on maanviljelijä tai '
        + 'lusikantekijä, tai nimi tulee siitä, että kivi muistuttaa lusikan kaukaloa.'
        + '\n\nMuseon omissa luetteloissa on kyllä sormuskivi nimeltä Kaşıkçı, joka '
        + 'kuului 1600-luvulla sulttaani Mehmet IV:lle — mutta se painoi kultoineen '
        + 'vain 50–60 karaattia, paljon vähemmän kuin nykyinen kivi. Toinen '
        + 'tarinasarja kulkee Tepelenan Ali Pašan kautta: hänen omaisuutensa '
        + 'takavarikoitiin sulttaanille, kun hänet teloitettiin.'
        + '\n\nRomanttisimmassa versiossa Napoleonin äiti lähetti suuren timantin '
        + 'Selim III:lle lunnaiksi rakastajastaan, ranskalaisupseerista, joka jäi '
        + 'vangiksi Prevezassa 1798. Upseeri oli olemassa ja vangiksi hän jäi. Mutta '
        + 'hän oli silloin 27-vuotias ja Letizia Bonaparte 48, eikä upseeri mainitse '
        + 'kolmiosaisissa muistelmissaan timanttia sanallakaan.',
      lahde: 'en-Wikipedia "Spoonmaker\'s Diamond". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mihin hintaan legendan köyhä löytäjä luopui myöhemmin '
          + 'Lusikantekijän timanttina tunnetusta kivestä?',
        vaihtoehdot: [
          'Kolmeen puulusikkaan',
          'Aasiin ja kärryihin',
          'Säkilliseen riisiä',
        ],
        oikea: 0,
      },
    },
    /*
     * Osmanien valtionvelkahallinnon talo (nyk. Istanbul Erkek Lisesi),
     *   Cağaloğlu, Istanbul.
     * Lähde: en-Wikipedia "Ottoman Public Debt Administration" (tarkistettu
     *   30.8.2026)
     * Korjattu 205 m: en-Wikipedia "Istanbul High School" (OPDA-talo)
     *   -koordinaatit.
     */
    {
      id: 'osmanien-vararikko-1875',
      otsikko: 'Imperiumin vararikko ja velkojien virasto',
      nimio: 'Vararikko 1875',
      vuosi: '1875–1881',
      paikka: 'Osmanien valtionvelkahallinnon talo (nyk. Istanbul Erkek Lisesi), '
        + 'Cağaloğlu, Istanbul',
      lat: 41.0122, lon: 28.9739,
      kortti: 'Kun imperiumi ei enää maksanut velkojaan, velkojat eivät lähettäneet '
        + 'karhukirjettä — he perustivat Istanbuliin oman viraston keräämään '
        + 'imperiumin verot. Velkojien konttorissa oli lopulta enemmän väkeä '
        + 'kuin sulttaanin valtiovarainministeriössä. Suurvallan arvokkuudelle '
        + 'tämä oli kova kolaus, kirjanpidolle kuulemma erinomainen.',
      teksti: 'Osmanivaltio oli ottanut eurooppalaista lainaa vuodesta 1855, ensin '
        + 'Krimin sotaan ja sitten rautateihin ja hovin menoihin. Lokakuun 30. päivänä '
        + '1875 se ilmoitti niin sanotulla ramadan-asetuksella, ettei pystyisi '
        + 'maksamaan. Velan määräksi arvioitiin 214,5 miljoonaa puntaa. Valtakunnan '
        + 'koko vuositulo oli 21,7 miljoonaa.'
        + '\n\nMaksukyvyttömyyttä seurasi kuuden vuoden neuvottelu, joka '
        + 'tuotti muharram-asetuksen 15. lokakuuta 1881: se leikkasi velan 191 '
        + 'miljoonasta punnasta 106 miljoonaan ja perusti Istanbuliin valtionvelan '
        + 'hallinnon. Sen neuvostossa istui yksi edustaja kunkin maan — Britannian, '
        + 'Ranskan, Saksan, Itävallan, Italian, Alankomaiden ja osmanien — velkojista '
        + 'sekä yksi osmanivaltiosta.'
        + '\n\nHallinnolle luovutettiin suola- ja tupakkamonopolit sekä leimavero, '
        + 'alkoholi-, kalastus- ja silkkiverot, kauppojen verot ja tullimaksut '
        + 'valtakunnan rikkaimmilla alueilla, ja se keräsi ne itse. Virkailijoita oli '
        + '5 000 ja parhaimmillaan 9 000 — enemmän kuin valtakunnan omassa '
        + 'valtiovarainministeriössä. Vuoteen 1900 mennessä hallinto rahoitti omaan '
        + 'lukuunsa rautateitä ja teollisuutta.'
        + '\n\nVuonna 1909 velasta ilmoitettiin maksetun yhdeksän kymmenesosaa. Turkin '
        + 'tasavalta otti jäljelle jääneen kannettavakseen Pariisin konferenssissa '
        + '1925, neuvotteli summan uudelleen alas 1933 ja maksoi osmanien velan '
        + 'viimeisen erän 25. toukokuuta 1954.',
      lahde: 'en-Wikipedia "Ottoman Public Debt Administration" ja en-Wikipedia '
        + '"Ottoman public debt". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mitä eurooppalaisten velkojien johtama OPDA sai tehdä '
          + 'Osmanivaltiossa vuodesta 1881?',
        vaihtoehdot: [
          'Painaa imperiumin setelit',
          'Nimittää suurvisiirin',
          'Kerätä valtion veroja suoraan velkojen maksuun',
        ],
        oikea: 2,
      },
    },
    /*
     * Uşakin arkeologinen museo, Uşak.
     * Lähde: en-Wikipedia "Karun Treasure" (tarkistettu 30.8.2026)
     */
    {
      id: 'karun-aarre',
      otsikko: 'Karun-aarteen pitkä kotimatka',
      nimio: 'Karun-aarre',
      vuosi: '1966–2006',
      paikka: 'Uşakin arkeologinen museo, Uşak',
      lat: 38.6803, lon: 29.4064,
      kortti: 'Lyydian kulta-aarre ryöstettiin haudasta, salakuljetettiin New '
        + 'Yorkiin, voitettiin oikeudessa kotiin — ja sitten museon oma johtaja '
        + 'vaihtoi sen kuuluisimman soljen väärennökseen. Paikalliset syyttivät '
        + 'haudan vanhaa kirousta, tuomioistuin pelivelkoja. Aarre on nyt '
        + 'esillä Uşakissa, ja sitä vahditaan tarkemmin kuin koskaan.',
      teksti: 'Yönä 6. kesäkuuta 1966 kolme miestä Güren kylästä, jotka olivat '
        + 'päiväkausia yrittäneet murtaa Toptepen hautakammion marmoriovea, '
        + 'räjäyttivät katon ja näkivät ensimmäisinä 2 600 vuoteen lyydialaisen '
        + 'ylhäisönaisen hautaesineet. Seuraavan vuoden aikana he löysivät lisää '
        + 'muista kumpuhaudoista. Esineet vietiin maasta İzmirin ja Amsterdamin '
        + 'kautta.'
        + '\n\nMetropolitan-museo osti ne 1967 ja 1968: kahdestasadasta esineestä '
        + 'laskutettiin 1,2 miljoonaa dollaria. Vuonna 1984 toimittaja Özgen Acar '
        + 'tunnisti osan museon luettelosta ja kertoi kulttuuriministeriölle, mistä ne '
        + 'olivat peräisin. Turkki nosti kanteen New Yorkissa 1987, ja 1993 museo '
        + 'myönsi tienneensä esineiden olleen varastettuja ja palautti 363 kappaletta.'
        + '\n\nAarre pantiin esille Uşakin pieneen museoon. Toukokuussa 2006 kokoelman '
        + 'tunnetuin esine, kultainen merihevossolki, paljastui väärennökseksi; vaihto '
        + 'oli tehty noin vuotta aiemmin. Museon entinen johtaja Kazım Akbıyıkoğlu, '
        + 'joka oli itse tehnyt enemmän kuin kukaan aarteen kotiuttamiseksi, '
        + 'pidätettiin kymmenen muun kanssa ja myönsi myyneensä museon esineitä '
        + 'pelivelkojensa kattamiseksi.'
        + '\n\nHän vetosi kirokseen. Uşakissa kerrotaan, että seitsemän Toptepen '
        + 'kaivauksiin osallistunutta miestä kuoli väkivaltaisesti tai koki suuren '
        + 'onnettomuuden. Oikeus antoi entiselle johtajalle kolmetoista vuotta. Solki '
        + 'saatiin takaisin, ja aarretta vartioidaan tarkemmin kuin ennen.',
      lahde: 'en-Wikipedia "Karun Treasure". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miten New Yorkin Metropolitan-museon ja Turkin kiista '
          + 'Karun-aarteesta päättyi 1993?',
        vaihtoehdot: [
          'Museo osti aarteen Turkilta virallisesti',
          'Museo myönsi tienneensä esineet varastetuiksi ja palautti ne',
          'Aarre jaettiin puoliksi museoiden kesken',
        ],
        oikea: 1,
      },
    },
  ],
  UKR: [
    /*
     * Herson, Potemkinin perustama kaupunki Dneprin varrella.
     * Lähde: en-Wikipedia: Potemkin village
     */
    {
      id: 'potemkinin-kulissikylat',
      otsikko: 'Potemkinin kulissikylät — huijaus, joka olikin liioittelua',
      nimio: 'Kulissikylät',
      vuosi: '1787',
      paikka: 'Herson, Potemkinin perustama kaupunki Dneprin varrella',
      lat: 46.6354, lon: 32.6169,
      kortti: 'Maailman kuuluisin lavastehuijaus on sekin osittain lavaste: '
        + 'kulissikylistä kertoi innokkaimmin diplomaatti, joka ei ollut '
        + 'matkalla mukana. Potemkin toki maalautti ja koristeli minkä ehti, '
        + 'mutta teki sen kaikkien nähden. Sana jäi silti elämään — julkisivuja '
        + 'rakennetaan yhä, ja harvoin näin rehellisesti.',
      teksti: 'Vuonna 1787 Katariina II matkusti puoli vuotta hovinsa ja useiden '
        + 'ulkomaisten lähettiläiden kanssa alueilla, jotka oli neljä vuotta aiemmin '
        + 'otettu osmaneilta. Matkan tarkoitus oli tehdä vaikutus Venäjän '
        + 'liittolaisiin ennen uutta sotaa. Sotamarsalkka Grigori Potjomkin, '
        + 'keisarinnan ministeri ja entinen rakastaja, oli nimitetty alueen '
        + 'kuvernööriksi Krimin liittämisen jälkeen 1783. Sota oli jättänyt seudun '
        + 'raunioiksi, ja hänen tehtävänään oli rauhoittaa ja rakentaa se uudelleen '
        + 'venäläisillä uudisasukkailla.'
        + '\n\nMatkasta jäi elämään kertomus, jonka mukaan Potjomkin oli rakennuttanut '
        + 'Dneprin rannoille siirrettäviä kyliä, täyttänyt ne talonpojiksi puetuilla '
        + 'omilla miehillään keisarinnan proomun ohittaessa, purkanut kulissit ja '
        + 'pystyttänyt ne yön aikana uudelleen matkan varrelle.'
        + '\n\nSanonnan keksi Georg von Helbig, saksilainen diplomaatti Venäjän '
        + 'hovissa. Hän ei ollut matkalla mukana vaan kokosi kertomuksen siitä, mitä '
        + 'Pietarissa puhuttiin. Hän julkaisi sen nimettömänä hampurilaisessa '
        + 'aikakauslehdessä 1797–1799 ja laajensi kirjaksi 1809.'
        + '\n\nAlkuperäisiä kirjeitä ja muistelmia lukeneet tutkijat — muun muassa '
        + 'Panchenko ja Potjomkinin elämäkerturi Sebag Montefiore — pitävät kertomusta '
        + 'myyttinä ja osana kampanjaa Potjomkinin mustaamiseksi. Potjomkin todella '
        + 'somisti reitin varren kyliä. Hän ei vain koskaan väittänyt muuta. Sanonta '
        + 'jäi silti kieleen, ja se tarkoittaa nyt mitä tahansa julkisivua, jonka '
        + 'taakse kätketään ikävä tilanne.',
      lahde: 'en-Wikipedia "Potemkin village". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mitä nykyhistorioitsijat sanovat Potemkinin kulissikylistä?',
        vaihtoehdot: [
          'Siirrettäviä kyliä löydettiin kaivauksissa 1950-luvulla',
          'Tarina on suurelta osin liioittelua — Potemkin somisti kyliä '
            + 'salailematta',
          'Katariina II keksi tarinan itse',
        ],
        oikea: 1,
      },
    },
    /*
     * Odessa, Rouhomovskin verstaan muistolaatta.
     * Lähde: en-Wikipedia: Tiara of Saitaferne
     */
    {
      id: 'saitafernesin-tiaara',
      otsikko: 'Saitafernesin tiaara — odessalainen kultaseppä huijasi Louvrea',
      nimio: 'Tiaarahuijaus',
      vuosi: '1896, tunnustus 1903',
      paikka: 'Odessa, Rouhomovskin verstaan muistolaatta',
      lat: 46.4825, lon: 30.7233,
      kortti: 'Louvren asiantuntijat tunnistivat muinaisen mestariteoksen; he eivät '
        + 'vain arvanneet, että mestari asui Odessassa ja oli tavattavissa. Kun '
        + 'Rouhomovski tuli Pariisiin tunnustamaan, museo ei suostunut uskomaan '
        + 'ennen kuin hän takoi uuden palan tiaaraa siinä paikassa. Harvinainen '
        + 'huijaus, jossa ainoa täysin rehellinen osapuoli oli väärennöksen '
        + 'tekijä.',
      teksti: 'Ensimmäisenä huhtikuuta 1896 Louvre ilmoitti ostaneensa '
        + 'skyyttalaiskuninkaan kultatiaaran 200 000 frangilla. Kreikankielinen '
        + 'kaiverrus kiersi sen ympäri: Olbian neuvosto ja kansalaiset kunnioittavat '
        + 'suurta ja voittamatonta kuningas Saitafernesta. Se sopi tunnettuun '
        + 'tapaukseen, jossa kaupunki oli ostanut piirittäjän pois lahjoilla.'
        + '\n\nVastaväitteet alkoivat heti. Saksalainen arkeologi Adolf Furtwängler '
        + 'luetteli tyylivirheet ja kysyi, miksi muinaisessa esineessä ei näy kulumaa. '
        + 'Louvre puolusti hankintaansa vuosia ja valmisteli siitä komeaa julkaisua.'
        + '\n\nTiaara oli tehty Odessassa 1894. Sen teki kultaseppä Israel Rouhomovski '
        + 'kahden kauppiaan, Hochmannin veljesten, tilauksesta; he sanoivat sen olevan '
        + 'lahja arkeologiystävälle ja antoivat mallia varten tietoja tuoreista '
        + 'kaivauksista. Rouhomovski kuuli teoksensa kohtalosta vasta, kun skandaali '
        + 'kantautui kaupunkiin.'
        + '\n\nHän matkusti Pariisiin 1903 ja ilmoitti tehneensä tiaaran. '
        + 'Asiantuntijat eivät uskoneet ennen kuin hän istui alas ja takoi heidän '
        + 'silmiensä alla uuden palan kruunua. Louvre siirsi esineen varastoon. '
        + 'Rouhomovski sai kultamitalin Pariisin koristetaiteen salongissa ja asui '
        + 'kaupungissa kuolemaansa 1934 asti. Vuonna 1954 Louvre pani tiaaran taas '
        + 'esille — väärennösten näyttelyyn. Sen jälkeen esine on kiertänyt lainassa: '
        + 'Jerusalemin Israel-museossa 1997 Rouhomovskin omassa näyttelyssä ja '
        + 'Hernessä 2018 arkeologian erehdyksiä ja väärennöksiä esittelevän näyttelyn '
        + 'avajaisviikoilla. Kopio on esillä British Museumissa, ja 2014 kultasepän '
        + 'odessalaisen verstaan seinään kiinnitettiin muistolaatta.',
      lahde: 'en-Wikipedia "Tiara of Saitaferne". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Miten kultaseppä Rouhomovski todisti Louvrelle tehneensä '
          + '\'muinaisen\' tiaaran?',
        vaihtoehdot: [
          'Hän esitti tilauskuitin kauppiailta',
          'Hänen nimikirjaimensa löytyivät tiaaran sisältä',
          'Hän valmisti palan tiaaraa museon silmien alla',
        ],
        oikea: 2,
      },
    },
    /*
     * Velykyi Burluk, Harkovan alue (väitetty löytöpaikka).
     * Lähde: en-Wikipedia: Book of Veles
     */
    {
      id: 'velesin-kirja',
      otsikko: 'Velesin kirja — \'muinaisslaavilainen\' väärennös puulaudoilla',
      nimio: 'Velesin kirja',
      vuosi: 'väitetty löytö 1919, julkaisu 1957–1959',
      paikka: 'Velykyi Burluk, Harkovan alue (väitetty löytöpaikka)',
      lat: 50.0619, lon: 37.3907,
      kortti: 'Todistusketju on vaikuttava: laudat, jotka vain yksi mies näki, '
        + 'kopiot, jotka vain yksi mies teki, ja alkuperäiset, jotka katosivat '
        + 'sopivasti sodan jalkoihin. Kieli paljasti loput — muinaisteksti oli '
        + 'kirjoitettu kieliopilla, jota ei ole ollut millään vuosisadalla. '
        + 'Väärennös ei silti kuollut faktoihin; hyvä tarina harvoin kuolee.',
      teksti: 'Löytökertomus kuuluu näin: vuonna 1919 valkoisen armeijan luutnantti '
        + 'Fedor Izenbek löysi ryöstetystä Kurakinien kartanosta Harkovan lähellä '
        + 'nipun puulautoja, joissa oli outoa kirjoitusta. Vuonna 1923 hän yritti '
        + 'myydä ne Belgradin kirjastolle ja museolle, asettui 1925 Brysseliin ja '
        + 'antoi ne siellä Juri Miroljubovin tutkittaviksi.'
        + '\n\nIzenbek ei päästänyt lautoja talosta ulos eikä suostunut luovuttamaan '
        + 'niitä brysseliläisprofessorille tutkimusta varten. Miroljubov kopioi ja '
        + 'käänsi tekstiä viisitoista vuotta; valokuvat, hän kertoi, eivät '
        + 'onnistuneet. Elokuussa 1941 Saksa miehitti Brysselin, Izenbek kuoli ja '
        + 'laudat katosivat.'
        + '\n\nMiroljubov vei jäljennöksensä Yhdysvaltoihin ja luovutti ne 1953 '
        + 'professori A. A. Kurenkoville, joka julkaisi tekstin siirtolaislehti '
        + 'Zhar-Ptitsassa maaliskuun 1957 ja toukokuun 1959 välillä. Teksti väittää '
        + 'kertovan slaavien vaiheet 600-luvulta eaa. 800-luvulle jaa.'
        + '\n\nKielentutkijat torjuivat sen: kieli on sekoitus nykyslaavilaisia '
        + 'kieliä, keksittyjä muotoja ja johdonmukaisuudetonta kielioppia, vanhennettu '
        + 'jonkun käsissä, joka tunsi muinaisslaavia pinnallisesti. Filologi '
        + 'Tvorogovin sanoin kyseessä on keinotekoinen kieli, jonka on keksinyt '
        + 'ihminen, joka ei olisi osannut rakentaa omaa kielijärjestelmää. Se ei silti '
        + 'kuollut: vuonna 1999 kirja otettiin Ukrainassa lukion opetusohjelmaan '
        + 'aitona teoksena, ja siellä se oli yhä 2008.',
      lahde: 'en-Wikipedia "Book of Veles". Tarkistettu 2.9.2026.',
      visa: {
        kysymys: 'Mikä paljastaa tutkijoiden mukaan Velesin kirjan väärennökseksi?',
        vaihtoehdot: [
          'Kieli on sekoitus nykyslaavilaisia kieliä ilman kunnollista '
            + 'kielioppia',
          'Puulautojen hiilikoe ajoitti ne 1900-luvulle',
          'Tekijä tunnusti kuolinvuoteellaan',
        ],
        oikea: 0,
      },
    },
  ],
};
