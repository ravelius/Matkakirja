// Pohjois-Amerikan maiden tunnusluvut (sama rakenne kuin
// EUROPE_MAATIEDOT ja AFRICA_MAATIEDOT).
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
// Kanadan pinta-ala on poikkeus. Maailmanpankin AG.SRF.TOTL.K2 antaa
// sille 15,6 milj. km², mikä on selvästi enemmän kuin maan yleisesti
// käytetty kokonaispinta-ala 9,98 milj. km² (saman sarjan maa-ala on
// 8,8 milj. km²). Tauluun on siksi kirjattu 10,0 milj. km²; sijoitus
// 2. on sama kummallakin luvulla, koska Venäjä on 17,1 milj. km².
//
// Demokratiaselitysten faktat ovat en-Wikipedian artikkeleista
// "Politics of the United States", "Politics of Canada" ja "Politics
// of Mexico" (luettu 6.9.2026); tervehdysten kielet ja osuudet
// "Languages of ..." -artikkeleista ja sanamuodot en-Wiktionarysta.
//
// Jokainen tervehdyksen lippu on tarkistettu Commonsista: puuttuva
// tiedostonimi jättäisi kortin puolityhjäksi ilman virhettä.
//
// Tuotettu komennolla tools/kirjoita-maatiedot.mjs.
export const NORTHAMERICA_MAATIEDOT = {
  CAN: {
    vakiluku: '41 milj.',
    vakilukuSija: '37./195',
    pintaAla: '10,0 milj. km²',
    pintaAlaSija: '2./195',
    demokratia: {
      arvo: '0,74',
      sija: '23./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~CAN',
      selitys: 'Kanada on parlamentaarinen monarkia: kuningas on seremoniallinen '
        + 'valtionpäämies, ja valta on pääministerillä ja alahuoneelle '
        + 'vastuussa olevalla hallituksella. Maata kuvataan täydeksi '
        + 'demokratiaksi, jonka politiikassa ääriliikkeet eivät ole koskaan '
        + 'olleet näkyviä. Alahuoneen paikat jaetaan vaalipiireittäin '
        + 'enemmistövaalitavalla, joten eniten ääniä saanut ehdokas voittaa '
        + 'vaikka jäisi alle puoleen äänistä — se on antanut vaalituloksille '
        + 'rajuja heilahduksia. Perusoikeuskirja eli Charter of Rights and '
        + 'Freedoms on kirjattu perustuslakiin ja nauttii laajaa kannatusta. '
        + 'Provinsseilla on oma laaja itsehallintonsa, ja Quebecin asema on '
        + 'ollut liittovaltion pisin kiistakysymys.',
    },
    keskitulo: {
      arvo: '54 110 $/v',
      sija: '16./190',
    },
    tervehdykset: [
      { teksti: 'Good morning', kieli: 'englanti', lippu: 'Flag of Canada.svg', osuus: '86 %' },
      { teksti: 'Bonjour', kieli: 'ranska', lippu: 'Flag of Quebec.svg', osuus: '30 %' },
      { teksti: 'Ublaahatsiatkut', kieli: 'inuktitut (Nunavut)', lippu: 'Flag of Nunavut.svg', osuus: '0,1 %' },
    ],
  },
  MEX: {
    vakiluku: '131 milj.',
    vakilukuSija: '11./195',
    pintaAla: '2,0 milj. km²',
    pintaAlaSija: '13./195',
    demokratia: {
      arvo: '0,22',
      sija: '106./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~MEX',
      selitys: 'Meksikon perustuslaki on vuodelta 1917, ja sen kantava periaate on '
        + '"ei uudelleenvalintaa": presidentti valitaan yhdeksi kuuden vuoden '
        + 'kaudeksi eikä voi enää koskaan palata virkaan. Yksi puolue, PRI, '
        + 'hallitsi silti käytännössä koko 1900-luvun, ja ensimmäinen '
        + 'oppositiopresidentti astui virkaan vasta vuonna 2000. Vaalit '
        + 'järjestää itsenäinen vaali-instituutti INE, mutta luottamus '
        + 'tuloksiin on ollut heikkoa: vuoden 2017 kyselyssä 74 prosenttia '
        + 'meksikolaisista piti vaalijärjestelmää läpinäkymättömänä. Indeksi '
        + 'mittaa vaalien lisäksi vallan rajoja ja oikeuksien suojaa, ja '
        + 'niissä maa saa matalat arviot. Kyselyissä maan tärkeimmiksi '
        + 'poliittisiksi kysymyksiksi nousevat rikollisuus ja korruptio.',
    },
    keskitulo: {
      arvo: '12 760 $/v',
      sija: '67./190',
    },
    tervehdykset: [
      { teksti: 'Buenos días', kieli: 'espanja', lippu: 'Flag of Mexico.svg', osuus: '94 %' },
      { teksti: 'Niltze', kieli: 'nahuatl', lippu: 'Flag of Mexico.svg', osuus: '1,3 %' },
      { teksti: 'Good morning', kieli: 'englanti (vieras kieli)', lippu: 'Flag of the United States.svg', osuus: '5 %' },
    ],
  },
  USA: {
    vakiluku: '340 milj.',
    vakilukuSija: '3./195',
    pintaAla: '9,8 milj. km²',
    pintaAlaSija: '3./195',
    demokratia: {
      arvo: '0,57',
      sija: '50./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~USA',
      selitys: 'Yhdysvallat on maailman vanhin yhtäjaksoinen perustuslaillinen '
        + 'tasavalta, mutta indeksi on laskenut vuodesta 2016: sekä V-Dem '
        + 'että The Economistin demokratiaindeksi ovat mitanneet eroosiota '
        + 'siitä lähtien. Pudotus vuodesta 2024 vuoteen 2025 on jyrkin koko '
        + 'sarjassa, joka alkaa vuodesta 1789. Vaalit järjestää kukin '
        + 'osavaltio itse, ja valitsijamiesjärjestelmä sekä senaatin '
        + 'tasaedustus antavat pienille osavaltioille väkilukua suuremman '
        + 'painon: kaksi 2000-luvun presidenttiä nousi virkaan hävittyään '
        + 'äänten enemmistön. Korkeimman oikeuden tuomarit nimitetään '
        + 'elinikäisesti, ja heidän ratkaisunsa ohjaavat politiikkaa '
        + 'vuosikymmeniksi. Juuri tällaisia vallan rajoja indeksi mittaa '
        + 'vaalien ja yksilönoikeuksien ohella.',
    },
    keskitulo: {
      arvo: '82 910 $/v',
      sija: '4./190',
    },
    tervehdykset: [
      { teksti: 'Good morning', kieli: 'englanti', lippu: 'Flag of the United States.svg', osuus: '96 %' },
      { teksti: 'Buenos días', kieli: 'espanja', lippu: 'Flag of Mexico.svg', osuus: '14 %' },
      { teksti: '你好', kieli: 'kiina', lippu: 'Flag of the People\'s Republic of China.svg', osuus: '1 %' },
    ],
  },
};
