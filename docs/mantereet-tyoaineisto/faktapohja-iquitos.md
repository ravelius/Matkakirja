# Iquitos — faktakoostaja, uusi kaupunkilehti

Lauta-id `southamerica`, kaupunki-id `iquitos`, maa PER, en-Wikipedia
"Iquitos". Kaikki tiedot haettu Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä, User-Agent `Matkakirja/1.0
(https://github.com/ravelius/Matkakirja)`) **7.9.2026**. Malli ja mitat
luettu tiedostoista `tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/kohdekartta-ohje.md`, `docs/aasia-tyoaineisto/
lehtityo-resepti.md`, `docs/moduulit/kaupunkilehti.md` ja
`docs/mantereet-tyoaineisto/spec-mantereet.md`. Mallilehdet: **Lagos ja
Fes (v1670)** sekä samasta parvierästä **Salta ja Antofagasta**.

## 0. Kielivalinta — ES-WIKIPEDIA NIMETÄÄN LÄHTEENÄ

Iquitosin keskustan rakennuksista **yhdelläkään kohdekartan
kahdeksasta kohteesta ei ole omaa englanninkielistä artikkelia**.
`list=geosearch` es-Wikipediaan (−3,7491 / −73,2478, säde 2 km)
palautti 45 osumaa, joista puolet on nimenomaan monumenttivyöhykkeen
rakennuksia; sama haku en-Wikipediaan antaa lähinnä hallinnollisia
kohteita. Siksi nähtävyysjuttujen lähde on **es-Wikipedia ja se
sanotaan lähderivillä** — sama ennakkotapaus kuin Guatemala Cityssä ja
Saltassa (7.9.2026).

Luetut lähdeartikkelit **en-Wikipedia (7.9.2026)**: "Iquitos".

Luetut lähdeartikkelit **es-Wikipedia (7.9.2026)**: "Casa de Fierro",
"Barrio de Belén", "Zona Monumental de Iquitos", "Catedral de
Iquitos", "Ex Hotel Palace", "Malecón Tarapacá", "Casa Strassberger",
"Casa Morey", "Mercado Central (Iquitos)", "Plaza Veintiocho de
Julio", "Plazuela Serafín Filomeno", "Biblioteca Amazónica",
"Escuela Superior de Bellas Artes Víctor Morey Peña".

## 1. Rajaus tälle lehdelle

**Perun maalehti (`js/packs/maa-kategoriat.js`, PER) on tehty ja sen
aiheita EI toisteta.** Maalehti kertoo: inkavaltakunta ilman pyörää ja
kirjoitusta, Atahualpan lunnashuone, kuraka Guaman Poma, itsenäisyyden
julistus; Caral, Nazcan viivat, quipu, Sipánin hauta; **hoatsin**,
**papukaijojen savilaikut**, Humboldtin virta, Titicacan kelluvat
saaret; kolmetuhatta perunalajiketta, kvinoa, pachamanca, pisco;
charango, cajón, panhuilut, sakset.

Karttanostot on luettu: `js/packs/maastokohteet-per.js` (Huascarán,
Apurímac, Ballestas-saaret, Nazcan viivat, Chan Chan, Caral, Kuélap,
Sipán, Chavín de Huántar, Arequipa, Colcan kanjoni),
`js/packs/skandaalit.js` (PER: Chinchan saaret 1864—1866) ja
`js/packs/elaintakyt.js` (PER: vikunja). Yksikään ei ole tämän lehden
aihe.

**Liman ja Manausin kaupunkilehdet ovat valmiit, eikä niiden aiheita
toisteta.** Lima: loppiaisen kaupunki, rautatien tieltä kaatunut
muuri, sateeton aavikko, huaca-pyramidi; Ichman laakso,
maanjäristys, guanotulot, keskusrata; gastronomian pääkaupunki,
ceviche, chifa, Mistura; Machu Picchu 1911. Manaus: nimen kolme
vaihtoa, vetten kohtaaminen, kaupunki kumibuumin kynnyksellä,
vapaakauppa-alue; **oopperatalo**, **sähkövalot**, **Lontoota
jäljittelevä tullitalo**, **Wickhamin siemenet**;
alkuperäiskansat, päällikkö Ajuricaba, baré, Cabanagem-kapina.

**Tästä seuraa kaksi tietoista rajausta.** (1) **Wickhamin
kumisiemenet eivät ole tämän lehden noston aihe** — ne ovat Manausin
lehden oma nosto. Iquitosin kumibuumin loppu kerrotaan siitä
näkökulmasta, mitä kaupungissa itsessään tapahtui (Casementin
raportti, yhtiön purkaminen, väen lähtö), ja Aasian viljelmät
mainitaan vain yhdellä sivulauseella. (2) **Oopperataloa ei
käsitellä**: Manausin nosto kertoo Teatro Amazonasista, ja Iquitosin
oma en-artikkeli mainitsee oopperatalon vain ohimennen ilman
yksityiskohtia.

## 2. Perustiedot

- Iquitos on **Maynasin provinssin ja Loreton alueen pääkaupunki**,
  Perun Amazonian suurin kaupunki ja maan yhdeksänneksi väkirikkain.
  ("Iquitos", johdanto)
- **"Iquitos is the largest city in the world that cannot be reached
  by road that is not on an island; it is only accessible by river and
  air."** ("Iquitos", johdanto)
- Metropolialueella on **471 993 asukasta** neljässä piirissä:
  Iquitos, Punchana, Belén ja San Juan Bautista. Kaupunki yhdisti
  neljä kuntaansa 1999. ("Iquitos", johdanto)
- Sijainti: Amazonin altaan suurella tasangolla, Amazon-, Nanay- ja
  Itaya-jokien syöttämänä; koordinaatit noin 3°43'46"S 73°14'18"W,
  korkeus 106 m. Pinta-ala 368,9 km². Kaupunki on Amazonin vasemmalla
  rannalla; Itaya ja Nanay rajaavat laajenemista, ja lännessä on
  Moronacochan järvi. Näiden takia **kaupunki näyttää valtavalta
  epäaidolta jokisaarelta**. ("Iquitos", Geography)
- Tie- ja jokiliikenne: kaduilla on **yli 25 000 motokaria** eli
  kolmipyöräistä moottoritaksia. Bussit ovat isoja puisia ajoneuvoja.
  Elinkustannukset ovat Perun keskitasoa korkeammat, ja Iquitos on
  Cuscon jälkeen **Perun toiseksi kallein kaupunki**. Suunniteltu
  maantieyhteys Sarameriza-suuntaan liittäisi kaupungin maan
  tieverkkoon. ("Iquitos", Transport)
- Lento: Crnl. FAP Francisco Secada Vignetta -lentoasema; suora lento
  Limasta kestää 1 t 45 min, ja päivittäin on 8—9 vuoroa. ("Iquitos",
  Air)
- Elinkeinot: puutavara, öljy, kaasu, jauhomyllyt, rommi, camu camu ja
  leipomot; kalastus; matkailu. Öljyä pumpataan Loreton
  luoteisosasta ja osa jalostetaan Iquitosissa. ("Iquitos", Economy)

## 3. Historia

### Alkuperäiskansat ja lähetysasemat
- Aluetta ovat asuttaneet amerinintiaanit tuhansia vuosia. Kohtaamisen
  aikaan alueella asuivat **napeanot ja iquitot**, jotka olivat
  liikkuvia metsästäjä-keräilijöitä ja elivät jokien varsilla.
  Kaupungin nimi tulee kansasta, jota espanjalaiset kutsuivat
  nimellä *Iquitos*. He olivat aiemmin asuneet Pastazan, Arabelan,
  Tigren, Nanayn ja Curarayn varsilla. ("Iquitos", Early period)
- Vuosina 1638—1769 iquitot ja muut Marañónin kansat siirrettiin
  jesuiittalähetysasemille (*reducciones*), joita johtivat Quiton
  audiencian jesuiitat. Noin 130 vuoden aikana alueella toimi
  **161 jesuiittalähetyssaarnaajaa**: 63 kreolia, 43 espanjalaista,
  32 saksalaista ja hollantilaista, 20 italialaista, 2 portugalilaista
  ja yksi ranskalainen. ("Iquitos", Early period)
- Vuodesta 1730 jesuiitat käyttivät **37 vuotta** Iquitosin
  lähetysasemien perustamiseen Marañónin varrella lähelle Napon ja
  Amazonin yhtymäkohtaa. Nimeämisen ja perustamisen teki isä **José
  Bahamonde**, joka syntyi Quitossa 1.1.1710 ja kuoli maanpaossa
  Ravennassa 11.5.1786. ("Iquitos", Early period)
- Lähetysasemien luettelo: 1730 Santa Maria de la Luz de los Iquitos;
  1740 Juan Nepomuceno de Iquitos; 1741 Santa Bárbara de Iquitos;
  1742 San Sebastián de Iquitos; 1748 Sagrado Corazón de Jesús de
  Maracanos; 1754 Santa María de Iquitos; **1757 San Pablo de los
  Napeanos**; 1763 San Javier de Iquitos; 1767 San José de Iquitos.
  ("Iquitos", Early period)
- **Kaarle III lakkautti jesuiittajärjestön ja karkotti sen
  Etelä-Amerikasta 20.8.1767.** Quitosta oli pitkä matka eikä teitä
  ollut, joten alueelle syntyi valtatyhjiö; puolustuksettomia
  lähetysasemia vastaan hyökkäsivät brasilialaiset *bandeirantes*.
  Espanjan kuningas perusti **1802 Maynasin komentokunnan**
  pysäyttääkseen etenemisen; portugalilaiset pysäytettiin
  Tabatingassa. ("Iquitos", Early period)

### 1800-luku ja sataman perustaminen
- Itsenäistymisen jälkeen Perulla, Ecuadorilla, Kolumbialla ja
  Brasilialla oli päällekkäisiä vaatimuksia Amazonin altaan
  luoteisosaan. ("Iquitos", 19th century: independence)
- **23.10.1851** Peru sopi Brasilian kanssa vapaasta
  purjehduksesta ja ystävällisestä kaupasta Amazonilla.
  ("Iquitos", 19th century)
- Presidentti **Ramón Castilla perusti Loreton sotilas- ja
  poliittisen departementin 7.1.1861** entisestä Maynasin alueesta ja
  määräsi rakennettavaksi jokisataman strategiseen paikkaan Amazonilla.
  Väittelyn jälkeen valittiin kauppapaikkakylä Iquitos.
  ("Iquitos", 19th century)
- **5.1.1864 kolme Perun laivaston höyrylaivaa — *Pastaza*,
  *Próspero* ja *Morona* — saapui Iquitosin kylään.** Tätä päivää
  pidetään Perun ensimmäisen jokisataman perustamisena. Paikalle
  rakennettiin heti **Englannista tuotu telakka ja laivastopaja**.
  ("Iquitos", 19th century)
- Iquitos nimettiin **Loreton departementin pääkaupungiksi
  9.11.1897**, ja siitä tuli katolisen apostolisen vikariaatin sijainti.
  Peru sopi rajansa Kolumbian kanssa 1922 ja Ecuadorin kanssa 1942.
  ("Iquitos", 19th century)
- **Väkiluku Genaro Herreran mukaan: 1866 = 648 asukasta, 1876 =
  1 475 asukasta.** Väestötaulukko antaa lisäksi 1808 = 171,
  1842 = 200, 1860 = 300, 1876 = 1 475. ("Iquitos", Demography)
  → **Isoisän matkavuonna 1873 Iquitos oli siis noin tuhannen
  asukkaan laivastosatama.**

### Kumibuumi
- Amazonin kumibuumi ajoitetaan artikkelissa vuosiin **1880—1914**, ja
  Iquitos oli Manausin ohella sen johtavia kaupunkeja. ("Iquitos",
  johdanto)
- Autoteollisuuden nousu kasvatti kumin kysyntää rajusti. Iquitosiin
  tuli tuhansia siirtolaisia ympäri maailmaa, useimmat nuoria
  naimattomia miehiä. Monet eurooppalaismiehet menivät naimisiin
  alkuperäiskansojen naisten kanssa ja jäivät kaupunkiin loppuiäkseen.
  Siirtolaiset toivat eurooppalaisen pukeutumisen, musiikin ja
  arkkitehtuurin. ("Iquitos", Rubber boom)
- **Vuonna 1900 Iquitosissa oli kaksikymmentäviisi kumikauppahuonetta.**
  Tunnetuimpia perustajia olivat Julio César Arana, Cecilio Hernández
  sekä Luis ja Adolfo Morey. Kumiparoni Carlos Fitzcarrald toimi
  kaupungissa, kunnes hukkui höyrylaivaonnettomuudessa Urubamballa
  1897. ("Iquitos", Rubber boom)
- Kumiyrittäjät hoitivat myös politiikkaa: Luis F. Moreysta tuli
  Loreton senaattori 1901, Enrique A. Llosasta Iquitosin pormestari
  1901, **Aranasta pormestari 1902** ja Cecilio Hernándezista
  pormestari 1906. ("Iquitos", Rubber boom)
- **Benito Loresin vuonna 1903 tekemä laskenta antoi Iquitosille
  9 438 asukasta.** ("Iquitos", Rubber boom)
- **Peruvian Amazon Company (PAC)**, jonka omisti Julio César Arana,
  piti alkuperäisväestön työntekijöitä lähes orjuutta vastaavissa
  oloissa, kunnes tutkinta käänsi mielipiteen yhtiötä vastaan.
  Britannian Iquitosin-pääkonsuli **Roger Casement**, joka oli aiemmin
  tutkinut työoloja Kongon vapaavaltiossa, julkaisi **1913**
  tutkintaraportin. Yhtiön brittiläiset johtokunnan jäsenet ja
  osakkaat painostettiin muutoksiin, ja **Arana joutui purkamaan
  PAC:n**. ("Iquitos", johdanto ja Rubber boom)
- Aasian viljelmien halvempi kumi alensi hintaa, kumin merkitys Perussa
  romahti ja **moni työläinen ja kauppias lähti Iquitosista**. Kaupunki
  jatkoi tärkeänä kauppasatamana ja siirtyi puutavaraan, öljyyn ja
  mineraaleihin. ("Iquitos", johdanto ja Rubber boom)
- **Marokon sefardijuutalaiset** olivat yksi kumibuumin
  siirtolaisyhteisöistä. Monet miehet menivät naimisiin paikallisten
  naisten kanssa ja perustivat perheen; he perustivat **synagogan ja
  juutalaisen hautausmaan**. Neljän tai viiden sukupolven jälkeen
  useimmat jälkeläiset eivät enää harjoittaneet juutalaisuutta vaan
  oli kasvatettu katolisiksi. 1990-luvulla eräs jälkeläinen ryhtyi
  opiskelemaan juutalaisuutta ja elvytti sen suvussaan ja
  tuttavapiirissään; limalaisen ja brooklynilaisen rabbin avulla
  muutama sata ihmistä kääntyi juutalaisuuteen (muodollinen
  kääntyminen oli halakan mukaan tarpeen, koska äidit eivät olleet
  juutalaisia). Moni kääntyneistä on muuttanut Israeliin paluulain
  nojalla; vuosina 2013—2014 muuttajia oli noin 150. Yhteisöstä tehtiin
  dokumentti 2010. ("Iquitos", Rubber boom ja 20th century)

### 2000-luku
- **13.8.2012** Plaza 28 de Julion laitaan asetettiin muistolaatta,
  joka juhlisti Amazonjokea ja sademetsää yhtenä maailman
  seitsemästä luonnonihmeestä. Laatta taottiin Münchenissä ja painaa
  120 kiloa. Tunnustus jaetaan Bolivian, Brasilian, Ecuadorin,
  Surinamen, Kolumbian, Venezuelan ja Ranskan Guayanan kanssa.
  ("Iquitos", 20th century ja Amazon commemorative capital)
- 2021 ilmoitettiin 100 MW / 100 MWh aurinkovoima- ja
  varastointilaitoksesta, joka korvaisi jopa puolet kaupungin
  sähköntuotannon dieselistä vuoteen 2026 mennessä. ("Iquitos",
  20th century)

## 4. Luonto, joki ja ilmasto

- Ilmasto on päiväntasaajan sademetsäilmasto (Köppen **Af**), jota
  ohjaa **päiväntasaajan matalapainevyöhyke** eikä pasaatituulet, eikä
  hirmumyrskyjä ole. Sadetta tulee ympäri vuoden ilman selvää
  kuivakautta, mutta kesä on sateisempi. Vuodenaikoja on kaksi.
  ("Iquitos", Climate)
- Sateinen kausi alkaa marraskuussa ja päättyy toukokuussa.
  **Maaliskuussa ja huhtikuussa sataa eniten, 280—300 mm.**
  ("Iquitos", Climate)
- **Toukokuussa Amazon on korkeimmillaan. Alimmillaan se on lokakuussa,
  9—12 metriä alempana, ja nousee sitten taas kierroksen mukaan.**
  ("Iquitos", Climate)
- Heinä- ja elokuu ovat kuivimmat, mutta niissäkin on
  kaatosadejaksoja. Sadetta tulee enemmän kuin Ayacuchossa, Cuscossa
  tai Limassa. ("Iquitos", Climate)
- **Tärkein luonnonvaara on tulva.** Vuoden 2012 tulvaa pidetään
  Iquitosin historian pahimpana luonnononnettomuutena: sateet alkoivat
  marraskuussa 2011, Amazonin taso nousi **117 metriin**, helmi- ja
  maaliskuussa vahingot koskivat 19 209 ja 18 400 perhettä, 26 000
  hehtaaria peltoa jäi veden alle ja vesi nousi Iquitosin
  rantakaduille. Lasku alkoi 24.4.2012. ("Iquitos", Natural hazards)
- Muita ilmiöitä: hellejaksot yli 37 °C ja tuntuma 45 °C; **kylmät
  aallot**, kun mantereen eteläkärjestä tuleva kylmä ilma laskee
  lämpötilaa ja tuo sateita ja ukkosta; pasaatituulet nostavat välillä
  60 km/h puuskia. Maanjäristykset ovat hyvin harvinaisia ja hyvin
  syviä. ("Iquitos", Natural hazards)
- Ekologia: 850 kasvilajia, joista 22 palmulajia ja orkideoja;
  metropolialueen metsissä **130 nisäkäslajia, 330 lintulajia, 150
  matelija- ja sammakkoeläinlajia ja 250 kalalajia**. Kaupungissa
  elää kesykyyhky erityisesti Plaza 28 de Juliolla. **"Also recorded
  is the transient presence of bull sharks (Carcharhinus leucas) who
  come from the Atlantic Ocean, traveling 3,360 miles to reach
  Iquitos."** ("Iquitos", Ecology)
- Kaupunkia ympäröi **Iquitos varzea** eli tulvametsä. Puut pudottavat
  lehtensä maahan, ne muuttuvat humukseksi, sade huuhtoo ravinteet
  jokiin ja antaa niille **vaalean tanniinivärin**; kierto toistuu.
  ("Iquitos", Ecology)
- **Allpahuayo-Mishanan kansallinen suojelualue** on 20 km
  Iquitosista, Nanayn valuma-alueella, "Napon ekoalueella", jossa on
  omalaatuisia **valkohiekkametsiä**. Ekoalueella on 112
  sammakkoeläinlajia, 17 kädellislajia, 1 900 kasvilajia ja yli 600
  lintulajia. **Iquitosin harmaasieppo (*Polioptila clementsi*) on
  suojelualueen kotoperäinen laji ja kaupungin symboli.**
  ("Iquitos", Natural reserves and zoos)
- Quistocochan matkailukeskus on 6 km:n päässä, 369 ha luonnonmetsää,
  pieni eläintarha, käärmetalo, akvaario, taimitarha ja tekoranta.
  Pilpintuwasin perhostarhassa Padre Cochassa on yli 40 hyönteislajia
  ja sen yhteydessä Amazonin eläinorpokoti. ("Iquitos", Natural
  reserves and zoos)

## 5. Belén

- **Barrio de Belén**, myös **"La Venecia Amazónica"**, on osa Belénin
  piiriä. Se jakautuu Ylä- ja Ala-Beléniin. Nimi tulee sen
  tavanomaisesta arkkitehtuurista: **palafiitit eli paalutalot ja
  asuinlautat** Itaya-joen rannan takana. **"La vida suburbana
  estacionalmente cambio de ritmo por la crecida y descenso del
  Itaya."** (es-Wikipedia, "Barrio de Belén")
- Kaupunginosa syntyi Belén Cochan rannalle, joka oli Itayan pieni
  haara ja on nykyään Itaya-niminen katu. Se levisi Vizcarran kummulle
  ja sittemmin Pijuayo Lomalle, joka on nimetty palmun mukaan.
  (es-Wikipedia, "Barrio de Belén")
- **Belénin tori** on Perun Amazonian suurin katutori. Se alkaa
  9 de Diciembre -kadun päästä ison sinisen rakennuksen "Mercado
  Belén" -kyltin alta ja leviää useille kaduille kapeine käytävineen.
  **150 alkuperäiskansayhteisöä tuo sinne tuotteitaan.** Torilla on
  inventoitu **390 tuotetta: 231 kasviperäistä, 157 eläinperäistä ja
  2 mineraaliperäistä. 84 prosenttia tuotetaan alueella** ja 16
  prosenttia tulee rannikolta ja San Martínista. Eläinperäisistä
  erottuvat 60 riistalajia ja 56 kalalajia; kasviperäisistä 77
  prosenttia (179) viljellään, kerätään tai jalostetaan paikallisesti.
  (es-Wikipedia, "Barrio de Belén", Mercado)

## 6. Casa de Fierro — kolme lähdettä, kolme tarinaa

Tämä on lehden selvin lähderistiriita, ja se kirjoitetaan lukijalle
auki (ks. tarkistus, kohta A).

- **en-Wikipedia, "Iquitos", Rubber boom:** *"Casa de Fierro (Spanish
  for the Iron House) is said to have been designed by Gustave Eiffel,
  designer of the Eiffel Tower in Paris, but evidence supporting this
  claim is scant."*
- **en-Wikipedia, "Iquitos", Architecture:** *"the city's unique French
  architecture called Casa de Fierro built by Gustave Eiffel, who built
  the original house in Paris for an exhibition of 1878."*
- **es-Wikipedia, "Casa de Fierro":** suunnitelma syntyi Gustav
  Eiffelin käsissä noin **1860**, rakennettiin belgialaisilla Forges
  d'Aiseau -verstailla ja oli esillä **Pariisin maailmannäyttelyssä
  1889**. Julio H. Toots osti sen ja kutsui sitä nimellä "la Gran
  Casa". Rakenne saapui Iquitosiin **1890** esivalmisteisena
  brasilialaisella *Perseverança*-aluksella, mutta se oli liian iso ja
  **piti jakaa kahtia**. Ensimmäisen puolikkaan osti Antonio Vaca
  Diez vietäväksi Mishagua-joelle Madre de Diosiin; Amazonin veden
  alhaisuus esti kuljetuksen ja se myytiin lopulta romuksi — **osia
  käytettiin Mercado Centralin rakentamiseen**. Toinen puolikas
  pystytettiin keskustaan Plaza de Armasia vastapäätä Putumayon ja
  Prósperon väliin. Talo oli myöhemmin ravintola (Julio Queija,
  1914), makeistehdas, kauppakeskus ja siirtomaatavarakauppa. Sitä
  hallinnoi vuodesta 1985 Club Social de Iquitos.
- **es-Wikipedia, "Mercado Central (Iquitos)":** *"Formó parte de la
  original Casa de Fierro, cuando esta fue dividida en **1886**"* —
  eli jakovuosi olisi kolme vuotta ennen näyttelyä. Sama artikkeli
  sanoo, että jäännökset asennettiin ensin Malecón Tarapacán ääreen
  Hotel Palacen viereen, purettiin myöhemmin ja siirrettiin nykyiselle
  paikalleen Sargento Loresin ja Mooren kulmaan; **1950 rakennus
  uudistettiin**. Sisällä on **164 kiinteää myyntipaikkaa**, ja sitä
  hallinnoi Maynasin provinssin kunta.
- Ensimmäinen elokuva näytettiin Iquitosissa **Edisonin koneella Casa
  de Fierrossa vuonna 1900** (es-Wikipedian kuvateksti; en-Wikipedia,
  Cinema, kertoo Lumière-veljesten projektoreista ja Antonio Wong
  Rengifosta seudun elokuvan uranuurtajana).

## 7. Kohdekartan kahdeksan kohdetta

Koordinaatit `list=geosearch`-rajapinnasta 7.9.2026 (es-Wikipedia,
keskipiste −3,7491 / −73,2478, säde 2 km). Numerointi pohjoisesta
etelään.

1. **Casa Morey** −3,7468295 / −73,2420001 — kumiparoni **Luis Felipe
   Morey** rakennutti talon **1910—1913**. Se kuului hänen veljelleen,
   niin ikään kumiparonille **Adolfo Morey Ariasille**, joka asui
   siellä vaimonsa Estefanía Peñan ja **neljäntoista lapsensa**
   kanssa; useat lapsista koulutettiin Euroopassa. Kaksikerroksinen,
   ikkunoita suojaavat hienot takorautaristikot. Talo on Plaza Ramón
   Castilla y Marquesadoa vastapäätä. (es-Wikipedia, "Casa Morey")
2. **Escuela Superior de Bellas Artes Víctor Morey Peña** −3,7477222 /
   −73,2510278 — julkis-yksityinen taidekoulu, perustettu
   **1960-luvulla** Iquitosissa uransa tehneiden taiteilijoiden
   toimesta; alkuperäiseen hankkeeseen kuului myös musiikkikoulu.
   Nimi on iquitosilaisen maalarin ja runoilijan Víctor Morey Peñan
   mukaan; hänen tyttärensä Selva Morey toimi koulun ensimmäisenä
   sihteerinä ja Ángel Chávez López johtajana. Koulu toimii myös
   **lehtiarkistona**, johon on koottu Amazonian maalaustaiteen
   historia. Tutkinnot ovat teknisen tason tutkintoja, ja
   yliopistotason puuttumisesta keskusteltiin 2017.
   (es-Wikipedia, "Escuela Superior de Bellas Artes Víctor Morey Peña")
   **Kaupungin oma taidesuunta**: en-Wikipedia kertoo, että Iquitos on
   **Amazonian pop-taiteen** (myös "villi naiivi") syntypaikka —
   itseoppinut tyyli, joka tunnetaan kimaltavasta väriskaalastaan ja
   viittauksista ayahuasca-kokemuksiin; alun perin muraalitaidetta,
   jossa yhdistyvät Amazonian kulttuuri, eurooppalaiset aiheet ja
   kaupalliset hahmot. Nimiä: Christian Bendayan, Roldán Pinedo, Elena
   Valera, Rember Yahuarcani, Brus Rubio, Victor Churay. ("Iquitos",
   Entertainment and arts)
3. **Mercado Central** −3,7488446 / −73,2484520 — ks. kohta 6.
4. **Catedral de Iquitos** −3,749266 / −73,244968 — virallisesti
   **Catedral de San Juan Bautista**, tutummin Iglesia Matriz;
   kaupungin tärkein katolinen kirkko Aricán ja Putumayon kulmassa.
   **Uusgoottilainen**, julistettu kansalliseksi historialliseksi
   kulttuuriperinnöksi 1996, kaupungin korkein kirkko ja parhaiten
   säilyneitä perintörakennuksia; siinä on krypta. Rakentaminen alkoi
   **1911** vanhan temppelin purkamisen jälkeen, kirkko vihittiin
   **16.3.1919** ja torni valmistui **1924**. **Sveitsistä hankittu
   julkinen kello** asennettiin 20 metrin torniin kellotapulin ja
   metalliristin kanssa **1925**. Laajennuksia tehtiin 1944—1949 isä
   Avencio Villarejon johdolla. (es-Wikipedia, "Catedral de Iquitos")
5. **Ex Hotel Palace** (Casa Vela) −3,750688 / −73,243716 —
   **art nouveau** -rakennus, jonka tyylissä on katalonialaisen
   modernismin ja **Gaudín** koulukunnan vaikutteita. Kolme kerrosta ja
   kulmatorni. Rakennettiin **1908—1912** perulaisen rakennusinsinööri
   **Samuel Young Massin** ja espanjalaisen arkkitehti **José Altamira
   y Mottan** johdolla Otoniel Velan toimeksiannosta. Se oli
   kumibuumin tärkeä luksushotelli, ja sitä pidetään **Perun
   ensimmäisenä luksushotellina — kaksitoista vuotta vanhempana kuin
   Liman Gran Hotel Bolívar**. Kaikki rakennusosat kuljetettiin
   Atlantin yli; **kaakelit tuotiin Málagasta**. Vuodesta **1961**
   talossa on toiminut Itäisen sotilasalueen esikunta. Rakennus on
   kuvattu uudessa yhden solin kolikossa nimellä "Antiguo Hotel
   Palace, 1912". (es-Wikipedia, "Ex Hotel Palace")
6. **Malecón Tarapacá** −3,7525346 / −73,2464037 — leveä rantakatu
   **Itaya-joen** rannalla kaupungin itäreunassa, viisi korttelia,
   betonia ja mayolikkaa, suihkulähde, puurivi ja kapeat puutarhat.
   Rakennettiin **1800-luvun lopulla kumikauden aikana**; se oli
   kaupunkiin saapuneiden tutkimusmatkailijoiden kokoontumispaikka,
   josta katseltiin Amazonille meneviä ulkomaisia aluksia. **Nimi
   tulee entisestä Tarapacán departementista**, jonka Peru menetti
   Tyynenmeren sodassa. Varrella on Orlando Casanova Hellerin
   pronssipatsas, vanha San Agustínin koulu ja augustinolaisten
   luostari, Biblioteca y Museo Amazónico ja entinen Kolumbian
   konsulaatti; Itayan rannassa on Centro Artesanal Anaconda noin
   kahdenkymmenen myyntipisteen kanssa. Malecón jakautuu kolmeen
   vyöhykkeeseen: ylä, bulevardi ja Belén. (es-Wikipedia, "Malecón
   Tarapacá")
7. **Casa Strassberger** −3,7528833 / −73,2444139 — monumenttivyöhykkeen
   rakennus, jonka rakennutti saksalainen **Emilio Strassberger**,
   Iquitosin pormestari kahtena kautena (**1912—1914** ja
   **1924—1925**) ja Banco Alemán Transatlánticon edustaja. **Perun
   valtio takavarikoi talon 1940-luvulla** toisen maailmansodan
   aikaisten Saksa-kytkösten takia ja luovutti sen Perun armeijan
   viidennelle sotilasalueelle toimistokasarmiksi. Talo julistettiin
   **kansalliseksi kulttuuriperinnöksi 1986**; armeija julisti sen
   asuinkelvottomaksi 2008 ja lopetti toimistokäytön 2011 mutta piti
   vartion. **Tammikuussa 2016 tulipalo tuhosi talon osittain**, ja
   2018 alkoi osittainen jälleenrakennus. (es-Wikipedia, "Casa
   Strassberger")
8. **Plaza Veintiocho de Julio** −3,7545969 / −73,2493161 —
   **kaupungin suurin aukio** ja Plaza de Armasin jälkeen toiseksi
   tärkein, keskustan lounaiskulmassa. Vuonna 2013 Maynasin
   provinssin kunta ilmoitti aukion täydellisestä uusimisesta
   "perinteis-ekologiseen" muotoon, johon kuuluisi kaksi hyvin pitkää
   porrasjaksoa, jotka yhtyisivät keskusobeliskin luona.
   (es-Wikipedia, "Plaza Veintiocho de Julio") Aukio on paikka, jossa
   Amazonin luonnonihmelaatta esiteltiin 13.8.2012 illalla; päivän
   ensimmäinen osuus pidettiin Itayan ja Nanayn yhtymäkohdassa.
   ("Iquitos", Amazon commemorative capital)

## 8. Muut lehteen mahdollisesti tulevat tiedot

- **Amazonian espanja**: murre, joka kuuluu enemmän kuin näkyy —
  [f] ja [x] ovat allofoneja (Juana ääntyy /fana/), kaksinkertainen
  omistusrakenne (*De Antonio sus amigos*) ja artikkelin
  käyttäminen etunimen edellä. Alueella puhutaan myös iquiton,
  yaguan ja ese ejjan kieliä. ("Iquitos", Language)
- **Ruoka**: *juane* on Perun viidakon pääruokia ja sitä syödään
  erityisesti **San Juanin päivänä 24. kesäkuuta**; nimi on annettu
  Johannes Kastajan mukaan, ja ruoka voi olla esikolumbiaanista
  alkuperää. *Tacacho* tehdään paistetuista, chicharrónien kanssa
  survotuista banaaniviipaleista ja tarjoillaan usein chorizon kanssa;
  sana tulee ketšuan ilmauksesta *taka chu*, "survottu". ("Iquitos",
  Cuisine)
- **Karnevaali**: helmikuussa, ja siinä kastellaan ihmisiä
  vesipalloilla tai muilla välineillä; osa käyttää maalia. Juhla
  saa vaikutteita Amazonian myyteistä. ("Iquitos", Culture)
- **Elokuva**: Iquitos on ollut näyttämönä muun muassa Werner Herzogin
  elokuville *Aguirre, Jumalan viha* (1972) ja *Fitzcarraldo* (1982),
  Armando Robles Godoyn elokuville sekä Antonio Wong Rengifon
  varhaisille dokumenteille (*Frente del Putumayo*, 1932). ("Iquitos",
  Cinema)
- **Ayahuasca** on nimetty kansalliseksi kulttuuriperinnöksi, ja
  mystiikkamatkailu on kasvanut. **Artikkeli varoittaa suoraan:
  shamaaneja ei valvota eikä kenelläkään ole todistusta
  pätevyydestään, ja kuolemantapauksia on raportoitu.** ("Iquitos",
  Spiritual tourism)
- Matkailu: 2010 noin 150 000 matkailijaa, 2011 luku putosi 46 000
  ulkomaiseen matkailijaan. ("Iquitos", Tourism)
- Yliopistot: Universidad Nacional de la Amazonía Peruana (UNAP) sekä
  kolme yksityistä. Kaupungissa on myös Perun Amazonian
  tutkimusinstituutti IIAP ja Cornellin yliopiston kenttäasema
  Yarapa-joen varrella (perustettu heinäkuussa 2001). ("Iquitos",
  Education)
- Arkkitehtuuri: kumibuumin rakennuksissa on **Italiasta ja
  Portugalista tuotuja keramiikkakaakeleita**. Perinteinen
  rakentaminen jakautuu kolmeen tyyppiin: *quincha* (paalut ja
  jättiruoko), poljettu maa ja adobe. **Noin 90 rakennusta on
  julistettu Loreton arkkitehtoniseksi perinnöksi.** ("Iquitos",
  Architecture)
- Urheilu: jalkapallo on suosituinta; Estadio Max Agustínissa on
  24 576 paikkaa. Iquitosin jalkapalloyhteisö sai **FIFA Fair Play
  -palkinnon 2005**, kun kaupunki oli yksi vuoden 2005 U17-MM-kisojen
  viidestä isäntäkaupungista. Rugby on Iquitosissa suositumpaa kuin
  muualla Perussa. ("Iquitos", Sport)
- Ystävyyskaupunkeja ovat muun muassa **Manaus** Brasiliassa ja
  Leticia Kolumbiassa. ("Iquitos", Twin towns)
