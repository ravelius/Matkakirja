# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 04:37 EEST (YÖTILA — omistaja nukkuu, ei muistutuspusheja)

## 1) Sessiot

| Rooli | Session id | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|---|
| Fable | local_742d1717-d642-426a-840b-c5c0e75578bf | Fable 5.1 | 25% | idle | — | — |
| Julkaisija | local_9922c4b6-320f-4074-aed4-f2811a7c9640 | Opus, high | 18% | idle | — | Seuraava tarkistus klo :17; TestFlight 04:00-tulos ei vielä näkynyt eventeissä |
| **Natiiviseppä** | local_860f922b-94b8-49da-975d-4233a993bbb8 | Opus | **70%** ⚠️ | idle | — | **RAJA YLITTYI, ilmoitettu Fablelle 04:37** |
| Natiivi-UI | local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 | Opus | 40% | idle | — | Testikäännös käännöspalvelulla |
| Linssiseppä | local_3273f209-099d-4ed3-830e-e4e1b40bcc7d | Opus | 29% | idle | — | Radiouudistus build 12 |
| Sisältökirjuri | local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f | Sonnet | 47% | idle | — | — |
| Laitetestaaja | local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 | Sonnet | 59% | idle | — | — |
| Siirtoseppä | local_7a1255c5-d525-4323-9438-70e7379ad2fe | Opus | 32% | idle | — | — |
| Pelikoodari | local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 | Opus | 47% | idle | — | — |
| Karttaseppä | local_445a5c7b-4317-4989-b65d-4cb81bd10056 | Opus | 57% | idle | — | Peruspoltto 05:05 alkaen, kesto n. 6–7 h |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d | Sonnet | 15% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle (yön kooste)

Ei avoimia kortteja tiedossa juuri nyt. Sisältökirjuri poisti omat worktreensa mergettyjen PR:ien jälkeen (Julkaisijan havainto).

**Junasääntö (Fable 04:1x):** ei vielä havaintoja 30 min -käännösviiveestä eikä sisältöjonon 4-PR/4h-ehdon täyttymisestä ilman junaa — ei vielä tarkkaa mittaustapaa "vihreille" PR:ille, seurataan.

**NAS-siirto valmis:** levy 84→166 Gt. **E28-pallolaatat valmiit.** Postilaatikko: uusi commit 805af5b2e "linssikatalogin seuraavan 18 linssin R2-toimitus" (edellinen oli "18 nykyisen linssin" — sarjan seuraava erä, ei kriittinen, seurataan jatkumona).

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- **Yöajo klo 04:00** — tulos EI vielä näkynyt Julkaisijan eventeissä 04:37 mennessä. Seurataan.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 161 Gt vapaana. Raja 35 Gt.
- **wt/-worktreet:** 27 kpl (laski 30→27, Sisältökirjuri siivosi).
- **5 h -kiintiö:** 39%, nollautuu klo 02:20 UTC (05:20 EEST, n. 42 min päässä). Raja 95%/98%.
- **Viikkokiintiö (kaikki mallit):** 79%. **Viikkokiintiö (Fable):** 45%. Nollautuu 2026-09-28 klo 01:00.

## 6) Kellonaika

2026-09-25 04:37 EEST. Yön merkkipaalut: E28 VALMIS, Natiiviseppä ylitti 70% (ilmoitettu), TestFlight-yöajon 04:00 tulos vielä avoinna, Karttasepän poltto 05:05 alkaen (n. 6–7 h).
