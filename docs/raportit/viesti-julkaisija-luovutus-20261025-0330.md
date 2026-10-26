# Julkaisijan luovutus 25.10.2026 klo 03.30 talviaikaa (kova raja 89 %, Postivahti)

Vain voimassa oleva tila (Raamattu 7.22). Historia: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80).
Osoitekirja /Users/Shared/Claude/osoitekirja.md; viestit `mcp__ccd_session_mgmt__send_message` session-id:llä.

## 0. TILA NYT
- **Juna 210 auki. Juna 211 yhdistettiin junaan 210 (omistaja 24.10. klo 18.45). TF vasta omistajan sanasta.** Ei lukitusta eikä vientiä.
- **NS:n uusin runko:** 868455f0a (natiiviseppa/juna-210), vihreä, iPadissa 03.11. Osoittimet: tausta-v46, rakennukset-v35,
  avoimet-v42, muurikate-v14, esto-v12, pohja v1d-pk2, ulkorengas v1, aarteet799-v3.
- **Ämpärissä, mutta ei vielä rungon osoittimissa:** rakennukset-v36 (03.22) ja rakennukset-v37 + ulkorengas-v3 (03.29, proto
  0b465e7c5); NS:lle kerrotaan rungon päivityksestä erikseen. Käyttämättä jäävät mm. muurikate-v11, v43/v13/v32, ulkorengas-v2 ja
  aarteet799-v3:n vanha versio (db8d4eb37b27 ei mennyt ämpäriin; v3b meni samaan kansioon).
- **Linjat ja simut:** vapaat 03.29. Simuraja 2: NUI 123B4B25 + F7513985, PK 39644E75, VS-vahti A26BC7D0.
- **Lukkovahti:** Monitor `zsh julkaisija-tyokalut/lukkovahti.zsh` (30 min, viritä uudelleen).
- **Avoimet PR:t:** ei omia. #5208–#5217 mergetty.
- **Levy:** siirra_t7 --aja 24.10. 22.58 (24,4 Gt T7:lle, vapaata 96 Gi).

## 1. KÄYTÄNNÖT (uudet 24.–25.10.)
- **LR:n paketit:** PT 25.10. 03.20: kun LR välittää PT:n kuittauksen ja SHA256SUMS-tunniste
  (`shasum -a 256 SHA256SUMS | cut -c1-12`) täsmää, vie suoraan. Muistio: ju-lr-valitetty-kuittaus-riittaa.md.
  Jos PT sanoo "ei vielä" tai LR perää, älä vie.
- **NS:lle osoitinrivi** vain, kun PT pyytää. Ilmoita aina, mitkä versiot korvautuvat.
- **PK:n omat paketit** (esto/pohja) vie, kun PT on pyytänyt kyseisen paketin. LAHTEET.md tarvitsee rivin "Lisenssi: …".
- **Rakettivideon Mac-käännös** VS:lle: `zsh julkaisija-tyokalut/vs-rakettivideo-mac-kaanna-sha.zsh <sha> > vs-rakettivideo-mac-<sha>.log`
  ja sen jälkeen grep "Shader error in" / "error CS" mac.log:sta. Jos uusi pyyntö tulee ennen kuin vanha alkoi, pysäytä vanha.
- **Merget:** `zsh julkaisija-tyokalut/odota-ja-mergea.zsh <PR>` taustalle ja sitten rivi PT:lle. Järjestyspyynnöt ketjutetaan.
- **Simut:** iPhone 123B4B25 on NUI:n; PK lainaa sen ilmoituksella, ja välitä SIMU VAPAA molemmille.
  Raamattu 7.32: omistajan kuviin ei tekstiä kuvan päälle.
- **Ei poistoja oman työtilan ulkopuolelta.** Levyn vapautus siirra_t7:llä.
