# Todistusajo: tivoli-200 d3a3a696

**tivoli-200 d3a3a696: OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-tivoli-200.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-tivoli-200-20261017-1211`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt d3a3a696 = d3a3a696d
- **OK** haaran pelikoodari/tivoli-vapaa-lento-200 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: saapuminen 1` | OK: linssit: opas: saapui Vapahtajan kirkko ja Christianshavn (55,6729, 12,5940), ääni soi, laatat 60 %, saapumisportti 1,0 s, tarkkuus 0,00, peitto 1,00 |
| `oletus: Tivoli` | OK: linssit: opas: saapui Tivoli (55,6739, 12,5697), ääni soi, laatat 69 %, saapumisportti 6,0 s (tasanne), tarkkuus 0,75, peitto 1,00 |
| `oletus: osio alkoi (kerronnan jälkeen)` | OK: linssit: opas: osio tivoli: laskeutuminen 30 m:iin 4 s:ssa, katse 203° |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [v1-tivoli.png](kuvat/v1-tivoli.png): Tivolin pysäkki ennen osiota (1206×2622 px, pysty)
- **OK** [v2-lasku.png](kuvat/v2-lasku.png): Laskeutuminen kesken (2 s) (1206×2622 px, pysty)
- **OK** [v3-perilla.png](kuvat/v3-perilla.png): Laskeutuminen valmis, katse Himmelskibetiin (1206×2622 px, pysty)
- **OK** [v4-lento.png](kuvat/v4-lento.png): Vapaa lento eteenpäin 5 s (1206×2622 px, pysty)
- **OK** [v5-kaarto.png](kuvat/v5-kaarto.png): Kaarto ja kääntö 4 s (1206×2622 px, pysty)
- **OK** [v6-taakse.png](kuvat/v6-taakse.png): Takaisin 6 s (järven tarina 35 m:n päässä?) (1206×2622 px, pysty)
- **OK** [v7-loppu.png](kuvat/v7-loppu.png): Jatka kierrosta → loppu (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 43.04 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 6.28): Unity -batchmode 

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
