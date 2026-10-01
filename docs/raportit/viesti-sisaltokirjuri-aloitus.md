# Sisältökirjurin aloitusviesti (uusi tili, 1.10.2026)

Lue ensin `docs/raportit/viesti-sisaltokirjuri-luovutus-20261001.md` (tila, PR:t, prosessi, scriptit kansiossa
/Users/Shared/Claude/siirto-sisaltokirjuri/kuva2/). Rooli: Sisältökirjuri (Sonnet 5.5); agentit vain Opus/Sonnet; ääniä EI generoida ilman omistajan lupaa.

1. `git fetch origin main && git checkout sisalto-pelikatalogi-20260927 && git pull`.
2. Tarkista gh:lla PR:t #3733, #3738, #3754 (mergeable/merged); jos CONFLICTING → luovutuksen kohdan 2 ohje.
3. Seuraava työ: kuva2-erät D (DEU DNK ESP EST), E (FIN FRA GBR HRV), F (HUN IRL ISL ITA) — JSON ja kuvat valmiina; avaa PR yksi kerrallaan edellisen mergen jälkeen
   (uusi worktree `tools/uusi-worktree.sh sisaltokirjuri maakunta-kuva2-d`, `node patch-kuva2.mjs <wt> k2-…json`, testit, `tools/uusi-versio.mjs`, PR, viesti Julkaisijalle + Päätoimittajalle ≤ 8 riviä). Sitten erä G… (luovutuksen lista).
4. Siivoa mergetyt worktreet (`tools/uusi-worktree.sh --poista sisaltokirjuri-<aihe>`).
