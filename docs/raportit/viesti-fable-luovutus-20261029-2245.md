# PT-luovutus 29.10.2026 klo 22.45 (konteksti 30 %)

Edellinen: viesti-fable-luovutus-20261029-2136.md. Tämä voittaa. Keskustelu:
/Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-29-klo-2151-2238.md

## TF 214 VALMIS (omistajan tärkein asia)
- iOS sisäisillä 22.29, ulkoinen ajo käynnissä (JU 40949555880), Mac 22.37. Rivi KK:lle lähetetty 22.4x (jonossa).
- Runko 7162bc1b8, muutosloki PR 5624; Alppien maasto 2 263 884 laattaa, CDN 0 vikaa. NS asentaa pieneen iPadiin (L1).
- Asemataulu: TF 214 -rivi tehty, eteneminen → Juna 215 (lastaus 0).

## Juna 215 AUKI (NS 22c744cb4 = 214 + PK lr-v71 bb7989fb1; testit vihreät)
- LR: v75 ja v76 ämpärissä (v76 = siipihallien C1, portti 06). LR nollattu 22.4x; luovutus adf961c86: siipihallien
  takaseiniin 1071/1070 (PT pyysi: havainne-06:ssa punaiset ristikkoikkunat/-ovet), pari v79 03/03b/06 → PT + KS.
- PK: sali 04:n kamera = yläkamera-päätös 26.10. 23.34 (ei vika) → SISÄKAMERA-ERÄ käynnissä (PT:n ehdot: keisari
  näkyy aina, piiloruudut 0, yhteinen kamerajärjestelmä + kameratesti/ruutuaikavahti). Osasarja latautuu (unity.log).
  PK 35 % → nollautuu editoriajon jälkeen. A2-osien portti ja glb:t LR:lle sen jälkeen.
- VS: pinnat-215 c1906fa90 + aa12b5802 (friisi sininen VAIN aukioon; kujat 02/05 omistajan hyväksymät, ennallaan) ja
  B1–B3 materiaalit 4102feda6 kuitattu. 03b-parissa ei varjoja, kaukolattia vaalea, kamera eri paikassa → valo omistajan
  järjestyksessä myöhemmin kortilla (aukio → sali 04 → 06/07 → kortti valosta).
- NUI: Taihedianin ovet ruskeat → käsketty UV:t: ristikko-ovet 1070, keskiovi V4_keskiovi (1269). Sama kulma → PT.
- KS: nollattu; portti 06 pari + erolistan kohdat 1, 5, 6 LR:n v76:sta (rakennukset-v136).

## Codex (osat 215; posti/juoksupeli-osat-215-v1/)
- Kuitattu postiin (ensitarkistus ok, lopullinen pelikuvaparin jälkeen 9.11/4): B1–B3 (3abcdc55b), A3 baoding +
  A5 kaidepylväs (sama), A2 #1250–1252 (e6558288a), A2 #1253–1258 (43b19000c). A6 mitat PK:lta (5a46ddeb2), Codex kuittasi.
- Auki: A2 douniu, hangshi, chuishou; A4 kannatinryhmät; A1 chiwen miekan kahva; A6 sivupaviljonki.
- PT:n posti-worktree: /Users/Shared/Claude/wt/pt-posti (detached origin/claude/postilaatikko; pull, commit, push HEAD:claude/postilaatikko).

## Muut
- Levy 117 Gi, kasvu ~7 Gi/h (pariajojen juurikopiot, Unity Library); Postivahti siirtää T7:lle < 100 Gi.
- Monitorit odottajavahti + codex-posti-vahti käynnissä (uusittu 22.3x) → uusi PT käynnistää uudelleen.
- ODOTTAA OMISTAJAA: ei mitään.

## Lisäys 22.5x
- LR v77 (_valmiit/juoksupeli-kk-lavastaja-v77-vienti-20261029, SHA256SUMS 4cf00b65: portin nimitaulu 1270, siipien
  takaseinät 1070/1071) EI vielä ämpäriin: kuittaa vasta, kun 06-pari havainne-06 vasten on katsottu täysikokoisena.
- Pieni iPad: suora asennus epäonnistui (lukittu) → saa TF 214:n TestFlightista, ei omistajan toimea.
- JU nollautuu (PR 5626); PR 5627 merge pyydetty Postivahdin kautta uudelle JU:lle.
