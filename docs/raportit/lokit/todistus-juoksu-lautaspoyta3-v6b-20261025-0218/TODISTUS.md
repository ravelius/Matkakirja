# Todistusajo: juoksu-lautaspoyta3-v6b c496c42a

**juoksu-lautaspoyta3-v6b c496c42a: PUUTE — 1: haaran lautaspoyta-210 EI sisälly käännökseen c496c42a (tai commit puuttuu proto-gitistä); 3: Exception-rivejä 4206 (ks. poikkeukset.txt); 4: ei yhtään stilliä (skenaariossa ei kuva-rivejä)**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-juoksupeli-lautaspoyta3.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-lautaspoyta3-v6b-20261025-0218`.



## 1. Build ja asennus
- **OK** kaannos.txt c496c42a = c496c42a
- **PUUTE** haaran lautaspoyta-210 EI sisälly käännökseen c496c42a (tai commit puuttuu proto-gitistä)

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: juoksupeli: uusi juoksu` | OK: juoksupeli: uusi juoksu (Rata v4, siemen 7, botti) |
| `oletus: lautaspöytä rikki` | OK: juoksupeli v4: rikko jäädytetty 0,45 s iskusta |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **PUUTE** Exception-rivejä 4206 (ks. poikkeukset.txt)
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)
- [poikkeukset.txt](poikkeukset.txt)

## 4. Stillit tiloista
- **PUUTE** ei yhtään stilliä (skenaariossa ei kuva-rivejä)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.76 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 31.00): Blender xcodebuild | kuormitus 31.00 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
