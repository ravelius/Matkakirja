# Todistusajo: bigben4-iphone dea139e4

**bigben4-iphone dea139e4: OK**

Laite iphone `3E6A1D4D-9B21-4296-ADB7-24FF25267E15`, skenaario `sk-bigben2.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-bigben4-iphone-20261014-2332`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt dea139e4 = dea139e4
- **OK** haaran 958d15d0a sisältyy käännökseen

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: pallokierroksen data` | OK: linssit: opas: pallokierros lontoo ladattu 1,9 s:ssa |
| `oletus: siirto ohi` | OK: linssit: opas: esitys alkaa (lontoo): avaus + opastus (1. kyyti) |
| `oletus: saapui Westminsteriin` | OK: linssit: opas: saapui Westminsterin palatsi ja Big Ben (Elizabeth Tower) (51,5007, -0,1246), ääni soi, laatat 62 %, saapumisportti 0,0 s, tarkkuus 1,00, peitto 1,00 |
| `oletus: Big Ben lyö` | OK: kaupunki: kaupunkiääni big-ben-lyonti-01 (tuntilyönnit) 176 m, taso 1,60 |
| `oletus: kaappaus valmis` | OK: linssit: aani: kaappaus valmis: /Volumes/T7 4TB/Simulaattorit/Sarja/3E6A1D4D-9B21-4296-ADB7-24FF25267E15/data/Containers/Data/Application/E0660806-A066-4164-896C-A722E69A2681/Documents/tallenne.wav, a |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [bb1.png](kuvat/bb1.png): Westminster, Big Ben lyö (16.00) (1206×2622 px, pysty)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 34.95 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 8.44)

## 8. Ei testattu
- **EI** A/V-yhdistys tehdään tallenne-yhdista.py:llä ajon jälkeen (merkki 2)
- **EI** vaaka-asento: simulaattori kiertää vaakanäkymän pystyruudulle (tunnettu raja) → laitteella
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
