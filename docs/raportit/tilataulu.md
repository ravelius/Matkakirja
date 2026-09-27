# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-27 13:13 EEST

## 1) Sessiot — uusi tili, kaikki 11 session id:tä tiedossa

Viikko (all models) **44 %** (nollautuu ma 28.9. klo 09:59), viikko (Fable) **76 %**. Kaukana kynnyksistä 93 %/95 %/97 %. Konteksti-kynnykset: Fable ≥65 %, roolit ≥70 %. Ei ylityksiä, mutta Sisältökirjuri (55 %) ja Linssiseppä (53 %) nousevat nopeasti — seurataan.

| Rooli | Session id | Konteksti | Tila |
|---|---|---|---|
| Fable | local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc | 41% | running |
| Postivahti (self) | local_63227b57-d045-4b93-ab52-cddc04e3b90f | 28% | running |
| Julkaisija | local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629 | 22% | running |
| Natiiviseppä | local_04e2850b-d63c-481d-be73-c7d784a7cbcb | 33% | running |
| Pelikoodari | local_242febe9-d6cf-45ae-8280-faf394dc6e3e | 45% | idle |
| Natiivi-UI | local_e9fdc695-8421-4c14-a187-8881e73c835a | 39% | idle |
| Linssiseppä (max) | local_4b4b976c-42b6-4050-9232-dcd14ad3b2a4 | 53% | idle |
| Siirtoseppä | local_c264506b-dd61-4617-839f-23daf6d0bd5a | 12% | idle |
| Karttaseppä | local_4bd7c316-55bc-423a-9da1-821fdd123cab | 24% | idle |
| Sisältökirjuri | local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3 | 55% | running (PR #3397 auki) |
| Laitetestaaja | local_3509b4ba-6000-4dea-869b-ecb22f4e3270 | 45% | running (savukierros B13) |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia jumeja eikä kortteja omistajalle. Varmuuskopio-VIKA.txt pysyy ratkaistuna (2 riviä, ei kasvua).

**LEVYVAHTI — RATKAISTU (12:4x–13:0x):** lokit-kasvun aiheuttajat tunnistettu: Natiivi-UI (avauskortti+talous) ja Linssiseppä (meri-sarja), ei Karttaseppä (pallo-Z10 vasta klo 22:00). CoreSimulator-UDID:t tunnistettu: 993F8873/C1D5E34C = Natiiviseppän pariteettiajot (juna-ajo.sh, jäävät), F989814A = Siirtoseppä, 503000D1 = jaettu, A2FD9C9F = Pelikoodarin puhevirran mittauslaite. **Ei simulaattoripoistoja — levy vakaa.** Roolien worktree-siivoukset (yhteensä ~5 Gt, ks. edellinen kierros) + Julkaisijan lisäsiivous (pr3307/pr3372/pr3392, ~0,84 Gt) pitivät levyn vakaana lokit-kasvusta huolimatta.
**Pysyvä sääntö (Fable 12:5x):** samireivinen-omisteiset (Codex-tili) kohteet ilmoitetaan Fablelle, ei rooleille — poisto vain Codexin oman toimenpiteen kautta (postilaatikko).
**Kuvaputki-viesti:** Fable selvitti — Kuvaputki on Codexin kuvatilausten vastaanottaja, ei Claude-rooli; postilaatikko on oikea kanava, seurataan Codexin vastausta.

**Voimassa olevat sitovat säännöt (kooste, vanhat kierrospäivitykset poistettu — täysi historia git-lokissa):**
- Muistipaine korvasi swap-Gt-rajan: seuraa `kern.memorystatus_vm_pressure_level` (1=normal, 2=warn, 4=critical→ilmoitus).
- **Levyraja 80 Gt.** Nykytila 112 Gi vapaana, puskuri ~32 Gi, vakaa. Levyvahti-tehtävä valmis (kasvaja tunnistettu, simulaattorit selvitetty, ei poistoja tarvita nyt).
- **UUSI (Fable 12:5x): samireivinen-omisteiset (Codex-tili) tiedostot/worktreet EI poisteta, ei pyydetä rooleilta poistamaan — ilmoitus Fablelle, poistopyyntö menee Codexille postilaatikon kautta.**
- Worktree-sallinnot mainissa (PR #3329): git worktree remove/prune, --poista, simctl erase/delete — roolit poistavat itse omat mergetyt worktreensä.
- SendMessage-rajan täyttyessä (~10/vuoro) käytä varakanavaa `mcp__ccd_session_mgmt__send_message`.
- Lokisiivous: Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app), Fable poistaa omistajan luvalla — kerran vrk tai kun >5 Gt. Ei kandidaatteja tällä kierroksella.
- Effort-tarkistus: ei tarkistettu tällä kierroksella (odotetaan roolien uusia session id:itä).
- Postivahti EI koskaan poista tiedostoja itse — pysyvä poisto ehdottomasti kiellettyä.
- Chrome-GPU-prosessien (playwright/headless-testiajurit, type=gpu-process, chromium_headless_shell) ilmoitus menee Julkaisijalle, ei Fablelle. Tällä kierroksella 3, ei ylitystä (raja >4).
- Työtilapolut, joissa "Codex" tai "ChatGPT", eivät ole poikkeama.
- **Viikkokiintiö (kaikki mallit, omistaja 09:4x sitova):** seurataan joka kierroksella. Kynnykset 93 %/95 %/97 % (viimeksi 97 % → "VIIKKO 97 — tilinvaihto"). **Nyt 44 %** (nollautuu ma 28.9. klo 09:59) — kaukana kynnyksistä.
- Simulaattori-UDID-omistukset (27.9. selvitetty): 993F8873/C1D5E34C = Natiiviseppä, F989814A = Siirtoseppä, A2FD9C9F = Pelikoodari, 503000D1 = jaettu.
- **Konteksti-kynnykset (Fable 12.0x):** Fable ≥65 %, roolit ≥70 % → ilmoita Fablelle. (Postivahti/self ei koske.)

## 3) Avoimet PR:t

Ei tarkistettu tällä kierroksella (vanha luku ~40, karkea jako: Sisältö ~21, Toiminto ~10, Luonnos/raportti ~9). Julkaisija (#3306), Siirtoseppä (#3307), Karttaseppä (#3305), Natiivi-UI (#3324), Pelikoodari (#3304) mergetty.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22. Natiiviseppä vahvisti 09:04: proto/master nyt BUILD 28 (7788b629). (Ei vahvistettu tuoreempaa buildia TF:ssä tällä kierroksella — ks. Fablen luovutus: TF 1.0.27 ulkona, 1.0.28 Laitetestaajalla.)
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`. Juna yhä tauolla (Karttasepän Z10-poltto), viimeisin lokirivi 10:00 (tauko).

## 5) Resurssit (13:13)

- **5 h -kiintiö:** 11 %. **Viikko (kaikki mallit):** 44 % (kynnykset 93/95/97 %, kaukana). **Viikko (Fable):** 76 % (nollautuu ma 28.9. klo 09:59).
- **Levy:** 112 Gi vapaana (raja 80 Gt — puskuri ~32 Gi, vakaa). **Muistipaine:** normal (1). **NAS:** 5,6 Ti vapaana (raja 500 Gt — OK). **wt/-worktreet:** 56 kpl.
- **Simulaattorit boottina:** 2 (linssiseppa-iPhone, iPhone 17; max 4 päivällä — OK). **coreaudiod:** ~12 % CPU yhteensä, kaukana 200 % rajasta. **Headless-testiajureita (chromium_headless_shell, type=gpu-process):** 3 (raja >4, ei ylitystä).
- **Konteksti (kynnys Fable 65%/roolit 70%):** Fable 41%, muut 12–55% — ei ylityksiä, mutta Sisältökirjuri/Linssiseppä nousevat nopeasti.
- **Juna:** yhä tauolla (Karttasepän Z10-poltto 26.–27.9.) — ei hälytystä, tarkoituksellinen.
- **Postilaatikko:** ei uutta tällä kierroksella. **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku ~40).
- **Lokisiivous-kandidaatit (>48h lokit-alikansiot, >24h .app):** ei kandidaatteja.
- **Varmuuskopio:** ratkaistu, ei kasvanut.

## 6) proto-3d/lokit — tila

Ei kandidaattikansioita (>48h) tällä kierroksella. Ei toimenpiteitä Postivahdilta.
