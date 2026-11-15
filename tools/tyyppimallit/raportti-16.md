# Raportti 16 (Valoseppä 15.11.2026): KK 12.00 PÄÄTÖS A = kimput. EI JUNAAN.

Koodi: pelihaara valoseppa/tyyppimallit-peliin 1d01069c7 (kimput, _PALANOUSU, Aariviiva-passi pois, `talot nousu`) + 1036c2429 (jaetuilta lohko _Keski pois; varjostimet ennallaan).
Ajo: JU VS-TYYPPIMALLIT9 1d01069c7, Mac ipad-koko Pariisi 7/7 + Lontoo 1/1 rc 0, iPad laite-pariisi/-lontoo rc 0. Shader error 0 kaikissa.
VS9B (1036c2429 Mac-uusinta + iPad-mittaus 9c) KARSITTU (omistaja 16.16: erilliset mittausajot pois jonosta).
Arkki: proto-3d/lokit/valoseppa-tyyppimallit9-koonti/tyyppimallit9-k8-k9.jpg (vasen kierros 8 UUSI, oikea kierros 9 UUSI; alla p5 nousu 0 | 0,5 | 1), luvut.txt.
Testit 1036c2429: Kartta 857/857, Linssit 2342/2342, unity-tarkistus 0.

## Junasanan ehdot (KK 12.00)
| Ehto | Tulos |
|---|---|
| 1 kutsut ≤ +12 | TÄYTTYY: p5 +10, p9 +11, p11 +10, p12 +11, l3 +8 (kierros 8: +60…+73). Omat: jaetut 5–8, palat 1 kimppu, varjot 2 kimppua |
| 1 setpass ≤ +6 | EI 1d01069c7:llä: p5 +10, p9 +11, p11 +10, p12 +11, l3 +8 (kierros 8: +26…+38). Syy: lohko (_Keski) jokaisella jaetulla verkolla → setpass kutsua kohden. Korjattu 1036c2429, MITTAAMATTA (arvio ~+4) |
| 2 kuva sama + kolme ruutua noususta | TÄYTTYY: arkissa kierros 8 = 9 silmämääräisesti (p5, p9, p11, p12, l3). Nousu 0: ei merkkejä eikä taloja; 0,5: asema ja talot puolikorkeina; 1: valmis |
| 3 muisti ≤ P 5,3 / L 3,9 Mt | TÄYTTYY: P 5324 kt = 5,2 Mt (jaetut 0,35, palat 2,7, varjot 2,1), L 3673 kt = 3,6 Mt. Varjojen jaetut kärjet säästivät vain ~5 % (litteät normaalit), uv1 lisäsi |
| 4 iPad: ruutuaika ero ≤ 0,5 ms, Shader error 0 | Shader error 0 TÄYTTYY. Ruutuaika EI MITATTAVISSA tästä ajosta: peli oli lepotahdissa (Pariisi 30 fps: p5 33,35 → 34,64, p9 33,35 → 33,35 ms; Lontoo 10 fps: 100,1 → 81,4 ms). GPU-ajat heittelevät (p5 16,0 → 32,7, p9 12,7 → 9,9 ms). Uusi skenaario 9c (pois/päällä ×2, talot nousu 1 pitää pallon hereillä) valmiina, ajo karsittu |
| 5 testit nimeltä | TÄYTTYY (yllä) |

## Lataus (Mac / iPad)
Pariisi: lataus 145 ms (taustasäie 102, pääsäie 43) / iPad 115 ms (99 / 15,6). Lontoo 113 ms (63 / 50).

## KK päättää
- Junasana nykyisillä luvuilla (ehdot 1 setpass ja 4 ruutuaika jäävät 1036c2429:llä mittaamatta) TAI yksi yöajo VS9B (Mac + iPad 9c, valmiina; JU palauttaa PT:n perustelurivillä).
