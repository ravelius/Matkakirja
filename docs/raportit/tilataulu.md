# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-27 09:36 EEST

## 1) Sessiot

5 h **64 %** (seur. nollaus ~09:59:59 EEST, 23 min jäljellä), viikko (all models) 84 %, viikko (Fable) 45 %. Sisältökirjuri yhä 75 % (jo ilmoitettu). **Pelikoodari nollautui itse 81 %→10 % (PR mergetty, kuten Fable ennakoi) — ei toimenpiteitä.**

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_5df52e10-10e4-4b72-9554-0049db300dfe | 57% | running | — |
| Postivahti (self) | local_a24c43c0-8094-4141-b734-90b9555f5044 | 18% | running | — |
| Julkaisija | local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 | 56% | idle | — |
| Natiiviseppä | local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja) | 66% | idle | — |
| Natiivi-UI | local_44392b3c-86ee-4873-9d76-82f9aaa6b832 | 26% | idle | — |
| Linssiseppä (Opus, max) | local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 | 55% | idle | — |
| Sisältökirjuri | local_be1a3375-18cf-4068-94f3-887d55f0e196 | 75% | idle | yli 70 % (raportoitu) |
| Laitetestaaja | local_af48ba1e-41c2-4921-9068-28cf5cc71b0d | 57% | idle | — |
| Siirtoseppä | local_86d0c984-aeeb-430d-bc85-3112f27b9437 | 65% | idle | — |
| Pelikoodari | local_7fcab04b-864c-4ec2-98bd-46e171326701 | 10% | running | nollautui itse, PR mergetty |
| Karttaseppä | local_eec7f158-d9f3-4b93-9368-c50935bd19ab | 45% | idle | — |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia jumeja eikä kortteja omistajalle. Varmuuskopio-VIKA.txt (09:03-rivi) **vakaa kahdella peräkkäisellä kierroksella (09:24 ja 09:36) — ei kasva, sama yksi rivi.** Natiiviseppä tarkistaa.

**Voimassa olevat sitovat säännöt (kooste, vanhat kierrospäivitykset poistettu — täysi historia git-lokissa):**
- Muistipaine korvasi swap-Gt-rajan: seuraa `kern.memorystatus_vm_pressure_level` (1=normal, 2=warn, 4=critical→ilmoitus).
- **Levyraja 80 Gt.** Nykytila 134 Gi vapaana, kaukana rajasta.
- Worktree-sallinnot mainissa (PR #3329): git worktree remove/prune, --poista, simctl erase/delete — roolit poistavat itse omat mergetyt worktreensä.
- SendMessage-rajan täyttyessä (~10/vuoro) käytä varakanavaa `mcp__ccd_session_mgmt__send_message`.
- Lokisiivous: Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app), Fable poistaa omistajan luvalla — kerran vrk tai kun >5 Gt. Ei kandidaatteja tällä kierroksella.
- Effort-tarkistus: 7 Opus-roolia `high`; Linssiseppä `max` nimetty oikein (viim. tarkistettu 09:0x).
- Konteksti ≥70% (rooleilla, ei Fable/self) → ilmoita Fablelle. Normaali 70 % sääntö voimassa kaikilla (Pelikoodarin erikoisraja päättyi eikä ole enää relevantti, koska rooli nollautui).
- Postivahti EI koskaan poista tiedostoja itse — pysyvä poisto ehdottomasti kiellettyä.
- Chrome-GPU-prosessien (playwright/headless-testiajurit, type=gpu-process) ilmoitus menee Julkaisijalle, ei Fablelle. Tällä kierroksella 3, ei ylitystä.
- Työtilapolut, joissa "Codex" tai "ChatGPT", eivät ole poikkeama.
- **UUSI 09:4x (omistaja, sitova, Fablen kautta):** Viikkokiintiö (kaikki mallit) seurataan JOKA kierroksella. ≥93 % → ilmoita Fablelle heti (ennakkovaroitus). ≥97 % → ilmoita Fablelle rivillä "VIIKKO 97 — tilinvaihto" (Fable pysäyttää sessiot ja kirjoittaa siirtopromptin). Nyt 84 % (09:36).

## 3) Avoimet PR:t

Ei tarkistettu tällä kierroksella (vanha luku ~40, karkea jako: Sisältö ~21, Toiminto ~10, Luonnos/raportti ~9). Julkaisija (#3306), Siirtoseppä (#3307), Karttaseppä (#3305), Natiivi-UI (#3324), Pelikoodari (#3304) mergetty.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22. (Ei vahvistettu tuoreempaa buildia tällä kierroksella — ks. Fablen luovutus: TF 1.0.27 ulkona, 1.0.28 Laitetestaajalla.)
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`. Juna yhä tauolla (Karttasepän Z10-poltto), viimeisin lokirivi 08:00 (tauko).

## 5) Resurssit

- **5 h -kiintiö:** 64 % (seur. nollaus ~09:59:59 EEST). **Viikko (kaikki mallit):** 84 %. **Viikko (Fable):** 45 %.
- **Levy:** 134 Gi vapaana (raja 80 Gt — kaukana, vakaa). **Muistipaine:** normal (1). **NAS:** 5,6 Ti vapaana (raja 500 Gt vapaana — OK). **wt/-worktreet:** 48 kpl.
- **Simulaattorit boottina:** 3 (natiiviseppa-iPhone, iPhone 17, iPad Pro 11-inch M5; max 4 päivällä — OK). **coreaudiod:** normaali (alle 200 %). **Headless-testiajureita (chromium_headless_shell, type=gpu-process):** 3 (raja >4, ei ylitystä).
- **Konteksti:** Sisältökirjuri 75 % (yli, jo raportoitu), Siirtoseppä 65 %, Natiiviseppä 66 %, Laitetestaaja 57 %, Julkaisija 56 %, Linssiseppä 55 %, Fable 57 %, Karttaseppä 45 %, Natiivi-UI 26 %, Postivahti (self) 18 %, Pelikoodari 10 % (nollautui).
- **Juna:** yhä tauolla (Karttasepän Z10-poltto 26.–27.9.) — ei hälytystä, tarkoituksellinen.
- **Postilaatikko:** ei uutta. **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku ~40).
- **Lokisiivous-kandidaatit (>48h lokit-alikansiot, >24h .app):** ei kandidaatteja.
- **Varmuuskopio:** `varmuuskopio-VIKA.txt` vakaa, sama yksi rivi (09:03) kahdella kierroksella peräkkäin — ei enää seurantatarvetta ellei kasva uudelleen.

## 6) proto-3d/lokit — tila

Ei kandidaattikansioita (>48h) tällä kierroksella. Ei toimenpiteitä Postivahdilta.
