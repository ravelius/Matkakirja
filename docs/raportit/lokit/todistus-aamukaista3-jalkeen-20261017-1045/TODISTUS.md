# Todistusajo: aamukaista3-jalkeen 42062cdb

**aamukaista3-jalkeen 42062cdb: OK**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-aamukaista3.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-aamukaista3-jalkeen-20261017-1045`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 42062cdb = 42062cdb7
- **OK** haaran 0cd7ae1a7 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: cupola` | OK: raketti: cupola |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [b1-hamara.png](kuvat/b1-hamara.png): Iltahämärä Euroopan yllä (ennen: tasainen oranssi kaista pinnalla; jälkeen: hehku vain reunalla) (2064×2752 px, pysty)
- **OK** [b2-hamara-40s.png](kuvat/b2-hamara-40s.png): 40 s myöhemmin, lähempänä terminaattoria (2064×2752 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 25.47 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 35.53): xcodebuild | kuormitus 35.53 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
