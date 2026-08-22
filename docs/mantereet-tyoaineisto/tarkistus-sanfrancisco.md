# San Francisco — faktantarkistus

Riippumaton Sonnet-tarkistus docs/mantereet-tyoaineisto/faktapohja-sanfrancisco.md
-dokumentille. Lähteet tarkistettu uudelleen suoraan en-Wikipediasta
22.8.2026 (`action=raw` sivuille "San Francisco", "Clay Street Hill
Railroad", "San Francisco cable car system", "Andrew Smith Hallidie",
"Chinatown, San Francisco", "Golden Gate Park", "Mission San Francisco
de Asís", "Portsmouth Square", "Golden Gate Bridge",
"Template:San Francisco weatherbox" + Wikipedian infobox-koordinaatit +
täydentävät hakusanahaut lämpötilaennätysten päivämäärille ja Frisco Rag
-tiedostojen Commons-kuvailusivuille). Lähtöoletus: jotain on pielessä —
jokainen luku-, vuosiluku- ja nimivaltiin liittyvä väite käytiin läpi
itse, ei vain luotettu koostajan omaan lähdemerkintään.

## 1. 1873-koukku: Clay Streetin kaapeliraitiotie — VAHVISTETTU

Tarkistin kaikki kolme päiväystä erikseen "Clay Street Hill Railroad"-
ja "San Francisco cable car system" -artikkeleista:

- **Koeajo 1.8.1873:** en-Wikipedian "San Francisco cable car system"
  toteaa: *"A retrospective published in 1895 stated that a single car
  was run over the line at 4 am on the morning of August 1 with few
  witnesses to ensure the franchise would not expire."* — täsmää
  koosteen väitteeseen (klo 4 aamulla, harvoin todistajin, lupaehdon
  täyttämiseksi).
- **Ensimmäinen julkinen ajo 2.8.1873:** sama artikkeli: *"...had its
  inaugural run on August 2, 1873."* — täsmää.
- **Säännöllinen liikenne 1.9.1873:** "Clay Street Hill Railroad":
  *"The Clay Street line started regular service on September 1,
  1873, and was a financial success."* — täsmää täsmälleen.
- Toimilupavaatimus 1.8.1873 ja se, ettei kaupunki mitätöinyt
  toimilupaa myöhästymisestä huolimatta, täsmäävät myös ("the city
  chose not to void the franchise").
- Nousu 348 jalkaa / 106 m kuudessa korttelissa, insinööri William
  Eppelsheimer, itäinen pääteasema Clay/Kearny Portsmouth Squarella
  (Kalifornian historiallinen maamerkki #500, tarkistettu myös
  noehill.com:sta) — kaikki täsmäävät.
- 3 000 matkustajaa/päivä vuoden kuluessa ja kuningas Kalākauan käynti
  (marraskuu 1874) — täsmäävät.

**Tämä on koosteen tärkein 1873-väite, ja se on virheetön.**

## 2. Hallidien innoitus (hevosvaunu, mukulakivet, hevoset) — VAHVISTETTU (pieni lähdehuomio)

Väite löytyy sanatarkasti "San Francisco cable car system" -artikkelista:
*"In 1869, Andrew Smith Hallidie had the idea for a cable car system in
San Francisco, reportedly after witnessing an accident in which a
horsecar riding over wet cobblestones slid backwards, killing the
horses."* — täsmää koosteen kuvaukseen.

**Huomio:** kooste merkitsee lähteeksi myös "en-Wikipedia 'Andrew Smith
Hallidie'", mutta tarkistin koko kyseisen artikkelin raakatekstin enkä
löytänyt tätä tarinaa sieltä — "Andrew Smith Hallidie" -artikkeli antaa
vaihtoehtoisen, vaimeamman selityksen ("inspired by a desire to reduce
the suffering incurred by the horses that hauled streetcars up Jackson
Street"). Itse väite on siis oikein, mutta lähdeviite kannattaa
täsmentää pelkäksi "San Francisco cable car system" -artikkeliksi.

## 3. Vuoden 1906 maanjäristyksen uhriluvut — VAHVISTETTU

en-Wikipedia "San Francisco": *"Contemporary accounts reported that 498
people died, though modern estimates put the number far higher in the
several thousands."* — täsmää koosteen "auki kirjoitettuun" esitykseen
(molemmat luvut mainittu, kumpaakaan ei valita). Kello 5.12 aamulla
18.4.1906 ja maanjäristyksen laajuus vahvistettu myös artikkelista
"1906 San Francisco earthquake" ja USGS:stä. Presidion tykistön
räjäytykset palokujiksi, yli 3/4 kaupungista raunioina ja yli puolet
400 000 asukkaasta kodittomana — kaikki täsmäävät sanatarkasti.
Panama–Pacific-näyttely 1915 — yleistunnettu, ei ristiriitaa.

## 4. Nostojen merkkimäärät (440–660) — VAHVISTETTU

Laskin jokaisen nostoblokin lainaustekstin merkkimäärän itse
(rivinvaihdot poistettu, välilyönnit säilytetty sanojen välissä, kuten
Python `len()` laskisi juoksevasta tekstistä):

| Nosto | Väitetty | Oma laskenta |
|---|---|---|
| K1 | 580 | 580 |
| K2 | 611 | 611 |
| K3 | 553 | 553 |
| K4 | 525 | 525 |
| H1 | 535 | 535 |
| H2 | 551 | 551 |
| H3 | 471 | 471 |
| H4 | 506 | 506 |

Kaikki kahdeksan täsmäävät merkilleen ja mahtuvat 440–660 merkin
kiintiöön (lehtityo-resepti.md: "nostot 440–660 mrk"). Ei
korjaustarvetta.

## 5. Kohdekartan koordinaatit ja etäisyydet (pistokoe) — VAHVISTETTU

**Koordinaatit** — tarkistin infoboksin koordinaatit suoraan neljästä
artikkelista:
- "San Francisco": 37,7775°N 122,41639°W — täsmää.
- "Portsmouth Square": 37,7947°N 122,4053°W — täsmää.
- "Chinatown, San Francisco": 37,79417°N 122,40694°W — täsmää.
- "Golden Gate Bridge": 37,81972°N 122,47861°W — täsmää.
- NOAA-sääasema (Template:San Francisco weatherbox): 37,7706°N
  122,4269°W — täsmää.

**Etäisyydet** — laskin haversine-kaavalla itse KAIKKI 14 taulukon
etäisyyttä keskipisteestä (37,7775°N, 122,41639°W) koosteen antamilla
koordinaateilla, riippumatta koosteen omasta laskelmasta:

| Kohde | Koosteen arvio | Oma laskelma |
|---|---|---|
| Mission Dolores | ~1,7 km | 1,73 km |
| Nob Hill | ~1,8 km | 1,76 km |
| Chinatown | ~2,0 km | 2,03 km |
| Portsmouth Square | ~2,2 km | 2,15 km |
| Cable Car Museum | ~2,2 km | 2,15 km |
| Lombard Street | ~2,7 km | 2,73 km |
| Ferry Building | ~2,8 km | 2,83 km |
| Coit Tower | ~2,9 km | 2,93 km |
| Fisherman's Wharf | ~3,4 km | 3,43 km |
| Presidio | ~4,9 km | 4,91 km |
| Golden Gate Park | ~5,4 km | 5,39 km |
| Alcatraz | ~5,5 km | 5,50 km |
| Fort Point | ~6,5 km | 6,49 km |
| Golden Gate Bridge | ~7,2 km | 7,21 km |

**Ei yhtään virhettä** — kaikki 14 etäisyyttä täsmäävät oman
laskelmani kanssa alle 50 metrin tarkkuudella. Tässä ei toistunut
Manilan tarkistuksessa löytynyt Fort Santiago -tyyppinen laskuvirhe.

## 6. Frisco Rag -äänitteiden hylkäysperuste — VAHVISTETTU

Tarkistin molemmat Commons-tiedostot:
- `File:"The Frisco Rag", by Harry Armstrong (1909).opus` — kuvailu
  vahvistaa suoraan: nuotti on Charles Templeton Sheet Music
  Collectionista (Mississippi State University), esitys tuotettu
  MuseScore-ohjelmalla ("Musescore's dandv for the excellent
  suggestion") ja tuotu YouTubesta — **nykyaikainen renderöinti, ei
  aito tallenne.** Vahvistettu kiistatta.
- `File:Harry Armstrong - Frisco Rag (1904).ogg` — kuvailusivu ei
  suoraan sano "MuseScore", mutta on merkitty "omaksi työksi"
  (UploadWizard, sama muotoilutapa kuin naapuritiedostolla) 2026
  ladattuna — ei voi olla aito 1904-tallenne, koska aito
  vahasylinteri-/78-levytys ei olisi kenenkään "omaa työtä".
  Käytännössä sama tilanne kuin opus-tiedostolla.

Koosteen varaus ("EI aitoja gramofonilevytyksiä, molemmat
MuseScore-tyyppisiä renderöintejä") on siis oikea molempien
tiedostojen osalta, ei vain toisen.

## 7. Säädata (osio 5) — KORJATTU

Vertasin koosteen lukuja suoraan `Template:San Francisco weatherbox`
-templaatin raakatekstiin:

- **Vuosisademäärä väärin.** Kooste väittää (sekä osiossa 3 Jakso 5
  että osiossa 5): *"vuosisade keskimäärin 23,65 tuumaa (n. 601 mm)"*.
  Templaatin oikea arvo on **`year precipitation inch = 22.89`**
  (≈ 581 mm) — ja tämä täsmää myös koosteen OMAAN kuukausitaulukkoon
  osiossa 5 (4,40+4,37+3,15+1,60+0,70+0,20+0,01+0,06+0,10+0,94+2,60+4,76
  = 22,89), joka on merkitty samassa taulukossa "(vuosi 22,89")".
  Kooste on siis sisäisesti ristiriidassa itsensä kanssa: kuukausirivi
  laskee oikein 22,89", mutta sanallinen teksti sekä osiossa 3 että
  osion 5 avaustekstissä käyttää väärää 23,65"/601 mm -lukua.
  **Korjaa molemmat kohdat lukemaan 22,89 tuumaa / n. 581 mm.**
- **Sadepäivien määrä väärin.** Kooste väittää *"Sadepäiviä on
  vuodessa keskimäärin 73"* (toistuu osiossa 3 ja osiossa 5).
  Templaatin oikea arvo on **`year precipitation days = 71.2`**.
  **Korjaa lukemaan n. 71 sadepäivää.**
- Kuukausikeskilämmöt (esim. syyskuu 70,2/55,6 °F, tammikuu 57,8/46,6
  °F) täsmäävät templaattiin sanatarkasti — näissä ei virhettä.
- Ennätyslämpötilat 106 °F / 27 °F täsmäävät templaattiin. Päivämäärät
  1.9.2017 ja 11.12.1932 eivät ole itse templaatissa, mutta vahvistin
  ne riippumattomasta haulla (Washington Post 1.9.2017 -uutinen
  ennätyskuumuudesta; useat sääarkistot 27 °F / 11.12.1932) —
  molemmat oikein.
- Lumisadeväite ("10 mitattavaa lumisadetta vuodesta 1852") en
  löytänyt templaatista suoraa vahvistusta tälle tarkalle luvulle
  kaivamallani osalla — merkitsen tämän **EPÄVARMAKSI**, ei
  virheelliseksi (todennäköisesti templaatin laajemmassa
  huomautusosassa, jota en saanut kokonaan esiin). Ei kriittinen
  1873-koukun kannalta; kirjoittajan kannattaa tarkistaa
  templaatin täysi huomautusteksti ennen käyttöä.

## 8. Chinatown-rajaus — VAHVISTETTU spec-mantereet.md:n mukaiseksi

Tarkistin sekä js/tyohuone-raamattu.js:n Perustuslain viisi pilaria
(3. Kunnioitus, 4. Ikäsopivuus) että docs/mantereet-tyoaineisto/
spec-mantereet.md:n yleislinjaukset. Koosteen ratkaisu — perustaminen
(28.8.1850), väestön kasvu (9,3 % v. 1880) ja "Vanha Kultavuori"
-nimitys mukaan, tongsodat/uhkapeli/prostituutio/Chinese Exclusion Act
-yksityiskohdat pois — on linjassa molempien kanssa. Spec-mantereet.md
ei sisällä Chinatown-erityismainintaa, mutta sen yleisperiaate
("siirtomaahistoria kerrotaan tapahtumina neutraalisti... ei
sankarikehystä") ja Perustuslain kunnioitus/ikäsopivuus-pilarit
tukevat koosteen tekemää rajausta suoraan. Ei korjaustarvetta.

Myös "Pohjois-Amerikan vanhin kiinalaiskortteli" -väite vahvistui
sanatarkasti "Chinatown, San Francisco" -artikkelin ensimmäisestä
virkkeestä: *"the oldest Chinatown in North America"*. Mayor Geary,
28.8.1850, 300 "China Boys", Portsmouth Square — kaikki täsmäävät
sanatarkasti.

## 9. Muut historiafaktat — VAHVISTETTU

Kävin läpi ja vahvistin lisäksi en-Wikipediasta sanatarkasti:
Portolán retkikunta 2.11.1769; San Carlos-laiva 5.8.1775; Presidion
perustaminen Juan Bautista de Anzan toimesta 28.3.1776; lähetysaseman
vihkiminen 9.10.1776 (Palóu); Castillo de San Joaquín 1794; Yerba
Buena perustettu 1834 nyk. Chinatownin/Financial Districtin paikalle;
USS Portsmouth valtaa Yerba Buenan 9.7.1846; pormestari Washington
Bartlett nimeää kaupungin San Franciscoksi 30.1.1847; Vallejon
"Francisca" nimetään uudelleen Beniciaksi; William Chapman Ralston,
Comstock Lode, Bank of California, Palace Hotel, imperiumin romahdus
1875 vuoden 1873 paniikin seurauksena; Golden Gate Park — Olmsted
1865, hylätty, Hall kartoitti 1870/komissaari 1871, 60 000 puuta
vuoteen 1875 mennessä; kultaryntäys 1848 (n. 1000 as.) → joulukuu 1849
(25 000 as.), n. 500 hylättyä laivaa, Yerba Buena Cove täytetty 1870
mennessä; mannertenvälinen rautatie valmis 1869; yli 50 kukkulaa;
kaupungin pinta-ala "lähes 232" neliömailia (tarkka luku 231,91);
Kalifornian 18 alkuperäistä lääniä 1850; Farallon-saaret 27 mailin
päässä; Golden Gate Bridge valmistui 1937, Alcatrazin liittovaltion
vankila avattiin 1934 (molemmat siis anakronistisia isoisän 1873-
vuoteen nähden, kuten kooste itsekin toteaa). Ei yhtään virhettä
näissä.

## 10. Kohdekartan keskipiste (osio 7, huomio 1) — HUOMIO, ei virhe

Kooste jättää tämän avoimeksi kysymykseksi ("Tarkistettava ennen
kartan rajaamista"). Tarkistin docs/mantereet-tyoaineisto/
spec-mantereet.md:n, ja se on JO RATKAISSUT tämän — kohta 4 sanoo
sanatarkasti: *"Kohdekartan keskusta valitaan historiallisen ytimen
mukaan, ei hallinnollisen koordinaattipisteen (San Franciscon
ennakkotapaus: Wikipedia-piste on ~2 km ytimestä — kartta ankkuroidaan
Portsmouth Squaren tyyppiseen ytimeen)."* Molemmat dokumentit on
päivätty 22.8.2026, joten spec-mantereet.md näyttää olevan uudempi
Fablen päätös samasta kysymyksestä. Kirjoittajan kannattaa päivittää
osio 7 huomio 1 viittaamaan tähän jo tehtyyn ratkaisuun sen sijaan
että käsittelee sitä avoimena kysymyksenä.

---

## Yhteenveto

**VAHVISTETTU:** 1873-koukku kokonaisuudessaan (koeajo 1.8., julkinen
ajo 2.8., säännöllinen liikenne 1.9. — kaikki oikein ja tarkasti
lähteistetty), 1906-uhriluvun kaksoisesitys, kaikki 8 noston
merkkimäärät, kaikki pistokokeeksi tarkistetut koordinaatit ja KAIKKI
14 kohdekartan etäisyyttä, Frisco Rag -äänitteiden hylkäysperuste
(molemmat tiedostot), Chinatown-rajaus suhteessa Raamattuun/spec-
mantereet.md:hen, sekä laaja joukko yksittäisiä historiafaktoja
(Portola, Presidio, missio, Yerba Buena, Ralston, Golden Gate Park,
kultaryntäys, kiinalaiskorttelin etymologia ja väestöluvut, Golden
Gate Bridge/Alcatraz-anakronismit).

**KORJATTU (2 kohtaa):**
1. Osio 3 (Jakso 5) ja osio 5: vuosisademäärä 23,65 tuumaa / 601 mm →
   oikea arvo 22,89 tuumaa / n. 581 mm (Wikipedia-templaatin
   raakadata JA koosteen oma kuukausitaulukko täsmäävät tähän).
2. Sama kohta: sadepäiviä keskimäärin 73/vuosi → oikea arvo n. 71
   (templaatin `year precipitation days = 71.2`).

**EPÄVARMA (1 kohta):** lumisadeväite "10 mitattavaa lumisadetta
vuodesta 1852" — en löytänyt suoraa vahvistusta saamastani
templaattiotoksesta; ei kriittinen, tarkistettava erikseen ennen
käyttöä.

**Pieni lähdeviitehuomio (ei sisällöllinen virhe):** Hallidien
mukulakivi-hevostarina löytyy vain "San Francisco cable car system"
-artikkelista, ei "Andrew Smith Hallidie" -artikkelista, johon
kooste myös viittaa — täsmennä lähdeviite.

**Informatiivinen huomio:** osio 7 huomio 1:n avoin kysymys
kohdekartan keskipisteestä on jo ratkaistu spec-mantereet.md:n
kohdassa 4 — päivitä viittaus.

Korjauslista kirjoittajalle:
1. Korjaa vuosisademäärä 22,89" / n. 581 mm (osio 3 Jakso 5 -teksti +
   osio 5).
2. Korjaa sadepäivien määrä n. 71/vuosi (sama kohta).
3. Täsmennä Nosto K2:n Hallidie-lähdeviite pelkäksi "San Francisco
   cable car system" -artikkeliksi.
4. Päivitä osio 7 huomio 1 viittaamaan spec-mantereet.md:n kohtaan 4
   (kartan keskipiste jo ratkaistu, ei enää avoin kysymys).
5. Tarkista lumisadeväite "10 kertaa vuodesta 1852" erikseen ennen
   käyttöä (EPÄVARMA, ei vahvistettu tässä tarkistuksessa).
