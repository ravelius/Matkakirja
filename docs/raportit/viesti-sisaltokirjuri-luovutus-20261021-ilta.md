# Sisältökirjurin luovutus 21.10.2026 ilta (Postivahti, PT: nollaus)

Rooli, checkout (/Users/Shared/Claude/Matkakirja-sisaltokirjuri), agenttisäännöt (vain Opus/Sonnet) ja osoitteet kuten edellisessä luovutuksessa
(docs/raportit/viesti-sisaltokirjuri-luovutus-20261021-ip.md). Viestit `send_message` `session_id`:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md); PT ≤ 3 riviä.

## Valmista (kaikki mainissa)
- Juoksupelin nimetyt paikat, harjahahmot, nastat ja kulmatornin maali: 48 tekstiä (#5152, 3183b1334). Avaimet `docs/raportit/juoksupeli-paikat-avaimet-20261021.json`, tekstit `…-tekstit-…md`, faktapohja `juoksupeli-nimetyt-paikat-faktat-…md`, riippumaton tarkistus `…-tarkistus-…md` (24 OK, 7 korjattu). PT välitti avaimet PK:lle; kytkentä PK:n.
- Studiojako (omistaja 18.02, Raamattu 4.21; #5158, 9a900ac1c): `docs/tuotanto/suunta/kerronta.md` (A, omistajan 18.12 ydin kärjessä), `docs/tuotanto/tekotavat/tekstit.md` (B, sis. rekvisiittatekstit), `docs/tuotanto/reseptit/paakaupungin-avaus.md` ja `kuumailmapallokierros.md` (C). Luvat ja vaiheet vain viittauksina D:hen (`tuotannonohjaus.md`, PT tekee).
- Suljettu: #5140 (Tarkista ennen, korvautuu D:llä), #5153 (rekvisiittatekstit siirtyivät B:hen).

## Kesken
- Ei mitään. Jono tyhjä (PT 21.10.). Työlista: Aarretehtävät (Bern + 13 pääkaupunkia) ja Muut Euroopan pääkaupungit ovat pidossa, kunnes kaupungit ovat pelissä; B1 (ISS-skannerin tekstit) pysyy seis (ks. edellinen luovutus).
- Kun tuotannonohjaus.md (D) valmistuu ja kartta päivittyy, tarkista että A/B/C:n viittaukset osuvat; vanhat pohjat (`docs/moduulit/tuotantopohjat/`) ovat voimassa siirtymäajan.

## Opit
- Riippumainen tarkistus löysi 7/31 korjattavaa: harjahahmojen selitykset olivat yhden englanninkielisen lähteen (The World of Chinese) varassa; museo- ja kiinalaiset lähteet erosivat. Yksi matkasivu ei riitä lähteeksi useaan väitteeseen.
- Harjahahmo on yayu (ei yazi); Hangshi (行什). Korjaus aiemman suunnitelman (docs/suunnitelmat/juoksupeli-kielletty-kaupunki.md) kohtaan 6 on tekemättä, mutta kirjattu tekstitiedostoon.
- Raamatun säännöt haetaan Pythonilla rivinumeroin (`js/tyohuone-raamattu.js`), ei lukemalla koko tiedostoa; lokihaku `node tools/loki-hae.mjs`.
- Committoimaton: `.claude/settings.local.json.*`, `.wrangler/` (ei omia, jätä).
