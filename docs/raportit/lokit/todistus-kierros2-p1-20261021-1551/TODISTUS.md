# Todistusajo: kierros2-p1 d7128e18

**kierros2-p1 d7128e18: PUUTE — 2: avauslento alkoi: ei lokiriviä; 3: konsoli hiljaa 17 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-1.txt; 3: konsoli hiljaa 17 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-2.txt**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-paiva-1.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-kierros2-p1-20261021-1551`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt d7128e18 = d7128e18c
- **OK** haaran linssiseppa2/kierros2-paiva sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: avauslento alkoi` | PUUTE: ei riviä 90 s:ssa |

- **PUUTE** avauslento alkoi: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **PUUTE** konsoli hiljaa 17 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-1.txt
- **PUUTE** konsoli hiljaa 17 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-2.txt
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **HUOM** pitkiä ruutuja kameran liikkeessä 10 (kone kuormassa; pitkat-ruudut.txt)

## 4. Stillit tiloista
- **OK** [p1-1.png](kuvat/p1-1.png): PÄIVÄ 1: Meridiaaniportti (3 s) (2064×2752 px, pysty)
- **OK** [p1-2.png](kuvat/p1-2.png): PÄIVÄ 1: piha ja Taihedian (8 s) (2064×2752 px, pysty)
- **OK** [p1-3.png](kuvat/p1-3.png): PÄIVÄ 1: lento laskeutuu (16 s) (2752×2064 px, vaaka)
- **OK** [p1-4.png](kuvat/p1-4.png): PÄIVÄ 1: juoksu alkaa (24 s) (2752×2064 px, vaaka)
- **OK** [p1-5.png](kuvat/p1-5.png): PÄIVÄ 1: juoksu kujalla (32 s) (2752×2064 px, vaaka)
- **OK** [p1-6.png](kuvat/p1-6.png): PÄIVÄ 1: juoksu (40 s) (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 37.31 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 22.17): xcodebuild | kuormitus 22.17 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
