# Todistusajo: juna149-a e9023eae

**juna149-a e9023eae: OK**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna149a.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna149-a-20261006-1527`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt e9023eae = e9023eae

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 34.95 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: asetukset datana` | OK: peli-komento: 35.95 asetus → ok asetukset: oletukset (ei tiedostoa) [Kartta] |
| `ui-puu: käynnistys: kartta ja Liiku näkyvät` | OK: 'Liiku' näkyy (201.0 749.9) |
| `tap-teksti ISS-ohjaamo → tap 84.8 650.1` | lähetetty |
| `ui-puu: kartta ehjä ISS:n jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |
| `oletus: täkyt alussa` | OK: linssit: opas: täkyt 8 (ok) |
| `tap-teksti Prahan linna → tap 236.1 394.6` | lähetetty |
| `oletus: Praha valittu` | OK: linssit: opas: täky valittu Prahan linna (Praha, CZ) |
| `tap-teksti Kysy → tap 112.7 777.9` | lähetetty |

- **OK** 3 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-kartta.png](kuvat/01-kartta.png): Kartta käynnistyksen jälkeen (1206×2622 px, pysty)
- **OK** [02-iss.png](kuvat/02-iss.png): ISS-ohjaamo (1206×2622 px, pysty)
- **OK** [03-taky.png](kuvat/03-taky.png): Oppaan täkyt (Praha) (1206×2622 px, pysty)
- **OK** [04-praha.png](kuvat/04-praha.png): Opas Prahassa (1206×2622 px, pysty)
- **OK** [05-kysy.png](kuvat/05-kysy.png): Kysy (matala chat) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 29.85 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **OK** aani mittaa: rms 0.13225, huippu 0.7071, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [LinssiOhjain:opas-pcm@1,00], istunto: luok

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 83.64): kuormitus 83.64 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
