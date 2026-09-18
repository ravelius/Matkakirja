# Viesti Fablelle: Versailles ja Chambord 1400 px:llä — juurisyy mitattu (18.9.2026)

Opus, haara `claude/bold-ride-vow4ki-julkaisu-v1935` (PR #2573, ei versionostoa,
ei uutta PR:ää). Aloitus 18.9.2026 klo 03.13 Suomen aikaa, mittaukset Mac
Studiolla (Chromium 1234, dpr 2). Tehtävä: mitata, mihin Versailles ja Chambord
katoavat 1400 px:llä (vartio 8b, `savuke-pariisi-lahizoom.mjs`), ja korjata niin
ettei jäsenyys eikä kartalla-olo riipu ruutukoosta.

## 1. Juurisyy: ei luokittelu, ei portti — **kameran rajaus**

Tehtävänannon kolmesta ehdokkaasta mitattiin kaikki kolme samalla ajolla.
Mittari on uusi kerroksen oma rivistö (`nostot.kartanRivit()`, ks. luku 3), joka
erottaa neljä eri asiaa toisistaan: puuttuuko nosto DATASTA, onko se siirretty
LIUSKAAN (= pudotettu kartalta, PAATOKSET 34 kohta 4), onko sillä RUUTUPISTE
juuri nyt ja onko se OSUMALISTALLA.

**Mitatut arvot, 1400 × 900, kaikki neljä zoomia (0,34 · 0,5 · 0,7 · lähizoomi)
— luvut olivat joka kerralla samat:**

| kohde | luokitus | oma paikka (`omaLat/omaLng`) | km Pariisista | ankkuri (`lat/lng`) | kartalla | ruudulla | osumissa |
|---|---|---|---|---|---|---|---|
| Versailles | ulkopuolinen | 49,797 / 2,052 | 107,79 | 49,797 / 2,052 | kyllä | **ei** | ei |
| Chartres | ulkopuolinen | 48,448 / 1,487 | 76,22 | 48,448 / 1,487 | kyllä | kyllä | kyllä |
| Chambord | ulkopuolinen | 47,616 / 1,517 | 149,40 | 47,616 / 1,517 | kyllä | **ei** | ei |

**Sama mittaus 390 × 844, kaikki neljä zoomia — täsmälleen samat luvut:**

| kohde | luokitus | oma paikka | km | ankkuri | kartalla | ruudulla | osumissa |
|---|---|---|---|---|---|---|---|
| Versailles | ulkopuolinen | 49,797 / 2,052 | 107,79 | 49,797 / 2,052 | kyllä | kyllä | kyllä |
| Chartres | ulkopuolinen | 48,448 / 1,487 | 76,22 | 48,448 / 1,487 | kyllä | kyllä | kyllä |
| Chambord | ulkopuolinen | 47,616 / 1,517 | 149,40 | 47,616 / 1,517 | kyllä | kyllä | kyllä |

Kaksi asiaa luetaan suoraan taulukoista:

1. **Jäsenyys ei riipu ruutukoosta jo nyt.** Luokitus (`ulkopuolinen`), noston
   oma datapaikka ja ankkuri ovat bittiä myöten samat molemmilla ruuduilla
   kaikilla zoomeilla. Ehdokas **a) kaatuu**: `onKaupunginSisainen` ei luokittele
   näitä sisäisiksi kummallakaan ruudulla — ei `paikka.nimi`-polkua eikä
   `KAUPUNGIN_SADE_KM` 12 km:n polkua pitkin (lähin niistä on 76 km).
   Liuskaan siirrettyjä on **16 molemmilla ruuduilla**.
2. **Ankkuri ei siirrä niitä minnekään.** `lat/lng` on sama kuin `omaLat/omaLng`
   jokaisella rivillä: ankkurilevitys ei kosketa näitä kolmea (ne eivät ole
   `liikkuvat`-joukossa saapumiskehyksessä). Ehdokas **b):n ankkuriosa kaatuu.**
   `PAAKARTAN_MERKKIKATTO` ei myöskään pudota: kohdemaassa katto on `Infinity`,
   ja ehdokas **c)** (`lahi`-portti) kaatuu samasta syystä — `maalehti-peilisali`
   on `lahi: true`, ja se ON rivistossa molemmilla ruuduilla.

**Ainoa ero on `ruudulla`.** Se on `js/pallolauta/lauta.js`:n `ruudulla(lat,
lng)`: piste kotelon suorakaiteen sisällä. 1400 × 900 on leveä ja matala, ja
zoomsarja ajetaan Pariisiin keskitettynä — Versailles (107,8 km pohjoiseen,
ladottuna) ja Chambord (149,4 km etelään) jäävät kuvan yläpuolelle ja alapuolelle
kaikilla neljällä zoomilla. 390 × 844 on kapea ja korkea, ja sama sarja osuu
niiden päälle. Mikään ei siis ollut pudonnut kartalta kummallakaan ruudulla.

## 2. Miksi vartio silti oli punainen: mittari luki yhä ruutua

Edellinen erä korjasi 8b:n lukemaan nimet `nostot.osumat()`ista koko
zoomsarjasta. **`osumat()` on ruudulla olevien merkkien lista** — se on
`ruudulla()`-suodatuksen tulos. Zoomsarjasta lukeminen siirsi siis vain rajaa
(neljä kameran asentoa yhden sijasta), ei mittaa: 1400 px:llä kaikki neljä
asentoa ovat Pariisin ympärillä, eikä yksikään yllä 107 km pohjoiseen tai
149 km etelään. Sama vartio olisi ailahdellut jokaisella uudella ruutukoolla ja
jokaisella zoomsarjan muutoksella.

PAATOKSET 34 kohta 4 ei puhu kamerasta: kaupungin sisäiset siirtyvät liuskaan ja
ulkopuoliset jäävät kartalle. Se on **jäsenyys**, ja kerros tietää sen itse.
Tämä on sama periaate, joka on jo kirjattu `js/pallolauta/nostot.js`:ään
otsikolla JÄSENYYS LUETAAN KOKO DATASTA, EI RUUDUSTA — se oli vain toteutettu
liuskan puolella ja jätetty toteuttamatta mittarin puolella.

## 3. Korjaus

- **`js/pallolauta/nostot.js`** — kerros pitää kirjaa viimeisimmän ladonnan koko
  rivistöstä (`rivitNyt` = `keraa`n tuotos) ja liuskaan siirrettyjen avaimista
  (`liuskaanSiirretyt` = sama `sisaisetAvaimet`, joka pudottaa merkit kartalta).
  Uusi julkinen `kartanRivit()` antaa rivit kenttineen: `omaLat`/`omaLng`
  (jäsenyyden datapaikka), `lat`/`lng` (ankkuri), `paikkaNimi`, `poltettu`,
  `vainNimi`, `kaupunki`, `ruudulla` (onko ruutupistettä juuri nyt) ja
  **`liuskassa`** (onko pudotettu kartalta). Yksi laskenta, ei uutta lähdettä:
  luvut ovat samat objektit, joista liuska ja kartan siivous jo tehdään.
- **`tools/savukkeet/savuke-pariisi-lahizoom.mjs`** — vartio 8b lukee väitteen
  `kartanRivit()`istä: *kartalla* = rivistossa JA ei liuskassa. Vaatimus
  mitataan kaikilta neljältä zoomilta erikseen, ei enää "jollakin zoomilla".
  Mitattavat luvut (luokitus, km, oma paikka, ankkuri, kartalla, ruudulla,
  osumissa) ovat INFO-riveillä zoomeittain, joten seuraava punainen kertoo
  suoraan kumpi asia muuttui. Ruudulla-olo on yhä INFO-rivillä
  (*"ruudulla jollakin zoomilla"*), koska se on oikea tieto — se ei vain ole
  tämän väitteen mitta.

Peliin ei koskettu: kartan käytös, liuskan sisältö eikä nostojen paikat muutu
tästä erästä. Muutos on kerroksen luettavuus (uusi lukija) ja mittarin oikea
mitta.

## 4. Mittaus korjauksen jälkeen (yksi ajo per ruutu)

| ruutu | 8a | 8b | liuskaan siirrettyjä | koko savuke |
|---|---|---|---|---|
| 1400 × 900 | OK | **OK** | 16 | **30/30** (ennen 29/30) |
| 390 × 844 | OK | **OK** | 16 | **31/31** |

INFO 1400 px: *"kartalla (rivisto) Versailles, Chartres, Chambord, ruudulla
jollakin zoomilla Chartres, kartan nimiä ruudulla 6"*.
INFO 390 px: *"kartalla (rivisto) Versailles, Chartres, Chambord, ruudulla
jollakin zoomilla Versailles, Chartres, Chambord, kartan nimiä ruudulla 48"*.

Liuskan lukumäärä on siis **16 molemmilla ruuduilla**, kuten tehtävänanto
vaati, ja kaikki kolme ulkopuolista kohdetta ovat kartalla molemmilla ruuduilla
kaikilla kolmella zoomilla + lähizoomissa.

## 5. Löydös Fablelle: Versaillesin oma paikka on 107,8 km Pariisista

Mittaus paljasti sivutuotteena asian, joka ei ollut tehtävänannossa eikä sitä
korjattu tässä erässä.

`maalehti-peilisali`-noston datassa (`js/packs/maalehtinostot-fra.js`) on
kommentti *"2,1203 E / 48,8047 N"* eli Versailles'n linna, ja laudan piste
`maailmankartta: { x: 5904, y: 1441.8 }`. Kerroksen rivistössä sen **oma
datapaikka** (`omaLat`/`omaLng`) on kuitenkin **49,797 N / 2,052 E** — 107,8 km
Pariisista pohjoiseen, kun oikea Versailles on 15 km lounaaseen. Sama ilmiö
näkyy Pariisin omissa nostoissa: savukkeen oma diagnoosi lukee *"Tour 1903
66,85 km · Braillen pisteet 67,32 km"* Pariisin pisteestä, vaikka ne ovat
Pariisissa.

Syy on se, että `omaLat`/`omaLng` otetaan talteen `keraa`ssa merkin
laudanpisteestä, ja se piste on jo **kasauspassin (js/fokusniput.js) latoma**,
ei datan oma — kohdekartan piste (`kohdekartanNostopaikat`) voittaa sen, mutta
vain niillä nostoilla, joille päätoimittaja on kirjoittanut kaupunkikartan
pisteen. Chartres ja Chambord ovat maastokohteita ilman kasausta, ja niiden
luvut osuvat datan koordinaatteihin desimaalilleen (48,448/1,487 ja
47,616/1,517) — ne ovat vertailukohta, joka näyttää eron.

Käytännön vaikutus tähän vartioon on nolla (kaikki kolme ovat joka tapauksessa
yli 12 km:n säteen ulkopuolella, ja Pariisin omat nostot tunnistetaan
`paikkaNimi`-polkua pitkin), mutta **jäsenyyden koordinaattimitta on tällä
hetkellä ladotusta pisteestä eikä datasta**, vastoin PAATOKSET 34 kohdan 4
sanaa *"noston OMA paikka"*. Jos jokin nosto joskus jää `paikkaNimi`-polun
ulkopuolelle, mitta on 50–70 km väärässä. **Fablelle päätettäväksi:** otetaanko
`omaLat`/`omaLng` kasausta EDELTÄVÄSTÄ pisteestä omaan erään.

## 6. Muu

- `node --test tests/*.test.mjs`: 3607/3607 läpi (13 skipattua).
- `node tools/build-standalone.mjs` ajettu ennen pushia.
- Ei koskettu Raamattuun, `sarjat.json`iin, `js/linssit/`-kansioon eikä
  `js/fokusvirta.js`:ään. Ei versionostoa, ei uutta PR:ää.
- Oletus, jonka kirjaan: *kartalla-olon* mitta on liuskaan siirtäminen eikä
  kameran rajaus. Jos Fable haluaa vartion väittävän myös *"näkyy ruudulla
  jollakin zoomilla"*, se on oma vartionsa ja oma päätöksensä — luku on jo
  INFO-rivillä molemmilta ruuduilta.
