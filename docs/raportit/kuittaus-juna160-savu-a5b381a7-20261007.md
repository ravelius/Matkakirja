# Juna 160 rutiinikierros (app a5b381a7) — OK (12.43–12.49, iPhone-sim 1572C658, mykkä)

TODISTUS.md: `todistus-juna160-a5b381a7-a-20261007.md` (kansio `proto-3d/lokit/todistus-juna160-a-20261007-1243/`). **0 Exception, 0 VIRHE-riviä, 0 kaatumista.** Testimykistys natiivi päällä. Kone kuormassa (load 321) → toimintatesti, ei fps/laatu/A-V.

**TULOS 160 (a5b381a7): OK — kylmäkäynnistys + Jatka matkaa, opas (täkyt, Eiffel saapui, ☰ → Vaihda kohde → Eurooppa → Alankomaat → Amsterdam 1. napautuksella, vastaus), linna (avaus, Huoneet → Keittiö-kuunnelma, orbit); 0 Exception.**

| Kohta | Tulos |
|---|---|
| Build a5b381a7 = kaannos.txt | OK |
| Kylmäkäynnistys → Jatka matkaa → kartta | OK |
| Opas: täkynäkymä (SUOSIKIT), Eiffel-torni saapui (ääni soi), vastaus 1,2 s | OK |
| Vaihda kohde: täkynäkymässä nyt "TAI VALITSE PAIKKA" ylhäällä (täkyt 9, ei 50) → Eurooppa → Alankomaat → Amsterdam, `opas: kohde Amsterdam`, `kaupunki vaihtuu`, vastaus | OK |
| Linna: avaus, ≡ → Huoneet → Keittiö (tap +75 s) → `kuunnelma keittio alkaa`, orbit 4 vetoa, kamera/mittaus ennen ja jälkeen sama | OK |

Ei testattu: Kysy-kysymyksen napautus, kaupunkikierros, ISS, ääni (mykkä), vaaka oikealla laitteella, Keittiö kesken saapumiskierroksen (156:n epäilty havainto).
Siivous: sovellus poistettu simusta, 1572C658 Shutdown.
