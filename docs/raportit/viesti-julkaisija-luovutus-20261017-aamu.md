# Julkaisijan luovutus 17.10.2026 klo 10.15 (Postivahti: kova raja 35 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150). Edellinen luovutus: `viesti-julkaisija-luovutus-20261017-aamuyo.md`.
Osoitekirja: /Users/Shared/Claude/osoitekirja.md.

## 0. TILA
- **JUNA 198 VALMIS**
  - iOS: TF 06.51 → sisäinen 06.55 → ulkoinen 06.56. BUILD d457a1034, M 8fb9c738a (#4775).
  - Mac 1.1 (198): TF 07.03 (NS).
- **JUNA 199 VALMIS** (omistaja 07.13/07.20: uni pois + kaikki aamun pyynnöt)
  - iOS: TF 09.37 → sisäinen 09.41 → ulkoinen 09.42. BUILD 6339b1aec, runko bc228f5d9, M 61697d9a9 (#4788).
  - Mac 1.1 (199): TF 09.50 (NS).
  - 198 on vanhennettu. `muistiajo-199.txt` = OHITETTU.
  - TF 199:n 1. ajo ohitettiin levyrajan takia (29 < 30 Gt).
- **Juna 200 kerää eriä.** LUKITSE 200 tulee PT:ltä. Kun se tulee, pysäytä junan 200 L2-odottajat, kunnes NS:n lukituskäännös on lukossa (`lukitus199-vahti.zsh` on malli; vaihda nimi).
- **Viennit tänään:**
  - Rodin-kolme-haamua (VS)
  - s2-indeksi-v2g (KS)
  - **Peking p361v7 + osoitin piilo/peking/uusin.json → p361v7** (PT:n etusija)
- **Levy:** Data 35 Gi. T7: 460 Gi poster-tyhjennyksen jälkeen (19 → 469).
  - Poster kasvaa ~0,5 G per simukäynnistys.
  - PT hyväksyi tyhjennyksen kerran yössä; Postivahti odottaa PT:n kirjausta KIERROS.md:hen. Muisti: poster-tyhjennys-yolla.md.
- Levyvahti (`levyvahti-l2.zsh`) oli Monitorina, joten se kuolee nollauksessa. Käynnistä uudelleen.

## 1. L2 (10.12)
- Lukossa: VS valas k6 (linssiseppa2/valas-197 ffc8d6a35), 10.08 alkaen.
- Jonossa: NUI kokeet-200 663953c51.
- Valmiit tänään: ks. loki.
  - PK yhteis-199 5c0317ce6, fft-meri a8bc96819
  - KS skanneri-199 76bd052de, väestöpinta bf4e1af32
  - LS pystyvipu, kompassi, veistokset-200
  - NUI lasi-kartta, kamerapöytä-200, uni-v2
  - VS k65, k4, k5, aamukaista ×2, V4p3

## 2. SIMUJONO (yksi kerrallaan; SIMU NYT viestillä)
Nyt käynnissä: VS (aamukaista ✓ → V4p3 → k66). Sen jälkeen:
1. **KS väestöpinta iPad 00CF62C2 ~4 min** (omistajan kokeilu, app kiina-vaestopinta-208-app). VS:ää on pyydetty antamaan SIMU NYT KS:lle suoraan.
2. VS aamukaista-uusinta iPad A26BC7D0 ~12 min (korjattu kamerakulma).
3. PK fft-meri 96044270 2 × 5 min (app raketti-meri-200-app).
4. VS k6 ~15 min (kun käännetty).
5. NUI: kehys-kaaro iPhone ~4, uni-v2 iPad ~5 ja kokeet-200 -pari iPhone ~8 (jos käännetty).
6. LS veistokset200 3. ajo iPhone ~12 min.

## 3. OPIT
- **Muiden roolien appeja EI poisteta** (PT 09.4x). Levyrajan tullessa vastaan ilmoita PT:lle. Poistin 9 vanhaa (NUI 197 ×6, PK yhteis-198, NS 198 -kopiot) ja ilmoitin niistä.
  - Poikkeus: TF:n oma DerivedData (~6,6 G per TF-ajo) poistetaan TF:n jälkeen.
  - Muisti päivitetty: ei-poistoja-oman-tyotilan-ulkopuolelta.
- **Simu jäi kahdesti tyhjäksi** (03.55–04.27 ja 07.07–07.23), koska SIMU VAPAA jäi saapumatta tai myöhästyi. Pyydä aina "SIMU VAPAA minulle". Tarkista `simctl list devices | grep Booted`, jos simulla on hiljaista.
- Roolit käynnistävät L2-odottajia itse. PT:n järjestys pidetään SIGSTOP/CONT-pidolla (`until grep … kuka; kill -CONT`).
- `tf-kaynnista.sh` ei tarkista levyrajaa (30 Gt). Tarkista `df -g` ennen ajoa.
