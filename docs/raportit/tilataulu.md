# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-27 22:45 EEST

## 1) Sessiot

Viikko (all models) **85 %** (nollautuu ma 28.9. klo 09:59/07:00 UTC), viikko (Fable) **76 %**. Kaukana kynnyksistä 93 %/95 %/97 %. Kaikki alle kynnyksen (Linssiseppä 70% ennallaan, nollautuu erä 5:n jälkeen tiedon mukaan).

| Rooli | Session id | Konteksti | Tila |
|---|---|---|---|
| Fable | local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc | 62% | running |
| Postivahti (self) | (uusi, luovutuksen jälkeen) | 55% | running |
| Julkaisija | local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629 | 47% | running |
| Natiiviseppä | local_04e2850b-d63c-481d-be73-c7d784a7cbcb | 55% | running |
| Pelikoodari | local_242febe9-d6cf-45ae-8280-faf394dc6e3e | 28% | idle |
| Natiivi-UI | local_e9fdc695-8421-4c14-a187-8881e73c835a | 26% | idle |
| Linssiseppä (max) | local_4b4b976c-42b6-4050-9232-dcd14ad3b2a4 | 70% — ennallaan, tiedossa | idle |
| Siirtoseppä | local_c264506b-dd61-4617-839f-23daf6d0bd5a | 61% | idle |
| Karttaseppä | local_4bd7c316-55bc-423a-9da1-821fdd123cab | 28% | running |
| Sisältökirjuri | local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3 | 64% | running |
| Laitetestaaja | local_3509b4ba-6000-4dea-869b-ecb22f4e3270 | 29% | running |

## 1a) YÖTAUKO klo 22.30 alkaen (Fable 21:4x, sitova)

Karttasepän yöpoltto klo 22.30–aamu (arvio). Roolit EIVÄT aja: savukkeita, headless-ajoja, koko testisarjoja, Unity-käännöksiä, simulaattoreita, Mac-CI:tä. Juna-build tauolla — **juna.login tauko-rivit EIVÄT ole hälytys tänä yönä.** Seurataan klo 22.45 jälkeen load average + raskaat prosessit (node, chrome-headless-shell, Unity, xcodebuild) — jos jokin rooli kuormittaa, nimetään Fablelle rivillä.

**ENSIMMÄINEN LÖYDÖS 22:32 (2 min tauon alusta):** `load averages: 149.72 130.27 143.29` — erittäin korkea. Tunnistetut prosessit: 1) Karttasepän oma pyramidipoltto (`wt/karttaseppa-poltto-20260927`) — odotettu yöpoltto. 2) `xcodebuild`/clang Unity-build klo 22:30:21 `proto-3d/Matkakirja-proto-kaannos`:ssa.

**TARKENNUS (Fable, omistaja 21.55):** Julkaisut saavat mennä polton aikana julkaisulipulla `/tmp/matkakirja-julkaisu` (polttovahti v5e pysäyttää tarvittaessa SIGSTOPilla). 22:30 xcodebuild on todennäköisesti 1.0.33-julkaisukäännös (luennan korjaus) — **sallittu**. Uusi hälytyskynnys: raskas ajo ILMAN julkaisulippua >10 min TAI lippu päällä >90 min. Tarkistettu 22:35: lippua ei löydy, mutta xcodebuild-prosessi on jo päättynyt (~5 min kesto) — ei ylitä 10 min rajaa, ei hälytystä. Linssiseppä 70%: tiedossa, nollaus erä 5:n mallinnuksen jälkeen — ei toimenpidettä.

## 1b) Uusi valvontakohta odottaa (Siirtoseppä/Fable 18:4x)

Eheysvartija (PR #3441, **ei vielä mergetty**, tiedostoa `proto-3d/lokit/eheysvartija/VIKA.txt` ei vielä olemassa). Kun PR mergetty: lue VIKA.txt joka kierroksella kuten varmuuskopio-VIKA.txt — tyhjä = kunnossa, ei-tyhjä → rivi Fablelle ja Siirtosepälle, tulos.md:n VIKA-rivi tilatauluun. Tiedossa oleva tila (ei uusi hälytys ennen muutosta): 3 × 404 Nouméan kuvat, Sisältökirjurilla työn alla.

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia jumeja eikä kortteja omistajalle. Varmuuskopio-VIKA.txt pysyy ratkaistuna (2 riviä, ei kasvua). Postilaatikossa uusi viesti 17:41 (Codex: Ateenan miniatyyrit Fablelle) — normaali PR-kuittausvuo, ei toimenpidettä Postivahdilta.

**Juna (Natiiviseppä 18:1x):** tauko purettu, lippu `/tmp/matkakirja-juna-tauko` poistettu omistajan luvalla. Juna-vahti kääntää nyt juna/b13:n kärkeä (55d15a01 → 1.0.32) Laitetestaajan simulaattoreihin, 10 min niputus — normaali toiminta.

**Voimassa olevat sitovat säännöt (kooste, vanhat kierrospäivitykset poistettu — täysi historia git-lokissa):**
- Muistipaine korvasi swap-Gt-rajan: seuraa `kern.memorystatus_vm_pressure_level` (1=normal, 2=warn, 4=critical→ilmoitus).
- **Levyraja 80 Gt.** Nykytila 97 Gi vapaana, puskuri ~17 Gi, laskee edelleen. Suurin kasvaja tarkistettu 18:00: wt/ 40G, proto-3d/lokit 43G — seurataan tiiviisti, ilmoita Fablelle jos puskuri <15 Gi.
- **UUSI (Fable 12:5x): samireivinen-omisteiset (Codex-tili) tiedostot/worktreet EI poisteta, ei pyydetä rooleilta poistamaan — ilmoitus Fablelle, poistopyyntö menee Codexille postilaatikon kautta.**
- Worktree-sallinnot mainissa (PR #3329): git worktree remove/prune, --poista, simctl erase/delete — roolit poistavat itse omat mergetyt worktreensä.
- SendMessage-rajan täyttyessä (~10/vuoro) käytä varakanavaa `mcp__ccd_session_mgmt__send_message`.
- Lokisiivous: Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app), Fable poistaa omistajan luvalla — kerran vrk tai kun >5 Gt. Ei kandidaatteja tällä kierroksella.
- Effort-tarkistus: ei tarkistettu tällä kierroksella (odotetaan roolien uusia session id:itä).
- Postivahti EI koskaan poista tiedostoja itse — pysyvä poisto ehdottomasti kiellettyä.
- Chrome-GPU-prosessien (playwright/headless-testiajurit, type=gpu-process, chromium_headless_shell) ilmoitus menee Julkaisijalle, ei Fablelle. Tällä kierroksella 3, ei ylitystä (raja >4).
- Työtilapolut, joissa "Codex" tai "ChatGPT", eivät ole poikkeama.
- **Viikkokiintiö (kaikki mallit, omistaja 09:4x sitova):** seurataan joka kierroksella. Kynnykset 93 %/95 %/97 % (viimeksi 97 % → "VIIKKO 97 — tilinvaihto"). **Nyt 63 %** (nollautuu ma 28.9. klo 09:59) — kaukana kynnyksistä.
- Simulaattori-UDID-omistukset (27.9. selvitetty): 993F8873/C1D5E34C = Natiiviseppä, F989814A = Siirtoseppä, A2FD9C9F = Pelikoodari, 503000D1 = jaettu.
- **Konteksti-kynnykset (Fable 12.0x):** Fable ≥65 %, roolit ≥70 % → ilmoita Fablelle. (Postivahti/self ei koske.)

## 3) Avoimet PR:t

Ei tarkistettu tällä kierroksella (vanha luku ~40, karkea jako: Sisältö ~21, Toiminto ~10, Luonnos/raportti ~9). Julkaisija (#3306), Siirtoseppä (#3307), Karttaseppä (#3305), Natiivi-UI (#3324), Pelikoodari (#3304) mergetty.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22. Natiiviseppä vahvisti 09:04: proto/master nyt BUILD 28 (7788b629). (Ei vahvistettu tuoreempaa buildia TF:ssä tällä kierroksella — ks. Fablen luovutus: TF 1.0.27 ulkona, 1.0.28 Laitetestaajalla.)
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`. Juna yhä tauolla (Karttasepän Z10-poltto), viimeisin lokirivi 10:00 (tauko).

## 5) Resurssit (22:45)

- **5 h -kiintiö:** 5 %. **Viikko (kaikki mallit):** 85 % (kynnykset 93/95/97 %, kaukana). **Viikko (Fable):** 76 % (nollautuu ma 28.9. klo 09:59).
- **Levy:** 70 Gi vapaana (jatkaa hidasta laskua ~2 Gi/10min, ei kriittinen <15 Gi). wt/-worktreet 33 kpl.
- **Muistipaine:** normal (1). **LOAD AVERAGE LASKENUT: 61.85/82.37/100.42** (oli 150 klo 22:32) — laskusuunta, ei enää yhtä kriittinen. **NAS:** 5,6 Ti vapaana. **Simulaattorit boottina:** 2 (natiiviseppa-iPhone, iPhone 17).
- **Konteksti (kynnys Fable 65%/roolit 70%):** Linssiseppä 70% ennallaan.
- **Juna:** normaali, KÄÄNNETTY 235e034e 22:43. Uusi xcodebuild-instanssi havaittu klo 22:45 (samassa Unity-projektissa) — alle 10 min uusi, seurataan; julkaisulippua `/tmp/matkakirja-julkaisu` ei löydy mutta Fablen 21:55-ohjeen mukaan hälytys vain jos lipputon ajo kestää >10 min.
- **PR #3441 (eheysvartija):** ennallaan "Kunnossa".
- **Postilaatikko:** uusi viesti 17:41 (Codex, Ateenan miniatyyrit) — normaali. **Avoimia PR:iä:** ei tarkistettu tällä kierroksella.
- **Lokisiivous-kandidaatit (korjattu 18:0x, oikea komento `find -mmin +2880`/`+1440`, aiempi `-mtime +2` antoi väärän 0-tuloksen):**
  - **Lokit >48h:** 47 kansiota, yhteensä **~11,8 Gt**. Suurimmat: liikkuminen-pariteetti 2,4G, aloituslento-84 478M, pariteetti-b12 361M, loydos74-video-20260925 359M, verkko-odotus-app 306M, valot-kohdemaa-app 306M, loydos51 250M, loydos61-d17-ipad11 124M, etusivulento-112 116M, verho-jalkeen/verho-ennen/b16-verho-kylma ~100M kukin — loput <100M (täysi lista `/tmp/lokisiivous-kandidaatit.txt` Postivahdin scratchpadissa tämän session ajan).
  - **.app-paketit >24h:** 14 kpl, yhteensä **~9,5 Gt** (laatta-esilataus/b23koe.app 359M, esilataaja-5:n 4 pakettia ~346–359M, musiikki-v23/esilataaja-mittari/pohja-26 (2)/musiikki-v1 (2)/loydos155/loydos153/huntu-paljastus-b19 ~333–346M kukin).
  - Poisto omistajan luvalla Fablen kortilla — Postivahti ei poista itse.
- **Varmuuskopio:** ratkaistu, ei kasvanut.

## 6) proto-3d/lokit — tila

43G yhteensä. 47 kansiota >48h (~11,8 Gt) + 14 .app-pakettia >24h (~9,5 Gt) — ks. kohta 5, listattu Fablelle 18:0x. Poisto odottaa omistajan lupaa Fablen kortilla.
