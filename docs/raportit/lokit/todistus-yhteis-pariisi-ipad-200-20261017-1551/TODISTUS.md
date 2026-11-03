# Todistusajo: yhteis-pariisi-ipad-200 cd9526ef

**yhteis-pariisi-ipad-200 cd9526ef: OK**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-yhteis-pariisi-200.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-yhteis-pariisi-ipad-200-20261017-1551`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt cd9526ef = cd9526ef1
- **OK** haaran natiivi-ui/yhteis-pariisi-200 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 0,0 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4092 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/58, karkeita 0, lataus 82 %) |
| `oletus: lentopöydän laukaisin avaa etsimen (PT 06.4x)` | OK: linssit: lentopöydän laukaisin → etsin LAAJA ensin |
| `oletus: etsimen polku` | OK: linssit: iss-kamera: kuvaa: etsin 24 mm, kenttä 43,24°, 1906:1915 |
| `oletus: K1b-kuva valmis` | OK: linssit: iss-kamera: oma kuva: Oma kuva · Auxerre · 17.10.2026 klo 15.54, kuvia jäljellä rajaton (kehittäjä) |
| `oletus: etsimen polku (pysäytyskuva, Maa ei pimene)` | OK: linssit: iss-kamera: kuvaa: etsin 24 mm, kenttä 43,24°, 1906:1915 |
| `oletus: K3-kuva valmis` | OK: linssit: iss-kamera: oma kuva: Oma kuva · Dijon · 17.10.2026 klo 15.54, kuvia jäljellä rajaton (kehittäjä) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [L1-laukku-paperi.png](kuvat/L1-laukku-paperi.png): Laukun julistegalleria peruskartalla: GALLERIA-pohja paperilla ennallaan (1668×2420 px, pysty)
- **OK** [O1-ohita-vasen.png](kuvat/O1-ohita-vasen.png): Ohita esittely vasemmassa reunassa, Pulu oikealla vapaana (1668×2420 px, pysty)
- **OK** [K1-uusi-lento.png](kuvat/K1-uusi-lento.png): Uusi lentopöytä: LAAJA/TELE:n tilalla KAMERA, pino pois (1668×2420 px, pysty)
- **OK** [K1b-lento-laukaisu.png](kuvat/K1b-lento-laukaisu.png): Lentopöydän laukaisu: etsin LAAJA, pysäytyskuva, Maa näkyy (1668×2420 px, pysty)
- **OK** [K1c1-valmis-1s.png](kuvat/K1c1-valmis-1s.png): Kuva valmis +1 s (huntu? PT 13.1x: kyydin pinta kuvan pinnasta S2:een) (1668×2420 px, pysty)
- **OK** [K1c3-valmis-3s.png](kuvat/K1c3-valmis-3s.png): Kuva valmis +3 s (1668×2420 px, pysty)
- **OK** [K1c-lento-valmis.png](kuvat/K1c-lento-valmis.png): Kuva valmis +6 s: etsin kiinni lentopöydällä, kortti KAMERA-nappiin (1668×2420 px, pysty)
- **OK** [K2-uusi-kamera.png](kuvat/K2-uusi-kamera.png): Kamerapöytä: LAAJA/TELE, uusin kuva näytössä, SEURAA + LENTO kaasun paikalla, etsimen kulmat ikkunassa (1668×2420 px, pysty)
- **OK** [K3-kehitys.png](kuvat/K3-kehitys.png): Kuvaus kamerapöydällä: KEHITETÄÄN näytössä (1668×2420 px, pysty)
- **OK** [K4-kuva-naytossa.png](kuvat/K4-kuva-naytossa.png): Kortti lensi kamerapöydän näyttöön, uusin kuva näytössä (1668×2420 px, pysty)
- **OK** [K5-seuraa.png](kuvat/K5-seuraa.png): SEURAA valittuna (1668×2420 px, pysty)
- **OK** [K6-galleria.png](kuvat/K6-galleria.png): Kuvat-galleria LASIPINNALLA (avaruuslasi, omistaja 13.27): Cupola sumeana takana (1668×2420 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 71.39 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 17.84): xcodebuild | kuormitus 17.84 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
