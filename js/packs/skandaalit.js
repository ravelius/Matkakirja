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
 *            Neljäs posti (19:43 EEST) toi kuvat 32–40: kahdeksan
 *            skandaalia Britanniasta, Kreikasta ja Kroatiasta
 *            (piltdownin-ihminen, etelameren-kupla, poyaisin-huijaus,
 *            elginin-marmorit, simonides-kasikirjoitusvaarentaja,
 *            belokas-maratonhuijaus-1896, rijecka-krpica-1868 ja
 *            pacta-conventa-vaarennosepaily, jonka kuvatiedosto on
 *            `skandaali-pacta-conventa-photo-v1.jpg`) saivat kukin
 *            yhden alkion `kuvat`-listan samalla kaavalla; erän
 *            yhdeksäs kuva vrain-lucas odottaa yhä hyväksyntää.
 *            Skandaalisarjasta on nyt kuvitettu 39 / 83.
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
const SKANDAALI_KUVAJUURI = 'https://media.matkakirja.app/kohtaamiset/kuvajono/';

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
          /*
           * Fablen muotoilu 4.9.2026 (omistaja: "Muotoile itse"): kuvaputken
           * teksti sanoi "Valkoisen takin alla kulkee Mona Lisa", mutta
           * kortin oma teksti (korjaus 2.9.2026) kertoo, ettei taulu
           * mahtunut työtakin alle — Peruggia kantoi sen käärittynä.
           */
          selite: 'Huoltomies avaa juuttuneen oven Vincenzo Peruggialle ja '
            + 'luulee auttavansa työtoveria. Valkoisen työtakin ja käärön '
            + 'suojissa kulkee Mona Lisa — pieni puupaneeli, joka katoaa yli '
            + 'kahdeksi vuodeksi ja palaa Louvreen paljon kuuluisampana kuin '
            + 'lähti.',
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
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-piltdownin-ihminen-photo-v1.jpg`,
          selite: 'Sorakuopan poika jää katsomaan leuan liian tasaisia '
            + 'hampaita, mutta Arthur Smith Woodward näkee löydössä juuri sen '
            + 'puuttuvan renkaan, jota tiede odotti. Ihmisen kallon ja '
            + 'orangin leuan liitto pysyy oppikirjoissa neljä vuosikymmentä; '
            + 'vasta uudet testit tekevät nuoren epäluulosta oikeutetun.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Natural History Museum — '
            + 'Piltdown-arkisto ja vuoden 2016 esinetutkimus; Dawsonin ja '
            + 'Woodwardin kaivaukset, punaruskeaksi värjätyt luut, orangin '
            + 'leuka ja viilatut hampaat ovat dokumentoituja, nuori seuloja, '
            + 'hänen epäilynsä ja kuvattu löytöhetki dramatisoituja.',
          url: 'https://www.nhm.ac.uk/discover/news/2016/august/piltdown-man-charles-dawson-likely-fraudster.html',
        },
      ],
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
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-etelameren-kupla-photo-v1.jpg`,
          selite: 'Tytär ei katso osakepaperia vaan äitinsä kasvoja, kun '
            + 'virkailijan lähes tyhjä kolikkolaatikko kertoo hinnan '
            + 'romahduksesta. South Sea Company myi valtionvelasta ja '
            + 'siirtomaakaupasta vaurauden lupauksen; tässä pöydässä kupla '
            + 'merkitsee kuitenkin vain sitä, ettei perheen turva ollutkaan '
            + 'rahaa.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Bank of England — history '
            + 'sekä London Museumin vuoden 1720 osaketodistus ja varhaisten '
            + 'naissijoittajien tutkimus; yhtiön valtionvelkajärjestely, '
            + 'Espanjan siirtomaihin ja orjakauppaan sidottu kauppalupaus '
            + 'sekä vuoden 1720 nousu ja romahdus ovat dokumentoituja, äiti, '
            + 'tytär, virkailija ja Exchange Alley -hetki dramatisoituja.',
          url: 'https://www.bankofengland.co.uk/about/history',
        },
      ],
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
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-poyaisin-huijaus-photo-v1.jpg`,
          selite: 'Poika on jo antanut leikkilaivalleen Poyaisin nimen; hänen '
            + 'äitinsä on vaihtanut perheen säästöt MacGregorin seteleihin, '
            + 'ja isoisä ehtii epäillä karttaa vasta lähtölaiturilla. '
            + 'Kennersley Castle vei Leithistä lähes 200 siirtolaista kohti '
            + 'luvattua pääkaupunkia — perillä odotti rakentamaton viidakko, '
            + 'jossa yli puolet heistä kuoli.',
          lahde: 'Matkakirjan havainnekuva. Faktat: National Library of '
            + 'Scotland — Poyais-asiakirjat sekä British Museumin vuoden 1823 '
            + 'obligaatio ja MacGregorin järjestelyn tutkimus; Kennersley '
            + 'Castlen lähtö Leithistä, lähes 200 siirtolaista, Poyaisin '
            + 'paperiraha, maakirjat ja perillä odottanut rakentamaton '
            + 'rannikko ovat dokumentoituja, perhe, leikkilaiva ja isoisän '
            + 'epäilyn hetki dramatisoituja.',
          url: 'https://manuscripts.nls.uk/repositories/2/resources/20064',
        },
      ],
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
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-elginin-marmorit-photo-v1.jpg`,
          selite: 'Nuori kivimies tuntee friisin painon käsissään ennen kuin '
            + 'ymmärtää, että pala saattaa lähteä temppelistä pysyvästi. '
            + 'Elginin asiamiehet veivät 1801–1805 noin puolet Parthenonissa '
            + 'säilyneistä veistoksista; luvan laajuudesta ja omistuksen '
            + 'oikeutuksesta kiistellään yhä Ateenan ja Lontoon välillä.',
          lahde: 'Matkakirjan havainnekuva. Faktat: British Museum — '
            + 'Parthenon-veistosten kiista ja Akropolis-museon '
            + 'tapahtumakuvaus; Giovanni Battista Lusierin johtama '
            + 'irrotustyö, Osmanien hallinto ja noin puolet säilyneistä '
            + 'veistoksista käsittänyt siirto ovat dokumentoituja, nuori '
            + 'kivimies, irtoava siru ja kuvattu sekunti dramatisoituja. '
            + 'Lähteet tulkitsevat luvan laajuutta eri tavoin.',
          url: 'https://www.britishmuseum.org/about-us/british-museum-story/contested-objects-collection/parthenon-sculptures',
        },
      ],
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
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-simonides-kasikirjoitusvaarentaja-photo-v1.jpg`,
          selite: 'Oppipojan sormeen tarttuu märkä muste tekstistä, jonka '
            + 'Simonides aikoo myydä vuosisatoja vanhana. Symin saarelta '
            + 'lähtenyt mestarikalligrafi teki kadonneista teoksista '
            + 'uskottavia ”löytöjä”, keksi munkin todistajakseen ja päätyi '
            + 'lopulta väittämään myös aidon Codex Sinaiticuksen omaksi '
            + 'nuoruudentyökseen.',
          lahde: 'Matkakirjan havainnekuva. Faktat: British Library — '
            + 'Simonides-paperit ja National Archivesin henkilötietue; '
            + 'Simonideen paleografinen taito, väärennetyt papyrukset, '
            + 'Aiskhyloksen Persialaiset-käärö ja hänen keksimänsä '
            + 'Kallinikos-munkki ovat dokumentoituja, Symin työpaja, '
            + 'oppipoika, märkä muste ja paljastumisen hetki dramatisoituja.',
          url: 'https://searcharchives.bl.uk/catalog/040-002003075',
        },
      ],
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
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-belokas-maratonhuijaus-1896-photo-v1.jpg`,
          selite: 'Gyula Kellner näkee uupuneen Spyridon Belokasin '
            + 'laskeutuvan kärryistä kesken olympiamaratonin. Tienvarren '
            + 'nuori vedenkantaja ymmärtää asian heidän kasvoistaan jo ennen '
            + 'tuomareita: Kellnerin vastalause hyväksytään, Belokas '
            + 'tunnustaa kyydin ja yhden illan kestänyt kreikkalainen '
            + 'kolmoisvoitto katoaa tulosluettelosta.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Hellenic Olympic '
            + 'Committee — Spyridon Louis ja Olympic World Libraryn '
            + 'aineistot; Belokasin kärrykyyti, Kellnerin vastalause ja '
            + 'hylkäys ovat dokumentoituja, laskeutumisen tarkka paikka, '
            + 'katsekontakti ja nuori vedenkantaja dramatisoituja.',
          url: 'https://www.hoc.gr/en/athletes/louis-spyridon/',
        },
      ],
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
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-rijecka-krpica-1868-photo-v1.jpg`,
          selite: 'Nuori kansliakirjuri pitää korvaavaa paperiliuskaa vielä '
            + 'ilmassa: vanha 66. artikla näkyy sen alla, mutta huoneen '
            + 'vanhemmat miehet odottavat liimaa. Jo vahvistetun '
            + 'kroaatinkielisen sovintotekstin päälle lisätty ”Rijekan lappu” '
            + 'teki kaupungista, satamasta ja piiristä Unkarin kruunuun '
            + 'erikseen liitetyn alueen — eikä Kroatian parlamentti saanut '
            + 'muutoksesta uutta keskustelua.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Kroatian valtionarkisto — '
            + 'Rijekan lappu sekä Kroatian ensyklopedia ja '
            + 'oikeushistoriallinen tutkimus; säilyneen asiakirjan päälle '
            + 'liimattu korvaava 66. artikla on dokumentoitu, nuori kirjuri, '
            + 'virkamiehet, lähettipoika ja kuvattu epäröinnin sekunti '
            + 'dramatisoituja.',
          url: 'https://www.arhiv.hr/LinkClick.aspx?fileticket=s5y7cNLJpv0%3D&mid=2227&portalid=0&tabid=156',
        },
      ],
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
      kuvat: [
        {
          osoite: `${SKANDAALI_KUVAJUURI}skandaali-pacta-conventa-photo-v1.jpg`,
          selite: 'Nuori trogirilainen kirjuri pysäyttää kynänsä, kun '
            + 'aatelinen painaa kahdentoista suvun luetteloa lähemmäs. Hän ei '
            + 'voi tietää, kopioiko vanhempaa sopimusta vai valmistaa '
            + 'todistetta tulevaisuuden valtakiistaan: säilynyt '
            + 'Qualiter-merkintä on vasta 1380-luvun käsikirjoituksessa, ja '
            + 'nykyinen tutkimus hylkää sen yleensä aitona vuoden 1102 '
            + 'asiakirjana.',
          lahde: 'Matkakirjan havainnekuva. Faktat: Hrvatska enciklopedija — '
            + 'Pacta conventa ja Kroatian historiallisen museon aineistot; '
            + 'Qualiterin 1300-luvun käsikirjoitus, kahdentoista suvun '
            + 'luettelo ja myöhempi poliittinen käyttö ovat lähdepohjaisia, '
            + 'Trogirin kirjoitushuone, henkilöt, painostus ja tekstin '
            + 'syntyhetki dramatisoituja. Kuva ei väitä ketään nimettyä '
            + 'henkilöä väärentäjäksi.',
          url: 'https://www.enciklopedija.hr/clanak/pacta-conventa',
        },
      ],
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
  /*
   * ── MAAILMAN ERÄ M1 6.9.2026 (ETELÄ-AMERIKKA) ────────────────────
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Skandaalitaulussa ei ollut ennen tätä erää yhtäkään Euroopan
   * ulkopuolista maata; erä M1 tuo viisi maata ja kymmenen skandaalia
   * (kiintiö 2 per maa). Kaikki ovat kuvattomia kuten erän muutkin
   * nostot, ja jokainen väite on `lahde`-rivin en-Wikipedia-artikkelin
   * katteessa (tarkistettu 6.9.2026).
   *
   * PAIKAT OVAT KAUKANA PELIKAUPUNGEISTA. Etelä-Amerikan kaupungeista
   * vain Buenos Airesilla ja Rio de Janeirolla on kaupunkikartta
   * (js/packs/maakartat.js), joten kohdekaupungin kohdalle osuva
   * skandaali jäisi muualla kokonaan ilman karttapaikkaa
   * (tools/tarkista-nostopaikat.mjs). Siksi jokainen kymmenestä on
   * mitattu jokaista CITIES-kaupunkia vasten: lähin on Santiagon taistelu
   * 26,1 lautayksikön päässä Valparaísosta, ja raja
   * KAUPUNGIN_KOHDALLA_SADE on 7. Juuri tästä syystä Argentiinan
   * corralito ja Kolumbian Proceso 8000 jäivät pois — edellinen on
   * Buenos Airesin ytimessä, jälkimmäinen Bogotán.
   *
   * HERKÄT AIHEET. Kolme kymmenestä koskee diktatuuria ja yksi
   * huumekauppaa. Ne on kirjoitettu asiallisesti ja tiukasti lähteen
   * katteessa: mitä tapahtui, kuka teki, mitä siitä seurasi — ei
   * kuvailua eikä väitteitä, joita artikkeli ei sano.
   */
  ARG: [
    /*
     * Estadio Gigante de Arroyito, Rosario (B-lohkon ratkaisuottelu).
     * Lähde: en.wikipedia.org: Argentina v Peru (1978 FIFA World Cup)
     */
    {
      id: 'rosario-1978',
      otsikko: 'Argentiina–Peru 6–0 — ottelu, jota yhä epäillään',
      nimio: 'Rosario 1978',
      vuosi: '1978',
      paikka: 'Estadio Gigante de Arroyito, Rosario',
      lat: -32.8833, lon: -60.6667,
      kortti: 'Isäntämaa tarvitsi finaalipaikkaan neljän maalin voiton ja sai '
        + 'kuusi. Ottelu pelattiin sotilasjuntan Argentiinassa, ja epäilyt '
        + 'sopimuksesta ovat eläneet siitä asti. Yksikään versio ei ole saanut '
        + 'laajaa hyväksyntää, mutta kertomuksia riittää — pukukoppivierailusta '
        + 'vehnälastiin.',
      teksti: 'Vuoden 1978 MM-kisojen toisen lohkovaiheen ratkaisuottelu pelattiin '
        + 'Rosariossa 21. kesäkuuta. Argentiinan oli voitettava Peru vähintään '
        + 'neljällä maalilla ohittaakseen Brasilian maalierolla. Brasilia oli '
        + 'pyytänyt, että sen ottelu Puolaa vastaan pelattaisiin samaan aikaan, '
        + 'mutta Fifa hylkäsi pyynnön televisioinnin vuoksi — niinpä Brasilia '
        + 'pelasi ensin ja voitti 3–1, ja Argentiina tiesi ottelun alkaessa '
        + 'tarkalleen, mitä siltä vaadittiin.'
        + '\n\nMinuutteja ennen alkua presidentti Jorge Rafael Videla kävi Perun '
        + 'pukukopissa entisen Yhdysvaltain ulkoministerin Henry Kissingerin '
        + 'kanssa ja luki pelaajille Perun diktaattorin Francisco Morales '
        + 'Bermúdezin viestin maiden veljeydestä. Argentiina voitti 6–0: kaksi '
        + 'maalia Mario Kempes, kaksi Leopoldo Luque, yksi Alberto Tarantini ja '
        + 'yksi René Houseman.'
        + '\n\nEpäilykset heräsivät myöhemmin. Kymmenen päivää kisojen jälkeen '
        + 'Argentiina myönsi Perulle poikkeuksellisen takaisinmaksuttoman luoton. '
        + 'Historioitsija David Yallopin mukaan amiraali Carlos Alberto Lacoste '
        + 'tarjosi perulaisille lahjuksen ja 35 000 tonnia viljaa. '
        + 'Valtiovarainministeri Juan Alemann kertoi, että hänen kotiinsa '
        + 'sijoitettu pommi räjähti juuri sillä hetkellä, kun Argentiina teki '
        + 'neljännen maalinsa.'
        + '\n\nMonet ottelun pelaajista kiistävät kaiken. Héctor Chumpitaz, Jaime '
        + 'Duarte, César Cueto ja Teófilo Cubillas ovat sanoneet, ettei todisteita '
        + 'ole ja että Peru oli väsynyt kolmen päivän välein pelatuista otteluista. '
        + 'Yksi asia muuttui pysyvästi: seuraavista kisoista alkaen lohkojen '
        + 'ratkaisuottelut on pelattu samanaikaisesti.',
      lahde: 'en-Wikipedia "Argentina v Peru (1978 FIFA World Cup)". Tarkistettu '
        + '6.9.2026.',
      visa: {
        kysymys: 'Miksi Argentiina tiesi ottelun alkaessa tarvitsevansa neljä maalia?',
        vaihtoehdot: [
          'Brasilian ottelu oli pelattu jo aiemmin samana päivänä',
          'Fifa oli ilmoittanut maalirajan ennen kisoja',
          'Perun liitto oli luvannut päästää neljä maalia',
        ],
        oikea: 0,
      },
    },
    /*
     * San Carlos de Bariloche (Priebken asuinkaupunki 1948–1996).
     * Lähde: en.wikipedia.org: Erich Priebke
     */
    {
      id: 'priebke-bariloche',
      otsikko: 'Barilochen koulunjohtaja — 46 vuotta vapaana',
      nimio: 'Bariloche 1994',
      vuosi: '1948–1996',
      paikka: 'San Carlos de Bariloche, Río Negro',
      lat: -41.1333, lon: -71.3,
      kortti: 'Andien lomakaupungissa asui saksalainen herkkukauppias, joka johti '
        + 'kulttuuriyhdistystä ja työskenteli koululla. Hän oli asunut siellä lähes '
        + 'viisikymmentä vuotta. Vuonna 1994 amerikkalainen tv-ryhmä odotti häntä '
        + 'koulun ulkopuolella ja kysyi Rooman joukkomurhasta — ja hän vastasi '
        + 'auton ikkunasta, avoimesti.',
      teksti: 'Erich Priebke oli SS:n turvallisuuspoliisin upseeri, joka johti '
        + 'yksikköä Ardeatinan luolien joukkomurhassa Roomassa 24. maaliskuuta 1944. '
        + 'Siinä surmattiin 335 italialaista siviiliä kostoksi partisaani-iskusta, '
        + 'jossa oli kuollut 33 saksalaista poliisia. Priebke laati teloituslistat. '
        + 'Sodan jälkeen hän pakeni 1946 brittien vankileiriltä Riministä ja päätyi '
        + 'lopulta Argentiinaan.'
        + '\n\nBarilochessa hän eli vapaana miehenä 46 vuotta. Aluksi hän oli '
        + 'tiskaaja ja tarjoilija, sitten oman herkkukaupan pitäjä, ja hänestä tuli '
        + 'saksalais-argentiinalaisen kulttuuriyhdistyksen johtaja; matkat Eurooppaan '
        + 'sujuivat esteettä. Esteban Buchin kirja El pintor de la Suiza Argentina '
        + 'nimesi hänet 1991 osaksi kaupungissa 1950-luvulta asti asunutta '
        + 'natsipiiriä.'
        + '\n\nMaaliskuussa 1994 ABC Newsin tutkiva ryhmä jäljitti hänet kirjan '
        + 'perusteella ja kaivoi arkistoista Lontoosta hänen oman sodanjälkeisen '
        + 'tunnustuksensa. Toimittaja Sam Donaldson odotti häntä koulun ulkopuolella '
        + 'ja haastatteli hänet auton ikkunasta. Priebke myönsi, kuka oli, ja '
        + 'perusteli tekonsa käskyillä. Argentiinan viranomaiset pidättivät hänet '
        + '10. toukokuuta 1994.'
        + '\n\nLuovutus kesti. Puolustus vaati kaikkien italialaisten asiakirjojen '
        + 'kääntämistä espanjaksi ja vetosi murhan viidentoista vuoden '
        + 'vanhentumisaikaan; Italian sotilassyyttäjä muistutti, etteivät rikokset '
        + 'ihmisyyttä vastaan vanhene. Argentiinan korkein oikeus määräsi luovutuksen '
        + '1996. Italiassa Priebke tuomittiin lopulta elinkautiseen 1998, ja korkean '
        + 'ikänsä vuoksi hän istui tuomionsa kotiarestissa kuolemaansa 2013 asti.',
      lahde: 'en-Wikipedia "Erich Priebke". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä paljasti Priebken menneisyyden maailmalle 1994?',
        vaihtoehdot: [
          'Italian poliisin salainen operaatio',
          'Amerikkalaisen tv-ryhmän tutkimustyö ja katuhaastattelu',
          'Hänen oma kirjeensä Vatikaanille',
        ],
        oikea: 1,
      },
    },
  ],
  BOL: [
    /*
     * Cochabamban keskusaukio (mielenosoitusten paikka).
     * Lähde: en.wikipedia.org: Cochabamba Water War
     */
    {
      id: 'cochabamban-vesisota',
      otsikko: 'Cochabamban vesisota — kaupunki, joka osti vetensä takaisin',
      nimio: 'Vesisota 2000',
      vuosi: '1999–2000',
      paikka: 'Cochabamban keskusaukio, Bolivia',
      lat: -17.3935, lon: -66.157,
      kortti: 'Kaupungin vesilaitos myytiin yhdelle tarjoajalle, ja laskut nousivat '
        + 'kolmanneksella. Uusi laki näytti antavan yhtiölle oikeuden kaikkiin '
        + 'vesivaroihin, myös yhteisöjen omiin kaivoihin. Neljässä kuukaudessa '
        + 'Cochabamba sulki katunsa, ja sopimus purettiin.',
      teksti: 'Maailmanpankin ehdoilla Bolivia laittoi Cochabamban vesilaitoksen '
        + 'SEMAPAn myyntiin. Tarjouksen teki vain yksi taho: Aguas del Tunari, jossa '
        + 'olivat mukana brittiläinen International Waters, Bechtelin tytäryhtiö, '
        + 'United Utilities ja espanjalainen Abengoa sekä neljä bolivialaisyhtiötä. '
        + 'Presidentti Hugo Banzerin hallitus hyväksyi 2,5 miljardin dollarin ja '
        + 'neljänkymmenen vuoden sopimuksen, jossa yhtiölle taattiin vähintään '
        + 'viidentoista prosentin vuosituotto.'
        + '\n\nSopimuksen ehtona oli rahoittaa Misicunin pato, jota Maailmanpankki '
        + 'oli pitänyt kannattamattomana mutta jota pormestari Manfred Reyes Villa '
        + 'ajoi. Vettä ottaessaan yhtiö korotti maksuja keskimäärin 35 prosenttia, '
        + 'noin kahteenkymmeneen dollariin kuukaudessa. Moni asiakas ansaitsi sata '
        + 'dollaria kuussa, joten vesilasku ylitti ruokamenot.'
        + '\n\nLaki 2029 näytti antavan yhtiölle monopolin kaikkiin vesivaroihin — '
        + 'myös yhteisöjen itse rakentamiin järjestelmiin, joita ei ollut koskaan '
        + 'liitetty SEMAPAan. Vastarinnan kokosi La Coordinadora, kastelijoiden '
        + 'liiton, ammattiyhdistysten ja ympäristöväen yhteenliittymä, jonka '
        + 'näkyvimmät hahmot olivat Omar Fernández ja Óscar Olivera.'
        + '\n\nBanzer julisti 8. huhtikuuta 2000 piiritystilan. Kun kapteeni Robinson '
        + 'Iriarte ampui väkijoukkoon ja lukiolainen Víctor Hugo Daza kuoli, viha '
        + 'leimahti; yhtiön johto pakeni Santa Cruziin. Hallitus julisti sopimuksen '
        + 'rauenneeksi, laki muutettiin 11. huhtikuuta, ja yhtiön 40 miljoonan '
        + 'dollarin korvausvaatimus raukesi sovintoon 2006.',
      lahde: 'en-Wikipedia "Cochabamba Water War". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä sytytti Cochabamban vesisodan?',
        vaihtoehdot: [
          'Pitkä kuivuus tyhjensi kaupungin altaat',
          'Kaivosyhtiö saastutti kaupungin juomaveden',
          'Vesilaitoksen yksityistäminen ja maksujen jyrkkä nousu',
        ],
        oikea: 2,
      },
    },
    /*
     * Plaza Murillo, La Paz (hallituksen ydin).
     * Lähde: en.wikipedia.org: Luis García Meza
     */
    {
      id: 'kokaiinivallankaappaus-1980',
      otsikko: 'Kokaiinivallankaappaus — kolmetoista kuukautta',
      nimio: 'Kokaiinikaappaus',
      vuosi: '1980–1981',
      paikka: 'Plaza Murillo, La Paz',
      lat: -16.4957, lon: -68.1336,
      kortti: 'Heinäkuussa 1980 kenraali otti Bolivian väkivaltaisella '
        + 'vallankaappauksella, jonka rahoitusta on epäilty huumekaupan lahjuksiksi. '
        + 'Valta kesti kolmetoista kuukautta ja maksoi arviolta tuhat ihmishenkeä. '
        + 'Lopulta jopa Washington piti etäisyyttä — ja se riitti kaatamaan '
        + 'hallinnon.',
      teksti: 'Luis García Meza Tejada oli uraupseeri, joka nousi kenraaliksi Hugo '
        + 'Banzerin diktatuurin aikana. Hän johti armeijan oikeistosiipeä, joka ei '
        + 'hyväksynyt paluuta siviilihallintoon: moni upseeri oli ollut mukana '
        + 'Banzerin ajassa eikä pitänyt siitä, että uusi kongressi tutki talous- ja '
        + 'ihmisoikeusrikkomuksia.'
        + '\n\nMonella heistä oli väitteiden mukaan yhteydet kokaiinikauppiaisiin: '
        + 'osa armeijasta toimi näiden suojelijoina lahjuksia vastaan, ja lahjuksilla '
        + 'rahoitettiin tulevaa kaappausta. Käytännössä salakuljettajat ostivat '
        + 'itselleen Bolivian seuraavan hallituksen. Ryhmä painosti presidentti Lidia '
        + 'Gueileriä nimittämään García Mezan armeijan komentajaksi.'
        + '\n\nKaappaus tehtiin 17. heinäkuuta 1980. Sen yhteydessä surmattiin '
        + 'kansanedustaja ja presidenttiehdokas Marcelo Quiroga Santa Cruz, joka oli '
        + 'vaatinut Banzeria oikeuteen. Puolueet lakkautettiin, oppositiojohtajat '
        + 'karkotettiin, ammattiyhdistykset tukahdutettiin ja lehdistö vaiennettiin. '
        + 'Amerikkalainen tutkimuslaitos Council on Hemispheric Affairs nimesi '
        + 'hallinnon tammikuussa 1981 Latinalaisen Amerikan pahimmaksi '
        + 'ihmisoikeusrikkojaksi Guatemalan ja El Salvadorin jälkeen.'
        + '\n\nHuumekytkennät eristivät hallinnon kansainvälisesti, ja jopa Ronald '
        + 'Reaganin hallinto pysytteli etäällä. Paine pakotti García Mezan eroamaan '
        + '3. elokuuta 1981. Hänet tuomittiin poissaolevana, luovutettiin Brasiliasta '
        + '1995 ja istui kolmenkymmenen vuoden tuomiotaan La Pazin San Pedron '
        + 'vankilassa — samassa, johon hän oli aikanaan sulkenut vastustajansa. Hän '
        + 'kuoli 2018.',
      lahde: 'en-Wikipedia "Luis García Meza". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi vuoden 1980 kaappausta kutsutaan kokaiinivallankaappaukseksi?',
        vaihtoehdot: [
          'Sen rahoitusta on epäilty huumekaupan lahjuksiksi',
          'Kaappaajat takavarikoivat maan kokaiinivarastot',
          'Kaappaus tehtiin kokaiiniviljelmien lakon aikana',
        ],
        oikea: 0,
      },
    },
  ],
  BRA: [
    /*
     * Curitiban liittovaltion oikeustalo (tutkinnan päänäyttämö).
     * Lähde: en.wikipedia.org: Operation Car Wash
     */
    {
      id: 'lava-jato',
      otsikko: 'Lava Jato — autopesulasta kolmeen presidenttiin',
      nimio: 'Lava Jato',
      vuosi: '2014–2021',
      paikka: 'Liittovaltion oikeustalo, Curitiba',
      lat: -25.4284, lon: -49.2733,
      kortti: 'Tutkinta alkoi pienen autopesulan rahanpesusta ja päätyi '
        + 'valtionyhtiöiden korruptiovyyhtiin, jossa olivat mukana ministerit, '
        + 'kuvernöörit ja kolme entistä presidenttiä. Petrobrasin johtajat olivat '
        + 'ottaneet yhdestä viiteen prosenttia jokaisesta maksusta. Lopulta tutkinta '
        + 'kaatui omiin viesteihinsä.',
      teksti: 'Operação Lava Jato käynnistyi maaliskuussa 2014 Brasíliassa, kun '
        + 'pienen autopesulan rahaliikennettä alettiin tutkia. Syyttäjäryhmää johti '
        + 'Deltan Dallagnol ja tuomarina toimi Curitibassa Sergio Moro; myöhemmin '
        + 'muut syyttäjät ja tuomarit hoitivat oman alueensa jutut.'
        + '\n\nTutkijoiden mukaan valtionyhtiöiden poliittiset nimitykset kiristivät '
        + 'järjestelmällisesti lahjuksia yksityisiltä toimittajilta. Osa rahasta '
        + 'ohjattiin puolueille laittomaksi vaalirahoitukseksi, osa jäi omaan '
        + 'taskuun. Suurimmat summat löytyivät öljy-yhtiö Petrobrasista — siitä '
        + 'lempinimi Petrolão. Urakoitsijat, muun muassa Odebrecht ja OAS, '
        + 'muodostivat kartellin, joka jakoi valtion urakat keskenään; kartellin '
        + 'epäillään toimineen myös MM-kisojen stadionien, Angra 3 -ydinvoimalan ja '
        + 'Belo Monten padon hankkeissa.'
        + '\n\nSyytettyjä olivat liikemiehet, kansanedustajat, senaattorit, '
        + 'kuvernöörit ja ministerit. Yhtiöt ja yksityishenkilöt sitoutuivat '
        + 'maksamaan 25 miljardia realia sakkoja ja palautuksia. Entinen presidentti '
        + 'Luiz Inácio Lula da Silva vangittiin Curitibassa huhtikuussa 2018.'
        + '\n\nVuonna 2019 hakkeri Walter Delgatti Neto murtautui tutkijoiden '
        + 'Telegram-ryhmiin, ja The Intercept Brasil julkaisi viestit. Ne näyttivät '
        + 'osoittavan, että Moro oli antanut syyttäjille neuvoja ja tietoja ennen '
        + 'oikeudenkäyntiä. Moro ja Dallagnol kiistivät kaiken, mutta mielipide '
        + 'kääntyi: Lula vapautettiin marraskuussa 2019 korkeimman oikeuden '
        + 'päätöksellä, ja tutkintaryhmä lakkautettiin 1. helmikuuta 2021.',
      lahde: 'en-Wikipedia "Operation Car Wash". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä käänsi mielipiteen Lava Jato -tutkintaa vastaan?',
        vaihtoehdot: [
          'Petrobrasin ajautuminen konkurssiin',
          'Vuodetut viestit tuomarin ja syyttäjien välillä',
          'Todistajien katoaminen kesken oikeudenkäynnin',
        ],
        oikea: 1,
      },
    },
    /*
     * Córrego do Feijãon kaivos, Brumadinho, Minas Gerais.
     * Lähde: en.wikipedia.org: Brumadinho dam disaster
     */
    {
      id: 'brumadinhon-pato',
      otsikko: 'Brumadinho 2019 — mutavirta lounasaikaan',
      nimio: 'Brumadinho 2019',
      vuosi: '2019',
      paikka: 'Córrego do Feijãon kaivos, Brumadinho',
      lat: -20.1194, lon: -44.1197,
      kortti: 'Rikastushiekkapato murtui puoli yhden aikaan päivällä, ja mutavirta '
        + 'nieli kaivoksen oman ruokalan kesken lounaan. Kaksisataaseitsemänkymmentä '
        + 'ihmistä kuoli. Sama yhtiö oli menettänyt padon jo kolme vuotta aiemmin, '
        + 'eikä siitä määrätyistä sakoista ollut maksettu kuin murto-osa.',
      teksti: 'Córrego do Feijãon rautamalmikaivoksen pato Minas Geraisissa hajosi '
        + '25. tammikuuta 2019 kello 12.28. Pato oli rakennettu 1976, ja Vale S.A. '
        + 'oli ostanut sen 2001. Kansallisen kaivosviraston rekisterissä se oli '
        + 'luokiteltu pieneksi rakenteeksi, jonka riski oli matala.'
        + '\n\nRomahdus vapautti mutavirran, joka pyyhkäisi kaivoksen '
        + 'hallintorakennusten, ruokalan, asuintalojen, maatilojen, majatalojen ja '
        + 'teiden yli. Kuolleita oli 270: tammikuussa 2019 vahvistettiin 259 '
        + 'kuollutta ja yksitoista ilmoitettiin kadonneeksi, ja tammikuussa 2022 '
        + 'kuusi ihmistä oli yhä kateissa.'
        + '\n\nPato ei ollut ottanut vastaan rikastushiekkaa vuoden 2014 jälkeen, ja '
        + 'yhtiön mukaan sitä tarkastettiin maastossa kahden viikon välein. '
        + 'Joulukuussa 2018 Vale sai luvan käyttää padon jätettä uudelleen ja '
        + 'lopettaa toiminnan. Julkisuuteen tuli tieto, että yhtiö tiesi rakennetta '
        + 'valvovien antureiden ongelmista — mikä nosti kysymyksen siitä, oliko '
        + 'varoituksia sivuutettu.'
        + '\n\nOnnettomuudesta oli kolme vuotta ja kaksi kuukautta Marianan '
        + 'patoturmaan, jossa kuoli 19 ihmistä ja Bento Rodriguesin kylä tuhoutui ja '
        + 'jota pidetään Brasilian pahimpana ympäristökatastrofina. Sen mahdollisti '
        + 'lähteen mukaan maan heikko ja aukkoinen valvonta; kolme vuotta '
        + 'jälkeenpäin yhtiöt olivat maksaneet Marianasta määrätyistä 785 miljoonan '
        + 'realin sakoista vain 3,4 prosenttia.',
      lahde: 'en-Wikipedia "Brumadinho dam disaster". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä teki Brumadinhon padon murtumisesta erityisen tapauksen?',
        vaihtoehdot: [
          'Pato oli maailman suurin rikastushiekkapato',
          'Pato oli rakennettu vasta edellisenä vuonna',
          'Sama yhtiö oli menettänyt padon Marianassa kolme vuotta aiemmin',
        ],
        oikea: 2,
      },
    },
  ],
  CHL: [
    /*
     * Villa Baviera (entinen Colonia Dignidad), Parral, Maulen alue.
     * Lähde: en.wikipedia.org: Colonia Dignidad
     */
    {
      id: 'colonia-dignidad',
      otsikko: 'Colonia Dignidad — valtio valtiossa',
      nimio: 'Colonia Dignidad',
      vuosi: '1961–2005',
      paikka: 'Villa Baviera, Parral, Maulen alue',
      lat: -36.1, lon: -71.4,
      kortti: 'Saksalainen siirtokunta Chilen maaseudulla eli piikkilanka-aidan, '
        + 'vartiotornin ja valonheittimien takana. Sen perustaja oli paennut '
        + 'Saksasta lapsiin kohdistuvia syytteitä. Pinochetin salainen poliisi '
        + 'käytti aluetta vankien säilyttämiseen, ja osa yhteisön johdosta '
        + 'osallistui tekoihin itse.',
      teksti: 'Colonia Dignidad oli syrjäinen yhdyskunta Chilen Maulen alueella '
        + 'Parralin kunnassa, Perquilauquén-joen pohjoisrannalla noin 35 kilometriä '
        + 'kunnan keskustasta kaakkoon. Sen perusti 1961 saksalainen saarnaaja Paul '
        + 'Schäfer, jota vastaan oli Länsi-Saksassa nostettu syytteitä lasten '
        + 'hyväksikäytöstä. Yhteisö osti 3 062 hehtaarin tilan, ja alue kasvoi '
        + 'lopulta noin 13 700 hehtaariin; asukkaita oli enimmillään kolmisensataa.'
        + '\n\nUlospäin toiminta oli maataloutta, ja alueella oli eri aikoina koulu, '
        + 'sairaala, kaksi kiitorataa, ravintola ja voimalaitos. Sisäänpäin yhteisö '
        + 'oli suljettu: piikkilanka-aita, vartiotorni ja valonheittimet, ja '
        + 'myöhemmissä raporteissa kerrottiin salaisista asevarastoista. Osa '
        + 'ulkopuolisista kutsui yhteisöä kultiksi, osa harmittomiksi erakoiksi.'
        + '\n\nChilen totuus- ja sovintokomission raporttien mukaan osa Pinochetin '
        + 'salaisen poliisin DINA:n sieppaamista ihmisistä pidettiin vankeina '
        + 'siirtokunnassa. Useimpia kidutettiin, ja monet myös teloitettiin '
        + 'laittomasti. Chilen viranomaisten ja muiden tutkimukset paljastivat '
        + 'lisäksi vuosikymmenten mittaisen lasten seksuaalisen hyväksikäytön.'
        + '\n\nNimi muutettiin 1991 Villa Bavieraksi. Schäfer pakeni 1996 '
        + 'Argentiinaan välttääkseen Chilessä nostetut hyväksikäyttösyytteet, ja '
        + 'hänen lähdettyään ote asukkaista löystyi. Nykyään asukkaat saavat lähteä '
        + 'vapaasti ja alue on avoinna matkailijoille.',
      lahde: 'en-Wikipedia "Colonia Dignidad". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi Colonia Dignidad kuuluu Chilen diktatuurin historiaan?',
        vaihtoehdot: [
          'Salainen poliisi piti siellä sieppaamiaan vankeja',
          'Siirtokunta rahoitti oppositiota',
          'Se ylläpiti maan ainoaa vapaata radioasemaa',
        ],
        oikea: 0,
      },
    },
    /*
     * Estadio Nacional, Santiago (Chile–Italia, MM-kisojen B-lohko).
     * Lähde: en.wikipedia.org: Battle of Santiago (1962 FIFA World Cup)
     */
    {
      id: 'santiagon-taistelu-1962',
      otsikko: 'Santiagon taistelu — ottelu, jonka poliisi keskeytti neljästi',
      nimio: 'Santiago 1962',
      vuosi: '1962',
      paikka: 'Estadio Nacional, Santiago',
      lat: -33.4644, lon: -70.6106,
      kortti: 'Ottelua edelsi lehtisota: italialaiset toimittajat kuvasivat '
        + 'isäntäkaupungin kurjaksi, ja chileläiset lehdet vastasivat samalla '
        + 'mitalla. Kentällä ensimmäinen rike tuli 35 sekunnissa. Poliisin oli '
        + 'tultava väliin neljä kertaa, ja tuomari keksi myöhemmin varoituskortit.',
      teksti: 'Chile ja Italia kohtasivat MM-kisojen B-lohkossa Santiagossa 2. '
        + 'kesäkuuta 1962. Ottelusta tuli tunnettu Santiagon taisteluna: kaksi '
        + 'pelaajaa sai ulosajon, nyrkkejä heilui ja poliisin oli puututtava peliin '
        + 'neljästi. Erotuomarina oli englantilainen Ken Aston, joka myöhemmin keksi '
        + 'keltaisen ja punaisen kortin.'
        + '\n\nTunnelmaa oli nostatettu etukäteen. Italialaiset toimittajat Antonio '
        + 'Ghirelli ja Corrado Pizzinelli olivat kirjoittaneet, ettei Santiagon '
        + 'puhelimista ole mihinkään, että sähke Eurooppaan maksaa kohtuuttomasti ja '
        + 'että kaupunki on köyhä ja takapajuinen. Chileläiset lehdet vastasivat '
        + 'kutsumalla italialaisia fasisteiksi ja dopingin käyttäjiksi. Toimittajat '
        + 'joutuivat pakenemaan maasta, ja italialaiseksi luultu argentiinalainen '
        + 'kirjoittaja hakattiin santiagolaisessa baarissa sairaalakuntoon.'
        + '\n\nEnsimmäinen rike tuli 35 sekunnin kohdalla. Giorgio Ferrini ajettiin '
        + 'ulos kahdeksannella minuutilla eikä suostunut poistumaan, joten poliisit '
        + 'raahasivat hänet pois. Sekaannuksessa Leonel Sánchez mursi vasemmalla '
        + 'koukullaan Humberto Maschion nenän, mutta Aston ei nähnyt sitä. Kun Mario '
        + 'David myöhemmin yritti potkaista Sánchezia päähän, hänkin sai lähteä.'
        + '\n\nChile voitti 2–0 viimeisen vartin aikana: Jaime Ramírez puskumaalilla '
        + 'ja Jorge Toro matalalla kaukolaukauksella. Taustalla oli myös se, että '
        + 'kisajärjestelyt olivat kärsineet vuoden 1960 Valdivian maanjäristyksestä, '
        + 'ja italialaislehdet olivat kirjoittaneet kisojen antamisen Chilelle olleen '
        + 'puhdasta hulluutta.',
      lahde: 'en-Wikipedia "Battle of Santiago (1962 FIFA World Cup)". Tarkistettu '
        + '6.9.2026.',
      visa: {
        kysymys: 'Kuka tuomitsi Santiagon taistelun ja mitä hän myöhemmin keksi?',
        vaihtoehdot: [
          'Chileläinen tuomari, joka keksi lisäajan',
          'Englantilainen Ken Aston, joka keksi keltaisen ja punaisen kortin',
          'Italialainen tuomari, joka keksi videotarkistuksen',
        ],
        oikea: 1,
      },
    },
  ],
  COL: [
    /*
     * Barún saaren edusta, Cartagena (San Josén uppoamispaikka).
     * Lähde: en.wikipedia.org: Spanish galleon San José
     */
    {
      id: 'san-josen-galleoni',
      otsikko: 'San José — aarrelaiva, josta riitelee neljä osapuolta',
      nimio: 'San Josén aarre',
      vuosi: '1708',
      paikka: 'Barún saaren edusta, Cartagena',
      lat: 10.1, lon: -75.9,
      kortti: 'Kuudenkymmenenneljän tykin galleoni upposi taistelussa Cartagenan '
        + 'edustalla, ja mukana painui pohjaan lähes kuusisataa miestä. Ruumassa oli '
        + 'kultaa, hopeaa ja smaragdeja. Hylky löytyi 2015 kuudensadan metrin '
        + 'syvyydestä — ja siitä lähtien siitä on riidelty.',
      teksti: 'San José oli Espanjan laivaston 64-tykkinen galleoni, joka '
        + 'laskettiin vesille 1698 Baskimaassa. Se toimi hopealaivueen lippulaivana '
        + 'Espanjan perimyssodassa ja upposi taistelussa Barún saaren edustalla '
        + 'lähellä Cartagenaa 8. kesäkuuta 1708.'
        + '\n\nViimeisellä matkallaan laiva purjehti Panaman Portobelosta '
        + 'Cartagenaan kolmen sotalaivan ja neljäntoista kauppalaivan saattueessa. '
        + 'Ruumassa oli Perun varakuninkaanmaista kerättyä kultaa, hopeaa ja '
        + 'smaragdeja, muun muassa Potosín kaivoksista nykyisen Bolivian alueelta. '
        + 'Kun saattue kohtasi brittilaivueen, San Josén ruutivarastot räjähtivät, ja '
        + 'lähes kaikki noin kuusisataa miestä kuoli. Hylky on siksi yhtä aikaa '
        + 'vedenalainen kulttuuriperintökohde ja sotahauta.'
        + '\n\nHylky paikannettiin marraskuussa 2015 kuudensadan metrin syvyydestä. '
        + 'Lastin arvoksi on arvioitu noin 17 miljardia dollaria vuoden 2023 hinnoin. '
        + 'Löytö laukaisi kansainvälisen omistuskiistan: Espanja vetoaa siihen, että '
        + 'kyseessä on sen laivaston sotalaiva, Kolumbia siihen, että hylky on maan '
        + 'vedenalaista kansallisomaisuutta. Vaatimuksia ovat esittäneet myös '
        + 'pelastusyhtiö Sea Search Armada ja bolivialaiset alkuperäiskansojen '
        + 'ryhmät.'
        + '\n\nKolumbia ei ole ratifioinut YK:n merioikeusyleissopimusta eikä '
        + 'Unescon vedenalaisen kulttuuriperinnön sopimusta, jotka molemmat tukevat '
        + 'sotalaivan lippuvaltiolle kuuluvaa koskemattomuutta. Heinäkuusta 2017 '
        + 'alkaen Kolumbian kulttuuriministeriö, antropologian ja historian '
        + 'instituutti, laivasto ja merenkulkuviranomainen ovat tutkineet hylkyä ja '
        + 'nostaneet siitä esineitä Cartagenaan suunniteltua museota varten.',
      lahde: 'en-Wikipedia "Spanish galleon San José". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi San Josén hylystä kiistellään?',
        vaihtoehdot: [
          'Hylyn sijaintia ei tiedetä tarkasti',
          'Hylky on kansainvälisillä vesillä eikä kenenkään',
          'Espanja pitää sitä sotalaivanaan ja Kolumbia kansallisomaisuutenaan',
        ],
        oikea: 2,
      },
    },
    /*
     * Ciénagan tori, Magdalena (lakkolaisten kokoontumispaikka).
     * Lähde: en.wikipedia.org: Banana Massacre
     */
    {
      id: 'banaanilakko-1928',
      otsikko: 'Ciénaga 1928 — yhdeksän vaatimusta ja konekiväärit',
      nimio: 'Ciénaga 1928',
      vuosi: '1928',
      paikka: 'Ciénagan tori, Magdalenan departementti',
      lat: 11.0064, lon: -74.2464,
      kortti: 'Banaanityöläiset olivat lakossa yhdeksän vaatimuksen puolesta: '
        + 'sairaala, siistit asuntolat, palkka rahana eikä kupongeilla. Yhtiö '
        + 'kieltäytyi neuvottelemasta, ja hallitus lähetti seitsemänsataa sotilasta. '
        + 'Joulukuun viidentenä konekiväärit oli nostettu torin kulmien katoille.',
      teksti: 'United Fruit Companyn banaaniviljelmien työläiset aloittivat lakon '
        + '12. marraskuuta 1928. Vaatimuksia oli yhdeksän: alihankkijoiden kautta '
        + 'palkkaamisen lopettaminen, pakollinen ryhmävakuutus, korvaukset '
        + 'työtapaturmista, hygieeniset asuntolat ja kuusipäiväinen työviikko, '
        + 'palkankorotus pienituloisimmille, viikoittainen palkanmaksu, '
        + 'konttorikauppojen lakkauttaminen, kupongeilla maksamisen lopettaminen ja '
        + 'sairaalapalvelujen parantaminen.'
        + '\n\nLakosta kasvoi siihenastisen Kolumbian suurin työtaistelu: mukana oli '
        + 'vähintään 25 000 työläistä. Yhtiö kieltäytyi neuvottelemasta viikkoja. '
        + 'Yhdysvaltain edustajat ja yhtiön väki kuvasivat lakkoa sähkeissään '
        + 'ulkoministeri Frank B. Kelloggille kommunistiseksi ja kumoukselliseksi, ja '
        + 'Kolumbian hallitusta painosti sekin, että yhtiö saattoi katkaista '
        + 'banaanien viennin Yhdysvaltoihin ja Eurooppaan.'
        + '\n\nPresidentti Miguel Abadía Méndezin hallitus nimitti kenraali Carlos '
        + 'Cortés Vargasin Magdalenan sotilaskomentajaksi ja lähetti alueelle 700 '
        + 'miestä. Viidentenä joulukuuta noin 1 500 työläistä perheineen odotti '
        + 'Ciénagan torilla sunnuntain messun jälkeen kuvernöörin puhetta. Sotilaat '
        + 'nostivat konekiväärit torin kulmien matalille katoille, sulkivat kadut, '
        + 'antoivat viiden minuutin varoituksen ja avasivat tulen väkijoukkoon.'
        + '\n\nCortés Vargas otti vastuun 47 kuolleesta. Todellista määrää ei ole '
        + 'koskaan vahvistettu: tutkija Herrera Soton kokoamat arviot vaihtelevat '
        + '47:stä kahteen tuhanteen. Gabriel García Márquez kuvasi tapahtuman '
        + 'romaanissaan Sadan vuoden yksinäisyys ja mainitsi kolmetuhatta kuollutta, '
        + 'mutta sekin luku on kaunokirjallinen eikä laskettu.',
      lahde: 'en-Wikipedia "Banana Massacre". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi Ciénagan uhrien määrää ei tiedetä?',
        vaihtoehdot: [
          'Yhtiö esti lehdistön pääsyn alueelle vuosikausiksi',
          'Kaikki asiakirjat tuhoutuivat myöhemmin tulipalossa',
          'Tarkkoja kirjauksia ei ole, ja arviot vaihtelevat 47:stä kahteen tuhanteen',
        ],
        oikea: 2,
      },
    },
  ],
  /* ==================================================================
   * ERÄ M2, OSEANIA (6.9.2026). Omistaja: *"Jatka kartta nostojen tekoa
   * koko maailmaan."* Viisi maata, kaksi skandaalia kummallekin. Kaikki
   * pisteet on tarkistettu maan fokuslehden rajausta vasten ja mitattu
   * irti pelikaupungeista (KAUPUNGIN_KOHDALLA_SADE 7); perustelut ja
   * mitat ovat maiden maastokohdepakeissa (js/packs/maastokohteet-aus.js
   * ja sisarpakit). Erä on kuvaton.
   * ================================================================ */
  AUS: [
    /*
     * Houtman Abrolhos, Länsi-Australian edustalla.
     * Lähde: en.wikipedia.org: Batavia (1628 ship)
     */
    {
      id: 'batavian-haaksirikko',
      otsikko: 'Batavia 1629 — haaksirikko, joka muuttui verilöylyksi',
      nimio: 'Batavia 1629',
      vuosi: '1629',
      paikka: 'Houtman Abrolhos, Länsi-Australian edustalla',
      lat: -28.4903, lon: 113.7933,
      kortti: 'Kolmesataa ihmistä pääsi hengissä maihin autiolle luodolle. Sitten '
        + 'komentaja lähti hakemaan apua, ja se, joka jäi käskyvaltaan, oli suunnitellut '
        + 'kapinaa jo ennen karilleajoa. Kun apu vihdoin palasi, eloonjääneitä ei ollut '
        + 'enää kolmesataa vaan runsaat sata — ja loput oli tappanut oma väki.',
      teksti: 'Batavia oli Alankomaiden Itä-Intian kauppakomppanian lippulaiva, joka '
        + 'rakennettiin Amsterdamissa 1628. Neitsytmatkallaan se ajoi 4. kesäkuuta 1629 '
        + 'karille Houtman Abrolhosin luotoketjulle Länsi-Australian edustalla. Aluksen '
        + '341 matkustajasta ja miehistön jäsenestä noin kolmesataa pääsi maihin; loput '
        + 'hukkuivat yrittäessään.\n\n'
        + 'Komentaja Francisco Pelsaert purjehti avoveneellä lähes 3 000 kilometriä '
        + '33 päivässä Bataviaan eli nykyiseen Jakartaan hakemaan apua. Käskyvaltaan jäi '
        + 'komppanian virkamies Jeronimus Cornelisz, joka oli suunnitellut kapinaa jo '
        + 'ennen haaksirikkoa. Hän lähetti parikymmentä miestä sotilas Wiebbe Hayesin '
        + 'johdolla muka etsimään juomavettä lähisaarilta ja jätti heidät kuolemaan.\n\n'
        + 'Sen jälkeen Cornelisz ja hänen kannattajansa surmasivat viikkojen kuluessa '
        + 'noin 125 eloonjäänyttä, myös naisia ja lapsia. Hayesin joukko löysi kuitenkin '
        + 'vettä, kuuli tapahtuneesta ja alkoi taistella kapinallisia vastaan. Viimeisin '
        + 'ja verisin yhteenotto keskeytyi lokakuussa 1629, kun Pelsaert palasi '
        + 'Sardam-aluksella.\n\n'
        + 'Cornelisz ja kuusi hänen miestään tuomittiin ja teloitettiin — he olivat '
        + 'ensimmäiset eurooppalaiset, jotka teloitettiin laillisesti Australiassa. Kaksi '
        + 'lievemmistä rikoksista tuomittua jätettiin mantereelle, ja heistä tuli '
        + 'ensimmäiset mantereelle pysyvästi jääneet eurooppalaiset; heistä ei kuultu '
        + 'sen koommin. Bataviasta lähteneistä matkustajista vain 122 pääsi perille.',
      lahde: 'en-Wikipedia "Batavia (1628 ship)", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuka tappoi suurimman osan Batavian haaksirikosta selvinneistä?',
        vaihtoehdot: [
          'Luodon alkuperäisasukkaat',
          'Nälkä ja jano autiolla luodolla',
          'Kapinaan noussut osa eloonjääneistä itse',
        ],
        oikea: 2,
      },
    },
    /*
     * Glenrowan, Victoria (hotellin piiritys).
     * Lähde: en.wikipedia.org: Ned Kelly
     */
    {
      id: 'glenrowanin-piiritys',
      otsikko: 'Glenrowan 1880 — auran teristä taottu haarniska',
      nimio: 'Glenrowan 1880',
      vuosi: '1880',
      paikka: 'Glenrowan, Victoria (hotellin piiritys)',
      lat: -36.4625, lon: 146.2225,
      kortti: 'Jengi aikoi suistaa poliisijunan raiteilta ja hyökätä sen jälkeen '
        + 'Benallaan. Poliisi sai vihjeen, ja suunnitelma kääntyi päinvastaiseksi: '
        + 'neljä rosvoa ja kymmeniä panttivankeja hotellissa, ympärillä aseistettu '
        + 'piiritys. Aamulla ulos käveli mies, jonka päällä oli auran teristä taottu '
        + 'rautapuku.',
      teksti: 'Edward "Ned" Kelly syntyi joulukuussa 1854 Victorian maaseudulla '
        + 'irlantilaisten vanhempien kolmantena lapsena. Isä oli pakkosiirretty vanki, ja '
        + 'perhe koki olevansa suurmaanomistajien poljettavana ja Victorian poliisin '
        + 'vainoama. Kelly ehti istua kaksi vankeustuomiota jo teini-ikäisenä.\n\n'
        + 'Vuonna 1878 Kellyjen kotona sattui väkivaltainen välikohtaus poliisin kanssa, '
        + 'ja Ned asetettiin syytteeseen murhan yrityksestä. Hän pakeni metsiin ja vannoi '
        + 'kostavansa äitinsä puolesta, joka oli joutunut vankilaan. Kun hän, veljensä Dan '
        + 'sekä Joe Byrne ja Steve Hart ampuivat kolme poliisia, Victorian hallitus julisti '
        + 'heidät lainsuojattomiksi.\n\n'
        + 'Kaksi vuotta jengi vältteli poliisia laajan tukijaverkoston avulla ja ryösti '
        + 'muun muassa Euroan ja Jerilderien. Vuonna 1880 se yritti suistaa poliisijunan '
        + 'raiteilta alkusoittona hyökkäykselle Benallaan, poliisitoiminnan tukikohtaan. '
        + 'Poliisi oli saanut vihjeen ja kohtasi jengin Glenrowanissa, jossa se piti '
        + 'kymmeniä panttivankeja hotellissa.\n\n'
        + 'Kahdentoista tunnin piirityksessä lainsuojattomat käyttivät auran teristä '
        + 'takomiaan haarniskoja. Kelly oli ainoa eloon jäänyt, ja hänet vangittiin '
        + 'vakavasti haavoittuneena. Tuhannet kannattajat vetosivat armahduksen puolesta, '
        + 'mutta hänet tuomittiin murhasta ja hirtettiin Melbournen vankilassa.',
      lahde: 'en-Wikipedia "Ned Kelly", johdanto-osa ja osio "Family background and early '
        + 'life". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mistä Kellyn jengin haarniskat oli taottu?',
        vaihtoehdot: [
          'Auran teristä',
          'Junanvaunun seinälevyistä',
          'Kaivosmiesten kypäristä',
        ],
        oikea: 0,
      },
    },
  ],
  FJI: [
    /*
     * Nairain saari, jonka luona Eliza haaksirikkoutui.
     * Lähde: en.wikipedia.org: Charles Savage (beachcomber)
     */
    {
      id: 'elizan-musketit',
      otsikko: 'Elizan musketit — merimies, joka muutti Fidžin sodat',
      nimio: 'Elizan musketit',
      vuosi: '1808–1813',
      paikka: 'Nairain saari, jonka luona Eliza haaksirikkoutui',
      lat: -17.8, lon: 179.4167,
      kortti: 'Hylystä nostettiin muutama musketti, ja sillä yksi saari nousi koko '
        + 'saariston herraksi. Ruotsalaissyntyinen merimies näytti Baun päälliköille, '
        + 'mitä ase tekee — ja jäi itse taistelemaan. Viisi vuotta myöhemmin hän seisoi '
        + 'aseettomana kalliolla ja luuli osaavansa puhua itsensä ulos.',
      teksti: 'Charles Savage oli todennäköisesti ruotsalaissyntyinen merimies, joka '
        + 'jätettiin Tongaan noin vuonna 1807. Sieltä hänet vietiin Fidžille '
        + 'Eliza-aluksella, joka haaksirikkoutui Nairain saaren lähellä.\n\n'
        + 'Savage puhui sekä tongaa että fidžiä ja pääsi nopeasti Baun saaren päällikön '
        + 'Naulivoun suosioon. Elizan hylystä hän sai talteen musketteja ja näytti Baun '
        + 'johtajille, mitä niillä tehdään. Ilmeisesti juuri silloin tuliaseita käytettiin '
        + 'Fidžillä ensimmäisen kerran. Savage johti pientä palkkasoturijoukkoa Naulivoun '
        + 'palveluksessa, ja koska joukolla ei ollut fidžiläisen sodankäynnin kulttuurisia '
        + 'pidäkkeitä — kuten sitä, ettei vastapuolen päällikköä tähdätä heti alussa — '
        + 'siitä tuli pelätty.\n\n'
        + 'Kertomusten mukaan hän rakensi vihollisen linnoituksen ulkopuolelle '
        + 'nuolenkestävän suojan, josta ampui rangaistuksetta. Osa väitteistä on '
        + 'liioittelua ja eurooppalaista tarinankerrontaa, mutta hänen vaikutuksestaan Baun '
        + 'nousuun on väitelty vakavasti.\n\n'
        + 'Vuonna 1813 Savage oli mukana Hunter-aluksen santelipuukaupassa. Kuudentena '
        + 'syyskuuta hän joutui Wailean väen väijytykseen, ja joukko puolustautui '
        + 'kalliolla, joka sai nimen Dillon\'s Rock. Neuvottelujen aikana Savage luotti '
        + 'kielitaitoonsa ja laskeutui alas aseetta. Hänet lyötiin maahan ja hukutettiin '
        + 'kaivoon.',
      lahde: 'en-Wikipedia "Charles Savage (beachcomber)", johdanto-osa sekä osiot '
        + '"Arrival at Fiji", "Exploits with the Bau" ja "The events of Dillon\'s Rock". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mistä Charles Savage sai musketit, joilla hän palveli Baun päällikköä?',
        vaihtoehdot: [
          'Britannian laivasto antoi ne lahjaksi',
          'Haaksirikkoutuneen Elizan hylystä',
          'Hän osti ne Tongan kuninkaalta',
        ],
        oikea: 1,
      },
    },
    /*
     * Baun saari, Kubunan päällikkösuvun keskus.
     * Lähde: en.wikipedia.org: Seru Epenisa Cakobau
     */
    {
      id: 'cakobaun-lasku',
      otsikko: 'Cakobaun lasku — tulipalo, joka maksoi kokonaisen maan',
      nimio: 'Cakobaun lasku',
      vuosi: '1849–1875',
      paikka: 'Baun saari, Kubunan päällikkösuvun keskus',
      lat: -17.9722, lon: 178.614,
      kortti: 'Amerikkalaisen konsulin talo paloi saarella vuonna 1849. Lasku lähetettiin '
        + 'miehelle, joka ei ollut vielä edes päällikkö, saati kuningas — ja se oli '
        + '44 000 dollaria. Neljännesvuosisataa myöhemmin sama lasku luovutti koko '
        + 'saariston Britannian kruunulle, ja paluumatka Sydneystä toi mukanaan vielä '
        + 'pahemman.',
      teksti: 'Yhdysvaltain hallitus tunnusti Seru Epenisa Cakobaun vaatimuksen '
        + 'yhdistyneen Fidžin kuninkuudesta paljon ennen kuin muut fidžiläiset päälliköt '
        + 'sen hyväksyivät. Pitkällä aikavälillä tunnustus kääntyi häntä vastaan.\n\n'
        + 'Amerikkalaiset pitivät häntä vastuullisena tuhopoltosta, joka tuhosi '
        + 'Yhdysvaltain konsulin John Brown Williamsin kodin Nukulaun saarella vuonna '
        + '1849, ja vaativat 44 000 dollarin korvausta. Tapahtuma-aikaan Cakobau ei ollut '
        + 'vielä edes Vunivalu saati kuningas. Velan olivat aiheuttaneet Rewan päälliköt, '
        + 'eikä hän kyennyt maksamaan sitä.\n\n'
        + 'Peläten amerikkalaisten hyökkäystä ja liittämistä Cakobau päätti luovuttaa '
        + 'saaret Yhdistyneelle kuningaskunnalle. Hän ojensi sotanuijansa kuningatar '
        + 'Victorialle 10. lokakuuta 1874, kun luovutusasiakirja allekirjoitettiin. '
        + 'Cakobau säilytti Baun Vunivalun arvon ja luovutti korkeimman Tui Viti '
        + '-arvonimen kuningattarelle.\n\n'
        + 'Juhlimaan lähtenyt lähetystö purjehti Sydneyyn ja sai siellä tuhkarokon. Paluu '
        + 'käynnisti epidemian. Vuonna 1875 Fidžin ylilääkäri William MacGregor kirjasi '
        + 'saarelaistyöläisten kuolleisuudeksi 540 tuhatta kohti. Cakobau eli sen jälkeen '
        + 'hiljaa ja kuoli 1. helmikuuta 1883.',
      lahde: 'en-Wikipedia "Seru Epenisa Cakobau", osio "Cession of power"; epidemian '
        + 'kuolleisuusluku "History of Fiji", osio "After annexation (1875 to 1911)". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mistä syntyi velka, jonka takia Cakobau luovutti Fidžin Britannialle?',
        vaihtoehdot: [
          'Amerikkalaisen konsulin talon tuhopoltosta',
          'Brittiläisten kauppiaiden lainoista',
          'Sokeriruokoplantaasien perustamisesta',
        ],
        oikea: 0,
      },
    },
  ],
  NZL: [
    /*
     * Matauri Bay, Cavallisaaret (laivan hylyn lepopaikka).
     * Lähde: en.wikipedia.org: Sinking of the Rainbow Warrior
     */
    {
      id: 'rainbow-warriorin-upotus',
      otsikko: 'Rainbow Warrior 1985 — salainen palvelu upotti protestilaivan',
      nimio: 'Rainbow Warrior',
      vuosi: '1985',
      paikka: 'Matauri Bay, Cavallisaaret (laivan hylyn lepopaikka)',
      lat: -35.0333, lon: 173.9,
      kortti: 'Kaksi räjähdystä satamassa juuri ennen puoltayötä, yksi kuollut '
        + 'valokuvaaja ja laiva pohjassa. Ensin kiistettiin kaikki. Sitten selvisi, että '
        + 'tekijät olivat ystävällismielisen valtion salaisen palvelun agentteja, ja '
        + 'pääministeri joutui lukemaan lehdistölle kahdensadan sanan tunnustuksen.',
      teksti: 'Rainbow Warrior oli Greenpeacen lippulaiva, joka oli kampanjoinut '
        + 'valaanpyyntiä, hylkeenpyyntiä, ydinkokeita ja ydinjätteen mereen laskemista '
        + 'vastaan. Keväällä 1985 se siirsi 300 marshallinsaarelaista Rongelapin atollilta, '
        + 'jonka amerikkalaiset ydinkokeet olivat saastuttaneet, ja purjehti sitten '
        + 'Uuteen-Seelantiin johtamaan mielenosoituslaivastoa Ranskan Mururoan ydinkokeita '
        + 'vastaan.\n\n'
        + 'Ranskan ulkomaantiedustelun DGSE:n operaatio sai koodinimen Satanique. Agentti '
        + 'Christine Cabon soluttautui Greenpeacen Aucklandin toimistoon '
        + 'ympäristöaktivistin valeasussa ja seurasi laivan viestintää. Kymmenentenä '
        + 'heinäkuuta 1985 kaksi operaattoria upotti laivan Aucklandin satamassa. '
        + 'Valokuvaaja Fernando Pereira palasi ensimmäisen räjähdyksen jälkeen hakemaan '
        + 'kalustoaan ja hukkui toiseen.\n\n'
        + 'Ranska kiisti aluksi kaiken. Uuden-Seelannin poliisi sai kaksi agenttia kiinni, '
        + 'ja skandaali kaatoi puolustusministeri Charles Hernun. Agentit tunnustivat '
        + 'taposta ja saivat kymmenen vuotta, mutta viettivät vain kaksi vuotta Ranskan '
        + 'Polynesian Haossa ennen vapautustaan.\n\n'
        + 'Ranska pyysi anteeksi ja maksoi korvaukset Uudelle-Seelannille, Pereiran '
        + 'perheelle ja Greenpeacelle; välitystuomioistuin määräsi 8,1 miljoonaa '
        + 'dollaria. Hylky nostettiin, mutta vauriot olivat korjauskelvottomat, ja se '
        + 'upotettiin 12. joulukuuta 1987 Matauri Bayhin tekoriutaksi.',
      lahde: 'en-Wikipedia "Sinking of the Rainbow Warrior", johdanto-osa ja osio '
        + '"Background", sekä "Rainbow Warrior (1955)", osio "Bombing". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuka upotti Rainbow Warriorin Aucklandin satamassa 1985?',
        vaihtoehdot: [
          'Ranskan ulkomaantiedustelun agentit',
          'Laivan oma miehistö vakuutuspetoksena',
          'Uuden-Seelannin merivoimat',
        ],
        oikea: 0,
      },
    },
    /*
     * Parihakan kylä, Taranaki.
     * Lähde: en.wikipedia.org: Parihaka
     */
    {
      id: 'parihakan-valtaus',
      otsikko: 'Parihaka 1881 — 1 600 sotilasta kylää vastaan, joka ei puolustautunut',
      nimio: 'Parihaka 1881',
      vuosi: '1881',
      paikka: 'Parihakan kylä, Taranaki',
      lat: -39.2883, lon: 173.8404,
      kortti: 'Kylä vastasi maiden takavarikointiin kyntämällä uudisasukkaiden peltoja ja '
        + 'pystyttämällä aitoja teiden poikki. Aseisiin ei tartuttu kertaakaan. Marraskuun '
        + 'aamuna 1881 kylään ratsasti 1 600 sotilasta, ja vastaan tuli satoja hyppiviä ja '
        + 'laulavia lapsia, jotka tarjosivat heille ruokaa.',
      teksti: 'Parihaka perustettiin noin 1866 Taranakiin maalle, jonka hallitus oli '
        + 'takavarikoinut Uuden-Seelannin sotien jälkeen. Perustajat olivat päälliköt '
        + 'Te Whiti o Rongomai ja Tohu Kākahi. Kylä kasvoi yli kahdentuhannen asukkaan '
        + 'yhteisöksi, joka veti puoleensa maansa menettäneitä maoreja ja teki vaikutuksen '
        + 'eurooppalaisiin vierailijoihin siisteydellään, ahkeruudellaan ja laajoilla '
        + 'viljelyksillään.\n\n'
        + 'Kun Taranakiin virtasi uudisasukkaita, hallitus alkoi ottaa haltuun myös niitä '
        + 'takavarikoituja maita, joita ei ollut vielä asutettu. Parihakan väki kieltäytyi '
        + 'korvauksista. Vuodesta 1878 Te Whiti ja Tohu vastasivat väkivallattomilla '
        + 'kampanjoilla: ensin kynnettiin uudisasukkaiden peltoja, sitten pystytettiin '
        + 'aitoja teiden poikki. Yli 400 maoria vangittiin ja pidettiin Eteläsaarella '
        + 'ilman oikeudenkäyntiä jopa kuusitoista kuukautta.\n\n'
        + 'Alkuperäisasukkaiden ministerin John Brycen painostuksesta hallitus toimi '
        + 'lokakuun 1881 lopulla, kun myötämielinen kuvernööri oli maasta poissa. '
        + 'Viidentenä marraskuuta 1 600 sotilasta ja ratsuväkeä marssi kylään aamun '
        + 'sarastaessa. Heitä vastaan tulivat hyppivät ja laulavat lapset ruokaa '
        + 'tarjoten.\n\n'
        + 'Te Whiti ja Tohu vangittiin kuudeksitoista kuukaudeksi, 1 600 asukasta '
        + 'karkotettiin ympäri Taranakia ilman ruokaa ja suojaa, ja jäljelle jääneille '
        + '600:lle annettiin kulkuluvat. Sotilaat ryöstivät ja tuhosivat lähes kaikki '
        + 'kylän rakennukset.',
      lahde: 'en-Wikipedia "Parihaka", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten Parihakan asukkaat vastustivat maiden takavarikointia?',
        vaihtoehdot: [
          'Sissisodalla vuoristosta käsin',
          'Väkivallattomasti kyntäen ja aitoja pystyttäen',
          'Vetoamalla Lontoon tuomioistuimiin',
        ],
        oikea: 1,
      },
    },
  ],
  PNG: [
    /*
     * Ok Tedin kaivos, Läntinen maakunta.
     * Lähde: en.wikipedia.org: Ok Tedi environmental disaster
     */
    {
      id: 'ok-tedin-jate',
      otsikko: 'Ok Tedi — kaksi miljardia tonnia jätettä jokeen',
      nimio: 'Ok Tedi',
      vuosi: '1984–2013',
      paikka: 'Ok Tedin kaivos, Läntinen maakunta',
      lat: -5.2114, lon: 141.1395,
      kortti: 'Patoallas sortui vuonna 1984, ja sen jälkeen rikastushiekka laskettiin '
        + 'yksinkertaisesti jokeen — vuosikymmenten ajan. Tuhat kilometriä uomaa nousi '
        + 'kymmenen metriä, syvä ja hidas joki muuttui matalaksi koskeksi, ja '
        + '50 000 ihmisen elämä meni sekaisin. Yhtiön oma toimitusjohtaja sanoi lopulta, '
        + 'ettei kaivokseen olisi pitänyt koskaan lähteä.',
      teksti: 'Ok Tedin ympäristökatastrofi vahingoitti tuhannen kilometrin matkalla Ok '
        + 'Tedi- ja Fly-jokia Papua-Uuden-Guinean Läntisessä maakunnassa vuosina '
        + '1984–2013, ja vahinko jatkuu yhä. Syynä oli noin kahden miljardin tonnin '
        + 'käsittelemätön kaivosjäte, joka laskettiin jokeen sen jälkeen, kun kaivoksen '
        + 'rikastushiekan patojärjestelmä sortui vuonna 1984.\n\n'
        + 'Vuonna 1999 BHP ilmoitti, että jokeen oli laskettu yli kymmenen vuoden ajan '
        + '90 miljoonaa tonnia jätettä vuodessa. Yhtiön toimitusjohtaja Paul Anderson '
        + 'sanoi, ettei kaivos sopinut yhtiön ympäristöarvoihin ja ettei siihen olisi '
        + 'koskaan pitänyt lähteä. Vuonna 2006 jokeen päätyi yhä 80 miljoonaa tonnia '
        + 'jätettä ja eroosioainesta vuodessa, ja noin 1 588 neliökilometriä metsää on '
        + 'kuollut tai kärsii.\n\n'
        + 'Joenpohja nousi kymmenen metriä, ja syvästä ja hitaasta joesta tuli matala ja '
        + 'koskinen — se katkaisi paikallisten kulkureitit. Kohonnut uoma aiheutti '
        + 'tulvia, jotka jättivät saastuneen mutakerroksen taro-, banaani- ja '
        + 'sagoviljelmille.\n\n'
        + 'Maanomistajat nostivat ryhmäkanteen Ok Tedi Miningia ja BHP Billitonia '
        + 'vastaan. Fly-joen alajuoksun kylissä katsotaan, että vahinko elinkeinoille on '
        + 'paljon suurempi kuin kaivoksesta saatu hyöty. Katastrofia pidetään yhtenä '
        + 'pahimmista ihmisen aiheuttamista ympäristötuhoista.',
      lahde: 'en-Wikipedia "Ok Tedi environmental disaster", johdanto-osa ja osio '
        + '"Environmental impact". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä käynnisti Ok Tedin ympäristökatastrofin vuonna 1984?',
        vaihtoehdot: [
          'Maanjäristys kaatoi kaivostornin',
          'Rikastushiekan patojärjestelmän sortuminen',
          'Öljysäiliöaluksen haaksirikko joen suulla',
        ],
        oikea: 1,
      },
    },
    /*
     * Port Breton, Uuden-Irlannin lounaisrannikko. Artikkelilla ei ole
     * koordinaattia; piste on valittu saaren lounaiskulmaan, jonka
     * artikkeli nimeää (Verronin vuoriston juurelle).
     * Lähde: en.wikipedia.org: De Rays Expedition
     */
    {
      id: 'de-raysin-uusi-ranska',
      otsikko: 'Uusi Ranska 1880 — markiisi myi paratiisin, jota ei ollut',
      nimio: 'Uusi Ranska 1880',
      vuosi: '1880',
      paikka: 'Port Breton, Uuden-Irlannin lounaisrannikko',
      lat: -4.72, lon: 152.83,
      kortti: 'Esite lupasi pääkaupungin, leveät kadut, komeat julkiset rakennukset ja '
        + 'Rivieran ilmaston. Kolmesataaneljäkymmentä italialaista maksoi 1 800 frangia '
        + 'kullassa tai viisi vuotta työtään ja purjehti Barcelonasta. Perillä oli '
        + 'sademetsä, joka laskeutui suoraan mereen — eikä yhtään taloa.',
      teksti: 'Markiisi de Rays oli ranskalainen aatelismies, joka yritti perustaa '
        + 'siirtokunnan eteläiselle Tyynellemerelle. Paikka, jota hän kutsui nimellä La '
        + 'Nouvelle France, oli nykyinen Uusi-Irlanti Bismarckin saaristossa. Vuonna 1879 '
        + 'hän levitti ympäri Eurooppaa mainoksia, jotka kuvasivat pääkaupunki Port '
        + 'Bretonin vilkkaaksi ja jo kahdesti onnistuneesti asutetuksi siirtokunnaksi, '
        + 'jossa oli komeita julkisia rakennuksia, leveitä teitä ja viljelykelpoista '
        + 'maata.\n\n'
        + 'Kolmesataaneljäkymmentä siirtolaista Venetosta liittyi retkikuntaan. Kukin '
        + 'maksoi 1 800 frangia kullassa tai sitoutui viiden vuoden työhön, ja '
        + 'vastineeksi luvattiin kaksikymmentä hehtaaria maata ja nelihuoneinen talo. '
        + 'Neljästä retkikunnastaan markiisi keräsi yli seitsemän miljoonaa frangia.\n\n'
        + 'Sekä Ranska että Italia kutsuivat hanketta huijaukseksi eivätkä myöntäneet '
        + 'osallistujille passeja. Moni ei uskonut viranomaisia, ja de Rays järjesti '
        + 'lähdön Barcelonasta. India-laiva purjehti 9. heinäkuuta 1880, ja matka kesti '
        + 'yli kolme kuukautta ahtaissa ja sairauden täyttämissä oloissa.\n\n'
        + 'Neljäntenätoista lokakuuta maihin nousseet huomasivat, ettei mitään Uutta '
        + 'Ranskaa ollut. Verronin vuoriston juurella oli tiheää sademetsää, josta ei '
        + 'saanut peltoa, ja siirtolaiset sairastuivat malariaan. Satakaksikymmentäkolme '
        + 'heistä kuoli ennen kuin Australian viranomaiset pelastivat loput.',
      lahde: 'en-Wikipedia "De Rays Expedition", johdanto-osa sekä osiot "The Paradise of '
        + 'New France", "The voyage" ja "Settlement in Port Breton". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä siirtolaiset löysivät Port Bretonista lokakuussa 1880?',
        vaihtoehdot: [
          'Valmiin kaupungin, mutta ei ruokaa',
          'Toisen retkikunnan, joka oli ehtinyt ensin',
          'Ei mitään siirtokuntaa, vain jyrkkää sademetsää',
        ],
        oikea: 2,
      },
    },
  ],
  SLB: [
    /*
     * Sinalagun satama, Kwaion rannikko, Malaita.
     * Lähde: en.wikipedia.org: Malaita massacre
     */
    {
      id: 'malaitan-verenvuodatus',
      otsikko: 'Malaita 1927 — veronkanto, joka päättyi rankaisuretkeen',
      nimio: 'Kwaio 1927',
      vuosi: '1927',
      paikka: 'Sinalagun satama, Kwaion rannikko, Malaita',
      lat: -9.05, lon: 161.05,
      kortti: 'Piirivirkamies tiesi hyökkäyksestä etukäteen ja päätti silti pystyttää '
        + 'veronkantopöydän maihin: pako olisi näyttänyt heikkoudelta. Basiana maksoi '
        + 'veronsa ensimmäisenä, palasi jonoon kiväärin piippu kainalossa — ja sen '
        + 'jälkeen kuoli viisitoista virkamiestä ja lopulta noin kuusikymmentä kwaiota.',
      teksti: 'Britannian Salomonsaarten protektoraatin Malaitan piirivirkamies William R. '
        + 'Bell keräsi saarella päiveroa, jota kwaiot pitivät sekä rasitteena että '
        + 'hyökkäyksenä perinteisiä arvoja vastaan. Syyskuussa 1927 Basianan johtamat '
        + 'kwaiosoturit suunnittelivat hyökkäystä veronkantoon.\n\n'
        + 'Juoni levisi ympäri saarta, ja Bell sai varoituksen hyvissä ajoin. Hän arvioi '
        + 'kuitenkin paikallisia tapoja tuntien, että paras keino oli näyttää voimaa: '
        + 'veron kerääminen laivasta käsin tai yksi mies kerrallaan olisi paljastanut '
        + 'heikkoutta.\n\n'
        + 'Maanantaina 3. lokakuuta 1927 Bell ankkuroi laivansa Sinalagun satamaan ja '
        + 'pystytti tavanomaisen veronkantopisteen läheiseen notkoon. Tiistaiaamuna '
        + 'soturit saapuivat. Basiana maksoi veronsa ensimmäisenä, haki kiväärinsä ja '
        + 'palasi jonoon piilottaen piipun kainaloonsa; jonon kärjessä hän löi Bellin '
        + 'kuoliaaksi. Samaan aikaan toinen ryhmä katkaisi verotalon seiniä sitovat '
        + 'köynnökset, ja seinät romahtivat sisällä olleiden poliisien päälle. '
        + 'Kaikkiaan viisitoista virkamiestä sai surmansa.\n\n'
        + 'Kostoretki järjestettiin nopeasti. Siinä kuoli noin kuusikymmentä kwaiota, '
        + 'lähes kaksisataa vangittiin ja heidän esi-isiensä pyhäköitä ja rituaaliesineitä '
        + 'tuhottiin ja häpäistiin järjestelmällisesti. Tapahtuma muutti kwaioiden elämää '
        + 'syvästi.',
      lahde: 'en-Wikipedia "Malaita massacre", johdanto-osa ja osio "Tax collection '
        + 'massacre". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi William Bell pystytti veronkantopisteen maihin, vaikka tiesi juonesta?',
        vaihtoehdot: [
          'Hän ei uskonut varoitusta todeksi',
          'Näyttääkseen voimaa; pako olisi paljastanut heikkoutta',
          'Kuvernööri oli käskenyt hänet rantaan',
        ],
        oikea: 1,
      },
    },
    /*
     * Savon saaren edusta, Ironbottom Sound.
     * Lähde: en.wikipedia.org: Battle of Savo Island
     */
    {
      id: 'savon-yotaistelu',
      otsikko: 'Savo 1942 — viiden istuvan ankan taistelu',
      nimio: 'Savo 1942',
      vuosi: '1942',
      paikka: 'Savon saaren edusta, Ironbottom Sound',
      lat: -9.1333, lon: 159.8167,
      kortti: 'Japanilainen osasto purjehti alas salmea, jota liittoutuneet kutsuivat '
        + 'nimellä The Slot, ja yllätti suojajoukon täydellisesti pimeässä. Neljä '
        + 'risteilijää upposi, japanilaiset selvisivät vähällä — ja aamulla laivasto '
        + 'lähti purkamatta maihinnousujoukkojensa muonaa.',
      teksti: 'Savon saaren taistelu käytiin 8.–9. elokuuta 1942, ja se oli Guadalcanalin '
        + 'kampanjan ensimmäinen suuri meritaistelu. Japanin laivasto kokosi vasta-iskuksi '
        + 'liittoutuneiden maihinnousulle seitsemän risteilijän ja yhden hävittäjän '
        + 'osaston vara-amiraali Gunichi Mikawan johdolla.\n\n'
        + 'Osasto purjehti Uuden-Britannian ja Uuden-Irlannin tukikohdista alas '
        + 'Uuden-Georgian salmea, jota liittoutuneet kutsuivat nimellä The Slot. '
        + 'Tarkoitus oli katkaista maihinnousu hyökkäämällä kuljetuslaivaston ja sen '
        + 'suojajoukon kimppuun. Liittoutuneiden suojana oli kahdeksan risteilijää ja '
        + 'viisitoista hävittäjää vara-amiraali Victor Crutchleyn johdolla, mutta '
        + 'taisteluun ehti vain viisi risteilijää ja seitsemän hävittäjää.\n\n'
        + 'Yötaistelussa Mikawa yllätti liittoutuneet täysin ja upotti yhden '
        + 'australialaisen ja kolme amerikkalaista risteilijää kärsien itse vain vähäisiä '
        + 'vaurioita. Yhdysvaltain laivastohistorian johtaja, kontra-amiraali Samuel J. '
        + 'Cox pitää tätä ja Tassafarongan taistelua maansa laivaston pahimpina tappioina '
        + 'Pearl Harborin jälkeen.\n\n'
        + 'Mikawa pelkäsi liittoutuneiden lentotukialusten iskua päivänvalossa ja '
        + 'vetäytyi yön turvin sen sijaan, että olisi etsinyt ja tuhonnut kuljetusalukset. '
        + 'Silti liittoutuneiden laivasto lähti suunniteltua aiemmin purkamatta kaikkia '
        + 'varusteitaan, ja maihin nousseet merijalkaväen joukot jäivät niukoille '
        + 'muonavaroille.',
      lahde: 'en-Wikipedia "Battle of Savo Island", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä japanilainen osasto jätti tekemättä Savon voiton jälkeen?',
        vaihtoehdot: [
          'Se ei etsinyt eikä tuhonnut kuljetusaluksia',
          'Se ei ottanut vangiksi yhtään merimiestä',
          'Se ei pommittanut Henderson Fieldin lentokenttää',
        ],
        oikea: 0,
      },
    },
  ],
  /* ==================================================================
   * MAAILMAN ERÄ M4, 6.9.2026 — POHJOIS-AMERIKKA (CAN, CUB, GRL, GTM,
   * NIC). Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko
   * maailmaan."* Euroopan ulkopuolelle ei ollut kirjoitettu yhtäkään
   * skandaalia; nämä kymmenen ovat viiden maan kiintiö, kaksi kutakin.
   * Kuvaton erä kuten ensimmäinenkin: kortti kantaa tekstin ja
   * lähteen. Jokainen piste on tarkistettu niin, ettei se ole
   * pelikaupungin kohdalla (KAUPUNGIN_KOHDALLA_SADE 7,
   * js/fokuskohteet.js). Faktat en-Wikipediasta 6.9.2026.
   * ================================================================ */
  CAN: [
    /*
     * Parlamenttikukkula, Ottawa.
     * Lähde: en-Wikipedia "Pacific Scandal"
     */
    {
      id: 'pacific-skandaali',
      otsikko: 'Tyynenmeren skandaali — rata, joka maksoi pääministerin paikan',
      nimio: 'Pacific 1873',
      vuosi: '1873',
      paikka: 'Parlamenttikukkula, Ottawa',
      lat: 45.4247, lon: -75.695,
      kortti: 'Kaksi yhtiötä kilpaili mannerradan urakasta, ja toinen niistä antoi '
        + 'hallituspuolueen vaalikassaan 360 000 dollaria. Kun asianajajan kassakaapista '
        + 'ilmeisesti varastettu sähke tuli päivänvaloon, Kanadan ensimmäinen pääministeri '
        + 'joutui eroamaan. Seuraavissa vaaleissa äänestettiin ensimmäistä kertaa salaisella '
        + 'lipulla.',
      teksti: 'British Columbia liittyi Kanadaan 1871 ehdolla, että valtio rakentaa radan '
        + 'Tyynenmeren rannikolta itäisiin maakuntiin. Urakasta kilpaili kaksi ryhmää: Hugh '
        + 'Allanin Canada Pacific Railway Company ja David Lewis Macphersonin Inter-Oceanic '
        + 'Railway Company.'
        + '\n\nToisena huhtikuuta 1873 liberaali kansanedustaja Lucius Seth Huntington kertoi '
        + 'alahuoneessa löytäneensä todisteet siitä, että Allan seurueineen oli saanut '
        + 'urakan poliittisia lahjoituksia vastaan. Allan oli lisäksi luvannut pitää '
        + 'amerikkalaisen pääoman poissa hankkeesta ja valehdellut siitä pääministeri John '
        + 'A. Macdonaldille: molemmat olivat salaa tekemisissä yhdysvaltalaisten '
        + 'rahoittajien kanssa, joilla oli osuutensa kilpailevassa Northern Pacific '
        + '-radassa.'
        + '\n\nOppositio ja George Brownin The Globe olettivat, että rahat oli käytetty '
        + 'äänten ostamiseen vuoden 1872 vaaleissa — salaista lippua ei vielä ollut, ja '
        + 'vaikka lahjonta oli laitonta, sen valvominen oli mahdotonta. Macdonald vakuutti '
        + 'syyttömyyttään, mutta rahasiirrot tulivat esiin.'
        + '\n\nMacdonald erosi 5. marraskuuta 1873, ja Alexander Mackenzien liberaalihallitus '
        + 'nousi valtaan. Yhtenä ensitöistään se sääti salaisen äänestyksen, jota käytettiin '
        + 'vuoden 1874 vaaleissa ensi kertaa. Rata rakennettiin lopulta aivan toisen yhtiön '
        + 'voimin, ja se valmistui 1885 — silloin Macdonald oli jo palannut pääministeriksi.',
      lahde: 'en-Wikipedia "Pacific Scandal", johdanto-osa sekä osiot "Background" ja '
        + '"Scandal". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä uudistus tehtiin Kanadassa heti Tyynenmeren skandaalin jälkeen?',
        vaihtoehdot: [
          'Otettiin käyttöön salainen äänestyslippu',
          'Rautateiden rakentaminen kiellettiin yksityisiltä',
          'Pääministerin virka lakkautettiin vuodeksi',
        ],
        oikea: 0,
      },
    },
    /*
     * Bre-X Mineralsin pääkonttori, Calgary.
     * Lähde: en-Wikipedia "Bre-X"
     */
    {
      id: 'bre-x',
      otsikko: 'Bre-X — maailman suurin kultaesiintymä, jota ei ollut',
      nimio: 'Bre-X 1997',
      vuosi: '1997',
      paikka: 'Bre-X Mineralsin pääkonttori, Calgary',
      lat: 51.0447, lon: -114.0719,
      kortti: 'Pennyosakkeesta kasvoi kuuden miljardin dollarin yhtiö, kun se kertoi '
        + 'löytäneensä Borneon viidakosta seitsemänkymmentä miljoonaa unssia kultaa. '
        + 'Näytteisiin oli sekoitettu paikallisilta ostettua huuhdottua kultaa. Kun '
        + 'riippumaton tarkastus paljasti sen, osake putosi kuuteen senttiin ja arviolta '
        + '40 000 sijoittajaa menetti kaiken.',
      teksti: 'David Walsh perusti Bre-X Minerals Ltd:n 1989. Yhtiö teki jatkuvasti '
        + 'tappiota, kunnes se osti maaliskuussa 1993 geologi John Felderhofin neuvosta '
        + 'alueen Busangin joen läheltä Kalimantanista Indonesiasta. Ensimmäiset kokeet '
        + 'eivät löytäneet kultaa, mutta joulukuussa 1993, päiviä ennen luvan umpeutumista, '
        + 'geologi Michael de Guzman kertoi tietävänsä tarkan porauspaikan — se oli tullut '
        + 'hänelle unessa.'
        + '\n\nArviot kasvoivat vuosi vuodelta kahdesta miljoonasta unssista '
        + 'kolmeenkymmeneen, kuuteenkymmeneen ja lopulta seitsemäänkymmeneen miljoonaan '
        + 'unssiin. Osake nousi Torontossa 280 dollariin ja markkina-arvo yli kuuteen '
        + 'miljardiin Kanadan dollariin. Jos luvut olisivat pitäneet paikkansa, yhtiöllä '
        + 'olisi ollut noin kahdeksan prosenttia maailman kullasta.'
        + '\n\nMaaliskuussa 1997 Freeport-McMoRanin oma tarkastus löysi kaivokselta '
        + 'merkityksettömän määrän kultaa. De Guzman kuoli matkalla selittämään tulosta '
        + 'pudottuaan helikopterista, ja kuolemaan liittyi niin paljon epäselvyyksiä, että '
        + 'siitä syntyi omat huhunsa. Riippumaton Strathcona Minerals raportoi 4. toukokuuta '
        + '1997, että näytteet oli suolattu kultapölyllä: de Guzman oli ostanut '
        + 'paikallisilta arviolta 61 000 dollarin edestä huuhdottua kultaa kahden ja puolen '
        + 'vuoden aikana.'
        + '\n\nSeitsemäntenä toukokuuta osake romahti. Menettäjiin kuului kanadalaisia '
        + 'eläkerahastoja: Ontarion opettajien eläkerahasto menetti sata miljoonaa dollaria. '
        + 'Ratsupoliisi lopetti tutkinnan 1999 nostamatta syytteitä, ja ainoa syytetty '
        + 'Felderhof vapautettiin 2007.',
      lahde: 'en-Wikipedia "Bre-X", johdanto-osa sekä osiot "History", "Death of chief '
        + 'geologist Michael de Guzman", "Fraud exposed" ja "Aftermath". Tarkistettu '
        + '6.9.2026.',
      visa: {
        kysymys: 'Miten Bre-X:n kultanäytteet oli väärennetty?',
        vaihtoehdot: [
          'Näytteet oli otettu toisesta kaivoksesta',
          'Laboratorion tulokset oli kirjoitettu uusiksi',
          'Näytteisiin oli sekoitettu ostettua huuhdottua kultaa',
        ],
        oikea: 2,
      },
    },
  ],
  CUB: [
    /*
     * Havannan satama.
     * Lähde: en-Wikipedia "USS Maine (1889)"
     */
    {
      id: 'uss-maine',
      otsikko: 'Muistakaa Maine — räjähdys, jonka lehdet ratkaisivat',
      nimio: 'Maine 1898',
      vuosi: '1898',
      paikka: 'Havannan satama',
      lat: 23.1353, lon: -82.3342,
      kortti: 'Yhdysvaltain sotalaiva räjähti Havannan satamassa helmikuun iltana 1898, ja '
        + '261 miehistön jäsentä kuoli. Kaksi newyorkilaista lehteä tiesi syyllisen heti, '
        + 'ilman todisteita. Kaksi kuukautta myöhemmin maat olivat sodassa — ja nykyisin '
        + 'painavin selitys osoittaa laivan omaan hiilibunkkeriin.',
      teksti: 'Maine lähetettiin tammikuussa 1898 Key Westistä Havannaan turvaamaan '
        + 'yhdysvaltalaisia etuja Kuuban itsenäisyyssodan aikana. Viidentenätoista '
        + 'helmikuuta kello 21.40 aluksessa räjähti yli viisi tonnia tykkien ruutipanoksia, '
        + 'ja laivan etukolmannes tuhoutui. Suurin osa miehistöstä nukkui juuri siellä.'
        + '\n\nSyy oli kiistanalainen heti. Laivaston tykistöasiantuntija Philip R. Alger '
        + 'ilmoitti jo seuraavana päivänä syyksi hiilibunkkerin itsesyttymisen, mitä '
        + 'laivaston apulaisministeri Theodore Roosevelt vastusti kirjeessään '
        + 'ennenaikaisena kannanottona kesken tutkinnan.'
        + '\n\nWilliam Randolph Hearstin New York Journal ja Joseph Pulitzerin New York '
        + 'World tekivät tapauksesta kampanjan, jota alettiin kutsua keltaiseksi '
        + 'journalismiksi. Journal omisti aiheelle viikon ajan keskimäärin kahdeksan ja '
        + 'puoli sivua päivässä ja lupasi 50 000 dollarin palkkion syyllisten '
        + 'tuomitsemisesta. Pulitzer piti yksityisesti ajatusta Espanjan käskystä '
        + 'mielettömänä, mutta hänen lehtensä vaati silti Kuuban täyttä itsenäisyyttä '
        + 'ainoana hyvityksenä.'
        + '\n\nEspanjan tutkinta päätyi hiilipaloon, amerikkalainen Sampsonin lautakunta '
        + 'miinaan. Sota alkoi 21. huhtikuuta 1898. Amiraali Hyman Rickoverin teettämä '
        + 'tutkimus tuki 1970-luvulla hiilibunkkerihypoteesia, ja kiista syystä jatkuu yhä.',
      lahde: 'en-Wikipedia "USS Maine (1889)", johdanto-osa sekä osiot "Sinking", "Yellow '
        + 'journalism" ja "Investigations". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä keltaisella journalismilla tarkoitetaan Mainen tapauksessa?',
        vaihtoehdot: [
          'Lehdet paisuttelivat ja jopa keksivät uutisia sodan puolesta',
          'Lehdet kieltäytyivät kirjoittamasta räjähdyksestä',
          'Lehdet julkaisivat vain laivaston virallisia tiedotteita',
        ],
        oikea: 0,
      },
    },
    /*
     * Playa Girón, Sikojenlahti.
     * Lähde: en-Wikipedia "Bay of Pigs Invasion"
     */
    {
      id: 'sikojenlahti',
      otsikko: 'Sikojenlahti — salaoperaatio, jonka koko maailma näki',
      nimio: 'Playa Girón 1961',
      vuosi: '1961',
      paikka: 'Playa Girón, Sikojenlahti',
      lat: 22.0667, lon: -81.0333,
      kortti: 'Yhdysvaltain tiedustelupalvelu rahoitti ja koulutti kuubalaispakolaisten '
        + 'prikaatin ja laski sen maihin Sikojenlahdelle huhtikuussa 1961. Operaation piti '
        + 'näyttää siltä, ettei Yhdysvalloilla ollut sen kanssa tekemistä. Kolmessa '
        + 'päivässä maihinnousu oli lyöty ja salaisuus mennyt.',
      teksti: 'Presidentti Dwight D. Eisenhower alkoi vuoden 1960 alussa pohtia keinoja '
        + 'Fidel Castron syrjäyttämiseksi ja hyväksyi Richard Bissellin suunnitelman, johon '
        + 'kuului puolisotilaallisen joukon kouluttaminen. Samaan aikaan alkoi Kuuban '
        + 'kauppasaarto, mikä ajoi Castron kääntymään Neuvostoliiton puoleen; Yhdysvallat '
        + 'katkaisi diplomaattisuhteet.'
        + '\n\nCastron valtaannousun jälkeen Yhdysvaltoihin muuttaneet pakolaiset olivat '
        + 'perustaneet vastavallankumouksellisen prikaati 2506:n. CIA rahoitti sen ja '
        + 'koulutti sen Guatemalassa; mukana oli myös noin kuusikymmentä Alabaman '
        + 'ilmakansalliskaartin jäsentä. Yli 1 400 miestä lähti veneillä Guatemalasta ja '
        + 'Nicaraguasta 17. huhtikuuta 1961, ja kaksi päivää aiemmin kahdeksan CIA:n '
        + 'toimittamaa B-26-pommittajaa oli iskenyt kuubalaisille lentokentille.'
        + '\n\nPäävoima nousi maihin Playa Girónilla ja löi paikallisen miliisin. Kun '
        + 'kansainvälinen yhteisö sai tietää operaatiosta, presidentti John F. Kennedy '
        + 'päätti olla antamatta lisää ilmatukea — vaikka Eisenhowerin kaudella laadittu '
        + 'suunnitelma oli edellyttänyt Yhdysvaltain ilma- ja merivoimien osallistumista.'
        + '\n\nKuuban asevoimat löivät maihinnousun kolmessa päivässä, ja joukot antautuivat '
        + '20. huhtikuuta. Vangit kuulusteltiin julkisesti, vangittiin ja tuomittiin. '
        + 'Tappio vahvisti Castron asemaa kansallissankarina, syvensi maiden välistä juopaa '
        + 'ja työnsi Kuuban lähemmäs Neuvostoliittoa — ja pohjusti seuraavan vuoden '
        + 'ohjuskriisin.',
      lahde: 'en-Wikipedia "Bay of Pigs Invasion", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Missä maassa maihinnousuprikaati koulutettiin?',
        vaihtoehdot: [
          'Meksikossa',
          'Guatemalassa',
          'Puerto Ricossa',
        ],
        oikea: 1,
      },
    },
  ],
  GRL: [
    /*
     * Kvanefjeldin ylätasanko Narsaqin yläpuolella.
     * Lähde: en-Wikipedia "Kvanefjeld"
     */
    {
      id: 'kuannersuit',
      otsikko: 'Kuannersuit — vuori, jonka takia hallitus vaihtui',
      nimio: 'Kuannersuit',
      vuosi: '2021',
      paikka: 'Kvanefjeld, Narsaq',
      lat: 60.97, lon: -45.83,
      kortti: 'Etelä-Grönlannin ylätasangolla on yksi maailman suurimmista harvinaisten '
        + 'maametallien esiintymistä — ja malmin seassa uraania. Vuoden 2021 vaalit '
        + 'käytiin kaivoksesta, ja louhinnan vastustajat voittivat. Uusi laki pysäytti '
        + 'hankkeen, ja yhtiö haastoi Grönlannin ja Tanskan välimiesmenettelyyn.',
      teksti: 'Kvanefjeld eli Kuannersuit sijaitsee Ilímaussaqin intruusion laajalla '
        + 'ylätasangolla Narsaqin kaupungin yläpuolella. Siellä on poikkeuksellisen paljon '
        + 'harvinaisten maametallien okseja sekä merkittäviä määriä uraania ja sinkkiä. '
        + 'Esiintymä tunnistettiin 1950-luvulla, kylmän sodan uraanihuuman aikaan, ja '
        + 'fyysikko Niels Bohr vieraili Narsaqissa 1957 tukemassa varhaisia tutkimuksia. '
        + 'Kun Tanska luopui ydinvoimasta 1983, etsintä loppui.'
        + '\n\nGrönlannin hallituksen politiikanmuutos 2010 avasi oven suurille kaivoksille. '
        + 'Australialainen Greenland Minerals, nykyinen Energy Transition Minerals, hankki '
        + 'alueen 2007 ja jätti 2015 hakemuksen avolouhoksesta.'
        + '\n\nVuoden 2021 vaaleissa uraanilouhintaa vastustaneet puolueet, etenkin Inuit '
        + 'Ataqatigiit, muodostivat hallituksen ja säätivät lain numero 20. Se kieltää '
        + 'uraanin louhinnan ja etsinnän yli sadan miljoonasosan pitoisuuksissa, ja koska '
        + 'Kvanefjeldin malmissa uraania on keskimäärin 250–350 miljoonasosaa, laki '
        + 'käytännössä pysäytti koko hankkeen.'
        + '\n\nMaaliskuussa 2022 yhtiö käynnisti välimiesmenettelyn Grönlannin ja Tanskan '
        + 'hallituksia vastaan ja väitti kiellon olleen laiton pakkolunastus. Vuonna 2025 '
        + 'Kvanefjeld oli yhä välitilassa: vuosien työ ja rahat eivät ole tuottaneet '
        + 'kaivosta, kun taas naapurissa Tanbreezin hanke on edennyt uuden omistajan '
        + 'käsissä.',
      lahde: 'en-Wikipedia "Kvanefjeld", johdanto-osa sekä osiot "Exploration" ja "Politics '
        + 'and Suspension". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä pysäytti Kvanefjeldin kaivoshankkeen?',
        vaihtoehdot: [
          'Malmi loppui kesken koelouhinnan',
          'Laki, joka kieltää uraanin louhinnan yli sadan miljoonasosan pitoisuuksissa',
          'Kaivosyhtiö meni konkurssiin',
        ],
        oikea: 1,
      },
    },
    /*
     * Brattahlíð, nykyinen Qassiarsuk.
     * Lähde: en-Wikipedia "Erik the Red"
     */
    {
      id: 'vihrea-maa',
      otsikko: 'Vihreä maa — historian tunnetuin kiinteistömainos',
      nimio: 'Vihreä maa 985',
      vuosi: '985',
      paikka: 'Brattahlíð, Qassiarsuk',
      lat: 61.1531, lon: -45.5169,
      kortti: 'Islannista kolmeksi vuodeksi karkotettu Eirik Punainen tutki lännen jäisen '
        + 'saaren ja palasi kertomaan siitä. Nimeksi hän antoi Grönlannin, vihreän maan, '
        + 'omien sanojensa mukaan siksi, että suotuisa nimi houkuttelisi ihmisiä lähtemään. '
        + 'Laivoja lähti kaksikymmentäviisi, perille pääsi neljätoista.',
      teksti: 'Eirik Thorvaldsson tuomittiin Thorsnesin käräjillä maanpakoon Islannista '
        + 'kolmeksi vuodeksi noin vuonna 982. Karkotusaikanaan hän purjehti länteen ja '
        + 'tutki maata, jonka Gunnbjörn Ulfsson oli nähnyt lähes vuosisata aiemmin myrskyn '
        + 'ajamana ja jota lainsuojaton Snæbjörn galti oli yrittänyt asuttaa — siinä '
        + 'onnistumatta.'
        + '\n\nPalattuaan Islantiin Eirik kertoi maasta, jonka nimi oli hänen oma '
        + 'keksintönsä. Saagan mukaan hän antoi sille tarkoituksella houkuttelevamman nimen '
        + 'kuin Islanti, sillä hän tiesi, että asutus onnistuisi vain, jos mukaan lähtisi '
        + 'mahdollisimman paljon väkeä.'
        + '\n\nMyyntipuhe tehosi. Kesällä 985 Eirik purjehti takaisin suuren '
        + 'siirtolaisjoukon kanssa, mutta matka oli kaikkea muuta kuin se, mitä nimi lupasi: '
        + 'kahdestakymmenestäviidestä lähteneestä laivasta perille pääsi neljätoista, osa '
        + 'kääntyi takaisin ja loput todennäköisesti katosivat.'
        + '\n\nIslantilaiset perustivat lounaisrannikolle kaksi siirtokuntaa — Itäisen '
        + 'nykyisen Qaqortoqin seudulle ja Läntisen Nuukin lähelle — sillä vain ne '
        + 'kelpasivat maanviljelyyn. Eirik rakensi Brattahlíðin tilan nykyisen Qassiarsukin '
        + 'kohdalle ja oli Grönlannin mahtavin päällikkö. Kesäisin siirtokunnat lähettivät '
        + 'miehiä Diskonlahdelle napapiirin pohjoispuolelle metsästämään hylkeitä, '
        + 'mursunluuta ja rantaan ajautuneita valaita.',
      lahde: 'en-Wikipedia "Erik the Red", johdanto-osa sekä osiot "Exile" ja "Greenland". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi Eirik Punainen antoi saarelle nimen Grönlanti?',
        vaihtoehdot: [
          'Saaren rannikko oli hänen nähdessään vihreä',
          'Nimi oli jo käytössä norjalaisilla kauppiailla',
          'Suotuisa nimi houkuttelisi asukkaita lähtemään mukaan',
        ],
        oikea: 2,
      },
    },
  ],
  GTM: [
    /*
     * Puerto Barrios, Izabal — radan pääte ja United Fruitin satama.
     * Lähde: en-Wikipedia "Manuel Estrada Cabrera"
     */
    {
      id: 'banaanisopimus-1904',
      otsikko: 'Banaanisopimus 1904 — rata, satamat ja verovapaus',
      nimio: 'Banaanisopimus',
      vuosi: '1904',
      paikka: 'Puerto Barrios, Izabal',
      lat: 15.7267, lon: -88.5944,
      kortti: 'Guatemalan rata pääkaupungista Puerto Barriosin satamaan jäi kuusikymmentä '
        + 'mailia vajaaksi, kun rahat loppuivat. Presidentti Manuel Estrada Cabrera '
        + 'ratkaisi asian kysymättä lainsäätäjältä tai tuomioistuimelta. Sopimus antoi '
        + 'United Fruit Companylle verovapauksia, maata ja määräysvallan kaikkiin Atlantin '
        + 'puolen rautateihin.',
      teksti: 'Manuel Estrada Cabrera hallitsi Guatemalaa vuosina 1898–1920 eli pidempään '
        + 'kuin kukaan muu maan johtaja. Hän oli lakimies ilman sotilastaustaa ja '
        + 'nykyaikaisti teollisuutta ja liikennettä, mutta hallitsi diktaattorina: lakkoja '
        + 'murrettiin asein ja vaaleja ohjailtiin.'
        + '\n\nLiberaalipuolueen jäsenenä hän halusi rakentaa maanteitä, rautateitä ja '
        + 'satamia vientitalouden hyväksi. Rataa Puerto Barriosin suuresta satamasta '
        + 'pääkaupunkiin oli yritetty useaan otteeseen, mutta rahoitus loppui kotimaisen '
        + 'kahvituotannon romahdukseen ja rata jäi kuusikymmentä mailia vajaaksi.'
        + '\n\nEstrada Cabrera päätti yksin — lainsäätäjää tai tuomioistuinta kuulematta — '
        + 'että ainoa keino saada rata valmiiksi oli sopimus United Fruit Companyn kanssa. '
        + 'Vuonna 1904 allekirjoitettu sopimus yhtiön Minor Cooper Keithin kanssa antoi '
        + 'sille verovapauksia, maalahjoituksia ja hallinnan kaikkiin Atlantin puolen '
        + 'rautateihin.'
        + '\n\nYhtiön tulo maan talouteen ja politiikkaan jäi presidentin katkerimmaksi '
        + 'perinnöksi, ja sen vaikutusvalta oli väestön keskuudessa syvästi epäsuosittu. '
        + 'Estrada Cabreran oma valta päättyi 1920, kun kansalliskokous julisti hänet '
        + 'kykenemättömäksi ja hänet vangittiin korruptiosta.',
      lahde: 'en-Wikipedia "Manuel Estrada Cabrera", johdanto-osa ja osio "First term: '
        + 'United Fruit Company". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä United Fruit Company sai vuoden 1904 sopimuksessa?',
        vaihtoehdot: [
          'Verovapauksia, maata ja Atlantin puolen rautatiet',
          'Yksinoikeuden kahvin vientiin',
          'Oikeuden nimittää maan hallituksen',
        ],
        oikea: 0,
      },
    },
    /*
     * Santa Marían tulivuori Quetzaltenangon lähellä.
     * Lähde: en-Wikipedia "Santa María (volcano)"
     */
    {
      id: 'santa-maria-1902',
      otsikko: 'Santa Marían tuhka 1902 — kuka sai korvaukset',
      nimio: 'Santa María 1902',
      vuosi: '1902',
      paikka: 'Santa Marían tulivuori, Quetzaltenango',
      lat: 14.7561, lon: -91.5522,
      kortti: 'Satoja vuosia hiljaa ollut tulivuori purki lokakuussa 1902 kahdeksan '
        + 'kuutiokilometriä magmaa — se oli yksi 1900-luvun kolmesta suurimmasta '
        + 'purkauksesta. Kukaan ei tunnistanut kuukausia jatkuneita järistyksiä '
        + 'varoitukseksi, ja arviolta kuusituhatta ihmistä kuoli. Sitten alkoi toinen '
        + 'vääryys.',
      teksti: 'Santa María oli ollut hiljaa ainakin viisisataa vuotta, kun tammikuussa 1902 '
        + 'alkoi seudulla järistysparvi ja huhtikuussa koettiin suuri maanjäristys. Purkaus '
        + 'alkoi 24. lokakuuta, ja voimakkaimmat räjähdykset seurasivat kahtena seuraavana '
        + 'päivänä.'
        + '\n\nHohkakiveä satoi 273 000 neliökilometrin alalle ja tuhkaa kulkeutui San '
        + 'Franciscoon asti, neljäntuhannen kilometrin päähän. Ensimmäinen merkki oli '
        + 'hiekkasade Quetzaltenangon ylle; sitten tuuli kääntyi ja tuhka alkoi pudota '
        + 'Helvetian kahviviljelmälle kymmenen kilometrin päässä lounaassa. Jopa 160 '
        + 'kilometrin säteellä oli täysin pimeää 53 tuntia, ja moni kahviviljelmä tuhoutui.'
        + '\n\nPurkauksen jälkeen alueelle saapui joukkoja ryöstämään, tappamaan ja '
        + 'valtaamaan viljelmiä. Alkuperäisväestölle seuraukset olivat kaksinkertaiset: he '
        + 'menettivät omaisiaan, kotinsa ja satonsa — ja heidät pakotettiin '
        + 'jälleenrakennustöihin orjuutettuina.'
        + '\n\nSamaan aikaan kreolimaanomistajat saivat menetyksistään korvaukseksi maata, '
        + 'joka takavarikoitiin alkuperäisyhteisöiltä San Miguel Uspantánissa Quichén '
        + 'maakunnassa, Panamissa Suchitepéquezissä ja Sololássa. Vuonna 1922 vanhaan '
        + 'kraatteriin alkoi kasvaa Santiaguiton laavakupoli, joka on aktiivinen yhä '
        + 'tänään.',
      lahde: 'en-Wikipedia "Santa María (volcano)", johdanto-osa sekä osiot "1902 eruption" '
        + 'ja "Santiaguito". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten purkauksen jälkeiset korvaukset jaettiin?',
        vaihtoehdot: [
          'Kaikki menettäjät saivat saman korvauksen valtiolta',
          'Kreolimaanomistajat saivat maata, joka otettiin alkuperäisyhteisöiltä',
          'Korvaukset maksoi tulivuorta tutkinut seura',
        ],
        oikea: 1,
      },
    },
  ],
  NIC: [
    /*
     * Rivas — kolme taistelua ja kannaksen kauttakulkureitti.
     * Lähde: en-Wikipedia "William Walker (filibuster)"
     */
    {
      id: 'william-walker',
      otsikko: 'Aqui fue Granada — mies, joka teki itsestään presidentin',
      nimio: 'Walker 1856',
      vuosi: '1856',
      paikka: 'Rivas ja Granada',
      lat: 11.4373, lon: -85.8264,
      kortti: 'Nashvillelainen lehtimies ja lääkäri purjehti 1855 Nicaraguaan '
        + 'kuudenkymmenen palkkasotilaan kanssa maan liberaalien avuksi. Vuotta myöhemmin '
        + 'hän oli itse maan presidentti ja kumosi orjuuden kiellon. Kun keskiamerikkalainen '
        + 'liittouma ajoi hänet pois, hänen miehensä polttivat Granadan ja jättivät '
        + 'raunioihin kyltin.',
      teksti: 'Ennen Panaman kanavaa tärkeä kauppareitti New Yorkista San Franciscoon kulki '
        + 'Etelä-Nicaraguan halki: laivalla San Juanjokea ylös, Nicaraguajärven poikki ja '
        + 'postivaunuilla Rivasin kannaksen yli Tyynellemerelle. Reittiä hallitsi Cornelius '
        + 'Vanderbiltin Accessory Transit Company.'
        + '\n\nVuonna 1854 syttyi sisällissota Granadaan tukeutuneiden legitimistien ja '
        + 'Leóniin tukeutuneiden demokraattien välillä. Demokraatit pyysivät apua William '
        + 'Walkerilta, joka kiersi Yhdysvaltain neutraliteettilait sopimalla presidentti '
        + 'Francisco Castellónin kanssa "siirtolaisten" tuomisesta maahan. Walker purjehti '
        + 'San Franciscosta 3. toukokuuta 1855, ja perillä joukkoon liittyi 110 paikallista.'
        + '\n\nEnsimmäinen hyökkäys Rivasiin torjuttiin — opettaja Enmanuel Mongalo y Rubio '
        + 'poltti hyökkääjien esikunnan — mutta lokakuussa 1855 Walker valtasi Granadan. '
        + 'Presidentiksi hänet vihittiin 12. heinäkuuta 1856 vilpillisten vaalien jälkeen. '
        + 'Hän teki englannista virallisen kielen ja kumosi vuoden 1821 asetuksen, jolla '
        + 'orjuus oli lakkautettu.'
        + '\n\nCosta Rican johtama liittouma löi hänet. Joulukuussa 1856 Walkerin kenraali '
        + 'Charles Frederick Henningsen poltti Granadan paetessaan, ja jäljelle jäivät '
        + 'raunioihin kirjoitetut sanat "Aqui Fue Granada", täällä oli Granada. Walker '
        + 'luopui presidenttiydestä 1. toukokuuta 1857 ja teloitettiin Hondurasissa 1860.',
      lahde: 'en-Wikipedia "William Walker (filibuster)", johdanto-osa sekä osiot '
        + '"Nicaragua" ja "President of Nicaragua". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä sanat "Aqui fue Granada" tarkoittavat?',
        vaihtoehdot: [
          'Täällä oli Granada',
          'Granada antautuu',
          'Granadan portti',
        ],
        oikea: 0,
      },
    },
    /*
     * Punta Gordan jokisuu — suunnitellun kanavareitin Karibian pää.
     * Lähde: en-Wikipedia "Attempts to build a canal across Nicaragua"
     */
    {
      id: 'kanavakonsessio',
      otsikko: 'Kanavakonsessio 2013 — laki 840 ja kadonnut yhtiö',
      nimio: 'Kanava 2013',
      vuosi: '2013',
      paikka: 'Punta Gordan jokisuu, kanavareitin Karibian pää',
      lat: 11.55, lon: -83.78,
      kortti: 'Nicaraguan kansalliskokous myönsi 2013 hongkongilaiselle yhtiölle '
        + 'viidenkymmenen vuoden konsession rakentaa Panamaa suurempi kanava halki maan. '
        + 'Samana vuonna säädetty laki salli lunastaa 908 neliökilometriä maata ilman '
        + 'valitusoikeutta. Kanavaa ei koskaan kaivettu, ja yhtiön pääkonttori tyhjeni 2018 '
        + 'jättämättä osoitetta.',
      teksti: 'Ajatus kanavasta Nicaraguan halki on siirtomaa-ajalta, ja se on aina '
        + 'nojannut samaan reittiin: San Juanjoki Karibialta Nicaraguajärvelle ja järven '
        + 'poikki Rivasin kannakselle. Yhdysvallat luopui suunnitelmasta 1900-luvun alussa '
        + 'ostettuaan ranskalaisten osuudet Panaman kanavasta.'
        + '\n\nSyyskuussa 2012 Nicaraguan hallitus ja vasta perustettu HK Nicaragua Canal '
        + 'Development Group allekirjoittivat aiesopimuksen. HKND oli miljardööri Wang '
        + 'Jingin johtama yksityinen yhtiö. Kesäkuussa 2013 kansalliskokous hyväksyi lain, '
        + 'joka antoi sille viidenkymmenen vuoden konsession, ja joulukuussa 2014 yhtiö '
        + 'ilmoitti aloittavansa työt Briton kylässä Rivasissa.'
        + '\n\nSamana vuonna säädetty laki 840 salli 908 neliökilometrin pakkolunastukset. '
        + 'Se kieltää valitusoikeuden lunastuspäätöksestä, määrää korvaukset mitättömiksi '
        + 'ja antaa sijoittajalle luvan myydä oikeuksiaan osissa. Sitä on kutsuttu '
        + 'maakaappaukseksi, ja se johti mielenosoituksiin ja väkivaltaisiin yhteenottoihin '
        + 'turvallisuusjoukkojen kanssa.'
        + '\n\nRahoitusvaikeuksien jälkeen Wang sulki HKND:n pääkonttorin Kiinassa '
        + 'huhtikuussa 2018 jättämättä osoitetta tai puhelinnumeroa. Aktivistit muistuttivat, '
        + 'että sopimus oli purettava 72 kuukaudessa, jos rahoitusta ei saada — määräaika '
        + 'umpeutui 14. kesäkuuta 2019 — mutta kansalliskokous kumosi lain 840 vasta '
        + 'toukokuussa 2024.',
      lahde: 'en-Wikipedia "Attempts to build a canal across Nicaragua", johdanto-osa sekä '
        + 'osiot "Route" ja "HKND project (2010–2024)". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä laki 840 salli kanavahankkeen tieltä?',
        vaihtoehdot: [
          '908 neliökilometrin pakkolunastukset ilman valitusoikeutta',
          'Kanavan rakentamisen ilman ympäristöselvitystä',
          'Ulkomaisen työvoiman tuonnin ilman lupia',
        ],
        oikea: 0,
      },
    },
  ],
  /*
   * ══ ERÄ M3, AASIA 6.9.2026 ══════════════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M3 (HKG, IDN, IND, LKA, MMR) tuo kaksi skandaalia kuhunkin
   * viiteen maahan — kymmenen uutta, ja ensimmäiset Euroopan
   * ulkopuolella Aasiassa. Kaikki ovat kuvattomia kuten erän muutkin
   * nostot, ja jokaisen lähderivi nimeää en-Wikipedian artikkelin ja
   * osan sekä tarkistuspäivän.
   *
   * PAIKAT ON MITATTU. Yksikään uusi merkki ei ole pelikaupungin
   * kohdalla (KAUPUNGIN_KOHDALLA_SADE 7 lautayksikköä,
   * js/fokuskohteet.js): lähin on Dambulla 12,9 yksikön päässä
   * Colombo-laatasta ja kaukaisin Bre-X 195,9 yksikön päässä
   * Borneosta.
   *
   * HERKKIEN KOHTEIDEN LINJAUS ON SITOVA (docs/aasia-tyoaineisto/
   * spec-asia.md): Hongkongista ei kirjoiteta 2010–2020-lukujen
   * protesteja eikä turvallisuuslakia, Myanmarista ei juntta- eikä
   * konfliktisisältöä, ja siirtomaahistoria kerrotaan neutraalina.
   * Molemmat Hongkongin skandaalit ovat 1970–80-luvun talous- ja
   * virkarikoksia, ja molemmat Myanmarin aiheet ovat 1400–1700-luvun
   * hovihistoriaa.
   */
  HKG: [
    /*
     * Kai Takin lentoasema, Kowloon (pakomatkan lähtöpaikka).
     * Lähde: en.wikipedia.org: Peter Godber
     */
    {
      id: 'godberin-pako',
      otsikko: 'Godberin pako — ylikomisario ja lentokenttäpassi',
      nimio: 'Godber',
      vuosi: '1973–1975',
      paikka: 'Kai Takin lentoasema, Kowloon',
      lat: 22.33, lon: 114.195,
      kortti: 'Poliisin oma korruption vastainen osasto käski ylikomisariota '
        + 'selittämään, mistä neljä ja puoli miljoonaa oli tullut. Seuraavana '
        + 'päivänä mies käveli virkakortillaan passintarkastuksen ohi ja nousi '
        + 'Lontoon-koneeseen. Pako suututti kaupungin niin, että sen jäljiltä '
        + 'perustettiin kokonaan uusi virasto.',
      teksti: 'Peter Fitzroy Godber oli Hongkongin kuninkaallisen poliisin '
        + 'ylikomisario ja Kowloonin apulaispiiripäällikkö. Häntä oli pidetty '
        + 'rohkeana ja tehokkaana esimiehenä, ja hänet oli palkittu mitalein.'
        + '\n\nKun eläkkeelle jääminen lähestyi 1973, poliisin korruption '
        + 'vastainen osasto huomasi hänen tileillään Kanadassa, Australiassa, '
        + 'Singaporessa, Yhdysvalloissa, Britanniassa ja Hongkongissa lähes 4,4 '
        + 'miljoonaa Hongkongin dollaria — noin 865 000 Yhdysvaltain dollaria '
        + 'silloisessa rahassa. Häntä pyydettiin selittämään varallisuutensa. '
        + 'Kesäkuun 7. päivänä hän lähetti vaimonsa pois siirtokunnasta ja '
        + 'seuraavana päivänä käytti siviili-ilmailuviraston kulkulupaansa, '
        + 'ohitti maahanmuutto- ja passitarkastukset ja käveli Kai Takissa '
        + 'suoraan Lontoon-koneeseen.'
        + '\n\nPako raivostutti kaupungin. Se osoitti, ettei poliisin oma '
        + 'sisäinen tutkinta ollut uskottava, ja mursi hallintoeliitin käsityksen '
        + 'siitä, että eurooppalaiset virkamiehet olisivat lahjomattomia. Godber '
        + 'pidätettiin Englannissa 29. huhtikuuta 1974 ja luovutettiin '
        + 'Hongkongiin 7. tammikuuta 1975.'
        + '\n\nOikeudenkäynti alkoi 17. helmikuuta ja kesti kuusi ja puoli '
        + 'päivää. Godber tuomittiin lahjonnasta neljäksi vuodeksi vankeuteen ja '
        + 'menettämään 25 000 dollaria; hänen mitalinsa peruutettiin 3. lokakuuta '
        + '1975. Tapaus ja muut 1970-luvun korruptiojutut johtivat siihen, että '
        + 'Hongkongiin perustettiin 1974 poliisista riippumaton '
        + 'korruptiontorjuntavirasto ICAC.',
      lahde: 'en-Wikipedia "Peter Godber", johdanto ja osio "Biography". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten Godber pääsi ulos siirtokunnasta kesäkuussa 1973?',
        vaihtoehdot: [
          'Hän matkusti kalastusveneellä Macaoon',
          'Hän ohitti passintarkastuksen siviili-ilmailuviraston kulkuluvallaan',
          'Hän lensi väärällä passilla Singaporeen',
        ],
        oikea: 1,
      },
    },
    /*
     * Gammon House, Central (yhtiön kuuluisin kauppa).
     * Lähde: en.wikipedia.org: Carrian Group
     *
     * MERKKI ON SATAMAN ITÄPÄÄSSÄ EIKÄ CENTRALISSA, ja syy on
     * karttatekninen. Hongkongin kaupunkilehden kohdekartta
     * (js/packs/maakartat.js hongkong) rajautuu ruutuun lat
     * 22,2665–22,3015 ja lon 114,1385–114,1805, ja Gammon House
     * (Bank of America Tower) osuu keskelle sitä. Kohdekartan
     * rajauksessa oleva skandaali kuuluu kohdekartan pisteelle eikä
     * pääkartalle (tools/tarkista-nostopaikat.mjs, sääntö
     * "nosto ilman kohdekartan pistettä"), eikä tässä erässä lisätä
     * kohdekartan pisteitä. Merkki on siksi ruudun itäpuolella samalla
     * Hongkong-saaren rannalla, noin kolme kilometriä Centralista
     * itään; kortin `paikka`-rivi kertoo oikean osoitteen.
     */
    {
      id: 'carrianin-romahdus',
      otsikko: 'Carrian — talo, joka myytiin miljardilla voitolla',
      nimio: 'Carrian',
      vuosi: '1977–1983',
      paikka: 'Gammon House, Central, Hongkong',
      lat: 22.279, lon: 114.229,
      kortti: 'Tuntematon yhtiö osti Centralista toimistotalon lähes miljardilla '
        + 'ja ilmoitti kolme kuukautta myöhemmin myyvänsä sen 1,68 miljardilla. '
        + 'Koko kaupunki halusi tietää, mistä rahat tulivat. Vastaus oli '
        + 'yksinkertaisempi ja karumpi kuin huhut.',
      teksti: 'Carrian Group perustettiin Hongkongissa 1977. Sen takana oli '
        + 'George Tan Soon-gin, joka oli lähtenyt Singaporesta vuoden 1974 '
        + 'konkurssin jälkeen. Vuonna 1979 Tan osti holdingyhtiön 700 miljoonalla '
        + 'Hongkongin dollarilla ja teki siitä Carrian Investment Limitedin.'
        + '\n\nTammikuussa 1980 konserni osti Centralista Gammon Housen 998 '
        + 'miljoonalla — se oli siihenastisen Hongkongin kallein '
        + 'kiinteistökauppa. Huhtikuussa se ilmoitti myyvänsä talon 1,68 '
        + 'miljardilla. Tuotto oli niin huikea, että se hämmästytti koko '
        + 'kiinteistö- ja rahoitusmarkkinan ja nosti yhtiön julkisuuteen. '
        + 'Samana vuonna Carrian osti pörssiyhtiön ja käytti sitä varojen '
        + 'keräämiseen.'
        + '\n\nKonserni laajeni nopeasti Malesiaan, Thaimaahan, Singaporeen, '
        + 'Filippiineille, Japaniin ja Yhdysvaltoihin. Pääoman alkuperästä '
        + 'liikkui mitä mielikuvituksellisimpia huhuja: rahojen arveltiin '
        + 'tulevan milloin Imelda Marcosilta, milloin Neuvostoliiton '
        + 'valtionpankilta, milloin borneolaiselta metsäyhtiöltä.'
        + '\n\nCarrian ajautui Bank Bumiputra Malaysia Berhadin ja sen '
        + 'hongkongilaisen tytäryhtiön kanssa selvittämättömään vyyhtiin. '
        + 'Kirjanpitopetossyytösten, pankin tilintarkastajan murhan ja yhtiön '
        + 'neuvonantajan itsemurhan jälkeen konserni romahti 1983 Hongkongin '
        + 'siihenastisesti suurimpaan konkurssiin. Ehtymättömältä näyttänyt '
        + 'pääoma osoittautui pankkilainoiksi eikä miksikään muuksi.',
      lahde: 'en-Wikipedia "Carrian Group", osiot "History" ja "Downfall". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mistä Carrianin ehtymättömältä näyttänyt pääoma lopulta tuli?',
        vaihtoehdot: [
          'Pankkilainoista',
          'Malesian valtion sijoitusrahastosta',
          'Kiinteistöjen todellisista myyntivoitoista',
        ],
        oikea: 0,
      },
    },
  ],
  IDN: [
    /*
     * Rangkasbitung, Lebakin alue, Banten (Multatuli-museon kaupunki).
     * Lähde: en.wikipedia.org: Max Havelaar; Multatuli; Rangkasbitung
     */
    {
      id: 'max-havelaar',
      otsikko: 'Max Havelaar — romaani, joka muutti siirtomaapolitiikan',
      nimio: 'Max Havelaar',
      vuosi: '1860',
      paikka: 'Rangkasbitung, Lebakin alue, Jaava',
      lat: -6.35556, lon: 106.25111,
      kortti: 'Kirja alkaa kuin pilkka: "Olen kahvinvälittäjä ja asun '
        + 'Lauriergrachtilla numerossa 37." Sen jälkeen se kertoo, mitä '
        + 'kahvinvälittäjän kupin takana tapahtuu Jaavalla. Amsterdamissa '
        + 'kirjoitettu romaani muutti sen, miten Alankomaat hallitsi Itä-Intiaa.',
      teksti: 'Max Havelaar eli Alankomaiden kauppayhtiön kahvihuutokaupat on '
        + 'vuoden 1860 romaani, jonka kirjoitti Multatuli — kirjailijanimi tulee '
        + 'latinan sanoista multa tulī, olen kärsinyt paljon. Sen takana oli '
        + 'Eduard Douwes Dekker, joka oli palvellut kaksi vuosikymmentä '
        + 'siirtomaahallinnon viroissa Itä-Intiassa.'
        + '\n\nRomaanin taustalla on cultuurstelsel eli viljelyjärjestelmä. '
        + 'Siirtomaahallinto määräsi jaavalaiset viljelijät kasvattamaan '
        + 'kiintiön kaupallisia kasveja, sokeria ja kahvia, riisin sijaan. '
        + 'Samaan aikaan veronkantajille maksettiin palkkio kannetusta summasta. '
        + 'Yhdistelmä johti vallan väärinkäyttöön etenkin Jaavalla ja '
        + 'Sumatralla, ja seurauksena oli köyhyyttä ja nälänhätää. Siirtomaata '
        + 'hallittiin hyvin pienellä määrällä sotilaita ja virkamiehiä: entiset '
        + 'paikallishallitsijat säilyttivät valtansa ja käyttivät sitä.'
        + '\n\nRomaanin päähenkilö Max Havelaar taistelee tätä turmeltunutta '
        + 'järjestelmää vastaan. Kirja ei jäänyt kaunokirjallisuudeksi vaan '
        + 'vaikutti ratkaisevasti siihen, miten Alankomaiden siirtomaapolitiikkaa '
        + 'muotoiltiin ja muutettiin 1800-luvun lopulla ja 1900-luvun alussa.'
        + '\n\nMultatulia pidetään yhtenä Alankomaiden suurimmista kirjailijoista. '
        + 'Rangkasbitungiin, Lebakin alueen hallintokaupunkiin, avattiin 2018 '
        + 'hänen mukaansa nimetty museo.',
      lahde: 'en-Wikipedia "Max Havelaar", johdanto ja osio "Background", '
        + 'en-Wikipedia "Multatuli", johdanto, sekä en-Wikipedia "Rangkasbitung". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä cultuurstelsel eli viljelyjärjestelmä vaati viljelijöiltä?',
        vaihtoehdot: [
          'Kiintiön kaupallisia kasveja, kuten kahvia ja sokeria, riisin sijaan',
          'Määräosan sadosta luovutettavaksi kylän varastoon',
          'Kolme kuukautta vuodessa työtä satamassa',
        ],
        oikea: 0,
      },
    },
    /*
     * Busangin seutu, Itä-Kalimantan. Artikkeli paikantaa kaivoksen
     * viidakkoon Busang-joen varrelle eikä anna tarkkaa koordinaattia,
     * joten merkki on joen seudulla Itä-Kalimantanissa.
     * Lähde: en.wikipedia.org: Bre-X
     */
    {
      id: 'bre-x-busang',
      otsikko: 'Bre-X — kaivos, jossa ei ollut kultaa',
      nimio: 'Bre-X 1997',
      vuosi: '1993–1997',
      paikka: 'Busangin seutu, Itä-Kalimantan',
      lat: 0.6, lon: 116.1,
      kortti: 'Pennyosake nousi kahdessa vuodessa kuuden miljardin dollarin '
        + 'yhtiöksi, koska Borneon viidakosta oli muka löytynyt maailman suurin '
        + 'kultaesiintymä. Näytteisiin oli lisätty kultaa jälkikäteen. Noin '
        + '40 000 sijoittajaa menetti kaiken.',
      teksti: 'Bre-X Minerals Ltd. oli kanadalainen kaivosyhtiö, jonka David '
        + 'Walsh perusti 1989. Yhtiö oli listattu Albertan pörssiin ja teki '
        + 'tappiota vuodesta toiseen. Maaliskuussa 1993 se osti geologi John '
        + 'Felderhofin neuvosta viidakkopalstan Busang-joen läheltä '
        + 'Kalimantanista.'
        + '\n\nEnsimmäiset kokeet eivät näyttäneet kultaa. Joulukuussa 1993, '
        + 'päiviä ennen kuin lupa olisi rauennut, pääsgeologi Michael de Guzman '
        + 'ilmoitti tietävänsä täsmälleen, mihin pitää porata. Lokakuussa 1995 '
        + 'yhtiö kertoi merkittävästä kultalöydöstä, ja osakekurssi lähti '
        + 'nousuun. Toukokuussa 1996 osake huipentui 286,50 Kanadan dollariin ja '
        + 'yhtiön markkina-arvo ylitti kuusi miljardia.'
        + '\n\nNäytteet oli suolattu: niihin oli lisätty kultaa jälkikäteen, eikä '
        + 'kaivoksessa ollut juuri lainkaan kultaa. Yhtiö romahti toukokuussa '
        + '1997, kun väärennös paljastui, ja arviolta 40 000 sijoittajaa menetti '
        + 'sijoituksensa kokonaan.'
        + '\n\nDe Guzmania pidetään yleisesti huijauksen suunnittelijana. Hänen '
        + 'kuolemansa oli hyvin epäselvä, perustaja Walsh kuoli pian sen jälkeen, '
        + 'eikä muiden johtajien tietoisuudesta löytynyt näyttöä — niinpä '
        + 'ketään ei koskaan tuomittu rikoksesta.',
      lahde: 'en-Wikipedia "Bre-X", johdanto ja osio "History". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä näytteiden "suolaaminen" tarkoitti Bre-X:n tapauksessa?',
        vaihtoehdot: [
          'Näytteet säilöttiin suolaliuokseen kuljetusta varten',
          'Poranäytteisiin lisättiin kultaa jälkikäteen',
          'Näytteet otettiin väärästä kohdasta kaivosta',
        ],
        oikea: 1,
      },
    },
  ],
  IND: [
    /*
     * Bangran kylä, Siwanin piiri, Bihar (huijarin kotikylä).
     * Lähde: en.wikipedia.org: Natwarlal
     */
    {
      id: 'natwarlal',
      otsikko: 'Natwarlal — mies, joka myi Taj Mahalin',
      nimio: 'Natwarlal',
      vuosi: '1912–2009',
      paikka: 'Bangran kylä, Siwanin piiri, Bihar',
      lat: 26.22, lon: 84.36,
      kortti: 'Hän myi Taj Mahalin, Punaisen linnakkeen, presidentinlinnan ja '
        + 'parlamenttitalon — useampaan kertaan. Nykyrahassa myydyt kohteet '
        + 'olisivat noin 129 miljardin rupian arvoisia. Vankilasta hän pakeni '
        + 'kerta toisensa jälkeen.',
      teksti: 'Mithilesh Kumar Srivastava syntyi 1912 Bangran kylässä Siwanin '
        + 'piirissä Biharissa. Isä oli asemapäällikkö, ja siitä poika oppi, '
        + 'miten rautateiden rahtiliikenne toimi.'
        + '\n\nLahjansa hän huomasi sattumalta. Naapuri lähetti hänet viemään '
        + 'pankkishekkejä, ja poika tajusi osaavansa jäljitellä naapurin '
        + 'nimikirjoituksen; hän nosti tämän tililtä tuhat rupiaa ennen kuin '
        + 'teko huomattiin. Hän pakeni Kalkuttaan, kirjoittautui '
        + 'kauppatieteiden opiskelijaksi ja toimi satunnaisena '
        + 'osakevälittäjänä. Kauppatieteen tutkinto ja välittäjän työ opettivat '
        + 'pankkisäännöt, ja yhdessä asiakirjojen väärentämisen kanssa siinä oli '
        + 'kaikki, mitä huijaukset vaativat.'
        + '\n\nEnsimmäisen kerran hänet pidätettiin 1937 yhdeksän raudan tonnin '
        + 'varastamisesta. Kuuluisaksi hän tuli myymällä sellaista, mikä ei ollut '
        + 'hänen: Taj Mahalin, Punaisen linnakkeen, Rashtrapati Bhavanin ja '
        + 'Intian parlamenttitalon — jokaisen useaan kertaan.'
        + '\n\nNatwarlal tunnetaan yhtä hyvin vankilapaoistaan kuin huijauksistaan, '
        + 'ja hänen nimestään tuli Intiassa yleissana huijarille. Hän kuoli '
        + '25. heinäkuuta 2009. Kotitalonsa kerrotaan tulleen brittien '
        + 'purkamaksi, mutta tontti kuuluu yhä suvulle.',
      lahde: 'en-Wikipedia "Natwarlal", johdanto sekä osiot "Early life" ja '
        + '"Career". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten Natwarlal huomasi kykynsä väärentää nimikirjoituksia?',
        vaihtoehdot: [
          'Hän harjoitteli sitä koulussa kaverien kanssa',
          'Hän jäljitteli naapurin nimikirjoituksen pankkishekkiin',
          'Hän oppi sen työskennellessään kirjanpitäjänä',
        ],
        oikea: 1,
      },
    },
    /*
     * Khanapur, Belgaumin piiri, Karnataka (väärentäjän kotiseutu).
     * Lähde: en.wikipedia.org: Abdul Karim Telgi
     */
    {
      id: 'telgin-leimapaperit',
      otsikko: 'Telgin leimapaperit — väärennös virastojen sisällä',
      nimio: 'Telgin leimat',
      vuosi: '1990-luku–2003',
      paikka: 'Khanapur, Belgaumin piiri, Karnataka',
      lat: 15.64, lon: 74.51,
      kortti: 'Intiassa lähes jokainen sopimus kirjoitetaan valtion leimapaperille. '
        + 'Yksi mies painatti niitä itse ja palkkasi kolmesataa myyntimiestä. '
        + 'Ostajina olivat pankit, vakuutusyhtiöt ja pörssivälittäjät — ja '
        + 'toiminta ei olisi onnistunut ilman viranomaisia.',
      teksti: 'Abdul Karim Telgi syntyi 1961. Isä oli rautateiden työntekijä ja '
        + 'kuoli pojan ollessa nuori, joten Abdul Karim maksoi koulunsa '
        + 'Khanapurissa myymällä hedelmiä ja vihanneksia junissa. Hän valmistui '
        + 'kauppatieteiden maisteriksi 1984 Belgaumissa ja muutti Saudi-Arabiaan.'
        + '\n\nSeitsemän vuoden kuluttua hän palasi Intiaan ja aloitti '
        + 'väärentäjänuransa passeista. Hän perusti työvoiman vientiin '
        + 'erikoistuneen matkatoimiston ja teki asiakirjoja, joilla työntekijät '
        + 'pääsivät lentokentän tarkastuksista läpi silloinkin, kun passissa oli '
        + 'merkintöjä, jotka olisivat pysäyttäneet heidät.'
        + '\n\nSitten hän siirtyi vaikeampaan: valtion leimapaperiin, jolle '
        + 'Intiassa kirjoitetaan sopimukset ja asiakirjat. Telgi palkkasi '
        + 'kolmesataa asiamiestä, jotka myivät väärennöksiä suurostajille — '
        + 'pankeille, vakuutusyhtiöille ja pörssivälittäjille. Huijauksen kooksi '
        + 'arvioitiin noin 200 miljardia rupiaa eli 2,1 miljardia dollaria.'
        + '\n\nEniten hämmennystä herätti se, ettei tällainen olisi onnistunut '
        + 'ilman viranomaisia: mukana oli lukuisia poliiseja ja muita '
        + 'virkamiehiä. Yksi heistä oli apulaistutkija Nikhil Kothari, jonka '
        + 'omaisuus paljastui hänen palkkaansa nähden käsittämättömäksi. Telgi '
        + 'kuoli 2017.',
      lahde: 'en-Wikipedia "Abdul Karim Telgi", johdanto sekä osiot "Early life" '
        + 'ja "Counterfeiting charges". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mihin väärennettyjä leimapapereita ostettiin?',
        vaihtoehdot: [
          'Postimerkkien keräilijöille',
          'Pankeille, vakuutusyhtiöille ja pörssivälittäjille',
          'Ulkomaisille suurlähetystöille',
        ],
        oikea: 1,
      },
    },
  ],
  LKA: [
    /*
     * Dambullan luostari, Matalen piiri (kapinallisten kruunajaispaikka).
     * Lähde: en.wikipedia.org: Matale rebellion; George Byng, 7th Viscount
     * Torrington
     */
    {
      id: 'matalen-kapina',
      otsikko: 'Koiravero ja Dambullan kruunajaiset',
      nimio: 'Matalen kapina',
      vuosi: '1848',
      paikka: 'Dambullan luostari, Matalen piiri',
      lat: 7.85667, lon: 80.64917,
      kortti: 'Uusi kuvernööri poisti kahvin vientiveron ja paikkasi aukon '
        + 'verottamalla aseita, koiria, kärryjä ja puoteja. Kandyn talonpojille '
        + 'se oli sekä köyhdytys että loukkaus. Heinäkuun lopussa 1848 '
        + 'Dambullan luostarissa kruunattiin uusi kuningas.',
      teksti: 'Kandyn maakunnat olivat olleet brittihallinnossa 32 vuotta. '
        + 'Vuoden 1840 kruununmaa-asetus antoi eurooppalaisten '
        + 'plantaasinomistajien ottaa haltuunsa talonpoikien yhteismaat, joilla '
        + 'ryhdyttiin kasvattamaan 1830-luvulla saarelle tuotua kahvia.'
        + '\n\nBritanniassa alkanut lama iski Ceylonin kahviin ja kaneliin. '
        + 'Siirtomaasihteeri James Emerson Tennent esitti Lontooseen, että '
        + 'verotus siirrettäisiin välillisestä välittömään; kahvin vientivero '
        + 'poistettiin ja kanelin veroa alennettiin. Aukko oli 40 000 puntaa, ja '
        + 'sen paikkaamaan lähetettiin kuvernööriksi 35-vuotias lordi Torrington. '
        + 'Heinäkuun 1. päivänä 1848 asetettiin lupamaksut aseille, koirille, '
        + 'kärryille ja puodeille sekä pakkotyövelvollisuus plantaasiteillä, '
        + 'ellei erillistä veroa maksanut.'
        + '\n\nHeinäkuun 26. päivänä kapinan johtajat kokoontuivat Dambullan '
        + 'vanhaan luostariin. Kello 11.30 Gongalegoda Banda kruunattiin '
        + 'kuninkaaksi luostarin ylimunkin toimesta, ja Veera Puran Appusta '
        + 'tuli pääministeri. Joukko marssi Matalen kautta ja tuhosi '
        + 'verorekistereitä. Torrington julisti sotatilan Kandyyn 29. heinäkuuta '
        + 'ja Kurunegalaan 31. heinäkuuta.'
        + '\n\nGongalegoda Banda pidätettiin 21. syyskuuta ja tuomittiin '
        + 'maanpetoksesta hirtettäväksi; tuomio muutettiin sadaksi raipaniskuksi '
        + 'ja karkotukseksi Malakkaan. Torrington muistetaan juuri kapinan '
        + 'kovakouraisesta tukahduttamisesta, ja kapinaa pidetään Sri Lankan '
        + 'siirtymänä vanhasta aatelisjohtoisesta kapinasta kansanliikkeeseen.',
      lahde: 'en-Wikipedia "Matale rebellion", osiot "Background", "Rebellion" ja '
        + '"Legacy", sekä en-Wikipedia "George Byng, 7th Viscount Torrington", '
        + 'osio "Career". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mistä vuoden 1848 uudet verot perittiin?',
        vaihtoehdot: [
          'Riisisadosta ja kalansaaliista',
          'Aseista, koirista, kärryistä ja puodeista',
          'Talon ikkunoista ja savupiipuista',
        ],
        oikea: 1,
      },
    },
    /*
     * Colombo (yhtiön kotipaikka ja oikeudenkäyntipaikka).
     * Lähde: en.wikipedia.org: Golden Key Credit Card Company
     *
     * MERKKI ON COLOMBON ITÄLAIDALLA, ja syy on sama kuin Hongkongin
     * Carrian-kortissa: kaupunkilehden kohdekartta
     * (js/packs/maakartat.js colombo) on kapea nauha lat 6,904–6,957 ja
     * lon 79,834–79,8767, ja Fortin liikekeskusta osuu keskelle sitä.
     * Kohdekartan rajauksessa oleva skandaali kuuluisi kohdekartan
     * pisteelle eikä pääkartalle, eikä tässä erässä lisätä kohdekartan
     * pisteitä (tools/tarkista-nostopaikat.mjs). Merkki on siksi
     * nauhan itäpuolella, ja kortin `paikka`-rivi sanoo Colombo.
     */
    {
      id: 'golden-key',
      otsikko: 'Golden Key — luottokorttiyhtiön kadonneet talletukset',
      nimio: 'Golden Key',
      vuosi: '1999–2008',
      paikka: 'Colombo',
      lat: 6.906, lon: 79.89,
      kortti: 'Yhtiö oli tuonut luottokortit Sri Lankaan ja rakentanut '
        + 'kauppiasverkon, jota kaikki muutkin käyttivät. Yhdeksäntoistatuhatta '
        + 'miljoonaa rupiaa yli yhdeksältätuhannelta tallettajalta katosi '
        + 'yhdeksän vuoden aikana. Loppuvuodesta 2008 koko maan rahoitusala '
        + 'jäätyi.',
      teksti: 'Golden Key Credit Card Company perustettiin 3. kesäkuuta 1977, ja '
        + 'se oli osa Ceylinco Consolidatedia — konsernia, jolla oli yli '
        + 'kolmesataa tytäryhtiötä.'
        + '\n\n1980-luvun alussa yhtiö oli luottokorttialan uranuurtaja Sri '
        + 'Lankassa. Se rakensi maan ensimmäisen kauppiasverkon, jota kaikki '
        + 'muutkin korttiyhtiöt sittemmin käyttivät. Vuonna 1987 se toi maan '
        + 'ensimmäisen kotimaisen kultakortin, 1991 korottomat maksuerät ja 2003 '
        + 'ensimmäisen kotimaisen platinakortin.'
        + '\n\nVuonna 2008 paljastui, että hallituksen puheenjohtaja Lalith '
        + 'Kotelawala ja johtokunta olivat kavaltaneet varoja vuodesta 1999 '
        + 'lähtien. Summa oli 26,5 miljardia rupiaa eli noin 200 miljoonaa '
        + 'dollaria, ja se oli peräisin 9 054 tallettajalta. Puheenjohtaja ja '
        + 'johtajat asetettiin Colombon ylioikeudessa syytteeseen 91 kohdasta, '
        + 'joihin kuului kavallus ja luottamusaseman väärinkäyttö.'
        + '\n\nSeuraukset ulottuivat koko rahoitusalalle: vuoden 2008 viimeisinä '
        + 'viikkoina maata koetteli ankara maksuvalmiuskriisi, ja tapaus johti '
        + 'mittaviin sääntelyuudistuksiin ja alan valvonnan kiristämiseen.',
      lahde: 'en-Wikipedia "Golden Key Credit Card Company", johdanto sekä osiot '
        + '"History" ja "GKCCC scandal (2008)". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuinka monelta tallettajalta kavalletut varat olivat peräisin?',
        vaihtoehdot: [
          '9 054 tallettajalta',
          '312 tallettajalta',
          'Noin miljoonalta tallettajalta',
        ],
        oikea: 0,
      },
    },
  ],
  MMR: [
    /*
     * Bago (Pegu), Hanthawaddyn kuningaskunta — kellon valupaikka.
     * Lähde: en.wikipedia.org: Great Bell of Dhammazedi
     */
    {
      id: 'dhammazedin-kello',
      otsikko: 'Dhammazedin kello — maailman suurin kello joen pohjassa',
      nimio: 'Dhammazedin kello',
      vuosi: '1484–1608',
      paikka: 'Bago (Pegu), Hanthawaddyn kuningaskunta',
      lat: 17.33333, lon: 96.48333,
      kortti: 'Kuninkaan tähtientutkija varoitti: hetki on väärä, kello ei tule '
        + 'soimaan. Kello valettiin silti, ja sen ääni oli ruma. Satakaksikymmentä '
        + 'vuotta myöhemmin portugalilainen palkkasoturi yritti viedä sen pois — '
        + 'eikä kukaan ole nähnyt sitä sen jälkeen.',
      teksti: 'Dhammazedin suuri kello valettiin 5. helmikuuta 1484 Hanthawaddy '
        + 'Pegun kuninkaan Dhammazedin käskystä ja lahjoitettiin Shwedagonin '
        + 'pagodille. Sitä pidetään suurimpana koskaan valettuna kellona. '
        + 'Kuninkaan tähtientutkija oli kehottanut siirtämään valamista, koska '
        + 'hetki osui epäsuotuisaan krokotiilin tähdistöön, ja ennusti ettei '
        + 'kello soisi; valmiin kellon ääni oli kertomusten mukaan epämiellyttävä.'
        + '\n\nAikalaistekstien mukaan metallia kului 180 000 vissiä eli 294 '
        + 'tonnia, ja seoksessa oli kuparin ja tinan lisäksi hopeaa ja kultaa. '
        + 'Vuonna 1583 italialainen jalokivikauppias Gasparo Balbi mittasi sen '
        + 'seitsemäksi askeleeksi ja kolmeksi kämmenenleveydeksi ja kirjoitti '
        + 'päiväkirjaansa, että kello oli täynnä kirjaimia, joita mikään kansa '
        + 'ei osannut lukea.'
        + '\n\nPortugalilainen palkkasoturi Filipe de Brito e Nicote saapui '
        + 'Ala-Burmaan 1590-luvulla ja nousi Syriamin eli nykyisen Thanlyinin '
        + 'kuvernööriksi. Vuonna 1608 hän vei kellon Shwedagonista, vieritytti '
        + 'sen alas Singuttaran kukkulalta lautalle ja antoi norsujen hinata sen '
        + 'Bago-joelle. Kello aiottiin sulattaa tykeiksi.'
        + '\n\nLautta sidottiin de Briton lippulaivaan. Kuorma osoittautui liian '
        + 'raskaaksi, ja Bago- ja Yangon-jokien yhtymäkohdassa nykyisen Monkey '
        + 'Pointin edustalla lautta hajosi. Kello vajosi pohjaan ja veti '
        + 'lippulaivan mukanaan. Sitä on etsitty siitä lähtien.',
      lahde: 'en-Wikipedia "Great Bell of Dhammazedi", johdanto sekä osiot '
        + '"Description" ja "Theft from Shwedagon Pagoda". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi kello ei koskaan päätynyt Syriamiin sulatettavaksi?',
        vaihtoehdot: [
          'Munkit piilottivat sen matkan varrella',
          'Lautta hajosi jokien yhtymäkohdassa ja kello upposi',
          'Kuningas lunasti sen takaisin rahalla',
        ],
        oikea: 1,
      },
    },
    /*
     * Pathein (Bassein) — satama, jonka kirje tarjosi kauppapaikaksi.
     * Lähde: en.wikipedia.org: The Golden Letter of King Alaungpaya
     */
    {
      id: 'kultainen-kirje',
      otsikko: 'Kultainen kirje, jota kukaan ei osannut lukea',
      nimio: 'Kultainen kirje',
      vuosi: '1756–2006',
      paikka: 'Pathein (Bassein), Burma',
      lat: 16.784167, lon: 94.733333,
      kortti: 'Burman kuningas lähetti Yrjö II:lle kirjeen, joka oli kirjoitettu '
        + 'kultalevylle ja reunustettu kahdellakymmenelläneljällä rubiinilla. '
        + 'Lontoossa sitä pidettiin kuriositeettina eikä siihen vastattu. '
        + 'Kirjastossa Hannoverissa se makasi väärän luettelomerkinnän alla 250 '
        + 'vuotta.',
      teksti: 'Toukokuun 7. päivänä 1756 kuningas Alaungpaya käski kanslian '
        + 'laatia neljä kirjettä. Tärkein niistä oli kultainen ja osoitettu '
        + 'Britannian kuninkaalle Yrjö II:lle. Siinä Alaungpaya tarjosi maiden '
        + 'kauppasuhteen laajentamista: Itä-Intian kauppakomppania saisi '
        + 'perustaa linnoitetun kauppapaikan Patheinin satamaan, sillä sen '
        + 'silloinen tukikohta Negraisin saarella oli kaukana reiteiltä, vailla '
        + 'infrastruktuuria ja epäterveellisessä ilmastossa.'
        + '\n\nKirje on 54,7 senttiä pitkä ja 8,5 leveä, vain 0,2 millimetriä '
        + 'paksu ja painaa rubiineineen sata grammaa. Kullan pitoisuus on '
        + '95–99 prosenttia, ja kaksikymmentäneljä munanmuotoista rubiinia ovat '
        + 'peräisin Mogokin seudun kaivoksesta. Kirje käärittiin punaiseen '
        + 'paperiin ja pantiin koristeltuun norsunluusylinteriin, joka oli '
        + 'tehty ontoksi kaiverretusta burmalaisen norsun syöksyhampaasta.'
        + '\n\nKirje kulki Madrasin kautta ja saapui Lontooseen vasta maaliskuussa '
        + '1758. Yrjö II eikä kauppakomppania ymmärtänyt sen sisältöä eikä '
        + 'merkitystä, ja aloitetta pidettiin pikemmin kummallisuutena kuin '
        + 'vakavana avauksena. Alaungpaya ei saanut vastausta eikä edes tietoa '
        + 'siitä, että kirje oli perillä, ja piti sitä vakavana loukkauksena.'
        + '\n\nYrjö II lähetti kirjeen kotikaupunkinsa Hannoverin kirjastoon, ja '
        + 'salaneuvos Gerlach Adolph von Münchhausen kuvasi sen väärin: '
        + 'sanskritinkieliseksi kirjelmäksi eräältä Coromandelin rannikon '
        + 'ruhtinaalta. Väärän merkinnän alla se makasi lähes 250 vuotta, kunnes '
        + 'se tunnistettiin 2006. Vuonna 2015 Unesco liitti kirjeen Maailman '
        + 'muisti -rekisteriin Myanmarin, Saksan ja Britannian yhteisenä '
        + 'perintönä.',
      lahde: 'en-Wikipedia "The Golden Letter of King Alaungpaya", johdanto sekä '
        + 'osiot "History", "Material" ja "Containers". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi kultainen kirje unohtui Hannoverin kirjastoon 250 vuodeksi?',
        vaihtoehdot: [
          'Se oli luetteloitu väärin sanskritinkieliseksi kirjelmäksi',
          'Se katosi kirjaston tulipalossa ja löytyi vasta myöhemmin',
          'Kirjasto piti sitä väärennöksenä',
        ],
        oikea: 0,
      },
    },
  ],
  /* ==================================================================
   * ERÄ M5, AFRIKKA (6.9.2026). Omistaja: *"Jatka kartta nostojen tekoa
   * koko maailmaan."* Viisi maata, kaksi skandaalia kummallekin. Kaikki
   * pisteet on tarkistettu maan fokuslehden rajausta vasten ja mitattu
   * irti pelikaupungeista (KAUPUNGIN_KOHDALLA_SADE 7; lähin on Deim
   * Zubeir 28,6 lautayksikön päässä Bahr el Ghazal -laatasta);
   * perustelut ja mitat ovat maiden maastokohdepakeissa
   * (js/packs/maastokohteet-dza.js ja sisarpakit). Erä on kuvaton.
   * ================================================================ */
  DZA: [
    /*
     * Algeri, deyn linnoitus.
     * Lähde: en.wikipedia.org: Bakri-Busnach affair
     */
    {
      id: 'karpasviuhka-1827',
      otsikko: 'Kärpäsviuhka 1827 — isku, joka avasi sadan vuoden miehityksen',
      nimio: 'Kärpäsviuhka',
      vuosi: '1827',
      paikka: 'Algeri, deyn linnoitus',
      lat: 36.786944, lon: 3.060556,
      kortti: 'Vehnä oli myyty, laskua ei ollut maksettu, ja velka oli kasvanut '
        + 'neljääntoista miljoonaan frangiin. Kun Algerin hallitsija kysyi rahoistaan '
        + 'suoraan Ranskan konsulilta juhlavastaanotolla, vastaus oli sama kuin '
        + 'kolmenkymmenen vuoden ajan: ei mitään. Sitten hän löi konsulia kasvoihin '
        + 'kärpäsviuhkan varrella, ja Pariisissa loukkauksesta tuli sotasyy.',
      teksti: 'Livornosta 1600-luvulla saapuneet juutalaiset kauppiassuvut Bakri ja '
        + 'Busnach nousivat Algerin kaupan johtoon ja perustivat 1700-luvun lopulla '
        + 'yhtiön, joka hallitsi elintarvikkeiden — etenkin vehnän — vientiä Ranskaan. '
        + 'Vallankumouksen ja Napoleonin sotien aikana Ranska osti viljaa velaksi, ja '
        + 'koska yhtiö rahoitti toimintansa lainaamalla Algerin deyltä, velka oli '
        + 'tosiasiassa velkaa Algerin hallitsijalle.'
        + '\n\nVuosina 1800–1826 asia jäi ratkaisematta. Ranska myönsi velkansa 1801 '
        + 'rauhansopimuksessa mutta ei maksanut sitä; yhtenä verukkeena käytettiin sitä, '
        + 'että Bakri-Busnach kävi kauppaa myös Britannian kanssa. Vuonna 1826 Hussein '
        + 'Dey kirjoitti Ranskan ulkoministerille, ja velaksi laskettiin neljätoista '
        + 'miljoonaa frangia, josta Ranska lupasi maksaa seitsemän. Sitäkään se ei '
        + 'maksanut.'
        + '\n\nHuhtikuun 30. päivänä 1827 konsulit olivat koolla deyn luona. Hussein Dey '
        + 'kysyi Ranskan konsulilta, aikooko maa maksaa sovitun. Kun vastaus oli, ettei '
        + 'mitään ollut tapahtunut, dey löi häntä kasvoihin kärpäsviuhkan varrella ja '
        + 'käski ulos. Toisen version mukaan dey tähtäsi kärpäseen ja osui vahingossa.'
        + '\n\nRanskassa coup d’éventail nostatti vaatimuksen kunnian palauttamisesta. '
        + 'Hallitus vaati nöyryyttäviä hyvityksiä — korkeimpien virkamiesten pyytämään '
        + 'anteeksi ranskalaisella laivalla, Ranskan lipun nostoa linnoitukseen ja sadan '
        + 'tykin kunnianlaukauksia. Kun ehdot torjuttiin, seurasi sodanjulistus ja kolme '
        + 'vuotta kestänyt Algerin saarto. Vuonna 1830 Ranska maihinnousi ja valtasi '
        + 'Algerin; miehitys kesti 1960-luvulle asti.',
      lahde: 'en-Wikipedia "Bakri-Busnach affair", johdanto sekä osiot "Background" ja '
        + '"The fly-whisk incident". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mistä kiista deyn ja Ranskan konsulin välillä alkoi?',
        vaihtoehdot: [
          'Maksamattomasta viljavelasta',
          'Kalastusoikeuksista Välimerellä',
          'Ranskalaisten vankien kohtelusta',
        ],
        oikea: 0,
      },
    },
    /*
     * Regganen koekenttä Tanezrouftin autiomaassa.
     * Lähde: en.wikipedia.org: Gerboise Bleue (nuclear test)
     */
    {
      id: 'gerboise-bleue-1960',
      otsikko: 'Gerboise Bleue 1960 — sininen hyppyrotta Saharan yllä',
      nimio: 'Gerboise Bleue',
      vuosi: '1960',
      paikka: 'Reggane, Tanezrouftin autiomaa',
      lat: 26.720278, lon: 0.172778,
      kortti: 'Sadan metrin terästornin päähän nostettiin plutoniumpommi, ja aamulla '
        + '13. helmikuuta 1960 autiomaa välähti. Ranskasta tuli neljäs ydinasevalta, ja '
        + 'koe oli siihen mennessä ylivoimaisesti suurin ensimmäinen ydinkoe: 70 '
        + 'kilotonnia eli enemmän kuin Yhdysvaltain, Neuvostoliiton ja Britannian '
        + 'ensimmäiset yhteensä.',
      teksti: 'Ranskan pääministeri Félix Gaillard määräsi huhtikuussa 1958 ydinkokeen '
        + 'tehtäväksi vuoden 1960 ensimmäisellä neljänneksellä, ja Charles de Gaulle '
        + 'vahvisti päätöksen neljännen tasavallan kaaduttua. Ensin kaavailtiin räjäytystä '
        + 'Korsikan Argentellan kaivoksessa, mutta saaren laajat mielenosoitukset '
        + 'lopettivat suunnitelman. Paikaksi tuli Saharan sotilaskoekeskus Regganen lähellä '
        + 'Tanezrouftin autiomaassa — Algerian sodan keskellä.'
        + '\n\nPommi räjäytettiin 13. helmikuuta 1960 kello 7.04 UTC sadan metrin '
        + 'terästornin päässä. Komentopaikka oli kuudentoista kilometrin päässä, ja '
        + 'räjähdyksen vaikutuksia tutkittiin sijoittamalla kalustoa eri etäisyyksille; '
        + 'lentokoneet keräsivät näytteitä pilvestä. Toimittajia ei päästetty paikalle, '
        + 'vaan lehdistölle annettiin silminnäkijäkuvaus: "autiomaa syttyi valtavaan '
        + 'välähdykseen, jota seurasi 45 sekunnin kuluttua tuntuva paineaalto".'
        + '\n\nKokeen nimi tulee hyppyrotasta, gerboise, ja sininen väri Ranskan lipun '
        + 'ensimmäisestä väristä. Säteilyä mitattiin kilometrin päässä kymmenen radia '
        + 'tunnissa ja vielä 570 kilometrin päässä kolme radia tunnissa. Asiakirjat '
        + 'pidettiin salaisina vuosikymmeniä, ja armeija vakuutti vaikutusten olleen '
        + 'vähäisiä, mutta paikalla olleet ovat kertoneet suojavarusteiden olleen '
        + 'olemattomat. Vuonna 2009 Ranska suostui korvaamaan säteilylle altistuneille '
        + 'uhreille ja julkaisemaan lisää asiakirjoja.',
      lahde: 'en-Wikipedia "Gerboise Bleue (nuclear test)", johdanto sekä osiot "Name", '
        + '"Test", "Fallout" ja "Subsequent tests". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi ensimmäistä ydinkoetta ei tehty Korsikalla?',
        vaihtoehdot: [
          'Kaivos osoittautui liian pieneksi',
          'Saarella nousi laaja vastustus',
          'Merivesi olisi vuotanut kaivokseen',
        ],
        oikea: 1,
      },
    },
  ],
  AGO: [
    /*
     * Malanjen maakunta, Baixa do Cassangen puuvillaviljelmät.
     * Lähde: en.wikipedia.org: Strike in Baixa do Cassange
     */
    {
      id: 'baixa-do-cassange-1961',
      otsikko: 'Baixa do Cassange 1961 — poltetut henkilökortit',
      nimio: 'Cassange 1961',
      vuosi: '1961',
      paikka: 'Malanjen maakunta, Baixa do Cassangen viljelmät',
      lat: -9.533333, lon: 16.35,
      kortti: 'Puuvillayhtiön työläiset polttivat henkilökorttinsa ja vaativat parempia '
        + 'oloja. Seuraavana päivänä Portugalin ilmavoimat pommittivat kahtakymmentä '
        + 'kylää. Kuolleiden määrästä ei ole yksimielisyyttä, mutta tapaus katsotaan '
        + 'Angolan itsenäisyyssodan ensimmäiseksi liikkeeksi.',
      teksti: 'Tammikuun 3. päivänä 1961 portugalilais-belgialaisen puuvillayhtiö '
        + 'Cotonangin maataloustyöläiset nousivat mielenosoitukseen Baixa do Cassangen '
        + 'seudulla Malanjen maakunnassa Portugalin Angolassa. He vaativat parempia '
        + 'työoloja, polttivat henkilökorttinsa ja kävivät yhtiön alueella '
        + 'portugalilaisten kauppiaiden kimppuun. Mielenosoitusta johtivat kaksi siihen '
        + 'asti tuntematonta angolalaista, António Mariano ja Kulu-Xingu, ja siitä '
        + 'kasvoi nopeasti yleinen kansannousu.'
        + '\n\nPortugalin viranomaiset vastasivat seuraavana päivänä ilmahyökkäyksellä '
        + 'kahteenkymmeneen kylään. Uhriluvuista ei ole yksimielisyyttä: MPLA on '
        + 'ilmoittanut noin kymmenentuhatta kuollutta, kun useimmat arviot liikkuvat '
        + 'neljästäsadasta seitsemääntuhanteen. Viidenteen tammikuuta mennessä kapina oli '
        + 'tukahdutettu.'
        + '\n\nTapaus ei jäänyt yksittäiseksi. Runsaat kaksi kuukautta myöhemmin, 15. '
        + 'maaliskuuta 1961, Holden Roberton johtama UPA nosti kansannousun Pohjois-'
        + 'Angolan bakongo-alueella Ambuilassa; kahdessa päivässä surmattiin noin tuhat '
        + 'valkoista angolalaista sekä tuntematon määrä siirtomaajärjestystä tukeneita '
        + 'paikallisia. Portugalin armeija vastasi vastakumouksellisella operaatiolla, '
        + 'joka tuhosi kymmeniä kyliä ja jossa kuoli noin kaksikymmentätuhatta ihmistä '
        + 'ennen syyskuuta.'
        + '\n\nLakkoa pidetään ensimmäisenä poliittisena liikkeenä, joka johti tasan '
        + 'kuukautta myöhemmin alkaneeseen Angolan itsenäisyyssotaan ja kolmen vuoden '
        + 'kuluessa Portugalin siirtomaasotaan. Angolassa 4. tammikuuta on nykyään '
        + 'kansallinen muistopäivä.',
      lahde: 'en-Wikipedia "Strike in Baixa do Cassange", johdanto ja osio "Revolts". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä työläiset tekivät henkilökorteilleen?',
        vaihtoehdot: [
          'Vaihtoivat ne keskenään',
          'Lähettivät ne kuvernöörille',
          'Polttivat ne',
        ],
        oikea: 2,
      },
    },
    /*
     * Benguelan rannikko, jonne sisämaan saattueet päättyivät.
     * Lähde: en.wikipedia.org: Henry Nevinson
     */
    {
      id: 'nevinsonin-orjatie',
      otsikko: 'Moderni orjuus 1905 — matka, joka paljasti kaakaon hinnan',
      nimio: 'Orjatie 1905',
      vuosi: '1904–1906',
      paikka: 'Benguelan rannikko, orjatien pääte',
      lat: -12.55, lon: 13.416667,
      kortti: 'Lehti lähetti kirjeenvaihtajan tutkimaan huhua: viedäänkö Angolasta yhä '
        + 'orjia São Tomén kaakaoviljelmille? Neljänsadanviidenkymmenen mailin matkan '
        + 'jälkeen hän seurasi kahleisiin pantujen ihmisten jälkiä rannikolle — ja näki, '
        + 'kuinka viranomaiset "vapauttivat" heidät ja kirjasivat vapaaehtoisiksi '
        + 'työntekijöiksi.',
      teksti: 'Henry Woodd Nevinson oli englantilainen kirjeenvaihtaja, joka oli '
        + 'raportoinut buurisodasta ja Kreikan ja Turkin sodasta. Harper’s Monthly '
        + 'Magazine palkkasi hänet 1904 selvittämään huhuja siitä, että Angolasta vietiin '
        + 'yhä orjia São Tomén kaakaoviljelmille — vaikka orjakauppa oli muodollisesti '
        + 'lakkautettu.'
        + '\n\nNevinson matkasi sisämaahan noin 450 mailia ja löysi ketjun, jossa ihmisiä '
        + 'luovutettiin velkojen kuittaamiseksi tai portugalilaisten asiamiesten '
        + 'ottamina ja vietiin kahleissa rannikon kaupunkeihin. Siellä hän raivostui '
        + 'siitä, mitä näki: viranomaiset "vapauttivat" saapuneet ja muuttivat heidän '
        + 'asemansa vapaaehtoisiksi työntekijöiksi, jotka olivat muka suostuneet '
        + 'lähtemään São Toméen viideksi vuodeksi.'
        + '\n\nNevinson seurasi matkaa perille asti, vaikka hänen terveytensä oli niin '
        + 'huono, että hän pelkäsi tulleensa myrkytetyksi. Viljelmillä olot olivat niin '
        + 'ankarat, että joka viides työntekijä kuoli vuodessa.'
        + '\n\nKertomus julkaistiin jatkokertomuksena elokuusta 1905 alkaen ja kirjana '
        + 'nimellä A Modern Slavery Harper and Bros -kustantamolta 1906. Nevinson jatkoi '
        + 'kampanjoivana toimittajana ja kirjoitti myöhemmin Intiasta Manchester '
        + 'Guardianille sekä toimi ensimmäisessä maailmansodassa sotakirjeenvaihtajana.',
      lahde: 'en-Wikipedia "Henry Nevinson", johdanto ja osio "Reporting"; rannikon '
        + 'orjakaupasta myös en-Wikipedia "Benguela", osio "History". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi Nevinsonin näkemät ihmiset kirjattiin vapaaehtoisiksi?',
        vaihtoehdot: [
          'Koska he olivat maksaneet matkansa itse',
          'Koska orjakauppa oli muodollisesti lakkautettu ja asema piti nimetä uudelleen',
          'Koska he olivat sopineet työstä lähetysaseman kanssa',
        ],
        oikea: 1,
      },
    },
  ],
  CMR: [
    /*
     * Nyosjärvi Luoteis-Kamerunissa.
     * Lähde: en.wikipedia.org: Lake Nyos disaster
     */
    {
      id: 'nyosjarvi-1986',
      otsikko: 'Nyosjärvi 1986 — järvi, joka huokaisi',
      nimio: 'Nyos 1986',
      vuosi: '1986',
      paikka: 'Nyosjärvi, Luoteis-Kamerun',
      lat: 6.44, lon: 10.3,
      kortti: 'Elokuun 21. päivän iltana järvi kääntyi ympäri ja päästi kerralla '
        + 'satojatuhansia tonneja hiilidioksidia. Kaasu on ilmaa raskaampaa, joten se '
        + 'valui laaksoja pitkin kyliin ja tukahdutti nukkuvat: 1 746 ihmistä ja 3 500 '
        + 'kotieläintä.',
      teksti: 'Nyosjärvi on kraatterijärvi Luoteis-Kamerunissa. Sen pohjalle oli '
        + 'kertynyt vuosien mittaan valtava määrä hiilidioksidia, joka pysyi liuenneena '
        + 'syvän veden paineessa. Elokuun 21. päivänä 1986 kerrostuneisuus purkautui, ja '
        + 'järvestä vapautui arviolta 100 000–300 000 tonnia kaasua eli noin 1,2 '
        + 'kuutiokilometriä.'
        + '\n\nLaukaisijaa ei tiedetä. Useimmat geologit epäilevät maanvyörymää, jotkut '
        + 'pientä purkausta järven pohjassa, kolmannet järven pinnan viilenemistä '
        + 'sateessa. Osa tutkijoista huomauttaa, ettei ulkoista syytä välttämättä '
        + 'tarvita lainkaan: hiilidioksidin liukoisuus riippuu lämpötilasta, joten '
        + 'kerrostuneisuus on itsessään epävakaa, ja kun kuplia kerran syntyy, ne '
        + 'nostavat mukanaan lisää kyllästynyttä vettä ja koko järvi kääntyy.'
        + '\n\nKaasupatsas nousi aluksi lähes sadan kilometrin tuntinopeudella, ja pinnalle '
        + 'muodostui sadan metrin vesi- ja vaahtopatsas, joka sinkosi rantaan '
        + 'vähintään 25 metrin aallon. Sitten kaasu laskeutui: se on puolitoista kertaa '
        + 'ilmaa raskaampaa, joten se myötäili maanpintaa noin 50 metrin paksuisena '
        + 'mattona ja valui laaksoja pitkin 20–50 kilometrin tuntivauhdilla. Noin 23 '
        + 'kilometrin matkalla se oli väkevää tarpeeksi tukahduttamaan nukkuvat ihmiset '
        + 'Nyosin, Kamin, Chan ja Subumin kylissä. Järven sininen vesi muuttui '
        + 'punaruskeaksi, kun rautapitoinen syvä vesi hapettui pinnalla.'
        + '\n\nNoin 4 000 asukasta pakeni alueelta, ja moni sai hengitysoireita, ihovaurioita '
        + 'ja halvauksia. Järveen on sittemmin asennettu putkisto, joka poistaa '
        + 'hiilidioksidia. Nyos ja kaksi vuotta aiempi Monounin onnettomuus ovat ainoat '
        + 'kirjatut limniset purkaukset ihmiskunnan historiassa.',
      lahde: 'en-Wikipedia "Lake Nyos disaster", johdanto sekä osiot "Eruption and gas '
        + 'release" ja "Effects on survivors". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi kaasu tappoi juuri laaksojen kylissä?',
        vaihtoehdot: [
          'Kaasu on ilmaa raskaampaa ja valui laaksoja pitkin',
          'Tuuli kääntyi yöllä laaksoihin päin',
          'Kylät olivat järven pintaa korkeammalla',
        ],
        oikea: 0,
      },
    },
    /*
     * Douala, Saksan Kamerunin satamakaupunki.
     * Lähde: en.wikipedia.org: Rudolf Duala Manga Bell
     */
    {
      id: 'duala-manga-bell-1914',
      otsikko: 'Douala 1914 — kuningas, joka kirjoitti kirjeitä',
      nimio: 'Manga Bell 1914',
      vuosi: '1914',
      paikka: 'Douala, Saksan Kamerun',
      lat: 4.05, lon: 9.7,
      kortti: 'Saksan valtiopäivät päätti siirtää dualat pois jokirannasta, jotta '
        + 'rantatontit jäisivät eurooppalaisille. Kuningas vastusti kirjeillä, '
        + 'vetoomuksilla ja juridiikalla. Kun ne sivuutettiin, hän etsi tukea muualta — '
        + 'ja se maksoi hänelle hengen.',
      teksti: 'Rudolf Duala Manga Bell syntyi 1873 Doualassa alueella, josta tuli '
        + 'myöhemmin Saksan Kamerun. Hän oli Bellin sukuhaaran kuninkaan Manga Ndumbe '
        + 'Bellin vanhin poika, kävi koulua sekä Doualassa että Saksassa ja opiskeli '
        + '1890-luvulla Ulmin lukiossa. Isänsä jälkeen hän nousi hallitsijaksi 2. '
        + 'syyskuuta 1908. Alussa hän tuki siirtomaahallintoa ja esiintyi eurooppalaisten '
        + 'hallitsijoiden tapaan; varakkaana miehenä hän peri isältään myös suuret velat.'
        + '\n\nVuonna 1910 Saksan valtiopäivät laati suunnitelman, jossa joen rannalla '
        + 'asuvat dualat siirrettäisiin sisämaahan, jotta rantakaistale jäisi kokonaan '
        + 'eurooppalaisten asuinalueeksi. Manga Bellistä tuli koko duala-kansan '
        + 'vastarinnan johtaja. Hän ja muut päälliköt painostivat hallintoa ensin '
        + 'kirjeillä, vetoomuksilla ja oikeudellisilla perusteluilla, mutta ne joko '
        + 'sivuutettiin tai kumottiin.'
        + '\n\nSitten Manga Bell kääntyi muiden Euroopan hallitusten puoleen ja lähetti '
        + 'edustajia muiden kamerunilaiskansojen johtajille ehdottaen Saksan vallan '
        + 'kaatamista. Bamounien sulttaani Ibrahim Njoya ilmoitti hänen toimistaan '
        + 'viranomaisille, ja kuningas pidätettiin.'
        + '\n\nLyhyen oikeudenkäynnin jälkeen Rudolf Duala Manga Bell hirtettiin '
        + 'maanpetoksesta 8. elokuuta 1914. Kamerunissa hänestä tuli marttyyri, ja '
        + 'tutkijat pitävät hänen toimintaansa varhaisena esimerkkinä kamerunilaisesta '
        + 'kansallisaatteesta.',
      lahde: 'en-Wikipedia "Rudolf Duala Manga Bell", johdanto ja osio "Early life and '
        + 'reign". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi dualat oli määrä siirtää pois jokirannasta?',
        vaihtoehdot: [
          'Rannalle suunniteltiin satamaa',
          'Alue oli tulvaherkkä',
          'Rantakaistale haluttiin kokonaan eurooppalaisten asuinalueeksi',
        ],
        oikea: 2,
      },
    },
  ],
  COD: [
    /*
     * Basankusu, Abir Congo Companyn ensimmäinen kauppa-asema.
     * Lähde: en.wikipedia.org: Casement Report
     */
    {
      id: 'casementin-raportti-1904',
      otsikko: 'Casementin raportti 1904 — kumivero ja sen hinta',
      nimio: 'Casement 1904',
      vuosi: '1903–1908',
      paikka: 'Basankusu, Abirin kauppa-asema',
      lat: 1.222222, lon: 19.802778,
      kortti: 'Kongon vapaavaltio oli Belgian kuninkaan yksityisomaisuutta, ja sen '
        + 'asukkaat maksoivat veronsa kumina. Kun Britannian konsuli matkusti jokea ylös '
        + 'ja kirjasi ylös sen, mitä ihmiset kertoivat, raportti muutti Euroopan '
        + 'mielipiteen — mutta kesti vielä neljä vuotta, ennen kuin kuningas luopui '
        + 'omistuksestaan.',
      teksti: 'Berliinin konferenssi antoi 1885 Kongon vapaavaltion Belgian kuninkaan '
        + 'Leopold II:n yksityiseen omistukseen, ja hän käytti sen luonnonvaroja — '
        + 'ennen kaikkea kumia — oman varallisuutensa kartuttamiseen. Basankusu oli Abir '
        + 'Congo Companyn ensimmäinen kauppa-asema Leopoldvillestä ylävirtaan. Yhtiö sai '
        + 'suuren toimiluvan ja oikeuden verottaa asukkaita kumina; asemat Lopori- ja '
        + 'Maringa-jokien varrella olivat eurooppalaisen asiamiehen johdossa ja aseistettujen '
        + 'vartijoiden turvaamia. Kilo kumia maksoi yhtiölle 1,35 frangia ja myytiin '
        + 'Euroopassa jopa kymmenellä.'
        + '\n\nVeroa perittiin vankeudella, ruoskimisella ja muilla ruumiillisilla '
        + 'rangaistuksilla. Väärinkäytöksistä oli kerrottu jo vuosia: lähetyslääkäri '
        + 'Henry Grattan Guinness sai 1895 kuninkaalta lupauksia, joita ei pidetty, ja '
        + 'toimittaja E. D. Morel kirjoitti asiasta toistuvasti.'
        + '\n\nToukokuun 20. päivänä 1903 Britannian alahuone hyväksyi päätöslauselman, '
        + 'joka vaati hallitusta neuvottelemaan Berliinin sopimuksen muiden '
        + 'allekirjoittajien kanssa epäkohtien poistamisesta. Boman konsuli, irlantilainen '
        + 'Roger Casement, sai tehtäväkseen tutkia asian. Raportti julkaistiin 1904, se '
        + 'kokosi yhteen suuren joukon yksittäisiä kertomuksia tapoista, silpomisista, '
        + 'sieppauksista ja pahoinpitelyistä, ja vahvisti Morelin syytökset.'
        + '\n\nCasement ja Morel perustivat Congo Reform Associationin. Belgian parlamentti '
        + 'pakotti Leopoldin asettamaan riippumattoman tutkintakomission, jonka löydökset '
        + 'vahvistivat raportin kohta kohdalta. Vuonna 1908 parlamentti liitti '
        + 'vapaavaltion Belgiaan Belgian Kongona.',
      lahde: 'en-Wikipedia "Casement Report", johdanto sekä osiot "Publicity 1895–1903" ja '
        + '"Aftermath"; Basankusun osuudesta en-Wikipedia "Basankusu", osio "Abir Congo '
        + 'Company". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Millä tavalla Abirin toimiluvan alueen asukkaat maksoivat veronsa?',
        vaihtoehdot: [
          'Norsunluuna',
          'Kumina',
          'Kuparikiekkoina',
        ],
        oikea: 1,
      },
    },
    /*
     * Shinkolobwen kaivos Haut-Katangassa.
     * Lähde: en.wikipedia.org: Shinkolobwe
     */
    {
      id: 'shinkolobwe',
      otsikko: 'Shinkolobwe — kaivos, jota ei ollut kartoilla',
      nimio: 'Shinkolobwe',
      vuosi: '1915–2004',
      paikka: 'Shinkolobwe, Haut-Katanga',
      lat: -11.054972, lon: 26.547278,
      kortti: 'Katangan malmi oli maailman rikkainta uraania, ja siitä tuli Manhattan-'
        + 'hankkeen raaka-aine. Osa varastosta ehti jäädä Saksan käsiin 1940. Kaivos '
        + 'suljettiin virallisesti vasta 2004 — ja sen nimi tarkoittaa paikallisittain '
        + 'miestä, joka on pinnalta leppoisa mutta suuttuu, kun häntä ärsytetään.',
      teksti: 'Shinkolobwe oli radium- ja uraanikaivos Haut-Katangan maakunnassa Kongon '
        + 'demokraattisessa tasavallassa, noin 20 kilometriä Likasista länteen ja 145 '
        + 'kilometriä Lubumbashista luoteeseen. Englantilainen geologi Robert Rich Sharp '
        + 'löysi esiintymän 1915.'
        + '\n\nMalmi oli maailman taloudellisinta uraania, ja siitä tuli Yhdysvaltain '
        + 'Manhattan-hankkeen ja sitä seuranneiden 1940- ja 1950-luvun ydinaseiden '
        + 'raaka-aine. Ennen toista maailmansotaa täältä louhittu uraani vietiin '
        + 'käsiteltäväksi Belgiaan, ja juuri se varasto joutui 1940 Saksan armeijan '
        + 'haltuun ja päätyi Saksan epäonnistuneeseen ydinohjelmaan.'
        + '\n\nKaivos on geologinen erikoisuus. Uraanimineraalit sekä niiden seurana '
        + 'koboltti, hopea, nikkeli, vismutti ja arseeni esiintyvät massiivisena '
        + 'sulfidimalmina rakojen ja pikkusiirrosten juonteissa Katangan '
        + 'poimurakenteessa; uraninitin kiteytyminen ajoittuu noin 630 miljoonan vuoden '
        + 'taakse. Uraniniittikiteet olivat yleisesti sentin tai neljän kokoisia kuutioita, '
        + 'ja paikalta on tunnistettu useita ennen tuntemattomia mineraaleja.'
        + '\n\nKaivoksen nimi tulee läheisestä, jo kadonneesta kylästä. Sanaa käytetään '
        + 'myös sanontana: se tarkoittaa miestä, joka on pinnalta rauhallinen mutta '
        + 'suuttuu, kun häntä ärsytetään. Kaivos suljettiin virallisesti 2004.',
      lahde: 'en-Wikipedia "Shinkolobwe", johdanto sekä osiot "Toponym" ja "Geology". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mihin Shinkolobwen uraania käytettiin 1940-luvulla?',
        vaihtoehdot: [
          'Manhattan-hankkeen ydinaseisiin',
          'Kaivoslamppujen valoaineeksi',
          'Sairaaloiden röntgenlaitteisiin',
        ],
        oikea: 0,
      },
    },
  ],
  SDS: [
    /*
     * Kodok eli entinen Fashoda Valkoisen Niilin varrella.
     * Lähde: en.wikipedia.org: Fashoda Incident
     */
    {
      id: 'fashoda-1898',
      otsikko: 'Fashoda 1898 — kaksi lippua saman linnakkeen edessä',
      nimio: 'Fashoda 1898',
      vuosi: '1898',
      paikka: 'Kodok (Fashoda), Valkoinen Niili',
      lat: 9.8875, lon: 32.110278,
      kortti: 'Sadanneljänkymmenen hengen ranskalaisretkikunta käveli neljätoista '
        + 'kuukautta halki Afrikan ja pystytti lipun autiolle Niilin linnakkeelle. '
        + 'Kymmenen viikkoa myöhemmin paikalle saapui viisi brittiläistä tykkivenettä ja '
        + '1 500 sotilasta. Miehet joivat viskiä yhdessä; Pariisissa ja Lontoossa '
        + 'valmistauduttiin sotaan.',
      teksti: 'Fashodan selkkaus oli Britannian ja Ranskan siirtomaakiistojen huipentuma '
        + 'Itä-Afrikassa 10. heinäkuuta ja 3. marraskuuta 1898 välillä. Ranska tavoitteli '
        + 'yhtenäistä vyöhykettä Nigeriltä Niilille ja lähetti kapteeni Jean-Baptiste '
        + 'Marchandin viemään Fashodan seudun Ranskan suojelukseen. Retkikunta lähti '
        + 'Brazzavillesta belgialaisella höyrylaivalla, nousi Ubangi-jokea niin pitkälle '
        + 'kuin pääsi ja marssi sitten viidakon ja pensaikon halki Sudanin aavikoille '
        + 'sata tonnia varusteita mukanaan — muun muassa kasattava teräshöyryvene, jonka '
        + 'kattila painoi tonnin.'
        + '\n\nNeljätoista kuukautta kestäneen taipaleen jälkeen Marchandin joukko saapui '
        + 'Fashodaan 10. heinäkuuta 1898. Idästä luvatut tukiretkikunnat eivät '
        + 'päässeet perille, joten sata kaksikymmentä senegalilaista tirailleuria ja '
        + 'kourallinen ranskalaisupseereita olivat yksin satojen kilometrien päässä '
        + 'kaikesta avusta.'
        + '\n\nSyyskuun 18. päivänä joelle ilmestyi viisi brittiläistä tykkivenettä ja '
        + 'niissä 1 500 brittiläistä, egyptiläistä ja sudanilaista sotilasta Herbert '
        + 'Kitchenerin johdolla. Kitchener oli juuri voittanut Omdurmanin taistelun. Hän '
        + 'saapui linnakkeelle 19. syyskuuta egyptiläisessä univormussa ja vaati '
        + 'Egyptin lipun nostoa — kauas Ranskan lipusta. Marchand suostui sillä ehdolla, '
        + 'ettei lippu ratkaise alueen asemaa.'
        + '\n\nKomentajat käyttäytyivät hillitysti: Kitchener kohotti maljan Marchandille '
        + 'viskillä, jonka juomista ranskalainen kutsui yhdeksi suurimmista uhrauksistaan '
        + 'isänmaan hyväksi. Euroopassa kriisi kiihtyi kuitenkin sotapeloksi, ja '
        + 'kuninkaallinen laivasto laati sotakäskyjä. Ranskan hallitus määräsi joukkonsa '
        + 'hiljaisesti vetäytymään 3. marraskuuta.',
      lahde: 'en-Wikipedia "Fashoda Incident", johdanto sekä osiot "Marchand expedition", '
        + '"Kitchener\'s Advance" ja "French withdrawal". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten Fashodan kriisi ratkesi?',
        vaihtoehdot: [
          'Ranska vetäytyi paikalta marraskuussa',
          'Britannia luovutti linnakkeen Ranskalle',
          'Alue jaettiin kahtia joen mukaan',
        ],
        oikea: 0,
      },
    },
    /*
     * Deim Zubeir, orjakauppiaan päämaja Bahr el Ghazalissa.
     * Lähde: en.wikipedia.org: Al-Zubayr Rahma Mansur
     */
    {
      id: 'zubayrin-zaribat',
      otsikko: 'Zubayrin zaribat 1873 — orjakauppias, josta tehtiin kuvernööri',
      nimio: 'Zubayr 1873',
      vuosi: '1856–1873',
      paikka: 'Deim Zubeir, Bahr el Ghazal',
      lat: 7.716667, lon: 26.216667,
      kortti: 'Khartumista lähti 1856 pieni armeija perustamaan varustettuja '
        + 'kauppa-asemia. Kolmenkymmenen zariban verkosto kasvoi valtioksi valtion '
        + 'sisällä, ja kun Egyptin kediivi lähetti palkka-armeijan kukistamaan sen, '
        + 'armeija hävisi. Niinpä kediivi teki toisin: hän nimitti orjakauppiaan '
        + 'kuvernööriksi.',
      teksti: 'Al-Zubayr Rahma Mansur syntyi noin 1830 Pohjois-Sudanissa ja aloitti '
        + 'suuren mittakaavan kauppansa 1856 lähtemällä Khartumista pienen armeijan '
        + 'kanssa. Hän rakensi verkoston varustettuja kauppa-asemia eli zaribia, joiden '
        + 'toiminta keskittyi orjakauppaan ja norsunluuhun. Laajimmillaan hänen '
        + 'kauppavaltakuntansa hallitsi suurta osaa Bahr el Ghazalista sekä alueita '
        + 'nykyisen Tšadin ja Keski-Afrikan tasavallan puolella.'
        + '\n\nVuonna 1871 saksalainen tutkimusmatkailija Georg Schweinfurth vieraili '
        + 'hänen päämajassaan Deim Zubeirissa ja kuvasi orjakauppiaan hovia "vähintäänkin '
        + 'ruhtinaalliseksi".'
        + '\n\nEgyptin kediivi Isma\'il Pasha halusi alueen hallintaansa ja lähetti sitä '
        + 'vastaan palkka-armeijan, mutta Rahma voitti sen. Niinpä kediivi liitti alueen '
        + 'valtakuntaansa toisella tavalla: hän tunnusti 1873 Rahman vallan ja nimitti '
        + 'hänet Bahr el Ghazalin kuvernööriksi. Lopulta Rahma hallitsi kolmeakymmentä '
        + 'zaribaa ja sai beyn ja pashan arvot; Darfurin valtauksessa hän johti '
        + 'eteläisiä joukkoja, ja häntä kutsuttiin mustaksi pashaksi.'
        + '\n\nKun kenraali Charles Gordon saapui 1877 Sudanin kuvernööriksi, hänestä ja '
        + 'Rahmasta tuli vastustajia. Britanniassa Rahma sai lähes myyttisen maineen '
        + 'Gordonin arkkivihollisena: häntä sanottiin "rikkaimmaksi ja pahimmaksi" ja '
        + 'kerrottiin, että hänen saattueeseensa kuului kahlehdittuja leijonia.',
      lahde: 'en-Wikipedia "Al-Zubayr Rahma Mansur", johdanto sekä osiot "Background" ja '
        + '"Opposition to Gordon". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi kediivi nimitti Rahman kuvernööriksi?',
        vaihtoehdot: [
          'Rahma oli luopunut orjakaupasta',
          'Rahma oli voittanut häntä vastaan lähetetyn armeijan',
          'Britannia vaati sitä sopimuksessa',
        ],
        oikea: 1,
      },
    },
  ],
  /*
   * ══ ERÄ M8, AASIA 2 6.9.2026 ════════════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M8 (NPL, THA, VNM, SGP, TLS) tuo kaksi skandaalia kuhunkin
   * viiteen maahan — kymmenen uutta. Kaikki ovat kuvattomia kuten erän
   * muutkin nostot, ja jokaisen lähderivi nimeää en-Wikipedian
   * artikkelin ja osan sekä tarkistuspäivän.
   *
   * PAIKAT ON MITATTU. Yksikään uusi merkki ei ole pelikaupungin
   * kohdalla (KAUPUNGIN_KOHDALLA_SADE 7 lautayksikköä,
   * js/fokuskohteet.js): lähin on Hanoin rottapalkkiot 12,8 yksikön
   * päässä Hanoi-laatasta ja kaukaisin Hội Anin hylky 194,9 yksikön
   * päässä Hanoista.
   *
   * KAKSI MERKKIÄ ON SIIRRETTY KOHDEKARTAN RUUDUN ULKOPUOLELLE, ja syy
   * on sama kuin Hongkongin Carrianilla erässä M3: kohdekartan
   * rajauksessa oleva skandaali kuuluu kohdekartan pisteelle eikä
   * pääkartalle (tools/tarkista-nostopaikat.mjs). Singaporen
   * kohdekartta (js/packs/maakartat.js singapore) rajautuu ruutuun lat
   * 1,276–1,308 ja lon 103,836–103,874, ja sekä Barings Futuresin
   * toimisto että pörssi osuvat sen sisään; merkit on siksi asetettu
   * ruudun itäpuolelle ja saaren koilliskärkeen Changiin. Kummankin
   * kortin `paikka`-rivi kertoo oikean osoitteen.
   *
   * HERKKIEN KOHTEIDEN LINJAUS ON SITOVA (docs/aasia-tyoaineisto/
   * spec-asia.md). Nepalin sisällissodasta, Vietnamin sodasta ja
   * Itä-Timorin miehityksestä ei kirjoiteta näissä korteissa
   * lainkaan: Nepalin aiheet ovat 1911 ja 1960, Vietnamin 1902 ja
   * 1990-luku, Itä-Timorin 1769 ja 1911–1912. Nykypolitiikkaa ei ole
   * yhdelläkään kortilla.
   */
  NPL: [
    /*
     * Khumjung, Solukhumbu (luostari, jossa päänahkaa säilytetään).
     * Lähde: en.wikipedia.org: Yeti; Khumjung
     */
    {
      id: 'khumjungin-paanahka',
      otsikko: 'Jetin päänahka, joka lensi Lontooseen',
      nimio: 'Jetin päänahka',
      vuosi: '1960–1961',
      paikka: 'Khumjungin luostari, Solukhumbu',
      lat: 27.816667, lon: 86.716667,
      kortti: 'Everestin ensinousija palasi Himalajalle etsimään todisteita '
        + 'lumimiehestä. Hän lainasi vuoristokylän luostarilta sen kalleimman '
        + 'esineen, karvaisen päänahan, ja vei sen kylänvanhimman kanssa '
        + 'Lontooseen tutkittavaksi. Vastaus tuli mikroskoopista eikä '
        + 'vuorilta.',
      teksti: 'Jeti on Himalajalla asuvaksi kerrottu suuri karvainen '
        + 'ihmisenkaltainen olento, josta länsimaissa käytetään myös nimeä '
        + 'inhottava lumimies. Vuonna 1953 Edmund Hillary ja Tenzing Norgay '
        + 'kertoivat nähneensä Everestillä suuria jalanjälkiä, mutta Hillary '
        + 'piti myöhemmin jetihavaintoja epäluotettavina.'
        + '\n\nVuonna 1960 Hillary lähti Himalajalle Silver Hut -retkikunnan '
        + 'kanssa nimenomaan keräämään ja tutkimaan aineellisia todisteita '
        + 'jetistä. Khumjungin luostarissa säilytettiin esinettä, jota '
        + 'pidettiin jetin päänahkana. Hillary lainasi sen ja matkusti sen '
        + 'kanssa Lontooseen yhdessä kylänvanhimman Khumjo Chumbin kanssa.'
        + '\n\nLontoossa nahasta leikattiin pieni näyte. Marca Burns tutki '
        + 'ihon ja karvat yksityiskohtaisesti ja vertasi niitä vastaaviin '
        + 'näytteisiin serausta, tiibetinsinikarhusta ja mustakarhusta. '
        + 'Johtopäätös oli varovainen mutta selvä: näyte oli mitä '
        + 'todennäköisimmin tehty eläimen nahasta, joka muistuttaa läheisesti '
        + 'tutkittua seraunäytettä mutta ei ole täsmälleen sama — kenties '
        + 'saman lajin paikallinen muoto tai lähisukulainen.'
        + '\n\nPäänahka palautettiin Khumjungiin, jossa se on yhä. Myöhemmät '
        + 'tutkimukset ovat toistaneet saman kuvion: 2008 BBC kertoi '
        + 'Koillis-Intiasta kerätyistä karvoista, joita tutkittiin Oxford '
        + 'Brookesin yliopistossa, ja lopulta niidenkin todettiin olevan '
        + 'himalajangoralin karvoja.',
      lahde: 'en-Wikipedia "Yeti", osio "History and sightings" (20th century), '
        + 'ja "Khumjung", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mistä eläimestä Khumjungin päänahan todettiin olevan peräisin?',
        vaihtoehdot: [
          'Ruskeakarhusta',
          'Serausta muistuttavasta eläimestä',
          'Jakista',
        ],
        oikea: 1,
      },
    },
    /*
     * Thorin ja Kasran leirit, Chitwanin Terai (metsästysretken alue).
     * Lähde: en.wikipedia.org: 1911 hunt by George V in Nepal
     */
    {
      id: 'yrjo-v-metsastysretki',
      otsikko: 'Kymmenen päivää, 39 tiikeriä',
      nimio: 'Yrjö V:n jahti',
      vuosi: '1911',
      paikka: 'Chitwanin Terai, Nepal',
      lat: 27.5, lon: 84.333333,
      kortti: 'Nepalin pääministeri keräsi kuukausien ajan 645 norsua ja '
        + 'härkää ja sitoi ne viidakkoon houkuttimiksi. Vieraana oli '
        + 'Britannian kuningas, jonka seurue oli kahdentoistatuhannen hengen '
        + 'kokoinen. Kymmenessä päivässä kaadettiin enemmän riistaa kuin '
        + 'useimmat museot omistavat.',
      teksti: 'Britannian hallitsijoiden metsästysretket Nepaliin alkoivat '
        + '1876, kun pääministeri Jung Bahadur Rana kutsui prinssi Albert '
        + 'Edwardin retkelle, jolla kaadettiin kahdessa viikossa noin 23 '
        + 'tiikeriä. Myöhemmin kutsuttuja olivat muun muassa arkkiherttua '
        + 'Frans Ferdinand ja lordi Curzon.'
        + '\n\nVuonna 1911 pääministeri Chandra Shumsher Jang Bahadur Rana '
        + 'kutsui kuningas Yrjö V:n suurriistan metsästykseen Teraille. '
        + 'Valmistelut kestivät kuukausia. Kuningas Prithvi Bir Bikram Shah '
        + 'kuoli 11. joulukuuta, mutta valmisteluja ei keskeytetty. Tuhannet '
        + 'ajomiehet ohjasivat riistaa kohti valmiita ampumapaikkoja.'
        + '\n\nSeurue saapui Nepaliin 18. joulukuuta ja jäi kymmeneksi '
        + 'päiväksi. Joka yö asetettiin syöttejä tiikerien houkuttelemiseksi. '
        + 'Yhtenä päivänä norsurenkaan sisään jäi neljä tiikeriä kerralla, ja '
        + 'kuningas ampui ne kaikki. Retken saldo oli 39 tiikeriä, 18 '
        + 'sarvikuonoa, neljä karhua sekä useita piikkisikoja ja leopardeja. '
        + 'Jouluaattona kuningas löi Chandra Shumsherin Kuninkaallisen '
        + 'Victorian ritarikunnan ritariksi.'
        + '\n\nJälkimaine on toisenlainen kuin aikalaisten. Sanjib Chaudhary '
        + 'kuvasi retkeä 2018 mitä raaimmaksi ja kauheimmaksi '
        + 'metsästysmatkaksi. Alue, jolla suurin osa jahdista käytiin, '
        + 'muutettiin 1973 Nepalin ensimmäiseksi kansallispuistoksi.',
      lahde: 'en-Wikipedia "1911 hunt by George V in Nepal", johdanto sekä '
        + 'osiot "Planning", "The hunt" ja "Legacy". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä alueelle tehtiin myöhemmin, vuonna 1973?',
        vaihtoehdot: [
          'Siitä tuli Nepalin ensimmäinen kansallispuisto',
          'Se raivattiin riisipelloiksi',
          'Sinne rakennettiin lentokenttä',
        ],
        oikea: 0,
      },
    },
  ],
  THA: [
    /*
     * Lopburi, kuningas Narain hovikaupunki (vallankaappauksen paikka).
     * Lähde: en.wikipedia.org: Constantine Phaulkon
     */
    {
      id: 'phaulkonin-nousu',
      otsikko: 'Kreikkalainen, josta tuli Siamin pääministeri',
      nimio: 'Phaulkon',
      vuosi: '1647–1688',
      paikka: 'Lopburi, Ayutthayan kuningaskunta',
      lat: 14.7995, lon: 100.6534,
      kortti: 'Kefalonialainen laivapoika päätyi Siamin hoviin ja nousi '
        + 'kuninkaan lähimmäksi neuvonantajaksi. Hän hoiti valtakunnan '
        + 'ulkosuhteet ja kaupan ja avasi ovet Ludvig XIV:n lähettiläille. '
        + 'Kun kuningas sairastui, hovin kateus kääntyi häntä vastaan.',
      teksti: 'Constantine Phaulkon syntyi 1647 kreikkalaisille vanhemmille '
        + 'Kefalonian pohjoisosassa, joka oli silloin Venetsian hallussa. Hän '
        + 'päätyi Siamiin ja nousi kuningas Narain suosioon: kertomusten '
        + 'mukaan hän muun muassa tarkasti kruunun tilit ja osoitti, että '
        + 'persialaiset kauppiaat olivat velkaa valtiolle eivätkä toisin '
        + 'päin.'
        + '\n\nPhaulkonista tuli Narain pääministeri ja hän sai siamilaisen '
        + 'aatelisarvon Chao Phraya Wichayen. Hän ohjasi valtakunnan '
        + 'ulkopolitiikkaa ja kauppaa ja rakensi läheiset suhteet Ranskan '
        + 'hoviin. Vuonna 1682 hän vaihtoi anglikaanisuuden katolisuuteen ja '
        + 'avioitui Maria Guyomar de Pinhan kanssa.'
        + '\n\nLäheisyys kuninkaaseen synnytti kateutta. Kun Narai sairastui '
        + 'parantumattomasti, levisi huhu, että Phaulkon aikoi käyttää '
        + 'kruununperillistä sätkynukkena ja hallita itse. Se antoi Narain '
        + 'kasvatusveljelle Phetrachalle perusteen vallankaappaukseen. '
        + 'Lopburissa 31. maaliskuuta 1688 Phaulkon suunnitteli ranskalaisen '
        + 'marsalkka Desfargesin kanssa juonen torjumista, mutta huhtikuussa '
        + 'Desfarges jäi omaan linnakkeeseensa Bangkokiin.'
        + '\n\nToukokuun 18. päivänä kuningas ja kruununperillinen '
        + 'pidätettiin. Phaulkon kutsuttiin palatsiin, riisuttiin aseista ja '
        + 'vangittiin. Kesäkuun 5. päivänä 1688 Phetracha julisti hänet '
        + 'syylliseksi maanpetokseen, ja hänet teloitettiin Wat Sakin '
        + 'seudulla. Ranskan ja Siamin läheinen kausi päättyi siihen.',
      lahde: 'en-Wikipedia "Constantine Phaulkon", johdanto sekä osiot '
        + '"Origins", "Rise to power" ja "Downfall and death". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä huhu antoi Phetrachalle perusteen vallankaappaukseen?',
        vaihtoehdot: [
          'Että Phaulkon oli varastanut valtion kassan',
          'Että Phaulkon aikoi hallita kruununperillisen kautta itse',
          'Että Phaulkon oli myynyt Ayutthayan kartat hollantilaisille',
        ],
        oikea: 1,
      },
    },
    /*
     * Lampangin maakunta (varastetun lastin määränpää).
     * Lähde: en.wikipedia.org: Blue Diamond Affair
     */
    {
      id: 'sininen-timantti',
      otsikko: 'Sininen timantti, joka ei koskaan palannut',
      nimio: 'Sininen timantti',
      vuosi: '1989–1990',
      paikka: 'Lampangin maakunta, Thaimaa',
      lat: 18.2888, lon: 99.4908,
      kortti: 'Palvelija piilotti yhdeksänkymmentäyksi kiloa jalokiviä '
        + 'pölynimurin pussiin ja lähetti ne kotiin pohjoiseen Thaimaahan. '
        + 'Poliisi sai lastin takaisin ja lensi sen Riadiin. Siellä '
        + 'huomattiin, että puolet kivistä oli väärennöksiä.',
      teksti: 'Vuonna 1989 thaimaalainen työntekijä Kriangkrai Techamong '
        + 'varasti prinssi Faisal bin Fahdin palatsista Riadista 91 kiloa '
        + 'koruja ja jalokiviä. Hänellä oli pääsy prinssin makuuhuoneeseen, '
        + 'ja hän piilotti saaliin palatsissa pölynimurin pussiin. Joukossa '
        + 'oli 50 karaatin sininen timantti. Kivet lähetettiin hänen '
        + 'kotiinsa Lampangin maakuntaan Thaimaahan.'
        + '\n\nKivistä oli vaikea päästä eroon, ja Kriangkrai alkoi myydä '
        + 'niitä pilkkahintaan. Bangkokilainen jalokivikauppias Santhi '
        + 'Sithanakan kuuli kaupoista ja osti suurimman osan murto-osalla '
        + 'niiden arvosta. Thaimaan poliisin tutkinta luutnanttikenraali '
        + 'Chalor Kerdthesin johdolla johti pidätykseen ja korujen '
        + 'takaisinsaantiin. Kriangkrai tuomittiin seitsemäksi vuodeksi ja '
        + 'vapautui kolmen vuoden jälkeen.'
        + '\n\nChalorin ryhmä lensi korut takaisin Saudi-Arabiaan. Siellä '
        + 'havaittiin, että sininen timantti puuttui ja että noin puolet '
        + 'palautetuista kivistä oli väärennöksiä. Bangkokissa levisi lehdissä '
        + 'huhuja hyväntekeväisyysjuhlien valokuvista, joissa virkamiesten '
        + 'vaimoilla näkyi palatsista varastettuja muistuttavia kaulakoruja.'
        + '\n\nTapaus mutkistui vielä pahemmin. Saudiarabialainen liikemies '
        + 'Mohammad al-Ruwaili katosi Bangkokissa 12. helmikuuta 1990, ja '
        + 'kolme saudidiplomaattia oli surmattu kaupungissa kaksi viikkoa '
        + 'aiemmin; murhat ovat yhä selvittämättä. Chalor tuomittiin '
        + 'myöhemmin kuolemaan jalokivikauppiaan vaimon ja pojan murhien '
        + 'tilaamisesta, ja tuomio muutettiin vankeudeksi.',
      lahde: 'en-Wikipedia "Blue Diamond Affair", johdanto sekä osiot '
        + '"Theft", "Recovery" ja "Investigation". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä Saudi-Arabiassa huomattiin, kun korut palautettiin?',
        vaihtoehdot: [
          'Kaikki kivet olivat tallella',
          'Lasti oli kadonnut matkalla',
          'Sininen timantti puuttui ja puolet kivistä oli väärennöksiä',
        ],
        oikea: 2,
      },
    },
  ],
  VNM: [
    /*
     * Hanoin ympäryskylät, Tonkin (rottatarhat kaupungin ulkopuolella).
     * Lähde: en.wikipedia.org: Great Hanoi Rat Massacre
     *
     * MERKKI ON KAUPUNGIN ULKOPUOLELLA EIKÄ VIEMÄREISSÄ, ja syy on
     * karttatekninen: Hanoi on pelikaupunki, ja sen laatan ympärillä
     * seitsemän lautayksikön säteellä oleva nosto ei tule pääkartalle
     * (KAUPUNGIN_KOHDALLA_SADE, js/fokuskohteet.js). Merkki on siksi
     * siellä, missä terveystarkastajat löysivät rottatarhat: Hanoin
     * ulkopuolisella maaseudulla, 12,8 yksikköä laatasta itään.
     */
    {
      id: 'hanoin-rottapalkkiot',
      otsikko: 'Palkkio rotanhännästä ja hännättömät rotat',
      nimio: 'Rottapalkkiot',
      vuosi: '1902',
      paikka: 'Hanoi ja sen ympäryskylät, Tonkin',
      lat: 20.85, lon: 106.15,
      kortti: 'Ranskan siirtomaahallinto halusi puhdistaa uuden viemäristönsä '
        + 'rotista ja lupasi sentin jokaisesta tapetusta. Todisteeksi riitti '
        + 'häntä. Pian kaupungilla juoksi terveitä rottia ilman häntää, ja '
        + 'maaseudulle ilmestyi tarhoja.',
      teksti: 'Vuonna 1902 Ranskan Indokiinan kenraalikuvernementti ryhtyi '
        + 'hävittämään Hanoin rottakantaa. Kaupunkiin oli juuri rakennettu '
        + 'viemäristö, ja maailmalla oli menossa ruttopandemia, jonka '
        + 'levittäjiksi Alexandre Yersin oli muutamaa vuotta aiemmin '
        + 'osoittanut jyrsijät.'
        + '\n\nEnsin palkattiin ammattirotanpyytäjiä, jotka laskeutuivat '
        + 'viemäreihin. Huhtikuun viimeisellä viikolla kaadettiin 7 985 '
        + 'rottaa, toukokuun 30. päivänä 15 041 ja kesäkuun 21. päivänä '
        + 'peräti 20 112 yhtenä päivänä. Kanta ei silti pienentynyt, ja '
        + 'pyytäjät alkoivat lakkoilla vaatien parempaa palkkaa työstä, jota '
        + 'tehtiin jätevedessä käärmeiden ja tuhatjalkaisten seassa.'
        + '\n\nSeuraavaksi hallinto avasi jahdin kaikille ja lupasi sentin '
        + 'palkkion rottaa kohti. Ruumiiden sijaan virastoon vietiin pelkkä '
        + 'häntä. Aluksi häntiä tuli runsaasti, mutta pian kaupungilla nähtiin '
        + 'terveitä rottia, joilta häntä oli katkaistu: pyytäjät päästivät '
        + 'ne takaisin lisääntymään. Rottia myös salakuljetettiin kaupunkiin '
        + 'muualta, ja terveystarkastajat löysivät maaseudulta tarhoja, joissa '
        + 'rottia kasvatettiin pelkkien häntien takia.'
        + '\n\nPalkkiojärjestelmä lakkautettiin. Rottia oli enemmän kuin '
        + 'ennen, ja vuonna 1903 rutto tarttui 159 ihmiseen, joista 110 '
        + 'kuoli. Tapaus tunnetaan nykyään kouluesimerkkinä nurinkurisesta '
        + 'kannustimesta.',
      lahde: 'en-Wikipedia "Great Hanoi Rat Massacre", johdanto sekä osiot '
        + '"First attempts to control the rat population", "Hiring vigilantes '
        + 'and the unintended consequences" ja "Aftermath". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi hallinto lopetti palkkiojärjestelmän?',
        vaihtoehdot: [
          'Rahat loppuivat kesken',
          'Rottia oli lopulta enemmän kuin ennen',
          'Viemärit tulvivat ja työ kävi mahdottomaksi',
        ],
        oikea: 1,
      },
    },
    /*
     * Cù Lao Chàmin edusta, Hội Anin ulkopuolella (hylyn paikka).
     * Lähde: en.wikipedia.org: Hội An wreck
     */
    {
      id: 'hoi-anin-hylky',
      otsikko: 'Kolmesataatuhatta ruukkua seitsemänkymmenen metrin syvyydessä',
      nimio: 'Hội Anin hylky',
      vuosi: '1990–2000',
      paikka: 'Cù Lao Chàmin edusta, Quảng Nam',
      lat: 16.04, lon: 108.6,
      kortti: 'Kalastajat löysivät 1990-luvun alussa hylyn, jonka lasti oli '
        + 'yksinomaan vietnamilaista keramiikkaa. Ennen kuin viranomaiset '
        + 'ehtivät paikalle, hylkyä oli jo raahattu koukuilla vuosien ajan. '
        + 'Pelastusoperaatiosta tuli Kaakkois-Aasian suurin.',
      teksti: 'Hylky lepää Etelä-Kiinan merellä noin 22 meripeninkulmaa '
        + 'Keski-Vietnamin rannikolta ja 70 metrin syvyydessä. Se kuljetti '
        + '1400-luvun puolivälin ja lopun vietnamilaista keramiikkaa, joka '
        + 'oli valmistettu Punaisenjoen suiston uuneissa, kuten Chu Dausissa. '
        + 'Löytö oli poikkeuksellinen, koska ehjät kappaleet olivat harvinaisia '
        + '— lähes koko tuotanto oli aikanaan viety maasta.'
        + '\n\nKalastajat löysivät paikan 1990-luvun alussa. Vuosien ajan '
        + 'kohdetta ryöstettiin järjestelmällisesti: menetelmänä oli raahata '
        + 'koukkurivistöä verkkoineen hylyn yli, jotta esineet irtoaisivat ja '
        + 'jäisivät verkkoihin. Esineitä ilmestyi markkinoille eri puolilla '
        + 'maailmaa. Viranomaiset saivat vihiä vasta, kun Da Nangin '
        + 'lentoasemalla pidätettiin kaksi kauppiasta, joiden matkalaukut '
        + 'olivat täynnä hylyn keramiikkaa.'
        + '\n\nKohde oli tavallista sukellussyvyyttä syvemmällä, mutta jotain '
        + 'oli tehtävä nopeasti. Vuonna 1996 liikemies Ong Soo Hin ja Oxfordin '
        + 'yliopiston arkeologi Mensun Bound aloittivat kaivauksen yhdessä '
        + 'Vietnamin kansallismuseon kanssa. Työ kesti neljä vuotta ja maksoi '
        + 'arviolta neljätoista miljoonaa dollaria; talteen saatiin yli '
        + '250 000 ehjää esinettä.'
        + '\n\nVietnamilainen asiantuntijaryhmä valitsi ainutlaatuiset '
        + 'kappaleet kansalliskokoelmaan, ja kuusi museota pitää niistä '
        + 'pysyvää näyttelyä. Loput yhdeksänkymmentä prosenttia myytiin '
        + 'huutokaupalla San Franciscossa vuonna 2000.',
      lahde: 'en-Wikipedia "Hội An wreck", johdanto ja osio "History". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten viranomaiset saivat tiedon hylyn ryöstelystä?',
        vaihtoehdot: [
          'Sukeltaja ilmoitti siitä poliisille',
          'Kalastajat kertoivat siitä museolle',
          'Lentoasemalla pidätettiin kauppiaat, joiden laukut olivat täynnä keramiikkaa',
        ],
        oikea: 2,
      },
    },
  ],
  SGP: [
    /*
     * Barings Futures Singapore, Raffles Place (kaupankäynnin paikka).
     * Lähde: en.wikipedia.org: Barings Bank
     *
     * MERKKI ON RUUDUN ITÄPUOLELLA, koska Singaporen kohdekartta
     * (js/packs/maakartat.js singapore) rajautuu ruutuun lat
     * 1,276–1,308 ja lon 103,836–103,874 ja Raffles Place osuu sen
     * keskelle. Kohdekartan rajauksessa oleva skandaali kuuluu
     * kohdekartan pisteelle eikä pääkartalle
     * (tools/tarkista-nostopaikat.mjs), eikä tässä erässä lisätä
     * kohdekartan pisteitä.
     */
    {
      id: 'baringsin-romahdus',
      otsikko: 'Kaksisataakolmekymmentäkolme vuotta ja yksi kauppias',
      nimio: 'Barings',
      vuosi: '1992–1995',
      paikka: 'Barings Futures Singapore, Raffles Place',
      lat: 1.29, lon: 103.885,
      kortti: 'Britannian vanhin liikepankki antoi saman miehen käydä kauppaa '
        + 'ja tarkistaa omat kauppansa. Kolmessa vuodessa hän oli hukannut '
        + 'kaksi kertaa pankin kaupankäyntipääoman verran rahaa. Kobe järisi, '
        + 'ja peli oli pelattu.',
      teksti: 'Barings Bank perustettiin Lontoossa 1762, ja se oli Englannin '
        + 'vanhimpia liikepankkeja. Sen kaatoi 1995 valtava '
        + 'kaupankäyntitappio, jonka aiheutti Singaporen johdannaiskaupan '
        + 'päällikkö Nick Leeson.'
        + '\n\nLeesonin tehtävä oli arbitraasi: hyötyä Nikkei 225 '
        + '-futuurisopimusten hintaerosta Osakan pörssin ja Singaporen SIMEXin '
        + 'välillä ostamalla toisesta ja myymällä heti toisesta pienellä '
        + 'katteella asiakkaan lukuun. Sen sijaan hän alkoi tammikuun 1992 '
        + 'lopulla tehdä samoja kauppoja pankin omalla rahalla ja veikata '
        + 'Japanin markkinoiden suuntaa.'
        + '\n\nVirhe oli rakenteellinen. Leeson oli SIMEXin kaupankäynnin '
        + 'johtaja mutta samalla myös yksikön selvitystoiminnan päällikkö eli '
        + 'vastasi omien kauppojensa kirjanpidon oikeellisuudesta. Tehtävät '
        + 'olisivat normaalisti kuuluneet eri ihmisille. Hän saattoi toimia '
        + 'ilman Lontoon valvontaa, väärensi kaupankäyntitietoja '
        + 'tietojärjestelmiin ja piilotti tappiot niin sanotulle '
        + 'viisi-kahdeksan-tilille. Useat ihmiset olivat esittäneet huolensa, '
        + 'mutta niitä ei kuunneltu.'
        + '\n\nKoben maanjäristys järkytti Aasian markkinoita, ja Leeson '
        + 'veikkasi Nikkein nopeaa toipumista. Sitä ei tullut. Kun tappiot '
        + 'löytyivät 23. helmikuuta 1995, ne olivat 827 miljoonaa puntaa eli '
        + 'kaksinkertaiset pankin kaupankäyntipääomaan nähden. Barings '
        + 'julistettiin maksukyvyttömäksi 26. helmikuuta, ja Leeson tuomittiin '
        + 'kuudeksi ja puoleksi vuodeksi vankeuteen Changissa.',
      lahde: 'en-Wikipedia "Barings Bank", osiot "1992–1995", "Internal '
        + 'control", "Kobe earthquake" ja "Discovery". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä valvonnassa oli rakenteellisesti pielessä?',
        vaihtoehdot: [
          'Sama mies kävi kauppaa ja vastasi omien kauppojensa selvityksestä',
          'Pankilla ei ollut lainkaan tilintarkastajaa',
          'Kaupat tehtiin puhelimitse ilman kirjauksia',
        ],
        oikea: 0,
      },
    },
    /*
     * Pörssin ja yhtiön kotipaikka Singaporen ydinkeskustassa.
     * Lähde: en.wikipedia.org: Pan-Electric Industries
     *
     * MERKKI ON SAAREN KOILLISKÄRJESSÄ CHANGISSA samasta syystä kuin
     * Barings: kohdekartan rajauksessa oleva skandaali kuuluu
     * kohdekartan pisteelle eikä pääkartalle. Lisäksi Singaporen
     * karttatila on täynnä — ruudun lounaispuolella nimiö osui
     * Kasvitieteellisen puutarhan, Haw Par Villan ja Bukit Timahin
     * päälle (tools/tarkista-nimiolimitys.mjs), ja Changi oli ainoa
     * kohta, jossa limityksiä on nolla.
     */
    {
      id: 'pan-electric',
      otsikko: 'Kolme päivää, jolloin pörssi oli kiinni',
      nimio: 'Pan-Electric',
      vuosi: '1985',
      paikka: 'Singaporen pörssi, Singapore',
      lat: 1.3898, lon: 103.9877,
      kortti: 'Meripelastukseen erikoistuneella yhtiöllä oli 71 tytäryhtiötä '
        + 'ja 230 miljoonan dollarin markkina-arvo. Joulukuussa 1985 sen '
        + 'termiinisopimukset jäivät maksamatta, ja kaksi pörssiä suljettiin '
        + 'kolmeksi päiväksi. Osakkeet olivat aamulla arvottomia.',
      teksti: 'Pan-Electric Industries oli singaporelainen yhtiö, joka teki '
        + 'meripelastustyötä ja jolla oli lisäksi hotelli- ja '
        + 'kiinteistöomistuksia. Tytäryhtiöitä oli 71 ja markkina-arvo 230 '
        + 'miljoonaa Singaporen dollaria.'
        + '\n\nJoulukuussa 1985 yhtiö romahti valtavien selvittämättömien '
        + 'termiinisopimusten takia. Romahdus pakotti sulkemaan sekä '
        + 'Singaporen että Kuala Lumpurin pörssin kolmeksi päiväksi. Yhtiön '
        + 'velat olivat kaatuessa 480 miljoonaa dollaria, ja 5 500 '
        + 'osakkeenomistajan osakkeet todettiin yhdessä yössä arvottomiksi.'
        + '\n\nJälkiselvittelyssä yhtiön keskeisiä henkilöitä — muun muassa '
        + 'Peter Tham, Tan Kok Liang ja Tan Koon Swan — asetettiin syytteeseen '
        + 'ja tuomittiin eripituisiin vankeusrangaistuksiin. Luottamus pörssiin '
        + 'romahti, osakekurssit syöksyivät ja osa välitysliikkeistä ajautui '
        + 'konkurssiin.'
        + '\n\nMaaliskuussa 1986 säädettiin uudet arvopaperilait, joiden '
        + 'tarkoituksena oli suojata välitysliikkeitä luottoriskeiltä. Vielä '
        + 'vuonna 2000 tapaus oli Singaporen historian suurin yritysromahdus '
        + 'ja ainoa kerta, jolloin pörssi jouduttiin sulkemaan yllättäen.',
      lahde: 'en-Wikipedia "Pan-Electric Industries", johdanto-osa. '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä poikkeuksellista romahdus aiheutti pörssille?',
        vaihtoehdot: [
          'Pörssi siirtyi sähköiseen kaupankäyntiin',
          'Kaksi pörssiä suljettiin kolmeksi päiväksi',
          'Pörssi muutti uusiin tiloihin',
        ],
        oikea: 1,
      },
    },
  ],
  TLS: [
    /*
     * Lifau, Oecusse (Portugalin ensimmäinen tukikohta Timorilla).
     * Lähde: en.wikipedia.org: Topasses; Lifau
     */
    {
      id: 'lifaun-pako',
      otsikko: 'Kuvernööri, joka ajettiin ulos omasta siirtokunnastaan',
      nimio: 'Lifaun pako',
      vuosi: '1702–1769',
      paikka: 'Lifau, Oecusse',
      lat: -9.216667, lon: 124.3,
      kortti: 'Timorin santelipuukaupan hallitsi sekaväestö, jota kutsuttiin '
        + 'topasseiksi. Kun Lissabon lähetti Lifauhun oikean kuvernöörin, '
        + 'topassit ajoivat hänet pois. Toisella kerralla portugalilaiset '
        + 'siirsivät koko pääkaupungin toiseen päähän saarta.',
      teksti: 'Topassit olivat kahden mahtisuvun, Da Costan ja Hornayn, '
        + 'johtama väestöryhmä, joka asui Oecussessa ja Floresilla. Ryhmä '
        + 'syntyi 1560-luvulta alkaen Solorin portugalilaisen '
        + 'kauppa-asemasta, jota käytettiin ponnahduslautana Timorin '
        + 'santelipuukauppaan. Kun hollantilainen kauppakomppania valtasi '
        + 'Solorin 1613, yhteisö siirtyi Larantukaan Floresille ja 1650-luvun '
        + 'lopulla osin Länsi-Timoriin.'
        + '\n\nVuoteen 1663 mennessä topassit olivat etninen sekoitus '
        + 'portugalilaisia, floresilaisia, timorilaisia, intialaisia ja '
        + 'hollantilaisia karkureita. Sotataidollaan he hallitsivat suurta '
        + 'osaa Timorista, ja heidän keskuksensa oli Lifau. He painostivat '
        + 'timorilaisia ruhtinaita toimittamaan santelipuuta rannikolle ja '
        + 'myivät sen Macaon kauppiaille tai hollantilaisille.'
        + '\n\nYhteisöllä oli omat valitsemansa kapteenit, eikä se juuri '
        + 'pitänyt yhteyttä Portugalin Intian varakuninkaaseen. Portugali '
        + 'asetti Lifauhun hallintomiehen 1656 ja varsinaisen kuvernöörin '
        + '1702. Topassit vastustivat sitä väkivalloin ja ajoivat kuvernööri '
        + 'António Coelho Guerreiron pois 1705.'
        + '\n\nHyökkäykset jatkuivat, ja 1769 portugalilaiset siirsivät '
        + 'tukikohtansa Lifausta itään Diliin. Siitä tuli Itä-Timorin '
        + 'pääkaupunki. Kahden portugalilaisryhmän välillä vallitsi ajoittain '
        + 'sotatila aina vuoteen 1785 asti.',
      lahde: 'en-Wikipedia "Topasses", osiot "Influence on the Timor region" '
        + 'ja "Independent position within the colonial system", sekä "Lifau", '
        + 'osio "History". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä portugalilaiset tekivät topassien hyökkäysten jälkeen 1769?',
        vaihtoehdot: [
          'Siirsivät pääkaupungin Lifausta Diliin',
          'Luopuivat koko Timorista',
          'Palkkasivat hollantilaiset avuksi',
        ],
        oikea: 0,
      },
    },
    /*
     * Manufahin rannikko Betanon kohdalla (kapinan sydänalue).
     * Lähde: en.wikipedia.org: East Timorese rebellion of 1911–1912
     */
    {
      id: 'manufahin-kapina',
      otsikko: 'Päävero, pakkotyö ja kolmen vuoden kapina',
      nimio: 'Manufahi',
      vuosi: '1911–1912',
      paikka: 'Manufahin rannikko, Betano',
      lat: -9.164444, lon: 125.725,
      kortti: 'Portugali halusi Timorilta rahaa ja käsipareja: pääveron ja '
        + 'pakkotyön. Manufahin ruhtinas kokosi kuningaskuntien liiton ja '
        + 'nousi kapinaan. Sen kukistamiseen tarvittiin joukkoja Mosambikista '
        + 'ja tykkivene Macaosta.',
      teksti: 'Vuosien 1911–1912 kapina, jota kutsutaan myös suureksi '
        + 'kapinaksi tai Manufahin kapinaksi, syntyi vastauksena Portugalin '
        + 'siirtomaahallinnon yrityksiin kerätä päävero ja panna toimeen '
        + 'pakkotyövelvollisuus. Ne kuuluivat laajempaan hankkeeseen, jolla '
        + 'pyrittiin edistämään vientikasvien viljelyä ja rakentamaan '
        + 'nykyaikaista infrastruktuuria.'
        + '\n\nKapinat olivat alkaneet jo aiemmin. Manufahin alkuperäisen '
        + 'kuningaskunnan liurai eli päällikkö Dom Boaventura johti '
        + 'ensimmäistä kapinaa 1894–1901 ja toista 1907–1908. Vuonna 1911 hän '
        + 'kokosi paikallisten kuningaskuntien liiton viimeiseen ja '
        + 'vakavimpaan nousuun.'
        + '\n\nHelmikuussa 1912 erään kuningaskunnan kapinalliset tunkeutuivat '
        + 'siirtokunnan pääkaupunkiin Diliin, ryöstivät hallintotalon ja '
        + 'surmasivat matkallaan ihmisiä. Elokuussa portugalilaiset toivat '
        + 'joukkoja Mosambikista ja tykkiveneen Macaosta kukistamaan kapinan.'
        + '\n\nHinta oli raskas: 3 424 timorilaista kaatui ja 12 567 haavoittui, '
        + 'portugalilaisten puolella kaatui 289 ja haavoittui 600. Vuoden 1912 '
        + 'jälkeen Portugalin valta ulottui koko alueelle, perinnöllisiä '
        + 'liuraita ei enää nimitetty ja vanhat kuningaskunnat lakkasivat. '
        + 'Kapinaa pidetään ratkaisevana itätimorilaisen oman identiteetin '
        + 'synnyssä.',
      lahde: 'en-Wikipedia "East Timorese rebellion of 1911–1912", '
        + 'johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mistä portugalilaiset toivat joukot kapinan kukistamiseen?',
        vaihtoehdot: [
          'Brasiliasta',
          'Goasta',
          'Mosambikista',
        ],
        oikea: 2,
      },
    },
  ],

  /*
   * ══ ERÄ M6, LÄHI-ITÄ 6.9.2026 ═══════════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M6 (CYP, OMN, QAT, ARE, KWT) tuo kaksi skandaalia kuhunkin
   * viiteen maahan — kymmenen uutta. Kaikki ovat kuvattomia kuten erän
   * muutkin nostot, ja jokaisen lähderivi nimeää en-Wikipedian
   * artikkelin ja osan sekä tarkistuspäivän 6.9.2026.
   *
   * PAIKAT ON MITATTU. Yksikään uusi merkki ei ole pelikaupungin
   * kohdalla (KAUPUNGIN_KOHDALLA_SADE 7 ja kaupunkikaton säde 8,
   * js/fokuskohteet.js): lähin on Souk Al-Manakh 9,7 lautayksikön
   * päässä Kuwait-laatasta ja kaukaisin Ubarin löytö 45,7 yksikön
   * päässä Salalahista. Kaksi merkkiä on siirretty tarkoituksella
   * naapuriruutuun, koska maastokohteiden nosto istuu jo tapahtuman
   * omalla paikalla (sama ratkaisu kuin erässä M3): Zubarahin hävitys
   * on niemimaan pohjoisrannalla ja Souk Al-Manakh Kuwaitinlahden
   * suulla. Kummankin `paikka`-rivi kertoo tapahtuman oikean paikan.
   *
   * HERKÄT AIHEET ASIALLISESTI (docs/aasia-tyoaineisto/spec-asia.md).
   * Nykypolitiikkaa ei kirjoiteta: Kyproksen kohdalla pysytään 1100- ja
   * 1800-luvun tapahtumissa, ja 1900-luvun aiheet ovat talous- ja
   * ympäristöskandaaleja. Kolonialismi kerrotaan neutraalina
   * historiana ja lähteen katteessa.
   */
  CYP: [
    /*
     * Larnaka, jossa Cesnola oli Yhdysvaltain konsuli 1865–1877.
     * Lähde: en.wikipedia.org: Luigi Palma di Cesnola
     */
    {
      id: 'cesnolan-kokoelma',
      otsikko: 'Konsuli, joka kaivoi saaren tyhjäksi',
      nimio: 'Cesnola',
      vuosi: '1865–1877',
      paikka: 'Larnaka, Kypros',
      lat: 34.91667, lon: 33.63333,
      kortti: 'Yhdysvaltain konsuli Larnakassa kaivoi Kyproksen hautoja ja temppeleitä '
        + 'kaksitoista vuotta ja lähetti saarelta pois noin 35 000 esinettä. New Yorkin '
        + 'Metropolitan-museo osti kokoelman ja teki miehestä ensimmäisen johtajansa.',
      teksti: 'Luigi Palma di Cesnola oli italialaissyntyinen upseeri, joka palveli Yhdysvaltain '
        + 'sisällissodassa ratsuväkirykmentin everstinä ja sai kunniamitalin Aldien '
        + 'taistelusta. Sodan jälkeen hänet nimitettiin Yhdysvaltain konsuliksi Larnakaan, ja '
        + 'virkaa hän hoiti vuodesta 1865 vuoteen 1877.'
        + '\n\nKonsulin varsinainen työ oli kaivaminen. Cesnola kaivatti hautoja ja pyhäköitä '
        + 'ympäri saarta, laajimmin Kourionin alueella: Ayios Ermoyenisin hautausmaalla ja '
        + 'Apollon Hylatesin pyhäkössä vuosina 1874–1875. Tavoite ei ollut tutkimus vaan '
        + 'arvoesineet. Saarelta lähti noin kolmekymmentäviisituhatta esinettä, ja yksi '
        + 'kuljetusaluksista, Napried, upposi matkalla noin viidentuhannen esineen kanssa.'
        + '\n\nJust perustettu Metropolitan-museo osti kokoelman 1872 — isoisäsi matkaa '
        + 'edeltävänä vuonna — ja seitsemän vuotta myöhemmin Cesnolasta tuli museon '
        + 'ensimmäinen johtaja. Vuonna 1880 taidekriitikko Clarence Cook ja Gaston Feuardent '
        + 'väittivät New York Heraldissa, että patsaita oli koottu vääristä paloista. '
        + 'Erityinen tutkijalautakunta puhdisti Cesnolan maineen, ja hän johti museota '
        + 'kuolemaansa 1904 asti.'
        + '\n\nKyproksella arvio on toinen: siellä toimintaa pidetään ryöstönä. Tutkija Ahmet '
        + 'Gazioğlu on Cesnolan omaan kirjaan nojaten kuvannut, että tämä kaivoi usein '
        + 'laittomasti ja kiristi lupia, ja että hän oli ongelma viranomaisille sekä '
        + 'lainhalveksuntansa että käytöksensä takia.',
      lahde: 'en-Wikipedia "Luigi Palma di Cesnola", osio "Post war", ja en-Wikipedia '
        + '"Kourion", osio "History of excavations". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä Cesnolan kokoelmalle tapahtui?',
        vaihtoehdot: [
          'Metropolitan-museo osti sen ja Cesnolasta tuli museon johtaja',
          'Britannian hallinto takavarikoi sen Larnakassa',
          'Se palautettiin Kyprokselle 1880-luvulla',
        ],
        oikea: 0,
      },
    },
    /*
     * Limassol, jonne Rikhard Leijonamieli nousi maihin 1191. Merkki
     * on kaupungin itälaidalla noin viisi kilometriä keskustasta:
     * Khirokitian nosto on niin lähellä, että keskustan kohdalla kaksi
     * nimiötä menisi päällekkäin (tools/tarkista-nimiolimitys.mjs).
     * Lähde: en.wikipedia.org: Cyprus in the Middle Ages
     */
    {
      id: 'kypros-myydaan',
      otsikko: 'Saari, joka myytiin kahdesti vuodessa',
      nimio: 'Rikhard',
      vuosi: '1191–1192',
      paikka: 'Limassol, Kypros',
      lat: 34.66, lon: 33.1,
      kortti: 'Rikhard Leijonamieli valloitti Kyproksen kesken ristiretken, verotti sen '
        + 'tyhjiin ja myi saaren temppeliherroille. Vuoden kuluttua temppeliherrat myivät '
        + 'sen eteenpäin, koska eivät saaneet asukkaita pysymään aloillaan.',
      teksti: 'Rikhard Leijonamieli nousi maihin Limassolissa 1. kesäkuuta 1191. Hän ei ollut '
        + 'tullut valloittamaan vaan etsimään sisartaan ja morsiantaan Berengariaa, joiden '
        + 'laiva oli eronnut laivastosta myrskyssä. Saaren hallitsija Isaakios Komnenos vaati '
        + 'Berengariaa nousemaan maihin, ja kun tämä kieltäytyi, Isaakios ei antanut laivalle '
        + 'muonaa.'
        + '\n\nRikhard piti tätä loukkauksena ja valtasi saaren, mikä kävi helposti. Isaakios '
        + 'joutui lupaamaan apua ristiretkelle Saladinia vastaan mutta rikkoi valansa. '
        + 'Rikhard vangitutti hänet hopeakahleisiin — rautaan hän oli vannonut olevansa '
        + 'panematta miestä — ja Isaakios kuoli vankina 1194 tai 1195. Kyproslainen '
        + 'kronikoitsija Neofytos antoi Rikhardille liikanimen kurja.'
        + '\n\nRistiretkilaivasto jatkoi Akkoniin 5. kesäkuuta, mutta Rikhardin sotaväki jäi '
        + 'saarelle ja korotti veroja. Kapinoiden jälkeen kuningas myi Kyproksen '
        + 'temppeliherrojen ritarikunnalle. Uudet omistajat nostivat veroja lisää eivätkä '
        + 'siksi saaneet asukkaita puolelleen.'
        + '\n\n6. huhtikuuta 1192 puhkesi kapina, jonka jälkeen temppeliherrat myivät saaren '
        + 'eteenpäin Guy de Lusignanille. Guy oli juuri menettänyt Jerusalemin kuninkaan '
        + 'arvonsa ja asettui Kyprokselle toukokuussa 1192. Hän kutsui saarelle Palestiinan '
        + 'paroneja ja jakoi näille suuria läänityksiä — ja siitä alkoi Lusignanien '
        + 'kolmensadan vuoden kausi.',
      lahde: 'en-Wikipedia "Cyprus in the Middle Ages", osiot "Crusades–Lusignan period '
        + '1095–1489" ja "Guy of Lusignan". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi temppeliherrat myivät Kyproksen eteenpäin?',
        vaihtoehdot: [
          'Paavi kielsi heitä hallitsemasta saarta',
          'Asukkaat kapinoivat verotusta vastaan eivätkä he saaneet saarta haltuunsa',
          'Saarella riehui rutto',
        ],
        oikea: 1,
      },
    },
  ],
  OMN: [
    /*
     * Jiddat al-Harasis, Al Wustan suojelualue Keski-Omanissa.
     * Lähde: en.wikipedia.org: Al Wusta Wildlife Reserve
     */
    {
      id: 'oryksin-suojelualue',
      otsikko: 'Ensimmäinen poistettu maailmanperintökohde',
      nimio: 'Oryksin alue',
      vuosi: '1994–2007',
      paikka: 'Jiddat al-Harasis, Oman',
      lat: 19.9, lon: 56.4,
      kortti: 'Arabianoryksin suojelualue oli maailmanperintökohde kolmetoista vuotta. Kun '
        + 'sen alta löytyi öljyä ja aluetta pienennettiin yhdeksälläkymmenellä prosentilla, '
        + 'Unesco teki jotain, mitä se ei ollut koskaan ennen tehnyt.',
      teksti: 'Arabianoryksi on valkoinen antilooppi, joka metsästettiin luonnosta sukupuuttoon. '
        + 'Laji palautettiin Omanin keskiaavikolle tarhakannasta, ja alue nimettiin '
        + 'Arabianoryksin suojelualueeksi. Unesco liitti sen maailmanperintöluetteloon 1994 '
        + 'nimenomaan onnistuneen palautuksen takia.'
        + '\n\nSitten alueelta löytyi öljyä. Oman päätti pienentää suojelualuetta yhdeksälläkymmenellä '
        + 'prosentilla, ja samaan aikaan kanta romahti: vuonna 1996 alueella oli laskettu 450 '
        + 'yksilöä, vuonna 2007 enää 65. Syiksi Unesco nimesi salametsästyksen ja elinympäristön '
        + 'tuhoutumisen. Lisääntymiskykyisiä pareja oli jäljellä neljä.'
        + '\n\n28. kesäkuuta 2007 Unesco poisti kohteen luettelosta. Se oli ensimmäinen kerta '
        + 'maailmanperintöluettelon historiassa, kun kohde poistettiin — ei siksi, että se olisi '
        + 'tuhoutunut onnettomuudessa, vaan siksi että valtio itse pienensi sen.'
        + '\n\nSuojelualue on yhä olemassa, nykyään nimellä Al Wustan luonnonsuojelualue. Oryksin '
        + 'lisäksi siellä elää vuorigaselleja, nubianvuohia, arabiansusia, mesimäyriä ja '
        + 'karakaaleja. Maailmanperintöluettelosta se ei ole enää löytynyt.',
      lahde: 'en-Wikipedia "Al Wusta Wildlife Reserve", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi suojelualue poistettiin maailmanperintöluettelosta?',
        vaihtoehdot: [
          'Alue tuhoutui hiekkamyrskyssä',
          'Unesco lakkautti koko luokan',
          'Oman pienensi aluetta 90 prosentilla öljylöydön jälkeen',
        ],
        oikea: 2,
      },
    },
    /*
     * Shisrin kaivauspaikka Dhofarissa, "Hiekan Atlantis".
     * Lähde: en.wikipedia.org: Atlantis of the Sands
     */
    {
      id: 'ubarin-loyto',
      otsikko: 'Hiekan Atlantis, jota ei ollutkaan',
      nimio: 'Ubarin löytö',
      vuosi: '1992',
      paikka: 'Shisr, Dhofar, Oman',
      lat: 18.25333, lon: 53.64758,
      kortti: 'Helmikuussa 1992 The New York Times kertoi, että Arabian hiekasta oli löytynyt '
        + 'kadonnut kaupunki Ubar. Uutinen kiersi maailman. Kaivauksia johtanut arkeologi itse '
        + 'oli eri mieltä.',
      teksti: 'Tarina alkoi 1930, kun tutkimusmatkailija Bertram Thomas lähestyi Rub al-Khalin '
        + 'eteläreunaa. Beduiinioppaat kertoivat hänelle kadonneesta kaupungista, jonka pahat '
        + 'asukkaat olivat vetäneet päälleen Jumalan vihan. Thomas merkitsi kartalle uran, '
        + 'jonka sanottiin johtavan Ubariin, mutta ei koskaan ehtinyt seurata sitä.'
        + '\n\nKuusikymmentä vuotta myöhemmin Nicholas Clappin retkikunta kaivoi beduiinikaivon '
        + 'kohdalta Shisrissä. Muutamassa viikossa esiin tuli yli kaksituhatta vuotta vanhan '
        + 'linnoituksen muuri ja tornit. Clapp päätteli, että kyseessä oli Ubar, ja samasti sen '
        + 'Koraanin Iramiin. Retkikunnan jäsen Ranulph Fiennes ilmoitti, että paikka oli '
        + 'Ptolemaioksen kartan Omanum Emporium.'
        + '\n\nKaivauksia johtanut arkeologi Juris Zarins ei uskonut väitettä. Hän totesi 1996, '
        + 'että klassiset ja arabialaiset lähteet käyttävät sanaa Ubar alueesta ja kansasta '
        + 'eivätkä kaupungista — Ptolemaios kirjoittaa kartalleen isoin kirjaimin Iobaritae. '
        + 'Vasta myöhäiskeskiajan Tuhannen ja yhden yön tarinat tekivät alueesta kaupungin.'
        + '\n\nVuoteen 2007 mennessä tulkinta oli tämä: Shisr oli suitsukekaravaanien '
        + 'karavaaniserain itäisin jäänne, ei kadonnut kaupunki. Linnoitus ei tuhoutunut '
        + 'hiekkamyrskyssä vaan romahti kaivon päälle syntyneeseen vajoamaan. Portilla lukee '
        + 'yhä: tervetuloa Ubariin, beduiinitarujen kadonneeseen kaupunkiin.',
      lahde: 'en-Wikipedia "Atlantis of the Sands", osiot "Introduction", "Early explorers in '
        + 'Dhofar" ja "Dhofar". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä kaivauksia johtanut Juris Zarins päätteli Ubarista?',
        vaihtoehdot: [
          'Että Ubar oli alue ja kansa, ei kaupunki',
          'Että kaupunki tuhoutui hiekkamyrskyssä',
          'Että paikka oli väärennös',
        ],
        oikea: 0,
      },
    },
  ],
  QAT: [
    /*
     * Merkki on Dohan ja Al Wakrahin edustan merellä: molemmat
     * kaupungit ovat pelikaupunki Dohan kahdeksan yksikön säteellä.
     * Lähde: en.wikipedia.org: Al Wakrah
     */
    {
      id: 'dohan-ryosto',
      otsikko: 'Ryöstöretki, joka synnytti maan',
      nimio: 'Dohan ryöstö',
      vuosi: '1867–1868',
      paikka: 'Doha ja Al Wakrah, Qatar',
      lat: 25.1, lon: 51.7,
      kortti: 'Kaksi qatarilaista kaupunkia hävitettiin vuoden 1867 lopulla niin perusteellisesti, '
        + 'että brittiasiakirja kuvasi ne pyyhkäistyiksi pois olemassaolosta. Seuraus oli '
        + 'päinvastainen kuin oli tarkoitettu.',
      teksti: 'Vuonna 1867 Na’im-heimon vanhimmat pyysivät apua Jassim bin Mohammed Al Thanilta, '
        + 'jonka vaikutusvalta ja maine oikeudenmukaisuudesta olivat kasvussa. Jassim kokosi '
        + 'joukot ja marssi Al Wakrahiin ottaakseen kiinni Bahrainin edustajan Ahmed bin '
        + 'Mohammed Al Khalifan. Tämä pakeni linnakkeeseen ja sieltä edelleen pohjoiseen Al '
        + 'Khuwayriin.'
        + '\n\nSitten tuli ansa. Al Khalifat kirjoittivat kirjeen, jossa vakuuttivat, ettei '
        + 'Jassimia kohtaan tunnettu kaunaa, ja kutsuivat hänet Bahrainiin. Perillä hänet '
        + 'vangittiin. Muhammad bin Khalifa kokosi laivaston, sai tuekseen Abu Dhabin ja '
        + 'hyökkäsi Qatarin rannikolle.'
        + '\n\nAl Wakrah ja Doha ryöstettiin vuoden 1867 lopulla. Myöhempi brittiläinen '
        + 'asiakirja tiivisti tapahtuneen kylmästi: kaupungit pyyhkäistiin väliaikaisesti pois '
        + 'olemassaolosta, talot purettiin ja asukkaat kuljetettiin pois. Kesäkuussa 1868 '
        + 'qatarilaiset yrittivät vastaiskua ja hävisivät Damsahin taistelun, mutta saartoivat '
        + 'sen jälkeen bahrainilaiset Jebel Wakrahin kohdalla ja vangitsivat kaksi komentajaa. '
        + 'Lopuksi vaihdettiin vangit.'
        + '\n\nBritannia puuttui asiaan, koska hyökkäys rikkoi merirauhaa. Sen jälkeen tehty '
        + 'sopimus käsitteli Qataria omana yksikkönään eikä Bahrainin osana — ja juuri siitä '
        + 'lasketaan Qatarin erillisen aseman alku.',
      lahde: 'en-Wikipedia "Al Wakrah", osiot "History" ja "Qatari–Bahraini War". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten Jassim bin Mohammed joutui vangiksi?',
        vaihtoehdot: [
          'Hänet vangittiin taistelussa Al Wakrahissa',
          'Britannian laivasto pidätti hänet merellä',
          'Hänet houkuteltiin Bahrainiin kirjeellä, jossa luvattiin turva',
        ],
        oikea: 2,
      },
    },
    /*
     * Merkki on niemimaan pohjoisrannalla noin kaksikymmentä
     * kilometriä varsinaisista raunioista koilliseen: Zubarahin oma
     * nosto (js/packs/maastokohteet-qat.js) istuu jo kaupungin
     * paikalla, eikä kahta nimiötä mahdu samaan kohtaan.
     * Lähde: en.wikipedia.org: Zubarah
     */
    {
      id: 'zubarahin-havitys',
      otsikko: 'Merirosvous, joka tyhjensi kaupungin',
      nimio: 'Zubarahin loppu',
      vuosi: '1878',
      paikka: 'Al Zubarah, Qatar',
      lat: 26.1, lon: 51.2,
      kortti: 'Syyskuussa 1878 muutama zubarahlainen ryösti ohi kulkeneen veneen ja tappoi '
        + 'neljä ihmistä. Kuukautta myöhemmin koko kaupunkia ei enää ollut — ja sen tyhjyys '
        + 'teki siitä lopulta maailmanperintökohteen.',
      teksti: 'Zubarah oli 1760-luvulta lähtien Qatarin pohjoisrannikon vilkkain '
        + 'helmenpyyntisatama. Sata vuotta myöhemmin sen maine oli toinen: syyskuussa 1878 '
        + 'joukko kaupungin asukkaita ryösti ohi purjehtineen veneen, ja neljä ihmistä sai '
        + 'surmansa.'
        + '\n\nBritannian poliittinen residentti Edward Ross vaati ottomaaniviranomaisia '
        + 'rankaisemaan kaupunkilaisia ja tarjosi laivastonsa avuksi. Hän kävi neuvottelemassa '
        + 'wali Abdullah Pashan kanssa Basrassa. Pian tapaamisen jälkeen Jassim bin Mohammed '
        + 'Al Thani ja Nasir bin Mubarak hyökkäsivät Zubarahiin kahdentuhannen aseistetun '
        + 'miehen kanssa.'
        + '\n\n22. lokakuuta kaupunki oli ryöstetty ja Murairin linnake saarrettu; sitä '
        + 'puolusti viisisataa Na’im-heimon miestä. He antautuivat epäedullisin ehdoin, ja '
        + 'suurin osa Zubarahin asukkaista siirrettiin Dohaan. Bahrainin hallitsija raivostui, '
        + 'koska hänellä oli sopimus juuri Na’imien kanssa.'
        + '\n\nVuonna 1888 kuului huhu, että Jassim aikoi rakentaa kaupungin uudelleen '
        + 'tukikohdaksi vävylleen, mutta britit varoittivat häntä ja aie raukesi. Zubarah jäi '
        + 'autioksi — ja juuri siksi se säilyi. Unesco liitti sen maailmanperintöluetteloon '
        + '2013 ja perusteli valintaa poikkeuksellisella säilyneisyydellä.',
      lahde: 'en-Wikipedia "Zubarah", osiot "1878 destruction" ja "World Heritage Site". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi Zubarah on niin hyvin säilynyt?',
        vaihtoehdot: [
          'Se rakennettiin kivestä eikä mudasta',
          'Se jäi autioksi vuoden 1878 hävityksen jälkeen',
          'Sitä on kunnostettu yhtäjaksoisesti 1800-luvulta asti',
        ],
        oikea: 1,
      },
    },
  ],
  ARE: [
    /*
     * Umm Al Quwain, jonka linnoitukset ja suuret alukset
     * brittiretkikunta tuhosi 1819.
     * Lähde: en.wikipedia.org: Persian Gulf campaign of 1819
     */
    {
      id: 'merirosvorannikko',
      otsikko: 'Rannikko, jonka nimi oli jo syyte',
      nimio: 'Merirosvorannikko',
      vuosi: '1819–1820',
      paikka: 'Umm Al Quwain, Arabiemiirikunnat',
      lat: 25.58, lon: 55.55,
      kortti: 'Britannia lähetti 1819 kolmetuhatta sotilasta hävittämään merirosvot Persianlahden '
        + 'etelärannikolta. Nimi Merirosvorannikko jäi kartoille — mutta jo tuolloin oman '
        + 'hallinnon virkamies epäili syytettä.',
      teksti: 'Marraskuun 3. päivänä 1819 brittiretkikunta lähti Bombaysta kohti Ras Al Khaimaa. '
        + 'Kenraalimajuri William Keir Grantilla oli kolmetuhatta sotilasta, ja mukana '
        + 'purjehtivat sekä kuninkaallisen laivaston että Itä-Intian kauppakomppanian alukset. '
        + 'Muscatin sulttaani lähetti kuusisataa miestä ja kaksi laivaa.'
        + '\n\nRas Al Khaima räjäytettiin ja sinne jätettiin kahdeksansadan sepoyn varuskunta. '
        + 'Sen jälkeen tuhottiin Umm Al Quwainin, Ajmanin, Fashtin, Sharjahin, Abu Hailin ja '
        + 'Dubain linnoitukset ja suuremmat alukset. Kuninkaallinen laivasto ei menettänyt '
        + 'yhtään miestä.'
        + '\n\nSeuraavana vuonna solmittu yleinen merirauhan sopimus kielsi merirosvouden ja '
        + 'orjuuden ja määräsi jokaisen käyttökelpoisen aluksen rekisteröitäväksi. Alukset '
        + 'saivat punavalkoiset liput, jotka elävät yhä emiraattien lipuissa. Rannikon nimi '
        + 'vaihtui Merirosvorannikosta Sopimusrannikoksi.'
        + '\n\nSyyte ei ollut kiistaton edes silloin. Bombayn hallinnon kansliapäällikkö F. '
        + 'Warden kirjoitti 1819 muistion, jonka mukaan Qawasim ei ollut syyllistynyt '
        + 'merirosvouteen ennen vuoden 1804 loppua vaan osoittanut kunnioitusta Britannian '
        + 'lipulle. Sharjahin hallitsija ja historioitsija Sultan bin Mohammed Al Qasimi vei '
        + 'ajatuksen pidemmälle kirjassaan The Myth of Arab Piracy in the Gulf: hänen mukaansa '
        + 'syyte oli sodan tekosyy, jolla kauppakomppania halusi lopettaa arabien oman '
        + 'Intian-kaupan.',
      lahde: 'en-Wikipedia "Persian Gulf campaign of 1819", johdanto-osa sekä osiot "Campaign" '
        + 'ja "Treaty and aftermath". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä Bombayn kansliapäällikkö F. Warden esitti vuonna 1819?',
        vaihtoehdot: [
          'Että Qawasim ei ollut harjoittanut merirosvousta ennen vuotta 1804',
          'Että retkikunta oli liian pieni',
          'Että Muscatin sulttaani olisi tehtävä koko niemimaan hallitsijaksi',
        ],
        oikea: 0,
      },
    },
    /*
     * Jebel Ali, Dubai Worldin satama- ja kiinteistötoimintojen
     * keskus; Dubain keskusta on pelikaupungin säteellä.
     * Lähde: en.wikipedia.org: Dubai World
     */
    {
      id: 'dubai-world',
      otsikko: 'Kuusi sanaa, jotka pudottivat pörssit',
      nimio: 'Dubai World',
      vuosi: '2009',
      paikka: 'Jebel Ali, Dubai, Arabiemiirikunnat',
      lat: 25.0, lon: 55.05,
      kortti: 'Marraskuussa 2009 Dubain hallitus pyysi valtionyhtiönsä velkojia odottamaan '
        + 'puoli vuotta. Velkaa oli 59 miljardia dollaria, ja Euroopan pörssit putosivat '
        + 'yli kolme prosenttia yhdessä päivässä.',
      teksti: 'Dubai World oli emiraatin valtion omistama yhtiöryhmä, joka rakensi satamia, '
        + 'saaria ja asuinalueita. Kuuden vuoden nousun jälkeen kiinteistömarkkina kääntyi '
        + 'laskuun finanssikriisissä.'
        + '\n\n25. marraskuuta 2009 Dubain hallitus ilmoitti, että yhtiö aikoo pyytää kaikkia '
        + 'rahoittajiaan pysähtymään ja pidentämään eräpäiviä ainakin 30. toukokuuta 2010 '
        + 'asti. Yhtiö oli irtisanonut 10 500 työntekijää. Velkaa oli 59 miljardia dollaria, '
        + 'lähes kolme neljäsosaa koko emiraatin 80 miljardin velasta, ja siihen sisältyi '
        + '3,5 miljardin laina, jota ei kyetty maksamaan joulukuun eräpäivään mennessä.'
        + '\n\nLuottoluokittajat Moody’s ja Standard & Poor’s pudottivat Dubain '
        + 'valtiollisten yhtiöiden luokituksia rajusti; Moody’sin päätöksessä ne '
        + 'menettivät sijoituskelpoisen luokkansa. Euroopan päähintaindeksit laskivat 26. '
        + 'marraskuuta yli kolme prosenttia ja Aasian osakkeet seuraavana päivänä. Sitten '
        + 'markkinat rauhoittuivat: velka ei ollut tarpeeksi suuri kaatamaan järjestelmää.'
        + '\n\n30. marraskuuta Dubain valtiovarainhallinnon johtaja totesi, ettei hallitus ollut '
        + 'taannut yhtiön velkoja — mitään sopimusta takauksesta ei ollut. Dubain ja Abu '
        + 'Dhabin pörssit laskivat päivässä 7,3 ja 8,3 prosenttia. 14. joulukuuta Abu Dhabi '
        + 'antoi yllättäen kymmenen miljardin dollarin avun, josta 4,1 miljardia meni saman '
        + 'päivän erääntyvään Nakheelin joukkolainaan.',
      lahde: 'en-Wikipedia "Dubai World", osio "2009 debt standstill". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuinka suuret velat Dubai Worldilla oli marraskuussa 2009?',
        vaihtoehdot: [
          '5,9 miljardia dollaria',
          '59 miljardia dollaria',
          '590 miljardia dollaria',
        ],
        oikea: 1,
      },
    },
  ],
  KWT: [
    /*
     * Merkki on Kuwaitinlahden suulla: itse Souk Al-Manakh oli Jiblan
     * kaupunginosassa Kuwait Cityssä, joka on pelikaupungin säteellä.
     * Lähde: en.wikipedia.org: Souk Al-Manakh stock market crash
     */
    {
      id: 'souk-al-manakh',
      otsikko: 'Pysäköintihallin pörssi',
      nimio: 'Souk Al-Manakh',
      vuosi: '1979–1982',
      paikka: 'Jibla, Kuwait City, Kuwait',
      lat: 29.15, lon: 48.25,
      kortti: 'Ilmastoidussa pysäköintihallissa toimi pörssi, joka oli hetken maailman '
        + 'kolmanneksi suurin. Se kaatui, kun yksi postipäivätty shekki ei mennyt läpi.',
      teksti: '1970-luvun öljytulot jättivät monille kuwaitilaisille suuret käteisvarat, ja '
        + 'virallinen pörssi ylikuumeni ja romahti 1977. Hallitus pelasti sijoittajat ja '
        + 'tiukensi sääntöjä. Juuri se ajoi rohkeimmat keinottelijat teknisesti laittomalle '
        + 'rinnakkaismarkkinalle, joka sai nimen Souk Al-Manakh ja toimi ilmastoidussa '
        + 'pysäköintihallissa Jiblan vanhassa kaupunginosassa.'
        + '\n\nMarkkina erikoistui sääntelemättömiin, muualla Persianlahdella rekisteröityihin '
        + 'yhtiöihin. Kun se perustettiin 1979, Kuwaitissa oli jo enemmän osakkeita kuin '
        + 'missään muussa lahden maassa. Parissa vuodessa listalla oli seitsemänkymmentä '
        + 'yhtiötä, joista noin neljäkymmentä muista maista, ja markkina-arvo hyppäsi '
        + 'muutamassa kuukaudessa viidestä miljardista sataan miljardiin dollariin — hetken '
        + 'aikaa kolmanneksi suurin maailmassa Yhdysvaltain ja Japanin jälkeen.'
        + '\n\nKaupat maksettiin postipäivätyillä shekeillä, mikä oli sääntelemätöntä '
        + 'luotonantoa. Elokuussa 1982 välittäjä vei erään passivirkailijan shekin pankkiin, '
        + 'eikä sille ollut katetta. Syyskuussa valtiovarainministeriö määräsi kaikki '
        + 'epäilyttävät shekit selvitettäviksi ja sulki markkinan.'
        + '\n\nVirallinen tutkinta laski katteettomien shekkien arvoksi 94 miljardia dollaria '
        + 'noin kuudeltatuhannelta sijoittajalta. Kaikki Kuwaitin pankit yhtä lukuun ottamatta '
        + 'olivat teknisesti maksukyvyttömiä ja pysyivät pystyssä vain keskuspankin tuella; '
        + 'ainoa vahingoittumattomana selvinnyt oli National Bank of Kuwait.',
      lahde: 'en-Wikipedia "Souk Al-Manakh stock market crash", johdanto-osa sekä osiot '
        + '"Background" ja "Crash". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten Souk Al-Manakhin romahdus alkoi?',
        vaihtoehdot: [
          'Öljyn hinta romahti yhdessä yössä',
          'Yksi postipäivätty shekki osoittautui katteettomaksi',
          'Keskuspankki nosti korkoa',
        ],
        oikea: 1,
      },
    },
    /*
     * Kuwaitin eteläiset helmimatalikot Kubbarin ja Umm al Maradimin
     * välissä. Lähde: en.wikipedia.org: Pearl hunting
     */
    {
      id: 'helmisukelluksen-loppu',
      otsikko: 'Viljelty helmi lopetti kokonaisen elinkeinon',
      nimio: 'Helmien loppu',
      vuosi: '1900–1940',
      paikka: 'Kuwaitin eteläiset helmimatalikot',
      lat: 28.9, lon: 48.35,
      kortti: 'Tuhansia vuosia helmet nostettiin merestä sukeltamalla, ja Persianlahti oli '
        + 'kaupan sydän. Sitten japanilainen yrittäjä keksi, miten simpukan saa tekemään '
        + 'helmen tilauksesta.',
      teksti: 'Suurin osa maailman merihelmistä nostettiin tuhansien vuosien ajan sukeltajien '
        + 'käsin Intian valtamerestä: Persianlahdelta, Punaiseltamereltä ja Mannarinlahdelta. '
        + 'Isidoros Kharaxilaisen Parthian-reittikuvauksen katkelma, joka on säilynyt '
        + '200-luvun teoksessa, kertoo jo helmisukelluksesta erään Persianlahden saaren '
        + 'ympärillä.'
        + '\n\nMatalassa Persianlahdessa helmiä oli paljon, ja elinkeino kukoisti Kuwaitissa, '
        + 'Qatarissa ja Arabiemiirikunnissa; suurin viejä oli Bahrain. Helmenpyynti oli '
        + 'Itä-Arabian talouden kulmakivi ja muovasi koko rannikon yhteiskuntaa — kuka oli '
        + 'kapteeni, kuka sukeltaja, kuka kauppias.'
        + '\n\nKauniin kertomuksen alla on karu puoli, jota lähde ei kierrä: tuohon aikaan '
        + 'elinkeino nojasi orjatyöhön. Lahden eteläosassa kauppiaat ajautuivat toistuvasti '
        + 'velkakierteeseen, koska helmien hinta heilui arvaamattomasti eikä kukaan voinut '
        + 'tietää, mitä kausi toisi.'
        + '\n\nLopun toi tekniikka. Japanilainen yrittäjä Kōkichi Mikimoto teki tunnetuksi '
        + 'menetelmän, jossa simpukan sisään istutetaan hiukkanen, joka saa sen muodostamaan '
        + 'helmen. Viljelyhelmitarhat syrjäyttivät sukeltamisen, ja nykyään maailmassa '
        + 'tuotetaan miljardeja helmiä vuodessa. Lahden helmilaivastot jäivät rannoille.',
      lahde: 'en-Wikipedia "Pearl hunting", johdanto-osa sekä osiot "Persian Gulf" ja '
        + '"Eastern Arabia and Persian Gulf". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä lopetti Persianlahden helmisukelluksen elinkeinona?',
        vaihtoehdot: [
          'Simpukoiden sukupuutto',
          'Öljyn löytyminen kielsi sukeltamisen',
          'Viljelyhelmi, jonka menetelmän Kōkichi Mikimoto teki tunnetuksi',
        ],
        oikea: 2,
      },
    },
  ],
  /*
   * ══ ERÄ M9, LÄHI-ITÄ 2 6.9.2026 ═════════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M9 (SAU, IRN, JOR, IRQ, EGY) tuo kaksi skandaalia kuhunkin
   * viiteen maahan — kymmenen uutta. Kaikki ovat kuvattomia kuten erän
   * muutkin nostot, ja jokaisen lähderivi nimeää en-Wikipedian
   * artikkelin ja osan sekä tarkistuspäivän.
   *
   * PAIKAT ON MITATTU. Yksikään uusi merkki ei ole pelikaupungin
   * kohdalla (KAUPUNGIN_KOHDALLA_SADE 7 lautayksikköä,
   * js/fokuskohteet.js): lähin on Bagdadin patteri 11,2 yksikön päässä
   * Bagdad-laatasta ja toiseksi lähin Denderan horoskooppi 15,7
   * yksikön päässä Luxorista.
   *
   * KAKSI KORTTIA VEI KOHTEEN PAIKAN. Tayman kivi ja Nimrudin
   * oikeusjuttu ovat paikoilla, jotka olisivat kelvanneet myös
   * kohteiksi; koska kaksi nimiötä samassa pisteessä on nimiölimitys
   * (tools/tarkista-nimiolimitys.mjs), Tayman keidas ja Nimrud
   * jätettiin maastokohteet-pakeista pois ja aihe kannetaan
   * skandaalikortilla.
   *
   * HERKKIEN AIHEIDEN LINJAUS ON SITOVA (docs/aasia-tyoaineisto/
   * spec-asia.md). Yksikään kortti ei koske nykypolitiikkaan eikä
   * käynnissä oleviin konflikteihin: aiheet ovat vuosilta 1820–1902
   * sekä kaksi 1900-luvun tapausta (Bagdadin patteri 1936–1938 ja
   * Azraqin kosteikon kuivuminen 1960–1992), joista jälkimmäinen on
   * vesitalouden ympäristötapaus.
   */
  SAU: [
    /*
     * Ha'il, Jabal Shammarin emiirikunta (Wallinin tukikohta 1845 ja
     * paikka, jossa hänen valeasunsa paljastui 1847).
     * Lähde: en.wikipedia.org: Georg August Wallin
     */
    {
      id: 'wallinin-valeasu',
      otsikko: 'Abd al-Wali, joka oli Yrjö Aukusti Wallin',
      nimio: 'Wallinin valeasu',
      vuosi: '1843–1849',
      paikka: "Ha'il, Jabal Shammar",
      lat: 27.5236, lon: 41.6957,
      kortti: 'Ahvenanmaalta lähtenyt kielitieteilijä otti Kairossa arabialaisen '
        + 'nimen ja eli muslimina, jotta pääsisi lähelle sitä yhteiskuntaa, jota '
        + 'hän halusi tutkia. Valeasu vei hänet myös Mekkaan ja Medinaan, jonne '
        + 'muiden kuin muslimien ei ollut lupa mennä. Toisella kerralla asu '
        + 'petti — ja retki päättyi ennen aikojaan.',
      teksti: 'Georg August Wallin, suomeksi Yrjö Aukusti Wallin, syntyi Sundissa '
        + 'Ahvenanmaalla 1811 ja luki Helsingin yliopistossa itämaisia kieliä. '
        + 'Vuosina 1841–1842 hän opiskeli Pietarissa egyptiläisen sheikin '
        + 'Muhammad Ayyad al-Tantawin johdolla, ja juuri al-Tantawin kertomusten '
        + 'katsotaan vaikuttaneen eniten hänen päätökseensä matkustaa '
        + 'Lähi-itään.'
        + '\n\nApurahahakemuksessaan Wallin vetosi siihen, että arabian murteita '
        + 'ei ollut tutkittu, ja siihen, että hän halusi tutkia wahhabilaista '
        + 'liikettä. Henkilökohtaisesti häntä vieraannutti se, mitä hän piti '
        + 'eurooppalaisen sivistyksen pinnallisuutena. Vuonna 1843 hän matkusti '
        + 'Marseillen ja Konstantinopolin kautta Kairoon, opetteli Lähi-idän '
        + 'tapoja ja islamin perusteet, otti käyttöön yksinkertaisen elämäntavan '
        + 'ja esiintyi muslimina nimellä Abd al-Wali. Monet uskovat hänen '
        + 'kääntyneen islamiin, mutta päiväkirjoissa ja kirjeissä ei ole siitä '
        + 'todistetta — pikemminkin ne kertovat epäilystä uskontoja kohtaan.'
        + '\n\nEnsimmäinen retki alkoi 1845, ja sen määränpää oli Mekka, kaupunki '
        + 'joka oli kielletty muilta kuin muslimeilta. Reitti kulki Kairosta '
        + "Ma'anin, Al-Jaufin, Jubban ja Ha'ilin kautta Medinaan, Mekkaan ja "
        + 'Jeddaan. Kolmannella retkellään 1847 hän aikoi tutkia Najdia, mutta '
        + "Ha'iliin päästyään hän tajusi valeasunsa paljastuneen ja kääntyi "
        + 'pohjoiseen Mesopotamiaan ja Persiaan.'
        + '\n\nEuroopassa Wallinia palkittiin: Lontoon Kuninkaallinen '
        + 'maantieteellinen seura julkaisi hänen muistiinpanonsa ja antoi '
        + 'kultamitalinsa 1851, ja hänestä tuli itämaisen kirjallisuuden '
        + 'professori Helsinkiin. Richard Burton, joka valmistautui omaan '
        + 'Mekan-matkaansa, kirjoitti Wallinille pitkän kysymyskirjeen — mutta '
        + 'Wallin oli jo kuollut, päivää ennen 41-vuotispäiväänsä 1852. Hänen '
        + 'hautakivessään Hietaniemessä on nimi Georg Aug. Wallin ja sen alla '
        + 'arabiaksi Abd al-Wali.',
      lahde: 'en-Wikipedia "Georg August Wallin", osiot "Early life and '
        + 'education", "Expeditions to Arabia", "Return and professorship" ja '
        + '"Legacy". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Millä nimellä Wallin esiintyi matkoillaan?',
        vaihtoehdot: [
          'Abd al-Wali',
          'Ibn Battuta',
          'Sheikh Ibrahim',
        ],
        oikea: 0,
      },
    },
    /*
     * Tayman keidas, jossa steelat olivat pystyssä.
     * Lähde: en.wikipedia.org: Tayma stones
     */
    {
      id: 'tayman-kivi',
      otsikko: 'Kivi luvattiin Saksaan ja päätyi Pariisiin',
      nimio: 'Tayman kivi',
      vuosi: '1876–1884',
      paikka: 'Tayman keidas, Tabuk',
      lat: 27.6289, lon: 38.5464,
      kortti: 'Kolme eurooppalaista matkaajaa löysi saman kiven kymmenen vuoden '
        + 'sisällä, ja jokainen halusi sen omaan maahansa. Kivi oli 150-kiloinen '
        + 'kalkkikivipaasi, jossa oli 23 riviä arameaa. Se oli määrä lähettää '
        + 'Saksaan, mutta se päätyi Ranskaan — ja mies, joka lähti hakemaan sitä, '
        + 'ei ehtinyt julkaista löytöään.',
      teksti: 'Tayman keidas Luoteis-Arabiassa oli vuosituhansia karavaanitien '
        + 'pysähdyspaikka, ja sen raunioissa seisoi kivipaasia, joiden '
        + 'kirjoitukset ovat noin 400- ja 500-luvuilta eaa. Ensimmäisenä ne '
        + 'huomasi nykyaikana brittiläinen Charles Montagu Doughty vuonna 1876. '
        + 'Hän kopioi kaksi tekstiä, ja kopiot julkaistiin hänen kirjassaan '
        + 'Travels in Arabia Deserta 1888. Käsin kirjoitetussa huomautuksessa '
        + 'kopioiden alla kerrotaan, että toinenkin samanlainen kivi oli sanottu '
        + 'olevan Hadaj-kaivon sortuneiden raunioiden joukossa.'
        + '\n\nRanskalainen Charles Huber näki paadet paikallaan 1878 ja otti '
        + 'niistä kopiot, jotka hän julkaisi Pariisin maantieteellisen seuran '
        + 'lehdessä. Hän teki toisen matkan hakeakseen paadet, mutta kuoli ennen '
        + 'kuin ehti julkaista ne. Saksalainen Julius Euting kertoi nähneensä '
        + 'kiven sunnuntaina 17. helmikuuta 1884 Taymassa Huberin seurassa. '
        + 'Ensimmäisen julkaisun teki Theodor Nöldeke 10. heinäkuuta 1884 '
        + 'Eutingin antamien tietojen pohjalta.'
        + '\n\nItse Tayman kivi on kalkkikiveä, 150 kiloa, 110 senttimetriä pitkä, '
        + '43 leveä ja 12 paksu, ja siinä on 23 riviä arameankielistä tekstiä. '
        + 'Teksti kertoo, kuinka pappi Salm-shezeb, Pet-Osirin poika, toi Taymaan '
        + 'uuden jumalan, Hagamin Salmin, kuinka temppelille annettiin '
        + 'lahjoitusmaat ja kuinka pappeudesta tehtiin perinnöllinen. Kiven '
        + 'yläosassa seisovan hahmon pää muistuttaa assyrialaisten ja '
        + 'babylonialaisten sotureiden kypäriä.'
        + '\n\nKivi oli alun perin määrä lähettää Saksaan. Lopulta se lähetettiin '
        + 'Ranskaan, ja siellä se on yhä: Louvren kokoelmissa Pariisissa. '
        + 'Ensimmäiset neljä Tayman piirtokirjoitusta löydettiin 1878 ja '
        + 'julkaistiin 1884 Corpus Inscriptionum Semiticarumin toisessa osassa '
        + 'numeroina 113–116; kymmenen lisää julkaistiin 1972 ja seitsemän vielä '
        + '1987.',
      lahde: 'en-Wikipedia "Tayma stones", johdanto sekä osiot "Discovery" ja '
        + '"The Tayma Stone". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Missä museossa Tayman kivi on nykyään?',
        vaihtoehdot: [
          'Berliinin Pergamon-museossa',
          'Louvressa Pariisissa',
          'British Museumissa',
        ],
        oikea: 1,
      },
    },
  ],
  IRN: [
    /*
     * Shiraz, yksi tupakkakapinan kolmesta pääkeskuksesta.
     * Lähde: en.wikipedia.org: Tobacco Protest
     */
    {
      id: 'tupakkakapina',
      otsikko: 'Koko maa lakkasi polttamasta',
      nimio: 'Tupakkakapina',
      vuosi: '1890–1892',
      paikka: 'Shiraz, Qajar-Iran',
      lat: 29.6, lon: 52.5333,
      kortti: 'Šaahi myi maansa koko tupakan viidenkymmenen vuoden ajaksi yhdelle '
        + 'englantilaiselle majurille. Kauppiaat sulkivat basaarit, ja joulukuussa '
        + '1891 maan korkein uskonoppinut julisti tupakan käytön kielletyksi. Kun '
        + 'jopa hovin palvelijat kieltäytyivät valmistamasta šaahin vesipiippua, '
        + 'sopimus purettiin.',
      teksti: 'Qajar-Iran oli 1800-luvulla ahtaalla: tappiot sodissa ja jatkuva '
        + 'ulkomaisen pääoman paine olivat pakottaneet hallituksen myöntämään '
        + 'toimilupia toisensa jälkeen, eivätkä iranilaiset kauppiaat pystyneet '
        + 'kilpailemaan eurooppalaisten etuoikeuksien kanssa. Vuonna 1872 Naser '
        + 'al-Din Shah oli antanut Paul Reuterille oikeudet teihin, lennättimiin, '
        + 'myllyihin, tehtaisiin ja luonnonvaroihin; kotimainen ja venäläinen '
        + 'vastustus pakotti purkamaan sopimuksen runsaan vuoden jälkeen.'
        + '\n\nMaaliskuun 20. päivänä 1890 šaahi myönsi majuri G. F. Talbotille '
        + 'täyden monopolin tupakan tuotantoon, myyntiin ja vientiin '
        + 'viideksikymmeneksi vuodeksi. Talbot maksoi vuosittain 15 000 puntaa '
        + 'sekä neljänneksen voitoista, ja syksyllä 1890 toimilupa siirtyi '
        + 'Imperial Tobacco Corporation of Persia -yhtiölle. Kaikkien tupakan '
        + 'tuottajien oli myytävä satonsa yhtiön asiamiehille.'
        + '\n\nVastarinnan keskuksiksi nousivat Shiraz, Tabriz ja Teheran. '
        + 'Toukokuussa 1891 šaahi karkotti Shirazista mullah Sayyid Ali Akbarin, '
        + 'joka oli saarnannut toimilupaa vastaan. Matkallaan Akbar tapasi Jamal '
        + 'al-Din al-Afghanin, joka kirjoitti kirjeen johtavalle oppineelle '
        + 'Mirza ShiraziIle. Joulukuussa 1891 Shirazi antoi fatwan, jonka mukaan '
        + 'tupakan käyttö oli sotaa aikakauden imaamia vastaan.'
        + '\n\nBoikotti oli täydellinen: basaarit suljettiin, ja kerrotaan, että '
        + 'hovin naiset lopettivat polttamisen ja palvelijat kieltäytyivät '
        + 'valmistamasta šaahin vesipiippua. Tammikuussa 1892 šaahi peruutti '
        + 'toimiluvan, ja 26. tammikuuta kaupunginkuuluttaja ilmoitti Teheranissa '
        + 'fatwan päättyneen. Yhtiölle jouduttiin maksamaan 500 000 punnan '
        + 'korvaus, jota varten Iran otti lainan Venäjältä. Historioitsija Nikki '
        + 'Keddie on todennut, että iranilaiset näkivät ensi kerran voivansa '
        + 'voittaa sekä šaahin että ulkomaiset edut.',
      lahde: 'en-Wikipedia "Tobacco Protest", johdanto sekä osiot "Background", '
        + '"The Tobacco Régie and subsequent protests", "Shirazi\'s fatwa and the '
        + 'repudiation of the concession" ja "Aftermath". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä šaahi joutui tekemään tammikuussa 1892?',
        vaihtoehdot: [
          'Peruuttamaan tupakkatoimiluvan',
          'Luopumaan valtaistuimesta',
          'Kieltämään basaarit',
        ],
        oikea: 0,
      },
    },
    /*
     * Susan akropoli, jonka Grande Tranchée -kaivannosta stelat
     * nousivat. Lähde: en.wikipedia.org: Susa; Code of Hammurabi
     */
    {
      id: 'susan-kaivausmonopoli',
      otsikko: 'Kaivausmonopoli, joka vei Hammurabin lain Pariisiin',
      nimio: 'Susan monopoli',
      vuosi: '1894–1912',
      paikka: 'Susa, Khuzestan',
      lat: 32.1897, lon: 48.2461,
      kortti: 'Kahdella sopimuksella Ranska sai yksinoikeuden kaikkiin Iranin '
        + 'kaivauksiin — ilman aikarajaa. Susasta nousi maailman kuuluisin '
        + 'lakikivi, ja se vietiin Louvreen. Kaivausten johtaja rakennutti '
        + 'paikalle linnan muinaisista tiilistä ja erosi lopulta syytettynä '
        + 'varojen huonosta hoidosta.',
      teksti: 'Susa Khuzestanin maakunnassa on yksi Lähi-idän vanhimmista '
        + 'kaupungeista. Ranskalaiset kaivaukset alkoivat 1885–1886, kun '
        + 'Marcel-Auguste ja Jane Dieulafoy löysivät lasitettuja tiiliä sekä '
        + 'akhaimenidipalatsin pylväänjalkoja ja kapiteeleja — mutta eivät '
        + 'tunnistaneet savitiiliseiniä, jotka tuhoutuivat kaivamisen myötä. '
        + 'Vuoden 1885 jälkeen lähes kaikki Susan kaivaukset olivat Ranskan '
        + 'valtion järjestämiä ja valtuuttamia.'
        + '\n\nKahdessa sopimuksessa 1894 ja 1899 Ranska sai yksinoikeuden '
        + 'kaikkiin Iranin arkeologisiin kaivauksiin toistaiseksi. Jacques de '
        + 'Morgan johti suuria kaivauksia 1897–1911 vasta perustetun Délégation '
        + 'en Perse -laitoksen johdossa. Akropolin Grande Tranchée -kaivannosta '
        + 'nousivat muun muassa Naram-Sinin steela, kokoelma babylonialaisia '
        + 'rajakiviä, kuningatar Napir-Asun pronssipatsas — ja Hammurabin lain '
        + 'steela.'
        + '\n\nHammurabin lakisteela löytyi kolmena suurena kappaleena akropolin '
        + 'kummulta joulukuun 1901 ja tammikuun 1902 välillä, ja isä '
        + 'Jean-Vincent Scheil julkaisi siitä ensimmäisen raportin. Kivi on 2,25 '
        + 'metriä korkea ja siinä on noin 4 130 riviä nuolenpääkirjoitusta. Se '
        + 'ei ollut alun perin Susasta: elamilainen kuningas Shutruk-Nakhunte oli '
        + 'vienyt sen saaliina, todennäköisesti Sipparista, ja hiotti siitä '
        + 'seitsemän lakipylvästä pois kirjoittaakseen tilalle omaa tarinaansa. '
        + 'Steela on nyt Louvren toisessa kerroksessa Pariisissa.'
        + '\n\nJälki oli raskas. De Morgan oli koulutukseltaan kaivosinsinööri ja '
        + 'kiinnostunut ennen muuta kivikautisista kerroksista, joten hän tuhosi '
        + 'suuren osan myöhemmistä rakennekerroksista ja samalla monen löydön '
        + 'alkuperätiedot. Hän rakennutti akropolin pohjoisreunaan '
        + 'keskiaikaistyylisen Shushin linnan muinaisen paikan omista tiilistä; '
        + 'linnaa pidettiin Ranskan valtion omaisuutena Iranin hallinnon '
        + 'ulkopuolella. De Morgan erosi 1912 syytettynä laitoksen varojen '
        + 'huonosta hoidosta, ja Ranskan kaivausmonopoli purettiin vasta 1927.',
      lahde: 'en-Wikipedia "Susa", osio "Excavation history", ja en-Wikipedia '
        + '"Code of Hammurabi", johdanto ja osio "Louvre stele". Tarkistettu '
        + '6.9.2026.',
      visa: {
        kysymys: 'Mistä kaupungista Hammurabin steela alun perin ryöstettiin Susaan?',
        vaihtoehdot: [
          'Ninivestä',
          'Urukista',
          'Sipparista',
        ],
        oikea: 2,
      },
    },
  ],
  JOR: [
    /*
     * Dhiban, muinainen Dibon, jossa steela seisoi.
     * Lähde: en.wikipedia.org: Mesha Stele
     */
    {
      id: 'meshan-steela',
      otsikko: 'Kivi, joka rikottiin nuotiolla ja kylmällä vedellä',
      nimio: 'Meshan steela',
      vuosi: '1868–1870',
      paikka: 'Dhiban (muinainen Dibon)',
      lat: 31.5, lon: 35.7833,
      kortti: 'Lähetyssaarnaaja löysi ehjän moabilaisen kivipaaden, ja uutinen '
        + 'käynnisti kilpajuoksun Ranskan, Britannian ja Saksan välillä. '
        + 'Kilpailun keskellä paikallinen heimo kuumensi kiven nuotiossa ja '
        + 'jäähdytti sen vedellä niin, että se halkesi. Teksti pelastui, koska '
        + 'siitä oli ehditty ottaa paperipainanne.',
      teksti: 'Anglikaanisen lähetysseuran pappi Frederick Augustus Klein löysi '
        + 'kiven ehjänä elokuussa 1868 muinaisen Dibonin paikalta, nykyisestä '
        + 'Dhibanista Jordaniassa. Hänet vei paikalle Bani Sakher -heimon '
        + 'päällikön poika Sattam Al-Fayez, mutta kumpikaan ei osannut lukea '
        + 'tekstiä. Tuohon aikaan Levantissa liikkui joukoittain harrastelijoita '
        + 'ja arkeologeja etsimässä todisteita Raamatun kertomuksille, ja uutinen '
        + 'löydöstä käynnisti kilpajuoksun Ranskan, Britannian ja Saksan välillä.'
        + '\n\nJerusalemin Ranskan konsulaatissa työskennellyt arkeologi Charles '
        + 'Simon Clermont-Ganneau ei uskaltanut lähteä kalliille ja vaaralliselle '
        + 'matkalle itse, vaan lähetti Yacoub Caravacca -nimisen miehen ottamaan '
        + 'kivestä paperipainanteen. Caravacca haavoittui työn aikana, ja toinen '
        + 'hänen kahdesta ratsumiehestään pelasti painanteen repimällä sen vielä '
        + 'kosteana irti kivestä seitsemänä kappaleena.'
        + '\n\nMarraskuussa 1869 Bani Hamida -heimo rikkoi kiven. Ottomaanihallinto '
        + 'oli puuttunut omistuskiistaan ja käskenyt luovuttaa kiven Saksan '
        + 'konsulaatille, ja kun heimo huomasi Saltin hallitsijan painostavan '
        + 'sitä, se kuumensi kiven nuotiossa, heitti päälle kylmää vettä ja '
        + 'hakkasi palaset rikki lohkareilla. Tekoa on pidetty uhmana '
        + 'ottomaanihallintoa kohtaan.'
        + '\n\nSuurin osa alkuperäisestä tekstistä saatiin lopulta takaisin: '
        + 'sirpaleista koottiin 613 kirjainta noin tuhannesta, ja loput '
        + 'Clermont-Ganneau täydensi painanteen avulla. Kokonaisuus on nyt '
        + 'Louvressa, ja museovieras erottaa alkuperäiset ruskeat palat sileästä '
        + 'mustasta täytteestä. Steela on eteläisen Levantin ensimmäinen suuri '
        + 'kanaanilainen piirtokirjoitus ja alueen pisin rautakautinen teksti — '
        + 'moabilaisen kielen tärkein todiste ja seemiläisen epigrafian '
        + 'kulmakivi.',
      lahde: 'en-Wikipedia "Mesha Stele", johdanto ja osio '
        + '"Description and discovery". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten steelan teksti saatiin talteen ennen kiven rikkomista?',
        vaihtoehdot: [
          'Valokuvaamalla',
          'Paperipainanteella',
          'Kopioimalla käsin',
        ],
        oikea: 1,
      },
    },
    /*
     * Azraqin kosteikko itäisellä aavikolla.
     * Lähde: en.wikipedia.org: Azraq Wetland Reserve
     */
    {
      id: 'azraqin-kosteikko',
      otsikko: 'Keidas, joka pumpattiin tyhjäksi',
      nimio: 'Azraqin keidas',
      vuosi: '1960–1992',
      paikka: 'Azraqin kosteikko, itäinen aavikko',
      lat: 31.8333, lon: 36.8167,
      kortti: 'Azraq oli neljännesmiljoona vuotta vanha keidas keskellä aavikkoa '
        + 'ja miljoonien muuttolintujen levähdyspaikka. Kun pääkaupungin '
        + 'kasvava väestö tarvitsi vettä, pohjavesi alkoi virrata putkia pitkin '
        + 'Ammaniin. Vuonna 1992 lähteet olivat kuivat.',
      teksti: 'Azraqin kosteikko syntyi noin 250 000 vuotta sitten, kun pohjavesi '
        + 'nousi pintaan Jordanian itäisellä aavikolla. Se on ollut ammoisista '
        + 'ajoista sekä ihmisten kauppateiden että lintujen muuttoreittien '
        + 'risteys: miljoonat kuutiometrit makeaa vettä houkuttelivat '
        + 'kamelikaravaanit, jotka kuljettivat mausteita ja yrttejä Arabian, '
        + 'Mesopotamian ja Syyrian välillä, ja miljoonat muuttolinnut pysähtyivät '
        + 'Azraqiin Afrikan ja Euroopan väliä lentäessään.'
        + '\n\n1960-luvulla pohjavettä alettiin pumpata Ammanin kasvavan väestön '
        + 'tarpeisiin. Vuonna 1978 Jordanian kuninkaallinen luonnonsuojeluseura '
        + 'RSCN perusti alueelle kahdentoista neliökilometrin kosteikkosuojelu-'
        + 'alueen. Se ei riittänyt: vuoteen 1992 mennessä luonnonlähteet olivat '
        + 'kuivuneet ja pohjavesivarasto lakannut antamasta. Azraqin puhvelit '
        + 'kuolivat kaikki, ja moni muuttolintu siirtyi Galileanjärvelle.'
        + '\n\nAlueen tilaa on kuvattu ekologiseksi romahdukseksi. Luvut kertovat '
        + 'saman: helmikuussa 1967 laskettiin 347 000 muuttolintua, helmikuussa '
        + '2000 enää 1 200. Kosteikon peittämästä 25 neliökilometristä on '
        + 'kuivunut. Nykyään lähteet ovat keinotekoisia, jotta paikka pysyisi '
        + 'matkailukohteena.'
        + '\n\nRSCN jatkaa työtä kasvavaa väestöä ja vedentarvetta vastaan. '
        + 'Jordanian vesiministeriön Azraqille antama kymmenen miljoonan '
        + 'kuutiometrin vuosittainen vesimäärä riittää palauttamaan kosteikosta '
        + 'noin kymmenesosan. Vuonna 2018 alueella oli yhä yli 500 laitonta '
        + 'kaivoa. Azraqin pohjavesi antaa neljäsosan Ammanin juomavedestä.',
      lahde: 'en-Wikipedia "Azraq Wetland Reserve", johdanto sekä osiot "History" '
        + 'ja "Azraq today". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mihin Azraqin pohjavettä pumpattiin 1960-luvulta lähtien?',
        vaihtoehdot: [
          'Kastelupelloille Wadi Rumiin',
          'Ammanin juomavedeksi',
          'Kuolleenmeren tehtaille',
        ],
        oikea: 1,
      },
    },
  ],
  IRQ: [
    /*
     * Khujut Rabu lähellä Ktesifonia, josta ruukku löytyi.
     * Lähde: en.wikipedia.org: Baghdad Battery
     */
    {
      id: 'bagdadin-patteri',
      otsikko: 'Savipurkki, josta tehtiin muinainen paristo',
      nimio: 'Bagdadin patteri',
      vuosi: '1936–1938',
      paikka: 'Khujut Rabu, Ktesifonin liepeillä',
      lat: 33.0939, lon: 44.5806,
      kortti: 'Ruukku, kuparisylinteri ja rautatanko bitumilla kiinnitettynä — '
        + 'siinä kaikki. Museon laboratorion johtaja arveli, että kyseessä oli '
        + 'sähköpari, ja arvelusta tuli sitkeä tarina muinaisesta paristosta. '
        + 'Arkeologit eivät ole hyväksyneet sitä, eikä esineen olinpaikka ole '
        + 'enää tiedossa.',
      teksti: 'Bagdadin patteri eli partialainen patteri on nimi esineelle, joka '
        + 'koostuu savisesta ruukusta, kupariputkesta ja rautatangosta; osat on '
        + 'kiinnitetty toisiinsa bitumilla. Se löytyi 1936 Khujut Rabusta '
        + 'lähellä Ktesifonia, partialaisten ja sassanidien pääkaupunkia, ja sen '
        + 'arvellaan olevan jommaltakummalta kaudelta.'
        + '\n\nWilhelm König, joka oli tuolloin Irakin kansallismuseon '
        + 'laboratorion johtaja, esitti että esine olisi toiminut galvaanisena '
        + 'kennona — ehkä pinnoitukseen tai jonkinlaiseen sähköhoitoon. Hänen '
        + 'kuvauksessaan ruukku oli noin 15 senttimetriä korkea, kupariputken '
        + 'halkaisija 26 milliä ja korkeus 9 senttiä, ja sen sisällä oli '
        + 'kokonaan hapettunut rautatanko bitumitulpan pitämänä.'
        + '\n\nVäite ei kestä tarkastelua. Yhtään tuolta ajalta peräisin olevaa '
        + 'sähköpinnoitettua esinettä ei tunneta, ja arkeologit hylkäävät '
        + 'ajatuksen yksimielisesti. Kupariputki ei ole vesitiivis, joten neste '
        + 'ympäröisi myös rautatankoa. Vaihtoehtoinen selitys on, että ruukku oli '
        + 'säiliö suojaus-, puolustus- tai kirousloitsuille: kymmenen samanlaista '
        + 'saviastiaa oli löydetty jo aiemmin, neljä 1930 Seleukiasta ja kuusi '
        + 'Ktesifonista, ja osassa oli bitumilla suljettu pronssisylinteri, jonka '
        + 'sisällä oli papyruskääre.'
        + '\n\nAjoituskin on epävarma. König arveli esineen partialaiseksi eli '
        + 'vuosien 250 eaa. ja 224 jaa. väliltä, mutta British Museumin Lähi-idän '
        + 'osaston St John Simpsonin mukaan löydön alkuperäistä kaivausta ja '
        + 'yhteyttä ei kirjattu kunnolla ja todisteet ajoitukselle ovat hyvin '
        + 'heikot — keramiikan tyyli on sassanidien aikaista. Esineen olinpaikka '
        + 'ei ole ollut tiedossa vuoden 2003 jälkeen.',
      lahde: 'en-Wikipedia "Baghdad Battery", johdanto ja osio "Physical '
        + 'description and dating". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä museon laboratorion johtaja König arveli esineen olleen?',
        vaihtoehdot: [
          'Galvaaninen kenno eli paristo',
          'Mittalaite',
          'Öljylamppu',
        ],
        oikea: 0,
      },
    },
    /*
     * Nimrud, yksi Rassamin kaivauspaikoista Mosulin eteläpuolella.
     * Lähde: en.wikipedia.org: Hormuzd Rassam
     */
    {
      id: 'rassam-vastaan-budge',
      otsikko: 'Kaivaja haastoi museon oikeuteen — ja voitti',
      nimio: 'Rassamin juttu',
      vuosi: '1893',
      paikka: 'Nimrud, Mosulin eteläpuoli',
      lat: 36.0989, lon: 43.3272,
      kortti: 'Mosulissa syntynyt Hormuzd Rassam kaivoi British Museumille '
        + 'vuosikymmeniä. Museon oma virkamies kirjoitti, että Rassam oli '
        + 'käyttänyt sukulaisiaan salakuljettamaan löytöjä ja lähettänyt '
        + 'Lontooseen vain roskaa. Iäkäs Rassam vei asian oikeuteen 1893.',
      teksti: 'Hormuzd Rassam oli assyrialainen Mosulista ja yksi 1800-luvun '
        + 'tuotteliaimmista Mesopotamian kaivajista. Hän uskoi, että kunnia '
        + 'monista hänen löydöistään oli mennyt British Museumin johtaville '
        + 'virkamiehille.'
        + '\n\nVuonna 1893 Rassam haastoi museon intendentin E. A. Wallis Budgen '
        + 'brittituomioistuimeen sekä herjauksesta että kunnianloukkauksesta. '
        + 'Budge oli kirjoittanut, että Rassam oli käyttänyt "sukulaisiaan" '
        + 'salakuljettamaan muinaisesineitä Ninivestä ja lähettänyt British '
        + 'Museumille vain "roskaa". Syytökset loukkasivat iäkästä Rassamia '
        + 'syvästi.'
        + '\n\nOikeudessa Budge esitti osittaisen anteeksipyynnön, jota myöhempi '
        + 'oikeusaste piti epäherrasmiesmäisenä. Tuomioistuimet asettuivat '
        + 'kuitenkin täysin Rassamin puolelle. Myöhemmät arkeologiset todisteet, '
        + 'muun muassa Balawatin porttien osalta, ovat tukeneet Rassamin omaa '
        + 'kertomusta kiistasta.'
        + '\n\nElämänsä loppuun mennessä Rassamin maine ja saavutukset saivat '
        + 'jälleen tunnustusta ainakin kollegoiden keskuudessa. Kuninkaallinen '
        + 'maantieteellinen seura kirjoitti muistokirjoituksessaan, että '
        + 'Rassamin kuolema vei seuralta yhden sen vanhimmista ja '
        + 'huomattavimmista jäsenistä.',
      lahde: 'en-Wikipedia "Hormuzd Rassam", osio "Archaeological reputation". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten Rassamin oikeusjuttu päättyi?',
        vaihtoehdot: [
          'Tuomioistuimet asettuivat Rassamin puolelle',
          'Rassam hävisi jutun',
          'Juttu raukesi',
        ],
        oikea: 0,
      },
    },
  ],
  EGY: [
    /*
     * Denderan Hathor-temppeli, jonka katosta horoskooppi sahattiin.
     * Lähde: en.wikipedia.org: Dendera zodiac
     */
    {
      id: 'denderan-horoskooppi',
      otsikko: 'Taivaankartta sahattiin irti katosta',
      nimio: 'Denderan katto',
      vuosi: '1820–1822',
      paikka: 'Denderan Hathor-temppeli',
      lat: 26.1417, lon: 32.67,
      kortti: 'Denderan temppelin katossa oli ainoa täydellinen muinainen '
        + 'taivaankartta, joka tunnetaan. Pariisilainen antiikkikauppias '
        + 'palkkasi miehen irrottamaan sen sahoilla, tunkeilla, saksilla ja '
        + 'ruudilla. Kuningas osti katon kirjastoonsa, ja siellä se on yhä — '
        + 'Pariisissa.',
      teksti: 'Denderan horoskooppi on kohokuva Hathorin temppelin '
        + 'Osiris-kappelin eteishallin katosta Ylä-Egyptissä. Kappelia alettiin '
        + 'rakentaa myöhäisellä ptolemaiolaiskaudella, ja eteishallin lisäsi '
        + 'keisari Tiberius. Tähtitieteen historioitsija John H. Rogers on '
        + 'kutsunut sitä ainoaksi täydelliseksi muinaiseksi taivaankartaksi, '
        + 'joka meillä on: kiekon keskellä on pohjoisnapa, Pikku Karhu sakaalina, '
        + 'ja sisemmällä kehällä eläinradan merkit.'
        + '\n\nNapoleonin Egyptin-retkellä Vivant Denon piirsi sekä pyöreän että '
        + 'suorakulmaisen horoskoopin, ja 1802 hän julkaisi kaiverrukset '
        + 'teoksessaan Voyage dans la Basse et la Haute Egypte. Kiista kuvan '
        + 'iästä leimahti heti: arviot vaihtelivat kymmenistä tuhansista vuosista '
        + 'muutamaan sataan. Kiistaan, jota kutsutaan Denderan tapaukseksi, '
        + 'osallistuivat muun muassa Joseph Fourier, joka päätyi vuoteen 2500 '
        + 'eaa., Champollion, joka piti sitä 300-luvun jaa. uskonnollisena '
        + 'horoskooppina, ja Georges Cuvier, joka ajoitti sen vuosien 123 ja 147 '
        + 'jaa. väliin.'
        + '\n\nAntiikkikauppias Sébastien Louis Saulnier palkkasi Claude '
        + 'Lelorrainin irrottamaan pyöreän horoskoopin. Työkaluina olivat sahat, '
        + 'tunkit, sakset ja ruuti. Kattokivi kuljetettiin 1821 Pariisiin, ja '
        + '1822 Ludvig XVIII asetti sen Kuninkaalliseen kirjastoon, josta '
        + 'myöhemmin tuli Ranskan kansalliskirjasto.'
        + '\n\nVuonna 1922 horoskooppi siirrettiin kirjastosta Louvreen, jossa se '
        + 'on yhä esillä. Vuonna 2022 egyptologi Zahi Hawass käynnisti '
        + 'vetoomuksen sen ja muun muassa Rosettan kiven palauttamiseksi '
        + 'Egyptiin.',
      lahde: 'en-Wikipedia "Dendera zodiac", johdanto sekä osiot "Description" '
        + 'ja "History". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Millä välineillä horoskooppi irrotettiin katosta?',
        vaihtoehdot: [
          'Sahoilla, tunkeilla, saksilla ja ruudilla',
          'Höyryvintturilla',
          'Vain taltalla ja vasaralla',
        ],
        oikea: 0,
      },
    },
    /*
     * Suezin kanava Ismailian kohdalla (kanavayhtiön hallintokaupunki).
     * Lähde: en.wikipedia.org: Suez Company (1858–1997)
     */
    {
      id: 'suezin-osakekauppa',
      otsikko: 'Neljä miljoonaa puntaa yhdessä yössä',
      nimio: 'Suezin osakkeet',
      vuosi: '1875',
      paikka: 'Suezin kanava, Ismailia',
      lat: 30.5833, lon: 32.2667,
      kortti: 'Egyptin hallitsija oli velkaa sata miljoonaa puntaa eikä saanut '
        + 'enää lainaa joulukuun erään. Ranskalainen pankki tarjoutui ostamaan '
        + 'hänen kanavaosakkeensa — mutta Britannian pääministeri ehti ensin, '
        + 'lainarahalla. Joulukuussa 1875 Britanniasta tuli kanavayhtiön suurin '
        + 'omistaja.',
      teksti: 'Suezin kanavayhtiö, koko nimeltään Compagnie universelle du canal '
        + 'maritime de Suez, perustettiin 1858 Ferdinand de Lessepsin toimesta '
        + 'hoitamaan Egyptin myöntämää kanavatoimilupaa. Yhtiö rakensi kanavan '
        + '1859–1869. Aluksi puolet osakkeista oli ranskalaisilla sijoittajilla '
        + 'ja suurin osa lopuista Egyptin hallitsijalla Said Pashalla, joka osti '
        + 'myymättä jääneet osakkeet, jotta yhtiö ylipäätään saisi tarvittavan '
        + 'pääoman kokoon.'
        + '\n\nSaidin seuraaja Ismail Pasha jatkoi suurten hankkeiden linjalla. '
        + 'Vuonna 1873 hän otti 30 miljoonan punnan lainan — yli kaksi kertaa '
        + 'kanavan rakennuskustannukset — rakentaakseen Egyptiin muuta '
        + 'infrastruktuuria. Vuoteen 1875 mennessä Egyptin valtio oli sadan '
        + 'miljoonan punnan veloissa, eikä kukaan enää suostunut lainaamaan '
        + 'rahaa joulukuun useiden miljoonien punnan lyhennykseen.'
        + '\n\nRanskalainen Société Générale oli kiinnostunut ostamaan Ismailin '
        + 'kanavaosakkeet lyhennystä vastaan. Britannian pääministeri Benjamin '
        + 'Disraeli toimi kuitenkin nopeammin: parlamentin ja kuningatar '
        + 'Victorian luvalla hän sai Lionel de Rothschildilta neljän miljoonan '
        + 'punnan lainan ja osti Ismailin 177 000 osaketta Britannian '
        + 'hallituksen nimiin. Tarjous oli hieman ranskalaista parempi, ja '
        + 'Ismail toimitti osakekirjansa Britannian konsulaattiin.'
        + '\n\nJoulukuuhun 1875 mennessä Britanniasta oli tullut kanavayhtiön '
        + 'suurin omistaja 44 prosentin osuudella. Loput 56 prosenttia pysyivät '
        + 'ranskalaisilla osakkeenomistajilla. Yhtiö hoiti kanavaa vuoteen 1956 '
        + 'asti, jolloin Egypti otti kanavan valtion omistukseen.',
      lahde: 'en-Wikipedia "Suez Company (1858–1997)", johdanto sekä osiot '
        + '"Creation and initial public offering" ja "Early operations". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Keneltä Disraeli sai lainan osakkeiden ostoon?',
        vaihtoehdot: [
          'Lionel de Rothschildilta',
          'Société Généralelta',
          'Englannin pankilta',
        ],
        oikea: 0,
      },
    },
  ],
  /* ══════════════════════════════════════════════════════════════════
   * ══ ERÄ M11, AFRIKKA 2 6.9.2026 ══════════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M11 (ETH, KEN, TZA, UGA, MAR) tuo kaksi skandaalia kuhunkin
   * viiteen maahan — kymmenen uutta. Kaikki ovat kuvattomia kuten erän
   * muutkin nostot, ja jokaisen lähderivi nimeää en-Wikipedian
   * artikkelin ja osan sekä tarkistuspäivän 6.9.2026.
   *
   * PAIKAT ON MITATTU. Yksikään uusi merkki ei ole pelikaupungin
   * kohdalla (KAUPUNGIN_KOHDALLA_SADE 7 lautayksikköä,
   * js/fokuskohteet.js): lähin on Entebben Government House 23,7
   * lautayksikön päässä Viktoria Nyanzasta ja toiseksi lähin Wuchale
   * 25,8 yksikön päässä Lalibelasta.
   *
   * KAKSI PAIKKAVALINTAA ON TEHTY MERKKIEN PÄÄLLEKKÄISYYDEN TAKIA.
   * Aksumin obeliski (Rooma 1937–2005) olisi luonteva Etiopian
   * skandaali, mutta sen merkki osuisi täsmälleen saman erän
   * Aksum-kohteen päälle (js/packs/maastokohteet-eth.js), joten
   * obeliskin tarina kerrotaan Aksumin kortissa ja skandaaleiksi
   * valittiin Magdala ja Wuchale. Samasta syystä Ugandan Entebbe 1976
   * jäi pois: se olisi samassa pisteessä kuin kabakan karkotus, jonka
   * neuvottelut käytiin Entebben Government Housessa.
   *
   * HERKÄT AIHEET ON KIRJOITETTU LÄHTEEN KATTEESSA JA ILMAN
   * NYKYPOLITIIKKAA. Maji Majin uhriluvut, Tsavon uhriluvut ja
   * Annualin tappiot ovat artikkelien omia lukuja, eikä yhdenkään
   * kortin aihe ole käynnissä oleva selkkaus.
   * ══════════════════════════════════════════════════════════════════ */
  ETH: [
    /*
     * Magdalan (Amba Mariamin) linnoitus Wollossa.
     * Lähde: en.wikipedia.org: British expedition to Abyssinia
     */
    {
      id: 'magdalan-ryosto',
      otsikko: 'Vastaamaton kirje ja Magdalan saalis',
      nimio: 'Magdala',
      vuosi: '1868',
      paikka: 'Magdalan linnoitus, Wollo',
      lat: 11.2, lon: 39.283333,
      kortti: 'Etiopian keisari Tewodros II kirjoitti kuningatar Victorialle ja '
        + 'pyysi liittolaisuutta. Kirje pantiin talteen, mutta siihen ei '
        + 'vastattu. Keisari vangitsi konsulin ja lähetyssaarnaajat, ja '
        + 'Britannia lähetti armeijan hakemaan heidät pois. Panttivangit '
        + 'vapautuivat — ja linnoituksen aarteet lähtivät samaan aikaan '
        + 'laivaan.',
      teksti: 'Tewodros lähetti 1860-luvun alussa kirjeitä Venäjälle, Preussiin, '
        + 'Itävaltaan, Ranskaan ja Britanniaan. Hän haki sotilasliittoa ja '
        + 'teknistä apua, sillä hänen valtansa horjui ja Egypti ja osmanit '
        + 'painoivat rajoilla. Vain Ranska vastasi. Lontoossa kirje otettiin '
        + 'talteen mutta jätettiin vaille vastausta: Britannian etu oli '
        + 'yhteistyössä osmanien ja Egyptin kanssa, ja Yhdysvaltain '
        + 'sisällissodan jälkeen Egyptin ja Sudanin puuvillasta oli tullut '
        + 'tärkeää.'
        + '\n\nSeuraava eurooppalainen keisarin tiellä oli lähetyssaarnaaja '
        + 'Henry Stern, joka oli kirjassaan maininnut Tewodrosin vaatimattoman '
        + 'syntyperän. Stern ja hänen apulaisensa pantiin kahleisiin, ja '
        + 'tammikuussa 1864 vangittiin konsuli Charles Duncan Cameron. '
        + 'Neuvottelijaksi lähetetty Hormuzd Rassam päätyi itsekin vangiksi. '
        + 'Elokuussa 1867 kuningatar Victoria ilmoitti sotaretkestä, ja '
        + 'kenraali Robert Napier valtasi Magdalan ja vapautti vangit. '
        + 'Historioitsija Harold Marcus on kutsunut retkeä yhdeksi historian '
        + 'kalleimmista kunnia-asioista.'
        + '\n\nMukana kulki British Museumin virkamies Richard Rivington '
        + 'Holmes. Käsikirjoitukset päätyivät British Museumiin ja Bodleyn '
        + 'kirjastoon, muuta saalista Windsoriin, Victoria and Albert '
        + '-museoon ja armeijamuseoon. Osa on palautettu vähitellen: Kebra '
        + 'Nagast ja ikoni keisari Yohannes IV:lle 1870-luvulla, toinen '
        + 'Tewodrosin kruunuista keisarinna Zawditulle 1924, keisarin lakki '
        + 'ja sinetti Elisabet II:lta 1960-luvulla ja hiuskiehkura '
        + 'armeijamuseolta 2019. Palautusta ajamaan perustettiin 1999 '
        + 'järjestö AFROMET.',
      lahde: 'en-Wikipedia "British expedition to Abyssinia", johdanto-osa sekä '
        + 'osiot "Background", "Hostages" ja "Looted objects". Tarkistettu '
        + '6.9.2026.',
      visa: {
        kysymys: 'Miksi Tewodros II vangitsi brittiläisen konsulin?',
        vaihtoehdot: [
          'Kirjeeseen kuningattarelle ei ollut vastattu',
          'Konsuli oli jäänyt kiinni vakoilusta',
          'Konsuli kieltäytyi maksamasta tullia',
        ],
        oikea: 0,
      },
    },
    /*
     * Wuchalen kylä Wollossa, jossa sopimus allekirjoitettiin.
     * Lähde: en.wikipedia.org: Treaty of Wuchale
     */
    {
      id: 'wuchalen-artikla',
      otsikko: 'Yksi verbi, kaksi eri sopimusta',
      nimio: 'Wuchale',
      vuosi: '1889',
      paikka: 'Wuchale, Wollo',
      lat: 11.5, lon: 39.6,
      kortti: 'Italia ja Etiopia allekirjoittivat 1889 ystävyys- ja '
        + 'kauppasopimuksen kahdella kielellä. Kaksikymmentä artiklaa oli '
        + 'samoja, yksi ei. Amharaksi keisari sai käyttää Italiaa välittäjänä '
        + 'muiden valtioiden kanssa; italiaksi hänen oli pakko. Ero oli yhdessä '
        + 'verbissä.',
      teksti: 'Sopimuksen allekirjoittivat 2. toukokuuta 1889 Menelik II ja '
        + 'kreivi Pietro Antonelli pienessä Wuchalen kylässä, jonka mukaan se '
        + 'nimettiin. Tarkoitus oli edistää ystävyyttä ja kauppaa Italian '
        + 'Eritrean-miehityksen jälkeen. Menelik luovutti alueita ja sai '
        + 'vastineeksi vakuutuksen Etiopian itsenäisyydestä sekä rahallista ja '
        + 'sotilaallista apua. Teksti kirjoitettiin sekä amharaksi että '
        + 'italiaksi, ja artikla 19 määräsi, että kumpikin versio kertoo saman '
        + 'asian.'
        + '\n\nArtikla 17 ei kertonut. Amharaksi keisari "voi käyttää" Italian '
        + 'hallitusta asioidessaan muiden valtojen kanssa — se oli oikeus, ei '
        + 'velvollisuus. Italiaksi hänen oli hoidettava kaikki ulkosuhteensa '
        + 'Italian kautta, mikä tekisi Etiopiasta protektoraatin. Italialaisten '
        + 'oman selityksen mukaan kyse oli yhden verbin käännösvirheestä: '
        + 'amharaksi salliva, italiaksi käskevä.'
        + '\n\nLokakuussa 1889 Italia ilmoitti kaikille Euroopan hallituksille, '
        + 'että Etiopia on sen suojelualue eivätkä muut saa asioida sen kanssa '
        + 'suoraan. Väitteen hyväksyivät kaikki paitsi osmanivaltakunta, joka '
        + 'piti yhä kiinni Eritreasta, ja Venäjä, joka ei sulattanut '
        + 'ortodoksisen maan alistamista katoliselle. Menelik irtisanoi '
        + 'sopimuksen, italialaiset hyökkäsivät 1895, ja kahden päivän taistelu '
        + 'Adwassa päättyi Etiopian voittoon ja turvasi maan itsenäisyyden.',
      lahde: 'en-Wikipedia "Treaty of Wuchale", johdanto-osa sekä osiot '
        + '"Background", "Articles" ja "Disputes". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten artikla 17 erosi kieliversioissa?',
        vaihtoehdot: [
          'Amharaksi oli pakko, italiaksi sai valita',
          'Amharaksi sai valita, italiaksi oli pakko',
          'Artikla puuttui amharankielisestä kokonaan',
        ],
        oikea: 1,
      },
    },
  ],
  KEN: [
    /*
     * Wanjohin laakso Aberdaren vuoriston juurella.
     * Lähde: en.wikipedia.org: Happy Valley set
     */
    {
      id: 'happy-valley',
      otsikko: 'Onnellinen laakso ja kreivin kuolema',
      nimio: 'Happy Valley',
      vuosi: '1920–1941',
      paikka: 'Wanjohin laakso, Aberdaren juurella',
      lat: -0.62765, lon: 36.70832,
      kortti: 'Wanjohin laaksoon Aberdaren rinteille asettui 1920-luvulla joukko '
        + 'brittiläisiä ja irlantilaisia aatelisia. Maine syntyi nopeasti: '
        + 'juhlia, huumeita ja avioliittoja, jotka eivät pysyneet kasassa. Kun '
        + 'kreivi Erroll surmattiin 1941, oikeudenkäynti näytti Britannialle, '
        + 'mitä siirtomaan yläluokka oli puuhannut.',
      teksti: 'Ensimmäinen siirtolaisviljelijä Geoffrey Buxton siirtyi kuivalta '
        + 'Rift-laaksolta ylös vuorille, löysi mieleisensä maat ja antoi '
        + 'seudulle nimen Happy Valley. Naivashan järven ympäristö oli '
        + 'ensimmäisiä eurooppalaisten asuttamia alueita Keniassa ja joukon '
        + 'metsästysmaita; Aberdaren itäpuolinen Nyeri oli sen tärkein '
        + 'kaupunki.'
        + '\n\nJoukkoon luettiin muun muassa lordi Delamere, Karen Blixen ja '
        + 'hänen miehensä Bror von Blixen-Finecke, Denys Finch Hatton, lady '
        + 'Idina Sackville, Alice de Janzé sekä Josslyn Hay, Errollin 22. '
        + 'kreivi. Elämäkerturi Ulf Aschanin sanoin he olivat "sukkelia, '
        + 'viehättäviä, hyvin kasvatettuja ja lukeneita" ja hellittämättömiä '
        + 'huvittelussaan, joka saavutettiin useimmiten juomalla, huumeilla ja '
        + 'seksillä. Vuoden 1929 pörssiromahdus tyrehdytti uusien tulokkaiden '
        + 'virran, mutta 1939 Keniassa asui jo 21 000 eurooppalaista.'
        + '\n\nJulkisuuteen piiri jäi rikoksensa kautta. Elokuva White Mischief '
        + 'dramatisoi oikeudenkäynnin, jossa Sir Jock Delves Broughtonia '
        + 'syytettiin Errollin murhasta. Juanita Carberry kertoi nuoruudestaan '
        + 'ja osuudestaan tapaukseen kirjassaan The Happy Valley, ja Frances '
        + 'Osbornen elämäkerta The Bolter kokosi Idina Sackvillen ympärille '
        + 'piirin synnyn. 2000-luvun puolivälissä jälkipolvet palasivat '
        + 'otsikoihin, kun lordi Delameren pojanpojan Thomas Cholmondeleyn '
        + 'oikeusjutut nousivat julkisuuteen.',
      lahde: 'en-Wikipedia "Happy Valley set", johdanto-osa sekä osiot '
        + '"History", "Location", "In popular culture" ja "Notables". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuka antoi laaksolle nimen Happy Valley?',
        vaihtoehdot: [
          'Kreivi Erroll',
          'Karen Blixen',
          'Viljelijä Geoffrey Buxton',
        ],
        oikea: 2,
      },
    },
    /*
     * Tsavo-joen sillan työmaa Ugandan rautatiellä.
     * Lähde: en.wikipedia.org: Tsavo Man-Eaters
     */
    {
      id: 'tsavon-ihmissyojat',
      otsikko: 'Sata kolmekymmentäviisi vai kolmekymmentä?',
      nimio: 'Tsavo',
      vuosi: '1898',
      paikka: 'Tsavo-joen silta, Ugandan rautatie',
      lat: -2.966667, lon: 38.466667,
      kortti: 'Kaksi harjatonta urosleijonaa pysäytti rautatietyömaan yhdeksäksi '
        + 'kuukaudeksi. Työnjohtaja ampui ne lopulta ja kirjoitti kirjan, jossa '
        + 'uhrien määräksi ilmoitettiin 135. Sata vuotta myöhemmin leijonien '
        + 'luiden ja karvojen kemia kertoi toisenlaisen luvun.',
      teksti: 'Maaliskuussa 1898 britit alkoivat rakentaa siltaa Tsavo-joen yli '
        + 'osana rataa, joka yhdisti Ugandan Kilindinin satamaan. Työmaa oli '
        + 'useita leirejä kolmentoista kilometrin matkalla, ja siellä oli '
        + 'tuhansia työntekijöitä Intiasta. Kaksi leijonaa alkoi raahata miehiä '
        + 'teltoista öisin. Nuotiot ja piikkipensasaidat eivät auttaneet: '
        + 'leijonat hyppäsivät yli tai ryömivät läpi. Sadat pakenivat, ja '
        + 'sillan rakennus pysähtyi.'
        + '\n\nEversti John Henry Patterson viritti ansoja ja väijyi puissa. '
        + 'Ensimmäisen leijonan hän ampui 9. joulukuuta; se oli kuonosta '
        + 'hännänpäähän 2,95 metriä, ja raatoa kantamaan tarvittiin kahdeksan '
        + 'miestä. Toinen kaatui kaksikymmentä päivää myöhemmin. Britannian '
        + 'pääministeri lordi Salisbury selosti asiaa ylähuoneelle: työt olivat '
        + 'pysähtyneet, koska leijonapari oli saanut "mitä valitettavimman '
        + 'mieltymyksen työmiehiimme".'
        + '\n\nPatterson kirjoitti retkestään kirjan ja antoi uhrimääristä '
        + 'useita lukuja, korkeimpana 135. Oltuaan 25 vuotta hänen '
        + 'lattiamattoinaan nahat myytiin 1924 Chicagon Field Museumille 5 000 '
        + 'dollarilla. Vuonna 2001 tutkijat lukivat Pattersonin oman '
        + 'päiväkirjan ja päätyivät 28–31 uhriin — mutta huomauttivat, että '
        + 'päiväkirja laski vain intialaiset työntekijät. Vuonna 2009 '
        + 'julkaistu luiden ja karvojen isotooppitutkimus arvioi, että toinen '
        + 'leijona söi noin 10,5 ja toinen noin 24,2 ihmistä.',
      lahde: 'en-Wikipedia "Tsavo Man-Eaters", johdanto-osa sekä osiot '
        + '"Historical information", "Museum display" ja "Modern research". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten uhrien määrää on myöhemmin tarkistettu?',
        vaihtoehdot: [
          'Päiväkirjasta ja luiden isotooppitutkimuksesta',
          'Rautatieyhtiön palkkalistoista',
          'Silminnäkijähaastatteluista 1950-luvulla',
        ],
        oikea: 0,
      },
    },
  ],
  TZA: [
    /*
     * Songea, Saksan Itä-Afrikan eteläinen kapina-alue.
     * Lähde: en.wikipedia.org: Maji Maji Rebellion
     */
    {
      id: 'maji-maji',
      otsikko: 'Vesi, jonka piti muuttaa luodit',
      nimio: 'Maji Maji',
      vuosi: '1905–1907',
      paikka: 'Songea, Saksan Itä-Afrikka',
      lat: -10.683333, lon: 35.65,
      kortti: 'Saksan siirtomaahallinto määräsi 1902 kylät kasvattamaan '
        + 'puuvillaa vientiin, vaikka vettä ei riittänyt. Kolme vuotta '
        + 'myöhemmin henkiparantaja jakoi sotalääkettä, jonka luvattiin '
        + 'muuttaa saksalaisten luodit vedeksi. Kapina levisi koko eteläiseen '
        + 'siirtomaahan.',
      teksti: 'Saksan ote Itä-Afrikasta oli heikko, ja siksi se oli kova: '
        + 'linnakkeita sisämaassa, henkivero vuodesta 1898 ja pakkotyötä '
        + 'teiden rakentamiseen. Kuvernööri Gustav Adolf von Götzen antoi '
        + '1902 määräyksen, jonka mukaan jokaisen kylän oli tuotettava oma '
        + 'kiintiönsä puuvillaa vientiin. Kasvi vaatii paljon vettä, eikä sitä '
        + 'voinut kasvattaa suuressa osassa maata. Kylänvanhimmat pantiin '
        + 'valvomaan työtä, mikä asetti heidät omia kyliään vastaan; miesten '
        + 'ollessa poissa naiset ottivat heidän työnsä, ja 1905 alkoi uhata '
        + 'kuivuus.'
        + '\n\nHenkiparantaja Kinjikitile Ngwale kertoi olevansa käärmehenki '
        + 'Hongon vallassa ja jakoi kannattajilleen lääkettä: vettä, jonka '
        + 'joukkoon oli sekoitettu risiiniöljyä ja hirssinsiemeniä. Swahiliksi '
        + 'vesi on maji, ja siitä kapina sai nimensä. Taistelijat sitoivat '
        + 'hirssinkorsia otsalleen. Heinäkuun 31. päivänä 1905 matumbit '
        + 'tuhosivat puuvillasadon Samangassa. Kinjikitile hirtettiin '
        + 'maanpetoksesta, ja ennen teloitustaan hän sanoi levittäneensä '
        + 'lääkkeen jo koko seudulle.'
        + '\n\nSota kesti vuoteen 1907. Kuolleita oli 75 000–300 000, valtaosa '
        + 'nälkään: kapinan kukistamiseen käytetty poltetun maan taktiikka '
        + 'jätti jälkeensä nälänhädän, jota kutsutaan nimellä ukame, suuri '
        + 'nälkä. Götzen teetti sodan jälkeen tutkimuksen syistä ja julkaisi '
        + '1909 oman historiateoksensa kapinasta. Historioitsija John Iliffe '
        + 'on huomauttanut, ettei kirjassa mainita kertaakaan puuvillahanketta, '
        + 'jonka kirjoittaja itse oli aloittanut.',
      lahde: 'en-Wikipedia "Maji Maji Rebellion", johdanto-osa sekä osiot '
        + '"Causes" ja "Uprising". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä swahilin sana maji tarkoittaa?',
        vaihtoehdot: [
          'Vapautta',
          'Vettä',
          'Tulta',
        ],
        oikea: 1,
      },
    },
    /*
     * Kongwa Dodoman lähellä, hankkeen päämaja.
     * Lähde: en.wikipedia.org: Tanganyika groundnut scheme
     */
    {
      id: 'maapahkinahanke',
      otsikko: 'Puoli Lontoota ja kolme miljoonaa eekkeriä',
      nimio: 'Maapähkinät',
      vuosi: '1946–1951',
      paikka: 'Kongwa, Tanganjika',
      lat: -6.192778, lon: 36.407222,
      kortti: 'Britannia oli yhä säännöstelyssä ja pulassa margariinista. '
        + 'Ratkaisuksi päätettiin kylvää maapähkinää kolmelle miljoonalle '
        + 'eekkerille Tanganjikassa. Varoitukset sateista, teistä ja kiireestä '
        + 'sivuutettiin, ja viisi vuotta myöhemmin hanke haudattiin 36 '
        + 'miljoonan punnan tappiolla.',
      teksti: 'Sodan jälkeen Britannia oli syvästi velkaa Yhdysvalloille, ja '
        + 'Attleen hallitus haki helpotusta siirtomaista. Vuonna 1946 United '
        + 'Africa Companyn johtaja Frank Samuel ehdotti maapähkinän '
        + 'kasvattamista kasviöljyksi Tanganjikassa, joka oli YK:n '
        + 'huoltohallintoalue. Elintarvikeministeri John Strachey innostui, ja '
        + 'kolmen kuukauden tutkimusmatka suositteli syyskuussa 1946 3,21 '
        + 'miljoonan eekkerin viljelyä vuoteen 1952 mennessä. Hallitus hyväksyi '
        + 'suunnitelman tammikuussa 1947. "Maapähkinäarmeijan" 1 200 paikkaan '
        + 'ilmoittautui 100 000 entistä sotilasta.'
        + '\n\nEtujoukko leiriytyi Kongwaan lähelle Dodomaa ja piti maata '
        + 'sopivana savisuudesta ja vedenpuutteesta huolimatta. Paikalle kasvoi '
        + 'kokonainen kaupunki, jota kutsuttiin nimellä Half London. Koneita '
        + 'ostettiin Kanadasta ja Yhdysvaltain armeijan ylijäämävarastoista '
        + 'Filippiineiltä, ja moni traktori oli jo ruostunut käyttökelvottomaksi. '
        + 'Dar es Salaamin satama tukkeutui, tulva vei osan yksiraiteista rataa, '
        + 'ja puskutraktorit saapuivat vasta huhtikuussa 1947. Baobabit eivät '
        + 'antaneet periksi: yksi niistä oli kylän vankila, toinen esi-isien '
        + 'palvontapaikka ja monessa asui mehiläispesä.'
        + '\n\nKesän 1947 lopussa kaksi kolmasosaa traktoreista oli hajalla. '
        + 'Ylijäämäisistä Sherman-panssarivaunuista riisuttiin panssarit ja '
        + 'eteen pantiin puskuterä; niitäkään ei riittänyt. Hanke hylättiin '
        + '1951, ja 1953 sitä kutsuttiin Britannian siirtomaahistorian '
        + 'pahimmaksi fiaskoksi.',
      lahde: 'en-Wikipedia "Tanganyika groundnut scheme", johdanto-osa sekä '
        + 'osiot "Background" ja "Cultivation". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mihin maapähkinöitä oli tarkoitus käyttää?',
        vaihtoehdot: [
          'Maalien sideaineeksi',
          'Margariiniin ja ruokaöljyyn',
          'Räjähteiden valmistukseen',
        ],
        oikea: 1,
      },
    },
  ],
  UGA: [
    /*
     * Government House Entebbessä, jossa kuvernöörin ja kabakan
     * neuvottelut käytiin. Lähde: en.wikipedia.org: Kabaka crisis
     */
    {
      id: 'kabakan-karkotus',
      otsikko: 'Kuudet neuvottelut ja lentolippu Lontooseen',
      nimio: 'Kabakan karkotus',
      vuosi: '1953–1955',
      paikka: 'Government House, Entebbe',
      lat: 0.05, lon: 32.46,
      kortti: 'Siirtomaaministerin ohimennen heittämä ajatus Itä-Afrikan '
        + 'liittovaltiosta säikäytti Bugandan. Kun kabaka Mutesa II vaati '
        + 'kuningaskunnalleen eroa protektoraatista, kuvernööri Andrew Cohen '
        + 'perui Britannian tunnustuksen ja lennätti hänet maanpakoon. Kaksi '
        + 'vuotta myöhemmin hänet oli tuotava takaisin.',
      teksti: 'Buganda oli vuoden 1900 sopimuksen mukaan perustuslaillinen '
        + 'monarkia laajemman Ugandan protektoraatin sisällä. Vuodesta 1952 '
        + 'uusi kuvernööri Sir Andrew Cohen esitti, että Bugandalle '
        + 'siirrettäisiin lisää tehtäviä — mutta vain jos se muodollisesti '
        + 'hyväksyisi olevansa osa protektoraattia. Mutesa II suostui, ja '
        + 'yhteinen muistio julkaistiin maaliskuussa 1953.'
        + '\n\nKesäkuun 30. päivänä siirtomaaministeri Oliver Lyttelton mainitsi '
        + 'Lontoossa pitämässään puheessa ohimennen mahdollisuuden koko '
        + 'Itä-Afrikan yhdistämisestä tai liittovaltiosta. East African '
        + 'Standard kertoi puheesta 2. ja 3. heinäkuuta, ja Bugandan '
        + 'ministerit kirjoittivat Cohenille kolme päivää myöhemmin '
        + 'vastustaakseen ajatusta. Rauhoittelu ei auttanut: baganda pelkäsi '
        + 'kulttuurinsa sulautuvan, ja vaatimus Bugandan itsenäisyydestä levisi. '
        + 'Myös Bunyoron, Toron ja Ankolen hallitsijat kirjoittivat huolestaan.'
        + '\n\nKuudet kahdenkeskiset neuvottelut Government Housessa eivät '
        + 'ratkaisseet mitään. Cohen ilmoitti, että kiihotus yhtenäistä Ugandaa '
        + 'vastaan rikkoi vuoden 1900 sopimusta, ja antoi kabakalle viisi '
        + 'viikkoa harkinta-aikaa. Marraskuun 30. päivänä 1953 hän ojensi '
        + 'Mutesalle kirjeen, jolla Britannia perui tunnustuksensa tälle '
        + 'Bugandan laillisena hallitsijana. Cohen julisti hätätilan ja lähetti '
        + 'kabakan maanpakoon Lontooseen. Suuttumus oli niin laajaa, että '
        + 'Britannian oli peräännyttävä: Mutesa palautettiin vuoden 1955 '
        + 'Bugandan sopimuksella, ja koko kiista muovasi sen, millaiseksi '
        + 'Ugandan itsenäisyys lopulta tuli.',
      lahde: 'en-Wikipedia "Kabaka crisis", johdanto-osa sekä osiot '
        + '"Background" ja "Crisis". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä laukaisi kabakan kriisin?',
        vaihtoehdot: [
          'Kiista puuvillan hinnasta',
          'Puhe, jossa vihjattiin Itä-Afrikan liittovaltioon',
          'Kabakan kieltäytyminen maksamasta veroja',
        ],
        oikea: 1,
      },
    },
    /*
     * Buyagan ja Bugangaizin kreivikunnat, nykyinen Kibaalen piiri.
     * Lähde: en.wikipedia.org: 1964 Ugandan lost counties referendum
     */
    {
      id: 'kadonneet-kreivikunnat',
      otsikko: 'Maat, jotka luvattiin palkkioksi',
      nimio: 'Kadonneet maat',
      vuosi: '1894–1964',
      paikka: 'Buyaga ja Bugangaizi, Kibaale',
      lat: 0.783333, lon: 31.083333,
      kortti: 'Eversti Colvile lupasi Bugandalle kaikki Kafu-joen eteläpuoliset '
        + 'maat, jos se auttaisi kukistamaan Bunyoron kuningaskunnan. Lupaus '
        + 'pidettiin, ja kreivikunnat siirtyivät. Vasta seitsemänkymmentä vuotta '
        + 'myöhemmin asukkaat saivat äänestää siitä, kenelle he kuuluvat.',
      teksti: 'Brittieversti Henry Colvile hyökkäsi 1893–1894 Bunyoron '
        + 'kuningaskuntaan turvatakseen ja laajentaakseen nuorta Ugandan '
        + 'protektoraattia, joka koostui alkuun lähinnä Bugandasta. Tuen '
        + 'vastineeksi hän lupasi Bugandalle kaiken maan Kafu-joen '
        + 'eteläpuolelta, ja sodan jälkeen kreivikunnat todella siirrettiin. '
        + 'Vuoden 1900 Bugandan sopimus vahvisti siirron. Bunyoron hallitus '
        + 'vetosi Britanniaan yhä uudelleen.'
        + '\n\nItsenäisyyden lähestyessä kiista uhkasi kärjistyä väkivallaksi. '
        + 'Munsterin komissio esitti 1961 kansanäänestystä Buyagan ja '
        + 'Bugangaizin kreivikunnissa sekä yhdessä Bunyoron valitsemassa '
        + 'kolmannessa. Kumpikaan kuningaskunta ei pitänyt ehdotuksesta: '
        + 'Bunyoro halusi äänestyksen kaikissa menetetyissä kreivikunnissa, '
        + 'Buganda ei missään, ja Bunyoron edustajat kävelivät ulos vuoden 1961 '
        + 'perustuslakikokouksesta. Lordi Molsonin komissio suositteli 1962 '
        + 'kahden kreivikunnan siirtoa ilman äänestystä, mikä nostatti '
        + 'kohun Bugandan parlamentissa.'
        + '\n\nLopullisen ratkaisun saneli siirtomaaministeri Reginald Maudling '
        + 'Ugandan itsenäisyyskokouksessa kesäkuussa 1962: kansanäänestys '
        + 'järjestetään vain Buyagassa ja Bugangaizissa, ja äänioikeus on '
        + 'niillä, jotka asuivat alueella itsenäistymishetkellä. Äänestys '
        + 'pidettiin marraskuussa 1964, ja asukkaat valitsivat ylivoimaisesti '
        + 'paluun Bunyoroon.',
      lahde: 'en-Wikipedia "1964 Ugandan lost counties referendum", johdanto-osa '
        + 'sekä osiot "Background" ja "Prelude". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Minkä asukkaat valitsivat vuoden 1964 äänestyksessä?',
        vaihtoehdot: [
          'Paluun Bunyoroon',
          'Jäämisen Bugandaan',
          'Oman erillisen piirikunnan',
        ],
        oikea: 0,
      },
    },
  ],
  MAR: [
    /*
     * Agadirin satama, jonne SMS Panther saapui 1. heinäkuuta 1911.
     * Lähde: en.wikipedia.org: Agadir Crisis
     */
    {
      id: 'agadirin-kriisi',
      otsikko: 'Tykkivene, jonka tekosyy saapui myöhässä',
      nimio: 'Panther Agadirissa',
      vuosi: '1911',
      paikka: 'Agadirin satama',
      lat: 30.421389, lon: -9.583056,
      kortti: 'Ranska lähetti heinäkuussa 1911 joukkoja Marokon sisäosiin. Saksa '
        + 'vastasi lähettämällä tykkiveneen Agadiriin muka suojelemaan '
        + 'kauppaetujaan. Saksalainen siviili, jonka suojeleminen oli koko '
        + 'tekosyy, saapui kaupunkiin kolme päivää laivan jälkeen.',
      teksti: 'Ranskan asema Marokossa oli vahvistettu Algecirasin kokouksessa '
        + '1906, ja 1909 Ranska ja Saksa sopivat, että Ranskalla on poliittinen '
        + 'valta mutta molemmat kunnioittavat toistensa taloudellisia etuja. '
        + 'Vuonna 1911 sulttaani Abd al-Hafidia vastaan puhkesi kapina. Ranska '
        + 'sai sulttaanin pyytämään apua ja lähetti huhtikuun lopussa '
        + 'lentävän osaston sisämaahan sillä verukkeella, että eurooppalaisia '
        + 'oli suojeltava Fèsissä — vaikka kapina oli syvällä sisämaassa eikä '
        + 'vaara ollut todellinen. Espanja miehitti kesäkuussa Larachen ja '
        + 'Ksar el-Kebirin.'
        + '\n\nKun Ranskan aloittamiin neuvotteluihin ei kuulunut vastausta, '
        + 'Saksan ulkoministeri Kiderlen-Waechter pyysi keisarilta luvan '
        + 'lähettää tykkiveneen. SMS Panther saapui Agadiriin 1. heinäkuuta '
        + '1911, ja muutamaa päivää myöhemmin sen korvasi risteilijä SMS '
        + 'Berlin. Saksalainen siviili Hermann Wilberg, jonka pelastaminen oli '
        + 'esitetty syyksi, lähetettiin paikalle 110 kilometrin päästä ja ehti '
        + 'perille vasta kolme päivää laivan jälkeen.'
        + '\n\nHeinäkuun 21. päivänä valtiovarainministeri David Lloyd George '
        + 'sanoi Lontoossa Mansion Housessa, että nöyryytyksellä ostettu rauha '
        + 'olisi suurvallalle sietämätön; Saksassa se luettiin varoitukseksi. '
        + 'Samaan aikaan Berliiniä koetteli rahoituskriisi: pörssi laski '
        + 'yhdessä päivässä 30 prosenttia ja Reichsbank menetti kuukaudessa '
        + 'viidenneksen kullastaan. Marraskuun 4. päivänä sovittiin, että '
        + 'Ranska ottaa Marokon protektoraatikseen ja luovuttaa osan Ranskan '
        + 'Kongosta Saksan Kamerunille.',
      lahde: 'en-Wikipedia "Agadir Crisis", johdanto-osa sekä osiot '
        + '"Background", "Events" ja "Negotiations". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä Saksa sai lopulta vastineeksi?',
        vaihtoehdot: [
          'Osan Ranskan Kongosta',
          'Agadirin sataman',
          'Kaksi laivastotukikohtaa Marokosta',
        ],
        oikea: 0,
      },
    },
    /*
     * Annualin leiri Ait Oulichekin laaksossa Rifin vuorilla.
     * Lähde: en.wikipedia.org: Battle of Annual
     */
    {
      id: 'annualin-katastrofi',
      otsikko: 'Sata kolmekymmentä kilometriä ilman vesipistettä',
      nimio: 'Annual',
      vuosi: '1921',
      paikka: 'Annual, Rifin vuoret',
      lat: 35.12, lon: -3.583,
      kortti: 'Espanja eteni 1921 Rifiin ilman kunnollisia linnakkeita, '
        + 'yhteyksiä tai vesipisteitä. Kesäkuussa menetettiin yksi etuvartio, '
        + 'heinäkuussa toinen. Heinäkuun 22. päivänä perääntyminen muuttui '
        + 'pakokauhuksi, ja seuraukset kaatoivat hallituksia Madridissa.',
      teksti: 'Kenraali Manuel Fernández Silvestre aloitti alkuvuodesta 1921 '
        + 'hyökkäyksen rannikolta Koillis-Marokkoon. Joukot työntyivät lähes '
        + '130 kilometriä eteenpäin ilman että yhteydet oli turvattu tai '
        + 'selustan alueet alistettu. Uutta aluetta piti hallussaan vain '
        + 'pieniä tukikohtia, joissa oli 12–20 miestä; ne olivat kaukana '
        + 'toisistaan, korkeilla paikoilla, kaukana vedestä ja huonojen '
        + 'yhteyksien päässä. Päämääränä oli pysyvä tukikohta Al Hoceiman '
        + 'lahden rannalla.'
        + '\n\nRifiläisiä joukkoja johti Abd el-Krim, entinen virkamies ja '
        + 'tulkki Espanjan alkuperäisasiain toimistossa Melillassa. Kesäkuun '
        + 'ensimmäisenä päivänä rifiläiset valtasivat vain tunteja aiemmin '
        + 'pystytetyn tukikohdan Abarrán-vuorella, ja 179 espanjalaissotilasta '
        + 'kuoli. Neljä päivää myöhemmin ylikomissaari Dámaso Berenguer '
        + 'kieltäytyi lähettämästä Silvestrelle vahvistuksia. Igueribenin '
        + 'asema piiritettiin 14. heinäkuuta; kun se evakuoitiin 21. '
        + 'heinäkuuta, kolmensadan miehen varuskunnasta selvisi 33.'
        + '\n\nSeuraavana päivänä noin 3 000 rifiläistä hyökkäsi Annualin '
        + 'leiriin, jossa oli 5 000 miestä. Silvestre määräsi perääntymään '
        + 'kohti Melillaa, mutta kolonna hajosi lähes heti, ja marokkolaiset '
        + 'apujoukot ja liittolaisheimot siirtyivät vastapuolelle. Espanjassa '
        + 'tapahtumaa kutsutaan Annualin katastrofiksi. Se kaatoi useita '
        + 'hallituksia, johti Miguel Primo de Riveran sotilasdiktatuuriin ja '
        + 'lopulta kuningas Alfonso XIII:n luopumiseen kruunusta.',
      lahde: 'en-Wikipedia "Battle of Annual", johdanto-osa sekä osiot '
        + '"Background", "Annual" ja "Battle". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuka johti rifiläisiä Annualissa?',
        vaihtoehdot: [
          'Dámaso Berenguer',
          'Manuel Fernández Silvestre',
          'Abd el-Krim',
        ],
        oikea: 2,
      },
    },
  ],
  /*
   * ══ ERÄ M10, AASIA 3 6.9.2026 ═══════════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M10 (JPN, KOR, TWN, KAZ, MNG) tuo kaksi skandaalia kuhunkin
   * viiteen maahan — kymmenen uutta. Kaikki ovat kuvattomia kuten erän
   * muutkin nostot, ja jokaisen lähderivi nimeää en-Wikipedian
   * artikkelin ja osan sekä tarkistuspäivän.
   *
   * PAIKAT ON MITATTU. Yksikään uusi merkki ei ole pelikaupungin
   * kohdalla (KAUPUNGIN_KOHDALLA_SADE 7 lautayksikköä,
   * js/fokuskohteet.js): lähin on Namamugi 19,7 yksikön päässä
   * Tokio-laatasta ja kaukaisin Aralin kaupunki 336,3 yksikön päässä
   * Samarkandista. Nimiölimitystä ei ole yhtään
   * (tools/tarkista-nimiolimitys.mjs).
   *
   * HERKKIEN AIHEIDEN LINJAUS ON SITOVA (docs/aasia-tyoaineisto/
   * spec-asia.md). Taiwanin korteissa ei ole salmikysymystä eikä
   * nykypolitiikkaa: aiheet ovat vuoden 1867 haaksirikko ja saaren oma
   * ydinjätekiista. Japanin kortit ovat ympäristö- ja
   * diplomatiahistoriaa, eivät sotahistoriaa. Kazakstanin ydinkoealue
   * ja Araljärvi kerrotaan lähteen katteessa ilman uhrilukujen
   * korostusta, ja Mongolian 1930-luvun vainoista kerrotaan
   * artikkelin omalla tarkkuudella.
   */
  JPN: [
    /*
     * Namamugin kylä Tōkaidō-tien varrella (nykyinen Jokohama).
     * Lähde: en.wikipedia.org: Namamugi Incident
     */
    {
      id: 'namamugi',
      otsikko: 'Ratsastaja, joka ei väistänyt ruhtinaan saattuetta',
      nimio: 'Namamugi',
      vuosi: '1862',
      paikka: 'Namamugin kylä, Tōkaidō-tie',
      lat: 35.491389, lon: 139.663611,
      kortti: 'Neljä brittiä ratsasti temppeliretkelle valtatietä, jota '
        + 'virkamiehet olivat kieltäneet käyttämästä sinä päivänä. Vastaan '
        + 'tuli ruhtinaan saattue. Kauppias Charles Lennox Richardson ei '
        + 'väistänyt tarpeeksi, ja hänet surmattiin tien poskeen — vuotta '
        + 'myöhemmin sen laskun maksoi kokonainen kaupunki.',
      teksti: 'Namamugin tapaus eli Richardsonin juttu oli poliittinen kriisi, '
        + 'joka syntyi Tokugawa-shogunaatin Japanissa 14. syyskuuta 1862. '
        + 'Brittikauppias Charles Lennox Richardson sai surmansa Satsuman '
        + 'ruhtinaskunnan sijaishallitsijan Shimazu Hisamitsun aseistetun '
        + 'saattueen käsissä Namamugin kylän kohdalla lähellä Kawasakia.'
        + '\n\nSeurue oli lähtenyt Jokohaman sopimussatamasta iltapäivällä: '
        + 'Shanghaissa asuva Richardson, kaksi Jokohaman kauppiasta ja '
        + 'toisen källy olivat matkalla Kawasaki Daishin temppelille, '
        + 'vaikka virkamiehet olivat varoittaneet heitä kulkemasta '
        + 'Tōkaidō-tietä sinä päivänä, koska ruhtinaan saattue oli tulossa. '
        + 'Richardson oli juuri ilmoittanut jäävänsä eläkkeelle ja teki '
        + 'retkeä ennen paluutaan Englantiin.'
        + '\n\nSurma nostatti eurooppalaisissa kiivaan vastalauseiden '
        + 'myrskyn: heidän mukaansa se loukkasi ulkomaalaisten '
        + 'eksterritoriaalioikeutta Japanissa. Japanilaiset puolestaan '
        + 'katsoivat, että Richardson oli osoittanut Shimazua kohtaan '
        + 'epäkunnioitusta ja että surma oli kiri-sute gomen -säännön '
        + 'mukaan oikeutettu.'
        + '\n\nBritannia vaati korvauksia. Kun Satsuma ei vastannut, seurasi '
        + 'elokuussa 1863 Kagoshiman pommitus eli Britannian ja Satsuman '
        + 'sota.',
      lahde: 'en-Wikipedia "Namamugi Incident", johdanto-osa ja osio '
        + '"Course of events". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mihin Richardsonin surma johti vuotta myöhemmin?',
        vaihtoehdot: [
          'Japanin rajojen sulkemiseen',
          'Kagoshiman pommitukseen',
          'Shogunaatin kaatumiseen',
        ],
        oikea: 1,
      },
    },
    /*
     * Minamatan kaupunki Kumamoton prefektuurissa (Chisson tehdas).
     * Lähde: en.wikipedia.org: Minamata disease; Minamata, Kumamoto
     */
    {
      id: 'minamatan-tauti',
      otsikko: 'Tanssiva kissa, joka varoitti ennen ihmisiä',
      nimio: 'Minamata',
      vuosi: '1932–1968',
      paikka: 'Minamatan lahti, Kumamoto',
      lat: 32.216667, lon: 130.4,
      kortti: 'Lahden kalastajakylässä kissat alkoivat horjua ja pyöriä '
        + 'ympyrää. Ilmiölle annettiin nimi tanssiva kissakuume. Vasta '
        + 'myöhemmin ymmärrettiin, että sama myrkky oli jo ihmisissä — ja '
        + 'että sitä oli laskettu lahteen tehtaan jätevedessä jo '
        + 'vuosikymmeniä.',
      teksti: 'Minamatan tauti on vaikean elohopeamyrkytyksen aiheuttama '
        + 'hermostosairaus. Oireita ovat liikkeiden hallinnan menetys, '
        + 'käsien ja jalkojen puutuminen, lihasheikkous, näkökentän '
        + 'kaventuminen sekä kuulon ja puheen vauriot; pahimmillaan '
        + 'seuraa halvaus ja kuolema viikoissa. Sairaus todettiin '
        + 'ensimmäisen kerran Minamatan kaupungissa Kumamoton '
        + 'prefektuurissa vuonna 1956.'
        + '\n\nSyy oli metyylielohopea, jota Chisso-yhtiön kemiantehdas '
        + 'laski jätevedessään lahteen vuodesta 1932 vuoteen 1968. Myrkky '
        + 'kertyi ja väkevöityi Minamatan lahden ja Shiranuin meren '
        + 'simpukoissa ja kaloissa, ja kun paikalliset söivät niitä, he '
        + 'saivat myrkytyksen. Ihmisiä ja eläimiä kuoli 36 vuoden ajan, '
        + 'eivätkä Chisso ja Kumamoton prefektuurin hallinto tehneet juuri '
        + 'mitään estääkseen sitä. Kissoilla oireet olivat niin rajut, '
        + 'että ilmiötä alettiin kutsua tanssivaksi kissakuumeeksi.'
        + '\n\nChisso oli avannut tehtaansa Minamataan 1908 ja kasvanut '
        + 'Japanin kehittyneimmäksi kemiantehtaaksi. Se oli myös koko '
        + 'kaupungin elinehto: parhaimmillaan yli puolet kaupungin '
        + 'verotuloista tuli yhtiöltä ja sen työntekijöiltä. Kalastukselle '
        + 'tehdas oli aiheuttanut vahinkoa jo aiemmin, ja yhtiö oli '
        + 'sopinut korvauksista kalastusosuuskunnan kanssa 1926 ja 1943.'
        + '\n\nMaaliskuuhun 2001 mennessä 2 265 ihmistä oli virallisesti '
        + 'todettu Minamatan tautiin sairastuneeksi ja yli 10 000 oli '
        + 'saanut Chissolta rahallisen korvauksen. Vuoteen 2004 mennessä '
        + 'yhtiö oli maksanut korvauksia 86 miljoonaa dollaria, ja samana '
        + 'vuonna se määrättiin puhdistamaan saastuttamansa alue. Toinen '
        + 'taudinpurkaus todettiin Niigatan prefektuurissa 1965.',
      lahde: 'en-Wikipedia "Minamata disease", johdanto-osa ja osio '
        + '"1908–1955", sekä "Minamata, Kumamoto", johdanto-osa. '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä aine aiheutti Minamatan taudin?',
        vaihtoehdot: [
          'Lyijy',
          'Metyylielohopea',
          'Kadmium',
        ],
        oikea: 1,
      },
    },
  ],
  KOR: [
    /*
     * Ganghwan saari Han-joen suulla (Oegyujanggakin kirjasto).
     * Lähde: en.wikipedia.org: Uigwe; Ganghwa Island
     */
    {
      id: 'oegyujanggak',
      otsikko: 'Kuninkaan kirjat, jotka palasivat 145 vuoden jälkeen',
      nimio: 'Oegyujanggak',
      vuosi: '1866',
      paikka: 'Ganghwan saari, Han-joen suu',
      lat: 37.71, lon: 126.44,
      kortti: 'Saarelle oli rakennettu kuninkaan kirjaston sivupiste, jossa '
        + 'säilytettiin hallitsijan omia juhlamenokirjoja. Kun retkikunta '
        + 'ei päässyt puhumaan viranomaisten kanssa, se hyökkäsi saarelle '
        + 'ja otti kirjat mukaansa. Ne löytyivät Pariisista vasta '
        + 'vuonna 1975.',
      teksti: 'Uigwe on nimitys noin 3 895 kirjan kokoelmalle, johon on '
        + 'kirjattu yksityiskohtaisesti Korean Joseon-dynastian '
        + 'kuninkaalliset rituaalit ja seremoniat: virkaanasettajaiset, '
        + 'kruunajaiset, häät, juhla-ateriat, muotokuvien maalaaminen, '
        + 'hautajaiset ja esi-isien palvonta. Unesco liitti kokoelman '
        + 'Maailman muisti -rekisteriin 2007.'
        + '\n\nVuonna 1782 Ganghwan saarelle vanhaan kuninkaanpalatsiin '
        + 'rakennettiin Gyujanggakin sivukirjasto, Oegyujanggak, koska '
        + 'Soulin Changdeokgungin pääkirjasto oli täynnä. Sinne siirrettiin '
        + 'suurin osa kuninkaan omista katselukappaleista, jotka erottuivat '
        + 'silkkikansistaan ja hienoimmasta paperistaan.'
        + '\n\nVuonna 1866, sen jälkeen kun Koreassa oli teloitettu joukko '
        + 'ranskalaisia katolisia lähetyssaarnaajia, ranskalainen '
        + 'retkikunta saapui Kiinasta vaatimaan selitystä. Kun se ei saanut '
        + 'yhteyttä viranomaisiin, joukot hyökkäsivät Ganghwan saarelle ja '
        + 'ottivat kuninkaalliset kirjat sekä suuren määrän hopeaesineitä '
        + 'ja muuta kuninkaallista omaisuutta. Kirjat päätyivät Ranskan '
        + 'kansalliskirjastoon Pariisiin, ja ne unohtuivat sinne, kunnes '
        + 'korealainen tutkija Park Byeongseon löysi ne 1975.'
        + '\n\nPalautusta pyydettiin virallisesti 1992. Presidentti François '
        + 'Mitterrand palautti yhden niteen 1993, ja lopullinen ratkaisu '
        + 'syntyi vasta 2010 Soulin G20-kokouksessa: kirjat palaisivat '
        + 'viideksi vuodeksi kerrallaan uusittavalla lainalla. Huhti–'
        + 'kesäkuussa 2011 Koreaan palautettiin neljässä erässä 297 nidettä, '
        + 'joissa oli 191 eri uigwea. Ne ovat nyt Korean kansallismuseossa.',
      lahde: 'en-Wikipedia "Uigwe", johdanto-osa sekä osiot "Content" ja '
        + '"Repatriation", ja "Ganghwa Island", johdanto-osa. '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mistä kadonneet uigwe-kirjat löytyivät vuonna 1975?',
        vaihtoehdot: [
          'Ranskan kansalliskirjastosta',
          'Tokion yliopistosta',
          'Ganghwan saaren kellarista',
        ],
        oikea: 0,
      },
    },
    /*
     * Geomundon saariryhmä Jejun salmessa (Port Hamilton).
     * Lähde: en.wikipedia.org: Port Hamilton incident; Geomundo
     */
    {
      id: 'port-hamilton',
      otsikko: 'Saari, jonka laivasto otti kysymättä',
      nimio: 'Port Hamilton',
      vuosi: '1885–1887',
      paikka: 'Geomundon saaret, Jejun salmi',
      lat: 34.026389, lon: 127.3125,
      kortti: 'Kolme pientä saarta muodostaa luonnonsataman Korean '
        + 'eteläpuolella. Britannian laivasto miehitti sen huhtikuussa '
        + '1885 varmuuden vuoksi — huhu Venäjän hiilivarastosta riitti. '
        + 'Kaksi vuotta myöhemmin laivat lähtivät yhtä äkkiä kuin olivat '
        + 'tulleetkin.',
      teksti: 'Geomundon eli Port Hamiltonin tapaus oli Britannian '
        + 'kuninkaallisen laivaston sotilaallinen miehitys Geomundon '
        + 'saarilla 15. huhtikuuta 1885 – 27. helmikuuta 1887. Saaret ovat '
        + 'pieni ryhmä Jejun salmessa Korean niemimaan eteläpuolella: kolme '
        + 'pääsaarta, joista kaksi suurempaa muodostaa sataman ja '
        + 'keskimmäisellä, Tähtitornisaarella, oli brittien tukikohta.'
        + '\n\nSir Edward Belcher oli kartoittanut sataman 1845 HMS '
        + 'Samarangilla ja nimennyt sen amiraliteetin silloisen sihteerin, '
        + 'kapteeni W. A. B. Hamiltonin mukaan. Sen strateginen merkitys '
        + 'huomattiin muuallakin: venäläinen vara-amiraali Jevfimi Putjatin '
        + 'kävi saarilla useaan otteeseen ja sai 1857 asukkailta luvan '
        + 'perustaa sinne hiilivaraston.'
        + '\n\nVenäjä aikoi käyttää saarta hiilivarastona, ja Britannian '
        + 'hallitus hälyttyi huhuista, joiden mukaan Venäjän ja Korean '
        + 'välillä olisi salainen sopimus — vaikka huhut ehtivät hallituksen '
        + 'käsiin vasta miehityspäätöksen jälkeen. Satama otettiin, jotta '
        + 'Britannialla olisi Kiinan ulkopuolinen tukikohta Kaukoidässä, jos '
        + 'sota Venäjän kanssa syttyisi. Julkisuudessa hallitus selitti '
        + 'estävänsä Venäjää valtaamasta saaria.'
        + '\n\nVenäjä uhkasi vastaukseksi miehittää osia Koreasta. Kun se '
        + 'lopulta vakuutti, ettei valtaa Koreasta mitään, britit vetäytyivät. '
        + 'Saarten ottamista oli ehdotettu jo heinäkuussa 1875, mutta '
        + 'ulkoministeri lordi Derby oli hylännyt ajatuksen huonona '
        + 'ennakkotapauksena.',
      lahde: 'en-Wikipedia "Port Hamilton incident", koko artikkeli, ja '
        + '"Geomundo", johdanto-osa sekä osio "History". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi britit lopulta vetäytyivät saarilta?',
        vaihtoehdot: [
          'Korea maksoi heille korvauksen',
          'Venäjä vakuutti, ettei valtaa Koreasta mitään',
          'Satama osoittautui liian matalaksi',
        ],
        oikea: 1,
      },
    },
  ],
  TWN: [
    /*
     * Eluanbin niemi, Taiwanin eteläisin kärki (haaksirikon seutu).
     * Lähde: en.wikipedia.org: Rover incident; Cape Eluanbi
     */
    {
      id: 'rover-haaksirikko',
      otsikko: 'Haaksirikko, joka päättyi suulliseen sopimukseen',
      nimio: 'Rover',
      vuosi: '1867',
      paikka: 'Eluanbin niemi, Hengchun',
      lat: 21.902222, lon: 120.852778,
      kortti: 'Amerikkalainen purjelaiva ajoi riutalle Taiwanin eteläkärjessä. '
        + 'Rannalle päässeet surmattiin, ja sotalaivat lähetettiin '
        + 'kostoretkelle — mutta ratkaisu syntyi vasta, kun konsuli marssi '
        + 'sisämaahan ja istui alas päällikön kanssa.',
      teksti: 'Roverin tapaus sattui 12. maaliskuuta 1867, kun '
        + 'amerikkalainen kauppalaiva Rover haaksirikkoutui Taiwanin '
        + 'rannikolla matkalla Shantoun ja Niuzhuangin välillä. Laiva osui '
        + 'Qixingyanin korallikariin lähellä Eluanbin niemeä ja ajautui '
        + 'nykyisen Hengchunin seudulle. Neljätoista amerikkalaista '
        + 'merimiestä, heidän joukossaan kapteeni Joseph Hunt ja hänen '
        + 'vaimonsa, surmattiin: paiwan-kansan kulaljuc-heimo kosti näin '
        + 'sen, että ulkomaalaiset olivat aiemmin tappaneet heimon jäseniä.'
        + '\n\nYhdysvaltain Amoyn-konsuli Charles William Le Gendre matkusti '
        + 'Fuzhouhun painostamaan Fujianin ja Zhejiangin varakuninkaita '
        + 'puuttumaan asiaan. Rankaisuretki epäonnistui: kesäkuussa 1867 '
        + '181 upseeria, merimiestä ja merijalkaväen sotilasta nousi '
        + 'maihin, mutta helteessä miehiä kaatui auringonpistoksiin, '
        + 'vastapuoli ampui viidakon suojasta ja retkikunta joutui '
        + 'perääntymään laivoille.'
        + '\n\nLe Gendre palasi saarelle syyskuussa 1867 ja marssi '
        + 'kiinalaisten joukkojen kanssa syvälle alkuperäiskansojen '
        + 'alueelle. William A. Pickeringin ja James Hornin avulla hän '
        + 'neuvotteli suullisen sopimuksen Tokitokin kanssa, joka oli '
        + 'seudun kahdeksantoista paiwan-heimon päällikkö.'
        + '\n\nTokitok selitti, että kauan sitten valkoiset miehet olivat '
        + 'lähes hävittäneet kulaljuc-heimon ja että kostonhalu oli '
        + 'periytynyt sukupolvelta toiselle. Sopimuksessa vuorten '
        + 'alkuperäisasukkaat lupasivat, etteivät enää surmaa haaksirikkoon '
        + 'joutuneita vaan huolehtivat heistä ja luovuttavat heidät '
        + 'kiinalaisille Langqiaossa.',
      lahde: 'en-Wikipedia "Rover incident", johdanto-osa sekä osiot '
        + '"Shipwreck", "American reaction" ja "Second visit", ja '
        + '"Cape Eluanbi", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kenen kanssa Le Gendre lopulta neuvotteli sopimuksen?',
        vaihtoehdot: [
          'Qing-dynastian keisarin',
          'Paiwan-päällikkö Tokitokin',
          'Hollannin kuvernöörin',
        ],
        oikea: 1,
      },
    },
    /*
     * Lanyun saari Taitungin edustalla (ydinjätevarasto). Artikkelissa
     * ei ole koordinaattipropia, joten merkki on asetettu saaren
     * kohdalle 22,05 N / 121,53 E.
     * Lähde: en.wikipedia.org: Orchid Island
     */
    {
      id: 'lanyun-ydinjate',
      otsikko: 'Varasto, jota ei kerrottu saaren asukkaille',
      nimio: 'Lanyu',
      vuosi: '1982',
      paikka: 'Lanyun saari, Taitung',
      lat: 22.05, lon: 121.53,
      kortti: 'Tulivuorisaarella asuu tao-kansa, jonka perinteet ovat '
        + 'säilyneet parhaiten koko Taiwanissa. Vuonna 1982 saarelle '
        + 'rakennettiin ydinjätevarasto kysymättä asukkailta. Tynnyreitä on '
        + 'nyt satatuhatta.',
      teksti: 'Lanyu eli Orkideasaari on 45 neliökilometrin tulivuorisaari '
        + 'Taiwanin kaakkoispuolella. Sen alkuperäisasukkaat, tao-kansa, '
        + 'kutsuvat saarta nimellä Pongso no Tao, ihmisten saari. Saari '
        + 'oli pitkään omillaan ja kävi kauppaa Filippiinien '
        + 'Batanes-saarten kanssa.'
        + '\n\nJapanin vallan aikana saari julistettiin '
        + 'kansatieteelliseksi tutkimusalueeksi, jonne ulkopuolisilla ei '
        + 'ollut asiaa, ja rajoitukset jäivät voimaan vielä sen jälkeenkin. '
        + 'Juuri siksi tao-kansan perinteet ovat säilyneet parhaiten '
        + 'kaikista Taiwanin alkuperäiskansoista, vaikka asutus- ja '
        + 'matkailukielto purettiin 1967.'
        + '\n\nVuonna 1982 saarelle rakennettiin ydinjätevarasto '
        + 'neuvottelematta etukäteen saaren asukkaiden kanssa. Varastoon '
        + 'tuodaan jätettä Taiwanin kolmesta ydinvoimalasta, joita hoitaa '
        + 'valtion sähköyhtiö Taipower, ja saarelle on kertynyt noin '
        + '100 000 tynnyriä ydinjätettä.'
        + '\n\nTaot ovat vastustaneet varastoa ja 1990-luvun alusta lähtien '
        + 'osoittaneet mieltään päästäkseen eroon ydinjätteen '
        + '"pahoista hengistä". Suuria mielenosoituksia oli 2002 ja 2012, '
        + 'ja niissä vaadittiin Taipoweria viemään jäte pois saarelta.',
      lahde: 'en-Wikipedia "Orchid Island", johdanto-osa sekä osiot '
        + '"Imperial Japan" ja "Republic of China". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä saarelle rakennettiin 1982 kysymättä asukkailta?',
        vaihtoehdot: [
          'Sotilaslentokenttä',
          'Ydinjätevarasto',
          'Kalanjalostamo',
        ],
        oikea: 1,
      },
    },
  ],
  KAZ: [
    /*
     * Semipalatinskin koealue Irtyšin eteläpuolella (Polygon).
     * Lähde: en.wikipedia.org: Semipalatinsk Test Site
     */
    {
      id: 'semipalatinskin-koealue',
      otsikko: 'Aro, jota sanottiin asumattomaksi',
      nimio: 'Polygon',
      vuosi: '1949–1991',
      paikka: 'Semipalatinskin koealue, Abain alue',
      lat: 50.383333, lon: 77.783333,
      kortti: 'Kartalla se oli tyhjä 18 000 neliökilometrin laikku. Sen '
        + 'valinnut ministeri sanoi aroa asumattomaksi, vaikka se ei ollut '
        + 'sitä. Neljänkymmenen vuoden aikana siellä tehtiin neljäsosa '
        + 'kaikista maailman ydinkokeista.',
      teksti: 'Semipalatinskin koealue eli Polygon oli Neuvostoliiton '
        + 'tärkein ydinasekoepaikka. Se sijaitsee Abain alueella '
        + 'Kazakstanissa Irtyš-joen laakson eteläpuolella; tutkimusrakennukset '
        + 'olivat noin 150 kilometriä Semipalatinskin — nykyisen Semeyn — '
        + 'kaupungista länteen, ja itse kokeet tehtiin niistä vielä '
        + 'lännemmäksi ja etelämmäksi.'
        + '\n\nPaikan valitsi 1947 Lavrenti Beria, Neuvostoliiton '
        + 'atomipommihankkeen poliittinen johtaja, joka väitti 18 000 '
        + 'neliökilometrin aroa asumattomaksi. Koelaitokset rakennettiin '
        + 'vankileirien työvoimalla.'
        + '\n\nVuosina 1949–1989 Neuvostoliitto teki alueella 456 ydinkoetta '
        + 'piittaamatta juuri lainkaan niiden vaikutuksesta paikallisiin '
        + 'ihmisiin tai ympäristöön. Siellä räjäytettiin sekä ensimmäinen '
        + 'neuvostoliittolainen atomipommi että ensimmäinen ilmassa testattu '
        + 'vetypommi, ja neljänkymmenen vuoden aikana alueella tehtiin '
        + 'neljäsosa kaikista maailman ydinkokeista.'
        + '\n\nSäteilyaltistuksen koko laajuus pidettiin vuosikausia '
        + 'salassa, ja se on tullut ilmi vasta koealueen sulkemisen jälkeen. '
        + 'Kazakstanilaisten asiantuntijoiden arvion mukaan 1,5 miljoonaa '
        + 'ihmistä altistui laskeumalle vuosien varrella. Koealue suljettiin '
        + '29. elokuuta 1991, ja siitä on sittemmin tullut maailman '
        + 'tutkituin ydinkoealue — ja ainoa, joka on ympäri vuoden avoinna '
        + 'yleisölle.',
      lahde: 'en-Wikipedia "Semipalatinsk Test Site", johdanto-osa ja osio '
        + '"History". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuinka suuri osa maailman ydinkokeista tehtiin Polygonilla?',
        vaihtoehdot: [
          'Neljäsosa',
          'Puolet',
          'Yksi kymmenesosa',
        ],
        oikea: 0,
      },
    },
    /*
     * Aralin (Aralskin) kaupunki, entinen kalasatama järven pohjoisrannalla.
     * Lähde: en.wikipedia.org: Aral Sea; Aral, Kazakhstan
     */
    {
      id: 'aralin-kalasatama',
      otsikko: 'Kalasatama, jonka edestä meri lähti',
      nimio: 'Aralin satama',
      vuosi: '1960–2007',
      paikka: 'Aralin kaupunki, Kyzylorda',
      lat: 46.783333, lon: 61.666667,
      kortti: 'Kaupunki oli kalasatama järven rannalla ja toimitti kalaa koko '
        + 'seudulle. Sitten järveen laskevat joet käännettiin '
        + 'puuvillapelloille. Ranta perääntyi kymmeniä kilometrejä, ja '
        + 'satamaan jäivät vain laivojen rungot.',
      teksti: 'Araljärvi oli suolainen, laskujoeton järvi Kazakstanin ja '
        + 'Uzbekistanin välissä. Nimi tarkoittaa mongoli- ja turkkilaiskielillä '
        + 'suunnilleen saarten merta: järvessä oli aikoinaan yli 1 100 saarta. '
        + 'Se oli maailman kolmanneksi suurin järvi, pinta-alaltaan 68 000 '
        + 'neliökilometriä.'
        + '\n\nJärvi alkoi kutistua 1960-luvulla, kun sitä ruokkivat joet '
        + 'käännettiin neuvostoliittolaisiin kastelujärjestelmiin. Vuoteen '
        + '2007 mennessä siitä oli jäljellä kymmenesosa alkuperäisestä, ja se '
        + 'oli jakautunut neljäksi erilliseksi järveksi. Vuonna 2009 '
        + 'kaakkoinen järvi oli kadonnut, ja NASAn satelliittikuvat '
        + 'paljastivat elokuussa 2014, että itäinen allas oli kuivunut '
        + 'kokonaan ensimmäistä kertaa uudella ajalla. Sitä kutsutaan nyt '
        + 'Aralkumin autiomaaksi.'
        + '\n\nAral eli Aralsk oli kalasatama järven pohjoisrannalla ja '
        + 'seudun tärkein kalantoimittaja. Alueen kalastuselinkeino tuhoutui, '
        + 'mukanaan tulivat työttömyys ja köyhyys, ja seutu on pahoin '
        + 'saastunut, mistä on seurannut vakavia terveysongelmia. YK:n '
        + 'pääsihteeri Ban Ki-moon kutsui järven kuivumista vuonna 2011 '
        + '"yhdeksi maapallon pahimmista ympäristökatastrofeista".'
        + '\n\nPohjoisosaa on yritetty pelastaa. Kokaralin pato valmistui '
        + '2005, ja vuoteen 2008 mennessä vedenpinta oli noussut '
        + 'kaksitoista metriä vuoden 2003 tasosta. Vuoteen 2013 mennessä '
        + 'suolapitoisuus oli laskenut ja kalaa oli taas niin paljon, että '
        + 'kalastus kannatti.',
      lahde: 'en-Wikipedia "Aral Sea", johdanto-osa, ja "Aral, Kazakhstan", '
        + 'johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä sai Araljärven kutistumaan 1960-luvulta alkaen?',
        vaihtoehdot: [
          'Maanjäristys muutti pohjaa',
          'Järveen laskevat joet käännettiin kasteluun',
          'Ilmasto muuttui yhtäkkiä kuivaksi',
        ],
        oikea: 1,
      },
    },
  ],
  MNG: [
    /*
     * Ongiin luostarin rauniot Ongi-joen varrella, Dundgovi.
     * Lähde: en.wikipedia.org: Ongi Monastery
     */
    {
      id: 'ongiin-luostari',
      otsikko: 'Kaksi luostaria joen kahden puolen, molemmat maan tasalle',
      nimio: 'Ongi',
      vuosi: '1939',
      paikka: 'Ongi-joki, Saikhan-Ovoo',
      lat: 45.339808, lon: 104.004278,
      kortti: 'Joen molemmilla rannoilla oli luostari: yhteensä 28 temppeliä, '
        + 'neljä buddhalaista yliopistoa ja tuhat munkkia. Vuonna 1939 '
        + 'molemmat hävitettiin perustuksia myöten. Ensimmäinen uusi '
        + 'temppeli vihittiin vasta 2004.',
      teksti: 'Ongiin luostari on yhteisnimi kahden luostarin raunioille, '
        + 'jotka ovat vastakkain Ongi-joen rannoilla Saikhan-Ovoon '
        + 'piirissä Dundgovin aimakissa Etelä-Keski-Mongoliassa. '
        + 'Barlimin luostari on pohjoisrannalla ja Khutagtin luostari '
        + 'etelärannalla.'
        + '\n\nVanhempaan eteläiseen kokonaisuuteen kuului hallintorakennuksia '
        + 'ja yksitoista temppeliä. Pohjoinen kokonaisuus rakennettiin '
        + '1700-luvulla, ja siinä oli seitsemäntoista temppeliä, niiden '
        + 'joukossa yksi koko Mongolian suurimmista. Alueella toimi myös '
        + 'neljä buddhalaista yliopistoa. Luostari perustettiin 1660, ja '
        + 'suurimmillaan siellä asui yli tuhat munkkia.'
        + '\n\nMolemmat kokonaisuudet tuhottiin täysin vuonna 1939 '
        + 'uskonnonvastaisissa vainoissa, joita johti Mongolian '
        + 'kommunistisen puolueen johtaja Khorloogiin Tšoibalsan. Yli 200 '
        + 'munkkia surmattiin, ja monet eloon jääneet vangittiin tai '
        + 'pakotettiin luopumaan munkkiudesta ja määrättiin armeijaan.'
        + '\n\nJoen varrella ja ympäröivillä kukkuloilla on yhä paljon '
        + 'raunioita ja korkea stupa. 1990-luvulla päätettiin rakentaa '
        + 'luostari uudelleen: ensimmäinen temppeli vihittiin 2004, ja sen '
        + 'edessä olevassa gerissä on pieni museo. Yhteen kunnostettuun '
        + 'stupaan on kiinnitetty muistolaatta munkkien nimillä.',
      lahde: 'en-Wikipedia "Ongi Monastery", johdanto-osa. '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Milloin Ongiin luostari tuhottiin?',
        vaihtoehdot: [
          'Vuonna 1860',
          'Vuonna 1939',
          'Vuonna 1990',
        ],
        oikea: 1,
      },
    },
    /*
     * Nemegtin muodostuma Gobissa (Tarbosaurus-fossiilien alue).
     * Lähde: en.wikipedia.org: Tarbosaurus; Nemegt Formation
     */
    {
      id: 'tarbosaurus-huutokauppa',
      otsikko: 'Dinosaurus, joka pysäytettiin huutokauppakamarissa',
      nimio: 'Tarbosaurus',
      vuosi: '2012–2013',
      paikka: 'Nemegtin muodostuma, Gobi',
      lat: 43.5, lon: 101,
      kortti: 'New Yorkin huutokauppaluettelossa oli miljoonan dollarin '
        + 'dinosauruksenluuranko. Sen laji tunnetaan vain Gobista, ja '
        + 'Mongolian laki sanoo, että sieltä löytyvä fossiili kuuluu '
        + 'Mongoliaan. Presidentti puuttui asiaan päivää ennen vasaraniskua.',
      teksti: 'Tarbosaurus oli suuri petodinosaurus, jonka fossiileja '
        + 'löytyy vain Mongolian ja Kiinan Gobista. Molemmat maat '
        + 'kieltävät niiden viennin, mutta yksityiskeräilijät ovat silti '
        + 'ryöstäneet luita alueelta.'
        + '\n\nMiljoonan dollarin salakuljetuskauppa paljastui, kun '
        + 'Heritage Auctions -huutokauppakamarin luettelo New Yorkin '
        + '20. toukokuuta 2012 pidettävää tilaisuutta varten herätti '
        + 'epäilyksiä. Mongolian lain mukaan Gobista löytyvän fossiilin '
        + 'kuuluu jäädä mongolialaiseen laitokseen, eikä ollut juuri '
        + 'epäilystä siitä, etteikö luettelon Tarbosaurus bataar olisi '
        + 'varastettu.'
        + '\n\nMongolian presidentti ja lukuisat paleontologit vastustivat '
        + 'kauppaa, ja viime hetken tutkimus vahvisti, että kyseessä oli '
        + 'laji, jota löytyy vain Gobin autiomaasta ja joka kuului siis '
        + 'oikeutetusti Mongolialle.'
        + '\n\nOikeudenkäynnissä salakuljettaja Eric Prokopi tunnusti '
        + 'syyllisyytensä, ja dinosaurus palautettiin Mongoliaan 2013, '
        + 'missä sitä pidettiin esillä Ulan Batorin Sühbaatarin aukiolla. '
        + 'Prokopi oli myynyt luurangon yhdessä englantilaisen '
        + 'fossiilikauppiaan Christopher Mooren kanssa. Tapaus johti '
        + 'kymmenien mongolialaisten dinosaurusten palauttamiseen.',
      lahde: 'en-Wikipedia "Tarbosaurus", osio "Poached specimens", ja '
        + '"Nemegt Formation", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä huutokaupattavalle luurangolle lopulta tapahtui?',
        vaihtoehdot: [
          'Se myytiin yksityiskeräilijälle',
          'Se palautettiin Mongoliaan',
          'Se todettiin väärennökseksi',
        ],
        oikea: 1,
      },
    },
  ],
  /*
   * ══ ERÄ M14, AASIA 4 6.9.2026 ═══════════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M14 (AFG, PAK, UZB, PHL, CHN) tuo kaksi skandaalia kuhunkin
   * viiteen maahan — kymmenen uutta. Kaikki ovat kuvattomia kuten
   * erän muutkin nostot, ja jokaisen lähderivi nimeää en-Wikipedian
   * artikkelin ja osan sekä tarkistuspäivän.
   *
   * PAIKAT ON MITATTU. Yksikään uusi merkki ei ole pelikaupungin
   * kohdalla (KAUPUNGIN_KOHDALLA_SADE 7 lautayksikköä,
   * js/fokuskohteet.js): lähin on Gandamak 29,0 yksikön päässä
   * Kabul-laatasta ja toiseksi lähin Baguio 33,9 yksikön päässä
   * Manilasta. Nimiölimitystä ei ole yhtään
   * (tools/tarkista-nimiolimitys.mjs).
   *
   * AASIAN LINJAUS ON SITOVA (docs/aasia-tyoaineisto/spec-asia.md).
   * Afganistanin, Pakistanin ja Kiinan kortit ovat historiaa eivätkä
   * nykypolitiikkaa: 1842, 1849, 1842 ja 1928. Bamiyanin buddhien
   * tuho jätettiin skandaaleista pois, koska sama aihe on jo maan
   * fokuskohteena (js/packs/fokuskohteet-afg.js), ja Yuanmingyuan
   * samasta syystä Kiinassa (js/packs/fokuskohteet-chn.js).
   * Sotatapahtumat kerrotaan lähteen omalla tarkkuudella ilman
   * uhrilukujen korostusta, ja Balangigan kortti kertoo kellojen
   * matkan eikä sitä edeltäneitä tekoja yksityiskohtineen.
   */
  AFG: [
    /*
     * Gandamakin kylä Kabul–Jalalabad-tien varrella.
     * Lähde: en.wikipedia.org: 1842 retreat from Kabul
     */
    {
      id: 'gandamak-1842',
      otsikko: 'Armeija, josta perille pääsi yksi',
      nimio: 'Gandamak 1842',
      vuosi: '1842',
      paikka: 'Gandamak, Kabul–Jalalabadin tie',
      lat: 34.2892, lon: 70.0383,
      kortti: 'Tammikuussa 1842 yli 16 000 ihmistä lähti Kabulista kohti Jalalabadia '
        + 'sopimuksella, joka lupasi heille vapaan kulun. Lupaus ei pitänyt. Talvitiellä '
        + 'kolmen viikon matkasta tuli 1800-luvun Britannian pahin sotilaallinen tappio, '
        + 'ja Jalalabadin porteille ratsasti lopulta yksi eurooppalainen.',
      teksti: 'Ensimmäinen anglo-afgaanisota alkoi 1838, kun Itä-Intian kauppakomppania '
        + 'pelkäsi Venäjän vaikutusvallan kasvua Afganistanissa. Kenraalikuvernööri lordi '
        + 'Auckland päätti neuvonantajansa William Hay Macnaghtenin kehotuksesta tukea '
        + 'Shuja Shah Durrania ja sivuutti Alexander Burnesin neuvon. Britit ja komppanian '
        + 'joukot voittivat Dost Mohammad Barakzain ja miehittivät Kabulin 1839.'
        + '\n\nAsema kävi kestämättömäksi, ja kapina Kabulissa pakotti kenraalimajuri '
        + 'William Elphinstonen vetäytymään. Hän neuvotteli Dost Mohammadin pojan Wazir '
        + 'Akbar Khanin kanssa sopimuksen, jonka mukaan armeija saisi kulkea turvallisesti '
        + 'runsaan 140 kilometrin päähän Jalalabadin varuskuntaan.'
        + '\n\nHeti kaupungista lähdön jälkeen kimppuun hyökättiin, ja kolonnaa ahdisteltiin '
        + 'koko matkan lumisella tiellä. Kaikkiaan menetettiin 4 500 sotilasta ja noin 12 '
        + '000 siviiliä: sotilaiden perheitä, työmiehiä, palvelijoita ja muuta '
        + 'saattoväkeä. Viimeinen puolustus käytiin Gandamakin kylän liepeillä 13. '
        + 'tammikuuta 1842.'
        + '\n\nJalalabadiin pääsi eurooppalaisista vain apulaiskirurgi William Brydon ja '
        + 'muutama intialainen sepoy. Yli sata brittivankia ja siviilipanttivankia '
        + 'vapautettiin myöhemmin, ja noin 2 000 sepoyta palasi Intiaan seuraavan retken '
        + 'jälkeen. The Economist kutsui vetäytymistä 2013 Britannian pahimmaksi '
        + 'sotilaalliseksi katastrofiksi ennen Singaporen antautumista.',
      lahde: 'en-Wikipedia "1842 retreat from Kabul", johdanto-osa ja osio "Background". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuinka moni eurooppalainen pääsi Jalalabadiin asti?',
        vaihtoehdot: [
          'Yksi',
          'Noin sata',
          'Puolet kolonnasta',
        ],
        oikea: 0,
      },
    },
    /*
     * Tillya tepen kumpu Jowzjanissa lähellä Sheberghania.
     * Lähde: en.wikipedia.org: Tillya tepe; National Museum of Afghanistan
     */
    {
      id: 'baktrian-kulta',
      otsikko: 'Kaksikymmentätuhatta korua, jotka katosivat',
      nimio: 'Baktrian kulta',
      vuosi: '1978–2003',
      paikka: 'Tillya tepe, Jowzjan',
      lat: 36.694444, lon: 65.789444,
      kortti: 'Neuvostoliittolais-afganistanilainen retkikunta kaivoi 1978 kuudesta '
        + 'hautakummusta yli 20 000 kulta- ja hopeaesinettä. Sitten aarre katosi. Vuosia '
        + 'myöhemmin selvisi, ettei se ollut kadonnut vaan piilotettu — ja että museo, '
        + 'josta sen olisi pitänyt löytyä, oli sillä välin ryöstetty lähes tyhjäksi.',
      teksti: 'Tillya tepe eli kultainen kumpu on kaivauspaikka Pohjois-Afganistanin '
        + 'Jowzjanin maakunnassa lähellä Sheberghania. Neuvostoarkeologi Viktor Sarianidin '
        + 'johtama ryhmä kaivoi sen 1978, ja löytö tunnetaan nimellä Baktrian kulta.'
        + '\n\nKuudesta hautakummusta, viisi naista ja yksi mies, löytyi noin 20 600 '
        + 'esinettä: kaulakoruja puolijalokivineen, vöitä, medaljonkeja ja kruunu, tehtyinä '
        + 'kullasta, hopeasta ja norsunluusta. Haudat ajoittuvat ensimmäisen vuosisadan '
        + 'eaa. ja ensimmäisen vuosisadan jaa. vaihteeseen, ja niiden kolikot ovat '
        + 'Tiberiuksen, Mithradates II:n ja jueh-tših-hallitsija Sapadbizesin ajalta. '
        + 'Vainajat kuuluivat todennäköisesti jueh-tšeille eli varhaisille kušanoille.'
        + '\n\nVuonna 1989 kulta siirrettiin Afganistanin keskuspankin maanalaiseen '
        + 'holviin. Se osoittautui hyväksi ratkaisuksi: 1990-luvun alun levottomuuksissa '
        + 'Kabulin kansallismuseo ryöstettiin useaan kertaan, ja esillä olleista 100 000 '
        + 'esineestä katosi 70 prosenttia.'
        + '\n\nKulta pysyi holvissa, ja se löydettiin uudelleen ja tuotiin julkisuuteen '
        + 'vasta 2003. Arvokkaimmat esineet oli suljettu metallilaatikoihin ja viety '
        + 'turvaan; ne kerättiin ja luetteloitiin 2004. Osa museon kadonneista esineistä on '
        + 'löytynyt Kabulin holveista ja osa Sveitsistä.',
      lahde: 'en-Wikipedia "Tillya tepe", johdanto-osa ja osio "Dates and context", sekä '
        + '"National Museum of Afghanistan", osio "History". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Missä Baktrian kulta oli 1990-luvun ryöstöjen aikana?',
        vaihtoehdot: [
          'Museon vitriineissä',
          'Keskuspankin maanalaisessa holvissa',
          'Viety maasta pois',
        ],
        oikea: 1,
      },
    },
  ],
  PAK: [
    /*
     * Lahore, jossa vuoden 1849 sopimus allekirjoitettiin.
     * Lähde: en.wikipedia.org: Koh-i-Noor
     */
    {
      id: 'kohinoor-1849',
      otsikko: 'Timantti, joka vaihtoi omistajaa yhdellä artiklalla',
      nimio: 'Kohinoor 1849',
      vuosi: '1849',
      paikka: 'Lahore, Punjab',
      lat: 31.582, lon: 74.3167,
      kortti: 'Vuonna 1849 Punjab liitettiin Itä-Intian kauppakomppaniaan, ja '
        + 'yksitoistavuotias maharadža Duleep Singh luovutti valtakuntansa kuuluisimman '
        + 'jalokiven. Kivi lähti Lontooseen, jossa se ei tehnyt vaikutusta — ja se '
        + 'hiottiin uudelleen. Neljä valtiota on sen jälkeen vaatinut sitä takaisin.',
      teksti: 'Kohinoorin varhaishistoria on epävarma. Delhin sulttaani Alauddin Khalji '
        + 'sai 1310 suuren timantin, ja 1700-luvun kronikoitsija Khafi Khan tunnisti sen '
        + 'Kohinooriksi. Baburin poika Humayun sai timantin lahjaksi Gwaliorin hallitsijan '
        + 'perheeltä, ja Baburnama kertoo arvioitsijoiden hinnanneen sen koko maailman '
        + 'kahden ja puolen päivän ruoaksi. Historioitsija William Dalrymple huomauttaa, '
        + 'ettei ole varmaa, oliko kyseessä sama kivi: suuria timantteja oli Intiassa '
        + 'useita.'
        + '\n\nToisen anglo-sikhisodan jälkeen kauppakomppania liitti Punjabin '
        + 'itseensä 1849. Sikhivaltakunnan hallitsija oli tuolloin yksitoistavuotias '
        + 'Duleep Singh, joka hallitsi komppanian liittolaisen Gulab Singhin varjossa. '
        + 'Timantti luovutettiin kuningatar Viktorialle.'
        + '\n\nLontoossa kivi asetettiin 1851 esille maailmannäyttelyyn, mutta sen vaisu '
        + 'hionta ei tehnyt vaikutusta katsojiin. Prinssi Albert määräsi sen hiottavaksi '
        + 'uudelleen soikeaksi briljantiksi Coster Diamondsilla. Sen jälkeen kiveä ovat '
        + 'kantaneet vain kuningashuoneen naiset — sen sanotaan tuovan miehelle huonoa '
        + 'onnea — ja se on siirtynyt kruunusta toiseen.'
        + '\n\nTimantti on nyt esillä Lontoon Towerissa. Intian, Iranin, Pakistanin ja '
        + 'Afganistanin hallitukset ovat kaikki vaatineet sitä omakseen Intian '
        + 'itsenäistymisestä 1947 lähtien. Britannian hallitus katsoo kiven siirtyneen '
        + 'laillisesti vuoden 1849 Lahoren sopimuksen ehdoilla ja on hylännyt vaatimukset.',
      lahde: 'en-Wikipedia "Koh-i-Noor", johdanto-osa ja osio "History". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi timantti hiottiin Lontoossa uudelleen?',
        vaihtoehdot: [
          'Se oli haljennut matkalla',
          'Se oli liian suuri kruunuun',
          'Se ei tehnyt vaikutusta näyttelyvieraisiin',
        ],
        oikea: 2,
      },
    },
    /*
     * Harappan kumpu Punjabissa Lahoren ja Multanin radan varrella.
     * Lähde: en.wikipedia.org: Harappa
     */
    {
      id: 'harappan-tiilet',
      otsikko: 'Viisituhatta vuotta vanhat tiilet radan alle',
      nimio: 'Harappan tiilet',
      vuosi: '1857',
      paikka: 'Harappa, Punjab',
      lat: 30.628889, lon: 72.863889,
      kortti: 'Lahoren ja Multanin rautatietä rakentavat insinöörit tarvitsivat sepeliä '
        + 'ratapenkkaan. Lähellä oli kumpu, joka oli täynnä valmiiksi poltettuja tiiliä. '
        + 'Niitä oli helppo hakea, ja niin ne murskattiin radan alle — vasta myöhemmin '
        + 'selvisi, mitä kumpu oli ollut.',
      teksti: 'Harappa oli Mohenjo-daron ohella Indus-laakson sivilisaation suurimpia '
        + 'kaupunkeja. Kaupunki nousi noin 2600 eaa. Punjabin keskiosaan, ja sen '
        + 'kypsyysvaiheessa 2600–1900 eaa. siellä uskotaan asuneen jopa 23 500 ihmistä 150 '
        + 'hehtaarin alalla savitiilitaloissa — aikaansa nähden suuri kaupunki.'
        + '\n\nVuonna 1857 Lahoren ja Multanin rautatietä rakentavat insinöörit ottivat '
        + 'raunioista tiiliä ratasepeliksi. Vahinko oli suuri, ja se tehtiin ennen kuin '
        + 'kukaan tiesi, minkä ikäisestä kaupungista oli kysymys: Indus-laakson '
        + 'sivilisaatio tunnistettiin vasta 1920-luvun kaivauksissa Mohenjo-darossa ja '
        + 'Harappassa.'
        + '\n\nTuhosta huolimatta paikalta on saatu talteen runsaasti esineistöä. '
        + 'Harappalaisessa kulttuurissa oli mahdollinen kirjoitusjärjestelmä, '
        + 'kaupunkikeskuksia, viemäröintiä sekä monimuotoinen yhteiskunta- ja '
        + 'talousjärjestelmä, ja sen varhaisimmat juuret ovat Mehrgarhin kaltaisissa '
        + 'kulttuureissa noin 6000 eaa.'
        + '\n\nNykyinen Harappan kylä on alle kilometrin päässä muinaisesta kaupungista, '
        + 'ja siellä on yhä brittiajan rautatieasema. Paikka lisättiin 2004 Unescon '
        + 'maailmanperintökohteiden aielistalle. Vuonna 2005 alueelle suunniteltu '
        + 'huvipuistohanke keskeytettiin, kun rakentajat kaivoivat maasta esiin runsaasti '
        + 'muinaisesineitä.',
      lahde: 'en-Wikipedia "Harappa", johdanto-osa ja osio "History". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mihin Harappan tiilet käytettiin 1857?',
        vaihtoehdot: [
          'Uuden kaupungin muuriin',
          'Museon rakentamiseen',
          'Rautatien ratasepeliksi',
        ],
        oikea: 2,
      },
    },
  ],
  UZB: [
    /*
     * Bukharan Arkin edusaukio.
     * Lähde: en.wikipedia.org: Arthur Conolly; Charles Stoddart
     */
    {
      id: 'bukhara-1842',
      otsikko: 'Kaksi upseeria, jotka jäivät suureen peliin',
      nimio: 'Bukhara 1842',
      vuosi: '1838–1842',
      paikka: 'Ark-linnoituksen aukio, Bukhara',
      lat: 39.7756, lon: 64.4093,
      kortti: 'Eversti Charles Stoddart lähetettiin Bukharaan neuvottelemaan '
        + 'ystävyyssopimuksesta ja venäläisten orjien vapauttamisesta. Emiiri pidätytti '
        + 'hänet. Kapteeni Arthur Conolly tuli pelastamaan häntä ja jäi itsekin vangiksi — '
        + 'ja juuri Conolly oli keksinyt nimen sille, mihin molemmat olivat astuneet.',
      teksti: 'Arthur Conolly (1807–1842) oli brittiläinen tiedustelu-upseeri, tutkimusmatkailija '
        + 'ja kirjailija sekä Bengalin kevyen ratsuväen kapteeni Itä-Intian kauppakomppanian '
        + 'palveluksessa. Hän teki lukuisia tiedusteluretkiä Keski-Aasiaan ja keksi '
        + 'ilmauksen The Great Game, suuri peli, kuvaamaan Britannian ja Venäjän kamppailua '
        + 'alueen herruudesta. Ilmaus esiintyy heinäkuussa 1840 kirjeessä, jonka hän '
        + 'kirjoitti Kandaharin poliittiseksi agentiksi nimitetylle Henry Rawlinsonille.'
        + '\n\nConolly matkusti usein valeasussa ja käytti nimeä Khan Ali, sanaleikkiä '
        + 'omasta nimestään. Vuonna 1829 hän lähti Moskovasta Kaukasian kautta Keski-Aasiaan '
        + 'ja saapui Heratiin syyskuussa 1830; matkakertomuksensa hän julkaisi 1834.'
        + '\n\nEversti Charles Stoddart oli lähetetty Bukharaan taivuttelemaan emiiriä '
        + 'vapauttamaan venäläiset orjat ja solmimaan ystävyyssopimus Britannian kanssa. '
        + 'Emiiri Nasrullah Khan pidätytti hänet 1838. Marraskuussa 1841 Conolly saapui '
        + 'kaupunkiin osana tehtäväänsä vapauttaa Stoddart, mutta epäonnistui.'
        + '\n\nMolemmat teloitettiin vakoilusyytteellä 24. kesäkuuta 1842 Ark-linnoituksen '
        + 'edustalla olevalla aukiolla. Pastori Joseph Wolff lähti selvittämään heidän '
        + 'kohtaloaan, pääsi hädin tuskin hengissä pois ja julkaisi 1845 laajan '
        + 'matkakertomuksen, joka teki miehistä tunnettuja Britanniassa vuosikausiksi.',
      lahde: 'en-Wikipedia "Arthur Conolly", johdanto-osa ja osio "Biography", sekä '
        + '"Charles Stoddart", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Minkä sanaparin Arthur Conolly keksi?',
        vaihtoehdot: [
          'The Great Game',
          'The Silk Road',
          'The Iron Curtain',
        ],
        oikea: 0,
      },
    },
    /*
     * Vozroždenijan saari Aralinmerellä, nykyisin osa Aralkumia.
     * Lähde: en.wikipedia.org: Vozrozhdeniya Island
     */
    {
      id: 'vozrozdenija',
      otsikko: 'Saari, joka lakkasi olemasta saari',
      nimio: 'Vozroždenije',
      vuosi: '1954–2002',
      paikka: 'Vozroždenijan saari, Araljärvi',
      lat: 45.15, lon: 59.3167,
      kortti: 'Neuvostoliitto rakensi 1954 pienelle Aralinmeren saarelle koeaseman, jonka '
        + 'nimi oli Aralsk-7. Saaren piti olla eristyksissä. Kun järvi kuivui, saari '
        + 'kasvoi, liittyi mantereeseen ja lakkasi olemasta saari — ja sen jäljet jäivät '
        + 'kaikkien ulottuville.',
      teksti: 'Vozroždenije eli Uudestisyntyminen oli Araljärven saari, jonka alue jakautuu '
        + 'nykyään Uzbekistanin ja Kazakstanin kesken. Se oli 1800-luvulla vain 200 '
        + 'neliökilometriä. Venäläinen tutkimusretkikunta löysi saariryhmän 1848–1849 '
        + 'kuunari Konstantinilla A. I. Butakovin johdolla, ja Nikolai I:n saari nimettiin '
        + 'neuvostoaikana uudelleen Vozroždenijaksi.'
        + '\n\nPunainen armeija etsi 1920-luvulla paikkaa biologisten aseiden tutkimus- ja '
        + 'koekeskukselle. Ehdolla olivat muun muassa Solovetskin saaret ja Seligerjärven '
        + 'Gorodomlja, mutta valinta osui Vozroždenijaan, ja koeasema Aralsk-7 rakennettiin '
        + '1954 sinne ja naapurisaarelle Komsomolskille. Asiakirjojen mukaan asemalla '
        + 'valmistettiin ja varastoitiin muun muassa pernaruttoitiöitä ja ruttobasilleja.'
        + '\n\nSaaren kaupunki Kantubek oli Aralsk-7:n oma nimi kartalla; siellä asui noin '
        + '1 500 ihmistä, ja sillä oli kerho, stadion, kouluja ja kauppoja sekä '
        + 'Neuvostoliiton ainoa nelikiitoratainen lentokenttä, jonka radat leikkasivat '
        + 'toisensa tähdeksi.'
        + '\n\nMarraskuussa 1991 päätettiin lopettaa kokeet, ja huhtikuuhun 1992 mennessä '
        + 'kaikki yksiköt oli evakuoitu; Kantubekista tuli aavekaupunki. Osaa säiliöistä '
        + 'ei hävitetty asianmukaisesti, ja monet niistä alkoivat vuotaa. Vuonna 2002 '
        + 'kymmenen pernaruttohautaa puhdistettiin Yhdysvaltain rahoittamassa ja '
        + 'Uzbekistanin avustamassa hankkeessa. Järven kuivuessa saari kasvoi 2 300 '
        + 'neliökilometriin, liittyi 2001 mantereeseen ja on nyt osa Aralkumin autiomaata.',
      lahde: 'en-Wikipedia "Vozrozhdeniya Island", johdanto sekä osiot "Geography" ja '
        + '"History". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi saari lakkasi olemasta saari?',
        vaihtoehdot: [
          'Se räjäytettiin',
          'Se upposi',
          'Araljärvi kuivui ja saari liittyi mantereeseen',
        ],
        oikea: 2,
      },
    },
  ],
  PHL: [
    /*
     * Balangigan kirkko Itä-Samarilla.
     * Lähde: en.wikipedia.org: Balangiga bells
     */
    {
      id: 'balangigan-kellot',
      otsikko: 'Kolme kirkonkelloa, jotka olivat poissa 117 vuotta',
      nimio: 'Balangiga',
      vuosi: '1901–2018',
      paikka: 'San Lorenzo de Martirin kirkko, Balangiga',
      lat: 11.1092, lon: 125.3864,
      kortti: 'Yhdysvaltain armeija vei 1901 Balangigan kirkosta kolme kelloa '
        + 'sotasaaliina. Kaksi päätyi Wyomingiin ja yksi lopulta Etelä-Koreaan. '
        + 'Filippiinit pyysi niitä takaisin 1950-luvun lopulta alkaen, ja vastaus tuli '
        + 'vasta 2018.',
      teksti: 'Balangigan kirkko vihittiin 1854 roomalaiselle marttyyrille San Lorenzolle. '
        + 'Vanhin kello valettiin noin 1853, ja siinä on fransiskaanien vaakuna ja '
        + 'kirjoitus "R. San Francisco Año El 1853"; suuaukon halkaisija on 79 senttimetriä '
        + 'ja korkeus 76. Toinen kello valettiin 1889 kirkkoherra Agustín Delgadon '
        + 'aloitteesta, ja kolmas ja pienin hankittiin ilmeisesti 1895.'
        + '\n\nKellot vietiin Yhdysvaltoihin sotasaaliina Filippiinien–Yhdysvaltain sodan '
        + 'aikana vuonna 1901. Kaupunki oli vallattu takaisin 29. syyskuuta, ja kun '
        + '11. jalkaväkirykmentti lähti lokakuussa, se otti mukaansa palaneesta kirkosta '
        + 'otetut kellot ja kirkon edustan tykin. Yksi kelloista oli soitettu merkiksi '
        + 'hyökkäyksestä, ja pronssista olisi voinut valaa aseita.'
        + '\n\nPieni merkkikello päätyi 9. jalkaväkirykmentin mukana Yhdysvaltoihin 1902 ja '
        + 'sieltä lopulta 2. divisioonan museoon Camp Red Cloudiin Etelä-Koreaan. Kaksi '
        + 'suurempaa kelloa vietiin 1904 Wyomingiin Fort D. A. Russellille, myöhemmälle '
        + 'Francis E. Warrenin lentotukikohdalle.'
        + '\n\nKatolinen kirkko, Filippiinien hallitus ja Balangigan asukkaat pyysivät '
        + 'kelloja takaisin 1950-luvun lopulta lähtien, mutta yritykset kariutuivat '
        + 'vuosikymmeniksi. Neuvottelut etenivät 2018, ja kellot palasivat Filippiineille '
        + '11. joulukuuta 2018 — 117 vuoden jälkeen. Ne luovutettiin kotikirkkoonsa '
        + '15. joulukuuta, ja seuraavana aamuna yhtä niistä soitettiin ensimmäistä kertaa '
        + 'sitten vuoden 1901.',
      lahde: 'en-Wikipedia "Balangiga bells", johdanto sekä osiot "History", "Removal to '
        + 'the United States" ja "Return to Samar". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuinka kauan kellot olivat poissa Balangigasta?',
        vaihtoehdot: [
          '17 vuotta',
          '217 vuotta',
          '117 vuotta',
        ],
        oikea: 2,
      },
    },
    /*
     * Baguio, jossa Rogelio Roxas kertoi tehneensä löytönsä.
     * Lähde: en.wikipedia.org: Yamashita's gold
     */
    {
      id: 'yamashitan-kulta',
      otsikko: 'Aarre, jota kukaan ei ole löytänyt',
      nimio: 'Yamashitan kulta',
      vuosi: '1971–1996',
      paikka: 'Baguio, Benguet',
      lat: 16.4119, lon: 120.5933,
      kortti: 'Tarina kertoo japanilaisten piilottaneen Kaakkois-Aasiasta ryöstetyn '
        + 'saaliin Filippiinien luoliin ja tunneleihin. Aarteenetsijöitä on riittänyt yli '
        + 'viisikymmentä vuotta, mutta asiantuntijat pitävät koko aarretta '
        + 'todennäköisesti keksittynä. Yksi juttu eteni silti oikeuteen asti — ja tuotti '
        + 'aikansa suurimman vahingonkorvaustuomion.',
      teksti: 'Yamashitan kullaksi kutsutaan sotasaalista, jonka japanilaisten joukkojen '
        + 'väitetään ryöstäneen ympäri Kaakkois-Aasiaa ja piilottaneen Filippiinien '
        + 'luoliin, tunneleihin ja maanalaisiin tiloihin. Nimi tulee kenraali Tomoyuki '
        + 'Yamashitasta, joka oli maan viimeinen japanilainen sotilaskuvernööri. '
        + 'Aarteenetsijöitä ympäri maailmaa on riittänyt yli viisikymmentä vuotta, mutta '
        + 'useimmat asiantuntijat pitävät aarteen olemassaoloa epätodennäköisenä.'
        + '\n\nHistorioitsija Ambeth Ocampo on huomauttanut ihmettelevänsä, ettei viidessä '
        + 'vuosikymmenessä ole karttojen, suullisten todistusten ja kehittyneiden '
        + 'metallinilmaisimien avullakaan löytynyt mitään.'
        + '\n\nMaaliskuussa 1988 filippiiniläinen aarteenetsijä Rogelio Roxas haastoi '
        + 'Havaijin osavaltion tuomioistuimessa entisen presidentin Ferdinand Marcosin ja '
        + 'tämän puolison Imeldan varkaudesta ja ihmisoikeusrikkomuksista. Roxasin mukaan '
        + 'hän oli 1961 Baguiossa saanut japanilaisen sotilaan pojalta kartan, ja hänen '
        + 'ryhmänsä oli 1971 avannut Baguion lähellä valtion mailla kammion, josta löytyi '
        + 'pistimiä, samuraimiekkoja, radioita, luita — ja metrin korkuinen kullanvärinen '
        + 'buddha sekä kultaharkoilla täytettyjä laatikoita.'
        + '\n\nRoxas kertoi, että Marcos määräsi hänet pidätettäväksi ja takavarikoi '
        + 'buddhan ja lopun kullan. Roxas kuoli oikeudenkäynnin aattona, mutta hänen '
        + 'valaehtoinen kertomuksensa jäi todisteeksi. Vuonna 1996 hänen kuolinpesänsä ja '
        + 'Golden Budha Corporation saivat siihenastisen historian suurimman '
        + 'vahingonkorvaustuomion.',
      lahde: 'en-Wikipedia "Yamashita\'s gold", johdanto sekä osiot "Treasure skeptics" ja '
        + '"Rogelio Roxas lawsuit". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä asiantuntijat sanovat aarteesta?',
        vaihtoehdot: [
          'Sen olemassaolo on epätodennäköinen',
          'Se on löydetty kokonaan',
          'Se on Japanin hallussa',
        ],
        oikea: 0,
      },
    },
  ],
  CHN: [
    /*
     * Nanjing, jossa sopimus allekirjoitettiin HMS Cornwallisin kannella.
     * Lähde: en.wikipedia.org: Treaty of Nanking
     */
    {
      id: 'nankingin-sopimus',
      otsikko: 'Sopimus, joka kirjoitettiin sotalaivan kannella',
      nimio: 'Nanking 1842',
      vuosi: '1842',
      paikka: 'Jangtse Nanjingin kohdalla',
      lat: 32.060833, lon: 118.778889,
      kortti: 'Britannian kauppatase Kiinan kanssa oli pahasti alijäämäinen, ja '
        + 'salakuljetettu oopiumi tasoitti sen. Kun kiinalainen komissaari poltti '
        + 'takavarikoidun oopiumin, seurasi sota. Rauha tehtiin 1842 laivan kannella '
        + 'Nanjingin edustalla, ja se aloitti sarjan, jota Kiinassa on siitä asti sanottu '
        + 'epätasa-arvoisiksi sopimuksiksi.',
      teksti: '1700-luvun lopulla ja 1800-luvun alussa Britannian kauppa Kiinan kanssa oli '
        + 'yhä pahemmin alijäämäistä: teetä ja posliinia tuotiin paljon, eikä vastaavaa '
        + 'ollut tarjottavaa. Komppanian Intiassa kasvattamaa oopiumia huutokaupattiin '
        + 'kauppiaille, jotka myivät sen salakuljetettavaksi Kiinaan, vaikka Kiinan laki '
        + 'kielsi oopiumin tuonnin ja myynnin.'
        + '\n\nKun Lin Zexu takavarikoi yksityisomistuksessa olleen oopiumin ja määräsi sen '
        + 'poltettavaksi Humenissa, Britannia vaati ensin korvauksia ja julisti sitten '
        + 'sodan. Ensimmäinen oopiumisota käytiin 1839–1842, ja ylivoimainen sotatekniikka '
        + 'antoi Britannialle voiton.'
        + '\n\nBrittiläisten sotalaivojen ollessa valmiina hyökkäämään Nanjingiin '
        + 'neuvoteltiin HMS Cornwallisin kannella joen ankkuripaikalla. Sopimuksen '
        + 'allekirjoittivat 29. elokuuta 1842 Henry Pottinger sekä Qing-hallinnon edustajat '
        + 'Keying, Yilibu ja Niu Jian; artikloja oli kolmetoista. Daoguang-keisari '
        + 'ratifioi sen 27. lokakuuta ja kuningatar Viktoria 28. joulukuuta.'
        + '\n\nSopimus purki Kantonin kauppajärjestelmän ja Cohong-kauppiaiden monopolin, '
        + 'avasi Kantonin rinnalle neljä uutta sopimussatamaa — Xiamenin, Fuzhoun, Ningbon '
        + 'ja Shanghain — ja luovutti Hongkongin saaren Britannialle. Korvauksia kertyi '
        + 'kaikkiaan 27 miljoonaa hopeadollaria: kuusi takavarikoidusta oopiumista, kuusi '
        + 'Kantonin lunnaista, kolme kauppiaiden veloista ja kaksitoista sotakuluista.',
      lahde: 'en-Wikipedia "Treaty of Nanking", johdanto sekä osiot "Background", "Foreign '
        + 'trade" ja "Reparations and demobilisation". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Missä sopimus allekirjoitettiin?',
        vaihtoehdot: [
          'Keisarin palatsissa',
          'Kantonin tullissa',
          'Sotalaiva HMS Cornwallisin kannella',
        ],
        oikea: 2,
      },
    },
    /*
     * Itäiset Qing-haudat Zunhuassa Hebeissä.
     * Lähde: en.wikipedia.org: Looting of the Eastern Mausoleum
     */
    {
      id: 'ita-qingin-haudat',
      otsikko: 'Sotapäällikkö, joka räjäytti keisarien haudat',
      nimio: 'Qing-haudat 1928',
      vuosi: '1928',
      paikka: 'Itäiset Qing-haudat, Zunhua',
      lat: 40.185783, lon: 117.646923,
      kortti: 'Kesäkuussa 1928 sotapäällikkö Sun Dianyingin joukot murtautuivat Kiinan '
        + 'suurimpaan keisarilliseen hautakompleksiin. Rahaa ei ollut, palkat olivat '
        + 'myöhässä, ja hautojen aarteista kerrottiin tarkkoja tietoja. Juttu paljastui, '
        + 'kun yksi sotilaista meni myymään saalistaan pekingiläiseen antiikkiliikkeeseen.',
      teksti: 'Itäiset Qing-haudat Zunhuassa Hebeissä ovat Kiinan suurin, täydellisin ja '
        + 'parhaiten säilynyt keisarillinen hautakompleksi, 125 kilometriä Pekingistä '
        + 'koilliseen. Sinne on haudattu viisi keisaria, 15 keisarinnaa, 136 hovinaista, '
        + 'kolme prinssiä ja kaksi prinsessaa, ja alue kattaa 80 neliökilometriä.'
        + '\n\nQing-valtakunnan hajottua 1912 uusi tasavalta ja hiljattain luopunut '
        + 'keisariperhe sopivat hautojen suojelusta. Sopimusta oli yhä vaikeampi pitää: '
        + 'rahoitus ja vartiointi kävivät epäsäännöllisiksi. Sun Dianying oli Fengtianin '
        + 'armeijan komentaja, joka oli liittoutunut Chiang Kai-shekin kanssa 1926 '
        + 'pohjoisella sotaretkellä ja joutui sen jälkeen aseistariisunnan kohteeksi; '
        + 'hänen joukkojensa palkat, ruoka ja vesi myöhästyivät jatkuvasti, ja hän etsi '
        + 'muuta rahoitusta.'
        + '\n\nKesäkuun alussa 1928 hänen joukkonsa ryöstivät ja turmelivat useita '
        + 'kompleksin päämausoleumeista, muun muassa Qianlong-keisarin ja '
        + 'leskikeisarinna Cixin haudat. Tyhjennetyt kammiot muurattiin kivillä umpeen. '
        + 'Rakennukset itsessään jäivät pystyyn.'
        + '\n\nSamana päivänä eräs sotilas saapui pekingiläisen antiikkikauppiaan '
        + 'liikkeeseen myymään huomiota herättävän arvokkaita esineitä. Sekä sotilas että '
        + 'kauppias pidätettiin, ja kuulusteluissa paljastui koko operaatio ja sen '
        + 'järjestäjä. Viimeinen keisari Puyi vaati sähkeillään ankaraa tutkintaa. Sun '
        + 'Dianying lahjoi kuitenkin ne, jotka olisivat voineet rangaista häntä, eikä '
        + 'ketään tuomittu.',
      lahde: 'en-Wikipedia "Looting of the Eastern Mausoleum", johdanto sekä osiot '
        + '"Background", "Aftermath" ja "Evasion", sekä "Eastern Qing tombs", johdanto-osa. '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten ryöstö paljastui?',
        vaihtoehdot: [
          'Sotilas yritti myydä saalista antiikkiliikkeessä',
          'Vartija ilmiantoi joukot',
          'Puyi näki sen omin silmin',
        ],
        oikea: 0,
      },
    },
  ],

  /*
   * ══ ERÄ M13, ETELÄINEN AFRIKKA 6.9.2026 ═══════════════════════════
   *
   * Viisi maata — MDG, MOZ, NAM, ZAF ja ZWE — joilta skandaalit
   * puuttuivat kokonaan, kaksi kutakin. Kaikki ovat 1800- tai
   * 1900-luvun tapauksia; nykypolitiikka on jätetty pois (Raamattu).
   * Herkät aiheet (Waterberg 1904, Gazan valtakunnan kukistuminen)
   * kerrotaan asiallisesti ja lähteen katteessa, ilman kuvailua, jota
   * artikkelissa ei ole.
   *
   * PAIKAT EIVÄT OSU PELIKAUPUNKEIHIN eivätkä saman erän kohteiden
   * päälle: Kimberleyn timanttikuume kerrotaan Hopetownin kohdalla
   * (Kimberley on pelikaupunki), Ruddin myönnytys Fort Salisburyn eli
   * Hararen kohdalla (Bulawayo olisi Khamin ja Matobon nimiöiden
   * päällä) ja Delagoan rata rajan asemalla Ressano Garciassa
   * (Maputo on erän oma kohde).
   */
  MDG: [
    /*
     * Toamasina (Tamatave), missä rauhansopimus allekirjoitettiin.
     * Lähde: en.wikipedia.org: Franco-Hova Wars
     */
    {
      id: 'tamataven-sopimus',
      otsikko: 'Rauha, jonka selittävä kirje jäi näyttämättä',
      nimio: 'Tamatave 1885',
      vuosi: '1883–1885',
      paikka: 'Toamasina (Tamatave)',
      lat: -18.155, lon: 49.41,
      kortti: 'Sopimuksen mukana kulki "selittävä kirje", jonka oli määrä kertoa mitä '
        + 'teksti oikeastaan tarkoitti. Ranskan parlamentille sitä ei näytetty, kun se '
        + 'äänesti sopimuksen hyväksymisestä.',
      teksti: 'Ranskan ja Merinan kuningaskunnan sodat olivat kaksi Ranskan sotaretkeä '
        + 'Madagaskarille vuosina 1883–1896. Ne kaatoivat saarta hallinneen kuningashuoneen '
        + 'ja tekivät Madagaskarista Ranskan siirtomaan. Sana "hova" tarkoitti merinojen '
        + 'yhteiskuntaluokkaa, ja siitä tuli sotien nimi eurooppalaisissa lähteissä.'
        + '\n\nSyy sotaan oli vanha myönnytys. Kuningatar Ranavalona I:n kuoltua 1861 hänen '
        + 'poikansa Radama II nousi valtaan; jo prinssinä hän oli antanut ranskalaiselle '
        + 'Joseph-François Lambertille peruskirjan, joka luovutti laajoja maa-alueita '
        + 'välittämättä siitä, mikä merkitys esi-isien mailla saarella oli. Kun myönnytykset '
        + 'myöhemmin peruttiin, Ranska hyökkäsi 1883 palauttaakseen ne.'
        + '\n\nSota päättyi Tamatavessa 17. joulukuuta 1885 allekirjoitettuun '
        + 'rauhansopimukseen. Madagaskar luovutti Antsirananan eli Diego-Suarezin '
        + 'pohjoisrannikolta Ranskalle ja maksoi kymmenen miljoonan frangin sakon.'
        + '\n\nSopimukseen kuului myös "selittävä kirje", jonka piti täsmentää tekstin '
        + 'tulkinta. Sitä ei koskaan esitetty Ranskan parlamentille, kun se äänesti '
        + 'sopimuksen ratifioinnista. Käytännössä sopimus siirsi Madagaskarin ulkopolitiikan '
        + 'Ranskan käsiin, ja Ranska käytti sitä kiristääkseen otettaan alueesta — vaikka '
        + 'protektoraattia ei muodollisesti julistettu.',
      lahde: 'en-Wikipedia "Franco-Hova Wars", johdanto-osa sekä osiot '
        + '"Background" ja "First Franco-Hova War". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä sopimukseen kuulunutta asiakirjaa ei näytetty Ranskan parlamentille?',
        vaihtoehdot: [
          'Kauppasopimuksen liitettä',
          'Karttaa rajoista',
          'Selittävää kirjettä',
        ],
        oikea: 2,
      },
    },
    /*
     * Nosy Be, Ranskan sokerisiirtokunta Madagaskarin luoteispuolella.
     * Lähde: en.wikipedia.org: Nosy Be
     */
    {
      id: 'nosy-been-sokeri',
      otsikko: 'Saari, joka nousi kapinaan orjuuden lakkauttamista vastaan',
      nimio: 'Nosy Be 1849',
      vuosi: '1837–1849',
      paikka: 'Nosy Be',
      lat: -13.315, lon: 48.2675,
      kortti: 'Kun Ranska lakkautti orjuuden siirtomaissaan 1848, saarella syttyi kapina — '
        + 'ei orjuutta vaan sen lakkauttamista vastaan. Kapinoijat olivat sakalavoja, jotka '
        + 'olivat itse laajasti mukana orjakaupassa.',
      teksti: 'Nosy Be on saari Madagaskarin luoteispuolella Mosambikin kanaalissa. Sen '
        + 'ensimmäisiä asukkaita olivat pienet antankarana- ja zafinofotsy-ryhmät, sitten '
        + 'saarelle muutti sakalavoja, joista tuli suurin väestöryhmä; myöhemmin heidän '
        + 'joukkoonsa tuli komorilaisia, intialaisia ja antandroyta.'
        + '\n\nSaari astui saaren historiaan, kun kuningas Radama I ilmoitti aikovansa '
        + 'valloittaa koko Madagaskarin lännen. Suunnitelma toteutui 1837, kun Boinan '
        + 'sakalavakuningaskunta ja kuningatar Tsiomekon armeija hävisivät ja alue siirtyi '
        + 'Ranavalona I:n haltuun.'
        + '\n\nRanskalaiset ottivat saaren haltuunsa 1840 ja perustivat sinne tukikohdan, '
        + 'jonka nimeksi tuli amiraali de Hellin mukaan Hell-Ville. Siirtokunnasta '
        + 'kehittyi istutustalous: ranskalaiset asuttajat viljelivät ennen kaikkea '
        + 'sokeriruokoa ja värväsivät työvoimaa velkatyöläisinä Itä-Afrikasta.'
        + '\n\nVuoden 1848 päätös lakkauttaa orjuus Ranskan siirtomaissa johti seuraavana '
        + 'vuonna sakalavojen kapinaan ranskalaisia vastaan. Ranska piti asemansa sekä '
        + 'sotavoimin että diplomatialla ja nimitti saaren entisen hallitsijan Binaon sen '
        + 'pääkuvernööriksi. 1800-luvun lopulla ja 1900-luvun alussa saarta hallittiin '
        + 'Madagaskarin siirtomaan sisäisenä protektoraattina, ja tukikohdasta tuli tärkeä '
        + 'kauppasatama Mosambikin kanaalissa.',
      lahde: 'en-Wikipedia "Nosy Be", osio "History". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Ketä vastaan sakalavat kapinoivat 1849?',
        vaihtoehdot: [
          'Ranskalaisia vastaan',
          'Merinojen kuningatarta vastaan',
          'Komorilaisia kauppiaita vastaan',
        ],
        oikea: 0,
      },
    },
  ],

  MOZ: [
    /*
     * Manjacaze, Gazan valtakunnan viimeinen pääpaikka.
     * Lähde: en.wikipedia.org: Gungunhana
     */
    {
      id: 'gazan-keisari',
      otsikko: 'Keisari, joka vietiin näytille Lissaboniin',
      nimio: 'Gaza 1895',
      vuosi: '1895–1906',
      paikka: 'Manjacaze, Gazan valtakunta',
      lat: -24.71167, lon: 33.88278,
      kortti: 'Portugalin siirtomaahallinto päätti olla teloittamatta kukistettua '
        + 'kuningasta. Syy ei ollut armo vaan julkisuus: hänet tunnettiin jo Euroopan '
        + 'lehdistössä, ja niin hänet lähetettiin maanpakoon seitsemän vaimonsa kanssa.',
      teksti: 'Ngungunyane, jota lähteissä kutsutaan myös nimillä Gungunhana ja Mdungazwe '
        + 'Ngungunyane Nxumalo, oli Gazan valtakunnan kuningas ja Portugalin vasalli, joka '
        + 'nousi kapinaan. Hän hallitsi noin vuodesta 1884 ja sai lisänimen "Gazan '
        + 'leijona".'
        + '\n\nGazan valtakunnan oli perustanut hänen isoisänsä Soshangane, joka johti '
        + 'nguninkielisen sotajoukon pohjoiseen Zululandista. Isä Mzila hallitsi 1861–1884, '
        + 'ja pääkaupunki siirtyi Limpopon laaksosta Mossurizeen Save-joen pohjoispuolelle. '
        + 'Vanha pääpaikka Chaimite jäi pyhiinvaelluskohteeksi ja esi-isien hengille '
        + 'omistetuksi muistopaikaksi.'
        + '\n\nKenraali Joaquim Mouzinho de Albuquerque kukisti hänet, ja 28. joulukuuta '
        + '1895 hänet vangittiin Chaimiten linnoitetussa kylässä. Portugalin '
        + 'siirtomaahallinto päätti karkottaa hänet sen sijaan, että olisi asettanut hänet '
        + 'teloitusryhmän eteen, kuten tapa olisi ollut — hän oli jo tunnettu Euroopan '
        + 'lehdistössä.'
        + '\n\nHänet kuljetettiin Lissaboniin poikansa Godiden ja muiden arvohenkilöiden '
        + 'kanssa. Maaliskuussa 1896 hänestä otettiin valokuva seitsemän vaimonsa kanssa, '
        + 'jotka oli otettu mukaan vankeina. Lyhyen Monsanton linnakkeessa vietetyn ajan '
        + 'jälkeen hänet siirrettiin Azoreille Terceiralle, missä hän kuoli yksitoista '
        + 'vuotta myöhemmin 23. joulukuuta 1906.',
      lahde: 'en-Wikipedia "Gungunhana", johdanto-osa ja osio "Biography". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi kuningasta ei teloitettu?',
        vaihtoehdot: [
          'Hän oli tehnyt rauhansopimuksen',
          'Portugali ei ollut sodassa',
          'Hänet tunnettiin jo Euroopan lehdistössä',
        ],
        oikea: 2,
      },
    },
    /*
     * Ressano Garcia, Maputon lahden radan raja-asema.
     * Lähde: en.wikipedia.org: Maputo Bay; Pretoria–Maputo railway
     */
    {
      id: 'delagoan-rata',
      otsikko: 'Rata, joka otettiin haltuun ja maksettiin takaisin',
      nimio: 'Delagoa 1889',
      vuosi: '1889–1900',
      paikka: 'Ressano Garcia, Maputon lahti',
      lat: -25.44278, lon: 31.99528,
      kortti: 'Portugali otti haltuunsa radan, joka vei sen satamasta Transvaaliin. '
        + 'Yksitoista vuotta myöhemmin välimiesoikeus määräsi sen maksamaan osakkaille '
        + 'lähes miljoona puntaa.',
      teksti: 'Maputon lahti, entiseltä nimeltään Delagoan lahti, oli 1800-luvulla '
        + 'toistuvasti riidan kohteena. Vuonna 1861 kuninkaallisen laivaston kapteeni '
        + 'Bickford julisti Inhacan ja Elephantin saaret Britannian alueeksi, mistä '
        + 'Lissabon protestoi. Riita vietiin 1872 välimiesmenettelyyn Ranskan presidentin '
        + 'Adolphe Thiersin ratkaistavaksi, ja hänen seuraajansa marsalkka MacMahon '
        + 'ratkaisi asian 19. huhtikuuta 1875 Portugalin hyväksi.'
        + '\n\nRata lahden satamasta Transvaaliin oli valmisteltu pitkään. Pretorian '
        + 'hallitus kilpailutti hankkeen ja myönsi 1870 toimiluvan yksityiselle yhtiölle '
        + 'luvaten maksun vakuudeksi 850 maatilan alueet; rahoitus ei järjestynyt, ja '
        + 'hallitus otti rakentamisen itselleen 1876.'
        + '\n\nVuonna 1889 syntyi uusi riita Portugalin ja Britannian välille, kun Portugali '
        + 'otti radan haltuunsa. Asia meni jälleen välimiesoikeuteen, ja 1900 Portugali '
        + 'todettiin korvausvelvolliseksi ja määrättiin maksamaan rautatieyhtiön osakkaille '
        + 'lähes miljoona puntaa.'
        + '\n\nItse rata valmistui vaiheittain: Maputosta rajan asemalle Ressano Garciaan '
        + 'kuljettiin 1. maaliskuuta 1890, rakentaminen Etelä-Afrikan puolella oli alkanut '
        + '2. kesäkuuta 1887, ja koko 567 kilometrin reitti avattiin liikenteelle 2. '
        + 'marraskuuta 1894.',
      lahde: 'en-Wikipedia "Maputo Bay", osio "History", ja "Pretoria–Maputo railway", '
        + 'osio "History". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä välimiesoikeus määräsi Portugalille 1900?',
        vaihtoehdot: [
          'Radan palauttamisen Britannialle',
          'Sataman sulkemisen',
          'Lähes miljoonan punnan korvaukset',
        ],
        oikea: 2,
      },
    },
  ],

  NAM: [
    /*
     * Waterbergin ylätasanko, hererokansannousun ratkaisutaistelu.
     * Lähde: en.wikipedia.org: Battle of Waterberg
     */
    {
      id: 'waterbergin-kasky',
      otsikko: 'Käsky, joka annettiin vasta taistelun jälkeen',
      nimio: 'Waterberg 1904',
      vuosi: '1904',
      paikka: 'Waterbergin ylätasanko',
      lat: -20.41667, lon: 17.21667,
      kortti: 'Saksalainen komentaja aikoi saartaa hererot ylätasangon juurelle. Suunnitelma '
        + 'epäonnistui, väki pääsi pakoon autiomaahan — ja seuraukset olivat pahemmat kuin '
        + 'taistelu itse.',
      teksti: 'Waterbergin taistelu, hereroksi ovita yOhamakari, käytiin 11. elokuuta 1904 '
        + 'Waterbergillä Saksan Lounais-Afrikassa, ja se oli hererokansannousun ratkaiseva '
        + 'yhteenotto. Saksan joukkoja johti kenraaliluutnantti Lothar von Trotha; miehiä '
        + 'oli runsaat 1 500, ja heillä oli 1 625 nykyaikaista kivääriä, 30 tykkiä ja 14 '
        + 'konekivääriä. Hererot olivat Samuel Mahareron johdolla koonneet 3 500–6 000 '
        + 'soturia perheineen odottaessaan rauhanneuvotteluja.'
        + '\n\nSitä ennen sotatoimia oli johtanut siirtomaakuvernööri, eversti Theodor '
        + 'Leutwein, joka yhdisti sotilaallisen paineen neuvotteluihin. Kesäkuussa 1904 '
        + 'keisarikunta korvasi hänet von Trothalla.'
        + '\n\nTrothan suunnitelma oli puristaa hererot ylätasangon eteläpuolelle ja sulkea '
        + 'pakotiet etelään ja kaakkoon. Kaakkoisen sulkuosaston komentaja ei ehtinyt '
        + 'asemiin eikä ilmoittanut siitä, ja lännestä edennyt osasto ei pysähtynyt '
        + 'sovitulle linjalle: pääosa hereroista ja heidän karjansa pääsi aukosta itään '
        + 'Omahekenin autiomaahan.'
        + '\n\nLokakuun 2. päivänä von Trotha antoi tuhoamiskäskyn, jonka mukaan jokainen '
        + 'Saksan rajojen sisältä tavattu herero ammuttaisiin. Pako autiomaan halki johti '
        + 'kansanmurhaan: kymmenettuhannet kuolivat janoon, nälkään ja tauteihin. Kun '
        + 'Berliini kumosi käskyn, vangitut selviytyjät vietiin Hain saaren leiriin. Samuel '
        + 'Maharero pääsi noin tuhannen miehen kanssa Kalaharin yli Bechuanamaahan, jossa '
        + 'britit antoivat turvapaikan sillä ehdolla, ettei kapinaa jatketa heidän '
        + 'maallaan.',
      lahde: 'en-Wikipedia "Battle of Waterberg", johdanto-osa sekä osiot "Armies", '
        + '"Preparations for battle", "Battle" ja "Aftermath". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi saarrostus epäonnistui?',
        vaihtoehdot: [
          'Sulkuosasto ei ehtinyt asemiin',
          'Tykistö jäi jälkeen',
          'Sade esti liikkumisen',
        ],
        oikea: 0,
      },
    },
    /*
     * Katima Mulilo, Caprivin kaistaleen suurin taajama Sambesin
     * varrella. Lähde: en.wikipedia.org: Caprivi Strip;
     * Heligoland–Zanzibar Treaty
     */
    {
      id: 'caprivin-kaistale',
      otsikko: 'Housut napista: kaistale, joka ei vienyt merelle',
      nimio: 'Caprivi 1890',
      vuosi: '1890',
      paikka: 'Katima Mulilo, Caprivin kaistale',
      lat: -17.50389, lon: 24.275,
      kortti: 'Saksa sai kapean kaistaleen, jotta se pääsisi Sambesille ja sitä pitkin '
        + 'Afrikan itärannikolle. Vasta jälkeenpäin selvisi, ettei jokea pitkin pääse '
        + 'minnekään: tiellä ovat Viktorian putoukset.',
      teksti: 'Caprivin kaistale on kapea kieleke Namibian koillisnurkassa. Etelässä on '
        + 'Botswana, pohjoisessa Angola ja Sambia, ja itäkärjessä Namibia, Botswana ja '
        + 'Sambia kohtaavat yhdessä pisteessä, 150 metrin päässä Zimbabwesta. Leveyttä '
        + 'kaistaleella on 32:sta 105 kilometriin, ja sen suurin taajama on Katima Mulilo '
        + 'siellä, missä Sambesi saavuttaa kaistaleen.'
        + '\n\nSaksan Lounais-Afrikka sai alueen 1890 saadakseen pääsyn Sambesille ja sitä '
        + 'kautta reitin mantereen itärannikolle ja Saksan Itä-Afrikkaan. Reitti osoittautui '
        + 'kelvottomaksi: noin 65 kilometriä kaistaleesta itään ovat Viktorian putoukset, ja '
        + 'alempana joessa ovat vielä Kariban kuilu ja Cahora Bassa.'
        + '\n\nKauppa tehtiin 1. heinäkuuta 1890 allekirjoitetussa Helgolandin ja Sansibarin '
        + 'sopimuksessa. Saksa sai Caprivin kaistaleen, Helgolandin saariston Pohjanmerellä '
        + 'ja vapaat kädet Saksan Itä-Afrikan ytimessä; vastineeksi se tunnusti Britannian '
        + 'aseman Sansibarissa ja luovutti Witulandin protektoraatin.'
        + '\n\nSopimuksen harhaanjohtavan nimen keksi entinen liittokansleri Otto von '
        + 'Bismarck hyökätäkseen halveksimaansa seuraajaa Leo von Caprivia vastaan. Nimi '
        + 'antoi ymmärtää, että Saksa oli vaihtanut afrikkalaisen valtakunnan pikkuruiseen '
        + 'Helgolandiin — "housut napista". Imperialistit ottivat sanonnan omakseen ja '
        + 'huusivat maanpetoksesta.',
      lahde: 'en-Wikipedia "Caprivi Strip", johdanto-osa, ja "Heligoland–Zanzibar Treaty", '
        + 'johdanto-osa sekä osiot "Terms" ja "Aftermath". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi kaistale ei vienyt Saksaa merelle?',
        vaihtoehdot: [
          'Britannia sulki joen',
          'Joki kuivui kesäisin',
          'Viktorian putoukset katkaisevat joen',
        ],
        oikea: 2,
      },
    },
  ],

  ZAF: [
    /*
     * Hopetown Oranjejoen varrella, timanttikuumeen lähtöpiste.
     * Lähde: en.wikipedia.org: Star of South Africa (diamond)
     */
    {
      id: 'etela-afrikan-tahti',
      otsikko: 'Timantti, joka maksoi viisisataa lammasta',
      nimio: 'Hopetown 1869',
      vuosi: '1869–1871',
      paikka: 'Hopetown, Oranjejoen ranta',
      lat: -29.62583, lon: 24.08556,
      kortti: 'Paimen sai löydöstään viisisataa lammasta, kymmenen härkää ja hevosen. '
        + 'Ostaja myi saman kiven eteenpäin yli yhdellätoista tuhannella punnalla — ja '
        + 'kaksi vuotta myöhemmin alkoi ryntäys.',
      teksti: 'Etelä-Afrikan tähti, joka tunnetaan myös nimellä Dudleyn timantti, on 47,69 '
        + 'karaatin valkoinen timantti. Sen löysi 1869 griqua-paimen Oranjejoen rannalta, ja '
        + 'ennen hiontaa kivi painoi 83,5 karaattia.'
        + '\n\nPaimen myi kiven naapuritilan isännälle Schalk van Niekerkille, joka oli jo '
        + 'ennestään tunnettu seudulla: hän oli hankkinut 1866 runsaan 21 karaatin timantin '
        + 'ostamalla sen 15-vuotiaalta pojalta Erasmus Jacobsilta. Maksu Etelä-Afrikan '
        + 'tähdestä oli 500 lammasta, kymmenen härkää ja hevonen.'
        + '\n\nVan Niekerk myi kiven eteenpäin Lilienfeldin veljeksille Hopetownissa 11 200 '
        + 'punnalla — nykyrahassa runsaat 1,3 miljoonaa puntaa. Veljekset lähettivät sen '
        + 'Englantiin, jossa se vaihtoi omistajaa kahdesti, kunnes sen osti kreivitär '
        + 'Georgina Ward.'
        + '\n\nLöytö muutti koko maan. Suuri kivi houkutteli seudulle timantinetsijöitä, ja '
        + 'heinäkuussa 1871 syntyi ryntäys lähistön uudelle timanttikentälle Colesberg '
        + 'Koppjelle. Paikkaa kutsuttiin ensin nimellä New Rush; myöhemmin siitä tuli '
        + 'Kimberley.',
      lahde: 'en-Wikipedia "Star of South Africa (diamond)", johdanto-osa. '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä kaupunki syntyi vuoden 1871 ryntäyksen paikalle?',
        vaihtoehdot: [
          'Hopetown',
          'Bloemfontein',
          'Kimberley',
        ],
        oikea: 2,
      },
    },
    /*
     * Mapungubwen kukkula Limpopon ja Shashen yhtymäkohdassa.
     * Lähde: en.wikipedia.org: Kingdom of Mapungubwe
     */
    {
      id: 'mapungubwen-sarvikuono',
      otsikko: 'Kultasarvikuono, jota ei haluttu näyttää',
      nimio: 'Mapungubwe 1933',
      vuosi: '1933',
      paikka: 'Mapungubwen kukkula',
      lat: -22.1925, lon: 29.23889,
      kortti: 'Aarteenetsijät kaivoivat kukkulalta kultaa ja jättivät osan löydöistä '
        + 'ilmoittamatta. Sitten hallitus otti paikan haltuunsa — ei suojellakseen sitä '
        + 'vaan koska löytö oli väärä.',
      teksti: 'Mapungubwe oli valtio Shashe- ja Limpopo-jokien yhtymäkohdassa nykyisen '
        + 'Etelä-Afrikan alueella, Suuresta Zimbabwesta etelään. Paikalliset tunsivat '
        + 'kukkulan omista suullisista perinteistään ja pitivät sitä pyhänä ja esi-isien '
        + 'kuninkaiden voiman täyttämänä; perinne kielsi vierailun ja jopa kukkulan '
        + 'osoittamisen sormella.'
        + '\n\n1900-luvun alussa Mopanen alueen maanviljelijäsuku Van Graanit kuulivat '
        + 'tarinan valkoisesta miehestä, joka oli elänyt erakkona Limpopon rantaluolassa ja '
        + '"noussut pyhälle kukkulalle ja löytänyt sieltä asioita". Vuosien etsinnän jälkeen '
        + 'he pakottivat 1933 nimettömäksi jääneen paikallisen oppaan mukaansa; arkeologin '
        + '1937 kirjoittaman kuvauksen mukaan opas "vapisi kirjaimellisesti pelosta, ja '
        + 'häntä oli pideltävä paikallaan" ennen kuin hän näytti salaisen polun.'
        + '\n\nRyhmä kaivoi esiin keramiikan sirpaleita sekä kupari-, lasi- ja kultaesineitä '
        + 'ja runsaasti koristellun hautauksen. Kaikkea ei ilmoitettu. Nuorempi Van Graan, '
        + 'entinen Pretorian yliopiston opiskelija, kertoi löydöstä yliopiston arkeologille.'
        + '\n\nPretorian yliopisto, tuolloin yksinomaan afrikaaneri-instituutio, sai oikeudet '
        + 'aarteeseen, ja Hertzogin hallitus otti alueen monopolikseen. Löytö oli '
        + 'hankala: se kumosi valkoisen ylivallan myytin takapajuisesta Afrikasta, ja aivan '
        + 'kuten Suuren Zimbabwen kohdalla hallitus yritti salata, vähätellä ja "suojella" '
        + 'paikkaa. Vuonna 1933 kaivetut luut haudattiin takaisin kukkulalle vasta 20. '
        + 'marraskuuta 2007.',
      lahde: 'en-Wikipedia "Kingdom of Mapungubwe", johdanto-osa sekä osiot "Burials" ja '
        + '"Rediscovery". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi hallitus otti löytöpaikan haltuunsa?',
        vaihtoehdot: [
          'Se halusi rakentaa museon',
          'Kukkula oli sotilasaluetta',
          'Löytö kumosi valkoisen ylivallan myytin',
        ],
        oikea: 2,
      },
    },
  ],

  ZWE: [
    /*
     * Fort Salisbury, jonne pioneerikolonna pysähtyi 1890 — myönnytyksen
     * suora seuraus. Lähde: en.wikipedia.org: Rudd Concession
     */
    {
      id: 'ruddin-myonnytys',
      otsikko: 'Sopimus, josta kiväärit poistettiin lehteen',
      nimio: 'Rudd 1888',
      vuosi: '1888–1890',
      paikka: 'Fort Salisbury (Harare)',
      lat: -17.863889, lon: 31.029722,
      kortti: 'Kuninkaalle luvattiin tuhat kivääriä, satatuhatta patruunaa, höyrylaiva ja '
        + 'sata puntaa kuussa. Kun sopimus julkaistiin lehdissä, kivääreistä ei puhuttu '
        + 'sanaakaan.',
      teksti: 'Ruddin myönnytys oli kirjallinen sopimus yksinoikeudesta kaivostoimintaan '
        + 'Matabelemaassa, Mashonamaassa ja niiden naapurialueilla. Kuningas Lobengula '
        + 'myönsi sen 30. lokakuuta 1888 Charles Ruddille, James Rochfort Maguirelle ja '
        + 'Francis Thompsonille, jotka toimivat Cecil Rhodesin asiamiehinä.'
        + '\n\nEhdot olivat sellaiset, ettei kukaan kilpailija pystynyt vastaamaan: tuhat '
        + 'Martini–Henry-takaaladattavaa kivääriä, 100 000 patruunaa, höyrylaiva Sambesille '
        + 'tai vaihtoehtoisesti 500 puntaa kertakorvausta, sekä sata puntaa kuukaudessa '
        + 'ikuisesti. Kuninkaalle painavinta olivat aseet: hänellä oli 600–800 kivääriä '
        + 'mutta tuskin lainkaan patruunoita.'
        + '\n\nRhodes tiesi, että lupaus tuhannesta kivääristä otettaisiin Etelä-Afrikassa '
        + 'huonosti vastaan, ja Rudd valmisteli asiakirjasta version, josta ne oli jätetty '
        + 'pois. Cape Times ja Cape Argus julkaisivat sen 24. marraskuuta 1888: hinnaksi '
        + 'kerrottiin "suuri kuukausittainen käteismaksu, tykkivene puolustustarkoituksiin '
        + 'Sambesille ja muita palveluksia".'
        + '\n\nLobengula yritti perua sopimuksen vedoten siihen, että ehtoja oli suullisesti '
        + 'rajattu, ja lähetti lähettiläitä kuningatar Victorian puheille Windsoriin. Yritykset '
        + 'kaatuivat. Myönnytys tuotti Rhodesin yhtiölle kuninkaallisen peruskirjan '
        + 'lokakuussa 1889, ja pioneerikolonna pysähtyi tulevan pääkaupungin Fort '
        + 'Salisburyn paikalle 12. syyskuuta 1890 ja nosti lipun seuraavana aamuna.',
      lahde: 'en-Wikipedia "Rudd Concession", johdanto-osa sekä osiot "Negotiations", '
        + '"Publication" ja "Pioneer Column". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä jätettiin pois lehdissä julkaistusta sopimuksesta?',
        vaihtoehdot: [
          'Tuhat kivääriä',
          'Kuukausimaksu',
          'Kaivosoikeudet',
        ],
        oikea: 0,
      },
    },
    /*
     * Kariban pato Sambesilla. Lähde: en.wikipedia.org: Kariba Dam
     */
    {
      id: 'kariban-allas',
      otsikko: 'Eläimet pelastettiin veneisiin, ihmiset siirrettiin pois',
      nimio: 'Kariba 1958',
      vuosi: '1955–1961',
      paikka: 'Kariban pato, Sambesi',
      lat: -16.52222, lon: 28.76167,
      kortti: 'Nousevasta vedestä pelastettiin noin 6 000 suurta eläintä erillisellä '
        + 'operaatiolla. Saman altaan tieltä siirrettiin 57 000 ihmistä, eikä siitä '
        + 'kirjoitettu yhtä hyviä uutisia.',
      teksti: 'Kariban pato rakennettiin Sambesille 1950-luvulla, ja sen taakse syntyi yksi '
        + 'maailman suurimmista tekojärvistä. Rakennustyö oli vaarallista, ja aikakauden '
        + 'valokuvat padon työmaalta näyttävät, millaisissa oloissa työtä tehtiin.'
        + '\n\nAltaan täyttyminen pakotti siirtymään noin 57 000 tongaa, jotka asuivat '
        + 'Sambesin varrella joen molemmin puolin. Siitä, kuinka paljon apua siirretyt '
        + 'saivat, on esitetty hyvin erilaisia arvioita. Brittikirjailija David Howarth '
        + 'kuvasi Pohjois-Rhodesian toimia myönteisesti: mallipuutarhoja, eroosiota estävää '
        + 'kynnön muuttamista, kastelupuutarha Sinazongwessa, osuuskuntia, lainoja '
        + 'viljelijöille, kouluja ja terveysasemia.'
        + '\n\nAmerikkalainen kirjailija Jacques Leslie kirjoitti teoksessaan Deep Water '
        + '2005, ettei tilanne ollut juuri muuttunut 1970-luvulta, ja piti Karibaa Afrikan '
        + 'historian pahimpana patosiirtoketkuna. Siirretyt perustivat 2002 Basilwizi '
        + 'Trustin ajaakseen omia asioitaan ja toimiakseen välittäjänä Sambesin laakson '
        + 'asukkaiden ja päättäjien välillä.'
        + '\n\nEläimille järjestettiin oma pelastusretkikunta. Vuosina 1958–1961 Operation '
        + 'Noah pyydysti ja siirsi nousevan veden uhkaamalta alueelta noin 6 000 suurta '
        + 'eläintä sekä lukemattomia pieniä.',
      lahde: 'en-Wikipedia "Kariba Dam", osiot "Population displacement and resettlement" '
        + 'ja "Operation Noah". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuinka monta ihmistä altaan tieltä siirrettiin?',
        vaihtoehdot: [
          'Noin 6 000',
          'Noin 570 000',
          'Noin 57 000',
        ],
        oikea: 2,
      },
    },
  ],
  /*
   * ══ ERÄ M12, LÄNSI-AFRIKKA 6.9.2026 ══════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M12 (GHA, SEN, MLI, LBR, SLE) tuo kaksi skandaalia kuhunkin
   * viiteen maahan — kymmenen uutta. Kaikki ovat kuvattomia kuten erän
   * muutkin nostot, ja jokaisen lähderivi nimeää en-Wikipedian
   * artikkelin ja osan sekä tarkistuspäivän 6.9.2026.
   *
   * PAIKAT ON MITATTU. Yksikään uusi merkki ei ole pelikaupungin
   * kohdalla (KAUPUNGIN_KOHDALLA_SADE 7 lautayksikköä,
   * js/fokuskohteet.js): lähin on Dékheulé 14,8 lautayksikön päässä
   * Dakarista ja toiseksi lähin kultajakkaran sota 39,2 yksikön päässä
   * Kumasi-laatasta, joka on laudalla rannikolla eikä kaupungin
   * oikealla paikalla.
   *
   * KOLME PAIKKAVALINTAA ON TEHTY MERKKIEN PÄÄLLEKKÄISYYDEN TAKIA.
   * (1) Dékheulén taistelupaikalla ei ole en-Wikipedian koordinaattia,
   * joten merkki on Cayorin lähimmässä koordinaatillisessa paikassa
   * Tivaouanessa (en-Wikipedia "Tivaouane"). (2) Lombokon linnakkeella
   * ei myöskään ole koordinaattia; artikkelin mukaan se oli Gallinasin
   * suulla lähellä Sulimaa, ja merkki on saman rannikon tunnetussa
   * pisteessä, Moajoen suulla (en-Wikipedia "Moa River"). (3) Christyn
   * raportti koski Liberian koko hallitusta Monroviassa, mutta
   * Monrovian piste on jo saman erän Providence Islandilla, joten
   * merkki on Sinoen satamakaupungissa Greenvillessä.
   *
   * HERKÄT AIHEET ON KIRJOITETTU LÄHTEEN KATTEESSA. Orjakaupan,
   * pakkotyön ja siirtomaasotien luvut ovat artikkelien omia, eikä
   * yhdenkään kortin aihe ole käynnissä oleva selkkaus: Sierra Leonen
   * ja Liberian sisällissodat mainitaan vain siellä, missä artikkeli
   * kertoo niistä mennyttä aikaa (Koidun kaivossopimus).
   * ══════════════════════════════════════════════════════════════════ */
  GHA: [
    /*
     * Kumasi, Asanten pääkaupunki. Laudan Kumasi-laatta on 39,2
     * lautayksikön päässä kaupungin oikeasta paikasta.
     * Lähde: en.wikipedia.org: War of the Golden Stool
     */
    {
      id: 'kultajakkaran-sota',
      otsikko: 'Jakkara, jolle kukaan ei istu',
      nimio: 'Kultajakkara',
      vuosi: '1900',
      paikka: 'Kumasi, Asante',
      lat: 6.7, lon: -1.6258,
      kortti: 'Britannian kuvernööri saapui Kumasiin maaliskuussa 1900 ja vaati '
        + 'istuakseen asantien kultajakkaralle. Jakkara ei ollut valtaistuin '
        + 'vaan kansan sielu, eikä sillä istunut kukaan. Puhe kuunneltiin '
        + 'vaiti, ja päälliköt lähtivät kotiin valmistelemaan sotaa.',
      teksti: 'Kultajakkara oli ollut kauan asantien hallitsemisvallan vertauskuva. '
        + 'Britannia oli miehittänyt Asanten tammikuussa 1896 ja karkottanut '
        + 'kuninkaan Prempeh I:n maanpakoon. Kuvernööri Frederick Hodgson '
        + 'saapui Kumasiin pienen joukon kanssa 25. maaliskuuta 1900, nousi '
        + 'korokkeelle ja ilmoitti koolla olleille johtajille, että Prempeh ei '
        + 'palaa, että vuoden 1874 Fomenan rauhansopimuksen mukainen '
        + '160 000 punnan vuotuinen korvaus on yhä maksamatta ja että '
        + 'kuningattarelle kuuluu kultajakkara.'
        + '\n\n"Miksi ette tuoneet kultajakkaraa istuimekseni?" hän kysyi. '
        + 'Vastaus oli hiljaisuus. Britannian parlamentissa David Lloyd George '
        + 'sanoi seuraavana vuonna, että Hodgsonin retki kultajakkaran perään '
        + 'muistutti graalin etsintää, ja siirtomaaministeri Joseph '
        + 'Chamberlainilta kysyttiin toistuvasti, oliko kuvernööri ylipäätään '
        + 'saanut lupaa vaatia jakkaraa.'
        + '\n\nSota maksoi briteille ja heidän liittolaisilleen noin tuhat '
        + 'kaatunutta, ja Asante liitettiin imperiumiin. Sotatavoitteessaan '
        + 'asantit kuitenkin onnistuivat: jakkara oli piilotettu syvälle '
        + 'metsään, eivätkä britit koskaan saaneet sitä. Vuonna 1901 he '
        + 'pidättivät joukon päälliköitä, muun muassa Ejisun kuningataräidin '
        + 'Yaa Asantewaan, ja karkottivat heidät Seychelleille 25 vuodeksi; '
        + 'moni kuoli siellä, Yaa Asantewaa 1921. Jakkara löytyi vahingossa '
        + '1921, kun työmiehet kaivoivat sen esiin ja veivät kultakoristeet.',
      lahde: 'en-Wikipedia "War of the Golden Stool", johdanto-osa sekä osiot '
        + '"The Golden Stool" ja "Aftermath". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä kuvernööri Hodgson vaati asanteilta Kumasissa?',
        vaihtoehdot: [
          'Kultajakkaraa istuimekseen',
          'Kultakaivosten omistusta',
          'Kumasin linnoituksen avaimia',
        ],
        oikea: 0,
      },
    },
    /*
     * Salagan kauppakaupunki Itä-Gonjassa.
     * Lähde: en.wikipedia.org: Salaga
     */
    {
      id: 'salagan-orjatori',
      otsikko: 'Etelän Timbuktu ja sen tori',
      nimio: 'Salaga',
      vuosi: '1800-luku',
      paikka: 'Salaga, Itä-Gonja',
      lat: 8.55, lon: -0.5167,
      kortti: 'Salaga oli 1700- ja 1800-luvulla Kultarannikon suurin orjatori. '
        + 'Samassa kaupungissa kulki myös kolapähkinä, karja ja maapähkinä, ja '
        + 'sen monikansallisen väen takia sitä sanottiin etelän Timbuktuksi. '
        + 'Torin paikalla kasvaa nykyään nuori baobab.',
      teksti: 'Salaga on Itä-Gonjan piirikunnan pääkaupunki Pohjois-Ghanassa. Nimi '
        + 'tulee dagbanin sanasta salgi, joka tarkoittaa asuinpaikkaan '
        + 'tottumista. Kaupunki oli 1700- ja 1800-luvulla seudun tärkein '
        + 'markkinapaikka, ja sen hallitseminen antoi monopolin sekä '
        + 'pohjoiseen että etelään suuntautuvaan kauppaan. Salagaa hallitsi '
        + 'gonjojen sotaisa kuningaskunta, mutta asukkaita olivat myös hausat, '
        + 'wangarat, dagombat ja gurmat.'
        + '\n\nTori oli Sahelin eteläisimmässä kolkassa ja välitti karjaa ja '
        + 'maapähkinää Yendistä sekä kolapähkinää nykyisen Ghanan alueelta '
        + 'Pohjois-Nigeriaan. Atlantin orjakaupan aikana samaa reittiä '
        + 'kuljetettiin orjia rannikolle vietäviksi. Kaupungissa on lampi '
        + 'nimeltä Wonkan bawa, hausaksi orjien peseytymispaikka, ja entisen '
        + 'orjatorin kohdalla kasvaa nuori baobab.'
        + '\n\nSalagan jälki näkyy yhä rannikolla: Accran Jamestownin toria '
        + 'kutsutaan Salagan toriksi, koska sinne myytiin Salagasta tuotuja '
        + 'ihmisiä. Vuonna 1892 kaupungissa puhkesi sisällissota, ja suuri osa '
        + 'zongo-väestöstä lähti alueelta. Salaga oli 2012 noin 25 500 '
        + 'asukkaan kaupunki.',
      lahde: 'en-Wikipedia "Salaga", johdanto-osa sekä osiot "Etymology" ja '
        + '"History". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi Salagaa kutsuttiin etelän Timbuktuksi?',
        vaihtoehdot: [
          'Se oli Saharan eteläisin kaupunki',
          'Sen väki ja kauppa olivat monikansallisia',
          'Siellä oli suuri käsikirjoituskirjasto',
        ],
        oikea: 1,
      },
    },
  ],
  SEN: [
    /*
     * Dékheulén taistelupaikka Cayorissa. Taistelupaikalla ei ole
     * en-Wikipedian koordinaattia, joten merkki on Tivaouanen
     * koordinaatissa (en-Wikipedia "Tivaouane", 14,95 N / 16,8167 W).
     * Lähde: en.wikipedia.org: Lat Dior
     */
    {
      id: 'lat-dior-ja-rautatie',
      otsikko: 'Kuningas, joka kielsi radan',
      nimio: 'Dékheulé',
      vuosi: '1886',
      paikka: 'Dékheulé, Cayor',
      lat: 14.95, lon: -16.8167,
      kortti: 'Cayorin damel Lat Jor kertoi Ranskan kuvernöörille vastustavansa '
        + 'Dakarin ja Saint-Louis’n rautatietä niin kauan kuin elää. Rata '
        + 'valmistui 1886. Samana vuonna hänet houkuteltiin taisteluun, jota '
        + 'ei voinut voittaa, ja Cayorin kuningaskunta lakkasi olemasta.',
      teksti: 'Lat Jor Ngoné Latir Jop oli 1800-luvun wolof-valtion Cayorin '
        + 'hallitsija ja on nykyään Senegalin kansallissankari. Hän nousi '
        + 'damelin paikalle 1862, kun Ranskan asettama Majojo kukistettiin, '
        + 'joutui pakenemaan 1864 ja liittyi Saloumin marabuutin Maba Diakhou '
        + 'Bân oppilaaksi — ratkaisu, joka teki hänestä loppuiäkseen '
        + 'harjoittavan muslimin ja käänsi Cayorin hallitsijasuvun perinteisen '
        + 'maallisuuden.'
        + '\n\nRanska tunnusti hänet Cayorin dameliksi 1870, ja liitto kesti '
        + 'vuoteen 1883, jolloin hän aloitti kapinan rautatietä vastaan. '
        + 'Kuvernööri Servatiukselle hänen kerrotaan sanoneen: "Niin kauan '
        + 'kuin elän, vastustan kaikin voimin tämän radan rakentamista." '
        + 'Ranskalaiset panivat hänen tilalleen veljenpojan Samba Lawbe '
        + 'Fallin, ja Lat Jor kävi kolme vuotta sissisotaa pienen joukon '
        + 'kanssa.'
        + '\n\nVuoteen 1886 mennessä rata oli valmis ja ranskalaiset '
        + 'vahvimmillaan. Samba Lawbe Fall sai surmansa neuvotteluissa '
        + 'lokakuussa, ja loppuvuodesta Lat Jor kaatui Dékheulén taistelussa. '
        + 'Cayor lakkasi olemasta itsenäinen valtio. Faidherben kerrotaan '
        + 'sanoneen hänen sotilaistaan: heidät voi tappaa mutta ei häpäistä — '
        + 'lause on nykyään Senegalin armeijan tunnuslause.',
      lahde: 'en-Wikipedia "Lat Dior", johdanto-osa sekä osiot "First Reign as '
        + 'Damel", "Return to Cayor" ja "Legacy". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä vastaan Lat Jor nousi kapinaan vuonna 1883?',
        vaihtoehdot: [
          'Ranskan asettamaa veroa',
          'Islamin leviämistä Cayoriin',
          'Dakarin ja Saint-Louis’n rautatietä',
        ],
        oikea: 2,
      },
    },
    /*
     * Kabroussen kylä Ala-Casamancessa.
     * Lähde: en.wikipedia.org: Aline Sitoé Diatta
     */
    {
      id: 'aline-sitoe-diatta',
      otsikko: 'Sadesaaja, joka kiellettiin',
      nimio: 'Kabrousse',
      vuosi: '1943',
      paikka: 'Kabrousse, Ala-Casamance',
      lat: 12.3556, lon: -16.7206,
      kortti: 'Kabroussen kylässä nuori joola-nainen alkoi 1942 pitää sadetta '
        + 'kutsuvia menoja. Sateet tulivat, sato oli runsas ja pyhiinvaeltajia '
        + 'saapui joka kylästä. Vichy-Ranskan hallinto keräsi samaan aikaan '
        + 'riisiä pakolla — ja päätti, että nainen oli kapinan alkuunpanija.',
      teksti: 'Aline Sitoé Diatta syntyi noin 1920 Kabroussessa, jäi orvoksi ja '
        + 'muutti 1935 Dakariin kotiapulaiseksi. Vuosina 1941–42 hän alkoi '
        + 'nähdä näkyjä, joiden hän sanoi tulevan Emitailta, joolien '
        + 'uskomuksen ylimmältä olennolta, ja jotka käskivät hänen palata '
        + 'kotikyläänsä. Toukokuussa 1942 hän kutsui vanhimmat koolle ja '
        + 'toimitti kasila-menon, jossa uhrattiin musta sonni. Sen jälkeen '
        + 'satoi, ja seurasi kuuden viikon juhla-aika.'
        + '\n\nOpetus törmäsi Vichy-Ranskan maatalouspolitiikkaan. Kun riisiä '
        + 'ei enää saatu Indokiinasta, hallinto aloitti Casamancessa '
        + 'pakko-ostokampanjan. Aline Sitoé puolusti paikallisia riisilajikkeita, '
        + 'torjui maapähkinän kaltaiset rahakasvit ja ennusti pakko-ottojen, '
        + 'päiveron ja koko Ranskan vallan loppua. Karjan uhraaminen vei '
        + 'eläimiä, joita hallinto halusi pohjoisen kaupunkien ruoaksi.'
        + '\n\nTammikuussa 1943 sotilasosastot lähetettiin hakemaan riisiä. '
        + 'Yhteenottojen jälkeen Aline Sitoé pidätettiin seitsemäntoista muun '
        + 'kanssa, ja Kabrousse joutui luovuttamaan kaikki riisivarastonsa. '
        + 'Oikeus tuomitsi hänet kapinaan yllyttämisestä, vaikka Ziguinchorin '
        + 'katoliset lähetyssaarnaajat vahvistivat hänen sanoneen tehtävänsä '
        + 'olevan epäpoliittinen. Hänet karkotettiin Kayesiin ja siirrettiin '
        + 'sieltä Timbuktun leiriin, jossa hän kuoli keripukkiin 22. toukokuuta '
        + '1944. Kuolemasta kerrottiin julkisesti vasta 1983.',
      lahde: 'en-Wikipedia "Aline Sitoé Diatta", johdanto-osa sekä osiot "Early '
        + 'life", "Spiritual leadership" ja "Capture, exile, and death". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Missä Aline Sitoé Diatta kuoli?',
        vaihtoehdot: [
          'Kabroussessa',
          'Ziguinchorissa',
          'Timbuktun vankileirissä',
        ],
        oikea: 2,
      },
    },
  ],
  MLI: [
    /*
     * Timbuktu. Laudan Timbuktu-laatta on 39,4 lautayksikön päässä
     * kaupungin oikeasta paikasta, joten merkki ei ole sen kohdalla.
     * Lähde: en.wikipedia.org: Timbuktu Manuscripts
     */
    {
      id: 'timbuktun-kasikirjoitukset',
      otsikko: 'Kirjat, jotka piilotettiin koteihin',
      nimio: 'Ahmed Baba',
      vuosi: '2012',
      paikka: 'Timbuktu',
      lat: 16.7666, lon: -3.0026,
      kortti: 'Timbuktun kirjastoissa oli satojatuhansia käsikirjoituksia, joista '
        + 'suurin osa oli yhä tutkimatta ja luetteloimatta. Kun kaupunki '
        + 'kaatui 2012, osa niistä poltettiin ja varastettiin. Loput '
        + 'katosivat — kaupunkilaisten koteihin.',
      teksti: 'Timbuktun kirjurit käänsivät vuosisatojen ajan muun muassa Platonia, '
        + 'Hippokratesta ja Avicennaa ja kopioivat kahdenkymmenenkahdeksan '
        + 'niteen arabialaisen sanakirjan. Paikalliset kirjoittivat itse '
        + 'historiaa, uskontoa, lakia, filosofiaa ja runoutta. Kronikoitsija '
        + 'Mahmud Kati merkitsi muistiin elokuun 1583 tähdenlennot: "tähdet '
        + 'lensivät kuin koko taivas olisi syttynyt tuleen". Käsikirjoitukset '
        + 'periytyivät suvuittain, ja useimmat ovat huonossa kunnossa; '
        + 'kokonaismäärää ei tiedetä.'
        + '\n\nMalin sodan aikana 2012–2013 Ansar Dinen taistelijat polttivat '
        + 'tai veivät 4 203 käsikirjoitusta, ja Ahmed Baban instituutin sekä '
        + 'erään kirjaston kerrottiin palaneen vetäytymisen yhteydessä. '
        + 'Yhdeksänkymmentä prosenttia pelastui, koska väestö järjestäytyi '
        + 'SAVAMA-DCI-järjestön ympärille.'
        + '\n\nEvakuoinnin järjestivät kirjastonhoitaja Abdel Kader Haidara, '
        + 'jonka suvussa tehtävä oli kulkenut sukupolvelta toiselle, ja '
        + 'yhdysvaltalainen kirjojen säilytyksen asiantuntija Stephanie '
        + 'Diakité. Haidara turvautui paikallisiin perheisiin, jotka '
        + 'piilottivat instituutin kokoelman koteihinsa, ennen kuin kirjat '
        + 'kuljetettiin Bamakoon. Turvaan vietiin noin 350 000 '
        + 'käsikirjoitusta, joista 300 000 oli yhä Bamakossa 2022. Etelässä '
        + 'odotti uusi vaara: home ja kosteus.',
      lahde: 'en-Wikipedia "Timbuktu Manuscripts", johdanto-osa sekä osiot '
        + '"History", "Destruction and evacuation" ja "History of the '
        + 'evacuation". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuinka monta käsikirjoitusta vietiin turvaan Bamakoon?',
        vaihtoehdot: [
          'Noin 4 200',
          'Noin 350 000',
          'Noin 20 000',
        ],
        oikea: 1,
      },
    },
    /*
     * Office du Nigerin kastelualue Nionon tasangoilla.
     * Lähde: en.wikipedia.org: Office du Niger
     */
    {
      id: 'office-du-niger',
      otsikko: 'Puuvillasuunnitelma, joka ei toteutunut',
      nimio: 'Office du Niger',
      vuosi: '1932',
      paikka: 'Nionon tasangot, Ségou',
      lat: 14.25, lon: -5.9833,
      kortti: 'Ranskalainen suunnitelma oli kastella Nigerin vedellä lähes kaksi '
        + 'miljoonaa hehtaaria Malin tasankoa ja siirtää sinne miljoonia '
        + 'ihmisiä. Kastelua saatiin vuoteen 1948 mennessä noin 20 000 '
        + 'hehtaaria — ja pakkotyöhön kymmeniätuhansia.',
      teksti: 'Office du Niger on Malin puolittain itsenäinen valtionvirasto, joka '
        + 'hallinnoi suurta kastelujärjestelmää Ségoun alueella. Vesi '
        + 'ohjataan Nigeristä kanaviin Markalan padolla 35 kilometriä Ségousta '
        + 'alavirtaan, ja sillä kastellaan lähes 100 000 hehtaaria tasankoa. '
        + 'Siirtomaahallinto rakensi järjestelmän tuottamaan puuvillaa '
        + 'tekstiiliteollisuudelle, mutta pääsato on nykyään riisi: noin '
        + '320 000 tonnia vuodessa eli 40 prosenttia Malin koko tuotannosta.'
        + '\n\nHanke keksittiin 1910-luvulla. Johtaja Émile Bélimen '
        + 'suunnitelmissa oli 1920-luvun lopulla 1 850 000 hehtaaria '
        + 'kasteltuja riisipeltoja, yli 3 000 kilometrin rata Pohjois-Afrikkaan '
        + 'ja miljoonan tai kolmen ja puolen miljoonan malilaisen '
        + 'pakkosiirto. Tavoitteisiin ei päästy, mutta kymmeniätuhansia '
        + 'ihmisiä koottiin pakkotyöhön kauheissa oloissa. Vuoteen 1948 '
        + 'mennessä kasteltua maata oli noin 20 000 hehtaaria ja viljelijöitä '
        + 'alle 23 000; kansallistamisen aikaan 1960-luvun alussa heitä oli '
        + '42 000.'
        + '\n\nMaakiista sai jatkoa 2008, kun Malin hallitus alkoi tarjota '
        + 'kastelemattomia maita 30 ja 50 vuoden vuokrasopimuksilla '
        + 'ulkomaisille sijoittajille. Näkyvin tapaus on Malibya: Libyan '
        + 'valtio sai 100 000 hehtaaria viideksikymmeneksi vuodeksi ilman '
        + 'maanvuokraa. Sopimuksen sisältöä ei julkistettu, mutta vuodettu '
        + 'jäljennös päätyi verkkoon; alueella asui kyliä, eikä ympäristö- ja '
        + 'sosiaalisia vaikutusarvioita ole julkaistu.',
      lahde: 'en-Wikipedia "Office du Niger", johdanto-osa sekä osiot "Historical '
        + 'development" ja "Large-scale land leases". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä Émile Bélimen suunnitelma olisi vaatinut ihmisiltä?',
        vaihtoehdot: [
          'Miljoonien malilaisten pakkosiirtoa',
          'Nigerin kääntämistä toiseen suuntaan',
          'Sadan padon rakentamista',
        ],
        oikea: 0,
      },
    },
  ],
  LBR: [
    /*
     * Harbel Margibin maakunnassa, Firestonen istutusten keskus.
     * Lähde: en.wikipedia.org: Firestone Natural Rubber Company
     */
    {
      id: 'firestonen-sopimus',
      otsikko: 'Miljoona eekkeriä kuudella sentillä',
      nimio: 'Harbel',
      vuosi: '1926',
      paikka: 'Harbel, Margibi',
      lat: 6.2833, lon: -10.35,
      kortti: 'Liberian hallitus vuokrasi 1926 Firestonelle miljoona eekkeriä '
        + 'yhdeksäksikymmeneksiyhdeksäksi vuodeksi kuuden sentin '
        + 'eekkerihintaan — ja yhtiö sai valita maat mistä tahansa maan '
        + 'alueelta. Kaupan mukana tuli laina, joka sitoi maan talouden.',
      teksti: 'Yhdysvaltain kumin saanti oli 1920-luvulla eurooppalaisten '
        + 'siirtomaavaltojen käsissä, ja kauppaministeri Herbert Hoover piti '
        + 'kumia elintärkeänä raaka-aineena autonrenkaiden takia. Harvey '
        + 'Firestone lähetti joulukuussa 1923 asiantuntijoita Liberiaan '
        + 'tutkimaan maaperää, ja 1926 hallitus myönsi yhtiölle '
        + '99 vuoden vuokrasopimuksen miljoonasta eekkeristä kuuden sentin '
        + 'eekkerihinnalla. Syntyi maailman suurin kumiviljelmä; vielä 2005 '
        + 'Firestonen istutukset olivat lähes kolmasosa Liberian '
        + 'kumintuotannon alasta.'
        + '\n\nYhdysvaltain hallitus oli mukana alusta asti. Tutkija Christine '
        + 'Whyten mukaan ulkoministeriö toivoi, että jättisopimus pitäisi '
        + 'Liberian amerikkalaisessa vaikutuspiirissä ilman suoraa '
        + 'hallintoa, ja viime hetkellä sopimukseen lisätty '
        + '25 miljoonan dollarin laina varmisti yritysvallan.'
        + '\n\nIstutusten raivaus siirsi ihmisiä. Harbelin asukkaat joutuivat '
        + 'muuttamaan naapurimaakuntaan, eikä menetyksistä maksettu riittävää '
        + 'korvausta; uuden kylän nimi on bassaksi Queezahn, "valkoinen, '
        + 'lähde pois tästä paikasta". Vuonna 1929 Liberian lakiasäätävä '
        + 'kokous sai kuningas Maya Gedebeolta valituksen, jonka mukaan hanke '
        + 'oli tuhonnut yhdeksän kylää ja pannut ihmiset valitsemaan '
        + 'pakkotyön ja maastamuuton väliltä.',
      lahde: 'en-Wikipedia "Firestone Natural Rubber Company", johdanto-osa ja '
        + 'osio "Creation and early history". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Paljonko Firestone maksoi vuokramaasta eekkeriä kohti?',
        vaihtoehdot: [
          'Kuusi dollaria',
          'Kuusi senttiä',
          'Kuusikymmentä senttiä',
        ],
        oikea: 1,
      },
    },
    /*
     * Greenville Sinoen maakunnassa. Christyn raportti koski koko
     * Liberian hallitusta Monroviassa, mutta Monrovian piste on jo
     * saman erän Providence Islandilla (js/packs/maastokohteet-lbr.js),
     * joten merkki on Sinoen satamakaupungissa.
     * Lähde: en.wikipedia.org: Charles D. B. King
     */
    {
      id: 'christyn-raportti',
      otsikko: 'Raportti, joka kaatoi presidentin',
      nimio: 'Christyn raportti',
      vuosi: '1930',
      paikka: 'Greenville, Sinoe',
      lat: 5.0167, lon: -9.0333,
      kortti: 'Vaalinsa hävinnyt haastaja syytti Liberian hallitusta siitä, että '
        + 'se värväsi ja myi sopimustyöläisiä orjina. Kansainliitto lähetti '
        + 'komission tutkimaan asian, ja raportti 1930 tuki suurta osaa '
        + 'syytöksistä. Presidentti ja varapresidentti erosivat.',
      teksti: 'Charles D. B. King oli Liberian presidentti, jonka kaudella '
        + 'solmittiin Firestonen kumisopimus ja jonka rahoitusta valvoi '
        + 'Yhdysvaltain presidentin nimittämä neuvonantaja. Vuoden 1927 '
        + 'vaaleissa King sai virallisen ilmoituksen mukaan 234 000 ääntä, '
        + 'vaikka Liberiassa oli tuolloin 15 000 rekisteröityä äänestäjää. '
        + 'Guinnessin ennätyskirja on siksi merkinnyt hänet historian '
        + 'vilpillisimmän vaalituloksen voittajaksi.'
        + '\n\nVaalin hävinnyt Thomas J. R. Faulkner syytti monia hallituksen '
        + 'jäseniä siitä, että nämä värväsivät ja myivät sopimustyöläisiä '
        + 'orjina. Liberia kielsi väitteet ja kieltäytyi yhteistyöstä, joten '
        + 'Kansainliitto asetti komission, jota johti brittiläinen '
        + 'eläintieteilijä Cuthbert Christy. Yhdysvaltain presidentti Herbert '
        + 'Hoover katkaisi hetkeksi suhteet painostaakseen Liberiaa '
        + 'suostumaan.'
        + '\n\nKansainliitto julkaisi raportin 1930. Se tuki suurta osaa '
        + 'Faulknerin väitteistä ja nimesi monia virkamiehiä, muun muassa '
        + 'varapresidentti Allen Yancyn, joka joutui eroamaan sen jälkeen, kun '
        + 'hänen osallisuutensa Espanjan hallitsemalle Fernando Pón saarelle '
        + 'viedyn pakkotyön järjestelyihin tuli ilmi. Raportin mukaan '
        + 'virkamiehet olivat hyväksyneet pakkotyön teiden rakentamiseen ja '
        + 'tavaran laivaamiseen sekä päälliköiden nöyryyttämiseen, ja '
        + '"törkeän pelottelun ja tukahduttamisen politiikkaa" oli vuosien '
        + 'ajan järjestelmällisesti ylläpidetty. King ja Yancy erosivat.',
      lahde: 'en-Wikipedia "Charles D. B. King", osiot "Presidential election of '
        + '1927" ja "Forced labor and slavery scandal" sekä en-Wikipedia '
        + '"Allen N. Yancy", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuka johti Kansainliiton tutkintakomissiota Liberiassa?',
        vaihtoehdot: [
          'Herbert Hoover',
          'Thomas J. R. Faulkner',
          'Cuthbert Christy',
        ],
        oikea: 2,
      },
    },
  ],
  SLE: [
    /*
     * Lombokon orjalinnake Gallinasin rannikolla. Linnakkeella ei ole
     * en-Wikipedian koordinaattia; artikkelin mukaan se oli Gallinasin
     * suulla lähellä Sulimaa, ja merkki on saman rannikon
     * koordinaatillisessa pisteessä, Moajoen suulla (en-Wikipedia
     * "Moa River", 7,0192 N / 11,5413 W).
     * Lähde: en.wikipedia.org: Lomboko
     */
    {
      id: 'lombokon-linnake',
      otsikko: 'Linnake, jota ei ollut olemassa',
      nimio: 'Lomboko',
      vuosi: '1849',
      paikka: 'Gallinasin rannikko',
      lat: 7.0192, lon: -11.5413,
      kortti: 'Gallinasjoen suulla toimi orjalinnake vielä kauan sen jälkeen, kun '
        + 'orjakauppa oli kielletty — ja keskellä Britannian omaa siirtomaata. '
        + 'Vuonna 1839 sieltä lähti noin kaksituhatta ihmistä vuodessa. '
        + 'Kymmenen vuotta myöhemmin laivasto poltti paikan.',
      teksti: 'Lomboko oli espanjalaisen orjakauppiaan Pedro Blancon hallitsema '
        + 'orjalinnake nykyisen Sierra Leonen alueella. Se koostui useista '
        + 'suurista varastoista eli barracooneista, joihin sisämaasta tuodut '
        + 'ihmiset suljettiin, sekä palatsimaisista rakennuksista, joissa '
        + 'Blanco asui vaimoineen ja työntekijöineen.'
        + '\n\nLinnake rakennettiin muutamalle pienelle saarelle Gallinasjoen '
        + 'suulle lähelle Sulimaa. Alue oli Britannian Sierra Leonen '
        + 'siirtomaan sisällä, mutta sitä hallitsivat espanjalaiset '
        + 'orjakauppiaat. Vuoteen 1839 mennessä Gallinasjoen kautta vietiin '
        + 'noin kaksituhatta orjuutettua ihmistä vuodessa, vaikka orjakauppa '
        + 'oli laitonta.'
        + '\n\nVuonna 1849 kuninkaallisen laivaston orjakauppaa vastaan '
        + 'taisteleva Länsi-Afrikan laivasto-osasto hyökkäsi Lombokoon: '
        + 'merijalkaväki vapautti orjuutetut ja tuhosi sitten linnoituksen. '
        + 'Kaupankäynti oli jatkunut vuosikymmeniä sen jälkeen, kun sekä '
        + 'Britannia että Espanja olivat sen kieltäneet, ja juuri siksi '
        + 'laivasto-osasto oli ylipäätään olemassa: se partioi Länsi-Afrikan '
        + 'rannikolla pysäyttämässä orjalaivoja.'
        + '\n\nLomboko tunnetaan nykyään laajimmin Steven Spielbergin Amistad-'
        + 'elokuvasta. Siinä päähenkilö Joseph Cinqué ja muut vangitut '
        + 'tuodaan Lombokoon, ja elokuva näyttää heidän julman kohtelunsa; '
        + 'loppukohtaus on juuri orjuutettujen vapauttaminen ja linnakkeen '
        + 'tuho.',
      lahde: 'en-Wikipedia "Lomboko", johdanto-osa ja osio "Legacy". Tarkistettu '
        + '6.9.2026.',
      visa: {
        kysymys: 'Kuka hallitsi Lombokon orjalinnaketta?',
        vaihtoehdot: [
          'Pedro Blanco',
          'Joseph Cinqué',
          'Théodore Canot',
        ],
        oikea: 0,
      },
    },
    /*
     * Koidu Konon piirikunnassa.
     * Lähde: en.wikipedia.org: Koidu
     */
    {
      id: 'koidun-kaivossopimus',
      otsikko: 'Kaivos palkkiona palveluksesta',
      nimio: 'Koidu',
      vuosi: '1995',
      paikka: 'Koidu, Kono',
      lat: 8.6439, lon: -10.9717,
      kortti: 'Sierra Leonen hallitus antoi 1995 Koidun timanttikaivoksen '
        + 'toimiluvan eteläafrikkalaiselle yhtiölle — ei rahasta vaan '
        + 'palkkioksi sotilaallisesta avusta. Kaksikymmentä vuotta myöhemmin '
        + 'kaupunki haastoi kaivoksen omistajan oikeuteen maksamattomista '
        + 'kiinteistöveroista.',
      teksti: 'Koidu on Konon piirikunnan pääkaupunki Itä-Sierra Leonessa ja '
        + 'timanttikaupan keskus: kaksi maailman kymmenestä suurimmasta '
        + 'raakatimantista on löydetty kaupungin läpi virtaavasta Woyiejoesta. '
        + 'Asukkaita oli vuoden 2015 laskennassa 128 030, ja kaupunki on maan '
        + 'etnisesti ja uskonnollisesti moninaisimpia — yksikään ryhmä ei ole '
        + 'siellä enemmistönä.'
        + '\n\nVuonna 1995 hallitus teki sopimuksen eteläafrikkalaisen Branch '
        + 'Energy Limitedin kanssa, joka oli hallituksille palkkasotilaita '
        + 'toimittaneen Executive Outcomesin tytäryhtiö. Vuoden 1994 '
        + 'kaivoslain nojalla neuvoteltu 25-vuotinen sopimus antoi yhtiölle '
        + 'Koidun kaivoksen toimiluvan maksuna avusta sisällissodan '
        + 'kapinallisia vastaan; valtiolle jäi kaivoksesta 60 prosentin '
        + 'omistus.'
        + '\n\nPanaman paperit paljastivat myöhemmin, että Beny Steinmetzin '
        + 'suvun säätiö maksoi 1,2 miljoonaa dollaria puolesta '
        + 'kaivoslupaa. Oikeudet siirtyivät 2003 Koidu Holdingsille '
        + '28 miljoonalla dollarilla. Kaupunki haastoi 2015 yhtiön oikeuteen '
        + '684 000 dollarin maksamattomista kiinteistöveroista, mutta '
        + 'korkeimman oikeuden tuomari päätti huhtikuussa 2016, että yhtiöt '
        + 'olivat erillisiä eikä omistaja siksi ollut verovelvollinen.',
      lahde: 'en-Wikipedia "Koidu", johdanto-osa ja osio "History". Tarkistettu '
        + '6.9.2026.',
      visa: {
        kysymys: 'Millä Sierra Leonen hallitus maksoi 1995 sotilaallisesta avusta?',
        vaihtoehdot: [
          'Rahalla',
          'Maa-alueilla',
          'Timanttikaivoksen toimiluvalla',
        ],
        oikea: 2,
      },
    },
  ],
  /* ══════════════════════════════════════════════════════════════════
   * ══ ERÄ M15, AFRIKKA 5 6.9.2026 ══════════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M15 (SDN, TCD, LBY, NGA, SOM) tuo kaksi skandaalia kuhunkin
   * viiteen maahan — kymmenen uutta. Kaikki ovat kuvattomia kuten erän
   * muutkin nostot, ja jokaisen lähderivi nimeää en-Wikipedian
   * artikkelin ja osan sekä tarkistuspäivän 6.9.2026.
   *
   * KAIKKI KYMMENEN OVAT HISTORIAA, EIVÄT NYKYPÄIVÄÄ. Fablen linjaus
   * tälle erälle: Sudanin, Libyan ja Somalian nykytila on selkkaus,
   * joten skandaalit kirjoitetaan vain 1800- ja 1900-luvun
   * historiasta (M3:n Myanmar-linja). Vanhin kortti on vuodelta 1884
   * ja nuorin vuodelta 1964; kaksi tiedeskandaalia (Toumaïn reisiluu
   * ja Rabihin kallo) ulottuvat lähdeaineistossaan 2000-luvulle, mutta
   * kummankin aihe on museoesineen kohtalo eikä käynnissä oleva
   * konflikti.
   *
   * KAKSI MERKKIÄ ON SIIRRETTY NAAPURIRUUTUUN, koska tapahtumapaikan
   * päällä on jo toinen nimiö. Khartumin piirityksen merkki on
   * Sinisen Niilin varrella kaakkoon kaupungista, koska Niili-nimiö
   * (js/packs/maastokohteet-sdn.js) istuu täsmälleen Khartumin
   * kohdalla, ja Berberan sopimusten merkki on Adeninlahdella
   * kaupungin edustalla, koska sama erä täytti rannikon Laas Geelin ja
   * Dhambalinin nimiöillä. Kummankin `paikka`-rivi kertoo tapahtuman
   * oikean paikan. Rabihin merkki on Kousserin taistelupaikalta
   * koilliseen samasta syystä: Chari-joen nimiö on Kousserin päällä.
   * ══════════════════════════════════════════════════════════════════ */
  SDN: [
    /*
     * Khartumin piiritys 1884–1885. Merkki on Sinisen Niilin varrella
     * noin kahdeksankymmentä kilometriä kaupungista kaakkoon (33,1 /
     * 14,4), koska maan Niili-merkki on Khartumin kohdalla.
     * Lähde: en.wikipedia.org: Siege of Khartoum
     */
    {
      id: 'khartumin-piiritys',
      otsikko: 'Kenraali, jonka piti evakuoida ja joka linnoittautui',
      nimio: 'Khartum 1885',
      vuosi: '1884–1885',
      paikka: 'Khartum, Sinisen ja Valkoisen Niilin yhtymäkohta',
      lat: 14.4, lon: 33.1,
      kortti: 'Britannian hallitus lähetti Charles Gordonin Sudaniin yhdellä käskyllä: '
        + 'tyhjentäkää varuskunnat ja tulkaa pois. Gordon päätti toisin, linnoitti '
        + 'kaupungin ja jäi. Piiritys kesti kymmenen kuukautta, ja apujoukot saapuivat '
        + 'kaksi päivää liian myöhään.',
      teksti: 'Egypti oli valloittanut Sudanin 1820, mutta joutunut itse Britannian '
        + 'sotilaalliseen otteeseen 1882. Vuonna 1881 Sudanissa alkoi kapina, jota johti '
        + 'Muhammad Ahmad, mahdiksi julistautunut uskonnollinen johtaja. Egyptin armeija '
        + 'kärsi tappion toisensa jälkeen, eikä Lontoo halunnut lähettää omia joukkoja: '
        + 'pääministeri Gladstone painosti Egyptiä vetämään varuskuntansa pois ja nimitti '
        + 'Sudanin entisen kenraalikuvernöörin Charles George Gordonin hoitamaan '
        + 'evakuoinnin.'
        + '\n\nGordon oli eri mieltä tehtävästään. Hän saapui Khartumiin helmikuussa 1884, '
        + 'jossa oli 7 000 egyptiläistä sotilasta ja 27 000 siviiliä, ja ilmoitti '
        + 'pelastavansa myös muut piiritetyt varuskunnat. Matkalla Berberissä hän kertoi '
        + 'heimopäälliköille, että Egypti aikoo vetäytyä — tieto sai päälliköiden '
        + 'uskollisuuden horjumaan. Huhtikuuhun mennessä kaupunki oli saarrettu, ja Gordon '
        + 'maksoi joukoilleen itse painamillaan velkakirjoilla.'
        + '\n\nRuoan piti riittää kuusi kuukautta, mutta piiritys kesti kymmenen. Vasta '
        + 'julkisen painostuksen jälkeen Gladstone suostui heinäkuussa 1884 lähettämään '
        + 'avustusretkikunnan, joka pääsi Sudaniin vasta tammikuussa 1885. Mahdi hyökkäsi '
        + 'ennen sen saapumista: yön 25.–26. tammikuuta hyökkäyksessä varuskunta tuhoutui '
        + 'ja Gordon sai surmansa. Retkikunnan kärki näki kaupungin kaksi päivää liian '
        + 'myöhään ja kääntyi takaisin.'
        + '\n\nBritanniassa lehdistö syytti Gladstonea hitaudesta, ja kuningatar Victoria '
        + 'moitti häntä sähkeellä, joka vuoti julkisuuteen. Gladstonen hallitus kaatui '
        + 'kesäkuussa 1885. Mahdi perusti Sudaniin uskonnollisen valtion, joka kesti '
        + 'neljätoista vuotta.',
      lahde: 'en-Wikipedia "Siege of Khartoum", johdanto-osa sekä osiot "Background", '
        + '"Battle" ja "Aftermath". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä oli Gordonin virallinen tehtävä Khartumissa?',
        vaihtoehdot: [
          'Evakuoida varuskunnat pois Sudanista',
          'Rakentaa rautatie Punaisellemerelle',
          'Neuvotella rauha Egyptin kanssa',
        ],
        oikea: 0,
      },
    },
    /*
     * Wadi Halfan vanhan kaupungin hukuttaminen Assuanin padon
     * altaaseen 1964. Lähde: en.wikipedia.org: Wadi Halfa
     */
    {
      id: 'wadi-halfa',
      otsikko: 'Kaupunki, joka jäi padon altaan alle',
      nimio: 'Wadi Halfa',
      vuosi: '1959–1964',
      paikka: 'Wadi Halfa, Pohjois-Sudan',
      lat: 21.8, lon: 31.35,
      kortti: 'Sopimus kahden maan välillä kertoi, että vesi nousee. Wadi Halfan '
        + 'asukkaat saivat tietää, että heidän kaupunkinsa jää Assuanin padon altaan '
        + 'alle ja että heidät siirretään satojen kilometrien päähän. Mielenosoitukset '
        + 'vaiennettiin poikkeustilalla.',
      teksti: 'Wadi Halfa oli 1800-luvulla perustettu Niilin satamakaupunki Egyptin rajalla, '
        + 'Assuanista tulleiden höyrylaivojen päätepiste ja Sudanin rautatien pohjoinen '
        + 'pää. Sähkelinja Egyptiin valmistui 1866, ja kaupungin ympärillä oli nubialaisia '
        + 'muinaisjäännöksiä, muun muassa Buhenin egyptiläinen siirtokunta joen toisella '
        + 'rannalla. Vuoteen 1956 mennessä kaupungissa asui 11 000 ihmistä.'
        + '\n\n8. marraskuuta 1959 allekirjoitettiin Sudanin ja Yhdistyneen arabitasavallan '
        + 'sopimus Niilin vesistä. Se merkitsi, että Assuanin suurpadon allas peittäisi '
        + 'seudun ja että noin 52 000 ihmistä olisi siirrettävä muualle neljän vuoden '
        + 'aikana vuodesta 1960 alkaen. Eniten menettivät nubialaiset.'
        + '\n\nVastarinta oli avointa. Wadi Halfassa osoitettiin mieltä siirtoa vastaan '
        + '23.–24. lokakuuta 1960, ja 26. lokakuuta mielenosoitukset levisivät Khartumiin, '
        + 'jossa poliisi hajotti ne kyynelkaasulla. Hallitus julisti Wadi Halfaan '
        + 'sotatilan ja katkaisi yhteydet muuhun maahan; Khartumissa Kairon yliopiston '
        + 'kampus suljettiin väliaikaisesti ja noin viisikymmentä ihmistä pidätettiin.'
        + '\n\nVanha kaupunki tuhoutui kokonaan tulvan alle vuonna 1964. Suurin osa '
        + 'väestöstä siirrettiin, ja vuonna 1965 uudessa Halfassa asui vain 3 200 ihmistä. '
        + '1970-luvulla alue oli arkeologien tiiviin tutkimuksen kohteena, kun nubialaisia '
        + 'muistomerkkejä yritettiin pelastaa.',
      lahde: 'en-Wikipedia "Wadi Halfa", johdanto-osa sekä osio "History" ("Ancient '
        + 'Period", "Contemporary Period"). Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi Wadi Halfan vanha kaupunki katosi?',
        vaihtoehdot: [
          'Se paloi tulipalossa',
          'Se jäi Assuanin padon altaan alle',
          'Hiekkamyrsky peitti sen',
        ],
        oikea: 1,
      },
    },
  ],
  TCD: [
    /*
     * Rabih az-Zubayrin valtakunnan loppu ja kallon matka Pariisiin.
     * Merkki on Kousserin taistelupaikalta koilliseen (15,9 / 12,7),
     * koska Chari-joen nimiö istuu Kousserin kohdalla.
     * Lähde: en.wikipedia.org: Rabih az-Zubayr
     */
    {
      id: 'rabihin-kallo',
      otsikko: 'Sotapäällikkö, jonka kallo lähetettiin Pariisiin',
      nimio: 'Rabih',
      vuosi: '1900',
      paikka: 'Kousserin taistelu, Logonen ja Charin yhtymäkohta',
      lat: 12.7, lon: 15.9,
      kortti: 'Rabih az-Zubayr rakensi kymmenessä vuodessa neljänsadan miehen joukosta '
        + 'viidentuhannen armeijan ja valtasi Kanem-Bornun. Ranska julisti hänet '
        + 'laittomaksi hallitsijaksi. Taistelun jälkeen hänen päänsä nostettiin seipääseen '
        + 'ja kallo lähetettiin Pariisiin.',
      teksti: 'Rabih az-Zubayr syntyi noin 1840 Halfaya al-Mulukissa, myöhemmin Khartumin '
        + 'esikaupungissa, ja aloitti sotilaana Egyptin armeijassa. Kun hänen '
        + 'komentajansa joukot lyötiin Bahr el Ghazalissa, Rabih vei pienen osastonsa '
        + 'länteen. Noin kymmenessä vuodessa neljänsadan miehen joukko kasvoi '
        + 'viidentuhannen armeijaksi, ja vuosina 1892–1894 hän valloitti Kanem-Bornun '
        + 'valtakunnan ja muutti sen sotilasdiktatuuriksi. Verotus oli tehokasta mutta '
        + 'ankaraa, ja Bornun perinteisesti vauras maatalous kärsi niin pahoin, että '
        + 'ruoantuotanto putosi vaarallisen alas.'
        + '\n\nBritannia tunnusti Rabihin Bornun sulttaaniksi. Ranska teki päinvastoin: se '
        + 'julisti hänen valtansa laittomaksi, jotta valloitukset voitiin perustella, ja '
        + 'nosti ranskalaisessa julkisuudessa esiin hänen valtakuntansa orjatalouden. '
        + 'Vuosina 1899–1900 Ranska lähetti alueelle useita retkikuntia.'
        + '\n\n22. huhtikuuta 1900 Amédée-François Lamyn johtama ranskalais-bornulainen '
        + 'joukko hyökkäsi Rabihin varustukseen Lakhtassa, kolmen mailin päässä '
        + 'Kousserista. Lamy haavoittui kuolettavasti, mutta Rabihin joukot lyötiin '
        + 'muutamassa tunnissa, ja pakoon yrittänyt Rabih ammuttiin.'
        + '\n\nSurmaaja katkaisi Rabihin pään todisteeksi. Pää vietiin seipäässä Kousseriin '
        + 'ja asetettiin muurille näytteille; kallo säilytettiin sotasaaliina laatikossa '
        + 'ja lähetettiin loppuvuodesta 1900 Pariisiin antropologiseksi näytteeksi. Se '
        + 'päätyi Musée de l\'Hommen kokoelmiin, joissa sen uskotaan yhä olevan. Rabihin '
        + 'poika Fadlallah pyysi isänsä jäännöksiä takaisin samana vuonna — turhaan.',
      lahde: 'en-Wikipedia "Rabih az-Zubayr", johdanto-osa sekä osiot "War with France" ja '
        + '"Legacy" ("Remains"). Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Minne Rabihin kallo vietiin taistelun jälkeen?',
        vaihtoehdot: [
          'Se haudattiin Kousseriin',
          'Se lähetettiin Pariisiin näytteeksi',
          'Se palautettiin hänen pojalleen',
        ],
        oikea: 1,
      },
    },
    /*
     * Toumaïn reisiluu: löytö 2001, unohdus laatikkoon, riita
     * julkaisemisesta ja vasta 2020 ja 2022 ilmestyneet artikkelit.
     * Merkki on Djurabin aavikon koordinaatilla (17 / 18), koska
     * artikkeli ei anna Toros-Menallan kaivauspaikalle omaa
     * koordinaattia — vain sen, että paikka on Pohjois-Tšadin
     * Djurabissa.
     * Lähde: en.wikipedia.org: Sahelanthropus; Djurab Desert
     */
    {
      id: 'toumain-reisiluu',
      otsikko: 'Reisiluu, joka nukkui laatikossa eläinluiden seassa',
      nimio: 'Toumaï',
      vuosi: '2001–2022',
      paikka: 'Toros-Menalla, Djurabin aavikko',
      lat: 18.0, lon: 17.0,
      kortti: 'Kallo julistettiin ihmiskunnan varhaisimmaksi esi-isäksi, joka käveli '
        + 'kahdella jalalla. Samasta kaivauksesta oli tullut reisiluu, mutta se pakattiin '
        + 'eläinluiden joukkoon ja unohtui laatikkoon Ranskaan. Kun jatko-opiskelija löysi '
        + 'sen, alkoi riita.',
      teksti: 'Neljä Tšadin kansallisen tutkimuskeskuksen työntekijää — kolme tšadilaista '
        + 'ja yksi ranskalainen — keräsi 19. heinäkuuta 2001 Djurabin aavikon '
        + 'Toros-Menallan kaivauspaikalta luita, joista tuli maailmankuulut. Michel '
        + 'Brunet työtovereineen kuvasi löydön 2002 uutena sukuna ja lajina, '
        + 'Sahelanthropus tchadensis. Tšadin presidentti antoi kallolle lempinimen '
        + 'Toumaï, joka merkitsee paikallisella dazan kielellä "elämän toivoa".'
        + '\n\nBrunet ilmoitti löydöstä N\'Djamenassa ulkoministeriön ja televisioyleisön '
        + 'edessä: "Ihmiskunnan esi-isä on tšadilainen." Tutkimusryhmä sanoi nimenomaan, '
        + 'ettei kallon yhteydestä ollut löytynyt yhtään raajanluuta — juuri sellainen '
        + 'luu olisi voinut todistaa tai kumota heidän päätelmänsä kaksijalkaisuudesta.'
        + '\n\nToumaïn kanssa oli kuitenkin löytynyt reisiluu. Se pakattiin eläinluiden '
        + 'joukkoon ja lähetettiin 2003 Poitiersin yliopistoon, jossa jatko-opiskelija '
        + 'Aude Bergeret löysi sen sattumalta seuraavana vuonna. Geotieteiden laitoksen '
        + 'johtaja Roberto Macchiarelli piti luuta ristiriitaisena kaksijalkaisuuden '
        + 'kanssa. Kun Brunet kieltäytyi kommentoimasta, Bergeret ja Macchiarelli '
        + 'pyysivät saada esitellä alustavat tuloksensa Pariisin antropologisen seuran '
        + 'kokouksessa — pyyntö hylättiin, koska tuloksia ei ollut vielä julkaistu.'
        + '\n\nKaksikko sai täyden kuvauksen julki vasta 2020 ja päätyi siihen, ettei '
        + 'Sahelanthropus ollut kaksijalkainen. Vuonna 2022 Franck Guy työtovereineen '
        + 'julkaisi oman tutkimuksensa samasta reisiluusta ja kahdesta kyynärluusta ja '
        + 'päätyi päinvastaiseen tulokseen. Kiista jatkuu.',
      lahde: 'en-Wikipedia "Sahelanthropus", osio "Taxonomy" ("Discovery"), ja '
        + '"Djurab Desert", tietolaatikon koordinaatti. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Missä Toumaïn reisiluu oli vuosikausia?',
        vaihtoehdot: [
          'Museon näyttelyssä Tšadissa',
          'Laatikossa eläinluiden joukossa',
          'Kadoksissa aavikolla',
        ],
        oikea: 1,
      },
    },
  ],
  LBY: [
    /*
     * Italian hyökkäys Libyaan 1911; merkki Tobrukissa, joka
     * vallattiin lokakuussa 1911.
     * Lähde: en.wikipedia.org: Italo-Turkish War
     */
    {
      id: 'tobruk-1911',
      otsikko: 'Sota, jossa pudotettiin maailman ensimmäinen lentopommi',
      nimio: 'Tobruk 1911',
      vuosi: '1911–1912',
      paikka: 'Tobruk, Kyrenaika',
      lat: 32.0833, lon: 23.9667,
      kortti: 'Italia hyökkäsi osmanien Tripolitaniaan syyskuussa 1911 ja valloitti '
        + 'rannikkokaupungit kolmessa viikossa. Sodassa nähtiin ensimmäistä kertaa '
        + 'lentokone tiedustelussa ja pommituksessa — ja ensimmäistä kertaa myös '
        + 'lentokone alas ammuttuna.',
      teksti: 'Italian ja osmanien sota käytiin 29. syyskuuta 1911 – 18. lokakuuta 1912. '
        + 'Italia valtasi osmanien Tripolitanian rannikkoalueet, joiden pääosat olivat '
        + 'Fezzan, Kyrenaika ja Tripoli itse, ja niistä tuli Italian siirtomaat, jotka '
        + 'myöhemmin yhdistyivät Italian Libyaksi. Italialaiset arvioivat, että 20 000 '
        + 'miehen joukko riittäisi maan valtaamiseen, ja se valtasikin Tripolin, '
        + 'Tobrukin, Dernan, Bengasin ja Homsin 3.–21. lokakuuta 1911.'
        + '\n\nHelppo alku ei jatkunut. Shar al-Shattissa italialaiset kärsivät tappion, '
        + 'jossa kaatui ainakin 21 upseeria ja 482 sotilasta, ja kostoksi he teloittivat '
        + 'ampumalla ja hirttämällä 400 naista ja 4 000 miestä. Joukot kasvatettiin '
        + 'sadaksituhanneksi mieheksi, ja sota jähmettyi asemasodaksi.'
        + '\n\nSota jäi historiaan tekniikastaan. 23. lokakuuta 1911 kapteeni Carlo Piazza '
        + 'lensi maailman ensimmäisen ilmatiedustelulennon vihollislinjojen yli, ja '
        + '1. marraskuuta luutnantti Giulio Gavotti pudotti Etrich Taube -koneesta neljä '
        + 'kranaattia Tajuraan ja Ain Zaraan — historian ensimmäinen ilmapommitus. '
        + 'Turkkilaiset puolestaan olivat ensimmäiset, jotka ampuivat lentokoneen alas, '
        + 'kivääreillä. Guglielmo Marconi tuli itse Libyaan tekemään kokeita Italian '
        + 'pioneerijoukkojen kanssa langattomalla lennättimellä.'
        + '\n\nOuchyn rauhassa 1912 Libya jäi Italialle. Sotaa pidetään ensimmäisen '
        + 'maailmansodan esinäytöksenä: Balkanin liiton jäsenet näkivät, miten helposti '
        + 'osmanit hävisivät, ja hyökkäsivät lokakuussa 1912 — ensimmäinen Balkanin sota '
        + 'alkoi muutamaa päivää ennen kuin Libyan sota päättyi.',
      lahde: 'en-Wikipedia "Italo-Turkish War", johdanto-osa sekä osio "Military campaign" '
        + '("Italian troops landing in Libya", "Trench phase"). Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä nähtiin sodassa ensimmäistä kertaa historiassa?',
        vaihtoehdot: [
          'Lentokoneesta pudotettu pommi',
          'Sukellusvene taistelussa',
          'Panssarivaunu aavikolla',
        ],
        oikea: 0,
      },
    },
    /*
     * Omar al-Mukhtarin vangitseminen ja teloitus Soluchin
     * keskitysleirissä 1931.
     * Lähde: en.wikipedia.org: Omar al-Mukhtar
     */
    {
      id: 'soluch-1931',
      otsikko: 'Opettaja, joka piti aavikkoa hallussaan kaksikymmentä vuotta',
      nimio: 'Soluch 1931',
      vuosi: '1911–1931',
      paikka: 'Soluchin leiri, Kyrenaika',
      lat: 31.6667, lon: 20.25,
      kortti: 'Omar al-Mukhtar oli koraaninopettaja, josta tuli Kyrenaikan vastarinnan '
        + 'johtaja. Hän piti italialaisia loitolla lähes kaksikymmentä vuotta. Haavoituttuaan '
        + 'taistelussa hänet vangittiin ja hirtettiin 73-vuotiaana leirissä, kannattajiensa '
        + 'nähden.',
      teksti: 'Omar al-Mukhtar syntyi 1858 Zanzurin kylässä lähellä Tobrukia osmanien '
        + 'Kyrenaikassa. Hän menetti isänsä lapsena ja vietti nuoruutensa köyhyydessä, '
        + 'mutta sai koulutuksensa ensin kylän moskeijassa ja sitten kahdeksan vuotta '
        + 'senussi-veljeskunnan yliopistossa Jaghbubissa. Hänestä tuli tunnettu Koraanin '
        + 'tuntija ja imaami, joka kutsuttiin ratkomaan heimojen välisiä riitoja.'
        + '\n\nVuonna 1895 senussien johtaja matkusti hänen kanssaan etelään Kufraan ja '
        + 'edelleen Tšadiin, jossa Mukhtar nimitettiin Zawiyat Ayn Kalkin sheikiksi. Kun '
        + 'Ranska eteni Tšadiin 1899, hänet lähetettiin puolustamaan aluetta. Vuonna 1902 '
        + 'hänet kutsuttiin takaisin pohjoiseen ja nimitettiin Pohjois-Kyrenaikan '
        + 'levottoman Zawiyat Laqsurin sheikiksi.'
        + '\n\nVuodesta 1911 Mukhtar järjesti ja johti Libyan vastarintaa Italian '
        + 'siirtomaavaltaa vastaan ensimmäisessä ja toisessa italialais-senussilaisessa '
        + 'sodassa. Häntä kutsuttiin aavikon leijonaksi. Lähes kaksikymmentä vuotta '
        + 'kestänyt taistelu päättyi 11. syyskuuta 1931, kun hän haavoittui Slontan '
        + 'lähellä ja joutui vangiksi.'
        + '\n\nItalialainen tuomioistuin määräsi hänet kuolemaan siinä toivossa, että '
        + 'vastarinta kuolisi hänen mukanaan. Mukhtar hirtettiin 16. syyskuuta 1931 '
        + 'Soluchin keskitysleirissä kannattajiensa nähden 73-vuotiaana. Hänen kuvansa on '
        + 'ollut Libyan kymmenen dinaarin setelissä vuodesta 1971, ja hänen viimeisistä '
        + 'vuosistaan tehtiin vuonna 1981 elokuva Aavikon leijona.',
      lahde: 'en-Wikipedia "Omar al-Mukhtar", johdanto-osa sekä osiot "Early life", '
        + '"Capture and execution" ja "Legacy". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä oli Omar al-Mukhtarin ammatti ennen vastarintaa?',
        vaihtoehdot: [
          'Kauppias',
          'Koraaninopettaja ja imaami',
          'Osmanien upseeri',
        ],
        oikea: 1,
      },
    },
  ],
  NGA: [
    /*
     * Beninin retkikunta 1897 ja Beninin pronssien ryöstö.
     * Lähde: en.wikipedia.org: Benin Expedition of 1897
     */
    {
      id: 'beninin-retkikunta',
      otsikko: 'Kaupunki, jonka taide huutokaupattiin retken maksamiseksi',
      nimio: 'Benin 1897',
      vuosi: '1897',
      paikka: 'Benin City, Niger Coast -protektoraatti',
      lat: 6.3333, lon: 5.6222,
      kortti: 'Britannian rangaistusretkikunta valtasi Beninin helmikuussa 1897. '
        + 'Kaupungista vietiin noin 2 500 esinettä, joiden joukossa yli tuhat metallilaattaa '
        + 'ja veistosta. Amiraliteetti huutokauppasi saaliin kattaakseen retken kulut.',
      teksti: 'Beninin kuningaskunta oli säilyttänyt itsenäisyytensä Afrikan jaossa, ja '
        + 'kuningas eli oba hallitsi alueensa kauppaa yksinoikeudella — mitä Royal Niger '
        + 'Company piti uhkana. Vuonna 1892 varakonsuli Henry Gallwey sai obalta '
        + 'allekirjoituksen vapaakauppasopimukseen, jota oba ei ollut halunnut '
        + 'allekirjoittaa. Kun oba silti vaati tullimaksuja, britit tulkitsivat sen '
        + 'sopimusrikkomukseksi ja vihamieliseksi teoksi.'
        + '\n\nJoulukuun lopulla 1896 James Phillipsin johtama 250 hengen seurue lähti '
        + 'Benin Cityyn keskustelemaan kauppasuhteista, mutta Phillips ei odottanut obalta '
        + 'lupaa ennen rajan ylitystä. Beninin joukot hyökkäsivät seurueen kimppuun '
        + '4. tammikuuta, ja lähes kaikki surmattiin tai vangittiin.'
        + '\n\nBritannia hyökkäsi 9. helmikuuta 1 200 miehellä Harry Rawsonin johdolla ja '
        + 'valtasi Benin Cityn vähäisin omin tappioin; beniniläisten kaatuneiden määrä ei '
        + 'ole tiedossa. Tammikuussa vangitut afrikkalaiset kantajat vapautettiin. Talot, '
        + 'pyhäköt ja päälliköiden palatsit ryöstettiin ja poltettiin, myös obanpalatsi '
        + '21. helmikuuta. Oba vietiin maanpakoon Calabariin.'
        + '\n\nSaaliista lähetettiin Britanniaan virallisten lukujen mukaan noin 2 500 '
        + 'esinettä, muun muassa yli tuhat metallilaattaa ja veistosta, jotka tunnetaan '
        + 'Beninin pronsseina. Noin 40 prosenttia päätyi British Museumiin, osa jaettiin '
        + 'sotilaille ja loput amiraliteetti huutokauppasi jo toukokuussa 1897 retken '
        + 'kulujen kattamiseksi; ostajina olivat enimmäkseen museot, etenkin Saksassa. '
        + 'Esineiden palauttamisesta käydään yhä keskustelua.',
      lahde: 'en-Wikipedia "Benin Expedition of 1897", johdanto-osa sekä osiot '
        + '"Background" ja "Aftermath". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi amiraliteetti huutokauppasi Beninin esineitä?',
        vaihtoehdot: [
          'Kattaakseen retkikunnan kulut',
          'Palauttaakseen ne Beniniin',
          'Rahoittaakseen museon rakentamisen',
        ],
        oikea: 0,
      },
    },
    /*
     * Jaja of Opobon vangitseminen neuvottelujen varjolla 1887.
     * Lähde: en.wikipedia.org: Jaja of Opobo
     */
    {
      id: 'jaja-opobo',
      otsikko: 'Kuningas, joka kutsuttiin neuvotteluun ja vietiin laivaan',
      nimio: 'Jaja',
      vuosi: '1887',
      paikka: 'Opobo, Nigerin suisto',
      lat: 4.5114, lon: 7.54,
      kortti: 'Jaja myytiin lapsena orjaksi, osti itsensä vapaaksi ja perusti oman '
        + 'kuningaskuntansa. Vuonna 1870 hän myi kahdeksantuhatta tonnia palmuöljyä '
        + 'suoraan briteille. Kun hän kieltäytyi lopettamasta brittikauppiaiden '
        + 'verottamista, hänet kutsuttiin neuvotteluun.',
      teksti: 'Jubo Jubogha eli kuningas Jaja syntyi noin 1821 igbomaassa. Lapsena hänet '
        + 'siepattiin ja myytiin orjaksi ja vietiin Bonnyyn. Palveltuaan isäntäänsä '
        + 'useita vuosia hän osti itsensä vapaaksi, otti isäntänsä kuoltua kaupan '
        + 'haltuunsa ja nousi Anna Pepple -kauppahuoneen johtoon.'
        + '\n\nSisäinen valtataistelu Bonnyssa pakotti Jajan irtautumaan, ja vuonna 1869 '
        + 'hän perusti Opobon kuningaskunnan 26 mailia Bonnysta itään. Opobosta tuli '
        + 'seudun merkittävä palmuöljyn kauppapaikka. Jaja sulki sekä eurooppalaiset että '
        + 'afrikkalaiset välikädet pois ja hallitsi käytännössä yksin: vuonna 1870 hän '
        + 'myi kahdeksantuhatta tonnia palmuöljyä suoraan briteille ja laivasi öljyä '
        + 'suoraan Liverpooliin.'
        + '\n\nJaja lähetti lapsensa kouluun Glasgow’hun ja palkkasi eurooppalaisia '
        + 'opettajia rakennuttamaansa maalliseen kouluun Opobossa. Lähetyssaarnaajilta hän '
        + 'kielsi pääsyn kaupunkiin kokonaan.'
        + '\n\nBerliinin konferenssi 1884 määritteli Opobon brittialueeksi. Kun Jaja ei '
        + 'suostunut lopettamaan brittikauppiaiden verottamista, varakonsuli Henry '
        + 'Hamilton Johnston kutsui hänet neuvotteluihin 1887. Saapuessaan Jaja '
        + 'siepattiin brittialukselle, tuomittiin Accrassa Kultarannikolla ja karkotettiin '
        + 'ensin Lontooseen ja sitten Länsi-Intiaan. Vuonna 1891 hän sai luvan palata '
        + 'Opoboon mutta kuoli matkalla, ja Opobon valta hiipui nopeasti. Vuonna 1903 '
        + 'kaupungin keskustaan pystytettiin hänen muistomerkkinsä.',
      lahde: 'en-Wikipedia "Jaja of Opobo", johdanto-osa ja osio "Life and career". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten Jaja joutui karkotetuksi?',
        vaihtoehdot: [
          'Hän hävisi meritaistelun',
          'Hänet siepattiin neuvottelukutsun varjolla',
          'Hän luopui vallasta vapaaehtoisesti',
        ],
        oikea: 1,
      },
    },
  ],
  SOM: [
    /*
     * Vuosien 1884–1886 sopimukset ja Britannian Somalimaa. Merkki on
     * Adeninlahdella Berberan edustalla (45,3 / 11,6), koska saman
     * erän Laas Geel ja Dhambalin täyttävät rannikon nimiöt.
     * Lähde: en.wikipedia.org: Berbera
     */
    {
      id: 'berberan-sopimukset',
      otsikko: 'Protektoraatti, jota sen perustaja neuvoi hylkäämään',
      nimio: 'Berbera 1884',
      vuosi: '1884–1886',
      paikka: 'Berbera, Adeninlahden rannikko',
      lat: 11.6, lon: 45.3,
      kortti: 'Berbera oli 1800-luvulla Somalian niemimaan tärkein satama ja vuonna 1856 '
        + '"maailman vapain satama". Sopimussarja 1884–1886 teki rannikosta Britannian '
        + 'protektoraatin — jota Winston Churchill kehotti vuonna 1907 hylkäämään.',
      teksti: 'Berbera oli 1700- ja 1800-luvuilla Somalian niemimaan tärkein satama. '
        + 'Vuosittainen markkina, joka kesti lokakuusta huhtikuuhun, oli Mordechai Abirin '
        + 'mukaan "Itä-Afrikan itärannikon merkittävimpiä kaupallisia tapahtumia": paikalle '
        + 'kokoontuivat Isaaqin alaklaanit, karavaanit Hararista ja sisämaasta sekä '
        + 'banjaanikauppiaat Porbandarista, Mangaloresta ja Mumbaista. Kaupankäynnin '
        + 'yksityiskohdat pidettiin salassa eurooppalaisilta kauppiailta.'
        + '\n\nVuoden 1833 kauppakaudella satamakaupunki paisui 70 000 hengen kokoiseksi, '
        + 'ja yhtenä päivänä sisämaasta saapui yli kuusituhatta tavaralla lastattua '
        + 'kamelia. Vietäviä olivat karja, kahvi, suitsuke, mirha, akasiakumi, sahrami, '
        + 'höyhenet, vaha, voisula, vuodat, kulta ja norsunluu. Vuonna 1856 ilmestynyt '
        + 'kauppalehti kutsui Berberaa "maailman vapaimmaksi satamaksi ja koko lahden '
        + 'tärkeimmäksi kauppapaikaksi".'
        + '\n\nVuosina 1884–1886 britit tekivät peräkkäisiä sopimuksia pohjoisen '
        + 'somalirannikon klaanien kanssa ja perustivat alueelle protektoraatin, '
        + 'Britannian Somalimaan. Sitä miehitettiin Adenista ja hallittiin Brittiläisestä '
        + 'Intiasta käsin vuoteen 1898, sitten ulkoministeriöstä ja vuodesta 1905 '
        + 'siirtomaaministeriöstä.'
        + '\n\nBerbera oli Adeninlahden eteläpuolen ainoa suojaisa satama, mutta britit '
        + 'katuivat pian hallintaansa. Siirtomaaministeriön alivaltiosihteeri Winston '
        + 'Churchill kävi Berberassa vuonna 1907 ja esitti koko protektoraatin '
        + 'hylkäämistä. Hallinto ei ulottanut infrastruktuuria rannikon ulkopuolelle, ja '
        + 'suunniteltu Berbera–Harar-rautatie kaatui parlamentissa, koska sen pelättiin '
        + 'haittaavan Ranskan ja Britannian sopua.',
      lahde: 'en-Wikipedia "Berbera", osiot "Precolonialism" ja "British Somaliland". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä Churchill esitti Berberan-käyntinsä jälkeen 1907?',
        vaihtoehdot: [
          'Protektoraatin hylkäämistä',
          'Sataman laajentamista',
          'Rautatien rakentamista Hararista',
        ],
        oikea: 0,
      },
    },
    /*
     * Illigin sopimus 1905 ja dervissiliikkeen kaksi vuosikymmentä.
     * Merkki on Illigissä eli nykyisessä Eylissä.
     * Lähde: en.wikipedia.org: Dervish movement (Somali)
     */
    {
      id: 'illigin-sopimus',
      otsikko: 'Sopimus, joka antoi kapinaliikkeelle oman laakson',
      nimio: 'Illig 1905',
      vuosi: '1899–1920',
      paikka: 'Illig (Eyl), Nugaalin laakso',
      lat: 7.9667, lon: 49.85,
      kortti: 'Britannia aseisti kilpailevat klaanit dervissiliikettä vastaan. Kun '
        + 'rangaistusretket eivät riittäneet, Italia teki liikkeen johtajan kanssa '
        + 'sopimuksen, joka luovutti sille Nugaalin laakson — ja vahvisti sitä '
        + 'entisestään.',
      teksti: 'Dervissiliike oli aseellinen vastarintaliike ja valtio, jonka päämaja oli '
        + 'Talehissa vuosina 1895–1920. Sitä johti runoilija ja uskonnollinen johtaja '
        + 'Mohammed Abdullah Hassan, joka vaati itsenäisyyttä brittiläisistä ja '
        + 'italialaisista siirtomaaisännistä. Hassan perusti Khususi-nimisen hallitsevan '
        + 'neuvoston, johon kuului sufilaisia heimovanhimpia, ja otti mukaan osmanien '
        + 'lähettämän neuvonantajan.'
        + '\n\nVuosina 1899–1905 liike keräsi noin 25 000 nuorta eri klaaneista, hankki '
        + 'tuliaseita ja hyökkäsi Jigjigan etiopialaisvaruskuntaan. Britannian '
        + 'siirtomaahallinto julistettiin viholliseksi, ja britit etsivät liittolaisia '
        + 'kilpailevista somaliklaaneista ja antoivat näille aseita ja varusteita. '
        + 'Rangaistusretket dervissien tukikohtiin alkoivat 1904.'
        + '\n\nDervissit kärsivät tappioita, hajaantuivat pienempiin osastoihin ja '
        + 'siirtyivät sissisotaan. Vuonna 1905 Hassan allekirjoitti Illigin sopimuksen ja '
        + 'siirtyi kannattajineen Italian hallitsemalle alueelle: sopimuksessa '
        + 'dervisseille luovutettiin Nugaalin laakso, ja Hassan sai italialaisen '
        + 'avustuksen ja suojatun itsehallinnollisen aseman. Se vahvisti liikettä.'
        + '\n\nVuodesta 1908 dervissit palasivat Britannian Somalimaahan, ja britit '
        + 'vetäytyivät sisämaasta rannikolle. Ensimmäisen maailmansodan aikana osmanit ja '
        + 'saksalaiset tunnustivat liikkeen liittolaisekseen. Vuonna 1920 Britannia '
        + 'hyökkäsi Talehin linnoituksiin yhdistetyllä maa- ja ilmavoimien iskulla; Hassan '
        + 'pääsi pakoon mutta kuoli 1921 malariaan tai influenssaan, ja liike hajosi. Se '
        + 'oli siirtomaa-ajan pitkäkestoisimpia ja verisimpiä liikkeitä '
        + 'Saharan eteläpuolisessa Afrikassa.',
      lahde: 'en-Wikipedia "Dervish movement (Somali)", johdanto-osa. '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä Illigin sopimus 1905 antoi dervisseille?',
        vaihtoehdot: [
          'Nugaalin laakson hallinnan',
          'Berberan sataman',
          'Aseita Britannialta',
        ],
        oikea: 0,
      },
    },
  ],
  /* ══ ERÄ M16 6.9.2026: TUNISIA, SYYRIA, JEMEN, SAINT HELENA ══════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M16 tuo kaksi skandaalia kuhunkin neljään maahan — kahdeksan
   * uutta. Kaikki ovat kuvattomia, ja jokaisen lähderivi nimeää
   * en-Wikipedian artikkelin ja osan sekä tarkistuspäivän 6.9.2026.
   *
   * AIHEET OVAT 1800- JA 1900-LUVUN HISTORIAA. Syyriassa ja Jemenissä
   * tämä on sitova rajaus (docs/aasia-tyoaineisto/spec-asia.md ja M3:n
   * Myanmar-linja): käynnissä olevaa selkkausta ei kerrota, vaan
   * kortit ovat siirtomaa-ajan ja arkeologian tapauksia.
   *
   * PAIKAT ON MITATTU. Yksikään merkki ei ole pelikaupungin kohdalla
   * (KAUPUNGIN_KOHDALLA_SADE 7 lautayksikköä, js/fokuskohteet.js):
   * lähin on Bardon sopimus 63,2 lautayksikön päässä Karthagosta.
   * Saint Helenan kaksi merkkiä ovat saaren oikealla paikalla, ja
   * laudan St. Helena -kaupunki on tyylitellysti 82 yksikön päässä
   * koillisessa.
   *
   * TELL HALAF JA DURA-EUROPOS OVAT SKANDAALEJA EIVÄTKÄ KOHTEITA.
   * Kummankin tarina on kaivauksen ja löytöjen tarina, ei paikan
   * oman historian; kohteina ne olisivat myös kaksi merkkiä lisää
   * samaan Eufratin mutkaan (js/packs/maastokohteet-syr.js Mari).
   *
   * LONGWOOD HOUSE ON SKANDAALI, KOSKA SAARELLE EI MAHDU ENEMPÄÄ
   * MERKKEJÄ. Perustelu on maastokohteet-shn.js:n otsikkokommentissa:
   * Saint Helena mahtuu neljän lautayksikön ruutuun, ja viisi kohdetta
   * plus nämä kaksi skandaalia on suurin joukko, jolla nimiöt eivät
   * mene päällekkäin.
   * ══════════════════════════════════════════════════════════════════ */
  TUN: [
    /*
     * Ksar Saïdin palatsi Le Bardossa Tunisin laidalla.
     * Lähde: en.wikipedia.org: Treaty of Bardo
     */
    {
      id: 'bardon-sopimus',
      otsikko: 'Rajaretki, joka maksoi maan itsenäisyyden',
      nimio: 'Bardon sopimus',
      vuosi: '1881',
      paikka: 'Ksar Saïdin palatsi, Le Bardo',
      lat: 36.80944, lon: 10.13444,
      kortti: 'Tunisian bey oli velkaantunut eurooppalaisille pankeille, ja Ranska tarvitsi '
        + 'tekosyyn. Sen antoi rajaseudun heimon retki Algerian puolelle keväällä 1881. '
        + 'Kolmekymmentäkuusituhatta miestä marssi maahan, ja toukokuussa beyn palatsissa '
        + 'allekirjoitettiin sopimus, joka teki Tunisiasta Ranskan protektoraatin.',
      teksti: 'Bardon sopimus eli Ksar Saïdin sopimus perusti Ranskan protektoraatin '
        + 'Tunisiaan, ja järjestely kesti toiseen maailmansotaan asti. Sopimus '
        + 'allekirjoitettiin 12. toukokuuta 1881 Ranskan edustajien ja Tunisian beyn '
        + 'Muhammed as-Sadiqin välillä, ja se asetti maan ranskalaisen '
        + 'yleisresidentin valvontaan.'
        + '\n\nNimi tulee hovin asuinpaikasta: Ksar Saïdin palatsista Le Bardossa, jonne '
        + 'husainidien beyt olivat asettuneet 1700-luvun alussa. Sopimuksen sanamuoto puhui '
        + 'järjestyksen palauttamisesta ja beyn suojelemisesta sisäistä vastarintaa vastaan, '
        + 'ja sillä perusteella Ranska sai hallita tiettyjä alueita ja vastata Tunisian '
        + 'ulkopolitiikasta.'
        + '\n\nTaustalla oli tunisialaisen khroumir-heimon huhtikuinen retki Algerian '
        + 'puolelle, joka kelpasi tekosyyksi hyökkäykselle. Ulkoministeri Jules Ferry sai '
        + 'lähetettyä noin 36 000 miehen retkikunnan, eikä vastarintaa juuri ollut sen '
        + 'paremmin heimon kuin beynkään puolelta. Sopimuksen jälkeen joukot vedettiin pois '
        + 'ja miehityksen sanottiin olleen väliaikainen.'
        + '\n\nLoppu tuli kahdessa vaiheessa. La Marsan sopimukset 8. kesäkuuta 1883 antoivat '
        + 'Ranskalle oikeuden puuttua myös Tunisian sisäisiin asioihin, ja yleisresidentin '
        + 'vallan alla maa menetti käytännössä itsemääräämisoikeutensa sekä ulko- että '
        + 'sisäasioissa.',
      lahde: 'en-Wikipedia "Treaty of Bardo", johdanto sekä osiot "Name" ja "Background". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä toimi tekosyynä Ranskan hyökkäykselle?',
        vaihtoehdot: [
          'Beyn kieltäytyminen maksamasta velkojaan',
          'Heimoretki Algerian puolelle',
          'Ranskalaisen konsulin murha',
        ],
        oikea: 1,
      },
    },
    /*
     * Chott el Djerid, Tunisian suurin suola-allas.
     * Lähde: en.wikipedia.org: Sahara Sea
     */
    {
      id: 'saharan-meri',
      otsikko: 'Meri, jota ei koskaan tullut',
      nimio: 'Saharan meri',
      vuosi: '1877–1882',
      paikka: 'Chott el Djerid, Etelä-Tunisia',
      lat: 33.7, lon: 8.43,
      kortti: 'Suezin kanavan mies uskoi, että Saharaan voisi laskea meren. Suunnitelma oli '
        + 'kaivaa kanava Gabèsinlahdelta Tunisian suola-altaille ja päästää Välimeri sisään. '
        + 'Sisämeren piti tuoda sadetta autiomaahan ja parantaa säätä Euroopassa asti.',
      teksti: 'Saharan meri oli nimitys hankkeelle, jossa Saharan merenpinnan alapuolelle '
        + 'jäävät sisäaltaat olisi täytetty Atlantin tai Välimeren vedellä. Tavoitteena oli '
        + 'sisämeri, joka toisi kosteaa ilmaa, sadetta ja maanviljelystä syvälle '
        + 'autiomaahan. Ajatus nousi esiin useaan otteeseen 1800-luvun lopulla ja 1900-luvun '
        + 'alussa, ja sitä pohdittiin Marokon, Algerian, Tunisian ja Egyptin osalta.'
        + '\n\nEnsimmäisenä ehdotuksen teki vuonna 1877 skotlantilainen yrittäjä ja '
        + 'orjuudenvastustaja Donald Mackenzie, joka aikoi kaivaa kanavan Juby-niemen '
        + 'pohjoispuolisilta laguuneilta El Djoufin tasangolle. Hän uskoi tasangon olevan '
        + 'jopa 61 metriä merenpinnan alapuolella — eikä ollut koskaan käynyt alueella.'
        + '\n\nRanskalainen maantieteilijä François Élie Roudaire ja Suezin kanavasta tunnettu '
        + 'diplomaatti Ferdinand de Lesseps esittivät 1878 samaa Tunisiaan: kanava '
        + 'Gabèsinlahdelta Chott el Fejejiin päästäisi meren valumaan altaisiin. Hinnaksi '
        + 'arvioitiin 30 miljoonaa dollaria. Kaikki eivät innostuneet; Alexander William '
        + 'Mitchinson varoitti, että laajojen alueiden tulvittaminen loisi tautien vaivaamia '
        + 'soita.'
        + '\n\nRanskan hallitus hylkäsi hankkeen ja lopetti rahoituksen, kun maastomittaukset '
        + 'osoittivat, ettei suuri osa alueista ollutkaan merenpinnan alapuolella. Ajatus jäi '
        + 'silti elämään kirjallisuudessa: Jules Vernen viimeinen romaani viittaa suoraan '
        + 'Roudairen ja de Lessepsin suunnitelmaan.',
      lahde: 'en-Wikipedia "Sahara Sea", johdanto sekä osiot "19th century" ja "Appearances '
        + 'in literature". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi hanke lopulta haudattiin?',
        vaihtoehdot: [
          'Rahoittajat vetäytyivät sodan takia',
          'Tunisian bey kielsi kaivamisen',
          'Mittaukset osoittivat maan olevan merenpinnan yläpuolella',
        ],
        oikea: 2,
      },
    },
  ],
  SYR: [
    /*
     * Tell Halaf Khaburin laaksossa Koillis-Syyriassa.
     * Lähde: en.wikipedia.org: Tell Halaf
     */
    {
      id: 'tell-halafin-veistokset',
      otsikko: 'Kivijumalat, jotka palasivat sirpaleina',
      nimio: 'Tell Halaf',
      vuosi: '1899–1943',
      paikka: 'Tell Halaf, Khaburin laakso',
      lat: 36.8266, lon: 40.0396,
      kortti: 'Saksalainen diplomaatti etsi Bagdadin radalle reittiä, kun kyläläiset kertoivat '
        + 'hänelle hiekkaan haudatuista kivijumalista. Kolmessa päivässä maasta nousi '
        + 'patsaita. Niistä tuli hänen elämäntyönsä ja oma museo Berliiniin — ja marraskuussa '
        + '1943 tuhkaa ja sirpaleita.',
      teksti: 'Marraskuun 19. päivänä 1899 Max von Oppenheim oli matkalla Kairosta '
        + 'Pohjois-Mesopotamian halki Deutsche Bankin toimeksiannosta etsimässä reittiä '
        + 'Bagdadin radalle. Paikallisten kertomukset veivät hänet Tell Halafille, ja '
        + 'kolmessa päivässä kaivettiin esiin useita merkittäviä veistoksia, muun muassa '
        + 'niin kutsuttu istuva jumalatar, sekä läntisen palatsin sisäänkäynti. Kaivauslupaa '
        + 'hänellä ei ollut, joten hän hautasi patsaat takaisin ja jatkoi matkaa.'
        + '\n\nOppenheim erosi diplomaattikunnasta lokakuussa 1910 ja aloitti kaivaukset '
        + '5. elokuuta 1911 viiden arkeologin ryhmällä. Saksasta tuotiin kalustoa pientä '
        + 'höyryveturia myöten, ja noin 750 000 markan kustannukset maksettiin hänen isänsä '
        + 'pankkiiriomaisuudesta. Esiin tulivat kuningas Kaparan läntisen palatsin patsaat ja '
        + 'reliefit sekä uudenlaista maalattua keramiikkaa, jonka mukaan koko Halafin '
        + 'kulttuuri on nimetty.'
        + '\n\nLöydöt jaettiin ranskalaisen mandaattihallinnon kanssa: noin kaksi kolmasosaa '
        + 'vietiin Berliiniin ja 35 kappaletta jäi Aleppon museon kokoelman ytimeksi. '
        + 'Pergamonmuseo ei suostunut Oppenheimin taloudellisiin ehtoihin, joten hän avasi '
        + 'heinäkuussa 1930 oman Tell Halaf -museonsa Berliinin Charlottenburgiin.'
        + '\n\nMarraskuussa 1943 museoon osui fosforipommi. Rakennus paloi kokonaan, puu- ja '
        + 'kalkkikiviesineet tuhoutuivat, ja basalttiveistokset halkesivat sammutusveden '
        + 'lämpöshokissa kymmeniksi kappaleiksi. Sirpaleet makasivat Pergamonmuseon '
        + 'kellareissa vuosikymmeniä, ja vasta vuosina 2001–2010 yli kolmekymmentä veistosta '
        + 'koottiin uudelleen noin 27 000 palasta.',
      lahde: 'en-Wikipedia "Tell Halaf", osiot "Discovery", "Excavations by Max von '
        + 'Oppenheim", "Tell Halaf Museum, Berlin" ja "Reconstruction of the artefacts". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi Oppenheim oli alun perin alueella?',
        vaihtoehdot: [
          'Hän etsi reittiä Bagdadin rautatielle',
          'Hän johti Pergamonmuseon retkikuntaa',
          'Hän oli Osmanivaltakunnan muinaismuistojen tarkastaja',
        ],
        oikea: 0,
      },
    },
    /*
     * Dura-Europoksen rauniokukkula Eufratin yläpuolella.
     * Lähde: en.wikipedia.org: Dura-Europos
     */
    {
      id: 'dura-europoksen-juoksuhauta',
      otsikko: 'Juoksuhauta, joka osui maalaukseen',
      nimio: 'Dura-Europos',
      vuosi: '1920–1937',
      paikka: 'Dura-Europos, Eufrat',
      lat: 34.747, lon: 40.730,
      kortti: 'Ensimmäisen maailmansodan jälkimainingeissa brittijoukot kaivautuivat asemiin '
        + 'Eufratin yläpuoliselle jyrkänteelle. Lapio osui seinään, jonka maalaukset olivat '
        + 'kuin eiliseltä. Kaupunki oli maannut hiekan alla lähes 1 700 vuotta.',
      teksti: 'Dura-Europos oli Seleukos I Nikatorin noin 300 eaa. perustama rajakaupunki '
        + '90 metriä Eufratin yläpuolella olevalla jyrkänteellä. Sasanidit valloittivat sen '
        + 'piirityksen jälkeen vuosina 256–257 jaa., väestö vietiin pois, ja kaupunki peittyi '
        + 'hiekkaan ja mutaan. Koska paikalle ei koskaan rakennettu mitään uutta, sitä on '
        + 'kutsuttu autiomaan Pompejiksi.'
        + '\n\nPaikan tunnisti uudelleen amerikkalainen Wolfe-retkikunta 1885, kun John Henry '
        + 'Haynes valokuvasi Palmyran portin. Sodan ja arabikapinan jälkimainingeissa '
        + 'brittijoukot kapteeni Murphyn johdolla tutkivat raunioita, ja 30. maaliskuuta 1920 '
        + 'juoksuhautaa kaivanut sotilas paljasti Belin temppelistä hehkuvan tuoreet '
        + 'seinämaalaukset. Bagdadissa ollut arkeologi James Henry Breasted hälytettiin '
        + 'paikalle.'
        + '\n\nSuuret kaivaukset tehtiin 1920- ja 1930-luvuilla ranskalais-amerikkalaisin '
        + 'voimin. Franz Cumont julkaisi ensimmäiset tulokset 1922–1923 ja tunnisti paikan '
        + 'Dura-Europokseksi, ja Clark Hopkinsin ja Michael Rostovtzeffin retkikunnat '
        + 'jatkoivat vuoteen 1937, jolloin rahat loppuivat — vain osa kaivauksista ehdittiin '
        + 'julkaista.'
        + '\n\nMerkittävin löytö tehtiin 1932, kun Hopkins kaivoi esiin synagogan läntisen '
        + 'muurin vierestä. Se oli säilynyt siksi, että se oli täytetty maalla kaupungin '
        + 'puolustusta vahvistettaessa vuonna 256. Kokoushuoneen seinillä on ihmisiä ja '
        + 'eläimiä esittävä maalaussarja, laajin antiikista säilynyt, ja löytö oli '
        + 'uskonnonhistoriallinen yllätys. Maalaukset ovat Damaskoksessa.',
      lahde: 'en-Wikipedia "Dura-Europos", johdanto sekä osiot "Overview" (Archaeology) ja '
        + '"Synagogue". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi synagogan maalaukset säilyivät niin hyvin?',
        vaihtoehdot: [
          'Ne oli peitetty rappauksella',
          'Rakennus oli täytetty maalla puolustusta varten',
          'Ne maalattiin uudelleen bysanttilaisaikana',
        ],
        oikea: 1,
      },
    },
  ],
  YEM: [
    /*
     * Perimin eli Mayyunin saari Bab el-Mandebin salmessa.
     * Lähde: en.wikipedia.org: Perim
     */
    {
      id: 'perimin-majakka',
      otsikko: 'Majakka, joka oli oikeasti lippu',
      nimio: 'Perim',
      vuosi: '1857',
      paikka: 'Perimin saari, Bab el-Mandeb',
      lat: 12.66, lon: 43.42,
      kortti: 'Punaisenmeren portilla on paljas saari, jolla ei ole vettä. Kun Britannia kuuli '
        + 'huhun, että ranskalaiset olisivat lähettämässä sinne sotalaivan, se lähetti '
        + 'Adenista maihinnousuosaston — ja ilmoitti rakentavansa majakan.',
      teksti: 'Perim eli arabiaksi Mayyun on jemeniläinen tulivuorisaari Bab el-Mandebin '
        + 'salmessa Punaisenmeren eteläisellä sisäänkäynnillä, ja se jakaa salmen kahdeksi '
        + 'väyläksi. Vaikka saarella on suojaisa luonnonsatama ja ratkaiseva sijainti, '
        + 'kirjoitettu historia ohitti sen 1800-luvun puoliväliin asti: paljaalla ja '
        + 'vedettömällä saarella oli vaikea elää, ja siellä kävivät vain kalastajat ja '
        + 'helmenkalastajat kausittain.'
        + '\n\nVuonna 1856 pääministeri Palmerston piti ranskalaisten tukemaa Suezin kanavaa '
        + 'keinona kasvattaa Ranskan valtaa Britannian kustannuksella ja hyväksyi Perimin '
        + 'miehityksen yhdeksi vastatoimeksi. Bombayn kuvernööri Lord Elphinstone kirjoitti '
        + 'joulukuussa 1856 Adenin residentille, että saari oli määrä ottaa haltuun ja sinne '
        + 'oli rakennettava majakka; koska saari oli otettu Itä-Intian kauppakomppanian nimiin '
        + 'jo 1799, muodollisuuksia ei katsottu tarvittavan.'
        + '\n\nPäätöstä saattoi jouduttaa perätön tieto siitä, että ranskalaiset olisivat '
        + 'lähettäneet Réunionilta fregatin liittämään saaren itselleen. Julkilausuttu syy oli '
        + 'kuitenkin majakka, ja pitkän kiistelyn jälkeen yksitoistametrinen majakka vihittiin '
        + '1. huhtikuuta 1861. Vaarallisilla vesillä hukkui silti yhä laivoja.'
        + '\n\nVuonna 1881 lontoolainen Hinton Spalding sai luvan perustaa saarelle '
        + 'hiiliaseman, ja Perim Coal Company toimitti ensimmäisen lastinsa 29. elokuuta 1883. '
        + 'Perim ja Aden kilpailivat Punaisenmeren hiilikaupasta 1930-luvun puoliväliin asti, '
        + 'ja vuosina 1923–1927 Perimissä lastattiin enemmän hiiltä kuin Adenissa. Öljy '
        + 'syrjäytti hiilen, yhtiö meni konkurssiin 1935, ja saari vaipui takaisin '
        + 'merkityksettömyyteen.',
      lahde: 'en-Wikipedia "Perim", johdanto sekä osiot "History" ja "Perim under British '
        + 'rule". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä oli miehityksen julkilausuttu syy?',
        vaihtoehdot: [
          'Merirosvouden torjunta',
          'Helmenkalastuksen suojelu',
          'Majakan rakentaminen salmeen',
        ],
        oikea: 2,
      },
    },
    /*
     * Mokan satamakaupunki Punaisenmeren rannalla.
     * Lähde: en.wikipedia.org: Mocha, Yemen; History of coffee
     */
    {
      id: 'mokan-kahvipensaat',
      otsikko: 'Pensaat, jotka lähtivät laivaan',
      nimio: 'Mokka',
      vuosi: '1616–1719',
      paikka: 'Mokan satama, Punainenmeri',
      lat: 13.320278, lon: 43.25,
      kortti: 'Yli sadan vuoden ajan lähes kaikki maailman kahvi kulki yhden jemeniläisen '
        + 'sataman kautta, ja elävien pensaiden vienti oli tarkoin vartioitua. Vuonna 1616 '
        + 'hollantilainen kauppias sai muutaman niistä laivaan. Sata vuotta myöhemmin Mokan '
        + 'nimi oli jäljellä enää juoman nimessä.',
      teksti: 'Mokka oli Punaisenmeren rannikon satamakaupunki ja Sanaan pääsatama, kunnes '
        + 'Aden ja al-Hudayda syrjäyttivät sen 1800-luvulla. Kahvi ei kasvanut Mokassa vaan '
        + 'tuotiin sinne kameleilla Jemenin ylängöiltä ja Etiopiasta; sataman kautta se '
        + 'lähetettiin maailmalle, ja 1600-luvun loppuun asti Jemen oli maailman tärkein '
        + 'kahvin tuottaja ja viejä.'
        + '\n\nKilpajuoksun eläviin kahvipuihin voitti hollantilainen kauppias Pieter van den '
        + 'Broecke, joka sai vuonna 1616 haltuunsa tarkoin vartioituja pensaita Mokasta ja '
        + 'vei ne Amsterdamin kasvitieteelliseen puutarhaan. Tapaus sai aikanaan vähän '
        + 'huomiota, mutta se muutti kahvin historian.'
        + '\n\nAmsterdamin kasvihuoneissa pensaat menestyivät. Kaupungin pormestari Nicolaes '
        + 'Witsen kehotti Batavian kuvernööriä Joan van Hoornia hankkimaan taimia Mokasta '
        + 'Alankomaiden Itä-Intiaan, ja ensimmäisen lähetyksen siemenistä kasvatettu istutus '
        + 'onnistui niin hyvin, että Hollannin Itä-Intian komppania pystyi vuonna 1719 '
        + 'tyydyttämään koko Euroopan kysynnän jaavalaisella kahvilla. Pian viljelmiä oli '
        + 'myös Ceylonilla ja Sumatralla.'
        + '\n\nMokan asema mureni. Kaupungin kahvikauppa siirtyi 1800-luvulla brittien '
        + 'hallitsemaan Adeniin, ja Etiopiasta tuotu kahvi myytiin kolmasosalla arabialaisen '
        + 'hinnasta. Nykyään Mokka ei ole enää merkittävä satama ja paikallinen talous elää '
        + 'kalastuksesta, mutta kaupungin nimi jäi elämään mokkakahvissa ja mokkapannussa.',
      lahde: 'en-Wikipedia "Mocha, Yemen", johdanto ja osio "History", sekä "History of '
        + 'coffee", osiot "Spread of coffee cultivation" ja "Dutch". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuka vei ensimmäiset elävät kahvipensaat pois Mokasta?',
        vaihtoehdot: [
          'Hollantilainen kauppias Pieter van den Broecke',
          'Ranskalainen upseeri Gabriel de Clieu',
          'Portugalilainen amiraali Afonso de Albuquerque',
        ],
        oikea: 0,
      },
    },
  ],
  SHN: [
    /*
     * Longwood House Saint Helenan sisäylängöllä.
     * Lähde: en.wikipedia.org: Longwood House; Saint Helena
     */
    {
      id: 'longwoodin-vanki',
      otsikko: 'Talo, joka ei kelvannut kenellekään',
      nimio: 'Longwood House',
      vuosi: '1815–1858',
      paikka: 'Longwood House, Saint Helena',
      lat: -15.95004, lon: -5.68305,
      kortti: 'Britannia valitsi 1815 Euroopan tarkimmin vartioidun vangin asuinpaikaksi '
        + 'entisen maatilan keskellä Atlanttia. Talo oli kostea ja tuulinen, ja kuvernööri '
        + 'kieltäytyi siirtämästä vankia parempaan. Kuusi vuotta myöhemmin vanki kuoli — ja '
        + 'lopulta talon osti Ranska.',
      teksti: 'Vuonna 1815 Britannian hallitus valitsi Saint Helenan Napoleon Bonaparten '
        + 'karkotuspaikaksi Waterloon tappion ja vallasta luopumisen jälkeen. Hänet tuotiin '
        + 'saarelle lokakuussa 1815, ja hän asui Balcombe-perheen pihapaviljongissa The '
        + 'Briarsissa siihen asti, kunnes Longwood House valmistui joulukuussa 1815.'
        + '\n\nLongwood oli alun perin Itä-Intian kauppakomppanian maatila ja sen jälkeen '
        + 'varakuvernöörin maaseutuasunto, ja se muutettiin Napoleonin käyttöön 1815. '
        + 'Britannian hallitus myönsi lopulta, ettei talo kelvannut entiselle keisarille ja '
        + 'hänen seurueelleen, ja rakennutti lähelle uuden talon — jota hän ei koskaan '
        + 'ehtinyt ottaa käyttöön.'
        + '\n\nHelmikuussa 1818 kuvernööri Hudson Lowe ehdotti Lord Bathurstille, että vanki '
        + 'siirrettäisiin vapautuneeseen Rosemary Halliin saaren suojaisemmalle ja '
        + 'varjoisammalle puolelle, niin kuin Napoleon itse toivoi. Kenraali Gourgaud’n '
        + 'Lontoossa tekemät paljastukset saivat Bathurstin kuitenkin pitämään Longwoodia '
        + 'turvallisempana, koska sieltä oli vaikeampi paeta. Uuden talon rakentaminen alkoi '
        + 'vasta lokakuussa 1818, kolme vuotta Napoleonin saapumisen jälkeen. Hän kuoli '
        + 'Longwoodissa 5. toukokuuta 1821.'
        + '\n\nSen jälkeen talo palautui kauppakomppanialle ja edelleen kruunulle, ja sitä '
        + 'käytettiin maatalouteen. Tiedot rappiosta kantautuivat Napoleon III:lle, joka '
        + 'neuvotteli Britannian kanssa vuodesta 1854, ja vuonna 1858 Ranskan valtio osti '
        + 'Longwoodin ja hautalaakson 7 100 punnalla. Ne ovat yhä Ranskan omaisuutta.',
      lahde: 'en-Wikipedia "Longwood House", johdanto sekä osiot "History" ja "After '
        + 'Napoleon\'s death", ja "Saint Helena", osio "British rule (1815–1821) and '
        + 'Napoleon\'s exile". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi Napoleonia ei siirretty parempaan taloon?',
        vaihtoehdot: [
          'Hän kieltäytyi muuttamasta',
          'Longwoodista pakenemista pidettiin vaikeampana',
          'Uusi talo paloi ennen valmistumista',
        ],
        oikea: 1,
      },
    },
    /*
     * Deadwoodin tasanko Longwoodin pohjoispuolella. Koordinaatti on
     * likiarvo: lähde ei anna leirille omaa koordinaattia, ja artikkelin
     * mukaan leireistä ei ole jäljellä jälkeäkään.
     * Lähde: en.wikipedia.org: Saint Helena; High Knoll Fort
     */
    {
      id: 'deadwoodin-leiri',
      otsikko: 'Kuusituhatta vankia keskellä Atlanttia',
      nimio: 'Deadwood',
      vuosi: '1900–1902',
      paikka: 'Deadwoodin tasanko, Saint Helena',
      lat: -15.936, lon: -5.674,
      kortti: 'Kun Suezin kanava vei laivat pohjoiseen, saaren talous kuihtui. Sitten '
        + 'saarelle tuotiin yli kuusituhatta buurisotavankia, ja väkiluku nousi kaikkien '
        + 'aikojen ennätykseen. Kymmenen vuotta myöhemmin väkeä oli enää runsas kolmasosa '
        + 'siitä, eikä leireistä ollut jäljellä mitään.',
      teksti: 'Saint Helenan 1800-luvun vauraus perustui siihen, että purjelaivat Euroopan ja '
        + 'Aasian välillä tarvitsivat välipysähdyksen. Se loppui, kun Suezin kanava siirsi '
        + 'kauppareitit pohjoiseen vuonna 1869: satamassa käyneiden laivojen määrä putosi '
        + '1 100:sta vuonna 1855 vain 288:aan vuonna 1889.'
        + '\n\nVuoden 1899 loppuun mennessä saari oli yhdistetty Lontooseen merenalaisella '
        + 'kaapelilla, ja lennätin toi uutiset perille tunneissa. Vuosina 1900 ja 1901 '
        + 'saarella pidettiin yli 6 000 buurisotavankia toisen buurisodan aikana. Leirit '
        + 'olivat Deadwoodin tasangolla ja Broadbottomissa, ja vankeja pidettiin myös '
        + 'Jamestownissa ja High Knoll Fortissa.'
        + '\n\nTunnetuimpia vankeja olivat kenraali Piet Cronjé ja hänen vaimonsa, jotka '
        + 'joutuivat vangeiksi Paardebergin taistelun jälkeen. Vankien ja heidän '
        + 'vartijoidensa myötä saaren väkiluku nousi kaikkien aikojen huippuunsa, 9 850 '
        + 'henkeen vuonna 1901. Vuonna 2019 julkaistun selvityksen mukaan leireistä ei ole '
        + 'jäljellä jälkeäkään, mutta buurien hautausmaa on yhä koskettava paikka.'
        + '\n\nNousu jäi lyhyeksi. Vuoteen 1911 mennessä asukkaita oli enää 3 520, ja vuonna '
        + '1906 Britannian hallitus veti varuskunnan pois saarelta; sotilaiden kulutuksen '
        + 'loppuminen vei taloudelta pohjan. Tilalle yritettiin uusiseelantilaisesta '
        + 'pellavasta tehtyä kuituteollisuutta, joka elvytettiin 1907 ja tuotti hyvin '
        + 'ensimmäisen maailmansodan aikana.',
      lahde: 'en-Wikipedia "Saint Helena", osio "Crown colony (1834–1981)", ja "High Knoll '
        + 'Fort", artikkelin runko. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä oli saaren väkiluvun ennätys vuonna 1901?',
        vaihtoehdot: [
          'Noin 3 500 henkeä',
          'Noin 6 000 henkeä',
          'Noin 9 850 henkeä',
        ],
        oikea: 2,
      },
    },
  ],
  /* ================================================================
   * ══ ERÄ M17, AMERIKAT 6.9.2026 ══════════════════════════════════
   *
   * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
   * Erä M17 täydensi Amerikat (USA, MEX, ECU, PER, PAN). Yhdelläkään
   * viidestä ei ollut skandaalia, joten tässä ovat kaikkien kymmenen
   * kiintiöt, kaksi maata kohti. Kuvaton erä kuten aiemmatkin: kortti
   * kantaa tekstin ja lähteen. Faktat en-Wikipediasta 6.9.2026, ja
   * jokainen lähderivi nimeää artikkelin osan.
   * ============================================================== */
  USA: [
    /*
     * Teapot Domen öljykenttä, Natrona County, Wyoming.
     * Lähde: en-Wikipedia "Teapot Dome scandal"
     */
    {
      id: 'teapot-dome',
      otsikko: 'Teapot Dome — laivaston öljy vuokrattiin lahjuksilla',
      nimio: 'Teapot Dome 1922',
      vuosi: '1922',
      paikka: 'Teapot Domen öljykenttä, Wyoming',
      lat: 43.29, lon: -106.24,
      kortti: 'Laivasto oli siirtymässä hiilestä öljyyn, ja presidentti Taft oli varannut '
        + 'sitä varten omat öljykentät. Sisäasiainministeri vuokrasi ne yhtiöille ilman '
        + 'tarjouskilpailua ja rikastui matkalla. Hän oli ensimmäinen yhdysvaltalainen '
        + 'ministeri, joka joutui vankilaan.',
      teksti: 'Yhdysvaltain laivasto oli 1900-luvun alussa vaihtamassa hiiltä öljyyn, ja '
        + 'presidentti William Howard Taft oli siksi varannut osan valtion öljyalueista '
        + 'laivaston omiksi varannoiksi.'
        + '\n\nVuonna 1921 presidentti Warren G. Hardingin määräyksellä Wyomingin Teapot '
        + 'Domen sekä Kalifornian Elk Hillsin ja Buena Vistan kentät siirrettiin '
        + 'laivastoministeriöltä sisäasiainministeriölle. Seuraavana vuonna '
        + 'sisäasiainministeri Albert B. Fall vuokrasi Teapot Domen Harry F. Sinclairille ja '
        + 'Elk Hillsin Edward L. Dohenylle ilman tarjouskilpailua.'
        + '\n\nEhdot olivat yhtiöille erittäin edulliset, ja salaiset järjestelyt tekivät '
        + 'Fallista rikkaan miehen: hän sai Dohenyltä marraskuussa 1921 sadantuhannen '
        + 'dollarin korottoman lainan ja muita lahjoja yhteensä noin 404 000 dollarin '
        + 'edestä. Senaattori Thomas J. Walshin johtama tutkinta oli jo hiipumassa, kun '
        + 'Walsh löysi juuri sen lainan, jota Fall ei ollut osannut peittää.'
        + '\n\nKorkein oikeus totesi 1927 vuokrasopimukset korruptiolla hankituiksi ja '
        + 'palautti kentät laivastolle. Fall tuomittiin 1929 lahjusten ottamisesta, mutta '
        + 'Doheny vapautettiin 1930 niiden antamisesta; Sinclair istui puoli vuotta '
        + 'valamiehistön painostamisesta. Ennen Watergatea Teapot Domea pidettiin '
        + 'Yhdysvaltain politiikan suurimpana skandaalina.',
      lahde: 'en-Wikipedia "Teapot Dome scandal", johdanto-osa ja osio "History". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mikä paljasti Albert Fallin lopulta?',
        vaihtoehdot: [
          'Dohenyn koroton satatuhannen dollarin laina',
          'Laivaston oma tarkastus öljykentällä',
          'Sinclairin kirjeenvaihto Wyomingin kuvernöörin kanssa',
        ],
        oikea: 0,
      },
    },
    /*
     * Kongressitalo, Washington.
     * Lähde: en-Wikipedia "Crédit Mobilier scandal"
     */
    {
      id: 'credit-mobilier',
      otsikko: 'Crédit Mobilier — rata laskutti itseltään liikaa',
      nimio: 'Crédit Mobilier',
      vuosi: '1872–1873',
      paikka: 'Kongressitalo, Washington',
      lat: 38.8897, lon: -77.0089,
      kortti: 'Union Pacificin johtajat perustivat oman rakennusyhtiön ja laskuttivat sillä '
        + 'radasta lähes kaksinkertaisen hinnan. Ylimääräinen raha ja alihintainen osake '
        + 'kiersivät Washingtoniin. Kun The Sun kertoi asiasta kesken vaalikampanjan, '
        + 'tutkittavana oli kolmetoista kansanedustajaa.',
      teksti: 'Kongressi valtuutti Union Pacific -rautatien 1864 ja lupasi mannerten '
        + 'välisen radan rakentamiseen sata miljoonaa dollaria pääomaa, lainaa 16 000–48 000 '
        + 'dollaria rautatiekilometriä kohti ja kahdenkymmenen miljoonan eekkerin maat.'
        + '\n\nRadan johtajat perustivat rakentamista varten oman yhtiön, Crédit Mobilier of '
        + 'Americanin. Rata maksoi rakentaa 50 miljoonaa dollaria, mutta Crédit Mobilier '
        + 'laskutti siitä 94 miljoonaa, ja johtajat pitivät erotuksen — 44 miljoonaa — '
        + 'itsellään.'
        + '\n\nOsa ylimääräisestä rahasta ja yhdeksän miljoonan dollarin edestä alihintaista '
        + 'osaketta käytettiin poliitikkojen lahjomiseen. Vuonna 1867 yhtiön johtoon nousi '
        + 'kansanedustaja Oakes Ames, joka jakoi osakkeita kollegoilleen nimellishintaan, '
        + 'vaikka markkinahinta oli paljon korkeampi. Riita liikekumppani Henry Simpson '
        + 'McCombin kanssa johti siihen, että kirjeet vuodettiin The New York Sunille, ja '
        + 'lehti julkaisi jutun 4. syyskuuta 1872 kesken Ulysses S. Grantin vaalikampanjan.'
        + '\n\nKongressi tutki kolmeatoista jäsentään ja päätyi moittimaan Oakes Amesia ja '
        + 'James Brooksia. Oikeusministeriön tutkinnassa selvisi, että osakkeita oli annettu '
        + 'yli kolmellekymmenelle poliitikolle molemmista puolueista, muun muassa James A. '
        + 'Garfieldille. Ketään ei asetettu syytteeseen, ja Garfield valittiin presidentiksi '
        + '1880.',
      lahde: 'en-Wikipedia "Crédit Mobilier scandal", johdanto-osa sekä osiot "Background", '
        + '"The scandal" ja "Aftermath". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Kuinka paljon Crédit Mobilier laskutti 50 miljoonan radasta?',
        vaihtoehdot: [
          '60 miljoonaa dollaria',
          '72 miljoonaa dollaria',
          '94 miljoonaa dollaria',
        ],
        oikea: 2,
      },
    },
  ],
  MEX: [
    /*
     * Cerro de las Campanas, Querétaro.
     * Lähde: en-Wikipedia "Second Mexican Empire"
     */
    {
      id: 'maximilianin-keisarikunta',
      otsikko: 'Keisari, jonka Ranska toi ja jätti',
      nimio: 'Querétaro 1867',
      vuosi: '1867',
      paikka: 'Cerro de las Campanas, Querétaro',
      lat: 20.5933, lon: -100.4104,
      kortti: 'Napoleon III tarvitsi Amerikkaan monarkistisen liittolaisen ja tarjosi '
        + 'Meksikon kruunua itävaltalaiselle arkkiherttualle. Kun ranskalaiset joukot '
        + 'lähtivät, keisari jäi. Hän kieltäytyi luopumasta kruunusta ja teloitettiin '
        + 'kenraaliensa kanssa kesäkuussa 1867.',
      teksti: 'Toinen Meksikon keisarikunta oli perustuslaillinen monarkia, jonka '
        + 'meksikolaiset monarkistit pystyttivät Ranskan toisen keisarikunnan tuella. '
        + 'Napoleon III halusi Meksikon konservatiivien, papiston ja aateliston avulla '
        + 'monarkistisen liittolaisen Amerikkaan vastapainoksi Yhdysvaltain kasvavalle '
        + 'vallalle.'
        + '\n\nKruunua tarjottiin itävaltalaiselle arkkiherttualle Maximilianille, ja hänen '
        + 'nousunsa vahvistettiin kiistanalaisella kansanäänestyksellä. Valtaistuimelle '
        + 'noustessaan hän hyväksyi Miramarin sopimuksen, jonka mukaan Meksikon hallitus '
        + 'maksaisi Ranskan sotaretken kulut ja elättäisi ranskalaiset joukot. Hänen '
        + 'vaimostaan, belgialaisesta prinsessa Charlottesta, tuli keisarinna Carlota.'
        + '\n\nRanskan armeija hallitsi Keski-Meksikoa, mutta tasavallan kannattajat '
        + 'jatkoivat vastarintaa sekä tavallisin asein että sissisotana, eikä presidentti '
        + 'Benito Juárez poistunut kertaakaan maasta. Helmikuussa 1867 viimeiset '
        + 'ranskalaiset joukot lähtivät kotiin.'
        + '\n\nMaximilian kieltäytyi luopumasta kruunusta ja siirtyi Querétaroon noin '
        + 'kymmenentuhannen miehen kanssa. Tasavallan kenraalit Escobedo ja Corona '
        + 'saartoivat kaupungin neljälläkymmenellätuhannella, ja 15. toukokuuta 1867 '
        + 'keisarillinen upseeri avasi portit. Maximilian sekä kenraalit Tomás Mejía ja '
        + 'Miguel Miramón tuomittiin kuolemaan ja ammuttiin 19. kesäkuuta 1867.',
      lahde: 'en-Wikipedia "Second Mexican Empire", johdanto-osa sekä osiot "Origins of the '
        + 'empire" ja "Fall of the empire". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miten Querétaro joutui tasavaltalaisten käsiin?',
        vaihtoehdot: [
          'Keisarillinen upseeri avasi kaupungin portit',
          'Muurit murrettiin tykistöllä',
          'Kaupunki antautui nälkiinnyttyään talven aikana',
        ],
        oikea: 0,
      },
    },
    /*
     * Cananean kuparikaivos, Sonora.
     * Lähde: en-Wikipedia "Cananea strike"
     */
    {
      id: 'cananea-1906',
      otsikko: 'Cananea — viisi pesoa, kahdeksan tuntia',
      nimio: 'Cananea 1906',
      vuosi: '1906',
      paikka: 'Cananean kuparikaivos, Sonora',
      lat: 30.9819, lon: -110.3006,
      kortti: 'Kaivosyhtiö korotti amerikkalaisten työntekijöiden palkan viiteen dollariin '
        + 'päivässä. Meksikolaiset saivat yhä enintään kolme. Kun korotus astui voimaan '
        + '1. kesäkuuta 1906, kaksituhatta miestä käveli ulos — ja päivä päättyi '
        + 'kolmeenkymmeneenkolmeen kuolleeseen.',
      teksti: 'Cananea on vuoristoinen kaivoskaupunki Koillis-Sonorassa kolmenkymmenen '
        + 'kilometrin päässä Yhdysvaltain rajasta. Eversti William Cornell Greene perusti '
        + 'sinne Cananea Consolidated Copper Companyn 1896; Porfirio Díazin hallinto myi '
        + 'usein maan luonnonvaroja ulkomaisille yhtiöille, ja Greene laajensi otteensa myös '
        + 'liikenteeseen, sahoihin ja voimalaitoksiin. Suoni oli maailman suurimpia, ja 1906 '
        + 'yhtiö työllisti 5 360 meksikolaista ja 2 200 amerikkalaista.'
        + '\n\nTyöntekijöitä hiersivät kymmentuntiset päivät, huono ilmanvaihto ja palkkojen '
        + 'epätasa-arvo. Murtumakohta tuli, kun Greene ilmoitti nostavansa amerikkalaisten '
        + 'palkan viiteen dollariin päivässä; meksikolaisille jäi enintään kolme.'
        + '\n\nKorotuksen voimaantulopäivänä 1. kesäkuuta 1906 meksikolaiset kaivosmiehet '
        + 'jättivät työnsä. Jopa kaksituhatta miestä kokoontui poliisipäällikön toimiston '
        + 'eteen huutamaan "cinco pesos, ocho horas" — viisi pesoa, kahdeksan tuntia. '
        + 'Vaatimuksiin kuului myös se, että kolme neljäsosaa työpaikoista varattaisiin '
        + 'meksikolaisille.'
        + '\n\nIltapäivällä kulkue ohitti puutavaravaraston, jonka johtaja käänsi paloletkun '
        + 'väkijoukkoon ja ampui sitä kohti. Varasto sytytettiin tuleen, ja yhteenotot '
        + 'jatkuivat yöhön. Lakko päättyi ilman myönnytyksiä: noin 33 työntekijää kuoli, 22 '
        + 'haavoittui ja 50 pidätettiin. Tapaus jäi merkiksi Díazin ajan kasvavasta '
        + 'levottomuudesta ennen Meksikon vallankumousta.',
      lahde: 'en-Wikipedia "Cananea strike", johdanto-osa sekä osiot "Location", '
        + '"Background" ja "Strike". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä lakkolaiset huusivat poliisipäällikön toimiston edessä?',
        vaihtoehdot: [
          '"Tierra y libertad"',
          '"Cinco pesos, ocho horas"',
          '"Viva Cananea"',
        ],
        oikea: 1,
      },
    },
  ],
  ECU: [
    /*
     * Loja, Etelä-Ecuadorin kiinapuumetsät.
     *
     * MIKSEI GALÁPAGOS EIKÄ QUITO. Ecuadorin kaksi ilmeisintä
     * skandaalia — Galápagosin plantaasivaltias Manuel Julián Cobos
     * (1904) ja vuoden 1894 "lipun myynti" — jäivät pois paikan takia,
     * eivät aiheen. Galápagos on Ecuadorin fokuslehden ikkunan
     * (x 2925–3533) LÄNSIPUOLELLA, joten saarille sijoitettu merkki ei
     * piirtyisi lainkaan; sama syy on kirjattu Darwin-hetken kohdalle
     * (tools/tarkista-nostopaikat.mjs POIKKEUS). Lipun myynti taas
     * tapahtui Quitossa, joka on pelikaupunki: piste jäisi 1,6
     * lautayksikön päähän laatasta, eikä kaupungin kohdalle kirjoiteta
     * uutta pääkartan nostoa (tests/nostot-kartalla.test.mjs,
     * KAUPUNGIN_KOHDALLA_SADE 7). Molemmat korvattiin mannermaan
     * tapauksilla, joilla on oma paikkansa: Loja 129,1 yksikköä
     * Quitosta ja Lago Agrio 57,6.
     * Lähde: en-Wikipedia "Cinchona"
     */
    {
      id: 'kiinapuun-kuori',
      otsikko: 'Kiinapuu — monopoli, joka salakuljetettiin pois',
      nimio: 'Kiinapuu 1860',
      vuosi: '1638–1860',
      paikka: 'Loja, Etelä-Ecuador',
      lat: -3.9833, lon: -79.2,
      kortti: 'Lojan metsien kuoresta saatiin ainoa toimiva lääke malariaan. Perun ja '
        + 'naapureiden laki kielsi siementen ja taimien viennin, mutta 1800-luvulla ne '
        + 'salakuljetettiin ulos maasta ja istutettiin Jaavalle ja Intiaan. Yksi kerääjistä '
        + 'kuoli pahoinpitelyyn.',
      teksti: 'Kiinapuun kuoresta saatiin kiniini, pitkään ainoa tehoava malarialääke. '
        + 'Munkki Antonio de La Calancha mainitsi quina-kuoren 1638 puuna, joka kasvaa '
        + 'Lojassa, ja kertoi että kahden kolikon painoinen jauhe sekoitettiin veteen ja '
        + 'juotiin kuumeeseen. Jesuiittaisä Bernabé Cobo kirjoitti "kuumepuusta" 1653.'
        + '\n\nTarkan kuvauksen teki vasta tähtitieteilijä Charles Marie de La Condamine, '
        + 'joka tuli Quitoon 1735 mittaamaan meridiaanin kaarta; hänen kuvaamansa laji '
        + 'Cinchona officinalis osoittautui kuitenkin hoidollisesti vähäarvoiseksi.'
        + '\n\nKysynnän kasvaessa metsien puita alettiin hakata. Pitääkseen kuorimonopolinsa '
        + 'Peru ja sen naapurimaat kielsivät kiinapuun siementen ja taimien viennin '
        + '1800-luvun alusta lähtien. Siirtomaavallat halusivat silti kasvattaa puuta itse: '
        + 'hollantilaiset lähettivät Justus Hasskarlin, jonka taimia viljeltiin Jaavalla '
        + 'vuodesta 1854, ja englantilainen Clements Markham haki 1860 kasveja, jotka '
        + 'istutettiin Sri Lankaan ja Etelä-Intian Nilgiriin.'
        + '\n\nCharles Ledger ja hänen apulaisensa Manuel Incra Mamani keräsivät toista lajia '
        + 'Boliviasta. Mamani jäi kiinni ja hänet pahoinpideltiin, mihin hän kuoli; Ledger '
        + 'sai siemenet, joita britit eivät halunneet, ja loput myytiin hollantilaisille. '
        + 'Cinchona ledgeriana tuotti Hollannin Indonesiassa 8–13 prosenttia kiniiniä. '
        + '1800-luvulla britit perustivat Intiaan viljelmiä siemenistä, jotka he '
        + 'salakuljettivat Ecuadorista, Perusta ja Boliviasta. Markham aateloitiin työstään.',
      lahde: 'en-Wikipedia "Cinchona", osiot "Early references", "Economic significance" ja '
        + '"Widespread cultivation". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Miksi Peru ja sen naapurit kielsivät siementen viennin?',
        vaihtoehdot: [
          'Pitääkseen kuorimonopolin itsellään',
          'Suojellakseen puita hyönteisiltä',
          'Estääkseen lääkkeen väärinkäytön',
        ],
        oikea: 0,
      },
    },
    /*
     * Lago Agrion öljykenttä, Sucumbíos.
     * Lähde: en-Wikipedia "Lago Agrio oil field"
     */
    {
      id: 'lago-agrio',
      otsikko: 'Lago Agrio — öljykenttä ja tuomio, jota ei pantu täytäntöön',
      nimio: 'Lago Agrio 1993',
      vuosi: '1993–2018',
      paikka: 'Lago Agrion öljykenttä, Sucumbíos',
      lat: 0.0746, lon: -76.7579,
      kortti: 'Amazonin öljykenttä saastutti vedet ja maaperän cofánien alueella. '
        + 'Asukkaat haastoivat yhtiön oikeuteen 1993, ja ecuadorilainen tuomioistuin määräsi '
        + 'miljardikorvaukset. Yhtiö kieltäytyi maksamasta, ja riita jatkui '
        + 'kansainvälisissä tuomioistuimissa neljännesvuosisadan.',
      teksti: 'Lago Agrion öljykenttä on Nueva Lojan kaupungin lähellä Sucumbíosin '
        + 'maakunnassa Ecuadorin Amazoniassa, läntisessä Oriente-altaassa. Öljy löytyi '
        + 'seudulta 1960-luvulla, ja kenttä on yksi niistä kahdestatoista tuotantoalueesta, '
        + 'jotka syntyivät kun Ecuador alkoi viedä öljyä.'
        + '\n\nKenttä tunnetaan kansainvälisesti vakavista ympäristöongelmista: veden ja '
        + 'maaperän saastumisesta, metsäkadosta ja kulttuurin murtumisesta. Alue on '
        + 'cofánien maata lähellä Kolumbian rajaa.'
        + '\n\nVuonna 1993 paikalliset asukkaat nostivat ryhmäkanteen Aguinda vastaan Texaco '
        + 'pakottaakseen kentän entisen operaattorin siivoamaan alueen ja huolehtimaan '
        + '30 000 saastumisesta kärsineestä asukkaasta. Chevron oli ostanut Texacon 2001. '
        + 'Helmikuussa 2011 ecuadorilainen tuomioistuin määräsi Chevronin maksamaan kahdeksan '
        + 'miljardia dollaria, ja Ecuadorin korkein oikeus vahvisti tuomion 2013 summalla 9,5 '
        + 'miljardia.'
        + '\n\nChevron oli aiemmin vaatinut käsittelyn siirtämistä New Yorkista '
        + 'ecuadorilaisiin tuomioistuimiin ja hyväksynyt niiden toimivallan, mutta kieltäytyi '
        + 'maksamasta ja kutsui päätöstä laittomaksi ja täytäntöönpanokelvottomaksi. '
        + 'Yhdysvaltalainen tuomioistuin julisti tuomion täytäntöönpanokelvottomaksi 2014 ja '
        + 'muutoksenhakutuomioistuin kaksi vuotta myöhemmin. Vuonna 2018 pysyvä '
        + 'välitystuomioistuin Haagissa ratkaisi asian Chevronin hyväksi ja katsoi, että '
        + 'vuoden 2013 tuomio oli saatu petoksella, lahjonnalla ja korruptiolla.',
      lahde: 'en-Wikipedia "Lago Agrio oil field", johdanto-osa. Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mihin Haagin välitystuomioistuin päätyi 2018?',
        vaihtoehdot: [
          'Chevronin oli maksettava 9,5 miljardia',
          'Ecuadorin tuomio oli saatu petoksella ja lahjonnalla',
          'Asia oli vanhentunut',
        ],
        oikea: 1,
      },
    },
  ],
  PER: [
    /*
     * Callaon satama.
     * Lähde: en-Wikipedia "Chincha Islands War"
     */
    {
      id: 'chinchan-saaret',
      otsikko: 'Chinchan saaret — Espanja otti guanon',
      nimio: 'Chincha 1864',
      vuosi: '1864–1866',
      paikka: 'Callaon satama',
      lat: -12.0522, lon: -77.1392,
      kortti: 'Espanja lähetti "tieteellisen retkikunnan" Etelä-Amerikan vesille ja valtasi '
        + 'Perun tärkeimmän tulonlähteen: guanolla lastatut Chinchan saaret. Sota levisi '
        + 'neljään entiseen siirtomaahan ja toi mukanaan panssarilaivat.',
      teksti: 'Chinchan saarten sota eli Espanjan ja Etelä-Amerikan sota oli sarja rannikko- '
        + 'ja meritaisteluita Espanjan ja sen entisten siirtomaiden Perun, Chilen, Ecuadorin '
        + 'ja Bolivian välillä. Se alkoi, kun Espanja valtasi guanorikkaat Chinchan saaret '
        + '— yhtenä useista kuningatar Isabella II:n yrityksistä palauttaa Espanjan '
        + 'vaikutusvalta entisiin siirtomaihin.'
        + '\n\nEspanjan asema oli tuolloin vahva: Isabellan aikana laivastomenot kasvoivat, ja '
        + 'maa nousi maailman neljänneksi suurimmaksi merivallaksi. 1850- ja 1860-luvuilla se '
        + 'toimi siirtomaahankkeissa muun muassa Marokossa, Filippiineillä, Meksikossa ja '
        + 'Dominikaanisessa tasavallassa.'
        + '\n\nVuoden 1862 lopulla Espanja lähetti Etelä-Amerikan vesille "tieteellisen '
        + 'retkikunnan", jonka salainen tarkoitus oli tukea Amerikassa asuvien Espanjan '
        + 'kansalaisten rahallisia ja oikeudellisia vaatimuksia. Amiraali Luis '
        + 'Hernández-Pinzón Álvarezin laivue koostui neljästä sota-aluksesta. Laivat saapuivat '
        + 'Valparaísoon huhtikuussa 1863 ja sieltä Peruun, jonka itsenäisyyttä Espanja ei '
        + 'ollut koskaan tunnustanut; silti Callaossa ne otettiin ystävällisesti vastaan.'
        + '\n\nSota tunnetaan panssarilaivojen käytöstä. Yksi niistä, espanjalainen '
        + 'panssarifregatti Numancia, oli ensimmäinen panssarilaiva, joka purjehti maailman '
        + 'ympäri.',
      lahde: 'en-Wikipedia "Chincha Islands War", johdanto-osa ja osio "Background". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Mitä Chinchan saarilta haettiin?',
        vaihtoehdot: [
          'Guanoa',
          'Hopeaa',
          'Salpietaria',
        ],
        oikea: 0,
      },
    },
    /*
     * Cusco, Museo Machu Picchu.
     * Lähde: en-Wikipedia "Peru–Yale University dispute"
     */
    {
      id: 'yale-kiista',
      otsikko: 'Machu Picchun esineet — sata vuotta New Havenissa',
      nimio: 'Yale-kiista',
      vuosi: '1911–2011',
      paikka: 'Cusco',
      lat: -13.5169, lon: -71.9786,
      kortti: 'Hiram Bingham vei Machu Picchulta tuhansia esineitä Connecticutiin. Osapuolet '
        + 'olivat eri mieltä siitä, oliko kyse lainasta vai lahjasta. Peru yritti saada '
        + 'kokoelmansa takaisin 1920-luvulla — ja sai sen vasta yhdeksänkymmentä vuotta '
        + 'myöhemmin.',
      teksti: 'Perun ja Yalen yliopiston kiista oli vuosisadan mittainen riita siitä, kenelle '
        + 'kuuluvat Machu Picchulta otetut inkojen esineet ja ihmisjäänteet. Machu Picchu on '
        + 'inkojen paikka korkealla Andeilla, ja se oli käytössä noin vuosina 1420–1532.'
        + '\n\nVuoden 1911 jälkeisinä vuosina yalelainen tutkimusmatkailija Hiram Bingham III '
        + 'vei paikalta tuhansia esineitä — keramiikkaa, kivityökaluja ja ihmisluita — '
        + 'Connecticutin New Haveniin. Siirtojen ehdoista oltiin eri mieltä: Binghamin ja '
        + 'joidenkin muiden mukaan Yale oli sopinut lainaavansa esineitä kahdeksantoista '
        + 'kuukauden tutkimusta varten.'
        + '\n\nPeru yritti saada kokoelman takaisin 1920-luvulla, mutta Yale vastusti. Jännite '
        + 'kiristyi vuosina 2006–2010, jolloin käytiin oikeutta, perulaiset ja Yalen omat '
        + 'alumnit vetosivat julkisuudessa, ja presidentti Alan García kääntyi presidentti '
        + 'Barack Obaman puoleen.'
        + '\n\nYhdeksäntenätoista marraskuuta 2010 Peru ja Yale sopivat, että jäänteet ja '
        + 'esineet palautetaan. Alkuvuodesta 2011 Yale ja Cuscon yliopisto sopivat lisäksi '
        + 'museon ja tutkimuskeskuksen perustamisesta Cuscoon; Museo Machu Picchu avattiin '
        + 'yleisölle marraskuussa 2011. Kokoelmaa pidetään arvokkaimpien inkakokoelmien '
        + 'joukossa.',
      lahde: 'en-Wikipedia "Peru–Yale University dispute", johdanto-osa ja osio "Background". '
        + 'Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Milloin Peru ja Yale sopivat esineiden palauttamisesta?',
        vaihtoehdot: [
          'Vuonna 1920',
          'Vuonna 2010',
          'Vuonna 2021',
        ],
        oikea: 1,
      },
    },
  ],
  PAN: [
    /*
     * Guna Yalan itäosa, Panaman Karibian saaristo.
     *
     * MIKSI EI PANAMAN KANAVASKANDAALI 1892. Ranskalaisen
     * kanavayhtiön romahdus olisi ollut erän ilmeinen valinta, mutta
     * sen kaikki paikat — Culebran leikkaus (4,2 lautayksikköä),
     * Gatún (6,7) ja Colón (8,5) — ovat Panamá-laatan kyljessä, ja
     * Colónissa on jo tämän erän rautatiemerkki. Kaupungin kohdalle ei
     * kirjoiteta uutta pääkartan nostoa (tests/nostot-kartalla.test.mjs,
     * KAUPUNGIN_KOHDALLA_SADE 7), joten skandaaliksi valittiin
     * tapahtuma, jolla on oma paikkansa kaukana kannaksesta: piste on
     * Guna Yalan itäosassa, 59,0 yksikköä Panamásta ja 14,9 yksikköä
     * maan oman Guna Yala -kohdemerkin päästä.
     * Lähde: en-Wikipedia "San Blas Rebellion"
     */
    {
      id: 'san-blasin-kapina',
      otsikko: 'San Blasin kapina — mola kiellettiin, kansa nousi',
      nimio: 'San Blas 1925',
      vuosi: '1925',
      paikka: 'Guna Yalan itäosa',
      lat: 9.13, lon: -77.93,
      kortti: 'Panaman hallitus kielsi gunanaisilta molapaidat, nenärenkaat ja käsi- ja '
        + 'jalkasiteet ja pakotti heidät länsimaisiin vaatteisiin. Helmikuussa 1925 gunat '
        + 'julistivat oman tasavallan ja hyökkäsivät hallituksen hallitsemille saarille. '
        + 'Rauha tehtiin yhdysvaltalaisen sotalaivan kannella.',
      teksti: 'San Blasin saaret eli Guna Yala elivät levotonta aikaa sen jälkeen, kun Panama '
        + 'julistautui itsenäiseksi 1903. Gunat olivat aiemmin tulleet toimeen Kolumbian '
        + 'kanssa omien lakiensa ja tapojensa mukaan, mutta uusi hallitus pyrki ottamaan '
        + 'alueen haltuunsa ja istuttamaan sinne länsimaisen ja kansallisen kulttuurin.'
        + '\n\nSulauttaminen alkoi 1904, ja 1906 hallitus vei seitsemäntoista gunalasta '
        + 'länsimaiseen kouluun; 1909 alueelle perustettiin poliisiraja, mikä johti '
        + 'yhteenottoihin. Vuonna 1919 presidentti Belisario Porras aloitti pakkosulauttamisen '
        + 'ja kielsi osan naisten perinteisestä puvusta: molapaidat, nenärenkaat sekä käsi- ja '
        + 'jalkasiteet piti vaihtaa länsimaisiin vaatteisiin.'
        + '\n\nVuonna 1925 gunajohtajat suunnittelivat kapinan. Heitä neuvoi yhdysvaltalainen '
        + 'tutkimusmatkailija Richard Marsh, joka myös kirjoitti itsenäisyysjulistuksen; '
        + 'johtajina olivat Ustupun päällikkö Nele Kantule ja Ailigandin päällikkö Simral '
        + 'Colman. Aligandissa pidettiin 12. helmikuuta alkaen kokous, joka kesti '
        + 'kaksikymmentäkuusi päivää ja julisti Tulen tasavallan rajoineen ja lippuineen. '
        + 'Kapina alkoi 22. helmikuuta, kesti kolmesta neljään päivää ja vaati alle '
        + 'kolmekymmentä kuollutta.'
        + '\n\nYhdysvallat lähetti sotalaivan San Blasinlahdelle, ja osapuolet kutsuttiin sen '
        + 'kannelle neuvottelemaan. Rauhansopimus allekirjoitettiin 4. maaliskuuta. Gunille '
        + 'luvattiin kunnioittaa heidän tapojaan ja perua kouluun ja pukeutumiseen liittyneet '
        + 'lait; vastineeksi he laskivat aseensa ja peruivat itsenäisyysjulistuksensa.',
      lahde: 'en-Wikipedia "San Blas Rebellion", johdanto-osa sekä osiot "Background", '
        + '"Revolution" ja "Result". Tarkistettu 6.9.2026.',
      visa: {
        kysymys: 'Missä vuoden 1925 rauhasta neuvoteltiin?',
        vaihtoehdot: [
          'Panamán presidentinpalatsissa',
          'Yhdysvaltain sotalaivan kannella',
          'Kolumbian kongressissa',
        ],
        oikea: 1,
      },
    },
    /*
     * Uuden Kaledonian siirtokunta, Guna Yala.
     * Lähde: en-Wikipedia "Darien scheme"
     */
    {
      id: 'darienin-hanke',
      otsikko: 'Darienin hanke — siirtokunta, joka vei Skotlannin vararikkoon',
      nimio: 'Darien 1698',
      vuosi: '1698–1700',
      paikka: 'Uuden Kaledonian siirtokunta, Guna Yala',
      lat: 8.83, lon: -77.66,
      kortti: 'Skotlanti sijoitti viidenneksen koko liikkeessä olevasta rahastaan '
        + 'siirtokuntaan Panaman kannakselle. Yli 80 prosenttia lähtijöistä kuoli vuodessa. '
        + 'Vararikko heikensi vastustusta unionille Englannin kanssa.',
      teksti: 'Darienin hanke oli Skotlannin kuningaskunnan sijoittajien tukema yritys '
        + 'perustaa 1690-luvun lopulla siirtokunta nykyisen Panaman alueelle Dariénin '
        + 'aukkoon. Siirtokunnan nimeksi tuli Uusi Kaledonia, ja ajatuksena oli hallita '
        + 'maareittiä, joka yhdistäisi Tyynenmeren ja Atlantin.'
        + '\n\nTakaajat tiesivät, että Vasco Núñez de Balboa oli nähnyt Tyynenmeren '
        + 'ensimmäisenä eurooppalaisena juuri Dariénin kannaksen ylitettyään. Retkikunta '
        + 'julisti 1698 hallitsevansa myös "Rapusaarta" eli nykyistä Viequesia Puerto '
        + 'Ricossa, mutta valta jäi lyhyeksi.'
        + '\n\nHanke epäonnistui. Yli kahdeksankymmentä prosenttia osallistujista kuoli '
        + 'vuoden kuluessa, ja siirtokunta hylättiin kahdesti. Syitä on esitetty monia: huono '
        + 'suunnittelu ja muonitus, hajanainen johto, kaupankäynnin puute sekä paikallisten '
        + 'kansojen että naapurisiirtokuntien kanssa, trooppiset taudit, englantilaisten '
        + 'kauppaintressien vastustus ja se, ettei osattu varautua Espanjan sotilaalliseen '
        + 'vastaukseen. Lopullisesti paikka jätettiin maaliskuussa 1700 espanjalaisten '
        + 'piirityksen ja satamasaarron jälkeen.'
        + '\n\nCompany of Scotlandin takana oli noin viidennes kaikesta Skotlannissa '
        + 'liikkuneesta rahasta, joten epäonnistuminen ajoi koko Skotlannin alamaan '
        + 'talousahdinkoon. Se oli tärkeä tekijä siinä, että vastustus unionia kohtaan '
        + 'heikkeni ennen vuoden 1707 sopimusta. Siirtokunnan maat kuuluvat nykyään Guna '
        + 'Yalaan.',
      lahde: 'en-Wikipedia "Darien scheme", johdanto-osa ja osio "Origins". Tarkistettu '
        + '6.9.2026.',
      visa: {
        kysymys: 'Mitä hankkeen epäonnistuminen merkitsi Skotlannille?',
        vaihtoehdot: [
          'Se rahoitti Skotlannin oman laivaston',
          'Se ajoi Skotlannin alamaan vararikkoon',
          'Se toi Skotlannille siirtomaan Karibialla',
        ],
        oikea: 1,
      },
    },
  ],
};
