# Aloituslento v2: käsikirjoitus, aikajana ja mittaus (Natiiviseppä 27.9.2026 klo 23.3x)

Omistajan palaute v7:stä (Fable 23.0x) toteutettuna: haara proto `natiiviseppa/aloitusrata` cf6b3d6f (junan päällä, ei junassa). Video tehdään aamulla, kun
Karttasepän yöpoltto on ohi (yötauolla ei käännöksiä eikä simulaattoreita). Mitat alla ovat radan omasta mallista 60 Hz:n
näytteinä (Kartta-testit/AloituslennonRataTestit, 7 kohdetta, kaikki säännöt läpi).

## Käsikirjoitus (Ateena, 15 s)

| s | vaihe | kamera | kone ruudulla |
|---|---|---|---|
| 0–4 | AVAUS: lähtö kaukaa | napautettu pallonäkymä (7 600 km, suoraan alas) rullaa hitaasti lähemmäs ja kallistuu 60°:een: silmä Välimeren/Afrikan rannikon yllä, katse pohjoiseen (luoteeseen), pallon reuna näkyy | pienenä (12 % leveydestä) Lontoossa, lähtee kohti kameraa etuviistosta (α 23–37°); Lontoo ja punainen viiva näkyvät vasemmassa yläosassa |
| 4–6,3 | KIRI | kuminauha kiihtyy: 1 800 → 30 km, kääntyy koneen oikealle kyljelle (suunta 330° → 34°), kallistus 82° | kone siirtyy kuvan vasempaan reunaan |
| 6,3–7,9 | OHITUS | kamera jarruttaa ja lähes pysähtyy koneen oikealle puolelle 6–8 km:n korkeuteen, Po-laakso ja Alpit taustalla | kone lipuu VASEMMALTA OIKEALLE (x −0,55 → +0,36), lähimmillään 23 km ja 52 % ruudun leveydestä, kyljestä (α 78–87°) |
| 7,9–10,8 | YLILENTO | kamera ohittaa koneen ja nousee (900 km) Italian ja Adrianmeren yli Ateenan taakse, kääntyy katsomaan taaksepäin | kone ohitetaan: α 84° → 22° (kyljestä eteen), 12 % leveydestä |
| 10,8–13,2 | SAAPUMINEN | kamera Ateenan kaakkoispuolella 150 km:ssä kiertää laskeutumiskohtaa (suunta 325° → 4°) | kone saapuu etuviistosta (α 7–49°), laskeutuu 13,2 s |
| 13,2–15 | PALJASTUS | nousee ja suoristuu: 135 → 1 795 km, kallistus 50° → 0°, pohjoinen ylös = pelin saapumisnäkymä (sama kohta, josta peli jatkuu) | kone Ateenassa |

Kuminauha: kanavat (etäisyys, kallistus, suunta, koneen ruutupaikka) ovat avainkehyksiä, joita vaimennettu jousi seuraa. Kamera
kiihtyy, ylittää hieman ja asettuu, eikä se ole missään kohdassa paikallaan (testi: liike > 0 joka 1/60 s, ei nykäyksiä).
Kone on seepiaruskea Tiger Moth (ennen kangas paperia #efe4cc). Kaukana kone on symbolinen: siipiväli 5 % etäisyydestä, joten se
näkyy aina vähintään 11,6 %:n levyisenä.

## Mittaus kohteittain (jokainen 1/60 s)

Säännöt: kone kuvassa |x|, |y| ≤ 0,92 eikä pallon takana; α (katselukulma keulasta, 180 = takaa) ≤ 100°, kun kamera ei ole
yläpuolella; ohitus vasemmalta oikealle ≥ 30 %; saapuminen α ≤ 75° ja kohde kuvassa; Lontoo kuvassa 0,3–4,3 s; kamera ≥ 1,5 km.

```
kohde | reitti km | kone pienin % | α suurin ° (korotus < 60°) | ohitus suurin % | saapuminen α ° | kamera matalin km
ateena   |  2392 |  11,6 |   87 |    52 | 7–49 | 6,4
rooma    |  1434 |  11,6 |   87 |    52 | 7–49 | 6,4
istanbul |  2501 |  11,6 |   87 |    52 | 7–49 | 6,4
lissabon |  1585 |  11,6 |   87 |    52 | 0–49 | 6,4
pariisi  |   343 |  11,6 |   87 |    52 | 7–49 | 6,4
kairo    |  3512 |  11,6 |   87 |    52 | 7–49 | 6,4
moskova  |  2501 |  11,6 |   87 |    52 | 7–49 | 6,4
ateena: reitti 2392 km, matkanopeus 0,14 / 1,71 kameran etäisyyttä/s
```

## Aikajana 0,5 s välein (Ateena)

```
ateena: reitti 2392 km, matkanopeus 0,14 / 1,71 kameran etäisyyttä/s
   t s | katse km | kall ° | suunta ° | kone x, y | koko % | α ° | korotus ° | kone km | kamera km | kone reitillä km
   0,0 |   7597,0 |   0,0 |      0 | −0,68,  0,65 |  10,9 |   23 |    46 |  8541,6 |  7597,0 |      0 | Lontoo −0,66,  0,63
   0,5 |   7564,6 |   0,2 |    360 | −0,66,  0,63 |  12,3 |   24 |    48 |  8415,0 |  7564,6 |      0 | Lontoo −0,64,  0,61
   1,0 |   7118,6 |   2,7 |    359 | −0,62,  0,60 |  12,2 |   25 |    49 |  7906,4 |  7114,9 |      9 | Lontoo −0,60,  0,58
   1,5 |   5948,7 |  10,2 |    355 | −0,50,  0,53 |  12,1 |   29 |    50 |  6601,1 |  5900,3 |     91 | Lontoo −0,53,  0,52
   2,0 |   4457,9 |  22,2 |    349 | −0,33,  0,41 |  11,9 |   32 |    48 |  4942,2 |  4262,4 |    277 | Lontoo −0,48,  0,45
   2,5 |   3190,9 |  36,1 |    342 | −0,13,  0,27 |  11,8 |   33 |    42 |  3498,9 |  2774,4 |    496 | Lontoo −0,47,  0,39
   3,0 |   2364,9 |  48,5 |    336 |  0,05,  0,15 |  11,7 |   30 |    35 |  2519,6 |  1761,8 |    680 | Lontoo −0,47,  0,35
   3,5 |   1939,9 |  56,8 |    331 |  0,16,  0,08 |  11,7 |   27 |    30 |  1994,4 |  1238,5 |    823 | Lontoo −0,48,  0,32
   4,0 |   1798,2 |  59,9 |    330 |  0,20,  0,05 |  11,7 |   25 |    28 |  1816,8 |  1066,3 |    948 | Lontoo −0,50,  0,32
   4,5 |   1690,9 |  60,4 |    330 |  0,19,  0,05 |  11,7 |   25 |    28 |  1708,4 |   984,3 |   1068 | Lontoo −0,59,  0,35
   5,0 |    853,2 |  64,0 |    340 |  0,04,  0,05 |  11,8 |   31 |    24 |   869,4 |   420,7 |   1158 | Lontoo −1,50,  0,41 (ei)
   5,5 |    189,8 |  72,1 |      3 | −0,24,  0,06 |  13,2 |   50 |    16 |   199,1 |    64,1 |   1186 | Lontoo −4,93,  0,26 (ei)
   6,0 |     47,3 |  79,6 |     25 | −0,48,  0,06 |  24,8 |   70 |     9 |    53,9 |    12,1 |   1191 | Lontoo −14,84, −0,35 (ei)
   6,5 |     29,2 |  82,1 |     34 | −0,55,  0,06 |  33,9 |   78 |     6 |    36,9 |     7,7 |   1193 | Lontoo −32,85, −1,25 (ei)
   7,0 |     25,9 |  82,6 |     34 | −0,25,  0,02 |  42,8 |   81 |     7 |    28,4 |     7,0 |   1196 | Lontoo −32,63, −1,24 (ei)
   7,5 |     23,4 |  82,9 |     33 |  0,02, −0,00 |  51,9 |   83 |     7 |    23,0 |     6,5 |   1198 | Lontoo −30,03, −1,13 (ei)
   8,0 |     27,7 |  82,2 |     32 |  0,36, −0,02 |  46,1 |   87 |     8 |    26,2 |     7,4 |   1201 | Lontoo −27,19, −0,99 (ei)
   8,5 |     39,7 |  79,9 |     29 |  0,38, −0,00 |  33,4 |   84 |    10 |    37,4 |    10,3 |   1216 | Lontoo −19,73, −0,59 (ei)
   9,0 |    209,2 |  68,4 |     14 |  0,22,  0,09 |  12,6 |   66 |    19 |   222,9 |    81,9 |   1295 | Lontoo −6,59,  0,25 (ei)
   9,5 |    884,2 |  58,5 |    359 |  0,12,  0,15 |  11,7 |   48 |    27 |   966,8 |   503,1 |   1748 | Lontoo −2,66,  0,47 (ei)
  10,0 |    828,1 |  58,5 |    354 |  0,10,  0,16 |  11,8 |   39 |    26 |   916,1 |   469,1 |   2287 | Lontoo −2,37,  0,49 (ei)
  10,5 |    298,1 |  63,0 |    338 |  0,04,  0,22 |  12,3 |   22 |    21 |   355,2 |   140,6 |   2352 | Lontoo −1,59,  0,52 (ei)
  11,0 |    149,7 |  66,0 |    325 | −0,00,  0,25 |  13,3 |    8 |    17 |   189,8 |    62,3 |   2377 | Lontoo −0,63,  0,47 (ei)
  11,5 |    145,9 |  64,9 |    326 | −0,00,  0,24 |  13,4 |    9 |    18 |   183,0 |    63,3 |   2387 | Lontoo −0,69,  0,51 (ei)
  12,0 |    143,8 |  59,3 |    336 |  0,00,  0,17 |  13,7 |   19 |    26 |   164,1 |    74,5 |   2389 | Lontoo −1,55,  0,70 (ei)
  12,5 |    137,4 |  52,6 |    351 | −0,00,  0,08 |  14,2 |   35 |    35 |   143,7 |    84,4 |   2391 | Lontoo −3,19,  0,90 (ei)
  13,0 |    135,0 |  49,9 |      4 | −0,00,  0,01 |  14,5 |   47 |    40 |   135,8 |    87,8 |   2392 | Lontoo −4,84,  0,90 (ei)
  13,5 |    162,7 |  46,3 |      7 | −0,00, −0,00 |  13,6 |   50 |    44 |   162,6 |   113,4 |   2392 | Lontoo −5,41,  0,98 (ei)
  14,0 |    449,1 |  26,8 |      5 | −0,05, −0,02 |  11,8 |   47 |    64 |   446,8 |   404,0 |   2392 | Lontoo −5,28,  1,65 (ei)
  14,5 |   1390,6 |   4,9 |      1 | −0,15, −0,07 |  11,6 |    4 |    86 |  1388,6 |  1386,4 |   2392 | Lontoo −3,94,  1,73 (ei)
  15,0 |   1795,0 |   0,0 |      0 | −0,18, −0,08 |  11,7 |   91 |    86 |  1798,3 |  1795,0 |   2392 | Lontoo −3,44,  1,58 (ei)
```
