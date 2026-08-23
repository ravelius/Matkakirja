// Matkakirjan omat artikkelit Pohjois-Amerikan kaupungeista.
//
// Tiedosto perustettiin 23.8.2026 New Yorkin kaupunkilehden yhteydessä
// (P-Amerikan laudan pilottikaupunki). Malli on africa-artikkelit.js ja
// asia-artikkelit.js, ja rakenne on täsmälleen sama:
//
//   intro   — lehden ETUSIVUN LEIPÄTEKSTI (Raamattu, "TEKSTIEN
//             PAINOPISTE" 20.8.2026): 7–10 virkkeen johdatus siihen,
//             millainen kaupunki on ja mikä sen merkitys ja historia
//             ovat. Noin 700–1100 merkkiä, 2–3 kappaletta '\n\n'-rajalla
//             ja 1–3 maltillista **lihavointia**. Renderöijä tekee
//             kappaleet ja boldit — ei HTML:ää tänne.
//   teksti  — kolme kappaletta, yhteensä 600–1100 merkkiä. Ensimmäinen
//             kertoo missä ollaan, toinen mitä täällä on tapahtunut,
//             kolmas millaista täällä on nyt. Tämä on Lue lisää
//             -dialogin teksti.
//
// Avaimena on wiki-otsikko, sama jolla cachedSummary hakee — New Yorkin
// kohdalla js/packs/northamerica.js antaa sekä wiki-nimeksi että
// näyttönimeksi 'New York', joten avain on 'New York' eikä 'New York
// City'. Taulu yhdistetään muiden lautojen tauluihin
// js/sisaltotaulut.js:ssä.
//
// Ei ylisanoja eikä huutomerkkejä: nuoren herran innostus kuuluu
// saapumistekstissä, ja tämä on se rauhallinen ääni, joka kertoo
// taustan.
//
// NEW YORK (23.8.2026): jokainen väite tulee samasta erästä kuin lehden
// tekstit (js/packs/kulttuuri-kategoriat.js, avain newyork), ja ne on
// tarkistettu en-Wikipedian raakateksteistä 23.8.2026 — uusia
// lähdehakuja ei tarvittu. Sisältölinjaus on spec-mantereet.md:n
// USA-kohta: siirtomaahistoria ja orjuus kerrotaan tapahtumina
// neutraalisti, ei nykypolitiikkaa. Vuoden 1873 kulma on introssa
// mukana, koska se on koko lehden kantava aihe.
export const NORTHAMERICA_ARTIKKELIT = {
  'New York': {
    intro: 'New York on Yhdysvaltain suurin kaupunki, ja se on rakennettu '
      + 'saarille Hudsonjoen suulle, missä joki avautuu suojaisaan '
      + 'satamaan ja edelleen Atlantille. Manhattan ja Staten Island ovat '
      + 'omia saariaan, Brooklyn ja Queens ovat Long Islandin läntisessä '
      + 'päässä, ja vain Bronx on pääosin kiinni Yhdysvaltain '
      + 'mantereessa. Nämä **viisi kaupunginosaa yhdistyivät '
      + 'kaupungiksi vasta 1898**.'
      + '\n\n'
      + 'Hollantilaiset perustivat 1624 turkiskauppa-aseman Governors '
      + 'Islandille ja aloittivat seuraavana vuonna Fort Amsterdamin '
      + 'rakentamisen Manhattanin kärkeen; asutus sai nimen New Amsterdam '
      + '1626 ja kaupunginoikeudet 1653. Englanti valtasi sen '
      + '1664 ja nimesi sen Yorkin herttuan mukaan, ja nimi vakiintui '
      + 'pysyväksi 1674. Vuosina 1785–1790 New York oli nuoren '
      + 'Yhdysvaltain pääkaupunki.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 kaupunki oli keskellä muodonmuutosta. '
      + '**Brooklynin sillasta oli pystyssä vasta kaksi keskeneräistä '
      + 'tornia**, Central Park odotti valmistumistaan ja sen '
      + 'Bethesda-suihkulähteen enkelipatsas paljastettiin juuri sinä '
      + 'vuonna. Syyskuussa 1873 pörssi sulki ovensa kymmeneksi päiväksi '
      + 'ensimmäistä kertaa historiassaan.',
    teksti: 'New York on Yhdysvaltain koillisrannikolla Hudsonjoen '
      + 'suistossa. Kaupunki jakautuu viiteen kaupunginosaan, joista '
      + 'Manhattan on pienin mutta tunnetuin: kapea saari, jonka '
      + 'ruutukaava kiertää keskellä olevan Central Parkin.'
      + '\n\n'
      + 'Hollantilaisten kauppa-asemasta kasvoi englantilaisten aikana '
      + 'siirtomaiden vilkkain satama, ja 1800-luvulla New Yorkista tuli '
      + 'Euroopasta tulevien siirtolaisten portti. Heidät kirjattiin '
      + 'vuosina 1855–1890 Castle Gardenissa Manhattanin eteläkärjessä ja '
      + 'sen jälkeen Ellis Islandilla. Kaupungin muoto muuttui samaan '
      + 'aikaan: Central Park valmistui 1876, Brooklynin silta 1883 ja '
      + 'metro avattiin 1904.'
      + '\n\n'
      + 'Nykyään New York on maan talouden keskus, ja Wall Streetin '
      + 'kulmalla toimii New Yorkin pörssi, yksi maailman kahdesta '
      + 'markkina-arvoltaan suurimmasta. Metro kulkee lähes '
      + 'kaikkialla ympäri vuorokauden, ja Staten Islandin lautta vie '
      + 'sataman yli maksutta.',
  },
  'San Francisco': {
    intro: 'San Francisco seisoo Kalifornian rannikolla, kapean niemen '
      + 'pohjoiskärjessä Tyynenmeren ja suojaisan lahden välissä. '
      + 'Kaupungin rajojen sisällä on yli viisikymmentä kukkulaa, ja '
      + 'mannerosaa kuvataan paikallisesti seitsemän kertaa seitsemän '
      + 'mailin neliöksi. Asukkaat puhuvat siitä yksinkertaisesti '
      + 'nimellä the City.'
      + '\n\n'
      + 'Ennen espanjalaisia rannan kylissä asui ramaytush-ohlonien '
      + 'yelamu-ryhmä, jonka kielessä paikka oli Ahwaste. '
      + 'Espanjalaiset perustivat 1776 Presidion ja Mission Doloresin, '
      + 'ja kauppapaikka Yerba Buena nimettiin 1847 San Franciscoksi. '
      + '**Vuoden 1848 kultalöytö kasvatti tuhannen asukkaan kylän '
      + '25 000 asukkaan kaupungiksi vuoden '
      + '1849 loppuun mennessä.**'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 Clay Streetillä alkoi maailman '
      + 'ensimmäisen kaapeliraitiotien säännöllinen liikenne, ja samat '
      + 'vaunut kiipeävät mäkiä yhä. **Vuoden 1906 maanjäristys ja sitä '
      + 'seurannut tulipalo tuhosivat yli kolme neljäsosaa '
      + 'kaupungista**, mutta jälleenrakennus oli nopeaa ja kaupunki '
      + 'juhli toipumistaan maailmannäyttelyssä 1915. Kaupunki '
      + 'tunnetaan kukkuloistaan, kesäsumustaan ja Pohjois-Amerikan '
      + 'vanhimmasta kiinalaiskorttelista.',
    teksti: 'San Francisco on Kalifornian rannikolla, San Francisco '
      + 'Peninsulan pohjoiskärjessä. Lännessä on Tyynimeri, idässä ja '
      + 'pohjoisessa lahti, ja kaupungin rajojen sisään kuuluu myös '
      + 'saaria: Alcatraz, Treasure Island ja Yerba Buena Island. '
      + 'Ilmasto on lämpimän kesän välimerenilmastoa, jota meren kylmä '
      + 'virtaus viilentää ympäri vuoden.'
      + '\n\n'
      + 'Espanjalaiset perustivat paikalle linnoituksen ja '
      + 'lähetysaseman 1776, ja meksikolaisesta Yerba Buenan '
      + 'kauppapaikasta tuli 1847 San Francisco. Kultaryntäys teki '
      + 'siitä kahdessa vuodessa kymmenientuhansien kaupungin, ja '
      + 'satamaan jäi mastojen metsä hylättyjä laivoja. Vuoden 1906 '
      + 'maanjäristys ja tulipalo tuhosivat suurimman osan kaupungista, '
      + 'mutta se rakennettiin nopeasti uudelleen.'
      + '\n\n'
      + 'Kaapeliraitiovaunut ovat yhä osa joukkoliikennettä, ja '
      + 'kesäiltapäivisin sumu vyöryy Golden Gaten salmesta sisään. '
      + 'Kaupungissa on Pohjois-Amerikan vanhin kiinalaiskortteli, ja '
      + 'se on lahden alueen talouden keskuksia.',
  },
  Vancouver: {
    intro: 'Vancouver on Kanadan länsirannikon suurin kaupunki ja maan '
      + 'tärkein Tyynenmeren satama. Se on rakennettu niemelle Burrard '
      + 'Inlet -lahden ja Fraser-joen väliin, ja lännessä Vancouver Island '
      + 'suojaa sitä avomereltä. Pohjoisessa kohoavat aivan kaupungin '
      + 'takaa North Shore Mountainsin huiput.'
      + '\n\n'
      + '**Isoisän matkavuonna 1873 Vancouveria ei vielä ollut.** Lahden '
      + 'etelärannalla toimi Hastings Millin saha, ja sen kupeeseen oli '
      + 'kasvanut kylä, jota kutsuttiin Gastowniksi puheliaan krouvarin '
      + 'mukaan. Siirtomaahallinto oli mitannut kylän ympärille '
      + 'kaupunkitontit 1870 ja nimennyt paikan Granvilleksi. Kaupunki '
      + 'syntyi vasta 6. huhtikuuta 1886, kun rautatieyhtiö CPR oli '
      + 'valinnut paikan radan läntiseksi päätepisteeksi.'
      + '\n\n'
      + 'Kymmenen viikkoa myöhemmin **suurpalo tuhosi uuden kaupungin '
      + 'yhtenä iltapäivänä**, mutta se rakennettiin tiilestä uudelleen ja '
      + 'kasvoi tuhannesta asukkaasta sataantuhanteen kolmessakymmenessä '
      + 'vuodessa. Sahat ja rautatie eivät tulleet tyhjään maahan: '
      + 'Musqueam, Squamish ja Tsleil-Waututh ovat yhä alueen '
      + 'alkuperäiskansoja omine hallintoineen.',
    teksti: 'Vancouver on British Columbian suurin kaupunki Kanadan '
      + 'lounaiskulmassa, kapealla niemellä Burrard Inletin ja Fraser-joen '
      + 'välissä. Keskusta on niemen kärjessä, ja sen länsipuolelle jää '
      + 'Stanley Parkin metsä.'
      + '\n\n'
      + 'Seudun alkuperäinen kasvillisuus oli lauhkeaa sademetsää, ja '
      + 'rannalla oli alkuperäiskansojen kyliä tuhansia vuosia ennen '
      + 'eurooppalaisia. Saha aloitti 1867, rautatieyhtiö valitsi kylän '
      + 'päätepisteekseen 1884 ja kaupunki perustettiin 1886 — samana '
      + 'kesänä se paloi ja rakennettiin heti uudelleen. Satamasta tuli '
      + 'Kanadan suurin, ja vuoden 1986 maailmannäyttely jätti '
      + 'jälkeensä kuljettajattoman metron ja Canada Placen.'
      + '\n\n'
      + 'Ilmasto on yksi Kanadan leudoimmista: talvet ovat sateisia mutta '
      + 'harvoin kovin kylmiä, ja kesät ovat verrattain kuivia. Rantoja on '
      + 'kahdeksantoista kilometriä, ja keskustasta on parikymmentä '
      + 'minuuttia vuorten hiihtokeskuksiin.',
  },
  Yhdysvallat: {
    intro: 'Yhdysvallat on vuonna 1873 nuori jättiläinen: '
      + 'itsenäisyysjulistuksesta on vasta vajaat sata vuotta, ja maa '
      + 'ulottuu jo Atlantilta Tyynellemerelle. Sisällissota päättyi '
      + 'kahdeksan vuotta sitten ja orjuus sen mukana, mutta arvet '
      + 'pohjoisen ja etelän välillä ovat vielä tuoreet. Mantereen halki '
      + 'kulkeva rautatie valmistui 1869 ja lyhensi matkan rannikolta '
      + 'rannikolle puolesta vuodesta viikkoon — sitä ennen sama matka '
      + 'tehtiin vaunuilla erämaan poikki tai laivalla Etelä-Amerikan '
      + 'ympäri. Idän satamakaupungit ottavat vastaan siirtolaisia '
      + 'Euroopasta, etelän New Orleansissa ranskalainen, espanjalainen ja '
      + 'länsiafrikkalainen keittiö kiehuvat samassa padassa, ja lännessä '
      + 'on juuri rauhoitettu maailman ensimmäinen kansallispuisto '
      + 'Yellowstone. Amerikkalainen musiikki, ruoka ja keksinnöt syntyvät '
      + 'juuri tässä murroksessa, jossa vanha maailma ja uusi kohtaavat '
      + 'lennättimen ja höyryn voimalla. Isoisän matkapäiväkirja osuu '
      + 'maahan hetkellä, jolloin se on yhtä aikaa vanha ja aivan uusi.',
  },
  /* Chicagon kaksi väkilukua eivät ole lehden omasta erästä, joten ne
   * on tarkistettu erikseen en-Wikipedian artikkelista Chicago
   * 23.8.2026: kaupungin väkiluku 2,74 miljoonaa ja metropolialueen
   * 9,62 miljoonaa vuoden 2020 väestönlaskennassa. Home Insurance
   * Buildingia EI sanota täällä ensimmäiseksi pilvenpiirtäjäksi eikä
   * ensimmäiseksi teräsrunkoiseksi taloksi, koska lehden oma nosto
   * kertoo tittelin olevan kiistanalainen — artikkeli ei saa väittää
   * enempää kuin lehti. */
  Chicago: {
    intro: 'Chicago on Yhdysvaltain kolmanneksi suurin kaupunki ja '
      + 'Keskilännen suurin, ja se on Michiganjärven lounaisrannalla. '
      + 'Paikka on mannerten vedenjakajalla, jossa Mississippin ja '
      + 'Suurten järvien vesistöt tulevat niin lähelle toisiaan, että '
      + 'kanootin saattoi kantaa yhdestä toiseen. '
      + 'Kaupungin nimi tulee seudun '
      + 'alkuperäiskansojen kieleltä: šikaakwa tarkoittaa villisipulia.'
      + '\n\n'
      + 'Vuonna 1833 paikalla oli noin kahdensadan asukkaan kylä, ja '
      + 'seitsemässä vuodessa väkiluku kasvoi yli kuuteentuhanteen. '
      + 'Yhdeksän rautatietä löysi saman kohdan, ja niiden '
      + 'karjapihat avautuivat jouluna 1865. **Lokakuussa 1871 suurpalo '
      + 'tuhosi yli 17 000 rakennusta ja jätti 90 000 ihmistä '
      + 'kodittomaksi.** Isoisän matkavuonna 1873 kaupunki oli kesken '
      + 'jälleenrakennuksen: se muurasi kiveä ja tiiltä, sillä '
      + 'teräsrunkoinen korkea rakentaminen alkoi vasta 1885, kun '
      + 'Home Insurance Building valmistui.'
      + '\n\n'
      + 'Siitä alkoi rakentamisen tapa, jota kutsutaan Chicago '
      + 'Schooliksi, ja vuoden 1893 maailmannäyttely näytti '
      + 'uuden kaupungin maailmalle. **Potawatomi asui '
      + 'täällä ennen näitä vuosilukuja:** kansa karkotettiin 1833, '
      + 'mutta sen jälkeläiset elävät ja hallitsevat itseään yhä.',
    teksti: 'Chicago on Illinoisin koillisnurkassa makean veden '
      + 'Michiganjärven lounaisrannalla, ja sen keskustaa kutsutaan '
      + 'Loopiksi kohoradan silmukan mukaan. Chicago-joki halkoo '
      + 'keskustan ja jakautuu kahdeksi haaraksi.'
      + '\n\n'
      + 'Seutua asutti Potawatomi-kansa, joka kuului Odawan ja Ojibwen '
      + 'kanssa Kolmen tulen neuvostoon. Kylä järjestäytyi 1833 ja '
      + 'kaupunki perustettiin 1837; rautatiet ja karjapihat tekivät '
      + 'siitä Keskilännen solmukohdan. Lokakuun 1871 suurpalo tuhosi '
      + 'puisen keskustan, ja jälleenrakennuksen keskellä syntyi '
      + 'teräsrunkoinen korkea rakentaminen. Vuoden 1893 maailmannäyttely '
      + 'juhli tulosta, ja vuonna 1900 avattu kanava käänsi joen '
      + 'pysyvästi poispäin järvestä.'
      + '\n\n'
      + 'Nykyään kaupungissa on 2,7 miljoonaa asukasta ja '
      + 'metropolialueella yli yhdeksän miljoonaa. Ilmasto on '
      + 'lämminkesäinen mannerilmasto neljällä selvällä vuodenajalla: '
      + 'heinäkuun keskilämpötila on noin 24 astetta, joulu–maaliskuun '
      + 'noin kaksi. Järven ranta on keskustan kohdalla lähes kokonaan '
      + 'julkista puistoa, ja joen varsi on kaupungin suosituin '
      + 'näköalapaikka.',
  },
  Toronto: {
    intro: 'Toronto on Kanadan väkirikkain kaupunki ja Ontarion provinssin '
      + 'pääkaupunki. Se on rakennettu Ontariojärven luoteisrannalle '
      + 'sataman ympärille, ja maasto nousee järveltä loivasti pohjoiseen. '
      + 'Vuoden 2021 laskennassa kaupungissa asui 2 794 356 ihmistä, ja se '
      + 'on Pohjois-Amerikan neljänneksi väkirikkain kaupunki.'
      + '\n\n'
      + 'Britit perustivat Yorkin kylän 1793 kiistanalaisen Toronto '
      + 'Purchase -maakaupan jälkeen ja tekivät siitä Yläkanadan '
      + 'pääkaupungin. Vuoden 1812 sodassa amerikkalaiset valtasivat kylän '
      + 'kahdeksi viikoksi, ja 1834 York otti nimekseen Toronto. '
      + '**Isoisän matkavuonna 1873 Toronto ei ollut enää kylä eikä vielä '
      + 'metropoli:** vuoden 1871 laskennassa asukkaita oli 56 092, '
      + 'kaupunki oli ollut Ontarion pääkaupunki kuusi vuotta ja rautatiet '
      + 'olivat tehneet siitä portin mantereen sisäosiin.'
      + '\n\n'
      + 'Nykyään noin puolet asukkaista on syntynyt Kanadan ulkopuolella, '
      + 'kaupungissa puhutaan **yli 160 kieltä** ja hätänumero vastaa yli '
      + '150 kielellä. Niagaran putoukset ovat 69 kilometriä kaakkoon, ja '
      + 'vuonna 1959 valmistunut Saint Lawrence -laivaväylä avasi '
      + 'valtamerilaivoille tien Atlantilta Suurille järville.',
    teksti: 'Toronto on Kanadan väkirikkain kaupunki ja Ontarion '
      + 'pääkaupunki Ontariojärven luoteisrannalla. Kaupunki on rakennettu '
      + 'loivaan rinteeseen, jota halkovat Humberin, Donin ja Rouge-joen '
      + 'kaivamat rotkolaaksot, ja sataman edustalla on saariketju.'
      + '\n\n'
      + 'Britit perustivat Yorkin kylän 1793, Yhdysvaltain joukot '
      + 'valtasivat sen 1813, ja 1834 York otti nimekseen Toronto. Vuoden '
      + '1849 palo tuhosi vanhan ytimen ja vuoden 1904 palo yli sata '
      + 'rakennusta keskustassa; molemmat korttelit rakennettiin '
      + 'uudelleen. Vuonna 1998 kuusi erillistä kuntaa lakkautettiin ja '
      + 'korvattiin yhdellä kaupungilla.'
      + '\n\n'
      + 'CN Tower kohoaa 553,3 metriin, raitiovaunut kulkevat yhä samoilla '
      + 'kaduilla kuin hevosvaunujen aikaan, ja St. Lawrence Marketin tori '
      + 'on ollut samalla korttelilla vuodesta 1803. Niagaran putouksille '
      + 'on päivämatka kaakkoon.',
  },
};
