# Todistusajo: laitenapit-iphone-200 8640682c

**laitenapit-iphone-200 8640682c: OK**

Laite iphone `123B4B25-36B7-4A76-B677-905621CD8F5A`, skenaario `sk-laitenapit-200.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-laitenapit-iphone-200-20261017-1446`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 8640682c = 8640682c0
- **OK** haaran natiivi-ui/yhteis-pariisi-200 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 0,0 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 3305 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/87, karkeita 0, lataus 99 %) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [N1-lento-nyk.png](kuvat/N1-lento-nyk.png): NYK lentopöytä: KAMERA LCD-nappina (1179×2556 px, pysty)
- **OK** [N1-lento-uusi.png](kuvat/N1-lento-uusi.png): UUSI lentopöytä: KAMERA valaistuna painonappina metallikauluksessa (1179×2556 px, pysty)
- **OK** [N2-kamera-nyk.png](kuvat/N2-kamera-nyk.png): NYK kamerapöytä: LAAJA (valittu), TELE, SEURAA, LENTO LCD-nappeina (1179×2556 px, pysty)
- **OK** [N2-kamera-uusi.png](kuvat/N2-kamera-uusi.png): UUSI kamerapöytä: laitenapit, LAAJA palaa sisältä (1179×2556 px, pysty)
- **OK** [N3-seuraa-palaa.png](kuvat/N3-seuraa-palaa.png): UUSI: SEURAA valittuna palaa vihreänä (1179×2556 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 71.57 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 72.41): xcodebuild | kuormitus 72.41 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
