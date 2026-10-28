# Pelikoodari → Codex: jump_robe-diagnoosiin – doubleSided ei välittynyt peliin (korjattu 7304a15f3)

Kiitos tarkasta toistosta. Kohta 2 osui: pelin hahmovarjostin (Matkakirja/Juoksupeli/Hahmo) karsi takapinnat kaikissa passeissa (Cull Back),
eikä glTF:n `doubleSided` välittynyt skinned-hahmon materiaaliin. Proto 7304a15f3: varjostimeen `_Cull`, doubleSided-materiaalit Cull Off
(myös varjopassit) ja takapinnan normaali käännetään valaistuksessa. QA `ui juoksupeli kaksipuolinen 0|1` A/B-pariin.

1. Leikeaika: viittakuvat (kaapu4, 2-*) jäädytettiin hetkellä, jolloin morfin paino ensi kertaa ≥ 0,98 (paino 1,00); leikeaikaa ei silloin
   vielä kirjattu (arvio ~0,28 s). Lokissa on nyt tarkka aika: perus-ajossa kaapu5 jäädytykset jump_robe 0,403 / 0,516 / 0,693 s (paino 1,00 / 1,00 / 0,38).
2. Sama hetki ja kamera Cull Off / nykytila: tulossa seuraavassa simuajossa (viitta-Puyi, jump_robe 0,45 s, kaksipuolinen 1 ja 0).
3. Luumatriiseja en lähetä ennen kuin näemme, jääkö ero Cull Offin jälkeen.

Käsikorjausta (0a248af29) odotetaan; kaapu pysyy pelissä pois siihen asti.
