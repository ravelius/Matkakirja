# Todistusajo: tivoli-kuvat-200 36723c5f

**tivoli-kuvat-200 36723c5f: OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-tivoli-kuvat-200.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-tivoli-kuvat-200-20261017-1434`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 36723c5f = 36723c5f8
- **OK** haaran master sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: saapuminen 1` | OK: linssit: opas: saapui Vapahtajan kirkko ja Christianshavn (55,6729, 12,5940), ääni soi, laatat 65 %, saapumisportti 0,1 s, tarkkuus 0,00, peitto 1,00 |
| `oletus: Tivoli` | OK: linssit: opas: saapui Tivoli (55,6739, 12,5697), ääni soi, laatat 86 %, saapumisportti 4,9 s (tasanne), tarkkuus 1,00, peitto 1,00 |
| `tap 358 600` | lähetetty |
| `veto 330,437,0 250,437,80 160,437,80 80,437,60` | lähetetty |
| `veto 330,437,0 250,437,80 160,437,80 80,437,60` | lähetetty |
| `veto 330,437,0 250,437,80 160,437,80 80,437,60` | lähetetty |
| `veto 330,437,0 250,437,80 160,437,80 80,437,60` | lähetetty |

- **OK** 5 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [T1-saapui.png](kuvat/T1-saapui.png): Tivolin pysäkki +2 s (1206×2622 px, pysty)
- **OK** [T2-kortti.png](kuvat/T2-kortti.png): Kuvakortti +6 s (1206×2622 px, pysty)
- **OK** [T3-kortti2.png](kuvat/T3-kortti2.png): Kuvakortti +12 s (1206×2622 px, pysty)
- **OK** [T4-avattu.png](kuvat/T4-avattu.png): Kuvakortti avattu (1. kuva) (1206×2622 px, pysty)
- **OK** [T5-kuva2.png](kuvat/T5-kuva2.png): 2. kuva (1206×2622 px, pysty)
- **OK** [T6-kuva3.png](kuvat/T6-kuva3.png): 3. kuva (1206×2622 px, pysty)
- **OK** [T7-kuva4.png](kuvat/T7-kuva4.png): 4. kuva (1206×2622 px, pysty)
- **OK** [T8-kuva5.png](kuvat/T8-kuva5.png): 5. kuva (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 42.80 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 16.89)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
