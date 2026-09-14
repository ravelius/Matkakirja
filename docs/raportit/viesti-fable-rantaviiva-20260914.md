# Punainen raja ja poltettu rantaviiva — selvitys, mittaus ja polttosuunnitelma

*Opus-työagentti Fablelle 14.9.2026. Haara
`claude/bold-ride-vow4ki-rantaviiva`. Omistajan havainto (Kreikan
saapumisnäkymä, kuvakaappaus 14.9.2026 klo 16.10 UTC): **"miksi punainen
rajaviiva ei myötäile kartan rajoja kaikkialla?"** — Egeanmeren saarilla
poltettu maa ja elävä punainen ääriviiva ovat eri mieltä, ja osalla
saarista on vain ääriviiva ilman poltettua maata.*

**Tämä on selvitys ja suunnitelma, ei laattojen poltto.** R2:een ei ole
viety mitään, `pyramidi.json`iin ei ole koskettu, versiota ei ole
nostettu.

## 0. Lyhyesti

**Punainen raja ja poltettu rantaviiva EIVÄT ole eri mieltä geometriasta
— ne ovat samaa Natural Earthin 10m-aineistoa 0,03 lautayksikön
tarkkuudella.** Vika on kolmannessa kerroksessa: **pohjalaatan maa/meri-
täyttö on poltettu 7.9.2026 VANHALLA säännöllä** (ETOPO 3′ nollakäyrä +
merimaski), ja se sääntö poistettiin koodista 13.9.2026. Nykyinen koodi
polttaisi maan täsmälleen samasta vektorista kuin rantaviivan.

Toisin sanoen: **korjaus ei ole koodikorjaus vaan uudelleenpoltto.**

## 1. Lähteet — tiedosto ja rivi

| kerros | mitä | aineisto | harvennus | tiedosto:rivi |
| --- | --- | --- | --- | --- |
| **poltettu MAA/MERI** (pohjalaatta) | maan täyttö | `ne_10m_ocean` renkaat | 0,006° | `tools/fokuskartta/maailma.mjs:183` `meriRenkaat` → `tools/fokuskartta/maailmapiirto.js:829` `RENKAAT` / `:953` `merenAlallaRivilla` |
| **poltettu RANTAVIIVA** (rantataso, oma pyramidi) | rannan muste | sama `ne_10m_ocean`, samat renkaat | 0,006° | `tools/fokuskartta/maailma.mjs:245` `rannikot` → `tools/generoi-laattapyramidi.mjs:1250` `rantaViivat` |
| **PUNAINEN RAJA** (elävä) | pelaajan maan ääriviiva | `assets/data/maapolygonit.json` = `ne_10m_admin_0_countries` + Douglas–Peucker 0,2 yks. | 10m, DP 0,2 | `js/maanaariviivat.js:61` `lataaMaapolygonit` → `js/pallovektorit.js:1203` `korostaMaa` |
| **harmaa ääriviiva ilman täyttöä** | pallon vektorirannikko | `ne_10m_ocean`, laji `rannikko` | 0,006° | `js/pallovektorit.js:307`, aineisto `tools/tee-pallovektorit.mjs:70` (`meriRenkaat` + `rannikotRenkaista`) |
| **kerman reuna** (tasoituslaatat) | leikkuri | `assets/data/maapolygonit.json` | sama kuin punainen raja | `tools/generoi-laattapyramidi.mjs:1070` |

Kaksi asiaa kannattaa lukea tuosta taulukosta:

1. **Rantaviiva, maa/meri-täyttö ja harmaa vektoriviiva ovat KAIKKI
   `ne_10m_ocean` samalla 0,006 asteen harvennuksella.** Ne eivät voi
   erota toisistaan — jos ne on poltettu samalla koodilla.
2. **Punainen raja ja tasoituslaattojen kerman reuna ovat KAIKKI
   `maapolygonit.json`.** Nekään eivät voi erota toisistaan.

## 2. Ovatko kaksi lähdettä eri mieltä? Eivät — 0,03 lautayksikköä

Mitattu ohjelmallisesti (`ne_10m_ocean` 0,006 vs. `maapolygonit.json`
laudan Miller-yksiköissä; kunkin punaisen rajan kärkipisteen etäisyys
lähimpään meripolygonin reunaan):

| alue | pisteitä | mediaani | p95 | max | mediaani km |
| --- | ---: | ---: | ---: | ---: | ---: |
| FRA Bretagne | 476 | 0,03 | 0,07 | 0,23 | 0,06 |
| FRA Normandia | 131 | 0,03 | 0,06 | 0,23 | 0,06 |
| FRA Gironde | 58 | 0,03 | 0,08 | 0,10 | 0,06 |
| FRA Korsika | 176 | 0,03 | 0,11 | 0,21 | 0,07 |
| GRC Kyklades | 323 | 0,03 | 0,10 | 0,23 | 0,08 |
| GRC Syros | 17 | 0,03 | 0,13 | 0,13 | 0,09 |

(Lautayksikkö ≈ 3,34 km päiväntasaajalla. Suuremmat maksimit koko
Kreikan ja Ranskan laatikoissa ovat MAARAJOJA, eivät rannikkoa — ne
eivät kuulu tähän vertailuun.)

**Johtopäätös: mediaanivirhe 0,03 yksikköä on yksinkertaistuksen oma
toleranssi (DP 0,2) eikä aineistojen ero.** Syyllistä ei löydy
lähteistä.

## 3. Missä vika oikeasti on: pohjalaatat on poltettu vanhalla säännöllä

Elävä luettelo (`https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json`,
haettu 14.9.2026):

```
versio        2026-09-07a          <- POHJA
rantataso     2026-09-07a-ranta
viivataso     2026-09-08a-viivat
nostotaso     2026-09-08a-nostot
varitasot     2026-09-14-tasoitus  (FRA, GRC, 27 maata)
```

`tools/fokuskartta/maailmapiirto.js` — yleislehden ja laattapyramidin
moottori — **syntyi vasta 13.9.2026** (`23e05bd5`), ja sen mukana tuli
osio *"MAA VAI MERI: VEKTORI ON AUKTORITEETTI"*. Ennen sitä maa ja meri
erotettiin korkeusruudukosta:

```
vesi = ETOPO 3′ (0,05° ≈ 5,5 km) < 0  JA  piste ne_10m_ocean-maskissa (dilaatio 1)
```

**Pohja on siis poltettu 7.9. eli kuusi päivää ennen korjausta, ja
elävässä pelissä on yhä se poltto.** Moottorin oma dokumentaatio
kirjaa ennen korjausta mitatun virheen (Egeanmeri z7 5,5 px, vuoto 21
px; *"9 saarta 29:stä jäi kokonaan ilman maaväriä: pelkkä ääriviiva
meren päällä"*) — se on sanatarkasti omistajan havainto.

### Miksi näkyy "ääriviiva ilman maata"

Kolme kerrosta kolmesta eri ajasta ovat päällekkäin:

- **pohja (7.9.)** maalaa saaren MERENÄ, koska 5,5 km:n ruudukko ei näe sitä,
- **rantataso (7.9.)** piirtää saaren ääriviivan täydellä 10m-tarkkuudella,
- **punainen raja (elävä)** ja **tasoituskerma (14.9.)** leikkaavat saaren
  reiäksi `maapolygonit.json`in mukaan.

Lopputulos ruudulla: **ääriviiva meren päällä**, ja punainen raja
kulkee sen vierestä.

## 4. Mitattu ero: vanha sääntö vs. vektori

Sama ETOPO 3′ -aineisto ja sama merimaski kuin tuotannossa, verrattuna
meripolygonin omaan rajaan.

### 4.1 Pinta-ala ja kaistat

| alue | eri luokiteltu | maa→meri | meri→maa | levein kaista |
| --- | ---: | ---: | ---: | ---: |
| Kyklades (GRC) | 4,1 % | 255 km² | 1 275 km² | 16,7 km |
| Egeanmeri (GRC) | 3,8 % | 1 692 km² | 8 365 km² | 35,3 km |
| Bretagne (FRA) | 3,1 % | 109 km² | 1 782 km² | 19,5 km |
| Normandia (FRA) | 2,4 % | 36 km² | 880 km² | 23,7 km |
| Gironde (FRA) | 5,2 % | 63 km² | 756 km² | 16,5 km |
| Korsika (FRA) | 2,5 % | 87 km² | 462 km² | 10,1 km |
| Riviera (FRA) | 2,3 % | 952 km² | 364 km² | 37,8 km |

### 4.2 Punaisen rajan etäisyys poltettuun rantaan

| alue | pisteitä | med (yks) | p95 | max | med km | max km | punaisen rajan pisteitä meressä |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Kyklades (GRC) | 333 | 0,35 | 1,18 | 2,86 | 0,94 | 7,6 | **33 %** |
| Egeanmeri (GRC) | 1 728 | 0,44 | 1,65 | 12,39 | 1,15 | 32,6 | 31 % |
| Attika (GRC) | 200 | 0,62 | 1,97 | 4,25 | 1,63 | 11,2 | 13 % |
| Bretagne (FRA) | 476 | 0,91 | 4,47 | 9,13 | 2,03 | 20,4 | **15 %** |
| Normandia (FRA) | 131 | 0,95 | 5,62 | 10,86 | 2,07 | 23,7 | 11 % |
| Gironde (FRA) | 68 | 1,07 | 8,81 | 11,18 | 2,52 | 26,3 | 16 % |
| Korsika (FRA) | 176 | 0,39 | 1,28 | 2,54 | 0,96 | 6,3 | 32 % |
| Riviera (FRA) | 192 | 0,56 | 2,73 | 4,66 | 1,36 | 11,4 | 54 % |

**Ranskassa mediaanivirhe on noin KAKSINKERTAINEN Kreikkaan nähden**
(0,9–1,1 vs. 0,35–0,44 lautayksikköä) ja maksimi suurempi (9–11 vs.
2,9 Kykladeilla). Ero ei ole siis saaristoilmiö — se on kaikkialla, ja
pilottimaa Ranska on siitä pahempi puoli.

### 4.3 Saaret, joilla on ääriviiva mutta ei maata

Meripolygonista johdetut saaret (= juuri se, minkä rantataso piirtää):

| alue | saaria | KOKONAAN ilman poltettua maata | saariala | poltettu merenä |
| --- | ---: | ---: | ---: | ---: |
| Egeanmeri | 93 | **20 (22 %)** | 23 082 km² | 1 368 km² (6 %) |
| Kyklades | 27 | 1 (4 %) | 2 769 km² | 258 km² (9 %) |
| Bretagne + Kanaali | 8 | **4 (50 %)** | 296 km² | 39 km² (13 %) |
| Ranskan Välimeri | 18 | **8 (44 %)** | 8 833 km² | 150 km² (2 %) |

Tämä on omistajan havainnon luku: **Egeanmerellä joka viides saari on
kartalla pelkkä ääriviiva.**

### 4.4 Ruutupikseleinä saapumisnäkymässä

Mitattu ajossa olevasta pelistä (Playwright, Chromium
`/opt/pw-browsers/chromium`; px/lautayksikkö pallon pinnalta kameran
keskipisteessä):

| näkymä | px / lautayksikkö | mediaanivirhe | maksimivirhe |
| --- | ---: | ---: | ---: |
| Kreikka 390 × 844 | 1,07–1,23 | 0,4–0,5 css px | 3,1–15 css px |
| Kreikka 1400 × 900 | *ei mitattu levossa* | — | — |
| Ranska 390 × 844 | 0,66 | 0,6 css px | 6,0 css px |
| Ranska 1400 × 900 | 1,71–1,83 | 1,7 css px | **16,7 css px** |

Zoomatessa luvut kaksinkertaistuvat joka tasolla; z8:lla (14,4 px/yksikkö) Bretagnen
maksimi on 9,13 × 14,4 ≈ **131 px**.

**Kuvat:** `docs/raportit/kuvat/kreikka-saapumisnakyma-390.jpg`,
`docs/raportit/kuvat/kreikka-saaret-ilman-maata.jpg` (2,5× Kykladeille;
Rodos, Karpathos ja Kykladien pikkusaaret punaisena ääriviivana ilman
maaväriä).

## 5. Suunnitelma: pienin korjaus

**Koodiin ei tarvita mitään.** Nykyinen `origin/main` (d79e2216) polttaa
maan jo samasta vektorista kuin rantaviivan. Tarvitaan vain uusi poltto.

### 5.1 Mitkä tasot poltetaan uudelleen

| taso | poltetaanko | miksi |
| --- | --- | --- |
| **pohja** (`versio`) | **KYLLÄ** | tässä on koko vika |
| rantataso | ei | vektoripohjainen jo 7.9., ei muutu |
| viivataso | ei | rajat ja reitit, ei maa/meri-riippuvuutta |
| tasoituskerros (väritasot) | ei | pelkkää geometriaa `maapolygonit.json`ista, 14.9. ajettu |
| nostotaso | *erikseen, ks. 5.4* | merkkiportin polttovelka |

### 5.2 Laattamäärät ja kesto

Mitattu paikallisesti (yksi prosessi, `0,18–0,22 Mpx/s` tässä kontissa;
Mac Studiolla dokumentoitu 1,39 Mpx/s):

| laajuus | laattoja z0–z8 | Mpx | ~kesto @1,39 Mpx/s |
| --- | ---: | ---: | ---: |
| **Ranska, maan laatikko** (−5,2…9,6 / 41,3…51,1) | **269** | 71 | **~1 min** |
| Ranska, värilaatikko ×1,15 | 1 203 | 315 | ~4 min |
| Kreikka, maan laatikko | 111 | 29 | ~0,5 min |
| koko maailma | 92 968 | 24 400 | ~4,9 h (sharditettuna ~1 h) |

Pilotiksi **Ranska on minuutin ajo**. Koko maailma on sama työ kuin
7.9. eli olemassa oleva työnkulku.

### 5.3 Paikkaus vai koko maailma

Pohja on GLOBAALI: jos vain Ranska poltetaan uudella versiolla, muu
maailma jää ilman laattoja. Siksi kaksi tietä:

1. **`--paikkaus 2026-09-07a`** (`tools/generoi-laattapyramidi.mjs:445`,
   kopion tekee `tools/paikkaa-pyramidi.mjs`): uusi versiopolku, alueen
   laatat piirretään, loput kopioidaan palvelinkopiona vanhasta
   versiosta. Tämä on **pilotin oikea tie** — laatta ei riipu
   naapuristaan, joten saumaa ei synny.
2. **koko pyramidin poltto** uudelle versiolle, kun pilotti on
   hyväksytty.

Versiotunnus: pohja on nyt `2026-09-07a`, joten esim.
**`2026-09-15-ranta`** (pohjan versio). R2-polut:

```
julisteet/pyramidi/2026-09-15-ranta/z<taso>/<sarake>/<rivi>.webp
julisteet/pyramidi/pyramidi.json      (kenttä "versio")
```

**`pyramidi.json` kirjataan PERÄKKÄIN, ei rinnakkain.** Maat jakavat
saman luettelon (`varitasot`, `erat`), ja kaksi yhtaikaista kirjoitusta
menettää toisen. Paikallisessa polttoskriptissä (`tools/polta-
paikallisesti.sh`) shardit kirjoittavat kukin omaan kansioonsa ja
luettelo kootaan lopuksi yhdellä ajolla — sama sääntö pätee tähän.

**Huomio versiovahdista:** pohjan version vaihtuessa pallon
lepokerroksen versiovahti (`js/pallo.js lepokerroksenKerrokset`)
sammuttaa lepokerroksen, kunnes pallon oma Mercator-sarja on poltettu
samasta versiosta ja `PALLO_LAATTAVERSIO` osoittaa siihen. **Tämä on
osa polttoa eikä valinnainen** (`tools/polta-paikallisesti.sh`,
`--pallo --pallotunniste <kirjain>`).

### 5.4 Voiko nostotason polttovelan yhdistää samaan ajoon?

**Samaan ajoon EI, samaan erään KYLLÄ.**
`tools/generoi-laattapyramidi.mjs:802` torjuu sen nimenomaisesti:
*"--nostotaso, --viivataso, --rantataso ja --vari ovat eri ajoja"* —
pohja ja nostotaso ovat eri työlista, eri peite ja eri versiopolku.

Mutta ne kuuluvat samaan erään: nostotason polttovelka
(`docs/raportit/viesti-fable-merkkirajat-20260914.md` luku 7) vaatii
(1) yhden kutsun `keraaNostot`iin (merkit `merkkiPortti`n läpi) ja
(2) nostotason uudelleenpolton uudella nostoversiolla. Koska pohjan
versionosto joka tapauksessa pakottaa pallosarjan uudelleenpolton ja
versionoston, **kannattaa ajaa peräkkäin yhdessä huollossa**:

```
1) pohja      --paikkaus 2026-09-07a --versio 2026-09-15-ranta
2) nostotaso  --nostotaso --nostoversio 2026-09-15-nostot
3) pallosarja --pallo --pallotunniste <kirjain>
4) pyramidi.json yhdellä ajolla, sitten PALLO_LAATTAVERSIO/-TUNNISTE
```

## 6. Mitä koodiin tehtiin: ei mitään — ja miksi

Tehtävä pyysi lisäämään generaattoriin lipun lähteen valintaan, jos
sellainen on turvallinen. **Sitä ei tehty, koska se olisi ollut väärä
korjaus:** lähde on jo yksi ja oikea (`meriRenkaat`), ja toinen
valittava lähde tarkoittaisi taas kahta totuutta — juuri se vika, jonka
omistaja korjautti 1.9.2026.

Sen sijaan ajettiin **paikallinen todistuspoltto** nykykoodilla
(ei R2-vientiä, ei laattoja committiin):

```
node tools/generoi-laattapyramidi.mjs <tmp> --data <ne-kansio> \
  --alue -8.5,47.2,-4.4,50.4 --tasot 6 --patina kevyt \
  --ilman-rantaviivaa --versio koe2
```

ja verrattiin täsmälleen samaan laattaan elävästä ämpäristä
(`2026-09-07a/z6/39/17.webp`, Bretagnen kärki ja Ouessant):
`docs/raportit/kuvat/bretagne-ennen-jalkeen.jpg`. Muoto on eri — sama
laatta, sama arkki, sama patina, eri rantaviiva.

**Repossa ei ole yhtään koodimuutosta, joten portteja ei ajettu eikä
PR:ää avata.**

## 7. Sivuhavainto: miksi Kreikan saapumisnäkymä keskittyy Ermoupoliin

Mitattu (`js/maanaariviivat.js:240` `maanLautalaatikko`, pelaaja
Ateenassa, sama koodi kuin pelissä):

```
GRC laatikko    lon 19,63…28,24   lat 34,93…41,75
    keskipiste  lon 23,93  lat 38,39
    Ateena laatikossa: vaaka 47,6 %, pysty 55,9 %
```

Laatikko on **koko Kreikka Gávdoksesta Rodokseen** — ankkurirengas
(manner) imee `SAARIVARA = 0,2` -säännöllä kaikki saaret. Ateena ei ole
laatikon ulkopuolella eikä reunalla; se on 17 lautayksikköä (~45 km)
keskipisteestä. Mutta kamera osoittaa laatikon keskipisteeseen, ja
saapumisnäkymässä (390 × 844, mitattu ajosta) se tarkoittaa:

```
kamera pov   lat 37,76  lng 23,93
Ateena       ruudulla (179, 376)   etäisyys ruudun keskipisteestä 49 px
Ermoupoli    ruudulla (229, 404)   etäisyys ruudun keskipisteestä 38 px
```

**Ermoupoli on siis lähempänä ruudun keskipistettä kuin Ateena** — juuri
se, minkä omistaja näkee. Syy ei ole laatikon virhe vaan se, että
Kreikan massakeskipiste on Egeanmerellä eikä Attikassa.

Pelaajan merkkiä ei löytynyt DOMista (`merkkejä DOMissa: 0`)
saapumisnäkymässä kummallakaan ruudulla — se on **oma havainto, jota ei
tässä selvitetty**; nostot ovat CSS2D-merkkejä (`js/pallolauta/nostot.js`)
ja toinen agentti työstää juuri sitä tiedostoa, joten siihen ei
koskettu.

**Ehdotus (ei toteutettu):** saapumislaatikkoon lisätään ehto, että
pelaajan kaupunki on vähintään `KAUPUNGIN_VARA` verran ruudun
keskipisteen puolella — käytännössä laatikon keskipiste painotetaan
kaupunkia kohti, esim.

```
keski = 0,5 × (laatikon keski) + 0,5 × (kaupungin sijainti)
```

ja laatikkoa kasvatetaan sen verran, että kaikki kehän pisteet yhä
mahtuvat. Näin maa näkyy yhä kokonaan (erän 13 vaatimus säilyy) mutta
kaupunki on lähellä ruudun keskustaa. Vaihtoehto B: laatikko = ankkuri-
rengas + pelaajan kaupunki, saaret mukaan vain jos ne mahtuvat ilman
kameran nousua — Kreikassa tämä rajaisi näkymän mantereeseen ja
Kykladeihin.

## 8. Mitä EI tehty

Ei R2-vientiä, ei `pyramidi.json`-muutoksia, ei versionostoa, ei
Raamattu-kirjausta, ei mergeä, ei muutoksia muihin moduuleihin
(`nimet.js`, `merkit.js`, `nostot.js`, `maapaneeli.js` koskematta).
