# Todistusajo: juna153-a 7920e6a0

**juna153-a 7920e6a0: PUUTE — 5: aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP)**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna153a.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna153-a-20261006-2036`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7920e6a0 = 7920e6a0

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 47.39 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: asetukset datana` | OK: peli-komento: 48.39 asetus → ok asetukset: oletukset (ei tiedostoa) [Kartta] |
| `ui-puu: käynnistys: kartta ja Liiku näkyvät` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap-teksti ISS-ohjaamo → tap 84.8 650.1` | lähetetty |
| `ui-puu: kartta ehjä ISS:n jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |
| `oletus: oppaan aloitusvalikko auki` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `tap-teksti Sydneyn oopperatalo → tap 224.0 612.4` | lähetetty |
| `oletus: Sydney valittu` | OK: opas: täky Sydneyn oopperatalo |

- **OK** 2 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-kartta.png](kuvat/01-kartta.png): Kartta kylmäkäynnistyksen jälkeen (1206×2622 px, pysty)
- **OK** [02-iss.png](kuvat/02-iss.png): ISS-ohjaamo + jalka (1206×2622 px, pysty)
- **OK** [03-aloitusvalikko.png](kuvat/03-aloitusvalikko.png): Oppaan aloitusvalikko (1206×2622 px, pysty)
- **OK** [04-sydney.png](kuvat/04-sydney.png): Opas Sydneyssä (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 42.29 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 0 [], istunto: luokka AVAudioSessionCategoryP)
- **OK** aani mittaa: rms 0.12681, huippu 0.6461, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [LinssiOhjain:opas-pcm@1,00], istunto: luok

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 90.51): kuormitus 90.51 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
