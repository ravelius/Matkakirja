# Pohjan piilotus (PR #2779, kohta 2): ei aukkoja z7→z8-venytyksessä

Karttaseppä 22.9.2026 klo 12.10, Mac Studio (kuorma 5–9). Haara
`pelikoodari-sulavuus-1-3` (9e35eb5dc), WebKit 390 × 844 dpr 3, mittari
`tools/savukkeet/mittaa-pohja-aukot.mjs` (johdettu mittaa-zoomiennakko-meri.mjs:stä:
sama lento ja zoomi 0,2 → 0,067 → 0,022; renderin jälkeen `gl.readPixels`
24 riviltä joka kehyksellä, taustan väri avaruudesta [240,228,195]).

## Tulos: A (pohja piiloon, PR:n oletus) vs B (`?koe=pohjavanha`)

| Näkymä | Ajo | kehyksiä | pohja piilossa | alpha 0 -pikseleitä | taustaväriset px max / 26 928 | pisin jono | z7→z8 ms |
| --- | --- | --- | --- | --- | --- | --- | --- |
| meri | A | 249 | 229 | 0 | 1 538 | 364 px | 448 (426–448, 3 ajoa) |
| meri | B | 241 | 0 | 0 | 1 537 | 382 px | 632 |
| maa | A | 228 | 193 | 0 | 32 | 22 px | 814 (561–814) |
| maa | B | 235 | 0 | 0 | 22 | 9 px | 651 |

- Merellä taustavärisiä pikseleitä löytyy **samat määrät samoissa kehyksissä
  kummassakin ajossa** (1530/31 jonoa/364 px A:ssa ja B:ssä, kehys kehykseltä
  sama sarja) — ne ovat meren kermaväriä, joka on ±2 paperin väristä, eivät
  aukkoja. Pohja oli A:ssa piilossa koko venytyksen ajan (peittoOsuus 1,
  40/40 scenessä) eikä ainuttakaan alpha 0 -pikseliä syntynyt.
- Loppukaappaukset A vs B: meri keskiero 0,28/765 per pikseli (> 30 vain
  0,22 %), maa 0,22/765 (0,24 %) — JPEG-kohinaa ja pulu.
- mittaa-zoomiennakko-meri.mjs haaralla: vartiot 3/3 OK, meri 426–448 ms
  (tuotannon 347–477 ms:n haarukassa), maa 561–814 ms (kuorma).

Johtopäätös: kohta 2 ei avaa aukkoja merellä eikä maalla z7→z8-venytyksessä;
peittoehto (`peittaaKokonaan`: 81/81 näytettä pallolla, täysin häivytetty
laatta jokaisen alla) pitää venytyksen ajan, koska vanhan tason laatat
pysyvät scenessä kunnes uudet ovat perillä. Mergettävissä Karttasepän puolesta.

Toisto: `JUURI=<repo> PLAYWRIGHT_JS=… KOE='' node tools/savukkeet/mittaa-pohja-aukot.mjs`
ja sama `KOE='&koe=pohjavanha'`; aukko = luvut eroavat samoissa kehyksissä
tai alpha0 > 0.
