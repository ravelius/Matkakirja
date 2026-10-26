# Todistusajo: skenkoe3-03-linssivalikko f16f7fa7

**skenkoe3-03-linssivalikko f16f7fa7: OK**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `03-linssivalikko.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-skenkoe3-03-linssivalikko-20261006-0146`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap-teksti mk-linssitNappi → tap 372.0 100.0` | lähetetty |
| `ui-puu: Linssit-nappi avasi valitsimen` | OK: 'Astronautin kamera' näkyy (287.1 326.8) |
| `tap-teksti Astronautin kamera → tap 287.1 329.2` | lähetetty |
| `ui-puu: 1. tap: esikatselu (Aktivoi)` | OK: 'Aktivoi' näkyy (296.9 332.1) |
| `tap-teksti Aktivoi → tap 296.9 332.1` | lähetetty |
| `oletus: 2. tap: astronautin kamera aukesi` | OK: linssit: auki: satelliitti |
| `oletus: linssi pois` | OK: linssit: auki: ei mitään |
| `tap-teksti mk-linssitNappi → tap 372.0 100.0` | lähetetty |
| `ui-puu: valitsin auki uudelleen` | OK: 'Astronautin kamera' näkyy (287.1 329.2) |
| `tap 80 650` | lähetetty |
| `ui-puu: ohinapautus sulki valitsimen` | OK: 'Astronautin kamera' ei näy |

- **OK** 5 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [03a-valitsin.png](kuvat/03a-valitsin.png): Linssivalitsin auki (1206×2622 px, pysty)
- **OK** [03b-satelliitti.png](kuvat/03b-satelliitti.png): Astronautin kamera auki (1206×2622 px, pysty)
- **OK** [03c-suljettu.png](kuvat/03c-suljettu.png): Valitsin suljettu ohinapautuksella (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.96 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 15.80)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
