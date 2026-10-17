# Todistusajo: museoaanet-iphone ceda1544

**museoaanet-iphone ceda1544: OK**

Laite iphone `3E6A1D4D-9B21-4296-ADB7-24FF25267E15`, skenaario `sk-museo-aanet.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-museoaanet-iphone-20261014-2052`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt ceda1544 = ceda1544
- **OK** haaran 97fbe1638 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: alkusivu valmiina` | OK: museo: valitse näyttely (7) |
| `tap-teksti Astu sisään → tap 201.2 779.0` | lähetetty |
| `oletus: sello alkoi salin auetessa` | OK: linssit: museo: musiikki sello-soittolista (adagio + moderato ×4) (rivi 1248 jo ennen askelta, askel alkoi rivillä 1299) |
| `oletus: parkettikävely ladattu` | OK: linssit: museo: askelnäytteet: 6 kaiullista + 6 kuivaa + parketti salikaiulla 22,4 s (museo-askeleet-v1) |
| `oletus: 1. kävely parketilla` | OK: linssit: museo: askeleet 2 kpl liu'ussa (parketti 0,92 s alkaen) |
| `oletus: 4. kävely parketilla` | OK: linssit: museo: askeleet 2 kpl liu'ussa (parketti 7,26 s alkaen) |
| `oletus: kaappaus valmis` | OK: linssit: aani: kaappaus valmis: /Volumes/T7 4TB/Simulaattorit/Sarja/3E6A1D4D-9B21-4296-ADB7-24FF25267E15/data/Containers/Data/Application/D495BBBC-370F-4C41-9C77-B60F00A690E1/Documents/tallenne.wav, a |

- **OK** 1 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [m1.png](kuvat/m1.png): 1 Kunniagalleria, kävelyn jälkeen (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 35.88 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 18.28): kuormitus 18.28 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-yhdistys tehdään tallenne-yhdista.py:llä ajon jälkeen (merkki 2)
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
