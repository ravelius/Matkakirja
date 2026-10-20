# Sisältökirjurin luovutus 18.10.2026 yö (PT:n ohje: ei uusia töitä)

Rooli, checkout, agenttisäännöt (vain Opus/Sonnet) ja osoitteet kuten edellisessä luovutuksessa
(`git show 58c10f43f:docs/raportit/viesti-sisaltokirjuri-luovutus-20261017-iltapaiva.md`). Viestit AINA `send_message` `session_id`:llä
(osoitekirja /Users/Shared/Claude/osoitekirja.md); PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä).

## Valmista tässä vuorossa (kaikki mainissa)
- **Äänisivun Ranska-infolaput** (#4817 63d226c7c): `ranska-louvre-infolappu` = PT:n hyväksymä lähestymisteksti (436 mrk, 1793-sanamuoto);
  `ranska-orsay-infolappu`: "impressionistit ja jälki-impressionistit". Julkaistu (Access-suoja ok); varmuuskopiot
  `aanisivu-sivusto/index.html.ennen-ranska-infolaput-20261017` ja `tekstit/*.txt.ennen-20261017`. Kirjaus: `aanisivu_paivitys` lähestymistekstien JSON:ssa.
- LS kuittasi lähestymistekstien kytkennän (proto linssiseppa/orsay-valinnaiset-200 749a0bc57; ei vielä mainissa): asia suljettu.

## Kesken
- Ei mitään keskeneräistä. Jono tyhjä.

## Opit
- Äänisivu (`/Users/Shared/Claude/aanisivu-sivusto`) ei ole git-repo: muutos = varmuuskopio + python `-I` -skripti (esc: `&`, `'` → `&#x27;`) + `aanisivu-julkaise.zsh`; repoon vain kirjaus.
- Committoimaton: `.claude/settings.local.json.*`, `.wrangler/` (ei omia, jätä).
