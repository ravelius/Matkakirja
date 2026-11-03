# Todistusajo: ohjauspoyta-iphone-201 77e8c867

**ohjauspoyta-iphone-201 77e8c867: OK**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-ohjauspoyta-201.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-ohjauspoyta-iphone-201-20261017-1738`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 77e8c867 = 77e8c8676
- **OK** haaran natiivi-ui/ohjauspoyta-201 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 2,1 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4118 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/7, karkeita 0, lataus 18 %) |
| `oletus: kuvaus etsimen polulla` | OK: linssit: iss-kamera: kuvaa: etsin 24 mm, kenttä 31,39°, 1906:1915 |
| `oletus: kuva valmis` | OK: linssit: iss-kamera: oma kuva: Oma kuva · Inta · 18.10.2026 klo 11.06, kuvia jäljellä rajaton (kehittäjä) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [P0-nyk.png](kuvat/P0-nyk.png): NYK: vanha ohjaamo (kamerapöytä päällä) (1179×2556 px, pysty)
- **OK** [P1-lento.png](kuvat/P1-lento.png): UUSI lento: NOPEUS-vipu, TILA LENTO valittu, näyttö PAIKKA / KOHTEET, sauva (1179×2556 px, pysty)
- **OK** [P2-kaasu.png](kuvat/P2-kaasu.png): UUSI lento: kahva 100×, nopeuslukema näytössä (1179×2556 px, pysty)
- **OK** [P3-kamera.png](kuvat/P3-kamera.png): UUSI kamera: ZOOM-vipu, KAMERA-puolisko = KUVAA keltaisena, näyttö VIIMEISIN / KUVAT, etsimen kulmat (1179×2556 px, pysty)
- **OK** [P4-kehitys.png](kuvat/P4-kehitys.png): UUSI kuvaus: KEHITETÄÄN näytössä (1179×2556 px, pysty)
- **OK** [P5-kuva-naytossa.png](kuvat/P5-kuva-naytossa.png): UUSI: uusin kuva ja sen paikka näytössä (1179×2556 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 71.07 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 7.09): Unity -batchmode 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
