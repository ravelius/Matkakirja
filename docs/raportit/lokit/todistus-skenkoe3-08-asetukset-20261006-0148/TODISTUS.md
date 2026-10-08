# Todistusajo: skenkoe3-08-asetukset f16f7fa7

**skenkoe3-08-asetukset f16f7fa7: OK**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `08-asetukset.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-skenkoe3-08-asetukset-20261006-0148`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap-teksti mk-pilleri → tap 329.7 29.5` | lähetetty |
| `ui-puu: pilleri avasi valikon` | OK: 'Asetukset' näkyy (239.0 421.7) |
| `tap-teksti Asetukset → tap 239.0 423.4` | lähetetty |
| `ui-puu: Asetukset-näkymä auki` | OK: 'ASETUKSET' näkyy (338.7 99.0) |
| `ui-puu: äänentasot näkyvät` | OK: 'Pulun ääni' näkyy (153.4 180.5) |
| `ui-puu: kartan kytkimet näkyvät` | OK: 'Pieni liike' näkyy (169.3 318.8) |
| `ui-puu: muut asetukset näkyvät` | OK: 'Offline-kartat' näkyy (169.2 397.1) |
| `tap-teksti ‹ Takaisin → tap 126.2 99.0` | lähetetty |
| `ui-puu: ‹ Takaisin palasi valikon pääsivulle` | OK: 'Pulun ääni' ei näy |
| `tap 30 650` | lähetetty |
| `ui-puu: ohinapautus sulki valikon` | OK: 'Asetukset' ei näy |

- **OK** 4 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [08a-valikko.png](kuvat/08a-valikko.png): Pillerivalikko auki (1206×2622 px, pysty)
- **OK** [08b-asetukset.png](kuvat/08b-asetukset.png): Asetukset (1206×2622 px, pysty)
- **OK** [08c-suljettu.png](kuvat/08c-suljettu.png): Valikko suljettu (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.03 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 37.77): kuormitus 37.77 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
