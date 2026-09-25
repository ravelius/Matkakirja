# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 19:53 EEST

## 1) Sessiot

Kaikki roolisessiot luotu uudelleen 25.9. ~12.5x (uudet id:t). Konteksti-ikkuna nyt 1 M, prosentit sen mukaan.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_593b89a1-2514-4d74-b956-2a73db862382 | 34% | running | — |
| Julkaisija | local_22b29f10-7af8-43fc-a974-1d666f716c97 | 45% | running | — |
| Natiiviseppä | local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 (kansio Matkakirja-3d-selvittaja) | 37% | running | Nollattu ja palannut käyntiin |
| Natiivi-UI | local_33ba1387-d688-4e44-8e05-10951e61efc0 | 23% | idle | Nollattu ja jo uudelleenkäynnistetty (huomattu vasta jälkikäteen, 18.23–18.35 välillä) |
| Linssiseppä | local_45a869de-4d6b-4ed6-a6c9-30fd8442587e | 16% | running | Nollattu ja palannut käyntiin |
| Sisältökirjuri | local_256f6a15-b806-4259-97bd-b2ba8d342f86 | 10% | running | Nollattu ja palannut käyntiin |
| Laitetestaaja | local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 | 42% | idle | PR #3153 (savukierros B13) |
| Siirtoseppä | local_b50bb32e-18e2-47c5-a597-8a18d56874e1 | 31% | idle | PR #3155 |
| Pelikoodari | local_97810d35-a79c-484b-8573-660a4c40eaa6 | 18% | running | Nollattu ja palannut käyntiin |
| Karttaseppä | local_37708e68-5a58-45ca-8dee-c13620993531 | 8% | running | Nollattu ja palannut käyntiin (8 %) |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d (vanha; uusi id: get_usage "self") | 8% | running | (tämä taulu) |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia kortteja.

**LÄMPÖERÄ build 16:een (omistajan päätös 18.2x):** Pelikoodari — dynaaminen ruudunpäivitys + lepopiirto + thermalState; Natiiviseppä — HDR/varjot/anturi; Laitetestaaja — 10 min lämpö- ja akkumittaus laitteella ennen/jälkeen.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **15** (1.0.15, 202609251449, proto 4a813e60, ajo 36149871805, laskuri 15) — TestFlightissa, omistajalle ilmoitettu 17:58.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`. Seuraava: build 16 -juna (juna/b13 jatkuu, tapahtumaohjattu).

## 5) Resurssit

- **PAIKALLINEN LEVY LASKEE (ilmoitettu Fablelle 19:55):** 171 Gt (19:08) → 160 (19:29) → 161 (19:41) → 148 Gt (19:53), 84 % täynnä; raja 35 Gt (~1,5 h nykyvauhdilla). Isot kansiot: ~/Library/Developer 92 Gt (simulaattorit + DerivedData), proto-3d 67 Gt, /private/tmp 15 Gt, wt 12 Gt. GLO-30 ei syyllinen (kirjoittaa NAS:iin). Seurataan.
- **NAS:** 5,6 Ti vapaana (raja 500 Gt). **wt/-worktreet:** 33 kpl. **Swap:** 0 Gt.
- **GLO-30-nouto:** 24 aws-virtaa, en0 sisään 41 Mt/s (raja Fablen ohjeen mukaan 15 Mt/s kahdella kierroksella tai virtoja <20), NAS-kansio 297 Gt (19:41: 275 Gt, ~1,9 Gt/min) → valmis ~22. Seurantarivi 19:24 (29 min, päivittyy 30 min välein; hälytys jos >40 min eli 20:04).
- **Simulaattorit boottina:** 2 (pariteetti-iPhone, iPhone 17). coreaudiod 9 %. **Chrome-GPU-prosesseja:** 2.
- **5 h -kiintiö:** 78 % (nollautuu 22:30 EEST). **Viikko (kaikki mallit):** 47 %. **Viikko (Fable):** 19 %.
- **Konteksti:** Karttaseppä nollattu → 8 %. Julkaisija 45 %, Laitetestaaja 42 %, Natiiviseppä 37 %, Fable 34 %, Pelikoodari 18 %.
- **Juna:** viimeisin KÄÄNNETTY 19:21; juna/b13 cb00ed9a uusi 19:47, alle 25 min.
- **Postilaatikko:** ei uutta (kärki 82c5c1d7f). **Avoimia PR:iä:** 12.
