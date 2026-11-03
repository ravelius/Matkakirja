# Todistusajo: kokosivu-201-ipad-b bd262afd

**kokosivu-201-ipad-b bd262afd: OK**

Laite ipad `00CF62C2-2FE6-4993-8475-5786CC40A7A3`, skenaario `sk-kokosivu-201-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-kokosivu-201-ipad-b-20261017-2342`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt bd262afd = bd262afd
- **OK** haaran 86064a98f sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: lähestyminen ohitettu` | OK: linssit: museo: lähestyminen pois (QA) |
| `oletus: näyttelyvalinta auki` | OK: museo: valitse näyttely (7) |
| `oletus: Valitse näyttely peittää: 3D-kamerat pois, Cesium seis` | OK: ruutu: koko ruudun sivu peittää → 3D-kamerat pois, Cesium seis |
| `oletus: museon salin kamera pois sivun alla (ruutu-tila)` | OK: peli-komento: 98.01 ruutu → ok tila Paikallaan (paikallaan), fps 10, piirtoväli 20, näyttö 60 Hz, liikkeen katto 60 Hz, näkymän katto ei, lämpö Normaali (thermalState 0, virransäästö False |
| `oletus: pallon kamera pois` | OK: peli-komento: 98.01 ruutu → ok tila Paikallaan (paikallaan), fps 10, piirtoväli 20, näyttö 60 Hz, liikkeen katto 60 Hz, näkymän katto ei, lämpö Normaali (thermalState 0, virransäästö False |
| `tap-teksti Punainen kabinetti → tap 783.1 945.0` | lähetetty |
| `tap-teksti Siirry näyttelyyn → tap 582.0 245.7` | lähetetty |

- **OK** 2 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [K1-aloitus.png](kuvat/K1-aloitus.png): Valitse näyttely: 3D lepää sivun alla (2752×2064 px, vaaka)
- **OK** [K2-sali.png](kuvat/K2-sali.png): Sali piirtyy valinnan jälkeen (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 36.82 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 16.46): Unity -batchmode xcodebuild 

## 8. Ei testattu
- **EI** laitteen akku ja lämpö (LampoMittari ennen | jälkeen iPadilla erikseen, kun omistaja ei käytä laitetta)
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
