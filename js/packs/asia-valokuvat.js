// Matkakirjan valokuvakortit (ASIA_VALOKUVAT).
//
// Sama rakenne kuin EUROPE_VALOKUVAT ja AFRICA_VALOKUVAT: vanha vedos
// isoisän ajoilta, päiväkirjan mainitsemat näkymät (lisat) ja sama
// paikka nykyään. Kuvat haetaan Commonsista sitä mukaa kuin pelaaja ne
// näkee, ja palvelutyöntekijä tallentaa kerran nähdyn omaan koriinsa.
//
// Kuvat on etsitty kaupungin päiväkirjamerkinnän pohjalta ja jokainen
// tiedosto tarkistettu Commonsista ennen kirjoittamista: olemassaolo,
// vähintään 1200 pikseliä, vapaa lisenssi ilman ND-ehtoa, ja vanhaksi
// merkityn kuvan ikä.
//
// Tuotettu komennolla tools/kirjoita-kuvakortit.mjs. Älä muokkaa
// pistelistoja käsin — korjaa lähde ja aja uudelleen.
export const ASIA_VALOKUVAT = {
  aden: {
    tiedosto: 'De haven van Aden in Zuid Jemen Aden (titel op object), RP-F-00-5018-14.jpg',
    vuosi: '1890-1910',
    lahde: 'Rijksmuseum, Commons (CC0)',
    selite: 'Adenin satama ja sen ranta noin vuoden 1900 tienoilla. Takana '
      + 'kohoavat sammuneen tulivuoren mustat rinteet. Laivat pysähtyivät '
      + 'täällä ottamaan hiiltä matkalla Suezista Intiaan, ja siitä koko '
      + 'kaupunki eli.',
    lisat: [
      {
        tiedosto: 'Waterbassins in het bergachtige landschap in Aden Aden waterworks. The tanks (titel op object), RP-F-00-5018-17.jpg',
        vuosi: '1890-luku',
        lahde: 'Rijksmuseum, Commons (CC0)',
        selite: 'Adenin vesisäiliöt kuvattuna 1890-luvulla. Altaat on hakattu '
          + 'vuorenrotkoon peräkkäin niin, että harvinainen sadevesi valuu '
          + 'ylimmästä alimpaan eikä ehdi karata mereen.',
      },
      {
        tiedosto: 'Cisterns of Tawila - صهاريج عدن - panoramio.jpg',
        vuosi: '2010',
        lahde: 'Tariq Ahmed, Commons (CC BY-SA 3.0)',
        selite: 'Samat Tawilan säiliöt nykyään. Kukaan ei tiedä varmasti kuka ne '
          + 'rakensi tai milloin, ja 1800-luvulla ne kaivettiin esiin '
          + 'täytemaan alta ja otettiin uudelleen käyttöön.',
      },
      {
        tiedosto: 'Port of Aden.jpg',
        vuosi: '2023',
        lahde: 'Ahmedxalkatheri, Commons (CC BY-SA 4.0)',
        selite: 'Adenin satama yöllä: nostureita, säiliöitä ja laitureita lahden '
          + 'rannalla. Laivaväylä Punaiseltamereltä Intian valtamerelle '
          + 'kulkee yhä tämän niemen ohi.',
      },
    ],
    uusi: {
      tiedosto: 'Aden - panorama of crater from Tawila Tunks (8739851148).jpg',
      vuosi: '2013',
      lahde: 'JamesGardinerCollection, Commons (CC BY-SA 2.0)',
      selite: 'Adenin Crater-kaupunginosa nykyään vesisäiliöiden kohdalta '
        + 'katsottuna. Talot täyttävät kraatterin pohjan ja tummat rinteet '
        + 'nousevat ympärillä joka suuntaan kuin muuri.',
    },
  },
  ankara: {
    tiedosto: 'CH-NB - Türkei, Ankara- Festung - Annemarie Schwarzenbach - SLA-Schwarzenbach-A-5-02-053.jpg',
    vuosi: '1933-1934',
    lahde: 'Annemarie Schwarzenbach / Sveitsin kansalliskirjasto, Commons (PD)',
    selite: 'Kantajia ja aaseja kulkee paljaalla rinteellä Ankaran linnan '
      + 'alapuolella; ylhäällä näkyvät muurit ja niiden lomassa vanhat talot. '
      + 'Kuva otettiin noin kymmenen vuotta sen jälkeen, kun kylästä oli '
      + 'tullut uuden tasavallan pääkaupunki, eikä uusi kaupunginosa ollut '
      + 'vielä ehtinyt tänne asti.',
    lisat: [
      {
        tiedosto: 'Turkey. Ankara. Main boulevard to Yeni Shehir showing govt. (i.e., government) buildings LOC matpc.16730.jpg',
        vuosi: '1935',
        lahde: 'Matson Collection / Library of Congress (PD)',
        selite: 'Uuden pääkaupungin pääväylä kohti Yenişehiriä: leveä ajorata, '
          + 'istutettu keskikaista ja kävelijöitä matkalla virastoihin. Katu '
          + 'vedettiin tyhjän ylängön poikki ennen kuin sen varrella oli '
          + 'juuri mitään, ja rakennukset nousivat vasta sen jälkeen.',
      },
      {
        tiedosto: 'Ankara Kalesi surları.jpg',
        vuosi: '2014',
        lahde: 'LordReco, Commons (CC BY-SA 4.0)',
        selite: 'Ankaran linnan muuria kukkulan laella. Muurin kivissä on mukana '
          + 'vanhempien roomalaisten rakennusten pylväänpaloja ja '
          + 'kivilohkareita, jotka rakentajat poimivat suoraan kaupungin '
          + 'raunioista.',
      },
    ],
    uusi: {
      tiedosto: 'View of Ankara city from the castle.jpg',
      vuosi: '2021',
      lahde: 'Tsdlnsaıd, Commons (CC BY-SA 4.0)',
      selite: 'Näkymä linnanmuurilta: etualalla vanhan kaupungin tiilikattoja, '
        + 'taustalla moskeija ja kauempana nykyinen keskusta tornitaloineen. '
        + 'Sama kukkula, jolta vanha valokuva on otettu, on nyt keskellä '
        + 'miljoonakaupunkia.',
    },
  },
  astana: {
    lisat: [
      {
        tiedosto: 'Khan-Shatyr shopping mall.jpg',
        vuosi: '2024',
        lahde: 'Dauren Nabijan, Commons (CC0)',
        selite: 'Han Satyr eli Kaanin teltta, Astanan kauppakeskus. Muoto on '
          + 'lainattu paimentolaisten teltasta, ja läpikuultava '
          + 'muovikalvokatto päästää auringon sisään mutta pitää pakkasen '
          + 'ulkona.',
      },
      {
        tiedosto: 'Nurjol Boulevard Astana.jpg',
        vuosi: '2026',
        lahde: 'Dauren Nabijan, Commons (CC0)',
        selite: 'Nurzolin bulevardi Astanan uudessa keskustassa. Tämä puoli '
          + 'Esil-jokea oli aroa vielä 1990-luvulla, ja kadut mitattiin '
          + 'leveiksi ennen kuin yhtään taloa oli rakennettu.',
      },
      {
        tiedosto: 'Central Astana on a Sunny, Snowy Day in February 2013 (8481953080).jpg',
        vuosi: '2013',
        lahde: 'Ken and Nyetta, Commons (CC BY 2.0)',
        selite: 'Astanan hallintokortteli helmikuussa lumen peittämän joen takaa. '
          + 'Esil-joki on jäässä marraskuusta huhtikuulle, ja vain '
          + 'Ulaanbaatar on maailman pääkaupungeista kylmempi.',
      },
    ],
    uusi: {
      tiedosto: 'Astana Esil view.jpg',
      vuosi: '2026',
      lahde: 'Dauren Nabijan, Commons (CC0)',
      selite: 'Astanan lasitornit Esil-joen rannalta nähtynä. Kaupungissa asuu '
        + 'nyt yli miljoona ihmistä, kun pääkaupungiksi nimeämisen aikaan '
        + '1997 heitä oli noin kolmesataatuhatta.',
    },
  },
  bagdad: {
    tiedosto: 'Baghdad, the riverfront, looking north to the Old City from the right bank, near the British Embassy LOC matpc.13270.jpg',
    vuosi: '1932',
    lahde: 'Library of Congress (PD)',
    selite: 'Tigrisin ranta Bagdadissa vuonna 1932. Joen yli vie veneiden varaan '
      + 'rakennettu silta, jonka keskiosa avattiin laivojen tieltä. Rannassa '
      + 'pestään pyykkiä ja aasit kantavat kuormaa samaa polkua, jota myöten '
      + 'tavara nousi kaupunkiin.',
    lisat: [
      {
        tiedosto: 'Grilling masgouf - Flickr - Al Jazeera English.jpg',
        vuosi: '2010',
        lahde: 'Al Jazeera English, Commons (CC BY-SA 2.0)',
        selite: 'Masgouf-kalaa kypsymässä avotulen ympärillä Bagdadissa. Kala '
          + 'halkaistaan selästä ja pidetään tunnin verran tulen sivussa, '
          + 'joten työn tekee savu ja säteilylämpö eikä liekki.',
      },
      {
        tiedosto: 'المدرسة المستنصرية في بغداد.jpg',
        vuosi: '2016',
        lahde: 'Mustafa Waad Saeed, Commons (CC BY-SA 4.0)',
        selite: 'Mustansiriya-koulun sisäpiha Tigrisin rannalla Bagdadissa. '
          + 'Viisauden taloa ei ole enää olemassa, mutta tämä vuonna 1233 '
          + 'valmistunut koulu seisoo yhä ja oli aikanaan yksi maailman '
          + 'suurimmista kirjastoineen.',
      },
    ],
    uusi: {
      tiedosto: 'بغداد نهر دجلة.jpg',
      vuosi: '2015',
      lahde: 'Mustafa Nader, Commons (CC BY-SA 4.0)',
      selite: 'Tigris keskellä Bagdadia nykyään. Joki on yhä yhtä leveä ja '
        + 'ruskea, mutta sen yli vie nyt kymmenkunta kiinteää siltaa siellä, '
        + 'missä 1930-luvulla kelluivat veneet.',
    },
  },
  damaskos: {
    tiedosto: 'The street called straight, Damascus, Holy Land, (i.e. Syria)-LCCN2002724979.jpg',
    vuosi: '1890-luku',
    lahde: 'Library of Congress, photochrom-kokoelma (PD)',
    selite: 'Suora katu Damaskoksessa: kävelijöitä, aasin selässä ratsastava mies '
      + 'ja ulos työntyviä puisia erkkereitä katon rajassa. Kuva on '
      + 'photochrom eli kivipainossa väritetty vedos, jollaisia myytiin '
      + 'matkamuistoiksi ennen värivalokuvausta.',
    lisat: [
      {
        tiedosto: 'Straight Street and Roman Arch (5348408394).jpg',
        vuosi: '2011',
        lahde: 'Varun Shiv Kapur, Commons (CC BY 2.0)',
        selite: 'Roomalainen kaari seisoo keskellä Suoraa katua Damaskoksessa, ja '
          + 'sen vieressä ihmiset kävelevät ohi kuin mitään ei olisi. Kaari '
          + 'on jäänne siitä, kun katu oli leveä pylväskuja — nykyinen kapea '
          + 'katu kulkee vanhan kadun keskiosaa pitkin.',
      },
      {
        tiedosto: 'Umayyad Mosque, Damascus, August 2024.jpg',
        vuosi: '2024',
        lahde: 'Noureddine Attar, Commons (CC BY-SA 4.0)',
        selite: 'Umaijadien moskeijan piha Damaskoksessa: kirkkaaksi kulunut '
          + 'marmorilattia, kaarikäytävä ja kullanvärisiä mosaiikkeja '
          + 'pinnoilla. Pihalle mennään paljain jaloin, ja juuri se on hionut '
          + 'kiven vuosisatojen kuluessa peilimäiseksi.',
      },
      {
        tiedosto: 'Copper antique shop.jpg',
        vuosi: '2024',
        lahde: 'Z.f.photo, Commons (CC BY-SA 4.0)',
        selite: 'Kupari- ja hopeaesineiden liike vanhassa Damaskoksessa, tavara '
          + 'ladottuna hyllyihin ja lattialle asti. Suuri osa kuvan astioista '
          + 'on takomalla tehtyjä, ja pajat sijaitsevat samojen kujien '
          + 'varrella kuin myymälät.',
      },
    ],
    uusi: {
      tiedosto: 'Bab Sharqi Street, Damascus.jpg',
      vuosi: '2010',
      lahde: 'Bernard Gagnon, Commons (CC BY-SA 3.0)',
      selite: 'Suoran kadun itäpää Damaskoksessa nykyään: ulos työntyvät puiset '
        + 'erkkerit ovat yhä paikoillaan, ja keskikaistalle on nostettu '
        + 'vanhoja pylväänpätkiä. Katu kulkee samaa linjaa kuin roomalainen '
        + 'pääkatu kaksituhatta vuotta sitten.',
    },
  },
  doha: {
    lisat: [
      {
        tiedosto: 'Falconry accessories for sale at Souq Waqif.jpg',
        vuosi: '2012',
        lahde: 'Alex Sergeev, Commons (CC BY-SA 3.0)',
        selite: 'Haukkakauppa Souq Waqifissa Dohassa: kaksi lintua orsillaan ja '
          + 'seinällä rivi nahkahuppuja. Huppu ei ole koriste vaan '
          + 'rauhoituskeino, sillä pimeässä lintu ei säikähdä ihmisjoukkoa.',
      },
      {
        tiedosto: 'Falco cherrug Qatar.jpg',
        vuosi: '2006',
        lahde: 'Flickr-käyttäjä Qatari, Commons (CC BY 2.0)',
        selite: 'Tunturihaukkaan kuuluva aavikkohaukka metsästäjän hansikkaalla '
          + 'Dohassa. Qatarissa haukoilla on oma sairaalansa ja omat '
          + 'passinsa, koska ne matkustavat omistajiensa mukana '
          + 'lentokoneessa.',
      },
      {
        tiedosto: 'Souq Waqif, Doha, Catar, 2013-08-05, DD 01.JPG',
        vuosi: '2013',
        lahde: 'Diego Delso, Commons (CC BY-SA 3.0)',
        selite: 'Souq Waqifin aukio Dohan vanhalla puolella. Tori purettiin ja '
          + 'rakennettiin 2000-luvulla uudelleen vanhaan asuun mutasavella ja '
          + 'puupalkeilla, joten se näyttää vanhemmalta kuin on.',
      },
    ],
    uusi: {
      tiedosto: 'Doha Corniche by KS.jpg',
      vuosi: '2017',
      lahde: 'Krissubh, Commons (CC BY-SA 4.0)',
      selite: 'Dohan lahti nykyään: puisia veneitä etualalla ja West Bayn '
        + 'lasitornit vastarannalla. Rantabulevardin alla oleva maa on '
        + 'suurelta osin merestä täytettyä.',
    },
  },
  dubai: {
    lisat: [
      {
        tiedosto: 'Abras in Dubai Creek!.jpg',
        vuosi: '2014',
        lahde: 'Phil6007, Commons (CC BY-SA 4.0)',
        selite: 'Abra-veneitä laiturissa Dubain lahdella. Matka toiselle rannalle '
          + 'maksaa yhä yhden dirhamin, eikä veneillä ole aikataulua: ne '
          + 'lähtevät, kun penkit ovat täynnä.',
      },
      {
        tiedosto: 'Al Buteen 10.jpg',
        vuosi: '2024',
        lahde: 'Asd akhilesh, Commons (CC BY-SA 4.0)',
        selite: 'Dubai Creek Al Buteenin kohdalla, vastarannalla vanha Deira. '
          + 'Lahti on ihmisen muokkaama siinä missä luonnonkin: se ruopattiin '
          + '1960-luvulla syvemmäksi, jotta isommat tavaralaivat pääsivät '
          + 'sisään.',
      },
      {
        tiedosto: 'Dubai - Deira Spice Souk - ديرة سوق التوابل - panoramio.jpg',
        vuosi: '2015',
        lahde: 'giggel, Commons (CC BY 3.0)',
        selite: 'Deiran maustetori aivan lahden rannassa. Osa säkkien sisällöstä '
          + 'ei ole maustetta lainkaan vaan suitsuketta ja kuivattuja '
          + 'limettejä, joilla keittoihin haetaan happamuutta.',
      },
      {
        tiedosto: 'Burj Khalifa Dubai, UAE at Sunset 001 by Eric Chamchoum.jpg',
        vuosi: '2024',
        lahde: 'Eric Chamchoum, Commons (CC BY 4.0)',
        selite: 'Burj Khalifa nousee Dubain silhuetista auringonlaskun aikaan. '
          + 'Torni on 828 metriä korkea, ja sen ylimmissä kerroksissa aurinko '
          + 'laskee pari minuuttia myöhemmin kuin kadulla.',
      },
    ],
    uusi: {
      tiedosto: 'Downtown Dubai - Dubai - United Arab Emirates - panoramio (22).jpg',
      vuosi: '2013',
      lahde: 'Xiaotong Gao, Commons (CC BY-SA 3.0)',
      selite: 'Dubain keskusta ilmasta: lasitorneja ja moottoritien silmukoita '
        + 'Sheikh Zayed Roadin varrella. Sama tienvarsi oli 1980-luvulla '
        + 'vielä lähes pelkkää aavikkoa.',
    },
  },
  halab: {
    tiedosto: 'CH-NB - Syrien, Aleppo- Zitadelle - Annemarie Schwarzenbach - SLA-Schwarzenbach-A-5-03-014.jpg',
    vuosi: '1933-1934',
    lahde: 'Annemarie Schwarzenbach / Sveitsin kansalliskirjasto, Commons (PD)',
    selite: 'Aleppon linnoitus kukkulansa päällä; alhaalla kadulla kulkee '
      + 'ohikulkijoita ja koululaisia. Kukkulan jyrkkä rinne on päällystetty '
      + 'sileillä kivilaatoilla juuri siksi, ettei sitä pysty kiipeämään '
      + 'ylös.',
    lisat: [
      {
        tiedosto: 'Aleppo Citadel 26 - Bridge.jpg',
        vuosi: '2010',
        lahde: 'Bernard Gagnon, Commons (CC BY-SA 3.0)',
        selite: 'Linnoituksen sisäänkäynnin silta nousee kahdeksalla kaarella '
          + 'vallihaudan yli portille asti. Silta on ainoa reitti sisään, ja '
          + 'se on tehty tahallaan kapeaksi ja jyrkäksi, jotta sen '
          + 'puolustaminen olisi helppoa.',
      },
      {
        tiedosto: 'Al-Madina Souq 01.jpg',
        vuosi: '2005',
        lahde: 'Folkertherlyn, Commons (CC BY-SA 4.0)',
        selite: 'Al-Madinan basaarin katettu käytävä Aleppossa: aasi vetää '
          + 'kuormaa, myyjät odottavat ovilla ja säkkejä on pinottu kaupan '
          + 'eteen. Katto on holvattu kiveen, joten käytävissä on varjoisaa '
          + 'ja viileää keskellä päivää.',
      },
      {
        tiedosto: 'Aleppo Soap 9195.jpg',
        vuosi: '2009',
        lahde: 'Dosseman, Commons (CC BY-SA 4.0)',
        selite: 'Aleppon saippuaa myyntipinossa, palat leikattuina kuutioiksi. '
          + 'Ulkopinta on ruskea mutta sisus vihreä: väri tulee '
          + 'laakeriöljystä, ja saippua kuivuu vuosia ennen kuin se päätyy '
          + 'myyntiin.',
      },
    ],
    uusi: {
      tiedosto: 'Aleppo Citadel at sunset, October 2024.jpg',
      vuosi: '2024',
      lahde: 'Noureddine Attar, Commons (CC BY-SA 4.0)',
      selite: 'Linnoituksen porttitorni illan valossa lokakuussa 2024; alla '
        + 'näkyvät sillan kaaret. Tornin kyljessä oleva teline on '
        + 'korjaustyömaa — linnoitusta kunnostetaan pala kerrallaan.',
    },
  },
  irkutsk: {
    tiedosto: 'Irkutsk Bolshay.jpg',
    vuosi: '1890-luku',
    lahde: 'N. A. Tšarušin, Library of Congress (PD)',
    selite: 'Irkutskin pääkatu 1890-luvulla. Katu on leveä ja talot '
      + 'kaksikerroksisia kivitaloja, sillä kaupunki oli varakas: sen kautta '
      + 'kulki teetä Kiinasta ja kultaa Lenan kaivoksilta.',
    lisat: [
      {
        tiedosto: 'Panorama of lake Baikal.jpg',
        vuosi: '2016',
        lahde: 'Sergei Pesterev, Commons (CC BY-SA 4.0)',
        selite: 'Baikalin ensimmäinen jää Olhonin saarelta katsottuna. Juuri '
          + 'tässä kohtaa järvi on syvimmillään, yli 1 600 metriä — ohuen '
          + 'jään alla on siis vettä enemmän kuin monessa meressä.',
      },
      {
        tiedosto: 'Drewniana architektura w Irkucku 08.JPG',
        vuosi: '2010',
        lahde: 'Marcin Konsek, Commons (CC BY-SA 4.0)',
        selite: 'Ikkunanpielet irkutskilaisen puutalon seinässä. Koristelauta on '
          + 'sahattu ja veistetty käsin. Se ei ole pelkkä koriste: sen alla '
          + 'on rako hirsiseinän ja ikkunakarmin välissä, ja pieli peittää '
          + 'sen tuulelta.',
      },
    ],
    uusi: {
      tiedosto: 'Irkutsk, Lower Embankment, Russia.jpg',
      vuosi: '2015',
      lahde: 'Vjatšeslav Argenberg, Commons (CC BY 4.0)',
      selite: 'Angaran alaranta Irkutskissa nykyään. Angara on ainoa joki, joka '
        + 'lähtee Baikalista ulos; kaikki muut sadat joet laskevat siihen.',
    },
  },
  isfahan: {
    tiedosto: 'ETH-BIB-Isfahan mit Meidan-e Schah Platz-Persienflug 1924-1925-LBS MH02-02-0150-AL-FL.tif',
    vuosi: '1925',
    lahde: 'Walter Mittelholzer, ETH-Bibliothek / Commons (PD)',
    selite: 'Isfahan ilmasta helmikuussa 1925. Kuvan yläreunassa erottuvat suuren '
      + 'aukion kupolit ja pitkä kaarikäytävärivi, muualla matalia '
      + 'savikattoja. Kuvaaja oli sveitsiläinen lentäjä, joka lensi Persian '
      + 'yli postikoneella — ilmakuvia kaupungista ei ollut ennen sitä juuri '
      + 'olemassa.',
    lisat: [
      {
        tiedosto: 'Ali Qapu mansion in the early morning.1.jpg',
        vuosi: '2021',
        lahde: 'EbrahimFaryabi, Commons (CC BY-SA 4.0)',
        selite: 'Ali Qapu, aukion länsilaidan palatsi puisine parvekkeineen. '
          + 'Parveke rakennettiin katsomoksi: aukiota käytettiin '
          + 'poolokenttänä, ja pelin kivisiä maalitolppia seisoo aukion '
          + 'päissä yhä.',
      },
      {
        tiedosto: 'Mezquita Shah, Isfahán, Irán, 2016-09-20, DD 71-73 HDR.jpg',
        vuosi: '2016',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Shahin moskeijan kupoli sisältäpäin. Koko pinta on peitetty '
          + 'sinisen ja turkoosin sävyisillä kaakeleilla. Kupolin keskikohdan '
          + 'alla seisova kuulee oman äänensä palaavan monta kertaa takaisin.',
      },
      {
        tiedosto: 'Esfahan bazaar entrance.jpg',
        vuosi: '2006',
        lahde: 'Fabienkhan, Commons (CC BY-SA 2.5)',
        selite: 'Qeysariyen portti aukion pohjoispäässä. Portista alkaa basaari, '
          + 'jonka holvikäytävät jatkuvat kilometrien mittaisina. Portin '
          + 'yläpuolella oli soittajien parvi, joka rummuilla ilmoitti '
          + 'auringon nousun ja laskun.',
      },
    ],
    uusi: {
      tiedosto: 'Naqsh-e Jahan Square 01.jpg',
      vuosi: '2018',
      lahde: 'Gladiator2714, Commons (CC BY-SA 4.0)',
      selite: 'Naqsh-e Jahan nykyään: leikatut nurmikot, pitkä suihkulähdeallas '
        + 'ja moskeijan kupoli aukion laidalla. Aukio on yli 500 metriä '
        + 'pitkä, joten toisesta päästä katsoen ihmiset toisessa päässä '
        + 'näyttävät pisteiltä.',
    },
  },
  izmir: {
    tiedosto: 'Smyrna wharf LCCN2014715176.jpg',
    vuosi: '1900',
    lahde: 'Bain News Service / Library of Congress (PD)',
    selite: 'Soutuveneitä Smyrnan sataman edustalla; rannassa on varastojen rivi '
      + 'ja niiden takana kaupunki nousee rinnettä ylös. Kuva otettiin '
      + 'lasinegatiiville uutistoimiston tilauksesta, ja alkuperäinen levy on '
      + 'yhä tallessa Yhdysvaltain kongressin kirjastossa.',
    lisat: [
      {
        tiedosto: 'CordonAlsancak2.jpg',
        vuosi: '2020',
        lahde: 'Egemen Bilek, Commons (CC BY-SA 4.0)',
        selite: 'Kordonin rantabulevardi auringonlaskun aikaan: '
          + 'nostalgiaraitiovaunu kulkee rantaa pitkin, pyöräilijä ohittaa '
          + 'sen ja rannassa kaksi ihmistä on pysähtynyt veden ääreen. '
          + 'Bulevardin ja meren väliin jätetty leveä nurmikaista on '
          + 'kaupungin suosituin iltakävelyreitti.',
      },
      {
        tiedosto: 'A Smyrna fig-packing establishment, photo from The Encyclopedia of Food by Artemas Ward.jpg',
        vuosi: '1924',
        lahde: 'Artemas Ward, The Encyclopedia of Food / Internet Archive (PD)',
        selite: 'Viikunapakkaamo Smyrnassa: pitkien pöytien ääressä lajitellaan '
          + 'ja ladotaan kuivattuja viikunoita laatikoihin. Kuva päätyi '
          + 'yhdysvaltalaiseen ruokatietosanakirjaan siksi, että Smyrnan '
          + 'viikuna oli tuolloin maailmankaupan tunnetuin viikunalaatu.',
      },
      {
        tiedosto: 'Gevrek Fırını.jpg',
        vuosi: '2026',
        lahde: 'Ozlmktv, Commons (CC BY-SA 4.0)',
        selite: 'Leipuri nostaa pitkällä lapiolla seesamirinkeleitä uunista '
          + 'Izmirin keskustassa. Muualla Turkissa tämä leipä on simit, mutta '
          + 'Izmirissä sitä sanotaan gevrekiksi, ja kuvan leipomo on '
          + 'paistanut niitä vuodesta 1962.',
      },
    ],
    uusi: {
      tiedosto: 'Izmir 2012.jpg',
      vuosi: '2012',
      lahde: 'Haluxjason, Commons (CC BY-SA 4.0)',
      selite: 'Izmirin lahti Kadifekalen linnavuorelta katsottuna: kaupunki '
        + 'kaartuu veden ympäri ja talot nousevat rinteille joka suunnasta. '
        + 'Kuvauspaikan huipulla ovat antiikin ajoilta periytyvät '
        + 'linnoituksen muurit, joten näkymä on sama, jonka takaa kaupungin '
        + 'nimi Smyrna aikoinaan levisi.',
    },
  },
  jakutsk: {
    tiedosto: 'Yakutsk shore.jpg',
    vuosi: '1890-luku',
    lahde: 'Tuntematon kuvaaja, Library of Congress (PD)',
    selite: 'Jakutskin ranta Lena-joella 1890-luvulla: veneitä, ihmisiä '
      + 'laiturilla ja kirkontornit takana. Kaupunkiin ei tullut maantietä '
      + 'eikä rautatietä, joten kaikki tavara saapui jokea pitkin kesällä ja '
      + 'jäätä pitkin talvella.',
    lisat: [
      {
        tiedosto: 'Yakoutsk Construction d\'immeuble.jpg',
        vuosi: '2014',
        lahde: 'Lulu97417, Commons (CC BY-SA 3.0)',
        selite: 'Talon perustuksia Jakutskin keskustassa. Betonipaalut porataan '
          + 'useita metrejä ikiroutaan ja talo jää seisomaan niiden varaan '
          + 'ilmaan. Väliin jäävä rako on tarkoituksella: sen läpi puhaltava '
          + 'pakkasilma pitää maan jäässä.',
      },
      {
        tiedosto: 'Lena River Ice Road.jpg',
        vuosi: '2005',
        lahde: 'Natxo Rodriguez, Commons (CC BY-SA 2.0)',
        selite: 'Talvitie Lenan jäällä Jakutskin kohdalla. Joki on tässä useita '
          + 'kilometrejä leveä ja jää kantaa kuorma-autot. Kesällä sama matka '
          + 'tehdään lautalla, ja kevään ja syksyn välikausina ei '
          + 'kummallakaan tavalla.',
      },
    ],
    uusi: {
      tiedosto: 'Yakutsk - 190228 DSC 5379.jpg',
      vuosi: '2019',
      lahde: 'Ilja Varlamov, Commons (CC BY-SA 4.0)',
      selite: 'Jakutsk helmikuussa 2019. Kaupungin päällä lepää jääsumu: kovassa '
        + 'pakkasessa savu ja pakokaasujen kosteus jäätyvät heti ilmaan '
        + 'eivätkä nouse pois.',
    },
  },
  jekaterinburg: {
    tiedosto: 'Vid na Ekaterinburg ot doma Nachalʹnika Gornago Okruga.jpg',
    vuosi: '1910',
    lahde: 'Sergei Prokudin-Gorski, Library of Congress (PD)',
    selite: 'Jekaterinburg vuonna 1910 kaupunginlammen takaa. Kuva on väreissä, '
      + 'vaikka värifilmiä ei vielä ollut: kuvaaja otti saman näkymän '
      + 'kolmesti eri värisuotimen läpi, ja vasta suodinkuvat yhdistämällä '
      + 'väri syntyi.',
    lisat: [
      {
        tiedosto: 'Europe and Asia Divider (7282575194).jpg',
        vuosi: '2009',
        lahde: 'Peretz Partensky, Commons (CC BY 2.0)',
        selite: 'Euroopan ja Aasian rajamerkki Moskovan-tien varressa '
          + 'Jekaterinburgin länsipuolella. Kivilaattaan on kirjoitettu '
          + 'toiselle puolelle Aasia ja toiselle Eurooppa, ja väliviivan '
          + 'päälle asetutaan seisomaan. Rajan paikasta on kiistelty: '
          + 'obeliskeja on Uralilla useita eikä yksikään ole ainoa oikea.',
      },
      {
        tiedosto: 'Volchikha Mountain (September 2023) - 5.jpg',
        vuosi: '2023',
        lahde: 'Vjatšeslav Buharov, Commons (CC BY-SA 4.0)',
        selite: 'Uralin kumpuja Voltšihan huipulta Jekaterinburgin länsipuolella. '
          + 'Vuoristoksi tätä sanotaan, mutta se on niin vanha, että sään '
          + 'kuluttamana huiput ovat madaltuneet metsän peittämiksi '
          + 'selänteiksi.',
      },
    ],
    uusi: {
      tiedosto: 'Views of Yekaterinburg-2021-1.jpg',
      vuosi: '2021',
      lahde: 'Vjatšeslav Buharov, Commons (CC BY-SA 4.0)',
      selite: 'Jekaterinburg vuonna 2021. Kaupunki on Uralin suurin ja siinä asuu '
        + 'yli miljoona ihmistä, vaikka se aloitti pelkkänä rautatehtaana '
        + 'joen padon vieressä.',
    },
  },
  jerusalem: {
    tiedosto: 'From the Mount of Olives, general view, Jerusalem, Holy Land-LCCN2002725017.jpg',
    vuosi: '1890-luku',
    lahde: 'Library of Congress, photochrom-kokoelma (PD)',
    selite: 'Jerusalemin vanhakaupunki Öljymäeltä katsottuna, oliivipuiden '
      + 'lomasta; muuri kiertää kaupunkia ja keskellä erottuu Kalliomoskeijan '
      + 'kupoli. Etualan rinne on hautausmaata, ja se on syy siihen, että '
      + 'juuri tästä kohdasta on aina ollut esteetön näkymä kaupunkiin.',
    lisat: [
      {
        tiedosto: 'Jerusalem Old City Western Wall Plaza (43177569831).jpg',
        vuosi: '2018',
        lahde: 'Gary Todd, Commons (CC0)',
        selite: 'Länsimuurin aukio vanhassakaupungissa keskipäivällä, väkeä '
          + 'kulkemassa muuria kohti. Aukio on nuori: se raivattiin nykyiseen '
          + 'laajuuteensa vasta 1960-luvun lopulla, ja sitä ennen muurin '
          + 'edessä oli vain kapea kuja.',
      },
      {
        tiedosto: 'Church of the Holy Sepulchre (Jerusalem) 20180704.jpg',
        vuosi: '2018',
        lahde: 'Suicasmo, Commons (CC BY-SA 4.0)',
        selite: 'Pyhän haudan kirkon julkisivu Jerusalemin vanhassakaupungissa. '
          + 'Kirkkoa hoitaa kuusi eri kristillistä kirkkokuntaa yhdessä, ja '
          + 'pääoven avaimet ovat siksi olleet saman muslimiperheen huostassa '
          + 'vuosisatoja.',
      },
      {
        tiedosto: 'Giorgio Minguzzi, Aqabat Hab Rumman, Old Jerusalem.jpg',
        vuosi: '2009',
        lahde: 'Giorgio Minguzzi, Commons (CC BY 2.0)',
        selite: 'Kapea porraskuja vanhassakaupungissa, seinät vaaleaa kalkkikiveä '
          + 'ja katto paikoin holvattu kujan yli. Vanhakaupunki on '
          + 'kokonaisuudessaan alle neliökilometrin, joten tällaisia kujia '
          + 'riittää vain muutama sata metriä suuntaansa.',
      },
    ],
    uusi: {
      tiedosto: 'Jerusalem, 21 December 2025 192.jpg',
      vuosi: '2025',
      lahde: 'מקף־עברי, Commons (CC BY-SA 4.0)',
      selite: 'Kalliomoskeijan kupoli ja minareetti kohoavat vanhankaupungin '
        + 'kattojen yli iltapäivän valossa. Talojen kalkkikivi on määrätty '
        + 'rakennussäännöissä: Jerusalemissa julkisivut on verhottava '
        + 'paikallisella vaalealla kivellä, ja siksi koko kaupunki hehkuu '
        + 'samalla värillä.',
    },
  },
  kamtsatka: {
    tiedosto: 'FMIB 39928 Petropaulski, Kamchatka - From Hill Behind the Town.jpeg',
    vuosi: '1897',
    lahde: 'Leonhard Stejneger / U.S. Fish Commission, Commons (PD)',
    selite: 'Petropavlovsk Kamtsatkan rannikolla vuonna 1897: matalia puutaloja '
      + 'rinteessä ja Avatsanlahti niiden takana. Kuvan otti eläintieteilijä, '
      + 'joka oli tullut tutkimaan Beringinmeren turkishylkeitä, ei '
      + 'kaupunkia.',
    lisat: [
      {
        tiedosto: 'Klyuchevskoi Volcano.JPG',
        vuosi: '2011',
        lahde: 'Sed Brayton, Commons (CC BY-SA 3.0)',
        selite: 'Kljutsevskaja Sopka ja sen vieressä Kamenin huippu. Se on '
          + 'Euraasian korkein toimiva tulivuori, ja etualan harmaa tasanko '
          + 'on purkausten jättämää tuhkaa ja kiveä jokiuomassa.',
      },
      {
        tiedosto: 'Catch o\' the day (53173680023).jpg',
        vuosi: '2023',
        lahde: 'Kandukuru Nagarjun, Commons (CC BY 2.0)',
        selite: 'Kamtsatkan ruskeakarhu syö pyytämäänsä lohta joen rannalla. '
          + 'Kesällä lohta nousee jokiin niin paljon, että karhut kalastavat '
          + 'samalla matalikolla vieri vieressä eivätkä juuri riitele '
          + 'saaliista.',
      },
      {
        tiedosto: 'Долина гейзеров (2018).jpg',
        vuosi: '2018',
        lahde: 'Malupasic, Commons (CC BY-SA 4.0)',
        selite: 'Gejsirien laakso, jossa kuumaa höyryä nousee rinteistä joen '
          + 'molemmin puolin. Laakso löydettiin vasta 1941, ja sinne pääsee '
          + 'edelleen vain helikopterilla.',
      },
    ],
    uusi: {
      tiedosto: 'Petropavlovsk-Kamchatsky with Koryaksky Volcano in background.jpg',
      vuosi: '2007',
      lahde: 'Vfp15, Commons (CC BY-SA 3.0)',
      selite: 'Sama satama nykyään, nostureita laiturilla ja takana Korjakskaja '
        + 'Sopka. Kaupunkiin ei johda maantietä muualta Venäjältä, joten '
        + 'kaikki tulee yhä laivalla tai lentäen.',
    },
  },
  kapadokia: {
    tiedosto: 'Cappadocia LOC matpc.12157.jpg',
    vuosi: '1935',
    lahde: 'Matson Collection / Library of Congress (PD)',
    selite: 'Kartiomaisia tuhkakivimuodostumia Kappadokiassa; etualan kartioiden '
      + 'kylkiin on hakattu ovia ja ikkuna-aukkoja. Kivi on niin pehmeää, '
      + 'että aukot on saatu tehtyä käsityökaluilla, ja se kovettuu vasta '
      + 'ilmassa.',
    lisat: [
      {
        tiedosto: 'Derinkuyu Underground City Türkiye.jpg',
        vuosi: '2022',
        lahde: 'Joe Wallace, Commons (CC BY-SA 2.0)',
        selite: 'Pystykuilu Derinkuyun maanalaisessa kaupungissa: alhaalla näkyy '
          + 'pieni ihmishahmo, joka kertoo syvyyden. Kuilut eivät ole kaivoja '
          + 'vaan ilmanvaihtoa — ilman niitä alimmissa kerroksissa ei olisi '
          + 'voinut oleskella.',
      },
      {
        tiedosto: 'Tokalı Kilise Göreme.jpg',
        vuosi: '2016',
        lahde: 'prilfish, Commons (CC BY 2.0)',
        selite: 'Tokalı Kilisen holvi Göremessä: koko katto ja seinien yläosat on '
          + 'maalattu täyteen kertomuskuvia sinisellä pohjalla. Tila ei ole '
          + 'muurattu vaan kaiverrettu umpikallioon, joten holvikaari on '
          + 'pelkkää veistettyä kiveä.',
      },
    ],
    uusi: {
      tiedosto: 'Goreme Panorama From Southeast.JPG',
      vuosi: '2009',
      lahde: 'Bjørn Christian Tørrissen, Commons (CC BY-SA 3.0)',
      selite: 'Göremen kylä aamuvalossa: talot, kartiot ja kalliot ovat sekaisin, '
        + 'ja monessa kartiossa on ikkuna. Osa kylän taloista on yhä puoliksi '
        + 'kallion sisällä, eli sisähuoneet jatkuvat vuoreen niiden '
        + 'julkisivun takana.',
    },
  },
  kashgar: {
    tiedosto: 'Basaaritori 1906 (VKK269-142).tif',
    vuosi: '1906',
    lahde: 'C. G. E. Mannerheim / Museovirasto, Commons (CC BY 4.0)',
    selite: 'Kasgarin basaaritori vuonna 1906: meloneja maassa, väkeä joka '
      + 'puolella ja moskeijan portti taustalla. Kuvaaja oli suomalainen '
      + 'ratsuväenupseeri C. G. E. Mannerheim, joka kulki Aasian halki '
      + 'tieteellisen keräysmatkan varjolla ja teki samalla tiedustelutyötä.',
    lisat: [
      {
        tiedosto: 'Sonntagsmarkt Kashgar.jpg',
        vuosi: '2009',
        lahde: 'See58, Commons (CC BY-SA 3.0)',
        selite: 'Lampaita riviin sidottuina Kasgarin sunnuntaitorilla. Karjatori '
          + 'on oma alueensa kaupungin laidalla, ja kauppa syntyy vasta kun '
          + 'ostaja ja myyjä lyövät kättä yhteen.',
      },
      {
        tiedosto: '维族市场买干果的商户 余华峰 - panoramio.jpg',
        vuosi: '2009',
        lahde: 'Yu Huafeng, Commons (CC BY-SA 3.0)',
        selite: 'Kuivattujen hedelmien ja pähkinöiden myyntipöytä Kasgarin '
          + 'torilla talvella. Aprikoosit ja rusinat kuivataan Taklamakanin '
          + 'reunan keitailla, joissa kesä on lähes sateeton.',
      },
      {
        tiedosto: 'Katunäkymä 1906 (VKK269-144).tif',
        vuosi: '1906',
        lahde: 'C. G. E. Mannerheim / Museovirasto, Commons (CC BY 4.0)',
        selite: 'Katu Kasgarissa 1906. Talot ovat savitiilestä, ja Mannerheim '
          + 'kirjasi kuvaansa huomion siitä, että maasto laskee kadun '
          + 'toisella puolella niin että samaan taloon syntyy kaksi kerrosta.',
      },
    ],
    uusi: {
      tiedosto: 'Id Kah Mosque Kashgar.jpg',
      vuosi: '2017',
      lahde: 'Radosław Botev, Commons (CC BY 3.0)',
      selite: 'Id Kahin moskeija Kasgarin keskusaukiolla nykyään. Se on Kiinan '
        + 'suurin moskeija, ja aukio sen edessä on yhä sama tori, jolla '
        + 'melonikauppiaat seisoivat sata vuotta sitten.',
    },
  },
  kuwait: {
    tiedosto: 'The Persian problem; an examination of the rival positions of Russia and Great Britain in Persia, with some account of the Persian gulf and the Bagdad railway (1903) (14763432082).jpg',
    vuosi: '1903',
    lahde: 'Internet Archive Book Images, Commons (PD)',
    selite: 'Kuwaitilaisia miehiä ja poika kuvattuna vuonna 1903 ilmestyneen '
      + 'matkakirjan Kuwait-lukuun. Kuva on otettu aikana, jolloin kaupunki '
      + 'eli helmenkalastuksesta ja laivanrakennuksesta; öljyä löydettiin '
      + 'vasta 35 vuotta myöhemmin.',
    lisat: [
      {
        tiedosto: 'Kuwait tower at dusk.jpg',
        vuosi: '2023',
        lahde: 'Samarstha45, Commons (CC BY-SA 4.0)',
        selite: 'Kuwait Towers illansuussa. Suurimman tornin alempi pallo on '
          + 'vesisäiliö, ja koko kolmikko rakennettiin 1970-luvulla osaksi '
          + 'kaupungin vesijohtoverkkoa eikä näköalapaikaksi.',
      },
      {
        tiedosto: 'Water towerz kuwait (2).jpg',
        vuosi: '2011',
        lahde: 'Irvin Calicut, Commons (CC BY-SA 3.0)',
        selite: 'Kuwaitin sienimäisiä vesitorneja rivissä. Niitä rakennettiin '
          + 'kolmisenkymmentä eri puolille kaupunkia, ja niissä seisova vesi '
          + 'on tehty merivedestä suolanpoistolaitoksissa.',
      },
      {
        tiedosto: 'MarinetimeMKuwaitAlshami.jpg',
        vuosi: '2010',
        lahde: 'Kuwaitsoccer, Commons (CC BY-SA 3.0)',
        selite: 'Puinen dhow Kuwait Cityn merenkulkumuseon edustalla. Tällaisista '
          + 'aluksista ei tehty piirustuksia: mestari kantoi mitat '
          + 'muistissaan ja ohjasi työn sanallisesti, joten kaksi samanlaista '
          + 'laivaa oli harvinaisuus.',
      },
    ],
    uusi: {
      tiedosto: 'Kuwait City skyline (39710595225).jpg',
      vuosi: '2018',
      lahde: 'Francisco Anzola, Commons (CC BY 2.0)',
      selite: 'Kuwait Cityn silhuetti mereltä nähtynä. Kaupunki on yhä samassa '
        + 'lahden pohjukassa kuin satamana, mutta lähes kaikki sen juomavesi '
        + 'tehdään nykyään merivedestä.',
    },
  },
  lhasa: {
    tiedosto: 'The National Geographic Magazine Vol 16 1905 - The Palace of the Dalai-Lama at Lhasa.jpg',
    vuosi: '1901',
    lahde: 'G. Tsybikov / O. Norzunov, National Geographic 1905 (PD)',
    selite: 'Potalan palatsi kalliollaan noin 1901, ensimmäisiä Lhasasta koskaan '
      + 'otettuja valokuvia. Kuvaajat olivat burjaatteja, jotka pääsivät '
      + 'kaupunkiin pyhiinvaeltajina aikana, jolloin ulkopuolisia ei '
      + 'päästetty sisään, ja kamera kulki matkassa piilotettuna.',
    lisat: [
      {
        tiedosto: 'The National Geographic Magazine Vol 16 1905 - On the Road which Circles Lhasa.jpg',
        vuosi: '1901',
        lahde: 'G. Tsybikov / O. Norzunov, National Geographic 1905 (PD)',
        selite: 'Naisia Lhasaa kiertävällä pyhiinvaellustiellä 1900-luvun alussa. '
          + 'Kierros on noin kolmetoista kilometriä, ja maahan heittäytyen '
          + 'kulkevalta se vie kaksi päivää.',
      },
      {
        tiedosto: 'Barkhor Street, Lhasa.jpg',
        vuosi: '2006',
        lahde: 'Dennis Jarvis, Commons (CC BY-SA 2.0)',
        selite: 'Barkhorin aukio Jokhangin temppelin ympärillä, taustalla Potala. '
          + 'Kiertosuunta on aina myötäpäivään, joten väkijoukko liikkuu '
          + 'yhtenä hitaana renkaana eikä kukaan tule vastaan.',
      },
      {
        tiedosto: 'Pilgrims prostrating at Jokhang.JPG',
        vuosi: '1993',
        lahde: 'John Hill, Commons (CC BY 2.5)',
        selite: 'Pyhiinvaeltaja heittäytyy pitkälleen Jokhangin temppelin edessä. '
          + 'Kädet suojataan puulevyillä ja alla on matto, koska sama liike '
          + 'toistetaan satoja kertoja peräkkäin.',
      },
    ],
    uusi: {
      tiedosto: 'Lhassa Potala.jpg',
      vuosi: '2012',
      lahde: 'Royonx, Commons (CC0)',
      selite: 'Potala nykyään, valkoinen ja punainen palatsi Punaisen vuoren '
        + 'päällä. Katolla ollaan lähes 3 700 metrissä, korkeammalla kuin '
        + 'useimpien Euroopan vuorten huipulla.',
    },
  },
  luxor: {
    tiedosto: 'Town Of Luxor LACMA M.2008.40.197.jpg',
    vuosi: 'noin 1870',
    lahde: 'Antonio Beato / LACMA, Commons (PD)',
    selite: 'Luxorin kaupunki Niilin toiselta rannalta nähtynä noin vuonna 1870. '
      + 'Temppelin pyloni ja pylväsrivi nousevat suoraan asuintalojen '
      + 'keskeltä, ja rannassa on purjeveneitä. Antonio Beato piti Luxorissa '
      + 'valokuvaamoa ja myi tällaisia vedoksia jokea ylös matkanneille.',
    lisat: [
      {
        tiedosto: '02021 05756 Great Hypostyle Hall of Karnak.jpg',
        vuosi: '2010',
        lahde: 'Silar, Commons (CC BY-SA 4.0)',
        selite: 'Karnakin suuren pylvässalin pylväitä. Sali oli aikanaan katettu, '
          + 'ja keskikäytävän korkeammat pylväät jättivät väliinsä '
          + 'kiviristikkoikkunoiden rivin, josta ainoa valo pääsi sisään.',
      },
      {
        tiedosto: 'Valley of the Tombs of the Kings, Thebes MET DP116339.jpg',
        vuosi: '1857',
        lahde: 'Francis Frith / Metropolitan Museum of Art, Commons (CC0)',
        selite: 'Kuninkaiden laakso Niilin länsipuolella, valokuvattuna '
          + '1850-luvulla. Maisema näyttää tyhjältä, koska haudat on hakattu '
          + 'kallion sisään eikä niistä näy ulospäin kuin oviaukko.',
      },
      {
        tiedosto: 'Templo de Luxor, Luxor, Egipto, 2022-04-01, DD 29.jpg',
        vuosi: '2022',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Luxorin temppelin pihaa aamuvalossa: kolossipatsaita ja '
          + 'pylväsrivejä. Temppeli oli vuosisatoja hiekan ja asuintalojen '
          + 'alla, ja se kaivettiin esiin vasta 1800-luvun lopulta alkaen.',
      },
    ],
    uusi: {
      tiedosto: 'Luxor Temple Square R01.jpg',
      vuosi: '2013',
      lahde: 'Marc Ryckaert, Commons (CC BY 3.0)',
      selite: 'Luxorin temppeliaukio nykyään. Pylonin edessä kulkee katu ja '
        + 'temppelin päälle on rakennettu Abu Haggagin moskeija, joka jäi '
        + 'paikalleen kun temppeli kaivettiin ympäriltä pois - siksi sen '
        + 'vanha ovi on nyt korkealla ilmassa.',
    },
  },
  magadan: {
    tiedosto: 'Kultbasa 016.jpg',
    vuosi: '1931',
    lahde: 'Tuntematon kuvaaja, Commons (PD)',
    selite: 'Nagajevanlahden kulttuuriasema vuonna 1931: muutama hirsitalo ja '
      + 'teltta kannoiksi raivatulla rinteellä, takana lahti ja paljaat '
      + 'kukkulat. Näistä mökeistä kasvoi Magadan, ja samaan lahteen tuotiin '
      + 'pian laivalastittain väkeä Kolyman kultakentille ja leireille.',
    lisat: [
      {
        tiedosto: 'Memorial magadan - panoramio.jpg',
        vuosi: '2006',
        lahde: 'granicub, Commons (CC BY-SA 3.0)',
        selite: 'Surun naamio Magadanin yläpuolisella kukkulalla. Suuret kasvot '
          + 'on valettu betonista, ja poskella valuvat kyyneleet ovat pieniä '
          + 'kasvoja. Muistomerkki katsoo alas kaupunkiin ja lahdelle, jonne '
          + 'ihmiset aikoinaan tuotiin laivoilla.',
      },
      {
        tiedosto: 'Magadan-port.jpg',
        vuosi: '2014',
        lahde: 'Andrei Dementjev, Commons (CC BY-SA 4.0)',
        selite: 'Magadanin satama Nagajevanlahdella, laivasta puretaan hiiltä. '
          + 'Kaupunkiin ei johda rautatietä, joten lähes kaikki tavara saapuu '
          + 'joko laivalla tai Kolyman maantietä pitkin.',
      },
      {
        tiedosto: 'Freezing the waters of the Sea of Okhotsk. Magadan.jpg',
        vuosi: '2017',
        lahde: 'JukoFF, Commons (CC BY 4.0)',
        selite: 'Ohotanmeri jäätymässä Magadanin edustalla joulukuussa. Aallot '
          + 'hiovat ensimmäiset jäähiutaleet pyöreiksi lautasiksi ennen kuin '
          + 'ne juuttuvat toisiinsa kiinni ja meri menee umpeen.',
      },
    ],
    uusi: {
      tiedosto: 'Magadan seen from mountain.jpg',
      vuosi: '2008',
      lahde: 'Johannes Rohr, Commons (CC BY-SA 3.0)',
      selite: 'Magadan Staritskin niemeltä nähtynä, takana lumiset kukkulat. '
        + 'Kaupungissa asuu noin 90 000 ihmistä, ja siitä lähtee sisämaahan '
        + 'Kolyman maantie — kaupungin ainoa maayhteys muualle.',
    },
  },
  masqat: {
    tiedosto: 'The Persian problem; an examination of the rival positions of Russia and Great Britain in Persia, with some account of the Persian gulf and the Bagdad railway (1903) (14577292147).jpg',
    vuosi: '1903',
    lahde: 'Internet Archive Book Images, Commons (PD)',
    selite: 'Maskat vuonna 1903 ilmestyneen matkakirjan kuvalaatassa. Kalliolla '
      + 'seisoo portugalilaisten linnake ja sen takana kaupunki mahtuu juuri '
      + 'ja juuri vuorten ja veden väliin. Vuoret nousevat suoraan talojen '
      + 'takaa, joten kaupunkiin tultiin pitkään käytännössä vain mereltä.',
    lisat: [
      {
        tiedosto: 'Fuerte de Al Jalali, Mascate, Omán, 2024-08-14, DD 34.jpg',
        vuosi: '2024',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Al Jalalin linnake kalliolla Maskatin sataman suulla. '
          + 'Portugalilaiset rakensivat sen 1580-luvulla, ja vastarannalla on '
          + 'sen pari Al Mirani; kaksikko vartioi samaa kapeaa väylää '
          + 'edelleen.',
      },
      {
        tiedosto: 'Dhows im Hafen von Muttrah - panoramio.jpg',
        vuosi: '2011',
        lahde: 'Edgar El, Commons (CC BY 3.0)',
        selite: 'Dhow-veneitä Mutrahin satamassa Maskatin naapurissa. Omanin '
          + 'vanhimmat alukset koottiin ilman ainuttakaan naulaa: lankut '
          + 'ommeltiin yhteen kookoskuidusta kierretyllä köydellä, joka '
          + 'turposi vedessä tiiviiksi.',
      },
      {
        tiedosto: 'Houses in central Muscat (8726444336).jpg',
        vuosi: '2013',
        lahde: 'Francisco Anzola, Commons (CC BY 2.0)',
        selite: 'Valkoisia taloja vanhassa Maskatissa kallion juurella, takana '
          + 'vartiotorni harjanteella. Omanissa rakentamista ohjataan niin, '
          + 'että talot pysyvät matalina ja vaaleina, ja siksi väriskaala on '
          + 'yhä kolme.',
      },
    ],
    uusi: {
      tiedosto: 'Old Muscat City View, Muscat, Oman.jpg',
      vuosi: '2024',
      lahde: 'Domenico Convertini, Commons (CC BY-SA 2.0)',
      selite: 'Vanha Maskat nykyään samojen vuorten välissä kuin sata vuotta '
        + 'sitten. Uusi kaupunki on jouduttu kasvattamaan kymmenien '
        + 'kilometrien nauhaksi rannikkoa pitkin, koska vuoret eivät anna '
        + 'tilaa muualla.',
    },
  },
  medina: {
    tiedosto: 'Khalili Collection Hajj and Arts of Pilgrimage Arc.pp-0254.11.jpg',
    vuosi: '1880-luku',
    lahde: 'Muhammad Sadiq Bey / Khalili Collections, Commons (CC BY-SA 4.0)',
    selite: 'Profeetan moskeijan pihaa Medinassa 1880-luvulla. Kaarikäytävän '
      + 'takaa kohoaa kupoli profeetta Muhammadin haudan päällä, ja pihalla '
      + 'istuu ihmisiä hajallaan. Kuvaaja Muhammad Sadiq Bey oli egyptiläinen '
      + 'upseeri ja ensimmäinen, joka valokuvasi Mekan ja Medinan.',
    lisat: [
      {
        tiedosto: 'Mezquita de Quba, Medina, Arabia Saudita, 2025-05-22, DD 16-18 HDR.jpg',
        vuosi: '2025',
        lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
        selite: 'Quban moskeija Medinan laidalla. Paikalle perustettiin moskeija '
          + 'heti sen jälkeen kun Muhammad saapui Mekasta vuonna 622, mutta '
          + 'nykyinen rakennus on rakennettu uudelleen monta kertaa '
          + 'vuosisatojen aikana.',
      },
      {
        tiedosto: 'Vegetation Cover in Madinah Region, Western Saudi Arabia (2025).jpg',
        vuosi: '2025',
        lahde: 'Saudi Press Agency, Commons (CC BY-SA 4.0)',
        selite: 'Taatelipalmutarha Medinan seudulla. Palmurivien välissä kulkee '
          + 'betoninen kastelukanava, sillä sadetta tulee niin vähän, että '
          + 'jokainen puu saa vetensä johdettuna.',
      },
      {
        tiedosto: 'Masjid e Nabawi Courtyard Umbrellas.jpg',
        vuosi: '2015',
        lahde: 'King Eliot, Commons (CC BY-SA 4.0)',
        selite: 'Profeetan moskeijan pihan varjostimet auki. Jokainen niistä '
          + 'taittuu kokoon kuin sateenvarjo: ne avataan päiväksi varjoksi ja '
          + 'suljetaan illaksi.',
      },
    ],
    uusi: {
      tiedosto: 'Mezquita del Profeta, Medina, Arabia Saudita, 2025-05-22, DD 02.jpg',
      vuosi: '2025',
      lahde: 'Diego Delso, Commons (CC BY-SA 4.0)',
      selite: 'Profeetan moskeija nykyään. Pihaa on laajennettu niin, että sinne '
        + 'mahtuu kerralla satojatuhansia ihmisiä, ja vanha kupoli on jäänyt '
        + 'uusien minareettien keskelle.',
    },
  },
  mekka: {
    tiedosto: 'Khalili Collection Hajj and Arts of Pilgrimage arc.pp 0211.04.jpg',
    vuosi: '1880',
    lahde: 'Muhammad Sadiq Bey / Khalili Collections, Commons (PD)',
    selite: 'Kaaba Mekan suuren moskeijan keskellä vuonna 1880. Taustalla talot '
      + 'kiipeävät rinnettä ylös, koska kaupunki on rakennettu kapean laakson '
      + 'pohjalle. Kuvaaja merkitsi vedokseensa vuodeksi 1297 - se on sama '
      + 'vuosi islamilaisen ajanlaskun mukaan.',
    lisat: [
      {
        tiedosto: 'Tent city, Mecca 1910.tif',
        vuosi: '1910',
        lahde: 'American Colony Photo Dept. / Library of Congress (PD)',
        selite: 'Pyhiinvaeltajien telttakaupunki Mekan laidalla noin vuonna 1910. '
          + 'Teltat pystytetään vain muutamaksi päiväksi vuodessa, ja niiden '
          + 'takaa näkyy moskeijan minareetteja.',
      },
      {
        tiedosto: 'The Kaaba during Hajj.jpg',
        vuosi: '2018',
        lahde: 'Adli Wahid, Commons (CC BY-SA 4.0)',
        selite: 'Pyhiinvaeltajia kiertämässä Kaabaa. Kierros tehdään seitsemän '
          + 'kertaa ja kaikki kulkevat samaan suuntaan, joten väkijoukko '
          + 'liikkuu kuin hidas pyörre.',
      },
      {
        tiedosto: 'Mecca at night.jpg',
        vuosi: '2013',
        lahde: 'Abbad Diraneyya, Commons (CC BY-SA 3.0)',
        selite: 'Mekka yöllä vuorelta katsottuna. Valot täyttävät laakson pohjan '
          + 'ja loppuvat jyrkästi siihen mistä rinne alkaa, koska kaupunki on '
          + 'voinut levitä vain laaksoja pitkin.',
      },
    ],
    uusi: {
      tiedosto: 'Makkah 550m.jpg',
      vuosi: '2011',
      lahde: 'Wurzelgnohm, Commons (CC0)',
      selite: 'Suuri moskeija ja sitä ympäröivä kaupunki 550 metrin korkeudesta '
        + 'nähtynä. Kaaba on pieni tumma piste keskellä pihaa, ja koko muu '
        + 'rakennus on kasvanut sen ympärille vähitellen.',
    },
  },
  mosul: {
    tiedosto: 'Crowded marketplace (Mosul, 1932).jpg',
    vuosi: '1932',
    lahde: 'G. Eric ja Edith Matson / Library of Congress (PD)',
    selite: 'Mosulin torikuja vuonna 1932. Kojujen yllä on kangaskatos, joka '
      + 'pidettiin kesällä paikallaan varjon takia. Sama vanha kaupunki '
      + 'tuhoutui pahoin 2010-luvulla, ja sitä rakennetaan nyt uudelleen.',
    lisat: [
      {
        tiedosto: 'Nergal gate in Nineveh.JPG',
        vuosi: '2008',
        lahde: 'JoAnn S. Makinano, U.S. Air Force (PD)',
        selite: 'Nergalin portti Niniven muurissa. Portin vartijana on lamassu, '
          + 'siivekäs härkä ihmisen kasvoin; niitä veistettiin porttien '
          + 'pieliin, koska niiden uskottiin estävän pahan pääsyn kaupunkiin.',
      },
      {
        tiedosto: 'Nineveh - Mashki Gate.jpg',
        vuosi: '2014',
        lahde: 'Omar Siddeeq Yousif, Commons (CC BY-SA 4.0)',
        selite: 'Mashkin portti Niniven muurilla Mosulin itäpuolella. Muuria oli '
          + 'kaikkiaan noin kaksitoista kilometriä, ja kaupunki katosi niin '
          + 'täydellisesti vuoden 612 eaa. jälkeen, että sitä pidettiin '
          + 'pitkään pelkkänä tarinana.',
      },
      {
        tiedosto: 'Traditional Copper Shops-Mosul 06.jpg',
        vuosi: '2025',
        lahde: 'Abdulsalam Al Dabbagh, Commons (CC BY-SA 4.0)',
        selite: 'Kuparisepän puoti Mosulin vanhassa kaupungissa. Astiat takoo yhä '
          + 'käsin sama ammattikunta, joka on työskennellyt samoilla kujilla '
          + 'satoja vuosia.',
      },
      {
        tiedosto: 'Habda Minaret Mosul Dec 2025.jpg',
        vuosi: '2025',
        lahde: 'Commons-käyttäjä الدبوني, Commons (CC BY-SA 4.0)',
        selite: 'Al-Hadban minareetti Mosulin vanhassa kaupungissa joulukuussa '
          + '2025. Torni tuhoutui vuonna 2017, ja se rakennettiin uudelleen '
          + 'raunioista talteen otetuista alkuperäisistä tiilistä.',
      },
    ],
    uusi: {
      tiedosto: '1I0A9237.jpg',
      vuosi: '2019',
      lahde: 'Goldmansam, Commons (CC BY-SA 4.0)',
      selite: 'Tigrisin länsiranta Mosulissa ja taustalla kaupungin vanha silta. '
        + 'Joen toisella puolella, kuvan yläreunan takana, ovat Niniven '
        + 'raunioiden kummut.',
    },
  },
  nikosia: {
    tiedosto: 'A fortified arched gate, Nicosia, Cyprus Wellcome L0056833.jpg',
    vuosi: '1878',
    lahde: 'John Thomson / Wellcome Collection, Commons (CC BY 4.0)',
    selite: 'Holvikaarinen portti Nikosian muurissa; edessä seisoo aaseja '
      + 'kuormineen ja portin vieressä tynnyreitä. Kuva on otettu samana '
      + 'vuonna, jona britit ottivat saaren hallintaansa, ja portin yllä '
      + 'oleva kyltti on uuden hallinnon lisäämä.',
    lisat: [
      {
        tiedosto: 'Section of Venetian Wall - Old City - Nicosia - Cyprus (27855472834).jpg',
        vuosi: '2016',
        lahde: 'Adam Jones, Commons (CC BY-SA 2.0)',
        selite: 'Pala Nikosian muuria vanhankaupungin reunalla, takana nykyisiä '
          + 'kerrostaloja. Muuri on matala ja paksu tarkoituksella: se '
          + 'rakennettiin 1500-luvulla kestämään tykinkuulia, ei kiipeäviä '
          + 'hyökkääjiä.',
      },
      {
        tiedosto: 'A City Divided.jpg',
        vuosi: '2007',
        lahde: 'Maj Adev, Commons (CC BY-SA 2.0)',
        selite: 'Ledran kadun pää: peltiaita katkaisee kadun, vieressä on '
          + 'vartiokoppi ja seinässä kyltti, jossa lukee neljällä kielellä '
          + '"viimeinen jaettu pääkaupunki". Aidan takana katu jatkuu aivan '
          + 'samanlaisena, mutta kyltit vaihtuvat kreikasta turkkiin.',
      },
      {
        tiedosto: 'Famagusta Gate, one of the three entrances into old Nicosia through the Venetian Walls.jpg',
        vuosi: '2021',
        lahde: 'Iakovos Hatzistavrou / Euroopan komissio, Commons (CC BY 4.0)',
        selite: 'Famagustan portti, yksi kolmesta venetsialaisten muurien '
          + 'portista vanhaankaupunkiin. Portti valmistui 1567 ja sen takana '
          + 'on pitkä holvattu käytävä, jonka läpi kärryt aikanaan ajettiin '
          + 'muurin toiselle puolelle.',
      },
    ],
    uusi: {
      tiedosto: 'Along ledras street.JPG',
      vuosi: '2010',
      lahde: 'Andreas2009, Commons (CC BY-SA 3.0)',
      selite: 'Ledran katu muurien sisäpuolella: kävelykatu, liikkeitä ja ihmisiä '
        + 'ostoksilla. Tämä sama katu päättyy muutaman korttelin päässä '
        + 'tarkastuspisteeseen, jonka läpi pääsee kaupungin toiselle puolelle '
        + 'vasta vuodesta 2008.',
    },
  },
  novosibirsk: {
    tiedosto: 'P475b Steamboats at Novo Nikolayevsk, taken from the bridge over the Obi.jpg',
    vuosi: '1913',
    lahde: 'Fridtjof Nansen, Norjan kansalliskirjasto / Commons (PD)',
    selite: 'Höyrylaivoja Obilla Novonikolajevskissa lokakuussa 1913, kuvattuna '
      + 'sillalta. Kuvan otti Fridtjof Nansen matkallaan Siperian halki. '
      + 'Kaupunki oli tuolloin vasta kahdenkymmenen vuoden ikäinen.',
    lisat: [
      {
        tiedosto: 'Railway bridge over the Ob 02.jpg',
        vuosi: '1890-luku',
        lahde: 'Tuntematon kuvaaja, Commons (PD)',
        selite: 'Ensimmäinen rautatiesilta Obin yli rakenteilla 1890-luvulla. '
          + 'Työmaan viereen nousi rakentajien asuinalue, ja juuri siitä '
          + 'alueesta kasvoi kaupunki — silta oli ensin ja kaupunki vasta sen '
          + 'jälkeen.',
      },
      {
        tiedosto: 'Novosibirsk Ob.jpg',
        vuosi: '2003',
        lahde: 'Aladux, Commons (CC BY-SA 3.0)',
        selite: 'Rautatiesilta Obin yli Novosibirskissä. Joki on tässä kohtaa yli '
          + 'puoli kilometriä leveä, ja juuri sen ylittäminen oli se yksi '
          + 'ainoa syy, jonka takia koko kaupunki on olemassa.',
      },
    ],
    uusi: {
      tiedosto: 'Ob River, Novosibirsk 2.jpg',
      vuosi: '2018',
      lahde: 'K. Artjom, Commons (CC BY-SA 4.0)',
      selite: 'Obin ranta Novosibirskissä, takana keskustan talot. Kaupunki on '
        + 'vasta reilun sadan vuoden ikäinen, mutta siinä asuu jo yli '
        + 'puolitoista miljoonaa ihmistä.',
    },
  },
  persepolis: {
    tiedosto: 'Groep mannen poserend bij de Poort van alle Naties (Poort van Xerxes) in Persepolis Persepolis (titel op object), RP-F-F01048-AI.jpg',
    vuosi: 'n. 1880-1895',
    lahde: 'Antoin Sevruguin (attribuoitu) / Rijksmuseum, Commons (CC0)',
    selite: 'Kaikkien kansojen portti Persepoliissa: pystyssä olevien pylväiden '
      + 'ja siivekkään härkähahmon juurella seisoo ryhmä miehiä, ja vasta '
      + 'heistä näkee kuinka korkealle raunio nousee. Albumiinivedos on '
      + 'hollantilaisen H. Dunlopin matka-albumista, jossa Persian kuvien '
      + 'seassa on otoksia Skotlannista, Venäjältä ja Kiinasta - Persepolis '
      + 'oli yksi pysähdys pitkällä maailmanmatkalla.',
    lisat: [
      {
        tiedosto: 'IranPersepolisApadana2.jpg',
        vuosi: '1991',
        lahde: 'Ziegler175, Commons (CC BY-SA 4.0)',
        selite: 'Apadanan portaat. Askelmat ovat matalia ja leveitä, ja portaan '
          + 'kyljessä nousee kivinen ihmisjono. Loivuus oli '
          + 'tarkoituksellinen: pitkiin juhla-asuihin puetut vieraat '
          + 'pystyivät nousemaan hitaasti ja arvokkaasti.',
      },
      {
        tiedosto: 'Tribute Bearers on the Apadana Staircase 15 (Best Viewed Size "Large") (4689038280).jpg',
        vuosi: '2010',
        lahde: 'A. Davey, Commons (CC BY 2.0)',
        selite: 'Lähettiläitä Apadanan portaiden reliefissä. Jokainen ryhmä on '
          + 'puettu oman kansansa tapaan ja kantaa omaa lahjaansa, ja ryhmien '
          + 'väliin on hakattu sypressi erottamaan ne toisistaan — siitä '
          + 'ryhmät on helppo laskea.',
      },
    ],
    uusi: {
      tiedosto: 'Persepolis - Apadana 01.jpg',
      vuosi: '2016',
      lahde: 'Bernard Gagnon, Commons (CC BY-SA 4.0)',
      selite: 'Apadanan pylväitä nykyään. Katto oli setripuuta ja se paloi vuonna '
        + '330 eaa., joten pylväät ovat siitä lähtien kannatelleet vain '
        + 'taivasta.',
    },
  },
  petra: {
    tiedosto: 'Petra. Front view of Temple of el-Khazneh LOC matpc.06878.jpg',
    vuosi: '1900-luvun alku',
    lahde: 'Matson Collection / Library of Congress (PD)',
    selite: 'Khaznen julkisivu Petrassa, edessä kivikkoa ja pensaita; oviaukossa '
      + 'seisoo yksi ihminen, josta näkee mittasuhteen. Julkisivua ei ole '
      + 'muurattu vaan hakattu ylhäältä alaspäin umpikallioon, joten '
      + 'telineitä ei tarvittu.',
    lisat: [
      {
        tiedosto: 'Al Siq, Petra.jpg',
        vuosi: '2009',
        lahde: 'Indyblue, Commons (CC BY-SA 2.0)',
        selite: 'Siqin rotko Petrassa: seinät kaartuvat lähes yhteen ja polku '
          + 'mutkittelee niiden välissä. Rotko ei ole veden uurtama vaan '
          + 'kallion halkeama, jonka vesi ja tuuli ovat vasta jälkeenpäin '
          + 'pyöristäneet.',
      },
      {
        tiedosto: 'Water Channel the Siq Petra Jordan1343.jpg',
        vuosi: '2014',
        lahde: 'Michael Gunther, Commons (CC BY-SA 3.0)',
        selite: 'Kallioon hakattu vesikanava kulkee Siqin seinustaa pitkin koko '
          + 'rotkon läpi. Kanavia oli molemmilla puolilla, ja ne toivat '
          + 'lähteen veden kaupunkiin samalla kun itse puron uoma ohjattiin '
          + 'muualle, jotta rotko ei tulvisi.',
      },
      {
        tiedosto: 'Petra. Horse rider entering Siq LOC matpc.23158.jpg',
        vuosi: '1950-1970-luku',
        lahde: 'Matson Collection / Library of Congress (PD)',
        selite: 'Ratsastaja saapuu hevosella Siqin suulle korkeiden kallioseinien '
          + 'väliin. Hevonen oli pitkään ainoa tapa päästä Petraan, sillä '
          + 'rotko on kapeimmillaan vain muutaman metrin levyinen eikä '
          + 'ajoneuvoja mahdu sisään.',
      },
    ],
    uusi: {
      tiedosto: 'Al Khazneh 2025.jpg',
      vuosi: '2025',
      lahde: 'ほっきー, Commons (CC0)',
      selite: 'Khazne Petrassa nykyään: pylväät, kaarielementti ja veistokset '
        + 'erottuvat selvästi, ja edessä lepää kameli ohjaajineen. Kivi on '
        + 'hiekkakiveä, jonka rautapitoisuus antaa sille ruusunpunaisen värin '
        + 'ja joka vaihtaa sävyä auringon liikkeen mukana.',
    },
  },
  riad: {
    tiedosto: 'Qaṣr Murabbaʿ.jpg',
    vuosi: '1930-luku',
    lahde: 'Tuntematon kuvaaja, Commons (CC BY 4.0)',
    selite: 'Murabban linna Riadissa 1930-luvulla: savitiilinen muuri, '
      + 'hammastettu harja ja neljä kulmatornia keskellä aavikkoa. Kuva on '
      + 'otettu lounaasta, eli katsoja on kaupungista poispäin - linnan '
      + 'takana on se suunta, johon Riad myöhemmin kasvoi.',
    lisat: [
      {
        tiedosto: 'Thumairi Street in Riyadh, 1938.jpg',
        vuosi: '1930-luvun loppu',
        lahde: 'Bob Landry, Commons (PD)',
        selite: 'Thumairin katu Riadissa 1930-luvun lopulla. Talot on muurattu '
          + 'savitiilestä ja niiden yläreunassa kulkee kolmiohampainen '
          + 'koristerivi, joka on Nedždin ylängön rakennustavan tunnusmerkki.',
      },
      {
        tiedosto: 'Masmak Castle from Thumairi.jpg',
        vuosi: '2010',
        lahde: 'Dainomite, Commons (CC BY-SA 3.0)',
        selite: 'Masmakin linnoitus Riadin vanhassa keskustassa. Se rakennettiin '
          + '1800-luvun lopulla, ja nyt sen kulmalla on liikennettä, kauppoja '
          + 'ja palmuja.',
      },
      {
        tiedosto: 'Murabba Palace.jpg',
        vuosi: '2019',
        lahde: 'saudipics, Commons (CC BY-SA 4.0)',
        selite: 'Murabban linnan sisäpiha nykyään kunnostettuna ja valaistuna. '
          + 'Sama rakennus näkyy tämän kortin ensimmäisessä kuvassa keskellä '
          + 'tyhjää aavikkoa.',
      },
    ],
    uusi: {
      tiedosto: 'Riyadh Skyline showing the King Abdullah Financial District (KAFD) and the famous Kingdom Tower .jpg',
      vuosi: '2016',
      lahde: 'B. Alotaby, Commons (CC BY-SA 4.0)',
      selite: 'Riadin keskusta iltahämärässä: Kingdom Centre ja taustalla '
        + 'rahoituskaupunginosan tornit. Kaupunki jatkuu horisonttiin asti, '
        + 'vaikka lähellä ei ole jokea eikä merta - vesi tulee kaivoista ja '
        + 'putkea pitkin Persianlahdelta asti.',
    },
  },
  rubalkhali: {
    tiedosto: 'Sanaw well.jpg',
    vuosi: '1946',
    lahde: 'Wilfred Thesiger / Pitt Rivers Museum, Commons (CC BY-SA 4.0)',
    selite: 'Karavaani ohittamassa raunioitunutta linnaketta Sanawin kaivolla Rub '
      + 'al-Khalin eteläreunalla. Tasangolla ei näy muuta kuin kamelit ja '
      + 'muutama kulkija; kuvan otti Wilfred Thesiger, joka ylitti '
      + 'hiekkameren kamelien kanssa.',
    lisat: [
      {
        tiedosto: 'The massive sand dunes of Rub Al Khali.jpg',
        vuosi: '2021',
        lahde: 'Srk60, Commons (CC BY-SA 4.0)',
        selite: 'Rub al-Khalin dyynejä. Tämä on maailman laajin yhtenäinen '
          + 'hiekkameri, ja korkeimmat harjanteet kohoavat yli kahdensadan '
          + 'metrin päähän ympäröivästä tasangosta.',
      },
      {
        tiedosto: 'Rub al khali sunset Nov 2007.jpg',
        vuosi: '2007',
        lahde: 'Javierblas, Commons (CC BY-SA 3.0)',
        selite: 'Aurinko laskee dyynien taakse Rub al-Khalissa. Hiekan väri '
          + 'vaihtuu päivän mittaan vaaleasta punaiseen ja illalla '
          + 'violettiin, koska matalalta tuleva valo kulkee paksumman '
          + 'ilmakerroksen läpi.',
      },
      {
        tiedosto: 'Camel tracks in the Empty Quarter east of Najran, Saudi Arabia (1).jpg',
        vuosi: '2020',
        lahde: 'Richard Mortel, Commons (CC BY 2.0)',
        selite: 'Kamelin jälkiä hiekassa Najranin itäpuolella. Tuuli järjestää '
          + 'pinnan säännöllisiksi aalloiksi, ja samanlainen aaltokuvio '
          + 'jatkuu näkymän ulkopuolelle kilometrikaupalla.',
      },
    ],
    uusi: {
      tiedosto: 'Saudi Arabia Empty Quarter Nov. 2021 (100).jpg',
      vuosi: '2021',
      lahde: 'Richard Mortel, Commons (CC BY 2.0)',
      selite: 'Rub al-Khali nykyään: dyyni toisensa jälkeen ilman kylää, tietä '
        + 'tai puuta. Aavikko on suunnilleen Ranskan kokoinen eikä siellä ole '
        + 'pysyvää asutusta.',
    },
  },
  sahalin: {
    tiedosto: 'Sakhaline. 23, Alexandrov (Sakhaline) (ville basse - Podol) - (mission) P. Labbé ; (photogr.) P. Labbé ; (photogr. reprod. par) Molteni (pour la conférence donnée par) P. Labbé - btv1b53259017z.jpg',
    vuosi: '1899',
    lahde: 'Paul Labbé / Bibliothèque nationale de France (PD)',
    selite: 'Aleksandrovskin alakaupunki Sahalinin länsirannalla vuosisadan '
      + 'vaihteessa: matalia hirsitaloja joen suulla ja meri takana. Saari '
      + 'oli silloin Venäjän rangaistussiirtola, jonne tuomitut tuotiin '
      + 'laivalla.',
    lisat: [
      {
        tiedosto: 'Сахалин, Чертов мост, 2023-10-07 01.jpg',
        vuosi: '2023',
        lahde: 'Bok, Commons (CC BY-SA 4.0)',
        selite: 'Piru-sillaksi kutsuttu ratasilta Holmskin lähellä. Rata '
          + 'rakennettiin aikana, jolloin eteläinen Sahalin oli Japanin '
          + 'Karafutoa, ja juna kiertää mäen sisällä silmukkatunnelin ennen '
          + 'kuin nousee sillalle.',
      },
      {
        tiedosto: 'Yuzhno-Sakhalinsk Museum 1.JPG',
        vuosi: '2010',
        lahde: 'Vihljun, Commons (PD)',
        selite: 'Sahalinin aluemuseo Juzno-Sahalinskissa. Talo valmistui 1937 '
          + 'Japanin Karafuto-hallinnon museoksi ja toimii yhä museona; '
          + 'kaarevat katot ovat siltä ajalta, jolloin kaupunki oli nimeltään '
          + 'Toyohara.',
      },
      {
        tiedosto: 'Okhotskoye beach 1.jpg',
        vuosi: '2010',
        lahde: 'Vihljun, Commons (PD)',
        selite: 'Ohotanmeren hiekkaranta Sahalinin itäpuolella kesäkuussa. Vesi '
          + 'pysyy kylmänä keskikesälläkin, koska pohjoisesta tuleva '
          + 'merivirta viilentää rannikkoa koko kesän.',
      },
    ],
    uusi: {
      tiedosto: 'Маяк на мысе Жонкьер.jpg',
      vuosi: '2018',
      lahde: 'Maxim Truhin, Commons (CC BY-SA 4.0)',
      selite: 'Zonkjerin niemen majakka Aleksandrovsk-Sahalinskin laidalla '
        + 'nykyään. Se on Kaukoidän vanhimpia majakoita, ja niemen läpi menee '
        + 'kallioon louhittu tunneli, jonka pakkotyövangit hakkasivat '
        + '1880-luvulla.',
    },
  },
  salalah: {
    lisat: [
      {
        tiedosto: 'Ain hamran trees during khareef.jpg',
        vuosi: '2025',
        lahde: 'Aayan muhammed, Commons (CC BY-SA 4.0)',
        selite: 'Sumu valuu Ayn Hamranin rinteillä Salalahin pohjoispuolella '
          + 'kesken khareef-kauden. Sadetta ei tule juuri lainkaan pisaroina '
          + 'vaan sumuna, joka tiivistyy lehtiin ja tippuu maahan.',
      },
      {
        tiedosto: 'Boswellia sacra in Wadi Dowkah (Dhofar).JPG',
        vuosi: '2004',
        lahde: 'Mauro Raffaelli, Commons (CC BY-SA 3.0)',
        selite: 'Suitsukepuu Wadi Dawkahin puistossa Dhofarissa. Puu tulee '
          + 'toimeen paljaassa soravalleessa muutaman sentin vuosisateella, '
          + 'koska sen juuret ulottuvat kallion rakoihin.',
      },
      {
        tiedosto: 'Boswellia-tagli.jpg',
        vuosi: '2005',
        lahde: 'Mauro Raffaelli, Commons (CC BY-SA 3.0)',
        selite: 'Viilto suitsukepuun kuoressa. Puu tiivistää haavan omalla '
          + 'pihkallaan, ja juuri se kovettunut pisara kerätään talteen parin '
          + 'viikon kuluttua.',
      },
      {
        tiedosto: 'Oman, Salalah, Haffa Souq (Souq al-Hosn), Frankincense.jpg',
        vuosi: '2024',
        lahde: 'Thomas Liptak, Commons (CC BY-SA 4.0)',
        selite: 'Suitsukepihkaa säkeissä Salalahin Haffa-torilla. Hinta määräytyy '
          + 'hartsin värin mukaan: vaalein ja läpikuultavin laatu maksaa '
          + 'moninkertaisesti tummaan verrattuna.',
      },
    ],
    uusi: {
      tiedosto: 'OM-salalah-einfahrt.jpg',
      vuosi: '2016',
      lahde: 'Balou46, Commons (CC BY-SA 4.0)',
      selite: 'Salalah nykyään: nurmea, palmuja ja matalia taloja sataman '
        + 'kupeessa. Kaupungin ympärillä kasvaa banaania ja kookosta, mikä on '
        + 'Arabian niemimaalla harvinaista.',
    },
  },
  samarkand: {
    tiedosto: 'Gorskii 21756u.jpg',
    vuosi: '1900-luvun alku',
    lahde: 'Sergei Prokudin-Gorski / Library of Congress (PD)',
    selite: 'Tilla-Karin medresen kaakeloitu julkisivu Registanin aukiolta '
      + '1900-luvun alussa, kojut aivan seinustalla. Kuva on väreissä, koska '
      + 'Prokudin-Gorski otti jokaisesta näkymästä kolme mustavalkoista levyä '
      + 'eri värisuotimen läpi.',
    lisat: [
      {
        tiedosto: 'Gorskii 04440u.jpg',
        vuosi: '1900-luvun alku',
        lahde: 'Sergei Prokudin-Gorski / Library of Congress (PD)',
        selite: 'Sir-Dorin medresen kupoli ja minareetti läheltä. Sininen väri '
          + 'syntyy kaakelin lasitteeseen sekoitetusta kobolttioksidista, ja '
          + 'samaa tekniikkaa käytettiin Samarkandissa jo Timurin aikaan.',
      },
      {
        tiedosto: 'Tomb-of-Timur-east-side-Prokudin-Gorskii.jpeg',
        vuosi: '1900-luvun alku',
        lahde: 'Sergei Prokudin-Gorski / Library of Congress (PD)',
        selite: 'Gur-i Amirin uurteinen kupoli, Timurin hautamausoleumi '
          + 'Samarkandissa. Kuvan aikaan rakennus oli pahasti rapistunut, ja '
          + 'kupolin kaakelista puuttui suuria paloja.',
      },
      {
        tiedosto: 'Ulugh Beg Observatory inside.jpg',
        vuosi: '2016',
        lahde: 'Benjamin Goetzinger, Commons (CC BY-SA 4.0)',
        selite: 'Ulug Begin observatorion maanalainen marmorikaari. Kaarta pitkin '
          + 'liukui mittalaite, jolla luettiin tähtien korkeus; sen päällä '
          + 'oli kolmikerroksinen rakennus, joka hävisi kokonaan ja löytyi '
          + 'kaivauksissa vasta 1908.',
      },
    ],
    uusi: {
      tiedosto: 'Registan 01.jpg',
      vuosi: '2023',
      lahde: 'Bernard Gagnon, Commons (CC0)',
      selite: 'Registan nykyään: vasemmalla Ulug Begin medrese, keskellä '
        + 'Tilla-Kari ja oikealla Sir-Dor. Aukio oli alun perin kauppatori, '
        + 'ja koulut nousivat sen ympärille noin kahdensadan vuoden välein.',
    },
  },
  sana: {
    tiedosto: 'Jewish children in Sana\'a, Yemen, circa 1909.jpg',
    vuosi: 'n. 1909',
    lahde: 'Hermann Burchardt, Commons (PD)',
    selite: 'Lapsijoukko Sanaan juutalaiskorttelin hiekkakadulla, taustalla '
      + 'korkeita savitiilitaloja pienine ikkuna-aukkoineen. Kuvan otti '
      + 'saksalainen matkaaja Hermann Burchardt, joka kuoli samana vuonna '
      + '1909, joten tämä on hänen viimeisiä Jemenistä ottamiaan vedoksia.',
    lisat: [
      {
        tiedosto: 'Old Tower-Houses in Sana\'a (صنعاء القديمة) (2286028843).jpg',
        vuosi: '2008',
        lahde: 'Dan from Brussels, Commons (CC BY-SA 2.0)',
        selite: 'Vanhan Sanaan tornitaloja kadulta katsottuna. Talot rakennettiin '
          + 'korkeiksi siksi, että kaupunkimuurin sisällä oli vähän tilaa ja '
          + 'suvun oli kasvettava ylöspäin.',
      },
      {
        tiedosto: 'Façades of Old Sana\'a (2286017301).jpg',
        vuosi: '2008',
        lahde: 'Dan from Brussels, Commons (CC BY-SA 2.0)',
        selite: 'Julkisivuja vanhassa Sanaassa. Valkoinen pitsikuvio on kipsiä, '
          + 'joka vedetään tiilipinnan päälle, ja ikkunoiden yläpuolella '
          + 'olevat puoliympyrät ovat värillistä lasia.',
      },
      {
        tiedosto: 'House Details, Sanaa, Yemen (10737189323).jpg',
        vuosi: '2013',
        lahde: 'Rod Waddington, Commons (CC BY-SA 2.0)',
        selite: 'Tornitalon julkisivun yksityiskohtia: ikkunoita, kipsikoristelua '
          + 'ja puinen erkkeri. Alimmat kerrokset on muurattu kivestä ja '
          + 'ylemmät kevyemmästä poltetusta tiilestä, jotta rakennus kevenee '
          + 'ylöspäin.',
      },
    ],
    uusi: {
      tiedosto: 'Old Sanaa, Yemen (10732756906).jpg',
      vuosi: '2013',
      lahde: 'Rod Waddington, Commons (CC BY-SA 2.0)',
      selite: 'Vanhan Sanaan kattoja nykyään. Alue on Unescon '
        + 'maailmanperintökohde, mutta talot eivät ole museo vaan koteja, '
        + 'joissa asutaan yhä.',
    },
  },
  siinai: {
    tiedosto: 'Francis Frith (English - The Convent of Sinai - Google Art Project.jpg',
    vuosi: '1858',
    lahde: 'Francis Frith / J. Paul Getty Museum, Commons (PD)',
    selite: 'Pyhän Katariinan luostari muurien sisällä Siinain vuorten juurella, '
      + 'kuvattuna 1850-luvun lopulla. Rinteillä ei kasva mitään ja etualalla '
      + 'lepää kameli. Frith kuljetti mukanaan pimiövaunua, koska tuon ajan '
      + 'lasilevyt oli kehitettävä heti kuvaamisen jälkeen.',
    lisat: [
      {
        tiedosto: 'Sinaikloster von der Nordostecke aus. Rechts- Pilgerhaus, nach links anschliessend (mit Giebeldach) Bibliotek dann Minaret und moderner Glockenturm, dahinter alte Kirche des Kaisers LCCN2014648789.jpg',
        vuosi: '1910',
        lahde: 'Bernhard Moritz / Library of Congress (PD)',
        selite: 'Luostarin kattoja koillisnurkasta: kellotorni, sen vieressä '
          + 'minareetti ja niiden takana keisari Justinianuksen aikainen '
          + 'kirkko. Kuva painettiin vasta vuonna 1916 ilmestyneeseen '
          + 'teokseen, mutta se otettiin kuusi vuotta aikaisemmin.',
      },
      {
        tiedosto: 'Mount Sinai Trekking.jpg',
        vuosi: '2011',
        lahde: 'Ventus, Commons (CC BY-SA 3.0)',
        selite: 'Vaeltajia laskeutumassa Siinainvuorelta keskipäivän aikaan. '
          + 'Polun varrella on teehuoneita, ja suurin osa kulkijoista nousee '
          + 'ylös pimeässä ehtiäkseen huipulle ennen aurinkoa.',
      },
      {
        tiedosto: 'Sunrise from the summit of Mount Sinai or Gabal Musa.jpg',
        vuosi: '2016',
        lahde: 'Sara Nabih, Commons (CC BY-SA 4.0)',
        selite: 'Aurinko nousee Siinainvuoren huipulta katsottuna. '
          + 'Kallionreunalla seisova hahmo on yksi niistä, jotka lähtivät '
          + 'nousemaan yöllä juuri tätä hetkeä varten.',
      },
    ],
    uusi: {
      tiedosto: 'Saint Catherine\'s Monastery, Mount Sinai morning.jpg',
      vuosi: '2010',
      lahde: 'Abraham, Commons (CC BY-SA 4.0)',
      selite: 'Pyhän Katariinan luostari Siinain vuorten juurella aamuvalossa. '
        + 'Muurien sisällä on kirkko ja kellotorni, ja ympärillä kohoaa '
        + 'paljas kalliorinne.',
    },
  },
  tabriz: {
    tiedosto: 'Persia past and present; a book of travel and research, with more than two hundred illustrations and a map (1906) (14577156579).jpg',
    vuosi: '1906',
    lahde: 'Internet Archive Book Images, Commons (PD)',
    selite: 'Basaarin viereinen piha Tabrizissa vuonna 1906. Kamelit seisovat '
      + 'tavarapaalien keskellä odottamassa lastia, ja paalit ovat pääosin '
      + 'villaa ja mattoja. Tästä pihasta tavara siirtyi karavaanin selkään '
      + 'ja lähti länteen.',
    lisat: [
      {
        tiedosto: 'Carpet Bazaar of Tabriz.JPG',
        vuosi: '2008',
        lahde: 'Vathlu, Commons (CC BY-SA 3.0)',
        selite: 'Mattojen osasto Tabrizin katetussa basaarissa. Kauppa käydään '
          + 'lattialla: matot avataan ostajan eteen pinosta yksi kerrallaan, '
          + 'ja hinta neuvotellaan solmutiheyden mukaan.',
      },
      {
        tiedosto: 'Tabriz Grand Bazaar - Carpet Bazaar.jpg',
        vuosi: '2018',
        lahde: 'AshkanMirshekar, Commons (CC BY-SA 4.0)',
        selite: 'Tiiliholvinen käytävä Tabrizin basaarissa. Holvit ovat paitsi '
          + 'kattoja myös ilmastointia: keskellä olevat aukot vetävät kuuman '
          + 'ilman ylös, joten käytävissä on kesällä viileää.',
      },
      {
        tiedosto: 'Bazaar of Tabriz, carvaansray.jpg',
        vuosi: '2018',
        lahde: 'F4fluids, Commons (CC BY-SA 3.0)',
        selite: 'Karavaaniseraljin piha Tabrizin basaarissa. Tällaisen pihan '
          + 'ympärillä oli majapaikka kauppiaille ja talli eläimille, ja '
          + 'keskellä oleva allas oli sekä juomapaikka että palovesivarasto.',
      },
    ],
    uusi: {
      tiedosto: 'Landscape of Tabriz 01.jpg',
      vuosi: '2019',
      lahde: 'Mostafameraji, Commons (CC0)',
      selite: 'Tabriz nykyään vuorenrinteeltä katsottuna. Basaari on jossain tuon '
        + 'kattomeren keskellä, ja se on yhä yksi maailman laajimmista '
        + 'katetuista kauppapaikoista.',
    },
  },
  teheran: {
    tiedosto: 'Téhéran, le Meydan de l\'Ark.jpg',
    vuosi: '1850-luku',
    lahde: 'Luigi Pesce / Gallica, Ranskan kansalliskirjasto, Commons (PD)',
    selite: 'Arkin aukio Teheranissa: kaksikerroksinen kaarikäytävärivi ja sen '
      + 'edessä pitkä jono tykinlavetteja. Etualan aukiolla liikkuneet '
      + 'ihmiset ovat jättäneet vain haaleita haamuja, koska valotus kesti '
      + 'minuutteja. Vedos on 1850-luvulta eli runsas vuosikymmen '
      + 'valokuvauksen keksimisen jälkeen.',
    lisat: [
      {
        tiedosto: '981012-Damavand-South-IMG 9861-2.jpg',
        vuosi: '2020',
        lahde: 'Safa Daneshvar, Commons (CC BY-SA 4.0)',
        selite: 'Damavand etelän suunnasta. Huippu on 5 610 metriä ja Iranin '
          + 'korkein kohta. Vuori näyttää nukkuvalta, mutta huipun lähellä '
          + 'maasta nousee yhä rikinhajuista höyryä.',
      },
      {
        tiedosto: 'Bagh Ferdows Tehran.jpg',
        vuosi: '2018',
        lahde: 'Mehrraz, Commons (CC BY-SA 4.0)',
        selite: 'Bagh-e Ferdows Teheranin pohjoisosassa Tajrishissa. '
          + 'Puistokäytävän keskellä kulkee kapea vesiallasrivi ja vanhat '
          + 'platanit reunustavat sitä. Vesi johdetaan puutarhaan Alborzin '
          + 'rinteiltä, ja juuri siksi puutarha kertoo persialaisittain, että '
          + 'vettä riittää.',
      },
    ],
    uusi: {
      tiedosto: 'Tehran skyline- Alborz Mountains on background-20150401.jpg',
      vuosi: '2015',
      lahde: 'Mhsheikholeslami, Commons (CC BY-SA 4.0)',
      selite: 'Teheran Tabiat-sillalta katsottuna, taustalla Alborzin harjanne. '
        + 'Kaupungin pohjoisosa on satoja metrejä etelää korkeammalla, ja '
        + 'siksi siellä on useita asteita viileämpää samaan aikaan päivästä.',
    },
  },
  ulanbator: {
    tiedosto: 'Mongolei, nahe Ulaanbaatar Urga.jpg',
    vuosi: '1913',
    lahde: 'Stéphane Passet / Archives de la Planète, Commons (PD)',
    selite: 'Urga, nykyinen Ulaanbaatar, vuonna 1913 Valkoiselta kukkulalta '
      + 'nähtynä; kaksi lamaa istuu nurmella ja kaupunki leviää tasangolle '
      + 'heidän edessään. Kuva on autokromi, varhainen värivalokuva '
      + 'lasilevylle, jonka väriaineena oli värjätty perunatärkkelys.',
    lisat: [
      {
        tiedosto: 'Ger district of Ulaanbaatar.jpg',
        vuosi: '2025',
        lahde: 'Quintin Soloviev, Commons (CC BY 4.0)',
        selite: 'Gereistä ja pientaloista koostuva kaupunginosa Ulaanbaatarin '
          + 'pohjoisilla rinteillä. Näissä kortteleissa ei ole kaukolämpöä, '
          + 'joten talvella lämmitetään hiilellä ja kaupungin ilma muuttuu '
          + 'sameaksi.',
      },
      {
        tiedosto: 'Life in a Ger.jpg',
        vuosi: '2012',
        lahde: 'Al Jazeera English, Commons (CC BY-SA 2.0)',
        selite: 'Gerin sisus: uuni keskellä, savupiippu katon läpi ja maalatut '
          + 'kaapit seinustalla. Gerin ovi käännetään Mongoliassa aina '
          + 'etelään, joten katon aukosta lankeava valo kertoo asukkaille '
          + 'kellonajan.',
      },
    ],
    uusi: {
      tiedosto: 'Panorama Ulan Bator 13.JPG',
      vuosi: '2009',
      lahde: 'Brücke-Osteuropa, Commons (PD)',
      selite: 'Ulaanbaatarin keskusta nykyään: Suhbaatarin aukio, lasitorni ja '
        + 'takana kukkulat, joilla gerikaupunginosat alkavat. Kaupungissa '
        + 'asuu noin puolet koko Mongolian väestöstä.',
    },
  },
  vladivostok: {
    tiedosto: 'Владивосток в начале XX века.jpg',
    vuosi: '1900-luvun alku',
    lahde: 'Tuntematon kuvaaja, Commons (PD)',
    selite: 'Vladivostok kukkulalta katsottuna 1900-luvun alussa: matalia taloja '
      + 'rinteillä ja Kultaisen sarven lahti vasemmalla. Rataa rakennettiin '
      + 'tuolloin yhä, eikä Moskovasta päässyt vielä koko matkaa Venäjän '
      + 'puolta pitkin.',
    lisat: [
      {
        tiedosto: 'Vladivostok distencemonument.JPG',
        vuosi: '2007',
        lahde: 'Toen96, Commons (CC BY 3.0)',
        selite: 'Kilometripylväs 9 288 Vladivostokin aseman laiturilla. Luku '
          + 'kertoo matkan Moskovaan; ensimmäinen juna pääsi tänne kokonaan '
          + 'Venäjän puolelta vasta 1916, kun Amurin rata valmistui.',
      },
      {
        tiedosto: '008 Владивосток. Ж-д вокзал.jpg',
        vuosi: '2007',
        lahde: 'LxAndrew, Commons (CC BY-SA 4.0)',
        selite: 'Vladivostokin rautatieasema ja sen laiturit. Asema rakennettiin '
          + 'tarkoituksella samaan vanhavenäläiseen tyyliin kuin Moskovan '
          + 'Jaroslavlin asema, jotta radan molemmat päät näyttäisivät '
          + 'toisiltaan.',
      },
      {
        tiedosto: 'Ships at the Port of Vladivostok (October 2024)-0.jpg',
        vuosi: '2024',
        lahde: 'Vjatseslav Buharov, Commons (CC BY-SA 4.0)',
        selite: 'Vladivostokin satama-allas ja telakka: harmaita sotalaivoja ja '
          + 'nostureita vierekkäin. Laivaston takia kaupunki oli suljettu '
          + 'ulkomaalaisilta ja useimmilta neuvostokansalaisiltakin vuoteen '
          + '1991 asti.',
      },
    ],
    uusi: {
      tiedosto: '20220816 City view from the Eagle\'s nest hill.jpg',
      vuosi: '2022',
      lahde: 'travelling_eidolon, Commons (CC BY 2.0)',
      selite: 'Sama kaupunki Kotkanpesän kukkulalta nykyään. Talot kiipeävät '
        + 'rinteitä samalla tavalla kuin sata vuotta sitten, mutta puutalojen '
        + 'tilalla ovat kerrostalot ja kukkulan huipulla köysirata.',
    },
  },
};
