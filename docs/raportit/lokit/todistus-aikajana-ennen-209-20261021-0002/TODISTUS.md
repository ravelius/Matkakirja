# Todistusajo: aikajana-ennen-209 ennen 941607e9f (käännös 7819d72a)

**aikajana-ennen-209 ennen 941607e9f (käännös 7819d72a): OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `aikajana-ennen.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-aikajana-ennen-209-20261021-0002`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7819d72a = 7819d72a2
- **OK** haaran 941607e9f sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: aikajana auki` | OK: linssit: auki: ihmisen-matka |
| `tap-kohta 0.5 0.5 mk-aikajana-avausnappi → tap 201.1 587.1` | lähetetty |
| `tap 316 32` | lähetetty |

- **OK** 2 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **HUOM** pitkiä ruutuja kameran liikkeessä 34 (kone kuormassa; pitkat-ruudut.txt)

## 4. Stillit tiloista
- **OK** [03-aikajana-ratas.png](kuvat/03-aikajana-ratas.png): ENNEN Ihmisen matka: ⚙ auki (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 30.71 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 40.75): kuormitus 40.75 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
