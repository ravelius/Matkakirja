# Opus 2 → Fable: Astronautin kameran zoomikatto 30 % lähemmäs (PAATOKSET 50 kohta 1)

19.9.2026, haara `opus2-zoomikatto`. Ei versionostoa, ei PR:ää.

## Muutos

`js/linssit/satelliitti-avaruus.js`: `ZOOMIN_LAHIN` 0,12 → **0,084**
(lähin sallittu korkeus = 0,084 × avauskorkeus, eli 30 % lähempänä).
Absoluuttinen lattia `ZOOMIN_POHJA` 0,1 ennallaan; se puree vain hyvin
leveillä ruuduilla. Fokuszoom (43 k10) ja muut linssit koskematta.

## Mittaus

Mittari `tools/savukkeet/mittaa-astro-zoomikatto.mjs` (uusi, ei vartija):
WebKit 390 × 844 dpr 3, Astronautin kamera avattu pelaajan eleellä,
kamera pyydetty korkeuteen 0,2 (rajan alle) → OrbitControls vetää sen
kattoon; sitten Välimeren itäosan yllä 8 s laattojen latautumiselle.

Avauskorkeus 4,257, piirtokangas 1122 × 2484, pallon tekstuuri 4k.

| katto | korkeus | näkyvä ala (lev. × kork.) | reliefilaatat | näyte ruudulla |
|---|---|---|---|---|
| 0,12 (ennen) | 0,511 | 14,6° × 28,5° | z5 | 1,52 laitepx |
| 0,09 (−25 %) | 0,383 | 10,8° × 20,8° | z5+z6 | 1,01 laitepx |
| **0,084 (−30 %, valittu)** | **0,358** | **9,9° × 19,3°** | **z6 (+z7)** | **1,08 laitepx** |
| 0,078 (−35 %) | 0,332 | 9,3° × 17,8° | z5+z6 | 1,17 laitepx |

Näyte = ruudun tarve (2484 / (53,43 × korkeus) px/aste) jaettuna
laattatason tiheydellä (675 · 2^z / 360 px/aste). Noin 1 laitepikseli
eli ⅓ CSS-pikseliä: **reliefi ei pikselöidy**. Terävyys tulee
reliefipyramidin laastarista; pelkkä 4k-pohja olisi jo vanhalla
katolla 8 laitepikselin näytteinä (uudella 11,4), joten 4k/8k-pohja ei
ole katon mittari. Laattakone vaihtaa tason tarpeen mukaan (z7 on
syvin, 240 px/aste).

Leveydeltään 9,9° kattaa Kreetan itäpään–Niilin suiston–Levantin
rannikon: Välimeren itäosa täyttää ruudun.

Kaappaukset: `docs/raportit/kaappaukset/zoomikatto-20260919/`
(`webkit-390-katto-0511-ennen.jpg` vanhalla katolla pallodiag-lokin
kanssa, `webkit-390-katto-0358.jpg` ja `chromium-390-katto-0358.jpg`
uudella).

## Testit

- `tests/satelliitti-avaruus.test.mjs`: uusi testi "zoomikatto 25–35 %
  lähempänä … eikä reliefilaastari pikselöidy" (siirtymä ja näyte z7:llä
  puhelimen mitoilla). Kaistan suhdeluvun yläraja 15 → 20 (1,3 / 0,084 =
  15,5) ja avauskokeen välitys `min > 0,5` → `> 0,3` (puhelimen uusi
  katto 0,36).
- `node --test tests/*.test.mjs`: 3655 / 0 hylättyä.
- Savukevartio `savuke-astro-pallo` (Chromium, Mac): **130 / 130 läpi**
  (musta pallo, Safarin rajat, kolme avausta, kehykset poikki).

## Havainto, EI korjattu (PAATOKSET 50 kohta 2 / Opus 1)

Samoissa kaappauksissa näkyy laattavikoja Välimeren yllä:

1. **Tummansininen suorakaide Kreetan ja Egyptin rannikon välissä**
   (Kreetan eteläpuolella, täsmälleen omistajan laitekuvan paikalla).
   Näkyy **sekä WebKitissä että Chromiumissa** 390 px:llä, vanhalla ja
   uudella katolla. Ei siis WebKit-kohtainen — todennäköisesti avomeren
   laatat, joita reliefipyramidiin ei ole poltettu (meripeitto), ja
   niiden kohdalla näkyy tumma pinta eikä reliefin meri.
2. **Väärän sisällön laatta** (valkoinen, lumi/jäätikkökuvio) Egeanmeren
   ja Länsi-Anatolian kohdalla, **vain WebKitissä** uudella katolla
   (`webkit-390-katto-0358.jpg`, vasen yläkulma). Chromiumissa sama
   kohta on oikein.

Mittari on käytettävissä toistoon: `KERTOIMET=1 SELAIMET=webkit`.
