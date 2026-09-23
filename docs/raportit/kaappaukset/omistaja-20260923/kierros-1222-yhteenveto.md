# Omistajan kierros 23.9.2026 klo 12.19–12.22, iPad, v2148, Suoraan kartalle päällä, profiili p5, veto interp, tarkkuus terävä

Kuvat kierros-1222-01…09.png (mittarin luvut kuvista; kierros = veto Pariisista etelään/itään).

| koe | tila | rAF | dt p95 | max | >20 ms | dc | häipyy | rast | puskurikirj./kehys | syy-kärki |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Oletus | 59 | 27 | 46 | 20/177 | 408 | 6 | 221 | 0.29 | globe.tick 21 |
| 2 | Kosketus suoraan | 63 | 40 | 138 | 38/146 | 37 | 17 | 267 | 22.18 | globe.tick 19, askel 9, puraJonoa 9 |
| 3 | Yhteinen kello | 59 | 31 | 44 | 41/164 | 475 | 26 | 253 | 19.79 | globe.tick 33 |
| 4 | Molemmat | 59 | 31 | 102 | 43/154 | 83 | 24 | 247 | 17.53 | globe.tick 20, puraJonoa 11 |
| 5 | Paljas kartta (a) | 59 | 21 | 43 | 4/59 | 63 | 0 | 0 | 0.02 | vienti |
| 5 | Paljas kartta (b) | 59 | 23 | 52 | 5/59 | 35 | 0 | 0 | 0.08 | globe.tick 1 |
| 6 | Paljas + nimiöt | 59 | 25 | 42 | 4/61 | 47 | 0 | 4 | 0.08 | globe.tick 3 |
| 7 | Paljas + symbolit | 63 | 33 | 134 | 14/42 | 22 | 0 | 154 | 6.40 | globe.tick 4, ticker 2, liu 1 |
| 8 | Paljas + DOM-kerrokset | 59 | 28 | 44 | 8/58 | 25 | 0 | 0 | 0.05 | globe.tick 4 |

Huomiot (Fable): paljas kartta on tasaisin (p95 21–23, >20 ms 7–8 %). Symbolikerros (koe 7) tuo
yksin max 134 ms ja >20 ms 33 % sekä rast 154 ja puskurikirjoitukset 6.4/kehys. Täysissä tiloissa
(1–4) häipyy 6–26 ja puskurikirjoitukset 17–22/kehys kokeissa 2–4; Oletus (1) on täysistä paras
lukujen valossa, Kosketus suoraan (2) huonoin (max 138, p95 40). Kokeen 1 dc 408 ja kokeen 3 dc 475
vs. 37–83 muissa: kerrosten määrä vaihtelee samassa kierroksessa (zoomitaso?).
Omistajan tuntuma: kysytty erikseen.

Omistajan tuntuma (kortti klo 12.4x): "Pelkkä kartta tökki kaikkein vähiten, mutta siinäkin on
yksi tökkäys yleensä, jos vedän kerran ja jätän kartan liikkumaan itsestään loppuun. Ja siinä
lopussa on vähän turhan nopea liikkeen lopetus, jos sen pystyisi vielä pehmeämmin hidastamaan sen
ihan lopun vierityksen. Syöttökokeet kaikki tökkivät. En huomannut kovin isoa eroa niiden välillä."
