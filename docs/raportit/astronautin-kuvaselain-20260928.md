# Astronautin kamera: kuvaselain ja pallo kuvan takana (Linssisepän suositus 28.9.2026)

*Omistajan toive 27.9.2026 klo 23.5x Fablen kautta: kuvien selaus pyyhkäisemällä tai napauttamalla kuvan reunaa, alhaalla
keskellä edellinen/seuraava viereisiin kohteisiin kartalla ja himmeä maapallo kuvan takana kuvan kohdalta. Linssiseppä
(Opus, max). Toteutus natiivissa, web tulee perässä Pelikoodarilta laattatyön jälkeen.*

**Toteutus:** proto-haara `linssiseppa/astro-selain` **c5b073cd** (juna/b13 508761e8:n päällä). Linssit-testit 351/351 (uusi
AstronauttiKierrosTestit 5/5), unity-tarkistus 0 virhettä. Kuvapari ja video otetaan aamulla polton jälkeen (kohta 5).

## 1. Suositus: yksi galleria koko maailmasta

Aineistossa on 189 kohdetta, ja 149:llä niistä on vain yksi kuva. Pelkkä saman kohteen selaus ei siksi useimmiten tekisi
mitään. Selaus toimii yhtenä gallerian virtana:

- **Pyyhkäisy vaakaan ja napautus kuvan reunaan** (ulommat 22 %) vievät seuraavaan tai edelliseen kuvaan.
  - Ensin tulevat kohteen omat kuvat, sitten viereisen kohteen kuvat, joten selaus ei pääty koskaan.
  - Kuva seuraa sormea. Päästettäessä se vaihtuu, kun veto ylittää 20 % leveydestä tai on nopea; muuten kuva palaa paikalleen.
- **Alhaalla keskellä ‹ ›** vievät suoraan viereiseen kohteeseen kartalla ja avaavat sen oletuskuvan.
- **Naapuri on maantieteellinen** (AstronauttiKierros):
  - Kohteet muodostavat yhden suljetun maailmankierroksen: lähin naapuri isoympyräetäisyydellä, sitten 2-opt, joka
    suoristaa ristikkäiset hypyt.
  - Kierros alkaa läntisimmästä ja kulkee myötäpäivään kuten karttaa luettaessa. › ja ‹ vievät samaa tietä edestakaisin.
  - Oikealla aineistolla keskimääräinen askel on lyhyt eikä yksikään hyppy ole puolta maapalloa (testit).
- **Pallo kuvan takana** tekee kokemuksesta ikkunan:
  - Kuvanäkymän tausta on läpikuultava (0,7). Kun kuva avautuu tai kohde vaihtuu, linssin kamera liukuu 0,9 s:ssa
    kuvan kohteen ylle lepokorkeudelle.
  - Kuvan ympärillä hohtaa himmeästi maapallo juuri kuvan kohdalta. Pystyruudulla pallon reuna ja tähdet näkyvät
    ylä- ja alalaidassa.
  - Kohteesta toiseen siirryttäessä pallo kiertyy kuvan takana uuteen paikkaan.
- **Liu'ut ovat lyhyet:**
  - Vanha kuva liukuu pois 140 ms:ssa, ja uusi tulee toiselta puolelta 160 ms:ssa häivyttäen.
  - Pieni liike pois: vaihto on suora ja kamera hyppää.
  - Naapurikuvat haetaan etukäteen välimuistiin.

## 2. Mitä ei lisätty (UI kevyt, muisti ui-kevyt-ei-koristeita)

- Ei laskuria, reunanuolia, kohteen nimeä napeissa eikä pikkukarttaa. Selitteen otsikko ("Nimi — seutu") vaihtuu, ja
  pallo näyttää paikan.
- ‹ › ovat kaksi pientä pyöreää lasinappia (38 pt, sama vihreä lasi kuin väkäsessä) alhaalla keskellä. Pikkukuvat
  (vasen ala, enintään 2) ja minipulu (oikea ala) pysyvät ennallaan, eivätkä ne osu napeihin.
- Kaksoisnapautuksen zoomi toimii kuvan keskiosassa. Zoomattuna yhden sormen veto panoroi kuten ennen, eikä reunan
  napautus selaa.

## 3. ISS:n kyyti (Fablelle 28.9. klo 00.0x)

ISS:n kyytiin ei pääse vielä kummassakaan.

- **Natiivi:** ISS on todellisella radalla (SGP4, TLE ämpäristä, masterissa) kaukonäkymän merkkinä ja maajälkenä.
- **Web:** rata on havainnollinen (51,6°), ja avauksessa kamera seuraa asemaa hetken hidastettuna.
- **Kyydistä puuttuvat** ISS-linssin suunnitelman (docs/raportit/iss-linssi-suunnitelma-20260926.md, omistaja hyväksyi 26.9.)
  osat:
  - seurantakamera noin 1 200 km:stä
  - Cupola-ikkuna 420 km:stä
  - Cupola-kehys UI-kerroksessa (kuvat jo ämpärissä)
  - terminaattori ja yövalot (Natiiviseppä).

## 4. Tiedostot ja omistajat

- **Linssiseppä:**
  - AstronauttiKierros.cs (uusi, puhdas, testit)
  - AstronauttiLinssi.cs (AvaaKohde, Naapuri ja KatsoNaapuri; kameran liuku)
  - LinssiOhjain.cs: testikomennot `astro kuva <tunnus|n>`, `astro naapuri 1|-1 [galleria]` ja `astro kierros`.
- **Natiivi-UI (katselmointi):**
  - Kuvanakyma.cs: eleet, ‹ ›, liu'ut ja esilataus.
  - Linssit.uss: läpikuultava tausta ja napit.
  - LinssiKomennot.cs: `ui linssi selaa|kohde 1|-1` ja `ui linssi kuvaselain 0|1`, joka antaa kuvaparin samasta
    käännöksestä.
- **Web (Pelikoodari laattatyön jälkeen, web on malli):** js/linssit/satelliitti.js `avaaHavaintokortti`.
  - Sama galleria: pointer-eleet lavalla, reunan napautus ja samat kynnykset.
  - Samat ‹ › alhaalla keskellä.
  - Sama maailmankierros: kannattaa laskea tools-skriptillä aineistoon kenttänä, ja natiivi voi lukea saman.
  - Läpikuultava tausta ja pallon kääntö kohteeseen: satelliitti-avaruus.js kameran lento.

## 5. Todennus aamulla (Karttasepän polton jälkeen)

1. Rivi Karttasepälle, sitten käännös: `kaanna-jono.sh as linssiseppa/astro-selain`.
2. Laiteajo: `APPNIMI=as L=<kansio> VAIHEET=129 zsh proto-3d/tyokalut/linssiseppa-ajot/ajo-astro-selain.sh`.
   - Etna ja Istanbul, ennen = `ui linssi kuvaselain 0`, jälkeen = `1`.
   - Video: kuva → kuva → viereinen kohde → takaisin.
3. Kuvapari laitteen ruutuna ennen | jälkeen, kulma ja versio kuvaan, sekä rajattu video liikkeestä. Fablelle ja
   omistajalle.
