# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-27 05:18 EEST

## 1) Sessiot

5 h **0 %** (nollautui 05:00 EEST, seur. 08:00 EEST), viikko (all models) 67 %, viikko (Fable) 40 %. Ei uusia poikkeamia — 7 roolia täysin ennallaan (idle jo >1 h), yöaikaan odotettavaa.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_5df52e10-10e4-4b72-9554-0049db300dfe | 35% | idle | — |
| Postivahti (self) | local_a24c43c0-8094-4141-b734-90b9555f5044 | 48% | running | — |
| Julkaisija | local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 | 48% | idle | — |
| Natiiviseppä | local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja) | 56% | idle | — |
| Natiivi-UI | local_44392b3c-86ee-4873-9d76-82f9aaa6b832 | 49% | idle | — |
| Linssiseppä (Opus, max) | local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 | 64% | idle | — |
| Sisältökirjuri | local_be1a3375-18cf-4068-94f3-887d55f0e196 | 40% | idle | — |
| Laitetestaaja | local_af48ba1e-41c2-4921-9068-28cf5cc71b0d | 51% | idle | — |
| Siirtoseppä | local_86d0c984-aeeb-430d-bc85-3112f27b9437 | 65% | idle | — |
| Pelikoodari | local_7fcab04b-864c-4ec2-98bd-46e171326701 | 38% | idle | — |
| Karttaseppä | local_eec7f158-d9f3-4b93-9368-c50935bd19ab | 37% | idle | Z10 osa 2 käynnissä (oma vahti), valmis ~05 |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia jumeja eikä kortteja.

**Voimassa olevat sitovat säännöt (kooste, vanhat kierrospäivitykset poistettu — täysi historia git-lokissa):**
- Muistipaine korvasi swap-Gt-rajan: seuraa `kern.memorystatus_vm_pressure_level` (1=normal, 2=warn, 4=critical→ilmoitus). Karttasepän oma vahti hoitaa polton pysäytyksen (Z10 osa 2 käynnissä, valmis ~05) — ei "KESKEYTÄ POLTTO" -viestejä Postivahdilta.
- **Levyraja 80 Gt** (Fable 27.9. 01.0x -viestissä vahvistettu; korvaa välissä olleen 100 Gt -kokeilun). Nykytila 143 Gi vapaana, kaukana rajasta.
- Worktree-sallinnot mainissa (PR #3329): git worktree remove/prune, --poista, simctl erase/delete — roolit poistavat itse omat mergetyt worktreensä.
- SendMessage-rajan täyttyessä (~10/vuoro) käytä varakanavaa `mcp__ccd_session_mgmt__send_message`, ei odota omistajaa, ei PR-kommenttia.
- Lokisiivous: Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app), Fable poistaa omistajan luvalla — kerran vrk tai kun >5 Gt. Ei kandidaatteja tällä kierroksella.
- Effort-tarkistus: 7 Opus-roolia `high`; jos effort>high eikä nimessä sulkulisäystä, tai nimessä lisäys vaikka high → ilmoita Fablelle. **Tarkistettu 01:0x — kaikki sääntömukaiset** ("Linssiseppä (Opus, max)" effort=max nimetty oikein).
- Konteksti ≥70% (rooleilla, ei Fable/self) → ilmoita Fablelle. Pelikoodarille Fable asetti erikoisrajan 90 % (avauskortti-PR + xAI-kytkennän vuoksi).
- Postivahti EI koskaan poista tiedostoja itse — pysyvä poisto ehdottomasti kiellettyä.
- Chrome-GPU-prosessien (>4, playwright/headless-testiajurit, type=gpu-process) ilmoitus menee Julkaisijalle, ei Fablelle. Tällä kierroksella 0.
- Työtilapolut, joissa "Codex" tai "ChatGPT", eivät ole poikkeama.

## 3) Avoimet PR:t

Ei tarkistettu tällä kierroksella (vanha luku ~40, karkea jako: Sisältö ~21, Toiminto ~10, Luonnos/raportti ~9). Julkaisija (#3306), Siirtoseppä (#3307), Karttaseppä (#3305), Natiivi-UI (#3324) mergetty.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`. Juna yhä tauolla (Karttasepän Z10-poltto), viimeisin lokirivi 22:00.

## 5) Resurssit

- **5 h -kiintiö:** 17 % (nollautui 00:00, seur. nollaus 05:00 EEST). **Viikko (kaikki mallit):** 59 %. **Viikko (Fable):** 38 %.
- **Levy:** 142 Gi vapaana (raja 80 Gt — kaukana, vakaa). **Muistipaine:** normal (1). **NAS:** 5,6 Ti vapaana (90 % käytetty, raja 500 Gt vapaana — OK). **wt/-worktreet:** 40 kpl.
- **Simulaattorit boottina:** 0 (max 4 päivällä — OK). **coreaudiod:** normaali (0 % CPU). **Headless-testiajureita (chromium_headless_shell, type=gpu-process):** 0.
- **Konteksti:** Siirtoseppä 65 %, Linssiseppä 64 %, Natiiviseppä 56 %, Laitetestaaja 51 %, Postivahti (self) 48 %, Natiivi-UI 49 %, Julkaisija 48 %, Sisältökirjuri 40 %, Pelikoodari 38 %, Karttaseppä 37 %, Fable 35 %.
- **Juna:** yhä tauolla (Karttasepän Z10-poltto 26.–27.9.) — ei hälytystä, tarkoituksellinen.
- **Postilaatikko:** ei uutta. **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku ~40).
- **Lokisiivous-kandidaatit (>48h lokit-alikansiot, >24h .app):** ei kandidaatteja tällä kierroksella.

## 6) proto-3d/lokit — 10 suurinta alikansiota yli 24 h vanhoja (Fablen pyyntö 11:3x, ei poistoja)

1. koreografia-iphone-20260924 — 255 M
2. lento-aikajana-20260924 — 158 M
3. lento-aikajana-20260924-b — 149 M
4. lento-aikajana-20260924-tokio — 140 M
5. kuvasarjat-natiivi-ui-20260924 — 72 M
6. lento-nostot-20260924 — 47 M
7. lento-ipad-20260924 — 39 M
8. kontakti-web2 — 38 M
9. ihminen-avaus-iphone-20260924 — 28 M
10. piikit3-20260924 — 22 M

(Huom: nämä ovat lokit/-kansion suoria alikansioita; itse mds_stores/Spotlight-indeksin 38 Gt koskee koko lokit/-puuta, ei näitä yksittäisiä kansioita — poistot vain omistajan skriptillä.)
