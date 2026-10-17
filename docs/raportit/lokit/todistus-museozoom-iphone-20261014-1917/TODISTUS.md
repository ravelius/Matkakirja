# Todistusajo: museozoom-iphone 6d44eef4

**museozoom-iphone 6d44eef4: OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-museozoom.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-museozoom-iphone-20261014-1917`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 6d44eef4 = 6d44eef4
- **OK** haaran 6d44eef4 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: alkusivu valmiina` | OK: museo: valitse näyttely (7) |
| `tap-teksti Astu sisään → tap 201.2 779.0` | lähetetty |
| `tap-teksti Punainen kabinetti → tap 222.0 479.5` | lähetetty |
| `tap-teksti Siirry näyttelyyn → tap 200.8 445.4` | lähetetty |
| `oletus: A kertoja alkoi pysähdyksellä` | OK: linssit: museo: kertoja SK-C-251 38 s |
| `oletus: A napit häipyvät esityksessä` | OK: museo: napit piiloon (automaattinen esitys) |
| `ei-oletus: B suurennuksen pysäyttämänä napit eivät häivy` | OK: ei riviä 4 s:ssa |
| `tap-kohta 0.5 0.5 mk-museo-tauko → tap 251.0 796.0` | lähetetty |
| `oletus: B ▶ palauttaa suurennuksen ja esitys jatkuu` | OK: museo: ▶ suurennuksesta, esitys jatkuu |
| `oletus: C tauko (napit esillä)` | OK: linssit: museo: tauko päälle, kertoja tauolla |
| `tap-kohta 0.5 0.5 mk-museo-autozoom → tap 101.5 796.0` | lähetetty |
| `oletus: C AUTO ZOOM -kytkin päälle` | OK: museo: Auto Zoom päälle |
| `oletus: C jatko` | OK: linssit: museo: tauko pois, kertoja soi |
| `oletus: C saapui seuraavalle taululle` | OK: linssit: museo: saapui SK-A-1595 (m1 2/6) |
| `oletus: C Auto Zoom suurentaa taulun` | OK: linssit: museo: autozoom SK-A-1595 1,64× |
| `oletus: D nimi ja tiedot häipyvät, kun kehys rajautuu` | OK: museo: nimi piiloon (kehys rajautuu) |
| `oletus: D napit häipyvät myös Auto Zoomissa (esitys kulkee)` | OK: museo: napit piiloon (automaattinen esitys) |
| `oletus: E esitys jatkuu: suurennus pois ennen kävelyä` | OK: linssit: museo: autozoom pois, kävely seuraavalle |
| `oletus: E nimi palaa koko kehyksen näkyessä` | OK: museo: nimi esiin |
| `oletus: E saapui seuraavalle` | OK: linssit: museo: saapui SK-A-1595 (m1 2/6) |
| `oletus: E Auto Zoom seuraavassakin taulussa` | OK: linssit: museo: autozoom SK-A-1595 1,64× |

- **OK** 5 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [a0-alku.png](kuvat/a0-alku.png): 1 esitys alkaa: AUTO ZOOM ‹ ⏸ › ja ☰ (1206×2622 px, pysty)
- **OK** [b0-zoom.png](kuvat/b0-zoom.png): 2 käsin suurennettu: kierros pysähtyy, ⏸ → ▶ (napit näkyvissä) (1206×2622 px, pysty)
- **OK** [b1-jatkuu.png](kuvat/b1-jatkuu.png): 3 ▶:n jälkeen koko taulu, ⏸ (1206×2622 px, pysty)
- **OK** [c0-autozoom-paalla.png](kuvat/c0-autozoom-paalla.png): 4 AUTO ZOOM päällä (oranssi) (1206×2622 px, pysty)
- **OK** [d0-autozoom.png](kuvat/d0-autozoom.png): 5 Auto Zoom: taulu mahdollisimman suurena, nimi pois (1206×2622 px, pysty)
- **OK** [d1-autozoom-piilo.png](kuvat/d1-autozoom-piilo.png): 6 Auto Zoom esityksessä: vain taulu (1206×2622 px, pysty)
- **OK** [e0-seuraava.png](kuvat/e0-seuraava.png): 7 seuraava taulu Auto Zoomissa (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 36.82 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 11.15)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
