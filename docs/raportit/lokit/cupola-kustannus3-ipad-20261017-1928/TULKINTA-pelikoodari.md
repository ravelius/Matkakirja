# Cupola kierros 3 – tulkinta (Pelikoodari 17.10.2026 klo 19.58)

Ajo: JU 19.28–19.35, iPad Pro 12.9 M1, ce479c342-laitekäännös, sk-cupola-kustannus3.txt. Laite viileä alussa (thermal 0 klo 19.28.36).

## "Lämpö Kuuma jo c-taysi-kohdassa" ei pidä paikkaansa
Konsolissa lämpö on **Normaali (thermalState 0)** koko alun ajan aina c-taysi-kuvaan asti (t 101). Kuuma tuli vasta skenaarion
omasta `peli lampo kuuma` -rivistä (t 106.12, "pakotettu"), joka on c-taysi-rivin jälkeen. Lampo.Pakotettu ei jäänyt edellisestä
ajosta. → **Viileä täysprofiili saatiin; uusintaa ei tarvita.**

## Luvut (kehysajat 5 s jaksoin)
| Vaihe | GPU ms | kehys p50 | todellinen | thermal |
|---|---|---|---|---|
| Kartta Lontoossa (lepo) | 8–24 | 33,4 | 30 fps | 0 |
| Raketin laukaisu (t 76–86) | 85–103 | 50 | ~20 fps | 0 |
| Cupola, renderScale 1, viileä (t 91–101) | **63–73** | 37,9 | ~26 fps, kaikki kehykset yli 1,5 × tavoite | 0 |
| Cupola, lämpösuojan profiili (0,7, MSAA 1, bloom pois), t 111 → 412 | **22,4 → 18,3** | 33,35 | tasainen 30 fps | **0 koko 5 min** |

Muisti: fp-huippu 3,6 Gt, gfx 2,0 Gt, 0 muistivaroitusta.

## Johtopäätös
1. Kierrosten 1–2 tulkinta tarkentuu: Cupola on M1-iPadilla raskas **jo viileänä** (GPU ~70 ms renderScale 1:llä → alle 30 fps).
   Kuumeneminen pahensi tätä (kierros 2: 86 ms), mutta ei ole perussyy.
2. Lämpösuojan profiililla sama näkymä pysyy 5 min tasaisesti 30 fps:ssä, GPU-aika jopa laskee (22 → 18 ms) eikä laite
   lämpene (thermal 0 koko ajan). Varaa jää ~15 ms.
3. Suositus (PT → KK): **Cupola M1-iPadeilla (iPad13,x) suoraan lämpösuojan profiilissa** (renderScale 0,7, MSAA 1, bloom pois)
   koko Cupolan ajan. Kuvapari 1,0 | 0,7 terävyyserosta tarvitaan simusta (laite ei tallenna kuvia): sk-cupola-kuvapari.txt.
