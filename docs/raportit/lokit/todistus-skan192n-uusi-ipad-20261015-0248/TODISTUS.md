# Todistusajo: skan192n-uusi-ipad 8da4046f

**skan192n-uusi-ipad 8da4046f: PUUTE — 2: elementtiä 'mk-astrokuva__sijaintipallo' ei ui-puussa**

Laite ipad `F7513985-C8BC-4E97-8D29-9C9BD420E962`, skenaario `sk-skan192n-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-skan192n-uusi-ipad-20261015-0248`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 8da4046f = 8da4046f
- **OK** haaran 8da4046f sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: Cupola avautui` | OK: linssit: cupolan musta häivyy 4032 ms (kehys valmis, karkein taso valmis, lataamattomia laattoja 0/9, karkeita 0, lataus 34 %) |
| `tap-kohta 0.5 0.5 mk-astrokuva__sijaintipallo` | EI LÖYDY ui-puusta |

- **PUUTE** elementtiä 'mk-astrokuva__sijaintipallo' ei ui-puussa

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [s0-ateena.png](kuvat/s0-ateena.png): 1 asema Ateenan yllä päivällä (2420×1668 px, vaaka)
- **OK** [s1-avaus.png](kuvat/s1-avaus.png): 2 hologrammi avautuu pisteestä (2420×1668 px, vaaka)
- **OK** [s2-skannaus.png](kuvat/s2-skannaus.png): 3 skannaus (2420×1668 px, vaaka)
- **OK** [s3-valmis.png](kuvat/s3-valmis.png): 4 hologrammi valmis: verkko pyörii, faktat, lukemat (2420×1668 px, vaaka)
- **OK** [s4-kiinni.png](kuvat/s4-kiinni.png): 5 hologrammi painui pisteeseen (2420×1668 px, vaaka)
- **OK** [p1-pallo.png](kuvat/p1-pallo.png): 6 pienoispallon napautus: iso pallo (pallohaku), teline ei riitele (2420×1668 px, vaaka)
- **OK** [p2-pallo.png](kuvat/p2-pallo.png): 7 pallohaku 3 s myöhemmin (2420×1668 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 72.74 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 37.49): Blender Unity -batchmode xcodebuild | kuormitus 37.49 > 16 ydintä

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
