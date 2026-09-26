# Natiivi-UI:n luovutus 26.9.2026 (t), klo 14.4x

Jatkaa luovutusta (s) (lue se ensin: simulaattorit, session id:t, opit). Tämä kattaa Fablen erän klo 14.4x.

## Tehty
- ☰-valikon pikanapit (LinssiValikko-erä, oikeasti Linssivalitsimen nappirivit): `natiivi-ui/valikkonapit` 79adce1b
  juna/b13 64887a7a:n päällä, vain Linssit.uss. Napit nimensä levyisiksi (flex-basis auto), nimi 12 px, ikoni 15 px,
  kapeampi sisäreunus. Kaikki kuusi nimeä kokonaan iPhone 17:ssä. MERGE-PYYNNÖSSÄ Natiivisepällä (14.42).
  Kuvapari `proto-3d/lokit/natiivi-ui-valikkonapit/kuvapari-valikkonapit-ennen-jalkeen.png`.
- Reseptirivi Laitetestaajan TF-kierrokseen: `docs/raportit/laitetestaaja-reseptit.md` haarassa
  laitetestaaja-savukierros-b13 (dea2c4461): yläpalkin piiloutuminen vedossa, vaaka piilottaa / pysty pysyy (löydös 73),
  simulaattorissa `ui ylapalkki veto|napautus`. Laitetestaajalle ilmoitettu.
- jalki-mallin-alta 46d394f2 oli jo junassa (f9f902d9); kuvapakka-lahtee (162) myös (64887a7a).
- Lipputanko paketin ankkureilla: tuotantopaketti v169 sisältää `kartta/lippu_lonlat.json` (138 maata);
  FRA/DEU/ITA/FIN tanko ankkurissa ja näkyvissä (`lipputanko-paketin-ankkurit-FRA-DEU-ITA-FIN.png`, konsoli.txt).

## Avoinna
- valikkonapit-merge (Natiiviseppä). Omistajan 1.0.21-löydökset odotuksessa.

## Opit
- iPhone-simulaattorissa aloitusruudun ohi: tap (201, 630) = "Jatka matkaa" ~25 s launchin jälkeen.
- `simctl launch --stdout` ei kirjoita scratchpadiin; käytä proto-3d/lokit/<kansio>/konsoli.txt.

## Käännössääntö 26.–27.9. (Fable Natiivisepän kautta, Karttasepän poltto)
Enintään yksi Xcode/Unity-käännös kerrallaan, vain kun on todennettavaa (ei koekäännöksiä), ja ilmoita Karttasepälle rivillä
ennen jokaista käännöstä. Junavahti on tauolla (/tmp/matkakirja-juna-tauko), joten Natiiviseppä kääntää junat käsin.

## Löydös 164 (omistaja 15.3x, 1.0.21 Alankomaat) — merge-pyynnössä
`natiivi-ui/nimiot-kalusteet` f3500eb5 (juna/b13 01a274bb päällä): kaupunki- ja aluenimiöt väistävät ruudun kalusteita
(kartussi, Liiku, pulu, yläpalkki; web LIUSKAN_KALUSTEET). KaupunkiMerkit.Kalusteet-koukku (Kartta) varaa laatikot
nostoikonien jälkeen, NostoIkoneita sisältää ne; UiNakymat.KartanKalusteet muuntaa paneelin laatikot ruudulle (+4 pt).
Käännetty 7994e1df, todennettu iPhone 17:ssä (Brussel otsikon kohdalla: nimiö väistyy, piste jää). Kuvapari
`proto-3d/lokit/natiivi-ui-loydos164/kuvapari-164-ennen-jalkeen.png`. Merge-pyyntö Natiivisepälle 15.36 (build 22).

## Löydös 165 (omistaja 15.3x, maakuntavalitsin) — merge-pyynnössä
Juurisyy: vihreä Gelderland oli maakuntavalitsimen valinta (paletin oma väri, 157:n peitto 0,45), joka jäi kartalle
paneelin sulkeuduttua ja palasi PlayerPrefsistä käynnistyksessä; web ei värjää karttaa valinnasta. Erikseen: Amsterdamin
fokusvirran "Loevesteinin arkku" (nosto:kirja-arkku) on paikannettu Gelderlandiin → sen avaus herättää Gelderlandin (data).
Korjaus `natiivi-ui/maakunta-korostus` de3fed4c (juna/b13 45398ff8): Maakunnat.Nakyvissa (Karttaselite asettaa), MaakunnatSilta
korostaa vain näkyvissä ja palauttaa oletustilan (koskee Natiivisepän tiedostoa). Käännetty 3d972a0f, todennettu.
Kuvat `proto-3d/lokit/natiivi-ui-loydos165/` (kuvasarja-165.png, kuvasarja-165-korjaus.png). Merge-pyyntö 15.53.
Huom: simulaattorin tallennuksessa nyt Amsterdam-peli ja arkku löydetty (testitila).

## Tila klo 16.0x
- 164 (nimiot-kalusteet) MERGETTY junaan 0b7d021b (build 22).
- 164 jatko `natiivi-ui/pisteet-kalusteet` 46600ce7: kalusteen alle jäävä kaupunkipiste + nimi piiloon (Fablen pyyntö; web ei
  piilota). Kuvapari `proto-3d/lokit/natiivi-ui-loydos164/kuvapari-164-jatko-piste.png`. Merge-pyyntö 1.0.23.
- 165 `natiivi-ui/maakunta-korostus` de3fed4c: Fable hyväksyi, 1.0.23 (build 22 leikattiin ennen). Merge-pyyntö.
- valikkonapit 79adce1b: build 22 -junaan Natiivisepän mukaan (tarkista junasta).
- 16.1x: 165 MERGETTY junaan 60cfadda (1.0.23-juna; 1.0.22 leikattiin 45398ff8:sta, jossa valikkonapit ja 164 ovat).
  Levysiivous (Fable): siivoa-pariteettisimut.sh --aja ei vapauttanut mitään (uninstall vaatii käynnissä olevan laitteen);
  iPad Pro 11 503000D1 -erase estettiin luokittimella → Fablelle vaihtoehdot, ei uusintaa.
  Omistaja tyhjensi 993F8873, 88939C12, C1D5E34C ja iPad Pro 11 503000D1 (sovellus+data pois, laitteet säilyvät): iPadilla
  ajo vaatii ensin proto-kaanna.sh-asennuksen. A2FD9C9F jäi (oli boottina). simctl erase -sallinta tulossa mainin kautta.
- 164 jatko (pisteet-kalusteet) MERGETTY 1.0.23-junaan 1b9f193b. Natiivisepän mukaan 165 on todennäköisesti myös 163b:n
  ("kohdemaan kartta puuttuu") juurisyy; hän ilmoittaa Fablelle. Kaikki erät nyt junassa, jono tyhjä.
- Siivous odottaa sallintasääntöä (git worktree remove, simctl erase; Julkaisija commitoi mainiin): kun se on pullattu,
  poista proto-worktree wt/proto-natiivi-ui-kuvapakka (git -C proto-3d/Matkakirja-proto worktree remove, mergetty) ja
  simctl erase FB234D08 (oma iPhone 17). Kolme muuta proto-työkopiota jäävät uudelleenkäyttöön (puhtaita, mergetty).
- 17.1x löydös 167 (Laitetestaaja b23: nostomerkki pulun päällä): `natiivi-ui/nostot-kalusteet` 42183d7d (juna 1356e216):
  NostotKartalla.PeitaMallienAlta piilottaa kalusteen alle jäävät merkit (KaupunkiMerkit.Kalusteet → paneelin Rect).
  Käännetty db209758, kuvapari `proto-3d/lokit/natiivi-ui-loydos167/kuvapari-167.png`. Merge-pyyntö 1.0.24.
  Rajoite: tarkistus nostokerroksen päivittyessä (kamera), ei pulun omassa liikkeessä.
- KÄÄNNÖSTAUKO (Fable 26.9.) klo 19.00 asti: ei Xcode- eikä Unity-käännöksiä eikä simulaattoriasennuksia (Z10-poltto). Sen jälkeen käännöserät enintään kerran tunnissa.
- 167 (nostot-kalusteet) MERGETTY 1.0.24-junaan fe86446e. Kaikki erät junassa.
