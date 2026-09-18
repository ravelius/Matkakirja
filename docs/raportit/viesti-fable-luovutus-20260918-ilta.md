# Fablen luovutus Mac Studiolla — 18.9.2026 ilta

Sessio 18.9.2026 klo 11.00–19.10 Suomen aikaa (reset aamun sessiosta klo 10.55).
Kaikki tila on repossa, Raamatussa (Fablen haara claude/bold-ride-vow4ki) ja tässä.
Lue ensin: CLAUDE.md, docs/roolitus.md, Raamatun osiot MAC STUDIO: UUDEN SESSION
ALOITUS, AGENTIT VAIN OPUS JA SONNET (tarkennukset 1–11), KARTTAUUDISTUKSEN
PAATOKSET 33 (tark. 2), 34 (kohdat 13–20) ja 37 (tark. 3–5), ASTRONAUTIN KAMERA
LISAYS 16.

## main = v1944 (PR #2586). Julkaistu tänään: v1938–v1944

| Versio | PR | Sisältö |
| --- | --- | --- |
| v1938 | #2577 | kerma heti + meret, liuskan pohja/marginaalit/zoomi, nostot kasvavat, Ranskan lukitut ankkurit, nostotaso 2026-09-18 + pallo g; korjaukset: niputus, astro-savuke, poltetut kaupunkipisteet, liuskan keskitys (8k), piilotettu merkki palaa, nostolaput 6/7 |
| v1939 | #2578 | reliefipyramidi topografialinssin oletus (LISAYS 16 k49), luennan huntu -vika, nimiöiden reunus |
| v1940 | #2581 | liuska: piste piiloon, väripallot irti, ei animaatiota; Pariisi- ja Nähtävyydet-rivien kevyet näkymät (34 k16) |
| v1941 | #2582 | nostotaso 2026-09-19 + pallo h: kaupunkipisteiden muste pois |
| v1942 | #2584 | kerma ilman laatikon reunaa (peitto 0,95), nostot lukossa ja maalla (50 ankkuria), NOSTOTASO MAITTAIN (nostotasot[ISO]), pallo i ILMAN nostoja, jäsenyys datasta, Nähtävyydet-arkki kevyt (34 k17) |
| v1943 | #2585 | hotfix: kerma WebKitissä (kohdemaa jäi kerman alle iPhonella) |
| v1944 | #2586 | maailmatilan loitonnus (k19), pluskupla pois + "Näytä puhekuplat" (k20), nähtävyyskartalle vain rakennukset, 19 kohdetta liuskaan, kokoruutu korjattu, selitteet ja +/- pois (k18) |

Työkalu-PR:t: #2579 (CI-portti: rivit jaettu, Mac 8 rinnakkain), #2580 (poltto ilman
välitilaa), #2583 (Testit Macille), #2587 (CI kierros 2 — ks. alla).

## Ämpärin tila (media.matkakirja.app)

- Luettelo julisteet/pyramidi/pyramidi.json: pohja 2026-09-07a, viivat 2026-09-08a-viivat,
  nostotaso 2026-09-19-maittain JA taulu nostotasot[ISO] (112 maata). Peli lataa vain
  kohdemaan nostolaataston (js/laattapyramidi.js nostotasonKirjaus, js/pallolaatat.js
  nostotMaittain).
- Pallon sarja julisteet/pallo/laatat/2026-09-07a-i/ ILMAN nostoja (laatat.json nostot null).
  js/pallo.js PALLO_LAATTATUNNISTE 'i', PALLO_SARJASSA_NOSTOT false, sw.js LAATTAKANSIO
  '2026-09-07a-i'. Pallon sarjaa EI enää polteta --nostot-lipulla.
- Seuraava poltto (esim. ankkurit muuttuvat): julkaisuhaaran worktreestä
  `PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js
  tools/polta-paikallisesti.sh --nostot-ja-pallo --nostoversio <uusi> --pallotunniste j
  --pallo-ilman-nostoja --pallo-osia 16 --ulos <scratchpad>` (~20 min, luettelo viedään
  viimeisenä, ei välitilaa), sitten tunniste j pallo.js/sw.js/tests/pallo.test.mjs.

## CI (kaikki Macilla)

- Testit: runner SamiMacStudio2-testit (label testit), REITTI=mac testit.yml:ssä.
- Savukkeet: runner SamiMacStudio2 (label savukkeet), 23 riviä, SAVUKE_RINNAKKAIN 12
  (#2587), seinäkello ~4,5 min. Tunnetut Mac-punaiset sarjat.jsonissa (kuormahäilyt).
- Sääntö (Raamattu 37 tark.): pallolaatat.js:n ja kerman muutokset mitataan myös WebKitillä
  (savuke-kerma-reuna.mjs --webkit).

## Avoimet velat (Raamatussa kohdittain)

1. 390 px saapumisnäkymä jättää 12 Ranskan nostoa ja 2 kaupunkia (Strasbourg, Nizza) kuvan
   ulkopuolelle (PAATOKSET 17 sovittaa korkeuteen) — omistajan päätös.
2. Kokoruutu pystyruudulla täyttää leveyden, ei korkeutta (kartta vaakakuva) — omistajan päätös.
3. Hahmotelman 12 varastokohdetta (docs/raportit/viesti-fable-...hahmotelma) lisäämättä.
4. Siivous: .pollo-kuplapalautus-CSS ja js/ui.js PULUN_PIILO_OSAT (kuollutta koodia).
5. Reliefi: WebKit-luvut, nimiön kontrasti 4,5:1, linssiketju ~700 ms, Astronautin kameran
   laastari pyramidista (LISAYS 16 k47).
6. Nostolaput-savukkeen Helsinki/Istanbul-näkymät lapputtomia.
7. Testit-jobin checkout (36 s) — #2587 kevensi (sparse ilman docs/), mittaus PR-ajosta.
8. SwiftShader (SAVUKE_CHROMIUM_LIPUT) A/B mittaamatta; ei käytössä.
9. Avaimet: FREESOUND_API_KEY ja EUROPEANA_API tyhjät ~/.zshrc:ssä; muut 10 täytetty.

## Omistajan sääntöjä tältä päivältä (Raamatussa)

- Pulun koodi on Fablen (Codexille vain kuva- ja äänitilaukset) — 34 k20 tark.
- Neljä agenttia rinnakkain; savuke päivitetään samassa erässä; limittäiset julkaisut;
  kaikki Macilla; avaimet etsitään ennen kysymistä (AGENTIT tark. 10, MAC STUDIO).
- Huntu (kerma) peittää muiden maiden musteen (0,95); nostot vain kohdemaasta.

## Aloitusviesti uudelle sessiolle

"Olet Fable, päätoimittaja pelissä Matkakirja ja unohdettu aarre, Mac Studiolla
(työkansio /Users/samireivinen/Matkakirja-fable). Aja ensin: git fetch origin &&
git checkout -B claude/bold-ride-vow4ki origin/claude/bold-ride-vow4ki. Lue CLAUDE.md,
docs/roolitus.md, docs/raportit/viesti-fable-luovutus-20260918-ilta.md ja Raamatusta
(js/tyohuone-raamattu.js) osiot MAC STUDIO: UUDEN SESSION ALOITUS, AGENTIT VAIN OPUS JA
SONNET tarkennukset 1–11, KARTTAUUDISTUKSEN PAATOKSET 33 tark. 2, 34 kohdat 13–20 ja 37
tark. 3–5. Vain Fable kirjoittaa Raamattuun; omistajan sanat sanatarkasti ASCII:na ennen
työtä; Suomen aika (tarkista date). Agentit vain Opus/Sonnet Agent-työkalulla, enintään
neljä rinnakkain, worktree, aikakatto 45 min, ei PR:iä agenteilta, yksi kohdemittaus,
savuke päivitetään samassa erässä; Fable kokoaa julkaisu-PR:n itse, valmistelee seuraavan
haaran heti edellisen päälle ja mergeää kun Testit ja Savukkeet (Macin runnerit) ovat
vihreitä. Kaikki mahdollinen ajetaan Macilla; avaimet ~/.zshrc (etsi ennen kysymistä).
Pulun koodi on Fablen; Codexille viesti vain kuva- tai äänitilauksesta. Kerma- ja
laattamuutokset mitataan myös WebKitillä. Pallon sarjaa ei polteta --nostot-lipulla.
Ensimmäinen tehtävä: odota omistajan puhelintesti v1944:stä ja hoida sen löydökset;
sitten luovutusraportin velat omistajan valinnan mukaan. Kysy omistajalta
AskUserQuestion-korteilla. Vastaa suomeksi, tiiviisti."
