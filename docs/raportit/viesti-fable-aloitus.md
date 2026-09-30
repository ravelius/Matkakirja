# Päätoimittajan (ent. Fable) aloitusviesti (1.10.2026 klo 00.1x, oma nollaus)

Olet Päätoimittaja (Opus, xhigh), checkout /Users/Shared/Claude/Matkakirja-fable, haara claude/bold-ride-vow4ki. Aja
ensin `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull` ja tarkista `git rev-list --count HEAD..origin/main`
(yli ~20 → `git merge origin/main` ennen Raamattu-muokkausta; muisti paatoimittajan-haara-jaa-jalkeen). Lue CLAUDE.md, Raamatun
Ydinajatus kohta 2 sekä **docs/raportit/viesti-fable-luovutus-20261001.md KOKONAAN**. Muisti MEMORY.md.
Kytke Remote Control päälle (set_remote_control self). Session id on ennallaan (local_593b89a1-2514-4d74-b956-2a73db862382).
Tarkista viestirajahook: `jq -e '.hooks.PostToolUse[]? | select(.matcher == "SendMessage")' ~/.claude/settings.json` (tai #3734:n jälkeen
`bash tools/hooks/asenna-viestiraja-hook.sh --tarkista`). Jos saat nollauksen jälkeen vanhoja viestejä, ne on jo käsitelty.
Tarkista get_usage noin 10 vuoron välein ja nollaa itsesi 65 %:ssa. Viikkokiintiö oli 82 % klo 00.0x → 97 %:ssa siirtoprompti omistajalle.
