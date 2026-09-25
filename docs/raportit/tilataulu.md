# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 18:35 EEST

## 1) Sessiot

Kaikki roolisessiot luotu uudelleen 25.9. ~12.5x (uudet id:t). Konteksti-ikkuna nyt 1 M, prosentit sen mukaan.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_593b89a1-2514-4d74-b956-2a73db862382 | 23% | running | — |
| Julkaisija | local_22b29f10-7af8-43fc-a974-1d666f716c97 | 39% | running | — |
| Natiiviseppä | local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 (kansio Matkakirja-3d-selvittaja) | 61% | running | Sai aloitusviestin, aktiivinen 16:21 |
| Natiivi-UI | local_33ba1387-d688-4e44-8e05-10951e61efc0 | 17% | idle | Nollattu ja jo uudelleenkäynnistetty (huomattu vasta jälkikäteen, 18.23–18.35 välillä) |
| Linssiseppä | local_45a869de-4d6b-4ed6-a6c9-30fd8442587e | 39% | idle | — |
| Sisältökirjuri | local_256f6a15-b806-4259-97bd-b2ba8d342f86 | 52% | idle | PR #3154 |
| Laitetestaaja | local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 | 24% | idle | PR #3153 (savukierros B13) |
| Siirtoseppä | local_b50bb32e-18e2-47c5-a597-8a18d56874e1 | 30% | idle | PR #3155 |
| Pelikoodari | local_97810d35-a79c-484b-8573-660a4c40eaa6 | 56% | running | Nollattu ja uudelleenkäynnistetty (99d0451a0) |
| Karttaseppä | local_37708e68-5a58-45ca-8dee-c13620993531 | 55% | running | — |
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

- **Paikallinen levy:** 170 Gt vapaana (raja 35 Gt). **NAS:** 5,6 Ti vapaana (raja 500 Gt). **wt/-worktreet:** 34 kpl. **Swap:** 0 Gt.
- **Simulaattorit boottina:** 0. coreaudiod 2 %. **Chrome-GPU-prosesseja:** 0.
- **5 h -kiintiö:** 29 % (nollautuu 22:30 EEST). **Viikko (kaikki mallit):** 34 %. **Viikko (Fable):** 15 %.
- **Konteksti:** Natiivi-UI nollattu ja jo palannut 17 % (ohitettiin väliaikatarkistus, ei erillistä "nollattu"-ilmoitusta tarvittu). Fable 23 %.
- **Juna:** viimeisin KÄÄNNETTY 18:27 (eebb08f4), ei odottavaa.
- **Postilaatikko:** ei uutta (kärki 82c5c1d7f). **Avoimia PR:iä:** 15.
