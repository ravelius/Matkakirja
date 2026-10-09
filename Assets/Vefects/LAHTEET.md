# Candle VFX - URP (Vefects) — lähde ja käyttöehdot

- **Lähde:** Unity Asset Store, Vefects, Candle VFX - URP (Particle Systems / Fire).
- **Lisenssi:** Standard Unity Asset Store EULA. **Ei jakelua**: assetteja ei saa julkaista eikä jakaa.
- **Hankinta:** omistaja hankki 7.10.2026 (PÄÄTOIMITTAJA 7.10. 20.3x: kynttilät ja soihdut linnaan). Alkuperäinen tiedosto
  `~/Library/Unity/Asset Store-5.x/Vefects/Particle SystemsFire/Candle VFX - URP.unitypackage`, 40 944 484 t, sha256 `485fc23232c73de4d67906b00d488301ab4a8d73faede57cc267bdf5f61b6528`.
- **Kopio:** `_lahteet/unity-paketit-siirtoseppa/Candle VFX - URP.unitypackage` (Siirtoseppä 7.10.2026).
- **Tuonti:** Siirtoseppä 7.10.2026 ilman Unityä: `Assets/Vefects/Candle VFX URP` ilman `Demo`-kansiota ja `_ Extra/Scenes`-kohtausta.
  Paketin ääniklipit (Audio) tuotu; pelin äänet tulevat seikkailun omista manifesteista. Yhtä klippiä on muokattu (ks. Muutokset 8.10.).

## Säilytysehdot (kuten COZY ja Stylized Water 3, Päätoimittaja 5.10.2026)

1. Paketti säilytetään vain yksityisessä proto-gitissä (ravelius/Matkakirja-natiivi, PRIVATE) ja lähdekansiossa.
2. Paketti ei koskaan päädy julkiseen web-repoon (ravelius/Matkakirja) eikä ämpäriin lähdemuodossa; käännetyssä appissa sallittu.
3. **Jos proto-repon näkyvyyttä muutetaan julkiseksi, tuotu paketti poistetaan ensin, myös historiasta.**
4. Demot ja esimerkkikohtaukset eivät tule repoon.

## Muutokset (Siirtoseppä 8.10.2026)

- URP 17 (Unity 6.1+): vanhentunut `_FORWARD_PLUS` / `USE_FORWARD_PLUS` / `FORWARD_PLUS_SUBTRACTIVE_LIGHT_CHECK` korvattu nimillä `_CLUSTER_LIGHT_LOOP` / `USE_CLUSTER_LIGHT_LOOP` / `CLUSTER_LIGHT_LOOP_SUBTRACTIVE_LIGHT_CHECK` viidessä varjostimessa (Candle VFX URP: Wax, Wax_VC, Wick, Glass, Extra Grid), jotta vaha ja lasi saavat lisävalot Forward+-renderöijissä (Ultra, Mac PC_Renderer). Ei muita muutoksia.
- Ääni (Pelikoodari 8.10.2026, f059db199; laaduntarkistus docs/raportit/aanten-laatu-20261008.md osa 2): `Audio/SFX_Vefects_Candle_Crackling_Loop_01.wav`
  silmukan sauma naksahti (41 kertaa, +9,8 dB) → 0,2 s:n ristihäivytetty sauma (kesto 30,0 → 29,8 s), sama tiedostonimi ja .meta. Asset Store EULA
  sallii muokkauksen sovelluksen sisällä; muokattua klippiä ei jaeta erikseen (lisenssikatselmus #4255).
