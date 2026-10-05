# Junan 145 savu c2d40258 (app cba50a28) — PASS (23.39–23.43, iPhone-sim 1572C658)

TODISTUS.md: `/Users/Shared/Claude/proto-3d/lokit/todistus-juna145-c2d40258-20261005-2339/TODISTUS.md` (kopio `todistus-juna145-cba50a28-20261005.md`). Kone kuormassa (load 34 > 16) → toimintatesti, ei fps/laatu/A-V. **0 Exception, 0 VIRHE-riviä, 0 kaatumista.** Testimykistys natiivi päällä.

**PASS-rivi: `juna145-savu c2d40258 (cba50a28): PASS — käynnistys, kartta, opas (1 avaus, Pöllö vastasi: Tivoli, Nyhavn), ISS-ohjaamo, linna (Laituri) ja Poistu → kartta oppaan ja ISS:n jälkeen OK; 0 Exception, 0 kaatumista.`**

| Kohta | Tulos |
|---|---|
| Käynnistys, kartta | OK: Liiku näkyy, peli ja kartta ehjät |
| Opas (1 avaus) | OK: worker vastasi (ei 429), pysähdykset Kööpenhaminan Tivoli, Nyhavn |
| Kartta oppaan sulkemisen jälkeen | OK: laatat, nimet ja Liiku näkyvät; laattoja vielä latautumassa (laatat 56→97 %) mutta kartta ei tyhjä (`…-kartta-oppaan-jalkeen.png`) |
| ISS-ohjaamo, kartta ISS:n jälkeen | OK (still `…-iss.png`, kartta ehjä) |
| Linna (Olavinlinna): Laituri | OK: ≡ → Huoneet → Laituri oikeilla kosketuksilla, `kuunnelma laituri alkaa`, huonekortti "Laituri" + puhuja (`…-linna-laituri.png`) |
| Natiivi mykistys, asetukset datana | OK |
| EI testattu | Vaihda kohde -valikko, vastaussirut (Pöllön testitunnus ei vielä julki), kuvakytkin, ääniraita/A-V |
