# Cupola-kustannus iPad Pro 12.9 (M1), ce479c342-laitekäännös, 17.10.2026 17.44–17.50 (Julkaisija)
Skenaario sk-cupola-kustannus.txt, alku Lontoo (Pariisin uusi peli kaatui 2/2: signal 9 + applicationDidReceiveMemoryWarning heti intron aikana, lokit cupola-kustannus-ipad-20261017-1717 ja -1728). Jaksot 40 s, ensimmäinen 5 s jakso pois, KehysMittarin 5 s keskiarvot.

| jakso | n | kuvaa/s | gpuMs | p50 ms | p95 ms | lämpö |
|---|---|---|---|---|---|---|
| J0 perus | 7 | 29.7 | 62.6 | 33.4 | 37.8 | Normaali |
| J1 kehys pois | 7 | 29.0 | 64.0 | 33.4 | 37.5 | Normaali |
| J2 perus | 7 | 26.3 | 71.2 | 37.7 | 42.7 | Normaali |
| J3 pallo pois | 7 | 24.0 | 77.9 | 41.7 | 49.6 | Normaali |
| J4 kehys+pallo pois | 7 | 23.7 | 78.8 | 41.8 | 52.0 | Normaali |
| J5 perus | 7 | 21.6 | 85.6 | 48.7 | 57.2 | Normaali |
| J6 valot1 | 7 | 22.2 | 83.4 | 45.0 | 56.8 | Normaali |

Havainto: GPU-aika kasvaa ajan mukana jaksosta riippumatta (62,6 → 85,6 ms ~4,5 min:ssa, ~+5 ms/min); kehyksen tai pallon poisto ei laske sitä (J3/J4 ≥ J2). Kustannus ei siis ole kehyksessä eikä pallossa, vaan jossain, joka kasvaa Cupolassa ollessa (vrt. 15.00-ajon matkan jälkeinen 74 → 97 ms ja lokirivi 'kupoli valmis, raita jatkuu'). Lämpö Normaali koko ajan, ei muistivaroituksia.
