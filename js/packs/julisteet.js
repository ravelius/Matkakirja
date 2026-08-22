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
    selite: 'Orient Express — makuuvaunujunan palvelu Sirkecin asemalta, '
      + 'vuonna 1883.',
  },
  tokio: {
    tiedosto: 'tokio.png',
    kaupunki: 'Tokio',
    otsikko: 'Tokio — keisarikunnan ensimmäinen rautatie',
    selite: 'Valtion rautatie. Shinbashi (Tokio) — Yokohama, avattu Meijin '
      + '5. vuonna (1872); yhdeksän edestakaista vuoroa päivässä.',
  },
  moskova: {
    tiedosto: 'moskova.png',
    kaupunki: 'Moskova',
    otsikko: 'Moskova — Nikolain rautatie',
    selite: 'Nikolain rautatie. Moskova — Pietari, 604 virstaa, avattu vuonna '
      + '1851; kuriirijunat päivittäin, ensimmäisen luokan makuuvaunut.',
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
    selite: 'Ilmoitus: viikoittaiset Niilin-matkat höyrylaivalla Kairosta '
      + 'Assuaniin — vuonna 1869.',
  },
  xian: {
    tiedosto: 'xian.png',
    kaupunki: 'Xi’an',
    otsikko: 'Xi’an — Silkkitien vekselipankki',
    selite: 'Rishengchangin vekselipankki, perustettu Daoguangin kaudella '
      + '(1823) — vekselit lunastetaan keisarikunnan joka maakunnassa.',
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
    selite: 'East Indian Railway -yhtiön yhteys Delhistä Kalkuttaan, avattu '
      + 'vuonna 1864; matkustaja- ja tavarajunat päivittäin, liput '
      + 'asemalta.',
  },
  peking: {
    tiedosto: 'peking.png',
    kaupunki: 'Peking',
    otsikko: 'Peking — Tong Ren Tangin apteekki',
    selite: 'Tong Ren Tangin apteekki Dashilanin kadulla, perustettu Kangxin '
      + '8. vuonna (1669); aidot rohdokset, pillerit ja voiteet, tilaukset '
      + 'myös kirjeitse läheltä ja kaukaa — rehellinen kauppa vanhalle ja '
      + 'nuorelle.',
  },
  samarkand: {
    tiedosto: 'samarkand.png',
    kaupunki: 'Samarkand',
    otsikko: 'Samarkand — Taka-Kaspian rautatie',
    selite: 'Taka-Kaspian rautatie. Krasnovodskista Samarkandiin, pääteasema '
      + 'saavutettu vuonna 1888; kahdesti viikossa.',
  },
};

/** Kaupungin juliste tai null. Yksi kysely, jotta tarkistus on samanlainen kaikkialla. */
export function kaupunginJuliste(cityId) {
  return JULISTEET[cityId] ?? null;
}
