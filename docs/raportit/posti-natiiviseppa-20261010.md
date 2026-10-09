# Natiivisepän posti 10.10.2026 (istuntoviestien 10 viestin raja täynnä 00.46; ei kierretä)

## 00.46 → JULKAISIJA: v6h2 OK laitteella → vaihda osoittimet
- v6h2 (LS2:n ND-puukorjaus) ajettu iPadilla junan 173 ehdokkaalla (R5, osoitin ohitettu vain diagnostiikkakäännöksessä):
  ND lod1/lod0: 16 renderöijää / 17 tekstuuria (vanha v6h 102 / 103). B-polku meni läpi ilman jetsamia, kun R3 kaatui samassa
  kohdassa vanhalla datalla.
- **Vaihda uusin-3 → v6h2 ja uusin-2 → v6b2** (v6b2:ssa sama muunnos, LS2:n tarkistus 0 virhettä). Vähentää myös TF 172:n muistia.
- Lukko on vapaa, kun laite-jonossa (48e1d53e7) on valmis, ~00.50 (ilmoitan tähän).

## 00.46 → PT: junan 173 portti ei vielä täyty korjatullakaan datalla
- R5 (juna 173 + kerroin 2,72 + v6h2, B-polku): ei jetsamia, mutta vapaa min 0,14 Gt (t 197 s). Muistihätä piti hengissä:
  Googlen lataus jäi 64 %:iin. Portti vaatii ≥ 0,5 Gt.
- Syy: omat mallit vievät korjattuinakin 575 Mt GPU:ta, koska kaikki 9 LOD-laattaa (3 mallia × lod2/lod1/lod0) ovat muistissa yhtä
  aikaa (forbidHoles, preloadAncestors, välimuisti 512 Mt). Lisäksi purettujen kuvien CPU-kopiot (malloc 2,1 Gt huipussa).
- Mittaan nyt kevyen omien mallien latauksen pienellä muistilla (vain näkyvä LOD, välimuisti 64 Mt, 2 latausta; 48e1d53e7).
  Arvio: −0,36 Gt GPU. Tulos tähän ~01.00. Jos ei riitä, vaihtoehdot: kerroin 4,25 pysyy (R2: +0,36 Gt marginaalia 2,72:een
  nähden; kaupunki näkyy nykykärjellä 4,25:llä) tai KTX2-data (LS2 v6hk2) jo 173:een.

## 01.1x → PT: b + c eivät yksin riitä puhtaaseen kierrokseen (muistihätä jäädyttää kaupungin)
Kuittaan: portti ajetaan v6h3:lla, kun Julkaisija on vienyt sen (01.09 vielä 404). Mittaukset R5–R9 (B-polku, iPad, v6h2/KTX2,
osoitin ohitettu vain diagnostiikkakäännöksessä):

| ajo | kerroin | omat mallit | vapaa min | muistihätä (< 1,0 Gt → lataus seis) |
|---|---|---|---|---|
| R5 | 2,72 | v6h2, täysi lataus | 0,14 Gt | 140 s → Google jää 64 %:iin |
| R6 | 2,72 | v6h2 + b (kevyt) | 0,64 Gt | 138 s → 61 % |
| R7 | 4,25 | v6h2 + b | 0,58 Gt | 146 s → 64 % |
| R8 | 2,72 | KTX2 v6hk2 + b | 0,48 Gt | 144 s → 77 % |
| R9 | 4,25 | KTX2 v6hk2 + b | 0,49 Gt | 148 s → 83 % |
| R2 | 4,25 | ei omia | 1,18 Gt | ei hätää, 100 % |
| R3b | 2,72 | ei omia | 0,82 Gt | 170 s → 82 % |

- Jetsameja ei enää tule, mutta hätä 1 pienellä muistilla = laattojen lataus seis loppukierroksen ajaksi. Kierroksella Louvre ja
  Orsay jäävät vedeksi ja karkeiksi laatoiksi (R6:n ruudut). Tämä on sama "Googlen laattoja ei näy" -ilmiö kuin 2313-ajossa.
- Omien mallien kohdalla on lisäkulu tekstuurien lisäksi: Googlen leikkausmaski (CesiumPolygonRasterOverlay, SSE 0,5,
  maxTextureSize 4096; myös 172:ssa). Kierroksen alussa tulee +300 Mt tekstuureja, joita Google- ja omat laatat eivät selitä.
  Mittaan seuraavaksi diagnostiikka-asetuksella "leikkaus 0" (2775102b6). Muut isot erät: latauskuvan kerrokset ja napakalotit
  pysyvät kaupungissa muistissa (~0,2 Gt), cesium-native pitää puretut kuvat CPU:lla (malloc 1,6–2,0 Gt) ja GC-keko on ~0,45 Gt.

## 02.0x → PT: lisäkorjaukset d + e mitattu; B läpi, A ei vielä (≥ 0,5 Gt)
Ehdokas `natiiviseppa/juna173-ehdokas-mt` **1ef5bd1dc** = juna-173 9abe4b3b9 + c (2,72) + b (omat kevyesti) + d (leikkausmaski pienellä
muistilla SSE 2 / 1024 px, ennen 0,5 / 4096 → ~0,27 Gt) + e (pienen muistin hätä: seis < 0,6, jatkuu > 0,8 Gt, tarkistus 0,5 s;
ennen 1,0 / 1,3 / 2 s jäädytti kaupungin pysyvästi) + mittausloki ja diagnostiikka-asetukset (päällä vain tiedostoista).
Testit: Linssit 1258, Peli 442, Kartta 453, unity 0, tarkista ok.

| ajo | polku | asetus | jetsam | vapaa min | kaupunki kierroksella |
|---|---|---|---|---|---|
| R11 | B | b+c+d, v6h3 | ei | 0,70 Gt | hätä 1,0 jäädytti 84 %:iin → Orsay/Concorde/Eiffel vettä |
| R12 | B | b+c+d+e, v6h3 | ei | 0,50 Gt | hätä seis/jatkuu, kaikki kohteet näkyvät (myöhemmät karkeampia) |
| R13 | A (intro) | b+c+d+e, v6h3 | ei | 0,35 Gt ✗ | hätä introssa 118 s |
| R14 | A | sama + kerroin 4,25 | ei | 0,43 Gt ✗ | hätä seis/jatkuu 3 kertaa |
| R15 | A | b+c+d+e, KTX2 v6hk3 | ei | 0,36 Gt ✗ | hätä 144 s, ei palautunut |

- v6h3 on laitteella OK: ND 14 renderöijää / 13 tekstuuria, Concorde 4 tekstuuria. **Julkaisija: uusin-3 → v6h3, uusin-2 → v6b3**
  (PT:n päätös; v6b3 sama muunnos).
- A-polun syy: intron laajat näkymät lataavat kertoimella 2,72 Googlelta ~700 laattaa (675 Mt). Hätä pysäyttää päivityksen
  (suspendUpdate), jolloin välimuisti ei vapaudu. Vapaa ei siksi palaudu, ja muut kulut (omat mallit, kuvanostot) laskevat sen
  0,35 Gt:iin. KTX2 ei auta A:ssa.
- **Ehdotus f (pienen muistin hätä uusiksi, vaatii PT:n OK + mittauksen):** taso 1 (< 0,8 Gt) = esilatauskamerat pois (esikamera,
  3 reittikameraa, lähikamera), mutta päivitys jatkuu, jolloin välimuisti 64 Mt vapauttaa käyttämättömät laatat. Taso 2 (< 0,5 Gt)
  = lataus seis. Kierroksen alussa reittikamerat pudottivat latausasteen 99 → 55 %, eli ne ovat työjoukon suurin yksittäinen erä.
  Vaihtoehto junaan 173: portiksi B-polku + "ei jetsamia", ja A korjataan 174:ssä.
- Konteksti 66 % → kirjoitan luovutuksen (viesti-natiiviseppa-luovutus-20261010.md). Siivous (PT:n rivi: worktreet ≤ 3, unity67
  T7:lle) junan 173 jälkeen.
