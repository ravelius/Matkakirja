# Talous 300: halvin matka ilman tuloja, ennen | jälkeen (juna 183)

Laskettu pelin omalla reittidatalla (sisältö v683, Euroopan 50 kaupunkia) työkalulla proto `tyokalut/talouslaskuri.py`.
Halvin reitti rahan mukaan: liput + matkan päiväkulut (reitillä ruoka 8 £ × maan hintataso). Päivä = 4 vuoroa à 6 h. Laskuri ei sisällä kaupungissa vietettyjä päiviä (majoitus 12–32 £/pv), joten oikeassa pelissä raha loppuu vielä aiemmin.

- **Ennen:** alkuraha 400 £, liftaus ilmainen, bussi 50, laiva 100, lento 300.
- **Jälkeen:** alkuraha 300 £, liftaus 50 £ (kyytimaksu kaupungista lähdettäessä), bussi 80, laiva 200, lento 350.

**Esimerkki Ateena → Pariisi:** ennen 20 £ (2,5 pv, 9 matkaa, mahtui 400 £:aan) → jälkeen 470 £ (2,5 pv, 9 matkaa): ei onnistu ilman tuloja; tarvitaan 170 £ eli 1–2 ratkaistua tehtävää.

**Yhteenveto:** ennen jokaisesta aloituskaupungista pääsi ilman tuloja kaikkiin 49 kohteeseen (kauimmas Islanti 4 157 km). Jälkeen ilman tuloja pääsee Ateenasta 17, Pariisista 27 ja Tukholmasta 31 kohteeseen; kauimmas noin 2 200 km. Kaikkiin suoriin maa- ja laivanaapureihin pääsee (yksi matka).

**Rajatapaukset:** Ateena → Moskova 258 £ (2 231 km) ja Tukholma → Barcelona 266 £ (2 278 km) mahtuvat 300 £:aan. Ne ovat hieman Ateena–Pariisi-välimatkaa (2 096 km) pidempiä, mutta eivät ole Euroopan vastakkaista laitaa (Lissabon, Dublin, Islanti, Kreeta, Valletta jne. eivät onnistu).



## Ateena: ilman tuloja ennen 49/49, jälkeen 17/49

| kohde | km | ennen £ | ennen pv | jälkeen £ | jälkeen pv | matkoja | ilman tuloja | halvin reitti nyt |
|---|---|---|---|---|---|---|---|---|
| Sofia | 525 | 2 | 0.3 | 52 | 0.3 | 1 | kyllä | Ateena → Sofia |
| Bukarest | 742 | 3 | 0.5 | 103 | 0.5 | 2 | kyllä | Ateena → Sofia → Bukarest |
| Sarajevo | 791 | 3 | 0.5 | 103 | 0.5 | 2 | kyllä | Ateena → Sofia → Sarajevo |
| Istanbul | 561 | 3 | 0.5 | 103 | 0.5 | 2 | kyllä | Ateena → Sofia → Istanbul |
| Budapest | 1124 | 5 | 0.8 | 155 | 0.8 | 3 | kyllä | Ateena → Sofia → Sarajevo → Budapest |
| Odessa | 1106 | 5 | 0.8 | 155 | 0.8 | 3 | kyllä | Ateena → Sofia → Bukarest → Odessa |
| Dubrovnik | 703 | 5 | 0.8 | 155 | 0.8 | 3 | kyllä | Ateena → Sofia → Sarajevo → Dubrovnik |
| Kreeta | 331 | 102 | 0.2 | 202 | 0.2 | 1 | kyllä | Ateena → Kreeta |
| Sisilia | 906 | 102 | 0.3 | 202 | 0.3 | 1 | kyllä | Ateena → Sisilia |
| Kiova | 1487 | 6 | 1.0 | 206 | 1.0 | 4 | kyllä | Ateena → Sofia → Bukarest → Odessa → Kiova |
| Košice | 1210 | 7 | 1.0 | 207 | 1.0 | 4 | kyllä | Ateena → Sofia → Sarajevo → Budapest → Košice |
| Wien | 1283 | 7 | 1.0 | 207 | 1.0 | 4 | kyllä | Ateena → Sofia → Sarajevo → Budapest → Wien |
| Varsova | 1598 | 8 | 1.4 | 258 | 1.4 | 5 | kyllä | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova |
| Moskova | 2231 | 8 | 1.4 | 258 | 1.4 | 5 | kyllä | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova |
| Krakova | 1376 | 9 | 1.3 | 259 | 1.3 | 5 | kyllä | Ateena → Sofia → Sarajevo → Budapest → Košice → Krakova |
| Ljubljana | 1175 | 10 | 1.3 | 260 | 1.3 | 5 | kyllä | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana |
| Praha | 1535 | 10 | 1.3 | 260 | 1.3 | 5 | kyllä | Ateena → Sofia → Sarajevo → Budapest → Wien → Praha |
| Pietari | 2487 | 9 | 1.7 | 309 | 1.7 | 6 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova → Pietari |
| Vilna | 1861 | 10 | 1.6 | 310 | 1.6 | 6 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Vilna |
| Berliini | 1803 | 10 | 1.7 | 310 | 1.7 | 6 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini |
| Venetsia | 1256 | 12 | 1.5 | 312 | 1.5 | 6 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia |
| Rooma | 1052 | 18 | 2.0 | 355 | 0.2 | 1 | EI | Ateena → Rooma |
| Helsinki | 2469 | 10 | 1.9 | 360 | 1.9 | 7 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova → Pietari → Helsinki |
| Tallinna | 2387 | 10 | 1.9 | 360 | 1.9 | 7 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova → Pietari → Tallinna |
| Riika | 2109 | 11 | 1.9 | 361 | 1.9 | 7 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Vilna → Riika |
| Kööpenhamina | 2136 | 13 | 1.9 | 363 | 1.9 | 7 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Kööpenhamina |
| Alpit | 1603 | 14 | 2.0 | 364 | 2.0 | 7 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit |
| Amsterdam | 2164 | 14 | 2.0 | 364 | 2.0 | 7 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Amsterdam |
| Firenze | 1228 | 15 | 1.8 | 365 | 1.8 | 7 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Firenze |
| Valletta | 851 | 205 | 0.5 | 405 | 0.5 | 2 | EI | Ateena → Sisilia → Valletta |
| Tampere | 2615 | 13 | 2.2 | 413 | 2.2 | 8 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova → Pietari → Helsinki → Tampere |
| Tukholma | 2408 | 16 | 2.2 | 416 | 2.2 | 8 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Kööpenhamina → Tukholma |
| Oslo | 2605 | 16 | 2.2 | 416 | 2.2 | 8 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Kööpenhamina → Oslo |
| Bryssel | 2089 | 17 | 2.2 | 417 | 2.2 | 8 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Amsterdam → Bryssel |
| Luxemburg | 1906 | 17 | 2.2 | 417 | 2.2 | 8 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Luxemburg |
| Marseille | 1653 | 17 | 2.2 | 417 | 2.2 | 8 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Marseille |
| Rovaniemi | 3174 | 17 | 2.4 | 467 | 2.4 | 9 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova → Pietari → Helsinki → Tampere → Rovaniemi |
| Bergen | 2806 | 19 | 2.4 | 469 | 2.4 | 9 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Kööpenhamina → Oslo → Bergen |
| Pariisi | 2096 | 20 | 2.5 | 470 | 2.5 | 9 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Luxemburg → Pariisi |
| Barcelona | 1878 | 20 | 2.5 | 470 | 2.5 | 9 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Marseille → Barcelona |
| Tromssa | 3536 | 20 | 2.7 | 472 | 2.6 | 9 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Kööpenhamina → Oslo → Tromssa |
| Madrid | 2370 | 22 | 2.7 | 522 | 2.7 | 10 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Marseille → Barcelona → Madrid |
| Lontoo | 2392 | 23 | 2.7 | 523 | 2.7 | 10 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Luxemburg → Pariisi → Lontoo |
| Granada | 2401 | 24 | 3.0 | 574 | 3.0 | 11 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Marseille → Barcelona → Madrid → Granada |
| Sevilla | 2605 | 24 | 3.0 | 574 | 3.0 | 11 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Marseille → Barcelona → Madrid → Sevilla |
| Lissabon | 2852 | 24 | 3.0 | 574 | 3.0 | 11 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Marseille → Barcelona → Madrid → Lissabon |
| Edinburgh | 2823 | 26 | 3.0 | 576 | 3.0 | 11 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Luxemburg → Pariisi → Lontoo → Edinburgh |
| Islanti | 4157 | 124 | 3.0 | 676 | 3.0 | 10 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Kööpenhamina → Oslo → Tromssa → Islanti |
| Dublin | 2855 | 126 | 3.0 | 726 | 3.0 | 11 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Varsova → Berliini → Alpit → Luxemburg → Pariisi → Lontoo → Dublin |

## Pariisi: ilman tuloja ennen 49/49, jälkeen 27/49

| kohde | km | ennen £ | ennen pv | jälkeen £ | jälkeen pv | matkoja | ilman tuloja | halvin reitti nyt |
|---|---|---|---|---|---|---|---|---|
| Bryssel | 264 | 3 | 0.2 | 53 | 0.2 | 1 | kyllä | Pariisi → Bryssel |
| Luxemburg | 287 | 3 | 0.2 | 53 | 0.2 | 1 | kyllä | Pariisi → Luxemburg |
| Lontoo | 343 | 3 | 0.2 | 53 | 0.2 | 1 | kyllä | Pariisi → Lontoo |
| Marseille | 661 | 4 | 0.3 | 54 | 0.3 | 1 | kyllä | Pariisi → Marseille |
| Edinburgh | 873 | 6 | 0.5 | 106 | 0.5 | 2 | kyllä | Pariisi → Lontoo → Edinburgh |
| Alpit | 493 | 6 | 0.5 | 106 | 0.5 | 2 | kyllä | Pariisi → Luxemburg → Alpit |
| Amsterdam | 429 | 6 | 0.5 | 106 | 0.5 | 2 | kyllä | Pariisi → Bryssel → Amsterdam |
| Barcelona | 831 | 7 | 0.5 | 107 | 0.5 | 2 | kyllä | Pariisi → Marseille → Barcelona |
| Madrid | 1053 | 9 | 0.8 | 159 | 0.8 | 3 | kyllä | Pariisi → Marseille → Barcelona → Madrid |
| Venetsia | 844 | 10 | 0.8 | 160 | 0.8 | 3 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia |
| Berliini | 876 | 10 | 0.8 | 160 | 0.8 | 3 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini |
| Granada | 1385 | 11 | 1.0 | 211 | 1.0 | 4 | kyllä | Pariisi → Marseille → Barcelona → Madrid → Granada |
| Sevilla | 1442 | 11 | 1.0 | 211 | 1.0 | 4 | kyllä | Pariisi → Marseille → Barcelona → Madrid → Sevilla |
| Lissabon | 1454 | 11 | 1.0 | 211 | 1.0 | 4 | kyllä | Pariisi → Marseille → Barcelona → Madrid → Lissabon |
| Ljubljana | 964 | 13 | 1.0 | 213 | 1.0 | 4 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana |
| Firenze | 886 | 13 | 1.0 | 213 | 1.0 | 4 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia → Firenze |
| Praha | 882 | 13 | 1.0 | 213 | 1.0 | 4 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Praha |
| Kööpenhamina | 1027 | 13 | 1.0 | 213 | 1.0 | 4 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina |
| Varsova | 1366 | 14 | 1.1 | 214 | 1.1 | 4 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Varsova |
| Dublin | 781 | 106 | 0.5 | 256 | 0.5 | 2 | kyllä | Pariisi → Lontoo → Dublin |
| Wien | 1033 | 15 | 1.2 | 265 | 1.2 | 5 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien |
| Krakova | 1275 | 15 | 1.3 | 265 | 1.3 | 5 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Praha → Krakova |
| Vilna | 1696 | 16 | 1.3 | 266 | 1.3 | 5 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Vilna |
| Rooma | 1105 | 16 | 1.2 | 266 | 1.2 | 5 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia → Firenze → Rooma |
| Tukholma | 1544 | 16 | 1.3 | 266 | 1.3 | 5 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina → Tukholma |
| Oslo | 1342 | 16 | 1.3 | 266 | 1.3 | 5 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina → Oslo |
| Kiova | 2024 | 17 | 1.4 | 267 | 1.4 | 5 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova |
| Bergen | 1296 | 20 | 1.5 | 311 | 0.9 | 3 | EI | Pariisi → Lontoo → Edinburgh → Bergen |
| Islanti | 2229 | 111 | 0.9 | 311 | 0.9 | 3 | EI | Pariisi → Lontoo → Edinburgh → Islanti |
| Riika | 1703 | 17 | 1.6 | 317 | 1.6 | 6 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Vilna → Riika |
| Košice | 1381 | 17 | 1.5 | 317 | 1.5 | 6 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Praha → Krakova → Košice |
| Odessa | 2129 | 18 | 1.7 | 318 | 1.7 | 6 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Odessa |
| Budapest | 1245 | 18 | 1.5 | 318 | 1.5 | 6 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien → Budapest |
| Moskova | 2486 | 18 | 1.8 | 318 | 1.8 | 6 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Moskova |
| Tromssa | 2481 | 22 | 1.7 | 322 | 1.7 | 6 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina → Oslo → Tromssa |
| Dubrovnik | 1401 | 21 | 2.0 | 363 | 1.0 | 4 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Dubrovnik |
| Tallinna | 1859 | 18 | 1.8 | 368 | 1.8 | 7 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Vilna → Riika → Tallinna |
| Bukarest | 1871 | 19 | 1.9 | 369 | 1.9 | 7 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Odessa → Bukarest |
| Pietari | 2164 | 19 | 2.1 | 370 | 2.1 | 7 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Moskova → Pietari |
| Sarajevo | 1348 | 20 | 1.8 | 370 | 1.8 | 7 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien → Budapest → Sarajevo |
| Rovaniemi | 2373 | 25 | 2.0 | 375 | 2.0 | 7 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina → Oslo → Tromssa → Rovaniemi |
| Sofia | 1757 | 20 | 2.2 | 420 | 2.2 | 8 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Odessa → Bukarest → Sofia |
| Helsinki | 1908 | 21 | 2.3 | 421 | 2.3 | 8 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Moskova → Pietari → Helsinki |
| Tampere | 1938 | 24 | 2.6 | 428 | 2.2 | 8 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina → Oslo → Tromssa → Rovaniemi → Tampere |
| Sisilia | 1485 | 119 | 1.5 | 469 | 1.5 | 6 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Firenze → Rooma → Sisilia |
| Istanbul | 2254 | 21 | 2.4 | 471 | 2.4 | 9 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Odessa → Bukarest → Sofia → Istanbul |
| Ateena | 2096 | 22 | 2.5 | 472 | 2.5 | 9 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Odessa → Bukarest → Sofia → Ateena |
| Valletta | 1749 | 222 | 1.8 | 672 | 1.8 | 7 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Firenze → Rooma → Sisilia → Valletta |
| Kreeta | 2405 | 124 | 2.7 | 674 | 2.7 | 10 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Odessa → Bukarest → Sofia → Ateena → Kreeta |

## Tukholma: ilman tuloja ennen 49/49, jälkeen 31/49

| kohde | km | ennen £ | ennen pv | jälkeen £ | jälkeen pv | matkoja | ilman tuloja | halvin reitti nyt |
|---|---|---|---|---|---|---|---|---|
| Oslo | 417 | 3 | 0.2 | 53 | 0.2 | 1 | kyllä | Tukholma → Oslo |
| Kööpenhamina | 522 | 3 | 0.2 | 53 | 0.2 | 1 | kyllä | Tukholma → Kööpenhamina |
| Bergen | 720 | 6 | 0.5 | 106 | 0.5 | 2 | kyllä | Tukholma → Oslo → Bergen |
| Berliini | 811 | 6 | 0.5 | 106 | 0.5 | 2 | kyllä | Tukholma → Kööpenhamina → Berliini |
| Tromssa | 1152 | 9 | 0.7 | 109 | 0.7 | 2 | kyllä | Tukholma → Oslo → Tromssa |
| Praha | 1054 | 10 | 0.8 | 160 | 0.8 | 3 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha |
| Varsova | 810 | 10 | 0.8 | 160 | 0.8 | 3 | kyllä | Tukholma → Kööpenhamina → Berliini → Varsova |
| Alpit | 1570 | 10 | 0.8 | 160 | 0.8 | 3 | kyllä | Tukholma → Kööpenhamina → Berliini → Alpit |
| Amsterdam | 1126 | 10 | 0.8 | 160 | 0.8 | 3 | kyllä | Tukholma → Kööpenhamina → Berliini → Amsterdam |
| Rovaniemi | 885 | 12 | 0.9 | 162 | 0.9 | 3 | kyllä | Tukholma → Oslo → Tromssa → Rovaniemi |
| Helsinki | 396 | 17 | 2.0 | 203 | 0.2 | 1 | kyllä | Tukholma → Helsinki |
| Riika | 442 | 13 | 1.3 | 203 | 0.2 | 1 | kyllä | Tukholma → Riika |
| Krakova | 1037 | 12 | 1.0 | 212 | 1.0 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Krakova |
| Wien | 1242 | 12 | 1.0 | 212 | 1.0 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Wien |
| Vilna | 675 | 12 | 1.0 | 212 | 1.0 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Varsova → Vilna |
| Kiova | 1264 | 13 | 1.1 | 213 | 1.1 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Varsova → Kiova |
| Bryssel | 1280 | 13 | 1.0 | 213 | 1.0 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Amsterdam → Bryssel |
| Luxemburg | 1323 | 13 | 1.0 | 213 | 1.0 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Alpit → Luxemburg |
| Venetsia | 1591 | 13 | 1.0 | 213 | 1.0 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Alpit → Venetsia |
| Marseille | 1981 | 13 | 1.0 | 213 | 1.0 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille |
| Tampere | 394 | 15 | 1.2 | 215 | 1.2 | 4 | kyllä | Tukholma → Oslo → Tromssa → Rovaniemi → Tampere |
| Tallinna | 379 | 14 | 1.5 | 254 | 0.5 | 2 | kyllä | Tukholma → Riika → Tallinna |
| Pietari | 691 | 16 | 1.8 | 256 | 0.5 | 2 | kyllä | Tukholma → Helsinki → Pietari |
| Košice | 1198 | 14 | 1.2 | 264 | 1.2 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Krakova → Košice |
| Odessa | 1656 | 14 | 1.4 | 264 | 1.4 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Varsova → Kiova → Odessa |
| Moskova | 1227 | 15 | 1.5 | 265 | 1.5 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Varsova → Kiova → Moskova |
| Budapest | 1318 | 15 | 1.2 | 265 | 1.2 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest |
| Ljubljana | 1495 | 15 | 1.2 | 265 | 1.2 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Ljubljana |
| Pariisi | 1544 | 16 | 1.3 | 266 | 1.3 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Alpit → Luxemburg → Pariisi |
| Barcelona | 2278 | 16 | 1.3 | 266 | 1.3 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille → Barcelona |
| Firenze | 1791 | 16 | 1.3 | 266 | 1.3 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Alpit → Venetsia → Firenze |
| Edinburgh | 1313 | 23 | 1.8 | 311 | 0.9 | 3 | EI | Tukholma → Oslo → Bergen → Edinburgh |
| Islanti | 2129 | 113 | 1.0 | 313 | 1.0 | 3 | EI | Tukholma → Oslo → Tromssa → Islanti |
| Bukarest | 1745 | 15 | 1.6 | 315 | 1.6 | 6 | EI | Tukholma → Kööpenhamina → Berliini → Varsova → Kiova → Odessa → Bukarest |
| Sarajevo | 1719 | 17 | 1.5 | 317 | 1.5 | 6 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest → Sarajevo |
| Madrid | 2593 | 18 | 1.5 | 318 | 1.5 | 6 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille → Barcelona → Madrid |
| Rooma | 1977 | 20 | 1.5 | 320 | 1.5 | 6 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Venetsia → Firenze → Rooma |
| Lontoo | 1433 | 20 | 1.5 | 320 | 1.5 | 6 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Luxemburg → Pariisi → Lontoo |
| Sofia | 1884 | 17 | 1.9 | 367 | 1.9 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Varsova → Kiova → Odessa → Bukarest → Sofia |
| Dubrovnik | 1856 | 18 | 1.8 | 368 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest → Sarajevo → Dubrovnik |
| Granada | 2911 | 20 | 1.8 | 370 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille → Barcelona → Madrid → Granada |
| Sevilla | 2983 | 20 | 1.8 | 370 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille → Barcelona → Madrid → Sevilla |
| Lissabon | 2990 | 20 | 1.8 | 370 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille → Barcelona → Madrid → Lissabon |
| Istanbul | 2173 | 18 | 2.1 | 418 | 2.1 | 8 | EI | Tukholma → Kööpenhamina → Berliini → Varsova → Kiova → Odessa → Bukarest → Sofia → Istanbul |
| Ateena | 2408 | 18 | 2.2 | 418 | 2.2 | 8 | EI | Tukholma → Kööpenhamina → Berliini → Varsova → Kiova → Odessa → Bukarest → Sofia → Ateena |
| Dublin | 1628 | 123 | 1.8 | 514 | 1.1 | 4 | EI | Tukholma → Oslo → Bergen → Edinburgh → Dublin |
| Sisilia | 2382 | 120 | 2.5 | 523 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Venetsia → Firenze → Rooma → Sisilia |
| Kreeta | 2724 | 120 | 2.4 | 620 | 2.4 | 9 | EI | Tukholma → Kööpenhamina → Berliini → Varsova → Kiova → Odessa → Bukarest → Sofia → Ateena → Kreeta |
| Valletta | 2618 | 223 | 2.7 | 726 | 2.0 | 8 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Venetsia → Firenze → Rooma → Sisilia → Valletta |
