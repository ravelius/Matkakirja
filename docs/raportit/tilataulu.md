# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 21:24 EEST (5h-kiintiö 100 %, extraUsage käytössä)

## 1) Sessiot

Kaikki roolisessiot luotu uudelleen 25.9. ~12.5x (uudet id:t). Konteksti-ikkuna nyt 1 M, prosentit sen mukaan.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_593b89a1-2514-4d74-b956-2a73db862382 | 41% | running | — |
| Julkaisija | local_22b29f10-7af8-43fc-a974-1d666f716c97 | 49% | running | — |
| Natiiviseppä | local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 (kansio Matkakirja-3d-selvittaja) | 51% | running | Nollattu ja palannut käyntiin |
| Natiivi-UI | local_33ba1387-d688-4e44-8e05-10951e61efc0 | 23% | idle (lepokäsky) | Nollattu ja jo uudelleenkäynnistetty (huomattu vasta jälkikäteen, 18.23–18.35 välillä) |
| Linssiseppä | local_45a869de-4d6b-4ed6-a6c9-30fd8442587e | 16% | idle (lepokäsky) | Nollattu ja palannut käyntiin |
| Sisältökirjuri | local_256f6a15-b806-4259-97bd-b2ba8d342f86 | 10% | idle (lepokäsky) | Nollattu ja palannut käyntiin |
| Laitetestaaja | local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 | 53% | idle | PR #3153 (savukierros B13) |
| Siirtoseppä | local_b50bb32e-18e2-47c5-a597-8a18d56874e1 | 31% | idle | PR #3155 |
| Pelikoodari | local_97810d35-a79c-484b-8573-660a4c40eaa6 | 34% | running | Nollattu ja palannut käyntiin |
| Karttaseppä | local_37708e68-5a58-45ca-8dee-c13620993531 | 16% | running | Nollattu ja palannut käyntiin (8 %) |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d (vanha; uusi id: get_usage "self") | 8% | running | (tämä taulu) |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia kortteja.

**LÄMPÖERÄ build 16:een (omistajan päätös 18.2x):** Pelikoodari — dynaaminen ruudunpäivitys + lepopiirto + thermalState; Natiiviseppä — HDR/varjot/anturi; Laitetestaaja — 10 min lämpö- ja akkumittaus laitteella ennen/jälkeen.

**LEPOKÄSKY LÄHETETTY 20:40 (5 h -kiintiö 95 %):** Sisältökirjuri, Linssiseppä ja Natiivi-UI kaikki toimitettu ja idle 20:4x–20:48. Fable ilmoitettu. Build 16:n polku jatkaa. Kiintiö nollautuu 22:30 EEST.

**AJASTETTU (Fable 21:2x, korvaa aiemman): klo 22:31** lähetä "kiintiö nollautui, jatka luovutuksesi jonosta" Natiivisepälle (local_bf20055b-d582-4812-ba2b-b59c37a5e7b8; profilointi + lennon esilataus), Linssisepälle (local_45a869de-4d6b-4ed6-a6c9-30fd8442587e), Sisältökirjurille (local_256f6a15-b806-4259-97bd-b2ba8d342f86), Natiivi-UI:lle (local_33ba1387-d688-4e44-8e05-10951e61efc0) ja Pelikoodarille (local_97810d35-a79c-484b-8573-660a4c40eaa6), ja ilmoita Fablelle. GLO-30 ja käännösjuna eivät kuluta kiintiötä.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22, omistajalle ilmoitettu pushilla. Aiempi: build 15 (1.0.15, 202609251449, proto 4a813e60).
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **5 h -KIINTIÖ 100 % + EXTRAUSAGE KÄYTÖSSÄ (ilmoitettu Fablelle 21:25):** extraUsage.enabled = true, kulunut 7,74 € / 13 € kuukausiraja (59 %). Aiemmin pois päältä. Nollautuu 22:30 EEST (1 h 4 min). **Viikko (kaikki mallit):** 53 %. **Viikko (Fable):** 21 %.
- **Paikallinen levy:** 144 Gt vapaana (hälytysraja 60 Gt). **NAS:** 5,6 Ti vapaana (raja 500 Gt). **wt/-worktreet:** 37 kpl. **Swap:** 0 Gt.
- **GLO-30-nouto:** aws-virtoja 24, en0 sisään 33 Mt/s, seurantarivi 20:58 (26 min, ok), NAS-kansio 466 Gt. Ei hälytystä. Arvio valmis ~22.
- **Simulaattorit boottina:** 0. coreaudiod 2 %. **Chrome-GPU-prosesseja:** 0.
- **Konteksti:** Laitetestaaja 53 %, Natiiviseppä 51 %, Julkaisija 49 %, Fable 41 %, Pelikoodari 34 %. Ei ylityksiä.
- **Juna:** viimeisin KÄÄNNETTY 20:58 (7f3979b0), ei odottavaa.
- **Postilaatikko:** ei uutta (kärki 82c5c1d7f). **Avoimia PR:iä:** 9.
