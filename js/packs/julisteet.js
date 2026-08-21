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
 * suurennoksessa.
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
    selite: 'Kivipainojuliste Galatan laiturilta: höyrylaiva ankkurissa Kultaisen '
      + 'sarven suulla, takana Hagia Sofia ja Sininen moskeija, alla '
      + 'makuuvaunuyhtiön ilmoitus Pariisista Konstantinopoliin.',
  },
  tokio: {
    tiedosto: 'tokio.png',
    kaupunki: 'Tokio',
    otsikko: 'Tokio — keisarikunnan ensimmäinen rautatie',
    selite: 'Kivipainojuliste Shinbashin asemalta: veturi odottaa laiturin vieressä '
      + 'kimono- ja hattupukuisten matkustajien katsellessa, ja horisontissa '
      + 'häämöttää Fuji.',
  },
  moskova: {
    tiedosto: 'moskova.png',
    kaupunki: 'Moskova',
    otsikko: 'Moskova — Nikolain rautatie',
    selite: 'Kivipainojuliste jäätyneen Moskovajoen yli: kolmivaljakko ylittää '
      + 'jäätietä, rannalla Kremlin muuri ja tornit, kauempana Vasili Autuaan '
      + 'kupolit talviauringossa.',
  },
  lontoo: {
    tiedosto: 'lontoo.png',
    kaupunki: 'Lontoo',
    otsikko: 'Lontoo — Metropolitan Railway',
    selite: 'Kivipainojuliste Thamesin rannalta: siipirataslaiva savuaa parlamenttitalon '
      + 'ja Big Benin ohi, ja alla ilmoittaa maailman ensimmäinen maanalainen rautatie.',
  },
  kairo: {
    tiedosto: 'kairo.png',
    kaupunki: 'Kairo',
    otsikko: 'Kairo — Niilin höyrylaivat',
    selite: 'Kivipainojuliste Niilin rannalta: siipirataslaiva ja feluccat laiturissa, '
      + 'ylhäällä kukkulalla Muhammad Alin moskeija ja kaukana Gizan pyramidit.',
  },
  xian: {
    tiedosto: 'xian.png',
    kaupunki: 'Xi’an',
    otsikko: 'Xi’an — Silkkitien vekselipankki',
    selite: 'Kivipainojuliste kaupunginmuurin juurelta: kamelikaravaani kulkee '
      + 'vallihaudan vartta porttitornin ohi, ja ilmoitus lupaa vekselin '
      + 'lunastuksen joka maakunnassa.',
  },
  pariisi: {
    tiedosto: 'pariisi.png',
    kaupunki: 'Pariisi',
    otsikko: 'Pariisi — maailmannäyttely 1889',
    selite: 'Kivipainojuliste Seinen rannalta: kolmensadan metrin torni kohoaa sillan '
      + 'ja kirjakojujen takaa, ja höyrylaiva vie näyttelyvieraita Champ de Marsille.',
  },
  delhi: {
    tiedosto: 'delhi.png',
    kaupunki: 'Delhi',
    otsikko: 'Delhi — East Indian Railway',
    selite: 'Kivipainojuliste torilta Punaisen linnakkeen ja Perjantaimoskeijan välissä: '
      + 'härkävaunut odottavat kuormineen ja leijat nousevat kattojen yli.',
  },
  peking: {
    tiedosto: 'peking.png',
    kaupunki: 'Peking',
    otsikko: 'Peking — Tong Ren Tangin apteekki',
    selite: 'Kivipainojuliste Qianmenin porttitornin edustalta: Dashilanin katu on '
      + 'täynnä kylttejä ja kärryjä, ja etäällä siintää Taivaan temppelin kupoli.',
  },
  samarkand: {
    tiedosto: 'samarkand.png',
    kaupunki: 'Samarkand',
    otsikko: 'Samarkand — Taka-Kaspian rautatie',
    selite: 'Kivipainojuliste Registanin aukiolta: kamelit lepäävät kaakelipintaisten '
      + 'medresojen edessä, ja ilmoitus kertoo radan yltäneen Krasnovodskista asti.',
  },
};

/** Kaupungin juliste tai null. Yksi kysely, jotta tarkistus on samanlainen kaikkialla. */
export function kaupunginJuliste(cityId) {
  return JULISTEET[cityId] ?? null;
}
