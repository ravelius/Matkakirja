# Merge-pyyntö: natiivi-ui/radio-sulku 85539c2 (juna/b12:n päällä), Natiivi-UI 25.9.2026

Testit: unity-tarkistus 0 virhettä. Testikäännös 01:47 (juna/b12 + kirjainvali + nostot-50 + radio-sulku, FB234D08).

## 1. Radiopaneelin sulku 0,8 s (Fablen tehtävä, Linssisepän kierroksen löytö)
Radiosuunnitelma 24.9. luku 6: sulku on avauksen käänteinen, 0,8 s Pehmeällä käyrällä (smootherstep).
Aiemmin Kytke(null) kutsui Sido(null), joka tyhjensi sisällön heti, ja piilotus oli 0,18 s:n häivytys, joten paneeli
katosi yhdessä kehyksessä. Nyt paneeli liukuu alas oman korkeutensa verran, häivyttää viimeisen 40 %:n aikana, ja
sidonta puretaan liu'un lopussa. Avaus ei muutu (web 0,18 s + 12 px).
- Todennus: radio-sulku/sulku.mp4 ja natiivi-b12r-radio-sulku-kehykset.jpg (10 fps, kehykset 4–12). Paneeli laskee
  ja hämärä väistyy samassa tahdissa.

## 2. iPhonen pistekerroin (Pelikoodarin mittaus)
PikseliaPisteessa laski iPhonella iPadin kaavalla dpi / 132, mikä antoi iPhone 17 Pro -simulaattorissa (A2FD9C9F)
kertoimen ×2 ja paneelin 603 × 1311. Nyt iPhonella lyhyt sivu ≥ 1000 px on @3x ja muuten @2x, ja iPad pitää kaavan
dpi / 132. FB234D08: "piste ×3, paneeli 402 × 874". Pelikoodari todentaa A2FD9C9F:n.
Tämä korjaa 042f361:n (junassa), joten mergeä ennen seuraavaa TestFlight-buildia.
