# Pelikoodari: luovutus 28.10.2026 klo 00.51

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus: 03ede4fc3 (-20261028-0005, PR 5393).

## Haara
- Proto `pelikoodari/liikkeet-213` (wt /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211, paikallinen proto-git), pää 645084d33.
  Unity-tarkistus 0 virhettä, vahdit ok. EI JUNAAN ennen KK:n/omistajan arviota.
- Ketju tänä yönä: 05ed8f1c0 (v7) → a09bbeab2 (näkölinja rakennuksiin/pylväisiin) → 645084d33 (näkölinja ±1 m sivuille, lähemmäs 9/s).

## Tila
- v8 KK:lla 00.5x (KK tarkistaa ruutu ruudulta; jos puhdas ennen klo 07 → omistajalle, muuten v7-omistaja keskeneräisenä):
  _tyo/pelikoodari/parkour-20261027/parkourvideo9-645084d33.mp4 (koko 29,1 s) ja parkourvideo9-omistaja-645084d33.mp4 (18,0 s).
  Ajo aja-parkour11.zsh + simu-parkour2.txt. Sonnetin väläyshaku: täysruudun väläyksiä 0; jäljellä kameran 0,2 s sivuvetäisy
  27,9 s, käärön repeäminen 24,5 s (pelin efekti), penkki valkoinen (marmori tilattu 004c90cc6).
- Koereitin kamera (sokkelo 0, vain QA, JuoksuV4Maailma): ParkourKamera 4,8/3,2 m, KoristeetYlos (liukuesteet +3,2 m),
  PiilotaKameranTielta (häivytys 0,35 s, vara 2 m vaaka / 0,4 m pysty), NakolinjanOsuma (kolmiot maailma-kehyksessä, välimuisti
  MeshFilter-määrän mukaan; Sivut3 ±1 m). Sokkelon kameroihin ei vaikuta.
- Codex-posti: kivet 2D c56b5c011 kuitattu 31433f5aa → LR kokoaa; katot/friisit/rappaus 2258b56d1 + mitat 7eb80206c; marmoripenkki
  004c90cc6 (vastaanotto PK → esteet-v2 hyppy-penkki ämpäriin JU:lla).

## Seuraavaksi
1. KK:n vastaus v8:sta → tarvittaessa 27,9 s sivuvetäisy (NakoLahemmas / Sivut3) → merge-pyyntö liikkeet-213 junaan (liiketiedostot
   ämpäriin JU:lla, LiikkeetPerus/Viitta-oletus) KK:n/omistajan hyväksynnän jälkeen.
2. Marmoripenkki Codexilta → uusi video.
3. Edellisen listan työt: kaavun morfi (robe v2 weights), run_upstairs, jump_down (PT).

## Opit
- Koereitin drone laskee porteissa 2,2 m:iin (loki "drone laskeutuu oviaukkoon"); näkölinjaloki "näkölinja esteessä".
- Liikevahti vaatii "// liikepoikkeus:" myös tavoitearvon Lerpille; paikalliset nimet (rinta, dv, kohde, o) ovat jo käytössä
  kamerametodissa → etuliite n.
