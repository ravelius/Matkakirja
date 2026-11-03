# Todistusajo: juoksupeli-dronevideo-nyt a65cc139

**juoksupeli-dronevideo-nyt a65cc139: PUUTE — 4: ei yhtään stilliä (skenaariossa ei kuva-rivejä)**

Laite ipad `39644E75-8BDA-4ED8-98B1-3FC864B73697`, skenaario `sk-juoksupeli-dronevideo-nyt.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksupeli-dronevideo-nyt-20261021-0936`.



## 1. Build ja asennus
- **OK** kaannos.txt a65cc139 = a65cc1393
- **OK** haaran 610a5f88c sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: palatsi ladattu` | OK: juoksupeli v4: palatsi v2: peittokartta (LOD2) 300792 ruutua, 1914096 kolmiota, 1192 verkkoa, 186 ms |
| `oletus: palatsi ladattu` | OK: juoksupeli v4: palatsi v2: peittokartta (LOD2) 300792 ruutua, 1914096 kolmiota, 1192 verkkoa, 173 ms |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)

## 4. Stillit tiloista
- **PUUTE** ei yhtään stilliä (skenaariossa ei kuva-rivejä)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 31.39 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 47.56): xcodebuild | kuormitus 47.56 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
