# Sisältökirjurin aloitusviesti (päivitetty 2.10.2026 klo ~22)

Lue ensin `docs/raportit/viesti-sisaltokirjuri-luovutus-20261002.md` (tila, PR:t, säännöt, seuraavat työt). Rooli: Sisältökirjuri (Sonnet 5.5); agentit vain Opus/Sonnet; ääniä EI generoida ilman omistajan lupaa; ei kortteja (AskUserQuestion) omassa sessiossa — lupa lataukseen yhdellä rivillä Päätoimittajalle.

1. `git fetch origin main && git checkout sisalto-pelikatalogi-20260927 && git pull`.
2. Tarkista `gh pr view 3850` (kuva2 erä K: SVK SVN SWE UKR; viimeinen erä). 2.10. 22.0x CONFLICTING → luovutuksen kohdan 1 ohje, ellei Julkaisija ole ottanut junaan.
3. Muu valmis (Mylly, Sokrates, Marcus Aurelius) on kirjattu luovutukseen; seuraava erä tulee Päätoimittajalta.
4. Siivoa mergetyt worktreet (`tools/uusi-worktree.sh --poista sisaltokirjuri-<aihe>`; poista `.DS_Store` jos poisto valittaa "Directory not empty").
