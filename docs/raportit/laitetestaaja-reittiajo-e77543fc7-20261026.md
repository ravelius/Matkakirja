# Reittiajo rungosta e77543fc7 (iPad Pro 13, 26.10.2026 klo 11.45–11.58): lukitusmittarit VIHREÄT, piilot 563/402 → 0/28, 3 räystäspiiloa

NS asensi 11.44 (PK:n räystäskamera, LR tausta-v54 / rakennukset-v46, VS:n Metal-korjaus); app käynnistyi 11.45.20. Skriptit 60e92b7a7. Aineisto: proto-3d/_tyo/linssiseppa2/varjot-koko/re775-1ja/ ja re775-2reitit/.

## Lukitusmittarit (vihreät)
- GPU: J 10,38 ms / A 11,10 ms (raja 14); ruutuja > 17,5 ms: 0.
- Aukio 180 s (reitti A): käännösnykäykset 0, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0 (suurin 22 ms), kääntyilyjä 4.
- Sisätila 120 s (reitti B): käännösnykäykset 1, alkunykäykset 0, pysähdyksiä 0, kamerahyppyjä 0, nykäyksiä 0 (suurin 17 ms), kääntyilyjä 4.
- Alkulento puhdas (KAMERAHYPPY + hyppysuoja 0).

## Piilovertailu (PELAAJA PIILOSSA -ruutuja)
| Runko | Aukio | Sisätila |
|---|---|---|
| 719cefaaa | 36 | 56 |
| 4b4864d28 | 563 | 402 |
| **e77543fc7** | **0** | **28** |

Piilojaksoja yhteensä 3 (67 ruutua), kaikki syy "näkölinja peittokartan massassa" + `katto+katto_raystas` (räystäs, reunasta 0,0–0,5 m, ala 2,8 m), kamera ~6–7 m korkealla Puyin takana:
1. J/A-vaihe t 13x s: 4 ruutua, v4 palatsi **avoin tyohuone** (este 3,5 m, kamera (126,7; 7,4; −757,2), Puyi (126,7; 0; −752,5)).
2. J/A-vaihe t 139,0 s: 35 ruutua, v4 palatsi **avoin tyohuone** (este 3,1 m, huippu 3,4, kamera (126,7; 6,2; −742,2), Puyi (126,8; 0; −735,1)).
3. Sisätila (reittiajon 2. osa) t 22,8 s: 28 ruutua, v4 palatsi **avoin puutarha** (este 2,9 m, huippu 3,7, kamera (130,5; 6,8; −800,3), Puyi (125,2; 0; −799,8)).
→ PT:n ehto "porttihalleihin ei uusia piiloja": ei portti-/kujapiiloja (esteenä ei portti), mutta uusi lajityyppi: avoin tyohuone/avoin puutarha -räystäs peittää pelaajan lyhyesti (alle 0,6 s). PK:n tarkistettavaksi.

## Muuta
- VENYNYT RUUTU 5 kpl (20,6–26,6 ms, "ei nykäys", "ulkona" 13–22 ms, Update ≤ 2 ms) – edellisen ajon 31:stä.
- Verrattuna 4b4864d28: J 9,48 → 10,38, A 11,52 → 11,10.
