# Todistusajo: juoksu-portti-810c b26b98f3

**juoksu-portti-810c b26b98f3: PUUTE — 1: haaran kulma-810 EI sisälly käännökseen b26b98f3 (tai commit puuttuu proto-gitistä); 4: ei yhtään stilliä (skenaariossa ei kuva-rivejä)**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-juoksupeli-kulma-810-peli.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-portti-810c-20261024-2132`.



## 1. Build ja asennus
- **OK** kaannos.txt b26b98f3 = b26b98f3
- **PUUTE** haaran kulma-810 EI sisälly käännökseen b26b98f3 (tai commit puuttuu proto-gitistä)

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: pysty` | OK: juoksupeli avaus: OhjausPelaajalle t 46,4 |
| `oletus: vaaka` | OK: juoksupeli avaus: OhjausPelaajalle t 46,4 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **PUUTE** ei yhtään stilliä (skenaariossa ei kuva-rivejä)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.61 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 34.71): xcodebuild | kuormitus 34.71 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
