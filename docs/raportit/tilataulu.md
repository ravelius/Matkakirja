# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 14:48 EEST

## 1) Sessiot

Kaikki roolisessiot luotu uudelleen 25.9. ~12.5x (uudet id:t). Konteksti-ikkuna nyt 1 M, prosentit sen mukaan.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_593b89a1-2514-4d74-b956-2a73db862382 | 47% | running | — |
| Julkaisija | local_22b29f10-7af8-43fc-a974-1d666f716c97 | 22% | running | — |
| Natiiviseppä | local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 (kansio Matkakirja-3d-selvittaja) | 38% | idle | — |
| Natiivi-UI | local_33ba1387-d688-4e44-8e05-10951e61efc0 | 58% | running | Lähestyy 70 %, seurataan |
| Linssiseppä | local_45a869de-4d6b-4ed6-a6c9-30fd8442587e | 28% | idle | — |
| Sisältökirjuri | local_256f6a15-b806-4259-97bd-b2ba8d342f86 | 42% | idle | PR #3154 |
| Laitetestaaja | local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 | 15% | idle | PR #3153 (savukierros B13) |
| Siirtoseppä | local_b50bb32e-18e2-47c5-a597-8a18d56874e1 | 16% | idle | PR #3155 |
| Pelikoodari | local_97810d35-a79c-484b-8573-660a4c40eaa6 | 46% | running | — |
| Karttaseppä | local_37708e68-5a58-45ca-8dee-c13620993531 | 31% | running | — |
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

- **Levy:** 201 Gt vapaana (raja 35 Gt). **wt/-worktreet:** 32 kpl. **Swap:** 0 Gt.
- **Simulaattorit boottina:** 2 (linssiseppa-iPhone, natiiviseppa-iPhone). coreaudiod 4 %. **Chrome-GPU-prosesseja:** 0.
- **5 h -kiintiö:** 39 % (nollautuu 14:30 UTC). **Viikko (kaikki mallit):** 11 %. **Viikko (Fable):** 6 %.
- **Konteksti:** Natiivi-UI 58 % (lähestyy 70 %, ilmoitettu Fablelle 14:44).
- **Juna:** viimeisin KÄÄNNETTY 14:16 (aeb1657f); vanhin käännöksetön ~19 min (0eaef772 / d9dc8136 14:36), alle 25 min; niputuksen 20 min yläraja lähettää käännöksen ~14:44.
- **Postilaatikko:** uusia commiteja c1a43b852 (Sisältökirjuri → Kuvaputki: 27 puuttuvaa miniatyyriä [kiireellinen] + Ateenan 6 leikattua karttanostokuvaa), ilmoitettu Fablelle. **Avoimia PR:iä:** 13.
