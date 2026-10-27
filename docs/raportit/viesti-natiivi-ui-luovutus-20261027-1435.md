# Natiivi-UI: luovutus 27.10.2026 klo 14.35

Rooli Natiivi-UI (Opus). Konteksti 38 % → luovutus. Ei keskeneräisiä muokkauksia (kaikki committoitu proton haaroihin).

## Valmiit 13.50 jälkeen
- NOSTON SUMENNUS KAIKKIIN KARTTATASOIHIN (omistaja 13.25): UiNakymat.PaivitaKarttaUiSumennus – UI-kerroksen 12 juureen blur samalla
  tasolla ja liu'ulla kuin PalloSumennus (kortti 2,25 pt, kokoruutu 4 pt, 0,3 s; ei linssin aikana). TMP-nimet sumenivat jo (mitattu).
  687ab12e9; kuvat proto-3d/_tyo/natiivi-ui/tietokortti/sumennus-687ab12e9/ (RAPORTTI.md). Juna 212:ssa (NS e57834a60).
- Tietokortit 13.52-linjaus (asiateksti, ei Pulun puhetta): näkymässä ei Pulun kuvaa/nimeä tekstin yhteydessä; kommentit a9f2f829f.
- Codexin 10 tyyppikuvaketta (posti 153c05e4b) → Resources/Symbolit/sym-tyyppi-<id>.png 606ee3c11; kuittaus Codexille
  postilaatikko 79c216d2a (10/10 käyttöön, tilaus suljettu).
- Väliotsikoiden <b> näkyi tagina → Nostokortti.Korosta päästää <b>/</b> läpi: eabaaa896.
- Vedos B1–B5 (worker 2b69a5a92 julkaistu): proto-3d/_tyo/natiivi-ui/tietokortti/kuvat-eabaaa896/kooste-B1-B5.png → polku KK:lle viety.
- MERGE-PYYNTÖ NS:lle: natiivi-ui/tietokortti-nakyma-212 eabaaa896 (jatko a9f2f829f:lle; NS kuittasi vastaanoton).

## KARTTA-VÄLILEHTI (omistaja 14.00/14.04, Raamattu 2.73) – UI VALMIS, ODOTTAA KS:N KORJAUSTA
- Proto natiivi-ui/kartta-valilehti-212, kärki 6f80e80db (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kartta-valilehti):
  juna 212 e57834a60 + KS karttaseppa/kerrokset-212 c4e160181 (Sisaltokerrokset, SisaltoKerros) + NUI:
  - Linssivalitsin.Kartta.cs: kolmas välilehti LINSSIT | PELIT | KARTTA, rivit linssirivin pohjalla (PÄÄLLÄ / harmaa SetEnabled(false) /
    maailmanperintö poistuu lähellä), tila 0,5 s välein näkymän ollessa auki. Ikonit olemassa olevista viivaikoneista (bussi, kirja,
    linna, kompassi, varikartta, tahti) – ei uutta pohjaa.
  - UiPalvelut.IKarttaRyhmat + KarttaRyhmaTila; SisaltokerroksetSilta.cs (UiNakymat kytkee) KS:n Sisaltokerroksiin.
  - Korjattu kilpatilanne: myöhään latautuva linssiaineisto toi linssilistan PELIT/KARTTA-välilehden alle (0b6f43284).
  - Komennot: ui kartta avaa | koe [harmaa|piilo|toimii <ryhmä>].
  - Vedokset: koepalvelu proto-3d/_tyo/natiivi-ui/kartta-valilehti/kooste-K1-K3.png (ok); oikea zoom
    proto-3d/lokit/esikatselu-20261027-142302/R1–R3: KAIKKI lähiryhmät harmaina myös lähikartalla → Sisaltokerrokset.NykyinenTaso = NaN
    (KarttaKerrokset.cs:156 Pintaosuma.Tiheys). Ilmoitettu KS:lle 14.34; KS korjaa haaraansa.
- SEURAAVA: KS:n korjauksen sha → merge haaraan, uusi vedos `sk-kartta-oikea.txt` (proto-3d/_tyo/natiivi-ui/kartta-valilehti/) →
  kuvat PT:lle → MERGE-PYYNTÖ NS:lle junaan 212 (sisältää KS:n kerrokset-212; KS pyytää omansa ensin, järjestys KS → NUI käy).

## Siivottavat worktreet (proto, kun haarat junassa)
wt/proto-natiivi-ui-kohdekortti, -nosto-sulku, -tyylikirja-212, -ohjainopetus, -latauspalkki-vaaka, -tietokortti, -havainne-valo;
myöhemmin -kartta-valilehti.
