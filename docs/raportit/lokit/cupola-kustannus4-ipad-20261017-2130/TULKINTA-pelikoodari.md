# Cupola kierros 4: suojaprofiili 0,8 M1-iPadilla 5 min (Pelikoodari 17.10. 21.4x)

Laite iPad Pro 12.9 M1 viileänä, käännös cupola-suoja-200 6b0c876d0, Eurooppa päivällä nimineen, ei lampo-pakotusta.

- Profiili kytkeytyi itse Cupolan avauksessa: "lämpö: Kuuma (thermalState 0, … näkymän vähimmäistaso)" → 30 fps, renderScale 0,8,
  MSAA 1, bloom pois. Kaikki neljä `ruutu`-riviä (122–424 s) renderScale 0,8.
- 30 fps pysyi koko ajan: kehysväli p50 33,35 ms, p95 33,4–35,0 ms, max ≤ 43 ms (t 121–422 s).
- GPU-aika 25,1 ms (alku) → 29,4 ms (5 min) – nousee hitaasti, mutta alle 33 ms:n rajan.
- thermalState 0 (Nominal) koko ajan, 0 muistivaroitusta, ei kaatumista.
- Vertailu: ennen profiilia (t 81 s, täysi) GPU 77 ms, 41 ms kehysväli.

Tulos: PYSYY. 0,8 junaan 200 (6b0c876d0). Huomio: GPU-ajan nousu (+4 ms / 5 min) – jos pitkä kyyti kuumentaa laitteen
(serious), laitteen lämpösuoja vaihtaa automaattisesti 0,7:ään (testattu: CupolanSuojaprofiiliOn08JaLaitteenKuumuusVoittaa).
