# BUILD 150 lyhyt savu (959abb6f, app ea457278) — OK (16.26–16.28, iPhone-sim 1572C658, mykkä)

TODISTUS.md: `/Users/Shared/Claude/proto-3d/lokit/todistus-build150-ea457278-20261006-1626/TODISTUS.md` (kopio `todistus-build150-ea457278-20261006.md`). **0 Exception, 0 VIRHE-riviä, 0 kaatumista.** Toimintatesti (simulaattori).

**Rivi: `BUILD 150 (959abb6f, ea457278): OK — käynnistys, kartta, opas auki (Prahan linna täky → pysäkki, PCM-ääni rms 0,110), Poistu → kartta ehjänä; 0 Exception, 0 kaatumista.`**

| Kohta | Tulos |
|---|---|
| Käynnistys, kartta (Liiku näkyy), natiivi mykistys | OK |
| Opas auki: täkyt → Prahan linna → pysäkki | OK: `opas: vastaus 1 Prahan linna`, `1. pysähdys, muisti: varattu 326 Mt, varaus 533 Mt, mono 399 Mt, tekstuurit 933 Mt`; ääni `aani mittaa` rms 0,110 huippu 0,678 `[opas-pcm]` |
| Poistu linssistä → kartta ehjänä | OK (`build150-ea457278-kartta-oppaan-jalkeen.png`) |
| **Muistioikeus (increased-memory-limit)** | **EI TODENNETTAVISSA simulaattorissa**: entitlement ei näy `Info.plist`issä eikä simulaattoriapin allekirjoituksessa (codesign: ei entitlementia); vaikutus (kaatumisraja laitteella) vaatii laitekäännöksen/TF:n. Simulaattorissa vain regressiosavu |
