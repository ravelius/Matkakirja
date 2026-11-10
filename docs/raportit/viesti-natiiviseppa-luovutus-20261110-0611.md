# Natiivisepän luovutus 10.11.2026 klo 06.11

Edellinen: git show d6a268b06:docs/raportit/viesti-natiiviseppa-luovutus-20261110-0510.md (tausta: TOP 10, VS-viestit). Syy: kontekstivahti 26 % (7.37).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/iso/. Repo natiivi-backup (remote-nimi natiivi-backup, EI origin), worktree
/Users/Shared/Claude/wt/proto-natiiviseppa-ndpohjat, nyt haarassa natiiviseppa/kartan-purku. Älä poista mitään.

## TEHTY TÄSSÄ ISTUNNOSSA
- PT:n tilaus 05.0x → natiiviseppa/kartan-purku 857fe63da (viety natiivi-backupiin), unity-tarkistus 0 virhettä, testi EI junaan:
  aa277a430 KartanPurku (Kartta/KartanPurku.cs; omistajat "kaupunki" CesiumKaupunki.Avaa/Sulje ja "iss" AstronauttiSovitin.Avaa/Sulje):
  talot, nähtävyysalueet, piirroslaatat, elävän kerroksen kuvat, kalotit pois; pallon tileset enabled=false VAIN kaupungissa. QA `kartta purku …`.
  857fe63da yövalot: muoto oli R8+mipit (EI RGBA32); natiivi MatkakirjaKuvat_PuraAstcHarmaa (MatkakirjaPurku.mm) + Yokuori.HaeValot:
  ASTC 4×4 taustasäikeessä, ei LoadImage/GetPixels32-väliä (4096² ~144 Mt, 8192² ~576 Mt). 8×8 sumentaa (Mac-koe) → vain `astro kyyti valolohko 8`.
  Raportti: _tyo/natiiviseppa/iso/raportti-kartan-purku.md.
- A/B-vastaukset PT:lle lähetetty: Cesium-VIKA (223 4080/huippu 4312 | 224 4081/4205) ja ISS-VIKA (223 4106/4468 | 224 4134/4247) olivat jo 223:ssa
  → ei uusi TF-este; Tekninen kunto -työ.
- cesium-google-ipad d7a8cdc19: VIKA ennen kuvaa. PT 05.3x: Google lisätty LD-ajoon (erillinen LF peruttu).

## ODOTTAA (JU:n jono, iso iPad)
1. LD kartan-purku-ipad 857fe63da, sk-kartan-purku-ipad.txt (google 1 alussa), kuvat P0–P4 → lokit/natiiviseppa-kartan-purku-ipad-857fe63da
   (tai lokit/kartan-purku-ipad-857fe63da). TARKISTA: muistivahti.log VIKA (ALKU-aika!), "kartan purku:" -rivit (pallo pois/takaisin),
   "yövalot … ASTC_4x4 ladattu", "Exception while creating asset" -määrä (A/B: 7), kuvat P2/P4 (paluu kartalle ehjä: pallo, pohjaraster, talot).
   JUNAEHTO: Cesium (Google) + ISS ilman VIKAA, kuvat otettu, paluu ehjä → PARI PT:lle: savu3 S6c (Ion) | P1-cesium-pariisi-google, sekä P0|P2|P4.
   RISKI 1: BUILD 144 pallon sammutus → pohjaraster pois (P2). Jos rikki: `kartta purku pallo pois` ja uusinta.
   RISKI 2: Googlen tileset jää sulkiessa "lepoon" muistiin (CesiumKaupunki.Lepoon) → ISS-osuus voi kaatua siihen. Korjausehdotus:
   AstronauttiSovitin.Avaa → CesiumKaupunki.VapautaLepo("iss") (maksaa uuden Google-istunnon seuraavalla avauksella; kysy PT).
2. nd-pohjat-ipad-2 (KU) KELVOTON (PT:lle kerrottu 06.1x): 69cd72344 | 7a9c1a971 identtiset, mutta nähtävyysalueet eivät rakentuneet
   kummassakaan (ND:n paikalla tyhjä suorakulmio, loki vain "notre-dame: mallien tiedostot levyllä"). Selvitä Nahtavyysalue.Paivita:
   rakentuu vain kun ElavaTyyli.Striimi && lähellä && tavoite > 0 (korkeus LahiKaari/KaukoKaari) → korjaa sk-nd-pohjat-ipad-2.txt (ipad-3) ja
   pyydä JU:lta uusinta. Parit: _tyo/natiiviseppa/iso/nd-pohjat-parit/ (rajaus-Q1-B.png). HUOM: kartan purku -haarassa alueet puretaan
   Cesium/ISS:n ajaksi — ND-ajo ajetaan 69cd72344/7a9c1a971:llä, ei purkuhaaralla.

## EDELLISESTÄ (ennallaan)
TOP 10 jatko (Museo 50,7, KavelyKerrokset 16,9, IssPaneeli 15,7 + Raketti 14,2; iso-kuvat-astc.py) ja VS-viestit (tulivuoret palvelimella;
Revontulet.PaivitaNakyvyys:207 MissingReference, tarkista NUI:n ajot ensin): ks. edellinen luovutus.
