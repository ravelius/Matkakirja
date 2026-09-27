# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-27 09:00 EEST

## 1) Sessiot

5 h **50 %** (seur. nollaus ~09:59:59 EEST), viikko (all models) 80 %, viikko (Fable) 44 %. Postivahti (self) nollattu Fablen toimesta klo 09.0x, id ennallaan (local_a24c43c0…), nyt 10 %. Sisältökirjuri yhä 75 % (jo ilmoitettu, ei uusi ylitys).

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_5df52e10-10e4-4b72-9554-0049db300dfe | 53% | idle | — |
| Postivahti (self) | local_a24c43c0-8094-4141-b734-90b9555f5044 | 10% | running | — (nollattu) |
| Julkaisija | local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 | 54% | idle | — |
| Natiiviseppä | local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja) | 63% | idle | — |
| Natiivi-UI | local_44392b3c-86ee-4873-9d76-82f9aaa6b832 | 10% | idle | — |
| Linssiseppä (Opus, max) | local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 | 43% | running | — |
| Sisältökirjuri | local_be1a3375-18cf-4068-94f3-887d55f0e196 | 75% | idle | yli 70 % (raportoitu) |
| Laitetestaaja | local_af48ba1e-41c2-4921-9068-28cf5cc71b0d | 53% | idle | — |
| Siirtoseppä | local_86d0c984-aeeb-430d-bc85-3112f27b9437 | 65% | idle | — |
| Pelikoodari | local_7fcab04b-864c-4ec2-98bd-46e171326701 | 70% | running | erikoisraja 90 % (avauskortti+xAI), ei ilmoitusta |
| Karttaseppä | local_eec7f158-d9f3-4b93-9368-c50935bd19ab | 45% | idle | — |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia jumeja eikä kortteja.

**Voimassa olevat sitovat säännöt (kooste, vanhat kierrospäivitykset poistettu — täysi historia git-lokissa):**
- Muistipaine korvasi swap-Gt-rajan: seuraa `kern.memorystatus_vm_pressure_level` (1=normal, 2=warn, 4=critical→ilmoitus).
- **Levyraja 80 Gt.** Nykytila 136 Gi vapaana, kaukana rajasta.
- Worktree-sallinnot mainissa (PR #3329): git worktree remove/prune, --poista, simctl erase/delete — roolit poistavat itse omat mergetyt worktreensä.
- SendMessage-rajan täyttyessä (~10/vuoro) käytä varakanavaa `mcp__ccd_session_mgmt__send_message`.
- Lokisiivous: Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app), Fable poistaa omistajan luvalla — kerran vrk tai kun >5 Gt. **Ei kandidaatteja tällä kierroksella** (edellinen 10 kansion lista on siivottu pois).
- Effort-tarkistus: 7 Opus-roolia `high`; Linssiseppä `max` nimetty oikein. Tarkistettu 09:0x — kaikki sääntömukaiset.
- Konteksti ≥70% (rooleilla, ei Fable/self) → ilmoita Fablelle. Pelikoodarille erikoisraja 90 % (avauskortti-PR + xAI-kytkennän vuoksi) — 70 % ei siis ilmoiteta.
- Postivahti EI koskaan poista tiedostoja itse — pysyvä poisto ehdottomasti kiellettyä.
- Chrome-GPU-prosessien (playwright/headless-testiajurit, type=gpu-process) ilmoitus menee Julkaisijalle, ei Fablelle. Tällä kierroksella 4 (raja >4, ei ylitystä).
- Työtilapolut, joissa "Codex" tai "ChatGPT", eivät ole poikkeama.

## 3) Avoimet PR:t

Ei tarkistettu tällä kierroksella (vanha luku ~40, karkea jako: Sisältö ~21, Toiminto ~10, Luonnos/raportti ~9). Julkaisija (#3306), Siirtoseppä (#3307), Karttaseppä (#3305), Natiivi-UI (#3324), Pelikoodari (#3304) mergetty.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22. (Ei vahvistettu tuoreempaa buildia tällä kierroksella — ks. Fablen luovutus: TF 1.0.27 ulkona, 1.0.28 Laitetestaajalla.)
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`. Juna yhä tauolla (Karttasepän Z10-poltto), viimeisin lokirivi 08:00 (tauko).

## 5) Resurssit

- **5 h -kiintiö:** 50 % (seur. nollaus ~09:59:59 EEST). **Viikko (kaikki mallit):** 80 %. **Viikko (Fable):** 44 %.
- **Levy:** 136 Gi vapaana (raja 80 Gt — kaukana, vakaa). **Muistipaine:** normal (1). **NAS:** 5,6 Ti vapaana (raja 500 Gt vapaana — OK). **wt/-worktreet:** 49 kpl.
- **Simulaattorit boottina:** 1 (iPhone 18 Pro; max 4 päivällä — OK). **coreaudiod:** normaali (alle 200 %). **Headless-testiajureita (chromium_headless_shell, type=gpu-process):** 4 (raja >4, ei ylitystä; Julkaisijan vahvistama tarkoituksellinen CI-savukekuorma).
- **Konteksti:** Sisältökirjuri 75 % (yli, jo raportoitu), Pelikoodari 70 % (erikoisraja 90 %, ei ilmoitusta), Siirtoseppä 65 %, Natiiviseppä 63 %, Julkaisija 54 %, Fable 53 %, Laitetestaaja 53 %, Karttaseppä 45 %, Linssiseppä 43 %, Postivahti (self) 10 % (nollattu), Natiivi-UI 10 %.
- **Juna:** yhä tauolla (Karttasepän Z10-poltto 26.–27.9.) — ei hälytystä, tarkoituksellinen.
- **Postilaatikko:** ei uutta. **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku ~40).
- **Lokisiivous-kandidaatit (>48h lokit-alikansiot, >24h .app):** ei kandidaatteja tällä kierroksella (edellinen lista siivottu).

## 6) proto-3d/lokit — tila

Ei kandidaattikansioita (>48h) tällä kierroksella — edellisen kierroksen 10 kansion lista (koreografia-iphone-20260924 ym.) on poistunut/siivottu jonkun toisen toimesta. Ei toimenpiteitä Postivahdilta.
