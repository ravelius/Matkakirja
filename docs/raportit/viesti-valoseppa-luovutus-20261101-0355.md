# Valosepän luovutus 1.11.2026 klo 03.55

Syy: konteksti yli pehmeän rajan. Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 03.28–03.5x).
Edellinen: viesti-valoseppa-luovutus-20261101-0325.md (työtavat voimassa). Proto-repo on vain paikallinen. Koodi on proton haarassa
`linssiseppa2/k17-piha06-216` (worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k17), kärki **dd0d5d743**:
114fcc7cf (valopaketti o3) + 003c9fd38 + c1b545b2c + 1bf693cdd + bdaa3dedf + e08da1c4c + 3ba3f70bd + dd0d5d743.

## VALMISTA
- **Räystäiden JUURISYY** (`_tyo/linssiseppa2/raystas-tulos.md`): leivonta on kunnossa. Pinta-alalla painotettuna Meridiaaniportin
  julkisivu räystään alla on 0,13–0,17 ja avoin varjoseinä 0,4 (vanha 0,021 oli kolmiomäärän mediaani). Peli kuitenkin piirtää
  Meridiaaniportin LOD0:n osasarja-v3:n **kielletty-c2-v26/a-meridiaaniportti-lod0-kaiteeton.glb**:stä, jossa EI ole valo_rgbm:ää eikä
  TEXCOORD_1:tä (mika: "ei-leivottu"). Sama koskee f-taihemen-, g-jalusta- ja kk-muurikate-v18-pohja-kaiteeton.glb:tä. Kaikki k06-parit
  (myös o3) ovat siis ilman leivontaa näissä malleissa. **LAV:lle pyyntö 03.4x**: leivo kaiteettomat (tai siirrä UV1 ja atlas).
- **c1b545b2c**: QA `valo tayttopeitto <voima> [viite]` (täyttö × lerp(1, saturate(l / viite), voima)), oletus 0 = pois.
  Ei vielä testattavissa, koska julkisivu ei ole leivottu.
- **bdaa3dedf**: mika näyttää materiaalin leivonnan ("LEIVOTTU atlas N" / "ei-leivottu").
- **Taivas 8192** (Codex ebd8b52e0, SHA OK, kuittaus Codexille postilaatikossa 6bd5d14d4): koostaja `JuoksuV4Maailma.TaivasPalat.cs`
  (palat.json → 8192 × 2048 -yläpuolisko, ristihäivytys vaaka + kääre + pysty, zeniitti v2:sta, _PanoraamaYla, QA `valo taivaspakkaus`).
  k06z2: 12/12, ei saumoja, o3-terävyys 760 → **948** (tavoite 1400 ei täyty, havainne 1509), GPU 64 Mt teoreettinen (v2 32 Mt).
  `_tyo/linssiseppa2/taivas-v3-8192-tulos.md`, kuva `lokit/pari-k06z2-20261101-034452/taivas-saumat.jpg`. Palat: `_tyo/linssiseppa2/taivas-v3-8192/`.
  PT:lle lähetetty 03.5x.

## PT:n PÄÄTÖS 04.3x
- Taivas 8192 kuitattu SUUNNAKSI (saumaton, selvästi terävämpi; 948 vs 1400 = pilvien tiheys, ei tarkkuus; KK arvioi reitin koosteissa).
  Ehdot runkoon: iPadin GPU-mittaus (JU:n simu tai laite); pakkaus (`taivaspakkaus 1`) vasta, jos muisti ei riitä.
- Räystäiden juurisyy (kaiteeton c2-glb ilman leivontaa) kuitattu; jatko LAV:n leivonnan jälkeen (kohta 1).

## AVOIMET (järjestys)
1. **Räystäät**: kun LAV toimittaa leivotut kaiteettomat → juureen (juuri-k06f/kielletty-c2-v26 → uusi kansio), aja
   `skriptit-20261031/pari-k06z2.zsh` -pohjalla o3 + p1 (tayttopeitto 1 0.35) ja mika (tarkista "LEIVOTTU"). Sitten o3-pari PT:lle.
   Huom: skenaarion ensimmäinen kuva on ~9 % tummempi (GI/valotus asettuu) → vertaa vasta "odota 20" -kuvaa (o3b).
2. **Reitin valo**: LAV:n leivonta v4 kesken (ks. edellinen luovutus); v4:n pitää sisältää myös kaiteettomat (kohta 1).
3. **Taivas**: PT päättää, riittääkö 948 (sisältöero: havainteessa o3-kulmassa tiheämmät kovareunaiset pilvet) ja muisti
   (iPad-mittaus JU:n simuvuorolla; vaihtoehto `taivaspakkaus 1` ~16 Mt, porrastusriski). Runkoon vasta PT:n ja KK:n jälkeen.

## Työtavat (lisäykset)
- Työkalut: `_tyo/linssiseppa2/tyokalut/suunnat.py` (leivottu valo pintasuunnittain, pinta-alalla), `korkeus.py` (julkisivu korkeuksittain),
  `terav.py` (taivaan terävyys), `taivas_synt_palat.py` (synteettiset palat koostajan testiin). Python numpylla:
  `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/venv-leivonta/bin/python -I`.
- Skenaarioissa `valo vertailu 0` + `valo leivonta 1 1` ennen `palatsi mallit` -riviä (pari-k06z2.zsh).
