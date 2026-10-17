# Julkaisijan luovutus 17.10.2026 klo 03.45 (Postivahti: kova raja 37 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150). Edellinen: `viesti-julkaisija-luovutus-20261017-yo.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md.

## 0. TILA
- **JUNA 197 VALMIS**: iOS TF 01.56 → sisäinen 02.01 → ulkoinen 02.08 (beta-arvio hyväksytty); Mac 1.1 (197) TF 02.08 (NS).
  BUILD b2bc7aac0bcc951f7842d0dbc3c20ac5b6a27f75, M c6bcb6bc4 (#4761), osoitin uusin-4 → v6k22 tehty. TF-rivit PT:lle lähetetty.
- **JUNA 198**: OMISTAJA PYYSI JULKAISUA 01.03 (PT: "hyväksy kaikki puolestani … julkaise ne"). Runko 8d7a01805 (NS). `muistiajo-198.txt` = OHITETTU valmiina.
  Luennat v6 tarkistettu CDN:stä (manifest 200, otos 40/40). **LUKITSE 198 tulee PT:ltä ~05–06**, kun yön erät sisällä tai pois:
  NUI, LS vapaalento + Kiina + Ranska (Ranskaa ei vielä jonossa), PK yhteis, KS ISS, SS mittaus. Lukituksen jälkeen: NS:ltä BUILD + M → `tf-kaynnista.sh 198 <BUILD> <M>`.
- PR:t #4746, #4750, #4762 mergetty. Levy ~58 Gi (Codex-vuoto 01.3x ohi; levyvahti 22 Gi oli Monitorina → kuolee nollauksessa, käynnistä uudelleen:
  `zsh julkaisija-tyokalut/levyvahti-l2.zsh` Monitorilla).

## 1. L2 (yösääntö 1 käännös + 1 simu, kaikki ILMAN asennusta kun simu varattu)
- Lukossa KS iss-reitti-198 (aeb76a609, 03.41; orkestroija `l2-yojarjestys5.zsh` 24762 ajaa sen ja päättyy "JONO LÄPI").
- Seuraavat (irrotetut pidot hoitavat järjestyksen): LS kiina-valmis-198 939a00898 (74374) → LS vapaalento c59d63e01 (80259, SIGSTOP kunnes Kiina
  lukossa: `ls-vapaalento2-pito.zsh`) → NUI isoisan-uni-198 1e0d9513e (74105, SIGSTOP kunnes vapaalento lukossa: `nui-uni-cont.zsh`)
  → **Valoseppä pyramidi-lasi c49687f22** (hän ajaa itse `louvre1/k62-kaanna.zsh` viestillä KÄÄNNÖS NYT; ennen valasta, KK odottaa paria) → valas k3 11e20b600
  (valas-k3.zsh --vain-kaannos) → V4 (2 käännöstä, _tyo/linssiseppa2/valopohja/V4/kaanna.zsh). Valoseppä ei jonota itse.
- Valmiit tänä yönä: ks. loki (NUI 6 erää + lasipohja3/4, PK raketti/iss-ab/yhteis, SS siirto-198-1 4c0c26727, KS vihjeet, LS vapaalento 6661e4872, linnunrata).

## 2. SIMUJONO (yksi kerrallaan, SIMU NYT viestillä)
Nyt: SS ennen-ajo 95EEDB48 → SS ilmoittaa "SIMU VAPAA VÄLISSÄ" → **NUI lasipohja5-still iPhone ~3 min** (NS 198 -ehto) → SS jälkeen-ajo ~20 min
→ PK yhteis 96044270 2 ajoa ~20 min → NUI 2. vuoro ~35 min (iss-luettelo ×2, kamerapöytä ×2, museo-kevyt iPhone, isoisän uni iPad)
→ KS iss-reitti 123B4B25 ~6 min → LS vapaalento BD64C8E4 ~15 min + Kiina iPad 00CF62C2 → NUI skanneri/cupola2 (iPhone+iPad)/kaaro (198-erien jälkeen)
→ Valoseppä k64vs A26BC7D0 ~12 min (pyramidi-lasin jälkeen) → valas k3 → V4 ~15 min.

## 3. OPIT
- Asennuspito "vaiheajat"-rivistä EI toimi (simctl install < 1 s perään) → iss-ab asentui kesken PK:n videon. Simun ollessa varattu: käännös ilman SIMS-argumenttia.
- proto-kaanna.sh r113 ajaa nyt `zsh ./tyokalut/tarkista.sh` (rungon merge 4d210f6d6 pudotti 100755-tilan → 3 VIKAa 00.43).
- Roolit käynnistävät L2-odottajia itse (NUI usein) → tarkista `pgrep -fl proto-kaanna` ja pidä SIGSTOPilla PT:n järjestyksessä.
- Codex (eri käyttäjä) ei pysäyty roolien oikeuksilla; levyhätä → L2-odottajat seis, PT/KK hoitaa Codexin.
- `xcrun simctl shutdown all` estyy lupakyselyyn; yksittäinen `simctl --set "/Volumes/T7 4TB/Simulaattorit/Sarja" shutdown <UDID>` toimii.
