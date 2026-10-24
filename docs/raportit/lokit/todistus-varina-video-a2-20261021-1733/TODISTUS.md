# Todistusajo: varina-video-a2 a26367b6

**varina-video-a2 a26367b6: OK**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-video.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-varina-video-a2-20261021-1733`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt a26367b6 = a26367b67
- **OK** haaran linssiseppa2/kierros2-paiva sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: avauslento alkoi` | OK: juoksupeli avaus: LentoAlkaa t 0,0 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [v0.png](kuvat/v0.png): VIDEO alkaa (2752×2064 px, vaaka)
- **OK** [v1.png](kuvat/v1.png): VIDEO loppuu (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 26.58 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 17.23): Unity -batchmode | kuormitus 17.23 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
