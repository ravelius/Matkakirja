# Todistusajo: cupola-kuvapari3-200 b8a49a09

**cupola-kuvapari3-200 b8a49a09: OK**

Laite ipad `00CF62C2-2FE6-4993-8475-5786CC40A7A3`, skenaario `sk-cupola-kuvapari3.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-cupola-kuvapari3-200-20261017-2110`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt b8a49a09 = b8a49a09
- **OK** haaran b8a49a09 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 0,0 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4049 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/41, karkeita 0, lataus 81 %) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [a-eurooppa-1-0.png](kuvat/a-eurooppa-1-0.png): (a) Eurooppa päivällä, renderScale 1,0 (2752×2064 px, vaaka)
- **OK** [a-eurooppa-0-8.png](kuvat/a-eurooppa-0-8.png): (a) Eurooppa päivällä, renderScale 0,8, MSAA 1 (lämpösuoja 0,8) (2752×2064 px, vaaka)
- **OK** [a-eurooppa-0-7.png](kuvat/a-eurooppa-0-7.png): (a) Eurooppa päivällä, renderScale 0,7, MSAA 1 (lämpösuoja; Cupolan oma hehku pysyy) (2752×2064 px, vaaka)
- **OK** [b-nousu-1-0.png](kuvat/b-nousu-1-0.png): (b) auringonnousu + yövalot, renderScale 1,0 (2752×2064 px, vaaka)
- **OK** [b-nousu-0-8.png](kuvat/b-nousu-0-8.png): (b) auringonnousu + yövalot, renderScale 0,8, MSAA 1 (lämpösuoja 0,8) (2752×2064 px, vaaka)
- **OK** [b-nousu-0-7.png](kuvat/b-nousu-0-7.png): (b) auringonnousu + yövalot, renderScale 0,7, MSAA 1 (lämpösuoja; Cupolan oma hehku pysyy) (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 82.77 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 12.53): Unity -batchmode 

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
