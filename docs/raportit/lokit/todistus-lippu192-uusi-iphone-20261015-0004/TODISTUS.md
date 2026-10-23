# Todistusajo: lippu192-uusi-iphone 04123f7d

**lippu192-uusi-iphone 04123f7d: PUUTE — 2: skenaariossa ei kosketuksia**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-lippu192-iphone.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-lippu192-uusi-iphone-20261015-0004`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 04123f7d = 04123f7d
- **OK** haaran 04123f7d sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla
- **PUUTE** skenaariossa ei kosketuksia

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [l1-kartta.png](kuvat/l1-kartta.png): 1 peruskartta: kartussi kiinni, lippu kartalla (1206×2622 px, pysty)
- **OK** [l2-auki.png](kuvat/l2-auki.png): 2 lipun napautus → kartussi maakortiksi (UUSI) (1206×2622 px, pysty)
- **OK** [l3-toinen.png](kuvat/l3-toinen.png): 3 toinen napautus (testikomento: ei ohinapautusta, kortti pysyy auki) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 72.41 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 286.65): Unity -batchmode | kuormitus 286.65 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
