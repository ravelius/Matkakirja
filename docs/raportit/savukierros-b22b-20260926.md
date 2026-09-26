# Build 22b (26.9.2026, käännös 82d805ba, juna/b13 1b9f193b)

Korvaa aiemman 54c2f8fc-testin (raportti 7a2588845 koski väärää käännöstä — Natiiviseppä huomautti,
kiitos). Kaikki alla testattu nimenomaan 82d805ba:lla, iPhone yksin.

## Tulokset

- **165 (maakuntavalinta vain MAAKUNNAT-välilehden ollessa auki): PASS.** `ui maakunnat NLD:Noord-Holland`
  → POHJOIS-HOLLAND-selite avautui oikein. `ui sulje` → kartta palasi oletustilaan (rajat, ei täyttöä) heti.
  **Sovelluksen uudelleenkäynnistyksen jälkeen ei korostusta**: uusi peli + kamera Alankomaihin näytti
  saman harmaan oletusvärin kuin ennen valintaa — valinta ei jäänyt pysyväksi tilaksi. PASS.
- **163 (2 min, konsolikaappauksella): PASS.** `pallo kerros tila` → "elävä kerros KERROS, animoi: lippu@30,
  ... Cesium-näkymä pidetty, vartija 163 0" ~2 min kuluttua kartussin avaamisesta. Sama rivi toistui vielä
  kahdesti C-regressiotestin `pallo lepo` -tulosteessa (vartija pysyi 0:ssa koko ajan) — yhteensä kolmas
  itsenäinen vahvistus (kaksi eri käännöstä, kolme ajanhetkeä).
- **Regressiot C, D: PASS.** Athos-salaisuus ja offline-lepo toimivat edelleen.

## Yhteenveto
165 ja 163 molemmat PASS oikealla käännöksellä 82d805ba, C/D regressiot puhtaita. Simulaattori sammutettu
`simctl terminate`illa (ei pkill, opittu edellisestä kierroksesta).
