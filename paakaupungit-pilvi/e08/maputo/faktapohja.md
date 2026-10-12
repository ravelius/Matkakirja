# Maputo — rajattu A-lähdekooste ja C:n faktapohja

Luettu 12.10.2026. Omistus: vain e08/maputo. Tämä on nopean tekstityön lähdekooste, ei kokonaan hyväksytty A/B/D/E/F-paketti. Kaupunkikonteksti luettu tästä kloonista. Kuvat erillisessä putkessa; mitään kuvaa ei ole valittu.

## 0. Lähteet ja 1873-kehys

Kaikki onnistuneet verkkosivut on haettu yhteisellä `sallittu_haku.py`-apurilla: robots ensin, molemmat User-Agent-tarkistukset, uudelleenohjaukset erikseen ja yhteinen vähintään sekunnin hakuintervalli. HTML, tekstipoiminnat, hakutulos ja SHA-256 ovat NASilla `valiaikainen/nopea-e08-maputo/`. Verkkotunnusten robots-todisteet ja tämän haun rivit kopioidaan samaan hakemistoon. Sivujen alaosan tekijänoikeusteksti ei anna kuvalupaa; lähteitä käytetään vain omin sanoin kirjoitettuihin faktateksteihin.

| Tunnus | Lähde ja käytetty osio | Tallenne |
|---|---|---|
| M1 | [en-Wikipedia: Maputo](https://en.wikipedia.org/wiki/Maputo), alku, History, Geography, Administrative subdivisions, Infrastructure, Transport, Architecture, Parks | maputo.html/txt |
| M2 | [en-Wikivoyage: Maputo](https://en.wikivoyage.org/wiki/Maputo), Get in, Get around, See, Eat, Drink | opas.html/txt |
| M3 | [UM: Mosambik](https://um.fi/matkustustiedote/-/c/MZ), Turvallisuustaso, Liikenne, Terveys | um.html/txt |
| M4 | [en-Wikipedia: Maputo Railway Station](https://en.wikipedia.org/wiki/Maputo_Railway_Station), History, Architecture | asema.html/txt |
| M5 | [en-Wikipedia: Fort Nossa Senhora da Conceição de Lourenço Marques](https://en.wikipedia.org/wiki/Fort_Nossa_Senhora_da_Concei%C3%A7%C3%A3o_de_Louren%C3%A7o_Marques), alku, History | linnoitus.html/txt |
| M6 | [en-Wikipedia: Casa de Ferro](https://en.wikipedia.org/wiki/Casa_de_Ferro), alku, History, Architectural features | rautatalo.html/txt |
| M7 | [en-Wikipedia: Tunduru Gardens](https://en.wikipedia.org/wiki/Tunduru_Gardens), alku | puutarha.html/txt |
| M8 | [en-Wikipedia: Maputo central market](https://en.wikipedia.org/wiki/Maputo_central_market), History | tori.html/txt |
| M9 | [Maputo Port Development Company](https://www.portmaputo.com/), Terminals, About us | satama-virallinen.html/txt |
| M10 | [Polana Serena Hotel](https://www.serenahotels.com/polana), Welcome, Heritage | polana-virallinen.html/txt |

Ensimmäiset `Maputo_railway_station`- ja `Maputo_Fortress`-haut antoivat HTTP 404; niitä ei käytetä. Oikeat artikkelinimet otettiin M1:n linkeistä. Polanan sivun maantiede-/nimiselityksiä ei käytetä: sivu nimeää kaupungin Maputa-päällikön mukaan, M1 Maputo-joen mukaan. Tarkkaa nimeämisen syy-yhteyttä ei kirjoiteta.

**1873:** M1:n History kuvaa Lourenço Marquesin asutusta jo 1800-luvun puolivälissä ja linnakkeen yhteydessä; M5 kuvaa paikalla 1700-luvun lopulta alkanutta portugalilaista linnoitusta ja myöhempiä muutoksia. Siksi asutus ja linnoitus olivat olemassa isoisän matkavuonna. Nykyinen rautatieasema (M4: 1900-luvun alku), Tunduru (M7: 1800-luvun loppu), Casa de Ferro (M6: 1800-luvun loppu) ja nykyinen torihalli (M8: 1900-luvun alku) ovat myöhempiä. Ei väitetä nykyisen linnakkeen ulkoasun olleen sama 1873: M5 kertoo 1900-luvun kunnostuksesta. Ei isoisän käyntiä, reittiä, tekemisiä tai lainausta. Vuosi 1873 on pelin annettu aikakehys, ei paikallisen tapahtuman tarkka ajoitus.

## 1. Perusfaktat

- Mosambikin pääkaupunki maan eteläosassa, Maputonlahden länsirannalla, Intian valtameren yhteydessä (M1 alku/Geography).
- Satamakaupungin kauppa- ja raideyhteydet yhdistävät rannikon sisämaahan (M1 History/Transport, M4 alku, M9 terminaalit). Ei tonnimääriä, etäisyyksiä, vientiennusteita eikä superlatiiveja.
- Maputon kaupunki on oma maakuntatasoinen hallintoalue, erotettava ympäröivästä Maputon maakunnasta ja Matolan sisältävästä metropolialueesta (M1 Geography). KaTembe sijaitsee salmen toisella puolella; KaNyakan alueeseen kuuluu Inhaca (M1 hallintoaluetaulukko ja Geography).
- Vanha nimi Lourenço Marques; nykyinen nimi otettiin käyttöön itsenäistymisen jälkeen (M1 alku/Independence). Tarkka vuosi ja nimen etymologia pois C:stä.
- Nykykeskustassa leveitä katuja, ruutukortteleita, jakarandoja/akaasioita sekä erilaisia arkkitehtuurityylejä (M1 alku/Infrastructure/Architecture).
- Kontekstin väestö on **Cidade de Maputon hallintoalueen väestöprojektio**, ei metropolialueen tai Matolan luku. Kontekstin INE-lukua ei siirretä C:hen: tälle tarkalle luvulle ei hankittu toista riippumatonta lähdettä. Ei uusia väestö- eikä pinta-alaväitteitä.

## 2. Kannen neljä nostoa

| Nosto | Sallitut faktat ja lähteet |
|---|---|
| Satama, jolla on sisämaa | M1: satama, kauppa, Etelä-Afrikan raideyhteys; M4: ratajärjestelmän yhteydet Etelä-Afrikkaan, Eswatiniin ja Zimbabween; M9: erilliset sokeri-, vilja-, kontti- ja autoterminaalit. Vertaus satamasta rannikon ja sisämaan liitoskohtana on näiden faktakokonaisuus, ei väite tietyn maan viennin määristä. |
| Asema ilman Eiffeliä | M4: puu-/sinkkiasema edeltäjänä, nykyinen asema 1900-luvun alusta; Beaux-Arts, keskuskaari, kupariverhoiltu kupoli, verandat; kupolin suunnitteli José Ferreira da Costa, Eiffel-attribuutio väärä. Ei valmistumisvuotta eikä korkeutta. |
| Kaupunki on myös maakunta | M1: kaupunkiprovinssi erillään ympäröivästä maakunnasta; metropolialue sisältää Matolan; KaTembe ja KaNyaka hallintoaluetaulukossa. Ei suurin/pienin-vertailua, asukkaita tai osa-alueiden lukumäärää. |
| Leveiden katujen kaupunki | M1: suunniteltu keskusta, ruutukorttelit, leveät kadut; puut alkuosassa; historiallinen Baixa; neoklassismi, art deco ja modernismi. Ei samaa rakentajatarinaa kuin teemasivulla. |

## 3. Teemasivu: historia — Kaupunki koottiin monella tavalla

| Nosto | Sallitut faktat ja lähteet |
|---|---|
| Talo tuli osina Belgiasta | M6: esivalmistettu rautatalo Belgiasta, Societé Anonyme des Forges d'Aiseau ja Danlyn järjestelmä; tarkoitettu kuvernöörin asunnoksi, ei otettu asuinkäyttöön; myöhempiä laitoskäyttöjä; sisä-/ulkopaneelien väli ja ilmanvaihtoaukot. Ei lämpöä yksiselitteisenä hylkäyssyynä eikä Eiffel-tekijyyttä. |
| Torihalli päätti jäädä | M8: Carlos Mendes, sataman lähellä, suuri sisäänkäynti/tornike ja katettu halli; kaaria ja myyntisyvennyksiä; rakennuksen tarpeellisuutta ja keskeistä sijaintia kyseenalaistettiin 1900-luvulla; kunnostus alkoi 2000-luvulla. M2 See: kalan, äyriäisten, hedelmien, vihannesten ja kotitaloustavaroiden myynti. Tarkat vuodet/määrät pois. |
| Puutarhassa on myös tenniskentät | M7: julkinen keskusta-alueen puisto, brittiläinen puutarhuri Thomas Honney, 1800-luvun loppu, aiempi Jardim Vasco da Gama -nimi, Mosambikin tennisliiton kentät; M1 Parks: uusmanueliininen sisäänkäynti. Puutarhaa ei väitetä syntyneen tyhjälle/asumattomalle paikalle. |
| Linnake vaihtoi tehtävää | M5: Praça 25 de Junho, kivirakennus, neliöpiha, tilat pihan ympärillä; kauppapaikan puolustamisen vaihe, eri rakennusvaiheita, 1900-luvun kunnostus ja nykyinen sotahistorian museo. M1 History: asutus linnakkeen ympärillä jo ennen 1873. Patsaat eivät ole kohde-/kuvaehdokkaita. |

Minitehtävä: mikä urheilulaji on puutarhan kentillä? Vastaus tennis löytyy teemasivulta; ei toista viisikkoa. Faktarivi omin sanoin, ei sama virke kuin nostossa.

## 4. Opas: viisi jaksoa

1. **Perille ja liikkeelle:** Maputon kansainvälinen lentoasema, MPM (M2 Get in); taksin hinnasta sovitaan ennakkoon (M2 Get around); chapas ovat minibussiliikennettä, mutta käyttöä ei suositella turvallisuussyistä (M3 Liikenne). Ei reittejä, lento-ohjelmia, hintoja tai palvelusovelluksia.
2. **Baixan rakennuksia:** rautatieasema, Mercado Central, linnoitus ja Tunduru (M1, M2 See, M4–M8). Päiväsaikainen kävely, iltasiirtymä järjestetyllä kyydillä (M3). Ei nykyistä junayhteyttä myydä käytettävänä matkailureittinä.
3. **Rannasta Polanaan:** Avenida Julius Nyereren kävelyalue ja Polanan kaupunginosa (M2 See), Polana-hotelli 1900-luvun alusta ja rannikon äärellä (M10); rannat ja tuorekalatarjonta (M2 Eat). Ei uintiturvallisuusväitettä eikä tyhjän rannan kävelysuositusta (M3).
4. **Lounas meren äärellä:** kala ja äyriäiset, riisi, grillattu kana, bhajia-papupaistokset (M2 Eat); ei toisteta maalehden matapa-/xima-/curry-/cashew-tarinoita. Tarjonta voi vaihdella, ei ruokalistoja/hintoja.
5. **Milloin kannattaa tulla:** M1 Climate: lämpimämpi ja sateisempi kesä, kuivempi talvi, eteläinen pallonpuolisko; M3 Luonnonolot: sateiden vaikutus. Vain laadullinen kuvaus, ei kuukausi-, aste- tai sademäärälukuja eikä kauden superlatiivia.

Parasta: aseman arkkitehtuuri, Mercado Central, Tunduru, rautatalon rakennustapa, kala-/äyriäislounas. Tähtimäärät ovat toimituksellinen valinta, eivät lähteen arvosana. Hyvä tietää: järjestetyt siirtymät/pimeä, juomavesi pullosta (M3), portugali käytännön kielenä (M1, M2), Maputo ja maan pohjoisosat eri matkailualueita (M3). Ei pohjoisen konfliktien, nykyrikosten tai politiikan kertomusta. UM:n maantieteellinen matkustamisen välttämisohje ei koske koko Maputoa; lyhyt ohje välttää pimeällä liikkumista säilyy.

## 5. Kartta: partial, nolla hyväksyttyä kohdetta

C:n kohteet ovat tyhjä lista ja rajaus null, nähtävyysjutut tyhjä olio. Karttaporttia ei naamioida valmiiksi. Alla vain luetut **kohteiden omat** pisteet, ei C:hen hyväksyttyjä sijainteja:

| Paikka | Oma WP-piste | Portin avoin kohta |
|---|---|---|
| Maputon rautatieasema | −25.97110, 32.56450 (M4 Coordinates) | Kaikkien suunnittelijoiden/ornamentiikan tekijöiden kuolinajat eivät varmennettu; ei kohteeksi/kuvaksi. |
| Casa de Ferro | −25.97040, 32.57280 (M6 Coordinates) | Danlyn tekijäketjun kuolinajan tarkistus ja myöhempien muutosten rajaus puuttuvat. |
| Tundurun puutarha | −25.97160, 32.57390 (M7 Coordinates) | Honneyn tekijä-/kuolinauditointi ja kuvien suojattujen portti-/patsaselementtien rajaus puuttuvat. Ei rakennusta luontotyypin alle. |
| Maputon linnoitus | −25.97500, 32.57056 (M5 Coordinates) | 1900-luvun kunnostuksen tekijäketju ja kuvattavien elementtien rajaus puuttuvat; nykyinen ulkoasu ei sama asia kuin 1873. |
| Mercado Central | ei omaa WP/WD-pistettä varmennettu | Carlos Mendesin kuolinvuosi on M8:ssa, mutta oma paikkapiste puuttuu. Ei Wikivoyagen tai kaupungin pisteen lainaamista. |

Kuuden kohteen portti, paikkakohtaiset pitkät jutut ja karttarajaus jäävät myöhempään työhön. Ei suojattuja monumentteja/teoksia kohteina.

## 6. Viisi kysymystä ja kolme tietoa

- Intian valtameri (M1 Geography), taso 1.
- Oma maakuntatasoinen hallintoalue (M1 Geography), taso 2.
- Casa de Ferron Danly-järjestelmän kehittäjä Joseph Danly (M6 Architectural features), taso 3.
- Chapas = minibussit (M1 Buses, M2 Get around), taso 2.
- Aseman Beaux-Arts (M4 Architecture), taso 3.
- Tiedot: KaTembe salmen toisella puolella (M1); kuvernöörille tarkoitettu rautatalo ei tullut asuinkäyttöön (M6); linnoituksen puolustus- ja museoroolit (M5). Ei isoisän ääntä.

## 7. Kuvat odottavat erillistä kuvaputkea

18 tyhjää roolia: valokuva 1; kansi 3; nostot 8; matkailijalle pysty 1; oppaan jaksot 5. Jokaisella `tiedosto`, `lahde`, `lyhyt`, `selite` = tyhjä merkkijono. Ei Commons-hakua, ladattuja kuvia, esikatselua, generointia eikä keksittyä tiedostonimeä. Ei ennen–nyt-paria. Kuvatoimitus tarkistaa nimetyt rakennukset erikseen ennen kuva-aiheen hyväksyntää; kartan auditointitaulukko ei ole kuvauslupa. Satamalahden yleiskuva, leveät kadut ja aidosti hyväksytyt vanhat rakennukset ovat mahdollisia aiheita vasta oikeusauditoinnin jälkeen.

## 8. Epävarmuudet ja lukukuri

M1 antaa kaupungin perustamis-/kaupunkistatuksesta keskenään eri tarkkoja vuosia eri kohdissa. M5 ja M2 linnoituksen ajoituksesta eri tarkat vuodet. M1/M4 aseman eri rakennusvaiheiden vuosia ei niputeta yhdeksi. C käyttää 1700-luvun loppua, 1800-luvun loppua ja 1900-luvun alkua. Tarkkaa paikallista vuosilukua, henkilöiden ikää, matkaa, korkeutta, väestöä tai pinta-alaa ei viedä C:hen. Koordinaatit ovat annetun kaupunkikontekstin palloarvoja; muita koordinaatteja C:ssä ei ole. M10 ei itsenäisenä lisälähteenä riitä nimeämisen syy-yhteyteen. Rautatalon kuumuuslegendaa ei kirjoiteta varmana syynä.

Sääpoiminta on tehty toisessa työssä, mutta koko joukon 48/48 primäärivarmennusta ei ole tässä todistettu. `saatiedot: null`, `saa.json` jätetty koskematta, sääauditointi avoin. Historiasta ei päätellä matkaajan kokemia näkymiä.

## 9. Poisjätöt ja seuraavat portit

Kontekstin Mosambikin maalehti kattaa matapan, ximan, curryn, cashew'n, makonde-veiston, Malangatanan, aseista tehdyn valtaistuimen sekä musiikkiaiheita. Näistä ei tehdä uusia nostoja. Kansi ei toista valmiin kevyen kuvauksen nimeämistarinaa omana nostonaan. Pancho Guedesin modernit teokset ja monumentit eivät ole kartta-/kuvakohteita. Nykypolitiikka, sota, rikollisuuden kertomus, tilastoennusteet ja yleiset matkaopastäytteet pois. Riippumaton D/E/F, kuva-/kartta-/sääportit, hyväksyntä, kytkentä ja julkaisu ovat tekemättä.
