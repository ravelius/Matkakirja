# Pelikoodari: luovutus 29.10.2026 klo 22.05 (konteksti 35 %, PT:n käsky)

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261029-2115 (PR 5617, 53ec748b4).
Natiivirepon haara pelikoodari/osasarja-215 (worktree /Users/Shared/Claude/wt/proto-pelikoodari-pk7-214, puhdas, pää 5c924489e),
peili natiivi-backup peili/proto/pelikoodari/osasarja-215. Taustaajoja ei ole.

## ENSIMMÄISENÄ (PT 22.0x, koonti katsottu)
1. Kohdan 04 kamera: v73-ajossa kamera katsoo salissa suoraan lattiaan. Selvitä, onko syy havainne-editorin asennossa
   (tyokalut/havainne/editori.sh PAIKKA[04], QA valo sijoita) vai pelin kamerassa (rakennukset-v59: katto tai törmäys?), ja korjaa se.
   Sali 04 on omistajan järjestyksessä seuraavana aukion jälkeen. Vertailukohta: havainne-editori-20261029-203346/04.
2. Osasarjan latauksen todennus: ajo.log:ssa ei ole "palatsi v2: osasarja …" -riviä (ks. Avoinna 1).

## Tehty tänä iltana (21.2x–22.0x)
- CODEX-YHTEISTILAUS lähti 21.2x: posti/pelikoodari-codex-juoksupeli-osat-215-20261029.md (084f144e8; NUI:n halli + KS:n portti 06 liitteinä).
  A1 chiwen, A2 harjaeläimet 10+1 erillisinä, A3 baoding, A4 kannatinryhmät, A5 kaidepylväs, A6 sivupaviljonki; B1 harjanauha, B2 kultainen
  keskiovi, B3 nimitaulu. EI tilattu (juoksupinnat-v1:ssä): 1067–1071, kourutiilikatto.
- Codex toimitti: B1–B3 (dfc883303) ja A3/A5 (3e637ca42; glb:t T7:llä → kopio + purku _tyo/pelikoodari/codex-osat-215/a3a5-v1/, zip-SHA ja
  codex-3d-tarkistus KAIKKI OK). PT kuittasi 3abcdc55b. A6-kysymykseen vastattu 5a46ddeb2 (Tirenge/Hongyige pohja.json:n OSM:stä:
  pohja ~28,4/27,0 × 62,7 m, keskipisteet (111,1, −105,5) / (−104,9, −114,2), julkisivut aukiolle, 27 m). B3 neliö riittää.
  A1: Codexin vanha chiwen ei näytä miekan kahvaa → A1 vielä kesken Codexilla; seuraavaksi A2 ja A4.
- OSASARJA (LR:n kielletty-osasarja-v1): 03d1603fa peli lukee ladonta.json:n "osat"-taulun (pituus, vahennys; kulma-ulko 0,72, kulma-sisa 0
  sijoitetaan, päädyt 0,88) samoin kuin LR:n osasarja_koe.py; MUOTO.md päivitetty; testi LavastajanPaketti (MK_OSASARJA=<kansio>).
  d3585024e koe-*-polut ohitetaan; pintatarkistus: kuvio tripo_mat_* sallittu VAIN polussa juoksupeli-osat-215 (PT 21.5x) ja osasarja
  mukana tarkistuksessa.
- LR v73 koodissa 8a409c0b5 (tausta-v73, rakennukset-v59, c2-v7, muurikate-v26); pintalista: C3_muurikate, C2_marmorikaide_pylvas/_johde,
  C2_vesisylkija sallittuihin; 10 tripo-ID:tä "siirtyma"-listaan (PT 21.5x: poista kukin heti, kun VS nimeää sen pintalajiksi).
- Esto leivottu v73:lla (Taihemenin pohjoismuurit pois) ≠ v14 → palatsi-esto-v16 (5c924489e; _tyo/pelikoodari/kuja05-pk6-20261029/
  palatsi-esto-v16/, SHA 00c6637c…). v15–v15c ovat vanhoja kokeita, eivät käytössä. Peli 772/772.
- Juuri juuri-pk7-v73 (= v72:n linkit + v73-paketit + osasarja-v1 C3/C2-nimin + esto-v16).
- Pariajo v73 (5c924489e, osasarja-kansio): lokit/havainne-editori-20261029-214601/koonti.png → PT. Pinnat 0 vikaa, vanhoja 35 tiedostossa.

## Avoinna (järjestyksessä)
1. OSASARJAN LATAUS EI NÄY ajo.log:ssa (ei yhtään "palatsi v2" -riviä, Debug.Log ei päädy sinne). Tarkista ennen kuin väität ladonnan
   toimivan: Unityn Editor.log esikatselu-2-kopiosta tai QA-raportti (JuoksuSokkeloMaailma.OsasarjaRaportti) skenaarioon; kujan 02
   länsimuurin esimerkkipolku pitäisi näkyä 02-kuvassa vanhan taustan päällä.
2. 04 (sali): kamera katsoo suoraan lattiaan v73-ajossa (rakennukset-v59?). Vertaa 20.33-ajoon (havainne-editori-20261029-203346/04).
3. A3/A5-pariajo (havainne | pelikuva rinnakkain, 9.11/4) odottaa LR:n sijoitusta; B1–B3 odottaa VS:n kytkentää (PT käski molempia 21.5x).
   Aja kun ovat juuressa.
4. Vanhat pinnat ennen "vika"-tilaa (LR:lle ilmoitettu): ulkorengas-v5 V4_stone 24 lod2, kulmatorni-v1b 1, muurikate-v18 C3:n vanha kate 2;
   avoimet-v51 8 (lukittu, jää).
5. Junaan 215 NS:lle: osasarja-215 (sisältää lr-v71, aukio-k23-215, v72, v73, esto-v16) PT:n kuittauksella; JU:n vientiin myös
   palatsi-esto-v16 v73-paketin mukana.
6. NUI tekee kaidepaketin (OsasarjaKaiteetKansio, LOD ≥ 1) omaan haaraansa natiivi-ui/halli-215 osasarja-215:n päälle (lupa annettu).

## Opittua
- ESIKOM: komennot rivinvaihdolla, EI ';' (puolipiste liimasi palatsi url -komennon perään → palatsi ei latautunut, 21.38-ajo hukkaan).
  Valmis skripti: _tyo/pelikoodari/kuja05-pk6-20261029/aja-osasarja-v73-5c924.zsh.
- Peli-testit: `bash kaanna.sh` (ei zsh: sanajako).
- Rakennusten valo: oletus vertailuvalo (ValoKohteet.JuoksuVertailuValo = true) → valo_rgbm:ää ei lueta, UV1 ei tarpeen (vastattu LR:lle).
