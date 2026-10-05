# iPad 00008103 Mixamo A/B -uusinta (B = 30eeea04a87289c9) — 5.10.2026 klo 12.44–12.51: EI KELPAA, uusittava

Raakadata `/Users/Shared/Claude/proto-3d/lokit/laitetestaaja-ipad-mixamo2/{A,B}/`. 0 Exception kummassakin.
- **A (2296811421200485): linna ei latautunut kunnolla** — `poikki: latausvirhe (ei edistystä 60 s, odotettiin 119,2 s, kuori kesken, tilat 1/9, hahmot 10/10, ympäristö kesken)`;
  mittaus ruudulla Lepo/Paikallaan, 30 fps (33,3 ms), ei vertailukelpoinen (ensimmäisessä ajossa 60 fps, CPU main 4,40 ms). Kuva kappeli otettu keskeneräisestä linnasta.
- **B (30eeea04):** linna auki, 60 fps (lokin kehysajat p50 16,68 ms), mutta `cpu-kaikki.txt` ja `cpu-kehys.txt` ovat A:n vanhat tiedostot (aikaleima 12.47.34) —
  `cpu mittaa 15 kaikki` kuitattiin (`ok [Kartta]`), mutta sen tulostiedostoa ei haettu uutena eikä toista `cpu mittaa 15` -komentoa kuitattu lokissa.
  Skinnausrivejä 0 (kaikki mittaus ei tuottanut rivejä tässä ajossa).
- Päätelmä: uusinnasta ei voi päätellä A vs B. Edellinen ajo (`ipad-mixamo-ab-20261005.md`, B = 321b971721f2ef7c) pysyy ainoana kelvollisena: kehys A≈B.
- Ehdotus: B-vain-uusinta (iPad vapaa, linna 2296811421200485 ennallaan): odota linnan `ympäristö valmis` + `cpu mittaa 15 kaikki` jälkeen ≥ 25 s ennen `hae`a; poista
  edellinen `Documents/cpu-mittaus.txt` ennen mittausta, jotta vanhaa tiedostoa ei haeta; A ajetaan uudelleen vasta kun linna latautuu (verkko/CDN-hitaus 12.45).
