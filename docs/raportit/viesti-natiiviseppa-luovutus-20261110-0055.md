# Natiivisepän luovutus 10.11.2026 klo 00.55

Edellinen: git show 6ef9b224b:docs/raportit/viesti-natiiviseppa-luovutus-20261110-0010.md (tausta). Syy: kontekstivahti 26 % (7.37).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").
Raportit: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/iso/ (raportti-tulivuoret.md, raportti-osa4.md, raportti-nahtavyydet.md, raportti-top10.md).
Repo natiivi-backup, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-iso (haara natiiviseppa/iso-tulivuoret). Älä poista mitään (PT).

## VALMIS / KUITATTU
- TULIVUORET PALVELIMELLE natiiviseppa/iso-tulivuoret 2d0d2b82d (pohja iso-nahtavyydet 380bd41cc): PT KUITTASI junaan 224 (00.4x). JU yhdistää ja vie
  paketin _tyo/natiiviseppa/iso/ampari-tulivuoret-1 (LAHTEET.md + SHA256SUMS 34 riviä lisätty). Build −125 Mt, osa tulivuoret 57,6 Mt,
  ei taustahakua kytkin pois (IsoTausta + hakemiston eiTaustalla, PT:n päätös), Kartta-testit IsoTaustaTestit. Mac-ajo ok (lokit/natiiviseppa-iso-tulivuoret-1-mac-2d0d2b82d).
  JU kysyi 4b332e927 "KESKEN": vastattu (380bd41cc viimeisteli, kuitattu 9.11.). Työkalu tyokalut/iso-kuvat-astc.py (yleinen, python3.14 ilman -I).
- VS:lle kerrottava (luovutuksessa / kun VS herää): "Tulivuorten kuvat nyt palvelimella (osa tulivuoret), lataaja IsoSisalto; lähteet
  Linssit/Lahteet~/Tulivuoret, muunnos tyokalut/iso-kuvat-astc.py." – EI VIELÄ LÄHETETTY.

## ODOTTAA
1. NUI:n LATAUSILMAISIN natiivi-ui/tulivuori-ilmaisin f4e7ccd61 (2d0d2b82d + 1, katselmoitu ok): JU:n Mac-ajo sk-tulivuori-ilmaisin-1 → katso kuvat →
   yhdistä natiiviseppa/iso-tulivuoret-haaraan (tai PT:n ohjeen mukaan junaan, koska 2d0d2b82d jo kuitattu) → rivi PT:lle.
2. KOODIKOKO 313e146eb: karsinta-ipad-1 VAJAA (lähetysvika jätti juoksupelin päälle → Cesium-opas/ISS ajamatta; 0 × MissingMethod/TypeLoad/AOT).
   UUSINTA karsinta-ipad-2 JU:lla ajossa → lokit/natiiviseppa-karsinta-ipad-2-313e146eb (tulosrivi /Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt
   "AJO NS karsinta-ipad-2"). Tarkista konsoli.txt: 0 × MissingMethod|TypeLoad|ExecutionEngine|MissingField|AOT, merkit.txt ei PUUTE Cesium/raketti/cupola/skanneri
   → rivi PT:lle tulos (latausajat jo PT:llä: +0,1 s käynnistys, −99 Mt asennettu; taulukko raportti-osa4.md).
3. TAVLI 2ad9b89bc: kuvapari PT:lle lähetetty 00.55 (_tyo/natiiviseppa/iso/tavli-pari/, samannäköiset, −16/−44 Mt) → odottaa PT:n kuittausta.

## TOP 10 (raportti-top10.md) seuraavat ehdokkaat
NotreDameKoe pohjakuvat 80 Mt (ASTC-muunnos, NS), Museo 50,7, JuoksuV4 26 + JuoksuMaailma.shader 13,3 (Pelikoodari), KavelyKerrokset 16,9,
IssPaneeli 15,7 + Raketti 14,2. iso-kuvat-astc.py sopii kuvien siirtoon palvelimelle.

## SIVUHAVAINTO (ei NS:n)
- Revontulet.PaivitaNakyvyys:207 MissingReference astronauttilinssin sulkemisessa (iso-1-ajo 9.11.) → VS/LS, ei vielä raportoitu erikseen.

## LISÄYS 01.0x (luovutuksen jälkeen tehty)
- NUI:n ilmaisin dc0c548c2 (f4e7ccd61 + palkki tummalla teemalla) YHDISTETTY natiiviseppa/iso-tulivuoret-haaraan (ff), iPad-ajo lokit/nui-tulivuori-ilmaisin-2-ipad-dc0c548c2
  katsottu: ilmaisin näkyy 0,6 s jälkeen ja poistuu, kuva i-1 ok; ainoa poikkeus UnityEditor.Search (editorin, ei pelin). JU:lle ja PT:lle ilmoitettu.
- TAVLI 2ad9b89bc: PT KUITTASI junaan 224 (01.0x); JU:lle lähetetty yhdistettäväksi. PT:n ohje: kuvaparin puolet jatkossa SAMASSA TILASSA (sama opastus/otsikko).
- Revontulet.cs:207 NRE näkyi myös NUI:n ajossa → yhä VS:lle raportoimatta (VS lepää).
