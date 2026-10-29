# Natiivi-UI: luovutus 27.10.2026 klo 12.20

Rooli Natiivi-UI (Opus). Konteksti 30 % → luovutus luontevalla tauolla. Ei keskeneräisiä muokkauksia.

## Valmiit tänään (kaikki ilmoitettu)
- Kohdekorttipohja a/c/d (vierityksen vihje, ☰ luentaryhmänä, Näytä vähemmän; KK 00.1x) → proto 27e7d7aca, juna 212:ssa.
- UI-pohja OHJAINOPETUS (peukalokohta, pyyhkäisyosoitin, ohjeteksti 32 pt; OMISTAJAN PÄÄTÖS 10.05, PT hyväksyi): pelirepo PR 5303
  (mergetty), proto a93fdd900 (PK yhdisti haaraansa pelikoodari/juoksu-taso1-212), natiivin tyylikirjakopio a6d82fd1b NS:llä junaan 212.
- Noston sulku (OMISTAJAN PÄÄTÖS 11.25, Raamattu 4.12): suljettu nosto katoaa, ellei pin ole päällä → proto 5eeed4ea6, juna 212:ssa.
  Webissä ei nostojen pin-/Auto-sulkua, ei muutettavaa.
- Havainneparit KK:lle: v68 (havainne-editori-20261027-065143), v70 (-094332), v72m vertailuvalossa (-121714, EROLISTA-numerot).

## Havainneparit: miten jatketaan
- OMISTAJAN PÄÄTÖS 10.56: valo pois, ensin rakennukset havainteen mukaisiksi → parit VS:n vertailuvalossa, parin alle vain muoto- ja
  pintaerot LR:n listan numeroilla (proto-3d/_tyo/linnanrakentaja/havainne-kuja40/EROLISTA-20261027.md).
- Ajo: `zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/havainne-valo/aja-parit.zsh <juuri-kansio> 01 02 05` (linja 2;
  REF natiivi-ui/havainne-valo-kamera e64b5720d = VS 1b3847a02 + PK:n kamerakorjaus 3330b136d). Tulostaa kamerakulmat ja PARIT VALMIS.
- Kohdat 04 ja 05 vaativat kamerakorjauksen 3330b136d (juna 212); juna 211:llä ja seinat-211:llä kamera osoittaa lattiaan.
  Kun VS:n vertailuvalo on junassa 212, REF voi olla suoraan juna-212.

## Odottaa
- Seuraavat kujaparit, kun LR ilmoittaa uuden juuren (LR → NUI → KK).
- Nimitekstin uusinta (4 kuvaa), kun PT ilmoittaa rungon; saapumisintron kuvat, kun Codexin kuvat ja päätös tulevat.

## Siivottavat worktreet (proto, kun haarat junassa)
wt/proto-natiivi-ui-kohdekortti, -nosto-sulku, -tyylikirja-212, -ohjainopetus, -latauspalkki-vaaka (kaikki junassa tai PK:lla).
Pelirepo: wt/natiivi-ui-ohjainopetus-pohja (PR 5303 mergetty).
