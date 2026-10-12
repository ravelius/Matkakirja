# Washington — rajattu A-lähdekooste ja C:n faktaperusta

Luettu 12.10.2026. Omistus: tehtävä 12, vain e11/washington tässä kloonissa. Tämä on rajattu lähdekooste, ei riippumattomasti hyväksytty A/D/F. Konteksti luettu; USA:n maalehden tee-, rautatie-, Edison-, Franklin- ja Wright-aiheita sekä Crédit Mobilier -lähinostoa ei toisteta.

## 0. Lähteet ja 1873-kehys

Kaikki lähteet haettu yhteisellä `sallittu_haku.py`-apurilla. `Claude-User` ja Matkakirja-agentti sallittu, HTTP 200; uudelleenohjausten tarkistus apurissa. Raaka-HTML, luettava teksti, URL-luettelo ja SHA:t ovat `valiaikainen/nopea-e11-washington/`-hakemistossa NASilla. Päivä: 12.10.2026. Bibliografia tiedostossa `sources.json`, robots/path-check-todisteet tiedostossa `robots-ja-haut.jsonl`.

Lähdeavaimet: city = en-Wikipedia Washington, D.C.; plan = L'Enfant Plan; stone = Old Stone House (Washington, D.C.); castle = Smithsonian Institution Building; monument = Washington Monument; building = National Building Museum; library = Thomas Jefferson Building; canal = Chesapeake and Ohio Canal; food = Half-smoke; botanic = United States Botanic Garden; guide = en-Wikivoyage Washington, D.C. Alkuperäislähteet: nps-monument = NPS, Washington Monument History & Culture; si-castle = Smithsonian, Smithsonian Institution Building (The Castle); nps-stone = NPS, Old Stone House. United States Capitol luettiin rajauksen tueksi, ei valittu kohteeksi.

1873: kaupunki oli jo olemassa (city, historia; plan, historia). Smithsonianin linna oli valmistunut: castle ja riippumaton si-castle antavat valmistumisvuodeksi 1855. Old Stone House oli vanha: stone ja riippumaton nps-stone antavat rakennusvuodeksi 1765. Washington-monumentti oli kesken: monument ja riippumaton nps-monument sijoittavat pitkän rakennustauon tämän vuoden ympärille. C käyttää vain vuotta 1873, ei rakennusten tarkkoja vuosia. Ei väitteitä isoisän teoista, päiväkirjasta, reitistä tai kohtaamisista.

## 1. Perusfaktat

Washington on Yhdysvaltain pääkaupunki Potomacin pohjoisrannalla, liittovaltiopiiri eikä osavaltio (city, johdanto/historia/maantiede). Georgetown oli aiempi satamapaikka (city, historia; plan, historia). L'Enfant suunnitteli pääkaupungin katuverkkoa: ruudukko ja leveät diagonaaliväylät sekä niiden aukiot; numerokadut pohjois–eteläsuunnassa, kirjainkadut itä–länsisuunnassa, monet diagonaalit nimetty osavaltioista (plan, Plan of the city). Ilmansuuntalyhenteet ovat olennainen osa osoitetta (city, johdanto; guide, liikkuminen/osoitteet). Kaupunkipallo kopioitu kontekstista, ei kohteiden pisteeksi.

Väestöluvut jätetty pelaajateksteistä pois. Kontekstin väkiluku koskee District of Columbian hallintoaluetta, ei metropolialuetta. Sitä ei yhdistetä muihin aluelaajuuksiin.

## 2. Kansi: neljä eri aihetta

| Nosto | Faktat ja lähdekohdat |
|---|---|
| Ruutuja ja viistoja viivoja | Numerot/ilmaisut, kirjainkatujen suunnat, diagonaalit, osavaltioiden nimet, aukiot ja Kapitoli suunnittelun ankkurina: plan, Plan of the city; city, Cityscape. |
| Talo, jonka väärä tarina pelasti | 1700-luvun koti ja työpaikka, vaiheittainen kasvaminen; kaksi John Suteria ja Suterin majatalon/Old Stone Housen sekoittuminen; Washingtoniin liitetty väärä muisto auttoi säilymistä; NPS oikaisi sen: stone, History; riippumaton nps-stone. |
| Kiven väri kertoo keskeytyksestä | Yksityinen aloitus, rahoitusvaikeus ja pitkä tauko, 1873 keskeneräinen, eri louhosten eri sävyt, toteuttamatta jäänyt pylväikkö, myöhempi pelkistys: monument, Construction; riippumaton nps-monument. |
| Vetovoima käveli veden vieressä | C&O, Georgetown–Cumberland-yhteys; muulit vetotiellä, päälastina hiili, myös huonekalut/jauhot/pianot; vetotie nykyisen historiapuiston reittinä: canal, History/Cargo/Towing/Present day. Ei tietyn lastin väitetä kulkeneen vuonna 1873. |

## 3. Teema: Tiede — Kaupunki, joka kerää tietoa

| Nosto | Faktat ja lähdekohdat |
|---|---|
| Linna, jota varten ei tarvittu kuningasta | James Renwick nuorempi, romaaniset/goottilaiset muodot, Senecan hiekkakivi, sihteerin perheen asunto, palon tuhoamat kirjastot/paperit ja myöhemmät paloturvamuutokset: castle, History/Description. |
| Kasvinäyte saattoi palata mereltä elävänä | Charles Wilkesin Tyynenmeren retki; kuivatut ja elävät näytteet; Wardin kasvatuslaatikot merikuljetuksissa; konservatorion elinympäristöhuoneet ja viidakkohuoneen yläkulkusilta: botanic, History/Conservatory. Tarkkoja retkivuosia ja määriä ei käytetä. |
| Kirjat kulkivat omassa tunnelissaan | Kirjaston oma rakennus 1800-luvun lopulla, Kapitolin kirjatunneli ja sähköinen nidekuljetin, koristeellinen rakennus ja lukusalikupoli: library, History/Architecture/Book tunnel. Tunnelin nopeus, aloitusvuosi ja alkuperäisten kirjojen määrä pois. |
| Marmoria vain pinnalta | Eläkevirasto, veteraanien perheiden etuudet, Meigs, tiiliset marmoriksi maalatut salipylväät, matalat portaat, sisäpihan painovoimainen ilmankierto: building, Pension Building. Pylväiden määriä/korkeuksia/tiilimääriä ei käytetä. |

Minitehtävä kysyy salipylväiden tiilirakennetta. Vastaus löytyy saman teemasivun neljännestä nostosta; kaupungin viisi kysymystä eivät kysy pylväiden materiaalia. Vastaus ei ole nostovirke kopioituna.

## 4. Opas: viisi jaksoa

Perille/liike: Dulles, Silver Line, Reagan National vastarannan Virginiassa, Union Station ja metro (city, Transportation; guide, Get in/Get around). IAD lähteessä guide. Ei matka-aikoja, hintoja, vuoroja tai aukioloaikoja.

Museot: Mallin Smithsonian-kokoelmat ja maksuton perusvierailu (city, Smithsonian museums; guide, See). Nykyinen linnan sulkeminen peruskorjaukseen varmennettu alkuperäisestä si-castle-sivusta; opas ei lupaa sisäänpääsyä. Museokohtainen käyntijärjestely tarkistettava; ei tiettyjä varauskäytäntöjä luvata.

Georgetown: vanha satama, Old Stone House, C&O-vetotie (stone/canal/city/guide). Ruoka: half-smoke on mausteinen, tavallista hot dogia karkeampi makkara, usein sämpylä/sipuli/chilikastike; koostumus vaihtelee (food, johdanto/Etymology). Ben’s Chili Bowl U Streetillä ja etiopialaiset ravintolat Shaw’ssa (city, Cuisine; food, valmistajat). Nimen varma etymologia pois.

Vuodenajat: kuuma/kostea kesä, viileä talvi mahdollisine lumisateineen, kevään/syksyn kävelysää ja kevään kirsikankukkien ruuhka (city, Climate; guide, Climate). Ei ilmastolukuja. 48/48 sääauditointi puuttuu; `saatiedot:null`, saa.json-työtä ei tehdä eikä olemassa olevaa sääaineistoa muuteta.

Parasta: Mall-museot, Georgetown/C&O, kasvitieteellinen puutarha, Jefferson-kirjastotalo, U Streetin ruoka. Hyvä tietää: osoitteen ilmansuunta, museokohtaiset järjestelyt, linnan sulkeminen, lentoasemien Virginia-sijainti. Tähtien määrä on toimituksellinen valinta, ei lähdefakta.

## 5. Kohdekartta ja kohdejutut

Paikkojen omat HTML-koordinaatit, pyöristys viiteen desimaaliin. Ei kaupunkipisteen lainaamista kohteelle. Rajat kaikkien kohteiden ulkopuolelle noin 300 metrin marginaalilla.

| Paikka | lat | lon | Pisteen ja paikkafaktojen lähde | Aikataso |
|---|---|---|---|---|
| Georgetownin vanha kivitalo | 38.90556 | -77.06056 | stone, oma geo 38.90556;-77.06056; nps-stone | 1700-luku; 1873-tausta kahdesta lähteestä |
| Smithsonianin linna | 38.88875 | -77.02600 | castle, oma geo 38.8887472;-77.0259972; si-castle | 1800-luvun puoliväli; valmistuminen ennen 1873 kahdesta lähteestä |
| Washington-monumentti | 38.88944 | -77.03528 | monument, oma geo; nps-monument | 1800-luvun jälkipuoli; kesken 1873 kahdesta lähteestä |
| National Building Museum | 38.89750 | -77.01810 | building, oma geo 38.8975;-77.0181; Pension Building -osio | 1800-luvun loppupuoli; täsmällinen 1873-vertailu jätetty pois yksilähteisyyden vuoksi |
| Thomas Jefferson -kirjastotalo | 38.88870 | -77.00460 | library, oma geo 38.8887;-77.0046; History/Architecture/Book tunnel | 1800-luvun loppupuoli; täsmällinen 1873-vertailu avoin |
| Kanavanvartijan talo | 38.89193 | -77.03975 | canal, erillinen koordinaattilinkki otsikolla “Lockkeeper's house from Washington branch of the Chesapeake and Ohio Canal”, ei kanavan tai Georgetownin yleispiste; canal, History (Georgetown–Tiber Creek -haara) | 1800-luvun kanavakausi; täsmällinen 1873-rakennusvaihe avoin |

Valittu historiallinen rakennusmassoitus, ei yksittäisiä moderneja teoksia, lisäsiipiä, veistoksia tai installaatioita. Monumentin alkuperäissuunnittelijan Robert Millsin kuolinvuosi on nps-monumentissa. Muiden rakennusten täydellinen tekijäketjun ja restaurointimuutosten auditointi kuuluu avoimeen A/D-porttiin; niitä ei tällä luonnoksella hyväksytä kuvakohteiksi. Vanhan rakennuksen olemassaolo ei ole tulevan kuvan oikeuslupa. Kanavanvartijan talon pisteessä myöhemmän siirron vertailu on D:ssä tarkistettava.

## 6. Kysymykset ja tiedot

Viisi kysymystä: Potomac (city), NE/koillinen (city/plan/guide), muulien veto (canal), half-smoke (food), kirjatunneli (library). Tasot 1 ja 3 mukana; neljä eri vaihtoehtoa ja lähde-URL jokaisessa. Vihjeet eivät sisällä oikeaa vastausta. Kolme tietoa: Old Stone Housen väärä tapaamislegenda (stone/nps-stone), Smithsonianin Seneca-kivi (castle), kanavan pianolasti (canal). Ei isoisän ääntä.

## 7. Kuvat

B-valintaa ei ole. Kuvia ei haettu, ladattu katseluun tai generoitu. Kaikkien kuvaroolien neljä kenttää tyhjät: valokuva 1, kansi 3, nostot 8, matkailijalle 1, oppaan jaksot 5, kohteet 6 = 24 roolia. Tarvittavat aiheet on nimetty sisällön otsikoissa ja C-muistiossa. Erillinen kuvaputki valitsee havainnekuvat/asset-liitteen; niitä ei merkitä Commons-tiedostoiksi. Ei ennen–nyt-paria ilman todellista B-valintaa.

## 8. Ristiriidat ja avoimet kohdat

Monumentin työn jatkaminen ajoittuu lähteissä eri vaiheisiin: NPS esittää julkisen vaiheen 1876–1884, Wikipedia käsittelee taukoa 1854–1877 ja varsinaista jatkamista 1879. C ei valitse täsmällistä jatkamisvuotta. Molemmat tukevat keskeytystä vuonna 1873. NPS:n ja Wikipedian korkeuden mittausarvoja ei käytetä. Half-smoken nimen alkuperä ja resepti vaihtelevat; varmaa etymologiaa tai yhtä lihasuhdetta ei väitetä. Puutarhan retkeltä periytyvää saniaista ei kutsuta varmasti alkuperäiseksi. Väestö jätetty pois.

Avoinna: kuva/tekijäketjut, kanavanvartijan talon siirron pistevertailu, kolmen kohteen riippumaton 1873-aikataso, sääauditointi, D/E/F, tekninen kuvaportti, hyväksyntä, pelikytkentä ja julkaisu.

## 9. Pois jätetyt aiheet

Ei vaaleja, nykyhallituksia, nykysotaa/rikollisuutta, poliittisia skandaaleja, isoisän tekoja tai katkelmia. Ei maalehden rautatie-/sähke-/keksintötarinoita. Kapitoli jätetty kartasta, koska nykyisen rakennusmassan myöhempien lisäysten rajaus tarvitsee erillisen oikeusketjun. Kasvitieteellinen puutarha on tekstiaihe ja opaskohde, ei tässä kuvitettava rakennuskohde. Ei moderneja muistomerkkejä eikä suojattujen teosten naamioimista luontopaikoiksi.
