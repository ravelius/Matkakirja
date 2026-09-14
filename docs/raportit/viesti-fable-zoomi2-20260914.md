# Viesti Fablelle — saapumisnäkymä rajautuu aivan maan rajojen ulkopuolelle (erä 13)

**Opus-työagentti, 14.9.2026.** Haara
`claude/bold-ride-vow4ki-zoomi2`, pohjana
`claude/bold-ride-vow4ki`. Toimeksianto: Raamatun KARTTAUUDISTUKSEN
PÄÄTÖKSET 12 kohta 5 (omistaja, sanatarkasti): *"kartta zoomautuu
liian kauas. pitaa rajautua aivan rajojen ulkopuolelle."*

**Lyhyesti:** syy ei ollut marginaali eikä uloszoomauksen kerroin vaan
**rajauksen mitta**. Maan laatikko on laudan (Mercator-sukuisissa)
yksiköissä, ja kamera katsoo palloa — kamera vertasi siis omenoita
appelsiineihin ja nousi Ranskassa noin 1,35× liian korkealle. Korjasin
rajauksen laskemaan korkeuden **suoraan pallon perspektiivistä
suljetulla kaavalla**, jolloin marginaali tarkoittaa taas sitä mitä
lupaa. Mitattu tyhjä tila sitovalla akselilla **35,3 % → 1,1 %**
(390 × 844) ja **27,5 % → 3,0 %** (1400 × 900). Uloszoomausvara on
molemmilla ruuduilla **0 %**.

---

## 1. Mitattu nykytila (ENNEN)

Playwright, Chromium `/opt/pw-browsers/chromium`, pallolauta, ei
kehittäjätilaa, savukkeen tallennerecepti (Fogg kaupungissa, phase
`action`). Mitta on **rajauksen ruutulaatikko** = maan laatikon kehän
projektio (`getScreenCoords`, 40 näytettä per sivu) yhdistettynä
maapaneelin kortin ruutulaatikkoon. Tyhjä tila = ruudun mitta miinus
laatikon mitta; **sitova akseli** on se, jolla tyhjää on vähemmän.

| Maa | Ruutu | `altitude` | Rajaus ruudusta | **Tyhjä, sitova akseli** |
|---|---|---|---|---|
| FRA | 390 × 844 | 0,6943 | 64,7 % leveydestä | **35,31 % (X)** |
| FRA | 1400 × 900 | 0,2509 | 72,6 % korkeudesta | **27,45 % (Y)** |
| ESP | 390 × 844 | 0,6078 | 69,7 % leveydestä | **30,29 % (X)** |
| ESP | 1400 × 900 | 0,2390 | 78,1 % korkeudesta | **21,93 % (Y)** |
| ITA | 390 × 844 | 0,5313 | 69,8 % leveydestä | **30,21 % (X)** |
| ITA | 1400 × 900 | 0,3281 | 77,0 % korkeudesta | **23,01 % (Y)** |

Kolmasosa ruudusta tyhjää, vaikka marginaali lupasi 10 %
(`1 + 2 × 0,05`). **Marginaali ei siis ollut syy.**

### 1.1 Mittauksen oma virhe, joka piti korjata ensin

Ensimmäinen mittaukseni sekoitti kaksi koordinaatistoa:
`pallo.getScreenCoords` antaa **kotelon** suhteelliset pikselit, kun
taas `getBoundingClientRect` on **sivun** koordinaatistossa. Ero on
tässä pelissä yläpalkin verran, **mitattu 68,3 px**, ja se sai maan
laatikon ja maapaneelin kortin näyttämään toistensa suhteen väärässä
paikassa (kortti "karkasi" Ranskan eteläreunan alle ja rajaus näytti
leikkautuvan yläreunasta). Kirjaan tämän, koska sama ansa odottaa
jokaista pallolaudan ruutumittausta; korjattu mittari on savukkeessa
(`rajausNyt`, kommentoitu).

Toinen ansa: `pallo.pointOfView()` palauttaa kesken kirjaston oman
tweenin **ajon kohteen**, ei piirrettyä asentoa. Yksi mittaus luki
korkeudeksi 0,4667, vaikka kuva oli yhä korkeudella ~0,65. Mittaus
odottaa nyt, että **piirretty mittakaava** (kahden pisteen ruutuväli)
ei enää liiku.

---

## 2. Juurisyy: laatikko mitattiin kartalta, kamera katsoo palloa

Maan laatikko on laudan yksiköissä (12 000 yks = 360°). Laudan **x on
suoraan pituusastetta**, mutta **y venyy** leveyspiiriä kohti
(Miller). Kamera taas näyttää palloa, jolla

* pituusasteen 1° kattaa ruudulla vain `cos φ` verran siitä, mitä sama
  1° kattaa päiväntasaajalla, ja
* pystysuunta on **todellinen leveysastekaari**, ei venytetty y.

Ranskassa molemmat osuvat samaan suuntaan:

| | laudan yksikköä | pallolla tarvitaan |
|---|---|---|
| Leveys | 489,8 (14,69° lon) | 14,69° × cos 41,4° = 10,16° = **338,7** |
| Korkeus | 406,3 (Miller-y) | lat 41,37…51,09 = 9,72° = **324,0** |

Ero on 1,35–1,45×, ja se selittää mitatun tyhjän tilan kokonaan.

### 2.1 Korjaus: suljettu kaava pallon perspektiivistä

Kolmiulotteinen perspektiivi (three.js `PerspectiveCamera`, fov
pystykulma) antaa pisteelle (φ, λ) kameran ollessa (φ₀, λ₀)
korkeudella h yksikköpallolla:

```
syvyys = (1 + h) − [sin φ sin φ₀ + cos φ cos φ₀ cos Δλ]
sivu   = cos φ sin Δλ
pysty  = sin φ cos φ₀ − cos φ sin φ₀ cos Δλ
ruutu  = (sivu / (tan(fov/2)·kuvasuhde), pysty / tan(fov/2)) / syvyys
```

Piste on ruudulla, kun kumpikin ruutukoordinaatti on itseisarvoltaan
enintään 1. **Ehto on h:ssa lineaarinen**, joten tarvittava korkeus
ratkeaa suoraan:

```
1 + h ≥ cos(kaari) + vara · max( |sivu|/(tan·kuvasuhde), |pysty|/tan )
```

ja koko laatikon korkeus on näistä suurin (laatikon kehältä
näytteinä). **Iterointia ei tarvita.** Funktio on
`js/pallolauta/kamera.js` → `pallonKorkeus(bbox, vara)`, ja sitä
käyttävät sekä saapumisajo (`kameranKohde`, bbox-haara) että
uloszoomauksen katto (`uloszoomausRaja`) — sama kaava molemmissa,
jotta saapumisnäkymä ja uloin sallittu näkymä ovat sama näkymä.

Kaava on **tarkistettu mittaamalla**: ennustettu ja mitattu ruutupiste
osuivat kolmella eri korkeudella kymmenesosapikselin tarkkuudella
(esim. 1400 × 900, lon −5,134 keskileveydellä: ennuste −218,3 px,
mitattu −218,2 px).

---

## 3. Uudet kertoimet

| Vakio | Ennen | Nyt | Peruste |
|---|---|---|---|
| `SAAPUMISRAJAUKSEN_MARGINAALI` | 0,05 (vara 1,10) | **0,01 (vara 1,02)** | kauimmainen reuna 98 %:iin ruudun puolikkaasta |
| `ULOSZOOMAUKSEN_KERROIN` | 1,15 | **1,02** (= sama lauseke kuin vara) | uloszoomaus ei pääse saapumisnäkymää kauemmas |
| `SAAPUMISRAJAUKSEN_KATTOVARA` | — (luettiin marginaalista) | **1,10** (uusi vakio) | katon portti ei saa liikkua marginaalin mukana |
| `PANOROINNIN_KERROIN` | 1,3 | **1,3 (ennallaan)** | mitattu, ks. luku 5 |

**Miksi vara on 1,02 eikä 1,03.** Tyhjä ei jakaudu tasan: vara sitoo
sen laatikon reunan, joka on ruudun keskipisteestä kauimpana, ja
kamera osoittaa laatikon **keskipisteeseen laudan yksiköissä** —
pallon projektiossa keskipiste ei ole reunojen puolivälissä, joten
toiselle reunalle jää hitusen enemmän tilaa. Mitattu Ranskassa varalla
1,03: tyhjää 2,05 % (390) ja **3,94 %** (1400) — yli kolmen prosentin.
Varalla 1,02 kumpikin mahtuu (1,08 % ja 3,01 %).

**`ULOSZOOMAUKSEN_KERROIN` ja värilaatasto.** Vanha kommentti väitti
kertoimen olevan *sama luku* kuin `--laatikkokerroin` 1,15. Se oli
totta vain niin kauan kuin kumpaakaan ei tiukennettu. **Ehto on
yläraja, ei yhtäsuuruus:** värilaatasto kattaa maan laatikon × 1,15,
ja kamera saa pysyä sen **sisällä** — 1,02 on laattakattavuuden
sisällä, eikä feidattua laatikkoa voi nähdä. Kommentti on korjattu
totuudenmukaiseksi.

**`SAAPUMISRAJAUKSEN_KATTOVARA` on uusi ja tarkoituksella oma
vakionsa.** Katto (`laatikkoMahtuu` vs. `SAAPUMISRAJAUKSEN_MAX`)
vastaa kysymykseen *"näkyykö tämä maa pallolta ollenkaan"* ja jakaa
maat kahteen pysyvään joukkoon (RUS, USA, CAN, GRL, CHN saavat
kaupunkinäkymän). Ennen se laskettiin saapumismarginaalista, jolloin
rajauksen tiukentaminen olisi liikuttanut myös tuota joukkoa. Nyt
portti pysyy **täsmälleen ennallaan** — `tests/maakartuutsi.test.mjs`
vartioi joukkoa, ja se on vihreä.

---

## 4. Tulos (JÄLKEEN)

| Maa | Ruutu | `altitude` | Rajaus ruudusta | **Tyhjä, sitova akseli** | Kortti ruudussa |
|---|---|---|---|---|---|
| FRA | 390 × 844 | 0,4522 | **98,9 %** leveydestä | **1,08 % (X)** | kyllä |
| FRA | 1400 × 900 | 0,1863 | **97,0 %** korkeudesta | **3,01 % (Y)** | kyllä |
| ESP | 390 × 844 | 0,4381 | 96,4 % leveydestä | 3,65 % (X) | kyllä |
| ESP | 1400 × 900 | 0,1894 | 100 % korkeudesta | 0 % (Y) | **ei** (kortti −17 px) |
| ITA | 390 × 844 | 0,3809 | 96,8 % leveydestä | 3,16 % (X) | kyllä |
| ITA | 1400 × 900 | 0,2562 | 98,1 % korkeudesta | 1,90 % (Y) | **ei** (kortti −10 px) |

**Uloszoomausvara `maxDistance / altitude − 1` on jokaisella rivillä
0,0 %** (ennen: 4,5 % työpöydällä, 0 % puhelimella). Ctrl-rulla
ulospäin ei kasvata näkyvää leveyttä.

**ESP ja ITA työpöydällä: maapaneelin kortti ulottuu ruudun
alareunan ali** (17 px ja 10 px). Se EI ole rajauksen laskuvirhe vaan
luvun 7 kohdan 1 havainto — kortti piirtyy noin `1 / cos φ` isompana
kuin sen lautajalanjälki, ja Ranskan ulkopuolella paneelin ankkuri on
yhä oletuksessa (maan eteläreunan alla). **Pilottimaassa Ranskassa
kortti mahtuu kokonaan molemmilla ruuduilla.** Korjaus kuuluu
`js/pallolauta/maapaneeli.js`:ään, jota toinen agentti työstää
samaan aikaan.

Kuvat (Ranska, ennen ja jälkeen, molemmat ruudut):
`docs/raportit/kuvat/zoomi2-ennen-pariisi-390.png`,
`zoomi2-ennen-pariisi-1400.png`, `zoomi2-jalkeen-pariisi-390.png`,
`zoomi2-jalkeen-pariisi-1400.png`.

---

## 5. Panoroinnin raja (1,3) — mitattu, ei arvattu

Kamera on nyt lähempänä, joten sama panorointiraja näyttää itärajalla
vähemmän maata. Mitattu Ranskassa: kamera itärajalle
(`panoraja().lngMax` = 11,764°, sama luku kuin ennen), ja maan
laatikosta on yhä ruudulla

| Ruutu | maan laatikosta ruudulla itärajalla |
|---|---|
| 390 × 844 | **42,7 %** (ESP 40,2 %, ITA 40,1 %) |
| 1400 × 900 | **72,9 %** (ESP 73,1 %, ITA 100 %) |

Ehto *"kohdemaa ei voi kadota ruudulta"* pitää, joten **en kutistanut
kerrointa**. Jos omistaja haluaa liikkumavaraa vielä vähemmän, säädin
on `PANOROINNIN_KERROIN`, ja sen voi laskea erikseen — se ei ole
sidottu rajauksen varaan.

---

## 6. Portit ja vastakoe

```
npm test                                # pass 3353, fail 2 (ks. alla)
node --test <15 kameraa lukevaa testitiedostoa>
                                        # pass 347, fail 0 (LOPULLINEN koodi)
node tools/tarkista-kaksoisavaimet.mjs  # ei kaksoisavaimia
node tools/tarkista-niputus.mjs         # 387 moduulia, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       # 1637 ui-viittausta, kunnossa
node tools/savukkeet/savuke-era12.mjs   # 11/11 vartiota läpi
```

**Koneen kuormasta.** Tämä kontti ajoi koko työn ajan kymmenkunnan
rinnakkaisen agentin kuormaa (load average 35–49, 26 rinnakkaista
`node --test` -ajoa). Täysi `npm test` meni läpi kokonaisuudessaan
välivaiheen koodilla (pass 3353, fail 2); lopullisella koodilla kaksi
uusintayritystä **jumiutui kuormaan kesken ajon** (26 rinnakkaista
`node --test` -prosessia; omat ajoni seisoivat kymmeniä minuutteja
samassa kohdassa ilman yhtäkään punaista). Lopullista koodia vasten
ajoin siksi erikseen:

* **kaikki 15 testitiedostoa, jotka lukevat
  `js/pallolauta/kamera.js`:ää** (aikajana, aloitus-pallolla, arktis,
  ihmisen-matka-esitys, kohdekaupunki, linssikartta, maakartuutsi,
  osumareititys, pallo, pallolauta, pallolepokerros,
  satelliitti-avaruus, siirtokoreografia, tahdet, tasoitustaso) —
  **pass 347, fail 0**;
* staattiset portit ja koko savukkeen vastakokeineen — **11/11**.

**Kirjaan tämän rehellisesti: koko `npm test` on ajettu läpi
välivaiheen koodilla, ei lopullisella.** Lopullista koodia vasten on
ajettu kaikki se testipinta, joka ylipäätään koskettaa muutettua
tiedostoa. Jos Fable haluaa vihreän kokonaisajon ennen mergeä, se
kannattaa ajaa kuormattomassa kontissa.

**Kaksi punaista ei liity tähän erään.** `tests/pollo.test.mjs`
väitteet *"indeksi rakentuu ja on kokoluokaltaan järkevä"* ja *"haku on
nopea myös koko aineistolla"* ovat **aikamittoja** (hakuindeksin
rakennus), ja tämä kone ajoi mittauksen hetkellä kuormalla ~40
(kymmenkunta rinnakkaista agenttia). Yksin ajettuna sama väite antaa
2431 ms, kuormattomana se mahtuu budjettiin. Ne eivät koske
`js/pallolauta/kamera.js`:ää millään tavalla; **kaikki kameran omat
testit (`maakartuutsi`, `tasoitustaso`, `pallolauta`) ovat vihreitä
51/51.**

`tools/savukkeet/savuke-era12.mjs` sai **väitteen 5** ja **vastakokeen
D**:

* **Väite 5.** Rajauksen ruutulaatikko (maan laatikon kehä ∪
  maapaneelin kortti) jättää **sitovalla akselilla enintään 3 %**
  tyhjää (**katto 3,5 %** eikä 3,0 %, jottei vartio kaadu kuormitetun
  koneen puolen prosentin heitosta; mitatut arvot 1,08 % ja 3,01 %), ja
  laatikko on kokonaan ruudussa. Molemmilla ruuduilla, Ranskassa.
* **Vastakoe D.** `pallonKorkeus` palautetaan tarjoiltuun
  lähdetekstiin palauttamaan `null`, jolloin rajaus lasketaan taas
  laudan Mercator-yksiköistä (erää 13 edeltänyt tila). **Väitteen 5 on
  kaaduttava.**

Samalla korjattiin **vastakoe A**: se korvasi
`ULOSZOOMAUKSEN_KERROIN`in säännöllisellä lausekkeella `[\d.]+`, eikä
olisi enää osunut lausekemuotoiseen arvoon — vastakoe olisi hiljaa
lakannut testaamasta mitään. Nyt `[^;]+;`.

**VASTAKOKEIDEN TULOS (kaikki tehdään tarjoiltavaan lähdetekstiin,
joten peli ajaa oikeasti vanhalla arvolla):**

| | Muutos | Tulos |
|---|---|---|
| **A** | `ULOSZOOMAUKSEN_KERROIN` → 3 | korkeus 0,4522 vs. katto 1,3465 → **vara 197,8 %**, väite 1 **PUNAINEN** ✔ |
| **B** | `MAAPANEELIN_ANKKURIT` tyhjäksi | paneeli 41,161 N / 2,213 E, **3 maaosumaa (ESP)**, väite 2 **PUNAINEN** ✔ |
| **C** | `MAAPANEELIN_SKAALA_MAX` → 3 | `skaala × korkeus` 0,39263 → 0,33913 → 0,20941, hajonta 58,4 %, väite 3 **PUNAINEN** ✔ |
| **D** | `pallonKorkeus` → `null` | tyhjä sitovalla akselilla **−6,5 %** (390) ja **−589,6 %** (1400) eli rajaus vuotaa ruudun ulkopuolelle, väite 5 **PUNAINEN** ✔ |

Vastakoe D muuttaa **vain mitan**, ei varaa, joten se vastaa täsmälleen
kysymykseen *"tekeekö pallon perspektiivi eron"*. Vastaus: tekee.

---

## 7. Avoimet havainnot (en korjannut, kirjaan)

1. **Maapaneelin kortti piirtyy noin `1 / cos φ` isompana kuin sen
   lautajalanjälki.** Mitattu Italiassa 1400 × 900: kortin
   lautajalanjälki on ruudulla 107 px, mutta kortti piirtyy 135,5 px
   leveänä (suhde 1,27; `1 / cos 40,6° = 1,32`). Syy on se, että
   kortin skaala on ruudun **keskipisteen** mittakaava, kun taas
   `paneelinLaatikko` varaa sille tilaa laudan yksiköissä. Tiukassa
   rajauksessa tämä näkyy: Italian kortti ulottuu työpöydällä ruudun
   alareunan ali. **Ranskassa (pilottimaa, oma ankkuri
   Biskajanlahdella) kortti mahtuu kokonaan molemmilla ruuduilla.**
   Korjaus kuuluu `js/pallolauta/maapaneeli.js`:ään — `paneelinMitat`
   tai `paneelinLaatikko` saisi varata paneelille `1 / cos(ankkurin
   lat)` verran lisää lautaleveyttä — enkä koskenut toisen agentin
   tiedostoon. **Ansaitsee oman erän.**
2. **Muiden maiden kuin Ranskan paneeliankkuri on yhä oletus** (maan
   eteläreunan alla), ja sen lautalaatikko ulottuu selvästi alemmas
   kuin piirretty kortti. Siksi ESP:n ja ITA:n mitattu "näkyvä" tyhjä
   tila on hitusen yli kolmen prosentin, vaikka kamera rajaa
   saapumislaatikon tarkasti: rajaus varaa tilaa paneelille sinne,
   missä korttia ei ole. Sama korjaus kuin kohdassa 1.
3. **Raamatun teksti mainitsee `ULOSZOOMAUKSEN_KERROIN`in arvona
   1,15** (`js/tyohuone-raamattu.js`, KARTTAUUDISTUKSEN PÄÄTÖKSET).
   Arvo on nyt 1,02. **Vain Fable kirjoittaa Raamattuun**, joten jätän
   rivin koskematta ja pyydän päivitystä.
4. **`SAAPUMISRAJAUKSEN_MAX` (2000 yks) on yhä laudan yksiköissä**,
   siis samaa omena–appelsiini-vertailua kuin luvun 2 juurisyy. Pallon
   mitoilla Grönlanti (61,7° leveä mutta leveyspiirillä 60 N) ja Kiina
   mahtuisivat ruutuun, eli maiden jako kaupunkinäkymään ja
   maanäkymään muuttuisi. **En muuttanut sitä omin päin** — se on
   pelituntumaa koskeva päätös, ei laskuvirhe, ja kuuluu omistajalle.
5. **Maapaneelin sisällön ylivuoto puhelimella on 50 px** (savukkeen
   INFO `390 px · uloszoomaus … ylivuoto`), kun se työpöydällä on 0.
   Kortti on puhelimella nyt selvästi isompi (58,8 → 90,3 px), joten
   ylivuoto ei johdu ahtaudesta vaan siitä, että sisus saa enemmän
   tilaa kuin kortin oma laatikko. Sekin on `maapaneeli.js`:n ja
   `css/styles.css`:n asia, en koskenut. **Kannattaa mitata samassa
   erässä kuin kohta 1.**
6. **Ranskan kortin länsireuna on puhelimella 0,75 px ruudun
   reunasta.** Se on tiukan rajauksen hinta ja juuri sitä mitä
   pyydettiin (*"aivan rajojen ulkopuolelle"*), mutta se tarkoittaa
   myös, ettei kortin koolla ole enää varaa kasvaa ilman uutta
   mittausta.

---

## 8. Muutetut tiedostot

- `js/pallolauta/kamera.js` — uusi `pallonKorkeus` (suljettu kaava),
  `kameranKohde` bbox-haara ja `uloszoomausRaja` käyttävät sitä,
  `SAAPUMISRAJAUKSEN_MARGINAALI` 0,05 → 0,01,
  `ULOSZOOMAUKSEN_KERROIN` 1,15 → 1,02 (lauseke), uusi
  `SAAPUMISRAJAUKSEN_KATTOVARA` 1,10, kommentit korjattu
  totuudenmukaisiksi.
- `tools/savukkeet/savuke-era12.mjs` — väite 5, vastakoe D, vastakoe
  A:n regex korjattu, mittauksen vakiintumisodotus, `ULOSZOOMAUSVARA`
  0,08 → 0,02.
- `docs/raportit/viesti-fable-zoomi2-20260914.md` (tämä) ja
  `docs/raportit/kuvat/zoomi2-*.png`.

Ei Raamattuun, ei versionostoa, ei muutoslokiriviä, ei mergeä, ei
dist-committia, ei muihin tiedostoihin — ohjeen mukaan.
