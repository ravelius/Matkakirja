# Pelikoodari: luovutus 27.10.2026 klo 16.23

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus: 3bf5d7259 (-20261027-1529) + 7b154b30c.

## Haara
- Proto `pelikoodari/c2-fg-212` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211), pää 9b97dc324, ei junassa. tarkista.sh 0 virhettä
  (palauta sen jälkeen Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json gitistä). Esikatselut vain linjalla 2 (esikatselu.sh oletus; PT 16.0x).

## Tehty
- **G-portaat pilkottu** (82b3ecf13, PT 15.35): F/G:n <nimi>-1063-portaat.glb pilkotaan ajossa 16 m:n ruutuihin (PilkoRuuduiksi, taustasäie,
  PortaatRuutuM) → F 16, G 18 ruutua, ja näkymättömät karsiutuvat. Editorikuvat proto-3d/lokit/esikatselu-20261027-154111 (G-sivupaikat
  80 20 ja 70 −60 toimivat; 95 −40 osui jalustaan). Harmaat kaukokaiteet EIVÄT ole LOD1:tä (sama ilman LOD1:tä, -154620) → varjo + usva; PT kuittasi.
- **Omistajan päätös 15.41** (eaebd165c): kiinniotto ja rimpuilu juoksun yläkulmasta (JuoksuV4Maailma.KiinniSivukuva = false),
  huohotus vain uupuessa (JuoksuAanet; testi päivitetty, 7/7), repliikit JuoksuAanet.EunukkiKiinni/KeisariRimpuilu
  (hahmoaanet-v2/eunukki-sainpas-sinut.mp3, keisari-paasta-irti.mp3; tiedostoton = hiljaa; JuoksupeliNakyma.KiinniRepliikit: eunukki kiinni
  jäädessä, keisari sen loputtua, katkeaa irti päästessä). Peukalokohdan hehku = NUI:n pohja d09c840d6 (mergetty, a210bfa50); oma halo poistettu.
- **Rimpuiluvideo v2 KK:lle**: proto-3d/_tyo/pelikoodari/rimpuilu-ylakulma-20261027/rimpuiluvideo2-a210bfa50.mp4 (todistus
  lokit/todistus-rimpuiluvideo2-a210bfa50-20261027-1557 OK). Yläkulmasta ottaja peittää keisarin → OMISTAJAN PÄÄTÖS 16.05: kamera ei nouse,
  vaan keisarin kädet rimpuilevat isommin → Codexille lisäys 2251a9eb7 (claude/postilaatikko; d20b95aaf:n v2-tilaukseen).
- **C1-räystäät** (9b97dc324, PT/LR 16.0x): LataaC1 (Muurikate.cs) lukee kielletty-c1-v3/c1-sijoitukset.json (1055 + 1056 A/B samalla
  matriisilla, glTF-matriisi sarakkeittain → S·M·S), palat rakennuksittain LOD0:n mukana (g-taihedian 412, g-zhonghedian 124,
  a-meridiaaniportti 672, f-taihemen 156). Instanssiruutujen rajaus nyt myös palojen paikoista. QA `palatsi c1 0|1`. Juuri LR:n
  havainne-kuja40/juuri-v80m (= v79m + rakennukset-v53 v48:n paikalla + kielletty-c1-v3). LOD0 = v53:n <nimi>-lod0.glb (LR: ei c1-lod0.glb:tä).

## Odottaa / seuraavaksi
1. **C1 kuvina**: räystäät eivät vielä näkyneet kuvissa (lokit/esikatselu-20261027-160108: kamera lattiassa/muurin juurella;
   havainne-editori-20261027-161016: 06 ei näytä räystäitä, 07 liian kaukana). Valitse paikka, josta Taihedianin tai Meridiaaniportin
   räystäs näkyy läheltä (c1 1 vs 0), ja lähetä rivi LR:lle + PT:lle, kun kytkentä on varmistettu.
2. **F-ristiriita**: kielletty-c2-v1:n f-taihemen-lod0-kaiteeton.glb perustuu vanhaan LOD0:aan (ei C1-leikkausta). Kun C2 ja C1 ovat
   samassa juuressa, F tarvitsee LR:ltä v53-pohjaisen kaiteettoman LOD0:n → kysy LR:ltä.
3. JU kääntää laiteversion a210bfa50 (VS:n väreilyvideoiden jälkeen) → LT mittaa A/B `palatsi c2-rak 1` vs 0 G:n luona → tulos PT:lle ennen
   merge-pyyntöä.
4. Äänittäjän otot (eunukki "Sainpas sinut!", keisari "Päästä irti! … Käsken sinua! Päästä irti!") omistajan valinnan jälkeen
   → nimeä tiedostot JuoksuAanet-vakioiden mukaan tai vaihda vakiot.
5. Codex rimpuilu v2 (d20b95aaf + 2251a9eb7) → vastaanotto, hahmot-v8-koe → uusi video KK:lle (simu-rimpuiluvideo2.txt samasta kansiosta).
6. hahmot-v5/v6/v7-koe EI ämpärissä (JU/PK ennen junaa).

## Opit
- zsh: `git push origin $C:refs/...` tulkitsee `:r`-muuntimen → aina `${C}:refs/...` (toistui).
- Pilkonta GlbMalli-tasolla (uudet solmut "ruutu x z" + RakennaSolmuittain) säilyttää jaetut tekstuurit; erilliset Rakenna-kutsut
  tyhjentäisivät g.Kuvat ensimmäisen jälkeen.
