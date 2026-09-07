# Antofagastan faktapohjan tarkistus

Tarkistettu **7.9.2026** Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä faktapohjan
omiin sitaatteihin luotettu. Kiistanalaiset päivämäärät haettiin
`grep -o` -täsmähaulla sanatarkkoina merkkijonoina. Koordinaatit
haettiin itse (`list=geosearch`, `prop=coordinates`) ja kaikki 28
kohdeparin etäisyyttä laskettiin itse haversinilla.

Luetut artikkelit — **en**: Antofagasta, Antofagasta Region,
Antofagasta Province, La Portada, Camanchaca, Ruinas de Huanchaca,
Ferrocarril de Antofagasta a Bolivia, Salta–Antofagasta railway,
Mejillones Peninsula, St. Joseph's Cathedral (Antofagasta), Tropic of
Capricorn, War of the Pacific. — **es**: Antofagasta, Barrio Histórico
de Antofagasta, Muelle Salitrero Compañía Melbourne Clark, Muelle
Miraflores, Museo de Antofagasta, Plaza Colón (Antofagasta), Teatro
Municipal de Antofagasta, Catedral de Antofagasta, Casa Gibbs, Casa
Giménez, Casa Abaroa, Casa de la Cultura Andrés Sabella, Edificio del
Banco Mercantil de Bolivia, Estación del Ferrocarril de Antofagasta a
Bolivia, Ruinas de Huanchaca, Monumento natural La Portada, Torre
Icono (Antofagasta), Parque Croacia, Faro Molo de Abrigo de
Antofagasta.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–F ratkaisut tehdään.** Asiavirheitä ei löytynyt. Neljä kohtaa on
Wikipedian sisäisiä ristiriitoja (kaksi niistä eri kieliversioiden
välillä), yksi on lähteen varaus ja yksi on linjauskysymys, joka
ratkaisee koko lehden sävyn.

---

## A. RISTIRIITA — milloin Antofagastasta tuli Puerto Mayor

**en "Antofagasta", Early settlers, sanatarkasti:** *"On 8 May 1872,
Antofagasta was designated by the Bolivian Government as Puerto
Mayor, opening trade worldwide."*

**es "Antofagasta", Época boliviana, sanatarkasti:** *"El 8 de mayo de
1871, Antofagasta fue designada por el gobierno boliviano como Puerto
Mayor, abierto al comercio de todo el mundo."*

Päivä ja kuukausi ovat samat, vuosi eroaa yhdellä. Kumpikaan ei anna
lähdeviitettä (en-artikkelissa on jopa `citation needed` -merkintä
samassa kappaleessa).

**Ratkaisu:** lehti sanoo **"1870-luvun alussa"** ja kertoo, mitä
Puerto Mayor tarkoitti (satama avoinna koko maailman kaupalle).
Vuosilukua ei anneta, koska lähteet eivät ole siitä yhtä mieltä eikä
kumpikaan ole toista vahvempi. Ero kirjataan lohkokommenttiin.

---

## B. RISTIRIITA — milloin Melbourne Clark -yhtiö perustettiin

**es "Antofagasta", Época boliviana:** *"El 19 de marzo de 1868 se
constituyó la ''Compañía Melbourne Clark''…"*

**es "Casa Gibbs", Origen:** *"El 19 de marzo de 1869 se constituyó la
firma ''Melbourne Clark & Co.''…"* — ja saman artikkelin mukaan
Gibbs-yhtiölle siirretty puolikas käsiteltiin **1. maaliskuuta 1869
Valparaísossa**, mikä sitoo yhtiön perustamisen loogisesti maaliskuun
1869 tapahtumaketjuun.

**Ratkaisu:** käytetään **Casa Gibbs -artikkelin vuotta 1869**, koska
se on kohteen oma artikkeli ja koska sen aikajärjestys on sisäisesti
ehyt (siirto 1.3.1869 → yhtiö 19.3.1869 → laajennettu toimilupa
5.9.1869). Ristiriita kirjataan lohkokommenttiin, eikä vuosiluku ole
lehden nostoissa vaan vain kohdekartan Gibbs-jutussa.

---

## C. RISTIRIITA — Torre Relojin vuosi ja "Big Benin jäljennös"

**en "Antofagasta", 20th century, sanatarkasti:** *"In 1912, the
British community (La Colonia Britanica) erected a clock tower,
replicating Big Ben, in Plaza Colón to celebrate the republic's
centenary."*

**es "Plaza Colón (Antofagasta)", Monumentos:** torni *"se inauguró el
17 de septiembre de 1911"*, ja artikkeli sanoo suoraan, että vaikka
tornia kansanomaisesti pidetään Big Benin jäljennöksenä, **"este solo
posee similitud en su sonido"**.

**Ratkaisu:** käytetään es-artikkelin päivämäärää **17.9.1911**, koska
se on aukion oma artikkeli, se antaa täsmällisen päivän ja se on
linjassa muiden satavuotislahjojen kanssa (kroatialaisten kioski
26.3.1911). **Jäljennösväite kumotaan lukijalle ääneen** — juuri se
on jutun paras kohta, ja en-Wikipedian oma muotoilu "replicating Big
Ben" on esimerkki siitä, miten sitkeä väärinkäsitys on.

---

## D. RISTIRIITA — Casa Abaroan rakennusvuosi

**es "Casa Abaroa", Historia:** *"La casa fue construida en 1920 por
mandato del empresario boliviano Andrónico Abaroa Rivero"*, mutta
saman artikkelin luokitusrivi on `Arquitectura de 1927`, ja
**es "Antofagasta", Museos y bibliotecas** -osion kuvateksti sanoo
*"construida en 1927"*.

**Ratkaisu:** **Casa Abaroa jätetään kokonaan pois** sekä lehdestä
että kohdekartalta. Talo on 940 metriä etelään Colónin aukiolta eikä
mahdu rajaukseen, eikä epävarmaa vuosilukua kannata kirjoittaa peliin,
kun kohde ei muutenkaan ole kartalla. Ristiriita kirjataan tähän, jotta
seuraava sessio ei löydä sitä uudelleen.

---

## E. LÄHTEEN VARAUS — nimen alkuperä

**en "Antofagasta", Etymology** on yksi lause, ja siinä on lainausmerkit
sanan ympärillä: *"The name of Antofagasta is 'presumably' derived from
the name of Antofagasta de la Sierra in Catamarca Province,
Argentina."*

**es "Antofagasta", Toponimia** sanoo suoraan, ettei yksimielisyyttä
ole (*"No se ha logrado llegar a un consenso respecto a este"*), ja
antaa kolme kielitieteellistä teoriaa (cacán, ketšua, chango-kansan
*Antofagasti*) sekä Melgarejo-tarinan verbimuodossa *"Se dice que"*.

**Ratkaisu:** noston A2 aihe on **juuri se, ettei nimen alkuperää
tiedetä**. Kaikki neljä selitystä kerrotaan, jokainen omana
mahdollisuutenaan, ja lähteen varaus ("kerrotaan", "todennäköisesti")
säilytetään. Yhtä ei nosteta oikeaksi. Tämä on Manaus- ja
Lagos-ennakkotapausten mukainen ratkaisu.

---

## F. LINJAUS — Tyynenmeren sota ja Bolivian merikysymys

Antofagastan koko olemassaolo on kietoutunut siihen, että kaupunki
kuului Bolivialle ja siirtyi Chilelle vuoden 1879 valtauksen ja
vuoden 1904 sopimuksen kautta. Aihetta **ei voi jättää pois** — se on
kaupungin tärkein tapahtuma ja isoisän matkavuoden 1873 suora jatko —
mutta se on käsiteltävä reseptin linjauksen mukaan.

**Ratkaisu:**
1. Sota kerrotaan **tapahtumina ja sopimuksina**: 1866, 1874, veron
   kiista, 14.2.1879, 1884 välirauha, 20.10.1904 rauhansopimus ja sen
   ehdot. Ei taisteluita, ei uhrilukuja, ei sankareita.
2. **Molemmat lukutavat kerrotaan** — Bolivian ja Chilen tulkinnat
   kymmenen sentin verosta ovat molemmat lähteissä, ja lehti esittää
   ne rinnakkain valitsematta puolta.
3. **Nykyistä merikiistaa ei mainita.** es-artikkeli sanoo, että
   vuoden 1904 sopimus on ollut jatkuvien diplomaattisten jännitteiden
   lähde 1900- ja 2000-luvuilla; tämä on nykypolitiikkaa eikä kuulu
   peliin.
4. **Vuoden 1906 Plaza Colónin työtaistelu ja sen uhriluku jätetään
   pois** aukion jutusta. Sama koskee Huanchaca-kadun rikostapauksia
   (1969, 1978) ja diktatuurin aikaisia muistopaikkoja.

---

## G. VARMISTETUT LUVUT (täsmähaku, sanatarkat osumat)

| Väite | Lähde ja osio | Osuma |
|---|---|---|
| Kaupungilla ei ole perustamiskirjaa | es "Antofagasta", Época boliviana | *"La ciudad de Antofagasta carece de acta de fundación."* |
| Käyttöoikeus 18.9.1866 | es, sama osio | *"El 18 de septiembre de 1866, José Santos Ossa y Francisco Puelma…"* |
| Virallinen perustaminen 22.10.1868 nimellä La Chimba | es, sama osio | *"el 22 de octubre se fundó oficialmente la población y el puerto bajo el nombre de La Chimba"* |
| Asemakaava 14.9.1869, 17 korttelia ja aukio | es, sama osio | *"17 manzanas y una plaza principal"* |
| CSFA:n sopimus 27.11.1873, 15 vuotta verovapaata | en, War of the Pacific | *"On 27 November 1873, the 'Compañía de Salitres y Ferrocarril de Antofagasta' (CSFA) … signed a contract"* |
| Valtaus 14.2.1879, eversti Emilio Sotomayor | es, Guerra del Pacífico | *"El 14 de febrero de 1879 las … fuerzas militares chilenas … al mando del coronel … Emilio Sotomayor … ocuparon el puerto boliviano de Antofagasta"* |
| Rauhansopimus 20.10.1904 | en, 20th century | *"signed on 20 October 1904, and promulgated on 21 March 1905"* |
| Alle 0,1 mm sadetta, maailman kuivin kaupunki | en, Climate | *"less than 0.1 mm of rainfall per year, earning it the record as the world's driest town"* |
| Keskilämpötila 16,8 °C | en, Climate | *"The average annual temperature is {{convert&#124;16.8&#124;°C…"* (convert-malli) |
| Väkiluku 401 096 (2024), viidenneksi suurin | en, johdanto | *"with a population of 401,096, it is the 5th-largest city in Chile"* |
| Camanchacan pisarat 1–40 mikrometriä | en "Camanchaca" | *"between 1 and 40 microns across, too fine to form rain droplets"* |
| Sumuverkot 1985, 50 verkkoa, noin 2 % | en "Camanchaca", Fog collection | *"installed 50 large fog-collecting nets … which capture some 2% of the water in the fog"* |
| La Portadan kaari 43 × 23 × 70 m | en "La Portada", Description | *"The arch of La Portada is 43 m high, 23 m wide, and 70 m long"* (nbsp-merkein) |
| Fossiilit 35–2 miljoonan vuoden takaa | sama | *"dating back 35 to 2 million years ago"* |
| Huanchaca: 200 t/vrk, 3,85 t hopeaa/kk, 1 200 työntekijää | es "Ruinas de Huanchaca" | *"recibiendo 200 toneladas diarias … 3,85 toneladas de plata mensuales. La empresa llegó a emplear más de 1200 trabajadores."* |
| Huanchaca perustettiin 1873 | sama | *"En 1873 se fundó la ''Empresa Huanchaca de Bolivia''"* |
| Laituri 198 × 15,8 m | es "Muelle Salitrero…", Arquitectura | *"198 [[metros&#124;m]] de largo por 15,8 [[metros&#124;m]] de ancho"* |
| Kellotorni vihittiin 17.9.1911 | es "Plaza Colón (Antofagasta)" | *"se inauguró el 17 de septiembre de 1911"* |
| Katedraali valmistui 17.9.1917 | en "St. Joseph's Cathedral" | *"completed on September 17, 1917"* |
| FCAB perustettiin 1888, 900 km | en, Railways | *"founded in 1888"* ja *"{{convert&#124;900&#124;km…}} long rail network"* |

---

## H. KOHDEKARTAN GEOMETRIA (laskettu itse)

Koordinaatit `list=geosearch` (es-Wikipedia, keskipiste −23,6509 /
−70,3975, säde 4 000 m) ja `prop=coordinates`. Etäisyydet haversinilla,
28 paria. Rajaus **1,38 × 1,17 km**, suhde 1,18.

Pienimmät välit:
- **museo – Bolivian kauppapankki 104 m**
- **kaupunginteatteri – katedraali 108 m**
- **Colónin aukio – katedraali 124 m**
- **kauppapankki – Colónin aukio 129 m**
- **Colónin aukio – kaupunginteatteri 131 m**
- **salpietarilaituri – museo 136 m**

Suurin väli: **salpietarilaituri – Giménezin talo 795 m**.

Kaikki kuusi pienintä väliä alittavat 200 metriä, ja se on
Antofagastan historiallisen korttelin luonne: koko *Barrio Histórico*
on Simón Bolívarin ja Balmacedan väliin jäävä rantakaistale, ja
Colónin aukion neljä laitaa ovat neljä eri kohdetta. Rajauksella
yksi kuvapikseli on 3,8 metriä ja 24 pikselin numeroympyrä noin
**92 metriä**, joten viisi kuudesta parista ei mene lainkaan
päällekkäin; ainoa peitto on **kaupunginteatteri – katedraali,
noin 3 %**.

**Kaksi lähikohdetta jätettiin pois juuri tästä syystä:**
FCAB:n asema (26 m museosta) ja Muelle Miraflores (130 m
salpietarilaiturista). Molemmat kerrotaan matkaoppaassa tai toisen
kohteen jutussa.

**Salpietarilaiturin piste siirrettiin rannalle.** es-Wikipedian
koordinaatti (−23,64306 / −70,39833) osoittaa laiturin ulkopäähän, ja
`tools/tarkista-karttapisteet.mjs` ilmoitti sen sadan prosentin
vetenä. Työkalun oma kommentti sallisi laiturin vedessä (silta,
majakka), mutta portin on oltava vihreä ja alkupää on yhtä lailla
kohde: laituri on 198 metriä pitkä ja lähtee historiallisen
korttelin rannasta vanhan tullitalon vierestä. Piste on nyt
−23,6435 / −70,3977, noin 50 metriä kärjestä sisämaahan päin, ja
kaikki kahdeksan pistettä ovat maalla.

Mittakaavajana on kehyksen vasemmassa alakulmassa (lat ≈ −23,6510,
lon ≈ −70,4055), joka on avomerta; yksikään kohde ei ole siellä.

---

## I. RAJAUSTARKISTUS — ei toistoa maalehden eikä karttanostojen kanssa

Luettu kokonaan: `maa-kategoriat.js` CHL (viisi sivua),
`maastokohteet-chl.js` (11 kohdetta), `skandaalit.js` CHL (7 juttua),
`elaintakyt.js` CHL.

**Neljä aihetta on karsittu nostoista:**
1. **Atacaman kuivuus yleisenä aavikkoaiheena** — karttanosto
   `atacama` kertoo kaksipuolisen sadevarjon, 15 mm vuodessa ja
   Mars-testit. Lehden teemasivu kertoo **kaupungin oman luvun**
   (alle 0,1 mm) ja **camanchacan**, jota karttanosto ei mainitse.
2. **Chuquicamata** — karttanosto. Kupari mainitaan matkaoppaassa
   elinkeinona, ei nostona.
3. **Humberstone** — karttanosto kertoo salpietarin autiokaupungit.
   Lehti kertoo salpietarin **kaupunkihistoriana**: yhtiöt, laituri,
   rata ja se, että kaupunki syntyi salpietarin takia.
4. **Paranalin observatorio** — karttanosto. Tähtitiedettä ei
   käsitellä lehdessä lainkaan; teemasivu puhuu sumusta, ei
   tähtitaivaasta.

Chilen maalehden historiasivun nosto **"Kaupunki, jonka keksintö
tappoi"** (luettu kokonaan) ei kerro Antofagastasta.

---

## J. MITÄ EI KIRJOITETA

- Nykypolitiikkaa, nykyistä merikiistaa, vuoden 2019 levottomuuksia
  eikä katedraalin julkisivun tuhotöitä.
- Vuoden 1906 työtaistelun uhrilukua, Huanchaca-kadun
  rikostapauksia eikä diktatuurin aikaisia muistopaikkoja.
- Casa Abaroaa (kohta D).
- Kaivosyhtiöiden nykyisiä omistussuhteita muuta kuin siltä osin kuin
  ne selittävät kaupungin taloutta.
