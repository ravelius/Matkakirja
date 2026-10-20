# Sisältökirjurin luovutus 19.10.2026 (Postivahdin kova raja 92 %)

Rooli, checkout (`/Users/Shared/Claude/Matkakirja-sisaltokirjuri`), agenttisäännöt (vain Opus/Sonnet) ja osoitteet kuten edellisessä luovutuksessa (`docs/raportit/viesti-sisaltokirjuri-luovutus-20261018-yo.md`). Viestit AINA `send_message` `session_id`:llä (osoitekirja `/Users/Shared/Claude/osoitekirja.md`): PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31; Pelikoodari local_11aca9cd-eda6-4db9-9019-8a153c8b8795; Projektiseppä local_6cef0cb2-ae2e-4677-b85c-2eeb192f10c4; Natiivi-UI local_c6d63773-0270-4873-96f8-63c66cf52794. **Pitkää ajoa ei ole käynnissä.** Agentteja ei ole kesken.

## Valmista tässä vuorossa (kaikki mainissa)
- **ISS-skanneri B1 (1 182/1 190 kohdetta):** `docs/kohtaukset/iss-skanneri/` naytteet-10, era1-alueet-vuoristot, era2-vanhat-164, era3…era10 kaupungit, era11-mazatlan-natal (viimeinen 18f208546). Nimikorjaukset `nimi-korjaukset-20261019.json`, duplikaatit `duplikaatit-20261019.json`. Puuttuu 8 duplikaatti-v-tunnusta (viittaavat k-vastineeseen; poisto NUI:n asia). Kilimanjaro: v-kilimanjaro pidetään, k-kilimandzaro viittaa siihen (PT). NUI sai tuontitiedon.
- **Olavinlinna M-osa** (4b6d4f1f9/8308c2448): `olavinlinna-m-osa-lopullinen-20261019.md` + avainpaketti (53 avainta; Projektiseppä kytki aa32f9a44/15f7e89bc).
- **Juoksupeli (Rata v4):** `juoksupeli-rata-v4-*`, `juoksupeli-tekstit-fi-20261019.json` (PK kytki), `juoksupeli-rikkoutuvat-51-avaimet-20261019.json` (51 rikkoutuvaa esinettä + 30 yleishuutoa + jadepersikka; kuplatyypit 1–8; huudot ≤ 39), `juoksupeli-huudot-lista-20261019.md` (omistajan lista), `juoksupeli-huudot-generointilista-20261019.json` (hyväksytyt erät: erä 1 (10 riviä, nyt ILMAN alkua) + 6 yleishuutoa; tagi `[shouting] [panicked] `; ääni 08 Kavya bA58y3FqVI6b6gTNh0oT; sallitut alut Oho!, Auts!, Hoplaa!, Noin!, Katos vaan!, Hups!, Sori!, Sis-sos!). Versiomuoto `juoksupeli.rikkoutuva.<id>.versio.<n>.kupla/.huuto/.tyyppi/.fakta` (erä 1).
- **Kiinankieliset kirjoitukset** (`kirjoitukset-kielletty-kaupunki-20261019.md/.json`, f4e043b2d): 57, joista 40 `kayta` (Codexille), 17 `varoen`.
- **Kysy-nappi, Kööpenhamina** (b3cf3f00b): `docs/kohtaukset/pallokierros/kysy-koopenhamina-20261019.json` (8 kohdetta × 8 kysymystä, ≤ 45 mrk).

## Kesken / odottaa
- **Kysy-nappi, muut Euroopan kierrokset:** odotan PT:ltä malli-hyväksyntää ja kaupunkilistaa (+ missä kunkin uusin kierros-json on). Löydetty: vain Kööpenhaminan v13 (`/Users/Shared/Claude/proto-3d/_valmiit/koopenhamina-tivoli-kuvat-vienti-20261017h/opas/pallokierros-v13/koopenhamina.json`); docs/kohtaukset/pallokierros/ on Ateena/Lontoo/Praha/Pariisi/Tukholma-aineistoa. Muoto: `{"kaupunki","kohteet":{ "<Q-id>": [8 kysymystä] }}`.
- **Huutoerät:** KK tuo omistajan hyväksymät erät → vie avainpakettiin `.versio.<n>`-muodossa ja generointilistaan (tagi + ääni-id). Älä tee uusia huutoja omin päin (PT 10.38). Uusi alkulista tulee KK:lta; Aa! on poistettu, Eei!! pois. Ei generointia ennen omistajan hyväksyntää ja äänitestiä.
- **Avoimet pienet:** Kuplakuvaukset ovat omistajan linjausten mukaiset (iloiset hahmot, vaaleasävyinen, pehmeä päivänvalo). Heikoimmin varmistetut esineet: tinakannu, linnunhäkki, mantšun vyöveitsisarja, palatsilyhty, zitan-jakkara.

## Opit
- Työtapa, joka toimi: 3–4 Sonnet-luonnostelijaa rinnakkain → riippumattomat Sonnet-tarkistajat (verkko) → yhdistys skriptillä → docs-PR → squash-merge → kuittaus PT:lle yhdellä rivillä. Skriptit scratchpadissa (`yhdista-era.py`, `julkaise-era.sh`, `kokoa51.py`, `kirjoita51.py`) — scratchpad on sessiokohtainen, ei repossa.
- `git push` epäonnistuu joskus ensimmäisellä yrityksellä (ref lock): toista, `gh pr merge` onnistuu silti.
- Docs-only-PR:t mergeen suoraan (paths-ignore, ei CI:tä).
- Geokoordinaatit voivat olla väärin katalogissa (k-mazatlan, k-natal-brasilia, korjattu PK:lla) — tarkista ennen tekstiä.
- Committoimaton: `.claude/settings.local.json.*`, `.wrangler/` (ei omia, jätä).

## LISÄYS (klo ~12): Kysy-napin kierrokset — Linssiseppä lähetti polut, PT hyväksyi Kööpenhaminan mallin (b3cf3f00b)
Seuraavan SK:n ENSIMMÄINEN työ: kirjoita Kööpenhaminan mallin mukaan (8 kysymystä per kohde, ≤ 45 mrk, uteliaita, kohteeseen sidottuja, ei vastausta kysymyksessä, 13+ ja aikuiset; muoto `{"kaupunki","kohteet":{"<Q-id>":[8 kysymystä]}}` → `docs/kohtaukset/pallokierros/kysy-<kaupunki>-<pvm>.json`) kysymykset natiivin kipin kierroksille (Pallokierros.Kaupungit, `media.matkakirja.app/`):
- Kööpenhamina — `opas/pallokierros-v13/koopenhamina.json` — VALMIS.
- Lontoo — `opas/pallokierros-v5/lontoo.json`
- Ateena — `opas/pallokierros-ateena-v13/ateena.json`
- Praha — `opas/pallokierros-praha-v7/praha.json`
Kohteet = kentän `kohteet` rivit (id = Wikidata-Q, nimi, kuvaus, teksti). Paikalliset kopiot löytyvät `/Users/Shared/Claude/proto-3d/_valmiit/*/opas/` -kansioista (Kööpenhamina: koopenhamina-tivoli-kuvat-vienti-20261017h). Työtapa: yksi Sonnet-kirjoittaja per kaupunki + pituus/kysymysmerkki-tarkistus skriptillä; kuittaus PT:lle (3 riviä, määrä + sha). Muut Euroopan kaupungit vasta jos PT/LS lähettää lisää.
