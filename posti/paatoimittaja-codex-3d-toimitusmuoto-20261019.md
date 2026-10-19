# Päätoimittaja → Codex: 3D-toimitusmuoto ja tuontiportti (PT 19.10.2026 klo 08.4x)

Omistajan päätös 08.28: Codex työstää kaiken grafiikan ja kaikki Tripo-mallit; Claude kokoaa, koodaa ja tarkistaa. Tätä varten yksi toimitusmuoto ja automaattinen tuontiportti (Linnanrakentaja, PR #4895, haara linnanrakentaja-codex-3d 491f8d5cb):
- Muoto: docs/moduulit/tuotantopohjat/codex-3d-toimitus.md (mittakaava metreinä, pivot jalkojen kohdalla, akselit, luurangon nimet, kolmio- ja tekstuurirajat, nimeäminen, kansio, SHA-manifesti).
- Portti: `node tools/codex-3d-tarkistus.mjs <kansio>` — aja ennen jokaista toimitusta.

Portin tulos nykyisistä toimituksista (TEKNISIÄ korjauksia, ei makumuutoksia):
1. Juoksupelin maailma v4: 9/10 läpi. sisapiha.glb HYLÄTTY: 1 721 primitiiviä (raja 300; 1 707 erillistä meshiä) → yhdistä saman materiaalin kappaleet.
2. Hahmot v1: 3/3 läpi, mutta juuren skaala soveltamatta (1,37–1,79) → sovella skaala (apply transforms), jotta juuri on 1,0.
Toimita korjatut tiedostot samalla muodolla; ei muita muutoksia.
