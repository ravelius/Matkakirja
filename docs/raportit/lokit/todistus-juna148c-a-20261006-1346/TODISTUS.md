# Todistusajo: juna148c-a b9499e74

**juna148c-a b9499e74: PUUTE — 5: aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [Silmukka:https://media.matkakirja.app/aane)**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna148a.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna148c-a-20261006-1346`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt b9499e74 = b9499e74

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 35.45 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: asetukset datana` | OK: peli-komento: 36.49 asetus → ok asetukset: oletukset (ei tiedostoa) [Kartta] |
| `ui-puu: käynnistys: kartta ja Liiku näkyvät (ensilataus)` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap-teksti ISS-ohjaamo → tap 84.8 650.1` | lähetetty |
| `ui-puu: kartta ehjä ISS:n jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |
| `oletus: täkyt alussa` | OK: linssit: opas: täkyt 8 (ok) |
| `tap-teksti Akropolis → tap 236.1 246.7` | lähetetty |

- **OK** 2 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-kartta.png](kuvat/01-kartta.png): Kartta käynnistyksen jälkeen (1206×2622 px, pysty)
- **OK** [02-iss.png](kuvat/02-iss.png): ISS-ohjaamo v3 (kahva, LCD, LAAJA/TELE) (1206×2622 px, pysty)
- **OK** [03-kartta-iss-jalkeen.png](kuvat/03-kartta-iss-jalkeen.png): Kartta ISS:n jälkeen (1206×2622 px, pysty)
- **OK** [04-taky.png](kuvat/04-taky.png): Oppaan täkyt (1206×2622 px, pysty)
- **OK** [05-opas.png](kuvat/05-opas.png): Opas pysäkillä (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 30.32 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [Silmukka:https://media.matkakirja.app/aane)
- **OK** aani mittaa: rms 0.10918, huippu 0.7071, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [LinssiOhjain:opas-pcm@1,00], istunto: luok

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 35.00): kuormitus 35.00 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
