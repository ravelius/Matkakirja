# Viesti Fablelle: maapaneeli neljäsosaan, kermapohja ja käsinpiirretty kehys

**Erä:** karttauudistus erä 11 (Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 7), rajattu omistajan kahdella perumisella 14.9.2026
**Haara:** `claude/era-kasinpiirto` (haarautettu Raamattu-haarasta
`claude/matkakirja-paatoimitus-raamattu-p7`, `origin/main` mergetty mukaan)
**Päivä:** 14.9.2026
**Versionostoa EI tehty** — Fable versioi ja julkaisee.

Omistaja (14.9.2026, kuvakaappaus Puolan maapaneelista):
*"maainfossa pitaa olla nelja kertaa pienempi ja saisi olla vaalealla pohjalla
kuten kasinpiirretyissa kartoissa. myos aariviiva pitaisi olla kasinpiirretyn
nakoinen. esim paksumpi ja sitten ulompi ohuempi viiva tai minkalainen se vain
oli vanhoissa kartoissa. selvita tarkkaan ja toteuta"* — ja kortilla
*"Koko paneeli neljasosaan"*.

**RAJAUS 1 (omistaja 14.9.2026, sanatarkasti):** *"ei tehda maan aariviivaan
kaksoisviivaa. eli keskeyta koko maa aariviiva projekti. pidetaan se vain sen
maa infopalikan piirtamiseen."* Kartan punainen maan raja jää **täysin
ennalleen**, ja kaksoisviiva koskee vain maapaneelin kehystä.

**RAJAUS 2 (omistaja 14.9.2026 kuvat nähtyään, sanatarkasti):** *"julkaise
noin, mutta muuta teksti tyylit ja kaikki muut takaisin siihen mita ne oli
alunperin. sinun piti vain lisata kehys"*. Erässä on siis enää **kolme**
muutosta: paneelin koko puoleen, kerman värinen pohja ja käsinpiirretty
kaksoisviivakehys. Kaikki muu — typografia, värit, asettelu, sisältö,
Lisää-valikko — on alkuperäinen, vain samalla 0,5:n kertoimella pienempänä.

---

## 0. Mitä palautettiin

### 0a. Rajaus 1 — maan ääriviiva (peruttu kokonaan)

- `js/pallovektorit.js` — `korostusOhut`-materiaali ja -olio,
  `kasinpiirronMitat`, tiheyskynnys rajan uudelleenrakennukselle.
  **Palautettu `git checkout`illa, tiedosto on bitilleen sama kuin
  `origin/main`issa.**
- `tests/maakorostus.test.mjs` — kaksoisviivan mukaan päivitetty
  lähdetekstiväite. **Palautettu, tiedosto on ennallaan.**
- `js/kasinpiirto.js` — rengaspari (`kasirengas`, `kasirenkaat`) ja sen
  suhdelukujen muunnos asteiksi poistettu. Jäljellä on vain kehys.
- Savukkeesta poistettu rajan väitteet, Norjan ja Italian kaappaukset,
  rajaviivan lähikuva ja piirtoajan mittaus; kuvat poistettu eikä committoitu.

`js/maanaariviivat.js`, `js/maatummennus.js` ja `js/pallolauta/lauta.js` eivät
ole koko erän aikana olleet muutettuina.

### 0b. Rajaus 2 — kaikki muu paitsi koko, pohja ja kehys

Kävin oman diffini rivi riviltä läpi. Palautettu alkuperäiseksi (kaikki
pituudet × 0,5, koska paneeli on puolet pienempi):

| Palautettu | Alkuperäinen → nyt | Erän kesken ollut (nyt poistettu) |
|---|---|---|
| **Sijaluku kortille** | `<span class="maapaneeli-sija">` | oli siirretty rivin `title`-attribuuttiin |
| Maan nimi | 13 px, `letter-spacing: 0.18em` → 6,5 px, 0.18em | 9 → 8,5 px, `letter-spacing: 0.10em` |
| Alarivin oma nimi | 8,5 px → 4,25 px | 6 px |
| Alarivin valtiomuoto | 7,5 px → 3,75 px | 6 px |
| Lukurivin otsikko | 7 px, `letter-spacing: 0.09em` → 3,5 px, 0.09em | 5,8 px, `letter-spacing: 0`, oma `line-height` |
| Lukurivin arvo | 9,5 px, `display: flex`, `gap: 4px` → 4,75 px, flex, 2 px | 6,2 px, `display: block`, `text-overflow: ellipsis`, oma `line-height` |
| Sijaluku | 7 px → 3,5 px | 5,8 px + `margin-left` |
| Kielirivi | `flex-wrap: wrap`, `white-space: normal`, 7,5 px → wrap, normal, 3,75 px | `nowrap`, ellipsis, 6,2 px + `.tervehdys { display: inline }` + `.tervehdys img { display: inline }` + `.tervehdys-osuus/.fokus-kieli-tarkenne { font-size: 1em }` |
| Kielirivin lippu | 9 px → 4,5 px | 6 px |
| Alleviivaus | koko leveys → koko leveys | `width: calc(100% - 15px)` |
| Rivien väli | `gap: 2px 6px` → 1px 3px | 0,5px 2px |
| Sisuksen pehmuste | `padding: 6px 8px` → 4px 4,5px | `inset: 4px; padding: 1px` |
| Otsakkeen pehmuste | 22 px → 11 px | 15 px |
| Plus-nappi | 28 × 28 px, merkki 11 × 2 px → 14 × 14, 5,5 × 1 | 18 × 18, merkki 7 × 1,4 |
| Kortin pyöristys | `border-radius: 5px` → 2,5 px | 0 |
| **Lisää-valikko** | tumma `--overlay-card`, `1px solid --overlay-line`, radius 5 px, leveys 210 px, rivit 10 px → kaikki × 0,5, värit ennallaan | kerma, CSS-kaksoisviiva `outline`illa, radius 0, leveys 160 px, rivit 9 px |

`MAAPANEELIN_SKAALA_MIN` (0,45) ja `MAAPANEELIN_SKAALA_MAX` (3) ovat ennallaan
— niihin ei koskettu missään vaiheessa.

### 0c. Kolme kohtaa, joissa alkuperäistä arvoa ei voinut kopioida sellaisenaan

Nämä on kirjattu erikseen, koska ne eivät ole suoria puolikkaita:

1. **`.maapaneeli-sisus` pystypehmuste 4 px eikä 3,5 px.** Alkuperäinen sisus
   alkoi 6 px pehmusteen + 1 px reunuksen päästä eli 7 px kortin reunasta;
   puolikas olisi 3,5 px. Kehyksen syvyys on ohut + väli + paksu = 0,49 +
   1,35 + 1,9 = **3,74 px**, joten teksti olisi mennyt kehyksen alle.
   Pystypehmuste on siis 4 px — **+0,26 px**, ja se on kehyksen (kohta 3)
   vaatima. Vaakapehmuste 4,5 px on tarkka puolikas (8 + 1 = 9 → 4,5) ja
   riittää kehykselle sellaisenaan.
2. **`.maapaneeli-alarivi { font-size: 8px }` on uusi rivi, ei uusi tyyli.**
   Rivillä ei ollut omaa fonttikokoa, joten se peri kortin 16 px:n koon ja sen
   rivilaatikko oli MITATTUNA 18,4 px korkea. Peritty koko ei ole paneelin oma
   luku eikä olisi puolittunut muiden mukana, jolloin rivi olisi vienyt
   puolikkaalla kortilla kaksinkertaisen osuuden korkeudesta. 8 px × 1,15 =
   9,2 px on täsmälleen puolet alkuperäisestä rivilaatikosta.
3. **Musteiden sävyt.** Kartussin pohja on kermaa (kohta 2), eivätkä tummalle
   pohjalle tehdyt musteet näy vaalealla (`--ink-light` kermalla 1,1:1).
   Sävyt vaihtuvat SAMAN paletin vaalean pohjan vastineisiin roolista
   tinkimättä: `--accent` → `--accent-dark` (otsikko ja plus pysyvät okrana),
   `--ink-light` → `--map-ink` (luvut pysyvät musteena), `--muted` →
   `--map-ink-soft` (pikkuotsikot pysyvät vaimeina). Alleviivaus jää
   `--overlay-lineksi`, se näkyy kermalla sellaisenaan. Uusia värejä ei ole.

---

## 1. Selvitys: mitä 1860–1880-luvun atlaksissa oikeasti tehtiin

Sanallisia lähteitä kartografian sanastoista löytyy, mutta ne antavat vain
adjektiiveja ("thin line that defines the border of most maps") eivätkä yhtään
mittaa — tarkistettu Boston Rare Mapsin, Art Source Internationalin,
mapsandart.comin ja Esri GIS Dictionaryn sanastoista sekä Library of Congressin
ja The Cartographic Instituten väritysartikkeleista (linkit lopussa). Siksi
**mitat mitattiin itse** aikakauden arkeilta pikselitasolla.

**Menetelmä.** David Rumsey Map Collectionin IIIF-palvelimelta haettiin arkit
täydellä tarkkuudella (`/full/…/0/default.png`, 1:1, ei uudelleenskaalausta).
Arkin fyysinen koko on luettelotiedoissa, joten px/mm on tiedossa. Kustakin
viivasta luettiin harmaasävyprofiili poikki viivan ja juovan reunat
puolikorkeudella (paperi ≈ 225, muste ≈ 55, kynnys niiden keskiarvo),
osapikselin tarkkuudella lineaarisella interpoloinnilla. Jokainen luku alla on
satojen rinnakkaisten profiilien mediaani, ja keskihajonta on mukana.

### 1a. Kehyksen kaksoisviiva — OHUT ULKONA, PAKSU SISÄLLÄ

| Lähde | ulompi ohut | väli | sisempi paksu | paksu : väli : ohut |
|---|---|---|---|---|
| **Stieler 1874** (36,35 px/mm), 404 mittausta 900 px:n matkalta | 7,78 px = **0,214 mm** (sd 0,51) | 21,56 px = **0,593 mm** (sd 0,73) | 30,14 px = **0,829 mm** (sd 0,48) | 1 : 0,72 : 0,26 |
| **Johnston 1879** (20,65 px/mm), 399 mittausta 800 px:n matkalta | 1,89 px = **0,092 mm** (sd 0,22) | 8,66 px = **0,419 mm** (sd 0,45) | 12,93 px = **0,626 mm** (sd 0,60) | 1 : 0,67 : 0,15 |

Kaksi eri kaivertajaa, kaksi eri maata, sama järjestys: **ohut viiva on ULKONA,
paksu SISÄLLÄ** — täsmälleen niin kuin omistaja arvasi. Yhteinen suhdeluku on
**väli ≈ 0,7 × paksu viiva**; ohuen suhde paksuun vaihtelee (0,26 / 0,15).
Nurkassa ei ole erikoiskäsittelyä: molemmat viivat kääntyvät terävänä jiirinä,
eikä pyöristystä ole.

Sama arkki antaa myös **kartussin** (sisäkartan ja selitelaatikon) oman
kehyksen. Stielerin 1874 arkin sisäkartta "Der Bosporus und Umgebung", 184
mittausta: **paksu 14,81 px = 0,407 mm**, väli 11,97 px = 0,329 mm, ohut
1,91 px = 0,053 mm — eli väli = 0,81 × paksu, mutta tässä **paksu on ULKONA**.
Kartussin kehyksessä järjestys voi siis olla kumpi tahansa; arkin kehyksessä
(joka on se, mitä omistaja kuvaili) ohut on ulkona molemmilla kustantajilla.
Toteutus noudattaa arkin kehystä eli omistajan omaa esimerkkiä.

### 1b. Mikä tekee jäljestä käsinpiirretyn eikä vektorimaisen

Kolme mitattavaa asiaa, jotka kaikki löytyivät samasta aineistosta:

1. **"Suora" viiva ei ole suora.** Kehysviivan keskilinja vaeltaa:
   Stielerillä keskihajonta 1,91 px = 0,053 mm ja huipusta huippuun 6,8 px =
   0,19 mm 24,8 mm:n matkalla; Johnstonilla 1,24 px = 0,060 mm ja huipusta
   huippuun 4,5 px = 0,22 mm 38,7 mm:n matkalla. Absoluuttiluku ei siirry
   ruudulle, mutta **suhde viivan omaan paksuuteen siirtyy**: heitto huipusta
   huippuun on **0,23 × paksu viiva** (Stieler) ja **0,35 × paksu** (Johnston),
   ja sen aallonpituus on noin **30 × paksu viiva**.
2. **Leveys vaihtelee pituussuunnassa.** Ohut kehysviiva 0,51/7,78 = **6,5 %**,
   paksu 0,48/30,14 = **1,6 %**. Neljä sivua eivät ole keskenään saman
   paksuisia.
3. **Kaksoisviivan väli sen sijaan PYSYY.** Stielerillä välin keskihajonta on
   0,73 px eli **3,4 %** välin leveydestä, vaikka kumpikin viiva vaeltaa
   moninkertaisesti sen verran. Kaivertaja veti molemmat viivat samaa
   viivainta pitkin: viivat vaeltavat YHDESSÄ. Tämä on se yksityiskohta,
   jonka unohtaminen tekee jäljestä vahingon näköisen.

### 1c. Ei tilauksessa: valtionrajan käytännöt (omistaja perui 14.9.)

Tämä osuus mitattiin ennen perumista. Se **ei ohjaa mitään toteutusta**, mutta
se on tallessa, jos asia vielä palaa.

- **Stieler 1874**, Bulgarian/Ottomaanien raja Basardschykin luona: raja on
  hieno **pisteviiva** (pisteen läpimitta 1,5–7 px = 0,04–0,19 mm) ja sen
  **TOISELLA PUOLELLA** vaaleanpunainen käsinvärinauha. 25 kohtisuoraa
  leikkausta: nauhan leveys **18 px = 0,50 mm** (mediaani), keskihajonta
  6,8 px eli **±38 %** — nauha on silminnähden epätasainen ja sen reuna
  vaeltaa. Nauha on rajan yhdellä puolella, ei molemmin puolin.
- **Colton 1874** (16,80 px/mm), Euroopan ja Aasian raja Uralilla: nauha on
  paljon leveämpi, **29,1 px = 1,73 mm** (mediaani 74 poikkileikkauksesta,
  vaihtelu 3–44 px), ja sen keskilinja heittelee 8,5 px = 0,51 mm. Coltonin
  nauhat on vedetty leveällä siveltimellä ja ne "vuotavat" rajaviivan yli.

Yhteenveto: nauha on 5–12 kertaa leveämpi kuin kaiverrettu rajaviiva, se on
rajan yhdellä puolella, ja sen reuna on selvästi epätasainen (leveyden
hajonta 38 %).

### Lähteet

Mitatut arkit (David Rumsey Map Collection / Stanford Libraries, CC BY-NC-SA
3.0; kuvia ei ole kopioitu repoon, vain mitattu):

- Stieler's Hand-Atlas No. 56, *Die Europäische Türkei*, A. Petermann &
  H. Habenicht, Justus Perthes, Gotha 1874. 34 × 44 cm, skannaus
  15 996 × 12 926 px. <https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~333170~90101331>
  (peilikappale: <https://archive.org/details/dr_die-europaische-turkei-von-a-petermann-bearbeitet-v-h-habenicht-stiel-13563077>)
- Keith Johnston's General Atlas, *Europe*, W. & A.K. Johnston, Edinburgh 1879.
  48 × 58 cm, 11 977 × 8 648 px.
  <https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~37085~1210123>
- *Colton's Europe*, G.W. & C.B. Colton & Co., New York 1874. 33 × 41 cm,
  6 886 × 6 228 px (vain luvun 1c mittauksiin).
  <https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~210143~5003882>

Sanalliset taustalähteet (termistö, värityskäytäntö — ei mittoja):

- Esri GIS Dictionary, "neatline": <https://support.esri.com/en-us/gis-dictionary/neatline>
- Boston Rare Maps, "How do I know an antique map or print is real?":
  <https://bostonraremaps.com/is-antique-map-real/>
- Art Source International, Glossary of Terms:
  <https://artsourceinternational.com/map-collecting/map-and-print-collecting-terms/>
- mapsandart.com, Map Terminology: <https://mapsandart.com/map-terminology/>
- Library of Congress, *Adding Color to the World: How Maps Got Toned* (2025):
  <https://blogs.loc.gov/maps/2025/01/adding-color-to-the-world-how-maps-got-toned/>
- The Cartographic Institute, *The Art of Hand Coloring 19th-Century Maps*:
  <https://thecartographicinstitute.com/process-for-hand-coloring-maps-in-the-19th-century/>

**Mikä ei onnistunut:** Wikimedia Commonsin API vastasi HTTP 429 (rate limit)
sekä Nodesta että curlilla, joten aineisto haettiin David Rumseyn omalta
IIIF-palvelimelta ja Internet Archivesta. Ne vastasivat normaalisti.

---

## 2. Valittu tekniikka ja miksi

### Kehys on SVG, ei CSS-reunus

`border` on täsmälleen suora — juuri se vektorimainen jälki, joka piti saada
pois. Kehys on siksi inline-SVG (`.maapaneeli-kehys`), jonka polut lasketaan
**kerran maan vaihtuessa** ja jotka skaalautuvat kortin `transform: scale()`in
mukana tarkkana (CSS-reunuksen leveys olisi pyöristynyt laitepikseliin).

Neljä sivua viivaa kohti (yhteensä 8 polkua), jotta jokainen sivu saa oman
leveytensä kuten kaiverruksessa; horjunta vaimennetaan nollaan sivun päissä
(sin-verho), jolloin **nurkat osuvat tarkalleen yhteen** ja jiiri pysyy
terävänä.

**Horjunta on kolmen harmonisen summa, jonka jaksoluvut ovat kokonaislukuja**
(`js/kasinpiirto.js`). Siitä seuraa, että kehyksen kierros sulkeutuu ilman
saumaa ja että matalin jaksoluku antaa mitatun hitaan vaelluksen.
Perlin/simplex-kohina ei ole jaksollinen (sauma), ja per-kärki-satunnaisuus
antaisi rosoa eikä vaellusta.

**Kaksi viivaa vaeltavat yhdessä** (`KASI_OMA_OSUUS 0,25`): ulompi saa saman
aallon kuin sisempi ja vain 25 % omaa. Mitattu peruste on luvussa 1b (välin
keskihajonta 3,4 %); täysin itsenäisillä aalloilla väli olisi vaihdellut ±45 %,
mikä näyttää vahingolta eikä kaiverrukselta.

**Satunnaisuus on deterministinen.** Siemen on maan ISO-koodi (FNV-1a) ja arpa
mulberry32. Savukkeessa todistettu kahdella tavalla: sama maa antaa saman
kehyspolun kahdella eri sivulatauksella, ja puhdas funktio antaa bitilleen
saman kehyksen kahdella kutsulla.

**Valikko** (`.maapaneeli-valikko`) sai saman kaksoisviivan CSS:llä
(`border` = paksu sisempi, `outline` + `outline-offset` = ohut ulompi, samat
suhteet): sen koko vaihtuu maan mukaan, joten horjuvaa polkua ei voi esilaskea.

### Piirron hinta

Kehys on **8 SVG-polkua kortin sisällä**, ja ne rakennetaan vain maan
vaihtuessa. Selain piirtää ne osana kortin kerrosta, jota se piirtää muutenkin;
zoomatessa kirjoitetaan vain `transform`, ei asettelua. Erillistä piirtoaikaa
ei siis ole mitattavaksi asti — pallon piirtokutsut, kolmiot ja kehysaika ovat
samat kuin ennen erää, koska WebGL-kerrokseen ei koskettu lainkaan.

---

## 3. Mitat: ennen ja jälkeen

### Paneelin koko

| Näkymä | ENNEN | JÄLKEEN | leveys | korkeus | pinta-ala |
|---|---|---|---|---|---|
| Puola, 2560 × 1352 | 379,3 × 295,5 css-px | 217,4 × 169,3 css-px | 57,3 % | 57,3 % | **32,9 %** |
| Puola, 390 × 844 (dpr 2) | 119,0 × 92,7 css-px | 59,5 × 46,3 css-px | 50,0 % | 50,0 % | **25,0 %** |

Paneelin osuus **maan laatikosta** puolittuu tarkalleen: **0,3500 → 0,1750
(50,0 %)**, mitattuna elävästä pelistä molemmilla ruuduilla.

**Miksi leveällä ruudulla ei tasan 50 % ruudulla.** Paneeli on kartan kaluste
(PÄÄTÖKSET 2), ja sen koko on osuus maan laatikosta. Koska saapumisrajaus
ottaa paneelin mukaan laatikkoon, pienempi paneeli tarkoittaa pienempää
laatikkoa ja siten sitä, että **kamera zoomaa maan lähemmäs** — ruudulla
paneeli kutistuu hieman vähemmän kuin puoleen, ja maa kasvaa saman verran.
Puhelimella kameran rajaus ei muutu (korkeus sitoo), ja siellä mitta on
**tasan neljäsosa**.

Toteutus: `MAAPANEELIN_LEVEYS_PX` 190 → 95, `KORKEUS_PX` 148 → 74,
`LEVEYS_OSUUS` 0,35 → 0,175, `KORKEUS_OSUUS` 0,42 → 0,21. Kaikki neljä on
muutettava yhdessä: peruskoko px:nä määrää vain ruutuskaalan ja osuus vain
lautamitan; jompikumpi yksin joko kutistaisi kortin ruudulla ja kasvattaisi sen
kartalla tai päinvastoin. Nyt `perusta` (0,175/95 = 0,35/190) on ennallaan,
samoin `MAAPANEELIN_SKAALA_MIN` (0,45) ja `_MAX` (3).

Puhelimen ABSOLUUTTILUVUT vaihtelevat ajojen välillä (mitattu 167,1 × 130,1 ja
119,0 × 92,7 samalla koodilla): saapumisrajaus päätyy hieman eri korkeuteen sen
mukaan, mitkä laatat ovat ehtineet latautua. SUHDE oli joka ajossa tasan
50,0 % / 25,0 %. Vaihtelu näkyy myös ENNEN-ajossa eikä ole tämän erän
aiheuttama.

### Kehyksen mitat ruudulla

Paksu sisempi **1,9 px**, väli **1,35 px** (0,71 ×), ohut ulompi **0,49 px**
(0,26 ×) — kortin peruskoossa, eli ruudulla kerrottuna skaalalla (0,45–3,0).
Sivukohtainen leveysheitto ±6,5 % (mitattu, luku 1b), mitattu horjunta polkujen
suurimpana poikkeamana suorasta jänteestä **0,18–0,33 px**, eli alle paksun
viivan leveyden joka sivulla.

Suhteet ovat mitatut; itse mittakaava on tarkoituksella liioiteltu — Stielerin
arkilla kehyksen syvyys on 0,37 % arkin leveydestä, mikä 95 px:n kortilla olisi
0,35 px eli näkymätön. Kartussin kehys samalla arkilla on 0,93 % kartussin
leveydestä; meillä 4,0 %.

### Tekstit — alkuperäiset tyylit, puolitettuina

Jokainen fonttikoko on alkuperäinen × 0,5. Mitään ei tiivistetty eikä yhtään
alarajaa lisätty (omistaja hyväksyi tekstin pienuuden).

| | ENNEN | JÄLKEEN (= ENNEN × 0,5) |
|---|---|---|
| Maan nimi | 13 px | 6,5 px |
| Lukurivin arvo | 9,5 px | 4,75 px |
| Alarivin oma nimi | 8,5 px | 4,25 px |
| Alarivin valtiomuoto / kielirivi | 7,5 px | 3,75 px |
| Lukurivin otsikko / sijaluku | 7 px | 3,5 px |
| Kieliosan tarkenne (`.tervehdys-osuus`, 0,78 em) | 5,85 px | **2,925 px** |

**Pienin fonttikoko uudelleen mitattuna palautusten jälkeen:** peruskoossa
**2,925 px** (`.tervehdys-osuus`, maalehden oma 0,78 em kielirivin 3,75 px:stä).
Ruudulla:

| Näkymä | ENNEN | JÄLKEEN |
|---|---|---|
| Puola 2560 × 1352 (skaala 2,00 → 2,29) | 11,68 css-px | **6,69 css-px** |
| Puola 390 × 844, dpr 2 (skaala 0,626) | 3,66 css-px | **1,83 css-px** |
| Lähikuvaruutu 1280 × 720 (skaala 1,01 → 1,15) | 5,88 css-px | **3,37 css-px** |

Luvut ovat tasan puolet entisistä, kuten kaikki muukin. Omistaja tietää
tekstin pienuuden ja sanoi *"julkaise noin"*; en lisännyt fonttikoon alarajaa,
en tiivistänyt sisältöä enkä muuttanut `MAAPANEELIN_SKAALA_MIN`-arvoa.

**Leikkaus on sekin entinen, puolitettuna.** Alkuperäinen kortti leikkaa jo
itse: kielirivi kietoutuu ja Puolan kolme kieltä vuotavat MITATUSTI 5 px yli
(151 px sisältöä 146 px:n tilassa). Puolitettuna ylivuoto on 3 px (77/74) eli
alle puolet entisestä. Savuke vartioi juuri tätä suhdetta — ei sitä, että
kaikki mahtuisi, koska se olisi juuri sitä tiivistämistä, jonka omistaja perui.

### Kontrastit vaaleaa kermaa vasten (`--kerma` #faf4d6)

| Väri | Rooli (sama kuin ennen) | Kontrasti |
|---|---|---|
| `--map-ink` #46331f (ennen `--ink-light`) | luvut, plus-merkin hover | **10,8 : 1** |
| `--accent-dark` #8a6114 (ennen `--accent`) | maan nimi, plus-merkki | **4,99 : 1** |
| `--map-ink-soft` #8a6c46 (ennen `--muted`) | pikkuotsikot, sijaluku, alarivi | **4,40 : 1** |

Heikoin on 4,40 : 1 eli maan oma vaimea muste, sama rooli kuin alkuperäisellä
`--mutedilla`. Se jää WCAG AA:n 4,5:n alle; en nostanut sitä, koska se olisi
ollut uusi tyylivalinta eikä alkuperäisen palautus. Pohjaväri EI ole uusi:
#faf4d6 on pelin oma kerma (`tools/fokuskartta/piirto.js` KERMA ja
`js/laattapyramidi.js`), sama sävy jolla muut maat tasoitetaan (PÄÄTÖKSET 4).
Se vain nostettiin CSS-muuttujaksi `--kerma`.

## 4. Savuke ja vastakoe

`tools/savukkeet/savuke-kasinpiirto.mjs` (uusi). Ajo:

```
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
  node tools/savukkeet/savuke-kasinpiirto.mjs docs/raportit/kuvat
```

**Tulos: 33/33 väitettä läpi (paluuarvo 0).**

Vastakoe ei ole erillinen ajo vaan sama ajo kahdesti: savukkeen oma palvelin
kirjoittaa "ennen"-kierroksella lähdetekstiin takaisin erää edeltäneen tilan
(peruskoot 190×148, osuudet 0,35/0,42, `piirraKehys` pois, entiset tummat
tyylit CSS:n perään). Peliin ei kirjoitettu yhtään savuketta varten tehtyä
kytkintä. Ero numeroina:

| Väite | ENNEN | JÄLKEEN |
|---|---|---|
| Kehyspolkuja kortissa | 0 | **8** (4 ohutta + 4 paksua) |
| Kortin taustan luminanssi | 0,017 | **0,899** |
| Heikoin tekstikontrasti | 1,31 : 1 | **4,40 : 1** |
| Paneelin osuus maan laatikosta | 0,3500 | **0,1750** |
| Paneeli ruudulla (2560 px) | 379,3 × 295,5 css-px | **217,4 × 169,3** |
| Paneeli ruudulla (puhelin) | 119,0 × 92,7 css-px | **59,5 × 46,3** |
| Sisältö / kortin tila (ylivuoto) | 151 / 146 px (5 px) | **77 / 74 px (3 px)** |

Jokainen väite 1–3 kaatuu "ennen"-tilassa, eli ne mittaavat oikeasti tätä erää.
Vastakokeen ENNEN-tyylit ovat täsmälleen `origin/mainin` arvot, joten jos joku
myöhemmin "korjaa" jonkin paneelin luvun muuksi kuin alkuperäisen puolikkaaksi,
koko- ja ylivuotoväitteet kaatuvat.

### Kuvat

`docs/raportit/kuvat/` — ENNEN/JÄLKEEN-pareina samasta kuvaikkunasta:

- `docs/raportit/kuvat/kasinpiirto-puola-levea-ennen.png` / `-jalkeen.png`
  (2560 × 1352, sama näkymä kuin omistajan kuvakaappauksessa)
- `docs/raportit/kuvat/kasinpiirto-puola-puhelin-ennen.png` / `-jalkeen.png`
  (390 × 844, dpr 2)
- `docs/raportit/kuvat/kasinpiirto-lahikuva-kehys-ennen.png` / `-jalkeen.png`
  (kortin vasen ylänurkka — kaksoisviivan ja jiirinurkan näkee tästä)

Kaikki kuusi on kaapattu UUDELLEEN palautusten jälkeen.

Lähikuvat ovat omasta ajostaan (1280 × 720, laitepikselisuhde **4**):
kaksoisviiva on ruudulla yhteensä noin neljä css-pikseliä, eikä 1:1-kaappaus
näytä paksua ja ohutta erikseen.

Saapumisen iso kuva (`.fokusvirta-isokuva`, isoisän paperikuva) on piilotettu
kuvista tyylillä: se peitti mitatusti koko yläruudun eikä kuulu tähän erään.
Mittauksiin se ei vaikuta.

---

## 5. Portit

| Portti | Tulos |
|---|---|
| `npm test` | **# pass 3354, # fail 0** |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | niputus kunnossa, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | savukkeet kunnossa |
| `grep -rn '^<<<<<<<' js css tests tools` | ei osumia |

---

## 6. Mitä EI tehty

- **Maan ääriviivaan ei koskettu.** Omistaja perui sen 14.9.2026; kartan
  punainen raja on rivilleen sama kuin `origin/main`issa.
- **Typografiaa, värirooleja, asettelua, sisältöä eikä Lisää-valikkoa ei
  muutettu.** Ne ovat alkuperäisiä, vain kerrottuna 0,5:llä (luku 0b).
- **Fonttikoon alarajaa ei lisätty, sisältöä ei tiivistetty,
  `MAAPANEELIN_SKAALA_MIN`-arvoa ei muutettu** — omistaja hyväksyi tekstin
  pienuuden sanoilla *"julkaise noin"*.
- **Värinauhaa (border wash) ei toteutettu.** Mitat ovat luvussa 1c talteen
  kirjattuina, jos asia palaa.
- **Viivan leveyden vaihtelu pituussuunnassa** toteutettiin sivukohtaisena
  (±6,5 %), ei yhden sivun sisällä muuttuvana.
- **Paneelin sijaintia ei muutettu** — se on yhä kiinteästi maan laatikon
  eteläreunan alapuolella (PÄÄTÖKSET 6).
- **Tasoituskerrokseen, laattapolkuihin, kameraan tai `js/ui.js`:n
  matkareittien valintaan ei koskettu.**
- **Versiota ei nostettu**, `tools/uusi-versio.mjs` ei ajettu.
- Raamattuun ei kirjoitettu mitään.

### Avoimet havainnot Fablelle

1. **Paneelin osuus ruudusta ei ole vakio.** Koska saapumisrajaus ottaa
   paneelin mukaan laatikkoon, paneelin koon muutos muuttaa myös kameran
   rajausta. Jos omistaja haluaa tasan neljäsosan myös leveällä ruudulla, se
   vaatii kameran rajauksen irrottamisen paneelista — oma päätöksensä.
2. **Heikoin tekstikontrasti on 4,40 : 1** (`--map-ink-soft` kermalla), eli
   juuri WCAG AA:n alle. Sävy on alkuperäisen `--mutedin` vaalean pohjan
   vastine; sen tummentaminen olisi ollut uusi tyylivalinta.
3. **Puhelimen pienin teksti on uloimmalla zoomilla 1,83 css-px**
   (`.tervehdys-osuus`, maalehden 0,78 em kielirivin 3,75 px:stä). Tämä on
   alkuperäisen 3,66 css-px:n puolikas. `MAAPANEELIN_SKAALA_MIN` on säädin,
   jos omistaja joskus haluaa lattian ylemmäs.
4. **Kortti leikkaa kolmikielisen maan viimeisen kielirivin** (ylivuoto 3 px).
   Sama tapahtui alkuperäisellä kortilla (5 px).

---

## 7. Muuttuneet tiedostot

| Tiedosto | Muutos |
|---|---|
| `js/kasinpiirto.js` | **uusi, kohta 3** — mitatut suhdeluvut, deterministinen aalto, kehyspolut |
| `js/pallolauta/maapaneeli.js` | **kohta 1** peruskoot ja osuudet puoleen · **kohta 3** SVG-solmu, `piirraKehys` ja `kasikehys`-tuonti. Muu sisältö ennallaan, sijaluku ladotaan kortille kuten ennen |
| `css/styles.css` | **kohta 1** kaikki pituudet × 0,5 · **kohta 2** `--kerma` paletiksi, pohja kermaksi ja musteiden pakolliset vaalean pohjan vastineet · **kohta 3** `border` → `.maapaneeli-kehys` |
| `sw.js` | **kohta 3** — `js/kasinpiirto.js` SHELLiin (uusi moduuli on oltava offline-korissa) |
| `tools/savukkeet/savuke-kasinpiirto.mjs` | **uusi** — vartioi kaikkia kolmea kohtaa, vastakoe palauttaa `origin/mainin` arvot |
| `docs/raportit/kuvat/kasinpiirto-*.png` | 6 kuvaa (3 ennen/jälkeen-paria) — erän näyttö omistajalle |
| `docs/raportit/viesti-fable-kasinpiirto-20260914.md` | tämä raportti |

**Rajan piirtoon liittyviä tiedostoja ei ole listalla.** `js/pallovektorit.js`,
`js/maanaariviivat.js`, `js/maatummennus.js`, `js/pallolauta/lauta.js` ja
`tests/maakorostus.test.mjs` ovat kaikki ennallaan.
