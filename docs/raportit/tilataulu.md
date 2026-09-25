# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 23:17 EEST

## 1) Sessiot

Kaikki roolisessiot luotu uudelleen 25.9. ~12.5x (uudet id:t). Konteksti-ikkuna nyt 1 M, prosentit sen mukaan.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_593b89a1-2514-4d74-b956-2a73db862382 | 47% | running | — |
| Julkaisija | local_22b29f10-7af8-43fc-a974-1d666f716c97 | 51% | running | — |
| Natiiviseppä | local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 (kansio Matkakirja-3d-selvittaja) | 58% | running | Nollattu ja palannut käyntiin |
| Natiivi-UI | local_33ba1387-d688-4e44-8e05-10951e61efc0 | 41% | idle (lepokäsky) | Nollattu ja jo uudelleenkäynnistetty (huomattu vasta jälkikäteen, 18.23–18.35 välillä) |
| Linssiseppä | local_45a869de-4d6b-4ed6-a6c9-30fd8442587e | nollattu | idle, RC pois | Nollattu 23:15; ilmoitettu Fablelle, odottaa aloitusviestiä + RC:tä |
| Sisältökirjuri | local_256f6a15-b806-4259-97bd-b2ba8d342f86 | 27% | running | Nollattu ja palannut käyntiin |
| Laitetestaaja | local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 | 55% | idle | PR #3153 (savukierros B13) |
| Siirtoseppä | local_b50bb32e-18e2-47c5-a597-8a18d56874e1 | 38% | idle | PR #3155 |
| Pelikoodari | local_97810d35-a79c-484b-8573-660a4c40eaa6 | 41% | running | Nollattu ja palannut käyntiin |
| Karttaseppä | local_37708e68-5a58-45ca-8dee-c13620993531 | 35% | running | Nollattu ja palannut käyntiin (8 %) |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d (vanha; uusi id: get_usage "self") | 8% | running | (tämä taulu) |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia kortteja.

**LÄMPÖERÄ build 16:een (omistajan päätös 18.2x):** Pelikoodari — dynaaminen ruudunpäivitys + lepopiirto + thermalState; Natiiviseppä — HDR/varjot/anturi; Laitetestaaja — 10 min lämpö- ja akkumittaus laitteella ennen/jälkeen.

**LEPOKÄSKY LÄHETETTY 20:40 (5 h -kiintiö 95 %):** Sisältökirjuri, Linssiseppä ja Natiivi-UI kaikki toimitettu ja idle 20:4x–20:48. Fable ilmoitettu. Build 16:n polku jatkaa. Kiintiö nollautuu 22:30 EEST.

**HERÄTYKSET LÄHETETTY 22:32:** "kiintiö nollautui, jatka luovutuksesi jonosta" → Natiiviseppä, Sisältökirjuri, Natiivi-UI, Pelikoodari (toimitettu), Linssiseppä (jonossa). Fable ilmoitettu. **GLO-30 VALMIS 22:10, eheys OK** (Karttaseppä tarkistaa). Fable hoitaa extraUsagen (7,74 €/13 €) omistajalle; extraUsage nyt pois päältä. Hälytä Fablelle jos extraUsage uudelleen käytössä ja ≥11 €.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22, omistajalle ilmoitettu pushilla. Aiempi: build 15 (1.0.15, 202609251449, proto 4a813e60).
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **5 h -kiintiö:** 28 % (raja 00:30 EEST, 4 h 13 min). extraUsage pois päältä. **Viikko (kaikki mallit):** 60 %. **Viikko (Fable):** 23 %.
- **Paikallinen levy:** 137 Gt vapaana (hälytysraja 60 Gt). **NAS:** 5,6 Ti vapaana (raja 500 Gt). **wt/-worktreet:** 41 kpl. **Swap:** 0 Gt.
- **Simulaattorit boottina:** 0. coreaudiod 2 %. **Chrome-GPU-prosesseja:** 0.
- **Konteksti:** Linssiseppä NOLLATTU 23:15 (ilmoitettu Fablelle). Natiiviseppä 58 %, Laitetestaaja 55 %, Julkaisija 51 %, Fable 47 %, Pelikoodari 41 %, Natiivi-UI 41 %, Siirtoseppä 38 %, Karttaseppä 35 %, Sisältökirjuri 27 %.
- **Juna:** viimeisin KÄÄNNETTY 21:36 (7290562b), juna/b13 ac0aaadc ennallaan, ei odottavaa.
- **Postilaatikko:** uusi commit 7bfab9b6e (Sisältökirjuri → Codex, värikorjaus erä 2 vastaanotettu, PR #3255), ilmoitettu Fablelle. **Avoimia PR:iä:** 12.
