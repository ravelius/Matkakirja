# Natiivi-UI: luovutus 27.10.2026 klo 13.50

Rooli Natiivi-UI (Opus). Konteksti 37 % → luovutus. Ei keskeneräisiä muokkauksia (kaikki committoitu proton haaroihin).

## Valmiit tänään 12.20 jälkeen (ilmoitettu)
- Havainneparit juuri-v74m (LR 12.3x): kujat 01 02 05 → proto-3d/lokit/havainne-editori-20261027-123112/, aukio 03 03b PK:n
  LOD-korjauksella → -124051/ (RAPORTTI.md kummassakin, KK:lle viety). REF natiivi-ui/havainne-valo-kamera = 146cc6183
  (e64b5720d + PK be88e5c99 poimittu).
- KARTAN TIETOKORTIT 13.23 (Raamattu 2.203; NUI:n osat 1, 5, 6, 7): proto-haara **natiivi-ui/tietokortti-nakyma-212 f731439a6**
  (junan 212 85290f5fe päällä, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-tietokortti), tarkista.sh 0.
  - 1 faktat: alarivi ja faktarivit paperimusteella apurin koossa (KK 27.10. + PT 13.25: tumma alaotsikkorivi oletus).
  - 5 lähde + kuvan tekijä omana mk-nosto__lahde-rivinä tekstin alla.
  - 6 latausmerkki: OMISTAJAN PÄÄTÖS 13.38 "b: Pelkät pisteet" (kolme aaltoilevaa pistettä); vedos `ui tietokortti lataus pakota|pois`.
  - 7 tyyppi kohdekortin ylärivillä: workerin tyyppi {id, nimi} (KS PR 5323) → n.Symboli "tyyppi-<id>", teksti versaalina;
    kuvake Resources/Symbolit/sym-tyyppi-<id>.png puuttuu vielä → vain teksti (PT). Vedos `ui tietokortti tyyppi <id> <NIMI>`.
  - KS:n karttaseppa/tietokortit2-212 (dd1ab853f: johdanto ensin, Lue lisää väliotsikoin taustalla, 2 kysymystä) mergetty tähän;
    kysymykset Kysy pululta -lohkona tekstin perään (ei toimintorivin Kysy-nappia). KS:lle kerrottu: junaan tämä yksi haara.
  - Vedoskuvat (ennen KS-mergeä ja b-valintaa): proto-3d/_tyo/natiivi-ui/tietokortti/kuvat-82240e7ff/ (sk-tietokortti.txt).
- Codex-tilaus: 10 tyyppikuvaketta (kaupunki kyla luonto vesisto historia arkkitehtuuri uskonto kulttuuri liikenne alue),
  postilaatikko 51a9fd4f2 posti/natiivi-ui-codex-tyyppikuvakkeet-20261027.md, toimitus posti/codex-natiivi-ui-tyyppikuvakkeet-20261027/
  sym-tyyppi-<id>.png 192 px → kopioi Assets/Matkakirja/UI/Resources/Symbolit/ (+ .meta: Alpha is Transparency, kuten muut symbolit).

## KESKEN: noston sumennus kaikkiin karttatasoihin (OMISTAJAN PYYNTÖ 13.25, PT: junaan 212, NUI kohta 3)
Omistaja: "kun nosto aukeaa, niin osa uudet striimipaikannimet sekä ainakin kehittäjän mv kipit eivät sumene".
- Koeajo proto-3d/lokit/esikatselu-20261027-134133/ (sk proto-3d/_tyo/natiivi-ui/tietokortti/sk-sumennus.txt): S4 (Eurooppa,
  nosto auki) → maasto sumea, mutta TMP-nimet (Nimikerros: Baden, Zürich, Luzern…; myös kursiiviset kaupunginnimet) TERÄVIÄ.
  S2 (Lontoo lähellä) nimiä ei näkynyt. Sumennus = PalloSumennus (pallokameran renderScale + Gauss, BeforeRenderingPostProcessing).
  Selvitä, miksi Nimikerroksen/ElavaNimet-rivien TMP ei sumene (oma kamera? ElavaKerros-kamera? renderQueue/ZTest Always
  -materiaali piirtyy myöhemmin?). PalloKierto.cs ~788, PalloSumennus.cs, Nimikerros.cs, ElavaKerros.cs.
- UI Toolkitin karttakerros (UiKerros.Nostot = 12: NostotKartalla, Erikoisnostot = kehittäjätilan ajattelijoiden kipsipäät
  ("mv kipit" = todennäköisesti mustavalkoiset kipsipäät), KaupunkiPallot, Lautapelinostot, MaakuntanimetKartalla,
  AarrepisteRengas) ei koskaan sumene kamerasumennuksesta. Ehdotus: UiNakymat.KuvaSumeaMuuttui → Juuri(UiKerros.Nostot).style.filter
  Blur (kuten Nostokortti.AsetaPehmennys), pt kuvaSumennusPt:n mukaan; varmista, ettei Nostokortti/Valikot (40) sumene.
- Lopuksi sama koeajo → kuva PT:lle/KK:lle.

## Odottaa
- Codexin tyyppikuvakkeet → kopio peliin, PT tarkistaa sarjan.
- Tietokorttihaara junaan 212 (PT:n kaava) sumennuksen kanssa tai erikseen PT:n päätöksellä.
- Seuraavat havainneparit (LR → NUI → KK): aja-parit.zsh <juuri> 01 02 05 [03 03b], REF natiivi-ui/havainne-valo-kamera.

## Siivottavat worktreet (proto, kun haarat junassa)
wt/proto-natiivi-ui-kohdekortti, -nosto-sulku, -tyylikirja-212, -ohjainopetus, -latauspalkki-vaaka; myöhemmin -tietokortti, -havainne-valo.
