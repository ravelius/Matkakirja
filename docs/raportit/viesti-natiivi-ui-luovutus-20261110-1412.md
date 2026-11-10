# Natiivi-UI: luovutus 10.11.2026 klo 14.12 (kontekstivahti 26 %; korvaa -1319:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a.
Natiivin haarat natiivi-backup-remotessa; worktreet alla. Unity-tarkistus: `sh Peli-testit/unity-tarkistus.sh` worktreessa.
Edellinen (historia): `git show 782de8122:docs/raportit/viesti-natiivi-ui-luovutus-20261110-1319.md`.

## TEHTY TÄLLÄ VUOROLLA (ei toimia)
- PT:n jono 13.4x kokonaan: työlista siivottu; museon latausilmaisin 37eba712e PT OK → MR18 → linkki 224.28 (JU); nostomerkit valikon läpi
  = jo korjattu e059d4f62 (224.18), rivit tehty. Linkki 224.24 = 35271aade → aiheeton nähtävyys, Kaupungit-kohta, Kaikki klikattavat tehty.
- Huomio (ei NUI:n työ): `iso lataus tyhjenna` ei peru esilataajan ryhmiä iso-<sha>; ämpärin vaihto kesken hakujen → 60 s esto (museo-ilmaisin-2).

## 1. KAUPUNGIN NIMEN NAPAUTUS ZOOMAA (omistaja 10.34) — iPad-EHTO, MR PIDOSSA
- fb16ab5de natiivi-ui/kaupunkinimi-zoomaus (wt /Users/Shared/Claude/wt/proto-nui-nimizoom) = b6cf108aa + juna-224 633c4b973; merge-tree juna-224 puhdas.
- Mac-pari katsottu, PT OK, parit KK:lle: _tyo/natiivi-ui/kaupunkinimi-zoomaus-1-{pariisi,marseille}-ennen-jalkeen.png.
- KK + PT 14.1x EHTO ennen junaa: iso iPad, Marseille + toinen piirroksiton kaupunki. JU:lla: sk-kaupunkinimi-zoomaus-2-ipad
  → lokit/nui-kaupunkinimi-zoomaus-2-ipad-fb16ab5de (m-1, m-2 = Marseille perillä / +20 s; l-1, l-2 = Lyon). JU:lle sanottu: MR pidossa.
- Tee: katso kuvat; lähetä TÄYSIKOKOISET polut KK:lle ja PT:lle. Jos katuverkko näkyy → MR JU:lle, Uutta "Kaupungin nimen napautus vie
  kaupunkiin kortin sijaan." Jos pohja tyhjä/karkea laitteellakin → EI MR:ää; vaihtoehto KK:lle omistajan kortiksi (piirroksettomissa
  kaupungeissa kortti säilyy, tai zoomaus vain maan tasolle). Työlistan rivi "Kaupungin nimen napautus zoomaa kaupunkiin" (NUI, työn alla).

## 2. KUVAKYLTTI-KOE: TÄHTIEN VÄISTÖ (PT 14.0x) — MAC-AJO JU:LLA
- dce3d6ae0 natiivi-ui/kuvakyltti-tahdet (wt /Users/Shared/Claude/wt/proto-nui-tauko) = kuvakyltti-koe 153602c0f + juna-224 633c4b973 +
  NostotKartalla.Kohdelaatikot lisää ★:n (merkin lapsi pisteen yllä) worldBoundin karttanimien väistöön (1b:ssä "Temple" ja
  "Place de la Bastille" osuivat tähteen).
- JU: sk-kuvakyltti-2-mac → lokit/nui-kuvakyltti-2-mac-dce3d6ae0. Pari: ennen lokit/nui-kuvakyltti-1-mac-153602c0f 1b/2b/3b | jälkeen 1b/2b/3b
  (sama rajaus, täysikoko) → PT → KK. Koe: ei junaan ilman omistajan korttia (ui kohdenostot kuvakyltti 1, oletus pois).
- Huom. väistö toimii vain levossa; jos tähti yhä nimen päällä → tarkista, kutsutaanko Kohdelaatikot ennen kuin ★:n paikka asetetaan (AsetaNimio).

## JONO
Kohtien 1 ja 2 jälkeen: rivi PT:lle "JONO TYHJÄ: natiivi-ui" (`python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py
--kansio /Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo seuraava NUI`).

- JU 14.2x: nimizoom-2 iPad jonossa (laitekäännös ensin); iso iPad error 22 taas 14.08 alkaen (JU selvittää) → viive mahdollinen. Kuvakyltti-2 Mac ajossa.
- 14.2x: kuvakyltti-2 dce3d6ae0 katsottu: EI vaikutusta. Näkyvä ★ = PiirrosKerroksen 3D-tähti (Tahti3DNimi), ei UI-★; "Temple"/"Place de la Bastille" = piirroskartan nimet (eivät väisty). Pari _tyo/natiivi-ui/kuvakyltti-2-tahdet-1b-ennen-jalkeen.png PT:lle, kysytty KK:lta mitä "tähdet väistöön" tarkoittaa. dce3d6ae0 ei haitallinen, mutta ei tarpeen ennen tulkintaa. JU: iso iPad tauolla (error 22), nimizoom-2 käännös valmiina.
