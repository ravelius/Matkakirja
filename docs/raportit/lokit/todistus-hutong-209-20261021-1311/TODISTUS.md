# Todistusajo: hutong-209 e037817e

**hutong-209 e037817e: OK**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-hutong.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-hutong-209-20261021-1311`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt e037817e = e037817eb
- **OK** haaran linssiseppa2/hutong sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: avauslento alkoi` | OK: juoksupeli avaus: LentoAlkaa t 0,0 |
| `oletus: avauslento alkoi (hutong)` | OK: juoksupeli avaus: LentoAlkaa t 0,0 (rivi 1353 jo ennen askelta, askel alkoi rivillä 1427) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)

## 4. Stillit tiloista
- **OK** [a-d1.png](kuvat/a-d1.png): NYT: avauslento Meridiaaniportille (3 s) (2752×2064 px, vaaka)
- **OK** [a-d2.png](kuvat/a-d2.png): NYT: portin keskiaukosta (5 s) (2752×2064 px, vaaka)
- **OK** [a-d3.png](kuvat/a-d3.png): NYT: pihan yllä (8 s) (2752×2064 px, vaaka)
- **OK** [b-d1.png](kuvat/b-d1.png): HUTONG: avauslento Meridiaaniportille (3 s) (2752×2064 px, vaaka)
- **OK** [b-d2.png](kuvat/b-d2.png): HUTONG: portin keskiaukosta (5 s) (2752×2064 px, vaaka)
- **OK** [b-d3.png](kuvat/b-d3.png): HUTONG: pihan yllä (8 s) (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.63 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 27.33): xcodebuild | kuormitus 27.33 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
