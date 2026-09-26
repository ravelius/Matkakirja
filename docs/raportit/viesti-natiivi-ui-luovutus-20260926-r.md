# Natiivi-UI:n luovutus 26.9.2026 (r), klo 04.4x

Jatkaa luovutusta (q). Proto-git: `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen, varmuuskopio
`natiivi-backup`-remoteen). Työkopiot (enintään 3): `wt/proto-natiivi-ui-sisallys`, `wt/proto-natiivi-ui-nostot`,
`wt/proto-natiivi-ui-pariteetti` — kaikki puhtaita, haarat mergetty tai pushattu.

## Junassa (juna/b13 541092d9, build 17–18)
- Build 17: 121–124 (aloitus, lento, Ohita, saapumiskortti 2 s), 138–140 (luentakuvien kehys pois, vaalea matkakirja,
  linssit pois laukusta), 130–137 + 134 (nostokortti), 141–143 (kartussi), 147–148 + Ken Burns (Ihmisen matka II),
  146 postikortti v2 (omistajan hyväksymä malli), 125 (Natiivisepän nostomerkkipatch).
- Build 18: 132 + 150 (noston kuva kokoruudulle zoomilla, pallon sumennettu pysäytyskuva taustana), 143b (pitkä
  maannimi enintään kahdelle riville, pienennys ≤ 25 %; iPad PASS 22 %), 144 (aaltoileva lippu, Liput.Aaltoile).
- Lepopiirto: syy oli 125:n hehkusyke + jatkuva Joutosyke; Fablen päätös SykeJaatyy = true. Mitattu 688e1f5c:
  kartta, kartussi auki ja kaupunkikortti auki hiljaa levossa (Paikallaan). Todisteet `proto-3d/lokit/natiivi-ui-b18-lepo/`.

## Päivitys klo 05.1x
- Build 19 -junassa: natiivi-ui/im2-ohjaus d56afbd5 (II:n soitin Linssisepän Ohjaus-rajapintaan, todennettu) ja
  natiivi-ui/linssi-sulkee-s3 198ecc30 (linssin avaus sulkee nosto- ja kaupunkikortin, todennettu).
- Klo 05.4x: elävän kartan Natiivi-UI-osa natiivi-ui/elava-kartussi d525ec5e valmis ja merge-pyynnössä (todennettu 67986944,
  lepo Paikallaan, kuvapari omistajalle proto-3d/lokit/natiivi-ui-b19-elava/). Avoinna: MaakuntaTiedot.Keskipiste-kytkentä
  MaakunnatSilta.Kytkeen (MaaKartta.MaakunnanKeskus, natiiviseppa/elava-saapuminen) kun se on junassa; salaisuusdata 1.47; 115.
- Klo 06.0x: build 19 -junassa (juna/b13 05d68639) myös elava-kartussi d525ec5e ja maakunta-keskus a3fa7854 (käsialanimi
  aluejaon keskipisteessä, todennettu). natiivi-ui/kortti-lehdet 0bdb771b (kaupunkikortin kansikuva LehdetSaapuivat-tapahtumasta,
  pelikoodari/lehdet-perassa päällä) odottaa Pelikoodarin mergeä omaan merge-pyyntöönsä. Maakuntanimet "Attika" tulevat
  paketissa #3297:n jälkeen ilman koodimuutosta (MAAKUNTIEN_NIMET = MAAKUNNAT_KAIKKI + kuratoidut).
- Klo 08.2x: elävän kartan kohta 2 (build 20) natiivi-ui/nosto-muste fed603b9 merge-pyynnössä (sis. natiiviseppa/nosto-muste
  ja linssiseppa/muste-jaljet): kokoluokat, löytämätön musteen jälkenä, pääkohteen hehku, löydön käyrä; todennettu 3ec54edd,
  lepo 244/244. Myös linssit-heti (junassa) ja kortti-lehdet (Pelikoodarin merge-pyynnössä).
- Klo 08.4x: build 20 -junassa myös offline-lepo 7d6f7bc3 (Natiiviseppä mergeää; offline-pillerin vuorottelu seisoo levossa,
  todennettu 306/306). Build 20 -junassa nosto-muste fed603b9 (juna/b13 427e1a1a).
- Klo 09.3x: natiivi-ui/taso1-155 d262c1e2 (löydös 155: löytämätön taso 1 himmeänä kuvamerkkinä, tasot 2–3 jälkinä)
  todennettu 9a677a78, lepo Paikallaan 0 kehystä; merge-pyyntö Natiivisepälle. Todisteet proto-3d/lokit/natiivi-ui-b20-155/.
  Testikomennot: peli-komento.txt (peli), ui-komento.txt (rivit alkavat "ui "), komento.txt (kartta, kuva).
  Siirtosepän siivous-korjaus 13e5bcf4 on BUILD 19:ssä → salaisuus/Attika todennettavissa.
- Klo 09.5x: 155b f8cd2f38 (c09aacc3:n päällä, korvaa d262c1e2:n) junassa e86fd248. 156 natiivi-ui/maakunnat-veto 9ae176c9
  (maakuntien selain vedolla, Maakunnat.Vedossa/VetoMuuttui) todennettu 7f37e1d6, menee junaan 157:n (natiiviseppa/valinta-157)
  kanssa Fablen OK:lla. 158 natiivi-ui/pikkukuva-158 68e9dc2f (kenttä `pikkukuva`, salaisuuskortin kuva) merge-pyynnössä.
  Salaisuuskortti ja "Attika" TODENNETTU build 19 -datalla. Todisteet proto-3d/lokit/natiivi-ui-b20-156/.
  Konsoli: simctl launch --terminate-running-process --stdout=<tiedosto> (Debug.Log, esim. komento.txt "maakunta tila").
- (Vanha) Avoin: salaisuuskortti ja "Attika" odottavat Siirtosepän paketin siivouskorjausta (siirtoseppa/siivous-korjaus 13e5bcf4);
  laite jäi v145:een. Koodi valmis (NostoSisalto salaisuus:-etuliite, MAAKUNTIEN_NIMET).
- (Aiempi merkintä:) elävä kartta, Natiivi-UI:n osa (omistaja hyväksyi videon 05.0x, build 19). Opus-agentti työstää haaraa
  natiivi-ui/elava-kartussi worktreessä wt/proto-natiivi-ui-nostot: tutkimuspalkki, maakunnan herääminen kartussissa
  (käsialanimi, pikkukuva-leima, merkit x/y), käsialanimi kartalle, salaisuus:-nostot NostoSisalto.Hae:hen, lippu liehuu vasta
  kun maa valmis. Rajapinta PeliOhjain.Muste (Pelikoodari, junassa 3ef13a97). Jos agentin tulos puuttuu: tarkista haara
  (git log natiivi-ui/elava-kartussi), käännä, todenna lepo (ui rauha) ja kuvapari omistajalle, merge-pyyntö Natiivisepälle.

## Jono (Fable 26.9. klo 04.4x)
1. Build 19:n ensimmäinen erä: Linssisepän Ohjaus-rajapinta II:n soittimeen (IhmisenMatkaLinssi.Ohjaus
   Soi/Tauolla/Tutkimus, ToistaTaiTauko(), Alkuun(), Loppuun(), OhjausMuuttui; haara linssiseppa/ihmisen-matka-2).
   Korjaa samalla: tauko-symboli ei vaihtunut, kun tauko tuli testikomennosta (kuuntele OhjausMuuttui).
2. Elävä kartta (vasta omistajan videoarvion jälkeen): kartussin tutkimuspalkki (MusteMaakunnat), MaakuntaHeraa /
   MaakuntaValmis / NostoLoytyi -tapahtumat (Pelikoodari, pelikoodari/elava-kartta), salaisuus:-nostot
   NostoSisalto.Hae:hen (kokoelma maakuntasalaisuudet, skeema 1.47). NostoAvattu-kutsu on jo tehty (natiivi-ui/elava-nosto).
3. 115: omat maakuntien pikkukuvat, kun data (kuvat[0].pikku) tulee.

## Opit
- Omistajalle ensisijaisesti PNG-pysäytyskuvat laitteen ruudun kokoisina; video vain liikkeelle, rajattuna ruutuun.
- Tarkista `xcrun simctl list devices booted` < 2 ENNEN bootia; ilmoita Julkaisijalle alku ja loppu.
- proto-kaanna.sh luovuttaa tunnin jonotuksen jälkeen ja kaatuu merge-ristiriitaan hiljaa (tulos tyhjä → katso loki).
- `simctl launch` vaatii ~20–25 s bootin jälkeen; silmukka 10 s välein, kunnes tuloste on "<bundle>: <pid>".
- PlayerPrefs: sovelluksen plist `Library/Preferences/app.matkakirja.proto3d.plist` (plutil -remove sovellus kiinni).
- `ui rauha diag | laskurit [nollaa] | erot [ms] | tapa versio` löytää lepopiirron estäjän (erot näkee myös piilotetut).
- Jatkuvat koristeajastimet: `Rakenne.Naytetaan(e)` (koko vanhempiketju) ja Ruudunpaivitys.Herata kehysanimaatioihin.
