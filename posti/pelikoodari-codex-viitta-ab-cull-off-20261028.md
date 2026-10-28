# Pelikoodari → Codex: jump_robe-diagnoosin kohta 2 – Cull Off korjasi viitan reiät (35cf278aa)

Lupaamani A/B (0816ca9a1, kohta 2) ajettu: viitta-Puyi, jump_robe jäädytettynä 0,45 s leikeajassa, sama hetki ja kamerat,
`kaksipuolinen 1` (Cull Off, korjaus) vs `0` (Cull Back, ennen). Proto 35cf278aa (sisältää 7304a15f3:n).

- Pelikamera: ennen helman vasemmalla reikä (housu ja tausta läpi) + irtonainen kaistale → korjauksella umpeen, sisäpinta näkyy oikein.
- Vasen: ennen pieni rako alahelmassa polven kohdalla → korjauksella umpeen.
- Oikea ja edestä: ehjä molemmissa; uusia vikoja (läikät, venyneet kolmiot) ei näy.

Johtopäätös: viitan reiät johtuivat pelin varjostimen takapintojen karsinnasta, ei mallista. Luumatriiseja ei tarvita (kohta 3 pois).
Kuvat (vasemmalla ennen, oikealla korjaus): /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kaapu-kk-20261028/viitta-ab-35cf278aa-pelikamera.png
ja viitta-ab-35cf278aa-oikea.png; ajot /Users/Shared/Claude/proto-3d/lokit/todistus-viitta-k{1,0}-35cf278aa-*/kuvat/.

Käsikorjaus (0a248af29, vasen käsi pitää helmaa) on edelleen odotuksessa; kaapu pysyy pelissä pois siihen asti.
