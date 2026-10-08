# PR-katsaus 8.10.2026 (Laitetestaaja, vain luku)

Tilaus: Päätoimittaja, 8.10. Mikään PR:ää ei suljettu eikä mergetty. Avoimia PR:jä oli katsauksen alussa 68, lopussa 67. Katsaus kattaa kaikki 58 yli 3 vrk vanhaa PR:ää (#2926–#3980) sekä uudemmat #3993–#4088, #4143 ja #4179 lyhyesti.

Menetelmä: jokaisen PR:n pää haettiin (`refs/pull/N/head`) ja sen koko diffi (merge-base → pää) koeajettiin tuoretta `origin/main`-indeksiä (277589418 → 4a69d8db4) vasten: `git apply --cached --check` (menisikö sellaisenaan päälle) ja `-R` (onko muutos jo mainissa). CI:n tila luettiin `gh pr checks`illä. Ei yhtäkään testiajoa tai simulaattoria.

## Yhteenveto
- **Jo mainissa toista reittiä: 1 auki oleva** — #3993 (diffi palautuu mainista tavulleen: kohde-muunnos on mainissa, tuli todennäköisesti #4001:n kautta). Lisäksi katsauksen aikana **#4070 mergettiin** (8.10. 07.18) ja **#4035 suljettiin** (sen sisältö oli #4070:ssä).
- **Konfliktissa: 2** — #3077 (docs) ja #3832 (tyylikirja).
- **Ei konfliktia mainia vasten, ei mitään jo mainissa: kaikki muut.** Mergen estää siis ei tekninen konflikti vaan päätös/koordinaatio (alla).
- **Punainen CI: 3** — #2926, #3275, #4029 (ks. alla). Kaksi PR:ää (#3980, #4179) ja #3077:llä ei ole CI-ajoja lainkaan.

## 1. Jo mainissa / korvattu
| PR | Havainto | Suositus |
|---|---|---|
| #3993 `linnanrakentaja-kohde-sijoitus` | `git apply -R` onnistuu mainia vasten → sama muutos jo mainissa (tools/dioraama/sijoitus.mjs muuntaa `kohde`-pisteen; testi tiedostossa tests/dioraama-sijoitus.test.mjs). PR:n oma diffi ei enää mene päälle (konflikti = jo tehty). | Sulje (Päätoimittajan päätös). |
| #4070 | **MERGED 8.10. 07.18** (4a69d8db4). | Ei toimea. |
| #4035 | **CLOSED** (sisältö #4070:ssä, kuten #4070:n kuvaus sanoi). | Ei toimea. |

## 2. Konfliktissa
| PR | Konflikti | Yhä tarpeen? |
|---|---|---|
| #3077 (13 vrk, docs) | `docs/raamattu-loki/paatokset-2026-09.md` ja `docs/raportit/pariteetti-natiivi-20260924.md` (mainissa muuttuneet 954 commitin aikana). Ei CI-ajoja. | Vain dokumentteja (Ei webissä -osio E1–E20, luovutus g, lokirivi). Todennäköisesti vanhentunut: web jäädytettiin 3.10., pariteettiraportti on sen jälkeen kirjoitettu monta kertaa. Suositus: sulje tai rebase vain lokirivin osalta, jos E1–E20 on yhä voimassa. |
| #3832 (5 vrk, tyylikirja) | `css/styles.css` ja `tyylikirja/tyylikirja.json`. Generoitu tiedosto → ratkaisu on rebase + `node tools/tyylikirja.mjs`, ei käsin. | Kyllä: mainin `pohjat.LAUTAPELI` on yhä vanha (teemat paperi+tumma, tumma tilapaneeli, sumennus vain kartta). Omistajan 2.10. päätös (tumma paneeli → paperi, pehmennys kaikille taustaelementeille) ei ole mainissa. Odottaa Natiivi-UI:n rebasea. |

## 3. Ei konfliktia, ei mainissa — mikä estää mergen
**Karttaseppä / työkalut (13 vrk, kaikki puhtaita mainia vasten, CI vihreä):**
- #3117 aluenimet em-kuvaus — pieni (2 tiedostoa), mainin `aluenimet-natiivi.json` kuvaus on yhä vanha → yhä tarpeen, ei estettä paitsi unohdus. Yhden rivin merge.
- #3102 raportti natiivin paikannimistä (löydös 38; Fable valitsi b:n, toteutus #3100 on mainissa) — pelkkä raportti; arvo vain arkistona.
- #3105 Liberation Serif -fontit + polttotyökalun pysäytys (6 tiedostoa, fontit eivät mainissa). Webin polttoon liittyvä; sama kysymys kuin #3077: onko web-poltto enää ajankohtainen (web jäädytetty)? Päätös Karttasepältä/Päätoimittajalta.
- #3108 satelliittipinta (työkalu, 1960 riviä, raportti, testi): omistajan kortti "lennon pinta", ei mainissa. Estää: odottaa ajoa/hyväksyntää; tarve riippuu natiivin lentotilan suunnasta.

**Siivous-PR:t (raportit ja kuvat repoon):** #3275 (12 vrk), #3980 (3 vrk), #4179 (uusi, 20 tiedostoa).
- #3275: `testit` PUNAINEN, mutta lokissa `# fail 0` (viimeinen rivi), joten vika on todennäköisesti ajoympäristö (lopun jälkeinen NotAllowedError-rivi / aikakatkaisu), ei sisältö. Ajettava uudelleen tai ohitettava. Sisältö (2 md-tiedostoa) on puhdas.
- #3980 ja #4179: ei CI-ajoja lainkaan (ei `workflow_run`:ia docs-PR:lle) → "odottaa Fablen hyväksyntää" kuvauksen mukaan.

**#2926 savukkeet-mac concurrency (14 vrk):** `savukkeet-mac` PUNAINEN (ajo 23.9.: `savuke-glnimiot-nimet/nostot.mjs` kaatui ennen väitteitä). Mainin workflowssa concurrency on yhä haarakohtainen (`savukkeet-${{ github.ref }}`) → muutos on yhä tarpeen. Estää: vanha punainen ajo. Ajettava uudelleen mainin päälle tai ehdotettu muutos viedään Julkaisijan kautta uudella PR:llä (workflow-muutos vaatii savukkeen punaisen ajon uusimista).

**#3619 pariteettikatsaus 29.9. (8 vrk, raportti):** puhdas, CI vihreä; arvo arkistona, estää vain hyväksyntä.

**Codex-miniatyyri-PR:t (44 kpl `codex/eurooppa-miniatyyrit-*`, #3450–#3509, kaikki DRAFT, 10 vrk; lisäksi #3460):** kaikki puhtaita mainia vasten, CI vihreä, mikään ei mainissa. Kuvaus kaikissa: "Luonnos odottaa Fablelta sisältöjunan/versionoston koordinointia; pelissä ei varmennettu". Kaksi eri tyyppiä:
- **Kuvamuutokset (23 kpl; WebP + `tools/miniatyyri-mitat.json`):** #3450–#3458, #3461, #3462, #3471, #3477, #3478, #3484, #3492, #3494, #3495, #3501, #3502, #3504, #3505, #3509. Kaikki muokkaavat samaa `miniatyyri-mitat.json`-tiedostoa → ne eivät mergeydy peräkkäin ilman rebasea (jokainen PR on yksittäin puhdas, mutta toisen mergen jälkeen JSON-rivit voivat törmätä, jos viereisiä). #3452 muokkaa lisäksi `tests/miniatyyrit-leikkaus.test.mjs`. Mainin `assets/kartat/miniatyyrit/` (414 tiedostoa) ja mitat.json on viimeksi muutettu sisältöjunassa 27.9. (#3448) → ei korvaavaa reittiä mainissa.
- **Pelkät auditit (20 kpl; vain docs/raportit: raportti + ennen/jälkeen-jpg, ei muutosta peliin):** #3464, #3466, #3467, #3470, #3476, #3481, #3482, #3486, #3487, #3489, #3491, #3493, #3497–#3500, #3503, #3506–#3508: arkistoarvo, lisäävät pelkkiä jpg:itä docs/raportit/kuvat/ (repon paisuminen). #3460 dokumentoi 23 R2-toimitusta (manifesti), ei muutosta peliin.
- **#3483 Firenze**: eri luokka — koskee `js/pallolaatat.js`, `js/packs/miniatyyrit.js`, `tests/piirtokoe-asetus.test.mjs` ja savuke-piirtokokeita (CI-korjaus), joten sitä ei pidä mergetä muiden joukossa; tarkista erikseen, onko korjaus vanhentunut (se rakennettiin 1.10. mainin päälle, mainissa on 416 commitia sen jälkeen).
- Ehdotus Päätoimittajalle: päätä kerralla (a) otetaanko kuvapäivitykset sisältöjunaan yhtenä erä-PR:nä (yksi rebase, mitat.json kerran) ja (b) suljetaanko audit-PR:t arkistoitaviksi yhteenvetoraporttina.

**Linnanrakentaja / Siirtoseppä (3–2 vrk):**
- #3976 Tavli Blender-skriptit, #3979 akustiikkaverkot: puhtaita, vihreitä; #3979 kuvauksen mukaan Steam Audiota ei ladata ilman omistajan lupaa (tämä PR sisältää vain työkalun). Estää: odottaa tuotantoa/lupaa.
- #4006 Olavinlinna Final IK -data: puhdas, vihreä; muokkaa `js/dioraama/rakennukset/olavinlinna/fatabuuri.js` — mainissa on #4001 (kohtaukset v3) ja sen jälkeen kenties muutoksia samaan hakemistoon; ennen mergeä `git merge-tree` -tarkistus ajankohtaisella mainilla.

**Sisältökirjuri/Codex:** #3969 (varustekuvake, draft, ei CI-ajoja), #4029 (varustekuva oppaalle, draft; `reitti` CANCELLED → ajettava uudelleen), #4050 (Tott, draft, vihreä), #4143 (kuumailmapallo, draft, vihreä, media R2:ssa). Kaikki puhtaita; estää draft-tila ja Fablen/Päätoimittajan hyväksyntä.

**Pelikoodari:**
- #3994 natiivin asetukset (sisältöpaketti 1.59): puhdas, vihreä. Muokkaa `.github/workflows/vie-sisalto.yml` ja `tests/sisaltopaketti.test.mjs`; version/sisältöpaketin nosto Julkaisijalle. Odottaa junaa.
- #4088 oppaan Opus-kytkin valmiiksi (ei päällä): puhdas, vihreä, `tools/pollo/worker.js` — **workerin muutos: Päätoimittajan 7.10. muistisääntö vaatii TF-todennuksen vanhaa natiivia vasten ennen julkaisua** (litteät kentät). Odottaa mallipäätöstä omistajalta.

## 4. Ei toimia minulta
Mitään ei suljettu, mergetty, rebasettu tai kommentoitu. Rekisteri: `refs/remotes/pr/*` on haettu tähän checkoutiin (vain lukua varten).
