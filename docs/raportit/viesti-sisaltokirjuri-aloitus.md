# Sisältökirjurin aloitusviesti (26.9.2026, tilinvaihto tai kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, Raamatun "TYÖTAPA JA SESSIOT", JUMI → FABLE ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260926.md kokonaan.

TILA lyhyesti: maakuntien lyhyt-luonnehdinnat VALMIIT kaikille 138 maalle; GRC:n kokoluokitus ja
maakuntasalaisuudet mainissa; löydös 149 ratkaistu; Codexin värikorjaus erät 1–12 käsitelty (12 = PR #3293 junassa).

ENSIMMÄINEN TEHTÄVÄ:
1. Codex-erä 13 (viimeiset 36 kuvaa, commit 4eb49ebb0, posti/kuvatoimitus-miniatyyrien-varit-503-era13-20260926.json
   haarassa claude/postilaatikko) — käsittele luovutuksen kohdan 1 kaavalla, PR + kuittaus postiin + rivi Fablen lokiin.
2. Tarkista `gh pr view 3293 --json state` ja jatka odottavat (luovutus kohta 2).
3. Seuraavat Codex-erät saa ottaa suoraan ilman Fablen välikäskyä (Postivahti ilmoittaa).

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle (tilanne, vaihtoehdot, suositus), ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10 viestiä/vuoro; varakanava mcp send_message session id:llä.
- Maakunta-PR:t yksi kerrallaan mainin päälle; agentit vain Sonnet/Opus, enintään 3–4 rinnan, isolation: worktree,
  EI pushia agenteilta; agenttiworktreet siivotaan kun erä on pushattu.
- Uusi js/packs-tiedosto ilman selaintuojaa → tests/sw.test.mjs NIPUTTAMATTOMAT + sw.js SHELL (ei MODULES).
- Aikaleimat date-komennolla. Testit ilman ääniä. Kuormatarkistus `uptime` ennen koko sarjaa.
- Elävä kartta: isoisän 1873-reittiä EI ole (kaanon); maakunnat syttyvät etäisyysjärjestyksessä. Salaisuudet muille
  maille vasta kun elävän kartan video on hyväksytty.
