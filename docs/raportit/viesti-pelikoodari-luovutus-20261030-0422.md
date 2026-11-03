# Pelikoodari: luovutus 30.10.2026 klo 04.22 (konteksti ~32 %, Postivahti)

Edellinen luovutus -20261030-0155 (+ lisäys 02.2x, ebc72fc58, PR 5632). Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN 03.35).
Työkansio _tyo = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kuja05-pk6-20261029 (skriptit aja-*.zsh, lokit *.log).
Worktreet: wt/proto-pelikoodari-pk7-214 (haara pelikoodari/lahikuva-215), wt/proto-pelikoodari-lr83-215 (pelikoodari/lr-v91-215).

## TEHTY tällä vuorolla (kaikki junassa 215 tai NS:llä)
- **B2/B3-lähikuvat HYVÄKSYTTY** (KK 03.1x): B2 023816 (ovi) + 025945 (nimitaulu 午門), B3 025619 (keisari terassilla).
  Haara lahikuva-215 **41604ddef** (junassa 135024712): QA `ui juoksupeli valo sijoita X Z [suunta] [lattia m]` (korkea terassi
  G 8,13 m; ilman sitä Puyi jäi terassin sisään, MaaMax 0,8 m) + editori.sh `06 x z suunta [lattia]` ja `LAHIKUVA="K T A F"`.
  HUOM 06-omapaikka: anna ESIKOM "ui juoksupeli palatsi url file://…/kk-pohja-v1d-pk7/pohja.json", muuten sokkelopohja (kujasokkelo kuvassa).
- **LR v93** lr-v91-215 f234bd160 (lahipuut-v8; junassa a279b5b0c), **LR v94** 47734f615 (rakennukset-v79; junassa 3028caa06).
  Molemmissa esto v19 ennallaan (v79-leivonta _tyo/palatsi-esto-v21 identtinen v19:n kanssa), testit 776/776, pinnat 0 vikaa.
- **Pintalista b13fa21a7** (lr-v91-215, rungon 0c735358a päällä): hangshi-pbr, dougong-corner-pbr, dougong-intercolumn-pbr
  (PT:n lupa 04.2x). **EI vielä NS:llä**: PT käski viedä yhdessä LR v95:n kanssa.
- **A6 Hongyige reunatäyttökoe** (PT 03.1x): ei näkyvää eroa → EI peliin (PT kuittasi). Läikät ovat Tripon perusvärikuvassa itsessään.
  Selvitys _tyo/…/a6-reuna/RAPORTTI.md, työkalu _tyo/…/glb_reunatayto.py (8 px + PNG, --ei-normaalia).
- **LR:n Taihedianin lounaiskulma**: v94 040421, v96 041015, v97 035637 (REF 41604ddef, LAHIKUVA="1.5 6 -20 60",
  editori.sh 06 -47 -28.5 67 8.13; skripti aja-lr-taihedian-lounas.zsh [94 96 97]). Lähetetty LR:lle.

## SEURAAVAKSI
1. **LR v95** (PT ilmoittaa, kun ämpärissä): lr-v91-215:een b13fa21a7:n päälle RakennusKansio kielletty-rakennukset-v81/ ja
   LahipuutKansio kielletty-lahipuut-v11/ (korvaavat v79/v8). Esto: leivo v81:llä (Peli-testit kaanna.sh PalatsiEstoLeivonta,
   PALATSI_SISAAN juuri-pk7-v83/kk-pohja-v1d-pk7/pohja.json, TAUSTA …/juuri-pk7-v93/kielletty-tausta-v76, RAKENNUKSET v81-kansio)
   ja vertaa cmp palatsi-esto-v19/esto.bin; eroaa → uusi palatsi-esto-v22 (EstoTiedosto) ja JU:lle vientiin. Testit, pinnat
   (juuri-v93-symlinkit: lisää v81 ja v11) → SHA NS:lle, kopio PT:lle.
2. **A6**: kun Codexin 7-välinen GLB on LR:n paketissa → tarkista läikät; jos yhä perusvärissä → palkkivyö pelin yhteisellä
   palkkimaalauksella (VS:n työ, PT:n linja 03.3x).
