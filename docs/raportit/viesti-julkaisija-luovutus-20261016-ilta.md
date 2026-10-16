# Julkaisijan luovutus 16.10.2026 klo 18.4x (Postivahti: kova raja 35 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150). Edellinen: `viesti-julkaisija-luovutus-20261016-aamu.md`.
Asemataulu (TÄMÄ TILI): https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm (v9, Google-palkki pois). Osoitekirja /Users/Shared/Claude/osoitekirja.md.

## 0. ENSIN (nollauksen jälkeen)
1. Tarkista prosessit: `ps -ax -o pid,etime,command | grep -E 'proto-kaanna|julkaisija-tyokalut|mac196' | grep -v grep`.
   18.46 käynnissä: **`nas-arkistoi-viedyt.zsh`** (viedyt _valmiit-paketit NAS:lle, ~11,5 Gt; tulos nas-arkistoi.log) ja
   NS:n **`mac196.sh e3bc359fe`** L2:ssa (lukko "mac e3bc359fe 18:46"; NS:n oma, ei minun kääre). Jonossa LS1 museo-nimi-197 (LS:n oma).
   Julkaisijalla EI omia kääreitä jonossa.
2. Cron NAS-bundle on session-only: `CronCreate "3 4 * * *"` → `zsh /Users/Shared/Claude/proto-3d/tyokalut/bundle-natiivi-nas.sh >> julkaisija-tyokalut/bundle-natiivi-nas.log`.
3. `valoseppa-vahti.zsh` käynnissä; **valovahti TAUOLLA** (`/tmp/matkakirja-valovahti-tauko`, A26BC7D0 Valosepällä) — poista (mv) vasta Valosepän SIMU VAPAA A26BC7D0:n jälkeen.

## 1. JUNA 196 – VALMIS
- Omistaja 15.39 (KK): juna 196 = 197-runko; 16.02 "Voi julkaista ilman testejä sitten" (muistiajo-196.txt OHITETTU + lisärivi).
- LUKITSE 196 18.0x → lukituskäännös L2 e3bc359fe → KÄÄNNETTY 49c0f0a3e 18.25. BUILD cbf1d288bd685d78…, M b8aac3e35 (#4706).
- TF 38923836532 lähetetty 18.37, sisäinen 38925532169 18.42, ulkoinen 38926163658 + beta-arvio hyväksytty 18.43. Taulu talo/eteneminen 5/5.
- Mac 196: NS ajaa mac196.sh (mac-kaanna.sh vaatii ≥ 30 Gi; levy 33 Gi 18.46).

## 2. TÄNÄÄN TEHTY (iltapäivä)
- Viennit ämpäriin: kori v2 `kartta/ilmapallo/v2/kori_nakyma.glb` (LR), `opas/pallokierros-ateena-v13/ateena.json`, `opas/pallokierros-praha-v7/praha.json` (LS1).
- PR #4707 (Raamattu, Google-palkki peruttu) MERGED f9722e28e (haara jätetty PT:n pyynnöstä); PR #4708 (Asemataulu Google pois:
  html + hae-google.mjs + docs) MERGED f1cc6174e; artefakti julkaistu v9; talo/google ei ollut tietokannassa.
- L2-käännökset LS1 (telakka6–9, aariviiva-197, ateena197/197b, telakointi-k5) ja PK (kori-koydet-197, kori-varjo-197 ×6) — kaikki KÄÄNNETTY, simut kuitattu.
- Levy: 21 Gi 18.3x → L2 seis; TF:n ArchiveIntermediates (6,5 Gt) poistettu TF:n jälkeen; NAS-arkistointi → 33 Gi.

## 3. Simut 18.46
- 00CF62C2 LS1:llä (peking360, junan 196 lukitus-app, ~20 min, lippu 18.35). 96044270, 123B4B25, F7513985 vapaat. A26BC7D0 Valosepällä.

## 4. OPIT (16.10. iltapäivä)
- **Roolit jonottavat L2:een suoraan** (LS1 peking360, Valoseppä omat-varjopuoli, NS mac196): lukituskäännöksen kärkivaraus pitää varmistaa
  tarkistamalla `pgrep -fl proto-kaanna` ja pyytämällä odottajia pysäyttämään ennen lukkoa (ei Unityssa → turvallinen; kill koko prosessiryhmälle).
- Sama haara usein uudelleen (kori-varjo-197 ×6): kääre kääntää haaran kärjen → kärjen vaihto ennen lukkoa ei vaadi toimia; vahvista
  `git -C proto-3d/Matkakirja-proto-kaannos merge-base --is-ancestor <pyydetty> <KÄÄNNETTY>`.
- Ei poistoja muiden _tyo-kansioista (LS:n ateena197-app → LS itse).
- mac-kaanna.sh:lla oma 30 Gi:n raja (L2-raja 22/26) → NAS-arkistointi viedyistä paketeista auttaa nopeasti (`nas-arkistoi-viedyt.zsh --kuiva` ensin).
- Muiden sessioiden SHA-käännökset (3777a3f5b, f9f3ce081, a27706475, 6d2043e0c) vievät L2:n väliin → kääreiden odotus pitenee; monitorit vanhenevat 30 min.

## 5. Levy
33,4 Gi 18.46 (NAS-arkistointi kesken, nousee). Pysäytys < 22 Gi, jatko > 26 Gi; Mac-käännös ≥ 30 Gi.

## 6. AVOIN (PT 18.4x)
- PR #4711 (PT: Raamattu CODEXIN TAHTI + lokit + PT:n luovutus) mergeen CI:n jälkeen, **ei --delete-branch**. 18.47 Testit ajossa; taustaodottaja mergeää vihreänä (jos sessio nollattiin ennen sitä, tarkista `gh pr view 4711` ja merge itse).
