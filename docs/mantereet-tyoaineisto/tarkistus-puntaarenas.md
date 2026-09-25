# Punta Arenasin faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä faktapohjan
omiin sitaatteihin luotettu. Kiistanalaiset kohdat haettiin `grep -o`
-täsmähaulla sanatarkkoina merkkijonoina. Koordinaatit haettiin itse
(en-Wikipedian `list=geosearch` ja coord-mallit, muut Nominatimista),
ja kaikki 28 kohdeparin etäisyyttä laskettiin itse haversinilla.

Luetut artikkelit: **Punta Arenas**, **Strait of Magellan**,
**Fuerte Bulnes**, **Puerto del Hambre**, **Chilean schooner Ancud**,
**Sociedad Explotadora de Tierra del Fuego**, **Sara Braun**,
**Cemetery of Punta Arenas**, **Sacred Heart Cathedral, Punta
Arenas**, **Magdalena Island, Magallanes Region**, **Magellanic
penguin**, **Croatian Chileans**, **Luis Pardo**, **Selkʼnam people**,
**County of Peebles (ship)**, Museo Nao Victoria, Antarctic gateway
cities, Magallanes Region, José Menéndez.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–H ratkaisut tehdään.** Asiavirheitä ei löytynyt. Neljä kohtaa on
Wikipedian sisäisiä ristiriitoja, yksi on lähteessä itsessään
merkitty todentamattomaksi, yksi on epäuskottava vuosiluku ja kaksi
on linjauskysymyksiä.

---

## A. RISTIRIITA — kuinka monta eloonjäänyttä Cavendish löysi

**Lähde 1 ("Punta Arenas", History), sanatarkasti:** *"An English
privateer, Thomas Cavendish, during his circumnavigation, rescued the
last surviving member of Puerto del Hambre in 1587."*

**Lähde 2 ("Puerto del Hambre", historia), sanatarkasti:** *"When the
next English navigator, Thomas Cavendish, landed at the site in 1587,
he found the ruins of the settlement as well as two survivors, one of
which died before they left. The other left with the crew."*

**Ratkaisu:** kirjoittaja käyttää **kohteen omaa artikkelia**
(Puerto del Hambre), joka on tarkempi ja jolla on vertaisarvioitu
lähdeviite (*Revista médica de Chile* 2010). Lehti sanoo siis kaksi
eloonjäänyttä, joista toinen kuoli ennen lähtöä. Ennakkotapaus:
"koordinaatit ja kohteen oma artikkeli voittavat yleisartikkelin
arviot" (v925, v932, v937).

---

## B. RISTIRIITA — kuinka monta ihmistä Ancudissa oli

**Lähde 1 ("Punta Arenas", Penal colony), sanatarkasti:** *"It built
and commissioned a schooner called ''Goleta Ancud'' which, under the
command of John Williams Wilson of the Chilean Navy, transported a
crew of 21 people (captain, eighteen crew, and two women), plus
cargo, to accomplish the mandate."*

**Lähde 2 ("Chilean schooner Ancud", Mission), sanatarkasti:**
*"On board were 23 crew (20 men, 2 women, 1 child), of which about
half would stay in the Magallanes region with the mission of
establish a permanent settlement."*

**Ratkaisu:** ero on todellinen eikä pyöristettävissä pois — toinen
laskee 21, toinen 23, ja vain jälkimmäinen mainitsee lapsen.
**Kirjoittaja käyttää aluksen omaa artikkelia (23) ja kertoo
ristiriidan lukijalle**: "kaksikymmentäkolme ihmistä, joista kaksi
naista ja yksi lapsi — kaupungin oma artikkeli laskee heitä
kaksikymmentäyksi". Kahta lukua ei saa esittää yhtenä varmana.
Ratkaisu kirjataan lohkokommenttiin.

---

## C. RISTIRIITA — kuinka kaukana Fuerte Bulnes on

Neljä eri lukua neljästä paikasta:

| lähde | luku |
|---|---|
| "Fuerte Bulnes", johdanto | 62 km Punta Arenasista etelään |
| "Puerto del Hambre", johdanto | 58 km Punta Arenasista etelään |
| "Puerto del Hambre", kuvateksti | 70 km Punta Arenasista etelään |
| "Punta Arenas", History (Ciudad del Rey don Felipe) | noin 80 km |

Lisäksi "Fuerte Bulnes" sanoo linnakkeen olevan **2 km Puerto del
Hambresta etelään**, mikä ei sovi yhteen 58 km:n ja 62 km:n kanssa.

**Koordinaatit laskettiin itse.** Fuerte Bulnes on `{{coord|53|37.8|S|
70|55.1|W}}` eli −53,63 / −70,918, ja Punta Arenas `{{coord|53|10|S|
70|56|W}}` eli −53,1667 / −70,9333. Haversin antaa **51,7 km**.

**Ratkaisu:** koordinaatit voittavat leipätekstin etäisyysarviot
(sama ennakkotapaus kuin A:ssa). Lehti sanoo **"runsaat viisikymmentä
kilometriä etelään"** eikä anna tarkkaa lukua. Kirjataan
lohkokommenttiin.

---

## D. RISTIRIITA — kuinka suuri Sociedad Explotadora oli

**"Punta Arenas", johdanto:** *"The largest sheep company, which
controlled 10,000 square kilometres in Chile and Argentina, was based
in Punta Arenas…"*

**"Punta Arenas", Economic boom:** *"…with one company (''Sociedad
Explotadora de Tierra del Fuego'') controlling over {{convert|11000|
km2}}."*

**"Sociedad Explotadora de Tierra del Fuego", johdanto:** *"It was
founded in 1893 and cultivated over {{cvt|1,000,000|ha|acre}} land…"*

Miljoona hehtaaria on 10 000 km², eli kaksi kolmesta luvusta on
yhtäpitäviä ja yksi poikkeaa.

**Ratkaisu:** kirjoittaja ei käytä yhtään näistä pyöreistä luvuista
vaan **vuokrasopimusten omia lukuja**, jotka esiintyvät kahdessa
artikkelissa samoina ja ovat tarkempia: 180 000 ha (huhtikuu 1889),
170 000 ha (marraskuu 1889) ja **1 009 000 ha** (1890, kolmannes
Tulimaan vuokrattavissa olleesta maasta). Vuoden 1910 sulautuman
jälkeinen **3 miljoonaa hehtaaria ja yli kaksi miljoonaa lammasta**
esiintyy vain kerran eikä ole ristiriidassa minkään kanssa, joten se
kelpaa sellaisenaan.

---

## E. RISTIRIITA — tammikuun ylin lämpötila

**Leipäteksti ("Punta Arenas", Climate):** *"…with average lows in
July near {{cvt|-1|°C|°F}} and highs in January of {{convert|14|°C|
°F}}."*

**Saman artikkelin sääruutu (1991–2020, Dirección Meteorológica de
Chile):** `|Jan high C = 16.3`, `|Jul high C = 4.9`,
`|Jul low C = -1.5`, `|year precipitation mm = 390.2`.

Leipäteksti antaa tammikuun ylimmäksi 14 °C, sääruutu 16,3 °C.
Heinäkuun alin täsmää (−1 vs −1,5).

**Ratkaisu:** **sääruutu voittaa**, koska se on nimetystä
mittausaineistosta (1991–2020) ja leipäteksti on pyöristys ilman
omaa viitettä. Lehti käyttää lukuja 16,3 °C ja −1,5 °C sekä
vuosisadetta **390 mm** (sääruutu), ei leipätekstin "15 tuumaa"
(= 381 mm). Ero mainitaan lohkokommentissa. **Kaupungille ei tehdä
säänormaalirivejä tässä erässä** (Fablen poikkeama 2), joten oppaan
sääjakso sanoo ääneen, mistä luvut ovat.

---

## F. LÄHDE ON ITSE MERKINNYT VÄITTEEN TODENTAMATTOMAKSI — köydet

**"Punta Arenas", Climate, sanatarkasti:** *"City officials have put
up ropes between buildings in the downtown area to assist pedestrians
with managing the strong downdrafts.{{citation needed|reason=A source
that corroborates the officials putting up ropes is needed|date=
November 2015}}"*

Wikipedia on siis itse merkinnyt tämän lähteettömäksi jo marraskuussa
2015, eikä lähdettä ole yhdessätoista vuodessa löytynyt.

**Ratkaisu: lehti EI toista väitettä.** Teemasivun tuulinosto
käyttää vain sääruudun ja leipätekstin lukua **130 km/h** ja
toteaa tuulen olevan voimakkaimmillaan kesällä. **Pelin
saapumistekstiin (`southamerica-saapumiset.js`, `puntaarenas`)
köydet on jo kirjoitettu**, eikä sitä muuteta tässä erässä — se on
matkakirjatekstiä eikä tämän erän tehtävä. Asia raportoidaan
Fablelle päätettäväksi.

---

## G. EPÄUSKOTTAVA VUOSILUKU — katedraalin "ensimmäinen kirkko 1584"

**"Sacred Heart Cathedral, Punta Arenas", sanatarkasti:** *"In 1584 a
first temple was built. On December 28, 1892, the construction of the
new church began."*

Punta Arenasia ei ollut olemassa vuonna 1584: kaupunki perustettiin
1848 (Punta Arenas, infobox: *established_date2 = 18 December 1848*).
Vuosi 1584 on Nombre de Jesúsin ja Ciudad del Rey don Felipen
perustamisvuosi, ja kyse on ilmeisesti sekaannuksesta.

**Ratkaisu: lehti ei käytä lukua 1584 katedraalin yhteydessä.**
Kohdekartan juttu kertoo vain ne tiedot, jotka artikkeli antaa
täsmällisesti ja jotka sopivat yhteen kaupungin oman kronologian
kanssa: peruskivi **28.12.1892**, arkkitehti salesiaani-isä **Juan
Bernabé**, valmistuminen **1.6.1901**, kellotorni **1898**, mitat
46 × 18 × 30,60 m, vihkiminen **4.12.1977**. Poikkeama kirjataan
lohkokommenttiin.

---

## H. LINJAUSKYSYMYKSET

### H1. Selkʼnamit — mitä kerrotaan ja mitä ei

**Sanatarkasti ("Sociedad Explotadora de Tierra del Fuego"):**
*"Fences created obstacles for the nomadic life of the Selkʼnam people
and introduction of sheep herds displaced their main food source, the
guanaco… The Exploitation Society asked and received permission from
the Chilean government to remove the indigenous population from the
area. Menéndez gave orders for the extermination of the Selkʼnam,
paying a bounty for each death."*

**Sanatarkasti ("Sara Braun", Selkʼnam genocide):** *"In the 21st
century, the Historical Truth Commission of 2008 and related
scholarship uncovered the involvement of the Braun and Menéndez
families in the genocide of the Selkʼnam people, calling into question
their previously laudable reputation."*

**Sanatarkasti ("Selkʼnam people"):** *"In the mid-19th century, there
were about 4,000 Selkʼnam"* — ja: *"on 5 September 2023 the National
Congress of Chile recognised the Selkʼnam as one of the 11 original
peoples of Chile, accepting them as a living community of Chile."*
Vuoden 2017 Chilen väestönlaskennassa **1 144 ihmistä ilmoitti
olevansa selkʼnam**.

**Päätös (Perustuslain pilari 4 ja spec-mantereet §1–2):**
1. **Asia kerrotaan, sitä ei kaunistella.** Lehden lammasnosto kertoo
   aidat, guanakon katoamisen, hallituksen antaman luvan poistaa
   väestö, Menéndezin käskyn ja vuoden 2008 totuuskomission.
2. **Yksityiskohdat jätetään pois:** ei tapporahan maksutapaa, ei
   Dawsonin saaren leirejä, ei uhrilukuja tapahtumien yhteydessä.
   Kohderyhmä on 13+, ja ohje sanoo "ilman julmuuksien
   yksityiskohtien korostusta".
3. **Kansa kuvataan elävänä.** Nosto päättyy vuoden 2023
   tunnustukseen ja vuoden 2017 laskennan lukuun. "Kadonneen kansan"
   kehys on kielletty.
4. **1873-kulma on tässä vahva ja se käytetään:** isoisän
   matkavuonna selkʼnameja oli vielä noin neljä tuhatta eikä
   lammasyhtiötä ollut olemassa — se perustettiin kaksikymmentä
   vuotta myöhemmin.
5. **Guanako mainitaan vain kerran** ja vain ravintona: laji itsessään
   on jo `js/packs/elaintakyt.js`:n CHL-täky, eikä sitä toisteta.

### H2. Vuodet 1973–1990 jäävät pois

**"Sacred Heart Cathedral"** kertoo vuoden 1984 mielenosoituksesta
katedraalin edustalla ja **"Punta Arenas", Education** sanoo
yliopiston syntyneen "during the neoliberal reforms of Chile's
military regime". Chilen maalehden lohkokommentti (maa-kategoriat.js,
CHL) rajaa 1973–1990 kokonaan ulos samalla periaatteella kuin Perun
sisäinen konflikti. **Sama rajaus pätee tässä:** yliopiston
perustamisvuosi 1981 mainitaan matkaoppaassa ilman poliittista
kehystä, ja vuoden 1984 mielenosoitus jätetään kokonaan pois.

---

## I. KOORDINAATIT JA KOHDEKARTTA

Kohteiden koordinaatit haettiin itse: katedraali en-Wikipedian
coord-mallista (`{{coord|53.1620|S|70.9090|W|source:wikidata}}`),
muut Nominatimista 7.9.2026. Kaikki 28 väliä laskettiin haversinilla.

**Ensimmäinen kohdelista hylättiin osittain, ja syy mitattiin:**
- **Arturo Pratin laituri** (−53,169188 / −70,907110) osoittautui
  `tools/tarkista-karttapisteet.mjs`:n mukaan **84-prosenttisesti
  vedeksi**. Laituri saisi sääntöjen mukaan olla vedellä, mutta piste
  ei osunut laiturirakenteelle vaan avoveteen sen eteläpuolella.
  Korvattiin.
- **Kaupungintorille (Mercado Municipal) ei löytynyt lähdeartikkelia**
  en- eikä es-Wikipediasta. Kuvaton ja lähteetön kohde ei kelpaa.
  Korvattiin.
- Tilalle: **merisotamuseo** (−53,163581 / −70,904302, Nominatim;
  lähde "Punta Arenas", Museums) ja **salmen rantabulevardi**
  (−53,164567 / −70,900459, Nominatim; lähde "Punta Arenas", Economy
  ja "County of Peebles (ship)"). Molemmat ovat maalla.
- **Sara Braunin palatsi** (−53,161721 / −70,907776) on **121 metrin
  päässä** Braun-Menéndezin palatsista. Pudotettiin.

**Lopullinen lista, kaikki maalla, ei ympyröiden päällekkäisyyttä:**
pienin väli **188 m** (Braun-Menéndezin palatsi – merisotamuseo),
toiseksi pienin **208 m** (katedraali – Braun-Menéndezin palatsi).
Kaikki kahdeksan ovat vähintään 198 m rajauksen reunasta.

**CERRO DE LA CRUZILLA EI OLE ARTIKKELIA kummallakaan kielellä**
(tarkistettu `action=raw`, 404 sekä en- että es-Wikipediassa).
Kohde pidettiin kartalla, koska se on kaupungin tunnetuin
näköalapaikka ja koska se on pelissä jo ennestään: matkakirjan
valokuvataulun nykykuva (`js/packs/southamerica-valokuvat.js`,
`puntaarenas`, `Punta Arenas, Cerro de la Cruz 0798.jpg`) on otettu
sieltä. **Jutun jokainen asiafakta on "Punta Arenas" -artikkelin
Geography- ja Etymology-osioista** — kukkula on vain se paikka, josta
katsotaan. Ratkaisu on kirjattu nahtavyysjutut.js:n lohkokommenttiin.

Rajaus vaihdettiin kesken työn: ensimmäinen ruutu (etelä −53,1712,
länsi −70,9218, itä −70,8906) piirrettiin ja katsottiin, ja sen
alalaidasta jäi 600 metrin kaistale ilman yhtään kohdetta, kun
laituri ja tori pudotettiin. Uusi ruutu on **1,86 × 2,13 km**
(1600 × 1841 px, 1,16 m/px).
