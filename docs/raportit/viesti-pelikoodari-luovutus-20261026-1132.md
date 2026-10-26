# Pelikoodarin luovutus 26.10.2026 klo 11.32 (konteksti 34 %, odotan LT:n laiteajoa)

Edellinen: viesti-pelikoodari-luovutus-20261025-1343.md (ei tarvitse lukea). Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto,
haarat paikallisia. Esikatselu: `zsh /Users/Shared/Claude/wt/proto-pelikoodari-raystas-210/tyokalut/esikatselu.sh <SHA> <skenaario> [ipad-pysty]`
taustalle (jonottaa L1-lukkoon itse; tulos proto-3d/lokit/esikatselu-<aika>/). Arvio: `grep -E 'PELAAJA PIILOSSA|mittari: t (120|180) s' unity.log`.
Kuvaparit PIL:llä (korkeus 700–1200, 16 px musta väli); scratchpadin skriptit eivät säily.
L1-sääntö: kun JU ilmoittaa TF-etusijasta, ei uusia Unity-ajoja ennen JU:n lupaa. metal-tarkistus.sh EI ajeta (PT 26.10.).

## TEHTY JA KUITATTU (25.–26.10.)

- **Aukio 03:n kiilat** = tausta-v50:n leivottu valo (katoavat `valo leivonta 0`:lla) → LR tausta-v51 (tehty). Kuvat
  proto-3d/_tyo/pelikoodari/raystas-210/aukio03-leivonta-paalla-pois.jpg, aukio03-varjot-v1-v0.jpg.
- **Kujaportti v43** kuitattu (kolmikko raystas-210/kujaportti-kolmikko-v43.jpg).
- **Lautaspöytä 8380aceca** kuitattu junaan 211 (pelikoodari/lautaspoyta-kuvaus-210; posliini sävy 0,8, lentävät sirpaleet 0,62).
  NS:n 211-jonossa, cherry-pick 4e61563f5..8380aceca onnistuu ilman räystäskameraakin. Pari
  _tyo/pelikoodari/lautaspoyta-04/lautaspoyta-pari-8380aceca.jpg (PT: omistajalle vasta räystäskameran kanssa).
- **Turkoosi tanko** (lautaspöydän kuvan yläreuna): ei pelikoodia eikä rakennusmallia; mika-luotaus osuu vain yhdistettyihin
  verkkoihin (kk-tausta-1-3, muurikate, korttipuut) → LR:n tarkistettavaksi (turkoosi-tanko-1427.png).
- **Räystäskameran laitepiilot** (LT 4b4864d28: aukio 563, sisätila 402): syy kolme taustaan leivottua porttihallia reitillä
  (t-portti-m15 / -120 / -m216) ja niiden 5 m:n umpijalustat. LR: v52/v44 (hallit irti) → v54/v46 (jalustat lähteen korkeudella,
  portaat + keskiovi, reitit S-N nousevalla y:llä). Editorissa v54: porttihallien piilot 0, A 43 / 180 s, B 28 / 120 s (vain vanhat
  kohdat avoin työhuone + puutarha). Raportti raystas-210/raportti-laitepiilot-20261025.md (kaikki vaiheet), kuva laite-b-v54-portti.jpg.
- Siivous 25.10.: 365 viittaamatonta esikatselukuvaa (2,6 Gt) pois, haara raystas-testi-v42 poistettu.

## JONO

1. **ODOTTAA: LT:n laiteajo 957cc6a4b:llä** (LR:n osoitin, sisältää räystäskameran 4b4864d28 + v54/v46; NS ottaa 211-runkoon).
   Viestit lähetetty PT:lle ja NS:lle 11.4x. Vihreä = PT kuittaa räystäskameran. Jos punainen: lue LT:n raportti
   (Matkakirja-laitetestaaja/docs/raportit/), toista editorissa skenaarioilla (alla), korjaa.
2. **LT vihreänä → kolmikot PT:lle** (PT 11.4x; KK → omistaja): aukio 03 (havainne | 810 | kompromissi; havainne = NUI:n 03b-kuvan
   vasen kolmannes, tausta-v51+), kujaportti (ennen 1225 kp0-09 | jälkeen | sisääntulo), porttihalli (laite-b-v54-portti.jpg:n
   tapaan). Sitten lautaspöydän pari. LR tekee pinnat (marmori, varjokaista, punainen kiila) v55/v47:ään – kuvat sillä, jos ehtii.
3. **Kuja-40** (odottaa OMISTAJAN leveyspäätöstä; EI NS:lle ennen sitä): haara pelikoodari/kuja40-pk3-210, ohjeet edellisessä
   luovutuksessa (20261025-1343, kohta 4).

## TYÖKALUT JA PAIKAT

- Testihaara `pelikoodari/raystas-testi-v43` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-raystas-testi-v43): kärki e032b2d33
  (räystäskamera + v54/v46). Vanhemmat: 31b8633a4 v43, 9dd83fdc1 v52/v44, e6a997b9a v53/v45.
- Paikalliset paketit ennen vientiä: `ui juoksupeli palatsi mallit file:///Users/Shared/Claude/proto-3d/_tyo/pelikoodari/paikallinen-v4/`
  (symlinkit kaikkiin _valmiit/*/juoksupeli/maailma-v4/*-kansioihin; uudet: aja sama ln -s -silmukka, ks. tämän tiedoston historia).
- Skenaariot raystas-210/skenaariot/: sk-laite-b.txt (LT:n reitti B, alku −147.5,420, siemen 11, 30 kuvaa portin kohdalla),
  sk-laite-a.txt (reitti A, siemen 116562, 180 s, ei kuvia → "VIKA kuvia ei syntynyt" on odotettu), *-paikallinen.txt = sama + paikalliset paketit.
  lautaspoyta-04/skenaariot/sk-lautaspoyta-04g.txt (pari), -04h.txt (+ mika-luotaus).
- Koordinaatit: mittarin maailma ≈ (−pohja_x + 1, −pohja_z − 390) palatsin alueella; `ui juoksupeli paikka` antaa Puyin pohjan.

## LISÄYS 11.4x (NS)

LT:n laiteajo rakennetaan ehdokkaasta natiiviseppa/juna-211-raystas = 7c78b3a9a (211-runko 176e10cc1 + 4b4864d28; puu = 957cc6a4b + MetalTarkistus-korjaus). Testit ja laite n. 11.45 jälkeen, sitten asennus LT:lle; runkoon PT:n kuittauksella.
