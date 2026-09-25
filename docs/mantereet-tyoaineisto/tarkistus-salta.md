# Saltan faktapohjan tarkistus

Tarkistettu **7.9.2026** Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä faktapohjan
omiin sitaatteihin luotettu. Kiistanalaiset ja numeeriset väitteet
haettiin `grep -o` -täsmähaulla sanatarkkoina merkkijonoina.
Koordinaatit haettiin itse (`list=geosearch`, `prop=coordinates`) ja
kaikki 28 kohdeparin etäisyyttä laskettiin itse haversinilla.

Luetut artikkelit — **en**: Salta, Salta Province, Salta Cathedral,
Museum of High Altitude Archaeology, Children of Llullaillaco,
Capacocha, Llullaillaco, Battle of Salta, Martín Miguel de Güemes,
Tren a las Nubes, Zamba (artform), Bombo legüero, Chacarera,
Peña (music), Eduardo Falú, Los Chalchaleros. — **es**: Salta,
Cabildo de Salta, Catedral de Salta, Museo de Arqueología de Alta
Montaña de Salta, Museo Histórico del Norte, Basílica y convento de
San Francisco (Salta), Convento de San Bernardo (Salta), Iglesia de la
Merced (Salta), Museo de Bellas Artes de Salta, Monumento a Güemes,
Cerro San Bernardo, Plaza 9 de Julio (Salta), Edificio del Centro
Cultural América, Señor y Virgen del Milagro, Mercado artesanal de
Salta, Iglesia de la Viña, Iglesia de San Alfonso (Salta), Estación
Salta, Museo de Arte Contemporáneo (Salta).

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–F ratkaisut tehdään.** Kaksi asiavirhettä löytyi ja korjattiin
faktapohjaan ennen kirjoittamista (kohdat E ja F). Kolme muuta on
Wikipedian sisäisiä ristiriitoja ja yksi on linjauskysymys.

---

## A. RISTIRIITA — milloin cabildo lakkasi olemasta viranomaisten talo

**Lähde ("Cabildo de Salta", johdanto), sanatarkasti:** *"sede de las
autoridades desde 1626 hasta 1888"*.

**Sama artikkeli, Historia-osiota edeltävä kappale:** *"El Cabildo
alojó la policía y la sede de la Casa de Gobierno hasta 1880. Nueve
años después … fue vendido en pública subasta a particulares"* — eli
myynti 1889.

**Ratkaisu:** nähtävyysjuttu **ei anna yhtä loppuvuotta**. Se sanoo,
että talo oli viranomaisten käytössä 1600-luvulta 1880-luvulle ja että
se myytiin sen jälkeen huutokaupalla yksityisille. Kaksi vuosilukua
(1888 ja 1889) eroavat lähteen sisällä, eikä eroa saa piilottaa
valitsemalla toinen.

---

## B. RISTIRIITA — asetuksen 95687 päivämäärä

Sama Argentiinan asetusnumero **95687** esiintyy kolmella eri kohteella
kahdella eri päivämäärällä:

- "Catedral de Salta": *"el 14 de junio de 1941, por Decreto 95687"* —
  ja en "Salta Cathedral": *"on 14 June 1941"*.
- "Basílica y convento de San Francisco (Salta)": *"el 14 de julio de
  1941 en el decreto 95687"*.
- "Convento de San Bernardo (Salta)": *"el 14 de julio de 1941 por
  decreto N.º 95687"*.

**Ratkaisu:** nähtävyysjutut sanovat **vain vuoden 1941** ja jättävät
päivämäärän pois. Vuosi on kaikissa lähteissä sama; päivä ei ole.

---

## C. RISTIRIITA — katedraalin monumenttivuosi 1941 vai 1947

"Catedral de Salta" -artikkelin leipäteksti sanoo 1941 (kohta B),
mutta **kahdessa saman artikkelin kuvatekstissä** lukee sanatarkasti
*"Monumento histórico nacional año 1947"*.

**Ratkaisu:** käytetään leipätekstin ja en-Wikipedian yhteistä vuotta
**1941**. Kuvatekstit ovat Wikipediassa heikoin lähdetaso, ja ne ovat
ristiriidassa saman artikkelin oman tekstin kanssa. Ero kirjataan
lohkokommenttiin, ei lukijalle.

---

## D. RISTIRIITA — Saltan kuvataidemuseon avausvuosi

"Museo de Bellas Artes de Salta" -artikkelissa ei ole avausvuotta
leipätekstissä lainkaan. Luokitusrivit antavat **kaksi**:
`Museos inaugurados en 1930` ja `Museos inaugurados en 2008`; lisäksi
`Arquitectura de Argentina de 2008`.

**Ratkaisu:** nähtävyysjuttu **ei anna avausvuotta**. Se kertoo sen,
mikä on leipätekstissä: rakennus on 1900-luvun alussa Félix
Usandivarasin perheelle rakennettu ranskalaistyylinen kartano, joka on
entisöity ja laajennettu museoksi (yli 1 000 m², kaksi kerrosta,
yksitoista salia), ja mitä salit sisältävät. Luokitusrivi ei ole
lähde.

---

## E. KORJATTU ASIAVIRHE — La Merced -kirkko

Faktapohjan ensimmäinen versio sanoi La Merced -kirkkoa 1700-luvun
rakennukseksi ja kansalliseksi historialliseksi monumentiksi. **Lähde
("Iglesia de la Merced (Salta)", johdanto) sanoo sanatarkasti:**
*"Fue construido desde 1907 hasta 1914 principalmente para alojar a la
imagen de la Virgen de las Mercedes."* Monumenttiasemaa ei mainita.

**Ratkaisu:** korjattu faktapohjaan ennen kirjoittamista. Juttu kertoo
vuodet 1907–1914, mercedaarien tulon 1602, vanhan temppelin
purkamisen 1900-luvun alussa ja Saltan taistelun ristin. **Monumentti-
asemaa ei väitetä.**

---

## F. KORJATTU ASIAVIRHE — kuvataidemuseon rakennus

Faktapohjan ensimmäinen versio sijoitti museon Casa Arias Rengeliin.
**Lähteen infolaatikko sanoo sanatarkasti:** *"Casona de estilo francés
construida a principios del siglo XX para la familia de Félix
Usandivaras"*, osoite *Av. Belgrano 990*. Casa Arias Rengeliä ei mainita
artikkelissa lainkaan. **Korjattu ennen kirjoittamista.**

---

## G. LINJAUS — Llullaillacon lapset

Museon kokoelman ydin on kolme inkalasta, jotka löydettiin
16.3.1999 Llullaillaco-tulivuoren huipulta ja jotka kuolivat
capacocha-menossa vuosien 1462 ja 1507 välillä (en "Children of
Llullaillaco"). en "Museum of High Altitude Archaeology" kertoo myös,
että **museo on saanut perustamisestaan asti arvostelua paikallisilta
alkuperäiskansajärjestöiltä**, jotka pitävät lasten siirtoa ja
esillepanoa ilman kuulemista häpäisynä.

**Ratkaisu (Perustuslain Kunnioitus-pilari ja reseptin
väkivaltalinjaus):**
1. Kuolintapaa **ei kuvailla** — ei valmistelua, ei ainemääriä, ei
   ruumiiden yksityiskohtia.
2. Juttu kertoo löydön, säilymisen syyn (kylmyys ja kuivuus),
   kylmäsäilytyksen (−20 °C, alennettu happipitoisuus, suodatettu
   valo) ja kansallisen suojelupäätöksen 20.6.2001.
3. **Arvostelu kerrotaan ääneen** samassa jutussa. Museojuttu, joka
   jättää alkuperäiskansojen vastalauseen pois, olisi
   kaunistelu — ja peli kertoo tapahtumat kaunistelematta.
4. Sama linjaus koskee kansisivun tekstejä: lapsia ei mainita
   nostoissa lainkaan, vaan aihe on kokonaan kohdekartan jutussa.

---

## H. VARMISTETUT LUVUT (täsmähaku, sanatarkat osumat)

| Väite | Lähde ja osio | Osuma |
|---|---|---|
| Perustettu 16.4.1582, Hernando de Lerma | en "Salta", History | *"Salta was founded on April 16, 1582"* |
| Kaava yhdeksän kertaa viisi korttelia | es "Salta", Arquitectura colonial | *"damero de nueve por cinco manzanas"* |
| Milagro-kulkue yli 850 000 | es "Salta", Religiones (kuvateksti) | *"congrega anualmente más de 850 000 personas"* |
| Kuvat kulkivat noin 2 800 km | es "Señor y Virgen del Milagro" | *"aproximadamente 2.800 kilómetros"* |
| Katedraalin työt uudelleen käyntiin 1873 | es "Catedral de Salta", Historia | *"en 1873 se reanudaron los trabajos de construcción largamente paralizados"* |
| San Franciscon torni aloitettu 1877 | es "Basílica … San Francisco" | *"En 1877 el suizo [[Francisco Righetti]] comenzó la construcción de la torre-campanario"* |
| Torni 54 m, Etelä-Amerikan korkein | sama | *"la más alta de [[Sudamérica]] con 54 [[metro]]s"* |
| Cerro San Bernardo 1 471,92 m | es "Cerro San Bernardo" | *"altitud de 1471,92"* |
| Ero kaupunkiin 284,92 m | sama | *"284.92&nbsp;m"* |
| Portaissa 1 021 askelmaa | sama | *"Consta de 1021 escalones"* |
| Trilobiitti Sanbernardaspis pygacantha | sama | *"Sanbernardaspis pygacantha"* |
| Aukiolla yli 250 puuta | es "Plaza 9 de Julio (Salta)" | *"más de 250 ejemplares de distintas"* |
| Väkiluku 627 704 (2022) | en "Salta" | *"population of 627,704 according to the 2022 census"* |
| Sääsarja alkaa 1873 | en "Salta", Climate (sääruutu) | *"extremes 1873–present"* |
| MAAM avattiin 2004 | en "Museum of High Altitude Archaeology" | *"Inaugurated in 2004"* |
| Zamba syntyi Saltan maakunnassa 1824 | en "Zamba (artform)", Name and origin | *"originated in the Argentine province of Salta … in 1824"* |

---

## I. KOHDEKARTAN GEOMETRIA (laskettu itse)

Koordinaatit `list=geosearch` (es-Wikipedia, keskipiste −24,7883 /
−65,4106, säde 2 500 m) ja `prop=coordinates`. Etäisyydet haversinilla,
28 paria.

Pienimmät välit:
- **MAAM – katedraali 107 m** (aukion pohjoislaita)
- **MAAM – cabildo 110 m**
- **katedraali – cabildo 164 m**
- **cabildo – San Franciscon basilika 231 m**
- **katedraali – San Franciscon basilika 301 m**
- **MAAM – San Franciscon basilika 322 m**

Suurin väli: **kuvataidemuseo – Güemesin muistomerkki 1 703 m**.

**Kolme pienintä väliä alittavat kohdekartta-ohjeen 200 metrin
suosituksen**, ja se on tietoinen valinta: Saltan pääaukion kolme
kohdetta seisovat saman aukion laidoilla, ja aukio on koko kaupungin
perustamispaikka. `tools/tarkista-karttapisteet.mjs` laskee
numeroympyröiden peiton x- ja y-suunnassa erikseen; rajauksella
2,12 × 1,61 km yksi kuvapikseli on 5,9 metriä ja 24 pikselin ympyrä
noin **141 metriä**. Laskettuna peitto on **MAAM – katedraali 22 %**,
**MAAM – cabildo 20 %** ja muilla pareilla nolla, eli kaikki jäävät
selvästi työkalun 60 prosentin rajan alle ("tavallista, ei
toimenpidettä"). **Neljäs aukion kohde, Centro Cultural América, on
vain 60 metriä MAAM:sta ja jätettiin siksi pois**; se kerrotaan
matkaoppaassa.

Kaikki kahdeksan pistettä ovat maalla; Saltan rajauksessa ei ole
vettä, joten vesitarkistus on triviaali. Mittakaavajana on kehyksen
vasemmassa alakulmassa (lat ≈ −24,7960, lon ≈ −65,4160), eikä yksikään
kohde ole siellä.

---

## J. RAJAUSTARKISTUS — ei toistoa maalehden eikä karttanostojen kanssa

Luettu kokonaan: `maa-kategoriat.js` ARG (viisi sivua ja historian
hetki), `maastokohteet-arg.js` (11 kohdetta), `skandaalit.js` ARG
(6 juttua), `elaintakyt.js` ARG.

**Kolme aihetta on karsittu nostoista juuri tämän takia:**
1. **Empanada** — maalehden ruokasivun nosto "Jokainen maakunta
   väittää omaansa aidoimmaksi" kertoo nimenomaan **Saltan**
   empanadoista kuvineen (`Empanadas salteñas 1.jpg`). Lehti mainitsee
   empanadan vain matkaoppaan ruokajaksossa, koska visan kysymys 4
   vaatii vastauksen näkyviin.
2. **Quebrada de Humahuaca** — karttanosto `quebradadehumahuaca`.
   Vain maininta matkaoppaan päiväretkijaksossa (visan kysymys 5).
3. **Tren a las Nubes ja La Polvorillan viadukti** — karttanosto
   `polvorilla`. Vain maininta matkaoppaassa (visan kysymys 2).

**Zamba ja cueca:** Chilen maalehden musiikkisivulla on nosto
"Tanssi, joka vaihtoi nimeä rajan yli", joka kertoo cuecan ja
perulaisen zamacuecan suhteesta. Saltan teemasivun zamba-nosto kertoo
**argentiinalaisen haaran**: syntypaikan (Saltan maakunta 1824),
tahtilajin, nenäliinat ja bombo legüeron. Zamacueca mainitaan yhdellä
lauseella alkuperänä. Kyseessä on eri maan lehti ja eri tanssi, mutta
päällekkäisyys kirjataan lohkokommenttiin.

---

## K. MITÄ EI KIRJOITETA

- Kaupunginvaltuuston puoluejakoa, urheilutuloksia eikä
  Hollywood-anekdootteja (en "Salta", Trivia).
- Vuoden 1934 vaakunakiistaa ei tehdä nostoksi; se on
  alkuperäiskansoja koskeva herkkä aihe, joka vaatisi enemmän tilaa
  kuin lehdessä on.
- Llullaillacon lasten kuolintapaa (kohta G).
