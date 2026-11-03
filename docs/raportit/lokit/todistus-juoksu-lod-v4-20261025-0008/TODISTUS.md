# Todistusajo: juoksu-lod-v4 d2246fdc

**juoksu-lod-v4 d2246fdc: PUUTE — 1: haaran kulma-810 EI sisälly käännökseen d2246fdc (tai commit puuttuu proto-gitistä); 4: ei yhtään stilliä (skenaariossa ei kuva-rivejä)**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-juoksupeli-lod-vertailu.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-lod-v4-20261025-0008`.



## 1. Build ja asennus
- **OK** kaannos.txt d2246fdc = d2246fdc
- **PUUTE** haaran kulma-810 EI sisälly käännökseen d2246fdc (tai commit puuttuu proto-gitistä)

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: vaaka` | OK: juoksupeli avaus: OhjausPelaajalle t 46,4 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)

## 4. Stillit tiloista
- **PUUTE** ei yhtään stilliä (skenaariossa ei kuva-rivejä)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 26.49 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 14.48): Blender 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
