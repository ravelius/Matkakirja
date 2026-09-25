# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 10:01 EEST (YÖTILA — omistaja nukkuu, ei muistutuspusheja)

## 1) Sessiot

| Rooli | Session id | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|---|
| Fable | local_742d1717-d642-426a-840b-c5c0e75578bf | Fable 5.1 | 54% | idle | — | — |
| Julkaisija | local_9922c4b6-320f-4074-aed4-f2811a7c9640 | Opus, high | 28% | idle | — | — |
| Natiiviseppä | local_860f922b-94b8-49da-975d-4233a993bbb8 | Opus | 64% | idle | — | — |
| Natiivi-UI | local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 | Opus | 48% | idle | — | — |
| Linssiseppä | local_3273f209-099d-4ed3-830e-e4e1b40bcc7d | Opus | 54% | idle | — | — |
| Sisältökirjuri | local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f | Sonnet | 56% | idle | — | — |
| Laitetestaaja | local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 | Sonnet | 52% | idle | — | — |
| Siirtoseppä | local_7a1255c5-d525-4323-9438-70e7379ad2fe | Opus | 33% | idle | — | — |
| Pelikoodari | local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 | Opus | 45% | idle | — | — |
| Karttaseppä | local_445a5c7b-4317-4989-b65d-4cb81bd10056 | Opus | 65% | idle | — | — |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d | Sonnet | 56% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle (yön kooste)

Ei avoimia kortteja tiedossa juuri nyt.

Chrome for Testing GPU -prosessien heilahtelu selvitetty (Julkaisija) — lyhytikäisiä savukeajon prosesseja, ei pysyvä kasvu, PR #3146 tulossa.

**Simulaattorit:** 4 boottina (iPhone 18 Pro, linssiseppa-iPhone, iPhone 17, iPad Pro 13) — testiaktiviteetti näyttää jatkuvan normaalisti, ei jumi.

**Sivutus:** 22,3→20,5→20,3→20,2 Gt — laskee erittäin hitaasti. Postivahti raportoi Fablelle n. klo 10:23.

**Junasääntö (Fable 04:1x):** ei vielä havaintoja 30 min -käännösviiveestä eikä sisältöjonon 4-PR/4h-ehdon täyttymisestä ilman junaa.

**Postilaatikko:** uusi commit b2772e286 "Posti: toimita kahden puuttuneen kaupungin galleriakuvat" — sarjan jatkoa (galleria 59 -korjaus), ei kriittinen.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo. PR #3146 tulossa (GPU-rinnakkaisuuden rajoitus).

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 169 Gt vapaana. Raja 35 Gt.
- **wt/-worktreet:** 36 kpl.
- **5 h -kiintiö:** 41%, nollautuu n. 10:20 EEST. Raja 95%/98%.
- **Viikkokiintiö (kaikki mallit):** 92%. **Viikkokiintiö (Fable):** 51%. Nollautuu 2026-09-28 klo 01:00.
- **Sivutus:** 20,2 Gt käytössä (raja 16 Gt, laskee erittäin hitaasti).
- **Simulaattorit:** 4 boottina.

## 6) Kellonaika

2026-09-25 10:01 EEST. Yön merkkipaalut: Chrome-GPU-heilahtelu selvitetty, sivutusraportti Fablelle tulossa klo 10:23.
