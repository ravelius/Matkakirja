# Todistusajo: pallolukko-2sormi eb6ac1aa

**pallolukko-2sormi eb6ac1aa: PUUTE — 2: LUKKO PÄÄLLÄ: nipistys ei liikuta kameraa: 18,24→19,50 / -36,47→-35,43 / 1189→1189 / 74,0→74,0 (1: 1.26 > 1; 2: 1.04 > 1)**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `pallolukko-2sormi.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-pallolukko-2sormi-20261006-1157`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt eb6ac1aa = eb6ac1aa

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupolaan (kyyti Ikkuna)` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (10,24, -42,61) 424 km suunta 36°, laatu Tarkka, kamera (-20,22, 157,03) 19183 km kall 0,0° suunt 0° fov 50 |
| `ui-puu: ohjaamo näkyy` | OK: 'mk-issohjaamo__sauvakuva' näkyy (87.5 770.1) |
| `oletus: lukko pois (entinen käytös)` | OK: linssit: astro kyyti pallolukko pois, pallo auki, kyyti Ikkuna |
| `talteen kameraA` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (10,55, -42,38) 424 km suunta 36°, laatu Tarkka, kamera (18,31, -36,40) 1189 km kall 74,0° suunt 37° fov 66 |
| `vertaa: LUKKO POIS: nipistys liikuttaa kameraa (vika näkyy)` | OK 18,31→19,59 / -36,40→-35,35 / 1189→1189 / 74,0→74,0 (1: 1.28 > 1; 2: 1.05 > 1) |
| `oletus: takaisin Cupolaan` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (10,23, -42,61) 424 km suunta 36°, laatu Tarkka, kamera (-21,92, 158,50) 19183 km kall 0,0° suunt 0° fov 50 |
| `oletus: lukko päällä` | OK: linssit: astro kyyti pallolukko päällä, pallo lukittu, kyyti Ikkuna |
| `talteen kameraB` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (10,47, -42,44) 424 km suunta 36°, laatu Tarkka, kamera (18,24, -36,47) 1189 km kall 74,0° suunt 37° fov 66 |
| `vertaa: LUKKO PÄÄLLÄ: nipistys ei liikuta kameraa` | PUUTE 18,24→19,50 / -36,47→-35,43 / 1189→1189 / 74,0→74,0 (1: 1.26 > 1; 2: 1.04 > 1) |

- **PUUTE** LUKKO PÄÄLLÄ: nipistys ei liikuta kameraa: 18,24→19,50 / -36,47→-35,43 / 1189→1189 / 74,0→74,0 (1: 1.26 > 1; 2: 1.04 > 1)

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [pA1-ennen.png](kuvat/pA1-ennen.png): Lukko pois: ennen nipistystä (1206×2622 px, pysty)
- **OK** [pA2-jalkeen.png](kuvat/pA2-jalkeen.png): Lukko pois: nipistyksen jälkeen (1206×2622 px, pysty)
- **OK** [pB1-ennen.png](kuvat/pB1-ennen.png): Lukko päällä: ennen nipistystä (1206×2622 px, pysty)
- **OK** [pB2-jalkeen.png](kuvat/pB2-jalkeen.png): Lukko päällä: nipistyksen jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.81 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 70.40): kuormitus 70.40 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
