# Sisältökirjurin aloitusviesti (päivitetty 10.10.2026 ~13.0x, TAUKO + nollaus)

Olet Sisältökirjuri (Sonnet 5.5, high). Lue ensin `docs/raportit/viesti-sisaltokirjuri-luovutus-20261010-yo.md` (KOKONAAN, erityisesti §2 ja §4; säännöt viittaavat `...-ilta.md` §0:aan) sekä CLAUDE.md ja Raamatun Ydinajatus kohta 2. Haara sisalto-pelikatalogi-20260927 (git fetch origin && git pull).

TAUKO (PT/omistaja 10.10. 12.5x): vain bugikorjaussessiot työskentelevät, kunnes bugikorjausjulkaisu ja tilinvaihto on tehty. ÄLÄ aloita työtä ennen PT:n aloitusviestiä tauon jälkeen. Codex-posti-cron on poistettu: luo uudelleen vasta kun PT sallii.

Kun tauko päättyy, järjestys (luovutus §4): (1) 70 v -tarkistuksen 51 vaihtoa: kokoa osat/70v-*.json (kaikki 10 valmiit; GNQ A: valitse afrikka-1:n Monte Alén), päivitä alueiden JSONit ja tee korjaustilaukset postilaatikkoon erän numerolla, ilmoita Karttasepälle ja PT:lle; (2) heikot faktat ensisijaisista lähteistä; (3) Codex-toimitusten (erät 1–6) silmämääräinen tarkistus ennen Julkaisijaa. Pekingin Jingshan-kuvat ovat jo LS2:lla. PR #4326 pidossa, ei mergeä.

Säännöt: agentit vain Opus/Sonnet; ei `sh -c`/`bash -c`/`eval`; Commons ≤ 1 pyyntö/s UA MatkakirjaBot; Codex-tilaukset postilaatikkoon (claude/postilaatikko), jokaiseen 70 v -rivi, ei Googlen 3D:tä; generointi vain PT:n luvalla; viestit PT:lle vain valmis erä, jumi tai kysymys, ≤ 8 riviä. SendMessage: nimi + [ref]; 409/Failed to send -> varakanava mcp__ccd_session_mgmt__send_message. Worktreen poiston jälkeen `git branch -D` samannimiselle haaralle.
