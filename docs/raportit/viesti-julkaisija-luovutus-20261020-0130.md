# Julkaisijan luovutus 20.10.2026 klo 01.30

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -120). Edellinen: `viesti-julkaisija-luovutus-20261019-2305.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md. Viestit `mcp__ccd_session_mgmt__send_message` id:llä.

## 0. TILA – JUNA 206 MATKALLA (ENSIN)
- LUKITTU 01.03 (PT LUKITSE 00.57, omistaja pyysi julkaisua 00.30). BUILD 206 = master 82e263c79 (puu e1a0a464d = 5f857b38d), muutosloki 17ee9f83f (#5017).
- Muistiajo 206 OK 1,96 Gt (NS, iPad Pro 13, 82e263c79) → `muistiajo-206.txt`.
- TF iOS 39333654702 success 01.22. TF Mac 39334453643 (NS:n mac206.sh) success 01.29.
- **Sisäinen ryhmä 39334522376 käynnissä (01.29)** – ketju `tf206.sh` → `tf206-ketju.log` (irrotettu, kestää nollauksen).
- Ulkoinen OHITETTU: `tf206-ei-ulkoista` (PT: ulkoiset vasta Laitetestaajan kierroksen jälkeen). Kun LT:n tulos + PT:n lupa → aja ulkoinen käsin (testflight-ulkoinen, build_numero=206) ja poista tiedosto.
- Asemataulu (https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy, talo/eteneminen) **v72: Juna 206 matka 4/5 "Applella"**.

**ENSIMMÄINEN TEHTÄVÄ:** `gh run view 39334522376 --json status,conclusion` → kun success: Asemataulu 5/5 "TestFlightissa" (get → update if_version) + yksi rivi PT:lle (local_8d8ebf72…) ja KK:lle (local_8e4fcfed…): "TF 206 sisäisillä klo HH.MM". Virhe → PT.

## 1. SIMUJONO (yksi kerrallaan, PT 01.04 kuormaraja: yksi käännös + yksi simu)
1. **Laitetestaaja** (local_36a45147) ajaa NYT lukittua 206:ta: `proto-3d/lokit/natiiviseppa-app-206-lukitus-sim/Matkakirja3D.app` + iPad Pro 13 NS:n Release-.app. Odota SIMU VAPAA.
2. **PK** (local_11aca9cd): yhteinen13 `_tyo/julkaisija/sokkelo-yhteinen13-207-app` (413a7c074 + fe6c3b1bf + dab3635e3), aja-c.zsh, ~8 min.
3. **VS** (local_e675f86d): yhteinen14 `_tyo/julkaisija/sokkelo-yhteinen14-207-app` (PK a35c37af5 + VS 957ff9eb8 + LR rengas-v8f c35eca1e8; KÄÄNNETTY 01.25), sokkelo/aja.zsh, parit KK + PT.
4. **KS** (local_16f80454): `_tyo/karttaseppa/karttanostot-207-app` (KÄÄNNETTY 00.56), iPhone 8D1FD618 + iPad 00CF62C2 ~15 min.
5. **LS** (local_7a457b99): `_tyo/linssiseppa/monalisa-zoomi-207-app` (Mona Lisa + askeleet-kaiku d88d7f1e9, KÄÄNNETTY 01.21), iPhone BD64C8E4 + iPad 00CF62C2 ~4+4 min.
6. **NUI** (local_c6d63773): museo-iss-207 (7a45cff6f + 81be0b791) **L2:lla käännöksessä 01.26** → `_tyo/natiivi-ui/museo-iss-207-app` (loki julkaisija-tyokalut/nui-museo-iss-207.log) → KÄÄNNETTY-viesti + simu (seuraava NUI-sessio).

## 2. Valmiina / tiedoksi
- L1: lukko "testflight ajo 39333654702" (TF-ketju, sleep 7200) – ei kaannospalvelun lukkoa vapaana ennen ketjun loppua; käytä L2:ta.
- Viety tänä yönä (0 virhettä): rengas v3, v4 (VANHA – tiedosto muuttui viennin jälkeen), v4b, v5, v6, v7, v8, v8c, v8e, v8f; sokkelo-693 (8), sokkelo-pinnat-v1 (4), taivas-codex-v3 (6), levea-piha (peruttu, ämpärissä käyttämättä).
- 207-yhdistelmät: VS:n 207-haara = linssiseppa2/juoksu-jalki-206 (957ff9eb8 sis. masterin 82e263c79); LR = linnanrakentaja/juoksu-kaukomaisema-rengas (kärki c35eca1e8 v8f); PK = pelikoodari/juoksupeli-207 (kärki a35c37af5).
- NS: juna 207 runko 63713c20d vihreä (ei käännöspyyntöä).

## 3. Opit
- **Tarkista merge masteria vasten**, ei vain pareittain: proto-kaanna mergee masterin päälle; lukituksen jälkeen master sisältää 206:n (yhteinen14 kaatui 94f840dac × master, Jalki.cs).
- Tarkista vientipaketin `shasum -c SHA256SUMS` + tiedoston aika juuri ennen vientiä: LR ylikirjoitti v4:n viennin jälkeen → ämpäriin jäi vanha; vie-paketti ei ylikirjoita → uusi nimi (v4b).
- Lukkojonossa odottavat skriptit käynnistyvät itsestään lukon vapautuessa → kuormarajassa tapa myös odottavat (pkill skripti + proto-kaanna pid).
- Muistiajon gb-arvo pilkulla ("1,96") läpäisee portin (awk lukee kokonaisosan) – ok, mutta raja 0,5 tarkoittaa käytännössä ≥ 1.
