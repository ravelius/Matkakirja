# Funafuti — rajattu A-lähdekooste, 12.10.2026

Tila: rajattu A ja sen pohjalta kirjoitettava C. Omistus e14/funafuti, tehtävä 25. Väliaineisto `valiaikainen/nopea-e14-funafuti/` NASilla. Tämä ei täytä täyden A/B/D/E/F:n portteja.

## 0. Lähteet

Kaikki alla olevat sivut luettu 12.10.2026 tavallisina robots-sallittuina HTTPS-sivuina `sallittu_haku.py`:llä (Claude-User + Matkakirja-agentti, redirect-tarkistus, yhteinen lukko ja vähintään sekunnin hakuväli). HTML/TXT, URL/SHA manifestissa ja tarkistuslokeissa omassa väliaineistossa. Ei API-, PDF- tai kuvahakuja.

- **F1** en-Wikipedia, [Funafuti](https://en.wikipedia.org/wiki/Funafuti), johdanto, History, Darwin's Drill, Geography/Lagoon/Landmarks, Transportation. `funafuti.html`.
- **F2** en-Wikivoyage, [Tuvalu](https://en.wikivoyage.org/wiki/Tuvalu), By plane, Get around, See, Eat, Stay safe. `tuvalu-wikivoyage.html`. Ei hintoja, vuoromääriä, vanhoja hotellilistoja, viisumeita tai turvallisuussuperlatiiveja.
- **F3** en-Wikipedia, [Funafuti Conservation Area](https://en.wikipedia.org/wiki/Funafuti_Conservation_Area), johdanto, Land and marine environment, Access to the Kogatapu. `conservation.html`.
- **F4** en-Wikipedia, [Tuvalu National Library and Archives](https://en.wikipedia.org/wiki/Tuvalu_National_Library_and_Archives), Role and facilities, kirjaston perustamisen historia. `library.html`.
- **F5** en-Wikipedia, [Tuvalu Philatelic Bureau](https://en.wikipedia.org/wiki/Tuvalu_Philatelic_Bureau), johdanto ja Newsletter. `philatelic.html`.
- **F6** IUGS International Commission on Geoheritage, [Funafuti Atoll](https://iugs-geoheritage.org/geoheritage_sites/funafuti-atoll-tuvalu/), johdanto, Geological description, Scientific research and tradition. Asiantuntijakirjoittajina Tuvalun Lands and Survey Department, SPC ja geotieteilijät. `iugs.html`.
- **F7** Royal Society, arkistonhoitaja Jon Bushell, [Boring old coral](https://www.royalsociety.org/blog/2024/09/boring-old-coral/), julkaistu 10.9.2024: arkistopöytäkirjoihin ja porausraporttiin perustuva historia. `royalsociety.html`.
- **F8** Tuvalun valtion matkailusivusto, [Timeless Tuvalu](https://www.timelesstuvalu.com/), Funafuti, Things to Do -paikkalista: kirjasto, postimerkkitoimisto, käsityökeskus, marine conservation. `tourism.html`. Vierailijaarvosteluja tai mainostekstin superlatiiveja ei käytetä.

- **F9** Tuvalun Tourism Department Portal, [Funafuti Marine Conservation](https://tourism.gov.tv/funafuti-marine-conservation-2/), Information. `marine-tourism.html`. Sisältö on läheistä F3:n tekstille: tätä ei lasketa riippumattomaksi toiseksi lähteeksi tarkkojen lukujen varmentamiseen. Ympäristötyypit ja pesimäpaikat vastaavat F3:a.

## 1. Perustiedot, nimet ja väestöalue

Funafuti on kokonainen atolli ja Tuvalun pääkaupunki. Fongafale on sen pääsaari; Vaiaku on tällä saarella sijaitseva hallintopaikka (F1 johdanto ja pääkaupunkiaseman tarkennus; F8). Te Namo on laguunin nimi (F1 Lagoon). Kokonaisuudet erotetaan teksteissä, eikä saaren tai kylän nimeä käytetä koko atollin synonyyminä.

Oman `konteksti.json`:n pallo lat −8.5048, lon 179.1174 ja wiki Funafuti säilytetään kaupunkirivillä. Tätä pistettä ei lainata kohteille. Kontekstin 6 602 / 2022 on atollin väestö, ei Vaiakun kylän tai Fongafalen saaren. Luku jää C:stä pois ilman kahta riippumatonta laajuus- ja vuosivarmennusta. F1:n johdannon ja infolaatikon väestövuosissa sekä maa-alaluvuissa on eri aineistoja.

## 2. Historia ja 1873

F1 History osoittaa Funafutin asutun ja käyneen kauppaa 1800-luvulla. C ei kuvaa asutuksen alkuperää eurooppalaisen laivan käyntinä. Tarkkoja vierailu-, kauppias- tai väestövuosia ei siirretä.

Isoisän matkavuonna 1873 myöhempi Royal Societyn poraushanke ei ollut vielä alkanut: F6 ja F7 sijoittavat hankkeen 1800-luvun loppuun (molemmissa 1896–1898; Royal Societyn arkistot kertovat myös valmisteluvaiheen). C kertoo tästä vain vuosisatatasolla ja käyttää 1873:a kaanonin matkavuotena. Ei isoisän tekemisiä, reittiä tai puhetta. Nykyisten kirjaston/virastojen tai muiden kohteiden rakennusten olemassaoloa 1873 ei väitetä.

## 3. Kansisivun aiheiden väitteet

- **Atolli, saari ja kylä:** pääkaupungin koko atollin laajuus, Fongafale, Vaiaku, Te Namo, atollin muu saaristo. F1 johdanto/Geography/Lagoon, F8. Ei tarkkoja saarten määriä, pinta-aloja tai leveyksiä.
- **Ystävyyden käsi:** Tausoa Lima Falekaupule perinteinen kokoushalli; Tausoalima = hand of friendship, falekaupule = traditional island meeting hall. F1 Landmarks. Samalla Fongafalella on hallintovirastoja ja parlamentti (F1). Ei rakennuksen vuosia, arkkitehtia tai pääsylupausta.
- **Kirjat ja arkistot saman katon alla:** kansalliskirjasto ja arkisto Funafutissa; siirtomaahallinnon ja Tuvalun hallinnon dokumentteja; kirjaston perustamisen yhteydessä myös kirkon julkaisuja; British Libraryn ja ANU:n digitointi/mikrofilmaus. F4 Role and facilities sekä kirjaston historia. Ei työn valmistumisväitettä tai tarkkaa aloitusvuotta.
- **Postimerkki kulkee kokoelmaan:** Funafutissa toimiva filateelinen toimisto julkaisee uusia postimerkkejä ja ensipäiväkuoria keräilijöille; tiedotuslehti alun perin News and Views, myöhemmin Tuvalu Philatelic Bureau Newsletter; tiedot uusista merkeistä ja Tuvalu-aiheiset artikkelit. F5 johdanto/Newsletter. Paikka myös F8 ja F2 See. Ei nykyisiä hintoja, tuloja tai julkaisurytmiä.

## 4. Teemasivu — Atolli tutkittavana, id tiede

- **Teoria vajonneesta saaresta:** Darwinin selitys tuliperäisen saaren vajoamisesta ja riutan kasvamisesta ylöspäin; Funafutin poraukset etsivät matalan veden eliöiden jälkiä syvistä korallikerrostumista. F6 Geological description, F7 teoriaa koskevat kappaleet, F1 Darwin's Drill.
- **Pora vastaan korallikivi:** timanttipora sopi tiiviiseen kovaan kiveen, mutta onkalot siirsivät poraa ja hiekka täytti reikää; uusissa yrityksissä parempi kalusto ja reiän vuoraus. F7 porausyritysten kuvaus. Ei syvyyksiä, rahasummia tai vuosia.
- **Varaosa saarelta:** ratas rikkoutui porauksessa; paikallinen asukas oli säilyttänyt aiemman retkikunnan jättämän varaosan. F7 sanoo sen auttaneen jatkamaan koetta. Asukkaan nimeä, motiivia tai tarkkaa säilytyspaikkaa ei keksitä. IUGS:n paikallinen nimi Te Vili O Tavita / David's Drill F6:ssa; viittaa tutkimusjohtaja Edgeworth Davidiin. Ei väitetä Darwinin poranneen henkilökohtaisesti.
- **Mereen kuuluu kuivaakin maata:** länsipuolen suojelualue sisältää riuttaa, laguunia, merikanavia ja motu-saaria; merikilpikonnat pesivät saarilla ja Fualopassa pesii mustatiira (Anous minutus / black noddy). F3 johdanto/Land and marine environment/Bird life. Suomenkielinen mustatiira-nimi ei käytetä C:ssä ilman nimivarmennusta; C puhuu merilinnuista. Ei IUCN-luokitusta, määriä tai nykyistä eläinhavaintolupausta.

**Tulosristiriidan rajaus:** F6 kertoo, että matalan veden karbonaattien pitkä näytesarja tuki Darwinin selitystä. F7 korostaa, ettei poraus tavoittanut atollin alla olevaa vulkaanista kallioperää, joten koe ei osoittanut koko rakenneketjua. C sanoo porauksen testanneen teoriaa ja tuottaneen näytteitä; ei väitä sen todistaneen teoriaa lopullisesti. F7:n myöhempi ydinkoe-/Enewetak-konteksti ei kuulu tähän lehteen.

Minitehtävä kysyy korallikiven rakenteen aiheuttamasta porausongelmasta. Vastaus teeman toisessa nostossa. Ei kysy samaa kuin kaupunkivisa.

## 5. Opas

1. Funafuti International Airport (FUN), Fongafale, rajoitetut lentoyhteydet; tarkista toteutuva reitti, kuljetus ja paluu, majoitusten noutomahdollisuus. F1 Transportation, F2 By plane. F1 mainitsee Suvan ja F2 Nadin eri muodoissa: C ei valitse lähtökaupunkia tai kerro lentoyhtiötä/aikataulua.
2. Fongafalea voi tutkia kävellen tai pyörällä; koko atollin muihin saariin tarvitaan vene. F2 Get around. Kiitoradan yhteisökäyttö F1 Landmarks/F2; koneen saapuessa poistutaan F2 Stay safe. C ei anna lupaa mennä suljetulle alueelle.
3. Kansalliskirjasto/arkisto, postimerkkitoimisto ja Women's Handicraft Centre ovat Funafutin paikkoja (F4/F5/F8/F2 See). Vierailun ja esittelyn ajankohdat tarkistetaan paikan päältä, ei avoinnaololupauksia.
4. Majoitusten ravintolat ja kala sekä eri maiden ruokavaihtoehdot F2 Eat. Ei lähteettömiä kansallisruokareseptejä.
5. Matkan ajoitus sidotaan vahvistettuihin yhteyksiin; venematkan olosuhteet ja paluu tarkistetaan järjestäjältä. F2 By plane/Get around ja F3 Access. Ei sääkuukausia, lämpötiloja tai sadetietoja. Käytännön suunnitteluohjeet on erotettu lähteissä olevista paikkatiedoista.

## 6. Kartta ja kohdejutut — partial

C:n karttakohteet tyhjä lista, rajat tyhjä olio ja nähtävyysjutut tyhjä olio. Funafutin yhteistä kaupunkipistettä, koko atollin IUGS-pistettä tai suojelualueen pistettä ei lainata kirjasto-, poraus- tai kokoushallikohteelle. F4:n kirjastosivun koordinaatti on käytännössä sama kuin läntisen suojelualueen piste ja ristiriidassa Fongafalen sijainnin kanssa: sitä ei oteta kirjaston karttapisteeksi. Rakennusten tekijän kuolemasta 70 vuotta -portti varmistamatta. Te Vili O Tavitan mahdollinen uusi muistolaatta ei ole tässä suojatun teoksen kuvakohde.

6–8 kohteen portti ei täyty. Omien WP/WD-koordinaattien, historiallisen taustan ja kohdejuttujen tarkistus erilliseen jatkovaiheeseen; ei arvausta rajauksesta.

## 7. Visa ja tiedot

Viisi kysymystä: Funafuti atollina (F1), laguunin nimi Te Namo (F1), porauspaikan David-nimi (F6 + F1), Tausoaliman merkitys (F1), syvistä näytteistä etsityt eliöjäljet (F1/F6/F7). Taso 1 ja 3 mukana. Kolme tietoa käsittelee arkistojen kopiointia (F4), varaosaa (F7) ja pääkaupungin/saari-/kylälaajuutta (F1). Ei isoisän ääntä.

## 8. Kuvat ja sää

B ei tehty. 18 tyhjää kuvaroolia (valokuva 1, kansi 3, nostot 8, oppaan etusivu 1, jaksot 5). Tiedosto/lyhyt/selite/lahde tyhjinä. Ei keksittyä tiedostonimeä tai näkemättömän kuvan kuvatekstiä.

`saatiedot:null`. 48/48 primääriauditointi puuttuu, `saa.json` ennallaan. Ei säälukuja tai vuodenaikaväitteitä teksteihin.

## 9. Poisjätöt ja avoimet portit

F1:n väestö-, saarten määrä-, maa-ala- ja laguunimitat eivät ole keskenään täysin yhtenäisiä. F3:n suojelualueen perustaminen/projektin alku/lain voimaantulo eri ajankohtia: C ei kerro perustamisvuotta. F5 johdanto kutsuu yhtä vuotta itsenäistymiseksi, vaikka History erottaa oman siirtomaahallinnon ja myöhemmän itsenäistymisen: C ei toista tätä vuosiväitettä. Ei matkustusturvallisuuden superlatiiveja, ennusteita tulevista väestöosuuksista/veden alle jäämisestä, nykypolitiikkaa, hintatietoja tai sääarvoja.

Täysi A, kartta/kohdejutut, B, sääauditointi, D/E/F, toimitushyväksyntä, pelikytkentä ja julkaisu avoinna. Ei Git-operaatioita, pelitiedostomuokkauksia, uusia agentteja tai julkaisua.
