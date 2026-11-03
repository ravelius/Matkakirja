# Cupola-kustannus iPad Pro 12.9 M1, kierros 2 – Pelikoodarin tulkinta 17.10.2026 19.2x

Ajo JU 19.04 (ce479c342, Lontoo-alku, sk-cupola-kustannus2.txt). Kytkinjaksot EIVÄT ole vertailukelpoisia: laite kuumeni kesken.

## GPU-aika 5 s välein (konsoli.txt)
- Cupola auki 19.06.14 → t 91–126 s: 51–61 ms (laite viileä, renderScale 1, 30 kuvaa/s katto, fps 30)
- t 131–211 s: tasainen nousu 60 → 86 ms (thermal 0 = Nominal koko ajan) → fps 22–23
- t ≈ 213 s (19.08.2x, ENNEN pilvikomentoa 19.08.35): `thermalStateDidChange: Serious` → pelin lämpösuoja
  "lämpö Kuuma → katto 30 fps, renderScale 0,7, MSAA 1, bloom pois" → GPU 72 → 22 ms ja pysyy 15–22 ms loppuun (30 kuvaa/s).
- Kuumana: pilvet pois/matala ei eroa (~21 ms), ilmakehä2 0 ≈ −3 ms, bloom jo pois, kaikki + kehys pois 17 ms.
- `peli pallo pohja paljas` = tuntematon komento (Komennot.cs ei ole peli-komento) → laattoja ei mitattu.

## Tulkinta
- Kierroksen 1 "ajan mukana kasvava GPU-aika" (62 → 85 ms) = näytönohjaimen kellon lasku laitteen kuumetessa, ei kertyvä vuoto:
  iOS raportoi Nominal, kunnes raja ylittyy, ja kehysaika kasvaa sitä ennen. Kierroksessa 1 raja ei ylittynyt 4,5 min:ssa.
- Cupola täydellä tarkkuudella (2732×2048, renderScale 1) on ~52–60 ms viileänä → ei koskaan 30 kuvaa/s tällä iPadilla, ja se kuumentaa
  laitteen. Lämpösuojan profiili (renderScale 0,7 + bloom pois) antaa 15–22 ms = tasainen 30 kuvaa/s.
- UITK-kehys ei ole syy (kierros 1).

## Suositus
Cupola vanhemmilla iPadeilla (M1-luokka, iPad13,x) suoraan lämpösuojan profiilissa (renderScale 0,7, bloom pois) eikä vasta kuumana:
tasainen 30 kuvaa/s, laite ei kuumene. Vahvistus: kierros 3 (sk-cupola-kustannus3.txt, `lampo kuuma` heti Cupolan auettua, 5 min)
+ kuvapari 1,0 | 0,7 omistajalle (terävyysero).
