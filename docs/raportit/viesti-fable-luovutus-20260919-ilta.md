# Fablen luovutus Mac Studiolla — 19.9.2026 iltapäivä (Suomen aikaa)

Sessio 19.9.2026 klo 08.27 – noin 16.00 Suomen aikaa (omistaja pyysi resetin).
Kaikki tila on repossa, Raamatussa (Fablen haara claude/bold-ride-vow4ki) ja tässä.

## Lue ensin

CLAUDE.md, docs/roolitus.md, tämä raportti, docs/moduulit/siirtoraportti.md,
ja Raamatusta (js/tyohuone-raamattu.js): MAC STUDIO A–E (E = kuorma ja CI:n
jako, luvat korttina), AGENTIT VAIN OPUS JA SONNET tarkennukset 1–11,
KARTTAUUDISTUKSEN PAATOKSET 43 (kohta 7 TILA 1–4, kohta 10 TILA 2), 44–49
(44 = Ranskan nostot ja TILA, 45 laivamatkan noppa, 46 pohjalaatat, 47 nopan
kamera, 48 EU-maiden nostot Sonnet-sessiolla, 49 musta laatta).

## Tila

**main = v1955 (PR #2605)**, plus työkalu-PR:t #2601–#2604. Tuotanto
matkakirja.app: v1954 (v1955 Pages-julkaisu kesken luovutushetkellä).

| Versio | PR | Sisältö |
| --- | --- | --- |
| v1947 | #2590 | Astronautin kamera pyramidista + sumu, topografialinssin meret/navat, kohdevalinta, saatto, Ohita, kaupungit piiloon |
| v1948 | #2593 | Ranskan 27 hahmotelmanoston sisällöt + 81 Commons-kuvaa, maastokohteiden kuvat |
| v1949 | #2594 | Aito NASA-pilvikuva (alfa luminanssista), astro-savukkeet kalibroitu |
| v1950 | #2596 | Laivamatkan noppa jäi näkymättömään liukuun (PAATOKSET 45) |
| v1951 | #2597 | Topografialinssi: pohjalaattojen jono keskeytyy lipun kääntyessä (46) |
| v1952 | #2598 | Ranskan 18 maalehtinostolle toinen Commons-kuva |
| v1953 | #2599 | Nopan jälkeen kamera jäi tyhjään kohtaan: zoomikatto kumosi ulossovituksen (47) |
| v1954 | #2600 | Ohita-nappi pinon päälle ja Liikun yläpuolelle (43 k10 TILA 2) |
| v1955 | #2605 | Astro-kohdeotsikko sanan rajalta, napamittari lohko 47, pohjapallo kartan sävyyn + musta laatta -vartija (49) |
| — | #2591, #2592 | AGENTS.md, siirtoraportin ohje (Claude Projects -kokeilun PR:t; Projects ei käytössä) |
| — | #2595 | astro-aani: väite 3 mittaa humina-soittimen samuutta |
| — | #2601 | Savukkeiden Chromiumit ilman Macin mediapaneelia (ei auttanut: MediaRemoteUI kaatuu simulaattorin äänistä) |
| — | #2602 | astro-pallo 45c mittaa sädekehän nostoa suhteessa taustaan |
| — | #2603 | Savukkeiden latauksen aikakatkaisu FAIL-riviksi (tanger, noppa) |
| — | #2604 | pollo.test: aikarajat CPU-aikana |

## Pushatut mutta julkaisemattomat haarat ja avoimet PR:t

- **#2606 opus-local-testit-github** — Testit GitHubin ubuntu-runnerille, Macin savukesarja 12 → 6 rinnakkain, paikallinen 4. Mergeä kun Testit (ubuntu) ja Savukkeet vihreitä. Jos ubuntu-ajo kaatuu verkkoon, kysy Opus 1:ltä.
- **#2607 claude/bold-ride-vow4ki-v1956** — Espanjan 30 hahmotelmanostoa + 68 kuvaa (ämpärissä karttanostot/20260920/, HEAD 200 68/68). Mergeä vihreänä. Tarkista `git fetch` + uusi-versio ennen mergeä, jos main liikkuu.
- **origin/sonnet-nostot-ita** — Italian kohdelista (hyväksytty); vaihe 2 (hahmotelma-ita.js + kuvat kansioon /Users/samireivinen/Matkakirja-nostot-kuvat/ita/) Sonnet 2 -sessiolla kesken. Kun valmis: pistokoe, `aws s3 cp` ämpäriin karttanostot/20260920/ (`source ~/.zshrc`, `--endpoint-url $PAATE`), HEAD-tarkistus, v1957.
- **origin/opus-local-napakansi** — vain raportti (premissi kumottu), ei mergettävää.
- **Opus 1 -sessio: erä opus-local-jaameri** kesken: Jäämeren jääpaino kevyemmäksi (tools/reliefivarit.mjs), 4k-pallokuva uudella tunnisteella kansioon /Users/samireivinen/Matkakirja-opus-tulokset/. Kun valmis: Fable vie kuvan ämpäriin (matkakirja/linssit/ tai reliefi-polku, katso js/reliefikuva.js), tarkistaa verkosta, ottaa tunnistecommitin mukaan versioon.
- Vanhat haarat (astro-*, pilvikuva, laivamatka-tanger, topografia-seepia, ohita-kortti, noppa-saapuminen, musta-laatta, maalehtikuvat, sonnet-local-*): mainissa, voi poistaa.
- Vanhat avoimet PR:t #2527, #2493, #2459, #2457, #2450, #2446, #2413, #2325, #1455: edellisiltä viikoilta, ei käsitelty tänään.

## Kesken — tee nämä ensin

1. **Mergeä #2606 ja #2607** vihreinä (CI ajaa yhden jobin kerrallaan Macilla). Synkkaa Fablen haara mainiin (`git merge origin/main`, Raamattu ours).
2. **Italia v1957**: kun Sonnet 2 viestii vaiheen 2 valmiiksi (tai lue origin/sonnet-nostot-ita), pistokoe 3 nostoa + 3 kuvaa (sips -Z 480), vienti, HEAD, versio, PR. Sitten seuraava maa Sonnet 2:lle (Saksa tai Portugali; kattavuusdokumentti).
3. **Jäämeren uudelleenpoltto**: Opus 1:n raportti docs/raportit/viesti-fable-jaameri-20260919.md → vienti ämpäriin, tunniste, savuke-astro-pallo lohko 47, versio.
4. **Ranskan testipeli kierros 6** (Sonnet 1): Pariisi-hyppy vaatii kehittäjätilan "maailma"-kytkimen hetkeksi päälle (omistaja antoi luvan; Sonnet 1:n oma lupaluokitin esti kuvakaappauksen — omistaja hyväksyy sen sessiossa). Simulaattorissa äänet pois testien ajaksi. Testattavaa vielä: Ohita oikeassa saapumisessa, hahmotelmanostot laitteella, Astronautin kamera v1955:llä.
5. **ESP- ja ITA-nostoankkurien lukitus** (vie-nostoankkurit + tools/maamaski.mjs; LUKITUT_MAAT vain FRA) ennen mahdollista polttoa — Finisterre, Stromboli, Elba renkaan ulkopuolella.

## Odottaa omistajan päätöstä

- Ei avoimia. Tänään päätetyt: Claude Projects pois (Raamattu-osio Projects), Espanjan pilotti (48), luvat aina korttina (MAC STUDIO E), Testit GitHubiin + rinnakkaisuus (E), fokuszoom jätetään nykyiselleen (43 k10), napalevy uudelleenpoltolla (43 k7 TILA 4).

## Voimassa olevat työtavat

- Kolme paikallista apusessiota (omistaja käynnistää Claude-appissa, nimet ListAgentsissa): **Opus 1** (koodi, worktree ../Matkakirja-opus), **Sonnet 1** (QA, simulaattori, ../Matkakirja-sonnet), **Sonnet 2** (EU-maiden karttanostot, ../Matkakirja-nostot). Ohjaus SendMessagella (nimi kuten ListAgents näyttää; nimet voivat vaihtua), `notify_when_idle: true` tehtävän mukana. Sessiot raportoivat gitillä + viestillä, eivät tee PR:iä/versioita; Fable avaa PR:t suoraan niiden haaroista (`gh pr create --head <haara>`) tai kokoaa versio-PR:n.
- Fablen omat Agent-työkalun erät edelleen Opus/Sonnet, worktree, 45 min; enintään kaksi selainerää, EI CI-ajon aikana (MAC STUDIO E).
- Simulaattorityökalun opit: screenshot px vs tap pt (÷2,29), open_url → `xcrun simctl openurl`, kehittäjätila sqlite-kirjoituksella (memory: mac-studio-tyoymparisto).

## Julkaisukaava

docs/roolitus.md Julkaisusäännöt: `git checkout -B <haara> origin/main`, merge erähaarat + Fablen haara (Raamattu), `node tools/uusi-versio.mjs "<alle 60 merkkiä>"`, `node --test tests/*.test.mjs` (# pass/# fail), tarkista-kaksoisavaimet, build-standalone, commit, push, PR, odota Testit + Savukkeet, `gh pr merge --squash`, Pages, tuotannon versio `fetch main.js`. Pelkkä tools/- tai docs-muutos ilman versionostoa.

## Ympäristö ja infra

- Runnerit: SamiMacStudio2 (Savukkeet, 6 rinnakkain #2606:n jälkeen), SamiMacStudio2-testit (vapautuu, kun Testit ubuntulla). CI-lokit artefaktista `gh run download <id>`.
- Ämpäri: `source ~/.zshrc` → AWS_*/AMPARI/PAATE; vienti `aws s3 cp --recursive --endpoint-url $PAATE`, tarkistus aina verkosta (HEAD 200).
- Avaimet: Raamattu MAC STUDIO B. Ei arvoja repoon.
- Simulaattori iPhone 18 Pro UDID 283EDDD1-56DB-4B84-A148-5E842645957D, tuotanto-osoite, kehittäjätila päällä, peli Bukarestissa.
- coreaudiod-jumi poistui Claude-appin uudelleenkäynnistyksessä; MediaRemoteUI kaatuu simulaattorin äänistä → äänet pois testeissä.
- Vanhat agenttiworktreet siivottu (24 → 0,6 Gt); jäljellä .claude/worktrees/agent-a6b70708cc45b89cf (haara tyo, v1938-pohjainen muokkaus) omistajan päätettäväksi.

## Avoimet velat ja opetukset

Velat:
1. Topografialinssin seepiavartio kaatui äärikuormassa (kuorma 96) v1951:n jälkeenkin (3 laattaa lipun nousun jälkeen) — v1951 ei kata kaikkia polkuja; tunnettu punainen poistettu, seuraa.
2. PAATOKSET 47 avoin: zoomikaton siirto ajaKameran omaksi ehdoksi (kaikki ulossovitukset).
3. Pöllöindeksin CPU 215–237 ms ylittää omistajan 200 ms tavoitteen (ei vartioitu).
4. Seinäkellorajat tests/livia-aani (872, 881) ja tests/sw (722, 735) kuormaherkkiä.
5. Maalehtinostoilla ei kysymyksiä (PAATOKSET 44 ei vaadi).
6. PAATOKSET 44 kohta 4 havainnekuvat (kuvaputki).
7. Astro-webkit: laattalaikut ja sininen rengas navalla eivät toistuneet Chromiumilla — WebKit-epäily.
8. Sonnet 1:n havainto: bussi/juna eivät avaa yleiskarttaa; kehittäjähyppy vaatii maailma-kytkimen.

Opetukset:
- Kuormasta: 12 rinnakkaista CI-Chromiumia + agenttien selaimet + simulaattori = kuorma 96 ja häilyviä punaisia. Nyt 6 + sääntö E.
- Simulaattoritestaajan kolme kierrosta meni koordinaattiskaalaukseen, aloituskaupunkien tulkintaan ja linssin Aktivoi-nappiin ennen kuin yksikään Ranska-löydös syntyi — tarkka ohje ja opit-osio promptiin.
- Hypoteesit olivat kolmesti väärin (noppa luennan aikana, kohteet suodatettu, napakansi): agenttien mittaus ratkaisi. Anna agentille lupa kumota premissi.
- Paikalliset peer-sessiot toimivat: viestit kulkevat, sessioiden nimet voivat vaihtua (ListAgents ennen SendMessagea), ja niiden lupaluokitin on oma (omistaja hyväksyy siellä).

## Aloitusviesti uudelle sessiolle

```
Olet Fable, päätoimittaja pelissä Matkakirja ja unohdettu aarre, Mac Studiolla (repo ravelius/Matkakirja, työkansio /Users/samireivinen/Matkakirja-fable). Aja ensin: git fetch origin && git checkout -B claude/bold-ride-vow4ki origin/claude/bold-ride-vow4ki. Lue CLAUDE.md, docs/roolitus.md, docs/raportit/viesti-fable-luovutus-20260919-ilta.md ja Raamatusta (js/tyohuone-raamattu.js) osiot MAC STUDIO A–E, AGENTIT VAIN OPUS JA SONNET tarkennukset 1–11 ja KARTTAUUDISTUKSEN PAATOKSET 43–49. Sitovat säännöt: vain Fable kirjoittaa Raamattuun; omistajan sanat sanatarkasti ASCII:na ennen työtä; kellonajat aina Suomen aikaa (tarkista date); agentit vain Opus/Sonnet (Agent-työkalu, worktree, aikakatto 45 min, ei PR:iä agenteilta, yksi kohdemittaus, enintään kaksi selainerää eikä CI-ajon aikana); kolme paikallista apusessiota (Opus 1, Sonnet 1, Sonnet 2 — nimet ListAgentsista) ohjataan SendMessagella ja ne raportoivat gitillä; Fable kokoaa julkaisu-PR:t itse ja mergeää, kun Testit ja Savukkeet ovat vihreitä; kaikki mahdollinen ajetaan Macilla, avaimet ~/.zshrc, ämpärivienti tarkistetaan verkosta; luvat ja päätökset omistajalta aina AskUserQuestion-korttina. Ensimmäinen tehtävä: mergeä PR #2606 (Testit GitHubiin) ja #2607 (v1956 Espanja) vihreinä ja synkkaa Fablen haara mainiin; sitten Italian hahmotelma (Sonnet 2:n haara sonnet-nostot-ita, vaihe 2) pistokokeella, kuvien vienti ämpäriin ja v1957; sitten Opus 1:n Jäämeren uudelleenpolton vienti ja versio. Vastaa suomeksi, tiiviisti.
```
