# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 04:25 EEST (YÖTILA — omistaja nukkuu, ei muistutuspusheja)

## 1) Sessiot

| Rooli | Session id | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|---|
| Fable | local_742d1717-d642-426a-840b-c5c0e75578bf | Fable 5.1 | 25% | idle | — | Junat nyt tapahtumaohjattuja (04.1x): käännös heti juna-commitista, sisältöjuna ≥4 vihreää PR tai vanhin >4h |
| Julkaisija | local_9922c4b6-320f-4074-aed4-f2811a7c9640 | Opus, high | 17% | busy | — | Kortti (04:1x) ratkennut — kutsuu taas Bashia normaalisti |
| Natiiviseppä | local_860f922b-94b8-49da-975d-4233a993bbb8 | Opus | 69% | idle | — | — |
| Natiivi-UI | local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 | Opus | 40% | idle | — | Testikäännös käännöspalvelulla |
| Linssiseppä | local_3273f209-099d-4ed3-830e-e4e1b40bcc7d | Opus | 29% | idle | — | Radiouudistus build 12 |
| Sisältökirjuri | local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f | Sonnet | 47% | idle | PR #3128 -korjaukset | — |
| Laitetestaaja | local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 | Sonnet | 58% | idle | — | — |
| Siirtoseppä | local_7a1255c5-d525-4323-9438-70e7379ad2fe | Opus | 32% | idle | — | — |
| Pelikoodari | local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 | Opus | 47% | idle | — | — |
| Karttaseppä | local_445a5c7b-4317-4989-b65d-4cb81bd10056 | Opus | 55% | idle | E28-pallolaatat viety ämpäriin | Peruspoltto 05:05 alkaen, kesto n. 6–7 h |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d | Sonnet | 13% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle (yön kooste)

Ei avoimia kortteja tiedossa juuri nyt — Julkaisijan 04:1x-kortti on ratkennut (sessio jälleen busy, kutsuu Bashia).

**UUSI SÄÄNTÖ (Fable 04:1x):** junat tapahtumaohjattuja — testikäännös heti uudesta juna-commitista (vahti tulossa Natiivisepältä), sisältöjuna kun ≥4 vihreää sisältö-PR:ää tai vanhin yli 4h. Postivahti ilmoittaa Fablelle jos juna-haarassa on >30 min vanha commit ilman käännöstä, tai sisältöjonon ehto täyttyy ilman käynnistynyttä junaa. Ei vielä havaintoja kummastakaan (seurataan jatkossa).

Aiemmat yön nollaukset (kaikki onnistuneet, ei jumeja): Julkaisija, Sisältökirjuri, Fable, Linssiseppä, Natiivi-UI.

**NAS-siirto valmis:** levy 84→166 Gt. **E28-pallolaatat valmiit** (199 708 laattaa, 1,5 Gt). Postilaatikko: "linssikatalogin 18 nykyisen linssin R2-toimitus" (hash 808ff9ca2, muuttumaton kahdella kierroksella).

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako otsikon perusteella, ei virallinen luokitus):
- **Sisältö** (kohdekartat, galleria/ennenNyt, lisenssit, julisteet): ~21
- **Toiminto** (koodi/tekniikka: aluenimet, laattapoltto, radiouudistus, natiivi-muutosloki): ~10
- **Luonnos/raportti** (inventaariot, luovutukset, ehdotukset): ~9

Julkaisijan seuraava juna: tapahtumaohjattu (ks. yllä uusi sääntö) — PR #3128 (linssikatalogi) kun testit valmiit ja Pelikoodari hyväksyy. BUILD-sana → automaattinen TestFlight-ajo.

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- **Yöajo klo 04:00** — tulos ei vielä varmistunut tilataulun tietojen mukaan; Julkaisija toimii taas normaalisti kortin ratkettua, seurataan lopputulosta seuraavalla kierroksella.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 160 Gt vapaana. Raja 35 Gt.
- **wt/-worktreet:** 30 kpl.
- **5 h -kiintiö:** 38%, nollautuu klo 02:20 UTC (05:20 EEST, n. 54 min päässä). Raja 95%/98%, tauko vasta 98%:ssa.
- **Viikkokiintiö (kaikki mallit):** 78%. **Viikkokiintiö (Fable):** 45%. Nollautuu 2026-09-28 klo 01:00.

## 6) Kellonaika

2026-09-25 04:25 EEST. Yön merkkipaalut: E28 VALMIS, Julkaisijan kortti ratkennut, TestFlight-yöajon 04:00 tulos vielä avoinna, Karttasepän poltto 05:05 alkaen (n. 6–7 h).
