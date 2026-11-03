# Pelikoodari: luovutus 30.10.2026 klo 11.41 (konteksti 35 %)

Edellinen luovutus: -20261030-1002 (889a74971). Muistin tilatiedosto: pelikoodari-tila-20261018-aamu.md.
- Työkansio: P = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030.
- Raportti: P/RAPORTTI-taihemen-taihedian.md, jossa on kaikki [K]-mittaukset, menetelmät ja luvut.
- Postin worktree: /Users/Shared/Claude/wt/pelikoodari-posti (detached).
  - Ennen tilausta: `git fetch` ja `checkout --detach origin/claude/postilaatikko`.
  - Push: `HEAD:claude/postilaatikko`.

## TEHTY tällä vuorolla
- **Kuvamittaukset [K] (PT 10.1x/10.2x)**
  - Jokaisessa mitassa on kenttä `tapa` (arviotapa). Kuvat ovat kansiossa P/commons/<kohde>/. Lisenssit on tarkistettu Commons-API:sta.
  - **Taihemen** (t06 panoramio CC BY 3.0; tarkistukset t04 ja t07):
    - Pylväät 4,0–8,0 (peli 3,9–10,3). Alaräystäs 10,0 ja yläräystäs 15,7.
    - Jännejako 3,2 / 5,2 / 5,2 / 5,4 / **7,9** / …, leveys 45,8.
  - **Taihedian** (h04 CC0, Canon 59 mm, ≈ 188 m):
    - Pylväät –13,6 (peli 16,5). Alaräystäs 15,5, yläräystäs 20,8, harja 35,05.
    - Palkkivyöt 65,4 ja 57,6.
  - **Sivuhalli** (s02 N509FZ CC BY-SA 4.0; mittakaava Taihedianista samasta kuvasta):
    - **Kuvassa on YKSI katto**: räystäs 8,3, harja 14,7, pylväät –6,7, leveys 21,0.
    - KK/PT 10.4x: havainteen kaksi kattoa pidetään ja sovitetaan 14,7 m:iin. Välirajat 10,3 / 10,7 / 10,9 [H] tulevat Taihemenin suhteista.
- **Codex-tarkistukset ja -kortit:**
  - Portti 06 v2 (12f8e6240), Taihemen v2 (730ca3532) ja Taihedian v2 (0cb0755c6) täsmäävät [K]-mittapohjiin. Ne on viety PT:lle ja KK:lle.
  - Portti 06 v2 on omistajan kortilla.
  - Kortin kuvat ovat kansiossa P/kortti/.
- **KK 11.2x palautti Taihemenin ja Taihedianin julkisivut.** Mittapohjat on korjattu:
  - **Taihemen:** portaat keskitetty akselille: [−8,85..−5,4], [−3,3..3,3], [5,4..8,85].
  - **Taihemen:** leijonat nimetty, x ±19 [K] (peli ±11), korkeus ≈ 4,0.
  - **Taihedian:** kolme porrastettua tasoa ja kaiteet; 御路-ramppi x ±1,5, portaat ±1,5..3,8 ja sivuportaat ±10,5..16,0 [K].
- **Postin tilaukset Codexille:**
  - 7426bae52 (Taihemen v2)
  - 000013468 (Taihedian v2)
  - d71eab8b0 (**sivuhalli v2**: kaksi kattoa 14,7 m:iin ja ristiriitamerkintä)
  - 2ebad2c2e (**Taihemen v3 ja Taihedian v3**, KK 11.2x)

## SEURAAVAKSI (jono)
1. **Codexin toimitukset:**
   - Odotettavat kansiot ovat posti/codex-pelikoodari-mittapiirrokset-{sivuhallit-v2,taihemen-v3,taihedian-v3}-*.
   - Tarkista ensin `shasum -c SHA256SUMS`.
   - Tee rinnakkaiskuva: mittapohja P/<kohde>-julkisivu-etela.png ylös, Codex alle → P/kortti/<kohde>-pohja-vs-codex-v*.png.
     Mallia voi katsoa tämän vuoron komennoista: PIL, paste allekkain.
   - Vertaa kerrokset, portaat ja leijonat.
2. **Kortille PT:lle** (≤ 3 riviä, polut P/kortti/): Taihemen v3 ja Taihedian v3. Sivuhalli v2 heti, kun se on tarkistettu.
3. A6: kun Codexin 7-välinen GLB on LR:n paketissa, tarkista läikät (vanha jonon kohta).

## Huomiot
- Taihedianin terassin kaksi alempaa tasokorkeutta (3,1 / 5,3) ovat A:ta. Kuvasta niitä ei saatu luotettavasti, koska horisonttimalli on huonosti ehdollistettu.
- Taihemenin jalusta on OSM:ssä keskitetty x −0,75:een. KK pyysi keskittämään vain portaat.
- Taustaajoja ei ole kesken.
