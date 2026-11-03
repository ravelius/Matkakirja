# Todistusajo: museozoom3-ipad fc621a0d

**museozoom3-ipad fc621a0d: OK**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-museozoom.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-museozoom3-ipad-20261014-1943`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt fc621a0d = fc621a0d
- **OK** haaran fc621a0d sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: alkusivu valmiina` | OK: museo: valitse näyttely (7) |
| `tap-teksti Astu sisään → tap 417.2 1129.0` | lähetetty |
| `tap-teksti Punainen kabinetti → tap 609.5 333.4` | lähetetty |
| `tap-teksti Siirry näyttelyyn → tap 182.7 360.9` | lähetetty |
| `oletus: A kertoja alkoi pysähdyksellä` | OK: linssit: museo: kertoja SK-C-251 38 s |
| `oletus: A napit häipyvät esityksessä` | OK: museo: napit piiloon (automaattinen esitys) |
| `ei-oletus: B suurennuksen pysäyttämänä napit eivät häivy` | OK: ei riviä 4 s:ssa |
| `tap-kohta 0.5 0.5 mk-museo-tauko → tap 467.0 1146.0` | lähetetty |
| `oletus: B ▶ palauttaa suurennuksen ja esitys jatkuu` | OK: museo: ▶ suurennuksesta, esitys jatkuu |
| `oletus: B nimi palaa, kun suurennus palautuu` | OK: museo: nimi esiin |
| `oletus: C tauko (napit esillä)` | OK: linssit: museo: tauko päälle, kertoja tauolla |
| `tap-kohta 0.5 0.5 mk-museo-autozoom → tap 317.5 1146.0` | lähetetty |
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
- **OK** [a0-alku.png](kuvat/a0-alku.png): 1 esitys alkaa: AUTO ZOOM ‹ ⏸ › ja ☰ (1668×2420 px, pysty)
- **OK** [b0-zoom.png](kuvat/b0-zoom.png): 2 käsin suurennettu: kierros pysähtyy, ⏸ → ▶ (napit näkyvissä), nimi pois (1668×2420 px, pysty)
- **OK** [b1-jatkuu.png](kuvat/b1-jatkuu.png): 3 ▶:n jälkeen koko taulu, ⏸ (1668×2420 px, pysty)
- **OK** [c0-autozoom-paalla.png](kuvat/c0-autozoom-paalla.png): 4 AUTO ZOOM päällä (oranssi) (1668×2420 px, pysty)
- **OK** [d0-autozoom.png](kuvat/d0-autozoom.png): 5 Auto Zoom: taulu mahdollisimman suurena, nimi pois (1668×2420 px, pysty)
- **OK** [d1-autozoom-piilo.png](kuvat/d1-autozoom-piilo.png): 6 Auto Zoom esityksessä: vain taulu (1668×2420 px, pysty)
- **OK** [e0-seuraava.png](kuvat/e0-seuraava.png): 7 seuraava taulu Auto Zoomissa (1668×2420 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 36.62 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 10.31)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
