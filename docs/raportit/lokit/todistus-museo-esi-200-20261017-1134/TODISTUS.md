# Todistusajo: museo-esi-200 9c2280d9

**museo-esi-200 9c2280d9: OK**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-museo-esi-200.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-museo-esi-200-20261017-1134`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 9c2280d9 = 9c2280d9a
- **OK** haaran natiivi-ui/museo-esikatselu-200 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: lähestyminen ohitettu` | OK: linssit: museo: lähestyminen pois (QA) |
| `oletus: näyttelyvalinta auki` | OK: museo: valitse näyttely (4) |
| `veto 200 700 200 300 0.5` | lähetetty |
| `tap-teksti Rodin → tap 218.8 666.8` | lähetetty |

- **OK** 2 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [E1-rodin-kortti.png](kuvat/E1-rodin-kortti.png): Ranska: Rodinin esikatselukortti auki (1179×2556 px, pysty)
- **OK** [E2-alankomaat.png](kuvat/E2-alankomaat.png): Rijksmuseumin näyttelyvalinta ilman Rodinin korttia (ENNEN: LS:n A1-kuva e566f4fc) (1179×2556 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 44.11 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 23.09): Unity -batchmode | kuormitus 23.09 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
