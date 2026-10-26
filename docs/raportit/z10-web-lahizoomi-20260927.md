# Z10 webissä: miksi selain ei pääse z10:een, ja nostetaanko lähizoomin kattoa

Pelikoodari 27.9.2026 klo 08.2x, Fablen tilaus 07.4x. Mittaus Playwright-Chromiumilla (GPU, `--use-angle=metal`),
Pariisi, pallolauta, kamera kaupungin päällä sallitulla minimikorkeudella (`controls().minDistance`).
Luettelona Z10-koesarja `julisteet/pyramidi/koe/2026-09-26s/pyramidi.json` (z0–z10), koska tuotannon osoitin
palautettiin 08.0x `2026-09-26-pohja`:han (z0–z8). Koodi: PR #3371 (`PELIN_SYVIN_TASO` 10), e6ca3b1d8.
Raakatulokset ja kuvat: `/Users/Shared/Claude/proto-3d/lokit/z10-web/`.

## 1. Miksi z10:een ei pääse

Pallon laattakerros (`js/pallolaatat.js` `laattakerroksenTaso` → `lepokerroksenTaso`) valitsee matalimman tason,
jonka tiheys riittää ruudun tarpeeseen: `leveys/360 ≥ tarve` (laitepikseliä/aste). z8 = 480, z9 = 960,
z10 = 1 920 px/aste. Tason voi vielä pudottaa **laattakatto** (`LAATTAKERROS_LAATTAKATTO_NAKYVA` = 48 aidosti näkyvää
laattaa) ja reliefin syvin taso.

| ruutu | minimikorkeus | tarve (px/°) | haluttu taso | valittu taso | syy |
|---|---|---|---|---|---|
| työpöytä 1440×900 @2x | 0,0199 | 1 546 | z10 | **z9** | laattakatto (z10:llä > 48 näkyvää laattaa) |
| puhelin 393×852 @3x | 0,0473 | 924 | z9 | **z9** | z9 riittää (960 ≥ 924) |

Karttasepän havainto (puhelin z8, työpöytä z9) vastaa tilannetta ilman z9:ää puhelimessa / katon rajaamana
työpöydällä. **Työpöydällä este on laattakatto, ei zoomikatto; puhelimella zoomikatto** (`PALLOLAUDAN_LAHIN_LEVEYS`
60 lautayksikköä, puhelimella / 1,5 = 40, `js/pallolauta/kamera.js`).

## 2. Mittaus: laattoja ja siirto per kaupunkinäkymä

Luku = mittausikkunassa (zoomista siihen, kun näkyvät laatat ovat valmiina) haetut kuvat; välimuisti tyhjä.

| tila | taso | näkyviä + tuki | haettu | Mt |
|---|---|---|---|---|
| Työpöytä, tuotanto nyt (z0–z8) | z8 | 77 | 109 | **1,89** |
| Työpöytä, #3371, katto ennallaan | z9 | 126 | 179 | **5,65** |
| Työpöytä, #3371 + katto 2× lähemmäs | z10 | 154 | 161 | **5,91** |
| Puhelin, tuotanto nyt (z0–z8) | z8 | 57 | 173 | **3,15** |
| Puhelin, #3371, katto ennallaan | z9 | 83 | **16 983** | **306,9** ⚠ |
| Puhelin, #3371 + katto 2× lähemmäs | z10 | 96 | 96 | **4,28** |

⚠ **TUKITASON HAKUSILMUKKA (uusi löydös, toistui 3/3):** puhelimella z9-tasolla kerros hakee samoja **68
z7-tukilaattaa** (pohja + väritaso FRA) yhä uudestaan — ~17 000 pyyntöä minuutissa. Mittausreitti ohittaa
HTTP-välimuistin, joten Mt on yläraja; oikeassa selaimessa pyynnöt osuvat todennäköisesti välimuistiin, mutta
purku ja GPU-lataus toistuvat (akku, nykiminen). Ei esiinny tuotannon z0–z8-luettelolla eikä z10:llä. Epäilty syy:
tukitaso (`LAATTAKERROS_TUKI_ASKEL` 2 → z7) ja muistikatto (`LAATTAKERROS_LAATTAKATTO_MUISTI` 24) heittelevät toisiaan
harvalla z9:llä. **Korjattava ennen kuin #3371 päästää z9:n puhelimiin.**

## 3. Kuvaparit (kulma ja versio kuvissa)

- `kuvapari-z10-tyopoyta-maksimizoomi.png`, `kuvapari-z10-puhelin-maksimizoomi.png`: nykyinen maksimizoomi (z9)
  vs. katto 2× lähemmäs (z10).
- `kuvapari-z10-tyopoyta-sama-ala.png`, `kuvapari-z10-puhelin-sama-ala.png`: sama maa-ala — z9 venytettynä vs. z10.

Havainto: z10 terävöittää reliefin pinnanmuotoja; joet, rajat ja nimiöt ovat vektoreita eivätkä muutu. Lähempänä
näkyy vähemmän sisältöä (Amiens, Saint-Cloud ja Loire putoavat ruudulta), ja maakunnan nimiö (PARIISI) paisuu.

## 4. Sivulöydös (ilmoitettu Fablelle 08.0x)

Kun osoitin oli `2026-09-26s-pohja`, webin pallon laattakerros oli pois: `lepokerroksenKerrokset` vaatii pallosarjan
(`laatat.json` `2026-09-26-pohja`) ja pyramidin version olevan samat. s-pohjalle ei ole pallosarjaa ämpärissä.
Osoitin palautettiin; Z10:n käyttöönotto webissä vaatii joko s-pohjan pallosarjan (+ `PALLO_LAATTAVERSIO`) tai
versiovahdin täsmennyksen.

## 5. Suositus

1. **Ei zoomikaton nostoa nyt.** Ensin: (a) tukisilmukan korjaus (puhelin, harva taso), (b) pallosarja tai
   versiovahti s-pohjalle — ilman niitä Z10 ei webissä piirry lainkaan.
2. **Työpöydälle z10 ilman zoomikaton nostoa**, jos halutaan: laattakatto 48 → ~64 aidosti näkyvää laattaa
   (mitattava: nyt 126 näkyvää+tukea z9:llä, arvio z10:llä ~160, siirto ~6 Mt).
3. **Puhelimen katon nosto 2× (40 → 20 lautayksikköä)** antaa z10:n: siirto 3,15 → 4,28 Mt (+36 %) tuotantoon
   nähden, laattoja 96. Hyöty on reliefin terävyys, ei uutta sisältöä. Suositus: vasta kohtien 1a–1b jälkeen ja
   vain kaupunkien lähizoomissa (alueilla, joilla z10 on poltettu), omistajan kuvaparin perusteella.
