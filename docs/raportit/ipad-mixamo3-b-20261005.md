# iPad 00008103 Mixamo B-uusinta (B = 30eeea04a87289c9, 11 hahmoa, glb 16 Mt) — 5.10.2026 klo 12.58–13.01: KELPAA

Raakadata `/Users/Shared/Claude/proto-3d/lokit/laitetestaaja-ipad-mixamo3/B/`. **0 Exception.** Korjattu skripti: `cpu-kaikki ok`, `cpu-kehys ok` (uudet tiedostot, aikaleimat 13.00.22 / 13.00.49).
Linna kappeli, 15 s / 900 kehystä, ruutu Taysi, iPad Pro 13 (iPad13,8, 7521 Mt), 60 fps.

| Mittari (B, kaikki 11 hahmoa Mixamo) | ka | p95 | max |
|---|---|---|---|
| CPU Main Thread Frame Time (ms) | 4,432–4,444 | 4,747–4,754 | 12,46–15,50 |
| GPU Frame Time (ms) | 9,466 | 11,674 | 15,021 |
| CPU Render Thread (ms) | 2,079 | 2,305 | 2,493 |
| CPU Total Frame Time | 16,676 | 16,780 | 16,898 |
| VSync-odotus (WaitForTargetFPS) | 12,243 | 12,688 | 13,698 |

- **Vertailu A (ilman Mixamoa, ajo 1):** CPU main ka 4,399 / p95 4,752 / max 13,152 → B:n CPU-ero ≤ 0,05 ms ka, p95 sama. GPU-kehysaikaa A:sta ei mitattu (ajo 1 vain Skin/kehys-suodatin), joten GPU-vertailua ei ole.
- **Muisti (B):** tekstuurimuisti (arvio) 10,3 Mt, kolmioita 273 280 (3d-hahmot 89 913), kärkiä 202 601, rendereitä 8 (`poikki mittaus`). A:n muistilukua ei ole → muistivertailua ei ole.
- **Skin-rivit:** 0 (Release-käännöksessä ei skinnaus-/animaatiomerkkejä "skin|anim|deform|bone"); skinnausaikaa ei saada erillisenä.
- Hahmot: `kappalainen-1500.glb` 74 solmua, skin 65 luuta, leikkeet idle,istuu,istuu_puhe,kavely,puhe,tyo. Still: `ipad-mixamo3-B-kappeli-20261005.png`.
- Johtopäätös: B mahtuu 60 fps:ään reilusti (GPU p95 11,7 ms, VSync-marginaali ~12 ms); CPU ei näe Mixamoa. Puuttuu vain A:n GPU/muisti, jos tarvitaan tarkka delta.
