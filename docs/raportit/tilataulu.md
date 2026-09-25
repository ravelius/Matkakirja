# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-26 01:09 EEST

## 1) Sessiot

Kaikki roolisessiot luotu uudelleen 25.9. ~12.5x (uudet id:t). Konteksti-ikkuna nyt 1 M, prosentit sen mukaan.

| Rooli | Session id | Konteksti | Tila | Odottaa |
|---|---|---|---|---|
| Fable | local_593b89a1-2514-4d74-b956-2a73db862382 | 62% | running | — |
| Julkaisija | local_22b29f10-7af8-43fc-a974-1d666f716c97 | 56% | running | — |
| Natiiviseppä | local_bf20055b-d582-4812-ba2b-b59c37a5e7b8 (kansio Matkakirja-3d-selvittaja) | 69% | running | Nollattu ja palannut käyntiin |
| Natiivi-UI | local_33ba1387-d688-4e44-8e05-10951e61efc0 | 60% | idle (lepokäsky) | Nollattu ja jo uudelleenkäynnistetty (huomattu vasta jälkikäteen, 18.23–18.35 välillä) |
| Linssiseppä | local_45a869de-4d6b-4ed6-a6c9-30fd8442587e | 33% | running, RC päällä | Sai aloitusviestin ja RC kytketty 23.2x (Fable) |
| Sisältökirjuri | local_256f6a15-b806-4259-97bd-b2ba8d342f86 | 42% | running | Nollattu ja palannut käyntiin |
| Laitetestaaja | local_c22294e5-4f0f-46ce-b1d3-9d8f3da223b1 | 56% | idle | PR #3153 (savukierros B13) |
| Siirtoseppä | local_b50bb32e-18e2-47c5-a597-8a18d56874e1 | 50% | idle | PR #3155 |
| Pelikoodari | local_97810d35-a79c-484b-8573-660a4c40eaa6 | 58% | running | Nollattu ja palannut käyntiin |
| Karttaseppä | local_37708e68-5a58-45ca-8dee-c13620993531 | 48% | running | Nollattu ja palannut käyntiin (8 %) |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d (vanha; uusi id: get_usage "self") | 8% | running | (tämä taulu; 00.34: viikko 73 %, 5 h 77 %, swap 12,6 Gt (laskee), levy 143 Gt, 01.07: viikko 77 %, 5 h 92 %, swap 9,2 Gt, levy 147 Gt; juna: käännökset pid 94836 (juna/b13, 21 min) ja 30212 käynnissä, viimeisin KÄÄNNETTY yhä 21.36) |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia kortteja.

**LÄMPÖERÄ build 16:een (omistajan päätös 18.2x):** Pelikoodari — dynaaminen ruudunpäivitys + lepopiirto + thermalState; Natiiviseppä — HDR/varjot/anturi; Laitetestaaja — 10 min lämpö- ja akkumittaus laitteella ennen/jälkeen.

**LEPOKÄSKY LÄHETETTY 20:40 (5 h -kiintiö 95 %):** Sisältökirjuri, Linssiseppä ja Natiivi-UI kaikki toimitettu ja idle 20:4x–20:48. Fable ilmoitettu. Build 16:n polku jatkaa. Kiintiö nollautuu 22:30 EEST.

**HERÄTYKSET LÄHETETTY 22:32:** "kiintiö nollautui, jatka luovutuksesi jonosta" → Natiiviseppä, Sisältökirjuri, Natiivi-UI, Pelikoodari (toimitettu), Linssiseppä (jonossa). Fable ilmoitettu. **GLO-30 VALMIS 22:10, eheys OK** (Karttaseppä tarkistaa). Fable hoitaa extraUsagen (7,74 €/13 €) omistajalle; extraUsage nyt pois päältä. Hälytä Fablelle jos extraUsage uudelleen käytössä ja ≥11 €.

**SITOVA SÄÄNTÖ (Fable 25.9. klo 23.5x): omistajalle menevät videot ja kuvat** — rajataan laitteen ruutuun ilman tyhjää reunaa: pystyvideo pystynä (esim. 1170×2532 → korkeus 1600 px), iPad vaakana, ei 16:9-kangasta, ei letterboxia; kuvapari vierekkäin ilman marginaaleja; hidastus omana tiedostona. (Syy: omistaja ei saanut selvää 146-mallista, koska puhelimen ruutu oli pieni harmaan kankaan keskellä.) Lähetetty kaikille 9 roolille (paitsi Fable) klo 00.0x.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **16** (1.0.16, proto bf70290d / juna 1aa7c558, ajo 36172168911, laskuri 16) — TestFlightissa klo 21:22, omistajalle ilmoitettu pushilla. Aiempi: build 15 (1.0.15, 202609251449, proto 4a813e60).
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **5 h -kiintiö:** 65 % — nollautuu klo **03:30 EEST** (00:30 UTC; KORJAUS: aiemmat kirjaukset "00:30 EEST" olivat väärin, UTC-sekaannus). extraUsage pois päältä. **Viikko (kaikki mallit): 70 %** (saavutti 70 % 00:06, ilmoitettu Fablelle). **Viikko (Fable):** 26 %.
- **Levy:** 141 Gt vapaana (Fablen hälytysraja 80 Gt). **Swap:** 10,3 Gt / 11,3 Gt (hälytys >16 Gt). **NAS:** 5,6 Ti vapaana. **wt/-worktreet:** 34 kpl.
- **Simulaattorit boottina:** 0. coreaudiod 7 %. **Chrome-GPU-prosesseja:** 6 (CI:n savukkeita).
- **Konteksti:** Natiiviseppä 64 %, Linssiseppä 59 %, Laitetestaaja 56 %, Fable 55 %, Julkaisija 53 %, Pelikoodari 52 %, Natiivi-UI 52 %, Siirtoseppä 40 %, Karttaseppä 39 %, Sisältökirjuri 30 %. Ei ylityksiä.
- **Juna:** proto-kaanna.sh käynnissä (6 prosessia), yläraja laukesi 23:37 (erä työn alla 29 min); viimeisin KÄÄNNETTY 21:36. Ei hälytystä (prosessi elossa).
- **Postilaatikko:** ei uutta (kärki 78e5a333e). **Avoimia PR:iä:** 11.
