# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 09:23 EEST (YÖTILA — omistaja nukkuu, ei muistutuspusheja)

## 1) Sessiot

| Rooli | Session id | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|---|
| Fable | local_742d1717-d642-426a-840b-c5c0e75578bf | Fable 5.1 | 51% | idle | — | — |
| Julkaisija | local_9922c4b6-320f-4074-aed4-f2811a7c9640 | Opus, high | 27% | idle | — | — |
| Natiiviseppä | local_860f922b-94b8-49da-975d-4233a993bbb8 | Opus | 61% | idle | — | — |
| Natiivi-UI | local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 | Opus | 28% | idle | — | — |
| Linssiseppä | local_3273f209-099d-4ed3-830e-e4e1b40bcc7d | Opus | 48% | idle | — | Radiouudistus build 12 |
| Sisältökirjuri | local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f | Sonnet | 28% | idle | — | Nollasi itsensä (71%→28%) |
| Laitetestaaja | local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 | Sonnet | 48% | idle | — | — |
| Siirtoseppä | local_7a1255c5-d525-4323-9438-70e7379ad2fe | Opus | 33% | idle | — | — |
| Pelikoodari | local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 | Opus | 44% | idle | — | — |
| Karttaseppä | local_445a5c7b-4317-4989-b65d-4cb81bd10056 | Opus | 64% | idle | — | — |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d | Sonnet | 49% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle (yön kooste)

Ei avoimia kortteja tiedossa juuri nyt. coreaudiod ~0 % CPU, vakaa.

**Huoltosallinnat synkattu:** PR #3142 mainissa, Postivahti mergasi ja pushasi (ks. edellinen kierros). coreaudiod-sääntö (>200 % yli 2 min → sudo killall coreaudiod) käytettävissä ilman luokitinestoa.

**Junasääntö (Fable 04:1x):** ei vielä havaintoja 30 min -käännösviiveestä eikä sisältöjonon 4-PR/4h-ehdon täyttymisestä ilman junaa.

**Postilaatikko:** uusi commit 3ee87f1d3 "Posti: tilaa Bergenin ja Sevillan julistekuvat kuvaputkelta (PR #2991)" — uusi tilaus, ei kriittinen, mutta eri sisältöinen kuin edellinen sarja (linssikatalogi → nyt julistekuvat).

**UUSI SÄÄNTÖ (Fable 09:3x, sitova): muistiseuranta.** 1) `sysctl vm.swapusage` — hälytys >16 Gt käytössä. 2) Simulaattorit joissa peli ei ole pyörinyt 30 min sammutetaan kokonaan (`xcrun simctl shutdown <UDID>`), ei vain peli — SimMetalHost vie 1,6 Gt/simulaattori. 3) Yli 4 rinnakkaista "Google Chrome for Testing" GPU-prosessia → ilmoita Julkaisijalle.

**HAVAINTO (09:23, ilmoitettu):** vm.swapusage used = 22,3 Gt (raja 16 Gt ylittyi) — ilmoitettu Fablelle. 6 Chrome for Testing GPU-prosessia samanaikaisesti (raja 4) — ilmoitettu Julkaisijalle. 6 simulaattoria yhä boottina, vanhin 04:36 asti (yli 5h) — ei vielä sammutettu, rooli ei ole nollattu, ei tehty itse toimenpidettä.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 126 Gt vapaana. Raja 35 Gt.
- **wt/-worktreet:** 34 kpl.
- **5 h -kiintiö:** 32%, nollautunut 05:20. Raja 95%/98%.
- **Viikkokiintiö (kaikki mallit):** 90%. **Viikkokiintiö (Fable):** 50%. Nollautuu 2026-09-28 klo 01:00.
- **coreaudiod:** ~0 % CPU, vakaa.

## 6) Kellonaika

2026-09-25 09:17 EEST. Yön merkkipaalut: Sisältökirjuri nollasi itsensä, huoltosallinnat synkattu, uusi postilaatikkotilaus (julistekuvat).
