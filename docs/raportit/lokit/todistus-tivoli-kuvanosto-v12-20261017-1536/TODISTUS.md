# Todistusajo: tivoli-kuvanosto-v12 ed0985d7

**tivoli-kuvanosto-v12 ed0985d7: OK**

Laite iphone `96044270-92AA-4BD3-BE2D-772C8495AB19`, skenaario `sk-tivoli-kuvanosto-v12.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-tivoli-kuvanosto-v12-20261017-1536`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt ed0985d7 = ed0985d7d
- **OK** haaran a59b0f916 sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: saapuminen 1` | OK: linssit: opas: saapui Vapahtajan kirkko ja Christianshavn (55,6729, 12,5940), ääni soi, laatat 45 %, saapumisportti 1,0 s, tarkkuus 0,00, peitto 1,00 |
| `oletus: Tivoli` | OK: linssit: opas: saapui Tivoli (55,6739, 12,5697), ääni soi, laatat 91 %, saapumisportti 6,3 s (tasanne), tarkkuus 1,00, peitto 1,00 |
| `oletus: kuvanosto Carstensen` | OK: opas: kuvanosto Georg Carstensen (1054×1280) |
| `ei-oletus: ei litografiaa` | OK: ei riviä 12 s:ssa |
| `tap 358 600` | lähetetty |
| `veto 340 430 60 430 0.3` | lähetetty |
| `veto 340 430 60 430 0.3` | lähetetty |
| `veto 340 430 60 430 0.3` | lähetetty |
| `veto 340 430 60 430 0.3` | lähetetty |

- **OK** 5 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [K1-jarvi.png](kuvat/K1-jarvi.png): Kuvanosto: puiston järvi (~0 s saapumisesta; rivi tarkistetaan lokista) (1206×2622 px, pysty)
- **OK** [K2-carstensen.png](kuvat/K2-carstensen.png): Kuvanosto: Georg Carstensen (1206×2622 px, pysty)
- **OK** [K3-jalkeen.png](kuvat/K3-jalkeen.png): Carstensenin jälkeen +12 s (ei litografiaa) (1206×2622 px, pysty)
- **OK** [T4-avattu.png](kuvat/T4-avattu.png): Kuvakortti avattu (1. kuva) (1206×2622 px, pysty)
- **OK** [T5-kuva2.png](kuvat/T5-kuva2.png): 2. kuva (1206×2622 px, pysty)
- **OK** [T6-kuva3.png](kuvat/T6-kuva3.png): 3. kuva (1206×2622 px, pysty)
- **OK** [T7-kuva4.png](kuvat/T7-kuva4.png): 4. kuva (1206×2622 px, pysty)
- **OK** [T8-kuva5.png](kuvat/T8-kuva5.png): 5. kuva (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 35.69 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 5.66)

## 8. Ei testattu
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
