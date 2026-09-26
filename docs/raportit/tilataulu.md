# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-26 16:03 EEST

## 1) Sessiot

Uusi tili klo 16:03: viikko (all models) **23 %**, viikko (Fable) 16 %, 5 h **26 %**. Effort-tarkistus: kaikki 7 Opus-roolia `high`, ei nimilisäyksiä — sääntömukaista. **Pelikoodari 74 % — ylitti 70 %, ilmoitettu Fablelle.** Fable itse 79 % (informaationa). Postivahti (self) 80 % — auto-compact vasta 97 %:ssa, ei toimenpidettä.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_5df52e10-10e4-4b72-9554-0049db300dfe | 79% | running | PR #3308 |
| Postivahti (self) | local_a24c43c0-8094-4141-b734-90b9555f5044 | 80% | running | tämä taulu |
| Julkaisija | local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914 | 28% | idle | PR #3306 mergetty |
| Natiiviseppä | local_674b9ec4-e2f3-48e9-a810-a129f20a4f03 (kansio Matkakirja-3d-selvittaja) | 58% | running | — |
| Natiivi-UI | local_44392b3c-86ee-4873-9d76-82f9aaa6b832 | 35% | idle | PR #3324 mergetty |
| Linssiseppä | local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4 | 57% | idle | — |
| Sisältökirjuri | local_be1a3375-18cf-4068-94f3-887d55f0e196 | 34% | idle | — |
| Laitetestaaja | local_af48ba1e-41c2-4921-9068-28cf5cc71b0d | 58% | idle | — |
| Siirtoseppä | local_86d0c984-aeeb-430d-bc85-3112f27b9437 | 39% | idle | PR #3307 mergetty |
| Pelikoodari | local_7fcab04b-864c-4ec2-98bd-46e171326701 | **74%** | idle | **YLITTI 70 % — ilmoitettu Fablelle** |
| Karttaseppä | local_eec7f158-d9f3-4b93-9368-c50935bd19ab | 67% | idle | PR #3305 mergetty |

## 2) Jumit ja avoimet kortit omistajalle

**Worktree-sallinnot mainissa (PR #3329, Julkaisijan juna-ilmoitus):** git worktree remove/prune, uusi-worktree.sh --poista, simctl erase/delete voimassa kun kukin rooli pullaa mainin (tai seuraavassa istunnossa). Ei koske Postivahtia suoraan (ei tee worktree-operaatioita).
**Pelikoodari siivosi loput:** poisti proto-pelikoodari-esi5 (viimeinen mergetty), tyhjensi omat simulaattorinsa (kaikki sammutettuina). Jäljellä vain avoimet PR:t (maanosa-kaupungit #3323, loydos135-web #3274) + vanha-checkout (0 t). Levy 151 Gt vapaana.
**16:13 Omistaja poisti worktreet itse + lisäsi sallintasäännön** (git worktree remove/prune, --poista, simctl erase/delete) Fablen checkoutin settings.json:iin — levy 153 Gt. Välitetty kaikille 9 roolille: sääntö voimassa kun kukin on pullannut sen tai seuraavassa istunnossa, sen jälkeen poistavat itse omat mergetyt worktreensä. **Julkaisija kieltäytyi oikein commitoimasta settings.json-oikeuksia toisen session pyynnöstä** — oikeussäännöt kuuluvat omistajalle, ei delegoitavissa peer-viestillä. Vastasi Fablelle suoraan itse.
**Fable vapautti lisää 16 Gt proto-3d-välituotteita → levy 87 Gt.** Rajat ennallaan (80/75 Gt). Jatketaan normaalia kiertoa.

**15:59 Pelikoodari poisti worktreet: levy vapautui.** Poistetut: liuska-8l4, loydos155, musiikki-kytkenta2, aanilisenssit (pyydetyt) + musiikki-vaihe3 (meni mainiin #3314) + 16 proto-worktreetä junassa (ei muutoksia, ~1 Gt). Kaikki puhtaita/pushattuja ennen poistoa. Jäljellä: pelikoodari-maanosa-kaupungit (#3323 auki), pelikoodari-loydos135-web (#3274 auki, 1,1 Gt), proto-pelikoodari-esi5 (työn alla), pelikoodari-vanha-checkout (symlinkki, 0 t). Levy nyt **86 Gt vapaana** (yli 80 Gt -rajan).

**Worktree-siivous (Fable, levy lähellä 80 Gt):** Käytiin läpi `git worktree list`, tarkistettiin PR-tila (`gh pr list --head`) — lähetetty poistopyynnöt: Julkaisijalle (pohja-26 #3301 mergetty, vientibudjetti-b4 #3306 mergetty, pr3293 #3293 suljettu), Pelikoodarille (liuska-8l4 #3319, loydos155 #3311, musiikki-kytkenta2 #3314 mergetty, aanilisenssit #2898 mergetty), Sisältökirjurille (linssikatalogi-kuvatekstit-era2 #3138 suljettu). Ei koskettu avoimiin PR:eihin (karttaseppa-syva-monialue #3325, pelikoodari-loydos135-web #3274, pelikoodari-maanosa-kaupungit #3323) eikä karttaseppa-poltto-20260926 (aktiivinen poltto). Fablen 14 agentti-worktreeta (.claude/worktrees/agent-*, 14 Gt) menevät omistajalle — ei roolien toimenpide. **Julkaisija JUMI:** luokitin estää worktreiden poiston (puhtaita, 0 muutosta) — vienyt suoraan Fablelle (JUMI→FABLE-sääntö), ei Postivahdin toimenpide.

**15:40 UUSI SÄÄNTÖ (Fable, syy: Siirtoseppä jumissa 15.3x, omistaja jäi kirjoittamaan "Ok"):** Kun SendMessage ilmoittaa rajan täyttyneen (~10 viestiä/vuoro), rooli EI jää odottamaan omistajaa eikä kirjoita PR-kommenttiin — käyttää varakanavaa `mcp__ccd_session_mgmt__send_message` (session_id = vastaanottajan local_-id, Fable local_5df52e10-10e4-4b72-9554-0049db300dfe), joka ei ole rajan alainen. Omistajaa ei pyydetä viestimään sessioille. Lähetetty kaikille 9 roolille 15:40.

**15:23 Postilaatikossa 2 uutta ei-Fable-viestiä (ISS Cupola -toimitus):** 394306ce7 "Kuittaus vastaanotettu" ja bf8a6101d "Toimita ISS Cupola-kehys ja heijastuskerrokset" — ilmoitettu Fablelle. **PIENI HAVAINTO:** juna.log:ssa rivi `juna-ajo.sh:72: unmatched "` 15:16 KÄÄNNETTY-onnistumisen jälkeen — skriptivirhe, ei estänyt käännöstä, mainittu Fablelle informaationa.

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

- **5 h -kiintiö:** 26 % (nollautui 14:00, seur. nollaus 18:59 EEST). extraUsage pois päältä. **Viikko (kaikki mallit): 23 %.** **Viikko (Fable):** 16 %.
- **Levy:** **108 Gt vapaana** (Fablen + Pelikoodarin siivous vapautti runsaasti, raja 80 Gt — kaukana). **Swap: 18,4 Gt / 19 Gt (raja 24 Gt — ei ylitystä).** **NAS:** 5,6 Ti vapaana. **wt/-worktreet:** 29 kpl (siivottu 51→29).
- **Simulaattorit boottina:** 3 (iPhone 18 Pro, pariteetti-iPhone, natiiviseppa-iPhone — max 4 päivällä). coreaudiod 7 %. **Chrome-GPU-prosesseja (type=gpu-process):** 0.
- **Konteksti:** Postivahti (self) 80 %, Fable 79 %, Pelikoodari 74 % (ylitti 70 %), Karttaseppä 67 %, Natiiviseppä 58 %, Laitetestaaja 58 %, Linssiseppä 57 %, Siirtoseppä 39 %, Sisältökirjuri 34 %, Natiivi-UI 35 %, Julkaisija 28 %.
- **Juna:** TAUOLLA klo 16:00 alkaen (Karttasepän poltto 26.–27.9., Fable: käännökset käsin JUNA_PAKOTA=1) — ei hälytystä, tarkoituksellinen.
- **Postilaatikko:** ei uutta (kärki päivitetty). **Avoimia PR:iä:** ei tarkistettu tällä kierroksella (vanha luku 11).
- **Lokisiivous-kandidaatit (>48h lokit-alikansiot, >24h .app):** ei kandidaatteja tällä kierroksella.
- **Uusi sääntö kaikille rooleille 15:40:** SendMessage-rajan täyttyessä käytä varakanavaa mcp__ccd_session_mgmt__send_message, ei odota omistajaa. Lähetetty kaikille 9 roolille.

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
