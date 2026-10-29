# Todistusajo: varina-mika a26367b6

**varina-mika a26367b6: PUUTE — 1: haaran linssiseppa2/kierros2-paiva EI sisälly käännökseen a26367b6 (tai commit puuttuu proto-gitistä)**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-mika.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-varina-mika-20261021-1805`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt a26367b6 = a26367b67
- **PUUTE** haaran linssiseppa2/kierros2-paiva EI sisälly käännökseen a26367b6 (tai commit puuttuu proto-gitistä)

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: avauslento alkoi` | OK: juoksupeli avaus: LentoAlkaa t 0,0 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **OK** ei pitkiä ruutuja kameran liikkeessä (> 20 ms)

## 4. Stillit tiloista
- **OK** [q8.png](kuvat/q8.png): MIKÄ 8 s (2752×2064 px, vaaka)
- **OK** [q12.png](kuvat/q12.png): MIKÄ 12 s (2752×2064 px, vaaka)
- **OK** [q16.png](kuvat/q16.png): MIKÄ 16 s (2752×2064 px, vaaka)
- **OK** [q20.png](kuvat/q20.png): MIKÄ 20 s (2752×2064 px, vaaka)
- **OK** [q24.png](kuvat/q24.png): MIKÄ 24 s (2752×2064 px, vaaka)
- **OK** [q28.png](kuvat/q28.png): MIKÄ 28 s (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 25.56 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 20.35): xcodebuild | kuormitus 20.35 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
