# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-24 22:23 EEST

## 1) Sessiot

| Rooli | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|
| Fable | Fable 5.1 | 32% | busy | (koordinoi tilataulua) | — |
| Julkaisija | Opus, high | 25% | idle | Build 11 -vienti käynnissä (36034131150) | Unity-vaiheen valmistuminen |
| Natiiviseppä | Opus | 38% | busy | — | Unity kiinni build 11:n ajan |
| Natiivi-UI | Opus | 47% | idle | `natiivi-ui/tyyppikuvake` 79a49af + `natiivi-ui/intro-palstat` 993437c, molemmat 0 virhettä Unity-tarkistuksessa | Yhteinen testikäännös (build 11 jälkeen) |
| Linssiseppä | Opus | 64% | idle | Radiouudistuksen topografiavariantit A/B, PR #3122 (vain kuvat) | Omistajan valinta A vai B |
| Sisältökirjuri | Sonnet | 49% | busy | — | (siivoustyö käynnissä) |
| Laitetestaaja | Sonnet | 68% | idle | — | Pelikoodarin pariteettiajo simuloilla |
| Siirtoseppä | Opus | 27% | idle | — | PR #3114 Julkaisijan ajettavana |
| Pelikoodari | Opus | 51% | busy | — | — |
| Karttaseppä | Opus | 43% | idle | — | E28-ajo käynnistyy klo 22 |
| Postivahti (self) | Sonnet | 48% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle

Ei tiedossa olevia jumeja tai avoimia AskUserQuestion-kortteja tällä hetkellä. JUMI → KORTTI -sääntö (24.9. klo 21.2x) välitetty kaikille rooleille — kuitattu Siirtosepältä ja Karttasepältä.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako otsikon perusteella, ei virallinen luokitus):
- **Sisältö** (kohdekartat, galleria/ennenNyt, lisenssit, julisteet): ~21
- **Toiminto** (koodi/tekniikka: aluenimet, laattapoltto, radiouudistus, natiivi-muutosloki): ~10
- **Luonnos/raportti** (inventaariot, luovutukset, ehdotukset): ~9

Julkaisijan seuraava juna: build 11 -vienti käynnissä (Unity -nographics, proto-master 1c8cdab, versio 1.0.11).

## 4) TestFlight

- Viimeisin build: **10** (1.0.0, 202609241607, sisäisessä ryhmässä).
- Käynnissä: **build 11** (36034131150, versio 1.0.11) — Unity kiinni Natiivisepällä, ei pushata proto-masteriin ennen "vienti valmis".
- Seuraava testikäännös: Natiivi-UI:n `tyyppikuvake` + `intro-palstat` (build 11 jälkeen).

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 36 Gt vapaana (laskussa — Fablen raja: ilmoita jos >60 Gt tai <15 Gt).
- **wt/-worktreet:** 25 kpl (Raamattu-sääntö: max 3 erä-worktreetä/rooli).
- **5 h -kiintiö:** 38%, nollautuu klo 21:20 EEST (raja 95%/98%, tauko vasta 98%:ssa).
- **Viikkokiintiö (kaikki mallit):** 60%. **Viikkokiintiö (Fable):** 37%. Nollautuu 2026-09-28 klo 01:00.

## 6) Kellonaika

2026-09-24 22:23 EEST (`date`-komennolla varmennettu)
