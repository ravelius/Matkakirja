# Natiivi-UI: luovutus 27.10.2026 klo 15.55

Rooli Natiivi-UI (Opus). Konteksti 34 % → luovutus. Ei keskeneräisiä muokkauksia (kaikki committoitu proton haaroihin).

## Valmiit 14.35 jälkeen
- TIETOKORTTI (omistaja 14.39, vain 1. kappale + väliotsikoille tilaa): proto natiivi-ui/tietokortti-nakyma-212 60cfa418d junassa 212
  (15d1f89f9). Näkymä ei puolita johdantoa (Tietokortit.Kappaleet, ei Kappalejakoa), väliotsikolle .mk-nosto__teksti--valiotsikko
  (--tk-vali-s). Johdannon leikkaus on KS:n 828cf3708:ssa. PT ja KK hyväksyivät B1–B5:n:
  proto-3d/_tyo/natiivi-ui/tietokortti/kuvat-60cfa418d/kooste-B1-B5.png; t5-näyte kuvat-t5-ad9759bc6/ (2. kysymys toistaa yhä
  tekstiä → KS).
- KARTTA-VÄLILEHTI (Raamattu 2.73): natiivi-ui/kartta-valilehti-212 da59c64ec junassa 212 (KS kerrokset-212 0353bde41: taso
  Nimikerros.JatkuvaTaso). PT hyväksyi kuvat: proto-3d/_tyo/natiivi-ui/kartta-valilehti/kooste-K4-K5.png. Vedosskenaario
  sk-kartta-oikea3.txt (`ui kerros tila` lokiin).
- NOSTON SUMENNUS (omistaja 13.25): natiivi-ui/lippu-sumennus-212 7217981fa → NS (83dad9695 jo rungossa ff:nä, 7217981fa sen jatko).
  Päiväkirjakortti, kartussi ja Liiku sumenevat UI-suotimella (UiNakymat.PaivitaKarttaUiSumennus `muut`). Elävää kerrosta ei käytetä
  sumennuksen aikana (Ruudunpaivitys, PalloKierto.Sumenee), joten lippu ei jää laitteella teräväksi. Kuvat: proto-3d/_tyo/natiivi-ui/lippu-sumennus/.
- PEUKALOKOHTA (OMISTAJAN PÄÄTÖS 15.41 "lisää hehku", ei rengasta): natiivi-ui/ohjainopetus-pohja d09c840d6 (ohjainopetus.uss,
  rimpuilu 0,9–1 / 1,0–1,25). PK mergesi c2-fg-212:een (a210bfa50) ja tarkistaa videosta. PK:n "Kiinni!"-ohje: .mk-aikajana-kertomus--ohje.
- Worktreet poistettu (junassa): esikatselu-sekunnit, kohdekortti, latauspalkki-vaaka, nosto-sulku, tyylikirja-212, tietokortti, kartta-valilehti.

## AVOIN: sumennuksen voimakkuus (PT 15.4x "nostetaan")
- natiivi-ui/sumennus-voimakkuus-212 58b8014be (pohja 7217981fa): pallo 2,25 → 4,5 pt, kokoruutu 4 → 5,5 (alle portin 6 pt: portti
  tunnistetaan luvusta), UI-kerros omat luvut uiKuvaSumennusPt/uiKokoruutuSumennusPt (2,25/4). Pallo.unity päivitetty.
- JUMI: batch-vedoksessa (pistekerroin 1) renderScale 0,662 → kartta ja lippu katosivat, näkyi tasainen ruskea pinta ja vain nimet:
  lippu-sumennus/L1-58b8014be.png. 2,25 pt:llä batch ei skaalannut koskaan, joten renderScale < 1 -polkua ei ole testattu Macilla.
  Ehdotettu PT:lle: voimakkuus simuvuoroon (JU), 7217981fa junaan nyt. Odottaa PT:n vastausta.
- Stonehenge ja Edinburgh ovat pallon TMP-nimiä (Nimikerros, ZTest Always), eivät UI:ta: ne sumenevat vain pallon sumennuksella.

## Vedokset
tyokalut/esikatselu.sh (proton worktreessä, ei suoritusoikeutta → `zsh <polku>`), aina linja 2 (oletus). Skenaariot:
proto-3d/_tyo/natiivi-ui/tietokortti/sk-tietokortti-b.txt (B1–B5) ja sk-lippu-sumennus.txt (L1–L3 + `pallo lepo`).

## Worktreet (proto)
wt/proto-natiivi-ui-lippu-sumennus (natiivi-ui/lippu-sumennus-212, poista kun 7217981fa junassa), -ohjainopetus (d09c840d6, PK:n
haarassa), -havainne-valo (ei junassa).
