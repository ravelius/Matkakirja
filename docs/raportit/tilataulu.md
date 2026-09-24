# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-24 22:38 EEST

## 1) Sessiot

| Rooli | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|
| Fable | Fable 5.1 | 35% | busy | (koordinoi tilataulua) | — |
| Julkaisija | Opus, high | 25% | **AVOIN KORTTI** | Build 11 viety TestFlightiin (ajo 36042445620) | Omistajan vastaus avoimeen AskUserQuestion-korttiin |
| Natiiviseppä | Opus | 41% | idle | — | Unity vapaa |
| Natiivi-UI | Opus | 47% | idle | `natiivi-ui/tyyppikuvake` 79a49af + `natiivi-ui/intro-palstat` 993437c, molemmat 0 virhettä | Yhteinen testikäännös |
| Linssiseppä | Opus | 67% | idle | Radiouudistuksen topografiavariantit A/B, PR #3122 — omistaja valitsi A:n | Toteutus (build 12) |
| Sisältökirjuri | Sonnet | 54% | idle | — | — |
| Laitetestaaja | Sonnet | 68% | idle | — | Pelikoodarin pariteettiajo simuloilla |
| Siirtoseppä | Opus | 27% | idle | — | PR #3114 Julkaisijan ajettavana |
| Pelikoodari | Opus | 53% | busy | — | — |
| Karttaseppä | Opus | 44% | idle | — | E28-ajo käynnissä |
| Postivahti (self) | Sonnet | 52% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle

**Julkaisijalla avoin AskUserQuestion-kortti** (kesto tuntematon, sisältö ei näy list_eventsillä — tarkista suoraan sessiosta). Muilla ei tiedossa olevia jumeja. JUMI → KORTTI -sääntö (24.9. klo 21.2x) välitetty kaikille rooleille.

**Fablen viimeisin päätös:** Julkaisijan mallinvaihto Sonnetiin PERUTTU (omistaja klo 22.3x: pysyy Opuksella).

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako otsikon perusteella, ei virallinen luokitus):
- **Sisältö** (kohdekartat, galleria/ennenNyt, lisenssit, julisteet): ~21
- **Toiminto** (koodi/tekniikka: aluenimet, laattapoltto, radiouudistus, natiivi-muutosloki): ~10
- **Luonnos/raportti** (inventaariot, luovutukset, ehdotukset): ~9

Julkaisijan seuraava juna: seuraavaksi Natiivi-UI:n testikäännös, sitten build 12 (radiolinssi).

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- Unity vapaa.
- Seuraava testikäännös: Natiivi-UI:n `tyyppikuvake` + `intro-palstat`.

## 5) Resurssit

- **Levy** (/System/Volumes/Data): **HÄLYTYS — 29 Gt vapaana (alle 35 Gt rajan)**, ilmoitettu Fablelle.
- **wt/-worktreet:** 24 kpl. Linssiseppä ja Natiivi-UI korjattu alle 3:n; muut rajoissa.
- **5 h -kiintiö:** 42%, nollautuu klo 21:20 EEST (raja 95%/98%, tauko vasta 98%:ssa).
- **Viikkokiintiö (kaikki mallit):** 61%. **Viikkokiintiö (Fable):** 38%. Nollautuu 2026-09-28 klo 01:00.

## 6) Kellonaika

2026-09-24 22:38 EEST (`date`-komennolla varmennettu)
