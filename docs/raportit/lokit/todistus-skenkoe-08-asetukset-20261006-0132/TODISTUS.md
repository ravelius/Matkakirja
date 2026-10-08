# Todistusajo: skenkoe-08-asetukset f16f7fa7

**skenkoe-08-asetukset f16f7fa7: PUUTE — 2: elementtiä 'mk-ikoninappi' ei ui-puussa; 2: ☰ avasi pillerivalikon: 'Asetukset' ei näy; 2: elementtiä 'Asetukset' ei ui-puussa**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `08-asetukset.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-skenkoe-08-asetukset-20261006-0132`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `tap-teksti mk-ikoninappi` | EI LÖYDY ui-puusta |
| `ui-puu: ☰ avasi pillerivalikon` | PUUTE |
| `tap-teksti Asetukset` | EI LÖYDY ui-puusta |
| `ui-puu: Asetukset-näkymä auki` | PUUTE |
| `ui-puu: äänentasot näkyvät` | PUUTE |
| `ui-puu: kartan kytkimet näkyvät` | PUUTE |
| `ui-puu: muut asetukset näkyvät` | PUUTE |
| `tap-teksti mk-linssivalitsin__takaisin` | EI LÖYDY ui-puusta |
| `ui-puu: ‹ Takaisin palasi valikon pääsivulle` | OK: 'ASETUKSET' ei näy |
| `tap 200 150` | lähetetty |
| `ui-puu: ohinapautus sulki valikon` | OK: 'Asetukset' ei näy |

- **PUUTE** elementtiä 'mk-ikoninappi' ei ui-puussa
- **PUUTE** ☰ avasi pillerivalikon: 'Asetukset' ei näy
- **PUUTE** elementtiä 'Asetukset' ei ui-puussa
- **PUUTE** Asetukset-näkymä auki: 'ASETUKSET' ei näy
- **PUUTE** äänentasot näkyvät: 'Pulun ääni' ei näy
- **PUUTE** kartan kytkimet näkyvät: 'Pieni liike' ei näy
- **PUUTE** muut asetukset näkyvät: 'Offline-kartat' ei näy
- **PUUTE** elementtiä 'mk-linssivalitsin__takaisin' ei ui-puussa

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [08a-valikko.png](kuvat/08a-valikko.png): Pillerivalikko auki (1206×2622 px, pysty)
- **OK** [08b-asetukset.png](kuvat/08b-asetukset.png): Asetukset (1206×2622 px, pysty)
- **OK** [08c-suljettu.png](kuvat/08c-suljettu.png): Valikko suljettu (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.74 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 17.86): kuormitus 17.86 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
