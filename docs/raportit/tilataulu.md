# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-26 09:16 EEST

## 1) Sessiot

**TILINVAIHTO HAVAITTU 09:16 (Postivahti):** kaikki 25.9. id:t "not found" (vanha tili), get_usage "self" näyttää viikko (all models) 0 %, viikko (Fable) 1 %, 5 h 2 % — uusi tili. `list_sessions` löytää vain 3 sessiota tällä tilillä: Fable, Julkaisija, Natiiviseppä. Loput 7 roolia (Natiivi-UI, Linssiseppä, Sisältökirjuri, Laitetestaaja, Siirtoseppä, Pelikoodari, Karttaseppä) puuttuvat kokonaan — eivät nollattuja, vaan olemattomia tällä tilillä. Ilmoitettu Fablelle.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_5df52e10-10e4-4b72-9554-0049db300dfe | 16% | running | — |
| Julkaisija | local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 | 10% | running | — |
| Natiiviseppä | local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja) | 10% | running, RC päällä | — |
| Natiivi-UI | — | — | **puuttuu** | Fable luo uudelleen |
| Linssiseppä | — | — | **puuttuu** | Fable luo uudelleen |
| Sisältökirjuri | — | — | **puuttuu** | Fable luo uudelleen |
| Laitetestaaja | — | — | **puuttuu** | Fable luo uudelleen |
| Siirtoseppä | — | — | **puuttuu** | Fable luo uudelleen |
| Pelikoodari | — | — | **puuttuu** | Fable luo uudelleen |
| Karttaseppä | — | — | **puuttuu** | Fable luo uudelleen |
| Postivahti (self) | (uusi tili, get_usage "self") | 9% | running | tämä taulu; viikko 0–1 %, 5 h 2 %, swap 5,7 Gt, levy 120 Gt vapaana; juna: KÄÄNNETTY aed733c9 09:13 |

## 2) Jumit ja avoimet kortit omistajalle

**09:16: TILINVAIHTO — ks. kohta 1.** Viikko/5h-rajat (85/98 %) koskevat nyt uutta tiliä, laskuri alkaa alusta. Vanhan tilin luovutukset (build 19, 96 %, lepokäsky-suunnitelma) jäivät historiaan; Fable päättää tarvitseeko 7 puuttuvaa roolia luoda uudelleen samalla worktree-tilalla.

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

- **5 h -kiintiö:** 2 % (uusi tili, nollautuu 10:59 UTC). extraUsage pois päältä. **Viikko (kaikki mallit): 0 %.** **Viikko (Fable):** 1 %.
- **Levy:** 120 Gt vapaana (Fablen hälytysraja 80 Gt). **Swap:** 5,7 Gt / 7 Gt (hälytys >16 Gt). **NAS:** 5,6 Ti vapaana. **wt/-worktreet:** 33 kpl.
- **Simulaattorit boottina:** 1 (iPhone 17, max 4 päivällä). coreaudiod 0 %. **Chrome-GPU-prosesseja:** 0.
- **Konteksti:** Fable 16 %, Julkaisija 10 %, Natiiviseppä 10 %. Ei ylityksiä. Loput 7 roolia puuttuu (ks. kohta 1).
- **Juna:** proto-kaanna.sh ei käynnissä juuri nyt; viimeisin KÄÄNNETTY aed733c9 09:13, ei hälytystä.
- **Postilaatikko:** ei uutta (kärki 78e5a333e). **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku 11).
