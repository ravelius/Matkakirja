// Etelä-Amerikan maiden tunnusluvut (sama rakenne kuin
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
// Demokratiaselitysten faktat ovat en-Wikipedian artikkeleista
// "Politics of Brazil", "Politics of Argentina", "Politics of Peru",
// "Politics of Ecuador", "Politics of Chile" ja "Politics of
// Colombia" (luettu 6.9.2026); tervehdysten kielet ja osuudet
// "Languages of ..." -artikkeleista sekä Ecuadorin osalta
// artikkelista "Ecuador", ja sanamuodot en-Wiktionarysta.
//
// Ecuadorille on kirjattu kaksi tervehdystä: shuarin kielelle ei
// löytynyt lähteen katteessa olevaa tervehdystä, ja arvattu sana on
// huonompi kuin puuttuva rivi. Samasta syystä Chilelle on kaksi:
// rapanuin ja aymaran tervehdyksille ei löytynyt en-Wiktionaryn
// katetta, joten mukana ovat vain espanja ja mapudungun.
//
// Jokainen tervehdyksen lippu on tarkistettu Commonsista: puuttuva
// tiedostonimi jättäisi kortin puolityhjäksi ilman virhettä.
//
// Tuotettu komennolla tools/kirjoita-maatiedot.mjs.
export const SOUTHAMERICA_MAATIEDOT = {
  ARG: {
    vakiluku: '46 milj.',
    vakilukuSija: '35./195',
    pintaAla: '2,8 milj. km²',
    pintaAlaSija: '8./195',
    demokratia: {
      arvo: '0,52',
      sija: '55./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~ARG',
      selitys: 'Argentiina on liittovaltio ja presidentin johtama tasavalta, jossa '
        + 'vaalit pidetään säännöllisesti monipuoluejärjestelmässä. Yleinen '
        + 'ja salainen äänioikeus säädettiin miehille jo 1912, mutta vuosina '
        + '1930–1976 armeija syrjäytti kuusi hallitusta. Nykyinen demokratia '
        + 'alkoi 1983, ja sitä pidetään vakaampana kuin sitä edeltäneitä '
        + 'jaksoja tai monia muita Latinalaisen Amerikan demokratioita. Se '
        + 'kesti myös vuosien 2001–2002 talousromahduksen, jonka aikana '
        + 'presidentti erosi mellakoiden keskellä ja kongressi nimitti '
        + 'väliaikaisia seuraajia. Korkeimman oikeuden viisi tuomaria '
        + 'nimittää presidentti senaatin hyväksynnällä, ja kongressi voi '
        + 'erottaa heidät.',
    },
    keskitulo: {
      arvo: '13 530 $/v',
      sija: '63./190',
    },
    tervehdykset: [
      { teksti: 'Buenos días', kieli: 'espanja', lippu: 'Flag of Argentina.svg', osuus: '99 %' },
      { teksti: 'Guten Tag', kieli: 'saksa (siirtolaisyhteisöt)', lippu: 'Flag of Germany.svg', osuus: '0,4 %' },
      { teksti: 'Mba\'éichapa', kieli: 'guarani', lippu: 'Flag of Paraguay.svg', osuus: '0,2 %' },
    ],
  },
  BRA: {
    vakiluku: '212 milj.',
    vakilukuSija: '7./195',
    pintaAla: '8,5 milj. km²',
    pintaAlaSija: '5./195',
    demokratia: {
      arvo: '0,70',
      sija: '28./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~BRA',
      selitys: 'Brasilia palasi sotilashallinnosta demokratiaan 1985, ja vuoden '
        + '1988 perustuslaki kirjoitettiin vastareaktiona diktatuurille: se '
        + 'takaa laajat yksilönoikeudet ja on tavallista laveampi, sillä '
        + 'siihen kirjattiin asioita, jotka muualla ovat tavallisia lakeja. '
        + 'Presidentti on sekä valtion- että hallituksen päämies, ja '
        + 'kongressissa on kaksi kamaria. Puolueita on poikkeuksellisen '
        + 'paljon, edustajat vaihtavat niitä kesken kauden, ja presidentti '
        + 'joutuu kokoamaan lakiensa taakse laajan ja usein aatteellisesti '
        + 'sekalaisen liittouman — ilmiöllä on oma nimensä, '
        + 'koalitiopresidentialismi. Perustuslaki tuntee myös kaksi suoran '
        + 'demokratian keinoa. Osavaltiot ovat vahvoja: ne keräävät omat '
        + 'veronsa ja pitävät omia parlamenttejaan, ja Economist Intelligence '
        + 'Unit luokitteli Brasilian 2022 puutteelliseksi demokratiaksi.',
    },
    keskitulo: {
      arvo: '9 930 $/v',
      sija: '76./190',
    },
    tervehdykset: [
      { teksti: 'Bom dia', kieli: 'portugali', lippu: 'Flag of Brazil.svg', osuus: '98 %' },
      { teksti: 'Guten Tag', kieli: 'hunsrik (Etelä-Brasilia)', lippu: 'Flag of Germany.svg', osuus: '1,4 %' },
      { teksti: 'こんにちは', kieli: 'japani (São Paulo)', lippu: 'Flag of Japan.svg', osuus: '0,2 %' },
    ],
  },
  CHL: {
    vakiluku: '20 milj.',
    vakilukuSija: '65./195',
    pintaAla: '757 000 km²',
    pintaAlaSija: '37./195',
    demokratia: {
      arvo: '0,78',
      sija: '16./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~CHL',
      selitys: 'Chile on presidentin johtama tasavalta, jossa presidentti on sekä '
        + 'valtion- että hallituksen päämies ja jossa toimii '
        + 'monipuoluejärjestelmä; lainsäädäntövalta on kaksikamarisella '
        + 'kansalliskongressilla ja tuomioistuimet ovat erillään '
        + 'hallituksesta ja kongressista. Nykyinen perustuslaki hyväksyttiin '
        + 'kansanäänestyksessä syyskuussa 1980 Augusto Pinochetin '
        + 'sotilasdiktatuurin aikana ja tuli voimaan maaliskuussa 1981. Kun '
        + 'Pinochet hävisi kansanäänestyksen 1988, perustuslakia muutettiin '
        + 'seuraavana vuonna niin, että sen muuttaminen kävi helpommaksi. '
        + 'Vuonna 2006 kongressin hyväksymät uudistukset poistivat nimitetyt '
        + 'ja elinikäiset senaattorit, antoivat presidentille oikeuden '
        + 'erottaa puolustushaarojen komentajat ja lyhensivät '
        + 'presidenttikauden kuudesta neljään vuoteen ilman välitöntä '
        + 'uudelleenvalintaa. V-Demin mittareissa Chile oli 2023 Latinalaisen '
        + 'Amerikan kolmanneksi vaalidemokraattisin maa; The Economist '
        + 'Intelligence Unit luokitteli sen 2023 puutteelliseksi '
        + 'demokratiaksi.',
    },
    keskitulo: {
      arvo: '15 840 $/v',
      sija: '58./190',
    },
    tervehdykset: [
      { teksti: 'Buenos días', kieli: 'espanja', lippu: 'Flag of Chile.svg', osuus: '99 %' },
      { teksti: 'Mari mari', kieli: 'mapudungun (mapuche)', lippu: 'Flag of the Mapuches (1992).svg', osuus: '1 %' },
    ],
  },
  COL: {
    vakiluku: '53 milj.',
    vakilukuSija: '28./195',
    pintaAla: '1,1 milj. km²',
    pintaAlaSija: '25./195',
    demokratia: {
      arvo: '0,56',
      sija: '52./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~COL',
      selitys: 'Kolumbia on presidentin johtama tasavalta ja monipuoluedemokratia, '
        + 'jossa presidentti on sekä valtion- että hallituksen päämies. '
        + 'Lainsäädäntövalta on kaksikamarisella kongressilla, ja tuomiovalta '
        + 'on hallituksesta ja kongressista riippumaton: ylimpiä '
        + 'tuomioistuimia on neljä, perustuslakituomioistuin, korkein oikeus, '
        + 'valtioneuvosto ja ylin tuomarineuvosto. Vuoden 1991 perustuslaki '
        + 'toi mukanaan tutela-menettelyn, jolla kuka tahansa voi viedä '
        + 'perusoikeuksiensa loukkauksen heti tuomarin ratkaistavaksi, jos '
        + 'muuta keinoa ei ole. Presidentti valitaan yhdeksi neljän vuoden '
        + 'kaudeksi, eikä hän ole vuodesta 2015 saanut asettua uudelleen '
        + 'ehdolle edes välivuosien jälkeen. Senaatin 108 jäsentä valitaan '
        + 'yhdellä valtakunnallisella listalla ja edustajainhuoneen 172 '
        + 'jäsentä 32 departementin vaalipiireistä. The Economist '
        + 'Intelligence Unit luokitteli Kolumbian 2024 puutteelliseksi '
        + 'demokratiaksi.',
    },
    keskitulo: {
      arvo: '7 090 $/v',
      sija: '93./190',
    },
    tervehdykset: [
      { teksti: 'Buenos días', kieli: 'espanja', lippu: 'Flag of Colombia.svg', osuus: '99 %' },
      { teksti: 'Good morning', kieli: 'englanti (San Andrésin saaret)', lippu: 'Flag of the United Kingdom.svg', osuus: '0,2 %' },
      { teksti: 'Bom dia', kieli: 'portugali (Amazonin rajaseutu)', lippu: 'Flag of Brazil.svg', osuus: '0,1 %' },
    ],
  },
  ECU: {
    vakiluku: '18 milj.',
    vakilukuSija: '70./195',
    pintaAla: '256 000 km²',
    pintaAlaSija: '76./195',
    demokratia: {
      arvo: '0,39',
      sija: '77./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~ECU',
      selitys: 'Ecuadorissa presidentti ja yksikamarinen kansalliskokous valitaan '
        + 'samoissa vaaleissa neljäksi vuodeksi, ja molemmat voidaan valita '
        + 'uudelleen välittömästi. Äänestäminen on pakollista lukutaitoisille '
        + '18–65-vuotiaille ja vapaaehtoista 16- ja 17-vuotiaille. Puolueet '
        + 'ovat perinteisesti olleet pieniä ja johtajakeskeisiä, ja ne ovat '
        + 'hajonneet tiheään sisäisiin riitoihin. Alkuperäiskansat luopuivat '
        + 'virallisen politiikan boikotista vuoden 1996 vaaleissa, ja niiden '
        + 'Pachakutik-puolueesta tuli merkittävä voima. Maata pidetään '
        + 'hauraana demokratiana: sen on arvioitu heikentyneen Rafael Correan '
        + '(2007–2017) ja Daniel Noboan (2023–) kausilla, ja Economist '
        + 'Intelligence Unit luokitteli Ecuadorin 2022 hybridihallinnoksi.',
    },
    keskitulo: {
      arvo: '6 400 $/v',
      sija: '96./190',
    },
    tervehdykset: [
      { teksti: 'Buenos días', kieli: 'espanja', lippu: 'Flag of Ecuador.svg', osuus: '93 %' },
      { teksti: 'Allin p\'unchay', kieli: 'kichwa (ketšua)', lippu: 'Wiphala.svg', osuus: '3 %' },
    ],
  },
  PER: {
    vakiluku: '34 milj.',
    vakilukuSija: '48./195',
    pintaAla: '1,3 milj. km²',
    pintaAlaSija: '19./195',
    demokratia: {
      arvo: '0,51',
      sija: '62./172',
      linkki: 'https://ourworldindata.org/grapher/liberal-democracy-index?country=~PER',
      selitys: 'Peru on yksikkövaltio, jossa presidentti ja kongressi kilpailevat '
        + 'vallasta. Kongressi voi erottaa presidentin "pysyvän moraalisen '
        + 'kyvyttömyyden" perusteella, eikä päätöstä juuri voi riitauttaa '
        + 'tuomioistuimessa, joten institutionaalinen valta on suurelta osin '
        + 'kongressilla. Demokratia palautettiin 1980, mutta Alberto '
        + 'Fujimorin kausi 1990–2000 katkaisi sen, ja uusi siirtymä tehtiin '
        + 'vuonna 2000. Puolueet ovat heikkoja ja rakentuvat henkilöiden '
        + 'ympärille; politiikantutkija Lucía Dammert kuvaa niitä yksilö- ja '
        + 'ryhmäetujen kasaumiksi ennemmin kuin puolueiksi. Economist '
        + 'Intelligence Unit luokitteli Perun 2024 hybridihallinnoksi, ja '
        + 'maata on kuvattu yhdeksi Latinalaisen Amerikan poliittisesti '
        + 'epävakaimmista.',
    },
    keskitulo: {
      arvo: '7 530 $/v',
      sija: '88./190',
    },
    tervehdykset: [
      { teksti: 'Buenos días', kieli: 'espanja', lippu: 'Flag of Peru.svg', osuus: '94 %' },
      { teksti: 'Allin p\'unchay', kieli: 'ketšua', lippu: 'Wiphala.svg', osuus: '14 %' },
      { teksti: 'Suma urukiya', kieli: 'aimara', lippu: 'Flag of Bolivia.svg', osuus: '1,7 %' },
    ],
  },
};
