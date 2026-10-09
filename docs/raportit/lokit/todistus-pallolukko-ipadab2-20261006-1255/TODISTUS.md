# Todistusajo: pallolukko-ipadab2 eb6ac1aa

**pallolukko-ipadab2 eb6ac1aa: PUUTE — 2: LUKKO 0: nipistys liikuttaa kameraa (vika näkyy): 1010→1010 / 68,9→68,9 / 66→66 (ei muutosta yli toleranssin)**

Laite ipad `CD526454-E966-48B4-AB1F-9EFDAA0BEF53`, skenaario `pallolukko-ipad-ab.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-pallolukko-ipadab2-20261006-1255`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt eb6ac1aa = eb6ac1aa

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupolaan (ISS-ohjaamo)` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (47,94, 6,18) 430 km suunta 66°, laatu Tarkka, kamera (47,94, 6,17) 10484 km kall 0,0° suunt 0° fov 50 |
| `talteen iA0` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (48,09, 6,70) 430 km suunta 67°, laatu Tarkka, kamera (50,67, 18,29) 1010 km kall 68,9° suunt 76° fov 66 |
| `vertaa: LUKKO 0: nipistys liikuttaa kameraa (vika näkyy)` | PUUTE 1010→1010 / 68,9→68,9 / 66→66 (ei muutosta yli toleranssin) |
| `talteen iA1` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (48,80, 9,34) 430 km suunta 69°, laatu Tarkka, kamera (51,07, 21,22) 1010 km kall 68,9° suunt 78° fov 66 |
| `vertaa: LUKKO 1: nipistys ei liikuta kameraa` | OK 1010→1010 / 68,9→68,9 / 66→66 (ei muutosta yli toleranssin) |

- **PUUTE** LUKKO 0: nipistys liikuttaa kameraa (vika näkyy): 1010→1010 / 68,9→68,9 / 66→66 (ei muutosta yli toleranssin)

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [iA0-ennen.png](kuvat/iA0-ennen.png): ennen nipistystä (2064×2752 px, pysty)
- **OK** [iA0-jalkeen.png](kuvat/iA0-jalkeen.png): nipistyksen jälkeen (2064×2752 px, pysty)
- **OK** [iA1-ennen.png](kuvat/iA1-ennen.png): ennen nipistystä (2064×2752 px, pysty)
- **OK** [iA1-jalkeen.png](kuvat/iA1-jalkeen.png): nipistyksen jälkeen (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.12 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 100.33): xcodebuild | kuormitus 100.33 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
