# Julkaisijan luovutus 26.10.2026 klo 16.01 (kova raja 70 %, Postivahti)

Vain voimassa oleva tila (Raamattu 7.22). Historia: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80).
Osoitekirja /Users/Shared/Claude/osoitekirja.md; viestit `mcp__ccd_session_mgmt__send_message` session-id:llä.

## 0. TILA NYT
- **TF 210 ULKONA (26.10. 10.23):** iOS 40290323441, sisäinen + ulkoinen (beta-arvio APPROVED), Mac-TF 40191669019 (NS 25.10.).
  209 vanhennettu. BUILD 985cbf182, muutosloki #5229 → 959567a98. Juna 211 auki (NS natiiviseppa/juna-211, Unity 6000.7.0b6).
- **Käynnissä luovutushetkellä:** KS:n elävän kartan käännös d7e3df9de L1:llä (15.58, skripti
  `julkaisija-tyokalut/ks-elava-ipad-kaanna.zsh` → `_tyo/karttaseppa/elava-kartta-app`). Kun valmis: tulos + "SIMU NYT 00CF62C2"
  KS:lle kahteen ajoon (~12 min). L2: 00e7b7941 (ei JU:n).
- **Ämpäri 26.10. (kaikki PT:n kuittaamina, osoitinrivi NS:lle annettu, juna 211):** tausta-v52/v54/v56, rakennukset-v44/v46/v47/v48,
  muurikate-v16, avoimet-v49 (437f03035) ja avoimet-v50 (1aed2b28e, uusin). Hylätyt/ei viedä: tausta-v53, rakennukset-v45, avoimet-v48.
- **Linjat:** molempien käännöskopioiden Library on b6:ssa (L1 13.35, L2 13.51). b5-käännös vaihtaisi Libraryn takaisin – pyydä
  rooleja rebeisaamaan b6:een. Lukkovahti: Monitor `zsh julkaisija-tyokalut/lukkovahti.zsh` (30 min, viritä uudelleen).
- **Simut:** kaikki vapaina paitsi KS:n tuleva 00CF62C2. Raja 2 yhtä aikaa.
- **valoseppa-vahti.zsh:** pysäytetty VS:n pyynnöstä (pääsilmukka 84060 lopetettu 13.1x). Älä käynnistä ilman VS:n pyyntöä.
- **Avoimet PR:t:** ei omia. #5229, #5244, #5246 mergetty.
- **Levy:** 79 Gi (11.0x). siirra_t7 vasta < 60 Gi ja PT:n luvalla (T7:llä 344 Gi).

## 1. KÄYTÄNNÖT (uudet 25.–26.10.)
- **Käännöskopiot pysyvästi sisäisellä levyllä** (PT 26.10.): Matkakirja-proto-kaannos → proto-3d/proto-kaannos-linja1-sisa.
  GitHub-runner ei pääse T7:lle. Muistio: kaannoskopiot-sisaisella-levylla.md. Runner 2 ei tarvitse T7:ää (Mac-TF:n oletuspolku
  proto3d-mac-testflight.yml osoittaa vielä T7:lle – ehdotettu NS:lle vaihdettavaksi).
- **TF kaatuu ?? .meta -jäämiin** (kaatunut Unity-vienti): `git clean -fd` käännöskopiossa linjan ollessa vapaa, sitten uusi ajo.
- **L2 ILPP-jumi:** b5-editorin Unity voi jäädä odottamaan /tmp/ilpp.sock:ia (unity-vahti "nice failed"). Lopeta prosessipuu,
  `git reset --hard && git clean -fd` L2-kopiossa, poista kuollut lukko.
- **LR:n osoitinrivi NS:lle kysymättä**, kun PT on kuitannut paketin ja se on viety (muistio ju-lr-osoitinrivi-ns-kysymatta.md).
- **Roolien simukäännökset:** JU ajaa `proto-kaanna.sh <sha>` PROTO_APP_KOPIO-kansioon (mallit `julkaisija-tyokalut/ks-*-kaanna.zsh`,
  `pk-elavyys-kaanna.zsh`), sitten "SIMU NYT <UDID>" ja odota "SIMU VAPAA". Keskeneräistä Unity-käännöstä ei keskeytetä.
- Vanhat käytännöt (LR-kuittaus riittää, merget odota-ja-mergea.zsh:lla, PK:n paketit vain PT:n pyynnöstä) ennallaan.
