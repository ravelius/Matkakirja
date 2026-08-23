# Chicago — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `chicago`, en-Wikipedia "Chicago".
Kaikki tiedot haettu en-Wikipediasta 23.8.2026 (action=raw, uusinnat
kasvavalla viiveellä — MediaWikin coordinates-rajapinta antoi väliin
"too many requests" -vastauksia, 15–20 s uusintaviive korjasi joka
kerran). Malli ja mitat luettu tiedostoista `docs/aasia-tyoaineisto/
lehtityo-resepti.md` ja `docs/moduulit/kaupunkilehti.md`, esimerkkinä
`docs/mantereet-tyoaineisto/faktapohja-vancouver.md`. Kaupungin visa on
tarkistettu tiedostosta `js/packs/northamerica-questions.js` (kohta
`chicago`, viisi kysymystä: Michiganjärvi/"Tuulinen kaupunki",
pilvenpiirtäjä 1880-luvulla, rautateiden solmukohta, suurpalo 1871,
Chicago-joen kääntäminen 1900) — nämä viisi aihetta esiintyvät myös
tässä faktapohjassa, koska ne ovat kaupungin ydintarinaa eikä niitä voi
ohittaa, mutta jokaisessa kohdassa on käytetty tarkempia lukuja tai eri
näkökulmaa kuin visan lyhyt vastaus (ks. osio 7, kohta 1). Olemassa
olevat `js/packs/northamerica-valokuvat.js`:n ja
`js/packs/northamerica-saapumiset.js`:n chicago-lohkot on myös luettu
ristiriitojen varalta — niiden faktat (State Street 1900, "L"-metro,
joen kääntö, suurpalo) sopivat tähän faktapohjaan eivätkä ole
ristiriidassa.

Sisältölinjaus (Raamattu, pilari 3 — kunnioitus; docs/mantereet-
tyoaineisto/spec-mantereet.md kohta 1): alue oli Potawatomi-kansan
(ja sitä ennen Miami-, Sauk- ja Meskwaki-kansojen) aluetta ennen
kaupunkia, ja Potawatomi kuvataan myös nykyisenä, elävänä kansana —
ei vain 1800-luvun taustana. Siksi tälle erälle on oma teemasivu
`alkuperaiskansat`. Painotus on muuten 1873-henkisessä aineistossa:
Chicago paloi lokakuussa 1871 ja oli isoisän matkavuonna 1873 kesken
jälleenrakennuksen — kivestä ja tiilestä, EI vielä pilvenpiirtäjistä,
sillä ensimmäinen niistä (Home Insurance Building) valmistui vasta
1885. Tämä on kerrottu auki osiossa 7, kohta 2, jottei kirjoittaja
vahingossa sijoita pilvenpiirtäjiä isoisän aikaan.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Chicago"

**Johdanto (ehdotus, n. 195 merkkiä):**

> Michiganjärven rannalle nousi kaupunki nopeammin kuin mikään muu
> Yhdysvalloissa — ja paloi lähes kokonaan poroksi 1871. Kaksi vuotta
> myöhemmin se rakentaa itseään uudelleen kivestä ja raudasta.

### Sivu B — teemasivu, ehdotettu id `arkkitehtuuri`, nimi "Arkkitehtuuri"

**Perustelu valinnalle (ei vakioaihe `AIHE_IKONIT`-listalla, mutta
sama perusteltu poikkeus kuin Vancouverin `historia`-sivulla):**
Chicago on maailman pilvenpiirtäjäarkkitehtuurin syntypaikka —
Home Insurance Building (1885) ja Chicago School muuttivat sitä, miten
koko maailma rakentaa korkeasti. Aihe on omistajan tilauksessa
nimeltä mainittu vahvana teemana, eikä neljä kaupunkisivun nostoa
riitä sille: pelkkä ensimmäinen pilvenpiirtäjä, Chicago-ikkuna, joen
kääntäminen insinöörityönä ja jälleenrakennuksen huipentava
maailmannäyttely 1893 vaativat oman sivunsa.

**Johdanto (ehdotus, n. 193 merkkiä):**

> Suurpalon tuhkasta nousi uusi tapa rakentaa: teräsrunko kantoi
> seinien sijaan koko talon painon, ja kymmenen kerroksen rakennus
> muuttui mahdolliseksi. Chicago opetti maailmalle pilvenpiirtäjän.

### Sivu C — teemasivu, ehdotettu id `alkuperaiskansat`, nimi "Alkuperäiskansat"

**Perustelu valinnalle:** Ei vakioaihe, mutta sama perusteltu poikkeus
kuin Vancouverin vastaavalla sivulla ja spec-mantereet.md:n linjaus 1
("jokainen kansa asukkaidensa silmin... nykykulttuuri näytetään
elävänä"). Potawatomi ja Council of Three Fires -liittouma (Odawa,
Ojibwe, Potawatomi) asuttivat aluetta ennen kaupunkia, kaupungin nimi
tulee suoraan heidän kieleltään, ja heidät karkotettiin alueelta
1833 — mutta Potawatomi-kansoja on tänään elossa ja itsehallinnossa
sekä Yhdysvalloissa että Kanadassa, ja Chicagon oma alkuperäiskansojen
yhteisö (American Indian Center, per. 1953) on maan vanhin
kaupunkilainen intiaanikeskus. Aineisto kantaa oman sivunsa samalla
tavalla kuin Vancouverissa.

**Johdanto (ehdotus, n. 231 merkkiä):**

> Kaupungin nimi tulee Potawatomin kielisukulaiskielestä, villisipulin
> nimestä. Kansa karkotettiin alueelta 1833, mutta Potawatomin
> jälkeläiset elävät ja hallitsevat itseään yhä — myös Chicagossa,
> jonka intiaanikeskus on maan vanhin.

---

## 2. Kaksitoista nostoehdotusta (4 + 4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Villisipulin nimi ja kylä joka tuli kaupungiksi seitsemässä vuodessa" (n. 578 merkkiä)**

> Nimi Chicago on ranskalaistettu muoto Miami–Illinois-kielen sanasta
> šikaakwa, joka tarkoittaa villisipulia tai -valkosipulia — paikan
> nimi ensimmäistä kertaa kirjatussa muodossa "Checagou" jo 1679,
> kun ranskalainen La Salle mainitsi sen matkamuistiossaan.
> Ensimmäinen tunnettu pysyvä asukas oli kauppias Jean Baptiste Point
> du Sable, joka perusti asutuksen 1780-luvulla ja tunnetaan
> "Chicagon perustajana". Elokuussa 1833 paikka järjestäytyi noin
> 200 asukkaan kylänä; seitsemässä vuodessa väkiluku kasvoi yli
> 6 000:een, ja kaupunki perustettiin virallisesti 4. maaliskuuta
> 1837.

Faktat ja lähteet:
- Nimi Chicago on ranskalaistettu muoto Miami–Illinois-kielen sanasta
  šikaakwa (villisipuli/-valkosipuli, kasvitieteellisesti Allium
  tricoccum); ensimmäinen kirjattu maininta "Checagou" on René-Robert
  Cavelier de La Sallen muistiosta noin 1679. — en-Wikipedia "Chicago"
  (Etymology and nicknames)
- Jean Baptiste Point du Sable, todennäköisesti nykyisen Haitin
  alueelta lähtöisin oleva kauppias, perusti asutuksen 1780-luvulla ja
  tunnetaan yleisesti "Chicagon perustajana". — en-Wikipedia "Chicago"
  (18th century: Potawatomi, Jean Baptiste Point du Sable)
- Elokuun 12. päivänä 1833 Chicagon kaupunki (Town of Chicago)
  järjestäytyi noin 200 asukkaan yhteisönä; seitsemässä vuodessa
  väkiluku kasvoi yli 6 000:een. City of Chicago perustettiin
  virallisesti 4.3.1837. — en-Wikipedia "Chicago" (1800–1849: Indian
  removal, first railroad and canal)

**Nosto K2 — "Kaupunki joka paloi ja jäi silti pystyyn vesitorninsa varaan" (n. 629 merkkiä)**

> Suurpalo syttyi 8. lokakuuta 1871 illalla DeKoven Streetillä —
> perimätiedon mukaan O'Learyn perheen navetasta — ja kuiva kesä sekä
> lounaistuuli levittivät sen yli Chicago-joen kahdesti seuraavan
> vuorokauden aikana. Palo tuhosi yli 17 000 rakennusta ja jätti noin
> 90 000 ihmistä, lähes kolmasosan silloisesta 324 000 asukkaasta,
> kodittomaksi. Lähes kaikki tuhoalueen julkiset rakennukset paloivat,
> mutta yksi selvisi: 1869 valmistunut vesitorni jäi pystyyn viereisten
> talojen palaessa maan tasalle, vaikka sen oma pumppuasema tuhoutui
> ja lakkasi pumppaamasta sammutusvettä. Tornista tuli myöhemmin
> kaupungin selviytymisen symboli.

Faktat ja lähteet:
- Suurpalo (Great Chicago Fire) syttyi 8.10.1871 illalla DeKoven
  Streetillä; perimätiedon mukaan O'Learyn perheen navetasta (naudan
  potkaisema lyhty), mutta kaupunginvaltuusto vapautti Catherine
  O'Learyn virallisesti vastuusta 1997. — en-Wikipedia "Great Chicago
  Fire" (Origin)
- Palo tuhosi yli 17 000 rakennusta (infoboxissa 17 501) noin 3,3
  neliömailin (n. 8,5 km²) alueelta; ainakin 300 kuoli, ja 90 000
  ihmistä — noin 28 % silloisesta 324 000 asukkaasta — jäi
  kodittomaksi. — en-Wikipedia "Great Chicago Fire" (infobox,
  Aftermath)
- Vesitorni Michigan Avenuella (valm. 1869) oli ainoa palon
  tuhoalueen julkinen rakennus, joka selvisi pystyssä; sen viereinen
  pumppuasema kuitenkin syttyi ja lakkasi toimimasta kesken
  sammutuksen, joten torni ei itse pelastanut kaupunkia palolta —
  se vain jäi seisomaan. — en-Wikipedia "Chicago Water Tower"

**Nosto K3 — "Kymmenen kerroksen talo joka ei kaatunut" (n. 596 merkkiä)**

> Jälleenrakennuksen keskellä arkkitehti William Le Baron Jenney
> suunnitteli rakennuksen, jonka painosta kolmasosa kannettiin sisä-
> ja ulkopuolelta raudasta ja teräksestä valetulla rungolla eikä enää
> paksuilla kantavilla seinillä. Home Insurance Building valmistui
> 1885 kymmenkerroksisena — kaupungin virkamiehet keskeyttivät
> rakennustyöt hetkeksi tarkistaakseen rakenteen turvallisuuden, koska
> talo painoi niin vähän verrattuna kivirakennuksiin. Sitä pidetään
> usein maailman ensimmäisenä pilvenpiirtäjänä, vaikka osa
> arkkitehtuurin tutkijoista on 2010-luvulla kyseenalaistanut tittelin
> tarkkuuden.

Faktat ja lähteet:
- William Le Baron Jenney suunnitteli Home Insurance Buildingin 1884;
  rakennus valmistui 1885 alun perin kymmenkerroksisena (138 jalkaa,
  n. 42 m), kaksi kerrosta lisättiin 1891. — en-Wikipedia "Home
  Insurance Building" (infobox, History)
- Rakennus painoi vain kolmasosan vastaavan kivirakennuksen painosta;
  kaupungin virkamiehet keskeyttivät rakennustyöt tarkistaakseen
  rakenteen turvallisuuden. — en-Wikipedia "Home Insurance Building"
  (History)
- Rakennusta pidetään usein (mutta ei kiistattomasti) maailman
  ensimmäisenä pilvenpiirtäjänä; Chicago Tribune -arkkitehtuuri-
  kriitikko Blair Kamin kyseenalaisti tittelin tarkkuuden 2019
  artikkelissa, joka viittasi tutkimukseen aiemmista rautarunkoisista
  rakennuksista. — en-Wikipedia "Home Insurance Building" (Status as
  first skyscraper)

**Nosto K4 — "Yhdeksän rautatieyhtiön yhteinen karjapiha" (n. 531 merkkiä)**

> Yhdeksän rautatieyhtiön yhtymä osti 1864 noin 320 eekkeriä
> suoalueita kaupungin lounaispuolelta 100 000 dollarilla ja perusti
> Union Stock Yardsin, joka avautui jouluna 1865. Karjan määrä kasvoi
> nopeasti: vuonna 1870 pihalla käsiteltiin noin kaksi miljoonaa
> eläintä vuodessa, ja luku nousi yhdeksään miljoonaan vuoteen 1890
> mennessä. Rautateiden risteyskohta ja karjapihat yhdessä antoivat
> kaupungille runsaasti työtä ja lempinimen, jonka runoilija Carl
> Sandburg kiteytti 1916: "Hog Butcher for the World" — maailman
> sianteurastaja.

Faktat ja lähteet:
- Yhdeksän rautatieyhtiön konsortio ("Union"-nimen alkuperä) osti
  1864 noin 320 eekkeriä (n. 1,3 km²) suomaata lounaasta 100 000
  dollarilla; Union Stock Yards avautui jouluna 1865. — en-Wikipedia
  "Union Stock Yards" (lede, History)
- Eläinten käsittelymäärä kasvoi n. kahdesta miljoonasta vuonna 1870
  yhdeksään miljoonaan vuonna 1890; vuosina 1865–1900 pihalla
  teurastettiin arviolta 400 miljoonaa eläintä. — en-Wikipedia "Union
  Stock Yards" (History)
- Runoilija Carl Sandburg kutsui kaupunkia runossaan "Chicago" (1916)
  nimellä "Hog Butcher for the World" ("maailman sianteurastaja"),
  viitaten karjapihojen asemaan. — en-Wikipedia "Union Stock Yards"
  (lede)

### Teemasivu `arkkitehtuuri` — 4 nostoa

**Nosto A1 — "Talo joka purettiin toisen pilvenpiirtäjän tieltä" (n. 473 merkkiä)**

> Home Insurance Building seisoi La Salle- ja Adams-katujen kulmassa
> vuoteen 1931 asti, jolloin se purettiin Field Buildingin tieltä —
> kuudesta purettavasta rakennuksesta yksi. Uuden rakennuksen aulaan
> asetettiin 1932 pronssilaatta, joka nimittää Jenneyn "pilvenpiirtäjän
> todelliseksi isäksi". Chicagon lehdistö ei omana aikanaan kutsunut
> sitä ensimmäiseksi pilvenpiirtäjäksi — nimitys vakiintui vasta talon
> satavuotisjuhlan tienoilla 1985, sata vuotta valmistumisen jälkeen.

Faktat ja lähteet:
- Home Insurance Building purettiin 1931 kuuden rakennuksen joukossa
  Field Buildingin tieltä; 1932 aulaan asetettiin pronssilaatta, joka
  nimittää sen "pilvenpiirtäjän todelliseksi isäksi". — en-Wikipedia
  "Home Insurance Building" (Demolition and replacement)
- Aikalaislehdistö ei kutsunut rakennusta ensimmäiseksi
  pilvenpiirtäjäksi rakennusaikanaan; nimitys "ensimmäinen
  pilvenpiirtäjä" vakiintui vasta rakennuksen satavuotisjuhlan (1985)
  aikoihin. — en-Wikipedia "Home Insurance Building" (Status as first
  skyscraper)

**Nosto A2 — "Ikkuna joka kantoi Chicagon nimeä" (n. 560 merkkiä)**

> Chicago School -arkkitehdit — muun muassa Louis Sullivan, Daniel
> Burnham ja John Root — pukivat teräsrungon terrakotalaattoihin ja
> suuriin lasi-ikkunoihin, jotka toivat valoa entistä syvemmälle
> toimistoihin. Näin syntyi "Chicago-ikkuna": kolmiosainen ikkuna,
> jossa kiinteä keskiruutu ja kaksi avattavaa sivuruutua muodostivat
> katujulkisivuun toistuvan ruudukon. Vuonna 1886 valmistunut Rookery
> Building on yhä pystyssä La Sallella ja käytössä toimistorakennuksena
> — yksi harvoista, jotka voi nähdä kadulta samalla tavalla kuin
> isoisän lastenlapset näkivät sen.

Faktat ja lähteet:
- Chicago Schoolin tunnusmerkkejä olivat teräsrunko, terrakotaverhous
  ja suuret ikkuna-alat; arkkitehtien joukossa mainitaan mm. Louis
  Sullivan, Daniel Burnham, John Root ja William Le Baron Jenney. —
  en-Wikipedia "Chicago school (architecture)" (First Chicago School)
- "Chicago-ikkuna" on kolmiosainen ikkuna: kiinteä keskiruutu ja kaksi
  avattavaa sivuruutua, usein oriel-ikkunoina kadun puolella. —
  en-Wikipedia "Chicago school (architecture)" (First Chicago School)
- Rookery Building valmistui 1886 ja on listattu Chicago Schoolin
  esimerkkirakennukseksi; se on yhä käytössä. — en-Wikipedia "Chicago
  school (architecture)" (taulukko: Buildings in Chicago)

**Nosto A3 — "Joki jonka insinöörit käänsivät kahdesti" (n. 621 merkkiä)**

> Chicago-joki laski alun perin Michiganjärveen, mutta kaupungin
> jätevedet uhkasivat samaa järveä, josta juomavesi otettiin.
> Insinöörit yrittivät ensin 1871 syventää Illinois–Michigan-kanavaa
> niin, että virtaus kääntyisi poispäin järvestä — se onnistui, mutta
> vain yhden vuodenajan ajaksi. Pysyvä ratkaisu vaati uuden, isomman
> kanavan: Chicago Sanitary and Ship Canal valmistui 2. tammikuuta
> 1900 ja käänsi joen virtauksen pysyvästi kohti Mississippiä. Kun
> isoisä kulki kaupungissa 1873, ensimmäinen käännösyritys oli jo
> mennyt ohi ja joki virtasi taas vanhaan suuntaansa — pysyvä ratkaisu
> oli vielä lähes 30 vuoden päässä.

Faktat ja lähteet:
- Chicago-joki laski alun perin Lake Michiganiin; kaupungin
  jätevesipäästöt uhkasivat samasta järvestä otettavaa juomavettä. —
  en-Wikipedia "Chicago Sanitary and Ship Canal" (lede, History)
- Illinois and Michigan -kanavaa syvennettiin 1871 yrityksenä kääntää
  joen virtaus pois järvestä; käännös kesti vain yhden vuodenajan. —
  en-Wikipedia "Chicago Sanitary and Ship Canal" (History)
- Chicago Sanitary and Ship Canal valmistui ja avattiin 2.1.1900
  (täysi virtaus vasta 17.1.), kääntäen Chicago-joen virtauksen
  pysyvästi Mississippi-vesistöön päin. — en-Wikipedia "Chicago
  Sanitary and Ship Canal" (infobox, History)

**Nosto A4 — "Valkoinen kaupunki joka juhli jälleenrakennusta" (n. 568 merkkiä)**

> Vain 22 vuotta suurpalon jälkeen Chicago isännöi Kolumbuksen
> maailmannäyttelyä (World's Columbian Exposition) 1893 entisellä
> suoalueella nykyisessä Jackson Parkissa. Näyttely kattoi lähes 700
> eekkeriä, ja sitä kutsuttiin "Valkoiseksi kaupungiksi" uusien
> hehkulamppujen valaiseman neoklassisen arkkitehtuurinsa vuoksi.
> Näyttely veti puoleensa yli 27 miljoonaa kävijää kuuden kuukauden
> aikana — yhtenä ainoana päivänä, "Chicago Dayna", paikalla kävi
> ennätykselliset yli 751 000 ihmistä. Näyttelyä varten rakennettu
> jättiläismäinen maailmanpyörä oli ensimmäinen laatuaan.

Faktat ja lähteet:
- World's Columbian Exposition järjestettiin 1893 Jackson Parkissa,
  entisellä suoalueella; kattoi n. 690 eekkeriä (n. 2,8 km²) ja
  lähes 200 tilapäisrakennusta. Sitä kutsuttiin "Valkoiseksi
  kaupungiksi" hehkulampuin valaistun neoklassisen arkkitehtuurinsa
  vuoksi. — en-Wikipedia "World's Columbian Exposition" (lede,
  infobox)
- Näyttelyssä kävi yli 27 miljoonaa (infobox: 27,3 miljoonaa) kävijää
  kuuden kuukauden aikana; 9.10.1893 "Chicago Dayna" ulkoilmatapahtuman
  kävijäennätys oli 751 026 henkeä. — en-Wikipedia "World's Columbian
  Exposition" (lede, Attendance/legacy-kohta)
- Näyttelyn maailmanpyörä (Ferris Wheel) oli ensimmäinen laatuaan ja
  pelasti näyttelyn taloudellisesti vetovoimallaan. — en-Wikipedia
  "World's Columbian Exposition" (kohta rakentamisesta)

### Teemasivu `alkuperaiskansat` — 4 nostoa

**Nosto AK1 — "Neljä kansaa ennen kaupunkia" (n. 514 merkkiä)**

> 1700-luvun puolivälissä aluetta asutti Potawatomi-kansa, joka oli
> tullut alueelle Miami-, Sauk- ja Meskwaki-kansojen jälkeen.
> Potawatomi kuului yhdessä Odawan (Ottawa) ja Ojibwen (Chippewa)
> kanssa liittoumaan, jota kutsutaan Kolmen tulen neuvostoksi (Council
> of Three Fires) — nämä kolme kansaa allekirjoittivat yhdessä useita
> myöhempiä sopimuksia Yhdysvaltain kanssa, mukaan lukien kaksi
> Chicagon nimeä kantavaa sopimusta vuosina 1821 ja 1833. Kaupungin
> oma nimi periytyy suoraan tämän seudun asukkaiden kieleltä.

Faktat ja lähteet:
- 1700-luvun puolivälissä aluetta asutti Potawatomi, joka oli
  seurannut alueella aiemmin asuneita Miami-, Sauk- ja Meskwaki-
  kansoja. — en-Wikipedia "Chicago" (18th century: Potawatomi, Jean
  Baptiste Point du Sable)
- Odawa, Ojibwe ja Potawatomi tunnetaan yhdessä nimellä Council of
  Three Fires (Kolmen tulen neuvosto); kansat allekirjoittivat
  yhdessä mm. vuosien 1821 ja 1833 Chicagon sopimukset. — en-Wikipedia
  "Treaty of Chicago" (lede)

**Nosto AK2 — "Linnake joka tuhoutui kahdesti" (n. 637 merkkiä)**

> Yhdysvaltain armeija rakensi Fort Dearbornin Chicago-joen suulle
> 1803. Vuoden 1812 sodan aikana varuskunnan evakuointikolonnaa
> vastaan hyökkäsi noin 500 Potawatomi-soturia; hyökkäyksessä kuoli
> suurin osa siviileistä ja 54 sotilaasta. Potawatomi-päällikkö
> Mucktypoke (Musta peltopyy) oli neuvonut hyökkäystä vastaan
> etukäteen ja pelasti myöhemmin osan vangeista lunnaita vastaan
> pidetyistä siviileistä. Linnake rakennettiin uudelleen samalle
> paikalle 1816, mutta sen viimeisetkin jäänteet tuhoutuivat lopulta
> suurpalossa 1871 — sama palo, joka avasi tien pilvenpiirtäjille,
> pyyhkäisi pois myös kaupungin alkuperäisen linnoituksen muiston.

Faktat ja lähteet:
- Fort Dearborn rakennettiin 1803 Chicago-joen suulle; vuoden 1812
  sodan Battle of Fort Dearbornissa noin 500 Potawatomi-soturia
  johdolla Blackbird ja Nuscotomeg hyökkäsi evakuointikolonnaa vastaan,
  tappaen suurimman osan siviileistä ja 54 sotilasta. — en-Wikipedia
  "Potawatomi" (Chicago Potawatomi -osio); "Fort Dearborn" (lede)
- Potawatomi-päällikkö Mucktypoke (Black Partridge) oli neuvonut
  hyökkäystä vastaan ja pelasti myöhemmin lunnasvankeja. —
  en-Wikipedia "Potawatomi" (Chicago Potawatomi -osio)
- Fort rakennettiin uudelleen 1816 ja purettiin käytöstä 1837; sen
  viimeiset jäänteet tuhoutuivat suurpalossa 1871. — en-Wikipedia
  "Fort Dearborn" (lede)

**Nosto AK3 — "Sopimus joka lähetti kansan Mississipin taakse" (n. 490 merkkiä)**

> Vuoden 1833 Chicagon sopimuksessa Potawatomi, Odawa ja Ojibwe
> luovuttivat viimeiset maansa Illinoisin alueella Yhdysvalloille.
> Vastineeksi luvattiin uusia maita, vuosirahoja ja tarvikkeita, mutta
> ne saapuivat usein myöhässä tai vähennettyinä. Potawatomi siirrettiin
> pakolla Mississippi-joen länsipuolelle, ensin Kansasiin ja Nebraskaan
> ja lopulta Oklahomaan; siirtymää seurannut katolinen pappi Benjamin
> Petit kuvasi matkaa päiväkirjassaan, joka julkaistiin vasta yli
> sata vuotta myöhemmin.

Faktat ja lähteet:
- Vuoden 1833 Chicagon sopimuksessa Potawatomi luovutti Illinoisin
  maansa Yhdysvalloille; vastineeksi luvattiin uusia maita,
  vuosirahoja ja tarvikkeita, jotka usein myöhästyivät tai
  vähenivät. — en-Wikipedia "Potawatomi" (1800–1849: Indian removal
  -osio, tarkka teksti "1800–1849" jaksossa)
- Potawatomi siirrettiin pakolla Mississippin länsipuolelle (Kansas,
  Nebraska, lopulta Oklahoma); pappi Benjamin Petit seurasi Indianan
  Potawatomin "Trail of Death" -siirtoa 1838 ja piti päiväkirjaa, joka
  julkaistiin 1941. — en-Wikipedia "Potawatomi" (Bände-osio, teksti
  Treaty of Chicago -kohdassa)

**Nosto AK4 — "Kaupunki jossa yli viisikymmentä heimoa kokoontuu yhä" (n. 638 merkkiä)**

> American Indian Center perustettiin Chicagoon 1953, ja se on
> Yhdysvaltain vanhin kaupunkilainen intiaanikeskus — syntynyt
> vastauksena liittovaltion 1950-luvun uudelleensijoitusohjelmiin,
> jotka toivat kaupunkiin alkuperäiskansojen jäseniä ympäri maata.
> Keskus palvelee yli viidenkymmenen heimon jäseniä ja järjestää muun
> muassa vuosittaista pow-wow-juhlaa perustamisestaan lähtien.
> Vuonna 2024 Prairie Band Potawatomi Nation sai Yhdysvaltain
> sisäministeriöltä 130 eekkeriä maata DeKalb Countyssa, Illinoisissa,
> luottamukseen — ensimmäisenä ja ainoana liittovaltion tunnustamana
> heimokansakuntana Illinoisissa sitten 1800-luvun karkotusten.

Faktat ja lähteet:
- American Indian Center perustettiin Chicagoon 7.9.1953 vastauksena
  liittovaltion Indian termination -politiikkaan ja Indian Relocation
  Actiin (1956); se on Yhdysvaltain vanhin kaupunkilainen intiaani-
  keskus ja palvelee yli 50 heimon jäseniä. — en-Wikipedia "American
  Indian Center" (infobox, lede, Background, History)
- Keskuksen pisimpään jatkunut ohjelma on vuosittainen pow-wow, joka
  on järjestetty perustamisesta lähtien (60. pow-wow vuonna 2013). —
  en-Wikipedia "American Indian Center" (History)
- Yhdysvaltain sisäministeriö asetti 2024 muodollisesti 130 eekkeriä
  (n. 0,5 km²) DeKalb Countyssa, Illinoisissa, luottamukseen Prairie
  Band Potawatomi Nationin hyväksi — kansasta tuli ensimmäinen ja
  ainoa liittovaltion tunnustama heimokansakunta Illinoisissa sitten
  1800-luvun karkotusten. Maa-alue oli osa päällikkö Shab-eh-nayn
  1300 eekkerin maata, jonka Yhdysvallat takavarikoi 1830-luvulla
  hänen ollessaan poissa. — en-Wikipedia "Prairie Band Potawatomi
  Nation" (History)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja — ks. myös
osio 7, kohta 3 päällekkäisyyksistä maailmannäyttelyn kanssa.

**Jakso 1 — "Perille ja liikkeelle"**

Nykyään Chicagoon saavutaan yleensä O'Hare International Airportin
kautta, ja kaupungin sisällä liikkuu näyttävästi Chicagon "L" —
kohonneilla radoilla kulkeva pikaraitiotie, jonka keskustan silmukkaa
kutsutaan yksinkertaisesti Loopiksi. Silmukan nimestä on tullut koko
keskustan lempinimi: "the Loop" tarkoittaa puhekielessä yhtä lailla
rautatiesilmukkaa kuin sen sisään jäävää kaupunginosaa.

Faktat ja lähteet:
- Chicagon keskustaa kutsutaan "Loopiksi" kohonneiden ratojen
  muodostaman silmukan mukaan; alue on kaupungin ydinliike- ja
  hallintoalue. — en-Wikipedia "Chicago" (Topography, useita
  mainintoja)
- **HUOM:** tarkempia matkustajamääriä tai avaamisvuosia "L"-
  järjestelmälle ei ole tarkistettu tähän faktapohjaan erikseen —
  kirjoittaja voi hakea ne "Chicago 'L'" -artikkelista tarvittaessa.

**Jakso 2 — Alueen rakenne**

Chicago sijaitsee Illinoisin koillisosassa makean veden Michiganjärven
lounaisrannalla, Chicago-metropolialueen keskuksena sekä Keskilännen
että Suurten järvien alueella. Kaupunki lepää mannerten vedenjakajalla
juuri Chicago Portage -kohdassa, joka yhdistää Mississippi-joen ja
Suurten järvien vesistöt — tämä pieni maakannas teki paikasta
strategisen kauppareitin jo ennen eurooppalaisia.

Faktat ja lähteet:
- Chicago sijaitsee Illinoisin koillisosassa makean veden Michigan-
  järven lounaisrannalla ja on Chicago-metropolialueen keskuskaupunki,
  sekä Keskilännen että Suurten järvien alueella. — en-Wikipedia
  "Chicago" (Geography, Topography)
- Kaupunki lepää mannerten vedenjakajalla Chicago Portagen kohdalla,
  joka yhdisti Mississippi-joen ja Suurten järvien vesistöt. —
  en-Wikipedia "Chicago" (Topography)

**Jakso 3 — Arjen ilmiö: arkkitehtuurin risteily**

Suosittu tapa nähdä kaupunki on lähteä arkkitehtuuriristeilylle
Chicago-joella — sama joki, joka kerran uhkasi tukehduttaa kaupungin
jätevesiinsä, on nyt sen näyttävin näköalapaikka pilvenpiirtäjiin.
Risteilyt kulkevat joen pääuomaa ja molempia haaroja pitkin, ja opas
kertoo rakennus rakennukselta, kuka sen suunnitteli ja miksi.

Faktat ja lähteet:
- Arkkitehtuuriristeily Chicago-joella on suosittu matkailuaktiviteetti
  kaupungissa. — en-Wikipedia "Chicago" (Architecture)

**Jakso 4 — Historian käännekohta: Millennium Park**

Vuonna 2004 avattu Millennium Park nousi entisen rautatiepiha-alueen
paikalle Loopin laidalla — nelisen vuotta myöhässä ja alkuperäisen
150 miljoonan dollarin budjetin sijaan lopulta 475 miljoonaa dollaria
maksaneena. Puiston kiiltävä "Papu" (Cloud Gate) on noussut yhtä
tunnetuksi kaupungin symboliksi kuin veistoksen tekijä, brittiläinen
Anish Kapoor, saattoi toivoa — ja osa havainnoitsijoista pitää
puistoa kaupungin tärkeimpänä hankkeena sitten vuoden 1893
maailmannäyttelyn.

Faktat ja lähteet:
- Millennium Park avattiin juhlallisuuksin 16.7.2004, neljä vuotta
  myöhässä; alkuperäinen budjetti oli 150 miljoonaa dollaria, lopullinen
  kustannus 475 miljoonaa dollaria (kaupunki maksoi 270 miljoonaa,
  loput yksityiset lahjoittajat). — en-Wikipedia "Millennium Park"
  (lede, History)
- Osa havainnoitsijoista pitää Millennium Parkia kaupungin
  tärkeimpänä hankkeena sitten World's Columbian Expositionin (1893).
  — en-Wikipedia "Millennium Park" (Reception/Design-osio)
- Anish Kapoorin veistos Cloud Gate on noussut kaupungin symboliksi.
  — en-Wikipedia "Chicago" (Monuments and public art)

**Jakso 5 — Milloin kannattaa tulla**

Chicagon ilmasto on lämminkesäinen mannerilmasto (Köppen: Dfa) neljällä
selvällä vuodenajalla. Heinäkuun keskilämpötila on noin 24 °C,
iltapäivisin noin 29 °C, ja lämpötila nousee tavallisena kesänä
vähintään 32-asteiseksi 17 päivänä. Talvet ovat kylmiä ja lumisia;
joulu–maaliskuun normaali päivälämpötila on noin 2 °C.

Faktat ja lähteet: ks. osio 5 (Säätiedot) — samat luvut, samat
lähteet.

---

## 4. Kymmenen kohdekartan kohdetta

Koordinaatit haettu en-Wikipedian MediaWiki-rajapinnasta
(`action=query&prop=coordinates`, redirects=1) 23.8.2026 (rajapinta
vastasi väliin "too many requests" -virheellä, 15–20 s uusintaviive
korjasi joka kerran). Etäisyydet ovat OMIA LASKELMIANI koordinaatti-
eroista (asteet × 111 km, pituusasteille kerrottu cos(41,88°) ≈ 0,744),
tarkistettu Python-skriptillä.

| # | Nimi suomeksi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta keskustasta (oma laskelma) |
|---|---|---|---|---|
| 1 | Chicago, kaupungin keskipiste | 41,8819°N 87,6278°W | "Chicago" | (keskipiste) |
| 2 | Fort Dearborn -alkuperäispaikka (nyk. DuSable Bridge) | 41,8881°N 87,6239°W | "Fort Dearborn" | ~0,8 km koilliseen |
| 3 | Suurpalon 1871 syttymispaikka, DeKoven Street | 41,8690°N 87,6415°W | "Great Chicago Fire", "DeKoven Street" | ~1,8 km lounaaseen |
| 4 | Chicago Water Tower (palon selvinnyt vesitorni) | 41,8972°N 87,6244°W | "Chicago Water Tower" | ~1,7 km pohjoiseen |
| 5 | Home Insurance Buildingin tontti (nyk. Field Building) | 41,8796°N 87,6320°W | "Home Insurance Building" | ~0,4 km lounaaseen |
| 6 | Rookery Building (Chicago School, 1886) | 41,8791°N 87,6321°W | "Rookery Building" | ~0,5 km lounaaseen |
| 7 | Willis Tower (ent. Sears Tower) | 41,8789°N 87,6358°W | "Willis Tower" | ~0,7 km lounaaseen |
| 8 | Union Stock Yard Gate (1875) | 41,8186°N 87,6485°W | "Union Stock Yard Gate" | ~7,2 km etelään |
| 9 | Chicago Portage (alkuperäiskansojen kantopaikka) | 41,8372°N 87,7022°W | "Chicago Portage" | ~7,9 km lounaaseen |
| 10 | Millennium Park / Cloud Gate | 41,8825°N 87,6225°W | "Millennium Park" | ~0,4 km itään |

**Rajausehdotus:** Kohteet 1–7 ja 10 mahtuvat n. 2 km × 2 km alueeseen
Loopin ympärillä (tiiviimpi kuin Vancouver-mallissa). Kohteet 8
(Union Stock Yard Gate) ja 9 (Chicago Portage) ovat 7–8 km keskustasta
lounaaseen/etelään — molemmat ovat olennaisia (8 nostolle K4, 9
alkuperäiskansat-sivun tarinalle), joten sama ratkaisu kuin Vancouver-
mallissa: joko oma zoomaustaso tai hyväksytään väljempi kokonaisrajaus.
Amerikan Intiaanikeskusta (AIC, nyk. Albany Park) EI ole tässä
listassa — en-Wikipedian artikkelilla ei ole koordinaatteja, ja
tarkka osoite on vain keskuksen omalla verkkosivulla, jota ei ole
tarkistettu tähän faktapohjaan (ks. osio 7, kohta 6).

---

## 5. Säätiedot

- **Keskustan koordinaatit:** 41,8819°N, 87,6278°W. — en-Wikipedia
  "Chicago"
- **Köppen-luokka:** Dfa (lämminkesäinen mannerilmasto), neljä selvää
  vuodenaikaa. — en-Wikipedia "Chicago" (Climate)
- **Lämpötila:** heinäkuun vuorokausikeskiarvo n. 24,1 °C (75,4 °F),
  iltapäivähuippu n. 29,2 °C (84,5 °F); tavallisena kesänä lämpötila
  nousee vähintään 32,2 °C:seen (90 °F) 17 päivänä. Joulu–maaliskuun
  normaali päivälämpötila n. 2,2 °C (36 °F). — en-Wikipedia "Chicago"
  (Climate)
- **Ennätykset:** korkein virallinen lämpötila 40,6 °C (105 °F)
  24.7.1934; alin −32,8 °C (−27 °F) 20.1.1985. Midway-lentokentällä
  mitattiin 1995 helleaallon aikana 42,8 °C (109 °F) ja lämpöindeksi
  51,7 °C (125 °F). — en-Wikipedia "Chicago" (Climate)
- **Sade ja ukkonen:** valtaosa sateesta tulee ukkoskuuroista,
  keskimäärin 38 ukkospäivää vuodessa. — en-Wikipedia "Chicago"
  (Climate)
- **HUOM:** samoin kuin muissa uusissa erissä, yllä olevat luvut ovat
  en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin pelin
  `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali eikä
  tarkka vuotuinen sademäärä tai lumimäärä (Chicago-weatherbox-
  malline ei tullut mukaan raakatekstin haussa). Tarkat kuukausi-
  normaalit haetaan kirjoitusvaiheessa `tools/hae-saanormaalit.mjs`
  -työkalulla.

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

Erityishuomio: Loopin ja Michigan Avenuen katukuvat ovat täynnä
ihmisiä ja liikennettä — valitse kuvakulma, joka näyttää arkkitehtuurin
tai kaupunkinäkymän kokonaisuutena, ei yksilöityjä kasvoja.
Potawatomi-aiheisissa kuvissa vältä pelkkää 1800-luvun kuriositeetti-
kehystä (vain historialliset regalia-esineet vitriinissä) — tasapainota
nykyaikaisilla kuvilla American Indian Centerin toiminnasta tai
pow-wow-juhlasta, jos sellaisia löytyy Commonsista lisenssiehdot
täyttävinä.

**Avauskuvat (3), ehdotus:**
1. Loopin pilvenpiirtäjäsiluetti Michiganjärveltä tai puistosta
   kuvattuna.
2. Chicago-joki keskustan läpi, arkkitehtuuriristeilyvene näkyvissä.
3. Water Tower Michigan Avenuen ympäristössä.

**Kansikuvat (3), ehdotus:**
1. Downtown Chicagon siluetti Michiganjärveltä.
2. Cloud Gate (Millennium Park) heijastaen ympärillään pilvenpiirtäjiä.
3. Chicago-joen mutka Loopin läpi, sillat ja pilvenpiirtäjät
   molemmin puolin.

**Commons-kategoriat kuvahakuun (tarkistettu commons.wikimedia.org
API:lla 23.8.2026, sisältö silti aina katsottava silmin lisenssien
mukaisesti):**
- `Category:Great Chicago Fire` — historiallinen kuvasto suurpalosta
- `Category:Chicago in the 1870s` — 1870-luvun yleiskuvasto,
  jälleenrakennusaika
- `Category:Home Insurance Building` — ensimmäinen pilvenpiirtäjä
  (vain historiallisia kuvia, rakennus purettu 1931)
- `Category:Rookery Building` — Chicago School, yhä pystyssä
- `Category:Chicago Water Tower` — palon selvinnyt vesitorni
- `Category:Union Stock Yards` — karjapihat, historiallinen ja
  nykyinen aineisto
- `Category:Fort Dearborn` — linnakkeen historia ja nykyinen
  muistomerkki
- `Category:World's Columbian Exposition` — 1893 maailmannäyttely
  ("Valkoinen kaupunki")
- `Category:Chicago Loop` — nykyinen keskusta-alue
- `Category:Willis Tower` — nykyinen pilvenpiirtäjäperintö
- `Category:Skyscrapers in Chicago` — laaja yläkategoria
  pilvenpiirtäjäarkkitehtuurille
- `Category:Chicago River` — joki, risteilyt, sillat
- `Category:Potawatomi` — Potawatomi-kansan aineisto (regalia,
  nykyiset heimot)
- `Category:Native Americans of Illinois` — laajempi yläkategoria
- `Category:American Indian Center` — Chicagon oma intiaanikeskus
  (HUOM: ei koordinaatteja artikkelissa, ks. osio 7 kohta 6)
- `Category:Chicago Portage National Historic Site` — kantopaikan
  nykyinen historiallinen kohde
- **Ei löytynyt:** `Category:Chicago School (architecture)`,
  `Category:Chicago window` ja `Category:DeKoven Street` eivät ole
  omia Commons-kategorioita (tarkistettu 23.8.2026) — Chicago School
  -aiheiset kuvat löytyvät yksittäisten rakennusten kategorioista
  (esim. Rookery, Home Insurance Building) tai laajemmasta
  `Category:Skyscrapers in Chicago` -kategoriasta.

**Nosto-/jaksokuvat, aihe-ehdotuksia (ei tiedostonimiä):**
1. Historiallinen valokuva suurpalon raunioista 1871 (esim.
   Dearborn/Monroe-kadun kulmasta, kuten en-Wikipedian artikkelissa
   kuvattu).
2. Home Insurance Building 1920-luvun valokuvassa (kahden lisäkerroksen
   jälkeen).
3. Rookery Buildingin katujulkisivu, Chicago-ikkunat näkyvissä.
4. Union Stock Yards -aikakauden valokuva (esim. lintuperspektiivi
   1890-luvulta) tai portin (Union Stock Yard Gate) nykykuva.
5. World's Columbian Expositionin "Valkoinen kaupunki" -aikakauden
   valokuva (esim. Court of Honor).
6. Fort Dearborn -piirros tai -kartta (alkuperäinen linnake tuhoutui
   jo 1871, joten vain historiallista kuvamateriaalia löytyy).
7. Potawatomi-regalia Field Museumissa TAI nykyaikainen kuva American
   Indian Centerin pow-wow-juhlasta, jos lisenssiehdot täyttävä kuva
   löytyy.
8. Millennium Park / Cloud Gate nykykuva, mieluiten laaja yleiskuva
   eikä pelkkä lähikuva heijastuksesta.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Viisi nostoa/jaksoa liikkuu lähellä visan aiheita, mutta ei anna
   vastausta suoraan.** Visa kysyy (a) Michiganjärvestä ja "Tuulisesta
   kaupungista", (b) pilvenpiirtäjästä 1880-luvulla (Home Insurance
   Building 1885), (c) Chicagon asemasta rautateiden solmukohtana,
   (d) suurpalosta 1871, (e) Chicago-joen kääntämisestä 1900. K3
   käyttää tarkempia lukuja (rakennuksen paino, keskeytetty
   rakennuslupa) kuin visan yleisluontoinen "ensimmäinen teräsrunkoinen
   korkea rakennus" -vastaus; K4 käyttää tarkkoja lukuja (yhdeksän
   rautatieyhtiötä, 320 eekkeriä, kaksi vs. yhdeksän miljoonaa
   eläintä) visan "vilja ja liha itärannikolle" -sanamuodon sijaan;
   K2 keskittyy vesitornin kohtaloon eikä toista visan "suurpalo
   tuhosi puisen keskustan" -sanamuotoa suoraan; A3 käyttää molempia
   käännösyrityksiä (1871 ja 1900) visan pelkän "vuonna 1900" -vastauksen
   sijaan. "Tuulinen kaupunki" -lempinimen alkuperää EI ole käytetty
   sellaisenaan yhdessäkään nostossa — ks. kohta 4 alla, koska aihe
   on itse asiassa kiistanalainen.
2. **Isoisän matkavuonna 1873 kaupunki oli kesken jälleenrakennuksen,
   EI vielä pilvenpiirtäjien aikakautta.** Suurpalo oli lokakuussa
   1871, ja ensimmäinen pilvenpiirtäjä (Home Insurance Building)
   valmistui vasta 1885 — 12 vuotta isoisän matkan jälkeen. Vuonna
   1873 Chicago rakensi itseään uudelleen kivestä ja tiilestä, ei
   vielä teräsrungoista. Tämä on kerrottu auki tiedoston alussa ja
   kaupunkisivun johdannossa, jottei kirjoittaja vahingossa laita
   pilvenpiirtäjiä isoisän silmien eteen. Sama koskee joen kääntämistä:
   1873 pysyvä ratkaisu oli vielä 27 vuoden päässä, ja ensimmäinen
   (1871) käännösyritys oli juuri lakannut toimimasta.
3. **World's Columbian Exposition (1893) esiintyy sekä nostossa A4
   että jaksossa 4 (Millennium Park), mutta eri faktoilla.** A4
   keskittyy itse näyttelyyn (kävijämäärät, Valkoinen kaupunki,
   maailmanpyörä); jakso 4 käyttää näyttelyä vain vertailukohtana
   Millennium Parkin merkitykselle ("tärkein hanke sitten 1893") eikä
   toista A4:n lukuja. Sama koskee Chicago-jokea: A3-nosto käsittelee
   joen kääntämisen insinöörityötä (1871/1900), jakso 3 käyttää jokea
   vain nykyisen matkailuaktiviteetin (arkkitehtuuriristeily)
   kehyksenä eikä toista käännöslukuja.
4. **"Tuulinen kaupunki" -lempinimen alkuperä on kiistanalainen, ja
   pelin nykyinen visa-fact yksinkertaistaa sen.** `northamerica-
   questions.js`:n chicago-kysymyksen fact-kenttä sanoo suoraan, että
   "Järveltä puhaltava tuuli tekee talvista purevia" selittäisi
   lempinimen. En-Wikipedian oma "Windy City (nickname)" -artikkeli
   esittää NELJÄ kilpailevaa selitystä (sää, Cincinnati-kilpailu
   1876, maailmannäyttelymyytti, politiikka) ja toteaa suoraan, ettei
   Chicago ole erityisen tuulinen kaupunki muihin USA:n kaupunkeihin
   verrattuna (keskituulennopeus 10,3 mph, vähemmän kuin esim.
   Bostonin 12,4 mph) — säähän perustuva selitys on vain yksi neljästä
   teoriasta, ei vahvistettu tosiasia. Tätä ei ole korjattu itse
   visakysymykseen (ei kuulu tämän faktakoostajan toimeksiantoon), mutta
   kirjoittajan kannattaa TIETÄÄ tämä eikä vahvistaa myyttiä uudessa
   leipätekstissä ilman varausta, jos aihe nousee esiin.
5. **Suurpalon kodittomien lukumäärä vaihtelee lähteen mukaan:**
   en-Wikipedian "Chicago"-yleisartikkeli sanoo "yli 100 000", kun
   taas oma "Great Chicago Fire" -erikoisartikkeli antaa tarkemman
   luvun 90 000 (noin 28 % tuolloisesta 324 000 asukkaasta) ja
   perustelee sen laskun. K2-nosto käyttää tarkempaa, laskettua lukua
   (90 000) tarkemman lähteen periaatteella (sama käytäntö kuin
   Vancouver-faktapohjassa, "koordinaatit voittavat leipätekstin
   etäisyysarviot" -ennakkotapaus laajennettuna lukuihin yleisesti).
6. **American Indian Centerillä ei ole koordinaatteja en-Wikipediassa**
   (tarkistettu 23.8.2026) — artikkelin infobox-koordinaattikenttä on
   tyhjä, ja tarkka osoite (Albany Park) on vain keskuksen omalla
   verkkosivulla, jota tämä faktapohja ei ole käyttänyt lähteenä.
   Siksi keskusta EI ole kohdekartan listalla osiossa 4. Jos
   kirjoittaja haluaa sen kartalle, tarkka osoite on tarkistettava
   erikseen keskuksen omalta sivulta tai muulta luotettavalta
   lähteeltä ennen julkaisua.
7. **Council of Three Fires -liittouman tarkkaa perustamisajankohtaa
   EI ole käytetty tässä faktapohjassa.** En-Wikipedian oma
   "Council of Three Fires" -artikkelin infobox antaa perustamis-
   vuodeksi 796 ja päättymisvuodeksi 1740-luvun, mutta nämä
   perustuvat suulliseen perimätietoon eivätkä ole samalla tavalla
   tarkistettavissa kuin muut tämän faktapohjan päivämäärät — siksi
   nostot AK1–AK3 kuvaavat liittoumaa vain nimeltä ja sen jäsenten
   yhteisinä sopimuksina (1821, 1833) sitomatta sitä tarkkaan
   perustamisvuoteen.
8. **Vain en-Wikipediaa ja sen MediaWiki-rajapintaa sekä Wikimedia
   Commonsin hakurajapintaa (kategorioiden olemassaolon tarkistukseen)
   on käytetty.** Ei ulkopuolisia hakuja tämän faktapohjan sisältöön.
9. **Ei nykysotaa eikä nykypolitiikkaa käsitelty.** 1900-luvun
   työväenliikkeen (Haymarket 1886, Pullman-lakko 1894) kaltaiset
   raskaammat aiheet löytyvät en-Wikipedian "Chicago" § 1875–1899
   -osiosta, mutta niitä ei ole nostettu tähän faktapohjaan — ne eivät
   osu 1873-painotukseen eivätkä ole tarpeen kaupunkilehden 12
   nostolle. Jos kirjoittaja haluaa käsitellä niitä, artikkeli on
   olemassa mutta EI ole tarkistettu tätä faktapohjaa varten
   yksityiskohtaisesti.
10. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi** merkkimäärävaatimusten mukaan (johdannot 193–231 mrk,
    kaikki 154–232-rajan sisällä; nostot 473–638 mrk, kaikki
    440–660-rajan sisällä) ja tarkistettu koneellisesti Python-
    skriptillä (blockquote-tekstit poimittu ja laskettu erikseen).
