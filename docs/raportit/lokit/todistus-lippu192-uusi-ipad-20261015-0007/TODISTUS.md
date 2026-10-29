# Todistusajo: lippu192-uusi-ipad 04123f7d

**lippu192-uusi-ipad 04123f7d: PUUTE — 2: skenaariossa ei kosketuksia**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-lippu192-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-lippu192-uusi-ipad-20261015-0007`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 04123f7d = 04123f7d
- **OK** haaran 04123f7d sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla
- **PUUTE** skenaariossa ei kosketuksia

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [l1-kartta.png](kuvat/l1-kartta.png): 1 peruskartta: kartussi kiinni, lippu kartalla (2420×1668 px, vaaka)
- **OK** [l2-auki.png](kuvat/l2-auki.png): 2 lipun napautus → kartussi maakortiksi (UUSI) (2420×1668 px, vaaka)
- **OK** [l3-toinen.png](kuvat/l3-toinen.png): 3 toinen napautus (testikomento: ei ohinapautusta, kortti pysyy auki) (2420×1668 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 110.79 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 78.60): xcodebuild | kuormitus 78.60 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
