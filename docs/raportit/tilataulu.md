# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-27 12:00 EEST

## 1) Sessiot — TILINVAIHTO KÄYNNISSÄ (uusi tili)

Postivahti kuittasi tilinvaihdon Fablelle (local_cf5b4eca) 11:4x. Uudella tilillä 5 h **3 %**, viikko (all models) **39 %** (kaukana 93 %/95 %/97 % kynnyksistä — laskettu uudelleen tilinvaihdossa), viikko (Fable) 75 %. Roolien uusia session id:itä ei ole vielä saatu Fablelta — vain osa sessioista näkyy toistaiseksi uudella tilillä (Fable itse rekonstruoi niitä). Ei ilmoiteta Fablelle tästä erikseen, kesken oleva prosessi.

| Rooli | Session id | Konteksti | Tila | Huom |
|---|---|---|---|---|
| Fable | local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc | 22% | running | uusi tili |
| Postivahti (self) | (tämä sessio, uusi tili) | 13% | running | — |
| Julkaisija (tilinvaihto) | local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629 | 10% | running | — |
| Sisältökirjuri | local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3 | 15% | running | PR #3397 auki |
| Laitetestaaja (savukierros B13) | local_3509b4ba-6000-4dea-869b-ecb22f4e3270 | 16% | running | — |
| ? (title "3d-selvittäjä checkout", cwd Matkakirja-julkaisija) | local_04e2850b-d63c-481d-be73-c7d784a7cbcb | 13% | running | epäselvä rooli, ei nimetty |
| Natiiviseppä, Natiivi-UI, Linssiseppä, Siirtoseppä, Pelikoodari, Karttaseppä | — | — | ei vielä luotu uudella tilillä | odotetaan Fablelta |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia jumeja eikä kortteja omistajalle. Varmuuskopio-VIKA.txt pysyy ratkaistuna (2 riviä, ei kasvua). Tilinvaihto kesken — ei uutta hälytettävää.

**Voimassa olevat sitovat säännöt (kooste, vanhat kierrospäivitykset poistettu — täysi historia git-lokissa):**
- Muistipaine korvasi swap-Gt-rajan: seuraa `kern.memorystatus_vm_pressure_level` (1=normal, 2=warn, 4=critical→ilmoitus).
- **Levyraja 80 Gt.** Nykytila 125 Gi vapaana, kaukana rajasta.
- Worktree-sallinnot mainissa (PR #3329): git worktree remove/prune, --poista, simctl erase/delete — roolit poistavat itse omat mergetyt worktreensä.
- SendMessage-rajan täyttyessä (~10/vuoro) käytä varakanavaa `mcp__ccd_session_mgmt__send_message`.
- Lokisiivous: Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app), Fable poistaa omistajan luvalla — kerran vrk tai kun >5 Gt. Ei kandidaatteja tällä kierroksella.
- Effort-tarkistus: ei tarkistettu tällä kierroksella (odotetaan roolien uusia session id:itä).
- Konteksti ≥70% (rooleilla, ei Fable/self) → ilmoita Fablelle. Normaali 70 % sääntö voimassa kaikilla.
- Postivahti EI koskaan poista tiedostoja itse — pysyvä poisto ehdottomasti kiellettyä.
- Chrome-GPU-prosessien (playwright/headless-testiajurit, type=gpu-process, chromium_headless_shell) ilmoitus menee Julkaisijalle, ei Fablelle. Tällä kierroksella 3, ei ylitystä (raja >4).
- Työtilapolut, joissa "Codex" tai "ChatGPT", eivät ole poikkeama.
- **Viikkokiintiö (kaikki mallit, omistaja 09:4x sitova):** seurataan joka kierroksella. Kynnykset 93 %/95 %/97 % (viimeksi 97 % → "VIIKKO 97 — tilinvaihto"). **Uudella tilillä (tilinvaihto tehty) nyt 39 %** — kaukana kynnyksistä, laskuri alkoi uudelleen tilinvaihdossa.

## 3) Avoimet PR:t

Ei tarkistettu tällä kierroksella (vanha luku ~40, karkea jako: Sisältö ~21, Toiminto ~10, Luonnos/raportti ~9). Julkaisija (#3306), Siirtoseppä (#3307), Karttaseppä (#3305), Natiivi-UI (#3324), Pelikoodari (#3304) mergetty.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22. Natiiviseppä vahvisti 09:04: proto/master nyt BUILD 28 (7788b629). (Ei vahvistettu tuoreempaa buildia TF:ssä tällä kierroksella — ks. Fablen luovutus: TF 1.0.27 ulkona, 1.0.28 Laitetestaajalla.)
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`. Juna yhä tauolla (Karttasepän Z10-poltto), viimeisin lokirivi 10:00 (tauko).

## 5) Resurssit (uusi tili tilinvaihdon jälkeen, 12:00)

- **5 h -kiintiö:** 3 % (nollautui juuri tilinvaihdossa). **Viikko (kaikki mallit):** 39 % (kaukana 93 % kynnyksestä — uusi laskuri). **Viikko (Fable):** 75 %.
- **Levy:** 125 Gi vapaana (raja 80 Gt — kaukana, vakaa, laskenut hieman). **Muistipaine:** normal (1). **NAS:** 5,6 Ti vapaana (raja 500 Gt vapaana — OK). **wt/-worktreet:** 67 kpl.
- **Simulaattorit boottina:** 1 (iPhone 17; max 4 päivällä — OK). **coreaudiod:** ~9 % CPU yhteensä, kaukana 200 % rajasta. **Headless-testiajureita (chromium_headless_shell, type=gpu-process):** 3 (raja >4, ei ylitystä).
- **Konteksti (uudella tilillä):** Fable 22%, Laitetestaaja 16%, Sisältökirjuri 15%, Julkaisija 13%, "3d-selvittäjä"-sessio 13%, Postivahti (self) 13%. Muut roolit ei vielä session id:tä uudella tilillä.
- **Juna:** yhä tauolla (Karttasepän Z10-poltto 26.–27.9.) — ei hälytystä, tarkoituksellinen.
- **Postilaatikko:** ei uutta. **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku ~40).
- **Lokisiivous-kandidaatit (>48h lokit-alikansiot, >24h .app):** ei kandidaatteja.
- **Varmuuskopio:** ratkaistu, ei kasvanut.

## 6) proto-3d/lokit — tila

Ei kandidaattikansioita (>48h) tällä kierroksella. Ei toimenpiteitä Postivahdilta.
