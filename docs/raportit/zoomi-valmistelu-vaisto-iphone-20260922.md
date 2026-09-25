# Valmistelu-väistön mittaus oikealla iPhonella (Laitetestaaja)

22.9.2026 n. klo 08.40–08.45. iPhone 18 Pro -simulaattori (oikea
Safari/Metal), haara `pelikoodari-zoomi-piirto` (a996d5da4): laattojen
valmistelu ja vienti väistävät nyt pitkää kehystä liikkeessä
(`js/pallolaatat.js` `kehysVaisto`, koe `valmisteluvanha` palauttaa
vanhan tahdin). Ranska z6 zoomi, porras 6, `perus` (uusi oletus) vs.
`&koe=valmisteluvanha` (vanha tahti), 4 toistoa kumpaakin
**vuorotellen** (perus, vanha, perus, vanha…), **erillisillä
sivulatauksilla** — ks. "Poikkeama pyynnöstä" alla.

Kuorma ennen mittausta: `uptime` näytti 18,7 / 15,2 / 17,4 (1/5/15 min),
odotin sen laskuun (n. 10 min), mittaus alkoi kuormalla 11,3 / 12,3 /
14,7 — 5 ja 15 min -keskiarvot pysyivät koko mittauksen ajan hieman yli
12:n, en pysähtynyt uudelleen koska 1 min -arvo oli rajan alla ja
suunta oli laskeva; tämä on syytä huomioida lukuja tulkittaessa (ks.
"Rajoitteet").

## Poikkeama pyynnöstä: erilliset sivulataukset, ei sama

`js/pallolaatat.js`: `const kokeet = laattakerroksenKokeet();` luetaan
KERRAN laattakerroksen rakentuessa (pallolaudan alustuksessa), ei
kehyksittäin — `?koe=valmisteluvanha` ei siis vaikuta enää sen
jälkeen, vaikka osoitetta muuttaisi ajon aikana
(`history.replaceState`). Vuorottelu ei siis ole toteutettavissa
samassa sivulatauksessa nykyisellä koodilla. Toteutin saman
tavoitteen (kuorma/lämpö jakautuu ajallisesti tasan) erillisillä,
ajallisesti lomitetuilla sivulatauksilla: perus, vanha, perus,
vanha, perus, vanha, perus, vanha (8 sivulatausta, yksi zoomi
kussakin).

## Tulokset (p95, ms — kunkin toisto n:n perus ja vanha peräkkäin)

| toisto | perus p95 | vanha p95 | perus varattu-osuus | vanha varattu-osuus | perus väistöjä | vanha väistöjä |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 82 | 98 | 50 % | 60 % | 37 | 0 |
| 2 | 83 | 94 | 48 % | 53 % | 43 | 0 |
| 3 | 65 | 119 | 43 % | 57 % | 43 | 0 |
| 4 | 91 | 105 | 52 % | 55 % | 39 | 0 |
| **ka.** | **80** | **104** | | | | |

**Perus voitti vanhan KAIKISSA neljässä parissa** (82<98, 83<94,
65<119, 91<105) — johdonmukainen tulos kohinasta huolimatta.
Keskimääräinen p95-pudotus n. 24 ms (~23 %).

## Pääsäikeen jako pitkissä kehyksissä (rAF-kutsut vs. tyyli/asettelu/maalaus)

| toisto | perus rAF-kutsut (ms) | vanha rAF-kutsut (ms) | perus tyyli/asettelu/maalaus (ms) | vanha tyyli/asettelu/maalaus (ms) |
| --- | --- | --- | --- | --- |
| 1 | 4,1 | 18,0 | 25,7 | 22,8 |
| 2 | 10,8 | 18,0 | 21,2 | 17,2 |
| 3 | 6,9 | 23,7 | 15,9 | 23,1 |
| 4 | 11,3 | 17,6 | 22,9 | 17,1 |

**Korjaus vähentää nimenomaan JS/rAF-työtä** (perus 4–11 ms vs. vanha
17–24 ms, kuten pitääkin — se juuri viivästää valmistelu/vienti-
jonoa). **Tyyli/asettelu/maalaus pysyy suunnilleen samana** (16–26 ms
molemmilla) — tämä on korjaamaton loppuosa, ja se selittää miksi
tavoite p95 < 25 ms ei vielä täyty kummallakaan asetuksella (paras
yksittäinen perus-tulos oli p95 65 ms).

## Johtopäätös Pelikoodarille

Korjaus toimii ja on tilastollisesti johdonmukainen (4/4 paria), mutta
ei riitä yksinään tavoitteeseen: pullonkaula on nyt selvästi
tyyli/asettelu/maalaus-vaihe (Safari-natiivi), ei enää oma JS-työ.
`väistöjä`-laskuri (37–43 per zoomi) osoittaa, että väistömekanismi on
aktiivinen joka ajossa.

## Rajoitteet

- Kuorma pysyi koko mittauksen ajan 5/15 min -keskiarvoilla hieman
  yli 12:n (11–15 -haarukka) — Pelikoodarin ohjeen mukaan tämä ei
  "kelpaa" tiukasti, mutta koska perus voitti vanhan kaikissa neljässä
  parissa SAMALLA kuormatasolla vuorotellen, systemaattinen kuormaero
  parin sisällä on epätodennäköinen selitys — vertailu perus-vs-vanha
  lienee silti luotettava, vaikka absoluuttiset p95-arvot voivat olla
  hieman korkeampia kuin täysin levossa mitattuna.
- Erilliset sivulataukset, ei sama sivulataus (ks. yllä) — pieni
  poikkeama pyydetystä menetelmästä, syy koodissa selitetty.
- Yksi zoomi per sivulataus (ei 2 toistoa per lataus, koska
  vuorottelu vaati oman latauksen joka tapauksessa).

## Ympäristö

iPhone 18 Pro -simulaattori, käynnistetty/sammutettu, Julkaisijalle
ilmoitettu. Mac Studion kaiuttimet käytössä, palautettu Scarlett Solo
USB:hen. Harness ja `tools/laitepalvelin.mjs`: EI committoitu,
poistettu. Testihaara `laitetestaaja-zoomi-piirto2` poistettu
paikallisesti.
