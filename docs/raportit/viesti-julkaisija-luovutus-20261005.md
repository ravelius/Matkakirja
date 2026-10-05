# Julkaisijan luovutus 5.10.2026 klo 06.0x (viikko 97 %, tilinvaihto n. 07.15)

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

- Tyhjä. Viimeisin: #3974 v2615 (d09aef689), tuotannossa v2615 03.58. #3981 (loki) suoraan dd9fd0b9c.

## Käännös- ja simujono (06.0x)

- Lukko: Siirtoseppä bdd5be5e (05.58, ~3 min). Sen jälkeen jono tyhjä.
- Simu: **Natiivi-UI FB234D08** (05.58–~06.15, junan 143 ✕-poistot, eb81f01e) → **Linssiseppä 1 D0D2CD1E** 10 min
  (linna-kuva 5cc14f8a) → **Siirtoseppä F989814A** 10 min (latausvirheen todistus, bdd5be5e:n käännös).
- Varaus: Linssiseppä 1 kiilto 11–13, D0D2CD1E ~12 min, build 3674ed53.
- Säännöt: yksi simu kerrallaan myös yöllä; lähetä "SIMU NYT" ja odota "simu vapaa"; jos rooli ei aloita, lähetä
  viesti uudelleen myös mcp__ccd_session_mgmt__send_message:llä (Laitetestaajan 03.31-viesti ei mennyt perille).

## Ämpäri

- 5.10. viety: s2-indeksi-v2-vienti-20261005 (6 tiedostoa, 05.55, kaikki 200). Copernicus-merkintä vaaditaan.
- Odottaa Siirtosepän pyyntöä: _valmiit/tavli-aanet-vienti-20261005 ja _valmiit/mylly-lisaaanet-vienti-20261005
  (lue LAHTEET.md, Freesound-lisenssit).

## Avoimet

- Juna 143 (Natiiviseppä kokoaa): linnan Unity-uudistus + zstd/Brotli (ca4251f5 → bc6a9af0, A/B 0 Exception) +
  ✕-poistot (Natiivi-UI eb81f01e) + Tavli (Siirtoseppä 8546d06a) + Timeline (7dec0e86) + LS2 ohjaamo (ecf0883f).
- Oma worktree /Users/Shared/Claude/wt/julkaisija-muutosloki-1-1-142 jäi osittain poistamatta (hakemisto ei tyhjentynyt,
  ~0,5 Gi, git worktree jo pruned). Yösiivous tai uusi `rm -rf` kun mikään ei kirjoita siihen.
