/*
 * AIKAKAUSJULISTEET: kaupunkilehden minitehtävän palkinto.
 *
 * Omistajan tilaus 21.8.2026: "Juliste voisi näkyä jo pienenä
 * kysymysten vierellä ja aueta isommaksi sitten kun tulee oikea
 * vastaus. Palkinto rahana myös lisäksi." Päätoimittajan täydennys:
 * voitettu juliste tallentuu matkalaukkuun julistekokoelmaksi.
 *
 * TUOTANTOSARJA (22.8.2026) — KUPARIPIIRROS, EI KIVIPAINOILMOITUS.
 * Pilottisarja oli kivipainettu matkailuilmoitus, jossa oli oikea
 * yhtiö, oikea reitti ja tiheä englanninkielinen mainosteksti; sen
 * selite oli tuon tekstin suomennos. Grafiikkalehden luonnoskierroksen
 * jälkeen sarja piirrettiin uusiksi: nyt juliste on 1800-luvun
 * kuparipiirroksen näköinen kaupunkinäkymä, jossa lukee VAIN kaupungin
 * nimi englanniksi ja vuosiluku (LONDON 1894). Mainostekstiä ei enää
 * ole, joten vanhat "ilmoituksen suomennos" -selitteet kumoutuvat.
 *
 * Juliste on yhä PELIN OMAA TUOTANTOA eikä Commonsista peilattua
 * aineistoa — siksi lähderivi on "Matkakirjan oma paino" eikä kuvaajan
 * nimi ja lisenssi.
 *
 * TIEDOSTOT EIVÄT OLE REPOSSA (omistajan linjaus 21.8.2026: "kaikki
 * aina ämpäriin eikä repoon"). Ne asuvat peiliämpärin kansiossa
 * julisteet/, ja peli rakentaa osoitteen js/media.js:n julisteUrl():lla
 * samasta juuresta kuin muunkin peilatun aineiston. Tuotantosarja on
 * omassa alikansiossaan (julisteet/tuotanto/), jotta pilottisarja ja
 * grafiikkalehden luonnokset eivät sotkeudu siihen; julisteUrl liittää
 * polun sellaisenaan, joten alikansio kelpaa kenttään suoraan. Vienti
 * ämpäriin tehdään erikseen (ks. .github/workflows/peilaa.yml
 * -salaisuudet); ennen sitä kuvapaikka jää tyhjäksi, mutta mikään muu
 * ei rikkoudu.
 *
 * PNG ALKUPERÄISESSÄ LAADUSSA (omistajan tarkennus 21.8.2026:
 * "julisteet pidetään alkuperäisessä laadussa"). Repon kuvakiintiö ei
 * koske ämpäriä, joten pakkaamiseen ei ole syytä — juliste on pelin
 * ainoa kuva, jota katsotaan koko ruudun kokoisena palkintona.
 *
 * TÄMÄ TAULU ON YKSI TOTUUSLÄHDE. Sama taulu ohjaa kolmea asiaa:
 * minitehtävän palkintokuvaa (js/ui.js piirraMinitehtava), matkalaukun
 * julistekokoelmaa (js/ui.js renderJulisteet + avaaJulisteGalleria) ja
 * kehittäjätilan kartan vihreää merkintää (js/ui.js valmiusLuokka).
 * Uusi juliste lisätään tänne — ei kolmeen paikkaan.
 *
 * Kentät: `tiedosto` on polku ämpärin kansiossa julisteet/, `kaupunki`
 * on lyhyt nimi julistegallerian pikkuvedoksen alle (koko otsikko
 * murtuisi pikkukuvan levyisenä keskeltä sanaa), `otsikko` ja `selite`
 * näkyvät suurennoksessa.
 *
 * SELITE KERTOO KOHTEESTA, EI KUVASTA (Raamatun kuvatekstilinjaus).
 * Kuparipiirroksessa lukee vain nimi ja vuosi, joten kuvan kuvailu
 * olisi tyhjää: selite kertoo yhdellä virkkeellä, mitä kaupungissa
 * tuona vuonna tapahtui tai miksi juuri se vuosi on julisteessa.
 * Vuosi 1873 on isoisän oma matkavuosi; muut vuodet on valittu
 * tapahtuman mukaan (Lontoo 1894 Tower Bridge, Pariisi 1889
 * maailmannäyttely, Konstantinopoli 1883 Orient Express, Tokio 1872
 * ensimmäinen rautatie, Samarkand 1888 Taka-Kaspian rautatie).
 * Vuosiluku on se, joka on painettu julisteeseen — ei mikään muu.
 * Faktat tarkistettu en-Wikipediasta 22.8.2026.
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
    tiedosto: 'tuotanto/tuot-istanbul.png',
    kaupunki: 'Istanbul',
    otsikko: 'Konstantinopoli 1883',
    selite: 'Ensimmäinen Orient Express lähti Pariisista 4. lokakuuta 1883, '
      + 'mutta sen pääte oli Giurgiu Tonavan varrella — Konstantinopoliin '
      + 'matkustettiin vielä lautalla ja laivalla, ja suora juna tuli vasta '
      + 'vuonna 1889.',
  },
  tokio: {
    tiedosto: 'tuotanto/tuot-tokio.png',
    kaupunki: 'Tokio',
    otsikko: 'Tokio 1872',
    selite: 'Japanin ensimmäinen rautatie avattiin vuonna 1872 Tokion '
      + 'Shinbashista Yokohamaan; sitä ennen koko keisarikunnassa ei ollut '
      + 'metriäkään kiskoa.',
  },
  moskova: {
    tiedosto: 'tuotanto/tuot-moskova.png',
    kaupunki: 'Moskova',
    otsikko: 'Moskova 1873',
    selite: 'Isoisän matkavuonna Moskova oli keisarikunnan vanha pääkaupunki, '
      + 'jonka hallinto istui Pietarissa — kaupungin ensimmäinen hevosraitiotie '
      + 'oli avattu vasta edellisenä vuonna 1872.',
  },
  lontoo: {
    tiedosto: 'tuotanto/tuot-lontoo.png',
    kaupunki: 'Lontoo',
    otsikko: 'Lontoo 1894',
    selite: 'Walesin prinssi ja prinsessa avasivat Tower Bridgen 30. kesäkuuta '
      + '1894: kahdeksan vuotta rakennettu silta nousi keskeltä auki ja päästi '
      + 'laivat Lontoon satamaan.',
  },
  kairo: {
    tiedosto: 'tuotanto/tuot-kairo.png',
    kaupunki: 'Kairo',
    otsikko: 'Kairo 1873',
    selite: 'Isoisän matkavuonna sulttaanin firmaani vahvisti khedivi Ismailin '
      + 'Egyptin lähes itsenäiseksi — velkaantunut maa myi Suezin kanavan '
      + 'osakkeensa briteille kaksi vuotta myöhemmin.',
  },
  xian: {
    tiedosto: 'tuotanto/tuot-xian.png',
    kaupunki: 'Xi’an',
    otsikko: 'Xi’an 1873',
    selite: 'Isoisän matkavuonna Xi’an oli Shaanxin maakuntapääkaupunki, jota '
      + 'kiersi yhä Ming-kaudella 1370-luvulta lähtien muurattu kaupunginmuuri '
      + '— sen porteista karavaanit lähtivät vanhalle Silkkitielle.',
  },
  pariisi: {
    tiedosto: 'tuotanto/tuot-pariisi.png',
    kaupunki: 'Pariisi',
    otsikko: 'Pariisi 1889',
    selite: 'Maailmannäyttely avattiin 6. toukokuuta 1889, ja sitä varten '
      + 'rakennettu Eiffel-torni oli valmistuessaan maailman korkein '
      + 'rakennelma.',
  },
  delhi: {
    tiedosto: 'tuotanto/tuot-delhi.png',
    kaupunki: 'Delhi',
    otsikko: 'Delhi 1873',
    selite: 'Isoisän matkavuonna Delhi oli vain Punjabin maakunnan piirikunta: '
      + 'Britti-Intian pääkaupunki oli Kalkutta, ja se siirtyi Delhiin vasta '
      + 'vuonna 1911.',
  },
  peking: {
    tiedosto: 'tuotanto/tuot-peking.png',
    kaupunki: 'Peking',
    otsikko: 'Peking 1873',
    selite: 'Isoisän matkavuonna nuori Tongzhi-keisari otti vallan omiin '
      + 'käsiinsä ja otti 29. kesäkuuta 1873 ensi kerran vastaan vieraiden '
      + 'valtojen lähettiläät.',
  },
  samarkand: {
    tiedosto: 'tuotanto/tuot-samarkand.png',
    kaupunki: 'Samarkand',
    otsikko: 'Samarkand 1888',
    selite: 'Taka-Kaspian rautatie saavutti Samarkandin Buharan kautta vuonna '
      + '1888 ja pysähtyi siihen kymmeneksi vuodeksi — Tashkentiin päästiin '
      + 'vasta 1898.',
  },
  /*
   * ERÄ 3 (22.8.2026): viisi Euroopan laudan kaupunkia. Kuvat tulevat
   * ämpäriin samalla nimikaavalla; siihen asti kuvapaikka jää tyhjäksi
   * eikä mikään muu muutu (ks. tiedoston alun kommentti).
   */
  rooma: {
    tiedosto: 'tuotanto/tuot-rooma.png',
    kaupunki: 'Rooma',
    otsikko: 'Rooma 1873',
    selite: 'Isoisän matkavuonna Rooma oli ollut Italian pääkaupunki vasta '
      + 'kaksi vuotta, ja paavin aikaan aloitettu Terminin pääteasema '
      + 'valmistui vasta seuraavana vuonna.',
  },
  wien: {
    tiedosto: 'tuotanto/tuot-wien.png',
    kaupunki: 'Wien',
    otsikko: 'Wien 1873',
    selite: 'Maailmannäyttely avattiin 1. toukokuuta 1873, mutta pörssiromahdus '
      + 'ja kolera pitivät kävijämäärän kaukana tavoitteesta.',
  },
  ateena: {
    tiedosto: 'tuotanto/tuot-ateena.png',
    kaupunki: 'Ateena',
    otsikko: 'Ateena 1873',
    selite: 'Heinrich Schliemann kaivoi Troijasta esiin 15. kesäkuuta 1873 '
      + 'kultalöydön, jota kutsui Priamoksen aarteeksi, ja salakuljetti sen '
      + 'osmanien mailta Ateenaan.',
  },
  venetsia: {
    tiedosto: 'tuotanto/tuot-venetsia.png',
    kaupunki: 'Venetsia',
    otsikko: 'Venetsia 1873',
    selite: 'Isoisän matkavuonna Venetsia oli kuulunut Italiaan vasta '
      + 'seitsemän vuotta, ja mantereelta kaupunkiin tultiin vuonna 1846 '
      + 'valmistunutta rautatiepengertä pitkin.',
  },
  madrid: {
    tiedosto: 'tuotanto/tuot-madrid.png',
    kaupunki: 'Madrid',
    otsikko: 'Madrid 1873',
    selite: 'Kuningas Amadeo luopui kruunusta, ja Madridissa julistettiin '
      + '11. helmikuuta 1873 Espanjan ensimmäinen tasavalta — se kesti vajaat '
      + 'kaksi vuotta.',
  },
};

/** Kaupungin juliste tai null. Yksi kysely, jotta tarkistus on samanlainen kaikkialla. */
export function kaupunginJuliste(cityId) {
  return JULISTEET[cityId] ?? null;
}
