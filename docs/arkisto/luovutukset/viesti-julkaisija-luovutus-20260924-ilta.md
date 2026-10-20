# Julkaisijan luovutus 24.9.2026 ilta (klo 19.3x)

Julkaisija (Opus 5.5, Fablen päätöksellä kunnes yöajo 25.9. klo 04 on ajanut kerran itsestään → Sonnet).
Lue tämä, edellinen luovutus viesti-julkaisija-luovutus-20260924.md ja natiivi-testflight-putki-20260924.md.

## 1. TestFlight (natiivi, proto3d-testflight.yml)

Tänään sisäiseen ryhmään (kaikki versiolla 1.0.0):

| Build | CFBundleVersion | proto | ajo |
|---|---|---|---|
| 6 | 202609240852 | 7b3adee | 35976465318 |
| 7 | 202609241135 | 24c9194 | 35990807670 (ensimmäinen -nographics) |
| 8 | 202609241220 | f6de924 | 35996178210 |
| 9 | 202609241305 | 9a5618b | 36000776943 |
| 10 | 202609241607 | b9755e9 (= f02376b + tiimihotfix) | 36025102019 |

Muutosloki-natiivi: buildit 6–9 mainissa (#3055 #3072 #3079 #3092); build 10 PR #3111 (jonossa).
Fablen tekstit ylittävät usein työkalun rajan (≤ 3 lausetta, ≤ 280 merkkiä) → tiivistä ja kerro Fablelle.

**Build 11 -kaava (kaikki mainissa):**
- Näkyvä versio = 1.0.<ordinaali> (#3107): build 11 → "1.0.11". Ordinaali inputista `ordinaali` tai ajurin
  laskurista `/Users/Shared/Claude/proto-3d/lokit/testflight-ordinaali.txt` (+1; nyt **10**), kasvaa vasta
  onnistuneen latauksen jälkeen. `versio`-input ohittaa (build 10 ajettiin `-f versio=1.0.0`).
  CFBundleVersion pysyy aikaleimana.
- Unity-vienti `-batchmode -nographics` (#3071): toimii vaikka konsolissa olisi toinen macOS-käyttäjä.
- Unity-tarkistus vain ajurin omalle käyttäjälle (#3110): omistajan (samireivinen) Unity ei enää ohita ajoa.
  Oma `pgrep` sandboxissa ei näe toisen käyttäjän prosesseja — luota workflow'n lokiin (yo-testflight.log).
- EI avainnippujen hakulistan vaihtoa: kokeilu (haara poistettu) katkaisi koodauksen gh-tokenin kaikilta
  sessioilta. Build 10:n allekirjoitusvika (errSecInternalComponent, Xcode valitsi login-nipun
  "Apple Development: Sami Reivinen (FD3S699799)") korjattiin omistajan toimella A (set-key-partition-list
  login-nippuun). Vanhan 2RX77QMLHA:n poisto kesken omistajalla.
- Tiimi: Developer-tili on RCD77XPB7M (secret TEAM_ID). F72JLS57C5 oli Xcoden Personal Team; Natiivisepän
  hotfix b9755e9 palautti sen hetkeksi TF-oletukseksi, Fable päätti palauttaa RCD77XPB7M kaikkiin (Natiiviseppä).
- Kaava ennallaan: Natiiviseppä ilmoittaa SHA:n → Fable käskee → tarkista proto (master, puhdas, Unity kiinni)
  → ilmoita Natiivisepälle + Natiivi-UI:lle + Laitetestaajalle + Linssisepälle alku → aja → "vienti valmis"
  heti kun Unity-vaihe on ohi → build-numero Fablelle. Kaatumisesta HETI Fablelle.
- Sama jonoryhmä (savukkeet-mac-macilla) kuin savukkeilla ja natiivi-yoportilla: uusi odottava ajo peruu
  vanhemman odottavan. Älä käynnistä ryhmän ajoja, kun TF-ajo odottaa (pending).

## 2. Web-jono (työkalut /Users/Shared/Claude/julkaisija-tyokalut/)

- `jono.sh` (JATKA=1 = jatka virheen yli), `valmistele.sh`, `mergaa.sh <PR> <otsikko> <head-SHA>`.
- Uutta tänään: `pidossa.txt` (ohitettavat PR:t; nyt **3081** kunnes Siirtoseppä ilmoittaa build 10:n →
  build 10 on nyt TestFlightissa, kysy Siirtosepältä), `yhdista-lisaykset.py` (semanttinen liitos
  kulttuuri-kategoriat/saatiedot/maakartat.js + tools/piirra-kaupunkikartta.mjs: avaimet = main + haaran uudet,
  node --check), `palauta-versio.py` (vanhat versiorivit mainin tasolle ennen versiotyökalua).
  jono.sh poistaa edellisen PR-worktreen aina (levy: yksi kerrallaan).
- Mainissa tänään v2158–v2195 (noin 60 PR:ää).
- **Jonossa luovutushetkellä** (loki /tmp/claude-502/jono-20260924a.log): #3078 (v2196 valmisteltu, merge
  käynnissä), sitten #3048 #3049 #3050 #3052 #3053 (sää), #3080 #3082 #3083 #3084 #3087 #3088 #3089 #3090
  #3091 (kohdekartat), #3111 (build 10 -rivi), #2913 ja #3094 (uudelleen, versiopalautuksella).
  Jos taustaprosessit katosivat nollauksessa, aja: `JATKA=1 zsh jono.sh <puuttuvat>` (tarkista ensin mitkä
  ovat jo mainissa: `gh pr view N --json state`).
- #3081 pidossa (ks. yllä). #2999 suljettu (#3093 korvasi). #2966 #2972 suljettu (N-erät kattoivat).

## 3. Perutut savukkeet uusittaviksi (omistajan hyväksymä peruminen build 10:n tieltä)

Yksi kerrallaan `gh run rerun <id>`: 36004651653 36021034498 36015739323 36014078994 36012521720
36010732919 36001610202. Uusinta oli käynnissä (taustatehtävä); tarkista `gh run view <id>` ja aja puuttuvat.
"Julkaise peli" 36020424867 peruttiin, mutta myöhemmät merget ovat julkaisseet mainin — ei tarvita.
Muiden sessioiden ajojen PERUMINEN on luokittimen estämä → pyydä Fablea.

## 4. Muuta

- Workerit: pöllö/ehdotukset/sähke julkaistu 17.28 (#3096, kehitystunniste fi.matkakirja.peli.kehitys).
  Sähke-workerin D1-oikeus korjattu (omistaja).
- Linssikatalogin artefakti (claude.ai/code/artifact/70aa8279-…) päivitetty repon linssikatalogi.html:stä v8.
- siivoa-levy.sh (proto): lokikansiot pois 2 vrk jälkeen, md + viitatut kuvat PR:nä ensin (mergetty).
- Luokitin estää: muiden sessioiden CI-ajojen perumisen, käsin tehdyn Unity-viennin sessiosta,
  avainnippujen muutokset (omistajalle).
