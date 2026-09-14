# Tasoituslaatat 27 maalle korjatulla leikkurilla: poltettu ja mitattu (14.9.2026)

*Opus-työagentti Fablelle. Haara `claude/bold-ride-vow4ki-poltto-27`,
pohja origin/main. Vain raportti ja kolme kuvaa — ei koodimuutoksia,
ei versionostoa, ei muutoslokiriviä, ei Raamattu-kirjausta, ei mergeä,
ei laattatiedostoja repoon.*

## 0. Lyhyesti

**Kaikkien 27 maan tasoituslaatasto on nyt versiossa
`2026-09-14b-tasoitus` eli korjatulla leikkurilla poltettu.**
26 ajoa tehtiin tänään peräkkäin (Ranska oli poltettu jo aiemmin,
raportti `viesti-fable-poltto-tasoitus-20260914.md`); jokainen
`success`, yhteensä **19 595 laattaa** ja **58 min** ajoaikaa.
Kaikki 26 ajoa ajettiin `ref=main`, joka sisältää leikkurikorjauksen
(`1da0c37b v1880: Tasoituskerman reikä harventamattomasta rannasta
(#2448)`; `js/maanaariviivat.js:633` `const harvennus = d > 0 ?
HARVENNUS_YKSIKKOA : 0`).

**Kreikka ajettiin ensin ja mitattiin ruudulta, koska vika näkyy
Egeanmerellä eikä Ranskassa.** Mitattu Kykladien näkymässä
(1400 × 900, laattataso z8, 20 kreikkalaista saarta):

| kerman alla saaren poltetusta maasta | ENNEN | JÄLKEEN |
| --- | ---: | ---: |
| pahin saari | **23,70 %** | **0,00 %** |
| mediaanisaari | 5,87 % | 0,00 % |
| pienin | 0,00 % | 0,00 % |
| pinta-alalla painotettu | 4,28 % | **0,00 %** |

Tavoite oli ≤ 3 %; tulos on **0,00 % kaikilla kahdellakymmenellä
saarella**. **Laatta-404:iä 0** kaikissa viidessä mitatussa näkymässä,
`variMaa = GRC`, `varillisia > 0` ja versioportin `syy` tyhjä.

**`pyramidi.json` pysyi ehjänä koko sarjan ajan.** Jokaisen ajon
jälkeen luettelo haettiin ämpäristä ja verrattiin tavuittain
edelliseen: 27 maata, ajettu maa uudella versiolla ja `maaPolussa`,
**muiden 26 maan kirjaukset joka kerta tavulleen ennallaan**, samoin
pohjan `versio` (2026-09-07a), `tasot`, `viivataso` ja `nostotaso`.
Lopputilanteessa **yksikään maa ei ole vanhalla versiolla**.

**R2 HEAD 12 näytettä joka maalle** (kaikilta viideltä tasolta):
**27 × 12 = 324 vastausta, kaikki 200, ei yhtään 404:ää.**

**Kuvat** (`docs/raportit/kuvat/`):
`poltto-27-kyklades-ennen-jalkeen.png` (neljä pahinta saarta,
ennen ja jälkeen samasta kohdasta),
`poltto-27-ateena-saapuminen.jpg` (Ateenan saapumisnäkymä uusilla
laatoilla), `poltto-27-kyklades-uusi.jpg` (Kykladien zoom).

---

## 1. Ajot

Kaikilla sama syöte, vain `maa` vaihtui:
`paletti=tasoitus · peitto=0.85 · variversio=2026-09-14b-tasoitus ·
tasot=4-8 · laatikko_nakyma=true · korkeus=1 · kuiva=false · vie=true ·
ref=main`.

**PERÄKKÄIN, EI RINNAKKAIN** — kaikki maat kirjoittavat samaan
`pyramidi.json`-tiedostoon. Seuraavaa ajoa ei käynnistetty ennen kuin
edellinen oli `completed` ja sen luettelotarkistus läpi.

| maa | ajo | laattoja | kesto | leikkurin pisteitä |
| --- | --- | ---: | --- | ---: |
| FRA *(ajettu jo aiemmin)* | 34885213499 | 1 377 | 3 min 19 s | 6 348 |
| GRC | 34895556377 | 555 | 2 min 42 s | 7 710 |
| AUT | 34898308244 | 253 | 2 min 2 s | 1 377 |
| BGR | 34898542587 | 179 | 1 min 24 s | 1 098 |
| BIH | 34898758496 | 130 | 1 min 34 s | 777 |
| CHE | 34898944420 | 101 | 1 min 14 s | 1 002 |
| CZE | 34899087462 | 223 | 1 min 20 s | 1 281 |
| DEU | 34899235031 | 696 | 1 min 59 s | 4 206 |
| DNK | 34899463844 | 196 | 1 min 32 s | 3 372 |
| ESP | 34899655877 | 960 | 2 min 31 s | 3 969 |
| EST | 34899916089 | 163 | 1 min 26 s | 1 584 |
| FIN | 34900094367 | 1 334 | 2 min 56 s | 4 968 |
| GBR | 34900387076 | 1 160 | 3 min 11 s | 10 248 |
| HRV | 34900722601 | 225 | 1 min 28 s | 3 099 |
| HUN | 34900899757 | 201 | 1 min 19 s | 1 107 |
| IRL | 34901039808 | 224 | 1 min 27 s | 3 450 |
| ITA | 34901213947 | 1 223 | 2 min 39 s | 4 398 |
| LTU | 34901467618 | 189 | 1 min 33 s | 864 |
| LVA | 34901637095 | 238 | 1 min 23 s | 819 |
| NLD | 34901770080 | 125 | 1 min 11 s | 1 272 |
| NOR | 34901916924 | 3 993 | 5 min 10 s | 28 320 |
| POL | 34902392346 | 603 | 1 min 55 s | 1 878 |
| PRT | 34902609312 | 183 | 1 min 23 s | 1 713 |
| ROU | 34902786712 | 429 | 1 min 57 s | 1 674 |
| SWE | 34902994363 | 2 031 | 4 min 5 s | 7 092 |
| TUR | 34903387446 | 1 363 | 2 min 42 s | 4 929 |
| UKR | 34903634118 | 1 241 | 3 min 5 s | 3 969 |

**Yhteensä 27 maata · 19 595 laattaa · 58 min** (tämän erän 26 maata:
18 218 laattaa, 55 min). Kaikkien `conclusion = success`; yhtään ajoa
ei tarvinnut uusia.

**Leikkurin pistemäärä on todiste siitä, että korjattu koodi oli
käytössä.** Luku on ajolokin rivi `leikkuri N rengasta / M pistettä`,
ja se on harventamattoman renkaan pistemäärä. Ranskassa vanha koodi
tulosti 4 668 ja korjattu 6 348 (+36 %); Kreikassa korjattu tulostaa
7 710 ja Norjassa 28 320. Harvennettu rengas ei voi tuottaa näitä
lukuja.

## 2. `pyramidi.json`: mikään muu ei muuttunut

Tarkistus ajettiin **jokaisen 26 ajon jälkeen** samalla koneellisella
vertailulla: ämpärin luettelo haettiin uudestaan ja verrattiin
`JSON.stringify`-tasolla edelliseen kopioon.

| väite | tulos |
| --- | --- |
| maita `varitasot`-taulussa | **27** joka kerta, samat avaimet |
| ajettu maa | uusi versio `2026-09-14b-tasoitus`, `maaPolussa: true` |
| muut 26 maata | **kirjaukset tavulleen ennallaan** joka kerralla |
| pohjan `versio` | 2026-09-07a, ei liikahtanut |
| `tasot`, `viivataso`, `nostotaso` | ennallaan |

Sarjan päätteeksi luettelo haettiin vielä kerran: **27 maata,
yksikään ei ole vanhalla versiolla, `maaPolussa` kaikilla.**

Sarja oli rakennettu pysähtymään: jos jonkin ajon `conclusion` ei
olisi ollut `success` tai jos jokin muu maa olisi muuttunut tai
pudonnut, ajo olisi keskeytynyt siihen eikä seuraavaa olisi
käynnistetty. Pysähdystä ei tullut kertaakaan.

## 3. Kreikan todiste pelissä

Menetelmä on siirtymä-raportin (`viesti-fable-siirtyma-20260914.md`)
menetelmä: **peli ajetaan oikeasti ja mitataan kuvakaappauksista**,
ei aineistosta. Playwright + Chromium `/opt/pw-browsers/chromium`,
koodi tästä puusta, laatat tuotannon ämpäristä. Kolme vaihetta
samasta kamerasta, ainoa ero ämpärin luettelossa:

```
D  varitasot poistettu luettelosta   → laatat ILMAN kermaa
C-vanha  GRC versiolla 2026-09-14-tasoitus   → kerman peitto ennen
C-uusi   GRC versiolla 2026-09-14b-tasoitus  → kerman peitto jälkeen
```

**Molemmat laatastot ovat ämpärissä**, joten ennen ja jälkeen ovat
oikeita laattoja oikeasta ämpäristä, eivät simulaatio. Vanha versio
`2026-09-14-tasoitus` jätettiin siksi toistaiseksi paikalleen (luku 6).

Kamera ajettiin pelin omalla `kamera.ajaKamera({ bbox })`illa
Kykladien laatikkoon (lon 24,4…26,1 · lat 36,3…37,8) ja mittaus
tehtiin vasta kun laattakerros oli levossa (`jumissa 0`, kaikki
valmiita, häivytys ohi). Kaikki pallon kankaan ulkopuolinen
piilotettiin ennen kaappausta, jottei mittauspiste osu korttiin.

| näkymä | laattataso | `variMaa` | `varillisia` | `syy` | 404 |
| --- | ---: | --- | ---: | --- | ---: |
| Kyklades, D (ei kermaa) | z8 | null | 0 | tyhjä | 0 |
| Kyklades, C-vanha | z8 | GRC | 40 | tyhjä | 0 |
| Kyklades, C-uusi | z8 | GRC | 40 | tyhjä | 0 |
| Ateenan saapuminen, vanha | z6 | GRC | 20 | tyhjä | 0 |
| Ateenan saapuminen, uusi | z6 | GRC | 20 | tyhjä | 0 |

### 3.1 Mitä mitattiin ja miksi juuri niin

Mitta on **"kuinka suuri osa saaren poltetusta maasta jää kerman
alle"**, ja se on täsmälleen se luku, jonka siirtymä-raportti mittasi
geometriasta (12–32 % pikkusaarilla).

* **Saari = yhtenäinen maalaikku D-kuvasta**, ei projisoitu polygoni.
  Maa/meri erotetaan lämmöstä (R − B) Otsun kynnyksellä ja laikut
  yhdistetään 4-naapurustolla. Näin saaren rajaus ei riipu siitä
  geometriasta, jota ollaan mittaamassa — muuten mittaus olisi kehä.
* **Kreikkalaisuus** ratkaistaan enemmistöäänestyksellä pelin oman
  `maanRenkaatAsteina(data, 'GRC', pallonAsteet)` -renkaista
  projisoitua naamiota vasten (yli 60 % laikun pikseleistä naamion
  sisällä). Näin Turkin rannikko ja Ikaria eivät tule mukaan — ne
  KUULUU peittää kermalla.
* **Kerma** on se pikseli, joka eroaa D-kuvasta yli 24 yksikköä
  (RGB-summa). Kohdemaan sisällä laatan alfa on 0, joten siellä C ja D
  ovat pikselilleen samat — kerman alle jäänyt maa erottuu.
* Laikut, jotka koskettavat ruudun reunaa tai ovat alle 300 pikseliä,
  jätettiin pois: niiden osuusluku olisi rajauksen eikä leikkurin
  mitta. Jäljelle jäi **20 saarta**.

### 3.2 Tulos

| kerman alla saaren maasta | ENNEN | JÄLKEEN |
| --- | ---: | ---: |
| pahin saari | 23,70 % | **0,00 %** |
| mediaani | 5,87 % | **0,00 %** |
| pienin | 0,00 % | 0,00 % |
| pinta-alalla painotettu (20 saarta) | 4,28 % | **0,00 %** |

Neljä pahinta saarta ennen ja jälkeen samasta kohdasta:
**`kuvat/poltto-27-kyklades-ennen-jalkeen.png`**. ENNEN-paneeleissa
kerma leikkaa musteensinisen ääriviivan sisäpuolelta kiilan saaren
maasta; JÄLKEEN-paneeleissa maa täyttää ääriviivan.

| saari (laikun koko) | ENNEN | JÄLKEEN |
| --- | ---: | ---: |
| 730 px | 23,70 % | 0,00 % |
| 424 px | 16,04 % | 0,00 % |
| 515 px | 11,84 % | 0,00 % |
| 1 706 px | 9,03 % | 0,00 % |

**Luku 0,00 % ei ole pyöristys vaan nolla pikseliä**: yhdelläkään
kahdestakymmenestä saaresta ei ole enää yhtään maapikseliä kerman
alla. Tavoite oli ≤ 3 %.

### 3.3 Mittauksen pohja tarkistettiin

Sama mittaus samoilla kynnyksillä antaa vanhoille laatoille 23,70 %
ja uusille 0,00 % — eli mittaus **erottaa** kaksi laatastoa. Jos ero
olisi mittausmelua, molemmat antaisivat saman luvun. Vertailuna:
Ranskan pilotissa (`viesti-fable-poltto-tasoitus-20260914.md` luku 4)
ennen ja jälkeen eivät eronneet mitattavasti, ja se oli odotettu —
Ranskan rannikko on sileä. Vika oli Egeanmeren kokoluokan vika, ja
juuri siellä se nyt mitattiin pois.

## 4. Saapumisnäkymä

`kuvat/poltto-27-ateena-saapuminen.jpg`: Ateenan saapumisnäkymä
(1400 × 900, z6, kamera lat 37,759 · lng 23,933 · alt 0,1547) uusilla
laatoilla. Kreikka on alkuperäisessä reliefissään, muu maailma
kermalla, ja saariston reuna kulkee ääriviivaa pitkin.
`kuvat/poltto-27-kyklades-uusi.jpg` on sama asia zoomattuna.

Kummassakaan ei ole yhtään laatta-404:ää eikä versioportti sammuttanut
kerrosta (`syy` tyhjä).

## 5. Mitä EI tehty

Ei pohjapyramidin eikä pallon Mercator-sarjan polttoa, ei
nostotason eikä viivatason polttoa, ei koodimuutoksia, ei
versionostoa, ei muutoslokiriviä, ei Raamattu-kirjausta, ei mergeä,
ei dist/:iä, ei laattatiedostoja repoon, ei rinnakkaisia ajoja.
Tämä haara muuttaa vain tämän raportin ja kolme kuvaa.

## 6. Avoin asia

**Vanha laatasto `2026-09-14-tasoitus/vari/` jää ämpäriin** (27 maan
verran, tämän erän 26 maata mukaan lukien). Sitä ei poistettu: se oli
tämän raportin ENNEN-aineisto, ja se on ainoa tapa toistaa luvun 3
mittaus. Nyt kun kaikki 27 maata ovat uudella versiolla, koko vanha
versiokansio voidaan poistaa yhdellä kerralla — se on oma pieni
työnsä ja kuuluu omistajan päätettäväksi.
