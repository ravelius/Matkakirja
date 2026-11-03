# Todistusajo: pallolukko-tilat eb6ac1aa

**pallolukko-tilat eb6ac1aa: PUUTE — 2: LUKKO 0 Ikkuna: nipistys muuttaa km/kall/suunt/fov (vika näkyy): 1189→1189 / 74,0→74,0 / 37→38 / 66→66 (ei muutosta yli toleranssin); 2: LUKKO 0 Ikkuna: kierto muuttaa km/kall/suunt/fov (vika näkyy): 1189→1189 / 74,0→74,0 / 38→38 / 66→66 (ei muutosta yli toleranssin); 2: LUKKO 0 Kohde: veto muuttaa km/kall/suunt/fov (vika näkyy): 1190→1190 / 74,0→74,0 / 39→40 / 66→66 (ei muutosta yli toleranssin)**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `pallolukko-tilat.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-pallolukko-tilat-20261006-1229`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt eb6ac1aa = eb6ac1aa

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupolaan` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (10,22, -42,62) 424 km suunta 36°, laatu Tarkka, kamera (-20,88, -65,64) 19183 km kall 0,0° suunt 0° fov 50 |
| `talteen Ik0nipistys` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (10,54, -42,39) 424 km suunta 36°, laatu Tarkka, kamera (18,31, -36,41) 1189 km kall 74,0° suunt 37° fov 66 |
| `vertaa: LUKKO 0 Ikkuna: nipistys muuttaa km/kall/suunt/fov (vika näkyy)` | PUUTE 1189→1189 / 74,0→74,0 / 37→38 / 66→66 (ei muutosta yli toleranssin) |
| `talteen Ik0kierto` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (11,66, -41,55) 424 km suunta 36°, laatu Tarkka, kamera (19,40, -35,51) 1189 km kall 74,0° suunt 38° fov 66 |
| `vertaa: LUKKO 0 Ikkuna: kierto muuttaa km/kall/suunt/fov (vika näkyy)` | PUUTE 1189→1189 / 74,0→74,0 / 38→38 / 66→66 (ei muutosta yli toleranssin) |
| `talteen Ik1nipistys` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (12,83, -40,67) 424 km suunta 36°, laatu Tarkka, kamera (20,54, -34,55) 1189 km kall 74,0° suunt 38° fov 66 |
| `vertaa: LUKKO 1 Ikkuna: nipistys ei muuta kameraa` | OK 1189→1189 / 74,0→74,0 / 38→39 / 66→66 (ei muutosta yli toleranssin) |
| `talteen Ik1kierto` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (13,95, -39,83) 424 km suunta 37°, laatu Tarkka, kamera (21,62, -33,62) 1189 km kall 74,0° suunt 39° fov 66 |
| `vertaa: LUKKO 1 Ikkuna: kierto ei muuta kameraa` | OK 1189→1189 / 74,0→74,0 / 39→39 / 66→66 (ei muutosta yli toleranssin) |
| `oletus: Kohde-tila` | OK: linssit: astro kyyti kohde: venetsia: alus siirtyy (katse säilyy) |
| `talteen Ko0veto` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (15,52, -38,60) 424 km suunta 37°, laatu Tarkka, kamera (45,87, 12,84) 1190 km kall 74,0° suunt 39° fov 66 |
| `vertaa: LUKKO 0 Kohde: veto muuttaa km/kall/suunt/fov (vika näkyy)` | PUUTE 1190→1190 / 74,0→74,0 / 39→40 / 66→66 (ei muutosta yli toleranssin) |
| `talteen Ko0nipistys` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (16,62, -37,73) 425 km suunta 37°, laatu Tarkka, kamera (46,93, 14,13) 1190 km kall 74,0° suunt 40° fov 66 |
| `vertaa: LUKKO 0 Kohde: nipistys muuttaa km/kall/suunt/fov (vika näkyy)` | PUUTE 1190→1190 / 74,0→74,0 / 40→41 / 66→66 (ei muutosta yli toleranssin) |
| `talteen Ko1veto` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (17,77, -36,81) 425 km suunta 38°, laatu Tarkka, kamera (48,02, 15,55) 1190 km kall 74,0° suunt 41° fov 66 |
| `vertaa: LUKKO 1 Kohde: veto ei muuta kameraa` | OK 1190→1190 / 74,0→74,0 / 41→42 / 66→66 (ei muutosta yli toleranssin) |
| `talteen Ko1nipistys` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (18,99, -35,81) 425 km suunta 38°, laatu Tarkka, kamera (49,16, 17,12) 1190 km kall 74,0° suunt 43° fov 66 |
| `vertaa: LUKKO 1 Kohde: nipistys ei muuta kameraa` | OK 1190→1190 / 74,0→74,0 / 43→44 / 66→66 (ei muutosta yli toleranssin) |

- **PUUTE** LUKKO 0 Ikkuna: nipistys muuttaa km/kall/suunt/fov (vika näkyy): 1189→1189 / 74,0→74,0 / 37→38 / 66→66 (ei muutosta yli toleranssin)
- **PUUTE** LUKKO 0 Ikkuna: kierto muuttaa km/kall/suunt/fov (vika näkyy): 1189→1189 / 74,0→74,0 / 38→38 / 66→66 (ei muutosta yli toleranssin)
- **PUUTE** LUKKO 0 Kohde: veto muuttaa km/kall/suunt/fov (vika näkyy): 1190→1190 / 74,0→74,0 / 39→40 / 66→66 (ei muutosta yli toleranssin)
- **PUUTE** LUKKO 0 Kohde: nipistys muuttaa km/kall/suunt/fov (vika näkyy): 1190→1190 / 74,0→74,0 / 40→41 / 66→66 (ei muutosta yli toleranssin)

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [Ik0nipistys.png](kuvat/Ik0nipistys.png): Ikkuna lukko 0: nipistys jälkeen (1206×2622 px, pysty)
- **OK** [Ik0kierto.png](kuvat/Ik0kierto.png): Ikkuna lukko 0: kierto jälkeen (1206×2622 px, pysty)
- **OK** [Ik1nipistys.png](kuvat/Ik1nipistys.png): Ikkuna lukko 1: nipistys jälkeen (1206×2622 px, pysty)
- **OK** [Ik1kierto.png](kuvat/Ik1kierto.png): Ikkuna lukko 1: kierto jälkeen (1206×2622 px, pysty)
- **OK** [Ko0veto.png](kuvat/Ko0veto.png): Kohde lukko 0: veto jälkeen (1206×2622 px, pysty)
- **OK** [Ko0nipistys.png](kuvat/Ko0nipistys.png): Kohde lukko 0: nipistys jälkeen (1206×2622 px, pysty)
- **OK** [Ko1veto.png](kuvat/Ko1veto.png): Kohde lukko 1: veto jälkeen (1206×2622 px, pysty)
- **OK** [Ko1nipistys.png](kuvat/Ko1nipistys.png): Kohde lukko 1: nipistys jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 34.04 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 28.10): Unity -batchmode | kuormitus 28.10 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
