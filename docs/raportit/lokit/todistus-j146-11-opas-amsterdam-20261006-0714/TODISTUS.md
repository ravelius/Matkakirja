# Todistusajo: j146-11-opas-amsterdam 7ac47be9

**j146-11-opas-amsterdam 7ac47be9: PUUTE — 2: tervetulo workerilta ilman ääni-urlia (ei generointia): ei lokiriviä; 2: tervetulon sirut näkyvät (kertoja hiljaa): 'Esittele kaupunki' ei näy; 2: elementtiä 'Esittele kaupunki' ei ui-puussa**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `11-opas-amsterdam.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-j146-11-opas-amsterdam-20261006-0714`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 7ac47be9 = 7ac47be9

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: testiotsake päällä` | OK: linssit: opas: kiinni |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki, data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: tervetulo workerilta ilman ääni-urlia (ei generointia)` | PUUTE: ei riviä 60 s:ssa |
| `ui-puu: tervetulon sirut näkyvät (kertoja hiljaa)` | PUUTE |
| `tap-teksti Esittele kaupunki` | EI LÖYDY ui-puusta |
| `oletus: sirun napautus välittyi` | PUUTE: ei riviä 5 s:ssa |
| `oletus: 1. kohde saapui` | PUUTE: ei riviä 90 s:ssa |
| `tap-teksti mk-ohjausnappi#2 → tap 326.0 90.0` | lähetetty |
| `ui-puu: oppaan ☰ avasi valikon` | PUUTE |
| `tap-teksti Vaihda kohde` | EI LÖYDY ui-puusta |
| `ui-puu: maanosat` | PUUTE |
| `tap-teksti Eurooppa` | EI LÖYDY ui-puusta |
| `ui-puu: Euroopan maat` | PUUTE |
| `tap-teksti Alankomaat` | EI LÖYDY ui-puusta |
| `ui-puu: Alankomaiden kaupungit` | PUUTE |
| `tap-teksti Amsterdam` | EI LÖYDY ui-puusta |
| `oletus: kaupunki vaihtui Amsterdamiin` | PUUTE: ei riviä 10 s:ssa |
| `oletus: Amsterdamin vastaus workerilta ilman ääntä` | PUUTE: ei riviä 90 s:ssa |

- **PUUTE** tervetulo workerilta ilman ääni-urlia (ei generointia): ei lokiriviä
- **PUUTE** tervetulon sirut näkyvät (kertoja hiljaa): 'Esittele kaupunki' ei näy
- **PUUTE** elementtiä 'Esittele kaupunki' ei ui-puussa
- **PUUTE** sirun napautus välittyi: ei lokiriviä
- **PUUTE** 1. kohde saapui: ei lokiriviä
- **PUUTE** oppaan ☰ avasi valikon: 'Vaihda kohde' ei näy
- **PUUTE** elementtiä 'Vaihda kohde' ei ui-puussa
- **PUUTE** maanosat: 'Eurooppa' ei näy
- **PUUTE** elementtiä 'Eurooppa' ei ui-puussa
- **PUUTE** Euroopan maat: 'Alankomaat' ei näy
- **PUUTE** elementtiä 'Alankomaat' ei ui-puussa
- **PUUTE** Alankomaiden kaupungit: 'Amsterdam' ei näy
- **PUUTE** elementtiä 'Amsterdam' ei ui-puussa
- **PUUTE** kaupunki vaihtui Amsterdamiin: ei lokiriviä
- **PUUTE** Amsterdamin vastaus workerilta ilman ääntä: ei lokiriviä

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [11a-tervetulo.png](kuvat/11a-tervetulo.png): Elävä opas: tervetulo ja sirut (1206×2622 px, pysty)
- **OK** [11b-kohde1.png](kuvat/11b-kohde1.png): Elävä opas: 1. kohde (1206×2622 px, pysty)
- **OK** [11c-kaupungit.png](kuvat/11c-kaupungit.png): Vaihda kohde: Alankomaiden kaupungit (1206×2622 px, pysty)
- **OK** [11d-amsterdam.png](kuvat/11d-amsterdam.png): Elävä opas: Amsterdam (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 27.93 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 68.31): xcodebuild | kuormitus 68.31 > 16 ydintä

## 8. Ei testattu
- **EI** kohteiden ElevenLabs-ääni (omistaja 6.10.: ajo ilman ääntä, testiotsake)
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
