# Todistusajo: juna146-4b8e8159 5c1d69bf

**juna146-4b8e8159 5c1d69bf: PUUTE — 2: elementtiä 'Poistu linssistä' ei ui-puussa; 2: kartta palaa ehjänä oppaan jälkeen: 'Liiku' ei näy; 5: aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP)**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna146.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna146-4b8e8159-20261006-0941`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 5c1d69bf = 5c1d69bf

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 33.14 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: asetukset datana` | OK: peli-komento: 34.14 asetus → ok asetukset: oletukset (ei tiedostoa) [Kartta] |
| `ui-puu: käynnistys: kartta ja Liiku näkyvät` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap-teksti ISS-ohjaamo → tap 84.8 650.1` | lähetetty |
| `ui-puu: kartta ehjä ISS:n jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu linssistä` | EI LÖYDY ui-puusta |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | PUUTE |
| `tap 374 784` | lähetetty |
| `tap 317 650` | lähetetty |
| `tap 264 682` | lähetetty |
| `oletus: Laituri k1` | OK: linssit: poikki: kuunnelma laituri alkaa (edellinen -) |

- **PUUTE** elementtiä 'Poistu linssistä' ei ui-puussa
- **PUUTE** kartta palaa ehjänä oppaan jälkeen: 'Liiku' ei näy

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-kartta.png](kuvat/01-kartta.png): Kartta käynnistyksen jälkeen (1206×2622 px, pysty)
- **OK** [02-iss.png](kuvat/02-iss.png): ISS-ohjaamo (joystick keskeltä neutraali?) (1206×2622 px, pysty)
- **OK** [03-kartta-iss-jalkeen.png](kuvat/03-kartta-iss-jalkeen.png): Kartta ISS:n jälkeen (1206×2622 px, pysty)
- **OK** [04-opas-25s.png](kuvat/04-opas-25s.png): Opas 25 s (täkyt/pin-palkki/nimikyltti) (1206×2622 px, pysty)
- **OK** [05-opas-45s.png](kuvat/05-opas-45s.png): Opas 45 s (1206×2622 px, pysty)
- **OK** [06-valikko.png](kuvat/06-valikko.png): Oppaan ≡-valikko (1206×2622 px, pysty)
- **OK** [07-kartta-oppaan-jalkeen.png](kuvat/07-kartta-oppaan-jalkeen.png): Kartta oppaan jälkeen (ei tummaa vyötä) (1206×2622 px, pysty)
- **OK** [08-linna.png](kuvat/08-linna.png): Olavinlinna (2622×1206 px, vaaka)
- **OK** [09-linna-laituri.png](kuvat/09-linna-laituri.png): Laituri (kortit vain napautuksesta) (2622×1206 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.07 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 21.28): kuormitus 21.28 > 16 ydintä

## 8. Ei testattu
- **EI** Vaihda kohde (Amsterdam → Dam), vastaussirut, +N-kuvat (testitunnus ei kytketty todistusajoon)
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
