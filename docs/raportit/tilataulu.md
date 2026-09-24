# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-24 22:36 EEST

## 1) Sessiot

| Rooli | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|
| Fable | Fable 5.1 | 32% | busy | (koordinoi tilataulua) | — |
| Julkaisija | Opus, high | 25% | **AVOIN KORTTI** | Build 11 vienyt TestFlightiin, ajo 36042445620 valmis | Omistajan vastaus avoimeen AskUserQuestion-korttiin |
| Natiiviseppä | Opus | 38% | busy | — | Unity vapaa (Julkaisija ilmoittanut) |
| Natiivi-UI | Opus | 47% | idle | `natiivi-ui/tyyppikuvake` 79a49af + `natiivi-ui/intro-palstat` 993437c, molemmat 0 virhettä Unity-tarkistuksessa | Yhteinen testikäännös (build 11 jälkeen) |
| Linssiseppä | Opus | 64% | idle | Radiouudistuksen topografiavariantit A/B, PR #3122 (vain kuvat) | — omistaja valitsi A:n klo 22.3x |
| Sisältökirjuri | Sonnet | 49% | busy | — | (siivoustyö käynnissä) |
| Laitetestaaja | Sonnet | 68% | idle | — | Pelikoodarin pariteettiajo simuloilla |
| Siirtoseppä | Opus | 27% | idle | — | PR #3114 Julkaisijan ajettavana |
| Pelikoodari | Opus | 51% | busy | — | — |
| Karttaseppä | Opus | 43% | idle | — | E28-ajo käynnistyy klo 22 |
| Postivahti (self) | Sonnet | 48% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle

**Julkaisijalla avoin AskUserQuestion-kortti juuri nyt** (sisältö ei näy list_eventsillä — tarkista suoraan sessiosta). Muilla ei tiedossa olevia jumeja. JUMI → KORTTI -sääntö (24.9. klo 21.2x) välitetty kaikille rooleille — kuitattu Siirtosepältä ja Karttasepältä.

**Fablen viimeisin päätös:** Julkaisijan mallinvaihto Sonnetiin PERUTTU (omistaja klo 22.3x: tokeneita riittää, Julkaisija pysyy Opuksella kunnes käännöspalvelu ja build-juna valmiit).

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako otsikon perusteella, ei virallinen luokitus):
- **Sisältö** (kohdekartat, galleria/ennenNyt, lisenssit, julisteet): ~21
- **Toiminto** (koodi/tekniikka: aluenimet, laattapoltto, radiouudistus, natiivi-muutosloki): ~10
- **Luonnos/raportti** (inventaariot, luovutukset, ehdotukset): ~9

Julkaisijan seuraava juna: build 11 viety TestFlightiin, seuraavaksi Natiivi-UI:n testikäännös.

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620, klo 21.5x) — JO TestFlightissa. (Ajo 36034131150 peruttiin.)
- Unity vapaa (Natiivisepälle ilmoitettu).
- Seuraava testikäännös: Natiivi-UI:n `tyyppikuvake` + `intro-palstat`.

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 39 Gt vapaana, lähellä 35 Gt rajaa — Linssiseppä ja Natiivi-UI (molemmat 4 worktreetä) pyydetty siivoamaan heti.
- **wt/-worktreet:** 25 kpl (Raamattu-sääntö: max 3 erä-worktreetä/rooli — Linssiseppä ja Natiivi-UI yli rajan).
- **5 h -kiintiö:** 38%, nollautuu klo 21:20 EEST (raja 95%/98%, tauko vasta 98%:ssa).
- **Viikkokiintiö (kaikki mallit):** 60%. **Viikkokiintiö (Fable):** 37%. Nollautuu 2026-09-28 klo 01:00.

## 6) Kellonaika

2026-09-24 22:36 EEST (`date`-komennolla varmennettu)
