# Sulavuuden ablaatiotikas 21.9.2026 (Pelikoodari)

Omistajan menetelmä (Fable 21.9.2026 ilta): pallolauta rakennetaan portaittain kehittäjälipulla `?kerrokset=porrasN` (js/pallolauta/kerrokset.js) ja jokaisella portaalla mitataan kehysajat panoroinnissa (hiiren veto 3 s) ja zoomiajossa (kirjaston tween 0,2 → 0,067 → 0,2, 2 × 1,5 s). Mittari tools/savukkeet/mittaa-ablaatio.mjs, puhelinkoko 390 × 844 dpr 3, headless WebKit (Playwright webkit-2336) ja Chromium (--use-angle=metal), Mac Studio kuorma ~9. Ranska = saapumisnäkymä z6 (korkeus 0,2), Camargue = z8 (0,05). Kehyksen syy = laskurit, jotka muuttuivat juuri siinä kehyksessä (pyyntoja/purettuja = lepokerroksen laatat, jakoja = sovittimen jaot, rasterit = valmistuneet nimiö-/nostorasterit, rakennuksia = rungon rakennukset, tekstuurit = three.js renderer.info). Raakadata docs/raportit/kaappaukset/ablaatio-20260921/ablaatio-{webkit,chromium}.json.

Portaat: 1 laatat · 2 + vektorit · 3 + GL-nimet · 4 + GL-nostot ja nappula · 5 + CSS2D-kohteet · 6 + pulu, ui, äänet (= tuotanto). Nostojen CSS2D-jäänteet (ankkurit, liuskat, pisteet) kulkevat nostojen mukana portaalla 4.


## webkit

| porras | näkymä | panorointi med / p95 / max (ms) | >50 | zoomi med / p95 / max (ms) | >50 | zoomin pisimmän kehyksen syy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | ranska | 17 / 30 / 44 | 0 | 17 / 31 / 46 | 0 | pyyntoja 15, purettuja 4, jakoja 2, rakennuksia 1, tekstuurit -2 |
| 1 | camargue | 17 / 18 / 35 | 0 | 17 / 19 / 21 | 0 | jakoja 2, rakennuksia 1 |
| 2 | ranska | 17 / 19 / 23 | 0 | 30 / 68 / 92 | 26 | pyyntoja 9, jakoja 2, rakennuksia 1, tekstuurit 1 |
| 2 | camargue | 17 / 26 / 39 | 0 | 17 / 18 / 23 | 0 | jakoja 2, rakennuksia 1 |
| 3 | ranska | 17 / 18 / 23 | 0 | 17 / 33 / 74 | 2 | pyyntoja 18, jakoja 2, rakennuksia 1 |
| 3 | camargue | 17 / 20 / 21 | 0 | 17 / 20 / 29 | 0 |  |
| 4 | ranska | 17 / 39 / 43 | 0 | 45 / 167 / 252 | 19 | pyyntoja 3, purettuja 13, jakoja 3, rasterit 2, rakennuksia 1, tekstuurit -12 |
| 4 | camargue | 17 / 20 / 32 | 0 | 17 / 26 / 41 | 0 | jakoja 2, rakennuksia 1 |
| 5 | ranska | 17 / 21 / 42 | 0 | 19 / 61 / 78 | 12 | pyyntoja 6, tekstuurit 1, dom -4 |
| 5 | camargue | 16 / 21 / 46 | 0 | 17 / 27 / 50 | 0 | rakennuksia 1 |
| 6 | ranska | 17 / 36 / 51 | 1 | 20 / 49 / 73 | 7 | pyyntoja 9, jakoja 3, rasterit 1, rakennuksia 1, tekstuurit 1 |
| 6 | camargue | 17 / 21 / 37 | 0 | 17 / 20 / 29 | 0 | jakoja 3, rakennuksia 1 |

## chromium

| porras | näkymä | panorointi med / p95 / max (ms) | >50 | zoomi med / p95 / max (ms) | >50 | zoomin pisimmän kehyksen syy |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | ranska | 17 / 18 / 18 | 0 | 17 / 18 / 22 | 0 | pyyntoja 18, taso 1 |
| 1 | camargue | 17 / 18 / 24 | 0 | 17 / 19 / 22 | 0 | jakoja 2, rakennuksia 1 |
| 2 | ranska | 17 / 18 / 19 | 0 | 17 / 19 / 30 | 0 | pyyntoja 9, tekstuurit 1 |
| 2 | camargue | 17 / 18 / 25 | 0 | 17 / 19 / 23 | 0 | jakoja 2, rakennuksia 1 |
| 3 | ranska | 17 / 18 / 19 | 0 | 17 / 19 / 38 | 0 | jakoja 2, rakennuksia 1 |
| 3 | camargue | 17 / 18 / 19 | 0 | 17 / 18 / 30 | 0 | jakoja 2, rasterit 1, rakennuksia 1 |
| 4 | ranska | 17 / 18 / 19 | 0 | 17 / 47 / 200 | 8 | pyyntoja 4, purettuja 10, taso -1, jakoja 3, rasterit 2, rakennuksia 1, tekstuurit -9 |
| 4 | camargue | 17 / 18 / 23 | 0 | 17 / 18 / 27 | 0 | jakoja 2, rasterit 1, rakennuksia 1 |
| 5 | ranska | 17 / 18 / 20 | 0 | 17 / 34 / 221 | 5 | jakoja 5, rasterit 1, rakennuksia 1 |
| 5 | camargue | 17 / 18 / 21 | 0 | 17 / 18 / 30 | 0 | jakoja 2, rasterit 1, rakennuksia 1 |
| 6 | ranska | 17 / 19 / 329 | 1 | 17 / 19 / 24 | 0 | pyyntoja 15, jakoja 3, rasterit 1, rakennuksia 1 |
| 6 | camargue | 17 / 18 / 22 | 0 | 17 / 18 / 20 | 0 | jakoja 2, rakennuksia 1 |

## Havainnot

1. **Panorointi on kunnossa joka portaalla.** Chromium p95 ≤ 19 ms kaikilla portailla, ei yhtään > 50 ms:n kehystä (yksi 329 ms:n purkupiikki portaalla 6: LRU-purku 8 laattaa + DOM). WebKit-headless p95 18–39 ms; portaalla 4 pisimmät kehykset (40–43 ms) ovat pelkkää piirtoa ilman laskurimuutosta — rungon 134 instanssin piirto WebKitin headless-GPU:lla.
2. **Zoomi hyppää portaalla 4 (GL-nostot ja nappula).** Ranska: WebKit p95 33 → 167 ms (max 252, 19 kehystä > 50 ms), Chromium p95 19 → 47 ms (max 200, 8 kehystä > 50 ms). Jokaisessa pitkässä kehyksessä on sama yhdistelmä: **ladonta liikkeessä** (jakoja 3 = nimet + nostot + peli, rungon rakennus 1) **samassa kehyksessä kuin 1–6 rasterointia** (uusi kuoren porras → uudet nostorasterit) **ja 3–18 laattapyyntöä**. Ladonta kulkee zoomin mukana 200 ms:n tahdissa (lauta.js LADONNAN_TAHTI_MS), ja zoomissa jokainen ladonta on täysi: 134 noston keraa + suodatus + sovittimen jako + rungon geometria uusiksi.
3. Camargue z8 ei hyppää (WebKit p95 ≤ 27, Chromium ≤ 18): nostoja rungolla 22, joten sama ladonta on kuudesosa Ranskan saapumisnäkymän työstä.
4. Porras 2 (vektorit) zoomi WebKitillä p95 68 ms: kehyksissä 9 laattapyyntöä + tekstuurin luonti; Chromiumilla 19 ms. Laattojen esilataus zoomin suuntaan (Karttaseppä) kohdistuu tähän.
5. Portaat 5–6 eivät lisää kustannusta portaan 4 päälle (CSS2D-kohteet, pulu, UI, äänet).

## Ehdotus (tekstuurilataukset ja rasteroinnit pois liikkeen ajalta)

- **Ladonta liikkeessä kevyeksi:** zoomin ja panoroinnin aikana ei täyttä ladontaa; lepoladonta kattaa ruutua suuremman alueen (liikevara, haara pelikoodari-nostojen-liikevara), ja liikkeen aikana runko vain siirtää instansseja (kuoren kerroin, E2) — jako ja rungon rakennus vasta levossa tai kun kamera on siirtynyt liikevaran verran.
- **Rasterointi jonoon:** nostosymRasteri + createImageBitmap enintään yksi kehystä kohti liikkeessä, loput levossa; portaan vaihto käyttää vanhaa rasteria kunnes uusi on valmis (jo tehty: pelikoodari-glnimiot-vanha-rasteri), joten viive ei näy.
- **Rungon rakennus kerran per ladonta:** kolme jakoa (nimet, nostot, peli) → yksi asetaKaikki (nyt jokainen jako rakentaa puskurit).
- **Laattapyynnöt:** zoomiennakko ja pyyntöjen tahditus (Karttaseppä).

Tavoite (p95 < 20 ms, ei > 50 ms) täyttyy Chromiumilla panoroinnissa jo nyt; zoomissa se vaatii yllä olevat. Laitetestaaja toistaa portaat iPhonella samalla lipulla: `?lauta=pallo&kerrokset=porrasN`.
