# Julkaisijan luovutus 17.10.2026 klo 22.4x (Postivahti: kova raja 36 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -120). Edellinen luovutus: `viesti-julkaisija-luovutus-20261017-ilta.md`.
Osoitekirja: /Users/Shared/Claude/osoitekirja.md. Viestit `mcp__ccd_session_mgmt__send_message` session id:llä; yhdistä KÄÄNNETTY + SIMU NYT.

## 0. ENSIN (heti nollauksen jälkeen)
- **Juoksupeli (PT kiireellinen, omistaja 22.17):** `julkaisija-tyokalut/pelikoodari-juoksupeli.zsh` kääntää pelikoodari/juoksupeli a3a481f99 **L1:llä**
  → `_tyo/pelikoodari/juoksupeli-app`, odottaa tiedostoa `julkaisija-tyokalut/simu-vapaa-juoksupeli` ja ajaa sitten
  `sk-juoksupeli-harmaa.txt` iPad-simulla (video ~50 s + 3 kuvaa) → `proto-3d/lokit/todistus-juoksupeli-harmaa-*`, arkki `kuva-arkki-teksti-ylla.png`.
  Loki `julkaisija-tyokalut/pelikoodari-juoksupeli.log`. Jos taustatehtävä kuoli nollauksessa: tarkista loki; aja skripti uudelleen
  (kääntää uudelleen, jos app puuttuu). Kun **KS SIMU VAPAA** (taistelu v4, alkoi 22.35): `touch julkaisija-tyokalut/simu-vapaa-juoksupeli`.
  Tulos (kansio + arkki) → PK (local_7fcab04b-…).
- Juoksupeli b bb34dd973 PERUTTU (omistaja 22.32: rata ruudukoksi) — älä aja. Ruudukkoversio tulee PK:lta uutena SHA:na.
- **Galleria arkki 4b:** KÄÄNNETTY 22.56 (fa219040b → `_tyo/pelikoodari/galleria-200-f-app`, varjostimet 0 virhettä); aja simu
  `zsh pelikoodari-galleria200f-simu.zsh` juoksupelien jälkeen (8 kuvaa, vaaka, teksti-ylla-arkki) → PK + LR.
- **KS taistelu-250-v5** (0bf177c8b, pyyntö 22.5x): EI vielä käynnistetty → `zsh julkaisija-tyokalut/karttaseppa-kiina-taistelu250-v5.zsh`
  (L2, `_tyo/karttaseppa/kiina-taistelu-250-v5-app`), sitten KÄÄNNETTY + SIMU NYT KS:lle (iPad ~4 min).
- Juoksupeli a3a481f99 ajettu 22.46 (`todistus-juoksupeli-harmaa-20261017-2246`): kuvat harmaita, juoksu ei alkanut → PK:lle kerrottu.
- **Juoksupeli RUUDUKKO 99a83b3d9** (PK 23.1x: oma varjostin harmaan ruudun korjaukseksi; EI 0b811328a, korvaa a3a + bb34): muokkaa `pelikoodari-juoksupeli.zsh` sha + app-kansio (esim. juoksupeli-c-app,
  era juoksupeli-ruudukko), L1, `touch simu-vapaa-juoksupeli` kun simu vapaa. Skenaario sama polku (siemen 7, ~55 s). Tulos PK:lle.
- **Sitten L1 → PK:n esikatselu.sh** (lähetä PK:lle "NYT"; PK ilmoittaa kun L1 vapaa).
- Levyvahti Monitorina (`zsh julkaisija-tyokalut/levyvahti-l2.zsh`, 30 min, aina uudelleen). Levy 77 Gi 22.10.

## 1. JUNA 200 — iOS VALMIS
- LUKITSE 200 (omistaja 21.43 PT:n kautta "Kohta voisi julkaista" + "Ei testejä"). Osoitin uusin-4 → **v6k26** (CDN täsmää), muistiajo-200 OHITETTU.
- BUILD 200 = 94a8a360c, M = 795a0d97a. TF 200 39061485322 success 22.22 (1. ajo 39061284955 kaatui: L1-kopiossa 3518 irrallista .metaa
  UI/Resources/IssSkanneri → talteen `proto-3d/lokit/tf200-metat-2211`, poistettu; NS commitoi ne junaan 201, haara natiiviseppa/metat-201).
- Sisäinen 22.25, ulkoinen 22.26, beta-arvio hyväksytty, vanhennus 22.27 (199 iOS + Mac).
- **Mac 200** TF 39062841407 success 22.38, sisäisellä ryhmällä (Mac-workflow'n oma askel). Mac-buildeja EI jaeta ulkoisille
  (testflight-ulkoinen.yml vain IOS 11.10. alkaen; muutos = PT:n linjaus). **JUNA 200 VALMIS**, rivi PT:lle lähetetty.

## 2. SIMUJONO / L2 (tila 23.15)
- **Simulla nyt NUI** (omistajan pyyntö 22.52: maakunta-suoraan 65cb17d60 + lasipohja 87945e5ca, ~15 min, 23.06→); NUI kuittaa SIMU VAPAA.
- **LS pyramidin terävä varjo** (omistaja 22.27): orsay-valinnaiset-200 22ce38984 → KÄÄNNETTY ede9300ba 23.11 (LS:n oma odottaja) → LS pyytää
  SIMU NYT (iPhone BD64C8E4 ~4 min) → anna NUI:n jälkeen ENSIMMÄISENÄ (LS odottaa sitä ennen omaa luovutustaan).
- L2 nyt: NUI kehyshaivytys-201 4c52e5b79 (omistajan ehdotus 23.02, 23.11→) → NUI pyytää < 1 min video (Kip + ISS).
- Järjestys NUI:n jälkeen: LS pyramidi → galleria 4b (valmis) → juoksupeli 99a83b3d9 (L1, kääntämättä) → KS taistelu v5 (kääntämättä) → NUI kehysvideo valmiusjärjestyksessä.
- Nyt simulla: **KS taistelu-250-v4** (e1babe602, ~4 min, 22.35→). Sitten juoksupeli (kohta 0). Muut: valmiusjärjestys.
- L2: NUI lasipohja-201 e6b7efe36 (`lasipohja-201-perassa.zsh`, jonottaa vasta kun L2 tyhjä) → NUI pyytää SIMU NYT itse (~6 min).
- LS ja VS pyytävät simuja itse; KS:n taistelukokeet eivät mene junaan.

## 3. TÄNÄÄN TEHTY (19.00–22.45)
- Viennit R2: omat-mallit **v6k25** (19.40) ja **v6k26** (20.30) 53/53; Tivoli **h** → pallokierros-v13 (22.21, 2/2; juna 201).
- PK:n iPad Pro 12.9 -mittaukset: Pariisin intro-oletus 2/2 OK (2640/2579), Cupola-kustannus 2/3/4 (4: `cupola-kustannus4-ipad-20261017-2130`;
  sovelluksen lämpö "Kuuma" heti Cupolassa vaikka thermalState Nominal → rS 0,8, 30 fps).
- Simuajot (todistusajo, iPad 00CF62C2): galleria arkit 1–4, Ranska-arkki, Cupola-kuvaparit 1–3 (`proto-3d/lokit/todistus-*-200-*`).
- KS Kiina v2/v3/v4 + taistelu-250 v1/v3/v4 käännetty (L2), NUI lasipohja ×3, LS Louvre-avaukset 200g–201a, VS k82–k83, valas k13–k15.

## 4. UUDET TYÖKALUT (julkaisija-tyokalut/)
- `arkki-teksti-ylla.py <todistuskansio> <versio> [sarakkeet]` → `kuva-arkki-teksti-ylla.png`: kuvateksti kuvan YLÄPUOLELLA (PK/PT: ei peitä ohjauspöytää),
  tasainen kaista. Lukee `kuvat/raaka/*.png` + `kuvat.tsv`.
- `kierra-vaaka-raakat.py <todistuskansio>`: vaaka-ajon Portrait-merkityt pystyraakat +90° (varmistus; NS korjasi syyn 453628585).
- `pelikoodari-galleria200{,b,c,d,e}-{kaanna,simu}.zsh`, `cupola-kustannus{2,3,4}-ipad.zsh`, `pelikoodari-cupolasuoja200-*.zsh`: mallit seuraaville.

## 5. OPIT
- **Junan lukituskäännös L2:lle: SIGSTOP muut L2-odottajat** (ei lukossa olevaa) → lukitus saa lukon seuraavana; SIGCONT kun `kuka` = lukitussha
  (taustaskripti `until grep … kuka`). NS:n lukitusajo kuoli nollauksessa → **lukitusajot nohupilla/irrotettuna**.
- **TF:n ohitusehdot kaatuu SIGPIPEen**, jos L1-kopiossa on paljon muutoksia (`echo | head -3` + pipefail) → katso `git status` L1-kopiosta.
- Odottava L2-käännös kääntää haaran kärjen lukon saadessaan → "uusi sha" -pyynnöt: tarkista `kuka`; jos ei lukossa, ei toimenpidettä.
- Lukossa olevaa ei tapeta (v2/v3/605a ajettiin loppuun, simu vain uusimmalle).
- PK vs. LR ristiriita galleriassa → LR (arkin tilaaja) ratkaisee.
