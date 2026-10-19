# Julkaisijan luovutus 19.10.2026 klo 11.4x (päivä)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -120). Edellinen: `viesti-julkaisija-luovutus-20261018-iltapaiva.md`.
Osoitekirja /Users/Shared/Claude/osoitekirja.md (gmail-tili 19.10., kaikki id:t uusia). Viestit `mcp__ccd_session_mgmt__send_message` id:llä. Levy 55 Gi.

## 0. JUNA 204 PYSÄYTETTY (omistaja PT:n kautta 11.4x)
"Käske junan odottaa vielä. Annan muutamia korjauksia ennen kuin juna saa lähteä." → EI lukitusta, EI TF-/web-vientiä ennen
korjauksia + erillistä julkaisupyyntöä. Simujono ja käännökset jatkuvat normaalisti.

## 1. KÄYNNISSÄ NYT (11.46)
- **L1:** VS nostot c08cfa898 (`vs-nostot4-204-kaanna.zsh`, alkoi 11.40) → `_tyo/linssiseppa2/nostot-app`.
- **L1-jono (odottavat taustaskriptit, KUOLEVAT NOLLAUKSESSA → käynnistä uudelleen jos lokit tyhjiä ja prosessia ei ole):**
  1) `lr-kehysvarjo-204-kaanna.zsh` (Lavastaja d0f50ed3f → `_tyo/linnanrakentaja/kehysvarjo-204-app`), odottaa vs-nostot4-lokin "L1 VAPAA".
  2) `pk-mac-nappainlento-204.zsh` (PK MAC 4814ab2d1, mac-kaanna.sh, sama L1-lukko), odottaa lr-kehysvarjo-lokin "L1 VAPAA".
  Tarkista `pgrep -fl "kehysvarjo|nappainlento"`; jos puuttuu: `zsh <skripti> > <skripti-nimi>.log 2>&1` taustalle.
- **L2:** Projektiseppä linna-botti-10 1286d90ed (PJ ajaa itse, alkoi 11.39) → simu omalla 8362879F heti perään (lupa annettu).
- **Simu:** PK:lla SIMU NYT (juoksupeli-kamera-204-app 51f7d225c: kuvapari ⚙+☰ + tekstityskaistale + juoksupelin videot) – PK:n
  viesti oli jonossa, odota PK:n SIMU VAPAA.

## 2. SIMUJONO (PT 11.1x: juna 204 ensin; rinnakkaissimut sallittu)
PK (vuorossa) → VS nostot 4 kierrosta + ennen-video ~32 min (c08cfa898, kun käännetty) → Lavastaja kehysvarjo ~9 min (Punainen
kabinetti + Kunniagalleria, kun käännetty) → KS kamerakirjoittaja (ks. 3).
- NUI: Lennä itse be20092ee PERUTTU (omistaja muutti napit 11.40) → NUI lähettää uuden kärjen; omistajan pyyntö → kärkeen.
- PK MAC näppäinlento: QA-komennon anto Mac-appiin epäselvä → PK kysyy NS:ltä. mac-kaanna.sh:ssa Unity 6000.3.24f1 (iOS-linjat 6000.7.0b5).

## 3. VASTAAMATTA
- KS 11.46: KÄÄNNÖS + SIMU kamerakirjoittaja-kartta-204 579b175c6 (`_tyo/karttaseppa/kamerakirjoittaja-kartta-204/kaanna.zsh <linja>`,
  sitten ajo.zsh iPad 00CF62C2 ~10 min). Anna L2 Projektisepän jälkeen (KS ajaa itse) ja simu jonoon.

## 4. Tänään viety (vie-paketti.sh, 0 virhettä)
taidemuseo-ranska-v2q (31), taidemuseo-louvre-ihmiset-v1/k1.glb (JU teki paketin LS:n _tyo:sta), juoksupeli-hahmot-v1 (3), juoksupeli-maailma-v4 (10).

## 5. Opit
- Simu sammuu roolien kierrosten välillä → `simctl booted` tyhjä ei todista käyttämätöntä vuoroa (VS 11.07, muisti
  simu-kaynnistys-ei-booted-tarkistuksesta). Kysy roolilta ennen siirtoa.
- L2-jumi 08.37: Unity CPU 0,1 %, sim.log seis → PT:n luvalla `kill -TERM <Unity>` → ketjun trap vapautti lukon, uusinta OK.
- Peräkkäiset käännökset: taustaskripti `until grep "Lx VAPAA" <edellinen.log>` ennen lukkoa (ei kahta odottajaa samaan lukkoon);
  kärjen vaihto = TaskStop odottava skripti + sed + uudelleen (vain jos käännös ei ole alkanut).
- Roolien viestit jäävät usein jonoon → arviot venyvät; omistajan odottamat ja juna 204 kärkeen.
