# Todistusajo: juna152 7e91ce76

**juna152 7e91ce76: PUUTE — 5: aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [Silmukka:https://media.matkakirja.app/aane)**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna152.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna152-20261006-1904`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7e91ce76 = 7e91ce76

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 51.72 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: asetukset datana` | OK: peli-komento: 52.76 asetus → ok asetukset: oletukset (ei tiedostoa) [Kartta] |
| `ui-puu: käynnistys: kartta ja Liiku näkyvät (ensikäynnistys hidas)` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap-teksti ISS-ohjaamo → tap 84.8 650.1` | lähetetty |
| `ui-puu: kartta ehjä ISS:n jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |
| `oletus: oppaan aloitusvalikko auki` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `tap-teksti Eurooppa → tap 63.9 290.1` | lähetetty |
| `tap-teksti Alankomaat → tap 71.5 219.0` | lähetetty |
| `tap-teksti Amsterdam → tap 70.3 219.0` | lähetetty |
| `oletus: kohde valittu` | OK: opas: kohde Amsterdam (52,352, 4,915) |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu linssistä → tap 229.5 327.1` | lähetetty |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |

- **OK** 6 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-kartta.png](kuvat/01-kartta.png): Kartta käynnistyksen jälkeen (1206×2622 px, pysty)
- **OK** [02-taulu.png](kuvat/02-taulu.png): Pulun taulu (satelliitti) (1206×2622 px, pysty)
- **OK** [03-iss.png](kuvat/03-iss.png): ISS-ohjaamo (Cupola) (1206×2622 px, pysty)
- **OK** [04-kartta-iss-jalkeen.png](kuvat/04-kartta-iss-jalkeen.png): Kartta ISS:n jälkeen (1206×2622 px, pysty)
- **OK** [05-opas-valikko.png](kuvat/05-opas-valikko.png): Oppaan aloitusvalikko (1206×2622 px, pysty)
- **OK** [06-opas.png](kuvat/06-opas.png): Opas Amsterdamissa (1206×2622 px, pysty)
- **OK** [07-kartta.png](kuvat/07-kartta.png): Kartta oppaan sulkemisen jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 39.59 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **PUUTE** aani mittaa: hiljaista (rms 0.00000, huippu 0.0000, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [Silmukka:https://media.matkakirja.app/aane)
- **OK** aani mittaa: rms 0.10331, huippu 0.6982, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [LinssiOhjain:opas-pcm@1,00], istunto: luok

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 25.44): xcodebuild | kuormitus 25.44 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
