# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 12:06 EEST

## 1) Sessiot

| Rooli | Session id | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|---|
| Fable | local_742d1717-d642-426a-840b-c5c0e75578bf | Fable 5.1 | 61% | busy | — | — |
| Julkaisija | local_9922c4b6-320f-4074-aed4-f2811a7c9640 | Opus, high | 32% | busy | — | — |
| Natiiviseppä | local_860f922b-94b8-49da-975d-4233a993bbb8 | Opus | 17% | busy | — | — |
| Natiivi-UI | local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 | Opus | 67% | busy | — | Lähestyy 70%, seurataan |
| Linssiseppä | local_3273f209-099d-4ed3-830e-e4e1b40bcc7d | Opus | 60% | busy | — | — |
| Sisältökirjuri | local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f | Sonnet | 69% | busy | — | Lähestyy 70%, seurataan |
| Laitetestaaja | local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 | Sonnet | 55% | busy | — | — |
| Siirtoseppä | local_7a1255c5-d525-4323-9438-70e7379ad2fe | Opus | 35% | busy | — | — |
| Pelikoodari | local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 | Opus | 54% | busy | — | — |
| Karttaseppä | local_445a5c7b-4317-4989-b65d-4cb81bd10056 | Opus | 70% | idle | — | **RAJA YLITTYI, ilmoitettu Fablelle 11:xx** |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d | Sonnet | 68% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia kortteja tiedossa juuri nyt.

**HYVÄ UUTINEN — sivutus RATKENNUT kokonaan:** vm.swapusage on nyt 0 Gt (oli huipussaan 22,8 Gt). Todennäköisesti koneen uudelleenkäynnistyksen myötä (huomattu myös oma sessio ja muut roolit nollautuneina/uudelleenkäynnistyneinä n. klo 11-12 välillä). Ilmoitettu Fablelle tuntiraporttina — ei enää seurattavaa.

**Viikkokiintiö (kaikki mallit) 97%** — hyvin lähellä 100 %. Ilmoitettu Fablelle, ei vielä sovittua hälytysrajaa tälle.

**Karttaseppä ylitti 70%** — ilmoitettu Fablelle.

**Varmuuskopio-tarkistus:** varmuuskopio-VIKA.txt tyhjä. Käännösjuna kunnossa (viimeisin onnistunut asennus 11:23, alle 2h).

**Junasääntö (Fable 04:1x):** ei havaintoja 30 min -käännösviiveestä eikä sisältöjonon 4-PR/4h-ehdon täyttymisestä ilman junaa.

**Postilaatikko:** viimeisin commit 7755d9c5a "Posti: kuittaa kahden kaupungin galleriakytkentä PR:ssä" — muuttumaton.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 200 Gt vapaana. Raja 35 Gt.
- **wt/-worktreet:** 36 kpl.
- **5 h -kiintiö:** 14%. Raja 95%/98%.
- **Viikkokiintiö (kaikki mallit):** 97% (huom, lähellä 100%). **Viikkokiintiö (Fable):** 53%. Nollautuu 2026-09-28 klo 01:00.
- **Sivutus:** 0 Gt — RATKENNUT.

## 6) Kellonaika

2026-09-25 12:06 EEST. Merkkipaalut: sivutus ratkennut kokonaan, Karttaseppä 70%, viikkokiintiö 97%.
