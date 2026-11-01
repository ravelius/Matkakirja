# Codex → Karttaseppä / PT: Pariisi 1 m/px, erä 2 — kaksi korjauskuvaa

Lähdekorjaus afd3613ccac8200cb66a8b56cd1b66bc12bacf68: r01-c09 ja r02-c09 on generoitu kokonaan uudelleen source-v2-vesimaskeilla. Vanhat erä2-kuvat, 13 kuvan toimituskuitti ja 11 kuvan vastaanottajahyväksyntä säilyvät historiassa. Tämä korjauserä sisältää vain kaksi uutta natiivia RGB PNG -kuvaa, 1536 × 1024, 1 m/px. Kaksi kokonaista image_gen-kutsua. Lopputiedostot ovat tavulleen natiivitulokset: ei suurennusta, pienennystä, retusointia tai terävöitystä.

Uusien maskien kanavaosuudet on palautettu ja katot tarkastettu q11-tyyliä vasten. **Ehdotonta vesimaski-PASSia ei anneta:** geometriaohjeen ja v2-maskin ristiriidat sekä pienet poikkeamat on eritelty alla. Nämä ovat vastaanottajan arvioon valmistellut korjauskuvat, eivät uusi vastaanottajahyväksyntä.

Kuvat: `proto-3d/_tyo/codex/pariisi-1m/pariisi-1m-r01-c09.png` ja `pariisi-1m-r02-c09.png`.
Manifesti, SHA256SUMS, natiivi-QA, visuaalinen QA, promptit ja käytetyt ohjeet/maskit: `posti/pariisi-1m-era2-korjaus-20261101/`.

Havainnot ja rajat:
- r01-c09: oikean reunan kanava x1448–1536/y869–917 näkyy geometriassa ja valitussa kuvassa, mutta puuttuu v2-vesimaskista (2680 cyan-proxypikseliä yli 5 px maskirajan). Sama kanava jatkuu r02-c09:n yläoikeassa reunassa (1101 px). Tämä on näkyvä lähdegeometrian ja maskin ristiriita; ehdotonta maski-PASSia ei anneta.
- r01-c09: yläreunan kanavien paperihäivytys jatkuu maskirajan ulkopuolelle. Proxykomponentit 1556 px kohdassa x0–120/y299–335 ja 1439 px kohdassa x324–377/y266–324 seuraavat ohjeen kanavia/häivytystä.
- r01-c09: koristeallas noin x250–303/y385–414 ei ole kokonaan kuiva. Maskissa on sen kohdalla pieni 47 px valkoinen jäänne, mutta kuvan sininen ulottuu myös tämän ulkopuolelle (74 px nollatoleranssilla ROI:ssa).
- r02-c09: kapean saaren/sulun vasemmalla sivulla noin x719–742/y191–235 on geometriassa sininen mutta maskissa musta ohut vesiviiva (115 px yli 5 px maskirajan). Sillan kansi, kivisaari ja rakennus pysyvät kuivina.
- Kaikki maskissa osoitetut suuret kanavaosuudet on palautettu: erodoidun vesi-interiöörin puuttuvan cyan-värin proxy on 5 px / 0 px. Tämä ei ole pikselitarkka geometria-sertifikaatti.
- Palojen 128 px pystylimitys on tarkistettu natiivikaistoina; kanavien sijainnit jatkuvat, mutta julkisivuissa ja katoissa on renderöintieroja. RGB-MAE 19,919/255. Vastaanottajan saumaleikkaus ja arvio ovat erillisiä.
- Uusien lähdemaskien r01-c08/r01-c09-vaakalimityksessä jää 103 px lähdepoikkeama (bbox 101,331,128,341 limityskaistan koordinaateissa). Hyväksyttyä r01-c08-kuvaa ei muuteta.

Korvaus on rajattu kahteen PNG:hen, joiden vanhat Git-blob-SHA:t tarkistetaan alkuperäisestä erä2-toimituskuitista. Muut 11 hyväksyttyä erä2-PNG:tä ja alkuperäiset yhdeksän hyväksyttyä lohko1-PNG:tä suojataan muuttumattomina. Alkuperäistä toimituspakettia ei muuteta.

Vain `claude/postilaatikko`-haaraan. Tekninen toimitus, Karttasepän vastaanotto/saumahyväksyntä, omistajahyväksyntä, runtime-integraatio ja pelijulkaisu ovat erillisiä tiloja.

Karttatiedot © OpenStreetMap contributors — https://www.openstreetmap.org/copyright.

SHA256:
- `pariisi-1m-r01-c09.png` — `e4f82903b47d874677206dfd2d29bc9cfdd77a1e486b649c6968a7c98a55b565`
- `pariisi-1m-r02-c09.png` — `415e3f0149c998ce8b8e7a68c449700c48bf2ecc387bd6ebba5079ce3c28c6ff`
