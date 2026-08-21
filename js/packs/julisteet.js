/*
 * AIKAKAUSJULISTEET: kaupunkilehden minitehtävän palkinto.
 *
 * Omistajan tilaus 21.8.2026: "Juliste voisi näkyä jo pienenä
 * kysymysten vierellä ja aueta isommaksi sitten kun tulee oikea
 * vastaus. Palkinto rahana myös lisäksi." Päätoimittajan täydennys:
 * voitettu juliste tallentuu matkalaukkuun julistekokoelmaksi.
 *
 * Juliste on kivipainettu matkailuilmoitus siltä vuosikymmeneltä, jota
 * isoisä matkusti: oikea yhtiö, oikea reitti, oikea vuosiluku. Se on
 * PELIN OMAA TUOTANTOA eikä Commonsista peilattua aineistoa — siksi
 * lähderivi on "Matkakirjan oma paino" eikä kuvaajan nimi ja lisenssi.
 *
 * TIEDOSTOT EIVÄT OLE REPOSSA (omistajan linjaus 21.8.2026: "kaikki
 * aina ämpäriin eikä repoon"). Ne asuvat peiliämpärin kansiossa
 * julisteet/, ja peli rakentaa osoitteen js/media.js:n julisteUrl():lla
 * samasta juuresta kuin muunkin peilatun aineiston. Vienti ämpäriin
 * tehdään erikseen (ks. .github/workflows/peilaa.yml -salaisuudet);
 * ennen sitä kuvapaikka jää tyhjäksi, mutta mikään muu ei rikkoudu.
 *
 * PNG ALKUPERÄISESSÄ LAADUSSA (omistajan tarkennus samalta päivältä:
 * "julisteet pidetään alkuperäisessä laadussa"). Repon kuvakiintiö ei
 * koske ämpäriä, joten pakkaamiseen ei ole syytä — juliste on pelin
 * ainoa kuva, jota katsotaan koko ruudun kokoisena palkintona.
 *
 * TÄMÄ TAULU ON YKSI TOTUUSLÄHDE. Sama taulu ohjaa kolmea asiaa:
 * minitehtävän palkintokuvaa (js/ui.js piirraMinitehtava), matkalaukun
 * julistekokoelmaa (js/ui.js renderJulisteet) ja kehittäjätilan kartan
 * vihreää merkintää (js/ui.js valmiusLuokka). Uusi juliste lisätään
 * tänne — ei kolmeen paikkaan.
 *
 * Kentät: `tiedosto` on nimi ämpärin kansiossa julisteet/, `kaupunki`
 * on lyhyt nimi matkalaukun kokoelmarivin alle (koko otsikko murtuisi
 * pikkukuvan levyisenä keskeltä sanaa), `otsikko` ja `selite` näkyvät
 * suurennoksessa — selite on julisteen ilmoitustekstin SUOMENNOS
 * (omistaja 21.8.2026: juliste on pelkällä alkuperäiskielellä ja
 * käännös tulee pelin tekstinä kuvan alle).
 *
 * Avain on KAUPUNGIN tunnus: juliste on kaupunkilehden palkinto, ja
 * maan yhteinen aihesivu ei palkitse julisteella (js/ui.js tarkistaa
 * lehtitilan). Selite on yksi virke, kuten lehden kuvatekstit.
 */
/**
 * Julisteiden yhteinen lähderivi. Sama teksti joka julisteella, joten
 * se on vakio eikä kenttä: peli painoi julisteen itse, eikä
 * tekijätietoa ole tiedostokohtaisesti (vrt. valokuvien `lahde`).
 */
export const JULISTE_LAHDE = 'Matkakirjan oma paino';

export const JULISTEET = {
  istanbul: {
    tiedosto: 'istanbul.png',
    kaupunki: 'Istanbul',
    otsikko: 'Konstantinopoli — Orient Express',
    selite: 'Kansainvälinen makuuvaunuyhtiö — Orient Express. Pariisi — Wien — '
      + 'Konstantinopoli, ensimmäinen suora yhteys 1883; makuu- ja '
      + 'ravintolavaunut Sirkecin asemalta kahdesti viikossa.',
  },
  tokio: {
    tiedosto: 'tokio.png',
    kaupunki: 'Tokio',
    otsikko: 'Tokio — keisarikunnan ensimmäinen rautatie',
    selite: 'Japanin keisarillinen valtionrautatie. Shinbashi (Tokio) — Yokohama, '
      + 'keisarikunnan ensimmäinen rautatie, avattu Meijin 5. vuonna (1872); '
      + 'yhdeksän junaa päivässä, matka 53 minuuttia.',
  },
  moskova: {
    tiedosto: 'moskova.png',
    kaupunki: 'Moskova',
    otsikko: 'Moskova — Nikolain rautatie',
    selite: 'Nikolain rautatie. Moskova — Pietari, 604 virstaa, avattu vuonna '
      + '1851; pikajunat päivittäin Nikolain asemalta, ensimmäisen luokan '
      + 'makuuvaunut.',
  },
  lontoo: {
    tiedosto: 'lontoo.png',
    kaupunki: 'Lontoo',
    otsikko: 'Lontoo — Metropolitan Railway',
    selite: 'Metropolitan Railway. Maailman ensimmäinen maanalainen rautatie, '
      + 'avattu 1863; Paddington — Farringdon Street, junat kymmenen minuutin '
      + 'välein.',
  },
  kairo: {
    tiedosto: 'kairo.png',
    kaupunki: 'Kairo',
    otsikko: 'Kairo — Niilin höyrylaivat',
    selite: 'Niilin höyrylaivat. Viikoittaiset matkat Kairosta Assuaniin ja '
      + 'ensimmäiselle kataraktille kaudesta 1869 alkaen.',
  },
  xian: {
    tiedosto: 'xian.png',
    kaupunki: 'Xi’an',
    otsikko: 'Xi’an — Silkkitien vekselipankki',
    selite: 'Rishengchangin vekselipankki, perustettu 1823. Vekselit lunastetaan '
      + 'keisarikunnan joka maakunnassa — Silkkitien kaupan rahanvaihto.',
  },
  pariisi: {
    tiedosto: 'pariisi.png',
    kaupunki: 'Pariisi',
    otsikko: 'Pariisi — maailmannäyttely 1889',
    selite: 'Vuoden 1889 maailmannäyttely. Kolmensadan metrin torni, nousu '
      + 'hisseillä — Champ de Mars, toukokuusta lokakuuhun.',
  },
  delhi: {
    tiedosto: 'delhi.png',
    kaupunki: 'Delhi',
    otsikko: 'Delhi — East Indian Railway',
    selite: 'East Indian Railway. Delhin risteysasema avattu 1864 — vaunut '
      + 'Kalkuttaan asti, 954 mailia; lipunmyynti Chandni Chowkin '
      + 'konttorissa.',
  },
  peking: {
    tiedosto: 'peking.png',
    kaupunki: 'Peking',
    otsikko: 'Peking — Tong Ren Tangin apteekki',
    selite: 'Tong Ren Tangin apteekki, perustettu 1669. Keisarillisen hovin '
      + 'lääkkeiden toimittaja — Dashilanin kadulla Qianmenin ulkopuolella.',
  },
  samarkand: {
    tiedosto: 'samarkand.png',
    kaupunki: 'Samarkand',
    otsikko: 'Samarkand — Taka-Kaspian rautatie',
    selite: 'Taka-Kaspian rautatie. Krasnovodsk — Samarkand, pääteasema '
      + 'saavutettu 1888; kahdesti viikossa, yhteys Kaspian höyrylaivoihin.',
  },
};

/** Kaupungin juliste tai null. Yksi kysely, jotta tarkistus on samanlainen kaikkialla. */
export function kaupunginJuliste(cityId) {
  return JULISTEET[cityId] ?? null;
}
