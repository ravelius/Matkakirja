# Julkaisijan välitallennus 20.10.2026 klo 13.58 (Mac Studion uudelleenkäynnistys, omistaja 13.57)

Edellinen: `viesti-julkaisija-luovutus-20261020-1047.md`. Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -60).
Osoitekirja /Users/Shared/Claude/osoitekirja.md; viestit `mcp__ccd_session_mgmt__send_message` id:llä.

## 0. ENSIN uudelleenkäynnistyksen jälkeen
1. Tarkista lukot `/tmp/matkakirja-kaannospalvelu{,-2}.lukko` (pitäisi olla poissa) ja ettei Unity/simuja ole käynnissä.
2. **VS juna 209 Louvre-atlas af60d60f8** (paketti taidemuseo-ranska-v2r JO ämpärissä 13.55): `cd /Users/Shared/Claude/julkaisija-tyokalut; nohup zsh vs-louvre-atlas-209-kaanna.zsh > vs-louvre-atlas-209.log 2>&1 &` → KÄÄNNETTY + SIMU NYT VS:lle (vain iPhone: Horatius + madonna + Kythera, parit vain PT:lle). Käännös pysäytettiin 13.58 kesken.
3. **PK ilmestymiset-208 e707a2475** (L2 → _tyo/pelikoodari/ilmestymiset-208-app, ~15 min) → SIMU NYT iPad + iPhone (juoksubotti, PT: näkyvyys/suorituskyky = tekniikkaa).
4. **TKS esikatselu ajo 5** (korjaus 589133cc0, ~10 min, L1-lukko): anna UNITY NYT kun TKS pyytää.

## 1. Linjaukset tänään (sitovat)
- Juna 208: EI TF:ää ennen PT:n "OMISTAJA PYYSI JULKAISUA" (omistaja 09.47).
- Omistaja 11.45/11.47: simu VAIN uudelle tekniikalle (varjostin/valaistus, ohjaus/kosketus, puhelimen toiminnot, suorituskyky/muisti, käännösputki), omistajan pyytämiin kuviin ja yöjunan laitekierrokseen. Muut automaattisten tarkistusten (+ Mac-esikatselun) jälkeen suoraan junaan.
- PT 11.3x: omistajan odottamat aina ensin; 2 simupaikkaa sallittu (linna tauolla); raskaat (Pariisi/Tukholma/Olavinlinna) yksi kerrallaan, muisti ≥ 20 %; roolin ajamaton tunniste jonossa → rooli korvaa tai peruu, vanhentuneita ei käännetä.
- PT 11.4x: levy < 70 Gi → vain 1 käännös simujen rinnalla. Muistuta "omat appit ≤ 2".
- Omistaja 12.38: fyysinen iPad Pro 13 vain NS:lle ja omistajalle (NS asentaa vihreät 208-rungot, KK kuittaa); muut vain KK:n vahvistuksella.

## 2. Tänään tehty (10.47–13.58)
- Ämpäri: kk-tausta-peking-v4 (64), palatsi-esto-v2 (1), kielletty-rakennukset-v12 (49), taidemuseo-ranska-v2r (31) – kaikki virheitä 0.
- Simut ajettu: PK 208v10 + 208v11b, NUI vuoro 1 (yhd3 + nimet 208d + stillit), VS Louvre 208c, 28bc7aacc (k4b), k5, k6, k7 (db430a614). NUI yhd3b/208e simu PERUTTU (omistaja 11.45).
- _tyo/julkaisija: jäljellä louvre-varjo-208g-app (k7) + louvre-atlas-209-app (kesken), vanhat poistettu.

## 3. Opit
- Kaatunut esikatselu/käännös jättää lukon, jossa kuollut pid: proto-kaanna.sh poistaa sen itse jonossa (`kill -0 pid`).
- NS:n laitekäännökset (ketju208) eivät kirjoita kaannospalvelu-kansioon → älä päättele "ei käynnistynyt" sen perusteella; kysy NS:ltä.
- Käännöksessä olevaa ei vaihdeta; uusi sha eri kansioon (…-208c-app) tai lukkojonossa vaihto (kill skripti + proto-kaanna-pid).
