# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-27 12:59 EEST

## 1) Sessiot — uusi tili, kaikki 11 session id:tä tiedossa

Viikko (all models) **44 %** (nollautuu ma 28.9. klo 09:59), viikko (Fable) **76 %**. Kaukana kynnyksistä 93 %/95 %/97 %. Konteksti-kynnykset: Fable ≥65 %, roolit ≥70 %. Ei ylityksiä tällä kierroksella.

| Rooli | Session id | Konteksti | Tila |
|---|---|---|---|
| Fable | local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc | 40% | running |
| Postivahti (self) | local_63227b57-d045-4b93-ab52-cddc04e3b90f | 24% | running |
| Julkaisija | local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629 | 21% | running |
| Natiiviseppä | local_04e2850b-d63c-481d-be73-c7d784a7cbcb | 33% | running (siivosi 16 worktreetä ~2G) |
| Pelikoodari | local_242febe9-d6cf-45ae-8280-faf394dc6e3e | 44% | idle |
| Natiivi-UI | local_e9fdc695-8421-4c14-a187-8881e73c835a | 37% | idle (siivosi 2 worktreetä, 1 jäi jumiin – ks. alla) |
| Linssiseppä (max) | local_4b4b976c-42b6-4050-9232-dcd14ad3b2a4 | 43% | idle |
| Siirtoseppä | local_c264506b-dd61-4617-839f-23daf6d0bd5a | 12% | idle |
| Karttaseppä | local_4bd7c316-55bc-423a-9da1-821fdd123cab | 24% | idle |
| Sisältökirjuri | local_0c172ea0-6bb2-4afe-9c87-7938b882b4f3 | 46% | running (PR #3397 auki, siivosi 1 worktreen) |
| Laitetestaaja | local_3509b4ba-6000-4dea-869b-ecb22f4e3270 | 45% | running (savukierros B13) |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia jumeja eikä kortteja omistajalle. Varmuuskopio-VIKA.txt pysyy ratkaistuna (2 riviä, ei kasvua).

**LEVYVAHTI-SELVITYS — VERTAILU VALMIS (12:42→12:59, 17 min):** lokit 45G→**46G (kasvaa ~3,5 Gt/h — todellinen kasvaja, aktiivinen poltto)**, wt 36G→36G (74→56 worktreetä, roolien siivous ~5 Gt vapautti mutta muu kirjoitus täytti tilalle, netto tasan), CoreSimulator 65G→65G (vakaa, ei kasvaja). Levy kokonaisuutena 113→112 Gi (vakautunut siivousten ansiosta huolimatta lokit-kasvusta). Ilmoitettu Fablelle 12:59 (varakanavalla, SendMessage-raja täynnä).
**Roolien siivoukset:** Natiiviseppä 16 worktreetä (~2G, kaikki masterissa/hylätty; proto-natiiviseppa-juna säilyy, aktiivinen). Natiivi-UI 2 worktreetä (~140M); kolmas (proto-natiivi-ui-pulu-karttavaisto-codex, samireivinen-omisteinen) EI poistettavissa Natiivi-UI:lta (Permission denied) → **UUSI SÄÄNTÖ (Fable 12:5x): samireivinen-omisteiset kohteet ilmoitetaan Fablelle, ei rooleille** — poistopyyntö lähetetty Codexille postilaatikon kautta (98f4e19a1), Natiivi-UI ei yritä uudelleen. Sisältökirjuri poisti 1 worktreen (~1.0G, sisältö varmistettu toimitetuksi commitissa 3576ee735).
**Uusi postilaatikkoviesti:** posti/sisaltokirjuri-kuvaputki-7-maalattua-taustaa-20260927.md (Sisältökirjuri → Kuvaputki, 7 tilattua taustaa toimittamatta) — ei Kuvaputki-roolia 11:n joukossa, ilmoitettu Fablelle selvitettäväksi.

**Voimassa olevat sitovat säännöt (kooste, vanhat kierrospäivitykset poistettu — täysi historia git-lokissa):**
- Muistipaine korvasi swap-Gt-rajan: seuraa `kern.memorystatus_vm_pressure_level` (1=normal, 2=warn, 4=critical→ilmoitus).
- **Levyraja 80 Gt.** Nykytila 112 Gi vapaana, puskuri ~32 Gi. Vakautunut roolien worktree-siivousten ansiosta (lokit kasvaa ~3,5 Gt/h, wt/CoreSimulator vakaat). Ei toimenpidettä.
- **UUSI (Fable 12:5x): samireivinen-omisteiset (Codex-tili) tiedostot/worktreet EI poisteta, ei pyydetä rooleilta poistamaan — ilmoitus Fablelle, poistopyyntö menee Codexille postilaatikon kautta.**
- Worktree-sallinnot mainissa (PR #3329): git worktree remove/prune, --poista, simctl erase/delete — roolit poistavat itse omat mergetyt worktreensä.
- SendMessage-rajan täyttyessä (~10/vuoro) käytä varakanavaa `mcp__ccd_session_mgmt__send_message`.
- Lokisiivous: Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app), Fable poistaa omistajan luvalla — kerran vrk tai kun >5 Gt. Ei kandidaatteja tällä kierroksella.
- Effort-tarkistus: ei tarkistettu tällä kierroksella (odotetaan roolien uusia session id:itä).
- Postivahti EI koskaan poista tiedostoja itse — pysyvä poisto ehdottomasti kiellettyä.
- Chrome-GPU-prosessien (playwright/headless-testiajurit, type=gpu-process, chromium_headless_shell) ilmoitus menee Julkaisijalle, ei Fablelle. Tällä kierroksella 3, ei ylitystä (raja >4).
- Työtilapolut, joissa "Codex" tai "ChatGPT", eivät ole poikkeama.
- **Viikkokiintiö (kaikki mallit, omistaja 09:4x sitova):** seurataan joka kierroksella. Kynnykset 93 %/95 %/97 % (viimeksi 97 % → "VIIKKO 97 — tilinvaihto"). **Nyt 44 %** (nollautuu ma 28.9. klo 09:59) — kaukana kynnyksistä.
- **Konteksti-kynnykset (Fable 12.0x):** Fable ≥65 %, roolit ≥70 % → ilmoita Fablelle. (Postivahti/self ei koske.)

## 3) Avoimet PR:t

Ei tarkistettu tällä kierroksella (vanha luku ~40, karkea jako: Sisältö ~21, Toiminto ~10, Luonnos/raportti ~9). Julkaisija (#3306), Siirtoseppä (#3307), Karttaseppä (#3305), Natiivi-UI (#3324), Pelikoodari (#3304) mergetty.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22. Natiiviseppä vahvisti 09:04: proto/master nyt BUILD 28 (7788b629). (Ei vahvistettu tuoreempaa buildia TF:ssä tällä kierroksella — ks. Fablen luovutus: TF 1.0.27 ulkona, 1.0.28 Laitetestaajalla.)
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`. Juna yhä tauolla (Karttasepän Z10-poltto), viimeisin lokirivi 10:00 (tauko).

## 5) Resurssit (12:59)

- **5 h -kiintiö:** 8 %. **Viikko (kaikki mallit):** 44 % (kynnykset 93/95/97 %, kaukana). **Viikko (Fable):** 76 % (nollautuu ma 28.9. klo 09:59).
- **Levy:** 112 Gi vapaana (raja 80 Gt — puskuri ~32 Gi, vakautunut). **Muistipaine:** normal (1). **NAS:** 5,6 Ti vapaana (raja 500 Gt — OK). **wt/-worktreet:** 56 kpl (74→56, roolien siivous).
- **Simulaattorit boottina:** 2 (linssiseppa-iPhone, iPhone 17; max 4 päivällä — OK). **coreaudiod:** ~8 % CPU yhteensä, kaukana 200 % rajasta. **Headless-testiajureita (chromium_headless_shell, type=gpu-process):** 0 (raja >4, ei ylitystä).
- **Konteksti (kynnys Fable 65%/roolit 70%):** Fable 40%, muut 12–46% — ei ylityksiä.
- **Juna:** yhä tauolla (Karttasepän Z10-poltto 26.–27.9.) — ei hälytystä, tarkoituksellinen.
- **Postilaatikko:** 1 uusi viesti (Kuvaputki-osoite, ei omaa roolia — ilmoitettu Fablelle). **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku ~40).
- **Lokisiivous-kandidaatit (>48h lokit-alikansiot, >24h .app):** ei kandidaatteja lokit:issä; wt-kandidaatit käsitelty (ks. yllä).
- **Varmuuskopio:** ratkaistu, ei kasvanut.

## 6) proto-3d/lokit — tila

Ei kandidaattikansioita (>48h) tällä kierroksella. Ei toimenpiteitä Postivahdilta.
