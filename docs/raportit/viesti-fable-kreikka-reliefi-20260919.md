# Opus 2 → Fable: Kreikan kartan kerma (F) ja Kreetan suorakaiteet (G)

19.9.2026 klo 19.25–19.42 Suomen aikaa. Haara `opus2-kreikka-reliefi`
= origin/main v1961 + `opus2-zoomikatto`, jotta mittaus tehtiin uudella
katolla 0,084. Ei versionostoa, ei PR:ää. Lähde: Sonnet 1:n kierros 10
(`sonnet-local-kierros-10`, kuvat 04, 05/06 ja 07).

## F) Kreikan kartta Thessalonikin pohjoispuolella: EI VIKA, vaan huntu

**Tulos: ei koodimuutosta.** Kohdemaan ulkopuolinen kerma on
tarkoituksellinen huntu (väritason tasoitus, `pyramidi.json`
`varitasot[ISO].tasoitus` ja PAATOKSET 23). Se on täsmälleen sama
Kreikassa ja Itävallassa. Sonnet 1:n Wien-kuva 07 oli otettu
**maailma-tila päällä** (raportin ensimmäinen kappale: "Maailma-kytkin
PÄÄLLÄ 19.10–19.12 … (Wien …)"), ja silloin huntu on pois (PAATOKSET 23).
Kreikan kuva 04 oli otettu maailma-tila pois päältä.

Mittaus: WebKit 390 × 844 dpr 3, pelilauta, sama korkeus kuin
kaupunkinäkymässä. Ruudun keskialueelta laskettiin keskimääräinen
naapuripikselien luminanssiero ("gradientti"). Reliefi antaa 3,5–6,
tasainen kerma alle 1.

| Näkymä | Maailmatila | Gradientti | Kirkkaus |
|---|---|---|---|
| Kreikka sisämaa (39,6 N 22,2 E), Ateena | pois | 5,11 | 202 |
| Pohjois-Makedonia (42,0 N 21,6 E), Ateena | pois | **0,80** (kerma) | 241 |
| Serbia (43,8 N 21,0 E), Ateena | pois | **0,99** (kerma) | 242 |
| Itävalta sisämaa, Wien | pois | 3,54 | 196 |
| Slovakia (48,8 N 19,5 E), Wien | pois | **0,30** (kerma) | 246 |
| Unkari, Tšekki, Italia, Wien | pois | **0,44–0,81** (kerma) | 242–247 |
| Pohjois-Makedonia, Ateena | **päällä** | 3,75 (reliefi) | 199 |
| Serbia, Ateena | **päällä** | 3,61 (reliefi) | 215 |

Luettelo vahvistaa saman: GRC:n ja AUT:n väritasoilla on identtiset
asetukset (`tasoitus: true`, `peitto: 0,85`, `kerma #faf4d6`,
`feidaus 0,85`). Ainoa ero on `feidausReuna` (91 vs. 44), joka
koskee vain häiveen leveyttä.

Kaappaukset:
- `F-kreikka-pohjoinen-normaali.jpg`
- `F-kreikka-pohjoinen-maailmatila.jpg`
- `F-wien-slovakia-normaali.jpg`

**Päätös on sinun tai omistajan.** Jos naapurimaiden halutaan näkyvän
reliefillä myös normaalitilassa, se kumoaa huntulinjauksen
(PAATOKSET 23 / omistaja 13.9. "muiden maiden kartat … ennallaan").
Vaihtoehtoja: hunnun peittoa voi keventää luettelosta (`peitto` 0,85
→ esim. 0,6) tai jättää hunnun pois maakohtaisesti. En tehnyt kumpaakaan.

## G) Kreetan suorakaiteet ja pikselöity läiskä: KORJATTU

### Juurisyy (mitattu)

MERIVARI (38, 78, 145), jonka v1961 teki laastarissa aukoksi
(polttamattoman merilaatan täyte), on **täsmälleen reliefipaletin
−4 000 metrin merisävy** (`tools/reliefivarit.mjs` MERI). Välimeri on
Kreetan eteläpuolella ja Joonianmerellä 3–5 km syvä. Siksi v1961:n
±6-toleranssi ja ±40:n reunalaajennus osuivat **poltettuun
batymetriaan** eivätkä vain täytteeseen.

Mittaus: z6-reliefilaatat ämpäristä. Syvän meren laatoista 50–85 %
pikseleistä osui MERIVARIin ±6.

Aukoista näkyy 4k-pohja, jonka sävy on eri kuin laastarin meren. Tästä
syntyivät pikselöity läiskä (osittain lävistetty batymetria) ja laatan
reunan suorakaiteet ohuine ääriviivoineen (lävistyksen osuus vaihtelee
laatasta toiseen).

### Korjaus (`js/pallolaatat.js`, vain Astronautin laastari)

Laastari piirtää nyt vain maan, ja **meri tulee kokonaan 4k-pohjasta**.
Tämä on Fablen vaihtoehto "laastarin meri kokonaan pois". Merellä ei
ole enää laastarin reunaa eikä sävyeroa.

- `onReliefinMeri(r, g, b)`: pikseli on merta, jos b > g + 2,
  b > r · 1,2 + 4 ja b > g · 1,05.
  - Testattu koko paletille varjostuskertoimilla 1, 0,6, 0,3 ja 0,15:
    jokainen merisävy on merta ja jokainen maasävy (myös lumi ja jää)
    maata.
  - Silmämääräisesti Kanarian z6-laatoilla: rantaviiva seuraa tarkasti.
- `merkitseMeriAukoksi(data, leveys)`: koko meri alfaan 0. Rannan
  sekoittuneet pikselit (b > r + 8, b ≥ g) lisätään yhdellä
  laajennuskierroksella, jottei rannalle jää sinistä hiussaumaa.
- Kutsukohta vaihtui `merkitseMerivariAukoksi` → `merkitseMeriAukoksi`.
  Vanha funktio ja vakiot jäivät (testit, mittari `merivariAukkoja`
  laskee nyt meriaukot).

### Todisteet

- Kaappaukset (WebKit 390 × 844 dpr 3, lähin katto 0,358):
  - `G-kreeta-ennen.jpg` / `G-kreeta-jalkeen.jpg`
  - `G-joonia-ennen.jpg` / `G-joonia-jalkeen.jpg`
  - Suorakaiteet ja pilkut ovat poissa, ja meri on yhtenäinen 4k-pohjaa.
- **Uusi väite `savuke-astro-pallo` 48b** (puhelinrivi, PR-portissa):
  laastarilaattojen peittävistä pikseleistä korkeintaan 0,5 % saa olla
  meren sävyisiä.
  - **Korjattuna: 1 / 3 474 243.** Puhelin 55/55, lohko 48 tasaisia 0,
    kankaita 72/72.
  - **Vastakoe** (sama savuke, kutsukohta palautettu vanhaan maskiin):
    **1 046 012 / 4 538 237 (23 %) → 48b FAIL**, 54/55.
- `tests/laastari.test.mjs` (+3 testiä):
  - palettiluokittelu varjostuksineen
  - MERIVARI on paletin −4 000 m:n sävy
  - meri ja rannan sekoitus aukoksi, maa jää
- `node --test tests/*.test.mjs`: 3662 / 0 hylättyä.

### Ei koske

Topografialinssi ja pelilauta eivät muuttuneet, koska muutos on
`kerrokset.astronautti`-haaran takana, kuten v1961:ssä.
<<<<<<< HEAD

---

## LISÄYS klo 20.15: omistajan laitekuva 20.00 (v1962, "Laatta virhe meressä")

Omistajan kuvassa Joonianmerellä Italian ja Kreikan välissä näkyy tummia
suorakaidelaattoja ja pilkkuvanoja. Se on sama vika kuin G. Mitattu
omistajan rajauksella (36,3 N, 20,0 E, WebKit 390 × 844 dpr 3):
- ennen: G:n kutsukohta palautettu v1961:n MERIVARI-maskiin
- jälkeen: tämä haara

| Korkeus | Ennen | Jälkeen |
|---|---|---|
| 0,358 (lähin katto) | `G-omistajan-joonia-0358-ennen.jpg`: suorakaiteet ja pilkkureunat Joonianmerellä, sama kuvio kuin omistajan kuvassa | `G-omistajan-joonia-0358-jalkeen.jpg`: yhtenäinen meri, ei laattarajoja |
| 0,50 (omistajan arvio) | `G-omistajan-joonia-050-ennen.jpg` | `G-omistajan-joonia-050-jalkeen.jpg`: puhdas |

G:n korjaus (laastari vain maa) kattaa siis juuri omistajan näkymän.
=======
>>>>>>> origin/main
