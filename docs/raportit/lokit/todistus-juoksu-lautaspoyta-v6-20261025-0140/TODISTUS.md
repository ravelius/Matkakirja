# Todistusajo: juoksu-lautaspoyta-v6 84a00390

**juoksu-lautaspoyta-v6 84a00390: PUUTE — 1: haaran kulma-810 EI sisälly käännökseen 84a00390 (tai commit puuttuu proto-gitistä); 2: lautaspöytä rikki: ei lokiriviä; 4: ei yhtään stilliä (skenaariossa ei kuva-rivejä)**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-juoksupeli-lautaspoyta.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-lautaspoyta-v6-20261025-0140`.



## 1. Build ja asennus
- **OK** kaannos.txt 84a00390 = 84a00390
- **PUUTE** haaran kulma-810 EI sisälly käännökseen 84a00390 (tai commit puuttuu proto-gitistä)

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: vaaka` | OK: juoksupeli avaus: OhjausPelaajalle t 46,4 |
| `oletus: lautaspöytä rikki` | PUUTE: ei riviä 150 s:ssa |

- **PUUTE** lautaspöytä rikki: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)

## 4. Stillit tiloista
- **PUUTE** ei yhtään stilliä (skenaariossa ei kuva-rivejä)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.53 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 12.68): xcodebuild 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
