# Todistusajo: kierros2-p0 d7128e18

**kierros2-p0 d7128e18: PUUTE — 2: avauslento alkoi: ei lokiriviä; 3: konsoli hiljaa 16 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-1.txt; 3: konsoli hiljaa 16 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-2.txt**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-paiva-0.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-kierros2-p0-20261021-1546`.

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
- **PUUTE** konsoli hiljaa 16 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-1.txt
- **PUUTE** konsoli hiljaa 16 s (raja 10 s), pääsäie jumissa estävässä odotuksessa: pinonäyte pinonayte-2.txt
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)

## 4. Stillit tiloista
- **OK** [p0-1.png](kuvat/p0-1.png): PÄIVÄ 0: Meridiaaniportti (3 s) (2064×2752 px, pysty)
- **OK** [p0-2.png](kuvat/p0-2.png): PÄIVÄ 0: piha ja Taihedian (8 s) (2064×2752 px, pysty)
- **OK** [p0-3.png](kuvat/p0-3.png): PÄIVÄ 0: lento laskeutuu (16 s) (2064×2752 px, pysty)
- **OK** [p0-4.png](kuvat/p0-4.png): PÄIVÄ 0: juoksu alkaa (24 s) (2752×2064 px, vaaka)
- **OK** [p0-5.png](kuvat/p0-5.png): PÄIVÄ 0: juoksu kujalla (32 s) (2752×2064 px, vaaka)
- **OK** [p0-6.png](kuvat/p0-6.png): PÄIVÄ 0: juoksu (40 s) (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 26.63 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 19.81): kuormitus 19.81 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
