# Todistusajo: skenkoe-12-iss-ohjaamo f16f7fa7

**skenkoe-12-iss-ohjaamo f16f7fa7: PUUTE — 2: joystick näkyy: 'mk-issohjaamo__joyosuma' ei näy; 2: elementtiä 'mk-issohjaamo__joyosuma' ei ui-puussa; 2: elementtiä 'mk-issohjaamo__joyosuma' ei ui-puussa**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `12-iss-ohjaamo.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-skenkoe-12-iss-ohjaamo-20261006-0134`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupolaan (kyyti Ikkuna)` | OK: linssit: astro kyyti: Ikkuna (kyydissä True), ISS (6,28, 119,80) 424 km suunta 35°, laatu Tarkka, kamera (-34,95, 85,03) 19183 km kall 0,0° suunt 0° fov 50 |
| `ui-puu: joystick näkyy` | PUUTE |
| `veto-kohta 0.5 0.5 0.5 0.5 1 mk-issohjaamo__joyosuma` | EI LÖYDY ui-puusta |
| `ei-oletus: joystick keskeltä: ei suuntaa (kuollut alue)` | OK: ei riviä 3 s:ssa |
| `veto-kohta 0.5 0.5 0.9 0.5 2 mk-issohjaamo__joyosuma` | EI LÖYDY ui-puusta |
| `oletus: veto oikealle: suunta Oikea` | PUUTE: ei riviä 6 s:ssa |
| `oletus: irrotus: suunta Ei` | PUUTE: ei riviä 6 s:ssa |
| `veto 200 250 80 330 0.4` | lähetetty |
| `ei-oletus: pallon veto ei ohjaa joystickia` | OK: ei riviä 3 s:ssa |

- **PUUTE** joystick näkyy: 'mk-issohjaamo__joyosuma' ei näy
- **PUUTE** elementtiä 'mk-issohjaamo__joyosuma' ei ui-puussa
- **PUUTE** elementtiä 'mk-issohjaamo__joyosuma' ei ui-puussa
- **PUUTE** veto oikealle: suunta Oikea: ei lokiriviä
- **PUUTE** irrotus: suunta Ei: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [12a-keski.png](kuvat/12a-keski.png): Joystick painettu keskeltä: ei liikettä (1206×2622 px, pysty)
- **OK** [12b-oikea.png](kuvat/12b-oikea.png): Joystick oikealle ja irti (1206×2622 px, pysty)
- **OK** [12c-ennen-vetoa.png](kuvat/12c-ennen-vetoa.png): Ennen pallon vetoa (1206×2622 px, pysty)
- **OK** [12d-vedon-jalkeen.png](kuvat/12d-vedon-jalkeen.png): Pallon vedon jälkeen: sama näkymä (vain joystick ohjaa) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.76 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 17.10): kuormitus 17.10 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
