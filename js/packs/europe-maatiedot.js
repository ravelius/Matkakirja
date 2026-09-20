// Euroopan maiden tunnusluvut (sama rakenne kuin AFRICA_MAATIEDOT).
// Rakentuu maa kerrallaan.
//
// Lähteet ja menetelmä (Ranska, Espanja, Puola, Bosnia ja Islanti,
// haettu 1.8.2026):
//  - väkiluku SP.POP.TOTL (2024), pinta-ala AG.SRF.TOTL.K2 (2022) ja
//    keskitulo NY.GNP.PCAP.CD eli BKTL/asukas Atlas-menetelmällä (2024),
//    kaikki Maailmanpankin rajapinnasta;
//  - demokratia = V-Demin liberaalin demokratian indeksi (2025) Our
//    World in Datan aineistosta.
// Sijoitus on laskettu suvereenien valtioiden kesken (Maailmanpankin
// maalista ilman merentakaisia alueita), ja nimittäjä on pyöristetty
// samaan tapaan kuin Afrikan tiedoissa. Menetelmä tarkistettiin
// toistamalla Italian ja Marokon valmiit luvut: sijoitukset osuivat
// ±1 tarkkuudella.
//
// BEL, LUX, MLT, SVK ja SVN (20.9.2026, maalehden kartuschan aukot):
// samat lähteet ja sama menetelmä; väkiluku 2024 ja keskitulo
// Maailmanpankin tuoreimman havainnon mukaan (NLD-rivin luvut toistuivat
// tarkasti), pinta-ala 2022, V-Dem 2025. Sijojen nimittäjät kuten NLD:llä.
export const EUROPE_MAATIEDOT = {
  ITA: {
    vakiluku: '59 milj.',
    vakilukuSija: '25./195',
    pintaAla: '302 000 km²',
    pintaAlaSija: '71./195',
    demokratia: {
      arvo: '0,64',
      sija: '37./179',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~ITA',
      selitys: 'Italia on vakiintunut demokratia, mutta sen luku on '
        + 'laskenut viime vuosina selvästi: V-Demin mittareissa '
        + 'erityisesti sananvapauden ja median tila on heikentynyt, '
        + 'kun televisio ja lehdistö keskittyvät harvoihin käsiin.',
    },
    keskitulo: { arvo: '42 100 $/v', sija: '26./190' },
    // `osuus` on karkea arvio kielen puhujista maassa.
    tervehdykset: [
      { teksti: 'Buongiorno', kieli: 'italia', lippu: 'Flag of Italy.svg', osuus: '95 %' },
      { teksti: 'Bona die', kieli: 'sardi', lippu: 'Flag of Sardinia, Italy.svg', osuus: '2 %' },
      { teksti: 'Guten Tag', kieli: 'saksa (Etelä-Tiroli)', lippu: 'Flag of Germany.svg', osuus: '0,5 %' },
    ],
  },

  FRA: {
    vakiluku: '69 milj.',
    vakilukuSija: '23./195',
    // Maailmanpankin luku sisältää merentakaiset departementit; pelkkä
    // Manner-Ranska on noin 550 000 km².
    pintaAla: '610 000 km²',
    pintaAlaSija: '45./195',
    demokratia: {
      arvo: '0,80',
      sija: '9./179',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~FRA',
      selitys: 'Ranska on yksi maailman korkeimmalle arvioiduista '
        + 'demokratioista: vaalit ovat vapaat, tuomioistuimet '
        + 'riippumattomia ja lehdistö moniääninen. Presidentin valta on '
        + 'eurooppalaisittain poikkeuksellisen suuri, mutta parlamentti '
        + 'ja perustuslakineuvosto rajaavat sitä.',
    },
    keskitulo: { arvo: '45 000 $/v', sija: '23./190' },
    tervehdykset: [
      { teksti: 'Bonjour', kieli: 'ranska', lippu: 'Flag of France.svg', osuus: '100 %' },
      { teksti: 'Salam alaikum', kieli: 'arabia', lippu: 'Flag of Saudi Arabia.svg', osuus: '5 %' },
      { teksti: 'Bonjorn', kieli: 'oksitaani', lippu: 'Flag of Occitania.svg', osuus: '1 %' },
    ],
  },

  ESP: {
    vakiluku: '49 milj.',
    vakilukuSija: '32./195',
    pintaAla: '510 000 km²',
    pintaAlaSija: '53./195',
    demokratia: {
      arvo: '0,74',
      sija: '21./179',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~ESP',
      selitys: 'Espanja siirtyi diktatuurista demokratiaan vasta 1970-'
        + 'luvun lopulla, ja se näkyy yhä: alueiden itsehallinto ja '
        + 'keskusvallan suhde on kestoaihe, ja tuomarien nimityksistä '
        + 'kiistellään puolueiden kesken. Vaalit, lehdistö ja '
        + 'kansalaisoikeudet arvioidaan vahvoiksi.',
    },
    keskitulo: { arvo: '34 000 $/v', sija: '32./190' },
    tervehdykset: [
      { teksti: 'Buenos días', kieli: 'espanja', lippu: 'Flag of Spain.svg', osuus: '99 %' },
      { teksti: 'Bon dia', kieli: 'katalaani', lippu: 'Flag of Catalonia.svg', osuus: '17 %' },
      { teksti: 'Bo día', kieli: 'galicia', lippu: 'Flag of Galicia.svg', osuus: '5 %' },
      { teksti: 'Egun on', kieli: 'baski', lippu: 'Flag of the Basque Country.svg', osuus: '2 %' },
    ],
  },

  POL: {
    vakiluku: '37 milj.',
    vakilukuSija: '42./195',
    pintaAla: '310 000 km²',
    pintaAlaSija: '69./195',
    demokratia: {
      arvo: '0,65',
      sija: '36./179',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~POL',
      selitys: 'Puolan luku on käynyt kokonaisen kierroksen: se romahti '
        + '2015–2021, kun hallitus otti tuomioistuinten nimitykset ja '
        + 'valtion television ohjaukseensa, ja on sen jälkeen noussut '
        + 'takaisin vuoden 2023 vaalien myötä. Harva maa on laskenut ja '
        + 'noussut näin nopeasti.',
    },
    keskitulo: { arvo: '22 000 $/v', sija: '48./190' },
    tervehdykset: [
      { teksti: 'Dzień dobry', kieli: 'puola', lippu: 'Flag of Poland.svg', osuus: '98 %' },
      { teksti: 'Dzyń dobry', kieli: 'sleesia', lippu: 'Flag of Upper Silesia.svg', osuus: '1,5 %' },
      { teksti: 'Guten Tag', kieli: 'saksa (Opolen seutu)', lippu: 'Flag of Germany.svg', osuus: '0,3 %' },
    ],
  },

  BIH: {
    vakiluku: '3,2 milj.',
    vakilukuSija: '132./195',
    pintaAla: '51 000 km²',
    pintaAlaSija: '126./195',
    demokratia: {
      arvo: '0,34',
      sija: '96./179',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~BIH',
      selitys: 'Bosnian hallinto rakennettiin vuoden 1995 rauhansopimuksessa '
        + 'kolmen kansan — bosniakkien, serbien ja kroaattien — varaan: '
        + 'maalla on kolme presidenttiä ja kaksi puoliksi itsenäistä '
        + 'osaa. Järjestelmä lopetti sodan, mutta tekee päätöksenteosta '
        + 'hidasta, ja moni virka täytetään kansallisuuden perusteella.',
    },
    keskitulo: { arvo: '8 800 $/v', sija: '79./190' },
    // Bosnia, kroatia ja serbia ovat sama kieli kolmella nimellä, ja
    // tervehdys on niissä kaikissa sama — lippu kertoo, minkä nimen alla.
    tervehdykset: [
      { teksti: 'Dobar dan', kieli: 'bosnia', lippu: 'Flag of Bosnia and Herzegovina.svg', osuus: '50 %' },
      { teksti: 'Dobar dan', kieli: 'serbia', lippu: 'Flag of Serbia.svg', osuus: '31 %' },
      { teksti: 'Dobar dan', kieli: 'kroatia', lippu: 'Flag of Croatia.svg', osuus: '15 %' },
    ],
  },

  ISL: {
    vakiluku: '390 000',
    vakilukuSija: '171./195',
    pintaAla: '103 000 km²',
    pintaAlaSija: '107./195',
    demokratia: {
      arvo: '0,72',
      sija: '25./179',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~ISL',
      selitys: 'Islannin parlamentti Alþingi on maailman vanhin yhä '
        + 'toimiva — perustettu vuonna 930. Vaalit ja kansalaisoikeudet '
        + 'arvioidaan erittäin vahvoiksi; V-Demin liberaali osaindeksi '
        + 'jää naapureita alemmas lähinnä siksi, että pienessä maassa '
        + 'valvontaelimet ja hallitus ovat lähellä toisiaan.',
    },
    keskitulo: { arvo: '81 000 $/v', sija: '5./190' },
    tervehdykset: [
      { teksti: 'Góðan daginn', kieli: 'islanti', lippu: 'Flag of Iceland.svg', osuus: '97 %' },
      { teksti: 'Good day', kieli: 'englanti (vieras kieli)', lippu: 'Flag of the United Kingdom.svg', osuus: '80 %' },
      { teksti: 'Dzień dobry', kieli: 'puola', lippu: 'Flag of Poland.svg', osuus: '5 %' },
    ],
  },

  // Kreikka, Kroatia ja Bulgaria (haettu 1.8.2026). Sama menetelmä kuin
  // yllä, mutta suvereenien valtioiden suodatin on nyt sama kaikissa
  // luvuissa — myös demokratiaindeksissä, jonka nimittäjä on siksi 172
  // aiempien merkintöjen 179:n sijaan. Italian luvut toistettiin
  // tarkistukseksi: väkiluku ja pinta-ala osuivat täsmälleen, demokratia
  // ±1.
  GRC: {
    vakiluku: '10 milj.',
    vakilukuSija: '93./195',
    pintaAla: '132 000 km²',
    pintaAlaSija: '96./195',
    demokratia: {
      arvo: '0,57',
      sija: '51./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~GRC',
      selitys: 'Demokratia keksittiin Ateenassa, mutta nykyinen luku on '
        + 'eurooppalaisittain keskitasoa. V-Demin arvio laski selvästi '
        + '2020-luvulla: syinä ovat lehdistönvapauden heikkeneminen ja '
        + 'toimittajien puhelinten vakoiluohjelmakohu. Vaalit ja '
        + 'vallanvaihdot toimivat moitteetta.',
    },
    keskitulo: { arvo: '25 400 $/v', sija: '47./190' },
    tervehdykset: [
      { teksti: 'Γεια σας', kieli: 'kreikka', lippu: 'Flag of Greece.svg', osuus: '99 %' },
      { teksti: 'Merhaba', kieli: 'turkki (Länsi-Traakia)', lippu: 'Flag of Turkey.svg', osuus: '1 %' },
    ],
  },

  HRV: {
    vakiluku: '3,9 milj.',
    vakilukuSija: '129./195',
    // Maailmanpankin "pinta-ala" on Kroatialle 88 070 km², koska siihen
    // lasketaan aluevedet. Tässä käytetään maapinta-alaa 56 594 km²,
    // ja sija on laskettu samalla luvulla.
    pintaAla: '56 600 km²',
    pintaAlaSija: '125./195',
    demokratia: {
      arvo: '0,59',
      sija: '45./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~HRV',
      selitys: 'Kroatia itsenäistyi 1991 ja liittyi EU:hun 2013. '
        + 'Vaalit ja tuomioistuimet toimivat, mutta V-Demin arviota '
        + 'painaa korruptio ja se, että osa mediasta on lähellä '
        + 'puolueita. Sodan jäljet näkyvät yhä politiikassa.',
    },
    keskitulo: { arvo: '25 400 $/v', sija: '46./190' },
    tervehdykset: [
      { teksti: 'Dobar dan', kieli: 'kroaatti', lippu: 'Flag of Croatia.svg', osuus: '96 %' },
      { teksti: 'Добар дан', kieli: 'serbia', lippu: 'Flag of Serbia.svg', osuus: '4 %' },
      { teksti: 'Buon giorno', kieli: 'italia (Istria)', lippu: 'Flag of Italy.svg', osuus: '1 %' },
    ],
  },

  BGR: {
    vakiluku: '6,4 milj.',
    vakilukuSija: '110./195',
    pintaAla: '111 000 km²',
    pintaAlaSija: '104./195',
    demokratia: {
      arvo: '0,50',
      sija: '66./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~BGR',
      selitys: 'Bulgaria on EU:n jäsen, jossa vaalit ovat vapaat mutta '
        + 'hallitukset kaatuvat tiuhaan: maassa käytiin seitsemät vaalit '
        + 'kolmessa vuodessa 2021–2024. V-Demin arviota painavat '
        + 'korruptio ja oikeuslaitoksen riippumattomuuden puutteet, '
        + 'joista EU on huomauttanut toistuvasti.',
    },
    keskitulo: { arvo: '17 800 $/v', sija: '61./190' },
    tervehdykset: [
      { teksti: 'Добър ден', kieli: 'bulgaria', lippu: 'Flag of Bulgaria.svg', osuus: '85 %' },
      { teksti: 'Merhaba', kieli: 'turkki', lippu: 'Flag of Turkey.svg', osuus: '9 %' },
      { teksti: 'Lachho dives', kieli: 'romani', lippu: 'Flag of the Romani people.svg', osuus: '4 %' },
    ],
  },

  GBR: {
    vakiluku: '69 milj.',
    vakilukuSija: '22./195',
    pintaAla: '244 000 km²',
    pintaAlaSija: '78./195',
    demokratia: {
      arvo: '0,69',
      sija: '29./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~GBR',
      selitys: 'Vaalit ovat vapaat ja tuomioistuimet riippumattomia, mutta '
                 + 'luku on laskenut 2010-luvulta. Enemmistövaalitapa venyttää '
                 + 'tulosta: vuonna 2024 voittajapuolue sai 34 prosenttia '
                 + 'äänistä ja 63 prosenttia paikoista. Ylähuonetta ei valita '
                 + 'vaaleilla, kirjoitettua perustuslakia ei ole yhtenä '
                 + 'asiakirjana, ja tuoreet lait kavensivat '
                 + 'mielenosoitusoikeutta ja vaativat äänestäjiltä kuvallisen '
                 + 'henkilöpaperin.',
    },
    keskitulo: { arvo: '54 550 $/v', sija: '20./190' },
    tervehdykset: [
      { teksti: 'Good morning', kieli: 'englanti', lippu: 'Flag of the United Kingdom.svg', osuus: '98 %' },
      { teksti: 'Bore da', kieli: 'kymri (Wales)', lippu: 'Flag of Wales.svg', osuus: '0,9 %' },
      { teksti: 'Latha math', kieli: 'skottigaeli', lippu: 'Flag of Scotland.svg', osuus: '0,1 %' },
    ],
  },

  IRL: {
    vakiluku: '5,5 milj.',
    vakilukuSija: '120./195',
    pintaAla: '70 000 km²',
    pintaAlaSija: '119./195',
    demokratia: {
      arvo: '0,82',
      sija: '6./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~IRL',
      selitys: 'Perustuslakia ei voi muuttaa ilman kansanäänestystä, ja '
                 + 'irlantilaiset ovat käyttäneet sitä: avioero sallittiin '
                 + '1995, samaa sukupuolta olevien avioliitto 2015 ja abortti '
                 + '2018 — jokainen kansan äänellä. Vaalitapa on suhteellinen '
                 + 'siirtoäänivaali, joten pienetkin puolueet pääsevät '
                 + 'parlamenttiin ja hallitukset ovat liittohallituksia. '
                 + 'Tuomioistuimet ovat riippumattomia ja lehdistö vapaa.',
    },
    keskitulo: { arvo: '87 360 $/v', sija: '7./190' },
    tervehdykset: [
      { teksti: 'Hello', kieli: 'englanti', lippu: 'Flag of the United Kingdom.svg', osuus: '99 %' },
      { teksti: 'Dia dhuit', kieli: 'iiri (osaa; päivittäin 2 %)', lippu: 'Flag of Ireland.svg', osuus: '40 %' },
      { teksti: 'Dzień dobry', kieli: 'puola', lippu: 'Flag of Poland.svg', osuus: '2 %' },
    ],
  },

  PRT: {
    vakiluku: '11 milj.',
    vakilukuSija: '89./195',
    pintaAla: '92 000 km²',
    pintaAlaSija: '111./195',
    demokratia: {
      arvo: '0,72',
      sija: '26./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~PRT',
      selitys: 'Portugali oli diktatuuri vuoteen 1974, ja sen jälkeen '
                 + 'demokratia on ollut vakaa: vaalit ovat vapaat, valta '
                 + 'vaihtuu rauhassa ja lehdistönvapaus arvioidaan Euroopan '
                 + 'kärkeen. Kärkimaista luku jää siksi, että oikeuslaitos on '
                 + 'hidas — tavallinen oikeudenkäynti kestää vuosia — ja '
                 + 'korruptioepäilyt yltävät huipulle asti: pääministeri erosi '
                 + 'marraskuussa 2023 tutkinnan takia.',
    },
    keskitulo: { arvo: '29 930 $/v', sija: '40./190' },
    tervehdykset: [
      { teksti: 'Bom dia', kieli: 'portugali', lippu: 'Flag of Portugal.svg', osuus: '100 %' },
      { teksti: 'Good morning', kieli: 'englanti (vieras kieli)', lippu: 'Flag of the United Kingdom.svg', osuus: '27 %' },
      { teksti: 'Buonos dies', kieli: 'mirandeesi (Miranda do Douro)', lippu: 'Bandeira-de-Miranda-do-Douro.png', osuus: '0,1 %' },
    ],
  },

  NLD: {
    vakiluku: '18 milj.',
    vakilukuSija: '71./195',
    pintaAla: '42 000 km²',
    pintaAlaSija: '131./195',
    demokratia: {
      arvo: '0,77',
      sija: '18./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~NLD',
      selitys: 'Vaalit ovat poikkeuksellisen suhteelliset: 150 paikkaa '
                 + 'jaetaan ilman äänikynnystä, joten yksi paikka irtoaa 0,67 '
                 + 'prosentilla äänistä ja parlamentissa istuu toistakymmentä '
                 + 'puoluetta. Hallitus on aina liittohallitus. Kärkimaita '
                 + 'alempi luku selittyy pitkälti sillä, että tuomioistuin ei '
                 + 'perustuslain 120. pykälän mukaan saa arvioida lakien '
                 + 'perustuslainmukaisuutta.',
    },
    keskitulo: { arvo: '68 530 $/v', sija: '11./190' },
    tervehdykset: [
      { teksti: 'Goedendag', kieli: 'hollanti', lippu: 'Flag of the Netherlands.svg', osuus: '100 %' },
      { teksti: 'Good morning', kieli: 'englanti (vieras kieli)', lippu: 'Flag of the United Kingdom.svg', osuus: '90 %' },
      { teksti: 'Goeiemoarn', kieli: 'friisi (Fryslân)', lippu: 'Flag of Friesland.svg', osuus: '2,5 %' },
    ],
  },

  DEU: {
    vakiluku: '83 milj.',
    vakilukuSija: '19./195',
    pintaAla: '358 000 km²',
    pintaAlaSija: '63./195',
    demokratia: {
      arvo: '0,78',
      sija: '15./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~DEU',
      selitys: 'Saksan perustuslaki kirjoitettiin 1949 natsidiktatuurin '
                 + 'jälkeen niin, ettei valta enää voisi keskittyä yksiin '
                 + 'käsiin. Karlsruhen perustuslakituomioistuin voi kumota '
                 + 'lakeja, ja kuka tahansa asukas saa valittaa sille itse. '
                 + 'Kuusitoista osavaltiota valitsevat omat parlamenttinsa, ja '
                 + 'yleisradio rahoitetaan kotitalousmaksulla hallituksen '
                 + 'budjetin ulkopuolelta.',
    },
    keskitulo: { arvo: '60 200 $/v', sija: '15./190' },
    tervehdykset: [
      { teksti: 'Guten Tag', kieli: 'saksa', lippu: 'Flag of Germany.svg', osuus: '95 %' },
      { teksti: 'Merhaba', kieli: 'turkki', lippu: 'Flag of Turkey.svg', osuus: '2 %' },
      { teksti: 'Dobry dźeń', kieli: 'yläsorbi (Lausitz)', lippu: 'Flag of Sorbs.svg', osuus: '0,05 %' },
    ],
  },

  AUT: {
    vakiluku: '9,2 milj.',
    vakilukuSija: '97./195',
    pintaAla: '84 000 km²',
    pintaAlaSija: '115./195',
    demokratia: {
      arvo: '0,76',
      sija: '19./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~AUT',
      selitys: 'Itävalta on vakaa liittovaltio, jossa saa äänestää '
                 + '16-vuotiaana — ensimmäisenä EU-maana. Valvonta näkyy: '
                 + 'perustuslakituomioistuin kumosi vuoden 2016 '
                 + 'presidentinvaalin toisen kierroksen, koska postiäänet oli '
                 + 'laskettu sääntöjen vastaisesti, ja vaali uusittiin. Arviota '
                 + 'painavat toistuvat korruptiotutkinnat ja hallituksen suuret '
                 + 'mainosostot lehdiltä.',
    },
    keskitulo: { arvo: '60 360 $/v', sija: '14./190' },
    tervehdykset: [
      { teksti: 'Grüß Gott', kieli: 'saksa', lippu: 'Flag of Austria.svg', osuus: '98 %' },
      { teksti: 'Merhaba', kieli: 'turkki', lippu: 'Flag of Turkey.svg', osuus: '2 %' },
      { teksti: 'Dober dan', kieli: 'sloveeni (Kärnten)', lippu: 'Flag of Slovenia.svg', osuus: '0,3 %' },
    ],
  },

  CHE: {
    vakiluku: '9,1 milj.',
    vakilukuSija: '98./195',
    pintaAla: '41 000 km²',
    pintaAlaSija: '132./195',
    demokratia: {
      arvo: '0,84',
      sija: '4./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~CHE',
      selitys: 'Sveitsissä kansa äänestää laeista itse noin neljä kertaa '
                 + 'vuodessa: 100 000 nimeä riittää perustuslakialoitteeseen, '
                 + '50 000 uuden lain torjumiseen. Valtaa pitää seitsenhenkinen '
                 + 'liittoneuvosto, jonka puheenjohtajuus kiertää vuosittain. '
                 + 'Sama järjestelmä on myös hidas: naiset saivat äänioikeuden '
                 + 'liittovaltion vaaleissa vasta 1971.',
    },
    keskitulo: { arvo: '110 330 $/v', sija: '2./190' },
    tervehdykset: [
      { teksti: 'Grüezi', kieli: 'saksa', lippu: 'Flag of Switzerland.svg', osuus: '62 %' },
      { teksti: 'Bonjour', kieli: 'ranska', lippu: 'Flag of France.svg', osuus: '23 %' },
      { teksti: 'Buongiorno', kieli: 'italia', lippu: 'Flag of Italy.svg', osuus: '8 %' },
    ],
  },

  CZE: {
    vakiluku: '11 milj.',
    vakilukuSija: '88./195',
    pintaAla: '79 000 km²',
    pintaAlaSija: '116./195',
    demokratia: {
      arvo: '0,79',
      sija: '11./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~CZE',
      selitys: 'Tšekki siirtyi yksipuoluevallasta demokratiaan vuoden 1989 '
                 + 'samettivallankumouksessa, ja vaihdos on pitänyt: '
                 + 'hallitukset vaihtuvat vaaleilla rauhassa ja Brnon '
                 + 'perustuslakituomioistuin kumoaa lakeja. Media on vapaa '
                 + 'mutta harvoissa käsissä — pääministeri Andrej Babiš omisti '
                 + 'maan suurimmat sanomalehdet, kunnes laki pakotti siirtämään '
                 + 'ne rahastoon 2017.',
    },
    keskitulo: { arvo: '32 960 $/v', sija: '37./190' },
    tervehdykset: [
      { teksti: 'Dobrý den', kieli: 'tšekki', lippu: 'Flag of the Czech Republic.svg', osuus: '96 %' },
      { teksti: 'Добрий день', kieli: 'ukraina', lippu: 'Flag of Ukraine.svg', osuus: '4 %' },
      { teksti: 'Dobrý deň', kieli: 'slovakki', lippu: 'Flag of Slovakia.svg', osuus: '2 %' },
    ],
  },

  HUN: {
    vakiluku: '9,5 milj.',
    vakilukuSija: '96./195',
    pintaAla: '93 000 km²',
    pintaAlaSija: '110./195',
    demokratia: {
      arvo: '0,32',
      sija: '92./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~HUN',
      selitys: 'Unkarissa äänestetään vapaasti, mutta pelikenttä on '
                 + 'kallellaan. Vuodesta 2010 hallinnut Fidesz kirjoitti maalle '
                 + 'uuden perustuslain ja muutti vaalilakia, ja lähes 500 '
                 + 'lehteä, radiota ja verkkosivustoa siirtyi vuonna 2018 yhden '
                 + 'hallitusta lähellä olevan säätiön alle. V-Dem luokittelee '
                 + 'Unkarin vaalilliseksi autokratiaksi — ensimmäisenä '
                 + 'EU-maana.',
    },
    keskitulo: { arvo: '23 850 $/v', sija: '51./190' },
    tervehdykset: [
      { teksti: 'Jó napot', kieli: 'unkari', lippu: 'Flag of Hungary.svg', osuus: '99 %' },
      { teksti: 'Lachho dives', kieli: 'romani', lippu: 'Flag of the Romani people.svg', osuus: '2 %' },
      { teksti: 'Guten Tag', kieli: 'saksa (unkarinsaksalaiset)', lippu: 'Flag of Germany.svg', osuus: '1 %' },
    ],
  },

  ROU: {
    vakiluku: '19 milj.',
    vakilukuSija: '67./195',
    pintaAla: '238 000 km²',
    pintaAlaSija: '81./195',
    demokratia: {
      arvo: '0,46',
      sija: '68./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~ROU',
      selitys: 'Romaniassa valta vaihtuu vaaleilla ja lehdistö on '
                 + 'moniääninen, mutta korruptio ja median omistajien kytkökset '
                 + 'politiikkaan painavat arviota. Joulukuussa 2024 '
                 + 'perustuslakituomioistuin mitätöi presidentinvaalien '
                 + 'ensimmäisen kierroksen, kun tiedustelutietojen mukaan '
                 + 'kampanjaa oli tuettu salaa ulkomailta; vaalit uusittiin '
                 + 'toukokuussa 2025.',
    },
    keskitulo: { arvo: '20 190 $/v', sija: '54./190' },
    tervehdykset: [
      { teksti: 'Bună ziua', kieli: 'romania', lippu: 'Flag of Romania.svg', osuus: '91 %' },
      { teksti: 'Jó napot', kieli: 'unkari (Transilvania)', lippu: 'Flag of Hungary.svg', osuus: '6 %' },
      { teksti: 'Lachho dives', kieli: 'romani', lippu: 'Flag of the Romani people.svg', osuus: '3 %' },
    ],
  },

  TUR: {
    vakiluku: '86 milj.',
    vakilukuSija: '18./195',
    pintaAla: '785 000 km²',
    pintaAlaSija: '36./195',
    demokratia: {
      arvo: '0,11',
      sija: '134./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~TUR',
      selitys: 'Turkissa äänestetään innokkaasti — vuoden 2023 vaaleissa '
                 + 'äänesti lähes 88 prosenttia — mutta V-Dem laskee maan '
                 + 'vaalilliseksi autokratiaksi. Vuoden 2016 '
                 + 'vallankaappausyrityksen jälkeen yli 125 000 virkamiestä ja '
                 + 'tuomaria erotettiin asetuksilla, valtaosa mediasta on '
                 + 'hallituksen liittolaisten omistuksessa, ja Turkki on vuosia '
                 + 'ollut maailman kärkimaita vangittujen toimittajien '
                 + 'määrässä.',
    },
    keskitulo: { arvo: '16 300 $/v', sija: '63./190' },
    tervehdykset: [
      { teksti: 'Merhaba', kieli: 'turkki', lippu: 'Flag of Turkey.svg', osuus: '88 %' },
      { teksti: 'Rojbaş', kieli: 'kurdi', lippu: 'Flag of Kurdistan.svg', osuus: '12 %' },
      { teksti: 'Marhaba', kieli: 'arabia (Hatay)', lippu: 'Flag of Turkey.svg', osuus: '2 %' },
    ],
  },

  UKR: {
    vakiluku: '39 milj.',
    vakilukuSija: '40./195',
    pintaAla: '604 000 km²',
    pintaAlaSija: '45./195',
    demokratia: {
      arvo: '0,24',
      sija: '104./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~UKR',
      selitys: 'Ukrainassa on ollut sotatila helmikuusta 2022, ja '
                 + 'perustuslaki kieltää vaalit sotatilan aikana — presidentin- '
                 + 'ja parlamenttivaalit on siksi lykätty, ja suurten '
                 + 'tv-kanavien uutiset yhdistettiin yhdeksi '
                 + 'yhteislähetykseksi. Ennen hyökkäystä valta vaihtui '
                 + 'vaaleilla: vuonna 2019 istuva presidentti hävisi selvästi. '
                 + 'Luku kuvaa poikkeusoloja.',
    },
    keskitulo: { arvo: '5 510 $/v', sija: '113./190' },
    tervehdykset: [
      { teksti: 'Доброго дня', kieli: 'ukraina', lippu: 'Flag of Ukraine.svg', osuus: '78 %' },
      { teksti: 'Добрый день', kieli: 'venäjä', osuus: '30 %' },
      { teksti: 'Selâm aleyküm', kieli: 'krimintataari', lippu: 'Flag of the Crimean Tatar people.svg', osuus: '0,5 %' },
    ],
  },

  RUS: {
    vakiluku: '144 milj.',
    vakilukuSija: '9./195',
    pintaAla: '17 125 000 km²',
    pintaAlaSija: '1./195',
    demokratia: {
      arvo: '0,06',
      sija: '155./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~RUS',
      selitys: 'Vaalit järjestetään, mutta kilpailua niissä ei ole: '
                 + 'tunnetuimmat haastajat suljetaan ehdokaslistoilta, ja '
                 + 'oppositiojohtaja Aleksei Navalnyi kuoli vankileirillä 2024. '
                 + 'Riippumattomat lehdet ja tv-kanavat on lakkautettu tai '
                 + 'leimattu ulkomaisiksi agenteiksi, ja sodan arvostelusta voi '
                 + 'saada vankeutta. Vladimir Putin on johtanut maata vuodesta '
                 + '1999.',
    },
    keskitulo: { arvo: '15 960 $/v', sija: '64./190' },
    tervehdykset: [
      { teksti: 'Здравствуйте', kieli: 'venäjä', lippu: 'Flag of Russia.svg', osuus: '99 %' },
      { teksti: 'Исәнмесез', kieli: 'tataari', lippu: 'Flag of Tatarstan.svg', osuus: '3 %' },
      { teksti: 'Һаумыһығыҙ', kieli: 'baškiiri', lippu: 'Flag of Bashkortostan.svg', osuus: '1 %' },
    ],
  },

  EST: {
    vakiluku: '1,4 milj.',
    vakilukuSija: '154./195',
    pintaAla: '45 000 km²',
    pintaAlaSija: '129./195',
    demokratia: {
      arvo: '0,84',
      sija: '5./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~EST',
      selitys: 'Viro kuuluu V-Demin mittauksissa maailman kärkeen: vaalit '
                 + 'ovat vapaat, hallitukset vaihtuvat rauhassa, tuomioistuimet '
                 + 'ovat riippumattomia ja lehdistönvapaudessa maa on ollut '
                 + 'aivan kärkisijoilla. Yksi särö on äänioikeus: noin neljällä '
                 + 'prosentilla asukkaista on yhä määrittelemätön kansalaisuus, '
                 + 'eivätkä he saa äänestää parlamenttivaaleissa.',
    },
    keskitulo: { arvo: '32 310 $/v', sija: '38./190' },
    tervehdykset: [
      { teksti: 'Tere', kieli: 'viro', lippu: 'Flag of Estonia.svg', osuus: '84 %' },
      { teksti: 'Здравствуйте', kieli: 'venäjä', osuus: '27 %' },
      { teksti: 'Tereq', kieli: 'võro', lippu: 'Flag of et-Võru.svg', osuus: '5 %' },
    ],
  },

  LVA: {
    vakiluku: '1,8 milj.',
    vakilukuSija: '148./195',
    pintaAla: '65 000 km²',
    pintaAlaSija: '123./195',
    demokratia: {
      arvo: '0,75',
      sija: '20./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~LVA',
      selitys: 'Latvia on vakaa demokratia: vaaleissa kilpailee kymmenkunta '
                 + 'puoluetta, hallitukset kaatuvat ja syntyvät parlamentin '
                 + 'äänestyksissä, ja lehdistö on vapaa. Lukua painaa '
                 + 'kansalaisuuskysymys — 8,9 prosenttia asukkaista on yhä '
                 + '"ei-kansalaisia", joilla ei ole äänioikeutta valtiollisissa '
                 + 'vaaleissa. Osuus pienenee vuosi vuodelta.',
    },
    keskitulo: { arvo: '24 980 $/v', sija: '48./190' },
    tervehdykset: [
      { teksti: 'Labdien', kieli: 'latvia', lippu: 'Flag of Latvia.svg', osuus: '62 %' },
      { teksti: 'Здравствуйте', kieli: 'venäjä', osuus: '37 %' },
      { teksti: 'Vasals', kieli: 'latgali', lippu: 'Flag of Latgale.svg', osuus: '9 %' },
    ],
  },

  LTU: {
    vakiluku: '2,9 milj.',
    vakilukuSija: '137./195',
    pintaAla: '65 000 km²',
    pintaAlaSija: '122./195',
    demokratia: {
      arvo: '0,71',
      sija: '27./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~LTU',
      selitys: 'Liettuassa vaalit ovat vapaat ja valta on vaihtunut '
                 + 'rauhanomaisesti kerta toisensa jälkeen vuodesta 1990. Media '
                 + 'on moniäänistä. Luku jää silti hieman naapureiden alle: '
                 + 'oikeuslaitoksen luottamusta koetteli vuoden 2019 '
                 + 'lahjusvyyhti, jossa pidätettiin 26 ihmistä, heidän '
                 + 'joukossaan kahdeksan tuomaria.',
    },
    keskitulo: { arvo: '30 500 $/v', sija: '39./190' },
    tervehdykset: [
      { teksti: 'Laba diena', kieli: 'liettua', lippu: 'Flag of Lithuania.svg', osuus: '85 %' },
      { teksti: 'Dzień dobry', kieli: 'puola', lippu: 'Flag of Poland.svg', osuus: '6 %' },
      { teksti: 'Здравствуйте', kieli: 'venäjä', osuus: '5 %' },
    ],
  },

  FIN: {
    vakiluku: '5,6 milj.',
    vakilukuSija: '116./195',
    pintaAla: '338 000 km²',
    pintaAlaSija: '65./195',
    demokratia: {
      arvo: '0,81',
      sija: '8./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~FIN',
      selitys: 'Suomea kannattelevat riippumattomat tuomioistuimet, vapaa '
                 + 'lehdistö ja julkisuusperiaate: viranomaisen asiakirja on '
                 + 'lähtökohtaisesti julkinen, ellei laissa toisin sanota. '
                 + 'Erillistä perustuslakituomioistuinta ei kuitenkaan ole — '
                 + 'lakien perustuslainmukaisuuden arvioi etukäteen eduskunnan '
                 + 'perustuslakivaliokunta, siis poliitikot itse, ja se painaa '
                 + 'V-Demin arviota hieman.',
    },
    keskitulo: { arvo: '55 250 $/v', sija: '19./190' },
    tervehdykset: [
      { teksti: 'Hei', kieli: 'suomi', lippu: 'Flag of Finland.svg', osuus: '86 %' },
      { teksti: 'Hej', kieli: 'ruotsi', lippu: 'Flag of Sweden.svg', osuus: '5 %' },
      { teksti: 'Bures', kieli: 'pohjoissaame', lippu: 'Sami flag.svg', osuus: '0,04 %' },
    ],
  },

  SWE: {
    vakiluku: '11 milj.',
    vakilukuSija: '92./195',
    // Maailmanpankin luku sisältää aluevedet; tässä on
    // vakiintunut kokonaispinta-ala, ja sija on laskettu sillä.
    pintaAla: '450 000 km²',
    pintaAlaSija: '55./195',
    demokratia: {
      arvo: '0,85',
      sija: '2./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~SWE',
      selitys: 'Ruotsi on V-Demin mittauksissa maailman kärkeä. '
                 + 'Painovapausasetus vuodelta 1766 oli maailman ensimmäinen '
                 + 'laatuaan ja teki viranomaisten papereista julkisia. '
                 + 'Ministerihallinto on kielletty: ministeri ei saa puuttua '
                 + 'yksittäisen viraston päätökseen. Vaalit ovat suhteelliset, '
                 + 'ja vähemmistöhallitukset joutuvat neuvottelemaan opposition '
                 + 'kanssa.',
    },
    keskitulo: { arvo: '63 010 $/v', sija: '13./190' },
    tervehdykset: [
      { teksti: 'Hej', kieli: 'ruotsi', lippu: 'Flag of Sweden.svg', osuus: '95 %' },
      { teksti: 'Hei', kieli: 'suomi', lippu: 'Flag of Finland.svg', osuus: '2 %' },
      { teksti: 'Bures', kieli: 'pohjoissaame', lippu: 'Sami flag.svg', osuus: '0,2 %' },
    ],
  },

  NOR: {
    vakiluku: '5,6 milj.',
    vakilukuSija: '117./195',
    // Maailmanpankin luku sisältää aluevedet; tässä on
    // vakiintunut kokonaispinta-ala, ja sija on laskettu sillä.
    pintaAla: '385 000 km²',
    pintaAlaSija: '61./195',
    demokratia: {
      arvo: '0,85',
      sija: '3./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~NOR',
      selitys: 'Norjan perustuslaki vuodelta 1814 on yhä voimassa, ja '
                 + 'korkein oikeus on kumonnut sen vastaisia lakeja jo '
                 + '1800-luvulta lähtien. Lehdistö on vapaa, ja avoimuus menee '
                 + 'pitkälle: jokaisen verotiedot ovat julkisia. Suurkäräjät '
                 + 'valitaan suhteellisilla vaaleilla, ja saamelaiskäräjät on '
                 + 'toiminut vuodesta 1989.',
    },
    keskitulo: { arvo: '97 310 $/v', sija: '3./190' },
    tervehdykset: [
      { teksti: 'Hei', kieli: 'norja', lippu: 'Flag of Norway.svg', osuus: '95 %' },
      { teksti: 'Bures', kieli: 'pohjoissaame', lippu: 'Sami flag.svg', osuus: '0,5 %' },
      { teksti: 'Terve', kieli: 'kveeni', lippu: 'Flag of the Kven people.svg', osuus: '0,1 %' },
    ],
  },

  DNK: {
    vakiluku: '6,0 milj.',
    vakilukuSija: '113./195',
    pintaAla: '43 000 km²',
    pintaAlaSija: '130./195',
    demokratia: {
      arvo: '0,88',
      sija: '1./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~DNK',
      selitys: 'Tanska on V-Demin listan kärjessä. Vaalit ovat '
                 + 'suhteelliset, ja lähes kaikki hallitukset vuoden 1909 '
                 + 'jälkeen ovat olleet vähemmistöhallituksia — laki syntyy '
                 + 'neuvottelemalla opposition kanssa. Lehdistö on vapaa ja '
                 + 'korruptio vähäistä. Tuomioistuimet ovat riippumattomia '
                 + 'mutta puuttuvat lakeihin harvoin: korkein oikeus kumosi '
                 + 'lain perustuslain vastaisena ensi kerran vasta 1999.',
    },
    keskitulo: { arvo: '77 190 $/v', sija: '9./190' },
    tervehdykset: [
      { teksti: 'Goddag', kieli: 'tanska', lippu: 'Flag of Denmark.svg', osuus: '100 %' },
      { teksti: 'Aluu', kieli: 'grönlanti (Grönlanti)', lippu: 'Flag of Greenland.svg', osuus: '1 %' },
      { teksti: 'Góðan dag', kieli: 'fääri (Färsaaret)', lippu: 'Flag of the Faroe Islands.svg', osuus: '1 %' },
    ],
  },

  BEL: {
    vakiluku: '11,9 milj.',
    vakilukuSija: '81./195',
    pintaAla: '30 700 km²',
    pintaAlaSija: '136./195',
    demokratia: {
      arvo: '0,79',
      sija: '10./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~BEL',
      selitys: 'Belgia on liittovaltio, jossa on kolme kieliyhteisöä ja useita '
        + 'parlamentteja. Vaalit ovat vapaat ja tuomioistuimet '
        + 'riippumattomia. Hallitusten muodostaminen kestää kielirajan '
        + 'yli ulottuvien puolueiden takia poikkeuksellisen kauan: '
        + 'vuosien 2010–2011 hallitusneuvottelut vei yli 500 päivää.',
    },
    keskitulo: { arvo: '59 500 $/v', sija: '16./190' },
    tervehdykset: [
      { teksti: 'Goedendag', kieli: 'hollanti (flaami)', lippu: 'Flag of the Netherlands.svg', osuus: '60 %' },
      { teksti: 'Bonjour', kieli: 'ranska', lippu: 'Flag of France.svg', osuus: '40 %' },
      { teksti: 'Guten Tag', kieli: 'saksa (Itä-Belgia)', lippu: 'Flag of Germany.svg', osuus: '1 %' },
    ],
  },

  LUX: {
    vakiluku: '0,7 milj.',
    vakilukuSija: '162./195',
    pintaAla: '2 590 km²',
    pintaAlaSija: '167./195',
    demokratia: {
      arvo: '0,78',
      sija: '17./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~LUX',
      selitys: 'Luxemburg on perustuslaillinen monarkia, jonka suurherttua on '
        + 'vain seremoniallinen valtionpäämies. Parlamentti valitaan '
        + 'suhteellisilla vaaleilla, ja äänestäminen on pakollista. '
        + 'Vapaat vaalit ja riippumattomat tuomioistuimet sijoittavat '
        + 'maan Euroopan kärkijoukkoon.',
    },
    keskitulo: { arvo: '95 720 $/v', sija: '4./190' },
    tervehdykset: [
      { teksti: 'Moien', kieli: 'luxemburg', lippu: 'Flag of Luxembourg.svg', osuus: '80 %' },
      { teksti: 'Bonjour', kieli: 'ranska', lippu: 'Flag of France.svg', osuus: '98 %' },
      { teksti: 'Guten Tag', kieli: 'saksa', lippu: 'Flag of Germany.svg', osuus: '80 %' },
    ],
  },

  MLT: {
    vakiluku: '0,6 milj.',
    vakilukuSija: '165./195',
    pintaAla: '320 km²',
    pintaAlaSija: '185./195',
    demokratia: {
      arvo: '0,62',
      sija: '43./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~MLT',
      selitys: 'Malta on tasavalta, jonka parlamentissa on käytännössä kaksi '
        + 'suurta puoluetta. Vaalit ovat vapaat ja äänestysvilkkaus '
        + 'kuuluu Euroopan korkeimpiin, mutta V-Demin arviota painavat '
        + 'oikeusvaltion ongelmat: toimittaja Daphne Caruana Galizian '
        + 'murha vuonna 2017 johti mielenosoituksiin ja pääministerin '
        + 'eroon.',
    },
    keskitulo: { arvo: '41 440 $/v', sija: '27./190' },
    tervehdykset: [
      { teksti: 'Bongu', kieli: 'malta', lippu: 'Flag of Malta.svg', osuus: '90 %' },
      { teksti: 'Good morning', kieli: 'englanti', lippu: 'Flag of the United Kingdom.svg', osuus: '88 %' },
      { teksti: 'Buongiorno', kieli: 'italia', lippu: 'Flag of Italy.svg', osuus: '66 %' },
    ],
  },

  SVK: {
    vakiluku: '5,4 milj.',
    vakilukuSija: '121./195',
    pintaAla: '49 000 km²',
    pintaAlaSija: '128./195',
    demokratia: {
      arvo: '0,57',
      sija: '50./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~SVK',
      selitys: 'Slovakia itsenäistyi 1993 ja liittyi EU:hun 2004. Vaalit ovat '
        + 'vapaat ja hallitukset vaihtuvat, mutta V-Demin arviota '
        + 'painavat korruptio ja median painostus: toimittaja Ján '
        + 'Kuciakin murha vuonna 2018 pakotti pääministerin eroamaan.',
    },
    keskitulo: { arvo: '26 410 $/v', sija: '44./190' },
    tervehdykset: [
      { teksti: 'Dobrý deň', kieli: 'slovakki', lippu: 'Flag of Slovakia.svg', osuus: '80 %' },
      { teksti: 'Jó napot', kieli: 'unkari', lippu: 'Flag of Hungary.svg', osuus: '8 %' },
    ],
  },

  SVN: {
    vakiluku: '2,1 milj.',
    vakilukuSija: '145./195',
    pintaAla: '20 500 km²',
    pintaAlaSija: '150./195',
    demokratia: {
      arvo: '0,59',
      sija: '47./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~SVN',
      selitys: 'Slovenia irtautui Jugoslaviasta kymmenen päivän sodan jälkeen '
        + '1991 ja liittyi EU:hun 2004. Vaalit ovat vapaat, '
        + 'tuomioistuimet toimivat ja hallitukset vaihtuvat '
        + 'rauhanomaisesti; V-Demin luku on EU:n keskikastia.',
    },
    keskitulo: { arvo: '35 520 $/v', sija: '35./190' },
    tervehdykset: [
      { teksti: 'Dober dan', kieli: 'sloveeni', lippu: 'Flag of Slovenia.svg', osuus: '88 %' },
      { teksti: 'Dobar dan', kieli: 'kroaatti', lippu: 'Flag of Croatia.svg', osuus: '2 %' },
    ],
  },
};
