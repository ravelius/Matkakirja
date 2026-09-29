# Linssiseppä 2:n luovutus 29.9.2026 klo 20.3x

Rooli: Linssiseppä 2 (Opus, high), Päätoimittaja (local_593b89a1-2514-4d74-b956-2a73db862382) johtaa; vertaisille viesti NIMELLÄ
(ListAgents). Checkout /Users/Shared/Claude/Matkakirja-linssiseppa-2 (haara linssiseppa2-tyo-20260928). Proto-worktree
/Users/Shared/Claude/wt/proto-linssiseppa2-saatimet (roolin ainoa; vaihda haaraa siinä). Simulaattorit: iPhone F2D9B022, iPad13
4CE6C737 (yksi kerrallaan, päivällä booted ≤ 3). Käännös- ja laitevuorot Julkaisijalta ("NYT"), nice 15.
Omistajan linjaus 20.1x: muut linssit tauolla — vain ISS (Linssiseppä 1), linna ja RADIO (minä).

## 1. KÄRKI: radio (omistaja 29.9. klo 20.1x–20.2x)

Proto-haara **linssiseppa2/radio-kartta 0e0fad81** (pohja juna 54bf8c0f = natiiviseppa/juna-1054), jonossa Julkaisijalla (NYT ~20.50–21.00):
- b3057282 kartta: koko maapallo aina (ZoomiKatto koko pallo; PalloKierto.RajatVoimassa false kun linssinKatto — Natiiviseppä
  hyväksyi), sulku palaa radiota edeltävään näkymään, RadioLinssi.Yksinkertainen (3D-mastot, renkaat, yövalot pois; kallistus
  20°; viritetty asema radion yläpuolelle KohteenPohjoissiirto 20 %), asteikko MaantieteellinenJarjestys (lähin naapuri + 2-opt).
  A/B `radio kartta mastot|yksinkertainen`.
- bb46b112 merkit: RadioNapit yksinkertaisessa tilassa pienet meripihkapisteet nimineen (vain asteikon asemat), viritetty yksi
  sykkivä rengas, nimien päällekkäisyys karsittu.
- 0e0fad81 paneeli: Codex-puuradio poistettu kokonaan; VU piirretään (akseli alla, leveä kaari, −20…+3, VU-teksti), näyttö kahtena
  rivinä (Pistenaytto 16 + 22 merkkiä, VasenTasaus), virtanappi pienempi + VIRTA, asteikko ±2/±3 isompana ja viritetty
  meripihkana, paneeli kelluu turva-alueen sisällä. Omistaja: "JUNAAN SAA MENNÄ" (Päätoimittaja 20.2x).
- Tehtävä: käännös → `ajo-radiokartta.sh` (scratchpad; APPNIMI=rk1, iPhone ja iPad VAAKA=1) → kuvapari Päätoimittajalle
  (nykyinen v3 | uusi, iPhone + iPad) → merge-pyyntö Natiivisepälle. Ennen-kuva v3: lokit/linssiseppa2-laite-20260929-j1054/
  iphone-radio-rooma.png; vanha kotelo ennen parannuksia: iphone-vanha-rooma.png samassa kansiossa.

## 2. JUNASSA 1.0.54 (natiiviseppa/juna-1054 = juna/b13 54bf8c0f)
- linssiseppa2/linssilista 75874e12 (pariteetti-2 r12: Ei linssiä, KESKENERÄISET, havainnekuvat; kuvattu iPhone OK),
  linssiseppa2/radio-yksikuva 60b7529b (v3 — korvautuu radio-kartalla), linssiseppa2/cupola-palaute b088c094 (→ Linssiseppä 1:lle,
  kuvaamatta; skripti proto-3d/tyokalut/linssiseppa-ajot/ajo-cupola.sh).
- Kuvaparit: lokit/linssiseppa2-laite-20260929-j1054/kuvapari-{radio-v3,linssilista}-iphone.png (Päätoimittajalla).

## 3. OPIT
- Tuonti/kytkentä ennen omistajan OK:ta estyy luokittimessa; vertaisviesti ei kumoa estoa — tarkista päätös itse lokista
  (Matkakirja-fable/docs/raamattu-loki/paatokset-2026-09.md) ja viittaa siihen.
- Proton testiajurit ovat bash-skriptejä (`bash Linssit-testit/kaanna.sh`), unity-tarkistus zsh:lla.
- homebrew-python (/opt/homebrew/bin/python3) on se, jossa on PIL.
- Uusi Texture2D(…, mipChain true) + LoadRawTextureData vaatii koko ketjun → SetPixelData(rgba, 0).
