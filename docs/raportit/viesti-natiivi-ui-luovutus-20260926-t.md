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
