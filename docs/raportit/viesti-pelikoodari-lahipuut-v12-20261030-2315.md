# Pelikoodari: lahipuut-v12 (kujien puut pois) ja kuvapari, 30.10.2026 klo 23.15

## Paketti
- `proto-3d/_valmiit/juoksupeli-kk-pelikoodari-lahipuut-v12-vienti-20261030`: SHA256SUMS OK, LAHTEET.md.
  Proto 290624e19 (haara pelikoodari/lahipuut-v12-216, pohjana junan runko 782e348cf, vain `LahipuutKansio` v11 → v12).
- **Pois 249 puuta** (v11: 5184 → 4935). Poistetaan puut, joiden runko on kujan lattialla:
  kk-pohja-v1d-pk7:n kujamonikulmiossa (keskilinja ± leveys/2 + 1 m) tai muurin sisällä.
  Syy: v7-tihennys ("saavutettavien pihojen reunat 0,8–1,5 m seinästä") tulkitsi kujat pihoiksi; v5:ssä kujilla oli 4 puuta.
- **Muurien takana olevat jäävät** (omistaja 24.10. 02.38): puu jää, jos jana kujan keskilinjalta puuhun leikkaa muurin
  (pohja.json:n muurit ja osasarja-v5:n seinäpolut). 67 puuta jäi tällä säännöllä, niistä 39 kuja-8:lla.
- Kuja 02/05 (kuja-40/40b): pois 20. Kuja-40:llä haetaan 6 m:n päähän keskilinjasta, koska kujaa on levennetty
  (omistaja 25.10.: 02 7,7 m, 05 10,7 m), mutta pohja.json:ssa leveys on yhä 4,47 m. Ilman tätä kaksi puuta jäi kujan 05 lattialle
  (−254,0, 385,8) ja (−254,4, 395,8), 1,3–1,7 m:n päähän länsimuurista. Ne näkyvät v12-ajon kuvassa v2-05-peli, joka on otettu ennen niiden poistoa.

## Avoimet (PT päättää; ei poistettu)
Muilla kujilla on 9 puuta 3,8–5,8 m:n päässä keskilinjasta ilman väliin jäävää muuria; lähin muuri on 1,0–13 m:n päässä.
Pohjakartasta ei voi päätellä, ovatko ne kujan lattialla vai viereisellä aukealla.
- kuja-403: (220,8, 407,8), (219,5, 459,2), (218,4, 439,3), (219,2, 419,1)
- kuja-68: (−156,9, 187,1)
- kuja-404: (220,8, 146,5)
- kuja-406: (234,6, −17,1)
- kuja-67: (−140,9, 299,8), muuri 1,05 m
- kuja-7: (−302,7, 292,0), muuri 2,5 m

## Kuvapari (Unity linjalla 2, VS:n diagnoosi 3:n jälkeen)
- v11 = 233ba42b9 (`esikatselu-20261030-230004`) vs v12 = a627dffbc (`-230852`). Molemmat: runko 782e348cf + QA-orto 84b4db5b1/a50a8cb7f.
- Rinnakkaiskuvat: `proto-3d/_tyo/pelikoodari/piirrokset-20261030/puut-v12/parit/pari-*.png`.
  - **Vertailukelpoiset ovat ylhäältä otetut** (`-yla`): 02 (kujan puut pois, muurien takana jäävät), 05, 07 (ei eroa) ja kuja-8 (vain muutama aukean nauhan puu pois).
  - v11-ajon pelikuvat (`-peli`) jäivät korkealle yleiskuvaan, joten pelikuvaparit eivät ole vertailukelpoisia.
- **Sivulöydös (kohta 2a):** v12-ajon `v2-02-peli` rungosta 782e348cf näyttää kujan 02 molemmat punaiset muurit kokonaisina.
