# Todistusajo: museo-metro-216 2e6e47df

**museo-metro-216 2e6e47df: PUUTE — 2: elementtiä 'Siirry näyttelyyn' ei ui-puussa; 2: musta siirto alkoi: ei lokiriviä; 2: perillä: ei lokiriviä**

Laite iphone `A885020B-772D-4452-BFC8-E9F422BBDD21`, skenaario `sk-museo-metro.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-museo-metro-216-20261031-2137`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 2e6e47df = 2e6e47df1
- **OK** haaran natiivi-ui/museo-metro-216 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap-teksti Astu sisään → tap 79.0 437.2` | lähetetty |
| `oletus: museo aukesi` | OK: linssit: museo: auki Ranskan sali: 10 osaa, 51 teosta, 61 pysähdystä, 13030 kolmiota, 4 näyttelyä, 554 ms (rivi 1382 jo ennen askelta, askel alkoi rivillä 1527) |
| `tap-teksti Louvren klassikot → tap 364.6 613.4` | lähetetty |
| `tap-teksti Siirry näyttelyyn` | EI LÖYDY ui-puusta |
| `oletus: musta siirto alkoi` | PUUTE: ei riviä 10 s:ssa |
| `oletus: perillä` | PUUTE: ei riviä 20 s:ssa |
| `oletus: nimikyltti näkyvissä` | PUUTE: ei riviä 10 s:ssa |

- **PUUTE** elementtiä 'Siirry näyttelyyn' ei ui-puussa
- **PUUTE** musta siirto alkoi: ei lokiriviä
- **PUUTE** perillä: ei lokiriviä
- **PUUTE** nimikyltti näkyvissä: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)
- **HUOM** pitkiä ruutuja kameran liikkeessä 13 (kone kuormassa; pitkat-ruudut.txt)

## 4. Stillit tiloista
- **OK** [M1-monalisa.png](kuvat/M1-monalisa.png): Mona Lisa perillä: vain nimikyltti yläreunassa (2622×1206 px, vaaka)
- **OK** [M2-risti.png](kuvat/M2-risti.png): Siirron alku: nimikyltti ja kartan nimi ristiin, kartta kutistuneena (2622×1206 px, vaaka)
- **OK** [M3-laajenee.png](kuvat/M3-laajenee.png): Kartta laajenee nimestä ennen merkin kulkua (ei kylttiä) (2622×1206 px, vaaka)
- **OK** [M4-merkki.png](kuvat/M4-merkki.png): Merkki kulkee seuraavaan, nimi vaihtuu ristiin (2622×1206 px, vaaka)
- **OK** [M5-kutistuu.png](kuvat/M5-kutistuu.png): Perillä: muut asemat kutistuvat nimeen porrastettuna (2622×1206 px, vaaka)
- **OK** [M6-nimikyltti.png](kuvat/M6-nimikyltti.png): Nimikyltti tekijärivineen samassa kohdassa (2622×1206 px, vaaka)
- **OK** [M7-avautuu.png](kuvat/M7-avautuu.png): Teosluettelo: nimet ristiin nimikyltin kohdalla (2622×1206 px, vaaka)
- **OK** [M8-laajenee.png](kuvat/M8-laajenee.png): Lista laajenee nimestä ja liukuu paikalleen (2622×1206 px, vaaka)
- **OK** [M9-auki.png](kuvat/M9-auki.png): Lista auki ilman kylttiä (2622×1206 px, vaaka)
- **OK** [M10-kutistuu.png](kuvat/M10-kutistuu.png): Sulkeutuu: kutistuu nimeen nimikyltin kohdalle (2622×1206 px, vaaka)
- **OK** [M11-kiinni.png](kuvat/M11-kiinni.png): Taas vain nimikyltti (2622×1206 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 36.12 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 32.46): Unity -batchmode | kuormitus 32.46 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
