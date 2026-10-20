# Julkaisijan luovutus 20.10.2026 klo 07.05

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Edellinen: `viesti-julkaisija-luovutus-20261020-0130.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md. Viestit `mcp__ccd_session_mgmt__send_message` id:llä.

## 0. TILA (ENSIN)
- **TF 206 valmis kokonaan**: iOS + Mac + sisäinen 01.34, ulkoinen 01.52, beta-arvio APPROVED (tarkistus 39364203389), ryhmät Arvioijat + Beta-testaajat, 205 iOS + Mac vanhennettu 06.26 (39364252422). Asemataulu talo/eteneminen v75 (5/5, "ulkoiset testaajat"), paikallinen json päivitetty samaan.
- **Juna 207 KOOSSA** (NS: runko f3e77a5fc vihreä, 06.4x). Lukitus vasta omistajan julkaisupyynnöllä → JU ei tee mitään ennen NS:n BUILD-shaa.
- Linjat: L1 NS:llä (halli-208b fe6db12fb Release-laite LT:lle, pyydetty 06.5x). L2: **VS vesi k4** 02d465f5a+5acab1fde kääntyy (vs-vesi4-208.zsh → `_tyo/julkaisija/vesi4-208-app`, loki vs-vesi4-208.log).

## 1. SIMUJONO (yksi kerrallaan)
1. **PK** (local_11aca9cd-eda6-…) halli-208b (8e864ffdd) simulla NYT (SIMU NYT 07.02). Odota SIMU VAPAA.
2. **VS** (local_e675f86d-210c-…) vesi k4: kun vs-vesi4-208.log näyttää KÄÄNNETTY → SIMU NYT, `_tyo/julkaisija/vesi4-208-app`, vesiparit + 5 s video (~8 min).
3. **NUI** (local_c6d63773-…) 208c 4937cb91f: kääntyy L2:lla vesi4:n perään (nui-museo-valikko-208c.zsh → `_tyo/natiivi-ui/museo-valikko-208c-app`, loki nui-museo-valikko-208c.log) → KÄÄNNETTY + SIMU NYT: `ERA=c ajo-museo-valikko-208.zsh` iPhone + iPad (~8 min).
4. Jono tyhjä sen jälkeen.

## 2. Valmiina / tiedoksi
- Viety tänä aamuna (0 virhettä): juoksupeli-esteet-v2 (6, 03.05), sokkelo-korttelit-v3 (17, 04.55; julkiset URL:t 200 ilman ?t:tä, ei välimuisti-404:ää).
- LEVY (PT 07.1x): `_tyo/julkaisija` 36 G → 0,6 G, 61 vanhaa appia poistettu; vapaata 102 Gi. Säilytetty vesi4-208 + syvyys-vesi3-208. Pidä enintään 2 uusinta + jonossa olevat.
- Uudet käännösskriptit `julkaisija-tyokalut/`: `<rooli>-<aihe>-kaanna.zsh` + `.log`; ketjutus `until grep -q "L2 VAPAA" <edellinen>.log`. Kevyen kuorman simut (PK R1): pidä linjat tyhjinä lippu-tiedostolla (`pk-r1-vapaa`) ennen seuraavaa käännöstä.

## 3. Opit
- **TF-ketjun $0**: suhteellinen `$0` cd:n jälkeen jätti `B=$(grep … $0)` tyhjäksi → tf206-ulkoinen.sh ajoi 16 uusintaa BUILD="" (KK huomasi). Korjattu tf205.sh + tf206-ulkoinen.sh: `SKRIPTI=${0:A}` ennen cd:tä + tyhjän B:n esto. **207:n tf-skripti tehdään näistä.** Käynnistä aina absoluuttisella polulla.
- Syväterävyysrivi ym. Unity-viestit ovat linjan 2 `tulokset/sim.log`:ssa, EI kaannospalvelu-lokissa. Varjostinvirheet: `grep "Shader error in"` sim.log:sta (FallbackError-nimet ovat vääriä osumia).
- Pohjavahti hylkää uudet kovakoodatut värit ennen käännöstä (NUI yhd-207g) → loki näyttää "VIKA tarkista … virheitä 0"; katso POHJAVAHTI-rivi.
- Keskeneräisen käännöksen vaihto: tapa skripti + proto-kaanna-pid + Unity/xcodebuild (cwd proto-linja2); lukko vapautuu itsestään kuolleen pidin perusteella.
- Laitekäännökset (Release iPad) NS:lle L1:lle, ei JU:n L2:lla.
