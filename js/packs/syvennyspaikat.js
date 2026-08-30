/*
 * SYVENNYSTARINOIDEN PAIKAT JA AIHESYMBOLIT — karttamerkin data.
 *
 * Raamatun kirjaus SYVENNYSTARINAT KARTALLE (omistaja 29.8.2026 ilta):
 * v1326:ssa reitittömiksi jääneet fokusvirtatäkyt — syvennystarinat
 * kuvineen ja minivisoineen — siirretään KARTALLE MERKEIKSI. Tarinat
 * itse asuvat kaupunkien fokusvirtapaketeissa (js/packs/fokusvirta-*.js
 * `takyt`); tämä taulu antaa jokaiselle tarinalle sen, mitä kartta
 * tarvitsee eikä paketti kanna:
 *
 *   lat/lon   jutun tapahtumapaikka asteina. Laudalle projisoidaan
 *             ajossa (js/fokusmitat.js projisoiLaudalle) — sama
 *             ratkaisu kuin eläintäyillä (js/packs/elaintakyt.js),
 *             joten sama taulu palvelee jokaista lautaa ilman
 *             käsin laskettuja koordinaatteja.
 *   symboli   aihesymboli symbolikirjaston kategoriana
 *             (js/fokusnosto-symbolit.js NOSTOSYM_TYYPIT). Raamatun
 *             YHTENÄINEN KOHDEMALLI: erot kohteiden välillä ovat
 *             sisällön laajuus ja AIHESYMBOLI — selitevalikon aihevalo
 *             löytää tarinan tällä (NOSTOSYM_PAAKATEGORIAT).
 *   nimio     lyhyt karttanimiö merkin kylkeen (≤ ~18 merkkiä ennen
 *             lyhennystä) — kortin otsikko on lause, nimiö on nimi.
 *
 * KOORDINAATIT ON TARKISTETTU LÄHTEISTÄ (agenttikartoitus 30.8.2026):
 * jokaisen pisteen kommentissa on paikan nimi ja lähde, ja arvioksi
 * jäänyt sijainti on merkitty. Sisältöön (otsikot, tekstit, visat,
 * kuvat) tämä tiedosto ei koske sanallakaan.
 *
 * Avaimet: kaupunki-id (js/packs/fokusvirrat.js) → täyn id → tiedot.
 * Kaupunki, jota taulussa ei ole, ei saa merkkejä — sen tarinat
 * odottavat omaa kartoitusosuuttaan.
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten ainoa top-level-nimi alkaa
 * SYVENNYS-etuliitteellä.
 */

export const SYVENNYSPAIKAT = {
  ateena: {
    /*
     * Athena Niken temppeli, Akropoliin lounaiskulma.
     * Lähde: en-Wikipedia "Temple of Athena Nike" -koordinaatit; sama alue
     *   kuin pakin oma kohtaamispiste "Akropolis" (23,72573E/37,97154N)
     */
    nike: {
      lat: 37.9717, lon: 23.7258, symboli: 'historia', nimio: 'Niken temppeli',
    },
    /*
     * Ateenan antiikin agora (Ancient Agora of Athens).
     * Lähde: en-Wikipedia "Ancient Agora of Athens" -koordinaatit
     */
    diogenes: {
      lat: 37.975, lon: 23.7233, symboli: 'sana', nimio: 'Diogeneen astia',
    },
    /*
     * Iliou Melathron / Ateenan numismaattinen museo, Panepistimiou-katu 12.
     * Lähde: en-Wikipedia "Numismatic Museum, Athens" -koordinaatit
     */
    schliemann: {
      lat: 37.9808, lon: 23.7328, symboli: 'historia', nimio: 'Iliou Melathron',
    },
  },
  berliini: {
    /*
     * Voitonpylväs (Siegessäule), Großer Stern (sijainti on arvio).
     * Lähde: en/de-Wikipedia "Siegessäule" -koordinaatit (nykyinen paikka
     *   Großer Sternillä; teksti kuvaa 1873 vihkiäisiä Königsplatzilla,
     *   nyk. Platz der Republik n. 1,5 km pohjoisempana — arvio, koska
     *   kahdesta mahdollisesta pisteestä on valittu nykyinen)
     */
    kultaliisa: {
      lat: 52.5145, lon: 13.3501, symboli: 'historia', nimio: 'Kulta-Liisa',
    },
    /*
     * Berliinin keskusta (yleinen sijainti, ei yksittäistä paikkaa) (sijainti on arvio).
     * Lähde: Täky ei kuvaa yksittäistä paikkaa vaan koko kaupungin
     *   viemäriverkon rakentamista; sijoitettu symbolisesti keskustaan
     *   (Alexanderplatz)
     */
    viemarit: {
      lat: 52.5219, lon: 13.4132, symboli: 'tekniikka', nimio: 'Hobrechtin putket',
    },
    /*
     * Köllnischer Park (Berliinin entisen karhutarhan paikka).
     * Lähde: en-Wikipedia "Köllnischer Park" -koordinaatit; Commons-kuvan
     *   kuvaus vahvistaa saman puiston
     */
    karhu: {
      lat: 52.5099, lon: 13.4143, symboli: 'elain', nimio: 'Berliinin karhu',
    },
  },
  budapest: {
    /*
     * Aquincum, Óbuda.
     * Lähde: en-Wikipedia "Aquincum" -koordinaatit
     */
    aquincum: {
      lat: 47.5661, lon: 19.0442, symboli: 'historia', nimio: 'Aquincum',
    },
    /*
     * Pál-völgyi-barlang (sijainti on arvio).
     * Lähde: en-Wikipedia "Pál-völgyi Cave" -koordinaatit; teksti mainitsee
     *   myös Szemlő-hegyin luolan ja Gellértinvuoren kristalliluolan, joten
     *   piste on annettu tekstin päänostona olevalle suurimmalle luolalle
     */
    luolat: {
      lat: 47.5394, lon: 18.9758, symboli: 'luonto', nimio: 'Budan luolat',
    },
    /*
     * Andrássy út / Millenniumin maanalainen (Oktogon, linjan keskivaihe) (sijainti on arvio).
     * Lähde: en-Wikipedia "Metro Line M1 (Budapest Metro)"; rata kulkee
     *   koko Andrássy-kadun alla Vörösmarty tériltä Hősök terelle, piste
     *   valittu reitin keskivaiheilta
     */
    kisfoldalatti: {
      lat: 47.5057, lon: 19.0631, symboli: 'tekniikka', nimio: 'Maanalainen',
    },
  },
  bukarest: {
    /*
     * Colțean tornin paikka.
     * Lähde: Pakin oma kommentti: en-Wikipedia "Turnul Colței"
     *   -koordinaatit (sama piste kuin paketin oma kohtaamispiste)
     */
    coltea: {
      lat: 44.43515, lon: 26.10298, symboli: 'historia', nimio: 'Colțean torni',
    },
    /*
     * Bukarestin vanhakaupunki (studion likimääräinen sijainti) (sijainti on arvio).
     * Lähde: Lähdeteksti (en-Wikipedia "Carol Popp de Szathmari",
     *   takyt-bukarest.md) ei anna studion tarkkaa osoitetta; sijoitettu
     *   Bukarestin vanhaankaupunkiin/Coltean lähelle, jossa hän toimi
     */
    szathmari: {
      lat: 44.4305, lon: 26.101, symboli: 'kulttuuri', nimio: 'Szathmárin studio',
    },
    /*
     * Libearty-karhusanktuaari, Zărnești (sijainti on arvio).
     * Lähde: en-Wikipedia "Zărnești" -koordinaatit (sanktuaarin täsmällistä
     *   porttia ei erikseen haettu); kaukana Bukarestista, kuten
     *   tehtävänannon Korintin kanava -tyyppinen poikkeus — koko maan
     *   eläinaihe
     */
    karhut: {
      lat: 45.558, lon: 25.349, symboli: 'elain', nimio: 'Karhusanktuaari',
    },
  },
  dubrovnik: {
    /*
     * Minčetan torni, Dubrovnikin kaupunginmuuri.
     * Lähde: WebSearch: Tripomatic/locationscout, 42°38'34.9"N 18°6'30.4"E
     */
    tornit: {
      lat: 42.643, lon: 18.1084, symboli: 'historia', nimio: 'Muurin tornit',
    },
    /*
     * Lokrumin saari, Dubrovnikin edustalla.
     * Lähde: en-Wikipedia "Lokrum" (42°38'N 18°07'E, tarkennettu
     *   42.6311/18.1177)
     */
    lokrum: {
      lat: 42.632, lon: 18.1177, symboli: 'luonto', nimio: 'Lokrum',
    },
    /*
     * Sponzan palatsi, Stradun, Dubrovnikin vanhakaupunki.
     * Lähde: Wikidata Q2986276 / en-Wikipedia "Sponza Palace", 42°38'37"N
     *   18°6'36"E
     */
    sponza: {
      lat: 42.6436, lon: 18.11, symboli: 'kauppa', nimio: 'Sponzan palatsi',
    },
  },
  helsinki: {
    /*
     * Kotiharjun sauna, Harjutorinkatu 1, Kallio, Helsinki.
     * Lähde: WebSearch: kotiharjunsauna.fi / Apple Maps, Harjutorinkatu 1
     */
    sauna: {
      lat: 60.18647, lon: 24.95728, symboli: 'kulttuuri', nimio: 'Löyly ja avanto',
    },
    /*
     * Helsingin keskusta (ei sidottu yksittäiseen paikkaan -- soitin, ei paikka) (sijainti on arvio).
     * Lähde: Ei todellista paikkaa tekstissä; sijoitettu kaupungin
     *   keskustaan yleisohjeen mukaisesti
     */
    kantele: {
      lat: 60.1699, lon: 24.9384, symboli: 'kulttuuri', nimio: 'Kantele',
    },
    /*
     * Ruotsalainen teatteri (Svenska Teatern), Helsinki -- kantaesityspaikka marraskuussa 1899.
     * Lähde: WebSearch: Wikidata Q926046, Pohjoisesplanadi 2, 60°10'02"N
     *   24°56'36"E
     */
    finlandia: {
      lat: 60.16722, lon: 24.94333, symboli: 'kulttuuri', nimio: 'Finlandia',
    },
  },
  istanbul: {
    /*
     * Käärmepylväs, Hippodromi/Sultanahmet, Istanbul.
     * Lähde: Peli: koodikommentti js/packs/fokusvirta-istanbul.js r.600
     *   (kaanon, kohtaamispiste käyttää samaa pylvästä)
     */
    kaarmepylvas: {
      lat: 41.0058, lon: 28.9758, symboli: 'historia', nimio: 'Käärmepylväs',
    },
    /*
     * Camondon portaat (Kamondo Merdivenleri), Galata/Karaköy, Istanbul.
     * Lähde: WebSearch: en-Wikipedia "Camondo Stairs", 41°01'31.7"N
     *   28°58'27.2"E
     */
    camondo: {
      lat: 41.02547, lon: 28.97422, symboli: 'kauppa', nimio: 'Camondon portaat',
    },
    /*
     * Kadıköy, Istanbulin Aasian puoli (kuva otettu siellä; teksti koskee koko kaupunkia) (sijainti on arvio).
     * Lähde: Yleistieto Kadıköyn keskipisteestä; teksti ei sido kissoja
     *   yhteen paikkaan, sijoitus kuvan ottopaikan mukaan
     */
    kissat: {
      lat: 40.9833, lon: 29.0333, symboli: 'elain', nimio: 'Istanbulin kissat',
    },
  },
  kobenhavn: {
    /*
     * Tivoli, Kööpenhamina.
     * Lähde: WebSearch: Wikidata Q110289, 55°40'25"N 12°34'06"E
     */
    tivoli: {
      lat: 55.67361, lon: 12.56833, symboli: 'kulttuuri', nimio: 'Tivolin portti',
    },
    /*
     * Jellingin kivet, Jylanti, Tanska.
     * Lähde: WebSearch: en-Wikipedia "Jelling stones", 55°45'24"N 9°25'10"E
     */
    jelling: {
      lat: 55.75667, lon: 9.41944, symboli: 'historia', nimio: 'Jellingin kivet',
    },
    /*
     * Billund, Tanska (Legon syntypaikka).
     * Lähde: WebSearch: en-Wikipedia "Billund, Denmark", 55.73083 N /
     *   9.11528 E
     */
    lego: {
      lat: 55.73083, lon: 9.11528, symboli: 'tekniikka', nimio: 'Legon syntysija',
    },
  },
  lontoo: {
    /*
     * Millennium Bridgen laskuvesiranta (Thames-foreshore).
     * Lähde: en-Wikipedia "Millennium Bridge, London" (sama koordinaatti
     *   kuin paketin oma kohtaamispiste; mudlark-kuva on juuri tältä
     *   kohdalta)
     */
    vuorovesi: {
      lat: 51.510173, lon: -0.098438, symboli: 'luonto', nimio: 'Thamesin vuorovesi',
    },
    /*
     * Richmond Park.
     * Lähde: en-Wikipedia "Richmond Park", prop=coordinates
     */
    hirvet: {
      lat: 51.44333, lon: -0.275, symboli: 'elain', nimio: 'Richmond Park',
    },
    /*
     * Cheapside (30-32 Cheapside, City of London) (sijainti on arvio).
     * Lähde: en-Wikipedia "Cheapside", prop=coordinates (katukoordinaatti;
     *   täsmällistä 30-32-osoitepistettä ei haettu erikseen, ero muutamia
     *   kymmeniä metrejä)
     */
    cheapside: {
      lat: 51.5141, lon: -0.0937, symboli: 'kauppa', nimio: 'Cheapsiden kätkö',
    },
  },
  madrid: {
    /*
     * Entisen Casa de Fierasin paikka, Retiron puisto (nyk. Paseo de Fernán Núñez 24 / kirjasto) (sijainti on arvio).
     * Lähde: es-Wikipedia "Parque del Buen Retiro" +
     *   madrid.es-kirjastotieto (osoite Paseo de Fernán Núñez 24); tarkkaa
     *   geokoodausta ei tehty, arvioitu kartalta
     */
    casadefieras: {
      lat: 40.4105, lon: -3.678, symboli: 'elain', nimio: 'Casa de Fieras',
    },
    /*
     * Plaza de Oriente, Monumento a Felipe IV.
     * Lähde: es-Wikipedia "Monumento a Felipe IV", prop=coordinates
     */
    felipe: {
      lat: 40.418538, lon: -3.71224, symboli: 'kulttuuri', nimio: 'Filipin patsas',
    },
    /*
     * Madridin keskusta / Congreso de los Diputados (symbolinen sijainti, teksti ei nimeä yhtä paikkaa) (sijainti on arvio).
     * Lähde: Ei sijaintia tekstissä; sijoitettu Espanjan tasavallan
     *   hallituksen istuntopaikan (Palacio de las Cortes) kohdalle
     *   symbolisesti
     */
    tasavalta: {
      lat: 40.4153, lon: -3.6971, symboli: 'historia', nimio: 'Tasavallan vuosi',
    },
  },
  pariisi: {
    /*
     * Tuileries-palatsin entinen paikka, Jardin des Tuileries / Place du Carrousel.
     * Lähde: en-Wikipedia "Tuileries Palace", prop=coordinates
     */
    tuileriat: {
      lat: 48.86222, lon: 2.3325, symboli: 'historia', nimio: 'Tuileriain rauniot',
    },
    /*
     * Pariisi (ei yhtä nimettyä paikkaa; koko piiritetty kaupunki ja Seinen katkaistu salakaapeli) (sijainti on arvio).
     * Lähde: Teksti ei nimeä yhtä paikkaa (piiritys koski koko kaupunkia);
     *   sijoitettu kaupungin keskipisteeseen
     */
    kyyhkyposti: {
      lat: 48.8566, lon: 2.3522, symboli: 'tekniikka', nimio: 'Kyyhkyposti',
    },
    /*
     * Boulevard des Capucines (Nadarin ateljeen alue; täsmällistä katuosoitetta ei ole paketin lähteessä) (sijainti on arvio).
     * Lähde: Paketin oma kommentti: Nadarin ateljeen katuosoite ei ole
     *   lähteessä, joten koordinaatti on arvio boulevardin keskivaiheilta
     *   (yleisesti tunnettu suunnilleen no. 35 -alue Place de l'Opéran ja
     *   Madeleinen välissä)
     */
    impressionistit: {
      lat: 48.8705, lon: 2.328, symboli: 'kulttuuri', nimio: 'Impressionistit',
    },
  },
  praha: {
    /*
     * Tynin kirkko (Church of Our Lady before Týn), Vanhankaupungin tori.
     * Lähde: en-Wikipedia "Church of Our Lady before Týn", prop=coordinates
     */
    tycho: {
      lat: 50.0876, lon: 14.4227, symboli: 'historia', nimio: 'Tycho Brahe',
    },
    /*
     * Klementinum.
     * Lähde: en-Wikipedia "Clementinum", prop=coordinates
     */
    klementinum: {
      lat: 50.08667, lon: 14.41639, symboli: 'sana', nimio: 'Klementinum',
    },
    /*
     * Prahan eläintarha (Zoo Praha), Troja.
     * Lähde: en-Wikipedia "Prague Zoo", prop=coordinates
     */
    przewalski: {
      lat: 50.11694, lon: 14.40611, symboli: 'elain', nimio: 'Prahan hevoset',
    },
  },
};
