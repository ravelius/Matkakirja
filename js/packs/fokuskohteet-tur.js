/*
 * FOKUSKOHTEET — TURKKI. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja
 * js/packs/fokuskohteet-bgr.js:lle, ja rakenne on kopioitu Bulgarian
 * tiedostosta sellaisenaan: SAMA LISTA palvelee kahta pintaa,
 * kohdenostoa fokusvirrassa (js/fokusvirta.js poimii kohteita
 * tunnuksilla, pöllö puhuu `teksti`-kentän kuplasta, painikkeen lupaus
 * on `nappi`) ja kartan klikattavaa pop-upia (js/fokuskohteet.js lukee
 * `nimi`, `tyyppi`, `kuva`, `teksti` ja `lahde`). Kentät ja niiden
 * perustelut on selitetty Kreikan tiedoston alussa; tässä on vain se,
 * mikä Turkissa on toisin.
 *
 * KAKSI KENTTÄÄ PÖLLÖÄ VARTEN (omistajan tilaus 25.8.2026): `kysymykset`
 * on kaksi valmista, pelaajan äänellä kirjoitettua kysymystä kartan
 * tietoruudun loppuun, ja `korostukset` on lista sanoista, jotka
 * alleviivataan leipätekstistä ja joista pöllö kertoo lisää
 * ('perusmuoto|näkyvä muoto', jos taivutus eroaa). Sama sääntö kuin
 * muualla: kysymys ei toista sitä, minkä teksti jo kertoo.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * docs/mantereet-tyoaineisto/fokuskohteet-turkki.md, kohteet 1–14
 * samassa järjestyksessä kuin aineistossa. Aineiston pop-up-tekstit on
 * siirretty tänne sellaisinaan: yhtään faktaa ei ole lisätty eikä
 * muutettu. Kaksi tietoista muotoseikkaa, kumpikin aineiston oman
 * ohjeen mukainen:
 *
 *   1. ANKARAN "HUOM 1873:" on kirjoitettu auki omaksi lauseekseen.
 *      Aineisto sanoo itse, että tunniste on peliteksti ja
 *      muotoiltavissa uudelleen (sama ratkaisu kuin Korintin kanavassa,
 *      js/packs/fokuskohteet-grc.js).
 *   2. ARARATIN loppuun on lisätty vuoren kaksi muuta nimeä (Ağrı Dağı,
 *      Masis). Ne ovat aineiston oman kohdan 11 "Nimi"-rivillä, ja sen
 *      HERKKYYS-kohta vaatii nimenomaan, että popup mainitsee molemmat
 *      — luonnosteksti vain ei vielä tehnyt sitä. Ei uutta faktaa,
 *      vaan aineiston oman vaatimuksen täyttäminen.
 *
 * VANJÄRVI ON TYYPILTÄÄN 'muu'. Kohdetyyppejä on kuusi (js/fokuskohteet.js
 * KOHDE_TYYPIT: kaupunki, vuori, meri, saari, joki, muu), eikä järveä ole
 * niiden joukossa. Tämä paketti ei saanut koskea tuohon tiedostoon, joten
 * järvi saa yleisotsikon "Kartalla". Yhden rivin lisäys (jarvi: 'Järvi')
 * korjaisi asian, jos päätoimittaja pitää sitä tarpeellisena.
 *
 * ── AJOITUS, JOKA KOSKEE KOKO MAATA ────────────────────────────────
 *
 * Vuonna 1873 tämä ei ollut Turkki vaan osmanivaltakunta, ja Istanbul
 * oli sen pääkaupunki (js/packs/fokus-grc.js merkitsee maan
 * valtiomuodoksi juuri "osmanivaltakunta v. 1873"). Se koskee jokaista
 * kaupunkikohdetta: Ankara oli Angoran vilajetin keskus, İzmir oli
 * briteille Smyrna, Konya kirjoitettiin englanniksi Konia. Kohteiden
 * tekstit sanovat tämän itse siellä, missä se on olennaista.
 *
 * ── KAKSI HERKKYYSRAJAUSTA, JOTKA AINEISTO TEKI JA TÄMÄ TIEDOSTO
 *    NOUDATTAA ────────────────────────────────────────────────────
 *
 * İzmirin ja Trabzonin tekstit on rajattu tarkoituksella 1800-luvulle.
 * Vuoden 1922 tapahtumat, vuoden 1923 väestönvaihto ja
 * pontoskreikkalaisten karkotus ovat lähdeartikkeleissa, ja ne kaikki
 * on jätetty pois: peli kulkee Kreikasta Turkkiin ja käsittelee
 * molempia kunnioittavasti, eikä yhden pop-up-ruudun mitta riitä niiden
 * käsittelyyn. Aineiston hylkylistan kohta 6 vaatii tähän Fablen
 * erillisen linjauksen — sitä ei ole, joten aihetta ei ole.
 *
 * Araratin kohdalla rajakysymyksiä ei kommentoida. Vuori on Armenian
 * kansallissymboli ja sen vaakunassa, vaikka se sijaitsee Turkin
 * puolella rajaa; teksti kertoo vuoren ja mainitsee sen nimet, ei
 * enempää (aineiston kohta 11, HERKKYYS).
 *
 * ── KOORDINAATIT ───────────────────────────────────────────────────
 *
 * Sama kaksi kaavaa ja samat vakiot kuin Kreikassa ja Bulgariassa,
 * koska Istanbul on pelattavissa kummallakin laudalla:
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio).
 *     Tarkistus: Istanbul 28,955 E / 41,01361 N → 6798,5 / 1762,9, ja
 *     laudalla laatta on kohdassa 6796,5 / 1763 (js/packs/
 *     maailmankartta.js) — 2,0 yksikön ero idässä, 0,1 pohjoisessa.
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js). Tarkistus: Istanbul → 767,1 / 814,9,
 *     laudalla 766 / 815.
 *
 * KAKSI KOHDETTA ON ILMAN `europe`-PISTETTÄ. Euroopan laudan kaava
 * kattaa pituusasteet −11°…41° (js/packs/europe.js, Islanti-kommentti);
 * sen ulkopuolella piste jäisi laudan viewBoxin (0…1000) ulkopuolelle
 * näkymättömiin. Ararat on 44,3 E ja Vanjärvi 42,8 E, eli kumpikin on
 * kaavan ulkopuolella — niiltä puuttuu `europe` tarkoituksella, ja
 * js/fokuskohteet.js jättää pisteettömän kohteen pois laudalta itse
 * (Number.isFinite-suodatin). Turkin fokuslehti on joka tapauksessa
 * maailmankartan lehti (js/packs/fokus-grc.js FOKUS_POHJAT, TUR).
 *
 * KARKEAT YLEISPISTEET on merkitty kohteittain: Kappadokian piste on
 * alueen keskusta eikä sen laajuus, Mustanmeren piste on koko meren
 * karkea keskipiste Krimin suunnassa Turkin rannikon ulkopuolella, ja
 * Kızılırmakin piste on joen SUU Mustallamerellä eikä joen tunnetuin
 * kohta. Kartalla nämä ovat oikeita paikkoja alueen nimeämiselle;
 * täsmäpaikkoja niistä ei saa tehdä (aineiston hylkylistan kohdat 1–3).
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Yksi kuva kohdetta kohti, ja JOKAINEN on aineiston omalta,
 * Commonsin imageinfo-rajapinnasta 25.8.2026 varmennetulta listalta
 * (olemassaolo, koko, lisenssi, tekijä ja Restrictions-kenttä) — ei
 * arvattuja nimiä eikä yhtään uutta hakua. Kaikki ovat PD tai CC, ja
 * tekijä on `lahde`-rivillä, koska CC BY vaatii maininnan.
 *
 * Aineiston kolme kuvavaroitusta on noudatettu (hylkylistan kohta 7):
 * `Restrictions: personality` -kuva Pamukkalesta on jätetty pois; FAL-
 * lisenssiset A.Savinin kuvat on jätetty pois, koska pelin sääntö on
 * PD/CC; ja SALTOnlinen "No restrictions" -kuvat Ankarasta on jätetty
 * pois, koska lisenssikentässä ei ole nimettyä CC-lisenssiä.
 *
 * İZMIRIN AJOITUSANSA on kirjoitettu auki kuvatekstiin. Konakin
 * kellotorni on vuodelta 1901 eikä sitä ollut olemassa 1873; selite
 * sanoo sen itse, jottei kuva vihjaa isoisän nähneen sitä (aineiston
 * hylkylistan kohta 8).
 *
 * KUVIA EI OLE KATSOTTU SILMIN. Aineisto sanoo tämän itse, ja
 * silmätarkistus on tehtävä ennen julkaisua samalla käytännöllä kuin
 * herokuville — erityisesti tunnistettavien etualan ihmisten varalta.
 */

/**
 * Turkin fokuskohteet: aineiston 14 kohdetta samassa järjestyksessä
 * kuin docs/mantereet-tyoaineisto/fokuskohteet-turkki.md.
 */
export const FOKUSKOHTEET_TUR = [
  {
    id: 'troija',
    nimi: 'Troija',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka pitkälle kaivaukset ovat ehtineet nykyään?',
      'Mitä Priamoksen aarteelle tapahtui löydön jälkeen?',
    ],
    korostukset: ['Hisarlık|Hisarlıkin', 'Frank Calvert'],
    /* Valintakuplan painike. Lupaus on 1873-kulma, ei maantiede. */
    nappi: 'Maailman kuumin kaivaus juuri nyt',
    // 26,23889 E / 39,9575 N — en-Wikipedia "Troy".
    laudat: {
      maailmankartta: { x: 6708.0, y: 1804.6 },
      europe: { x: 715.0, y: 842.7 },
    },
    teksti: 'Kaupungin sijainti oli kadonnut vuosisadoiksi, kunnes '
      + 'englantilaissyntyinen Frank Calvert kaivoi Hisarlıkin kummulla '
      + 'vuodesta 1865 ja tunnisti paikan oikein. Heinrich Schliemann '
      + 'jatkoi siitä: kaivauskaudet 1871–1873 paljastivat yhdeksän '
      + 'päällekkäistä kaupunkia, ja viimeisenä kaivauspäivänä kesäkuussa '
      + '1873 hän löysi kullan, jota kutsui Priamoksen aarteeksi. Isoisän '
      + 'matkan aikana Troija oli maailman kuumin kaivaus.',
    lahde: 'en-Wikipedia "Troy", johdanto sekä osiot "Frank Calvert" ja '
      + '"Heinrich Schliemann"; aarteen löytöpäivä en-Wikipedia "Heinrich '
      + 'Schliemann" (tarkistettu 25.8.2026).',
    /*
     * Aineiston varmennettu tiedosto. HUOM: teksti ei väitä, että
     * Troija II olisi Homeroksen Troija — Schliemann uskoi niin, mutta
     * lähde toteaa kerroksen olleen tuhat vuotta liian vanha
     * (aineiston kohta 1, Varmuus).
     */
    kuva: {
      tiedosto: 'Legendary walls of Troy (8708672267).jpg',
      selite: 'Troijan muureja Hisarlıkin kummulla. Kaivaukset ovat '
        + 'paljastaneet yhdeksän päällekkäistä kaupunkia.',
      lahde: 'Jorge Láscar, Wikimedia Commons (CC BY 2.0)',
    },
  },
  {
    id: 'efesos',
    nimi: 'Efesos',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi kaupunki lopulta hylättiin?',
      'Minne temppelin löydöt vietiin?',
    ],
    korostukset: ['Artemiin temppeli', 'John Turtle Wood'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Maailmanihme, joka piti kaivaa esiin',
    // 27,34194 E / 37,94111 N — en-Wikipedia "Ephesus".
    laudat: {
      maailmankartta: { x: 6744.7, y: 1883.1 },
      europe: { x: 736.2, y: 895.7 },
    },
    teksti: 'Efesos oli antiikin maailman kuuluisin pyhiinvaelluskohde: '
      + 'Artemiin temppeli, yksi seitsemästä ihmeestä, valmistui täällä '
      + 'noin 550 eaa. ja siinä oli yli sata 17-metristä marmoripylvästä. '
      + 'Kaupungin teatteriin mahtui 24 000 katsojaa. Brittiläinen '
      + 'arkkitehti John Turtle Wood etsi kadonnutta temppeliä British '
      + 'Museumin rahoituksella vuodesta 1863 ja löysi sen kivijalan 1869 '
      + '— kaivaukset olivat vielä käynnissä isoisän matkan aikaan.',
    lahde: 'en-Wikipedia "Ephesus", johdanto sekä osiot "Temple of Artemis" '
      + 'ja "Archaeological research" (tarkistettu 25.8.2026). Pylväiden '
      + 'korkeus 17 m on aineiston koostajan muunnos lähteen jalkamitasta '
      + '(56 jalkaa).',
    /*
     * Aineiston oma varoitus noudatettu: Celsuksen kirjasto on
     * Efesoksen tunnetuin näkymä mutta ERI RAKENNUS kuin Artemiin
     * temppeli, josta teksti kertoo — selite sanoo siksi, mitä kuvassa
     * on, eikä anna ymmärtää sen olevan temppeli.
     */
    kuva: {
      tiedosto: 'Ephesus Celsus Library Façade.jpg',
      selite: 'Celsuksen kirjaston julkisivu Efesoksessa. Artemiin '
        + 'temppelistä on jäljellä vain kivijalka ja yksi pylväs.',
      lahde: 'Benh Lieu Song, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'kappadokia',
    nimi: 'Kappadokia',
    tyyppi: 'muu',
    kysymykset: [
      'Asuuko kallokolotaloissa vielä ihmisiä?',
      'Kuinka syvälle maanalaiset kaupungit ulottuvat?',
    ],
    korostukset: ['tuhkakivi|tuhkakiveen', 'keijunsavupiippu|keijunsavupiipuiksi'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Kaupunkeja pehmeän kiven sisällä',
    /*
     * 34,86722 E / 38,61833 N — en-Wikipedia "Cappadocia". PISTE ON
     * ALUEEN KESKUSTA, ei sen laajuus: dim on lähteessä 1000, vaikka
     * kyseessä on kokonainen historiallinen alue useassa maakunnassa
     * (aineiston hylkylistan kohta 3).
     */
    laudat: {
      maailmankartta: { x: 6995.6, y: 1856.9 },
      europe: { x: 880.7, y: 877.9 },
    },
    teksti: 'Kappadokian maisema syntyi tulivuorista: Erciyesin, Hasanin '
      + 'ja Göllüdağin purkaukset peittivät alueen paksuun tuhkakiveen, '
      + 'jota tuuli ja vesi ovat sitten kuluttaneet miljoonien vuosien '
      + 'ajan "keijunsavupiipuiksi". Pehmeään kiveen on kaiverrettu satoja '
      + 'kirkkoja ja luostareita — ja kokonaisia maanalaisia kaupunkeja, '
      + 'joissa on monikerroksisia puolustusjärjestelmiä: käytäviä '
      + 'sulkevia pyöreitä kivipaasia ja aukkoja katossa.',
    lahde: 'en-Wikipedia "Cappadocia", johdanto sekä osiot "Geology" ja '
      + '"Underground cities" (tarkistettu 25.8.2026).',
    // Category:Göreme. Göremen laakso on juuri se maisema, jonka teksti
    // kuvaa.
    kuva: {
      tiedosto: 'Göreme Valley in Cappadocia edit1.jpg',
      selite: 'Göremen laakson keijunsavupiippuja Kappadokiassa. Kiveen '
        + 'on kaiverrettu satoja kirkkoja ja luostareita.',
      lahde: 'Brocken Inaglory, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'pamukkale',
    nimi: 'Pamukkale ja Hierapolis',
    tyyppi: 'muu',
    kysymykset: [
      'Saako terasseilla vielä kävellä?',
      'Miksi antiikin kaupunki rakennettiin juuri tähän?',
    ],
    korostukset: ['travertiini|travertiinia', 'Pluton portti'],
    /* Valintakuplan painike. Lupaus on nimen kuva, ei geologia. */
    nappi: 'Puuvillalinna kuumien lähteiden päällä',
    /*
     * 29,12333 E / 37,92389 N — en-Wikipedia "Pamukkale". Hierapolis on
     * erikseen 29,12583 E / 37,925 N, eli noin 250 metrin päässä;
     * kartalla ne ovat sama piste.
     */
    laudat: {
      maailmankartta: { x: 6804.1, y: 1883.8 },
      europe: { x: 770.4, y: 896.2 },
    },
    teksti: 'Rinteen valkoiset terassit ovat travertiinia: 17 kuumaa '
      + 'lähdettä (35–100 °C) tuo kalsiumkarbonaattia pintaan, '
      + 'hiilidioksidi karkaa, ja kivi saostuu hyllyiksi. Muodostuma on '
      + 'noin 2 700 metriä pitkä, 600 leveä ja 160 korkea. Sen päälle '
      + 'rakennettiin antiikin Hierapolis, jonka pyhin paikka oli Pluton '
      + 'portti — luola, josta nousi tukahduttavaa kaasua, ja jota '
      + 'pidettiin manalan ovena.',
    lahde: 'en-Wikipedia "Pamukkale", johdanto ja osio "Geology"; Pluton '
      + 'portti en-Wikipedia "Hierapolis", osio "Ploutonion" (tarkistettu '
      + '25.8.2026).',
    /*
     * Category:Pamukkale. AINEISTON HYLKÄÄMÄ KUVA EI OLE TÄSSÄ:
     * Giorgio Galeottin 6.10.2025 otos nro 01 kantoi
     * `Restrictions: personality` eikä tule käyttöön. FAL-lisenssinen
     * A.Savinin kuva on niin ikään jätetty pois (pelin sääntö on PD/CC).
     */
    kuva: {
      tiedosto: 'The Travertine terraces of Pamukkale.jpg',
      selite: 'Pamukkalen travertiiniterasseja. Muodostuma on noin '
        + '2 700 metriä pitkä ja 160 metriä korkea.',
      lahde: 'Slyronit, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'ankara',
    nimi: 'Ankara',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Milloin Ankarasta tuli pääkaupunki?',
      'Onko Augustuksen kirjoitus yhä luettavissa?',
    ],
    korostukset: ['vilajetti|vilajetin', 'galatalaiset'],
    /* Valintakuplan painike. Lupaus on 1873-kulma, ei nykytila. */
    nappi: 'Pääkaupunki, jota ei vielä ollut',
    // 32,85472 E / 39,92889 N — en-Wikipedia "Ankara".
    laudat: {
      maailmankartta: { x: 6928.5, y: 1805.7 },
      europe: { x: 842.0, y: 843.5 },
    },
    /*
     * Aineiston "HUOM 1873:" -tunniste on kirjoitettu auki omaksi
     * lauseekseen — juuri niin kuin dokumentti itse ehdottaa (sama
     * ratkaisu kuin Korintin kanavassa, js/packs/fokuskohteet-grc.js).
     * Kelttien saapumisvuodeksi on valittu 278 eaa., koska aineisto
     * merkitsee sen tarkemmaksi kuin johdannon 280–64 eaa.
     */
    teksti: 'Isoisän matkan aikaan Ankara ei ollut pääkaupunki vaan '
      + 'Angoran vilajetin keskus — pääkaupunki oli Istanbul. Kelttiläiset '
      + 'galatalaiset asettuivat kaupunkiin 278 eaa. ja tekivät siitä '
      + 'yhden pääleiristään; keisari Augustus nosti sen 25 eaa. Galatian '
      + 'provinssin pääkaupungiksi, ja hänen tekojensa virallinen luettelo '
      + 'hakattiin marmoriin erään temppelin seiniin. Kaupungin nimi elää '
      + 'yhä angorakanin, angoravuohen ja angorakissan nimissä.',
    lahde: 'en-Wikipedia "Ankara", johdanto ja osio "History" (tarkistettu '
      + '25.8.2026).',
    /*
     * Category:Ankara Castle. AINEISTON VAROITUS NOUDATETTU: SALTOnlinen
     * aikalaispanoraama jätettiin pois, koska sen lisenssikentässä lukee
     * "No restrictions" eikä nimettyä CC-lisenssiä.
     */
    kuva: {
      tiedosto: 'Castillo de Ankara, Ankara, Turquía, 2024-10-03, DD 47.jpg',
      selite: 'Ankaran linna kaupungin vanhan ytimen laella. Isoisän '
        + 'aikaan kaupunki tunnettiin Euroopassa nimellä Angora.',
      lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'izmir',
    nimi: 'İzmir',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Milloin Smyrnasta tuli İzmir myös englanniksi?',
      'Kulkeeko vuoden 1867 rata vielä Aydınille?',
    ],
    korostukset: ['Smyrna', 'vilajetti|vilajettinsa'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Valtakunnan portti länteen',
    // 27,13222 E / 38,42444 N — en-Wikipedia "İzmir".
    laudat: {
      maailmankartta: { x: 6737.7, y: 1864.4 },
      europe: { x: 732.1, y: 883.0 },
    },
    /*
     * TEKSTI ON RAJATTU 1800-LUVULLE (aineiston kohta 6, IKÄSOPIVUUS JA
     * HERKKYYS). Vuoden 1922 tapahtumat ja vuoden 1923 väestönvaihto
     * ovat lähdeartikkelissa ja on jätetty tarkoituksella pois.
     */
    teksti: 'Smyrna oli 1800-luvulla Ottomaanien vilkkain länsisatama ja '
      + 'monikielinen kauppakaupunki: brittien arvion mukaan siellä asui '
      + '1865 noin 180 000 ihmistä, joista 80 000 kreikkalaisia. Turkin '
      + 'nykyalueen ensimmäinen rautatie lähti täältä — 130 kilometrin '
      + 'rata Aydınille aloitettiin 1856 ja valmistui 1867. Vuonna 1867 '
      + 'kaupunki sai vihdoin oman vilajettinsa. Isoisän aikaan se oli '
      + 'Istanbulin jälkeen valtakunnan tärkein portti länteen.',
    lahde: 'en-Wikipedia "İzmir", johdanto ja osio "Ottoman era" '
      + '(tarkistettu 25.8.2026). Väestöluku on lähteessä brittiläisen '
      + 'Hyde Clarken arvio, ei virallinen laskenta.',
    /*
     * Category:Konak Square. AJOITUSANSA KIRJOITETTU AUKI (aineiston
     * hylkylistan kohta 8): kellotorni on vuodelta 1901 eikä sitä ollut
     * olemassa 1873, joten selite sanoo sen itse.
     */
    kuva: {
      tiedosto: 'İzmir Clock Tower, Konak Square.jpg',
      selite: 'Konakin aukio İzmirissä. Aukion kellotorni valmistui vasta '
        + '1901, siis isoisän matkan jälkeen.',
      lahde: 'Maurice Flesier, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'bursa',
    nimi: 'Bursa',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kudotaanko Bursassa vielä silkkiä?',
      'Miksi hovi siirtyi pois Bursasta?',
    ],
    korostukset: ['Uludağ', 'Mysian Olympos|Mysian Olympokseksi'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Ensimmäinen pääkaupunki',
    // 29,06222 E / 40,19722 N — en-Wikipedia "Bursa".
    laudat: {
      maailmankartta: { x: 6802.1, y: 1795.1 },
      europe: { x: 769.2, y: 836.4 },
    },
    teksti: 'Bursa oli Ottomaanien ensimmäinen pääkaupunki: se vallattiin '
      + 'bysanttilaisilta 1326 ja toimi pääkaupunkina 1335-luvulta '
      + '1360-luvulle, kunnes hovi siirtyi Edirneen. Kaupunki oli jo '
      + '500-luvulla kuuluisa silkkikankaistaan, ja ottomaaniaikana se '
      + 'jakoi idän silkkiä — myös Ming-Kiinasta — Genovaan ja Firenzeen '
      + 'asti. Yllä kohoaa Uludağ, jota antiikissa kutsuttiin Mysian '
      + 'Olympokseksi.',
    lahde: 'en-Wikipedia "Bursa", johdanto ja osio "History" (tarkistettu '
      + '25.8.2026).',
    /*
     * Category:Bursa. AIKALAISKUVA on valittu tarkoituksella: Abdullah
     * frères oli sama hovivalokuvaamo, joka kuvasi sulttaanit, ja kuva
     * on isoisän matkan tuntumasta. Pieni tiedosto (640×499) — sama
     * ratkaisu kuin Sofian vankityrmäkuvassa, jossa aikalaisuus painoi
     * enemmän kuin pikselimäärä.
     */
    kuva: {
      tiedosto: 'The mausoleum and Yeşil Cami (Green Mosque) of Çelebi Sultan Mehmet (I) in Bursa between 1880 and 1893.jpg',
      selite: 'Vihreä moskeija ja mausoleumi Bursassa 1880–1893 otetussa '
        + 'valokuvassa.',
      lahde: 'Abdullah frères 1880–1893, Wikimedia Commons (public domain)',
    },
  },
  {
    id: 'konya',
    nimi: 'Konya',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Pyörivätkö dervishit vielä nykyään?',
      'Mitä Rumi itse kirjoitti?',
    ],
    korostukset: ['Rum-seldžukit|Rum-seldžukkien', 'mevlevi-veljeskunta|mevlevi-veljeskunnan'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Pyörivien dervishien kaupunki',
    // 32,49306 E / 37,87444 N — en-Wikipedia "Konya".
    laudat: {
      maailmankartta: { x: 6916.4, y: 1885.7 },
      europe: { x: 835.1, y: 897.5 },
    },
    teksti: 'Konya oli Rum-seldžukkien sulttaanikunnan pääkaupunki, josta '
      + 'hallittiin lähes koko Anatoliaa. Runoilija ja mystikko Rumi eli '
      + 'täällä loppuelämänsä, ja vuonna 1273 hänen seuraajansa perustivat '
      + 'mevlevi-veljeskunnan, joka tunnetaan pyörivinä dervisheinä. Rumin '
      + 'turkoosikupolinen hauta on yhä kaupungin tärkein nähtävyys. '
      + 'Kaupungin nimi juontaa todennäköisesti heettiläisestä '
      + 'paikannimestä Ikkuwaniya.',
    lahde: 'en-Wikipedia "Konya", johdanto sekä osiot "Name" ja "Culture" '
      + '(tarkistettu 25.8.2026). Nimen alkuperä on lähteessä '
      + 'varauksellinen ("is believed to correspond"), siksi '
      + '"todennäköisesti"; kansanetymologiaa Medusan päästä ei kerrota, '
      + 'koska lähde itse merkitsee sen kansanetymologiaksi. Isoisä olisi '
      + 'kirjoittanut kaupungin nimen muodossa Konia tai Koniah.',
    // Category:Mevlana Museum. Rumin turkoosikupolinen hauta on juuri se
    // rakennus, jonka teksti nimeää.
    kuva: {
      tiedosto: 'Mevlana Müzesi 01.jpg',
      selite: 'Rumin turkoosikupolinen hauta Konyassa. Se on yhä '
        + 'kaupungin tärkein nähtävyys.',
      lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'trabzon',
    nimi: 'Trabzon',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mistä nimi Trapezous tulee?',
      'Miten Trapezuntin keisarikunta säilyi niin pitkään?',
    ],
    korostukset: ['Ksenofon|Ksenofonin', 'Trapezuntin keisarikunta|Trapezuntin keisarikunnan'],
    /* Valintakuplan painike. Lupaus on se, mikä kaatui viimeisenä. */
    nappi: 'Bysantin viimeinen jäänne',
    // 39,7225 E / 41,005 N — en-Wikipedia "Trabzon".
    laudat: {
      maailmankartta: { x: 7157.4, y: 1763.2 },
      europe: { x: 973.9, y: 815.2 },
    },
    /*
     * TEKSTI ON RAJATTU 1400-LUVULLE ASTI (aineiston kohta 9,
     * IKÄSOPIVUUS JA HERKKYYS). Pontoskreikkalaisten karkotus 1923 on
     * lähdeartikkelissa ja jätetty tarkoituksella pois — sama periaate
     * kuin İzmirissä.
     */
    teksti: 'Miletoksesta tulleet kreikkalaiset perustivat kaupungin 756 '
      + 'eaa. Se oli ensimmäinen kreikkalainen kaupunki, jonka Ksenofonin '
      + 'kymmenentuhannen palkkasoturin joukko tavoitti taistellessaan '
      + 'tiensä ulos Persiasta. Neljännen ristiretken jälkeen 1204 siitä '
      + 'tuli Trapezuntin keisarikunnan pääkaupunki — kaikkein pisimpään '
      + 'säilynyt Bysantin seuraajavaltio, joka kaatui vasta 1461, '
      + 'kahdeksan vuotta Konstantinopolin jälkeen. Marco Polo päätti '
      + 'paluumatkansa tähän satamaan.',
    lahde: 'en-Wikipedia "Trabzon", johdanto sekä osiot "Name", "Antiquity" '
      + 'ja "Empire of Trebizond" (tarkistettu 25.8.2026).',
    // Category:Hagia Sophia (Trabzon). Sama kuvaaja, jonka kuvia on jo
    // pelissä (Üsküdar, Süleymaniye).
    kuva: {
      tiedosto: 'Hagia Sophia Trabzon.jpg',
      selite: 'Trabzonin Hagia Sofia. Kirkko rakennettiin Trapezuntin '
        + 'keisarikunnan aikana meren rannalle.',
      lahde: 'İhsan Deniz Kılıçoğlu, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'gobeklitepe',
    nimi: 'Göbekli Tepe',
    tyyppi: 'muu',
    kysymykset: [
      'Ketkä pylväät pystyttivät?',
      'Miksi kaivauksia tehdään niin hitaasti?',
    ],
    korostukset: ['megaliitti|megaliitteja'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Vanhempi kuin savi tai kirjoitus',
    // 38,92167 E / 37,22361 N — en-Wikipedia "Göbekli Tepe".
    laudat: {
      maailmankartta: { x: 7130.7, y: 1910.7 },
      europe: { x: 958.5, y: 914.6 },
    },
    /*
     * KAKSI VÄITETTÄ, JOITA TÄSSÄ EI OLE (aineiston kohta 10, Varmuus):
     * paikkaa EI väitetä haudatun tarkoituksella — lähde toteaa
     * hypoteesin hylätyksi — eikä sitä sanota "maailman ensimmäiseksi
     * temppeliksi", koska rakennusten tarkoitusta ei ole määritetty.
     */
    teksti: 'Kukkulan huipulle rakennettiin suuria ympyränmuotoisia '
      + 'rakennelmia T-kirjaimen muotoisine kivipylväineen noin 9500–8000 '
      + 'eaa. — ne ovat maailman vanhimpia tunnettuja megaliitteja, '
      + 'tuhansia vuosia vanhempia kuin savi, kirjoitus tai metalli. '
      + 'Pylväisiin on veistetty villieläimiä sekä ihmismäisiä käsiä ja '
      + 'vaatteita. Kohde huomattiin kartoituksessa 1963, mutta sen '
      + 'merkitys tajuttiin vasta 1994. Vuoteen 2021 mennessä siitä oli '
      + 'kaivettu noin kymmenesosa.',
    lahde: 'en-Wikipedia "Göbekli Tepe", johdanto (tarkistettu 25.8.2026).',
    // Category:Göbekli Tepe. Laajalti käytetty yleiskuva kaivausalueesta.
    kuva: {
      tiedosto: 'Göbekli Tepe, Urfa.jpg',
      selite: 'Göbekli Tepen kaivausaluetta. T-kirjaimen muotoiset '
        + 'kivipylväät ovat maailman vanhimpia tunnettuja megaliitteja.',
      lahde: 'Teomancimit, Wikimedia Commons (CC BY-SA 3.0)',
    },
  },
  {
    id: 'ararat',
    nimi: 'Ararat',
    tyyppi: 'vuori',
    kysymykset: [
      'Onko vuori yhä tulivuori?',
      'Kuinka usein huipulle noustaan nykyään?',
    ],
    korostukset: ['Ağrı Dağı', 'Masis'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Turkin korkein huippu',
    /*
     * 44,2983 E / 39,7019 N — en-Wikipedia "Mount Ararat" (dim=10000).
     * EI `europe`-PISTETTÄ: 44,3 E on Euroopan laudan kaavan
     * (−11°…41°) ulkopuolella, ks. tiedoston alku.
     */
    laudat: {
      maailmankartta: { x: 7309.9, y: 1814.6 },
    },
    teksti: 'Suuri Ararat on Turkin korkein huippu, 5 137 metriä; sen '
      + 'vieressä kohoaa Pieni Ararat, 3 896 metriä. Keskiajalta lähtien '
      + 'Euroopassa vuori on samastettu Raamatun "Araratin vuoriin", '
      + 'joille Nooan arkin kerrotaan laskeutuneen — vaikka kiistanalaista '
      + 'on, tarkoittaako Genesis 8:4 juuri tätä vuorta. Ensimmäinen '
      + 'tunnettu nousu tehtiin 1829: Friedrich Parrot, Khachatur Abovian '
      + 'ja neljä muuta. Turkiksi vuori on Ağrı Dağı, armeniaksi Masis.',
    lahde: 'en-Wikipedia "Mount Ararat", johdanto; nimet myös fi-Wikipedia '
      + '"Ararat" (tarkistettu 25.8.2026). Sanamuoto "ensimmäinen tunnettu '
      + 'nousu" on pakollinen: lähde puhuu ensimmäisestä kirjatusta '
      + 'noususta, ja keskiajalla tehtiin yrityksiä.',
    /*
     * Category:Mount Ararat. AINEISTON VAROITUS NOUDATETTU: kuvaa
     * "Mount Ararat and the Yerevan skyline.jpg" ei käytetä, koska se on
     * kuvattu Armenian puolelta eikä siten sovi Turkin karttakohteeksi.
     */
    kuva: {
      tiedosto: '00 2399 Mount Ararat, Turkey.jpg',
      selite: 'Suuri Ararat, 5 137 metriä. Vasemmalla kohoaa Pieni '
        + 'Ararat.',
      lahde: 'W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'vanjarvi',
    nimi: 'Vanjärvi',
    tyyppi: 'muu',
    kysymykset: [
      'Mistä järven vesi tulee, jos se ei laske mihinkään?',
      'Millainen kala inci kefali on?',
    ],
    korostukset: ['mikrobialiitti|mikrobialiittitorneja', 'inci kefali'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Järvi, joka ei laske mihinkään',
    /*
     * 42,81667 E / 38,63333 N — en-Wikipedia "Lake Van" (dim=10000).
     * EI `europe`-PISTETTÄ: 42,8 E on Euroopan laudan kaavan
     * (−11°…41°) ulkopuolella, ks. tiedoston alku.
     */
    laudat: {
      maailmankartta: { x: 7260.6, y: 1856.3 },
    },
    teksti: 'Vanjärvi on Turkin suurin järvi ja yksi maailman harvoista '
      + 'yli 3 000 neliökilometrin umpijärvistä: tulivuorenpurkaus tukki '
      + 'sen laskujoen esihistoriallisella ajalla. Vesi on niin emäksistä '
      + '(pH 9,7–9,8), ettei se yleensä jäädy talvellakaan. Pohjalta on '
      + 'löydetty jopa 40 metriä korkeita mikrobialiittitorneja, joita '
      + 'sinilevät ovat kasvattaneet. Pitkään järven ainoa tunnettu kala '
      + 'oli inci kefali, helmisalakka.',
    lahde: 'en-Wikipedia "Lake Van", johdanto sekä osiot "Hydrology and '
      + 'chemistry" ja "Biology" (tarkistettu 25.8.2026). Sanamuoto '
      + '"ainoa tunnettu kala" on pakollinen: vuonna 2018 löytyi uusi '
      + 'laji mikrobialiitin sisältä.',
    // Category:Akdamar Island. Akdamarin saari on järven tunnetuin
    // näkymä, ja kuva näyttää sen takaa aukeavan järven.
    kuva: {
      tiedosto: '00 3385 Akdamar Island - Lake Van.jpg',
      selite: 'Akdamarin saari Vanjärvellä. Järvi on Turkin suurin ja '
        + 'niin emäksinen, ettei se yleensä jäädy.',
      lahde: 'W. Bulach, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'mustameri',
    nimi: 'Mustameri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka syvälle hapeton kerros ulottuu?',
      'Millaisia hylkyjä pohjasta on löytynyt?',
    ],
    korostukset: ['meromiktinen', 'hapeton|hapetonta'],
    /* Valintakuplan painike. Lupaus on aarrepelin oma kulma. */
    nappi: 'Meri, jossa hylyt eivät lahoa',
    /*
     * 35 E / 44 N — en-Wikipedia "Black Sea" (dim=800000). KOKO MEREN
     * KARKEA KESKIPISTE, joka osuu Turkin rannikon ulkopuolelle Krimin
     * suuntaan (aineiston hylkylistan kohta 1). Sopii alueen
     * nimeämiseen, EI täsmäklikkaukseen. Sama piste kuin Bulgarian
     * listalla — se on molempien maiden yhteinen meri.
     */
    laudat: {
      maailmankartta: { x: 7000.0, y: 1642.8 },
      europe: { x: 883.2, y: 736.4 },
    },
    teksti: 'Mustameri on maailman suurin meromiktinen vesialue: pinnalla '
      + 'virtaa kevyt makea vesi ulos Bosporin kautta, pohjalla painuu '
      + 'raskas suolainen vesi sisään, eivätkä kerrokset sekoitu. Siksi '
      + 'yli 90 prosenttia meren syvästä vedestä on hapetonta. Juuri '
      + 'hapettomuus on tehnyt siitä meriarkeologien unelman: '
      + 'puurunkoiset laivanhylyt säilyvät pohjassa käytännössä '
      + 'lahoamatta.',
    lahde: 'en-Wikipedia "Black Sea", johdanto sekä osiot "Hydrology" ja '
      + '"Marine archaeology" (tarkistettu 25.8.2026).',
    // Category:Giresun. Kuva on Turkin rannikolta, mikä sopii kohteen
    // sijaintiin paremmin kuin koko meren yleispanoraama.
    kuva: {
      tiedosto: 'Black Sea Turkey Giresun.jpg',
      selite: 'Mustameri Giresunin kohdalla Turkin pohjoisrannikolla.',
      lahde: 'Cardiodynia, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
  {
    id: 'kizilirmak',
    nimi: 'Kızılırmak',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi jokea kutsutaan punaiseksi?',
      'Kuka voitti pimennyksen taistelun?',
    ],
    korostukset: ['Maraššantiya', 'Halys'],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Joki, joka pysäytti sodan',
    /*
     * 35,95639 E / 41,73444 N — en-Wikipedia "Kızılırmak River". HUOM:
     * tämä on JOEN SUU Mustallamerellä Samsunin luoteispuolella, ei joen
     * keskikohta eikä sen tunnetuin kohta (aineiston hylkylistan kohta
     * 2). Joki on 1 355 km pitkä ja tekee laajan Halys-mutkan, jonka
     * kääntöpiste on noin 38,7 N / 34,8 E — jos joki halutaan joskus
     * piirtää viivana, se on visuaalisesti tärkeämpi kuin suu.
     */
    laudat: {
      maailmankartta: { x: 7031.9, y: 1734.2 },
      europe: { x: 901.6, y: 796.0 },
    },
    /*
     * KAKSI KUULUISAA TARINAA PUUTTUU TARKOITUKSELLA (aineiston kohta
     * 14, EPÄVARMA): Thaleen pimennysennustus ja Delfoin oraakkelin
     * lause Kroisokselle ("jos ylität Halysin, tuhoat suuren
     * valtakunnan") EIVÄT löydy lähdeartikkelista, ja jälkimmäinen olisi
     * sitonut tämän suoraan Delfoin fokuskohteeseen. Ilman uutta
     * lähdettä niitä ei käytetä, vaikka houkutus on kova.
     */
    teksti: 'Heettiläisille Maraššantiya oli valtakunnan länsiraja, ja '
      + 'antiikissa Halys erotti Lyydian Persian valtakunnasta. Sen '
      + 'rannalla käytiin 28. toukokuuta 585 eaa. "pimennyksen taistelu": '
      + 'kesken taistelun aurinko pimeni, ja järkyttyneet osapuolet '
      + 'solmivat rauhan siihen paikkaan. Kun Lyydian Kroisos vihdoin '
      + 'ylitti joen 547 eaa. hyökätäkseen Kyyros Suurta vastaan, hän '
      + 'hävisi — ja Persia ulottui Egeanmerelle asti.',
    lahde: 'en-Wikipedia "Kızılırmak River", johdanto ja osio "History" '
      + '(tarkistettu 25.8.2026). HUOM: en-Wikipediassa pelkkä '
      + '"Kızılırmak" on moniselitesivu.',
    // Category:Kızılırmak. Kuva on Bafran kohdalta eli juuri siltä
    // suistolta, jonka koordinaatti osoittaa.
    kuva: {
      tiedosto: 'Kızıl ırmak Bafra Samsun (64325689).jpeg',
      selite: 'Kızılırmak Bafran suistossa. Joki on Turkin pisin '
        + 'kokonaan maan sisällä virtaava joki, 1 355 kilometriä.',
      lahde: 'Sadi Sezgin, Wikimedia Commons (CC BY 3.0)',
    },
  },
];

const TUR_TUNNUKSITTAIN = new Map(FOKUSKOHTEET_TUR.map((k) => [k.id, k]));

/**
 * Poimii Turkin kohteet tunnuksilla siinä järjestyksessä kuin ne on
 * pyydetty. Tuntematon tunnus jätetään pois hiljaa — sama sääntö ja
 * sama syy kuin Kreikassa ja Bulgariassa: kirjoitusvirhe listassa ei saa
 * kaataa koko kaupungin virtaa.
 *
 * NIMI ON PREFIKSOITU (turFokuskohteet), koska yhden tiedoston versio
 * ketjuttaa kaikki moduulit samaan näkyvyysalueeseen: paljas
 * `fokuskohteet` olisi niputuksessa uudelleenjulistus Kreikan ja
 * Bulgarian vastaavien kanssa (tools/tarkista-niputus.mjs).
 */
export function turFokuskohteet(tunnukset) {
  return (tunnukset ?? []).map((id) => TUR_TUNNUKSITTAIN.get(id)).filter(Boolean);
}
