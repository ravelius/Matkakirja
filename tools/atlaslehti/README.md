# Atlaslehti — vanhan atlaslehden georeferointi pallolle (vedos 21.9.2026)

Kaava, jolla Stieler's Hand-Atlas 1875 No. 33 (Frankreich und die Schweiz)
väännettiin tasaväliseksi kuvaksi pallon kalvoa varten (`?atlas=1`,
js/atlaslehti.js). Työkansio: `ATLAS_KANSIO` (oletus `~/pyramidi-poltto/atlas/`),
jossa `stieler33.jpg` on Commonsin alkuperäinen skanni (PD, 35 Mt).

    node tools/atlaslehti/harmaa.mjs                 # harmaasävyraakadata (harmaa.raw + .json)
    node tools/atlaslehti/viivat.mjs m 1800 3200 …   # meridiaanit kaistoittain → merid.json
    node tools/atlaslehti/viivat.mjs p 3200 4600 …   # leveyspiirit → paral.json
    node tools/atlaslehti/sovita.mjs                 # kartioprojektio + korjauspolynomi → malli.json
    node tools/atlaslehti/vaanna.mjs 8192 ulos.webp  # vääntö tasaväliseksi RGBA-WebP:ksi

Malli (`stieler33-malli.json`, kopio tässä kansiossa) on sovitettu lehden
OMASTA asteverkosta: meridiaanit suorina (leikkaavat kartion kärjessä),
leveyspiirit kaarina, 36 leikkauspistettä, jäännösvirhe keskimäärin 4 px,
enintään 7 px skannissa (950 px/leveysaste ≈ 0,4–0,8 km). Ferro-meridiaani
= 20° länteen Pariisista (17,6628° W Greenwich). Selostus:
docs/raportit/atlas-vedos-20260921.md.
