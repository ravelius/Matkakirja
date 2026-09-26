# Julkaisijan luovutus 26.9.2026 klo 04.2x

Julkaisija (Opus 5.5) → seuraava Julkaisija. Syy: viikkokiintiö täyttymässä (tilinvaihto).
Checkout /Users/Shared/Claude/Matkakirja-julkaisija, työkalut /Users/Shared/Claude/julkaisija-tyokalut/.
Fable local_593b89a1-2514-4d74-b956-2a73db862382.

## Lue ensin

CLAUDE.md; Raamatun Ydinajatus kohta 2 (TYÖNJOHTAJAN HARKINTA, JUMI → FABLE, BUILD-JUNA,
HUOLTOKOMENNOT); docs/roolitus.md "Julkaisusäännöt"; tämä luovutus; edellinen viesti-julkaisija-luovutus-20260925-b.md (haara julkaisija-luovutus-20260925-b).

## Tila

- **TestFlight:** 1.0.13 (ddb3cfb6), 1.0.14 (7f68d1f7), 1.0.15 (4a813e60), 1.0.16 (7f3979b0),
  **1.0.17 (d04841a0, CFBundleVersion 202609260103, ajo 36206983409)**. Laskuri = 17.
  Yömerkki `yo-testflight-viimeisin.txt` = 6a65ead1 (proto-master, sama puu kuin 1.0.17).
- **Build 18:** juna/b13 kasvaa (99eaf8d9+). Kaava: Laitetestaajan PASS-commit →
  `gh workflow run proto3d-testflight.yml --ref main -f vie_unitysta=true -f ordinaali=18 -f proto_ref=<PASS>`.
  Peru ensin PR-savukkeet (sama ajuri!), ilmoita Natiivisepälle alku ja loppu. Viennin jälkeen päivitä
  yömerkki Natiivisepän master-mergen SHA:ksi (työnkulku kirjoittaa merkkiin proto_refin).
- Web mainissa v2247 asti (juna #3287 menossa). Raamattu synkattu #3262 asti.

## Kesken (taustaketjut katoavat sessiosta — tarkista gh:lla)

- **Juna #3287** (v2247: #3284 maakunnat 10 + #3286 salaisuuksien nimiöt): merge käynnissä.
- **Siirtosepän pino:** #3267 (1.45) → #3269 (1.46) → #3285 (1.47), kaikki versionostolla, järjestyksessä;
  Siirtoseppä korjaa seuraavan ristiriidan jokaisen mergen jälkeen (ilmoita sille). #3267 oli jonossa.
- **#3288** (miniatyyrien värit 504 erät 8–9): #3267:n jälkeen.
- Ei jonossa (kukaan ei pyytänyt): #3250 #3272 #3274 #3275 #3278 #3280 #3281, Karttasepän vanhat
  #3102 #3105 #3108 #3117. #3206 punainen. pidossa.pysyva = 3081.

## Tänään tehdyt työkalut

- **proto3d-testflight.yml:** LuoPallo ennen vientiä (#3161), syöte `proto_ref` (#3198).
- **vaihda-pyramidi-osoitin.yml** (#3217): osoitin vaihdettu 25.9. klo 19.00 → koe/2026-09-25;
  varmuuskopio pyramidi-20260925-1900.json (palautus: syöte palauta=).
- **vie-karttanostot-ampariin.yml** (#3282): 288 karttanostoa viety 26.9. (ajo 36207702414).
- **#3277:** niputuskorjaus (Elävän kartan natiivipaketit NIPUTTAMATTOMAT-listalle).

## Opit

- **Sessiolta R2-avainten lataus estetty** (luokitin). Älä kierrä toisen session kautta; ämpärikirjoitus
  aina Actions-secreteillä workflow_dispatch-työnkululla (Fablen linja B).
- **TF-vienti ja PR-savukkeet jakavat ajurin** (label savukkeet): peru savukkeet ennen vientiä.
- **Savukeajurin näyttöistunto** puuttui 25.9. alkaen → Karttaseppä #3243 (headless + Metal).
- **Main punaisena kaikki PR:t punaisia:** tarkista mainin Testit-ajo ennen kuin epäilet PR:ää
  (25.9. #3263 → tarkista-niputus). Uusi js/packs ilman selaintuojaa → NIPUTTAMATTOMAT, ei MODULES.
- **Codexin kuva-PR:t** ristiriidat tests/miniatyyrit-leikkaus.test.mjs:ssä: poista molempien puolten rivit.
- **gh-komennot aina repon hakemistossa** (muuten tyhjä squash-otsikko, 25.9. #3151–#3160).
- **Peruutus, joka laskee skeemaversiota**, vaatii palauta-ajon peruutuksen vientiajon jälkeen (Siirtoseppä).
- **Simulaattorivuorot:** enintään 2 päällä; ohjeista "booted < 2" ja lopetusilmoitus seuraavalle.
- SendMessage-raja 10/vuoro → varakanava mcp__ccd_session_mgmt__send_message session id:llä.
- Tuntihaku :17 on sessiokohtainen (CronCreate) — luo uudelleen (checkpoint 57649f67d).
