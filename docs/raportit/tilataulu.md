# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-24 23:32 EEST

## 1) Sessiot

| Rooli | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|
| Fable | Fable 5.1 | 46% | busy | (koordinoi tilataulua) | — |
| Julkaisija | Opus, high | 29% | idle | Sisältöjuna ajaa testejä | #2913 junan jälkeen |
| Natiiviseppä | Opus | 47% | idle | — | — |
| Natiivi-UI | Opus | 49% | idle | `natiivi-ui/tyyppikuvake` + `natiivi-ui/intro-palstat` | Testikäännös käännöspalvelulla |
| Linssiseppä | Opus | 68% | idle | Radiouudistuksen topografiavariantti A hyväksytty | Toteutus (build 12) |
| Sisältökirjuri | Sonnet | 69% | idle | — | — |
| Laitetestaaja | Sonnet | 20% | busy | (nollattu edellisellä kierroksella) | — |
| Siirtoseppä | Opus | 27% | idle | — | PR #2913 junan jälkeen |
| Pelikoodari | Opus | 63% | idle | — | — |
| Karttaseppä | Opus | 47% | idle | — | E28-ajo |
| Postivahti (self) | Sonnet | 60% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia kortteja. JUMI → KORTTI -sääntö sekä PushNotification-vaatimus (kortin avauksesta heti push omistajalle) välitetty kaikille rooleille.

**Fablen viimeisin päätös:** Käännöspalvelu käytössä (`proto-3d/tyokalut/proto-kaanna.sh`), testikäännöksiä ei enää pyydetä Natiivisepältä. Build 12 -suunnitelma valmisteilla (docs/raportit/build-12-suunnitelma.md, integraatiohaara juna/b12).

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako otsikon perusteella, ei virallinen luokitus):
- **Sisältö** (kohdekartat, galleria/ennenNyt, lisenssit, julisteet): ~21
- **Toiminto** (koodi/tekniikka: aluenimet, laattapoltto, radiouudistus, natiivi-muutosloki): ~10
- **Luonnos/raportti** (inventaariot, luovutukset, ehdotukset): ~9

Julkaisijan seuraava juna: sisältöjuna ajaa testejä, sen jälkeen #2913; TestFlight jatkossa käännöskopiosta (#3124 mainissa).

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.
- Seuraava testikäännös: Natiivi-UI:n `tyyppikuvake` + `intro-palstat` (käännöspalvelulla).

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 76 Gt vapaana. Omistaja siirtää Codexin dataa NAS:iin (kuvaputki tauolla) — postilaatikon Codex-toimituksia ei odoteta siirron aikana. Seurataan: ilmoitus jos nousee selvästi (>150 Gt) tai laskee alle 30 Gt.
- **wt/-worktreet:** 25 kpl. Rajoissa lähes kaikilla rooleilla.
- **5 h -kiintiö:** 57%, nollautuu klo 21:20 EEST — LÄHELLÄ NOLLAUTUMISTA (raja 95%/98%, tauko vasta 98%:ssa).
- **Viikkokiintiö (kaikki mallit):** 65%. **Viikkokiintiö (Fable):** 40%. Nollautuu 2026-09-28 klo 01:00.

## 6) Kellonaika

2026-09-24 23:32 EEST (`date`-komennolla varmennettu)
