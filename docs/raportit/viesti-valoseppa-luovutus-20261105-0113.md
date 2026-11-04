# Valosepän luovutus 5.11.2026 klo 01.13

Syy: konteksti 25 %, pehmeä raja (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-2243.md (kohdan 2 suunnitelma ja lisäys 2 voimassa). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Wt k30 (/Users/Shared/Claude/wt/proto-linssiseppa2-k30) on haarassa linssiseppa2/suomi-syy, puhdas.

## Tehty
- Karttaseppä: Louvren pohja, 80 z17-palaa, _tyo/karttaseppa/pariisi-alueet-20261104/louvre-pohja/cs (2d8ec025c, data k53/nd-pohja). Liitosta ND:n länsikärkeen EI mitattu: KS tarkistaa. k53/nd-pohja/cs ylikirjoitettiin 4.11. 10.30, eikä se ole 19c:n pohja.png:n lähde.
- Viivat 1b/2b (lokit/julkaisija-piirto-viivat-{1b,2b}-a5323cf4e): näkyvät kummassakin tavassa samoin, muurin varjossa Meridiaaniportin edessä. Tapa 1 ei ollut voimassa kuvissa: muistivaroitus 23.36.08 ennen kuvia. Täysikoossa kuvat 3–7, muut pienenä. Rajaukset striimi/viivat-1b-2b/. KK ja PT tietävät.
- Suomi, syy (kaikki striimi/jarvet/TULOS.md; KK ja PT tietävät):
  - Lopputila, ei lataus. t105:n jälkeen ei uusia pyyntöjä. Paluukuvat tavulleen samat, t115 välissä eri.
  - Rinnevalo kumottu vöiden ja maan kirkkauden syynä.
  - TODISTETTU kokeella sk-suomi-tapa2: t105:n terävyys ja vaaleat laikut tulevat tavasta 1. Tapa 2: t105 terävyys 20 (tapa 1: 229), Suomesta 0 elävää pyyntöä. t110 sama molemmilla (0,00 / 255).
  - 82/170 kerrottu KK:lle (ks. edellinen luovutus).
- Muut järvialueet: vertaa.log, alueet-1/2/3.jpg. IoU Keski-Suomi 0,28 … Vänern 0,82; pohjassa kapeat järvet möykkyinä, pienet puuttuvat. Pohja vs. OSM, ei laitekuva. KK ja PT tietävät.
- T7: jarvet.osm.pbf ja jarvet-solmut.idx poistettu, 65 Gi vapaana. renkaat.npz säilyi.

## SEURAAVAKSI
1. VERKON PALAUTUS. Ei aloitettu; KK:lle sanottu, että tämä tulee seuraavaksi. Ohje: luovutus -2243 kohta 2 ja lisäys 2 (vanha kuva pysyy, kunnes uusi on valmis; ei muistilukua eikä nykimisen todistusta; todistus: Madrid, Rooma ja Wien samalta kuin verkossa). Oma haara, ei junaan, yksi kierros.
2. Suomi auki: suorakulmio ja haamulaikut näkyvät t113:ssa ja t115:ssä. Niitä ei ole ajettu tavalla 2. Vöiden syy auki. Hypoteesi, ei testattu: vöiden ja "vesi, jossa pohja on maata" -pikselien alue on z10-pohjaa eikä elävää palaa (kuvassa z11 vain keskellä). Testi: sovita z10-pohja värittäen samaan kuvaan ja vertaa. Korjaustapa KK:lle vasta sitten, ja se valitaan ulkonäön mukaan (omistaja 22.41). Pohjan uudelleenpoltto vaatii uuden kansion, TasoVersion ja mediaviennin.
3. Sitten valtionraja, Alpit, tasorajat; ND-pohjan laikku KK:n listan jälkeen.

## Odottaa muita
- Piirtotapa 1 vai 2: omistajan kokeilu, ei minun päätökseni. Tämän kierroksen tulos on kerrottu KK:lle.
- Karttaseppä voi kysyä liitoksesta.

## Muistettavaa
- Selittämättä: tavan 2 elävän laskuri piirretty kasvoi t110:n aikana 522 → 728 ilman Cesiumin pyyntöjä. Epäilen taustapiirtoa, ei tarkistettu.
- pura_vesi.py: OuterRingillä ei ole envelope()-metodia; korjattu ja testattu. vertaa_alueet.py: yhteinen alue x 583–587.
- Skriptaamaton iPad-koe: JU ajaa ilman konsolia (--console antoi error 22), konsoli.txt koottu L-riveistä; kuva-loki.txt ja ui-loki.txt loppuvat varhain.
- Asemataulua ei päivitetty: kokeet eivät ole junassa.
