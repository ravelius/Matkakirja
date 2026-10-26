# Julkaisijan luovutus 26.10.2026 klo 16.16 (TILINVAIHTO, PT 16.13)

Vain voimassa oleva tila (Raamattu 7.22). Historia: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80).
Edellinen luovutus (käytännöt, luku 1): `docs/raportit/viesti-julkaisija-luovutus-20261026-1601.md` – voimassa sellaisenaan.
Osoitekirja /Users/Shared/Claude/osoitekirja.md; viestit `mcp__ccd_session_mgmt__send_message` session-id:llä.

## 0. TILA NYT
- **TF 210 ULKONA** (iOS 40290323441 sisäinen + ulkoinen, Mac-TF 40191669019). Juna 211 auki (NS natiiviseppa/juna-211, b6).
- **KÄYNNISSÄ: KS:n 4fccd2490 L1:llä** (alkoi 16.13; ensimmäinen ajo kuoli 16.03 sessionollauksessa, käynnistetty uudelleen
  nohupilla). Skripti `julkaisija-tyokalut/ks-elava-ipad2-kaanna.zsh`, loki `ks-elava-ipad2-kaanna.log`,
  app → `proto-3d/_tyo/karttaseppa/elava-kartta-app`. **Kun loki sanoo KÄÄNNETTY: KS:lle (local_eec7f158-…) tulos +
  "SIMU NYT 00CF62C2"** (~12 min). KS ajaa ennen-osan tripo-vertailu-appilla ja jälkeen-osan 4fccd2490:llä; d7e3df9de:tä
  (käännetty 16.03) KS ei asenna. SIMU VAPAA tulee KS:ltä molempien jälkeen.
- **Mergevahti (tilinvaihto):** `julkaisija-tyokalut/luovutus-prt-mergea.zsh` mergeää 16.10 jälkeen avatut luovutus-PR:t
  vihreinä (odota-ja-mergea.zsh) 16.41 asti. Uusi sessio: tarkista `gh pr list` – jääneet luovutus-PR:t mergeä samoin.
- **Ämpäri, linjat, simut, valoseppa-vahti, levy:** kuten 16.01-luovutuksessa. Levy 115 Gi (16.14). L1:n Library b6.
- **Mergetty tänään tämän jälkeen:** #5248 (edellinen luovutus, cdbb8b21b), #5249 (PT:n siirtoprompti, 359a97be8).
- **Checkoutin jäämät siirretty** (ei poistettu): `julkaisija-tyokalut/talteen-checkoutista-20261026/`
  (settings.local.json.bak, .ennen-kevennysta, .wrangler/, levyvahti-pysaytetyt.txt).
- Lukkovahti: Monitor `zsh julkaisija-tyokalut/lukkovahti.zsh` (30 min, viritä uudelleen).
