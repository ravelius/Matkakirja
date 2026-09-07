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
// Ei ylisanoja eikä huutomerkkejä: nuoren Foggin innostus kuuluu
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
  /* Kanadan ja Meksikon maaintrot kirjoitettiin 6.9.2026 maalehtien
   * (MAA_KATEGORIAT.CAN ja .MEX) yhteydessä. Molemmat nojaavat samaan
   * en-Wikipedian aineistoon kuin lehdet — docs/mantereet-tyoaineisto/
   * faktapohja-kanada.md ja faktapohja-meksiko.md — eikä niissä väitetä
   * enempää kuin lehden nostoissa. Vain intro-kenttä: nämä ovat maita
   * eivätkä kaupunkeja, joten kolmikappaleista teksti-kenttää ei ole
   * (sama ratkaisu kuin avaimella Yhdysvallat). */
  Kanada: {
    intro: 'Kanada on isoisän matkavuonna kuusivuotias valtio ja maailman '
      + 'toiseksi suurin maa, jonka asutus painautuu kapeaksi nauhaksi '
      + 'etelärajan tuntumaan. Konfederaatio syntyi 1. heinäkuuta 1867 '
      + 'neljästä provinssista, ja juuri vuonna 1873 siihen liittyy '
      + 'Prinssi Edwardin saari — sama saari, joka isännöi ensimmäistä '
      + 'liittoneuvottelua yhdeksän vuotta aiemmin. Valtiota vanhempi on '
      + 'yhtiö: Hudson’s Bay Company sai vuonna 1670 peruskirjan, joka '
      + 'antoi sille kolmasosan nykyisestä Kanadasta, ja se myi maat '
      + 'takaisin vasta 1869.'
      + '\n\n'
      + 'Kaiken tämän alla on paljon vanhempi maa. **First Nations, '
      + 'inuiitit ja métisit ovat perustuslaissa tunnustetut kolme '
      + 'alkuperäiskansaa, ja pelkästään First Nations -hallintoja on yli '
      + 'kuusisataa.** Turkiskauppa kulki heidän reiteillään ja söi '
      + 'heidän ruokaansa: pemmikaania ja bannockia. Newfoundlandin '
      + 'pohjoiskärjessä on kahdeksan turverakennuksen pohjat vuodelta '
      + '1021 — ainoa kiistaton todiste eurooppalaisista Amerikassa '
      + 'ennen Kolumbusta. Isoisän matkavuonna lännessä ei ole vielä '
      + 'siviilihallintoa, ja sinne lähetetään punatakkinen ratsupoliisi.',
  },
  Meksiko: {
    intro: 'Meksiko on vuonna 1873 viisikymmentäkaksivuotias tasavalta, '
      + 'joka on juuri selvinnyt vuosikymmenten sisällissodista ja '
      + 'ranskalaisten miehityksestä. Edellisenä kesänä maa hautasi '
      + 'presidenttinsä Benito Juárezin — zapoteekkipaimenen, joka '
      + 'kaksitoistavuotiaaksi asti puhui vain omaa kieltään ja nousi '
      + 'maan ensimmäiseksi alkuperäiskansaan kuuluneeksi presidentiksi. '
      + 'Uudenvuodenpäivänä 1873 avataan pääkaupungin ja Veracruzin '
      + 'välinen rautatie, joka aloitettiin keisarikunnan aikaan ja '
      + 'päätettiin tasavallassa.'
      + '\n\n'
      + '**Meksikon syvyys mitataan kuitenkin vuosituhansissa.** '
      + 'Teotihuacánissa asui satatuhatta ihmistä jo silloin kun Rooma '
      + 'oli suurimmillaan, Monte Albánin aukio tasoitettiin vuoristossa '
      + 'viisisataa vuotta ennen ajanlaskun alkua, ja mayat kirjoittivat '
      + 'ainoaa Amerikan kirjoitusjärjestelmää, joka on saatu luettua. '
      + 'Ruoka kertoo saman: maissi keitetään kalkkivedessä ja kaakaopavut '
      + 'kelpasivat rahaksi. Acapulcon satamasta lähti '
      + 'kaksisataaviisikymmentä vuotta laivoja Manilaan, joten Meksiko '
      + 'on ollut Tyynenmeren portti kauemmin kuin useimmat Euroopan '
      + 'valtiot ovat olleet olemassa.',
  },
  /* Kuuban maaintro kirjoitettiin 6.9.2026 maalehden
   * (MAA_KATEGORIAT.CUB) yhteydessä samasta en-Wikipedian aineistosta
   * kuin lehti (docs/mantereet-tyoaineisto/faktapohja-kuuba.md). Vain
   * intro-kenttä, kuten Kanadalla ja Meksikolla. Havannan
   * kaupunkilehden aiheet (linnoitukset, vuoden 1837 rautatie, USS
   * Maine, son) jätettiin pois, ja vuoden 1959 vallankumous on
   * rajattu ulos samalla linjauksella kuin lehdessä. */
  Kuuba: {
    intro: 'Kuuba on isoisän matkavuonna 1873 yhä Espanjan siirtomaa, ja '
      + 'saaren itäpäässä on käyty viisi vuotta sotaa itsenäisyydestä. '
      + 'Sokeritehtailija Carlos Manuel de Céspedes aloitti sen '
      + 'lokakuussa 1868 soittamalla tehtaansa kelloa ja vapauttamalla '
      + 'orjansa. **Orjuus itse jatkuu vielä kolmetoista vuotta: se '
      + 'lakkautetaan vasta 1886, ja koko läntisellä pallonpuoliskolla '
      + 'vain Brasilia on myöhemmin.** Sokerista tuli saaren talous, kun '
      + 'Haitin vallankumous tuhosi kilpailijan 1800-luvun alussa.'
      + '\n\n'
      + 'Toinen vientituote kasvaa saaren länsipäässä. Vuelta Abajon '
      + 'kaistale Pinar del Ríossa on noin 140 kilometriä pitkä ja 16 '
      + 'leveä, ja monet pitävät sen lehteä maailman parhaana '
      + 'sikaritupakkana; käärintäsaleissa on vuodesta 1865 istunut '
      + 'lukija, jonka työntekijät palkkaavat itse. Luonto on omalaatuista '
      + 'saariluontoa: maailman pienin lintu painaa alle kaksi grammaa, '
      + 'krokotiili juoksee maalla ja kotiloiden kuoret ovat '
      + 'keräilijöiden himoitsemia.',
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
  /* LOS ANGELES (23.8.2026). Samasta erästä kuin lehden
   * tekstit (js/packs/kulttuuri-kategoriat.js, avain losangeles) ja
   * tarkistettu en-Wikipedian raakateksteistä 23.8.2026. Vuoden 1873
   * väkilukua ei väitetä tarkasti, koska sille ei ole omaa laskentaa:
   * 1870 laskettiin 5 728 ja 1880 jo 11 183 asukasta. Nykypolitiikka
   * ja vuoden 2025 tapahtumat on jätetty pois linjauksen mukaisesti. */
  'Los Angeles': {
    intro: 'Los Angeles on Kalifornian suurin ja koko Yhdysvaltain toiseksi '
      + 'suurin kaupunki: rajojen sisällä asuu 3,87 miljoonaa ihmistä ja koko '
      + 'seudulla lähes kolmetoista miljoonaa. Kaupunki on rakennettu vuorten '
      + 'ja meren väliin jäävälle tasangolle, ja se ulottuu 71 kilometriä '
      + 'pohjoisesta etelään ja 47 kilometriä idästä länteen. Korkein kohta '
      + 'rajojen sisällä on 1 547-metrinen Mount Lukens.'
      + '\n\n'
      + 'Espanjalaiset perustivat pueblon 4. syyskuuta 1781 tongvien '
      + 'Yaanga-kylän viereen ja antoivat sille nimen El Pueblo de Nuestra '
      + 'Señora la Reina de los Ángeles. Meksikon itsenäistyttyä 1821 '
      + 'paikasta tuli meksikolainen kaupunki ja Alta Californian '
      + 'aluepääkaupunki, ja 1848 se siirtyi Yhdysvalloille. **Kun kaupunki '
      + 'sai kunnalliset oikeudet 1850, siellä asui 1 610 ihmistä.**'
      + '\n\n'
      + '**Isoisän matkavuonna 1873** Los Angeles oli yhä tomuinen '
      + 'pikkukaupunki hedelmätarhojen keskellä: vuoden 1870 laskennassa '
      + 'asukkaita oli 5 728 ja vuonna 1880 jo 11 183. Sitten tulivat '
      + 'rautatie 1876, öljy 1892 ja akvedukti 1913, ja jokainen niistä '
      + 'moninkertaisti kaupungin.',
    teksti: 'Los Angeles on Etelä-Kaliforniassa, rannikon ja San Gabriel '
      + '-vuorten välisessä altaassa. Santa Monica -vuoret erottavat altaan '
      + 'pohjoispuolella olevasta San Fernandon laaksosta, ja kaupunki jatkuu '
      + 'vuorten molemmin puolin. Ilmasto on puolikuiva mutta lähellä '
      + 'Välimeren ilmastoa: sadetta tulee runsaat 370 millimetriä vuodessa ja '
      + 'lähes yksinomaan talvikuukausina.'
      + '\n\n'
      + 'Pueblon perustivat 1781 neljäkymmentäneljä siirtolaista, ja se pysyi '
      + 'pienenä yli sadan vuoden ajan. Rautatie saapui 1876, öljyä löytyi '
      + '1892 ja Owens-joelta tuleva akvedukti valmistui 1913 — vasta vesi '
      + 'teki suurkaupungista mahdollisen. Elokuva-ala keskittyi kaupunkiin '
      + '1910-luvulla, ja San Pedron lahden satama kasvoi sen jälkeen, kun '
      + 'aallonmurtajaa alettiin rakentaa 1899.'
      + '\n\n'
      + 'Nykyään kaupungissa ei ole yhtä keskustaa vaan monta, ja etäisyydet '
      + 'ovat pitkiä. Vanhin kolkka on El Pueblo vanhan plazan ympärillä, ja '
      + 'sen vieressä on Union Station, jonne kaikki kaupungin junat '
      + 'päättyvät. Asukkaista 47,2 prosenttia on latinotaustaisia ja '
      + 'meksikolaistaustaiset ovat suurin yksittäinen ryhmä; seudun '
      + 'alkuperäiskansa tongvat elää alueella yhä.',
  },
  /* HAVANNA (24.8.2026). Samasta erästä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain havanna) ja tarkistettu
   * en-Wikipedian raakateksteistä 23.–24.8.2026 ("Havana", "Old
   * Havana", "National Railway Company of Cuba"). Avain on 'Havanna',
   * koska js/packs/northamerica.js antaa kaupungille sekä wiki-nimeksi
   * että näyttönimeksi 'Havanna'. Vuoden 1873 kulma on introssa, koska
   * se on koko lehden kantava aihe: Havanna oli silloin yhä Espanjan
   * siirtomaan pääkaupunki. Nykypolitiikka ja väestömäärän viimeaikainen
   * kehitys on jätetty pois linjauksen mukaisesti; väkiluku annetaan
   * vuoden 2021 laskennasta ilman trendiä. */
  Havanna: {
    intro: 'Havanna on Kuuban pääkaupunki ja suurin kaupunki, maan tärkein '
      + 'satama ja kaupan keskus. Se on saaren pohjoisrannalla siinä, missä '
      + 'kapea salmi avautuu suureksi lahdeksi ja jakautuu kolmeksi '
      + 'satama-altaaksi. **Kaupunki jakautuu viiteentoista kuntaan** 728 '
      + 'neliökilometrin alalla, ja sen halki virtaa Almendares-joki.'
      + '\n\n'
      + 'Diego Velázquez perusti kaupungin 1514 saaren etelärannikolle, '
      + 'mutta se siirtyi nykyiselle paikalleen 16. marraskuuta 1519 '
      + 'sataman takia. Vuonna 1552 siitä tuli koko saaren pääkaupunki, ja '
      + 'Espanjan aarrelaivastojen kokoontumispaikkana se sai ympärilleen '
      + 'Amerikan tiheimpiin kuuluvan linnoitusrenkaan. Vanhakaupunki '
      + 'linnoituksineen on ollut Unescon maailmanperintökohde vuodesta '
      + '1982.'
      + '\n\n'
      + '**Isoisän matkavuonna 1873 Havanna oli yhä Espanjan siirtomaan '
      + 'pääkaupunki:** Espanjan valta päättyi vasta 1898, ja itsenäisen '
      + 'Kuuban pääkaupungiksi kaupunki tuli 1902. Kaupunginmuurit oli '
      + 'purettu kymmenen vuotta aiemmin, Latinalaisen Amerikan ensimmäinen '
      + 'rautatie oli kulkenut Bejucaliin vuodesta 1837 ja hevosraitiovaunu '
      + 'kaduilla vuodesta 1858. Vuoden 2021 laskennassa asukkaita oli '
      + '2 142 939.',
    teksti: 'Havanna on Kuuban pohjoisrannikolla suojaisan luonnonsataman '
      + 'ympärillä. Lahteen johtaa kapea salmi, jonka molemmin puolin '
      + 'kohoavat vanhat linnat, ja kaupunki leviää siitä länteen ja '
      + 'etelään. Meren puolella kulkee kahdeksan kilometrin rantaväylä '
      + 'Malecón.'
      + '\n\n'
      + 'Espanjalaiset perustivat kaupungin 1500-luvun alussa, ja siitä '
      + 'tuli Uuden maailman ja Espanjan välisen laivaliikenteen solmu. '
      + 'Merirosvojen hyökkäykset pakottivat linnoittamaan sen, britit '
      + 'pitivät sitä hallussaan alle vuoden 1762–1763, ja Espanjan valta '
      + 'päättyi 1898. Kaupunginmuurit purettiin 1863, ja niiden paikalle '
      + 'kasvoi Centro Habanan kaupunginosa.'
      + '\n\n'
      + 'Nykyään Havanna on Karibian väkirikkain kaupunki. Vanhankaupungin '
      + 'aukiot on kunnostettu vuosikymmenten työllä, El Capitolion kupoli '
      + 'hallitsee siluettia ja Malecónin muuri on kaupungin suosituin '
      + 'oleskelupaikka. Havannan yliopisto on toiminut vuodesta 1728 ja '
      + 'Colónin hautausmaa vuodesta 1876.',
  },
  'México': {
    intro: 'Mexico City on Meksikon pääkaupunki ja Pohjois-Amerikan väkirikkain '
      + 'kaupunki. Se sijaitsee Meksikon laaksossa 2 240 metrin korkeudessa, ja '
      + 'sitä ympäröivät vuoret ja yli viiden kilometrin korkuiset tulivuoret. '
      + 'Kaupunki on **Amerikan mantereen vanhin '
      + 'pääkaupunki** ja toinen kahdesta, jonka alkuperäiskansa perusti.'
      + '\n\n'
      + 'Alku oli Tenochtitlan, mexica-kansan eli atsteekkien saarikaupunki, '
      + 'joka rakennettiin noin 1325 keskelle Texcoco-järveä. Espanjalaiset '
      + 'piirittivät ja valtasivat sen 1521 ja rakensivat raunioille oman '
      + 'kaupunkinsa vanhaa katuverkkoa noudattaen. Siirtomaa-aikana siitä tuli '
      + 'Uuden Espanjan hallinnollinen ja taloudellinen keskus, ja 1800-luvulla '
      + 'se sai eurooppalaismalliset bulevardit ja puistot.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 kaupunki oli juuri saanut uuden ilmeen: '
      + 'keisari Maximilianin teettämä puistokatu oli nimetty vuotta aiemmin '
      + 'Paseo de la Reformaksi, ja **juuri 1873 sille tilattiin ensimmäinen '
      + 'suuri muistomerkki**. Alamedassa oli palanut kaasuvalo vuodesta 1868. '
      + 'Yksi asia ei ole muuttunut: kuivatun järven savi painuu, ja kaupunki '
      + 'vajoaa yhä lähes puoli metriä vuodessa.',
    teksti: 'Mexico City on Meksikon laaksossa, vuorten ympäröimällä '
      + 'ylätasangolla 2 240 metrin korkeudessa. Laaksosta ei ole luonnollista '
      + 'vedenpoistoreittiä mereen, ja kaupunki on rakennettu kuivatun '
      + 'Texcoco-järven savipohjalle.'
      + '\n\n'
      + 'Atsteekkien Tenochtitlan perustettiin saarelle noin 1325, ja se kasvoi '
      + 'kahdessa vuosisadassa laajan valtakunnan pääkaupungiksi. Espanjalaiset '
      + 'valtasivat sen 1521 ja rakensivat sen päälle uuden kaupungin, joka oli '
      + 'kolmen vuosisadan ajan Uuden Espanjan keskus. Itsenäistymisen jälkeen '
      + '1800-luku toi Chapultepecin linnan, Paseo de la Reforman ja '
      + 'kaasuvalaistuksen.'
      + '\n\n'
      + 'Nykyään keskusta on tiivis ja kävelykelpoinen: Zócalon laidalta pääsee '
      + 'muutamassa minuutissa katedraalille ja Templo Mayorin kaivausalueelle. '
      + 'Metro on New Yorkin jälkeen Pohjois-Amerikan toiseksi suurin, ja '
      + 'etelässä Xochimilcon kanavilla viljellään yhä atsteekkien kehittämillä '
      + 'viljelysaarilla.',
  },
  'New Orleans': {
    intro: 'New Orleans on Louisianan suurin kaupunki, ja se seisoo '
      + 'Mississippin viimeisellä suurella mutkalla vähän ennen '
      + 'Meksikonlahtea. Mutka on niin jyrkkä, että kaupunki tunnetaan '
      + 'lempinimellä Crescent City. Ranskalainen Mississippi-yhtiö perusti '
      + 'sen keväällä 1718 maalle, jota chitimacha-kansa oli perinteisesti '
      + 'asuttanut, ja nimi annettiin Orléansin herttuan Philippe II:n '
      + 'mukaan.'
      + '\n\n'
      + 'Espanjan kaudella kaksi suurpaloa poltti ranskalaisen puukaupungin, '
      + 'ja **Ranskan Kortteli rakennettiin uudelleen tiilestä ja stukista** '
      + '— vanhin kortteli on siis nimestään huolimatta espanjalaisajan '
      + 'työtä. Napoleon myi Louisianan Yhdysvalloille 1803, '
      + 'ja vallanvaihto vahvistettiin nykyisen Jackson Squaren laidalla. '
      + 'Vuoteen 1840 mennessä joen kauppa oli tehnyt New Orleansista maan '
      + 'rikkaimman kaupungin — ja täällä oli sekä maan suurin vapaiden '
      + 'värillisten yhteisö että sen suurin orjamarkkina.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 kaupunki eli jälleenrakennuskautta: '
      + 'tammikuussa päättyi P. B. S. Pinchbackin 35 päivän kuvernöörikausi. '
      + '**Jazz syntyi täällä vasta reilu sukupolvi myöhemmin**, 1900-luvun '
      + 'alussa.',
    teksti: 'New Orleans on Yhdysvaltain eteläosassa, Mississippin '
      + 'alajuoksulla, Meksikonlahden ja Lake Pontchartrainin välissä. '
      + 'Kaupunki on tasainen ja matala: puolet siitä on merenpinnan tasolla '
      + 'tai sen alapuolella, ja penkereet, tulvamuurit ja pumppaamot '
      + 'pitävät veden erillään kaduista.'
      + '\n\n'
      + 'Ranskalaisten perustama siirtokunta siirtyi Espanjalle, takaisin '
      + 'Ranskalle ja 1803 Yhdysvalloille. Höyrylaiva avasi joen kaupalle '
      + 'molempiin suuntiin 1812, ja sen jälkeen kaupunki kasvoi nopeasti '
      + 'puuvillan, sokerin ja orjuuden taloudessa. Sisällissodan jälkeisenä '
      + 'jälleenrakennuskautena Louisianalla oli lyhyen aikaa maan '
      + 'ensimmäinen afrikkalaista syntyperää ollut kuvernööri.'
      + '\n\n'
      + 'Nykyään kaupunki tunnetaan musiikistaan, keittiöstään ja '
      + 'karnevaalistaan. Hurrikaani Katrina tulvitti 80 prosenttia '
      + 'kaupungista 2005, ja sen jälkeen tulvasuojaus on rakennettu '
      + 'uudelleen; kymmenen vuotta myöhemmin väkiluku oli 80 prosenttia '
      + 'vuoden 2000 tasosta.',
  },
  /* MONTREAL (6.9.2026). Kaupunkilehti kirjoitettiin 23.8.2026
   * (js/packs/kulttuuri-kategoriat.js, avain montreal), mutta sen
   * lohkokommentin lupaama ARTIKKELIT-merkintä jäi silloin
   * lisäämättä — etusivun leipäteksti puuttui lehdestä kokonaan.
   * Tämä merkintä korjaa puutteen samasta aineistosta: jokainen väite
   * on lehden omista teksteistä ja niiden lähteistä
   * (docs/mantereet-tyoaineisto/faktapohja-montreal.md ja
   * tarkistus-montreal.md, en-Wikipedia 23.8.2026) — uusia
   * lähdehakuja ei tehty. Tarkistusraportin C-kohta on otettu
   * huomioon: vuosilukua 1763 ei käytetä, koska sitä ei ole
   * "Montreal"-artikkelissa, vaan teksti kertoo vain valtauksen 1760
   * ja antautumisen Britannialle. Sisältölinjaus on sama kuin
   * lehdessä: kaksikielisyys todetaan kaupungin peruskirjan ja
   * väestönlaskennan tasolla, ei nykypolitiikkaa. */
  Montreal: {
    intro: 'Montreal on Québecin suurin ja Kanadan toiseksi suurin '
      + 'kaupunki, saari keskellä Saint Lawrence -jokea. Saaren '
      + 'keskellä kohoaa Mont Royal, jonka nimestä kaupungin oma nimi '
      + 'on lyhentynyt. Ranskalaiset '
      + 'lähetyssaarnaajat perustivat paikalle Ville-Marien 1642, ja '
      + '**siirtokunta oli 1650-luvun alussa niin pieni, että se oltiin '
      + 'hylkäämässä** — vuoteen 1685 mennessä asukkaita oli kuusisataa '
      + 'ja paikasta oli tullut turkiskaupan keskus.'
      + '\n\n'
      + 'Ranska hallitsi siirtokuntaa vuoteen 1760, jolloin Montreal '
      + 'antautui brittihyökkäykselle Seitsenvuotisen sodan aikana. '
      + 'Kaupunkioikeudet tulivat 1832, ja sen jälkeen kasvu oli nopeaa: '
      + 'Lachine-kanava vei 1825 laivat koskien ohi ja Victoria-silta '
      + '1859 rautatien joen yli. Vuoteen 1860 mennessä Montreal oli '
      + 'Brittiläisen Pohjois-Amerikan suurin kaupunki, joka hallitsi '
      + 'muun maan taloutta ja kulttuuria.'
      + '\n\n'
      + 'Isoisän matkavuoden tienoilla kaupunki oli keskellä '
      + 'rakennustöitä. **Notre-Damen kirkon sisustus — syvänsininen '
      + 'holvikatto kultatähtineen — tehtiin juuri vuosina 1872–1879**, '
      + 'ja kaupungintalo nousi 1873 vanhan jesuiittapuutarhan '
      + 'paikalle. Vuoden 1871 väestönlaskennassa asukkaita oli '
      + '130 022.',
    teksti: 'Montreal on saari Saint Lawrence -joessa. Saaren keskellä '
      + 'kohoaa Mont Royal, jonka rinteeltä koko kaupunki näkyy '
      + 'kerralla, ja joen väylä vie valtamerialukset Atlantilta '
      + 'Suurille järville asti.'
      + '\n\n'
      + 'Paul Chomedey de Maisonneuve perusti Ville-Marien 1642, ja '
      + 'sulpitiaanimunkit vetivät saarelle ensimmäiset katulinjat. '
      + 'Kaupunki siirtyi Britannian valtaan 1760, sai kaupunkioikeudet '
      + '1832 ja kasvoi rautateiden ja sataman varassa mantereen '
      + 'solmukohdaksi. Satama on noin 1 600 kilometrin päässä '
      + 'Atlantilta, mutta se on silti lyhin suora reitti '
      + 'Pohjois-Amerikan Keskilännestä Eurooppaan.'
      + '\n\n'
      + 'Nykyään ranska on kaupungin peruskirjan mukainen virallinen '
      + 'kieli, ja Montreal on samalla yksi Kanadan kaksikielisimmistä '
      + 'kaupungeista. Keskustan alla kulkee käytäväverkosto, joka sai '
      + 'alkunsa 1962 Place Ville Marien työmaalla ja on kasvanut '
      + 'yhdeksi maailman laajimmista maanalaisista jalankulkualueista. '
      + 'Metro avattiin 1966, ja sen kumipyöräiset junat ovat '
      + 'tavallista hiljaisempia.',
  },
  /* PANAMÁ (Opus 6.9.2026, paketti O9). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain panama); pohjana
   * docs/mantereet-tyoaineisto/faktapohja-panama.md ja
   * tarkistus-panama.md. Avain on kaupungin wiki-nimi (js/packs/
   * northamerica.js: 'Panama (kaupunki)'), ei näyttönimi.
   * Väitteet on luettu en-Wikipedian raakateksteistä 6.9.2026
   * ("Panama City", "Panamá Viejo", "Casco Viejo, Panama",
   * "Panama Canal Railway", "Panama Canal").
   *
   * YKSI LEHTI KAHDELLA LAUDALLA (Fablen päätös 24.8.2026,
   * spec-mantereet.md): kaupunki-id 'panama' on sekä northamerica-
   * että southamerica-laudalla, ja KULTTUURI_KATEGORIAT palvelee
   * molempia. Kirjanpidossa Panamá lasketaan P-Amerikkaan, ja siksi
   * intro asuu tässä taulussa.
   *
   * TARKISTUKSEN KORJAUKSET ON TEHTY: uusi kaupunki perustettiin
   * 1673 (Panama City -artikkelin Casco Viejo -osion "1671" on
   * ristiriidassa saman artikkelin History-osion ja Casco Viejo
   * -artikkelin päivämäärällisen tiedon kanssa), ja rautatiestä
   * käytetään sen avaamishetken omaa nimeä "valtamerten välinen" —
   * lähde sanoo itse, että transcontinental-nimitys on myöhempi ja
   * kiistelty.
   *
   * KANAVAN AVAUSVUOTTA 1914 ja 1999-luovutusta EI kerrata täällä
   * kuin kerran, koska ne ovat myös laudan visan ja FACTS-taulun
   * omia faktoja. Ei nykypolitiikkaa. */
  'Panama (kaupunki)': {
    intro: 'Panamá on Panaman pääkaupunki ja Amerikan Tyynenmeren '
      + 'rannikon vanhin eurooppalainen kaupunki: Pedro Arias de Ávila '
      + 'perusti sen 15. elokuuta 1519. Siitä tuli Perun valloituksen '
      + 'lähtöpiste ja Espanjaan matkaavan kullan ja hopean '
      + 'kauttakulkupaikka — lasti nostettiin maihin Tyynenmeren '
      + 'puolella ja vietiin muulikaravaaneilla kannaksen yli '
      + 'Karibialle.'
      + '\n\n'
      + 'Vuonna 1671 walesilainen kaappari Henry Morgan hyökkäsi '
      + 'kaupunkiin 1 400 miehen joukolla, ja kaupunki paloi. **Uusi '
      + 'Panamá perustettiin 21. tammikuuta 1673** noin kahdeksan '
      + 'kilometriä lounaaseen meren ympäröimälle niemelle, jota '
      + 'suojasivat muurit — se on nykyinen Casco Viejo. Isoisän matkan '
      + 'vuonna 1873 kaupunki oli osa Kolumbiaa, ja kannaksen yli kulki '
      + 'jo rautatie: Colónista Panamáan vievä rata oli valmistunut '
      + '27. tammikuuta 1855.'
      + '\n\n'
      + 'Kanavaa ei silloin vielä ollut. Ranskalaiset aloittivat '
      + 'kaivutyöt 1881 ja epäonnistuivat, ja Yhdysvaltain rakentama '
      + 'sulkukanava avattiin vasta 1914. Nykyään Panamá on **kahden '
      + 'maailman kaupunki**: pilvenpiirtäjien siluetti ja sen vieressä '
      + 'matala vanhakaupunki, jonka Unesco lisäsi '
      + 'maailmanperintöluetteloon 2003.',
    teksti: 'Panamá on rakennettu kapean kannaksen Tyynenmeren '
      + 'puoleiselle rannalle. Ilmasto on trooppinen savanni-ilmasto: '
      + 'sadetta tulee noin 1 900 millimetriä vuodessa, lämpötila '
      + 'pysyy ympäri vuoden 27 asteen tienoilla, ja taivas on lähes '
      + 'jatkuvasti osittain pilvinen, koska kaupunki on '
      + 'päiväntasaajan pilvivyöhykkeellä.'
      + '\n\n'
      + 'Kaupungin kauppaa hallitsivat vuodesta 1520 genovalaiset '
      + 'kauppiaat, joille Espanjan kruunu antoi erikoisluvan — '
      + 'Genovan tasavalta oli Espanjan tärkein pankkikumppani. '
      + 'Vuoden 1671 tuhon jälkeen rakennettu uusi kaupunki paloi '
      + '1700-luvulla vielä kolmesti, ja nykyinen katukuva syntyi '
      + 'vasta 1800-luvun lopun ja 1900-luvun alkupuolen '
      + 'jälleenrakennuksissa: uusklassisia ja afroantillilaisia '
      + 'taloja siirtomaa-ajan raunioiden lomassa.'
      + '\n\n'
      + 'Kannaksen ylitys on tehnyt kaupungista rikkaan kolmesti: '
      + 'ensin hopeareitin, sitten rautatien ja lopulta kanavan '
      + 'ansiosta. Vuosina 1848–1869 kannaksen ylitti Atlantilta '
      + 'Tyynellemerelle noin 375 000 ihmistä ja vastakkaiseen '
      + 'suuntaan 225 000. Casco Viejon ydin, San Felipen '
      + 'kaupunginosa, on nykyään kaupungin tiheimmin asuttu.',
  },
  /* DENVER (Opus 6.9.2026, paketti O9). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain denver); pohjana
   * docs/mantereet-tyoaineisto/faktapohja-denver.md ja
   * tarkistus-denver.md. Avain on kaupungin wiki-nimi (js/packs/
   * northamerica.js: 'Denver'), joka on tässä sama kuin näyttönimi.
   * Väitteet on luettu en-Wikipedian raakateksteistä 6.9.2026
   * ("Denver", "History of Denver", "Kansas Pacific Railway",
   * "Pike's Peak gold rush").
   *
   * TARKISTUKSEN KORJAUKSET ON TEHTY: kultalöytö on heinäkuulta 1858
   * (tarkempi lähde) eikä marraskuulta, ja rautatiestä kerrotaan
   * molemmat päivämäärät — Denver Pacific 24.6.1870 Cheyennestä ja
   * Kansas Pacific elokuussa 1870 idästä.
   *
   * PILARI 1: seudun alkuperäiskansat mainitaan ennen kaupungin
   * perustamista. Mailin korkeuden luvut (5 280 jalkaa,
   * 1 564-1 734 m) ovat laudan visan ja saapumiskortin omia faktoja
   * (northamerica-questions.js ja northamerica-saapumiset.js), ja
   * niitä toistetaan tässä vain sen verran kuin johdatus vaatii. */
  Denver: {
    intro: 'Denver on Coloradon pääkaupunki ja Kalliovuorten '
      + 'itälaidan suurin kaupunki. Se seisoo Front Rangen '
      + 'kaupunkikäytävän keskellä, vuoriston ja itäisten '
      + 'ylätasankojen välissä, ja keskustan liikekortteli on noin '
      + 'yhdeksäntoista kilometrin päässä vuorten juurelta. Kaupungin '
      + 'lempinimi **Mile High City** ei ole kielikuva: korkeus on '
      + 'tasan yksi maili merenpinnasta.'
      + '\n\n'
      + 'Ennen kaupunkia seutu oli apassien, utejen, tšeijennien, '
      + 'comanchejen ja arapahojen maata. Kesällä 1858 löydetty kulta '
      + 'toi ryntäyksen, ja marraskuussa samana vuonna maakeinottelijat '
      + 'merkitsivät valtauksen South Platten ja Cherry Creekin '
      + 'yhtymäkohdan yläpuolelle. Paikka nimettiin Kansasin '
      + 'territoriokuvernöörin James W. Denverin mukaan — mies oli '
      + 'kuitenkin jo ehtinyt erota virastaan.'
      + '\n\n'
      + 'Kaupungin pelasti rautatie. Mannertenvälinen rata vedettiin '
      + 'Cheyennen kautta sata mailia pohjoisempaa, joten '
      + 'denveriläiset rakensivat oman yhteytensä: ensimmäinen juna '
      + 'saapui kesäkuussa 1870 ja Kansasin suunnalta elokuussa. '
      + '1870-luvulla rata toi arviolta **sata uutta asukasta '
      + 'päivässä**.',
    teksti: 'Denver on Yhdysvaltain ainoa osavaltion pääkaupunki, '
      + 'joka on yhdistetty kaupunki ja kunta. Se syntyi tässä '
      + 'muodossa 1.12.1902, kun kaupunki erotettiin Arapahoen ja '
      + 'Adamsin piirikunnista. Territorion pääkaupunki Denver oli '
      + 'ollut jo vuodesta 1867, Colorado liittyi unioniin 1876 ja '
      + 'pysyväksi pääkaupungiksi Denver vahvistettiin '
      + 'kansanäänestyksellä 1881.'
      + '\n\n'
      + 'Ilmasto on viileä puolikuiva: kosteus on matala, aurinkoa on '
      + 'noin 3 100 tuntia vuodessa ja vuorokauden lämpötilavaihtelu '
      + 'on suuri läpi vuoden. Heinäkuu on lämpimin ja joulukuu '
      + 'kylmin; talvella lumijaksot vuorottelevat chinook-tuulen '
      + 'leutojen jaksojen kanssa. Kaupungin virallinen sääasema on '
      + 'lentokentällä noin kolmenkymmenen kilometrin päässä '
      + 'keskustasta, ja mittauspaikasta on kiistelty.'
      + '\n\n'
      + 'Denverissä on yli kaksisataa puistoa, ja niiden lisäksi '
      + 'kaupunki omistaa noin 14 000 eekkeriä vuoristopuistoja '
      + 'Kalliovuorten rinteillä — tunnetuimpana Red Rocks Park '
      + 'amfiteattereineen. Historiallisia lempinimiä ovat myös '
      + 'Queen City of the Plains ja Queen City of the West, jotka '
      + 'muistuttavat sen asemasta itäisten ylätasankojen '
      + 'maatalouden keskuksena.',
  },
  /* HOUSTON (Opus 6.9.2026, paketti O9). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain houston); pohjana
   * docs/mantereet-tyoaineisto/faktapohja-houston.md ja
   * tarkistus-houston.md. Avain on kaupungin wiki-nimi (js/packs/
   * northamerica.js: 'Houston'). Väitteet on luettu en-Wikipedian
   * raakateksteistä 6.9.2026 ("Houston", "History of Houston",
   * "Buffalo Bayou", "Houston Ship Channel", "Johnson Space Center").
   *
   * TARKISTUKSEN KORJAUKSET ON TEHTY: veljesten maakaupasta kerrotaan
   * hinta eikä pinta-ala (he ostivat puolet 2 214 eekkerin
   * palstasta), ja Kuun pinnalta radioitua lausetta ei siteerata,
   * koska sitä ei ole luetuissa artikkeleissa sanatarkasti.
   *
   * PILARI 1: karankawat ja atakapat mainitaan ennen uudisasukkaita,
   * ja atakapojen oma nimi Ishak kerrotaan. Orjuus todetaan suoraan
   * lukuna ilman yksityiskohtien korostusta (spec-mantereet.md,
   * USA-linjaus). NASA-faktat (kutsumerkki, Space City) ovat myös
   * laudan visan omia (northamerica-questions.js), mutta ne kuuluvat
   * kaupungin ytimeen eikä niitä voi ohittaa. */
  Houston: {
    intro: 'Houston on Texasin suurin kaupunki ja koko Yhdysvaltain '
      + 'neljänneksi suurin. Se on rakennettu Meksikonlahden '
      + 'rannikkotasangolle noin kahdeksankymmenen kilometrin päähän '
      + 'merestä, ja sen läpi kulkee neljä suurta puroa. Keskusta on '
      + 'vain viitisentoista metriä merenpinnan yläpuolella. Maalla '
      + 'asuivat karankawat ja atakapat vähintään kaksituhatta vuotta '
      + 'ennen ensimmäisiä tunnettuja uudisasukkaita; atakapat '
      + 'kutsuivat itseään nimellä **Ishak**, "ne ihmiset".'
      + '\n\n'
      + 'Kaupunki myytiin ennen kuin sitä oli olemassa. Veljekset '
      + 'Augustus ja John Kirby Allen ostivat elokuussa 1836 maata '
      + 'Buffalo Bayoun varrelta ja julkaisivat neljä päivää '
      + 'myöhemmin lehti-ilmoituksen kaupungista, jonka he nimesivät '
      + 'Sam Houstonin mukaan. Vuoden 1837 alussa paikalla asui noin '
      + 'tusina ihmistä, toukokuussa jo puolitoista tuhatta.'
      + '\n\n'
      + 'Isoisän matkavuonna 1873 Houston oli puuvillan viennin '
      + 'kauppa- ja rautatiekeskus. Öljyä ei vielä ollut: '
      + 'Spindletopin löytö tuli 1901 ja avaruuskeskus vasta '
      + '1960-luvulla. Nykyään kaupungin lempinimi on **Space City**, '
      + 'ja NASAn lennonjohdon kutsumerkki on Houston.',
    teksti: 'Houston sijaitsee 266 kilometriä Austinista itään ja 400 '
      + 'kilometriä Dallasista etelään. Suurin osa kaupungista on '
      + 'lahden rannikkotasangolla, ja maaperä on savea, savista '
      + 'liusketta ja heikosti sementoitunutta hiekkaa useiden '
      + 'kilometrien syvyyteen. Sedimenttien alla on vuorisuolaa, '
      + 'joka on työntynyt ylös kupoleiksi ja vanginnut öljyn ja '
      + 'kaasun — juuri se teki seudusta öljyteollisuuden keskuksen.'
      + '\n\n'
      + 'Houston on Yhdysvaltain suurin kaupunki ilman '
      + 'kaavoituslakia, ja äänestäjät hylkäsivät erillisten asuin- '
      + 'ja liikealueiden perustamisen kolmesti: 1948, 1962 ja 1993. '
      + 'Siksi kaupungissa ei ole yhtä liikekeskustaa vaan useita '
      + 'erillisiä keskittymiä, joilla kullakin on oma siluettinsa. '
      + 'Keskustan rakennukset yhdistää yhdentoista kilometrin '
      + 'ilmastoitu tunneli- ja kävelysiltaverkosto.'
      + '\n\n'
      + 'Kaupunki on hyvin kansainvälinen: Greater Houstonin alueella '
      + 'asuu arviolta 1,1 miljoonaa ulkomailla syntynyttä eli 21,4 '
      + 'prosenttia väestöstä, ja kaupungissa on maan kolmanneksi '
      + 'suurin konsulaattikeskittymä, 92 maata. Suurin vuotuinen '
      + 'tapahtuma on maaliskuinen karjanäyttely ja rodeo.',
  },
  /* GUATEMALAN, NICARAGUAN JA PANAMAN maaintrot kirjoitettiin 6.9.2026
   * maalehtien (MAA_KATEGORIAT.GTM, .NIC ja .PAN) yhteydessä samasta
   * en-Wikipedian aineistosta kuin lehdet. Vain intro-kenttä, kuten
   * Kanadalla, Meksikolla ja Kuuballa. Avaimet ovat maailmankartan
   * countryShapes-taulun wiki-nimiä (js/packs/maailmankartta.js);
   * Panamán kaupungilla on oma avaimensa 'Panama (kaupunki)', joten
   * maan avain 'Panama' ei törmää siihen.
   *
   * Karttanostojen aiheita ei toisteta: Tikal ja Chichicastenango,
   * Rubén Darío ja Solentiname sekä Portobelo ja Dariénin aukko ovat
   * maastokohteiden omia. Nykypolitiikka ja käynnissä olevat
   * selkkaukset on rajattu ulos samalla linjauksella kuin lehdissä. */
  Guatemala: {
    intro: 'Guatemala on isoisän matkavuonna 1873 kaksivuotiaan '
      + 'liberaalivallankumouksen maa: presidentiksi astuu 4. kesäkuuta '
      + 'Justo Rufino Barrios, joka erottaa kirkon valtiosta ja tekee '
      + 'alkeiskoulusta ilmaisen ja pakollisen. Sitä ennen maa oli ollut '
      + 'kolmesataa vuotta Espanjan kenraalikapteenikunta, jonka '
      + 'pääkaupunki ehti muuttaa neljä kertaa — kahdesti siksi, että '
      + 'tulivuori tai maanjäristys kaatoi sen. **Vuoden 1773 järistysten '
      + 'jälkeen hylätystä kaupungista tuli La Antigua Guatemala.**'
      + '\n\n'
      + 'Kaiken tämän alla on paljon vanhempi maa. Mayakuningaskunnat '
      + 'hallitsivat ylänköjä espanjalaisten tuloon 1524 asti, ja '
      + 'kʼicheʼien pyhä kirja Popol Vuh kirjoitettiin muistiin '
      + 'Chichicastenangossa 1700-luvun alussa. Maassa on 37 tulivuorta '
      + 'ja niistä neljä toiminnassa, Väli-Amerikan korkein tulivuoreton '
      + 'ylänkö ja Amazonin pohjoispuolen laajin trooppinen metsä. '
      + 'Vaatteesta näkee yhä, mistä kylästä ihminen on: jokaisella '
      + 'yhteisöllä on oma kuvionsa, ja kangas kudotaan vyötäröltä '
      + 'puuhun jännitetyillä kangaspuilla.',
  },
  Nicaragua: {
    intro: 'Nicaragua on Väli-Amerikan suurin maa, ja sen läntinen puoli '
      + 'on tulivuorten ja järvien vyöhykettä. Maan nimi tulee sanasta '
      + 'Nicānāhuac, jolla nawatia puhuneet nicaraot kutsuivat seutua; '
      + 'vanha selitys päällikkö Nicaraon nimestä kaatui 2002, kun kävi '
      + 'ilmi, että päällikön oikea nimi oli Macuilmiquiztli. Nicaraot ja '
      + 'chorotegat olivat vaeltaneet etelään Meksikon Cholulan '
      + 'laaksosta.'
      + '\n\n'
      + '**Itsenäisyyden ajan politiikkaa hallitsi Leónin liberaalin ja '
      + 'Granadan konservatiivisen eliitin kilpailu**, joka ajautui '
      + 'toistuvasti sisällissodaksi. Ratkaisu löytyi kaupunkien '
      + 'väliltä: Managua oli kalastajakylä, joka sai kaupunkioikeudet '
      + '1819 ja valittiin pääkaupungiksi 1852 juuri siksi, että se oli '
      + 'sopivasti riitapuolten puolivälissä. Vuosi isoisän matkan '
      + 'jälkeen, 1874, kaupungin rakennustöissä paljastui ihmisen '
      + 'jalanjälkiä kivettyneessä tuhkassa — noin 2 120 vuotta vanhoja. '
      + 'Maan itäinen puoli on toinen maailma: Karibian rannikolla '
      + 'puhutaan englantia ja miskitoa ja tanssitaan toukotangon '
      + 'ympärillä.',
  },
  Panama: {
    intro: 'Panama on kapein kohta, jossa Pohjois- ja Etelä-Amerikka '
      + 'liittyvät yhteen. Kannas nousi merestä arviolta kolme miljoonaa '
      + 'vuotta sitten, ja seuraukset olivat maailmanlaajuiset: '
      + 'Atlantin ja Tyynenmeren vedet erosivat, syntyi Golfvirta ja '
      + 'pohjoiselle navalle alkoi kertyä jäätä. **Samalla avautui '
      + 'silta, jota pitkin maaeläimet vaihtoivat mantereita** — '
      + 'vyötiäiset ja laiskiaiset pohjoiseen, kissat ja karhut etelään.'
      + '\n\n'
      + 'Ihmisten historiassa kannas on ollut sama asia: paikka, jonka '
      + 'yli kuljetaan. Azueron niemimaalla tehtiin Väli-Amerikan '
      + 'varhaisinta keramiikkaa jo 2500 eaa., ja Coclén kultaesineitä '
      + 'on löydetty Jukatanilta asti. Vasco Núñez de Balboa näki '
      + 'kannaksen yli kulkiessaan 25. syyskuuta 1513 ensimmäisenä '
      + 'eurooppalaisena Tyynenmeren. Isoisän matkavuonna 1873 Panama '
      + 'oli osa Kolumbiaa, ja kannaksen yli kulki jo rautatie; kanavaa '
      + 'ei vielä ollut. Itsenäisyyspäivää vietetään 28. marraskuuta, '
      + 'jolloin kansalliskokous julisti 1821 kannaksen irti Espanjasta.',
  },
  /* MIAMI (Opus 6.9.2026, paketti O9). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain miami); pohjana
   * docs/mantereet-tyoaineisto/faktapohja-miami.md ja
   * tarkistus-miami.md. Avain on kaupungin wiki-nimi (js/packs/
   * northamerica.js: 'Miami'), joka on tässä sama kuin näyttönimi.
   * Väitteet on luettu en-Wikipedian raakateksteistä 6.9.2026
   * ("Miami", "History of Miami", "Tequesta", "Julia Tuttle").
   *
   * TARKISTUKSEN KORJAUS ON TEHTY: kaupungin perustamisesta kerrotaan
   * 502 äänestäjää eikä yleisartikkelin "runsaat 300 asukasta" —
   * luvut ovat ristiriidassa, ja tarkempi artikkeli voittaa.
   *
   * PILARI 1: tequestat mainitaan ennen kaupungin perustamista.
   * Everglades ja merenpinnan nousu ovat myös laudan visan aiheita
   * (northamerica-questions.js), joten niitä toistetaan tässä vain
   * sen verran kuin johdatus vaatii. */
  Miami: {
    intro: 'Miami on Floridan toiseksi suurin kaupunki ja '
      + 'Miami-Daden piirikunnan keskus. Se on rakennettu leveälle '
      + 'tasangolle, jonka länsipuolella on Evergladesin ruohojoki ja '
      + 'itäpuolella Biscayne Bay saarineen ja riuttoineen. Korkeus '
      + 'merenpinnasta on useimmissa kaupunginosissa vain noin kaksi '
      + 'metriä, ja lämmin Golfvirta kulkee runsaan '
      + 'kahdenkymmenen kilometrin päässä rannikosta.'
      + '\n\n'
      + 'Ennen kaupunkia seutu oli tequestojen maata: joen suulla oli '
      + 'kylä jo vuosina 500–600 eaa. Isoisän matkavuonna 1873 tässä ei '
      + 'ollut kaupunkia lainkaan, vain kourallinen perheitä lahden '
      + 'rannalla ja Brickellin kauppa-asema joen etelärannalla. '
      + 'Kaupunki syntyi vasta, kun Julia Tuttle sai Henry Flaglerin '
      + 'jatkamaan rautatietään etelään: **Miami perustettiin 28. '
      + 'heinäkuuta 1896**, ja perustamiskokouksessa oli 502 '
      + 'äänestäjää.'
      + '\n\n'
      + 'Kasvu oli niin nopeaa, että talvivieraat antoivat kaupungille '
      + 'lempinimen **Magic City**. Nykyään Miamia sanotaan '
      + 'Latinalaisen Amerikan pääkaupungiksi: vuoden 2020 laskennassa '
      + '70,2 prosenttia asukkaista oli latinoja, ja kadulla espanja '
      + 'kuuluu yhtä usein kuin englanti.',
    teksti: 'Miamin peruskallio on Miamin kalkkikiveä eli ooliittia, '
      + 'ja sen alla on Biscaynen pohjavesiesiintymä, josta koko '
      + 'metropolialue ottaa juomavetensä. Siksi maata ei voi kaivaa '
      + 'viittä tai kuutta metriä syvemmälle osumatta veteen, ja siksi '
      + 'kaupungin radat kulkevat pylväiden päällä tai maan tasalla.'
      + '\n\n'
      + 'Kaupungin väkiluku oli vuoden 1900 laskennassa 1 681 ja '
      + 'vuonna 1950 jo 249 276. Kasvu hidastui vuosisadan '
      + 'jälkipuoliskolla, mutta kääntyi taas nousuun 2000-luvulla '
      + 'keskustan tornirakentamisen myötä; vuoden 2020 laskennassa '
      + 'asukkaita oli 442 241. Kuubasta muutti Miamiin runsaasti '
      + 'väkeä vuoden 1959 vallankumouksen jälkeen, ja vuonna 1985 '
      + 'kaupunki valitsi ensimmäisen Kuubassa syntyneen pormestarinsa.'
      + '\n\n'
      + 'Matkailu on kaupungin suurimpia yksityisiä toimialoja, ja '
      + 'PortMiami on maailman vilkkain risteilysatama. Downtownin '
      + 'Brickell Avenuella on maan suurin kansainvälisten pankkien '
      + 'keskittymä. Ruoka kertoo saman tarinan kuin katukuva: '
      + 'latinalaisamerikkalainen, karibialainen ja amerikkalainen '
      + 'keittiö ovat sekoittuneet omaksi tyylikseen, jota kutsutaan '
      + 'nimellä floribbean.',
  },
  /* HALIFAX (Opus 6.9.2026, paketti O9). Sama erä kuin lehden tekstit
   * (js/packs/kulttuuri-kategoriat.js, avain halifax); pohjana
   * docs/mantereet-tyoaineisto/faktapohja-halifax.md ja
   * tarkistus-halifax.md. Avain on kaupungin wiki-nimi (js/packs/
   * northamerica.js: 'Halifax (Kanada)'), joka EI ole sama kuin
   * näyttönimi — ui.js lukee ARTIKKELIT[city.wiki ?? city.name].
   * Väitteet on luettu en-Wikipedian raakateksteistä 6.9.2026
   * ("Halifax, Nova Scotia", "History of Halifax, Nova Scotia",
   * "Mi'kmaq", "Halifax Explosion").
   *
   * TARKISTUKSEN KORJAUKSET ON TEHTY: kaupunkioikeuksien vuosilukua ei
   * kerrota (lähde antaa kaksi eri vuotta), Cornwallisin mukana
   * tulleiden määrä on "runsaat tuhat" (lähteet vaihtelevat) ja
   * räjähdyksen uhriluku on tarkemman artikkelin "vähintään 1 782".
   *
   * PILARI 1: mi'kmaqit ja paikan oma nimi Kjipuktuk mainitaan ennen
   * brittien perustamaa kaupunkia. Vuoden 1917 räjähdys ja jäätymätön
   * satama ovat myös laudan visan aiheita (northamerica-questions.js),
   * mutta ne kuuluvat kaupungin ytimeen eikä niitä voi ohittaa. */
  'Halifax (Kanada)': {
    intro: 'Halifax on Nova Scotian pääkaupunki ja Atlantin Kanadan '
      + 'väkirikkain kunta. Kaupunki kiertää satamaa, joka on maailman '
      + 'suurimpia luonnonsatamia ja pysyy auki läpi talven. '
      + 'Mi\'kmaqit kutsuvat paikkaa nimellä **Kjipuktuk** eli '
      + 'Chebookt, joka käännetään sekä päällikkösatamaksi että '
      + 'suureksi satamaksi; kansa on liikkunut näillä rannoilla kauan '
      + 'ennen kirjoitettua historiaa.'
      + '\n\n'
      + 'Britit perustivat Halifaxin 21. kesäkuuta 1749, kun Edward '
      + 'Cornwallis saapui Chebuctoon kolmellatoista kuljetusaluksella '
      + 'ja runsaan tuhannen uudisasukkaan kanssa. Kaupunki nimettiin '
      + 'kauppaneuvoston puheenjohtajan, Halifaxin toisen jaarlin '
      + 'mukaan. Perustaminen rikkoi sopimuksia mi\'kmaqien kanssa ja '
      + 'aloitti sodan, joka päättyi vasta rauhan- ja '
      + 'ystävyyssopimuksiin; niiden muistoksi vietetään Treaty Dayta '
      + 'lokakuun ensimmäisenä päivänä.'
      + '\n\n'
      + 'Halifaxista tuli nopeasti kuninkaallisen laivaston suurin '
      + 'tukikohta Atlantin rannikolla, ja sotilaallinen leima näkyy '
      + 'yhä kaupunkikuvassa. **Isoisän matkavuonna 1873 Halifax oli '
      + 'brittiläinen varuskuntakaupunki**, joka oli ollut kuusi vuotta '
      + 'osa Kanadaa ja odotti rautatietä, joka valmistui vasta 1876.',
    teksti: 'Nykyinen Halifax Regional Municipality syntyi 1. '
      + 'huhtikuuta 1996, kun Halifax, Dartmouth, Bedford ja Halifaxin '
      + 'piirikunta yhdistettiin yhdeksi kunnaksi. Kunnan maapinta-ala '
      + 'on valtava, mutta taajamaa on siitä alle viisi prosenttia: '
      + 'loppu on rannikkoa, metsää ja maaseutua. Vuonna 2024 '
      + 'metropolialueella arvioitiin olevan 530 167 asukasta.'
      + '\n\n'
      + 'Kaupungin historian raskain päivä on 6. joulukuuta 1917, '
      + 'jolloin räjähdysainelastissa ollut rahtialus Mont-Blanc '
      + 'törmäsi toiseen alukseen ja räjähti satamassa. Vähintään '
      + '1 782 ihmistä kuoli ja arviolta 9 000 loukkaantui; räjähdys '
      + 'oli aikansa suurin ihmisen aiheuttama. Apua tuli Bostonista, '
      + 'ja side kaupunkien välillä on säilynyt siitä asti. Vuonna '
      + '1912 Halifax oli lähin suuri satama Titanicin '
      + 'onnettomuuspaikalle, ja uhreja on haudattu kaupungin '
      + 'hautausmaille.'
      + '\n\n'
      + 'Nykyään Halifax on Atlantin Kanadan hallinnon, kaupan ja '
      + 'kulttuurin keskus. Suurimpia työllistäjiä ovat '
      + 'puolustusministeriö, satama, telakka, yliopistot ja '
      + 'terveydenhuolto, ja kaupunki on Kanadan neljän suurimman '
      + 'konttisataman joukossa. Ilmasto on kostea mannerilmasto, '
      + 'jota Golfvirta leudontaa — meri viivästyttää vuodenaikoja '
      + 'niin, että elokuu on lämpimin kuukausi ja syyskuu kesäkuuta '
      + 'leudompi.',
  },
  Grönlanti: {
    // Muita pidempi tarkoituksella: maalehden maaosasto (MAA_KATEGORIAT
    // GRL) nojaa tähän introon yksin, sama malli kuin Egyptillä ja
    // Kenialla. Faktat en-Wikipedian artikkeleista "Greenland",
    // "Hans Egede" ja "Culture of Greenland" (tarkistettu 6.9.2026).
    intro: 'Grönlanti on maailman suurin saari, joka ei ole manner, ja '
      + 'neljä viidesosaa siitä on mannerjäätikön alla. Grönlanniksi '
      + 'maa on Kalaallit Nunaat, kalaallien maa, ja nykyväestö '
      + 'polveutuu thulelaisista, joiden kulttuuri vaelsi Alaskasta '
      + 'itään ja saapui Grönlantiin noin vuonna 1300. Kaikki '
      + 'kaupungit ja kylät ovat jäättömällä rannikolla, enimmäkseen '
      + 'lännessä, ja välit ovat pitkät. Nuukissa vuorokauden '
      + 'keskilämpötila liikkuu viiden pakkasasteen ja kymmenen '
      + 'lämpöasteen välillä, mutta jäätikön laella mitattiin '
      + '22. joulukuuta 1991 koko pohjoisen pallonpuoliskon ennätys, '
      + '69,6 pakkasastetta.'
      + '\n\n'
      + 'Eurooppalaisten kartoille saaren eteläinen rannikko pääsi '
      + '1502, ja vuonna 1721 pappi Hans Egede purjehti Bergenistä '
      + 'etsimään kadonneita pohjoismaisia asukkaita, ei löytänyt heitä '
      + 'ja perusti sen sijaan nykyisen Nuukin. **Metsästys on yhä '
      + 'kulttuurin sydän** — maan oman hallinnon sanoin sen sielu — ja '
      + 'kalastus on tärkein elinkeino ja viennin pääosa. Ruoka tulee '
      + 'mereltä: hylkeestä, valaasta, kalasta ja linnusta.',
  },
  /*
   * GUATEMALA CITY (Opus, Fablen parvi 7.9.2026). Avain on laudan
   * wiki-nimi 'Guatemala (kaupunki)' (js/packs/northamerica.js).
   * Väitteet ovat samasta erästä kuin lehden tekstit
   * (kulttuuri-kategoriat.js, avain guatemala) ja ne on tarkistettu
   * en-Wikipedian raakatekstistä 7.9.2026 ("Guatemala City",
   * "Kaminaljuyu", "Cathedral of Guatemala City"). Sisältölinjaus on
   * spec-mantereet.md:n Keski-Amerikan kohta: arkeologia, kulttuuri ja
   * historia kantavat, nykyväkivaltaa ei käsitellä.
   */
  'Guatemala (kaupunki)': {
    intro: 'Guatemala City on Guatemalan pääkaupunki ja Väli-Amerikan '
      + 'suurin kaupunki. Se on noin 1 500 metrin korkeudessa Ermitan '
      + 'laaksossa vuorten välissä, ja korkeus tekee ilmastosta lähes '
      + 'kevätmäisen ympäri vuoden. Kaupunki on **neljäs yritys**: '
      + 'vuoden 1773 järistykset jättivät edellisen pääkaupungin '
      + 'raunioiksi, ja hallinnon istuin siirrettiin tänne 1776 '
      + 'nimellä Nueva Guatemala de la Asunción.'
      + '\n\n'
      + 'Uuden kaupungin alta löytyi vanha: nykyisen kaupungin '
      + 'länsiosassa on **Kaminaljuyú**, suurin mayakeskus Yucatánin '
      + 'alankojen ulkopuolella, joka nousi noin 300 eKr. obsidiaanin '
      + 'kaupan varassa. Espanjalaiskaupunki rakennettiin ruutukaavaan '
      + 'ja jaettiin myöhemmin vyöhykkeisiin, joiden numero kuuluu '
      + 'osoitteeseen. Järistykset ovat palanneet kerta toisensa '
      + 'jälkeen: 1917–1918 tuhoutui suuri osa vanhasta kaupungista ja '
      + '1976 Motaguan siirros liikahti 7,5 magnitudin voimalla.'
      + '\n\n'
      + 'Kaupungista näkyy neljä kerrostulivuorta, joista kaksi on '
      + 'aktiivisia. Vyöhyke 1 on historiallinen keskusta, ja '
      + 'vyöhykkeellä 2 on koko maa pienoiskoossa: 1 800 neliömetrin '
      + 'maastokartta vuodelta 1905.',
    teksti: 'Guatemala City on maan keskiylängöllä, Tyynenmeren '
      + 'rannikkotasangon ja pohjoisen Peténin alankojen välissä. '
      + 'Kaupunki täyttää Ermitan laakson, jota halkovat '
      + 'jyrkkäreunaiset rotkot, ja sen ympärille on kasvanut '
      + 'metropolialue naapurikunnista.'
      + '\n\n'
      + 'Paikalla on asuttu kolme ja puoli vuosituhatta: Kaminaljuyún '
      + 'kummuista laskettiin ensimmäisissä kartoituksissa noin '
      + 'kaksisataa. Espanjalainen kaupunki siirtyi tänne 1776, '
      + 'katedraali 1779, ja itsenäistymisen jälkeen kaupungista tuli '
      + '1821 Keski-Amerikan yhdistyneiden provinssien pääkaupunki. '
      + '1800-luvulla rakennettiin teatteri ja presidentinpalatsi, ja '
      + 'kaupunki levittäytyi uusille bulevardeille.'
      + '\n\n'
      + 'Nykyään kaupunki on maan talouden, hallinnon ja liikenteen '
      + 'keskus, jonka osoitejärjestelmä kertoo etäisyyden metreinä '
      + 'lähimmästä risteyksestä. Museot ovat kaupungin ylpeys: '
      + 'mayataiteen kokoelmat, alkuperäiskansojen pukujen museo ja '
      + 'ulkoilmassa oleva maastokartta koko maasta.',
  },
  /*
   * NUUK (Opus, Fablen parvi 7.9.2026). Avain on laudan wiki-nimi
   * 'Nuuk' (js/packs/northamerica.js). Väitteet ovat samasta erästä
   * kuin lehden tekstit (kulttuuri-kategoriat.js, avain nuuk) ja ne on
   * luettu en-Wikipedian raakateksteistä 7.9.2026 ("Nuuk",
   * "Old Nuuk", "Greenland ice sheet"); pohjana
   * docs/mantereet-tyoaineisto/faktapohja-nuuk.md ja tarkistus-nuuk.md.
   *
   * TÄMÄ EI TOISTA MAAN OMAA MERKINTÄÄ: taulussa on jo avain
   * 'Grönlanti', joka kertoo jäätiköstä, Egeden vuoden 1721 matkasta
   * ja metsästyksestä. Kaupungin intro kertoo kaupungin — jäätikön
   * osuus mainitaan vain siksi, että laudan visa kysyy sitä ja
   * vastauksen on löydyttävä lehdestä.
   *
   * EI NYKYPOLITIIKKAA: puolueet, istuva pääministeri ja pormestari
   * jätetään pois, vaikka lähde luettelee ne.
   */
  Nuuk: {
    intro: 'Nuuk on Grönlannin pääkaupunki ja väkirikkain kaupunki. '
      + 'Se on Nuup Kangerlua -vuonon suussa **Grönlannin '
      + 'lounaisrannikolla**, kymmenen kilometriä Labradorinmereltä ja '
      + 'runsaat kaksisataa kilometriä napapiiristä etelään; nimi '
      + 'tarkoittaa grönlanniksi niemeä. Leveysasteella 64°11′ '
      + 'pohjoista se on **maailman pohjoisin pääkaupunki**, muutaman '
      + 'kilometrin Reykjavíkia pohjoisempana. Grönlanti on Tanskan '
      + 'valtakunnan itsehallintoalue, ja Nuukissa istuvat sekä '
      + 'parlamentti että hallitus.'
      + '\n\n'
      + 'Asukkaita oli tammikuussa 2025 runsaat kaksikymmentätuhatta. '
      + 'Se on yli kolmasosa koko alueen väestöstä ja silti niin vähän, '
      + 'että Nuuk on yksi maailman pienimmistä pääkaupungeista. Neljä '
      + 'viidesosaa Grönlannista on mannerjäätikön alla, joten kaikki '
      + 'kaupungit ja kylät ovat jäättömällä rannikkokaistaleella — '
      + 'eikä yksikään tie yhdistä Nuukia mihinkään muuhun paikkaan.'
      + '\n\n'
      + 'Kaupunki syntyi 1728, kun kuninkaallinen kuvernööri siirsi '
      + 'lähetys- ja kauppa-aseman saarelta mantereelle ja nimesi sen '
      + 'Godthaabiksi, hyväksi toivoksi. Nimi vaihtui Nuukiksi '
      + '1. toukokuuta 1979, samana päivänä kun Grönlannin kotihallinto '
      + 'aloitti työnsä.',
    teksti: 'Nuuk on vuonon suulla luotojen keskellä, ja vuono '
      + 'jakautuu ylempänä kolmeen haaraan kolmen suuren saaren '
      + 'ympärille. Koillisessa kohoaa Sermitsiaq, 1 210 metriä, joka '
      + 'näkyy lähes kaikkialta kaupungista; valtakunnallinen '
      + 'sanomalehti on nimetty sen mukaan. Lähempänä ovat Store '
      + 'Malene ja Lille Malene, joista jälkimmäisen rinteessä on '
      + 'hiihtohissi.'
      + '\n\n'
      + 'Paikalla on asuttu neljä vuosituhatta. Ensin tulivat '
      + 'Saqqaq-kulttuurin ihmiset noin 2200 eaa., sitten '
      + 'dorset-kulttuuri ja noin vuodesta 1000 norjalaiset, joiden '
      + 'asutus katosi 1400-luvulla. Vuoden 1728 siirtokunnan viereen '
      + 'nousi 1747 herrnhutilaisten lähetysasema Uusi Herrnhut, ja '
      + 'kaksi asutusta toimivat erillään aina vuoteen 1900.'
      + '\n\n'
      + 'Nykyään kaupungissa on maan hallinto, ainoa yliopisto, '
      + 'kansallismuseo ja kulttuuritalo Katuaq. Lähes puolet '
      + 'Grönlannin kalastuslaivastosta on Nuukissa, ja sähkö tulee '
      + 'Buksefjordin vesivoimalasta linjaa pitkin, joka ylittää '
      + 'vuonon maailman pisimmällä jännevälillä. Katukuva on kahden '
      + 'kielen ja kahden perinteen kaupunki: The Guardian arvioi '
      + '2016, että Nuuk saattaa hyvinkin olla maailman '
      + 'alkuperäiskansaisin kaupunki.',
  },
  /*
   * ANCHORAGE (Opus, Fablen parvi 7.9.2026). Avain on laudan
   * wiki-nimi 'Anchorage' (js/packs/northamerica.js); en-Wikipedian
   * artikkelin otsikko on "Anchorage, Alaska". Väitteet ovat samasta
   * erästä kuin lehden tekstit (kulttuuri-kategoriat.js, avain
   * anchorage) ja ne on luettu en-Wikipedian raakateksteistä
   * 7.9.2026; pohjana docs/mantereet-tyoaineisto/faktapohja-anchorage.md
   * ja tarkistus-anchorage.md.
   *
   * SISÄLTÖLINJAUS on spec-mantereet.md:n USA-kohta: siirtomaahistoria
   * kerrotaan tapahtumana neutraalisti, ei nykypolitiikkaa. Pääkaupungin
   * siirtoäänestykset 1960–1978 jätetään pois.
   */
  Anchorage: {
    intro: 'Anchorage on **Alaskan suurin kaupunki**: vuoden 2020 '
      + 'laskennassa asukkaita oli 291 247 eli lähes neljäkymmentä '
      + 'prosenttia koko osavaltion väestöstä. Osavaltion pääkaupunki '
      + 'on silti Juneau. Kaupunki on Etelä-Keski-Alaskassa Cook '
      + 'Inletin pohjukassa niemellä, jonka pohjoispuolella on Knik '
      + 'Arm ja eteläpuolella Turnagain Arm; idässä kohoavat Chugachin '
      + 'vuoret aivan katujen päässä.'
      + '\n\n'
      + 'Paikan ensimmäinen nimi on dena\'inankielinen Dgheyay Kaq\'. '
      + 'Dena\'ina-athabaskit saapuivat vuorensolien kautta noin '
      + 'vuonna 500 ja liikkuivat alueella vuodenaikojen mukaan. '
      + 'Kaupunkia ei ollut vielä 1900-luvun alussa: se syntyi 1914, '
      + 'kun Ship Creekin suulle perustettiin rautatien '
      + 'rakennussatama ja rannalle nousi telttakaupunki. '
      + 'Kaupunkioikeudet tulivat 23. marraskuuta 1920.'
      + '\n\n'
      + 'Sijainti selittää nykyisen Anchoragen. Kaupunki on lähes yhtä '
      + 'kaukana New Yorkista, Tokiosta ja Murmanskista, ja kymmenen '
      + 'lentotunnin sisällä on lähes yhdeksänkymmentä prosenttia '
      + 'asutusta pohjoista pallonpuoliskoa. Siksi **Ted Stevensin '
      + 'lentoasema on maailman kolmanneksi vilkkain rahtiliikenteessä** '
      + '— Aasian ja Yhdysvaltain mantereen lyhin reitti kulkee tästä.',
    teksti: 'Anchorage on rakennettu rannikon kerrostuneelle '
      + 'tasangolle kahden vuoroveden haaran väliin. Kaupunki on '
      + 'maapinta-alaltaan Yhdysvaltain neljänneksi laajin, mutta '
      + 'suurin osa siitä on vuorta ja metsää: puistot on kytketty '
      + 'toisiinsa viherkäytävillä, jotka seuraavat järviä ja puroja.'
      + '\n\n'
      + 'James Cook purjehti vuonoon toukokuussa 1778 etsimässä '
      + 'Luoteisväylää ja antoi nimet, joita yhä käytetään. '
      + 'Yhdysvallat osti Alaskan Venäjältä 1867, ja kultaa löytyi '
      + 'Turnagain Armin varrelta 1888. Rautatie valmistui 1923, '
      + 'lentotoiminta ja sotilastukikohdat kasvattivat kaupunkia '
      + '1930–1950-luvuilla, ja vuoden 1968 Prudhoe Bayn öljylöytö '
      + 'käänsi talouden öljyyn.'
      + '\n\n'
      + 'Pitkäperjantaina 27. maaliskuuta 1964 kaupunkia ravisteli '
      + '9,2 magnitudin maanjäristys, voimakkain koskaan mitattu '
      + 'Pohjois-Amerikassa. Keskusta vaurioitui pahoin ja yksi '
      + 'kaupunginosa liukui rinnettä alas; sen paikalla on nyt '
      + 'puisto. Nykyään satama vastaanottaa 95 prosenttia kaikesta '
      + 'Alaskaan menevästä tavarasta, ja kaupungissa elää satoja '
      + 'hirviä ja karhuja ihmisten seassa.',
  },
  /*
   * MONTERREY (7.9.2026, parvierä). Väitteet ovat samasta erästä
   * kuin lehden tekstit (js/packs/kulttuuri-kategoriat.js, avain
   * monterrey), ja ne on luettu en-Wikipedian raakateksteistä
   * 7.9.2026 — uusia lähdehakuja ei tarvittu. Sisältölinjaus on
   * spec-mantereet.md:n Meksiko-kohta: arkeologia, kulttuuri ja
   * historia kantavat, nykyväkivaltaa ei käsitellä. Vuoden 1873
   * kulma on introssa mukana.
   */
  Monterrey: {
    intro: 'Monterrey on Nuevo Leónin pääkaupunki Koillis-Meksikossa, '
      + 'noin 540 metrin korkeudessa Sierra Madre Orientalin juurella '
      + 'ja parinsadan kilometrin päässä Texasin rajasta. Kaupungin '
      + 'halki kulkee idästä länteen Santa Catarina -joki, joka on '
      + 'pinnalta kuiva suurimman osan vuotta mutta virtaa maan alla. '
      + 'Idässä kohoaa **Cerro de la Silla**, satulavuori, jonka '
      + 'neljästä huipusta kaksi ja niiden välinen notko muodostavat '
      + 'kaupungin tunnuksen.'
      + '\n\n'
      + 'Kaupunki syntyi kolmannella yrityksellä. Alberto del Canton '
      + 'ja Luis Carvajal y de la Cuevan asutukset autioituivat, ja '
      + 'vasta **Diego de Montemayor** sai 20. syyskuuta 1596 '
      + 'kolmentoista perheen retkikunnallaan aikaan pysyvän '
      + 'kaupungin Santa Lucían lähteen viereen. Espanjan vallan '
      + 'aikana Monterrey pysyi pienenä ja välitti kauppaa San '
      + 'Antonion, Tampicon ja Saltillon välillä. Isoisän matkavuonna '
      + '1873 se oli 277-vuotias osavaltionpääkaupunki, jonka '
      + 'rikkaus oli tullut rajan takaa: Yhdysvaltain sisällissodan '
      + 'aikana puuvilla oli kulkenut näiden kauppahuoneiden kautta.'
      + '\n\n'
      + 'Terästehdas perustettiin 1900 ja teki kaupungista Meksikon '
      + 'teollisuuden ytimen. Kun tehdas meni konkurssiin 1986, '
      + 'alueesta tehtiin puisto, jossa masuunit seisovat yhä '
      + 'paikoillaan.',
    teksti: 'Monterrey on laaksossa vuorten välissä: idässä Cerro de '
      + 'la Silla, lännessä piispanhiippoja muistuttava Cerro de las '
      + 'Mitras, etelässä Loma Larga ja sen takana Sierra Madre '
      + 'Orientalin kansallispuisto. Sisämaan ja matalan korkeuden '
      + 'takia se on yksi Meksikon lämpimimmistä suurkaupungeista.'
      + '\n\n'
      + 'Kaupunki perustettiin 1596, mutta se kasvoi vasta '
      + 'itsenäistymisen jälkeen, kun siitä tuli 1824 Nuevo Leónin '
      + 'pääkaupunki ja rajakaupan solmukohta. Vuonna 1846 täällä '
      + 'käytiin Meksikon–Yhdysvaltain sodan ensimmäinen suuri '
      + 'taistelu. Panimo perustettiin 1890, rautatie tuli '
      + 'vuosikymmentä myöhemmin ja terästehdas 1900.'
      + '\n\n'
      + 'Nykyään Monterrey on Meksikon toiseksi suurimman '
      + 'metropolialueen keskus ja maan teollisuuden ydin: terästä, '
      + 'sementtiä, lasia, autonosia ja olutta. Keskustan sydän on '
      + 'Macroplaza, jonka pohjoispäässä on hallintopalatsi ja '
      + 'eteläpäässä kaupungintalo; itälaidalta alkaa vanha '
      + 'kortteliverkko Barrio Antiguo.',
  },
  /*
   * MÉRIDA (7.9.2026, parvierä). Avain on laudan wiki-nimi
   * 'Mérida (Meksiko)' (js/packs/northamerica.js), ei
   * en-Wikipedian otsikko — sama käytäntö kuin New Yorkissa.
   * Väitteet ovat samasta erästä kuin lehden tekstit
   * (kulttuuri-kategoriat.js, avain merida). Sisältölinjaus on
   * spec-mantereet.md: alkuperäiskansat kunnioittavasti ja elävinä,
   * väkivaltainen historia tapahtumina ilman yksityiskohtia.
   */
  'Mérida (Meksiko)': {
    intro: 'Mérida on Yucatánin osavaltion pääkaupunki ja koko '
      + 'niemimaan kulttuurin ja talouden keskus. Se on noin 35 '
      + 'kilometriä Meksikonlahden rannalta sisämaassa ja vain '
      + 'yhdeksän metriä merenpinnan yläpuolella, tasaisella '
      + 'kalkkikivialustalla, jolla ei ole jokia lainkaan: sadevesi '
      + 'imeytyy kiveen ja kerääntyy cenote-kaivoihin.'
      + '\n\n'
      + 'Kaupunki rakennettiin 1542 mayakaupungin **Tʼhón** päälle ja '
      + 'sen kivistä; espanjalaiset nimesivät sen Extremaduran '
      + 'Méridan mukaan, koska rauniot muistuttivat heitä Rooman '
      + 'Augusta Emeritasta. Siirtomaa-ajasta 1800-luvun puoliväliin '
      + 'Mérida oli muurattu kaupunki. Isoisän matkavuonna 1873 '
      + '**kastisota** oli yhä käynnissä: niemimaan luoteisosaa '
      + 'hallitsi Méridasta käsin osavaltion hallinto ja kaakkoisosaa '
      + 'itsenäinen mayavaltio Chan Santa Cruz, jonka Britannia oli '
      + 'tunnustanut tosiasialliseksi valtioksi.'
      + '\n\n'
      + 'Samaan aikaan alkoi vaurastuminen: heneken-agaaven kuidusta '
      + 'tehtiin köyttä koko maailman laivoille, ja siitä rahasta '
      + 'rakennettiin Paseo de Montejon bulevardi kartanoineen. '
      + 'Nykyään kolmasosa osavaltion väestöstä puhuu yucatekin '
      + 'mayaa, ja se kuuluu kaupungin espanjassa.',
    teksti: 'Mérida on Yucatánin niemimaan luoteisosassa. Katuruudukko '
      + 'on poikkeuksellisen selkeä: parittomat kadut kulkevat idästä '
      + 'länteen ja parilliset pohjoisesta etelään, ja kadut 60 ja 61 '
      + 'rajaavat pääaukiota Plaza Grandea. Historiallinen keskusta on '
      + 'yksi Amerikan suurimmista.'
      + '\n\n'
      + 'Espanjalaiset perustivat kaupungin 1542, ja sen katedraali '
      + 'valmistui 1598. Yucatán julistautui välillä omaksi '
      + 'tasavallakseen ja palasi Meksikoon 1848. Kastisota kesti '
      + 'vuodesta 1847 pitkälle 1900-luvulle, ja samalla '
      + 'henekenviljelmät tekivät niemimaasta rikkaan; niiden '
      + 'työväeksi saapui 1905 yli tuhat korealaista siirtolaista.'
      + '\n\n'
      + 'Nykyään Mérida on osavaltion hallinnon, yliopistojen ja '
      + 'tutkimuslaitosten kaupunki. Se oli ensimmäinen Amerikan '
      + 'kulttuuripääkaupunki ja ainoa, joka on saanut arvon '
      + 'kahdesti. Mayakulttuuri näkyy arjessa: puheessa, '
      + 'Hanal Pixán -juhlassa ja ruoassa, jonka mausteena on '
      + 'annatto ja kypsennystapana maakuoppa.',
  },
  /*
   * WINNIPEG (7.9.2026). Väitteet tulevat samasta erästä kuin lehden
   * tekstit (js/packs/kulttuuri-kategoriat.js, avain winnipeg), ja ne
   * on luettu en-Wikipedian raakateksteistä 7.9.2026 ("Winnipeg",
   * "Manitoba Act, 1870", "Treaty 1"). Väkiluvut ovat vuoden 2021
   * väestönlaskennasta; lähteen 850 000:n arviota ei käytetä, koska
   * sama luku esiintyy artikkelissa kerran kaupungin ja kerran
   * metropolialueen lukuna (tarkistus-winnipeg.md, kohta D).
   */
  Winnipeg: {
    intro: 'Winnipeg on Manitoban pääkaupunki ja maakunnan suurin '
      + 'kaupunki, ja se on rakennettu sinne, missä Assiniboine yhtyy '
      + 'Punaiseenjokeen. Kaupunki on Kanadan preerian itäreunalla '
      + 'Punaisenjoen laakson pohjalla, tulvatasangolla, jonka '
      + 'pinnanmuodot ovat erittäin tasaiset. Vuonna 2021 kaupungissa '
      + 'asui 749 607 ja metropolialueella 834 678 ihmistä — Kanadan '
      + '**kuudenneksi suurin kaupunki**. Nimi tulee Winnipegjärveltä: '
      + 'creen ja odžibwen sana tarkoittaa sameaa eli mutaista vettä.'
      + '\n\n'
      + 'Jokien yhtymäkohta oli kanoottireittien risteys kauan ennen '
      + 'eurooppalaisia, ja se on anishinaabe-, ininew-, oji-cree-, '
      + 'dene- ja dakota-kansojen perinteistä aluetta sekä '
      + 'métis-kansan syntysija. La Vérendrye rakensi paikalle '
      + 'ensimmäisen turkiskauppa-aseman 1738, ja Manitoba Act teki '
      + '1870 Manitobasta Kanadan viidennen provinssin.'
      + '\n\n'
      + '**Isoisän matkavuonna 1873 Winnipeg sai kaupunkioikeudet.** '
      + 'Kaupunki perustettiin 8. marraskuuta 1873 Selkirkin '
      + 'siirtokunnan ympärille, ja sille antoi nimen '
      + 'métis-lainsäätäjä James McKay. Rautatie tuli 1881, ja sen '
      + 'jälkeen kasvu oli nopeaa: vuoteen 1911 mennessä Winnipeg oli '
      + 'Kanadan kolmanneksi suurin kaupunki.',
    teksti: 'Winnipeg on Manitoban pääkaupunki Kanadan preerian '
      + 'itäreunalla, Punaisen- ja Assiniboinejoen yhtymäkohdassa. '
      + 'Kaupungin läpi virtaa neljä jokea, ja sitä ympäröi lännessä '
      + 'korkearuohopreeria ja koillisessa haapaparkkimaa. Kaupungissa '
      + 'kasvaa Pohjois-Amerikan suurin jäljellä oleva kypsä '
      + 'kaupunkijalavametsä.'
      + '\n\n'
      + 'Turkiskaupan asemasta kasvoi rautateiden solmukohta, jota '
      + 'sanottiin lännen portiksi ja pohjoisen Chicagoksi. Panaman '
      + 'kanavan avaaminen 1914 vei osan tavaravirrasta muualle, ja '
      + 'Vancouver ohitti Winnipegin ensimmäisen maailmansodan '
      + 'loppuun mennessä. Toukokuussa 1919 yli kolmekymmentätuhatta '
      + 'työntekijää jätti työnsä yleislakossa, joka päättyi '
      + 'kesäkuussa. Manitoban parlamenttitalo Kultapoikineen '
      + 'valmistui 1920.'
      + '\n\n'
      + 'Nykyään talous nojaa terveydenhuoltoon, kauppaan, '
      + 'teollisuuteen ja julkishallintoon, ja kaupungissa lyödään '
      + 'kaikki Kanadan kiertorahat. Ilmasto on äärimmäisen '
      + 'vuodenaikainen: tammikuun keskilämpötila on noin kuusitoista '
      + 'astetta pakkasella ja heinäkuun 19,7 astetta lämmintä, mutta '
      + 'auringonpaistetunneissa Winnipeg on Kanadan toinen. Yli sataa '
      + 'kieltä puhutaan, ja kaupungissa on maan suurin métis-väestö.',
  },
  /*
   * ST. JOHN'S (7.9.2026). Avain on pelin wiki-nimi
   * (js/packs/northamerica.js: 'St. John’s (Kanada)'), sama tapa kuin
   * Halifaxilla. Väitteet ovat samasta erästä kuin lehden tekstit
   * (kulttuuri-kategoriat.js, avain stjohns) ja luettu
   * en-Wikipedian raakateksteistä 7.9.2026 ("St. John's, Newfoundland
   * and Labrador", "Newfoundland Colony"). Kruununsiirtomaan
   * vuosilukua ei käytetä, koska lähde antaa siitä kaksi eri vuotta
   * (tarkistus-stjohns.md, kohta A).
   */
  'St. John’s (Kanada)': {
    intro: 'St. John’s on Newfoundlandin ja Labradorin pääkaupunki ja '
      + 'maakunnan suurin kaupunki, ja se on **Pohjois-Amerikan '
      + 'itäisin kaupunki** Grönlantia lukuun ottamatta. Se on '
      + 'Avalonin niemimaan itäkärjessä ja kattaa 446 neliökilometriä, '
      + 'josta suurin osa on rakentamatonta metsää. Keskusta nousee '
      + 'rinteeseen kapean sataman ympäriltä.'
      + '\n\n'
      + 'Kalastajat pitivät täällä kausileirejä 1500-luvun alussa, ja '
      + 'nimi São João on portugalilaisella kartalla jo 1519. Sir '
      + 'Humphrey Gilbert julisti paikan 5. elokuuta 1583 Englannin '
      + 'ensimmäiseksi merentakaiseksi siirtomaaksi, mutta pysyvää '
      + 'asutusta ei ollut: Englannin hallitus kielsi kalastajilta '
      + 'pysyvät siirtokunnat, ja kaupunki syntyi vasta vuoden 1630 '
      + 'jälkeen. Seitsenvuotisen sodan viimeinen taistelu '
      + 'Pohjois-Amerikassa käytiin täällä 1762.'
      + '\n\n'
      + '**Isoisän matkavuonna 1873 St. John’s ei ollut Kanadaa.** '
      + 'Newfoundland oli itsehallinnollinen brittiläinen siirtomaa, '
      + 'joka oli hylännyt liiton Kanadan kanssa vuosina 1864–1869 ja '
      + 'liittyi siihen vasta 1949. Atlantin lennätinkaapeli oli '
      + 'noussut merestä Heart’s Contentissa seitsemän vuotta '
      + 'aiemmin.',
    teksti: 'St. John’s on Newfoundlandin saaren itäkärjessä, '
      + 'Atlantin rannalla. Sen edustalla ovat Grand Banks, '
      + 'vedenalaiset tasangot, joilla kylmä Labradorin virta kohtaa '
      + 'lämpimän Golfvirran; sekoittuminen nostaa ravinteet pintaan '
      + 'ja synnyttää myös kaupungin kuuluisan sumun.'
      + '\n\n'
      + 'Kaupunki eli viisisataa vuotta turskasta. Vuonna 1992 '
      + 'pohjoisen turskan kanta oli pudonnut prosenttiin '
      + 'historiallisesta tasosta ja kalastus kiellettiin; Grand Banks '
      + 'pysyi suljettuna vuoteen 2024. Kaupunki tuhoutui myös '
      + 'suurpaloissa 1816, 1817, 1819, 1846 ja 1892, ja keskustan '
      + 'puutalot ovat viimeisen palon jälkeisiä. Marconi vastaanotti '
      + 'Signal Hillillä ensimmäisen langattoman viestin Atlantin yli '
      + '12. joulukuuta 1901.'
      + '\n\n'
      + 'Turskan jälkeen meri elättää kaupunkia toisin: Hibernian, '
      + 'Terra Novan ja White Rosen öljykentät ovat rannikon '
      + 'edustalla, ja St. John’sin alue vastaa noin puolta koko '
      + 'maakunnan taloudesta. Metropolialueella asui tammikuussa 2025 '
      + 'noin 239 300 ihmistä. Kaupunki on Kanadan suurista '
      + 'kaupungeista sumuisin ja tuulisin, ja maakunnalla on oma '
      + 'aikavyöhykkeensä, joka on puoli tuntia muuta Atlantin '
      + 'Kanadaa edellä.',
  },
  // IQALUIT (7.9.2026): faktat ovat samasta erästä kuin lehden tekstit
  // (js/packs/kulttuuri-kategoriat.js, avain iqaluit) ja tarkistettu
  // en-Wikipedian raakateksteistä 7.9.2026 ("Iqaluit", "Frobisher Bay",
  // "Nunavut"). Sisältölinjaus on spec-mantereet.md:n P-Amerikka-kohta:
  // arktinen arki ja inuiittikulttuuri asukkaiden silmin,
  // ilmastonmuutos neutraalina luonnontieteellisenä tosiasiana.
  Iqaluit: {
    intro: 'Iqaluit on Nunavutin pääkaupunki Baffininsaaren '
      + 'kaakkoiskulmassa, Frobisherinlahden pohjukassa. Se on Kanadan '
      + 'pohjoisin kaupunki ja väkiluvultaan sen pienin pääkaupunki: '
      + 'vuoden 2021 laskennassa asukkaita oli 7 429. Nimi on '
      + 'inuktitutia ja tarkoittaa **paikkaa, jossa on paljon kalaa** — '
      + 'inuiitit ja heidän edeltäjänsä ovat kalastaneet täällä '
      + 'tuhansia vuosia.'
      + '\n\n'
      + 'Kaupunkia ei silti ollut ennen vuotta 1942, jolloin '
      + 'Yhdysvallat rakensi rannalle lentotukikohdan ja paikka sai '
      + 'nimen Frobisher Bay. Tutkalinjan rakentaminen 1950-luvulla '
      + 'toi lisää väkeä, ja hallinto seurasi perässä. **1. tammikuuta '
      + '1987 nimi vaihdettiin takaisin Iqaluitiksi**, ja 1999 '
      + 'kaupungista tuli vastaperustetun Nunavutin pääkaupunki.'
      + '\n\n'
      + 'Iqaluit on ainoa Kanadan pääkaupunki, jota ei yhdistä muihin '
      + 'asutuksiin maantie: sinne pääsee lentäen ja jääolojen '
      + 'salliessa veneellä. Enemmistökieltä ei ole, ja kylteissä lukee '
      + 'sama asia englanniksi ja inuktitutin tavumerkein. Kaupungin '
      + 'edessä vuorovesi liikuttaa merta seitsemästä yhteentoista '
      + 'metriä vuorokaudessa.',
    teksti: 'Iqaluit on Everett Mountainsin rinteillä Koojesse Inletin '
      + 'pohjukassa, 63 astetta päiväntasaajasta pohjoiseen mutta '
      + 'selvästi napapiirin eteläpuolella. Kylmä merivirta pitää kesät '
      + 'viileinä, joten puuraja kulkee täällä poikkeuksellisen '
      + 'etelässä.'
      + '\n\n'
      + 'Eurooppalaisille lahti oli pitkään väärin ymmärretty. Martin '
      + 'Frobisher piti sitä 1576 Luoteisväylän salmena ja vei kotiin '
      + 'satoja tonneja kiveä, jonka luultiin olevan kultamalmia; se '
      + 'osoittautui arvottomaksi. Vasta 1861 amerikkalainen Charles '
      + 'Francis Hall totesi inuiittien avustuksella, että kyseessä on '
      + 'umpilahti.'
      + '\n\n'
      + 'Nykyään kaupunki on territorion hallinnon, koulutuksen ja '
      + 'lentoliikenteen keskus. Parlamenttitalossa hallitaan ilman '
      + 'puolueita konsensuksella, iglun muotoinen katedraali on '
      + 'kaupungin maamerkki, ja Sylvia Grinnellin puisto alkaa '
      + 'kilometrin päässä keskustasta. Ilmasto lämpenee mitattavasti: '
      + 'vuoden keskilämpötila oli 1979 −9,0 astetta ja 2023 −6,8.',
  },
};
