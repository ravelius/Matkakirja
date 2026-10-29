# Todistusajo: juoksu-lautaspoyta-palatsi-v6c b409b9ff

**juoksu-lautaspoyta-palatsi-v6c b409b9ff: PUUTE — 2: lautaspöytä rikki palatsissa: ei lokiriviä; 4: ei yhtään stilliä (skenaariossa ei kuva-rivejä)**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-juoksupeli-lautaspoyta-palatsi.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-lautaspoyta-palatsi-v6c-20261025-0249`.



## 1. Build ja asennus
- **OK** kaannos.txt b409b9ff = b409b9ff
- **OK** haaran 0bc2cd4e0 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: vaaka` | OK: juoksupeli avaus: OhjausPelaajalle t 46,4 |
| `oletus: lautaspöytä rikki palatsissa` | PUUTE: ei riviä 60 s:ssa |

- **PUUTE** lautaspöytä rikki palatsissa: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **PUUTE** ei yhtään stilliä (skenaariossa ei kuva-rivejä)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.57 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 42.66): kuormitus 42.66 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
