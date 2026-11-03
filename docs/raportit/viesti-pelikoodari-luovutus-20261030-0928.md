# Pelikoodari: luovutus 30.10.2026 klo 09.28 (konteksti ~32 %)

Edellinen luovutus -20261030-0422 (PR 5638). Muisti: pelikoodari-tila-20261018-aamu.md.
Työkansiot:
- _tyo = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kuja05-pk6-20261029
- piirrokset = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030

Worktreet:
- wt/proto-pelikoodari-lr83-215 (pelikoodari/lr-v91-215)
- wt/proto-pelikoodari-orto (pelikoodari/orto-215)
- wt/proto-pelikoodari-pk7-214 (editori- ja esikatselutyökalut)

## TEHTY tällä vuorolla
- **LR v95, v96 ja v97** on viety lr-v91-215:een:
  - 29d362976: rakennukset-v81, lahipuut-v11, c2-v20
  - 200668ef0: rakennukset-v82, c2-v21
  - ebdf763e6: rakennukset-v83, c2-v22

  NS yhdisti ne runkoon 215 (db9b38469). Esto pysyi joka kerta samana kuin v19.
- **Aukion 03/03b loppupari** on lähetetty PT:lle: runko db9b38469, kamera `3.65 6.88 14.5 45`.
  - Keisari 0,11/0,12, horisontti +0,03/+0,02, koonti OK. Pakopiste y 0,19 ja havainne 0,19–0,21.
  - Kuvat: lokit/havainne-editori-20261030-053411/.
  - Pakopisteen mittari: _tyo/pakopiste.py.

  PT:n tuomio puuttui vielä luovutushetkellä.
- **MITTAPIIRROKSET** (omistajan päätös 09.11 PT:n kautta; todelliset mitat, Meridiaaniportista alkaen):
  - **Mittataulukko** `portti06-mitat.json`. Jokaisella mitalla on lähde:
    - [1] Palatsimuseo dpm.org.cn/explore/building/236454.html: jalusta 12,00 m, päälinna 60,05 × 25,00 m, 9 × 5 jännettä, 重檐庑殿, 明三暗五, siivet 13 jännettä, 方亭重檐攒尖, 钟鼓亭.
    - [2] Zhihu 572685765: maasta harjakoristeisiin 37,95 m.
    - [3] cqrb 9.6.2020: jalusta itä–länsi 126,9 m, pohjois–etelä 114,9 m.
    - [4] OSM way/638156366.
    - [5] zh.wikipedia.
    - A = arvio pelin mallista (aukot, kerroskorkeudet, paviljongit). Nämä pitää varmistaa ennen 3D-työtä.
  - **Kehys:** akselikehys = pohja.json kierrettynä 2,03° myötäpäivään origon ympäri, jolloin palatsin akseli on x = 0.
    Pelin a-meridiaaniportti on tässä kehyksessä tasan akselilla.
  - **Piirrokset:** `piirra06.py` tuottaa portti06-pohja.png ja portti06-julkisivu-etela.png, jokaisen kehys omassa .json:ssa.
    Yhteinen pohja on `piirra06_kirjasto.py` (CJK-fontti STHeiti). `piirra-reitti.py` tekee reitti-pohjakartta.png:n
    (pohja.json + havainnekohdat 01–07).
  - **Pelin geometria paketin malleista** (ilman Unityä): `orto_glb.py <rakennukset-kansio> <malli> ylhaalta|etela x0 x1 a0 a1 px/m ulos [lod]`.
    Python: venv /Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python3 (numpy + PIL).
  - **Peli editorissa ortona:** QA `ui juoksupeli valo orto ylhaalta|edesta x z suunta° korkeus_m [y] [etäisyys]`.
    - Haara proto **pelikoodari/orto-215 0b3d635ae** (db9b38469:n päällä). Unity-tarkistus 0 virhettä, kameravahti OK. EI junassa.
    - `orto.sh 06` → lokit/orto-<aika>/ (06-ylhaalta.png, 06-edesta.png). Ajo vie noin 6 min.
  - **Vertailu:** `vertaa.py <piirros.png> <peli.png> <kx> <ka> <korkeus_m> <ulos> [nimi]` tuottaa paalle-, reunat- ja vierekkain-kuvat
    sekä ero.txt:n (IoU ja rakenteen rajat 10 m välein).
    - Pelin vertailu: lokit/orto-20261030-092415/vertailu/. IoU on pohjassa 0,69 ja julkisivussa 0,52 (taustalla Jingshan ja puut).
  - **Löydökset:**
    - 钟鼓亭 puuttuu pelistä.
    - Jalustan keskiosa on pelissä 30,5 m syvä, OSM:ssä 27,0 m.
    - Pohjois–etelä: OSM 107,2 m, [3] 114,9 m, peli 109,9 m.
    - Pelin sivuaukot näyttävät suljetuilta tai vaaleilta.
  - **Codex-tilaus** on postilaatikossa 77f0c5956: posti/pelikoodari-codex-mittapiirrokset-portti06-20261030(.md + kansio).
    Codex toimittaa viivapiirrokset samaan kehykseen ja samalla px/m:llä havainteen väreillä. Toimitus tulee kansioon
    posti/codex-pelikoodari-mittapiirrokset-portti06-*.
  - **PT:lle on raportoitu** (09.2x). Omistaja hyväksyy julkisivun KK:n kortilla ennen 3D-työtä.

## SEURAAVAKSI
1. **Taihemen 太和门** (paketissa f-taihemen, paikka_pohja 7.337, −216.159; LR: jalusta 3,4 m, huippu 23,7). Lähteet:
   - zh.wikipedia 太和门: 通高 23,8 m; 重檐歇山; 面阔 9 jännettä, 进深 3 (toinen kohta: 7 × 2); 1371,14 m² (toinen kohta: 1300 m²).
   - Palatsimuseo dpm.org.cn tarkistettava.
   - Taihemenin keskipiste akselikehyksessä on suunnilleen (−0,3, −216,2).

   Tee samoin kuin portille 06: taulukko taihemen-mitat.json, piirra06.py:n mallin mukainen piirto, `orto.sh`:iin kohde
   (YLA/EDE/SIJ), vertailu, PT:lle ja Codex-tilaus.
2. **Taihedian 太和殿** (g-taihedian, −0.308, −0.845). Lähde zh.wikipedia 太和殿:
   - 面阔 11 jännettä 63,96 m, 进深 5 jännettä 37 m, 2377 m²
   - 殿高 26,92 m, 通高 35,05 m
   - kolmiosainen terassi 8,13 m, 重檐庑殿
   - 72 pylvästä, korkein 12,7 m ja Ø 1,06 m
   - 螭吻 3,40 m

   OSM-pohja pohja.jsonissa on 67 × 39,5 m (räystäät?).
3. **Sivuhallit** h-zhongyoumen ja h-zhongzuomen: 中右门/中左门, Taihemenistä skaalatut.
4. **Codexin toimitus portille 06:** vertaa.py mittapohjaa ja peliä vasten → PT.
5. **A6:** kun Codexin 7-välinen GLB on LR:n paketissa, tarkista läikät.
