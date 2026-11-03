# Pelikoodari: luovutus 30.10.2026 klo 10.02 (konteksti 36 %)

Edellinen luovutus: -20261030-0928 (PR 5640, auki). Muisti: pelikoodari-tila-20261018-aamu.md.
Työkansio: P = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030
Raportti: P/RAPORTTI-taihemen-taihedian.md, jossa on kaikki löydökset, lähteet ja IoU-luvut.
Postin worktree: /Users/Shared/Claude/wt/pelikoodari-posti (detached; ennen uutta tilausta `git fetch` + `checkout --detach origin/claude/postilaatikko`;
push `HEAD:claude/postilaatikko`).

## TEHTY tällä vuorolla
- **Taihemen 太和门:**
  - taihemen-mitat.json; piirto piirraf.py → taihemen-pohja.png ja -julkisivu-etela.png.
  - Lähteet:
    - [1] DPM 236439: 9 × 4 jännettä, 1300 m²;
    - [2] zh.wiki: 通高 23,8, portaat 3 + 3 + 1 + 1;
    - [3] OSM way/638308745;
    - [4] heikko: 九尺.
- **Taihedian 太和殿:**
  - taihedian-mitat.json; piirto piirrag.py.
  - Lähteet:
    - DPM 236465: 2377 m², 26,92 / 35,05, terassi 8,13, 吻 3,40;
    - zh.wiki: 63,96 × 37, 72 pylvästä.
- **Sivuhallit 中右门/中左门:**
  - sivuhallit-mitat.json; piirto piirrah.py.
  - Katto on **重檐**, koska havainne 03 näyttää kaksi kattokerrosta (havainne03-sivuhallit-rajaus.png). Lähde (zh.wiki) sanoo 单檐.
  - PT/KK 09.5x: kaksikerroksinen on ok.
- **Työkalut:**
  - pylvaat_glb.py: materiaalien rajat y-välillä.
  - mittaaf.py ja mittaag.py: pelin kerrokset ortokuvista.
  - orto.sh: kohteet **f** ja **g**. Ajot lokit/orto-20261030-093921 (f) ja -094303 (g); kummassakin vertailu/.
- **Löydökset** (PT: korjataan 3D-vaiheessa hyväksyttyjen piirrosten mukaan):
  - Taihemenin sivuportaat ovat ±17 m, OSM:ssä ±7.
  - Taihemenin hallin ala on 924 m², lähteissä 1300.
  - Taihedian on 60,9 × 34,1, lähteessä 63,96 × 37.
- **Portti 06, kuvamittaus [K]** (PT 09.5x):
  - Lähde: Commons File:Meridian Gate center.JPG (BrokenSphere, CC BY-SA 3.0), tarkistuksena "…Forbidden City center.JPG" (CC BY 3.0); kuvat P/commons/.
  - Keskiaukko 5,4 × 5,4 m.
  - Sivuaukot 5,1 × 4,6 m kohdassa ±14,3 m.
  - Kerrokset: palkkivyö 19,7–20,9, alakatto 20,9–24,7, yläräystään palkkivyö 24,7–27,9, harja 35,6.
  - Sokkeli ja kulmapaviljonki jäävät [A].
  - Nanjing [N] on vain vertailu.
  - portti06-mitat.json ja piirra06.py on päivitetty. Kirjastossa [K] näkyy vihreänä ja [N] harmaana. Kehys kasvoi: pohja 1830 × 1640, julkisivu 2680 × 1040.
- **Codex-tilaukset postissa:**
  - 2d60c0482: Taihemen + Taihedian.
  - 8fc92fb82: sivuhallit (重檐).
  - f69c370bc: **portti 06 v2**. Codexin v1 (#1299–1300, posti/codex-pelikoodari-mittapiirrokset-portti06-20261030/) on tehty vanhoilla A-aukoilla, joten se ei kelpaa kortille.
- PT:lle on raportoitu kaikki (09.4x, 09.5x).

## SEURAAVAKSI
1. **Codexin portti 06 v2** (posti/codex-pelikoodari-mittapiirrokset-portti06-v2-*):
   - Aja vertailu: `vertaa.py <codex.png> <mittapohja.png>`, tai pelikuvaa vasten: lokit/orto-20261030-092415.
   - Lähetä julkisivu PT:lle kortille.
2. **Seuraavat Codex-toimitukset** samalla tavalla PT:lle: Taihemen + Taihedian, sitten sivuhallit.
   - Huom: Taihemenin ja Taihedianin mittapohjissa ei ole vielä [K]-kuvamittausta. Jos PT haluaa, mittaa samoin Commons-kuvista
     (Taihemenin aukko ja kerrokset).
3. A6: kun Codexin 7-välinen GLB on LR:n paketissa, tarkista läikät.

Taustaajoja ei ole kesken.
