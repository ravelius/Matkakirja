# Todistusajo: museozoom2-ipad fc621a0d

**museozoom2-ipad fc621a0d: PUUTE — 2: elementtiä 'Siirry näyttelyyn' ei ui-puussa; 2: A kertoja alkoi pysähdyksellä: ei lokiriviä; 2: A napit häipyvät esityksessä: ei lokiriviä**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-museozoom.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-museozoom2-ipad-20261014-1935`.

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
| `tap-teksti Siirry näyttelyyn` | EI LÖYDY ui-puusta |
| `oletus: A kertoja alkoi pysähdyksellä` | PUUTE: ei riviä 60 s:ssa |
| `oletus: A napit häipyvät esityksessä` | PUUTE: ei riviä 8 s:ssa |
| `ei-oletus: B suurennuksen pysäyttämänä napit eivät häivy` | OK: ei riviä 4 s:ssa |
| `tap-kohta 0.5 0.5 mk-museo-tauko → tap 467.0 1146.0` | lähetetty |
| `oletus: B ▶ palauttaa suurennuksen ja esitys jatkuu` | PUUTE: ei riviä 3 s:ssa |
| `oletus: B nimi palaa, kun suurennus palautuu` | PUUTE: ei riviä 3 s:ssa |
| `oletus: C tauko (napit esillä)` | PUUTE: ei riviä 3 s:ssa |
| `tap-kohta 0.5 0.5 mk-museo-autozoom → tap 341.5 1146.0` | lähetetty |
| `oletus: C AUTO ZOOM -kytkin päälle` | PUUTE: ei riviä 3 s:ssa |
| `oletus: C jatko` | PUUTE: ei riviä 3 s:ssa |
| `oletus: C saapui seuraavalle taululle` | OK: linssit: museo: saapui RP-F-AB12278-Z (graf 3/10) |
| `oletus: C Auto Zoom suurentaa taulun` | PUUTE: ei riviä 15 s:ssa |
| `oletus: D nimi ja tiedot häipyvät, kun kehys rajautuu` | PUUTE: ei riviä 8 s:ssa |
| `oletus: D napit häipyvät myös Auto Zoomissa (esitys kulkee)` | PUUTE: ei riviä 8 s:ssa |
| `oletus: E esitys jatkuu: suurennus pois ennen kävelyä` | PUUTE: ei riviä 90 s:ssa |
| `oletus: E nimi palaa koko kehyksen näkyessä` | PUUTE: ei riviä 5 s:ssa |
| `oletus: E saapui seuraavalle` | OK: linssit: museo: saapui RP-F-AB12278-Z (graf 3/10) |
| `oletus: E Auto Zoom seuraavassakin taulussa` | PUUTE: ei riviä 15 s:ssa |

- **PUUTE** elementtiä 'Siirry näyttelyyn' ei ui-puussa
- **PUUTE** A kertoja alkoi pysähdyksellä: ei lokiriviä
- **PUUTE** A napit häipyvät esityksessä: ei lokiriviä
- **PUUTE** B ▶ palauttaa suurennuksen ja esitys jatkuu: ei lokiriviä
- **PUUTE** B nimi palaa, kun suurennus palautuu: ei lokiriviä
- **PUUTE** C tauko (napit esillä): ei lokiriviä
- **PUUTE** C AUTO ZOOM -kytkin päälle: ei lokiriviä
- **PUUTE** C jatko: ei lokiriviä
- **PUUTE** C Auto Zoom suurentaa taulun: ei lokiriviä
- **PUUTE** D nimi ja tiedot häipyvät, kun kehys rajautuu: ei lokiriviä
- **PUUTE** D napit häipyvät myös Auto Zoomissa (esitys kulkee): ei lokiriviä
- **PUUTE** E esitys jatkuu: suurennus pois ennen kävelyä: ei lokiriviä
- **PUUTE** E nimi palaa koko kehyksen näkyessä: ei lokiriviä
- **PUUTE** E Auto Zoom seuraavassakin taulussa: ei lokiriviä

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
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 37.42 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 12.00)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
