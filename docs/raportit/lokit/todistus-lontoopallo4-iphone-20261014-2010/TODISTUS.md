# Todistusajo: lontoopallo4-iphone 47030235

**lontoopallo4-iphone 47030235: OK**

Laite iphone `0AC1815C-3372-4E20-A9B4-EDA798818943`, skenaario `sk-lontoopallo4-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-lontoopallo4-iphone-20261014-2010`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 47030235 = 47030235

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: pallokierroksen data natiiviin (v2)` | OK: linssit: opas: pallokierros lontoo (pallokierros-v5): 8 pysähdystä (Westminsterin palatsi ja Big Ben (Elizabeth Tower), Westminster Abbey, Buckinghamin palatsi, Trafalgar Square, St Paulin katedraal |
| `ei-oletus: workerin liiku-listaa ei haeta` | OK: ei riviä 5 s:ssa |
| `oletus: siirto (Lontoo) ohi` | OK: linssit: opas: esitys alkaa (lontoo): avaus + opastus (1. kyyti) |
| `oletus: kierros alkaa` | OK: linssit: opas: esitys: kaupunkikierros |
| `oletus: kierros datasta` | OK: linssit: opas: kaupunkikierros 8 kohdetta (pallokierros-v5/lontoo): Westminsterin palatsi ja Big Ben (Elizabeth Tower), Westminster Abbey, Buckinghamin palatsi, Trafalgar Square, St Paulin katedraali, |
| `oletus: saapuminen 1 Westminsterin palatsi` | OK: linssit: opas: saapui Westminsterin palatsi ja Big Ben (Elizabeth Tower) (51,5007, -0,1246), ääni soi, laatat 69 %, saapumisportti 12,5 s (tasanne), tarkkuus 0,88, peitto 1,00 |
| `oletus: lyhyt väli 1 → 2 liukuna (≤ 15 s)` | OK: linssit: opas: lento Westminster Abbey 240 m, kesto 12,0 s, suurin kiihtyvyys 17,6 m/s², suurin lasku 9,0 m/s |
| `oletus: saapuminen 2 Westminster Abbey` | OK: linssit: opas: saapui Westminster Abbey (51,4994, -0,1274), ääni soi, laatat 100 %, saapumisportti 3,0 s, tarkkuus 0,98, peitto 1,00 |
| `oletus: saapuminen 3 Buckinghamin palatsi` | OK: linssit: opas: saapui Buckinghamin palatsi (51,5014, -0,1419), ääni soi, laatat 100 %, saapumisportti 3,6 s (tasanne), tarkkuus 0,88, peitto 1,00 |
| `oletus: saapuminen 4 Trafalgar Square` | OK: linssit: opas: saapui Trafalgar Square (51,5080, -0,1281), ääni soi, laatat 91 %, saapumisportti 0,6 s, tarkkuus 0,96, peitto 1,00 |
| `oletus: saapuminen 5 St Paulin katedraali` | OK: linssit: opas: saapui St Paulin katedraali (51,5138, -0,0984), ääni soi, laatat 70 %, saapumisportti 9,4 s (tasanne), tarkkuus 0,83, peitto 1,00 |
| `oletus: saapuminen 6 Lontoon Tower` | OK: linssit: opas: saapui Lontoon Tower (51,5082, -0,0762), ääni soi, laatat 65 %, saapumisportti 0,0 s, tarkkuus 1,00, peitto 1,00 |
| `oletus: lyhyt väli 6 → 7 liukuna (≤ 12,5 s)` | OK: linssit: opas: lento Tower Bridge 305 m, kesto 12,0 s, suurin kiihtyvyys 15,2 m/s², suurin lasku 5,3 m/s |
| `oletus: saapuminen 7 Tower Bridge` | OK: linssit: opas: saapui Tower Bridge (51,5055, -0,0754), ääni soi, laatat 100 %, saapumisportti 2,8 s, tarkkuus 1,00, peitto 1,00 |
| `oletus: lento Greenwichiin (pisin, ~6 km)` | OK: linssit: opas: lento Greenwichin kuninkaallinen observatorio 5977 m, kesto 44,0 s, suurin kiihtyvyys 27,2 m/s², suurin lasku 16,6 m/s |
| `oletus: saapuminen 8 Greenwich` | OK: linssit: opas: saapui Greenwichin kuninkaallinen observatorio (51,4778, -0,0014), ääni soi, laatat 100 %, saapumisportti 8,3 s (tasanne), tarkkuus 1,00, peitto 1,00 |
| `oletus: loppunousu` | OK: linssit: opas: pallokierros: loppu (nousu yleiskuvaan 1100 m / 50° 30 s:ssa) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [a01-avaus.png](kuvat/a01-avaus.png): Avausnäkymä 1 100 m / 50° kohti Westminster Abbeyta: Westminster alakolmanneksessa, Thames lävistäjänä (2622×1206 px, vaaka)
- **OK** [k01-westminster.png](kuvat/k01-westminster.png): Westminsterin palatsi ja Elizabeth Tower +4 s (molemmat kuvassa, silmä 48–67 m) (2622×1206 px, vaaka)
- **OK** [k02-abbey.png](kuvat/k02-abbey.png): Westminster Abbey +4 s (länsitornit, silmä 35–48 m; metrolinjassa Abbey korostettu) (2622×1206 px, vaaka)
- **OK** [k03-buckingham.png](kuvat/k03-buckingham.png): Buckinghamin palatsi +4 s (julkisivu ja Victoria-muistomerkki) (2622×1206 px, vaaka)
- **OK** [k04-trafalgar.png](kuvat/k04-trafalgar.png): Trafalgar Square +4 s (v3: Whitehallin yltä 172°, silmä 70–85 m, pylväs keskellä) (2622×1206 px, vaaka)
- **OK** [k05-st-paul.png](kuvat/k05-st-paul.png): St Paulin katedraali +4 s (kupoli, silmä 55–78 m) (2622×1206 px, vaaka)
- **OK** [k06-tower.png](kuvat/k06-tower.png): Lontoon Tower +4 s (v4: silmä 45–60 m, ei rikkinäistä kattoa etualalla) (2622×1206 px, vaaka)
- **OK** [k07-tower-bridge.png](kuvat/k07-tower-bridge.png): Tower Bridge +4 s (ei ruskeaa verhorengasta vedessä) (2622×1206 px, vaaka)
- **OK** [k08-greenwich.png](kuvat/k08-greenwich.png): Greenwichin kuninkaallinen observatorio +4 s (v5: tasanteelta 337°, observatorio, Queen's House, Thames ja Canary Wharf linjassa) (2622×1206 px, vaaka)
- **OK** [z02-nousu.png](kuvat/z02-nousu.png): Nousu puolivälissä (+16 s) (2622×1206 px, vaaka)
- **OK** [z03-yleiskuva.png](kuvat/z03-yleiskuva.png): Yleiskuva 1 100 m / 50°, koko joki kuvassa (2622×1206 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 25.99 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **KUORMA** toimintatesti, ei fps/laatu/A-V (load 14.14): xcodebuild 

## 8. Ei testattu
- **EI** A/V-ajoitus, fps ja laatu: kone kuormassa

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
