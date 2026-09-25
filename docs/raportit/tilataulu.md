# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 15:59 EEST

## 1) Sessiot

Kaikki roolisessiot luotu uudelleen 25.9. ~12.5x (uudet id:t). Konteksti-ikkuna nyt 1 M, prosentit sen mukaan.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_593b89a1-2514-4d74-b956-2a73db862382 | 56% | running | — |
| Julkaisija | local_22b29f10-7af8-43fc-a974-1d666f716c97 | 26% | running | — |
| Natiiviseppä | local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 (kansio Matkakirja-3d-selvittaja) | 65% | idle | Lähestyy 70 %, seurataan |
| Natiivi-UI | local_33ba1387-d688-4e44-8e05-10951e61efc0 | 37% | idle | Nollattu 15.22, palasi 16 % 15.29 |
| Linssiseppä | local_45a869de-4d6b-4ed6-a6c9-30fd8442587e | 35% | idle | — |
| Sisältökirjuri | local_256f6a15-b806-4259-97bd-b2ba8d342f86 | 46% | idle | PR #3154 |
| Laitetestaaja | local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 | 16% | idle | PR #3153 (savukierros B13) |
| Siirtoseppä | local_b50bb32e-18e2-47c5-a597-8a18d56874e1 | 28% | idle | PR #3155 |
| Pelikoodari | local_97810d35-a79c-484b-8573-660a4c40eaa6 | 19% | running | Nollattu ja uudelleenkäynnistetty (99d0451a0) |
| Karttaseppä | local_37708e68-5a58-45ca-8dee-c13620993531 | 45% | running | — |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d (vanha; uusi id: get_usage "self") | 8% | running | (tämä taulu) |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia kortteja tiedossa juuri nyt.

**HYVÄ UUTINEN — sivutus RATKENNUT kokonaan:** vm.swapusage on nyt 0 Gt (oli huipussaan 22,8 Gt). Todennäköisesti koneen uudelleenkäynnistyksen myötä (huomattu myös oma sessio ja muut roolit nollautuneina/uudelleenkäynnistyneinä n. klo 11-12 välillä). Ilmoitettu Fablelle tuntiraporttina — ei enää seurattavaa.

**Viikkokiintiö (kaikki mallit) 97%** — hyvin lähellä 100 %. Ilmoitettu Fablelle, ei vielä sovittua hälytysrajaa tälle.

**Karttaseppä ylitti 70%** — ilmoitettu Fablelle.

**Varmuuskopio-tarkistus:** varmuuskopio-VIKA.txt tyhjä. Käännösjuna kunnossa (viimeisin onnistunut asennus 11:23, alle 2h).

**Junasääntö (Fable 04:1x):** ei havaintoja 30 min -käännösviiveestä eikä sisältöjonon 4-PR/4h-ehdon täyttymisestä ilman junaa.

**Postilaatikko:** viimeisin commit 7755d9c5a "Posti: kuittaa kahden kaupungin galleriakytkentä PR:ssä" — muuttumaton.

**REBOOT-TARKISTUS (Fable-pyyntö, kone käynnistyi uudelleen ~11:3x):** launchd-agentit fi.matkakirja.juna, juna-vahti, siivous, app.matkakirja.natiivi-bundle kaikki ladattu ja toiminnassa (state "not running" normaalia StartInterval-ajolle, juna.log vahvistaa aktiivisuuden 12:00 asti). varmuuskopio-VIKA.txt tyhjä. Simulaattorit laskeneet takaisin 4→2 (natiiviseppa-iPhone, iPhone 17) — hyvin alle 4:n rajan.

**TILINVAIHTO (omistaja 12:1x):** kaikki sessiot pysäytetään. Luovutus kirjoitettu docs/raportit/viesti-postivahti-luovutus-20260925.md, aloitusviesti päivitetty viesti-postivahti-aloitus.md. Ei clear_session-kutsua.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **Levy:** 185 Gt vapaana (raja 35 Gt). **wt/-worktreet:** 31 kpl. **Swap:** 0 Gt.
- **Simulaattorit boottina:** 1 (natiiviseppa-iPhone). coreaudiod 1 %. **Chrome-GPU-prosesseja:** 0.
- **5 h -kiintiö:** 67 % — EI vielä nollautunut, nollautuu klo 17:30 EEST (14:30 UTC; korjattu aiempi kellonaikavirhe). **Viikko (kaikki mallit):** 18 %. **Viikko (Fable):** 8 %.
- **Konteksti:** Natiiviseppä 65 % (raja 70, seurataan, ilmoitettu Fablelle), Fable 56 %.
- **Juna:** viimeisin KÄÄNNETTY 15:39 (43579f98); juna/b13 2a6d34f3 uusi 15:47, alle 25 min.
- **Postilaatikko:** ei uutta (kärki 8c2944063). **Avoimia PR:iä:** 11.
