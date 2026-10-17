# Natiivisepän luovutus 17.10.2026 klo 09.5x (Postivahdin KOVA RAJA 40 %)

Lue ensin: CLAUDE.md, Raamatun Ydinajatus kohta 2 ja tämä kokonaan. Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt.
Jonot (lopusta alkuun = uusin tila): natiiviseppa-skriptit/juna200/jono-200.txt (AVOIN), juna199/jono-199.txt (valmis juna), juna198/jono-198.txt.
Viestit AINA session id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md (PT = local_5df52e10-…). PT:lle ≤ 3 riviä.
Omistajan pysyvä päätös 16.10. 22.24: kaikki vain YHTEEN avoimeen junaan (nyt 200).

## TILA

- **JUNA 198 VALMIS:** BUILD 198 = d457a1034 (runko d7d9af99c), M = 8fb9c738a (#4775). iOS TF 38999461924 (JU), Mac TF 39000823180 SUCCESS.
- **JUNA 199 LUKITTU 09.26:** BUILD 199 = 6339b1aec2e1a360a21824297a239bcb1f52fbe5 (proto master; juna/b27 = runko bc228f5d9,
  lukituskäännös b0baaa978 L2, unity 0). M = 61697d9a9 (#4788, korvasi #4778:n). iOS TF -ajo 39009928639 (JU).
  **Mac 1.1 (199) TF-ajo 39011025818 KESKEN luovutushetkellä** → `gh run view 39011025818 --repo ravelius/Matkakirja` → tulos JU:lle + PT:lle.
  Sisältö: uni pois (omistaja 07.11/07.13/07.20: juna 200 yhdistettiin 199:ään), Kiina pelaajille (Kesken = false), Louvren Nike + Venus
  (LR, sali v2d), LS Louvre + SS äänet + LS Louvre-SK (manifest-199), luennat v7, NUI seepia + ISS-levennys, KS ISS-himmeä + skanneri viivoilla
  (IssSkanneri 4,6 → 37,8 Mt), PK yhteis + latauskuvat v2 + utm, LS pystyvipu + listaton vapaa lento + leveä kompassikeila (69178ded7 peruttu).
- **JUNA 200 -runko** natiiviseppa/juna-200 (wt/proto-natiiviseppa-ehdokas) = **003a238d1**, testit AJOSSA luovutushetkellä
  (`zsh …/juna200/testit200.sh`; edellinen vihreä 67e8d3e87 Linssit 1988, Peli 592, Kartta 499). Pohja bc228f5d9 (lukittu 199).
  Sisältö: PK valoisa-kohde 3faa6ffcd, PK antimeridiaani 27b4a5292, PK S2-indeksi v2g dc177cc58 (v2g ämpärissä 200).
  **dc177cc58 yhdistetty kuitatun 27b4a5292:n jatkona – kerro PT:lle testitulos + tämä.** Lukitus vain PT:n viestillä.
- **Lukitustyökalut 200:** kopioi juna199/ (lukitse199-ajo/-a/-b.sh, mac199.sh, build199-viesti.txt) → juna200/, vaihda 199 → 200, juna/b27 → b28,
  master-tarkistus 6339b1aec, BUILD 198 → BUILD 199. Muutosloki 200 PT:n kuittaamana → main-PR (tools/uusi-worktree.sh; vanha
  wt/natiiviseppa-muutosloki-198 käytettävissä, haarat mergetty) → M ennen lukituskäännöstä.
- natiiviseppa/pika-199 (wt/proto-natiiviseppa-juna197, 2a88976e4) jäi käyttämättä (pikakorjaus peruttiin); työtila voi palvella 201:tä.
- Unity-beetaseuranta CronCreate oli istuntokohtainen → luo uudelleen "4 9 * * *" (unity-julkaisut.py).

## OPITUT 17.10. AAMU

- Kuitatun erän SHA voi tulla "PT kuittasi" -viestillä roolilta: vahvista PT:ltä, ellei PT ole jo nimennyt samaa erää.
- Erät, joissa testikorjaus on tehty myös rungossa → ristiriita testirivillä; ota se rivi, joka näyttää luvun (Oleta.Sama).
- JSON-ristiriidat (veistokset.json): yhdistä kentittäin pythonilla (`git show :2:`/`:3:`), älä rivitasolla; säilytä indent 1 ja loppurivinvaihto.
- Peruttava commit, jota ei ole pushattu, korjataan --amend; pushattu → `git revert`.
- Levyraja (mac-kaanna 30 Gi): omat vanhat kopiot lokit/natiiviseppa-app-*-lukitus-sim ja mac-tf-* pois (2 uusinta + käytössä).
- lukitse-b:n peilipush voi kilpailla (peili/proto/master jo uudessa SHA:ssa) → tarkista ls-remote, pushaa juna/bNN-peilit erikseen.
- Kiina-muutoslokiväite tarkistettiin koodista (Kesken) ennen kirjoitusta: muutoslokin faktat aina rungosta.

## TYÖTILAT

wt/proto-natiiviseppa-ehdokas (natiiviseppa/juna-200 – AKTIIVINEN), wt/proto-natiiviseppa-juna197 (pika-199, vapaa),
wt/proto-natiiviseppa-unity-b5 ja -unity67 (T7, ei poisteta), wt/proto-natiiviseppa-tyokalut (YHTEINEN – ei poisteta; SS:n todistusajo-korjaus
d6578a2cc on junassa 199 proto-repossa, ei vielä tässä työtilassa), wt/natiiviseppa-muutosloki-198 (main-haarat, voi käyttää).
Appit: lokit/natiiviseppa-app-199-lukitus-sim, lokit/natiiviseppa-mac-tf-199 (196–198 poistettu levyrajan takia, JU poisti 198:n).
