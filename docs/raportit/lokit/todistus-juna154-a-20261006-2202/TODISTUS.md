# Todistusajo: juna154-a 787db464

**juna154-a 787db464: OK**

Laite iphone `1572C658-6455-4E55-8C05-3F88CB3C32F6`, skenaario `juna154a.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juna154-a-20261006-2202`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 787db464 = 787db464

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: natiivi testimykistys` | OK: peli-komento: 38.55 aani mykistys 1 → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta] |
| `oletus: asetukset datana` | OK: peli-komento: 39.58 asetus → ok asetukset: oletukset (ei tiedostoa) [Kartta] |
| `ui-puu: käynnistys: kartta ja Liiku näkyvät` | OK: 'Liiku' näkyy (201.0 749.9) |
| `oletus: nostokortti avautui` | OK: ui-komento: ui nosto kohde:pompeji@ITA: auki · Kohde · HISTORIA · Pompeji · selain 0/87 · historia (0/21) |
| `ui-puu: noston ylärivi/otsikko näkyy` | OK: 'Pompej' näkyy (201.0 524.4) |
| `tap 374 90` | lähetetty |
| `tap 374 90` | lähetetty |
| `oletus: oppaan aloitusvalikko auki` | OK: linssit: opas: täkyt 50 (/opas/kohteet?n=50 ok) |
| `tap-teksti Sydneyn oopperatalo → tap 224.0 612.4` | lähetetty |
| `oletus: Sydney valittu` | OK: linssit: opas: täky valittu Sydneyn oopperatalo (Sydney, AU) |

- **OK** 3 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [01-kartta.png](kuvat/01-kartta.png): Kartta käynnistyksen jälkeen (1206×2622 px, pysty)
- **OK** [02-nosto.png](kuvat/02-nosto.png): Nostokortti (ylärivi, krediitit) (1206×2622 px, pysty)
- **OK** [03-linssivalikko.png](kuvat/03-linssivalikko.png): Linssivalikko (≡) (1206×2622 px, pysty)
- **OK** [04-opas.png](kuvat/04-opas.png): Opas Sydneyssä (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 34.45 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)
- **OK** aani mittaa: rms 0.11923, huippu 0.6998, kuuntelijoita 1, kuuntelija 1.00, näytetaajuus 24000 (24000 Stereo, dsp 1024), soivia 1 [LinssiOhjain:opas-pcm@1,00], istunto: luok

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 159.83): kuormitus 159.83 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
