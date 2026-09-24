# 3D-laajennuksen selvitys — tehtävänanto (Fable 23.9.2026 klo 09.50)

Omistajan suunta (loki 23.9. klo 09.45): uusi natiivi iOS-peli rakennetaan nykyisen rinnalle
ilman webkuorta. Maapallo ensin; käveltävät 3D-kohtaukset (aikahyppy: Colosseum loistossaan,
Tutankhamonin hauta, pyramidien rakentaminen) pitkällä aikajänteellä; sisältö (tekstit, kuvat,
äänet) siirretään mekaanisesti kun uusi peli toimii; web säilyy omana rajapintanaan.
Apurahassa ei ole tarkkoja lupauksia, vain "3D-maailmat, joissa pelaaja voi kävellä".

## Kysymys
Mikä moottori toteuttaa yhdessä ja ilman uudelleenlatauksia: 1) pergamenttityylisen karttapallon
(nykyinen ulkoasu, laatat ämpäristä), 2) Google Earth -tyyliset kallistetut ja fotorealistiset
näkymät, 3) rajatut käveltävät 3D-maisemat? iOS ensin; Android/web toissijaisia.

## Vertailtavat
- Unity + Cesium for Unity (3D Tiles, Google Photorealistic 3D Tiles, additiiviset näkymät, C#)
- Unreal + Cesium for Unreal (kuvanlaatu, Blueprint/C++, koko ja rakennusajat iOS:lle)
- Godot 4 (kevyt, ei virallista Cesiumia; oma laattamoottori?)
- Applen omat: RealityKit/SceneKit + MapKit (3D flyover) — mitä saa ilmaiseksi, mitä ei voi tyylittää
- Vertailukohtana nykyinen web (three.js/globe.gl, WebGPU Safari 26)

## Arvioitavat asiat (jokaiselle)
1. Maapallo: 3D-laatat, oma pergamenttityyli (laatat ämpäristä + shaderit), nimiöt ja symbolit,
   kallistus ja orbit, suorituskyky iPhone 13–16 / iPad.
2. Siirtymä maapallosta kävelynäkymään ja takaisin ilman latausruutua (streaming, additiiviset
   näkymät, muistiraja iOS:llä).
3. Sisällön siirtoputki: js/packs-datan (lehdet, nostot, kohtaamiset, äänet, kuvat) muunnos
   moottorin dataksi; mikä on mekaanista, mikä ei (UI-näkymät, Livia-chat, tallennus).
4. Hybridi välivaiheena: natiivi maapallo + nykyiset web-näkymät kuoressa (WKWebView-overlay),
   vai puhdas natiivi alusta asti — hyödyt ja riskit.
5. Lisenssit ja maksut: Unity/Unreal-ehdot 2026, Cesium ion, Google 3D Tiles -käyttömaksut,
   App Store.
6. Työkalut tekoälysessioille: kuinka hyvin Opus/Codex tuottavat ja testaavat C#/Unity-,
   C++/Blueprint- ja Swift-koodia; headless-testaus ja CI Macilla.
7. Aikataulu- ja kustannusarvio: prototyyppi (pergamenttipallo + yksi kävelykohtaus),
   rinnakkaisversio joka korvaa nykyisen, ylläpito kahden pelin aikana.

## Tulos
- docs/raportit/3d-selvitys-20260923.md: vertailutaulukko, suositus perusteluineen,
  prototyyppisuunnitelma (2–4 viikkoa), riskit.
- Fablelle 8 riviä; omistajalle päätöskortti Fablen kautta. Ei koodia tässä vaiheessa.
- Lähteet linkkeinä; väitteet, joita ei voi todentaa, merkitään epävarmoiksi.
