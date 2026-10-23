# Todistusajo: ateenapallo7-iphone 47030235

**ateenapallo7-iphone 47030235: OK**

Laite iphone `0AC1815C-3372-4E20-A9B4-EDA798818943`, skenaario `sk-ateenapallo7-ipad.txt`, kansio `/Users/Shared/Claude/proto-3d/lokit/todistus-ateenapallo7-iphone-20261014-2001`.

![kuva-arkki](kuva-arkki.png)

## 1. Build ja asennus
- **OK** kaannos.txt 47030235 = 47030235

## 2. Napautuspolku oikeilla kosketuksilla

| askel | tulos |
|---|---|
| `oletus: opas aukesi` | OK: linssit: opas: auki (aloitusvalikko, kartta valinnasta), data Google, worker https://matkakirja-pollo.samireivinen.workers.dev/opas/seuraava |
| `oletus: pallokierroksen data natiiviin` | OK: linssit: opas: pallokierros ateena (pallokierros-ateena-v6): 8 pysähdystä (Kallimarmaro / Panathinaikon stadion, Olympoksen Zeuksen temppeli, Tuulten torni, Antiikin agora, Hefaistoksen temppeli, Ak |
| `ei-oletus: workerin liiku-listaa ei haeta` | OK: ei riviä 5 s:ssa |
| `oletus: siirto (Ateena) ohi` | OK: linssit: opas: esitys alkaa (ateena): avaus + opastus (1. kyyti) [opas/esittely-v2/ateena.json] |
| `oletus: kierros alkaa` | OK: linssit: opas: esitys: kaupunkikierros |
| `oletus: kierros datasta` | OK: linssit: opas: kaupunkikierros 8 kohdetta (pallokierros-ateena-v6/ateena): Kallimarmaro / Panathinaikon stadion, Olympoksen Zeuksen temppeli, Tuulten torni, Antiikin agora, Hefaistoksen temppeli, Akro |
| `oletus: saapuminen 1 Kallimarmaro / Panathinaikon stadion` | OK: linssit: opas: saapui Kallimarmaro / Panathinaikon stadion (37,9683, 23,7411), ääni ei, laatat 92 %, saapumisportti 3,4 s, tarkkuus 1,00, peitto 1,00 |
| `oletus: saapuminen 2 Olympoksen Zeuksen temppeli` | OK: linssit: opas: saapui Olympoksen Zeuksen temppeli (37,9694, 23,7331), ääni ei, laatat 86 %, saapumisportti 0,0 s, tarkkuus 0,94, peitto 1,00 |
| `oletus: saapuminen 3 Tuulten torni` | OK: linssit: opas: saapui Tuulten torni (37,9742, 23,7270), ääni ei, laatat 100 %, saapumisportti 0,0 s, tarkkuus 1,00, peitto 1,00 |
| `oletus: saapuminen 4 Antiikin agora` | OK: linssit: opas: saapui Antiikin agora (37,9750, 23,7225), ääni ei, laatat 100 %, saapumisportti 0,0 s, tarkkuus 1,00, peitto 1,00 |
| `oletus: lyhyt väli liukuna (≤ 12,5 s)` | OK: linssit: opas: lento Hefaistoksen temppeli 119 m, kesto 12,0 s, suurin kiihtyvyys 7,4 m/s², suurin lasku 3,5 m/s |
| `oletus: saapuminen 5 Hefaistoksen temppeli` | OK: linssit: opas: saapui Hefaistoksen temppeli (37,9756, 23,7214), ääni ei, laatat 100 %, saapumisportti 0,0 s, tarkkuus 1,00, peitto 1,00 |
| `oletus: lento Hefaistos → Propylaia (KS: ~51 s, käännös 158°)` | OK: linssit: opas: lento Akropolis ja Propylaia 550 m, kesto 48,4 s, suurin kiihtyvyys 2,2 m/s², suurin lasku 0,0 m/s |
| `oletus: saapuminen 6 Akropolis ja Propylaia` | OK: linssit: opas: saapui Akropolis ja Propylaia (37,9716, 23,7250), ääni ei, laatat 100 %, saapumisportti 4,0 s (tasanne), tarkkuus 0,90, peitto 1,00 |
| `oletus: lyhyt väli liukuna (≤ 12,5 s)` | OK: linssit: opas: lento Erekhtheion 151 m, kesto 12,0 s, suurin kiihtyvyys 10,0 m/s², suurin lasku 0,9 m/s |
| `oletus: saapuminen 7 Erekhtheion` | OK: linssit: opas: saapui Erekhtheion (37,9721, 23,7265), ääni ei, laatat 100 %, saapumisportti 0,0 s, tarkkuus 0,96, peitto 1,00 |
| `oletus: lyhyt väli liukuna (≤ 12,5 s)` | OK: linssit: opas: lento Parthenon 61 m, kesto 12,0 s, suurin kiihtyvyys 3,8 m/s², suurin lasku 0,4 m/s |
| `oletus: saapuminen 8 Parthenon` | OK: linssit: opas: saapui Parthenon (37,9715, 23,7266), ääni ei, laatat 100 %, saapumisportti 3,6 s (tasanne), tarkkuus 0,90, peitto 1,00 |
| `oletus: loppunousu` | OK: linssit: opas: pallokierros: loppu (nousu yleiskuvaan 1100 m / 50° 34 s:ssa, katse 50°) |

- **OK** 0 kosketusta, kaikki oletukset täyttyivät

## 3. Poikkeukset ja virherivit
- **OK** Exception-rivejä 0
- **OK** ei VIRHE-/error-rivejä (tunnetut suodatettu)

## 4. Stillit tiloista
- **OK** [a01-avaus.png](kuvat/a01-avaus.png): Avausnäkymä 1 100 m / 50° (Akropolis-kallio, kohti Kallimarmaroa) (2622×1206 px, vaaka)
- **OK** [k01-kallimarmaro.png](kuvat/k01-kallimarmaro.png): Kallimarmaro / Panathinaikon stadion +4 s (stadionin kaarre kaakkoon, silmä 60–80 m) (2622×1206 px, vaaka)
- **OK** [k02-zeus.png](kuvat/k02-zeus.png): Olympoksen Zeuksen temppeli +4 s (kaakosta, pylväät telinekuution edessä, silmä 45–60 m) (2622×1206 px, vaaka)
- **OK** [k03-tuulten-torni.png](kuvat/k03-tuulten-torni.png): Tuulten torni +4 s (v6: silmä 70–85 m, ei ruskeaa kalvoa: korostus ilman verhoa) (2622×1206 px, vaaka)
- **OK** [k04-agora.png](kuvat/k04-agora.png): Antiikin agora +4 s (Attaloksen stoa, Hefaistos taustalla, silmä 60–80 m) (2622×1206 px, vaaka)
- **OK** [k05-hefaistos.png](kuvat/k05-hefaistos.png): Hefaistoksen temppeli +4 s (itäpääty, silmä 35–48 m) (2622×1206 px, vaaka)
- **OK** [l06-lento-propylaia.png](kuvat/l06-lento-propylaia.png): Lento Hefaistokselta Propylaialle +20 s (käännös lounaaseen) (2622×1206 px, vaaka)
- **OK** [k06-propylaia.png](kuvat/k06-propylaia.png): Akropolis ja Propylaia +4 s (Propylaian länsijulkisivu ja Niken temppeli lounaasta auringossa, silmä 50–70 m) (2622×1206 px, vaaka)
- **OK** [k07-erekhtheion.png](kuvat/k07-erekhtheion.png): Erekhtheion +4 s (lounaasta, silmä 40–50 m, ei laattavenymää oikeassa reunassa) (2622×1206 px, vaaka)
- **OK** [k08-parthenon.png](kuvat/k08-parthenon.png): Parthenon +4 s (länsipääty ja eteläkolonnadi lounaasta auringossa, ei oranssia läikkää) (2622×1206 px, vaaka)
- **OK** [l01-loppu.png](kuvat/l01-loppu.png): Loppunousu kohti Lykabettosta (50°) (2622×1206 px, vaaka)

## 5. Ääni
- **OK** Macin ulostulo mykistetty: MATKAKIRJA peli-komento: 25.17 aani mykistys → ok mykistys päällä (simulaattori True; testimykistys unity päällä, natiivi päällä) [Kartta]

## 6. Aiemmat palautteet
- **EI** skenaariossa ei palaute-rivejä (ei aiempia palautteita tai niitä ei käyty läpi)

## 7. Kone kuormassa
- **OK** kone kuormaton (load 9.79)

## 8. Ei testattu
- **EI** A/V-ajoitus: ei mitattu tässä ajossa (vaatii merkki + videokaappauksen)

Konsoli: [konsoli-stdout.log](konsoli-stdout.log), [konsoli-stderr.log](konsoli-stderr.log), ajo: [ajo.log](ajo.log).
