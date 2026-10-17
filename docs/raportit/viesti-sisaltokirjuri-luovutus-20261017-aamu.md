# Sisältökirjurin luovutus 17.10.2026 aamu (Postivahdin kova raja 36 %)

Rooli, checkout (/Users/Shared/Claude/Matkakirja-sisaltokirjuri), agenttisäännöt (vain Opus/Sonnet) ja osoitteet kuten edellisessä luovutuksessa
(`git show a156f1611:docs/raportit/viesti-sisaltokirjuri-luovutus-20261017-yo2.md`). Viestit AINA `send_message` id:llä
(osoitekirja /Users/Shared/Claude/osoitekirja.md); PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä), LS local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4,
Siirtoseppä local_86d0c984-aeeb-430d-bc85-3112f27b9437, Linnanrakentaja local_996d60ab-b4af-4172-ad31-f8e948f141a3, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
Uusi haara aina `git switch -c <nimi> origin/main`; docs-PR: `gh pr create`, ~6 s, `gh pr merge --squash --admin`. Proto-gitiin EI kirjoiteta.
Älä aloita vertaispyynnöistä; seuraava erä tulee PT:ltä.

## Valmista tässä vuorossa (kaikki mainissa)
- **Kiinan 9 taistelu- ja keksintökorttia**, riippumaton tarkistus: 5 OK, 4 korjattu, Tekstit-osasto päivitetty + julkaistu (#4767, c447a4f58).
- **Ranskan kohdat.json**, riippumaton tarkistus (#4768, 1d887bdfd): 152 ympyrästä 91 OK, 61 korjattu. **Alankomaiden kohdat** (#4773 43d861357 + säännöt #4774 d69b94eb0): kopio `kohdat-alankomaat.json` mainissa, 195 ympyrää, LS vie protoon (juna 199).
- **Tuotantopohja uusi-linssi.md** SK-osuus: PR #4771:n haarassa `linssiseppa-tuotantopohja-linssi` (29e3ecf90), PR luonnoksena kunnes muut TÄYDENTÄÄ-osuudet tulevat.
- **Alankomaiden 34 patsaslähdettä** (8 CC BY, 26 CC0) #4780/#4781 (425059757): `docs/kohtaukset/museoteokset/alankomaat-veistokset-lahteet.json` → Siirtoseppä (viesti jonossa 17.10.) lisää `alankomaat/veistokset.json` lahteet[]:iin.
- **Louvre-pariteetti, SK-osuus** (#4783 e79aaff22 + tämä luovutus): `docs/kohtaukset/museoteokset/ranska-pariteetti/` (README selittää): `teokset-lisat.json` (kuvateksti_fi 51/51 riippumattomasti tarkistettu, krediitti, lahde_url, kuva_tiedot, tekija_wikidata, Endymion tekniikka), `huoneet-lisat.json` (4 salia), `veistokset-lahteet-lisa.json` (Nike CC BY, Venus CC0), `rodin-veistokset.json` (8 veistosta, riippumattomasti tarkistettu; kertojan tekstit puhuttuna 4 274 merkkiä).

## AVOINNA seuraajalle
1. Viesti PT:lle ja LS:lle Louvre-paketista (lähetetty luovutuksen yhteydessä, jos ei: sha tästä luovutuksesta + README-polku). LS yhdistää tiedostot protoon; ÄÄ äänittää Rodinin 8 kertojatekstiä pysyvällä luvalla (`rodin-veistokset.json` kenttä `puhuttu`, luvut sanoiksi; PT ilmoittaa merkkimäärän 4 274 omistajalle jos tarvitaan).
2. **louvre-inv-777 (riskiluokka D)**: ei parempaa vapaata kuvaa löytynyt; PT päättää pitää vai poistaa (README).
3. Valinnaiset Rodin-mitat/versiot (Ajattelija, Calais'n porvarit, Suuri puristunut käsi, Kolme haamua mitat null; Suudelma-skannauksen versio varmistamatta): jos tarvitaan, selvitä museolta.
4. PR #4771 (uusi-linssi.md) luonnoksena; muut TÄYDENTÄÄ-osuudet kesken.
5. Riippumaton tarkistus on tehty Kiinan korteille, Ranskan ja Alankomaiden ympyröille, Ranskan kuvateksteille ja Rodinille; Orsayn sivut 403 kaikessa (hakutiivistelmät) ja yhden lähteen väitteet on raportoitu README:ssä ja raporteissa (ranska-kohdat-20261017.md, alankomaat-kohdat-tarkistus-20261017.md).
6. Jos Äänittäjä/LS kysyy Kiinan tekstien tai kohtien äänistä: ääniä ei generoitu SK:n toimesta.

## Huomiot
- Committoimaton: .claude/settings.local.json.*, .wrangler/ (ei omia, jätä).
- Ali-agentit (Sonnet) kirjoittavat vain omaan tiedostoonsa scratchpadiin; tulokset on kopioitu repoon JSON:ina.
- Äänisivun julkaisu: `zsh tools/tyotavat/julkaisija/aanisivu-julkaise.zsh` (varmuuskopio ensin `index.html.ennen-<aihe>-<pvm>`).
