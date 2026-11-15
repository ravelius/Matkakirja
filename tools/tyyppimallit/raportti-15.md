# Raportti 15 (Valoseppä 15.11.2026): KK 09.30 vaihe 1 = lopullinen vienti peliin + mittaus. EI JUNAAN.

Ajo: JU VS-TYYPPIMALLIT8, pelihaara valoseppa/tyyppimallit-peliin d5dc5b839, iPad (Macin editori), Pariisi 8/8 + Lontoo 2/2 (rc 0).
Vienti: merkit-pariisi-kartta.bytes 99218b90 (271 merkkiä, 31 mallia), merkit-lontoo-kartta.bytes 15750023 (429, 28) = vie.py nyt (säännöt A + a b c).
Arkki: lokit/valoseppa-tyyppimallit8-koonti/tyyppimallit8-nyt-uusi.jpg (p5, p9, p11, p12, l3; vasen NYT, oikea UUSI); luvut samassa kansiossa luvut.txt (arkki8.py).
Testit d5dc5b839: Kartta 857/857, Linssit 2342/2342, unity-tarkistus 0. Värimitta: raportti 14 (kierros 7, ±3 %).

## Luvut lokista
| | Pariisi | Lontoo |
|---|---|---|
| Rakennus kaupungin latauksessa | 119 ms (taustasäie 106, pääsäie 13,5) | 156 ms (taustasäie 151, pääsäie 4,9) |
| Rakennusruutu | 860 ms * | 32,8 ms |
| Pisin ruutu latauksen aikana / 2 s jälkeen | 851 / 850 ms * | 118 / 73 ms ** |
| Mallien kolmiot | 60 071 | 60 130 |
| Verkkomuisti | 4,3 Mt (jaetut 0,35, palat 2,3, varjot 1,7) | 2,9 Mt (0,14 / 1,3 / 1,6) |
| Verkot: jaetut / leivotut palat / varjopalat | 8 / 14 / 128 | 5 / 11 / 167 |
\* Pariisin merkit valmistuivat kaupungin käynnistyksessä: koko ikkunassa vain 6 ruutua, kaikki ~850 ms (kaupungin muut lataukset). Merkkien osuus on pääsäikeen 13,5 ms.
\** Lontoossa merkit rakentuivat erillisessä ruudussa (32,8 ms); pidemmät ruudut ovat talopalojen ym. latausta, eivät merkkejä.

Piirtokutsut samasta näkymästä merkit pois → päällä (Unityn Render-laskuri, 30 kehyksen ka.; omat kutsut tila-rivistä):
| Näkymä | kutsut pois → päällä | setpass | omat kutsut (jaetut, palat, varjot) | ruudun kolmiot |
|---|---|---|---|---|
| p5 Saint-Lazare | 228 → 298 (+70) | 33 → 68 | 53 (7, 10, 36) | +83 600 |
| p9 Palais Royal | 75 → 148 (+73) | 30 → 68 | 54 (8, 11, 35) | +93 700 |
| p11 Chaillot | 82 → 142 (+60) | 29 → 60 | 45 (7, 8, 30) | +70 200 |
| p12 Gare de l'Est | 238 → 304 (+66) | 39 → 67 | 52 (8, 6, 38) | +70 800 |
| l3 St Pancras | 263 → 327 (+64) | 29 → 55 | 57 (5, 10, 42) | +60 400 |

## Junasanan ehdot
1. Värimitta ±3 %: TÄYTTYY (raportti 14).
2. Testit nimeltä: TÄYTTYY (Kartta 857/857, Linssit 2342/2342, unity 0).
3. Pisin ruutu < 50 ms: merkkien osuus TÄYTTYY (pääsäie 4,9–13,5 ms, Lontoon rakennusruutu 32,8 ms). Kaupungin käynnistysruutuja (~850 ms Pariisissa) ei voi erottaa tästä ajosta.
4. Kutsut eivät kasva rakennusten määrän mukana: EI TÄYTY. Jaetut verkot 5–8 kutsua (vakio), mutta leivotut palat ja varjot ovat yksi kutsu
   talopalaa kohden (näkyvyys palan nousun mukaan): näkymässä 36–52 kutsua, koko kaupungissa P 142 / L 178 verkkoa. Lisäksi setpass noin kaksinkertaistuu.

## Vaihtoehdot KK:lle (päättää luvuista)
- A (vaihe 1:n sisällä, pelikoodi): leivotut palat ja varjot yhdeksi verkoksi kaupunkia kohden (+ korkeintaan muutama ryhmä), palan nousu kärkiattribuuttina
  (palan avain → nousu taulukkona varjostimelle). Kutsut ~10 vakiona, ei uutta työkalua.
- B: vaihe 2 (palaleivonta MT02, C#-komentorivityökalu, NS:n pala) KK:n kuvaamana.

## Huomiot
- l3 NYT on sama kuin kierroksella 6 (pelin nykyinen Lontoo ilman KS:n palat-merkit-kansiota); UUSI = palat-merkit + tyyppimallit.
- Tornin huippu (TyHuippu) on ainoa oma katon väri, myös kupoleissa (KK:n poikkeus). Lontoon seinä #D0BA8C tekee Lontoon kirkoista kellanruskeita (London stock).
