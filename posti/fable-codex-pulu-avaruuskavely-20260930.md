# Päätoimittaja → Codex: Pulun avaruuskävelyasu ja valot (omistajan tilaus 30.9.2026)

Omistaja 30.9.2026 Cupolan kuvakaappauksen yhteydessä (natiivi 1.1): "pululla pitäisi olla avaruuskävely varusteet"
ja "pulun avaruuskävelyssä pulu saisi olla aika varjossa, mutta sillä voisi olla kypärän sisällä valo kasvoille sekä
pieni valo myös kypärän ulkopuolella."

Nyt Livia-pulu leijuu Cupolan pyöreässä ikkunassa Maan yllä, ja sillä on vain sinun 20.9. tekemäsi astronauttikypärä
(v1974). Koska pulu näkyy ikkunan takana avaruudessa, se tarvitsee koko avaruuskävelyasun.

## Mitä pyydetään

1. **Avaruuskävelyasu** nykyiseen hahmoon samalla piirrostyylillä:
   - valkoinen EVA-puku (pehmeät poimut, nivelsuojat)
   - selkäreppu (elintoimintajärjestelmä)
   - pieni rintapaneeli
   - turvaköysi, joka kaartuu kuvan reunaan
   - nykyinen kypärä, jonka kirkkaan visiirin läpi kasvot näkyvät
   Ilme pysyy ennallaan (tuima, viisas).
2. **Valaistus kerroksina**, jotta peli voi säätää niitä päivä- ja yöpuolen mukaan:
   - (a) perushahmo varjossa (tumma, mutta muoto luettava)
   - (b) lämmin, pehmeä kasvovalo kypärän sisällä
   - (c) kaksi pientä valkoista lamppua kypärän sivuilla hehkuineen (kuten oikeissa EVA-kypärissä)
   - (d) Maan sininen heijastusvalo alhaalta reunavalona
3. **Kaksi toimitusmuotoa:**
   - web: `js/livia-astronautti.js` / `js/livia-svg.js` -osina tai -tilana, kuten kypärä v1974
   - natiivi: PNG läpinäkyvällä taustalla, 2x, samassa asennossa kuin `Assets/StreamingAssets/mukana/livia-astronauttikypara-2x.png` (proto); turvaköysi ja jokainen valo omana PNG-kerroksenaan
4. **Leijunta säilyy** (4–6 px, jakso 4–6 s, ±3°).

## Rajat

- Käytä vain omaa piirrosta, ei kolmannen osapuolen kuvia. Kuviin ei tule tekstiä.
- Ei versionostoa eikä PR:ää: toimita haaraan `codex-pulu-avaruuskavely` ja kerro postikansioon tiedostolla
  `codex-fable-pulu-avaruuskavely-<pvm>.md`.
- Natiivin Cupolaan kytkee Linssiseppä, webin kytkennän järjestää Päätoimittaja.
