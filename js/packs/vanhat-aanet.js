/*
 * VANHAT ÄÄNITALLENTEET — lehden ääniriville se toinen puoli.
 *
 * Omistajan tilaus 21.8.2026: kaupunkilehden ääniriville kaksi puolta,
 * vasemmalle vanha tallenne ("vanhan kuvan alapuolelle"), oikealle
 * nykyinen radionappi. Sama ENNEN ja NYT -ajatus kuin v986:n
 * kuvaparissa, mutta korvalle: pelaaja kuulee ensin miltä paikka
 * kuulosti gramofonin aikaan ja heti perään miltä se kuulostaa
 * tänään suorana lähetyksenä.
 *
 * MIKSI OMA PAKETTI EIKÄ radiot.js: radiot.js on KONEEN kirjoittama
 * (tools/hae-radiot.mjs + tools/kirjoita-radiot.mjs Radio Browserin
 * aineistosta) ja sen tiedostokommentti kieltää käsin muokkaamisen —
 * seuraava haku pyyhkisi käsin lisätyt kentät. Nämä tallenteet taas
 * etsitään käsin Commonsista lisenssi kerrallaan, joten ne asuvat
 * omassa paketissaan. Kulttuurikategorioiden kaupunki-lohko ei
 * sekään kelpaisi: äänirivi piirtyy myös maalehdessä, jolla ei ole
 * kaupunkia lainkaan.
 *
 * AVAIN ON KAUPUNKI, VARALLA MAA (omistajan linjaus): "Radio on maan
 * radio niin tallenne voi olla samoin maan tarvittaessa mutta jos
 * löytyy erilaisia eri kaupunkeihin saman maan sisällä niin parempi."
 * Kaupungin oma tallenne voittaa aina maan tallenteen. Kaupunkitunnus
 * on sama kuin lautapaketeissa (city.id), maatunnus sama ISO-3 jota
 * map.cityCountry ja radiot.js käyttävät.
 *
 * KENTÄT
 *   nimi      napissa näkyvä tallenteen nimi
 *   vuosi     napissa nimen perässä; saa olla väli ("1907–1925")
 *   esittaja  kuka soittaa tai laulaa — lähderiville
 *   url       SOIVA tiedosto suoraan Commonsista (upload.wikimedia.org).
 *             Tiedostoa EI ladata repoon: repokiintiö on 74 %, ja
 *             yksikin 78-kierroksinen levy on megatavuja.
 *   lahde     lähderivi napin alle (arkisto + lisenssi lyhyesti)
 *   lisenssi  lisenssin lyhytnimi sellaisena kuin Commons sen antaa
 *
 * LISENSSIT on tarkistettu Commonsin extmetadatasta ja tiedostosivun
 * lisenssimallista tiedosto kerrallaan; perustelu on kunkin lohkon
 * kommentissa. Kelpaavat PD, CC0, CC BY ja CC BY-SA — sama sääntö
 * kuin kuvissa.
 *
 * PILOTTI 21.8.2026: kolme kaupunkia kolmelta vaikeustasolta —
 * Lontoo (helppo) ja Kairo (keskitaso) löytyivät, Ulan Bator (vaikea)
 * EI. Ks. tiedoston loppu: mitä Mongolialle etsittiin ja miksi mitään
 * ei kelpuutettu. Laajennus muihin kaupunkeihin on pelkkä data-lisäys.
 */

/** Kaupunkikohtaiset tallenteet (city.id). */
export const VANHAT_AANET = {
  /*
   * LONTOO — Florrie Forde, "Hold Your Hand Out, Naughty Boy" (1913).
   *
   * Lontoon musiikkihallien suurin tähti levytettynä silloin kun halli
   * oli kaupungin ääni. Australiassa syntynyt Forde nousi Lontoon
   * varieteelavojen ykköseksi kertosäkeillä, jotka koko sali lauloi
   * mukana, ja tämä oli hänen vuoden 1913 hittinsä. Vastapari
   * nykyiselle BBC World Servicelle on siis sama kaupunki sata vuotta
   * aiemmin.
   *
   * LEVY: Edison Blue Amberol 23118, brittiläinen sarja, julkaisuvuosi
   * 1913, "vocal with orchestra accompaniment" (UCSB Cylinder Audio
   * Archive, Cylinder 9783, Edouard Pecourt'n kokoelma). Neljän
   * minuutin Blue Amberol selittää myös tallenteen pituuden 4.08.
   *
   * LISENSSIPERUSTE: Commonsin tiedostosivulla {{PD-old-70}} —
   * esittäjä Florrie Forde kuoli 1940 ja sanoittajat C. W. Murphy
   * (k. 1913) ja Worton David (k. 1940), joten tekijänoikeus raukesi
   * viimeistään 1940 + 70 = 2011. Digitointi on Kalifornian
   * yliopiston (UCSB) Cylinder Audio Archivesta, joka julkaisee
   * vahakääröt vapaasti. Tarkistettu Commonsin extmetadatasta
   * 21.8.2026: LicenseShortName = "Public domain".
   */
  lontoo: {
    nimi: 'Hold Your Hand Out, Naughty Boy',
    vuosi: '1913',
    esittaja: 'Florrie Forde',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Hold_your_hand_out%2C_naughty_boy.mp3',
    lahde: 'UCSB Cylinder Audio Archive · Commons, PD',
    lisenssi: 'PD-old-70',
  },

  /*
   * KAIRO — Sheikh Sayed El-Safti, "Ana fi Sabil Allah" (1907–1925).
   *
   * Juuri sitä varhaista tarab-levytystä, jota omistaja pyysi:
   * Gramophone Co. ja sen kilpailijat levyttivät Kairossa 1903
   * alkaen, ja Sayed el-Safti (1875–1939) oli niiden ensimmäisen
   * polven suuria laulajia — hän levytti 1907 alkaen ja viimeksi noin
   * 1931. Kappale on qasida eli klassinen arabialainen runo
   * laulettuna, säestäjinä viulu, kanun ja ney; levy on Parlophonen
   * Bx 5708-I, matriisi 1344, akustiselta ajalta ennen sähköistä
   * äänitystä (Jonathan Wardin Excavated Shellac -aineistokuvaus,
   * johon Commonsin tiedostosivu viittaa). Julkaisuvuotta ei tiedetä
   * tarkasti, mistä Commonsin "between 1907 and 1925".
   *
   * NIMI: Commonsin tiedostonimessä lukee "Ala fi Sabil Allah",
   * mutta lähdeaineiston oma otsikko on "Ana fi Sabil Allah" ("Olen
   * Jumalan tiellä"). Napissa näkyy oikea muoto; url osoittaa
   * Commonsin tiedostoon sen omalla nimellä.
   *
   * LISENSSIPERUSTE: Commonsin tiedostosivulla {{PD-traditional}} —
   * sävelmä ja runo ovat perinnettä, eikä niillä ole tekijää, jonka
   * suoja voisi olla voimassa. Itse levytys on Egyptissä vapaa
   * (äänitteen suoja 50 vuotta julkaisusta) ja Yhdysvalloissa
   * viimeistään nyt: Music Modernization Act vapautti ennen vuotta
   * 1923 julkaistut äänitteet 1.1.2022 ja vuoden 1925 levyt
   * 1.1.2026. Aineisto tuli Commonsiin Free Music Archiven kautta.
   * Tarkistettu extmetadatasta 21.8.2026: LicenseShortName =
   * "Public domain".
   */
  kairo: {
    nimi: 'Ana fi Sabil Allah',
    vuosi: '1907–1925',
    esittaja: 'Sheikh Sayed El-Safti',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Ala_fi_Sabil_Allah.ogg',
    lahde: 'Free Music Archive · Commons, PD',
    lisenssi: 'PD-traditional',
  },
};

/*
 * Maakohtainen vara (ISO-3). Käytetään vain, jos kaupungille itselleen
 * ei ole tallennetta — kaupungin oma voittaa aina. Pilotissa tyhjä:
 * kumpikin löytynyt tallenne on kaupunkinsa oma.
 *
 * ULAN BATOR JA MONGOLIA — EI KELVOLLISTA TALLENNETTA (21.8.2026).
 * Pilotin vaikea tapaus jäi tarkoituksella tyhjäksi, koska rehellinen
 * tyhjä on parempi kuin väärin merkitty ääni. Mitä etsittiin:
 *   - Commonsin haku (filetype:audio) sanoilla Mongolia, khoomei,
 *     urtiin duu, morin khuur ja Ulaanbaatar: osumat ovat nykyisiä
 *     CC-tallenteita (esim. "Zuun Langiin Joroo Luus", 2026) tai
 *     sanakirjan ääntämisnäytteitä.
 *   - Kategoriat Music of Mongolia, Folk music of Mongolia, Urtiin
 *     Duu ja Khoomei: yhtään ennen vuotta 1935 äänitettyä tiedostoa
 *     ei ole.
 *   - Lähin osuma "Bogd Khanate anthem.flac" on merkitty vuodelle
 *     1915, mutta se vuosi on SÄVELLYKSEN vuosi (Andrei Kadletz) ja
 *     tiedoston lähde on YouTube — mikään tiedostosivulla ei kerro,
 *     että ääni olisi aikakauden levytys eikä myöhempi esitys.
 *     Aikakauden tallenteeksi merkitseminen olisi ollut arvaus.
 * Varhaiset mongolialaiset etnografiset vahakääröt (esim. Berliinin
 * Phonogramm-Archiv) eivät ole vapaasti lisensoituja. Jos sellainen
 * joskus vapautuu, se lisätään tähän lohkoon avaimella MNG.
 */
export const VANHAT_AANET_MAA = {};

/**
 * Kaupungin vanha äänitallenne, tai maan oma varalta, tai null.
 *
 * Null on tavallinen vastaus eikä virhe: valtaosalla kaupungeista ei
 * ole tallennetta, ja silloin äänirivi pysyy pelkkänä radiona.
 */
export function vanhaTallenne(kaupunki, maa) {
  return (kaupunki && VANHAT_AANET[kaupunki])
    || (maa && VANHAT_AANET_MAA[maa])
    || null;
}
