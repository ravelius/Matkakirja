    /*
     * ══════════════════════════════════════════════════════════════
     * KARTTAUUDISTUS, ERÄ 5 (13.9.2026): KAUPUNKILEHDEN SIVUT
     * NOSTOIKSI.
     *
     * Suunnitelman luku 4.7 (docs/raportit/karttauudistus-suunnitelma-
     * 20260913.md, omistajan hyväksymä jakotaulukko) siirtää Pariisin
     * kaupunkilehden sivujen nostot kartalle klikattaviksi paloiksi.
     * Kuusi alla olevaa riviä ovat se siirto.
     *
     * TEKSTIÄ EI OLE KIRJOITETTU UUDESTAAN. Jokainen `lunastus`-
     * kappale on lehden oman noston `teksti` SANATARKASTI
     * (js/packs/kulttuuri-kategoriat.js, kaupunki `pariisi`), samoin
     * `otsikko` on lehden oma otsikko ja `kuva` lehden oma kuvarivi
     * kenttineen. Yhtään faktaa ei ole lisätty eikä muotoiltu
     * uudelleen; Fablen sisältöpistokoe (`node tools/
     * vertaa-sisaltodiff.mjs`) vertaa parit VANHA/UUSI.
     *
     * PUDOTETTU AINES ON SOMMITTELUA: osastojen `johdanto`-rivit
     * jäivät pois, koska ne eivät esitä yhtään faktaa, jota alla
     * olevissa korteissa tai näiden omissa kartta­korteissa ei jo
     * olisi (perustelu ja rivikohtainen vertailu erän raportissa).
     *
     * MINIKYSYMYKSET: erän 6 datamalli (`visa`), kiintiö joka kolmas
     * nosto. Pooli on tämän erän jälkeen yhdeksän nostoa, ja visat
     * ovat kolmannessa (`carmenin-ensi-ilta`, erä 6), kuudennessa
     * (`notre-damen-kukko`) ja yhdeksännessä (`pariisin-vuosisadat`).
     * Vastaus on aina SAMAN kortin tekstissä.
     * ══════════════════════════════════════════════════════════════
     */
    {
      /*
       * LEHDEN SIVU 1 ("Pariisi"), nosto 1. Kohdekartalle Eiffel-tornin
       * pisteeseen, jossa on jo kolme merkkiä samassa osoitteessa
       * (Eiffel-torni, Torni romuraudaksi, Torni 1888) — talon tapa on
       * `nimiPuoli` ja `siirto`, ei uusi koordinaatti.
       */
      id: 'pariisin-72-nimea',
      nimio: '72 nimeä',
      otsikko: 'Tornissa on 72 nimeä kullalla',
      symboli: 'tekniikka',
      lunastus: [
        'Gustave Eiffel halusi, että hänen torninsa on tieteen '
          + 'muistomerkki. Ensimmäisen kerroksen ympäri kiertää 65 metrin '
          + 'korkeudella nimilista: 18 nimeä tornin jokaisella sivulla, '
          + 'yhteensä 72 ranskalaista tiedemiestä ja insinööriä. Kirjaimet ovat '
          + 'kullattuja ja 60 senttiä korkeita. Nimet peitettiin maalilla '
          + '1900-luvun alussa ja paljastettiin vasta 1986–1987. Yhtään naista '
          + 'listalla ei ole. Siksi tammikuussa 2026 julkistettiin toinen 72 '
          + 'nimen lista, pelkkiä naistutkijoita, jotka on tarkoitus kaivertaa '
          + 'miesten nimien yläpuolelle vuonna 2027.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Pariisi", nosto "Tornissa on 72 '
        + 'nimeä kullalla" (js/packs/kulttuuri-kategoriat.js). Teksti '
        + 'siirretty sanatarkasti karttauudistuksen erässä 5, 13.9.2026.',
      kuva: {
        tiedosto: 'Chevreul, Flachat, Navier.001 - Torre Eiffel.jpg',
        lyhyt: 'Eiffel-tornin ensimmäistä kerrosta kiertää 72 ranskalaisen tiedemiehen nimi kullatuin kirjaimin.',
        selite: 'Eiffel-tornin ensimmäisen kerroksen ympäri kiertää 65 metrin '
          + 'korkeudella 72 ranskalaisen tiedemiehen ja insinöörin nimeä '
          + 'kullatuin, 60 senttiä korkein kirjaimin.',
        lahde: 'Fernando Losada Rodríguez, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi nimet peitettiin maalilla 1900-luvun alussa?',
        'Ketkä ovat sen toisen, vuonna 2026 julkistetun listan nimet?',
        'Miten 72 nimeä valittiin tornin kylkeen?',
      ],
      // Eiffel-torni 48,85822 N / 2,2945 E — sama piste kuin nostolla
      // `lustig-eiffel` (en-Wikipedia "Eiffel Tower").
      paikka: {
        nimi: 'Eiffel-torni',
        laudat: {
          maailmankartta: { x: 5909.8, y: 1439.5 },
          europe: { x: 255.3, y: 608.6 },
        },
      },
    },
    {
      /*
       * LEHDEN SIVU 1 ("Pariisi"), nosto 2. Kohdekartalle Abbesses'n
       * metroaseman sisäänkäyntiin: se on yksi jäljellä olevista
       * Guimardin sisäänkäynneistä ja jo pelin omassa kuvapaketissa
       * (js/packs/europe-valokuvat.js, "6 Abbesses.jpg"). Piste on
       * PAIKKATIETO eikä kortin väite — teksti ei mainitse asemaa.
       * 48,8844 N / 2,3382 E.
       */
      id: 'guimardin-metro',
      nimio: 'Metron sisäänkäynti',
      otsikko: 'Metron sisäänkäynti koottiin palasista',
      symboli: 'tekniikka',
      lunastus: [
        'Pariisin metro avattiin 19. heinäkuuta 1900. Sisäänkäynneistä oli '
          + 'järjestetty arkkitehtikilpailu, mutta yksikään 21 ehdotuksesta ei '
          + 'kelvannut, ja työ annettiin Hector Guimardille, joka ei ollut edes '
          + 'osallistunut kilpailuun. Hän piirsi valurautaisia vakio-osia, '
          + 'jotka sopivat yhteen kuin rakennussarja: samoista paloista sai '
          + 'kasattua sopivan sisäänkäynnin mihin tahansa kadunkulmaan. Niitä '
          + 'tehtiin 167. Sitten tyyli meni pois muodista ja puolet purettiin. '
          + 'Jäljellä olevat 86 rauhoitettiin vuonna 1978.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Pariisi", nosto "Metron '
        + 'sisäänkäynti koottiin palasista" (js/packs/kulttuuri-kategoriat.js). '
        + 'Teksti siirretty sanatarkasti karttauudistuksen erässä 5, '
        + '13.9.2026.',
      kuva: {
        tiedosto: '01 Guimard\'s Métropolitain.jpg',
        selite: 'Guimardin metrosisäänkäyntejä tehtiin 167, ja jäljellä olevat '
          + '86 rauhoitettiin vuonna 1978.',
        lahde: 'Terrazzo (Flickr), Wikimedia Commons (CC BY 2.0)',
      },
      kysymykset: [
        'Miksi arkkitehtikilpailun 21 ehdotuksesta yksikään ei kelvannut?',
        'Mitä vakio-osista kasaaminen tarkoitti käytännössä?',
        'Miksi puolet sisäänkäynneistä purettiin?',
      ],
      paikka: {
        nimi: 'Metron sisäänkäynti',
        laudat: {
          maailmankartta: { x: 5911.3, y: 1438.4 },
          europe: { x: 256.1, y: 607.9 },
        },
      },
    },
    {
      /*
       * LEHDEN SIVU 1 ("Pariisi"), nosto 3. Kohdekartalle Notre-Damen
       * pisteeseen (48,853 N / 2,3499 E, sama koordinaatti kuin kartan
       * omalla Notre-Dame-kohteella).
       *
       * POOLIN KUUDES = MINIKYSYMYS (kiintiö joka kolmas, erä 6).
       * Vastaus on yllä olevassa tekstissä sanatarkasti: *"Ensin sitä
       * luultiin tuhoutuneeksi, mutta se löytyi seuraavana päivänä
       * maasta lommoilla."* Myös `fakta` on saman kortin sisällä
       * (kuusitoista kuparipatsasta oli nostettu katolta neljä päivää
       * ennen paloa). Väärät vaihtoehdot eivät ole faktaväitteitä vaan
       * uskottavia arvauksia — sama kaava kuin PIAF_VISAssa.
       */
      id: 'notre-damen-kukko',
      nimio: 'Notre-Damen kukko',
      otsikko: 'Kukko putosi ja löytyi seuraavana päivänä',
      symboli: 'historia',
      lunastus: [
        'Notre-Damen ullakko syttyi 15. huhtikuuta 2019, ja keskitorni '
          + 'romahti kello 19.45. Katon alla paloi 1 300 tammirungosta tehty '
          + 'kattotuolisto, joka oli 1200-luvulta. Tornin huipulla seisoi '
          + 'kuparinen kukko, jonka sisään oli suljettu pyhäinjäännöksiä. Ensin '
          + 'sitä luultiin tuhoutuneeksi, mutta se löytyi seuraavana päivänä '
          + 'maasta lommoilla. Onnea oli muutenkin: kuusitoista kuparipatsasta '
          + 'oli nostettu katolta korjattavaksi neljä päivää ennen paloa. Uuden '
          + 'kullatun kukon sisään pantiin samat pyhäinjäännökset ja 2 000 '
          + 'jälleenrakentajan nimet.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Pariisi", nosto "Kukko putosi ja '
        + 'löytyi seuraavana päivänä" (js/packs/kulttuuri-kategoriat.js). '
        + 'Teksti siirretty sanatarkasti karttauudistuksen erässä 5, '
        + '13.9.2026.',
      kuva: {
        tiedosto: 'Coq de Notre-Dame de Paris 2020.jpg',
        lyhyt: 'Notre-Damen kuparinen kukko putosi tornin huipulta 2019 palossa ja löytyi lommoilla.',
        selite: 'Notre-Damen tornin huipulla seisonut kuparinen kukko putosi '
          + 'vuoden 2019 palossa ja löytyi seuraavana päivänä maasta '
          + 'lommoilla.',
        lahde: 'Siren-Com, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Mitä tornin huipun kukon sisään oli suljettu?',
        'Miksi kuusitoista kuparipatsasta oli poissa katolta palon aikaan?',
        'Mitä uuden kukon sisään pantiin?',
      ],
      visa: {
        kysymys: 'Tornin huipulla seisonut kuparinen kukko luultiin ensin '
          + 'tuhoutuneeksi. Miten sille kävi?',
        vaihtoehdot: [
          'Se löytyi seuraavana päivänä maasta lommoilla',
          'Se sulaa löydettiin holvin raunioista',
          'Siitä jäi jäljelle vain pyhäinjäännökset',
        ],
        oikea: 0,
        fakta: 'Onnea oli muutenkin: kuusitoista kuparipatsasta oli nostettu '
          + 'katolta korjattavaksi neljä päivää ennen paloa.',
      },
      paikka: {
        nimi: 'Notre-Dame',
        laudat: {
          maailmankartta: { x: 5911.7, y: 1439.8 },
          europe: { x: 256.3, y: 608.8 },
        },
      },
    },
    {
      /*
       * LEHDEN SIVU 1 ("Pariisi"), nosto 4 — AINOA, JOKA JÄÄ
       * PÄÄKARTALLE (suunnitelman luku 4.7: *"Patonki → pääkartta
       * kaupungin viereen (ruoka-symboli)"*). Nostolla ei ole
       * kohdekarttapistettä, joten `karsiKaupunkikartanNostot` ei
       * pudota sitä, ja kaupunkiruuhkan katto (3 merkkiä säteellä 8)
       * kestää yhden.
       *
       * PAIKKA ON KAUPUNKI ITSE: kilpailu on koko kaupungin eikä
       * yhden leipomon, joten osoitetta ei keksitä. Kaupungin laatan
       * päälle osuvan merkin siirtää katkoviivan päähän sama kasauspassi
       * kuin muillakin merkeillä (js/fokusniput.js) — juuri se
       * "vähän kaupungin viereen", jota omistaja pyysi.
       */
      id: 'pariisin-patonki',
      nimio: 'Paras patonki',
      otsikko: 'Paras patonki valitaan sokkona',
      symboli: 'ruoka',
      lunastus: [
        'Kaupunki on järjestänyt vuodesta 1994 kilpailun parhaasta '
          + 'perinteisestä patongista, ja säännöt ovat tarkat: leivän pitää '
          + 'olla 55–65 senttiä pitkä ja painaa 250–300 grammaa. Mitä '
          + 'patongissa saa olla, on määrätty laissa — käytännössä vain '
          + 'vehnäjauhoa, vettä, suolaa ja hiivaa, eikä taikinaa saa missään '
          + 'vaiheessa pakastaa. Leivät numeroidaan ennen maistamista, jottei '
          + 'raati tiedä kenen leipää se arvostelee, ja raadissa istuu kuusi '
          + 'arvottua tavallista pariisilaista. Voittaja saa rahapalkinnon ja '
          + 'yhden velvollisuuden: hän toimittaa presidentinpalatsin leivät '
          + 'seuraavan vuoden ajan.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Pariisi", nosto "Paras patonki '
        + 'valitaan sokkona" (js/packs/kulttuuri-kategoriat.js). Teksti '
        + 'siirretty sanatarkasti karttauudistuksen erässä 5, 13.9.2026.',
      kuva: {
        tiedosto: '84 Boulevard de Port-Royal Bakery.jpg',
        lyhyt: 'Pariisi on järjestänyt vuodesta 1994 kilpailun parhaasta patongista presidentin leipojaksi.',
        selite: 'Pariisi on järjestänyt vuodesta 1994 kilpailun parhaasta '
          + 'perinteisestä patongista, ja voittaja toimittaa '
          + 'presidentinpalatsin leivät seuraavan vuoden ajan.',
        lahde: 'Lionel Allorge, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Miksi leivät numeroidaan ennen maistamista?',
        'Mitä patongissa saa lain mukaan olla?',
        'Mikä velvollisuus voittajalle tulee?',
      ],
      // Pariisi 48,8566 N / 2,3522 E — kaupungin oma osoite.
      paikka: {
        nimi: 'Pariisi',
        laudat: {
          maailmankartta: { x: 5911.7, y: 1439.6 },
          europe: { x: 256.4, y: 608.7 },
        },
      },
    },
    {
      /*
       * LEHDEN SIVU 2 ("Musiikki"), KOLME NOSTOA YHDEKSI
       * (suunnitelman luku 4.7: *"Yhdistetään yhdeksi nostoksi
       * 'Pariisi soi' → kohdekartta (Opéra)"*).
       *
       * KAPPALEITA ON KAKSI EIKÄ KOLME, ja se on sisältöpäätös, ei
       * unohdus: sivun kolmas nosto ("Carmen kaatui ensi-illassaan")
       * on tämän saman poolin nosto `carmenin-ensi-ilta`, jonka kortti
       * kertoo saman asian LAAJEMPANA ja jolla on oma piste
       * kohdekartalla. Sivuversion jokainen faktaväite on tuossa
       * kortissa (vertailu erän 5 raportissa), joten kappale on
       * pudotettu kaksoiskappaleena eikä asiatietona. Samasta syystä
       * osaston `johdanto` jäi pois: se ei esitä yhtään faktaa, jota
       * näissä kolmessa kortissa ei olisi.
       */
      id: 'pariisi-soi',
      nimio: 'Pariisi soi',
      otsikko: 'Pariisi soi — kadulta ja asuntovaunuleiriltä maineeseen',
      symboli: 'kulttuuri',
      lunastus: [
        'Édith Piaf syntyi Bellevillessä joulukuussa 1915. Tarinan mukaan '
          + 'hän syntyi kadulla talon portaille, vaikka syntymätodistuksessa '
          + 'lukee sairaala. Teininä hän lauloi kolikoista Pigallen kaduilla ja '
          + 'pihoissa sisarpuolensa kanssa. Yökerhon omistaja Louis Leplée '
          + 'kuuli hänet kadulta vuonna 1935 ja antoi lempinimen la Môme Piaf — '
          + 'piaf on pariisilaista puhekieltä ja tarkoittaa varpusta. Laulaja '
          + 'oli 142 senttiä pitkä. Tunnetuin laulu La Vie en rose ilmestyi '
          + '1946, ja sen sanat hän kirjoitti itse.',
        'Django Reinhardt kasvoi romaniperheen asuntovaunussa Pariisin '
          + 'porttien luona ja soitti banjoa pihoissa ja tanssipaikoissa jo '
          + 'lapsena. Lokakuussa 1928 vaunussa syttyi tulipalo: kynttilä kaatui '
          + 'selluloidikukkien päälle. Vasemman käden nimetön ja pikkurilli '
          + 'jäivät liikkumattomiksi, ja lääkärit sanoivat, ettei hän soita '
          + 'enää. Veli toi sairaalaan kitaran, ja Django opetteli soittamaan '
          + 'soolot kahdella sormella. Vuonna 1934 hän perusti Pariisissa '
          + 'yhtyeen Quintette du Hot Club de France.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Musiikki", nostot "Édith Piaf '
        + 'lauloi ensin kadulla" ja "Kaksi sormea riitti" '
        + '(js/packs/kulttuuri-kategoriat.js). Tekstit siirretty sanatarkasti '
        + 'karttauudistuksen erässä 5, 13.9.2026.',
      kuva: {
        tiedosto: 'Édith Piaf 914-6440.jpg',
        lyhyt: 'Édith Piaf esiintyi Rotterdamissa 1962, alle vuosi ennen kuolemaansa; lempinimi tarkoittaa varpusta.',
        selite: 'Édith Piaf esiintyi Rotterdamissa 13. joulukuuta 1962, alle '
          + 'vuosi ennen kuolemaansa; hänen lempinimensä la Môme Piaf '
          + 'tarkoittaa pariisilaisessa puhekielessä varpusta.',
        lahde: 'Eric Koch / Anefo, Wikimedia Commons (CC0)',
      },
      valokuva: {
        tiedosto: 'Reinhardt Harcourt 1944.jpg',
        lyhyt: 'Django Reinhardt perusti 1934 Hot Club de Francen ja soitti kahdella sormella palovamman jälkeen.',
        selite: 'Django Reinhardt perusti Pariisissa vuonna 1934 yhtyeen '
          + 'Quintette du Hot Club de France ja soitti soolonsa kahdella '
          + 'sormella tulipalossa vahingoittuneen vasemman kätensä takia.',
        lahde: 'Studio Harcourt, Wikimedia Commons (PD)',
      },
      kysymykset: [
        'Mistä lempinimi la Môme Piaf tuli?',
        'Miten Django Reinhardt opetteli soittamaan uudelleen?',
        'Millaista musiikkia Pariisin kaduilla kuultiin 1930-luvulla?',
      ],
      // Palais Garnier 48,8719 N / 2,3317 E — suunnitelman luku 4.7
      // ("kohdekartta (Opéra)"); sama koordinaatti kuin kartan omalla
      // Palais Garnier -kohteella.
      paikka: {
        nimi: 'Pariisi soi',
        laudat: {
          maailmankartta: { x: 5911.1, y: 1438.9 },
          europe: { x: 256.0, y: 608.3 },
        },
      },
    },
    {
      /*
       * LEHDEN SIVU 3 ("Historia"), SEITSEMÄSTÄ NOSTOSTA YKSI
       * (suunnitelman luku 4.7: *"Kolme parasta kohdekartan
       * pisteiksi, loput neljä yhdeksi nostoksi 'Pariisin
       * vuosisadat'"*).
       *
       * MITATTU LÄHTÖTILANNE: sivun kaikilla seitsemällä nostolla oli
       * jo karttapaikka — kuudella kohdekartalla ja yhdellä
       * pääkartalla. Kolme "parasta" ovat ne kolme, jotka osaston oma
       * johdanto nimeää (kyyhkyposti, Tuileriain rauniot ja
       * impressionistit); ne pysyvät omina karttapisteinään.
       *
       * KAPPALEITA ON KAKSI EIKÄ NELJÄ: neljästä jäljelle jääneestä
       * kaksi ("Kirahvi käveli Marseillesta Pariisiin" ja "Mies myi
       * Eiffel-tornin romuraudaksi") ovat tämän saman poolin nostoja
       * `kirahvin-kavelymatka` ja `lustig-eiffel`, joiden korteissa on
       * sivuversion jokainen faktaväite ja enemmänkin. Ne on siksi
       * pudotettu kaksoiskappaleina eikä asiatietona. Mukaan tulivat
       * ne kaksi, joiden sivuversiossa on faktoja, joita niiden omassa
       * karttakortissa EI ole (kaulanauhan 647 timanttia ja
       * ensimmäisen maksuerän erääntyminen; Vrain-Lucasin
       * lähettäjänimet sekä englantilaisten huomautus Newtonin iästä).
       * Rivikohtainen vertailu on erän 5 raportissa.
       *
       * POOLIN YHDEKSÄS = MINIKYSYMYS (kiintiö joka kolmas, erä 6).
       * Vastaus on yllä olevassa tekstissä sanatarkasti: *"Kaikki oli
       * kirjoitettu 1800-luvun ranskaksi."*
       */
      id: 'pariisin-vuosisadat',
      nimio: 'Pariisin vuosisadat',
      otsikko: 'Pariisin vuosisadat — kaulanauha, joka katosi, ja kirjeet, '
        + 'joita ei ollut',
      symboli: 'historia',
      lunastus: [
        'Hovin jalokivikauppiaat Boehmer ja Bassenge olivat koonneet 647 '
          + 'timantin kaulanauhan Ludvig XV:lle, mutta kuningas kuoli ennen '
          + 'kauppaa eikä Marie Antoinette huolinut sitä. Jeanne de la Motte '
          + '-niminen huijari sai kardinaali de Rohanin uskomaan, että '
          + 'kuningatar haluaa nauhan salaa ja tarvitsee välikäden. Todisteina '
          + 'olivat väärennetyt kirjeet ja yöllinen tapaaminen Versailles\'n '
          + 'puistossa, jossa kuningatarta esitti palkattu nuori nainen. Rohan '
          + 'osti nauhan tammikuussa 1785 kahdella miljoonalla livrellä ja '
          + 'luovutti sen huijarin lähetille; kivet pilkottiin ja myytiin '
          + 'Lontoossa ja Pariisissa. Kun ensimmäinen maksuerä erääntyi '
          + 'elokuussa, kauppiaat kääntyivät kuningattaren puoleen ja '
          + 'kardinaali pidätettiin Versailles\'ssa. Oikeus vapautti Rohanin '
          + '1786, mutta kuningattaren maine ei toipunut.',
        'Denis Vrain-Lucas myi 1860-luvulla matemaatikko Michel Chasles\'lle '
          + 'noin 27 000 käsin kirjoitettua kirjettä, joiden lähettäjiksi oli '
          + 'merkitty muun muassa Julius Caesar, Kleopatra, Aristoteles ja '
          + 'Kaarle Suuri. Kaikki oli kirjoitettu 1800-luvun ranskaksi. Chasles '
          + 'maksoi kokoelmasta noin 140 000 frangia ja esitteli 1867 '
          + 'tiedeakatemialle kirjeitä, joiden mukaan Blaise Pascal olisi '
          + 'keksinyt painovoimalain ennen Isaac Newtonia. Englantilaiset '
          + 'tutkijat huomauttivat, että Newton oli kirjeiden päiväyksen aikaan '
          + 'lapsi. Chasles piti kokoelmastaan kiinni vuosia, mutta väärentäjä '
          + 'tuomittiin helmikuussa 1870 kahdeksi vuodeksi vankeuteen.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Historia", nostot "Kaulanauha, '
        + 'joka ei koskaan päätynyt kuningattarelle" ja "Kleopatra kirjoitti '
        + 'ranskaksi — ja akateemikko uskoi" '
        + '(js/packs/kulttuuri-kategoriat.js). Tekstit siirretty sanatarkasti '
        + 'karttauudistuksen erässä 5, 13.9.2026.',
      kuva: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/kuvajono/skandaali-kaulanauhajuttu-1785.jpg',
        lyhyt: 'Jalokivikauppiaat esittelevät kaulanauhaa kardinaalille, joka uskoo ostavansa kuningattarelle.',
        selite: 'Jalokivikauppiaat esittelevät 647 timantin kaulanauhaa '
          + 'kardinaali de Rohanille, joka uskoi ostavansa sen kuningattaren '
          + 'puolesta.',
        lahde: 'Matkakirjan havainnekuva: kaulanauha luovutetaan kardinaalille',
      },
      valokuva: {
        osoite: 'https://media.matkakirja.app/kohtaamiset/kuvajono/skandaali-vrain-lucas-kirjevaarennokset.jpg',
        lyhyt: 'Michel Chasles tutkii suurennuslasilla Vrain-Lucasin toimittamia väärennettyjä kirjeitä.',
        selite: 'Michel Chasles tutkii suurennuslasilla yhtä niistä kirjeistä, '
          + 'joita Vrain-Lucas toimitti hänelle tuhansittain.',
        lahde: 'Matkakirjan havainnekuva: väärennöskokoelma tutkittavana',
      },
      kysymykset: [
        'Miksi kardinaali uskoi väärennetyt kirjeet?',
        'Mihin kaulanauhan timantit lopulta päätyivät?',
        'Miksi Chasles piti kokoelmastaan kiinni vuosia?',
      ],
      visa: {
        kysymys: 'Vrain-Lucas myi kirjeitä, joiden lähettäjiksi oli merkitty '
          + 'muun muassa Kleopatra ja Julius Caesar. Mikä niissä oli pielessä?',
        vaihtoehdot: [
          'Kaikki oli kirjoitettu 1800-luvun ranskaksi',
          'Ne oli päivätty samalle viikolle',
          'Paperissa ei ollut lainkaan vesileimaa',
        ],
        oikea: 0,
        fakta: 'Englantilaiset tutkijat huomauttivat lisäksi, että Newton oli '
          + 'kirjeiden päiväyksen aikaan lapsi. Väärentäjä tuomittiin '
          + 'helmikuussa 1870 kahdeksi vuodeksi vankeuteen.',
      },
      // Panthéon 48,8462 N / 2,3464 E. Kummankaan tarinan oma osoite ei
      // ollut vapaana: Vrain-Lucasilla on jo oma piste (Institut de
      // France) ja kaulanauhan Versailles on kohdekartan rajauksen
      // ulkopuolella. Panthéon on kartan oma historiakohde ja tämän
      // kortin ankkuri.
      paikka: {
        nimi: 'Pariisin vuosisadat',
        laudat: {
          maailmankartta: { x: 5911.5, y: 1440.1 },
          europe: { x: 256.3, y: 608.9 },
        },
      },
    },
