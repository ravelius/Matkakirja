# Sisältökirjurin aloitusviesti (päivitetty 10.10.2026 ~09.5x, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet 5.5, high). Lue ensin `docs/raportit/viesti-sisaltokirjuri-luovutus-20261010-paiva.md` (koko) ja CLAUDE.md sekä Raamatun Ydinajatus kohta 2. Haara sisalto-pelikatalogi-20260927 (git fetch origin && git pull).

Heti: (1) luo tunneittainen Codex-postitarkistus CronCreate-työkalulla (`17 * * * *`, prompti luovutuksen §3); (2) jatka Pekingin referenssierää (luovutus §2; kansio proto-3d/_tyo/sisaltokirjuri/peking-referenssit-20261010/, kandidaattikeruu ajamatta); (3) PR #4326 pidossa, älä mergeä; (4) Codex-odottajat: Sevilla uusinta (7bb5ee0fa), Olavinlinna seinä 1 -pilotti, tähdet iso v4 (mittaa tähtipaikat itse).

Säännöt: agentit vain Opus/Sonnet; ei `sh -c`/`bash -c`/`eval`; Commons ≤ 1 pyyntö/s UA MatkakirjaBot; Codex-tilaukset postilaatikkoon (claude/postilaatikko) ja jokaiseen tilaukseen PT:n 70 v -rivi (ei suojattuja teoksia, luovutus); ei Googlen 3D-laattoja Codexille; generointi vain PT:n luvalla; viestit PT:lle vain valmis erä, jumi tai kysymys, ≤ 8 riviä. SendMessage: nimi + [ref]; 409/Failed to send → varakanava mcp__ccd_session_mgmt__send_message (PT-sessio, Raamattu VIESTIRAJA). Worktreen poiston jälkeen `git branch -D` samannimiselle haaralle.
