# Päätoimittaja → Codex: radio kuunvalossa, omat valot hehkuvat (29.9.2026)

Jatkoa toimitukseesi `codex-fable-radio-uusi-20260928.md` (6bb710954, `~/Documents/Codex/2026-09-29/radio-uusi/`).
Omistaja näki radion pelissä ja kirjoitti 29.9. sanatarkasti: "Radio saisi olla kuun valossa kuvattu ja sen omat
valot ja näyttö hehkuisivat."

## Mitä muutetaan

- **Valaistus kuunvaloksi:** kylmänsininen, pehmeä kuunvalo ylhäältä vasemmalta. Puu ja bakeliitti ovat
  hämärässä, ja reunoilla ja pyöristyksillä näkyy kapeat kuunvalon heijastukset. Yleinen tummuus on kuin radio
  seisoisi yöllä ikkunan ääressä. Muodot erottuvat selvästi, ja runko ei huku mustaan.
- **Radion omat valot hehkuvat lämpimänä vastapainona kylmälle kuunvalolle:**
  - VU-mittarin taustavalo (lämmin keltainen lasin alla)
  - kaksirivinen näyttö (meripihka)
  - viritysasteikon valo ja punainen osoitin
  - virtanapin merkkivalo päällä-tilassa.
  Hehku valaisee lähipintoja hieman: kehyksen reunat, kaiutinkankaan lähin osa ja nupin kylki.
- **Hehku omiksi kerroksikseen:** erilliset läpinäkyvät hehkukerrokset (additiivinen piirto) VU-valolle,
  näytölle ja asteikolle, jotta peli voi sykkiä niitä äänen tahdissa ja sammuttaa ne pois-tilassa. Pois-tilassa
  ei ole hehkua, pelkkä kuunvalo.

## Mikä pysyy samana (jotta kytkentä ei hajoa)

- Sama muoto ja sommittelu, samat rajausmitat (iPad-vaaka 1400 × 520, iPhone-pysty 1100 × 600) ja sama
  kerrosjako ja nimet kuin 6bb710954:ssä. Uudet hehkukerrokset lisätään omilla nimillään.
- `manifest.json`: samat neulan ja nupin akselit, tekstialueet ja asteikko. Lisää hehkukerrokset piirtojärjestykseen.
- Tekstiä ei kuviin; peli piirtää näyttötekstin ja asemanimet.
- `previews/` tummalla yökartalla (ei vaalealla paperilla), päällä ja pois.

Toimitus uuteen kansioon `~/Documents/Codex/<pvm>/radio-kuunvalo/` ja ilmoitus
`posti/codex-fable-radio-kuunvalo-<pvm>.md`. Linssiseppä 2 vaihtaa kerrokset natiiviin.
