# Todistusajo: j146vie-12-iss-ohjaamo 5c1d69bf

**j146vie-12-iss-ohjaamo 5c1d69bf: OK**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `12-iss-ohjaamo.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-j146vie-12-iss-ohjaamo-20261006-0953`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 5c1d69bf = 5c1d69bf

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupolaan (kyyti Ikkuna)` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (51,35, 71,73) 430 km suunta 82°, laatu Tarkka, kamera (51,35, 71,72) 19183 km kall 0,0° suunt 0° fov 50 |
| `ui-puu: joystick näkyy (kuvanahka: sauvakuva; osuma-ala ei piirry ui-puuhun)` | OK: 'mk-issohjaamo__sauvakuva' näkyy (87.5 770.1) |
| `veto-kohta 0.36 0.5 0.36 0.5 1 mk-issohjaamo__sauvakuva → polku 69.4 770.1 → 69.4 770.1, pito 1 s` | lähetetty |
| `ei-oletus: PIIRRETYN sauvan keskeltä (36 % kuvan leveydestä): ei suuntaa (TF 145: Vasen)` | OK: ei riviä 3 s:ssa |
| `veto-kohta 0.36 0.5 0.9 0.5 2 mk-issohjaamo__sauvakuva → polku 69.4 770.1 → 139.4 770.1, pito 2 s` | lähetetty |
| `oletus: veto oikealle: suunta Oikea` | OK: linssit: ohjaamon joystick Oikea |
| `oletus: irrotus: suunta Ei` | OK: linssit: ohjaamon joystick Ei |
| `talteen kamera` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (51,50, 73,49) 430 km suunta 83°, laatu Tarkka, kamera (41,73, 73,53) 1200 km kall 74,0° suunt 180° fov 66 |
| `polku 60,550 230,650,800 230,650,1000` | lähetetty |
| `ei-oletus: pallon veto ei ohjaa joystickia` | OK: ei riviä 2 s:ssa |
| `vertaa: pallon veto + pito ei liikuta kameraa (lat/lon ≤ 1°, km ≤ 100, kall ≤ 3°)` | OK 41,73→41,77 / 73,53→73,98 / 1200→1200 / 74,0→74,0 (ei muutosta yli toleranssin) |

- **OK** 3 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [12a-keski.png](kuvat/12a-keski.png): Joystick painettu keskeltä: ei liikettä (1206×2622 px, pysty)
- **OK** [12b-oikea.png](kuvat/12b-oikea.png): Joystick oikealle ja irti (1206×2622 px, pysty)
- **OK** [12c-ennen-vetoa.png](kuvat/12c-ennen-vetoa.png): Ennen pallon vetoa (1206×2622 px, pysty)
- **OK** [12d-vedon-jalkeen.png](kuvat/12d-vedon-jalkeen.png): Pallon vedon jälkeen: sama näkymä (vain joystick ohjaa) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.57 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 17.24): kuormitus 17.24 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
