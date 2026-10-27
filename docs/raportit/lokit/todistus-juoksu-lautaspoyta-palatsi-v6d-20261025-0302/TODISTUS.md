# Todistusajo: juoksu-lautaspoyta-palatsi-v6d 8bc011ea

**juoksu-lautaspoyta-palatsi-v6d 8bc011ea: PUUTE — 1: haaran kulma-810 EI sisälly käännökseen 8bc011ea (tai commit puuttuu proto-gitistä); 2: lautaspöytä rikki palatsissa: ei lokiriviä; 4: ei yhtään stilliä (skenaariossa ei kuva-rivejä)**

Laite ipad `39644E75-8BDA-4ED8-98B1-3FC864B73697`, skenaario `sk-juoksupeli-lautaspoyta-palatsi.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-lautaspoyta-palatsi-v6d-20261025-0302`.



## 1. Build ja asennus
- **OK** kaannos.txt 8bc011ea = 8bc011ea
- **PUUTE** haaran kulma-810 EI sisälly käännökseen 8bc011ea (tai commit puuttuu proto-gitistä)

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
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.89 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 17.65): kuormitus 17.65 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
