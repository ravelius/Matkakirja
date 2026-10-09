# Todistusajo: build150-ea457278 ea457278

**build150-ea457278 ea457278: OK**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `build150.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-build150-ea457278-20261006-1626`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt ea457278 = ea457278

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 33.12 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `ui-puu: käynnistys: kartta ja Liiku näkyvät` | OK: 'Liiku' näkyy (201.0 749.9) |
| `oletus: täkyt alussa` | OK: linssit: opas: täkyt 8 (ok) |
| `tap-teksti Prahan linna → tap 236.1 394.6` | lähetetty |
| `oletus: Praha valittu` | OK: linssit: opas: täky valittu Prahan linna (Praha, CZ) |
| `tap 374 90` | lähetetty |
| `tap-teksti Poistu linssistä → tap 229.5 369.1` | lähetetty |
| `ui-puu: kartta palaa ehjänä oppaan jälkeen` | OK: 'Liiku' näkyy (201.0 749.9) |

- **OK** 3 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-kartta.png](kuvat/01-kartta.png): Kartta käynnistyksen jälkeen (1206×2622 px, pysty)
- **OK** [02-taky.png](kuvat/02-taky.png): Oppaan täkyt (1206×2622 px, pysty)
- **OK** [03-praha.png](kuvat/03-praha.png): Opas Prahassa (1206×2622 px, pysty)
- **OK** [04-kartta.png](kuvat/04-kartta.png): Kartta oppaan sulkemisen jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.05 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **OK** aani mittaa: rms 0.11006, huippu 0.6784, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [LinssiOhjain:opas-pcm@1,00], istunto: luok

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 16.48)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
