# Juna 156 savu (app 59f03c63, runko 0be6243e) — OK (04.44–04.53, iPhone-sim 1572C658, mykkä)

TODISTUS.md: kopiot `todistus-juna156-59f03c63-{a,b}-20261007.md`. **0 Exception, 0 VIRHE-riviä, 0 kaatumista.** Testimykistys natiivi päällä.

**TULOS 156 (59f03c63): OK — kylmäkäynnistys + Jatka matkaa, opas (Eiffel → Vaihda kohde → Amsterdam 1. napautuksella, vastaus), linna (v41) avaus, saapumiskierros ja Keittiö-kuunnelma; 0 Exception.**

| Kohta | Tulos |
|---|---|
| Build 59f03c63 = kaannos.txt | OK |
| Kylmäkäynnistys → Jatka matkaa → kartta "Marseille," | OK |
| Opas: täkyt 50, Eiffel-torni saapui, ☰ → Vaihda kohde → Eurooppa → Alankomaat → Amsterdam (1. tap), vastaus 7,2 s | OK |
| Linna: avaus (liekkiatlas, saapuminen, kierros 4 jaksoa/70 s, kertoja 3 jaksoa, avainsanaero −21/−37 ms), ≡ → Huoneet 7 riviä | OK |
| Keittiö (oikea tap) → `kuunnelma keittio alkaa`, kertaäänet, huone näkyy (`juna156-59f03c63-keittio.png`) | OK **kun saapumiskierros on päättynyt** (ajo b, tap +75 s) |
| Orbit 4 vetoa: kamera/tilamittaus ennen ja jälkeen sama (tiloja 8/9, 293 662 kolmiota) | OK |

**Havainto (epäilty, ei varmistettu viaksi):** jos Keittiö napautetaan kesken 70 s saapumiskierroksen (ajo a, tap ~+15 s), valikko sulkeutuu mutta huoneeseen ei siirrytä eikä `kuunnelma alkaa` -riviä tule (kierros jatkuu). Ei tiedossa, onko tämä ollut aiemmin samoin; Natiivi-UI/Linnan omistajalle tiedoksi. Ajo b (kierroksen jälkeen) toimii.

Ei testattu: kuorma (load 27–113, vain toimintatesti), Kysy-kysymyksen napautus, kaupunkikierros, ISS, ääni (mykkä), linnan huonesiirto huoneesta toiseen.
Siivous: sovellus poistettu simusta, 1572C658 Shutdown.
