# Natiivisepän luovutus 2.11.2026 klo 14.30 (konteksti 29 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261102-1325.md (PR 5984, tämä korvaa sen).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. Rungon 23b37d035 testit läpi ja peili ajan tasalla (14.40). Käynnissä:
laitekäännös 254ecdc65 (= runko 1780f8198 ilman kipinöitä ja salia).

## JONO
1. **Pieni iPad (omistajan laite): asennus VAIN, kun KK välittää omistajan luvan** (PT 14.4x). Ehdot: Liiku ✓, sillat ✓,
   vieritys ✓, KS:n kipinät ✓ (23cc5ad48); kesken NUI:n panorointi → mergeä se ensin PT:n kuittauksella, sitten käännös ja asennus
   `juna213/pieni-ipad.sh <sha9>` (prosessitarkistus: ei asenneta, jos peli on omistajalla käytössä). Pienellä iPadilla
   ei todistusajoja ilman KK:n lupaa; Ison iPadin mittaus riittää (PT).
2. **VS:n/NUI:n/KS:n merget** sitä mukaa kuin PT kuittaa (PT:n "MERGEPYYNTÖ" + SHA; tarkista media ämpärissä curl -I:llä,
   jos commit vaihtaa TasoVersio/LeikeVersio/SiltaVersio-kansion).
3. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus kuten 217: tagi `natiiviseppa/runko-218-tf`, peili, TF-tilaus JU:lle
   "kaikille", rivi PT:lle. Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".
4. **Odottavat (edellisestä luovutuksesta, tila tarkistamatta tänään):** LAV rakennukset-v95 ei runkoon ennen PK:n
   eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n leikehaara 7280634c4 EI.
5. **Pariisin vieritys, osa 3 EI NYT** (PT 14.4x): valmiiksi pakatut laatat (uusi TasoVersio, JU vie PK:n vahvistettua
   viittaukset) vasta, jos omistaja huomaa nykimistä. Jäljellä ~11 ms/laatta GPU-pakkausta pääsäikeessä.
6. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- **TF 217 testaajilla** (runko 60bd5c356, tagi natiiviseppa/runko-217-tf).
- **Juna 218 runko = 23b37d035** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218). Tänään 8aa129301:n jälkeen:
  PK Yangxindian-sali b0fd44819 (f4d65d024); NUI piirros-tahdet a24a6acd8 (tähdet, info/kioski, ydin, haamu2/3) → 2628a14e0;
  NUI 394a5b467 (aarrepiste lukittuna piiloon, pallo ei hypi, kutsukortti pois, nimet) → c9ca94fc7; NUI Liiku 11492e364 →
  f5afb5164; NS vieritys osa 1 c4867180f → e35202ec0; NUI sillat + KS hehku pois d7b4244c5 → c7c3ffa2a; NS vieritys osa 2
  254ecdc65 → 1780f8198 (testit 2223/793/586, tarkista 0, peili); KS kipinät 8e64a1db3 → 23cc5ad48; VS sali b1a8aa3da
  (katon varjo, valojuovat, maavalo 0,3) → 23b37d035 (testit 2223/793/586, tarkista 0, peili 14.40).
- Kansiot rungossa: rakennukset-v98, tausta-v100, palatsi-esto-v25, c2-v34, muurikate-v38, osamallit791-v10; piirros
  TasoVersio haamu3-20261102, LeikeVersio leikkeet-20261102, SiltaVersio leikkeet-sillat-20261102.
- **Pariisin vieritys (omistaja 13.19) tehty, osat 1–2 runkoon:** PiirrosKerros.Striimi.cs (pallon tileset seis ja
  renderöijät pois, kun piirros peittää; takaisin heti kulman/korkeuden/kytkimen muuttuessa, kaupungin aikana ei kosketa),
  verkot vain georeferenssin muuttuessa, PiirrosKerros.Purku.cs (iOS ImageIO-purku taustalla, ≤ 1 laatta/ruutu).
  Iso iPad, 10 × 0,9 km panorointi: yli 20 ms ennen 123 → osa 1 20 → osa 2 8; p99 125 → 58 → 17,3 ms.
  Lokit proto-3d/lokit/natiiviseppa-piirros-vieritys-{ennen6,jalkeen4,purku1}-20261102.
- **Mittausskripti** proto-3d/tyokalut/natiiviseppa-skriptit/juna218/piirros-vieritys218.sh `<kansio> <sha9> [UDID]`
  (äppi lokit/natiiviseppa-app-210-runko-<sha9>-laite). HUOM: ei veto-komentoa (0,1 ruudun veto heitti kameran 30–100 km)
  eikä vaakakiertoa; panorointi aja-komennoilla. aja-komennon leveys on kaariasteita (0,01 = lähin taso).
- Laiteäpit valmiina: 52ba93dea (ennen), 85b763f8d (osa 1), 34fd2a0ce (osa 2), 254ecdc65 (= runko 1780f8198, jos käännös
  valmistui; tarkista lokit/natiiviseppa-app-210-runko-254ecdc65-laite).
- Pieni iPad (iPad Pro 11, 00008142-0019686E02F3801C): asennettuna 52ba93dea (12.33).
- Asemataulu: junat.json "Juna 218" -rivit apuskriptillä (tee uusi samanlainen kuin vanha scratchpad/taulu218.py).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -muisti, -tyokalut, -koe67, -varjo eikä T7-kopioita. -striimi (haarat piirros-striimi-218 ja
  piirros-purku-218, molemmat runkoon mergetty) saa poistaa.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~4 min; älä mergeä työpuuhun testien aikana; peili käsin:
  git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/juna-218).
- Laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`
  (commit peiliin ensin; ~8 min).
- Puhtaus `git merge-tree --write-tree HEAD <sha>`; tarkista rc=1 tai testi punainen → korjaus tekijän haaraan.
