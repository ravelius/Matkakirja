# Pelikoodarin luovutus 26.10.2026 klo 16.13 (TILINVAIHTO, PT 16.13)

Edellinen: viesti-pelikoodari-luovutus-20261026-1434.md (työkalut: -1132.md, TYÖKALUT JA PAIKAT).
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, haarat paikallisia. Worktree /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211.

## TEHTY 14.34–16.13

- **Turkoosit "maassa makaavat" palkit = LR:n mallivirhe**, ei koodi: avoimet-v47/v48:ssa työhuoneen, puutarhan ja varaston
  `palkisto_±2.7` oli mallin origossa (0, 9) eikä hallin keskellä → 12–22 m hallin vieressä kujalla (juhlasali oikein).
  Todiste: editoriajo proto-3d/lokit/esikatselu-20261026-1510 (pa-03, mika (0.65, 0.32): palkisto keski (128.5, 2.8, −775.4),
  katto (116.1, −775.4)). Lavastaja korjasi: **avoimet-v49 rungossa** (juna-211 114803c2e).
- **NS:lle uusi kärki** `pelikoodari/fpv-kallistus-211` = **8909b463f** (2d0455df3 jo rungossa; lisäys db9f6b790 palkisto häipyy
  katon mukana + diagnostiikka d1a35598d, 7f4680c57, 8909b463f). merge-tree juna-211:een ilman ristiriitoja. PT tietää.
  Palkiston häipymistä v49:n kanssa EI ole vielä nähty editorissa (viikko 95 %, ei ajettu).
- Diagnostiikka: `ui juoksupeli mika x y` listaa nyt ensin kameran edessä olevat osumat + rajojen keskipisteen;
  `ui juoksupeli valo katot` näyttää piirtäjämäärän (r3 = katto + palkisto); latauksessa rivi "avoin katto … palkisto → pala".
  Skenaario _tyo/pelikoodari/fpv-211/skenaariot/sk-palkisto-mika.txt (reitti B, mika pa-03/pa-04 kohdalla).
- **Latauskuva**: Codex ei ole vielä toimittanut (tilaus 4dd682937 + täydennys 7e5361656). Rajat-JSONin avaimet kiinnitetty
  postilaatikkoon 5b439369b: posti/latauskuva-valokuva-20261026/KEISARI-RAJAT.json, {koko, keisari, paa, otsikkoTila, leimaTila}
  = [x0,y0,x1,y1] px 2560×1180. Natiivi-UI (latauspalkki 58e3a6ca0) tietää ja odottaa ilmoitusta toimituksesta.
- Lavastajalle Puyin paikka valkoisen viivan kohdalle (video t53.6 ≈ s 311): arvio (125.9, −569.4) kulku +z ±3 m
  (todistus-elavyys-11c3a8202-20261026-1420/konsoli-stdout.log: s 285.6 (138.3, −582.4) −x, käännös ~s 298.8, s 419.6 (82.3, −542.9)).
  Lupasin tarkan paikan editoriajolla (reitti B, siemen 11), jos Lavastaja pyytää.
- Lautaspöytä (8. rikottava) jo rungossa: juna-211 26546d40e = 8380aceca.
- Siivous: 6 viittaamatonta omaa esikatselua poistettu (~540 Mt); levy 91 %.

## KESKEN

- Ei ajoa käynnissä. Editoriajot käyttävät käännöslukkoa /tmp/matkakirja-kaannospalvelu.lukko (vanhentunut lukko poistuu itse).
- Huom: kaksi esikatselua samalla minuutilla jakaa kansion (14.45: NS:n havainne + PK:n pa-kuvat samassa) – tyokalut/esikatselu.sh.

## JONO

1. **Codexin latauskuvat** (kun posti/pelikoodari-codex-latauskuva-valokuva-toimitus-20261026.md tulee): ilmoita NUI:lle
   (local_2cd29bc1-…), vie ämpäriin, aseta LatauskuvaVaakaUrl/PaaMaskiVaakaUrl/VaakaKeisari/VaakaOtsikko/VaakaLeima ja pysty,
   kuvaa vaaka iPhone/Mac/iPad + pysty → PT.
2. **Uusi elävyysvideo PT:lle**, kun LR v48/v49 ja VS acd2dac44 rungossa ja Mac kevyellä kuormalla (simu-elavyys-video-2.txt,
   aani/elavyys.wav ffmpegillä). Tarkista samalla palkiston häipyminen (sk-palkisto.txt v49:llä).
3. Omistajan pelikuvasarja vasta PT:n löydösten 1, 2, 4 ja LR v48:n jälkeen (PT).
4. Kuja-40 odottaa omistajan leveyspäätöstä.

Viikko 95 %: PT:n mukaan ei uusia avauksia.
