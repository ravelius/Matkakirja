# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-27 09:48 EEST

## 1) Sessiot

5 h **69 %** (seur. nollaus ~09:59:59 EEST, 11 min jäljellä), viikko (all models) **85 %** (alle 93 %:n ennakkovaroituksen), viikko (Fable) 45 %. Sisältökirjuri yhä 75 % (jo ilmoitettu). **Varmuuskopio-VIKA ratkaistu 09:04 Natiivisepän toimesta — ilmoitettu Fablelle 09:48.**

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_5df52e10-10e4-4b72-9554-0049db300dfe | 58% | running | varmuuskopio-ratkaisu mainittu 09:48 |
| Postivahti (self) | local_a24c43c0-8094-4141-b734-90b9555f5044 | 20% | running | — |
| Julkaisija | local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 | 57% | idle | — |
| Natiiviseppä | local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja) | 67% | idle | — |
| Natiivi-UI | local_44392b3c-86ee-4873-9d76-82f9aaa6b832 | 29% | idle | — |
| Linssiseppä (Opus, max) | local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 | 57% | idle | — |
| Sisältökirjuri | local_be1a3375-18cf-4068-94f3-887d55f0e196 | 75% | idle | yli 70 % (raportoitu) |
| Laitetestaaja | local_af48ba1e-41c2-4921-9068-28cf5cc71b0d | 57% | idle | — |
| Siirtoseppä | local_86d0c984-aeeb-430d-bc85-3112f27b9437 | 65% | idle | — |
| Pelikoodari | local_7fcab04b-864c-4ec2-98bd-46e171326701 | 21% | running | — |
| Karttaseppä | local_eec7f158-d9f3-4b93-9368-c50935bd19ab | 45% | idle | — |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia jumeja eikä kortteja omistajalle. **Varmuuskopio-VIKA.txt RATKAISTU 09:04** (Natiiviseppä): 09:03-rivi johtui kahdesta samanaikaisesta pushista (remote rejected: cannot lock ref). Historia ehjä, BUILD 28 7788b629 tavallinen merge BUILD 27:n päälle, uusintaajo ok, proto/master = peili/proto/master. Ilmoitettu Fablelle.

**Voimassa olevat sitovat säännöt (kooste, vanhat kierrospäivitykset poistettu — täysi historia git-lokissa):**
- Muistipaine korvasi swap-Gt-rajan: seuraa `kern.memorystatus_vm_pressure_level` (1=normal, 2=warn, 4=critical→ilmoitus).
- **Levyraja 80 Gt.** Nykytila 133 Gi vapaana, kaukana rajasta.
- Worktree-sallinnot mainissa (PR #3329): git worktree remove/prune, --poista, simctl erase/delete — roolit poistavat itse omat mergetyt worktreensä.
- SendMessage-rajan täyttyessä (~10/vuoro) käytä varakanavaa `mcp__ccd_session_mgmt__send_message`.
- Lokisiivous: Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app), Fable poistaa omistajan luvalla — kerran vrk tai kun >5 Gt. Ei kandidaatteja tällä kierroksella.
- Effort-tarkistus: 7 Opus-roolia `high`; Linssiseppä `max` nimetty oikein (viim. tarkistettu 09:0x).
- Konteksti ≥70% (rooleilla, ei Fable/self) → ilmoita Fablelle. Normaali 70 % sääntö voimassa kaikilla.
- Postivahti EI koskaan poista tiedostoja itse — pysyvä poisto ehdottomasti kiellettyä.
- Chrome-GPU-prosessien (playwright/headless-testiajurit, type=gpu-process) ilmoitus menee Julkaisijalle, ei Fablelle. Tällä kierroksella 3, ei ylitystä.
- Työtilapolut, joissa "Codex" tai "ChatGPT", eivät ole poikkeama.
- **Viikkokiintiö (kaikki mallit, omistaja 09:4x sitova):** seurataan joka kierroksella. ≥93 % → ilmoita Fablelle heti. ≥97 % → "VIIKKO 97 — tilinvaihto" (Fable pysäyttää sessiot). Nyt **85 %**.

## 3) Avoimet PR:t

Ei tarkistettu tällä kierroksella (vanha luku ~40, karkea jako: Sisältö ~21, Toiminto ~10, Luonnos/raportti ~9). Julkaisija (#3306), Siirtoseppä (#3307), Karttaseppä (#3305), Natiivi-UI (#3324), Pelikoodari (#3304) mergetty.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22. Natiiviseppä vahvisti 09:04: proto/master nyt BUILD 28 (7788b629). (Ei vahvistettu tuoreempaa buildia TF:ssä tällä kierroksella — ks. Fablen luovutus: TF 1.0.27 ulkona, 1.0.28 Laitetestaajalla.)
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`. Juna yhä tauolla (Karttasepän Z10-poltto), viimeisin lokirivi 08:00 (tauko).

## 5) Resurssit

- **5 h -kiintiö:** 69 % (seur. nollaus ~09:59:59 EEST). **Viikko (kaikki mallit):** 85 %. **Viikko (Fable):** 45 %.
- **Levy:** 133 Gi vapaana (raja 80 Gt — kaukana, vakaa). **Muistipaine:** normal (1). **NAS:** 5,6 Ti vapaana (raja 500 Gt vapaana — OK). **wt/-worktreet:** 51 kpl.
- **Simulaattorit boottina:** 2 (iPhone 17, iPad Pro 11-inch M5; max 4 päivällä — OK). **coreaudiod:** normaali (alle 200 %). **Headless-testiajureita (chromium_headless_shell, type=gpu-process):** 3 (raja >4, ei ylitystä).
- **Konteksti:** Sisältökirjuri 75 % (yli, jo raportoitu), Natiiviseppä 67 %, Siirtoseppä 65 %, Fable 58 %, Julkaisija 57 %, Linssiseppä 57 %, Laitetestaaja 57 %, Karttaseppä 45 %, Natiivi-UI 29 %, Pelikoodari 21 % (nollautunut), Postivahti (self) 20 %.
- **Juna:** yhä tauolla (Karttasepän Z10-poltto 26.–27.9.) — ei hälytystä, tarkoituksellinen.
- **Postilaatikko:** ei uutta. **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku ~40).
- **Lokisiivous-kandidaatit (>48h lokit-alikansiot, >24h .app):** ei kandidaatteja.
- **Varmuuskopio:** RATKAISTU 09:04 (Natiiviseppä) — kahden samanaikaisen pushin aiheuttama, ei todellinen vika. Ei enää seurantaa.

## 6) proto-3d/lokit — tila

Ei kandidaattikansioita (>48h) tällä kierroksella. Ei toimenpiteitä Postivahdilta.
