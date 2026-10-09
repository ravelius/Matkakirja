# Liikesäännöt: Olavinlinnan historia-animaatio (Siirtoseppä 9.10.2026, juna 174)

Raamattu LIIKKUVAT KOHTAUKSET TEHDÄÄN KUIN ELOKUVA, kohta 2: kamera hidas ja lähes huomaamaton, pehmeä kiihdytys ja
jarrutus, ei äkkikäännöksiä. Säännöt ovat testejä (proto `Linssit-testit/Testit/HistoriajanaTestit.cs`), eivät toiveita.

## Kamera (drone)

| Sääntö | Raja | Mitattu (a8e5c7df0) | Testi |
|---|---|---|---|
| Katsesuunnan kääntö | ≤ 2,5°/s | 1,67°/s | `Liikesaannot` |
| Korkeuskulman muutos | ≤ 1,5°/s | 0,84°/s | `Liikesaannot` |
| Etäisyyden muutos | ≤ 6 %/s | 1,9 %/s | `Liikesaannot` |
| Kääntökiihtyvyys (nykäys) | ≤ 1,0°/s² | 0,63°/s² | `Liikesaannot` |
| Siirtymä ruutua kohden | < 1,5 m | ok | `DroneJatkuvaEiHyppyja` |
| Korkeus linnan yllä | > 30 m | ok | `DroneJatkuvaEiHyppyja` |
| Alku ja loppu | pysähtyy pehmeästi (tangentti 0) | ok | `Liikesaannot` |

Toteutus: avainasento jokaisen kohtauksen lopussa (kompassiatsimuutti, korkeuskulma, etäisyys linnan säteen kertoimena,
kohteen siirto). Välit **monotonisella kuutiollisella Hermite-käyrällä** (Fritsch–Carlson) kanavittain: nopeus on jatkuva
kohtausten rajoilla (ei pysähdyksiä), käyrä ei ylitä avainasentoja (ei heilahduksia), ensimmäinen ja viimeinen tangentti
ovat nollia. Kokonaiskierto 130° → 282° (152°) 135,8 s:ssa, keskimäärin 1,1°/s.

## Aikajana (kertoja, avainsanat, vaiheet)

| Sääntö | Arvo | Testi |
|---|---|---|
| Kertojan rivi alkaa kohtauksen alusta | 0,8 s (kamera liikkeellä ensin) | `KertojaMahtuuKohtauksiin` |
| Rivi mahtuu kohtaukseen (paitsi rivi 9) | kesto ≥ 0,8 s + rivi | `KertojaMahtuuKohtauksiin` |
| Ei päällekkäistä puhetta | edellinen rivi päättyy ennen seuraavaa | `KertojaMahtuuKohtauksiin` |
| Avainsana | kun kertoja sanoo vuoden, 4 s | `AvainsanatVainVaiheenAlussa` |
| Vuoden ankkurit | näky osuu kertojan sanaan | `VaihemallitJaPalonLeikkaukset` |
| Restaurointiteline (yhden vuoden ryhmä) | näkyy ≥ 0,7 s | `SolmujenVuodetPeriytyvat` |

## Muu liike

- Kasvavat osat (bastionit, ponttonisilta): smootherstep rakennusajan yli (6 v), alareuna nousee maasta.
- Vaihemallit ja palon leikkaukset vaihtuvat kerralla vuosirajalla (TULKINTA; jos kuva-arkki näyttää sen hyppynä,
  häivytys on ensimmäinen korjausehdokas).
- Avainsana: käyttöliittymän oma häivytys (KAIKKI LIIKE ANIMOIDAAN PEHMEÄSTI, Natiivi-UI).
