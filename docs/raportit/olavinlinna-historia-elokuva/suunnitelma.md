# Olavinlinnan historia-animaatio: ohjaajan suunnitelma (Siirtoseppä 9.10.2026, juna 174)

Työtapa: Raamattu **LIIKKUVAT KOHTAUKSET TEHDÄÄN KUIN ELOKUVA** (omistaja 9.10.2026, PR #4264), viisi kohtaa. Tämä kansio
sisältää suunnitelman, liikesäännöt, kohtauslistan ja arviot. Koodi: proto `Ydin/Dioraama/Historiajana.cs` (kohtauslista,
kamera, aikajana) ja `Linssit/Unity/SeikkailuHistoria.cs` + `SeikkailuVaiheet.cs` (toisto, vaihemallit, kertoja).

## Mitä katsojan pitää muistaa

1. **Linna on ihmisen tekemä saarelle:** ensin oli vain kallio ja virta (jääkausi, kivikausi), sitten puu (1475) ja kivi (1477).
2. **Linna muuttui omistajien mukana:** Tott ja Bielke (1400-luku), Vaasa-ajan korotukset (1500-luku), Venäjän bastionit (1743–1750-luku).
3. **Linna oli välillä raunio ja se pelastettiin:** palot 1868–1869, restauroinnit 1872–1878 ja 1961–1975, oopperajuhlat.

Kaikki muu (kameran kierto, kasvavat osat, vuosiluvut) palvelee näitä kolmea. Pelaajan vuosi 1499 on keskellä kertomusta
(kohtaus 5), jotta pelin linna asettuu jatkumoon.

## Rakenne

- 11 kohtausta, 2:16 (135,8 s). Kertojan 9 riviä (William, Sisältökirjurin #4249/#4259) ovat aikajanan selkäranka:
  kohtauksen kesto = 0,8 s viive + rivin kesto + hengähdys (≤ 1,7 s). Ei tyhjiä taukoja, ei päällekkäistä puhetta.
- Rivi 9 kantaa kaksi kohtausta: 1872 (Kiseleff) vaihtuu suureen restaurointiin sanalla "suuri restaurointi".
- Viimeinen kohtaus (nykylinna, 8 s) on hiljainen loppukuva Kellotornin kaaren suuntaan, josta pelattava pala alkaa.
- Avainsana (vuosiluku + sanat, 4 s) ilmestyy, kun kertoja sanoo vuoden (sana-ajat `opas/<sha>.ajat.json`).
- Vaihemallit (LR): tyhjä saari –1475, puuvarustus 1475–1477, palon jäljet 1868–1872, restaurointitelineet 1961–1975.
  Vuoden 1499 jälkeiset osat (bastionit, ponttonisilta) kasvavat maasta ylös.

## Mitä EI ole

- Ei äkkikäännöksiä, ei leikkauksia, ei kameran pysähdyksiä kohtausten rajoilla (yksi jatkuva drone-liike).
- Ei Pulua (historia on esittely, ei peli; Pulu kuuluu linnan esittelyyn napautuksesta, ei tähän).
- Ei tekstiä pelin aikana (K2-lyhennys palan lopussa on 8 s ilman tekstiä ja kertojaa).

Liikesäännöt: [liikesaannot.md](liikesaannot.md). Kohtauslista: [kohtauslista.md](kohtauslista.md). Arviot: `arvio-*.md`.
