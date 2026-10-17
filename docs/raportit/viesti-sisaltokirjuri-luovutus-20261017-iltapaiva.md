# Sisältökirjurin luovutus 17.10.2026 iltapäivä (Postivahdin kova raja 35 %)

Rooli, checkout (/Users/Shared/Claude/Matkakirja-sisaltokirjuri), agenttisäännöt (vain Opus/Sonnet) ja osoitteet kuten edellisessä luovutuksessa
(`git show 0015f46c2:docs/raportit/viesti-sisaltokirjuri-luovutus-20261017-paiva.md`). Viestit AINA `send_message` id:llä (`session_id`-parametri;
osoitekirja /Users/Shared/Claude/osoitekirja.md); PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä), LR local_996d60ab-b4af-4172-ad31-f8e948f141a3,
KS local_eec7f158-d9f3-4b93-9368-c50935bd19ab, LS local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4, ÄÄ local_16ee69c8-b917-4dcd-9060-3542c5e03e67.
Uusi haara `git switch -c <nimi> origin/main`; docs-PR: `gh pr create`, `gh pr merge --squash --admin`. robots.txt ENNEN jokaista hakua; tarkistajat Sonnet omilla hauilla.

## Valmista tässä vuorossa (kaikki mainissa)
- **Kiinan keksinnöt ja uskonnot + Williamin 5 min käsikirjoitus** (#4804 0a004f98d, v2 #4806 ebaea9f97): `docs/kohtaukset/kiinan-dynastiat/keksinnot-uskonnot-paikat-20261017.md`,
  `kasikirjoitus-william-5min-20261017.md/.json` (19 pysäkkiä, arvio 4:56, 4 007 mrk puhuttuna; kalibrointi 14,18 mrk/s Williamin mitatuista 19 rivistä + 0,7 s/klipsi), `tutkimus-20261017/tarkistus-V1…V3`.
  KK:n korjaukset v2:ssa (islam 669, kompassi 1100, Gutenberg-juova 1644 → 1421). KS vienyt koordinaatit ja juovan siirron (1d3e627b9, 5ad4ca1ad). ÄÄ sai äänityksen PT:n ohjeella; korvaa kiina-kertoja-v1:n 30 tekstiä.
- **Louvren Nike ja Milon Venus** (#4807 dbb4f1f82): `docs/kohtaukset/museoteokset/ranska-pariteetti/louvre-veistokset-nike-venus.json` (LS kytkenyt 222484f5b + 589561e7b); kertojatekstit (#4809 c20437da9, #4810 f3ae9176e: `louvre-veistokset-kertojat-20261017.json`, Venuksen puhuttu ilman viivaa); ÄÄ äänittää.
- **Tivolin 5 CC-kuvaa** (LR kirjoitti selitteet; SK tarkisti Commonsista, yksi muutos Nimb "rakennus"; paketti 20261017d).
- **Ranskan lähestymissarja** (#4814 6cf06a7f7): `ranska-lahestyminen-tekstit-20261017.json`: uusi Rodin-puhe (`ranska-rodin-puhe`, 328 mrk puhuttuna), `teksti`-kenttä 436 mrk, infolappujen korjaukset. PT hyväksyi kokonaan; Orsay-puhe äänitetään uudelleen ("sen holvien alla"); äänitys ÄÄ:lla.

## Avoinna / seuraajalle
- **LS:lle lähetetty** (viesti jonossa 17.10.): ranska/lahestyminen.json `teksti` + Louvre- ja Orsay-infolappujen korjatut sanamuodot. LS kytkee, kun ÄÄ toimittaa tiedostonimet; PT:n ohje: vie teksti-kenttä ja infolaput samaan erään. Tarkista, että LS kuittasi.
- **Äänisivun infolappu-tekstit** (`/Users/Shared/Claude/aanisivu-sivusto/tekstit/ranska-louvre-infolappu.txt`, `ranska-orsay-infolappu.txt`) ovat vielä vanhoja ("avoinna vuodesta 1793"; "impressionistit"). Päivitys vaatii äänisivun julkaisuskriptin ja varmuuskopion (`aanisivu-julkaise.zsh`); PT päättää, tehdäänkö.
- Kiinan 19 pysäkin vanhat rivit (`kertojatekstit-20261017.md/.json`, v1-ääni) ovat korvattu uudella käsikirjoituksella; äänisivun Tekstit-osastoa ei ole päivitetty (vain kun PT pyytää).
- Ei muita avoimia pyyntöjä. Jono tyhjä (PT:lle ilmoitettu).

## Opit
- `send_message`-työkalun parametri on `session_id` (ei `to`).
- Williamin puhenopeus: 14,18 puhuttua merkkiä/s tempolla 1,10 (+0,7 s klipsihiljaisuus); mitattu `/Users/Shared/Claude/proto-3d/_tyo/kiina-kertoja-20261017/aja.log` + `puhe_luennat.puhuttu`.
- Louvren collections-sivu antaa toisinaan 429; Orsayn virallinen sivu 403: jätä käyttämättä, älä kierrä.
- Committoimaton: `.claude/settings.local.json.*`, `.wrangler/` (ei omia, jätä).
