# Julkaisijan luovutus 18.10.2026 klo 10.0x (aamupäivä)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -100). Edellinen: `viesti-julkaisija-luovutus-20261018-aamu.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md. Levy 38 Gi (10.0x). Levyvahti `zsh levyvahti-l2.zsh` (julkaisija-tyokalut, ei suoritusoikeutta → aja zsh:lla) kuolee nollauksessa → käynnistä uudelleen.
Viestit: SendMessage-raja täyttyi 07.5x → varakanava mcp__ccd_session_mgmt__send_message session-id:llä (omistajan ~/.claude/CLAUDE.md).

## 0. Heti (simujono, yksi kerrallaan; simut setissä "/Volumes/T7 4TB/Simulaattorit/Sarja")
- NYT simulla: **KS kohdepisteet v2** b6841abfc (SIMU NYT 10.03, ~5 min, omistajan ENSIN).
- Seuraavaksi: **VS** Louvre ennen/jälkeen + diag 2 (louvre-app 5447681e = d31b23a35 ✓, kyyti-diag-app 73f7c278c) ~15 min
  → **PK ISS-paneeli** d653af8ff (omistajan ENSIN; PK kääntää itse L2:lla, ilmoittaa LUKKO VAPAA; iPhone BD64C8E4 + iPad 00CF62C2 ~12)
  → **LR** YHDISTETTY haara (PT 10.1x: louvre-v2k + pienoismallit + kehykset v7 yhdeksi; LR lähettää sha:n → käännä L1:llä → simu)
  → **NUI** aloituslogon korjaus (iPhone 123B4B25 ~3 min) NS:n kuvakäännöksestä 3 (⊇ dc682cda3 / fcde3ccb3): käännä kun NS antaa sha:n
  → **LS** juna202b Olavinlinna ennen|jälkeen (LS ilmoittaa käännöksen).
- Muistuta jokaisessa SIMU NYT:ssä: app pois simusta + sammutus (levy).

## 1. Käännökset käynnissä
- L1: fa51ec0ed (LR louvre-v2k) Unity-vaiheessa, irrotettu (PPID 1) → valmistuu, EI KÄYTETÄ (yhdistetty haara korvaa). 41516822d ja v7 c70933e2b PERUTTU (PT: yhdistyvät).
- L2: LR kehykset v6 8a33ed5e4 (Unity-vaihe, EI KÄYTETÄ – LR antaa uuden sha KK-korjauksin) → PK ISS d653af8ff (PK:n oma).

## 2. Junat
- **TF 201 VALMIS**: iOS 39099807656 lähetetty 08.24, sisäinen + ulkoinen, beta-arvio HYVÄKSYTTY 08.30, 200 vanhennettu 08.31; Mac 201 NS 39100405913. BUILD 201 = proto master 2ba609861.
- **Juna 202 auki.** Kuvakäännökset: 1 511a53249 → 599260114 (juna202-kuva1-app), 2 97775f95b → c7fdb793c (juna202-kuva2-app). NUI epäili, että 97775f95b hidastaa käynnistystä (>45 s) → NUI raportoi NS:lle/PT:lle.
- **Web-merget 202** (`julkaisija-tyokalut/web-merget-202.txt`, PIDOSSA vasta OMISTAJA PYYSI JULKAISUA): #4860 PK lainausmerkit → #4862 (SK tekstivaihto) → #4861 SS Pöllö-äänikartat.
- **Kuvakäännös 3 (juna 202)**: NS antaa sha:n → L1 → juna202-kuva3-app; NUI kuvaa logokorjauksen.

## 3. Tehty tällä vuorolla
- Kuvakäännökset 201: 6 642f8ed23, 7 1bb9e7ed4, 8 007c891a2 (lukitus). Viety: taidemuseo-kertoja-manifest-201 (07.42), aanikartta-lontoo-praha-ateena (09.16), taidemuseo-ranska-v2k (09.58, 31 tiedostoa).
- Siivottu _tyo/julkaisija: jäljellä juna201-kuva7/8 + juna202-kuva1/2. kuva8-app tarvitaan vielä (LS:n ennen-kuvat) – poista kuva7 seuraavaksi.
- Tauolla (omistaja 09.37): PK juoksupeli (afb2b8c32 käännetty, ei simua), KS v14 (app jää levylle), Eiffel.

## 4. Opit
- Kesken Unity-vaihetta olevaa käännöstä ei tapeta (orpo Unity); lukkojonossa odottavan voi perua (ei lokia → ei alkanut).
- Ennen käännöspyynnön ajoa tarkista, kääntääkö pyytäjä itse samaa haaraa (VS louvre tuplana 09.4x).
- Haaran merge-vika masterin kanssa (LR nappula 08.49): käännöspalvelu merget kärjen masterin päälle → pyytäjä yhdistää masterin itse.
