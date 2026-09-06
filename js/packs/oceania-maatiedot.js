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
};
