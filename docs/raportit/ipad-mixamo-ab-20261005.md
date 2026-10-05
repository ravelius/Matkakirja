# iPad Pro 13 (00008103, iPad13,8) Mixamo-kappalainen A/B — 5.10.2026 klo 12.36–12.41

Laitetestaaja. Skripti `proto-3d/tyokalut/siirtoseppa-ajot/ajo-ipad-mixamo.sh`, kehitysbundle `fi.matkakirja.peli.kehitys` (62d5d1bb, ei uudelleenasennusta).
Raakadata: `/Users/Shared/Claude/proto-3d/lokit/laitetestaaja-ipad-mixamo/{A,B}/` (konsoli, cpu-*.txt, kappeli.png). Ei ääntä. **0 Exception** kummassakin.
A = peili 2296811421200485 (ilman Mixamoa), B = 321b971721f2ef7c (Mixamo Praying). Kappeli, 15 s / 900 kehystä, ruutu Taysi, 60 fps.

## Tulokset
| | A (ilman) | B (Mixamo) |
|---|---|---|
| Kehys: CPU Main Thread Frame Time ka / p95 / max (ms) | 4,399 / 4,752 / 13,152 | 4,410 / 4,667 / 12,814 |
| Main Thread / PlayerLoop ka | 16,671 / 16,671 | 16,670 / 16,669 |
| VSync-odotus (WaitForTargetFPS) ka | 12,275 | 12,263 |
| Skin (skinned mesh) -aika | **EI TULOSTA** (0 merkkiä) | **EI TULOSTA** (0 merkkiä) |
| Muisti (`poikki mittaus`) | **EI MITATTU** (lähetys epäonnistui) | **EI MITATTU** |
| Virheet | 0 Exception | 0 Exception |

- **Johtopäätös kehyksestä:** A ja B ovat käytännössä samat (ka ero 0,011 ms, p95 B jopa −0,085 ms); molemmat mahtuvat 16,67 ms:n kehykseen
  ~12 ms marginaalilla. Mixamo-kappalainen ei näy kehysajassa kappelissa iPad Pro 13:lla.
- **Mixamo todella mukana B:ssä:** konsolissa `hahmo3d kappalainen-1500.glb valmis (74 solmua, skin 65 luuta, leikkeet idle,istuu,istuu_puhe,kavely,puhe,tyo)`
  vs A `…leikkeet idle,kavely,puhe,tyo` (ei istuu-leikkeitä). Still B: kappalainen polvistuu rukoilemaan (`ipad-mixamo-B-kappeli-20261005.png`), A: vertailukuva
  `ipad-mixamo-A-kappeli-20261005.png`.
- **Skript-puutteet (kerro Siirtosepälle):** (1) `cpu mittaa 15 Skin` antoi 0 merkkiä → suodatin "Skin" ei osu mihinkään aikamerkkiin
  (176 merkkiä; sopiva nimi puuttuu, esim. SkinnedMeshRenderer / "Skin"-vaihtoehdot) → skin-aikaa ei saatu. (2) Skriptin loppu `l "poikki mittaus"` ja `linssi pois` tuottivat
  `VIKA lähetys linssi-komento.txt` (devicectl copy to epäonnistui kierroksen lopussa) → muistiraporttia ei ole kummastakaan.
  Sovellus pysäytettiin skriptin `kill`illä; ei jäänyt käyntiin. Ei muita virheitä.

## Ei tehty
- **POISTU-tapit (10 nopeaa tappia, ISS-kyydin kytkinpöytä):** fyysisellä iPadilla ei ole HID-kosketuksen injektiota
  (devicectl ei syötä kosketusta; `control` toimii vain simulaattorille). Tarvitsee omistajan käden tai erillisen laitevälineen. Simulaattorissa
  voi ajaa Pelikoodarin `simkosketus … tap` -työkalulla.
