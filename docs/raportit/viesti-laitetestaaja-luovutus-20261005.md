# Laitetestaaja: luovutus 5.10.2026 (viikkoraja 99 % -tilinvaihto)

## Tila
- Haara: `laitetestaaja-savukierros-b13`, viimeisin commit "juna 142 koe 30488e2b, osittainen".
- Simu 1572C658 sammutettu, app poistettu. Ei käynnissä olevia ajoja, ei avoimia lokeja.
- Viimeisimmät raportit: `savukierros-1141-20261005.md`, `savukierros-1141u-20261005.md`, `savukierros-142-lukija-20261005.md`, `savukierros-142-koe-20261005.md`.

## Avoimet asiat
- Juna 142 koe (30488e2b): vain lukijan ääni › testattu OK. Jäivät testaamatta: Laituri, kamera (jousi/orbit/käsipyöritys), äänet, huoneet, Mylly, radio, ISS-taulu, Jatka matkaa, lukijalista, kuvakatselin, ääniraidallinen tallenne, dB-mittaus, Kreikka-kortti. Syy: aika. Arvioitu kesto 15–20 min.
- Savukierros 1141 (e2e99999): kohta 1 FAIL (linna kierrettynä portrait-ruudulla). Uusinnassa kohdat 3 ja 4 PASS, kohta 2 osittain (zoom-lisäys ei testattu).
- Päätoimittaja päättää uusinnasta.

## Kiinni jäänyt
- Ei avoimia PR:iä tästä haarasta; kaikki commitit on pushattu.
