/*
 * TUTKI KÄTKÖ -PELIT — työhuoneen Pelit-välilehden aineisto.
 *
 * Omistajan linjaus 10.8.2026: "tutki kätkö -pelit" on kattonimi
 * kaikelle, mitä Etsi kätkö -napin takaa voi paljastua — visat,
 * pulmat ja tulevat pelityypit. Ne ovat pelin ydinsilmukka (toistuvat
 * jokaisella laatalla), joten niitä kehitetään mahdollisimman
 * vaihteleviksi ja korkeatasoisiksi, ja jokainen peli synkataan
 * laatan tarinaan: kaupungin matkakertomus ja kohtaamishenkilö
 * määräävät sävyn, ja arvonnan pitää osata valita tarinaan sopiva
 * peli. TÄTÄ TIEDOSTOA PÄIVITTÄÄ FABLE omistajan kanssa käytyjen
 * keskustelujen perusteella.
 */

export const PELIT = {
  paivitetty: '10.8.2026',
  johdanto: 'Tutki kätkö -pelit ovat kaikki ne tehtävät, jotka voivat '
    + 'paljastua Etsi kätkö -napin takaa. Pysähdyksessä on aina '
    + 'täsmälleen yksi peli. Kaupungin ensimmäinen peli on AINA '
    + 'luettu kohtaaminen — myös pulmakaupungeissa ja laatattomissa '
    + 'kaupungeissa (omistajan tarkennus 10.8. illalla: henkilön ja '
    + 'kertojan äänen on tultava joka kaupungissa). Saapumiskortin '
    + 'nappi nimeää henkilön ("Tapaa Nikos"). Pulma ja muut muodot '
    + 'vaihtelevat kohtaamisen jälkeisillä pysähdyksillä painotetulla '
    + 'arvonnalla. Tälle sivulle on koottu nykyiset pelityypit ja '
    + 'ehdotukset uusiksi — kehitysjärjestys ja uudet tyypit valitaan '
    + 'yhdessä omistajan kanssa.',
  periaatteet: [
    'Yksi peli per pysähdys — pelit eivät koskaan kasaudu peräkkäin.',
    'Tarinasynkka: kaupungin saapumiskertomus ja kohtaamishenkilö '
      + 'määräävät sävyn. Kaaren kohtaamisvisa on kirjoitettu käsin '
      + 'joka kaupungille; muiden pelien sisältö nojaa laudan omaan '
      + 'aineistoon (kysymykset, kuvat, liput, tapahtumat).',
    'Mitä useampi pelityyppi sopii samaan tarinaan, sitä paremmin '
      + 'arvonta toimii — uusia tyyppejä suunniteltaessa mietitään '
      + 'heti, mihin tarinoihin ne istuvat.',
    'Ratkaistavuus: pelin on auettava siitä mitä ruudulla näkyy, '
      + 'ilman ulkoa opettelua. Kuvat ovat oikeita ja tarkistettuja '
      + '(valokuvapulman linja), piirrokset selväsanaisia.',
    'Ääni: kohtaaminen ja aarrevihje luetaan ääneen. Uusille '
      + 'pelityypeille päätetään erikseen, mikä osa luetaan.',
  ],
  nykyiset: [
    {
      nimi: 'Kohtaamisvisa (tarinakaari)',
      tila: 'pelissä, luettu ääneen',
      kuvaus: 'Kaupungin ensimmäinen peli joka kaupungissa: tarinan '
        + 'henkilö tervehtii, kertoja lukee kohtaamisen, ja peli '
        + 'alkaa vasta Aloita peli -napista — tiimalasi ei kulu '
        + 'luennan aikana. Oikeasta vastauksesta laatta kääntyy; '
        + 'laatattomassa kaupungissa kätkö löytyy silti (aarreteksti '
        + 'luetaan ja löytöpalkkio maksetaan). Epäonnistumisen saa '
        + 'yrittää uudelleen kerran ("Viimeinen mahdollisuus '
        + 'tavata"); toisen jälkeen henkilö ei ole tavattavissa, ja '
        + 'onnistumisen jälkeen nappi harmaantuu.',
      synkka: 'Täysi — per kaupunki käsin kirjoitettu pari.',
    },
    {
      nimi: 'Tietovisa',
      tila: 'pelissä',
      kuvaus: 'Monivalinta kaupungin omasta kysymyspankista (vähintään '
        + 'viisi kysymystä per kaupunki) tai yleispakasta. Vaikeustaso '
        + 'nousee pelaajan tason mukana.',
      synkka: 'Kaupunkikohtaiset kysymykset.',
    },
    {
      nimi: 'Isoisän väittämä',
      tila: 'pelissä (laudoilla joilla väittämäpankki)',
      kuvaus: 'Päiväkirjamerkintä vuodelta 1873: pitääkö tämä yhä '
        + 'paikkansa? Kaksi nappia — totta tai taru. Paikka näkyy '
        + 'otsikossa.',
      synkka: 'Merkintä sidottu paikkaan; sävy on suoraan isoisän.',
    },
    {
      nimi: 'Valokuvakysymys',
      tila: 'pelissä',
      kuvaus: 'Oikea valokuva ja kysymys "mikä paikka tämä on". Kuvat '
        + 'käytiin läpi v494:ssä: jokaisessa näkyy jotain '
        + 'tunnistettavaa.',
      synkka: 'Laudan omat, tarkistetut kuvat.',
    },
    {
      nimi: 'Lippukysymys',
      tila: 'pelissä (laudoilla joilla maita)',
      kuvaus: 'Minkä maan lippu? Vaihtoehdot laudan omista maista.',
      synkka: 'Laudan maat.',
    },
    {
      nimi: 'Tapahtumakortti',
      tila: 'pelissä',
      kuvaus: 'Kysymyksen sijaan tapahtuu jotain — pieni tarinallinen '
        + 'käänne, jonka vaikutus kerrotaan kortin lopussa.',
      synkka: 'Laudan tapahtumapankki.',
    },
    {
      nimi: 'Isoisän piirrospulma',
      tila: 'pelissä; kääntää laatan (v478)',
      kuvaus: 'Luonnoskirjan tehtävä, joka ratkeaa piirroksesta: '
        + 'roomalaiset numerot, Stonin suola-altaat, geysirin kello, '
        + 'vuoroveden laiturit, kellokukko… Joka pelikerralla hieman '
        + 'erilainen. Pulma on pysähdyksen ainoa peli ja tulee '
        + 'kohtaamisen jälkeisellä pysähdyksellä; jos laatta on '
        + 'silloin vielä kääntämättä, oikea ratkaisu kääntää sen.',
      synkka: 'Käsin tehty kaupunkia varten.',
    },
    {
      nimi: 'Valokuvapulma — UUSI',
      tila: 'pilotti pelissä (v503, Ateena)',
      kuvaus: 'Isoisän luonnos näyttää yhden pylväänpään; vaihtoehdot '
        + 'ovat oikeita valokuvia Ateenan pylväistä, ja neljäntenä on '
        + 'harhautus (Erekhtheionin karyatidi). Monistetaan muihin '
        + 'pulmiin omistajan hyväksynnän jälkeen — vain sinne, missä '
        + 'oikea kuva opettaa enemmän kuin piirros.',
      synkka: 'Kaupungin omat, silmin tarkistetut kuvat.',
    },
    {
      nimi: 'Vaikea kysymys',
      tila: 'pelissä',
      kuvaus: 'Pelaajan oma valinta: isompi riski, rahapalkkio. Aina '
        + 'monivalinta.',
      synkka: 'Kaupungin vaikeat kysymykset.',
    },
    {
      nimi: 'Tietoportti',
      tila: 'pelissä',
      kuvaus: 'Oikea vastaus avaa portin toiselle laudalle ja matka '
        + 'jatkuu ilmaiseksi.',
      synkka: 'Kysymys liittyy kohdelautaan.',
    },
    {
      nimi: 'Rosvon kaksintaistelu',
      tila: 'pelissä',
      kuvaus: 'Rosvo esittää kiperän kysymyksen kahdeksalla '
        + 'vaihtoehdolla — panoksena rahat.',
      synkka: 'Laudan kaksintaistelupankki.',
    },
    {
      nimi: 'Tutkiminen ilman laattaa',
      tila: 'pelissä vain kaarettomilla laudoilla (Afrikka, Aasia…)',
      kuvaus: 'Laatattomassa kaupungissa paikkaa voi tutkia kerran: '
        + 'kevyt kysymys, löytöpalkkio oikeasta. POISTETTU '
        + 'kaarikaupungeista 10.8. (omistajan päätös: kohtaamisen '
        + 'rinnalla vanha kevyt kysymys oli kaksi juttua päällekkäin) '
        + '— Euroopassa laataton tehtävä on aina kohtaaminen.',
      synkka: 'Kaupungin kysymyspankki.',
    },
  ],
  /*
   * EHDOTUKSET — ei vielä päätetty. Jokaisessa on mietitty valmiiksi
   * tarinasynkka: mihin kertomuksiin ja kaupunkeihin tyyppi istuu.
   * Valitaan yhdessä omistajan kanssa, mitkä tehdään ja missä
   * järjestyksessä; jokainen pilotoidaan yhdessä kaupungissa.
   */
  ehdotukset: [
    {
      nimi: 'Aikajanapeli',
      kuvaus: 'Järjestä kolme tapahtumaa tai rakennusta '
        + 'ikäjärjestykseen napauttamalla. Vastaus näkyy vuosilukuina '
        + 'vasta lopuksi.',
      sopii: 'Historiapainotteiset tarinat: Rooma, Ateena, Istanbul, '
        + 'Kairo — kaupungit joissa kerrostumat ovat itse tarina.',
    },
    {
      nimi: 'Paripeli (kuva + nimi)',
      kuvaus: 'Kolme oikeaa valokuvaa ja kolme nimeä — yhdistä oikein. '
        + 'Valokuvapulman sisar, sama kuvakuri.',
      sopii: 'Kaupungit joilla on kohdekartta ja nähtävyysjutut '
        + '(30 kaupunkia): kuvat ja nimet ovat jo olemassa.',
    },
    {
      nimi: 'Karttapulma',
      kuvaus: 'Isoisän vihje ("torni joen itärannalla, sillan '
        + 'kupeessa") ja kaupungin kohdekartta — napauta oikeaa '
        + 'kohdetta.',
      sopii: 'Suunnistustarinat ja satamakaupungit; vaatii '
        + 'kohdekartan. Yhdistyy kauniisti saapumiskertomukseen.',
    },
    {
      nimi: 'Äänipulma',
      kuvaus: 'Kuuntele lyhyt ääni (kirkonkellot, raitiovaunu, '
        + 'satama, basaari) ja valitse mistä se kuuluu — tai mikä '
        + 'neljästä äänestä sopii tähän paikkaan.',
      sopii: 'Kaupungit joilla on oma äänimaisema; erottuu muista '
        + 'koska on ainoa kuunneltava peli.',
    },
    {
      nimi: 'Silmämittapeli',
      kuvaus: 'Kaksi oikeaa valokuvaa: kumpi torni on korkeampi, '
        + 'kumpi silta vanhempi? Yksi napautus, fakta perään.',
      sopii: 'Rakennus- ja insinööritarinat: Pariisi, Lontoo, '
        + 'Köln, Dubai.',
    },
    {
      nimi: 'Matkatavarapulma',
      kuvaus: 'Mitä isoisä pakkasi laukkuunsa juuri tähän kaupunkiin? '
        + 'Valitse esine, joka sopii ilmastoon ja tarinan '
        + 'vuodenaikaan.',
      sopii: 'Sää- ja luontotarinat: Tromssa, Islanti, Lappi, '
        + 'aavikkokaupungit. Nojaa lehden sääriviin.',
    },
    {
      nimi: 'Reittipulma',
      kuvaus: 'Miten tähän kaupunkiin pääsi vuonna 1873 — juna, '
        + 'höyrylaiva, kameli vai jalan? Kartta ja kolme reittiä, '
        + 'joista yksi oli oikeasti mahdollinen.',
      sopii: 'Matkanteon tarinat ja käännekohdat: kanavat, solat, '
        + 'satamat (Suez, Brennero, Gibraltar).',
    },
    {
      nimi: 'Kirjepulma',
      kuvaus: 'Isoisän kirjeestä on repeytynyt sana — valitse neljästä '
        + 'se, joka täydentää lauseen niin että faktat täsmäävät.',
      sopii: 'Kirjalliset tarinat: Vilna (Oppi), Kööpenhamina '
        + '(Sadut), Dublin. Kevyt tehdä, koska nojaa tekstiin.',
    },
  ],
};
