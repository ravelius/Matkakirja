# Todistusajo: juna151-c 6a4d92de

**juna151-c 6a4d92de: PUUTE — 5: aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP)**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna151c.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna151-c-20261006-1738`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 6a4d92de = 6a4d92de

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 34.81 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: aloitusvalikko auki` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `tap-teksti Eurooppa → tap 63.9 290.1` | lähetetty |
| `tap-teksti Alankomaat → tap 71.5 219.0` | lähetetty |
| `tap-teksti Amsterdam → tap 70.3 219.0` | lähetetty |
| `oletus: valinta kirjautui` | OK: opas: valikon rivi 52 |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu linssistä → tap 229.5 327.1` | lähetetty |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |

- **OK** 5 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-kaupungit.png](kuvat/01-kaupungit.png): Alankomaat: kaupungit (1206×2622 px, pysty)
- **OK** [02-amsterdam.png](kuvat/02-amsterdam.png): Opas Amsterdamissa valinnan jälkeen (1206×2622 px, pysty)
- **OK** [03-valikko.png](kuvat/03-valikko.png): ≡-valikko (1206×2622 px, pysty)
- **OK** [04-kartta.png](kuvat/04-kartta.png): Kartta oppaan sulkemisen jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 29.72 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 34.70): Unity -batchmode | kuormitus 34.70 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
