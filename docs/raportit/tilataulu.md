# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-24 23:53 EEST

## 1) Sessiot

| Rooli | Session id | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|---|
| Fable | local_742d1717-d642-426a-840b-c5c0e75578bf | Fable 5.1 | 47% | busy | (koordinoi tilataulua) | — |
| Julkaisija | local_9922c4b6-320f-4074-aed4-f2811a7c9640 | Opus, high | 0% (juuri nollattu) | busy | Nollattu — luovutus PR #3127 (build 11, sisältöjuna, käännöskopio) | Mergeä #3127, sitten Sisältökirjurin katalogi-PR |
| Natiiviseppä | local_860f922b-94b8-49da-975d-4233a993bbb8 | Opus | 48% | idle | — | — |
| Natiivi-UI | local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 | Opus | 49% | idle | `natiivi-ui/tyyppikuvake` + `natiivi-ui/intro-palstat` | Testikäännös käännöspalvelulla |
| Linssiseppä | local_3273f209-099d-4ed3-830e-e4e1b40bcc7d | Opus | 68% | idle | Radiouudistuksen topografiavariantti A hyväksytty | Toteutus (build 12) |
| Sisältökirjuri | local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f | Sonnet | 70% | idle | — | Linssikatalogi-PR (Pelikoodarin tarkistuksessa) |
| Laitetestaaja | local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 | Sonnet | 26% | busy | — | — |
| Siirtoseppä | local_7a1255c5-d525-4323-9438-70e7379ad2fe | Opus | 27% | idle | PR #2913 mergetty | — |
| Pelikoodari | local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 | Opus | 63% | idle | — | — |
| Karttaseppä | local_445a5c7b-4317-4989-b65d-4cb81bd10056 | Opus | 47% | idle | — | E28-ajo |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d | Sonnet | 62% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle

Ei avoimia kortteja. JUMI → KORTTI -sääntö, PushNotification-vaatimus ja uusi VIESTIRAJA JA VARAKANAVAT -sääntö (SendMessage ~10/vuoro → session id -reitti → posti-tiedosto) välitetty kaikille rooleille.

**Fablen viimeisin päätös:** Julkaisija nollattu (ei erillistä uutta aloitusviestiä missään haarassa — Postivahti kokosi sen luovutuksesta + Fablen ohjeista). Malli pysyy Opuksella. Käännöspalvelu käytössä (`proto-3d/tyokalut/proto-kaanna.sh`). Build 12 -suunnitelma valmisteilla (docs/raportit/build-12-suunnitelma.md, integraatiohaara juna/b12).

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako otsikon perusteella, ei virallinen luokitus):
- **Sisältö** (kohdekartat, galleria/ennenNyt, lisenssit, julisteet): ~21
- **Toiminto** (koodi/tekniikka: aluenimet, laattapoltto, radiouudistus, natiivi-muutosloki): ~10
- **Luonnos/raportti** (inventaariot, luovutukset, ehdotukset): ~9

Julkaisijan seuraava juna: mergeä #3127, sitten Sisältökirjurin katalogi-PR; sisältöjunat jatkossa klo 10 ja 20 (`juna.sh`). TestFlight jatkossa käännöskopiosta (#3124 mainissa). BUILD-sana → automaattinen TestFlight-ajo ilman Fablen erillistä käskyä.

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.
- Seuraava testikäännös: Natiivi-UI:n `tyyppikuvake` + `intro-palstat` (käännöspalvelulla).

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 86 Gt vapaana. Omistaja siirtää Codexin dataa NAS:iin (kuvaputki tauolla) — postilaatikon Codex-toimituksia ei odoteta siirron aikana. Seurataan: ilmoitus jos nousee selvästi (>150 Gt) tai laskee alle 30 Gt.
- **wt/-worktreet:** 25 kpl. Rajoissa lähes kaikilla rooleilla.
- **5 h -kiintiö:** 60%, nollautuu klo 21:20 EEST (raja 95%/98%, tauko vasta 98%:ssa).
- **Viikkokiintiö (kaikki mallit):** 66%. **Viikkokiintiö (Fable):** 40%. Nollautuu 2026-09-28 klo 01:00.

## 6) Kellonaika

2026-09-24 23:53 EEST (`date`-komennolla varmennettu)
