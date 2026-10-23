# Todistusajo: aikajana-jalkeen-209 jälkeen 4bcfd388c (käännös 97bf6c03)

**aikajana-jalkeen-209 jälkeen 4bcfd388c (käännös 97bf6c03): OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `aikajana-jalkeen.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-aikajana-jalkeen-209-20261021-0003`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 97bf6c03 = 97bf6c038
- **OK** haaran 4bcfd388c sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: aikajana auki` | OK: linssit: auki: ihmisen-matka |
| `tap-kohta 0.5 0.5 mk-aikajana-avausnappi → tap 201.1 587.1` | lähetetty |
| `tap 316 32` | lähetetty |

- **OK** 2 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- **HUOM** pitkiä ruutuja kameran liikkeessä 32 (kone kuormassa; pitkat-ruudut.txt)
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [03-aikajana-ratas.png](kuvat/03-aikajana-ratas.png): JÄLKEEN Ihmisen matka: ⚙ auki (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 31.29 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 23.11): kuormitus 23.11 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
