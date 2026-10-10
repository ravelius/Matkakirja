# Minimilaite: mitkä laitteet jaksavat Matkakirjan muistin (Natiiviseppä 10.10.2026, PT:n pyyntö 05.3x)

Pohjatieto omistajan myöhempää päätöstä varten. Mittaukset on tehty iPad Pro 13:lla (M1, 8 Gt, 00008103) Pariisissa junilla 173–174.
Pienempiä laitteita meillä ei ole, joten niiden rivit ovat arvioita (merkitty "arvio").

## 1. Pelin muisti nyt (iPad Pro 13, 2732×2048)

| Tila | Footprint | Lähde |
|---|---|---|
| Pohja ennen kaupunkia (pallo, kartta, UI) | 2,4 Gt | R22, junan 174 runko |
| Huippu Pariisin kierroksella (intro + 8 kohdetta) | 4,4–4,5 Gt | R20 / R22 |
| Jetsam-raja kehitysbundlella (ilman increased-memory-limitiä) | ~5,1 Gt | R1–R22 (footprint + vapaa) |
| Vapaana pienimmillään kierroksella | 0,64–0,75 Gt | portti 173 / 174 |

- TestFlight- ja App Store -käännöksissä on oikeus `com.apple.developer.kernel.increased-memory-limit` (Rakennus.MuistiOikeus), joka
  nostaa prosessin rajaa niillä laitteilla, joissa muistia on enemmän. Kehitysbundlessa sitä ei ole, joten portin luvut ovat
  varovaisia. Omistajan iPad Pro (iPad17,1) raportoi 6.10. rajaksi 5,36 Gt.
- Pohjasta noin 1,0 Gt on grafiikkaa. Junaan 175 tulee pienen muistin pallo-profiili (alle 12 Gt: MSAA 2×, SSAO pois, napakalotti
  2048²), arvio −0,2 Gt (haara natiiviseppa/pohja-175).
- Pienemmällä näytöllä renderöintipinnat pienenevät suhteessa pikselimäärään (iPhone/iPad 11" noin puolet 13":n pinnoista).
  Cesium-laattojen määrä skaalautuu näyttökertoimella, joten muistin tarve ei puolitu.

## 2. iOS/iPadOS 17 -kohteen laitteet ja RAM

Proton kohde on iOS 17.0 (Rakennus.cs, ProjectSettings). Jetsam-raja on yleensä noin 50–65 % RAMista (arvio; increased-memory-limit
nostaa sitä).

| RAM | iPadit (iPadOS 17+) | iPhonet (iOS 17+) | Arvioitu raja | Mahtuuko nykyinen peli? |
|---|---|---|---|---|
| 2 Gt | iPad 6 | – | ~1,0–1,3 Gt | Ei: pohja ei mahdu |
| 3 Gt | iPad 7, 8, 9; iPad mini 5; iPad Air 3 | iPhone XR, SE 2 | ~1,4–1,9 Gt | Ei: pohja 2,4 Gt (pienellä näytöllä ehkä ~1,6 Gt) |
| 4 Gt | iPad 10, mini 6, Air 4, Pro 10,5", Pro 12,9" 2. ja 3. sukupolvi, Pro 11" 1. sukupolvi | XS, 11, 11 Pro, 12, 12 mini, 13, 13 mini, SE 3 | ~2,0–2,6 Gt | Pallo ehkä, kaupunki ei |
| 6 Gt | Pro 11"/12,9" 2020 (4. suk.), iPad 11 (A16) | 12 Pro, 13 Pro, 14, 14 Pro, 15, 15 Plus | ~3,0–3,9 Gt | Pallo kyllä, kaupunki rajoilla (vaatii kevyemmän profiilin) |
| 8 Gt | Air M1/M2/M3, Pro M1/M2/M4 (perus), mini A17 Pro | 15 Pro, 16-sarja, 16e, 17 | ~5,1 Gt (mitattu) | Kyllä (portti 0,64–0,75 Gt) |
| 12–16 Gt | Pro M1/M2/M4/M5 (1–2 Tt), Pro M5 | 17 Pro | > 6 Gt | Kyllä, täysi laatu |

RAM-määrät ovat Applen julkaisemattomia, laitepurkuihin perustuvia yleisesti tunnettuja lukuja. Tarkista ennen päätöstä.

## 3. Vaihtoehdot

1. **UIRequiredDeviceCapabilities**: App Store ei tarjoa RAM-rajaa. Lähin vaihtoehto on `iphone-ipad-minimum-performance-a12`
   (A12 tai uudempi). Se poistaa vain iPad 6:n ja 7:n, Pro 10,5":n ja 12,9" 2. sukupolven, joten 3–4 Gt:n laitteet (XR, iPad 8 ja 9)
   jäävät tuetuiksi. Ei riitä yksin.
2. **iOS-minimin nosto**: iOS 18 poistaa vain iPad 6:n ja vanhimmat Prot. iOS 26 poistaa myös XS:n, XR:n ja iPad 7:n. 3–4 Gt:n laitteita
   (iPad 8–10, iPhone 11–13) jää silti tuetuiksi, eikä tämäkään ratkaise muistia yksin, ja nosto rajaa pelaajia.
3. **Porrastettu pienen muistin profiili (suositus)** ajonaikaisesti `SystemInfo.systemMemorySize`-rajalla:
   - alle 12 Gt (nykyinen): kuten junat 173–175;
   - alle 6 Gt (uusi): pallo renderScale ~0,8, kaupungissa ei omia malleja eikä introa, kerroin karkeampi, välimuisti 32 Mt;
   - alle 4 Gt (uusi): 3D-kaupunkinäkymä pois (kuvanosto/kortit tilalle) ja linnassa kevyin LOD. Laitteen ilmoitus ei ole UI-pohjilla
     → vain jos omistaja haluaa tukea näitä.
   Ehto: mittaus oikealla 4 Gt:n ja 6 Gt:n laitteella (meillä ei ole; TestFlight-testaajan laite tai hankinta). Simulaattori ei
   näe jetsamia.
4. **App Storen kuvaus ja tuki**: kerrotaan suositeltu laite (iPhone 15 Pro / iPad M1 tai uudempi), jos alempaa tukea ei mitata.

## Suositus

Lyhyellä aikavälillä 3 (porrastettu profiili, alle 6 Gt) ja 4 (suosituslaite kuvaukseen). Minimin nosto (2) vasta, jos 3–4 Gt:n
laitteiden tuki todetaan liian kalliiksi. Päätös omistajalle, kun yksi 4–6 Gt:n laite on mitattu.
