# Linssiseppä 2 – luovutus 10.10.2026 päivä (päivitetty ~11.4x, nollaus PT 11.3x)

Rooli: Linssiseppä 2 (Opus, high): kaupunkinäkymän ilmakehä, valo, vesi, pilvet ja omat 3D-mallit (putki + ämpäri).
Proto `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen git); oma worktree `wt/proto-linssiseppa2-muisti` (6.7-haarat).
Skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/`. Tarkistukset 6.7: `MATKAKIRJA_KIRJASTOT=/Users/Shared/Claude/unity/kirjastot-6000.7.0b4
./Linssit-testit/unity-tarkistus.sh` + `./Linssit-testit/kaanna.sh`. Simu vain Julkaisijan SIMULAATTORI NYT -vuorolla (A26BC7D0, 173pbr2-appi
`lokit/linssiseppa2-app-173pbr2`), ilmoita "simu vapaa".

## TILA 12.5x (uusi sessio aloittaa tästä)
VALMIS: v6k9 (v6k6 + ND v3h) VIETY, uusin-4 → v6k9 11.45. Arkit 1eacff13e (docs/raportit/kaappaukset/linssiseppa2-176-20261010/):
nd-edesta-v3h.jpg, peking-v1-vs-google.jpg, iss-kupola-tila-koe.jpg (PT:lle 12.4x, vastaus odottaa). Skriptit proto-3d/_tyo/linssiseppa2/skriptit-20261009/
(mittaa-parvis.py = parvis + lyijykatto; arkit-*.py; vuoro-*.sh; ajo-cupola-tila.sh; kuvat-utu.sh:ssa KOMENNOT="a;b").
KESKEN / SEURAAVA SIMUVUORO (Julkaisijalta, A26BC7D0):
1) Peking uudelleen vedellä (peking1/vesi: index-v2/index/v5/v6 kopiot; 173pbr2 luki vain v2) → vuoro-peking1.sh.
2) ATEENA (PT 12.2x, omistajan TF 176 -havainto: tumma sinivihreä nauha horisontissa): vuoro-ateena-67.sh = sama kulma 173pbr2 | 0e9893a11 (6.7)
   → yksi rivi PT:lle: yleinen 6.7-regressio (junaan 177) vai vain Ateena. Koodista: aluskerros (CesiumKaupunki TarkistaReiat) käyttää fogColor/
   Taivas (vaalea), ei selitä tummaa nauhaa; epäily Googlen kaukolaattojen reuna/helmat tai meri ilman ilmakehää (ilmakehä vain kehityskaupungeissa).
3) KUPOLA (haara linssiseppa2/cupola3d-koe bae9b1731, .app lokit/linssiseppa2-app-cupola-bae9b17 = 0e9893a11): 3D-huone rikki simussa (vääristyneet
   kolmiot myös GI/SSR pois; konsoli "Cubemap array textures are not supported"). PT päättää korjaus vai koe pois. Muistimittaus: ps-haku ei löydä
   T7-polkua (Devices/$UDID → Sarja/$UDID) → korjaa fp() ajo-cupola-tila.sh:ssa.
4) ND v4b (LR) EI vientiin (PT): odota LR:n v4c → paketti nd3k-paketti.sh POHJA=nd3/v6k9 → pari oikeaa ilmakuvaa vasten (mittaa-parvis.py).
5) Eiffel v2 (LR 12.3x, _valmiit/eiffel-v1/glb) → pari Google | v2 vain PT:n luvalla (kysytty). KTX2-alfamipit tarkistettava.
LÖYDÖS (PT:lle viety): uudessa käännöksessä (TAA) `opas kori 0` ei aina piilota koria → käytä KOMENNOT="opas ajallinen pois;opas kori 0".
Taustalla ei ajoja. Kupolan kameratesti `opas kamera-vapaa 1` (bae9b1731, PalloKierto.VapaaKuvakulma) vain kuvaukseen.

## PT:N JONO (11.3x, sitova järjestys)
1) **ND v3h**: aukion sävy pelikuvassa oikean ilmakuvan mukaiseksi viileäksi harmaaksi (oikea ~145/149/144; v3g pelissä 197/185/169 → tekstuuri
   ~112/116/116, KALIBROI mittaamalla pelikuvasta, ks. KESKEN 1). Vienti v3h + Eiffel v1c YHDESSÄ paketissa (pohja v6k6: ND v3h + eiffel v1c
   `_valmiit/eiffel-v1/glb` + leikkaukset mallit.jsoniin), v3g jää viemättä. Pari v3g | v3h | oikea PT:lle (arkit-nd3g.py-malli).
2) **Peking v1 peliin** (KESKEN 2), pari PT:lle.
3) **ISS-kupolan koe 73661e440** (KESKEN 3): Ultra_Renderer.asset- ja DefaultVolumeProfile.asset-muutokset läpi ennen käännöspyyntöä.
Worktreet: laivat171 ja talvi poistettu 11.3x (Postivahti); skriptit osoittavat nyt `wt/proto-linssiseppa2-muisti/tyokalut` (sama omat_mallit_ktx2.py).

## KESKEN (PT 11.1x järjestys: 1 parvis, 2 Peking, 3 ISS-kupola)
1. **ND-parvis v3g VALMIS PT:llä** (356d4e33e: nd-parvis-v3g.jpg, nd-ylha-oikea-vs-peli.jpg). Juurisyy sauma = 300 m:n aineisto; Karttasepän
   440 m:n aineisto `_tyo/karttaseppa/notre-dame-440/`, ketju `_valmiit/notre-dame-v1/aja_v3g.zsh` (ND_DATA/ND_N). Korjattu vanha UV-venymä
   (maa.py: rajat neliöksi; v2–v6k6 venyi 16 %). Paketti `_tyo/linssiseppa2/nd3/v6k7` (= v6k6 + ND v3g + leikkaus 127 p.), portti 0.
   AVOIN: parvis pelissä 197/185/169 vs oikea 145/149/144 → ehdotettu v3h: `python3 -I lahde/parvis_v9.py 112,116,116 0.7 maa_v9c.jpg`
   (ND_DATA+ND_N env kuten aja_v3g.zsh, EI Blenderiä) + aja_tekseli (MAA_V8=maa_v9c.jpg, tekoaly-v3h) + nd3k-paketti POHJA=nd3/v6k6 +
   leikkaus mallit.jsoniin (ks. aja_v3g / v6k7) + simuvuoro (`vuoro-nd3g.sh`-malli, KULMAT=nd3g) + arkki. PT päättää viennin (v6k7 vai v3h).
   Vanha vino versio nd3/v6k7-vino ja lokit/...-nd3g-vino: älä käytä. v3f:n lähteet notre-dame-v1/varmuus-v3f/.
2. **PEKING v1 peliin** (omistajan poikkeus "koekaupunki Peking", Raamattu ad5d1e48d): LR:n 24 laattaa `_tyo/linnanrakentaja/peking/glb/`
   + laatat.json (origo, korkeus 37,9, leikkaus; portti 0) ja Karttasepän `_tyo/karttaseppa/peking-20261010/ls2/` (LUEMINUT: pohjakuva 1 m,
   vesiverkko, kadut, yövalot, maa 4 m; vesiväri ~12.15) kaupunkitilaan. Ensimmäinen pari (Peking | Google-kaupunki samalla kellonajalla ja
   kulmalla) PT:lle, EI omistajalle (LR tekee v2:ta). Selvitä ensin, miten kaupunkitila ottaa uuden kaupungin (CesiumOmatMallit/mallit.json,
   vesi-indeksi, kadut/yövalot-muoto kuten Pariisi/Tukholma) ja tarvitaanko koodimuutos (6.7-haara + PT:n kuittaus).
3. **ISS-kupolan 3D-koe**: Opus-agentti valmis, haara `linssiseppa2/cupola3d-koe` **73661e440** (juna-176:n päällä; unity 0, L 1306, K 453, P 449;
   EI vielä laitteella). Uudet: Ydin/Iss/CupolaGeometria.cs (~2,6 k kolmiota), Unity/CupolaTila.cs, Resources/Cupola/*.mat, CupolaSyvyys.shader,
   testit. RISKIT ennen käännöspyyntöä (käy diff läpi!): agentti lisäsi SSR- ja Surface Cache GI -ominaisuudet Ultra_Renderer.assetiin AKTIIVISINA
   (strippaus) ja muutti Assets/Settings/DefaultVolumeProfile.asset (SSR mode Disabled, GI enabled 0) → vaikuttaa kaikkiin buildeihin; GI-
   ominaisuus kytketään koodissa pois käynnistyksessä (muuten "zero GI" -passi nollaa Lit-ambientin). GI kirjaa kaikki MeshRendererit (myös
   Cesium) vaikka maailmaan pääsee vain kerros 12 → CPU-kuorma. Overlay-kentän leveys automaattinen (cupola-kentta). A/B: `astro kyyti cupola
   tila` (takaisin `cupola uusi`), `cupola-gi 0|1`, `cupola-ssr 0|1`, `cupola-varjot 0|1`, `cupola-valo 1.0`, `cupola-silma 0.55`,
   `cupola-kentta auto|0|<°>`, `cupola-tila` (lokiin). Tulos PT:lle: pari (nykyinen / koe) + laiterivi (fps nyt 45, muisti) simu + iPad Pro 12.9.
4. Kaupungintalo v2 (LR 11.2x) `_valmiit/stadshuset-v1/tekoaly-v1-tekseli/` (lyhty + kruunut, epäsäännölliset ikkunat, tiili 112/58/48):
   PT:n mukaan Pekingin jälkeen; v6k5-paketti uusittava v2:lla (pohja nyt v6k6/v6k7), osoitin-176 odottaa.

## VALMISTA tänään (10.10. aamupäivä)
- Junaan 176 (Natiiviseppä, runko 57187899e): omaaurinko 97d2d7a71, pilvet 43b37f198, vesivari 3a0def9e7 (kerroin 1), vesi-v6 fc08ac3db,
  hoyrykone 20ce06552, vesi-v7 57187899e (index-v7, Karttasepän v7b ämpärissä). osoitin-176 2550c88a7 EI junassa (kaupungintalo v2 ensin).
- Omat mallit: v6k6 = v6k4 + ND v3f VIETY, uusin-4 → v6k6 (Julkaisija 10.5x). v6k5 (kaupungintalo v1) EI vientiin: v1 huonompi kuin Google
  146 m:ssä (lyhty puuttuu, vaakatanko, ikkunaruudukko, oranssi tiili) → LR tekee v2 Pekingin jälkeen; kaupungintalo omistajalle vasta v2:lla.
- Préfecture v1b kelpaa (PT). Vesi v7b valittu. Arkit `docs/raportit/kaappaukset/linssiseppa2-176-20261010/` (6bc3f2615, 7a6ed0804).
- Googlen 3D maailmalla: `docs/raportit/google-3d-maailma-20261010.md` (d0109bbf1; HYVÄ 38 / RAJA 50 / POIS 50); työkalu
  `_tyo/linssiseppa2/google3d-maailma/` (mittaa.py + reunat.mjs: lehden glb:n mediaanireuna, TARKKA ≤ 1,7 m, KESKI ≤ 5 m).

## Aloitusviesti
```
Olet Linssiseppä 2 (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-linssiseppa2-luovutus-20261010-paiva.md
(haara linssiseppa2-tyo-20260928). KESKEN-järjestys: PT:n päätös v3h/vienti, Peking (KESKEN 2), ISS-kupola (KESKEN 3).
Viestit PT:lle vain valmis erä, jumi tai kysymys, ≤ 8 riviä.
```
