# Pelikoodarin luovutus 17.10.2026 klo 22.10 (KOVA RAJA 35 %, Postivahti + PT)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>; proto-gitillä EI ole originia). Edellinen luovutus -20261017-2105 (2b8546b9d).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md):
  PT local_5df52e10-…, JU local_5cb16c00-…, LR local_996d60ab-…, NS local_674b9ec4-…, Postivahti local_a24c43c0-….
- Skenaariot /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-*.txt. KATSO JOKAINEN KUVA TÄYSIKOKOISENA ennen lähettämistä (PT/KK 21.5x).
- Kartan 3D-mallit näkyvät vasta kallistetulla kameralla (≥ 25°, Symbolimallit.KallistusRajaAste): `komento aja lat lon kaari s` katsoo
  ylhäältä → vain 2D-symbolit; perään `komento kallista 45`.

## ENSIN 1) UNITY-EDITORIESIKATSELUN KOKEILU (PT 22.0x, omistaja 22.02 "voiko kehitystä nopeuttaa"; arvio ≤ 8 riviä KK:lle local_dfa7296a-… + kopio PT:lle)
- Haara pelikoodari/esikatselu **fb05a4e3b** (worktree wt/proto-pelikoodari-esikatselu, pohja galleria-200 61d6b253c):
  Assets/Matkakirja/Editor/Esikatselu.cs (simun skenaariomuoto Play-tilassa batchmodessa: alku/peli/ui/komento/linssi → pelin omat
  komentotiedostot persistentDataPathissa, odota, oleta, kuva = pääkamera + UI-kerrokset UiRuutu.Testi-kokoon) + tyokalut/esikatselu.sh
  (botti-osat.sh:n malli: oma kopio Matkakirja-proto-esikatselu, Library L1-kopiosta APFS-kloonina kerran, L1-lukko, aikaraja 30 min).
  Ennakkotapaukset: Editor/BottiOsatAjo.cs (koko peli batch-Play-tilassa, Metal ilman ikkunaa) ja AsetteluTesti.cs (UI laitekokoon).
- EI VIELÄ AJETTU, ei käännetty Unityssä (tarkista.sh ei tarkista Editor-skriptejä). JU lupasi L1:n TF 200 -viennin jälkeen (~22.40,
  JU lähettää "NYT"). Aja: `cd /Users/Shared/Claude/wt/proto-pelikoodari-esikatselu; tyokalut/esikatselu.sh pelikoodari/esikatselu
  /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-esikatselu-galleria.txt` (taustalle; tulos proto-3d/lokit/esikatselu-<aika>/).
- Arvioon: aika (ensimmäinen kopio + tuonti vs. seuraavat ajot) vs. simuketju (luo 30 s + Unity-vienti 68 s + xcodebuild 294 s + asennus
  ja simu), kuvien vertailu simun arkki 4:n g-kuviin. Odotettavia eroja: Screen.width batchmodessa ≠ laitekoko (UiPx, mPerPt ja
  Karttaesineet-mitat lasketaan ruudusta, kuva RT:stä), editorin tekstuurimuodot (ASTC/BC), Metal-varjostinvariantit, suorituskyky ja lämpö
  eivät näy, simun napautukset eivät toimi (vain komennot). Puhelinkäännös + simu jää lopputarkistukseksi.

## 2) KARTAN 3D-ELEMENTIT ARKKI 4 → LR → PT (omistaja odottaa; EI junaan ennen omistajaa)
- Haara pelikoodari/galleria-200 **61d6b253c** (worktree wt/proto-pelikoodari-galleria): 73e093235 (arkki 3) + LS:n pyramidi 19b8aed54 +
  maavarjo 86ef197d2 + 0c1959013 (PT 21.5x: multiply-varjo Symbolimalli _SrcBlend/_DstBlend/_Kerto + SarjaVarjoMateriaali A/C/D, kartan
  muste #46331F, tasainen ydin reuna ≤ 30 %; koko näkyvän massan mukaan √siluetti = 0,75 × tavoite, katto 1,3 ×, Karttaesineet.Massa
  CPU-rasteri esiintymäkohtaisesti, vain A-polku – FBX-maamerkit ovat Read/Write pois → suurin mitta; nimilaput varjon alle MapInkillä) +
  LS:n magentakorjaus b6e54fcce/32d740b02. Kartta-testit 502/502 (KarttaesineSaantoTestit), tarkista.sh 0.
- JU ajaa simulla L2:lla (ennen esikatselua): sk-galleria-arkki4.txt = galleria g-nyt|g-yhtenainen + Pohjois-Ranska (48,6 N 0,8 E kaari 4)
  ja Etelä-Ranska (43,6 N 3,4 E kaari 3,5) kallistettuna 45°, nyt|yhtenäinen. ODOTA JU:n polku → katso täysikokoisena: pyramidi ei magenta,
  mallit 3D:nä, varjo näkyy tummalla pergamentilla, ohuet (Delfoi, Merkkikivi, Mylly, Vuori, Malbork) eivät enää puolet täyteläisistä,
  nimet varjon alla → LR (yhdistää PT:lle). Jos mallit yhä 2D:nä: kaari pienemmäksi (3 → 2) tai kallistus 55.
- Hylätyt ajot: arkki 3 r-kuvat (intro peitti, 2137), Ranska 4c5e0635 (magenta + ylhäältä = 2D-symbolit, 2158). Galleria 2137 LR:n mukaan kunnossa.

## Valmiit tässä sessiossa
- Cupola M1-suojaprofiili 0,8 (PT valitsi sarjasta 3): 6b0c876d0 (Lampo.NakymanSuoja → Lampopaatos.SuojaSkaala 0,8; laitteen oma kuumuus
  = 0,7), M1-mittaus 5 min 30 fps / GPU 25→29 ms / thermal 0 (lokit/cupola-kustannus4-ipad-20261017-2130/TULKINTA-pelikoodari.md);
  NS yhdisti junaan 200 (runko ed0654c54 vihreä), juna 200 lukitaan siitä.

## Worktreet
wt/proto-pelikoodari-galleria (arkki 4), wt/proto-pelikoodari-esikatselu (kokeilu), wt/proto-pelikoodari-cupola-suoja (junassa → poistettavissa
mergen varmistuttua), -tivoli-vapaa-lento-200 + wt/pelikoodari-vapaa-lento-osio (Tivoli tauolla), wt/pelikoodari-posti.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-2210.md (haara
pelikoodari-luovutus-20261014-paiva). ENSIN editoriesikatselun kokeilu fb05a4e3b JU:n NYT-vuorolla → arvio ≤ 8 riviä KK:lle + PT:lle;
sitten galleria arkki 4 (61d6b253c, JU:n simuajo) täysikokoisena tarkistettuna → LR."
