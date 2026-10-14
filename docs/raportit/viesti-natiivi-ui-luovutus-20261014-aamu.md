# Natiivi-UI: luovutus 14.10.2026 klo 07.2x (nollaus, PT:n pyyntö, konteksti 88 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261014-yo.md. Pysyvät säännöt
-20261012-ilta.md ja -20261010-aamu.md. Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012
(pari-arkki.py = NYKYINEN | UUSI -arkki, *-ajo.sh = käännös/simu, sk-*.txt = skenaariot). Arkit: proto-3d/lokit/natiivi-ui-arkit-189.

LUVAT (Julkaisija 14.10.): asettelutestit L2:lla vapaana ilman pyyntöä (LUKKO VAPAA perään); lyhyet asettelutestit oman L1-ketjun
jatkoksi ilmoittamalla; yöllä saman appin lyhyet simu-uusinnat ilmoittaen, kun simuja < 2. Käännökset ja muut simut: KÄÄNNÖS/SIMU NYT.

## Juna 189: KUITATTU ja NS:llä (ei toimia)
- natiivi-ui/keskitys-188 2728a1645 – nappien optinen keskitys + keskitystesti (web-PR ravelius/Matkakirja#4571 junan web-mergeissä).
- natiivi-ui/museo-tauko-189 e2e4537e4 – museon ⏸ pysäyttää kertojan myös vapaassa kulussa ja kortin/kohdan luennan, tauon ‹ ›.
- natiivi-ui/museo-valikko-189 f300751ba (⊃ museo-valinta-189 edce1f0bb) – ☰ avausvalikon pohjalla, Valitse näyttely 16:10 ja leveä.
- natiivi-ui/tavli-tavoite-189 2b95caf75 – Tavlin ja Myllyn tavoite ääneen pelin alussa (äänet ämpärissä).
- Raketin mittaritaulu natiivi-ui/raketti-lcd-189 0cad3a15a KUITATTU, mutta NS ottaa raketin vasta yhtenä pakettina (PK:n
  pelikoodari/raketti-laukaisu-189 + tämä + LS2:n grafiikka). Pidä haara; rebase PK:n lopulliseen kärkeen, kun NS pyytää.

## KESKEN 1: ISS V3c Kuvat (omistaja hyväksyi GALLERIA-pohjan leveän tilan kortilla 14.10. aamulla)
Haara natiivi-ui/iss-kuvat-v3c (proto-git), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-isskuvat, HEAD 209928ff8 (pohja juna-189):
- Pulun valikko: Maapallo + Astronauttien kuvat → yksi "Kuvat" (PulunTaulu.cs rivitaulukko; Pallo-moodi jää oletukseksi).
- IssKuvagalleria.cs: GALLERIA-pohja, KUVAT n/m, osio per kohde (omat ISS-kuvat ensin, sitten astronauttikuvat), laiska pikkukuvien
  haku, napautus → Kuvasuurennos (omat kuvat file:// IssKuvagalleria.HaeLevylta). Testikomento `ui linssi galleria`, asettelunäkymä
  "astronautin galleria" ja "pulun valikko". Simu 189-käännöksellä iPhone hyvä (PT), arkki lokit/natiivi-ui-arkit-189/iss-kuvat.png.
- LEVEÄ TILA (Galleriat.cs GalleriaLevea, myös julistegalleria): tyylikirja galleria.sarake-levea 140, osio-levea 300, levea-raja 700;
  sarakkeet n = paneelin leveys / 300 (iPad vaaka 3, pysty 2). Web-PR ravelius/Matkakirja#4578 (pino #4571:n päällä, CI kesken;
  web-worktree /Users/Shared/Claude/wt/natiivi-ui-galleria-levea, haara natiivi-ui-tyylikirja-galleria).
- SEURAAVAKSI: asettelutesti isskuvat-jalkeen4.sh (L2, ajossa luovutushetkellä) → katso iPad vaaka/pysty (3/2 saraketta, kuvat
  isompina) → iPad-arkki pari-arkki.py:llä PT:lle → kuittaus → SHA NS:lle (juna 190?). PK:n IssAlbumi.Kuva.Kohde valmis
  (pelikoodari/iss-kupoli-190 49c6af769): ota ensisijaiseksi, kun haara on junassa (nyt lähin kohde ≤ 300 km).

## KESKEN 2: raketin latausruudun havainnekuva (omistajan valinta "1 Havainnekuva", PK:n pyyntö)
Haara natiivi-ui/raketti-kuva-189, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-rakettikuva, HEAD be178222f (pohja juna-189):
AstronautinNakyma: LATAUSKUVA-pohja mk-astroavaus-ruudun alle, Codexin kuva pysty/vaaka ruudun mukaan (SHA-osoitteet vakioina),
ISS-teksti meren alaosaan, kuvateksti ui.raketti.kuvateksti + Havainnekuva oppaan nimilapulla. Asettelunäkymä "raketin latauskuva".
SEURAAVAKSI: rakettikuva-kuvat2.sh (L2, jonossa isskuvat4:n perään) → tarkista, ettei nimilappu ylitä reunaa (be178222f) →
arkki PT:lle (huom. "ISS" erottuu heikosti meren päällä – sama pohja kuin Olavinlinnan latauskuva; kysy PT:ltä, jos parannetaan).

## AVOIN: museon "napautus pyyhkäisyn jälkeen hukkuu" (LS1)
Toistuu simulla (kg189-ajo.sh, sk-kg189.txt: Astu sisään → veto 200 700 200 350 → tap Kunniagalleria) myös TF 188 -appilla → ei
189:n muutoksista. EI simun injektio: ISS-galleriassa sama veto + napautus toimii. Diagnostiikka: pyyhkäisyn PointerUp ei tule
UITK:lle museon yläkerroksessa (lista/yleinen Kosketusvieritys jää kaappaamaan, seuraava napautus menee juurelle); Input System
näkee kosketuksen yhä painettuna. Kokeet (Kosketusvierityksen irrotusvahti, listan Clamped → oletus) eivät auttaneet → palautettu;
museo-valinta-189 2624e6af7 = kuitattu edce1f0bb. Epäily: museon yläkerroksen kosketusreititys (MuseoEleet, kelluva tappi /
SeikkailuTapit, Input Systemin kosketusten kulutus museossa). PT tietää; jatko PT:n päätöksellä.

## Muut
- Kuittauksen jälkeen SHA aina NS:lle; arkit NYKYINEN | UUSI (pari-arkki.py), testikuvien pyöreät/pyöristetyt kuvat valkoisina =
  asettelutestin piirtovirhe (laitteella oikein).
