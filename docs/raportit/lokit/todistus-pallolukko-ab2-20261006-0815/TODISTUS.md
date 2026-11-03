# Todistusajo: pallolukko-ab2 7ac47be9

**pallolukko-ab2 7ac47be9: PUUTE — 2: LUKKO POIS: pallon veto liikuttaa kameraa (vika näkyy): 50,22→50,28 / 86,25→86,59 / 1199→1200 / 74,0→74,0 (ei muutosta yli toleranssin)**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `pallolukko-ab.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-pallolukko-ab2-20261006-0815`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7ac47be9 = 7ac47be9

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupolaan (kyyti Ikkuna)` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (46,35, 72,13) 430 km suunta 62°, laatu Tarkka, kamera (46,35, 72,13) 19183 km kall 0,0° suunt 0° fov 50 |
| `ui-puu: ohjaamo näkyy` | OK: 'mk-issohjaamo__sauvakuva' näkyy (87.5 770.1) |
| `oletus: lukko pois (entinen käytös)` | OK: linssit: astro kyyti pallolukko pois, pallo lukittu |
| `talteen kameraA` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (46,52, 72,62) 430 km suunta 63°, laatu Tarkka, kamera (50,22, 86,25) 1199 km kall 74,0° suunt 73° fov 66 |
| `polku 60,550 230,650,800 230,650,1000` | lähetetty |
| `vertaa: LUKKO POIS: pallon veto liikuttaa kameraa (vika näkyy)` | PUUTE 50,22→50,28 / 86,25→86,59 / 1199→1200 / 74,0→74,0 (ei muutosta yli toleranssin) |
| `oletus: takaisin Cupolaan` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (46,74, 73,24) 430 km suunta 63°, laatu Tarkka, kamera (46,71, 73,15) 19183 km kall 0,0° suunt 0° fov 50 |
| `oletus: lukko päällä` | OK: linssit: astro kyyti pallolukko päällä, pallo auki |
| `talteen kameraB` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (46,87, 73,61) 430 km suunta 64°, laatu Tarkka, kamera (50,42, 87,40) 1200 km kall 74,0° suunt 74° fov 66 |
| `polku 60,550 230,650,800 230,650,1000` | lähetetty |
| `vertaa: LUKKO PÄÄLLÄ: pallon veto + pito ei liikuta kameraa` | OK 50,42→50,48 / 87,40→87,74 / 1200→1200 / 74,0→74,0 (ei muutosta yli toleranssin) |

- **PUUTE** LUKKO POIS: pallon veto liikuttaa kameraa (vika näkyy): 50,22→50,28 / 86,25→86,59 / 1199→1200 / 74,0→74,0 (ei muutosta yli toleranssin)

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [pA1-ennen.png](kuvat/pA1-ennen.png): Lukko pois: ennen vetoa (1206×2622 px, pysty)
- **OK** [pA2-jalkeen.png](kuvat/pA2-jalkeen.png): Lukko pois: vedon jälkeen (kartta liikkui) (1206×2622 px, pysty)
- **OK** [pB1-ennen.png](kuvat/pB1-ennen.png): Lukko päällä: ennen vetoa (1206×2622 px, pysty)
- **OK** [pB2-jalkeen.png](kuvat/pB2-jalkeen.png): Lukko päällä: vedon jälkeen (sama näkymä) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.51 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 50.70): Unity -batchmode | kuormitus 50.70 > 16 ydintä

## 8. Ei testattu
- **EI** kahden sormen nipistys pallolla (simkosketus tekee yhden sormen eleitä; Päätoimittaja: myöhemmin)
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
