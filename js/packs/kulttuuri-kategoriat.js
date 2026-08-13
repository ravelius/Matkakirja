// Kaupungin kulttuurinostot kategorioittain.
//
// Omistajan toive: "sinne voisi lisätä myös nostoja enemmän ja
// jaotella ne kategorioiden mukaan — vain yksi kategoria näkyisi auki
// kerrallaan ja sen alla voisi olla useampi eri näyte. Tämän pelin
// rikkaus on kulttuuri, joten rakennetaan niitä lisää."
//
// Järjestys on harkittu eikä aakkosellinen. Tutki-ikkuna avautuu
// kaupunkiin SAAVUTTAESSA, joten ensimmäisenä on se, jonka matkaaja
// kohtaisi kadulla ensin — historia kertoo missä ollaan. Huumori on
// viimeisenä, koska se jää mieleen. Aisteihin vetoavat ovat keskellä.
//
// Jokainen kuva on tarkistettu Commonsista: tiedosto on olemassa,
// leveys vähintään 1200 px, lisenssi sallii käytön, tekijän nimi on
// kokonainen ja kuvan SISÄLTÖ vastaa selitettä. Viimeinen on tärkein
// — repon aiemmista kuvista on löytynyt useita, joiden selite kertoi
// eri asiasta kuin mitä kuvassa on.
//
// Tuotettu komennolla tools/kirjoita-kategoriat.mjs.
export const KULTTUURI_KATEGORIAT = {
  lontoo: [
    {
      id: 'kaupunki',
      nimi: 'Lontoo',
      johdanto: 'Kaupunki, jossa maailman ensimmäinen metro, vanhin jalkapallosarja '
        + 'ja tuhat vuotta kruunajaisia mahtuvat saman joen varrelle.',
      kansikuvat: [
        {
          tiedosto: 'Tower Bridge from Shad Thames.jpg',
          selite: 'Tower Bridge on avattu laivoille yli 130 vuotta — taustalla '
            + 'kohoaa Cityn lasinen siluetti.',
          lahde: 'Colin, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Palace of Westminster, London - Feb 2007.jpg',
          selite: 'Westminsterin palatsi ja Big Ben iltavalossa Thamesin takaa.',
          lahde: 'Diliff, Wikimedia Commons (CC BY-SA 2.5)',
        },
        {
          tiedosto: 'Red London Buses - geograph.org.uk - 2792011.jpg',
          selite: 'Punaiset kaksikerrosbussit ovat kuljettaneet lontoolaisia '
            + '1950-luvulta asti.',
          lahde: 'Colin Smith, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Canaletto maalasi myös Lontoon',
          tiedosto: 'Canaletto - Westminster Bridge, with the Lord Mayor\'s Procession on the Thames - Google Art Project.jpg',
          teksti: 'Sama venetsialainen Canaletto, jonka vedutoja selailit '
            + 'Venetsian lehdessä, muutti Lontooseen vuonna 1746 ja maalasi '
            + 'kaupunkia yhdeksän vuoden ajan. Hän toi Thamesille saman '
            + 'tarkan katseen kuin Canal Grandelle — ja siksi 1700-luvun '
            + 'Lontoo tunnetaan parhaiten venetsialaisen silmin.',
          selite: 'Westminster Bridge ja lordimayorin juhlakulkue (1747): upouusi '
            + 'silta, jota pidettiin aikansa ihmeenä, ja juhlaveneet kuin '
            + 'Venetsian regatassa.',
          lahde: 'Canaletto, Wikimedia Commons (PD)',
          wiki: 'Canaletto',
          galleria: [
            {
              otsikko: 'Thames ja Pyhän Paavalin katedraali',
              tiedosto: 'The Thames and the City Canaletto 46-47 National Gallery Prague.jpg',
              selite: 'Thames ja City (1746–47): Pyhän Paavalin kupoli hallitsee '
                + 'kaupunkia, ja joki kuhisee veneitä kuin laguuni.',
              lahde: 'Canaletto, Wikimedia Commons (PD)',
            },
            {
              otsikko: 'City sillan kaaren läpi',
              tiedosto: 'Canaletto - The City Seen Through an Arch of Westminster Bridge.JPG',
              selite: 'City rakenteilla olevan Westminster Bridgen kaaren läpi '
                + '(1747) — puutelineiltä katsottu kehys, jonka moderniutta '
                + 'ihmetellään yhä.',
              lahde: 'Canaletto, Wikimedia Commons (PD)',
            },
            {
              otsikko: 'Northumberland House',
              tiedosto: 'Northumberland House by Canaletto (1752).JPG',
              selite: 'Northumberland House Charing Crossilla (1752). Palatsi '
                + 'purettiin 1874 — Canaletton maalaus on sen tarkin '
                + 'muistikuva.',
              lahde: 'Canaletto, Wikimedia Commons (PD)',
            },
            {
              otsikko: 'Ranelaghin rotunda',
              tiedosto: 'Canaletto Ranelegh 1754.jpg',
              selite: 'Ranelagh Gardensin rotundan sisänäkymä (1754): Lontoon '
                + 'hienosto kierteli valtavan pyörösalin lattialla musiikin '
                + 'soidessa. Mozart esiintyi täällä kahdeksanvuotiaana.',
              lahde: 'Canaletto, Wikimedia Commons (PD)',
            },
          ],
        },
        {
          otsikko: 'Pubi, jossa Dickens istui',
          tiedosto: 'The George at Southwark (8553233399).jpg',
          teksti: 'The George on Lontoon viimeinen parvekekäytävällinen majatalo: '
            + 'tällaisten pihojen parvilta katsottiin näytelmiä jo '
            + 'Shakespearen aikaan. Nykyinen rakennus on vuodelta 1677, ja '
            + 'sen penkeillä istui aikanaan Charles Dickens, joka mainitsee '
            + 'pubin romaanissaan Pikku Dorrit. Talo on niin arvokas, että '
            + 'sen omistaa National Trust — olutta myydään silti joka päivä.',
          selite: 'The Georgen parvekekäytävät Southwarkissa. Kyltissä ratsastaa '
            + 'Yrjö-pyhimys, ja kello on käynyt pihalla 1600-luvulta.',
          lahde: 'It\'s No Game, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Charles Dickens',
        },
        {
          otsikko: 'Suojatie, jota jonotetaan',
          tiedosto: 'Abbey Road Zebra.jpg',
          teksti: 'Elokuun 8. päivänä 1969 neljä miestä käveli suojatien yli '
            + 'kahdeksan kertaa, kunnes valokuvaaja sai kuvansa. Kuvasta tuli '
            + 'The Beatlesin Abbey Road -levyn kansi ja suojatiestä maailman '
            + 'kuuluisin: turistit jonottavat yhä joka päivä ylittämään sen '
            + 'samassa rivissä, autoilijoiden kärsivällisyyttä koetellen. '
            + 'Ylityksellä on virallinen suojelumerkintä — ja taustan '
            + 'studiossa äänitetään musiikkia edelleen.',
          selite: 'Abbey Roadin suojatie St John\'s Woodissa hiljaisena hetkenä — '
            + 'ilman jonoa levynkansikävelijöitä.',
          lahde: 'Misterweiss, Wikimedia Commons (PD)',
          wiki: 'The Beatles',
          musiikki: 'https://music.apple.com/fi/album/come-together-2019-mix/1474815798?i=1474815799',
          musiikkiNimi: 'The Beatles Apple Musicissa',
          esikuuntelu: 'The Beatles Come Together',
        },
      ],
    },
    {
      id: 'nykytaide',
      nimi: 'Nykytaide',
      johdanto: 'Lontoossa nykytaide ei pysy museon seinällä: sitä maalataan '
        + 'junatunnelin kattoon, nostetaan tyhjälle patsasjalustalle ja '
        + 'kiedotaan liukumäeksi olympiapuiston veistoksen ympärille.',
      nostot: [
        {
          otsikko: 'Tunneli, jossa saa maalata',
          tiedosto: '2024-09-26 Leake Street, London graffiti tunnel 01.jpg',
          teksti: 'Waterloon aseman laiturien alla kulkee noin kolmesataa metriä '
            + 'pitkä tunneli, jossa seinien maalaaminen on sallittua — '
            + 'muualla Britanniassa luvaton graffiti on rangaistavaa. Tunneli '
            + 'avautui taiteelle toukokuussa 2008, kun Banksy järjesti siellä '
            + 'kolmipäiväisen Cans Festivalin. Autoja ajoi läpi vielä saman '
            + 'vuoden marraskuuhun asti, mutta nyt siellä vain kävellään. '
            + 'Seinät maalataan jatkuvasti uusiksi, joten aamulla ihailtu '
            + 'teos voi olla iltaan mennessä kadonnut toisen alle.',
          selite: 'Leake Streetin tunneli syyskuussa 2024, kuvattuna '
            + 'mustavalkoisena. Maali peittää seinät, pilarit ja kattopalkit, '
            + 'mutta asfalttilattia on jäänyt lähes paljaaksi. Tunnelin '
            + 'yläpuolella ovat Waterloon aseman laiturit.',
          lahde: 'Ted Potters, Wikimedia Commons (PD)',
          wiki: 'Banksy',
        },
        {
          otsikko: 'Tyhjä jalusta ja 2 400 ihmistä',
          tiedosto: 'Gormley-OneandOther-4thPlinth-TrafalgarSq-20090706.jpg',
          teksti: 'Trafalgar Squarella on neljä jalustaa. Kolmelle nousi patsas, '
            + 'mutta luoteiskulman jalusta jäi vuonna 1841 tyhjäksi, koska '
            + 'rahat loppuivat kesken. Yli 150 vuoden väittelyn jälkeen '
            + 'päätettiin, ettei sille tule pysyvää patsasta lainkaan: '
            + 'jalustalle nostetaan vuorotellen uusia nykytaideteoksia. '
            + 'Kesällä 2009 teoksena olivat ihmiset itse. Sadan päivän ajan, '
            + 'yötä päivää, 2 400 tavallista ihmistä sai kukin tunnin '
            + 'jalustan päällä ja teki siellä mitä halusi.',
          selite: 'Neljäs jalusta One & Other -teoksen avauspäivän iltana 6. '
            + 'heinäkuuta 2009. Jalustan päällä seisova osallistuja lukee '
            + 'papereistaan, ja reunalle on pingotettu turvaverkko. Taustalla '
            + 'näkyvät National Galleryn kupoli ja St Martin-in-the-Fieldsin '
            + 'kellotorni.',
          lahde: 'Simon Lee, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Antony Gormley',
        },
        {
          otsikko: 'Voimalasta tuli taidesali',
          tiedosto: 'Turbine Hall - Tate Modern - geograph.org.uk - 7509077.jpg',
          teksti: 'Tate Modern on entinen hiilivoimala Thamesin etelärannalla. '
            + 'Sen turbiinihalli on 155 metriä pitkä ja 35 metriä korkea, ja '
            + 'museo tilaa siihen kerrallaan yhden jättimäisen teoksen. '
            + 'Vuonna 2010 kiinalainen Ai Weiwei levitti hallin lattialle '
            + 'sata miljoonaa auringonkukansiementä. Jokainen siemen oli '
            + 'muotoiltu käsin posliinista ja maalattu yksitellen: noin 1 600 '
            + 'käsityöläistä Jingdezhenin kaupungissa teki niitä yli kaksi '
            + 'vuotta. Museoon pääsee sisään ilmaiseksi.',
          selite: 'Turbiinihalli huhtikuussa 2023 yläparvelta kuvattuna. Katosta '
            + 'riippuu Cecilia Vicuñan Brain Forest Quipu: kaksi 27 metriä '
            + 'korkeaa villasta ja kasvikuidusta kudottua veistosta, jotka '
            + 'päättyvät ihmisten päiden yläpuolelle. Seinillä kulkevat '
            + 'voimalan alkuperäisen siltanosturin kiskot.',
          lahde: 'Mr Ignavy, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Tate Modern',
        },
        {
          otsikko: 'Veistos, jonka sisällä on liukumäki',
          tiedosto: 'ArcelorMittal Orbit - geograph.org.uk - 6402522.jpg',
          teksti: 'Stratfordin olympiapuistossa seisoo 114,5 metriä korkea '
            + 'punainen teräsvyyhti, Britannian suurin julkinen taideteos. '
            + 'Sen suunnittelivat kuvanveistäjä Anish Kapoor ja insinööri '
            + 'Cecil Balmond vuoden 2012 olympialaisia varten. Ylhäällä on '
            + 'kaksi näköalatasannetta, ja alas pääsee 455 porrasta pitkin. '
            + 'Vuonna 2016 veistokseen kiedottiin toinen taideteos: Carsten '
            + 'Höllerin 178 metriä pitkä liukumäki, maailman pisin '
            + 'tunneliliukumäki. Matka alas kiertyy kaksitoista kertaa ja '
            + 'kestää noin 40 sekuntia.',
          selite: 'ArcelorMittal Orbit tammikuussa 2020. Punaisen teräsristikon '
            + 'ympäri kiertyy harmaa liukumäkiputki, ja ylempänä erottuu '
            + 'näköalatasanteen lasiseinä. Taustalla kohoavat Stratfordin '
            + 'tornitalot.',
          lahde: 'Ian S, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Anish Kapoor',
        },
      ],
      tehtava: {
        kysymys: 'Mitä Ai Weiwei levitti Tate Modernin turbiinihallin lattialle '
          + 'vuonna 2010?',
        vaihtoehdot: [
          'Meren simpukankuoria',
          'Kirjavia lasihelmiä',
          'Auringonkukansiemeniä',
          'Pyöreitä jokikiviä',
        ],
        oikea: 2,
        fakta: 'Turbiinihallin lattialle levitettiin sata miljoonaa käsin '
          + 'muotoiltua posliinikappaletta, joista jokainen näytti '
          + 'auringonkukan siemeneltä.',
      },
    },
  ],
  /*
   * Venetsian KANSISIVU (maa–kaupunki-pilotti 5.8.2026): kaupungin oma
   * aihe kertoo paikallisen, ja Italian yhteiset aiheet tulevat perään
   * js/packs/maa-kategoriat.js:stä (ks. js/ui.js rakennaSivut).
   * Nostot siirrettiin europe-kulttuuri.js:n litteästä taulusta
   * sellaisinaan — kuvat on tarkistettu jo silloin ja ne ovat
   * peilissä. Litteään tauluun jäi vain kulttuurivisa (v220 sääntö).
   */
  kairo: [
    {
      id: 'kaupunki',
      nimi: 'Kairo',
      johdanto: 'Tuhannen minareetin kaupunki, jossa faaraoiden aika ja '
        + 'kahdenkymmenen miljoonan ihmisen arki mahtuvat samaan '
        + 'katukuvaan.',
      /*
       * Lehden etusivun kuvat: sama malli kuin Venetsiassa — oma,
       * tarkistettu valinta. Ensimmäinen on iso pääkuva, loput
       * pienempien kuvien rivissä.
       */
      kansikuvat: [
        {
          tiedosto: 'All Gizah Pyramids.jpg',
          selite: 'Gizan pyramidit kaupungin laidalla — ainoa pystyssä '
            + 'säilynyt antiikin seitsemästä ihmeestä.',
          lahde: 'Ricardo Liberato, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Cairo Citadel P1020127.jpg',
          lahde: 'Nikolay Chakrakchiev, Wikimedia Commons (CC BY 3.0)',
          selite: 'Näkymä Kairon linnoitukselta kaupungin ylle. Etualalla '
            + 'kohoavat Sulttaani Hassanin ja al-Rifa\'in moskeijoiden '
            + 'minareetit, taustalla keskustan tornit.',
        },
        {
          tiedosto: 'Khan el-Khalili, Cairo Egypt - panoramio (7).jpg',
          selite: 'Khan el-Khalilin basaarissa on käyty kauppaa samoilla '
            + 'kujilla 1300-luvulta asti.',
          lahde: 'The Erica Chang, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Roberts piirsi Kairon',
          tiedosto: 'Cairo, looking west, Egypt. Coloured lithograph by Louis Haghe Wellcome V0049365.jpg',
          teksti: 'Skotlantilainen David Roberts matkusti Egyptiin 1838 '
            + 'ja piirsi Kairoa kuukausien ajan kaduilta ja katoilta. '
            + 'Litografioiksi painetut kuvat olivat monelle '
            + 'eurooppalaiselle ensimmäinen näkymä kaupunkiin, josta oli '
            + 'siihen asti vain kuultu tarinoita.',
          selite: 'Kairo lännestä katsottuna (1849): minareettien metsä '
            + 'täyttää kaupungin, ja taivaanrannassa siintävät Gizan '
            + 'pyramidit.',
          lahde: 'David Roberts / Wellcome Collection, Wikimedia Commons (CC BY 4.0)',
          wiki: 'David Roberts',
          /*
           * Selattava galleria kuten Venetsian Canaletto: lisää
           * Robertsin Kairo-litografioita saman noston nuolista.
           */
          galleria: [
            {
              otsikko: 'Metwaleyn portti',
              tiedosto: 'Gateway of the Metwaleys with minarets, Cairo, Egypt. Colour Wellcome V0049383.jpg',
              selite: 'Bab Zuweilan portti kaksoisminareetteineen: portin '
                + 'varjossa käy basaarikauppa kuten Robertsin aikaan — '
                + 'portti on yhä pystyssä.',
              lahde: 'David Roberts / Wellcome Collection, Wikimedia Commons (CC BY 4.0)',
            },
            {
              otsikko: 'Linnoitus',
              tiedosto: 'Cairo with the residence of Mehemet Ali in the citadel, Egyp Wellcome V0049375.jpg',
              selite: 'Kairon linnoituskukkula Muhammad Alin aikana: '
                + 'kamelikaravaani lepää muurin juurella, ja kukkulalla '
                + 'rakennetaan juuri sitä moskeijaa, joka nyt hallitsee '
                + 'siluettia.',
              lahde: 'David Roberts / Wellcome Collection, Wikimedia Commons (CC BY 4.0)',
            },
            {
              otsikko: 'Kalifien haudat',
              tiedosto: 'Mosque of Ayed Bey, with other tombs of the caliphs, Cairo, Wellcome V0049368.jpg',
              selite: 'Kalifien hautakaupunki muurien ulkopuolella: '
                + 'kupolien ja minareettien kaupunginosa, jossa asutaan '
                + 'yhä — hautojen keskellä.',
              lahde: 'David Roberts / Wellcome Collection, Wikimedia Commons (CC BY 4.0)',
            },
            {
              otsikko: 'Vesijohto Niililtä',
              tiedosto: 'The aqueduct seen from the the Island of Rhoda, Cairo, Egypt Wellcome V0012305.jpg',
              selite: 'Keskiaikainen vesijohto kantoi Niilin vettä '
                + 'linnoitukselle asti. Etualalla joen veneitä Rhodan '
                + 'saaren rannassa.',
              lahde: 'David Roberts / Wellcome Collection, Wikimedia Commons (CC BY 4.0)',
            },
          ],
        },
        {
          otsikko: 'Basaari ja kirjailijan kahvila',
          tiedosto: 'Kairo 2016-03-28h.jpg',
          teksti: 'Khan el-Khalilin kujilla on myyty mausteita, kultaa ja '
            + 'lyhtyjä 1300-luvulta asti, ja tinkiminen kuuluu kauppaan '
            + 'yhä. Basaarin sydämessä el-Fishawin kahvila on tarjoillut '
            + 'teetä yli kaksisataa vuotta — sen peilisalissa istui '
            + 'iltojaan myös Naguib Mahfouz, joka sai Kairon kujista '
            + 'kirjoittamistaan romaaneista Nobelin 1988, ensimmäisenä '
            + 'arabiaksi kirjoittavana kirjailijana.',
          selite: 'El-Fishawin kahvilan ovi Khan el-Khalilin kujalla: '
            + 'kullattu peili, puiset ristikkoseinät ja teelasit '
            + 'odottamassa.',
          lahde: 'Djehouty, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Naguib Mahfouz',
        },
        {
          /*
           * Siirretty litteästä taulusta (africa-kulttuuri.js), koska
           * kategoriat korvaavat litteät nostot — musiikkilinkki ja
           * visan aihe pysyvät näin näkyvissä. Kuva on 548 px leveä eli
           * alle nykysäännön, mutta se on ollut pelissä alusta asti ja
           * on aidosti paras vapaa kuva laulajasta.
           */
          otsikko: 'Umm Kulthum, Egyptin ääni',
          tiedosto: 'Umm Kulthum4.jpg',
          teksti: 'Laulajatar Umm Kulthum oli arabimaailman rakastetuin '
            + 'ääni: kun hänen radiokonserttinsa alkoi kuun ensimmäisenä '
            + 'torstaina, Kairon kadut hiljenivät ja kahvilat täyttyivät '
            + 'kuuntelijoista. Yksi laulu saattoi kestää tunnin, eikä '
            + 'kukaan pitänyt sitä pitkänä.',
          selite: 'Umm Kulthum mikrofonin äärellä uransa alkupuolella. '
            + 'Tunnusmerkit olivat aina samat: tummat lasit, nenäliina '
            + 'kädessä ja orkesteri takana — ja ääni, jota kutsuttiin '
            + 'Egyptin neljänneksi pyramidiksi.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Umm Kulthum',
          musiikki: 'https://music.apple.com/fi/album/enta-oumry-remastered/922753882?i=922753943',
          musiikkiNimi: 'Umm Kulthum Apple Musicissa',
          // Laulajan rakastetuin kappale.
          esikuuntelu: 'Umm Kulthum Enta Omri',
        },
      ],
    },
    /*
     * Kairon AIHESIVU (12.8.2026). Auditissa Kairo oli ainoa
     * kaupunkilehti ilman aihesivua: kannella oli neljä nostoa eikä
     * minitehtävää ollut lainkaan. Kannen neljäs nosto (Description de
     * l'Égypten kartta 1809) siirtyi tänne, ja sen eteen kirjoitettiin
     * kaksi juttua, jotka tekevät sivusta aikajanan 641 → 970 → 1809.
     *
     * Aiheet on valittu niin, etteivät ne osu Egyptin maalehden
     * yhdeksään sivuun (EGY maa-kategoriat.js) eivätkä kannen omiin
     * nostoihin: sitadelli on jo kansikuvana ja Metwaleyn portti
     * Robertsin galleriassa.
     */
    {
      id: 'historia',
      nimi: 'Historia',
      johdanto: 'Kairo alkoi telttaleiristä Niilin itärannalla vuonna '
        + '641. Kolmesataa vuotta myöhemmin uuden kaupungin moskeijaan '
        + 'tuli oppilaita koko islamilaisesta maailmasta, ja 1800-luvun '
        + 'alussa koko kaupunki mahtui vielä yhdelle kartalle.',
      nostot: [
        {
          otsikko: 'Kaupunki alkoi teltasta',
          tiedosto: 'December photowalk - inside \'Amr ibn al-\'As mosque 3.jpg',
          teksti: 'Kairon vanhin kaupunginosa syntyi telttaleiristä. '
            + 'Arabijoukkojen komentaja Amr ibn al-As jätti oman '
            + 'telttansa purkamatta Niilin itärannalle vuonna 641 — '
            + 'tarinan mukaan siksi, että kyyhky oli muninut siihen. '
            + 'Leiristä kasvoi al-Fustat, ja sen keskelle nousi vuonna '
            + '642 Egyptin ensimmäinen moskeija: matala vaja, jonka '
            + 'pylväinä olivat halkaistut palmunrungot ja lattiana '
            + 'sora. Fustat oli maan pääkaupunki noin viisisataa '
            + 'vuotta. Ensimmäisestä moskeijasta ei ole jäljellä '
            + 'mitään: sali on rakennettu uudelleen kerta toisensa '
            + 'jälkeen.',
          selite: 'Amr ibn al-Asin moskeijan rukoussali nykyään. '
            + 'Marmoripylväiden rivit kantavat teräväkärkisiä kaaria '
            + 'ja puisia vetopalkkeja, katosta riippuu lamppuja ja '
            + 'lattialla on punainen matto.',
          lahde: 'Protious, Wikimedia Commons (CC0)',
        },
        {
          otsikko: 'Tuhat vuotta oppitunteja pihalla',
          tiedosto: 'Egypt, Cairo, Islamic scholars in the courtyard of Al-Azhar University.jpg',
          teksti: 'Fatimidien kenraali Jawhar aloitti al-Azharin '
            + 'rakentamisen vuonna 970, ja ensimmäinen perjantairukous '
            + 'pidettiin siellä kesäkuussa 972. Rukoussalin '
            + 'marmoripylväät kerättiin vanhemmista rakennuksista, ja '
            + 'eripituiset pylväät tasattiin eri paksuisilla '
            + 'jalustoilla. Vuonna 988 visiiri Yaqub ibn Killis '
            + 'palkkasi moskeijaan 35 oppinutta vakituiseen työhön. '
            + 'Tutkintotodistuksia ei jaettu: opinnot kestivät '
            + 'keskimäärin kuusi vuotta, ja yksittäinen opettaja '
            + 'päätti itse, milloin oppilas oli valmis. Opiskelijat '
            + 'asuivat riwaq-osastoissa kotiseutunsa mukaan.',
          selite: 'Kaksi al-Azharin oppinutta keskustelee moskeijan '
            + 'marmoripihalla, toisella papereita kädessä. Taustalla '
            + 'istuu oppilaita lattialla puisen ristikkoseinän edessä, '
            + 'ja pihaa kiertävät koristeellisin kapiteelein veistetyt '
            + 'pylväät.',
          lahde: 'Vyacheslav Argenberg, Wikimedia Commons (CC BY 4.0)',
        },
        {
          /*
           * Vanha kartta -nosto (uusi lähdeidea 5.8.2026): Napoleonin
           * retkikunnan kartat ovat PD:nä Commonsissa, ja "silloin ja
           * nyt" istuu isoisän matkakirjan kehykseen. Sama vinkki on
           * monistusohjeessa muillekin kaupungeille.
           */
          otsikko: 'Kairo kartalla vuonna 1809',
          tiedosto: 'Environs du Kaire (Cairo). Plan général de Boulâq, du Kaire, de l\'île de Roudah (el-Rôda), du Vieux Kaire et de Gyzeh (Jîzah) (NYPL b14212718-1268726).jpg',
          teksti: 'Napoleonin retkikunnan tutkijat mittasivat Kairon '
            + 'kadut ja piirsivät kaupungin karttaan, joka painettiin '
            + 'jättimäiseen Description de l\'Égypte -teossarjaan. '
            + 'Kartalla Kairo on tiivis täplä Niilin itärannalla — '
            + 'ympärillä peltoja, palmulehtoja ja aavikkoa. Sama '
            + 'kaupunki levittäytyy nyt yli kahdenkymmenen miljoonan '
            + 'ihmisen suurkaupunkina joen molemmin puolin, ja kartan '
            + 'pellot ovat katuja. Vertaa etusivun ilmakuvaan: '
            + 'pyramidit seisovat yhä paikallaan, kaupunki tuli niiden '
            + 'luo.',
          selite: 'Kairon seudun yleiskartta Description de l\'Égypte '
            + '-sarjasta (1809): Bulaq, Kairo, Rodan saari, Vanha '
            + 'Kairo ja Giza.',
          lahde: 'Imprimerie impériale / NYPL, Wikimedia Commons (PD)',
          wiki: 'Description de l\'Égypte',
        },
      ],
      tehtava: {
        kysymys: 'Keneltä al-Azharin oppilas sai todistuksen '
          + 'opinnoistaan?',
        vaihtoehdot: [
          'Yksittäiseltä opettajalta',
          'Kaupungin päätuomarilta',
          'Kalifin hovin virastolta',
          'Moskeijan rahastonhoitajalta',
        ],
        oikea: 0,
        fakta: 'Tutkintojärjestelmää ei ollut: opinnot kestivät '
          + 'keskimäärin kuusi vuotta, ja opettaja päätti itse, '
          + 'milloin oppilas oli valmis.',
      },
    },
  ],
  /*
   * Madridin KANSISIVU (lehtimaa 4: Espanja, 6.8.2026). Espanjan
   * yhteiset aiheet tulevat perään js/packs/maa-kategoriat.js:stä
   * (ESP), ja sama maaosasto palvelee myös Barcelonaa ja Granadaa.
   *
   * Litteät nostot europe-kulttuuri.js:ssä purettiin ohjeen mukaan
   * (docs/tutki-aiheet.md kohta 1): chotis siirtyi tänne
   * musiikkilinkkeineen — se on myös kulttuurivisan aihe, joten visan
   * vastaus löytyy kannelta — ja cocido sekä uudenvuoden rypäleet
   * siirtyivät Espanjan Ruoka-aiheeseen, jonne ne kuuluvat: molemmat
   * ovat koko maan tapoja, vaikka cocidon nimessä lukee Madrid.
   */
  /*
   * Tukholman kansi (v315). Litteät nostot (europe-kulttuuri.js) on
   * siirretty tänne monistusohjeen mukaan: ABBA Apple Music -linkkeineen
   * ja metron taide, joka on myös visan aihe — siksi se on kannessa.
   * Fika siirtyi maan Ruoka-aiheeseen kanelipullana.
   */

  praha: [
    {
      id: 'kaupunki',
      nimi: 'Praha',
      johdanto: 'Sata tornia, kello joka näyttää auringon paikan taivaalla — ja '
        + 'savesta tehty jättiläinen ullakolla.',
      kansikuvat: [
        {
          tiedosto: 'The Vltava, Charles Bridge, Old Town Bridge Tower and Church of St. Francis of Assisi. Prague, Czech Republic.jpg',
          selite: 'Kaarlensilta ja Vltava iltapäivän valossa. Sillan päässä '
            + 'seisoo vanhankaupungin sillantorni, jonka läpi kuninkaat '
            + 'ratsastivat kruunajaisiinsa.',
          lahde: 'Ввласенко, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Old Town Square (Prague) 20150902.jpg',
          selite: 'Vanhankaupungin tori illalla. Kaksi mustaa tornia kuuluu Tynin '
            + 'kirkolle — niitä kutsutaan Aatamiksi ja Eevaksi, koska toinen '
            + 'on hitusen paksumpi.',
          lahde: 'Suicasmo, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Lascar Pražský hrad (Prague Castle) and St. Vitus Cathedral (4502233528).jpg',
          selite: 'Prahan linna mäen päällä. Pyhän Vituksen katedraali kohoaa '
            + 'keskeltä; linnaa pidetään maailman suurimpana yhtenäisenä '
            + 'linnana.',
          lahde: 'Jorge Láscar, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Kello, joka näyttää missä aurinko on',
          tiedosto: 'Praha Astronomical Clock 01.jpg',
          teksti: 'Vanhankaupungin raatihuoneen seinässä käy kello vuodelta 1410. '
            + 'Se on maailman vanhin astronominen kello, joka yhä toimii. '
            + 'Viisarit eivät kerro vain kellonaikaa: kultainen käsi näyttää '
            + 'auringon paikan taivaalla, toinen kuun, ja sininen kaari '
            + 'erottaa päivän yöstä. Joka tasatunti kaksitoista apostolia '
            + 'kulkee kellon yläpuolella olevien luukkujen ohi, ja niiden '
            + 'vieressä seisova luuranko kääntää tiimalasinsa ympäri.',
          selite: 'Orloj kokonaisuudessaan. Ylhäällä ovat pienet luukut, joista '
            + 'apostolit kulkevat, keskellä sinivalkoinen tähtikellotaulu ja '
            + 'alhaalla kultainen kalenterikiekko.',
          lahde: 'Uoaei1, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Prahan astronominen kello',
        },
        {
          otsikko: 'Kaarle IV rakensi sillan ja yliopiston',
          tiedosto: 'Charles IV.jpg',
          teksti: 'Kaarle IV oli Böömin kuningas ja Saksalais-roomalaisen '
            + 'keisarikunnan keisari, ja hän teki Prahasta valtakuntansa '
            + 'pääkaupungin. Hänen aikanaan kaupunki sai yliopiston, kokonaan '
            + 'uuden kaupunginosan ja kivisillan Vltavan yli. Silta '
            + 'aloitettiin vuonna 1357 hetkellä, jonka numerot luetaan yhtä '
            + 'lailla eteen- ja taaksepäin: 1-3-5-7-9-7-5-3-1. Se kantaa yhä, '
            + 'ja sitä sanotaan Kaarlensillaksi.',
          selite: 'Kaarle IV kruunu päässään 1300-luvun maalauksessa. Viitassa on '
            + 'kuvioina pieniä kotkia, keisarikunnan tunnuseläimiä.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Kaarle IV',
        },
        {
          otsikko: 'Golem nukkuu ullakolla',
          tiedosto: 'Old New Synagogue 01(js).jpg',
          teksti: 'Prahan juutalaiskorttelin vanhinta synagogaa sanotaan '
            + 'Vanhaksiuudeksi. Se valmistui 1200-luvulla ja on yhä käytössä. '
            + 'Tarinan mukaan rabbi Löw muovasi 1500-luvulla Vltavan savesta '
            + 'Golemin, ihmisen kokoisen apurin, joka heräsi henkiin suuhun '
            + 'asetetusta lapusta. Kun Golem kävi liian voimakkaaksi, rabbi '
            + 'otti lapun pois ja kantoi hahmon synagogan ullakolle. Sinne ei '
            + 'tarinan mukaan saa nousta.',
          selite: 'Vanhauusi synagoga jyrkkine tiilikattoineen. Takana näkyy '
            + 'juutalaisen raatihuoneen kellotorni.',
          lahde: 'Jerzy Strzelecki, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Golem',
        },
      ],
    },
    {
      id: 'musiikki',
      nimi: 'Musiikki',
      johdanto: 'Kaksi säveltäjää teki Prahan joesta ja kylien tansseista '
        + 'musiikkia, jota soitetaan kaikkialla maailmassa.',
      nostot: [
        {
          otsikko: 'Kuuro mies sävelsi joen',
          tiedosto: 'Jan Vilímek - Bedřich Smetana.jpg',
          teksti: 'Bedřich Smetana menetti kuulonsa kokonaan lokakuussa 1874. '
            + 'Alle kaksi kuukautta myöhemmin, 20. marraskuuta ja 8. '
            + 'joulukuuta välisenä aikana, hän sävelsi Vltavan — teoksen, '
            + 'joka seuraa jokea kahdesta pienestä lähteestä Prahaan asti. '
            + 'Matkalla kuuluu metsästystorvia, häätanssi ja kuutamo, kunnes '
            + 'joki jyrisee koskessa. Hän ei kuullut teostaan koskaan. '
            + 'Vuodesta 1952 Prahan kevät -festivaali on alkanut joka 12. '
            + 'toukokuuta juuri tällä musiikilla.',
          selite: 'Bedřich Smetana (1824–1884) Jan Vilímekin litografiassa. '
            + 'Vltava on osa kuuden sinfonisen runon sarjaa Má vlast eli '
            + 'Isänmaani.',
          lahde: 'Jan Vilímek, Wikimedia Commons (PD)',
          wiki: 'Bedřich Smetana',
          musiikki: 'https://music.apple.com/fi/search?term=smetana%20vltava',
          musiikkiNimi: 'Smetanan Vltava Apple Musicissa',
          musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/39/Smetana%2C_M%C3%A1_vlast_-_Vltava_-_The_Moldau.ogg/Smetana%2C_M%C3%A1_vlast_-_Vltava_-_The_Moldau.ogg.mp3',
          musiikkiNayteNimi: 'Smetana: Vltava — Musopen Symphony Orchestra (CC0)',
        },
        {
          otsikko: 'Dvořák vei kylätanssit maailmalle',
          tiedosto: 'Jan Langhans Antonin Dvorak 1904 (cropped).jpg',
          teksti: 'Antonín Dvořák oli teurastajan poika, joka soitti alttoviulua '
            + 'prahalaisessa orkesterissa ennen kuin hänen sävellyksensä '
            + 'löydettiin. Slaavilaiset tanssit tekivät hänestä kuuluisan: '
            + 'niissä soi böömiläisten ja määriläisten kylien tanssimusiikki '
            + 'sinfoniaorkesterille kirjoitettuna. Myöhemmin hän johti '
            + 'musiikkikoulua New Yorkissa ja sävelsi siellä sinfonian '
            + 'nimeltä Uudesta maailmasta.',
          selite: 'Antonín Dvořák valokuvaaja Jan Langhansin edessä vuonna 1904, '
            + 'hänen viimeisenä elinvuotenaan.',
          lahde: 'Jan Nepomuk Langhans, Wikimedia Commons (PD)',
          wiki: 'Antonín Dvořák',
          musiikki: 'https://music.apple.com/fi/search?term=dvorak%20slavonic%20dances',
          musiikkiNimi: 'Dvořákin Slaavilaiset tanssit Apple Musicissa',
        },
      ],
      tehtava: {
        kysymys: 'Millä soittimella Antonín Dvořák soitti prahalaisessa '
          + 'orkesterissa ennen kuuluisuuttaan?',
        vaihtoehdot: [
          'Kirkon uruilla',
          'Käyrätorvella',
          'Alttoviululla',
          'Kontrabassolla',
        ],
        oikea: 2,
        fakta: 'Ennen kuin Dvořákin omat sävellykset huomattiin, hän oli '
          + 'prahalaisen orkesterin alttoviulisti.',
      },
    },
  ],
  wien: [
    {
      id: 'kaupunki',
      nimi: 'Wien',
      johdanto: 'Kaupunki, jossa keisari söi aamiaista eläintarhan keskellä ja '
        + 'jonka kuuluisin ratas kulkee hitaammin kuin sinä kävelet.',
      kansikuvat: [
        {
          tiedosto: 'Wien Stephansdom dach.jpg',
          selite: 'Stephansdomin kattoa läheltä: siihen on ladottu noin 250 000 '
            + 'lasitettua tiiltä kymmenessä eri värissä. Kuoriosan '
            + 'eteläpuolella levittää siipiään kaksipäinen keisarinkotka, ja '
            + 'sen ympärillä lukee nurkka kerrallaan 1-8-3-1, katon '
            + 'uusimisvuosi.',
          lahde: 'Andrzej Otrębski, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Schönbrunn September 2023 1.jpg',
          selite: 'Schönbrunnin keltainen kesäpalatsi ja sen tyhjä kunniapiha '
            + 'iltapäivän valossa. Palatsin takana olevassa puistossa toimii '
            + 'maailman vanhin eläintarha.',
          lahde: 'Conny Duck, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: '2019 - Wiener Staatsoper im Morgengrauen.jpg',
          selite: 'Valtionoopperan talo aamuhämärässä, taivas vielä punaisena. '
            + 'Sen editse kaartaa Ring — kehäkatu, joka rakennettiin puretun '
            + 'kaupunginmuurin paikalle ja jolla kulkevat raitiovaunun '
            + 'kiskot.',
          lahde: 'Moahim, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Ratas, joka kulkee kävelyä hitaammin',
          tiedosto: 'Riesenrad Wiener Prater 2020-07-12 d.jpg',
          teksti: 'Praterin jättiratas nousi vuonna 1897 keisari Frans Joosefin '
            + '50-vuotisen hallitsijajuhlan kunniaksi. Se ei ole ympyrä vaan '
            + 'kolmikymmenkulmio: yksi kulma jokaista alkuperäistä vaunua '
            + 'kohti. Vaunuja oli kolmekymmentä, kunnes ratas paloi '
            + 'huhtikuussa 1945. Kun se avattiin uudelleen 1947, vaunuja '
            + 'ripustettiin takaisin vain viisitoista — ja niin ne roikkuvat '
            + 'siitä asti joka toisessa kulmassa. Ratas kulkee 2,7 kilometriä '
            + 'tunnissa.',
          selite: 'Punainen vaunu numero 4 riippuu rattaan kaarevasta kehästä. '
            + 'Vaunut ovat pieniä puutaloja ovineen ja ikkunoineen, eivät '
            + 'avoimia istuimia.',
          lahde: 'Manfred Werner (Tsui), Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Prater',
          galleria: [
            {
              otsikko: 'Koko ratas kerralla',
              tiedosto: 'Wiener Riesenrad DSC02378.JPG',
              selite: 'Jättiratas ukkospilvien edessä: valkoinen teräskehä, jonka '
                + 'reunalla roikkuu viisitoista punaista vaunua tasavälein, '
                + 'ja alla kaksi jalkaa kuin A-kirjain.',
              lahde: 'David Monniaux, Wikimedia Commons (CC BY-SA 3.0)',
            },
          ],
        },
        {
          otsikko: 'Keisarin aamiaishuone eläintarhan keskellä',
          tiedosto: 'Tiergarten Schönbrunn Kaiserpavillion 2.jpg',
          teksti: 'Maria Teresian puoliso Frans Stefan teetti Schönbrunnin '
            + 'puistoon eläintarhan, joka esiteltiin vieraille kesällä 1752. '
            + 'Se on maailman vanhin yhä toimiva eläintarha. Keskelle '
            + 'valmistui 1759 kahdeksankulmainen paviljonki, jonka '
            + 'keisariperhe rakennutti aamiaishuoneekseen. Sen ympärille oli '
            + 'asetettu kaksitoista samankokoista tarhaa kuin kakunpalat, '
            + 'joten pöydästä näki joka suuntaan eläimiä. Paviljonki on '
            + 'nykyään ravintola.',
          selite: 'Kahdeksankulmainen keisaripaviljonki: vaaleankeltainen '
            + 'julkisivu, vihreäksi hapettunut kuparikatto ja portaiden '
            + 'edessä ravintolan valkoisia päivänvarjoja.',
          lahde: 'Geolina163, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Tiergarten Schönbrunn',
          galleria: [
            {
              otsikko: 'Norsut paviljongin edessä',
              tiedosto: 'Historisches Bild Elefanten.jpg',
              selite: 'Vanha postikorttimaalaus Schönbrunnin norsutarhasta: kolme '
                + 'aikuista norsua ja yksi poikanen hiekkakentällä, aidan '
                + 'takana katsojia ja taustalla keisaripaviljongin kupoli.',
              lahde: 'Ludwig Hans Fischer, Wikimedia Commons (PD)',
            },
          ],
        },
        {
          otsikko: 'Valkoiset hevoset syntyvät tummina',
          tiedosto: 'Kawecan.jpg',
          teksti: 'Hofburgin palatsissa toimii ratsastuskoulu, jonne '
            + 'lipizzanoriit tuodaan nelivuotiaina Piberin siitostallilta '
            + 'Steiermarkista. Valkoisia ne eivät silloin vielä ole: varsat '
            + 'syntyvät ruunikkoina tai mustina ja vaalenevat vuosi vuodelta, '
            + 'kunnes ovat 6–10 vuoden iässä valkoisia. Perinne vaatii, että '
            + 'tallissa on aina myös yksi ruunikko. Ratsastajat tervehtivät '
            + 'salin seinällä olevaa keisari Kaarle VI:n muotokuvaa ennen '
            + 'kuin ratsastavat.',
          selite: 'Valkoisen lipizzanoriin pää lähikuvassa Stallburgin pihalla. '
            + 'Kuonon ympärillä on nahkainen kapistin, ja takana kohoaa '
            + 'kolmikerroksinen kaarikäytävä, jonka takana ovat tallit.',
          lahde: 'Eerschay, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Espanjalainen ratsastuskoulu',
        },
      ],
    },
    {
      id: 'musiikki',
      nimi: 'Musiikki',
      johdanto: 'Valssi, jonka toinen isku tulee etuajassa, ja satuooppera, joka '
        + 'kirjoitettiin esikaupungin puiselle näyttämölle.',
      nostot: [
        {
          otsikko: 'Kaupunki sävelsi oman jokensa',
          tiedosto: 'Johann Strauss II by Fritz Luckhardt.jpg',
          teksti: 'Johann Strauss nuoremman valssi Tonava kaunoinen '
            + 'kantaesitettiin Wienissä 15. helmikuuta 1867 — ensin '
            + 'mieskuorolle, vasta myöhemmin pelkälle orkesterille. '
            + 'Wieniläisvalssissa toinen isku tulee hitusen etuajassa, joten '
            + 'se ei mene metronomin kanssa tasan: sitä ei voi laskea, se '
            + 'pitää tuntea. Strauss sävelsi noin viisisataa teosta ja johti '
            + 'orkesteriaan viulu kädessä, soittaen ja tahdittaen yhtä aikaa.',
          selite: 'Johann Strauss nuorempi ateljeekuvassa vuodelta 1899, hänen '
            + 'viimeiseltä elinvuodeltaan: tumma takki ja liivi, leveä kihara '
            + 'parta ja ylös kaartuvat viikset. Kortin alareunaan on painettu '
            + 'valokuvaamon nimi.',
          lahde: 'Fritz Luckhardt, Wikimedia Commons (PD)',
          wiki: 'Johann Strauss nuorempi',
          musiikki: 'https://music.apple.com/fi/search?term=Johann%20Strauss%20Donauwalzer',
          musiikkiNimi: 'Tonava kaunoinen Apple Musicissa',
          musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/d/de/%22An_der_sch%C3%B6nen%2C_blauen_Donau%22%2C_performed_by_the_US_Marine_Band.mp3',
          musiikkiNayteNimi: 'Strauss: Tonava kaunoinen — United States Marine Band (PD)',
        },
        {
          otsikko: 'Taikahuilu tehtiin esikaupungin teatteriin',
          tiedosto: 'Karl Friedrich Schinkel - Die Sternenhalle der Königin der Nacht (ca. 1815).jpg',
          teksti: 'Mozartin viimeinen ooppera ei syntynyt hovia varten. '
            + 'Taikahuilu sai ensi-iltansa 30. syyskuuta 1791 Emanuel '
            + 'Schikanederin teatterissa Wienin Wiedenin esikaupungissa, ja '
            + 'se laulettiin saksaksi eikä italiaksi — tavallisen wieniläisen '
            + 'kielellä. Schikaneder kirjoitti sanat itse ja näytteli '
            + 'linnustaja Papagenoa. Mozart kuoli kaksi kuukautta myöhemmin. '
            + 'Kymmenen vuoden päästä Schikaneder avasi kaupunkiin uuden '
            + 'teatterin ja antoi veistää itsensä Papagenona sen portin '
            + 'päälle.',
          selite: 'Yön kuningattaren tähtisali, Karl Friedrich Schinkelin '
            + 'lavastusmaalaus noin vuodelta 1815: syvänsininen kupoli on '
            + 'ladottu täyteen tähtiä tasaisiin riveihin, ja alhaalla '
            + 'kuunsirpin päällä seisoo pieni tumma hahmo.',
          lahde: 'Karl Friedrich Schinkel, Wikimedia Commons (PD)',
          wiki: 'Taikahuilu',
          musiikki: 'https://music.apple.com/fi/search?term=Mozart%20Zauberfl%C3%B6te%20K%C3%B6nigin%20der%20Nacht',
          musiikkiNimi: 'Taikahuilu Apple Musicissa',
          musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/de/W._A._Mozart_-_Die_Zauberfl%C3%B6te_-_18._Der_H%C3%B6lle_Rache_kocht_in_meinem_Herzen_%28Ferenc_Fricsay%2C_1953%29.ogg/W._A._Mozart_-_Die_Zauberfl%C3%B6te_-_18._Der_H%C3%B6lle_Rache_kocht_in_meinem_Herzen_%28Ferenc_Fricsay%2C_1953%29.ogg.mp3',
          musiikkiNayteNimi: 'Mozart: Yön kuningattaren aaria — johtaa Ferenc Fricsay, äänitetty 1953 (PD)',
          galleria: [
            {
              otsikko: 'Papagenon portti',
              tiedosto: 'Theater an der Wien.jpg',
              selite: 'Kivinen veistosryhmä Theater an der Wienin sivuportin '
                + 'päällä: Schikaneder höyhenpuvussa soittamassa pillejään, '
                + 'vieressä lintuhäkki ja kolme höyhenpukuista lasta. Kuvattu '
                + 'kohtaus on Taikahuilun jatko-osasta Das Labyrinth.',
              lahde: 'Yair Haklai, Wikimedia Commons (CC BY-SA 3.0)',
            },
          ],
        },
      ],
      tehtava: {
        kysymys: 'Kenelle Tonava kaunoinen oli alun perin tehty?',
        vaihtoehdot: [
          'Puhallinorkesterille',
          'Lapsikuorolle',
          'Mieskuorolle',
          'Jousikvartetille',
        ],
        oikea: 2,
        fakta: 'Kuuluisa valssi kuultiin ensimmäisen kerran mieskuorolle '
          + 'tehtynä, ja vasta myöhemmin siitä tuli pelkän orkesterin '
          + 'soittama kappale.',
      },
    },
  ],
  madrid: [
    {
      id: 'kaupunki',
      nimi: 'Madrid',
      johdanto: 'Euroopan korkeimmalla sijaitseva pääkaupunki, jonka kuninkaat '
        + 'perustivat keskelle tyhjää ylätasankoa ja jonka asukkaat päättivät '
        + 'valvoa myöhempään kuin kukaan muu.',
      kansikuvat: [
        {
          tiedosto: 'Madrid May 2014-42a.jpg',
          selite: 'Plaza Mayor on suorakulmainen sali ilman kattoa: yhdeksän '
            + 'porttia, 237 parveketta ja keskellä Filip III ratsain.',
          lahde: 'Alvesgaspar, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Madrid Gran Via Metropolis (28895530633).jpg',
          selite: 'Gran Vía illalla. Etualalla Metrópolis-talon kupoli, jonka '
            + 'huipulla siivekäs voitonjumalatar on seissyt vuodesta 1975.',
          lahde: 'Nan Palmero from San Antonio, TX, USA, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Palacio de Cristal - 02.jpg',
          selite: 'Retiron puiston Kristallipalatsi syksyisen lammen takaa. Se '
            + 'rakennettiin 1887 kasvihuoneeksi, nykyään se on näyttelytila '
            + 'ilman vakituista kokoelmaa.',
          lahde: 'Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Goya maalasi madridilaisten vapaapäivät',
          tiedosto: 'La pradera de San Isidro, Francisco de Goya.jpg',
          teksti: 'Ennen kuin Francisco de Goyasta tuli hovimaalari ja ennen kuin '
            + 'hän maalasi sotaa ja hulluutta, hän teki kymmenen vuotta töitä '
            + 'kuninkaallisen kutomon tilauksesta: malleja seinävaatteisiin, '
            + 'joiden aiheeksi haluttiin iloisia kansankuvia. Goya meni '
            + 'kaduille ja niityille ja katsoi, mitä madridilaiset oikeasti '
            + 'tekivät vapaapäivinään — joivat, tanssivat, riitelivät, '
            + 'leikkivät. Siitä syntyi tarkin muotokuva, joka 1700-luvun '
            + 'Madridista on: ei kuninkaista vaan kaupungista.',
          selite: 'San Isidron niitty (1788): koko kaupunki juhlii '
            + 'suojeluspyhimyksensä päivää Manzanaresin rannalla, ja joen '
            + 'takana kohoaa Madrid kupoleineen.',
          lahde: 'Francisco Goya, Wikimedia Commons (Public domain)',
          wiki: 'Francisco de Goya',
          galleria: [
            {
              otsikko: 'Päivänvarjo',
              tiedosto: 'El Quitasol (Goya).jpg',
              selite: 'Päivänvarjo (1777). Palvelija pitää varjoa nuoren naisen '
                + 'yllä — Goyan tunnetuin kutomomalli ja yhä Pradon '
                + 'suosituimpia tauluja.',
              lahde: 'Francisco Goya, Wikimedia Commons (Public domain)',
            },
            {
              otsikko: 'Sokkoleikki',
              tiedosto: 'La gallina ciega (Goya).jpg',
              selite: 'Sokkoleikki (1789): piiri tanssii silmät sidotun ympärillä '
                + 'puulusikka kädessä. Leikin nimi on espanjaksi "sokea '
                + 'kana".',
              lahde: 'Francisco Goya, Wikimedia Commons (Public domain)',
            },
            {
              otsikko: 'Lumisade',
              tiedosto: 'La nevada, Francisco de Goya.jpg',
              selite: 'Lumisade eli Talvi (1786). Madrid on 650 metrin '
                + 'korkeudessa, ja talvi puree — kolme miestä taluttaa aasia '
                + 'lumituiskussa, koira perässä.',
              lahde: 'Francisco Goya, Wikimedia Commons (Public domain)',
            },
            {
              otsikko: 'Tanssi Manzanaresin rannalla',
              tiedosto: 'El baile a orillas del Manzanares.jpg',
              selite: 'Tanssi Manzanaresin rannalla (1777): majo ja maja, '
                + 'kaupungin omat keikarit, tanssivat seguidillaa joen '
                + 'törmällä.',
              lahde: 'Francisco Goya, Wikimedia Commons (Public domain)',
            },
            {
              otsikko: 'Saviastioiden kauppias',
              tiedosto: 'El cacharrero, Francisco de Goya.jpg',
              selite: 'Saviastioiden kauppias (1779). Kauppias levittää ruukkunsa '
                + 'maahan, ja ohi vierivistä vaunuista katsotaan — kaksi '
                + 'Madridia samassa kuvassa.',
              lahde: 'Francisco Goya, Wikimedia Commons (Public domain)',
            },
          ],
        },
        {
          otsikko: 'Kaupunki, jossa syödään seisten',
          tiedosto: 'Mercado de San Miguel, Madrid - 001.jpg',
          teksti: 'Madridissa lounas on kahdelta ja illallinen yhdeksän jälkeen, '
            + 'ja väliin jää tunteja, jotka täytetään tapaksilla. Tapa '
            + 'tarkoittaa kantta: juomalasin päälle asetettiin viipale '
            + 'kinkkua tai leipää, jottei kärpäsiä päässyt sisään — kansi '
            + 'muuttui ruoaksi. Tapaksia syödään seisten baaritiskillä ja '
            + 'siirrytään sitten seuraavaan paikkaan; kierros on nimeltään '
            + 'tapeo, ja se on yhtä paljon kävelyä kuin syömistä. Vuoden 1916 '
            + 'valurautainen San Miguelin halli on kierroksen tunnetuin '
            + 'pysäkki.',
          selite: 'Mercado de San Miguelin lasi- ja valurautahalli Plaza Mayorin '
            + 'kupeessa. Vanha vihannestori muuttui 2009 tapastoriksi, jonka '
            + 'tiskien ympärillä seistään.',
          lahde: 'Nicolas Vigier, Wikimedia Commons (CC0)',
          wiki: 'Tapas',
        },
        {
          otsikko: 'Chotis tanssitaan yhden laatan päällä',
          tiedosto: 'Parejas bailando Chotis - Madrid 01.jpg',
          teksti: 'Chotis tuli Madridiin 1850 Keski-Euroopasta, mutta muuttui '
            + 'perillä omanlaisekseen. Säännön mukaan mies ei siirry '
            + 'laatalta, jolla seisoo: hän pyörii paikallaan, ja nainen '
            + 'kiertää hänen ympärillään. Säestää organillo, kadulla '
            + 'työnnettävä kampiurut. Tanssi kuuluu verbena-juhliin, joista '
            + 'suurin on San Isidro 15. toukokuuta — sama juhla, jonka Goya '
            + 'maalasi. Samasta Madridista syntyi myös zarzuela, laulun ja '
            + 'puheen vuorottelu, jota esitetään kaupungin omassa '
            + 'Zarzuela-teatterissa yhä.',
          selite: 'Pareja tanssimassa chotisia Plaza de Santa Cruzilla. Miehillä '
            + 'on chulapon lakki ja liivi, naisilla pitkä pilkullinen mekko, '
            + 'huivi hartioilla ja neilikka hiuksissa.',
          lahde: 'Javier Perez Montes, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Zarzuela',
          musiikki: 'https://music.apple.com/fi/search?term=zarzuela',
          musiikkiNimi: 'Zarzuela-musiikkia Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/granvi30g/AE2784.mp3',
          musiikkiNayteNimi: 'La Gran Vía -zarzuela — Emilio Sagi-Barba, PD',
        },
      ],
    },
    {
      id: 'urheilu',
      nimi: 'Urheilu',
      johdanto: 'Kaupungissa on kaksi suurta jalkapalloseuraa, ja kummallakin on '
        + 'oma suihkulähde, jonka päälle mestaruus kiivetään juhlimaan.',
      nostot: [
        {
          otsikko: 'Nurmi lasketaan hissillä maan alle',
          tiedosto: 'Estadio Santiago Bernabeu - Field.jpg',
          teksti: 'Real Madridin kotistadion avattiin 14. joulukuuta 1947, ja '
            + 'siihen mahtuu nykyään 83 186 katsojaa. Suuren remontin jälkeen '
            + 'sen erikoisin osa on nurmikenttä. Kenttä on leikattu kuudeksi '
            + 'yli sadan metrin pituiseksi kaukaloksi, jotka voidaan ajaa '
            + 'sivuun ja laskea hydraulisella hissillä kolmenkymmenen metrin '
            + 'syvyyteen. Siellä alhaalla on kasvihuone, jossa ruoho saa '
            + 'valoa ja jatkaa kasvamistaan. Koko kentän piilottaminen kestää '
            + 'noin kuusi tuntia — sen jälkeen stadionille mahtuu konsertti.',
          selite: 'Bernabéun nurmi ja siniset katsomot tyhjinä vuonna 2018, ennen '
            + 'remonttia. Katsomo nousee kolmena kerroksena kentän ympäri, ja '
            + 'ylimmän yllä näkyy katos ja pala taivasta.',
          lahde: 'Mervat, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Estadio Santiago Bernabéu',
        },
        {
          otsikko: 'Suihkulähde, joka vaihtoi joukkuetta',
          tiedosto: 'Fuente de Cibeles - 03.jpg',
          teksti: 'Cibeleen aukion suihkulähteessä jumalatar ajaa vaunuja, joita '
            + 'vetää kaksi leijonaa. Ensimmäisinä sen päälle kiipesivät '
            + 'Atlético Madridin kannattajat: seuran toimisto oli '
            + 'naapurikadulla, ja siellä juhlittiin voittoja jo vuonna 1962. '
            + 'Real Madridin väki omaksui tavan perässä, ja 1980-luvun '
            + 'lopulla Cibeles oli jo niin vahvasti valkoisten paikka, että '
            + 'atléticolaiset luovuttivat sen. Vuodesta 1991 he ovat '
            + 'juhlineet saman puistokadun toisessa päässä, Neptunuksen '
            + 'suihkulähteellä.',
          selite: 'Cibeleen suihkulähteen kaksi kivileijonaa alaviistosta '
            + 'kuvattuna: harjat, valjaat ja tassut erottuvat tarkkaan. Ne '
            + 'veisti ranskalainen Roberto Michel 1780-luvulla. Takana liehuu '
            + 'Espanjan lippu ja kohoaa vaalea palatsi.',
          lahde: 'Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Plaza de Cibeles',
        },
      ],
      tehtava: {
        kysymys: 'Kuinka syvälle Bernabéun nurmikenttä lasketaan hissillä?',
        vaihtoehdot: [
          '10 metrin syvyyteen',
          '30 metrin syvyyteen',
          '50 metrin syvyyteen',
          '80 metrin syvyyteen',
        ],
        oikea: 1,
        fakta: 'Kenttä laskeutuu hissillä kolmenkymmenen metrin syvyyteen, missä '
          + 'maanalaisessa kasvihuoneessa ruoho saa valoa ja pysyy vihreänä.',
      },
    },
    {
      id: 'rakennukset',
      nimi: 'Kadut ja talot',
      johdanto: 'Kaupungin läpi murrettiin katu hopeisella hakulla, ja palaneen '
        + 'linnan tilalle rakennettiin sellainen, joka ei voisi palaa.',
      nostot: [
        {
          otsikko: 'Katu, joka murrettiin talojen läpi',
          tiedosto: 'Derribo de casas para la apertura de la Gran Vía - 1912.jpg',
          teksti: 'Madridin vanhassa keskustassa kadut olivat kapeita ja '
            + 'mutkaisia, ja niiden läpi päätettiin murtaa yksi leveä. Työ '
            + 'alkoi 4. huhtikuuta 1910, kun kuningas Alfonso XIII löi '
            + 'hopeisella hakulla ensimmäisen reiän papin talon seinään San '
            + 'Josén kirkon vieressä. Ennen kuin Gran Vía oli valmis, oli '
            + 'purettu 312 taloa ja 48 katua kadonnut tai muuttunut toiseksi. '
            + 'Sisällissodassa katua sanottiin Kranaattikaduksi: sen '
            + 'korkeimman talon ylimmissä kerroksissa oli tähystyspaikka, ja '
            + 'tykit ampuivat sitä kohti.',
          selite: 'Gran Vían ensimmäistä osuutta rakennetaan vuonna 1912. '
            + 'Vasemmalla seisoo juuri valmistunut Metrópolis-talo, edessä on '
            + 'kasa hakattuja kivenlohkareita, ja ihmiset kävelevät paljaalla '
            + 'maalla siinä, missä oli ollut kortteleittain taloja.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Alfonso XIII',
        },
        {
          otsikko: 'Linna rakennettiin palamattomaksi',
          tiedosto: 'Real Alcázar de Madrid, unknown.jpg',
          teksti: 'Kuninkaiden vanha Alcázar-linna syttyi palamaan jouluaattona '
            + '1734, ja tuli tuhosi sen lähes kokonaan. Filip V käski '
            + 'rakentaa tilalle linnan, joka ei voisi palaa: seinät kiveä ja '
            + 'tiiltä, katot holvattuja, puuta vain ovissa, ikkunanpuitteissa '
            + 'ja kattotuoleissa. Työ alkoi 1738, ja ensimmäinen kuningas '
            + 'muutti sisään 1764. Kuninkaanlinna on 135 000 neliömetrillään '
            + 'Länsi-Euroopan suurin — silti kuningas ei asu siellä vaan '
            + 'pienemmässä talossa kaupungin laidalla.',
          selite: 'Vanha Alcázar noin vuonna 1710 tehdyssä kuvassa: pitkä '
            + 'julkisivu ikkunariveineen, keskellä kello ja vaakuna oven '
            + 'yllä, päädyissä jyrkkäkattoiset tornit. Rakennuksesta ei ole '
            + 'jäljellä mitään.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Palacio Real de Madrid',
        },
      ],
      tehtava: {
        kysymys: 'Milloin kuninkaiden vanha Alcázar-linna syttyi palamaan?',
        vaihtoehdot: [
          'Juhannuksena 1734',
          'Pääsiäisenä 1738',
          'Jouluaattona 1734',
          'Uudenvuodenaattona 1764',
        ],
        oikea: 2,
        fakta: 'Kuninkaiden vanha Alcázar paloi jouluaattona 1734 lähes '
          + 'kokonaan, ja tilalle rakennettiin nykyinen kivinen '
          + 'kuninkaanlinna.',
      },
    },
  ],
  berliini: [
    {
      id: 'kaupunki',
      nimi: 'Berliini',
      johdanto: 'Suolle rakennettu kaupunki, joka jaettiin muurilla kahtia ja '
        + 'kasvoi yhteen uudelleen — historia näkyy täällä joka '
        + 'kadunkulmassa.',
      kansikuvat: [
        {
          tiedosto: 'Berliner Dom BW 5.jpg',
          lahde: 'Berthold Werner, Wikimedia Commons (CC BY-SA 3.0)',
          selite: 'Berliinin tuomiokirkko Museosaarella. Vihertävä kuparikupoli '
            + 'nousee kivijulkisivun yllä, ja oikealla erottuu '
            + 'televisiotorni.',
        },
        {
          tiedosto: 'Fernsehturm, Berlín, Alemania, 2016-04-22, DD 40-42 HDR.jpg',
          selite: 'Tv-torni Alexanderplatzilla on 368-metrisenä Saksan korkein '
            + 'rakennus. Itä-Saksa rakensi sen 1969 näkymään kaikkialle '
            + 'kaupunkiin.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'East side gallery, Berlin Wall (Ank Kumar, Infosys Limited) 07.jpg',
          selite: 'East Side Gallery: 1,3 kilometriä muuria jätettiin pystyyn, ja '
            + '118 taiteilijaa 21 maasta maalasi siihen maailman pisimmän '
            + 'ulkoilmagallerian vuonna 1990.',
          lahde: 'Ank Kumar, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Gaertner maalasi Berliinin talo talolta',
          tiedosto: '1856 Gaertner Unter den Linden anagoria.JPG',
          teksti: 'Kun valokuvaa ei vielä ollut, Eduard Gaertner oli Berliinin '
            + 'kamera. Entinen posliininmaalari kiersi katuja ja maalasi ne '
            + 'niin tarkasti, että taloista voi laskea ikkunaruudut ja '
            + 'kylttien tekstit voi lukea. Kuningas osti hänen töitään, mutta '
            + 'Gaertner ei maalannut vain paraatinäkymiä: hänen kaduillaan '
            + 'korjataan kiveystä, koirat nuuskivat toisiaan ja pyykki kuivuu '
            + 'ikkunoissa. Juuri siksi hänen taulunsa ovat nyt tutkijoiden '
            + 'aarre — niistä nähdään, miltä kadonnut Berliini oikeasti '
            + 'näytti.',
          selite: 'Unter den Linden (1856): paraatikadun perällä häämöttää '
            + 'kuninkaanlinnan kupoli, oikealla Fredrik Suuren '
            + 'ratsastajapatsas.',
          lahde: 'Eduard Gaertner, Wikimedia Commons (Public domain)',
          wiki: 'Unter den Linden',
          galleria: [
            {
              otsikko: 'Klosterstraße',
              tiedosto: 'Eduard Gaertner Berlin Klosterstrasse 1830.jpg',
              selite: 'Klosterstraße (1830). Ukkospilvet kasaantuvat '
                + 'vanhankaupungin ylle; kadun perällä kohoaa '
                + 'Parochialkirchen torni.',
              lahde: 'Eduard Gaertner, Wikimedia Commons (Public domain)',
            },
            {
              otsikko: 'Parochialstraße',
              tiedosto: 'Eduard Gaertner - Die Parochialstraße - Google Art Project.jpg',
              selite: 'Parochialstraße (1831). Katutyömaa käynnissä: miehet '
                + 'latovat kiveystä, kauppiaan kupariastiat roikkuvat '
                + 'kylttinä ja koirat hoitavat omia asioitaan.',
              lahde: 'Eduard Gaertner, Wikimedia Commons (Public domain)',
            },
            {
              otsikko: 'Schloßfreiheit',
              tiedosto: 'Eduard Gaertner - Rear view of the Houses at Schloßfreiheit - Google Art Project.jpg',
              selite: 'Talojen takapihat Schloßfreiheitin rannassa (1855) — '
                + 'arkinen puoli, jota varten kukaan muu ei pystyttänyt '
                + 'maalaustelinettä. Takana kuninkaanlinnan kappelin kupoli.',
              lahde: 'Eduard Gaertner, Wikimedia Commons (Public domain)',
            },
            {
              otsikko: 'Friedrichsgracht',
              tiedosto: 'Eduard Gaertner (1801-1877) - The Friedrichsgracht, Berlin - NG6524 - National Gallery.jpg',
              selite: 'Friedrichsgracht kattojen yli nähtynä: proomut lastaavat '
                + 'kanavassa. Berliini oli 1800-luvulla myös satamakaupunki.',
              lahde: 'Eduard Gaertner, Wikimedia Commons (Public domain)',
            },
            {
              otsikko: 'Kuninkaallinen ooppera',
              tiedosto: 'Eduard Gaertner - Ansicht der Königlichen Oper und Unter den Linden, Berlin (1845).jpg',
              selite: 'Kuninkaallinen ooppera iltahämärässä (1845). Sama talo '
                + 'seisoo Unter den Lindenillä yhä, ja siellä lauletaan '
                + 'edelleen.',
              lahde: 'Eduard Gaertner, Wikimedia Commons (Public domain)',
            },
          ],
        },
        {
          otsikko: 'Hattupäinen ukkeli sai jäädä',
          tiedosto: 'Ampelmännchen go.jpg',
          teksti: 'Liikennepsykologi Karl Peglau piirsi vuonna 1961 Itä-Saksalle '
            + 'oman jalankulkuvalon: leveä hahmo hattuineen erottuu kauas, '
            + 'koska valopintaa on paljon. Ensimmäiset syttyivät '
            + 'Itä-Berliinissä 1969. Kun Saksat yhdistyivät, ukkelia alettiin '
            + 'vaihtaa lännen tikku-ukkoon — kunnes kansalaiskampanja '
            + '"Pelastakaa Ampelmännchen" nousi vastaan ja voitti. Nykyään '
            + 'hattupäinen ukkeli ohjaa kulkijoita myös monessa '
            + 'Länsi-Berliinin risteyksessä, ja siitä on tullut koko '
            + 'kaupungin maskotti, jota myydään matkamuistona.',
          selite: 'Vihreä Ampelmännchen Berliinissä. Taustalla Keisari Vilhelmin '
            + 'muistokirkon torso, joka jätettiin pommituksissa saamaansa '
            + 'asuun muistutukseksi sodasta.',
          lahde: 'Wikimedia Commons (CC0)',
          wiki: 'Ampelmännchen',
        },
        {
          otsikko: 'Tyttö Schönebergistä lauloi maailman ympäri',
          tiedosto: 'My Child Speaks Marlene Dietrich 1930, Erich Salomon.jpg',
          teksti: 'Marlene Dietrich syntyi 1901 Schönebergin kaupunginosassa ja '
            + 'nousi maailmantähdeksi berliiniläisen elokuvan Sininen enkeli '
            + '(1930) myötä — samana vuonna hän muutti Hollywoodiin. Kun '
            + 'natsihallinto houkutteli häntä takaisin mainoskasvokseen, hän '
            + 'kieltäytyi, otti Yhdysvaltain kansalaisuuden ja lauloi sen '
            + 'sijaan rintamalla sotilaille — tunnetuimpana laulun Lili '
            + 'Marleen, jota kuunneltiin juoksuhaudoissa molemmin puolin. '
            + 'Berliiniin hän palasi viimeisen kerran arkussa: hauta on '
            + 'Schönebergissä, äidin haudan vieressä.',
          selite: 'Marlene Dietrich soittaa Hollywoodista Berliiniin tyttärelleen '
            + '1930. Yöpöydällä tyttären valokuva — Erich Salomonin kuuluisa '
            + 'otos.',
          lahde: 'Erich Salomon, Wikimedia Commons (Public domain)',
          wiki: 'Marlene Dietrich',
          musiikki: 'https://music.apple.com/fi/album/lili-marleen/724182416?i=724182571',
          musiikkiNimi: 'Marlene Dietrichin lauluja Apple Musicissa',
          esikuuntelu: 'Marlene Dietrich Lili Marleen',
        },
      ],
    },
    {
      id: 'rakennukset',
      nimi: 'Tornit ja torit',
      johdanto: 'Syksyllä 1969 Alexanderplatzille valmistui neljän päivän välein '
        + 'kaksi asiaa: kello, joka näyttää maailman ajat, ja torni, joka '
        + 'näkyy kaikkialle kaupunkiin.',
      nostot: [
        {
          otsikko: 'Aurinko piirsi torniin ristin',
          tiedosto: 'The Pope\'s Revenge.jpg',
          teksti: 'Itä-Saksa rakensi televisiotornin vuosina 1965–1969 ja vihki '
            + 'sen käyttöön 3. lokakuuta 1969. Tornin pallo koottiin maassa '
            + '120 teräslohkosta ja nostettiin vasta sitten betonipylvään '
            + 'päähän. Sen jälkeen tapahtui jotain, mitä kukaan ei ollut '
            + 'piirtänyt kuviin: kun aurinko osuu kiiltävään palloon, '
            + 'heijastus muodostaa ristin. Valtio oli virallisesti '
            + 'uskonnoton, joten muurin länsipuolella keksittiin ilmiölle '
            + 'nimi — paavin kosto. Nimi jäi.',
          selite: 'Tornin pallo läheltä. Auringonvalo heijastuu teräslevyistä '
            + 'niin, että pintaan syttyy vaalea risti: pystyjuova ylhäältä '
            + 'alas ja sen poikki leveämpi vaakanauha.',
          lahde: 'Tobi85, Wikimedia Commons (Public domain)',
          wiki: 'Berliinin televisiotorni',
          galleria: [
            {
              otsikko: 'Työmaa toukokuussa 1968',
              tiedosto: 'Bundesarchiv Bild 183-G0521-0005-001, Berlin, Fernsehturm, Bau.jpg',
              selite: 'Kaksi kypäräpäistä miestä työskentelee tornin rungon '
                + 'reunalla. Alhaalla mutkittelee Spree ja kaupungin kattoja; '
                + 'miesten välissä on teräspalkki ja köysi.',
              lahde: 'Hans-Joachim Spremberg, Bundesarchiv / Wikimedia Commons (CC BY-SA 3.0 DE)',
            },
          ],
        },
        {
          otsikko: 'Kelloa pyöritti Trabantin vaihteisto',
          tiedosto: 'Urania-Weltzeituhr auf dem Alexanderplatz in Berlin 2015.jpg',
          teksti: 'Muutama päivä ennen tornia, 30. syyskuuta 1969, samalle '
            + 'aukiolle pystytettiin kymmenmetrinen maailmankello. Erich '
            + 'Johnin suunnittelemassa alumiinirummussa on 24 sivua, yksi '
            + 'jokaista aikavyöhykettä kohti, ja niihin on jyrsitty 146 '
            + 'paikannimeä Reykjavíkista Kinshasaan. Rummun ympäri kiertää '
            + 'tuntirengas, ja katolla pyörii kerran minuutissa pieni '
            + 'aurinkokunta. Koneisto on kadun alla kellarissa, ja '
            + 'tuntirengasta pyöritti Trabantista purettu vaihteisto.',
          selite: 'Maailmankello aukiolla. Rummun kylkiin on jyrsitty kaupunkien '
            + 'nimiä, sen ympäri kiertää värillinen tuntirengas ja päällä '
            + 'pyörii teräsrenkaista koottu aurinkokunta pikkupalloineen. '
            + 'Alhaalla ohittaa pyöräilijöitä.',
          lahde: 'Christian Wolf (www.c-w-design.de), Wikimedia Commons (CC BY-SA 3.0 DE)',
          wiki: 'Alexanderplatz',
          galleria: [
            {
              otsikko: 'Nimet lähietäisyydeltä',
              tiedosto: 'Weltzeituhr Detail Alexanderplatz.jpg',
              selite: 'Rummun kylki lähikuvassa: nimirivejä kuten REYKJAVIK, '
                + 'DUBLIN, LONDON ja OSLO, KOPENHAGEN, WIEN, ROM, TUNIS, '
                + 'KINSHASA, ja niiden alla isot oranssit tuntinumerot 10–17.',
              lahde: 'Gryffindor, Wikimedia Commons (Public domain)',
            },
          ],
        },
      ],
      tehtava: {
        kysymys: 'Kuinka monta paikannimeä Alexanderplatzin maailmankelloon on '
          + 'jyrsitty?',
        vaihtoehdot: [
          '24 paikannimeä',
          '146 paikannimeä',
          '1 200 paikannimeä',
          '60 paikannimeä',
        ],
        oikea: 1,
        fakta: 'Maailmankellon alumiinirumpuun on jyrsitty 146 paikannimeä, ja '
          + 'rummun kaksikymmentäneljä sivua vastaavat maapallon '
          + 'aikavyöhykkeitä.',
      },
    },
  ],
  venetsia: [
    {
      id: 'kaupunki',
      nimi: 'Venetsia',
      johdanto: 'Kaupunki, joka päätti rakentaa itsensä veteen — ja teki '
        + 'mahdottomasta tunnusmerkkinsä.',
      kansikuvat: [
        {
          tiedosto: 'Aerial photographs of Venice 2013, Anton Nossik, 045.jpg',
          selite: 'Markuksentori ja dogen palatsi ilmasta — koko kaupunki seisoo '
            + 'keskellä laguunia.',
          lahde: 'Anton Nosik, Wikimedia Commons (CC BY 3.0)',
        },
        {
          tiedosto: 'Palazzi Corner Spinelli Casa Salome Barocci Canal Grande Venezia.jpg',
          selite: 'Canal Granden palatseja ja vesibussi pysäkillä: kadun sijasta '
            + 'talon ovelta astutaan veneeseen.',
          lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Rialto Gondoliers.jpg',
          selite: 'Rialton silta on ylittänyt pääkanavan yli neljäsataa vuotta.',
          lahde: 'Saffron Blaze, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Canaletto maalasi kaupunkinsa',
          tiedosto: 'Canal, Giovanni Antonio (Canaletto) - Return of the Bucentoro to the Molo on Ascension Day, c. 1733-4. Royal Collection Buckingham Palace.jpg',
          teksti: 'Venetsialainen Canaletto maalasi 1700-luvulla kaupunkinsa '
            + 'näkymiä niin tarkasti, että tutkijat käyttävät niitä yhä '
            + 'lähteinä. Maalauksia ostivat etenkin englantilaiset '
            + 'matkailijat muistoksi suurelta Euroopan-kiertueeltaan.',
          selite: 'Bucintoron paluu Molon rantaan helatorstaina (n. 1733): dogen '
            + 'kullattu juhlalaiva palaa seremoniasta, jossa Venetsia '
            + '"vihittiin" merensä kanssa heittämällä sormus aaltoihin. '
            + 'Taustalla dogen palatsi ja kellotorni — näkymä on sama '
            + 'tänäänkin.',
          lahde: 'Canaletto, Wikimedia Commons (PD)',
          wiki: 'Canaletto',
          galleria: [
            {
              otsikko: 'Kivenhakkaajien piha',
              tiedosto: 'Canaletto - The Stonemason\'s Yard.jpg',
              selite: 'Kivenhakkaajien piha (n. 1725): Campo San Vidalilla '
                + 'veistetään kiveä kirkon korjaustöihin. Harvinainen näkymä '
                + 'arjen Venetsiasta — ei juhlaa vaan työtä, pyykkinaruja ja '
                + 'leikkiviä lapsia.',
              lahde: 'Canaletto, Wikimedia Commons (PD)',
            },
            {
              otsikko: 'Markuksentori',
              tiedosto: 'Canaletto - The Piazza San Marco in Venice - Google Art Project.jpg',
              selite: 'Markuksentori (n. 1724): basilika ja kellotorni nuoren '
                + 'Canaletton siveltimellä. Kauppiaiden kojut täyttävät torin '
                + '— se oli silloinkin kaupungin olohuone.',
              lahde: 'Canaletto, Wikimedia Commons (PD)',
            },
            {
              otsikko: 'Canal Granden suu',
              tiedosto: 'Canaletto - The Entrance to the Grand Canal, Venice - Google Art Project.jpg',
              selite: 'Canal Granden suu ja Santa Maria della Saluten '
                + 'kupolikirkko (n. 1730). Kirkko rakennettiin kiitokseksi '
                + 'ruton väistymisestä, ja sen portaille kuljetaan yhä joka '
                + 'marraskuu siltaa pitkin juhlimaan.',
              lahde: 'Canaletto, Wikimedia Commons (PD)',
            },
            {
              otsikko: 'Regatta Canal Grandella',
              tiedosto: 'Canal, Giovanni Antonio Canal - Venice, A Regatta on the Grand Canal - National Gallery NG938.jpg',
              selite: 'Regatta Canal Grandella (n. 1740): kevyet kilpagondolat '
                + 'kiitävät väkijoukon editse, ja parvekkeet on verhoiltu '
                + 'juhlakankain. Sama soutukilpailu soudetaan Venetsiassa yhä '
                + 'joka syksy.',
              lahde: 'Canaletto, Wikimedia Commons (PD)',
            },
            {
              otsikko: 'Rio dei Mendicanti',
              tiedosto: 'Ca\' Rezzonico - Il rio dei Mendicanti - Canaletto.jpg',
              selite: 'Rio dei Mendicanti (n. 1723): varhainen Canaletto '
                + 'sivukanavan varrelta. Ikkunoissa kuivuu pyykkiä ja '
                + 'rannassa korjataan veneitä — tavallista Venetsiaa ilman '
                + 'juhlapukua.',
              lahde: 'Didier Descouens, Wikimedia Commons (CC BY-SA 4.0)',
            },
          ],
        },
        {
          otsikko: 'Cicchetti ja Rialton tori',
          tiedosto: 'Pescaria Rialto Venice.jpg',
          teksti: 'Venetsialaiset syövät cicchettejä — pieniä suupaloja — seisten '
            + 'bacaro-baarien tiskillä, ja viinilasillista kutsutaan nimellä '
            + 'ombra, varjo. Raaka-aineet tulevat Rialton torilta, jossa '
            + 'laguunin kalaa on myyty satojen vuosien ajan.',
          selite: 'Rialton kalatorin pylväshalli Canal Granden varrella. Kauppa '
            + 'käy aamuisin: laguunin ja Adrianmeren kalat ja äyriäiset '
            + 'tuodaan suoraan veneillä hallin laituriin.',
          lahde: 'Wolfgang Moroder, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Vivaldi, punainen pappi',
          tiedosto: 'Antonio Vivaldi.jpg',
          teksti: 'Antonio Vivaldi — punatukkainen pappi, il Prete Rosso — opetti '
            + 'viulunsoittoa venetsialaisessa tyttöjen orpokodissa ja sävelsi '
            + 'sen orkesterille satoja konserttoja. Kuuluisin on Neljä '
            + 'vuodenaikaa, jossa musiikista voi kuulla linnunlaulun ja '
            + 'ukkosmyrskyn.',
          selite: 'Ainoa varma Vivaldin muotokuva: François Morellon la Caven '
            + 'kaiverrus vuodelta 1725. Säveltäjä pitelee nuottivihkoa — '
            + 'peruukin alla hehkui lempinimen antanut punainen tukka.',
          lahde: 'François Morellon la Cave, Wikimedia Commons (PD)',
          wiki: 'Antonio Vivaldi',
          musiikki: 'https://music.apple.com/fi/artist/antonio-vivaldi/242604',
          musiikkiNimi: 'Antonio Vivaldi Apple Musicissa',
          musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/ff/Vivaldi_-_Four_Seasons_1_Spring_mvt_1_Allegro_-_John_Harrison_violin.oga/Vivaldi_-_Four_Seasons_1_Spring_mvt_1_Allegro_-_John_Harrison_violin.oga.mp3',
          musiikkiNayteNimi: 'Vivaldi: Kevät, 1. osa — John Harrison, viulu (CC BY-SA)',
        },
      ],
    },
    {
      id: 'rakennukset',
      nimi: 'Kaupunki veden varassa',
      johdanto: 'Talot eivät seiso kalliolla vaan miljoonien puunrunkojen päällä — '
        + 'ja meri käy joka syksy tarkistamassa, pitävätkö ne yhä.',
      nostot: [
        {
          otsikko: 'Kaupunki seisoo puunrunkojen päällä',
          tiedosto: 'A canal in Venice being drained and cleaned using a Decauville railway.jpg',
          teksti: 'Venetsian talot eivät seiso kalliolla vaan puussa. Rakentajat '
            + 'löivät laguunin mutaan tiheät rivit lepän runkoja, kunnes '
            + 'paalut ylsivät alla olevaan kovaan savikerrokseen. Paalujen '
            + 'päälle ladottiin istrialaisia kalkkikivilaattoja ja vasta '
            + 'niiden päälle tiilet. Mudassa ei ole happea, joten puu ei '
            + 'lahoa vaan kovettuu vuosisatojen kuluessa. Santa Maria della '
            + 'Saluten kirkkoa varten mutaan lyötiin yli miljoona paalua.',
          selite: 'Venetsialainen kanava vuonna 1956: molemmat päät on padottu, '
            + 'vesi pumpattu pois ja miehet lapioivat pohjan mutaa vaunuihin. '
            + 'Oikeassa reunassa kulkee kapearaiteinen kisko, jota pitkin '
            + 'vaunut työnnetään pois, ja takana kaartuu kivisilta. Kanavia '
            + 'tyhjennetään yhä, sillä vain kuivalla pohjalla talojen '
            + 'perustuksia pääsee korjaamaan.',
          lahde: 'Tuntematon valokuvaaja 1956, Wikimedia Commons (PD-Italy)',
          wiki: 'Venetsia',
        },
        {
          otsikko: 'Portit nousevat merenpohjasta',
          tiedosto: 'Venedig Acqua alta-4496.jpg',
          teksti: 'Kun syksyn tuuli työntää Adrianmerta laguunia kohti, vesi '
            + 'nousee kaduille. Ilmiön nimi on acqua alta, korkea vesi. '
            + 'Korkein mitattu oli 194 senttiä 4. marraskuuta 1966, ja '
            + 'kaupunki varoittaa siitä sireeneillä: mitä useamman kerran '
            + 'sireeni soi, sitä korkeammalle vesi nousee. Lokakuusta 2020 '
            + 'alkaen suojana on ollut MOSE, 78 terästulvaporttia laguunin '
            + 'kolmen suuaukon pohjassa.',
          selite: 'Mies kävelee märkää kujaa pitkin reisisaappaissa marraskuussa '
            + '2019: mustassa takissa, sateenvarjo kädessä ja vihreä '
            + 'verkkokassi olalla. Vieressä on tiiliseinä, jonka alaosan '
            + 'rappaus on lohkeillut suolaisen veden syövyttämänä. Acqua '
            + 'altan aikaan saappaat ovat venetsialaisen tavallinen työasu.',
          lahde: 'GodeNehler, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Venetsian laguuni',
          galleria: [
            {
              otsikko: 'Näin portti nousee',
              tiedosto: '03 movimento paratoie.jpg',
              selite: 'Kolme piirrosta MOSE-portin liikkeestä. Ylinnä portti '
                + 'makaa merenpohjan betonikotelossa vedellä täytettynä. '
                + 'Keskellä siihen puhalletaan paineilmaa (musta nuoli), vesi '
                + 'työntyy ulos (valkoinen nuoli) ja portti kääntyy saranansa '
                + 'varassa ylös. Alinna portti seisoo pystyssä ja erottaa '
                + 'laguunin (laguna) merestä (mare). Nousuun menee noin puoli '
                + 'tuntia.',
              lahde: 'Magistrato alle Acque di Venezia — Consorzio Venezia Nuova, Wikimedia Commons (CC BY-SA 3.0)',
            },
          ],
        },
      ],
      tehtava: {
        kysymys: 'Miten Venetsia varoittaa asukkaitaan kohoavasta vedestä?',
        vaihtoehdot: [
          'Punaisilla lipuilla',
          'Sireenien soitolla',
          'Kirkonkellojen soitolla',
          'Kaupungin radiolla',
        ],
        oikea: 1,
        fakta: 'Kun vesi uhkaa nousta kaduille, Venetsia soittaa sireeneitä, ja '
          + 'mitä useampi soitto kuuluu, sitä korkeammalle meri nousee.',
      },
    },
    {
      id: 'kasityo',
      nimi: 'Käsityö',
      johdanto: 'Saari, jonne lasinpuhaltajat karkotettiin tulipalon pelossa, ja '
        + 'vene, joka on tahallaan vino.',
      nostot: [
        {
          otsikko: 'Lasinpuhaltajat karkotettiin saarelle',
          tiedosto: 'Glass blowing in the Murano island (14023312236).jpg',
          teksti: 'Vuonna 1291 Venetsian tasavalta määräsi kaikki lasinpuhaltajat '
            + 'siirtämään uuninsa Muranon saarelle. Syy oli pelko: lasi sulaa '
            + 'vasta yli tuhannen asteen kuumuudessa, ja uunit paloivat '
            + 'keskellä kaupunkia, jonka talot olivat suureksi osaksi puuta. '
            + 'Muranossa mestarit saivat erikoisoikeuksia — jopa luvan kantaa '
            + 'miekkaa — mutta tasavallasta heidän ei ollut lupa lähteä. '
            + 'Lasin valmistustapa oli valtionsalaisuus.',
          selite: 'Lasimestari istuu työpenkin ääressä ja muotoilee raudan päässä '
            + 'hehkuvaa oranssia lasia pieneksi hevoseksi. Penkin reunalla on '
            + 'rivi pihtejä ja saksia, edessä lattialla puinen '
            + 'muotoilupölkky. Muranossa esineet tehdään yhä käsin ilman '
            + 'muotteja.',
          lahde: 'Miguel Mendez, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Murano',
          galleria: [
            {
              otsikko: 'Uunin suu',
              tiedosto: 'Italy-1453 - Murano Glass (5228946002).jpg',
              selite: 'Muranolaisen uunin aukko hehkuu keltaisena kuin pieni '
                + 'aurinko. Aukon keskellä näkyy pyörivän raudan päässä '
                + 'lasimalja, jota kuumennetaan uudelleen pehmeäksi. Alhaalla '
                + 'lepää kolme punahehkuista lasitankoa.',
              lahde: 'Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0)',
            },
          ],
        },
        {
          otsikko: 'Gondoli on tahallaan vino',
          tiedosto: 'Forcola da pope su gondola.jpg',
          teksti: 'Gondoli ei ole symmetrinen: sen vasen kylki on oikeaa '
            + 'leveämpi. Vinous on tarkoituksellista. Soutaja seisoo perässä '
            + 'ja soutaa yhdellä airolla veneen oikealta puolelta, ja vino '
            + 'runko kumoaa kaarron, jonka yksi airo muuten aiheuttaisi. Vene '
            + 'on noin 10,85 metriä pitkä, painaa 350 kiloa ja kootaan 280 '
            + 'osasta kahdeksaa eri puulajia. Näin jyrkäksi vinous kehittyi '
            + 'vasta 1900-luvun alussa.',
          selite: 'Veistetty puinen forcola eli hankain nousee veneen laidalta, '
            + 'ja airo lepää sen ylimmässä lovessa. Lovia on useita eri '
            + 'soutuotteita varten, eikä forcolaa ole kiinnitetty mihinkään — '
            + 'se nostetaan pois soudun jälkeen. Kuvan vene on kirkkaan '
            + 'sininen: tavallinen gondoli on musta, ja vain kilpaveneet ovat '
            + 'värikkäitä.',
          lahde: 'Kevin Lucich, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Gondoli',
          galleria: [
            {
              otsikko: 'Keulan kampa',
              tiedosto: 'Gondola ferro di prua.jpg',
              selite: 'Gondolin keulan metallinen ferro vihreää kanavavettä '
                + 'vasten: leveä kaareva terä, jonka alla on kuusi eteenpäin '
                + 'osoittavaa piikkiä. Ferro ei ole pelkkä koriste vaan '
                + 'raskas vastapaino perässä seisovalle soutajalle, jotta '
                + 'veneen litteä pohja pysyisi vaakasuorassa.',
              lahde: 'Adriano, Wikimedia Commons (CC BY-SA 3.0)',
            },
          ],
        },
      ],
      tehtava: {
        kysymys: 'Minkä erikoisoikeuden Muranon lasimestarit saivat?',
        vaihtoehdot: [
          'Luvan kantaa miekkaa',
          'Vapautuksen veroista',
          'Oikeuden omaan laivaan',
          'Paikan dogen neuvostossa',
        ],
        oikea: 0,
        fakta: 'Muranon lasimestarit nauttivat erikoisasemasta ja saivat muun '
          + 'muassa kantaa miekkaa, mutta tasavallan ulkopuolelle heitä ei '
          + 'päästetty.',
      },
    },
  ],
  tukholma: [
    {
      id: 'kaupunki',
      nimi: 'Tukholma',
      johdanto: 'Neljäntoista saaren pääkaupunki, jossa vesi on katua ja kaupungin '
        + 'laidalta lähtee höyrylaiva kolmenkymmenentuhannen saaren '
        + 'saaristoon.',
      kansikuvat: [
        {
          tiedosto: 'Riddarholmen (by Pudelek).JPG',
          selite: 'Riddarholmen Riddarfjärdenin takaa. Terävä valurautainen torni '
            + 'kuuluu Riddarholmenin kirkolle, jonne Ruotsin kuninkaat '
            + 'haudattiin 1600-luvulta 1950-luvulle.',
          lahde: 'Pudelek, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Julmarknad på Stortorget, Gamla stan, Stockholm, 2017b.jpg',
          selite: 'Joulutori Stortorgetilla, Gamla stanin keskusaukiolla. Kapeat '
            + 'talot ovat 1600-luvulta, ja niiden erikokoiset ikkunat '
            + 'kertovat, että jokainen rakensi omaan tahtiinsa.',
          lahde: 'Bysmon, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Storskär August 2015 05.jpg',
          selite: 'Höyrylaiva Storskär ohittaa Vaxholmin linnoituksen. Laiva on '
            + 'vuodelta 1908 ja kulkee yhä saaristoreittiä kesäisin — sen '
            + 'koneet ovat alkuperäiset.',
          lahde: 'Arild Vågen, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Martin piirsi Tukholman ennen valokuvaa',
          tiedosto: 'Stockholmspanorama 1790.jpg',
          teksti: 'Elias Martin oppi ammattinsa Lontoossa, jossa hän asui '
            + 'kaksitoista vuotta ja opetteli akvatinnan — tekniikan, jolla '
            + 'kuparilevystä saa vesivärimäisen sävyn. Kotiin palattuaan 1780 '
            + 'hän kääntyi kaupunkiin, jota kukaan ei ollut piirtänyt '
            + 'sellaisenaan: satamaan, toreille ja työn ääreen. Veli Johan '
            + 'Fredrik kaiversi kuvat levyiksi, ja niitä myytiin sarjoina. Ne '
            + 'ovat tarkin näkymä Tukholmaan ennen valokuvaa.',
          selite: 'Näkymä Tukholmaan Mosebackelta Södermalmilta noin 1790. '
            + 'Kirkontornien takana laivoja on ankkurissa niin tiheässä, että '
            + 'masto peittää maston.',
          lahde: 'Elias Martin, Wikimedia Commons (PD)',
          wiki: 'Elias Martin',
          galleria: [
            {
              otsikko: 'Drottninggatan',
              tiedosto: 'Elias Martin - Street in Stockholm (Drottninggatan) - A II 868 - Finnish National Gallery.jpg',
              selite: 'Drottninggatan matalien puutalojen aikaan. Katu on yhä '
                + 'samassa paikassa, mutta nykyään se on kävelykatu ja talot '
                + 'ovat kivestä.',
              lahde: 'Elias Martin, Wikimedia Commons (PD)',
            },
            {
              otsikko: 'Näkymä Mälarenille',
              tiedosto: 'Southern shore of Lake Mälaren in Stockholm, Sweden (25413579586).jpg',
              selite: 'Mälarenin eteläranta Söderin sulun kohdalta. Purjeveneet '
                + 'toivat kaupunkiin polttopuuta, viljaa ja rautaa sisämaan '
                + 'järviltä.',
              lahde: 'Elias Martin / Riksantikvarieämbetet, Wikimedia Commons (PD)',
            },
            {
              otsikko: 'Rautavaaka',
              tiedosto: '"Järnvågen" - "The Iron Weighing Scale" in Stockholm, Sweden (25969387273).jpg',
              selite: 'Järnvågen eli rautavaaka, jossa punnittiin kaikki '
                + 'Ruotsista ulos lähtenyt tankorauta. Rauta oli maan tärkein '
                + 'vientitavara, ja se kulki tämän pihan kautta.',
              lahde: 'Elias Martin / Riksantikvarieämbetet, Wikimedia Commons (PD)',
            },
            {
              otsikko: 'Skeppsbron portaat',
              tiedosto: 'The steps on Skeppsbro etching by Elias Martin.jpg',
              selite: 'Skeppsbron portaat, joita myöten tavara nostettiin '
                + 'veneistä maihin. Etiketti puuttuu: kuvassa tehdään työtä, '
                + 'ei poseerata.',
              lahde: 'Elias Martin, Wikimedia Commons (PD)',
            },
          ],
        },
        {
          otsikko: 'Maailman pisin taidenäyttely',
          tiedosto: 'Tunnelbana T-Centralen Blue Line (43481298780).jpg',
          teksti: 'Tukholman metrossa on noin sata asemaa, ja niistä yli '
            + 'yhdeksälläkymmenellä on taidetta: maalauksia, veistoksia, '
            + 'mosaiikkeja ja reliefejä yli 150 taiteilijalta. Sinisen linjan '
            + 'asemat louhittiin syvälle kallioon, eikä louhittua pintaa '
            + 'peitetty laatoilla — se ruiskubetonoitiin ja maalattiin '
            + 'sellaisenaan, joten aseman seinä on kirjaimellisesti vuori. '
            + 'Tavallinen matkalippu kelpaa koko näyttelyyn.',
          selite: 'T-Centralenin sinisen linjan laituri. Per Olof Ultvedt maalasi '
            + '1975 karkeaan kallioon siniset köynnökset — rauhallinen väri '
            + 'valittiin kaupungin vilkkaimmalle vaihtoasemalle.',
          lahde: 'Sonse, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Tukholman metro',
        },
        {
          otsikko: 'Laiva, joka upposi ja nousi',
          tiedosto: 'Vasa 14 maj 1961.jpg',
          teksti: 'Kuninkaan ylpeys, sotalaiva Vasa, lähti neitsytmatkalleen '
            + 'Tukholman satamasta 10. elokuuta 1628 — ja kaatui ensimmäiseen '
            + 'kunnon tuulenpuuskaan ehdittyään noin kilometrin. Laiva oli '
            + 'rakennettu liian kapeaksi ja korkeaksi, ja vesi ryntäsi sisään '
            + 'avoimista tykkiporteista. Vasa makasi sataman pohjamudassa 333 '
            + 'vuotta, kunnes se nostettiin 1961 lähes ehjänä: Itämeren '
            + 'vähäsuolainen vesi oli pitänyt laivamadot loitolla. Nykyään '
            + 'alus seisoo omassa museossaan yhä valtaosin alkuperäisenä '
            + 'puuna, ja Vasa-museo on koko Pohjolan suosituimpia museoita.',
          selite: 'Vasa hinataan Beckholmenin kuivatelakalle 14. toukokuuta 1961, '
            + 'kohta noston jälkeen. Runko on musta ja liejun peitossa, vesi '
            + 'valuu kannelta ja rannalla seisoo katsojia.',
          lahde: 'Tuntematon lehtikuvaaja, Wikimedia Commons (public domain)',
          wiki: 'Vasa (laiva)',
        },
      ],
    },
    {
      id: 'rakennukset',
      nimi: 'Kadut ja sulut',
      johdanto: 'Tukholma rakennettiin kapeikkoon, jossa järvi purkautuu mereen — '
        + 'siksi täällä nostetaan veneitä sulussa ja kapein kuja on 90 '
        + 'senttiä leveä.',
      nostot: [
        {
          otsikko: 'Polhem sai sulkutyön 83-vuotiaana',
          tiedosto: 'Blå slussen Cumelin.jpg',
          teksti: 'Mälaren on järvi, jonka pinta on merenpintaa korkeammalla, ja '
            + 'Tukholma seisoo juuri siinä kohdassa, jossa vesi purkautuu '
            + 'Itämereen. Ennen sulkuja veneet piti sauvoa ja hinata virran '
            + 'läpi maksua vastaan, ja moni ajoi matalikolle. Ensimmäisen '
            + 'sulun rakensivat hollantilaiset mestarit kuningatar Kristiinan '
            + 'aikaan, ja se valmistui 1642. Kun siitä tuli liian pieni, työ '
            + 'annettiin 1744 Christopher Polhemille, joka oli silloin '
            + '83-vuotias. Hän kuoli kesken hankkeen, ja poika Gabriel sai '
            + 'sulun valmiiksi 1755.',
          selite: 'Polhemin sulku noin vuonna 1800. Sinisen nostosillan yli '
            + 'kulkee hevoskärry, sulkukanavassa on kiinni purjevene ja '
            + 'taustalla nousee laivojen mastoja.',
          lahde: 'Johan Petter Cumelin, Wikimedia Commons (PD)',
          wiki: 'Christopher Polhem',
          galleria: [
            {
              otsikko: 'Sulku vuonna 2005',
              tiedosto: 'Slussning i Slussen Stockholm 01 2005-08-09.JPG',
              selite: 'Vene odottaa sulussa liikenneramppien alla vuonna 2005 — '
                + 'ylhäällä ajaa punainen bussi. Tämä Slussen purettiin 2016, '
                + 'ja uuden sulun on määrä avautua veneille 2027.',
              lahde: 'Jordgubbe, Wikimedia Commons (CC BY-SA 2.0)',
            },
          ],
        },
        {
          otsikko: 'Kuja, jonne mahtuu yksi kerrallaan',
          tiedosto: 'M Trotzigs gränd 2013.jpg',
          teksti: 'Gamla stanin kortteleiden välissä kulkee Mårten Trotzigs '
            + 'gränd, kapeimmalta kohdaltaan 90 senttimetriä leveä. Se on '
            + 'Tukholman kapein kuja, ja sen 36 porrasaskelmaa laskevat '
            + 'Prästgatanilta alas Västerlånggatanille. Nimi tuli '
            + 'saksalaiselta kauppiaalta, joka muutti kaupunkiin 1581 ja osti '
            + 'kujan varrelta taloja. 1800-luvun puolivälissä kuja suljettiin '
            + 'molemmista päistä lankkuseinällä, ja se avattiin uudelleen '
            + 'vasta 1945.',
          selite: 'Mårten Trotzigs gränd kirkkaana päivänä: seinät melkein '
            + 'koskettavat toisiaan, seinään kiinnitetty lyhty valaisee '
            + 'portaita ja kaukana kujalla kävelee yksi ihminen.',
          lahde: 'Holger Ellgaard, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Gamla stan',
        },
      ],
      tehtava: {
        kysymys: 'Mistä maasta tuotiin väki, joka rakensi Tukholman ensimmäisen '
          + 'sulun?',
        vaihtoehdot: [
          'Norjasta',
          'Hollannista',
          'Englannista',
          'Saksasta',
        ],
        oikea: 1,
        fakta: 'Kuningatar Kristiinan aikaan sulkutyöhön otettiin mestareita '
          + 'Hollannista, ja ensimmäinen sulku valmistui vuonna 1642.',
      },
    },
  ],
  pariisi: [
    {
      id: 'kaupunki',
      nimi: 'Pariisi',
      johdanto: 'Kaupunki, jonka rautatorniin on kirjoitettu kullalla 72 '
        + 'tiedemiehen nimet ja jonka kaikki maantiet mitataan yhdestä '
        + 'pronssisesta tähdestä kadun kivissä.',
      kansikuvat: [
        {
          tiedosto: 'Chimera Notre Dame Paris.jpg',
          selite: 'Kivinen siivekäs olento istuu Notre-Damen tornien välisellä '
            + 'kaiteella leuka käsien varassa ja katsoo kaupungin yli. Nämä '
            + 'kimeerat eivät ole keskiaikaisia, vaan Viollet-le-Duc '
            + 'veistätti ne 1800-luvun korjaustöissä.',
          lahde: 'Lupo, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Cariatide Wallace 1.jpg',
          selite: 'Wallace-suihkukaivon jalusta läheltä: neljä tummanvihreää '
            + 'valurautanaista seisoo selät vastakkain ja kannattelee '
            + 'käsivarsillaan kupolia, jonka keskeltä vesi valuu. He '
            + 'esittävät hyvyyttä, yksinkertaisuutta, laupeutta ja kohtuutta.',
          lahde: 'Coyau, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Point Zéro des Routes de France. Centre de la dalle.JPG',
          selite: 'Notre-Damen edustan katukivissä on kahdeksankulmainen '
            + 'pronssilaatta, jossa on kahdeksansakarainen tuuliruusu. '
            + 'Ympärillä kiveen on hakattu sanat POINT ZERO — tästä kohdasta '
            + 'mitataan kaikkien Ranskan maanteiden kilometrit.',
          lahde: 'Jean-Pierre Bazard, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Tornissa on 72 nimeä kullalla',
          tiedosto: 'Chevreul, Flachat, Navier.001 - Torre Eiffel.jpg',
          teksti: 'Gustave Eiffel halusi, että hänen torninsa on tieteen '
            + 'muistomerkki. Ensimmäisen kerroksen ympäri kiertää 65 metrin '
            + 'korkeudella nimilista: 18 nimeä tornin jokaisella sivulla, '
            + 'yhteensä 72 ranskalaista tiedemiestä ja insinööriä. Kirjaimet '
            + 'ovat kullattuja ja 60 senttiä korkeita. Nimet peitettiin '
            + 'maalilla 1900-luvun alussa ja paljastettiin vasta 1986–1987. '
            + 'Yhtään naista listalla ei ole. Siksi tammikuussa 2026 '
            + 'julkistettiin toinen 72 nimen lista, pelkkiä naistutkijoita, '
            + 'jotka on tarkoitus kaivertaa miesten nimien yläpuolelle vuonna '
            + '2027.',
          selite: 'Lähikuva ensimmäisen kerroksen kaidenauhasta: kohokirjaimin '
            + 'lukee CHEVREUL, FLACHAT, NAVIER, ja alla näkyy tornin niitattu '
            + 'ristikko. Kemisti Chevreul kävi katsomassa työmaata melkein '
            + 'päivittäin ja kuoli 102-vuotiaana yhdeksän päivää tornin '
            + 'avajaisten jälkeen.',
          lahde: 'Fernando Losada Rodríguez, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Eiffel-torni',
        },
        {
          otsikko: 'Metron sisäänkäynti koottiin palasista',
          tiedosto: '01 Guimard\'s Métropolitain.jpg',
          teksti: 'Pariisin metro avattiin 19. heinäkuuta 1900. Sisäänkäynneistä '
            + 'oli järjestetty arkkitehtikilpailu, mutta yksikään 21 '
            + 'ehdotuksesta ei kelvannut, ja työ annettiin Hector '
            + 'Guimardille, joka ei ollut edes osallistunut kilpailuun. Hän '
            + 'piirsi valurautaisia vakio-osia, jotka sopivat yhteen kuin '
            + 'rakennussarja: samoista paloista sai kasattua sopivan '
            + 'sisäänkäynnin mihin tahansa kadunkulmaan. Niitä tehtiin 167. '
            + 'Sitten tyyli meni pois muodista ja puolet purettiin. Jäljellä '
            + 'olevat 86 rauhoitettiin vuonna 1978.',
          selite: 'Guimardin emalikilpi puiden lehvien keskellä: sana '
            + 'MÉTROPOLITAIN vihreillä, käsin piirretyillä kirjaimilla '
            + 'keltaisella pohjalla. Kilpeä kannattaa kaartuva '
            + 'valurautatanko, ja oikeassa alanurkassa lukee pienellä Hector '
            + 'Guimard Arch. Vasemmassa reunassa näkyy lyhtypylvään latvan '
            + 'tumma silmu.',
          lahde: 'Terrazzo (Flickr), Wikimedia Commons (CC BY 2.0)',
          wiki: 'Pariisin metro',
        },
        {
          otsikko: 'Kukko putosi ja löytyi seuraavana päivänä',
          tiedosto: 'Coq de Notre-Dame de Paris 2020.jpg',
          teksti: 'Notre-Damen ullakko syttyi 15. huhtikuuta 2019, ja keskitorni '
            + 'romahti kello 19.45. Katon alla paloi 1 300 tammirungosta '
            + 'tehty kattotuolisto, joka oli 1200-luvulta. Tornin huipulla '
            + 'seisoi kuparinen kukko, jonka sisään oli suljettu '
            + 'pyhäinjäännöksiä. Ensin sitä luultiin tuhoutuneeksi, mutta se '
            + 'löytyi seuraavana päivänä maasta lommoilla. Onnea oli '
            + 'muutenkin: kuusitoista kuparipatsasta oli nostettu katolta '
            + 'korjattavaksi neljä päivää ennen paloa. Uuden kullatun kukon '
            + 'sisään pantiin samat pyhäinjäännökset ja 2 000 '
            + 'jälleenrakentajan nimet.',
          selite: 'Vanha kukko lasivitriinissä. Kupari on hapettunut '
            + 'vaaleanvihreäksi, ja siipi- ja pyrstösulat ovat pudotuksessa '
            + 'revenneet ja litistyneet levyiksi. Kukko nostettiin uuden '
            + 'tornin huipulle 16. joulukuuta 2023, ja katedraali avattiin '
            + 'yleisölle 7. joulukuuta 2024.',
          lahde: 'Siren-Com, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Notre-Damen katedraali',
        },
      ],
    },
    {
      id: 'musiikki',
      nimi: 'Musiikki',
      johdanto: 'Kaksi muusikkoa aloitti Pariisin kaduilta ja kaupungin laidan '
        + 'asuntovaunuleiriltä — ja teki lauluja, joita soitetaan yhä '
        + 'kaikkialla maailmassa.',
      nostot: [
        {
          otsikko: 'Édith Piaf lauloi ensin kadulla',
          tiedosto: 'Édith Piaf 914-6440.jpg',
          teksti: 'Édith Piaf syntyi Bellevillessä joulukuussa 1915. Tarinan '
            + 'mukaan hän syntyi kadulla talon portaille, vaikka '
            + 'syntymätodistuksessa lukee sairaala. Teininä hän lauloi '
            + 'kolikoista Pigallen kaduilla ja pihoissa sisarpuolensa kanssa. '
            + 'Yökerhon omistaja Louis Leplée kuuli hänet kadulta vuonna 1935 '
            + 'ja antoi lempinimen la Môme Piaf — piaf on pariisilaista '
            + 'puhekieltä ja tarkoittaa varpusta. Laulaja oli 142 senttiä '
            + 'pitkä. Tunnetuin laulu La Vie en rose ilmestyi 1946, ja sen '
            + 'sanat hän kirjoitti itse.',
          selite: 'Piaf laulamassa Rotterdamissa 13. joulukuuta 1962, alle vuosi '
            + 'ennen kuolemaansa. Hän seisoo mikrofonin vieressä mustassa '
            + 'mekossa kädet ristissä rinnan edessä ja katsoo ylös — asu ja '
            + 'asento olivat hänen tavaramerkkinsä.',
          lahde: 'Eric Koch / Anefo, Wikimedia Commons (CC0)',
          wiki: 'Édith Piaf',
          musiikki: 'https://music.apple.com/fi/search?term=edith%20piaf%20la%20vie%20en%20rose',
          musiikkiNimi: 'Édith Piaf Apple Musicissa',
        },
        {
          otsikko: 'Kaksi sormea riitti',
          tiedosto: 'Reinhardt Harcourt 1944.jpg',
          teksti: 'Django Reinhardt kasvoi romaniperheen asuntovaunussa Pariisin '
            + 'porttien luona ja soitti banjoa pihoissa ja tanssipaikoissa jo '
            + 'lapsena. Lokakuussa 1928 vaunussa syttyi tulipalo: kynttilä '
            + 'kaatui selluloidikukkien päälle. Vasemman käden nimetön ja '
            + 'pikkurilli jäivät liikkumattomiksi, ja lääkärit sanoivat, '
            + 'ettei hän soita enää. Veli toi sairaalaan kitaran, ja Django '
            + 'opetteli soittamaan soolot kahdella sormella. Vuonna 1934 hän '
            + 'perusti Pariisissa yhtyeen Quintette du Hot Club de France.',
          selite: 'Django Reinhardt studiokuvassa vuonna 1944, kymmenen vuotta '
            + 'yhtyeensä perustamisen jälkeen. Palossa vaurioitunut vasen '
            + 'käsi jää kuvassa piiloon — kuulijat huomasivat sen vain '
            + 'nuoteista, eivät soitosta.',
          lahde: 'Studio Harcourt, Wikimedia Commons (PD)',
          wiki: 'Django Reinhardt',
          musiikki: 'https://music.apple.com/fi/search?term=django%20reinhardt%20minor%20swing',
          musiikkiNimi: 'Django Reinhardt Apple Musicissa',
        },
      ],
      tehtava: {
        kysymys: 'Mikä sytytti tulipalon Djangon perheen asuntovaunussa?',
        vaihtoehdot: [
          'unohtunut öljylamppu',
          'kipinä kamiinasta',
          'kaatunut kynttilä',
          'rikkoutunut lyhty',
        ],
        oikea: 2,
        fakta: 'Palo alkoi lokakuussa 1928, kun kynttilä kaatui selluloidista '
          + 'tehtyjen kukkien päälle Djangon perheen asuntovaunussa.',
      },
    },
  ],
  ateena: [
    {
      id: 'kaupunki',
      nimi: 'Ateena',
      johdanto: 'Kaupunki, jossa marmoritorni mittasi aikaa vedellä ja jossa '
        + 'vesikantaja voitti maailman ensimmäisen olympiamaratonin.',
      kansikuvat: [
        {
          tiedosto: 'Parthenon Columns, Acropolis, Athens (10045439306).jpg',
          selite: 'Parthenonin pylväitä ja niiden yllä lepäävä marmoripalkisto '
            + 'läheltä. Temppelissä ei ole juuri suoria viivoja: jalusta '
            + 'kaartuu keskeltä noin kymmenen senttiä ylöspäin ja pylväät '
            + 'kallistuvat hiukan sisäänpäin.',
          lahde: 'Sharon Mollerus, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Odeon of Herodes Atticus 2019.jpg',
          selite: 'Herodes Atticuksen odeion Akropoliin rinteessä ylhäältä '
            + 'nähtynä: marmoriset istuinrivit kaartuvat puoliympyräksi, '
            + 'takana kohoaa kaarien lävistämä näyttämöseinä ja sen takana '
            + 'levittäytyy nykyinen Ateena.',
          lahde: 'Thodorisv, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Anafiotika, Athens, 20240601 0923 0020.jpg',
          selite: 'Anafiótikan kuja Akropoliin alarinteessä: kalkittu talo, '
            + 'oranssit ikkunaluukut, kiviportaat ja Kreikan lippu '
            + 'parvekkeella. Kujilla ei ole nimiä, joten talot on vain '
            + 'numeroitu — ovessa lukee 22.',
          lahde: 'Jakub Hałun, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Viisi siskoa museossa, kuudes Lontoossa',
          tiedosto: 'Caryatids from the Erechtheion on the Acropolis, Acropolis Museum, Athens (13889706087).jpg',
          teksti: 'Akropoliin Erekhtheion-temppelin eteläkuistia eivät kanna '
            + 'pylväät vaan kuusi marmorista neitoa, karyatidia. Yksikään ei '
            + 'ole toisensa kopio: kampaus, laskokset ja polven asento '
            + 'vaihtelevat. Lordi Elgin vei yhden 1800-luvun alussa '
            + 'Lontooseen, ja Akropoliin museossa seisoo nykyään viisi. '
            + 'Kuudennen jalusta on jätetty tyhjäksi. Vuosina 2011–2015 '
            + 'patsaat puhdistettiin laserilla mustasta noesta, ja '
            + 'museovieraat saivat seurata työtä suorana näytöltä.',
          selite: 'Kaksi Erekhtheionin karyatidia Akropoliin museossa. Käsivarret '
            + 'ovat katkenneet, mutta pään päällä on yhä marmorilohkare, joka '
            + 'kannatti kattoa, ja puvun laskokset valuvat alas kuin uurteet '
            + 'pylväässä.',
          lahde: 'Carole Raddato, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Karyatidi',
        },
        {
          otsikko: 'Vesikantaja voitti ensimmäisen maratonin',
          tiedosto: 'Spyridon Louis 1896.jpg',
          teksti: 'Ateenan Kallimarmaro on maailman ainoa kokonaan marmorista '
            + 'rakennettu stadion. Kun uuden ajan ensimmäiset olympialaiset '
            + 'alkoivat siellä keväällä 1896, katsomossa oli noin 60 000 '
            + 'ihmistä. Maratonille lähti seitsemäntoista juoksijaa, ja '
            + 'voittaja oli 23-vuotias Spyridon Louis. Hän kantoi työkseen '
            + 'juomavettä Maroúsista Ateenaan, jossa ei vielä ollut '
            + 'vesijohtoa. Aika oli 2.58.50. Voittajat eivät saaneet kultaa '
            + 'vaan hopeamitalin ja oliivinoksan.',
          selite: 'Spyridon Louis vuonna 1896 kansallispuvussa: päähineessä '
            + 'roikkuu pitkä tupsu, liivin reunoja kiertävät tiheät napit ja '
            + 'rinnassa riippuu mitali, jossa erottuu risti.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Spyrídon Loúis',
          galleria: [
            {
              otsikko: 'Maali marmorikatsomon keskellä',
              tiedosto: 'Louis entering Kallimarmaron at the 1896 Athens Olympics.jpg',
              selite: 'Louis saapuu stadionille maratonin lopussa. Katsomon '
                + 'rinteet ovat mustanaan ihmisiä ylimmälle riville asti, ja '
                + 'etualalla katsojat heiluttavat hattujaan.',
              lahde: 'Wikimedia Commons (PD)',
            },
            {
              otsikko: 'Palkintona oksa puusta',
              tiedosto: 'Spyridon louis marathon winner.jpg',
              selite: 'Louis heti voiton jälkeen valkoisiin pukeutuneena, '
                + 'kädessään oliivinoksa. Ympärillä seisoo silinteri- ja '
                + 'knallihattuisia herroja.',
              lahde: 'Wikimedia Commons (PD)',
            },
          ],
        },
        {
          otsikko: 'Torni, joka mittasi ajan vedellä',
          tiedosto: 'The Upper Part of the Tower of the Winds (Horologion of Andronikos Kyrrhestes).jpg',
          teksti: 'Ateenan roomalaisajan torilla seisoo kahdeksankulmainen '
            + 'marmoritorni, joka valmistui noin vuonna 50 eaa. Se on '
            + 'antiikin ainoa säilynyt kellotorni. Jokaisella kahdeksalla '
            + 'sivulla lentää oma tuulenjumalansa, ja hänen allaan seinään on '
            + 'kaiverrettu aurinkokello. Kun aurinko oli pilvessä, aikaa piti '
            + 'sisällä käyvä vesikello, jota pyöritti Akropoliin lähteestä '
            + 'johdettu vesi. Katolla seisoi pronssinen Triton, joka kääntyi '
            + 'tuulen mukana ja osoitti sauvallaan mistä se puhalsi.',
          selite: 'Tuulten tornin yläosa alhaalta kuvattuna. Keskellä lentää '
            + 'parrakas Euros, kaakkoistuuli, oikealla Apeliotes hedelmät '
            + 'viittansa helmassa. Alempana seinässä näkyvät aurinkokellon '
            + 'viivat ja niiden keskeltä työntyvä metallipiikki.',
          lahde: 'George E. Koronaios, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Tuulten torni',
          galleria: [
            {
              otsikko: 'Kahdeksan sivua, kaksitoista metriä',
              tiedosto: 'Tower of the Winds, Athens, 20240531 0912 9419.jpg',
              selite: 'Koko torni Rooman torilla. Se on 12 metriä korkea, jotta '
                + 'kellot näkyisivät torille asti. Ottomaanien aikaan torni '
                + 'oli hautautunut puoliväliin asti maan alle.',
              lahde: 'Jakub Hałun, Wikimedia Commons (CC BY 4.0)',
            },
          ],
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Kaupungin halvin kunnon ateria syödään kävellen, ja sen hitain '
        + 'kävely tehdään kengissä, joiden pohjissa on kymmeniä nauloja.',
      nostot: [
        {
          otsikko: 'Souvlaki syödään seisaaltaan',
          tiedosto: 'Souvlaki in Athens.JPG',
          teksti: 'Souvlaki on grillattua lihaa vartaassa, ja ateenalainen ostaa '
            + 'sen useimmiten luukulta käärittynä: pitaleivän sisään ladotaan '
            + 'liha, tomaatti, sipuli, tzatziki ja ranskalaiset, kääre '
            + 'kiedotaan paperiin ja ateria syödään kadulla kävellen. Jos '
            + 'istuu pöytään ja tilaa merídan, sama ruoka tulee lautasella '
            + 'osissa. Vartaan oma nimi on Ateenassa kalamáki, pikkuruoko.',
          selite: 'Merída-annos ateenalaisessa ravintolassa: kolme lihavarrasta, '
            + 'paloiteltua grillattua pitaa, ranskalaisia, sitruunalohko ja '
            + 'nokare tzatzikia lautasen reunalla.',
          lahde: 'Miyagawa, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Suvlaki',
        },
        {
          otsikko: 'Evzonit ja tupsukengät',
          tiedosto: 'Evzones, Presidential Guard (41263349224).jpg',
          teksti: 'Tuntemattoman sotilaan haudalla vartioivat evzonit kävelevät '
            + 'hitaasti kuin unessa, ja jalka nousee jokaisella askelella '
            + 'suoraksi eteen. Sunnuntaisin ja juhlapäivinä heillä on yllään '
            + 'valkoinen foustanella-hame, jonka 30 metriin kangasta on '
            + 'laskostettu 400 laskosta — kerrotaan, että yksi jokaista '
            + 'ottomaanivallan vuotta kohti. Punaiset tsarouhia-kengät '
            + 'painavat parina noin kolme kiloa, ja pohjissa on kymmeniä '
            + 'nauloja.',
          selite: 'Kaksi evzonia vartionvaihdossa tuntemattoman sotilaan haudan '
            + 'edessä; taustan marmorireliefissä makaa kaatunut soturi. '
            + 'Arkipuvun hame on hiekanruskea, fessi punainen mustine '
            + 'tupsuineen, säärissä valkoiset villasukat ja jalassa punaiset '
            + 'tupsukengät.',
          lahde: 'Luc.T, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Eusonit',
          galleria: [
            {
              otsikko: 'Kenkä, joka kalisee marmorilla',
              tiedosto: 'EvzoneTsarouhiKaltsodetes.jpg',
              selite: 'Evzonin jalka läheltä: punainen nahkakenkä, jonka ylös '
                + 'kääntyvässä kärjessä on iso musta villatupsu, valkoinen '
                + 'villasukka ja polven alla musta sukkanauha hapsuineen.',
              lahde: 'Thermos, Wikimedia Commons (CC BY 3.0)',
            },
          ],
        },
      ],
      tehtava: {
        kysymys: 'Mitä ateenalaisen souvlaki-kääreen sisään ladotaan lihan ja '
          + 'tzatzikin seuraksi?',
        vaihtoehdot: [
          'Ranskalaiset perunat',
          'Keitetty riisi',
          'Paistetut munakoisot',
          'Suolatut oliivit',
        ],
        oikea: 0,
        fakta: 'Ateenalaiseen souvlaki-kääreeseen menee lihan, tomaatin, sipulin '
          + 'ja tzatzikin lisäksi ranskalaiset, ja koko kääre kiedotaan '
          + 'paperiin syötäväksi kävellen.',
      },
    },
  ],
  amsterdam: [
    {
      id: 'kaupunki',
      nimi: 'Amsterdam',
      johdanto: 'Kaupunki, joka seisoo suon päällä puutukkien varassa: talot '
        + 'tehtiin kapeiksi veron takia, ja osa asukkaista asuu veneessä.',
      kansikuvat: [
        {
          tiedosto: 'Colorful canal houses at golden hour in Damrak avenue Amsterdam the Netherlands.jpg',
          selite: 'Damrakin talorivi nousee suoraan vedestä. Talot ovat kapeita '
            + 'ja korkeita, ja jokaisen katonharjalla on erimuotoinen pääty — '
            + 'porrasmainen, kellomainen tai kaulaksi kavennettu.',
          lahde: 'Basile Morin, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Brouwersgracht pakhuizen.jpg',
          selite: 'Brouwersgrachtin entisiä makasiineja. Punavalkoiset luukut '
            + 'peittävät aukot, joista tavara nostettiin sisään, ja kanavassa '
            + 'niiden edessä on kiinni pitkiä asuntolaivoja.',
          lahde: 'Jvhertum, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Amsterdam-Begijnhof-Houtenhuys.jpg',
          selite: 'Het Houten Huys Begijnhofin nurmikentän laidassa: tumma '
            + 'lautajulkisivu ja valkoiset ikkunankarmit. Talo on vuodelta '
            + '1528 tai vähän myöhemmältä ja yksi kahdesta puujulkisivuisesta '
            + 'talosta, joita Amsterdamissa on enää jäljellä.',
          lahde: 'Keeshu, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Verotettiin julkisivun leveydestä',
          tiedosto: 'Detail van de top van de voorgevel, een klokgevel, met hijsbalk - Amsterdam - 20528909 - RCE.jpg',
          teksti: '1600-luvulla Amsterdamin kiinteistövero laskettiin julkisivun '
            + 'leveydestä, joten taloista tehtiin kapeita ja syviä. Kapein '
            + 'niistä, Oude Hoogstraat 22, on 2,02 metriä leveä ja kuusi '
            + 'metriä syvä. Portaat ovat siksi jyrkät kuin tikkaat, eikä '
            + 'sohvaa saa niitä pitkin ylös. Sen sijaan päätykolmion alta '
            + 'työntyy ulos nostopuu, hijsbalk, jonka koukusta huonekalut '
            + 'vedetään köydellä ikkunasta sisään.',
          selite: 'Kellonmuotoinen päätykoriste ja siitä ulos työntyvä '
            + 'hijsbalk-nostopuu puisessa kotelossaan. Talot rakennettiin '
            + 'hieman eteenpäin kallelleen, jottei nostettava tavara kolhisi '
            + 'julkisivua.',
          lahde: 'René Gerritsen, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Amsterdam',
        },
        {
          otsikko: 'Koko kaupunki seisoo puutukkien päällä',
          tiedosto: 'Amsterdam stut zijn huizen met palen Perceel Herengracht 537 achter palenbos, Bestanddeelnr 912-2174.jpg',
          teksti: 'Amsterdamin alla ei ole kalliota vaan suota ja löysää hiekkaa. '
            + 'Siksi jokainen talo seisoo maahan lyötyjen puupaalujen '
            + 'varassa, jotka ulottuvat pehmeän kerroksen läpi kovaan '
            + 'pohjahiekkaan. Dam-aukion palatsi, joka avattiin '
            + 'kaupungintaloksi vuonna 1655, lepää 13 659 paalun päällä. '
            + 'Paalu kestää niin kauan kuin se pysyy veden alla: jos '
            + 'pohjavesi laskee, puu alkaa lahota ja talo nojaa naapuriinsa.',
          selite: 'Herengracht 537 maaliskuussa 1961: talon julkisivu on tuettu '
            + 'kadulle pystytetyllä paksujen puupaalujen metsällä. Uutiskuvan '
            + 'teksti kuului "Amsterdam tukee talojaan paaluilla".',
          lahde: 'Harry Pot / Anefo, Wikimedia Commons (CC0)',
          wiki: 'Paalutus',
        },
        {
          otsikko: 'Kanavalla asuu laivallinen kissoja',
          tiedosto: 'De Poezenboot (Exterior), Amsterdam (2168146135).jpg',
          teksti: 'Amsterdamissa on yli sata kilometriä kanavia, ja niissä kelluu '
            + 'satoja asuntolaivoja. Yhdellä niistä asuu pelkkiä kissoja. '
            + 'Henriëtte van Weelde alkoi vuonna 1966 kerätä kulkukissoja '
            + 'kotiinsa, ja kun asunto kävi ahtaaksi, hän avasi niille vuonna '
            + '1968 oman laivan Singel-kanavaan. Poezenboot eli Kissalaiva on '
            + 'yhä siinä: kissoja on kiireisimpinä aikoina noin 60, ne '
            + 'kulkevat vapaana kannella, ja vieraat saavat tulla katsomaan.',
          selite: 'Poezenboot kiinnitettynä Singel-kanavan reunaan. Matala '
            + 'punaruskea laiva on lähes ikkunaa täynnä, kannen ympäri '
            + 'kiertää aitaus, ja takana nousee tavallinen kanavatalojen '
            + 'rivi.',
          lahde: 'Antony Stanley, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Asuntolaiva',
          galleria: [
            {
              otsikko: 'Kissat vuonna 1986',
              tiedosto: 'Mevrouw H. van Weelde en enkele medewerksters openen kooien op Poezenboot op S, Bestanddeelnr 933-5755.jpg',
              selite: 'Henriëtte van Weelde ja avustajat avaavat häkkejä '
                + 'Kissalaivalla helmikuussa 1986. Mustia kissoja kävelee '
                + 'laattalattialla, ja keskellä huonetta on niitä varten '
                + 'nojatuoli.',
              lahde: 'Roland Gerrits / Anefo, Wikimedia Commons (CC0)',
            },
            {
              otsikko: 'Kanavan pohjassa on pyöriä',
              tiedosto: 'Three bikes on the canal bridge in Amsterdam (3798069610).jpg',
              selite: 'Polkupyöriä lukittuna kanavasillan kaiteeseen '
                + 'iltahämärässä. Kaikki eivät pysy sillalla: Amsterdamin '
                + 'kanavista nostetaan joka vuosi 12 000–15 000 pyörää.',
              lahde: 'joiseyshowaa, Wikimedia Commons (CC BY-SA 2.0)',
            },
          ],
        },
      ],
    },
    {
      id: 'taide',
      nimi: 'Taide',
      johdanto: 'Kaksi maalausta samassa museossa: toisesta sahattiin palat pois, '
        + 'toisen alta löytyi tavaroita, jotka maalari itse peitti.',
      nostot: [
        {
          otsikko: 'Yövartiosta sahattiin palat pois',
          tiedosto: 'The Night Watch - cropped.jpg',
          teksti: 'Rembrandt maalasi vuonna 1642 kaartin ryhmäkuvan, joka on '
            + 'nykyään 363 senttiä korkea ja 437 leveä. Vuonna 1715 taulu '
            + 'siirrettiin kaupungintaloon, eikä se mahtunut sille varatulle '
            + 'seinälle — joten sitä leikattiin joka reunalta. Vasemmalta '
            + 'katosi kaksi miestä ja alta askelman reuna, ylhäältä '
            + 'holvikaaren huippu. Palasia ei ole löydetty. Nimikin on väärä: '
            + 'teos ei esitä yötä, vaan pinta oli tummunut lakasta, joka '
            + 'poistettiin vasta 1940-luvulla.',
          selite: 'Yövartio kokonaisuudessaan. Mustapukuinen kapteeni ja hänen '
            + 'keltapukuinen luutnanttinsa astuvat eteenpäin, ja heidän '
            + 'takanaan seisoo kultamekkoinen tyttö, jonka vyöltä roikkuu '
            + 'kuollut kana — kanan kynnet olivat kaartin tunnus.',
          lahde: 'Rembrandt, Wikimedia Commons (PD)',
          wiki: 'Yövartio',
          galleria: [
            {
              otsikko: 'Näin taulu näytti ennen leikkausta',
              tiedosto: 'Lundens - Nachtwache-Kopie.jpg',
              selite: 'Gerrit Lundens teki Yövartiosta pienen kopion ennen kuin '
                + 'alkuperäistä leikattiin. Kopiossa vasemmalla on vielä '
                + 'kaide ja kaksi ylimääräistä hahmoa, ja koko holvikaari '
                + 'mahtuu kuvaan.',
              lahde: 'Gerrit Lundens, Wikimedia Commons (PD)',
            },
          ],
        },
        {
          otsikko: 'Vermeer peitti omat esineensä maalilla',
          tiedosto: 'Johannes Vermeer - Het melkmeisje - Google Art Project.jpg',
          teksti: 'Maitotyttö on pienempi kuin useimmat kuvittelevat: 45,5 '
            + 'senttiä korkea ja 41 leveä. Johannes Vermeer maalasi sen noin '
            + 'vuonna 1660, ja koko hänen tuotannostaan tunnetaan vain '
            + 'runsaat kolmekymmentä työtä. Vuonna 2022 taulu kuvattiin '
            + 'röntgenillä ja infrapunavalossa. Maalikerroksen alta '
            + 'paljastui, että Vermeer oli aloittanut seinälle kannuhyllyn ja '
            + 'lattialle tulikorin — ja maalannut molemmat itse umpeen, niin '
            + 'että katse jää maitoon ja käsiin.',
          selite: 'Keittiöapulainen kaataa maitoa savipataan. Seinällä roikkuu '
            + 'leipäkori korkealla, jotta hiiret eivät ylety siihen, oikealla '
            + 'lattialla on jalkalämmitin, ja seinässä näkyy nauloja ja '
            + 'naulanreikiä.',
          lahde: 'Johannes Vermeer, Wikimedia Commons (PD)',
          wiki: 'Maitotyttö',
        },
      ],
      tehtava: {
        kysymys: 'Mitkä kaksi esinettä Vermeer maalasi Maitotyttöön ensin ja '
          + 'peitti sitten itse?',
        vaihtoehdot: [
          'Kannuhylly ja tulikori',
          'Peili ja kynttilänjalka',
          'Ikkunaverho ja tuoli',
          'Seinäkartta ja pesuvati',
        ],
        oikea: 0,
        fakta: 'Vuoden 2022 röntgen- ja infrapunakuvaus paljasti maalin alta '
          + 'kannuhyllyn ja tulikorin, jotka Vermeer oli itse peittänyt.',
      },
    },
  ],
  istanbul: [
    {
      id: 'kaupunki',
      nimi: 'Istanbul',
      johdanto: 'Kaupunki kahdella mantereella, jonka alla on pylväiden '
        + 'kannattama vesisäiliö, keskellä faaraon obeliski ja joka '
        + 'kadunkulmassa oma kissa.',
      kansikuvat: [
        {
          tiedosto: 'Istanbul Basilica Cistern 2009.JPG',
          lahde: 'Bjørn Christian Tørrissen, Wikimedia Commons (CC BY-SA 3.0)',
          selite: 'Yerebatanin vesisäiliö kaupungin alla. Pylväsrivit katoavat '
            + 'hämärään, vesi peilaa holvit, ja valaistus värjää kiven '
            + 'punaiseksi.',
        },
        {
          tiedosto: 'Ortaköy Mosque and Bosphorus Bridge, Istanbul 2008.jpg',
          selite: 'Ortaköyn moskeija Bosporin rannassa. Takana kaartuu '
            + 'riippusilta, joka vie salmen yli Aasian puolelle, ja sen '
            + 'alitse liukuu lautta.',
          lahde: 'Darwinek, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Istanbul spice bazaar 02.jpg',
          selite: 'Maustebasaarin koju Eminönüssä. Etualalla on kasoittain '
            + 'kuivattuja taateleita, aprikooseja ja viikunoita, oikealla '
            + 'rivi lokumia — ja jokaisessa kasassa oma hintalappunsa.',
          lahde: 'Takeaway, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Kadun kissat ovat kaikkien kissoja',
          tiedosto: 'Hagia Sophia Cat Gli.png',
          teksti: 'Istanbulin katukissoja arvioidaan olevan sadastatuhannesta yli '
            + 'miljoonaan. Niitä ei pidetä irtolaisina vaan korttelin '
            + 'yhteisinä lemmikkeinä: kauppias jättää ovensa eteen vesikupin '
            + 'ja talveksi pahvilaatikon. Kuuluisin niistä oli Gli, joka '
            + 'syntyi Hagia Sofiassa vuonna 2004 ja asui siellä kuudentoista '
            + 'vuoden ajan. Presidentti Barack Obama pysähtyi silittämään sitä '
            + 'vierailullaan 2009. Gli haudattiin Hagia Sofian pihaan.',
          selite: 'Gli Hagia Sofian marmorilattialla ruokakuppinsa vieressä. '
            + 'Kissa syntyi rakennuksessa, joka oli silloin museo, ja tuli '
            + 'tunnetuksi tuhansien matkailijoiden valokuvista.',
          lahde: 'Kadı, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Hagia Sofia',
        },
        {
          otsikko: 'Medusa kannattelee pylvästä ylösalaisin',
          tiedosto: 'Medusa Head at Basilica Cistern, Istanbul, Turkey (Ank Kumar) 06.jpg',
          teksti: 'Hagia Sofiasta parinsadan metrin päässä laskeutuu 52 porrasta '
            + 'maan alle. Siellä '
            + 'on Yerebatan, keisari Justinianuksen 500-luvulla rakennuttama '
            + 'vesisäiliö: 336 pylvästä, jokainen yhdeksän metriä korkea. '
            + 'Kaupunki unohti sen vuosisadoiksi. Vasta 1500-luvulla '
            + 'ranskalainen matkaaja ihmetteli, miksi talojen lattioissa on '
            + 'reikiä, joista lasketaan ämpäri — ja joistakin nousee kaloja. '
            + 'Kahden pylvään jalustaksi on pantu kivi, johon on veistetty '
            + 'Medusan kasvot. Toinen on kyljellään, toinen ylösalaisin, eikä '
            + 'kukaan tiedä miksi.',
          selite: 'Toinen Medusan päistä pylvään alla Yerebatanin holvissa. Kivi '
            + 'on käännetty ylösalaisin, silmät ovat kiinni ja hiusten '
            + 'käärmeet kiertyvät kasvojen ympäri.',
          lahde: 'Ank Kumar, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Yerebatan Sarayı',
        },
        {
          otsikko: 'Faaraon kivi Sultanahmetin aukiolla',
          tiedosto: 'The Obelisk of Theodosius, Hippodrome, Istanbul (8369126849).jpg',
          teksti: 'Sultanahmetin aukio oli ennen hippodromi, hevosvaunujen '
            + 'kilparata. Sen keskellä seisoo yhä punagraniittinen obeliski, '
            + 'joka veistettiin Egyptissä faarao Thutmosis III:n aikana noin '
            + '1450 eaa. Mikään muu kaupungissa pystyssä oleva ei ole yhtä '
            + 'vanhaa tekoa. '
            + 'Keisari Theodosius toi sen Konstantinopoliin vuonna 390, ja '
            + 'jalustaan hakattiin kaksi kertomusta pystyttämisestä: '
            + 'latinankielinen kehuu työn kestäneen kolmekymmentä päivää, '
            + 'kreikankielisessä lukee kolmekymmentäkaksi.',
          selite: 'Obeliski Sultanahmetin aukiolla. Jokaisella sivulla kulkee '
            + 'yksi pystyrivi hieroglyfejä, ja huippu on hakattu pieneksi '
            + 'pyramidiksi.',
          lahde: 'Carole Raddato, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Konstantinopolin hippodromi',
          galleria: [
            {
              otsikko: 'Hieroglyfit läheltä',
              tiedosto: 'Obelisk of Thutmosis III, Istanbul, Turkey 001.jpg',
              selite: 'Obeliskin kylkeä läheltä: soikion sisällä on faaraon nimi, '
                + 'jossa erottuu kovakuoriainen, ja soikion alla haukka ja '
                + 'aaltoviivat.',
              lahde: 'Moonik, Wikimedia Commons (CC BY-SA 3.0)',
            },
          ],
        },
      ],
    },
    {
      id: 'historia',
      nimi: 'Historia',
      johdanto: 'Istanbul oli yli tuhat vuotta Rooman valtakunnan pääkaupunki ja '
        + 'sen jälkeen lähes viisisataa vuotta osmanien. Kummastakin jäi '
        + 'jotain, mikä yhä näkyy tai kuuluu kadulla.',
      nostot: [
        {
          otsikko: 'Maailman vanhin sotilassoittokunta',
          tiedosto: 'Istanbul Military Museum Mehter show in 2016 25 9327.jpg',
          teksti: 'Mehter on osmanien sotilassoittokunta ja vanhin tunnettu '
            + 'marssiva soittokunta maailmassa. Täydessä kokoonpanossa '
            + 'jokaista soitinta oli yhdeksän: yhdeksän rumpua, yhdeksän '
            + 'kimeää zurnaa, yhdeksän lautasparia. Jyminä kuului Euroopan '
            + 'puolelle asti, ja Haydn, Mozart ja Beethoven kirjoittivat '
            + 'kaikki musiikkia, joka matkii sitä. Soittokunta lakkautettiin '
            + '1826, mutta Istanbulin sotilasmuseon johtaja herätti sen '
            + 'henkiin 1911. Museossa se marssii yhä.',
          selite: 'Mehter-soittokunta esiintyy Istanbulin sotilasmuseossa '
            + 'Harbiyessä. Tummansiniviittaiset rumpalit kantavat hihnoilla '
            + 'viininpunaisia, kullalla koristeltuja davul-rumpuja, ja '
            + 'oikealla erottuu vihreä ja punainen kaftaani sekä sapeli.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Mehter',
          musiikki: 'https://music.apple.com/fi/search?term=mehter',
          musiikkiNimi: 'Mehter-marsseja Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/ceddin-deden/06-Ceddin%20Deden%20%5B1080p%5D.mp3',
          musiikkiNayteNimi: 'Mehter-marssi "Ceddin Deden" — CC0',
        },
        {
          otsikko: 'Vesijohto, jonka ali ajetaan autolla',
          tiedosto: 'Bozdoģan Kemeri - panoramio.jpg',
          teksti: 'Fatihin kaupunginosassa kulkee kahdessa kerroksessa kivikaaria '
            + 'kukkulalta toiselle. Se on Valensin vesijohto, joka vihittiin '
            + 'käyttöön vuonna 373, ja sitä on jäljellä 921 metriä. Kaarien '
            + 'alta kulkee nykyään vilkas Atatürk-bulevardi: autot ajavat '
            + 'suoraan yli 1600 vuotta vanhan sillan alitse. Vettä tuotiin '
            + 'lähteiltä yli sadan kilometrin päästä, ja kanavia kertyi '
            + 'kaikkiaan yli 250 kilometriä — antiikin pisin. Vesi '
            + 'varastoitiin maan alle, muun muassa siihen säiliöön, jossa '
            + 'Medusa nukkuu.',
          selite: 'Bozdoğan Kemeri Atatürk-bulevardin yllä. Alempi kaaririvi '
            + 'kannattaa ylempää, ja autot ajavat kaaren alitse molempiin '
            + 'suuntiin.',
          lahde: 'Laima Gūtmane, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Akvedukti',
        },
      ],
      tehtava: {
        kysymys: 'Kuinka monta kappaletta mehter-soittokunnassa oli kutakin '
          + 'soitinta täydessä kokoonpanossa?',
        vaihtoehdot: [
          'Kolme',
          'Yhdeksän',
          'Kolmetoista',
          'Kaksikymmentä',
        ],
        oikea: 1,
        fakta: 'Mehterissä soittimet laskettiin yhdeksän sarjoissa, ja sen jymyä '
          + 'matkivat myöhemmin Haydn, Mozart ja Beethoven.',
      },
    },
  ],
  dublin: [
    {
      id: 'kaupunki',
      nimi: 'Dublin',
      johdanto: 'Kaupunki, jossa yhden kesäkuisen päivän tapahtumia juhlitaan joka '
        + 'vuosi uudestaan ja jonka valtiontunnus seisoo lasikaapissa '
        + 'yliopiston kirjastossa.',
      kansikuvat: [
        {
          tiedosto: 'Long Room Interior, Trinity College Dublin, Ireland - Diliff.jpg',
          selite: 'Trinity Collegen vanhan kirjaston Pitkä huone: kaksi kerrosta '
            + 'tummia kirjahyllyjä, holvattu puukatto ja käytävän molemmin '
            + 'puolin rivi valkoisia marmoribysteja.',
          lahde: 'Diliff, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Samuel Beckett Bridge, Dublin 20150807 1.jpg',
          selite: 'Samuel Beckettin silta Liffey-joen yli. Kaareva pyloni ja '
            + 'siitä lähtevät vaijerit muodostavat kyljelleen kaadetun '
            + 'harpun.',
          lahde: 'DXR, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Dublin - Molly Malone.jpg',
          selite: 'Molly Malonen pronssipatsas Dublinin keskustassa: kalakauppias '
            + 'seisoo kaksipyöräisten kärryjen vieressä, ja kärryillä on '
            + 'kolme punottua koria.',
          lahde: 'Marek Śliwecki, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Romaani, joka kestää yhden päivän',
          tiedosto: 'James Joyce by Alex Ehrenzweig, 1915 cropped.jpg',
          teksti: 'James Joycen romaani Odysseus kertoo yhden ainoan päivän: '
            + 'torstain 16. kesäkuuta 1904 Dublinissa. Joyce valitsi juuri '
            + 'sen päivän, koska silloin hän oli ollut ensi kertaa kävelyllä '
            + 'tulevan vaimonsa Nora Barnaclen kanssa. Nyt joka 16. kesäkuuta '
            + 'dublinilaiset pukeutuvat vuoden 1904 vaatteisiin ja kulkevat '
            + 'kirjan reitit läpi. Ensimmäinen sellainen retki tehtiin 1954 '
            + 'vanhanaikaisilla hevosvaunuilla, ja se jäi kesken. Vuonna 1982 '
            + 'Irlannin radio luki koko kirjan yhteen menoon: siihen meni 30 '
            + 'tuntia.',
          selite: 'James Joyce valokuvattuna Zürichissä vuonna 1915: olkihattu, '
            + 'pyöreät silmälasit, viikset ja rusetti. Odysseus ilmestyi '
            + 'seitsemän vuotta myöhemmin.',
          lahde: 'Alex Ehrenzweig, Wikimedia Commons (public domain)',
          wiki: 'James Joyce',
        },
        {
          otsikko: 'Coddle on tähteiden pata',
          tiedosto: 'Coddle and Irish Soda bread.jpg',
          teksti: 'Coddle on dublinilaisten oma pata: makkarat, pekoni, perunat '
            + 'ja sipuli haudutetaan samassa liemessä tiiviin kannen alla. '
            + 'Mausteina on yleensä vain suola ja pippuri, eikä mitään '
            + 'ruskisteta — siksi ruoka näyttää paljon vaaleammalta kuin '
            + 'maistuu. Coddlea keitettiin, jotta viikon tähteet saatiin '
            + 'syödyksi, eikä sitä juuri tunneta muualla Irlannissa. Myös '
            + 'James Joyce mainitsee sen teksteissään.',
          selite: 'Lautasellinen coddlea dublinilaisessa pubissa, vieressä viipale '
            + 'soodaleipää ja takana tumma olut. Makkarat ja pekoni ovat '
            + 'vaaleanharmaita eikä yhdessäkään ole ruskistettua pintaa.',
          lahde: 'Kari Haley, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Irlantilainen keittiö',
        },
        {
          otsikko: 'Täysi stadion, palkaton joukkue',
          tiedosto: 'Parade, hurling match.jpg',
          teksti: 'Hurlingissa lyödään saarnipuisella mailalla nahkaista '
            + 'sliotar-palloa maalin ylitse tai sisään. Peli on irlantilainen '
            + 'ja hyvin vanha: siitä kerrotaan jo 600-luvun lakiteksteissä. '
            + 'Croke Parkiin Dublinissa mahtuu 82 300 katsojaa, mikä on '
            + 'Euroopan neljänneksi eniten, mutta yksikään pelaaja ei saa '
            + 'ottelusta palkkaa — kaikki ovat amatöörejä ja käyvät arkena '
            + 'töissä.',
          selite: 'Joukkueiden marssi ennen hurlingin All-Ireland-välierää Croke '
            + 'Parkissa 2017. Pelaajat kiertävät kentän soittokunnan perässä '
            + 'ennen aloitusta.',
          lahde: 'Sheila1988, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Hurling',
        },
      ],
    },
    {
      id: 'tiede',
      nimi: 'Tiede',
      johdanto: 'Kaksi asiaa keksittiin Dublinissa kävelymatkan päässä toisistaan: '
        + 'kaava, joka raapustettiin sillan kiveen, ja luento, joka johti '
        + 'dna:n jäljille.',
      nostot: [
        {
          otsikko: 'Kaava, joka raapustettiin sillan kiveen',
          tiedosto: 'Sir William Rowan Hamilton, head-and-shoulders portrait, facing slightly right LCCN90713420 (cropped).jpg',
          teksti: 'Matemaatikko William Rowan Hamilton käveli 16. lokakuuta 1843 '
            + 'vaimonsa kanssa Kuninkaankanavan vartta kohti kokousta, kun '
            + 'hänen päässään ratkesi pulma, jota hän oli miettinyt vuosia. '
            + 'Hän ei malttanut odottaa paperia vaan kaiversi kaavan '
            + 'taskuveitsellään Broom Bridgen kiveen. Kaava kuvaa '
            + 'kvaternioita, ja niillä käännellään nykyään esineitä '
            + 'kolmiulotteisesti: peliruudulla, roboteissa ja satelliiteissa. '
            + 'Joka 16. lokakuuta matka kävellään uudestaan: Dunsinkin '
            + 'observatoriolta, jossa Hamilton asui, samalle sillalle.',
          selite: 'William Rowan Hamilton (1805–1865) vanhassa painokuvassa: '
            + 'kalju päälaki, tuuheat pulisongit ja korkea valkoinen kaulus. '
            + 'Hän asui Dunsinkin observatoriossa Dublinin laidalla.',
          lahde: 'Library of Congress, Wikimedia Commons (public domain)',
          wiki: 'William Rowan Hamilton',
        },
        {
          otsikko: 'Luento, joka johti dna:n jäljille',
          tiedosto: 'Erwin Schrodinger.jpg',
          teksti: 'Irlannin pääministeri Éamon de Valera oli koulutukseltaan '
            + 'matematiikan opettaja. Vuonna 1940 hän perusti Dublinin '
            + 'tutkimusinstituutin ja kutsui sen fysiikan johtajaksi '
            + 'itävaltalaisen Erwin Schrödingerin, joka oli paennut natseja. '
            + 'Helmikuussa 1943 Schrödinger piti Trinity Collegessa kolme '
            + 'yleisöluentoa otsikolla Mitä elämä on? Saliin mahtui 150 '
            + 'kuulijaa mutta tulijoita oli 400, joten luennot pidettiin '
            + 'kahteen kertaan. Watson ja Crick kertoivat molemmat, että '
            + 'luennoista tehty kirja pani heidät dna:n jäljille.',
          selite: 'Erwin Schrödinger (1887–1961) puutarhassa: pyöreät '
            + 'tummasankaiset silmälasit, pilkullinen rusetti ja pystyyn '
            + 'kampaamattomat hiukset. Hän viipyi Dublinissa 16 vuotta.',
          lahde: 'Francis Simon, Wikimedia Commons (Attribution)',
          wiki: 'Erwin Schrödinger',
        },
      ],
      tehtava: {
        kysymys: 'Miksi Schrödingerin luentosarja Mitä elämä on? pidettiin kahteen '
          + 'kertaan?',
        vaihtoehdot: [
          'Sali oli liian pieni tulijoille',
          'Ensimmäinen kerta äänitettiin',
          'Luennot pidettiin kahdella kielellä',
          'Pääministeri halusi kuulla ne uudestaan',
        ],
        oikea: 0,
        fakta: 'Kuulijoita tuli yli kaksi kertaa enemmän kuin saliin mahtui, ja '
          + 'samoista luennoista tehty kirja vei myöhemmin Watsonin ja '
          + 'Crickin dna:n jäljille.',
      },
    },
  ],
  edinburgh: [
    {
      id: 'kaupunki',
      nimi: 'Edinburgh',
      johdanto: 'Kaupunki kasvoi sammuneen tulivuoren päälle, ja joka elokuu sen '
        + 'kadut täyttyvät esiintyjistä, joita kukaan ei ole kutsunut.',
      kansikuvat: [
        {
          tiedosto: 'Diagon Alley (49520096076).jpg',
          selite: 'Victoria Streetin kaartuva puotirivi vanhassakaupungissa. '
            + 'Alakerrat on maalattu vaaleanpunaisiksi, sinisiksi ja '
            + 'oranssiksi, ja ikkunoiden alla roikkuu punaisia '
            + 'kukkalaatikoita.',
          lahde: 'Mike McBey, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'The crown spire on St Giles Cathedral, Edinburgh.JPG',
          selite: 'St Gilesin kirkon torninhuippu Royal Milen varrella. Kahdeksan '
            + 'kivikaarta nousee tornin reunoilta yhteen kruunuksi, ja aivan '
            + 'ylimpänä seisoo kultainen tuuliviirikukko.',
          lahde: 'Stephencdickson, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Edinburgh National Monument 20211020.jpg',
          selite: 'Calton Hillin laella nurmen keskellä seisoo rivi paksuja '
            + 'pylväitä ja niiden päällä pätkä kivikattoa. Muuta ei koskaan '
            + 'valmistunut: kansallismonumentilta loppuivat rahat vuonna '
            + '1829.',
          lahde: 'Daniel Kraft, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Kutsumattomat perustivat festivaalin',
          tiedosto: 'Fringe 2014 HighSt MG 0026-001.jpg',
          teksti: 'Vuonna 1947 Edinburghiin perustettiin kansainvälinen '
            + 'taidefestivaali. Kahdeksan teatteriryhmää jäi kutsulistan '
            + 'ulkopuolelle ja tuli silti — ne esiintyivät reunalla eli '
            + 'fringellä. Siitä kasvoi maailman suurin esittävän taiteen '
            + 'festivaali, eikä ohjelmaa valitse yhä kukaan: kuka tahansa saa '
            + 'esiintyä, jos löytää itselleen esityspaikan. Vuonna 2025 '
            + 'mukana oli 3 893 eri esitystä 301 paikassa, ja niitä '
            + 'näytettiin yhteensä 53 942 kertaa.',
          selite: 'Royal Milen yläpää elokuussa. Kadun yli on pingotettu '
            + 'punavalkoinen fringe-portti, väkeä seisoo kylki kyljessä, ja '
            + 'vasemmalla kilttiin pukeutunut esiintyjä on kiivennyt pollarin '
            + 'päälle mainostamaan omaa esitystään.',
          lahde: 'Brian McNeil, Wikimedia Commons (CC BY 3.0)',
        },
        {
          otsikko: 'Haggis, lanttu ja peruna',
          tiedosto: 'Haggis neeps tatties.JPG',
          teksti: 'Haggis on lampaan sisäelimistä, kaurasuurimoista, sipulista ja '
            + 'mausteista tehty makkara, joka keitetään perinteisesti lampaan '
            + 'mahassa. Se syödään lantun ja perunan kanssa. Runoilija Robert '
            + 'Burns kirjoitti haggisille oman runon vuonna 1786, ja siksi '
            + 'joka 25. tammikuuta istutaan Burns-illalliselle: makkara '
            + 'kannetaan pöytään säkkipillin soidessa, runo luetaan ääneen ja '
            + 'puukko työnnetään makkaraan juuri oikeassa kohdassa runoa.',
          selite: 'Ravintola-annos: pyöreä haggisnokare on kasattu oranssin '
            + 'lanttusoseen päälle, ja aivan alimpana erottuu vaalea '
            + 'perunakerros. Ruskea kastike lainehtii valkoisella '
            + 'lautasella ja päällä on persiljanoksa. Kotona osat ladotaan '
            + 'lautaselle vierekkäin, ei päällekkäin.',
          lahde: 'Metukkalihis, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Haggis',
        },
        {
          otsikko: 'Linna seisoo tulivuoren tulpalla',
          tiedosto: 'Castle Rock Edinburgh.jpg',
          teksti: 'Linnan alla oleva kallio on tulivuoren kurkku, joka jähmettyi '
            + 'noin 350 miljoonaa vuotta sitten poikkeuksellisen kovaksi '
            + 'kiveksi. Kun jäätikkö myöhemmin jyräsi paikan yli, se ei '
            + 'pystynyt kalliolle vaan kaivoi maan sen ympäriltä ja jätti '
            + 'taakseen pitkän loivan hännän. Sitä häntää pitkin laskeutuu '
            + 'Royal Mile linnalta palatsille asti, ja siksi linnaan pääsee '
            + 'kävellen vain idästä. Vettä kalliolta ei sen sijaan tahtonut '
            + 'saada: 34 metriä syvä kaivo ehtyi piiritysten aikana.',
          selite: 'Linna Princes Street Gardensin puolelta nähtynä. Muurit '
            + 'alkavat suoraan jyrkänteen päältä, alempana rinne on ruohoa ja '
            + 'puita, ja etualalla riippuu pihlajanmarjoja.',
          lahde: 'Scglossop1, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Edinburghin linna',
        },
      ],
    },
    {
      id: 'tiede',
      nimi: 'Tiede',
      johdanto: 'Kaksi maailmaa muuttanutta koetta tehtiin täällä: toinen '
        + 'ruokasalin pöydän ääressä, toinen tutkimuslaitoksen '
        + 'laboratoriossa kaupungin eteläpuolella.',
      tehtava: {
        kysymys: 'Miksi kloonilammas sai nimen Dolly?',
        vaihtoehdot: ['Se syntyi Dolly-nimisessä navetassa', 'Nimi arvottiin koululaisten kilpailussa', 'Solu oli otettu utareesta, ja tutkijat muistivat laulaja Dolly Partonin', 'Tutkijan tytär oli nimeltään Dolly'],
        oikea: 2,
        fakta: 'Dollyn tekemiseen käytetty solu oli utaresolu, ja siitä nimi '
          + 'juontuu — se lukee lammasnostossa.',
      },
      nostot: [
        {
          otsikko: 'Kolme emää, yksi karitsa',
          tiedosto: 'Dolly the Sheep National Museum of Scotland.jpg',
          teksti: 'Roslinin tutkimuslaitoksessa Edinburghin eteläpuolella syntyi '
            + '5. heinäkuuta 1996 karitsa, jolla ei ollut isää lainkaan. '
            + 'Dolly tehtiin aikuisen lampaan utaresolusta: solun tuma '
            + 'siirrettiin munasoluun, jonka oma tuma oli poistettu. Emiä oli '
            + 'siis kolme — yksi antoi munasolun, toinen perimän ja kolmas '
            + 'kantoi karitsan. Nimi tuli laulaja Dolly Partonilta. Yrityksiä '
            + 'tarvittiin 277, ja niistä yksi ainoa kasvoi aikuiseksi.',
          selite: 'Dolly täytettynä museon lasikaapissa. Villa on paksu ja '
            + 'kihara, jalat seisovat olkien päällä harmaalla laatalla ja pää '
            + 'on kääntynyt katsojaan päin. Taustalla häämöttää museon sali.',
          lahde: 'Sgerbic, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Dolly (lammas)',
        },
        {
          otsikko: 'Kolme lääkäriä nukahti pöydän alle',
          tiedosto: 'JamesYoungSimpson.png',
          teksti: 'Lääkäri James Young Simpson kokeili ystävineen joka ilta uusia '
            + 'aineita kotonaan Queen Streetillä: he haistelivat pulloja '
            + 'ruokapöydän ääressä ja odottivat, tulisiko jostakin uni. 4. '
            + 'marraskuuta 1847 vuorossa oli kloroformi. Ensin kolmikko tuli '
            + 'hyvälle tuulelle, sitten kaikki kaatuivat, ja he heräsivät '
            + 'vasta seuraavana aamuna lattialta tuolien seasta. Simpson '
            + 'tiesi heti löytäneensä aineen, jonka avulla leikkaus ja '
            + 'synnytys voitiin tehdä nukkuvalle potilaalle.',
          selite: 'James Young Simpson vuoden 1867 aikakauslehden kuvassa. '
            + 'Piirros on tehty pelkillä viivoilla: pitkät hiukset kaartuvat '
            + 'korvien yli, poskiparta on leveä ja kaulassa on vaalea '
            + 'solmuke.',
          lahde: 'The Leisure Hour 1867, Wikimedia Commons (PD)',
          wiki: 'Kloroformi',
        },
      ],
    },
  ],
  marseille: [
    {
      id: 'kaupunki',
      nimi: 'Marseille',
      johdanto: 'Ranskan vanhin kaupunki: kreikkalaiset purjehtivat tänne 2600 '
        + 'vuotta sitten, ja tarinan mukaan kaikki alkoi juhlasta, jossa '
        + 'tyttö ojensi vesimaljan valitsemalleen miehelle.',
      kansikuvat: [
        {
          tiedosto: 'Notre-Dame de la Garde Marseille 2024.jpg',
          selite: 'Notre-Dame de la Garden basilika raidallisine '
            + 'kivikerroksineen. Kellotornin päällä seisoo 11,2 metriä korkea '
            + 'kullattu Neitsyt-patsas, joka näkyy merelle asti.',
          lahde: 'kallerna, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Marché poisson Marseille 013.jpg',
          selite: 'Vanhan sataman kalatiskin sinisessä laatikossa kiemurtelee '
            + 'täplikäs murena. Ympärillä on punaisia rascasse-kaloja eli '
            + 'skorpionisimppuja, jotka ovat bouillabaissen tärkein aines.',
          lahde: 'Arnaud 25, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Calanque de Sugiton, 2016.jpg',
          selite: 'Sugitonin calanque: kapea turkoosi poukama valkoisten '
            + 'kalkkikivijyrkänteiden välissä. Poukama on Marseillen omalla '
            + 'alueella, Calanques\'in kansallispuistossa.',
          lahde: 'Visions of Domino, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Vesimalja perusti kaupungin',
          tiedosto: 'Massalia-21.jpg',
          teksti: 'Noin 600 eKr. joukko kreikkalaisia purjehti Fokaiasta, '
            + 'nykyisen Turkin rannikolta, ja löysi Lacydon-nimisen '
            + 'luonnonsataman — sen saman, jota nykyään sanotaan vanhaksi '
            + 'satamaksi. Antiikin kirjoittajien mukaan paikallisen heimon '
            + 'päällikkö piti samana päivänä juhlat, joissa hänen tyttärensä '
            + 'Gyptis sai valita puolisonsa ojentamalla tälle vesimaljan. Hän '
            + 'ojensi sen kreikkalaiselle Protisille. Kaupunki sai nimen '
            + 'Massalia, ja se on yhä Ranskan vanhin kaupunki.',
          selite: 'Massalian hopearaha 100-luvulta eKr. Toisella puolella on '
            + 'jumalatar Artemiin pää, toisella kävelevä leijona ja '
            + 'kreikkalaisin kirjaimin MASSA, kaupungin oman nimen alku.',
          lahde: 'Classical Numismatic Group, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Massalia (kaupunki)',
        },
        {
          otsikko: 'Monte Criston linnasaari',
          tiedosto: 'Château d\'If @ Baie de Marseille 01.jpg',
          teksti: 'Sataman suulla olevalle kalliosaarelle rakennettiin '
            + '1500-luvulla linnoitus, josta tuli pian vankila. Alexandre '
            + 'Dumas sijoitti sinne romaaninsa Monte Criston kreivi, ja '
            + 'kirjasta tuli niin kuuluisa, että saarelle tehtiin turisteja '
            + 'varten Faria-isän selli, vaikka romaanin pappi on Dumas’n '
            + 'keksintöä eikä koskaan istunut siellä. '
            + 'Oikeat vangit eivät päässeet minnekään: saarelta ei '
            + 'tiettävästi ole koskaan paennut kukaan.',
          selite: 'Château d\'If matalalla kalliosaarellaan. Kaksi pyöreää tornia '
            + 'nousee muurin takaa ja niiden välissä on nelikulmainen '
            + 'päärakennus; kaukana vasemmalla häämöttää kaupungin rantaviiva.',
          lahde: 'Rémih, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Ifin linna',
        },
        {
          otsikko: 'Hymni sai nimensä matkalla',
          tiedosto: 'Pils - Rouget de Lisle chantant la Marseillaise.jpg',
          teksti: 'Rouget de Lisle sävelsi laulun Strasbourgissa yhden yön aikana '
            + '25.–26. huhtikuuta 1792, ja se sai nimekseen Reinin armeijan '
            + 'sotalaulu. Nuotti kulkeutui etelään, ja Marseillen '
            + 'vapaaehtoiset ottivat sen marssilaulukseen. Kun he saapuivat '
            + 'Pariisiin 30. heinäkuuta 1792, he lauloivat sitä koko matkan, '
            + 'ja pariisilaiset alkoivat sanoa sitä marseillelaisten '
            + 'lauluksi. Nimi jäi, vaikka kaupungilla ei ollut sävelmän '
            + 'synnyn kanssa mitään tekemistä.',
          selite: 'Isidore Pilsin maalaus vuodelta 1849: Rouget de Lisle seisoo '
            + 'univormussaan käsi kohotettuna ja laulaa juuri säveltämäänsä '
            + 'sotalaulua Strasbourgin pormestarin salongissa.',
          lahde: 'Isidore Pils, Wikimedia Commons (PD)',
          wiki: 'La Marseillaise',
          musiikki: 'https://music.apple.com/fi/search?term=La%20Marseillaise',
          musiikkiNimi: 'La Marseillaise Apple Musicissa',
        },
      ],
    },
    {
      id: 'ruoka',
      nimi: 'Ruoka',
      johdanto: 'Kaupungin kuuluisin keitto tehtiin kaloista, joita kukaan ei '
        + 'halunnut ostaa, ja sen kuuluisin keksi leivotaan pikkuveneen '
        + 'muotoon.',
      tehtava: {
        kysymys: 'Miksi navette-keksejä ostetaan tusina kerrallaan?',
        vaihtoehdot: ['Yksi jokaista viikonpäivää kohti', 'Yksi jokaista kuukautta kohti', 'Yksi jokaista sataman laituria kohti', 'Yksi jokaista kirkon kelloa kohti'],
        oikea: 1,
        fakta: 'Tusinaan tulee yksi keksi jokaista vuoden kuukautta kohti, ja '
          + 'ennen vanhaan navetteja pidettiin kotona onnenkaluina.',
      },
      nostot: [
        {
          otsikko: 'Bouillabaisse alkoi jätekalasta',
          tiedosto: 'Marseille Filets sur le quai Saint-Jean.jpg',
          teksti: 'Marseillen kuuluisin ruoka oli alun perin kalastajien omaa '
            + 'kotiruokaa: kattilaan meni se osa saaliista, jota kukaan ei '
            + 'ostanut — piikikkäät rascasse-kalat ja muut ruman näköiset. '
            + 'Nykyään bouillabaisse on kallista, ja vuonna 1980 kaupungin '
            + 'ravintoloitsijat allekirjoittivat oman peruskirjansa siitä, '
            + 'mitä aitoon annokseen kuuluu. Se tuodaan pöytään kahdessa '
            + 'osassa: ensin liemi valkosipulileivän kanssa, sitten kalat.',
          selite: 'Kalastajien verkkoja levitettynä Saint-Jeanin laiturille; '
            + 'kaksi miestä istuu paikkaamassa niitä ja kolmas seisoo edessä '
            + 'kovassa knallihatussa. Kuva on 1900-luvun alun postikortista.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Bouillabaisse',
        },
        {
          otsikko: 'Keksi, joka on veneen muotoinen',
          tiedosto: 'Une boîte de navettes (spécialité culinaire) en mars 2022.JPG',
          teksti: 'Rue Saintella on leipomo, joka avattiin vuonna 1781 ja on yhä '
            + 'kaupungin vanhin. Siellä paistetaan navetteja: kovia, '
            + 'appelsiininkukkavedellä maustettuja keksejä, joiden muoto on '
            + 'pikkuvene — juuri sitä sana navette tarkoittaa. '
            + 'Kynttilänpäivänä 2. helmikuuta pappi tulee siunaamaan uunin. '
            + 'Keksejä ostetaan tusina kerrallaan, yksi jokaista vuoden '
            + 'kuukautta kohti, ja ennen niitä säilytettiin kotona '
            + 'onnenkaluina.',
          selite: 'Rasiallinen navetteja: vaaleita, kovaksi paistettuja keksejä, '
            + 'joiden pinnassa kulkee pituussuuntainen halkeama. Yksi keksi '
            + 'on noin kämmenen mittainen.',
          lahde: 'Benoît Prieur, Wikimedia Commons (CC0)',
        },
      ],
    },
  ],
  lissabon: [
    {
      id: 'kaupunki',
      nimi: 'Lissabon',
      johdanto: 'Kaupunki, joka kaatui pyhäinpäivänä 1755 ja rakennettiin uudelleen '
        + 'puuhäkkien varaan — ja jonka kuuluisimman tornin kulmassa nököttää '
        + 'kivinen sarvikuono.',
      kansikuvat: [
        {
          tiedosto: 'Tram 28 Lisbon.jpg',
          selite: 'Keltainen raitiovaunu numero 28 kaartaa Alfaman kulmauksessa. '
            + 'Etukilvessä lukee määränpää Prazeres, ja kiskojen väli on vain '
            + '90 senttiä — kapealla raiteella vaunu mahtuu vanhankaupungin '
            + 'mutkiin.',
          lahde: 'Romazur, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Arco Triunfal da Rua Augusta, Plaza del Comercio, Lisboa, Portugal, 2012-05-12, DD 02.JPG',
          selite: 'Rua Augustan riemukaari Kauppatorin laidalla. Kaaren molemmin '
            + 'puolin jatkuu keltainen holvikäytävä, ja kaaren alta lähtee '
            + 'suora katu: koko alakaupunki vedettiin maanjäristyksen jälkeen '
            + 'ristikoksi.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Torre Belém April 2009-4a.jpg',
          selite: 'Belémin torni Tejo-joen rannassa. Parvekkeiden alla kiertää '
            + 'kiveen veistetty köysi ja vartiotornien huiput ovat kupoleja.',
          lahde: 'Alvesgaspar, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Kaupunki kaatui pyhäinpäivänä 1755',
          tiedosto: 'Convento do Carmo ruins in Lisbon.jpg',
          teksti: 'Lauantaina 1. marraskuuta 1755 oli pyhäinpäivä ja kirkot '
            + 'olivat täynnä väkeä, kun maa alkoi täristä noin kello 9.40. '
            + 'Kaatuneista kynttilöistä syttyi palo, ja noin 40 minuutin '
            + 'kuluttua Tejo-joesta nousi tsunami. Karmeliittikirkon '
            + 'kivikatto romahti eikä sitä rakennettu enää koskaan. Uusi '
            + 'alakaupunki nousi suorien katujen ristikoksi, ja seinien '
            + 'sisään piilotettiin puinen häkki, jonka piti joustaa '
            + 'tärinässä. Kehikkoa kokeiltiin pienoismalleilla: sotilaat '
            + 'marssivat mallin ympärillä, jotta maa tärisisi.',
          selite: 'Karmeliittikirkon runko keskellä Lissabonia. Kivikattoa ei '
            + 'ole, ja jäljellä ovat vain suippokaaret pilarien välissä — '
            + 'niiden välistä näkyy sininen taivas.',
          lahde: 'Chris Adams, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Lissabonin maanjäristys 1755',
        },
        {
          otsikko: 'Tornin kulmassa on sarvikuono',
          tiedosto: 'Belém Tower - gargoyles shaped as rhinoceros heads.jpg',
          teksti: 'Belémin torni valmistui 1519 vartioimaan joensuuta. Sen '
            + 'vartiotornien juurella on kiveen hakattuja eläimenpäitä, ja '
            + 'yksi niistä on sarvikuono — sitä pidetään ensimmäisenä '
            + 'sarvikuonoveistoksena Länsi-Euroopan taiteessa. Malli oli '
            + 'elävä: Intiasta tuotu sarvikuono saapui Lissaboniin 20. '
            + 'toukokuuta 1515. Kuningas Manuel I lähetti sen lahjaksi '
            + 'paaville, mutta laiva haaksirikkoutui Italian rannikolla ja '
            + 'kannelle kahlittu eläin hukkui. Albrecht Dürer teki siitä '
            + 'kuuluisan puupiirroksen näkemättä eläintä koskaan.',
          selite: 'Sarvikuonon pää kiveen veistettynä. Pää työntyy tornin '
            + 'seinästä ulos vartiotornin alapuolelta, ja takana siintää '
            + 'Tejo-joki ja vastaranta.',
          lahde: 'RimerMoshe, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Belémin torni',
        },
        {
          otsikko: 'Azulejot pitävät talon viileänä',
          tiedosto: 'Lisboa, azulejos 3.jpg',
          teksti: 'Lissabonin talot on päällystetty maalatuilla laatoilla. '
            + 'Tavallisen azulejon sivu on neljätoista senttiä, ja laatat '
            + 'ladotaan seinään kuvioksi. Kyse ei ole vain koristeesta: '
            + 'laatta torjuu sadetta ja pitää sisällä viileämpää helteellä. '
            + 'Nimi ei tule espanjan sinistä tarkoittavasta sanasta azul vaan '
            + 'arabian sanasta az-zulayj, kiillotettu pikkukivi.',
          selite: 'Lissabonilaisen talon julkisivu läheltä. Sama kuvio toistuu '
            + 'laatasta toiseen, ja neljä laattaa muodostaa yhdessä yhden '
            + 'suuremman kuvion — siksi ladonnan on osuttava kohdalleen.',
          lahde: 'LBM1948, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Azulejo',
        },
      ],
    },
    {
      id: 'ruoka',
      nimi: 'Ruoka',
      johdanto: 'Kaksi makua, joita ei saa muualta: luostarin leivos, jonka pinnan '
        + 'pitää olla vähän palanut, ja kesäkuun yön sardiini leivän päältä.',
      tehtava: {
        kysymys: 'Minä päivänä Lissabon juhlii omaa pyhimystään Antoniusta?',
        vaihtoehdot: ['1. marraskuuta', '13. kesäkuuta', '24. kesäkuuta', '6. lokakuuta'],
        oikea: 1,
        fakta: 'Antonius kuoli 13. kesäkuuta 1231, ja päivästä tuli Lissabonin '
          + 'oma vapaapäivä — vastaus löytyi sardiininostosta.',
      },
      nostot: [
        {
          otsikko: 'Pastel de nata on luostarin resepti',
          tiedosto: 'Pasteles de nata en Pasteis de Belém.jpg',
          teksti: 'Jerónimosin luostarin munkit paistoivat lehtitaikinakuppeja, '
            + 'joissa on munakermatäyte. Kun luostarit suljettiin 1834, '
            + 'resepti päätyi viereiselle sokerikaupalle, ja Pastéis de Belém '
            + 'on myynyt leivoksia vuodesta 1837. Kahvila kertoo paistavansa '
            + 'niitä yli 20 000 päivässä. Vain siellä ne saa nimittää pastéis '
            + 'de belém — muualla ne ovat pastel de nata.',
          selite: 'Leivoskoju torilla: korillinen pastel de nata -tortuja, joiden '
            + 'pinnassa on tummia läiskiä, ja liitutaulussa lukee hinta. '
            + 'Ympärillä on sokeroituja munkkeja ja muita leivonnaisia.',
          lahde: 'ProtoplasmaKid, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Sardiinit grillataan kadulla kesäkuun yönä',
          tiedosto: 'Sardinhas assadas.jpg',
          teksti: 'Lissabonin oma pyhimys Antonius syntyi kaupungissa 1195 ja '
            + 'kuoli Padovassa 13. kesäkuuta 1231. Siitä päivästä tuli '
            + 'Lissabonin oma vapaapäivä, ja juhla alkaa jo edellisenä '
            + 'iltana: kaupunginosat kilpailevat kulkueilla, jotka marssivat '
            + 'Avenida da Liberdadea alas. Kisa alkoi vuonna 1932. Kujille '
            + 'kannetaan grillit, ja sardiinit paistetaan hiilillä ja syödään '
            + 'leipäviipaleen päältä. Torilta ostetaan basilikaruukku, jonka '
            + 'paperilipussa lukee nelisäkeinen runo.',
          selite: 'Neljä grillattua sardiinia soikealla metallivadilla, vieressä '
            + 'kolme keitettyä perunaa ja kulhollinen salaattia. Kalojen '
            + 'kylkiin on jäänyt grillin ritilän mustat raidat.',
          lahde: 'Duarte Briz, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Antonius Padovalainen',
        },
      ],
    },
  ],
  barcelona: [
    {
      id: 'kaupunki',
      nimi: 'Barcelona',
      johdanto: 'Kaupunki, jossa jokaisesta korttelin kulmasta on leikattu pala '
        + 'pois, ihmiset kiipeävät toistensa harteille torniksi ja talon '
        + 'katolla nukkuu lohikäärme.',
      kansikuvat: [
        {
          tiedosto: 'Barcelona Parc Güell el drac.jpg',
          selite: 'Park Güellin porrasaltaan lisko, jota sanotaan nimellä el '
            + 'drac. Se on koottu rikotuista kaakelinpaloista: selkä sinistä '
            + 'ja ruskeaa, tassut vihreitä, alla portaan valkoinen mosaiikki.',
          lahde: 'Isiwal, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Cavalcada de gegants de la Mercè 2008 - P1210875.jpg',
          selite: 'Gegant eli jättiläisnukke kruunu päässä ja punainen viitta '
            + 'harteilla Mercè-juhlan kulkueessa. Nuken sisällä kävelee yksi '
            + 'ihminen; etualalla lapsi katsoo ylöspäin.',
          lahde: 'Pere prlpz, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Barcelona Mercat de la Boqueria 08.jpg',
          selite: 'Boquerian kauppahallin hedelmätiski: banaanit ja ananakset '
            + 'roikkuvat katosta, hinnat on kirjoitettu liidulla mustille '
            + 'tauluille ja tiskin reunalla on rivi valmiiksi kaadettuja '
            + 'mehuja.',
          lahde: 'Ad Meskens, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Sardanassa askeleet lasketaan',
          tiedosto: 'Sardana Pla de la Seu.jpg',
          teksti: 'Sardana tanssitaan piirissä käsi kädessä, ja askeleet '
            + 'lasketaan tarkasti: jokaisessa sävelmässä on oma määrä lyhyitä '
            + 'ja pitkiä askelia, eikä määrä ole aina sama. Siksi piirissä on '
            + 'yleensä yksi, joka laskee ne muiden puolesta ja antaa merkin. '
            + 'Säestäjänä on cobla, jossa on yksitoista soittajaa mutta '
            + 'kaksitoista soitinta — flabiol-huilun soittaja lyö samalla '
            + 'käsivarteensa sidottua pikkurumpua. Barcelonassa piiri syntyy '
            + 'usein katedraalin edustalle.',
          selite: 'Sardanapiiri Barcelonan katedraalin aukiolla, kuvattuna '
            + 'kirkosta poispäin: taustalla on parvekkeellinen kivitalo. Tanssijat '
            + 'ovat jättäneet laukkunsa ja takkinsa piirin keskelle; se '
            + 'kuuluu tapaan yhtä lailla kuin askeleet.',
          lahde: 'Canaan, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Sardana',
          musiikki: 'https://music.apple.com/fi/search?term=sardana%20cobla',
          musiikkiNimi: 'Sardana-musiikkia Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/TarannCobla-OdaAlFolklore/01RquiemDeCooper.mp3',
          musiikkiNayteNimi: 'Cobla soittaa — Tarannà + Cobla, CC BY-NC',
        },
        {
          otsikko: 'Ihmistornin huipulla on lapsi',
          tiedosto: '4de9f-Colla Jove Xiquets de Tarragona-Concurs2010.jpg',
          teksti: 'Castell on katalaanien ihmistorni. Pohjalla on pinya, satojen '
            + 'ihmisten tiivis kasa, jonka päälle kerrokset nousevat '
            + 'harteilta harteille; korkeimmissa torneissa on kymmenen '
            + 'kerrosta. Huipulle kiipeää lapsi, enxaneta, joka nostaa '
            + 'kätensä ja näyttää neljää sormea — yhtä montaa kuin Katalonian '
            + 'lipussa on raitaa. Torni lasketaan onnistuneeksi vasta, kun se '
            + 'on purettu kaatumatta.',
          selite: 'Castell nimeltä 4 de 9 amb folre Tarragonan kilpailussa: neljä '
            + 'ihmistä rinnakkain rungon joka kerroksessa ja yhdeksän kerrosta; '
            + 'ylimmillä kerroksilla kiipeää enää yksi kerrallaan. Alhaalla näkyy '
            + 'pinya, joka kannattelee tornia ja ottaa sen kiinni, jos se '
            + 'sortuu.',
          lahde: 'Ferran ( fer55 ), Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          otsikko: 'Joka kulmasta leikattiin pala pois',
          tiedosto: 'Eixample aire cropped.jpg',
          teksti: 'Barcelona oli 1850-luvulle asti muurien sisällä. Kun muurit '
            + 'purettiin, insinööri Ildefons Cerdà sai piirtää tyhjälle '
            + 'kentälle uuden kaupungin: ruudukon, jonka korttelit ovat 113 '
            + 'metriä sivultaan. Erikoisinta on se, mitä hän jätti pois. '
            + 'Jokaisesta kulmasta leikattiin 20 metrin viiste, jotta '
            + 'hevosvaunun ei tarvitsisi kääntyä terävästi. Niin jokaisesta '
            + 'risteyksestä tuli kahdeksankulmainen aukio.',
          selite: 'Ilmakuva Eixamplen ruudukosta lentokoneesta. Korttelit ovat '
            + 'samankokoisia, mutta kulmat on viistetty, joten risteykset '
            + 'erottuvat ylhäältä pieninä kahdeksankulmioina.',
          lahde: 'Alhzeiia, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Eixample',
        },
      ],
    },
    {
      id: 'talot',
      nimi: 'Talot',
      johdanto: 'Sata vuotta sitten Barcelonan rikkaat kilpailivat siitä, kenellä '
        + 'on oudoin talo. Jäljelle jäivät lohikäärmeen selkä ja sali, joka '
        + 'valaistaan auringolla.',
      tehtava: {
        kysymys: 'Mitä Palau de la Música Catalanan salissa ei tarvita '
          + 'päiväsaikaan?',
        vaihtoehdot: ['Nuotteja', 'Sähkövaloa', 'Mikrofoneja', 'Kapellimestaria'],
        oikea: 1,
        fakta: 'Lasiseinät ja lasikatto valaisevat salin päivällä kokonaan ilman '
          + 'sähkövaloa — se lukee konserttisalinostossa.',
      },
      nostot: [
        {
          otsikko: 'Talon katolla nukkuu lohikäärme',
          tiedosto: 'Casa Batlló 01.jpg',
          teksti: 'Kutomotehtailija Josep Batlló palkkasi vuonna 1904 Antoni '
            + 'Gaudín muuttamaan tavallisen vuokratalon sellaiseksi, ettei '
            + 'toista samanlaista olisi. Katosta tuli kaareva ja se katettiin '
            + 'kaakeleilla kuin suomuilla: lohikäärmeen selkä. Katon '
            + 'vasemmassa reunassa nousee torni ja sen huipussa risti, jonka '
            + 'on tulkittu olevan pyhän Yrjänän keihäs lohikäärmeen selässä. '
            + 'Parvekkeet muistuttavat naamioita, ja talon lempinimi on '
            + 'luutalo.',
          selite: 'Casa Batllón julkisivun yläosa: suomukatto, tornin kärjessä '
            + 'nelihaarainen risti ja alempana kaksi parveketta, jotka '
            + 'näyttävät silmikoilta, ja niiden välissä kolme '
            + 'vihreäluukkuista ikkunaa. Seinäpinta on rikotusta lasista ja '
            + 'kaakelista.',
          lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Casa Batlló',
        },
        {
          otsikko: 'Konserttisali, jossa ei sytytetä valoja',
          tiedosto: 'Palau de la Música Catalana, interior 1.jpg',
          teksti: 'Barcelonalainen kuoro Orfeó Català rakensi itselleen '
            + 'konserttitalon vuosina 1905–1908. Arkkitehti Lluís Domènech i '
            + 'Montaner teki kahdesta seinästä lähes kokonaan lasia ja '
            + 'katosta valtavan lasi-ikkunan, jonka keskeltä riippuu alaspäin '
            + 'kupu kuin kultainen aurinko. Sali on Euroopan ainoa '
            + 'konserttisali, jossa päiväsaikaan ei tarvita lainkaan '
            + 'sähkövaloa. Lavan takaseinällä on kahdeksantoista '
            + 'mosaiikkineitoa, ja jokainen soittaa eri soitinta.',
          selite: 'Palau de la Música Catalanan sali parvelta katsottuna: '
            + 'kattoikkunan sinikultainen kupu roikkuu alaspäin, takana ovat '
            + 'urut, oikealla korkeat lasiseinät ja alhaalla punaiset '
            + 'penkkirivit.',
          lahde: 'Thomas Ledl, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Palau de la Música Catalana',
          musiikki: 'https://music.apple.com/fi/search?term=orfe%C3%B3%20catal%C3%A0',
          musiikkiNimi: 'Orfeó Català Apple Musicissa',
        },
      ],
    },
  ],
  granada: [
    {
      id: 'kaupunki',
      nimi: 'Granada',
      johdanto: 'Kaupunki lumihuippujen alla: täällä seisoo palatsi, jota voittajat '
        + 'eivät purkaneet, ja baarissa juoman mukana tulee yhä ruokaa ilman '
        + 'eri maksua.',
      kansikuvat: [
        {
          tiedosto: 'Detalle Fuente Patio de los Leones Alhambra Granada.jpg',
          selite: 'Leijonien pihan suihkulähde Alhambrassa: kaksitoista kulunutta '
            + 'marmorileijonaa kannattaa selässään matalaa allasta, ja takana '
            + 'kiertää ohuiden pylväiden kaarikäytävä.',
          lahde: 'Pcb2mail, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Granada - La Alcaicería 1.jpg',
          selite: 'Alcaicerían kuja vanhassa kaupungissa: kipsikoristeisia '
            + 'kaaria, tumma puukatto, katosta riippuva lyhty ja molemmin '
            + 'puolin pieniä myymälöitä huiveineen ja laattoineen.',
          lahde: 'Zarateman, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Sacromonte-Granada (1).jpg',
          selite: 'Sacromonten rinnettä: valkoiseksi kalkittu talo sinisin '
            + 'reunuksin on rakennettu kiinni kallioon, seinään on ripustettu '
            + 'rivi kukkaruukkuja ja alla kiertää kivinen kuja. Seinään on '
            + 'maalattu isoin kirjaimin flamencoluolan ja ravintolan nimi.',
          lahde: 'Alberto-g-rovi, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Palatsi, jota ei purettu',
          tiedosto: 'View of the Alhambra and Sierra Nevada - Granada - Spain.jpg',
          teksti: 'Alhambra oli Granadan emiirikunnan hallintokeskus ja Iberian '
            + 'niemimaan viimeisen muslimivaltion sydän. Kun se luovutettiin '
            + 'vuonna 1492, uudet hallitsijat eivät purkaneet palatsia vaan '
            + 'muuttivat siihen — siksi sen kipsikoristelu ja arabiankieliset '
            + 'kirjoitukset ovat yhä paikoillaan. Sama lause toistuu seinillä '
            + 'uudestaan ja uudestaan: se oli hallitsijasuvun tunnuslause, ja '
            + 'se kuuluu "ei ole voittajaa paitsi Jumala".',
          selite: 'Alhambra kukkulallaan ja takana Sierra Nevada, jonka huipuilla '
            + 'on lunta vielä toukokuussa. Vuoret ovat myös syy palatsin '
            + 'puutarhoihin: sulamisvesi tuotiin kanavaa pitkin suoraan '
            + 'suihkulähteisiin.',
          lahde: 'Adam Jones, Ph.D., Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Alhambra',
        },
        {
          otsikko: 'Avaimet luovutettiin tammikuun toisena',
          tiedosto: 'Granada 1492 Detail.jpg',
          teksti: 'Granadan viimeinen hallitsija, jota espanjalaiset sanoivat '
            + 'Boabdiliksi, luovutti kaupungin avaimet 2. tammikuuta '
            + '1492. Sopimuksessa oli luvattu, että asukkaat saavat pitää '
            + 'uskontonsa ja kielensä — lupaus rikottiin alle kymmenessä '
            + 'vuodessa. Etelään johtavalla tiellä on yhä paikka nimeltä '
            + 'Suspiro del Moro, maurin huokaus: tarinan mukaan Boabdil '
            + 'katsoi siitä taakseen ja itki, ja hänen äitinsä sanoi, ettei '
            + 'kannata itkeä kuin nainen sitä, mitä ei osannut puolustaa kuin '
            + 'mies.',
          selite: 'Francisco Pradillan maalaus vuodelta 1882. Vasemmalla Boabdil '
            + 'mustan hevosen selässä, oikealla punapukuinen Ferdinand ja '
            + 'hänen takanaan Isabella valkoisen hevosen selässä; taustan '
            + 'kukkulalla kohoaa Alhambra.',
          lahde: 'Francisco Pradilla y Ortiz, Wikimedia Commons (Public domain)',
          wiki: 'Reconquista',
        },
        {
          otsikko: 'Aamulla hiihtoa, iltapäivällä merta',
          tiedosto: 'Sierra Nevada Borreguiles 5.jpg',
          teksti: 'Granadan keskustasta on vajaat kolmekymmentä kilometriä '
            + 'Euroopan eteläisimpään hiihtokeskukseen ja noin '
            + 'seitsemänkymmentä Välimeren rannalle, joten saman päivän '
            + 'aikana ehtii sekä rinteeseen että uimaan. Hissit nousevat yli '
            + 'kolmen kilometrin korkeuteen, ja vieressä kohoaa Mulhacén, 3 '
            + '479 metriä, Iberian niemimaan korkein huippu. Lunta ei silti '
            + 'ole taattu: alppihiihdon MM-kisat oli määrä pitää täällä 1995, '
            + 'mutta ne siirrettiin vuodella, koska rinteet olivat paljaat.',
          selite: 'Tuolihissi Borreguilesin rinteillä Sierra Nevadassa. Etualalla '
            + 'riippuu tyhjä tuoli, oikealla nousee tuoli, jossa istuu '
            + 'laskettelijoita, ja taustalla näkyy hissipylväitä ja lumisia '
            + 'kumpuja.',
          lahde: 'kallerna, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Sierra Nevada (Espanja)',
        },
      ],
    },
    {
      id: 'musiikki',
      nimi: 'Musiikki',
      johdanto: 'Säveltäjä muutti sen puutarhan viereen, jonka oli jo ehtinyt '
        + 'säveltää, ja kaupungin oma flamenco tanssitaan yhä mäkeen '
        + 'kaivetussa luolassa.',
      tehtava: {
        kysymys: 'Minkä niminen on Granadan oma flamencomuoto, joka kuului alun '
          + 'perin hääpäivään?',
        vaihtoehdot: ['Fandango', 'Sevillana', 'Zambra', 'Jota'],
        oikea: 2,
        fakta: 'Zambra on Sacromonten luolien oma flamencomuoto, ja sitä '
          + 'tanssittiin häissä — se lukee luolanostossa.',
      },
      nostot: [
        {
          otsikko: 'Säveltäjä, joka muutti Alhambran kylkeen',
          tiedosto: 'Manuel de Falla.jpg',
          teksti: 'Manuel de Falla kirjoitti teoksensa "Öitä Espanjan '
            + 'puutarhoissa" vuosina 1909–1915, kun asui vielä Pariisissa ja '
            + 'Madridissa. Sen ensimmäinen osa on nimeltään "Generalifessa", '
            + 'ja se on puutarha Alhambran kukkulalla. Vasta myöhemmin Falla '
            + 'muutti Granadaan ja asettui pieneen puutarhataloon aivan saman '
            + 'kukkulan rinteeseen; talo on nyt museo ja piano yhä '
            + 'paikallaan. Vuonna 1922 hän järjesti Alhambran pihalla '
            + 'kilpailun, joka pelasti vanhan cante jondo -laulun '
            + 'unohdukselta.',
          selite: 'Manuel de Falla (1876–1946) aikakauslehden pyöreässä kuvassa: '
            + 'knalli päässä, paksut viikset ja turkiskauluksinen '
            + 'päällystakki. Solmio on väritetty jälkikäteen vihreäksi, ja '
            + 'alle on painettu nimi.',
          lahde: 'A. Ciarán, Wikimedia Commons (PD)',
          wiki: 'Manuel de Falla',
          musiikki: 'https://music.apple.com/fi/artist/manuel-de-falla/319270',
          musiikkiNimi: 'Manuel de Falla Apple Musicissa',
        },
        {
          otsikko: 'Flamenco tanssitaan luolassa',
          tiedosto: 'Flamenco granada-1.jpg',
          teksti: 'Sacromonten rinteeseen on kaivettu asuntoja suoraan kallioon, '
            + 'ja niissä syntyi zambra — Granadan oma flamencomuoto, joka '
            + 'kuului alun perin hääpäivään eikä esitykseen. Vanhassa '
            + 'zambrassa on kolme osaa, ja ensimmäinen niistä, alboreá, on '
            + 'morsiamen laulu: perinteen mukaan sitä ei lauleta muualla kuin '
            + 'häissä. Helmikuun 1963 rankkasateet romahduttivat luolia ja '
            + 'ajoivat suuren osan asukkaista pois, mutta osassa luolia '
            + 'tanssitaan yhä.',
          selite: 'Zambra Sacromonten luolassa: kalkittu holvikatto, siihen '
            + 'ripustettuja kuparipannuja, kaksi tanssijaa keskellä kapeaa '
            + 'käytävää ja yleisö istumassa molemmilla seinustoilla.',
          lahde: 'Yair Haklai, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Flamenco',
        },
      ],
    },
  ],
  budapest: [
    {
      id: 'kaupunki',
      nimi: 'Budapest',
      johdanto: 'Buda, Óbuda ja Pest olivat vielä vuonna 1873 kolme eri kaupunkia. '
        + 'Samana vuonna niistä tehtiin yksi ainoa: Budapest.',
      kansikuvat: [
        {
          tiedosto: 'Matthias Church Budapest Roof Tiles.jpg',
          selite: 'Matiaksen kirkon torninhuiput Budan linnavuorella. Katto on '
            + 'ladottu värillisistä lasitetuista kaakeleista, ja '
            + 'vinoruutukuvio on restauroija Frigyes Schulekin oma keksintö '
            + '1800-luvun lopulta — keskiajalla sitä ei ollut.',
          lahde: 'D4m1en, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Budapest Parliament 4604.JPG',
          selite: 'Parlamenttitalo Tonavan Pestin puoleisella rannalla: punainen '
            + 'kupoli keskellä ja siivet sen molemmin puolin toistensa '
            + 'peilikuvina. Talo on 96 metriä korkea, viittaus vuoteen 896, '
            + 'josta Unkarin historia lasketaan alkavaksi.',
          lahde: 'Dirk Beyer, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'The Millennium Monument in Heroes\' Square, Budapest, Hungary.jpg',
          selite: 'Sankarien aukio sinisenä hetkenä. Keskellä kohoaa 36 metriä '
            + 'korkea pylväs, jonka huipulla arkkienkeli Gabriel levittää '
            + 'siipensä, ja kaarevissa pylväiköissä seisoo seitsemän ja '
            + 'seitsemän pronssista unkarilaista.',
          lahde: 'Paul Mannix, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Shakkia lämpimässä altaassa',
          tiedosto: 'Széchényi Spa Chess Champions (6991219530).jpg',
          teksti: 'Budapestin alla on toistasataa lämmintä lähdettä, ja kaupunki '
            + 'on rakentanut niiden päälle kylpylöitä ottomaanien ajoista '
            + 'asti. Széchenyin kylpylä avattiin vuonna 1913, ja sen vesi '
            + 'nousee maasta 74- ja 77-asteisena; altaisiin se jäähdytetään. '
            + 'Ulkoaltaassa on betonisia pöytiä, joiden ääreen pelaajat '
            + 'asettuvat lautoineen: he seisovat vedessä vyötäröä myöten ja '
            + 'siirtävät nappuloita märin sormin. Vakiopelaajat tulevat '
            + 'paikalle myös talvella, kun altaan pinnasta nousee höyryä.',
          selite: 'Shakinpelaajia Széchenyin kylpylän ulkoaltaassa. Kaksi lautaa '
            + 'on aseteltu vedessä olevalle betonipöydälle, ja miehet '
            + 'nojaavat siihen kyynärpäillään — ympärillä muut uivat ja '
            + 'juttelevat kuin mitään erikoista ei tapahtuisi.',
          lahde: 'Christine Zenino, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Széchenyin kylpylä',
        },
        {
          otsikko: 'Keksijältä meni kuukausi omaan pulmaansa',
          tiedosto: 'Rubiks cube by keqs.jpg',
          teksti: 'Ernő Rubik opetti arkkitehtuuria Budapestin taideteollisessa '
            + 'korkeakoulussa ja rakensi vuonna 1974 oppilailleen '
            + 'havaintovälineen: 26 pientä palikkaa, jotka pyörivät '
            + 'piilossa olevan keskiosan ympäri hajoamatta. Kun hän värjäsi '
            + 'sivut ja sekoitti ne, hän '
            + 'tajusi tehneensä pulman — ja tarvitsi kokonaisen kuukauden '
            + 'ratkaistakseen sen itse. Unkarissa lelu myytiin nimellä bűvös '
            + 'kocka, taikakuutio. Asentoja on yli 43 triljoonaa, mutta '
            + 'jokaisesta pääsee maaliin enintään 20 kierrolla.',
          selite: 'Sekoitettu Rubikin kuutio valkoista taustaa vasten. Joka '
            + 'sivulla on yhdeksän ruutua ja värejä kuusi. Keskimmäiset '
            + 'ruudut eivät liiku toistensa suhteen, joten ne kertovat jo '
            + 'etukäteen, minkä värinen kukin sivu lopulta on.',
          lahde: 'Lars Karlsson (Keqs), Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Rubikin kuutio',
          galleria: [
            {
              otsikko: 'Ensimmäinen pakkaus',
              tiedosto: 'Magic cube original pack.jpg',
              selite: 'Kuution unkarilainen alkuperäispakkaus: kulunut sininen '
                + 'pahvilaatikko, jonka kannessa on kantoreikä ja kyljessä '
                + 'lukee Politoys ja Hungarian magic cube.',
              lahde: 'Andreasstolz, Wikimedia Commons (PD)',
            },
          ],
        },
        {
          otsikko: 'Patsas, jolle ei tehty kasvoja',
          tiedosto: 'Vajdahunyad, Anonymus 1.jpeg',
          teksti: 'Unkarin vanhimman kronikan Gesta Hungarorumin kirjoitti noin '
            + 'vuonna 1200 mies, joka kutsui itseään vain kirjaimella P. ja '
            + 'kuninkaan notaariksi. Nimeä ei tiedä kukaan, joten häntä '
            + 'sanotaan Anonymukseksi eli Nimettömäksi. Kun Miklós Ligeti '
            + 'teki hänestä pronssipatsaan vuonna 1903, hän jätti kasvot '
            + 'tahallaan hupun varjoon: salaisuus saa pysyä salaisuutena. '
            + 'Patsaan kynä on kulunut kiiltäväksi, sillä sitä käydään '
            + 'koskettamassa onnen toivossa.',
          selite: 'Anonymus-patsas Városligetin puistossa Vajdahunyadin linnan '
            + 'pihalla. Pronssinen hahmo istuu pitkässä kaavussa huppu '
            + 'päässä, eikä hupun sisältä erotu kasvoja lainkaan. Jalustaan '
            + 'on hakattu latinaksi ANONYMVS ja "kunniakkaimman '
            + 'Béla-kuninkaan notaari".',
          lahde: 'Miklós Ligeti, kuva Aisano, Wikimedia Commons (PD)',
        },
      ],
    },
    {
      id: 'musiikki',
      nimi: 'Musiikki',
      johdanto: 'Budapestissa keksittiin soitin, jota lyödään vasaroilla, ja tapa, '
        + 'jolla kansantanssia ei katsota vaan tanssitaan itse.',
      tehtava: {
        kysymys: 'Miten cimbalomia soitetaan?',
        vaihtoehdot: ['Puhaltamalla piippuun', 'Jousella', 'Lyömällä kieliä kahdella vasaralla', 'Näppäilemällä kieliä sormin'],
        oikea: 2,
        fakta: 'Cimbalomin teräskielet lyödään soimaan kahdella vasaralla, ja '
          + 'jalkapoljin vaimentaa ne — vastaus löytyi cimbalom-nostosta.',
      },
      nostot: [
        {
          otsikko: 'Tanssitalo alkoi yhdestä illasta',
          tiedosto: 'Muzsikás együttes, Hamar Dániel, ifj. Csooóri Sándor, Sipos Mihály. Fortepan 89430.jpg',
          teksti: 'Vuonna 1972 muutama budapestilainen soittaja järjesti illan, '
            + 'jossa kansantanssia ei katsottu lavalta vaan tanssittiin itse, '
            + 'kuten transilvanialaisissa kylissä. Ideasta kasvoi táncház eli '
            + 'tanssitalo -liike: soittajat istuvat nurkassa, opettaja '
            + 'näyttää askeleet ja loput opitaan kädestä pitäen. Sävelmät oli '
            + 'kerätty matkoilla kyliin, joissa vanhat soittajat vielä '
            + 'muistivat ne ulkoa. Unesco nosti liikkeen mallikelpoisten '
            + 'suojelutapojen luetteloon vuonna 2011.',
          selite: 'Tanssitalo Budapestin Belvárosin nuorisotalossa vuonna 1978. '
            + 'Etualalla tanssitaan pareittain, ja takana matalalla lavalla '
            + 'soittaa Muzsikás-yhtye: kontrabasso, viuluja ja alttoviulu.',
          lahde: 'FORTEPAN / Urbán Tamás, Wikimedia Commons (CC BY-SA 3.0)',
          musiikki: 'https://music.apple.com/fi/search?term=muzsikas',
          musiikkiNimi: 'Muzsikás Apple Musicissa',
        },
        {
          otsikko: 'Kymmenen tonnin soitin',
          tiedosto: 'Hungary-0223 - Cimbalom (7338659240).jpg',
          teksti: 'Cimbalom on trapetsin muotoinen puinen laatikko, jonka yli on '
            + 'kiristetty teräskieliä — jokaista säveltä kohti kolme tai '
            + 'neljä samaan vireeseen viritettyä. Yhdessä ne vetävät runkoa '
            + 'kokoon noin kymmenen tonnin voimalla, joten laatikon sisään on '
            + 'jouduttu panemaan kaksi rautapalkkia. Budapestilainen '
            + 'soitinrakentaja Vencel József Schunda antoi soittimelle jalat '
            + 'ja vuonna 1874 polkimen, joka vaimentaa kielet. Uutuutta oli '
            + 'esittelyssä katsomassa myös Ferenc Liszt.',
          selite: 'Cimbalisti lyö kieliä kahdella ohuella vasaralla. Avoimen '
            + 'laatikon poikki kulkee tiheä rivi teräskieliä, ja soittajan '
            + 'takana kaksi viulistia soittaa kirjailluissa liiveissä.',
          lahde: 'Dennis G. Jarvis, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Cimbalom',
          galleria: [
            {
              otsikko: 'Ensiesittely 1874',
              tiedosto: 'Schunda cimbalom presentation.jpg',
              selite: 'Piirros polkimellisen cimbalomin ensiesittelystä vuonna '
                + '1874. Yhdeksän miestä pöydän ympärillä, pöydän kyljessä '
                + 'lukee SCHUNDA, ja vasemmalla istuu tummassa kaavussa '
                + 'Ferenc Liszt.',
              lahde: 'A. Weinwurm, Wikimedia Commons (PD)',
            },
          ],
        },
      ],
    },
  ],
  rooma: [
    {
      id: 'kaupunki',
      nimi: 'Rooma',
      johdanto: 'Kaupunki, jonka areenan alla on kellari hisseineen, jonka aukiolla '
        + 'marmorinen norsu kantaa obeliskia ja jonka kuuluisimpaan '
        + 'lähteeseen vesi tulee yhä antiikin akveduktia pitkin.',
      kansikuvat: [
        {
          tiedosto: 'Colosseo 2020.jpg',
          selite: 'Colosseum tyhjän aukion takaa aamuvalossa. Vasemmalla kohoaa '
            + 'ulkoseinä kolmine kaarikerroksineen; oikealta se on '
            + 'romahtanut, ja jäljellä on matalampi sisäkehä.',
          lahde: 'FeaturedPics, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Basílica de San Pedro, Ciudad del Vaticano, 2022-09-14, DD 19-21 HDR.jpg',
          selite: 'Pietarinkirkon julkisivu valaistuna illalla. Katonreunalla '
            + 'seisoo rivi kivipatsaita ja takaa pilkistää kupolin huippu. '
            + 'Kirkko on Vatikaanissa — maailman pienimmässä valtiossa, joka '
            + 'mahtuu keskelle Roomaa.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Spanish Steps & Trinita dei Monti from Piazza di Spagna Rome.jpg',
          selite: 'Espanjalaiset portaat iltapäivän valossa. Yläpäässä seisoo '
            + 'Trinità dei Montin kirkko kahtine kellotorneineen ja niiden '
            + 'välissä obeliski; portailla istuu ihmisiä ja alhaalla kulkee '
            + 'ohikulkijoita.',
          lahde: 'Peter J StB Green, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Kolikko olan yli',
          tiedosto: 'Trevi Fountain - Roma.jpg',
          teksti: 'Trevin lähteeseen heitetään kolikko oikealla kädellä vasemman '
            + 'olan yli: tarinan mukaan se takaa paluun Roomaan. Kolikoita '
            + 'putoaa veteen noin kolmentuhannen euron edestä joka päivä, ja '
            + 'ne kerätään pohjasta talteen. Rahat lahjoitetaan Caritakselle '
            + 'hyväntekeväisyyteen — ruoka-apuun kaupungin vähävaraisille. '
            + 'Omaa kolikkoa ei saa noukkia takaisin: se on kiellettyä, ja '
            + 'yrittäjiä jää säännöllisesti kiinni.',
          selite: 'Fontana di Trevi kokonaisuudessaan. Lähde ei ole erillinen '
            + 'muistomerkki vaan Palazzo Poli -palatsin päätyseinä: keskellä '
            + 'kaaren alla seisoo meren jumala Oceanus, ja alla vesi valuu '
            + 'kalliolohkareiden välistä altaaseen.',
          lahde: 'NikonZ7II, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Trevin suihkulähde',
          aani: 'https://archive.org/download/aporee_15080_17587/WalkingtoPantheonFountainRome.mp3',
          aaniLahde: '"Walking to Pantheon Fountain, Rome" — Rolf Yngve, radio aporee (public domain)',
        },
        {
          otsikko: 'Leijona nousi lattian alta',
          tiedosto: 'Hypogeum 1 (15005526662).jpg',
          teksti: 'Colosseumin areena oli puulattia, jonka päälle levitettiin '
            + 'hiekkaa — latinan hiekkaa tarkoittavasta sanasta harena tulee '
            + 'sana areena. Lattian alla oli kaksikerroksinen kellari: '
            + 'käytäviä, häkkejä ja kahdeksankymmentä pystykuilua. Vinssi '
            + 'nosti häkin kuilua pitkin lattian tasalle, luukku aukesi, ja '
            + 'eläin ilmestyi keskelle areenaa kuin tyhjästä. Katsomon yllä '
            + 'oli kangaskatto auringolta, ja sitä kelasivat auki '
            + 'sotalaivaston merimiehet.',
          selite: 'Colosseumin areenan lattia on poissa, ja alta paljastuu '
            + 'hypogeum: sokkelo tiiliseiniä ja käytäviä. Keskellä kulkee '
            + 'suora pääkäytävä, ja taustalla nousevat katsomon kaaret.',
          lahde: 'daryl_mitchell from Saskatoon, Saskatchewan, Canada, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Colosseum',
          galleria: [
            {
              otsikko: 'Areena kauempaa',
              tiedosto: 'Colosseum (8473462785).jpg',
              selite: 'Sama kellari ylempää nähtynä. Oikealle on rakennettu '
                + 'takaisin pala lattiaa, jollainen peitti ennen koko '
                + 'areenan; ympärillä kohoavat katsomon kaarikerrokset.',
              lahde: 'Edgar Jiménez from Porto, Portugal, Wikimedia Commons (CC BY-SA 2.0)',
            },
          ],
        },
        {
          otsikko: 'Norsu kantaa obeliskia',
          tiedosto: 'Elephant and Obelisk.jpg',
          teksti: 'Piazza della Minervan aukiolla seisoo marmorinen norsu, jonka '
            + 'selässä nousee punagraniittinen obeliski. Sen suunnitteli Gian '
            + 'Lorenzo Bernini, veisti hänen apulaisensa Ercole Ferrata, ja '
            + 'se paljastettiin vuonna 1667. Obeliski on Rooman '
            + 'kolmestatoista muinaisobeliskista pienin, viisi ja puoli '
            + 'metriä — ja muinaisobeliskeja on Roomassa enemmän kuin missään '
            + 'muussa kaupungissa maailmassa. Roomalaiset antoivat patsaalle '
            + 'lempinimen pulcino, tipu, vaikka sana tarkoitti tuolloin '
            + 'possua: norsu oli heidän mielestään pieni ja pyöreä.',
          selite: 'Norsun pää ja kärsä läheltä. Selkään on veistetty '
            + 'koristeellinen satula, jonka päältä nousee tummasta '
            + 'graniitista tehty obeliski hieroglyfeineen; taustalla on '
            + 'aukion talojen ikkunaluukkuja.',
          lahde: 'Livioandronico2013, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Gian Lorenzo Bernini',
          galleria: [
            {
              otsikko: 'Koko muistomerkki',
              tiedosto: 'Elephant and Obelisk - Bernini.jpg',
              selite: 'Norsu ja obeliski kokonaisuudessaan Santa Maria sopra '
                + 'Minervan kirkon edessä. Jalusta on ihmisen korkuinen, ja '
                + 'obeliskin huipulla on risti.',
              lahde: 'Petar Milošević, Wikimedia Commons (CC BY-SA 4.0)',
            },
          ],
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja vesi',
      johdanto: 'Roomassa vesi ei ole koskaan loppunut kesken: sama vuorilta tuleva '
        + 'virta, joka täytti keisarien kylpylät, tulee yhä ilmaiseksi '
        + 'kadunkulman rautapylväästä.',
      tehtava: {
        kysymys: 'Mikä saa nasone-pylvään veden suihkuamaan ylöspäin?',
        vaihtoehdot: ['Pylvään kyljessä oleva nappi', 'Koukkuputken nostaminen ylös', 'Sormi putken suun päällä', 'Poljin pylvään juuressa'],
        oikea: 2,
        fakta: 'Putken päällä on pieni reikä, ja kun suun tukkii sormella, vesi '
          + 'kaartaa siitä ylöspäin janoisen suuhun.',
      },
      nostot: [
        {
          otsikko: 'Vesi kulkee yhä',
          tiedosto: 'Aqueducts in Rome.jpg',
          teksti: 'Roomaan rakennettiin yksitoista akveduktia, jotka toivat '
            + 'vuorilta vettä lähes sadan kilometrin päästä. Ne toimivat '
            + 'pelkällä painovoimalla: kaltevuus oli paikoin vain '
            + 'kolmekymmentä senttiä kilometriä kohti. Yksi niistä, Aqua '
            + 'Virgo, valmistui vuonna 19 eaa. ja kulkee melkein koko '
            + 'matkansa maan alla — kahdellakymmenellä kilometrillä vesi '
            + 'laskee vain neljä metriä. Se syöttää yhä Trevin lähdettä. Nimi '
            + 'tarkoittaa neitoa: tarun mukaan nuori tyttö näytti janoisille '
            + 'sotilaille lähteen, josta vesi otettiin.',
          selite: 'Akveduktipuiston kaaririvi Rooman laidalla: muurattuja kaaria '
            + 'peräkkäin niityn poikki. Vesi ei virrannut kaarissa vaan '
            + 'niiden päällä kulkevassa kourussa; harjalla kasvaa nyt ruohoa '
            + 'ja pensaita.',
          lahde: 'Livioandronico2013, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Rooman akveduktit',
        },
        {
          otsikko: 'Iso nenä joka kulmassa',
          tiedosto: 'Nasone in Trastevere, Rome.jpg',
          teksti: 'Rooman kaduilla seisoo valurautaisia pylväitä, joiden '
            + 'koukkuputkesta juoksee vettä yötä päivää. Ensimmäiset '
            + 'pystytettiin 1870-luvulla, ja roomalaiset ristivät ne '
            + 'nasoneiksi eli isoiksi neniksi. Niitä on kaupungissa yhä noin '
            + '2 500, ja vesi on samaa kuin kotihanoissa. Putken päällä on '
            + 'pieni reikä: kun putken suun tukkii sormella, vesi suihkuaa '
            + 'reiästä ylöspäin ja janoinen juo kumartumatta. Vanhimpia yhä '
            + 'toimivia seisoo Pantheonin vieressä Piazza della Rotondalla.',
          selite: 'Punaiseksi maalattu nasone kujalla Trasteveressä: '
            + 'valurautainen pylväs, kaareva putki nokkana ja tasainen '
            + 'vesisuihku, joka putoaa putken alle jätettyyn ämpäriin.',
          lahde: 'Sotamies, Wikimedia Commons (CC BY-SA 4.0)',
          galleria: [
            {
              otsikko: 'Vanha nasone Pantheonin vieressä',
              tiedosto: 'Pigna-S Eustachio-Colonna - Nasone alla Rotonda.JPG',
              selite: 'Piazza della Rotondan nasone kesäpäivänä. Lapset '
                + 'kurottavat käsiään vesisuihkuun, ja pylvään juurella on '
                + 'ritilä, josta ylimääräinen vesi valuu viemäriin.',
              lahde: 'Lalupa, Wikimedia Commons (CC BY-SA 3.0)',
            },
          ],
        },
      ],
    },
  ],
  krakova: [
    {
      id: 'kaupunki',
      nimi: 'Krakova',
      johdanto: 'Kaupunki, jossa torvisoitto katkeaa joka tunti kesken sävelen ja '
        + 'lohikäärme puhaltaa joen rannassa oikeaa tulta.',
      kansikuvat: [
        {
          tiedosto: 'Wawel Cathedral Front.jpg',
          selite: 'Wawelin katedraali kukkulan päällä: korkea punatiilinen '
            + 'kellotorni ja sen oikealla puolella Sigismundin kappelin '
            + 'kullattu kupoli. Katedraalissa kruunattiin Puolan kuninkaat.',
          lahde: 'Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: '20200512 Kościół Mariacki w Krakowie 1735 9920.jpg',
          selite: 'Mariankirkon kaksi eri korkuista tornia torin laidalla '
            + 'auringossa, taustalla tumma pilvi. Vasemmalla korkeampi, '
            + 'teräväkärkinen torni, josta hejnał soitetaan; oikealla '
            + 'matalampi kellotorni kupolikattoineen.',
          lahde: 'Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Barbakan in Kraków, 2024 (01).jpg',
          selite: 'Barbakaani: pyöreä tiililinnake, jonka kolmimetrisissä '
            + 'muureissa on 130 ampuma-aukkoa ja seitsemän tornia. '
            + 'Holvikaarisesta portista kuljettiin aikoinaan vallihaudan yli '
            + 'kaupunkiin.',
          lahde: 'Bahnfrend, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Lohikäärme puhaltaa yhä tulta',
          tiedosto: 'Smok Wawelski, Kraków.jpg',
          teksti: 'Wawelin kukkulan juurella on luola ja sen suulla pronssinen '
            + 'lohikäärme, joka puhaltaa oikeaa tulta muutaman minuutin '
            + 'välein. Tarinan mukaan pedon kaatoi suutarinoppipoika, joka '
            + 'jätti luolan eteen rikillä täytetyn lampaan. Lohikäärme ahmi '
            + 'syötin, sai kauhean janon ja joi Veiksel-jokea niin kauan, '
            + 'että halkesi. Kuningas antoi pojalle palkinnoksi tyttärensä.',
          selite: 'Bronisław Chromyn veistämä Smok Wawelski (1972) seisoo '
            + 'kalliolla Wawelin tiilimuurien alla, liekki juuri suusta '
            + 'puhallettuna. Tulen saa nykyään syttymään myös '
            + 'tekstiviestillä.',
          lahde: 'Milena Bielecka-Sujak, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Wawelin linna',
        },
        {
          otsikko: 'Torvisoitto, joka katkeaa kesken',
          tiedosto: 'Hejnalista krakowski.jpg',
          teksti: 'Mariankirkon korkeammasta tornista soitetaan joka tunti '
            + 'torvella hejnał — ja se katkeaa aina kesken sävelen. '
            + 'Perimätiedon mukaan nuoli osui torvensoittajaan juuri kun tämä '
            + 'varoitti kaupunkia hyökkäyksestä. Katkos toistetaan '
            + 'uskollisesti tunnin välein neljään ilmansuuntaan, ja '
            + 'keskipäivän soitto kuullaan radiossa koko Puolassa. Tornissa '
            + 'päivystetään ympäri vuorokauden, joten soitto ei jää väliin '
            + 'yhtenäkään yönä.',
          selite: 'Torvensoittaja puhaltaa hejnałia Mariankirkon korkean tornin '
            + 'kaari-ikkunasta. Tornin seinässä vuorottelevat punatiili ja '
            + 'vaalea kalkkikivi, ja alhaalla näkyy kirkon peltikatto.',
          lahde: 'Jadwiga, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Mariankirkko (Krakova)',
          musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/a/ac/Cracow_trumpet_signal.ogg/Cracow_trumpet_signal.ogg.mp3',
          musiikkiNayteNimi: 'Krakovan hejnał Mariankirkon tornista (PD)',
        },
        {
          otsikko: 'Kauppahalli keskellä toria',
          tiedosto: 'Kraków Cloth Hall, 3 Main Market square, Old Town, Krakow, Poland.jpg',
          teksti: 'Sukiennice eli kangashalli on seissyt torin keskellä '
            + 'keskiajalta asti, ja sen holvikäytävässä myydään yhä tavaraa. '
            + 'Krakova oli Hansan ja idän karavaanireittien risteyskohta: '
            + 'halliin tuotiin mausteita, silkkiä ja nahkaa, ja täältä lähti '
            + 'kangasta, lyijyä ja suolaa. Yläkerta on nykyään taidemuseo, '
            + 'jossa on Puolan 1800-luvun maalauksia.',
          selite: 'Sukiennice Rynek Głównyn keskellä: alakerrassa holvikäytävä '
            + 'myyntikojuineen, ylhäällä koristeellinen renessanssiattika. '
            + 'Vasemmalla takana kohoaa vanhan raatihuoneen kellotorni.',
          lahde: 'Igor123121, Wikimedia Commons (CC BY 4.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Rinkeli, joka keitetään ennen paistamista, ja joulukuinen '
        + 'kilpailu, jossa koko kaupunki rakennetaan uudelleen pahvista ja '
        + 'foliosta.',
      tehtava: {
        kysymys: 'Ketkä alkoivat rakentaa szopka-seimiä 1800-luvulla?',
        vaihtoehdot: ['Munkit ja kirkonvartijat', 'Kauppiaat ja kojumyyjät', 'Muurarit ja kirvesmiehet', 'Sotilaat ja tallirengit'],
        oikea: 2,
        fakta: 'Seimien rakentamisen aloittivat muurarit ja kirvesmiehet, joille '
          + 'ei riittänyt talvella töitä.',
      },
      nostot: [
        {
          otsikko: 'Rinkeli, joka keitetään ennen paistamista',
          tiedosto: 'Obwarzanki salesman in Krakow.jpg',
          teksti: 'Obwarzanek on punottu rinkeli, jonka taikina keitetään ennen '
            + 'uuniin panoa — nimi tulee verbistä obwarzać, keittää. Päälle '
            + 'siroitellaan suolaa, seesamia tai unikonsiemeniä. Vanhin '
            + 'maininta on kuningatar Jadwigan hovin tilikirjassa 2. '
            + 'maaliskuuta 1394: kuningattarelle ostettiin '
            + 'obwarzanek-renkaita yhdellä grossilla. Kaduilla on nykyään '
            + '170–180 sinistä kärryä, ja rinkeleitä myydään lähes 150 000 '
            + 'päivässä.',
          selite: 'Sininen rinkelikärry kadulla: myyjä valkoisessa takissa kärryn '
            + 'takana, edessä pinoittain punottuja obwarzanek-rinkeleitä '
            + 'siemenillä siroteltuina. Keltaisessa kyltissä lukee OBWARZANKI '
            + 'KRAKOWSKIE.',
          lahde: 'Stefan Källroos, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Pahvikaupunki kilpailee joka joulukuu',
          tiedosto: 'Szopka krakowska Gillert Tadeusz 2019.jpg',
          teksti: 'Szopka on krakovalainen jouluseimi, joka rakennetaan pahvista '
            + 'ja värillisestä foliosta oikeiden rakennusten mukaan: '
            + 'Mariankirkon tornit, Sukiennice, Wawel. Tavan aloittivat '
            + '1800-luvulla muurarit ja kirvesmiehet, joilla ei ollut '
            + 'talvella töitä. Vuodesta 1937 seimet on kannettu joulukuun '
            + 'ensimmäisenä torstaina Adam Mickiewiczin patsaalle '
            + 'keskustorille kilpailuun. Unesco otti tavan '
            + 'kulttuuriperintöluetteloonsa 2018.',
          selite: 'Kilpailupäivän szopkia kivisillä portailla vuonna 2019: '
            + 'etualalla monitorninen seimi, jossa on kimaltavia kupoleita, '
            + 'parvekkeita ja pieniä hahmoja, ja takana odottaa lisää seimiä.',
          lahde: 'JagaKRA, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
  ],
  varsova: [
    {
      id: 'kaupunki',
      nimi: 'Varsova',
      johdanto: 'Kaupunki, joka ammuttiin sodassa raunioiksi ja koottiin takaisin — '
        + 'linnan kello käynnistettiin uudelleen juuri siitä minuutista, '
        + 'mihin se oli pysähtynyt.',
      kansikuvat: [
        {
          tiedosto: 'Warszawa Pałac Kultury i Nauki 2009.jpg',
          selite: 'Kulttuuri- ja tiedepalatsi, 237 metriä korkea Neuvostoliiton '
            + 'lahja vuodelta 1955. Huipun alla näkyvät kellotaulut ovat '
            + 'halkaisijaltaan kuusimetrisiä, ja ne paljastettiin '
            + 'uudenvuodenyönä 2000.',
          lahde: 'Marcin Białek, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Syrenka Warszawska.jpg',
          selite: 'Merenneito Syrenka nostaa miekkaa Vanhankaupungin torilla, '
            + 'toisessa kädessä kilpi ja takana torin värilliset talot. '
            + 'Syrenka on Varsovan vaakunahahmo. Ensimmäinen patsas valettiin '
            + '1855, ja se selvisi sodasta: korjauksessa siitä paikattiin yli '
            + '50 luodinreikää.',
          lahde: 'Grzegorz Polak, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: 'Pomnik Fryderyka Chopina w Łazienkach, Warszawa.jpg',
          selite: 'Chopin-patsas Łazienki-puistossa: säveltäjä istuu pronssisen '
            + 'pajun alla, jonka oksat taipuvat tuulessa. Saksalaiset '
            + 'räjäyttivät patsaan 31. toukokuuta 1940 ja veivät romuksi; '
            + 'uusi valos paljastettiin 1958.',
          lahde: 'A.Osytek, Wikimedia Commons (CC BY-SA 3.0 pl)',
        },
      ],
      nostot: [
        {
          otsikko: 'Sydän palasi ilman omistajaansa',
          tiedosto: 'Frédéric Chopin - Eugène Delacroix - Musée du Louvre Peintures RF 1717.jpg',
          teksti: 'Fryderyk Chopin kasvoi Varsovassa ja lähti kaupungista '
            + '20-vuotiaana marraskuussa 1830. Hän ei nähnyt sitä enää '
            + 'koskaan. Kun hän kuoli Pariisissa 1849, hänen sisarensa '
            + 'Ludwika toi sydämen Varsovaan, ja vuonna 1882 se muurattiin '
            + 'Pyhän Ristin kirkon pilarin sisään. Siellä se on yhä. Chopinin '
            + 'nimeä kantava pianokilpailu järjestettiin ensimmäisen kerran '
            + '1927, ja vuodesta 1955 se on pidetty kaupungissa viiden vuoden '
            + 'välein.',
          selite: 'Eugène Delacroix’n muotokuva Chopinista vuodelta 1838. Maalaus '
            + 'oli alun perin kaksoismuotokuva, jossa oli myös kirjailija '
            + 'George Sand; kangas leikattiin myöhemmin kahtia.',
          lahde: 'Eugène Delacroix, Wikimedia Commons (PD)',
          wiki: 'Fryderyk Chopin',
          musiikki: 'https://music.apple.com/fi/search?term=chopin',
          musiikkiNimi: 'Fryderyk Chopin Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/ChopinAsDurPolonaise1/Chopin%20As%20Dur%20Polonaise%201.mp3',
          musiikkiNayteNimi: 'Chopin: Polonaise As-duuri — Ignaz Friedman, PD',
        },
        {
          otsikko: 'Maitobaari on yhä auki',
          tiedosto: 'Bar Mleczny Prasowy w Warszawie.png',
          teksti: 'Ensimmäisen maitobaarin avasi karjatilallinen Stanisław '
            + 'Dłużewski vuonna 1896 Nowy Świat -kadulle: halpaa ruokaa '
            + 'maidosta, munista ja jauhoista, ei lihaa eikä alkoholia. Idea '
            + 'levisi koko maahan, ja pelkästään Varsovassa baareja oli '
            + 'vuonna 1972 neljäkymmentäyksi. Osa on yhä auki, ja kaupunki '
            + 'auttaa niitä esimerkiksi halvalla vuokralla — siksi '
            + 'lautasellinen pierogeja maksaa usein kolmasosan ravintolan '
            + 'hinnasta. Ruoka haetaan itse tiskiltä.',
          selite: 'Mustavalkoinen katukuva Varsovan keskustasta. Ikkunoissa lukee '
            + 'isoin kirjaimin BAR MLECZNY, maitobaari, ja lasiin on '
            + 'kiinnitetty ruokalistoja; ohi kävelee kaksi naista kassit '
            + 'kädessä.',
          lahde: 'Artur Kuczmarski, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Kello käynnistettiin siitä minuutista, mihin se pysähtyi',
          tiedosto: 'Wieża Zygmuntowska Zamek Królewski w Warszawie 2020.jpg',
          teksti: 'Kuninkaanlinnan kellotornin viisarit pysähtyivät 17. syyskuuta '
            + '1939 kello 11.15, kun pommitus sytytti tornin. Loppu linnasta '
            + 'räjäytettiin 1944. Kun linnaa alettiin rakentaa takaisin, '
            + 'varsovalaisten kulta- ja kelloseppien ammattikunta teki uuden '
            + 'koneiston talkootyönä: 1 700 osaa. Neljä kellotaulua '
            + 'nostettiin paikoilleen kesäkuussa 1974, ja 19. heinäkuuta '
            + 'kello käynnistettiin — ajasta 11.15. Vuodesta 2008 tornista '
            + 'soitetaan joka päivä samalla minuutilla torvisoitto.',
          selite: 'Kuninkaanlinnan kellotorni läheltä: vaaleanpunaiset seinät, '
            + 'punainen tiilikatto ja vihreä kuparikupoli. Kultainen '
            + 'kellotaulu erottuu tummaa myrskypilveä vasten.',
          lahde: 'Adrian Grycuk, Wikimedia Commons (CC BY-SA 3.0 pl)',
          wiki: 'Varsovan linna',
        },
      ],
    },
    {
      id: 'tiede',
      nimi: 'Tiede ja keksinnöt',
      johdanto: 'Varsovassa käytiin yliopistoa salaa vaihtuvissa asunnoissa, ja '
        + 'täällä julkaistiin kieli, jonka keksijä antoi sen ilmaiseksi '
        + 'kaikille.',
      tehtava: {
        kysymys: 'Miksi Varsovan salaista yliopistoa sanottiin lentäväksi?',
        vaihtoehdot: ['Sen opettajat kiersivät ulkomailla', 'Luennot pidettiin joka kerta eri asunnossa', 'Se toimi vain kesäisin', 'Se sijaitsi tornin ylimmässä kerroksessa'],
        oikea: 1,
        fakta: 'Lentävällä yliopistolla ei ollut omaa taloa: luennot pidettiin '
          + 'iltaisin vaihtuvissa asunnoissa, jottei poliisi löytäisi niitä.',
      },
      nostot: [
        {
          otsikko: 'Salainen yliopisto vaihtoi asuntoa',
          tiedosto: 'Marie Sklodowska, étudiante, en 1895.jpg',
          teksti: 'Venäjän vallan aikana Varsovan yliopistoon ei otettu naisia, '
            + 'joten kaupungissa toimi salainen oppilaitos: lentävä '
            + 'yliopisto. Luennot pidettiin iltaisin joka kerta eri '
            + 'asunnossa, jottei poliisi löytäisi niitä. Siellä opiskeli myös '
            + 'Varsovassa 1867 syntynyt Maria Skłodowska. Sisarukset tekivät '
            + 'sopimuksen: Maria meni kotiopettajaksi ja lähetti palkkansa '
            + 'Pariisiin Bronialle, joka maksoi vuorollaan Marian matkan. '
            + 'Vuonna 1898 Maria nimesi löytämänsä alkuaineen poloniumiksi '
            + 'maan mukaan, jota ei silloin ollut kartalla.',
          selite: 'Maria Skłodowska opiskelijavuosinaan 1890-luvulla: tumma puku, '
            + 'kädet selkään piilotettuina ja katse suoraan kameraan.',
          lahde: 'Tuntematon tekijä, Wikimedia Commons (PD)',
          wiki: 'Marie Curie',
        },
        {
          otsikko: 'Kieli, jonka keksijä antoi pois',
          tiedosto: 'Ludwik Zamenhof Pirou.jpg',
          teksti: 'Ludwik Zamenhof kävi koulunsa Varsovassa, opiskeli siellä '
            + 'lääkäriksi ja työskenteli silmälääkärinä. Hän uskoi, että '
            + 'ihmiset riitelevät, koska heiltä puuttuu yhteinen ja '
            + 'tasapuolinen kieli. Heinäkuussa 1887 Varsovassa ilmestyi ohut '
            + 'kirja: kielioppi 16 säännössä ja pieni sanaluettelo. Tekijän '
            + 'nimeä ei ollut, vain salanimi Doktoro Esperanto, toivova '
            + 'tohtori. Kirjassa Zamenhof luopui kaikista oikeuksistaan '
            + 'kieleen: kuka tahansa sai käyttää sitä. Salanimestä tuli '
            + 'kielen nimi.',
          selite: 'Ludwik Zamenhof istuu nojatuolissa: pyöreät silmälasit, suippo '
            + 'parta ja tumma puku. Valokuvan otti Eugène Pirou.',
          lahde: 'Eugène Pirou, Wikimedia Commons (PD)',
          wiki: 'Esperanto',
        },
      ],
    },
  ],
  helsinki: [
    {
      id: 'kaupunki',
      nimi: 'Helsinki',
      johdanto: 'Huvipuisto, jonka junaa jarrutetaan käsin, syksyinen '
        + 'kalamarkkina vuodelta 1743 — ja aseman ovella neljä kivimiestä, '
        + 'jotka ovat kaikki sama mies.',
      kansikuvat: [
        {
          tiedosto: 'Lutheran Cathedral Helsinki.jpg',
          selite: 'Helsingin tuomiokirkko Senaatintorin portaiden yläpäässä. '
            + 'Katolla seisoo kaksitoista sinkistä apostolipatsasta — '
            + 'maailman suurin yhtenäinen sinkkiveistoskokoelma.',
          lahde: 'Hans Hillewaert, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'HKL HST Nr II 71, Aleksanterinkatu, 2019 (01).jpg',
          selite: 'Vihreä raitiovaunu Aleksanterinkadulla, takana odottaa jo '
            + 'seuraava. Raitiovaunut ovat kulkeneet Helsingin kaduilla '
            + 'vuodesta 1891.',
          lahde: 'Bahnfrend, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Passengers of Suomenlinna ferry on an early winter morning; Helsinki, Finland, 2024 January.jpg',
          selite: 'Suomenlinnan lautan matkustajat kävelevät Kauppatorin '
            + 'lumiselle rannalle talviaamuna. Oikealla on lautta '
            + 'laiturissa, takana Uspenskin katedraalin vihreät kupolit.',
          lahde: 'Pekka Vyhtinen, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Vuoristoradan takana seisoo jarrumestari',
          tiedosto: 'Linnanmäki Vuoristorata.jpg',
          teksti: 'Linnanmäen huvipuisto avattiin 1950 vanhalle vesitornimäelle, '
            + 'ja puinen Vuoristorata seuraavana kesänä 13. heinäkuuta 1951. '
            + 'Se on yksi maailman harvoista radoista, joilla junan vauhtia '
            + 'hidastetaan käsin: jarrumestari seisoo junan takaosassa koko '
            + 'matkan ja hoitaa jarrutuksen. Kesässä rataa kierretään noin '
            + '47 000 kertaa. Huvipuiston omistaa Lasten Päivän Säätiö, ja '
            + 'tuotto jaetaan kuudelle lastensuojelujärjestölle.',
          selite: 'Vuoristoradan sininen juna kiipeää ylös täydessä lastissa. '
            + 'Kiskojen alusta, pylväät ja kaiteet ovat puuta, kuten radan '
            + 'valmistuessa 1951.',
          lahde: 'Oona Räisänen, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Vuoristorata (Linnanmäki)',
        },
        {
          otsikko: 'Silakkamarkkinat vuodesta 1743',
          tiedosto: 'Kauppatori, syys- eli silakkamarkkinat - G30676 - hkm.HKMS000005-km0000pheu.jpg',
          teksti: 'Vuonna 1743 Helsinki sai kuninkaalliselta päätökseltä oikeuden '
            + 'kahtiin vuosimarkkinoihin, ja niitä on pidetty joka vuosi '
            + 'siitä lähtien. Vuonna 1891 markkinoista lakkautettiin kaikki '
            + 'muu paitsi suolatun kalan kauppa — niin jäljelle jäivät '
            + 'silakkamarkkinat. Joka lokakuu Eteläsataman rantaan purjehtii '
            + 'kalastajia myymään suolattua ja maustettua silakkaa suoraan '
            + 'veneen kannelta, ja raati valitsee vuoden parhaan maustekalan.',
          selite: 'Syys- eli silakkamarkkinat Kauppatorilla 1890-luvulla. Silakan '
            + 'lisäksi kojuissa myytiin villasukkia ja kangaspakkoja — '
            + 'markkinat olivat saariston ja kaupungin vuosittainen '
            + 'kohtaaminen.',
          lahde: 'Unknown author, Wikimedia Commons (CC BY 4.0)',
          wiki: 'Silakkamarkkinat',
        },
        {
          otsikko: 'Aseman kivimiehet ovat neljä kertaa sama mies',
          tiedosto: 'Statues at Helsinki Central Train Station.jpg',
          teksti: 'Päärautatieaseman pääovea vartioi neljä graniittimiestä '
            + 'pallolamppu käsissään. Emil Wikström veisti ne vuonna 1914 '
            + 'Eliel Saarisen piirtämään asemaan, ja kaikki neljä tehtiin '
            + 'saman kipsimallin mukaan: sama mies neljästi. Mallina oli '
            + 'kerrotusti torppari Jalmari Lehtinen. VR:n mainoskampanja teki '
            + 'hahmoista 2000-luvulla Kivimiehet, ja niille on puettu '
            + 'jääkiekkomaajoukkueen pelipaidat, kasvomaskit ja Käärijän '
            + 'vihreä bolero.',
          selite: 'Kaksi aseman neljästä kivimiehestä alaviistosta kuvattuna. '
            + 'Punertavat graniittihahmot pitelevät valkoisia pallolamppuja, '
            + 'ja vartalon alaosa jatkuu uurteisena pilarina seinään asti.',
          lahde: 'Ethan Doyle White, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Lyhdynkantajat',
        },
      ],
    },
    {
      id: 'historia',
      nimi: 'Historia',
      johdanto: 'Kaupungin edustalla on 1700-luvun merilinnoitus, ja keskustassa on '
        + 'niin venäläinen ilme, että Neuvostoliittoa on tultu kuvaamaan '
        + 'tänne.',
      tehtava: {
        kysymys: 'Kuinka monta lyhyttä välähdystä Suomenlinnan kirkontornin '
          + 'majakka antaa kerrallaan?',
        vaihtoehdot: ['Kaksi', 'Kolme', 'Neljä', 'Viisi'],
        oikea: 2,
        fakta: 'Neljä lyhyttä on morseaakkosten H — sama kirjain kuin '
          + 'Helsingin alussa.',
      },
      nostot: [
        {
          otsikko: 'Linnoituksen majakka vilkuttaa H-kirjainta',
          tiedosto: 'Cannons on Kustaanmiekka Suomenlinna 2022-09-17 02.jpg',
          teksti: 'Ruotsi alkoi vuonna 1748 rakentaa Helsingin edustan saarille '
            + 'merilinnoitusta Augustin Ehrensvärdin johdolla. Se levittäytyi '
            + 'kuudelle saarelle ja tunnettiin vuoteen 1918 asti nimellä '
            + 'Viapori. Nykyään Suomenlinna on Unescon maailmanperintökohde '
            + 'vuodesta 1991 ja samalla tavallinen kaupunginosa: lautta '
            + 'Kauppatorilta kuuluu joukkoliikenteeseen ja kulkee ympäri '
            + 'vuoden. Kirkontornin majakka välähtää neljä lyhyttä kertaa — '
            + 'se on morseaakkosten H niin kuin Helsinki.',
          selite: 'Vanha rannikkotykki Suomenlinnan Kustaanmiekassa. Pitkä musta '
            + 'piippu lepää ruostuneella rautalavetilla, ja takana näkyy '
            + 'linnoituksen matalaa kivistä maastoa.',
          lahde: 'Leonhard Lenz, Wikimedia Commons (CC0)',
          wiki: 'Suomenlinna',
        },
        {
          otsikko: 'Helsinki näytteli Neuvostoliittoa',
          tiedosto: 'Uspenski Cathedral, Helsinki (by Pudelek).jpg',
          teksti: 'Kylmän sodan aikana länsimaisia kuvausryhmiä ei päästetty '
            + 'kuvaamaan Moskovaan, joten Neuvostoliitto piti kuvata muualla. '
            + 'Helsinki kelpasi sijaiseksi: keskusta on Carl Ludvig Engelin '
            + 'piirtämää empireä ja Katajanokalla kohoaa ortodoksinen '
            + 'katedraali. Rikoselokuva Gorky Park (1983) kuvattiin pääosin '
            + 'Helsingissä, ja Kaisaniemen puisto sai esittää Moskovan '
            + 'nimikkopuistoa. Reds-elokuvan ryhmä taas odotti Helsingissä '
            + 'lunta.',
          selite: 'Uspenskin katedraali Katajanokan kalliolla: punatiiliset '
            + 'seinät ja kullatut sipulikupolit. Tiilet tuotiin '
            + 'Ahvenanmaalta, puretusta Bomarsundin linnoituksesta.',
          lahde: 'Pudelek (Marcin Szala), Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Uspenskin katedraali',
        },
      ],
    },
  ],
  tallinna: [
    {
      id: 'kaupunki',
      nimi: 'Tallinna',
      johdanto: 'Kaupunki, jonka apteekissa myytiin poltettuja siilejä ja jonka '
        + 'tornin huipulla sama sotilas on kääntynyt tuulen mukana vuodesta '
        + '1530.',
      kansikuvat: [
        {
          tiedosto: 'Ayuntamiento, Tallin, Estonia, 2012-08-05, DD 09.JPG',
          selite: 'Raatihuoneen torni kapean kadun päässä. Vaalea kivitorni '
            + 'nousee 64 metriin, ja huipulla on tumma renessanssiajan kärki. '
            + 'Alhaalla seisoo hevoskärry raidallisen katoksen alla.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Viru Gate in Tallinn (45758703212).jpg',
          selite: 'Virun portin kaksi pyöreää tornia valaistuina sinisenä '
            + 'hetkenä. Portti johtaa vanhaankaupunkiin idästä, märkä '
            + 'katukivetys heijastaa valot, ja kadun päässä siintää tornin '
            + 'huippu.',
          lahde: 'Radek Kucharski, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Alexander Nevsky Cathedral, Tallinn.jpg',
          selite: 'Aleksanteri Nevskin katedraali Toompean laella. Mustat '
            + 'sipulikupolit ja kultaiset ristit valmistuivat vuonna 1900, '
            + 'kun Viro kuului Venäjän keisarikuntaan.',
          lahde: 'kallerna, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Laulukaari täyttyy viiden vuoden välein',
          tiedosto: 'Üldlaulupidu 2014 - 26.JPG',
          teksti: 'Viron laulujuhlia on pidetty vuodesta 1869, ja Tallinnan '
            + 'laulukentälle kokoonnutaan viiden vuoden välein. Laulukaaren '
            + 'lavalle mahtuu noin 15 000 laulajaa ja kentälle jopa 100 000 '
            + 'kuulijaa. Syyskuussa 1988 samalle kentälle kokoontui arviolta '
            + '300 000 ihmistä laulamaan lauluja, joita ei silloin saanut '
            + 'laulaa julkisesti. Siitä tuli nimi laulava vallankumous.',
          selite: 'XXVI laulujuhlat kesällä 2014. Yhteiskuoro seisoo laulukaaren '
            + 'alla ja yleisö kentällä. Kaari valmistui 1960, ja sen kaareva '
            + 'katto heijastaa äänen alas väkijoukkoon.',
          lahde: 'Ivo Kruusamägi, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Tallinnan laulujuhlat',
          musiikki: 'https://music.apple.com/fi/search?term=estonian%20choir',
          musiikkiNimi: 'Virolaista kuorolaulua Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/aporee_19813_23018/20130704Estland07Tartu07MannerchorimParkgegenuberLossi3Donnerstag1707Uhr.mp3',
          musiikkiNayteNimi: 'Virolainen mieskuoro Tartossa — Fritz Schlüter, CC BY',
        },
        {
          otsikko: 'Poltettuja siilejä ja marsipaania lääkkeeksi',
          tiedosto: 'Raeapteegi sümbol 12092022.jpg',
          teksti: 'Raatihuoneentorin laidalla toimii apteekki, joka on ollut '
            + 'samassa talossa ainakin vuodesta 1422 — silloin kirjattiin '
            + 'ylös jo sen kolmas omistaja. Vuoden 1695 hinnastossa oli 128 '
            + 'erilaista öljyä, 71 yrttiteetä ja 49 voidetta, mutta myös '
            + 'poltettuja mehiläisiä, poltettuja siilejä, oriin kavioita ja '
            + 'kastematojen öljyä. Listalla oli marsipaani, jota myytiin '
            + 'sydänsuruun ja muistin parantamiseen. Sitä saa tiskiltä yhä.',
          selite: 'Apteekin kyltti talon seinässä: takorautainen käärme kiertyy '
            + 'maljan ympäri, sivuille lähtee nuoli, ja alle on taottu sana '
            + 'Apteek ja vuosiluku 1422.',
          lahde: 'Gregso01, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Raeapteek',
          galleria: [
            {
              otsikko: 'Apteekin museohuone',
              tiedosto: 'Raeapteek interior.jpg',
              selite: 'Apteekin vanha sali: mustavalkoinen ruutulattia, tummat '
                + 'lasivitriinit täynnä pulloja ja purkkeja, katossa paljaat '
                + 'puupalkit ja kynttiläkruunut.',
              lahde: 'HartOve, Wikimedia Commons (CC BY 4.0)',
            },
          ],
        },
        {
          otsikko: 'Sama vartija on kääntynyt tuulessa vuodesta 1530',
          tiedosto: 'Vana Toomas (anno 1530) Tallinna raekojas (2013).jpg',
          teksti: 'Raatihuoneen tornin huipulla seisoo tuuliviiri, jota kutsutaan '
            + 'nimellä Vana Toomas. Kaupungin tilikirjassa on merkintä '
            + 'vuodelta 1530: maalari Joachim sai palkkion raadin tuuliviirin '
            + 'kultaamisesta. Siitä asti sotilaaksi puettu hahmo on kääntynyt '
            + 'tuulen mukana 64 metrin korkeudessa. Vuoden 1944 pommituksessa '
            + 'se vaurioitui, ja tornissa on nyt vaskiseppä Vello Rooveerin '
            + 'vuonna 1996 takoma kopio. Alkuperäinen seisoo museossa '
            + 'sisällä.',
          selite: 'Alkuperäinen Vana Toomas läheltä. Metallista taottu sotilas '
            + 'leveälierisessä hatussa, rinnassa haarniska, vyöllä pitkä '
            + 'miekka ja kädessä tanko. Pinta on tummunut vihertäväksi.',
          lahde: 'Kynnap, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Tallinnan raatihuone',
        },
      ],
    },
    {
      id: 'historia',
      nimi: 'Vanha kaupunki',
      johdanto: 'Vanhassakaupungissa on torni, johon salama on iskenyt ainakin '
        + 'yhdeksästi, ja toinen, jonka ampuma-aukot osoittavat naapureihin '
        + 'saman mäen päällä.',
      tehtava: {
        kysymys: 'Minne asti Olevisten kirkon palon loimun kerrotaan näkyneen '
          + 'kesällä 1820?',
        vaihtoehdot: ['Helsinkiin asti', 'Tukholmaan asti', 'Pietariin asti', 'Tarttoon asti'],
        oikea: 0,
        fakta: 'Neljä tuntia kestäneen palon loimun kerrotaan näkyneen '
          + 'Suomenlahden yli Helsinkiin asti.',
      },
      nostot: [
        {
          otsikko: 'Salama löytää saman tornin yhä uudestaan',
          tiedosto: 'Oleviste kirik 2016.jpg',
          teksti: 'Olevisten kirkon torni on Viron korkein kirkontorni, 123,7 '
            + 'metriä maasta, ja se on myös kaupungin ahkerin salamankerääjä. '
            + 'Salama on sytyttänyt tai vaurioittanut tornia ainakin yhdeksän '
            + 'kertaa: 1625, 1693, 1698, 1700, 1707, 1719, 1736, 1757 ja '
            + '1820. Kesäkuun yönä 1820 palo kesti neljä tuntia ja söi koko '
            + 'sisustuksen. Loimun kerrotaan näkyneen Helsinkiin asti, ja '
            + 'uusi torninhuippu valmistui vasta 20 vuotta myöhemmin.',
          selite: 'Olevisten kirkon torni alaviistosta kuvattuna. Valkoiseksi '
            + 'rapattu kivitorni nousee suoraan siniselle taivaalle, ja aivan '
            + 'ylhäällä erottuu vihertävä kuparinen kärki.',
          lahde: 'SofiRussia, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Olevisten kirkko',
        },
        {
          otsikko: 'Epäluulon torni tähtää ylämäkeen',
          tiedosto: 'Lühikese Jala värav.JPG',
          teksti: 'Tallinna oli vuosisatoja kaksi kaupunkia. Mäen päällä oli '
            + 'Toompea omine herroineen ja lakeineen, alhaalla kauppiaiden '
            + 'kaupunki omine raateineen; ne yhdistettiin vasta vuonna 1878. '
            + 'Ylös pääsi vain kahta katua, Pitkää jalkaa ja Lyhyttä jalkaa, '
            + 'ja kummankin päässä oli porttitorni. Lyhyen jalan torniin '
            + 'hakattiin 1400-luvulla ampuma-aukkoja, jotka osoittavat ylös '
            + 'Toompealle — siksi sitä on kutsuttu Epäluulon torniksi. Kahden '
            + 'eripituisen jalan takia Tallinnaa sanotaan leikillään '
            + 'ontuvaksi kaupungiksi.',
          selite: 'Lyhyen jalan portti alhaalta katsottuna. Kiviholvin takaa '
            + 'nousevat portaat Toompealle, paksu puuovi seisoo auki, ja '
            + 'holvin yläpuolella on värillinen reliefi, jossa Neitsyt Maria '
            + 'pitää lasta sylissään.',
          lahde: 'NOSSER, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Toompea',
        },
      ],
    },
  ],
  kiova: [
    {
      id: 'kaupunki',
      nimi: 'Kiova',
      johdanto: 'Kaupunki, jonka kirkonseiniin kirjoitettiin tuhat vuotta sitten ja '
        + 'jonka metroon lasketaan yli sata metriä maan alle.',
      kansikuvat: [
        {
          tiedosto: 'Golden Gate Kiev 2018 G1.jpg',
          selite: 'Kultainen portti: punatiilinen porttitorni, jonka päällä on '
            + 'pieni kullattu kupoli ja kyljessä hirsistä rakennettu käytävä. '
            + 'Rakennus on vuodelta 1982 — se on arvaus, sillä 1000-luvun '
            + 'portista ei ole säilynyt yhtään kuvaa. Aidot muurinpätkät ovat '
            + 'sen sisällä.',
          lahde: 'George Chernilevsky, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'Saint Andrew\'s Church, Kyiv.jpg',
          selite: 'Andreaksen kirkko mäen päällä. Turkoosinvihreiden seinien yllä '
            + 'on tumma sipulikupoli ja sen ympärillä pienempiä torneja '
            + 'kultaisine huippuineen; kirkolle noustaan leveitä portaita. '
            + 'Kirkko valmistui 1750-luvulla italialaisen Bartolomeo '
            + 'Rastrellin piirustusten mukaan.',
          lahde: 'Oleh Kushch, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: '2019-07-13 Kyiv funicular car.jpg',
          selite: 'Funikulaarin vaunu kiipeää jyrkkää rataa puiden välissä. '
            + 'Kyljessä on sinikeltainen kuviointi ja suurin numeroin 905. '
            + 'Rata avattiin vuonna 1905, se on 238 metriä pitkä, ja matka '
            + 'alakaupungista ylös kestää noin kolme minuuttia.',
          lahde: 'Maksym Kozlenko, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Sata metriä alas ja takaisin',
          tiedosto: 'Escalators at the deepest metro station of the world Arsenalna (105.5m) (8601894844).jpg',
          teksti: 'Kiovan Arsenalnan metroasema on 105,5 metriä maanpinnan '
            + 'alapuolella. Se oli maailman syvin asema vuoteen 2022 asti, '
            + 'jolloin Kiinan Chongqingiin avattiin 116 metrin syvyyteen '
            + 'ulottuva Hongyancunin asema. Liukuportaita on kaksi peräkkäin, '
            + '55,8 ja 46,6 metriä, ja niiden välissä on oma väliaula. Syvyys '
            + 'ei ole kikkailua: Kiova on Dneprin jyrkällä rantatörmällä, ja '
            + 'asema on kaivettu törmän sisään.',
          selite: 'Arsenalnan liukuportaat ylhäältä kuvattuna. Matka pinnalta '
            + 'laiturille kestää useita minuutteja, ja tunnelin pää katoaa '
            + 'näkyvistä.',
          lahde: 'Jorge Láscar, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Kiovan metro',
        },
        {
          otsikko: 'Seinät ovat täynnä tuhatvuotisia raapustuksia',
          tiedosto: 'Saint Sophia Cathedral Kiev.jpg',
          teksti: 'Pyhän Sofian katedraali rakennettiin 1000-luvulla, ja sen '
            + 'seinistä on löydetty yli 7000 piirrosta ja tekstiä, jotka '
            + 'kävijät ovat raapineet kiveen 1000–1700-luvuilla. Yksi '
            + 'merkitsi muistiin Jaroslav Viisaan kuoleman, toinen maakaupan, '
            + 'ja ruhtinas Vladimir Monomah kirjoitti seinään oman nimensä. '
            + 'Tutkijat lukevat seiniä kuin ilmoitustaulua, jolle on '
            + 'kirjoitettu seitsemänsadan vuoden ajan.',
          selite: 'Sofian katedraali kellotornista kuvattuna: vihreitä kattoja ja '
            + 'kupoliryhmä, jonka keskimmäinen kupoli on kullattu. Takana '
            + 'alkaa nykyinen kaupunki kerrostaloineen.',
          lahde: 'Daniel Kraft, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Pyhän Sofian katedraali (Kiova)',
        },
        {
          otsikko: 'Kilpi vaihdettiin kesken sodan',
          tiedosto: 'Mother Ukraine monument with the Ukrainian trident in Kyiv, Ukraine, 2026.jpg',
          teksti: 'Dneprin rinteellä seisoo 62 metriä korkea teräksinen '
            + 'naispatsas, kädessään 16 metrin miekka ja 13 metriä leveä '
            + 'kilpi. Patsas paljastettiin vuonna 1981, ja kilvessä oli '
            + 'silloin Neuvostoliiton vaakuna. Elokuussa 2023 vaakuna '
            + 'irrotettiin ja tilalle nostettiin Ukrainan kolmikärki. Työ '
            + 'tehtiin kovassa tuulessa ja sateessa ja keskeytyi '
            + 'ilmahälytyksiin, mutta kilpi oli valmis ennen '
            + 'itsenäisyyspäivää 24. elokuuta.',
          selite: 'Patsas alhaalta kuvattuna. Teräsnainen kohottaa oikeassa '
            + 'kädessään miekkaa ja vasemmassa kilpeä, jossa erottuu Ukrainan '
            + 'kolmikärki.',
          lahde: 'Світлана 743, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'musiikki',
      nimi: 'Musiikki',
      johdanto: 'Kiovassa lauloivat sokeat kiertolaislaulajat — ja täällä kuultiin '
        + 'ensi kerran laulu, joka soi nykyään joka joulu ympäri maailmaa.',
      tehtava: {
        kysymys: 'Minkä englanninkielisen joululaulun pohjana on kiovalainen '
          + 'Štšedryk?',
        vaihtoehdot: ['Jingle Bell Rock', 'White Christmas', 'Carol of the Bells', 'Winter Wonderland'],
        oikea: 2,
        fakta: 'Opettaja Peter Wilhousky teki New Yorkissa kuulemaansa '
          + 'ukrainalaiseen sävelmään uudet sanat kelloista, ja laulun '
          + 'nimeksi tuli Carol of the Bells.',
      },
      nostot: [
        {
          otsikko: 'Kobzari lauloi, ja sali vaikeni',
          tiedosto: 'Вересай Остап з дружиною.jpg',
          teksti: 'Kobzarit olivat sokeita kiertäviä laulajia, jotka esittivät '
            + 'dumia — pitkiä kertovia lauluja — banduran säestyksellä. '
            + 'Kuuluisin heistä, Ostap Veresai, kutsuttiin Kiovaan vuonna '
            + '1873 maantieteellisen seuran kokoukseen: kuulijoina oli 28 '
            + 'seuran jäsentä ja 60 kutsuvierasta. Seuraavana vuonna hän '
            + 'lauloi Kiovan arkeologisessa kongressissa, ja lontoolainen '
            + 'Athenaeum-lehti vertasi häntä antiikin Kreikan runonlaulajiin.',
          selite: 'Ostap Veresai vaimonsa kanssa vuonna 1873. Bandura on polvella '
            + 'ja kävelykeppi nojaa seinään — kobzarit kulkivat kylästä '
            + 'kylään oppaan kanssa.',
          lahde: 'Joseph Kordysch, Wikimedia Commons (PD)',
          wiki: 'Bandura',
          musiikki: 'https://music.apple.com/fi/search?term=bandura%20kobzar',
          musiikkiNimi: 'Bandura-musiikkia Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/jamendo-369605/01-1720225-Nataliya%20Bermas-Ukrainian%20Melody%20Ivanko.mp3',
          musiikkiNayteNimi: 'Ukrainalainen sävelmä "Ivanko" — Nataliya Bermas, CC BY-NC',
        },
        {
          otsikko: 'Neljä säveltä, joita soitetaan joka joulu',
          tiedosto: 'Mykola Leontovych.jpg',
          teksti: 'Kiovassa esitettiin 29. joulukuuta 1916 opiskelijakuoron '
            + 'joulukonsertissa kuoroteos Štšedryk. Mykola Leontovytš oli '
            + 'sovittanut sen vanhasta uudenvuodenlaulusta, jossa pääsky '
            + 'lentää taloon lupaamaan hyvää vuotta, ja sen alla toistuu koko '
            + 'ajan sama neljän sävelen kuvio. Ukrainalainen kuoro vei laulun '
            + 'New Yorkiin vuonna 1922, ja opettaja Peter Wilhousky kirjoitti '
            + 'sävelmään uudet englanninkieliset sanat kelloista. Niin syntyi '
            + 'Carol of the Bells, joka kuullaan myös Yksin kotona '
            + '-elokuvassa.',
          selite: 'Mykola Leontovytš mustavalkoisessa muotokuvassa: lyhyt parta '
            + 'ja pystykauluksinen takki, jonka kauluksessa on vaalea '
            + 'koristenauha.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Carol of the Bells',
          musiikki: 'https://music.apple.com/fi/search?term=shchedryk%20leontovych',
          musiikkiNimi: 'Štšedryk Apple Musicissa',
          musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/6b/Shchedryk%27s_%22Carol_of_the_Bells%22_%281922%29.oga/Shchedryk%27s_%22Carol_of_the_Bells%22_%281922%29.oga.mp3',
          musiikkiNayteNimi: 'Štšedryk vuoden 1922 levytyksenä — Ukrainan kansalliskuoro, johtajana Oleksandr Košyts (PD)',
        },
      ],
    },
  ],
  pietari: [
    {
      id: 'kaupunki',
      nimi: 'Pietari',
      johdanto: 'Kaupunkia ei ollut vielä vuonna 1703: se rakennettiin tyhjästä '
        + 'Nevan soisille saarille, vaihtoi nimeä kolme kertaa ja pitää yhä '
        + 'kuuttakymmentä kissaa töissä.',
      kansikuvat: [
        {
          tiedosto: 'Smolny Cathedral SPB 02.jpg',
          selite: 'Smolnan katedraali kesätaivasta vasten. Seinät ovat '
            + 'vaaleansiniset ja koristeet valkoiset, keskikupolin ympärillä '
            + 'seisoo neljä tornia, ja molemmin puolin kaartuu luostarin '
            + 'matalampi rakennus.',
          lahde: 'Florstein (Telegram:WikiPhoto.Space), Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Saint Petersburg Winter Palace IMG 6487 1280.jpg',
          selite: 'Talvipalatsin julkisivu Palatsiaukiolle. Seinä on '
            + 'vaaleanvihreä, pylväät valkoiset ja koristeet kullattuja; '
            + 'portin edessä odottaa valkoisen hevosen vetämä vaunu.',
          lahde: 'Alexxx1979, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'The Bronze Horseman (St. Petersburg, Russia).jpg',
          selite: 'Vaskiratsastaja jättimäisen graniittilohkareen päällä: hevonen '
            + 'nousee takajaloilleen ja Pietari Suuri ojentaa kätensä '
            + 'eteenpäin. Kiveen on kaiverrettu venäjäksi Pietari '
            + 'ensimmäiselle, Katariina toiselta.',
          lahde: 'Godot13, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Kaupunki rakennettiin suolle',
          tiedosto: 'Peter I by Kneller.jpg',
          teksti: 'Vuonna 1703 Nevan suistossa ei ollut kaupunkia, vain matalia '
            + 'soisia saaria ja hävitetyn ruotsalaislinnoituksen paikka. '
            + 'Pietari Suuri aloitti rakentamisen linnoituksesta ja antoi '
            + 'paikalle hollanninkielisen nimen Sankt Pieterburg — ei itsensä '
            + 'vaan apostoli Pietarin mukaan. Vuonna 1712 hän julisti '
            + 'keskeneräisen kaupungin pääkaupungiksi ja käski aatelisten ja '
            + 'kauppiaiden muuttaa Moskovasta tänne rakentamaan uudet '
            + 'talonsa. Nimi on vaihtunut sen jälkeen kolmesti: Petrograd '
            + '1914, Leningrad 1924, Pietari taas 1991.',
          selite: 'Pietari Suuri Godfrey Knellerin maalauksessa vuodelta 1698. '
            + 'Hän seisoo hopeisessa haarniskassa kultainen viitta '
            + 'hartioilla, ja takana olevasta aukosta näkyy purjelaivoja '
            + 'merellä.',
          lahde: 'Godfrey Kneller, Wikimedia Commons (PD)',
          wiki: 'Pietari Suuri',
        },
        {
          otsikko: 'Museon virkakissat',
          tiedosto: 'Hermitage cat1.JPG',
          teksti: 'Talvipalatsin kellareissa asuu kissoja, joiden työ on pitää '
            + 'hiiret poissa taidekokoelmien kimpusta. Keisarinna Elisabet '
            + 'määräsi vuonna 1745 tuomaan palatsiin kissoja Kazanista, jonka '
            + 'hiirenpyytäjiä pidettiin maan parhaina. Nykyään kissoja on '
            + 'noin 60, niillä on kolme hoitajaa, ja museossa on '
            + 'lehdistösihteeri pelkästään kissoja varten.',
          selite: 'Eremitaašin kissa istumassa museon graniittiportaalla. Kissat '
            + 'asuvat kellarikerroksessa mutta käyvät kesäisin ulkona '
            + 'rantakadulla.',
          lahde: 'Petrov Victor, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Eremitaaši',
        },
        {
          otsikko: 'Sinfonia piiritetyssä kaupungissa',
          tiedosto: 'Fireman shostakovich.jpg',
          teksti: 'Dmitri Šostakovitš aloitti seitsemännen sinfoniansa '
            + 'Leningradissa 1941, kun kaupunki oli saarrettu. Teos '
            + 'esitettiin siellä 9. elokuuta 1942. Kaupungin '
            + 'radio-orkesterista oli jäljellä vain 15 soittajaa, joten muita '
            + 'haettiin rintamalta. Esitys kuului kaiuttimista kaduilla ja '
            + 'kaupungin ulkopuolelle asti. Sinfonia kestää noin 80 '
            + 'minuuttia.',
          selite: 'Šostakovitš palokunnan varusteissa. Hän oli sodan alussa '
            + 'Leningradin konservatorion palovartiossa, ja kuva kiersi '
            + 'maailman lehdissä 1942.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Dmitri Šostakovitš',
          musiikki: 'https://music.apple.com/fi/search?term=shostakovich%20symphony%207',
          musiikkiNimi: 'Šostakovitšin 7. sinfonia Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/ShostakovichSymphonyNo.5-Stokowski/02.Ii.Allegretto.mp3',
          musiikkiNayteNimi: 'Šostakovitš: 5. sinfonia — Leopold Stokowski, CC BY-NC-SA',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja vuodenajat',
      johdanto: 'Täällä kevät tunnistetaan hajusta ja lukuvuoden loppu siitä, että '
        + 'Nevalle purjehtii laiva punaisin purjein.',
      tehtava: {
        kysymys: 'Mistä Punaiset purjeet -juhla on saanut nimensä?',
        vaihtoehdot: ['Vanhasta merimieslaulusta', 'Aleksandr Grinin kirjasta', 'Nevan siltojen väristä', 'Suuresta purjelaivakisasta'],
        oikea: 1,
        fakta: 'Juhlan nimi tulee Aleksandr Grinin vuoden 1923 kertomuksesta, '
          + 'jossa tyttö odottaa vuosikausia laivaa punaisine purjeineen.',
      },
      nostot: [
        {
          otsikko: 'Kevät tuoksuu kurkulta',
          tiedosto: 'Homemaid fried smelt Saint Petersburg Russia.jpg',
          teksti: 'Kuore nousee keväällä Nevaan kutemaan, ja tuoreena se tuoksuu '
            + 'tuoreelta kurkulta — sen tunnistaa torilla nenällä ennen kuin '
            + 'näkee. Kala pyöritetään jauhoissa ja paistetaan kokonaisena. '
            + 'Pietarissa kevään katsotaan alkavan siitä, kun kuore ilmestyy '
            + 'myyntiin, ja kaupungissa on 2000-luvun alusta järjestetty '
            + 'sille oma juhla. Suomessa sama kala tunnetaan myös nimellä '
            + 'norssi.',
          selite: 'Paistettuja kuoreita lautasella Pietarissa. Kalat ovat '
            + 'kämmenen mittaisia ja ne syödään kokonaisina, päät ja pyrstöt '
            + 'mukaan lukien.',
          lahde: 'Markovka, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Kuore',
        },
        {
          otsikko: 'Punaiset purjeet päättävät lukuvuoden',
          tiedosto: 'Алые паруса.jpg',
          teksti: 'Kesäkuun lopussa Pietarin yö ei pimene kunnolla, ja silloin '
            + 'koulunsa päättävät nuoret saavat oman juhlansa. Alyje parusa '
            + 'eli Punaiset purjeet alkoi vuonna 1968, kun muutama '
            + 'leningradilainen koulu juhli yhdessä lukuvuoden loppua. Nimi '
            + 'tulee Aleksandr Grinin kertomuksesta vuodelta 1923: siinä '
            + 'tyttö odottaa vuosikausia laivaa, jolla on punaiset purjeet. '
            + 'Nyt sellainen laiva purjehtii oikeasti Nevalle — vuonna 2010 '
            + 'sitä katsoi kolme miljoonaa ihmistä.',
          selite: 'Purjelaiva punaisine purjeineen Nevalla kesällä 2010. '
            + 'Rantakadun palatsirivi on valaistu ja taivas täynnä '
            + 'ilotulitusta.',
          lahde: 'Spbkinoforum, Wikimedia Commons (CC BY 3.0)',
        },
      ],
    },
  ],
  moskova: [
    {
      id: 'kaupunki',
      nimi: 'Moskova',
      johdanto: 'Maailman suurin kello ei ole soinut kertaakaan, ja kaupungin '
        + 'komeimmat salit ovat kolmenkymmenen metrin syvyydessä maan alla.',
      kansikuvat: [
        {
          tiedosto: 'Sobornaya Square at the Moscow Kremlin, 2014.jpg',
          selite: 'Kremlin Katedraaliaukio ylhäältä Ivan Suuren kellotornista '
            + 'kuvattuna. Valkoiset kirkot seisovat kivetyn aukion ympärillä, '
            + 'kupolit hopeana ja kultana, ja oikealla kohoaa palatsin vihreä '
            + 'katto.',
          lahde: 'Gerarus, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Moscow State University crop.jpg',
          selite: 'Moskovan valtionyliopiston päärakennus, 239 metriä korkea '
            + 'tornitalo vuodelta 1953. Se oli Euroopan korkein rakennus 37 '
            + 'vuoden ajan, ja edessä puiston keskellä seisoo patsas.',
          lahde: 'Dmitry A. Mottl (cropped by King of Hearts), Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Vostok 8K72K in VDNKh (1).jpg',
          selite: 'Vostok-kantoraketin täysikokoinen malli VDNH-puistossa. '
            + 'Puna-valkoinen raketti nojaa harmaaseen teräsristikkoon; '
            + 'tällainen raketti vei Juri Gagarinin kiertoradalle vuonna '
            + '1961.',
          lahde: 'Dmitry Ivanov, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Suurin kello ei ole koskaan soinut',
          tiedosto: '00 4841 Tsar Bell - Moscow Kremlin.jpg',
          teksti: 'Kremlin pihalla seisoo maailman suurin kello: 202 tonnia '
            + 'painava ja 6,14 metriä korkea jättiläinen. Se valettiin paikan '
            + 'päällä kaivettuun kuoppaan ja valmistui marraskuussa 1735. '
            + 'Kaksi vuotta myöhemmin Kremlissä syttyi tulipalo, ja vartijat '
            + 'heittivät kuumalle kellolle kylmää vettä. Siihen tuli '
            + 'yksitoista halkeamaa, ja reunasta lohkesi 11 500 kilon pala. '
            + 'Kelloa ei ole soitettu kertaakaan. Saman muurin sisällä seisoo '
            + 'tsaarin tykki vuodelta 1586, jota ei ole koskaan ammuttu '
            + 'sodassa.',
          selite: 'Tsaarin kello jalustallaan Kremlissä. Kellon kyljessä ammottaa '
            + 'musta aukko, ja irronnut pala nojaa maassa kellon vierellä '
            + 'kuin auki jätetty ovi.',
          lahde: 'W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Tsaarin kello',
        },
        {
          otsikko: 'Bolshoi tarkoittaa suurta',
          tiedosto: 'Bolshoi ballet troupe.jpeg',
          teksti: 'Bolshoi tarkoittaa venäjäksi suurta. Teatterin juuret '
            + 'ulottuvat vuoteen 1776, ja sen balettiryhmässä tanssii yli 200 '
            + 'tanssijaa — enemmän kuin missään muussa maailman '
            + 'balettiryhmässä. Nykyinen talo avattiin uudelleen lokakuussa '
            + '2011 kuusi vuotta kestäneen korjauksen jälkeen, jossa salin '
            + 'alkuperäinen akustiikka palautettiin. Teatterin julkisivu on '
            + 'painettu Venäjän sadan ruplan seteliin.',
          selite: 'Bolshoin koko seurue lavalla. Taustakankaaseen on maalattu '
            + 'teatterin oma julkisivu pylväineen, ja edessä seisovat '
            + 'balettitanssijat mustissa tutuissa.',
          lahde: 'www.kremlin.ru, Wikimedia Commons (CC BY 4.0)',
          wiki: 'Bolshoi-teatteri',
          musiikki: 'https://music.apple.com/fi/search?term=bolshoi%20ballet',
          musiikkiNimi: 'Bolshoi-baletin musiikkia Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/TchaikovskyTheNutcrackerSuite/Tchaikovsky_nutcrackerSuitePartTwo.mp3',
          musiikkiNayteNimi: 'Tšaikovski: Pähkinänsärkijä — CC BY',
        },
        {
          otsikko: 'Kirkko, uimahalli ja taas kirkko',
          tiedosto: 'Cathedral of Christ the Saviour 2024.jpg',
          teksti: 'Kristus Vapahtajan katedraali räjäytettiin joulukuussa 1931. '
            + 'Tilalle piti nousta maailman korkein rakennus, Neuvostojen '
            + 'palatsi, mutta sitä ei koskaan saatu pystyyn: sota vei '
            + 'teräkset muualle. Valmiiseen perustuskuoppaan tehtiin sen '
            + 'sijaan ulkouima-allas, jonka vesiympyrän halkaisija oli 130 '
            + 'metriä. Vesi lämmitettiin, joten siellä uitiin pakkasellakin. '
            + 'Allas suljettiin 1994, ja kirkko rakennettiin samalle paikalle '
            + 'uudelleen.',
          selite: 'Uudelleen rakennettu Kristus Vapahtajan katedraali. Valkoisen '
            + 'kivijulkisivun päällä on suuri kullattu kupoli ja neljä '
            + 'pienempää, ja portaita ylös kulkee jono ihmisiä.',
          lahde: 'Юрий Д.К., Wikimedia Commons (CC BY 4.0)',
          wiki: 'Kristus Vapahtajan katedraali (Moskova)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Moskovalainen kulkee töihin mosaiikkiholvien alitse, ja '
        + 'laskiaisviikolla koko kaupunki syö aurinkoja.',
      tehtava: {
        kysymys: 'Mitä laskiaisviikon lopuksi poltetaan?',
        vaihtoehdot: ['Oljista tehty nukke', 'Kuivunut kuusenoksa', 'Talven viimeinen halko', 'Vanha puinen kelkka'],
        oikea: 0,
        fakta: 'Maslenitsa-viikon päätteeksi poltetaan oljista tehty nukke, joka '
          + 'kuvaa väistyvää talvea.',
      },
      nostot: [
        {
          otsikko: 'Maanalainen palatsi',
          tiedosto: 'Vertical panorama of the Mayakovskaya Metro Station.jpg',
          teksti: 'Majakovskajan metroasema avattiin syyskuussa 1938, ja se on 33 '
            + 'metriä maan alla. Pylväät on päällystetty ruostumattomalla '
            + 'teräksellä ja vaaleanpunaisella rodoniitilla, ja katon '
            + 'soikeissa kuopissa on 34 mosaiikkia, joiden sarjan nimi on '
            + 'Vuorokausi neuvostotaivaalla. Aseman suunnittelija Aleksei '
            + 'Dushkin sai New Yorkin maailmannäyttelyn pääpalkinnon vuonna '
            + '1939. Sodan aikana asemalla suojauduttiin pommituksilta, ja '
            + 'marraskuussa 1941 sen keskushallissa pidettiin suuri kokous.',
          selite: 'Majakovskajan laituri alhaalta kuvattuna. Kattoon on upotettu '
            + 'soikeita kuoppia, joiden pohjassa on mosaiikki ja reunalla '
            + 'rengas lamppuja.',
          lahde: 'Andrey Kryuchenko, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Moskovan metro',
        },
        {
          otsikko: 'Laskiaisviikolla syödään aurinkoja',
          tiedosto: 'Tea party with pancakes and a samovar.jpg',
          teksti: 'Maslenitsa on viikon mittainen juhla ennen ortodoksisen kirkon '
            + 'suurta paastoa, ja sen ruoka on blini: ohut lettu, joka '
            + 'esittää aurinkoa. Täytteenä on smetanaa, hilloa, suolakalaa '
            + 'tai kaviaaria, ja teevesi keitetään samovaarissa. Viikon '
            + 'lopuksi poltetaan oljista tehty nukke, joka kuvaa talvea. '
            + 'Sunnuntaina on tapana pyytää anteeksi kaikilta, joita on '
            + 'vuoden mittaan loukannut.',
          selite: 'Laskiaispöytä lumihangessa koivikon reunassa. Samovaari '
            + 'höyryää keskellä, koreissa on blinejä ja piirakoita, ja seurue '
            + 'seisoo ulkona takit päällä.',
          lahde: 'Avsolov, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Maslenitsa',
        },
      ],
    },
  ],
  sofia: [
    {
      id: 'kaupunki',
      nimi: 'Sofia',
      johdanto: 'Kaupungin vaakunassa lukee: kasvaa, mutta ei vanhene. Metroa '
        + 'kaivettaessa löytyi kokonainen roomalainen kortteli, ja etelässä '
        + 'vuori alkaa viimeisen bussipysäkin takaa.',
      kansikuvat: [
        {
          tiedosto: 'Alexander Nevsky Cathedral, Sofia, 2025.jpg',
          selite: 'Aleksanteri Nevskin katedraali aurinkoisena päivänä. '
            + 'Keskikupoli on kullattu ja muut kupolit vihreää kuparia; '
            + 'kellotornissa on kaksitoista kelloa, joista raskain painaa 12 '
            + 'tonnia ja kevyin 10 kiloa.',
          lahde: 'Beyoglou, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Oldest building in the city, Church St. George Rotunda Храм ротонда "Св. Георги", Sofia, Bulgaria.jpg',
          selite: 'Pyhän Yrjön rotunda, Sofian vanhin rakennus. Punatiilinen '
            + 'pyöreä kirkko seisoo kaivannon pohjalla nykyisten katujen '
            + 'alapuolella, harmaiden kerrostalojen ympäröimänä.',
          lahde: 'Sharon Hahn Darlin, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Sofia Central Mineral Baths 20180224.jpg',
          selite: 'Keskustan mineraalikylpylä. Julkisivu on raidoitettu '
            + 'keltaisella ja valkoisella, ja kulmissa kohoaa kupolit; talon '
            + 'takaa pilkistää vanha savupiippu.',
          lahde: 'Suicasmo, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Serdica on minun Roomani',
          tiedosto: 'Баня Баши и антична Сердика.jpg',
          teksti: 'Sofian alla on toinen kaupunki. Roomalaisessa Serdicassa '
            + 'viihtyi keisari Konstantinus Suuri, jonka kerrotaan sanoneen '
            + 'siitä: Serdica on minun Roomani. Kun metroa kaivettiin vuosina '
            + '2010–2012, maasta paljastui kokonainen kortteli katuja, taloja '
            + 'ja kaupunginmuurin itäportti. Löytöjä ei peitetty takaisin. '
            + 'Nyt matkustaja nousee liukuportaita ylös keskelle katua, jota '
            + 'pitkin on kuljettu 1800 vuotta.',
          selite: 'Etualalla antiikin Serdican perustuksia: matalia kivi- ja '
            + 'tiilimuureja aidattuna aukiolla. Takana kohoaa Banja Bashin '
            + 'moskeija punatiilisine minareetteineen.',
          lahde: 'Лили Маркова, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Sofia',
        },
        {
          otsikko: 'Neljä uskontoa saman korttelin ympärillä',
          tiedosto: 'Sofia Synagogue chandelier.JPG',
          teksti: 'Muutaman sadan metrin päässä toisistaan seisoo Sofiassa neljä '
            + 'eri uskonnon rakennusta: ortodoksinen Pyhän Nedeljan kirkko, '
            + 'Banja Bashin moskeija vuodelta 1566, Sofian synagoga ja '
            + 'katolinen Pyhän Joosefin katedraali. Kaupunkia kutsutaan siksi '
            + 'suvaitsevaisuuden neliöksi. Synagoga avattiin 1909 ja on '
            + 'Kaakkois-Euroopan suurin. Sen kattokruunu painaa 1,7 tonnia — '
            + 'enemmän kuin henkilöauto.',
          selite: 'Sofian synagogan kattokruunu vaaleanvihreän kupolin alla. '
            + 'Kullanvärisestä kehästä riippuu kymmeniä pieniä lyhtyjä '
            + 'kahdessa kerroksessa, ja keskellä on suurempi valaisin.',
          lahde: 'DMY, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Gaida — säkkipilli Balkanilla',
          tiedosto: 'Kostadin Varimezov playing the gaida.jpg',
          teksti: 'Sofian kaduilla soittajien mukana kulkee gaida: vuohennahasta '
            + 'tehty säkkipilli, jota soitetaan häissä ja tansseissa. '
            + 'Rodopeilta kotoisin oleva iso kaba gaida soi matalasti ja '
            + 'käheästi. Soittaja täyttää säkin puhaltamalla ja puristaa '
            + 'siitä ilmaa kainalollaan, jottei ääni katkea hengenvedon '
            + 'ajaksi. Tahtilajit ovat suomalaiseen korvaan outoja: yleisiä '
            + 'ovat 7/8 ja 11/16, joten askel menee pitkä–lyhyt–lyhyt.',
          selite: 'Kostadin Varimezov, yksi Bulgarian tunnetuimmista '
            + 'gaida-soittajista, istuu sisällä soittamassa. Puhallusputki on '
            + 'suussa, sormet melodiapillillä ja vaalea nahkasäkki '
            + 'kainalossa.',
          lahde: 'Martha Forsyth, Wikimedia Commons (CC BY 4.0)',
          wiki: 'Säkkipilli',
          aani: 'https://archive.org/download/aporee_34245_39372/streetmusicianssofia.mp3',
          aaniLahde: '"Sofia Center — street musicians: voice, gaida and drum" — dohfoh, radio aporee (public domain)',
          musiikki: 'https://music.apple.com/fi/search?term=bulgarian%20folk%20gaida',
          musiikkiNimi: 'Bulgarialaista kansanmusiikkia Apple Musicissa',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Sofialainen aamu alkaa usein kahdesta paikasta: kadunvarren '
        + 'kivennäisvesihanasta ja leipomon luukusta, josta ojennetaan kuumaa '
        + 'juustopiirakkaa paperiin käärittynä.',
      tehtava: {
        kysymys: 'Mitä keskustan vanhassa kylpylärakennuksessa on nykyään?',
        vaihtoehdot: ['Kaupunginmuseo', 'Metroaseman lippuhalli', 'Kunnallinen uimahalli', 'Yliopiston kirjasto'],
        oikea: 0,
        fakta: 'Kylpylä suljettiin vuonna 1986, ja talon toisessa puoliskossa '
          + 'toimii nykyään kaupunginmuseo.',
      },
      nostot: [
        {
          otsikko: 'Vesi tulee lämpimänä maasta',
          tiedosto: 'Mineral Water Sofia centar 1.jpeg',
          teksti: 'Sofian alla on 49 kivennäis- ja lämpölähdettä. Keskustan lähde '
            + 'antaa vettä 110 litraa sekunnissa, ja sen päälle valmistui '
            + 'vuonna 1913 suuri kylpylä, jonka pienimmissä altaissa vesi oli '
            + '37- ja 46-asteista. Kylpylä suljettiin 1986, ja nykyään talon '
            + 'toisessa puoliskossa on kaupunginmuseo. Seinustalla on silti '
            + 'yhä julkisia hanoja, joista tulee lämmintä lähdevettä — niiden '
            + 'luona seisoo joka päivä ihmisiä pullot ja kanisterit mukanaan.',
          selite: 'Kivennäisvesihana Sofian keskustassa. Karkeasta harmaasta '
            + 'kivestä tehdyn altaan takaseinästä suihkuaa ohut vesisuihku, '
            + 'ja taustalla näkyy kylpylän raidallinen tiiliseinä.',
          lahde: 'Vanjakom, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Banitsassa on onnenviesti',
          tiedosto: 'Banitsa in Sofia Bulgaria 20090404 001.JPG',
          teksti: 'Banitsa on filotaikinasta ja sirene-juustosta kierretty '
            + 'piirakka, jota syödään aamiaiseksi jogurttijuoman tai bozan '
            + 'kanssa. Sofiassa se ostetaan kadunkulman luukusta kuumana ja '
            + 'paperiin käärittynä. Uudenvuoden banitsan sisään kätketään '
            + 'pieniä paperilappuja, joihin on kirjoitettu toivotuksia — se, '
            + 'minkä lapun omasta palastaan löytää, kertoo tulevasta '
            + 'vuodesta.',
          selite: 'Kaksi banitsarullaa punakeltaisen paperin päällä kahvilan '
            + 'pöydällä. Filotaikina on kääritty pitkäksi kierteeksi ja '
            + 'paistettu kullanruskeaksi; kyljestä pursuaa hieman '
            + 'juustotäytettä.',
          lahde: 'Apostoloff, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Banitsa',
        },
      ],
    },
  ],
  bukarest: [
    {
      id: 'kaupunki',
      nimi: 'Bukarest',
      johdanto: 'Kaupunki, jossa maailman painavin talo nousi vanhan keskustan '
        + 'tilalle — ja jossa kokonaisia kirkkoja työnnettiin kiskoilla pois '
        + 'sen tieltä.',
      kansikuvat: [
        {
          tiedosto: 'RO B Stavropoleos Church 1.jpg',
          selite: 'Stavropoleoksen luostarikirkko vuodelta 1724 '
            + 'vanhassakaupungissa. Ulkoseinän kaariin on maalattu '
            + 'pyhimyksiä, kuistin pylväät on veistetty kivestä ja katto on '
            + 'punaista tiiltä.',
          lahde: 'Andrei Stroe, Wikimedia Commons (CC BY 3.0)',
        },
        {
          tiedosto: 'Pasajul Macca-Villacrosse - Vedere Interior.jpg',
          selite: 'Macca–Villacrossen kauppakäytävä vanhassakaupungissa. '
            + 'Keltainen lasikatto kaartuu kujan yli, ja alla on kahviloita, '
            + 'kylttejä ja kaksi Romanian lippua.',
          lahde: 'Mihai Petre, Wikimedia Commons (CC BY-SA 3.0 ro)',
        },
        {
          tiedosto: 'Libraria Carturesti Carusel - Interior ziua.jpg',
          selite: 'Cărturești Carusel -kirjakauppa Lipscanin kadulla. Valkoiset '
            + 'pylväät ja kaarevat parvekkeet nousevat lasikaton alle, ja '
            + 'kierreportaat vievät hyllyriviltä toiselle.',
          lahde: 'Mihai Petre, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Maailman painavin rakennus',
          tiedosto: '20260523 124938 May 2026 in Bucharest.jpg',
          teksti: 'Parlamenttipalatsin rakentaminen alkoi vuonna 1984 Nicolae '
            + 'Ceaușescun määräyksestä. Pääarkkitehti oli Anca Petrescu, ja '
            + 'hänen kanssaan piirsi noin 700 muuta arkkitehtia. '
            + 'Lattiapinta-alaa on 365 000 neliömetriä ja painoa noin 4,1 '
            + 'miljoonaa tonnia — enemmän kuin missään muussa rakennuksessa '
            + 'maailmassa. Tieltä purettiin kokonainen vanha kaupunginosa, ja '
            + 'kymmenettuhannet asukkaat muuttivat muualle. Nyt talossa '
            + 'kokoontuu Romanian parlamentti, mutta noin 70 prosenttia '
            + 'huoneista on yhä tyhjillään.',
          selite: 'Parlamenttipalatsin pääjulkisivu puiden takaa. Edessä seisova '
            + 'bussirivi näyttää mittakaavan: taloa jatkuu kuvan molempien '
            + 'reunojen yli, ja korkeutta on 84 metriä.',
          lahde: 'Rakoon, Wikimedia Commons (CC0)',
          wiki: 'Casa Poporului',
        },
        {
          otsikko: 'Kirkko työnnettiin pois tieltä',
          tiedosto: 'Schitul Maicilor 51.jpg',
          teksti: 'Kun Bukarestin keskustaa purettiin 1980-luvulla, insinööri '
            + 'Eugeniu Iordăchescu keksi pelastaa kirkot siirtämällä ne '
            + 'syrjään. Rakennuksen alle valettiin betonilaatta ja laatan '
            + 'alle kiskot, joita pitkin koko kirkko työnnettiin uuteen '
            + 'paikkaan. Ensimmäisenä lähti liikkeelle vuonna 1725 rakennettu '
            + 'Schitul Maicilor: kesäkuussa 1982 se matkasi 245 metriä uusien '
            + 'talojen taakse. Iordăchescu siirsi kaikkiaan 29 rakennusta, '
            + 'joista 13 oli kirkkoja tai luostareita.',
          selite: 'Schitul Maicilorin kirkko nykyisellä paikallaan. Pieni '
            + 'valkoinen kirkko punaisine tiilikattoineen jäi ison '
            + 'toimistotalon ja kerrostalojen väliin, ja sen eteen mahtuu '
            + 'muutama pysäköity auto.',
          lahde: 'Biruitorul, Wikimedia Commons (CC0)',
          wiki: 'Bukarest',
        },
        {
          otsikko: 'Makkara, jolta loppui kuori',
          tiedosto: 'Mititei la gratar.jpg',
          teksti: 'Mici eli mititei, "pienet", ovat kuorettomia '
            + 'jauhelihamakkaroita, joissa on valkosipulia, timjamia ja '
            + 'ruokasoodaa — sooda tekee niistä kuohkeita. Tarinan mukaan ne '
            + 'syntyivät 1800-luvun Bukarestissa, kun eräältä kapakoitsijalta '
            + 'loppuivat makkarankuoret kesken illan ja hän paistoi massan '
            + 'sellaisenaan. Vappuna niitä grillataan koko maassa pihoilla ja '
            + 'puistoissa.',
          selite: 'Micejä hiiligrillissä. Massa puristetaan sormenpaksuisiksi '
            + 'pötköiksi ilman kuorta ja käännellään hiilloksella muutaman '
            + 'minuutin ajan. Lisukkeeksi tulee sinappia ja leipää.',
          lahde: 'Nicubunu, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Mititei',
        },
      ],
    },
    {
      id: 'tiede',
      nimi: 'Tiede ja keksinnöt',
      johdanto: 'Bukarestissa aseteltiin maailman ensimmäiset dioraamat museon '
        + 'saliin ja rakennettiin lentokone, jota ohjattiin ratilla.',
      tehtava: {
        kysymys: 'Missä Aurel Vlaicu menestyi Wienin lentoviikolla 1912?',
        vaihtoehdot: ['Nopeuskilpailussa', 'Pisimmässä yölennossa', 'Tarkkuuslaskussa', 'Korkeuslennossa'],
        oikea: 2,
        fakta: 'Aurel Vlaicu menestyi Wienin lentoviikolla 1912 muun muassa '
          + 'tarkkuuslaskussa.',
      },
      nostot: [
        {
          otsikko: 'Museo, jossa dioraama keksittiin',
          tiedosto: 'Grigore Antipa National Museum of Natural History. The worldwide only intact skeleton of a Deinotherium Gigantissimum (1).JPG',
          teksti: 'Grigore Antipa johti Bukarestin luonnontieteellistä museota 51 '
            + 'vuotta, vuodesta 1892 vuoteen 1944. Kun museo sai uuden talon, '
            + 'hän asetti vuonna 1907 eläimet ensimmäistä kertaa omaan '
            + 'maisemaansa maalatun taustan eteen. Ensimmäiset dioraamat '
            + 'esittivät Karpaatteja, Bărăganin tasankoa ja Tonavan suistoa, '
            + 'ja pian muidenkin maiden museot pyysivät Antipalta neuvoja. '
            + 'Samassa talossa seisoo dinoteriumin luuranko: norsun '
            + 'sukulainen, jonka syöksyhampaat kaartuvat alaleuasta alaspäin.',
          selite: 'Dinoteriumin luuranko museon salissa. Alaleuasta kaartuu kaksi '
            + 'syöksyhammasta alaspäin kuin koukut, vasemmalla näkyy toinen '
            + 'luuranko ja takana lasin takana vihreä Afrikan dioraama.',
          lahde: 'Britchi Mirela, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Dioraama',
        },
        {
          otsikko: 'Lentokone, jota ohjattiin ratilla',
          tiedosto: 'Aurel Vlaicu 1912 Cotroceni.jpg',
          teksti: 'Aurel Vlaicu alkoi rakentaa omaa lentokonettaan armeijan '
            + 'asepajassa Bukarestissa marraskuussa 1909, ja kone nousi '
            + 'ilmaan Cotrocenin kentällä 17. kesäkuuta 1910. Siivekkeitä ei '
            + 'ollut lainkaan: ohjaajalla oli ratti kuin autossa, ja käännös '
            + 'tehtiin kallistamalla rattitankoa sivulle. Potkureita oli '
            + 'kaksi, toinen ohjaamon edessä ja toinen siiven takana, ja ne '
            + 'pyörivät vastakkaisiin suuntiin. Wienin lentoviikolla 1912 '
            + 'Vlaicu voitti palkinnot muun muassa tarkkuuslaskusta.',
          selite: 'Vlaicu-kone Cotrocenin kentällä vuonna 1912. Peräsimeen on '
            + 'maalattu A. VLAICU Nr II, keskellä konetta näkyy potkuri ja '
            + 'moottori, ja vieressä seisoo sotilaita lippalakeissa; '
            + 'taustalla on lentokonehalleja.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Lentokone',
        },
      ],
    },
  ],
  sarajevo: [
    {
      id: 'kaupunki',
      nimi: 'Sarajevo',
      johdanto: 'Kapea jokilaakso, jossa yksi askel vie ottomaanien basaarista '
        + 'wieniläisen näköiseen kortteliin — ja jossa tornikello näyttää '
        + 'kahtatoista vasta auringon laskiessa.',
      kansikuvat: [
        {
          tiedosto: 'Sarajevo City Hall 01.jpg',
          selite: 'Vijećnica eli kaupungintalo Miljackan rannalla. '
            + 'Punavalkoraidallinen julkisivu ja kaarikäytävä ovat '
            + '1890-luvulta. Talossa toimi kansalliskirjasto, joka tuhoutui '
            + 'pommituksessa 1992; rakennus avattiin uudelleen 2014.',
          lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Coppersmith at work in Baščaršija (6086857358).jpg',
          selite: 'Kuparisepän puoti Baščaršijan basaarissa. Mies takoo pientä '
            + 'kahvipannua polvellaan, ja hyllyillä ja seinillä kiiltää '
            + 'valmiita džezvoja, tarjottimia ja kannuja.',
          lahde: 'Jennifer Boyer, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Loop Bridge 01 (23776388375).jpg',
          selite: 'Festina lente -kävelysilta Miljackan yli sumuisena päivänä. '
            + 'Sillan keskellä kaide kiertyy silmukaksi, jonka läpi '
            + 'yksinäinen kulkija juuri astuu. Nimi on latinaa ja tarkoittaa: '
            + 'kiirehdi hitaasti.',
          lahde: 'sundeviljeff, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Silta, jolta maailma muuttui',
          tiedosto: 'Latin Bridge Sarajevo summer 2010.JPG',
          teksti: 'Latinalaissillan kulmassa ammuttiin 28. kesäkuuta 1914 '
            + 'Itävalta-Unkarin kruununperijä Frans Ferdinand. Kuukautta '
            + 'myöhemmin Eurooppa oli sodassa. Sillan vieressä on nykyään '
            + 'museo, jonka ikkunasta näkee täsmälleen sen kadunkulman. Silta '
            + 'itse on paljon vanhempi kuin laukaukset: tulva vei edellisen '
            + 'sillan vuonna 1791, ja nykyinen kivisilta rakennettiin heti '
            + 'sen jälkeen. Kaarten välissä on pyöreitä aukkoja, joita '
            + 'sanotaan sillan silmiksi — ne näkyvät myös kaupungin '
            + 'sinetissä.',
          selite: 'Latinalaissilta ja matala Miljacka kesällä. Neljän kaaren '
            + 'välissä näkyvät pyöreät aukot eli sillan silmät, ja '
            + 'vastarannalla on Itävalta-Unkarin aikaisia taloja.',
          lahde: 'BiHVolim, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Sarajevon laukaukset',
        },
        {
          otsikko: 'Sevdalinka — kaupunkilaulu kaipuusta',
          tiedosto: 'Stevan Kragujevic, Nada Mamula, Tv emisija Sjelo na vrelu Bosne, 1962.jpg',
          teksti: 'Sevdalinka on Bosnian oma laulutyyli: hidas, koristeltu ja '
            + 'aina kaipuusta. Nimi tulee turkin sanasta sevda, '
            + 'rakkaudenkaipuu. Laulut ovat vanhoja kaupunkilauluja, joita '
            + 'säestettiin sazilla, pitkäkaulaisella kielisoittimella, ja '
            + 'jotka siirtyivät suullisesti sukupolvelta toiselle. Radio teki '
            + 'niistä 1900-luvulla koko maan musiikkia: Nada Mamula muutti '
            + 'Sarajevoon ja lauloi Radio Sarajevon ohjelmissa, ja '
            + 'radioarkistoihin jäi häneltä yli 150 levytystä.',
          selite: 'Nada Mamula (1927–2001) laulamassa televisio-ohjelmassa vuonna '
            + '1962. Hänellä on yllään perinteinen pitkä asu, vieressä '
            + 'soittaa haitaristi ja takana näkyvät kontrabasso ja viulu.',
          lahde: 'Stevan Kragujević, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Sevdalinka',
          musiikki: 'https://music.apple.com/fi/artist/nada-mamula/289134144',
          musiikkiNimi: 'Nada Mamula Apple Musicissa',
        },
        {
          otsikko: 'Kirja, joka piilotettiin moskeijaan',
          tiedosto: 'Gamliel.jpg',
          teksti: 'Sarajevon kansallismuseossa on käsin kirjoitettu ja maalattu '
            + 'kirja 1300-luvun puolivälistä: Sarajevon haggada. Se tehtiin '
            + 'Espanjassa, ja juutalaiset toivat sen mukanaan, kun heidät '
            + 'karkotettiin sieltä vuonna 1492. Museo osti kirjan 1894. '
            + 'Toisessa maailmansodassa kirjastonhoitaja Derviš Korkut '
            + 'kuljetti sen pois museosta ja piilotti Bjelašnica-vuoren kylän '
            + 'moskeijaan, ja 1990-luvun piirityksen ajan kirja oli pankin '
            + 'holvissa. Sivuilla on viinitahroja: sitä on luettu '
            + 'pääsiäisaterioilla.',
          selite: 'Sivu Sarajevon haggadasta. Opettaja istuu oikealla kullatulla '
            + 'penkillä, kolme kuulijaa pitelee avattuja kirjoja, ja '
            + 'yläreunassa on kultaisia heprealaisia kirjaimia sinisellä '
            + 'pohjalla.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Haggada',
        },
      ],
    },
    {
      id: 'urheilu',
      nimi: 'Talvikisat',
      johdanto: 'Helmikuussa 1984 olympiatuli paloi Sarajevossa, ja kaupungin yllä '
        + 'kohoavalle vuorelle valettiin bobirata — se on siellä yhä.',
      tehtava: {
        kysymys: 'Kuinka kauan köysiradan gondolilla kestää kaupungista '
          + 'Trebević-vuorelle?',
        vaihtoehdot: ['Kolme minuuttia', 'Puoli tuntia', 'Kaksikymmentä minuuttia', 'Yhdeksän minuuttia'],
        oikea: 3,
        fakta: 'Köysiradan gondoli nostaa matkustajan kaupungista '
          + 'Trebević-vuoren rinteelle yhdeksässä minuutissa.',
      },
      nostot: [
        {
          otsikko: 'Suomalainen voitti kaikki kolme matkaa',
          tiedosto: 'Sarajevo ZOI-84 Men\'s-Slalom Bjelasnica 1984-02-19.jpg',
          teksti: 'Talviolympialaiset pidettiin Sarajevossa 8.–19. helmikuuta '
            + '1984, ja kilpailut käytiin kaupunkia ympäröivillä vuorilla. '
            + 'Suomalainen Marja-Liisa Hämäläinen — nykyään Kirvesniemi — '
            + 'voitti kaikki kolme naisten henkilökohtaista hiihtomatkaa ja '
            + 'hiihti lisäksi viestistä pronssia. Isäntämaa Jugoslavia sai '
            + 'kisoista ensimmäisen talviolympiamitalinsa, kun Jure Franko '
            + 'tuli suurpujottelussa toiseksi.',
          selite: 'Katsojia rinteen laidalla Bjelašnica-vuorella 19. helmikuuta '
            + '1984. Alhaalla näkyy maalialue punaisine aitoineen ja lumisia '
            + 'metsiä; menossa on miesten pujottelu, jonka voitti Phil Mahre '
            + 'ja jossa hänen kaksoisveljensä Steve tuli toiseksi.',
          lahde: 'Milan Suvajac, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Talviolympialaiset 1984',
        },
        {
          otsikko: 'Bobirata jäi vuorelle',
          tiedosto: 'Sarajevo – Bob staza (2017) 2.jpg',
          teksti: 'Trebević-vuoren rinteeseen valettiin kisoja varten betoninen '
            + 'bobi- ja kelkkarata, joka valmistui syyskuussa 1982. Kisoissa '
            + 'sitä tuli katsomaan 30 000 ihmistä. Bosnian sodassa rata '
            + 'vaurioitui, ja sen jälkeen sinne kiipesivät vain pyöräilijät '
            + 'ja graffitimaalarit. Nyt kaarteet ovat maalauksia täynnä ja '
            + 'radalle pääsee kävelemään: Trebevićille nousee köysirata, '
            + 'jonka gondoli vie kaupungista vuorelle yhdeksässä minuutissa.',
          selite: 'Olympiaradan kaarre Trebevićillä. Betonikouru mutkittelee '
            + 'mäntyjen välissä, kaarteen reunus on maalattu graffiteilla, ja '
            + 'radan yllä törröttävät vanhat kannatinpalkit.',
          lahde: 'Julian Nyča, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Rattikelkkailu',
        },
      ],
    },
  ],
  odessa: [
    {
      id: 'kaupunki',
      nimi: 'Odessa',
      johdanto: 'Kaupunki on louhittu omasta alustaan, sen pääkatu on nimetty '
        + 'Napolissa syntyneen amiraalin mukaan, ja aprillipäivänä kadut '
        + 'täyttyvät naamiaisväestä.',
      kansikuvat: [
        {
          tiedosto: 'Potemkin stairs, Odessa.jpg',
          selite: 'Potjomkinin portaat alhaalta katsottuna: leveä kiviporras '
            + 'nousee puurivien välissä kaupunkiin, ja portaita kiipeävät '
            + 'ihmiset näyttävät pieniltä. Askelmia on 192.',
          lahde: 'DIMSFIKAS, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Vorontsov Lighthouse 2017 G1.jpg',
          selite: 'Vorontsovin majakka sataman aallonmurtajalla: valkoinen 27 '
            + 'metrin torni ja sen päässä punainen lyhtyhuone. Valo välähtää '
            + 'kolme pitkää — morseaakkosten O niin kuin Odessa.',
          lahde: 'George Chernilevsky, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'Lion odessa city park.jpg',
          selite: 'Kaupunginpuiston pronssileijona vaalealla jalustallaan, '
            + 'käpälän alla saalis. Leijona ja sen pari ovat ranskalaisen '
            + 'Auguste Cainin työtä vuodelta 1854, ja kyljissä näkyy yhä '
            + 'luodinjälkiä sodan ajoilta.',
          lahde: 'HOBOPOCC, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Kaupunki seisoo oman louhoksensa päällä',
          tiedosto: 'Odessa Catacombs 01.jpg',
          teksti: 'Odessan talot on rakennettu simpukkakalkkikivestä, jota '
            + 'louhittiin suoraan kaupungin alta. Käytäviä kertyi arviolta 2 '
            + '500 kilometriä — enemmän kuin minkään muun kaupungin alle '
            + 'maailmassa — ja syvimmillään ne ulottuvat 60 metriä '
            + 'merenpinnan alapuolelle. Louhoksia on käytävistä 95 '
            + 'prosenttia, eikä koko verkostoa ole koskaan kartoitettu. '
            + 'Toisen maailmansodan aikana käytävissä piileskeli '
            + 'partisaaneja, jotka nousivat maan alta ja katosivat takaisin.',
          selite: 'Katakombien käytävä. Seinissä näkyvät sahanjäljet: kalkkikivi '
            + 'leikattiin suorakulmaisiksi lohkoiksi ja nostettiin ylös '
            + 'talojen seiniksi.',
          lahde: 'Vi Ko, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Katakombi',
        },
        {
          otsikko: 'Perustaja tuli Napolista',
          tiedosto: '29 Odessa de Ribas monument.jpg',
          teksti: 'Odessan perusti sotilas nimeltä José de Ribas. Hän syntyi '
            + 'Napolissa espanjalaisen konsulin poikana, siirtyi Venäjän '
            + 'palvelukseen ja valtasi vuonna 1789 Hadžibein turkkilaisen '
            + 'linnakkeen — koko taistelu kesti puoli tuntia. Rauhan tultua '
            + 'de Ribas ehdotti keisarinna Katariina II:lle, että samalle '
            + 'rantatörmälle rakennettaisiin satama. Käsky annettiin 27. '
            + 'toukokuuta 1794, ja siitä lasketaan kaupungin ikä. Vilkkain '
            + 'kävelykatu on yhä Derybasivska eli de Ribasin katu.',
          selite: 'Pronssinen de Ribas jalustallaan Derybasivska-kadun päässä: '
            + 'kolmikolkkahattu päässä, kaupungin kartta kädessä ja jalka '
            + 'lapion terällä.',
          lahde: 'Kojote, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Katariina Suuri',
        },
        {
          otsikko: 'Oopperataloa jäähdytettiin jäällä',
          tiedosto: 'Front view of Odessa opera theater.jpg',
          teksti: 'Odessan oopperatalo avattiin lokakuussa 1887, kun edellinen '
            + 'teatteri oli palanut poroksi. Kesähelteellä salia '
            + 'viilennettiin jäällä: kuormat laskettiin yli kymmenen metriä '
            + 'syvään kuiluun, jää kannettiin tunnelia pitkin katsomon alle, '
            + 'ja kylmä ilma nousi ritilöistä penkkien alta. Talo oli myös '
            + 'ensimmäinen rakennus Odessassa, johon asennettiin sähkövalot. '
            + 'Maapohja sen alla liikkuu, joten halkeamia on paikattu '
            + 'käytännössä avajaisista asti.',
          selite: 'Oopperatalon julkisivu iltapäivän valossa. Katolla seisoo '
            + 'veistosryhmiä, sisäänkäynnin kaaren molemmin puolin kaksi '
            + 'valkoista patsasta ja edessä rivi vanhanmallisia katulyhtyjä.',
          lahde: 'Assedo, Wikimedia Commons (PD)',
          wiki: 'Odessan kansallinen akateeminen ooppera- ja balettiteatteri',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Torilla hinta on keskustelu eikä lappu, ja kerran vuodessa koko '
        + 'kaupunki pukeutuu naamiaisasuun.',
      tehtava: {
        kysymys: 'Mitä odessalainen forshmak on?',
        vaihtoehdot: ['Paksu kalakeitto', 'Juutalainen sillitahna', 'Suolakurkkujen liemi', 'Makea unikonsiemenpiirakka'],
        oikea: 1,
        fakta: 'Forshmak on Odessan juutalaisesta keittiöstä tullutta '
          + 'sillitahnaa, jota myydään Privozin tiskeillä.',
      },
      nostot: [
        {
          otsikko: 'Privozilla hinta on keskustelu',
          tiedosto: 'At the Privoz Market in Odessa.jpg',
          teksti: 'Privoz alkoi vuonna 1827 hevoskärryjen takalaidoilta ja on yhä '
            + 'Odessan suurin ruokatori. Kauppa käydään ääneen: myyjä sanoo '
            + 'hinnan, ostaja nauraa, ja lopullinen summa jää jonnekin siltä '
            + 'väliltä. Tiskeillä on suolattua silliä, mustanmeren kalaa ja '
            + 'forshmakia — sillitahnaa, joka tuli kaupungin juutalaisesta '
            + 'keittiöstä. Tinkiminen ei ole täällä epäkohteliasta vaan osa '
            + 'kaupantekoa.',
          selite: 'Privozin valmisruokatiski: säilöttyjä punajuuria, merilevää, '
            + 'sieniä ja täytettyjä paprikoita rasioissa, kauhat valmiina '
            + 'rivissä.',
          lahde: 'jmv, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Odessa',
        },
        {
          otsikko: 'Aprillipäivänä kaupunki pukeutuu naamiaisiin',
          tiedosto: 'Yumorina, Odessa (Юморина) (33530257270).jpg',
          teksti: 'Odessalaiset ovat ylpeitä huumoristaan, ja aprillipäivänä '
            + 'siitä tulee koko kaupungin juhla. Humorina keksittiin vuonna '
            + '1972, kun suosittu televisiosta tuttu pilailukilpailu '
            + 'lakkautettiin ja odessalainen joukkue päätti järjestää oman '
            + 'naurun päivänsä. Ensimmäinen juhla vietettiin 1973. Väkeä tuli '
            + 'lopulta niin paljon, että viranomaiset kielsivät koko jutun, '
            + 'mutta 1990-luvulla se palasi. Kulkueessa marssivat vuodesta '
            + 'toiseen myös Darth Vader ja avaruussotilaat.',
          selite: 'Naamiaisväkeä Humorinan kulkueessa: mustaan viittaan '
            + 'pukeutunut hahmo keppeineen, punaiseen pukuun ja mustaan '
            + 'naamariin sonnustautunut nainen, merimieslakkinen mies '
            + 'maalatuin kasvoin, hevospuku ja iso mehiläinen.',
          lahde: 'Cebanu Ghenadie, Wikimedia Commons (CC0)',
          wiki: 'Aprillipäivä',
        },
      ],
    },
  ],
  dubai: [
    {
      id: 'kaupunki',
      nimi: 'Dubai',
      johdanto: 'Sata vuotta sitten täällä oli lahti, jonka rannalla sukellettiin '
        + 'helmiä. Nyt samasta paikasta nousee maailman korkein torni — ja '
        + 'kultaa myydään kiloittain kadun varressa.',
      kansikuvat: [
        {
          tiedosto: 'Sheikh Zayed Road Skyline from Satwa on 16 May 2007.jpg',
          selite: 'Sheikh Zayed Roadin pilvenpiirtäjät kohoavat matalien kattojen '
            + 'takaa. Etualan katoilla on vesisäiliöitä ja '
            + 'satelliittiantenneja — vanha ja uusi kaupunki ovat korttelin '
            + 'päässä toisistaan.',
          lahde: 'Imre Solt, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'People riding camels on Dubai Dunes.jpg',
          selite: 'Kameliratsastajia hiekkasärkän harjalla auringonlaskun '
            + 'keltaisessa valossa. Kaupungin laidalta pääsee aavikolle '
            + 'puolessa tunnissa.',
          lahde: 'iMahesh, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Dubai Gold Souk on 31 May 2007 Pict 1.jpg',
          selite: 'Deiran kultatorin katettu kuja. Näyteikkunat ovat täynnä '
            + 'kaulakoruja, ja katossa kulkee puinen ristikko, joka pitää '
            + 'auringon ulkona.',
          lahde: 'Imre Solt, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          /*
           * Sukellustekniikka (nenäpuristin, kivipaino, kesäkuu–syyskuu,
           * japanilainen viljelty helmi) kerrottiin ennen tässä lähes
           * samoin sanoin kuin Bahrainin helmet-sivulla JA Dubain
           * kohdekartan esittelyssä. Bahrain omistaa aiheen kokonaisella
           * sivulla, joten tämä nosto kertoo 12.8.2026 alkaen itse
           * kuvasta: siitä, miten Euroopan lukija näki lahden.
           *
           * Kuva on 829 px leveä eli alle nykysäännön, mutta se on
           * lehden aihe eikä kuvitus — samaa kaiverrusta ei ole
           * Commonsissa suurempana.
           */
          otsikko: 'Näin Lontoo näki helmenpyynnin',
          tiedosto: 'The Pearl Fishery in the Persian Gulf - The Graphic 1881.jpg',
          teksti: 'Ennen öljyä lahden ranta eli helmistä, ja Euroopassa '
            + 'siitä tiedettiin sen verran kuin kuvalehdet kertoivat. '
            + 'Lontoolainen The Graphic julkaisi 1. lokakuuta 1881 koko '
            + 'sivun kaiverruksen, joka on jaettu neljään numeroituun '
            + 'osaan: sukeltaja, ankkurissa odottava veneistö, sukeltajat '
            + 'työssä pohjassa ja välineet omana piirroksenaan. Lehti '
            + 'kutsui pikkuveneiden joukkoa hyttyslaivastoksi. Piirtäjää '
            + 'ei tiedetä, eikä hän luultavasti ollut paikalla: kuva on '
            + 'tehty matkakertomusten mukaan, ja siksi se kertoo yhtä '
            + 'paljon lukijoistaan kuin lahdesta.',
          selite: 'The Graphicin kaiverrus vuodelta 1881: purjeveneitä '
            + 'ankkurissa, sukeltajia menossa alas ja pohjassa työssä. '
            + 'Reunakuvissa näkyy sukeltajan nenäpuristin ja '
            + 'simpukkakori.',
          lahde: 'Tuntematon kaivertaja, Wikimedia Commons (public domain)',
        },
        {
          otsikko: 'Metrossa ei ole kuljettajaa',
          tiedosto: 'Dubai metro rail & station.JPG',
          teksti: 'Dubain metro avattiin 9. syyskuuta 2009, ja se kulkee ilman '
            + 'kuljettajaa: junat ohjautuvat tietokoneella, ja etuikkunasta '
            + 'näkee suoraan radalle. Asemat ovat ilmastoituja ja '
            + 'lasiseinäisiä, koska ulkona on kesällä yli neljäkymmentä '
            + 'astetta. Rata kulkee suurimmaksi osaksi katujen yläpuolella '
            + 'pilareilla. Ensimmäisessä vaunussa on osa, johon saavat mennä '
            + 'vain naiset ja lapset, ja väärästä vaunusta saa sakon.',
          selite: 'Metrojuna saapuu asemalle korkealla kaupungin yllä. Laiturin '
            + 'lasiseinä on kiinni, ja radan molemmin puolin näkyy kaupunki.',
          lahde: 'Shahroozporia, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Dubain metro',
        },
        {
          otsikko: 'Kulta myydään painon mukaan',
          tiedosto: 'Dubai Gold Souk-Dubai UAE-Andres Larin.jpg',
          teksti: 'Deiran kultatorilla on satoja liikkeitä samassa katetussa '
            + 'kujassa. Koru punnitaan asiakkaan edessä, ja hinta lasketaan '
            + 'päivän kultakurssista plus työn osuus — samasta kaulakorusta '
            + 'maksetaan eri hinta eri päivinä. Torilla on ollut esillä '
            + 'maailman painavin sormus: se painoi lähes kuusikymmentä kiloa, '
            + 'eikä sitä voinut pitää sormessa vaan vitriinissä. '
            + 'Kaupankäynnissä tinkiminen kuuluu asiaan.',
          selite: 'Kultakaupan näyteikkuna täynnä kaulakoruja ja rannerenkaita. '
            + 'Korut on ripustettu riveihin niin tiheästi, että ikkuna hohtaa '
            + 'keltaisena.',
          lahde: 'Saaremees, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'rakennukset',
      nimi: 'Rakennukset',
      johdanto: 'Dubaissa rakennetaan sitä, mitä ei ole: torni joka on korkeampi '
        + 'kuin mikään ennen, saari jota ei ollut kartalla, ja juomavesi, '
        + 'joka tehdään merestä.',
      tehtava: {
        kysymys: 'Kuinka korkea Burj Khalifa on?',
        vaihtoehdot: [
          '282 metriä',
          '828 metriä',
          '1 828 metriä',
          '88 metriä',
        ],
        oikea: 1,
        fakta: 'Torni piti maailmanennätystä heti valmistuttuaan, eikä sitä ole '
          + 'vieläkään ohitettu.',
      },
      nostot: [
        {
          otsikko: 'Torni, jonka huipulla paastotaan pidempään',
          tiedosto: 'Burj Khalifa (16260269606).jpg',
          teksti: 'Burj Khalifa valmistui vuonna 2010, ja se on 828 metriä korkea '
            + '— yli puolitoista kertaa aiempaa ennätystä korkeampi. '
            + 'Kerroksia on 163. Torni on niin korkea, että sen huipulla '
            + 'aurinko laskee pari minuuttia myöhemmin kuin katutasossa. '
            + 'Ramadanin aikana se otettiin huomioon virallisesti: ylimmissä '
            + 'kerroksissa paastotaan hetken pidempään kuin alhaalla. '
            + 'Rakennuksen muoto kapenee portaittain, jotta tuuli ei saisi '
            + 'siitä otetta.',
          selite: 'Burj Khalifa kohoaa muiden pilvenpiirtäjien yli kirkkaassa '
            + 'auringonpaisteessa. Torni kapenee portaittain ja päättyy '
            + 'ohueen piikkiin.',
          lahde: 'Laika ac, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Burj Khalifa',
        },
        {
          otsikko: 'Saari, joka on merenpohjaa',
          tiedosto: 'Palm Jumeirah on 8 May 2008 Pict 1.jpg',
          teksti: 'Palm Jumeirah rakennettiin 2000-luvun alussa keinotekoisesti '
            + 'mereen palmun muotoon: runko, seitsemäntoista lehteä ja '
            + 'kaareva aallonmurtaja ympärillä. Materiaali ruopattiin '
            + 'merenpohjasta — hiekkaa ja kiveä, ei betonia. Rantaviivaa '
            + 'saari lisäsi kymmeniä kilometrejä, ja se erottuu avaruudesta '
            + 'otetuissa kuvissa. Hiekka tiivistettiin täryttämällä, jotta se '
            + 'kestäisi rakennukset, ja aallonmurtajaan ladottiin miljoonia '
            + 'tonneja louhittua kiveä.',
          selite: 'Ilmakuva Palm Jumeirahin lehdistä: kapeita hiekkakaistoja '
            + 'turkoosissa vedessä, ja jokaisella talorivi ja oma ranta.',
          lahde: 'Imre Solt, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Palm Jumeirah',
        },
        {
          otsikko: 'Juomavesi tehdään merestä',
          tiedosto: 'Multi Stage Flash Desalination Plant at Jebel Ali G Station.jpg',
          teksti: 'Emiraateissa sataa muutamana päivänä vuodessa eikä siellä ole '
            + 'yhtään pysyvää jokea, joten lähes kaikki hanavesi tehdään '
            + 'merivedestä. Jebel Alin laitos on maailman suurimpia: merivesi '
            + 'kuumennetaan, höyry kerätään talteen ja tiivistetään puhtaaksi '
            + 'vedeksi, ja suola jää jäljelle. Työ vie paljon energiaa, ja '
            + 'jäljelle jäävä väkevä suolaliuos palautetaan mereen — se '
            + 'lämmittää ja suolaa lahtea, mikä on alueen isoja '
            + 'ympäristökysymyksiä.',
          selite: 'Merivedenpuhdistamon putkistoa ja säiliöitä meren rannalla. '
            + 'Sinisiksi maalatut putket kulkevat pitkin rakennuksen kylkeä.',
          lahde: 'Starsend, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
    },
  ],
  tromssa: [
    {
      id: 'kaupunki',
      nimi: 'Tromssa',
      johdanto: 'Kaupunki napapiirin pohjoispuolella: aurinko katoaa kahdeksi '
        + 'kuukaudeksi, turska tulee itse rannikolle, ja pimeimpään aikaan '
        + 'tehtiin kellareissa musiikkia, joka kuultiin maailmalla.',
      kansikuvat: [
        {
          tiedosto: 'Aurora Borealis Tromsø Norway.jpg',
          selite: 'Revontulet kaartuvat vihreinä lumisten tunturien yllä Tromssan '
            + 'lähellä. Etualalla on koivuja ja hankea, ja pilvien raosta '
            + 'näkyy tähtiä.',
          lahde: 'Andi Gentsch, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          tiedosto: '09512 Tromsdalen church and bridge - Tromso, Norway - V-P.jpg',
          selite: 'Tromssan silta kaartaa salmen yli kirkkaana kesäpäivänä. '
            + 'Vastarannalla nousee lumihuippuinen tunturi, ja rannassa näkyy '
            + 'kaupungin taloja.',
          lahde: 'Virtual-Pano, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Tromsø Hurtigruten Trollfjord 01.jpg',
          selite: 'Hurtigrutenin laiva Trollfjord Tromssan laiturissa. Laiva on '
            + 'poikennut samaa rannikkoreittiä vuodesta 1893, ja se tuo yhä '
            + 'matkustajien lisäksi rahtia.',
          lahde: 'Ad Meskens, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Syntikat soivat kaamoksen läpi',
          tiedosto: 'Röyksopp - Glastonbury Festival 2005 crop.jpg',
          teksti: 'Tromssassa alettiin 1980-luvulla tehdä elektronista musiikkia '
            + 'kellareissa silloin, kun ulkona oli pimeää. Kaupungissa '
            + 'perustettiin Bel Canto vuonna 1985, samasta porukasta tuli '
            + 'Biosphere, ja lapsuudenystävät Svein Berge ja Torbjørn '
            + 'Brundtland perustivat Röyksoppin 1998. Pieni kaupunki kuuluu '
            + 'yhä maailman festivaaleilla.',
          selite: 'Röyksopp Glastonburyn festivaalilla 2005: kaksi miestä, pino '
            + 'Korgin syntetisaattoreita ja valotaulu. Duon kotikaupunki on '
            + 'noin 350 kilometriä napapiiristä pohjoiseen.',
          lahde: 'Beyond My Ken (talk), Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Röyksopp',
        },
        {
          otsikko: 'Turska, joka tulee itse käymään',
          tiedosto: 'Tørrfisk.jpg',
          teksti: 'Skrei on turska, joka ui joka talvi Barentsinmereltä Norjan '
            + 'rannikolle kutemaan. Osa syödään heti mølje-ateriana: kalaa, '
            + 'mätiä, maksaa ja perunaa. Osa ripustetaan telineille '
            + 'helmikuussa, kun maassa on vielä lunta ja kärpäset nukkuvat. '
            + 'Kolmessa kuukaudessa kalasta haihtuu noin 70 prosenttia '
            + 'vedestä, ja sen jälkeen se säilyy vuosia.',
          selite: 'Kapakalatelineitä Moskenesissä Lofooteilla. Samanlaisia '
            + 'telineitä on pitkin Pohjois-Norjan rannikkoa. Suurin osa '
            + 'valmiista kalasta viedään Italiaan, missä se liotetaan viikon '
            + 'ajan ennen ruoanlaittoa.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Kapakala',
        },
        {
          otsikko: 'Aurinkopäivä on 21. tammikuuta',
          tiedosto: 'Ishavskatedralen Tromsø.jpg',
          teksti: 'Tromssassa aurinko pysyy horisontin alapuolella marraskuun '
            + 'lopusta tammikuun puoliväliin. Kaupungin eteläpuoliset vuoret '
            + 'peittävät sen vielä pari viikkoa, joten aurinko nähdään vasta '
            + '21. tammikuuta. Se päivä juhlitaan: kouluissa ja päiväkodeissa '
            + 'syödään aurinkopullia ja appelsiineja. Kesällä aurinko ei '
            + 'laske toukokuun puolivälistä heinäkuun loppuun.',
          selite: 'Jäämeren katedraali eli Tromsdalenin kirkko tapaninpäivänä '
            + 'kello 14.50. Keskellä kaamosta taivas on tunnin tai kaksi '
            + 'juuri näin sininen — se on päivän valoisin hetki.',
          lahde: 'Harald Groven, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Kaamos',
        },
      ],
    },
    {
      id: 'valo',
      nimi: 'Valo',
      johdanto: 'Napapiirin pohjoispuolella valo ei tule ja mene päivittäin vaan '
        + 'vuodenajoittain — ja juuri siksi tästä kaupungista tuli paikka, '
        + 'jossa taivasta tutkitaan.',
      tehtava: {
        kysymys: 'Mistä Kristian Birkeland päätteli revontulien syntyvän?',
        vaihtoehdot: [
          'Auringosta tulevat hiukkaset',
          'Kaukaiset ukkosmyrskyt jäältä',
          'Kuun heijastus lumesta',
          'Jään kimallus ilmassa',
        ],
        oikea: 0,
        fakta: 'Moni ei uskonut häntä ennen kuin satelliitit todistivat asian '
          + '1960-luvulla.',
      },
      nostot: [
        {
          otsikko: 'Kesällä aurinko ei laske ollenkaan',
          tiedosto: 'Midnattssol-fra-Fjellheisen.gif',
          teksti: 'Toukokuun 20. päivästä heinäkuun 22. päivään aurinko ei käy '
            + 'Tromssassa horisontin alapuolella lainkaan. Se kiertää '
            + 'taivasta ympäri ja on yölläkin ylhäällä, joten kello ei kerro '
            + 'mitään valosta. Ihmiset tekevät töitä puutarhassa keskiyöllä, '
            + 'ja lapset kysyvät, milloin on ilta. Monessa ikkunassa on '
            + 'pimennysverho. Kaupungissa järjestetään keskiyön aurinkoon '
            + 'ajoitettuja konsertteja ja maratonjuoksu, joka lähtee vasta '
            + 'puoli yhdeltätoista illalla.',
          selite: 'Keskiyön aurinko matalalla Tromssan yllä vuorelta nähtynä. '
            + 'Valo on oranssi, salmi hohtaa ja silta erottuu tummana kaarena '
            + 'veden päällä.',
          lahde: 'Osopolar, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Taivasta tutkittiin ensin vuoren huipulla',
          tiedosto: 'The simple northern lights observatory at Haldetoppen.jpg',
          teksti: 'Fyysikko Kristian Birkeland halusi selvittää, mistä revontulet '
            + 'syntyvät, ja rakensi vuonna 1899 havaintoaseman tunturin '
            + 'huipulle Pohjois-Norjaan. Hän talvehti siellä apulaistensa '
            + 'kanssa mittaamassa magneettikenttää pakkasessa ja myrskyssä. '
            + 'Birkeland päätteli oikein, että syynä ovat auringosta '
            + 'sinkoutuvat sähköiset hiukkaset, jotka törmäävät ilmakehän '
            + 'kaasuihin. Moni ei uskonut sitä ennen kuin satelliitit '
            + 'todistivat asian vasta 1960-luvulla.',
          selite: 'Vanha valokuva kivestä muuratusta havaintoasemasta paljaan '
            + 'tunturin huipulla. Katolla liehuu Norjan lippu ja seinistä '
            + 'lähtee harusvaijereita.',
          lahde: 'Kristian Birkeland, Wikimedia Commons (public domain)',
          wiki: 'Kristian Birkeland',
        },
        {
          otsikko: 'Pohjoisin yliopisto maailmassa',
          tiedosto: 'University of Tromsø Breivika campus.JPG',
          teksti: 'Tromssan yliopisto perustettiin 1968 ja aloitti opetuksen '
            + '1972. Se on maailman pohjoisin yliopisto, ja sen erikoisalat '
            + 'seuraavat sijaintia: revontulet, merentutkimus, arktinen '
            + 'lääketiede ja saamen kieli. Revontuliobservatorio perustettiin '
            + 'kaupunkiin jo 1928, ja sen mittaussarja on maailman pisimpiä. '
            + 'Kaupunki on pieni mutta täynnä tutkijoita, ja opiskelijoita '
            + 'tulee kymmenistä maista — moni jää talveksi juuri nähdäkseen '
            + 'pimeän ajan.',
          selite: 'Tromssan yliopiston kampus Breivikassa syksyllä. Matalia '
            + 'tiilirakennuksia nurmikentän takana, edessä hiekkatie ja '
            + 'koivuja.',
          lahde: 'Edricson, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
    },
  ],
  islanti: [
    {
      id: 'kaupunki',
      nimi: 'Islanti',
      johdanto: 'Saari, jossa käräjät pidettiin kahden mantereen välissä, kieli ei '
        + 'ole muuttunut tuhanteen vuoteen ja kirjoja julkaistaan enemmän '
        + 'asukasta kohti kuin missään muualla.',
      kansikuvat: [
        {
          tiedosto: 'Gullfoss, Suðurland, Islandia, 2014-08-16, DD 119.JPG',
          selite: 'Gullfossin putous syöksyy kahdessa portaassa kapeaan rotkoon. '
            + 'Vesipölyyn on noussut sateenkaari, ja reunoilla on ruskeaa '
            + 'sammalta.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'View of Reykjavík from Hallgrímskirkja, 20230507 1229 5733.jpg',
          selite: 'Reykjavík kirkontornista nähtynä: värikkäitä peltikattoja '
            + 'tiiviisti vierekkäin, takana satama ja meren takana '
            + 'lumihuippuinen vuori.',
          lahde: 'Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Reynisfjara and Reynisdrangar, Iceland.jpg',
          selite: 'Reynisfjaran musta hiekkaranta ja siitä merestä nousevat '
            + 'basalttipilarit. Aallot lyövät rantaan valkoisina vaahtoina.',
          lahde: 'Martin Falbisoner, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Käräjät kahden mantereen välissä',
          tiedosto: 'Almannagjá Gorge, Þingvellir National Park, Iceland.jpg',
          teksti: 'Þingvellirissä islantilaiset kokoontuivat käräjille vuodesta '
            + '930 alkaen: lait luettiin ääneen kalliolta, koska niitä ei '
            + 'ollut kirjoitettu mihinkään. Paikka sattuu olemaan kohdassa, '
            + 'jossa Pohjois-Amerikan ja Euraasian mannerlaatat erkanevat — '
            + 'rotko levenee pari senttiä vuodessa.',
          selite: 'Almannagjá, Þingvellirin suurin repeämä. Kalliolta lainlukija '
            + 'esitti kolmasosan laeista joka vuosi, jotta koko lakikokoelma '
            + 'tuli luetuksi kolmen vuoden välein.',
          lahde: 'Marine SABRES, Wikimedia Commons (CC BY 4.0)',
          wiki: 'Þingvellir',
        },
        {
          otsikko: 'Kieli, joka ei liikkunut',
          tiedosto: 'GKS 1005 fol., 0005v - 15 (cropped).jpg',
          teksti: 'Islannin kieli on muuttunut niin vähän, että koululainen voi '
            + 'lukea 1200-luvun saagoja alkukielellä. Uusille asioille ei '
            + 'lainata sanoja vaan tehdään omat: tietokone on tölva, "lukujen '
            + 'ennustaja", ja kaikille islantilaisille tuttu sana yhtä '
            + 'lailla.',
          selite: 'Aukeama Flateyjarbókista, Islannin suurimmasta keskiaikaisesta '
            + 'käsikirjoituksesta (1387–1394). Se sisältää Norjan kuninkaiden '
            + 'saagoja ja kertomuksen Vinlandin löytämisestä.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Flateyjarbók',
        },
        {
          otsikko: 'Björk ja pieni maa, joka soi',
          tiedosto: 'BjörkCoachella.jpg',
          teksti: 'Islannissa asuu vähemmän ihmisiä kuin monessa suomalaisessa '
            + 'maakunnassa, mutta musiikkia tulee ulos kuin suurmaasta. Björk '
            + 'aloitti kotimaassaan jo lapsitähtenä ja löi läpi maailmalla '
            + '1990-luvulla; hänen jälkeensä tulivat muun muassa Sigur Rós ja '
            + 'Of Monsters and Men.',
          selite: 'Björk esiintymässä. Hän on levyttänyt sekä islanniksi että '
            + 'englanniksi ja tehnyt yhteistyötä muusikoiden ja '
            + 'kuvataiteilijoiden kanssa ympäri maailman.',
          lahde: 'Paul Familetti, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Björk',
        },
      ],
    },
    {
      id: 'kirjat',
      nimi: 'Kirjat',
      johdanto: 'Islannissa lukeminen ei ole harrastus vaan tapa: kirjat annetaan '
        + 'lahjaksi samana iltana, vanhat käsikirjoitukset otettiin vastaan '
        + 'kuin kuninkaat, ja pienestä maasta tuli Nobel-palkittu.',
      tehtava: {
        kysymys: 'Milloin islantilaiset avaavat kirjalahjansa?',
        vaihtoehdot: [
          'Uudenvuodenaattona',
          'Jouluaattona',
          'Juhannuksena',
          'Loppiaisena',
        ],
        oikea: 1,
        fakta: 'Sama ilta jatkuu lukemisella — moni menee sänkyyn kirjan kanssa '
          + 'jo heti.',
      },
      nostot: [
        {
          otsikko: 'Joulun kirjatulva',
          tiedosto: 'Man in bookshop of Reykjavík (749038732).jpg',
          teksti: 'Islannissa suurin osa vuoden kirjoista ilmestyy syksyllä, ja '
            + 'marraskuussa joka kotiin jaetaan luettelo, jossa ne kaikki '
            + 'ovat. Ilmiötä sanotaan nimellä jólabókaflóð, joulun '
            + 'kirjatulva. Kirja on tavallisin joululahja, ja se avataan '
            + 'jouluaattona — moni jää samana iltana lukemaan sängyssä '
            + 'suklaan kanssa. Asukasta kohti Islannissa julkaistaan enemmän '
            + 'kirjoja kuin missään muussa maassa, ja sanotaan että joka '
            + 'kymmenes islantilainen julkaisee elämänsä aikana kirjan.',
          selite: 'Mies seisoo reykjavíkilaisen kirjakaupan hyllyjen edessä. '
            + 'Hyllyt ovat lattiasta kattoon täynnä kirjoja, ja niiden '
            + 'reunoissa on hintakylttejä.',
          lahde: 'Helgi Halldórsson, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          otsikko: 'Käsikirjoitukset tuotiin takaisin laivalla',
          tiedosto: 'Dividing a whale, from a manuscript from the 16th century.jpg',
          teksti: 'Keskiaikaiset islantilaiset käsikirjoitukset vietiin 1600- ja '
            + '1700-luvuilla Tanskaan tutkittaviksi, ja ne jäivät sinne '
            + 'kahdeksi vuosisadaksi. Kun Islanti pyysi niitä takaisin, '
            + 'syntyi pitkä kiista — Tanskan yliopistot vastustivat. Lopulta '
            + 'ensimmäiset niteet palasivat 21. huhtikuuta 1971 laivalla, '
            + 'jota oli vastassa satamassa väkijoukko ja televisiokamerat. '
            + 'Koulut pidettiin kiinni, jotta lapset pääsivät katsomaan. '
            + 'Palautus jatkui vuosikymmeniä.',
          selite: 'Sivu 1500-luvun islantilaisesta käsikirjoituksesta. Tekstin '
            + 'alla on piirros, jossa ihmiset paloittelevat valasta rannalla '
            + 'ja hevonen kantaa koria.',
          lahde: 'Tuntematon kirjuri, Wikimedia Commons (public domain)',
        },
        {
          otsikko: 'Pieni maa sai Nobelin',
          tiedosto: 'Halldór Kiljan Laxness 1955.jpg',
          teksti: 'Halldór Laxness sai kirjallisuuden Nobelin vuonna 1955. Hänen '
            + 'kirjansa kertovat tavallisista islantilaisista: lampaista, '
            + 'sitkeydestä ja köyhyydestä, mutta niin että lukija nauraa ja '
            + 'liikuttuu samaan aikaan. Tunnetuin on Sallittu ihminen eli '
            + 'Sjálfstætt fólk, tarina lampuriperheestä, joka ei suostu '
            + 'ottamaan apua keneltäkään. Kun palkinto tuli, maassa oli alle '
            + 'sataseitsemänkymmentätuhatta asukasta — pienin maa, josta '
            + 'kirjallisuuden Nobel oli siihen asti tullut.',
          selite: 'Mustavalkoinen muotokuva Halldór Laxnessista vuodelta 1955. '
            + 'Kirjailija katsoo sivulle, hiukset kammattuna taakse ja puvun '
            + 'kaulus auki.',
          lahde: 'Nobel-säätiö, Wikimedia Commons (public domain)',
          wiki: 'Halldór Laxness',
        },
      ],
    },
  ],
  lappi: [
    {
      id: 'kaupunki',
      nimi: 'Lappi',
      johdanto: 'Alue, jossa laulu ei kerro kohteestaan vaan on se, ruoka valmistuu '
        + 'jäisestä lihasta, ja kieltä puhutaan vain täällä.',
      kansikuvat: [
        {
          tiedosto: 'Gentle but wide green aurora display over Levi, Kittilä, Lapland, Finland, 2023 September - 2.jpg',
          selite: 'Revontulet leviävät vihreinä juovina tunturin yllä Kittilässä. '
            + 'Alhaalla erottuu matalaa männikköä ja jäkäläpeitteistä maata.',
          lahde: 'Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Betula pubescens czerepanovii in autumn colors on the lower peak of Sallatunturit in Salla, Lapland, Finland.jpg',
          selite: 'Tunturikoivu hehkuu oranssina ruskan aikaan Sallassa. Takana '
            + 'aukeaa metsäinen laakso ja seuraavat tunturit.',
          lahde: 'Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Reindeer farm, Inari, Suomi - Finland 2013-03-10 f.jpg',
          selite: 'Poroja valjaissa ahkioiden edessä Inarissa. Aidan takana '
            + 'odottaa jono rekiä, ja tienvarressa on kolmion muotoinen '
            + 'porovaroituskyltti.',
          lahde: 'Manfred Werner, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Joikua ei lauleta jostakusta',
          tiedosto: 'Wimme Saari.jpg',
          teksti: 'Joiku on saamelaisten vanha laulutapa: ihmiselle, paikalle tai '
            + 'eläimelle tehdään oma sävelmä. Ihmisestä ei lauleta — hänet '
            + 'joikataan, ja valmis joiku on kuin toinen nimi. Sitä ei enää '
            + 'muuteta, ja se voi periytyä suvussa. Kirkko piti joikaamista '
            + 'syntinä, ja vielä 1950-luvulla se oli kielletty '
            + 'saamelaisalueen kouluissa.',
          selite: 'Wimme Saari joikaa Etno-Espan lavalla Helsingissä elokuussa '
            + '2006. Yllään hänellä on gákti eli saamenpuku. Joikaaja tulee '
            + 'toimeen ilman soittimia: sävel muuntuu kurkunpään lihaksilla.',
          lahde: 'Tomisti, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Joiku',
        },
        {
          otsikko: 'Käristys tehdään jäisestä lihasta',
          tiedosto: 'Poronkäristys.jpg',
          teksti: 'Poronkäristykseen liha höylätään jäätyneenä ohuiksi lastuiksi, '
            + 'kuullotetaan rasvassa ja haudutetaan pehmeäksi. Seuraksi tulee '
            + 'perunamuusia ja puolukkaa. Porot laiduntavat vapaina: '
            + 'poronhoitoalue on 122 936 neliökilometriä eli 36 prosenttia '
            + 'Suomen maapinta-alasta, ja suurin sallittu poromäärä on ollut '
            + '203 700 eloporoa.',
          selite: 'Poronkäristystä perunamuusin, puolukan ja suolakurkun kanssa '
            + 'Muonion Jeriksellä. Liha on porosta, joka on ollut ulkona koko '
            + 'elämänsä — siksi lastut ovat tummia ja lähes rasvattomia.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Poronkäristys',
        },
        {
          otsikko: 'Kieli, jota puhutaan vain Suomessa',
          tiedosto: 'Sajos sign OCT2022 IMG 4712a.jpg',
          teksti: 'Inarinsaamea puhutaan ainoastaan Inarijärven ympärillä. '
            + '1990-luvun puolivälissä kieltä puhui lapsilleen enää kaksi '
            + 'perhettä ja alle 20-vuotiaita puhujia oli neljä. Vuonna 1997 '
            + 'Inarissa aloitettiin kielipesä, jossa aikuiset puhuvat '
            + 'lapsille vain inarinsaamea. Nyt puhujia on muutama sata, ja '
            + 'osa kielipesän lapsista opettaa kieltä itse.',
          selite: 'Sajos-talon opastaulu Inarissa: samat asiat pohjoissaameksi, '
            + 'inarinsaameksi, koltansaameksi ja suomeksi. Alimmalla rivillä '
            + 'on Anarâškielâ servi, inarinsaamen kieliyhdistys.',
          lahde: 'Kimberli Mäkäräinen, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Inarinsaame',
        },
      ],
    },
    {
      id: 'tunturi',
      nimi: 'Tunturi',
      johdanto: 'Tunturissa eläminen on aina ollut liikkumista ja lämmön '
        + 'säästämistä: eläin kulkee vapaana mutta on jonkun oma, tavarat '
        + 'kulkivat ahkiossa, ja talo kaivettiin maahan.',
      tehtava: {
        kysymys: 'Mistä poron omistaja tunnistetaan?',
        vaihtoehdot: [
          'Korvamerkistä',
          'Kaulapannasta',
          'Sarvien muodosta',
          'Turkin väristä',
        ],
        oikea: 0,
        fakta: 'Merkit ovat suvuittain periytyviä, ja ne opetellaan ulkoa kuin '
          + 'nimet.',
      },
      nostot: [
        {
          otsikko: 'Eläin, joka ei ole villi eikä kesy',
          tiedosto: 'Utsjoki, Lapland, Finland - 51228525801.jpg',
          teksti: 'Poro kulkee kesät vapaana tuntureilla, mutta jokaisella on '
            + 'omistaja. Tunnistus tehdään korvamerkistä: vasan korvaan '
            + 'leikataan syntymäkesänä oman suvun kuvio, ja merkkejä on '
            + 'satoja erilaisia. Suomessa poroja on noin kaksisataatuhatta, '
            + 'ja poronhoitoalue kattaa lähes kolmanneksen maasta. Syksyllä '
            + 'porot kootaan erotukseen, jossa ne lajitellaan omistajille ja '
            + 'osa erotetaan teuraaksi. Aidan sisällä pyörii tuhansia eläimiä '
            + 'samaan aikaan.',
          selite: 'Neljä poroa kulkee lumisella rinteellä Utsjoella. Maassa on '
            + 'paljasta kangasta ja lunta laikuittain, ja takana näkyy '
            + 'tunturin rinne.',
          lahde: 'Ninara, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Poro',
        },
        {
          otsikko: 'Ennen porolla kuljetettiin kaikki',
          tiedosto: 'MECHELIN(1894) p085 A Reindeer caravan at rest.jpg',
          teksti: 'Ennen moottorikelkkoja poro oli Lapin kulkuneuvo: se veti '
            + 'ahkiota, kapeaa venemäistä rekeä, joka liukui hangella '
            + 'tavaroiden ja ihmisten kanssa. Karavaanissa porot kulkivat '
            + 'jonossa toisiinsa sidottuina, ja päivämatka oli kymmeniä '
            + 'kilometrejä. Kuvan piirsi Gunnar Berndtson vuonna 1894 — '
            + 'samaan aikaan kun isoisä kirjoitti omaa päiväkirjaansa. '
            + 'Nykyään ahkiota vedetään kelkalla, mutta poroajot ovat yhä '
            + 'laji: kilpaa ajetaan jäällä suksilla perässä.',
          selite: 'Vanha kaiverrus vuodelta 1894: poroja ja ahkioita lepäämässä '
            + 'lumikentällä, edessä turkkiin pukeutunut mies pitelemässä '
            + 'poroa.',
          lahde: 'Gunnar Berndtson, Wikimedia Commons (public domain)',
        },
        {
          otsikko: 'Talo kaivettiin maahan',
          tiedosto: 'Turvekammi Utsjoen kirkkotuvilla.jpg',
          teksti: 'Turvekammi on tunturin oma rakennus: runko tehtiin puusta, ja '
            + 'päälle ladottiin turvetta niin, että seinät ja katto '
            + 'sulautuvat maastoon. Sisällä on yksi huone ja keskellä '
            + 'tulisija, ja lämpö pysyy, koska turve eristää paremmin kuin '
            + 'lauta. Utsjoen kirkkotuvilla niitä on säilynyt: kammit '
            + 'rakennettiin siksi, että pitkän matkan takaa tulleet saivat '
            + 'yöpyä kirkonmenojen ajan. Osaa käytettiin vielä 1900-luvun '
            + 'puolella.',
          selite: 'Turvekammi, jonka katto ja seinät ovat paksun ruohon peitossa. '
            + 'Keskellä on pieni ikkuna, ja ympärillä kasvaa heinää ja '
            + 'kukkia.',
          lahde: 'EerikLehto, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
  ],
  kreeta: [
    {
      id: 'kaupunki',
      nimi: 'Kreeta',
      johdanto: 'Saari, jossa hypättiin härän yli neljätuhatta vuotta sitten, '
        + 'soitin lepää polvella eikä olkapäällä, ja oliivipuita on enemmän '
        + 'kuin ihmisiä.',
      kansikuvat: [
        {
          tiedosto: 'Chania Old Harbour in Crete, Greece 004.jpg',
          selite: 'Chanian vanha satama iltavalossa. Venetsialaisajan talot '
            + 'kaartuvat rannan mukana, ja veden pinnassa näkyy niiden '
            + 'peilikuva.',
          lahde: 'Moonik, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Ruins of the Minoan Palace in Knossos.jpg',
          selite: 'Knossoksen palatsin raunioita: punaisia pylväitä, portaita ja '
            + 'kivimuureja. Palatsissa oli satoja huoneita käytävien '
            + 'varrella.',
          lahde: 'Annatsach, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Elafonisi pink sand beach - panoramio.jpg',
          selite: 'Elafonisin matala lahti, jossa vesi on turkoosia ja hiekassa '
            + 'on vaaleanpunaista sävyä murskautuneista simpukankuorista.',
          lahde: 'trolvag, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Härän yli hypättiin',
          tiedosto: 'Bull leaping minoan fresco archmus Heraklion.jpg',
          teksti: 'Knossoksen seinämaalauksissa nuoret tarttuvat juoksevan härän '
            + 'sarviin ja heittävät kuperkeikan sen selän yli. Tutkijat '
            + 'kiistelevät yhä siitä, oliko se urheilua, uskonnon meno vai '
            + 'molempia — eikä kukaan tiedä, onnistuiko se oikeasti koskaan.',
          selite: 'Härkähyppyfreskon jäänteet Herakleionin arkeologisessa '
            + 'museossa, maalattu noin 1500 eaa. Vaaleat hahmot ovat naisia, '
            + 'tumma mies — minolainen tapa merkitä sukupuoli värillä.',
          lahde: 'Wikimedia Commons (CC0)',
          wiki: 'Knossos',
        },
        {
          otsikko: 'Lyyra soi polvella',
          tiedosto: 'Cretan lyra.jpg',
          teksti: 'Kreetalainen lyyra on kolmikielinen jousisoitin, jota pidetään '
            + 'pystyssä polvella eikä leuan alla. Sitä soitetaan häissä ja '
            + 'kylän juhlissa, usein läpi yön: tanssi kestää niin kauan kuin '
            + 'soittajaa jaksaa.',
          selite: 'Kreetalainen lyyra. Kieliä painetaan kynsien kyljellä, ei '
            + 'sormenpäillä — siitä tulee soittimen erikoinen liukuva ääni.',
          lahde: 'Lemur12, Wikimedia Commons (CC BY 3.0)',
          wiki: 'Psarantónis',
        },
        {
          otsikko: 'Öljypuita enemmän kuin ihmisiä',
          tiedosto: 'Olive-Harvest-Sitia-Lasithi-Crete-Greece.jpg',
          teksti: 'Kreetalla kasvaa noin 30 miljoonaa oliivipuuta ja asuu reilut '
            + '600 000 ihmistä — puita on siis viisikymmentä kertaa enemmän. '
            + 'Osa puista on tuhansia vuosia vanhoja ja tuottaa yhä satoa. '
            + 'Sato korjataan talvella, usein koko suvun voimin.',
          selite: 'Oliivinkorjuuta Sitiassa Itä-Kreetalla. Verkot levitetään puun '
            + 'alle ja oksat ravistellaan tai kammataan tyhjiksi.',
          lahde: 'Petro Stelte, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Oliivi',
        },
      ],
    },
    {
      id: 'maasto',
      nimi: 'Maasto',
      johdanto: 'Kreeta on vuori keskellä merta: sen halki kulkee rotko, jonka läpi '
        + 'kävellään päivässä, ylätasangolla pyöri tuhat purjetuulimyllyä, ja '
        + 'korkeimman huipun kyljessä on luola.',
      tehtava: {
        kysymys: 'Kuinka kapea Samarian rotko on kapeimmalta kohdaltaan?',
        vaihtoehdot: [
          'Noin kolme metriä',
          'Noin kolmekymmentä metriä',
          'Noin sata metriä',
          'Noin puoli metriä',
        ],
        oikea: 0,
        fakta: 'Kohtaa sanotaan rautaportiksi, ja seinät nousevat siinä satojen '
          + 'metrien korkeuteen.',
      },
      nostot: [
        {
          otsikko: 'Rotko, jonka läpi kävellään päivässä',
          tiedosto: 'Φαράγγι Σαμαριάς 3754.jpg',
          teksti: 'Samarian rotko halkaisee Valkoiset vuoret ja laskee '
            + 'kuudentoista kilometrin matkalla noin 1 200 metrin korkeudesta '
            + 'merenrantaan. Kävely kestää aamusta iltapäivään, ja se tehdään '
            + 'aina alamäkeen: ylös kiipeäminen olisi kohtuutonta. '
            + 'Kapeimmassa kohdassa seinien väliin jää vain kolmisen metriä, '
            + 'ja siellä kalliot nousevat molemmin puolin satoja metrejä. '
            + 'Alue on ollut kansallispuisto vuodesta 1962, ja kesällä siellä '
            + 'kulkee tuhansia kävijöitä päivässä.',
          selite: 'Näkymä Samarian rotkon suulle sumuisena päivänä. Jyrkät '
            + 'kalliorinteet sukeltavat alas laaksoon, ja etualalla '
            + 'mutkittelee polku.',
          lahde: 'C messier, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Tasangolla pyöri tuhat purjetta',
          tiedosto: 'Windmill at Lassithi plateau.jpg',
          teksti: 'Lassithin ylätasanko on vuorten ympäröimä viljelyaukea 800 '
            + 'metrin korkeudessa. Sinne rakennettiin 1900-luvun alussa '
            + 'tuhansia pieniä tuulimyllyjä, joiden tehtävä ei ollut jauhaa '
            + 'vaan pumpata: valkoiset kangaspurjeet pyörittivät pumppua, '
            + 'joka nosti kasteluveden pellolle. Parhaimmillaan myllyjä oli '
            + 'noin kymmenentuhatta. Nykyään useimmat on korvattu '
            + 'moottoripumpuilla, mutta osa on kunnostettu ja purjeet '
            + 'nostetaan kesäksi paikoilleen.',
          selite: 'Metallinen tuulimylly Lassithin tasangolla. Pyörässä on '
            + 'kymmenen valkoista kangaspurjetta, ja alla on betoninen '
            + 'vesisäiliö.',
          lahde: 'Lourakis, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Luola vuoren kyljessä',
          tiedosto: 'Idaean Cave panorama.jpg',
          teksti: 'Kreetan korkeimman vuoren Psiloritiksen kyljessä, noin 1 500 '
            + 'metrin korkeudessa, aukeaa Idan luola. Sinne on tuotu '
            + 'uhrilahjoja tuhansia vuosia, ja kaivauksissa on löydetty '
            + 'pronssisia kilpiä 700-luvulta ennen ajanlaskua. Luolan edessä '
            + 'avautuu Nidan tasanko, jonne paimenet vievät lampaansa yhä '
            + 'kesäksi. Luola on kolea ja pimeä myös helteellä, ja sisään '
            + 'mennään taskulampun kanssa.',
          selite: 'Idan luolan suu kalliorinteessä. Aukko on tumma ja leveä, ja '
            + 'sen eteen on rakennettu kapea kiskoilla kulkeva ratayhteys '
            + 'kaivauksia varten.',
          lahde: 'Tomisti, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
  ],
  sisilia: [
    {
      id: 'kaupunki',
      nimi: 'Sisilia',
      johdanto: 'Saari, jossa nukketeatterin ritarit taistelevat narujen varassa, '
        + 'leivos täytetään vasta tilauksesta, ja torilla huudetaan laulaen.',
      kansikuvat: [
        {
          tiedosto: 'Taormina BW 2025-04-27 09-32-42.jpg',
          selite: 'Taormina rinteellä meren yllä. Talot kiipeävät kukkulalle '
            + 'terasseittain, ja alhaalla siintää Joonianmeren rannikko.',
          lahde: 'Berthold Werner, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Mount Etna snow-toppd.jpg',
          selite: 'Etna lumihuippuisena. Tulivuoren rinteillä on tummaa laavaa ja '
            + 'alempana vihreää viljelysmaata.',
          lahde: 'Jeanne boleyn, Wikimedia Commons (public domain)',
        },
        {
          tiedosto: 'Palermo Cathedral BW 2025-04-29 11-14-42.jpg',
          selite: 'Palermon katedraalin portaali ja kupoli. Rakennuksessa näkyy '
            + 'päällekkäin arabialaista, normannilaista ja espanjalaista '
            + 'tyyliä.',
          lahde: 'Berthold Werner, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Ritarit narujen varassa',
          tiedosto: 'Sicilian puppets.JPG',
          teksti: 'Opera dei pupi on sisilialainen nukketeatteri, jossa metrin '
            + 'mittaiset haarniskoidut ritarit taistelevat Kaarle Suuren '
            + 'tarinoissa. Sama tarina jatkui iltaa toisensa jälkeen '
            + 'kuukausia, ja yleisö tuli katsomaan kuin televisiosarjaa. '
            + 'Unesco suojeli perinteen 2001.',
          selite: 'Sisilialaisia pupi-nukkeja haarniskoissaan. Nuket painavat '
            + 'jopa kymmenen kiloa, ja niitä ohjataan rautatangoilla '
            + 'ylhäältä.',
          lahde: 'Lookandlike, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Opera dei pupi',
        },
        {
          otsikko: 'Cannolo täytetään vasta tilauksesta',
          tiedosto: 'Cannoli siciliani.jpg',
          teksti: 'Cannolo on paistettu taikinaputki, joka täytetään makeutetulla '
            + 'ricotta-juustolla. Kunnon leipomossa se täytetään vasta kun '
            + 'asiakas tilaa — muuten kuori pehmenee. Ricotta tehdään '
            + 'lampaanmaidosta, ja arabit toivat sokeriruo’on saarelle '
            + '800-luvulla.',
          selite: 'Cannoli siciliani tarjolla. Päihin painetaan usein '
            + 'pistaasirouhetta tai kandeerattua hedelmää.',
          lahde: 'Stefano Mortellaro, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Cannolo',
        },
        {
          otsikko: 'Torilla huudetaan laulaen',
          tiedosto: 'Ballarò, gente en el mercado, Palermo, Sicilia, Italia, 2015.JPG',
          teksti: 'Palermon Ballarò on toiminut samalla paikalla yli tuhat '
            + 'vuotta, arabivallan ajoista asti. Myyjien huuto on oma '
            + 'taiteenlajinsa nimeltä abbanniata: hinta ja tavara lauletaan '
            + 'venytetyllä melodialla, joka kuuluu korttelin päähän.',
          selite: 'Ballarò-tori Palermossa. Kojujen välissä myydään kalaa, '
            + 'vihanneksia ja katuruokaa; markkina alkaa aamuvarhain ja '
            + 'jatkuu iltaan.',
          lahde: 'Benjamín Núñez González, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Palermo',
        },
      ],
    },
    {
      id: 'rauniot',
      nimi: 'Rauniot',
      johdanto: 'Sisiliassa jokainen valloittaja jätti jälkensä kiveen: '
        + 'kreikkalaisten temppelit, roomalaisten mosaiikit ja teatteri, '
        + 'jossa näytelmiä esitetään yhä.',
      tehtava: {
        kysymys: 'Miksi Villa Romanan mosaiikit säilyivät niin hyvin?',
        vaihtoehdot: [
          'Maanvyöry hautasi ne',
          'Ne maalattiin yli',
          'Ne siirrettiin museoon',
          'Ne peitettiin matoilla',
        ],
        oikea: 0,
        fakta: 'Muta suojasi kuvia yli seitsemänsataa vuotta, kunnes ne '
          + 'kaivettiin esiin 1950-luvulla.',
      },
      nostot: [
        {
          otsikko: 'Temppeli säilyi, koska siitä tuli kirkko',
          tiedosto: 'Valle dei Templi – towards Temple of Concordia.jpg',
          teksti: 'Agrigenton temppelilaakso on kreikkalaisten 400-luvulla ennen '
            + 'ajanlaskua rakentama rivi temppeleitä harjanteella meren yllä. '
            + 'Parhaiten säilynyt on Concordian temppeli, ja syy on '
            + 'käytännöllinen: 500-luvulla se muutettiin kirkoksi, jolloin '
            + 'pylväiden välit muurattiin umpeen ja rakennusta hoidettiin. '
            + 'Muut temppelit jäivät raunioiksi ja niiden kiviä vietiin '
            + 'muualle. Alue on Unescon maailmanperintökohde ja yksi Kreikan '
            + 'ulkopuolella olevista suurimmista kreikkalaisista '
            + 'kokonaisuuksista.',
          selite: 'Concordian temppeli harjanteella. Kaikki pylväät ovat pystyssä '
            + 'ja kattopääty ehjä, ja ympärillä kasvaa oliivipuita.',
          lahde: 'Cayambe, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Muta piilotti mosaiikit seitsemäksisadaksi vuodeksi',
          tiedosto: 'Mosaïque de la Grande Chasse, villa de Casale.jpg',
          teksti: 'Piazza Armerinan lähellä oleva roomalainen huvila rakennettiin '
            + '300-luvulla, ja sen lattioissa on noin 3 500 neliömetriä '
            + 'mosaiikkia — enemmän kuin missään muussa säilyneessä '
            + 'roomalaistalossa. Vuonna 1161 maanvyöry hautasi rakennuksen '
            + 'mutaan, ja juuri se pelasti kuvat: ne kaivettiin esiin vasta '
            + '1950-luvulla lähes ennallaan. Kuuluisin on kuusikymmentä '
            + 'metriä pitkä käytävä, jonka mosaiikissa pyydystetään '
            + 'villieläimiä eri puolilta valtakuntaa.',
          selite: 'Roomalainen lattiamosaiikki, jossa metsästäjät ajavat tiikeriä '
            + 'ja villisikaa. Hahmot on tehty pienistä värillisistä kivistä.',
          lahde: 'Tuntematon tekijä, Wikimedia Commons (public domain)',
        },
        {
          otsikko: 'Teatteri, jossa esitetään yhä',
          tiedosto: 'Teatro greco di Siracusa - Greek Theatre of Syracuse - Sicily, Italy - 3 Jan. 2007.jpg',
          teksti: 'Syrakusan kreikkalainen teatteri on hakattu suoraan kallioon '
            + '400-luvulla ennen ajanlaskua, ja katsomoon mahtui noin '
            + 'viisitoistatuhatta ihmistä. Näytelmäkirjailija Aiskhylos näki '
            + 'omia näytelmiään ensi-illassa juuri täällä. Teatteri ei ole '
            + 'museokohde vaan käytössä: joka kevät siellä esitetään antiikin '
            + 'tragedioita, ja yleisö istuu samoilla kiviportailla kuin '
            + 'kaksituhatta neljäsataa vuotta sitten. Kesällä kivi kuumenee '
            + 'niin, että mukaan otetaan tyyny.',
          selite: 'Kallioon hakattu puolikaaren muotoinen katsomo. Kivipenkit '
            + 'nousevat riveittäin, ja alhaalla on pyöreä näyttämöpaikka.',
          lahde: 'Andrew Malone, Wikimedia Commons (CC BY 2.0)',
        },
      ],
    },
  ],
  alpit: [
    {
      id: 'kaupunki',
      nimi: 'Alpit',
      johdanto: 'Vuoristo, jossa torvi kantaa laaksosta toiseen, kansallisruoka '
        + 'piti keksiä mainoskampanjalla, ja lumivyöryn kanssa on opittu '
        + 'elämään.',
      kansikuvat: [
        {
          tiedosto: 'CH.VS.Zermatt 2021-10-17 Matterhorn 8726.jpg',
          selite: 'Matterhorn kohoaa yksinäisenä pyramidina. Rinteillä on lunta '
            + 'juovina, ja alempana kulkee polku kivikossa.',
          lahde: 'Roy Egloff, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Alpine meadows.jpg',
          selite: 'Alppiniitty kesällä. Keltaiset katkerot kukkivat rinteellä, ja '
            + 'takana nousee kolmituhantisten harjanne.',
          lahde: 'Peter Sabol, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Wetterhorn from Grindelwald.jpg',
          selite: 'Wetterhorn kohoaa Grindelwaldin kylän yllä. Vuoren juurella '
            + 'näkyy taloja ja niittyjä, huipulla lunta.',
          lahde: 'Einaz80, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Torvi, joka puhuu laaksosta toiseen',
          tiedosto: 'Alphornblaeserformation über Kreuz in Zermatt - panoramio.jpg',
          teksti: 'Alppitorvessa ei ole yhtäkään venttiiliä eikä läppää, joten '
            + 'siitä saa vain luonnonsävelsarjan äänet — taitava soittaja '
            + 'yltää kuuteentoista. Ääni kantaa maastosta riippuen viidestä '
            + 'kymmeneen kilometriin. Sillä kutsuttiin karja kotiin ja '
            + 'viestittiin naapurilaaksoon, kun muuta puhelinta ei ollut.',
          selite: 'Alppitorvensoittajia Zermattissa. Torvien suppilot lepäävät '
            + 'maassa; jokainen on veistetty kuusesta ja koottu kolmesta '
            + 'osasta, ja seinämä on vain 6–8 millimetriä paksu.',
          lahde: 'Walter Schärer, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Alppitorvi',
        },
        {
          otsikko: 'Kansallisruoka, joka piti keksiä',
          tiedosto: 'Full cheese fondue set - in Switzerland.JPG',
          teksti: 'Juustofondue oli 1900-luvun alussa tuttu vain muutamassa '
            + 'laaksossa. Sveitsin juustoliitto teki siitä kansallisruoan '
            + 'mainoskampanjalla, ja armeijan keittokirja levitti reseptin '
            + 'koko maahan 1950-luvulla. Tunnetuin sekoitus on moitié-moitié: '
            + 'puolet gruyèrea, puolet vacherinia. Pataan pudonnut leipä '
            + 'maksaa laulun.',
          selite: 'Fonduepata eli caquelon lämmittimen päällä, vieressä '
            + 'leipäkuutioita ja pikkukurkkuja. Juusto pidetään sulana '
            + 'pienellä liekillä ja sitä sekoitetaan koko ajan.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Fondue',
        },
        {
          otsikko: 'Vuoren kanssa opitaan elämään',
          tiedosto: 'St. Antönien Lawinenverbauung 02.jpg',
          teksti: 'Alppikylissä lumivyöryn hallinta on taitoa, joka on siirtynyt '
            + 'sukupolvelta toiselle: mitä metsää ei kaadeta, minne ei '
            + 'rakenneta, milloin tie suljetaan. Rinteisiin on pystytetty '
            + 'teräsaitoja pitämään lumi paikallaan. Unesco lisäsi tämän '
            + 'osaamisen kulttuuriperintöluetteloonsa vuonna 2018 Sveitsin ja '
            + 'Itävallan yhteisestä hakemuksesta.',
          selite: 'Lumivyöryesteitä St. Antöniessa Graubündenin kantonissa. '
            + 'Teräsristikot on rakennettu juuri sinne, mistä vyöry lähtisi '
            + 'liikkeelle — kylän yläpuoliseen rinteeseen.',
          lahde: 'Paebi, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Lumivyöry',
        },
      ],
    },
    {
      id: 'luonto',
      nimi: 'Luonto',
      johdanto: 'Alppien luonto elää jyrkässä maastossa: yksi nisäkäs nukkuu puolet '
        + 'vuodesta, yksi lintu syö luita, ja jää vetäytyy vuosi vuodelta '
        + 'ylemmäs.',
      tehtava: {
        kysymys: 'Kuinka leveä partakorppikotkan siipiväli on?',
        vaihtoehdot: [
          'Lähes metrin',
          'Lähes kaksi metriä',
          'Lähes kolme metriä',
          'Lähes viisi metriä',
        ],
        oikea: 2,
        fakta: 'Se on Alppien suurin lintu ja tunnistetaan ilmassa vinoneliön '
          + 'muotoisesta pyrstöstä.',
      },
      nostot: [
        {
          otsikko: 'Nukkuu puolet vuodesta',
          tiedosto: 'Marmota marmota -Swiss Alps-8.jpg',
          teksti: 'Murmeli on jyrsijä, joka elää kolonioissa puurajan '
            + 'yläpuolella. Se kaivaa maahan käytävästön ja viettää siellä '
            + 'lokakuusta huhtikuuhun horroksessa: sydän lyö muutaman kerran '
            + 'minuutissa ja ruumiinlämpö laskee lähelle viittä astetta. '
            + 'Kesällä murmelit syövät ruohoa lihoakseen kaksinkertaisiksi. '
            + 'Vaaran uhatessa vartija viheltää kimeästi, ja koko rinne '
            + 'katoaa koloihinsa sekunneissa — vihellys kuuluu kilometrin '
            + 'päähän.',
          selite: 'Murmeli seisoo takajaloillaan kivikkoisella rinteellä ja '
            + 'pitelee etukäpälissään ruohoa. Turkki on ruskea ja tuuhea.',
          lahde: 'Fundraisingnetz, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Alppimurmeli',
        },
        {
          otsikko: 'Lintu, joka syö luita',
          tiedosto: '010d Wild Bearded Vulture in flight at Pfyn-Finges (Switzerland) Photo by Giles Laurent.jpg',
          teksti: 'Partakorppikotkan ravinnosta valtaosa on luuta — se on ainoa '
            + 'lintu maailmassa, joka elää lähes pelkillä luilla. Isot luut '
            + 'se kantaa ilmaan ja pudottaa kalliolle, kunnes ne murtuvat, ja '
            + 'nielee palat kokonaisina; vatsahapot ovat niin väkeviä, että '
            + 'luu liukenee. Siipiväli on lähes kolme metriä. Lintu tapettiin '
            + 'Alpeilta sukupuuttoon 1900-luvun alkuun mennessä, koska sen '
            + 'luultiin vievän lampaita ja lapsia. Palautus aloitettiin 1986, '
            + 'ja nyt niitä pesii taas satakunta paria.',
          selite: 'Partakorppikotka liitää lumisten vuorenrinteiden edessä. '
            + 'Siivet ovat suorina levällään ja pyrstö on vinoneliön '
            + 'muotoinen.',
          lahde: 'Giles Laurent, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Partakorppikotka',
        },
        {
          otsikko: 'Jää vetäytyy ylöspäin',
          tiedosto: 'Katastrophe Refotografie 001 2014 08 05.jpg',
          teksti: 'Alppien jäätiköt ovat kutistuneet nopeasti: 1800-luvun '
            + 'puolivälin jälkeen niistä on sulanut yli puolet, ja pelkästään '
            + '2000-luvulla kutistuminen on kiihtynyt. Vuoristomajoja, jotka '
            + 'rakennettiin aikanaan jäätikön reunaan, seisoo nyt satoja '
            + 'metrejä paljaan kiven yllä. Sulaminen ei ole vain '
            + 'maisema-asia: jäätiköt varastoivat talven lumen ja päästävät '
            + 'sen jokiin kesällä, joten niiden kadotessa muuttuu myös se, '
            + 'milloin Euroopan suurissa joissa on vettä.',
          selite: 'Vuoristomaja rinteellä, ja sen takana jyrkkä vuori, jonka '
            + 'rinteessä on enää kapeita jäälaikkuja siellä missä ennen oli '
            + 'yhtenäinen jäätikkö.',
          lahde: 'Friedrich Haag, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
  ],
  dubrovnik: [
    {
      id: 'kaupunki',
      nimi: 'Dubrovnik',
      johdanto: 'Kalkkikivinen kaupunki Adrianmeren rannalla oli satojen vuosien '
        + 'ajan oma pieni tasavaltansa: sillä oli oma laivasto, omat lait ja '
        + 'tapa selvitä naapureiden välissä sopimalla eikä sotimalla.',
      kansikuvat: [
        {
          tiedosto: 'Dubrovnik Old Town 1.jpg',
          selite: 'Dubrovnikin vanhakaupunki ylhäältä nähtynä. Punaisten '
            + 'tiilikattojen ympärillä kiertää muuri, ja vasemmalla näkyy '
            + 'vanha satama ja pyöreä linnake meren rannassa.',
          lahde: 'kallerna, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Old harbour, Dubrovnik 01.jpg',
          selite: 'Vanha satama muurin sisäpuolella. Laiturissa on purjeveneitä '
            + 'ja retkilaiva, ja lahden takana kohoaa metsäinen Lokrumin '
            + 'saari.',
          lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Stradun, Dubrovnik - September 2017.jpg',
          selite: 'Stradun eli kaupungin pääkatu. Kiiltäväksi kuluneet '
            + 'kivilaatat, valkoiset markiisit ja kadun päässä kellotorni. '
            + 'Ihmiset kävelevät talojen välissä varjossa.',
          lahde: 'Martin Falbisoner, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          tyyppi: 'kuva',
          otsikko: 'Klapa lauletaan ilman soittimia',
          tiedosto: 'Klapa Cambi, Orebić.2012.JPG',
          teksti: 'Klapa on dalmatialainen mieskuorolaulu ilman soittimia: '
            + 'viidestä kymmeneen laulajaa seisoo tiiviissä puolikaaressa ja '
            + 'sovittaa äänet toisiinsa. Perinne syntyi kirkoissa ja '
            + 'satamissa, ja Unesco suojeli sen 2012.',
          selite: 'Klapa-yhtye laulamassa Orebićissä. Laulajat asettuvat lähelle '
            + 'toisiaan, jotta kukin kuulee muut ilman vahvistusta.',
          lahde: 'Quahadi, Añtó, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Klapa',
          musiikki: 'https://music.apple.com/fi/search?term=klapa',
          musiikkiNimi: 'Klapa-lauluja Apple Musicissa',
        },
        {
          tyyppi: 'kuva',
          otsikko: 'Euroopan vanhin apteekki',
          tiedosto: 'Old pharmacy in the Franciscan Monastery in Dubrovnik 01.jpg',
          teksti: 'Fransiskaaniluostarin apteekki avattiin vuonna 1317 ja '
            + 'palvelee yhä asiakkaita — se on Euroopan vanhin '
            + 'yhtäjaksoisesti toiminut apteekki. Munkit valmistivat voiteita '
            + 'yrteistä, ja osa resepteistä on yhä käytössä.',
          selite: 'Vanhan apteekin purkkeja luostarin museossa. Fajanssiruukuissa '
            + 'säilytettiin yrttejä ja voiteita; jokaisen kyljessä lukee '
            + 'sisältö latinaksi.',
          lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Dubrovnik',
        },
        {
          tyyppi: 'kuva',
          otsikko: 'Suola teki kaupungista rikkaan',
          tiedosto: 'Salt pans Ston (4065531015).jpg',
          teksti: 'Stonin suola-altaat ovat toimineet 1300-luvulta asti, ja suola '
            + 'oli Dubrovnikin tasavallan tärkein tulonlähde. Sitä suojaamaan '
            + 'rakennettiin viiden kilometrin muuri — Euroopan pisin '
            + 'linnoitusmuuri Kiinan muurin jälkeen. Suola kerätään yhä käsin '
            + 'puulastoilla.',
          selite: 'Stonin suola-altaat. Merivesi johdetaan matalille kentille ja '
            + 'haihdutetaan auringossa; jäljelle jää suola.',
          lahde: 'Tony Hisgett, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Ston',
        },
      ],
    },
    {
      id: 'tasavalta',
      nimi: 'Tasavalta',
      johdanto: 'Pieni tasavalta pysyi pystyssä säännöillä. Se päätti, kuka pääsee '
        + 'sisään ja milloin, mistä juomavesi tulee ja kuinka pitkä on yksi '
        + 'kyynärä.',
      tehtava: {
        kysymys: 'Mitä Dubrovnikissa mitattiin Orlandon patsaan kyynärvarren '
          + 'mukaan?',
        vaihtoehdot: [
          'Laivan syvyys',
          'Muurin korkeus',
          'Kankaan pituus',
          'Sataman leveys',
        ],
        oikea: 2,
        fakta: 'Mitta oli 51,2 senttimetriä, ja sitä sanottiin '
          + 'dubrovnikilaiseksi kyynäräksi.',
      },
      nostot: [
        {
          otsikko: 'Laivat joutuivat odottamaan kuukauden saarella',
          tiedosto: 'Lazareti LS1.JPG',
          teksti: 'Heinäkuun 27. päivänä 1377 kaupungin suuri neuvosto sääti, '
            + 'ettei kulkutautialueilta saapuvia päästetä suoraan kaupunkiin. '
            + 'Matkustajien ja tavaroiden oli odotettava kokonainen kuukausi '
            + 'asumattomalla saarella. Odottajille rakennettiin puumajoja, '
            + 'koska puun pystyi polttamaan, jos tauti oli tarttunut. '
            + 'Myöhemmin odotusaika piteni neljäänkymmeneen päivään — italian '
            + 'sanasta quaranta, neljäkymmentä, tuli sana karanteeni. '
            + '1600-luvulla kaupungin viereen muurattiin kivinen '
            + 'odotuspaikka, lazareti, jossa oli kymmenen rakennusta ja omat '
            + 'vartijat.',
          selite: 'Dubrovnikin lazaretit meren rannalla: matalia kivirakennuksia '
            + 'punaisine tiilikattoineen. Takana rinteessä on valkoisia '
            + 'taloja ja mäntyjä.',
          lahde: 'Lasta, Wikimedia Commons (public domain)',
        },
        {
          otsikko: 'Vesi tuotiin kaupunkiin kaukaa lähteestä',
          tiedosto: 'Onofrio Fountain, Dubrovnik, 1438 (1) (30115264576).jpg',
          teksti: 'Muurien sisällä ei ollut jokea, ja sadevesisäiliöt tyhjenivät '
            + 'kuivana kesänä. Niinpä kaupunki palkkasi napolilaisen '
            + 'rakennusmestarin Onofrio della Cavan, joka johdatti vuonna '
            + '1438 lähdeveden parinkymmenen kilometrin päästä kaupunkiin '
            + 'asti. Työn päätteeksi hän rakensi kaksi julkista '
            + 'suihkulähdettä, joista kuka tahansa sai hakea vettä. '
            + 'Suuremmassa on kuusitoista kivinaamiota, joiden suusta vesi '
            + 'valuu. Kupolin koristeet murtuivat vuoden 1667 '
            + 'maanjäristyksessä, mutta lähde toimii yhä.',
          selite: 'Suuri Onofrion suihkulähde: matala kupoli ja monikulmainen '
            + 'kivikehä, jonka seinissä on koristeltuja naamioita. Kupolin '
            + 'reunalla istuu kivinen koira.',
          lahde: 'Richard Mortel, Wikimedia Commons (CC BY 2.0)',
        },
        {
          otsikko: 'Patsaan käsivarsi oli kaupungin mittanauha',
          tiedosto: 'Orlando Column, Dubrovnik, 1417 (1) (30150111635).jpg',
          teksti: 'Kaupungin torille pystytettiin vuonna 1418 kivinen '
            + 'ritaripatsas, jota sanotaan Orlandoksi. Se oli vapauden '
            + 'merkki: patsaan viereen nousseeseen tankoon nostettiin '
            + 'tasavallan lippu. Patsaalla oli myös arkisempi tehtävä, sillä '
            + 'sen kyynärvarren pituus oli kaupungin virallinen mitta. Kun '
            + 'kauppias myi kangasta, kankaan pituus mitattiin juuri tämän '
            + 'kyynärvarren mukaan, ja pituus on kaiverrettu myös patsaan '
            + 'jalustaan. Myrsky kaatoi patsaan vuonna 1825, ja se '
            + 'palautettiin paikalleen vasta yli viisikymmentä vuotta '
            + 'myöhemmin.',
          selite: 'Kivinen ritaripatsas haarniskassa. Ritari pitää oikeassa '
            + 'kädessään pitkää miekkaa ja vasemmassa kilpeä, ja takana näkyy '
            + 'kirkon julkisivun pylväitä.',
          lahde: 'Richard Mortel, Wikimedia Commons (CC BY 2.0)',
        },
      ],
    },
  ],
  riika: [
    {
      id: 'kaupunki',
      nimi: 'Riika',
      johdanto: 'Baltian suurin kaupunki kasvoi Väinäjoen suulle kauppapaikaksi. '
        + 'Vanhassakaupungissa talot ovat kapeita ja korkeita, ja jokaisella '
        + 'niistä on oma tarinansa.',
      kansikuvat: [
        {
          tiedosto: 'Riga Dom Bruecke Daugava.jpg',
          selite: 'Riika Väinäjoen yllä: vaijerisilta kaartaa leveän joen yli, '
            + 'oikealla nousee tuomiokirkon torni ja vasemmalla lasinen '
            + 'kirjastorakennus.',
          lahde: 'Brunswyk, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Riga Cathedral viewed from Dome square, Riga, Latvia Jul 14, 2022 09-42-07 AM.jpeg',
          selite: 'Riian tuomiokirkko punatiilisenä aukion laidalla. Tornissa on '
            + 'tummunut kupoli ja kello, ja aukiolla kävelee ihmisiä '
            + 'kesäpäivänä.',
          lahde: 'Crannofonix, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Livu Square - panoramio.jpg',
          selite: 'Līvun aukio vanhassakaupungissa. Keltaisia ja vihreitä taloja, '
            + 'keltaisia aurinkovarjoja terassilla ja etualalla matalaksi '
            + 'leikattu kukkapenkki.',
          lahde: 'TomasEE, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      nostot: [
        {
          tyyppi: 'kuva',
          otsikko: 'Kaapissa on 268 815 lappua',
          tiedosto: 'Dainu skapja oriģināls LNB.jpg',
          teksti: 'Daina on nelisäkeinen latvialainen kansanlaulu. Krišjānis '
            + 'Barons keräsi niitä ja järjesti ne itse piirtämäänsä kaappiin: '
            + '160 senttiä korkea, 70 laatikkoa, jokaisessa 20 lokeroa. '
            + 'Lappuja on 268 815, kukin 3 × 11 senttiä. Unesco liitti kaapin '
            + 'maailman muisti -rekisteriin 2001.',
          selite: 'Dainakaapin alkuperäiskappale Latvian kansalliskirjastossa. '
            + 'Laatikot on vedetty auki, ja lokeroissa näkyvät pystyyn '
            + 'ladotut paperilaput, joihin laulut on kirjoitettu käsin.',
          lahde: 'Savannah Rivka, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Daina',
          musiikki: 'https://music.apple.com/fi/search?term=latvian%20folk%20songs',
          musiikkiNimi: 'Latvialaisia kansanlauluja Apple Musicissa',
        },
        {
          tyyppi: 'kuva',
          otsikko: 'Ruispohja, porkkanaa ja kuminaa',
          tiedosto: 'Sklandrausis (10890919013).jpg',
          teksti: 'Sklandrausis on kämmenen kokoinen avoin piirakka, jonka pohja '
            + 'on ruistaikinaa ja täyte perunaa ja porkkanaa kuminan kanssa. '
            + 'Se on kotoisin Kuurinmaalta Latvian länsiosasta, jossa asui '
            + 'liiviläisiä, ja sitä leivottiin ennen juhlapyhiksi. EU myönsi '
            + 'sille aidon perinteisen tuotteen merkin vuonna 2013.',
          selite: 'Sklandrauši-piirakoita rivissä. Reunat nostetaan sormin '
            + 'pystyyn ja täyte jää näkyviin: alla vaalea perunakerros, '
            + 'päällä oranssi porkkanakerros.',
          lahde: 'Liga Eglite, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Kuurinmaa',
        },
        {
          tyyppi: 'kuva',
          otsikko: 'Torikatot olivat ilmalaivojen halleja',
          tiedosto: 'German zeppelin hangars, now Riga Central Market (23074882114).jpg',
          teksti: 'Riian keskustorin viisi hallia rakennettiin 1924–1930 '
            + 'saksalaisten zeppelin-ilmalaivojen hallien teräsrungoista. '
            + 'Rungot tuotiin Vaiņodesta ja pystytettiin joen rantaan. Toria '
            + 'on 72 300 neliömetriä ja myyntipisteitä yli 3 000 — se on yhä '
            + 'Euroopan suurimpia.',
          selite: 'Lihahallin sisäkatto Riian keskustorilla. Teräsristikko '
            + 'kaartuu toistakymmentä metriä pään yläpuolelle. Se tehtiin '
            + 'alun perin kannattamaan ilmalaivan seinämiä, ei kalatiskejä.',
          lahde: 'Jorge Láscar, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Riian keskustori',
        },
      ],
    },
    {
      id: 'vanhakaupunki',
      nimi: 'Vanhakaupunki',
      johdanto: 'Riian vanhassakaupungissa kannattaa katsoa ylös. Julkisivut ja '
        + 'katonharjat kertovat, ketkä talon rakensivat ja kenen kanssa he '
        + 'olivat riidoissa.',
      tehtava: {
        kysymys: 'Miksi Riian Kissatalon kissapatsaat käännettiin katolla ympäri?',
        vaihtoehdot: [
          'Myrsky väänsi ne yöllä',
          'Kaupunki määräsi kääntämään ne',
          'Katto piti maalata uudelleen',
          'Kissat olivat liian raskaat',
        ],
        oikea: 1,
        fakta: 'Talo on vuodelta 1909, ja kissat ovat yhä katolla — nyt '
          + 'kohteliaasti päin naapurin kiltataloa.',
      },
      nostot: [
        {
          otsikko: 'Talo, jossa juhlivat naimattomat kauppiaat',
          tiedosto: 'House of Blackheads and St. Peter\'s Church Tower, Riga, Latvia - Diliff.jpg',
          teksti: 'Mustapäiden talo rakennettiin vuonna 1334 varastoksi ja '
            + 'kokoontumispaikaksi. Myöhemmin sitä käytti Mustapäiden '
            + 'veljeskunta, kilta, johon kuuluivat kaupungin naimattomat '
            + 'kauppiaat ja ulkomaalaiset. Talon edustalle kerrotaan '
            + 'pystytetyn koristeltu joulukuusi jo vuonna 1510. Toisen '
            + 'maailmansodan pommitus tuhosi rakennuksen vuonna 1941, ja '
            + 'rauniot purettiin. Nykyinen talo muurattiin uudelleen '
            + '1990-luvulla vanhojen piirustusten ja valokuvien mukaan, ja se '
            + 'valmistui juuri ennen kaupungin 800-vuotisjuhlia.',
          selite: 'Mustapäiden talo iltavalaistuksessa: koristeellinen punainen '
            + 'julkisivu, jyrkkä porrasmainen päätykolmio ja vasemmalla Pyhän '
            + 'Pietarin kirkon vihreä torni.',
          lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Kissat kääntyivät katolla ympäri',
          tiedosto: 'Riga - Cat\'s House - Cat 2.jpg',
          teksti: 'Kissatalo valmistui vuonna 1909 aivan Suuren killan naapuriin. '
            + 'Talon huippuihin nostettiin kaksi mustaa kissaa, joiden selkä '
            + 'on köyryssä ja häntä pystyssä. Tarina kertoo, että talon '
            + 'omistaja ei päässyt naapurin kiltaan jäseneksi ja käänsi '
            + 'kissat takapuoli kiltataloa kohti. Kiista päätyi käsittelyyn, '
            + 'ja lopulta kaupunki määräsi kääntämään kissat toisin päin. Nyt '
            + 'ne katsovat kiltataloa kohti, ja moni pysähtyy kadulle '
            + 'katsomaan niitä ylös.',
          selite: 'Musta kissapatsas talon suippenevan tornihuipun päällä. Kissan '
            + 'selkä on köyryssä ja häntä koukussa ylöspäin sinistä taivasta '
            + 'vasten.',
          lahde: 'Voytek S, Wikimedia Commons (CC BY-SA 2.5)',
        },
        {
          otsikko: 'Kolme veljestä kolmelta vuosisadalta',
          tiedosto: 'The Three Brothers Houses (8531775989).jpg',
          teksti: 'Mazā Pils -kadulla seisoo vierekkäin kolme kapeaa taloa, joita '
            + 'sanotaan Kolmeksi veljekseksi. Ne ovat Riian vanhin säilynyt '
            + 'asuintalojen ryhmä. Valkoinen veli on rakennettu 1400-luvun '
            + 'lopulla, keltaisen julkisivussa lukee vuosiluku 1646, ja '
            + 'kolmas valmistui vasta 1700-luvun alussa. Kaikkien päätyseinä '
            + 'on kadulle päin, kuten Itämeren kauppakaupungeissa oli tapana. '
            + 'Talot korjattiin 1950-luvulla, ja nykyään niissä toimii '
            + 'arkkitehtuurimuseo.',
          selite: 'Kolme kapeaa taloa vierekkäin kadun varrella: vasemmalla '
            + 'vaaleanvihreä, keskellä keltainen porrasmaisine päätyineen ja '
            + 'oikealla valkoinen. Katu on mukulakivinen.',
          lahde: 'Guillaume Speurt, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
    },
  ],
  vilna: [
    {
      id: 'kaupunki',
      nimi: 'Vilna',
      johdanto: 'Liettuan pääkaupunki kasvoi kahden joen yhtymäkohtaan kukkuloiden '
        + 'väliin. Vanhassakaupungissa on kapeita kujia, satakunta kirkkoa ja '
        + 'yksi omaksi tasavallakseen julistautunut kortteli.',
      kansikuvat: [
        {
          tiedosto: 'Gedimino pilis by Augustas Didzgalvis.jpg',
          selite: 'Gediminaksen torni vihreän kukkulan päällä. Punatiilisen '
            + 'tornin salossa liehuu Liettuan lippu, ja taustalla mutkittelee '
            + 'joki kaupungin läpi.',
          lahde: 'BigHead (Augustas Didžgalvis), Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Vilnius old town 2.JPG',
          selite: 'Vilnan vanhankaupungin kattoja ylhäältä nähtynä: punaisia '
            + 'tiilikattoja, kirkontorneja ja niiden takana metsäinen harju.',
          lahde: 'Karmen media, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Pearl of Vilnius, the churches of Saint Anne and Bernardin (8123183908).jpg',
          selite: 'Pyhän Annan kirkko ja sen takana bernardiinikirkko. Molemmat '
            + 'on muurattu punatiilestä, ja Annan kirkon julkisivussa on '
            + 'teräviä tornikoristeita.',
          lahde: 'Guillaume Speurt, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      nostot: [
        {
          tyyppi: 'kuva',
          otsikko: 'Sutartinė soi tahallaan riitasointuisena',
          tiedosto: 'Sutartinės.jpg',
          teksti: 'Sutartinė on liettualainen moniääninen laulu, jota esittää '
            + 'kaksi, kolme tai neljä naista. Äänet kulkevat sekunnin päässä '
            + 'toisistaan — siis niin lähellä, että sointi hankaa korvaa '
            + 'tahallaan. Laji on kotoisin Aukštaitijasta, ja Unesco otti sen '
            + 'ihmiskunnan perintöluetteloon vuonna 2010.',
          selite: 'Kaksi laulajaa esittää sutartinėtä. Laulajat seisovat '
            + 'vastakkain ja liikkuvat askel kerrallaan: laululla on usein '
            + 'oma yksinkertainen koreografiansa.',
          lahde: 'Bcecilija, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Liettua',
          musiikki: 'https://music.apple.com/fi/search?term=sutartines',
          musiikkiNimi: 'Sutartinės-lauluja Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/EDIS-SRP-0197-03/EDIS-SRP-0197-03.mp3',
          musiikkiNayteNimi: 'Liettualainen kansanlaulu kanteleilla — CC0',
        },
        {
          tyyppi: 'kuva',
          otsikko: 'Kirkkaanpinkki keitto ja kuumat perunat',
          tiedosto: 'Lithuanian cold beetroot soup, 11 April 2018.png',
          teksti: 'Šaltibarščiai on kylmä keitto, jossa on punajuurta, kefiiriä, '
            + 'kurkkua, tilliä ja keitetty muna. Kefiiri värjää sen '
            + 'kirkkaanpinkiksi. Keitto tarjotaan jääkylmänä, mutta vieressä '
            + 'on aina lautasellinen höyryäviä keitettyjä perunoita — niitä '
            + 'syödään vuorotellen keiton kanssa.',
          selite: 'Šaltibarščiai-annos: pinkki keitto kulhossa, päällä '
            + 'munanpuolikas ja tilliä, vieressä keitettyjä perunoita omalla '
            + 'lautasellaan.',
          lahde: 'Ke an, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Borssi',
        },
        {
          tyyppi: 'kuva',
          otsikko: 'Tasavalta, jonka perustuslaissa on 41 pykälää',
          tiedosto: 'Uzupis Constitution - panoramio.jpg',
          teksti: 'Užupis on Vilnian kaupunginosa joen toisella puolen. '
            + 'Taiteilijat julistivat sen omaksi tasavallakseen '
            + 'aprillipäivänä, ja sillä on presidentti, lippu ja '
            + 'perustuslaki, jossa on 41 pykälää. Ne on kiinnitetty kadun '
            + 'seinään kiiltäville metallilaatoille, yksi laatta kutakin '
            + 'kieltä kohti.',
          selite: 'Užupisin perustuslakilaatta englanniksi Paupion kadulla. '
            + 'Pykälä 12 kuuluu: "Koiralla on oikeus olla koira." Pykälä 16: '
            + '"Jokaisella on oikeus olla onnellinen."',
          lahde: 'AwOiSoAk KaOsIoWa, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Užupis',
        },
      ],
    },
    {
      id: 'oppi',
      nimi: 'Oppi',
      johdanto: 'Vilnassa on opiskeltu ja tutkittu satoja vuosia. Välillä oppiminen '
        + 'oli helppoa, välillä omalla kielellä painettu kirja piti kantaa '
        + 'maahan selässä.',
      tehtava: {
        kysymys: 'Miten liettuankieliset kirjat saatiin maahan 1800-luvun lopulla?',
        vaihtoehdot: [
          'Ne painettiin yliopiston kellarissa',
          'Ne kirjoitettiin käsin kouluissa',
          'Ne lähetettiin postissa Siperiaan',
          'Kantajat toivat ne rajan yli',
        ],
        oikea: 3,
        fakta: 'Kielto kesti neljäkymmentä vuotta, vuodesta 1864 vuoteen 1904. '
          + 'Liettuassa vietetään kirjankantajan päivää 16. maaliskuuta.',
      },
      nostot: [
        {
          otsikko: 'Yliopisto avattiin vuonna 1579',
          tiedosto: 'Vilnius University Great Courtyard 1, Vilnius, Lithuania - Diliff.jpg',
          teksti: 'Vilnaan perustettiin ensin koulu vuonna 1570 ja yhdeksän '
            + 'vuotta myöhemmin kuningas antoi sille yliopiston oikeudet. Se '
            + 'on Itä-Euroopan vanhimpia yliopistoja. Rakennukset kasvoivat '
            + 'vuosisatojen mittaan toistensa ympärille niin, että niiden '
            + 'väliin jäi kolmetoista sisäpihaa, joista pääsee toiseen '
            + 'holvikäytävien läpi. Suurimman pihan laidalla on Pyhän '
            + 'Johanneksen kirkko ja korkea kellotorni. Yliopiston kirjasto '
            + 'aloitti jo 1570, ja siellä on nykyään miljoonia kirjoja.',
          selite: 'Yliopiston suuri sisäpiha: vaaleankeltainen kirkon julkisivu '
            + 'ja sen vieressä korkea kellotorni. Piha on laskettu '
            + 'kuvioidusta mukulakivestä.',
          lahde: 'Diliff, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Kirjat kannettiin rajan yli selässä',
          tiedosto: 'Lithuanian book carrier Kazys Ūdra (1857–1937).jpg',
          teksti: 'Vuonna 1864 Venäjän keisarikunta kielsi liettuan kielen '
            + 'painamisen latinalaisilla kirjaimilla. Kirjoja alettiin painaa '
            + 'rajan takana Itä-Preussissa ja aina Amerikassa asti, ja niitä '
            + 'kuljetettiin salaa takaisin. Kantajia sanottiin liettuaksi '
            + 'knygnešiai, kirjankantajat. He kulkivat öisin metsäpolkuja '
            + 'säkit selässä, ja kiinni jäänyt sai sakot, vankilan tai '
            + 'karkotuksen Siperiaan. Kirjoja kannettiin neljäkymmentä '
            + 'vuotta, kunnes kielto kumottiin vuonna 1904.',
          selite: 'Vanha mustavalkoinen valokuva kirjankantaja Kazys Ūdrasta. '
            + 'Iäkäs mies suurissa viiksissä katsoo kameraan paksu villatakki '
            + 'yllään.',
          lahde: 'tuntematon kuvaaja, Wikimedia Commons (public domain)',
        },
        {
          otsikko: 'Tähtitorni yliopiston pihan laidalla',
          tiedosto: 'Vilnius University.Observatory.jpg',
          teksti: 'Yliopiston tähtitorni perustettiin vuonna 1753. Sen sai aikaan '
            + 'matematiikan opettaja Tomas Žebrauskas, ja rahat lahjoitti '
            + 'liettualainen aatelisnainen Elžbieta Oginskienė-Puzynina. '
            + 'Tähtitorni on Euroopan neljänneksi vanhin, ja sen julkisivuun '
            + 'on kaiverrettu latinankielisiä lauseita ja eläinradan '
            + 'merkkejä. Nykyään kaupungin valot ovat niin kirkkaita, ettei '
            + 'taivasta voi enää tarkkailla keskustasta, mutta tutkimustyö '
            + 'jatkuu yhä.',
          selite: 'Tähtitornin julkisivu sisäpihalta: vaaleanharmaa keskiosa, '
            + 'jossa on kaiverrettuja tekstinauhoja, ja oikealla '
            + 'vaaleanpunainen torni kelloineen.',
          lahde: 'Algirdas, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
    },
  ],
  oslo: [
    {
      id: 'kaupunki',
      nimi: 'Oslo',
      johdanto: 'Norjan pääkaupunki on rakennettu vuonon perukkaan metsäisten '
        + 'kukkuloiden syliin. Merelle päin avautuu satama, jonka laitureilta '
        + 'on lähdetty kauas.',
      kansikuvat: [
        {
          tiedosto: 'Bjørvika Oslo Opera house 3.JPG',
          selite: 'Oslon oopperatalo vuonon rannassa. Valkoinen katto laskeutuu '
            + 'vinona rinteenä suoraan veteen, ja edustalla kelluu lasinen '
            + 'taideteos.',
          lahde: 'Øyvind Holmstad, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Karl Johans gate Oslo 2022-08-17 01.jpg',
          selite: 'Karl Johanin katu keskustassa. Kävelykadun varrella on '
            + 'vaaleita kivitaloja ja kulmatalossa kello, ja ihmiset kulkevat '
            + 'aurinkoisessa säässä.',
          lahde: 'Leonhard Lenz, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: '0 7849 Oslo - Aker Brygge mit Rathaus.jpg',
          selite: 'Aker Bryggen laituri kesäpäivänä: ihmiset istuvat leveillä '
            + 'puuportailla veden äärellä, oikealla on laiva ja taustalla '
            + 'kaupungintalon tiilitornit.',
          lahde: 'W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          tyyppi: 'kuva',
          otsikko: 'Vuorenkuninkaan luolassa',
          tiedosto: 'Anders Beer Wilse - Edvard Grieg - NMK.2006.5769 - National Museum of Art, Architecture and Design.jpg',
          teksti: 'Henrik Ibsenin näytelmä Peer Gynt sai ensi-iltansa '
            + 'Christianiassa 24. helmikuuta 1876, ja musiikin siihen sävelsi '
            + 'Edvard Grieg. Kuuluisin kohta on Vuorenkuninkaan luolassa: '
            + 'sama lyhyt sävelkulku toistuu yhä uudestaan ja kiihtyy loppua '
            + 'kohti niin, että soittajilla on työ pysyä mukana. Grieg '
            + 'kirjoitti näytelmään 26 musiikkinumeroa.',
          selite: 'Edvard Grieg (1843–1907) valokuvaaja Anders Beer Wilsen '
            + 'kuvaamana vuonna 1903. Grieg oli kotoisin Bergenistä, mutta '
            + 'hänen tunnetuin teoksensa kuultiin ensi kerran Oslossa.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Peer Gynt',
          musiikki: 'https://music.apple.com/fi/search?term=Grieg%20Peer%20Gynt',
          musiikkiNimi: 'Griegin Peer Gynt Apple Musicissa',
          musiikkiNayte: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Hall_of_the_Mountain_King_%28ISRC_USUAN1200072%29.mp3',
          musiikkiNayteNimi: 'Grieg: Vuorenkuninkaan luolassa — Kevin MacLeod, CC BY',
        },
        {
          tyyppi: 'kuva',
          otsikko: 'Ruskea juusto keitetään herasta',
          tiedosto: 'Brunost - Brown cheese.jpg',
          teksti: 'Brunost tehdään herasta, joka jää juustonvalmistuksesta yli. '
            + 'Sitä keitetään tuntikausia, kunnes maitosokeri ruskistuu ja '
            + 'massa muuttuu makeaksi. Anne Hov lisäsi joukkoon kermaa vuonna '
            + '1863 Gudbrandsdalenissa, ja siitä syntyi maan tunnetuin '
            + 'juusto. Leivän päälle se leikataan juustohöylällä — myös se on '
            + 'norjalainen keksintö, vuodelta 1925.',
          selite: 'Palanen brunostia leikattuna. Väri ei tule väriaineesta vaan '
            + 'kuumennuksesta: maitosokeri karamellisoituu samalla tavalla '
            + 'kuin sokeri pannulla.',
          lahde: 'color line, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Gudbrandsdalsost',
        },
        {
          tyyppi: 'kuva',
          otsikko: 'Puisto, jonka teki yksi mies',
          tiedosto: 'Gustav Vigeland - Monolith. Oslo Frogner Park, 1999.jpeg',
          teksti: 'Frognerin puistossa on yli 200 veistosta, ja ne kaikki ovat '
            + 'saman taiteilijan käsialaa: Gustav Vigeland suunnitteli myös '
            + 'puiston sillat, portit ja lyhdyt. Keskellä kohoaa Monoliitti, '
            + '14 metriä korkea pylväs, johon on veistetty 121 ihmishahmoa. '
            + 'Kolme kivenhakkaajaa työsti sitä yhdestä graniittilohkareesta '
            + 'neljätoista vuotta. Puistoon pääsee maksutta mihin aikaan '
            + 'tahansa.',
          selite: 'Monoliitti Frognerin puistossa. Graniittilohkare tuotiin '
            + 'Halden lähistöltä 1920-luvulla, ja veistotyö kesti vuodesta '
            + '1929 vuoteen 1943. Vigeland teki savimallin, kivenhakkaajat '
            + 'siirsivät sen kiveen.',
          lahde: 'The original uploader was DIMSFIKAS at Greek Wikipedia, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Vigelandin puisto',
        },
      ],
    },
    {
      id: 'laivat',
      nimi: 'Laivat',
      johdanto: 'Oslossa on kolme museota ja niissä kolme laivaa. Yksi kaivettiin '
        + 'maasta, yksi rakennettiin jäätä varten ja yksi sidottiin kasaan '
        + 'balsapuun rungoista.',
      tehtava: {
        kysymys: 'Miksi Fram-laivan runko tehtiin leveäksi ja pyöreäpohjaiseksi?',
        vaihtoehdot: [
          'Jotta jää nostaa sen ylös',
          'Jotta siihen mahtuisi enemmän koiria',
          'Jotta se kulkisi myrskyssä nopeammin',
          'Jotta se olisi halvempi rakentaa',
        ],
        oikea: 0,
        fakta: 'Suunnitelma toimi: Fram ajelehti jään mukana kolme vuotta eikä '
          + 'murskaantunut.',
      },
      nostot: [
        {
          otsikko: 'Laiva kaivettiin ylös hautakummusta',
          tiedosto: 'Oseberg Ship - Viking Ship Museum (Oslo).jpg',
          teksti: 'Osebergin laiva rakennettiin noin vuonna 820 ja haudattiin '
            + 'neljätoista vuotta myöhemmin maakummun alle Oslon '
            + 'eteläpuolelle. Sinne pantiin kaksi vainajaa ja koko talouden '
            + 'tavarat: koristeltu kärry, neljä rekeä, vuoteita, kudottuja '
            + 'kankaita ja keittovälineitä. Kummun sininen savi piti puun '
            + 'kosteana, joten laiva säilyi lähes kokonaisena. Se kaivettiin '
            + 'esiin vuonna 1904, ja palaset koottiin takaisin yhteen. Keulan '
            + 'kaareva koristekierre on veistetty yhdestä puukappaleesta.',
          selite: 'Osebergin viikinkilaiva museosalissa. Tumma puurunko on matala '
            + 'ja pitkä, ja keula kaartuu ylös kierteeksi kuin käärmeen '
            + 'häntä.',
          lahde: 'Larry Lamsa, Wikimedia Commons (CC BY 2.0)',
        },
        {
          otsikko: 'Runko tehtiin jäätä varten',
          tiedosto: 'Oslo, Fram museum, Fram ship (02).jpg',
          teksti: 'Fridtjof Nansen halusi ajelehtia jään mukana kohti '
            + 'pohjoisnapaa, mutta jää oli murskannut monta laivaa ennen '
            + 'häntä. Niinpä laivanrakentaja Colin Archer teki vuonna 1892 '
            + 'laivan, jonka pohja on pyöreä ja kylki viisto: kun jää '
            + 'puristaa, se nostaa laivan ylös päälleen sen sijaan että '
            + 'litistäisi sen. Fram on epätavallisen leveä ja matala, ja '
            + 'siinä oli tuulimylly sähkövaloja varten. Sillä purjehtivat '
            + 'sekä Nansen että myöhemmin Roald Amundsen, ja nykyään sen '
            + 'ympärille on rakennettu museo.',
          selite: 'Fram-laiva museorakennuksen sisällä. Puinen kylki nousee '
            + 'korkeana katsojan yläpuolelle, ja mastojen köydet risteilevät '
            + 'kattoa vasten.',
          lahde: 'Palickap, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Lautta balsapuista Tyynenmeren yli',
          tiedosto: 'Kon-Tiki raft, side view.jpg',
          teksti: 'Thor Heyerdahl uskoi, että Etelä-Amerikasta oli voitu '
            + 'purjehtia Tyynenmeren saarille jo kauan sitten. Väitettä ei '
            + 'uskottu, joten hän päätti näyttää sen. Vuonna 1947 hän sitoi '
            + 'yhdeksän balsapuun runkoa yhteen köysillä ilman ainuttakaan '
            + 'naulaa, nosti purjeen ja lähti viiden miehen kanssa Perusta '
            + 'länteen. Matka kesti 101 päivää ja lautta ajelehti lähes '
            + 'seitsemäntuhatta kilometriä, kunnes se ajautui riutalle '
            + 'Tuamotusaarilla. Lautta on nyt museossa Oslossa.',
          selite: 'Kon-Tiki-lautta museossa: paksut puunrungot vierekkäin, päällä '
            + 'ruokokattoinen maja ja purje. Vasemmalla liehuu Norjan lippu.',
          lahde: 'Wikipek, Wikimedia Commons (CC0)',
        },
      ],
    },
  ],
  kobenhavn: [
    {
      id: 'kaupunki',
      nimi: 'Kööpenhamina',
      johdanto: 'Tanskan pääkaupunki on rakennettu kahden saaren kupeeseen salmen '
        + 'rannalle. Se on matala kaupunki, jossa liikutaan pyörällä ja jossa '
        + 'vesi on aina lähellä.',
      kansikuvat: [
        {
          tiedosto: 'Kopenhagen (DK), Runder Turm -- 2017 -- 1633.jpg',
          selite: 'Pyöreä torni alhaalta kuvattuna. Punatiilinen sylinteri nousee '
            + 'suoraan taivasta vasten, ja seinässä on kapeita ikkunoita eri '
            + 'korkeuksilla.',
          lahde: 'Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Two of Kongelige livgarde Amalienborg Copenhagen Denmark.jpg',
          selite: 'Kuninkaan henkivartija seisoo vahdissa Amalienborgin linnan '
            + 'seinustalla. Karvalakki ja tumma takki heittävät pitkän varjon '
            + 'vaaleaan seinään.',
          lahde: 'Jebulon, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Canal Tours at Christianshavn.jpg',
          selite: 'Matala kanaalivene täynnä matkustajia kulkee leveällä '
            + 'satama-altaalla. Vastarannalla on vanhoja tiilisiä makasiineja '
            + 'ja kirkontorni.',
          lahde: 'Leif Jørgensen, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          tyyppi: 'kuva',
          otsikko: 'Sinfonia, jossa on kaksi patarumpalia',
          tiedosto: 'Carl Nielsen c. 1908.jpg',
          teksti: 'Carl Nielsen soitti kuninkaallisen teatterin orkesterissa '
            + 'toista viulua kuusitoista vuotta ja sävelsi samaan aikaan '
            + 'kaksi ensimmäistä sinfoniaansa. Kaikkiaan sinfonioita syntyi '
            + 'kuusi. Neljännessä, nimeltään Sammumaton, on kaksi '
            + 'patarumpalia lavan eri laidoilla, ja lopussa ne käyvät '
            + 'keskenään kaksintaistelun. Nielsen kirjoitti myös satoja '
            + 'lauluja, joita tanskalaiset laulavat yhdessä koulussa ja '
            + 'juhlissa.',
          selite: 'Carl Nielsen (1865–1931) noin vuonna 1908. Hän kasvoi köyhässä '
            + 'perheessä Fynin saarella ja soitti nuorena '
            + 'sotilassoittokunnassa, ennen kuin pääsi opiskelemaan '
            + 'Kööpenhaminaan.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Carl Nielsen',
          musiikki: 'https://music.apple.com/fi/search?term=Carl%20Nielsen',
          musiikkiNimi: 'Carl Nielsen Apple Musicissa',
        },
        {
          tyyppi: 'kuva',
          otsikko: 'Voileipä syödään haarukalla',
          tiedosto: 'Smørrebrød in Copenhagen 01.jpg',
          teksti: 'Smørrebrød on avoin voileipä tummalla ruisleivällä, ja se '
            + 'syödään veitsellä ja haarukalla. Järjestyskin on tarkka: ensin '
            + 'kala, sitten liha, viimeisenä juusto — eikä päällisiä '
            + 'sekoiteta keskenään. Vanhoissa lounasravintoloissa listalla '
            + 'voi olla yli kaksikymmentä eri leipää, ja jokaisella on oma '
            + 'nimensä ja vakiintunut kuormansa.',
          selite: 'Kaksi smørrebrødiä kööpenhaminalaisella lautasella. Pohjalla '
            + 'on tumma ruisleipä, jonka päälle levitetään voi — juuri siitä '
            + 'nimi tulee: smør on voi ja brød leipä.',
          lahde: 'Kritzolina, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Smørrebrød',
        },
        {
          tyyppi: 'kuva',
          otsikko: 'Pyöriä enemmän kuin autoja',
          tiedosto: 'Cyclists at red 2.jpg',
          teksti: 'Kööpenhaminassa on noin 385 kilometriä autoliikenteestä '
            + 'erotettuja pyöräteitä, ja niitä pitkin ajetaan joka säällä. '
            + 'Kaupungin oman laskennan mukaan noin puolet kaikista työ- ja '
            + 'koulumatkoista tehdään pyörällä. Risteyksissä pyörillä on omat '
            + 'liikennevalonsa, ja talvella pyörätiet aurataan ensimmäisten '
            + 'teiden joukossa.',
          selite: 'Pyöräilijöitä odottamassa vihreää valoa Kööpenhaminassa. '
            + 'Pyöräkaista on korotettu ajoradan ja jalkakäytävän väliin '
            + 'omalle tasolleen, joten pyörä ei kulje autojen eikä '
            + 'kävelijöiden seassa.',
          lahde: 'heb@Wikimedia Commons (mail), Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Pyöräily',
        },
      ],
    },
    {
      id: 'sadut',
      nimi: 'Sadut',
      johdanto: 'Syyskuussa 1819 kaupunkiin saapui neljätoistavuotias poika, jolla '
        + 'oli nyytti ja muutama kolikko. Hänen saduistaan tuli maailman '
        + 'käännetyimpiä.',
      tehtava: {
        kysymys: 'Mikä on yhä mukana Tivolin puisen vuoristoradan junassa?',
        vaihtoehdot: [
          'Purjeet vaunujen päällä',
          'Höyrykone radan alla',
          'Jarrumies junan kyydissä',
          'Hevonen vetämässä vaunuja',
        ],
        oikea: 2,
        fakta: 'Rutschebanen on vuodelta 1914 ja yksi maailman vanhimmista yhä '
          + 'ajossa olevista puisista vuoristoradoista.',
      },
      nostot: [
        {
          otsikko: 'Poika tuli kaupunkiin yksin',
          tiedosto: 'Hans Christian Andersen by Thora Hallager 1869.jpg',
          teksti: 'Hans Christian Andersen syntyi Odensessa suutarin perheeseen '
            + 'vuonna 1805. Neljätoistavuotiaana hän lähti yksin '
            + 'Kööpenhaminaan ja aikoi kuninkaalliseen teatteriin laulajaksi. '
            + 'Ääni kuitenkin murtui, eikä tanssijasta tai näyttelijästäkään '
            + 'tullut mitään. Virkamies Jonas Collin järjesti pojalle '
            + 'koulupaikan, ja koulussa Andersen istui monta vuotta itseään '
            + 'paljon nuorempien kanssa. Ensimmäinen ohut satuvihko ilmestyi '
            + 'vuonna 1835, ja satuja on käännetty yli sadalle kielelle.',
          selite: 'Vanha ruskeasävyinen valokuva Hans Christian Andersenista '
            + 'sivulta. Mies istuu tuolilla tumma rusetti kaulassa ja katsoo '
            + 'eteenpäin.',
          lahde: 'Thora Hallager, Wikimedia Commons (public domain)',
          wiki: 'H. C. Andersen',
        },
        {
          otsikko: 'Satamakatu, jonka varrella satuja kirjoitettiin',
          tiedosto: 'Nyhavn, Copenhagen, 20220618 1725 7350.jpg',
          teksti: 'Nyhavn kaivettiin 1670-luvulla kanavaksi, jotta laivat '
            + 'pääsisivät purkamaan lastinsa keskelle kaupunkia. Kadun varsi '
            + 'oli pitkään merimiesten kapakoiden ja halpojen vuokrahuoneiden '
            + 'aluetta. Andersen asui kadun varrella kolmessa eri talossa '
            + 'yhteensä toistakymmentä vuotta, ja numerossa 20 hän '
            + 'kirjoitti ensimmäiset satunsa. Nykyään talot on maalattu '
            + 'kirkkaanvärisiksi ja kanavassa on vanhoja puulaivoja.',
          selite: 'Nyhavnin kanava: keltaisia, punaisia ja sinisiä kapeita taloja '
            + 'rivissä rannan takana, kanavassa vanhoja puuveneitä ja '
            + 'terassien varjoja.',
          lahde: 'Jakub Hałun, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Huvipuisto avattiin vuonna 1843',
          tiedosto: 'Tivoli-Rutschebanen.jpg',
          teksti: 'Tivoli avattiin elokuussa 1843 kaupungin vanhan vallihaudan '
            + 'viereen. Andersen kävi puistossa heti sen ensimmäisenä kesänä, '
            + 'ja puiston kiinalaistyylisten rakennusten kerrotaan antaneen '
            + 'hänelle ajatuksen Satakieli-satuun. Puiston tunnetuin laite on '
            + 'puinen vuoristorata Rutschebanen vuodelta 1914. Sen junassa '
            + 'istuu jarrumies, joka hidastaa vauhtia alamäissä, koska rata '
            + 'ei muuten pysyisi hallinnassa. Myös Walt Disney kävi Tivolissa '
            + 'ennen kuin rakensi oman huvipuistonsa.',
          selite: 'Tivolin puisen vuoristoradan lähtöpaikka illalla. Katon yllä '
            + 'palaa lamppukyltti RUTSCHEBANEN, ja avovaunuissa istuu '
            + 'matkustajia talvitakeissa.',
          lahde: 'Stefan Scheer, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
    },
  ],
  /*
   * DOHAN KANSISIVU (nippu 2:n pilottikaupunki, 12.8.2026). Aihesivun
   * id on ruoka, koska QAT-maalehdellä on aavikko, rakennukset, meri ja
   * luonto — sama id kaupungilla peittäisi maan sivun (rakennaSivut).
   */
  doha: [
    {
      id: 'kaupunki',
      nimi: 'Doha',
      johdanto: 'Doha on pääkaupunki, jossa moni tunnetuin paikka on vasta '
        + 'parinkymmenen vuoden ikäinen: kulttuurikylä avattiin 2010, '
        + 'kansalliskirjasto 2018 ja metro 2019.',
      kansikuvat: [
        {
          tiedosto: 'Doha Corniche Skyline View 1.jpg',
          selite: 'Cornichen rantakadulta katsottuna lahden takana nousee '
            + 'West Bayn torniryhmä. Etualalla on portaikoksi kivetty '
            + 'ranta ja palmuja, ja vastarannalla on keltaisia '
            + 'telttakatoksia ja rivi valkoisia veneitä.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Doha Metro station in December 2019.jpg',
          selite: 'Metroaseman lippuhalli. Katto laskeutuu pilarien päälle '
            + 'valkoisina lehtimäisinä holveina, opasteet ovat arabiaksi '
            + 'ja englanniksi, ja oikealla odottavat lippuportit.',
          lahde: 'Tim Adams, Wikimedia Commons (CC BY 3.0)',
        },
        {
          tiedosto: 'Doha Qatar - Katara Dovecotes.jpg',
          selite: 'Kaksi kartiomaista kyyhkystornia Kataran kulttuurikylässä. '
            + 'Savenvärisessä pinnassa on rivi pieniä reikiä ja niiden '
            + 'vieressä ulos työntyviä puutikkuja, joilla linnut istuvat. '
            + 'Tornit ovat viisitoista metriä korkeita.',
          lahde: 'Chainwit., Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Kaikki hyllyt ovat samassa salissa',
          tiedosto: 'Qatar National Library.jpg',
          teksti: 'Qatarin kansalliskirjasto avattiin Education Cityssä '
            + 'huhtikuussa 2018. Talon piirsi hollantilainen Rem '
            + 'Koolhaas, eivätkä kirjat ole erillisissä huoneissa vaan '
            + 'yhdessä isossa salissa, jonka poikki hyllyrivit kulkevat '
            + 'suorina. Avausvuonna hyllyillä oli yli 800 000 kirjaa ja '
            + 'lisäksi puoli miljoonaa sähkökirjaa, lehteä ja '
            + 'erikoiskokoelmien nidettä. Sama talo hoitaa kolmea '
            + 'tehtävää: se on kansalliskirjasto, yliopistokirjasto ja '
            + 'kaupunginkirjasto, ja kirjastokortin saa jokainen maassa '
            + 'vakinaisesti asuva. Perintökokoelmassa on noin 2 400 '
            + 'käsikirjoitusta sekä karttoja ja matkakertomuksia, joita '
            + 'Persianlahdelle tulleet kirjoittivat vuosisatojen mittaan.',
          selite: 'Kirjastosali ylhäältä. Pitkät valkoiset hyllyrivit '
            + 'jatkuvat läpi salin, kirjat täyttävät ne reunaa myöten, ja '
            + 'taustalla erottuu lukupöytiä ja kävijöitä.',
          lahde: 'En Merker, Wikimedia Commons (CC0)',
        },
        {
          otsikko: 'Katsomo, jossa kaksi rakennustapaa kohtaa',
          tiedosto: 'Outside the Amphitheatre, Katara (10995278063).jpg',
          teksti: 'Kataran kulttuurikylä avattiin lokakuussa 2010 rannalle '
            + 'täytetylle maalle. Se on rakennettu matalaksi kyläksi: '
            + 'hiekanvärisiä taloja, tasakattoja, varjoisia kujia ja '
            + 'sisäpihoja. Keskellä on marmorista muurattu amfiteatteri, '
            + 'jonka ala on 3 275 neliömetriä ja johon mahtuu 5 000 '
            + 'katsojaa. Muoto on lainattu kahdesta suunnasta: pyöreä '
            + 'katsomo ja pylväät ovat antiikin Kreikasta, kaarien '
            + 'teräväkärkinen muoto ja parvekkeet arabialaisesta '
            + 'rakennustavasta. Ensimmäinen Qatarissa esitetty ooppera '
            + 'nähtiin täällä lokakuussa 2012, kun ohjelmassa oli Verdin '
            + 'Aida. Kylässä on lisäksi maan ainoa oopperatalo, jossa on '
            + '550 paikkaa.',
          selite: 'Amfiteatterin ulkoseinä vaaleaa kiveä. Pylväiden päissä '
            + 'ovat kierteiset kreikkalaiset kapiteelit, ja niiden '
            + 'välissä syvennykset päättyvät ylöspäin teräväksi kaareksi. '
            + 'Alla on punaisia penkkejä ja sinisiä ruukkuja.',
          lahde: 'Paul Trafford, Wikimedia Commons (CC BY 2.0)',
        },
        {
          otsikko: 'Asemat tunnistaa muodosta',
          tiedosto: 'Al Sadd Metro Station 3.jpg',
          teksti: 'Dohan metro avattiin 8. toukokuuta 2019. Kolme linjaa — '
            + 'punainen, vihreä ja kulta — kohtaavat yhdessä ainoassa '
            + 'paikassa: Msheirebin asemalla vanhan keskustan alla. Rataa '
            + 'on noin 76 kilometriä ja asemia 37, ja junat kulkevat '
            + 'sadan kilometrin tuntinopeudella. Asemat tunnistaa jo '
            + 'kadulta. Sisäänkäynnin katto nousee korkeaksi holviksi, '
            + 'jonka kaaret leviävät ylöspäin kuin teltan tangot, ja '
            + 'seinänä on reikäkuvioitua lasia, joka päästää valon läpi '
            + 'mutta pitää auringon ulkona. Pimeällä kaaret valaistaan '
            + 'sisältä, ja asema hehkuu kadulle lyhtynä.',
          selite: 'Al Saddin metroaseman sisäänkäynti illalla. Kullanruskeat '
            + 'kaaret nousevat holviksi, vasemmalla on reikäkuvioitua '
            + 'lasiseinää ja sen takana metron punainen tunnus; oikealla '
            + 'näkyy kauppakeskuksen julkisivu ja Qatarin lippuja.',
          lahde: 'Thameur Belghith, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'ruoka',
      nimi: 'Ruoka',
      johdanto: 'Qatarilainen ateria tuodaan pöytään yhdellä isolla vadilla, ja '
        + 'sen ympärille kokoonnutaan yhdessä. Kala ostetaan aamun '
        + 'torilta, ja makeisilla on oma iltansa kerran vuodessa.',
      nostot: [
        {
          otsikko: 'Riisi ja liha samassa padassa',
          tiedosto: 'Qatari machbous served at a wedding.png',
          teksti: 'Madžbus on Qatarin kansallisruoka: riisiä, lihaa, sipulia '
            + 'ja tomaattia. Nimi tulee arabian sanasta, joka tarkoittaa '
            + 'painamista — kaikki ainekset kypsennetään puristettuina '
            + 'samaan pataan. Mausteseos on nimeltään bizar, ja siihen '
            + 'kuuluu muun muassa mustapippuria, korianterinsiemeniä, '
            + 'kanelia, kardemummaa, chiliä ja kurkumaa. Kanasta tehtyyn '
            + 'annokseen pannaan koko lintu. Vati kannetaan pöydän '
            + 'keskelle, ja siitä syödään yhdessä käsin. Ruokaa tehdään '
            + 'aina enemmän kuin syöjiä riittää: sen loppuminen kesken '
            + 'olisi isännälle nolo asia.',
          selite: 'Iso metallivati keskellä katettua pöytää. Keltaisen riisin '
            + 'päällä on kokonaisia paistettuja kanoja ja lihapaloja, ja '
            + 'vadin ympärillä on pieniä sivukulhoja ja lautasia.',
          lahde: 'Dana Club Doha @ YouTube, Wikimedia Commons (CC BY 3.0)',
        },
        {
          otsikko: 'Torin halutuin kala vaihtaa sukupuolta',
          tiedosto: 'Varieties of Hamour Fish.jpg',
          teksti: 'Hamour on Persianlahden nimi meriahvenille, ja se on Dohan '
            + 'kalatorin halutuin kala. Myynnissä olevat yksilöt ovat '
            + 'useimmiten nuoria ja pilkukkaita: ostaja valitsee kalan '
            + 'laatikosta, ja se punnitaan ja perataan siinä samassa. '
            + 'Täysikasvuinen hamour voi kasvaa 120 senttimetriä pitkäksi '
            + 'ja painaa viisitoista kiloa. Laji aloittaa elämänsä usein '
            + 'naaraana ja vaihtaa koiraaksi vasta noin 67 senttimetrin '
            + 'mitassa ja seitsemän ja puolen vuoden iässä. Kutuaika osuu '
            + 'lahdella maaliskuun ja kesäkuun väliin, ja pyynti on ollut '
            + 'niin kovaa, että isot yksilöt ovat käyneet harvinaisiksi.',
          selite: 'Kalakauppias pitelee kahta nuorta hamouria Dohan '
            + 'kalatorilla. Kalojen kyljet ovat vaaleanruskeita ja täynnä '
            + 'tummia pilkkuja, ja taustalla on jäälaatikoissa muita '
            + 'kaloja ja katkarapuja sekä hintalappu, jossa lukee 45.',
          lahde: 'Abedwayyad, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Pussi kaulassa ovelta ovelle',
          tiedosto: 'Garangao bags given out during a festival in Qatar.png',
          teksti: 'Garangao vietetään paastokuukauden viidentenätoista yönä, '
            + 'kun ramadanista on kulunut puolet. Lapset pukeutuvat '
            + 'värikkäisiin juhlavaatteisiin ja kiertävät naapuritalojen '
            + 'ovilla laulamassa, ja lauluissa toivotetaan perheen '
            + 'nuorimmille terveyttä. Palkaksi pussiin tulee makeisia ja '
            + 'pähkinöitä. Ennen jaettiin saksanpähkinöitä, manteleita ja '
            + 'kikherneitä, nykyään enimmäkseen karkkia. Nimi tulee '
            + 'arabian sanasta, joka tarkoittaa helinää tai ravistelua. '
            + 'Tytöillä on illassa usein kultaketjuinen päähine, ja '
            + 'nykyään myös kauppakeskukset järjestävät omia '
            + 'garangao-tilaisuuksiaan.',
          selite: 'Rivikaupalla sinisiä ja violetteja harsopusseja, joiden '
            + 'suu on kiristetty kultanauhalla ja solmittu rusetiksi. '
            + 'Pussit odottavat jakoa garangao-illassa Dohassa.',
          lahde: 'Dana Club Doha @ YouTube, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      tehtava: {
        kysymys: 'Kuinka pitkäksi hamour-kala voi kasvaa?',
        vaihtoehdot: [
          '30 senttimetriä',
          '60 senttimetriä',
          '120 senttimetriä',
          '250 senttimetriä',
        ],
        oikea: 2,
        fakta: 'Torilla myytävät hamourit ovat useimmiten nuoria, koska '
          + 'täyteen mittaan ehtii kasvaa yhä harvempi kala.',
      },
    },
  ],
  /*
   * NIKOSIAN KANSISIVU (nippu 2, 12.8.2026). Aihesivun id on valittu
   * niin, ettei se peitä CYP-maalehden omaa sivua (rakennaSivut):
   * maalehdellä on muinaisuus, kirkot, luonto, kasityo ja ruoka.
   * Jakoa ei käsitellä — ks. nahtavyysjutut.js:n nikosia-kommentti.
   */
  nikosia: [
    {
      id: 'kaupunki',
      nimi: 'Nikosia',
      johdanto: 'Nikosia on Kyproksen hallinnon ja rahan kaupunki: saaren '
        + 'kaikkien pankkien pääkonttorit ovat täällä, samoin viisi '
        + 'yliopistoa ja saaren vanhin ja suurin arkeologinen museo.',
      kansikuvat: [
        {
          tiedosto: 'Nicosia\'s skyline 2024.jpg',
          selite: 'Näkymä yli keskustan kattojen auringonlaskun aikaan: '
            + 'etualalla matalia tiili- ja tasakattoja vesisäiliöineen, '
            + 'takana muutama lasitorni ja horisontissa vuorijono.',
          lahde: 'PomposPompou, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'A house with a palm tree in the Arab Quarter, North Nicosia, Cyprus.jpg',
          selite: 'Kivetty kuja Arabahmetin korttelissa. Vasemmalla on '
            + 'valkoiseksi rapattu talo, jonka ikkunanpuitteet ja '
            + 'säleluukut on maalattu keltaisiksi ja jonka tiilikaton '
            + 'takaa nousee palmu; katoksen alle on pysäköity auto. '
            + 'Oikealla erottuu turkoosiksi maalattu umpierkkeri ja kujan '
            + 'päässä toinen auto.',
          lahde: 'Michal Klajban, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Izgled-Old House Nicosia-6.jpg',
          selite: 'Vanhan talon pyöristetty kulma vanhassakaupungissa. '
            + 'Alhaalla on avoin loggia, jonka perällä näkyy ovi, ja sen '
            + 'päälle työntyy parveke valkoisine pylväskaiteineen. '
            + 'Kannattimina on kierrekoristeisia kivikonsoleita, '
            + 'ikkunoissa puiset säleluukut, ja julkisivun poikki kulkee '
            + 'sähköjohtoja.',
          lahde: 'Молли, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Tulkin talo vaihtoi omistajaa kahdesti',
          tiedosto: 'Etnografski-Facade2.jpg',
          teksti: 'Hadjigeorgakis Kornesios toimi Kyproksen dragomaanina eli '
            + 'hallinnon tulkkina vuosina 1779–1809, ja noin vuonna 1796 '
            + 'sulttaani Selim III nimitti hänet virkaan elinikäisesti. '
            + 'Kartanonsa hän rakennutti Agios Antonioksen kaupunginosaan '
            + 'arkkipiispan asunnon lähelle. Vuoden 1804 kapinassa '
            + 'väkijoukko murtautui taloon ja ryösti sen, ja perhe pakeni '
            + 'Konstantinopoliin. Hänet teloitettiin siellä vuonna 1809, '
            + 'omaisuus takavarikoitiin ja talo meni kaupaksi 13 000 '
            + 'kuruşilla; nuorin poika osti sen takaisin vuonna 1830. '
            + 'Viimeinen asukas kuoli 1979, ja nyt talossa on etnologinen '
            + 'museo. Kunnostuksesta myönnettiin Europa Nostra -palkinto.',
          selite: 'Kartanon katujulkisivu. Ylhäällä työntyy ulos umpinainen '
            + 'puinen erkkeri, jonka luukut ovat kiinni, alempana on '
            + 'ristikoin varustettuja ikkunoita, ja oikealla erottuu '
            + 'teräväkaarinen oviaukko.',
          lahde: 'Молли, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Kangaskauppa muutti kirkon holvien alle',
          tiedosto: 'Bedestan Nicosia (42819030095).jpg',
          teksti: 'Vanhan kaupungin Bedestenin sisällä on paloja '
            + 'bysanttilaisesta basilikasta, joka ajoitetaan 500-luvulle. '
            + 'Sen tilalle rakennettiin kirkko, jota laajennettiin '
            + '1100–1500-luvuilla. Koristeellisin osa on '
            + 'pohjoisjulkisivu: goottilainen portaali, sen molemmin '
            + 'puolin sukujen vaakunat, Pyhän Nikolaoksen pienoispatsas '
            + 'sekä eläinhahmoja ja vedenheittäjiä. Vuonna 1573 talo '
            + 'annettiin bedesteniksi eli katetuksi kangaskaupaksi, ja '
            + '1760-luvulla siellä kävivät kauppaa turkkilaiset, '
            + 'kreikkalaiset ja armenialaiset kauppiaat. Vuonna 1873 se '
            + 'oli jauhovarasto. Kunnostus kesti 2004–2009, ja sen '
            + 'suunnittelutyö sai Europa Nostra -palkinnon; nyt talossa '
            + 'on kulttuurikeskus.',
          selite: 'Bedestenin kaaririvi hunajanväristä kiveä. Kaksi '
            + 'vasemmanpuoleista teräväkärkistä kaarta on suljettu '
            + 'lasilla, yläpuolella kulkee kunnostuksessa lisätty '
            + 'peltikatto säleikköineen, ja oikealla nousee palmu. '
            + 'Pihamaalla on irtonaisia kivilohkareita ja ruukkukasveja.',
          lahde: 'dronepicr, Wikimedia Commons (CC BY 2.0)',
        },
        {
          otsikko: 'Kaaririvit ovat 1950-luvun työtä',
          tiedosto: 'Nikosia Erzbischöfliches Palais 1.jpg',
          teksti: 'Arkkipiispan palatsi rakennettiin vuosina 1956–1960 '
            + 'vanhan, 1600-luvulta olevan arkkipiispantalon viereen. '
            + 'Tyyli on uusbysanttilainen: kahdessa kerroksessa kulkee '
            + 'kaariaukkojen rivi, kivi on hiekankeltaista ja katto '
            + 'tiiltä. Yleispiirustukset laati Ateenassa työskennellyt '
            + 'George Nomikos, ja muun arkkitehtityön tekivät '
            + 'limassolilaiset Nicholas S. Roussos ja John Pericleous. '
            + 'Itse palatsiin ei pääse sisään, mutta samalla tontilla '
            + 'ovat yleisölle avoimet bysanttilainen museo, '
            + 'arkkipiispanistuimen kirjasto ja kansantaiteen museo.',
          selite: 'Palatsin pitkä julkisivu hämärtyvässä valossa. Kummassakin '
            + 'kerroksessa on rivi kaariaukkoja, kivi on hiekankeltaista '
            + 'ja katto tiiltä; kadun puolella on koristeellinen '
            + 'rautaportti.',
          lahde: 'Zairon, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki',
      johdanto: 'Nikosia on Mesaorian tasangolla, jonka nimi tarkoittaa vuorten '
        + 'välistä. Tasanko on lähes puuton, ja kaupungin pinta-alasta on '
        + 'puiden alla kolme prosenttia — vähemmän kuin missään muussa '
        + 'Euroopan pääkaupungissa.',
      nostot: [
        {
          otsikko: 'Kortteli, jossa autot eivät kulje',
          tiedosto: 'Laiki Geitonia by Georgy90 - panoramio.jpg',
          teksti: 'Laiki Geitonia on vanhankaupungin kävelykortteli, joka '
            + 'alkaa Eleftherian aukiolta ja jatkuu noin 300 metriä. '
            + 'Talot ovat 1700-luvun lopulta, ja rakennusaineina ovat '
            + 'puu, hiekkakivi ja savitiili; kunnostettuja taloja '
            + 'pidetään esimerkkinä perinteisestä kyproslaisesta '
            + 'kaupunkirakentamisesta. Kujat ovat kapeita ja '
            + 'mutkittelevia, ja asuintalojen välissä on käsityöpajoja, '
            + 'matkamuistoliikkeitä ja tavernoja. Korttelissa on myös '
            + 'kaupungin tärkein matkailuneuvonta, ja opastetut '
            + 'kävelykierrokset lähtevät sieltä maanantaisin, torstaisin '
            + 'ja perjantaisin.',
          selite: 'Kapea kuja korttelissa: keskellä kasvaa appelsiinipuita '
            + 'hedelmineen, vasemmalla on talo, jonka nurkat on ladottu '
            + 'hiekkakivestä, ja seinässä roikkuu lyhty ja takorautainen '
            + 'kylttivarsi.',
          lahde: 'Georgy Papantoniou, Wikimedia Commons (CC BY 3.0)',
        },
        {
          otsikko: 'Saaren pisin joki kulkee kuivana',
          tiedosto: 'Řeka Pedieos, Nicosia, Kypr 2.jpg',
          teksti: 'Pedieos on Kyproksen pisin joki, 98 kilometriä. Se alkaa '
            + 'Troodoksen Machairas-metsästä samannimisen luostarin '
            + 'läheltä, virtaa koilliseen Mesaorian tasangon poikki '
            + 'Nikosian halki ja kääntyy sitten itään kohti Famagustan '
            + 'lahtea. Uoma on siirretty pois vanhankaupungin vierestä '
            + '1500-luvulla. Suurin osa saaren 35 joesta ja purosta on '
            + 'tilapäisiä ja kuivuu kesäksi, ja Nikosiassa mitattiin 4. '
            + 'syyskuuta 2020 lämpötila 46,2 astetta, koko Kyproksen '
            + 'korkein lukema. Jokivartta on muutettu kävelyreitiksi 18 '
            + 'kilometrin matkalta.',
          selite: 'Uoma keskellä eukalyptuslehtoa: vettä on vain kapea nauha '
            + 'betonikourun pohjalla, rannat ovat hiekkaa ja kuivia '
            + 'oksia, ja yläreunassa erottuu kulkupolku.',
          lahde: 'Fry72, Karel Frydrýšek, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Sinettivahasta koneisiin',
          tiedosto: 'Laiki Geitonia - panoramio (3).jpg',
          teksti: 'Kyproksen postimuseo avattiin vuonna 1981, ja se toimii '
            + 'vanhan kartanon pohjakerroksessa Laiki Geitonian '
            + 'kortteleissa. Vanhimmat esineet ovat 1400-luvulta: silloin '
            + 'saaren postinkulku järjestettiin ensimmäisen kerran '
            + 'venetsialaisten aikana. Kokoelmassa on vanhin kyproslainen '
            + 'merkkisarja, jossa on kuningatar Viktorian kuva ja sana '
            + 'Cyprus, sekä vuoden 1928 sarja, joka tehtiin varta vasten '
            + 'Kyprokselle ja jossa on saaren monumentteja. Esillä on '
            + 'myös kirjeiden varmistamista sinettivahasta koneisiin, '
            + 'vaakoja ja alan kirjallisuutta.',
          selite: 'Kujan varressa seisoo punaiseksi maalattu valurautainen '
            + 'pylväspostilaatikko tiilisen istutuslaatikon vieressä. '
            + 'Takana on matkailuneuvonnan kyltti ja kunnostettuja '
            + 'taloja, joissa on puiset ikkunaluukut.',
          lahde: 'Georgy Papantoniou, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      tehtava: {
        kysymys: 'Kuinka pitkä Pedieos-joki on?',
        vaihtoehdot: [
          '48 kilometriä',
          '78 kilometriä',
          '98 kilometriä',
          '128 kilometriä',
        ],
        oikea: 2,
        fakta: 'Joki on suuren osan vuotta kuiva, ja sen vartta on '
          + 'muutettu kävelyreitiksi 18 kilometrin matkalta.',
      },
    },
  ],
  /*
   * KUWAITIN KANSISIVU (nippu 2, 12.8.2026). Aihesivun id on arki,
   * koska KWT-maalehdellä on linnut, aavikko, rakennukset ja ruoka
   * — sama id kaupungilla peittäisi maan sivun (rakennaSivut).
   */
  kuwait: [
    {
      id: 'kaupunki',
      nimi: 'Kuwait',
      johdanto: 'Kuwait on lahden pohjukan kaupunki, jossa maailman suurimmaksi '
        + 'rakennettu puulaiva seisoo kuivalla maalla, parlamenttitalon '
        + 'katto on valettu betonista teltan muotoon ja tunnetuin museo '
        + 'on kokonaan maan alla.',
      kansikuvat: [
        {
          tiedosto: 'Al-Hashemi-II (ship).jpg',
          selite: 'Al-Hashemi-II mereltä nähtynä. Kaksimastoinen puulaiva '
            + 'seisoo kivisen rantamuurin takana kuivalla maalla, ja '
            + 'perän kaiverrettu punaruskea korokeosa kohoaa muuta runkoa '
            + 'korkeammalle.',
          lahde: 'Photographer: Mosbatho, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Silver Jewellery in the TRM.jpg',
          selite: 'Hopeakorusali Tareq Rajab -museossa. Vitriineissä on '
            + 'pinkkiä ja sinistä taustaa vasten kaulakoruja ja isoja '
            + 'rintakoruja, joista riippuu rivi hopeakiekkoja, ja käytävä '
            + 'jatkuu pimeänä.',
          lahde: 'Tnrajab, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'TSCK Kuwait Old Building.jpg',
          selite: 'Tieteen keskus Salmiyassa ilmasta nähtynä. Valkoiset '
            + 'purjemaiset katokset peittävät rakennuksen, viereiseen '
            + 'satamaan on ankkuroitu puisia purjelaivoja, ja takana '
            + 'kulkee rantatie tornitalojen ohi.',
          lahde: 'TSCKuwait, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Laivaa ei ole koskaan laskettu vesille',
          tiedosto: 'Hawalli Al-Hashemi II Exterior Aft 1.jpg',
          teksti: 'Al-Hashemi-II on rakennettu dhow-laivan muotoon, mutta se '
            + 'ei ole koskaan ollut vedessä. Husain Marafie tilasi '
            + 'laivan, suunnittelu alkoi 1985 ja rakennustyöt 1997. '
            + 'Guinnessin ennätysluetteloon pituudeksi kirjattiin 80,4 '
            + 'metriä ja leveydeksi 18,7 metriä, ja työ maksoi yli '
            + 'kolmekymmentä miljoonaa dollaria. Runko tilkittiin vanhaan '
            + 'tapaan vesitiiviiksi, vaikka laiva jäi maalle. Nyt se '
            + 'seisoo rantahotellin vieressä, ja sisällä on juhlasali ja '
            + 'merenkulkumuseo. Peräpeiliin on veistetty kukkakiehkuroita '
            + 'ja rivi kaari-ikkunoita, ja niiden yläpuolella on silmä.',
          selite: 'Al-Hashemi-II:n perä alhaalta katsottuna. Punaruskeaan '
            + 'puuhun on kaiverrettu kasviaiheita ja kaari-ikkunoita, '
            + 'nimi on maalattu kullalla, ja rungon alla näkyy ovi '
            + 'juhlasaliin.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
        {
          otsikko: 'Museo on maanpinnan alapuolella',
          tiedosto: 'Manuscripts in the TRM.jpg',
          teksti: 'Jabriyan asuinkorttelissa on huvila, jonka kokoelma on '
            + 'kokonaan maanpinnan alapuolella. Tareq Rajab -museo '
            + 'avattiin 1980, ja se oli ensimmäinen islamilaisen taiteen '
            + 'museo Kuwaitissa ja koko Persianlahden alueella. Kokoelma '
            + 'on yhden pariskunnan keräämä: Tareq ja Jehan Rajab ajoivat '
            + '1960-luvulla autolla Syyriaan, Iraniin ja Turkkiin ja '
            + 'ostivat esineitä kauppiailta ja kylistä. Vitriineissä on '
            + 'Koraaneja 600-luvulta alkaen, keramiikkaa, aseita, pukuja '
            + 'ja yksi maailman laajimmista hopeakorukokoelmista. Museota '
            + 'rahoittaa yhä sama perhe, ja kalligrafialle avattiin 2007 '
            + 'oma talo samaan kaupunginosaan.',
          selite: 'Käsikirjoitussali museon alakerrassa. Lasivitriinit '
            + 'muodostavat pitkiä rivejä, seinillä on kehystettyjä '
            + 'käsikirjoituslehtiä tummansinistä taustaa vasten, ja '
            + 'edessä on metallinen eläinhahmo ja suitsutusastia.',
          lahde: 'Tnrajab, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Parlamentti rakennettiin basaarikadun ympärille',
          tiedosto: 'Kuwait City Arabian Gulf Street 10.jpg',
          teksti: 'Kansalliskokouksen talon suunnitteli tanskalainen Jørn '
            + 'Utzon, sama arkkitehti kuin Sydneyn oopperatalon. '
            + 'Piirustukset syntyivät 1972, työt alkoivat heinäkuussa '
            + '1978 ja talo valmistui 1982 hänen poikansa Janin johdolla. '
            + 'Keskellä kulkee 130 metriä pitkä ja 10 metriä leveä '
            + 'katettu käytävä, jonka esikuva on Isfahanin basaari; '
            + 'istuntosalissa ei ole yhtään ikkunaa, ja valo tulee '
            + 'katolle nostetuista puolikkaista tynnyriholveista. '
            + 'Betoniosia valettiin valmiiksi 12 800 kappaletta 150 '
            + 'perusmallista. Meren puolella katto nousee ylöspäin kuin '
            + 'teltan kangas.',
          selite: 'Kansalliskokouksen talo Arabianlahden rantakadun varrella. '
            + 'Valkoisen betonisiiven viisto katto päättyy laskostettuun '
            + 'reunaan, vasemmalla on kaariholvinen matalampi osa, ja '
            + 'edessä kasvaa palmuja tyhjän kadun laidalla.',
          lahde: 'Zairon, Wikimedia Commons (CC BY 4.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki',
      johdanto: 'Kuwait Cityn arki jakautuu kahtia vuodenajan mukaan: kesällä '
        + 'päivä vietetään sisällä ja talvella aamut alkavat sumusta. '
        + 'Sisätiloista on tehty katuja, ja rannalla on satama vanhoille '
        + 'laivoille.',
      nostot: [
        {
          otsikko: 'Heinäkuussa 46 astetta, tammikuussa neljä pakkasta',
          tiedosto: 'Misty Jan morning in kuwait 2013 (3).jpg',
          teksti: 'Kuwait Cityn heinäkuun keskimääräinen ylin lämpötila on '
            + '46,6 astetta ja yön alin 30,4. Tammikuussa vastaavat luvut '
            + 'ovat 19,6 ja 7,6, ja koko mittaushistorian alin lukema on '
            + 'niin ikään tammikuulta: neljä astetta pakkasta. Sadepäiviä '
            + 'kertyy vuodessa yhdeksäntoista, ja kesäkuun ja syyskuun '
            + 'välillä sadetta ei mitata lainkaan. Ilmankosteus kääntyy '
            + 'vuodenajan mukana: tammikuussa se on 65 prosenttia, '
            + 'kesäkuussa 16. Aurinkoa paistaa vuodessa noin kolmetuhatta '
            + 'tuntia, eli keskimäärin runsaat kahdeksan tuntia päivässä.',
          selite: 'Sumuinen tammikuun aamu kaupungin laidalla. Valtatiellä '
            + 'ajaa auto takavalot palaen, tienvarren pensasrivi ja '
            + 'yksinäinen puu häviävät sumuun, ja hiekan päällä kasvaa '
            + 'talven vihreä ruoho.',
          lahde: 'irvin calicut, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Katu, jonka päälle on vedetty katto',
          tiedosto: 'Grand Avenue in Kuwait.jpg',
          teksti: 'Rain kaupunginosassa on The Avenues, joka avattiin '
            + 'huhtikuussa 2007 ja jota on laajennettu kolmesti: 2009, '
            + '2012 ja 2018. Koko alue on noin 1,2 miljoonaa neliömetriä '
            + 'ja jakautuu kuuteentoista osaan, liikkeitä on yli 1 400 ja '
            + 'pysäköintipaikkoja lähes 17 000 autolle. Osa käytävistä on '
            + 'tehty kadun näköisiksi. Grand Avenuen keskellä kasvaa '
            + 'palmuja, kahviloiden edessä on päivänvarjoja, ja '
            + 'parvekkeet seuraavat toisiaan kuin talorivit. Katto on '
            + 'läpikuultavaa muovikalvoa, jota tähän yhteen kattoon meni '
            + '74 500 neliömetriä.',
          selite: 'Grand Avenuen sisäkatu ylhäältä. Läpikuultava valkoinen '
            + 'kattoholvi kaartuu käytävän yllä, keskellä kasvaa palmu, '
            + 'kahviloiden edessä on punaisia päivänvarjoja, ja ihmiset '
            + 'kävelevät kahdessa kerroksessa.',
          lahde: 'EnGxBaDeR, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Hai kulkee katsojan yläpuolelta',
          tiedosto: 'Sharks - Mijbil Almutawa Aquarium.jpg',
          teksti: 'Salmiyan rannalla oleva Tieteen keskus avattiin vuonna '
            + '2000. Tontti on 80 000 neliömetriä ja rakennus 18 000, ja '
            + 'talossa on kolme osaa: akvaario, tiedenäyttely ja '
            + 'IMAX-teatteri. Akvaariossa elää yli sata eläinlajia, ja '
            + 'suuren kaarevan ikkunan takaa hait näkyvät alhaaltapäin. '
            + 'Ulkona on satama, jossa seisoo vanhoja puulaivoja. Niistä '
            + 'tunnetuin on Fateh Al-Khayr, 226 tonnin boum, joka '
            + 'rakennettiin Kuwaitissa 1938 ja myytiin 1952 iranilaiselle '
            + 'kapteenille. Merihistorioitsija Yacoub al-Hijji löysi sen '
            + '1994, ja kahden vuoden kunnostuksen jälkeen se on ainoa '
            + 'jäljellä oleva kuwaitilainen purjelaiva öljyä edeltävältä '
            + 'ajalta.',
          selite: 'Kaksi haita akvaarion ikkunan takana. Ne uivat katsojan '
            + 'yläpuolella sinisessä vedessä, valo lankeaa pinnasta '
            + 'juovina, ja alalaidassa erottuu korallia ja pieniä kaloja.',
          lahde: 'TSCKuwait, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      tehtava: {
        kysymys: 'Kuinka monena päivänä vuodessa Kuwait Cityssä sataa?',
        vaihtoehdot: [
          'Yhdeksäntoista',
          'Neljäkymmentä',
          'Kahdeksankymmentä',
          'Sata',
        ],
        oikea: 0,
        fakta: 'Sade osuu marraskuun ja huhtikuun väliin; kesäkuusta '
          + 'syyskuuhun sadetta ei mitata lainkaan.',
      },
    },
  ],
  /*
   * MASQATIN KANSISIVU (nippu 2, 12.8.2026). Aihesivun id on arki,
   * koska OMN-maalehdellä on vuoret, meri, historia ja luonto —
   * sama id kaupungilla peittäisi maan sivun (rakennaSivut).
   */
  masqat: [
    {
      id: 'kaupunki',
      nimi: 'Masqat',
      johdanto: 'Masqat on pääkaupunki, jossa tunnetuimmat rakennukset ovat '
        + 'nuoria: seremoniapalatsi valmistui 1972, suurmoskeija 2001 ja '
        + 'oopperatalo 2011.',
      kansikuvat: [
        {
          tiedosto: 'Palacio de Al Alam, Mascate, Omán, 2024-08-14, DD 29.jpg',
          selite: 'Al Alamin palatsi aukion perällä. Molemmin puolin aukiota '
            + 'jatkuu valkoinen kaarikäytävä, keskellä on punaruskeaksi '
            + 'kivetty ajotie ja kaksi riviä leikattuja puita, ja '
            + 'palatsin takaa erottuu paljas vuorenharjanne.',
          lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Royal Opera House Muscat, Muscat, Sultanate of Oman.jpg',
          selite: 'Oopperatalon katsomo permannolta ylöspäin kuvattuna. Kolme '
            + 'parvea kaartuu salin ympäri, puupinnat on jaettu '
            + 'kullattuihin ruutuihin, penkit ovat punaiset ja '
            + 'keskimmäisen parven etureunassa on kullattu tunnus.',
          lahde: 'Chief National Guard Bureau, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'Riyam Park with incense burner Mabkhara (47954080007).jpg',
          selite: 'Suitsukeastian muotoinen monumentti paljaan kalliokummun '
            + 'laella Riyamin puistossa. Valkoisen astian kuvussa on '
            + 'kaarevat aukot, ja alhaalla on puistoa: kukkapenkkejä, '
            + 'palmuja ja mustaksi maalattu rauta-aita.',
          lahde: 'Eduard Marmet, Wikimedia Commons (CC BY 2.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Varastokin kuuluu näyttelyyn',
          tiedosto: 'National museum of Oman in Muscat (53697743211).jpg',
          teksti: 'Omanin kansallismuseo avattiin vanhassa Maskatissa 30. '
            + 'heinäkuuta 2016; perustamisasetus oli annettu kolme vuotta '
            + 'aiemmin. Rakennuksen pinta-ala on 13 700 neliömetriä, ja '
            + 'siitä 4 000 neliötä on jaettu neljääntoista pysyvään '
            + 'näyttelysaliin. Esineitä on 5 466, ja niiden rinnalla '
            + 'saleissa on 43 digitaalista esityspistettä. '
            + 'Kokoelmavarasto on avointa tilaa: kävijälle näytetään myös '
            + 'se työ, joka esineelle tehdään ennen kuin se pääsee '
            + 'vitriiniin. Museo oli ensimmäinen Lähi-idässä, jonka '
            + 'opasteissa on näkövammaisille tarkoitettua arabiankielistä '
            + 'pistekirjoitusta.',
          selite: 'Kansallismuseon julkisivu vaaleaa kiveä: keskellä on '
            + 'korkea teräväkärkinen kaari, sivuilla holvikäytävät ja '
            + 'päissä torneiksi korotetut osat. Katolla liehuu Omanin '
            + 'lippu, ja takana nousee paljas ruskea vuorenrinne. '
            + 'Portaiden edessä kulkee rivi mustia pollareita ja ketjuja, '
            + 'asfaltilla on keltaisia liikennekartioita ja etualalla '
            + 'punertava kiveys.',
          lahde: 'dronepicr, Wikimedia Commons (CC BY 2.0)',
        },
        {
          otsikko: 'Turandot avasi talon',
          tiedosto: 'Royal Opera House Muscat 2.jpg',
          teksti: 'Sulttaani Qaboos määräsi vuonna 2001 rakennettavaksi '
            + 'talon, jonka työnimi oli Musiikkitaiteiden talo. Se '
            + 'avattiin 12. lokakuuta 2011 Puccinin Turandotilla, jota '
            + 'johti Plácido Domingo. Saliin mahtuu enintään 1 100 '
            + 'kuulijaa. Talo oli maailmassa ensimmäinen, johon '
            + 'asennettiin Radio Marconin Mode23-järjestelmä: jokaisen '
            + 'penkin selkänojassa on oma näyttö. Ensimmäisellä kaudella '
            + 'lavalla nähtiin Domingon lisäksi Andrea Bocelli ja Renée '
            + 'Fleming, myöhemmin muun muassa sellisti Yo-Yo Ma ja '
            + 'Mariinski-teatterin Joutsenlampi.',
          selite: 'Oopperatalon aula ennen esitystä. Marmoriportaat nousevat '
            + 'kahtaalle punaista mattoa pitkin, seinissä on tummasta '
            + 'puusta tehtyjä teräväkärkisiä kaaria ja katossa maalattuja '
            + 'palkkeja; alhaalla odottaa yleisöä.',
          lahde: 'Juozas Šalna, Wikimedia Commons (CC BY 2.0)',
        },
        {
          otsikko: 'Yksi matto peittää koko lattian',
          tiedosto: 'Muscat, moschea del sultano qaboos, interno, grande sala di preghiera 01.jpg',
          teksti: 'Sulttaani Qaboosin suurmoskeija Bawsharissa vihittiin 4. '
            + 'toukokuuta 2001. Rukoussali on 4 343 neliömetriä, ja sen '
            + 'lattian peittää yksi ainoa matto: siinä on 1,7 miljoonaa '
            + 'solmua, se painaa 21 tonnia ja sen kutomiseen meni neljä '
            + 'vuotta yli kuudeltasadalta tekijältä. Sävyjä on 28, '
            + 'enimmäkseen kasvivärejä. Katosta riippuu 14 metriä korkea '
            + 'kruunu, jossa on 600 000 kristallia ja 1 122 lamppua, ja '
            + 'kruunun sisällä on portaat, joita pitkin lamput '
            + 'vaihdetaan. Samanlaisia pienempiä kruunuja on talossa 34.',
          selite: 'Suurmoskeijan päärukoussali. Kupolin keskeltä riippuu '
            + 'jättimäinen kristallikruunu, holvit on peitetty vihreällä '
            + 'ja kullalla, perällä erottuu mihrab-syvennys, ja kävijät '
            + 'kulkevat maton yli levitettyä sinistä kaistaa pitkin.',
          lahde: 'Francesco Bini, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki',
      johdanto: 'Omanilaisen miehen juhlapuvussa on kolme osaa, joilla '
        + 'jokaisella on oma nimensä, ja vieraan vastaanotossa on oma '
        + 'järjestyksensä. Molemmat ovat Masqatissa yhä tavallista arkea.',
      nostot: [
        {
          otsikko: 'Kahvi kuului naapuriin ennen kuin se tuoksui',
          tiedosto: 'Al Dallah, Bait al Zubair Museum, Oman.jpg',
          teksti: 'Kahwa keitetään vaaleiksi paahdetuista pavuista ja '
            + 'maustetaan kardemummalla. Sitä ei suodateta, joten juoma '
            + 'on väkevää ja katkeraa, ja vastapainoksi pöytään tulee '
            + 'taateleita ja omanilaista halwaa. Keittoastian nimi on '
            + 'dallah, ja sen tunnistaa kaarevasta nokasta ja '
            + 'saranoidusta kannesta. Pavut paahdettiin ennen '
            + 'pitkävartisella rautapannulla ja survottiin puisessa '
            + 'huhmaressa. Huhmaren kalkkeesta naapurit tiesivät, että '
            + 'kahvia on tulossa ja että vieraat ovat tervetulleita. '
            + 'Kuppi, finjan, on pieni ja korvaton.',
          selite: 'Kuparista ja messingistä tehty dallah Bait al-Zubairin '
            + 'museossa vanhassa Masqatissa. Pinta on kaiverrettu täyteen '
            + 'kukka- ja köynnöskuvioita, kansi päättyy piikkiin ja nokka '
            + 'kaartuu alaspäin kuin linnun nokka.',
          lahde: 'Reda Kerbush, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Astia kiertää kädestä käteen',
          tiedosto: 'Incense burner2374pdf.jpg',
          teksti: 'Suitsuke poltetaan astiassa, jonka nimi on mabkhara tai '
            + 'majmar. Pohjalle pannaan hehkuvaa puuhiiltä ja hiilten '
            + 'päälle muutama jyvä lubania eli suitsuketta; savu nousee '
            + 'suoraan huoneeseen, eikä liekkiä tarvita. Astiat tehdään '
            + 'Dhofarissa savesta, ja niitä on muotoiltu ja maalattu '
            + 'etenkin kolmessa kaupungissa: Salalahissa, Mirbatissa ja '
            + 'Taqahissa. Muoto vaihtelee nelikulmaisesta lieriöön ja '
            + 'veneeseen. Vieraiden tullessa astia kiertää kädestä '
            + 'käteen, ja jokainen ohjaa savua vaatteidensa alle ja '
            + 'hiuksiinsa. Illan päätteeksi sama kierros on kohtelias '
            + 'merkki siitä, että vierailu on ohi.',
          selite: 'Savesta poltettu suitsutusastia museovitriinissä. Se on '
            + 'muotoiltu veneeksi: kokka ja perä nousevat ylös, kannella '
            + 'seisoo kaksi pientä kupolitornia ja niiden välissä '
            + 'laatikkomainen koppi. Kylkiin on leikattu kolmiomaisia '
            + 'reikiä ja maalattu punaruskeaa kuviota. Astia on vaalealla '
            + 'jalustalla mustaa taustaa vasten.',
          lahde: 'Mohammed90m, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Kaulusta ei ole, tupsu on',
          tiedosto: 'معرض مسقط الدولي للكتاب - نمایشگاه بین المللی کتاب مسقط در کشور عمان 13.jpg',
          teksti: 'Miehen puku on dishdasha: nilkkaan ulottuva pitkähihainen '
            + 'kaapu, useimmiten valkoinen. Omanilaisessa mallissa ei ole '
            + 'kaulusta lainkaan, pääntien sulkevat nyörilenkit, ja '
            + 'kaulasta roikkuu lyhyt tupsu. Arabiemiraateissa sama tupsu '
            + 'yltää vyötärölle asti. Päässä on kummah, käsin kirjailtu '
            + 'lakki. Juhlatilaisuuksissa lakin päälle kääritään massar, '
            + 'kankaasta sidottu turbaani; omanilaiset eivät käytä sen '
            + 'pitämiseen mustaa agal-rengasta, joka on tavallinen '
            + 'muualla Persianlahdella.',
          selite: 'Kaksi omanilaispoikaa Masqatin kansainvälisillä '
            + 'kirjamessuilla. Molemmilla on valkoinen dishdasha ja '
            + 'päässä kirjailtu kummah-lakki, ja pöydän yli kirjapinojen '
            + 'takaa ojennetaan heille sinistä paperia.',
          lahde: 'Mostafameraji, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      tehtava: {
        kysymys: 'Mistä naapurit tiesivät ennen, että kahvia ollaan '
          + 'keittämässä?',
        vaihtoehdot: [
          'Huhmaren kalkkeesta',
          'Katolle nostetusta lipusta',
          'Kellon soitosta',
          'Savumerkeistä',
        ],
        oikea: 0,
        fakta: 'Pavut survottiin käsin, ja ääni kantoi naapuritaloihin '
          + 'kutsuna: kahvia on pian tarjolla.',
      },
    },
  ],
  /*
   * BAGDADIN KANSISIVU (nippu 2, 13.8.2026). Aihesivun id on arki,
   * koska IRQ-maalehdellä on muinaisuus, ruoka, rakennukset ja suot
   * — sama id kaupungilla peittäisi maan sivun (rakennaSivut).
   */
  bagdad: [
    {
      id: 'kaupunki',
      nimi: 'Bagdad',
      johdanto: 'Bagdad on kahdeksan miljoonan asukkaan pääkaupunki, jonka '
        + 'vanhimmat rakennukset ovat tiiltä: kaupunginmuurin portti, '
        + 'kalifin äidin hauta ja moskeijan minareetti ovat kaikki 1100- '
        + 'ja 1200-luvuilta.',
      kansikuvat: [
        {
          tiedosto: '001124-Alkadhemiya-Baghdad-IMG 7802-2.jpg',
          selite: 'Al-Kadhimiyan pyhäkkö Bagdadin pohjoisosassa: kaksi '
            + 'kullattua kupolia ja neljä kullattua minareettia. Portti '
            + 'on verhottu siniseen ja valkoiseen kaakeliin, aidat ovat '
            + 'vihreää metallia ja katolla liehuu vihreitä lippuja. '
            + 'Kupolien takana seisoo rakennusnosturi, ja aukiolla kulkee '
            + 'ihmisiä.',
          lahde: 'Safa.daneshvar, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'AlKhulafa Mosque in Baghdad 01.jpg',
          selite: 'Khulafa-moskeijan minareetin huippu alhaalta kuvattuna. '
            + 'Vaalea yläosa lepää kennomaisten syvennysten varassa, ja '
            + 'sen päällä on kapea huippu. Alempana kiertää tiiliseinässä '
            + 'arabiankielinen kirjoitusnauha, edessä on kaide ja '
            + 'oikeassa reunassa puun oksisto.',
          lahde: 'Usamasaad, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'كهرمانة 03.jpg',
          selite: 'Kahramana-suihkulähde katuaukiolla. Pronssinen naishahmo '
            + 'kallistaa ruukkua noin neljänkymmenen vihreäksi '
            + 'patinoituneen pronssiruukun rivistön yläpuolella. '
            + 'Ympärillä on katulamppuja, palmu, keltainen taksi ja '
            + 'arabiankielisiä liikekylttejä asuintalon seinässä.',
          lahde: 'Hussein A.Al-mukhtar, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Porteista jäi jäljelle yksi',
          tiedosto: 'Bab al-Wastani northern gate.jpg',
          teksti: 'Bagdadin itäpuolta kiersi keskiajalla muuri, jonka '
            + 'rakennutti kalifi al-Mustazhir (1094–1118); portit teetti '
            + 'kalifi al-Nasir (1180–1225). Niistä on jäljellä yksi, Bab '
            + 'al-Wastani eli Keskimmäinen portti, ja sen vieressä muurin '
            + 'viimeiset jäänteet — molemmat samaa tiiltä. Torni on '
            + 'lieriö ja 14,5 metriä korkea. Sisällä on '
            + 'kahdeksankulmainen huone, jonka päällä on kupoli. '
            + 'Julkisivun yläreunassa kulkee kirjoitusnauha ja sen alla '
            + 'tähtikuvioita ja kasviaiheita, ja oviaukkojen molemmin '
            + 'puolin on pieniä leijonakaiverruksia. Kulkutie ei mene '
            + 'suoraan läpi vaan kaartaa.',
          selite: 'Bab al-Wastani sisäpihalta kuvattuna. Portin holvikaari on '
            + 'korkea ja teräväkärkinen, sen yläpuolella harjaa kiertävät '
            + 'hammastetut lohkot, ja molemmin puolin pihaa nousee '
            + 'tiiliseinä, jossa on rivi kaarisyvennyksiä. Piha on '
            + 'laskettu tiilillä, oviaukko on täysin pimeä ja '
            + 'oikeanpuoleiseen seinään on raapustettu pieni merkintä.',
          lahde: 'Aboalhasan Ayad, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Yhdeksän kerrosta kennoa',
          tiedosto: 'Zubaida tomb.JPG',
          teksti: 'Zumurrud Khatun oli turkkilainen nainen, joka oli ollut '
            + 'orjana ja nousi kalifi al-Mustadin puolisoksi ja kalifi '
            + 'al-Nasirin äidiksi. Hän kustansi rakennuksia ja korjautti '
            + 'pyhiinvaellustien vesisäiliöitä 300 000 dirhamilla. Hänen '
            + 'hautansa valmistui ennen kuolemaa vuonna 1202. Pohja on '
            + 'kahdeksankulmainen, ja sen päällä kohoaa kartio, joka on '
            + 'ladottu yhdeksästä kennokerroksesta ja päättyy pieneen '
            + 'kupuun. Kennoja on kuusitoista, ja jokaisessa on pieni '
            + 'aukko paksun lasin takana. Sisähuone on noin kolme metriä '
            + 'pitkä ja seitsemän leveä.',
          selite: 'Zumurrud Khatunin hauta Bagdadin Karkhin puolella. '
            + 'Kahdeksankulmaisen tiilirungon päällä kohoaa kartiomainen '
            + 'kennokatto, joka näyttää alhaalta kuusenkävyltä. Seinissä '
            + 'on teräväkärkisiä syvennyksiä ja koristemuurausta, '
            + 'oikealla on matalampi tiiliseinä kaarineen ja vasemmassa '
            + 'reunassa puun oksat.',
          lahde: 'Moshtakmoshtak, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Viisikymmentä metriä oikealta vasemmalle',
          tiedosto: '(نصب التحرير( ساحه التحرير 01.jpg',
          teksti: 'Tahririn aukion laidalla seisoo travertiiniseinä, joka on '
            + '50 metriä pitkä ja 10 metriä korkea ja nostettu kuuden '
            + 'metrin päähän maasta. Siihen on kiinnitetty 14 '
            + 'pronssivalua ja niissä 25 hahmoa. Muistomerkki tehtiin '
            + 'Irakin itsenäisyysjulistuksen muistoksi. Sen suunnitteli '
            + 'kuvanveistäjä Jawad Salim, ja arkkitehti Rifat Chadirji '
            + 'vaati seinän nostamista ylös maasta. Reliefit luetaan kuin '
            + 'arabialainen runosäe, oikealta vasemmalle, ja muotokieli '
            + 'viittaa babylonialaisiin ja assyrialaisiin kaiverruksiin. '
            + 'Salim kuoli tammikuussa 1961, ja työn saattoivat valmiiksi '
            + 'hänen puolisonsa Lorna Selim ja Mohammed Ghani Hikmat.',
          selite: 'Vapauden monumentti Tahririn aukiolla. Vaalean '
            + 'travertiiniseinän pinnassa on rivi tummia pronssihahmoja, '
            + 'ja seinä lepää tukien varassa niin että alta näkyy puistoa '
            + 'ja palmuja. Edessä kulkee katu, jonka reunakivi on '
            + 'maalattu mustavalkoiseksi ja jolla seisoo valkoinen '
            + 'maasturi. Oikealla on valkoisia koristekaiteita ja talon '
            + 'seinässä mainoskyltti.',
          lahde: 'Hussein A.Al-mukhtar, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki',
      johdanto: 'Bagdadin arki mahtuu kolmeen osoitteeseen: leveään katuun, '
        + 'jonka pylväskäytävät varjostavat kulkijaa, kahvilaan, jossa '
        + 'tee tulee lasissa, ja toriin, joka on vanhempi kuin kumpikaan.',
      nostot: [
        {
          otsikko: 'Ensimmäinen leveä katu',
          tiedosto: 'Baghdadi Balconies al-Rasheed Street.png',
          teksti: 'Al-Rashid-katu avattiin vuonna 1914. Ottomaanihallinto '
            + 'halusi Bagdadiin väylän, jolle vaunut mahtuivat: vanha '
            + 'kujaverkko oli niille liian kapea. Linjauksen tieltä '
            + 'purettiin noin 700 taloa. Kadulle tuli jalkakäytävät ja '
            + 'niiden päälle pylväskäytävät, jotka varjostavat kulkijaa, '
            + 'ja pylväiden varaan nousivat ulkonevat parvekkeet. Katu '
            + 'kulkee Tigrisin suuntaisesti. Nimiä sillä on ollut useita, '
            + 'ja nykyinen vahvistui 1936, kun kielentutkija Mustafa '
            + 'Jawad ehdotti sitä abbasidikalifin mukaan. 1930-luvulla '
            + 'kadulle avattiin elokuvateattereita, ja torstai-ilta oli '
            + 'perheiden elokuvailta.',
          selite: 'Talo al-Rashid-kadun varrella. Kolmessa kerroksessa on '
            + 'parvekkeet, joiden kaiteet on valettu koristekuvioiksi ja '
            + 'maalattu vaaleanpunaisella ja turkoosilla; seinillä '
            + 'roikkuu ilmastointilaitteita. Katutasossa parvekerivistöä '
            + 'kannattavat valkoiset pylväät, ja niiden takana ovat '
            + 'myymälöiden suljetut rullaovet ja kyltit, joista yhdessä '
            + 'lukee Atlas.',
          lahde: 'Ayham4002, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Kaupungissa oli 285 kahvilaa',
          tiedosto: 'Al-Zahawi Coffeehouse in 2025.jpg',
          teksti: 'Ensimmäinen bagdadilainen kahvila avattiin vuonna 1590. '
            + 'Vuoden 1882 luettelo tunsi niitä 184, ja vuoteen 1903 '
            + 'mennessä määrä oli 285. Kilpailu asiakkaista oli kova: '
            + 'omistajat palkkasivat laulajia esittämään irakilaista '
            + 'maqamia ja tarinankertojia iltoihin. Tee tarjotaan '
            + 'pienessä lasissa, jota bagdadilaiset sanovat istikaniksi, '
            + 'pannun nimi on quri ja istuimena on puinen penkki takht. '
            + 'Al-Rashid-kadun al-Zahawin kahvila avattiin 1917, ja se '
            + 'sai nimensä runoilija Jamil Sidqi al-Zahawista. '
            + '1930-luvulla siellä kävi bengalilainen runoilija '
            + 'Rabindranath Tagore.',
          selite: 'Al-Zahawin kahvila al-Rashid-kadun kulmassa illalla. '
            + 'Puinen julkisivu on jaettu kaariruuduiksi, seinillä palaa '
            + 'lyhtyjä ja räystään alla kaartuu arabiankielinen kyltti. '
            + 'Kadulle on nostettu pöytiä ja tuoleja, muutama vieras '
            + 'istuu niissä, ja yläkerran parvekkeen kaiteessa on pieniä '
            + 'lippuja.',
          lahde: 'Ayham4002, Wikimedia Commons (CC0)',
        },
        {
          otsikko: 'Tori on vanhempi kuin katu',
          tiedosto: '2024, Muslim Baghdadis flooded the Shorja market celebrating the Islamic holy month of Ramadan.jpg',
          teksti: 'Shorja on Bagdadin suurin ja vanhin tori. Se on Rusafan '
            + 'puolella aivan al-Rashid-kadun vieressä. Nimi tulee '
            + 'persian sanasta shurchah, suolainen kaivo, ja sen antoivat '
            + 'persialaiset kauppiaat, jotka perustivat paikan. '
            + 'Naapurikorttelin nimi Ab-Khana tarkoittaa vesisäiliötä. '
            + 'Torin korttelit olivat kaupan keskus jo kauan ennen leveää '
            + 'katua: samalla alueella olivat mandealaisten hopeaseppien '
            + 'pajat, ja vuonna 1866 sinne valmistui Pyhän Joosefin '
            + 'latinalainen katedraali.',
          selite: 'Shorjan torikuja täynnä ihmisiä. Etualalla myyjä kaataa '
            + 'karkkeja vihreään pussiin, tiskeillä on avonaisia '
            + 'laatikoita makeisia, kuivattuja hedelmiä ja pähkinöitä, ja '
            + 'seinustan hyllyillä pakattuja tavaroita. Katon alta '
            + 'roikkuu lamppuja, ja käytävä jatkuu yhtä täytenä niin '
            + 'pitkälle kuin näkyy.',
          lahde: 'Chinese Horse From Kaso Mall, Wikimedia Commons (CC0)',
        },
      ],
      tehtava: {
        kysymys: 'Mitä Shorjan torin nimi tarkoittaa persiaksi?',
        vaihtoehdot: [
          'suolainen kaivo',
          'kuivunut lähde',
          'suuri varasto',
          'vanha satama',
        ],
        oikea: 0,
        fakta: 'Paikan perustivat persialaiset kauppiaat, ja '
          + 'naapurikorttelin nimi Ab-Khana tarkoittaa vesisäiliötä.',
      },
    },
  ],
  /*
   * İZMIRIN KANSISIVU (nippu 2, 13.8.2026). Aihesivun id on arki,
   * koska TUR-maalehdellä on historia, luonto, kasityo, musiikki ja
   * ruoka — sama id kaupungilla peittäisi maan sivun.
   */
  izmir: [
    {
      id: 'kaupunki',
      nimi: 'İzmir',
      johdanto: 'İzmir on rakennettu lahden pohjukkaan jyrkkien rinteiden '
        + 'väliin: ylös noustaan hissitornia ja portaita pitkin, '
        + 'vastarannalle mennään lautalla.',
      kansikuvat: [
        {
          tiedosto: 'Izmir Ferry ride from Pasaport terminal to Bostanlı terminal 2592.jpg',
          selite: 'İzmirin lahti lautan kannelta kuvattuna. Aallokossa '
            + 'purjehtii kuusi pientä valkoista jollaa, joiden purjeissa '
            + 'lukee TUR ja numero ja joissa istuu lapsia '
            + 'pelastusliiveissä. Takana kaartuu vastarannan '
            + 'rantabulevardi täynnä kävelijöitä ja palmuja, sen takana '
            + 'nousee rinne kerrostaloja, ja oikealla laiturissa on '
            + 'valkoinen lautta. Talojen seinillä on mainostauluja ja '
            + 'vihreä Garanti-pankin kyltti.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Izmir aerial.jpg',
          selite: 'İzmir lentokoneesta kuvattuna. Vasemmalla on satama, jossa '
            + 'on punainen rahtilaiva ja pinoja kontteja, keskellä '
            + 'suorien korttelien ruudukko ja mutkitteleva moottoritie, '
            + 'ja oikealla laaja Kültürparkin puistoalue: nurmikenttiä, '
            + 'messuhalleja ja kapea vaalea torni.',
          lahde: 'Coderenius, Wikimedia Commons (CC BY 4.0)',
        },
        {
          tiedosto: 'Konak Mosque, 2008.jpg',
          selite: 'Konakin aukion pieni kahdeksankulmainen Yalı-moskeija '
            + 'pilvisenä päivänä. Ikkunoita kehystävät sinivihreät '
            + 'laattapaneelit, kattona on lyijynharmaa kupoli ja vieressä '
            + 'nousee ohut kivinen minareetti. Vasemmalla liehuu Turkin '
            + 'lippuja ja kasvaa palmuja, oikealla kävelee ihmisiä ja '
            + 'taustalla näkyy kerrostaloja.',
          lahde: 'F Mira, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Hissi rakennettiin kadun jatkoksi',
          tiedosto: 'Asansor ust kisim.JPG',
          teksti: 'Karataşin kaupunginosassa Konakissa rannan kapean '
            + 'kaistaleen ja ylärinteen korttelit erottaa jyrkkä '
            + 'kallioseinämä. Vuonna 1907 varakas juutalainen pankkiiri '
            + 'ja kauppias Nesim Levi Bayraklıoğlu rakennutti seinämään '
            + 'tornin, jonka sisällä hissi nostaa ihmiset ja tavarat '
            + 'alhaalta ylätasolle. Torni tehtiin kaupunkilaisten '
            + 'käyttöön, ja sen nimi on yksinkertaisesti Asansör, hissi. '
            + 'Nimi tarttui myös alla kulkevaan kujaan. Kujalla asui '
            + '1940-luvulla laulaja Dario Moreno, joka teki myöhemmin '
            + 'uran Ranskassa, ja katu on nimetty hänen mukaansa.',
          selite: 'Asansörin tiilitornin yläosa ja sen kylkeen rakennettu '
            + 'terassi. Terassin reunassa on valkoinen valettu '
            + 'koristekaide ja valkoisia lyhtypylväitä, ja kaiteen '
            + 'ääressä seisoo kuusi ihmistä katsomassa alas. Tornin ovea '
            + 'suojaa peltinen markiisi. Vasemmalla näkyy lahti ja '
            + 'rantatie, oikealla rinnettä nousevia kerrostaloja ja '
            + 'takana vuoret.',
          lahde: 'Yabancı, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Puisto sai alkunsa Moskovan-matkasta',
          tiedosto: 'Kültürpark aerial view 01.jpg',
          teksti: 'Apulaispormestari Suat Yurtkoru esitti pormestari Behçet '
            + 'Uzille, että İzmir tarvitsee Moskovan Gorki-puiston '
            + 'kaltaisen alueen. Kaupunginvaltuusto hyväksyi esityksen '
            + '14. toukokuuta 1934. Uz matkusti Moskovaan 1935, ja kaksi '
            + 'arkkitehtia laati suunnitelman. Perustus laskettiin 1. '
            + 'tammikuuta 1936, ja Kültürpark avattiin yleisölle 1. '
            + 'syyskuuta 1936. Alaa oli 360 000 neliömetriä, ja vuonna '
            + '1939 se kasvoi 420 000:een. Puistoon nousi laskuvarjotorni '
            + '1937 ja eläintarha 1938; eläimet siirrettiin muualle 2008. '
            + 'Nykyään siellä pidetään İzmirin kansainväliset messut ja '
            + 'kirjamessut.',
          selite: 'Kültürpark ylhäältä kuvattuna. Puiden latvusten seassa '
            + 'erottuu palmurivi, leikattuja pensasaitoja ja '
            + 'valkokattoinen messuhalli, vasemmassa reunassa nousee '
            + 'teräksinen ristikkotorni ja keskellä liehuu kaksi Turkin '
            + 'lippua. Takana on kaupungin tornitaloja ja niiden takana '
            + 'vuorijono.',
          lahde: 'BSRF, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Unessa käskettiin muuttaa kukkulalle',
          tiedosto: 'Izmir Kadifekale exterior 5675.jpg',
          teksti: 'Kadifekale seisoo Pagos-vuoren laella 186 metrin '
            + 'korkeudessa, noin kahden kilometrin päässä rantaviivasta. '
            + 'Ensimmäiset tunnetut muurit rakennutti Lysimakhos, yksi '
            + 'Aleksanteri Suuren seuraajista, ja samoihin aikoihin '
            + 'Smyrna siirrettiin tänne vanhalta paikaltaan kummulta, '
            + 'jolle mahtui vain muutama tuhat asukasta. Pausanias kertoo '
            + 'tarinan, jonka mukaan Aleksanteri nukahti '
            + 'metsästysretkellä plataanin alle ja näki unessa kaksi '
            + 'jumalatarta, jotka käskivät perustaa kaupungin juuri sille '
            + 'kukkulalle. Nykyiset muurit ovat keskiajalta.',
          selite: 'Kadifekalen ulkomuuri alhaalta katsottuna. Karkeasta '
            + 'kivestä ladotun muurin päällä on hammastettu harja ja '
            + 'vasemmalla pyöreä torni, muurissa on kapea nuoliaukko, ja '
            + 'edessä kasvaa mäntyjä, joiden rungot on maalattu alaosasta '
            + 'valkoisiksi. Muurin viereen on pysäköity valkoinen '
            + 'pakettiauto ja tummansininen tila-auto, ja rinnettä '
            + 'alempana seisoo joukko ihmisiä; vasemmalla kaukana siintää '
            + 'lahti.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki',
      johdanto: 'İzmirin aamiainen ostetaan kadulta ja syödään seisaaltaan, ja '
        + 'päivän mittaan tartutaan sämpylään, jota muualla ei myydä '
        + 'samalla nimellä. Töihin mennään usein lautalla, koska lahti on '
        + 'tiellä.',
      nostot: [
        {
          otsikko: 'Taikina lepää tuntikausia',
          tiedosto: 'Boyoz in İzmir.jpg',
          teksti: 'Boyoz on İzmirin oma leivonnainen. Nimi tulee ladinon '
            + 'sanasta boyo, pieni pyöreä pulla; sefardijuutalaiset '
            + 'toivat leivonnaisen kaupunkiin sen jälkeen, kun heidät '
            + 'karkotettiin Espanjasta 1492. Taikinaan tulee jauhoja, '
            + 'auringonkukkaöljyä ja hieman tahinia, alun perin '
            + 'seesamiöljyä. Taikinaa vaivataan käsin ja levätetään '
            + 'useaan kertaan, ensin kaksi tuntia ja lopuksi useita '
            + 'tunteja, ja palasista pyöritellään pieniä palloja, jotka '
            + 'marinoituvat öljyssä puolesta tunnista tuntiin. Uuni on '
            + 'hyvin kuuma, ja pinnasta tulee kerroksinen. Seuraksi '
            + 'otetaan tummaa teetä ja kovaksi keitetty muna, jonka '
            + 'päälle ripotellaan runsaasti mustapippuria.',
          selite: 'Viisi paistettua boyozia valkoisella paperilla. Ne ovat '
            + 'kämmenen kokoisia ja pyöreitä, pinta on kellertävä ja '
            + 'ryppyinen kuin rutistettu lehtitaikina, ja kolmen keskeltä '
            + 'pilkottaa tumma täyte. Oikeanpuoleisen päälle on siroteltu '
            + 'tomusokeria.',
          lahde: 'BSRF, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Sämpylä sai nimensä muodostaan',
          tiedosto: 'Tezgâhta kumru.jpg',
          teksti: 'Kumru on turkiksi kyyhkynen, ja voileipä on saanut nimensä '
            + 'muodostaan. Alkuperäinen kumru oli renkaan muotoinen ja '
            + 'kokonaan seesaminsiementen peitossa. Nykyinen versio '
            + 'syntyi İzmirissä 1900-luvun puolivälissä ja levisi '
            + 'nopeasti muualle. Väliin pannaan juustoa, tomaattia ja '
            + 'sucukia eli tulista makkaraa, ja osa myyjistä lisää '
            + 'suolakurkkua, tulista paprikaa, majoneesia ja ketsuppia. '
            + 'Leipä on pehmeää, ja osa leipomoista ja ravintoloista '
            + 'nostattaa taikinan kikhernejuurella. Kumrua myydään '
            + 'katuruokana.',
          selite: 'Myyntitiskin metallipelti täynnä kumruja. Sämpylöitä on '
            + 'kymmenkunta rivissä, jokaisen kuori on seesaminsiementen '
            + 'peitossa ja välistä työntyy esiin valkoista juustoa ja '
            + 'punaisia tomaattiviipaleita. Päällä lojuu kokonaisia '
            + 'vaaleanvihreitä paprikoita. Vasemmalla on pino valkoisia '
            + 'servettejä ja oikealla toinen pelti.',
          lahde: 'Satirdan kahraman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Yhdeksän laituria, 210 vuoroa',
          tiedosto: 'Izmir Bostanlı Terminal to Karşıyaka Terminal ride Karşıyaka Ferry Terminal 6592.jpg',
          teksti: 'İzmirin lahden yli kulkevista lautoista vastaa kaupungin '
            + 'oma yhtiö İzdeniz. Se perustettiin 1992 ja sai nykyisen '
            + 'nimensä 1999, ja vuonna 2000 valtion yhtiöltä siirtyi '
            + 'sille 104 työntekijää ja yksitoista lauttaa, joista kolme '
            + 'oli autolauttoja. Omia aluksia on nyt kolmetoista ja '
            + 'vuokrattuja kolmetoista, eli yhteensä 26. Vuoroja ajetaan '
            + 'päivässä 210 ja laitureita on yhdeksän: Alsancak, '
            + 'Bostanlı, Göztepe, Güzelbahçe, Karantina, Karşıyaka, '
            + 'Konak, Pasaport ja Üçkuyular. Matkustajia kertyy päivässä '
            + 'yli 50 000 ja ajoneuvoja yli 1 500.',
          selite: 'Karşıyakan lauttalaituri lahdelta kuvattuna. Laiturissa on '
            + 'kiinni valkoinen lautta, jonka perässä liehuu Turkin lippu '
            + 'ja jonka kaiteessa riippuu rivi pelastusrenkaita, ja '
            + 'oikealla on kaksi muuta lauttaa. Terminaalirakennuksen '
            + 'seinässä on kello ja vihreä Garanti-pankin kyltti, ja '
            + 'takana nousee rinne täynnä kerrostaloja ja minareetteja.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      tehtava: {
        kysymys: 'Mitä İzmirissä syödään perinteisesti boyozin kanssa?',
        vaihtoehdot: [
          'Kovaksi keitetty muna',
          'Kulhollinen jogurttia',
          'Lasi kylmää maitoa',
          'Kylmä vesimeloni',
        ],
        oikea: 0,
        fakta: 'Boyoz ostetaan aamulla kadulta, ja seuraksi otetaan '
          + 'lasillinen tummaa teetä ja muna, jonka päälle ripotellaan '
          + 'mustapippuria.',
      },
    },
  ],
  /*
   * ANKARAN KANSISIVU (nippu 2, 13.8.2026). Aihesivun id on arki,
   * koska TUR-maalehdellä on jo historia, luonto, kasityo, musiikki,
   * ruoka ja menovinkit — sama id kaupungilla peittäisi maan sivun.
   */
  ankara: [
    {
      id: 'kaupunki',
      nimi: 'Ankara',
      johdanto: 'Ankarassa on viheralaa 72 neliömetriä asukasta kohti, vaikka '
        + 'keskustaajamassa asuu yli 5,3 miljoonaa ihmistä.',
      kansikuvat: [
        {
          tiedosto: 'Kocatepe Camii, Sheraton, Atakule.jpg',
          selite: 'Ankaran keskusta kattojen yli katsottuna. Keskellä kohoaa '
            + 'Kocatepen moskeija, jolla on harmaa kupoli ja neljä '
            + 'valkoista minareettia mustine huippuineen, ja oikealla '
            + 'näkyy Atakulen lasipallo sekä sen vierellä rakenteilla '
            + 'oleva sinilasinen tornitalo nostureineen. Rinteet ovat '
            + 'täynnä punakattoisia kerrostaloja, katoilla liehuu Turkin '
            + 'lippuja ja talojen seinissä on kylttejä, muun muassa '
            + 'DEMORA HOTEL ja liv HOSPITAL. Etualalla on vaalean '
            + 'toimistotalon katto ilmastointiputkineen ja yksi '
            + 'katulamppu.',
          lahde: 'schweinalp, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Kızılay meydanı-Ankara - panoramio.jpg',
          selite: 'Kızılayn aukio pilvisenä päivänä. Etualalla seisoo rivi '
            + 'keltaisia takseja ja kaksi moottoripyörää, joiden ajajien '
            + 'selässä lukee POLİS. Takana nousee korkea valkoinen '
            + 'toimistotorni ja sen edessä lasiseinäinen kauppakeskus. '
            + 'Aukiolla on liikennevaloja, kävelijöitä ja mainostauluja, '
            + 'joissa lukee GÜNEŞ SİGORTA, Vodafone ja COLIN\'S, sekä '
            + 'talon seinällä pitkä pystysuora Turkin lippu.',
          lahde: 'HALUK COMERTEL, Wikimedia Commons (CC BY 3.0)',
        },
        {
          tiedosto: 'Ankara Garı, Ankara (24.03.2023) 79.jpg',
          selite: 'Ankaran rautatieasema. Vaalean kivijulkisivun edessä on '
            + 'rivi neliskulmaisia pilareita, katolla punainen kyltti '
            + 'ANKARA GARI ja pyöreässä kulmatornissa TCDD:n lippu. '
            + 'Aseman edustalle on aseteltu oransseja liikennekartioita, '
            + 'sivussa on pysäköityjä moottoripyöriä ja OTOPARK-kyltti, '
            + 'ja etualalla kasvaa leikattu pensasaita ja lehdettömiä '
            + 'plataaneja.',
          lahde: 'Gargarapalvin, Wikimedia Commons (CC BY 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Luostari ensin, moskeija sen viereen',
          tiedosto: 'Hacı Bayram-ı Veli Camii ve Türbesi.jpg',
          teksti: 'Numan-niminen mies tapasi opettajansa uhrijuhlan aikaan ja '
            + 'otti nimen Bayram. Opettajan kuoltua vuonna 1412 hän '
            + 'palasi Ankaraan ja perusti Bayrami-veljeskunnan, jonka '
            + 'opetusta tultiin kuuntelemaan kauempaakin. Hacı Bayram '
            + 'Veli eli vuosina 1352–1430, ja hän rakensi '
            + 'dervissiluostarin sille paikalle, jossa nyt seisovat hänen '
            + 'hautansa ja moskeija. Moskeija valmistui 1427–28, kaksi '
            + 'vuotta ennen hänen kuolemaansa, seldžukkityyliin; '
            + 'arkkitehtia ei tiedetä. Käyttöalaa on alakerrassa 437 ja '
            + 'yläkerrassa 263 neliömetriä. 1500-luvulla Mimar Sinan teki '
            + 'rakennukseen kunnostustöitä, ja 1700-luvulla seiniin '
            + 'lisättiin Kütahyan laattoja.',
          selite: 'Hacı Bayramin moskeija Ulusissa. Punatiilisen rakennuksen '
            + 'päällä on loiva tiilikatto, oikealla nousee '
            + 'tiiliminareetti, jossa on kaksi parveketta ja harmaa '
            + 'kartiohuippu, ja sen juurella on lyijykattoinen '
            + 'hautarakennus koristeltuine kuisteineen. Aukion poikki '
            + 'kävelee ihmisiä, etualalla on lehdettömiä plataaneja ja '
            + 'lyhtypylväitä, ja oikealla seisoo keltaiseen huomioliiviin '
            + 'pukeutunut työntekijä sinisen jäteastian vieressä.',
          lahde: 'Dursun Sülük, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Ravintola tekee kierroksen tunnissa',
          tiedosto: 'Atakule, 2019 01.jpg',
          teksti: 'Atakule on 125 metriä korkea viestintä- ja näkötorni '
            + 'Çankayan kaupunginosassa. Çankaya on itsekin kukkulalla, '
            + 'joten kirkkaalla säällä torni erottuu lähes mistä tahansa '
            + 'kaupungin kolkasta. Rakennustyöt kestivät vuodesta 1987 '
            + 'vuoteen 1989, suunnittelija oli Ragıp Buluç, ja torni '
            + 'avattiin 13. lokakuuta 1989. Huipulla on avoin terassi ja '
            + 'pyörivä ravintola Sevilla, joka kiertää täyden ympyrän '
            + 'tunnissa. Sen yläpuolella kupolin alla on toinen '
            + 'ravintola, Dome, joka pysyy paikallaan, ja terassin '
            + 'alapuolella kahvila nimeltä UFO. Nimi tulee sanoista ata, '
            + 'esi-isä, ja kule, torni.',
          selite: 'Atakule alhaalta kuvattuna. Valkoinen betonipylväs nousee '
            + 'suoraan ylös, ja sen kylkeä pitkin kulkee tumma '
            + 'lasikaista. Huippu levenee kartioksi: alempana on '
            + 'lasitettu ravintolakerros ja sen päällä kaiteen ympäröimä '
            + 'avoin terassi. Taivas on kirkkaan sininen, ja vasemmalla '
            + 'näkyy yksi ohut pilviviiru.',
          lahde: 'Gargarapalvin, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Suo kuivattiin, allas jäi',
          tiedosto: 'Ankara Gençlik Park in 2011 01.jpg',
          teksti: 'Puiston paikalla oli suota. Se kuivattiin, ja 19. '
            + 'toukokuuta 1943 avattiin yleisölle 27,5 hehtaarin puisto '
            + 'keskelle kaupunkia. Pääallas on 42 000 neliömetriä, ja sen '
            + 'ympärille tuli kahviloita, uima-allas, huvipuisto ja '
            + 'ulkoilmateatteri. Vuonna 1957 alueelle rakennettiin kaksi '
            + 'pienoisjunarataa. Puistoa reunustavat pohjoisessa Ulusin '
            + 'aukio, idässä oopperatalo, etelässä rautatieasema ja '
            + 'lännessä stadion. Nykyään puistossa on 43 kioskia, ja '
            + 'pimeällä altaalla esitetään valonäytöksiä. Gençlik Parkı '
            + 'oli kuvana sadan liiran setelin kääntöpuolella vuosina '
            + '1952–1976.',
          selite: 'Gençlik Parkı syyspäivänä. Etualalla istuu ihmisiä '
            + 'puisilla penkeillä nurmen ja plataanien katveessa, ja '
            + 'takana levittäytyy pitkä allas. Vastarannalla näkyy '
            + 'valkoisia telttakatoksia ja kioskeja sekä maailmanpyörä, '
            + 'lyhtypylväät seisovat rivissä, ja lehdet ovat '
            + 'kellastumassa.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki',
      johdanto: 'Ankaralainen kulkee töihin maan alla, syö lounaaksi '
        + 'lautasellisen pilahvia ja ostaa kuivatut hedelmänsä samasta '
        + 'rinteestä, jossa on kaupattu tavaraa jo kauan ennen '
        + 'ensimmäistä raidelinjaa.',
      nostot: [
        {
          otsikko: 'Kevytmetro ensin, metro seuraavana vuonna',
          tiedosto: 'Sıhhiye Metro İstasyonu M1 2024.jpg',
          teksti: 'Ankaran ensimmäinen raidelinja oli kevytmetro Ankaray, '
            + 'jonka rakensi Siemensin johtama ryhmä neljässä vuodessa '
            + '1992–96. Se avattiin 30. elokuuta 1996 ja kulkee '
            + 'linja-autoaseman AŞTİ:n ja Dikimevin väliä 8,53 '
            + 'kilometriä, josta 6,68 kilometriä on tunnelissa; asemia on '
            + 'yksitoista. Varsinainen metro alkoi 29. joulukuuta 1997, '
            + 'kun M1 avattiin Kızılayn ja Batıkentin välille. Vuonna '
            + '2025 linjoilla tehtiin 173,2 miljoonaa matkaa. Arkipäivänä '
            + 'ankaralainen viettää joukkoliikenteessä keskimäärin 71 '
            + 'minuuttia ja odottaa pysäkillä 16 minuuttia.',
          selite: 'Sıhhiyen aseman laituri M1-linjalla. Vasemmalla on harmaa '
            + 'mosaiikkilaatoitettu seinä ja siinä punainen kyltti '
            + 'SIHHİYE; sama nimi toistuu pienempänä tunnelin seinässä '
            + 'oikealla. Laiturin reunassa kulkee keltainen '
            + 'varoitusraita, muutama matkustaja odottaa junaa '
            + 'lasiseinäisen hissin vieressä, ja raide katoaa pimeään '
            + 'tunneliin.',
          lahde: 'Kayra, Wikimedia Commons (CC BY 4.0)',
        },
        {
          otsikko: 'Pavut ovat koko maan annos',
          tiedosto: 'Ankara tava and cacik.jpg',
          teksti: 'Kaupungin omalla ruoalla on kaupungin nimi: Ankara tava on '
            + 'pilahvi, jonka joukossa on lampaanlihaa. Turkin '
            + 'ruokalistojen tavallisin annos on kuru fasulye: valkoisia '
            + 'papuja haudutetaan oliiviöljyssä sipulin ja tomaattisoseen '
            + 'kanssa, ja usein mukaan tulee pastırmaa eli kuivattua ja '
            + 'maustettua naudanlihaa. Papuja pidetään yleisesti koko '
            + 'maan kansallisruokana. Seuraksi otetaan riisiä tai '
            + 'bulguria ja kulhollinen cacıkia, jogurttia ja kurkkua. '
            + 'Ankaran seudulta tulee toreille lisäksi päärynöitä, '
            + 'hunajaa ja muskottirypäleitä.',
          selite: 'Lautasellinen Ankara tavaa ja sen vieressä kulhollinen '
            + 'cacıkia. Pilahvi on ruskeaksi kypsynyttä, jyvät ovat '
            + 'ohuita ja pitkiä, ja seassa erottuu lihanpaloja ja '
            + 'punaisen paprikan siruja. Kulhossa on jogurttia, '
            + 'kurkkukuutioita ja kuivattua minttua. Pöydällä on '
            + 'puna-valkoruudullinen paperitabletti, josta erottuvat '
            + 'kirjaimet AFİY, ja haarukka odottaa lautasen vieressä.',
          lahde: 'E4024, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Rinne, jolla myydään yhä kankaita',
          tiedosto: 'Kuruyemişçi (Çıkrıkçılar Yokuşu).jpg',
          teksti: 'Ulusin kupeessa nousee rinne nimeltä Çıkrıkçılar Yokuşu, '
            + 'kutojien mäki. Sen vanhoissa puodeissa myydään kankaita, '
            + 'käsin kudottuja mattoja ja nahkatavaraa, ja hinnat ovat '
            + 'matalat. Kupariseppien tori Bakırcılar Çarşısı on '
            + 'suosituin osa: kuparin lisäksi sieltä saa koruja, pukuja, '
            + 'vanhaa tavaraa ja kirjontaa. Ylempänä linnanporttia kohti '
            + 'puodit myyvät mausteita, kuivattuja hedelmiä ja '
            + 'pähkinöitä. Uudempi kauppa on siirtynyt Kızılayn ja Tunalı '
            + 'Hilmi -kadun varrelle, missä erään kauppakeskuksen nimi '
            + 'Karum viittaa assyrialaisten kauppasiirtoloihin, joita '
            + 'Keski-Anatoliassa oli jo 2000-luvun eaa. alussa.',
          selite: 'Kuivattujen hedelmien myyntipöytä Çıkrıkçılar Yokuşulla. '
            + 'Pahvilaatikoissa on nauhoiksi ladottuja viikunoita, '
            + 'aprikooseja, taateleita ja luumuja, ja edessä on '
            + 'laatikollinen mustia johanneksenleipäpuun paloja. Oikealla '
            + 'on pinossa muovipusseja, joissa lukee Dedem, sekä '
            + 'tarjottimellinen värikkäitä sokerikuorrutettuja makeisia. '
            + 'Laatikoiden kyljissä lukee Malatya Kayısıları ja '
            + 'Köylüoğlu.',
          lahde: 'E4024, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      tehtava: {
        kysymys: 'Kuinka kauan ankaralainen viettää arkipäivänä keskimäärin '
          + 'joukkoliikenteessä?',
        vaihtoehdot: [
          '71 minuuttia',
          '25 minuuttia',
          '46 minuuttia',
          '99 minuuttia',
        ],
        oikea: 0,
        fakta: 'Pysäkillä odottamiseen kuluu keskimäärin 16 minuuttia, ja '
          + 'yksi matka on pituudeltaan noin 9,9 kilometriä.',
      },
    },
  ],
  /*
   * ALEPPON KANSISIVU (nippu 2, 13.8.2026). SYR-maalehdellä on
   * historia, kasityo ja ruoka, joten kaupunki ottaa oman aiheensa.
   */
  halab: [
    {
      id: 'kaupunki',
      nimi: 'Aleppo',
      johdanto: 'Aleppon vanhakaupunki on 350 hehtaaria kortteleita, joissa '
        + 'asuu yli 120 000 ihmistä, ja jokainen kortteli rakennettiin '
        + 'aikanaan tulemaan toimeen omillaan.',
      kansikuvat: [
        {
          tiedosto: 'Aleppo 03.jpg',
          selite: 'Aleppon kattoja korkealta katsottuna. Etualalla on matalia '
            + 'kivitaloja, joiden katoilla on kymmeniä lautasantenneja ja '
            + 'pieniä kupoleita, ja keskellä kohoaa kivinen minareetti, '
            + 'jonka takana on vihreäksi maalattu kupoli ja toinen '
            + 'pienempi. Oikealla seisoo valkoinen nelikerroksinen '
            + 'rakennus, jonka julkisivussa on korkeita kaari-ikkunoita, '
            + 'ja horisontissa kaupunki jatkuu tiheänä matalan '
            + 'kukkulajonon juurelle.',
          lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          tiedosto: 'Al-Madina Souq 02.jpg',
          selite: 'Katettu kivinen kuja Aleppon Al-Madina-basaarissa: kaareva '
            + 'kivikatto häviää hämärään, ja sen alla riippuu '
            + 'rivistöittäin värikkäitä paperilippusia ja lamppuja. '
            + 'Vasemmalla lihakaupan edessä roikkuu koukuissa leikattuja '
            + 'lihanpaloja, ja mies istuu jakkaralla kaupan ovella. '
            + 'Käytävällä kulkee ostajia ja turisteja, muun muassa '
            + 'keltapaitainen valkohattuinen nainen punaisine reppuineen, '
            + 'ja oikeassa alakulmassa on laatikollinen vihreitä '
            + 'vihanneksia. Kaupat ovat auki kujan molemmin puolin.',
          lahde: 'Folkertherlyn, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Aleppo Beit Wakil 9673.jpg',
          selite: 'Beit Wakilin sisäpiha. Kiviseinässä on kaiverrettuja '
            + 'kaarisyvennyksiä ja kapeita ikkunoita, joissa on sinistä '
            + 'ja valkoista lasia, ja pihan keskellä on matala marmorinen '
            + 'suihkulähde ruukkukasvien ympäröimänä. Pihalle on katettu '
            + 'pöytiä valkoisin liinoin, ylle on pingotettu vaalea kangas '
            + 'mustien takorautapylväiden varaan, ja perällä on koroke, '
            + 'jolla seisoo kaiuttimia ja verhoiltuja tuoleja.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Katedraalin pylväät jäivät kouluun',
          tiedosto: 'Madrasa Halawiye, Aleppo (حلب), Syria - Capital of west colonnade - PHBZ024 2016 0469 - Dumbarton Oaks.jpg',
          teksti: 'Vanhankaupungin al-Jalloumin korttelissa seisoo '
            + 'al-Halawiyya-koulu. Sen paikalla oli 400-luvulla Aleppon '
            + 'suuri bysanttilainen katedraali, jonka rakennutti Helena, '
            + 'keisari Konstantinus Suuren äiti. Vuonna 1124 '
            + 'ristiretkeläiset ryöstelivät kaupungin ympäristöä, ja '
            + 'Aleppon ylituomari Ibn al-Khashshab alkoi muuttaa '
            + 'katedraalia moskeijaksi. Vuonna 1149 Nur ad-Din teki '
            + 'rakennuksesta madrasan eli uskonnollisen koulun '
            + 'hanafilaisen lakikoulukunnan seuraajille. Kirkosta ei '
            + 'purettu kaikkea: vanhan katedraalin pylväät seisovat yhä '
            + 'salissa, ja niiden päissä ovat akantinlehdiksi veistetyt '
            + 'kapiteelit.',
          selite: 'Pylvään kapiteeli al-Halawiyyan salissa. Kiveen on '
            + 'veistetty kaksi kerrosta akantinlehtiä, jotka kaartuvat '
            + 'kaikki samaan suuntaan kuin tuulessa, ja lehtien reunat '
            + 'ovat sahalaitaiset ja paikoin lohjenneet. Kapiteelin '
            + 'päällä lepää suora kivipalkki, alla näkyy pyöreän pylvään '
            + 'yläpää, ja taustalla erottuu rapattu seinä ja toisen '
            + 'kaiverretun kiven kulma.',
          lahde: 'Frank Kidner, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Kuningatar maksoi koulunsa myllyn tuotolla',
          tiedosto: 'Aleppo Madrasa Firdows 0210.jpg',
          teksti: 'Bab al-Maqamin portin lounaispuolelle, muurien '
            + 'ulkopuolelle, rakennettiin vuosina 1235–36 madrasa nimeltä '
            + 'al-Firdaws, Paratiisi. Sen teetti Dayfa Khatun, josta tuli '
            + 'myöhemmin Aleppon ajjubidien sijaishallitsija. Hän maksoi '
            + 'koulun omista varoistaan ja perusti sille waqfin eli '
            + 'hurskaan säätiön, jonka tuloina olivat Kafr Zaytan kylän '
            + 'tuotto ja kaksi kolmasosaa läheisen myllyn tuloista. '
            + 'Kouluun palkattiin koraaninlukijoita, lainoppineita ja '
            + 'sufeja. Rakennus on suorakaide, jonka kattona on '
            + 'yksitoista kupolia. Rukoussalin mihrab on ladottu '
            + 'suonikkaasta valkoisesta marmorista, punaisesta '
            + 'porfyyristä ja vihreästä dioriitista.',
          selite: 'Al-Firdawsin mihrab. Kaaren yläpuolelle on ladottu '
            + 'vaaleasta marmorista, kellertävästä kivestä ja punaisista '
            + 'ja vihreistä paloista leveä punos, joka kiertyy itsensä '
            + 'ympäri. Ylinnä kulkee kaksi arabiankielistä '
            + 'kirjoitusnauhaa, kaaren yläosassa on kivinen '
            + 'ristikkoikkuna, ja alhaalla erottuu syvennyksen sileä '
            + 'marmoripohja. Vasemmassa reunassa roikkuu vihreä '
            + 'tekstitaulu ja oikealla loistelamppu.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Kello nostettiin minareetin malliin',
          tiedosto: 'Bab al-Faraj Clock tower 01.jpg',
          teksti: 'Bab al-Farajin portin viereen nousi vuosina 1898–1899 '
            + 'kellotorni. Sen piirsi Aleppon kaupunginarkkitehti Charles '
            + 'Chartier, ja työssä oli mukana syyrialainen insinööri Bakr '
            + 'Sidqi; rakennuttajana oli kaupungin ottomaanikuvernööri '
            + 'Raif Pasha. Sulttaani Abdulhamid II oli kannustanut '
            + 'hankkeeseen merkiksi uudesta ajasta, jossa kello määrää '
            + 'tahdin. Torni maksoi 1 500 ottomaanien liiraa, ja siitä '
            + 'puolet kerättiin lahjoituksina ja puolet maksoi kaupunki. '
            + 'Vihkiäiset pidettiin vuonna 1900, kun sulttaanin '
            + 'valtaannoususta oli kulunut 25 vuotta. Muoto lainattiin '
            + 'vanhoista minareeteista: neljä samanlaista julkisivua ja '
            + 'huipulla itämainen kennokoriste.',
          selite: 'Bab al-Farajin kellotorni aukiollaan. Vaalea kivitorni '
            + 'kapenee ylöspäin, ylimmässä kerroksessa on kaksi valkoista '
            + 'kellotaulua mustine viisareineen, ja huipulla on pieni '
            + 'lyhtymäinen kupu. Torni seisoo aidatulla korokkeella '
            + 'palmujen keskellä. Taustalla on suuri vaalea '
            + 'hallintorakennus kaari-ikkunariveineen, oikealla liehuu '
            + 'Syyrian lippu, ja aukiolla on autoja, pakettiauto ja '
            + 'kävelijöitä. Etualalla liikennettä ohjaa poliisi '
            + 'valkolakkisena ja heijastinliivissä, ja katutyöntekijä '
            + 'vetää kaksipyöräistä roskakärryä.',
          lahde: 'Preacher lad, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja keittiö',
      johdanto: 'Aleppon keittiö nojaa kolmeen ainekseen: kaupungin omaan '
        + 'pippuriin, saksanpähkinään ja granaattiomenasiirappiin. Kaikki '
        + 'kolme päätyvät samalle pöydälle, ja lautaselta katsottuna '
        + 'kaupunki on punainen.',
      nostot: [
        {
          otsikko: 'Pippuri kuivataan vain puoliksi',
          tiedosto: 'Aleppo chili powder.jpg',
          teksti: 'Aleppon pippuri on paprikalaji, jonka palot kypsytetään '
            + 'tummanpunaisiksi, kuivataan vain puolikuiviksi, '
            + 'siemennetään ja rouhitaan karkeaksi hiutaleeksi. '
            + 'Kuivauksessa käytetään suolaa, joten hiutale maistuu '
            + 'hieman suolaiselta ja tuntuu öljyiseltä. Polttavuus on '
            + 'Scovillen asteikolla noin 10 000: tuli nousee hitaasti, ja '
            + 'maussa on hedelmäinen, rusinaa muistuttava vivahde. Koska '
            + 'siemenet ja sisäliha on poistettu, hiutale on mietompi '
            + 'kuin tavallinen chilirouhe. Turkissa sama mauste on '
            + 'nimeltään pul biber, ja se on maan kolmanneksi käytetyin '
            + 'mauste heti suolan ja mustapippurin jälkeen.',
          selite: 'Kasa Aleppon pippurirouhetta puisella laudalla. Hiutaleet '
            + 'ovat tummanpunaisia ja epätasaisen kokoisia, ja joukossa '
            + 'kiiltää muutama kirkkaanpunainen kuorenpala. Kasa on '
            + 'kaadettu kartioksi, ja sen juurelle on varissut hiutaleita '
            + 'laudalle. Vasemmassa reunassa näkyy toisen kasan kulma, '
            + 'joka on vihreä ja karkeajakoinen, ja taustalla on vaalea '
            + 'kangas.',
          lahde: 'Veganbaking.net, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          otsikko: 'Tahna survotaan huhmareessa',
          tiedosto: 'Muhammara.jpg',
          teksti: 'Muhammara on Aleppossa syntynyt tahna, ja nimi tarkoittaa '
            + 'arabiaksi punaiseksi muuttunutta. Pohjana ovat tuoreet '
            + 'punaiset paprikat, jotka voidaan myös kuivata auringossa '
            + 'tai grillata ensin. Joukkoon jauhetaan saksanpähkinöitä, '
            + 'jotka antavat rakenteen, korppujauhoa, joka sitoo massan, '
            + 'valkosipulia, Aleppon pippuria, suolaa ja oliiviöljyä. '
            + 'Makean ja happaman vivahteen tuo granaattiomenasiirappi. '
            + 'Perinteisesti seos survotaan huhmareessa, jolloin massa '
            + 'jää hieman karkeaksi. Damaskoksessa mukaan lisätään '
            + 'toisinaan tahinia, ja läntisessä Turkissa tahna tunnetaan '
            + 'nimellä acuka.',
          selite: 'Muhammaraa suurella soikealla lautasella. Tumman '
            + 'punaruskea tahna on levitetty tasaiseksi kerrokseksi ja '
            + 'sen pinta on vedetty aaltoileviin uriin, joissa kiiltää '
            + 'oliiviöljy. Päälle on aseteltu kokonaisia '
            + 'saksanpähkinänpuolikkaita ja mintunlehtiä, ja lautasen '
            + 'reunassa on vihreä-vaalea ruudutus. Takana näkyy '
            + 'kulhollinen valkoista kastiketta, lasi jäävettä ja tahnan '
            + 'päälle jätetty lusikka.',
          lahde: 'Bazel, Wikimedia Commons (Public domain)',
        },
        {
          otsikko: 'Kastike värjää lautasen purppuraksi',
          tiedosto: 'لحمة بكرز أحد الأطباق الحلبية التراثية.jpg',
          teksti: 'Kebab karaz on Aleppon oma ruokalaji, jota tehdään lampaan '
            + 'jauhelihasta ja kirsikoista. Valmistustapa on lähempänä '
            + 'muhennosta kuin vartaassa paistettua kebabia. Oikeassa '
            + 'versiossa marja on hapan kirsikka: soikea, kahdeksasta '
            + 'kymmeneen millimetriin pitkä ja karmiininpunainen, siis '
            + 'selvästi pienempi kuin makea kirsikka. Lajikkeita on '
            + 'useita, ja yksi niistä kantaa nimeä Aleppo. Koska marja on '
            + 'yhtä aikaa makea ja kirpeä, se sopii rasvaisen '
            + 'lampaanlihan pariksi, ja kypsyessään kastike värjää '
            + 'annoksen kirkkaan purppuranpunaiseksi. Armeniaksi ruoka on '
            + 'fishnah kabab.',
          selite: 'Valkoisella lautasella on kasa tummanpunaisia, kiiltäviä '
            + 'lihapyöryköitä paksussa kirsikkakastikkeessa. Kastike on '
            + 'valunut lautasen laidoille ja niiden päälle asetelluille '
            + 'kolmiomaisille leipäpaloille, ja pyöryköiden päälle on '
            + 'ripoteltu hienonnettua persiljaa ja mausteita. Oikeassa '
            + 'reunassa on hopeinen lusikka ja taustalla toisen annoksen '
            + 'reuna vihanneksineen.',
          lahde: 'طارق مناديلي, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      tehtava: {
        kysymys: 'Mikä hedelmä haudutetaan Aleppossa lampaan jauhelihan '
          + 'kanssa?',
        vaihtoehdot: [
          'hapan kirsikka',
          'kuivattu viikuna',
          'vihreä omena',
          'suolattu sitruuna',
        ],
        oikea: 0,
        fakta: 'Marja on soikea ja vain 8–10 millimetriä pitkä, ja se '
          + 'värjää koko annoksen purppuranpunaiseksi.',
      },
    },
  ],
  /*
   * DAMASKOKSEN KANSISIVU (nippu 2, 13.8.2026). SYR-maalehdellä on
   * historia, kasityo ja ruoka, joten kaupunki ottaa oman aiheensa.
   */
  damaskos: [
    {
      id: 'kaupunki',
      nimi: 'Damaskos',
      johdanto: 'Damaskoksen keskustassa seisovat rinnakkain 1550-luvun '
        + 'rakennusryhmä joen rannalla, vuonna 1749 valmistunut '
        + 'kuvernöörin palatsi ja vuonna 1913 tilattu rautatieasema.',
      kansikuvat: [
        {
          tiedosto: 'Panorama de Damas - Bonfils. LCCN2004670447.jpg',
          selite: 'Damaskoksen kattomeri 1800-luvun valokuvassa. '
            + 'Tasakattoisia matalia taloja on satoja peräkkäin, keskellä '
            + 'kohoaa suuren moskeijan kupoli ja kolme minareettia, ja '
            + 'takana nousee karu vuorijono. Etualalla on muurin päällä '
            + 'kattoterassi, sen kaide ja pieni katettu kioski. Kuvan '
            + 'alareunaan on kirjoitettu 793 – Panorama de Damas ja nimi '
            + 'Bonfils.',
          lahde: 'Maison Bonfils (Beirut, Lebanon), photographer, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'View of Mount Qasioun from Damascus Orchards.jpg',
          selite: 'Damaskoksen hedelmätarhoja ja niiden takana Qasioun-vuori. '
            + 'Etualalla on valkoisenaan kukkiva kenttä ja vanhoja '
            + 'oliivipuita, joista kaksi on kuivunut pelkiksi rungoiksi. '
            + 'Vuoren rinnettä peittää tiiviisti rakennettu kaupunginosa, '
            + 'harjanteella seisoo mastoja, ja taivaalla on pilviä. Kuvan '
            + 'värit on säädetty voimakkaiksi.',
          lahde: 'Mohamad Emad Basha, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          tiedosto: 'Interieur van een woonhuis (SyrieIntérieur de Maison - Damas) Architecture antique Égypte, Grèce, Asie Mineure album de photographies (serietitel), BI-F-B-SCHOLEN-0098-28.jpg',
          selite: 'Damaskoslaisen talon piha 1800-luvun valokuvassa. Korkea '
            + 'suippokaari on muurattu vuorotellen vaaleasta ja tummasta '
            + 'kivestä, ja sen sisäseinä on täynnä kaiverrettua ja '
            + 'upotettua koristelua. Pihan poikki kulkee kapea vesiallas, '
            + 'jonka suihku sumuaa. Oikealla on kaksikerroksinen '
            + 'kaarikäytävä, vasemmalla tiilikattoinen katos, ja '
            + 'pylväiden ympärille on kierretty köynnöksiä. Alareunassa '
            + 'lukee SYRIE, Intérieur de Maison (Damas) ja Bonfils Phot.',
          lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Parturi kirjasi, mistä marmori tuli',
          tiedosto: 'Azm Palace - Damascus.jpg',
          teksti: 'Damaskoksen kuvernööri As\'ad Pasha al-Azm rakennutti '
            + 'itselleen asuintalon Buzurijjan maustekujan '
            + 'pohjoispuolelle vuonna 1749. Työmiehiä oli 800 ja työ '
            + 'kesti kolme vuotta. Pinta-alaa on 6 400 neliömetriä, ja '
            + 'rakennukset jakautuvat kolmeen osaan: perheen puoli, '
            + 'vieraiden puoli ja palvelusväen puoli. Perheen puolella on '
            + 'oma kylpylä, pienoiskoossa sama tilasarja kuin kaupungin '
            + 'julkisissa kylpylöissä. Damaskoslainen parturi Ahmad '
            + 'al-Budairi kirjasi päiväkirjaansa, että kun kuvernööri '
            + 'kuuli harvinaisesta marmorista tai posliinista, hän '
            + 'lähetti hakemaan sen omistajan luvalla tai ilman. Talossa '
            + 'on nykyään kansanperinteen museo.',
          selite: 'Azm-palatsin julkisivu pihan puolelta. Kivi on ladottu '
            + 'vuorotellen vaaleana ja mustana kerroksena, ja '
            + 'ikkunarivien väliin on upotettu erivärisistä kivistä '
            + 'geometrisia paneeleja. Ikkunoissa on mustat rautaristikot, '
            + 'ovea kehystää kaiverrettu kaari, ja oviaukkoon nousee '
            + 'leveät portaat. Etualalla on matala kivijalusta ja sen '
            + 'edessä pyöreän altaan reuna, jonka keskellä on pieni '
            + 'maljasuihkulähde.',
          lahde: 'Bassel Khabbaz, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Keittiö, majatalo ja moskeija samalla pihalla',
          tiedosto: 'دمشق التكية السليمانية.jpg',
          teksti: 'Sulttaani Suleiman I:n käskystä joen rannalle rakennettiin '
            + 'vuosina 1554–1559 rakennusryhmä, jonka piirustukset laati '
            + 'hoviarkkitehti Mimar Sinan. Se toi ottomaanien '
            + 'rakennustyylin Damaskokseen: moskeijan päällä on '
            + 'ottomaanikupolit ja sen kulmilla kaksi ohutta minareettia, '
            + 'mutta seinien vaalean ja tumman kiven vuorottelu on '
            + 'paikallista työtä. Pihan lounaislaidalla on moskeija ja '
            + 'vastapäätä keittiörakennus eli imaret, jonka kummallakin '
            + 'sivulla on majoitussiipi. Itäpuolelle nousi vuosina '
            + '1566–1567 medrese. Ryhmästä tuli Mekkaan matkaavien '
            + 'pyhiinvaeltajien kokoontumispaikka: karavaani varustettiin '
            + 'täällä ennen lähtöä etelään.',
          selite: 'Tekkiye Süleymaniyen majoitussiipi. Kaarikäytävän päällä '
            + 'on rivi matalia kivikupoleja, ja kaarien kiilakivet ovat '
            + 'vuorotellen vaaleita ja tummia. Takana kohoaa kaksi ohutta '
            + 'minareettia, joiden kärjet ovat tummaa lyijyä. Kaarien '
            + 'editse kiipeää muratti, ja niiden väliin on ripustettu '
            + 'naru pieniä lamppuja.',
          lahde: 'Khaled ajlani, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Aseman piirsi espanjalainen arkkitehti',
          tiedosto: 'Damascus Hejaz railway station 7614.jpg',
          teksti: 'Hijaz-asema on Damaskoksen keskustassa Marjehin aukion '
            + 'kupeessa. Se otettiin käyttöön vuonna 1907, kun radan '
            + 'ensimmäinen eteläinen osuus avattiin, ja vuodesta 1909 '
            + 'junat kulkivat säännöllisesti Medinaan asti. '
            + 'Matkustajarakennus tilattiin vasta myöhemmin, vuonna 1913, '
            + 'ja sen suunnitteli espanjalainen arkkitehti Fernando de '
            + 'Aranda, joka piirsi Damaskokseen useita muitakin sen ajan '
            + 'rakennuksia. Julkisivu on symmetrinen ja kiveä, '
            + 'ikkunakaaret suippoja, ja sisällä on koristeltu katto. '
            + 'Rakennuksen edessä on näytteillä sveitsiläisvalmisteinen '
            + 'höyryveturi.',
          selite: 'Hijaz-aseman matkustajarakennus kadun toiselta puolelta. '
            + 'Julkisivu on kaksikerroksinen ja symmetrinen, keskellä on '
            + 'kello ja sen alla rivi suippokaari-ikkunoita, ja katolla '
            + 'liehuu lippu salossa. Oven edessä on portaat ja kaksi '
            + 'palmua, oikealla seisoo tummanvihreä höyryveturi, ja '
            + 'tyhjän asfalttiaukion poikki kävelee kaksi miestä.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Damaskoslainen talo kääntää selkänsä kadulle: ovi vie '
        + 'umpipihalle, jossa on allas ja hedelmäpuita. Saman korttelin '
        + 'kujilla ovat kylpylä, joka on lämmennyt samassa paikassa yli '
        + '800 vuotta, ja kauppa, josta haetaan kuivattua ruokaa.',
      nostot: [
        {
          otsikko: 'Talo ei näytä kadulle mitään',
          tiedosto: 'Damascus Beit Khalid al-Azem 1336.jpg',
          teksti: 'Vanhankaupungin asuintalon ulkoseinässä on muutama ikkuna '
            + 'eikä juuri koristeita. Kaikki on käännetty sisäänpäin: '
            + 'keskellä on avoin piha, hosh, ja sen ympärillä huoneet. '
            + 'Pihalla on suihkulähde, hedelmäpuita ja varjoisa '
            + 'istumapaikka, ja huoneet on jaettu niin, että vieraita '
            + 'otetaan vastaan eri puolella kuin missä perhe asuu. '
            + 'Alaseinät ovat vuorotellen vaaleaa kalkkikiveä ja tummaa '
            + 'basalttia. Paksu kivi pitää sisällä viileän, ja piha panee '
            + 'ilman kiertämään. Ikkunoiden edessä on puiset ristikot, '
            + 'mashrabiyat, jotka päästävät ilman läpi mutta pitävät '
            + 'katseet ulkona.',
          selite: 'Damaskoslaisen talon umpipiha. Alaseinät ovat vuorotellen '
            + 'vaaleaa ja mustaa kiveä, niiden yläpuolella kiertää kapea '
            + 'koristevyö, ja ylempi kerros on valkoiseksi rapattu ja '
            + 'ikkunat puuta. Pihalla kasvaa kaksi nuorta '
            + 'sitrushedelmäpuuta ja ruukuissa yrttejä, kiveys on '
            + 'shakkiruudukkoa, ja vasemmalla näkyy pyöreän vesialtaan '
            + 'reuna. Seinää pitkin laskeutuu peltinen syöksytorvi.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Neljä huonetta samassa järjestyksessä',
          tiedosto: 'Damascus Hammam Nur al-Din 5369.jpg',
          teksti: 'Kylpylöitä on Damaskoksessa laskettu monta kertaa. Ibn '
            + 'Asakir luetteli 1100-luvulla 77 toimivaa hammamia, Ibn '
            + 'Shaddad 114 vuonna 1250, ja ottomaanien aikaan niitä oli '
            + '365. Parhaiten säilynyt on Nur al-Din al-Shahidin kylpylä '
            + 'Buzurijjan kujalla, joka on ollut käytössä noin vuodesta '
            + '1160. Kylpijä kulkee huoneesta toiseen aina samassa '
            + 'järjestyksessä: ensin sali, jossa riisuudutaan, sitten '
            + 'viileä huone, lämmin huone ja kuuma huone. Lämpö tulee '
            + 'uunista seinän takaa, ja kuuma ilma kiertää lattian alla. '
            + 'Polttoaineena on käytetty puusepiltä saatuja lastuja ja '
            + 'öljypuristamoiden oliivinkiviä.',
          selite: 'Nur al-Dinin kylpylän etusali, jossa riisuudutaan ja '
            + 'levätään. Korkeaa kupolia kannattavat kaaret on muurattu '
            + 'vuorotellen mustasta ja vaaleasta kivestä, holvien '
            + 'pinnassa on maalattuja kukkakiehkuroita ja seinissä '
            + 'värilasi-ikkunoita. Katosta riippuu ketjuissa lyhtyjä ja '
            + 'tupsullisia lamppuja. Alhaalla istuu ja seisoo miehiä '
            + 'pyyhkeet vyötäröllä, pyyhkeitä kuivuu narulla ja penkillä '
            + 'on pino puhtaita liinoja.',
          lahde: 'Dosseman, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Hedelmä keitetään levyksi ja kuivataan auringossa',
          tiedosto: 'Syrian apricot paste 01.jpg',
          teksti: 'Qamar al-din tarkoittaa uskon kuuta, ja se on aprikoosista '
            + 'tehty kuivattu levy. Aprikoosit ja sokeri keitetään, massa '
            + 'siivilöidään oliiviöljyyn kastetun puusiivilän läpi ja '
            + 'levitetään kuivumaan suoraan aurinkoon. Levy on paksumpi '
            + 'ja maultaan voimakkaampi kuin tavallinen hedelmälevy. '
            + 'Juomaksi se muuttuu, kun sekaan sekoitetaan ruusuvettä tai '
            + 'appelsiininkukkavettä ja jäitä; levyä syödään myös '
            + 'sellaisenaan, usein saksanpähkinän ympärille käärittynä. '
            + 'Lajike, josta levy tehdään, kasvoi ensimmäisenä '
            + 'Damaskoksen ympäristön viljelyksillä. Reseptin kirjasi '
            + 'lääkäri Dawud al-Antaki vuonna 1599.',
          selite: 'Kuivattua aprikoosipastaa myyntipakkauksissa. Keltaisissa '
            + 'laatikoissa on vihreä etiketti, jossa on kuva neljästä '
            + 'aprikoosista ja teksti Dried Apricot Paste, Made in Syria '
            + 'ja paino 500 g; valmistajaksi on merkitty damaskoslainen '
            + 'yritys. Laatikoiden päällä on vaaleanpunaiset hintalaput, '
            + 'joissa lukee 4.00, ja vasemmalla on pusseissa kuivattuja '
            + 'rusinoita.',
          lahde: 'Joe Mabel, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      tehtava: {
        kysymys: 'Mitä Damaskoksen kylpylöiden uuneissa on poltettu puun '
          + 'ohella?',
        vaihtoehdot: [
          'Oliivinkiviä',
          'Taatelinkiviä',
          'Kuivaa ruohoa',
          'Ruokohiiltä',
        ],
        oikea: 0,
        fakta: 'Kylpylän uuni pidettiin käynnissä koko aukioloajan, ja '
          + 'polttoaine tuli muiden ammattien jätteestä: puusepän '
          + 'lastuista ja öljypuristamon kivistä.',
      },
    },
  ],
  /*
   * LUXORIN KANSISIVU (nippu 2, 13.8.2026). EGY-maalehdellä on
   * historia, ruoka, kuvataide, luonto, tiede, musiikki, rakennukset
   * ja elaimet, joten kaupungille jää arki.
   */
  luxor: [
    {
      id: 'kaupunki',
      nimi: 'Luxor',
      johdanto: 'Luxorin itärannalle mahtuu runsaan kahden kilometrin matkalle '
        + 'vuonna 640 perustettu moskeija, tammikuussa 1907 avattu '
        + 'hotelli ja pyhä järvi, jonka rannalla makaa kahtia katkennut '
        + 'obeliski.',
      kansikuvat: [
        {
          tiedosto: 'Rivier met wadende buffels aan de rand van Luxor E 71. Het plaatsje Luxor (Arabisch kwartier). Opper-Egypte. (titel op object), RP-F-1997-28-6.jpg',
          selite: 'Ruskeasävyinen 1800-luvun valokuva pahville liimattuna. '
            + 'Kuvassa on matala vesiuoma Luxorin laidalla: keskellä '
            + 'uomaa seisoo vesipuhveli polviaan myöten vedessä, ja '
            + 'lähemmällä rannalla juo aasi. Rantatörmällä kävelee mies '
            + 'kantaen astiaa olalla, ja kivimuurin päällä on suuri '
            + 'saviruukku. Vastarannalla on savitiilitaloja, joiden '
            + 'yläreunassa on hammastettu kuvio, ja niiden takana tiheä '
            + 'palmulehto. Vasemmalla kaartuu suuri lehtipuu. Pahville on '
            + 'painettu teksti E 71. Het plaatsje Luxor (Arabisch '
            + 'kwartier). Opper-Egypte.',
          lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Gezicht op de bouw van een boot langs de Nijl te Luxor Louqsor (titel op object) Egypte (serietitel), RP-F-2001-7-1540-7.jpg',
          selite: 'Albumin aukeama, jossa on vaaleaharmaa painokuva Luxorin '
            + 'rannasta. Keskellä on rakenteilla oleva vene: rungon '
            + 'kaaret törröttävät ylöspäin kuin kylkiluut, ja ympärillä '
            + 'on puutavaraa ja telineitä. Vasemmalla on kiinnitettynä '
            + 'kolme purjevenettä, joiden pitkät raakapuut nojaavat '
            + 'viistosti taivaalle. Takana on valkoisia tasakattoisia '
            + 'taloja, muuri ja tiheä palmurivi, oikealla kohoaa '
            + 'minareetti. Etualalla kahlaa kaksi ihmistä matalassa '
            + 'vedessä. Kuvan yläpuolelle on painettu EGYPTE ja '
            + 'alapuolelle LOUQSOR sekä kolmen pariisilaisen kustantajan '
            + 'nimet. Oikeassa reunassa näkyy albumin tumma selkämys.',
          lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Luxor New Corniche R02.jpg',
          selite: 'Luxorin uusi rantapromenadi keskipäivällä. Etualalla on '
            + 'leikattua nurmikkoa, pieniä pensaita ja sorakaistale, ja '
            + 'niiden välistä kulkee laatoitettu kävelytie mustine '
            + 'pollarivalaisimineen. Rannan reunaa seuraa matala '
            + 'kivimuuri, jonka takana Niili levittäytyy vaaleana ja '
            + 'tyynenä; kauempana usvassa erottuu risteilylaivan '
            + 'valkoinen kylki. Vasemmalla on mustia lyhtypylväitä, '
            + 'joissa on kolme pallovalaisinta, ja pieniä '
            + 'lehmuksenkokoisia puita. Oikealla kohoaa vaalea kiviportti '
            + 'kaariaukkoineen, balustradikaiteineen ja lyhtyineen, ja '
            + 'sen vieressä nousevat leveät portaat. Kaukana kävelee '
            + 'muutama ihminen ja seisoo puinen pergola.',
          lahde: 'Marc Ryckaert, Wikimedia Commons (CC BY 3.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Moskeija seisoo temppelin pylväiden päällä',
          tiedosto: 'Abu el-Haggag R02.jpg',
          teksti: 'Luxorin temppelistä se osa, joka on Ramses II:n pihaa, '
            + 'muutettiin vuonna 395 kirkoksi ja vuonna 640 moskeijaksi. '
            + 'Nykyinen rakennus on 1200-luvulta ajjubidisulttaani '
            + 'as-Salih Ayyubin ajalta, ja se seisoo suoraan muinaisten '
            + 'pylväiden päällä: temppelin päälle oli kertynyt '
            + 'keskiajalta lähtien asutusta ja sen jätettä niin paljon, '
            + 'että syntyi 14,5–15 metriä korkea keinotekoinen kukkula. '
            + 'Gaston Maspero alkoi kaivaa sitä pois vuoden 1884 jälkeen, '
            + 'mutta moskeijaa ei purettu. Kupolin alla on sheikki Yusuf '
            + 'Abu al-Haggagin (1150–1245) hauta, ja savitiilisiä '
            + 'minareetteja on kaksi. Moulid-juhlassa suvun jäsenet '
            + 'kantavat veneitä temppelin ympäri kolmen päivän ajan.',
          selite: 'Abu al-Haggagin moskeija Luxorin temppelin kyljessä. '
            + 'Vasemmalla kohoaa valkoiseksi rapattu minareetti, jonka '
            + 'parvekkeen alla on värikkäitä kaarikuvioita ja huipulla '
            + 'kuunsirppi. Keskellä on valkoinen kupoli ja sen edessä '
            + 'kaarikuisti, ja niiden oikealla puolella nousee vanha '
            + 'ruskea tiiliminareetti kiinni temppelin viistoon pyloniin, '
            + 'jonka pinnassa on suorakaiteen muotoisia aukkoja. Aluetta '
            + 'rajaa matala kivimuuri, jossa on lyhtyjä, ruskeita ovia ja '
            + 'rautaristikoita; portin takana seisoo moottoripyörä ja '
            + 'portaat nousevat pyloniin. Muurin vierellä istuu muutama '
            + 'ihminen, vasemmassa laidassa on vihreä metallirakennelma, '
            + 'ja oikeassa alakulmassa on punagraniittinen jalusta. Aukio '
            + 'on laatoitettu, ja molemmissa laidoissa kasvaa palmuja.',
          lahde: 'Marc Ryckaert, Wikimedia Commons (CC BY 3.0)',
        },
        {
          otsikko: 'Hotelli avattiin lauantaina 19. tammikuuta 1907',
          tiedosto: 'Egypt. Luxor. Winter Palace Hotel; front view from north west LOC matpc.00281.jpg',
          teksti: 'Niilin rantaan rakennettiin Winter Palace -hotelli, joka '
            + 'avattiin lauantaina 19. tammikuuta 1907 eväsretkellä, '
            + 'illallisella ja puheilla. Rakennuttaja oli Benjamin Herbst '
            + 'yhtiöstä Upper Egypt Hotels Co, jonka kairolaiset '
            + 'hotellinpitäjät Charles Baehler ja George Nungovich '
            + 'perustivat 1905 yhdessä matkatoimisto Thomas Cook & Sonin '
            + 'Egyptin-yhtiön kanssa. Piirustukset teki Leon Stienon, ja '
            + 'työn toteutti italialainen teräsbetoniin erikoistunut '
            + 'rakennusliike G. Garozzo & Figli. Huoneita on 86 ja '
            + 'sviittejä kuusi. Egyptologi Howard Carter kiinnitti '
            + 'tiedotteitaan talon ilmoitustaululle, ja hänen '
            + 'rahoittajansa lordi Carnarvon oli vakioasiakas vuodesta '
            + '1907.',
          selite: 'Winter Palace -hotelli mustavalkoisessa lasinegatiivissa. '
            + 'Kolmikerroksisen vaalean rakennuksen keskellä on '
            + 'koristeellinen päätykilpi, jossa lukee WINTER PALACE, ja '
            + 'sen päällä on lippusalko. Julkisivussa on rivi ikkunoita '
            + 'säleluukkuineen ja pieniä kaidereunaisia parvekkeita, ja '
            + 'pääovelle nousee kaksi kaartuvaa portaikkoa kaiteineen. '
            + 'Sisäänkäynnin edessä on pylväskatos, jonka väliin on '
            + 'ripustettu kuviollisia mattoja. Puutarhassa on matalia '
            + 'koristeellisia rautakaiteita, pensasaitoja, agaaveja ja '
            + 'palmuja. Nurmikolla istuu tuoleilla ryhmä ihmisiä ja '
            + 'hieman erillään seisoo mies pitkässä tummassa viitassa ja '
            + 'valkoisessa päähineessä; toinen mies kävelee portaita '
            + 'kohti. Oikealla on katulyhty ja negatiivin oikeaan reunaan '
            + 'on kirjoitettu käsin tekstiä ja numero.',
          lahde: 'Matson Collection, Wikimedia Commons (PD)',
        },
        {
          otsikko: 'Järvi, jossa papit peseytyivät',
          tiedosto: 'Karnak Heiliger See 02.JPG',
          teksti: 'Karnakin temppelialueella on kivireunainen allas, pyhä '
            + 'järvi, jossa papit peseytyivät ennen temppelimenoja. '
            + 'Nykyään sen laidalla on katsomo, josta seurataan alueen '
            + 'ääni- ja valonäytöstä. Rannalla makaa katkennut obeliski. '
            + 'Hatshepsut pystytti temppelin sisäänkäynnille kaksi '
            + 'obeliskia, jotka olivat valmistuessaan maailman '
            + 'korkeimmat, ja myöhemmät kuninkaat muurasivat pystyyn '
            + 'jääneen ympärille seinät, niin ettei sitä näy maan '
            + 'tasalta. Se on 29,56 metriä ja maailman toiseksi korkein '
            + 'yhä pystyssä oleva muinainen obeliski; pari makaa järven '
            + 'rannalla kahtena kappaleena. Lähellä on myös Thutmosis I:n '
            + 'obeliski, 21,20 metriä ja lähes 150 tonnia.',
          selite: 'Karnakin pyhä järvi keskipäivän valossa. Altaan reuna on '
            + 'muurattu tasaisista vaaleista kivilohkareista, ja tyyni '
            + 'vedenpinta heijastaa koko takana olevan rakennusrivin. '
            + 'Keskellä kohoaa viisto pylonin seinä, jossa on kaksi riviä '
            + 'suorakaiteen muotoisia aukkoja, ja sen edessä on '
            + 'matalampia muureja, irrallisia kivilohkareita ja tumma '
            + 'oviaukko. Rannalla kasvaa yksi korkea palmu ja yksi '
            + 'matala, jonka runko on kääritty ruskeaan suojukseen. '
            + 'Rannan yläpuolisella tasanteella on rivi vaaleita '
            + 'suorakaiteen muotoisia levyjä ja pieni koju, jonka seinä '
            + 'on verhoiltu palmunrungoilla. Taivas on pilvetön ja hieman '
            + 'utuinen.',
          lahde: 'Olaf Tausch, Wikimedia Commons (CC BY 3.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja kulkeminen',
      johdanto: 'Luxorissa kuljetaan joen yli lautalla tai moottoriveneellä, '
        + 'kaduilla nelipyöräisillä hevosvaunuilla ja peltojen poikki '
        + 'kapearaiteisella radalla, jonka kiskoväli on 610 millimetriä.',
      nostot: [
        {
          otsikko: 'Lautta maksaa vähän, vene enemmän',
          tiedosto: 'The Baladi Ferry to the West Bank ... (36518913795).jpg',
          teksti: 'Osa Luxorin joukkoliikenteestä kulkee vettä pitkin. Suuret '
            + 'lautat vievät maakunnan asukkaita ja matkailijoita '
            + 'rannalta toiselle nimellistä maksua vastaan. Niiden '
            + 'rinnalla molempien rantojen edustalla päivystää koko '
            + 'päivän moottoriveneitä, joilla ylitys käy nopeammin mutta '
            + 'maksaa enemmän. Jokiliikenteeseen kuuluvat lisäksi '
            + 'laivaväylä, Niilin laiturit ja sulut sekä Luxorin ja '
            + 'Assuanin väliä kulkevat matkustaja-alukset ja '
            + 'tavaraproomut. Maitse rannalta toiselle pääsee vuonna 1998 '
            + 'avattua siltaa pitkin, joka rakennettiin muutama kilometri '
            + 'kaupungin yläpuolelle. Itärannalla on lisäksi useita '
            + 'bussilinjoja, joita käyttävät lähinnä paikalliset.',
          selite: 'Lautta ylittää Niiliä hämärässä. Matalalla puurunkoisella '
            + 'aluksella on keltainen katos ja avoimet kyljet, ja '
            + 'kannella seisoo tiiviissä rivissä kymmeniä matkustajia. '
            + 'Kylkeä kiertää rivi renkaita lepuuttajina, ja kannen '
            + 'keskellä on lyhyt masto. Vesi on tyyni ja heijastaa '
            + 'aluksen valot pitkinä juovina. Takana häämöttävät sumun '
            + 'läpi rannan puurivi ja matala vuorijono, ja taivas on '
            + 'sinisenharmaa.',
          lahde: 'Bernard DUPONT from FRANCE, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          otsikko: 'Vaunun malli on nimetty kuningattaren mukaan',
          tiedosto: 'Egypt (Luxor) Caleches, horse carriages, waiting for travellers (25709030843).jpg',
          teksti: 'Luxorissa ajetaan hevosvaunuilla, joita sanotaan arabiaksi '
            + 'hantouriksi. Malli on englantilainen victoria: '
            + 'nelipyöräinen avovaunu, jossa on edessä korotettu ajajan '
            + 'istuin ja sen takana kahden matkustajan penkki taitettavan '
            + 'kuomun alla. Vaunu kehitettiin Ranskassa, tuotiin '
            + 'Englantiin vuonna 1869 ja nimettiin kuningatar Victorian '
            + 'mukaan, minkä jälkeen siitä tuli muotiajoneuvo '
            + 'puistoajeluille. Kyytiin noustaan matalalta askelmalta, ja '
            + 'pyörien päällä on leveät kaarevat lokasuojat, jotka '
            + 'suojaavat matkustajia mudalta ja roiskeilta. Egyptissä ja '
            + 'Levantissa hantour on vuokra-ajoneuvo.',
          selite: 'Kaksi hevosvaunua odottaa ruokokattoisen katoksen alla '
            + 'Luxorissa. Etummaisessa vaunussa on siniset ja violetit '
            + 'puiset pinnapyörät, mustaksi maalattu runko, kuvioitu '
            + 'istuinverhoilu ja taakse taitettu kuomu. Eteen on '
            + 'valjastettu kaksi valkoista hevosta, joista toisen kuono '
            + 'on peitetty vaalealla säkillä. Katos on rakennettu '
            + 'mustista metallitolpista ja paksusta ruokokerroksesta. '
            + 'Etualalla on laaja vesilammikko, joka heijastaa pyörät ja '
            + 'hevoset. Taustalla näkyy keltaisia ja ruskeita '
            + 'kerrostaloja, katulyhty kolmine lamppuineen, palmuja ja '
            + 'kyltti, jossa lukee EGYPTIA.',
          lahde: 'Güldem Üstün from Istanbul, TURKEY, Wikimedia Commons (CC BY 2.0)',
        },
        {
          otsikko: 'Kaksi rataverkkoa, sama raideleveys',
          tiedosto: 'Luxor Narrow-Gauge Railway R01.jpg',
          teksti: 'Luxorin ympärillä on kaksi erillistä kapearaiteista '
            + 'rataverkkoa. Suurempi on länsirannalla Kurnassa ja '
            + 'pienempi itärannalla kaupungin eteläisillä laitamilla, ja '
            + 'molemmissa raideleveys on kaksi jalkaa eli 610 '
            + 'millimetriä. Valtion pääradan kiskoväli on 1 435 '
            + 'millimetriä. Radat on rakennettu yhtä kuormaa varten: '
            + 'niillä ajetaan sokeriruokoa pelloilta tehtaille. Moni '
            + 'luxorilainen työskentelee maataloudessa, ja seudun tärkein '
            + 'viljelykasvi on juuri se. Valtion rata saapui Luxoriin '
            + 'vuonna 1898, kun linjaa oli jatkettu Qenasta etelään.',
          selite: 'Kapearaiteinen rata ylittää hiekkaisen kadun Luxorin '
            + 'länsirannalla. Kiskot kulkevat kuvan halki oikealta '
            + 'vasemmalle ja jatkuvat kapean betonisillan yli ojan '
            + 'poikki. Sillan takana kasvaa vihreää ruokoa ja pensaikkoa, '
            + 'ja edessä on matala punatiilinen muuri. Oikealla seisoo '
            + 'keltamusta kolmipyöräinen tuk-tuk metallikaiteen vieressä, '
            + 'ja kauempana lähestyy mies moottoripyörällä. Taustalla on '
            + 'savitiilitaloja, joiden katoille on kasattu kuivunutta '
            + 'kasvimassaa, sekä keskeneräinen tiilikerrostalo '
            + 'betonipilareineen ja rivi sähkölankoja. Etualan hiekassa '
            + 'makaa muutama pitkä kuivunut lehti.',
          lahde: 'Marc Ryckaert, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      tehtava: {
        kysymys: 'Mitä Luxorin kapearaiteisilla radoilla kuljetetaan?',
        vaihtoehdot: [
          'sokeriruokoa',
          'kalkkikiveä',
          'taateleita',
          'puuvillaa',
        ],
        oikea: 0,
        fakta: 'Radat vievät sadon pelloilta tehtaille, ja niiden '
          + 'raideleveys on kaksi jalkaa eli 610 millimetriä — valtion '
          + 'päärata on yli kaksi kertaa leveämpi.',
      },
    },
  ],
  /*
   * RIADIN KANSISIVU (nippu 2, 13.8.2026). SAU-maalehdellä on
   * kalliot, vuoret, meri ja luonto, joten kaupungille jää arki.
   */
  riad: [
    {
      id: 'kaupunki',
      nimi: 'Riad',
      johdanto: 'Riadia kiersi 1740-luvulta lähtien savimuuri, joka purettiin '
        + 'vuonna 1950, ja al-Olayan kaupunginosaan valmistuivat vuonna '
        + '2000 Saudi-Arabian ensimmäinen pilvenpiirtäjä ja vuonna 2002 '
        + 'sitä runsaat 35 metriä korkeampi torni.',
      kansikuvat: [
        {
          tiedosto: '413 of \'Narrative of a Year\'s Journey through Central and Eastern Arabia (1862-63), etc. (With maps and plans.)\' (11069861105).jpg',
          selite: 'Riadin pohjapiirros 1800-luvun matkakirjasta. Otsikkona on '
            + 'PLAN OF RIAD, ja kaupunkia kiertää katkoviivalla piirretty '
            + 'muuri, joka on ylälaidasta pyöreä ja alalaidasta '
            + 'suorakulmainen. Sisäpuolella kulkevat kadut ja korttelit, '
            + 'keskellä lukee Great Street ja sen varrella Shops. '
            + 'Ulkopuolelle on merkitty joka suuntaan Gardens, vasempaan '
            + 'alakulmaan Wadi Haneefah sekä teitä, joiden kohdalla lukee '
            + 'Road to Derëeyah, Road to Melha, Road to Hasa ja Road to '
            + 'Yemamah. Oikeassa alanurkassa on kompassiruusu ja '
            + 'alalaidassa numeroitu selitys, jossa mainitaan muun muassa '
            + 'Great Square & Market Place, Mosque, Principal gate ja '
            + 'other gates. Paperi on kellastunut.',
          lahde: 'The British Library, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'Downtown Riyadh through a dusty windshield (12753645435).jpg',
          selite: 'Riadilainen katu matalassa illansuun auringossa, kuvattuna '
            + 'auton tuulilasin läpi: lasissa näkyy pyyhkimen jättämiä '
            + 'juovia. Vasemmalla on korkea asuintalo, jonka julkisivussa '
            + 'on rivi parvekkeita ja ilmastointilaitteita ja katolla '
            + 'mastoja. Kadun poikki työntää polkupyörää raidallisessa '
            + 'paidassa oleva mies, ja hänen takanaan ajaa vaaleita '
            + 'autoja. Oikealla on betonitalo, arabiankielisiä '
            + 'liikekylttejä ja optikon mainos; kadun päässä on rivi '
            + 'palmuja ja punaisena palava liikennevalo.',
          lahde: 'Francisco Anzola, Wikimedia Commons (CC BY 2.0)',
        },
        {
          tiedosto: 'King Fahd Road, Riyadh.jpg',
          selite: 'King Fahd Road sillalta katsottuna. Keskellä kulkee maan '
            + 'tason alle painettu moottorikatu, jonka yli menee silta; '
            + 'ajoradalla on muutama auto ja moottoripyöräilijä, ja '
            + 'kaistojen välissä kasvaa matalia viuhkapalmuja. Reunoilla '
            + 'ovat valkoiset betonikaiteet. Oikealla nousee lieriön '
            + 'muotoinen sinipeilinen torni ja sen vieressä toinen '
            + 'lasitalo, vasemmalla on pysäköityjä autoja ja rivi '
            + 'lehtipuita. Taivas on sininen, ja siinä on ohuita pilviä.',
          lahde: 'Radosław Botev, Wikimedia Commons (CC BY 3.0 pl)',
        },
      ],
      nostot: [
        {
          otsikko: 'Aukko nostaa talon määräyksen yli',
          tiedosto: 'Kingdom Centre Riyadh 2024.jpeg',
          teksti: 'Kingdom Centre valmistui al-Olayan kaupunginosaan vuonna '
            + '2002. Kerroksia on 99 ja korkeutta 302,3 metriä, mutta '
            + 'Riadin korkein rakennus se ei ole: vuonna 2014 valmistunut '
            + 'Burj Rafal yltää 307,9 metriin. Pohja on mantelin '
            + 'muotoinen, ja kapeat päädyt osoittavat itään ja länteen, '
            + 'missä aurinko lämmittää seinää eniten. Ylimmässä '
            + 'kolmanneksessa on ylösalaisin käännetty kaari, jonka yli '
            + 'kulkee 65 metrin pituinen silta: teräsrakenne painaa 300 '
            + 'tonnia, ja siinä on ikkunat molemmilla sivuilla. Aukolla '
            + 'on toinenkin tehtävä. Paikallinen määräys rajaa '
            + 'käyttökerrosten määrän kolmeenkymmeneen, ja tyhjä kaari '
            + 'nostaa talon sen rajan yläpuolelle.',
          selite: 'Kingdom Centre yöllä. Torni kohoaa tummana pilviselle '
            + 'taivaalle, ja sen yläosassa on valaistu kaari, jonka '
            + 'poikki kulkee silta; kaaren alle laskeutuu ohuita '
            + 'vaijereita. Ikkunarivit palavat keltaisina ja sinisinä ja '
            + 'kaartuvat tornin kylkeä pitkin. Edessä kasvaa alhaalta '
            + 'valaistuja taatelipalmuja ja leikattuja pensaita, oikealla '
            + 'on korkea katuvalopylväs ja matala rakennus, jonka '
            + 'reunassa hohtaa violettia valoa. Alalaidassa näkyy '
            + 'pysäköityjä autoja.',
          lahde: 'Hamza A. Durrani, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Kärki kapenee, pallossa on ravintola',
          tiedosto: 'All Faisaliah Tower Riyadh, 2023.jpeg',
          teksti: 'Al Faisaliah oli valmistuessaan toukokuussa 2000 '
            + 'Saudi-Arabian ensimmäinen pilvenpiirtäjä. Suunnittelijaksi '
            + 'kutsuttiin Foster + Partners vuonna 1994, ja rakentaminen '
            + 'alkoi 1997. Torni on 267 metriä korkea, kerroksia on 44 ja '
            + 'niistä 30 on toimistoja. Neljä sivua kapenee ylöspäin '
            + 'kärjeksi, ja esikuvaksi mainitaan Umar ibn al-Khattabin '
            + 'moskeija al-Joufissa. Kahdensadan metrin korkeudella on '
            + 'näköalataso ja sen yläpuolella lasipallo, jonka sisällä on '
            + 'ravintola. Hotellin ja tornin väliseen aulaan tilattiin '
            + 'vuonna 1999 Brian Clarken lasitaideseinä, jonka pinta-ala '
            + 'on 22 000 neliöjalkaa eli noin 2 000 neliömetriä.',
          selite: 'Al Faisaliah -torni keskipäivän valossa. Rakennus kapenee '
            + 'neljältä sivulta kärjeksi, ja kulmissa nousevat valkoiset '
            + 'teräspilarit, joiden väliin on kiinnitetty vinotukia. '
            + 'Ikkunanauhat ovat tummia ja vaakasuoria. Huipun alla on '
            + 'kultainen lasipallo, sen yläpuolella terävä piikki. '
            + 'Etualalla kasvaa rivi palmuja, molemmilla sivuilla on '
            + 'matalampia vaaleita rakennuksia, joista vasemmanpuoleisen '
            + 'julkisivu on pyöreä, ja alhaalla näkyy pysäköintialueen '
            + 'metallikatos ja valkoinen auto.',
          lahde: 'Hamza A. Durrani, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Portin nimi on lainattu persiasta',
          tiedosto: 'Riyadh walled town remains.jpg',
          teksti: 'Vanhaa Riadia kiersi savesta rakennettu muuri, jossa oli '
            + 'vartiotorneja ja portteja. Sen pystytti 1740-luvun '
            + 'tienoilla kaupungin hallitsija Daham bin Dawas, ja Turki '
            + 'al-Saud rakennutti sen uudelleen vuoden 1824 jälkeen; '
            + 'viimeisen kerran muuri uusittiin vuoden 1902 Riadin '
            + 'taistelun jälkeen. Portteja luetellaan nimeltä yhdeksän ja '
            + 'vartiotorneja noin kaksikymmentä, mutta portteja sanotaan '
            + 'olleen myös kymmenkunta. Niitä kutsuttiin sanalla darawiz, '
            + 'joka on persian portin darvaza arabialaistettu monikko. '
            + 'Muuri purettiin vuonna 1950, jotta kaupunki pääsi '
            + 'kasvamaan sen ulkopuolelle.',
          selite: 'Kaupunginmuurin säilynyt pätkä nykyisessä Riadissa. '
            + 'Vasemmalla on pyöreä torni, jonka yläreunassa on '
            + 'kolmiohampainen harja ja seinässä pieniä reikiä. Torniin '
            + 'liittyy paksu savipintainen muuri, joka kapenee ylöspäin '
            + 'ja jonka pinnassa erottuvat vaakasuorat kerrokset; '
            + 'alareunassa on kivijalka. Muurin viertä nousevat '
            + 'kiviportaat, joiden edessä on metalliaita ja oranssi '
            + 'liikennekartio. Etuala on tiililaatoitettu aukio, jossa on '
            + 'pyöreä kaivonkansi. Oikealla näkyy katulyhty, katu ja '
            + 'nykyisiä taloja, ja muurin yli lankeaa palmun varjo.',
          lahde: 'Hamza A. Durrani, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'arki',
      nimi: 'Arki ja metro',
      johdanto: 'Riadin metrossa junat kulkevat ilman kuljettajaa. Verkko '
        + 'avattiin osissa joulukuun 2024 ja tammikuun 2025 välillä, ja '
        + 'ensimmäisen viikon aikana matkustajia oli 1,9 miljoonaa.',
      nostot: [
        {
          otsikko: 'Kolme avajaispäivää viidessä viikossa',
          tiedosto: 'リヤドメトロ アルマタールT5駅(空港ターミナル5駅)のホーム.jpg',
          teksti: 'Riadin metro avattiin kolmessa erässä: linjat 1, 4 ja 6 '
            + 'aloittivat 1. joulukuuta 2024, linjat 2 ja 5 kaksi viikkoa '
            + 'myöhemmin ja linja 3 vasta 5. tammikuuta 2025. Rataa on '
            + '176 kilometriä ja asemia 85. Linjat tunnetaan väreinä, ja '
            + 'pituudet ovat sininen 38 kilometriä, punainen 25,3, '
            + 'oranssi 40,7, keltainen 29,6, vihreä 12,9 ja violetti '
            + '29,9. Linjakohtaiset asemaluvut antavat yhteensä 94, koska '
            + 'vaihtoasema lasketaan kullekin linjalle erikseen. Guinness '
            + 'kirjasi verkon vuonna 2025 maailman pisimmäksi täysin '
            + 'automaattiseksi metroksi. Rakentaminen maksoi 22,5 '
            + 'miljardia dollaria.',
          selite: 'Metroaseman laituri maan alla. Oikealla kulkee koko '
            + 'pituudelta lasinen laituriovien seinä, ja sen takana '
            + 'rataosuus on pimeä — junaa ei ole. Tumma lasi heijastaa '
            + 'vastapäisen seinän kolmiokuviota, sinistä valojuovaa ja '
            + 'liukuportailla kulkevia ihmisiä. Vasemmalla nousee kolme '
            + 'liukuporrasta, ja katosta riippuu opasteita, joissa lukee '
            + 'arabiaksi ja englanniksi muun muassa To Airport T1-2 ja '
            + 'Exit. Katto on ripalevyä ja lattia vaaleaa laattaa. '
            + 'Laituri itse on tyhjä.',
          lahde: 'Virtual trip, Wikimedia Commons (CC BY 4.0)',
        },
        {
          otsikko: 'Kuusi raidetta saman katon alla',
          tiedosto: 'KAFD Metro Station Riyadh Saudi Arabia 006.jpg',
          teksti: 'KAFD-asema on al-Aqeeqin kaupunginosassa '
            + 'rahoituskaupunginosan kupeessa. Suunnittelukilpailun '
            + 'voitti Zaha Hadid Architects vuonna 2013, rakennustyöt '
            + 'alkoivat 2014 ja tunnelin louhinta heinäkuussa 2015. Asema '
            + 'kattaa 8 150 neliömetriä, ja raiteita on kuusi: sen kautta '
            + 'kulkevat sininen, keltainen ja violetti linja sekä '
            + 'rahoituskorttelin oma monorail. Julkisivun kuvioinnin '
            + 'aiheiksi kerrotaan mashrabiya-ristikot ja jäljet, joita '
            + 'tuuli piirtää hiekkaan. Vuonna 2019 rakennus oli '
            + 'kaupunkikuvassa vielä paljas teräsrunko, ja asema avattiin '
            + 'joulukuussa 2024.',
          selite: 'KAFD-aseman sisäseinä. Valkoisen holvin keskellä on soikea '
            + 'aukko, joka on täytetty vinoneliöiden verkolla: jokainen '
            + 'silmä on pehmeästi pyöristetty, ja niiden takana on lasia, '
            + 'jonka läpi näkyy yön valoja ja aseman rakenteita. Verkon '
            + 'pinta on vaaleaa betonia, ja sen ympärillä kaartuu '
            + 'reikälevyä. Oikeassa reunassa alkaa toinen samanlainen '
            + 'ristikko, ja alhaalla erottuu kaareva kaide ja portaikon '
            + 'suu.',
          lahde: 'Kolaiel, Wikimedia Commons (CC0)',
        },
        {
          otsikko: 'Teräskatos lepää vinon seinän varassa',
          tiedosto: 'Qasr Al Hokm Metro Station - Riyadh - Saudi Arabia 160.jpg',
          teksti: 'Qasr al-Hukmin asema on Al-Qirin kaupunginosassa vanhan '
            + 'ytimen eteläpuolella. Piirustukset teki vuonna 2012 '
            + 'norjalainen Snøhetta, ja rakennusta kuvataan '
            + 'ruostumattomasta teräksestä tehdyksi katokseksi, joka '
            + 'lepää suuren vinon seinän varassa; seinässä on najdilaisen '
            + 'rakennustavan piirteitä. Pinta-alaksi ilmoitetaan '
            + 'lähteestä riippuen 19 600 tai 22 500 neliömetriä. Asemalla '
            + 'on neljä raidetta, ja se on yksi metron neljästä '
            + 'vaihtoasemasta: siinä kohtaavat sininen ja oranssi linja. '
            + 'Matkustajille asema avattiin 26. helmikuuta 2025.',
          selite: 'Qasr al-Hukmin metroasema illalla kadun toiselta puolelta. '
            + 'Soikea teräskatos kelluu maanpinnan yläpuolella, ja sen '
            + 'kiiltävä alapinta heijastaa valot pitkinä vaaleina '
            + 'juovina. Katoksen alla erottuu tumma seinälinja ja sen '
            + 'edessä matala kivipintainen muuri. Ympärillä on korkeita '
            + 'valopylväitä ja valvontakamera, edessä punaiseksi maalattu '
            + 'saattoalue, jolla seisoo maasturi, ja metron tunnuksella '
            + 'varustettuja työmaa-aitoja. Vasemmalla on vaalea '
            + 'kivipintainen rakennus, etualalla monikaistainen katu ja '
            + 'keskikaistan pensaat. Taivas on tummansininen, ja oikeassa '
            + 'yläkulmassa loistaa kuu.',
          lahde: 'Kolaiel, Wikimedia Commons (CC0)',
        },
      ],
      tehtava: {
        kysymys: 'Mikä Riadin metron värilinjoista on lyhin?',
        vaihtoehdot: [
          'vihreä',
          'sininen',
          'oranssi',
          'violetti',
        ],
        oikea: 0,
        fakta: 'Vihreä linja on 12,9 kilometriä pitkä. Pisin on oranssi '
          + '40,7 kilometrillään, ja koko verkkoa on 176 kilometriä.',
      },
    },
  ],
  /*
   * TABRIZIN KANSISIVU (nippu 2, 13.8.2026). IRN-maalehti käsittelee
   * historian, rakennukset, puutarhat, ruoan ja käsityön, joten
   * kaupungille jää luonto ja talvi — Sahand, Eynali ja lumi.
   */
  tabriz: [
    {
      id: 'kaupunki',
      nimi: 'Tabriz',
      johdanto: 'Tabrizin Surkhabissa on hautausmaa, jonne on haudattu '
        + 'runoilijoita 1000-luvulta 2000-luvulle, ja kaupungin '
        + 'kaakkoislaidalla on 55 000 neliömetrin tekoallas, jonka '
        + 'paviljonkiin johtaa pengertie.',
      kansikuvat: [
        {
          tiedosto: '11 Chardin Tabriz 1673.png',
          selite: 'Mustavalkoinen piirros Tabrizista vuodelta 1673. '
            + 'Yläreunassa on kiemuraiseksi piirretty nauha, jossa lukee '
            + 'TAURIS ja sen vieressä sama nimi arabialaisin kirjaimin. '
            + 'Vasemmassa yläkulmassa on ranskankielinen kirjainluettelo, '
            + 'jossa mainitaan kuninkaan aarrekammio, kymmenkunta '
            + 'moskeijaa, suuri sairaala ja kapusiinien hospitaali; '
            + 'vasemmassa alakulmassa on kehystetty toinen luettelo '
            + 'paikallisin nimin. Keskellä levittäytyy matala kaupunki: '
            + 'tiheässä tasakattoisia taloja, kupoleita, minareetteja ja '
            + 'puurivejä, ja kauempana avautuu suuri suorakaiteen '
            + 'muotoinen kenttä, jonka keskellä on rakennus, sekä '
            + 'nelikulmainen torni. Taustalla on paljaita, pyöreälakisia '
            + 'kukkuloita. Etualan mäkien rinteillä makaa hajallaan '
            + 'matalia, pöydän muotoisia kivilaattoja, ja niiden vieressä '
            + 'seisoo muutama pieni ihmishahmo. Oikealla mäen laella on '
            + 'muurien ympäröimä rakennelma, jonne nousee polku, ja '
            + 'alempana on tumma aukko rinteessä.',
          lahde: 'Jean Chardin, Wikimedia Commons (PD)',
        },
        {
          tiedosto: 'Landscape of Tabriz 03.jpg',
          selite: 'Tabriz ylhäältä kuvattuna iltapäivän matalassa valossa. '
            + 'Etualalla on kolmilapainen tuulivoimala niin läheltä, että '
            + 'vain napa ja lavat mahtuvat kuvaan; konehuoneen valkoiseen '
            + 'kylkeen on maalattu punaisella persiankielistä tekstiä. '
            + 'Takana kaupunki täyttää rinteen: keltaisia ja harmaita '
            + 'matalia taloja tiheässä, puukujia, laaja urheilukenttä '
            + 'juoksuratoineen, kaareva vaalea laitosrakennus, punainen '
            + 'liikerakennuksen julkisivu ja kaksi korkeaa asuintornia. '
            + 'Oikeassa yläkulmassa on rakennus, jolla on suuri sininen '
            + 'kupoli. Ylälaidassa talot loppuvat paljaisiin kukkuloihin, '
            + 'joiden juurta seuraa tie.',
          lahde: 'Mostafameraji, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'A street in Tabriz.jpg',
          selite: 'Hedelmäkoju Taleghanin kadulla Tabrizissa. Etualalla on '
            + 'suuria pyöreitä metallitarjottimia täynnä persikoita, '
            + 'punaisia ja vihreitä omenoita ja tummia luumuja, niiden '
            + 'takana keltaisia meloneita ja banaanikimppuja sekä musta '
            + 'muovilaatikko kurkkuja. Tarjottimen alla on pahvilaatikko, '
            + 'jonka kyljessä lukee PREMIUM BANANAS, ja lattialla '
            + 'muovilaatikoita rypäleitä ja luumuja. Ylhäältä roikkuu '
            + 'johtojen varassa paljaita hehkulamppuja, jotka palavat. '
            + 'Kadulla seisoo keltainen taksi takaovi auki, ja ohi kulkee '
            + 'ihmisiä: kuviopaitainen poika, valkosukkainen tyttö, '
            + 'kumartunut mies vaaleansinisessä paidassa, sinipaitainen '
            + 'mies, sinihuivinen nainen ja punapaitainen poika. Seinillä '
            + 'on persiankielisiä liikekylttejä, ilmastointilaite ja puun '
            + 'oksia.',
          lahde: 'Monsieur_mahdi, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      nostot: [
        {
          otsikko: 'Kolmetoista nimeä, tuhat vuotta väliä',
          tiedosto: 'Maghbaratolshoara Tabriz, Iran.jpg',
          teksti: 'Surkhabin kaupunginosassa on hautausmaa nimeltä '
            + 'Maqbarat-o-shoara, runoilijoiden mausoleumi. Sinne on '
            + 'haudattu iranilaisia runoilijoita ja mystikkoja: Asadi '
            + 'Tusi (999–1072), Qatran Tabrizi (1009–1072), Khaqani '
            + '(1122–1190) ja Humam Tabrizi (1238–1314). Nimiä luetellaan '
            + 'kolmetoista, ja vanhimman ja tuoreimman väli on yli tuhat '
            + 'vuotta; viimeisenä on vuonna 2009 kuollut Aziz '
            + 'Dowlatabadi. Yksi haudatuista ei ole runoilija vaan '
            + 'armeijan kenraali Aziz Khan Mokri. Tunnetuin on Shahriar '
            + '(1906–1988), jonka runoelma Heydar Babaya Salam on '
            + 'käännetty yli kolmellekymmenelle kielelle. Nykyinen '
            + 'muistorakennus on pystytetty paikalle 1970-luvulta alkaen.',
          selite: 'Runoilijoiden mausoleumin muistorakennus alhaalta '
            + 'kuvattuna. Vaaleista kivilaatoista ladottu rakennelma '
            + 'muodostuu toisiinsa lomittuvista teräväkärkisistä '
            + 'kaarista, jotka kasvavat reunoilta keskelle päin; kaarien '
            + 'väliin jää aukkoja, joiden yläreunassa on viuhkamainen '
            + 'holvikuvio. Laattojen saumat näkyvät pinnassa suorina '
            + 'viivoina. Alareunassa erottuu sinivalkoinen kaakelipinta '
            + 'ja karkeaa kiveä, vasemmalla vihreä katto ja oikealla '
            + 'kaupungin taloja sekä kukkulan rinne. Taivas on kirkas, ja '
            + 'sen poikki kulkee ohut vaalea juova.',
          lahde: 'Arashk rp2, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Allas näyttää kelluvan laakson yllä',
          tiedosto: 'Elgölü front.jpg',
          teksti: 'Kaupungin kaakkoisosassa on laaja puisto, jonka keskellä '
            + 'on tekoallas. Pinta-alaa sillä on noin 55 000 neliömetriä. '
            + 'Perimätiedon mukaan puisto on 1700-luvun lopulta, mutta '
            + 'osa lähteistä ajoittaa sen jo 1300-luvulle. Qajar-kaudella '
            + 'puistoon lisättiin korkeat terassit, ja altaan '
            + 'pohjoispuoli on rakennettu korkeammaksi: '
            + 'puutarhahistorioitsija Penelope Hobhousen mukaan allas '
            + 'näyttää siksi kelluvan laakson yllä. Altaalle johtaa '
            + 'pengertie, jonka päässä on paviljonki, ja siinä toimii '
            + 'nykyään ravintola. Länsirinteen lähde syöttää altaaseen '
            + 'vettä viittä terassia pitkin. Puistolla on kaksi nimeä: '
            + 'Shah Goli on kuninkaan lampi, El Goli kansan järvi.',
          selite: 'El Golin paviljonki edestä kuvattuna. Keltaisesta tiilestä '
            + 'muurattu kaksikerroksinen rakennus on monikulmainen, ja '
            + 'sen molemmissa kerroksissa kiertää rivi teräväkärkisiä '
            + 'kaaria; katolla on keltainen, uurteinen kupoli. Yläkerran '
            + 'parvekkeella on punainen neonkyltti, jossa on kahvikupin '
            + 'kuva. Rakennuksen edestä laskee leveä laatoitettu terassi, '
            + 'jonka keskellä juoksee kapea vesikouru pieninä altaina; '
            + 'kourua reunustavat valkoiset ja punaiset kukkapenkit, ja '
            + 'etualalla on neliön muotoinen upotettu allas. Molemmin '
            + 'puolin on mustia lyhtypylväitä ja kaiteita, riippapajuja '
            + 'ja kukkivia pensaita, ja vasemmalla puiden takaa näkyy '
            + 'kerrostaloja.',
          lahde: 'Meysem, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Koulu olisi tullut talon tilalle',
          tiedosto: 'Amir Nezam House.jpg',
          teksti: 'Sheshgelanin kaupunginosassa on Amir Nezamin talo, joka '
            + 'tunnetaan myös Tabrizin Qajar-museona. Rakennus on '
            + 'kruununprinssi Abbas Mirzan (1789–1833) ajalta. '
            + 'Kruununprinssi asui qajar-kaudella Tabrizissa vuoteen 1925 '
            + 'asti ja toimi tavallisesti myös Azerbaidžanin '
            + 'kuvernöörinä. Talo jäi pitkäksi aikaa vaille hoitoa ja '
            + 'rapistui niin pahoin, että sen tilalle esitettiin koulua. '
            + 'Purkamisen sijaan rakennus kunnostettiin vuosina 1993–2006 '
            + 'ja merkittiin kansallisesti suojelluksi kohteeksi. '
            + 'Vuodesta 2006 siinä on toiminut museo, jonka aihe on '
            + 'qajar-kausi 1781–1925.',
          selite: 'Amir Nezamin talon piha. Kaksikerroksisen rakennuksen '
            + 'keskellä on kolmiopääty, jossa on tiilikuviointi ja pyöreä '
            + 'koriste, ja sen alla rivi ohuita valkoisia pylväitä. '
            + 'Julkisivun keskellä on kaarevia ikkunoita puisine '
            + 'ristikkoineen, ja alakerran keskeltä laskeutuvat leveät '
            + 'portaat pihalle. Pihalla on kaksi vesiallasta: takana '
            + 'laaja sinipohjainen allas ja edessä kapea kouru, ja '
            + 'molemmissa nousee matala vesisuihku. Kourun reunoilla '
            + 'kasvaa vaaleanpunaisia ja valkoisia kukkia, sivuilla on '
            + 'ruukkuja violetteine kukkineen. Pihalla seisoo kymmeniä '
            + 'ihmisiä. Molemmilla sivuilla on holvikaarinen '
            + 'siipirakennus, ja takana näkyy nykyisiä kerrostaloja.',
          lahde: 'Farzad Karimnijad, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
    },
    {
      id: 'luonto',
      nimi: 'Luonto ja talvi',
      johdanto: 'Tabriz on Quru-joen laaksossa 1 350–1 600 metrin korkeudella '
        + 'merenpinnasta, ja laaksoa reunustavat tulivuorenkartioiden '
        + 'harjanteet: etelässä Sahand, pohjoisessa Eynali. Korkeus näkyy '
        + 'säässä, sillä talvella osa sateesta tulee lumena.',
      nostot: [
        {
          otsikko: 'Seitsemäntoista huippua yli kolmen kilometrin',
          tiedosto: '990305-Sahand-IMG 4014-2.jpg',
          teksti: 'Kaupungin eteläpuolella on Sahand, massiivinen ja '
            + 'voimakkaasti kulunut kerrostulivuori. Korkein huippu on '
            + 'Kamal, 3 707 metriä, ja se on samalla Itä-Azerbaidžanin '
            + 'maakunnan korkein kohta. Yli 3 000 metrin huippuja '
            + 'lasketaan olevan noin seitsemäntoista, ja vuoren '
            + 'suhteellinen korkeus ympäristöönsä on 1 826 metriä. Kivi '
            + 'on pääosin dasiittia ja muita felsisiä lajeja. '
            + 'Tulivuoritoiminta ajoitetaan 12 miljoonan ja 140 000 '
            + 'vuoden väliin; vuorta pidetään uinuvana, eikä viimeisintä '
            + 'purkausta tunneta. Kasvien ja eläinten runsauden takia '
            + 'vuoristoa kutsutaan Iranissa vuorten morsiameksi.',
          selite: 'Sahandin lumihuippu keväällä. Keskellä kohoaa leveä '
            + 'kartiomainen huippu, jonka valkoista lunta rikkovat '
            + 'tummat, sulaneet läiskät ja juovat; oikealle lumikenttä '
            + 'jatkuu loivempana rinteenä ja vasemmalla nousee tumma, '
            + 'lumeton harjanne. Vuoren juurella on vihreitä laidunmaita, '
            + 'joiden poikki kulkee uomia ja kapea tie. Vasemmassa '
            + 'laidassa seisoo ristikkorakenteinen sähköpylväs ja rivi '
            + 'pienempiä pylväitä. Taivas on pilvinen, ja aurinko '
            + 'valaisee rinteen sivusta.',
          lahde: 'Safa.daneshvar, Wikimedia Commons (CC BY-SA 4.0)',
        },
        {
          otsikko: 'Istutettu metsä paljaalla rinteellä',
          tiedosto: 'Eynali picknick.jpg',
          teksti: 'Kaupungin pohjoispuolella nousee Eynalin harjanne, jonka '
            + 'huiput jäävät matalammiksi kuin etelässä: Eynali 1 800 '
            + 'metriä, Halileh 1 850, Pakeh-chin 1 945, Bahlul 1 985 ja '
            + 'korkeimpana Dand 2 378. Eynalin huipulle vie päällystetty '
            + 'polku, jota on 3,3 kilometriä. Huipulla on hautarakennus, '
            + 'jota pidetään kahden uskonoppineen hautana; vuori '
            + 'tunnetaan heidän mukaansa myös nimellä On ibn Ali. '
            + 'Rinteille on istutettu metsää, ja alue on valtion '
            + 'metsäpuisto. Tabrizissa on kaikkiaan 132 puistoa, joista '
            + '97 on pieniä, 31 alueellisia ja 4 koko kaupungin puistoja.',
          selite: 'Eynalin rinne aamun vastavalossa. Kukkulan päälle on '
            + 'istutettu tiheä nuori metsä, jonka pikkupuut kasvavat '
            + 'riveissä paljaassa ruskeassa maassa. Rinteen poikki kulkee '
            + 'puupylväin ja narulla rajattu polku, jonka varrella istuu '
            + 'ja kävelee ihmisiä; useasta kohdasta nousee ohutta savua. '
            + 'Harjanteella seisoo valkoinen ristikkomasto ja sen '
            + 'vieressä matala rakennus, jonka räystäs on keltainen; '
            + 'masto kannattaa köysirataa. Vasemmalla on valkoinen '
            + 'parakki ja oikealla rinne on porrastettu terasseiksi, ja '
            + 'ylös kiemurtelee tie. Kukkulan laella on mastoja, ja ilma '
            + 'on utuinen.',
          lahde: 'User:Abdossamad Talebpour, Wikimedia Commons (CC BY-SA 3.0)',
        },
        {
          otsikko: 'Tammikuussa yhdeksän lumipäivää',
          tiedosto: 'Elgoli snow.JPG',
          teksti: 'Talvi on Tabrizissa luminen ja kylmä. Sääaseman vuosien '
            + '1991–2020 keskiarvoissa tammikuun keskilämpötila on −1,2 '
            + 'astetta ja heinä- ja elokuun 26,6. Lunta tai räntää sataa '
            + 'tammikuussa keskimäärin 9,3 päivänä, helmikuussa 7,9 ja '
            + 'joulukuussa 6,2, mutta touko- ja syyskuun välillä ei '
            + 'lainkaan; nämä luvut on laskettu vuosista 1951–2010. '
            + 'Kylmin mitattu lukema on −25,0 astetta 20. tammikuuta 1964 '
            + 'ja kuumin 42,0 astetta 26. heinäkuuta 1966. Ranskalainen '
            + 'matkaaja Jean Chardin kirjoitti 1600-luvulla, että lumi '
            + 'pysyy seudun vuorilla yhdeksän kuukautta vuodessa.',
          selite: 'El Golin puisto lumisateen jälkeen, kuvattuna ylhäältä '
            + 'terassien suunnasta. Etualalla kulkee poikittain matala '
            + 'kivimuuri, jonka harjalla on paksu kerros lunta. Sen '
            + 'takana laskeutuu rinne, jossa lehdettömien puiden oksat '
            + 'ovat kauttaaltaan lumen peitossa; puurivien välissä '
            + 'juoksee suora käytävä alas puiston pohjalle, ja sen '
            + 'varrella seisoo tummansinisiä lyhtypylväitä. Käytävällä ja '
            + 'aukiolla näkyy muutamia pieniä ihmishahmoja. Keskellä '
            + 'kuvaa on altaan rannan paviljonki: vaalea, monikulmainen '
            + 'rakennus, jonka alakerrassa kiertää rivi kaaria ja jonka '
            + 'katolla on keltainen kupoli, sekin lumen peittämä. '
            + 'Taustalla erottuu usvan takaa kaupungin kerrostaloja ja '
            + 'kaksi nosturia. Taivas on tasaisen harmaa.',
          lahde: 'Faridb89, Wikimedia Commons (CC BY-SA 4.0)',
        },
      ],
      tehtava: {
        kysymys: 'Mitä kivilajia Sahand on pääosin?',
        vaihtoehdot: [
          'dasiittia',
          'kalkkikiveä',
          'hiekkakiveä',
          'marmoria',
        ],
        oikea: 0,
        fakta: 'Sahand on kerrostulivuori, ja sen kivi on dasiittia ja '
          + 'muita felsisiä lajeja. Korkein huippu Kamal yltää 3 707 '
          + 'metriin.',
      },
    },
  ],
};
