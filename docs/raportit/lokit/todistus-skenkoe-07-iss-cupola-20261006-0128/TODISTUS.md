# Todistusajo: skenkoe-07-iss-cupola f16f7fa7

**skenkoe-07-iss-cupola f16f7fa7: PUUTE — 2: astronautin kamera aukesi: ei lokiriviä; 2: taulun ISS-ohjaamo-rivi avasi Cupolan: ei lokiriviä; 2: ohjaamon joystick näkyy: 'mk-issohjaamo__joyosuma' ei näy**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `07-iss-cupola.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-skenkoe-07-iss-cupola-20261006-0128`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | PUUTE: ei riviä 30 s:ssa |
| `ui-puu: Pulun taulu avautui itsestään paljastuksen jälkeen` | OK: 'Minne katsotaan' näkyy (91.5 529.0) |
| `tap-teksti ISS-ohjaamo → tap 84.8 650.1` | lähetetty |
| `oletus: taulun ISS-ohjaamo-rivi avasi Cupolan` | PUUTE: ei riviä 60 s:ssa |
| `ui-puu: ohjaamon joystick näkyy` | PUUTE |
| `ui-puu: LCD näkyy` | PUUTE |
| `ui-puu: kameranappi näkyy` | OK: 'mk-issohjaamo__kamera' näkyy (270.5 775.3) |
| `ui-puu: taulu auki uudelleen` | OK: 'Minne katsotaan' näkyy (226.5 283.0) |
| `tap-teksti Poistu → tap 197.3 451.1` | lähetetty |
| `oletus: Poistu sulki linssin` | OK: linssit: auki: ei mitään |

- **PUUTE** astronautin kamera aukesi: ei lokiriviä
- **PUUTE** taulun ISS-ohjaamo-rivi avasi Cupolan: ei lokiriviä
- **PUUTE** ohjaamon joystick näkyy: 'mk-issohjaamo__joyosuma' ei näy
- **PUUTE** LCD näkyy: 'mk-issohjaamo__lcd' ei näy

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [07a-taulu.png](kuvat/07a-taulu.png): Pulun taulu: Maapallo · Astronauttien kuvat · ISS-ohjaamo · Poistu (1206×2622 px, pysty)
- **OK** [07b-cupola.png](kuvat/07b-cupola.png): Cupola: ohjaamo alareunassa (joystick vasemmalla, LCD, kamera, kaasu oikealla) (1206×2622 px, pysty)
- **OK** [07c-kartta.png](kuvat/07c-kartta.png): Takaisin kartalla (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.84 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [Silmukka:https://media.matkakirja.app/aane)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 39.41): kuormitus 39.41 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
