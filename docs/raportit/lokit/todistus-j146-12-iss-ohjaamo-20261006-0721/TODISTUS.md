# Todistusajo: j146-12-iss-ohjaamo 7ac47be9

**j146-12-iss-ohjaamo 7ac47be9: PUUTE — 2: PIIRRETYN sauvan keskeltä (36 % kuvan leveydestä): ei suuntaa (TF 145: Vasen): rivi tuli (linssit: ohjaamon joystick Vasen)**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `12-iss-ohjaamo.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-j146-12-iss-ohjaamo-20261006-0721`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7ac47be9 = 7ac47be9

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupolaan (kyyti Ikkuna)` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (8,53, 26,98) 424 km suunta 36°, laatu Tarkka, kamera (-29,06, -123,84) 19183 km kall 0,0° suunt 0° fov 50 |
| `ui-puu: joystick näkyy (kuvanahka: sauvakuva; osuma-ala ei piirry ui-puuhun)` | OK: 'mk-issohjaamo__sauvakuva' näkyy (87.5 770.1) |
| `veto-kohta 0.36 0.5 0.36 0.5 1 mk-issohjaamo__sauvakuva → polku 69.4 770.1 → 69.4 770.1, pito 1 s` | lähetetty |
| `ei-oletus: PIIRRETYN sauvan keskeltä (36 % kuvan leveydestä): ei suuntaa (TF 145: Vasen)` | PUUTE: linssit: ohjaamon joystick Vasen |
| `veto-kohta 0.36 0.5 0.9 0.5 2 mk-issohjaamo__sauvakuva → polku 69.4 770.1 → 139.4 770.1, pito 2 s` | lähetetty |
| `oletus: veto oikealle: suunta Oikea` | OK: linssit: ohjaamon joystick Oikea |
| `oletus: irrotus: suunta Ei` | OK: linssit: ohjaamon joystick Ei |
| `veto 200 250 80 330 0.4` | lähetetty |
| `ei-oletus: pallon veto ei ohjaa joystickia` | OK: ei riviä 3 s:ssa |

- **PUUTE** PIIRRETYN sauvan keskeltä (36 % kuvan leveydestä): ei suuntaa (TF 145: Vasen): rivi tuli (linssit: ohjaamon joystick Vasen)

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [12a-keski.png](kuvat/12a-keski.png): Joystick painettu keskeltä: ei liikettä (1206×2622 px, pysty)
- **OK** [12b-oikea.png](kuvat/12b-oikea.png): Joystick oikealle ja irti (1206×2622 px, pysty)
- **OK** [12c-ennen-vetoa.png](kuvat/12c-ennen-vetoa.png): Ennen pallon vetoa (1206×2622 px, pysty)
- **OK** [12d-vedon-jalkeen.png](kuvat/12d-vedon-jalkeen.png): Pallon vedon jälkeen: sama näkymä (vain joystick ohjaa) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.05 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 15.06)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
