# Ihmisen matka: kehys poissa koko avaruusvaiheen ajan (16.9.2026)

Omistajan huomautus 15.9.2026 klo 19.05 (iPhone-kuva avaruusvaiheesta
"He vain lähtivät.", sanatarkasti): *"Alussa oli vain musta mutta sitten
kehys palasi liian aikaisin"*. Raamattu, kohta "IHMISEN MATKA -LINSSI …
JATKO": kehys — yläpalkki, sen alareunan viiva, hampurilaisen nuoli,
aikajanan alapalkki ja Liiku — pysyy poissa KOKO avaruusvaiheen ajan ja
palaa vasta kun kartta valkenee, samassa feidauksessa.

Haara `claude/bold-ride-vow4ki-ihmisen-matka-kehys`, pohja v1917.

## Juurisyy (mitattu)

Kehyksen piilotus roikkui luokassa `esitys-musta`, joka elää VAIN
ensimmäisen virkkeen ajan (`js/linssit/ihmisen-matka-esitys.js`,
`nostaMusta`). Kun musta nousi harsoksi, yläpalkin 1 px kultainen
reunaviiva ja hampurilaisen nuoli palasivat tähtitaivaan ja pienen Maan
päälle — vaikka avaruusvaihe jatkui vielä noin 19 sekuntia. Kyse ei siis
ollut ajastimesta vaan siitä, että piilotus oli sidottu väärään,
lyhyempään jaksoon.

Toinen, pienempi vuoto löytyi mittauksessa: linssin **alapalkki**
(aikaselain) oli piilossa `esitys-pimea`-luokassa, mutta omalla 500 ms:n
liu'ullaan — savuke luki sen peittävyydeksi 1,0 vielä 640 ms mustan
alettua, eli valaistu nauha jäi hetkeksi mustan päälle.

## Muutos

1. **`js/linssit/ihmisen-matka-esitys.js`**
   - `aloita` asettaa `--avaruuden-feidi: 0ms` ja lisää luokat
     `esitys-pimea` + `esitys-avaruus` (kehys katoaa ilman liukua).
   - Uusi `paljastaKehys(feidi)` poistaa `esitys-avaruus`-luokan.
     Kutsujia on tasan yksi: `sytytaValot`, samassa
     silmänräpäyksessä kuin peite saa `pois`-luokkansa, feidiksi
     `VALOJEN_MS` (2600 ms).
   - `tila()` palauttaa uuden mittarin `kehysPiilossa`.
   - **Pakotietä ei ole.** Kokeiltiin ikkunan pointerdown-kuuntelijaa,
     mutta pallolauta ottaa kosketukset vastaan koko esityksen ajan:
     yksi vahinkokosketus tähtitaivaalla olisi tuonut kehyksen takaisin
     — juuri se, mistä omistaja huomautti. Oma Esc-kuuntelija taas
     olisi paljastanut kehyksen linssistä, jonka Esc joka tapauksessa
     sulkee (`js/aikajana.js` `nappain` → `ui.pysaytaAikajana`).
     Avaruusvaihe päättyy itsestään, kuten musta alkukin (v1913).
2. **`css/aikajana.css`** — `.aikajana.esitys-avaruus .aikajana-ylarivi`
   ja `.aikajana.esitys-avaruus .aikaselain` peittävyyteen 0 ja
   `pointer-events: none`; siirtymä `.esitys-kaynnissa`-säännössä
   lukee `--avaruuden-feidi`-muuttujaa, jonka ohjaaja asettaa (0 ms
   alussa, 2600 ms paluussa). Myös liikkeenvähennyksen lohkoon.
3. **Liiku ja pelin yläpalkki** eivät tarvinneet muutosta: Liiku on
   piilossa koko linssin ajan (`css/styles.css`
   `body.aikajana-paalla .toimintorivi .monitoimi-nappi { display: none }`,
   v1913) ja pelin oma `.topbar` on nollakorkuinen
   (`body.aikajana-palkki-auki`). Liikun sijoittelua ei koskettu —
   rinnakkainen maainfo-alakulma-haara saa siirtää sen vapaasti.

## Mittaukset (390 × 844 ja 1400 × 900)

Aikasarja 250 ms:n välein Käynnistä-napista kartan valkenemiseen:

| ms (390 px) | yläpalkki | valikkonappi | alapalkki | Liiku | kartta |
|---|---|---|---|---|---|
| 720 | 0 | 0 | 0 | 0 | 0 |
| 15 259 (puoliväli) | 0 | 0 | 0 | 0 | 0 |
| 21 107 | 0,85 | 0,85 | 0,85 | 0 | 0,85 |
| 21 837 | 0,99 | 0,99 | 0,99 | 0 | 1,0 |

Kehyksen nousu alkaa samasta näytteestä kuin kartan valkeneminen
(390 px: molemmat 19 902 ms, kesto 1 935 ms; 1400 px: 24 875 ms,
kesto 835 ms — kontin ohjelmisto-WebGL piirtää harvoin, joten mitattu
kesto jää alle 2 600 ms:n, mutta kehys ja kartta liikkuvat yhtä matkaa).
Mustan peitteen oma lasku tapahtuu jo 10–14 s kohdalla, eikä kehys
seuraa sitä enää.

Kuvamitta yläreunan 86 px nauhasta avaruusvaiheessa: kirkkaita
(≥ 96) pikseleitä 1 kpl, täsmälleen sama kuin vertailussa, jossa
yläpalkki on `display: none`. Vastakokeessa (luokka pois, vanha käytös)
samasta nauhasta luettiin 161 kirkasta pikseliä, maksimi 241 — viiva ja
hampurilainen palaavat.

## Vartiot

- `tests/ihmisen-matka-esitys.test.mjs`: uusi testi "kehys on poissa koko
  avaruusvaiheen ajan ja palaa kartan kanssa" (luokka lisätään
  aloituksessa, `nostaMusta` ei saa poistaa sitä, `paljastaKehys`-kutsuja
  tasan yksi, ei pointerdown-kuuntelijaa, alapalkin ja Liikun säännöt
  olemassa). **40/40 läpi.**
- Uusi savuke `tools/savukkeet/savuke-ihmisen-kehys.mjs`: 390 ja
  1400 px, aikasarja + kuvamitta + vastakoe + "napautus ei tuo
  kehystä". **13/13 väitettä läpi.** (Savukevartija
  `tools/tarkista-savukkeet.mjs` löytää sen itse kansiosta.)
- `tools/savukkeet/savuke-ihmisen-rintama.mjs`: **7/7.** Sen vastakoe
  piti päivittää poistamaan MOLEMMAT piilotusluokat — pelkkä
  `esitys-musta` pois ei enää tuo viivaa näkyviin, koska
  `esitys-avaruus` pitää sen poissa.
- `tests/rules.test.mjs` 334/334, `node tools/tarkista-savukkeet.mjs`
  kunnossa, `node --check` puhdas.

## Kuva

`docs/raportit/kuvat/ihmisen-matka-kehys-390-20260916.jpg` — 390 px,
avaruusvaiheen puoliväli ("Ei kukaan heistäkään tiennyt."): tähtitaivas
reunasta reunaan, ei yläpalkkia, ei reunaviivaa, ei hampurilaista, ei
alapalkkia eikä Liikua.

## Huomio omistajalle

Avaruusvaihe kestää mitattuna noin 19–25 sekuntia, ja sen ajan
hampurilainen — ainoa tie ulos linssistä — on piilossa. Näppäimistöllä
Esc sulkee linssin kuten ennenkin, mutta puhelimessa ulospääsyä ei ole
ennen kuin kartta valkenee. Tämä on linjauksen mukaista ("kehys pysyy
poissa KOKO avaruusvaiheen ajan"), mutta jos odotus tuntuu pitkältä,
vaihtoehto olisi tuoda pelkkä hampurilainen näkyviin esimerkiksi
kymmenen sekunnin kohdalla.

## Liuku (16.9.)

Omistajan tarkennus (Raamattu, "LINSSIEN KEHYS LIUKUU SISAAN MUSTAN
JALKEEN"): kun linssi on piilottanut kehyksen mustan/avaruusvaiheen
ajaksi, kehys palaa **liukumalla** ruudun ulkopuolelta paikalleen — ei
pelkällä peittävyyden feidillä. Liuku alkaa samalla hetkellä kuin kartta
valkenee.

### Mekanismi — yksi kaikille linsseille

Uusi **`css/linssikehys.css`** (ladataan `index.html`:ssä, ei linssin
omassa `lataaTyyli`-kutsussa, jotta myös ne linssit, jotka eivät lataa
`css/aikajana.css`:ää, voivat käyttää sitä; lisätty myös `sw.js`:n
SHELL-listaan ja `tools/build-standalone.mjs`:n STYLES-listaan).

Kaksi body-luokkaa ja yksi muuttuja:

| | merkitys |
|---|---|
| `kehys-liukuu` | siirtymä aseistettu (transform + peittävyys) |
| `kehys-piilossa` | kehys ruudun ulkopuolella; luokan poisto = paluuliuku |
| `--kehys-liuku` | liu'un kesto: 0 ms piilotuksessa, 500 ms paluussa |

Piilotus alussa tapahtuu siis **ilman siirtymää** (musta peittää joka
tapauksessa) — sama kädenliike kuin `--avaruuden-feidi`-muuttujalla.
Siirtymä on `transform var(--kehys-liuku, 500ms) ease-out` ja sen
rinnalla vanha `opacity var(--avaruuden-feidi, 2600ms) ease`, jotta
kehys ei pompahda täyteen kirkkauteen ennen karttaa. Valitsimet nimeävät
body-luokan lisäksi linssin juuren (paino 0-3-1), jolloin ne voittavat
linssikohtaiset siirtymäsäännöt ilman `!important`-merkkejä.

Liikkeenvähennyksellä (`prefers-reduced-motion: reduce`) transform on
pois ja jäljelle jää 200 ms:n feidi.

### Mitkä elementit liukuvat

- **Yläpalkki** `.aikajana-ylarivi` (kello, otsikot, hampurilainen,
  reunaviiva) ylös ulos: `translateY(calc(-110% - 2rem))`.
- **Pelin oma yläpalkki** `.topbar` samassa säännössä (linssin aikana se
  on nollakorkuinen, mutta mekanismi kattaa senkin).
- **Alapalkki** `.aikaselain` alas ulos: `translateY(calc(110% + 2rem))`.
- **Reuna- ja nurkkanapit**: valmiit koukut `.kehys-liukuva` +
  `.reuna-yla|.reuna-ala|.reuna-vasen|.reuna-oikea`; Ihmisen matkassa
  niitä ei tarvita, koska Liiku on koko linssin ajan `display: none`.

Vara (2rem) tuli mittauksesta: pelkkä `-110%` jätti 53 px korkean palkin
alareunan 2,9 pikselin päähän näkyviin, koska linssin juuri alkaa noin
8 px ruudun yläreunasta.

### Mitkä linssit käyttävät

- **Ihmisen matka** (`js/linssit/ihmisen-matka-esitys.js`): `aloita`
  lisää luokat kestolla 0 ms, `paljastaKehys` antaa kestoksi
  `KEHYKSEN_LIUKU_MS` (500 ms) ja poistaa `kehys-piilossa`-luokan
  samassa silmänräpäyksessä kuin peite saa `pois`-luokkansa; `pura`
  siivoaa molemmat. Vanha `esitys-avaruus`-peittävyys jää voimaan
  rinnalle.
- **Astronautin kamera** (`js/linssit/satelliitti*.js`): EI SOVELLU NYT.
  Linssissä ei ole mustaa vaihetta, joka piilottaisi kehyksen — se
  piilottaa vain pulun ja Liikun (`body.aikajana-paalla`), eikä
  yläpalkkia viedä pois. Mekanismi on valmis odottamassa, jos
  avaruusnäkymään joskus tulee musta avaus: riittää lisätä samat
  body-luokat.

### Mittaukset (savuke-ihmisen-kehys.mjs, 390 × 844 ja 1400 × 900)

| mitta | 390 px | 1400 px |
|---|---|---|
| yläpalkin alareuna valkenemisen alkaessa (+50 ms) | −29,1 px (ruudun yläpuolella) | −27,1 px |
| alapalkin yläreuna samalla hetkellä | 873,2 px (ruutu 844) | 927,6 px (ruutu 900) |
| samat perillä kierroksen lopussa | 61,2 / 781,8 px | 67,6 / 827,4 px |
| paluun siirtymä (Web Animations) | `transform`, molemmat palkit | `transform`, molemmat palkit |

Vastakoe: kun liu'un kesto on nolla (`--kehys-liuku: 0ms`),
transform-siirtymää ei synny lainkaan ja kehys on perillä samassa
silmänräpäyksessä — juuri niin kuin pelkkä peittävyyden feidi
näyttäisi. Punainen, jos mekanismi purettaisiin.

**Miksi mittaus ei ole seinäkellossa.** Ensin liuku yritettiin mitata
näytteinä (+50 ms ja +700 ms valkenemisen alusta), mutta kontin
ohjelmisto-WebGL vie pääsäikeen: `setTimeout(50)` laukesi mitattuna
502 ms:n ja `setTimeout(700)` 2 211 ms:n kohdalla, ja koska
transform-siirtymä ajetaan yhdistäjäsäikeessä, `getBoundingClientRect`
luki koko liu'un ajan lähtöarvoa. Myös `transitionstart` ja
`transitionend` tulivat samassa nipussa. Siksi savuke mittaa
+50 ms:n kohdalta sen, mitä voi luotettavasti mitata (kehys on ruudun
ULKOPUOLELLA, kun valkeneminen alkaa), ja liu'un LAADUN hidastetulla
kierroksella (sama mekanismi, kesto 10 000 ms): molemmilla palkeilla on
käynnissä transform-siirtymä. Liu'un todellinen kesto (500 ms) on
CSS:ssä, ja `tests/linssikehys.test.mjs` vartioi sen.

### Vartiot

- Uusi `tests/linssikehys.test.mjs` (4 testiä): yhteisessä säännössä on
  `transform`-siirtymä eikä pelkkää `opacity`-siirtymää, kesto tulee
  `--kehys-liuku`-muuttujasta (500 ms ease-out), suunnat oikein,
  liikkeenvähennys feidaa 200 ms:ssä, ohjaaja piilottaa 0 ms:llä ja
  paljastaa liu'ulla, tiedosto on `index.html`:ssä, `sw.js`:ssä ja
  yhden tiedoston version listassa.
- `tests/ihmisen-matka-esitys.test.mjs`, `tests/rules.test.mjs`,
  `tests/dokumentit.test.mjs`, `tests/linssikehys.test.mjs`:
  **381/381 läpi.** `node --check` puhdas kaikille muutetuille
  tiedostoille.
- `tools/savukkeet/savuke-ihmisen-kehys.mjs`: **10/10 (390 px)** ja
  **10/10 (1400 px)**, kaksi uutta väitettä + vastakoe.
- `tools/savukkeet/savuke-ihmisen-rintama.mjs`: **7/7.** Sen vastakoe
  piti päivittää poistamaan myös `kehys-piilossa` — kaksi vanhaa
  luokkaa ei enää riittänyt tuomaan viivaa näkyviin.
- Kehyssavukkeen kuvamitan odotus siirrettiin sivun sisään
  (`waitForFunction`): 40 kierroksen evaluate-silmukka kesti kontissa
  yli 40 s ja ehti satunnaisesti valojen syttymisen yli, jolloin
  kuvamitta otettiin valkoiselta kartalta.

### Huomio omistajalle

Liuku (500 ms) on lyhyempi kuin kartan valkeneminen (2 600 ms):
kehys tulee ensin paikalleen ja kirkastuu sitten kartan tahdissa. Jos
tuntuu siltä, että kehys saapuu liian aikaisin suhteessa karttaan, liu'un
kesto on yksi luku (`KEHYKSEN_LIUKU_MS`) — esimerkiksi 900 ms venyttäisi
saapumisen puoliväliin kartan valkenemisesta.
