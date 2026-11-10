# Natiivisepän luovutus 10.11.2026 klo 07.15

Edellinen: git show 6d40be170:docs/raportit/viesti-natiiviseppa-luovutus-20261110-0628.md (TOP 10, VS-viestit). Syy: kontekstivahti 27 % (7.37).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …"). Repo natiivi-backup (remote natiivi-backup). Älä poista mitään.

## TEHTY TÄLLÄ VUOROLLA (kaikki PT:lle raportoitu)
- Kiertopiste f8cb3ac61: Mac-pari katsottu → PT KUITTASI 06.34, junassa 224 (baf73a110). ArgumentOutOfRange "ui konsoli pois" =
  Unity-editorin QuickSearch, ei uusi (3974 lokia 29.10. alkaen) → PT:lle.
- ND-pohjat 7a9c1a971 (natiiviseppa/nd-pohjat-astc, 10 pohjaa ASTC): iPad-pari, tekstuurit −74 Mt, ulkoasu sama → PT KUITTASI → JU junaan.
- Orbit-tappi 183e4bfbf (natiiviseppa/orbit-tappi, baf73a110:n päällä; OMISTAJA 06.54 "orbit kierto loppuu jos säädän kulmaa oik
  tapilla"): kierron aikana TappiPysayta ei pysäytä, TappiOhjaa → ajon kallistusSiirto/suuntimaSiirto + ajoLiikeSiirto. Mac-pari
  OK (kierto jatkuu, juna pysähtyy) → PARI PT:LLÄ 07.1x, ODOTTAA KUITTAUSTA (_tyo/natiiviseppa/orbit-tappi/).

## ODOTTAA JU:LTA
- LO-uusinta kartan-purku c31e0eb9e (natiiviseppa/kartan-purku = 95c02d6bc + yövalojen natiivi R8), sk-kartan-purku-ipad.txt →
  lokit/kartan-purku-ipad-c31e0eb9e. 95c02d6bc-ajo: kaupunki OK (Google ei lepoon), mutta ISS VIKA 4250 Mt: "ASTC 4×4 ei onnistunut,
  R8-polku" → vanha LoadImage-polku nosti fp 3245 → 4344 Mt. Korjaus: MatkakirjaKuvat_PuraHarmaa (natiivi R8 + mipit, ASTC 4×4 olisi
  sama 8 bpp), ValoLohko oletus 1; ASTC-syy NSLogiin. Mac-koe: sama kuin PIL, ero ≤ 1/255. Tarkista: "yövalot: natiivi R8 iss-valot-…"
  -rivit, EI "vanha R8-polku", ISS P3 + paluu P4 ilman VIKAa → pari PT:lle (JUNAEHTO: Cesium + ISS ilman VIKAa, paluu ehjä).

## LEVY (PT 06.4x): omat ei-aktiiviset worktreet NAS:lle .../Matkakirja-arkisto/natiiviseppa/worktreet-20261110
- Skripti /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/levy/siirto-wt.zsh (rsync -rlt, tarkistus ilman SMB:n ._*-tiedostoja,
  sitten git worktree remove). 12 kpl: ennakkokoe fpv-lataus fpv-vuoret fpvkamera huippunimet iso kattokuvio koodikoko koodikoko224
  nostolento talolataus tavli (fpv-lataus + huippunimet pushattu ensin). ~15 min/kpl NAS:lle. Käynnissä 07.13 alkaen tämän session
  taustalla – jos katkesi nollauksessa, aja skripti uudelleen taustalla (jatkaa, valmiit "ei kansiota"). Rivi PT:lle lopuksi:
  montako, paljonko vapautui (df alussa 12,8 Gt vapaana).
- Ei siirretä: ndpohjat (kiertopiste), tarina (tarina-224), orbittappi + kartanpurku (työn alla), tyokalut/unity-b5/unity67 (likaisia).
- proto-natiivi-ui-* (19) ovat NUI:n, eivät minun: kerrottu PT:lle, en koskenut.

## EDELLISESTÄ (ennallaan)
TOP 10 jatko (Museo 50,7, KavelyKerrokset 16,9, IssPaneeli 15,7 + Raketti 14,2; iso-kuvat-astc.py) ja VS-viestit: ks. 0510-luovutus.
