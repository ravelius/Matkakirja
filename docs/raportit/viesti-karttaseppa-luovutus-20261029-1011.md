# Karttaseppä: luovutus 29.10.2026 klo 10.11

Seuraava Karttaseppä jatkaa tästä. Muisti: karttaseppa-tila-20261010-ilta.md (UUSIN). Syy: viikkoraja 97 % (PT), tauko 2.11. klo 03 asti.
Kaikki proto-haarat ovat peilissä (natiivi-backup, peili/proto/karttaseppa/<nimi>); taustaajoja ei ole.

## Valmista
- TF 213: merkittavat-213 f5ea99f7f, suomeksi-213 98b9bace8 + 457d05f98 (vain suomenkieliset nimet, leirit pois).
- Juna 214 (runko 72952b7fe): nimet-214 d25b6f69f (nimikoot, pääkaupungit, PARIISI, alueet lähellä, kalusteesteet),
  tasangot-214 de6053ab8 (kermasarja 2026-10-27-p060). Web: PR 5505 (Požega, Rasina), PR 5517 (vie-delta).
- JUOKSUPELIN POHJA pk7 (PT: LOPULLINEN v64:lle): /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kk-pohja-pk7/
  (pohja_pk7.py, kk-pohja-v1d-pk7/pohja.json, SHA256 e8a5b232…69d2). = pk3, jonka levennykset skaalattu mallin mittoihin
  (02 +2,30, 05 −3,80) + kuja 05:n jatko t-porttiin LR:n linjoista (yksikerros-v102 = juuri-v119m), aukko kuja-29:lle,
  t-porttiaukko x −249,2 leveys 4,4. LR kuittasi mallin, PK:n rata OK (pk6:lla; pk7 ajossa PK:lla), PK vaihtaa PalatsiTiedoston.
- Kuja 02 jää ennalleen (KK ja PT 07.4x: peli 4,71 | havainne 4,49 hahmoa). pk4, pk5 ja pk8 hylätty — älä käytä.

## Odottaa
- siirtyma-sse-214 0c14f6d80 (saumakorjaus, siirtymäalueen SSE 8): pienen iPadin suorituskykymittaus, kun omistaja kytkee laitteen.

## Seuraavaksi (ei kiireellisiä, PT)
- Jokinimien harvennus: "Seine"/"Marne" 7–8 kertaa näkymässä → noin yksi per kolmannes ruutua.
- Elävien nimien kaksoisrivit; Alppien sauma Torinon yllä; LIGURIANMERI web-aluenimiin (sitten Nimikerros.LigurianmeriPiiloTaso pois);
  salamasymboli; sävytys 3.

## Työkalut
- LR:n kujamittari: /Users/Shared/Claude/proto-3d/_tyo/venv-ir/bin/python3 …/linnanrakentaja/kielletty-rakennukset/tyokalut/kuja40_mittaa.py
  <tausta-kansio> <pohja.json> (tarvitsee numpyn; järjestelmän python3:ssa sitä ei ole).
