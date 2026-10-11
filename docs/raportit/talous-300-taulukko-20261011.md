# Talous 300: halvin matka ilman tuloja, ennen | jälkeen (juna 183)

Laskettu pelin omalla reittidatalla (sisältö v683, Euroopan 50 kaupunkia) työkalulla proto `tyokalut/talouslaskuri.py`.
Halvin reitti rahan mukaan: liput + matkan päiväkulut (reitillä ruoka 8 £ × maan hintataso). Päivä = 4 vuoroa à 6 h. Laskuri ei sisällä kaupungissa vietettyjä päiviä (majoitus 12–32 £/pv), joten oikeassa pelissä raha loppuu vielä aiemmin.

- **Ennen:** alkuraha 400 £, liftaus ilmainen, bussi 50, laiva 100, lento 300.
- **Jälkeen:** alkuraha 300 £; liftaus maksaa matkan pituuden mukaan 0,15 £/km (vähintään 20 £; esim. Pariisi–Lontoo 50 £, Pariisi–Marseille 100 £, Oslo–Tromssa 175 £), maksetaan kaupungista lähdettäessä; bussi 1,5 × kyyti (vähintään 80 £); laiva 200; lento 350. Raja: ilman tuloja ei yli n. 1 800 km:n päähän (PT 23.3x).

**Esimerkki Ateena → Pariisi:** ennen 20 £ (2,5 pv, 9 matkaa, mahtui 400 £:aan) → jälkeen 476 £: ei onnistu ilman tuloja; tarvitaan 176 £ eli 1–2 ratkaistua tehtävää.

**Yhteenveto:** ennen jokaisesta aloituskaupungista pääsi ilman tuloja kaikkiin 49 kohteeseen (kauimmas Islanti 4 157 km). Jälkeen ilman tuloja pääsee Ateenasta 15, Pariisista 25 ja Tukholmasta 22 kohteeseen; kauimmas 1 591 km (Tukholma → Venetsia), eli yli 1 800 km:n päähän ei pääse mistään aloituskaupungista. Kaikkiin suoriin maa- ja laivanaapureihin pääsee yhdellä matkalla.



## Ateena: ilman tuloja ennen 49/49, jälkeen 15/49

| kohde | km | ennen £ | ennen pv | jälkeen £ | jälkeen pv | matkoja | ilman tuloja | halvin reitti nyt |
|---|---|---|---|---|---|---|---|---|
| Sofia | 525 | 2 | 0.3 | 82 | 0.3 | 1 | kyllä | Ateena → Sofia |
| Bukarest | 742 | 3 | 0.5 | 128 | 0.5 | 2 | kyllä | Ateena → Sofia → Bukarest |
| Sarajevo | 791 | 3 | 0.5 | 148 | 0.5 | 2 | kyllä | Ateena → Sofia → Sarajevo |
| Istanbul | 561 | 3 | 0.5 | 158 | 0.5 | 2 | kyllä | Ateena → Sofia → Istanbul |
| Dubrovnik | 703 | 5 | 0.8 | 170 | 0.8 | 3 | kyllä | Ateena → Sofia → Sarajevo → Dubrovnik |
| Odessa | 1106 | 5 | 0.8 | 195 | 0.8 | 3 | kyllä | Ateena → Sofia → Bukarest → Odessa |
| Kreeta | 331 | 102 | 0.2 | 202 | 0.2 | 1 | kyllä | Ateena → Kreeta |
| Sisilia | 906 | 102 | 0.3 | 202 | 0.3 | 1 | kyllä | Ateena → Sisilia |
| Budapest | 1124 | 5 | 0.8 | 210 | 0.8 | 3 | kyllä | Ateena → Sofia → Sarajevo → Budapest |
| Košice | 1210 | 7 | 1.0 | 242 | 1.0 | 4 | kyllä | Ateena → Sofia → Sarajevo → Budapest → Košice |
| Wien | 1283 | 7 | 1.0 | 242 | 1.0 | 4 | kyllä | Ateena → Sofia → Sarajevo → Budapest → Wien |
| Kiova | 1487 | 6 | 1.0 | 261 | 1.0 | 4 | kyllä | Ateena → Sofia → Bukarest → Odessa → Kiova |
| Krakova | 1376 | 9 | 1.3 | 269 | 1.3 | 5 | kyllä | Ateena → Sofia → Sarajevo → Budapest → Košice → Krakova |
| Praha | 1535 | 10 | 1.3 | 285 | 1.3 | 5 | kyllä | Ateena → Sofia → Sarajevo → Budapest → Wien → Praha |
| Ljubljana | 1175 | 10 | 1.3 | 285 | 1.3 | 5 | kyllä | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana |
| Varsova | 1598 | 8 | 1.4 | 311 | 1.5 | 6 | EI | Ateena → Sofia → Sarajevo → Budapest → Košice → Krakova → Varsova |
| Venetsia | 1256 | 12 | 1.5 | 312 | 1.5 | 6 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia |
| Berliini | 1803 | 10 | 1.7 | 327 | 1.5 | 6 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Praha → Berliini |
| Firenze | 1228 | 15 | 1.8 | 345 | 1.8 | 7 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Firenze |
| Rooma | 1052 | 18 | 2.0 | 355 | 0.2 | 1 | EI | Ateena → Rooma |
| Alpit | 1603 | 14 | 2.0 | 370 | 1.8 | 7 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit |
| Vilna | 1861 | 10 | 1.6 | 373 | 1.8 | 7 | EI | Ateena → Sofia → Sarajevo → Budapest → Košice → Krakova → Varsova → Vilna |
| Moskova | 2231 | 8 | 1.4 | 378 | 1.4 | 5 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova |
| Kööpenhamina | 2136 | 13 | 1.9 | 385 | 1.8 | 7 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Praha → Berliini → Kööpenhamina |
| Valletta | 851 | 205 | 0.5 | 405 | 0.5 | 2 | EI | Ateena → Sisilia → Valletta |
| Riika | 2109 | 11 | 1.9 | 414 | 2.0 | 8 | EI | Ateena → Sofia → Sarajevo → Budapest → Košice → Krakova → Varsova → Vilna → Riika |
| Amsterdam | 2164 | 14 | 2.0 | 416 | 1.8 | 7 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Praha → Berliini → Amsterdam |
| Luxemburg | 1906 | 17 | 2.2 | 428 | 2.0 | 8 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Luxemburg |
| Marseille | 1653 | 17 | 2.2 | 433 | 2.0 | 8 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Marseille |
| Bryssel | 2089 | 17 | 2.2 | 444 | 2.1 | 8 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Praha → Berliini → Amsterdam → Bryssel |
| Tallinna | 2387 | 10 | 1.9 | 455 | 2.3 | 9 | EI | Ateena → Sofia → Sarajevo → Budapest → Košice → Krakova → Varsova → Vilna → Riika → Tallinna |
| Oslo | 2605 | 16 | 2.2 | 463 | 2.0 | 8 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Praha → Berliini → Kööpenhamina → Oslo |
| Tukholma | 2408 | 16 | 2.2 | 468 | 2.0 | 8 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Praha → Berliini → Kööpenhamina → Tukholma |
| Pietari | 2487 | 9 | 1.7 | 474 | 1.7 | 6 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova → Pietari |
| Pariisi | 2096 | 20 | 2.5 | 476 | 2.3 | 9 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Luxemburg → Pariisi |
| Barcelona | 1878 | 20 | 2.5 | 486 | 2.3 | 9 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Marseille → Barcelona |
| Bergen | 2806 | 19 | 2.4 | 511 | 2.3 | 9 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Praha → Berliini → Kööpenhamina → Oslo → Bergen |
| Helsinki | 2469 | 10 | 1.9 | 520 | 1.9 | 7 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova → Pietari → Helsinki |
| Lontoo | 2392 | 23 | 2.7 | 530 | 2.5 | 10 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Luxemburg → Pariisi → Lontoo |
| Tampere | 2615 | 13 | 2.2 | 548 | 2.2 | 8 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova → Pietari → Helsinki → Tampere |
| Madrid | 2370 | 22 | 2.7 | 563 | 2.5 | 10 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Marseille → Barcelona → Madrid |
| Edinburgh | 2823 | 26 | 3.0 | 613 | 2.8 | 11 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Luxemburg → Pariisi → Lontoo → Edinburgh |
| Granada | 2401 | 24 | 3.0 | 620 | 2.8 | 11 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Marseille → Barcelona → Madrid → Granada |
| Sevilla | 2605 | 24 | 3.0 | 625 | 2.8 | 11 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Marseille → Barcelona → Madrid → Sevilla |
| Rovaniemi | 3174 | 17 | 2.4 | 637 | 2.4 | 9 | EI | Ateena → Sofia → Bukarest → Odessa → Kiova → Moskova → Pietari → Helsinki → Tampere → Rovaniemi |
| Lissabon | 2852 | 24 | 3.0 | 640 | 2.8 | 11 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Marseille → Barcelona → Madrid → Lissabon |
| Tromssa | 3536 | 20 | 2.7 | 644 | 2.5 | 9 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Praha → Berliini → Kööpenhamina → Oslo → Tromssa |
| Dublin | 2855 | 126 | 3.0 | 733 | 2.8 | 11 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Luxemburg → Pariisi → Lontoo → Dublin |
| Islanti | 4157 | 124 | 3.0 | 817 | 3.1 | 12 | EI | Ateena → Sofia → Sarajevo → Budapest → Wien → Ljubljana → Venetsia → Alpit → Luxemburg → Pariisi → Lontoo → Edinburgh → Islanti |

## Pariisi: ilman tuloja ennen 49/49, jälkeen 25/49

| kohde | km | ennen £ | ennen pv | jälkeen £ | jälkeen pv | matkoja | ilman tuloja | halvin reitti nyt |
|---|---|---|---|---|---|---|---|---|
| Bryssel | 264 | 3 | 0.2 | 43 | 0.2 | 1 | kyllä | Pariisi → Bryssel |
| Luxemburg | 287 | 3 | 0.2 | 48 | 0.2 | 1 | kyllä | Pariisi → Luxemburg |
| Lontoo | 343 | 3 | 0.2 | 53 | 0.2 | 1 | kyllä | Pariisi → Lontoo |
| Amsterdam | 429 | 6 | 0.5 | 71 | 0.5 | 2 | kyllä | Pariisi → Bryssel → Amsterdam |
| Marseille | 661 | 4 | 0.3 | 104 | 0.3 | 1 | kyllä | Pariisi → Marseille |
| Alpit | 493 | 6 | 0.5 | 106 | 0.5 | 2 | kyllä | Pariisi → Luxemburg → Alpit |
| Edinburgh | 873 | 6 | 0.5 | 136 | 0.5 | 2 | kyllä | Pariisi → Lontoo → Edinburgh |
| Barcelona | 831 | 7 | 0.5 | 157 | 0.5 | 2 | kyllä | Pariisi → Marseille → Barcelona |
| Berliini | 876 | 10 | 0.8 | 160 | 0.8 | 3 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini |
| Venetsia | 844 | 10 | 0.8 | 165 | 0.8 | 3 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia |
| Ljubljana | 964 | 13 | 1.0 | 193 | 1.0 | 4 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana |
| Firenze | 886 | 13 | 1.0 | 198 | 1.0 | 4 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia → Firenze |
| Praha | 882 | 13 | 1.0 | 203 | 1.0 | 4 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Praha |
| Kööpenhamina | 1027 | 13 | 1.0 | 218 | 1.0 | 4 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina |
| Madrid | 1053 | 9 | 0.8 | 234 | 0.8 | 3 | kyllä | Pariisi → Marseille → Barcelona → Madrid |
| Wien | 1033 | 15 | 1.2 | 235 | 1.2 | 5 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien |
| Rooma | 1105 | 16 | 1.2 | 236 | 1.2 | 5 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia → Firenze → Rooma |
| Varsova | 1366 | 14 | 1.1 | 244 | 1.1 | 4 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Varsova |
| Dublin | 781 | 106 | 0.5 | 256 | 0.5 | 2 | kyllä | Pariisi → Lontoo → Dublin |
| Krakova | 1275 | 15 | 1.3 | 265 | 1.3 | 5 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Praha → Krakova |
| Budapest | 1245 | 18 | 1.5 | 268 | 1.5 | 6 | kyllä | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien → Budapest |
| Granada | 1385 | 11 | 1.0 | 291 | 1.0 | 4 | kyllä | Pariisi → Marseille → Barcelona → Madrid → Granada |
| Košice | 1381 | 17 | 1.5 | 292 | 1.5 | 6 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Praha → Krakova → Košice |
| Sevilla | 1442 | 11 | 1.0 | 296 | 1.0 | 4 | kyllä | Pariisi → Marseille → Barcelona → Madrid → Sevilla |
| Oslo | 1342 | 16 | 1.3 | 296 | 1.3 | 5 | kyllä | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina → Oslo |
| Tukholma | 1544 | 16 | 1.3 | 301 | 1.3 | 5 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina → Tukholma |
| Vilna | 1696 | 16 | 1.3 | 306 | 1.3 | 5 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Vilna |
| Lissabon | 1454 | 11 | 1.0 | 311 | 1.0 | 4 | EI | Pariisi → Marseille → Barcelona → Madrid → Lissabon |
| Sarajevo | 1348 | 20 | 1.8 | 330 | 1.8 | 7 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien → Budapest → Sarajevo |
| Bergen | 1296 | 20 | 1.5 | 341 | 0.9 | 3 | EI | Pariisi → Lontoo → Edinburgh → Bergen |
| Islanti | 2229 | 111 | 0.9 | 341 | 0.9 | 3 | EI | Pariisi → Lontoo → Edinburgh → Islanti |
| Riika | 1703 | 17 | 1.6 | 347 | 1.6 | 6 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Vilna → Riika |
| Dubrovnik | 1401 | 21 | 2.0 | 351 | 2.0 | 8 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien → Budapest → Sarajevo → Dubrovnik |
| Kiova | 2024 | 17 | 1.4 | 352 | 1.4 | 5 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova |
| Bukarest | 1871 | 19 | 1.9 | 365 | 1.8 | 7 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien → Budapest → Bukarest |
| Tallinna | 1859 | 18 | 1.8 | 388 | 1.8 | 7 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Vilna → Riika → Tallinna |
| Sofia | 1757 | 20 | 2.2 | 396 | 2.0 | 8 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien → Budapest → Sarajevo → Sofia |
| Odessa | 2129 | 18 | 1.7 | 418 | 1.7 | 6 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Odessa |
| Sisilia | 1485 | 119 | 1.5 | 439 | 1.5 | 6 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Firenze → Rooma → Sisilia |
| Pietari | 2164 | 19 | 2.1 | 439 | 2.1 | 8 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Vilna → Riika → Tallinna → Pietari |
| Moskova | 2486 | 18 | 1.8 | 468 | 1.8 | 6 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Kiova → Moskova |
| Istanbul | 2254 | 21 | 2.4 | 472 | 2.2 | 9 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien → Budapest → Sarajevo → Sofia → Istanbul |
| Tromssa | 2481 | 22 | 1.7 | 477 | 1.7 | 6 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina → Oslo → Tromssa |
| Ateena | 2096 | 22 | 2.5 | 478 | 2.3 | 9 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Ljubljana → Wien → Budapest → Sarajevo → Sofia → Ateena |
| Helsinki | 1908 | 21 | 2.3 | 486 | 2.3 | 9 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Vilna → Riika → Tallinna → Pietari → Helsinki |
| Tampere | 1938 | 24 | 2.6 | 514 | 2.6 | 10 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Varsova → Vilna → Riika → Tallinna → Pietari → Helsinki → Tampere |
| Rovaniemi | 2373 | 25 | 2.0 | 550 | 2.0 | 7 | EI | Pariisi → Bryssel → Amsterdam → Berliini → Kööpenhamina → Oslo → Tromssa → Rovaniemi |
| Valletta | 1749 | 222 | 1.8 | 642 | 1.8 | 7 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Firenze → Rooma → Sisilia → Valletta |
| Kreeta | 2405 | 124 | 2.7 | 644 | 1.9 | 7 | EI | Pariisi → Luxemburg → Alpit → Venetsia → Firenze → Rooma → Sisilia → Kreeta |

## Tukholma: ilman tuloja ennen 49/49, jälkeen 22/49

| kohde | km | ennen £ | ennen pv | jälkeen £ | jälkeen pv | matkoja | ilman tuloja | halvin reitti nyt |
|---|---|---|---|---|---|---|---|---|
| Oslo | 417 | 3 | 0.2 | 68 | 0.2 | 1 | kyllä | Tukholma → Oslo |
| Kööpenhamina | 522 | 3 | 0.2 | 83 | 0.2 | 1 | kyllä | Tukholma → Kööpenhamina |
| Bergen | 720 | 6 | 0.5 | 116 | 0.5 | 2 | kyllä | Tukholma → Oslo → Bergen |
| Berliini | 811 | 6 | 0.5 | 141 | 0.5 | 2 | kyllä | Tukholma → Kööpenhamina → Berliini |
| Praha | 1054 | 10 | 0.8 | 185 | 0.8 | 3 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha |
| Helsinki | 396 | 17 | 2.0 | 203 | 0.2 | 1 | kyllä | Tukholma → Helsinki |
| Riika | 442 | 13 | 1.3 | 203 | 0.2 | 1 | kyllä | Tukholma → Riika |
| Varsova | 810 | 10 | 0.8 | 225 | 0.8 | 3 | kyllä | Tukholma → Kööpenhamina → Berliini → Varsova |
| Wien | 1242 | 12 | 1.0 | 227 | 1.0 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Wien |
| Amsterdam | 1126 | 10 | 0.8 | 230 | 0.8 | 3 | kyllä | Tukholma → Kööpenhamina → Berliini → Amsterdam |
| Tampere | 394 | 15 | 1.2 | 231 | 0.5 | 2 | kyllä | Tukholma → Helsinki → Tampere |
| Vilna | 675 | 12 | 1.0 | 244 | 0.5 | 2 | kyllä | Tukholma → Riika → Vilna |
| Tallinna | 379 | 14 | 1.5 | 244 | 0.5 | 2 | kyllä | Tukholma → Riika → Tallinna |
| Krakova | 1037 | 12 | 1.0 | 247 | 1.0 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Krakova |
| Tromssa | 1152 | 9 | 0.7 | 249 | 0.7 | 2 | kyllä | Tukholma → Oslo → Tromssa |
| Pietari | 691 | 16 | 1.8 | 251 | 0.5 | 2 | kyllä | Tukholma → Helsinki → Pietari |
| Bryssel | 1280 | 13 | 1.0 | 258 | 1.0 | 4 | kyllä | Tukholma → Kööpenhamina → Berliini → Amsterdam → Bryssel |
| Budapest | 1318 | 15 | 1.2 | 260 | 1.2 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest |
| Alpit | 1570 | 10 | 0.8 | 260 | 0.8 | 3 | kyllä | Tukholma → Kööpenhamina → Berliini → Alpit |
| Ljubljana | 1495 | 15 | 1.2 | 270 | 1.2 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Ljubljana |
| Košice | 1198 | 14 | 1.2 | 274 | 1.2 | 5 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Krakova → Košice |
| Venetsia | 1591 | 13 | 1.0 | 297 | 1.5 | 6 | kyllä | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Ljubljana → Venetsia |
| Pariisi | 1544 | 16 | 1.3 | 301 | 1.3 | 5 | EI | Tukholma → Kööpenhamina → Berliini → Amsterdam → Bryssel → Pariisi |
| Luxemburg | 1323 | 13 | 1.0 | 318 | 1.0 | 4 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Luxemburg |
| Rovaniemi | 885 | 12 | 0.9 | 320 | 0.8 | 3 | EI | Tukholma → Helsinki → Tampere → Rovaniemi |
| Edinburgh | 1313 | 23 | 1.8 | 321 | 0.9 | 3 | EI | Tukholma → Oslo → Bergen → Edinburgh |
| Sarajevo | 1719 | 17 | 1.5 | 322 | 1.5 | 6 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest → Sarajevo |
| Marseille | 1981 | 13 | 1.0 | 323 | 1.0 | 4 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille |
| Firenze | 1791 | 16 | 1.3 | 330 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Ljubljana → Venetsia → Firenze |
| Kiova | 1264 | 13 | 1.1 | 333 | 1.1 | 4 | EI | Tukholma → Kööpenhamina → Berliini → Varsova → Kiova |
| Dubrovnik | 1856 | 18 | 1.8 | 343 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest → Sarajevo → Dubrovnik |
| Moskova | 1227 | 15 | 1.5 | 348 | 0.8 | 3 | EI | Tukholma → Helsinki → Pietari → Moskova |
| Lontoo | 1433 | 20 | 1.5 | 355 | 1.5 | 6 | EI | Tukholma → Kööpenhamina → Berliini → Amsterdam → Bryssel → Pariisi → Lontoo |
| Bukarest | 1745 | 15 | 1.6 | 357 | 1.5 | 6 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest → Bukarest |
| Rooma | 1977 | 20 | 1.5 | 368 | 2.0 | 8 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Ljubljana → Venetsia → Firenze → Rooma |
| Barcelona | 2278 | 16 | 1.3 | 376 | 1.3 | 5 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille → Barcelona |
| Sofia | 1884 | 17 | 1.9 | 388 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest → Sarajevo → Sofia |
| Odessa | 1656 | 14 | 1.4 | 399 | 1.4 | 5 | EI | Tukholma → Kööpenhamina → Berliini → Varsova → Kiova → Odessa |
| Islanti | 2129 | 113 | 1.0 | 453 | 1.0 | 3 | EI | Tukholma → Oslo → Tromssa → Islanti |
| Madrid | 2593 | 18 | 1.5 | 453 | 1.5 | 6 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille → Barcelona → Madrid |
| Istanbul | 2173 | 18 | 2.1 | 464 | 2.0 | 8 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest → Sarajevo → Sofia → Istanbul |
| Ateena | 2408 | 18 | 2.2 | 469 | 2.0 | 8 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest → Sarajevo → Sofia → Ateena |
| Granada | 2911 | 20 | 1.8 | 510 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille → Barcelona → Madrid → Granada |
| Sevilla | 2983 | 20 | 1.8 | 515 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille → Barcelona → Madrid → Sevilla |
| Dublin | 1628 | 123 | 1.8 | 524 | 1.1 | 4 | EI | Tukholma → Oslo → Bergen → Edinburgh → Dublin |
| Lissabon | 2990 | 20 | 1.8 | 530 | 1.8 | 7 | EI | Tukholma → Kööpenhamina → Berliini → Alpit → Marseille → Barcelona → Madrid → Lissabon |
| Sisilia | 2382 | 120 | 2.5 | 571 | 2.2 | 9 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Ljubljana → Venetsia → Firenze → Rooma → Sisilia |
| Kreeta | 2724 | 120 | 2.4 | 671 | 2.3 | 9 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Budapest → Sarajevo → Sofia → Ateena → Kreeta |
| Valletta | 2618 | 223 | 2.7 | 775 | 2.5 | 10 | EI | Tukholma → Kööpenhamina → Berliini → Praha → Wien → Ljubljana → Venetsia → Firenze → Rooma → Sisilia → Valletta |
