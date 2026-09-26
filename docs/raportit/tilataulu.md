# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-26 14:55 EEST

## 1) Sessiot

Uusi tili klo 14:55: viikko (all models) **19 %**, viikko (Fable) 13 %, 5 h **12 %**. Effort-tarkistus: kaikki 7 Opus-roolia `high`, ei nimilisäyksiä — sääntömukaista. Ei kontekstiylityksiä (Fable/Pelikoodari 67 %, lähellä 70 %). Ei poistokandidaatteja.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_5df52e10-10e4-4b72-9554-0049db300dfe | 67% | running | PR #3308 |
| Postivahti (self) | local_a24c43c0-8094-4141-b734-90b9555f5044 | 68% | running | tämä taulu |
| Julkaisija | local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 | 27% | idle | PR #3306 mergetty |
| Natiiviseppä | local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja) | 41% | idle | — |
| Natiivi-UI | local_44392b3c-86ee-4873-9d76-82f9aaa6b832 | 16% | idle | PR #3324 mergetty |
| Linssiseppä | local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 | 52% | running | — |
| Sisältökirjuri | local_be1a3375-18cf-4068-94f3-887d55f0e196 | 30% | idle | — |
| Laitetestaaja | local_af48ba1e-41c2-4921-9068-28cf5cc71b0d | 50% | idle | — |
| Siirtoseppä | local_86d0c984-aeeb-430d-bc85-3112f27b9437 | 36% | running | PR #3307 mergetty |
| Pelikoodari | local_7fcab04b-864c-4ec2-98bd-46e171326701 | 67% | idle | vakaa |
| Karttaseppä | local_eec7f158-d9f3-4b93-9368-c50935bd19ab | 61% | idle | PR #3305 mergetty |

## 2) Jumit ja avoimet kortit omistajalle

**15:00 Fable kuittasi ja antoi Karttasepälle ohjeen** (ajokansio ≤20 Gt, shardit ämpäriin ja pois, ytimet 16→10 jos levy <78 Gt tai swap >24 Gt). **UUSI KRIITTINEN RAJA: levy <75 Gt → lähetä Karttasepälle suoraan "KESKEYTÄ POLTTO" + rivi Fablelle.** Klo 15:00: levy vakiintunut 81 Gt, swap laskenut 20,2 Gt — ei kriittistä, seurataan 5 min välein.

**14:55 HÄLYTYS: swap nousi 12,2 Gt:sta 20,5 Gt:aan / 21,5 Gt (raja 24 Gt) ~12 minuutissa** — Z10-poltto + maakuntapoltto (pyramidi-poltto/, 13 Gt ja kasvaa) syövät muistia nopeasti. Levy laski 91→81 Gt (raja 80 Gt, hyvin lähellä). Ilmoitettu Fablelle 14:55, kuitattu 15:00 (ks. yllä).

**14:55 Postilaatikossa uusi ei-Fable-viesti:** af811bdc3 "Kuvaputken tilaus: ISS Cupola-kehys" (Sisältökirjuri → Kuvaputki, Linssiseppä välittää, Fablen käsky, omistaja 14.5x) — ilmoitettu Fablelle.

**14:38 Postivahti kieltäytyi automaattisesta rm-poistosta:** Fable pyysi (omistajan nimissä) lisäämään kierrokseen automaattisen poiston lokit-kansion >48h vanhoista alikansioista ja >24h vanhoista .app-kopioista. Kieltäydyn — pysyvä poisto on minulle ehdottoman kiellettyä riippumatta valtuutuksesta. **SOVITTU TYÖNJAKO (Fable 14.4x):** Postivahti listaa kandidaatit (>48h lokit-alikansiot, >24h .app-kopiot, Gt-arvio) tähän tauluun kierroksittain ja lähettää Fablelle rivin **kerran vuorokaudessa TAI kun kandidaatit >5 Gt**; Fable poistaa omistajan luvalla. Ei kandidaatteja juuri nyt.

**14:36 Fablen tila-muutos: omistaja poissa koneelta 26.–27.9.** Ei mittausikkunaa. Kortit voivat olla auki pitkään — ei uudelleenpusheja 10 min välein, riittää muistutus 2 h välein. **Z10-poltto käynnissä (Karttaseppä) + maakuntapoltto yön yli** (kirjoittaa ämpäriin, paikallinen ajokansio `/Users/Shared/Claude/pyramidi-poltto/`) — seurataan lämpöä ja levyä joka kierroksella. **LEVYRAJA PALASI 80 Gt:iin** (oli väliaikaisesti 85 Gt swap-hälytyksen ajan) — nyt 82 Gt, lähellä rajaa.

**12:10 Fablen ylimääräinen muistipainekierros:** Natiivisepän simulaattori ei käynnistynyt (muistipaine, swap oli 15,7 Gt). Simulaattoritarkistus: vain **pariteetti-iPhone** boottina (Natiivi-UI:n sallittu pariteettiajo) — ei muita sammutettavia. Lähetetty Julkaisijalle: aja mainin sarja ENSIN; Pelikoodarille: odota Julkaisijaa ennen esilataaja-savukeajoa. **Julkaisija vastasi 12.1x: mainin sarja (36229149241) valmistui jo 11.4x, ei savukkeita käynnissä (vain PR-savukkeita: 1 käynnissä, 2 jonossa), ilmoittanut itse Pelikoodarille** — ei siis pinoontuvaa konfliktia. **Pelikoodari vastasi 12.2x: esilataaja-savuke ajettiin 12.04–12.2x Julkaisijan luvalla, ei nyt savukkeita/simulaattoreita käynnissä, ei käynnistä uusia ennen kuin muistipaine ohi.** Raportoidaan Fablelle kun swap <12 Gt tai 20 min kuluttua (viim. 12:30).

**12:0x: Fable löysi levyn syyn — CoreSimulator/Devices 78 Gt (19 laitetta; offline-sarja 26 latautuu joka simulaattoripeliin ~2 Gt + PRBPoster-roska 4,4 Gt/laite).** Ei purge-toistoa. Korjaus etenee: Laitetestaaja siivoaa käyttämättömät laitteet, Siirtoseppä + Natiiviseppä kytkevät offline-latauksen pois oletuksena. Sisältökirjurille (70 %) välitetty pyyntö: luovutus + kontekstin nollaus BEL-PR:n jälkeen.

**11:54 KAKSI ILMOITUSTA FABLELLE:**
1. **Sisältökirjuri konteksti YLITTI 70 % (65→70 %).** Ilmoitettu.
2. **Levy 84 Gt < 85 Gt -raja → ajoin `sudo purge` Fablen ohjeen mukaan.** Tulos: swap ja levy **ennallaan** (84 Gt, swap ~15,8 Gt) — purge ei vapauttanut tilaa, koska kyse ei ole muistivälimuistista vaan oikeasta levytilasta. Levyongelma vaatii muuta kuin purgea; ilmoitettu Fablelle.

**11:39: Fable selvitti swap/levy-hälytyksen — ei yksittäistä syyllistä** (simulaattori 1,3 Gt, 3× Playwright-Chromium ~3 Gt, mds_stores 1,4 Gt/Spotlight indeksoi lokit-kansiota 38 Gt, dotnet 0,9 Gt, DerivedData 9,6 Gt). Klo 11:39 swap **16,13/17,4 Gt**, levy **91 Gt** — molemmat Fablen uusien rajojen sisällä (swap ≤24 Gt, levy ≥85 Gt), ei purge-tarvetta. **UUDET RAJAT (Fable 11:4x): swap >24 Gt TAI levy <85 Gt → Postivahti ajaa `sudo purge` ja ilmoittaa Fablelle.**

**11:39 HAVAINTO (Fablen pyytämä tarkistus #3): useita proto-kaanna.sh-ajoja päällekkäin samalla simulaattorilla.** Simulaattori FBBD41D7 (natiiviseppa-iPhone) kohteena 4 samanaikaisessa proto-kaanna.sh-prosessissa yhtä aikaa: `natiivi-ui/symbolit-160b`, `natiiviseppa/symbolimallit-160+natiivi-ui/symbolit-160b`, `juna/b13` (x2, eri haarayhdistelmillä). Tämä on todennäköinen swap-piikin osasyy — muistutus [[poltot-rinnakkaisuus-paivalla]]-säännöstä lähetetty Fablelle.

**11:30 HÄLYTYS Postivahdilta — SWAP YLI RAJAN (kuitattu 11:39, ks. yllä):** swap oli **19,25 Gt / 20,48 Gt**, levy 90 Gt.

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

- **5 h -kiintiö:** 12 % (nollautui 14:00, seur. nollaus 18:59 EEST). extraUsage pois päältä. **Viikko (kaikki mallit): 19 %.** **Viikko (Fable):** 13 %.
- **Levy:** **81 Gt vapaana — laskee nopeasti (91→81, 12 min), raja 80 Gt hyvin lähellä.** **Swap: 20,5 Gt / 21,5 Gt — NOUSSU JYRKÄSTI (12,2→20,5), raja 24 Gt lähellä.** Syy: Z10-poltto + maakuntapoltto (pyramidi-poltto/ 13 Gt). **NAS:** 5,6 Ti vapaana. **wt/-worktreet:** 50 kpl.
- **Simulaattorit boottina:** 2 (iPhone 18 Pro, linssiseppa-iPhone — max 4 päivällä). coreaudiod 9 %. **Chrome-GPU-prosesseja (type=gpu-process):** 0.
- **Konteksti:** Fable 67 %, Pelikoodari 67 % (molemmat lähellä 70 %), Karttaseppä 61 %, Postivahti 68 %, Linssiseppä 52 %, Laitetestaaja 50 %, Natiiviseppä 41 %, Siirtoseppä 36 %, Julkaisija 27 %, Sisältökirjuri 30 %, Natiivi-UI 16 %.
- **Juna:** ei uutta commitia 14:02 jälkeen, ei proto-kaanna.sh käynnissä — jono tyhjä, ei hälytystä.
- **Postilaatikko:** UUSI ei-Fable-viesti af811bdc3, ilmoitettu Fablelle. **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku 11).
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
