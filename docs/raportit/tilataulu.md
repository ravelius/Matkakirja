# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-26 21:01 EEST

## 1) Sessiot

5 h **26 %** (nollautui 19:00, seur. 20:59), viikko (all models) 40 %, viikko (Fable) 27 %. Effort-tarkistus: kaikki 7 Opus-roolia `high`, ei nimilisäyksiä — sääntömukaista. Ei uusia 70 %-ylityksiä.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_5df52e10-10e4-4b72-9554-0049db300dfe | 29% | running | PR #3308 |
| Postivahti (self) | local_a24c43c0-8094-4141-b734-90b9555f5044 | 47% | running | tämä taulu |
| Julkaisija | local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 | 38% | idle | — |
| Natiiviseppä | local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja) | 53% | idle | — |
| Natiivi-UI | local_44392b3c-86ee-4873-9d76-82f9aaa6b832 | 65% | running | Pulu-korjaus PR-haaraan |
| Linssiseppä | local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 | 44% | idle | — |
| Sisältökirjuri | local_be1a3375-18cf-4068-94f3-887d55f0e196 | 43% | idle | — |
| Laitetestaaja | local_af48ba1e-41c2-4921-9068-28cf5cc71b0d | 32% | idle | — |
| Siirtoseppä | local_86d0c984-aeeb-430d-bc85-3112f27b9437 | 51% | running | PR #3307 mergetty |
| Pelikoodari | local_7fcab04b-864c-4ec2-98bd-46e171326701 | 28% | idle | PR #3304 mergetty |
| Karttaseppä | local_eec7f158-d9f3-4b93-9368-c50935bd19ab | 19% | idle | PR #3305 mergetty |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia jumeja.

**Voimassa olevat sitovat säännöt (kooste, vanhat kierrospäivitykset poistettu — täysi historia git-lokissa):**
- Omistaja poissa koneelta 26.–27.9. — ei mittausikkunaa, kortit voivat olla auki pitkään, muistutus 2 h välein (ei 10 min).
- Muistipaine korvasi swap-Gt-rajan (Fable 16:33): seuraa `kern.memorystatus_vm_pressure_level` (1=normal, 2=warn, 4=critical→ilmoitus). Karttasepän oma vahti hoitaa polton pysäytyksen — ei enää "KESKEYTÄ POLTTO" -viestejä Postivahdilta.
- Levyraja 80 Gt (Karttasepän omat kriittiset 78/75 Gt). Ei purge-toistoa CoreSimulator-syyn takia — purge ei auta oikeaan levytilaan.
- Worktree-sallinnot mainissa (PR #3329): git worktree remove/prune, --poista, simctl erase/delete — roolit poistavat itse omat mergetyt worktreensä.
- SendMessage-rajan täyttyessä (~10/vuoro) käytä varakanavaa `mcp__ccd_session_mgmt__send_message`, ei odota omistajaa, ei PR-kommenttia.
- Lokisiivous: Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app), Fable poistaa omistajan luvalla — kerran vrk tai kun >5 Gt.
- Effort-tarkistus: 7 Opus-roolia `high`; jos effort>high eikä nimessä sulkulisäystä, tai nimessä lisäys vaikka high → ilmoita Fablelle (Fable nimeää).
- Konteksti ≥70% (rooleilla, ei Fable/self) → ilmoita Fablelle. Moni rooli nollaa itsensä automaattisesti tämän jälkeen (havaittu useita kertoja tänään).
- Postivahti EI koskaan poista tiedostoja itse — pysyvä poisto ehdottomasti kiellettyä.
- Chrome-GPU-prosessien (>4, tarkoittaa playwright/headless-testiajureita, type=gpu-process) ilmoitus menee Julkaisijalle, ei Fablelle — normaalit sovellusten GPU-apuprosessit eivät laske mukaan.
- Työtilapolut, joissa "Codex" tai "ChatGPT", eivät ole poikkeama — tarkista-tyotilat.sh korjattu ja synkattu (#3335+#3337), vahvistettu tyhjällä ajolla.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22, omistajalle ilmoitettu pushilla. Aiempi: build 15 (1.0.15, 202609251449, proto 4a813e60).
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **5 h -kiintiö:** 26 % (nollautui 19:00, seur. nollaus 20:59 EEST). extraUsage pois päältä. **Viikko (kaikki mallit): 40 %.** **Viikko (Fable):** 27 %.
- **Levy:** 143 Gt vapaana (raja 80/75/70 Gt — kaukana, hidas tasainen lasku). **Muistipaine: normal (1).** **NAS:** 5,6 Ti vapaana. **wt/-worktreet:** 25 kpl.
- **Simulaattorit boottina:** 3 (iPhone 18 Pro, natiiviseppa-iPhone, iPhone 17 — max 4 päivällä). coreaudiod alle 200 %. **Headless-testiajureita (chromium_headless_shell, type=gpu-process):** 0.
- **Konteksti:** Natiivi-UI 65 %, Siirtoseppä 51 %, Natiiviseppä 53 %, Postivahti (self) 47 %, Linssiseppä 44 %, Sisältökirjuri 43 %, Julkaisija 38 %, Fable 29 %, Pelikoodari 28 %, Laitetestaaja 32 %, Karttaseppä 19 %.
- **Juna:** yhä tauolla (Karttasepän poltto 26.–27.9.) — ei hälytystä, tarkoituksellinen.
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
