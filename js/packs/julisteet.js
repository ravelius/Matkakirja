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
  /*
   * ERÄ 4 (22.8.2026): Euroopan ja Lähi-idän laudat loppuun, 49 uutta
   * kohdetta. Mukana on myös alueita (Alpit, Islanti, Lappi, Kreeta,
   * Sisilia, Siinai, Kappadokia, Rub al-Khali) — juliste on laatan
   * palkinto, ja laatta voi olla alue yhtä hyvin kuin kaupunki.
   *
   * NIMI ON AIKAKAUDEN NIMI silloin kun kohde on sittemmin nimetty
   * uudelleen: Konstantinopolin ennakkotapaus koskee myös Kristianiaa
   * (Oslo), Ragusaa (Dubrovnik), Revalia (Tallinna) ja Smyrnaa (Izmir).
   * Pelkkä translitteraation muutos ei riitä siihen — Kiova on Kyiv ja
   * Vilna Vilnius. Kentän `kaupunki` lyhyt nimi on aina se nimi, jolla
   * paikka pelin kartalla on, jotta pelaaja tunnistaa palkintonsa.
   *
   * Sommittelut ja aikakausitarkistukset: tools/juliste-tyolista-1.mjs.
   */
  praha: {
    tiedosto: 'tuotanto/tuot-praha.png',
    kaupunki: 'Praha',
    otsikko: 'Praha 1883',
    selite: 'Tšekkien kansallisteatteri paloi kaksi kuukautta avajaistensa '
      + 'jälkeen kesällä 1881, ja se rakennettiin uudelleen kansalaiskeräyksellä '
      + 'niin nopeasti, että ovet aukesivat taas 18. marraskuuta 1883.',
  },
  berliini: {
    tiedosto: 'tuotanto/tuot-berliini.png',
    kaupunki: 'Berliini',
    otsikko: 'Berliini 1873',
    selite: 'Voitonpylväs vihittiin 2. syyskuuta 1873 kolmen sodan muistoksi, '
      + 'ja se seisoi tuolloin Königsplatzilla — nykyiselle paikalleen Suureen '
      + 'tähteen se siirrettiin vasta 1930-luvun lopulla.',
  },
  tukholma: {
    tiedosto: 'tuotanto/tuot-tukholma.png',
    kaupunki: 'Tukholma',
    otsikko: 'Tukholma 1891',
    selite: 'Artur Hazelius avasi Djurgårdenilla 11. lokakuuta 1891 Skansenin, '
      + 'maailman ensimmäisen ulkoilmamuseon, johon siirrettiin kokonaisia '
      + 'taloja eri puolilta Ruotsia.',
  },
  amsterdam: {
    tiedosto: 'tuotanto/tuot-amsterdam.png',
    kaupunki: 'Amsterdam',
    otsikko: 'Amsterdam 1885',
    selite: 'Pierre Cuypersin suunnittelema Rijksmuseum avattiin vuonna 1885, '
      + 'ja vasta silloin Alankomaiden hajallaan olleet valtion kokoelmat '
      + 'saatiin saman katon alle.',
  },
  dublin: {
    tiedosto: 'tuotanto/tuot-dublin.png',
    kaupunki: 'Dublin',
    otsikko: 'Dublin 1873',
    selite: 'Isaac Buttin löyhä yhdistys järjestäytyi Dublinissa vuonna 1873 '
      + 'Home Rule Leagueksi, ja jo seuraavan vuoden vaaleissa kotihallintoa '
      + 'vaatinut puolue vei enemmistön Irlannin paikoista.',
  },
  edinburgh: {
    tiedosto: 'tuotanto/tuot-edinburgh.png',
    kaupunki: 'Edinburgh',
    otsikko: 'Edinburgh 1883',
    selite: 'Edinburghissa syntynyt Robert Louis Stevenson julkaisi '
      + '14. marraskuuta 1883 kirjana Aarresaaren — kartan, jossa risti '
      + 'merkitsee aarteen, opetti lukemaan koko maailma.',
  },
  marseille: {
    tiedosto: 'tuotanto/tuot-marseille.png',
    kaupunki: 'Marseille',
    otsikko: 'Marseille 1873',
    selite: 'Isoisän matkavuonna kukkulan Notre-Dame de la Garde oli vihitty '
      + 'vasta yhdeksän vuotta aiemmin 1864, ja vuonna 1869 avattu Suezin '
      + 'kanava oli juuri tehnyt satamasta Ranskan portin itään.',
  },
  lissabon: {
    tiedosto: 'tuotanto/tuot-lissabon.png',
    kaupunki: 'Lissabon',
    otsikko: 'Lissabon 1873',
    selite: 'Isoisän matkavuonna Lissabonin hevosraitiovaunut olivat aivan '
      + 'uusi asia: Carris aloitti liikenteen 18. syyskuuta 1872, vain vuotta '
      + 'aiemmin.',
  },
  barcelona: {
    tiedosto: 'tuotanto/tuot-barcelona.png',
    kaupunki: 'Barcelona',
    otsikko: 'Barcelona 1888',
    selite: 'Maailmannäyttely avattiin 8. huhtikuuta 1888 Ciutadellan puistossa, '
      + 'ja sitä varten rakennettiin niin näyttelyn tiiliportti Arc de Triomf '
      + 'kuin Rambla-kadun päähän pystytetty Kolumbuksen pylväs.',
  },
  granada: {
    tiedosto: 'tuotanto/tuot-granada.png',
    kaupunki: 'Granada',
    otsikko: 'Granada 1870',
    selite: 'Alhambra julistettiin vuonna 1870 Espanjan kansallismonumentiksi '
      + 'ja sai valtiolta ensimmäisen oman korjausmäärärahansa — sitä ennen '
      + 'palatsi oli saanut rapistua vuosisatoja.',
  },
  budapest: {
    tiedosto: 'tuotanto/tuot-budapest.png',
    kaupunki: 'Budapest',
    otsikko: 'Budapest 1873',
    selite: 'Buda, Pest ja Óbuda yhdistettiin 17. marraskuuta 1873 yhdeksi '
      + 'kaupungiksi, ja vasta siitä päivästä lähtien on ollut olemassa '
      + 'Budapest.',
  },
  krakova: {
    tiedosto: 'tuotanto/tuot-krakova.png',
    kaupunki: 'Krakova',
    otsikko: 'Krakova 1873',
    selite: 'Isoisän matkavuonna Puolan kuninkaiden Wawel oli itävaltalainen '
      + 'kasarmi: keisari Frans Joosef käski sotaväen pois linnasta vasta '
      + 'vuonna 1905.',
  },
  varsova: {
    tiedosto: 'tuotanto/tuot-varsova.png',
    kaupunki: 'Varsova',
    otsikko: 'Varsova 1873',
    selite: 'Isoisän matkavuonna Veiksel ylitettiin Kierbedźin siltaa pitkin: '
      + '474 metriä pitkä ristikkosilta avattiin 22. marraskuuta 1864 ja oli '
      + 'Varsovan ensimmäinen teräksinen jokisilta.',
  },
  helsinki: {
    tiedosto: 'tuotanto/tuot-helsinki.png',
    kaupunki: 'Helsinki',
    otsikko: 'Helsinki 1873',
    selite: 'Isoisän matkavuonna Helsinki oli ollut kolme vuotta kiinni '
      + 'keisarikunnan pääkaupungissa: Riihimäen ja Pietarin välinen rata '
      + 'valmistui 1870.',
  },
  tampere: {
    tiedosto: 'tuotanto/tuot-tampere.png',
    kaupunki: 'Tampere',
    otsikko: 'Tampere 1882',
    /* Tarkennus 23.8.2026 (omistajan faktakysymys): Pietarissa oli jo
     * 1879–80 KAARILAMPPUVALOA, joten ensimmäisyys koskee nimenomaan
     * hehkulamppuvalaistusta. */
    selite: 'Finlaysonin Plevna-kutomossa sytytettiin 15. maaliskuuta 1882 '
      + 'Edisonin hehkulamput — Pohjoismaiden ja koko Venäjän keisarikunnan '
      + 'ensimmäinen hehkulamppuvalaistus.',
  },
  tallinna: {
    tiedosto: 'tuotanto/tuot-tallinna.png',
    kaupunki: 'Tallinna',
    otsikko: 'Reval 1873',
    selite: 'Isoisän matkavuonna kaupungin virallinen nimi oli Reval ja '
      + 'Toompea oli yhä oma erillinen kaupunkinsa — se liitettiin alakaupunkiin '
      + 'vasta vuonna 1877.',
  },
  kiova: {
    tiedosto: 'tuotanto/tuot-kiova.png',
    kaupunki: 'Kiova',
    otsikko: 'Kiova 1892',
    selite: 'Kiovan jyrkille rinteille avattiin vuonna 1892 sähköraitiotie, '
      + 'ensimmäinen koko Venäjän keisarikunnassa ja kolmas maailmassa.',
  },
  pietari: {
    tiedosto: 'tuotanto/tuot-pietari.png',
    kaupunki: 'Pietari',
    otsikko: 'Pietari 1873',
    selite: 'Katariina Suuren muistomerkki vihittiin Nevski Prospektin varrella '
      + '24. marraskuuta 1873 vanhan lukukalenterin mukaan; sitä oli veistetty '
      + 'yksitoista vuotta.',
  },
  sofia: {
    tiedosto: 'tuotanto/tuot-sofia.png',
    kaupunki: 'Sofia',
    otsikko: 'Sofia 1873',
    selite: 'Bulgarian kansallissankari Vasil Levski hirtettiin Sofiassa '
      + '18. helmikuuta 1873; kaupunki oli tuolloin yhä osmanien pikkukaupunki '
      + 'eikä pääkaupunki, joksi se tuli vasta 1879.',
  },
  bukarest: {
    tiedosto: 'tuotanto/tuot-bukarest.png',
    kaupunki: 'Bukarest',
    otsikko: 'Bukarest 1888',
    selite: 'Kansalaiskeräyksellä rahoitettu kupolisali Ateneul Român vihittiin '
      + 'vuonna 1888, vaikka koristelutyöt jatkuivat vielä vuoteen 1897.',
  },
  sarajevo: {
    tiedosto: 'tuotanto/tuot-sarajevo.png',
    kaupunki: 'Sarajevo',
    otsikko: 'Sarajevo 1878',
    selite: 'Berliinin kongressi antoi Bosnian Itävalta-Unkarin hallintaan '
      + 'vuonna 1878, ja neljäsataa vuotta kestänyt osmanivalta päättyi '
      + 'Sarajevossa yhdessä kesässä.',
  },
  odessa: {
    tiedosto: 'tuotanto/tuot-odessa.png',
    kaupunki: 'Odessa',
    otsikko: 'Odessa 1873',
    selite: 'Kaupungin vuonna 1810 avattu ensimmäinen teatteri tuhoutui '
      + 'tulipalossa vuonna 1873, ja nykyinen oopperatalo valmistui sen tilalle '
      + 'vasta 1887.',
  },
  dubai: {
    tiedosto: 'tuotanto/tuot-dubai.png',
    kaupunki: 'Dubai',
    otsikko: 'Dubai 1873',
    selite: 'Isoisän matkavuonna Dubai oli helmenkalastajakylä lahden '
      + 'molemmin puolin, ja sen talot olivat palmunlehvistä (barasti) — '
      + 'puolet Bur Dubaista paloi maan tasalle vuoden 1896 tulipalossa.',
  },
  petra: {
    tiedosto: 'tuotanto/tuot-petra.png',
    kaupunki: 'Petra',
    otsikko: 'Petra 1873',
    selite: 'Isoisän matkavuonna Petra oli ollut länsimaiden tiedossa vasta '
      + 'kuusikymmentä vuotta: sveitsiläinen Johann Ludwig Burckhardt pääsi '
      + 'beduiinioppaan kanssa kalliokaupunkiin vuonna 1812.',
  },
  medina: {
    tiedosto: 'tuotanto/tuot-medina.png',
    kaupunki: 'Medina',
    otsikko: 'Medina 1873',
    selite: 'Isoisän matkavuonna Profeetan moskeija oli vasta kaksitoista '
      + 'vuotta vanha uudisrakennus: sulttaani Abdülmecidin uudistus alkoi 1849 '
      + 'ja kesti kolmetoista vuotta, ja Vihreä kupoli oli maalattu vihreäksi '
      + 'vuonna 1837.',
  },
  mekka: {
    tiedosto: 'tuotanto/tuot-mekka.png',
    kaupunki: 'Mekka',
    otsikko: 'Mekka 1873',
    selite: 'Isoisän matkavuonna Pyhä moskeija oli yhä siinä asussa, jonka '
      + 'sulttaani Murad IV:n korjaus antoi sille vuonna 1629: kivipylväikkö ja '
      + 'seitsemän minareettia säilyivät lähes kolmesataa vuotta muuttumatta.',
  },
  kapadokia: {
    tiedosto: 'tuotanto/tuot-kapadokia.png',
    kaupunki: 'Kappadokia',
    otsikko: 'Kappadokia 1873',
    selite: 'Isoisän matkavuonna tuffikartioiden asunnoissa ja kalliokirkoissa '
      + 'elettiin yhä, mutta suuret maanalaiset kaupungit olivat unohtuneet — '
      + 'Derinkuyu löytyi vasta 1963, kun talon seinän takaa paljastui huone.',
  },
  persepolis: {
    tiedosto: 'tuotanto/tuot-persepolis.png',
    kaupunki: 'Persepolis',
    otsikko: 'Persepolis 1873',
    selite: 'Isoisän matkavuonna Dareioksen terassilla kävi vain matkalaisia, '
      + 'jotka kaiversivat nimensä pylväisiin: ensimmäiset tieteelliset '
      + 'kaivaukset alkoivat vasta 1931.',
  },
  jerusalem: {
    tiedosto: 'tuotanto/tuot-jerusalem.png',
    kaupunki: 'Jerusalem',
    otsikko: 'Jerusalem 1873',
    selite: 'Jerusalemista tehtiin vuonna 1872 oma erillinen piirikuntansa, '
      + 'joka raportoi suoraan Konstantinopoliin eikä enää Damaskokseen — '
      + 'merkki siitä, kuinka tarkasti suurvallat kaupunkia seurasivat.',
  },
  siinai: {
    tiedosto: 'tuotanto/tuot-siinai.png',
    kaupunki: 'Siinai',
    otsikko: 'Siinai 1859',
    selite: 'Constantin von Tischendorf vei Pyhän Katariinan luostarista vuonna '
      + '1859 Venäjälle Codex Sinaiticuksen, tuolloin maailman vanhimman lähes '
      + 'täydellisen Raamatun käsikirjoituksen.',
  },
  rubalkhali: {
    tiedosto: 'tuotanto/tuot-rubalkhali.png',
    kaupunki: 'Rub al-Khali',
    otsikko: 'Rub al-Khali 1873',
    selite: 'Isoisän matkavuonna hiekkameren yli olivat kulkeneet vain siellä '
      + 'asuvat beduiinit: ensimmäiset ulkopuolisten dokumentoidut ylitykset '
      + 'tehtiin vasta 1930-luvun alussa.',
  },
  tromssa: {
    tiedosto: 'tuotanto/tuot-tromssa.png',
    kaupunki: 'Tromssa',
    otsikko: 'Tromssa 1873',
    selite: 'Isoisän matkavuonna Tromssa oli ohittanut Hammerfestin arktisen '
      + 'pyynnin pääpaikkana ja saanut edellisenä vuonna 1872 oman museonsa; '
      + 'sen jäämerimiehiä värvättiin myöhemmin lähes joka retkikuntaan.',
  },
  islanti: {
    tiedosto: 'tuotanto/tuot-islanti.png',
    kaupunki: 'Islanti',
    otsikko: 'Islanti 1874',
    selite: 'Tuhat vuotta ensimmäisestä asutuksesta täyttyi vuonna 1874, ja '
      + 'Tanska antoi saarelle juhlavuoden kunniaksi oman perustuslain ja '
      + 'rajatun itsehallinnon sisäisissä asioissa.',
  },
  lappi: {
    tiedosto: 'tuotanto/tuot-lappi.png',
    kaupunki: 'Lappi',
    otsikko: 'Lappi 1873',
    selite: 'Ivalojoen kultaryntäys täytti 1870-luvulla erämaan huuhtojilla, '
      + 'ja valtio rakensi joen varteen Kultalan aseman jakamaan valtauslupia '
      + 'ja lunastamaan kullan — ryntäys hiipui 1880-luvun lopulla.',
  },
  kreeta: {
    tiedosto: 'tuotanto/tuot-kreeta.png',
    kaupunki: 'Kreeta',
    otsikko: 'Kreeta 1878',
    selite: 'Halepan sopimus antoi Kreetalle vuonna 1878 osmanien alaisuudessa '
      + 'oman edustajakokouksen ja laajan itsehallinnon kymmenen vuoden '
      + 'kapinoiden jälkeen.',
  },
  sisilia: {
    tiedosto: 'tuotanto/tuot-sisilia.png',
    kaupunki: 'Sisilia',
    otsikko: 'Sisilia 1860',
    selite: 'Giuseppe Garibaldi nousi maihin Marsalassa toukokuussa 1860 '
      + 'runsaan tuhannen punapaidan kanssa, ja saari irtosi Molempain Sisiliain '
      + 'kuningaskunnasta yhden kesän aikana.',
  },
  alpit: {
    tiedosto: 'tuotanto/tuot-alpit.png',
    kaupunki: 'Alpit',
    otsikko: 'Alpit 1865',
    selite: 'Edward Whymperin retkikunta nousi Matterhornin huipulle ensi '
      + 'kertaa 14. heinäkuuta 1865, mutta laskeutumisella katkennut köysi vei '
      + 'seitsemästä miehestä neljän hengen.',
  },
  dubrovnik: {
    tiedosto: 'tuotanto/tuot-dubrovnik.png',
    kaupunki: 'Dubrovnik',
    otsikko: 'Ragusa 1873',
    selite: 'Isoisän matkavuonna kaupungin virallinen nimi oli Ragusa ja se oli '
      + 'Itävallan Dalmatian kuningaskunnan pikkukaupunki — oma kauppatasavalta '
      + 'oli lakkautettu vuonna 1808.',
  },
  riika: {
    tiedosto: 'tuotanto/tuot-riika.png',
    kaupunki: 'Riika',
    otsikko: 'Riika 1873',
    selite: 'Ensimmäiset latvialaiset laulujuhlat pidettiin Riiassa vuonna '
      + '1873, ja niistä kasvoi perinne, joka toistuu yhä noin viiden vuoden '
      + 'välein.',
  },
  vilna: {
    tiedosto: 'tuotanto/tuot-vilna.png',
    kaupunki: 'Vilna',
    otsikko: 'Vilna 1873',
    selite: 'Isoisän matkavuonna liettuan kielen painaminen latinalaisin '
      + 'kirjaimin oli kielletty — kielto oli voimassa 1865–1904, ja kirjat '
      + 'kannettiin rajan yli salaa kirjankantajien selässä.',
  },
  oslo: {
    tiedosto: 'tuotanto/tuot-oslo.png',
    kaupunki: 'Oslo',
    otsikko: 'Kristiania 1873',
    selite: 'Isoisän matkavuonna kaupungin nimi oli Kristiania, ja kuningas '
      + 'Oscar II lakkautti samana vuonna 1873 Norjan sijaishallitsijan viran — '
      + 'askel kohti maan omaa hallitusta.',
  },
  firenze: {
    tiedosto: 'tuotanto/tuot-firenze.png',
    kaupunki: 'Firenze',
    otsikko: 'Firenze 1887',
    selite: 'Firenzen tuomiokirkko sai monivärisen marmorijulkisivunsa vasta '
      + 'vuonna 1887 — Brunelleschin kupoli oli silloin ollut valmiina jo yli '
      + 'neljäsataa vuotta.',
  },
  kobenhavn: {
    tiedosto: 'tuotanto/tuot-kobenhavn.png',
    kaupunki: 'Kööpenhamina',
    otsikko: 'Kööpenhamina 1873',
    selite: 'Tanska ja Ruotsi perustivat vuonna 1873 Skandinaavisen rahaliiton '
      + 'ja vaihtoivat hopeariikintaalerin kultakantaiseen kruunuun; Norja '
      + 'liittyi mukaan 1875.',
  },
  doha: {
    tiedosto: 'tuotanto/tuot-doha.png',
    kaupunki: 'Doha',
    otsikko: 'Doha 1873',
    selite: 'Osmanit toivat joulukuussa 1871 sata sotilasta Dohan linnakkeeseen, '
      + 'ja komentajan raportti seuraavalta vuodelta kertoo noin tuhannesta '
      + 'talosta ja neljästätuhannesta asukkaasta.',
  },
  nikosia: {
    tiedosto: 'tuotanto/tuot-nikosia.png',
    kaupunki: 'Nikosia',
    otsikko: 'Nikosia 1878',
    selite: 'Kypros siirtyi Kyproksen sopimuksella brittihallintoon, ja '
      + 'Nikosiassa vaihtui isäntä 5. heinäkuuta 1878 — saari pysyi silti '
      + 'muodollisesti osmanien aluetta vielä vuosikymmeniä.',
  },
  kuwait: {
    tiedosto: 'tuotanto/tuot-kuwait.png',
    kaupunki: 'Kuwait',
    otsikko: 'Kuwait 1873',
    selite: 'Isoisän matkavuonna Kuwait oli Persianlahden tärkein dhow-veneiden '
      + 'veistämö, ja sen rannalla rakennetut alukset kuljettivat suuren osan '
      + 'Intian, Itä-Afrikan ja Punaisenmeren satamien välisestä kaupasta.',
  },
  masqat: {
    tiedosto: 'tuotanto/tuot-masqat.png',
    kaupunki: 'Masqat',
    otsikko: 'Masqat 1873',
    selite: 'Isoisän matkavuonna Masqat oli menettänyt valtakuntansa rikkaimman '
      + 'puolen: sulttaani Saidin kuoltua 1856 Sansibarista tuli oma '
      + 'sulttaanikuntansa, ja Omanin merivalta hiipui.',
  },
  bagdad: {
    tiedosto: 'tuotanto/tuot-bagdad.png',
    kaupunki: 'Bagdad',
    otsikko: 'Bagdad 1873',
    selite: 'Kuvernööri Midhat Pasha muutti Bagdadia vuosina 1869–1872 enemmän '
      + 'kuin kukaan sitä ennen: kouluja, sairaaloita, teitä ja Irakin '
      + 'ensimmäinen sanomalehti al-Zawra.',
  },
  izmir: {
    tiedosto: 'tuotanto/tuot-izmir.png',
    kaupunki: 'Izmir',
    otsikko: 'Smyrna 1873',
    selite: 'Isoisän matkavuonna kaupungin nimi oli lännessä Smyrna ja sieltä '
      + 'lähti nykyisen Turkin ensimmäinen rautatie: Aydınin rata aloitettiin '
      + '1856 ja saatiin valmiiksi 1867.',
  },
  /*
   * TYÖLISTA 2 (22.8.2026): 48 kohdetta — Lähi-itä, Siperia ja Aasia.
   * Julisteet kaikkiin -urakan päätöserä; kentät sommittelutyölistasta
   * (tools/juliste-tyolista-2.mjs), faktat tarkistettu en-Wikipediasta
   * 22.8.2026. Vuosi on julisteeseen painettu vuosi (oletus 1873 =
   * isoisän matkavuosi; ks. työlistan alkukommentti).
   */
  ankara: {
    tiedosto: 'tuotanto/tuot-ankara.png',
    kaupunki: 'Ankara',
    otsikko: 'Angora 1892',
    selite: 'Anatolian rautatie Konstantinopolista saapui Angoraan 31. '
      + 'joulukuuta 1892, ja mohairvillastaan tunnettu arokaupunki sai '
      + 'ensimmäisen rautatieasemansa.',
  },
  halab: {
    tiedosto: 'tuotanto/tuot-halab.png',
    kaupunki: 'Aleppo',
    otsikko: 'Aleppo 1873',
    selite: 'Isoisän matkavuonna Aleppo oli vuonna 1866 perustetun Halepin '
      + 'vilajetin pääkaupunki, mutta sen vuosisatainen karavaanikauppa oli '
      + 'kääntynyt laskuun heti Suezin kanavan avauduttua 1869.',
  },
  damaskos: {
    tiedosto: 'tuotanto/tuot-damaskos.png',
    kaupunki: 'Damaskos',
    otsikko: 'Damaskos 1873',
    selite: 'Isoisän matkavuonna Damaskos oli osmanien Syyrian vilajetin '
      + 'pääkaupunki ja Mekan-pyhiinvaelluskaravaanin perinteinen lähtöpaikka; '
      + 'sen Umaijadien moskeija oli valmistunut jo vuonna 715.',
  },
  luxor: {
    tiedosto: 'tuotanto/tuot-luxor.png',
    kaupunki: 'Luxor',
    otsikko: 'Luxor 1881',
    selite: 'Vuonna 1881 Deir el-Bahrin kalliokätkö tuli viranomaisten '
      + 'tietoon: paikalliset olivat löytäneet jo aiemmin haudan, johon '
      + 'muinaiset papit olivat piilottaneet kymmenien faaraoiden muumiot, ja '
      + 'ne siirrettiin samana vuonna Kairoon.',
  },
  riad: {
    tiedosto: 'tuotanto/tuot-riad.png',
    kaupunki: 'Riad',
    otsikko: 'Riad 1873',
    selite: 'Isoisän matkavuonna Riad oli savitiilimuurien ympäröimä Nejdin '
      + 'emiraatin pääkaupunki, jota Faisalin poikien valtataistelu repi — '
      + 'Masmakin linnoitusta oli muurattu vuodesta 1865, ja se valmistui '
      + 'vasta 1895.',
  },
  tabriz: {
    tiedosto: 'tuotanto/tuot-tabriz.png',
    kaupunki: 'Tabriz',
    otsikko: 'Tabriz 1873',
    selite: 'Isoisän matkavuonna Tabriz oli Persian kruununprinssin '
      + 'asuinkaupunki ja maan tärkein kauppapaikka, jonka katetun basaarin '
      + 'kautta kulki idän ja Mustanmeren välinen tavaravirta.',
  },
  teheran: {
    tiedosto: 'tuotanto/tuot-teheran.png',
    kaupunki: 'Teheran',
    otsikko: 'Teheran 1873',
    selite: 'Naser al-Din Shah matkusti vuonna 1873 ensimmäisenä Persian '
      + 'hallitsijana Eurooppaan ja palasi Teheraniin täynnä ajatuksia '
      + 'näkemästään tekniikasta.',
  },
  isfahan: {
    tiedosto: 'tuotanto/tuot-isfahan.png',
    kaupunki: 'Isfahan',
    otsikko: 'Isfahan 1873',
    selite: 'Isoisän matkavuonna Isfahanissa asui enää noin 60 000 ihmistä '
      + 'safavidien loiston jäänteissä: Persian pääkaupunki oli siirretty '
      + 'Teheraniin jo vuonna 1775.',
  },
  sana: {
    tiedosto: 'tuotanto/tuot-sana.png',
    kaupunki: 'Sanaa',
    otsikko: 'Sanaa 1873',
    selite: 'Osmanit valtasivat Sanaan vasta 1872 Ahmed Muhtar Pashan '
      + 'johdolla, joten isoisän matkavuonna kaupunki oli juuri tullut '
      + 'osmanien Jemenin hallintokaupungiksi.',
  },
  aden: {
    tiedosto: 'tuotanto/tuot-aden.png',
    kaupunki: 'Aden',
    otsikko: 'Aden 1873',
    selite: 'Suezin kanavan avaaminen 1869 teki vuodesta 1839 brittihallussa '
      + 'olleesta Adenista Intian-reitin tärkeimmän hiilenottosataman.',
  },
  salalah: {
    tiedosto: 'tuotanto/tuot-salalah.png',
    kaupunki: 'Salalah',
    otsikko: 'Salalah 1873',
    selite: 'Salalah oli Dhofarin perinteinen pääkaupunki, jonka '
      + 'suitsukekauppa oli kukoistanut 1200-luvulla; 1800-luvulla alue '
      + 'liitettiin Maskatin sulttaanikuntaan.',
  },
  mosul: {
    tiedosto: 'tuotanto/tuot-mosul.png',
    kaupunki: 'Mosul',
    otsikko: 'Mosul 1873',
    selite: 'George Smith kaivoi vuonna 1873 Mosulin vastarannalla Ninevehin '
      + 'Kuyunjik-kummussa ja löysi savitaulun palasia, jotka täydensivät '
      + 'Gilgameš-eepoksen vedenpaisumuskertomusta.',
  },
  soul: {
    tiedosto: 'tuotanto/tuot-soul.png',
    kaupunki: 'Soul',
    otsikko: 'Soul 1873',
    selite: 'Kuningas Kojong ilmoitti vuonna 1873 ottavansa vallan omiin '
      + 'käsiinsä isänsä Taewongunin holhouskauden jälkeen, ja hänen '
      + 'esi-isiensä Kyongbokin palatsi oli juuri muurattu uudelleen.',
  },
  shanghai: {
    tiedosto: 'tuotanto/tuot-shanghai.png',
    kaupunki: 'Shanghai',
    otsikko: 'Shanghai 1876',
    selite: 'Kiinan ensimmäinen liikennöinyt rautatie rakennettiin 1876 '
      + 'Shanghaista Woosungiin ilman viranomaisten lupaa, ja se ehti kulkea '
      + 'alle vuoden ennen kuin varakuningas osti kiskot ja purki radan.',
  },
  tripoli: {
    tiedosto: 'tuotanto/tuot-tripoli.png',
    kaupunki: 'Tripoli',
    otsikko: 'Tripoli 1873',
    selite: 'Isoisän matkavuonna Tripoli oli osmanien Tripolitanian vilajetin '
      + 'pääkaupunki — suora hallinto oli palautettu 1835 — ja Saharan halki '
      + 'kulkevien karavaanien viimeinen Välimeren-satama.',
  },
  jekaterinburg: {
    tiedosto: 'tuotanto/tuot-jekaterinburg.png',
    kaupunki: 'Jekaterinburg',
    otsikko: 'Jekaterinburg 1873',
    selite: 'Isoisän matkavuonna Jekaterinburgin rahapajassa lyötiin yhä '
      + 'valtaosa Venäjän keisarikunnan liikkeessä olleista kolikoista; paja '
      + 'suljettiin 1876.',
  },
  novosibirsk: {
    tiedosto: 'tuotanto/tuot-novosibirsk.png',
    kaupunki: 'Novosibirsk',
    otsikko: 'Novonikolajevsk 1897',
    selite: 'Novosibirskia ei ollut isoisän matkavuonna olemassa: kylä syntyi '
      + '1893 Siperian radan Ob-sillan työmaalle, sai nimen Novonikolajevsk '
      + '1895, ja silta valmistui keväällä 1897.',
  },
  irkutsk: {
    tiedosto: 'tuotanto/tuot-irkutsk.png',
    kaupunki: 'Irkutsk',
    otsikko: 'Irkutsk 1873',
    selite: 'Isoisän matkavuonna Irkutsk oli Itä-Siperian kenraalikuvernöörin '
      + 'puinen pääkaupunki, joka rikastui Kiahtan teekaravaaneista — suuri '
      + 'osa siitä paloi heinäkuun 1879 tulipalossa.',
  },
  jakutsk: {
    tiedosto: 'tuotanto/tuot-jakutsk.png',
    kaupunki: 'Jakutsk',
    otsikko: 'Jakutsk 1873',
    selite: 'Isoisän matkavuonna Jakutsk oli vuonna 1632 Lenan rannalle '
      + 'perustettu hirsikaupunki, joka oli kasvanut turkiskaupan ja '
      + 'Koillis-Siperian hallinnon keskukseksi keskelle ikiroutaa.',
  },
  magadan: {
    tiedosto: 'tuotanto/tuot-magadan.png',
    kaupunki: 'Magadan',
    otsikko: 'Ohotanmeren rannikko 1873',
    selite: 'Magadania ei ollut isoisän matkavuonna olemassa — kaupunki '
      + 'perustettiin Nagajevin lahden rannalle vasta 1929 — joten juliste '
      + 'kuvaa sitä Ohotanmeren rannikkoa, jolla evenit paimensivat poroja ja '
      + 'valaanpyytäjät purjehtivat.',
  },
  kamtsatka: {
    tiedosto: 'tuotanto/tuot-kamtsatka.png',
    kaupunki: 'Kamtšatka',
    otsikko: 'Kamtšatka 1873',
    selite: 'Petropavlovsk torjui liittoutuneiden piirityksen 1854, mutta '
      + 'varuskunta evakuoitiin Amurille jo seuraavana keväänä, ja isoisän '
      + 'matkavuonna Kamtšatkan pääpaikka oli enää pieni satamakylä '
      + 'tulivuorten juurella.',
  },
  sahalin: {
    tiedosto: 'tuotanto/tuot-sahalin.png',
    kaupunki: 'Sahalin',
    otsikko: 'Sahalin 1875',
    selite: 'Pietarin sopimuksessa 1875 Japani luopui Sahalinista Venäjälle '
      + 'Kuriilien vastineeksi, ja koko saari jäi vuonna 1869 laillistetun '
      + 'rangaistussiirtolan käyttöön.',
  },
  vladivostok: {
    tiedosto: 'tuotanto/tuot-vladivostok.png',
    kaupunki: 'Vladivostok',
    otsikko: 'Vladivostok 1873',
    selite: 'Siperian laivueen päätukikohta siirrettiin Nikolajevskista '
      + 'Vladivostokiin 1871, mutta isoisän matkavuonna paikka oli yhä '
      + 'hirsinen varuskuntakylä — kaupunkioikeudet tulivat vasta 1880.',
  },
  bangkok: {
    tiedosto: 'tuotanto/tuot-bangkok.png',
    kaupunki: 'Bangkok',
    otsikko: 'Bangkok 1873',
    selite: 'Chulalongkorn kruunattiin täysivaltaisena kuninkaana 16. '
      + 'marraskuuta 1873, ja samana vuonna hän julisti maahan heittäytymisen '
      + 'viranomaisten edessä lakkautetuksi.',
  },
  kioto: {
    tiedosto: 'tuotanto/tuot-kioto.png',
    kaupunki: 'Kioto',
    otsikko: 'Kioto 1895',
    selite: 'Heian-jingū rakennettiin 1895 kaupungin 1100-vuotisjuhlaan, ja '
      + 'samana vuonna Kiotossa avattiin Japanin ensimmäinen sähköraitiotie, '
      + 'jonka virta tuli Biwa-järven kanavan voimalasta.',
  },
  singapore: {
    tiedosto: 'tuotanto/tuot-singapore.png',
    kaupunki: 'Singapore',
    otsikko: 'Singapore 1873',
    selite: 'Suezin kanavan avaaminen 1869 käänsi höyrylaivaliikenteen '
      + 'Singaporen kautta, ja Straits Settlements oli siirretty Lontoon '
      + 'suoraan hallintaan 1867 — satama oli isoisän matkavuonna '
      + 'Kaakkois-Aasian vilkkain.',
  },
  varanasi: {
    tiedosto: 'tuotanto/tuot-varanasi.png',
    kaupunki: 'Varanasi',
    otsikko: 'Benares 1873',
    selite: 'Benares oli hindulaisuuden pyhin kaupunki, jonka kivisiä '
      + 'kylpyportaita rakennettiin 1700-luvulla; Kashi Višvanathin '
      + 'kultakupolisen temppelin pystytti Ahilyabai Holkar vuonna 1780.',
  },
  hanoi: {
    tiedosto: 'tuotanto/tuot-hanoi.png',
    kaupunki: 'Hanoi',
    otsikko: 'Hanoi 1873',
    selite: 'Ranskalaiset valtasivat Hanoin linnoituksen 20. marraskuuta 1873, '
      + 'mutta kaupunki palautettiin Nguyễn-hoville ja jäi Ranskalle vasta '
      + 'kymmenen vuotta myöhemmin.',
  },
  ulanbator: {
    tiedosto: 'tuotanto/tuot-ulanbator.png',
    kaupunki: 'Ulan Bator',
    otsikko: 'Urga 1873',
    selite: 'Urga oli Mongolian uskonnollinen ja kaupallinen keskus, jonka '
      + 'Gandanin luostari oli perustettu 1809 ja jonka ohi kulki Kiahtan ja '
      + 'Kalganin välinen teekaravaanitie.',
  },
  kathmandu: {
    tiedosto: 'tuotanto/tuot-kathmandu.png',
    kaupunki: 'Kathmandu',
    otsikko: 'Kathmandu 1873',
    selite: 'Isoisän matkavuonna Nepal oli Rana-pääministerien suljettu '
      + 'valtakunta, jonne ulkomaalaisia päästettiin vain harvoin; Kathmandun '
      + 'kaupunkikuvaa hallitsivat Durbar-aukion pagodit ja 1830-luvulla '
      + 'pystytetty Dharahara-torni.',
  },
  astana: {
    tiedosto: 'tuotanto/tuot-astana.png',
    kaupunki: 'Astana',
    otsikko: 'Akmolinsk 1873',
    selite: 'Astana oli isoisän matkavuonna Akmolinsk: Ishimin rannalle 1830 '
      + 'perustettu linnoituskylä, joka sai kaupunkioikeudet 1832 ja eli '
      + 'arojen karavaanireittien risteyksestä.',
  },
  kanton: {
    tiedosto: 'tuotanto/tuot-kanton.png',
    kaupunki: 'Kanton',
    otsikko: 'Kanton 1873',
    selite: 'Kanton oli ollut vuoteen 1842 asti Kiinan ainoa ulkomaankaupalle '
      + 'avoin satama, ja isoisän matkavuonna länsimaiset kauppahuoneet '
      + 'asuivat yhä Shamianin saarella, joka oli pengerretty jokeen '
      + '1850-luvun lopulla.',
  },
  yangon: {
    tiedosto: 'tuotanto/tuot-yangon.png',
    kaupunki: 'Yangon',
    otsikko: 'Rangoon 1873',
    selite: 'Britit tekivät Rangoonista Britti-Burman pääkaupungin 31. '
      + 'tammikuuta 1862 ja rakensivat sen ruutukaavaan, kun Burman kuningas '
      + 'hallitsi yhä ylävirran Mandalaysta.',
  },
  mandalay: {
    tiedosto: 'tuotanto/tuot-mandalay.png',
    kaupunki: 'Mandalay',
    otsikko: 'Mandalay 1873',
    selite: 'Mindon-kuningas perusti Mandalayn 1857 ja kutsui sinne 1871 '
      + 'viidennen buddhalaisen kirkolliskokouksen, joka hakkasi Pali-kaanonin '
      + '729 marmoritaululle.',
  },
  taipei: {
    tiedosto: 'tuotanto/tuot-taipei.png',
    kaupunki: 'Taipei',
    otsikko: 'Taipeh 1884',
    selite: 'Taipeh sai muurinsa ja porttinsa 1884, ja Dadaochengin teekauppa '
      + 'kasvatti sen niin nopeasti, että kaupungista tuli pian koko Taiwanin '
      + 'provinssin pääpaikka.',
  },
  hongkong: {
    tiedosto: 'tuotanto/tuot-hongkong.png',
    kaupunki: 'Hongkong',
    otsikko: 'Hongkong 1888',
    selite: 'Aasian ensimmäinen köysirata, Peak Tram, avattiin 30. toukokuuta '
      + '1888 ja nosti matkustajat Victoria Peakille, jonne oli siihen asti '
      + 'noustu kantotuolissa.',
  },
  jakarta: {
    tiedosto: 'tuotanto/tuot-jakarta.png',
    kaupunki: 'Jakarta',
    otsikko: 'Batavia 1873',
    selite: 'Batavian rautatie Buitenzorgiin valmistui 1873, samana vuonna kun '
      + 'Alankomaat aloitti Acehin sodan Sumatran pohjoiskärjessä; '
      + 'hevosraitiovaunut olivat kulkeneet kaupungissa vuodesta 1869.',
  },
  manila: {
    tiedosto: 'tuotanto/tuot-manila.png',
    kaupunki: 'Manila',
    otsikko: 'Manila 1873',
    selite: 'Vuoden 1863 maanjäristys kaatoi Manilan katedraalin, ja sen '
      + 'seitsemättä versiota alettiin rakentaa 1873 — se vihittiin vasta '
      + '1879.',
  },
  borneo: {
    tiedosto: 'tuotanto/tuot-borneo.png',
    kaupunki: 'Borneo',
    otsikko: 'Borneo 1873',
    selite: 'Borneon luoteisrannikkoa hallitsi valkoisten rajahien Sarawakin '
      + 'kuningaskunta, jonka Charles Brooke rakennutti Kuchingiin '
      + 'Astana-palatsin 1869; saaren sademetsissä Alfred Russel Wallace oli '
      + 'kerännyt näytteitään 1850-luvulla.',
  },
  sumatra: {
    tiedosto: 'tuotanto/tuot-sumatra.png',
    kaupunki: 'Sumatra',
    otsikko: 'Sumatra 1873',
    selite: 'Alankomaat hyökkäsi Acehin sulttaanikuntaan keväällä 1873 ja '
      + 'aloitti Sumatran pohjoiskärjessä sodan, joka kesti neljäkymmentä '
      + 'vuotta.',
  },
  kashgar: {
    tiedosto: 'tuotanto/tuot-kashgar.png',
    kaupunki: 'Kashgar',
    otsikko: 'Kashgar 1873',
    selite: 'Isoisän matkavuonna Kashgar oli Jakub Begin itsenäisen Jettišarin '
      + 'pääkaupunki: kapina oli irrottanut sen Kiinasta 1865, ja Qing-armeija '
      + 'otti alueen takaisin vasta 1877.',
  },
  lhasa: {
    tiedosto: 'tuotanto/tuot-lhasa.png',
    kaupunki: 'Lhasa',
    otsikko: 'Lhasa 1873',
    selite: 'Kahdestoista dalai-lama Trinley Gyatso asetettiin '
      + 'täysivaltaiseksi 11. maaliskuuta 1873, mutta hän ehti hallita vain '
      + 'kaksi vuotta ennen kuolemaansa.',
  },
  kolkata: {
    tiedosto: 'tuotanto/tuot-kolkata.png',
    kaupunki: 'Kolkata',
    otsikko: 'Kalkutta 1873',
    selite: 'Intian ensimmäinen hevosraitiovaunu lähti Kalkutassa 24. '
      + 'helmikuuta 1873 Sealdahista Armenian Ghatille, mutta linja '
      + 'lakkautettiin jo saman vuoden marraskuussa.',
  },
  kabul: {
    tiedosto: 'tuotanto/tuot-kabul.png',
    kaupunki: 'Kabul',
    otsikko: 'Kabul 1873',
    selite: 'Isoisän matkavuonna Kabulia hallitsi emiiri Sher Ali Khan Bala '
      + 'Hissarin linnoituksesta, joka tuhoutui osittain 1879 toisen '
      + 'brittiläis-afgaanisodan alettua.',
  },
  chennai: {
    tiedosto: 'tuotanto/tuot-chennai.png',
    kaupunki: 'Chennai',
    otsikko: 'Madras 1873',
    selite: 'Isoisän matkavuonna Madrasissa ei ollut satamaa lainkaan: laivat '
      + 'ankkuroivat kauas rannasta ja lasti tuotiin maihin ommelluilla '
      + 'masula-veneillä — aallonmurtajien muuraus alkoi vasta 1876.',
  },
  mumbai: {
    tiedosto: 'tuotanto/tuot-mumbai.png',
    kaupunki: 'Mumbai',
    otsikko: 'Bombay 1888',
    selite: 'Victoria Terminus valmistui kuningatar Victorian kultaisen '
      + 'juhlavuoden 1887 kunniaksi ja avattiin matkustajille 20. toukokuuta '
      + '1888 kymmenen rakennusvuoden jälkeen.',
  },
  colombo: {
    tiedosto: 'tuotanto/tuot-colombo.png',
    kaupunki: 'Colombo',
    otsikko: 'Colombo 1875',
    selite: 'Kahviruoste oli tuhonnut Ceylonin kahviviljelmät, ja vuonna 1875 '
      + 'James Taylorin viljelmältä lähetettiin saaren ensimmäinen teelasti '
      + 'Lontoon huutokauppaan.',
  },
  karachi: {
    tiedosto: 'tuotanto/tuot-karachi.png',
    kaupunki: 'Karachi',
    otsikko: 'Karachi 1873',
    selite: 'Suezin kanavan avaaminen 1869 nosti Karachin Sindin vehnän ja '
      + 'puuvillan vientisatamaksi, ja brittien hallintorakennuksista Frere '
      + 'Hall oli valmistunut 1865.',
  },
};

/** Kaupungin juliste tai null. Yksi kysely, jotta tarkistus on samanlainen kaikkialla. */
export function kaupunginJuliste(cityId) {
  return JULISTEET[cityId] ?? null;
}
