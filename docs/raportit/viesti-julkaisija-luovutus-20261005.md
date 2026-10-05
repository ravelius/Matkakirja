# Julkaisijan luovutus 5.10.2026 klo 06.5x (viikko 99 %, tilinvaihto)

Kirjoittaja: Julkaisija (Opus 5.5, high). Juokseva loki: /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt
(kaikki TF-, osoitin-, juna- ja vuorotapahtumat). Pitolista: julkaisija-tyokalut/pidossa.txt.

## TestFlight

- **TF 142 viety 05.21**: master 62d5d1bb (juna/b13 8ef6b519, junakäännös b42c04de), sisältää 9291781b (purkuraja,
  1fbbad7b:n kautta) ja f531743e (linnaerä). Ulkoinen ryhmä Arvioijat, beta-arvio WAITING_FOR_REVIEW. Muutosloki
  1.1 (142) = versio C, #3982 (64f6f9dc), vienti 37252128218 OK. Laskuri 10/12.
- Aiemmat 5.10.: 141 (5a0b9add, 00.32). 4.10.: 137–140.
- TF-kaava: muutosloki-PR (≤ 3 lausetta / 280 merkkiä, `node --test tests/vienti.test.mjs`) → mergeä squashilla →
  odota "Vie sisältöpaketti ämpäriin" -ajo onnistuneeksi → `gh workflow run proto3d-testflight.yml --ref main -f vie_unitysta=true
  -f versio=1.1 -f ordinaali=N -f proto_ref=<master-SHA> -f build_numero=N` → tarkista LADATTU lokista
  /Users/Shared/Claude/proto-3d/lokit/yo-testflight.log → `gh workflow run testflight-ulkoinen.yml --ref main -f build_numero=N`
  → tarkista ajon lokista "liitetty ulkoiseen ryhmään" ja "Beta-arvio: lähetetty". Levy ≥ 32 Gi ennen TF:ää (alle 30 → ohitus).

## Linnan osoitin

- Tuotannossa **c116f02f589bfaaf** (vaihdettu 5.10. 00.05).
- **8f4eb611c0e1cce7** (#3974 avainsanat, v2615, push-ajo 37248491383) on ämpärissä, mutta **EI vaihdeta** ennen
  omistajan aamukorttia (Päätoimittaja 03.4x). Vaihto: `gh workflow run vie-dioraama.yml --ref main -f rakennus=olavinlinna
  -f kuiva=false -f osoitin=true` vasta kun mainissa ei uudempia dioraamamuutoksia, ei linna-ajoja simuilla/iPadilla, ja aika ilmoitettu.

## Web-juna

- Tyhjä. 5.10.: #3974 v2615 (d09aef689, tuotannossa 03.58), #3981 loki suoraan, #3982 muutosloki 142 suoraan,
  #3983 (astro images-api ensin, tools+tests, :docs ilman versiota) MERGED 06.2x. Avoimia junaan pyydettyjä PR:iä ei ole.

## Käännös- ja simujono (06.5x)

- **Molemmat tyhjät**, ei simuja käynnissä, lukko vapaa.
- Viimeisimmät käännökset: Natiivi-UI 00d54775 (b38360f4+9a688396), LS1 46d3aca2 (linna-kuva e6fa10ea),
  LS2 10c31692 (iss-ohjaamo 69e49d69, S2-indeksi v2), Siirtoseppä 698bf6d6 (bdd5be5e) ja 7dec0e86 (Timeline),
  Natiiviseppä bc6a9af0 (zstd ca4251f5).
- Varaus: Linssiseppä 1 kiilto 11–13, D0D2CD1E ~12 min, build 3674ed53.
- Säännöt: yksi simu kerrallaan myös yöllä; lähetä "SIMU NYT" ja odota "simu vapaa"; jos rooli ei aloita, lähetä
  viesti uudelleen myös mcp__ccd_session_mgmt__send_message:llä (Laitetestaajan 03.31-viesti ei mennyt perille).

## Levy

- 34 Gi (raja TF:lle 30). En poistanut Päätoimittajan pyytämiä ~/Library/Developer/Xcode/DerivedData/Unity-iPhone-dfkisao…/
  ArchiveIntermediates (5,7 G) enkä proto-kaannos/Build/yo (2,2 G): oman työtilan ulkopuolella → omistajan aamukortti.

## Ämpäri

- 5.10. viety: s2-indeksi-v2-vienti-20261005 (6 tiedostoa, 05.55, kaikki 200). Copernicus-merkintä vaaditaan.
- Odottaa Siirtosepän pyyntöä: _valmiit/tavli-aanet-vienti-20261005 ja _valmiit/mylly-lisaaanet-vienti-20261005
  (lue LAHTEET.md, Freesound-lisenssit).

## Avoimet

- Juna 143 (Natiiviseppä kokoaa): linnan Unity-uudistus + zstd/Brotli (ca4251f5 → bc6a9af0, A/B 0 Exception) +
  ✕-poistot (Natiivi-UI eb81f01e) + Tavli (Siirtoseppä 8546d06a) + Timeline (7dec0e86) + LS2 ohjaamo (ecf0883f).
- Siirtoseppä otti 06.27–06.32 linnan A/B-kuvat (A c116f02f, B 27022c94 = junan 143 yhdistetty peili) omistajan osoitinpäätökseen.
- Omia worktreeitä ei ole jäljellä.
