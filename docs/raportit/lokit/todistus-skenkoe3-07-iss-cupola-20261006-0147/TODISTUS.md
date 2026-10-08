# Todistusajo: skenkoe3-07-iss-cupola f16f7fa7

**skenkoe3-07-iss-cupola f16f7fa7: OK**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `07-iss-cupola.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-skenkoe3-07-iss-cupola-20261006-0147`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `ui-puu: Pulun taulu avautui itsestään paljastuksen jälkeen` | OK: 'Minne katsotaan' näkyy (91.5 529.0) |
| `tap-teksti ISS-ohjaamo → tap 84.8 650.1` | lähetetty |
| `oletus: taulun ISS-ohjaamo-rivi avasi Cupolan` | OK: linssit: cupolan musta häivyy 4092 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/71, karkeita 0, lataus 89 %) |
| `ui-puu: ohjaamon joystick näkyy (kuvanahka)` | OK: 'mk-issohjaamo__sauvakuva' näkyy (87.5 770.1) |
| `ui-puu: LCD:n kohdeteksti näkyy` | OK: 'mk-issohjaamo__kohde' näkyy (174.7 771.9) |
| `ui-puu: kameranappi näkyy` | OK: 'mk-issohjaamo__kamera' näkyy (270.5 775.3) |
| `ui-puu: taulu auki uudelleen` | OK: 'Minne katsotaan' näkyy (226.5 286.0) |
| `tap-teksti Poistu → tap 197.3 452.1` | lähetetty |
| `oletus: Poistu sulki linssin` | OK: linssit: auki: ei mitään |

- **OK** 2 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [07a-taulu.png](kuvat/07a-taulu.png): Pulun taulu: Maapallo · Astronauttien kuvat · ISS-ohjaamo · Poistu (1206×2622 px, pysty)
- **OK** [07b-cupola.png](kuvat/07b-cupola.png): Cupola: ohjaamo alareunassa (joystick vasemmalla, LCD, kamera, kaasu oikealla) (1206×2622 px, pysty)
- **OK** [07c-kartta.png](kuvat/07c-kartta.png): Takaisin kartalla (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.23 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **OK** [cupola-humina-natiivi.wav](aani/cupola-humina-natiivi.wav): pcm_s16le 44100 Hz 2 kan, 4.0 s, mean -27.2 dB, max -16.4 dB
- **HUOM** [cupola-humina.wav](aani/cupola-humina.wav): pcm_s16le 24000 Hz 2 kan, 4.0 s, mean -91.0 dB, max -91.0 dB — hiljainen

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 60.05): kuormitus 60.05 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
