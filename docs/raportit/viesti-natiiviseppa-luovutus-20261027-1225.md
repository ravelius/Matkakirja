# Natiivisepän luovutus 27.10.2026 klo 12.25 (konteksti 43 % > kova 35 %; juna 212 runko 126eced2c)

Vain voimassa oleva tila. Historia: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna212/jono-212.txt (loppu = uusin;
juna 211: juna211/jono-211.txt). Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a (juoksupelin raportit KK:lle, PT 26.10.; junat ja merget PT:lle).

## TILA
- **Juna 211 = lukitusehdokas 18aa331151517cb333b0a3c7ab594076b62325ec** (haara natiiviseppa/juna-211 jäädytetty; testit 2213/756/554,
  METAL 440/0, PIPELINE 432/0). Muutosloki 1.1 (211) PR #5282 MERGED. Mac 211 käännetty (build 211) → lokit/natiiviseppa-mac-tf-211/
  (symlinkki natiiviseppa-mac-tf-uusin) → JU vie Mac-TF:n. Julkaisu ilman testiajoja (omistaja 26.10. 22.14/22.17). LUKITUS/TF = JU.
- **Juna 212 runko natiiviseppa/juna-212 = 126eced2c** (wt/proto-natiiviseppa-ehdokas, puhdas; peili natiivi-backup
  peili/proto/natiiviseppa/juna-212). Sisältö 18aa33115:n päälle: NUI kohdekortti-pohja 27e7d7aca, PK lahikamera 3330b136d,
  NUI nosto-sulku 5eeed4ea6, NUI tyylikirja-ohjainopetus a6d82fd1b (= mainin PR 5303), KS vain-2d-212 db2286915.
  Testit VIHREÄT 2213/757/559, tarkista 0. Ei laitekäännöksiä (omistaja 26.10. 16.43: ei erillistä iPad-käännöstä).
- **Esikatselu linjalla 2** (omistaja 26.10. 22.39, 10.5): tyokalut/esikatselu.sh oletus PROTO_LINJA=2 → klooni
  Matkakirja-proto-esikatselu-2 + /tmp/matkakirja-kaannospalvelu-2.lukko + datakansio "Matkakirja 3D esikatselu 2"; linja 1 = JU.

## TULOSSA JUNAAN 212 (vain PT:n/KK:n kuittauksella)
- LR tausta: kujan 01 lattia + aukion lattia omilla 1024-valoatlaksilla (+8–10 Mt, hyväksyttävä) → osoitin vasta PT:n kuittaus +
  JU:n ämpärivahvistus (cherry-pick vain osoitincommit, tarkista `git show` = 1 rivi).
- Muut PK/NUI/VS/KS-erät tavalliseen tapaan.

## OLAVINLINNA (omistaja 26.10. 21.09: Codexille täytetöitä, juoksupeli ensin) – tilaukset ovat NS:n
- Lista: postilaatikko posti/natiiviseppa-pt-olavinlinna-codex-lista-20261026.md (6 kohtaa).
- Tilattu: palatsin geometria #1003 (e203239d0 jatko, toinen Codex-tekijä; toimitus → `node tools/codex-3d-tarkistus.mjs` → PT;
  huoneiden 7–10 + tyrmä vasta PT:n palatsikuittauksen jälkeen), Tripo-pilotti kokki + portinvartija #1004–1005 (Tripo-chat;
  → Lavastaja kokoaa, rivi PT:lle), jatkojono J1–J4 (posti 7d02eb358): J1 aarrekuva + J2 pohjakuvat TOIMITETTU
  (posti/olavinlinna-aarre-20261027/; v2: 1017 ja 1019 OK; Tripo-sarja = 1019 v2 + 1020 + 1021, 1018 ei; 1017 v2 + "pata"-huomio KK:lle).
  J3 hopeapikari + J4 arkun sisältö odottavat Tripoa (selainliitännäinen browser-service.mjs 26.1021 puuttuu omistajan
  Codex-asennuksesta; omistaja korjaa, emme koske).
- Postilaatikkovahti: grep posti/natiiviseppa-codex-olavinlinna-*-toimitus* ja olavinlinna-(palatsi-geometria|tripo-pilotti|aarre-3d)-*/.
  Posti lähetetään plumbingilla (scratchpad posti.sh: erillinen GIT_INDEX_FILE, commit-tree origin/claude/postilaatikko päälle, push).

## TYÖTAPA
- Merge: `git -C <wt> merge --no-ff <sha>` (ff kun suora jatko) → testit `EI_PEILIA=1 nice -n 15 zsh juna210/testit210-rinn.sh <wt>`
  → peili `git push -f natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/juna-212` → rivi PT:lle (≤ 3 riviä).
- Varjostinmuutos (*.shader) → lisäksi `zsh tyokalut/metal-tarkistus.sh <ulos>` (440/0, 432/0); se jättää URP-asetuksen ja .meta-jäämiä
  → `git checkout -- Assets/Settings/UniversalRenderPipelineGlobalSettings.asset; git clean -fdq`.
- tarkista.sh ajaa tyylikirja-paivita.sh:n, joka kopioi tyylikirjan pelirepon mainista: jos main on edellä, työpuuhun ilmestyy
  Tyylikirja.uss/.cs/tyylikirja.json-muutos → pyydä NUI:lta tyylikirjahaara (kuten a6d82fd1b), palauta työpuu.
- Testilokin "FAIL AanimuistivahtiTestit…" on vanha jäänne; summa 2213/2213 ratkaisee. Python-työkalutestit numpylla: /opt/homebrew/bin/python3.
- Työkalu-/skriptihaarat (vain tyokalut/): syntaksi + oma testi + tarkista.sh riittää.
- Mac-käännös: juna211/mac211.sh <sha> (L2, ei TF:ää; JU vie). Simu vain JU:n SIMULAATTORI NYT -vuorolla.

## MUUTA
- Cronit (session omat, luotava uudelleen): Unity-beeta "4 9 * * *" (unity-julkaisut.py), postilaatikkovahti "17,47 * * * *".
- Worktree wt/natiiviseppa-muutosloki-211 poistettu (PR #5282 MERGED). Säilyvät: wt/proto-natiiviseppa-ehdokas, -diag, -tyokalut.
- Levy ~70 Gi, swap ollut 14,7/16 Gt (raskaat ajot yksi kerrallaan). Osoitekirjassa KK-rivillä "roolit eivät viesti tänne" vs PT 26.10.
  (juoksupeli KK:lle) – PT:n ohje uudempi.
