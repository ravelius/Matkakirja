# Final IK (RootMotion) — lähde ja lisenssi

- Paketti: Final IK 2.5, RootMotion (Partel Lang), Unity Asset Store. Omistaja osti 5.10.2026, ladattu koodaus-tunnuksen
  Unitystä (~/Library/Unity/Asset Store-5.x/RootMotion/Editor ExtensionsAnimation/Final IK.unitypackage, sha256 d764ea0ff2a7c379…).
  Kopio: proto-3d/_lahteet/unity-paketit-siirtoseppa/Final IK.unitypackage.
- Lisenssi: Unity Asset Store EULA (Standard Unity Asset Store EULA, per-seat). Lähdekoodi saa olla VAIN yksityisessä
  proto-gitissä ja käännetyssä sovelluksessa. EI julkiseen repoon, ei ämpäriin, ei jaettavaksi. Jos repo muuttuu julkiseksi,
  tämä kansio poistetaan ensin (sama ehto kuin Stylized Water 3:lla).
- Mukana vain ajonaikaiset kansiot (FinalIK ilman _DEMOS/_Integration-kansioita, Shared Scripts, Editor). Pois: Shared Demo
  Assets, _DEMOS, _Integration, Baker, käyttöohjeet (pdf/rtf).
- Käyttö: DioraamaHahmot3D.IK.cs (FBBIK + GrounderFBBIK, päivitys käsin oman DioraamaSekoittimen jälkeen).
- Käännöstarkistus (Peli-testit/unity-tarkistus.sh) tarvitsee esikäännetyn RootMotion.FinalIK.dll:n
  MATKAKIRJA_KIRJASTOT-kansiossa (_lahteet/unity-paketit-siirtoseppa/kirjastot); Unity kääntää Plugins-kansion itse.
