# Z10-kattavuus pohjalle 26 (Karttaseppä 26.9.2026, Fablen tilaus)

Tämä on laskelma, ei polttoa. Pohja 26 on nyt tasot z0–z8: 92 968 laattaa, keskikoko 29,7 kt, z8:n osuus 69 628 laattaa ja 2,07 Gt. Syväsarja z9–z10 poltettiin viimeksi pohjalle 23a:
13 332 + 51 800 laattaa, keskikoko 38 kt, z10:n osuus 1,97 Gt. Polttoon kului yöllä noin 100 min eli noin 525 laattaa minuutissa 12–16 ytimellä. Z10:n laatta on 512 px ja 0,267° leveä, keskileveyksillä noin 18 × 25 km (noin 40 m/px). Koko lauta on z10:ssä 1 350 × 822 laattaa.

## Vaihtoehdot

Laattamäärät on laskettu laudan Miller-geometriasta, maa-alueet Natural Earth 10m admin-0 -aineistosta.

| Alue | z10 | z9 | Yhteensä | Koko ämpärissä (38 kt) | Poltto yöllä (525/min) | Pelkkää maata z10:ssä |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Pelin kaupungit ±1° (266) | 21 545 | 6 622 | 28 167 | 1,1 Gt | ~55 min | 13 465 (62 %) |
| Fokusmaat kokonaan (14, lukitut ankkurit) | 8 319 | 2 342 | 10 661 | 0,4 Gt | ~20 min | 6 218 (75 %) |
| Maakuntamaat kokonaan (138) | 293 899 | 77 112 | 371 011 | 14,1 Gt | ~12 h (2 yötä) | 255 360 (87 %) |
| Koko maa-ala | 429 272 | 111 740 | 541 012 | 20,6 Gt | ~17 h (3 yötä) | 382 235 (89 %) |

Fokusmaat ovat AUT, BEL, CZE, DEU, DNK, ESP, FRA, GRC, HUN, ITA, NLD, POL, PRT ja SWE. Kaupunkien ja fokusmaiden alueet menevät osin päällekkäin, joten niiden yhdistelmä on noin 35 000 laattaa ja 1,3 Gt, yksi yö.
Natiivin pallo on nyt Z0–Z9. Pallon Z10 kaupunkien ±1°-alueelle olisi 21 726 laattaa, lähes sama määrä.

**Suositus:** kaupungit ±1° ja fokusmaat kokonaan, yksi yö (~1 h poltto). Tällä katetaan jokainen kaupungin lähizoomi, jossa pelaaja oikeasti käy. Maakuntamaat kokonaan kasvattaisi ämpäriä 14 Gt, eikä pelaaja näe z10:tä kaupunkien ulkopuolella muuten kuin panoroimalla.

## Delta-kelpoisuus

- **Tiiviste** (#3280): syvät tasot lukevat GLO-30:aa, joka on ollut täydellinen (26 452 ruutua) 25.9. klo 23 lähtien. Luettelon aineistotiiviste pysyy siis samana, kunnes DEM tai `--data` muuttuu.
- **Nykyinen delta ei kata syväsarjaa:** `--delta` hyväksyy vain koko pohjan (z0–z8), ja `--sarjat syva` hylätään. Z10-poltto on siis aina täysi, kunnes delta laajennetaan syviin tasoihin. Luokitin ja `vertaa` toimivat jo tasosta riippumatta, joten työtä jää ajuriin ja syvän listan luokitukseen.
- **Hyöty laajennuksesta:**
  - Meri-reseptissä kopioitaisiin pelkän maan laatat eli 62 % kaupunkialueen z10:stä (75–89 % isommilla alueilla), ja poltto lyhenisi samassa suhteessa.
  - Maa-reseptissä (kerma, rajat) piirretään lähes kaikki.
- **Suositus:** koska kaupunkialueen täysi poltto kestää vain noin tunnin, delta-laajennus kannattaa vasta, jos Z10 laajenee maakuntamaihin.

## Seuraava askel

Omistajan tai Fablen päätös alueesta. Sen jälkeen `polta-paikallisesti.sh --sarjat syva --syva-alue …` yöllä täysillä ytimillä. Nykyinen `--syva-alue` on yksi suorakaide, joten kaupunkien ±1°-lista vaatii monialuetuen tai kaupunkikohtaiset ajot.
