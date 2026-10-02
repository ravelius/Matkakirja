# Julkaisijan luovutus 2.10.2026 klo 22.1x (viikkoraja 92 %)

TF-suunnitelma ja historia: /Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt.
Web-junan pinot: /Users/Shared/Claude/julkaisija-tyokalut/aamujono-20261002.txt (loppuosa). Pidossa: pidossa.txt.

## TestFlight (versio 1.1, build = juokseva numero)

- Ladattu 2.10.: **116, 118, 120, 123, 124, 126, 128, 129** = 8/12. 117/119/121/122/125/127 ohitettiin
  (sisältyivät seuraavaan tai eivät saaneet BUILDia).
- **TF 129** = proto master e204abbe (juna 0b5c8d87, käännös 745d8ff0), ladattu 21.29, ulkoinen ajo käynnistetty.
- **Raja (omistaja 20.1x)**: laskuri nollautuu 3.10. klo 12.30. Tänä iltana/yönä enintään 2 latausta (9–10),
  lataukset 11–12 säästetään 3.10. aamuun ennen 12.30. Isot junat ~2–3 h välein. Kipsipäät eivät saa omaa TF:ää.
- Kaava: muutosloki-PR (`node tools/vienti/muutosloki-natiivi.mjs --versio "1.1 (NN)" --teksti "…"`, ≤ 3 lausetta /
  280 merkkiä, `node --test tests/vienti.test.mjs`) → merge → `gh workflow run proto3d-testflight.yml --ref main
  -f vie_unitysta=true -f versio=1.1 -f ordinaali=NN -f proto_ref=SHA -f build_numero=NN` → valmistuttua
  `gh workflow run testflight-ulkoinen.yml --ref main -f build_numero=NN` → rivi Päätoimittajalle.
- Vienti ottaa käännöslukon (odottaa enintään 45 min) → älä anna testikäännöksiä juuri ennen vientiä.
- Pakkopush on estetty: jos muutosloki-haara pitää korvata, tee uusi haara (esim. -128) ja sulje vanha PR.
- **TestFlight-luvut** (omistajan kysymys): `gh workflow run testflight-luvut.yml --ref main` (vain luku, #3873).
  20.3x: 6 asennusta / 3 istuntoa 12 buildissa, tämän päivän buildeilla 0; Arvioijat-linkki 0 katselua.

## Web-juna (22.1x)

- Ajossa **#3865** (£-varakirjasin), jonossa #3870 (GALLERIA-pohja + Julisteet) ja #3877 (Aarteet yhteen ikkunaan).
- Mergetty tänään mm. #3828, #3833, #3839, #3840, #3843, #3844, #3845, #3847, #3849, #3851, #3853, #3854, #3856,
  #3857, #3859, #3860, #3862, #3864, #3866, #3867, #3869, #3873, #3874, #3875.
- Pinot: tekijä mergeää mainin edellisen squashin jälkeen ja ilmoittaa → vasta sitten `zsh julkaisija-tyokalut/jonoon.sh NNNN`.
- "fetch epäonnistui" = kahden jonottajan git-kilpailu, ei vika → aja jonoon uudelleen.
  RISTIRIITA → poista `wt/julkaisija-prNNNN` (`git worktree remove --force`) ja pyydä tekijää mergeämään main.
- Raamattu/loki-PR:t (vain docs/raamattu-loki + js/tyohuone-raamattu.js): `gh pr merge NNNN --squash` suoraan.

## Ämpäri

- **Pysyvä vientilupa** (omistaja 2.10.): `/Users/Shared/Claude/julkaisija-tyokalut/vie-paketti.sh <_valmiit/*-vienti-*>`
  aina yksinään. Vaatii SHA256SUMS + LAHTEET.md/MANIFEST.md, ei symlinkkejä, ei ylikirjoitusta (head-object), loki
  vie-paketti.log. Osoittimet (uusin.json) ja ylikirjoitukset vaativat edelleen omistajan OK:n.
- Tänään viety: ajattelijat (Sokrates, Marcus, kartan päät, fontit, kytkin), avaruuskävely v1, 8 loistoaikakuvaa,
  julisteiden 116 pikkukuvaa.

## Olavinlinna

- Osoitin = ec7eb28617fddb9f (omistaja vaihtoi 15.4x, #3851 mainissa). Siirtosepän linna-skin (hahmot + kontaktivarjo)
  on juna 129:ssä mutta näkyy vasta uudella paketilla → osoittimen vaihto vain omistajan OK:lla.
- Siirtoseppä selvittää kontaktivarjoa (ei näy alfalla < 1; koesarja 39a396e3 simuun ~22.13).

## Natiivi

- Seuraava juna 130 Natiivisepältä: mm. matalampi yläpalkki, kokoelmat-ikkuna, Topografia-hampurilainen, astro-palaute.
- BUILD = proto master (Natiiviseppä ilmoittaa SHA:n). Savuke Laitetestaajalla (1572C658).

## Vuorot (22.1x)

- Simu: Linssiseppä (topografia, ~22.14) → Siirtoseppä (koesarja ~4 min) → Natiivi-UI (kokoelmat, ~12 min).
- Käännöslukko /tmp/matkakirja-kaannospalvelu.lukko/kuka. 1 simulaattori kerrallaan, muisti ≥ 50 %,
  uninstall + shutdown omalla UDID:llä. Juna-käännös bootaa hetkeksi 3B4CDACB/993F8873 (normaali asennus).
- Etusija: linna ja ISS, juna/TF, sitten omistajan/Päätoimittajan kuvat, sitten testit.
