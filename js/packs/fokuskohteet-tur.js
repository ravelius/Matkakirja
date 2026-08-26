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
 * kuin docs/mantereet-tyoaineisto/fokuskohteet-turkki.md, ja niiden
 * perässä symbolitaksonomian ensimmäinen sisältöerä (viisi kohdetta,
 * ks. erän oma kommentti listan sisällä).
 */
export const FOKUSKOHTEET_TUR = [
  {
    id: 'troija',
    nimi: 'Troija',
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
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
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
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
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'luonto',
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
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'luonto',
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
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'historia',
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
    // Symboli kuratoitu 26.8.2026: jokainen kortin avaava kohde saa merkin.
    symboli: 'luonto',
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
  /*
   * ── SYMBOLITAKSONOMIAN ENSIMMÄINEN SISÄLTÖERÄ (omistaja 26.8.2026,
   *    Raamatun osio "Fokusmoodi", kohta SYMBOLITAKSONOMIA) ───────────
   *
   * Tästä alaspäin jokaisella kohteella on uusi kenttä `symboli`
   * (taksonomian kategoria: ruoka, kauppa, merenkulku, elain, urheilu).
   * Rinnakkainen työ piirtää symbolit; ilman piirtäjää kohde näkyy
   * entiseen tapaan pisteenä. Faktapohja on en-Wikipedia raakatekstinä
   * (index.php?action=raw) artikkeli kerrallaan 26.8.2026 — ei aiempaa
   * työaineistoa, joten lähderivit osoittavat suoraan artikkeleihin.
   * Koordinaattikaavat validoitiin ennen käyttöä kahdella tämän
   * tiedoston kohteella (Trabzon ja Göbekli Tepe: lasketut luvut
   * vastasivat kirjattuja 0,1 yksikön tarkkuudella). Kuvat on valittu
   * Commonsin rajapinnalla (imageinfo: lisenssi, tekijä, Restrictions
   * tyhjä) ja katsottu silmin ~480 px:n leveydellä. Turkissa ei ole
   * panoraamavapautta, joten kuvien aiheet ovat vanhoja rakennuksia,
   * ruokaa, eläin ja PD-kartta — ei modernia arkkitehtuuria eikä
   * uusia taideteoksia. Jean Pascal Sébahin 1890-luvun basaarikuva
   * HYLÄTTIIN, koska negatiiviin on raaputettu studion nimikirjoitus
   * (vanhan studion signeeraus hylkää kuvan siinä missä vesileimakin).
   */
  {
    id: 'gaziantep',
    nimi: 'Gaziantep',
    tyyppi: 'kaupunki',
    symboli: 'ruoka',
    kysymykset: [
      'Montako taikinakerrosta baklavassa on?',
      'Miten pistaasit korjataan?',
    ],
    korostukset: ['kaymak|kaymak-kerman'],
    /* Valintakuplan painike. Lupaus on 1873-kulma: resepti ehti perille juuri ennen isoisää. */
    nappi: 'Resepti, joka ehti perille 1871',
    // 37,37806 E / 37,06583 N — en-Wikipedia "Gaziantep" (37°03′57″N
    // 37°22′41″E).
    laudat: {
      maailmankartta: { x: 7079.3, y: 1916.8 },
      europe: { x: 928.9, y: 918.8 },
    },
    teksti: 'Gaziantep on kuulu baklavastaan: ohuista taikinalevyistä, '
      + 'pähkinöistä ja makeasta liemestä kerrostettu leivonnainen '
      + 'tehdään täällä seudun omista pistaaseista ja tarjotaan usein '
      + 'kaymak-kerman kera. Kaupungin baklavaresepti saapui vuonna 1871 '
      + 'leipurilta, joka oli oppinut taidon Damaskoksessa — kaksi vuotta '
      + 'ennen isoisän matkaa. Vuonna 2013 Antep-baklava sai EU:n '
      + 'suojatun maantieteellisen merkinnän ensimmäisenä turkkilaisena '
      + 'tuotteena.',
    lahde: 'en-Wikipedia "Baklava", johdanto ja osio "Turkey" '
      + '(tarkistettu 26.8.2026; reseptin toi Çelebi Güllü). '
      + 'Koordinaatit en-Wikipedia "Gaziantep".',
    /*
     * Commons-haku "baklava Gaziantep". Commons 26.8.2026: lisenssi ja
     * Restrictions tarkistettu rajapinnasta, katsottu silmin
     * (baklavaa myyntitiskillä, ei ihmisiä, ei vesileimaa). Kuvaaja on
     * sama Adam Jones, jonka otos on jo Veliko Tarnovon kohteella.
     */
    kuva: {
      tiedosto: 'Baklava and Pistachios for Sale - Gaziantep.jpg',
      selite: 'Baklavaa ja pistaaseja myynnissä Gaziantepissä. Seudun '
        + 'pistaasit ovat kaupungin baklavan ydin.',
      lahde: 'Adam Jones, Wikimedia Commons (CC BY-SA 2.0)',
    },
  },
  {
    id: 'kapalicarsi',
    nimi: 'Kapalıçarşı',
    tyyppi: 'muu',
    symboli: 'kauppa',
    kysymykset: [
      'Mitä basaarissa myydään nykyään?',
      'Miten kauppias saa myymälän basaarista?',
    ],
    korostukset: ['Konstantinopolin valloitus|Konstantinopolin valloituksen'],
    /* Valintakuplan painike. Lupaus on rakennuksen ikä. */
    nappi: 'Kauppahalli vuodelta 1455',
    /*
     * 28,96793 E / 41,01058 N — en-Wikipedia "Grand Bazaar, Istanbul"
     * (41°0′38.09″N 28°58′4.56″E). Piste on Istanbulin laatan vieressä
     * (6796,5 / 1763) — esityssiirto erottaa merkit, kuten Akropoliin
     * ja Akropolis-museon parilla (js/fokuskohteet.js
     * eritteleKohdeRyhmat).
     */
    laudat: {
      maailmankartta: { x: 6798.9, y: 1763.0 },
      europe: { x: 767.4, y: 815.0 },
    },
    teksti: 'Istanbulin katettu basaari eli Kapalıçarşı on maailman '
      + 'suurimpia ja vanhimpia katettuja kauppapaikkoja: 61 katettua '
      + 'katua ja yli 4 000 myymälää, joissa käy satojatuhansia ihmisiä '
      + 'päivässä. Sen ydin rakennettiin talvella 1455–56 pian '
      + 'Konstantinopolin valloituksen jälkeen, kun sulttaani Mehmed II '
      + 'pystytti kankaiden ja jalokivien kaupalle oman hallin. Isoisä '
      + 'kulki samojen holvien alla kuin nykypäivän kävijä — basaaria '
      + 'sanotaan usein yhdeksi maailman ensimmäisistä kauppakeskuksista.',
    lahde: 'en-Wikipedia "Grand Bazaar, Istanbul", johdanto ja osio '
      + '"History" (tarkistettu 26.8.2026).',
    /*
     * Category:Gates of the Grand Bazaar. SISÄKUVAT HYLÄTTIIN
     * KATSOTTUINA: basaarin käytävät ovat aina väkeä täynnä, ja
     * jokaisessa katsotussa sisäkuvassa kasvot erottuvat (ei
     * tunnistettavia ihmisiä -sääntö). Sébahin 1890-luvun kuva
     * hylättiin studion signeerauksen vuoksi (ks. erän kommentti).
     * Tässä on Beyazıtin portti — historiallinen kiviportti, jonka
     * kaaressa lukee KAPALIÇARŞI / GRAND BAZAAR. Commons 26.8.2026:
     * 2140×3211, CC BY 2.0, Alexandru Panoiu, Restrictions tyhjä.
     * Katsottu silmin: portti ja kojujen tavaraa, ei ihmisiä, ei
     * vesileimaa.
     */
    kuva: {
      tiedosto: 'Bayezid Gate of the Grand Bazaar (AP4M2098 1PS) (28796761060).jpg',
      selite: 'Kapalıçarşın Beyazıtin portti. Kaaren medaljongissa on '
        + 'sulttaanin tughra eli nimikirjoitusmerkki.',
      lahde: 'Alexandru Panoiu, Wikimedia Commons (CC BY 2.0)',
    },
  },
  {
    id: 'gelibolu',
    nimi: 'Gelibolu',
    tyyppi: 'kaupunki',
    symboli: 'merenkulku',
    kysymykset: [
      'Mitä karttaan on piirretty Amerikasta?',
      'Millainen osmanien laivasto oli 1500-luvulla?',
    ],
    korostukset: ['Kitab-ı Bahriye'],
    /* Valintakuplan painike. Lupaus on kartan kohtalo. */
    nappi: 'Kartta, joka makasi palatsissa',
    // 26,67028 E / 40,41389 N — en-Wikipedia "Gelibolu" (40°24′50″N
    // 26°40′13″E).
    laudat: {
      maailmankartta: { x: 6722.3, y: 1786.6 },
      europe: { x: 723.3, y: 830.7 },
    },
    teksti: 'Gelibolun satamakaupungissa lapset "tuuditettiin uneen '
      + 'meren ja laivojen kehtolaululla", kirjoitti 1500-luvun '
      + 'historioitsija Ibn Kemal. Täällä syntyi Piri Reis, osmanien '
      + 'laivaston kartantekijä, jonka vuoden 1513 maailmankartta nojasi '
      + 'muun muassa Kolumbuksen sittemmin kadonneeseen karttaan ja '
      + 'jonka merikirja Kitab-ı Bahriye kuvasi rannikot laivureille. '
      + 'Isoisän aikaan kartta makasi unohdettuna Topkapın palatsissa: '
      + 'se löytyi uudelleen vasta 1929 ja on siitä asti ollut Turkille '
      + 'kansallisylpeyden aihe.',
    lahde: 'en-Wikipedia "Piri Reis", johdanto ja osio "Early life"; '
      + 'koordinaatit en-Wikipedia "Gelibolu" (tarkistettu 26.8.2026).',
    /*
     * Kuva on itse vuoden 1513 kartta — Piri Reisin oma käsialaa oleva
     * pergamentti, public domain. Commons 26.8.2026: Restrictions
     * tyhjä, katsottu silmin (karttafragmentti, ei vesileimaa).
     */
    kuva: {
      tiedosto: 'Piri reis world map 01.jpg',
      selite: 'Piri Reisin maailmankartan säilynyt osa vuodelta 1513. '
        + 'Kartta löytyi uudelleen Topkapın palatsista 1929.',
      lahde: 'Piri Reis 1513, Wikimedia Commons (public domain)',
    },
  },
  {
    id: 'vanin-kissa',
    nimi: 'Vanin kissa',
    tyyppi: 'muu',
    symboli: 'elain',
    kysymykset: [
      'Miksi kissa oppi uimaan?',
      'Voiko tutkimuskeskuksessa vierailla?',
    ],
    /* Valintakuplan painike, jos kohde nostetaan jonkin kaupungin virtaan. */
    nappi: 'Kissa, joka ui',
    /*
     * 43,38 E / 38,49417 N — en-Wikipedia "Van, Turkey" (38°29′39″N
     * 43°22′48″E). EI `europe`-PISTETTÄ: 43,4 E on Euroopan laudan
     * kaavan (−11°…41°) ulkopuolella, kuten Araratilla ja Vanjärvellä
     * (ks. tiedoston alku). Piste on VANIN KAUPUNKI — eri piste kuin
     * Vanjärvi-kohteen järven keskikohta.
     */
    laudat: {
      maailmankartta: { x: 7279.3, y: 1861.7 },
    },
    teksti: 'Vanjärven seudulla elää oma kissakantansa, jota ei ole '
      + 'jalostettu rotukirjoihin: kookas, liidunvalkoinen Vanin kissa, '
      + 'jonka silmät ovat siniset, meripihkanväriset tai '
      + 'kuuluisimmillaan yksi kumpaakin. Kissa tunnetaan "uivana '
      + 'kissana", sillä sen on nähty uivan Vanjärvessä. Puhtaita '
      + 'yksilöitä laskettiin 1992 enää 92, ja valkoista kantaa on '
      + 'vuodesta 1995 kasvattanut tutkimuskeskus Yüzüncü Yıl '
      + '-yliopiston kampuksella Vanissa.',
    lahde: 'en-Wikipedia "Van cat", johdanto sekä osiot "History", '
      + '"Breed registration" ja "Characteristics"; koordinaatit '
      + 'en-Wikipedia "Van, Turkey" (tarkistettu 26.8.2026).',
    /*
     * Kuva on en-Wikipedian "Van cat" -artikkelin oma. Keskuksessa
     * otettu aikuiskuva hylättiin (etualalla ihmisen käsi, kissan
     * silmät kiinni verkon takana); tässä pennussa erottuu juuri se,
     * mistä teksti kertoo — yksi sininen ja yksi vihertävä silmä.
     * Commons 26.8.2026: 1268×1392, CC BY 2.5, Restrictions tyhjä.
     * Katsottu silmin: valkoinen pentu eriväriset silmät näkyvissä,
     * ei ihmisiä, ei vesileimaa.
     */
    /*
     * KOLME KUVAA (Raamatun eläinkuvasäännön laajennus 26.8.2026).
     * Lisäkuvat katsottu silmin, lisenssit ja Restrictions
     * tarkistettu Commonsin rajapinnasta 26.8.2026: äärilähikuva
     * kasvoista (heterokromia terävimmillään) ja aikuinen kissa
     * Vanin yliopiston kissatalossa (kuvauspaikka todennettu).
     */
    kuvat: [
      {
        tiedosto: 'Van kitten.jpg',
        selite: 'Vanin kissan pentu, jolla on yksi sininen ja yksi '
          + 'vihertävä silmä — kannan kuuluisin tuntomerkki.',
        lahde: 'Bertilvidet, Wikimedia Commons (CC BY 2.5)',
      },
      {
        tiedosto: 'VAN CAT.png',
        selite: 'Lähikuvassa erot näkyvät parhaiten: toinen silmä '
          + 'sininen, toinen kellanvihreä.',
        lahde: 'Estin Giç Giç, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tiedosto: "Van, casa del gatto di van, presso la facoltà di veterinaria dell'università 04.jpg",
        selite: 'Aikuinen asukas Vanin yliopiston kissatalossa, jossa '
          + 'kantaa tutkitaan ja suojellaan.',
        lahde: 'Francesco Bini, Wikimedia Commons (CC BY-SA 4.0)',
      },
    ],
  },
  {
    id: 'kirkpinar',
    nimi: 'Kırkpınar',
    tyyppi: 'muu',
    symboli: 'urheilu',
    kysymykset: [
      'Miksi painijat öljyävät itsensä?',
      'Miten ottelu ratkeaa?',
    ],
    korostukset: ['pehlivan|Pehlivanit'],
    /* Valintakuplan painike. Lupaus on perinteen ikä. */
    nappi: 'Puoli vuosituhatta painia',
    /*
     * 26,55556 E / 41,67694 N — en-Wikipedia "Edirne" (41°40′37″N
     * 26°33′20″E). Piste on EDIRNEN KAUPUNKI, jonka liepeillä turnaus
     * on käyty — turnauskentällä ei ole omaa koordinaattia
     * artikkelissa.
     */
    laudat: {
      maailmankartta: { x: 6718.5, y: 1736.5 },
      europe: { x: 721.1, y: 797.5 },
    },
    teksti: 'Edirnen liepeillä on painittu öljypainia joka vuosi '
      + 'vuodesta 1360: Kırkpınar, "neljänkymmenen lähteen" turnaus, '
      + 'pitää Guinnessin ennätystä maailman pisimpään jatkuneena '
      + 'urheilukilpailuna. Pehlivanit eli painijat pukeutuvat vain '
      + 'nahkaisiin polvihousuihin, kıspeteihin, ja valelevat itsensä '
      + 'oliiviöljyllä ennen jokaista ottelua. Kolmipäiväisen turnauksen '
      + 'voittaja kantaa päänpainijan arvoa seuraavaan Kırkpınariin '
      + 'asti. Isoisän matkan aikaan perinne oli jo yli 500 vuotta '
      + 'vanha.',
    lahde: 'en-Wikipedia "Kırkpınar", johdanto ja osio "Description" '
      + '(tarkistettu 26.8.2026). Koordinaatit en-Wikipedia "Edirne".',
    /*
     * Category:Oil wrestling in Turkey. NYKYTURNAUKSEN VALOKUVAT
     * HYLÄTTIIN, koska niissä painijoiden ja yleisön kasvot erottuvat
     * selvästi (ei tunnistettavia ihmisiä -sääntö), ja Kırkpınarin
     * muistomerkkikuvat, koska Turkissa ei ole panoraamavapautta
     * moderneille veistoksille. Tämä on sen sijaan noin vuoden 1809
     * maalaus — aikalaiskuva perinteestä, joka oli isoisän matkankin
     * aikaan täsmälleen sama laji. Selite sanoo suoraan, että paikka
     * on Topkapın puutarha eikä Kırkpınarin kenttä. Commons 26.8.2026:
     * 728×424, public domain (anonyymi kreikkalainen taiteilija,
     * n. 1809), Restrictions tyhjä. Katsottu silmin: painipari ja
     * yleisöä, ei vesileimaa eikä signeerausta.
     */
    kuva: {
      tiedosto: 'Oil wrestling match in the gardens of the Sultan\'s Palace.jpg',
      selite: 'Öljypainiottelu Topkapın palatsin puutarhassa '
        + 'tuntemattoman kreikkalaisen taiteilijan maalauksessa '
        + 'noin 1809. Laji oli sama kuin Kırkpınarin kentällä.',
      lahde: 'Tuntematon kreikkalainen taiteilija n. 1809, Wikimedia '
        + 'Commons (public domain)',
    },
  },
  /*
   * ── ENTISET TÄKYNOSTOT NORMAALEINA KOHTEINA (omistaja 26.8.2026
   *    ilta: *"Täkyjä josta tulee puhekupla pitää olla vain yksi per
   *    maa. Kaikki muut normaaleita."*) ────────────────────────────────
   *
   * Istanbulin täkypoolissa (js/packs/fokusvirta-istanbul.js
   * takynostot) oli kolme nostoa; siellä on nyt tasan yksi, ja nämä
   * kaksi ovat kartan tavallisia kohteita.
   *
   * TEKSTIT, KUVAT JA LÄHTEET OVAT NOSTOJEN OMAT eikä niitä ole
   * kirjoitettu uudelleen: `lunastus` → `teksti`, `otsikko` → `nappi`,
   * kuvat kaikkine kenttineen entisellään. Nostojen omat perustelut
   * (lähteen varaus "reportedly", kuvavalinnan silmätarkistusehto) ovat
   * mukana sellaisinaan.
   *
   * PAIKAT OVAT TYÖAINEISTON OMIA, EIVÄT ARVATTUJA. Nostoilla ei ollut
   * koordinaatteja, koska ne piirtyivät ruudun alalaidan liuskana, mutta
   * kohde tarvitsee paikan kartalla. Työaineisto nimeää kummankin
   * (docs/mantereet-tyoaineisto/takynostot-turkki.md, ehdokas 1:
   * *"Kohde: Dolmabahçen palatsi"*; ehdokas 5: *"Kohde: Eskikaraağaçin
   * kylä, Karacabey, Bursan maakunta … UUSI kohde, jos haikarakylä
   * halutaan omaksi karttapisteeksi"*), ja asteluvut on muunnettu laudan
   * yksiköiksi tiedoston alussa kuvatuilla kaavoilla.
   */
  {
    id: 'dolmabahce',
    nimi: 'Dolmabahçen palatsi',
    tyyppi: 'muu',
    symboli: 'historia',
    /* Valintakuplan painike: noston oma klikkiotsikko sellaisenaan. */
    nappi: 'Sulttaanin äiti läimäytti Ranskan keisarinnaa',
    // 29,00167 E / 41,03944 N — en-Wikipedia "Dolmabahçe Palace".
    laudat: {
      maailmankartta: { x: 6800.1, y: 1761.8 },
      europe: { x: 768.0, y: 814.3 },
    },
    /*
     * Faktat: takynostot-turkki.md, ehdokas 1. LÄHDE ITSE VARAA ASIAN
     * sanalla "reportedly" ja antaa kaksi eri versiota — raportti
     * vaatii, että molemmat kerrotaan ja varaus näkyy. Ilman sitä
     * tämä olisi klikkihuijaus.
     */
    teksti: 'Vuonna 1868 sulttaani Abdülaziz vei vieraansa, Ranskan '
      + 'keisarinna Eugénien, tapaamaan äitiään Dolmabahçen palatsiin. '
      + 'Pertevniyal Sultan piti vieraan naisen läsnäoloa omissa '
      + 'yksityisissä huoneissaan loukkauksena, ja hänen kerrotaan '
      + 'läimäisseen keisarinnaa kasvoihin — tilanne oli lähellä '
      + 'kansainvälistä selkkausta. Toisen kertomuksen mukaan hän '
      + 'suuttui siitä, että Eugénie tarttui hänen poikaansa '
      + 'käsivarresta, ja läimäisi tätä vatsaan muistutuksena siitä, '
      + 'ettei oltu Ranskassa. Hovista vuoti kaksi eri huhua siitä, '
      + 'mihin sulttaanin äiti löi.',
    lahde: 'en-Wikipedia "Abdulaziz", osio "European tour" (tarkistettu '
      + '25.8.2026 työaineistoon docs/mantereet-tyoaineisto/'
      + 'takynostot-turkki.md, ehdokas 1). Lähde varaa tapahtuman sanalla '
      + '"reportedly", ja molemmat sen antamat versiot on kerrottu.',
    /*
     * Commons (takynostot-turkki.md, ehdokas 1, varmennettu
     * 25.8.2026): 2481×3823, public domain, Franz Xaver Winterhalter,
     * 1852 — keisarinnan kuuluisin muotokuva.
     */
    kuva: {
      tiedosto: 'Franz Xaver Winterhalter Empress Eugenie.jpg',
      selite: 'Keisarinna Eugénie Franz Xaver Winterhalterin '
        + 'muotokuvassa vuodelta 1852.',
      lahde: 'Franz Xaver Winterhalter 1852, Wikimedia Commons (public domain)',
    },
  },
  {
    /*
     * ELÄINKOHDE. Nosto oli kirjoitettu MENNEESEEN AIKAMUOTOON, ja se
     * on raportin nimenomainen vaatimus: *"Wikipedia-artikkelia ei ole
     * päivitetty vuoden 2021 jälkeen… Älä väitä, että ystävyys jatkuu
     * vuonna 2026 — kirjoita menneessä aikamuodossa."* Aikamuoto on
     * siirretty tänne sellaisenaan.
     */
    id: 'yaren',
    nimi: 'Eskikaraağaç',
    tyyppi: 'muu',
    symboli: 'elain',
    /* Valintakuplan painike: noston oma klikkiotsikko sellaisenaan. */
    nappi: 'Haikara palasi Afrikasta samalle kalastajalle — joka kevät',
    // 28,6125 E / 40,18639 N — en-Wikipedia "Eskikaraağaç, Karacabey".
    laudat: {
      maailmankartta: { x: 6787.1, y: 1795.6 },
      europe: { x: 760.6, y: 836.7 },
    },
    /* Faktat: takynostot-turkki.md, ehdokas 5 ja takyt-istanbul.md, täky 18. */
    teksti: 'Uluabat-järven rannalla, 199 asukkaan Eskikaraağaçin '
      + 'kylässä Bursan maakunnassa, asuu kalastaja Adem Yılmaz. '
      + 'Vuodesta 2010 alkaen sama kattohaikara — kylässä sitä '
      + 'kutsuttiin nimellä Yaren — palasi Afrikan-muutolta joka '
      + 'maaliskuu samaan kylään ja laskeutui joka aamu hänen pieneen '
      + 'veneeseensä. Kalaan lähdettiin yhdessä, ja niin jatkui yli '
      + 'kymmenen vuoden ajan. Paikallinen valokuvaaja kuvasi '
      + 'ystävyyden ensi kerran 2016, siitä tehtiin palkittu '
      + 'dokumentti, ja kylän keskusaukiolle pystytettiin patsas '
      + 'kalastajasta ja haikarasta.',
    lahde: 'en-Wikipedia "Yaren (stork)" ja "Eskikaraağaç, Karacabey" '
      + '(tarkistettu 25.8.2026 työaineistoihin docs/mantereet-tyoaineisto/'
      + 'takynostot-turkki.md, ehdokas 5, ja takyt-istanbul.md, täky 18). '
      + 'Artikkelia ei ole päivitetty vuoden 2021 jälkeen, joten teksti on '
      + 'menneessä aikamuodossa.',
    /*
     * KUVAVALINTA ON TIETOINEN VARMAN PUOLEN VALINTA. Tarinan oma
     * alkuperäiskuva on `Adem Amca ve Yaren Leylek 2020.jpg`
     * (5568×3480, CC BY-SA 4.0, Alpertuydes 6.3.2020) — sama
     * valokuvaaja, joka nimetään lähteessä, ja miniatyyrinä selvästi
     * parempi koukku. Molemmat raportit merkitsevät sen kohdalle
     * SILMÄTARKISTUS PAKOLLINEN, koska kuvassa on tunnistettava
     * henkilö. Sitä tarkistusta ei ole tehty (kuvia ei ole katsottu
     * silmin), joten tähän on valittu henkilötön kuva samasta
     * lajista ja samasta maasta. Kun silmätarkistus on tehty, kuvan
     * voi vaihtaa — teksti kantaa kumman tahansa kanssa.
     *
     * Commons (takyt-istanbul.md, täky 17, varmennettu 25.8.2026):
     * 4250×2833, CC BY-SA 4.0, Zeynel Cebeci, 2020.
     */
    kuva: {
      tiedosto: 'Ciconia ciconia - White Stork 09.jpg',
      selite: 'Kattohaikara Turkissa. Haikarat kiertävät Välimeren '
        + 'Bosporin kautta, koska nousuvirtauksia ei synny meren yllä.',
      lahde: 'Zeynel Cebeci, Wikimedia Commons (CC BY-SA 4.0)',
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
