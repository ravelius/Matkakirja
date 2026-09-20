# Pelikoodari → Fable: suorituskykyvartiot pois PR-portista (erä 0, 20.9.2026)

Omistajan päätös 20.9.2026 klo 18.05. Haara `pelikoodari-perf-portti`
(pohja origin/v1973-prep).

## Mekanismi

- Uusi sarja `suorituskyky` (tools/savukkeet/sarjat.json). Ajetaan vain
  schedule-ajossa (`taysi` = suorituskyky + harva + julkaisu) ja käsin
  (workflow_dispatch `sarja=suorituskyky`, paikallisesti
  `node tools/savukkeet/aja-sarja.mjs suorituskyky`). PR-valitsin
  (valitse-harvat.mjs) ei koskaan lisää sen rivejä.
- Apuri tools/savukkeet/suorituskyky.mjs: `vaadiAika =
  suorituskykyVaatija(vaadi)`. Kun rivin env asettaa
  `SAVUKE_SUORITUSKYKY=1`, aikaväite on OK/FAIL; muuten (PR-portti) sama
  mittaus tulostuu `INFO  suorituskyky rajoissa|YLITYS …` -rivinä. Yhtään
  vartiota ei poistettu.
- Sekaväitteet jaettu kahtia: toiminnallinen osa jäi porttiin.
- tests/savukesarjat.test.mjs vartioi: sarjat eivät jaa rivejä, `taysi` on
  summa, suorituskykyrivit asettavat lipun ja PR-portin rivit eivät,
  zoom-pan ei ole julkaisu-listassa, apurin INFO-muoto.

## Siirretyt rivit ja vartiot

| Savuke | Vartio | PR-portissa nyt | Suorituskykysarjassa |
| --- | --- | --- | --- |
| savuke-zoom-pan.mjs | koko savuke (kehysajan p95 pan/zoom, pitkät tehtävät, CPU-kuristus 6×) | ei aja | `savuke-zoom-pan.mjs` |
| savuke-pariisi-lahizoom.mjs | 8o "kamera liikkuu < 100 ms napautuksesta" | 8o = kamera liikkuu; 8o' INFO | `#390-suorituskyky`, `#1400-suorituskyky` (LOHKOT perus,liuska) |
| savuke-pariisi-lahizoom.mjs | 8c "napautus ajaa kameran < 2000 ms ja avaa liuskan" | 8c = ajaa ja avaa; 8c' INFO | samat rivit |
| savuke-reittihelmet.mjs | 7. fps ≥ 50 panoroinnissa (390, 1400) | INFO | `#suorituskyky` |
| savuke-astro-sumu.mjs | fps >= 50 | INFO | `#suorituskyky` |
| savuke-topografialinssi.mjs | "napautuksesta ensimmäiseen reliefikehykseen alle 400 ms" | kehys tulee ruudulle; aikaosa INFO | `#suorituskyky` |
| savuke-astro-pallo.mjs | "reliefi ehti pinnalle kahdeksassa sekunnissa" | reliefi ehti pinnalle (>0 ms); 8 s INFO | `#suorituskyky` (NAKYMAT=puhelin) |

Tunnettu punainen "8o. tyopoyta: kamera liikkuu <" siirretty
`#1400-perus`-riviltä `#1400-suorituskyky`-riville (nimi nyt 8o').

## Jätetty porttiin (mittaavat aikaa, mutta eivät ole flakanneet)

- savuke-siirtozoomi.mjs 5 "saaton kesto ±10 % ennallaan" — aikapohjainen
  animaatio, kesto ei riipu kuormasta.
- savuke-laivamatka-tanger.mjs "nopan napautus vie eteenpäin alle 3000 ms"
  — odotusaika, ei mittari.
- savuke-ihmisen-esitys.mjs "sisäänzoomaus on sekunnin lyhyempi" — vakio +
  ohjaajan kirjaus, ei kello.
- savuke-topografialinssi.mjs "avauksessa ei ole välähdystä" — kirkkaus
  kehyksittäin; punainen paikallisesti load 30:ssä (maksimi 162 vs raja 35).
  EI aikamittari, mutta kuormaherkkä — Fablen päätös, siirretäänkö sekin.
- savuke-pariisi-lahizoom.mjs 8m (v1979:n punainen "0.00 (—)") — ei
  aikamittari: nimiöitä ei ehtinyt syntyä (yhteisia 0). Kuormaherkkä.

## Mittaukset (Mac, load average 30, 336 Chromium/simulaattoriprosessia)

- tests: 3755 pass / 0 fail.
- savuke-astro-sumu 7/7 (fps 13 → INFO), savuke-reittihelmet 16/16 (fps 7 /
  3,7 → INFO), savuke-astro-pallo puhelin 65/65 (reliefi 2354 ms → INFO),
  savuke-pariisi-lahizoom 390-liuska 17/17 (8c' 1246 ms → INFO),
  savuke-topografialinssi 54/55 (aikaosa 924 ms → INFO; punainen on
  välähdysvartio, ks. yllä).
- savuke-zoom-pan SAVUKE_SUORITUSKYKY=1: 1/5 (p95 273 ms) — kuorma, ja
  juuri siksi se ei enää ole portissa.

## Avoin

- Schedule ajaa suorituskykysarjan samalla rinnakkaisuudella (6) kuin muut
  → rivit voivat olla punaisia myös yöajossa, jos simulaattorit käyvät.
  Ehdotus: aja-sarja.mjs ajaa suorituskykyrivit viimeisenä yksin
  (rinnakkaisuus 1) — oma pieni erä, jos Fable haluaa.
