# Todistusajo: laitenapit-ipad-200 cd9526ef

**laitenapit-ipad-200 cd9526ef: OK**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-laitenapit-200.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-laitenapit-ipad-200-20261017-1558`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt cd9526ef = cd9526ef1
- **OK** haaran natiivi-ui/yhteis-pariisi-200 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: laukaisu alkoi` | OK: raketti: laukaisu alkaa (lyhyt 22 s) |
| `oletus: lataus valmis` | OK: raketti: lataus valmis 0,0 s (kaikki), avaus 17,1 s |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4081 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/10, karkeita 0, lataus 38 %) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **HUOM** VIRHE-/error-rivejä (tarkista uudet):
- [virherivit.txt](virherivit.txt)

## 4. Stillit tiloista
- **OK** [N1-lento-nyk.png](kuvat/N1-lento-nyk.png): NYK lentopöytä: KAMERA LCD-nappina (1668×2420 px, pysty)
- **OK** [N1-lento-uusi.png](kuvat/N1-lento-uusi.png): UUSI lentopöytä: KAMERA valaistuna painonappina metallikauluksessa (1668×2420 px, pysty)
- **OK** [N2-kamera-nyk.png](kuvat/N2-kamera-nyk.png): NYK kamerapöytä: LAAJA (valittu), TELE, SEURAA, LENTO LCD-nappeina (1668×2420 px, pysty)
- **OK** [N2-kamera-uusi.png](kuvat/N2-kamera-uusi.png): UUSI kamerapöytä: laitenapit, LAAJA palaa sisältä (1668×2420 px, pysty)
- **OK** [N3-seuraa-palaa.png](kuvat/N3-seuraa-palaa.png): UUSI: SEURAA valittuna palaa vihreänä (1668×2420 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 71.93 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 25.35): xcodebuild | kuormitus 25.35 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
