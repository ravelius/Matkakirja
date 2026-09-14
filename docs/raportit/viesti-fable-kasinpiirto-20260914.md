# Viesti Fablelle: maapaneeli neljäsosaan ja sen kehys käsinpiirretyksi

**Erä:** karttauudistus erä 11 (Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 7)
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

**RAJAUS SAMANA PÄIVÄNÄ** (omistaja, sanatarkasti): *"ei tehda maan
aariviivaan kaksoisviivaa. eli keskeyta koko maa aariviiva projekti. pidetaan
se vain sen maa infopalikan piirtamiseen."* Kartan punainen maan raja jää siis
**täysin ennalleen**, ja kaksoisviiva koskee vain maapaneelin kehystä.

---

## 0. Mitä jouduin palauttamaan

Rajan kaksoisviiva oli ehtinyt valmiiksi ennen perumista. Palautettu
kokonaan:

- `js/pallovektorit.js` — `korostusOhut`-materiaali ja -olio, `kasinpiirronMitat`,
  tiheyskynnys rajan uudelleenrakennukselle. **Palautettu `git checkout`illa,
  tiedosto on bitilleen sama kuin `origin/main`issa.**
- `tests/maakorostus.test.mjs` — kaksoisviivan mukaan päivitetty lähdetekstiväite.
  **Palautettu, tiedosto on ennallaan.**
- `js/kasinpiirto.js` — rengaspari (`kasirengas`, `kasirenkaat`) ja sen
  suhdelukujen muunnos asteiksi poistettu moduulista. Jäljellä on vain kehys.
- Savukkeesta poistettu rajan väitteet, Norjan ja Italian kaappaukset,
  rajaviivan lähikuva ja piirtoajan mittaus.
- `docs/raportit/kuvat/` — Norjan, Italian ja rajaviivan kuvat poistettu, ei
  committoitu.

`js/maanaariviivat.js`, `js/maatummennus.js` ja `js/pallolauta/lauta.js` eivät
ole koko erän aikana olleet muutettuina. Vahvistus lopussa (luku 7).

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
kartalla tai päinvastoin. Nyt `perusta` (0,175/95 = 0,35/190) on ennallaan.

Puhelimen ABSOLUUTTILUVUT vaihtelevat ajojen välillä (mitattu 167,1 × 130,1 ja
119,0 × 92,7 samalla koodilla): saapumisrajaus päätyy hieman eri korkeuteen sen
mukaan, mitkä laatat ovat ehtineet latautua. SUHDE oli joka ajossa tasan
50,0 % / 25,0 %. Vaihtelu näkyy myös ENNEN-ajossa eikä ole tämän erän
aiheuttama.

### Kehyksen mitat ruudulla

Paksu sisempi **1,9 px**, väli **1,35 px** (0,71 ×), ohut ulompi **0,49 px**
(0,26 ×) — kortin peruskoossa, eli ruudulla kerrottuna skaalalla (0,45–3,0).
Sivukohtainen leveysheitto ±6,5 % (mitattu, luku 1b), mitattu horjunta polkujen
suurimpana poikkeamana suorasta jänteestä **0,18–0,33 px**,
eli alle paksun viivan leveyden joka sivulla.

Suhteet ovat mitatut; itse mittakaava on tarkoituksella liioiteltu — Stielerin
arkilla kehyksen syvyys on 0,37 % arkin leveydestä, mikä 95 px:n kortilla olisi
0,35 px eli näkymätön. Kartussin kehys samalla arkilla on 0,93 % kartussin
leveydestä; meillä 4,0 %.

### Tekstit

| | ENNEN | JÄLKEEN |
|---|---|---|
| Pienin fontti PERUSKOOSSA | 7,0 px (`.maapaneeli-otsikko`) | **5,8 px** (sama) |
| Pienin fontti ruudulla, Puola 2560 px | 13,97 css-px | **13,27 css-px** |
| Pienin fontti ruudulla, puhelin 390 px | 4,38 css-px | **3,63 css-px** |
| Heikoin tekstikontrasti | 1,31 : 1 | **4,99 : 1** |

Peruskoko putosi 7,0 → 5,8 px eli 17 %, vaikka kortti kutistui 50 %
molemmista mitoistaan. Loppu tehtiin TIIVISTÄMÄLLÄ ESITYSTAPAA, ei fonttia:

- **Sijaluku pois kortilta** (tehtävänannon oma ehdotus). Arvopalstalle jää
  48 px, ja pisimmät rivit sijalukuineen ovat MITATTUNA 53–58 px: sijaluku oli
  joko jätettävä pois tai katkaistava keskeltä lukua. Luku on nyt rivin
  `title`issä ja kokonaisuudessaan maalehdessä.
- **Kielirivi ei enää kietoudu** vaan katkeaa kolmella pisteellä. Kortin
  korkeus on nyt sen tiukin mitta, ja kietoutunut rivi jäi kokonaan
  leikkauksen alle.
- **Rivilaatikot 1,15 → 1,05** ja otsikon kirjainvälistys 0,09 em → 0.
  Välistys vei MITATUSTI 3,8 px "DEMOKRATIA"-rivin leveydestä.
- **Alariville oma fonttikoko.** Se peri kortin 16 px:n koon, jolloin sen
  rivilaatikko oli MITATTUNA 18,4 px korkea 6 px:n tekstille — neljäsosa koko
  kortin korkeudesta hukkaan.
- **Kieliosat samankokoisiksi.** Maalehden `.tervehdys-osuus` ja
  `.fokus-kieli-tarkenne` ovat 0,78 em, mikä kartussissa olisi ollut 4,84 px
  peruskokoa.
- **Kielirivin lippu inline-kuvaksi.** Maalehden `.tervehdys img` on
  `display: block`, ja lohkotason lippu pakotti rivinvaihdon keskelle
  kielilistaa — lippu putosi omalle rivilleen ja jäi leikkauksen alle.

Mitattu lopputulos: koko sisältö (otsake, kartussin alarivi, viisi lukuriviä
kielirivi mukaan lukien) mahtuu 87 × 66 px:n sisukseen ilman leikkausta —
`scrollHeight` 66 = `clientHeight` 66. Savuke vartioi tätä omana väitteenään.

**Puhelimen pienin luku on tämän erän heikoin kohta ja se on kirjattava
sellaisenaan.** Se on uloimman zoomin luku, ja se vaihtelee saapumisrajauksen
mukana: mitattu 3,63 css-px (skaala 0,626) ja 5,10 css-px (skaala 0,879).
ENNEN-luvut samoilla rajauksilla olivat 4,38 ja 5,14 css-px, eli suhteellinen
muutos on −17 % kuten peruskoossakin. Paneelin luo pannataan ja zoomataan
(PÄÄTÖKSET 2), jolloin skaala nousee 3,0:aan asti. Jos omistaja haluaa lattian
ylemmäs, säädin on `MAAPANEELIN_SKAALA_MIN` (nyt 0,45) — sitä EI nostettu
tässä erässä, koska se kasvattaisi paneelia uloimmalla zoomilla eli juuri
siinä näkymässä, jota omistaja pyysi pienentämään.

### Kontrastit vaaleaa kermaa vasten (`--kerma` #faf4d6)

| Väri | Käyttö | Kontrasti |
|---|---|---|
| `--map-ink` #46331f | maan nimi, luvut, plus-merkki | **10,8 : 1** |
| `--accent-dark` #8a6114 | pikkuotsikot, alarivi | **4,99 : 1** |

Kaikki ≥ 4,5 : 1 (WCAG AA normaalille tekstille). `--map-ink-soft` (#8a6c46)
olisi jäänyt 4,40 : 1 eikä sitä käytetä. Pohjaväri EI ole uusi: #faf4d6 on
pelin oma kerma (`tools/fokuskartta/piirto.js` KERMA ja
`js/laattapyramidi.js`), sama sävy jolla muut maat tasoitetaan
(PÄÄTÖKSET 4). Se vain nostettiin CSS-muuttujaksi `--kerma`.

---

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
| Heikoin tekstikontrasti | 1,31 : 1 | **4,99 : 1** |
| Paneelin osuus maan laatikosta | 0,3500 | **0,1750** |
| Sisällön korkeus / kortin tila | 146 / 146 px | **66 / 66 px** |

Jokainen väite 1–3 kaatuu "ennen"-tilassa, eli ne mittaavat oikeasti tätä erää.

### Kuvat

`docs/raportit/kuvat/` — ENNEN/JÄLKEEN-pareina samasta kuvaikkunasta:

- `kasinpiirto-puola-levea-ennen.png` / `-jalkeen.png` (2560 × 1352, sama
  näkymä kuin omistajan kuvakaappauksessa)
- `kasinpiirto-puola-puhelin-ennen.png` / `-jalkeen.png` (390 × 844, dpr 2)
- `kasinpiirto-lahikuva-kehys-ennen.png` / `-jalkeen.png` (kortin vasen
  ylänurkka — kaksoisviivan ja jiirinurkan näkee tästä)

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
| `npm test` | **# pass 3354, # fail 0** (main mergettyna) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | niputus kunnossa, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | savukkeet kunnossa |
| `grep -rn '^<<<<<<<' js css tests tools` | ei osumia |

---

## 6. Mitä EI tehty

- **Maan ääriviivaan ei koskettu.** Omistaja perui sen 14.9.2026; kartan
  punainen raja on rivilleen sama kuin `origin/main`issa.
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
2. **Lisää-valikko on nyt kortin kokoon nähden iso** (160 px vs. kortin 95 px
   peruskoko). Valikon tekstin oli pakko pysyä luettavana (9 px), joten sitä ei
   kutistettu kortin mukana.
3. **Puhelimen pienin teksti on uloimmalla zoomilla 3,6–5,1 css-px**
   saapumisrajauksesta riippuen. `MAAPANEELIN_SKAALA_MIN` on säädin, jos
   omistaja haluaa lattian ylemmäs.
4. **Sijaluku ei enää näy kortilla** (vain `title`issä ja maalehdessä). Jos
   omistaja kaipaa sitä, kortti tarvitsee joko lisää leveyttä tai lyhyemmät
   otsikot.

---

## 7. Muuttuneet tiedostot

| Tiedosto | Muutos |
|---|---|
| `js/kasinpiirto.js` | **uusi** — mitatut suhdeluvut, deterministinen aalto, kehyspolut |
| `js/pallolauta/maapaneeli.js` | peruskoot ja osuudet puoleen, SVG-kehyksen piirto maan vaihtuessa, sijaluku `title`iin |
| `css/styles.css` | `--kerma` paletiksi, kartussin vaalea asu ja uudet mitat, valikon kaksoisviiva |
| `sw.js` | `js/kasinpiirto.js` SHELLiin |
| `tools/savukkeet/savuke-kasinpiirto.mjs` | **uusi** savuke vastakokeineen |
| `docs/raportit/kuvat/kasinpiirto-*.png` | 6 kuvaa (3 ennen/jälkeen-paria) |

**Rajan piirtoon liittyviä tiedostoja ei ole listalla.** `js/pallovektorit.js`,
`js/maanaariviivat.js`, `js/maatummennus.js`, `js/pallolauta/lauta.js` ja
`tests/maakorostus.test.mjs` ovat kaikki ennallaan.
