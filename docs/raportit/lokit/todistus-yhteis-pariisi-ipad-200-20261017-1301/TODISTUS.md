# Todistusajo: yhteis-pariisi-ipad-200 e89f36d3

**yhteis-pariisi-ipad-200 e89f36d3: PUUTE — 1: haaran natiivi-ui/yhteis-pariisi-200 EI sisälly käännökseen e89f36d3 (tai commit puuttuu proto-gitistä)**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-yhteis-pariisi-200.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-yhteis-pariisi-ipad-200-20261017-1301`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt e89f36d3 = e89f36d3f
- **PUUTE** haaran natiivi-ui/yhteis-pariisi-200 EI sisälly käännökseen e89f36d3 (tai commit puuttuu proto-gitistä)

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 0,9 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 3201 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/81, karkeita 0, lataus 91 %) |
| `oletus: lentopöydän laukaisin avaa etsimen (PT 06.4x)` | OK: linssit: lentopöydän laukaisin → etsin LAAJA ensin |
| `oletus: etsimen polku` | OK: linssit: iss-kamera: kuvaa: etsin 24 mm, kenttä 43,24°, 1906:1915 |
| `oletus: K1b-kuva valmis` | OK: linssit: iss-kamera: oma kuva: Oma kuva · Troyes · 17.10.2026 klo 13.51, kuvia jäljellä rajaton (kehittäjä) |
| `oletus: etsimen polku (pysäytyskuva, Maa ei pimene)` | OK: linssit: iss-kamera: kuvaa: etsin 24 mm, kenttä 43,24°, 1906:1915 |
| `oletus: K3-kuva valmis` | OK: linssit: iss-kamera: oma kuva: Oma kuva · Nancy · 17.10.2026 klo 13.51, kuvia jäljellä rajaton (kehittäjä) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [O1-ohita-vasen.png](kuvat/O1-ohita-vasen.png): Ohita esittely vasemmassa reunassa, Pulu oikealla vapaana (1668×2420 px, pysty)
- **OK** [K1-uusi-lento.png](kuvat/K1-uusi-lento.png): Uusi lentopöytä: LAAJA/TELE:n tilalla KAMERA, pino pois (1668×2420 px, pysty)
- **OK** [K1b-lento-laukaisu.png](kuvat/K1b-lento-laukaisu.png): Lentopöydän laukaisu: etsin LAAJA, pysäytyskuva, Maa näkyy (1668×2420 px, pysty)
- **OK** [K1c-lento-valmis.png](kuvat/K1c-lento-valmis.png): Kuva valmis: etsin kiinni lentopöydällä, kortti KAMERA-nappiin (1668×2420 px, pysty)
- **OK** [K2-uusi-kamera.png](kuvat/K2-uusi-kamera.png): Kamerapöytä: LAAJA/TELE, uusin kuva näytössä, SEURAA + LENTO kaasun paikalla, etsimen kulmat ikkunassa (1668×2420 px, pysty)
- **OK** [K3-kehitys.png](kuvat/K3-kehitys.png): Kuvaus kamerapöydällä: KEHITETÄÄN näytössä (1668×2420 px, pysty)
- **OK** [K4-kuva-naytossa.png](kuvat/K4-kuva-naytossa.png): Kortti lensi kamerapöydän näyttöön, uusin kuva näytössä (1668×2420 px, pysty)
- **OK** [K5-seuraa.png](kuvat/K5-seuraa.png): SEURAA valittuna (1668×2420 px, pysty)
- **OK** [K6-galleria.png](kuvat/K6-galleria.png): Kuvanäytön napautus: Kuvat-galleria isona (1668×2420 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 81.36 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 28.43): xcodebuild | kuormitus 28.43 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
