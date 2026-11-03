# Todistusajo: juoksu-kuja-ennen 5a51873a

**juoksu-kuja-ennen 5a51873a: PUUTE — 4: ei yhtään stilliä (skenaariossa ei kuva-rivejä)**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-juoksupeli-kuja-b-211.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-kuja-ennen-20261024-1712`.



## 1. Build ja asennus
- **OK** kaannos.txt 5a51873a = 5a51873a
- **OK** haaran 5a51873aa sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: ohjaus pelaajalle` | OK: juoksupeli avaus: OhjausPelaajalle t 46,4 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)

## 4. Stillit tiloista
- **PUUTE** ei yhtään stilliä (skenaariossa ei kuva-rivejä)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.81 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 6.93): Unity -batchmode 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
