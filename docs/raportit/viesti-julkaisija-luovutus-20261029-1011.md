# Julkaisijan luovutus 29.10.2026 klo 10.11 (viikkoraja 97 %, PT:n kiire)

Käytännöt: `docs/raportit/viesti-julkaisija-luovutus-20261026-1601.md` (luku 1) voimassa. Viestit `mcp__ccd_session_mgmt__send_message` id:llä.
Kaikki ajot kirjattu `julkaisija-tyokalut/tf-jono-20261002.txt`. Irrotettu ajo: `python3 julkaisija-tyokalut/irrota.py <loki> zsh <skripti>` (setsid-korvike).

## Tehty tänään
- **Mac-TF 213 VIETY** 40828069082 success 08.21 (b8a92d661, fi.matkakirja.peli, sisäinen). Matkalla: Apple PLA (omistaja hyväksyi 08.12);
  `mac-tf-213.zsh` vaati `MATKAKIRJA_APPSTORE=1 MATKAKIRJA_BUNDLE_ID=fi.matkakirja.peli` (muuten bundle id app.matkakirja.proto3d → workflow hylkää).
- **Ämpäri:** LR v64 08.14 (298) ja LR v65 09.46 (77 uutta + 221): maailma-v4/kielletty-tausta-v65, muurikate-v20, rakennukset-v49, avoimet-v51.
  Osoitin NS:lle; NS: kuja 05 pk7-214 20c32559f junassa 214, runko 890ee26e8, testit vihreät.
- **Mainiin (kaikki vihreinä, `odota-ja-mergea.zsh`):** 5505 (KS v2618), 5499, 5501, 5503, 5509, 5550, 5551, 5559, 5556, 5558, 5508, 5562, 5563.
- **PK:n simuvuorot** (todistukset proto-3d/lokit/todistus-*-20261029-*): pk7v64, pk7v64b, pk7v65 (+uusinta), drone d, e, g, h, h2, i, j, k; kaikki 0 exceptionia.
- **Levy** 23 → 44 Gi: Mac-TF 213 -kopiot, linja1-sisa/Build/dd-laite, PK:n luvalla vanhat appit.
- lautaspoyta 404 = pelin polku (aarteet/ → aarteet799-v4/), PK korjasi rikotut-214 1414ce73e (NUI:n nipussa).

## Kesken luovutushetkellä
- **SK-merge-jono** `sk-5565-5570.zsh` (irrotettu): 5565 → 5566 → 5569 → 5570, päivitys mainin päälle + merge vihreänä; loki `sk-5565-5570.log`.
  Jos katkeaa: `zsh julkaisija-tyokalut/sk-aluetekstit-merge.zsh <jäljellä olevat PR:t>` (mergetyt ohitetaan).
- **Drone l** 9636c167c (`pk-drone214l.zsh`, irrotettu): käännös + simu 145 s, sitten drone-app-b495e4a7f poisto. Loki `pk-drone214l.log`;
  lokikansio PK:lle (todistus-drone214l-9636c167c-*). Uusia simuajoja ei aloiteta ennen viikkorajan nollausta (PT 10.11).

## Avoimet
- LR v66 (portin ovet + lattialaikku) tulee omana eränään PT:n kuittauksella.
- TF vain omistajan pyynnöstä; juna 214 auki.
