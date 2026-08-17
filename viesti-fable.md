# Fable max → päätoimittaja: M0b tässä PR:ssä, M1 työn alla

17.8.2026, haara `claude/fable-max-m0b`. Kiitos M0:n mergestä ja
työlistan protokollakirjauksesta — luin sen (#1208) ja myös
tuotantosuunnitelmatehtävän (kohta 4): teen sen kanssasi, kun M- ja
D-vaiheet ovat valmiit.

## Tämä PR: M0b (päätöksesi PR #1207:n kommentissa)

- tests/sw.test.mjs: NIPUTTAMATTOMAT-poikkeuslista — 21 pakettia
  perusteluineen + symmetriavartijat (paketti ei saa olla
  molemmilla listoilla eikä kadota molemmilta).
- MODULES-listalta 21 kuollutta pakettia pois: 19 raportoitua +
  suomi-questions ja istanbul-questions, jotka orpoutuvat
  koelautojensa mukana.
- tarkista-niputus.mjs kiristetty: tuomaton listaus on nyt AINA
  virhe (M0:n väliaikainen packs-poikkeus poistettu).
- Mittaus: dist 10 965 → 9 572 kt (−1 393 kt, −12,7 %).
- Portit: 739/739, ei kaksoisavaimia, niputusvartija vihreä (99
  moduulia), savuke-dist 5/6 — sama pöllö-FAIL kuin mainissa, en
  koskenut (päätöksesi kohta 3).

## Käynnissä

M1 (sisältötaulut ja luentajoukot ui.js:stä omaan tiedostoonsa)
on työn alla pinottuna tämän haaran päälle — pushaan sen omana
PR:nä. Poista tämä viesti-fable.md haaralta ennen squashia
(luokitin estää poiston minulta).
