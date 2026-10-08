# Volumetric Lights 2 (URP) — lähde ja käyttöehdot

- **Lähde:** Unity Asset Store, Kronnect, Volumetric Lights 2 (bundlen URP-osa `VolumetricLights_URP.unitypackage`).
- **Lisenssi:** Standard Unity Asset Store EULA. **Ei jakelua**: lähdekoodia ja assetteja ei saa julkaista eikä jakaa.
- **Hankinta:** omistaja hankki 7.10.2026 (PÄÄTOIMITTAJA 7.10. 20.3x: "kynttilät, soihdut ja kuunsäteet linnaan, valoefekti
  kytkettävissä pois laatutasolla"). Alkuperäinen tiedosto `~/Library/Unity/Asset Store-5.x/Kronnect/Shaders/Volumetric Lights 2.unitypackage`,
  53 806 723 t, sha256 `83ea3077b6b201611451d4153f638bac66ac72a806511f05096bee8d0da793bc`.
- **Kopio:** `_lahteet/unity-paketit-siirtoseppa/Volumetric Lights 2.unitypackage` (Siirtoseppä 7.10.2026).
- **Tuonti:** Siirtoseppä 7.10.2026 ilman Unityä (unitypackagen GUID-kansiot → polut, .metat sellaisinaan): `Assets/VolumetricLights`
  ilman `Demos`-kansiota (Temple, Church, Minimal, URP Pipeline Settings) ja ilman Builtin-osaa.
- **Käyttöönotto (erikseen):** URP-rendererin VolumetricLightsRenderFeature dioraaman kameran rendereriin ja kytkin laatutasolle.

## Säilytysehdot (kuten COZY ja Stylized Water 3, Päätoimittaja 5.10.2026)

1. Paketti säilytetään vain yksityisessä proto-gitissä (ravelius/Matkakirja-natiivi, PRIVATE) ja lähdekansiossa.
2. Paketti ei koskaan päädy julkiseen web-repoon (ravelius/Matkakirja) eikä ämpäriin lähdemuodossa; käännetyssä appissa sallittu.
3. **Jos proto-repon näkyvyyttä muutetaan julkiseksi, tuotu paketti poistetaan ensin, myös historiasta.**
4. Demot ja esimerkkikohtaukset eivät tule repoon.

## Paikalliset muutokset

- Unity 6:n API-päivitys tehty käsin (ei editorin API Updateria eräajossa): `LightType.Area` → `LightType.Rectangle`
  (VolumetricLight.cs, .Mesh.cs, .Particles.cs, .Shadows.cs). Muuten koodi sellaisenaan. Skriptit kääntyvät URP:n
  ajonaikaiseen assemblyyn `VolumetricLights.asmref`-viitteellä (pääsy URP:n sisäisiin kenttiin).
