# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 02:56 EEST (YÖTILA — omistaja nukkuu, ei muistutuspusheja)

## 1) Sessiot

| Rooli | Session id | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|---|
| Fable | local_742d1717-d642-426a-840b-c5c0e75578bf | Fable 5.1 | 19% | idle | — | — |
| Julkaisija | local_9922c4b6-320f-4074-aed4-f2811a7c9640 | Opus, high | 14% | busy | — | PR #3128 (linssikatalogi) |
| Natiiviseppä | local_860f922b-94b8-49da-975d-4233a993bbb8 | Opus | 62% | busy | — | — |
| Natiivi-UI | local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 | Opus | 20% (nollautunut) | busy | — | Testikäännös käännöspalvelulla |
| Linssiseppä | local_3273f209-099d-4ed3-830e-e4e1b40bcc7d | Opus | 29% | idle | — | Radiouudistus build 12 |
| Sisältökirjuri | local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f | Sonnet | 42% | idle | PR #3128 -korjaukset | — |
| Laitetestaaja | local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 | Sonnet | 53% | idle | — | — |
| Siirtoseppä | local_7a1255c5-d525-4323-9438-70e7379ad2fe | Opus | 32% | idle | — | — |
| Pelikoodari | local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 | Opus | 47% | idle | — | — |
| Karttaseppä | local_445a5c7b-4317-4989-b65d-4cb81bd10056 | Opus | 53% | idle | E28-pallolaatat viety ämpäriin | — |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d | Sonnet | 88% | busy | (tämä taulu) — autocompact lähestyy (97%) | — |

## 2) Jumit ja avoimet kortit omistajalle (yön kooste)

Ei tiedossa olevia avoimia kortteja. Yön nollaukset (kaikki onnistuneet, ei jumeja): Julkaisija, Sisältökirjuri, Fable, Linssiseppä, Natiivi-UI. YÖTILA: uusia kortteja ei muistuteta erikseen, kootaan aamuraporttiin.

**NAS-siirto valmis:** levy 84→164 Gt, ilmoitettu Fablelle. **E28-pallolaatat valmiit** (199 708 laattaa, 1,5 Gt), ilmoitettu Fablelle. Uusi postilaatikko-tilaus (linssikatalogi erä 155) odottaa toteutusta.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako otsikon perusteella, ei virallinen luokitus):
- **Sisältö** (kohdekartat, galleria/ennenNyt, lisenssit, julisteet): ~21
- **Toiminto** (koodi/tekniikka: aluenimet, laattapoltto, radiouudistus, natiivi-muutosloki): ~10
- **Luonnos/raportti** (inventaariot, luovutukset, ehdotukset): ~9

Julkaisijan seuraava juna: PR #3128 (linssikatalogi) kun testit valmiit ja Pelikoodari hyväksyy; sisältöjunat jatkossa klo 10 ja 20. BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- **Yöajo klo 04:00** — seurataan.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 164 Gt vapaana. Raja 35 Gt.
- **wt/-worktreet:** 30 kpl.
- **5 h -kiintiö:** 30%, nollautuu klo 02:20 UTC (05:20 EEST). Raja 95%/98%, tauko vasta 98%:ssa.
- **Viikkokiintiö (kaikki mallit):** 76%. **Viikkokiintiö (Fable):** 44%. Nollautuu 2026-09-28 klo 01:00.

## 6) Kellonaika

2026-09-25 02:56 EEST (`date`-komennolla varmennettu). Yön merkkipaalut: E28 VALMIS, TestFlight-yöajo 04:00.
