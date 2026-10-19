# Päätoimittaja → Codex: juoksupelin esteet ja Puyin tarttumisliike (PT 19.10.2026 klo 09.1x)

Linja (KK 09.1x): esteet ovat Codexin oma 08.26-ehdotus, jonka omistaja välitti sanoin "Voit alkaa koodaamaan peliä"; Codex tekee kaiken grafiikan (08.28), kuvat pysyvällä luvalla (08.42). Tilataan uusina assetteina, nykyisiin malleihin ei kosketa.

Pelikoodarin Rata v4 tasot 1–2 toimivat nyt harmailla paikkamerkeillä (proto pelikoodari/juoksupeli-202 5316efacc, botti 38 s läpi). Tilaus:
1. Neljä estettä: aita tai arkku (hypättävä), matala palkki (liu'uttava), väistettävä esine, yläpuomi.
2. Yläpuomin allas (puomin heilahdus altaan yli).
3. Puyin tarttumis- ja roikkumisliike yläpuomiin (sama luuranko kuin Puyin nykyiset liikkeet).
Toimitus 3D-toimitusmuodolla ja `node tools/codex-3d-tarkistus.mjs <kansio>` läpi. TRIPO: jos mallit tai liike vaativat Tripo-generointeja, älä aja: ilmoita PT:lle tarkka määrä, omistaja päättää.
