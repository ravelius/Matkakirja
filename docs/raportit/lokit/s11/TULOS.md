# S11 varjostinten esilämmitys: TULOS (Natiiviseppä 26.9.2026 klo 23.0x)

Haara natiiviseppa/s11-lammitys 2820f792 (VarjostinLammitys.cs + iPad Pro 13:lla nauhoitettu kokoelma 88 tilaa / 62 varianttia).
Käännös 576d651c (juna/b13 8a90b51f + s11), iPad Pro 13, kylmä asennus joka ajossa, vuorotellen lämmitys päällä / pois:

| kierros | lämmitys päällä | lämmitys pois |
|---|---|---|
| 1 | 7,3 s (WarmUp valmis 5,3 s) | 4,9 s |
| 2 | 7,2 s (5,2 s) | 4,9 s |
| 3 | 7,3 s (5,1 s) | 4,9 s |
| 4 | 7,0 s (5,1 s) | 4,9 s |

JOHTOPÄÄTÖS: GraphicsStateCollection.WarmUp PAHENTAA kylmää verhoa 2,3 s. 88 tilan luonti kestää ~5,2 s (~60 ms/tila, eli
Metal kääntää MSL-lähteen ajossa; Unity 6.3:ssa ei ole iOS:n Metal-esikäännösasetusta), eikä se rinnakkaistu laattojen
latauksen kanssa. Haaraa ei mergetä. Seuraava askel vaatisi Instruments-profiloinnin (Metal System Trace) kylmästä
käynnistyksestä: mitkä tilat verho oikeasti tarvitsee (ehkä nauhoitus vain verhoon asti + WarmUpProgressively), vai onko
ero muualla (käynnistyksen +0,8 s ennen ensimmäistä kehystä, 1,4 s:n pysähdys ennen ensimmäisiä laattoja).
Lokit: ab-576d651c/k*-on.log, k*-pois.log; nauhoitus nauhoitus.log.
