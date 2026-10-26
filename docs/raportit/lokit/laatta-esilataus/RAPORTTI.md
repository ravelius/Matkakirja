# Laattojen esilataus, erä 1: aloitus (build 22), Natiiviseppä 26.9.2026

Haara natiiviseppa/laatta-esilataus (juna/b13 19e5415e + pelikoodari/esilataaja-5 6ced5c90 + omat). Kylmä käynnistys
simulaattorissa FBBD41D7 (iPhone), aloitusnäyttö 8 s, aloituslento Lontoo → Ateena. Skripti: scratchpad musta-mittaus.sh
(kehittäjäliput defaults writella, pyyntöloki Documents/pyynnot.tsv).

## Juurisyy
Mustan verhon avausvaihe (Lontoo 450 km, 45°, suunta 220°) tarvitsee ~500 laattaa, joista kylmänä ~460 verkosta (maasto
Z6–Z8, pohja Z6–Z9, Blue Marble Z6–Z7; Z6-rasterit horisonttiin 8 000 km asti). Verkko ei ole täynnä (palvelimella 5–6
hakua), vaan Cesium etenee tason kerrallaan: lapset vasta vanhemman latauduttua, jokainen taso = verkon kiertoaika.
Katolla (4,4 s) verho lähti pallo 46–57 %:ssa; ilman kattoa avaus valmistui 7,3–8,1 s:ssa (pois-katto30, b-pois).

## Korjaus
- AvausLaatat (puhdas malli, testit): lähialue ≤ 500 km + katseen kiila ±42°, taso Cesiumin SSE:stä etäisyyden mukaan.
- Aloitusnäyttö: suunnasta riippumaton lähialue (561 laattaa) Esilataaja.Tehtava tasolla SeuraavaRuutu.
- Lennon alku (kohde tiedossa): kiila (867 laattaa) tasolla Nakyva, Verholle.
- Verhon aikana täysi ruudunpäivitys (Valmius.Verhossa → Ruudunpaivitys "verho").

## Tulokset (kylmä)
| ajo | avaus valmis | pallo verhon lähtiessä (katto 5 s) | aloitusverho |
|---|---|---|---|
| ennen (kylma2, k2, ennen2) | 7,3–8,1 s | 46–57 % | 4,5–5,4 s |
| geometrinen vain lennon alussa (b-geom) | 5,3 s | – | 4,7 s |
| lähialue + kiila (c-lahi-*) | 5,25 s | 83 % | 3,5–3,8 s |
Verkko-savuke (savuke-lahi1): RAJA saapuminen PASS 0 ms; laattojen osuma 13 → 20 %; Esilataajan odotus 11,6 → 8,4 s.

## Hylätyt
- CesiumCameraManager.additionalCameras -virtuaalikamerat: 3 leveää kiilaa aloitusnäytössä → Cesiumin jonoon 2 200–2 600
  laattaa, avaus 18,7 s; tarkka kamera lennon alussa → 16,8 s. Poistettu koodista.
- Verhon täysi taajuus yksin: musta 7,3 vs 8,1 s (lento pitää jo 60 fps); aloitusverho 3,8 vs 4,1 s. Pidetty (lippu).

## Kehittäjäliput (defaults write app.matkakirja.proto3d …, sovellus kiinni; eivät App Store -käännöksessä)
matkakirja-pyyntoloki 1 · matkakirja-mustan-katto <s> · matkakirja-avaus-esilataus 0 · matkakirja-avaus-malli "K,kartio,lisa" ·
matkakirja-verho-taysi 0
