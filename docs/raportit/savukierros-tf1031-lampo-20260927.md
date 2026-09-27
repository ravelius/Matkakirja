# 10 min muisti/lämpö-seuranta, TF 1.0.31 (juna-8096bae5/a86e4eb6), iPhone 18 Pro, 27.9.2026 17.56-18.08

Natiivisepän pyytämä App Store -laatukierroksen täydennys. iPhone 18 Pro (1572C658), koska
Natiivisepän oma iPad 00008103 oli varattu klo 18.20 asti. `uusi-peli 1 pariisi`, peli jätetty
Kartta-tilaan ajamaan itsekseen (ei aktiivista käyttäjäinteraktiota koko mittauksen ajan —
edustaa "levossa auki" -skenaariota, ei aktiivista pelaamista).

## Tulokset

- **Kesto: 11 min 1 s** (662 s, hieman yli pyydetyn 10 min).
- **Lämpötila: "Normaali" (thermal=0) KOKO AJAN**, ei yhtään nousua kohonneeksi/vakavaksi missään
  22 mittauspisteessä (30 s välein).
- **FPS: vakaa 30,0-32,6** koko ajan (tavoite 30), ei pudotuksia tai jumeja.
- **Virransäästötila: ei koskaan päällä** (virransaasto=False koko ajan).
- **Muisti: RSS ~1,54 Gt** (mitattu `ps aux`:lla mittauksen lopussa) — ei useampaa mittapistettä
  ajan yli, joten vuotoa (kasvavaa trendiä) ei voitu suoraan todentaa, mutta yksittäinen arvo on
  kohtuullinen 3D-karttapelille eikä lähellä simulaattorin/laitteen rajoja.
- **0 poikkeusta** koko session ajan (konsolilokista tarkistettu, ei Exception/NullReference/
  OutOfMemory-rivejä).

## Yhteenveto

**PASS.** Ei merkkejä lämpöongelmista, suorituskykyongelmista tai poikkeuksista 11 minuutin
jatkuvassa "peli auki Kartta-tilassa" -skenaariossa. Muistin pitkäaikaista trendiä (hidas vuoto)
ei voitu todentaa yhdellä mittauksella — jos tarkempi muistiprofiili tarvitaan, suosittelen
useampaa `ps aux`/Instruments-mittausta tasaisin väliajoin pidemmällä ajolla.
