# Todistusajo: kokosivu-201-ipad bd262afd

**kokosivu-201-ipad bd262afd: PUUTE — 2: komentoa ei kuitattu 5 s:ssa (linssi-komento.txt: kehittaja 1) — seuraava askel/kuva voi näyttää tilan ennen komentoa; 2: komentoa ei kuitattu 5 s:ssa (linssi-komento.txt: museo maa ranska) — seuraava askel/kuva voi näyttää tilan ennen komentoa; 2: elementtiä 'Rodin' ei ui-puussa**

Laite ipad `00CF62C2-2FE6-4993-8475-5786CC40A7A3`, skenaario `sk-kokosivu-201-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-kokosivu-201-ipad-20261017-2337`.

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
| `oletus: museon salin kamera pois sivun alla (ruutu-tila)` | OK: peli-komento: 112.37 ruutu → ok tila Paikallaan (paikallaan), fps 10, piirtoväli 20, näyttö 60 Hz, liikkeen katto 60 Hz, näkymän katto ei, lämpö Normaali (thermalState 0, virransäästö Fals |
| `oletus: pallon kamera pois` | OK: peli-komento: 112.37 ruutu → ok tila Paikallaan (paikallaan), fps 10, piirtoväli 20, näyttö 60 Hz, liikkeen katto 60 Hz, näkymän katto ei, lämpö Normaali (thermalState 0, virransäästö Fals |
| `veto 300 700 300 300 0.5` | lähetetty |
| `tap-teksti Rodin` | EI LÖYDY ui-puusta |
| `tap-teksti Siirry näyttelyyn` | EI LÖYDY ui-puusta |

- **VIRHE** komentoa ei kuitattu 5 s:ssa (linssi-komento.txt: kehittaja 1) — seuraava askel/kuva voi näyttää tilan ennen komentoa
- **VIRHE** komentoa ei kuitattu 5 s:ssa (linssi-komento.txt: museo maa ranska) — seuraava askel/kuva voi näyttää tilan ennen komentoa
- **PUUTE** elementtiä 'Rodin' ei ui-puussa
- **PUUTE** elementtiä 'Siirry näyttelyyn' ei ui-puussa

## 3. Poikkeukset ja virherivit
- **PUUTE** konsoli hiljaa 49 s (jäätyminen?): pinonäyte pinonayte-1.txt
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [K1-aloitus.png](kuvat/K1-aloitus.png): Valitse näyttely: 3D lepää sivun alla (2752×2064 px, vaaka)
- **OK** [K2-sali.png](kuvat/K2-sali.png): Sali piirtyy valinnan jälkeen (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 38.17 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 16.17): xcodebuild 

## 8. Ei testattu
- **EI** laitteen akku ja lämpö (LampoMittari ennen | jälkeen iPadilla erikseen, kun omistaja ei käytä laitetta)
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
