# Todistusajo: tivoli-kuvat-200 36723c5f

**tivoli-kuvat-200 36723c5f: OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-tivoli-kuvat-200.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-tivoli-kuvat-200-20261017-1343`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 36723c5f = 36723c5f8
- **OK** haaran master sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: saapuminen 1` | OK: linssit: opas: saapui Vapahtajan kirkko ja Christianshavn (55,6729, 12,5940), ääni soi, laatat 63 %, saapumisportti 0,1 s, tarkkuus 0,00, peitto 1,00 |
| `oletus: Tivoli` | OK: linssit: opas: saapui Tivoli (55,6739, 12,5697), ääni soi, laatat 89 %, saapumisportti 6,2 s, tarkkuus 1,00, peitto 1,00 |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [T1-saapui.png](kuvat/T1-saapui.png): Tivolin pysäkki +2 s (1206×2622 px, pysty)
- **OK** [T2-kortti.png](kuvat/T2-kortti.png): Kuvakortti +6 s (1206×2622 px, pysty)
- **OK** [T3-kortti2.png](kuvat/T3-kortti2.png): Kuvakortti +12 s (1206×2622 px, pysty)
- **OK** [T4-kortti3.png](kuvat/T4-kortti3.png): Kuvakortti +20 s (1206×2622 px, pysty)
- **OK** [T5-kortti4.png](kuvat/T5-kortti4.png): Kuvakortti +30 s (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 36.23 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 37.22): xcodebuild | kuormitus 37.22 > 16 ydintä

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
