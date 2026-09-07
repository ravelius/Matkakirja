// Oseanian maiden tunnusluvut (sama rakenne kuin EUROPE_MAATIEDOT ja
// AFRICA_MAATIEDOT).
//
// Lähteet ja menetelmä (haettu 6.9.2026):
//  - väkiluku SP.POP.TOTL (2024), pinta-ala AG.SRF.TOTL.K2 (2023) ja
//    keskitulo NY.GNP.PCAP.CD eli BKTL/asukas Atlas-menetelmällä
//    (2024), kaikki Maailmanpankin rajapinnasta;
//  - demokratia = V-Demin liberaalin demokratian indeksi (2025) Our
//    World in Datan aineistosta (grapher/liberal-democracy-index).
// Vertailuvuodet ja menetelmä ovat samat kuin EUROPE_MAATIEDOTissa,
// jotta sijat ovat vertailukelpoisia: sijoitus lasketaan suvereenien
// valtioiden kesken (Maailmanpankin maalista ilman merentakaisia
// alueita, 193 maata; V-Demissä 172 valtiota, kun aggregaatit,
// Hongkong, Kosovo, Somalimaa, Taiwan ja Sansibar on jätetty pois),
// ja nimittäjä on pyöristetty samaan tapaan kuin muissa tauluissa
// (195 / 195 / 190). Menetelmä tarkistettiin toistamalla Italian,
// Ranskan, Espanjan ja Tanskan valmiit luvut: sijoitukset osuivat
// kohdalleen.
//
// Demokratiaselitysten faktat ovat en-Wikipedian artikkeleista
// "Politics of Australia" ja "Politics of New Zealand" (luettu
// 6.9.2026); tervehdysten kielet ja osuudet artikkeleista "Languages
// of Australia" ja "Languages of New Zealand", ja sanamuodot
// en-Wiktionarysta.
//
// Fidži, Papua-Uusi-Guinea ja Salomonsaaret lisättiin 6.9.2026
// illalla samalla menetelmällä ja samasta aineistosta.
// Demokratiaselitykset ovat artikkeleista "Politics of Fiji",
// "Politics of Papua New Guinea" ja "Politics of Solomon Islands" ja
// tervehdykset artikkeleista "Languages of Fiji", "Languages of Papua
// New Guinea" ja "Solomon Islands". Kaikilla kolmella on vain kaksi
// tervehdystä: hiri motulle ja Salomonsaarten paikalliskielille ei
// löytynyt en-Wiktionaryn katetta, ja arvattu sana olisi huonompi kuin
// puuttuva rivi. Salomonsaarten pijinin osuudeksi on kirjattu
// varovainen 50 %, koska lähde sanoo vain "enemmistö".
//
// Jokainen tervehdyksen lippu on tarkistettu Commonsista: puuttuva
// tiedostonimi jättäisi kortin puolityhjäksi ilman virhettä.
//
// Tuotettu komennolla tools/kirjoita-maatiedot.mjs.
export const OCEANIA_MAATIEDOT = {
  AUS: {
    vakiluku: '27 milj.',
    vakilukuSija: '54./195',
    pintaAla: '7,7 milj. km²',
    pintaAlaSija: '6./195',
    demokratia: {
      arvo: '0,79',
      sija: '12./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~AUS',
      selitys: 'Australia on liittovaltio ja parlamentaarinen monarkia, ja sen '
        + 'perustuslaki on maailman kymmenenneksi vanhin: voimassa vuodesta '
        + '1901. Äänestäminen on ollut liittovaltion vaaleissa pakollista '
        + 'vuodesta 1924, ja äänestämättä jättämisestä seuraa 20 dollarin '
        + 'sakko. Edustajainhuone valitaan etusijaäänestyksellä, jossa '
        + 'voittaja tarvitsee yli puolet äänistä sen jälkeen kun pienten '
        + 'ehdokkaiden äänet on siirretty. Senaattiin jokainen osavaltio '
        + 'valitsee saman määrän jäseniä suhteellisella siirtoäänivaalilla, '
        + 'joten pienet puolueet ovat siellä lähes aina vaa\'ankielenä — '
        + 'vuoden 1981 jälkeen hallituksella on ollut senaatin enemmistö vain '
        + 'kolmen vuoden ajan. Alkuperäiskansojen äänioikeuden viimeiset '
        + 'rajoitukset poistuivat vasta 1962.',
    },
    keskitulo: {
      arvo: '62 680 $/v',
      sija: '10./190',
    },
    tervehdykset: [
      { teksti: 'Good morning', kieli: 'englanti', lippu: 'Flag of Australia.svg', osuus: '96 %' },
      { teksti: '你好', kieli: 'mandariinikiina', lippu: 'Flag of the People\'s Republic of China.svg', osuus: '2,7 %' },
      { teksti: 'Yaama', kieli: 'gamilaraay (aboriginaalikieli)', lippu: 'Flag of Australia.svg', osuus: '0,3 %' },
    ],
  },
  FJI: {
    vakiluku: '929 000',
    vakilukuSija: '157./195',
    pintaAla: '18 300 km²',
    pintaAlaSija: '151./195',
    demokratia: {
      arvo: '0,40',
      sija: '76./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~FJI',
      selitys: 'Fidži on parlamentaarinen tasavalta, jossa hallitusta johtaa '
        + 'parlamentin valitsema pääministeri. Parlamentti valitsee myös '
        + 'presidentin kolmivuotiskaudeksi; tehtävä on pääosin '
        + 'seremoniallinen, mutta presidentillä on kansallista kriisiä varten '
        + 'varavaltuuksia, joiden käyttö on käytännössä osoittautunut '
        + 'hankalaksi. Itsenäisyyden jälkeen maassa on ollut useita '
        + 'vallankaappauksia. Vuoden 2006 kaappauksen jälkeen valta siirtyi '
        + 'armeijalle, ja kun valitustuomioistuin oli todennut '
        + 'kaappaushallituksen laittomaksi, valtionpäämies kumosi '
        + 'perustuslain ja erotti kaikki tuomioistuimet. Uusi perustuslaki '
        + 'julkistettiin 2013 ja yleiset vaalit pidettiin 2014. Ennen '
        + 'siirtomaa-aikaa politiikkaa hallitsivat päälliköt, ja heidän '
        + 'asemansa näkyy yhä.',
    },
    keskitulo: {
      arvo: '5 820 $/v',
      sija: '102./190',
    },
    tervehdykset: [
      { teksti: 'Bula', kieli: 'fidži (iTaukei)', lippu: 'Flag of Fiji.svg', osuus: '54 %' },
      { teksti: 'नमस्ते', kieli: 'hindi ja fidžinhindi', lippu: 'Flag of India.svg', osuus: '37 %' },
    ],
  },
  NZL: {
    vakiluku: '5,3 milj.',
    vakilukuSija: '121./195',
    pintaAla: '268 000 km²',
    pintaAlaSija: '74./195',
    demokratia: {
      arvo: '0,79',
      sija: '14./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~NZL',
      selitys: 'Uudella-Seelannilla ei ole yhtä kirjoitettua perustuslakia: '
        + 'valtiosääntö on kokoelma lakeja, Waitangin sopimuksen periaatteita '
        + 'ja vakiintuneita käytäntöjä. Perusoikeudet turvaa vuoden 1990 Bill '
        + 'of Rights Act, mutta sitä ei ole lukittu, vaan parlamentti voi '
        + 'muuttaa sitä yksinkertaisella enemmistöllä. Parlamentti on '
        + 'yksikamarinen, ja vuodesta 1996 se on valittu sekajärjestelmällä, '
        + 'jossa puolueen paikkaluku vastaa sen ääniosuutta; muutos tehtiin '
        + 'kansanäänestyksellä sen jälkeen kun eniten ääniä saanut puolue oli '
        + 'kahdesti jäänyt oppositioon. Kahdeksassa ensimmäisessä uuden '
        + 'järjestelmän vaalissa yksikään puolue ei saanut enemmistöä, joten '
        + 'vähemmistöhallitukset ja luottamussopimukset ovat tavallisia. '
        + 'Waitangin tuomioistuin on vuodesta 1984 voinut käsitellä '
        + 'sopimusrikkomuksia aina vuoteen 1840 saakka.',
    },
    keskitulo: {
      arvo: '47 070 $/v',
      sija: '22./190',
    },
    tervehdykset: [
      { teksti: 'Good morning', kieli: 'englanti', lippu: 'Flag of New Zealand.svg', osuus: '95 %' },
      { teksti: 'Kia ora', kieli: 'maori', lippu: 'Tino Rangatiratanga Maori sovereignty movement flag.svg', osuus: '4 %' },
      { teksti: 'Talofa', kieli: 'samoa', lippu: 'Flag of Samoa.svg', osuus: '2 %' },
    ],
  },
  PNG: {
    vakiluku: '11 milj.',
    vakilukuSija: '91./195',
    pintaAla: '463 000 km²',
    pintaAlaSija: '56./195',
    demokratia: {
      arvo: '0,38',
      sija: '78./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~PNG',
      selitys: 'Papua-Uusi-Guinea on parlamentaarinen monipuoluedemokratia ja '
        + 'Kansainyhteisön kuningaskunta: valtionpäämiehenä on kuningas, jota '
        + 'edustaa kenraalikuvernööri. Papua-Uusi-Guinea ja Salomonsaaret '
        + 'ovat ainoat kuningaskunnat, joissa parlamentti valitsee '
        + 'kenraalikuvernöörin. Yksikamarinen kansalliskokous valitsee '
        + 'pääministerin ja istuu enintään viisi vuotta kerrallaan. '
        + 'Perustuslaki turvaa sanan-, lehdistön-, uskonnon-, liikkumis- ja '
        + 'yhdistymisvapauden, ja tuomioistuimet ovat riippumattomia. '
        + 'Puolueet ovat heikkoja ja hallituskoalitiot hyvin epävakaita. '
        + 'Vuoden 2001 vaaliuudistus toi käyttöön rajoitetun '
        + 'etusijaäänestyksen, sillä aiemmin voittaja saattoi päästä läpi '
        + 'alle 15 prosentin ääniosuudella.',
    },
    keskitulo: {
      arvo: '2 860 $/v',
      sija: '134./190',
    },
    tervehdykset: [
      { teksti: 'Gude', kieli: 'tok pisin (yleiskieli)', lippu: 'Flag of Papua New Guinea.svg', osuus: '68 %' },
      { teksti: 'Good morning', kieli: 'englanti (hallinnon kieli)', lippu: 'Flag of the United Kingdom.svg', osuus: '40 %' },
    ],
  },
  SLB: {
    vakiluku: '819 000',
    vakilukuSija: '160./195',
    pintaAla: '28 900 km²',
    pintaAlaSija: '139./195',
    demokratia: {
      arvo: '0,54',
      sija: '54./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~SLB',
      selitys: 'Salomonsaaret on parlamentaarinen demokratia ja Kansainyhteisön '
        + 'kuningaskunta, jossa kuningasta edustaa kenraalikuvernööri. '
        + 'Kenraalikuvernöörin valitsee parlamentti, ja hän toimii '
        + 'pääministerin ja hallituksen neuvojen mukaan. Perustuslaki turvaa '
        + 'sanan-, lehdistön-, uskonnon-, liikkumis- ja yhdistymisvapauden, '
        + 'ja tuomioistuimet ovat riippumattomia toimeenpano- ja '
        + 'lainsäädäntövallasta. Parlamentin 50 jäsentä valitaan neljäksi '
        + 'vuodeksi yhden edustajan vaalipiireistä, ja äänioikeus on kaikilla '
        + 'yli 18-vuotiailla. Puolueet ovat heikkoja ja koalitiot epävakaita: '
        + 'epäluottamusäänestykset ovat tavallisia, hallituksen johto vaihtuu '
        + 'usein eikä yksi puolue juuri koskaan yllä valtaan yksin.',
    },
    keskitulo: {
      arvo: '1 910 $/v',
      sija: '148./190',
    },
    tervehdykset: [
      { teksti: 'Aftanun', kieli: 'pijin (yleiskieli)', lippu: 'Flag of the Solomon Islands.svg', osuus: '50 %' },
      { teksti: 'Good morning', kieli: 'englanti (virallinen kieli)', lippu: 'Flag of the United Kingdom.svg', osuus: '2 %' },
    ],
  },
};
