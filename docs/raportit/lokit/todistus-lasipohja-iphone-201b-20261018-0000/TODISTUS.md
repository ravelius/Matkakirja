# Todistusajo: lasipohja-iphone-201b 736740c3

**lasipohja-iphone-201b 736740c3: PUUTE — 2: komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui konsoli pois) — seuraava askel/kuva voi näyttää tilan ennen komentoa; 2: skenaariossa ei kosketuksia**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-lasipohja-201b.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-lasipohja-iphone-201b-20261018-0000`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 736740c3 = 736740c32
- **OK** haaran natiivi-ui/lasipohja-201 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla
- **VIRHE** komentoa ei kuitattu 5 s:ssa (ui-komento.txt: ui konsoli pois) — seuraava askel/kuva voi näyttää tilan ennen komentoa
- **PUUTE** skenaariossa ei kosketuksia

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [K1-nyk.png](kuvat/K1-nyk.png): Astrokuvan selite nyt (läpinäkyvä, vihreä reuna) (1179×2556 px, pysty)
- **OK** [K2-uusi.png](kuvat/K2-uusi.png): Astrokuvan selite lasilla (takana sumea kuva) (1179×2556 px, pysty)
- **OK** [K3-uusi-kiinni.png](kuvat/K3-uusi-kiinni.png): Selite kelattuna yhdeksi riviksi lasilla (1179×2556 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 99.80 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 5.45): Unity -batchmode xcodebuild 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
