# Todistusajo: cupola-kuvapari2-200-arkki2 3e3d093f

**cupola-kuvapari2-200-arkki2 3e3d093f: OK**

Laite ipad `00CF62C2-2FE6-4993-8475-5786CC40A7A3`, skenaario `sk-cupola-kuvapari2.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-cupola-kuvapari2-200-arkki2-20261017-2048`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 3e3d093f = 3e3d093f
- **OK** haaran 3e3d093f sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 0,6 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4017 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/41, karkeita 0, lataus 65 %) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [a-eurooppa-1-0.png](kuvat/a-eurooppa-1-0.png): (a) Eurooppa päivällä, renderScale 1,0 (2752×2064 px, vaaka)
- **OK** [a-eurooppa-0-7.png](kuvat/a-eurooppa-0-7.png): (a) Eurooppa päivällä, renderScale 0,7, MSAA 1, bloom pois (2752×2064 px, vaaka)
- **OK** [b-nousu-1-0.png](kuvat/b-nousu-1-0.png): (b) auringonnousu + yövalot, renderScale 1,0 (2752×2064 px, vaaka)
- **OK** [b-nousu-0-7.png](kuvat/b-nousu-0-7.png): (b) auringonnousu + yövalot, renderScale 0,7, MSAA 1, bloom pois (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 78.49 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 16.79): Unity -batchmode 

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
