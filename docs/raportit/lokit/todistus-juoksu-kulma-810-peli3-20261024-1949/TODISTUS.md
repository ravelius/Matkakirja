# Todistusajo: juoksu-kulma-810-peli3 6b10bae9

**juoksu-kulma-810-peli3 6b10bae9: PUUTE — 1: haaran kulma-810 EI sisälly käännökseen 6b10bae9 (tai commit puuttuu proto-gitistä); 4: ei yhtään stilliä (skenaariossa ei kuva-rivejä)**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-juoksupeli-kulma-810-peli.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-juoksu-kulma-810-peli3-20261024-1949`.



## 1. Build ja asennus
- **OK** kaannos.txt 6b10bae9 = 6b10bae9
- **PUUTE** haaran kulma-810 EI sisälly käännökseen 6b10bae9 (tai commit puuttuu proto-gitistä)

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
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 26.26 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 8.15)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
