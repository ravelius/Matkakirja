# Todistusajo: opas-amsterdam2 f16f7fa7

**opas-amsterdam2 f16f7fa7: PUUTE — 2: kaupunki vaihtui Amsterdamiin: ei lokiriviä**

Laite iphone `A2FD9C9F-37CA-4D7A-BA59-E65AF9EBCCA2`, skenaario `opas-amsterdam.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-opas-amsterdam2-20261006-0709`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt f16f7fa7 = f16f7fa7

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: testiotsake päällä` | OK: linssit: opas: kiinni |
| `oletus: elävä opas aukesi` | OK: linssit: opas: auki, data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: tervetulo workerilta ilman ääni-urlia (ei generointia)` | OK: linssit: opas: vastaus 1 kysymys (2 vaihtoehtoa) (1,9 s), ääni ei |
| `ui-puu: tervetulon sirut näkyvät (kertoja hiljaa)` | OK: 'Esittele kaupunki' näkyy (100.2 776.9) |
| `tap-teksti Esittele kaupunki → tap 100.2 776.9` | lähetetty |
| `oletus: sirun napautus välittyi` | OK: opas: valinta "Esittele kaupunki" |
| `oletus: 1. kohde saapui` | OK: linssit: opas: saapui Kööpenhaminan Tivoli (55,6736, 12,5683), ääni ei, laatat 59 % |
| `tap-teksti mk-ohjausnappi#2 → tap 374.0 90.0` | lähetetty |
| `ui-puu: oppaan ☰ avasi valikon` | OK: 'Vaihda kohde' näkyy (224.5 146.0) |
| `tap-teksti Vaihda kohde → tap 224.5 146.0` | lähetetty |
| `ui-puu: maanosat` | OK: 'Eurooppa' näkyy (210.8 369.1) |
| `tap-teksti Eurooppa → tap 210.8 369.1` | lähetetty |
| `ui-puu: Euroopan maat` | OK: 'Alankomaat' näkyy (218.5 200.3) |
| `tap-teksti Alankomaat → tap 218.5 200.3` | lähetetty |
| `ui-puu: Alankomaiden kaupungit` | OK: 'Amsterdam' näkyy (217.3 243.0) |
| `tap-teksti Amsterdam → tap 217.3 243.0` | lähetetty |
| `oletus: kaupunki vaihtui Amsterdamiin` | PUUTE: ei riviä 10 s:ssa |
| `oletus: Amsterdamin vastaus workerilta ilman ääntä` | OK: linssit: opas: vastaus 5 Strøget (6,1 s), ääni ei |

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
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 28.32 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä)

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 27.45): kuormitus 27.45 > 16 ydintä

## 8. Ei testattu
- **EI** kohteiden ElevenLabs-ääni (omistaja 6.10.: ajo ilman ääntä, testiotsake)
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
