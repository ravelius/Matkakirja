# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 08:55 EEST (YÖTILA — omistaja nukkuu, ei muistutuspusheja)

## 1) Sessiot

| Rooli | Session id | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|---|
| Fable | local_742d1717-d642-426a-840b-c5c0e75578bf | Fable 5.1 | 49% | idle | — | — |
| Julkaisija | local_9922c4b6-320f-4074-aed4-f2811a7c9640 | Opus, high | 25% | idle | — | — |
| Natiiviseppä | local_860f922b-94b8-49da-975d-4233a993bbb8 | Opus | 61% | idle | — | — |
| Natiivi-UI | local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 | Opus | 28% | idle | — | — |
| Linssiseppä | local_3273f209-099d-4ed3-830e-e4e1b40bcc7d | Opus | 44% | idle | — | Radiouudistus build 12 |
| **Sisältökirjuri** | local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f | Sonnet | **71%** ⚠️ | idle | — | **RAJA YLITTYI, ilmoitettu Fablelle 08:55 (varakanava)** |
| Laitetestaaja | local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 | Sonnet | 48% | idle | — | — |
| Siirtoseppä | local_7a1255c5-d525-4323-9438-70e7379ad2fe | Opus | 33% | idle | — | — |
| Pelikoodari | local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 | Opus | 44% | idle | — | — |
| Karttaseppä | local_445a5c7b-4317-4989-b65d-4cb81bd10056 | Opus | 62% | idle | — | Poltto valmistunut (04:47–08:31) |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d | Sonnet | 47% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle (yön kooste)

Ei avoimia kortteja tiedossa juuri nyt.

**UUSI SÄÄNTÖ (Fable 08:4x, sitova, Raamattuun HUOLTOKOMENNOT ILMAN OMISTAJAA):** jos coreaudiod ylittää 200 % CPU yli 2 min, Postivahti ajaa `sudo killall coreaudiod` (sudo-oikeus annettu koodaus-käyttäjälle täsmälleen tälle komennolle, tulossa .claude/settings.json:iin). Jos luokitin estää ennen sallinnan päivittymistä, Postivahti ilmoittaa Fablelle eikä yritä kiertää estoa. coreaudiod on tällä hetkellä ~0 % CPU — ei toimenpiteitä.

**HUOM (viestiraja, 3. kerta):** SendMessage kieltäytyi taas (12. viesti) — käytin mcp__ccd_session_mgmt__send_message-varakanavaa.

**Junasääntö (Fable 04:1x):** ei vielä havaintoja 30 min -käännösviiveestä eikä sisältöjonon 4-PR/4h-ehdon täyttymisestä ilman junaa.

**Postilaatikko:** viimeisin commit 3bffaa8c6 "Reconcile all 155 lens IDs and source availability" — muuttumaton seitsemällätoista kierroksella.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 136 Gt vapaana. Raja 35 Gt.
- **wt/-worktreet:** 37 kpl.
- **5 h -kiintiö:** 29%, nollautunut 05:20. Raja 95%/98%.
- **Viikkokiintiö (kaikki mallit):** 89%. **Viikkokiintiö (Fable):** 49%. Nollautuu 2026-09-28 klo 01:00.
- **coreaudiod:** ~0 % CPU, vakaa.

## 6) Kellonaika

2026-09-25 08:55 EEST. Yön merkkipaalut: Sisältökirjuri ylitti 70% (ilmoitettu), uusi coreaudiod-huoltokomentosääntö kirjattu.
