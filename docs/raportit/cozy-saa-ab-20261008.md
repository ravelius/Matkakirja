# Pallon säätehosteet: kevyt vs. COZY, A/B-suunnitelma (Linssiseppä 8.10.2026)

Päätoimittaja 8.10.: kevyet tehosteet ensin (juna 165/166), COZY-vertailu valmistellaan iPadin budjettiin mutta EI oteta käyttöön.

## Haarat (proto-git)

- **Kevyt (junassa):** `linssiseppa/juna-166` d3b9f48e8 — PalloSaaVaikutus + PalloSaaKerros (koko ruudun varjostin: sade, lumi, utu, salama) + KaupunkiKuvan harmaus ja sumu.
- **COZY:** `linssiseppa/cozy-saa-ab` 6d979d455 = cozy-profiili (COZY 3 -paketti, +68 Mt kevennettynä) + juna-166 + KaupunkiSaa-kartoitus. Päälle vain testiasetuksella `Documents/kaupunki-saa.txt`: `saa 1 ohjaus saatila`. Silloin COZY valitsee profiilin Saatila.Saa:sta (`PalloSaaVaikutus.CozyProfiili`: Clear, Mostly Cloudy/Overcast, Light/Heavy Rain, Light/Heavy Snow, Dense Fog, Thunder Storm), ja kevyt kerros + harmaus pysyvät pois. Ilman asetusta haara käyttäytyy kuten kevyt.
- Käännöstarkistus COZYlla: `MATKAKIRJA_KIRJASTOT=<ScriptAssemblies + DistantLands.Cozy.Runtime.dll>` ja `COZY_URP` DEF_YHT:hen (0 virhettä 8.10.).

## Mittaus (fyysinen iPad 00008103, omistajan luvalla; ei simulla)

Sama ajo molemmilla: linssi → Pariisi, Champs-Élysées (skenaario `proto-3d/tyokalut/linssiseppa-ajot/sk-video166.txt`), säät vuorotellen sade 60 s, lumi 60 s, ukkonen 60 s, sumu 60 s, pois 30 s (pidempi kuin videossa, lämpö ehtii tasaantua). Kaksi kierrosta ABAB-järjestyksessä (laitteen lämpö sekoittaa muuten).

Lokista (natiivi kirjaa jo): `kehysajat` (liike/lepo p50, p95, p99, yli15x), `lampo` (thermal, fps), opas-muisti (varattu, tekstuurit, laattoja), appin koko.

## Hyväksymisrajat (ehdotus Päätoimittajalle)

| Mittari | Raja |
|---|---|
| Kehysaika liikkeessä p95 | ≤ 18,3 ms (60 Hz) ja enintään +10 % kevyeen verrattuna |
| p99 / yli15x | ei kasva yli kaksinkertaiseksi |
| Muisti (varattu + tekstuurit) | enintään +150 Mt kevyeen verrattuna |
| Lämpö | ei "serious"-tilaa 5 min:n säässä |
| Appin koko | +68 Mt (tiedossa) hyväksytään erikseen |
| Näkyvyys | sade/lumi/sumu selvästi näkyviä samoilla ruuduilla (kuvaparit) |

COZY otetaan käyttöön vain, jos se on kaikilla riveillä rajoissa ja kuvaparit ovat selvästi kevyttä parempia (Päätoimittajan ja omistajan päätös).
