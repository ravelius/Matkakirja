# Todistusajo: pallolukko-ab 7ac47be9

**pallolukko-ab 7ac47be9: PUUTE — 2: LUKKO POIS: pallon veto liikuttaa kameraa (vika näkyy): 47,01→47,12 / 73,76→74,06 / 1198→1198 / 74,0→74,0 (ei muutosta yli toleranssin); 2: lukko päällä: ei lokiriviä**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `pallolukko-ab.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-pallolukko-ab-20261006-0813`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7ac47be9 = 7ac47be9

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupolaan (kyyti Ikkuna)` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (41,70, 61,67) 429 km suunta 54°, laatu Tarkka, kamera (41,70, 61,66) 19183 km kall 0,0° suunt 0° fov 50 |
| `ui-puu: ohjaamo näkyy` | OK: 'mk-issohjaamo__sauvakuva' näkyy (87.5 770.1) |
| `oletus: lukko pois (entinen käytös)` | OK: linssit: astro kyyti pallolukko pois, pallo lukittu |
| `talteen kameraA` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (41,93, 62,08) 429 km suunta 55°, laatu Tarkka, kamera (47,01, 73,76) 1198 km kall 74,0° suunt 63° fov 66 |
| `polku 150,300 260,460,800 260,460,1000` | lähetetty |
| `vertaa: LUKKO POIS: pallon veto liikuttaa kameraa (vika näkyy)` | PUUTE 47,01→47,12 / 73,76→74,06 / 1198→1198 / 74,0→74,0 (ei muutosta yli toleranssin) |
| `oletus: takaisin Cupolaan` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (42,20, 62,61) 429 km suunta 55°, laatu Tarkka, kamera (42,16, 62,54) 19183 km kall 0,0° suunt 0° fov 50 |
| `oletus: lukko päällä` | PUUTE: ei riviä 5 s:ssa |
| `talteen kameraB` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (42,55, 63,29) 429 km suunta 55°, laatu Tarkka, kamera (47,49, 75,21) 1198 km kall 74,0° suunt 64° fov 66 |
| `polku 150,300 260,460,800 260,460,1000` | lähetetty |
| `vertaa: LUKKO PÄÄLLÄ: pallon veto + pito ei liikuta kameraa` | OK 47,49→47,57 / 75,21→75,47 / 1198→1198 / 74,0→74,0 (ei muutosta yli toleranssin) |

- **PUUTE** LUKKO POIS: pallon veto liikuttaa kameraa (vika näkyy): 47,01→47,12 / 73,76→74,06 / 1198→1198 / 74,0→74,0 (ei muutosta yli toleranssin)
- **PUUTE** lukko päällä: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [pA1-ennen.png](kuvat/pA1-ennen.png): Lukko pois: ennen vetoa (1206×2622 px, pysty)
- **OK** [pA2-jalkeen.png](kuvat/pA2-jalkeen.png): Lukko pois: vedon jälkeen (kartta liikkui) (1206×2622 px, pysty)
- **OK** [pB1-ennen.png](kuvat/pB1-ennen.png): Lukko päällä: ennen vetoa (1206×2622 px, pysty)
- **OK** [pB2-jalkeen.png](kuvat/pB2-jalkeen.png): Lukko päällä: vedon jälkeen (sama näkymä) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.17 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 14.68)

## 8. Ei testattu
- **EI** kahden sormen nipistys pallolla (simkosketus tekee yhden sormen eleitä; Päätoimittaja: myöhemmin)
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
