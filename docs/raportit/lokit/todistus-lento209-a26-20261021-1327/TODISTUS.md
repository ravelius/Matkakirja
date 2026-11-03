# Todistusajo: lento209-a26 6e34aa71

**lento209-a26 6e34aa71: OK**

Laite ipad `A26BC7D0-7E43-4274-8BE6-97E3F14CF3A4`, skenaario `sk-lento209-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-lento209-a26-20261021-1327`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 6e34aa71 = 6e34aa71

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: museo aukesi` | OK: linssit: museo: auki Ranskan sali: 10 osaa, 51 teosta, 61 pysähdystä, 12808 kolmiota, 4 näyttelyä, 271 ms (rivi 1383 jo ennen askelta, askel alkoi rivillä 1514) |
| `tap-teksti Louvren klassikot → tap 731.1 945.0` | lähetetty |
| `tap-teksti Siirry näyttelyyn → tap 582.0 245.7` | lähetetty |
| `oletus: Mona Lisa perillä` | OK: linssit: museo: saapui louvre-inv-779 (louvre 1/12) |
| `oletus:  lento alkoi (ei mustaa)` | OK: linssit: museo: lento päällä, kallistus päällä, lentoja 0 |
| `oletus: perillä 1 (pitkä lento ovien kautta)` | OK: linssit: museo: saapui louvre-inv-779 (louvre 1/12) (rivi 1893 jo ennen askelta, askel alkoi rivillä 2099) |
| `oletus:  lento 2` | OK: linssit: museo: lento päällä, kallistus päällä, lentoja 0 |
| `oletus: perillä 2 (vierekkäinen, taivutus)` | OK: linssit: museo: saapui louvre-inv-779 (louvre 1/12) (rivi 1893 jo ennen askelta, askel alkoi rivillä 2219) |
| `oletus:  lento 3` | OK: linssit: museo: lento päällä, kallistus päällä, lentoja 0 |
| `oletus: perillä 3` | OK: linssit: museo: saapui louvre-inv-779 (louvre 1/12) (rivi 1893 jo ennen askelta, askel alkoi rivillä 2358) |
| `oletus:  lento 4` | OK: linssit: museo: lento päällä, kallistus päällä, lentoja 0 |
| `oletus: perillä 4` | OK: linssit: museo: saapui louvre-inv-779 (louvre 1/12) (rivi 1893 jo ennen askelta, askel alkoi rivillä 2509) |
| `oletus:  lento 5` | OK: linssit: museo: lento päällä, kallistus päällä, lentoja 0 |
| `oletus: perillä 5` | OK: linssit: museo: saapui louvre-inv-779 (louvre 1/12) (rivi 1893 jo ennen askelta, askel alkoi rivillä 2664) |
| `oletus: lentovideo tallennettu` | OK: linssit: museo: tallenne louvre-lento 4500 ruutua valmis |

- **OK** 2 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [l00-monalisa.png](kuvat/l00-monalisa.png): Mona Lisa: lähtö levosta (2752×2064 px, vaaka)
- **OK** [l99-loppu.png](kuvat/l99-loppu.png): Lopputila: viimeinen teos, horisontti suora (2752×2064 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 37.05 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 10.20)

## 8. Ei testattu
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
