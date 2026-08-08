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
      id: 'luonto',
      nimi: 'Luonto',
      johdanto: 'Lontoon luonto ei ole kaupungin ulkopuolella vaan sen sisällä: '
        + 'joki nousee ja laskee kahdesti vuorokaudessa, puistoissa karjuvat '
        + 'hirvet ja kirkuvat papukaijat, ja sää on kerran ollut kaupungin '
        + 'vaarallisin vihollinen.',
      nostot: [
        {
          otsikko: 'Joki, joka laskee joka päivä',
          tiedosto: 'Mudlarks by Millennium Bridge.jpg',
          teksti: 'Thames on vuorovesijoki Teddingtonin sulkuun asti: vesi nousee '
            + 'ja laskee kahdesti vuorokaudessa, keskustassa parhaimmillaan '
            + 'noin seitsemän metriä. Laskuveden aikaan kivinen ranta '
            + 'paljastuu keskellä miljoonakaupunkia, ja sinne lasketaan '
            + 'portaita pitkin etsimään savipiippuja ja astiansirpaleita. '
            + 'Etsijöitä sanotaan mudlarkeiksi. Ranta ei silti ole vapaata '
            + 'riistaa: lupa on ostettava satamaviranomaiselta, ja kun lupia '
            + 'oli kertynyt yli 5 000, myynti keskeytettiin vuonna 2022. Se '
            + 'avattiin uudelleen 2024, mutta lupia jaetaan enintään 4 000. '
            + 'Yli kolmesataa vuotta vanhat löydöt on ilmoitettava Lontoon '
            + 'museolle.',
          selite: 'Thamesin kivinen ranta paljastuu laskuveden aikaan '
            + 'Millennium-sillan vieressä. Rannalla liikkuu kymmenkunta '
            + 'ihmistä, mudasta törröttää vanhojen laitureiden tummuneita '
            + 'puupaaluja, ja takana kohoaa tiilinen varastotalo, jonka '
            + 'alakerrassa on The Samuel Pepys -pubi.',
          lahde: 'Tim Sheerman-Chase, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Thames',
        },
        {
          otsikko: 'Kuninkaan joutsenet lasketaan',
          tiedosto: 'Swan Upping.jpg',
          teksti: 'Britannian hallitsija omistaa kaikki merkitsemättömät '
            + 'kyhmyjoutsenet avovesillä, ja tapa juontuu 1100-luvulta. '
            + 'Heinäkuun kolmannella viikolla soutuveneet nousevat viiden '
            + 'päivän ajan Thamesia Sunburysta Abingdoniin. Veneet '
            + 'piirittävät joutsenperheen, poikaset nostetaan veneeseen, '
            + 'punnitaan, mitataan ja tarkastetaan vammojen varalta, ja '
            + 'jalkaan pannaan kevyt rengas. Kruunun laskijat pukeutuvat '
            + 'punaiseen. Osan joutsenista omistavat yhä kaksi Cityn vanhaa '
            + 'ammattikuntaa, viininmyyjät ja värjärit; ennen linnut '
            + 'merkittiin lovilla nokkaan, nykyään renkailla.',
          selite: 'Joutsenten laskijoita veneissään Thamesilla Abingdonissa '
            + 'heinäkuussa 2006. Lippujen joutsenvaakunat kertovat, kenen '
            + 'miehistöstä on kyse, ja kaksi joutsenta ui veneen kylkeen '
            + 'ajettuna; rantapenkereellä seisoo katselijoita kaiteen takana.',
          lahde: 'Philip Allfrey, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Kyhmyjoutsen',
        },
        {
          otsikko: 'Kuusisataa hirveä aidan sisällä',
          tiedosto: 'Red deer stag roaring in Richmond Park - geograph.org.uk - 3711560.jpg',
          teksti: 'Richmond Park on Lontoon kuninkaallisista puistoista suurin, '
            + 'ja sen kolmentoista kilometrin tiiliaidan sisällä kulkee '
            + 'vapaana noin 630 saksanhirveä ja kuusipeuraa. Kuningas Kaarle '
            + 'I aitasi alueen hirvenmetsästystä varten vuonna 1637. '
            + 'Syys-lokakuussa urokset karjuvat kiima-aikaan. Marraskuussa ja '
            + 'helmikuussa laumasta kaadetaan noin kaksisataa eläintä, jotta '
            + 'laidun riittää lopuille. Vuosina 1867 ja 1876 puistosta '
            + 'lähetettiin kuusipeuroja laivalla Uuteen-Seelantiin, ja ne '
            + 'olivat maan ensimmäiset kuusipeurat.',
          selite: 'Karjuva saksanhirviuros Richmond Parkissa lokakuussa 2013. '
            + 'Sarvet ovat täysikasvuiset ja monihaaraiset, eläin seisoo '
            + 'kuivan heinikon reunassa, ja sen takana kasvaa laaja '
            + 'sananjalkakenttä.',
          lahde: 'Russel Wills, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Isokauris',
        },
        {
          otsikko: 'Papukaijat oppivat kämmenelle',
          tiedosto: 'Hyde Park feral parakeets (02).jpg',
          teksti: 'Lontoon puistoissa lentää kirkkaanvihreitä kauluskaijoja, '
            + 'joiden kotiseutu on Intiassa ja trooppisessa Afrikassa. '
            + 'Villiintynyt kanta alkoi lisääntyä pysyvästi vuonna 1969 '
            + 'Croydonissa, ja nyt lintuja on kymmeniätuhansia: vuoden 2012 '
            + 'yöpymispuiden laskennassa niitä kertyi Lontoossa noin 32 000. '
            + 'Talvi ei niitä kaada, sillä laji elää luonnossa myös Himalajan '
            + 'lumisilla alarinteillä parintuhannen metrin korkeudessa. Hyde '
            + 'Parkissa ja Kensington Gardensissa ne ovat oppineet lentämään '
            + 'suoraan avoimelle kämmenelle, jos siinä on siemeniä.',
          selite: 'Kauluskaija syö auringonkukansiemeniä ihmisen kämmeneltä Hyde '
            + 'Parkissa marraskuussa 2020. Taustan nurmella odottaa epätarkka '
            + 'pulujoukko, joka jakaa linnun kanssa saman ruokapaikan.',
          lahde: 'Isochrone (Berrely), Wikimedia Commons (CC BY 4.0)',
          wiki: 'Kauluskaija',
        },
        {
          otsikko: 'Sumu, joka ei ollutkaan sumua',
          tiedosto: 'A London Fog, drawn by Duncan - ILN 1847.jpg',
          teksti: 'Lontoon kuuluisa sumu oli kivihiilen savua, ja 1800-luvulla '
            + 'soihtupojat opastivat kulkijoita savuisilla kaduilla. Pahin '
            + 'savusumu alkoi 5. joulukuuta 1952, kun korkeapaine painoi '
            + 'savun kadun tasalle ja tuuli tyyntyi. Viisi päivää kestäneen '
            + 'sumun aikana näkyvyys putosi paikoin noin kolmeenkymmeneen '
            + 'senttiin, konsertteja ja elokuvanäytöksiä peruttiin, ja kaikki '
            + 'joukkoliikenne metroa lukuun ottamatta pysähtyi. Kuolleita '
            + 'arvioitiin ensin neljätuhatta, myöhemmissä laskelmissa 10 '
            + '000-12 000. Neljä vuotta myöhemmin säädettiin laki, jonka '
            + 'nojalla kaupunginosia voitiin määrätä savuttomiksi.',
          selite: 'Lontoolaista sumua The Illustrated London News -lehden '
            + 'puukaiverruksessa 2. tammikuuta 1847, siis yli vuosisata ennen '
            + 'vuoden 1952 savusumua. Kaksi poikaa kantaa palavaa soihtua ja '
            + 'opastaa kulkijoita, oikealla silinteripäinen herra taluttaa '
            + 'naista, ja takana häämöttävät hevonen, vaunut ja palava '
            + 'kaasulyhty.',
          lahde: 'Henry Linton (kaiverrus, piirros Duncan), Wikimedia Commons (PD)',
          wiki: 'Lontoon suuri savusumu',
        },
        {
          otsikko: 'Markkinat jäätyneellä joella',
          tiedosto: 'Frost Fair on the River Thames (1814).jpg',
          teksti: 'Ennen Thames jäätyi. Vuosien 1400 ja 1831 välillä joki '
            + 'jähmettyi Lontoon kohdalla 24 talvena, ja jäälle nousi '
            + 'telttakylä: keilapelejä, veneenmuotoisia keinuja ja '
            + 'painokoneita, jotka myivät muistoksi jäällä painettuja '
            + 'säkeitä. Viimeiset markkinat alkoivat 1. helmikuuta 1814 ja '
            + 'kestivät neljä päivää, ja norsu talutettiin joen yli '
            + 'Blackfriarsin sillan alapuolelta. Sitten purettiin vanha '
            + 'Lontoon silta, jonka yhdeksäntoista pilaria olivat padonneet '
            + 'virran hitaaksi. Nyt joki juoksee liian nopeasti jäätyäkseen.',
          selite: 'Vuoden 1814 jäämarkkinat käsin väritetyssä puupiirroksessa, '
            + 'jonka näkymä otettiin Banksidelta 4. helmikuuta. Jäälle on '
            + 'pystytetty telttarivi, keilapeli ja veneenmuotoiset keinut; '
            + 'taustalla erottuvat Pyhän Paavalin kupoli, Monument-pylväs ja '
            + 'Lontoon silta.',
          lahde: 'George Thompson (kustantaja), Wikimedia Commons (PD)',
          wiki: 'Pieni jääkausi',
        },
      ],
      tehtava: {
        kysymys: 'Ketkä kuninkaan lisäksi omistavat osan Thamesin joutsenista?',
        vaihtoehdot: [
          'Kalastajat ja veneenrakentajat',
          'Viininmyyjät ja värjärit',
          'Leipurit ja panimomestarit',
          'Sepät ja satulantekijät',
        ],
        oikea: 1,
        fakta: 'Viininmyyjien ja värjärien ammattikunnat ovat omistaneet osan '
          + 'linnuista satojen vuosien ajan; kruunun laskijat tunnistaa '
          + 'punaisesta asusta.',
      },
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
          otsikko: 'Paviljonki, joka puretaan syksyllä',
          tiedosto: 'Serpentine Pavilion 2016 I (27776972542).jpg',
          teksti: 'Kensington Gardensissa nousee joka kesä uusi paviljonki. '
            + 'Serpentine-galleria on tilannut sellaisen vuodesta 2000 '
            + 'lähtien, ja säännöt ovat tiukat: arkkitehti ei saa olla '
            + 'aiemmin saanut valmiiksi yhtään rakennusta Englannissa, ja '
            + 'paviljongin on valmistuttava puolessa vuodessa. Syksyllä se '
            + 'puretaan pois. Vuonna 2016 tanskalaisen Bjarke Ingelsin ryhmä '
            + 'latoi nurmikolle 1 802 lasikuitulaatikkoa, jotka aukeavat '
            + 'suorasta seinästä kaartuvaksi tilaksi. Sisällä oli kahvila, '
            + 'iltaisin esityksiä, eikä pääsy maksanut mitään.',
          selite: 'Bjarke Ingelsin ryhmän suunnittelema paviljonki kesäkuussa '
            + '2016. Päällekkäin ladotut lasikuitulaatikot kiertyvät auki '
            + 'niin, että suorasta seinästä tulee kolmiulotteinen tila. '
            + 'Rakennelma seisoi gallerian nurmikolla kesäkuusta lokakuuhun.',
          lahde: 'Images George Rex, Wikimedia Commons (CC BY-SA 2.0)',
          wiki: 'Bjarke Ingels',
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
        {
          otsikko: 'Guernica maksoi parin saappaita',
          tiedosto: 'Tree of Life, Whitechapel Gallery (8132640664).jpg',
          teksti: 'Whitechapelin galleria avattiin vuonna 1901, jotta itäisen '
            + 'Lontoon työläiset pääsisivät näkemään taidetta. Vuonna 1938 '
            + 'siellä oli esillä Picasson Guernica, joka kiersi Britanniaa '
            + 'keräämässä apua Espanjan sisällissodan uhreille — Lontoon '
            + 'jälkeen se nähtiin Leedsissä, Liverpoolissa ja Manchesterissa. '
            + 'Pääsymaksuksi kelpasi pari '
            + 'kunnollisia saappaita, jotka lähetettiin Espanjan '
            + 'sisällissodan tasavaltalaisille. Kahdessa viikossa maalauksen '
            + 'eteen kertyi satoja saapaspareja ja galleriaan yli 15 000 '
            + 'kävijää. Talo näyttää yhä nykytaidetta, ja sisään pääsee '
            + 'ilmaiseksi.',
          selite: 'Whitechapelin gallerian julkisivu lokakuussa 2012. Yläosaa '
            + 'peittävät Rachel Whitereadin kullatut pronssilehdet, jotka '
            + 'paljastettiin samana kesänä. Oikealla on entinen Passmore '
            + 'Edwards -kirjasto, joka liitettiin galleriaan vuonna 2009, ja '
            + 'sen alla Aldgate Eastin metroaseman sisäänkäynti.',
          lahde: 'John Lord, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Rachel Whiteread',
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
          tiedosto: 'Muhammad Ali Mosque 1.jpg',
          selite: 'Muhammad Alin alabasterimoskeija linnoituskukkulalla '
            + 'hallitsee kaupungin siluettia.',
          lahde: 'kallerna, Wikimedia Commons (CC BY-SA 3.0)',
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
        {
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
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Kaupungin oma voileipä ja teatteri, jossa näyttelijät roikkuvat '
        + 'langoissa.',
      nostot: [
        {
          otsikko: 'Nukketeatteri puolusti kieltä',
          tiedosto: 'Marionette Opera Prague.jpg',
          teksti: 'Habsburgien valtakunnassa virastojen ja koulujen kieli oli '
            + 'saksa, mutta kiertävät nukkenäyttelijät esittivät markkinoilla '
            + 'näytelmänsä tšekiksi — siksi marionetit muistetaan Tšekissä '
            + 'kielen puolustajina. Unesco otti tšekkiläisen ja '
            + 'slovakialaisen nukketeatterin ihmiskunnan kulttuuriperinnön '
            + 'luetteloon vuonna 2016. Prahassa on yhä teattereita, joissa '
            + 'lankojen varassa esitetään kokonainen ooppera.',
          selite: 'Prahan Vanhankaupungin nukketeatterin sisäänkäynti. Kyltti '
            + 'mainostaa Don Giovannia — Mozartin ooppera sai maailman '
            + 'ensi-iltansa Prahassa 29. lokakuuta 1787 säveltäjän itsensä '
            + 'johtamana.',
          lahde: 'Jim Milles, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Marionetti',
        },
        {
          otsikko: 'Voileipä, joka syödään haarukalla',
          tiedosto: 'Obložené chlebíčky.jpg',
          teksti: 'Chlebíček on paksu viipale vaaleaa leipää, jonka päälle '
            + 'ladotaan perunasalaattia, kinkkua, kananmunaa ja suolakurkkua. '
            + 'Prahalainen herkkukauppias Jan Paukert alkoi myydä niitä '
            + 'liikkeessään 1910-luvulla, ja tapa levisi koko maahan. '
            + 'Syntymäpäiviin ja hautajaisiin niitä tehdään yhä vadillinen, '
            + 'ja kaupassa hinta lasketaan kappaleittain.',
          selite: 'Vadillinen chlebíčkejä katetulla pöydällä. Pohjana on '
            + 'tavallisesti perunasalaatti, ja päälle tulee kinkkua, salamia, '
            + 'munaa ja suolakurkkua — jokainen leipä koristellaan erikseen.',
          lahde: 'Wikimedia Commons (CC0)',
        },
      ],
      tehtava: {
        kysymys: 'Mikä oli virastojen ja koulujen kieli Habsburgien valtakunnassa?',
        vaihtoehdot: [
          'Saksan kieli',
          'Unkarin kieli',
          'Puolan kieli',
          'Latinan kieli',
        ],
        oikea: 0,
        fakta: 'Saksa oli Habsburgien virastojen ja koulujen kieli, joten '
          + 'tšekiksi esiintyneistä nukkenäyttelijöistä tuli kielen '
          + 'puolustajia.',
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
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Kaupunki, jossa yhtä kahvikuppia voi venyttää koko iltapäivän ja '
        + 'jossa kaupunki itse ryhtyi rakentamaan asuntoja.',
      nostot: [
        {
          otsikko: 'Kahvila on kaupungin olohuone',
          tiedosto: 'Cafe Central in Vienna interior near portraits.JPG',
          teksti: 'Wieniläisessä kahvilassa yhden kupin voi venyttää koko '
            + 'iltapäiväksi, ja lehdet kuuluvat hintaan. Kahvin kanssa '
            + 'tuodaan aina lasi hanavettä, joka täytetään pyytämättä '
            + 'uudelleen. Jokaisella kahvilajilla on oma nimensä: melangessa '
            + 'on maitoa ja maitovaahtoa, ja einspänner tarjoillaan lasissa '
            + 'kermavaahtohatun alla. Nimi tulee yksivaljakon ajureista, '
            + 'jotka pitivät lasia toisessa kädessä ja ohjaksia toisessa — '
            + 'vaahto piti kahvin lämpimänä.',
          selite: 'Café Centralin holvisali Wienissä. Seinällä on kaksi suurta '
            + 'muotokuvaa, keisari Frans Joosef ja keisarinna Elisabet, ja '
            + 'niiden alla istutaan valkoisilla liinoilla katetuissa '
            + 'pöydissä.',
          lahde: 'Clayton Tang, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Wien',
        },
        {
          otsikko: 'Kilometrin pituinen kotitalo',
          tiedosto: 'Karl Marx Hof.jpg',
          teksti: 'Vuoden 1917 asuntolaskennassa 92 prosentissa Wienin asunnoista '
            + 'ei ollut omaa vessaa eikä 95 prosentissa vesijohtoa. Kaupunki '
            + 'ryhtyi silloin itse rakennuttajaksi. Karl-Marx-Hof avattiin '
            + '12. lokakuuta 1930: se on noin 1 050 metriä pitkä ja siihen '
            + 'tehtiin 1 382 asuntoa noin viidelletuhannelle asukkaalle. '
            + 'Tontista rakennettiin vain 23 prosenttia — kaikki muu '
            + 'jätettiin pihaksi ja leikkikentäksi.',
          selite: 'Karl-Marx-Hofin julkisivu Döblingin kaupunginosassa. '
            + 'Punatiilisen rakennuksen läpi johtaa neljä suurta holvikaarta, '
            + 'torneissa on lipputangot, ja edessä on nurmikko ja kukkiva '
            + 'kastanja.',
          lahde: 'Thomas Ledl, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Karl-Marx-Hof',
        },
      ],
      tehtava: {
        kysymys: 'Mitä wieniläisessä kahvilassa tuodaan aina kahvin kanssa?',
        vaihtoehdot: [
          'Lasillinen hanavettä',
          'Lasillinen omenamehua',
          'Kuppi kuumaa kaakaota',
          'Lasillinen kylmää maitoa',
        ],
        oikea: 0,
        fakta: 'Vesilasi kuuluu Wienissä kahviin itsestään selvästi, ja '
          + 'tyhjentynyt lasi täytetään uudelleen ilman erillistä pyyntöä.',
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
          tiedosto: 'Brandenburger Tor abends.jpg',
          selite: 'Brandenburgin portti iltavalossa. Portin päällä ajaa '
            + 'voitonjumalatar nelivaljakollaan — Napoleon vei sen '
            + 'sotasaaliiksi Pariisiin 1806, mutta se haettiin takaisin.',
          lahde: 'Thomas Wolf (foto-tw.de), Wikimedia Commons (CC BY-SA 3.0 DE)',
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
    {
      id: 'arki',
      nimi: 'Arki ja kadut',
      johdanto: 'Kaupungin oma katuruoka syntyi ketsupista, jota idän puolella ei '
        + 'saanut — ja kaupasta, jonka valo palaa, kun kaikki muut ovat '
        + 'kiinni.',
      nostot: [
        {
          otsikko: 'Currywurst keksittiin kadunkulmassa',
          tiedosto: 'Currywurst-1.jpg',
          teksti: 'Herta Heuwer piti kioskia Charlottenburgissa Kantstraßen ja '
            + 'Kaiser-Friedrich-Straßen kulmassa. Hän kertoi sekoittaneensa '
            + '4. syyskuuta 1949 tomaatista ja mausteista kastikkeen, '
            + 'kaataneensa sen paistetun makkaran päälle ja ripotelleensa '
            + 'vielä currya pinnalle. Ainekset hän oli saanut '
            + 'brittisotilailta. Kastikkeen hän rekisteröi 1959 nimellä '
            + 'Chillup — chilistä ja ketsupista. Kulmassa on nykyään hänen '
            + 'muistolaattansa.',
          selite: 'Berliiniläinen currywurst pahvivadissa: paloiteltu makkara, '
            + 'punaista kastiketta, päällä currymaustetta ja pystyssä pieni '
            + 'sininen muovihaarukka.',
          lahde: 'Rainer Zenz, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Currywurst',
          galleria: [
            {
              otsikko: 'Idän puolella keitettiin oma kastike',
              tiedosto: 'MitteKonnopke.jpg',
              selite: 'Jono Konnopken kioskin luukulla metrosillan alla. Kyltissä '
                + 'lukee Konnopke’s Imbiß ja "über 80 Jahre". Kioski aloitti '
                + 'samassa kulmassa 1930; idässä ketsuppia ei saanut, joten '
                + 'perhe keitti kastikkeensa itse.',
              lahde: 'Fridolin freudenfett (Peter Kuley), Wikimedia Commons (CC BY-SA 3.0)',
            },
          ],
        },
        {
          otsikko: 'Puoti, joka on auki kun muut ovat kiinni',
          tiedosto: 'Spätkauf Late Night Shop.jpg',
          teksti: 'Saksassa kaupat sulkeutuvat illalla aikaisin ja sunnuntaisin '
            + 'kokonaan. Berliinissä on silti melkein joka korttelissa pieni '
            + 'puoti, jonka valo palaa myöhään: Späti. Nimi tulee sanasta '
            + 'spät, myöhään. Itä-Berliinissä avattiin 1950-luvulla '
            + 'vuorotyöläisiä varten spätverkaufsstelle-kauppoja, ja '
            + 'länsipuolella samanlaisia alettiin 1980-luvulla kutsua nimellä '
            + 'Spätkauf. Lyhennys Späti otettiin Duden-sanakirjaan vuonna '
            + '2017.',
          selite: 'Keltainen kilpi talon seinässä. Siinä lukee isoin punaisin '
            + 'kirjaimin SPÄTKAUF ja sen alla pienemmällä LATE NIGHT SHOP.',
          lahde: 'ChickSR, Wikimedia Commons (CC BY-SA 4.0)',
          galleria: [
            {
              otsikko: 'Puoti Kaiserdammilla',
              tiedosto: 'Späti Berlin-Kaiserdamm.jpg',
              selite: 'Spätin ovi ja näyteikkuna. Kyltissä lukee SPÄTI, ikkunan '
                + 'reunassa on lista tavaroista — juomia, jäätelöä, makeisia, '
                + 'lehtiä — ja hyllyt ovat täynnä purkkeja.',
              lahde: 'Jeuwre, Wikimedia Commons (CC BY-SA 4.0)',
            },
          ],
        },
      ],
      tehtava: {
        kysymys: 'Keneltä Herta Heuwer sai ainekset ensimmäiseen '
          + 'currywurst-kastikkeeseensa?',
        vaihtoehdot: [
          'Ranskalaisilta sotilailta',
          'Neuvostoliiton sotilailta',
          'Brittiläisiltä sotilailta',
          'Amerikkalaisilta sotilailta',
        ],
        oikea: 2,
        fakta: 'Herta Heuwer sai kastikkeensa ainekset brittisotilailta ja alkoi '
          + 'myydä sen kanssa paistettua makkaraa kioskillaan '
          + 'Charlottenburgissa.',
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
          tiedosto: 'Canal Grande Chiesa della Salute e Dogana dal ponte dell Accademia.jpg',
          selite: 'Canal Grande ja Santa Maria della Saluten kupolit Accademian '
            + 'sillalta.',
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
          tiedosto: 'Lateral view of the Vasa ship, Vasa Museum, Stockholm, Sweden julesvernex2.jpg',
          teksti: 'Kuninkaan ylpeys, sotalaiva Vasa, lähti neitsytmatkalleen '
            + 'Tukholman satamasta 10. elokuuta 1628 — ja kaatui ensimmäiseen '
            + 'kunnon tuulenpuuskaan ehdittyään noin kilometrin. Laiva oli '
            + 'rakennettu liian kapeaksi ja korkeaksi, ja vesi ryntäsi sisään '
            + 'avoimista tykkiporteista. Vasa makasi sataman pohjamudassa 333 '
            + 'vuotta, kunnes se nostettiin 1961 lähes ehjänä: Itämeren '
            + 'vähäsuolainen vesi oli pitänyt laivamadot loitolla. Nykyään '
            + 'alus seisoo omassa museossaan yhä valtaosin alkuperäisenä '
            + 'puuna, ja Vasa-museo on koko Pohjolan suosituimpia museoita.',
          selite: 'Vasan kylkeä Vasa-museossa. Juuri nämä tykkiportit upottivat '
            + 'laivan: alin porttirivi painui kallistuksessa veden alle.',
          lahde: 'Jules Verne Times Two, Wikimedia Commons (CC BY-SA 4.0)',
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
    {
      id: 'elaimet',
      nimi: 'Eläimet kaupungissa',
      johdanto: 'Keskellä pääkaupunkia nostetaan lohia, ja Djurgårdenin mäellä '
        + 'laiduntaa eläin, joka oli kerran kadota koko maailmasta.',
      nostot: [
        {
          otsikko: 'Lohi ui eduskuntatalon ohi',
          tiedosto: 'Håvbåt på Strömmen 2020.jpg',
          teksti: 'Norrström on virta, jota pitkin Mälarenin vesi syöksyy mereen '
            + 'aivan eduskuntatalon vierestä. Siitä nostetaan joka vuosi '
            + 'satoja lohia ja meritaimenia: vuonna 2000 saatiin lohi, joka '
            + 'painoi lähes 22 kiloa. Vedessä elää noin kolmekymmentä '
            + 'kalalajia, enemmän kuin missään muualla Tukholman seudun '
            + 'vesissä. Kalat palasivat 1970-luvulla aloitettujen istutusten '
            + 'myötä, ja vuonna 2024 vanha vuoden 1850 sulku muutettiin '
            + 'kalatieksi, jota myöten kalat pääsevät nousemaan järveen.',
          selite: 'Vihreä haavivene kiinni Norrströmin virrassa Kuninkaallisen '
            + 'oopperan edessä. Puomista roikkuu iso nostohaavi, joka '
            + 'lasketaan veteen kalaa odottamaan.',
          lahde: 'Frankie Fouganthin, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Lohi',
          galleria: [
            {
              otsikko: 'Onkija keskellä kaupunkia',
              tiedosto: 'Fishing in Strömmen, Stockholm - panoramio.jpg',
              selite: 'Kalastaja heittää vapaansa kivilaiturin portailta. '
                + 'Vastarannalla on kivitaloja ja vasemmalla silta — '
                + 'kalapaikka on keskellä liikennettä.',
              lahde: 'Bengt Nyman, Wikimedia Commons (CC BY 3.0)',
            },
          ],
        },
        {
          otsikko: 'Visentti pelastui kaupungin mäellä',
          tiedosto: 'Bison bonasus, Skansen (23157746126).jpg',
          teksti: 'Djurgårdenin Skansen avattiin 1891, ja sinne siirrettiin '
            + 'kokonaisia taloja ympäri Ruotsia. Malli levisi niin laajalle, '
            + 'että monessa kielessä sana skansen tarkoittaa yhä '
            + 'ulkoilmamuseota. Skansenilla pidettiin myös visenttejä, '
            + 'Euroopan raskaimpia maaeläimiä. Kun laji oli 1920-luvulla '
            + 'katoamassa, koko maailmassa oli enää 54 visenttiä — ja kaksi '
            + 'niistä eli täällä. Vuonna 1929 Skansenilta lähetettiin hiehoja '
            + 'Puolan Białowieżaan, jonne laji päästettiin takaisin metsään '
            + '1952.',
          selite: 'Visentin pää lähikuvassa Skansenilla: paksu ruskea otsatukka, '
            + 'lyhyet ylöspäin kaartuvat sarvet ja tumma turpa. Taustalla '
            + 'näkyy aitauksen lauta-aita talvivalossa.',
          lahde: 'Bengt Nyman, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Visentti',
        },
      ],
      tehtava: {
        kysymys: 'Minne Skansenilta lähetettiin visenttejä vuonna 1929?',
        vaihtoehdot: [
          'Norjan Dovrefjelliin',
          'Skotlannin Cairngormsiin',
          'Puolan Białowieżaan',
          'Romanian Karpaateille',
        ],
        oikea: 2,
        fakta: 'Skansen luovutti vuonna 1929 nuoria naarasvisenttejä Puolan '
          + 'Białowieżaan, ja siellä laji pääsi takaisin metsään vuonna 1952.',
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
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Leipä, josta kilpaillaan sokkona, ja kirjakauppa, joka mahtuu '
        + 'kokonaan yhteen peltilaatikkoon joen kaiteella.',
      nostot: [
        {
          otsikko: 'Patongista kilpaillaan joka vuosi',
          tiedosto: 'Baguette 001.jpg',
          teksti: 'Ranskan laki määrää, mitä perinteisessä patongissa saa olla: '
            + 'käytännössä vain vehnäjauhoa, vettä, suolaa ja hiivaa, eikä '
            + 'taikinaa saa missään vaiheessa pakastaa. Pariisin kaupunki on '
            + 'järjestänyt vuodesta 1994 kilpailun, jossa leivän pitää olla '
            + '55–65 senttiä pitkä ja painaa 250–300 grammaa. Leivät '
            + 'numeroidaan, jottei raati tiedä kenen leipää maistaa, ja '
            + 'raadissa istuu kuusi arvottua tavallista pariisilaista. '
            + 'Voittaja saa 4 000 euroa ja toimittaa vuoden ajan '
            + 'presidentinpalatsin leivät.',
          selite: 'Vastapaistettuja patonkeja pellillä. Kuori on ruskea ja '
            + 'halkeillut pitkittäin, ja juuri se viilto on leipurin oma '
            + 'käsiala — jokainen tekee sen omalla tavallaan.',
          lahde: 'N i c o l a, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Patonki',
        },
        {
          otsikko: 'Seinen vihreät kirjalaatikot',
          tiedosto: 'Paris 75005 Quai de Montebello Bouquinistes 20071014.jpg',
          teksti: 'Seinen kaiteisiin on pultattu vihreitä peltilaatikoita, joissa '
            + 'myydään käytettyjä kirjoja. Kauppiaita on runsaat kaksisataa '
            + 'ja laatikoita lähes yhdeksänsataa kolmen kilometrin matkalla. '
            + 'Kaupunki päättää säännöt: yksi myyjä saa kahdeksan metriä '
            + 'kaidetta ja enintään neljä laatikkoa, ne on avattava vähintään '
            + 'neljänä päivänä viikossa, ja maali on aina sama vaunuvihreä '
            + 'kuin ensimmäisen metron kylteissä. Kesällä 2024 laatikot piti '
            + 'purkaa olympialaisten avajaisten tieltä, mutta päätös '
            + 'peruttiin ja ne saivat jäädä.',
          selite: 'Avattu bouquiniste-koju Quai de Montebellella. Vanhoja lehtien '
            + 'kansia ja painokuvia riippuu pyykkipojilla rivissä, alarivissä '
            + 'on Le Petit Journal -lehden kuvitettuja etusivuja, ja edessä '
            + 'odottaa myyjän puinen kokoontaittuva tuoli.',
          lahde: 'Benh LIEU SONG, Wikimedia Commons (CC BY-SA 3.0)',
        },
      ],
      tehtava: {
        kysymys: 'Kuinka monta metriä joen kaidetta yksi kirjamyyjä saa?',
        vaihtoehdot: [
          'viisi metriä',
          'kahdeksan metriä',
          'kaksitoista metriä',
          'kaksikymmentä metriä',
        ],
        oikea: 1,
        fakta: 'Kaupunki jakaa Seinen kaiteet tarkoilla mitoilla: yhdelle '
          + 'kirjamyyjälle kuuluu kahdeksan metriä kaidetta, ja laatikot on '
          + 'avattava vähintään neljänä päivänä viikossa.',
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
      id: 'musiikki',
      nimi: 'Musiikki',
      johdanto: 'Sataman köyhien laulu päätyi Unescon luetteloon, ja koko maailman '
        + 'tuntema kreikkalainen tanssi keksittiin vasta vuonna 1964.',
      nostot: [
        {
          otsikko: 'Rebetiko — sataman blues',
          tiedosto: 'The Famous Quartet of Pireaus about 1934.jpg',
          teksti: 'Pireuksen satamakortteleissa syntyi 1920- ja 1930-luvulla '
            + 'rebetiko: pakolaisten ja köyhien laulu. Soittimena oli '
            + 'bouzouki ja sen pikkuveli baglamas, joka on niin pieni, että '
            + 'sen sai tehdyksi vankilassa ja piilotetuksi poliisilta. '
            + 'Diktaattori Metaxasin sensuuri kävi laulujen sanojen kimppuun '
            + 'vuodesta 1937, mutta musiikki jäi henkiin. Unesco otti '
            + 'rebetikon ihmiskunnan kulttuuriperinnön luetteloon vuonna '
            + '2017.',
          selite: 'Pireuksen kuuluisa kvartetti noin vuonna 1934: neljä nuorta '
            + 'miestä puvuissa ja solmioissa, sylissä pitkäkaulaisia '
            + 'bouzoukeja. Vasemmalla istuvalla on kädessä pienempi baglamas. '
            + 'Yhtyeen tunnetuin soittaja oli Markos Vamvakaris.',
          lahde: 'Wikimedia Commons (PD)',
          wiki: 'Rebetiko',
          musiikki: 'https://music.apple.com/fi/search?term=rebetiko',
          musiikkiNimi: 'Rebetiko Apple Musicissa',
        },
        {
          otsikko: 'Zorbaksen tanssi keksittiin elokuvaa varten',
          tiedosto: 'Mikis Theodorakis in Helsinki 1972 (JOKAHBL3F C23-3).tif',
          teksti: 'Sirtaki ei ole vanha kansantanssi. Se koottiin vanhoista '
            + 'tansseista vuonna 1964 elokuvaa Kerro minulle, Zorbas varten. '
            + 'Pääosan näyttelijä Anthony Quinn kertoi, ettei pystynyt '
            + 'loukkaantuneella jalallaan hyppimään, joten askeleista tuli '
            + 'liukuvia ja vauhti kiihtyy vasta lopussa. Musiikin sävelsi '
            + 'Mikis Theodorakis. Kun sotilasjuntta kielsi hänen musiikkinsa '
            + 'vuonna 1967, sitä laulettiin muualla — kiertueen solistina oli '
            + 'suomalainen Arja Saijonmaa.',
          selite: 'Theodorakis ja Arja Saijonmaa saapuvat Seutulan lentoasemalle '
            + 'Helsinkiin 9. helmikuuta 1972. Säveltäjä nauraa '
            + 'turkiskauluksisessa takissaan, Saijonmaalla on hapsuhuivi '
            + 'kaulassa.',
          lahde: 'Hugo Sundström, Museovirasto, Wikimedia Commons (CC BY 4.0)',
          wiki: 'Míkis Theodorákis',
          musiikki: 'https://music.apple.com/fi/search?term=theodorakis%20zorba',
          musiikkiNimi: 'Theodorakiksen Zorbas Apple Musicissa',
        },
      ],
      tehtava: {
        kysymys: 'Missä baglamas oli niin pieni, että sellaisen sai tehdyksi '
          + 'salaa?',
        vaihtoehdot: [
          'Laivan ruumassa',
          'Vankilassa',
          'Kirkon kellarissa',
          'Vuoristoluolassa',
        ],
        oikea: 1,
        fakta: 'Bouzoukin pikkuveli baglamas on niin pieni soitin, että se '
          + 'syntyi vankilassa ja mahtui piiloon poliisilta.',
      },
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
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Vaunun kokoinen soitin, kala joka syödään pyrstöstä, ja pieni '
        + 'paalu jonka kyljessä on kaupungin vaakuna.',
      nostot: [
        {
          otsikko: 'Katu-urut ja kolisevat kolikot',
          tiedosto: 'Amsterdam. Een draaiorgel op een van de grachten, Bestanddeelnr 901-8132.jpg',
          teksti: 'Belgialainen Leon Warnies avasi Amsterdamiin katu-urkujen '
            + 'vuokraamon vuonna 1875, ja siitä alkoi koko hollantilainen '
            + 'perinne. Musiikki tulee taitellusta pahvikirjasta, johon on '
            + 'lyöty reikiä: yksi kirja on yksi kappale. Urkuri kääntää '
            + 'kampea ja ravistaa toisella kädellä rahalipasta '
            + 'ohikulkijoille. Warniesin jälkeläiset ovat yhä samassa työssä: '
            + 'Amsterdamissa toimii urkuliike Perlee.',
          selite: 'Katu-urut kanavan rannalla vuonna 1946. Soitin on kokonainen '
            + 'koristeltu vaunu, jota työnnetään käsin paikasta toiseen — '
            + 'soittajan lisäksi mukana on aina rahankerääjä.',
          lahde: 'Charles Breijer / Anefo, Wikimedia Commons (CC0)',
          wiki: 'Posetiivi',
          musiikki: 'https://music.apple.com/fi/search?term=draaiorgel',
          musiikkiNimi: 'Katu-urkumusiikkia Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/VPROreisnaarheteinde-draaiorgel/draaiorgel.mp3',
          musiikkiNayteNimi: 'Katu-urut — VPRO / lolaradio, CC BY-SA',
        },
        {
          otsikko: 'Silli syödään pyrstöstä',
          tiedosto: 'Hollandse nieuwe haring eten bij een haringstal in Amsterdam, Bestanddeelnr 932-6068.jpg',
          teksti: 'Hollandse Nieuwe on kevään ensimmäinen suolasilli, ja sen saa '
            + 'myydä vasta kun kalan rasvapitoisuus on noussut noin 16 '
            + 'prosenttiin. Perkauksessa haima jätetään paikalleen: sen '
            + 'entsyymit kypsyttävät lihan muutamassa päivässä. Nimi on '
            + 'suojattu: kalan pitää olla vähintään kolmivuotias, ja pyytää '
            + 'sen saa vain touko–elokuussa. Kojulla silli kastetaan sipuliin '
            + 'ja lasketaan suuhun pyrstöstä pidellen.',
          selite: 'Silliä syödään amsterdamilaisella kalakojulla vuonna 1983. '
            + 'Mies pitelee kalaa pyrstöstä pään yläpuolella ja laskee sen '
            + 'suuhunsa; pää on poistettu ja ruoto vedetty pois.',
          lahde: 'Rob Croes / Anefo, Wikimedia Commons (CC0)',
          wiki: 'Silli',
        },
        {
          otsikko: 'Paalu, jonka kyljessä on kolme ristiä',
          tiedosto: 'Amsterdammertje.jpg',
          teksti: 'Amsterdamin jalkakäytävillä seisoo tuhansia matalia '
            + 'punaruskeita paaluja. Ne estävät autoja nousemasta '
            + 'kävelytielle, ja jokaisen kyljessä on kolme vinoristiä — samat '
            + 'kuin kaupungin vaakunassa. Siksi niitä sanotaan '
            + 'amsterdammertjeiksi eli pikkuamsterdamilaisiksi. Paalu on 1,06 '
            + 'metriä pitkä, mutta siitä näkyy vain 75 senttiä; loppu on '
            + 'kivetyksen alla. Vuonna 1984 niitä laskettiin noin 100 000, '
            + 'vuonna 2003 enää alle 40 000.',
          selite: 'Amsterdammertje läheltä: pyöreä punaruskea pylväs, jonka '
            + 'kupera lakki on kulunut kiiltäväksi ja jonka kylkeen on '
            + 'valettu kolme vinoristiä päällekkäin.',
          lahde: 'M.Minderhoud, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Amsterdam',
        },
      ],
      tehtava: {
        kysymys: 'Mikä sillin elin jätetään perkauksessa paikalleen?',
        vaihtoehdot: [
          'Maksa',
          'Haima',
          'Sydän',
          'Uimarakko',
        ],
        oikea: 1,
        fakta: 'Haima jää sillin sisään tarkoituksella, sillä sen entsyymit '
          + 'kypsyttävät lihan muutamassa päivässä.',
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
          tiedosto: 'Hagia Sophia Mars 2013.jpg',
          selite: 'Hagia Sofia kevätaamuna. Harmaa kupoli on lähes 1500 vuotta '
            + 'vanha, mutta neljä ohutta minareettia nousivat sen ympärille '
            + 'vasta osmanien aikana.',
          lahde: 'Arild Vågen, Wikimedia Commons (CC BY-SA 3.0)',
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
    {
      id: 'ruoka',
      nimi: 'Ruoka ja juoma',
      johdanto: 'Istanbulissa juodaan lasi kerrallaan ympäri vuoden — ja yhtä '
        + 'juomaa saa vain silloin, kun on kylmä.',
      nostot: [
        {
          otsikko: 'Teetä juodaan enemmän kuin missään',
          tiedosto: 'Tarihi cinaralti cay bahcesi.jpg',
          teksti: 'Turkissa juodaan teetä yli kolme kiloa henkeä kohti vuodessa, '
            + 'enemmän kuin missään muussa maassa. Istanbulissa se näkyy '
            + 'kadulla: teenkantaja kulkee kaupasta kauppaan tarjotin köysien '
            + 'varassa keinuen eikä läikytä tippaakaan. Tee keitetään '
            + 'kaksiosaisessa pannussa, jossa alhaalla kiehuu vesi ja päällä '
            + 'hautuu väkevä uute. Se tarjoillaan tulppaanin muotoisessa '
            + 'korvattomassa lasissa, josta pidetään kiinni reunasta, jottei '
            + 'sormia polta.',
          selite: 'Teepuutarha Çengelköyssä Istanbulin Aasian puolella. Tyhjät '
            + 'pöydät on aseteltu vanhan plataanin alle, ja yhdellä niistä '
            + 'odottaa pieni tumma teepannu.',
          lahde: 'M. Fatih Morgül, Wikimedia Commons (CC BY 4.0)',
          wiki: 'Tee',
        },
        {
          otsikko: 'Juoma, jota myydään vain talvella',
          tiedosto: 'Boza in Vefa (6385861403).jpg',
          teksti: 'Boza on paksua ja vaaleaa, ja se tehdään hapattamalla hirssiä '
            + 'tai bulguria. Lämpimässä se pilaantuu, joten kausi alkaa vasta '
            + 'kun ilmat kylmenevät. Ennen vanhaan myyjä käveli iltapimeällä '
            + 'kadulla ja huusi pitkään bo-zaa, jotta ikkunat aukeaisivat. '
            + 'Matkakirjailija Evliya Çelebi laski 1600-luvun Istanbulissa '
            + 'satoja bozapuoteja. Vefan korttelissa avattiin puoti vuonna '
            + '1876, ja se on yhä samassa paikassa.',
          selite: 'Bozalaseja rivissä Vefan puodissa. Juoma on paksua ja '
            + 'vaaleankeltaista, ja etummaisiin laseihin on ripoteltu '
            + 'kanelia; takana näkyy sinivalkoinen kaakeliseinä.',
          lahde: 'William Neuheisel, Wikimedia Commons (CC BY 2.0)',
          wiki: 'Boza',
        },
      ],
      tehtava: {
        kysymys: 'Miksi bozaa myydään vain kylmään aikaan?',
        vaihtoehdot: [
          'Se pilaantuu lämpimässä',
          'Hirssi kypsyy vasta syksyllä',
          'Se juodaan aina kuumana',
          'Puodit sulkevat kesäksi',
        ],
        oikea: 0,
        fakta: 'Boza ei kestä lämpöä, joten sen kausi alkaa vasta ilmojen '
          + 'kylmetessä; Vefan puotia on pitänyt sama suku vuodesta 1876.',
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
      id: 'musiikki',
      nimi: 'Musiikki',
      johdanto: 'Irlannin valtiontunnus on soitin, ja esikuva seisoo Dublinissa '
        + 'lasikaapissa — mutta se on eri muotoinen kuin kolikoiden harppu.',
      nostot: [
        {
          otsikko: 'Säkkipilli, jota ei puhalleta',
          tiedosto: 'Patrick D\'Arcy, musician..jpg',
          teksti: 'Uilleann-pilli on Irlannin oma säkkipilli, eikä siihen '
            + 'puhalleta lainkaan: ilma pumpataan palkeella, joka on hihnoilla '
            + 'kiinni vyötäröllä ja oikeassa käsivarressa. Nimi tulee irlannin '
            + 'sanasta uillinn eli kyynärpää, sillä juuri kyynärpää painaa '
            + 'paljetta kokoon. Soittaja istuu ja painaa melodiapillin '
            + 'pään reittään vasten: kun kaikki sormireiät ovat '
            + 'peitettyinä, ääni vaikenee kokonaan. Unesco otti '
            + 'uilleann-pillin perinneluetteloonsa vuonna 2017.',
          selite: 'Uilleann-pillin täysi setti soittajan olalla: melodiapilli, '
            + 'kolme bordunapilliä ja kolme säätöpilliä, joiden läpillä '
            + 'soitetaan sointuja säestykseksi.',
          lahde: 'PatDarcy, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Irlantilainen kansanmusiikki',
          musiikki: 'https://music.apple.com/fi/search?term=uilleann%20pipes',
          musiikkiNimi: 'Uilleann-pillimusiikkia Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/TheKerryJigTheMugOfBrownAle/01_kerry_mug_of_brown_ale_jigs.mp3',
          musiikkiNayteNimi: 'Irlantilainen jigi ja reel — Tradschool, CC BY-NC-SA',
        },
        {
          otsikko: 'Kolikon harppu on väärän muotoinen',
          tiedosto: 'Trinity College Harp.jpg',
          teksti: 'Irlanti on maailman ainoa maa, jonka valtiontunnus on soitin. '
            + 'Esikuva seisoo Trinity Collegen kirjastossa: 1300- tai '
            + '1400-luvulla tehty harppu, jonka kaulassa on messinkitapit 29 '
            + 'kielelle. Sitä sanotaan Brian Borun harpuksi, vaikka kuningas '
            + 'Brian kuoli vuonna 1014 — satoja vuosia ennen kuin soitin '
            + 'veistettiin. Kolikoihin painettu harppu on kapea, koska se '
            + 'piirrettiin 1800-luvulla huonosti korjatun soittimen mukaan. '
            + 'Oikea harppu on paljon leveämpi.',
          selite: 'Trinity Collegen harppu telineellään: tumma puinen kaikukoppa, '
            + 'kaareva kaula ja paksu etutolppa. Taustalla erottuu Pitkän '
            + 'huoneen marmoribystien rivi ja punainen köysi.',
          lahde: 'Marshall Henrie, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Trinity College (Dublin)',
        },
      ],
      tehtava: {
        kysymys: 'Miten uilleann-pilliin saadaan ilma?',
        vaihtoehdot: [
          'Suukappaleen kautta',
          'Kyynärpään palkeella',
          'Jalkapolkimen avulla',
          'Käsipumpulla',
        ],
        oikea: 1,
        fakta: 'Ilma tulee palkeesta, jota soittajan kyynärpää painaa kokoon — '
          + 'siitä nimikin, sillä uillinn on iiriksi kyynärpää.',
      },
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
      id: 'musiikki',
      nimi: 'Musiikki',
      johdanto: 'Soitin, jonka ääntä ei voi katkaista, ja elokuinen esitys, jonka '
        + 'nimi tarkoittaa alun perin oluthanojen sulkemista.',
      tehtava: {
        kysymys: 'Mitä sana tattoo alun perin tarkoitti?',
        vaihtoehdot: ['Sotilaan käsivarteen piirrettyä kuvaa', 'Hollantilaista kehotusta sulkea oluthanat', 'Säkkipillin matalinta bordunapilliä', 'Linnan tykin laukausta kello yksi'],
        oikea: 1,
        fakta: 'Rumpalit soittivat majatalojen edessä merkin doe den tap toe eli '
          + 'sulkekaa hanat — se kerrotaan tattoo-nostossa.',
      },
      nostot: [
        {
          otsikko: 'Yhdeksän säveltä, ei yhtään taukoa',
          tiedosto: 'Piper busking in Edinburgh DSC05049.JPG',
          teksti: 'Skotlantilaisessa säkkipillissä on melodiapilli ja kolme '
            + 'bordunapilliä, jotka soivat koko ajan samaa säveltä. '
            + 'Melodiapillistä saa vain yhdeksän säveltä, eikä ääntä voi '
            + 'katkaista lainkaan — siksi soittaja erottaa peräkkäiset '
            + 'sävelet toisistaan salamannopeilla koristenuoteilla. Soitin on '
            + 'tehty ulkona soitettavaksi: sisätiloissa se peittää alleen '
            + 'kaikki muut soittimet.',
          selite: 'Katusoittaja Edinburghissa. Säkki on kainalossa, puhallusputki '
            + 'suussa ja kolme bordunapilliä lepää olkapäällä; kiltti on '
            + 'punaruudullinen ja jalassa valkoiset polvisukat. Alanurkassa '
            + 'makaa soittajan vaalea koira.',
          lahde: 'David Monniaux, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Säkkipilli',
          musiikki: 'https://music.apple.com/fi/search?term=highland%20bagpipe',
          musiikkiNimi: 'Skotlantilaista säkkipillimusiikkia Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/raretunes_364_beating-retreat-edinburgh-castle/raretunesedretreat.mp3',
          musiikkiNayteNimi: 'Pipe band, Edinburgh Castle — CC BY-NC-SA',
        },
        {
          otsikko: 'Tattoo tarkoitti: sulkekaa hanat',
          tiedosto: 'Royal Edinburgh Military Tattoo, The Finale - geograph.org.uk - 6233821.jpg',
          teksti: 'Joka elokuu linnan edustalle rakennetaan katsomot, ja niiden '
            + 'keskellä marssivat sotilassoittokunnat. Nimi tulee 1600-luvun '
            + 'hollannista: rumpalit soittivat iltaisin majatalojen edessä '
            + 'merkin doe den tap toe eli sulkekaa hanat, jolloin sotilaiden '
            + 'oli aika lopettaa ja palata nukkumaan. Ensimmäinen Edinburghin '
            + 'tattoo pidettiin vuonna 1950. Siinä oli kahdeksan '
            + 'ohjelmanumeroa ja noin 6 000 katsojaa rakennustelineillä; '
            + 'nykyään katsomoon mahtuu 8 800 ihmistä joka ilta.',
          selite: 'Loppukohtaus katsomon edessä: punatakkisia soittajia tuubien, '
            + 'torvien ja rumpujen kanssa, karvalakkipäisiä kaartilaisia ja '
            + 'kiltteihin pukeutuneita pillipiipareita. Takana katsomo on '
            + 'täynnä väkeä.',
          lahde: 'David Dixon, Wikimedia Commons (CC BY-SA 2.0)',
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
    {
      id: 'arki',
      nimi: 'Arki ja tavat',
      johdanto: 'Merimiesten kiitoslahjat roikkuvat kirkon katossa, ja '
        + 'saippuakuution kylkeen leimataan luku, joka kertoo mitä sen '
        + 'sisällä on.',
      tehtava: {
        kysymys: 'Mikä luku leimataan marseillelaisen saippuakuution kylkeen?',
        vaihtoehdot: ['100', '72', '1688', '600'],
        oikea: 1,
        fakta: 'Kuution kylkeen leimataan luku 72, joka kertoo öljyn osuuden '
          + 'prosentteina — vastaus löytyi saippuanostosta.',
      },
      nostot: [
        {
          otsikko: 'Laivat roikkuvat katossa',
          tiedosto: 'Intérieur de la basilique Notre-Dame de la Garde, Marseille — coupoles dorées et ex-voto en forme de bateaux.jpg',
          teksti: 'Kaupungin yllä kohoavalla kalliokukkulalla seisoo Notre-Dame '
            + 'de la Garden basilika, jota marseillelaiset sanovat nimellä la '
            + 'Bonne Mère eli Hyvä äiti. Merimiehet ovat vuosisatojen ajan '
            + 'tuoneet sinne kiitoslahjan selvittyään myrskystä tai '
            + 'haaksirikosta: maalauksen tapahtumasta tai pienoismallin '
            + 'omasta aluksestaan. Siksi kirkon kultamosaiikkiholvien alla '
            + 'roikkuu katosta purjeveneitä ja laivoja.',
          selite: 'Basilikan kultaiset mosaiikkikupolit alhaalta kuvattuna. '
            + 'Katosta roikkuu ohuissa langoissa purjeveneiden ja laivojen '
            + 'pienoismalleja, jotka näkyvät tummina siluetteina kultaa '
            + 'vasten.',
          lahde: 'Manitout19, Wikimedia Commons (CC BY 4.0)',
          wiki: 'Notre-Dame de la Garde',
        },
        {
          otsikko: 'Saippuassa lukee 72',
          tiedosto: 'Savons de Marseille.jpg',
          teksti: 'Marseillen saippuaa on keitetty oliiviöljystä ja soodasta '
            + 'keskiajalta asti. Lokakuun 5. päivänä 1688 kuninkaan asetus '
            + 'kielsi käyttämästä siihen rasvaa tai voita — vain puhdasta '
            + 'oliiviöljyä, tai tavarat takavarikoitiin. Perinteisen 600 '
            + 'gramman kuution kylkeen leimataan valmistajan nimi ja luku 72, '
            + 'joka kertoo öljyn osuuden prosentteina. Vuonna 1913 kaupunki '
            + 'tuotti saippuaa 180 000 tonnia; nykyään vanhalla tavalla '
            + 'keittäviä saippuatehtaita on enää kourallinen.',
          selite: 'Markkinapöydän laatikko täynnä vaaleita saippuakuutioita. '
            + 'Yhden kylkeen on leimattu EXTRA PUR 72 % GARANTI, ja oikealla '
            + 'on rivi violetteja saippuoita.',
          lahde: 'Arnaud 25, Wikimedia Commons (PD)',
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
      id: 'musiikki',
      nimi: 'Musiikki',
      johdanto: 'Fado syntyi 1800-luvun alussa Lissabonin kujilla, ja Unesco otti '
        + 'sen ihmiskunnan kulttuuriperinnön luetteloon vuonna 2011.',
      tehtava: {
        kysymys: 'Kuinka monta kieltä portugalilaisessa kitarassa on?',
        vaihtoehdot: ['Kuusi', 'Kahdeksan, neljänä parina', 'Kaksitoista, kuutena parina', 'Kaksikymmentä, kymmenenä parina'],
        oikea: 2,
        fakta: 'Fadoa säestää kaksi kitaraa, ja portugalilaisessa niistä on '
          + 'kuusi kieliparia eli kaksitoista kieltä — vastaus löytyi '
          + 'fadonostosta.',
      },
      nostot: [
        {
          otsikko: 'Fado — laulu, jossa on saudade',
          tiedosto: 'Amalia Rodrigues Portugese fado-zangeres op Schiphol, Bestanddeelnr 916-9840.jpg',
          teksti: 'Fado on Lissabonin oma laulu: yksi laulaja, klassinen kitara '
            + 'ja portugalilainen kitara, jossa on kaksitoista kieltä kuutena '
            + 'parina. Aiheena on useimmiten saudade, kaipaus jotakin kohti, '
            + 'mitä ei enää ole. Amália Rodrigues lauloi fadoa yli '
            + 'viisikymmentä vuotta, ja kun hän kuoli 1999, Portugalissa '
            + 'vietettiin kolme päivää kansallista surua.',
          selite: 'Amália Rodrigues Schipholin lentokentällä lokakuussa 1964 '
            + 'Päässä on tumma huivi solmittuna hiusten yli, kaulassa leveä '
            + 'metallikoru ja sylissä turkki. Musta asu oli hänen '
            + 'tunnusmerkkinsä.',
          lahde: 'Harry Pot / Anefo, Wikimedia Commons (CC0)',
          wiki: 'Amália Rodrigues',
          musiikki: 'https://music.apple.com/fi/search?term=am%C3%A1lia%20rodrigues',
          musiikkiNimi: 'Amália Rodrigues Apple Musicissa',
          musiikkiNayte: 'https://archive.org/download/Fado2017/003-don-bosco-students.mp3',
          musiikkiNayteNimi: 'Fadokilpailu 2017 — Aren Noronha, CC BY-SA',
        },
        {
          otsikko: 'Severan kotikadulle ladottiin kitara',
          tiedosto: 'Maria Severa - Fado-Sängerin.jpg',
          teksti: 'Maria Severa Onofriana syntyi vuonna 1820 ja lauloi fadoa '
            + 'Mourarian kortteleissa niin, että hänestä tuli koko Lissabonin '
            + 'puheenaihe. Hän sairastui tuberkuloosiin ja kuoli 30. '
            + 'marraskuuta 1846 vain 26-vuotiaana Rua do Capelãon varrella. '
            + 'Köyhä laulaja haudattiin yhteishautaan ilman arkkua. '
            + 'Kahdeksankymmentäviisi vuotta myöhemmin hänestä tehtiin '
            + 'Portugalin ensimmäinen äänielokuva, ja hänen kotikatunsa '
            + 'kiveykseen on ladottu kitaran kuva.',
          selite: 'Maria Severa Francisco Metrassin piirroksessa. Hän on '
            + 'sivuttain, hiukset nutturalla, korvassa rengas ja kaulassa '
            + 'ristiriipus; hartioilla riippuu tummareunainen huivi.',
          lahde: 'Francisco Augusto Metrass, Wikimedia Commons (PD)',
          wiki: 'Maria Severa',
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
      id: 'ruoka',
      nimi: 'Ruoka',
      johdanto: 'Katalonian omat ruoat eivät ole hienoja: hiiltynyt sipuli ja '
        + 'leipäviipale, jota hierotaan tomaatilla. Molemmat syödään sormin.',
      tehtava: {
        kysymys: 'Minkä kasvin oksilla calçotit paahdetaan avotulella?',
        vaihtoehdot: ['Oliivipuun', 'Mantelipuun', 'Viiniköynnöksen', 'Korkkitammen'],
        oikea: 2,
        fakta: 'Sipulit ladotaan palavien viiniköynnöksen oksien päälle — se '
          + 'lukee calçot-nostossa.',
      },
      nostot: [
        {
          otsikko: 'Calçot syödään esiliina kaulassa',
          tiedosto: 'Calçotada a Valls (Catalonia).jpg',
          teksti: 'Calçot on pitkäksi kasvatettu kevätsipuli, jota paahdetaan '
            + 'avotulella viiniköynnöksen oksista. Musta kuori vedetään '
            + 'sormin pois, valkoinen sisus kastetaan romesco-kastikkeeseen '
            + 'ja pudotetaan suuhun pää takakenossa — siksi kaulaan sidotaan '
            + 'esiliina. Kausi kestää marraskuusta huhtikuuhun. Valls, josta '
            + 'laji on kotoisin, järjestää calçotada-juhlansa tammikuun '
            + 'viimeisenä sunnuntaina, ja siellä kilpaillaan myös syömisessä.',
          selite: 'Calçoteja paahdetaan kadulla Vallsissa. Sipulit on ladottu '
            + 'ritilälle palavien viiniköynnöksen oksien päälle, ja kuoren '
            + 'pitää hiiltyä mustaksi, jotta sisus kypsyy höyryssä. '
            + 'Paahtajilla on punainen barretina-lakki.',
          lahde: 'flydime, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          otsikko: 'Leipä hierotaan tomaatilla',
          tiedosto: 'Pa amb tomaquet.jpg',
          teksti: 'Pa amb tomàquet on Katalonian arkisin ruoka: leipäviipale, '
            + 'jota hierotaan halkaistulla kypsällä tomaatilla, päälle '
            + 'oliiviöljyä ja suolaa. Hierominen lopetetaan, kun leipä on '
            + 'vaaleanpunainen. Ravintolassa leipä tuodaan usein pöytään '
            + 'paljaana ja tomaatinpuolikas viereen, jolloin jokainen hieroo '
            + 'omansa. Tomaatiksi kasvatetaan omaa lajiketta, tomàquet de '
            + 'penjar, joka sidotaan letiksi roikkumaan ja säilyy talven yli.',
          selite: 'Lautasellinen pa amb tomàquetia. Leivät on paahdettu ja '
            + 'hierottu tomaatilla niin, että kuoreen on jäänyt siemeniä ja '
            + 'punaisia paloja; oliiviöljy kiiltää lautasen pohjalla.',
          lahde: 'Jennifer Woodard Maderazo, Wikimedia Commons (CC BY 2.0)',
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
    {
      id: 'ruoka',
      nimi: 'Ruoka',
      johdanto: 'Granadassa ruokaa ei tarvitse tilata baaritiskillä, ja kaupungin '
        + 'kuuluisin leivos on kotoisin sotaleiristä ja nimetty paavin '
        + 'mukaan.',
      tehtava: {
        kysymys: 'Kenen mukaan pionono-leivos on saanut nimensä?',
        vaihtoehdot: ['Sen keksineen leipurin mukaan', 'Paavi Pius IX:n mukaan', 'Santa Fen kirkon mukaan', 'Kuningatar Isabellan mukaan'],
        oikea: 1,
        fakta: 'Leipuri Ceferino Isla nimesi leivoksen paavi Pius IX:n mukaan, '
          + 'jota sanottiin italiaksi Pío Nonoksi — se lukee leivosnostossa.',
      },
      nostot: [
        {
          otsikko: 'Tapas kuuluu hintaan',
          tiedosto: 'Cerveza y pulpo seco motrileño.jpg',
          teksti: 'Granadassa juoman mukana tulee tapas ilman eri maksua. Annosta '
            + 'ei saa valita: se on baarin valinta eikä asiakkaan, ja se '
            + 'vaihtuu joka kierroksella — monessa paikassa annokset myös '
            + 'kasvavat, mitä pitempään istut. Muualla Espanjassa ilmainen '
            + 'tapas on jo harvinaisuus, ja granadalaiset puolustavat omaansa '
            + 'kiivaasti. Ruokalistaa ei siis kannata pyytää: illan syö '
            + 'helpoiten kävelemällä baarista toiseen ja katsomalla, mitä '
            + 'eteen tuodaan.',
          selite: 'Olut ja tapas Granadan seudulla. Valkoisella lautasella on '
            + 'kuivattua mustekalaa suikaleina salaatinlehtien päällä, '
            + 'vieressä lasillinen olutta puisella baaritiskillä.',
          lahde: 'Arkangel, Wikimedia Commons (CC BY-SA 2.0)',
        },
        {
          otsikko: 'Leivos kaupungista, joka rakennettiin piiritystä varten',
          tiedosto: 'Granada - Pionono.jpg',
          teksti: 'Granadan vieressä on Santa Fen pikkukaupunki, jonka Kastilian '
            + 'ja Aragonian hallitsijat rakennuttivat vuonna 1491 '
            + 'sotaleiriksi Granadan piiritystä varten: suorakulmainen '
            + 'ruudukko, kaksi katua ristissä ja neljä porttia. Siellä '
            + 'allekirjoitettiin huhtikuussa 1492 sopimus, jolla Kristoffer '
            + 'Kolumbus sai luvan lähteä merelle. Nykyään Santa Fe tunnetaan '
            + 'aivan muusta: sieltä on kotoisin pionono, pieni siirappiin '
            + 'kastettu leivos. Sen keksijäksi kerrotaan leipuri Ceferino '
            + 'Isla, ja nimi tulee paavi Pius IX:stä — italiaksi Pío Nono, '
            + 'siitä pionono.',
          selite: 'Pionono kämmenellä paperivuoassa: pieni siirappiin kastettu '
            + 'kääretorttu, jonka päällä on ruskistettua kermaa, ja mukana '
            + 'muovilusikka. Koko on parin suupalan luokkaa.',
          lahde: 'GrandCelinien, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Kristoffer Kolumbus',
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
      id: 'ruoka',
      nimi: 'Ruoka',
      johdanto: 'Kaksi budapestilaista keksintöä: keitto, jonka nimen muu Eurooppa '
        + 'ymmärsi väärin, ja kakku, jonka ulkonäöstä on annettu oma asetus.',
      tehtava: {
        kysymys: 'Montako kakkulevyä dobostortassa on Unkarin asetuksen mukaan?',
        vaihtoehdot: ['Kolme', 'Viisi', 'Seitsemän', 'Kaksitoista'],
        oikea: 1,
        fakta: 'Vuoden 2017 asetus määrää dobostortan pyöreäksi kakuksi, jossa '
          + 'on viisi levyä ja päällä karamellikansi — vastaus löytyi '
          + 'kakkunostosta.',
      },
      nostot: [
        {
          otsikko: 'Gulassi on Unkarissa keitto',
          tiedosto: 'Paprika Vendor Budapest big hall.jpg',
          teksti: 'Se, mitä muualla Euroopassa kutsutaan gulassiksi, on Unkarissa '
            + 'pörkölt eli paksu pata. Gulyás taas on keitto: lientä, '
            + 'naudanlihaa, perunaa ja paprikaa, ja se syödään lusikalla. '
            + 'Sana tarkoittaa karjapaimenta — keitto keitettiin alun perin '
            + 'padassa laitumella. Paprika saapui maahan ottomaanien mukana '
            + '1500-luvulla, ja Budapestin suuressa kauppahallissa, joka '
            + 'avattiin vuonna 1897, sitä myydään makeasta tuliseen.',
          selite: 'Paprikakoju Budapestin suuressa kauppahallissa. Katosta ja '
            + 'tiskin reunasta riippuu nauhoja kuivuvia punaisia palkoja ja '
            + 'valkosipulipunoksia, ja hyllyillä on pusseittain jauhettua '
            + 'paprikaa eri vahvuuksina.',
          lahde: 'Takkk, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Gulassi',
        },
        {
          otsikko: 'Kakku, jolle annettiin oma asetus',
          tiedosto: 'Dobos torta.jpg',
          teksti: 'Sokerileipuri Dobos C. József kehitti vuonna 1884 kakun, joka '
            + 'säilyisi aikana ennen jääkaappeja: viisi ohutta levyä, väliin '
            + 'suklaavoikreemiä ja päälle kova karamellikansi, joka estää '
            + 'kuivumisen. Hän esitteli sen Budapestin suuressa näyttelyssä '
            + 'vuonna 1885, ja maistajiin kuuluivat keisari Frans Joosef ja '
            + 'keisarinna Elisabet. Reseptin Dobos piti salassa vuoteen 1906. '
            + 'Vuonna 2017 Unkarin ministeriö määräsi asetuksella, millainen '
            + 'dobostorta saa olla.',
          selite: 'Dobostorta ylhäältä kuvattuna. Karamellikansi on leikattu '
            + 'kolmioiksi ja nostettu pystyyn kreemiruusukkeiden varaan kuin '
            + 'tuulimyllyn siivet, ja kakun reunasta erottuvat vaaleiden '
            + 'levyjen ja tumman kreemin vuorottelevat kerrokset.',
          lahde: 'Christo, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Dobos torta',
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
};
