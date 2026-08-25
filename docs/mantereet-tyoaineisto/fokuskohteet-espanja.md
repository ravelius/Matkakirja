# Espanjan fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin. Kaikki tiedot koottu 25.8.2026.
Sisarpaperi: docs/mantereet-tyoaineisto/fokuskohteet-italia.md, jonka
rakennetta tämä noudattaa. Täkyaineisto: takyt-madrid.md.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohdat
KOHDEKOROSTUS ja ETENEMINEN): pelilaattojen lisäksi fokusnäkymän
kartalla näkyy muita kaupunkeja, jokia, järviä ja vuoria; aarteen
löydyttyä niitä voi klikata, jolloin kartta korostaa juuri sen kohteen
niukalla taustalla ja avaa pienen pop-up-tietoruudun. Tämä dokumentti
on faktapohja niille pop-up-teksteille — ei lopullista pelitekstiä
eikä UI-suunnitelmaa.

## Espanjan pelilaatat — mitä kartalla JO on

js/packs/europe.js ja js/packs/maailmankartta.js: Espanjan pelattavat
laatat ovat **Madrid** (europe.js 140, 831 / maailmankartta 5709,7,
1787 — lentokenttä), **Barcelona** (244, 800 / 5890,3, 1740,3),
**Granada** (142, 916 / 5713,2, 1912,8) ja **Sevilla**. Espanjalla on
maailmankartalla oma maapolygoni (`"ESP"`, keskus [5733,3, 1803,8],
leveys 416). Reitit: madrid–lissabon (3), madrid–barcelona (3),
madrid–granada (3), sevilla–granada (2), sevilla–madrid (3), meritse
barcelona–rooma (4). Lentoreitit lontoo–madrid ja madrid–rooma.

**Alla olevat kohteet on valittu niin, ETTEIVÄT ne ole pelilaattoja:
yksikään ei ole Madrid, Barcelona, Granada tai Sevilla.** Alhambra,
Sagrada Família ja Sevillan katedraali on siis jätetty pois
tarkoituksella — ne kuuluvat laattojen omaan sisältöön
(js/packs/europe-artikkelit.js: `Granada`, `Sevilla`). Doñana on mukana
omana kohteenaan, vaikka se sijaitsee Sevillan ja Huelvan välissä: se
on eri asia kuin Sevilla-laatta.

## Tarkistustapa

- **Koordinaatit:** en- ja es-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates`, `redirects=1`), haettu 25.8.2026
  `NODE_USE_ENV_PROXY=1`-ympäristössä User-Agent-otsakkeen kanssa.
  Rajapinta vastasi toistuvasti 429:llä; haut uusittiin kasvavalla
  viiveellä (6 s → 12 s → 24 s → 48 s). **EI yhtään koordinaattia
  muistista.** Yksi koordinaatti (Doñana) on rajapinnan antama
  pyöristetty likiarvo ja merkitty erikseen; yksi kohde (Bilbao)
  saa kaksi koordinaattia, kaupungin ja sen popup-faktan kohteen.
- **Popup-faktat:** en-Wikipedian artikkeleista
  (`prop=extracts&explaintext=1`, johdanto ja tarvittaessa nimetty
  alaotsikko). Jokaisen kohdan alla on artikkeli JA se osio, johon
  väite nojaa.
- **Kuvat:** jokaisen ehdotetun TIEDOSTON olemassaolo, koko, lisenssi,
  tekijä ja **Restrictions-kenttä** on tarkistettu Commonsin
  `imageinfo`-rajapinnalla (`iiprop=url|size|extmetadata`). Ei
  arvattuja tiedostonimiä. Kaikki ehdotetut ovat PD, CC0 tai
  CC BY / CC BY-SA, ja kaikkien Restrictions on tyhjä; tekijä on
  merkitty, koska CC BY vaatii maininnan.
- **SILMÄTARKISTUS** on merkitty jokaiseen kuvaan, jossa on tai voi
  olla tunnistettavia eläviä henkilöitä.
- **HERKKYYS** on merkitty kohtiin, joissa aihe vaatii Raamatun
  Perustuslain pilarin 3 mukaista kohtelua (kuvataan ilmiönä, ei
  ihannoida eikä tuomita). Espanjassa tämä koskee ennen kaikkea
  **härkätaistelua** (kohde 14) ja **Espanjan siirtomaahistoriaa**
  (kohteet 7 ja 9 sivuavat).

## 1873-linja tässä paperissa

Isoisän matkavuosi oli Espanjan ensimmäisen tasavallan vuosi (ks.
takyt-madrid.md). **Kolme kohdetta kantaa 1873-ankkuria suoraan:**
#7 Cartagena (kantonikapina 12.7.1873), #8 Bilbao (kolmas
karlistisota kävi Biskajassa) ja #10 Altamira (löydetty 1868,
tunnistettu vasta 1879, tunnustettu 1902 — isoisä matkusti tasan
väliin). Muut kohteet ovat maantiedettä ja kulttuuria; kaikkien
popup-teksteissä on kuitenkin vähintään yksi päivätty tapahtuma,
jotta kartta elää ajassa eikä ole museo.

---

## Kohteet

### 1. Toledo

- **Nimi:** Toledo (sama suomeksi). Paikallinen: Toledo; arabiaksi
  historiallisesti Tulaytulah.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 39,85666667°N, −4,02444444°E — en-Wikipedia
  "Toledo, Spain".
- **Popup-teksti (n. 420 merkkiä):**

  > Toledo oli Espanjan pääkaupunki ennen Madridia. Kun Filip II siirsi
  > hovinsa Madridiin 1561, kaupunki alkoi hitaasti hiipua eikä
  > toipunut koskaan. Se jäi elämään teräksestä: Toledon miekkoja
  > tehtiin jo roomalaisten aikaan, ja Kaarle III kokosi kaupungin
  > seppäkillat vuonna 1761 yhteen kuninkaalliseen asetehtaaseen, joka
  > kasvoi omaksi kaupungikseen kaupungin sisään. Isoisän matkavuonna
  > se teki aseita kahteen sotaan yhtä aikaa.

- **Lähde:** en-Wikipedia "Toledo, Spain", osiot taloudesta ja
  "Toledo steel" ("The manufacture of swords in the city of Toledo goes
  back to Roman times... In the late 17th and early 18th century,
  production began to decline, prompting the creation of the Royal Arms
  Factory in 1761 by order of King Charles III... Its importance was
  such that it eventually developed into a city within the city of
  Toledo"; "Toledo has been a traditional sword-making, steel-working
  centre since about 500 BCE, and came to the attention of Rome when
  used by Hannibal in the Punic Wars") sekä osio pääkaupungin
  menetyksestä ("When Philip II moved the royal court from Toledo to
  Madrid in 1561, the old city went into a slow decline from which it
  never recovered"). Virke kahdesta sodasta on **oma
  ajoituspäätelmäni** (kolmas karlistisota 1872–76 ja Kuuban
  kymmenvuotinen sota 1868–78 olivat molemmat käynnissä 1873; ks.
  takyt-madrid.md täky 7) — merkitse se, jos käytät.
- **Kuva:** Commons **Tagus Toledo June 2016 panorama.jpg**
  (7800×2400, CC BY-SA 4.0, King of Hearts, 15.6.2016) — koko kaupunki
  Tajon mutkassa. Restrictions tyhjä.
- **VAIHTOEHTOINEN KOUKKU, jos halutaan valo eikä teräs:** Toledon
  katedraalissa on barokkialttari *El Transparente*, jonka läpi
  paistaa **muutaman minuutin ajan joka päivä** valonsäde — siitä
  nimi. Sama lähde, osio katedraalista.

### 2. Segovian akvedukti

- **Nimi:** Segovian akvedukti. Paikallinen: Acueducto de Segovia.
- **Tyyppi:** roomalainen vesijohtosilta.
- **Koordinaatit:** 40,9479°N, −4,1178°E — en-Wikipedia "Aqueduct of
  Segovia".
- **Popup-teksti (n. 430 merkkiä):**

  > Segovian akvedukti tuo vettä 17 kilometrin päästä vuorilta, ja se
  > on rakennettu **ilman laastia**: pelkkiä graniittilohkareita
  > päällekkäin. Kaaria on 167 ja korkeimmillaan rakennelma yltää 28,5
  > metriin. Rakennusvuotta ei tiedetty pitkään, koska pronssiset
  > kirjaimet oli varastettu — vasta 1900-luvun lopulla Géza Alföldy
  > luki tekstin **kirjainten kiinnitysrei'istä**. Ja tässä on
  > tärkein: akvedukti toi Segovialle vettä **vuoteen 1973 asti**.

- **Lähde:** en-Wikipedia "Aqueduct of Segovia", johdanto ja osiot
  "History", "Description", "Subsequent" ("built around the first
  century AD to channel water from springs in the mountains 17
  kilometres to Segovia's fountains, public baths and private houses,
  **in use until 1973**"; "its complete arcade of 167 arches"; "At its
  tallest, the aqueduct reaches a height of 28.5 m"; "The aqueduct is
  built of unmortared, brick-like granite blocks"; "At the end of the
  20th century Géza Alföldy deciphered the text on the dedication
  plaque by studying the anchors that held the now-missing bronze
  letters in place. He determined that Emperor Domitian (81–96 AD)
  ordered its construction and proposed 98 AD").
- **Kuva:** Commons **Acueducto, Segovia, España, 2024-06-14, DD
  18.jpg** (8339×5559, CC BY-SA 4.0, Diego Delso, 14.6.2024).
  Restrictions tyhjä. **HUOM SILMÄTARKISTUS:** akvedukti on
  turistikohteen keskellä; tarkista silmällä, ettei etualalla ole
  tunnistettavia ihmisiä.
- **RISTIRIITA MERKITTÄVÄ:** rakennusvuodesta on kaksi kilpailevaa
  tulosta samassa artikkelissa: Alföldyn Domitianus/98 jaa. ja
  vuoden 2016 arkeologinen aineisto, joka viittaa **vuoden 112
  jälkeiseen** aikaan (Traianus tai Hadrianus 117 alkaen).
  **Älä anna vuosilukua**; sano "ensimmäisellä vuosisadalla" tai
  "roomalaisten aikaan".

### 3. Córdoban moskeijakatedraali

- **Nimi:** Córdoban moskeijakatedraali. Paikallinen:
  Mezquita-Catedral de Córdoba, arkikielessä *la Mezquita*.
- **Tyyppi:** moskeija ja katedraali samassa rakennuksessa.
- **Koordinaatit:** 37,87916667°N, −4,77972222°E — en-Wikipedia
  "Mosque–Cathedral of Córdoba".
- **Popup-teksti (n. 420 merkkiä):**

  > Kun Abd al-Rahman I halusi paikan uudelle moskeijalle vuonna 785,
  > hän **osti** sen: kristityiltä ostettiin heidän puolikkaansa
  > yhteiskäytössä olleesta kirkosta sadallatuhannella dinaarilla, ja
  > vastineeksi he saivat luvan rakentaa kirkkoja kaupungin muurien
  > ulkopuolelle. Seuraajat laajensivat rakennusta 900-luvun loppuun
  > asti. Vuonna 1236 se muutettiin katedraaliksi, ja 1500-luvulla sen
  > keskelle rakennettiin renessanssikirkko. Messu pidetään yhä
  > päivittäin.

- **Lähde:** en-Wikipedia "Mosque–Cathedral of Córdoba", johdanto ja
  osio rakennushistoriasta ("This sharing arrangement of the site
  lasted until 785, when the Christian half was purchased by Abd
  al-Rahman I, for a hundred thousand dinars... In return, Abd
  al-Rahman also allowed the Christians to build or rebuild some
  churches outside the city walls"; "The mosque was converted to a
  cathedral in 1236... a major building project in the 16th century
  inserted a new Renaissance cathedral nave and transept into the
  center of the building"; "Today, the building continues to serve as
  the city's cathedral, and Mass is celebrated there daily").
- **Kuva:** Commons **Arcos interiores Mezquita de Córdoba 01.jpg**
  (3648×2736, CC BY-SA 3.0 es, Markanga, 7.6.2008) — kaksikerroksiset
  punavalkoiset kaaret. Restrictions tyhjä. Vaihtoehto samasta
  sarjasta: **Arcos interiores Mezquita de Córdoba 09.jpg** (3648×2736,
  sama lisenssi ja tekijä).
- **HERKKYYS:** rakennus on kahden uskonnon kiistakapula yhä tänään.
  Popup-teksti pitäytyy siinä, mitä lähde sanoo: kauppa, laajennukset,
  muutos, lisärakennus, nykykäyttö. **Älä ota kantaa** siihen, kenelle
  rakennus "kuuluu", äläkä käytä sanoja "valloitus" tai "ryöstö" —
  lähde puhuu ostosta ja muuttamisesta.

### 4. Santiago de Compostela

- **Nimi:** Santiago de Compostela (sama suomeksi).
- **Tyyppi:** kaupunki ja pyhiinvaellusmatkan päätepiste.
- **Koordinaatit:** 42,87777778°N, −8,54444444°E — en-Wikipedia
  "Santiago de Compostela".
- **Popup-teksti (n. 400 merkkiä):**

  > Nimi *Compostela* tarkoittaa kauniissa kansanselityksessä *Campus
  > Stellae*, "tähtien kenttää". Kielentutkijat ovat eri mieltä:
  > Fletcher, Coromines ja Menéndez Pidal ovat samaa mieltä siitä, että
  > nimi tulee latinan sanoista *compositum tella*, "hyvin järjestetty
  > hautausmaa" — todennäköisesti viitaten kirkkoa vanhempaan
  > hautapaikkaan samalla tontilla. Kaupunki on ollut
  > pyhiinvaellusreitin pää 800-luvulta asti.

- **Lähde:** en-Wikipedia "Santiago de Compostela", johdanto ja osio
  "Toponym" ("According to Richard A. Fletcher, Joan Coromines, Ramón
  Menéndez Pidal, now agree that the origin of the name Compostela
  comes from the Latin compositum tella, meaning a well-ordered burial
  ground, possibly referring to an ancient burial ground on the site of
  the Church of Santiago de Compostela that pre-dates the Christian
  building"; "According to folk etymology Compostela derives from the
  Latin: Campus Stellae ('field of the star')"; "the destination of the
  Way of St. James, a leading Catholic pilgrimage route since the 9th
  century").
- **Kuva:** Commons **Santiago Compostela Cathedral 2023 - Dome and
  botafumeiro pulleys.jpg** (5580×3720, CC BY-SA 4.0, Fernando
  Pascullo, 29.4.2023) — kupoli ja *botafumeiron* eli jättisuitsuttimen
  köysipyörät; ei ihmisiä. Restrictions tyhjä. Vaihtoehto:
  **Cúpula de la Catedral de Santiago de Compostela.jpg** (2067×3100,
  CC BY-SA 3.0, William Borrego, 5.3.2011).
- **HUOM SILMÄTARKISTUS:** Commonsin botafumeiro-kuvista **suurin osa
  on otettu täydestä kirkosta ja niissä on tunnistettavia ihmisiä**
  (mm. "Botafumeiro.001 - Catedral de Santiago.jpg", "Botafumeiro en la
  Catedral de Santiago de Compostela.jpg"). Yllä suositellut kaksi ovat
  ne, joissa kamera osoittaa ylös. Tarkista silti silmällä.

### 5. Salamanca

- **Nimi:** Salamanca (sama suomeksi).
- **Tyyppi:** yliopistokaupunki.
- **Koordinaatit:** 40,965°N, −5,66416667°E — en-Wikipedia
  "Salamanca".
- **Popup-teksti (n. 400 merkkiä):**

  > Salamancan yliopisto on Länsi-Euroopan vanhimpia, ja se sai
  > **ensimmäisenä maailmassa** virallisen nimen "yliopisto" vuonna
  > 1254. Kolumbus luennoi siellä löydöistään, ja Hernán Cortés
  > opiskeli — mutta palasi kotiin 17-vuotiaana kesken tutkinnon.
  > Vanhassa kaupungissa on myös *Casa de las Muertes*, "kuolemien
  > talo": nimi tulee julkisivua koristavista pääkalloista, ja niiden
  > ympärille kasvoi kirous, joka piti talon tyhjänä vuosikausiksi.

- **Lähde:** en-Wikipedia "Salamanca", johdanto ja osiot yliopistosta
  ja rakennuksista ("The University of Salamanca, founded in 1218, is
  one of the oldest in Western Europe"; "It was the first university to
  receive the title of 'University' in 1254... About the time
  Christopher Columbus was lecturing there on his discoveries, Hernán
  Cortés took classes at Salamanca, but returned home in 1501 at the
  age of 17, without completing his course of study"; "Casa de las
  Muertes (early 16th century)... so called because of the skulls that
  decorate the facade... this was enough reason for the popular
  imagination to invent a legend that ran for many years").
- **Kuva:** Commons **Fachada escuelas mayores Universidad de
  Salamanca.jpg** (5832×4000, CC BY-SA 4.0, Nacaru, 11.11.2023) —
  plateresque-julkisivu. Restrictions tyhjä. Vaihtoehto CC0:lla:
  **Salamanca - Universidad, Escuelas Mayores, fachada 01.jpg**
  (1536×2048, CC0, Zarateman, 7.5.2016).
- **RISTIRIITA ARTIKKELIN SISÄLLÄ:** perustamisvuodesta annetaan
  **kolme** eri lukua eri osioissa: 1134 ("founded in 1134"), 1218
  (johdanto ja Alfonso IX:n kuninkaallinen kirje) ja 1254 (Alfonso X:n
  asetus, jonka paavi Aleksanteri IV vahvisti 1255). **Älä anna yhtä
  perustamisvuotta.** Turvallisin muotoilu on se, mikä yllä on:
  "ensimmäinen, joka sai nimen yliopisto, vuonna 1254".
- **HUOM:** kuuluisa "sammakko kallon päällä" -yksityiskohta
  julkisivulla EI ole tässä artikkelissa. **Älä väitä sitä** ilman
  omaa lähdettä.

### 6. Cuenca

- **Nimi:** Cuenca (sama suomeksi).
- **Tyyppi:** kaupunki kahden rotkon välissä.
- **Koordinaatit:** 40,06666667°N, −2,15°E — en-Wikipedia "Cuenca,
  Spain".
- **Popup-teksti (n. 390 merkkiä):**

  > Cuencan vanhakaupunki on rakennettu kapealle kielekkeelle kahden
  > joen, Júcarin ja Huécarin, kaivamien rotkojen väliin. Muslimit
  > tajusivat paikan arvon jo 700-luvulla ja pystyttivät sinne
  > linnoituksen nimeltä Kunka, jota kiersi kilometrin mittainen muuri.
  > Sijainnista tuli lempinimi: kaupunkia kutsutaan **Kotkanpesäksi**.
  > Rotkon reunalta törröttävät parvekkeet ovat sen tunnetuin näky.

- **Lähde:** en-Wikipedia "Cuenca, Spain", johdanto ja osiot
  "Etymology" ja "History" ("The primitive urban core developed on a
  narrow escarpment caged between the Júcar and the Huécar rivers";
  "The city of Cuenca is also known as the 'Eagle's Nest' because of
  its precarious position on the edge of a gorge"; "When the Muslims
  captured the area in 714, they soon realized the value of this
  strategic location and they built a fortress (called Kunka) between
  two gorges dug between the Júcar and Huécar rivers, surrounded by a
  1 km-long wall").
- **Kuva:** Commons **Casas colgadas, Cuenca, España, 2017-01-03, DD
  121-123 HDR.jpg** (8517×4528, CC BY-SA 4.0, Diego Delso, 3.1.2017) —
  riippuvat talot rotkon reunalla. Restrictions tyhjä.
- **HUOM:** "riippuvat talot" (*casas colgadas*) mainitaan kuvassa,
  mutta niiden tarkka rakennushistoria EI ollut tässä haussa
  varmennettu (en-Wikipedian erillinen artikkeli "Hanging Houses of
  Cuenca" ei ehtinyt läpi rajapinnasta). **Älä anna niille
  rakennusvuotta** ilman uutta tarkistusta.

### 7. Cartagena — 1873-KOHDE

- **Nimi:** Cartagena (sama suomeksi). Roomalaisittain Carthago Nova.
- **Tyyppi:** satamakaupunki ja laivastotukikohta.
- **Koordinaatit:** 37,6019°N, −0,9842°E — en-Wikipedia "Cartagena,
  Spain".
- **Popup-teksti (n. 440 merkkiä):**

  > Cartagena oli Espanjan Välimeren päälaivastotukikohta — ja
  > **12. heinäkuuta 1873 se julistautui itsenäiseksi kantoniksi**.
  > Kapinalliset saivat puolelleen sataman sota-alukset, löivät omaa
  > rahaa ja kestivät puoli vuotta. Madridin hallitus julisti heidät
  > merirosvoiksi. Kaupunki antautui 12. tammikuuta 1874, ja arviolta
  > 70 prosenttia sen rakennuksista oli tuhoutunut. Isoisä matkusti
  > Espanjassa juuri sinä kesänä.

- **Lähde:** en-Wikipedia "Canton of Cartagena", johdanto ja osiot
  "Establishment", "Defeat", "Aftermath" ("The city rose up in armed
  insurrection on 12 July 1873 establishing the Canton's de facto
  independence"; "Cartagena, on the southern Murcian coast, contained
  Spain's primary Mediterranean naval base"; "The Canton of Cartagena
  survived six months of constant wars, and even minted its own
  currency, the duro cantonal" — First Spanish Republic -artikkeli);
  "on 12 January, the City surrendered"; "it is estimated that
  approximately 70% of the city's buildings were destroyed").
- **Kuva:** Commons **Vista de la ciudad, puerto y Arsenal de
  Cartagena.jpg** (1216×928, public domain, Juan Fernando Palomino,
  **1778**) — kaiverrus kaupungista, satamasta ja siitä arsenaalista,
  joka 1873 nousi kapinaan. Restrictions tyhjä. **PIENEHKÖ** —
  tarkista riittääkö popupin kokoon.
- **Ks. myös:** takyt-madrid.md täky 8 (turkkilainen lippu, kirje
  presidentti Grantille, brittiläinen ja saksalainen fregatti) ja
  takynostot-espanja.md ehdokas 4 — sama tapahtuma kolmella eri
  syvyydellä.
- **HERKKYYS:** kyseessä oli sisällissota, jossa kuoli siviilejä
  (mm. yli 300 räjähdyksessä 7.1.1874). **Popup-teksti ei kuvaa
  uhreja**; se kertoo julistuksen, keston ja lopputuloksen. Pidä se
  niin.

### 8. Bilbao — 1873-KOHDE

- **Nimi:** Bilbao (sama suomeksi). Baskiksi Bilbo.
- **Tyyppi:** teollisuus- ja satamakaupunki.
- **Koordinaatit:** 43,25694444°N, −2,92361111°E — en-Wikipedia
  "Bilbao". **Popupissa mainittu silta on eri paikassa:** Vizcayan
  silta 43,3231°N, −3,0169°E (en-Wikipedia "Vizcaya Bridge"), noin
  10 km alavirtaan jokisuulla.
- **Popup-teksti (n. 430 merkkiä):**

  > Bilbao rikastui raudasta. 1800-luvun teollistuminen teki siitä
  > Barcelonan jälkeen Espanjan toiseksi teollistuneimman seudun, ja
  > väkiluku kasvoi yhdestätoista tuhannesta vuonna 1880
  > kahdeksaankymmeneen tuhanteen vuonna 1900. Jokisuulle rakennettiin
  > 1893 **maailman vanhin yhä toimiva lauttasilta**: kannen sijasta
  > köysistä riippuva gondoli, jotta laivat mahtuvat alta. Sen
  > suunnitteli Alberto Palacio, Gustave Eiffelin oppilas.

- **Lähde:** en-Wikipedia "Bilbao", osio 1800-luvun teollistumisesta
  ("Throughout the nineteenth century and the beginning of the
  twentieth, Bilbao experienced heavy industrialisation, making it the
  centre of the second-most industrialised region of Spain, behind
  Barcelona"; "The population increased dramatically, from 11,000 in
  1880 to 80,000 in 1900") ja en-Wikipedia "Vizcaya Bridge", osio
  "History" ("It is the world's oldest transporter bridge and was built
  in 1893, designed by Alberto Palacio, one of Gustave Eiffel's
  disciples").
- **1873-KYTKÖS:** kolmatta karlistisotaa käytiin juuri Biskajassa ja
  Navarrassa; karlistit hallitsivat vastarinnatta suurinta osaa
  Baskimaasta ja Navarraa, ja kruununtavoittelija Kaarle VII teki
  Estellasta pääkaupunkinsa elokuussa 1873 (en-Wikipedia
  "First Spanish Republic" ja "Third Carlist War", osio "1873").
  **Bilbaon piiritystä 1874 EI saatu tarkistettua** tässä haussa —
  en-haku "Siege of Bilbao (1874)" palautti *missing*. **Älä mainitse
  piiritystä ilman uutta lähdettä.**
- **Kuva:** Commons **Puente de vizcaya bilbao.jpg** (3024×4032, CC0,
  Albapenate, 3.10.2023) — Vizcayan silta kokonaisuudessaan.
  Restrictions tyhjä.
- **Kuva (AIKALAISEMPI, PD):** Commons **Vista del transbordador del
  Puente de Vizcaya i la ria de Bilbao.jpeg** (1024×420, public
  domain, Santiago Perdigó, heinäkuu **1919**) — itse riippuva gondoli
  liikkeessä. **PIENI** — tarkista riittääkö. Samasta sarjasta myös
  **Vista general del Puente de Vizcaya sobre la ria de Bilbao.jpeg**
  (1024×415, PD, lokakuu 1919) ja **La ria de Bilbao des del Puente
  Vizcaya.jpg** (1024×418, PD, elokuu 1918), sama kuvaaja.
  Restrictions tyhjä kaikissa.

### 9. Valencia

- **Nimi:** Valencia. Valenciaksi virallisesti València.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 39,47°N, −0,37638889°E — en-Wikipedia "Valencia".
- **Popup-teksti (n. 430 merkkiä):**

  > Valenciassa kokoontuu joka torstai keskellä Neitsyen aukiota
  > **vesituomioistuin**, joka ratkoo kastelukanavien riitoja.
  > Istunto pidetään ulkona, suullisesti, ja Unesco kirjasi sen
  > aineettomaksi kulttuuriperinnöksi vuonna 2009. Kaupungin oma joki
  > sen sijaan siirrettiin: lokakuun 1957 tulva tappoi 81 ihmistä,
  > minkä jälkeen Turialle kaivettiin uusi uoma ja vanha pohja
  > muutettiin puistoksi, joka halkoo kaupunkia yhä.

- **Lähde:** en-Wikipedia "Valencia", osiot juhlista ja historiasta
  ("the Water Tribunal of the plain of Valencia called to order each
  Thursday in the Plaza of the Virgin, which was declared an intangible
  cultural heritage in 2009"; "In October 1957, a flood from the Turia
  river resulted in 81 deaths and extensive property damage. The
  disaster led to the remodelling of the city and the creation of a new
  river bed for the Turia, with the old one becoming one of the city's
  'green lungs'"; "The Turia River was diverted in the 1960s... and the
  old riverbed is now the Turia Gardens").
- **Kuva (AIKALAINEN, paras):** Commons **Vista de la Lonja de la
  Seda, en Valencia, por Pablo Gonzalvo.jpg** (1879×1379, public
  domain, Pablo Gonzalvo, **1866**) — maalaus Valencian silkkipörssistä
  seitsemän vuotta ennen isoisän matkaa. Restrictions tyhjä.
  **HUOM:** kuva esittää Lonja de la Sedaa, EI vesituomioistuinta
  (joka kokoontuu katedraalin vieressä Neitsyen aukiolla). Jos kuvan ja
  tekstin pitää osua samaan paikkaan, käytä nykykuvaa: **Lonja de la
  seda - Valencia 05.JPG** (6000×4000, CC BY-SA 4.0, Frnevado,
  9.4.2016) tai **Valencia - La Lonja de la Seda 2.jpg** (6192×4128,
  CC0, Coralma*, 7.10.2024) — tai hae erikseen kuva Plaza de la
  Virgenistä.
- **HERKKYYS:** vuoden 1957 tulvan kuolonuhrit mainitaan lukuna, koska
  ne selittävät joen siirron. Älä kuvaile tulvaa. **Vuoden 2024 tulva
  Valenciassa on tuore ja traaginen** — sitä ei mainita
  popup-tekstissä lainkaan, vaikka en-Wikipedia mainitsee sen
  ilmasto-osiossa. **Pidä se poissa.**
- **Ks. myös:** takyt-madrid.md täky 9 — Congresson **hylätty toinen
  leijonapari** päätyi juuri Valenciaan, Jardines de Monfortelle.
  Hauska pikkulinkki kahden kohteen välillä, jos sellaisia halutaan.

### 10. Altamiran luola — 1873-KOHDE

- **Nimi:** Altamiran luola. Paikallinen: Cueva de Altamira.
- **Tyyppi:** luola, jossa on esihistoriallista taidetta.
- **Koordinaatit:** 43,3825°N, −4,12027778°E — en-Wikipedia "Cave of
  Altamira".
- **Popup-teksti (n. 440 merkkiä):**

  > Luola löytyi **1868**, mutta kukaan ei katsonut kattoon ennen kuin
  > Marcelino Sanz de Sautuolan **kahdeksanvuotias tytär María** vei
  > isänsä sinne 1879. Katossa oli lauma sukupuuttoon kuolleita
  > arobiisoneja, hevosia ja peura. Kun Sautuola julkaisi löytönsä
  > 1880, häntä syytettiin väärennöksestä: asiantuntijoiden mielestä
  > esihistorialliset ihmiset eivät kyenneet abstraktiin ajatteluun.
  > Vasta 1902 tiedemaailma perui — neljätoista vuotta hänen
  > kuolemansa jälkeen.

- **Lähde:** en-Wikipedia "Cave of Altamira", johdanto ja osio
  "Discovery, excavation, scepticism" ("The site was discovered in 1868
  by Modesto Cubillas"; "In 1879... amateur archaeologist Marcelino
  Sanz de Sautuola was led by his eight-year-old daughter María to the
  cave and realized that the markings on the walls constituted
  drawings"; "some of whom rejected the prehistoric origin of the
  paintings on the grounds that prehistoric human beings lacked
  sufficient ability for abstract thought"; "Sautuola was accused of
  forgery"; "It was not until 1902... that the scientific society
  retracted their opposition to the Spaniards... Sautuola, having died
  14 years earlier, did not live to witness his rehabilitation";
  "The Polychrome Ceiling... depicting a herd of extinct steppe bison
  (Bison priscus) in different poses, two horses, a large doe, and
  possibly a wild boar").
- **1873-KYTKÖS: TÄYDELLINEN.** Isoisä matkusti Espanjassa täsmälleen
  löydön (1868) ja tunnistamisen (1879) välissä. Luola oli olemassa,
  mutta sen sisältöä ei tiennyt kukaan.
- **Kuva:** Commons **Altamira-1880.jpg** (1350×682, public domain) —
  kattomaalausten piirros **vuoden 1880 julkaisusta**, eli se kuva,
  jonka takia Sautuolaa syytettiin väärentäjäksi. Restrictions tyhjä.
- **TARKKUUS (korjattu):** lähde sanoo Sautuolan kuolleen "14 years
  earlier" suhteessa vuoteen 1902, eli **1888**. Popup-teksti sanoo
  siis neljätoista vuotta. **Lähde ei anna kuolinvuotta suoraan** —
  1888 on vähennyslasku lähteen lauseesta. Jos vuosiluku halutaan
  peliin näkyviin, se on tarkistettava erikseen; muotoilu
  "neljätoista vuotta hänen kuolemansa jälkeen" ei vaadi sitä.
- **HUOM:** laajalti siteerattu tytär Marían huudahdus ("Mira, papá,
  bueyes!") **EI ole** tässä artikkelissa. Älä käytä sitä.
- **Ks. myös:** takynostot-espanja.md ehdokas 1.

### 11. Teide

- **Nimi:** Teide. Paikallinen: El Teide, Pico del Teide.
- **Tyyppi:** tulivuori, Espanjan korkein kohta.
- **Koordinaatit:** 28,27305556°N, −16,63944444°E — en-Wikipedia
  "Teide". **Kanariansaarilla, Afrikan edustalla** — kartalla kaukana
  muista kohteista, mikä on itsessään opetus.
- **Popup-teksti (n. 430 merkkiä):**

  > Teide on 3 715 metriä korkea ja Espanjan korkein kohta. Merenpohjasta
  > mitattuna se on 7 500 metriä — maailman kolmanneksi korkein
  > tulivuori. Alkuperäisasukkaat guanchit uskoivat vuoren **kannattavan
  > taivasta** ja siellä asuvan pahan hengen Guayotan, jota kuvattiin
  > mustaksi koiraksi. Purkauksen aikana he sytyttivät kokkoja
  > pelotellakseen sitä. Kolumbuksen miehistö väitti nähneensä vuorella
  > liekkejä vuonna 1492. Viimeksi purkaus oli 1909.

- **Lähde:** en-Wikipedia "Teide", johdanto ja osio "Name and legends"
  ("Its summit (at 3,715 m) is the highest point in Spain and the
  highest of any island in the Atlantic Ocean. Measured from its base on
  the ocean floor, Teide reaches a total height of 7,500 m, making it
  the third-tallest volcano in the world"; "with its most recent
  eruption occurring in late 1909"; "The Guanches also believed that
  Teide held up the sky"; "Guayota is often represented as a black dog,
  accompanied by his host of demons (Tibicenas)"; "When going on to
  Teide during an eruption, it was customary for the Guanches to light
  bonfires to scare Guayota"; "In 1492, when Christopher Columbus
  arrived at the island of Tenerife, his crew claimed to see flames
  coming from the highest mountain of the island").
- **Kuva:** Commons **Teide von Nordosten (Zuschnitt 1).jpg**
  (9308×5185, CC BY-SA 3.0 de, Thomas Wolf / www.foto-tw.de,
  25.4.2015). Restrictions tyhjä.
- **ELÄINKYTKÖS:** Guayota mustana koirana. Kevyt, mutta se on
  eläinkuva myytissä ja sopii ELÄINTÄKY-teeman jatkeeksi.
- **TARKKUUS:** Kolumbus-kohta on lähteen mukaan **väite**
  ("his crew claimed to see"). Kirjoita "väittivät nähneensä".

### 12. Mallorca

- **Nimi:** Mallorca (suomeksi myös Mallorca; englanniksi Majorca).
- **Tyyppi:** saari, Baleaarien suurin.
- **Koordinaatit:** 39,61666667°N, 2,98333333°E — en-Wikipedia
  "Mallorca". **Huom: tämä on saaren keskipiste, ei kaupunki.**
- **Popup-teksti (n. 380 merkkiä):**

  > Mallorcan nimi on pelkkä kokovertailu. Klassisessa latinassa se oli
  > *insula maior*, "suurempi saari" — erotukseksi naapurista, joka oli
  > *minor*, pienempi. Keskiajan latinassa siitä tuli Maiorca, ja
  > katalonialaiset kirjurit muokkasivat sen myöhemmin muotoon
  > Mallorca — kielitieteilijöiden mukaan **yliopista**, eli
  > korjaamalla jotain, mikä ei ollut väärin. Menorcan nimi on sama
  > sana toisin päin.

- **Lähde:** en-Wikipedia "Mallorca", osio "Etymology" ("The name
  originates from Classical Latin insula maior, meaning 'larger
  island'. In Medieval Latin, this evolved into Maiorca, referring to
  'the larger one' in contrast with Menorca, 'the smaller one'. The
  term Maiorca was later modified by central Catalan scribes through a
  process of hypercorrection, resulting in the form Mallorca, which
  eventually became the standard spelling").
- **Kuva:** Commons **Serra de Tramuntana (2016.05.17).jpg**
  (4256×2832, CC BY-SA 4.0, Geir Hval / www.MacWhale.eu, 17.5.2016) —
  Mallorcan pohjoisrannikon vuoristo. Restrictions tyhjä. Vaihtoehto:
  **Puig d'Alaró - Serra de Tramuntana - Mallorca.jpg** (4739×3128,
  CC BY-SA 3.0, H. Zell, 7.10.2015).
- **LISENSSIVAROITUS:** Commons-haku palautti myös neljä kuvaa
  sarjasta **Serra de Tramuntana Mallorca 2008 02/04/16/25.JPG**
  (ILA-boy, 2008), joiden lisenssi on **GPL** — ei PD eikä CC.
  CLAUDE.md:n sääntö on "kuvat ja media vain PD/CC". **Älä käytä
  näitä neljää.**
- **HUOM — VAHVEMPI KOUKKU ETSITTÄVÄNÄ:** tämä on listan heikoin
  popup. Ilmeisimmät vahvemmat vaihtoehdot, joita **EI ehditty
  tarkistaa** tässä erässä: Chopin ja George Sand Valldemossan
  kartusiaaniluostarissa talvella 1838–39 (en-haku "Royal Charterhouse
  of Valldemossa" palautti *missing* — oikea artikkelinimi on etsittävä)
  ja Serra de Tramuntanan kuivamuuriviljelyterassit. **Suositukseni
  Fablelle: hae Valldemossalle oikea artikkelinimi ennen kuin tämä
  kohde viedään peliin**, tai korvaa Mallorca varapenkin Zaragozalla.

### 13. Doñana

- **Nimi:** Doñanan kansallispuisto. Paikallinen: Parque Nacional y
  Natural de Doñana.
- **Tyyppi:** kansallispuisto, kosteikko ja dyynialue.
- **Koordinaatit:** 37°N, −6,5°E — en-Wikipedia "Doñana National
  Park". **HUOM: tämä on rajapinnan antama pyöristetty likiarvo
  (kaksi merkitsevää numeroa), koska kohde on laaja alue eikä piste.**
  Jos kartta vaatii tarkemman pisteen, se on haettava erikseen.
- **Popup-teksti (n. 440 merkkiä):**

  > Guadalquivirin suistossa on Euroopan suurin luonnonsuojelualue.
  > Kun jäätiköt sulivat, alue oli lahti, jota roomalaiset kutsuivat
  > nimellä *Lacus Ligustinus*; nyt se on suota, dyynejä ja matalia
  > puroja. Talvisin siellä lepää jopa **kaksisataatuhatta muuttavaa
  > vesilintua**, ja vuodessa nähdään yli 300 lintulajia. Doñana on
  > myös **iberianilveksen** koti — maailman uhanalaisin kissaeläin,
  > jota oli vuonna 2002 jäljellä 94 yksilöä.

- **Lähde:** en-Wikipedia "Doñana National Park", johdanto ja osio
  "Geology and geomorphology" ("The park is an area of marshes, shallow
  streams, and sand dunes in Las Marismas, the delta where the
  Guadalquivir flows into the Atlantic Ocean"; "shelters wildlife...
  and endangered species such as the Spanish imperial eagle and the
  Iberian lynx"; "hosts many species of migratory waterfowl during the
  winter, typically up to 200,000 individuals. Over 300 different
  species of birds may be sighted there annually. Considered the
  largest nature reserve in Europe"; "a lagoon, later called Lacus
  Ligustinus by the Romans, was formed") ja en-Wikipedia "Iberian
  lynx" ("By the turn of the 21st century, the Iberian lynx was on the
  verge of extinction, as only 94 individuals survived in two isolated
  subpopulations in Andalusia in 2002").
- **Kuva (maisema):** Commons **Paisaje en el Parque de Doñana,
  España, 2015-12-07, DD 02.JPG** (8688×4444, CC BY-SA 4.0, Diego
  Delso, 7.12.2015) — kosteikkomaisema. Restrictions tyhjä.
  Sisarkuva: **Paisaje en el Parque de Doñana, España, 2015-12-07,
  DD 03.JPG** (8347×5565, sama lisenssi ja tekijä).
- **Kuva (eläin):** Commons **Lince iberico.jpg** (3888×2592,
  CC BY-SA 4.0, Fernando Diz, 12.5.2018) — iberianilves.
  Restrictions tyhjä. Vaihtoehto keisarikotkalle:
  **Aquila adalberti (ad.).jpg** (1537×865, CC BY-SA 4.0, Juan Lacruz,
  6.3.2016).
- **HUOM SILMÄTARKISTUS:** Commonsin ilveskuvista sarja
  **16.02.15 Doñana .Suelta Lince Iberico 1–6** (Junta de Andalucía,
  CC BY-SA 2.0) on **vapautustilaisuudesta ja niissä on todennäköisesti
  tunnistettavia ihmisiä** — älä käytä ilman silmätarkistusta.
  Suositeltu "Lince iberico.jpg" on pelkkä eläin, mutta tarkista sekin.
- **ELÄINKYTKÖS: VAHVA.** Tämä on koko fokuskartan eläinkohde.
  **HUOM AJANTASAISUUS:** ilveskanta on noussut 2 021 yksilöön (2024) ja
  laji on luokiteltu uudelleen "vaarantuneeksi". **Kirjoita luku 94
  vuosilukuineen** ("vuonna 2002"), tai kerro molemmat luvut — muuten
  teksti antaa väärän kuvan nykytilanteesta.

### 14. Ronda — HERKKYYSKOHDE

- **Nimi:** Ronda (sama suomeksi).
- **Tyyppi:** kaupunki rotkon päällä.
- **Koordinaatit:** 36,73722222°N, −5,16472222°E — en-Wikipedia
  "Ronda". Härkätaisteluareena erikseen: 36,742361°N, −5,167067°E
  (en-Wikipedia "Plaza de Toros de Ronda").
- **Popup-teksti (n. 420 merkkiä):**

  > Ronda seisoo tasangolla 600–800 metrissä, ja sen halkaisee
  > Guadalevín-joen kaivama rotko, *el Tajo*. Kaupungissa syntyi
  > **Abbas ibn Firnas** (810–887): keksijä, insinööri, kemisti,
  > lääkäri, runoilija ja muusikko — ja hänen kerrotaan yrittäneen
  > lentää. Rondan toinen tunnusrakennus on Espanjan vanhimpia
  > härkätaisteluareenoja, rakennettu 1779–1785 ja kokonaan kivestä.
  > Ensimmäiset avajaiset toukokuussa 1784 päättyivät katsomon
  > osittaiseen romahtamiseen.

- **Lähde:** en-Wikipedia "Ronda", johdanto ja osio "History" ("Ronda
  sits on the Ronda Depression, a Miocene plateau at around 600–800
  metres above mean sea level"; "The city is cut off by a deep gorge
  ('el Tajo'), carrying the Guadalevín river"; "It was the hometown of
  the polymath Abbas ibn Firnas (810–887), an inventor, engineer,
  alleged aviator, chemist, physician, Muslim poet, and Andalusian
  musician") ja en-Wikipedia "Plaza de Toros de Ronda", osio "History"
  ("Construction of the bullring started in 1779 and finished in 1785";
  "While it may not be the oldest bull fighting ring in Spain, it is
  one of the first entirely constructed from stone"; "Ronda's first
  inaugural bull fighting event in May 1784 resulted in a partial
  collapse of the stands, and the structure had to be closed
  temporarily for repairs").
- **Kuva:** Commons **View of Puente Nuevo bridge in Ronda
  Spain.jpg** (9453×4800, CC BY-SA 3.0, Wolfgang Moroder, 27.6.2013) —
  Puente Nuevo ja el Tajon rotko. Restrictions tyhjä. Vaihtoehto
  pystykuvaksi: **Ronda Puente Nuevo and El Tajo gorge.jpg**
  (3000×4083, CC BY 4.0, Christopher Down, 4.4.2017).
  **Kuvaksi valitaan silta ja rotko, EI areena** — ks. herkkyysohje
  alla.
- **HERKKYYS — HÄRKÄTAISTELU (Raamatun Perustuslaki, pilari 3):**
  peli **kuvaa härkätaistelun ilmiönä: ei ihannoi eikä tuomitse.**
  Käytännössä tähän kohteeseen:
  - **Sanotaan:** areena on rakennettu 1779–1785, se on kivestä, koko
    katsomo on katettu, halkaisija 66 metriä, katsomoon mahtuu noin
    5 000 ja itse kehä on Espanjan suurin, ensimmäiset avajaiset
    päättyivät katsomon romahdukseen. Sanotaan myös, että areenassa
    toimii museo.
  - **EI sanota:** ei ylistetä matadoreja sankareina eikä nimetä
    "Espanjan suurimpia taisteluita". Erityisesti **EI käytetä lukua
    "Pedro Romero tappoi yli 5 600 härkää"** vaikka se on lähteessä —
    se on numero, joka pakottaa lukijan ottamaan kantaa.
  - **EI myöskään** tuomita perinnettä, kutsuta sitä julmuudeksi tai
    liitetä siihen eläinsuojelukannanottoa. Peli kertoo, mitä paikassa
    tehdään ja on tehty.
  - **Painopiste on tarkoituksella Abbas ibn Firnasissa ja rotkossa**,
    ei areenassa. Areena mainitaan, koska se on kaupungin tunnetuin
    rakennus ja sen pois jättäminen olisi vaikenemista — mutta se ei
    ole popupin pääasia.
  - **Sana "alleged aviator"** on lähteen oma varaus: sano
    "hänen kerrotaan yrittäneen lentää", älä "hän lensi".

---

## Hylätyt / harkintaan jätetyt

- **Zaragoza, Las Médulas, Picos de Europa, Rio Tinto, Gibraltar,
  Ceuta, Melilla:** ei haettu tässä erässä. Jos kartta kaipaa
  lisää pisteitä, **Zaragoza** (Ebron varsi, keskinen tyhjiö kartalla
  Madridin ja Barcelonan välissä) ja **Las Médulas** (roomalainen
  kultakaivos, Unescon kohde) ovat ilmeisimmät seuraavat.
  **Gibraltar, Ceuta ja Melilla ovat poliittisesti latautuneita** —
  ne vaativat oman herkkyysharkintansa eivätkä kuulu tähän erään.
- **Mount Mulhacén / Sierra Nevada:** jätetty pois, koska se on
  käytännössä Granada-laatan takapiha ja menisi päällekkäin sen
  kanssa.
- **Amalfin kaltainen rannikko-osuus (Costa Brava, Costa del Sol):**
  ei omaa koukkua, joka ei olisi matkatoimistotekstiä.
- **Alhambra, Sagrada Família, Sevillan katedraali ja Giralda:**
  jätetty pois **tarkoituksella**, koska ne kuuluvat pelilaattoihin
  Granada, Barcelona ja Sevilla.
- **Toledon "Artificio de Juanelo"** (1500-luvun vesinostokone, joka
  nosti Tajon veden kaupunkiin): mainitaan Toledo-artikkelin
  "See also" -listassa, mutta **omaa artikkelia ei haettu**. Erittäin
  lupaava koukku Toledolle, jos joku ehtii tarkistaa sen.

---

## Kuvamuistio — mitä on vielä tarkistamatta

**Kaikkien neljäntoista kohteen kuva on tarkistettu
imageinfo-rajapinnalta** (tiedostonimi, koko, lisenssi, tekijä ja
Restrictions). Kaikkien Restrictions on tyhjä.

Kaksi asiaa vaatii silti huomiota ennen peliin vientiä:

1. **SILMÄTARKISTUS** on merkitty kohteisiin 2 (Segovia, turisteja
   etualalla), 4 (Santiago, botafumeiro-kuvat täydestä kirkosta) ja
   13 (Doñana, ilveksen vapautustilaisuuden kuvat). Nämä on katsottava
   silmällä, ei pelkällä rajapinnalla.
2. **LISENSSIVAROITUS** kohteessa 12: neljä Serra de Tramuntana
   -kuvaa on GPL-lisenssillä, joka ei täytä CLAUDE.md:n PD/CC-sääntöä.
   Suositellut kuvat eivät ole näitä.

**Pienimmät kuvat, joiden riittävyys on mitattava UI:ssa:**
Cartagenan 1778-kaiverrus (1216×928), Altamiran 1880-piirros
(1350×682) ja Bilbaon 1918–19-valokuvat (1024×418). Kaikki kolme ovat
aikalaisaineistoa eikä niille ole isompaa vaihtoehtoa; jos ne eivät
riitä, niiden rinnalle on otettava nykykuva.

---

## Yhteenveto

**14 kohdetta, kaikki koordinaatit tarkistettu rajapinnasta, kymmenen
neljästätoista kuvasta tarkistettu.** Yksi koordinaatti on
tarkoituksella likiarvo (Doñana = alueen keskipiste, rajapinnan
pyöristys) ja yksi kohde on merkitty saaren keskipisteeksi (Mallorca)
— molemmat merkitty kohteen kohdalle. Yksi kohde saa kaksi
koordinaattia (Bilbao ja Vizcayan silta), koska popup-fakta on
kaupungin ulkopuolella.

**Merkittävät varaukset, jotka Fablen on huomioitava:** Segovian
akveduktin rakennusvuodesta on kaksi kilpailevaa ajoitusta samassa
artikkelissa; Salamancan perustamisvuodesta kolme; Doñanan ilvesluku
94 on vuodelta 2002 ja vanhentunut ilman vuosilukua; Sautuolan
kuolinvuosi 1888 on vähennyslasku lähteen lauseesta eikä lähteen oma
tieto. Mallorcan popup on listan heikoin ja vaatii joko paremman
koukun tai korvaamisen — se on tämän paperin ainoa kohta, jota en
suosittele vietäväksi peliin sellaisenaan.

**HERKKYYSKOHTIA on kolme:** Ronda (härkätaistelu — laaja ohje
kohteen alla), Córdoban moskeijakatedraali (kahden uskonnon
kiistakapula) ja Cartagena + Valencia (sisällissodan ja tulvan uhrit
lukuina, ei kuvauksina).

**Kolme parasta ehdotustani:**

1. **#10 Altamira.** Ainoa kohde, jonka koko tarina asettuu isoisän
   matkan ympärille kuin kehys: luola löytyi **1868**, sen sisältö
   tunnistettiin **1879**, tiedemaailma tunnusti sen **1902**. Isoisä
   matkusti Espanjassa 1873 — luolan suu oli auki, ja katossa oli
   36 000 vuotta vanha biisonilauma, jota kukaan ei ollut vielä
   nähnyt. Kuva on aikalainen ja public domain: se **sama piirros
   vuodelta 1880**, jonka takia löytäjää syytettiin väärentäjäksi.
   Kohde on yhtä aikaa maantiedettä, eläimiä, tiedehistoriaa ja
   nöyryyttä sen edessä, ettei asiantuntija aina ole oikeassa.

2. **#7 Cartagena.** Vahvin puhtaasti 1873-kytköksinen kohde ja se,
   joka sitoo fokuskartan Madridin täkyihin. Kartalla se on piste
   Välimeren rannalla; klikkauksen jälkeen se on kaupunki, joka
   julistautui itsenäiseksi valtioksi, löi rahaa ja jonka laivasto
   julistettiin merirosvoiksi — sinä kesänä, kun isoisä oli maassa.
   Ja kuva on **vuoden 1778 kaiverrus siitä samasta arsenaalista**,
   joka nousi kapinaan. Sama aihe kantaa myös täkynä
   (takyt-madrid.md 8) ja täkynostona — kolme käyttöä, yksi
   tarkistus.

3. **#2 Segovian akvedukti yhdessä #13 Doñanan kanssa.** Suosittelen
   näitä parina, koska ne ovat kartan kaksi ääripäätä ja opettavat
   saman asian eri suunnista: kestävyyden. Akvedukti kannatteli vettä
   ilman laastia **vuoteen 1973 asti**, eli se toimi isoisän aikaan ja
   vielä sata vuotta hänen jälkeensä. Doñanassa taas oli vuonna 2002
   jäljellä **94 ilvestä** — ja niitä on nyt yli kaksituhatta. Yksi
   kohde näyttää, mikä kestää itsestään; toinen sen, mikä kestää vain
   jos joku päättää pitää siitä kiinni. Aarrepeliin sopiva pari.
