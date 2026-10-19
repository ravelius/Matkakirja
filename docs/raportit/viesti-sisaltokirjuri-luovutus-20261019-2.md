# Sisältökirjurin luovutus 19.10.2026 (klo ~14, PT:n pehmeä raja 28 %)

Rooli, checkout (`/Users/Shared/Claude/Matkakirja-sisaltokirjuri`), agenttisäännöt (vain Opus/Sonnet) ja osoitteet kuten edellisessä luovutuksessa (`docs/raportit/viesti-sisaltokirjuri-luovutus-20261019.md`). Viestit AINA `send_message` `session_id`:llä (`/Users/Shared/Claude/osoitekirja.md`): PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31; Pelikoodari local_11aca9cd-eda6-4db9-9019-8a153c8b8795; Natiivi-UI local_c6d63773-0270-4873-96f8-63c66cf52794. **Jono on tyhjä, agentteja ei ole kesken, pitkää ajoa ei ole.**

## Valmista tässä vuorossa (kaikki mainissa)
- **Huutolista:** sallitut alut Oho!, Auts!, Hoplaa!, Noin!, Katos vaan!, Hups!, Sori! (Sis-sos! pois), #4943.
- **Kysy-nappi (Lontoo, Ateena, Praha):** 3 × 64 kysymystä (#4944), `docs/kohtaukset/pallokierros/kysy-<kaupunki>-20261019.json`. Lähteet `media.matkakirja.app/opas/pallokierros-v5/lontoo.json`, `pallokierros-ateena-v13/ateena.json`, `pallokierros-praha-v7/praha.json` (Kööpenhamina v13 samassa ämpärissä).
- **Kysy-kysymysten tarkistus tekstiä vasten (PT, omistaja 12.11):** vastaus kohteen tekstissä → vaihdettu uuteen; 147/256 vaihdettu (Kööpenhamina 41, Lontoo 34, Ateena 30, Praha 42), #4947. Uusien faktat Sonnetin yleistietoa, ei verkkotarkistusta; muutosloki vain scratchpadissa (ei säilytetty, ei tarpeen).
- **Olavinlinnan tekstit:** valmiina jo 4b6d4f1f9/8308c2448 (#4904/#4905); PT:n valmiiksi-lista oli vanhentunut (kortit 7–12, vihjeet huoneille 2–10, M-osa 26 + 4 varalla; huone 1 ei vihjeitä tarkoituksella). Ei uutta työtä.
- **Puyin huudot erä 1 puuttuvat + erä 2:** avainpakettiin `.versio.<n>` ja generointilistaan, 17 ottoa / 1 136 mrk (kentät `otto`, `jarjestys`), #4949. Jo äänitettyjen v1 (posliinimaljakko, jadesinetti, kalakulho) tekstit ääntä vastaaviksi, #4950. Omistajan omat O1/O2 (`juoksupeli.huuto.omistaja.1/.2`) ovat ilman esinettä ja kuplaa (KK/PT sitoo). **Ei uusia huutoeriä ennen omistajan pelitestiä; ei generointia ilman lupaa.**
- **Aarnin luettelo, kaikki 7 aarretta (kuvaus + historia):** `docs/raportit/aarnin-luettelo-tekstit-20261019.json` (europe, africa, middleeast, asia, northamerica, southamerica, oceania; avaimet NUI:lle `ui.aarnin-luettelo.<manner>.kuvaus/.historia`), #4953, #4957 (omistaja 13.38, PT välitti), #4958 (PT:n sanamuotokorjaukset). **Kuuden muun aarteen lähdeaineisto on jo itse tiedostossa** (`lahteet`, `epavarmaa`); scratchpadissa ei ole mitään tallentamatonta. Heikoimmat lähteet: Eurooppa (ei museolähdettä), Oseania (kultamitali 1889 ja pysyvä laina yksi lähde; WA Museumin oma sivu tarkistamatta), Zimbabwen 2026-luovutus (uutiset + SAHRA, väliaikainen siirto).

## Opit
- Työtapa toimii: Sonnet per kaupunki/aarre rinnakkain → skriptitarkistus (pituus, määrä, duplikaatit) → erillinen Sonnet-faktatarkistaja epävarmoille → docs-PR → squash-merge → yksi rivi PT:lle.
- Tarkista ensin, onko tilattu työ jo tehty (`git log origin/main -- <tiedosto>`); Olavinlinnan tekstit olivat.
- `sed -i` ei toimi macOS:llä ilman varmuuskopioparametria; käytä python3 -I.
- VAIN EUROOPPA poistettiin 19.10. klo 13.39 (omistaja, PT välitti), mutta muiden maanosien uutta työtä EI aloiteta ennen omistajan aloituspäätöstä. Poikkeus: Aarnin luettelon 7 tekstiä.
- Committoimaton: `.claude/settings.local.json.*`, `.wrangler/` (ei omia, jätä).
