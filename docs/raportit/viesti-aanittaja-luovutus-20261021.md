# Äänittäjän luovutus 21.10.2026 (viikkoraja 78 %, tilinvaihto)

**Tila: levossa, ei avoimia ajoja eikä lupia.** Työ pushattu (haara aanittaja-tyo-20261011); mediat ämpärissä / `proto-3d/_valmiit`, ei gitissä. Edellinen luovutus: `viesti-aanittaja-luovutus-20261020-1752.md`.

## Tehty 21.10.
- **Yöjono (PT 7.46):** 19/22 tehty; raportit `docs/raportit/aanittaja-yo-*.md`, `tools/aanipankki/YHTEENVETO.md`. Jäljellä vain ulkoiset: manifestit↔ämpäri (natiivi, PK:n polut), käännösäänen mittaus (PK:n tallenne).
- **Askeleet:** `taidemuseo-askeleet-v7` (parketti, marmori v2b-korjattu, kivi_hiekka, sora −34 LUFS), LS kytkenyt. **Saliäänet** `taidemuseo-saliaanet-v1` (5 hälinäluokkaa + 3 Aalto-kaikuvastetta), LS kytkenyt.
- **Juoksupeli:** huudot 05/06 + pidemmät, rikkoutumishuudot (`puyi-rikkoutuminen-v1`, 03/06 uusittu → **v4** pelissä), `aanet-v4` (metalli/portti/viitta), `v5` (seinä, omena, eunukin "Ai!"), `v6` (vesiastia), **`aanet-v7`** (5.27-korjaus: valmiit Soundly/Sonniss-tiedostot; PK kytkenyt 68c804de2). Liuku (`liuku-kivi-raahaus/-tyonto`).
- **Dokumentit:** studiojaon ääni A (`docs/tuotanto/suunta/aani.md`) ja B (`tekotavat/aani.md`) mergattu (#5155, sis. omistajan suunta 18.12: William kaikessa, isoisä oma ääni; Pulu hahmona omalla äänellään); #5150 suljettu.

## Auki
- **Hiljaiset junassa 209 (sallittu):** `seina-kosketus`, `omena-osuma`, `vesiastia-kumahdus` (v5/v6:n versiot eivät soi). Paikallinen Soundly-NAS (1 166) ja Sonniss (≈3 200 purettua) eivät sisällä sokko-Geminin hyväksymää valmista yksittäistä ääntä → **Soundly-pilvihaku, kun Mac vapaa** (yöllä / ei koko ruudun Spacea; GUI-työkalut `proto-3d/_tyo/soundly-erat/`), polut PK:lle (junaan 210).
- **ElevenLabs-tehosteet korvattaviksi (omistaja 19.45, D2):** `kohahdus` (vuodenvaihdos, `tools/generoi-tehosteet.mjs`) ja juoksupelin `kaanto-eleven-1…4` → Soundly/Sonniss-haku; PK vahvistaa, ovatko kaanto-eleven rungossa.
- **Posliini 2/5** (PK vaihtelee sävelkorkeutta), pilvihaku myöhemmin. **Tason 2 musiikki:** omistaja 18.02 "ei lisää musiikkia", ei Lyria-kutsuja; `juoksupeli/taso2-ehdokkaat/` (CC0-näytteet) käyttämättä.
- **Mac-vapaa-ajot (ei luvanvaraisia):** Soundly-pilvihaku yllä; manifestit↔ämpäri-vertailu (PK:n polut).

## Opit (myös tekotavat/aani.md)
- 5.27: Soundly/Sonniss ensin; Freesoundia vain alkuperäisenä; ei koneleikattuja paloja eikä esikuuntelu-mp3:ia; sokko-Gemini (lyhyet äänet 3× arviointikopiossa); sorinaäänimaisemille sallittu sorina/hennot askeleet.
- ElevenLabs-tagit: `[shouting]` iloisen alun jälkeen → ylimääräinen "Aaa!"; `[rushed]` + `speed` 1,2 nopeuttaa.
- Vie-paketti ei ylikirjoita: korjaus uudelle polulle (`-v7`); radio-viritys `GetData`-virhe korjattu `MerkitsePakattu` (NS f5cd08ee0).
- Freesoundin koneen oma avain antaa 401 → haut `gh workflow run 326102787` (aanihaku) -kautta; Sonniss-haku `/Volumes/T7 4TB/sonniss/tyokalut/hae.py`, indeksi `proto-3d/_tyo/juoksupeli-aanet-v7-20261021/indeksi.json`.

## Tuotantotyökalut (ei gitissä)
`proto-3d/_tyo/`: `juoksupeli-aanet-v7-20261021`, `juoksupeli-korvaus-20261021`, `juoksupeli-tehosteet-20261021`, `juoksupeli-vesiastia-20261021`, `juoksupeli-puyi-rikkoutuminen-20261021`, `museo-aanimaisema-20261021`, `juoksupeli-taso2-musiikki-20261021`, `aanittaja-yo-20261021`.
