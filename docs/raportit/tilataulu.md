# Tilataulu

Päivittää Postivahti n. 10 min välein (haara `postivahti`). Ei käsin muokattava.

**Päivitetty:** 2026-09-25 10:15 EEST (YÖTILA — omistaja nukkuu, ei muistutuspusheja)

## 1) Sessiot

| Rooli | Session id | Malli | Konteksti | Tila | Viimeisin valmis erä | Odottaa |
|---|---|---|---|---|---|---|
| Fable | local_742d1717-d642-426a-840b-c5c0e75578bf | Fable 5.1 | 54% | idle | — | — |
| Julkaisija | local_9922c4b6-320f-4074-aed4-f2811a7c9640 | Opus, high | 28% | idle | — | — |
| Natiiviseppä | local_860f922b-94b8-49da-975d-4233a993bbb8 | Opus | 64% | idle | — | — |
| Natiivi-UI | local_9ed5a7df-5c9c-47e5-be64-bad4353b81b9 | Opus | 52% | idle | — | — |
| Linssiseppä | local_3273f209-099d-4ed3-830e-e4e1b40bcc7d | Opus | 57% | idle | — | — |
| Sisältökirjuri | local_e5685e4a-4ed7-41f4-96f0-5899ff6d8d7f | Sonnet | 57% | idle | — | — |
| Laitetestaaja | local_992b689f-357b-4ce1-a236-b69d1cfcb0d5 | Sonnet | 53% | idle | — | — |
| Siirtoseppä | local_7a1255c5-d525-4323-9438-70e7379ad2fe | Opus | 33% | idle | — | — |
| Pelikoodari | local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 | Opus | 48% | idle | — | — |
| Karttaseppä | local_445a5c7b-4317-4989-b65d-4cb81bd10056 | Opus | 67% | idle | — | Lähestyy 70%, seurataan |
| Postivahti (self) | local_6f3d4c35-be83-4985-82c7-8d641ad18f1d | Sonnet | 58% | busy | (tämä taulu) | — |

## 2) Jumit ja avoimet kortit omistajalle (yön kooste)

Ei avoimia kortteja tiedossa juuri nyt.

**Tuntiraportti sivutuksesta (10:13, ilmoitettu Fablelle):** tilanne EI parantunut — vm.swapusage 22,3→20,2→**22,8 Gt** (nousi takaisin). Simulaattorit 6→3→**8** boottina (uutta testiaktiviteettia käynnistynyt, sammutuspyynnöt purivat vain väliaikaisesti). Ei omaa lisätoimenpidettä, Fablen päätettävissä jatko.

**UUSI SÄÄNTÖ (Fable 10:1x): simulaattorien sammutusvaltuus + tuntiraportointi.** Postivahti saa itse sammuttaa (xcrun simctl shutdown) simulaattorit joissa peli ei ole pyörinyt 20 min tai joiden rooli juuri nollattu; max 4 boottina päivällä, 5. käynnistyessä ilmoita Fablelle kuka. Raportoi vapaan muistin % ja sivutus tunnin välein.

**ESTETTY (10:15):** yritin sammuttaa 5 idle-simulaattoria (1572C658, 993F8873, D0D2CD1E, 3B4CDACB, C1D5E34C — vain FBBD41D7 ja FB234D08 joissa peli aktiivisesti pyörii jätettiin) — oman session luokitin esti komennon ("Interfere With Workloads"). Ei yritetty kiertää, ilmoitettu Fablelle, odotetaan sallintaa tai omistajaroolien omaa toimintaa. Vapaa muisti n. 36 %, sivutus 22,8 Gt.

**Junasääntö (Fable 04:1x):** ei vielä havaintoja 30 min -käännösviiveestä eikä sisältöjonon 4-PR/4h-ehdon täyttymisestä ilman junaa.

**Postilaatikko:** viimeisin commit b2772e286 "Posti: toimita kahden puuttuneen kaupungin galleriakuvat" — muuttumaton.

## 3) Avoimet PR:t

Yhteensä ~40 avointa PR:tä (karkea jako, ei virallinen luokitus):
- **Sisältö:** ~21, **Toiminto:** ~10, **Luonnos/raportti:** ~9

Julkaisijan seuraava juna: tapahtumaohjattu (käännösjuna + sisältöjuna 4-PR/4h-ehdolla). BUILD-sana → automaattinen TestFlight-ajo. PR #3146 tulossa (GPU-rinnakkaisuuden rajoitus).

## 4) TestFlight

- Viimeisin build: **11** (1.0.11, 202609241848, proto 6ff16f3, ajo 36042445620) — TestFlightissa.
- Käännöspalvelu käytössä: `proto-3d/tyokalut/proto-kaanna.sh <haara>[+<haara>] [UDID…]`.

## 5) Resurssit

- **Levy** (/System/Volumes/Data): 166 Gt vapaana. Raja 35 Gt.
- **wt/-worktreet:** 36 kpl.
- **5 h -kiintiö:** 44%, nollautuu n. 10:20 EEST. Raja 95%/98%.
- **Viikkokiintiö (kaikki mallit):** 93%. **Viikkokiintiö (Fable):** 51%. Nollautuu 2026-09-28 klo 01:00.
- **Sivutus:** 22,8 Gt käytössä (raja 16 Gt, EI parantunut, ilmoitettu Fablelle).
- **Simulaattorit:** 8 boottina (nousi takaisin 3:sta).

## 6) Kellonaika

2026-09-25 10:13 EEST. Yön merkkipaalut: tuntiraportti sivutuksesta lähetetty (ei parantunut), Karttaseppä lähestyy 70%.
