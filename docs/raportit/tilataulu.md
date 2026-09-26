# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-26 10:41 EEST

## 1) Sessiot

Uusi tili klo 10:41: viikko (all models) **6 %**, viikko (Fable) 5 %, 5 h **22 %**. Ei ylityksiä. Effort-tarkistus: kaikki 7 Opus-roolia `high`, ei nimilisäyksiä — sääntömukaista.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_5df52e10-10e4-4b72-9554-0049db300dfe | 41% | running | PR #3308 |
| Postivahti (self) | local_a24c43c0-8094-4141-b734-90b9555f5044 | 25% | running | tämä taulu |
| Julkaisija | local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 | 15% | idle | PR #3306 mergetty |
| Natiiviseppä | local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja) | 47% | running | natiiviseppa/lipputanko-161 |
| Natiivi-UI | local_44392b3c-86ee-4873-9d76-82f9aaa6b832 | 26% | idle | — |
| Linssiseppä | local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 | 26% | idle | linssiseppa/usva-159 |
| Sisältökirjuri | local_be1a3375-18cf-4068-94f3-887d55f0e196 | 51% | idle | konteksti nousee ~4 %/10min — seurataan, ei vielä 70 % |
| Laitetestaaja | local_af48ba1e-41c2-4921-9068-28cf5cc71b0d | 22% | idle | — |
| Siirtoseppä | local_86d0c984-aeeb-430d-bc85-3112f27b9437 | 22% | idle | PR #3307 |
| Pelikoodari | local_7fcab04b-864c-4ec2-98bd-46e171326701 | 36% | running | PR #3304 mergetty |
| Karttaseppä | local_eec7f158-d9f3-4b93-9368-c50935bd19ab | 25% | running | PR #3305 mergetty |

## 2) Jumit ja avoimet kortit omistajalle

**09:23: TILINVAIHTO valmis — kaikki 10 roolisessiota luotu (ks. kohta 1), kaikki kuitanneet 09.22 (Fable).** Viikko/5h-rajat (85/98 %) koskevat nyt uutta tiliä, laskuri alkaa alusta. Vanhan tilin luovutukset (build 19, 96 %) jäivät historiaan. Laitetestaaja: build 20 -esikierros käynnissä (aed733c9). Karttaseppä: ei aja delta-polttoa juuri nyt.

**08.3x (vanha tili): Build 19 TestFlightissa 1.0.19 (ajo 36220773751, proto 41dd79c7), omistajalle pushattu (Fable). Fablen luovutus -b päivitetty (16c165c3e).**

**LUOVUTUSPYYNTÖ 05.21: viikko 90 % → kaikille 9 roolille lähetetty "kirjoita luovutus + aloitusviesti nyt ja pushaa (tilinvaihto lähestyy)"; Fablelle ilmoitettu. 97 % → Push omistajalle "Viikkokiintiö täynnä — vaihda tili" (ei muuta pushia ennen 08).**

**04.1x: Build 17 TestFlightissa 1.0.17 (ajo 36206983409, proto d04841a0), omistajalle pushattu (Fable). Fable avaa omistajan aamukortin (video + 127 + 128 + musiikkisuunnitelma) — EI uutta pushia ennen klo 08 (omistaja nukkuu).**

Ei avoimia kortteja.

**LÄMPÖERÄ build 16:een (omistajan päätös 18.2x):** Pelikoodari — dynaaminen ruudunpäivitys + lepopiirto + thermalState; Natiiviseppä — HDR/varjot/anturi; Laitetestaaja — 10 min lämpö- ja akkumittaus laitteella ennen/jälkeen.

**LEPOKÄSKY LÄHETETTY 20:40 (5 h -kiintiö 95 %):** Sisältökirjuri, Linssiseppä ja Natiivi-UI kaikki toimitettu ja idle 20:4x–20:48. Fable ilmoitettu. Build 16:n polku jatkaa. Kiintiö nollautuu 22:30 EEST.

**HERÄTYKSET LÄHETETTY 22:32:** "kiintiö nollautui, jatka luovutuksesi jonosta" → Natiiviseppä, Sisältökirjuri, Natiivi-UI, Pelikoodari (toimitettu), Linssiseppä (jonossa). Fable ilmoitettu. **GLO-30 VALMIS 22:10, eheys OK** (Karttaseppä tarkistaa). Fable hoitaa extraUsagen (7,74 €/13 €) omistajalle; extraUsage nyt pois päältä. Hälytä Fablelle jos extraUsage uudelleen käytössä ja ≥11 €.

**SITOVA SÄÄNTÖ (Fable 25.9. klo 23.5x): omistajalle menevät videot ja kuvat** — rajataan laitteen ruutuun ilman tyhjää reunaa: pystyvideo pystynä (esim. 1170×2532 → korkeus 1600 px), iPad vaakana, ei 16:9-kangasta, ei letterboxia; kuvapari vierekkäin ilman marginaaleja; hidastus omana tiedostona. (Syy: omistaja ei saanut selvää 146-mallista, koska puhelimen ruutu oli pieni harmaan kankaan keskellä.) Lähetetty kaikille 9 roolille (paitsi Fable) klo 00.0x.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22, omistajalle ilmoitettu pushilla. Aiempi: build 15 (1.0.15, 202609251449, proto 4a813e60).
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **5 h -kiintiö:** 22 % (uusi tili, nollautuu 11:00 UTC = 14:00 EEST). extraUsage pois päältä. **Viikko (kaikki mallit): 6 %.** **Viikko (Fable):** 5 %.
- **Levy:** 105 Gt vapaana (Fablen hälytysraja 80 Gt, vakiintunut ~104–106 Gt). **Swap:** 5,7 Gt / 7 Gt (hälytys >16 Gt). **NAS:** 5,6 Ti vapaana. **wt/-worktreet:** 43 kpl.
- **Simulaattorit boottina:** 3 (iPhone 18 Pro, natiiviseppa-iPhone, iPhone 17 — max 4 päivällä). coreaudiod hetkellinen piikki 22 % (alle 2 min -rajan, ei hälytystä). **Chrome-GPU-prosesseja (type=gpu-process):** 1 (raja >4 → Julkaisijalle).
- **Konteksti:** Sisältökirjuri 51 %, Natiiviseppä 47 %, Fable 41 %, Pelikoodari 36 %, Natiivi-UI 26 %, Linssiseppä 26 %, Karttaseppä 25 %, Siirtoseppä 22 %, Laitetestaaja 22 %, Julkaisija 15 %, Postivahti 25 %. Ei ylityksiä.
- **Juna:** viimeisin KÄÄNNETTY 894f1feb 10:35 — ei hälytystä.
- **Postilaatikko:** ei uutta (kärki 78e5a333e). **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku 11).
