# Pelikoodari 5.11.2026: katetut aukot tason 1 kulkualueelta (KK:n päätös 22.1x, kohta 1)

**Luku: 41 suljettua katettua tilaa, joihin kulkualueelta on aukko (62 aukkoa).** Mukana kujan ontto talo (−188,8; 416). Näistä 32 tilalla ei ole ovea 3 m:n sisällä, joten niihin voi tulla KK:n säännöllä ovi seinän mukana.

Lähtötieto: kartan v19 172 rajakohtaa, jotka eivät ole talon pohjalla ja ovat katettuja, ryhmiteltynä 115 alueeseen. Ei muutoksia peliin eikä malleihin.

| Ryhmä | Alueita | Kohtia | Ei ovea 3 m:n sisällä | Sääntö |
|---|---:|---:|---:|---|
| **Aukko** (suljetaan) | 41 | 62 | 32 | katettu ≥ 95 %, reunasta avointa alle 30 % |
| Kuisti tai avoin sivu | 34 | 55 | 30 | katettu ≥ 95 %, reunasta avointa vähintään 30 % |
| Osin taivasta | 11 | 26 | 5 | alueesta katettu alle 95 % |
| Pieni | 29 | 29 | 29 | ala alle 10 m² tai sisäleveys alle 2 m |
| Yhteensä | 115 | 172 | | |

## Varmuus
- Mitattu kartasta, ei pelistä. Ylhäältä katsottu 12 satunnaista kustakin ensimmäisen luokittelun ryhmästä ja 12 lähimpänä 30 %:n rajaa kummaltakin puolelta. Pelikuvia on vain kujalta (ajo 220320, x1–x4).
- **Raja on arvio:** 16 aluetta on välillä 20–40 %. Kuisteiksi jäi tiloja, joilta puuttuu koko yksi sivu, esimerkiksi (−275,8; −128,1) 300 m², aukko 24,55 m, ja suuri sali (1,5; 0,9) 2 494 m², aukko 70,8 m. Aukoissa on mukana myös pitkiä katettuja rakoja talojen välissä, esimerkiksi (−1,8; −365,0).
- 321 talon pohjalla olevaa kohtaa ei tarkistettu, kuten KK rajasi. Ovien lukumäärä kertoo vain 3 m:n säteen: talolla voi olla ovi kauempana.
- Rajaviesti: katso lisäys alla.

## Lisäys 6.11.: tilat, joilta puuttuu koko sivu (KK 00.00)

KK: tila, jolta puuttuu koko sivu, ei ole kuisti. Kaikki 34 kuistialuetta katsottu ylhäältä. **Suljettaviin siirtyy 10 tilaa ja 14 aukkoa, joten yhteensä 51 tilaa ja 76 aukkoa.**

Peruste: suorakulmainen tila, jonka muilla sivuilla on seinä ja yksi sivu auki. Mitattu kartasta, ei pelistä.

| x | z | Suurin aukko m | Aukkoja | Ala m² | Avointa | Ovia 3 m |
|---:|---:|---:|---:|---:|---:|---:|
| 1,5 | 0,9 | 70,8 | 5 | 2494 | 31 % | 1 |
| −275,8 | −128,1 | 24,55 | 1 | 300 | 33 % | 0 |
| 206,2 | 436,1 | 13,3 | 1 | 102 | 50 % | 0 |
| 163,8 | 434,8 | 12,8 | 1 | 91 | 51 % | 0 |
| 204,7 | 517,0 | 14,8 | 1 | 51 | 51 % | 0 |
| 155,1 | 399,4 | 10,8 | 1 | 48 | 36 % | 0 |
| −185,9 | 481,2 | 9,05 | 1 | 39 | 33 % | 0 |
| −247,0 | −173,5 | 5,55 | 1 | 20 | 31 % | 0 |
| −69,8 | 426,3 | 5,05 | 1 | 13 | 53 % | 0 |
| −81,1 | 240,4 | 5,3 | 1 | 11 | 41 % | 0 |

**Sali (1,5; 0,9) on eri tapaus:** alueesta 96 % on `pohja.json`:n talon pohjalla, ja sillä on ovi 3 m:n sisällä; muut 9 eivät ole pohjalla. 70,8 m on kulkualueeseen koskevan reunan pituus, ei välttämättä yksi aukko. Siksi 321 talon pohjalla olevan kohdan joukossa voi olla samanlaisia tiloja; niitä ei ole tarkistettu.

**Rajalla, KK ratkaisee:** kapeat katetut kaistaleet, joissa pitkä sivu on auki ja syvyys noin 3 m: voivat olla oikeita kuisteja.

| x | z | Suurin aukko m | Aukkoja | Ala m² | Avointa | Ovia 3 m |
|---:|---:|---:|---:|---:|---:|---:|
| −147,7 | 244,3 | 20,3 | 1 | 65 | 51 % | 0 |
| −186,5 | 497,6 | 17,8 | 1 | 46 | 45 % | 0 |

**Eivät siirry (22 aluetta):**
- 2 kehää talon ympärillä, (184,2; 454,0) ja (143,5; 432,7): oikeita kuisteja.
- 1 läpikulku kahden umpinaisen massan välissä, (−139,0; 442,1).
- 19 vinoreunaista katon alaa ilman seinälinjaa (kiilat, esim. (180,2; −36,3), (279,1; −129,8)): eivät ole tiloja, joten seinästä ei ole apua. Rajaviesti jää niihin. Miksi kate on vino, on selvittämättä.

**Tarkistettava ensimmäisistä 41:stä:** (125,0; 338,8), 336 m², näyttää ylhäältä katon alalta talon ympärillä eikä suljetulta tilalta. LAV: katso malli ennen seinää.

**Rajaviesti (KK 00.00, PT 00.0x):** `35140432d` jää kohtiin, joissa keisari pysähtyy ilman seinää, ei poistoa, ei junaan. Kun seinät tulevat, kartta ja rajat ajetaan uudelleen (`tyokalut/kulkukartta-rajat.py`), joten suljetut aukot putoavat rajoilta itsestään.

## Lisäys 6.11.: 321 talon pohjalla olevaa kohtaa (KK)

**Ehdotus: suljettaviin siirtyisi vielä 8 tilaa (13 aukkoa), ja 5 tilaa on epäselviä.** KK ei ole vielä päättänyt näistä; LAV ei odota. Vain kartasta v19, ei peliajoa.

321 kohtaa on 258 alueella. 8 aluetta kuuluu jo edelliseen tarkasteluun. Kaikki aukko- ja osin taivasta -luokan alueet sekä sivu-auki-ehdokas katsottu ylhäältä; pienistä katsottu 12 pisimmän aukon aluetta.

### Siirtyvät

| x | z | Suurin aukko m | Aukkoja | Ala m² | Katettu | Avointa | Ovia 3 m |
|---:|---:|---:|---:|---:|---:|---:|---:|
| −100,2 | 199,3 | 28,55 | 1 | 286 | 100 % | 32 % | 1 |
| −105,4 | 339,6 | 25,55 | 5 | 260 | 94 % | 32 % | 1 |
| −163,5 | 441,4 | 26,05 | 1 | 177 | 87 % | 28 % | 1 |
| −113,1 | 443,2 | 27,05 | 1 | 174 | 90 % | 25 % | 1 |
| −144,4 | 287,9 | 18,55 | 2 | 129 | 92 % | 39 % | 1 |
| 36,3 | −219,8 | 3,05 | 1 | 48 | 100 % | 5 % | 0 |
| −94,3 | −15,9 | 6,55 | 1 | 36 | 100 % | 26 % | 0 |
| −94,5 | −20,8 | 3,05 | 1 | 14 | 100 % | 15 % | 0 |

### Epäselvät, KK ratkaisee

| x | z | Suurin aukko m | Aukkoja | Ala m² | Katettu | Avointa | Ovia 3 m |
|---:|---:|---:|---:|---:|---:|---:|---:|
| −162,9 | 337,5 | 22,8 | 6 | 1358 | 41 % | 4 % | 6 |
| 121,6 | 408,3 | 8,55 | 3 | 505 | 49 % | 7 % | 1 |
| −108,1 | 396,1 | 26,55 | 4 | 115 | 91 % | 34 % | 1 |
| 108,3 | 473,1 | 16,05 | 1 | 100 | 78 % | 38 % | 2 |
| −166,0 | 431,6 | 3,05 | 2 | 98 | 87 % | 3 % | 0 |

- (−162,9; 337,5) ja (121,6; 408,3) ovat suuria yhtenäisiä alueita, joissa on paljon taivasta: yksi seinä ei ratkaise niitä.
- (−108,1; 396,1) ja (108,3; 473,1): sisätila, joka yhdistyy kapeaan reunaan, joten aukko voi olla reunan pituus.
- (−166,0; 431,6): samanmuotoinen kuin alla olevat ovelliset, mutta ovea ei ole 3 m:n sisällä. Voi olla ovisäännön ohittama aukko.

### Ei toimia

- 4 tilalla aukko on 3,05 m ja ovi 3 m:n sisällä, joten ovi on todennäköisesti aukolla (päätelty): (−108,0; 385,2); (−94,0; 329,5); (−164,0; 330,2); (−110,5; 436,9).
- 217 pientä aluetta (239 kohtaa, ala mediaani 7 m²): kapeita reunoja umpinaisen talon ympärillä. Talo itse on umpinainen, joten takana on seinä. Katsotuista 12:sta kaikki olivat tätä; muita ei katsottu.
- 14 osin taivasta -aluetta, (255,5; −324,1) ja (22,5; 123,6): reunoja tai avoimia kaistaleita.

Kaikki alueet: `viesti-pelikoodari-aukot-talot-20261106.json`, kenttä `paatos`.

## Aukko (41)

| x | z | Suurin aukko m | Aukkoja | Ala m² | Avointa | Ovia 3 m |
|---:|---:|---:|---:|---:|---:|---:|
| -5,4 | 137,9 | 8,3 | 2 | 1344 | 3 % | 1 |
| -13,6 | 331,7 | 7,05 | 2 | 1313 | 8 % | 1 |
| -15,4 | 398,7 | 7,8 | 3 | 1092 | 3 % | 1 |
| -2,0 | 45,8 | 6,8 | 1 | 737 | 10 % | 1 |
| -15,0 | 365,8 | 8,05 | 2 | 437 | 6 % | 1 |
| 125,0 | 338,8 | 11,55 | 5 | 336 | 25 % | 1 |
| -251,8 | -126,9 | 14,8 | 1 | 240 | 24 % | 0 |
| -16,8 | 414,8 | 7,05 | 6 | 225 | 21 % | 0 |
| -155,6 | 283,2 | 13,55 | 2 | 189 | 15 % | 0 |
| -142,2 | 420,1 | 2,3 | 1 | 167 | 1 % | 0 |
| -141,8 | 397,2 | 2,55 | 1 | 166 | 2 % | 0 |
| -134,0 | 406,1 | 2,3 | 1 | 165 | 2 % | 0 |
| -131,3 | 352,4 | 5,3 | 1 | 164 | 5 % | 0 |
| -140,2 | 352,2 | 2,55 | 1 | 163 | 2 % | 1 |
| -133,0 | 383,6 | 2,3 | 1 | 162 | 2 % | 1 |
| -134,8 | 428,6 | 2,3 | 1 | 160 | 2 % | 0 |
| -141,0 | 374,8 | 2,55 | 1 | 159 | 2 % | 0 |
| 12,5 | -364,5 | 6,55 | 1 | 137 | 11 % | 0 |
| 26,8 | -364,0 | 6,05 | 1 | 129 | 10 % | 0 |
| -1,8 | -365,0 | 6,05 | 1 | 127 | 11 % | 0 |
| -336,5 | -274,8 | 5,05 | 1 | 120 | 7 % | 0 |
| 360,0 | -245,9 | 4,8 | 1 | 116 | 9 % | 0 |
| -336,0 | -285,8 | 4,05 | 1 | 92 | 5 % | 0 |
| 359,8 | -234,8 | 3,8 | 1 | 88 | 7 % | 0 |
| 360,5 | -256,8 | 3,8 | 1 | 88 | 7 % | 0 |
| -188,8 | 416,0 | 1,55 | 2 | 86 | 4 % | 0 |
| 58,0 | 339,8 | 1,55 | 1 | 71 | 2 % | 0 |
| 58,5 | 322,8 | 1,55 | 1 | 71 | 3 % | 0 |
| 154,7 | 419,8 | 4,05 | 2 | 68 | 23 % | 0 |
| 55,8 | 399,5 | 2,55 | 1 | 67 | 5 % | 0 |
| 216,0 | 207,2 | 1,55 | 2 | 67 | 4 % | 0 |
| -189,4 | 429,5 | 1,3 | 1 | 64 | 2 % | 0 |
| 54,8 | 451,2 | 2,55 | 2 | 64 | 9 % | 0 |
| 102,2 | 202,9 | 2,8 | 1 | 38 | 5 % | 0 |
| -157,1 | 456,3 | 5,3 | 1 | 36 | 19 % | 0 |
| 112,5 | 113,0 | 3,55 | 2 | 26 | 13 % | 1 |
| 25,0 | 385,0 | 5,55 | 1 | 21 | 27 % | 0 |
| -142,2 | 232,3 | 3,55 | 2 | 19 | 27 % | 0 |
| 325,1 | 564,0 | 3,05 | 1 | 16 | 7 % | 0 |
| 98,0 | 356,6 | 3,8 | 1 | 14 | 21 % | 0 |
| 333,0 | 208,5 | 3,55 | 1 | 10 | 19 % | 0 |

## Kuisti tai avoin sivu (34)

| x | z | Suurin aukko m | Aukkoja | Ala m² | Avointa | Ovia 3 m |
|---:|---:|---:|---:|---:|---:|---:|
| 1,5 | 0,9 | 70,8 | 5 | 2494 | 31 % | 1 |
| -275,8 | -128,1 | 24,55 | 1 | 300 | 33 % | 0 |
| 184,2 | 454,0 | 30,8 | 1 | 285 | 60 % | 1 |
| 180,2 | -36,3 | 24,3 | 1 | 266 | 70 % | 0 |
| 30,3 | 201,6 | 10,3 | 4 | 164 | 45 % | 1 |
| 143,5 | 432,7 | 6,05 | 1 | 156 | 37 % | 1 |
| 298,6 | 492,7 | 14,3 | 2 | 124 | 46 % | 0 |
| 206,2 | 436,1 | 13,3 | 1 | 102 | 50 % | 0 |
| 340,1 | 365,2 | 11,3 | 2 | 97 | 59 % | 0 |
| 163,8 | 434,8 | 12,8 | 1 | 91 | 51 % | 0 |
| 260,7 | 225,1 | 20,55 | 3 | 88 | 54 % | 0 |
| 334,8 | 500,1 | 9,8 | 3 | 84 | 57 % | 0 |
| -147,7 | 244,3 | 20,3 | 1 | 65 | 51 % | 0 |
| 204,7 | 517,0 | 14,8 | 1 | 51 | 51 % | 0 |
| 155,1 | 399,4 | 10,8 | 1 | 48 | 36 % | 0 |
| -186,5 | 497,6 | 17,8 | 1 | 46 | 45 % | 0 |
| 283,2 | 526,9 | 11,3 | 1 | 46 | 80 % | 0 |
| 343,2 | 518,2 | 4,05 | 4 | 46 | 33 % | 0 |
| -96,8 | -6,1 | 10,05 | 1 | 45 | 77 % | 0 |
| 255,0 | 396,5 | 9,05 | 1 | 41 | 64 % | 0 |
| -185,9 | 481,2 | 9,05 | 1 | 39 | 33 % | 0 |
| -110,4 | 130,8 | 11,3 | 1 | 38 | 58 % | 0 |
| 276,9 | -142,9 | 9,55 | 2 | 38 | 76 % | 0 |
| 320,5 | 536,6 | 6,8 | 3 | 37 | 79 % | 0 |
| 279,1 | -129,8 | 6,3 | 1 | 35 | 32 % | 0 |
| 65,9 | 428,5 | 9,55 | 1 | 31 | 56 % | 0 |
| -339,3 | -310,0 | 13,55 | 1 | 30 | 100 % | 0 |
| 325,0 | 558,8 | 7,8 | 2 | 30 | 42 % | 0 |
| 102,0 | 229,2 | 6,3 | 1 | 24 | 76 % | 0 |
| -247,0 | -173,5 | 5,55 | 1 | 20 | 31 % | 0 |
| -70,0 | -224,7 | 3,55 | 1 | 14 | 31 % | 0 |
| -69,8 | 426,3 | 5,05 | 1 | 13 | 53 % | 0 |
| -139,0 | 442,1 | 3,3 | 2 | 12 | 46 % | 0 |
| -81,1 | 240,4 | 5,3 | 1 | 11 | 41 % | 0 |

## Osin taivasta (11)

| x | z | Suurin aukko m | Aukkoja | Ala m² | Avointa | Ovia 3 m |
|---:|---:|---:|---:|---:|---:|---:|
| 281,5 | 339,6 | 9,55 | 2 | 4828 | 3 % | 4 |
| -249,8 | 426,0 | 3,55 | 2 | 537 | 2 % | 0 |
| -341,0 | -379,5 | 1,55 | 1 | 439 | 0 % | 0 |
| 327,7 | -78,7 | 13,3 | 6 | 372 | 38 % | 0 |
| 77,3 | 376,7 | 27,05 | 4 | 312 | 35 % | 1 |
| -202,4 | 300,0 | 4,8 | 1 | 242 | 3 % | 1 |
| -69,0 | 220,7 | 27,55 | 3 | 235 | 41 % | 2 |
| 117,0 | 239,0 | 5,55 | 1 | 235 | 7 % | 0 |
| 75,7 | 444,0 | 27,3 | 3 | 232 | 31 % | 1 |
| 237,2 | 425,5 | 17,55 | 1 | 147 | 36 % | 2 |
| -183,4 | 475,0 | 7,3 | 2 | 114 | 11 % | 0 |

## Pieni (29)

| x | z | Suurin aukko m | Aukkoja | Ala m² | Avointa | Ovia 3 m |
|---:|---:|---:|---:|---:|---:|---:|
| -185,6 | 509,5 | 3,8 | 1 | 8 | 49 % | 0 |
| -155,9 | 237,3 | 3,8 | 1 | 8 | 32 % | 0 |
| -90,5 | 300,0 | 4,55 | 1 | 8 | 100 % | 0 |
| -78,1 | -112,6 | 4,3 | 1 | 7 | 85 % | 0 |
| -43,1 | -207,6 | 4,3 | 1 | 7 | 53 % | 0 |
| -167,3 | 287,4 | 3,55 | 1 | 6 | 83 % | 0 |
| -100,6 | 233,6 | 3,3 | 1 | 6 | 53 % | 0 |
| -0,5 | 473,6 | 3,3 | 1 | 6 | 29 % | 0 |
| 72,8 | 363,1 | 4,05 | 1 | 6 | 100 % | 0 |
| 193,4 | -14,2 | 4,05 | 1 | 6 | 53 % | 0 |
| -97,7 | 126,6 | 5,55 | 1 | 5 | 98 % | 0 |
| -31,9 | 106,3 | 3,3 | 1 | 5 | 97 % | 0 |
| -345,8 | -304,2 | 3,05 | 1 | 4 | 82 % | 0 |
| -33,1 | 136,6 | 2,8 | 1 | 4 | 100 % | 0 |
| -18,1 | 75,4 | 2,8 | 1 | 4 | 100 % | 0 |
| 83,5 | -203,5 | 2,8 | 1 | 4 | 54 % | 0 |
| 84,0 | -220,8 | 2,8 | 1 | 4 | 52 % | 0 |
| -339,5 | -323,9 | 4,3 | 1 | 3 | 100 % | 0 |
| 56,5 | -205,0 | 3,8 | 1 | 3 | 100 % | 0 |
| 85,2 | 133,4 | 4,3 | 1 | 3 | 97 % | 0 |
| -339,2 | -332,5 | 4,05 | 1 | 2 | 100 % | 0 |
| -339,0 | -341,1 | 3,8 | 1 | 2 | 100 % | 0 |
| -338,8 | -349,8 | 4,05 | 1 | 2 | 100 % | 0 |
| -338,5 | -358,5 | 4,05 | 1 | 2 | 100 % | 0 |
| -338,2 | -367,0 | 4,05 | 1 | 2 | 100 % | 0 |
| -338,0 | -375,6 | 3,8 | 1 | 2 | 100 % | 0 |
| -97,4 | 111,0 | 3,05 | 1 | 2 | 100 % | 0 |
| -365,0 | -265,1 | 3,3 | 1 | 1 | 100 % | 0 |
| -337,0 | -263,6 | 3,8 | 1 | 1 | 100 % | 0 |

Kaikki kohdat aukkoineen: `viesti-pelikoodari-aukot-20261105.json`.
