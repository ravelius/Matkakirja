# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-28 12:10 EEST — **Kierto normaali. Koodaus-CPU 513,9% (raja 800%, nousussa mutta ei ylitä). Effort-tarkistus OK.** Juna-vahti korjasi toisen jumin itse (linssiseppa-käännökset 11:38→11:58). Uusi postilaatikkoviesti (Codex→Linssiseppä: ISS Cupola 2 -kuvat).

## 0) OMISTAJAN UUSI SÄÄNTÖ (Päätoimittaja 10:5x, sitova klo 17 asti)

Omistaja käyttää Macia klo 17 asti — Clauden koko kuorma enintään puolet. Käännökset yksi kerrallaan Julkaisijan vuorolla matalalla prioriteetilla, simulaattoreita enintään yksi, ei agenttiparvia rinnakkain (enintään 1 agentti per rooli), ei raskaita paikallisia ajoja.

**KORJAUS 11:44–11:47 (Päätoimittaja + Julkaisija):** load1 EI ole oikea mittari — se sisältää omistajan oman koneenkäytön, I/O-odotuksen, ja `taskpolicy -b`-prosessien runnable-jonotuksen vaikka CPU on idle. **Oikea seuranta: `ps -Ao user,%cpu | awk '$1=="koodaus"{sum+=$2} END{print sum}'`** (koodaus-käyttäjän CPU-osuus yhteensä, raja 800%/5min) **JA `top -l 1` idle%**. Spotlight-poikkeuksen (mds_stores) hoitaa omistaja itse Järjestelmäasetuksista. Julkaisija rajasi junan testisarjan 4 rinnakkaiseen (--test-concurrency=4).

**KLO 17 JÄLKEEN (omistaja hyväksyi "nice-oletuksen" 11:31, tuleva sääntö):** kuorma1 > 10 -hälytys poistuu. Sen sijaan valvotaan, että raskaat prosessit (poltot, xcodebuild, chromium-savukkeet, `node --test` -sarjat) ajavat `nice ≥ 10` (`ps -o nice,comm`) — jos raskas prosessi nice 0 yli 5 min, yksi rivi omistavalle roolille. GPU-sääntö jää voimaan: Mac-savukkeita ≤ 2, simulaattoreita ≤ 1 päivällä. Ennen klo 17 nykyinen puolikas-kuorma-valvonta (tämä osio) on voimassa.

**Kuorma 61,2 (10:59) → 216 (11:01) → 114 (11:06) → 118 (11:10, tasaantunut).** load1 on rullaava 1 min keskiarvo ja laahaa perässä — **rakenteellinen paraneminen näkyy jo: R/Rs-tilaisia prosesseja 109→88→30**, eli akuutti ruuhka on purkautumassa vaikka mittari ei vielä näytä sitä. Nyt näkyvin: `il2cpp` (Unity natiivikäännös, alkoi 10:59, todennäköisesti aloituslento-työtä), `mds_stores` heilahtelee (2,3%→58%), 2× `sisaltopaketti.test.mjs`. Odotetaan load1:n laskevan seuraavalla kierroksella R/Rs-pudotuksen mukana.

**11:10 Päätoimittajan konteksti 66% — ylitti 65% kynnyksen.** Ilmoitettu. **11:1x Päätoimittaja nollautui itsenäisesti (9%), resume-viestiä ei enää tarvittu.**

Aamupäivän kuormasekaannus (load1 61→216→...→104) selvitetty ja korjattu: väärä mittari + Julkaisijan junan testisarja rajattu 4 rinnakkaiseen. Uusi mittari (koodaus-CPU+idle%) käytössä, ks. osio 0.

## 1) Sessiot

Kaikki kontekstit alle kynnyksen. **Postivahti (self) 69% — ei koske kynnystä, mutta lähestyy luovutusrajaa (85-90%), seurataan.**

| Rooli | Session id | Konteksti | Tila |
|---|---|---|---|
| Päätoimittaja (ent. Fable) | local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 | 20% | running |
| Postivahti (self) | (tämä sessio) | 69% | running |
| Julkaisija | local_24e63224-112c-449a-b6a3-e10e4ed43f4b | 34% | running |
| Natiiviseppä (max) | local_fcc10552-5810-49bf-b0cf-188456f1231c | 43% | running |
| Pelikoodari | local_11aca9cd-eda6-4db9-9019-8a153c8b8795 | 55% | running |
| Natiivi-UI | local_c6d63773-0270-4873-96f8-63c66cf52794 | 9% | running |
| Linssiseppä (max) | local_7a457b99-7ecd-4634-93a0-0c02b53e8d24 | 50% | running |
| Siirtoseppä (high) | local_6cef0cb2-ae2e-4677-b85c-2eeb192f10c4 | 46% | running |
| Karttaseppä | local_16f80454-5b30-4180-ae9b-8c6d1edb6779 | 39% | running |
| Sisältökirjuri | local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708 | 57% | running |
| Laitetestaaja | local_36a45147-8407-4cfb-bbdb-c20d5f684735 | 27% | running |

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

Ei avoimia jumeja eikä kortteja omistajalle. Varmuuskopio-VIKA.txt pysyy ratkaistuna (2 riviä, ei kasvua). **Postilaatikko 12:08: uusi viesti** — `posti/codex-linssiseppa-cupola2-20260928.md` (Codex→Linssiseppä: ISS Cupola 2 -kuvat toimitettu). Ilmoitettu Päätoimittajalle.

**Juna toimii normaalisti** — 25379266 ennallaan 12:00. Juna-vahti korjasi 2. jumin itse (linssiseppa-käännökset 11:38→11:58, Unity-puu tapettu). Tauon lippu ei ole palautunut. **Julkaisulippu päällä** (aikaleima 12:08, sallittu).

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

## 5) Resurssit (12:10)

- **5 h -kiintiö:** 3 %. **Viikko (kaikki mallit): 20 %.** **Viikko (Päätoimittaja):** 0 %.
- **Levy:** 140 Gi vapaana, hyvä puskuri.
- **Muistipaine:** normal (1). **NAS:** 5,6 Ti vapaana. **Simulaattorit boottina:** 0 (päiväraja 1).
- **Liput:** `/tmp/matkakirja-julkaisu` PÄÄLLÄ (aikaleima 12:08). `/tmp/matkakirja-juna-tauko` ei ole palautunut.
- **Konteksti (kynnys Päätoimittaja 65%/roolit 70%):** kaikki alle kynnyksen. Postivahti (self) 69%.
- **Claude-kuorma (uusi mittari klo 17 asti, raja 800%/5min):** koodaus-CPU 513,9%, idle 52,6% — nousussa mutta ei hälytystä.
- **Juna-vahti:** korjasi 2. jumin itse 11:37 ja 11:58 (molemmat käännökset, Unity-puu tapettu) — ei toimenpidettä.
- **GPU-prosessit (type=gpu-process):** 14 kpl, yhä yli rajan (>4) — ei uutta ilmoitusta.
- **Effort-tarkistus (7 Opus-roolia):** tehty 12:10 — kaikki OK, ei poikkeamia.
- **Lokisiivouskandidaatteja:** ei tällä kierroksella.
- **Postilaatikko:** 1 uusi viesti (Codex→Linssiseppä: ISS Cupola 2 -kuvat) — ilmoitettu.
- **Fablen session nimi: Päätoimittaja (Opus, xhigh)**, sama id.
- **PR #3441 (eheysvartija):** VIKA.txt tyhjä, ennallaan "Kunnossa".
- **Lokisiivous-kandidaatit (korjattu 18:0x, oikea komento `find -mmin +2880`/`+1440`, aiempi `-mtime +2` antoi väärän 0-tuloksen):**
  - **Lokit >48h:** 47 kansiota, yhteensä **~11,8 Gt**. Suurimmat: liikkuminen-pariteetti 2,4G, aloituslento-84 478M, pariteetti-b12 361M, loydos74-video-20260925 359M, verkko-odotus-app 306M, valot-kohdemaa-app 306M, loydos51 250M, loydos61-d17-ipad11 124M, etusivulento-112 116M, verho-jalkeen/verho-ennen/b16-verho-kylma ~100M kukin — loput <100M (täysi lista `/tmp/lokisiivous-kandidaatit.txt` Postivahdin scratchpadissa tämän session ajan).
  - **.app-paketit >24h:** 14 kpl, yhteensä **~9,5 Gt** (laatta-esilataus/b23koe.app 359M, esilataaja-5:n 4 pakettia ~346–359M, musiikki-v23/esilataaja-mittari/pohja-26 (2)/musiikki-v1 (2)/loydos155/loydos153/huntu-paljastus-b19 ~333–346M kukin).
  - Poisto omistajan luvalla Fablen kortilla — Postivahti ei poista itse.
- **Varmuuskopio:** ratkaistu, ei kasvanut.

## 6) proto-3d/lokit — tila

43G yhteensä. 47 kansiota >48h (~11,8 Gt) + 14 .app-pakettia >24h (~9,5 Gt) — ks. kohta 5, listattu Fablelle 18:0x. Poisto odottaa omistajan lupaa Fablen kortilla.
