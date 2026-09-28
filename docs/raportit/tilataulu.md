# Tilataulu

**Päivitetty 23:44:** Levy 92 Gi. Muisti OK (paine 1, vapaa 53 %), load 48, sim 1, GPU-chrome 0 (23:33-rivin 10 oli virhe: laski kaikki chrome-headless). Kontekstit: ei mitattu. Juna OK (60f69fe4 käännetty 23:25). wt/ 13 kohdetta, 9,3 Gt. Posti: uusi Codex→Fable-viesti (Olavinlinnan poikkileikkauslinssin konsepti, c02d4aebe), ilmoitettu.

**Päivitetty 23:33:** Levy 93 Gi. Muisti OK (paine 1, vapaa 57 %), load 71, sim 0, GPU-chrome 10 (kirjattu, ei hälytystä ilman >4-tarkistusta: mittari laski kaikki chrome-headless). Kontekstit: ei mitattu. Juna OK: 60f69fe4 (23:18) käännetty 23:25, sisältää 8de5b3df. wt/ 12 kohdetta, 9,1 Gt (Siirtoseppä kuittaamatta).

**Päivitetty 23:22:** Levy 91 Gi (raja 80, wt-siivous: wt/ 33 → 14–15 kohdetta, 22 → 9,4 Gt; kuittaamatta Siirtoseppä, Linssiseppä). Muisti OK (paine 1, vapaa 63 %), load 52, sim 0, GPU-chrome 0. Kontekstit: ei mitattu tällä kierroksella. Juna: b13 HEAD 8de5b3df 23:02 kääntämättä (20 min, hälytys >23:32).

**Päivitetty 23:11:** LEVY 80 Gi = raja (ilmoitettu). Muisti OK (paine 0, vapaa 62 %), load 18, sim 1, GPU-chrome 0. Kontekstit <=56 %. Juna: b13 HEAD 8de5b3df 23:02 kääntämättä (<30 min).


**Päivitetty 23:00:** levy 83 Gi (laskee, raja 80), muisti WARN (2) vapaa 42 %, load-piikki 351. Sim 1, GPU-chrome 0. Kontekstit <=44 % tarkistetuista (Karttaseppä 56 % edellinen). Juna 1ad1c538 käännetty 22:18. Ilmoitettu Päätoimittajalle.


**Päivitetty 22:49:** ei poikkeamia. Levy 85 Gi, muisti WARN (2) vapaa 49 %, load 65 (laskee), sim 1, GPU-chrome 0. Kontekstit <=56 % (Karttaseppä), Päätoimittaja 43 %, Siirtoseppä 45 %. Juna 1ad1c538 käännetty 22:18. Ei ilmoitettu.


**Päivitetty 22:38:** levy 85 Gi OK. Muistipaine WARN (2), vapaa 48 %, load 414. Sim 1, GPU-chrome 0. Kontekstit: Karttaseppä 56 % korkein, Pelikoodari 26 %, Päätoimittaja 39 %, muut <=16 %. Juna 1ad1c538 käännetty 22:18. Codex-posti Fablelle (ISS Cupola 3) omaa.


**Päivitetty 22:27:** levy 84 Gi OK. Muistipaine WARN (2), vapaa 52 %, load huippu 362 (nice 15). Sim 1, GPU-chrome 0. Kontekstit: Linssiseppä 70 %; nollautuneet Natiivi-UI 15 %, Natiiviseppä 13 %, Linssiseppä 2 10 %, Julkaisija 14 %. Juna 1ad1c538 käännetty 22:18. Ilmoitettu Päätoimittajalle.


**Päivitetty 22:16:** LEVY 66 Gi vapaa (<80, ilmoitettu). Kontekstit: Natiivi-UI 90 %, Natiiviseppä 71 %, Linssiseppä 2 70 %, Julkaisija 69 %, Linssiseppä 62 %, Karttaseppä 56 %, itse 51 %, Siirtoseppä 45 %, Päätoimittaja 31 %, Pelikoodari 19 %; Sisältökirjuri/Laitetestaaja >100 % (200k-ikkuna, epäluotettava). Sim 1 auki, kevyt pois, GPU-chrome 0, muisti 57 % vapaa, load 23. Pulu-tarkistus 7ba726d04 (EI) ilmoitettu.


Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-28 15:10 EEST — **OMISTAJA VAPAUTTI KONEEN, KEVYT TILA POIS.** Ilmoitettu 7 GPU-roolille: GPU vapaa, simulaattori Julkaisijan vuorolla (päivällä 1), nice 15.

## 0) Kuorman/GPU:n valvonta (voimassa oleva tila, päivitetty 12:43)

**15:10 KEVYT TILA POIS (Päätoimittaja):** omistaja vapautti koneen. Takaisin normaaliin: raskaat työt nice 15 -prioriteetilla täysillä ytimillä sallittuja, simulaattoreita ≤ 1 booted päivällä, Mac-savukkeita ≤ 2 rinnakkain. Kaikille 7 GPU-roolille ilmoitettu. Load1 ei ole luotettava mittari (sisältää omistajan oman käytön + I/O-odotuksen) — käytetään tarvittaessa `koodaus`-käyttäjän CPU-summaa vain karkeana lisätietona, ei ensisijaisena hälytysperusteena.

**Vahtipyyntö (Päätoimittaja):** joka kierroksella tarkista `origin/claude/postilaatikko` → `posti/codex-fable-pulu-tekstit-tarkistus-20260928.md`. Kun ilmestyy, ilmoita Päätoimittajalle yhdellä rivillä: commit + "KAIKKI PELISSÄ kyllä/ei". Ei vielä olemassa (tarkistettu 15:1x).

**11:10 Päätoimittajan konteksti 66% — ylitti 65% kynnyksen.** Ilmoitettu. **11:1x Päätoimittaja nollautui itsenäisesti (9%), resume-viestiä ei enää tarvittu.**

**GPU-mittarin tarkennus (Julkaisija 12:5x):** ~10 gpu-process on sovellusten (Claude, Chrome, Spark, Unity Hub, CC, Codex, Aqua Voice) pysyviä — ei hälytysperuste. Hälytä Julkaisijalle jatkossa vain jos **chrome-headless-gpu-prosesseja on >4** (=yli 2 savuketta rinnakkain) TAI `/tmp/matkakirja-kevyt` on päällä ja Metal-chromiumeja näkyy.

**JUNA-MITTARIN KORJAUS (Päätoimittaja 13:0x):** 13:01 juna-hälytys oli VÄÄRÄ. Natiivisepän juna-vahti (launchd `fi.matkakirja.juna-vahti`) poistuu hiljaa kun juna/b13 ei muutu — juna.log pysyy vanhana ilman uusia committeja, tyhjä prosessilista on normaali. **Uusi sääntö: hälytä vain jos juna/b13:ssa on kääntämätön commit yli 30 min** (`git log -1` juna/b13-haaralle vs. juna.log:n viimeksi käännetty SHA) — ei enää pelkän prosessin/login hiljaisuuden perusteella.

## 1) Sessiot

**KYNNYS YLITTYI: Siirtoseppä 70% (uusi).**

| Rooli | Session id | Konteksti | Tila |
|---|---|---|---|
| Päätoimittaja (ent. Fable) | local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 | 40% | idle |
| Postivahti (self) | (tämä sessio) | 32% | running |
| Julkaisija | local_24e63224-112c-449a-b6a3-e10e4ed43f4b | 54% | running |
| Natiiviseppä (max) | local_fcc10552-5810-49bf-b0cf-188456f1231c | 21% | idle |
| Pelikoodari | local_11aca9cd-eda6-4db9-9019-8a153c8b8795 | 29% | idle |
| Natiivi-UI | local_c6d63773-0270-4873-96f8-63c66cf52794 | 44% | idle |
| Linssiseppä (max) | local_7a457b99-7ecd-4634-93a0-0c02b53e8d24 | 60% | running |
| Linssiseppä 2 (high) | local_e675f86d-210c-416b-8d83-926194307a44 | 37% | idle |
| Siirtoseppä (high) | local_6cef0cb2-ae2e-4677-b85c-2eeb192f10c4 | **70%** | idle |
| Karttaseppä | local_16f80454-5b30-4180-ae9b-8c6d1edb6779 | 54% | idle |
| Sisältökirjuri | local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708 | 29% | idle |
| Laitetestaaja | local_36a45147-8407-4cfb-bbdb-c20d5f684735 | 36% | idle |

## 1a-3) Karttasepän yöpoltto — VALMIS 07:17

Polku: `/Users/Shared/Claude/pyramidi-poltto/ajo-20260927y/`. aja.out 07:17 "2 koodi 1", vahti.out 07:17 "poltto päättyi koodi 1" — vahtiprosessi (PID 82063) päättynyt normaalisti. **2.log-eheysrivi: "eheystarkistus: laattojen määrä täsmää luetteloon"** — pohja z10 298335/298335, pohja z9 78211/78211, shardit 507/507, laattoja 376546/376546 (100%). Rivi "VIRHE: luettelon väritasot puuttuvat (ämpäri 27 maata) — ei vientiä" on **odotettu vientivartion ilmoitus** (sama kuvio kuin vaihe 1:n koodi 1, ei virhe). Kesto 6.4 h. Ilmoitettu Karttasepälle (local_16f80454-5b30-4180-ae9b-8c6d1edb6779) + Fablelle 07:18.

Koodi 1 klo 00:39 oli **odotettu** — vain luettelon vientivartion ilmoitus, ei virhe. Laatat/eheys kunnossa (119 495/119 495). Vaihe 1 merkitty valmiiksi. **Uusi vahti PID 82063 (v5e)** käynnistää vaiheen 2 (syvä, T7) ~00:52. Karttaseppä odottaa vaiheen 2 päättyvän todennäköisesti riviin "2 koodi 1" samasta vartiosta — **se on OK jos `2.log`:n lopussa on "eheystarkistus: laattojen määrä täsmää luetteloon".** **Seurataan PID 82063:a ja aja.out:ia — herätä Karttaseppä (local_4bd7c316-55bc-423a-9da1-821fdd123cab) JOKA TAPAUKSESSA kun "2 koodi" ilmestyy tai vahti kuolee**, riippumatta koodin arvosta (tarkista 2.log-eheysrivi ennen viestiä).

## 1a-2) Omistajan 23.58: vain striimiluenta-julkaisu, muut kirjoittavat luovutuksia

Julkaistaan vain striimiluenta (web #3513 + TF 1.0.34 puhetagit). Muut roolit tauolla, kirjoittavat luovutuksia — poltto jatkuu. Sen jälkeen tilinvaihto. **Postivahdin raportointi kapenee: ilmoitetaan Fablelle VAIN julkaisun jumeista ja polton hälytyksistä**, ei rutiinikontekstiraporteista roolien luovutuskirjoituksen aikana.

## 1a) YÖTAUKO klo 22.30 alkaen (Fable 21:4x, sitova)

Karttasepän yöpoltto klo 22.30–aamu (arvio). Roolit EIVÄT aja: savukkeita, headless-ajoja, koko testisarjoja, Unity-käännöksiä, simulaattoreita, Mac-CI:tä. Juna-build tauolla — **juna.login tauko-rivit EIVÄT ole hälytys tänä yönä.** Seurataan klo 22.45 jälkeen load average + raskaat prosessit (node, chrome-headless-shell, Unity, xcodebuild) — jos jokin rooli kuormittaa, nimetään Fablelle rivillä.

**ENSIMMÄINEN LÖYDÖS 22:32 (2 min tauon alusta):** `load averages: 149.72 130.27 143.29` — erittäin korkea. Tunnistetut prosessit: 1) Karttasepän oma pyramidipoltto (`wt/karttaseppa-poltto-20260927`) — odotettu yöpoltto. 2) `xcodebuild`/clang Unity-build klo 22:30:21 `proto-3d/Matkakirja-proto-kaannos`:ssa.

**TARKENNUS (Fable, omistaja 21.55):** Julkaisut saavat mennä polton aikana julkaisulipulla `/tmp/matkakirja-julkaisu` (polttovahti v5e pysäyttää tarvittaessa SIGSTOPilla). 22:30 xcodebuild on todennäköisesti 1.0.33-julkaisukäännös (luennan korjaus) — **sallittu**. Uusi hälytyskynnys: raskas ajo ILMAN julkaisulippua >10 min TAI lippu päällä >90 min. Tarkistettu 22:35: lippua ei löydy, mutta xcodebuild-prosessi on jo päättynyt (~5 min kesto) — ei ylitä 10 min rajaa, ei hälytystä. Linssiseppä 70%: tiedossa, nollaus erä 5:n mallinnuksen jälkeen — ei toimenpidettä.

## 1b) Uusi valvontakohta odottaa (Siirtoseppä/Fable 18:4x)

Eheysvartija (PR #3441, **ei vielä mergetty**, tiedostoa `proto-3d/lokit/eheysvartija/VIKA.txt` ei vielä olemassa). Kun PR mergetty: lue VIKA.txt joka kierroksella kuten varmuuskopio-VIKA.txt — tyhjä = kunnossa, ei-tyhjä → rivi Fablelle ja Siirtosepälle, tulos.md:n VIKA-rivi tilatauluun. Tiedossa oleva tila (ei uusi hälytys ennen muutosta): 3 × 404 Nouméan kuvat, Sisältökirjurilla työn alla.

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia jumeja eikä kortteja omistajalle. Varmuuskopio-VIKA.txt pysyy ratkaistuna (2 riviä, ei kasvua). Postilaatikko: EI UUTTA tällä kierroksella.

**Juna toimii normaalisti** — 25379266 ennallaan. Tauon lippu ei ole palautunut. Julkaisulippu poissa. **Kevyt-tilan lippu poistunut 12:43** — omistaja vapautti koneen, ks. osio 0.

**HUOM:** Fablen session nimi on nyt **Päätoimittaja (Opus, xhigh)** (sama id local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31). "Fable" ohjeissa = Päätoimittaja.

**Voimassa olevat sitovat säännöt (kooste, vanhat kierrospäivitykset poistettu — täysi historia git-lokissa):**
- Muistipaine korvasi swap-Gt-rajan: seuraa `kern.memorystatus_vm_pressure_level` (1=normal, 2=warn, 4=critical→ilmoitus).
- **Levyraja 80 Gt.** Nykytila 93 Gi vapaana, puskuri ~13 Gi — seurataan tiiviisti, ilmoita Fablelle jos puskuri <15 Gi (nyt jo alle, tarkkaillaan seuraavalla kierroksella jatkuuko lasku).
- **UUSI (Fable 12:5x): samireivinen-omisteiset (Codex-tili) tiedostot/worktreet EI poisteta, ei pyydetä rooleilta poistamaan — ilmoitus Fablelle, poistopyyntö menee Codexille postilaatikon kautta.**
- Worktree-sallinnot mainissa (PR #3329): git worktree remove/prune, --poista, simctl erase/delete — roolit poistavat itse omat mergetyt worktreensä.
- SendMessage-rajan täyttyessä (~10/vuoro) käytä varakanavaa `mcp__ccd_session_mgmt__send_message`.
- Lokisiivous: Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app), Fable poistaa omistajan luvalla — kerran vrk tai kun >5 Gt. Ei kandidaatteja tällä kierroksella.
- Effort-tarkistus: tarkistettu 07:0x tilinvaihdon jälkeen, ei poikkeamia (ks. osio 5).
- Postivahti EI koskaan poista tiedostoja itse — pysyvä poisto ehdottomasti kiellettyä.
- Chrome-GPU-prosessien (playwright/headless-testiajurit, type=gpu-process, chromium_headless_shell) ilmoitus menee Julkaisijalle, ei Fablelle. 07:0x: 18 kpl, ylitti rajan (>4), ilmoitettu.
- Työtilapolut, joissa "Codex" tai "ChatGPT", eivät ole poikkeama.
- **Viikkokiintiö (kaikki mallit, omistaja 09:4x sitova):** seurataan joka kierroksella. Kynnykset 93 %/95 %/97 %. **Nollautunut tilinvaihdossa 28.9. 07.0x — nyt 0 %.**
- Simulaattori-UDID-omistukset (27.9. selvitetty): 993F8873/C1D5E34C = Natiiviseppä, F989814A = Siirtoseppä, A2FD9C9F = Pelikoodari, 503000D1 = jaettu.
- **Konteksti-kynnykset (Fable 12.0x):** Fable ≥65 %, roolit ≥70 % → ilmoita Fablelle. (Postivahti/self ei koske.)

## 3) Avoimet PR:t

Ei tarkistettu tällä kierroksella (vanha luku ~40, karkea jako: Sisältö ~21, Toiminto ~10, Luonnos/raportti ~9). Julkaisija (#3306), Siirtoseppä (#3307), Karttaseppä (#3305), Natiivi-UI (#3324), Pelikoodari (#3304) mergetty.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22. Natiiviseppä vahvisti 09:04: proto/master nyt BUILD 28 (7788b629). (Ei vahvistettu tuoreempaa buildia TF:ssä tällä kierroksella — ks. Fablen luovutus: TF 1.0.27 ulkona, 1.0.28 Laitetestaajalla.)
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`. Juna yhä tauolla (Karttasepän Z10-poltto), viimeisin lokirivi 10:00 (tauko).

## 5) Resurssit (14:50)

- **5 h -kiintiö:** 36 %. **Viikko (kaikki mallit): 28 %.** **Viikko (Päätoimittaja):** 0 %.
- **Levy:** 124 Gi vapaana (87% käytössä), puskuri hyvä (raja 80 Gt).
- **Muistipaine: WARN (2) — uusi, ilmoitettu Päätoimittajalle.** **NAS:** ei tarkistettu erikseen. **Simulaattorit boottina:** 0 — kevyt-tila noudatettu.
- **Liput:** `/tmp/matkakirja-kevyt` PÄÄLLÄ — kone omistajan käytössä, tiukempi valvonta.
- **Konteksti (roolit ≥70%):** **KYNNYS YLITTYI — Siirtoseppä 70% (uusi).**
- **GPU (chrome-headless-gpu):** 0 kpl, ei Metal-chromiumeja — kevyt-tila noudatettu.
- **coreaudiod:** normaali (≤7,3%), ei toimenpidettä.
- **Effort-tarkistus (7 Opus-roolia):** ei poikkeamia.
- **Lokisiivouskandidaatteja:** ei tarkistettu tällä kierroksella.
- **Postilaatikko:** EI UUTTA.
- **Juna:** HEAD 877826ac (14:03) yhä katettu BUILD 36:lla (14:20), ei uusia committeja — ei jumia korjatulla mittarilla.
- **Juna:** käännetty 13:45 (7b7549c1), jono aktiivinen 13:48 — korjattu mittari (osio 0), ei jumia.
- **Fablen session nimi: Päätoimittaja (Opus, xhigh)**, sama id.
- **PR #3441 (eheysvartija):** VIKA.txt tyhjä, ennallaan "Kunnossa".
- **Lokisiivous-kandidaatit (korjattu 18:0x, oikea komento `find -mmin +2880`/`+1440`, aiempi `-mtime +2` antoi väärän 0-tuloksen):**
  - **Lokit >48h:** 47 kansiota, yhteensä **~11,8 Gt**. Suurimmat: liikkuminen-pariteetti 2,4G, aloituslento-84 478M, pariteetti-b12 361M, loydos74-video-20260925 359M, verkko-odotus-app 306M, valot-kohdemaa-app 306M, loydos51 250M, loydos61-d17-ipad11 124M, etusivulento-112 116M, verho-jalkeen/verho-ennen/b16-verho-kylma ~100M kukin — loput <100M (täysi lista `/tmp/lokisiivous-kandidaatit.txt` Postivahdin scratchpadissa tämän session ajan).
  - **.app-paketit >24h:** 14 kpl, yhteensä **~9,5 Gt** (laatta-esilataus/b23koe.app 359M, esilataaja-5:n 4 pakettia ~346–359M, musiikki-v23/esilataaja-mittari/pohja-26 (2)/musiikki-v1 (2)/loydos155/loydos153/huntu-paljastus-b19 ~333–346M kukin).
  - Poisto omistajan luvalla Fablen kortilla — Postivahti ei poista itse.
- **Varmuuskopio:** ratkaistu, ei kasvanut.

## 6) proto-3d/lokit — tila

43G yhteensä. 47 kansiota >48h (~11,8 Gt) + 14 .app-pakettia >24h (~9,5 Gt) — ks. kohta 5, listattu Fablelle 18:0x. Poisto odottaa omistajan lupaa Fablen kortilla.
