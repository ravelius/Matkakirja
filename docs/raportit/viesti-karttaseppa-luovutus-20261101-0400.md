# Karttaseppä: luovutus 1.11.2026 klo 04.00 (KS local_740947d7)
Edellinen luovutus: viesti-karttaseppa-luovutus-20261031-2325.md. Sen kohdat 3 (koe D) ja 4 (ämpäri) ovat ennallaan avoinna.

## 1. PARIISI: CODEX MAALAA KOKO KAUPUNGIN 1 m/px -PALOINA (PT:n päätökset 03.4x ja 03.5x, KK:n yölupa)
Kulku: pseudo-3D-koe 929cef880 (2 m/px) → saumat OK pienimmän eron leikkauksella → r4-c4 v2 (vaakasauma ja nelikulma OK,
katot puuroa 2×-zoomilla) → 1 m/px -koe q11 c833e3a3f (katot terävät) → **lohko 1 (3×3, 6f70f9e2f) hyväksytty** →
**loput 88 tilattu erinä 2–6 (claude/postilaatikko f093175d0)** (`posti/karttaseppa-codex-pariisi-1m-loput88-20261101.md` + kansio, erat.json); seuraava työ = erän 2 tarkistus, kun Codex toimittaa.
- **Ruudukko** `proto-3d/_tyo/karttaseppa/pariisi-pohja/tulos/palat-1m.json`: res 2 (1 m/px), pala 1536 × 1024, limitys 128,
  askel 1408 × 896, nimet `pariisi-1m-rRR-cCC`. 165 palaa, joista 97 kaupunkipalaa (`codex: true`); loput ovat paperia.
- **Ohjekuvat** `ohjeet-1m.py ohjeet <kansio> rRR-cCC …` (renderoi-g6.py G_VAIN_TALOT=1, 512 px vara, jotta vesimaskit
  täsmäävät limityksissä). 88:n ohjeet ovat kansiossa `codex-pseudo3d/ohjeet-1m-loput88/` ja postikansiossa.
- **Kokoaminen** `kokoa-1m.py <palakansio> r0 r1 c0 c1 ulos.png [ohjekansio]`: saumat pienimmän eron polkua pitkin (DP)
  ja sigma 2 -häivytys. Ympäristömuuttuja `VESIMASKIT=<kansio>` tasaa veden (102,190,207) ja katujen sävyn.
- **Erän tarkistus** (malli `codex-pseudo3d/tarkistus-1m-lohko1-6f70f9e2f/lohko-qa.py`): kooste + ohjekooste, katureunat
  ohjeesta (lohko 1: mediaani 1, p90 4 px), vesi maskissa, tyyli palittain (seinä- ja kattomediaani, terävyys) ja
  nelikulmat 2×. **Vain poikkeamat PT:lle.** Kuittaus Codexille postilaatikkoon jokaisesta erästä.
- Kun kaikki 97 ovat valmiit: koko kaupungin kooste PT:lle. Sen jälkeen maamerkit (Codexin karikatyyrit 184ecedad), puut
  ja elämä (df248de3a) päälle. PT: G:ssä katupuut ja puistot ovat näkyvä osa käsialaa, joten ehdota tekotapa (Codex maalaa
  vai koodi asettaa). Koottu alue pelistä G:n rinnalle → PT → KK ennen junaa. Pelikytkentä (laatat natiiviin/webiin) puuttuu vielä.
- Vanhat r3-c4, r3-c5, r4-c4 ja q11 (2 m/px ja koe) jäävät pois: niiden alueet sisältyvät 1 m/px -ruudukkoon.

## 2. TYÖTILAT
- `/Users/Shared/Claude/wt/karttaseppa-postilaatikko` (haara karttaseppa-postilaatikko-r4c4, seuraa claude/postilaatikkoa;
  pushaa `git push origin HEAD:claude/postilaatikko`). Säilytä, kunnes Pariisi on valmis.
- Tarkistukset: `proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/tarkistus-*/`.
