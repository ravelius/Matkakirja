# Guatemala Cityn faktapohjan tarkistus

Tarkistettu **7.9.2026** en- ja es-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä
faktapohjan omiin sitaatteihin luotettu. Kiistanalaiset väitteet
haettiin `grep -o` -täsmähaulla sanatarkkoina merkkijonoina, ja
kaksi väitettä tarkistettiin **siivoamattomasta** raakatekstistä,
koska mallineiden poisto oli syönyt numeron (ks. kohta E).
Koordinaatit haettiin itse (`prop=coordinates&redirects=1`,
molemmat kieliversiot) ja kaikki 28 kohdeparin etäisyyttä
laskettiin haversinilla.

Luetut artikkelit — en-Wikipedia: **Guatemala City**, **History of
Guatemala City**, **Kaminaljuyu**, **National Palace (Guatemala)**,
**Cathedral of Guatemala City**, **Relief map of Guatemala**,
**Centro Cultural Miguel Ángel Asturias**, **Efraín Recinos**,
**Carlos Mérida**, **Museo Popol Vuh**, Torre del Reformador.
es-Wikipedia: **Cerrito del Carmen**, **Iglesia la Recolección**,
**Iglesia de Santo Domingo (Ciudad de Guatemala)**, **Edificio de
Correos de Guatemala**, **Biblioteca Nacional de Guatemala**,
**Hospital San Juan de Dios (Guatemala)**, **Instituto Nacional
Central para Varones**.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–C ratkaisut tehdään ja kohdan E varoitus otetaan huomioon.**
Asiavirheitä ei löytynyt. Kaksi kohtaa on Wikipedian sisäisiä
ristiriitoja, yksi on lähdekielen valinta ja yksi menetelmällinen
sudenkuoppa.

---

## A. RISTIRIITA — Kaminaljuyún nimen merkitys

**Lähde 1 ("Kaminaljuyu", johdanto), sanatarkasti:**
*"Kaminaljuyu (pronounced ; from Quiché, "The Hill of the Dead")"*.

**Lähde 2 (sama artikkeli, "Archaeological excavations"),
sanatarkasti:** *"Villacorta gave the site its name from a Kʼicheʼ
word meaning "mounds of the ancestors.""*

**Ratkaisu:** sama artikkeli antaa kaksi käännöstä samasta nimestä.
**Lehti kertoo molemmat** ja sanoo, että nimen antoi opetusministeri
J. Antonio Villacorta 1930-luvulla — ei siis valitse toista
oikeaksi. Kirjataan lohkokommenttiin.

---

## B. RISTIRIITA — milloin Kaminaljuyú romahti

**Lähde 1 ("Kaminaljuyu", johdanto), sanatarkasti:**
*"Kaminaljuyu then mysteriously collapsed around A.D. 300 for as
yet unknown historical causes."*

**Lähde 2 (sama johdanto, seuraava virke), sanatarkasti:**
*"More recent research, however, indicates that Kaminaljuyu's
economic and political decline occurred during the Late Classic
period (AD 550–800), and that its ultimate collapse … took place in
the Terminal Classic period (AD 800–900)."*

**Ratkaisu:** artikkeli itse asettaa uudemman tutkimuksen vanhan
tilalle. **Lehti kertoo uuden tulkinnan** (taantuma 550–800,
romahdus 800–900) ja mainitsee vanhan lukeman siksi, että se
esiintyy yhä kirjallisuudessa. Molemmat samassa virkkeessä.

---

## C. LÄHDEKIELI — puolet kohdekartan kohteista vain es-Wikipediassa

Guatemala Cityn keskustan rakennuksista **viidellä kahdeksasta ei
ole englanninkielistä artikkelia lainkaan** (Cerrito del Carmen,
La Recolección, Santo Domingo, Postipalatsi, kansalliskirjasto,
San Juan de Diosin sairaala, Instituto Nacional Central). Tarkistin
tämän hakukoneella (`list=search`, en-Wikipedia): osumat ovat
Antigua Guatemalan samannimisiä rakennuksia, eivät pääkaupungin.

**Ratkaisu:** näiden juttujen lähde on **es-Wikipedia**, ja se
sanotaan lähderivillä ("es-Wikipedia \"…\". Tarkistettu 7.9.2026.").
Ennakkotapaus on repossa: `js/packs/fokusvirta-granada.js` ja
`fokusvirta-madrid.js` käyttävät es-Wikipediaa samalla merkinnällä,
`js/packs/elaintakyt.js` ja `fokusvirta-lontoo.js` de-Wikipediaa.
**Huomio kirjoittajalle:** älä sekoita Antiguan ja pääkaupungin
samannimisiä kirkkoja — molemmilla on Iglesia de San Francisco,
La Merced ja Santo Domingo. Jokainen juttu tarkistettiin tältä osin
erikseen.

---

## D. TARKISTETTU JA OIKEIN — luvut, jotka on helppo kirjoittaa väärin

- **"In 1776, the seat of government was moved to the current
  location of Guatemala City, located in a valley less prone to
  earthquakes."** — "Guatemala City", Colonial history.
- **Katedraali: "mostly built between 1782–1815 and completed in
  1871"** — sama artikkeli. Siirto uuteen pääkaupunkiin
  **22.11.1779** — "Cathedral of Guatemala City".
- **Vyöhykkeet: "The city is subdivided into 22 zones"** ja
  **"Zones are numbered 1–25, with Zones 20, 22 and 23 not existing
  as they would have fallen in two other municipalities'
  territory."** — luvut ovat keskenään yhteensopivat (25 − 3 = 22).
  Osoite-esimerkki "7a Av. 1–17, Zona 4" ja sen selitys (17 metriä
  risteyksestä) on artikkelista sanatarkasti.
- **Järistykset: "The 1917-1918 earthquakes destroyed many
  structures … during its 144 years after the previous devastating
  tremors of the Santa Marta Earthquake of 1773"** ja **"The 1976
  event registered 7.5 on the moment magnitude scale"** —
  "Guatemala City".
- **Kuoppa 2007: 100 metriä syvä, viisi kuollutta, tuhat
  evakuoitua, luokitus "piping pseudokarst"** — sama artikkeli.
- **Kaminaljuyú: "comprised some 200 platforms and pyramidal
  mounds"**, säilynyt osa **0,5 km²** alkuperäisestä noin **5 km²**
  kentästä, rakennusaine kovetettu adobe, löytö varmistui
  jalkapalloseuran kaivettua kummun reunaa — "Kaminaljuyu".
- **Mapa en Relieve: 19.4.1904 – 29.10.1905, 18 kuukautta,
  1:10 000 ja 1:2 000, noin 1 800 m², Francisco Vela, Claudio
  Urrutia, 60 m³ säiliö, kaide 90 cm ja kuusi mitalia, kunnostukset
  1980 ja 2014** — "Relief map of Guatemala".
- **Kansallisteatteri: avattu 1978, Efraín Recinos ja Carlos
  Alberto Haeussler, istuvan jaguaarin muoto, vanhan Fuerte de San
  Josén paikalla** — "Centro Cultural Miguel Ángel Asturias" ja
  "Efraín Recinos" (jälkimmäinen sanoo *"set on a hill to resemble
  a jaguar, using inspiration from more traditional Mayan
  motifs"*).
- **Kansallispalatsi: peruskivi 4.7.1937, rakennettu tammikuusta
  1939 vuoteen 1943, vihitty 10.11.1943, kesti 4.2.1976
  järistyksen, kilometri nolla, "Palacio Verde"; pahvipalatsi 1921
  ja sen palo 1925** — "National Palace (Guatemala)".
- **Postipalatsi: 1937–1940, Rafael Pérez de León ja Enrique Riera,
  kaari 12. kadun yllä Santa Catalinan kaaren mukaan, ensimmäinen
  vaihe vihittiin 10.11.1940 klo 16** — es "Edificio de Correos de
  Guatemala".
- **Kansalliskirjasto: asetus 18.10.1879, avattu 24.6.1880,
  ensimmäinen johtaja Dámaso Micheo, siirto yliopiston juhlasaliin
  1918, oma talo syyskuussa 1957, 19 400 nidettä vuonna 1897** —
  es "Biblioteca Nacional de Guatemala".
- **San Juan de Dios: veljet Meksikosta 1630, luostari 1636,
  San Alejo veljeskunnalle 1667, yhdistäminen 1685, muutto uuteen
  pääkaupunkiin 1773 jälkeen, nykyinen rakennus 1981** — es
  "Hospital San Juan de Dios (Guatemala)".
- **Instituto Nacional Central: 1875, Colegio Tridentino otettiin
  valtiolle, ensimmäinen rehtori Hildebrando Martí (José Martín
  veli), Edwin Rockstrohin observatorio** — es "Instituto Nacional
  Central para Varones".
- **Santo Domingo: dominikaanit uuteen kaupunkiin 1776, rakennus
  alkoi 1776 Pedro Garci-Aguirren johdolla, vihkiminen 8.11.1808
  Ferdinand VII:n kruunajaisjuhlien osana, perustuksissa Las
  Vacasin louhoskiveä, sokeriruokosiirappia ja lehmänmaitoa,
  jälleenrakennus 1917–18 ja 1976 jälkeen** — es "Iglesia de Santo
  Domingo (Ciudad de Guatemala)".
- **Cerrito del Carmen: temppeli valmistui 1620 (vuosiluku näkyy
  sakaristossa), seurakunnan kotikirkko 1647–1723, Juan Corz
  ilmiannettiin inkvisitiolle 1.6.1620, kunnostukset 1917 ja 1976
  jälkeen** — es "Cerrito del Carmen".
- **Ilmasto: Köppen Aw, korkeus 1 500 m, päivä 22–28 °C, yö
  12–17 °C, kosteus 82 % / 58 %, kastepiste 16 °C, kuumin kuukausi
  huhtikuu, sadekausi touko–lokakuu** — "Guatemala City", Climate
  (luvut `convert`-mallineista, jotka luettiin raakatekstistä).

---

## E. MENETELMÄVAROITUS — mallineiden poisto syö vuosisadat ja luvut

Raakatekstin siivoaminen (mallineiden `{{…}}` poisto) hävittää
`{{convert|…}}`- ja `{{versalita|xvii}}`-mallineiden sisällön, ja
teksti näyttää silti ehjältä: *"cuya construcción se remonta al
siglo , por lo menos cien años antes"*. **Jokainen numero, joka
päätyy lehteen, on siksi tarkistettu siivoamattomasta
raakatekstistä.** Esimerkki: Cerrito del Carmenin vuosisata on
siivoamattomassa lähteessä `siglo {{versalita|xvii}}` eli
**1600-luku**, mikä sopii yhteen temppelin valmistumisvuoden 1620
kanssa. Sama tarkistus tehtiin ilmastoluvuille ja kuopan syvyydelle.

**Huomio kirjoittajalle:** älä käytä vuosisatalukuja, joita et ole
nähnyt siivoamattomassa lähteessä. La Recolecciónin
kulkueveistosten vuosisadat jäivät mallineiden sisään, joten
niistä **ei kerrota vuosisataa** — vain se, että ne ovat barokkia ja
kuuluvat pääsiäisen kulkueisiin.

---

## F. KOORDINAATIT JA ETÄISYYDET — laskettu uudelleen

Kaikki kahdeksan koordinaattia haettiin `prop=coordinates`
-rajapinnasta 7.9.2026 (kolme en-Wikipediasta, viisi
es-Wikipediasta) ja kaikki 28 kohdeparin etäisyyttä laskettiin
haversinilla. **Pienin väli on 219 m** (kansallispalatsi –
kansalliskirjasto), seuraavat **372 m** (Instituto Central –
postipalatsi) ja **467 m** (kansallispalatsi – Instituto Central).
Kaikki yli 200 metrin säännön; Nairobin 216 metrin ennakkotapaus
tukee tätä.

**Katedraali pudotettiin numeroiduista kohteista**, koska sen
koordinaatti (14,641686 / −90,512029) on vain **191 m**
kansallispalatsista. Kirkko näkyy kartalla rakennuksena, ja sen
tarina kerrotaan noston G2 lopussa.

**Mapa en Relieve (14,66046 / −90,50863) ja Torre del Reformador
(14,613027 / −90,516801) jäävät ruudun ulkopuolelle**: ne ovat
2,1 km pohjoiseen ja 3,3 km etelään keskustasta, ja niiden
ottaminen mukaan olisi venyttänyt ruudun yli viiden kilometrin
korkuiseksi ja alle kahden kilometrin levyiseksi. Mapa en Relieve
on teemasivun noston K1 aihe.

---

## G. SISÄLTÖRAJAUS — tarkistettu erikseen

Luin GTM-maalehden faktapohjan ja `maa-kategoriat.js`:n GTM-lohkon
otsikkotasolla: kaupunkilehden aiheista **yksikään ei toistu**
maalehdessä. Antiguan tarina ja vuoden 1773 järistys ovat
maalehdessä, joten kaupunkilehti mainitsee ne vain siirron syynä.
Marimba on maalehdessä, joten Mapa en Relieven vieressä oleva
**Bosque Sonoro del Hormigo (marimbasäveltäjien puisto) jätetään
pois**. Tekstiilit ovat maalehdessä, joten **Ixchel-museo mainitaan
vain matkaoppaan luettelossa** eikä saa omaa nostoa. Popol Vuh
-kirja on maalehdessä; museon nosto kertoo kokoelmasta ja sen
synnystä, ei kirjasta.

**Nykypolitiikka ja väkivalta:** katedraaliartikkelin
kaksitoista muistopilaria, kansallispalatsiartikkelin vuoden 1982
vallankaappaus ja erityistuomioistuimet, sisällissota 1960–1996
sekä kaupunkiartikkelin nykyrikollisuus **jäävät kokonaan pois**
(spec-mantereet.md, Keski-Amerikan linjaus). Tämä tarkistettiin
kohta kohdalta.

**Pilari 4 (ei kaunistelua):** 1800-luvun laajeneminen kerrotaan
lähteen omin sanoin myös siltä osin, että se syrjäytti
alkuperäiskansojen asutuksia kaupungin laidoilta (*"unfortunately
displacing indigenous peoples in the settlements on the peripheries
of the city"*), ja vuoden 2007 kuopan viisi kuollutta kerrotaan
neutraalisti.
