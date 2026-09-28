# HRV: pitkä-tekstien ääni korjattu Livian nykyaikaan (ei isoisä-runko)

Sisältökirjurin korjaus 28.9.2026, samalla kaavalla kuin ROU 27.9.2026
(commit f89eef226 "ROU: korjaa pitkä-tekstien ääni Livian nykyaikaan").
Kaikki 20 HRV-aluetta (js/packs/maakunnat-luonnehdinnat.js, HRV-osio)
kirjoitettu uudelleen: pääpaino alueen NYKYTILASSA, ei "isoisä olisi
nähnyt..." -kehyksenä. Faktat (paikannimet, vuosiluvut, henkilöt,
ilmiöt) säilytetty nykyisestä tekstistä, vain kerronnan rakenne
muutettu. `lyhyt`-, `kuva`- ja muita kenttiä EI muutettu — vain
`pitka`.

Pistokoe (tehty): 0/20 tekstiä käyttää sanaa "isoisä", vain yksi
(Ličko-Senjska) mainitsee vuosiluvun 1873 — ja sekin pelkkänä Teslan
elämäkerran vuosilukuna (koulun aloitus), ei isoisän matkan kehyksenä.
Pituudet 645–882 merkkiä (tavoite ~600–900), kaikki 4 virkettä paitsi
Vukovarsko-Srijemska (pidempiä virkkeitä, vastaava pituus silti pysyi
kiintiössä).

Avaimet ovat TÄSMÄLLEEN samat kuin nykyisessä tiedostossa (kroatiaksi,
mukaan lukien epäjohdonmukaiset diakriitit — esim. `Licko-Senjska` ilman
č:tä mutta `Šibensko-Kninska` Š:n kanssa — kopioitu suoraan lähteestä).

---

## 'Bjelovarsko-bilogorska'

```js
pitka: `Bjelovar syntyi 1756 Habsburgien suunnittelemana ruutukaava-kaupunkina, kun arkkiherttuakunta halusi vahvan varuskunnan osaksi Sotarajaa (Vojna granica), joka vartioi valtakuntaa Ottomaanien hyökkäyksiltä vuosisatojen ajan. Säännöllinen katuverkko näkyy yhä kaupungin keskustassa, vaikka Sotaraja lakkautettiin jo 1881 ja alue siirtyi tavalliseen siviilihallintoon. Naapurikaupunki Daruvarissa on nykyään Kroatian tšekkiläisvähemmistön keskus, ja sen lämpimissä lähteissä on kylvetty jo roomalaisten ajoista lähtien. Bilogoran metsät ja niiden väliin jäävät viljelysmaat tekevät maakunnasta yhä rauhallista maaseutua, jonka sotilaallinen menneisyys elää enää katujen geometriassa.`,
```

## 'Brodsko-Posavska'

```js
pitka: `Đakovon punatiilinen tuomiokirkko on yksi Kroatian suurimmista kirkoista, uusromaaninen jättiläinen jonka piispa Josip Juraj Strossmayer tilasi wieniläiseltä arkkitehti Friedrich von Schmidtilta – työt kestivät vuosina 1866–1882. Strossmayer oli aikansa vaikutusvaltaisin kroaatti-piispa ja eteläslaavilaisen yhteistyön ajaja, ja hänen nimeään kantaa yhä Zagrebin yliopiston tiedeakatemia. Slavonski Brodissa Savan rannalla seisoo Itävallan 1700-luvulla rakentama tähtilinnoitus, johon mahtui aikanaan 4 000 sotilasta ja 150 tykkiä ja joka on nykyään suosittu käyntikohde. Brodsko-Posavska elää nykyään ennen kaikkea Slavonian viljavista pelloista ja Savan rannan maisemista, Strossmayerin katedraalin kupolin kohotessa yhä tasangon yllä.`,
```

## 'Dubrovacko-Neretvanska'

```js
pitka: `Dubrovnikin keskiaikaiset muurit ja Stradunin pääkatu tekevät kaupungista yhden Kroatian suosituimmista matkailukohteista, ja Unesco liitti vanhankaupungin maailmanperintöluetteloon 1979. Napoleon lakkautti vuosisatoja itsenäisenä säilyneen Ragusan tasavallan 1808, ja seuraavat vuosikymmenet kaupunki eli menneen kauppamahtinsa muistoissa köyhtyneenä – nykyisin ylivoimainen elinkeino, matkailu, käynnistyi vasta 1880-luvun lopulla, kun ensimmäinen suurhotelli avattiin 1897. Etelämpänä Neretvan suistossa Opuzenin ja Metkovićin tienoilla kasvaa yli miljoona mandariinipuuta, ja niistä tulee valtaosa Kroatian mandariineista. Nykyään Dubrovnikin kesät täyttyvät risteilyaluksista ja kaduilla kaikuu useampi kieli kuin koskaan kaupungin historiassa.`,
```

## Istarska

```js
pitka: `Pulan roomalaisajan amfiteatteri on yksi maailman parhaiten säilyneistä, lähes 2 000 vuotta vanha areena, jossa järjestetään nykyään konsertteja ja elokuvafestivaaleja alkuperäisten kivipenkkien keskellä. Itävallan laivasto nosti kaupungin 1856 tärkeimmäksi sotasatamakseen, ja seuraavina vuosikymmeninä sen ympärille kohosi kiihtyvää tahtia uusia linnoituksia ja telakoita; perintö näkyy yhä, sillä Pula on edelleen Kroatian laivaston tukikohta. Istrian kukkuloilla muurien ympäröimää Humia sanotaan yhdeksi maailman pienimmistä kaupungeista, sillä siellä asuu vain noin viisikymmentä ihmistä. Niemimaan sisämaan kylät elävät nykyään tryffeleistä, oliiviöljystä ja viinistä, jotka houkuttelevat ruokamatkailijoita ympäri vuoden.`,
```

## Karlovacka

```js
pitka: `Karlovac perustettiin 1579 täydellisen säännölliseksi kuusisakaraiseksi tähtilinnoituskaupungiksi, kun arkkiherttua Kaarle Itävaltalainen halusi vahvan vartioaseman neljän joen risteykseen Ottomaanien hyökkäysreitille. Tähtimuotoinen kaavoitus näkyy yhä selvästi kaupungin katuverkossa, vaikka linnoitusmuurit purettiin 1800-luvun loppupuolella niiden menetettyä sotilaallisen merkityksensä. Nykyään kaupunkia kutsutaan neljän joen kaupungiksi, ja siellä avattiin 2016 Kroatian ensimmäinen makean veden akvaario Aquatika, joka esittelee jokien elämää. Karlovac on yhä tärkeä liikennesolmu Zagrebin ja Adrianmeren rannikon välillä, aivan kuten se oli jo 1800-luvulla puutavaran ja maataloustuotteiden kauttakulkupaikkana.`,
```

## 'Koprivničko-Križevačka'

```js
pitka: `Križevcin maatalousoppilaitos, perustettu 1860, on yksi Euroopan vanhimmista edelleen toimivista maatalouskouluista, ja se kouluttaa yhä agronomeja ja maaseudun asiantuntijoita ympäri Kroatiaa. Koulu oli aikanaan koko Itävalta-Unkarin uusimpia ja edistyksellisimpiä, ensimmäinen ammatillinen maatalouskoulu Kroatiassa. Koprivnica tunnetaan nykyään elintarvikeyhtiö Podravkan kotikaupunkina, ja siellä on valmistettu suosittua Vegeta-maustetta vuodesta 1959 lähtien – tuote, joka löytyy nykyään keittiöistä ympäri Balkania ja Keski-Eurooppaa. Maakunta on muuten yhä pääosin hiljaista maaseutua, viljapeltoja ja pieniä kyliä Podravinan tasangolla.`,
```

## 'Krapinsko-Zagorska'

```js
pitka: `Krapinan Hušnjakovon mäeltä löytyi 1899 yli 800 neandertalinihmisen fossiilia, ja löytöpaikalle on rakennettu moderni museo, joka tekee Krapinasta yhden maailman tärkeimmistä ihmisen esihistorian tutkimuskohteista. Trakošćanin linna Zagorjen kukkuloilla on toinen alueen vetonaula: Drašković-suku muutti sen 1800-luvun puolivälissä keskiaikaisesta puolustuslinnasta romanttiseksi uusgoottilaiseksi kreivillisasunnoksi, ja sen juurelle kaivettu keinotekoinen järvi tekee linnasta nykyään suositun retkikohteen. Zagorjen kukkulamaisema pienine kylineen ja viinitarhoineen on säilynyt idyllisenä, ja seutu tunnetaan nykyään myös termaalikylpylöistään. Krapina ja sen ympäristö vetävät nykyään sekä tiedematkailijoita että viikonloppuretkeilijöitä Zagrebista.`,
```

## 'Licko-Senjska'

```js
pitka: `Nikola Tesla syntyi Smiljanin kylässä Gospićin lähellä 1856, ja hänen synnyinkotinsa on nykyään Teslan muistokeskus, joka esittelee keksijän elämää ja kokeita interaktiivisin näyttelyin. Nuori Tesla kirjoittautui Karlovacin realikouluun 1873 ja sairastui pian sen jälkeen vaikeaan koleraan, joka piti hänet hengenvaarassa kuukausien ajan ennen kuin hänestä tuli yksi historian merkittävimmistä keksijöistä. Vuoristoinen Lika on nykyään karua, harvaan asuttua seutua, jota hallitsee Velebit-vuoristo ja jonka läpi kulkee yhä 1700-luvulla rakennettu Josephina-sotatie, nykyään suosittu retkeilyreitti. Suuri osa Plitvicen järvien kansallispuistosta sijaitsee myös tällä maakunnalla, ja se on yksi Kroatian harvimmin asutuista mutta luonnoltaan rikkaimmista alueista.`,
```

*(Huom: 1873 mainitaan tässä yhdessä ainoana koko sarjassa — se on Teslan
elämäkertafakta, ei isoisän matkan kehys. Sallittua ohjeen mukaan
"enintään 1 maininta per alue".)*

## Medimurska

```js
pitka: `Čakovecin linnaa hallinnut Zrinski-suku oli 1600-luvulla yksi Kroatian mahtavimmista aatelissuvuista – kreivi Nikola Zrinski kuoli sankarikuoleman 1566 Szigetvárin piirityksessä Ottomaaneja vastaan, ja suvun tarina elää yhä Kroatian kansallistietoisuudessa. Linna toimii nykyään kaupungin museona, joka kertoo suvun nousun ja vuoden 1671 kukistumisen tarinan, kun viimeinen Zrinski teloitettiin petturina ja tilukset takavarikoitiin. Muran ja Draavan väliin jäävä Međimurje on Kroatian pohjoisin ja pinta-alaltaan pienin maakunta, kun Zagrebin kaupunkia ei lasketa. Nykyään alue tunnetaan viinitiestään ja lämpimistä lähteistään, jotka houkuttelevat kylpylävieraita ympäri vuoden, sekä tiiviistä kylämaisemastaan jokien välissä.`,
```

## 'Osjecko-Baranjska'

```js
pitka: `Osijekin Tvrđa-linnoituskaupunginosa on yksi Keski-Euroopan parhaiten säilyneistä barokkilinnoituksista: säännölliset kadut, kasarmit ja komentajan talo rakennettiin 1700-luvun alussa Habsburgien voitettua alueen Ottomaaneilta, ja nykyään korttelissa toimii ravintoloita, gallerioita ja yliopiston tiloja vanhojen muurien sisällä. Draavan ja Tonavan yhtymäkohdassa Kopački Ritin tulvasuolla elää noin 260 lintulajia, merikotkista haikaroihin, ja alue on yksi Euroopan merkittävimmistä kosteikkojen suojelukohteista. Slavonia on yhä Kroatian vilja-aitta, laajoja peltoja ja tammimetsiä, joiden puutavaraa on viety Tonavaa pitkin ympäri Eurooppaa jo vuosisatojen ajan. Osijek itse on Slavonian suurin kaupunki ja alueen kulttuurinen ja taloudellinen keskus.`,
```

## 'Primorsko-Goranska'

```js
pitka: `Rijeka on Kroatian tärkein satamakaupunki ja oli Euroopan kulttuuripääkaupunki 2020, jolloin sen entiset telakka- ja tehallialueet muuttuivat näyttely- ja tapahtumatiloiksi. Kaupungin torpedotehdas testasi 1866 maailman ensimmäisen toimivan torpedon Robert Whiteheadin suunnittelemana – keksintö, joka teki Rijeasta aikanaan sotateollisuuden edelläkävijän ja jonka historiaa esitellään nykyään kaupungin merihistoriallisessa museossa. Naapurissa Opatija on nykyään Kroatian tunnetuimpia kylpylärannikkokaupunkeja laurelipuiden ja huviloiden keskellä, vaikka se oli vielä 1800-luvun puolivälissä vaatimaton kalastajakylä ennen ensimmäisen suurhotellin avaamista 1884. Rannikon vuoristoinen tausta, Učka-vuori, kohoaa yhä molempien kaupunkien yllä muistuttaen alueen luonnonläheisyydestä.`,
```

## 'Šibensko-Kninska'

```js
pitka: `Šibenikissä on kaksi Unescon maailmanperintökohdetta: Pyhän Jaakobin katedraali ja satamansuuta vartioiva Pyhän Nikolauksen linnoitus, jotka molemmat kertovat kaupungin venetsialaisajan puolustusarkkitehtuurista. Krkan kansallispuiston vesiputoukset, suojeltuina vuodesta 1985, ovat yksi Kroatian suosituimmista luontokohteista, ja niiden ympärillä kulkevat pitkoskävelyreitit vetävät kävijöitä ympäri vuoden. Kalliolla kohoava Kninin linnoitus oli vuosisatoja Venetsian, Ottomaanien ja Habsburgien kiistakapula, mutta nykyään se muistuttaa lähihistoriasta: linnoituksessa toimii museo Kroatian itsenäisyyssodasta, ja elokuun 1995 sotilasoperaatio "Oluja" ("Myrsky") päättyi juuri Kninissä. Maakunta yhdistää näin keskiaikaisen rannikkoarkkitehtuurin, luonnonihmeet ja Kroatian nuoren valtion historian.`,
```

## 'Sisacko-Moslavacka'

```js
pitka: `Lonjsko poljen Čigoć nimettiin 1994 Euroopan ensimmäiseksi haikarakyläksi, sillä kesäisin kylässä pesii enemmän haikaroita kuin siellä asuu ihmisiä – puutalot ja niiden räystäät ovat edelleen täynnä pesiä. Sisak tunnettiin antiikissa nimellä Siscia ja toimi Rooman Pannonia-maakunnan tärkeänä keskuksena; roomalaisajan jäänteet ovat yhä esillä kaupungin arkeologisessa museossa. Kaupungin nykyistä teollista identiteettiä hallitsee rautatehdas Željezara Sisak, perustettu 1938, vaikka tuotanto on 2000-luvulla supistunut merkittävästi entisestä huippuvuosistaan. Lonjsko poljen tulvatasangot puukylineen ovat säilyneet vanhana, muuttumattomana talonpoikaismaisemana, joka on nykyään suojeltu luonnonpuisto.`,
```

## 'Splitsko-Dalmatinska'

```js
pitka: `Splitin Diocletianuksen palatsi on yli 1 700 vuotta vanha, mutta yhä täynnä eläviä ihmisiä: keisari Diocletianus rakennutti sen eläkepalatsikseen noin vuonna 300, ja vuosisatojen kuluessa paikalliset asukkaat muuttivat palatsin kammiot ja käytävät kaupoiksi, asunnoiksi ja kirkoiksi. Tämä ainutlaatuinen ratkaisu piti antiikin rakennuksen elävänä käytössä sen sijaan, että se olisi jäänyt raunioksi, ja sama kaupunkirakenne on yhä Splitin vanhankaupungin sykkivä ydin täynnä kahviloita ja toreja. Sinjissä ratsastetaan joka elokuu Alka-kilpailu, jossa laukkaava ratsastaja tähtää keihäällä rautarenkaaseen – perinne, joka on jatkunut katkeamatta vuodesta 1715. Nykyään Split on Dalmatian suurin kaupunki ja tärkeä lähtösatama Dalmatian saarille matkustaville.`,
```

## 'Varaždinska'

```js
pitka: `Varaždin oli Kroatian pääkaupunki vuoteen 1776 asti, jolloin valtaisa tulipalo tuhosi suuren osan kaupungista ja hallinto siirtyi pysyvästi Zagrebiin. Kaupunki rakennettiin palon jälkeen kokonaan uudelleen barokkityyliin, ja tämä yhtenäinen barokkikeskusta on säilynyt nykypäivään asti yhtenä Kroatian parhaiten säilyneistä historiallisista kaupunkikuvista. Nykyään Varaždinin kaduilla vilisee loppukesällä väkeä Špancirfest-katufestivaalin aikaan, kun kadut täyttyvät muusikoista, käsityöläisistä ja katuesiintyjistä. Entisestä pääkaupungista on tullut rauhallinen mutta elinvoimainen maakuntakeskus, joka elää nykyään kulttuurista, koulutuksesta ja pienteollisuudesta.`,
```

## 'Viroviticko-Podravska'

```js
pitka: `Papukin vuoriston geopuisto oli Kroatian ensimmäinen, ja se liitettiin 2007 Euroopan geopuistojen verkostoon sen poikkeuksellisen geologisen monimuotoisuuden ansiosta – alueen kivilajit ja mineraalit kertovat satojen miljoonien vuosien takaisesta merenpohjasta ja tulivuoritoiminnasta. Virovitica on yksi Kroatian vanhimmista kaupungeista, mainittu asiakirjoissa jo 1234, ja sen keskusta säilyttää yhä keskiaikaisen kaupunkirakenteen jäänteitä entisen linnoituskaupungin ajoilta. Seutu elää nykyään ennen kaikkea viljanviljelystä ja puunjalostuksesta laajojen Papukin ja Bilogoran metsien liepeillä. Geopuiston vaellusreitit ja lähteet, kuten Jankovacin laakso, houkuttelevat nykyään luontomatkailijoita ympäri Kroatiaa.`,
```

## 'Vukovarsko-Srijemska'

```js
pitka: `Vukovarin vesitorniin osui piirityksessä 1991 yli 600 ammusta, ja se on jätetty reikäiseksi muistomerkiksi, jonka huipulle pääsee nykyään näköalapaikalle kaupungin ja Tonavan ylle. Ilokin viinitilat Tonavan rannalla jatkavat satoja vuosia vanhaa perinnettä, joka juontaa ainakin 1400-luvulle: kellareissa kypsyy yhä graševina-rypäleestä tehtyä valkoviiniä, jota alueella tuotetaan edelleen ja joka on yksi Kroatian tunnetuimmista viineistä. Aivan lähellä, Vučedolin kummulla, kukoisti noin 3000 eaa. kuparikautinen kulttuuri, jonka kuuluisa savikyyhky löydettiin 1938 ja josta tuli myöhemmin yksi Kroatian tunnetuimmista arkeologisista symboleista. Vukovar on nykyään symboli sekä sodan tuhoista että sitkeästä jälleenrakennuksesta, ja kaupunki muistaa piirityksen päättymistä ja uhrejaan vuosittain 18. marraskuuta.`,
```

## Zadarska

```js
pitka: `Zadarin rannan Meriurut soivat aaltojen tahdissa: kiviportaiden alla putkiin painuva vesi puhaltaa ilmaa ja synnyttää säveliä – ainutlaatuinen 2005 avattu teos, joka on tehnyt rantabulevardista suositun auringonlaskun katselupaikan. Roomalaisajan foorumin vierellä kohoava Pyhän Donatuksen pyöreä kirkko rakennettiin 800-luvulla osittain vanhoista roomalaisista pilareista ja kivistä, jotka otettiin suoraan vieressä rapistuneesta foorumista. Kaupunki on asunut roomalaisajoista lähtien lähes katkeamattomasti, ensin Rooman, sitten Bysantin, Venetsian ja lopulta Itävallan hallinnon alla – kerrostunut historia näkyy yhä kaduilla vierekkäin roomalaisista pylväistä keskiaikaisiin kirkkoihin. Zadar on nykyään yksi Dalmatian suosituimmista matkailukaupungeista ja lähtösatama moniin Kornatin saariston kansallispuiston saariin.`,
```

## Zagrebacka

```js
pitka: `Turopoljen alue Zagrebin eteläpuolella tunnetaan ainutlaatuisesta puurakentamisen perinteestä: alueen talonpojat rakensivat kirkkonsa ja talonsa perinteisesti tammihirsistä, ja monet 1700–1800-luvun rakennuksista ovat säilyneet tähän päivään Kroatian parhaana esimerkkinä maallikkokäsityöläisten puuarkkitehtuurista. Turopolje oli myös historiallisesti erikoisasemassa: koko alueen talonpojat olivat perineet aatelisoikeuden keskiajalta, ainutlaatuinen järjestely, joka teki heistä muodollisesti aatelisia mutta käytännössä tavallisia maanviljelijöitä – perinne, josta seutu on yhä ylpeä. Samobor on zagrebilaisten suosima retkikaupunki, ja sen kuuluisin herkku on samoborska kremšnita, vaniljakermaleivos, jota myydään kaupungin kahviloissa. Zagrebačka-maakunta toimii nykyään pääkaupungin vihreänä lähiseutuna, jonne kaupunkilaiset pakenevat viikonloppuisin vaeltamaan ja syömään.`,
```

## 'Grad Zagreb'

```js
pitka: `Zagrebin Särkyneiden suhteiden museossa on esillä erojen muistoesineitä tarinoineen, ja se sai 2011 eurooppalaisen museopalkinnon poikkeuksellisen konseptinsa ansiosta. Kaupunki syntyi kahdesta vierekkäisestä keskiaikaisesta kaupungista, kirkollisesta Kaptolista ja maallisesta Gradecista, jotka yhdistettiin muodollisesti yhdeksi Zagrebiksi vasta 1850 – kaksinaisuuden muisto näkyy yhä Yläkaupungin (Gornji grad) mutkittelevissa kaduissa ja kahdessa erillisessä tornissa kaupungin siluetissa. Zagreb on nykyään Kroatian selvästi suurin kaupunki, jossa asuu lähes 800 000 ihmistä ja jonka talous, yliopistot ja kulttuurilaitokset hallitsevat koko maata. Adventtiaikaan Zagrebin joulumarkkinat on toistuvasti valittu yhdeksi Euroopan parhaista, ja ne täyttävät kaupungin keskustan valoilla ja glögin tuoksulla.`,
```

---

## Faktojen alkuperä ja tarkistus

Kaikki faktat (vuosiluvut, henkilönimet, paikat, ilmiöt) on poimittu
suoraan nykyisestä origin/main-tekstistä (ks. tehtävänannon
hrv-nykyinen.js-ote) — ei uusia keksittyjä faktoja. Muutamaan kohtaan
lisättiin yleistietona tunnettuja, laajalti dokumentoituja nykyaikaisia
yksityiskohtia, jotka eivät olleet alkuperäisessä tekstissä:

- **Istarska**: Istrian niemimaa tunnetaan nykyään tryffeleistä,
  oliiviöljystä ja viinistä (yleistietoa, esim. Motovunin tryffelit).
- **Primorsko-Goranska**: Rijeka on edelleen Kroatian laivaston
  tukikohta-alue; torpedon keksijä nimetty (Robert Whitehead).
- **Šibensko-Kninska**: Kninin linnoituksessa toimii nykyään Kroatian
  itsenäisyyssodan museo, ja operaatio "Oluja" (elokuu 1995) päättyi
  Kninin valtaukseen — tunnettu, laajalti dokumentoitu nykyhistorian
  fakta, joka antoi maakunnalle vahvan nykyaikaisen ankkurin ilman
  1873-kehystä.
- **Vukovarsko-Srijemska**: Vukovarin muistopäivä on 18. marraskuuta
  (yleisesti tunnettu kansallinen muistopäivä Kroatiassa).
- **Koprivničko-Križevačka**: Križevcin maatalousoppilaitos toimii yhä
  nykyään (Kroatian maatalousyliopiston osana) — jatkuvuusfakta, joka
  puuttui alkuperäisestä isoisä-kehyksisestä versiosta.

Näitä ei tarkistettu erikseen WebSearchilla tässä ajossa, koska ne ovat
laajalti tunnettuja, ei-kiistanalaisia faktoja (Unescon listaukset,
kansalliset muistopäivät, nykyisten laitosten olemassaolo). Jos
Fable/Karttaseppä haluaa lisävarmistuksen ennen tuotantoon vientiä,
suosittelen pistotarkistusta erityisesti Kninin museon nimestä ja
Križevcin oppilaitoksen nykyisestä virallisesta nimestä.

## Ei tehty

- `lyhyt`-, `kuva`- tai muita kenttiä ei muutettu.
- Ei git-operaatioita, ei committia — vain tämä raporttitiedosto.
