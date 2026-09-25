# Guatemala City — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `guatemala`, maa GTM, en-Wikipedia
"Guatemala City" (pelin wiki-nimi `Guatemala (kaupunki)`). Tiedot
haettu **7.9.2026** en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) ja niiltä osin kuin englanninkielistä artikkelia ei ole,
**es-Wikipedian** raakatekstistä samana päivänä (ennakkotapaus:
`js/packs/fokusvirta-granada.js`, `fokusvirta-madrid.js` — vieras
kieliversio nimetään lähderivillä). Mitat ja malli luettu
tiedostoista `tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/agentin-yhteiset-saannot.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`,
`docs/mantereet-tyoaineisto/spec-mantereet.md`.

Luetut lähdeartikkelit (en-Wikipedia 7.9.2026): **"Guatemala
City"**, **"History of Guatemala City"**, **"Kaminaljuyu"**,
**"National Palace (Guatemala)"**, **"Cathedral of Guatemala
City"**, **"Relief map of Guatemala"**, **"Centro Cultural Miguel
Ángel Asturias"**, **"Efraín Recinos"**, **"Carlos Mérida"**,
**"Museo Popol Vuh"**, "Torre del Reformador", "Miguel Ángel
Asturias". es-Wikipedia 7.9.2026: **"Cerrito del Carmen"**,
**"Iglesia la Recolección"**, **"Iglesia de Santo Domingo (Ciudad
de Guatemala)"**, **"Edificio de Correos de Guatemala"**,
**"Biblioteca Nacional de Guatemala"**, **"Hospital San Juan de
Dios (Guatemala)"**, **"Instituto Nacional Central para Varones"**.

**RAJAUS TÄLLE LEHDELLE.** Guatemalan maalehti (`js/packs/maa-
kategoriat.js`, GTM) on jo tehty; faktapohja
`docs/mantereet-tyoaineisto/faktapohja-guatemala.md`. Maalehti
kertoo Tecun Umanista, **Antigua Guatemalasta ja vuoden 1773
järistyksestä**, Popol Vuh -kirjasta, Justo Rufino Barriosista,
Volcán de Fuegosta, Cuchumatanesista, Mayan biosfäärialueesta,
Monterricosta, guatemalalaisesta ruoasta (pepián, kakʼik, fiambre,
tamaalit), **mayatekstiileistä** (vyökangaspuut, traje, huipil) ja
**marimbasta**. **Kaupunkilehti ei toista näitä.** Ulkopuolelle
jäävät myös kartan maastokohteet (`js/packs/maastokohteet-gtm.js`:
Tajumulco, Atitlán, Motaguan laakso, Tikal, El Mirador, Quiriguá,
Seibal, Iximche, Chichicastenango, Semuc Champey, San Felipe de
Lara), eläintäky (ketsaali) ja skandaalit (`js/packs/skandaalit.js`:
United Fruitin banaanisopimus 1904, Santa Marían purkaus 1902).

Antigua ja vuoden 1773 järistys mainitaan tässä lehdessä vain
siirtymän syynä yhdellä virkkeellä — **maalehti kertoo Antiguan
oman tarinan**, kaupunkilehti kertoo, mitä uuteen laaksoon
rakennettiin.

**Sisällissota 1960–1996, nykypolitiikka ja nykyrikollisuus
jätetään kokonaan pois** (spec-mantereet.md, Keski-Amerikan linjaus;
sama rajaus kuin GTM-maalehdessä). Siksi ei kerrota katedraalin
edustan kahdestatoista pilarista, ei vuoden 1982
vallankaappauksesta eikä Jorge Ubicon hallinnon luonteesta muuten
kuin rakennushankkeiden ajankohtana.

Kaupungin visa on luettu tiedostosta
`js/packs/northamerica-questions.js` (avain `guatemala`, viisi
kysymystä: minkä maan pääkaupunki, Tikal, vuoristo ja tulivuoret,
kahvi vientituotteena, huipil). **Minitehtävä ei saa kysyä yhtään
näistä viidestä.**

Olemassa olevat lohkot on luettu ristiriitojen varalta:
- `js/packs/northamerica-valokuvat.js` (`guatemala`): ennen–nyt-pari
  on valmis (`Guatemala, Plaza De Armas LCCN2014706038.tif` 1915 /
  `Palacion Nacional de Guatemala 12.jpg` 2022) ja lisäkuvina Paseo
  de la Sexta, Mercado Central ja Fuegon purkaus 2018. **Nämä
  tiedostonimet ovat varattuja.**
- `js/packs/northamerica-saapumiset.js` (`guatemala`): kuvaus
  tulivuorista ja Antiguasta, isoisän nosto neljästä pääkaupungista.
  Ei anakronismia; 1873-kehys sopii sellaisenaan.
- `js/packs/northamerica-artikkelit.js`: **ei merkintää lainkaan** —
  kirjoitetaan sekä `intro` (7–10 virkettä) että `artikkeli`
  (kolme kappaletta) avaimella `Guatemala (kaupunki)`.
- `js/packs/saatiedot.js`: ei riviä. Säärivin tekee erillinen
  agentti — tämä erä ei koske tiedostoon.

**1873-KEHYS.** Isoisän matkavuonna Guatemala City oli 97 vuotta
vanha: pääkaupunta oli siirretty Ermitan laaksoon **1776**, ja
kaupunki oli levittäytymässä 30 de Junio -bulevardin ympärille.
Katedraali oli valmistunut **1871**, Carrera-teatteri oli
rakennettu 1850-luvulla, ja nykyinen presidentinpalatsi tulisi
vasta 1890-luvulla. Kaupungin alla oli jo silloin — kenenkään
tietämättä — Kaminaljuyún kumpujen kenttä.

---

## 1. Kansisivu (id `kaupunki`) — nostot

### G1. Kaminaljuyú, kaupunki kaupungin alla

en-Wikipedia "Kaminaljuyu" (johdanto, "Archaeological excavations",
"Occupation history", "The Miraflores"), "Guatemala City"
("Early history").

- Nimi tulee kʼicheʼn kielestä: artikkelin johdanto kääntää sen
  **"kuolleiden kukkulaksi"** ja kaivaushistorian osa kertoo, että
  nimen antoi opetusministeri **J. Antonio Villacorta** kʼicheʼn
  sanasta, joka tarkoittaa **"esi-isien kumpuja"**. **Ristiriita
  kirjoitetaan auki** — lehti antaa molemmat käännökset.
- Asutus paikalla **1500 eKr. – 1200 jKr.** Kaupunki nousi noin
  **300 eKr.** obsidiaanin louhinnan ja kaupan myötä; obsidiaani oli
  Mesoamerikan arvokkainta tavaraa, mustaa vulkaanista lasia.
- Se oli **suurin mayakeskus Yucatánin alankojen ulkopuolella**.
- Ensimmäisissä tieteellisissä kartoituksissa alueella oli noin
  **200 alustaa ja pyramidikumpua**; alkuperäinen raunioalue oli noin
  **5 km²**, ja siitä on säilynyt **0,5 km²** puistona keskellä
  kaupunkia. Loput jäivät rakentamisen alle.
- Rakennusaine oli **kovetettu adobe**, joka kestää huonommin kuin
  alankojen kalkkikivi — siksi jäljet ovat vaatimattomia.
- Löytö varmistui **1930-luvulla**, kun paikallinen jalkapalloseura
  leikkasi kahden matalan kummun reunoja pidentääkseen
  harjoituskenttäänsä ja paljasti hautautuneen rakenteen.
  Villacorta pyysi arkeologit **Alfred Kidderin, Jesse Jenningsin ja
  Edwin Shookin** tutkimaan paikan; heidän monografiansa julkaisi
  **Carnegie Institution of Washington**.
- Kumpu **E-III-3** sisälsi seitsemän rakennetta sisäkkäin kuin
  sipulinkuoret ja kaksi erittäin rikasta hautaa.
- Maaperä on ravinteikas tuhkaa ja tuffia, joka ulottuu paikoin
  satojen metrien syvyyteen; maisemaa halkovat syvät **barrancot**.
- Kaminaljuyún taidokas **vedenjakelujärjestelmä** kertoo
  hallinnosta, joka valvoi ja ylläpiti sitä.
- Alueella viljeltiin maissia ja puuvillaa; kasvijäänteistä on
  tunnistettu mm. avokado, kaakao, mustat pavut ja sapotilla.
  Terasseille istutettiin hedelmäpuulehtoja aina rotkojen reunoille
  asti.
- Kaupungin taloudellinen ja poliittinen taantuma ajoittuu
  myöhäisklassiseen kauteen (550–800 jKr.) ja lopullinen romahdus
  terminaaliklassiseen (800–900 jKr.); syiksi mainitaan
  maatalouden ja politiikan epävakaus, ankarat kuivuudet ja
  kutistuva järvi. **Vanhempi tulkinta** puhui romahduksesta noin
  300 jKr. — **ristiriita kirjoitetaan auki**.

### G2. Neljäs yritys: Nueva Guatemala de la Asunción

en-Wikipedia "Guatemala City" ("Names", "Colonial history"),
"Cathedral of Guatemala City" ("Move of Guatemala City to a new
location"), es-Wikipedia "Cerrito del Carmen" (osio Santa Martan
järistykset).

- Kaupungin virallinen nimi on **Nueva Guatemala de la Asunción**:
  "uusi Guatemala", koska vanha oli raunioina, ja "Asunción" Neitsyt
  Marian taivaaseenottamisen mukaan — kaupungin juhlapäivä on
  **15. elokuuta**.
- Vuoden **1773** Santa Martan järistykset jättivät entisen
  pääkaupungin Antigua Guatemalan raunioiksi. Se oli jo kolmas
  järistys 1717 ja 1751 jälkeen.
- Siirrosta riideltiin: **"traslacionistas"** halusi siirtää
  kaupungin ja johtajana oli kenraalikapteeni **Martín de
  Mayorga**; **"terronistas"** halusi jäädä ja johtajana oli
  arkkipiispa **Pedro Cortés y Larraz**. Vaihtoehtoina olivat
  **Ermitan laakso** ja Jalapan laakso.
- **9.9.1773** Mayorga jätti Santiagon, siirtyi Ermitan laaksoon ja
  perusti väliaikaisen hallintopaikan La Asunciónin kylään.
  Hallinnon istuin siirrettiin nykyiselle paikalle **1776**.
- Katedraali siirtyi uuteen pääkaupunkiin **22.11.1779**. Uusi
  uusklassinen **metropoliitankatedraali** rakennettiin pääosin
  **1782–1815** ja valmistui **1871**; se on kestänyt lukuisia
  järistyksiä, ja vuosien 1917 ja 1976 vauriot on korjattu.
- Espanjan siirtomaakaudella paikalla oli pieni kylä ja
  **El Carmen -niminen luostari, perustettu 1620**.
- **Itsenäisyyden jälkeen** kaupungista tuli syyskuussa **1821**
  Keski-Amerikan yhdistyneiden provinssien pääkaupunki.
- 1800-luvulla rakennettiin **Carrera-teatteri** (1850-luku) ja
  nykyinen presidentinpalatsi (1890-luku); kaupunki laajeni
  **30 de Junio -bulevardin** ympärille, ja laajeneminen syrjäytti
  alkuperäiskansojen asutuksia kaupungin laidoilta. **Tämä
  kerrotaan suoraan** (pilari 4, spec-mantereet.md linjaus 1).

### G3. Vyöhykkeet ja osoite, joka kertoo etäisyyden metreinä

en-Wikipedia "Guatemala City" ("Structure and growth", "Places of
interest by zones").

- Kaupunki on jaettu **22 vyöhykkeeseen (zona)**, jotka suunnitteli
  insinööri **Raúl Aguilar Batres**. Jokaisella on omat katunsa
  (calles), avenuensa (avenidas) ja toisinaan diagonaalinsa.
- Vyöhykkeet on numeroitu **1–25**, mutta numeroita **20, 22 ja 23
  ei ole** — ne olisivat osuneet kahden naapurikunnan alueelle.
- **Osoite kertoo etäisyyden metreinä:** kadun tai avenuen numero,
  viiva ja metrimäärä risteyksestä. Esimerkki artikkelista:
  "7a Av. 1–17, Zona 4" on rakennus Avenida 7:llä, **17 metrin**
  päässä Calle 1:n risteyksestä Calle 2:n suuntaan, vyöhykkeellä 4.
  **Vyöhyke on osa osoitetta:** 7a Av. 1–17, Zona 4 ja 7a Av. 1–17,
  Zona 10 ovat aivan eri paikkoja.
- Lyhyet kadut eivät saa uutta numeroa, vaan kirjaimen: **6A Calle**
  kulkee 6a:n ja 7a:n välissä.
- **Calle 1, Avenida 1, Zona 1 on jokaisen guatemalalaisen
  kaupungin keskipiste.**
- **Vyöhyke 1** on historiallinen keskusta (Centro Histórico):
  Palacio Nacional de la Cultura, katedraali, kongressi,
  kansalliskirjasto ja Plaza de la Constitución (entinen
  keskuspuisto).
- Lentoaseman sijainti etelässä rajoittaa rakennusten korkeutta:
  rakennussäännöissä on ilmailuun perustuva korkeuskatto, matalampi
  vyöhykkeellä 10 kuin vyöhykkeellä 1.

### G4. Maa liikkuu: järistykset, rotkot ja kuopat

en-Wikipedia "Guatemala City" ("Independent history", "Volcanic
activity", "Earthquakes", "Mudslides", "Piping pseudokarst",
"Climate"), "National Palace (Guatemala)" ("1976 earthquake").

- Kaupungista näkyy **neljä kerrostulivuorta**, joista kaksi on
  aktiivisia; lähin ja aktiivisin on **Pacaya**, joka purkaa
  ajoittain huomattavia tuhkamääriä. Agua, Fuego, Pacaya ja
  Acatenango kuuluvat **33 kerrostulivuoren** ketjuun, joka kulkee
  Guatemalan halki Salvadorin rajalta Meksikon rajalle. Vuoret
  muodostavat luonnollisen muurin kaupungin ja Tyynenmeren
  alankojen välille. *(Fuegon oma tarina on maalehdessä — tässä
  kerrotaan vain, että vuoret näkyvät kaupunkiin.)*
- **Vuosien 1917–1918 järistykset** tuhosivat suuren osan
  1700- ja 1800-luvulla rakennetusta kaupungista — **144 vuotta**
  Santa Martan järistysten jälkeen.
- Viimeisin suuri järistys oli **1976**, **Motaguan siirroksella**,
  joka on Karibian ja Pohjois-Amerikan laattojen välinen
  vasenkätinen sivuttaissiirros; voimakkuus **7,5**. Pienempiä
  tärähdyksiä tuntuu usein. **Kansallispalatsi kesti järistyksen**
  (4.2.1976).
- Ermitan laaksoa halkovat **jyrkkäreunaiset rotkot (barrancos)**.
  Sadekaudella rankkasateet aiheuttavat äkkitulvia ja rotkojen
  reunoilla maanvyöryjä (esimerkiksi lokakuussa 2005).
- **Helmikuussa 2007** kaupungin koillisosaan avautui **noin 100
  metriä syvä pystyseinäinen kuoppa**, jossa kuoli viisi ihmistä ja
  josta evakuoitiin tuhat ihmistä. Geologit luokittelevat sen
  **"piping pseudokarstiksi"**: viemärivesi oli syövyttänyt löyhää
  vulkaanista tuhkaa, kalkkikiveä ja muita pyroklastisia kerroksia,
  jotka ovat kaupungin alla. Kolme vuotta myöhemmin syntyi toinen
  vastaava kuoppa (2010).
- **Ilmasto:** trooppinen savanni (Köppen **Aw**), joka rajautuu
  lauhkeampaan kosteaan subtrooppiseen (Cwa/Cwb) korkeuden takia.
  Kaupunki on **1 500 metrissä**, ja siksi lähes kevätmäinen ympäri
  vuoden. Kuumin kuukausi on **huhtikuu**; sadekausi
  **toukokuusta lokakuuhun**, kuiva kausi **marraskuusta
  huhtikuuhun**. Päivälämpötila **22–28 °C**, yölämpötila
  **12–17 °C**; suhteellinen kosteus 82 % aamulla ja 58 % illalla,
  kastepiste keskimäärin 16 °C.

---

## 2. Teemasivu (id `kuvataide`) — "Kaupungin omat kokoelmat"

### K1. Mapa en Relieve — maa pienoiskoossa

en-Wikipedia "Relief map of Guatemala".

- Maastokartta koko maasta maan tasossa, **kaksi mittakaavaa**:
  vaakasuunnassa **1:10 000**, pystysuunnassa **1:2 000** — korkeudet
  siis viisinkertaisesti liioiteltuina.
- Pinta-ala noin **1 800 m²**.
- Rakennettu **18 kuukaudessa 19.4.1904 – 29.10.1905** tiilestä,
  laastista ja sementtipinnoitteesta. Tekijä oli guatemalalainen
  everstiluutnantti ja insinööri **Francisco Vela**, tilaaja
  presidentti **Manuel Estrada Cabrera**, ja topografiset tiedot
  antoi insinööri **Claudio Urrutia**.
- Perusta on kiveä; valtamerten kohdalle asetettiin **hohkakiveä**.
  Korkeuskäyrät ovat tiiltä, **rautatiet lyijyä ja sillat terästä**.
- Maanalainen **60 kuutiometrin säiliö** syöttää järvet ja joet
  sisäisellä virtausjärjestelmällä, joka perustuu **yhteenliitettyjen
  astioiden periaatteeseen**; jakolaatikko on **Cuchumatanesin**
  vuoriston kohdalla.
- Karttaa kiertää **90 cm korkea kaide**, jossa toistuu kuusi
  koristemitalia; ne teki taideteollisuuspaja **A. Doninelli & Cía**.
  Mitalit ovat soikeita ja niissä on Guatemalan historian
  vertauskuvia.
- Kartta on kunnostettu kahdesti: **1980** ja **2014**.
- Alueella on myös näyttelysali, jonka valokuvanäyttely
  *Guatemala Siglo XVIII* kertoo tapahtumista, jotka johtivat
  kaupungin siirtoon Ermitan laaksoon 1776.

### K2. Carlos Mérida ja mosaiikkiseinät

en-Wikipedia "Carlos Mérida".

- **Carlos Mérida** (2.12.1891 Guatemala City – 21.12.1985) oli
  ensimmäisiä, jotka yhdistivät eurooppalaisen modernismin
  latinalaisamerikkalaisiin aiheisiin. Hän oli aiheiltaan osa
  Meksikon muralismia mutta tyyliltään ei: hän suosi
  ei-esittävää ja myöhemmin geometrista muotokieltä kertovan
  sijaan.
- Tausta oli espanjalais-kʼicheʼläinen, ja hän piti sitä esillä koko
  elämänsä.
- Hän oli **15-vuotias**, kun korvan epämuodostuma vei osan
  kuulosta; isä ohjasi hänet musiikista maalaukseen.
- Ensimmäisen oman näyttelynsä hän järjesti **1910** El Economista
  -lehden tiloissa Guatemala Cityssä, **19-vuotiaana**, katalonialaisen
  Jaime Sabartésin avulla.
- **1950** hän palasi Eurooppaan opiskelemaan **venetsialaista
  mosaiikkitekniikkaa** Italiassa. Siitä syntyi kiinnostus
  käsitteeseen **"plastinen integraatio"**: taide ja arkkitehtuuri
  yhdeksi.
- Guatemala Cityssä hänen töitään ovat mm. **kaupungintalon**
  *La mestiza de Guatemala*, **ulkoministeriön** *Glorificación de
  Quetzal* (1955), Instituto Guatemalteco de Seguridad Social,
  Crédito Hipotecario Nacional ja **Guatemalan keskuspankki**
  (1956).
- Hän sai **Ketsaalin ritarikunnan** 1958, ja Guatemalan
  Instituto de Bellas Artes nimesi vuosittaisen taidepalkintonsa
  hänen mukaansa.

### K3. Efraín Recinos ja jaguaariksi rakennettu teatteri

en-Wikipedia "Efraín Recinos", "Centro Cultural Miguel Ángel
Asturias".

- **Efraín Recinos** (15.5.1928 Quetzaltenango – 2.10.2011) oli
  arkkitehti, muralisti, kaupunkisuunnittelija, maalari ja
  kuvanveistäjä.
- Hänen tunnetuin työnsä on **Centro Cultural Miguel Ángel
  Asturias**, maan kansallisteatteri ja suurin kulttuurikeskus,
  avattu **1978**. Recinos suunnitteli valkoisen rakennuksen
  kukkulalle **istuvan jaguaarin** muotoiseksi mayamotiivien
  innoittamana. Valtio on julistanut teatterin
  kansallisperinnöksi.
- Rakennus nousi vanhan **Fuerte de San Josén** paikalle.
  Toinen suunnittelija oli **Carlos Alberto Haeussler**.
- Sisällä ovat **Gran Sala Efraín Recinos**, kamariteatteri
  **Teatro de Cámara Hugo Carrillo**, ulkoilmateatteri sekä
  **Instituto Nacional de la Marimba**.
- Keskus on nimetty kirjailija **Miguel Ángel Asturiaksen** mukaan,
  joka sai **Nobelin kirjallisuuspalkinnon**.
- Recinosin muraaleja on myös kansallisessa
  musiikkikonservatoriossa, La Auroran lentoasemalla ja
  Crédito Hipotecario -rakennuksessa. Hän sai **Ketsaalin
  ritarikunnan**.
- Isä oli maalari, puunveistäjä ja marimbansoittaja. Recinos ei
  käynyt koulua pienenä, vaan isä opetti hänet lukemaan ja
  kirjoittamaan; **5-vuotiaana** hän piirsi, **7-vuotiaana** luki ja
  soitti marimbaa, viulua ja mandoliinia, **9-vuotiaana** maalasi
  öljyvärimaisemia ja **12-vuotiaana** pääsi kouluun.

### K4. Museo Popol Vuh

en-Wikipedia "Museo Popol Vuh".

- Yksi maailman merkittävimmistä **mayataiteen kokoelmista**;
  sijaitsee **Universidad Francisco Marroquínin** kampuksella
  **vyöhykkeellä 10**.
- Yksityinen, voittoa tavoittelematon tieteellinen laitos, jota
  ylläpitää guatemalalaisista koostuva johtokunta.
- Tunnettu **hautakeramiikasta**; kokoelmassa on myös siirrettäviä
  kivityöveistoksia etenkin esiklassiselta kaudelta rannikolta ja
  ylängöiltä sekä **parhaiten säilyneitä mayamaljakoita ja
  -kulhoja**.
- Kokoelma sai alkunsa **1975**, kun **Jorge Castillo** palkkasi
  arkeologian opiskelijan **Maro Tejadan** luetteloimaan hänen
  kokoelmansa; se avattiin yleisölle vyöhykkeellä 1. Castillon
  kuoltua **1977** kokoelma lahjoitettiin yliopistolle.
- *(Popol Vuh -kirja itsessään on maalehden aihe; museon nosto
  kertoo kokoelmasta ja sen synnystä, ei kirjasta.)*

---

## 3. Kohdekartta (8 kohdetta) ja nähtävyysjutut

Rajaus: pohjoinen 14,6505 / etelä 14,6330 / länsi −90,5250 / itä
−90,5010 (noin 2,6 × 1,9 km, koko historiallinen keskusta).
Koordinaatit en- ja es-Wikipedian `prop=coordinates`-rajapinnasta
7.9.2026. **Yksikään kohde ei ole lehden noston aihe.**

| # | Kohde | lat, lon | Lähdeartikkeli |
| --- | --- | --- | --- |
| 1 | Cerrito del Carmen | 14.64681, −90.50583 | es "Cerrito del Carmen" |
| 2 | La Recolecciónin kirkko | 14.64689, −90.5171 | es "Iglesia la Recolección" |
| 3 | Kansallispalatsi | 14.64294167, −90.51322778 | en "National Palace (Guatemala)" |
| 4 | Kansalliskirjasto | 14.641974, −90.514997 | es "Biblioteca Nacional de Guatemala" |
| 5 | San Juan de Diosin sairaala | 14.639523, −90.520740 | es "Hospital San Juan de Dios (Guatemala)" |
| 6 | Instituto Nacional Central | 14.639512, −90.510715 | es "Instituto Nacional Central para Varones" |
| 7 | Postipalatsi | 14.637, −90.513 | es "Edificio de Correos de Guatemala" |
| 8 | Santo Domingon kirkko | 14.637526, −90.506576 | es "Iglesia de Santo Domingo (Ciudad de Guatemala)" |

Pienin väli on **218 m** (kansallispalatsi – kansalliskirjasto),
seuraavat 372 m (postipalatsi – Instituto Central) ja 496 m
(Instituto Central – Santo Domingo). Katedraali jätettiin pois
numeroiduista kohteista, koska se on vain **191 m** palatsista eli
alle 200 metrin säännön — se kerrotaan noston G2 lopussa.

**Juttujen ydinfaktat:**

1. **Cerrito del Carmen** — katolinen erakkomaja kukkulan laella,
   **vähintään sata vuotta vanhempi kuin kaupunki itse**.
   Laaksoa kutsuttiin **Vacas-laaksoksi**, koska valloittaja Héctor
   de la Barreda toi sinne Kuubasta karjaa, joka lisääntyi rehevillä
   laitumilla. **Juan Corz**, Toiranosta (Genova) kotoisin ollut
   maallikkoveli, saapui laaksoon noin 35-vuotiaana ja asettui
   kahteen luolaan: toiseen Neitsyt Marian kuvan, toiseen itsensä.
   Hän lähti luolastaan vain kahdesti vuodessa kerjäämään.
   Pyhiinvaeltajat alkoivat käydä kuvan luona, ja kukkulalle
   rakennettiin kappeli; Corz oli nähnyt Pyhällä maalla **Karmelin
   vuoren** ja piti kukkulaa sen kaltaisena. Tulipalo tuhosi
   ensimmäisen majan, ja uusi temppeli valmistui **1620** — vuosiluku
   näkyy sakaristossa. Kirkko oli laakson **seurakunnan kotikirkko
   76 vuotta, 1647–1723**. Corz katosi jäljettömiin sen jälkeen kun
   Mixcon pappi ilmiantoi hänet inkvisitiolle **1.6.1620**.
   Rakennus on kunnostettu vuosien **1917** ja **1976** järistysten
   jälkeen; se on julistettu kansalliseksi kulttuuriperinnöksi.
2. **La Recolecciónin kirkko** — yksi uuden pääkaupungin
   suurista kirkoista siirron **1776** jälkeen. Se peri osan
   Santiagon **Colegio de Cristo Crucificado de Propaganda Fide**
   -oppilaitoksen omaisuudesta; oppilaitoksen olivat perustaneet
   veljet Jorge de la Torre ja **Antonio Margil de Jesús** vuonna
   **1701**, ja Santa Martan järistys **29.7.1773** vaurioitti sitä
   pahoin. Rakennuttajana oli luostarin syndikko **Juan Fermín de
   Aycinena**, aikansa vaikutusvaltaisimman suvun patriarkka.
   Kirkossa on barokkiveistoksia, mm. ryhmä **"Los Justos"**
   (Joakim, Anna ja Neitsyt Maria lapsena), sekä pääsiäisen
   kulkueveistokset *Cristo de la Penitencia* ja *Cristo Nazareno*.
   Kirkko oli fransiskaanien hoidossa **6.3.2016 asti**; nykyään se
   kuuluu arkkihiippakunnalle.
3. **Kansallispalatsi (Palacio Nacional de la Cultura)** —
   kansanomaiselta nimeltään **"Palacio Verde"**, vihreä palatsi.
   Rakennus on **maan kaikkien teiden lähtöpiste**: siellä on
   **kilometri nolla**. Historia on yritysten sarja:
   **1919** presidentti Estrada Cabrera laski peruskiven ja
   italialainen arkkitehti **Guido Albani** sai suunnittelutehtävän,
   mutta hanke raukesi. **1921** presidentti Carlos Herrera rakennutti
   satavuotisjuhliin **Palacio del Centenarion kolmessa kuukaudessa**
   pienellä budjetilla; sitä kutsuttiin **"pahvipalatsiksi"**
   (Palacio de Cartón), ja se tuhoutui tulipalossa **1925**.
   **1927** järjestetyn kilpailun voitti taiteilija Agustín Iriarte,
   mutta sekään ei toteutunut. Vasta **1932** julkaistiin nykyisen
   palatsin perusteet, peruskivi laskettiin **4.7.1937**, ja palatsi
   rakennettiin **tammikuun 1939 ja 1943 välillä**; se vihittiin
   **10. marraskuuta 1943**. Rakennus **kesti 4.2.1976 järistyksen**
   (7,5). Nykyään se on museo ja valtion juhlatila.
4. **Kansalliskirjasto** — Biblioteca Nacional de Guatemala
   **"Luis Cardoza y Aragón"**, perustettu asetuksella
   **18.10.1879** ja avattu yleisölle **24.6.1880** Sociedad
   Económican rakennuksessa; ensimmäinen johtaja oli **Dámaso
   Micheo**. Peruskokoelma tuli Sociedad Económicalta, lakkautetulta
   paavilliselta San Carlos Borromeon yliopistolta, Escuela
   Politécnicalta, Escuela de Artes y Oficiosilta ja lakkautetuilta
   luostareilta. **1918** kirjasto siirtyi San Carlosin yliopiston
   juhlasaliin vuosien **1917–18 järistysten** jälkeen ja muutti
   sen jälkeen useita kertoja, kunnes sai oman talon
   **syyskuussa 1957**. Vuonna **1897** kokoelma oli **19 400
   nidettä**, enimmäkseen uskonnollista kirjallisuutta; ostoihin
   kuuluivat arkkipiispa Ramón Casaus y Torresin kokoelma ja
   yhdysvaltalaisen Savage-nimisen Amerikan historian tutkijan
   englanninkielinen kirjasto. Johtajina on ollut kirjailijoita,
   mm. **José Joaquín Palma** ja **Rafael Arévalo Martínez**.
5. **San Juan de Diosin sairaala** — sairaalaveljeskunta San Juan
   de Diosin veljet saapuivat Meksikosta Santiago de los Caballeros
   de Guatemalaan **1630** isä **Carlos Cívico de la Cerdan**
   johdolla ja perustivat luostarinsa **1636**; sen jälkeen he
   hoitivat kaikkia kenraalikapteenikunnan sairaaloita. Sairaalat
   olivat eriytetyt: **San Alejo** alkuperäisväestölle, **San
   Pedro** papistolle, **Santiago** espanjalaisille ja mulateille,
   sekä **San Lázaro**. **1667** dominikaanit luovuttivat San
   Alejon veljeskunnalle, ja **1685** San Alejo ja Santiago
   yhdistettiin **San Juan de Diosin sairaalaksi**. Vuoden
   **1773** järistysten jälkeen sairaala siirtyi uuteen
   pääkaupunkiin, jossa se sijaitsi kaupungin länsilaidalla ja
   selvisi sekä **1917–18** että **1976** järistyksistä; nykyiseen
   rakennukseensa se muutti **1981**.
6. **Instituto Nacional Central para Varones** — poikien
   keskusoppikoulu, joka syntyi **1875**, kun Colegio Tridentino
   otettiin kirkolta valtiolle. Ensimmäinen rehtori oli kuubalainen
   **Hildebrando Martí**, runoilija **José Martín veli**; seuraavana
   vuonna johtoon tuli tri Santos Toruño. Ensimmäiseen
   opettajakuntaan kuului mm. saksalainen matematiikan ja tähtitieteen
   opettaja **Edwin Rockstroh**, joka järjesti kouluun
   **observatorion**, julkaisi sen säähavainnot ja lahjoitti
   matkoiltaan täytettyjä eläimiä koulun luonnontieteelliseen
   museoon. Koulu oli pitkään maan arvostetuin poikien
   oppilaitos.
7. **Postipalatsi** — Edificio de Correos y Telégrafos,
   rakennettu **1937–1940**, suunnittelijat **Rafael Pérez de León**
   ja **Enrique Riera**. Tyyli on **uussiirtomaatyylinen**, ja
   rakennuksen tunnusmerkki on **12. kadun yli kaartuva holvikaari**,
   jonka esikuva on **Antigua Guatemalan Santa Catalinan kaari**.
   Ensimmäinen vaihe vihittiin **10.11.1940 kello 16**, ja loput
   valmistuivat seuraavina vuosina. Rakennus julistettiin
   kansallismonumentiksi **9.11.1981** ja kansalliseksi
   kulttuuriperinnöksi **13.8.1998**. Nykyään siellä toimii
   kansallinen posti ja **posti-, lennätin- ja filateliamuseo**.
8. **Santo Domingon kirkko** — nykyisin **Nuestra Señora del
   Rosarion basilika**; tyyli on klassista barokkia ja
   "seismistä uusklassismia". Dominikaanien vanha kirkko ja luostari
   luhistuivat Santiagossa **1773**; veljet siirtyivät uuteen
   pääkaupunkiin **1776** mukanaan Ruusukon Neitsyen kuva ja
   kulkueveistoksia. Rakentaminen alkoi **1776** arkkitehti
   **Pedro Garci-Aguirren** johdolla, ja kirkko vihittiin
   **8.11.1808** osana Ferdinand VII:n kruunajaisjuhlia.
   Perustuksiin käytettiin **Las Vacasin louhosten kiveä**,
   Antiguasta pelastettua rakennusainetta sekä
   **sokeriruokosiirappia ja lehmänmaitoa** veljeskunnan omilta
   maatiloilta. Kirkko rakennettiin uudelleen kahdesti: vuosien
   **1917–18** järistysten jälkeen (jälleenrakennuskomitea, fray
   Pablo Sánchez) ja **4.2.1976** järistyksen jälkeen. Luostarin
   raunioihin sijoitettiin lopulta antropologian ja historian
   instituutti (IDAEH).

---

## 4. Matkaopas (Matkailijan Guatemala City) — 5 jaksoa

1. **Perille ja liikkeelle:** La Auroran kansainvälinen lentoasema
   vyöhykkeellä 13, kaupungin päätieverkon lähtöpiste;
   **Transmetro**-runkobussijärjestelmä; vyöhykenumero on osa
   osoitetta, joten se kannattaa lukea ensin.
2. **Vyöhyke 1 kävellen:** Plaza de la Constitución, kansallispalatsi
   ja katedraali, Paseo de la Sexta eli kuudes avenue, Mercado
   Central katedraalin takana, postipalatsin kaari 12. kadun yllä.
3. **Mitä täällä syödään:** *(maalehti kertoo ruokalajit —
   oppaassa vain kaupungin paikat: Mercado Centralin ruokakojut,
   Cuatro Grados Norte vyöhykkeellä 4, Zona Viva vyöhykkeellä 10)*.
4. **Museokaupunki:** Museo Popol Vuh ja Ixchel-museo vyöhykkeellä
   10, Museo Nacional de Arqueología y Etnología, Museo Nacional de
   Arte Moderno "Carlos Mérida" ja luonnonhistoriallinen museo
   vyöhykkeellä 13 La Auroran puistossa, Mapa en Relieve
   vyöhykkeellä 2, Miraflores-museo vyöhykkeellä 11.
5. **Milloin kannattaa tulla:** ilmasto ja vuodenajat (ks. G4).
   **Säärivi ei kuulu tähän erään**, joten sääjakso nojaa
   en-Wikipedian Climate-osioon ja sanoo sen ääneen.

**Parasta (5 kohtaa):** Kaminaljuyún puisto, kansallispalatsi ja
Plaza de la Constitución, Mapa en Relieve, Museo Popol Vuh,
kansallisteatterin jaguaari.
**Hyvä tietää (4 kohtaa):** vyöhyke kuuluu osoitteeseen; sadekausi
touko–lokakuu ja rankkasateet; illat viilenevät 1 500 metrissä;
tulivuoret näkyvät kaupunkiin ja Pacaya purkaa tuhkaa ajoittain.

---

## 5. Minitehtävä (teemasivulle `kuvataide`)

**Ei saa toistaa visaa** (pääkaupunki, Tikal, vuoristo, kahvi,
huipil). Ehdotus:

> Kysymys: Minkä eläimen muotoiseksi Efraín Recinos suunnitteli
> Guatemala Cityn kansallisteatterin?
> Vaihtoehdot: istuvan jaguaarin / kilpikonnan / ketsaalin /
> krokotiilin
> Oikea: istuvan jaguaarin
> Fakta: Valkoinen rakennus nousi kukkulalle vanhan Fuerte de San
> Josén paikalle, ja sen muoto on mayamotiivien innoittama.

Vastaus löytyy **samalta sivulta** (nosto K3).

---

## 6. Kuvat

Kuvat haetaan Commonsin API:sta kategoria- ja hakusanahauilla,
lisenssi ja tekijä luetaan `extmetadata`-kentistä, ja jokainen
valittu kuva katsotaan silmin. Varattuja (jo käytössä
`northamerica-valokuvat.js`:ssä): `Guatemala, Plaza De Armas
LCCN2014706038.tif`, `Palacion Nacional de Guatemala 12.jpg`,
`Paseo de la Sexta, Guatemala City - Dos medios, el mismo
camino.jpg`, `Central Market (3746532790).jpg`, `View of eruption of
Fuego Volcano from Guatemala City.jpg`. Ennen–nyt-pari otetaan
valokuvataulusta (Plaza de Armas 1915 / kansallispalatsi 2022)
reseptin mukaan.
