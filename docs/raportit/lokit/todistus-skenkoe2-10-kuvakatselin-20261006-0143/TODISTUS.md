# Todistusajo: skenkoe2-10-kuvakatselin f16f7fa7

**skenkoe2-10-kuvakatselin f16f7fa7: OK**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `10-kuvakatselin.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-skenkoe2-10-kuvakatselin-20261006-0143`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: nostokortti auki` | OK: ui-komento: ui nosto kohde:pompeji@ITA: auki · Kohde · HISTORIA · Pompeji · selain 0/87 · historia (0/21) |
| `ui-puu: kortin kuvateksti näkyy` | OK: 'Pompejin Forum' näkyy (201.0 740.9) |
| `tap-teksti mk-nosto__kuva → tap 201.0 632.0` | lähetetty |
| `ui-puu: kuvan napautus avasi suurennoksen` | OK: 'mk-nosto__suurennoskuva' näkyy (201.1 519.5) |
| `veto 320 420 80 420 0.25` | lähetetty |
| `tap 195 60` | lähetetty |
| `ui-puu: napautus kuvan ohi sulki suurennoksen` | OK: 'mk-nosto__suurennoskuva' ei näy |
| `ui-puu: kortti jäi auki` | OK: 'Pompejin Forum' näkyy (201.0 740.9) |

- **OK** 3 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [10a-suurennos.png](kuvat/10a-suurennos.png): Kuvasuurennos auki (1206×2622 px, pysty)
- **OK** [10b-seuraava.png](kuvat/10b-seuraava.png): Pyyhkäisy vasemmalle: seuraava kuva (laskuri vaihtui) (1206×2622 px, pysty)
- **OK** [10c-suljettu.png](kuvat/10c-suljettu.png): Suurennos suljettu, kortti auki (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.90 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 17.42): kuormitus 17.42 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
