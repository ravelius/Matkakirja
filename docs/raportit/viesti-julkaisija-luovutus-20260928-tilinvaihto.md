# Julkaisijan luovutus 28.9.2026 klo 00.3x (tilinvaihto)

Julkaisija (Opus 5.5) → seuraava Julkaisija. Syy: omistajan päätös 27.9. 23.58 (vain
striimiluenta julkaisuun, sitten tilinvaihto). Checkout /Users/Shared/Claude/Matkakirja-julkaisija,
työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Fable local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc
(päätoimittaja tilapäisesti Opus). Natiiviseppä local_04e2850b-…, Pelikoodari local_242febe9-…,
Siirtoseppä local_c264506b-…, Karttaseppä local_4bd7c316-…, Sisältökirjuri local_0c172ea0-…,
Laitetestaaja local_3509b4ba-…, Postivahti local_63227b57-….

## Lue ensin

CLAUDE.md; Raamatun Ydinajatus kohta 2; docs/roolitus.md "Julkaisusäännöt"; edellinen luovutus
viesti-julkaisija-luovutus-20260927-tilinvaihto.md (työkalut) ja tämä.

## Tila 00.3x

- **TestFlight:** 1.0.29b (202609270957), 1.0.30 (202609271221), 1.0.31 (202609271444),
  1.0.32 (202609271721), 1.0.33 (202609272009) sisäisessä ryhmässä, What to test asetettu.
  Vikainen 1.0.29 (202609270926) VANHENNETTU. **1.0.34** (proto 17c2928b = build33 + puhetagit,
  202609272058) viennissä ajo 36351716395 klo 00.26 → tarkista valmistuminen, What to test
  asettuu automaattisesti taustaketjussa; ilmoita Natiivisepälle "vienti valmis" + Fablelle.
  Laskuri 34 (ordinaali-syöte).
- **Web:** v2347 tuotannossa (#3513 puhetagit, Pöllö julkaistu, puhemoottori xai tarkistettu).
  Skeemat 1.52–1.55 tuotannossa (vienti 36341050797 + #3488).
- **Juna tyhjä.** pidossa.txt tyhjä. Tauolla omistajan päätöksellä tilinvaihtoon asti:
  #3514 (ROU, odottaa Sisältökirjurin tarkistusta), #3516 (laattavika), #3517 (ihme-nappi),
  Codexin miniatyyri-PR:t #3458–#3509 (vain Fablen pyynnöstä sisältöjunana).

## Uudet käytännöt 27.9.

- **Muutoslokivartija (#3405):** proto3d-testflight.yml hylkää käsiviennin, jos
  tools/vienti/muutosloki-natiivi.json:ssa ei ole riviä "1.0.N (<build_numero>)". Kaava:
  B=$(date -u +%Y%m%d%H%M) → `node tools/vienti/muutosloki-natiivi.mjs --versio "1.0.N ($B)"
  --paiva … --teksti "…"` (≤ 3 lausetta, ≤ 280 merkkiä) → PR → mergaa.sh suoraan (vain JSON) →
  `gh workflow run proto3d-testflight.yml --ref main -f vie_unitysta=true -f ordinaali=N
  -f proto_ref=<sha> -f build_numero=$B`. Rivi on sisältöpaketissa, ei appissa.
- **What to test / vanhennus (#3409):** `gh workflow run testflight-sisainen.yml --ref main
  -f build_numero=<B> -f testattavaa="…" [-f vanhenna=true]`.
- **VIE:** jokaiselle buildille Fablen nimenomainen VIE (tai ennakkolupa viestissä).
- **Julkaisulippu** /tmp/matkakirja-julkaisu (omistaja 27.9. 22.0x, Karttasepän polttovahti
  laskee ytimiä): vain paikallisten vaiheiden ajan (valmistelun testit+build, TF-vienti Macilla).
  Ei CI-odotuksen ajan (Testit ajetaan ubuntulla). Vahti poistaa > 90 min vanhan. `jonoon.sh`
  kutsuu nyt `ajojono.sh`:ta (= jono.sh + lippu valmistelun ajaksi + worktree rm -rf).
- **Sisältöjuna:** `juna.sh "<rivi>" <PR…>` lukon alla (sisältö-PR:t yhdellä versionostolla);
  lippu päälle alussa, pois kun "juna PR #" tulostuu.
- **Docs-PR:t, joiden tiedostoja tests/ tai *-data.js lukee** (pelikatalogi.md,
  tilannekatsaus.md, linssikatalogi.md) aina junan kautta (Fable 27.9.).
- **Pinotut PR:t:** haaroja ei poisteta (ei --delete-branch) → base ei vaihdu itsestään ja
  squash aiheuttaa ristiriidan. Pyydä tekijää rebasettamaan origin/mainin päälle ennen junaa.
- **Mergen jälkeen pushatut commitit** eivät päädy mainiin → jatko-PR (esim. #3417, #3490).
- **Simulaattorit:** enintään 2 booted päivällä; yöllä polton aikana ei simulaattoreita ilman
  julkaisua. Vuorot "nyt"-viestillä.

## Opit / estot

- Luokitin esti: ämpärin poistokomennon valmistelun (omistaja tekee) ja toisen roolin
  sisältövientiajon perumisen (gh run cancel) — pyydä Fablea/omistajaa. PR-savukkeiden peruminen
  TF:n tieltä on sallittu (vakiokäytäntö).
- SendMessage-raja ~10/vuoro → varakanava mcp send_message session id:llä.
- Vie-sisältö-työnkulku (ubuntu) katkesi 30 min rajaan mediakuvien pienennyksessä → #3496
  (60 min, aikarajattu pienennys).
