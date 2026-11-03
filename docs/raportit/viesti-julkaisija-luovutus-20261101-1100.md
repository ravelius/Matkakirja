# Julkaisija: luovutus 1.11.2026 klo 11.00 (Macin kello) – konteksti 26 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261101-0455.md.

## Kesken / odottaa
- **TF ODOTTAA (PT 18.3x): omistaja: "mutta näytä kuvat ensin. Täytyy katsoa, että tekstit erottuvat tarpeeksi hyvin." → käännä TF 216 VASTA, kun omistaja on hyväksynyt Pariisin pelikuvat (PT välittää KK:n kautta). Valmistautuminen saa jatkua.**
- **ENSIMMÄINEN TYÖ (lisäys 18.31): TF 216 ILMAN testejä/simuvuoroa.** OMISTAJAN PÄÄTÖS 18.30 (PT:n välittämä, sanatarkasti): "Joo, julkaistaan, kun Pariisi on valmis, niin testaan sen pelissä." + 18.2x "julkaise ilman testejä". Käynnistys heti, kun NS ilmoittaa juna 216 -rungon, jossa KS:n Pariisin lähitaso (64 + r03c10, maskin mukainen zoom). 30.10. valoehto ohitettu tämän julkaisun osalta. Versionumero: `git fetch origin main` juuri ennen (docs/roolitus.md "Julkaisusäännöt"). Pohjat: julkaisija-tyokalut/tf215.sh (ketju: TF-ajo → sisäinen → vain-arvio → vienti → ulkoinen → vanhennus) ja mac-tf-215.zsh; muistit tf-jarjestys-muutosloki-ensin, julkaisija-tf-vaiheet-asemataululle. TF-linkki/tila PT:lle ja KK:lle.
- Muut tänään 13.0x jälkeen: viety leivonta-v4 (770), kaiteeton-v3 (19), muurikate-v37 (6), polut PK:lle; NS:n laitekäännökset eddff7063, 70861ee16, 30ab21cdc tehty. Omistaja ajoi simu-poiston 11.0x (4 yhteistä jäljellä). Yösiivouksen launchd ei vielä kytketty.
- Ei omia ajoja käynnissä. Linja 2 ja simut vapaat (11.00).
- Omistajan toimet PT → KK:n kautta (PT hoitaa): yösiivouksen asennusrivi (PR 5837, plistin kommentissa; ajetaan main-checkoutin
  juuresta) ja simulaattorien poisto /Users/Shared/Claude/_levy/simu-poisto-20261101.sh (≈ 383 Gt, PT luki, EI ajettu).
- Asennuksen jälkeen tarkista /Users/Shared/Claude/_levy/simu-yosiivous-launchd.log: jos launchd:n python ei saa lukea T7:ää (TCC),
  loki näyttää virheen → kerro PT:lle (omistajan FDA-lupa /usr/bin/python3:lle tai ajo zsh-kääreellä).

## Tehty tänään (1.11.)
- Taivas 8192 iPad-mittaus (VS:n taivas8192-laite.zsh, ipad-lukko): A 3242 Mt vs B 3305 Mt → ei eroa; konsolin "0 Mt" VS:lle.
  lokit/valoseppa-taivas8192-ipad-20261101-0515/TULOS.txt.
- Mergetty: 5812, 5814 (PT docs), 5817 (KS Pariisin kartta), 5821 (KS offline-maasto 2026-10-29), 5827 (PT), 5837 (yösiivous), 5842 (yhteiset simut).
- Viety: Pariisin piirroskartta 111 + lähitaso 17 (kohtaamiset/piirroskartta/pariisi/, omat skriptit vie-pariisi-*.zsh),
  muurikate-v36, tausta-v89e, -v89f, edusta-v3 (vie-paketti.sh). Osoitinrivit NS/PK/KS:lle lähetetty.
- NS:n käännös-/simuvuorot (75125af1a, 279120237, c7007111f, ead9e4835, 57ad0a1c4 + esikatselut) annettu ja kuitattu.
- Yösiivous: tools/levy/simu_yosiivous.py (kuiva-ajo oletus, --aja, --udid) + fi.matkakirja.simu-yosiivous.plist (04.00).
  Kokeilu 123B4B25: 19,8 Gt → 0, boot + peli OK.
- Yhteiset simut (omistaja 10.41): docs/raportit/simu-yhteiset-20261101.md. Simuvuorot jatkossa simu-lukko.sh:lla
  (kaari <rooli> <simu> -- …); vuoron antaessa riittää kertoa vapaa yhteinen simu. NS teki peilin (juna-216 eddff7063).
- Juna-vahti: taukolippu nyt myös proto-3d/tyokalut/juna-tauko; epäonnistunutta kärkeä ei yritetä uudelleen.

## OPIT
- Docs-PR:issä ei ole testejä ("no checks reported") → merge suoraan.
- Main voi olla punainen PT:n loki-PR:n jäljiltä (uusi paatokset-kk.md puuttuu Raamatun kartalta) → PT korjaa, sitten oma PR mainin päälle.
- uusi-worktree.sh --poista ottaa YHDEN argumentin: `--poista julkaisija-<aihe>`.
- find -maxdepth jättää syvät _tyo-polut löytämättä: kysy täysi polku heti.
