# Todistusajo: opas-amsterdam f16f7fa7

**opas-amsterdam f16f7fa7: PUUTE — 2: oppaan ☰ avasi valikon: 'Vaihda kohde' ei näy; 2: elementtiä 'Vaihda kohde' ei ui-puussa; 2: maanosat: 'Eurooppa' ei näy**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `opas-amsterdam.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-opas-amsterdam-20261006-0706`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: testiotsake päällä` | OK: linssit: opas: kiinni |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki, data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: tervetulo workerilta ilman ääni-urlia (ei generointia)` | OK: linssit: opas: vastaus 1 kysymys (2 vaihtoehtoa) (1,8 s), ääni ei |
| `ui-puu: tervetulon sirut näkyvät (kertoja hiljaa)` | OK: 'Esittele kaupunki' näkyy (100.2 776.9) |
| `tap-teksti Esittele kaupunki → tap 100.2 776.9` | lähetetty |
| `oletus: sirun napautus välittyi` | OK: opas: valinta "Esittele kaupunki" |
| `oletus: 1. kohde saapui` | OK: linssit: opas: saapui Kööpenhaminan Tivoli (55,6736, 12,5683), ääni ei, laatat 58 % |
| `tap-teksti mk-ohjausnappi → tap 326.0 90.0` | lähetetty |
| `ui-puu: oppaan ☰ avasi valikon` | PUUTE |
| `tap-teksti Vaihda kohde` | EI LÖYDY ui-puusta |
| `ui-puu: maanosat` | PUUTE |
| `tap-teksti Eurooppa` | EI LÖYDY ui-puusta |
| `ui-puu: Euroopan maat` | PUUTE |
| `tap-teksti Alankomaat` | EI LÖYDY ui-puusta |
| `ui-puu: Alankomaiden kaupungit` | PUUTE |
| `tap-teksti Amsterdam` | EI LÖYDY ui-puusta |
| `oletus: kaupunki vaihtui Amsterdamiin` | PUUTE: ei riviä 10 s:ssa |
| `oletus: Amsterdamin vastaus workerilta ilman ääntä` | OK: linssit: opas: vastaus 5 Christiansborg (3,9 s), ääni ei |

- **PUUTE** oppaan ☰ avasi valikon: 'Vaihda kohde' ei näy
- **PUUTE** elementtiä 'Vaihda kohde' ei ui-puussa
- **PUUTE** maanosat: 'Eurooppa' ei näy
- **PUUTE** elementtiä 'Eurooppa' ei ui-puussa
- **PUUTE** Euroopan maat: 'Alankomaat' ei näy
- **PUUTE** elementtiä 'Alankomaat' ei ui-puussa
- **PUUTE** Alankomaiden kaupungit: 'Amsterdam' ei näy
- **PUUTE** elementtiä 'Amsterdam' ei ui-puussa
- **PUUTE** kaupunki vaihtui Amsterdamiin: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [11a-tervetulo.png](kuvat/11a-tervetulo.png): Elävä opas: tervetulo ja sirut (1206×2622 px, pysty)
- **OK** [11b-kohde1.png](kuvat/11b-kohde1.png): Elävä opas: 1. kohde (1206×2622 px, pysty)
- **OK** [11c-kaupungit.png](kuvat/11c-kaupungit.png): Vaihda kohde: Alankomaiden kaupungit (1206×2622 px, pysty)
- **OK** [11d-amsterdam.png](kuvat/11d-amsterdam.png): Elävä opas: Amsterdam (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.40 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 11.33)

## 8. Ei testattu
- **EI** kohteiden ElevenLabs-ääni (omistaja 6.10.: ajo ilman ääntä, testiotsake)
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
