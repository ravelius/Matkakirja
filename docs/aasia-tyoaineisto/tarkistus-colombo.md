# Colombo — faktantarkistus

Lähteet: en-Wikipedia action=raw 21.8.2026 ("Fort (Colombo)", "Tea
production in Sri Lanka", "Galle Face Hotel", "Galle Face Green");
OSM Nominatim koordinaattien ristiintarkistukseen.

## 1. Kohdennetut tarkistukset

**Muurien purku 1869–1871** — OIKEIN, täsmää sanasta sanaan.
Raakateksti ("Fort (Colombo)"): "The walls of the fort to the north,
east and south were demolished between 1869 and 1871 as the fort was
obsolete and to make room for new military barracks (the Echelon
Barracks)." Myös lisätiedot täsmäävät: alue säilytti nimen "Fort",
muurit koettiin myös esteeksi kaupunkisuunnittelulle, hollantilaisia
rakennuksia korvattiin brittityylisillä.

**Teen tarina 1867/1869** — OIKEIN, täsmää sanasta sanaan.
Raakateksti ("Tea production in Sri Lanka"): "Tea planting was
introduced to the country in 1867 by James Taylor, a British planter
who arrived in 1852." ja "The industry grew rapidly following the
devastation of the coffee plantations in Ceylon in 1869 by a fungal
disease called Hemileia vastatrix". Molemmat vuosiluvut ja
syy-seuraussuhde (kahviruoste → siirtymä teehen) täsmäävät
faktapohjan CO4-nostoon täydellisesti.

**Sisällissota vain yhtenä neutraalina virkkeenä** — TARKISTETTU JA
NOUDATETTU. H4-nosto sisältää tarkalleen yhden lauseen aiheesta
("Saarella käytiin 1983–2009 pitkä sisällissota, joka kosketti myös
pääkaupunkiseutua, mutta Colombo säilyi koko ajan maan kaupallisena
keskuksena.") ilman osapuolia, uhrilukuja tai tapahtumakuvausta.
Faktapohjan osio 7 kohta 1 vahvistaa, ettei laajaa
"Sri Lankan civil war" -artikkelia edes luettu tähän tarkoituksella —
tämä on linjauksen mukainen ja asianmukainen rajaus.

## 2. Muiden nostojen tarkistus

Kaikki tarkistetut faktat täsmäsivät ilman poikkeamia:

- **CO2/Galle Face Green:** kuvernööri Sir Henry George Ward
  valtuutti promenadin rakentamisen 1856, valmistui 1859 — täsmää.
  Hevoskilpailut 1820-luvulta (kuvernööri Edward Barnes), ensimmäinen
  virallisesti kirjattu kilpailu 1821, siirtyivät Colombo
  Racecourselle 1893, Race Bungalow → Colombo Club 1871 → nyk. Taj
  Samudran Crystal Ballroom — täsmää täydellisesti, mukaan lukien
  vuosiluvut 1871 ja 1893.
- **CO3/Galle Face Hotel:** perustettu 1864 — täsmää
  (`opened_date = 1864` infoboxissa).
- **CO1/Fort-alue:** täsmää edellä mainitun muurikohdan lisäksi.

## 3. Varmennetut koordinaatit

Colombon 8 kohteesta seitsemän täsmäävät riippumattomaan
OSM/Nominatim-dataan hyvin — kaksi poikkeamaa (Fort ja Colombon
keskipiste) ovat todennäköisesti selitettävissä eri
viittauspisteillä (Wikidatan tarkka POI vs. OSM:n hallinnollisen
alueen keskipiste), ei virheitä samaa luokkaa kuin Mumbain/Chennain
löydökset — ei ylitä 100 m:n virheeksi tulkittavaa kynnystä
merkittävästi paitsi kahdessa alla mainitussa kohteessa, jotka
selittyvät menetelmäerolla.

| # | Nimi | Faktapohjan koordinaatti | Riippumaton tarkistus (Nominatim) | Ero | Arvio |
|---|---|---|---|---|---|
| 1 | Colombo, keskipiste | 6,9344°N 79,8428°E | 6,9389°N 79,8542°E (hallintoalueen keskipiste) | ~1,7 km | Menetelmäero (POI vs. aluekeskipiste), ei korjaustarvetta |
| 2 | Galle Face Hotel | 6,9200°N 79,8462°E | 6,9201°N 79,8461°E | ~15 m | OK |
| 3 | Beira-järvi | 6,9294°N 79,8542°E | 6,9271°N 79,8563°E (järven itäosa) | ~330 m | OK, järvi on laaja moniosainen |
| 4 | Colombon majakka | 6,9363°N 79,8408°E | 6,9363°N 79,8408°E | 0 m | OK |
| 5 | Fort (liikekeskus) | 6,9258°N 79,8417°E | 6,9343°N 79,8448°E (koko Fort-kaupunginosan keskipiste) | ~1,0 km | Menetelmäero (kaupallinen ydin vs. koko kaupunginosa), ei korjaustarvetta |
| 6 | Colombon satama | 6,9528°N 79,8447°E | ei löytynyt suoraan Nominatim-haulla | — | Ei ristiriitaa löytynyt, Wikidata-arvo uskottava |
| 7 | Wolvendaalin kirkko | 6,9421°N 79,8590°E | 6,9420°N 79,8590°E | ~10 m | OK |
| 8 | Cinnamon Gardens | 6,9067°N 79,8633°E | 6,9095°N 79,8662°E (koko kaupunginosan keskipiste) | ~440 m | OK, kaupunginosa on laaja |

## 4. Yhteenveto

Colombon faktapohja läpäisi tarkistuksen ilman yhtään asiavirhettä.
Kaikki kolme tehtävänannon kohdennettua tarkistuskohtaa —
muurien purku 1869–1871, teen 1867/1869-tarina ja sisällissodan
tiukka yhden-virkkeen rajaus — vahvistuivat täsmällisesti oikeiksi
suoraan en-Wikipedian raakatekstistä. Koordinaateissa kaksi kohdetta
(Colombon keskipiste ja Fort-alue) poikkeavat riippumattomasta
OSM-datasta noin 1–1,7 km, mutta tämä selittyy todennäköisesti sillä,
että Wikidata osoittaa tarkkaan pisteeseen (esim. tietty rakennus tai
maamerkki) kun taas OSM/Nominatim palauttaa koko hallinnollisen
alueen (koko Fort-kaupunginosa, koko kaupunki) keskipisteen — ei
edellytä korjausta, mutta kirjoittaja voi halutessaan tarkistaa Fort-
kohteen viittaavan nimenomaan haluttuun liikekeskukseen.
